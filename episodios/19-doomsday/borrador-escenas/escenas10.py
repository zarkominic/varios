import re

# Borrador de las escenas del grupo S10 del ep19: do-trailer, do-lista y do-cierre (con el movimiento hecho).
# Los instantes se escriben como @(s) (segundos de escena, sacados de linea.json → palabras.en) y aquí se convierten en
# en('marca', f) con la marca de su frase.

MARCAS = {
    'do-trailer': [('milagro', 0.5, 12.554), ('cuenta', 13.354, 23.402)],
    'do-lista': [('lista', 1.4, 16.811), ('entiendes', 17.611, 24.96)],
    'do-cierre': [('peligro', 0.5, 10.382), ('palomitas', 11.182, 12.148), ('adios', 13.101, 14.924)],
}


def _en(id_, s):
    ms = MARCAS[id_]
    k = ms[0]
    for m in ms:
        if s >= m[1] - 1e-6:
            k = m
    f = (s - k[1]) / (k[2] - k[1])
    return f"en('{k[0]}', {f:.4f})"


def _conv(id_, cuerpo):
    return re.sub(r'@\(([-\d.]+)\)', lambda m: _en(id_, float(m.group(1))), cuerpo)


E = {}

# Piezas pequeñas que comparten las tres escenas (cada escena es su propia página, así que van en cada cuerpo).
PIEZAS = r'''
import { PIEZAS_DO } from '/atomo/plato/kits/pixel-chibi.js';
const C = T.C, K = hex('#1a1014');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], by = (x, y) => BY[(y & 3) * 4 + (x & 3)] / 16;
const rampa = (l) => l.map(hex);
const cl = (v) => Math.max(0, Math.min(1, v));
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
// degradado tramado por filas (cielos, fondos), con la rampa de colores
const degradado = (x0, y0, x1, y1, ram, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
  const v = (y - y0) / Math.max(1, y1 - y0) * (ram.length - 1) + by(x, y) - 0.5 + (hh(x >> 3, y >> 2, k) - 0.5) * 0.5;
  R.pset(x, y, ram[Math.max(0, Math.min(ram.length - 1, Math.round(v)))]); } };
// búferes: lo fijo se pinta una vez (prev = R.usar(b) … R.usar(prev)); fondo() lo copia entero, pegar() solo lo pintado
const BUF = new Map();
const capa = (clave, dibuja) => { let b = BUF.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); BUF.set(clave, b); } return b; };
const fondo = (clave, dibuja) => R.copiar(capa(clave, dibuja));
const pegar = (clave, dibuja) => { const b = capa(clave, dibuja), B = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c) B[i] = c; } };
// nube de tres tonos (sombra, cuerpo, luz)
const NB = [[0, 0, 0.32], [-0.32, 0.06, 0.24], [0.3, 0.05, 0.26], [-0.1, -0.12, 0.26], [0.14, -0.08, 0.22]];
const nube3 = (cx, cy, w, c0, c1, c2) => { for (const [dx, dy, r] of NB) R.disco(cx + dx * w, cy + dy * w + 1, r * w + 0.5, c2);
  for (const [dx, dy, r] of NB) R.disco(cx + dx * w, cy + dy * w, r * w, c1); for (const [dx, dy, r] of NB) R.disco(cx + dx * w - 1, cy + dy * w - 2, r * w * 0.7, c0); };
const pajaro = (x, y, t, k, c) => { const a = Math.sin(t * 9 + k) > 0; x = Math.round(x); y = Math.round(y); R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x + 2, y - (a ? 2 : 0), c); };
// una Tierra pequeña que gira (616 azul y verde; 828 cobre con anillo; 10005 ocre; 838 turquesa), con luz, sombra y nubes
const PLANETAS = { '616': ['#14306a', '#2e6ac8', '#3aa85a', '#8ad87a'], '828': ['#5a2a1a', '#d8783a', '#f0c070', '#5ac8c0'], '10005': ['#4a3014', '#a8763a', '#dcb060', '#7a5a2e'], '838': ['#14504e', '#3ab0a8', '#c88ad8', '#e8c8f0'] };
const planeta = (cx, cy, r, tipo, t) => {
  cx = Math.round(cx); cy = Math.round(cy); r = Math.max(1, Math.round(r));
  const P = PLANETAS[tipo].map(hex), anillo = tipo === '828';
  const aro = (delante) => { if (!anillo) return; for (let a = 0; a < 6.28; a += 0.02) { const s = Math.sin(a); if ((s > 0) !== delante) continue; const x = Math.round(cx + Math.cos(a) * r * 1.8), y = Math.round(cy + s * r * 0.42 - Math.cos(a) * r * 0.12); R.pset(x, y, s > 0 ? hex('#f8e0a0') : hex('#a88a5a')); R.pset(x, y + 1, hex('#6a4a2a')); } };
  aro(false);
  R.disco(cx, cy, r + 1, K);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { if (i * i + j * j > r * r) continue;
    const tierra = hh(Math.floor((i + t * 5 + 99) / 3), Math.floor((j + 99) / 3), tipo.length) < 0.42;
    let c = tierra ? P[2] : P[1];
    if ((i + r * 0.4) ** 2 + (j + r * 0.4) ** 2 < r * r * 0.35 && by(i + 64, j + 64) < 0.6) c = tierra ? P[3] : mez(P[1], hex('#ffffff'), 0.35);
    if ((i - r * 0.45) ** 2 + (j - r * 0.45) ** 2 > r * r * 0.9 && by(i + 64, j + 64) < 0.7) c = P[0];
    if (hh(Math.floor((i + t * 9 + 99) / 4), Math.floor((j + 99) / 2), 7) > 0.86) c = hex('#f4f6ff');
    R.pset(cx + i, cy + j, c); }
  aro(true);
  R.anillo(cx, cy, r + 1.6, mez(P[1], hex('#ffffff'), 0.5), 2);
};
// el público de espaldas, en silueta contra la pantalla, con el filo de luz de la película: así se lee «en el cine»
const NUCAS = [[8, 0, 'pelo'], [42, 8, 'cuernos'], [80, 14, 'gorra'], [246, 14, 'moño'], [284, 4, 'pinchos'], [318, 2, 'pelo']];
const publico = (t, luz) => {
  const S = hex('#0a0810'), S2 = hex('#1a1622');
  for (const [cx, dy, tipo] of NUCAS) {
    const y0 = 160 + dy + Math.round(Math.sin(t * 0.9 + cx) * 0.7), gira = Math.sin(t * 0.35 + cx * 0.1) > 0.85 ? 1 : 0;
    R.poligono([[cx - 22, 180], [cx - 18, y0 + 17], [cx - 7, y0 + 13], [cx + 7, y0 + 13], [cx + 18, y0 + 17], [cx + 22, 180]], S);
    R.rect(cx - 3, y0 + 10, cx + 3, y0 + 14, S);
    R.disco(cx + gira, y0 + 5, 8, S);
    if (tipo === 'cuernos') for (const d of [-1, 1]) { R.linea(cx + d * 4, y0 - 1, cx + d * 7, y0 - 8, hex('#3a3018')); R.linea(cx + d * 7, y0 - 8, cx + d * 5, y0 - 12, hex('#3a3018')); R.pset(cx + d * 5, y0 - 12, luz); }
    else if (tipo === 'gorra') { R.rect(cx - 8, y0 - 2, cx + 7, y0 + 1, S); R.rect(cx + 6, y0, cx + 13, y0 + 1, S2); }
    else if (tipo === 'moño') R.disco(cx - 1, y0 - 4, 4, S);
    else if (tipo === 'pinchos') for (let k = -2; k <= 2; k++) R.poligono([[cx + k * 3 - 2, y0], [cx + k * 3 + 2, y0], [cx + k * 3 + (k % 2), y0 - 6 + Math.abs(k)]], S);
    for (let a = -2.75; a < -0.45; a += 0.1) R.pset(Math.round(cx + gira + Math.cos(a) * 8.4), Math.round(y0 + 5 + Math.sin(a) * 8.4), luz);
    R.pset(cx - 18, y0 + 17, luz); R.pset(cx + 18, y0 + 17, luz);
  }
};
// gente pequeña de fondo (5 × 11 px) que saluda: ropa, piel y pelo
const gente = (x, y, ropa, piel, pelo, t, k, saluda = false) => {
  x = Math.round(x); y = Math.round(y); const pa = Math.floor(t * 3 + k) % 2;
  R.rect(x - 1, y - 2, x - 1, y, K); R.rect(x + 1, y - 2, x + 1, y, K);
  R.rect(x - 2, y - 7, x + 2, y - 3, ropa); R.pset(x + 2, y - 7, mez(ropa, K, 0.4));
  R.rect(x - 1, y - 10, x + 1, y - 8, piel); R.rect(x - 1, y - 11, x + 1, y - 11, pelo); R.pset(x - 2, y - 10, pelo);
  if (saluda) { R.pset(x + 3, y - 8 - pa, piel); R.pset(x + 3, y - 7, ropa); R.pset(x + 4, y - 9 - pa, piel); }
};
'''

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['do-trailer'] = ('Los tráileres', '''// DO-TRAILER (frases 61–62), 2026. Cinco planos «en la pantalla del cine» (abajo, las nucas del público en silueta con
// el filo de luz de la película):
// 1. «In the trailers, Doom warns…» (fondo local, el salón del trono): sillares verdes, la vidriera con la tormenta,
//    estandartes que ondean, antorchas, el brasero, dos guardias de metal que giran la cabeza y el cuervo; Doom delante
//    del trono levanta la mano con luz verde en «warns»; en «unthinkable» aparecen dos Tierras (616 y 828) flotando a
//    sus lados, unidas a su mano por hilos de energía; en «decision» las mira una y otra y cae un rayo; corta en «Thor»;
// 2. «Thor says they're going to need a miracle» (el Vacío, la fortaleza): Thor sale por la puerta de vigas con el
//    martillo, habla, lo levanta y en «miracle» le cae un rayo que ilumina el plano; corta en «from»;
// 3. «…the Thing, from Earth-828, shakes hands with M'Baku of Wakanda» (fondo local, el puente entre dos mundos al
//    atardecer: la ciudad de los sesenta con su monorraíl a la izquierda, las torres doradas y la selva con su cascada a
//    la derecha): la Cosa y M'Baku llegan por el puente desde cada lado y en «shakes hands» se estrechan la mano entre
//    destellos; la gente de cada orilla saluda; corta en «In August»;
// 4. «…a special look focused on Doom and his history with Reed Richards» (Latveria, la puerta del castillo): Doom
//    baja por la rampa, Reed sube; en «Doom» Doom levanta la mano verde; las viñetas antiguas entran en «Doom»,
//    «history» (1962) y «Reed Richards»; Reed le señala; corta en «And every»;
// 5. «every teaser ends with a clock counting down the days to release» (fondo local, la pantalla de cerca): el reloj
//    de Doom con engranajes destella en «ends» y en «clock» sale la placa:, las agujas giran y la placa cuenta 49, 48, 47, 46 en «counting»,
//    «down», «days»; las palomitas, de espaldas en su butaca, tiemblan y les sale un «!».''', PIEZAS + r'''
const P2 = @(5.30), P3 = @(8.84), P4 = @(13.25), P5 = @(19.42);
const AVISA = @(1.88), IMPENSABLE = @(3.65), DECISION = @(4.50);
const THOR = @(5.54), MILAGRO = @(6.92);
const ESTRECHA = @(10.42), WAKANDA = @(11.80);
const MIRADA = @(15.25), DOOM2 = @(16.63), HISTORIA = @(17.51), REED = @(18.17);
const TERMINAN = @(20.20), RELOJ = @(21.04), CUENTA = @(21.36), ABAJO = @(21.84), DIAS = @(22.26), ESTRENO = @(22.78);
const VERDE = rampa(['#123a1e', '#1e5a30', '#3aa860', '#a8ffc0']);

// ── 1 · el salón del trono (fondo local) ──
const enVentana = (x, y) => { if (x < 30 || x > 68 || y < 22 || y > 96) return false; const dx = Math.abs(x - 49); return y >= 42 ? dx <= 17 : dx <= 17 * Math.sqrt(Math.max(0, (y - 22) / 20)); };
const pintaTrono = () => {
  // la pared de sillares verdosos: juntas, arista con luz, piedras más oscuras y musgo; arriba la bóveda en sombra
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) {
    const fila = Math.floor(y / 10), off = (fila % 2) * 9, col = Math.floor((x + off) / 18), junta = y % 10 === 0 || (x + off) % 18 === 0;
    const v = (hh(col, fila, 3) - 0.5) * 0.5 + (by(x, y) - 0.5) * 0.3 + (hh(x >> 1, y >> 1, 4) - 0.5) * 0.3;
    let c = junta ? hex('#121816') : v > 0.18 ? hex('#3a4742') : v < -0.18 ? hex('#222b28') : hex('#2d3834');
    if (!junta && y % 10 === 1) c = hex('#44524c');
    if (!junta && hh(x, y, 7) > 0.985) c = hex('#3e6a3a');
    if (by(x, y) < (64 - y) / 70 || (x > 262 && by(x, y) < (70 - y) / 50)) c = hex('#141a18');
    R.pset(x, y, c); }
  // el suelo de losas en perspectiva hacia el trono, con brillos
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) {
    const p = (y - 60) / 120, u = (x - 160) / p, fila = Math.floor(Math.log(y - 110) * 5), col = Math.floor((u + 1000) / 34);
    const junta = Math.abs(((u + 1000) % 34)) < 1.4 / p * 0.6 || Math.floor(Math.log(y - 109) * 5) !== fila;
    const par = (fila + col) % 2 === 0, n = hh(col, fila, 9) - 0.5;
    let c = junta ? hex('#141a18') : par ? hex('#2e3834') : hex('#26302c');
    if (!junta && n > 0.3 && by(x, y) < 0.3) c = hex('#3a4642');
    if (!junta && hh(x >> 2, y, 3) > 0.97) c = hex('#4a5852');
    R.pset(x, y, c); }
  // la alfombra verde con su cenefa dorada, de las gradas hacia nosotros
  for (let y = 130; y < 180; y++) { const w = Math.round(14 + (y - 130) * 0.45); for (let x = 160 - w; x <= 160 + w; x++) {
    const e = Math.min(x - (160 - w), 160 + w - x); let c = e < 1 ? K : e < 3 ? hex('#c8a040') : e < 4 ? hex('#1a3a20') : hex('#1e4a2a');
    if (e >= 4 && ((Math.abs(x - 160) + (y % 12)) % 12 === 0)) c = hex('#c8a040'); else if (e >= 4 && ((Math.abs(x - 160) + (y % 12)) % 12 === 1)) c = hex('#2e6a3a'); if (e >= 4 && by(x, y) < 0.12) c = hex('#16381e'); if (e === 6) c = hex('#8a6a1e'); R.pset(x, y, c); } }
  // las gradas de piedra
  for (const [y0, x0, x1] of [[112, 118, 202], [118, 108, 212], [124, 98, 222]]) { R.rect(x0, y0, x1, y0 + 6, hex('#3a4642')); R.rect(x0, y0, x1, y0, hex('#5a6a62')); R.rect(x0, y0 + 6, x1, y0 + 6, hex('#141a18')); R.rect(x0, y0, x0, y0 + 6, K); R.rect(x1, y0, x1, y0 + 6, K);
    for (let x = x0 + 6; x < x1; x += 13) R.linea(x, y0 + 1, x, y0 + 5, hex('#2a3430')); }
  // el trono: respaldo alto de terciopelo verde con capitoné y marco de oro, remate en punta y la máscara
  R.poligono([[138, 112], [138, 34], [160, 12], [182, 34], [182, 112]], K);
  R.poligono([[140, 110], [140, 35], [160, 15], [180, 35], [180, 110]], hex('#a8801c'));
  R.poligono([[142, 108], [142, 37], [160, 19], [178, 37], [178, 108]], hex('#e8b830'));
  R.poligono([[145, 104], [145, 40], [160, 25], [175, 40], [175, 104]], hex('#1e5a2a'));
  for (let y = 44; y < 104; y += 8) for (let x = 149; x < 174; x += 8) { R.pset(x + ((y >> 3) % 2) * 4, y, hex('#3a8a4e')); R.pset(x + ((y >> 3) % 2) * 4 + 1, y + 1, hex('#123a1a')); }
  for (let y = 40; y < 104; y++) { R.pset(146, y, hex('#2e7a3e')); R.pset(174, y, hex('#123a1a')); }
  R.disco(160, 20, 3, K); R.disco(160, 20, 2, hex('#3ac85a')); R.pset(159, 19, hex('#c8ffd0'));
  T.e_mascara(R, 160, 60, 2, { capucha: false, ojos: 0.6 });
  // brazos y asiento
  for (const x0 of [130, 180]) { R.rect(x0, 92, x0 + 10, 108, K); R.rect(x0 + 1, 93, x0 + 9, 107, hex('#a8801c')); R.rect(x0 + 1, 93, x0 + 9, 95, hex('#e8b830')); R.disco(x0 + 5, 92, 4, K); R.disco(x0 + 5, 92, 3, hex('#e8b830')); R.pset(x0 + 4, 91, hex('#fff0a0')); }
  R.rect(140, 100, 180, 111, K); R.rect(141, 101, 179, 104, hex('#2e7a3e')); R.rect(141, 105, 179, 110, hex('#a8801c')); R.rect(141, 105, 179, 105, hex('#e8b830'));
  // las columnas: fuste con estrías, luz a la izquierda, capitel y basa
  for (const x0 of [4, 244]) { R.rect(x0, 0, x0 + 18, 131, K);
    for (let x = x0 + 1; x < x0 + 18; x++) { const f = (x - x0) / 18, c = f < 0.25 ? hex('#5a6a62') : f < 0.6 ? hex('#44524c') : f < 0.85 ? hex('#333e3a') : hex('#222b28'); R.rect(x, 0, x, 131, c); }
    for (let x = x0 + 4; x < x0 + 18; x += 4) for (let y = 40; y < 118; y++) if (by(x, y) < 0.7) R.pset(x, y, hex('#2a3430'));
    R.rect(x0 - 4, 30, x0 + 22, 37, K); R.rect(x0 - 3, 31, x0 + 21, 36, hex('#4a5852')); R.rect(x0 - 3, 31, x0 + 21, 31, hex('#6a7a72'));
    R.rect(x0 - 4, 118, x0 + 22, 131, K); R.rect(x0 - 3, 119, x0 + 21, 130, hex('#3a4642')); R.rect(x0 - 3, 119, x0 + 21, 119, hex('#5a6a62')); }
  // el brasero de piedra a la derecha (el fuego, en movimiento) y el soporte del cuervo
  R.poligono([[280, 150], [284, 126], [306, 126], [310, 150]], K); R.poligono([[282, 149], [285, 128], [305, 128], [308, 149]], hex('#3a4642'));
  R.rect(278, 120, 312, 127, K); R.rect(279, 121, 311, 126, hex('#4a5852')); R.rect(279, 121, 311, 121, hex('#6a7a72'));
  for (let y = 132; y < 148; y += 5) R.linea(286, y, 304, y, hex('#2a3430'));
  // los reflejos de las antorchas en las losas
  for (const [rx, ry] of [[30, 150], [242, 150]]) for (let y = ry - 6; y < ry + 18; y++) for (let x = rx - 6; x < rx + 6; x++) if (by(x, y) < 0.18 * (1 - Math.abs(x - rx) / 6)) R.pset(x, y, hex('#7a5a2a'));
};
const pintaMarco = () => {   // la vidriera: marco de piedra, parteluz, travesaño, la red de plomo y el alféizar (encima del cielo)
  for (let y = 18; y < 100; y++) for (let x = 26; x < 73; x++) { const d = enVentana(x, y); let cerca = false; for (const [a, b] of [[-3, 0], [3, 0], [0, -3], [0, 3], [-2, -2], [2, -2]]) if (enVentana(x + a, y + b)) cerca = true;
    if (!d && cerca) R.pset(x, y, x < 49 ? hex('#5a6a62') : hex('#3a4642'));
    if (d && (Math.abs(x - 49) < 2 || y === 62 || y === 63)) R.pset(x, y, Math.abs(x - 49) < 1 || y === 62 ? hex('#4a5852') : hex('#222b28'));
    else if (d && ((x + y) % 7 === 0 || (x - y + 70) % 7 === 0)) R.pset(x, y, hex('#0e1412')); }
  R.rect(24, 96, 74, 100, K); R.rect(25, 97, 73, 99, hex('#4a5852')); R.rect(25, 97, 73, 97, hex('#6a7a72'));
};
const BOT = { V: hex('#5a606e'), v: hex('#3a3e4a'), C: hex('#5a606e'), c: hex('#3a3e4a'), Q: hex('#2a2e36'), q: hex('#1c1e24'), o: hex('#8a8e9c'), I: hex('#3a3e4a') };
const estandarte = (x0, t, k) => {
  for (let j = 0; j < 66; j++) { const m = Math.round(Math.sin(t * 1.7 + j * 0.11 + k) * j / 30), y = 20 + j;
    for (let i = 0; i < 15; i++) { let c = i < 2 || i > 12 ? hex('#c8a040') : Math.sin(i * 0.8 + j * 0.06 + t * 1.3 + k) > 0.35 ? hex('#2e7a3e') : hex('#226632'); if (i === 0 || i === 14) c = K; R.pset(x0 + i + m, y, c); } }
  const m = Math.round(Math.sin(t * 1.7 + 66 * 0.11 + k) * 66 / 30); R.poligono([[x0 + m, 86], [x0 + 14 + m, 86], [x0 + 7 + m, 94]], hex('#226632')); R.linea(x0 + m, 86, x0 + 7 + m, 94, K); R.linea(x0 + 14 + m, 86, x0 + 7 + m, 94, K);
  R.rect(x0 - 3, 18, x0 + 17, 19, hex('#e8b830')); R.rect(x0 - 3, 20, x0 + 17, 20, hex('#8a6a18')); R.disco(x0 - 4, 19, 1.6, hex('#e8b830')); R.disco(x0 + 18, 19, 1.6, hex('#e8b830'));
  T.e_mascara(R, x0 + 7 + Math.round(Math.sin(t * 1.7 + 30 * 0.11 + k)), 50, 1);
};
const antorcha = (x, y, t, k, lado) => {
  R.halo(x, y - 7, 26, rampa(['#3a3020', '#5a3e1e', '#8a5420']), 0.55 + 0.08 * Math.sin(t * 9 + k));
  R.linea(x - lado * 6, y + 6, x, y + 2, K); R.linea(x - lado * 6, y + 7, x, y + 3, hex('#5a4a3a'));
  R.rect(x - 3, y - 1, x + 3, y + 3, K); R.rect(x - 2, y, x + 2, y + 2, hex('#6a4a2a'));
  const f = Math.sin(t * 17 + k) * 1.6, g = Math.sin(t * 11 + k * 2);
  R.poligono([[x - 4, y - 1], [x + 4, y - 1], [Math.round(x + 1 + f), Math.round(y - 13 - g * 2)]], hex('#e85a20'));
  R.poligono([[x - 2, y - 1], [x + 2, y - 1], [Math.round(x + f * 0.5), Math.round(y - 9 - g)]], hex('#f8c040')); R.pset(x, y - 3, hex('#fff0a0'));
  if ((t * 3 + k) % 1 < 0.5) R.pset(Math.round(x + f * 2), Math.round(y - 16 - ((t * 9 + k) % 6)), hex('#f8a040'));
};
const p1 = (t) => {
  fondo('trono', pintaTrono);
  // la tormenta en la vidriera: cielo verde oscuro, nubes que corren y relámpagos (uno cae en «decision»)
  const fase = t % 3.1, rayo = fase < 0.1 || (fase > 0.18 && fase < 0.24) || (t > DECISION && t < DECISION + 0.18) || (t > DECISION + 0.3 && t < DECISION + 0.36);
  for (let y = 22; y <= 96; y++) for (let x = 30; x <= 68; x++) { if (!enVentana(x, y)) continue;
    const n = hh(Math.floor((x + t * 7) / 5), Math.floor(y / 4), 9) + (by(x, y) - 0.5) * 0.3;
    let c = (y - 22) / 74 + (by(x, y) - 0.5) * 0.4 > 0.5 ? hex('#1a3430') : hex('#0e1c1c'); if (n > 0.62) c = hex('#2a4a44'); if (n > 0.86) c = hex('#46706a');
    if (rayo) c = by(x, y) < 0.6 ? hex('#c8ffe0') : hex('#6ab890'); R.pset(x, y, c); }
  if (rayo) { let lx = 52, ly = 22; while (ly < 94) { const nx = lx + (hh(lx, ly, Math.floor(t / 3.1)) - 0.5) * 10, ny = ly + 6; R.linea(Math.round(lx), Math.round(ly), Math.round(nx), Math.round(ny), hex('#ffffff')); lx = Math.max(34, Math.min(64, nx)); ly = ny; } }
  pegar('tronoMarco', pintaMarco);
  if (rayo) for (let y = 128; y < 172; y++) for (let x = 14; x < 110; x++) if (by(x, y) < 0.22 - Math.abs(x - 60) / 300) R.pset(x, y, mez(R.pget(x, y), hex('#a8ffd0'), 0.4));
  estandarte(98, t, 0); estandarte(208, t, 2);
  antorcha(30, 72, t, 0, -1); antorcha(240, 72, t, 3, 1);
  // el brasero
  for (let k = 0; k < 9; k++) { const h0 = 6 + ((Math.floor(t * 9) + k * 3) % 5); R.linea(282 + k * 3, 120, 282 + k * 3 + (k % 2 ? 1 : -1), 120 - h0, k % 3 ? hex('#e85a20') : hex('#f8c040')); }
  for (let k = 0; k < 6; k++) { const yy = 116 - ((t * 14 + k * 9) % 46); R.pset(Math.round(290 + k * 3 + Math.sin(t * 2 + k) * 3), Math.round(yy), k % 2 ? hex('#f8a040') : hex('#fff0a0')); }
  R.halo(295, 112, 22, rampa(['#3a3020', '#6a4420']), 0.5);
  // el cuervo en el capitel: se sacude y abre las alas en «unthinkable»
  { const ab = t > IMPENSABLE - 0.2 && t < IMPENSABLE + 0.5, x = 252, y = 29;
    R.rect(x - 3, y - 4, x + 3, y, K); R.rect(x + 2, y - 7, x + 5, y - 4, K); R.pset(x + 6, y - 6, hex('#c8a040')); R.pset(x + 4, y - 6, hex('#e8e0a0')); R.linea(x - 3, y - 1, x - 7, y + 1, K);
    if (ab) { const a = Math.sin(t * 22) > 0 ? -1 : 1; R.poligono([[x - 2, y - 3], [x - 12, y - 8 + a * 4], [x - 6, y - 1]], K); R.poligono([[x + 1, y - 3], [x + 10, y - 9 + a * 4], [x + 4, y - 1]], K); } }
  // los dos guardias de metal giran la cabeza de vez en cuando
  R.actor(EL.doom, 78, 146, t, { dir: (t % 5) < 2.6 ? 1 : -1, pal: BOT });
  R.actor(EL.doom, 226, 146, t, { dir: ((t + 1.7) % 5) < 2.6 ? -1 : 1, pal: BOT });
  // Doom: levanta la mano en «warns»; en «decision» mira a una Tierra y a la otra
  const dir = t > DECISION - 0.45 && t < DECISION + 0.35 ? -1 : 1, x = 152, suelo = 146, sube = t > AVISA - 0.15;
  R.actor(EL.doom, x, suelo, t, { dir, dedo: sube });
  const mx = dir > 0 ? x + 13 : x + 1, my = suelo - 21, g = tramo(t, AVISA - 0.15, AVISA + 0.3);
  if (g > 0) { R.halo(mx, my, Math.round(6 + 6 * g + Math.sin(t * 8)), VERDE, 1.4); R.disco(mx, my, 1.5, hex('#e8fff0')); }
  // las dos Tierras: aparecen en «unthinkable», unidas a la mano por hilos de energía; laten en «decision»
  const e = tramo(t, IMPENSABLE - 0.1, IMPENSABLE + 0.45), late = t > DECISION && t < DECISION + 0.5 ? 1.5 : 0;
  if (e > 0) for (const [px, tipo, k] of [[114, '616', 0], [206, '828', 1]]) { const py = 106 + Math.round(Math.sin(t * 1.6 + k * 3) * 2);
    R.halo(px, py, Math.round(15 * e + late * 3), VERDE, 1.1);
    if (e >= 1) for (let s = 0; s < 3; s++) { let ax = mx, ay = my; const n = 7; for (let i = 1; i <= n; i++) { const bx = mx + (px - mx) * i / n + (i < n ? (hh(i, s, Math.floor(t * 12)) - 0.5) * 6 : 0), byy = my + (py - my) * i / n + (i < n ? (hh(s, i, Math.floor(t * 12)) - 0.5) * 6 : 0);
      R.linea(Math.round(ax), Math.round(ay), Math.round(bx), Math.round(byy), s === 0 ? hex('#c8ffd8') : hex('#3aa860')); ax = bx; ay = byy; } }
    planeta(px, py, 9 * e + late, tipo, t); }
  publico(t, hex('#6ae89a'));
};

// ── 2 · Thor en la fortaleza del Vacío ──
const p2 = (t) => {
  T.vacio(R, t, { encuadre: 'vacio', camara: 'fortaleza', relampagos: false });
  const u = tramo(t, P2 + 0.1, P2 + 1.25), x = 152, y = Math.round(lerp(152, 168, u)), sube = t > MILAGRO - 0.4;
  // el cielo se carga antes del rayo
  const carga = tramo(t, MILAGRO - 0.9, MILAGRO), fl = t > MILAGRO && t < MILAGRO + 0.12;
  if (carga > 0 && t < MILAGRO + 0.6) for (let yy = 16; yy < 76; yy++) for (let xx = 110; xx < 240; xx++) { const d = Math.hypot((xx - 182) / 60, (yy - 30) / 34); if (d < 1 && by(xx, yy) < carga * 0.4 * (1 - d) ** 1.5) R.pset(xx, yy, hex('#8aa8ff')); }
  const th = R.actor(EL.thor, x, y, t, { dir: 1, anda: u > 0 && u < 1, sostiene: sube ? undefined : true, dedo: sube, habla: t > THOR && t < MILAGRO - 0.2 && Math.sin(t * 9) > 0 });
  const hx = sube ? x + 13 : th.mano[0], hy = sube ? y - 21 : th.mano[1];
  PIEZAS_DO.martillo(R, hx, hy, { arriba: sube });
  if (t > MILAGRO - 0.05 && t < MILAGRO + 0.55 && (Math.floor(t * 20) % 3 !== 2)) {   // el rayo baja hasta el martillo
    let lx = hx + 30, ly = 0; while (ly < hy - 9) { const nx = lx + (hh(lx, ly, 5) - 0.5) * 14 - (lx - hx) * 0.15, ny = Math.min(hy - 9, ly + 7); R.linea(Math.round(lx), ly, Math.round(nx), ny, hex('#ffffff')); R.linea(Math.round(lx) + 1, ly, Math.round(nx) + 1, ny, hex('#8ab8ff')); lx = nx; ly = ny; }
    R.halo(hx, hy - 8, 16, rampa(['#3a5aa8', '#8ab8ff', '#e8f0ff']), 1.3); }
  if (t > MILAGRO) for (let n = 0; n < 8; n++) { const a = t * 11 + n * 0.8, r = 6 + 5 * hh(n, Math.floor(t * 10), 3); R.linea(hx, hy - 8, Math.round(hx + Math.cos(a) * r), Math.round(hy - 8 + Math.sin(a) * r), n % 2 ? hex('#c8e0ff') : hex('#5a8aff')); }
  if (fl) for (let yy = 0; yy < 180; yy++) for (let xx = 0; xx < 320; xx++) if (by(xx, yy) < 0.45) R.pset(xx, yy, hex('#e8f0ff'));
  publico(t, hex('#9ab8ff'));
};

// ── 3 · el puente entre dos mundos (fondo local) ──
const arco = (x) => 148 + 32 * ((x - 160) / 64) ** 2;
const pintaPuente = () => {
  degradado(0, 0, 319, 106, rampa(['#2a2248', '#42285a', '#6a3266', '#a4445a', '#d8664a', '#f09a4e', '#fcd07c']), 11);
  R.halo(160, 94, 34, rampa(['#f09a4e', '#f8c070', '#fce4a8']), 1.2); R.disco(160, 94, 10, hex('#fff4d4'));
  for (let x = 0; x < 320; x++) { const a = Math.round(86 - 9 * Math.sin(x * 0.021 + 1) - 5 * hh(x >> 3, 1)), b = Math.round(96 - 6 * Math.sin(x * 0.034 + 3) - 3 * hh(x >> 2, 2));
    R.linea(x, a, x, 106, hex('#6a4a7a')); R.linea(x, b, x, 106, hex('#8a5a82')); if (hh(x, a) > 0.8) R.pset(x, a, hex('#a87a9a')); }
  // la ciudad de los sesenta a la izquierda: torres pastel redondeadas, la del platillo, ventanas encendidas
  for (const [x0, w, top, col] of [[2, 14, 52, '#e8a8b4'], [18, 10, 66, '#9ed8c0'], [30, 16, 42, '#f0d8a0'], [50, 12, 58, '#b0c0e8'], [64, 18, 48, '#e8a8b4'], [84, 10, 64, '#9ed8c0'], [96, 16, 56, '#f0d8a0'], [114, 10, 70, '#b0c0e8']]) {
    const c = mez(hex(col), hex('#d8889a'), 0.25), cs = mez(c, hex('#5a3a6a'), 0.3);
    R.rect(x0, top + 4, x0 + w, 106, K); R.disco(x0 + w / 2, top + 4, w / 2, K); R.rect(x0 + 1, top + 5, x0 + w - 1, 106, c); R.disco(x0 + w / 2, top + 4, w / 2 - 1, c);
    R.rect(x0 + w - 3, top + 6, x0 + w - 1, 106, cs);
    for (let y = top + 8; y < 104; y += 4) for (let x = x0 + 2; x < x0 + w - 2; x += 3) R.pset(x, y, hh(x, y, 3) > 0.45 ? hex('#fff0b8') : mez(c, K, 0.35)); }
  R.poligono([[22, 46], [38, 40], [54, 46], [38, 50]], K); R.poligono([[24, 46], [38, 41], [52, 46], [38, 49]], hex('#e8eaf2')); R.linea(26, 46, 50, 46, hex('#9a9cb0')); R.linea(38, 32, 38, 40, K); R.pset(38, 31, hex('#f84a4a'));
  // el raíl del monorraíl con sus pilares
  R.rect(0, 80, 126, 81, K); R.rect(0, 80, 126, 80, hex('#e0e0ec')); for (let x = 6; x < 126; x += 22) R.rect(x, 82, x + 2, 104, hex('#c8c8d8'));
  // los árboles de bola de los jardines
  for (let k = 0; k < 9; k++) { const x = 6 + k * 14, y = 102 + (k % 2) * 3; R.linea(x, y, x, y + 6, hex('#5a4a3a')); R.disco(x, y - 2, 4, hex('#3a8a5a')); R.disco(x - 1, y - 3, 2, hex('#6ac88a')); }
  // Wakanda a la derecha: torres doradas con bandas verdes y conos, ventanas turquesa, la selva
  for (const [x0, w, top] of [[204, 12, 54], [220, 16, 34], [242, 10, 58], [256, 14, 48], [282, 12, 60], [300, 14, 64]]) {
    R.rect(x0, top + 8, x0 + w, 106, K); R.poligono([[x0, top + 8], [x0 + w / 2, top], [x0 + w, top + 8]], K);
    R.rect(x0 + 1, top + 9, x0 + w - 1, 106, hex('#d8a83a')); R.poligono([[x0 + 1, top + 8], [x0 + w / 2, top + 1], [x0 + w - 1, top + 8]], hex('#f0c850'));
    R.rect(x0 + w - 3, top + 9, x0 + w - 1, 106, hex('#a87a28'));
    for (let y = top + 14; y < 104; y += 9) R.rect(x0 + 1, y, x0 + w - 1, y + 1, hex('#2a6a4a'));
    for (let y = top + 11; y < 104; y += 3) for (let x = x0 + 2; x < x0 + w - 2; x += 3) if (hh(x, y, 4) > 0.55) R.pset(x, y, hex('#8af0e0')); }
  for (let k = 0; k < 40; k++) { const x = 176 + k * 4 + Math.round(hh(k, 1) * 3), y = 100 + Math.round(hh(k, 2) * 6); R.disco(x, y, 5 + hh(k, 3) * 3, hex('#1e4a2a')); R.disco(x - 1, y - 2, 3, hex('#2e6a3a')); if (k % 3 === 0) R.disco(x - 2, y - 3, 1.5, hex('#4a9a4a')); }
  // el desfiladero: paredes de roca a capas y, al fondo, el río
  for (let y = 106; y < 180; y++) for (let x = 0; x < 320; x++) { const izq = x < 78 + (y - 106) * 0.2, der = x > 242 - (y - 106) * 0.2;
    let c; if (izq || der) { const capa_ = Math.floor((y + hh(x >> 3, 0) * 4) / 6) % 3; c = [hex('#a8744a'), hex('#8a5a3a'), hex('#6a4028')][capa_]; if (by(x, y) < 0.15) c = hex('#5a3420'); if (hh(x >> 1, y >> 1, 6) > 0.9) c = hex('#c8946a'); }
    else { c = y < 150 ? (by(x, y) < (y - 106) / 60 ? hex('#3a2a4a') : hex('#4a3458')) : y < 164 ? hex('#2a2238') : (by(x, y) < 0.3 ? hex('#5a8ad8') : hex('#3a6ab8')); }
    R.pset(x, y, c); }
  // el puente de piedra: pretil del fondo con balaustres, el tablero y la cara de sillares con su arco
  R.rect(0, 110, 319, 113, K); R.rect(0, 111, 319, 112, hex('#e0d0b4')); R.rect(0, 111, 319, 111, hex('#f4e8d0'));
  for (let x = 2; x < 320; x += 8) { R.rect(x, 114, x + 3, 125, K); R.rect(x + 1, 114, x + 2, 125, hex('#d0bea0')); R.pset(x + 1, 118, hex('#f0e2c8')); R.rect(x, 119, x + 3, 120, hex('#d0bea0')); }
  R.rect(0, 125, 319, 131, hex('#e2d2b6')); for (let x = 0; x < 320; x += 11) R.linea(x, 126, x - 3, 131, hex('#c4b294')); R.rect(0, 125, 319, 125, hex('#f4e8d0'));
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { if (y > arco(x) && x > 94 && x < 226) continue;
    const fila = Math.floor((y - 132) / 6), off = (fila % 2) * 7, junta = (y - 132) % 6 === 0 || (x + off) % 14 === 0;
    let c = junta ? hex('#8a7a62') : hh(Math.floor((x + off) / 14), fila, 2) > 0.5 ? hex('#c8b49a') : hex('#b8a488'); if (!junta && by(x, y) < 0.08) c = hex('#a89478'); if (y === 132) c = hex('#5a4a3a'); R.pset(x, y, c); }
  for (let x = 96; x < 226; x++) { const y = Math.round(arco(x)); R.rect(x, y - 3, x, y, hex('#9a8668')); R.pset(x, y + 1, K); if (x % 9 === 0) R.linea(x, y - 3, x + Math.round((x - 160) / 20), y - 7, hex('#8a7a62')); }
  R.rect(155, 148, 165, 156, K); R.rect(156, 149, 164, 155, hex('#d8c4a8'));
};
const BANDERA = { '-1': [hex('#2a5ac8'), hex('#f2eee2')], '1': [hex('#6a3a9a'), hex('#e8b830')] };
const p3 = (t) => {
  fondo('puente', pintaPuente);
  // nubes de tres tonos a tres velocidades y pájaros
  for (let k = 0; k < 7; k++) { const sp = [2, 4, 7][k % 3], x = ((k * 61 + t * sp) % 380) - 30, y = 26 + (k % 3) * 12 + (k % 2) * 4; if (x > 250 && y < 48) continue;
    nube3(x, y, 16 + (k % 3) * 6, hex('#f8b878'), hex('#c86a6a'), hex('#7a3a62')); }
  for (let k = 0; k < 5; k++) pajaro(((k * 70 + t * 14) % 360) - 20, 56 + (k % 3) * 8 + Math.sin(t + k) * 2, t, k, hex('#2a1a2a'));
  // el monorraíl pasa por la ciudad, recortado a ella
  { const tx = ((t * 26) % 220) - 60; R.recorte([0, 70, 126, 84]); R.rect(Math.round(tx), 74, Math.round(tx) + 34, 79, K); R.rect(Math.round(tx) + 1, 75, Math.round(tx) + 33, 78, hex('#f0f0f8')); R.rect(Math.round(tx) + 1, 77, Math.round(tx) + 33, 77, hex('#e84a4a'));
    for (let i = 4; i < 32; i += 5) R.pset(Math.round(tx) + i, 75, hex('#4a8ac8')); R.recorte(null); }
  // ventanas que titilan en las torres doradas
  for (let k = 0; k < 6; k++) if (Math.sin(t * 2 + k * 2.3) > 0.6) R.pset(224 + k * 7, 60 + k * 6, hex('#ffffff'));
  // la cascada de la derecha con su espuma, y el río que corre bajo el arco
  for (let y = 98; y < 172; y++) for (let x = 200; x < 207; x++) { if (!(y < 111 || y > arco(x) + 1)) continue; const f = ((y - t * 40 + x * 3) % 7 + 7) % 7; R.pset(x, y, f < 2 ? hex('#ffffff') : f < 4 ? hex('#c8e8f8') : hex('#8ac0e8')); }
  for (let k = 0; k < 7; k++) { const fx = 194 + k * 3 + Math.sin(t * 3 + k) * 2, fy = 172 + (k % 2); if (fy > arco(fx) + 2) R.disco(fx, fy, 2.5, k % 2 ? hex('#e8f4ff') : hex('#c8e0f0')); }
  for (let k = 0; k < 14; k++) { const x = 100 + ((k * 23 + t * 18) % 124), y = 168 + (k % 5) * 2; if (y > arco(x) + 2) R.linea(Math.round(x), y, Math.round(x) + 3, y, hex('#c8e0ff')); }
  // farolas con banderolas que ondean (azul y blanca de un lado, morada y oro del otro)
  for (const [x, d] of [[36, -1], [284, 1]]) { R.rect(x - 1, 86, x + 1, 125, K); R.rect(x, 86, x, 125, hex('#5a5a6a')); R.rect(x - 4, 78, x + 4, 87, K); R.rect(x - 3, 79, x + 3, 86, hex('#f8d070')); R.halo(x, 82, 14, rampa(['#f09a4e', '#f8c070']), 0.6);
    const [c0, c1] = BANDERA[String(d)]; for (let j = 0; j < 22; j++) { const m = Math.round(Math.sin(t * 3 + j * 0.3) * j / 10); for (let i = 0; i < 7; i++) R.pset(x + 2 + i + m, 92 + j, i === 3 ? c1 : c0); } R.poligono([[x + 2 + Math.round(Math.sin(t * 3 + 6.6) * 2), 114], [x + 9 + Math.round(Math.sin(t * 3 + 6.6) * 2), 114], [x + 5, 119]], c0); }
  // la gente de cada orilla saluda cuando se dan la mano
  const ya = t > ESTRECHA;
  gente(10, 130, hex('#e84a6a'), hex('#f0c8a0'), hex('#5a3a1a'), t, 1, ya); gente(18, 130, hex('#4aa8c8'), hex('#f0c8a0'), hex('#e8c060'), t, 2, ya); gente(26, 130, hex('#f0d060'), hex('#c8906a'), hex('#2a1a14'), t, 3, ya);
  gente(296, 130, hex('#6a3a9a'), hex('#7a4a2a'), hex('#1a1014'), t, 4, ya); gente(304, 130, hex('#e8b830'), hex('#8a5a3a'), hex('#1a1014'), t, 5, ya); gente(312, 130, hex('#2a8a5a'), hex('#6a3a1e'), hex('#1a1014'), t, 6, ya);
  // la Cosa y M'Baku llegan desde cada lado y se estrechan la mano en «shakes hands»
  const u = tramo(t, P3 + 0.1, ESTRECHA - 0.15), sacude = t > ESTRECHA ? Math.round(Math.sin(t * 16)) : 0, dan = t > ESTRECHA - 0.15;
  const xc = Math.round(lerp(-40, 134, u)), xm = Math.round(lerp(330, 166, u));
  R.actor(EL.cosa, xc, 130, t, { dir: 1, anda: u > 0 && u < 1, sostiene: dan ? [161, 116 + sacude] : undefined, sonrisa: t > ESTRECHA + 0.3 });
  R.actor(EL.mbaku, xm, 130, t, { dir: -1, anda: u > 0 && u < 1, sostiene: dan ? [161, 117 + sacude] : undefined, sonrisa: t > ESTRECHA + 0.3, habla: t > WAKANDA && Math.sin(t * 10) > 0 });
  if (t > ESTRECHA && t < ESTRECHA + 1.2) for (let n = 0; n < 6; n++) { const a = n * 1.05 + t * 3, r = 6 + (t - ESTRECHA) * 10; const sx = Math.round(161 + Math.cos(a) * r), sy = Math.round(114 + Math.sin(a) * r * 0.7); R.pset(sx, sy, hex('#fff4c0')); R.pset(sx + 1, sy, hex('#f8c040')); R.pset(sx, sy - 1, hex('#f8c040')); }
  publico(t, hex('#f8b070'));
};

// ── 4 · Doom y Reed en la puerta del castillo, con las viñetas antiguas ──
const p4 = (t) => {
  const v = 0.22 * tramo(t, DOOM2 - 0.6, HISTORIA - 0.2) + 0.22 * tramo(t, HISTORIA - 0.2, REED - 0.2) + 0.56 * tramo(t, REED - 0.2, REED + 1.0);
  T.latveria(R, t, { encuadre: 'castillo', camara: 'vinetas', vinetas: v });
  const ud = tramo(t, P4 + 0.2, P4 + 1.8), xd = Math.round(lerp(200, 184, ud)), yd = Math.round(lerp(154, 164, ud));
  const ur = tramo(t, P4 + 0.6, MIRADA), xr = Math.round(lerp(300, 226, ur)), yr = Math.round(lerp(180, 168, ur));
  const sube = t > DOOM2 - 0.15;
  R.actor(EL.doom, xd, yd, t, { dir: t > MIRADA - 0.6 ? 1 : (ud > 0 && ud < 1 ? -1 : 1), anda: ud > 0 && ud < 1, dedo: sube });
  if (sube) { const g = tramo(t, DOOM2 - 0.15, DOOM2 + 0.3); R.halo(xd + 13, yd - 21, Math.round(5 + 6 * g + Math.sin(t * 9)), VERDE, 1.4); R.disco(xd + 13, yd - 21, 1.5, hex('#e8fff0')); }
  R.actor(EL.reed, xr, yr, t, { dir: -1, anda: ur > 0 && ur < 1, dedo: t > HISTORIA, habla: t > HISTORIA && t < REED + 1 && Math.sin(t * 9) > 0, sorpresa: t > DOOM2 && t < HISTORIA });
  publico(t, hex('#f8d070'));
};

// ── 5 · el reloj del final de los avances (fondo local: la pantalla de cerca, con la fila de butacas) ──
const pintaPantalla = () => {
  for (let y = 0; y < 148; y++) for (let x = 0; x < 320; x++) { const a = Math.atan2(y - 86, x - 128), d = Math.hypot(x - 128, y - 86) / 210;
    let c = (Math.floor(a / 0.21 + 20) % 2) && by(x, y) < 0.7 - d ? hex('#1e3a26') : hex('#132a1a'); if (by(x, y) < d * 0.9 - 0.2) c = hex('#0a160e'); if (x > 270 && y < 52 && by(x, y) < 0.8) c = hex('#0a160e'); R.pset(x, y, c); }
  // la placa de piedra de la cuenta, con su marco de oro y remaches
  R.rect(196, 56, 290, 116, K); R.rect(197, 57, 289, 115, hex('#a8801c')); R.rect(199, 59, 287, 113, hex('#e8b830')); R.rect(201, 61, 285, 111, hex('#2a3430'));
  for (let y = 62; y < 111; y++) for (let x = 202; x < 285; x++) if (hh(x >> 1, y >> 1, 8) > 0.85) R.pset(x, y, hex('#36423e'));
  for (const [x, y] of [[203, 63], [283, 63], [203, 109], [283, 109]]) { R.pset(x, y, hex('#fff0a0')); R.pset(x + 1, y + 1, hex('#8a6a18')); }
  // el borde de la pantalla, el escenario de tablas y los telones
  R.rect(0, 146, 319, 149, K); for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x + Math.floor(y / 3) * 17) % 40 === 0 ? hex('#3a2416') : y === 150 ? hex('#8a5a34') : by(x, y) < 0.2 ? hex('#5a3a22') : hex('#4a2e1a'));
  for (const [x0, x1] of [[0, 9], [310, 319]]) for (let y = 0; y < 152; y++) for (let x = x0; x <= x1; x++) { const f = Math.sin(x * 1.4 + y * 0.03); R.pset(x, y, f > 0.4 ? hex('#8a1e2c') : f > -0.3 ? hex('#6a1622') : hex('#420e18')); }
};
const pintaButacas = () => {   // la fila de respaldos de terciopelo de delante, con costuras, ribete y vasos en los brazos
  for (const cx of [22, 86, 150, 214, 278]) { const x0 = cx - 28, x1 = cx + 28;
    for (let y = 160; y < 180; y++) for (let x = x0; x <= x1; x++) { const r = 9, dx = Math.min(x - x0, x1 - x), dy = y - 160; if (dx < r && dy < r && (r - dx) ** 2 + (r - dy) ** 2 > r * r) continue;
      const borde = dx < 1 || dy < 1; let c = borde ? K : dy < 3 ? hex('#c8384a') : x - x0 < 6 ? hex('#a82a3a') : x1 - x < 6 ? hex('#5a1220') : hex('#8a1e2c'); if (!borde && Math.abs(x - cx) < 1 && dy > 3) c = hex('#6a1622'); if (!borde && dy > 4 && by(x, y) < 0.1) c = hex('#7a1a28'); R.pset(x, y, c); }
    R.linea(x0 + 6, 163, x1 - 6, 163, hex('#e8b830')); }
  for (const x of [54, 182]) { R.rect(x - 4, 156, x + 4, 172, K); R.rect(x - 3, 157, x + 3, 171, x === 54 ? hex('#e84a4a') : hex('#f2eee2')); R.rect(x - 3, 160, x + 3, 162, hex('#f2eee2')); R.linea(x + 1, 156, x + 3, 148, hex('#f84a8a')); }
};
const ENGRANE = (cx, cy, r, a, c0, c1) => { R.disco(cx, cy, r + 1, K); for (let k = 0; k < 10; k++) { const b = a + k * 0.628; R.disco(Math.round(cx + Math.cos(b) * (r + 2)), Math.round(cy + Math.sin(b) * (r + 2)), 2.2, c1); } R.disco(cx, cy, r, c0); R.disco(cx, cy, r * 0.45, K); R.disco(cx, cy, r * 0.3, c1); for (let k = 0; k < 4; k++) { const b = a + k * 1.57; R.linea(cx, cy, Math.round(cx + Math.cos(b) * r * 0.9), Math.round(cy + Math.sin(b) * r * 0.9), mez(c0, K, 0.4)); } };
const p5 = (t) => {
  fondo('pantalla', pintaPantalla);
  const giro = t * 0.6;
  ENGRANE(42, 44, 15, giro, hex('#6a5a2a'), hex('#a8803a')); ENGRANE(64, 120, 12, -giro * 1.3, hex('#5a4a24'), hex('#98742e')); ENGRANE(176, 132, 9, giro * 1.7, hex('#5a4a24'), hex('#98742e'));
  // el reloj: bisel dorado con perlas, esfera de marfil con su pátina, marcas, agujas que giran hacia atrás y se frenan
  const cx = 128, cy = 86, r = 44;
  R.disco(cx, cy, r + 5, K); R.disco(cx, cy, r + 4, hex('#a8801c')); R.disco(cx, cy, r + 2, hex('#e8b830'));
  for (let k = 0; k < 24; k++) { const a = k * 0.2618; R.disco(Math.round(cx + Math.cos(a) * (r + 3)), Math.round(cy + Math.sin(a) * (r + 3)), 1, hex('#fff0a0')); }
  R.disco(cx, cy, r, hex('#f0e4c4')); for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy); if (d < r && by(x, y) < (d / r) ** 3 * 0.5) R.pset(x, y, hex('#d8c8a0')); }
  for (let k = 0; k < 60; k++) { const a = k * Math.PI / 30, l = k % 5 === 0 ? 0.8 : 0.9; R.linea(Math.round(cx + Math.cos(a) * r * l), Math.round(cy + Math.sin(a) * r * l), Math.round(cx + Math.cos(a) * r * 0.95), Math.round(cy + Math.sin(a) * r * 0.95), k % 5 === 0 ? hex('#2a1e10') : hex('#8a7a5a')); if (k % 15 === 0) R.disco(Math.round(cx + Math.cos(a) * r * 0.72), Math.round(cy + Math.sin(a) * r * 0.72), 2, hex('#2e7a3e')); }
  const fr = tramo(t, RELOJ, ESTRENO), am = -(t * 6) * (1 - fr) - fr * 2, ah = -t * 0.5;
  for (const [a, l, w] of [[am, 0.86, 1], [ah, 0.56, 2]]) for (let s = -w; s <= w; s++) R.linea(cx + s, cy, Math.round(cx + s + Math.sin(a) * r * l), Math.round(cy - Math.cos(a) * r * l), hex('#1a1208'));
  R.disco(cx, cy, 3, hex('#2e7a3e')); R.pset(cx - 1, cy - 1, hex('#a8ffc0'));
  T.e_mascara(R, cx, 30, 2, { capucha: true, ojos: 0.5 + 0.5 * Math.sin(t * 4) });
  // la placa cuenta los días: 49, 48, 47, 46
  const n = t < CUENTA ? 49 : t < ABAJO ? 48 : t < DIAS ? 47 : 46;
  if (t > RELOJ - 0.3) { const sal = 1 - tramo(t, n === 49 ? RELOJ - 0.3 : n === 48 ? CUENTA : n === 47 ? ABAJO : DIAS, (n === 49 ? RELOJ : n === 48 ? CUENTA : n === 47 ? ABAJO : DIAS) + 0.15);
    R.numero(String(n), 244, 101 - Math.round(sal * 6), { tam: 32, centro: true }); }
  if (t > ESTRENO && t < ESTRENO + 0.9) R.halo(244, 86, 46, rampa(['#3a6a2a', '#8ad860', '#e8ffb0']), 1.2 * (1 - tramo(t, ESTRENO, ESTRENO + 0.9)));
  // antes de «clock» la pantalla está en penumbra
  if (t > TERMINAN && t < TERMINAN + 0.5) R.halo(cx, cy, 56, VERDE, 1.3 * (1 - tramo(t, TERMINAN, TERMINAN + 0.5)));
  // las palomitas, de espaldas en su butaca, tiemblan con la cuenta; un fan de cuernos al lado
  const miedo = t > RELOJ - 0.1;
  { const hy = 152 + Math.round(Math.sin(t * 0.8) * 0.6); R.disco(70, hy, 9, hex('#0a0810')); for (const d of [-1, 1]) { R.linea(70 + d * 5, hy - 8, 70 + d * 8, hy - 15, hex('#3a3018')); R.linea(70 + d * 8, hy - 15, 70 + d * 6, hy - 19, hex('#3a3018')); R.pset(70 + d * 6, hy - 19, hex('#8ad860')); }
    for (let a = -2.75; a < -0.45; a += 0.1) R.pset(Math.round(70 + Math.cos(a) * 9.4), Math.round(hy + Math.sin(a) * 9.4), hex('#6ae89a')); }
  T.palomitas(R, 236, 178, t, { s: 2, dir: -1, espalda: true, expresion: miedo ? 'susto' : 'normal', salta: t > ESTRENO && t < ESTRENO + 0.6 ? 0.8 : 0 });
  if (miedo && t < ESTRENO + 1.5) { const yb = 116 - Math.round(tramo(t, RELOJ - 0.1, RELOJ + 0.2) * 4); R.rect(250, yb - 2, 264, yb + 15, K); R.rect(251, yb - 1, 263, yb + 14, hex('#f6f2ea')); R.pset(252, yb + 16, K); R.pset(253, yb + 15, hex('#f6f2ea')); R.icono('!', 254, yb + 1, hex('#e83a3a'), hex('#7a1a1a'), 2); }
  pegar('butacas', pintaButacas);
};
const efectos = [[AVISA, 'zumbido'], [IMPENSABLE, 'brillo'], [DECISION, 'trueno'], [P2 + 0.3, 'viento'], [MILAGRO, 'trueno'], [ESTRECHA, 'palmada'], [WAKANDA, 'publico'],
  [P4 + 0.3, 'puerta'], [DOOM2, 'zumbido'], [HISTORIA - 0.1, 'papel'], [REED - 0.1, 'papel'], [RELOJ, 'tic'], [ABAJO, 'tic'], [DIAS, 'tic'], [ESTRENO, 'boom']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2026 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['do-lista'] = ('La lista corta', '''// DO-LISTA (frases 63–64), 2026. Cinco planos:
// 1. «So if you're short on time, here's the short list» (el cuarto, la estantería de cerca): las palomitas entran
//    corriendo con un despertador que suena en la mano («short on time»), lo dejan en el suelo y en «short list»
//    señalan las cinco cajas, que se encienden una tras otra; corta antes de «Endgame»;
// 2. «Endgame, the Loki series, Deadpool & Wolverine, Thunderbolts and The Fantastic Four» (fondo local, el escritorio
//    de cerca: pared con la guirnalda, la balda con figuritas, el póster de la máscara, la ventana, el flexo, la taza):
//    las cinco cajas de pie en fila; cada una da un salto adelante y brilla cuando la voz dice su título (guante,
//    cuernos, garras, asterisco, 4) y las palomitas cuentan con los dedos 1–5; en «Four», saltan de emoción;
// 3. «…Disney recommends fifteen titles, starting with the first X-Men movie in 2000» (fondo local, el salón con la
//    tele): el fan del mando la enciende; en la tele salen quince carátulas una a una y en «fifteen» un 15 grande; en
//    «X-Men» la primera crece con su X y en «2000» sale el año; las palomitas, en el mueble, se asustan y se emocionan;
// 4. «With those, you'll understand the branches of time, the numbers of the Earths» (fondo local, el corcho del mapa
//    de cerca): en «branches» crecen las ramas de luz desde la «?» del centro; en «numbers of the Earths» salen las
//    Tierras con su número, y una mano clava la última con su chincheta;
// 5. «the new teams, and why Doom is waiting» (el cuarto entero): el fan enseña las fotos de los equipos frente al
//    mapa; el mapa se completa y en «Doom» aparece la máscara en el centro; el fan y las palomitas se sobresaltan.''', PIEZAS + r'''
const P2 = @(4.40), P3 = @(10.10), P4 = @(16.95), P5 = @(21.95);
const CORTO = @(1.80), LISTA = @(3.04);
const TIT = [@(4.58), @(5.14), @(6.31), @(7.87), @(8.67)], CUATRO = @(9.09);
const MAS = @(10.26), DISNEY = @(11.61), QUINCE = @(12.33), XMEN = @(14.68), DOSMIL = @(15.84);
const RAMAS = @(19.41), NUMEROS = @(20.97), TIERRAS = @(21.67);
const EQUIPOS = @(22.59), DOOM = @(24.04);

// ── 1 · la estantería: el despertador ──
const despertador = (x, y, t, suena) => {
  const s = suena ? (Math.floor(t * 30) % 2 ? 1 : -1) : 0; x = Math.round(x) + s; y = Math.round(y);
  R.disco(x, y - 5, 5, K); R.disco(x, y - 5, 4, hex('#e83a3a')); R.disco(x, y - 5, 3, hex('#f8f4e8')); R.linea(x, y - 5, x, y - 7, K); R.linea(x, y - 5, x + 2, y - 5, K);
  for (const d of [-1, 1]) { R.disco(x + d * 4, y - 10, 2, K); R.pset(x + d * 4, y - 10, hex('#f8d040')); R.pset(x + d * 3, y, K); }
  if (suena) for (const d of [-1, 1]) { R.pset(x + d * 8, y - 11, hex('#f8f4e8')); R.pset(x + d * 9, y - 9, hex('#f8f4e8')); R.pset(x + d * 8, y - 7, hex('#f8f4e8')); }
};
const p1 = (t) => {
  const g = T.hoy(R, t, { encuadre: 'cuarto', camara: 'estanteria' });
  const cajas = g.cajas ?? [62, 100, 138, 176, 214].map((x) => [x, 74]);
  const u = tramo(t, 0.25, 2.4), x = Math.round(lerp(-24, 118, u)), deja = t > LISTA - 0.25;
  const k = Math.floor((t - LISTA - 0.1) / 0.24), apunta = deja && k >= 0 && k < 5 ? cajas[k] : deja && k >= 5 ? cajas[2] : undefined;
  const pal = T.palomitas(R, x, 172, t, { s: 2, dir: u < 1 || !deja ? 1 : 1, anda: u > 0 && u < 1, expresion: deja ? (k >= 4 ? 'emocion' : 'normal') : t > CORTO - 0.3 ? 'susto' : 'normal', señala: apunta ? [apunta[0], apunta[1]] : undefined });
  if (!deja) despertador(pal.mano[0] + 2, pal.mano[1] + 4, t, t > CORTO - 0.3);
  else despertador(x - 22, 172, t, t < LISTA + 0.9);
  for (let i = 0; i < 5; i++) if (deja && k >= i) { const [cx, cy] = cajas[i]; const on = k === i || k >= 5 ? 1 : 0.4; if (on > 0.5 || Math.sin(t * 10 + i) > 0) R.anillo(cx, cy, 21 + (k === i ? Math.round(Math.sin(t * 14)) : 0), hex('#f8d040'), k === i ? 0 : 3); }
};

// ── 2 · el escritorio de cerca: las cinco cajas ──
const ICONO_CAJA = {
  guante: (x, y) => { R.rect(x - 6, y - 6, x + 6, y + 8, K); R.rect(x - 5, y - 5, x + 5, y + 7, hex('#e8b830')); for (const [i, c] of [[-4, '#9a4ae8'], [-1, '#3a8ae8'], [2, '#e83a3a'], [4, '#3ac85a']]) R.rect(x + i, y - 9, x + i + 1, y - 5, K), R.pset(x + i, y - 8, hex('#f0c850')), R.pset(x + i, y - 3, hex(c));
    R.disco(x, y + 2, 2, hex('#f0e040')); R.rect(x - 5, y + 5, x + 5, y + 7, hex('#a8801c')); R.rect(x - 4, y - 4, x - 3, y + 4, hex('#fff0a0')); },
  cuernos: (x, y) => { for (const d of [-1, 1]) { R.linea(x + d * 2, y + 6, x + d * 5, y - 2, K); R.linea(x + d * 3, y + 6, x + d * 6, y - 2, hex('#e8b830')); R.linea(x + d * 5, y - 2, x + d * 3, y - 9, hex('#e8b830')); R.linea(x + d * 6, y - 2, x + d * 4, y - 9, hex('#a8801c')); R.pset(x + d * 3, y - 10, K); }
    R.rect(x - 4, y + 4, x + 4, y + 8, K); R.rect(x - 3, y + 5, x + 3, y + 7, hex('#e8b830')); R.pset(x - 2, y + 5, hex('#fff0a0')); },
  garras: (x, y) => { for (const d of [-4, 0, 4]) { R.linea(x + d - 1, y + 7, x + d + 2, y - 9, K); R.linea(x + d, y + 7, x + d + 3, y - 9, hex('#e8ecf8')); R.linea(x + d + 1, y + 7, x + d + 4, y - 8, hex('#8a90a4')); } R.rect(x - 7, y + 6, x + 8, y + 9, K); R.rect(x - 6, y + 7, x + 7, y + 8, hex('#f0d040')); },
  asterisco: (x, y) => { for (const [a, b] of [[0, -9], [8, -4], [8, 5], [0, 9], [-8, 5], [-8, -4]]) { R.linea(x, y, x + a, y + b, K); R.linea(x + 1, y, x + a + 1, y + b, K); } for (const [a, b] of [[0, -8], [7, -4], [7, 4], [0, 8], [-7, 4], [-7, -4]]) R.linea(x, y, x + a, y + b, hex('#f2eee2')); R.disco(x, y, 2, hex('#f2eee2')); },
  cuatro: (x, y) => { R.disco(x, y, 10, K); R.disco(x, y, 9, hex('#f2eee2')); R.disco(x, y, 7, hex('#2a5ac8')); R.numero('4', x, y + 8, { tam: 16, centro: true }); },
};
const CAJAS = [['guante', '#4a2a7a', '#6a3aa8'], ['cuernos', '#1e5a2a', '#2e7a3e'], ['garras', '#a82a2a', '#d8b030'], ['asterisco', '#24242c', '#3a3a46'], ['cuatro', '#1e3e90', '#2a5ac8']];
const pintaMesa = () => {
  // la pared azul de noche con rayas y estrellitas, más oscura arriba a la derecha
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { let c = x % 6 < 3 ? hex('#1e2442') : hex('#222a4a'); if ((x * 7 + y * 13) % 97 === 0) c = hex('#3a4678'); if (by(x, y) < (x - 230) / 200 - y / 120) c = hex('#161a32'); if (y > 112) c = hex('#141830'); R.pset(x, y, c); }
  // el póster de la máscara, con chinchetas
  R.rect(12, 22, 62, 94, K); R.rect(14, 24, 60, 92, hex('#123a1e')); for (let y = 25; y < 92; y++) for (let x = 15; x < 60; x++) if (by(x, y) < Math.hypot(x - 37, y - 56) / 80) R.pset(x, y, hex('#0a2414'));
  T.e_mascara(R, 37, 56, 3, { capucha: true, ojos: 1 }); for (const [x, y] of [[16, 26], [58, 26]]) { R.disco(x, y, 2, hex('#e83a3a')); R.pset(x - 1, y - 1, hex('#ffb0b0')); }
  // la balda con figuritas: libros, un martillo, una maceta, una bola de nieve, un escudo
  R.rect(80, 66, 262, 70, K); R.rect(81, 66, 261, 68, hex('#a8743c')); R.rect(81, 66, 261, 66, hex('#c8945a')); for (const x of [96, 244]) { R.rect(x, 71, x + 2, 78, K); R.linea(x, 71, x - 4, 71, K); }
  for (let i = 0; i < 9; i++) { const x = 86 + i * 4, hgt = 16 + (i % 3) * 3, c = ['#c83a3a', '#3a6ac8', '#e8b830', '#2e7a3e', '#8a3a9a'][i % 5]; R.rect(x, 65 - hgt, x + 3, 65, K); R.rect(x + 1, 66 - hgt, x + 2, 65, hex(c)); R.pset(x + 1, 66 - hgt + 3, hex('#f2eee2')); }
  PIEZAS_DO.martillo(R, 140, 64, { arriba: true });
  R.rect(158, 56, 168, 65, K); R.rect(159, 57, 167, 65, hex('#c86a3a')); for (const [a, b] of [[-4, -8], [0, -11], [4, -8], [-2, -5], [3, -4]]) R.disco(163 + a, 55 + b, 3, hex('#3a8a4a')), R.pset(163 + a - 1, 54 + b, hex('#6ac86a'));
  R.disco(186, 56, 7, K); R.disco(186, 56, 6, hex('#a8d8f0')); R.pset(184, 53, hex('#ffffff')); R.rect(180, 61, 192, 65, K); R.rect(181, 62, 191, 64, hex('#8a5a3a')); R.disco(186, 58, 2, hex('#e83a3a'));
  PIEZAS_DO.escudo(R, 206, 56, { r: 7 }); R.rect(204, 63, 208, 65, K);
  // un cordel con cuatro fotos de cine colgadas con pinzas, bajo la balda
  for (let x = 100; x < 256; x++) R.pset(x, 80 + Math.round(Math.sin((x - 100) / 156 * Math.PI) * 4), hex('#c8b8a0'));
  for (const [x0, c] of [[110, '#c83a3a'], [146, '#2e7a3e'], [182, '#e8b830'], [218, '#3a6ac8']]) { const y0 = 82 + Math.round(Math.sin((x0 + 8 - 100) / 156 * Math.PI) * 4);
    R.rect(x0, y0, x0 + 16, y0 + 19, K); R.rect(x0 + 1, y0 + 1, x0 + 15, y0 + 18, hex('#f6f2ea')); R.rect(x0 + 2, y0 + 2, x0 + 14, y0 + 13, hex(c)); R.disco(x0 + 8, y0 + 8, 3, mez(hex(c), hex('#ffffff'), 0.5)); R.rect(x0 + 7, y0 - 2, x0 + 9, y0 + 2, hex('#b8844a')); }
  // la ventana de la derecha con la ciudad de noche y la luna, con su cortina
  R.rect(270, 50, 316, 110, K); R.rect(272, 52, 314, 108, hex('#1a2448')); for (let y = 52; y < 108; y++) for (let x = 272; x < 314; x++) if (by(x, y) < (y - 52) / 140) R.pset(x, y, hex('#2a3a66'));
  for (const [x0, w, top] of [[272, 10, 80], [284, 8, 72], [294, 12, 86], [306, 8, 76]]) { R.rect(x0, top, x0 + w, 108, hex('#101830')); for (let y = top + 3; y < 106; y += 4) for (let x = x0 + 2; x < x0 + w - 1; x += 3) if (hh(x, y) > 0.55) R.pset(x, y, hex('#f8d070')); }
  R.disco(300, 62, 4, hex('#f0ecd0')); R.disco(302, 61, 3, hex('#1a2448'));
  R.rect(292, 52, 293, 108, K); R.rect(272, 79, 314, 80, K); for (let y = 48; y < 116; y++) for (let x = 262; x < 272; x++) R.pset(x, y, Math.sin(x * 1.3 + y * 0.05) > 0.2 ? hex('#8a3a5a') : hex('#6a2a46'));
  // el escritorio: tablas de madera con vetas y nudos, el canto de delante
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y - 120) / 15), veta = Math.sin(x * 0.07 + tabla * 3 + Math.sin(x * 0.013 + tabla) * 3) + (hh(x >> 3, y, tabla) - 0.5) * 0.6;
    let c = veta > 0.6 ? hex('#a8703e') : veta < -0.6 ? hex('#7a4a26') : hex('#8e5a30'); if ((y - 120) % 15 === 0) c = hex('#4a2a14'); if (y < 123) c = hex('#3a2010'); if (y > 172) c = y === 173 ? hex('#c8905a') : hex('#5a3418'); R.pset(x, y, c); }
  for (const [nx, ny] of [[132, 140], [248, 160], [40, 128]]) { R.disco(nx, ny, 3, hex('#6a3a1e')); R.disco(nx, ny, 1.5, hex('#4a2a14')); }
  // el flexo: base, brazos y cabeza; su luz cálida sobre la mesa
  R.disco(24, 150, 8, K); R.disco(24, 149, 7, hex('#3a3a46')); R.rect(18, 146, 30, 147, hex('#5a5a6a'));
  for (const [a, b, c, d] of [[24, 148, 34, 104], [34, 104, 58, 92]]) { R.linea(a - 1, b, c - 1, d, K); R.linea(a, b, c, d, hex('#5a5a6a')); R.linea(a + 1, b, c + 1, d, K); }
  R.poligono([[52, 86], [66, 90], [70, 102], [56, 100]], K); R.poligono([[54, 88], [65, 91], [67, 100], [57, 98]], hex('#c83a3a')); R.pset(56, 89, hex('#f0a0a0'));
  for (let y = 102; y < 172; y++) for (let x = 40; x < 270; x++) { const d = Math.hypot((x - 150) / 120, (y - 140) / 40); if (d < 1 && by(x, y) < (1 - d) * 0.35) R.pset(x, y, mez(R.pget(x, y), hex('#fff0c0'), 0.3)); }
  // los cómics apilados, el lapicero y la taza
  for (let i = 0; i < 5; i++) { const c = ['#e83a3a', '#3a8ae8', '#f0d040', '#2e7a3e', '#f2eee2'][i]; R.rect(276 - i, 166 - i * 3, 314 - i, 168 - i * 3, K); R.rect(277 - i, 166 - i * 3, 313 - i, 167 - i * 3, hex(c)); }
  R.rect(292, 128, 304, 146, K); R.rect(293, 129, 303, 145, hex('#3a6ac8')); R.rect(293, 129, 295, 145, hex('#5a8ae8'));
  for (const [x, c] of [[295, '#f0d040'], [298, '#e83a3a'], [301, '#2e7a3e']]) { R.linea(x, 128, x + 1, 116, K); R.linea(x + 1, 128, x + 2, 117, hex(c)); }
  R.rect(266, 132, 280, 148, K); R.rect(267, 133, 279, 147, hex('#f2eee2')); R.rect(267, 133, 269, 147, hex('#ffffff')); R.rect(277, 133, 279, 147, hex('#c8c0b0')); R.rect(280, 136, 284, 143, K); R.rect(281, 137, 283, 142, hex('#f2eee2'));
  R.disco(273, 140, 3, hex('#2e7a3e'));
};
const LUCES = ['#e83a3a', '#f0d040', '#3ac85a', '#3a8ae8', '#c84ae8'].map(hex);
const p2 = (t) => {
  fondo('mesa', pintaMesa);
  // la guirnalda de bombillas que cambian de color (lejos de la esquina de Atom)
  for (let x = 70; x < 258; x++) { const k = Math.floor((x - 70) / 47), u = ((x - 70) % 47) / 47, y = Math.round(20 + Math.sin(u * Math.PI) * 8); R.pset(x, y, K);
    if ((x - 70) % 12 === 6) { const c = LUCES[(Math.floor(t * 2) + Math.floor(x / 12)) % 5]; R.rect(x - 1, y + 1, x + 1, y + 3, c); R.pset(x - 1, y + 1, hex('#ffffff')); R.halo(x, y + 2, 5, [mez(c, hex('#1e2442'), 0.6)], 0.8); } }
  // el vapor de la taza y la figurita que cabecea
  for (let k = 0; k < 3; k++) { const f = (t * 0.8 + k / 3) % 1; R.pset(Math.round(273 + Math.sin(f * 7 + k) * 2), Math.round(130 - f * 18), mez(hex('#e8e8f0'), hex('#8e5a30'), f)); }
  { const a = Math.round(Math.sin(t * 5) * 1.5); R.rect(225, 58, 233, 65, K); R.rect(226, 59, 232, 64, hex('#2a3a8a')); R.disco(229 + a, 52, 5, K); R.disco(229 + a, 52, 4, hex('#f0c8a0')); R.rect(225 + a, 47, 233 + a, 49, hex('#3a2a1a')); R.pset(227 + a, 52, K); R.pset(231 + a, 52, K); }
  // la lámpara de lava de la balda
  R.rect(248, 46, 256, 65, K); R.rect(249, 47, 255, 64, hex('#3a1a4a')); for (let k = 0; k < 3; k++) R.disco(252, 62 - ((t * 4 + k * 6) % 16), 1.6, hex('#f84a8a')); R.rect(247, 64, 257, 66, hex('#8a8a9a'));
  // las cinco cajas: de pie en fila; la que se nombra salta adelante, se ilumina y queda brillando
  const n = TIT.filter((x) => t >= x - 0.05).length;
  for (let i = 0; i < 5; i++) { const x0 = 96 + i * 34, on = t >= TIT[i] - 0.05, sal = tramo(t, TIT[i] - 0.05, TIT[i] + 0.12) - tramo(t, TIT[i] + 0.2, TIT[i] + 0.45);
    const y1 = 150 + (on ? 2 : 0) - Math.round(sal * 7), y0 = y1 - 42, [ico, c0, c1] = CAJAS[i];
    R.rect(x0 + 2, y1 + 1, x0 + 30, y1 + 2, hex('#4a2a14'));
    R.rect(x0, y0, x0 + 28, y1, K); R.rect(x0 + 1, y0 + 1, x0 + 27, y1 - 1, hex(c0)); R.rect(x0 + 4, y0 + 1, x0 + 27, y1 - 1, hex(c1)); R.rect(x0 + 1, y0 + 1, x0 + 3, y1 - 1, mez(hex(c0), K, 0.3));
    for (let y = y0 + 2; y < y1 - 1; y++) for (let x = x0 + 4; x < x0 + 27; x++) if (by(x, y) < 0.15 && (x + y) % 3 === 0) R.pset(x, y, mez(hex(c1), K, 0.25));
    ICONO_CAJA[ico](x0 + 15, y0 + 20); R.rect(x0 + 6, y1 - 7, x0 + 24, y1 - 5, mez(hex(c1), hex('#ffffff'), 0.3));
    if (!on) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x0 + 28; x++) if (by(x, y) < 0.45) R.pset(x, y, mez(R.pget(x, y), hex('#141830'), 0.6));
    else { const b = ((t - TIT[i]) * 60) % 90 - 20; for (let y = y0 + 1; y < y1; y++) { const x = Math.round(x0 + b + (y - y0) * 0.4); if (x > x0 + 3 && x < x0 + 27) { R.pset(x, y, hex('#ffffff')); R.pset(x + 1, y, mez(hex(c1), hex('#ffffff'), 0.5)); } } }
    if (t > TIT[i] && t < TIT[i] + 0.5) for (let s = 0; s < 6; s++) { const a = s * 1.05, r = 8 + (t - TIT[i]) * 40; R.pset(Math.round(x0 + 14 + Math.cos(a) * r), Math.round(y0 + 20 + Math.sin(a) * r * 0.8), hex('#fff4c0')); } }
  // las palomitas, sobre la mesa a la izquierda, cuentan con los dedos y saltan en «Four»
  T.palomitas(R, 70, 162, t, { s: 2, dir: 1, cuenta: n > 0 && t < CUATRO + 0.1 ? n : undefined, expresion: t > CUATRO ? 'emocion' : n > 0 ? 'normal' : 'normal', salta: t > CUATRO && t < CUATRO + 0.8 ? 1 : 0, señala: n === 0 ? [110, 130] : undefined });
};

// ── 3 · el salón con la tele: quince títulos ──
const TILE = ['#c8a020', '#2a5ac8', '#6a3aa8', '#2e7a3e', '#c83a3a', '#e8b830', '#3a3a46', '#d86a3a', '#2a8a8a', '#a82a5a', '#5a4ac8', '#8a6a3a', '#3a8ae8', '#c84ae8', '#2a5ac8'];
const pintaSalon = () => {
  // papel pintado cálido de rombos, zócalo, cuadros y la ventana de noche con su cortina
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { let c = ((x + y) % 12 === 0 || (x - y + 240) % 12 === 0) ? hex('#a87a5a') : hex('#c8986a'); if (by(x, y) < 0.1) c = hex('#b88a62'); if (x > 270 && y < 48 && by(x, y) < 0.7) c = hex('#b88a62'); if (y > 124) c = y === 125 ? hex('#f0d8b0') : hex('#8a5a3a'); R.pset(x, y, c); }
  for (const [x0, y0, x1, y1, tipo] of [[10, 24, 44, 50, 'lago'], [16, 58, 40, 82, 'flor']]) { R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#e8b830')); R.rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, tipo === 'lago' ? hex('#8ac8e8') : hex('#f2eee2'));
    if (tipo === 'lago') { R.rect(x0 + 3, y0 + 14, x1 - 3, y1 - 3, hex('#3a6ab8')); R.poligono([[x0 + 3, y0 + 15], [x0 + 12, y0 + 7], [x0 + 20, y0 + 15]], hex('#5a8a5a')); R.disco(x1 - 8, y0 + 7, 2, hex('#fff0a0')); }
    else { R.disco(28, 70, 4, hex('#e84a6a')); R.disco(28, 70, 1.5, hex('#f8d040')); R.linea(28, 74, 28, 79, hex('#2e7a3e')); } }
  R.rect(226, 22, 268, 92, K); R.rect(228, 24, 266, 90, hex('#1a2448')); for (let y = 24; y < 90; y++) for (let x = 228; x < 266; x++) if (by(x, y) < (y - 24) / 120) R.pset(x, y, hex('#2a3a66'));
  for (const [x0, w, top] of [[228, 9, 66], [238, 7, 58], [246, 12, 70], [259, 7, 62]]) { R.rect(x0, top, x0 + w, 90, hex('#101830')); for (let y = top + 3; y < 88; y += 4) for (let x = x0 + 2; x < x0 + w - 1; x += 3) if (hh(x, y, 2) > 0.5) R.pset(x, y, hex('#f8d070')); }
  R.disco(254, 36, 5, hex('#f0ecd0')); R.disco(256, 35, 4, hex('#1a2448')); R.rect(246, 24, 247, 90, K); R.rect(228, 56, 266, 57, K);
  for (let y = 18; y < 124; y++) for (const [a, b] of [[218, 228], [266, 276]]) for (let x = a; x < b; x++) R.pset(x, y, Math.sin(x * 1.1 + y * 0.04) > 0.2 ? hex('#4a7a5a') : hex('#3a5e46'));
  R.rect(214, 16, 280, 18, hex('#5a3a22'));
  // el suelo de tablas y la alfombra
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((x + (y >> 4) * 23) / 30); let c = (x + (y >> 4) * 23) % 30 === 0 || y % 16 === 0 ? hex('#5a3418') : hh(tabla, y >> 4) > 0.5 ? hex('#9a6a3a') : hex('#8a5a30'); R.pset(x, y, c); }
  for (let y = 158; y < 180; y++) for (let x = 20; x < 300; x++) { const d = Math.hypot((x - 160) / 140, (y - 172) / 16); if (d > 1) continue; R.pset(x, y, d > 0.9 ? hex('#6a1e2c') : d > 0.8 ? hex('#e8b830') : (Math.floor(d * 10) % 2 ? hex('#a83a4a') : hex('#8a2a3a'))); }
  // el mueble de la tele: madera con puertas, tiradores y la consola con su luz
  R.rect(40, 126, 222, 158, K); R.rect(41, 127, 221, 157, hex('#8a5a30')); R.rect(41, 127, 221, 129, hex('#b8844a'));
  for (const x of [44, 104, 164]) { R.rect(x, 132, x + 54, 154, hex('#7a4a26')); R.rect(x, 132, x + 54, 132, hex('#a8743c')); R.disco(x + 27, 143, 1.5, hex('#e8b830')); }
  R.rect(176, 120, 206, 126, K); R.rect(177, 121, 205, 125, hex('#2a2a34')); R.rect(178, 122, 190, 122, hex('#4a4a5a'));
  // la planta y la lámpara de pie
  R.rect(14, 136, 30, 158, K); R.rect(15, 137, 29, 157, hex('#c86a3a')); for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.32; R.linea(22, 137, Math.round(22 + Math.cos(a) * 18), Math.round(137 + Math.sin(a) * 26), k % 2 ? hex('#2e7a3e') : hex('#4a9a4a')); }
  R.rect(298, 64, 300, 166, K); R.disco(299, 168, 6, K); R.poligono([[288, 62], [310, 62], [304, 48], [294, 48]], hex('#f0d8a0')); R.linea(288, 62, 310, 62, K);
  // la tele: bisel negro con brillo, patas
  R.rect(54, 30, 206, 120, K); R.rect(56, 32, 204, 118, hex('#2a2a34')); R.linea(56, 32, 204, 32, hex('#4a4a5a')); R.rect(126, 120, 134, 124, K);
};
const p3 = (t) => {
  fondo('salon', pintaSalon);
  R.halo(299, 60, 30, rampa(['#d8a870', '#f0c890']), 0.55);
  // la pantalla: se enciende en «if you have more», salen las quince carátulas y luego crece la primera
  const enc = tramo(t, MAS - 0.2, MAS + 0.2), S = [60, 36, 200, 114];
  R.recorte(S);
  for (let y = 36; y <= 114; y++) for (let x = 60; x <= 200; x++) R.pset(x, y, enc < 1 && by(x, y) >= enc ? hex('#0e0e14') : (y < 46 ? hex('#141a3a') : by(x, y) < 0.3 ? hex('#1e2a5a') : hex('#18224a')));
  if (enc >= 1) { R.rect(64, 39, 92, 42, hex('#3a4a8a')); R.rect(170, 39, 196, 42, hex('#3a4a8a')); }
  const zoom = tramo(t, XMEN - 0.2, XMEN + 0.5);
  for (let i = 0; i < 15; i++) { const c = i % 5, f = Math.floor(i / 5), sal = tramo(t, MAS + 0.3 + i * 0.14, MAS + 0.5 + i * 0.14); if (sal <= 0) continue;
    if (i === 0 && zoom > 0) continue;
    const x0 = 66 + c * 27, y0 = 50 + f * 21 + Math.round((1 - sal) * 6), col = hex(TILE[i]), dim = zoom > 0 ? 0.55 : 0;
    R.rect(x0, y0, x0 + 22, y0 + 18, K); R.rect(x0 + 1, y0 + 1, x0 + 21, y0 + 17, mez(col, hex('#18224a'), dim)); R.rect(x0 + 1, y0 + 13, x0 + 21, y0 + 17, mez(mez(col, K, 0.4), hex('#18224a'), dim));
    const ix = x0 + 11, iy = y0 + 7, ci = mez(hex('#f2eee2'), hex('#18224a'), dim);
    if (i % 4 === 0) { R.linea(ix - 3, iy - 3, ix + 3, iy + 3, ci); R.linea(ix + 3, iy - 3, ix - 3, iy + 3, ci); } else if (i % 4 === 1) R.anillo(ix, iy, 3, ci); else if (i % 4 === 2) { R.rect(ix - 3, iy - 1, ix + 3, iy + 1, ci); R.rect(ix - 1, iy - 3, ix + 1, iy + 3, ci); } else R.poligono([[ix, iy - 4], [ix + 4, iy + 3], [ix - 4, iy + 3]], ci); }
  // el 15 en «fifteen»
  const q = tramo(t, QUINCE - 0.1, QUINCE + 0.2) - tramo(t, XMEN - 0.6, XMEN - 0.3);
  if (q > 0) { R.rect(108, 62, 152, 88, K); R.rect(110, 64, 150, 86, hex('#e8b830')); R.rect(112, 66, 148, 84, hex('#1e2a5a')); R.numero('15', 130, 84 - Math.round((1 - q) * 4), { tam: 16, centro: true }); }
  // la primera carátula crece: la X amarilla sobre azul, y en «2000» el año debajo
  if (zoom > 0) { const w = Math.round(lerp(22, 46, zoom)), hg = Math.round(lerp(18, 38, zoom)), x0 = Math.round(lerp(66, 107, zoom)), y0 = Math.round(lerp(50, 44, zoom));
    R.rect(x0 - 1, y0 - 1, x0 + w + 1, y0 + hg + 1, hex('#f8d040')); R.rect(x0, y0, x0 + w, y0 + hg, K); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hg - 1, hex('#2a3a9a'));
    const cx = x0 + w / 2, cy = y0 + hg / 2, r = hg * 0.32; R.disco(cx, cy, r + 3, K); R.disco(cx, cy, r + 2, hex('#e8e8f0')); R.disco(cx, cy, r, hex('#1e1e2a'));
    for (const s of [-1, 0, 1]) { R.linea(Math.round(cx - r + 1 + s), Math.round(cy - r + 1), Math.round(cx + r - 1 + s), Math.round(cy + r - 1), hex('#f8d040')); R.linea(Math.round(cx + r - 1 + s), Math.round(cy - r + 1), Math.round(cx - r + 1 + s), Math.round(cy + r - 1), hex('#f8d040')); }
    if (t > DOSMIL - 0.1) { const a = tramo(t, DOSMIL - 0.1, DOSMIL + 0.2); R.rect(96, 88, 164, 108, K); R.rect(97, 89, 163, 107, hex('#e8b830')); R.rect(99, 91, 161, 105, hex('#14183a')); R.numero('2000', 130, 106 - Math.round((1 - a) * 3), { tam: 16, centro: true }); } }
  R.recorte(null);
  if (enc > 0 && enc < 1) R.linea(60, 75, 200, 75, hex('#f2f2ff'));
  R.halo(130, 124, 44, rampa(['#2a3a6a', '#3a4a8a']), 0.25 * enc);
  // el fan apunta con el mando (que parpadea al pulsar) y las palomitas miran desde el mueble
  const clic = (t > MAS - 0.25 && t < MAS + 0.1) || (t > XMEN - 0.3 && t < XMEN);
  const fan = R.actor(EL.fanCapa, 236, 168, t, { dir: -1, sostiene: [228, 152], sonrisa: t > DOSMIL, sorpresa: t > QUINCE && t < QUINCE + 0.9, habla: t > DISNEY && t < QUINCE && Math.sin(t * 9) > 0 });
  { const [mx, my] = fan.mano; R.rect(mx - 6, my - 1, mx, my + 1, K); R.rect(mx - 5, my, mx - 1, my, hex('#3a3a46')); R.pset(mx - 6, my, clic ? hex('#ff4a4a') : hex('#8a2a2a')); if (clic) for (let k = 1; k < 4; k++) R.pset(mx - 6 - k * 3, my - k, hex('#ff8a8a')); }
  T.palomitas(R, 214, 126, t, { s: 1, dir: -1, expresion: t > DOSMIL ? 'emocion' : t > QUINCE && t < QUINCE + 1.2 ? 'susto' : 'normal', salta: t > DOSMIL && t < DOSMIL + 0.8 ? 1 : 0, señala: t > XMEN && t < DOSMIL ? [134, 70] : undefined });
  // el gato que cruza la alfombra
  { const gx = Math.round(lerp(-20, 120, tramo(t, P3 + 0.5, P3 + 6))), pa = Math.floor(t * 6) % 2; R.rect(gx, 168, gx + 12, 173, K); R.rect(gx + 1, 169, gx + 11, 172, hex('#d8884a')); R.rect(gx + 10, 164, gx + 16, 170, K); R.rect(gx + 11, 165, gx + 15, 169, hex('#d8884a')); R.pset(gx + 11, 163, K); R.pset(gx + 15, 163, K); R.pset(gx + 14, 166, K);
    R.linea(gx, 169, gx - 5, 164 + pa, K); R.pset(gx + 2 + pa, 174, K); R.pset(gx + 9 - pa, 174, K); for (let i = 3; i < 10; i += 3) R.pset(gx + i, 170, hex('#a85a2a')); }
};

// ── 4 · el corcho de cerca: las ramas y los números de las Tierras ──
const pintaCorcho = () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = hh(x, y, 1), d = Math.hypot((x - 160) / 230, (y - 90) / 150);
    let c = n > 0.8 ? hex('#c89a5e') : n < 0.2 ? hex('#8a5e32') : hex('#ac7c46'); if (by(x, y) < d * 0.8 - 0.15) c = hex('#6a4626'); const q = Math.max(0, 1 - Math.hypot((x - 300) / 50, (y - 22) / 40)); if (by(x, y) < q * 0.8) c = hex('#7a5230'); R.pset(x, y, c); }
  // fotos, notas con garabatos, una entrada y chinchetas (sin letras)
  for (const [x0, y0, w, hg, a, tipo] of [[18, 112, 38, 44, 1, 'escudo'], [278, 66, 36, 44, -1, 'cuatro'], [22, 30, 34, 30, 0, 'nota'], [280, 150, 30, 24, 0, 'nota2'], [210, 28, 44, 22, 0, 'entrada']]) {
    if (tipo.startsWith('nota')) { R.rect(x0 + 2, y0 + 2, x0 + w + 2, y0 + hg + 2, hex('#5a3a1e')); R.rect(x0, y0, x0 + w, y0 + hg, tipo === 'nota' ? hex('#f8e070') : hex('#f8a0c0')); for (let y = y0 + 6; y < y0 + hg - 3; y += 5) { let x = x0 + 4; while (x < x0 + w - 4) { R.pset(x, y + (x % 3 === 0 ? 1 : 0), hex('#3a2a6a')); x++; } } R.disco(x0 + w / 2, y0 + 2, 2, hex('#3a8ae8')); continue; }
    if (tipo === 'entrada') { R.rect(x0 + 2, y0 + 2, x0 + w + 2, y0 + hg + 2, hex('#5a3a1e')); R.rect(x0, y0, x0 + w, y0 + hg, hex('#f0e0c0')); R.rect(x0 + 32, y0, x0 + 32, y0 + hg, hex('#a89070')); R.rect(x0 + 4, y0 + 4, x0 + 28, y0 + 6, hex('#c83a3a')); R.rect(x0 + 4, y0 + 10, x0 + 22, y0 + 11, hex('#8a7a5a')); R.rect(x0 + 4, y0 + 14, x0 + 18, y0 + 15, hex('#8a7a5a')); R.disco(x0 + 38, y0 + 11, 3, hex('#e8b830')); R.disco(x0 + 2, y0 + 2, 2, hex('#e83a3a')); continue; }
    R.rect(x0 + 2, y0 + 2, x0 + w + 2, y0 + hg + 2, hex('#5a3a1e')); R.rect(x0, y0, x0 + w, y0 + hg, hex('#f6f2ea')); R.rect(x0 + 3, y0 + 3, x0 + w - 3, y0 + hg - 10, hex('#3a5a8a'));
    for (let y = y0 + 3; y < y0 + hg - 10; y++) for (let x = x0 + 3; x <= x0 + w - 3; x++) if (by(x, y) < (y - y0) / 80) R.pset(x, y, hex('#5a7aa8'));
    if (tipo === 'escudo') PIEZAS_DO.escudo(R, x0 + w / 2, y0 + 16, { r: 8 }); else { R.disco(x0 + w / 2, y0 + 17, 9, K); R.disco(x0 + w / 2, y0 + 17, 8, hex('#f2eee2')); R.disco(x0 + w / 2, y0 + 17, 6, hex('#2a5ac8')); R.numero('4', x0 + w / 2, y0 + 25, { tam: 16, centro: true }); }
    R.disco(x0 + w / 2, y0 + 1, 2, hex('#e83a3a')); R.pset(x0 + w / 2 - 1, y0, hex('#ffb0b0')); }
  // la hoja de calendario con el 18 rodeado, la tira de negativos, una mancha de taza y un clip
  R.rect(16, 70, 52, 104, hex('#5a3a1e')); R.rect(14, 68, 50, 102, hex('#f6f2ea')); R.rect(14, 68, 50, 76, hex('#c83a3a'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) R.rect(17 + i * 7, 79 + j * 6, 21 + i * 7, 82 + j * 6, hex('#d8d0c0'));
  R.numero('18', 32, 100, { centro: true, color: hex('#2a1a3a'), sombra: false }); R.anillo(32, 96, 8, hex('#e83a3a')); R.disco(32, 69, 2, hex('#e8b830'));
  R.rect(128, 158, 204, 174, hex('#1a1414')); for (let x = 130; x < 204; x += 5) { R.rect(x, 159, x + 2, 160, hex('#c8b8a0')); R.rect(x, 172, x + 2, 173, hex('#c8b8a0')); }
  for (let k = 0; k < 4; k++) { R.rect(132 + k * 18, 162, 146 + k * 18, 170, hex('#5a3a2a')); R.disco(139 + k * 18, 166, 2, hex('#e8a050')); }
  R.anillo(206, 40, 9, hex('#7a4e2a')); R.anillo(206, 40, 8, hex('#8a5a32'));
  R.rect(60, 150, 61, 166, hex('#c8ccd8')); R.rect(60, 150, 66, 151, hex('#c8ccd8')); R.rect(65, 150, 66, 162, hex('#c8ccd8'));
};
const RAMAS_L = (() => { const L = []; const crece = (x, y, a, l, d, t0) => { if (d > 4) return; const x1 = x + Math.cos(a) * l, y1 = y + Math.sin(a) * l; L.push([x, y, x1, y1, t0, d]); crece(x1, y1, a - 0.45 - hh(d, x) * 0.2, l * 0.72, d + 1, t0 + 0.22); crece(x1, y1, a + 0.45 + hh(y, d) * 0.2, l * 0.72, d + 1, t0 + 0.22); };
  crece(160, 92, Math.PI, 40, 0, 0); crece(160, 92, 0, 40, 0, 0.05); return L; })();
const TIERRAS_C = [[70, 62, '616', 0], [226, 62, '828', 0.18], [96, 138, '10005', 0.36], [258, 126, '838', 0.62]];
const p4 = (t) => {
  fondo('corcho', pintaCorcho);
  // la «?» del centro en su ficha
  R.rect(146, 74, 176, 110, hex('#5a3a1e')); R.rect(144, 72, 174, 108, hex('#f6f2ea')); R.icono('?', 151, 78, hex('#c83a3a'), hex('#5a1a1a'), 4); R.disco(159, 73, 2, hex('#3ac85a'));
  // las ramas de luz crecen en «branches of time»
  const u = (t - RAMAS + 0.35) * 1.1;
  for (const [x0, y0, x1, y1, t0, d] of RAMAS_L) { const f = cl((u - t0) / 0.22); if (f <= 0) continue; const xe = x0 + (x1 - x0) * f, ye = y0 + (y1 - y0) * f;
    R.linea(Math.round(x0), Math.round(y0) + 1, Math.round(xe), Math.round(ye) + 1, hex('#5a3a1e')); R.linea(Math.round(x0), Math.round(y0), Math.round(xe), Math.round(ye), d < 2 ? hex('#a8ffc0') : hex('#3ac85a'));
    if (f >= 1 && d === 4) { R.disco(Math.round(x1), Math.round(y1), 1.6, hex('#e8b830')); if (Math.sin(t * 6 + x1) > 0.4) R.pset(Math.round(x1), Math.round(y1) - 2, hex('#ffffff')); } }
  // las Tierras con su número, unidas al centro por hilo rojo, salen en «numbers of the Earths»; una mano clava la última
  for (const [px, py, tipo, d] of TIERRAS_C) { const e = tramo(t, NUMEROS - 0.15 + d, NUMEROS + 0.15 + d); if (e <= 0) continue;
    R.linea(px, py, 159, 92, hex('#c82a2a')); R.linea(px, py + 1, 159, 93, hex('#7a1a1a'));
    planeta(px, py, Math.round(12 * e), tipo, t);
    if (e >= 1) { const w = tipo.length * 8 + 6; R.rect(px - w / 2, py + 15, px + w / 2, py + 26, K); R.rect(px - w / 2 + 1, py + 16, px + w / 2 - 1, py + 25, hex('#f6f2ea')); R.numero(tipo, px, py + 24, { centro: true, color: hex('#2a1a3a'), sombra: false }); }
    R.disco(px, py - 13, 2, hex('#e83a3a')); }
  const lleva = tramo(t, NUMEROS + 0.2, TIERRAS - 0.05), vuelve = tramo(t, TIERRAS + 0.15, TIERRAS + 0.55);
  if (lleva > 0 && vuelve < 1) { const hx = Math.round(lerp(330, 288, lleva) + vuelve * 50), hy = 127; T.brazo(R, 334, 156, hx, hy, '#3a5a9a', -1, { codo: [318, 140] }); }
  R.halo(160, 92, 70, rampa(['#c89a5e', '#e8c890']), 0.25);
};

// ── 5 · el cuarto entero: el mapa se completa y aparece la máscara ──
const p5 = (t) => {
  const m = lerp(0.8, 1, tramo(t, P5 + 0.2, DOOM));
  T.hoy(R, t, { encuadre: 'cuarto', mapa: m });
  if (t > DOOM) R.halo(218, 61, Math.round(18 + 3 * Math.sin(t * 6)), VERDE_M, 0.9);
  // el fan enseña las fotos de los equipos; en «Doom» se vuelve y se sobresalta
  const ve = t > DOOM - 0.1, uf = tramo(t, P5, P5 + 0.9), xf = Math.round(lerp(270, 214, uf));
  const fan = R.actor(EL.fanCuernos, xf, 166, t, { dir: ve ? 1 : -1, anda: uf > 0 && uf < 1, sostiene: !ve && t > EQUIPOS - 0.3 ? true : undefined, habla: t > EQUIPOS && t < DOOM - 0.3 && Math.sin(t * 9) > 0, sorpresa: ve });
  if (!ve && t > EQUIPOS - 0.3) { const [mx, my] = fan.mano; for (const [dx, c] of [[-14, '#3a5a8a'], [-7, '#8a3a3a'], [0, '#2a6a4a']]) { R.rect(mx + dx - 3, my - 9, mx + dx + 3, my - 1, K); R.rect(mx + dx - 2, my - 8, mx + dx + 2, my - 2, hex('#f6f2ea')); R.rect(mx + dx - 1, my - 7, mx + dx + 1, my - 4, hex(c)); } }
  if (ve && t < DOOM + 1.2) R.icono('!', xf + 5, 126, hex('#f8d040'), K, 2);
  T.hoyDelante(R, t, { encuadre: 'cuarto' });
  T.palomitas(R, 96, 136, t, { s: 1, dir: 1, asiente: t > EQUIPOS && t < DOOM - 0.2, expresion: t > DOOM ? 'susto' : 'normal', señala: t > DOOM + 0.4 ? [218, 61] : undefined });
};
const VERDE_M = rampa(['#1e5a30', '#3aa860', '#a8ffc0']);
const efectos = [[CORTO, 'ring'], [LISTA, 'pop'], [TIT[0], 'toc'], [TIT[1], 'toc'], [TIT[2], 'toc'], [TIT[3], 'toc'], [TIT[4], 'toc'], [CUATRO, 'boing'],
  [MAS - 0.2, 'bip'], [QUINCE, 'pop'], [DOSMIL, 'brillo'], [RAMAS, 'brillo'], [NUMEROS, 'pop'], [TIERRAS, 'golpecito'], [EQUIPOS, 'papel'], [DOOM, 'flash']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2026 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['do-cierre'] = ('Llevad palomitas', '''// DO-CIERRE (frases 65–67), 2026. Tres planos:
// 1. «The man who saved the universe in 2019 is now back to put it in danger» (la batalla de noche, el pedestal): las
//    velas encendidas alrededor de la armadura; en «2019» el reactor late fuerte y brilla el 2019 de la placa; en «now
//    back» la máscara de Doom aparece en el cielo entre rayos verdes; en «danger» una ráfaga verde apaga casi todas
//    las velas; el fan de la araña retrocede y las palomitas asoman asustadas tras un bloque; corta en «And this time»;
// 2. «…the heroes of three Earths are going to have to agree with each other» (la batalla entera, de noche): se abren
//    tres portales (azul, cobre y ocre) y salen Sam y Thor, la Cosa y Reed, Lobezno y Deadpool; Sam y Lobezno, de
//    mala gana, se dan la mano en «agree» y todos levantan los brazos en «each other»; corta antes de «Bring»;
// 3. «Bring popcorn. What do you want me to explain next?» (el cine de lado): las palomitas saltan a su butaca, se
//    ponen las gafas en «popcorn» y se apagan las luces; en la pantalla empieza la cuenta de los rollos; en «What do
//    you want» se vuelven, saludan a Atom y les sale una «?».''', PIEZAS + r'''
const P2 = @(5.62), P3 = @(10.80);
const SALVO = @(1.10), AÑO = @(2.34), VUELVE = @(3.60), PELIGRO = @(4.84);
const TRES = @(7.52), ACUERDO = @(9.24), OTROS = @(9.82);
const LLEVAD = @(11.18), POPCORN = @(11.38), QUE = @(13.10), EXPLICAR = @(13.86);

// ── 1 · el pedestal de noche y la máscara en el cielo ──
const p1 = (t) => {
  const apaga = tramo(t, PELIGRO - 0.1, PELIGRO + 0.6);
  const g = T.lago(R, t, { encuadre: 'batalla', camara: 'pedestal', velas: 1 - apaga * 0.8 });
  // en «now back» la máscara aparece en el cielo, entre rayos verdes
  const mk = tramo(t, VUELVE - 0.3, VUELVE + 0.6);
  if (mk > 0) { R.halo(160, 42, Math.round(30 * mk + 2 * Math.sin(t * 5)), rampa(['#0e2a16', '#1e5a30', '#3aa860']), 1.1);
    if (mk >= 1 || by(5, Math.floor(t * 20)) < mk) T.e_mascara(R, 160, 42, 3, { capucha: true, ojos: 0.6 + 0.4 * Math.sin(t * 6), brillo: (t * 0.5) % 1 });
    if ((t % 1.3) < 0.1 || (t > PELIGRO && t < PELIGRO + 0.12)) { for (const d of [-1, 1]) { let lx = 160 + d * 22, ly = 30; while (ly < 70) { const nx = lx + d * 4 + (hh(lx, ly, 3) - 0.5) * 6, ny = ly + 6; R.linea(Math.round(lx), ly, Math.round(nx), ny, hex('#a8ffc0')); lx = nx; ly = ny; } } } }
  // en «2019» el reactor late y brilla el año en la placa del pedestal
  const pl = tramo(t, AÑO - 0.15, AÑO + 0.3) - tramo(t, AÑO + 1.6, AÑO + 2.2);
  if (pl > 0) { R.halo(160, 117, Math.round(6 + 6 * pl), rampa(['#3a6a8a', '#8ad8ff', '#e8ffff']), 1.3); R.rect(146, 153, 174, 162, K); R.rect(147, 154, 173, 161, hex('#a8801c')); R.numero('2019', 160, 161, { centro: true, color: mez(hex('#5a3a10'), hex('#fff0a0'), pl), sombra: false }); }
  // la ráfaga verde de «danger» barre el suelo
  if (apaga > 0 && apaga < 1) for (let k = 0; k < 18; k++) { const x = Math.round(apaga * 380 - 40 - k * 9), y = 120 + (k * 13) % 50; R.linea(x, y, x + 8, y, hex('#3aa860')); R.pset(x + 9, y, hex('#a8ffc0')); }
  // el fan de la araña con su flor mira arriba y retrocede; las palomitas asoman tras un bloque
  const ret = tramo(t, VUELVE, VUELVE + 0.8), xa = Math.round(lerp(70, 44, ret));
  const fa = R.actor(EL.fanArana, xa, 166, t, { dir: 1, sostiene: t < VUELVE ? true : undefined, sorpresa: t > VUELVE - 0.1, anda: ret > 0 && ret < 1 });
  if (t < VUELVE) { const [fx, fy] = fa.mano; R.linea(fx, fy, fx + 1, fy - 6, hex('#2e7a3e')); R.disco(fx + 1, fy - 7, 2, hex('#e84a6a')); R.pset(fx + 1, fy - 7, hex('#f8d040')); }
  else { R.linea(96, 166, 99, 160, hex('#2e7a3e')); R.disco(99, 159, 2, hex('#e84a6a')); }
  const asoma = tramo(t, SALVO, SALVO + 0.6);
  T.palomitas(R, 252, 162 + Math.round((1 - asoma) * 10), t, { s: 1, dir: -1, expresion: t > VUELVE - 0.2 ? 'susto' : 'normal', tapa: t > PELIGRO });
  R.poligono([[236, 180], [240, 160], [262, 156], [276, 162], [278, 180]], K); R.poligono([[238, 179], [241, 161], [262, 157], [275, 163], [276, 179]], hex('#4a4e62')); R.linea(242, 161, 262, 157, hex('#6a7088')); R.linea(252, 160, 250, 176, hex('#2e3040'));
};

// ── 2 · tres portales en el campo de batalla: los héroes de tres Tierras se ponen de acuerdo ──
const PORTAL = { a: rampa(['#1e3a8a', '#3a7ad8', '#a8d8ff']), b: rampa(['#8a3a1a', '#d8783a', '#f8d0a0']), c: rampa(['#6a4a1a', '#b8863a', '#f0d890']) };
const portal = (cx, cy, e, ram, t) => { if (e <= 0) return; const rx = 12 * e, ry = 21 * e;
  for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d > 1) continue; const a = Math.atan2(y - cy, x - cx) + t * 4 + d * 3;
    R.pset(x, y, d > 0.82 ? ram[2] : Math.sin(a * 3) > 0.2 ? ram[1] : ram[0]); }
  for (let n = 0; n < 8; n++) { const a = t * 3 + n * 0.785; R.pset(Math.round(cx + Math.cos(a) * (rx + 3)), Math.round(cy + Math.sin(a) * (ry + 3)), ram[2]); } };
const p2 = (t) => {
  T.lago(R, t, { encuadre: 'batalla', luz: 'noche' });
  const ea = tramo(t, P2 + 0.2, P2 + 0.7) - tramo(t, ACUERDO, ACUERDO + 0.6), eb = tramo(t, P2 + 0.6, P2 + 1.1) - tramo(t, ACUERDO + 0.1, ACUERDO + 0.7), ec = tramo(t, P2 + 1.0, P2 + 1.5) - tramo(t, ACUERDO + 0.2, ACUERDO + 0.8);
  portal(40, 146, ea, PORTAL.a, t); portal(160, 134, eb, PORTAL.b, t); portal(282, 146, ec, PORTAL.c, t);
  // salen de los portales y van al centro
  const ua = tramo(t, P2 + 0.8, TRES + 0.4), ub = tramo(t, P2 + 1.2, TRES + 0.6), uc = tramo(t, P2 + 1.6, TRES + 0.8);
  const dan = t > ACUERDO - 0.15, todos = t > OTROS - 0.1, sac = t > ACUERDO ? Math.round(Math.sin(t * 15)) : 0;
  const q = (u) => u > 0 && u < 1;
  R.actor(EL.cosa, Math.round(lerp(156, 150, ub)), 150, t, { dir: 1, anda: q(ub), brazos: todos, sonrisa: todos });
  R.actor(EL.reed, Math.round(lerp(160, 112, ub)), 156, t, { dir: 1, anda: q(ub), dedo: t > TRES && !todos, brazos: todos, sonrisa: todos });
  if (ua > 0) { R.actor(EL.thor, Math.round(lerp(32, 80, ua)), 162, t, { dir: 1, anda: q(ua), brazos: todos, sonrisa: todos }); }
  if (uc > 0) { R.actor(EL.deadpool, Math.round(lerp(276, 202, uc)), 162, t, { dir: -1, anda: q(uc), brazos: todos }); }
  if (ua > 0) { const s = R.actor(EL.sam, Math.round(lerp(40, 140, ua)), 168, t, { dir: 1, anda: q(ua), sostiene: dan ? [161, 157 + sac] : true, sonrisa: todos }); if (!dan) PIEZAS_DO.escudo(R, s.mano[0], s.mano[1], { r: 5 }); else PIEZAS_DO.escudo(R, 144, 158, { r: 5, ancho: 0.4 }); }
  if (uc > 0) R.actor(EL.lobezno, Math.round(lerp(278, 166, uc)), 168, t, { dir: -1, anda: q(uc), sostiene: dan ? [162, 158 + sac] : undefined, enfado: !todos, sonrisa: todos });
  if (dan && t < ACUERDO + 1) R.halo(161, 156, Math.round(10 + (t - ACUERDO) * 14), rampa(['#8a7a3a', '#f8d070', '#fff4c0']), 1.2 - (t - ACUERDO));
  T.lagoDelante(R, t, { encuadre: 'batalla', luz: 'noche' });
};

// ── 3 · el cine de lado: las palomitas se acomodan y se apagan las luces ──
const p3 = (t) => {
  const L = 1 - tramo(t, POPCORN + 0.1, POPCORN + 1.2), peli = t > POPCORN + 0.9 ? 'cuenta' : undefined;
  T.hoy(R, t, { encuadre: 'cine', luces: L, pantalla: peli, publico: 'normal' });
  R.actor(EL.fanCapa, 130, 166, t, { dir: -1, habla: t < LLEVAD && Math.sin(t * 8) > 0 });
  const fa = R.actor(EL.fanArana, 184, 166, t, { dir: -1, sostiene: t > EXPLICAR + 0.3 ? [206, 140] : true, sonrisa: true });
  if (t <= EXPLICAR + 0.3) { const [mx, my] = fa.mano; R.rect(mx - 2, my - 6, mx + 2, my, K); R.rect(mx - 1, my - 5, mx + 1, my - 1, hex('#e84a4a')); R.linea(mx + 1, my - 6, mx + 2, my - 9, hex('#f8f8f8')); }
  R.actor(EL.fanCuernos, 274, 166, t, { dir: -1, sonrisa: t > POPCORN });
  T.hoyDelante(R, t, { encuadre: 'cine', luces: L, pantalla: peli });
  // las palomitas: llegan saltando por la fila, se sientan, gafas en «popcorn»; en «What do you want…» saludan a Atom
  const u = tramo(t, P3 + 0.1, LLEVAD), x = Math.round(lerp(330, 222, u)), sal = u > 0 && u < 1 ? 1 : t > LLEVAD && t < LLEVAD + 0.3 ? 0.6 : 0;
  const vuelve = t > QUE - 0.1;
  T.palomitas(R, x, 156, t, { s: 1, dir: vuelve ? 1 : -1, salta: sal, gafas: t > POPCORN - 0.05 ? '3d' : false, expresion: t > EXPLICAR + 0.3 && t < EXPLICAR + 1.1 ? 'susto' : t > POPCORN ? 'emocion' : 'normal', saluda: vuelve && t < EXPLICAR + 0.3 });
  if (t > EXPLICAR - 0.1) { const a = tramo(t, EXPLICAR - 0.1, EXPLICAR + 0.2); R.rect(x + 6, 110, x + 22, 130, K); R.rect(x + 7, 111, x + 21, 129, hex('#f6f2ea')); R.pset(x + 8, 131, K); R.pset(x + 9, 130, hex('#f6f2ea')); R.icono('?', x + 9, 113 - Math.round((1 - a) * 3), hex('#c83a3a'), hex('#f6f2ea'), 2); }
};
const efectos = [[AÑO, 'brillo'], [VUELVE, 'zumbido'], [PELIGRO, 'viento'], [P2 + 0.25, 'whoosh'], [P2 + 1.05, 'whoosh'], [ACUERDO, 'palmada'], [OTROS, 'publico'],
  [LLEVAD - 0.2, 'boing'], [POPCORN + 0.2, 'interruptor'], [QUE, 'pop'], [EXPLICAR + 0.3, 'masca']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')

E = {k: (v[0], v[1], _conv(k, v[2])) for k, v in E.items()}
