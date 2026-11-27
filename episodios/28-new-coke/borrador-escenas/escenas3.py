E = {}

# piezas comunes de las tres escenas (se pegan al principio de cada cuerpo): trama de Bayer, capas fijas en búfer,
# degradados tramados, nubes de tres tonos a tres velocidades, pájaros, botellitas rectas y vasitos a escala de chibi
COMUN = r'''
import { ELENCO_NC as NC } from '/atomo/plato/kits/pixel-chibi.js';
const PZ = T.PIEZAS_NC, K = hex('#1c1222');
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const tr = (x, y, a) => a * 16 > BAY[((y & 3) << 2) | (x & 3)] + 0.5;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const CAPAS = new Map();
// la capa fija de un plano: se pinta una vez en su búfer y en cada fotograma se copia entera
const capa = (k, pintar) => { let b = CAPAS.get(k); if (!b) { b = R.nuevo(); const prev = R.usar(b); pintar(); R.usar(prev); CAPAS.set(k, b); } R.copiar(b); };
const grad = (x0, y0, x1, y1, cols) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i; for (let x = x0; x <= x1; x++) R.pset(x, y, tr(x, y, f) ? cols[i + 1] : cols[i]); } };
const caja = (x0, y0, x1, y1, c, borde = K) => { R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, borde); R.rect(x0, y0, x1, y1, c); };
const cajaR = (x0, y0, x1, y1, c) => { for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, c); };   // respeta R.recorte
const sombrear = (x0, y0, x1, y1, c, a) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (tr(x, y, a)) R.pset(x, y, c); };
const nube = (cx, cy, w, c1, c2, c3) => {
  const r = w / 5, P = [[-1.6, .4, .9], [-.6, -.2, 1.2], [.6, -.4, 1.3], [1.6, .3, 1], [0, .5, 1.1]];
  for (const [a, b, q] of P) R.disco(Math.round(cx + a * r), Math.round(cy + b * r + 1), Math.round(q * r), c3);
  for (const [a, b, q] of P) R.disco(Math.round(cx + a * r), Math.round(cy + b * r), Math.round(q * r), c2);
  for (const [a, b, q] of P.slice(1, 3)) R.disco(Math.round(cx + a * r - 1), Math.round(cy + b * r - 1), Math.max(1, Math.round(q * r * .6)), c1);
};
// nubes de tres tonos a tres velocidades dentro de cl (con R.recorte puesto)
const nubes = (cl, t, y0, y1, cols, n = 6, v = 1, w0 = 12) => { for (let k = 0; k < n; k++) { const c3 = k % 3, vel = (1.5 + c3 * 2.5) * v, w = w0 + c3 * 6 + hh(k, 1) * 8, ancho = cl[2] - cl[0] + 2 * w + 20; const x = cl[0] - w - 10 + ((hh(k, 2) * ancho + t * vel) % ancho), y = y0 + hh(k, 3) * (y1 - y0); nube(x, y, w, cols[0], c3 === 0 ? cols[2] : cols[1], c3 === 0 ? cols[3] ?? cols[2] : cols[2]); } };
const pajaros = (t, x0, x1, y, n = 3, v = 9, c = K) => { for (let k = 0; k < n; k++) { const x = Math.round(x0 + ((hh(k, 7) * (x1 - x0) + t * v * (1 + (k % 2) * 0.3)) % (x1 - x0))), yy = Math.round(y + hh(k, 8) * 10 + Math.sin(t * 2 + k) * 2), a = Math.sin(t * 11 + k * 2) > 0 ? 1 : 0; R.pset(x, yy, c); R.pset(x - 1, yy - a, c); R.pset(x + 1, yy - a, c); R.pset(x - 2, yy - 2 * a + (a ? 0 : 1), c); R.pset(x + 2, yy - 2 * a + (a ? 0 : 1), c); } };
// la botellita recta a escala de chibi (3 × 9) con su chapa y su brillo; (x, y) el centro de abajo
const BOT = { marron: [hex('#6a3a1e'), hex('#9a6a40')], rojo: [hex('#c8382e'), hex('#e2675c')], azul: [hex('#2e5aa8'), hex('#5a82c8')] };
const botellita = (x, y, col = 'marron', inclina = 0) => { const [c, l] = BOT[col]; const dx = (j) => Math.round(inclina * j / 9); for (let j = 0; j < 9; j++) { const w = j < 3 ? 0 : 1; R.rect(x - w - 1 + dx(j), y - j, x + w + 1 + dx(j), y - j, K); } for (let j = 1; j < 8; j++) { const w = j < 3 ? 0 : 1; R.rect(x - w + dx(j), y - j, x + w + dx(j), y - j, c); if (j > 2) R.pset(x - 1 + dx(j), y - j, l); } R.pset(x + dx(9), y - 9, hex('#c8c8d2')); R.pset(x + dx(9), y - 10, K); };
const vasito = (x, y, lleno = 0.7) => { R.rect(x - 3, y - 6, x + 3, y, K); R.rect(x - 2, y - 5, x + 2, y - 1, hex('#d6e6ee')); const h = Math.round(4 * lleno); if (h) R.rect(x - 2, y - h, x + 2, y - 1, hex('#4a2414')); R.pset(x - 2, y - 5, hex('#ffffff')); };
// el globo grande de un símbolo (se lee a 640 px): «!», «?» o «X» a escala 2 sobre fondo claro, con su piquito abajo en (x, y)
const globo = (x, y, ic, col = hex('#c8382e')) => { R.rect(x - 9, y - 18, x + 9, y - 1, K); R.rect(x - 8, y - 17, x + 8, y - 2, hex('#fbf6ea')); R.rect(x - 8, y - 3, x + 8, y - 2, hex('#d8d0c0')); R.rect(x - 2, y, x + 1, y, K); R.rect(x - 1, y + 1, x, y + 1, K); R.rect(x - 1, y - 1, x, y, hex('#fbf6ea')); R.icono(ic, x - 5, y - 15, col, K, 2); };
const destello = (x, y, u, c = hex('#fff6c0')) => { if (u <= 0 || u >= 1) return; const r = Math.round(2 + 4 * Math.sin(u * Math.PI)); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } R.pset(x - 1, y - 1, c); R.pset(x + 1, y + 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); };
'''

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nc-intocable'] = ('Intocable', '''// NC-INTOCABLE (frase 7, «For almost a century, that recipe was untouchable…»), sin cartela; la barra del año corre de
// 1886 a 1960 en el plano 1, 1943–1962 en el 2 y 1975 en el 3. Tres planos:
// 1. «For almost a century, that recipe was untouchable. Coca-Cola was more than a soft drink» (0–6,5 s): el vestíbulo de
//    nogal de la sede con la caja fuerte en su peana, bajo un foco, entre cortinas de terciopelo y una cuerda de latón; el
//    tiempo pasa deprisa (por la ventana los días y las noches se suceden, el reloj gira, la placa cuenta los años); el
//    conserje se acerca con el plumero y en «untouchable» el ejecutivo abre los brazos delante de la caja: el conserje se
//    asusta y se va; el guardia le señala; el ascensor se abre con su campanilla.
// 2. «it was what soldiers drank in the war, what you saw in Christmas ads and on summer afternoons» (6,5–12,2 s): tres
//    cuadros en la pared de un salón, que se encienden uno a uno con la voz: los soldados que brindan con botellas rectas
//    junto a sus tiendas («soldiers»), la cena de Navidad con el árbol, las velas y la nieve en la ventana («Christmas»;
//    sin Papá Noel) y el porche de verano con los niños que beben, el columpio y el aspersor («summer»).
// 3. «Nobody at the company would have dreamed of changing it… until it started losing» (12,2 s–fin): la sala de juntas;
//    los directivos brindan con botellas, un científico entra con un matraz y un «?» en «dreamed», todos se enfadan y el
//    presidente le dice que no con el dedo en «changing»; en «until» suena el teléfono y la gráfica empieza a dibujarse:
//    la línea roja baja en «losing» y todos se vuelven a mirarla.''', COMUN + r'''
const P2 = en('intocable', .372), P3 = en('intocable', .722);
// ── 1 · el vestíbulo de la caja fuerte ──
const INTOC = en('intocable', .1336), SOFT = en('intocable', .30);
const NOG = [hex('#6a3e22'), hex('#55301a'), hex('#8a5632'), hex('#3e2212')];
const p1 = (t) => {
  capa('vestibulo', () => {
    grad(0, 0, 319, 15, [hex('#efe4c8'), hex('#e4d6b4')]);
    R.rect(0, 15, 319, 15, hex('#c8b48a')); R.rect(0, 16, 319, 19, hex('#b89a66')); for (let x = 0; x < 320; x += 4) R.rect(x, 18, x + 1, 19, hex('#8a6a40')); R.rect(0, 20, 319, 20, K);
    // la pared de nogal con sus vetas, los paneles en relieve y la moldura
    R.rect(0, 21, 319, 125, NOG[0]);
    for (let y = 21; y < 126; y++) for (let x = 0; x < 320; x++) { if (x >= 272 && y < 52) continue; const v = Math.sin(y * 0.21 + hh(x >> 1, 0, 3) * 7 + (x % 37) * 0.08); if (v > 0.86) R.pset(x, y, NOG[1]); else if (v < -0.93 && (x + y) % 2) R.pset(x, y, NOG[2]); }
    for (let x0 = 2; x0 < 320; x0 += 40) for (const [y0, y1] of [[x0 > 270 ? 54 : 28, 84], [94, 120]]) { R.rect(x0, y0, x0 + 35, y0, NOG[2]); R.rect(x0, y0, x0, y1, NOG[2]); R.rect(x0, y1, x0 + 35, y1, NOG[3]); R.rect(x0 + 35, y0, x0 + 35, y1, NOG[3]); }
    R.rect(0, 87, 319, 90, hex('#9a6a3e')); R.rect(0, 87, 319, 87, hex('#c08a52')); R.rect(0, 91, 319, 91, NOG[3]);
    R.rect(0, 122, 319, 125, NOG[3]); R.rect(0, 122, 319, 122, NOG[2]);
    // la ventana (su hueco se pinta en cada fotograma)
    caja(8, 24, 68, 108, hex('#3e2212')); R.rect(6, 108, 70, 111, hex('#9a6a3e')); R.rect(6, 108, 70, 108, hex('#c08a52'));
    // la hornacina de terciopelo de la caja fuerte, con su marco dorado y las cortinas recogidas
    caja(122, 26, 198, 124, hex('#5a1420'), hex('#c8a040'));
    for (let x = 123; x < 198; x++) for (let y = 27; y < 124; y++) { const f = Math.sin(x * 0.55 + y * 0.02); if (f > 0.7) R.pset(x, y, hex('#7a2030')); else if (f < -0.75) R.pset(x, y, hex('#3a0c14')); }
    for (const [xa, d] of [[123, 1], [197, -1]]) for (let y = 27; y < 124; y++) { const w = y < 70 ? 12 - (y - 27) * 0.1 : y < 84 ? 5 : 5 + (y - 84) * 0.12; for (let i = 0; i < w; i++) R.pset(xa + d * i, y, (i + Math.floor(y / 3)) % 4 === 0 ? hex('#3a0c14') : i % 3 === 0 ? hex('#a03040') : hex('#7a2030')); }
    for (const xa of [128, 192]) { R.rect(xa - 3, 76, xa + 3, 80, hex('#c8a040')); R.rect(xa - 3, 80, xa + 3, 80, hex('#8a6a24')); }
    // la placa de latón de los años
    caja(136, 30, 184, 46, hex('#2a1e16'), hex('#c8a040')); R.rect(136, 30, 184, 30, hex('#f0d070'));
    // el reloj de pared
    R.disco(94, 48, 11, hex('#8a6a24')); R.disco(94, 48, 10, hex('#c8a040')); R.disco(94, 48, 8, hex('#f4ecd8'));
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.pset(Math.round(94 + Math.cos(a) * 7), Math.round(48 + Math.sin(a) * 7), K); }
    // el banco de madera bajo la ventana
    R.rect(74, 112, 112, 115, hex('#9a6a3e')); R.rect(74, 112, 112, 112, hex('#c08a52')); R.rect(76, 116, 78, 126, NOG[3]); R.rect(108, 116, 110, 126, NOG[3]);
    // el ascensor de latón con su indicador
    caja(214, 52, 252, 124, hex('#a88a3a'), hex('#5a4418')); R.rect(232, 53, 233, 123, hex('#6a5420'));
    for (let x = 217; x < 250; x += 4) if (x !== 233) R.rect(x, 56, x, 120, hex('#c8a84a'));
    R.rect(212, 50, 254, 51, hex('#c8a040')); caja(222, 36, 244, 46, hex('#f4ecd8'), hex('#8a6a24'));
    caja(257, 84, 261, 94, hex('#c8a040'), hex('#5a4418')); R.pset(259, 87, hex('#f4ecd8')); R.pset(259, 91, hex('#f4ecd8'));
    // la maceta de la palmera
    caja(282, 110, 300, 126, hex('#c8a040'), hex('#5a4418')); R.rect(283, 111, 299, 112, hex('#f0d070')); R.rect(283, 120, 299, 125, hex('#8a6a24'));
    // el suelo de mármol en damero con la perspectiva al fondo, y la alfombra roja hasta la peana
    for (let y = 126; y < 180; y++) { const d = y - 52; for (let x = 0; x < 320; x++) { const i = Math.floor((x - 160) / d * 6 + 100), j = Math.floor(900 / d); const n = hh(x, y, 9); let c = (i + j) & 1 ? (n > 0.85 ? hex('#6a6470') : hex('#4e4856')) : (n > 0.9 ? hex('#c8c0b0') : hex('#e8e0d0')); if (((x - 160) / d * 6 + 100) % 1 < 0.06 || (900 / d) % 1 < 0.04) c = hex('#8a8478'); R.pset(x, y, c); } }
    for (let y = 141; y < 180; y++) { const hw = Math.round(16 + (y - 141) * 0.9); for (let x = 160 - hw; x <= 160 + hw; x++) { const b = x - (160 - hw) < 3 || (160 + hw) - x < 3; R.pset(x, y, b ? hex('#c8a040') : ((x + y) % 7 === 0 ? hex('#a02a30') : hex('#8a1e24'))); } }
    // la peana de mármol
    caja(134, 121, 186, 140, hex('#e4dccc')); R.rect(132, 120, 188, 124, hex('#f4ecdc')); R.rect(132, 120, 188, 120, K); R.rect(134, 136, 186, 140, hex('#b8b0a0'));
    for (let k = 0; k < 6; k++) { let x = 138 + k * 9, y = 126; for (let s = 0; s < 8; s++) { R.pset(x, y, hex('#a8a090')); x += hh(k, s) > 0.5 ? 1 : 0; y++; } }
  });
  // la ventana: el tiempo pasa deprisa (día, atardecer, noche) con el sol, las nubes, la fachada de enfrente y los coches
  const ph = (t * 0.45) % 1, dia = ph < 0.55, tarde = !dia && ph < 0.68, cl = [9, 25, 67, 107];
  R.recorte(cl);
  cajaR(9, 25, 67, 107, dia ? hex('#7ab8e8') : tarde ? hex('#e8906a') : hex('#1e2a58'));
  sombrear(9, 25, 67, 60, dia ? hex('#a8d4f0') : tarde ? hex('#f0c070') : hex('#2a3a70'), 0.5);
  if (dia) R.disco(Math.round(12 + ph / 0.55 * 52), Math.round(54 - Math.sin(ph / 0.55 * Math.PI) * 24), 4, hex('#fff2b0'));
  else if (!tarde) { R.disco(Math.round(12 + (ph - 0.68) / 0.32 * 52), Math.round(50 - Math.sin((ph - 0.68) / 0.32 * Math.PI) * 18), 3, hex('#f0f0e0')); for (let k = 0; k < 8; k++) R.pset(10 + Math.round(hh(k, 1) * 56), 27 + Math.round(hh(k, 2) * 26), hex('#f0f0e0')); }
  nubes(cl, t * 6, 30, 50, dia ? [hex('#ffffff'), hex('#e8eef4'), hex('#b8c8d8'), hex('#c8d4e0')] : tarde ? [hex('#ffe0b0'), hex('#f0a880'), hex('#c87060')] : [hex('#4a5480'), hex('#3a4470'), hex('#2a3460')], 4, 1, 9);
  cajaR(9, 62, 67, 98, dia ? hex('#a89884') : hex('#4a4250'));
  for (let y = 66; y < 96; y += 7) for (let x = 12; x < 66; x += 7) { const luz = !dia && hh(x, y, Math.floor(t * 0.45)) > 0.4; cajaR(x, y, x + 3, y + 4, luz ? hex('#f0d070') : dia ? hex('#5a6a80') : hex('#2a2438')); }
  cajaR(9, 99, 67, 107, hex('#4a4a52')); R.linea(9, 103, 67, 103, hex('#c8c060'), 3);
  { const u = (t * 0.7) % 1, x = Math.round(-20 + u * 110), c = Math.floor(t * 0.7) % 2 ? hex('#2a2a32') : hex('#a83a3a'); cajaR(x, 98, x + 16, 103, c); cajaR(x + 3, 95, x + 12, 98, c); R.pset(x + 3, 104, K); R.pset(x + 4, 104, K); R.pset(x + 12, 104, K); R.pset(x + 13, 104, K); if (!dia) R.pset(x + 16, 100, hex('#fff2b0')); }
  R.recorte(null);
  R.rect(37, 25, 39, 107, hex('#3e2212')); R.rect(9, 64, 67, 66, hex('#3e2212'));
  // la luz de la ventana que barre el suelo (de día)
  if (dia) { const u = ph / 0.55, x0 = Math.round(10 + u * 70); for (let y = 128; y < 150; y++) for (let x = x0 + (y - 128); x < x0 + 30 + (y - 128) * 1.6; x++) if (tr(x, y, 0.35)) R.pset(x, y, hex('#f8f0d0')); }
  // el reloj gira deprisa
  { const am = t * 7, ah = t * 0.6; R.linea(94, 48, Math.round(94 + Math.sin(am) * 7), Math.round(48 - Math.cos(am) * 7), K); R.linea(94, 48, Math.round(94 + Math.sin(ah) * 5), Math.round(48 - Math.cos(ah) * 5), hex('#8a2020')); R.pset(94, 48, hex('#c8a040')); }
  // la placa cuenta los años
  const año = Math.round(lerp(1886, 1960, tramo(t, 0.3, P2 - 0.6)));
  R.numero(String(año), 161, 43, { centro: true, color: hex('#f0c040'), sombra: false });
  // la aguja del indicador del ascensor y la puerta que se abre con su campanilla
  { const a = Math.PI * (0.15 + 0.7 * (0.5 + 0.5 * Math.sin(t * 1.3))); R.linea(233, 45, Math.round(233 - Math.cos(a) * 8), Math.round(45 - Math.sin(a) * 7), K); }
  const abre = tramo(t, 4.6, 5.2) * (1 - tramo(t, 5.9, 6.4)), g = Math.round(abre * 17);
  if (g > 0) { R.rect(233 - g, 53, 233 + g, 123, hex('#f4e0a0')); sombrear(233 - g, 100, 233 + g, 123, hex('#c8a060'), 0.5); R.rect(233 - g, 53, 233 - g, 123, hex('#5a4418')); R.rect(233 + g, 53, 233 + g, 123, hex('#5a4418')); }
  // el foco sobre la caja, con sus motas
  R.rect(154, 21, 166, 24, hex('#8a6a24')); R.rect(156, 25, 164, 26, hex('#f0d070'));
  for (let y = 27; y < 121; y++) { const hw = 4 + (y - 27) * 0.3; for (let x = Math.round(160 - hw); x <= 160 + hw; x++) { const borde = Math.abs(x - 160) > hw - 2; if (tr(x, y, borde ? 0.55 : 0.32)) R.pset(x, y, borde ? hex('#e8c890') : hex('#f8e8b0')); } }
  for (let k = 0; k < 9; k++) { const y = Math.round(30 + ((k * 13 + t * 4) % 80)), x = Math.round(160 + Math.sin(t * 0.8 + k * 2) * (4 + (y - 27) * 0.25)); R.pset(x, y, hex('#fff8d8')); }
  PZ.cajaFuerte(R, 160, 120, { abre: 0 });
  { const u = (t * 0.35) % 1; if (u < 0.3) { const x = Math.round(140 + u / 0.3 * 40); R.linea(x, 82, x - 6, 118, hex('#ffffff')); } }
  // la palmera que se mece
  for (let k = 0; k < 7; k++) { const a = -Math.PI * (0.1 + k * 0.13) + Math.sin(t * 1.4 + k) * 0.06, L = 16 + (k % 3) * 4; let x = 291, y = 110; for (let s = 0; s < L; s++) { x += Math.cos(a) * 1; y += Math.sin(a) * 1 + s * 0.05; R.pset(Math.round(x), Math.round(y), hex('#2e6a3a')); R.pset(Math.round(x), Math.round(y) + 1, s % 3 ? hex('#4a8a4a') : hex('#1e4a2a')); } }
  // el conserje se acerca con el plumero; el ejecutivo abre los brazos en «untouchable»; el conserje se va
  const cx = t < 2.3 ? Math.round(lerp(-16, 90, t / 2.3)) : t < INTOC + 0.9 ? 90 : Math.round(lerp(90, -24, (t - INTOC - 0.9) / 2.6)), va = t >= INTOC + 0.9;
  const anda = t < 2.3 || (va && cx > -24), alarga = t > 1.9 && t < INTOC + 0.2;
  const m = R.actor(EL.conserje, cx, 168, t, { dir: va ? -1 : 1, anda, sostiene: alarga ? [cx + 22, 146] : true, sorpresa: t > INTOC && t < INTOC + 1.4 });
  { const [mx, my] = m.mano, d = va ? -1 : 1; R.linea(mx, my, mx + 3 * d, my - 8, hex('#7a4a24')); for (let k = 0; k < 9; k++) R.pset(mx + 3 * d + Math.round(Math.cos(k) * 3) , my - 10 + Math.round(Math.sin(k * 1.7) * 2), k % 2 ? hex('#c8b090') : hex('#8a7058')); }
  const guarda = t > INTOC - 0.2 && t < INTOC + 2.2;
  R.actor(NC.keough, 153, 152, t, { dir: guarda ? -1 : 1, brazos: guarda, enfado: guarda, sonrisa: !guarda && t > INTOC + 2.2 });
  if (guarda && t < INTOC + 1.2) globo(150, 122, '!');
  R.actor(EL.guardia, 226, 160, t, { dir: -1, dedo: t > INTOC + 0.1 && t < INTOC + 1.8, habla: t > INTOC + 0.3 && t < INTOC + 1.6 && Math.sin(t * 9) > 0 });
  // los postes de latón con la cuerda de terciopelo, por delante del ejecutivo
  for (const px of [116, 204]) { R.rect(px - 1, 140, px + 1, 162, K); R.rect(px, 141, px, 161, hex('#c8a040')); R.rect(px - 3, 161, px + 3, 164, hex('#8a6a24')); R.disco(px, 139, 2, hex('#f0d070')); }
  for (let x = 117; x < 204; x++) { const u = (x - 117) / 87, y = Math.round(141 + Math.sin(u * Math.PI) * (7 + Math.sin(t * 2) * 0.8)); R.pset(x, y, hex('#8a1424')); R.pset(x, y + 1, hex('#5a0c18')); if (x % 5 === 0) R.pset(x, y, hex('#c04050')); }
};

// ── 2 · los tres cuadros: soldados, Navidad y verano ──
const SOLD = en('intocable', .3947), BEBEN = en('intocable', .4232), NAVI = en('intocable', .5494), ANUN = en('intocable', .5692), VERANO = en('intocable', .6323), TARDES = en('intocable', .6521);
const PAN = [[10, 102], [114, 206], [218, 310]], PY0 = 50, PY1 = 146;
const p2 = (t) => {
  capa('salon', () => {
    // el papel pintado de rombos, la moldura de los cuadros y el zócalo
    R.rect(0, 0, 319, 149, hex('#e8dcc0'));
    for (let y = 18; y < 150; y++) for (let x = 0; x < 320; x++) { if (x >= 272 && y < 48) continue; const a = (x + y * 2) % 16, b = (x - y * 2 + 320) % 16; if ((a === 0 || b === 0) && (x + y) % 2 === 0) R.pset(x, y, hex('#d4c4a0')); if (a === 8 && b === 8) R.pset(x, y, hex('#c8a070')); }
    R.rect(0, 0, 319, 15, hex('#efe6d0')); R.rect(0, 16, 319, 17, hex('#c8b48a')); R.rect(0, 18, 319, 18, hex('#8a6a40'));
    R.rect(0, 38, 319, 40, hex('#9a6a3e')); R.rect(0, 38, 319, 38, hex('#c08a52'));
    for (const [x0, x1] of PAN) { R.linea(Math.round((x0 + x1) / 2), 41, x0 + 8, PY0, hex('#6a5040')); R.linea(Math.round((x0 + x1) / 2), 41, x1 - 8, PY0, hex('#6a5040')); R.disco(Math.round((x0 + x1) / 2), 40, 1, hex('#c8a040')); }
    R.rect(0, 150, 319, 156, hex('#7a4a2a')); R.rect(0, 150, 319, 150, hex('#a8743e'));
    // el aparador de nogal con sus tiradores, el suelo y la alfombra
    R.rect(0, 157, 319, 179, hex('#5a3a24')); for (let x = 0; x < 320; x += 9) R.rect(x, 157, x, 179, hex('#4a2e1c'));
    caja(14, 160, 306, 176, NOG[0]); R.rect(14, 160, 306, 161, NOG[2]);
    for (let x0 = 18; x0 < 300; x0 += 48) { R.rect(x0, 164, x0 + 42, 174, NOG[1]); R.rect(x0 + 1, 165, x0 + 41, 173, NOG[0]); R.rect(x0 + 19, 168, x0 + 23, 169, hex('#c8a040')); }
    // la radio de mueble, el jarrón y la foto enmarcada encima del aparador
    caja(30, 146, 62, 159, hex('#8a5632')); R.rect(33, 148, 46, 157, hex('#c8b48a')); for (let x = 34; x < 46; x += 2) R.rect(x, 148, x, 157, hex('#a8946a')); R.disco(54, 152, 3, hex('#f0d070')); R.pset(54, 150, K);
    caja(156, 148, 164, 159, hex('#3a6a8a')); R.rect(157, 149, 158, 158, hex('#5a8aaa'));
    for (const [fx, fy, fc] of [[154, 142, '#e85a5a'], [160, 140, '#f0c040'], [166, 143, '#e85a5a'], [158, 145, '#f2eee2']]) { R.linea(160, 148, fx, fy + 2, hex('#3a7a3a')); R.disco(fx, fy, 2, hex(fc)); }
    caja(252, 148, 268, 159, hex('#c8a040')); R.rect(254, 150, 266, 157, hex('#a8c8d8')); R.rect(254, 154, 266, 157, hex('#6a8a5a'));
    botellita(290, 159, 'marron'); vasito(298, 159, 0.5);
  });
  // los tres cuadros: cada uno se pinta recortado a su hueco y se enciende con la voz
  const actA = tramo(t, SOLD - 0.25, SOLD + 0.15), actB = tramo(t, NAVI - 0.25, NAVI + 0.15), actC = tramo(t, VERANO - 0.25, VERANO + 0.15);
  // A · el campamento: cielo, colinas, tiendas, sacos terreros, la bandera y tres soldados que brindan
  { const [x0, x1] = PAN[0], cl = [x0 + 4, PY0 + 4, x1 - 4, PY1 - 4]; R.recorte(cl);
    grad(cl[0], cl[1], cl[2], 100, [hex('#7ab8e8'), hex('#a8d4f0'), hex('#d8ecf4')]);
    nubes(cl, t, 58, 80, [hex('#ffffff'), hex('#e8eef4'), hex('#b8c8d8'), hex('#c8d4e0')], 4, 1, 8); pajaros(t, cl[0], cl[2], 60, 2, 6);
    for (let x = cl[0]; x <= cl[2]; x++) { const hy = Math.round(92 + Math.sin(x * 0.09) * 3 + Math.sin(x * 0.23) * 1.5); R.linea(x, hy, x, 104, x % 3 ? hex('#7a9a6a') : hex('#6a8a5a')); }
    for (let y = 104; y <= cl[3]; y++) for (let x = cl[0]; x <= cl[2]; x++) R.pset(x, y, hh(x, y, 2) > 0.8 ? hex('#8a7448') : hh(x, y, 3) > 0.93 ? hex('#c8b080') : hex('#a08a5a'));
    for (const [tx, tw] of [[16, 30], [70, 28]]) { R.poligono([[tx, 112], [tx + tw / 2, 86], [tx + tw, 112]], hex('#6a6a44')); R.poligono([[tx + tw / 2, 86], [tx + tw, 112], [tx + tw / 2 + 4, 112]], hex('#4a4a2e')); R.poligono([[tx + tw / 2 - 3, 112], [tx + tw / 2, 100], [tx + tw / 2 + 3, 112]], hex('#2a2a1a')); R.linea(tx - 3, 112, tx + 2, 104, hex('#c8b890')); R.linea(tx + tw + 3, 112, tx + tw - 2, 104, hex('#c8b890')); }
    R.linea(58, 64, 58, 112, hex('#c8c8c8')); R.pset(58, 63, hex('#f0d070'));
    for (let j = 0; j < 7; j++) { const w = Math.round(Math.sin(t * 6 + j * 0.8) * 1.2); R.linea(59, 65 + j, 72, 65 + j + w, j % 2 ? hex('#f2eee2') : hex('#c8382e')); } R.rect(59, 65, 64, 68, hex('#2e3a7a')); R.pset(61, 66, hex('#ffffff')); R.pset(63, 67, hex('#ffffff'));
    for (let x = cl[0]; x <= cl[2]; x += 7) { R.disco(x + 3, 133, 3, K); R.rect(x, 131, x + 6, 135, hex('#b8a478')); R.rect(x + 1, 131, x + 5, 131, hex('#d8c8a0')); }
    { const hu = (t * 0.6) % 1; for (let k = 0; k < 3; k++) { const u = (hu + k / 3) % 1; R.disco(Math.round(88 + u * 4), Math.round(84 - u * 18), 1 + Math.round(u * 2), hex('#d8d4cc')); } R.rect(87, 86, 88, 96, K); }
    const sube = tramo(t, BEBEN - 0.3, BEBEN) * (1 - tramo(t, BEBEN + 1.3, BEBEN + 1.8));
    const a = R.actor(NC.soldado, 22, 130, t, { dir: 1, sostiene: [Math.round(lerp(38, 46, sube)), Math.round(lerp(116, 104, sube))], sonrisa: sube > 0.5 });
    const b = R.actor(NC.soldado, 52, 130, t, { dir: -1, sostiene: [Math.round(lerp(51, 47, sube)), Math.round(lerp(116, 104, sube))], sonrisa: sube > 0.5, pal: { H: '#2a1e18', h: '#4a3628' } });
    botellita(a.mano[0], a.mano[1] + 3, 'marron', -1 * sube); botellita(b.mano[0], b.mano[1] + 3, 'marron', 1 * sube);
    destello(47, 96, tramo(t, BEBEN, BEBEN + 0.5));
    const c = R.actor(NC.soldado, 74, 132, t, { dir: -1, sostiene: t > BEBEN + 0.6 ? [76, 107] : true, sonrisa: true, pal: { H: '#c8902a', h: '#e0a83a' } });
    botellita(c.mano[0], c.mano[1] + 3, 'marron', t > BEBEN + 0.6 ? 3 : 0);
    R.recorte(null); if (actA < 1) sombrear(cl[0], cl[1], cl[2], cl[3], hex('#1a1424'), 0.75 * (1 - actA)); }
  // B · la cena de Navidad: papel verde, la ventana con nieve, el árbol con luces, la mesa con el pavo, las velas y las botellas
  { const [x0, x1] = PAN[1], cl = [x0 + 4, PY0 + 4, x1 - 4, PY1 - 4]; R.recorte(cl);
    cajaR(cl[0], cl[1], cl[2], cl[3], hex('#2a4a3a')); for (let x = cl[0]; x <= cl[2]; x += 5) R.linea(x, cl[1], x, cl[3], hex('#224030')); for (let x = cl[0] + 2; x <= cl[2]; x += 10) for (let y = cl[1] + 3; y <= cl[3]; y += 8) R.pset(x, y, hex('#c8a040'));
    cajaR(160, 58, 196, 96, hex('#3a2a1e')); cajaR(162, 60, 194, 94, hex('#1a2450')); sombrear(162, 76, 194, 94, hex('#2a3a70'), 0.5);
    for (let x = 162; x <= 194; x++) { const ry = Math.round(84 + Math.sin(x * 0.3) * 2); R.linea(x, ry, x, 94, hex('#e8eef4')); } R.rect(172, 76, 180, 84, hex('#4a3a50')); R.rect(175, 80, 177, 84, hex('#f0d070'));
    R.recorte([162, 60, 194, 94]); for (let k = 0; k < 16; k++) { const y = Math.round(60 + ((k * 7 + t * 9) % 36)), x = Math.round(162 + hh(k, 4) * 32 + Math.sin(t * 2 + k) * 2); R.pset(x, y, hex('#ffffff')); } R.recorte(cl);
    R.rect(177, 60, 178, 94, hex('#3a2a1e')); R.rect(162, 76, 194, 77, hex('#3a2a1e'));
    R.disco(140, 66, 7, hex('#2e6a3a')); R.disco(140, 66, 4, hex('#2a4a3a')); R.rect(138, 72, 142, 75, hex('#c8382e')); R.pset(137, 76, hex('#c8382e')); R.pset(143, 76, hex('#c8382e'));
    for (let k = 0; k < 4; k++) R.poligono([[119 - k, 112 - k * 12], [128, 78 - k * 9], [137 + k, 112 - k * 12]], k % 2 ? hex('#2e6a3a') : hex('#1e5a2e'));
    R.pset(128, 70, hex('#f0d070')); R.pset(127, 71, hex('#f0d070')); R.pset(129, 71, hex('#f0d070')); R.pset(128, 72, hex('#f0d070'));
    for (let k = 0; k < 14; k++) { const on = Math.sin(t * 5 + k * 2.1) > 0; if (on) R.pset(121 + Math.round(hh(k, 5) * 14), 78 + Math.round(hh(k, 6) * 32), [hex('#ff5a5a'), hex('#f0d070'), hex('#5ab0ff'), hex('#80ff80')][k % 4]); }
    const brinda = tramo(t, ANUN - 0.2, ANUN + 0.2) * (1 - tramo(t, ANUN + 1.4, ANUN + 1.9));
    const nn = R.actor(EL.nina, 122, 126, t, { dir: 1, sostiene: [Math.round(lerp(137, 141, brinda)), Math.round(lerp(116, 104, brinda))], sonrisa: t > NAVI });
    const pa = R.actor(EL.padre, 158, 126, t, { dir: -1, sostiene: [Math.round(lerp(158, 152, brinda)), Math.round(lerp(116, 102, brinda))], sonrisa: t > NAVI, habla: t > NAVI && t < ANUN && Math.sin(t * 9) > 0 });
    const ab = R.actor(EL.abuela, 182, 126, t, { dir: -1, sostiene: [Math.round(lerp(182, 172, brinda)), Math.round(lerp(116, 104, brinda))], sonrisa: true });
    for (const v of [nn, pa, ab]) vasito(v.mano[0], v.mano[1] + 3, 0.7);
    destello(150, 98, tramo(t, ANUN, ANUN + 0.5));
    cajaR(cl[0], 119, cl[2], cl[3], hex('#f2eee2')); R.linea(cl[0], 119, cl[2], 119, hex('#ffffff')); for (let x = cl[0]; x <= cl[2]; x += 3) R.pset(x, 128, hex('#c8c0b0')); for (let x = cl[0]; x <= cl[2]; x += 6) R.disco(x, 130, 1, hex('#e0d8c8'));
    R.disco(146, 116, 5, hex('#7a3a1a')); R.disco(146, 115, 4, hex('#b8622a')); R.pset(144, 113, hex('#e8a060')); R.rect(140, 118, 152, 119, hex('#e8e4dc'));
    for (const vx of [140 - 2, 176]) { R.rect(vx, 110, vx + 1, 118, hex('#f2eee2')); const f = Math.sin(t * 13 + vx) > 0; R.pset(vx, 108, hex('#f0c040')); R.pset(vx + (f ? 1 : 0), 107, hex('#ffe890')); }
    botellita(172, 118, 'marron'); botellita(196, 118, 'marron'); R.rect(126, 117, 134, 118, hex('#e8e4dc'));
    for (let k = 0; k < 5; k++) { const x = 122 + Math.round(hh(k, 9) * 76); R.pset(x, 132 + (k % 3) * 3, hex('#c8382e')); }
    R.recorte(null); if (actB < 1) sombrear(cl[0], cl[1], cl[2], cl[3], hex('#1a1424'), 0.75 * (1 - actB)); }
  // C · el porche de verano: cielo de la tarde y un árbol, la casa de tablas, el columpio, la nevera de botellas y el aspersor
  { const [x0, x1] = PAN[2], cl = [x0 + 4, PY0 + 4, x1 - 4, PY1 - 4]; R.recorte(cl);
    grad(cl[0], cl[1], 246, 120, [hex('#f0b878'), hex('#f8d8a0'), hex('#f8ecc8')]);
    nubes([cl[0], cl[1], 246, 120], t, 58, 76, [hex('#fff4e0'), hex('#f8d8b0'), hex('#e0a888')], 3, 0.8, 7);
    R.disco(236, 64, 5, hex('#fff2b0'));
    R.rect(229, 96, 231, 124, hex('#5a3a24')); for (let k = 0; k < 6; k++) R.disco(222 + Math.round(hh(k, 1) * 18 + Math.sin(t * 1.5 + k) * 1), 82 + Math.round(hh(k, 2) * 18), 6, k % 2 ? hex('#3a7a3a') : hex('#4a9a4a'));
    cajaR(246, cl[1], cl[2], 112, hex('#e8e0c8')); for (let y = cl[1] + 6; y < 112; y += 4) R.linea(246, y, cl[2], y, hex('#c8bca0'));
    R.poligono([[240, 62], [cl[2] + 2, 62], [cl[2] + 2, 68], [240, 68]], hex('#7a4a3a')); for (let x = 240; x <= cl[2]; x += 4) R.linea(x, 62, x, 68, hex('#5a3226'));
    cajaR(262, 74, 274, 108, hex('#3a2a20')); for (let y = 76; y < 108; y += 2) R.linea(263, y, 273, y, hex('#5a4a3a')); R.pset(272, 92, hex('#c8a040'));
    cajaR(282, 76, 300, 98, hex('#a8d0e0')); sombrear(282, 76, 300, 98, hex('#d8eef4'), 0.3); R.linea(291, 76, 291, 98, hex('#f2eee2')); R.linea(282, 87, 300, 87, hex('#f2eee2')); cajaR(278, 76, 281, 98, hex('#4a7a5a')); cajaR(301, 76, 304, 98, hex('#4a7a5a'));
    for (const px of [248, 304]) cajaR(px, 68, px + 2, 116, hex('#f2eee2'));
    cajaR(240, 112, cl[2], 118, hex('#b88a5a')); for (let x = 240; x <= cl[2]; x += 6) R.linea(x, 112, x, 118, hex('#8a6038')); R.linea(240, 112, cl[2], 112, hex('#d8a878'));
    cajaR(246, 119, 270, 124, hex('#a87a4a')); cajaR(250, 125, 274, 130, hex('#a87a4a'));
    for (let y = 119; y <= cl[3]; y++) for (let x = cl[0]; x <= cl[2]; x++) if (y > 130 || x < 246) R.pset(x, y, hh(x, y, 5) > 0.7 ? hex('#4a8a3a') : hh(x, y, 6) > 0.9 ? hex('#7ac05a') : hex('#5aa04a'));
    for (let x = 249; x <= cl[2]; x += 6) cajaR(x, 104, x + 1, 112, hex('#f2eee2')); R.linea(248, 103, cl[2], 103, hex('#f2eee2'));
    // el columpio del porche que se mece colgado del alero
    { const s = Math.round(Math.sin(t * 1.8) * 2); R.linea(282, 68, 282 + s, 92, hex('#8a8a92')); R.linea(298, 68, 298 + s, 92, hex('#8a8a92')); cajaR(280 + s, 92, 300 + s, 94, hex('#c89a6a')); cajaR(280 + s, 86, 300 + s, 88, hex('#c89a6a')); }
    // el aspersor del césped
    for (let k = 0; k < 10; k++) { const u = ((t * 1.2 + k / 10) % 1), a = Math.sin(t * 1.6) * 0.8; const x = Math.round(234 + Math.sin(a) * u * 20), y = Math.round(138 - Math.sin(u * Math.PI) * 12); R.pset(x, y, hex('#c8eaff')); } R.rect(233, 137, 235, 139, hex('#8a8a92'));
    const bebe = tramo(t, TARDES - 0.2, TARDES + 0.2);
    const ch = R.actor(EL.chico, 252, 112, t, { dir: 1, sostiene: bebe > 0.5 ? [264, 94] : true, sonrisa: true });
    const ca = R.actor(EL.chica, 286, 112, t, { dir: -1, sostiene: t > VERANO ? [282, 98] : true, sonrisa: t > VERANO });
    botellita(ch.mano[0], ch.mano[1] + 3, 'marron', bebe > 0.5 ? -3 : 0); botellita(ca.mano[0], ca.mano[1] + 3, 'marron');
    cajaR(270, 104, 282, 112, hex('#c8382e')); R.linea(270, 104, 282, 104, hex('#e2675c')); cajaR(270, 106, 282, 107, hex('#f2eee2')); for (const bx of [272, 276, 280]) { R.pset(bx, 102, hex('#6a3a1e')); R.pset(bx, 103, hex('#6a3a1e')); R.pset(bx, 101, hex('#c8c8d2')); }
    { const u = (t * 0.4) % 1, bx = Math.round(240 + u * 60), by = Math.round(126 + Math.sin(t * 6) * 3); R.pset(bx, by, hex('#f0d070')); R.pset(bx - 1, by - (Math.sin(t * 20) > 0 ? 1 : 0), hex('#f8e8a0')); R.pset(bx + 1, by - (Math.sin(t * 20) > 0 ? 1 : 0), hex('#f8e8a0')); }
    R.recorte(null); if (actC < 1) sombrear(cl[0], cl[1], cl[2], cl[3], hex('#1a1424'), 0.75 * (1 - actC)); }
  // los marcos dorados de los cuadros, con el brillo que pasa al encenderse
  for (const [k, [x0, x1]] of PAN.entries()) {
    R.rect(x0, PY0, x1, PY0 + 3, hex('#c8a040')); R.rect(x0, PY1 - 3, x1, PY1, hex('#8a6a24')); R.rect(x0, PY0, x0 + 3, PY1, hex('#b08a34')); R.rect(x1 - 3, PY0, x1, PY1, hex('#8a6a24'));
    R.rect(x0, PY0, x1, PY0, K); R.rect(x0, PY1, x1, PY1, K); R.rect(x0, PY0, x0, PY1, K); R.rect(x1, PY0, x1, PY1, K); R.rect(x0 + 1, PY0 + 1, x1 - 1, PY0 + 1, hex('#f0d070'));
    const u = tramo(t, [SOLD, NAVI, VERANO][k] - 0.1, [SOLD, NAVI, VERANO][k] + 0.5); if (u > 0 && u < 1) { const bx = Math.round(x0 + u * (x1 - x0)); R.linea(bx, PY0 + 1, bx - 4, PY0 + 3, hex('#ffffff')); R.linea(bx, PY1 - 3, bx - 4, PY1 - 1, hex('#fff2b0')); }
  }
};

// ── 3 · la sala de juntas: nadie soñaba con cambiarla… hasta que empezó a perder ──
const COMP = en('intocable', .7727), SUENA = en('intocable', .816), CAMB = en('intocable', .8482), HASTA = en('intocable', .8952), PIERDE = en('intocable', .9583);
const p3 = (t) => {
  const o = { encuadre: 'sede', grafica: 0.3 * tramo(t, HASTA, PIERDE + 0.6) };
  T.colas(R, t, o);
  const mira = t > HASTA + 0.3, enf = t > CAMB - 0.1 && t < HASTA;
  const brinda = tramo(t, COMP - 0.3, COMP) * (1 - tramo(t, SUENA - 0.2, SUENA + 0.3));
  // los dos directivos sentados detrás de la mesa, con sus botellas
  const d1 = R.actor(EL.ejecutivo, 108, 136, t, { dir: mira ? 1 : 1, sostiene: brinda > 0 ? [Math.round(lerp(122, 140, brinda)), Math.round(lerp(126, 112, brinda))] : true, sonrisa: t < CAMB - 0.1, enfado: enf, sorpresa: mira });
  const d2 = R.actor(EL.ejecutivo2, 182, 136, t, { dir: mira ? 1 : -1, sostiene: brinda > 0 ? [Math.round(lerp(182, 160, brinda)), Math.round(lerp(126, 112, brinda))] : true, sonrisa: t < CAMB - 0.1, enfado: enf, sorpresa: mira, habla: enf && Math.sin(t * 10) > 0 });
  for (const d of [d1, d2]) botellita(d.mano[0], d.mano[1] + 3, 'marron');
  destello(150, 106, tramo(t, COMP, COMP + 0.5));
  T.colasDelante(R, t, o);
  // el presidente, de pie delante: alza su botella, y en «changing» le dice que no con el dedo al científico
  const pres = R.actor(NC.keough, 36, 166, t, { dir: mira ? 1 : 1, sostiene: !enf && t < HASTA ? [52, 140] : undefined, dedo: enf, enfado: enf, sonrisa: t < CAMB - 0.1, sorpresa: mira && t < PIERDE, triste: t > PIERDE });
  if (!enf && t < HASTA) botellita(pres.mano[0], pres.mano[1] + 3, 'marron');
  if (enf) globo(44, 132, 'X');
  // el científico entra con su matraz y una pregunta, y se vuelve por donde ha venido
  const sx = t < SUENA ? Math.round(lerp(330, 236, tramo(t, P3 + 0.2, SUENA))) : t < HASTA ? 236 : Math.round(lerp(236, 340, tramo(t, HASTA, HASTA + 1.6)));
  if (sx < 330) { R.actor(NC.cientifico, sx, 166, t, { dir: t < HASTA ? -1 : 1, anda: t < SUENA || t > HASTA, sorpresa: enf, sonrisa: t > SUENA - 0.2 && t < CAMB - 0.1 }); if (t > SUENA - 0.1 && t < CAMB) globo(sx + 7, 136, '?', hex("#2e5aa8")); }
  // el teléfono suena en «until»
  if (t > HASTA && t < HASTA + 1.6 && Math.floor(t * 8) % 2 === 0) { R.linea(277, 98, 274, 95, K); R.linea(297, 98, 300, 95, K); R.linea(276, 102, 272, 102, K); R.linea(298, 102, 302, 102, K); }
  if (mira && t < PIERDE + 0.6) globo(230, 40, '!');
  // el carrito de bebidas de latón con botellas rectas y el maletín en el suelo
  R.rect(196, 154, 230, 156, hex('#c8a040')); R.rect(196, 154, 230, 154, hex('#f0d070')); R.rect(196, 166, 230, 167, hex('#8a6a24')); R.rect(197, 156, 198, 172, hex('#8a6a24')); R.rect(228, 156, 229, 172, hex('#8a6a24')); R.disco(198, 173, 2, K); R.disco(228, 173, 2, K);
  for (let k = 0; k < 5; k++) botellita(201 + k * 6, 153, k === 2 ? 'rojo' : 'marron'); vasito(206, 165, 0); vasito(214, 165, 0); vasito(222, 165, 0.5);
  R.rect(70, 160, 88, 170, K); R.rect(71, 161, 87, 169, hex('#6a3a1e')); R.rect(71, 161, 87, 162, hex('#8a5632')); R.rect(76, 157, 82, 160, K); R.rect(78, 164, 80, 165, hex('#c8a040'));
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], {
  año: (t) => t < P2 ? Math.round(lerp(1886, 1960, tramo(t, 0.3, P2 - 0.6))) : t < P3 ? (t < NAVI - 0.2 ? 1943 : t < VERANO - 0.2 ? 1955 : 1962) : 1975,
  efectos: [[0.7, 'tic'], [INTOC, 'whoosh'], [4.6, 'timbre'], [SOLD, 'pop'], [BEBEN + 0.05, 'toc'], [NAVI, 'campana'], [VERANO, 'pop'], [TARDES + 0.2, 'burbujas'], [COMP + 0.05, 'toc'], [HASTA, 'ring']],
});
''')

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nc-reto'] = ('El reto', '''// NC-RETO (frase 8, «In 1975, its big rival, Pepsi, set up tables in supermarkets…»), cartela 1975 y barra en 1975.
// Cuatro planos:
// 1. «In 1975, its big rival, Pepsi, set up tables in supermarkets» (cartela–6,4 s): el supermercado de 1975; el
//    empleado del rival llega por detrás de la mesa con la bandeja y deja los dos vasos en «tables»; el cámara enciende
//    la cámara de tele en «Pepsi»; la señora llega con su bolso en «supermarkets» y se pregunta qué es eso; un cliente
//    cruza por delante con su carro.
// 2. «with two unmarked cups and asked people to taste both colas blind» (6,4–10,9 s): la mesa de la cata de cerca; las
//    dos manos del empleado tocan los vasos en «two», brillan en «unmarked», y desde «asked» los cambian de sitio tres
//    veces como los trileros (gag 3); en «blind» las manos se retiran y salta un «?» sobre cada vaso.
// 3. «It called it the Pepsi Challenge, and it filmed it for TV» (10,9–14,5 s): el salón de una casa de 1975; en la
//    tele, la cata grabada en el súper (la señora que prueba, los dos vasos); en «Challenge» sale un «?» enorme, en
//    «filmed» el piloto rojo de grabación; los niños la miran de pie y el niño la señala; el padre entra con las palomitas.
// 4. «Most people picked theirs, the sweeter one» (14,5 s–fin): la frutería del súper con otra mesa de cata y una cola;
//    la señora prueba, se le iluminan los ojos y en «picked» señala el vaso de la derecha; en «theirs» el empleado
//    destapa detrás de ese vaso la lata azul; el tablero de palotes suma rayas azules; en «sweeter» la cola aplaude.''', COMUN + r'''
const r = (f) => en('reto', f);
const P2 = r(.3212), P3 = r(.6104), P4 = r(.8487);
// ── 1 · el súper: llegan los vasos, la cámara y la señora ──
const PEPSI = r(.1658), MESAS = r(.2298), SUPER = r(.2742);
const p1 = (t) => {
  const o = { encuadre: 'super', vasos: t > MESAS, graba: t > PEPSI, azul: 0.5 };
  T.colas(R, t, o);
  // el empleado llega por detrás de la mesa con la bandeja y deja los vasos
  const ex = Math.round(lerp(146, 177, tramo(t, 1.4, 3.2)));
  const em = R.actor(NC.empleadoPepsi, ex, 138, t, { dir: t > MESAS + 0.2 ? 1 : 1, anda: t > 1.4 && t < 3.2, sostiene: t < MESAS ? [ex + 16, 124] : undefined, dedo: t > MESAS + 0.3, habla: t > MESAS + 0.3 && t < P2 - 0.3 && Math.sin(t * 9) > 0, sonrisa: true });
  if (t < MESAS) { const [mx, my] = em.mano; R.rect(mx - 9, my + 1, mx + 9, my + 2, K); R.rect(mx - 8, my + 1, mx + 8, my + 1, hex('#c8c8d2')); vasito(mx - 4, my, 0.8); vasito(mx + 4, my, 0.8); }
  T.colasDelante(R, t, o);
  if (t > MESAS && t < MESAS + 0.5) destello(184, 112, tramo(t, MESAS, MESAS + 0.5));
  // el cámara mira por el visor y enciende la cámara en «Pepsi»
  R.actor(NC.camarografo, 6, 166, t, { dir: 1, sostiene: t > PEPSI - 0.3 ? [30, 138] : undefined, sonrisa: t > PEPSI });
  // la señora llega con su bolso en «supermarkets» y se pregunta qué es
  const sx = Math.round(lerp(330, 234, tramo(t, 2.2, SUPER)));
  R.actor(NC.senora75, sx, 158, t, { dir: -1, anda: t > 2.2 && t < SUPER, sorpresa: t > SUPER && t < SUPER + 0.5, sonrisa: t > SUPER + 0.5 });
  if (t > SUPER + 0.1 && t < P2) globo(sx + 8, 128, '?', hex("#2e5aa8"));
  // un cliente cruza por delante empujando su carro
  { const cx = Math.round(lerp(-40, 150, tramo(t, 2.6, P2))); if (cx > -40 && cx < 150) {
    R.actor(EL.senor30, cx, 179, t, { dir: 1, anda: true });
    const x0 = cx + 15; R.rect(x0, 163, x0 + 22, 174, K); R.rect(x0 + 1, 164, x0 + 21, 173, hex('#c8c8d2')); for (let i = x0 + 3; i < x0 + 21; i += 3) R.rect(i, 164, i, 173, hex('#8a8c98')); R.rect(x0 + 1, 168, x0 + 21, 168, hex('#8a8c98')); R.disco(x0 + 4, 177, 2, K); R.disco(x0 + 19, 177, 2, K); R.rect(x0 - 3, 162, x0, 163, K);
    R.rect(x0 + 4, 158, x0 + 10, 163, hex('#e8a040')); R.rect(x0 + 12, 157, x0 + 16, 163, hex('#5aa04a')); } }
};

// ── 2 · la mesa de cerca: los vasos sin marca y el trile ──
const DOS = r(.3447), SINMARCA = r(.3617), PIDE = r(.4465), CIEGAS = r(.5771);
const S1 = PIDE, S2 = PIDE + 0.6, S3 = PIDE + 1.2;
const trile = (t) => t < S1 ? 0 : t < S1 + 0.5 ? tramo(t, S1, S1 + 0.5) : t < S2 ? 1 : t < S2 + 0.5 ? 1 - tramo(t, S2, S2 + 0.5) : t < S3 ? 0 : tramo(t, S3, S3 + 0.5);
const p2 = (t) => {
  const u = trile(t), e = u * u * (3 - 2 * u), alto = Math.round(Math.sin(e * Math.PI) * 24);
  const xa = Math.round(lerp(130, 196, e)), xb = Math.round(lerp(196, 130, e));
  T.colas(R, t, { encuadre: 'super', camara: 'mesa', trile: u });
  // las manos del empleado: entran por abajo, tocan los vasos en «two», los mueven en el trile y se van en «blind»
  const dentro = tramo(t, P2 + 0.1, DOS) * (1 - tramo(t, CIEGAS - 0.3, CIEGAS + 0.2));
  if (dentro > 0) {
    const baja = Math.round((1 - dentro) * 60), toca = t > DOS && t < DOS + 0.4 ? 2 : 0;
    const ya = 140 - alto + baja + toca, yb = 142 + Math.round(alto * 0.4) + baja + toca;
    const brazoA = () => T.brazo(R, xa - 34, 186 + baja, xa - 20, ya, '#3a6ad8', 1);
    const brazoB = () => T.brazo(R, xb + 34, 186 + baja, xb + 20, yb, '#3a6ad8', -1);
    if (xa < xb) { brazoB(); brazoA(); } else { brazoA(); brazoB(); }
  }
  for (const [vx, k] of [[130, 0], [196, 1]]) destello(vx + 12, 108, tramo(t, SINMARCA + k * 0.12, SINMARCA + 0.6 + k * 0.12));
  if (t > CIEGAS) for (const vx of [130, 196]) { const s = Math.min(1, (t - CIEGAS) * 5), y = Math.round(92 - s * 8); R.rect(vx - 9, y - 9, vx + 9, y + 9, K); R.rect(vx - 8, y - 8, vx + 8, y + 8, hex('#fbf6ea')); R.icono('?', vx - 5, y - 6, hex('#2e5aa8'), K, 2); }
};

// ── 3 · el salón: la cata sale por la tele ──
const RETO = r(.6776), GRABA = r(.7599), TELE = r(.8004);
const p3 = (t) => {
  const o = { encuadre: 'rival', camara: 'tele' };
  T.anuncio(R, t, o);
  // la pantalla: la cata grabada en el súper (recortada al tubo), con su «?», el piloto rojo y las líneas del tubo
  const cl = [202, 88, 252, 124]; R.recorte(cl);
  grad(202, 88, 252, 112, [hex('#f0d8a0'), hex('#e8c080')]);
  for (let x = 203; x < 252; x += 3) { const c = hh(x, 1) > 0.5 ? hex('#c8382e') : hex('#2e5aa8'); R.linea(x, 90, x, 93, c); R.linea(x + 1, 90, x + 1, 93, c); } R.linea(202, 94, 252, 94, hex('#8a8c98'));
  cajaR(202, 113, 252, 124, hex('#a89070')); cajaR(214, 111, 252, 118, hex('#fbf6ea')); R.linea(214, 118, 252, 118, hex('#c8382e')); R.linea(214, 111, 252, 111, K);
  for (const vx of [228, 242]) { cajaR(vx - 4, 100, vx + 4, 110, K); cajaR(vx - 3, 101, vx + 3, 109, hex('#d6e6ee')); cajaR(vx - 3, 104, vx + 3, 109, hex('#4a2414')); }
  { const bebe = Math.sin(t * 3) > 0, hx = 209; R.disco(hx, 99, 4, K); R.disco(hx, 99, 3, hex('#8a5a2a')); R.disco(hx + 1, 100, 2, hex('#f0c090')); cajaR(hx - 4, 104, hx + 4, 120, K); cajaR(hx - 3, 105, hx + 3, 120, hex('#d8902a')); if (bebe) { cajaR(hx + 3, 99, hx + 6, 104, K); cajaR(hx + 4, 100, hx + 5, 103, hex('#d6e6ee')); } }
  if (t > RETO - 0.1 && t < GRABA) { const s = 1 + Math.round(Math.sin(t * 8) * 0.4 + 0.5); R.icono('?', 229 - 3 * s, 92, hex('#ffffff'), K, s + 1); }
  if (t > GRABA && Math.floor(t * 3) % 2 === 0) R.disco(208, 93, 2, hex('#ff3030'));
  for (let y = 89; y <= 124; y += 3) for (let x = 202; x <= 252; x++) if ((x + y) % 4 === 0) R.pset(x, y, hex('#5a4a50'));
  R.recorte(null);
  T.anuncioDelante(R, t, o);
  // los niños miran la tele de pie; el niño la señala en «Challenge»
  R.actor(EL.nina, 176, 166, t, { dir: 1, sonrisa: true, sorpresa: t > GRABA && t < TELE + 0.3 });
  R.actor(EL.chico, 160, 172, t, { dir: 1, dedo: t > RETO && t < GRABA + 0.4, habla: t > RETO && t < RETO + 0.8 && Math.sin(t * 10) > 0, sonrisa: t > GRABA });
  // el padre entra con el cuenco de palomitas
  const px = Math.round(lerp(-18, 92, tramo(t, P3 + 0.3, P3 + 2.1)));
  const pa = R.actor(EL.padre, px, 174, t, { dir: 1, anda: t > P3 + 0.3 && t < P3 + 2.1, sostiene: true, sorpresa: t > TELE - 0.2, sonrisa: t < TELE - 0.2 });
  { const [mx, my] = pa.mano; R.disco(mx, my, 5, K); R.rect(mx - 5, my - 1, mx + 5, my + 3, hex('#e8a040')); R.rect(mx - 4, my, mx + 4, my + 2, hex('#c8782a')); for (let k = 0; k < 6; k++) R.pset(mx - 4 + k * 2, my - 2 - (k % 2), hex('#fbf6ea')); }
  if (t > TELE - 0.1 && t < TELE + 0.6) globo(px + 8, 144, '!');
};

// ── 4 · la frutería del súper: la señora elige el vaso de la derecha ──
const ELIGE = r(.8878), SUYO = r(.9074), DULCE = r(.9505);
const p4 = (t) => {
  capa('fruteria', () => {
    // el techo de placas con los tubos, la pared de azulejos y el toldo de rayas de la frutería
    R.rect(0, 0, 319, 19, hex('#e8e0cc')); for (let x = 0; x < 320; x += 20) R.rect(x, 0, x, 19, hex('#d0c8b4')); R.rect(0, 10, 319, 10, hex('#d0c8b4'));
    for (const x0 of [34, 196]) { caja(x0, 4, x0 + 62, 8, hex('#fbfaf4'), hex('#a8a090')); R.rect(x0 + 2, 5, x0 + 60, 5, hex('#ffffff')); }
    R.rect(0, 20, 319, 22, hex('#8a5a2a'));
    for (let y = 23; y < 118; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x < 272 || y > 48) && (x % 10 === 0 || y % 10 === 3) ? hex('#c8bca0') : y < 60 ? hex('#efe6cc') : hex('#e8dcc0'));
    for (let x = 0; x < 272; x++) { R.rect(x, 36, x, 38, hex('#e8902a')); R.rect(x, 40, x, 42, hex('#d8b040')); R.rect(x, 44, x, 46, hex('#8a5a2a')); }
    // el toldo verde y blanco sobre la fruta
    for (let x = 0; x < 168; x++) { const c = Math.floor(x / 8) % 2 ? hex('#3a8a4a') : hex('#f2eee2'); R.rect(x, 52, x, 62, c); const yb = 62 + (x % 8 < 4 ? x % 8 : 8 - x % 8) / 2; R.rect(x, 63, x, Math.round(yb + 2), c); R.pset(x, Math.round(yb + 3), K); }
    R.rect(0, 51, 168, 51, K); R.rect(0, 52, 168, 53, hex('#2a6a3a'));
    // los cajones inclinados de fruta en dos gradas
    const FR = [['#c8382e', '#8a2018', '#f08070'], ['#f0902a', '#c86818', '#ffc070'], ['#e8d040', '#b89a20', '#fff090'], ['#4a9a3a', '#2a6a2a', '#8ad06a'], ['#7a3a8a', '#4a1a5a', '#b070c0'], ['#d84a3a', '#a02a1a', '#f8907a']];
    for (const [k, [x0, y0]] of [[0, 70], [28, 70], [56, 70], [84, 70], [112, 70], [140, 70], [0, 92], [28, 92], [56, 92], [84, 92], [112, 92], [140, 92]].entries()) {
      const [c, cs, cl] = FR[(k * 5 + (y0 > 80 ? 2 : 0)) % 6].map(hex);
      R.rect(x0 + 1, y0 + 14, x0 + 27, y0 + 22, hex('#a8743e')); R.rect(x0 + 1, y0 + 14, x0 + 27, y0 + 14, hex('#c8945a')); R.rect(x0 + 1, y0 + 18, x0 + 27, y0 + 18, hex('#7a4a24')); R.rect(x0, y0 + 14, x0, y0 + 22, K); R.rect(x0 + 28, y0 + 14, x0 + 28, y0 + 22, K);
      for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) { const fx = x0 + 3 + i * 4 + (j % 2) * 2, fy = y0 + 12 - j * 3; if (fx > x0 + 26) continue; R.disco(fx, fy, 2, cs); R.disco(fx, fy - 1, 1, c); R.pset(fx - 1, fy - 2, cl); }
    }
    caja(170, 64, 176, 118, hex('#a8743e')); R.rect(0, 114, 176, 117, hex('#7a4a24')); R.rect(0, 114, 176, 114, hex('#c8945a'));
    // la mesa plegable de la cata con su mantel de cuadros (el faldón va delante, en cada fotograma)
    // el caballete con el tablero de palotes
    R.linea(262, 150, 270, 60, hex('#7a4a24')); R.linea(306, 150, 298, 60, hex('#7a4a24')); R.linea(284, 150, 284, 70, hex('#5a3418'));
    caja(258, 58, 310, 128, hex('#fbf6ea'), hex('#5a3418')); R.rect(258, 128, 310, 131, hex('#a8743e'));
    R.rect(284, 62, 284, 124, hex('#c8c0b0')); R.icono('lata', 267, 62, hex('#c8382e'), K, 1); R.icono('lata', 293, 62, hex('#2e5aa8'), K, 1);
    for (let k = 0; k < 2; k++) { const x0 = 262 + Math.floor(k / 1) * 0, y0 = 74 + k * 10; for (let i = 0; i < 4; i++) R.rect(x0 + i * 3, y0, x0 + i * 3, y0 + 7, hex('#c8382e')); R.linea(x0 - 1, y0 + 6, x0 + 11, y0 + 1, hex('#c8382e')); }
    // el suelo de linóleo a cuadros con el brillo de los tubos
    for (let y = 118; y < 180; y++) { const d = y - 70; for (let x = 0; x < 320; x++) { const i = Math.floor((x - 160) / d * 5 + 100), j = Math.floor(600 / d); R.pset(x, y, (i + j) & 1 ? hex('#c8b890') : hex('#e8dcc0')); } }
    for (let y = 124; y < 160; y += 2) for (let x = 60 + (y - 124); x < 100 + (y - 124); x++) if (tr(x, y, 0.4)) R.pset(x, y, hex('#fbf6ea'));
    // la báscula colgada
    R.linea(214, 22, 214, 40, hex('#8a8c98')); R.disco(214, 46, 7, K); R.disco(214, 46, 6, hex('#f2eee2')); R.pset(214, 42, hex('#c8382e'));
  });
  // el tubo que parpadea y la neblina que riega la fruta
  if (Math.floor(t * 7) % 9 === 0) R.rect(36, 5, 94, 7, hex('#c8c0b0'));
  if ((t % 3) < 0.7) for (let k = 0; k < 20; k++) R.pset(Math.round(4 + hh(k, 1) * 160), Math.round(66 + ((t * 30 + k * 7) % 28)), hex('#e8f4ff'));
  // los precios colgados que se mecen
  for (const [k, [px, num]] of [[40, '39'], [100, '59'], [150, '25']].entries()) { const s = Math.round(Math.sin(t * 1.6 + k) * 1.5); R.linea(px, 22, px + s, 28, hex('#8a8c98')); caja(px + s - 9, 28, px + s + 9, 37, hex('#f0c040')); R.numero(num, px + s + 1, 36, { centro: true, color: hex('#c8382e'), sombra: false }); }
  // la aguja de la báscula que oscila
  { const a = Math.sin(t * 2) * 0.6; R.linea(214, 46, Math.round(214 + Math.sin(a) * 5), Math.round(46 - Math.cos(a) * 5), K); }
  // el dependiente de la fruta coloca manzanas al fondo
  R.actor(EL.cajera, 6, 122, t, { dir: 1, sostiene: Math.sin(t * 2) > 0 ? [20, 98] : [18, 104], sonrisa: true });
  // el tablero de palotes: suman rayas azules (la mayoría elige la suya)
  { const n = 6 + Math.floor(tramo(t, P4, DULCE + 0.4) * 12); for (let k = 0; k < n; k++) { const g = Math.floor(k / 5), i = k % 5, x0 = 289 + (g % 2) * 0, y0 = 74 + g * 10; if (y0 > 120) break; if (i < 4) R.rect(x0 + i * 3, y0, x0 + i * 3, y0 + 7, hex('#2e5aa8')); else R.linea(x0 - 1, y0 + 6, x0 + 11, y0 + 1, hex('#2e5aa8')); } }
  // el empleado detrás de la mesa; en «theirs» destapa la lata azul detrás del vaso de la derecha
  const destapa = tramo(t, SUYO - 0.15, SUYO + 0.2);
  const em = R.actor(NC.empleadoPepsi, 198, 128, t, { dir: -1, sostiene: destapa > 0 ? [Math.round(lerp(214, 222, destapa)), Math.round(lerp(126, 106, destapa))] : undefined, sonrisa: t > SUYO, habla: t < ELIGE && Math.sin(t * 7) > 0.3 });
  // la mesa con su mantel de cuadros y los dos vasos
  for (let x = 176; x <= 244; x++) for (let y = 126; y <= 146; y++) R.pset(x, y, (Math.floor(x / 4) + Math.floor(y / 4)) % 2 ? hex('#c8382e') : hex('#fbf6ea'));
  R.rect(175, 125, 245, 125, K); R.rect(175, 125, 175, 146, K); R.rect(245, 125, 245, 146, K); R.rect(178, 147, 180, 156, K); R.rect(240, 147, 242, 156, K);
  PZ.vaso(R, 192, 126, { lleno: 0.8 }); PZ.vaso(R, 222, 126, { lleno: 0.35 });
  if (destapa > 0) { const [mx, my] = em.mano; PZ.lata(R, mx, my + 6, { color: 'azul' }); destello(mx + 4, my - 12, tramo(t, SUYO, SUYO + 0.6)); }
  // el azucarero que brilla en «sweeter»
  R.rect(232, 118, 240, 125, K); R.rect(233, 119, 239, 124, hex('#fbf6ea')); R.rect(234, 116, 238, 118, hex('#c8c0b0')); destello(236, 114, tramo(t, DULCE, DULCE + 0.7));
  // la señora prueba, se le iluminan los ojos y señala el vaso de la derecha en «picked»
  const prueba = t < ELIGE - 0.1;
  const se = R.actor(NC.senora75, 152, 158, t, { dir: 1, sostiene: prueba ? [166, 140 - (Math.sin(t * 3) > 0 ? 4 : 0)] : undefined, dedo: !prueba, sorpresa: t > ELIGE - 0.1 && t < SUYO, sonrisa: t > SUYO });
  if (prueba) vasito(se.mano[0], se.mano[1] + 2, 0.5);
  if (t > ELIGE - 0.1 && t < ELIGE + 0.6) { destello(160, 132, tramo(t, ELIGE - 0.1, ELIGE + 0.5)); destello(166, 131, tramo(t, ELIGE, ELIGE + 0.6)); }
  if (t > SUYO) T.visto(R, 216, 86, 2);
  // la cola de clientes que espera y aplaude en «sweeter»
  const aplaude = t > DULCE && Math.floor(t * 6) % 2 === 0;
  R.actor(EL.senor30, 126, 156, t, { dir: 1, brazos: aplaude, sonrisa: t > SUYO });
  R.actor(EL.chica, 102, 154, t, { dir: 1, brazos: t > DULCE && !aplaude, sonrisa: t > SUYO, sorpresa: t > ELIGE && t < SUYO });
  R.actor(EL.chico, 80, 152, t, { dir: 1, dedo: t > SUYO && t < DULCE, sonrisa: t > SUYO });
  // un carro de la compra que pasa por delante
  { const cx = Math.round(lerp(330, -40, tramo(t, P4 + 0.5, P4 + 4.0))); R.rect(cx, 164, cx + 24, 175, K); R.rect(cx + 1, 165, cx + 23, 174, hex('#c8c8d2')); for (let i = cx + 3; i < cx + 23; i += 3) R.rect(i, 165, i, 174, hex('#8a8c98')); R.rect(cx + 1, 169, cx + 23, 169, hex('#8a8c98')); R.disco(cx + 4, 178, 2, K); R.disco(cx + 20, 178, 2, K); R.rect(cx + 24, 162, cx + 28, 163, K); R.rect(cx + 5, 159, cx + 12, 164, hex('#2e5aa8')); R.rect(cx + 14, 160, cx + 20, 164, hex('#e8d040')); }
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  cartela: '1975', año: 1975,
  efectos: [[PEPSI, 'bip'], [MESAS, 'golpecito'], [SINMARCA, 'brillo'], [S1, 'whoosh'], [S2, 'whoosh'], [S3, 'whoosh'], [CIEGAS, 'pop'], [RETO, 'pop'], [GRABA, 'bip'], [ELIGE, 'pop'], [SUYO, 'brillo'], [DULCE + 0.1, 'palmada']],
});
''')

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nc-cuota'] = ('La cuota', '''// NC-CUOTA (frase 9, «To make things worse, Coca-Cola's share of the market had been slipping for years…»), sin
// cartela; la barra del año corre de 1975 a 1984 en el plano 1 y se queda en 1984. Tres planos:
// 1. «To make things worse, Coca-Cola's share of the market had been slipping for years, while Pepsi kept climbing»
//    (0–6,3 s): la sala de juntas de la sede; la gráfica se dibuja: el presidente la señala en «share», la línea roja
//    baja en «slipping» (él se pone triste) y la azul sube en «climbing» (sorpresa); la secretaria entra y deja otra
//    carpeta en la mesa en «years»; el directivo de detrás se lleva las manos a la cabeza.
// 2. «In grocery stores, Pepsi was already selling more» (6,3–9,9 s): el estante de las latas de cerca; la mano del
//    reponedor pasa por la balda del medio y las latas se vuelven azules a su paso, y arriba y abajo también; en «selling
//    more» la mano de una clienta coge una lata azul y la mete en su cesta.
// 3. «For a company that thought it was unbeatable, it was an alarm going off» (9,9 s–fin): la torre de la sede en
//    Atlanta con su plaza; el directivo saca pecho junto al trofeo del número 1, que brilla en «unbeatable»; en «alarm»
//    se enciende la baliza roja de la azotea, las ventanas parpadean en rojo, las palomas salen volando, la gente sale
//    corriendo por la puerta y el directivo se asusta.''', COMUN + r'''
const c = (f) => en('cuota', f);
const P2 = c(.4378), P3 = c(.702);
// ── 1 · la gráfica en la sala de juntas ──
const CUOTA = c(.1422), BAJA = c(.235), AÑOS = c(.2814), SUBE = c(.3996);
const p1 = (t) => {
  const o = { encuadre: 'sede', grafica: lerp(0.3, 1, tramo(t, 1.0, SUBE + 0.3)) };
  T.colas(R, t, o);
  // el directivo de detrás de la mesa, con las manos en la cabeza cuando la roja baja
  R.actor(EL.ejecutivo2, 182, 136, t, { dir: 1, brazos: t > BAJA + 0.2 && t < SUBE, triste: t > BAJA, sorpresa: t > SUBE });
  R.actor(EL.ejecutivo, 108, 136, t, { dir: 1, habla: t < BAJA && Math.sin(t * 8) > 0, triste: t > BAJA + 0.4, sorpresa: t > SUBE && t < SUBE + 0.6 });
  T.colasDelante(R, t, o);
  // la carpeta que deja la secretaria en la mesa
  if (t > AÑOS) { R.rect(84, 128, 100, 131, K); R.rect(85, 128, 99, 130, hex('#e8c060')); R.rect(85, 128, 99, 128, hex('#f8e0a0')); }
  // la secretaria entra por la izquierda con la carpeta y la deja en «years»
  const sx = t < AÑOS ? Math.round(lerp(-18, 76, tramo(t, 0.6, AÑOS - 0.2))) : t < AÑOS + 0.8 ? 76 : Math.round(lerp(76, -24, tramo(t, AÑOS + 0.8, P2)));
  const se = R.actor(EL.cajera, sx, 166, t, { dir: t < AÑOS + 0.8 ? 1 : -1, anda: (t > 0.6 && t < AÑOS - 0.2) || t > AÑOS + 0.8, sostiene: t < AÑOS ? [sx + 16, 146] : undefined, triste: t > BAJA });
  if (t < AÑOS) { const [mx, my] = se.mano; R.rect(mx - 6, my - 4, mx + 6, my + 4, K); R.rect(mx - 5, my - 3, mx + 5, my + 3, hex('#e8c060')); R.rect(mx - 5, my - 3, mx + 5, my - 2, hex('#f8e0a0')); }
  // el presidente señala la gráfica en «share»
  R.actor(NC.keough, 248, 166, t, { dir: -1, dedo: t > CUOTA - 0.2 && t < SUBE + 0.3, habla: t > CUOTA && t < BAJA && Math.sin(t * 9) > 0, triste: t > BAJA && t < SUBE, sorpresa: t > SUBE });
  if (t > SUBE && t < SUBE + 0.9) globo(256, 136, '!');
  // las puntas de las líneas, resaltadas cuando la voz las nombra
  destello(236, 72, tramo(t, BAJA, BAJA + 0.6)); destello(236, 64, tramo(t, SUBE, SUBE + 0.6));
  // la papelera con bolas de papel y el periódico en el suelo; una bola nueva cae cuando la roja baja
  R.rect(288, 158, 304, 174, K); R.rect(289, 159, 303, 173, hex('#8a8c98')); for (let x = 291; x < 303; x += 3) R.rect(x, 159, x, 173, hex('#6a6c78')); R.disco(293, 157, 3, hex('#f2eee2')); R.disco(299, 156, 3, hex('#e8e4dc'));
  { const u = tramo(t, BAJA + 0.3, BAJA + 1.1); if (u > 0) { const bx = Math.round(lerp(262, 296, u)), by = Math.round(lerp(140, 154, u) - Math.sin(u * Math.PI) * 14); R.disco(bx, by, 2, K); R.disco(bx, by, 1, hex('#fbf6ea')); } }
  R.poligono([[150, 170], [176, 166], [180, 176], [154, 179]], hex('#e8e4dc')); for (let k = 0; k < 4; k++) R.linea(156 + k, 170 + k * 2, 174 + k, 167 + k * 2, hex('#a8a090')); R.linea(152, 170, 176, 166, hex('#5a5a62'));
};

// ── 2 · el estante: las latas azules ganan sitio ──
const TIENDAS = c(.5022), PEPSI2 = c(.5605), VENDE = c(.6159);
const BALDAS = [70, 108, 146], NL = 24;
// el instante en que cada lata se vuelve azul: la balda del medio, al paso de la mano; las otras, en una ola
const giro = (b, i) => { const x = 8 + i * 13; if (b === 2) return P2 + 0.4 + (310 - x) / 300 * 2.2; return P2 + 0.9 + (310 - x) / 300 * 2.0 + b * 0.15 + hh(i, b) * 0.4; };
const p2 = (t) => {
  capa('estante', () => {
    // el techo con los tubos, la cabecera naranja de la góndola, el panel perforado y las baldas
    R.rect(0, 0, 319, 22, hex('#e8e0cc')); for (let x = 0; x < 320; x += 24) R.rect(x, 0, x, 22, hex('#d0c8b4')); caja(30, 6, 130, 9, hex('#fbfaf4'), hex('#a8a090')); caja(190, 6, 266, 9, hex('#fbfaf4'), hex('#a8a090'));
    R.rect(0, 23, 319, 46, hex('#e8902a')); R.rect(0, 23, 319, 24, hex('#f0b050')); R.rect(0, 45, 319, 46, hex('#b86818')); R.rect(0, 30, 319, 31, hex('#d8b040')); R.rect(0, 38, 319, 39, hex('#8a5a2a'));
    for (let x = 6; x < 260; x += 50) { caja(x, 26, x + 30, 43, hex('#fbf6ea')); R.icono('lata', x + 3, 30, hex('#2e5aa8'), K, 1); R.icono('lata', x + 12, 30, hex('#c8382e'), K, 1); R.rect(x + 22, 29, x + 28, 40, hex('#f0c040')); R.rect(x + 22, 36, x + 28, 40, hex('#e8902a')); }
    caja(262, 24, 268, 45, hex('#c8c8d2')); R.rect(272, 23, 319, 46, hex('#e8e0cc'));
    for (let y = 47; y < 150; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 8 === 4 && y % 8 === 4 ? hex('#a89c80') : hex('#d8ccb0'));
    for (const by of BALDAS) { R.rect(0, by + 1, 319, by + 7, hex('#b8bcc8')); R.rect(0, by + 1, 319, by + 1, hex('#e0e4ec')); R.rect(0, by + 7, 319, by + 7, hex('#7c8090')); R.rect(0, by + 8, 319, by + 10, hex('#a89c80'));
      for (let x = 10; x < 320; x += 52) { caja(x, by + 2, x + 14, by + 6, hex('#fbf6ea')); } }
    for (let x = 0; x < 320; x += 106) { R.rect(x, 47, x + 2, 156, hex('#8a8c98')); R.rect(x, 47, x, 156, hex('#c8c8d2')); }
    // el suelo de linóleo y la cesta de alambre de la clienta
    for (let y = 157; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (Math.floor(x / 16) + Math.floor((y - 157) / 8)) % 2 ? hex('#c8b890') : hex('#e8dcc0'));
    R.rect(0, 156, 319, 156, K);
  });
  // los precios de las baldas
  for (const by of BALDAS) for (let x = 10; x < 320; x += 52) R.numero(x % 104 === 10 ? '99' : '89', x + 8, by + 7, { centro: true, color: hex('#c8382e'), sombra: false, fina: true });
  // las latas de las tres baldas, que se vuelven azules
  for (const [b, by] of BALDAS.entries()) for (let i = 0; i < NL; i++) { const x = 8 + i * 13, ta = giro(b, i), azul = (i * 7 + b * 3) % 10 < 3 || t > ta; if (b === 2 && Math.abs(t - ta) < 0.12) continue; PZ.lata(R, x, by + 1, { color: azul ? 'azul' : 'rojo' }); if (t > ta && t < ta + 0.25) destello(x, by - 18, tramo(t, ta, ta + 0.25)); }
  // la mano del reponedor recorre la balda del medio, de derecha a izquierda
  { const u = tramo(t, P2 + 0.4, P2 + 2.6), hx = Math.round(lerp(330, 10, u)); if (u > 0 && u < 1) { PZ.lata(R, hx + 2, 147, { color: 'azul' }); T.brazo(R, hx + 34, 186, hx + 12, 140, '#5a6a88', -1); } }
  // en «selling more», la mano de la clienta coge una lata azul de la balda de abajo y la mete en la cesta
  const coge = tramo(t, VENDE - 0.5, VENDE), mete = tramo(t, VENDE + 0.1, VENDE + 0.7);
  { const hx = Math.round(lerp(300, 262, coge) - mete * 40), hy = Math.round(lerp(190, 134, coge) + mete * 20);
    if (coge > 0 && mete < 1) { if (coge >= 1) PZ.lata(R, hx, hy + 9, { color: 'azul' }); T.brazo(R, hx + 30, 190, hx + 10, hy, '#c8382e', -1); } }
  // la cesta de alambre que se llena de latas azules
  { const n = 2 + (t > VENDE + 0.7 ? 1 : 0); R.rect(196, 158, 250, 178, K); R.rect(197, 159, 249, 177, hex('#c8c8d2')); for (let x = 199; x < 249; x += 4) R.rect(x, 159, x, 177, hex('#8a8c98')); for (let y = 162; y < 177; y += 4) R.rect(197, y, 249, y, hex('#8a8c98')); R.rect(196, 158, 250, 159, hex('#e83a3a'));
    for (let k = 0; k < n; k++) PZ.lata(R, 208 + k * 13, 162, { color: 'azul' }); R.rect(196, 160, 250, 162, hex('#c8c8d2')); R.rect(196, 160, 250, 160, K); }
};

// ── 3 · la torre de la sede: el trofeo y la alarma ──
const INVEN = c(.8098), ALARMA = c(.9115), SUENA = c(.9355);
const p3 = (t) => {
  capa('torre', () => {
    grad(0, 0, 319, 130, [hex('#5aa0e0'), hex('#8ac4ec'), hex('#c8e4f4')]);
    // la ciudad lejana en la bruma
    for (let k = 0; k < 22; k++) { const x = Math.round(hh(k, 1) * 320), w = 10 + Math.round(hh(k, 2) * 16), hgt = 30 + Math.round(hh(k, 3) * 40); R.rect(x, 130 - hgt, x + w, 130, k % 2 ? hex('#9ab4cc') : hex('#a8c0d4')); for (let y = 130 - hgt + 3; y < 128; y += 4) for (let i = x + 2; i < x + w - 1; i += 3) R.pset(i, y, hex('#c8d8e4')); }
    // el edificio de cristal de la izquierda
    caja(18, 66, 96, 140, hex('#4a7aa8')); for (let y = 68; y < 140; y += 6) R.rect(18, y, 96, y, hex('#2a4a6a')); for (let x = 22; x < 96; x += 8) R.rect(x, 66, x, 140, hex('#6a9ac8')); for (let y = 70; y < 140; y += 12) R.rect(20, y, 94, y + 1, hex('#8ab8e0'));
    // el edificio de ladrillo de la derecha
    caja(222, 52, 302, 140, hex('#a8543a')); for (let y = 54; y < 140; y += 3) for (let x = 222 + (y % 6 ? 0 : 3); x < 302; x += 6) R.pset(x, y, hex('#8a3e2a')); for (let y = 58; y < 136; y += 12) for (let x = 228; x < 298; x += 12) { R.rect(x, y, x + 6, y + 7, hex('#2a3a4a')); R.rect(x, y, x + 6, y, hex('#e8dcc0')); R.pset(x + 1, y + 1, hex('#8ab8e0')); }
    R.rect(220, 50, 304, 52, hex('#7a3a28'));
    // la torre de la sede: piedra clara con las cintas de ventanas oscuras, las aletas y el vestíbulo de cristal
    caja(118, 28, 202, 140, hex('#e4d8bc')); R.rect(114, 24, 206, 28, hex('#c8bca0')); R.rect(114, 24, 206, 24, K);
    for (let y = 32; y < 122; y += 9) { R.rect(120, y, 200, y + 4, hex('#2a3448')); R.rect(120, y, 200, y, hex('#5a6a88')); }
    for (let x = 124; x < 200; x += 10) R.rect(x, 29, x + 1, 122, hex('#c8bca0'));
    R.rect(130, 122, 190, 140, hex('#3a4a5a')); for (let x = 132; x < 190; x += 8) R.rect(x, 123, x + 5, 139, hex('#7aa0c0')); R.rect(150, 126, 170, 140, hex('#1a2430')); R.rect(159, 126, 160, 140, hex('#c8c8d2'));
    R.rect(156, 21, 164, 24, hex('#8a8c98')); R.rect(159, 20, 160, 21, hex('#5a5c68'));
    // la plaza: losas, parterres con árboles, la fuente y el mástil
    for (let y = 141; y < 168; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 12 === 0 || (y - 141) % 6 === 0) ? hex('#b8ac94') : hex('#d8ccb0'));
    R.rect(0, 140, 319, 140, K);
    for (const px of [30, 288]) { caja(px - 12, 136, px + 12, 144, hex('#8a8c98')); R.rect(px - 11, 136, px + 11, 137, hex('#5a9a4a')); R.rect(px - 1, 112, px + 1, 136, hex('#5a3a24')); }
    caja(236, 150, 276, 160, hex('#a8a090')); R.rect(238, 151, 274, 153, hex('#5a9ac8'));
    R.rect(60, 70, 61, 150, hex('#c8c8d2')); R.disco(60, 69, 1, hex('#f0d070')); R.rect(56, 150, 65, 152, hex('#8a8c98'));
    // la calle con su acera y sus líneas
    R.rect(0, 168, 319, 170, hex('#a8a090')); R.rect(0, 171, 319, 179, hex('#4a4a52')); for (let x = 0; x < 320; x += 16) R.rect(x, 175, x + 7, 175, hex('#e8d040'));
    // el trofeo del número 1 en su pedestal
    caja(98, 136, 126, 160, hex('#e4dccc')); R.rect(96, 134, 128, 136, hex('#f4ecdc')); R.rect(96, 134, 128, 134, K);
  });
  // las nubes y los pájaros (las palomas salen volando con la alarma)
  R.recorte([0, 0, 319, 130]); nubes([0, 0, 319, 130], t, 18, 60, [hex('#ffffff'), hex('#e8eef4'), hex('#b8c8d8'), hex('#c8d4e0')], 7, 1, 12); R.recorte(null);
  pajaros(t, 0, 270, 50, 3, 8);
  { const u = tramo(t, ALARMA, ALARMA + 2.2); for (let k = 0; k < 6; k++) { const x = Math.round(130 + k * 11 + u * (k % 2 ? 150 : -150)), y = Math.round(23 - Math.sin(u * 2.4) * (5 + k * 1.5)), a = Math.sin(t * 14 + k) > 0 ? 1 : 0; if (u === 0) { R.pset(130 + k * 11, 23, hex('#8a8c98')); R.pset(131 + k * 11, 23, hex('#5a5c68')); } else if (x > -4 && x < 270) { R.pset(x, y, hex('#5a5c68')); R.pset(x - 1, y - a, hex('#8a8c98')); R.pset(x + 1, y - a, hex('#8a8c98')); R.pset(x - 2, y - 2 * a, hex('#8a8c98')); R.pset(x + 2, y - 2 * a, hex('#8a8c98')); } } }
  // la bandera que ondea
  for (let j = 0; j < 9; j++) { const w = Math.round(Math.sin(t * 5 + j * 0.7) * 1.3); R.linea(62, 71 + j, 80, 71 + j + w, j % 2 ? hex('#f2eee2') : hex('#c8382e')); } R.rect(62, 71, 69, 75, hex('#2e3a7a')); R.pset(64, 72, hex('#ffffff')); R.pset(67, 74, hex('#ffffff'));
  // los árboles de la plaza que se mecen
  for (const px of [30, 288]) for (let k = 0; k < 6; k++) R.disco(px - 10 + Math.round(hh(k, px) * 20 + Math.sin(t * 1.4 + k) * 1), 98 + Math.round(hh(k, px + 1) * 18), 7, k % 2 ? hex('#3a7a3a') : hex('#4a9a4a'));
  // los chorros de la fuente
  for (let k = 0; k < 8; k++) { const u = (t * 1.5 + k / 8) % 1, x = Math.round(256 + (k - 3.5) * 2 * u * 2), y = Math.round(150 - Math.sin(u * Math.PI) * 10); R.pset(x, y, hex('#c8eaff')); }
  // la alarma: la baliza gira, la sala se tiñe de rojo, las ventanas parpadean
  const al = t > ALARMA, on = Math.floor(t * 6) % 2 === 0;
  R.disco(160, 18, 3, K); R.disco(160, 18, 2, al && on ? hex('#ff3030') : hex('#8a2020')); R.pset(159, 17, hex('#ffb0b0'));
  if (al) { const a = t * 7; for (let s = 4; s < 34; s++) { const x = Math.round(160 + Math.cos(a) * s), y = Math.round(18 + Math.sin(a) * s * 0.35); if (y > 15 && tr(x, y, 0.6)) R.pset(x, y, hex('#ff6a5a')); } for (let y = 32; y < 122; y += 9) if ((Math.floor(t * 6) + y / 9) % 2 < 1) { R.rect(121, y + 1, 199, y + 3, hex('#e83a2a')); for (let x = 121; x < 200; x += 10) R.rect(x + 3, y + 1, x + 4, y + 3, hex('#ff9a8a')); } }
  // el trofeo dorado del número 1, que brilla en «unbeatable» y tiembla con la alarma
  { const tb = al ? Math.round(Math.sin(t * 30) * 1) : 0, x = 112 + tb;
    R.rect(x - 7, 128, x + 7, 133, K); R.rect(x - 6, 129, x + 6, 132, hex('#8a6a24')); R.rect(x - 2, 118, x + 2, 128, hex('#c8a040')); R.disco(x, 110, 9, K); R.disco(x, 110, 8, hex('#f0c040')); R.rect(x - 8, 100, x + 8, 110, hex('#f0c040')); R.rect(x - 9, 100, x + 9, 100, K); R.rect(x - 6, 102, x - 4, 112, hex('#fff090'));
    R.disco(x - 11, 106, 3, K); R.disco(x + 11, 106, 3, K); R.disco(x - 11, 106, 2, hex('#f0c040')); R.disco(x + 11, 106, 2, hex('#f0c040')); R.disco(x - 11, 106, 1, hex('#d8ccb0')); R.disco(x + 11, 106, 1, hex('#d8ccb0'));
    R.numero('1', x + 1, 113, { centro: true, color: hex('#8a5a14'), sombra: false });
    destello(x + 6, 98, tramo(t, INVEN, INVEN + 0.7)); destello(x - 7, 116, tramo(t, INVEN + 0.2, INVEN + 0.8)); }
  // el directivo saca pecho junto al trofeo y se asusta con la alarma
  R.actor(EL.ejecutivo, 128, 160, t, { dir: -1, dedo: t > P3 + 0.4 && t < INVEN + 0.6, sonrisa: !al, sorpresa: al, habla: t > P3 + 0.4 && t < INVEN && Math.sin(t * 8) > 0 });
  if (al && t < ALARMA + 1.4) globo(136, 128, '!');
  // la gente sale corriendo del vestíbulo con la alarma y cruza la plaza
  for (let k = 0; k < 3; k++) { const t0 = ALARMA + 0.3 + k * 0.45, u = tramo(t, t0, t0 + 2.4); if (u <= 0) continue; const d = k % 2 ? 1 : -1, x = Math.round(152 + d * u * (90 + k * 20)); R.actor([EL.oficinista, EL.cajera, EL.senor30][k], x, 152 + k * 4, t, { dir: d, anda: u < 1, sorpresa: true }); }
  // un paseante que cruza antes de la alarma
  { const u = tramo(t, P3, ALARMA + 0.2), x = Math.round(lerp(330, 200, u)); R.actor(EL.senora30, x, 164, t, { dir: -1, anda: u < 1, sorpresa: al }); }
  // los coches que pasan por la calle, por delante
  for (let k = 0; k < 2; k++) { const u = ((t - P3) * 0.22 + k * 0.5) % 1, d = k ? -1 : 1, x = d > 0 ? Math.round(-40 + u * 400) : Math.round(360 - u * 400), cc = k ? hex('#2e5aa8') : hex('#e8d040'), y = k ? 178 : 174;
    R.rect(x - 1, y - 9, x + 29, y - 1, K); R.rect(x, y - 8, x + 28, y - 2, cc); R.rect(x + 7, y - 13, x + 21, y - 8, K); R.rect(x + 8, y - 12, x + 20, y - 8, hex('#a8d4f0')); R.disco(x + 6, y, 3, K); R.disco(x + 22, y, 3, K); R.pset(x + 6, y, hex('#8a8c98')); R.pset(x + 22, y, hex('#8a8c98')); }
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], {
  año: (t) => t < P2 ? Math.round(lerp(1975, 1984, tramo(t, 0.5, SUBE))) : 1984,
  efectos: [[CUOTA + 0.2, 'lapiz'], [AÑOS, 'golpecito'], [SUBE, 'aviso'], [P2 + 0.5, 'whoosh'], [VENDE + 0.7, 'toc'], [P3 + 0.8, 'coche'], [INVEN, 'brillo'], [ALARMA, 'aviso'], [SUENA + 0.4, 'aviso']],
});
''')
