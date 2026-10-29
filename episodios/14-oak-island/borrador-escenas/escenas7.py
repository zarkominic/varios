E = {}

# piezas comunes de las tres escenas (se pegan al principio de cada cuerpo)
AYUDA = r'''
const K = hex('#1a1220'), BLANCO = hex('#ffffff');
const mz = (a, b, u) => { const r1 = a & 255, g1 = (a >>> 8) & 255, b1 = (a >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((b >>> 16) & 255) - b1) * u) << 16) | (Math.round(g1 + (((b >>> 8) & 255) - g1) * u) << 8) | Math.round(r1 + ((b & 255) - r1) * u)) >>> 0; };
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const tr = (x, y, u) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16 < u;
const osc = (x, y, u, c = K) => R.pset(x, y, mz(R.pget(x, y), c, u));
const tres = (base, x, y, k = 0) => { const n = hh(x, y, k); return n < 0.16 ? base[1] : n > 0.86 ? base[2] : base[0]; };
// degradado tramado (Bayer) de una lista de colores entre y0 e y1
const degr = (y0, y1, cols, x0 = 0, x1 = 319) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), k = Math.min(cols.length - 2, Math.floor(u)), f = u - k; for (let x = x0; x <= x1; x++) R.pset(x, y, tr(x, y, f) ? cols[k + 1] : cols[k]); } };
// cirros quietos, nubes de tres tonos a tres alturas y tres velocidades, y gaviotas
const cirros = (y0, n, c) => { for (let k = 0; k < n; k++) { const x = (k * 97 + 13) % 300, y = y0 + (k * 13) % 12, w = 14 + (k * 7) % 18; for (let i = 0; i < w; i++) if (hh(x + i, y, 3) > 0.3) R.pset(x + i, y + (i > w / 2 ? 1 : 0), c); } };
const nubes = (t, ys, v = 1) => { [[0.7, 16, ys[0]], [1.5, 26, ys[1]], [2.6, 40, ys[2]]].forEach(([vel, w, y], k) => { for (let j = 0; j < 2; j++) { const x = ((j * 200 + k * 83 + t * vel * v) % 420) - 50; R.nube(Math.round(x), y + j * 4, w - j * 4); } }); };
const gaviotas = (t, y0, n = 3) => { for (let k = 0; k < n; k++) { const x = ((k * 130 + 40 + t * (8 + k * 3)) % 380) - 30, y = y0 + k * 6 + Math.round(Math.sin(t * 0.8 + k) * 3); R.gaviota(Math.round(x), y, t, k); } };
const humo = (x, y, t, n = 5) => { for (let k = 0; k < n; k++) { const u = (t * 0.45 + k / n) % 1, xx = Math.round(x + u * 14 + Math.sin(u * 6 + k) * 2), yy = Math.round(y - u * 22), r = u < 0.3 ? 1 : u < 0.7 ? 2 : 3; R.disco(xx, yy, r, u > 0.6 ? hex('#e4e4ea') : hex('#c8c8d2')); if (r > 1) R.pset(xx - 1, yy - 1, BLANCO); } };
// trazo de tiza o lápiz que se dibuja (u 0–1) a lo largo de una lista de segmentos [x0, y0, x1, y1]
const trazo = (segs, u, c, gordo = false) => { let tot = 0; for (const s of segs) tot += Math.hypot(s[2] - s[0], s[3] - s[1]); let q = tot * u, punta = null;
  for (const [x0, y0, x1, y1] of segs) { if (q <= 0) break; const L = Math.hypot(x1 - x0, y1 - y0), f = Math.min(1, q / Math.max(0.01, L)), xe = x0 + (x1 - x0) * f, ye = y0 + (y1 - y0) * f; R.linea(x0, y0, xe, ye, c); if (gordo) R.linea(x0 + 1, y0, xe + 1, ye, c); q -= L; punta = [xe, ye]; }
  return u > 0 && u < 1 ? punta : null; };
'''

# ── los bueyes, el yugo y el arado (solo en oi-bueyes) ──
BUEYES = r'''
const BUEY = [
  '.....................hh.......',
  '....................hhk.......',
  '..kkkkkkkkkkkkkkk..kkkkk......',
  '.klllllllllllllllkklllcck.....',
  'kcllccccccccccccclkccccceck...',
  'kcccccwwwccccccccccckcccccck..',
  'kccccwwwwwcccccccccccckcccmmk.',
  'kcccccwwwccccccccccccckccmmmnk',
  'kscccccccccccccccccccsskkmmmmk',
  'ksscccccccccccccccccsssk.kkkk.',
  '.ksssccccbbbbbbbccssssk.......',
  '..ksssssssssssssssssk.........',
];
const COLB = { k: hex('#2a1810'), c: hex('#a0603a'), s: hex('#6e3c1e'), l: hex('#c88a54'), w: hex('#ecdcc4'), b: hex('#b8784a'), h: hex('#efe4c8'), m: hex('#e0a894'), n: hex('#3a1a14'), e: hex('#1a0e0a') };
// un buey de perfil (mira a la derecha); (x, y) = el suelo bajo el centro del cuerpo. o.anda, o.patalea (las patas
// colgando que se agitan), o.baja (px que se hunde todo), o.sorpresa (ojos como platos y boca abierta), o.sombra (0–1)
const buey = (x, y, t, o = {}) => {
  const X = Math.round(x), Y = Math.round(y) + Math.round(o.baja ?? 0), som = o.sombra ?? 0, f0 = o.fase ?? 0;
  const q = (i, j, c) => R.pset(X + i - 14, Y - 16 + j, som ? mz(c, K, som) : c);
  if (!o.baja) for (let i = -15; i <= 13; i++) for (const dy of [0, 1]) osc(X + i, Y + dy, Math.abs(i) > 11 ? 0.12 : 0.3);
  for (const [i, lejos, par] of [[4, 1, 0], [15, 1, 1], [6, 0, 1], [17, 0, 0]]) {
    const sube = o.anda && (Math.floor(t * 4 + f0) + par) % 2 ? 1 : 0, dx = o.patalea ? ((Math.floor(t * 8 + f0) + par) % 2 ? 1 : -1) : 0;
    const fin = 16 + (o.largas ?? 0);
    for (let j = 10; j <= fin; j++) { const ox = j > 13 ? dx : 0, pie = j === fin; q(i + ox, j - sube, pie ? COLB.n : lejos ? COLB.s : COLB.c); q(i + 1 + ox, j - sube, pie ? COLB.n : lejos ? mz(COLB.s, K, 0.3) : COLB.s); if (o.largas && j > 12) { q(i - 1 + ox, j, COLB.k); q(i + 2 + ox, j, COLB.k); } }
    q(i - 1, 12 - sube, COLB.k); q(i + 2, 12 - sube, COLB.k);
  }
  const sw = Math.round(Math.sin(t * 3 + f0) * 1.3);
  for (let j = 3; j <= 10; j++) q(j > 6 ? -1 + (j > 8 ? sw : 0) : 0, j, COLB.s);
  q(-1 + sw, 11, COLB.k); q(-2 + sw, 11, COLB.k); q(-1 + sw, 12, COLB.k); q(-2 + sw, 12, COLB.s);
  BUEY.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = COLB[f[i]]; if (c != null) q(i, j, c); } });
  if (o.sorpresa) { q(23, 3, COLB.w); q(24, 3, COLB.w); q(23, 4, COLB.w); q(24, 4, COLB.e); q(22, 2, COLB.k); q(23, 2, COLB.k); q(26, 9, hex('#7a2a2a')); q(27, 9, COLB.k); }
};
// el yugo de madera sobre los dos cuellos y la lanza del arado hacia atrás, hasta la reja y las dos manceras
const MAD = [hex('#7a5232'), hex('#5a3a22'), hex('#a8784a')];
const yugo = (X, Y) => { for (let j = -20; j <= -13; j++) { R.pset(X + 5, Y + j, MAD[1]); R.pset(X + 6, Y + j, MAD[0]); R.pset(X + 7, Y + j, MAD[2]); } R.rect(X + 4, Y - 21, X + 8, Y - 20, MAD[1]); R.pset(X + 4, Y - 12, K); R.pset(X + 8, Y - 12, K); };
const arado = (X, Y, t, o = {}) => {
  const hx = X - 34, hy = Y - 1;
  R.linea(X + 5, Y - 14, hx + 2, hy - 4, MAD[1]); R.linea(X + 5, Y - 15, hx + 2, hy - 5, MAD[2]);
  R.poligono([[hx - 6, hy + 1], [hx + 4, hy + 1], [hx - 2, hy - 5]], hex('#4a4a52')); R.linea(hx - 6, hy + 1, hx + 4, hy + 1, hex('#8a8a96')); R.linea(hx + 4, hy + 1, hx - 1, hy - 5, hex('#2a2a32'));
  R.linea(hx - 2, hy - 4, hx - 10, hy - 13, MAD[1]); R.linea(hx - 1, hy - 4, hx - 9, hy - 13, MAD[2]); R.linea(hx, hy - 3, hx - 12, hy - 11, MAD[0]);
  if (o.terrones) for (let k = 0; k < 4; k++) { const u = (t * 2.2 + k / 4) % 1; R.pset(Math.round(hx - 4 - u * 8), Math.round(hy - Math.sin(u * 3.1) * 5), u > 0.5 ? hex('#3a2418') : hex('#5a3a24')); }
};
const cuervo = (x, y, t, k, vuela) => { const X = Math.round(x), Y = Math.round(y), a = Math.sin(t * 14 + k) > 0;
  if (vuela) { R.pset(X, Y, K); R.pset(X + 1, Y, K); R.pset(X - 1, Y - (a ? 1 : -1), K); R.pset(X - 2, Y - (a ? 2 : -1), K); R.pset(X + 2, Y - (a ? 1 : -1), K); R.pset(X + 3, Y - (a ? 2 : -1), K); return; }
  const pica = Math.floor(t * 3 + k) % 3 === 0, salto = Math.floor(t * 5 + k) % 7 === 0 ? 1 : 0;
  R.rect(X - 2, Y - 3 - salto, X + 2, Y - 1 - salto, K); R.pset(X - 3, Y - 2 - salto, K); R.pset(X - 4, Y - 3 - salto, K); R.pset(X, Y - 3 - salto, hex('#4a4a6a'));
  if (pica) { R.pset(X + 3, Y - 1, K); R.pset(X + 4, Y, hex('#6a5a3a')); } else { R.rect(X + 2, Y - 5 - salto, X + 3, Y - 4 - salto, K); R.pset(X + 4, Y - 4 - salto, hex('#6a5a3a')); R.pset(X + 3, Y - 5 - salto, hex('#e8e8e8')); }
  R.pset(X - 1, Y, K); R.pset(X + 1, Y, K); };
'''

E['oi-bueyes'] = ('Los bueyes', '''// OI-BUEYES (frase 31), 1878, cartela «1878». Tres planos:
// 1. el campo arado de la isla: la pareja de bueyes tira del arado y la granjera lo guía; los cuervos picotean detrás; al
//    decir «not far from the pit» se paran y ella señala atrás, al castillete del pozo entre los robles; siguen, y bajo
//    las pezuñas se abren grietas («the ground»);
// 2. corte en «suddenly»: el campo en sección, con la cueva escondida bajo la tierra; en «gave way» el techo se hunde,
//    los bueyes se quedan con las patas colgando en el agujero, con cara de sorpresa (gag, sin daño); los terrones
//    caen al agua de la cueva, los cuervos salen volando; la granjera llega corriendo y se rasca la cabeza («?»);
// 3. corte en «Hunters»: en el granero, dos pizarras en sus caballetes: el buscador dibuja con tiza un pozo entibado y su
//    galería («tunnel shaft») y el geólogo, una cueva natural con estalactitas («natural cave»); se miran.''', AYUDA + BUEYES + r'''
const NOT = en('bueyes', .147), PIT = en('bueyes', .21), SUELO = en('bueyes', .283), P2 = en('bueyes', .319), CAE = en('bueyes', .36);
const LLEGA = en('bueyes', .42), RASCA = en('bueyes', .54), P3 = en('bueyes', .677), TUNEL = en('bueyes', .733), GEO = en('bueyes', .836), CUEVA = en('bueyes', .911);
// ── plano 1: el campo de 1878 ──
const castillete = (t) => { const [x, y] = [46, 84]; const C1 = hex('#5a3a22'), C2 = hex('#8a6038');
  R.linea(x - 7, y, x, y - 24, C1); R.linea(x + 7, y, x, y - 24, C1); R.linea(x - 6, y, x - 1, y - 22, C2); R.linea(x - 5, y - 8, x + 5, y - 8, C1); R.linea(x - 3, y - 16, x + 3, y - 16, C1); R.linea(x - 5, y - 8, x + 3, y - 16, C2);
  R.disco(x, y - 24, 2, K); R.pset(x, y - 24, hex('#c8c8d2')); R.linea(x, y - 22, x, y - 4, hex('#c8b890'));
  const ond = Math.floor(t * 6) % 2; R.rect(x + 1, y - 30, x + 1, y - 25, K); R.rect(x + 2, y - 30, x + 5 + ond, y - 28, hex('#c8283a')); R.pset(x + 6 + ond, y - 29 + ond, hex('#c8283a'));
  R.rect(x - 9, y - 1, x + 9, y + 1, hex('#7a5a3a')); };
const p1 = (t) => {
  T.labAgua(R, t, { encuadre: 'campo1878', hundido: 0.22 * tramo(t, SUELO, P2 + 0.2) });
  castillete(t);
  const para = t > NOT && t < SUELO - 0.6, mira = t > NOT + 0.1 && t < SUELO - 0.7;
  const X = Math.round(t < NOT ? lerp(82, 118, tramo(t, 0, NOT)) : lerp(118, 146, tramo(t, SUELO - 0.6, P2)));
  if (mira) { const u = (t - NOT) * 2; R.linea(X - 66, 128, 52, 70, hex('#f8f0d0'), 1); if (u > 0.4) R.anillo(46, 72, 6 + Math.round((t * 4) % 1 * 4), hex('#f8f0d0'), 1); }
  for (let k = 0; k < 3; k++) cuervo(X - 72 - k * 14 + Math.round(Math.sin(t * 1.3 + k) * 3), 156 + k * 6, t, k, false);
  const cruje = t > SUELO;
  arado(X, 150, t, { terrones: !para });
  buey(X + 8, 145, t, { anda: !para, fase: 1, sombra: 0.24, sorpresa: cruje });
  buey(X, 150, t, { anda: !para, sorpresa: cruje });
  yugo(X, 150);
  R.actor(EL.granjera, X - 59, 151, t, { dir: mira ? -1 : 1, anda: !para, dedo: mira, habla: mira && Math.sin(t * 9) > 0 });
  if (cruje) for (let k = 0; k < 6; k++) { const u = ((t - SUELO) * 1.5 + k / 6) % 1; R.pset(Math.round(X - 8 + k * 4 + u * 3), Math.round(150 - u * 6), hex('#b89a74')); }
};
// ── plano 2: el corte del campo con la cueva escondida ──
const GY = 84, OA = 147, OB = 177;
const techo = (x) => 106 + Math.pow((x - 160) / 76, 2) * 34 + Math.round(hh(x >> 2, 1, 5) * 3);
const fondo = (x) => 168 - Math.pow((x - 160) / 76, 2) * 24 - Math.round(hh(x >> 2, 2, 5) * 2);
const enCueva = (x, y) => Math.abs(x - 160) < 74 && y >= techo(x) && y <= fondo(x);
const TIERRA = [[hex('#4a3222'), hex('#3a261a'), hex('#6a4a32')], [hex('#a06a3e'), hex('#86562f'), hex('#c08a58')], [hex('#8a7a66'), hex('#6a5c4c'), hex('#b0a088')], [hex('#cfc8ba'), hex('#b0a898'), hex('#e6e0d4')]];
const capaDe = (x, y) => y < 99 + Math.round(Math.sin(x * 0.07) * 1.5 + hh(x >> 3, 1) * 2) ? 0 : y < 120 + Math.round(Math.sin(x * 0.05 + 1) * 2) ? 1 : y < 132 + Math.round(Math.sin(x * 0.09 + 2) * 1.5) ? 2 : 3;
let BA = null, BB = null;
const pintaCorte = (hueco) => {
  degr(0, 56, [hex('#4e86d4'), hex('#7cb0e6'), hex('#b4d4f0'), hex('#dceaf4')]);
  R.disco(236, 28, 12, hex('#f4ecc0')); R.disco(236, 28, 9, hex('#fff6d0')); for (let a = 0; a < 6.28; a += 0.26) { const r = 13 + (a * 7 % 3); R.pset(Math.round(236 + Math.cos(a) * r), Math.round(28 + Math.sin(a) * r), hex('#f4ecc0')); }
  cirros(18, 7, hex('#e8f0f8'));
  // la costa de enfrente y el mar entre el bosque y la granja
  for (let x = 0; x < 320; x++) { const h = 50 + Math.round(Math.sin(x * 0.03) * 2 + hh(x >> 2, 9) * 2); for (let y = h; y < 54; y++) R.pset(x, y, tr(x, y, 0.5) ? hex('#7a94a8') : hex('#6a8698')); }
  degr(54, 61, [hex('#4a7aa4'), hex('#3a6690')]); for (let k = 0; k < 40; k++) R.pset((k * 53) % 320, 55 + (k * 7) % 6, hex('#a8cce4'));
  // el campo que se aleja por detrás del corte, con sus surcos hacia el fondo
  for (let y = 60; y < GY; y++) for (let x = 0; x < 320; x++) { const s = Math.round((x - 160) * (GY - 40) / (y - 40)); const surco = ((s % 9) + 9) % 9 < 2; R.pset(x, y, surco ? hex('#5a3a24') : tres([hex('#7a5434'), hex('#6a4628'), hex('#8e6640')], x, y, 4)); }
  for (let y = 60; y < GY; y++) for (let x = 250; x < 320; x++) if (x > 250 + (y - 60) * 1.2) R.pset(x, y, tres([hex('#b8a060'), hex('#9a844a'), hex('#d4c084')], x, y, 6));
  // la cerca de troncos en zigzag
  for (let x = 92; x < 320; x += 10) { R.linea(x, 62, x + 10, 58, hex('#6a4a2a')); R.linea(x, 58, x + 10, 62, hex('#8a6a44')); R.rect(x, 56, x, 63, hex('#4a3018')); }
  // el bosque a la izquierda: robles de tres tonos y abetos
  for (let k = 0; k < 16; k++) { const x = k * 7 - 2 + Math.round(hh(k, 1) * 4), y = 50 + Math.round(hh(k, 2) * 8), r = 6 + Math.round(hh(k, 3) * 4);
    R.disco(x, y + 2, r, hex('#2e5226')); R.disco(x - 1, y, r - 1, hex('#447a34')); R.disco(x - 2, y - 2, r - 3, hex('#6a9a4a')); for (let j = 0; j < 6; j++) R.pset(x - 3 + Math.round(hh(k, j) * 6), y - 3 + Math.round(hh(j, k) * 6), hex('#88b860')); }
  for (let y = 56; y < 64; y++) for (let x = 0; x < 100; x++) if (y > 58 + (x > 90 ? (x - 90) : 0)) R.pset(x, y, tres([hex('#36602c'), hex('#2a4c22'), hex('#4a7a3a')], x, y, 2));
  // la granja: la casa de tablas con su chimenea y el granero rojo
  for (let y = 50; y < 66; y++) for (let x = 226; x < 254; x++) R.pset(x, y, y % 3 === 0 ? hex('#c8bca0') : hex('#e8dcc0'));
  R.poligono([[222, 50], [240, 38], [258, 50]], hex('#4a4a5a')); R.linea(222, 50, 240, 38, hex('#6a6a7a')); R.rect(246, 36, 249, 44, hex('#8a3a2a'));
  for (const wx of [230, 244]) { R.rect(wx, 54, wx + 5, 59, K); R.rect(wx + 1, 55, wx + 4, 58, hex('#9ac4dc')); R.pset(wx + 1, 55, BLANCO); R.rect(wx - 1, 54, wx - 1, 59, hex('#c8283a')); }
  R.rect(237, 58, 241, 65, hex('#2e5a3a')); R.pset(240, 61, hex('#e8b830'));
  for (let y = 48; y < 66; y++) for (let x = 262; x < 300; x++) R.pset(x, y, x % 4 === 0 ? hex('#8a2a22') : hex('#b23a2c'));
  R.poligono([[258, 48], [266, 41], [296, 41], [304, 48]], hex('#3a3a46')); R.rect(274, 54, 288, 65, hex('#f2eee2')); R.linea(275, 55, 287, 64, hex('#b23a2c')); R.linea(287, 55, 275, 64, hex('#b23a2c')); R.rect(276, 44, 286, 47, K); R.rect(277, 45, 285, 46, hex('#e8c87a'));
  // el corte: la hierba y la tierra en capas, con piedras, raíces, conchas y grietas
  for (let y = GY; y < 180; y++) for (let x = 0; x < 320; x++) { const c = capaDe(x, y); R.pset(x, y, tres(TIERRA[c], x, y, c + 11)); }
  for (let y = GY - 2; y < GY + 3; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < GY ? (hh(x, y, 4) > 0.5 ? hex('#6a9a3a') : hex('#4a7a2a')) : y < GY + 1 ? hex('#3a5a24') : hex('#2a1a12'));
  for (let x = 0; x < 320; x += 2) if (hh(x, 7) > 0.4) { R.pset(x, GY - 3, hex('#8aba4a')); if (hh(x, 8) > 0.6) R.pset(x, GY - 4, hex('#a8c860')); }
  for (let k = 0; k < 26; k++) { const x = Math.round(hh(k, 21) * 320), y = GY + 3; let px = x; for (let j = 0; j < 4 + (k % 6); j++) { px += Math.round(hh(k, j) * 2 - 1); R.pset(px, y + j, hex('#7a5a3a')); } }
  for (let k = 0; k < 70; k++) { const x = Math.round(hh(k, 31) * 320), y = 99 + Math.round(hh(k, 32) * 78), r = 1 + Math.round(hh(k, 33) * 2); if (enCueva(x, y) || enCueva(x, y + r) || enCueva(x, y - r)) continue; const c = capaDe(x, y);
    if (c === 3) { R.linea(x, y, x + 4 + r * 2, y + Math.round(hh(k, 34) * 4 - 2), TIERRA[3][1]); continue; }
    R.disco(x, y, r, hex('#5e5a62')); R.pset(x - 1, y - 1, hex('#9a96a0')); if (r > 1) R.pset(x, y - r + 1, hex('#b8b4bc')); }
  for (let k = 0; k < 6; k++) { const y = 136 + k * 7; for (let x = 0; x < 320; x++) if (!enCueva(x, y) && hh(x >> 2, k, 40) > 0.35) R.pset(x, y + Math.round(Math.sin(x * 0.04 + k) * 1), TIERRA[3][1]); }
  // la cueva: penumbra, techo con estalactitas, suelo con estalagmitas y el agua del fondo
  for (let x = 84; x < 237; x++) { const a = techo(x), b = fondo(x); if (a >= b) continue;
    for (let y = a; y <= b; y++) { const u = (y - a) / Math.max(1, b - a); let c = tr(x, y, u) ? hex('#363244') : hex('#28243a'); if (y >= 154) c = tr(x, y, 0.4) ? hex('#2c4e6a') : hex('#223e58'); if (y === 154) c = hex('#5a8aac'); R.pset(x, y, c); }
    for (let y = a + 1; y < Math.min(b, a + 7); y++) if (tr(x, y, 0.85 - (y - a) * 0.12)) R.pset(x, y, y - a < 3 ? hex('#6a6278') : hex('#4e4860'));
    if (hh(x >> 1, 3, 78) > 0.7) for (let y = a + 2; y < Math.min(b, 154, a + 6 + Math.round(hh(x, 4) * 16)); y++) if (y % 2) R.pset(x, y, hex('#5e5870'));
    for (let y = Math.max(a, 154 - 7); y < 154; y++) if (y > b - 6 && tr(x, y, 0.5)) R.pset(x, y, hex('#5a5468'));
    for (let y = a + 6; y < Math.min(b, 154); y++) if (hh(x, y, 77) > 0.985) { R.pset(x, y, hex('#5a5470')); R.pset(x + 1, y, hex('#46405a')); }
    R.pset(x, a, K); R.pset(x, a - 1, mz(R.pget(x, a - 1), K, 0.5)); R.pset(x, b, K); if (b < 154) { R.pset(x, b - 1, hex('#8a8494')); R.pset(x, b - 2, hex('#5e586c')); } }
  for (const cx of [106, 216]) { const a = techo(cx), b = Math.min(154, fondo(cx)); for (let y = a; y < b; y++) { const w = 1 + Math.round(Math.abs(y - (a + b) / 2) / 5); for (let i = -w; i <= w; i++) R.pset(cx + i, y, i < 0 ? hex('#d0c8b8') : i === w ? hex('#7a7468') : hex('#a89e8e')); } }
  for (let k = 0; k < 12; k++) { const x = 86 + k * 12 + Math.round(hh(k, 51) * 6), a = techo(x), L = 3 + Math.round(hh(k, 52) * 6); for (let j = 0; j < L; j++) { const w = Math.max(0, Math.round((L - j) / 3)); for (let i = -w; i <= w; i++) R.pset(x + i, a + j, i < 0 ? hex('#c8c0b0') : hex('#9a9284')); } }
  for (const x of [88, 96, 228, 236, 102, 220]) { const b = fondo(x); if (b >= 154) continue; const L = 3 + (x % 4); for (let j = 0; j < L; j++) { const w = Math.round((L - j) / 3); for (let i = -w; i <= w; i++) R.pset(x + i, b - j, i < 0 ? hex('#c8c0b0') : hex('#9a9284')); } }
  if (!hueco) { for (const [x0, d] of [[150, 1], [168, -1], [158, 1]]) { let x = x0; for (let y = GY + 1; y < 100; y++) { x += Math.round(hh(x0, y) * 2 - 1) * d; R.pset(x, y, K); } } return; }
  // el agujero abierto: el hueco hasta la cueva, con la hierba rota, raíces que cuelgan y la luz que entra
  for (let y = GY - 2; y < 112; y++) { const ia = OA + Math.round(hh(y, 61) * 3) + (y < GY + 2 ? -2 : 0), ib = OB - Math.round(hh(y, 62) * 3) + (y < GY + 2 ? 2 : 0);
    for (let x = ia; x <= ib; x++) { if (y > techo(x) + 1) continue; R.pset(x, y, tr(x, y, (y - GY) / 30) ? hex('#363244') : hex('#2a2638')); } R.pset(ia - 1, y, K); R.pset(ib + 1, y, K); }
  for (const x of [OA + 1, OA + 4, OB - 2, OB - 5]) for (let j = 0; j < 5 + (x % 4); j++) R.pset(x + (j % 3 === 2 ? 1 : 0), GY + 2 + j, hex('#8a6a44'));
  for (let y = GY; y < 154; y++) { const w = (y - GY) * 0.25; for (let x = Math.round(OA + 4 - w); x <= Math.round(OB - 4 + w); x++) if (enCueva(x, y) || (y < 112 && x > OA + 2 && x < OB - 2)) { if (tr(x, y, 0.3)) R.pset(x, y, mz(R.pget(x, y), hex('#fff0c0'), 0.22)); } }
  for (let k = 0; k < 9; k++) { const x = OA + 2 + k * 3 + Math.round(hh(k, 71) * 2), y = 152 - Math.round(hh(k, 72) * 3); R.disco(x, y, 1 + (k % 2), hex('#5a3e2a')); R.pset(x, y - 1, hex('#8a6a44')); }
};
const p2 = (t) => {
  if (!BA) { const prev = R.usar(BA = R.nuevo()); pintaCorte(false); R.usar(BB = R.nuevo()); pintaCorte(true); R.usar(prev); }
  const roto = t >= CAE; R.copiar(roto ? BB : BA);
  nubes(t, [20, 34, 26]); gaviotas(t, 34, 2); humo(248, 34, t);
  for (let k = 0; k < 14; k++) { const x = (k * 23 + Math.floor(t * 3) * 7) % 320; R.pset(x, 56 + (k % 4), hex('#d4ecf8')); }
  // gotas que caen de las estalactitas y ondas en el agua de la cueva
  for (let k = 0; k < 4; k++) { const x = [98, 136, 192, 222][k], a = techo(x), u = (t * 0.7 + k * 0.29) % 1; if (u < 0.6) R.pset(x, Math.round(a + 4 + u / 0.6 * (154 - a - 4)), hex('#a8d0ec')); else { const r = Math.round((u - 0.6) * 20); R.pset(x - r, 155, hex('#8abcdc')); R.pset(x + r, 155, hex('#8abcdc')); } }
  for (let x = 90; x < 232; x += 6) if (enCueva(x, 155)) R.pset(x + Math.floor(t * 4) % 6, 154, hex('#8abcdc'));
  if (roto) for (let k = 0; k < 10; k++) { const x = 150 + k * 2 + Math.round(Math.sin(t * 3 + k) * 2), y = 156 + (k % 4) * 2; if (enCueva(x, y)) { R.pset(x, y, hex('#f8f0c0')); R.pset(x + 1, y, hex('#c8d8c0')); } }
  for (let k = 0; k < 7; k++) { const x = 96 + k * 21, y = techo(x) + 3 + (k % 3) * 4; if (Math.sin(t * 2.3 + k * 1.9) > 0.85 && enCueva(x, y)) { R.pset(x, y, BLANCO); R.pset(x - 1, y, hex('#a8c8e8')); R.pset(x + 1, y, hex('#a8c8e8')); R.pset(x, y - 1, hex('#a8c8e8')); R.pset(x, y + 1, hex('#a8c8e8')); } }
  // dos murciélagos colgados del techo; uno sale volando por el agujero cuando se hunde
  for (const [bx, k] of [[112, 0], [206, 1]]) { const a = techo(bx) + 1, vuela = roto && k === 1, u = vuela ? (t - CAE) / 1.6 : 0; if (u >= 1) continue;
    const x = Math.round(vuela ? lerp(bx, 166, Math.min(1, u * 1.6)) + Math.sin(t * 20) * 2 : bx), y = Math.round(vuela ? lerp(a + 3, GY - 30, u) : a + 2), al = vuela && Math.sin(t * 30) > 0;
    R.rect(x - 1, y - 2, x + 1, y + 2, hex('#14101c')); R.pset(x - 1, y + 3, hex('#14101c')); R.pset(x + 1, y + 3, hex('#14101c')); R.pset(x, y, hex('#e83a3a'));
    if (vuela) { R.linea(x - 1, y, x - 5, y - (al ? 3 : -1), hex('#14101c')); R.linea(x + 1, y, x + 5, y - (al ? 3 : -1), hex('#14101c')); } else { R.pset(x, y - 3, K); R.rect(x - 2, y - 1, x - 2, y + 2, hex('#241c2c')); R.rect(x + 2, y - 1, x + 2, y + 2, hex('#241c2c')); } }
  // una lombriz en la tierra
  { const wx = 60 + Math.round(Math.sin(t * 0.6) * 6); for (let i = 0; i < 6; i++) R.pset(wx + i, 92 + Math.round(Math.sin(t * 6 + i) * 1), hex('#d88a8a')); }
  // los terrones que caen al agua y el polvo
  if (roto) { const u = (t - CAE) / 0.9; if (u < 1) for (let k = 0; k < 10; k++) { const v = Math.min(1, u * (1 + (k % 3) * 0.3)), y = Math.round(GY + v * v * (152 - GY)), x = OA + 3 + k * 3; if (v < 1) R.rect(x, y, x + 1, y + 1, k % 2 ? hex('#5a3e2a') : hex('#3a261a')); }
    const w = (t - CAE) / 1.4; if (w < 1) for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI, r = 6 + w * 24, x = Math.round(162 + Math.cos(a) * r * 1.3), y = Math.round(GY - Math.sin(a) * r * 0.5); if (tr(x, y, 1 - w)) R.disco(x, y, 2, hex('#c8b090')); }
    const s = (t - CAE - 0.5) / 0.8; if (s > 0 && s < 1) for (let k = -3; k <= 3; k++) R.pset(162 + k * 3, Math.round(152 - Math.sin((k + 3) / 6 * Math.PI) * 6 * (1 - s) - s * 2), hex('#a8d0ec')); }
  // los cuervos salen volando del campo
  if (roto) for (let k = 0; k < 3; k++) { const u = (t - CAE) * (0.9 + k * 0.2); cuervo(210 + k * 12 - u * 40, 74 - k * 3 - u * 22, t, k, true); }
  else for (let k = 0; k < 3; k++) cuervo(206 + k * 13, 78 + (k % 2) * 3, t, k, false);
  // los bueyes y el arado
  const X = Math.round(lerp(148, 158, tramo(t, P2, CAE))), baja = Math.round(9 * tramo(t, CAE, CAE + 0.25)), sorp = t > CAE + 0.15, pat = roto && t > CAE + 0.35;
  arado(X, GY, t, { terrones: !roto });
  buey(X + 8, GY - 3, t, { anda: !roto, fase: 1, sombra: 0.24, baja, patalea: pat, sorpresa: sorp, largas: roto ? 3 : 0 });
  buey(X, GY, t, { anda: !roto, baja, patalea: pat, sorpresa: sorp, largas: roto ? 4 : 0 });
  yugo(X, GY + baja);
  if (sorp && t < RASCA && Math.floor(t * 5) % 4 !== 3) { R.icono('!', X - 4, GY - 40, hex('#e83a2a'), K, 2); R.icono('!', X + 10, GY - 44, hex('#e83a2a'), K, 2); }
  // la granjera llega corriendo y se rasca la cabeza
  if (t > LLEGA - 1.1) { const gx = Math.round(lerp(-16, 92, tramo(t, LLEGA - 1.1, LLEGA))), r = t > RASCA;
    R.actor(EL.granjera, gx, GY + 1, t, { dir: 1, anda: t < LLEGA, sorpresa: t > LLEGA && !r, dedo: r && Math.floor(t * 7) % 2 === 0, triste: r });
    if (r) R.icono('?', gx + 5, GY - 40 - (Math.floor(t * 3) % 2), hex('#f8f0d0'), K, 2); }
};
// ── plano 3: el granero, con las dos pizarras ──
const LA = [26, 50, 116, 130], LB = [198, 50, 288, 130];
const pizarra = (x0, y0, x1, y1) => { const M = [hex('#a8743c'), hex('#7a4e26'), hex('#c8945a')];
  R.linea(x0 + 10, y1, x0 + 2, 168, M[1]); R.linea(x0 + 11, y1, x0 + 3, 168, M[0]); R.linea(x1 - 10, y1, x1 - 2, 168, M[1]); R.linea(x1 - 11, y1, x1 - 3, 168, M[0]); R.linea((x0 + x1) >> 1, y1, ((x0 + x1) >> 1) + 4, 166, M[1]);
  R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, M[1]); R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, M[0]); R.rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, M[2]);
  for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) R.pset(x, y, tr(x, y, hh(x >> 3, y >> 2, 9) * 0.35) ? hex('#3a4a44') : hex('#2e3c38'));
  for (let k = 0; k < 5; k++) { const yy = y0 + 8 + k * 15; for (let x = x0 + 4; x < x1 - 4; x++) if (hh(x >> 1, k, 12) > 0.82) R.pset(x, yy + Math.round(hh(x, k) * 3), hex('#4a5c56')); }
  R.rect(x0 - 3, y1 + 2, x1 + 3, y1 + 4, M[1]); R.rect(x0 - 3, y1 + 2, x1 + 3, y1 + 2, M[2]);
  R.rect(x0 + 8, y1 + 1, x0 + 13, y1 + 1, hex('#f2eee2')); R.rect(x1 - 18, y1 - 1, x1 - 8, y1 + 1, hex('#6a4a2a')); R.rect(x1 - 18, y1 - 1, x1 - 8, y1 - 1, hex('#c8c0b0')); };
let BG = null;
const pintaGranero = () => {
  // la pared de tablas verticales con vetas, nudos, clavos y las rendijas por donde entra la luz
  for (let x = 0; x < 320; x++) { const k = Math.floor(x / 13), i = x % 13, base = [hex('#7a5232'), hex('#6e4a2c'), hex('#84593a')][k % 3];
    for (let y = 0; y < 140; y++) { let c = base; if (i === 0) c = hex('#2a1a10'); else if (i === 1) c = mz(base, BLANCO, 0.12); else if (i === 12) c = mz(base, K, 0.3); else if (Math.sin(y * 0.08 + k * 3 + i * 0.7) > 0.93 || hh(x, y >> 3, k) > 0.97) c = mz(base, K, 0.25); R.pset(x, y, c); }
    if (i === 6) for (const y of [34, 128]) { R.pset(x, y, hex('#2a2a32')); R.pset(x, y - 1, hex('#8a8a96')); }
    if (hh(k, 3) > 0.6 && i === 7) { const y = 60 + Math.round(hh(k, 4) * 50); R.disco(x, y, 2, mz(base, K, 0.35)); R.pset(x, y, mz(base, K, 0.6)); } }
  // la viga y los tornapuntas
  R.rect(0, 16, 319, 22, hex('#5a3a22')); R.rect(0, 16, 319, 16, hex('#8a6038')); R.rect(0, 22, 319, 23, hex('#2a1a10'));
  for (const x of [0, 300]) { R.linea(x + (x ? 19 : 0), 23, x + (x ? 0 : 19), 42, hex('#5a3a22')); R.linea(x + (x ? 19 : 0), 24, x + (x ? 0 : 19), 43, hex('#2a1a10')); }
  // el portón abierto del fondo: el campo, el cielo y el mar
  const [dx0, dy0, dx1, dy1] = [134, 40, 182, 140];
  degr(dy0, dy0 + 40, [hex('#6a9ad8'), hex('#a8ccec'), hex('#dceaf4')], dx0, dx1);
  for (let y = dy0 + 38; y < dy0 + 44; y++) for (let x = dx0; x <= dx1; x++) R.pset(x, y, tr(x, y, 0.5) ? hex('#4a7aa4') : hex('#3a6690'));
  for (let y = dy0 + 44; y < dy1; y++) for (let x = dx0; x <= dx1; x++) { const s = Math.round((x - 158) * 60 / Math.max(1, y - dy0 - 40)); R.pset(x, y, (((s % 7) + 7) % 7) < 2 ? hex('#5a3a24') : tres([hex('#7a5434'), hex('#6a4628'), hex('#8e6640')], x, y, 4)); }
  for (let k = 0; k < 4; k++) { const x = dx0 + 4 + k * 4; R.disco(x, dy0 + 40, 4, hex('#36602c')); R.disco(x - 1, dy0 + 39, 3, hex('#4a7a3a')); }
  R.rect(dx0 - 4, dy0 - 4, dx1 + 4, dy0 - 1, hex('#4a3018')); R.rect(dx0 - 4, dy0 - 4, dx0 - 1, dy1, hex('#4a3018')); R.rect(dx1 + 1, dy0 - 4, dx1 + 4, dy1, hex('#4a3018')); R.rect(dx0 - 4, dy0 - 4, dx1 + 4, dy0 - 4, hex('#7a5232'));
  // el suelo de tierra con paja
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tres([hex('#8a6a48'), hex('#76583a'), hex('#9e7c56')], x, y, 14));
  R.rect(0, 140, 319, 141, hex('#4a3018'));
  for (let k = 0; k < 120; k++) { const x = Math.round(hh(k, 81) * 318), y = 143 + Math.round(hh(k, 82) * 35), d = hh(k, 83) > 0.5 ? 1 : -1; R.linea(x, y, x + 3 * d, y + 1, hh(k, 84) > 0.5 ? hex('#e8c86a') : hex('#c8a04a')); }
  // las balas de heno, la horca, la herradura, el yugo de repuesto y la estantería con tarros
  for (const [x, y] of [[0, 114], [0, 92], [14, 114]]) { R.rect(x, y, x + 22, y + 21, hex('#c8a04a')); for (let j = 0; j < 21; j += 2) for (let i = 0; i < 22; i++) if (hh(x + i, y + j, 2) > 0.5) R.pset(x + i, y + j, hex('#e8c86a')); R.rect(x + 6, y, x + 6, y + 21, hex('#6a4a2a')); R.rect(x + 16, y, x + 16, y + 21, hex('#6a4a2a')); R.rect(x, y + 21, x + 22, y + 22, hex('#8a6a2a')); }
  R.linea(306, 66, 296, 150, hex('#8a6038')); R.linea(307, 66, 297, 150, hex('#5a3a22')); for (const d of [-3, 0, 3]) R.linea(306 + d, 52, 306, 66, hex('#8a8a96'));
  R.anillo(306, 92, 4, hex('#5e5a62')); R.rect(302, 94, 310, 96, hex('#9c8a6e'));
  R.rect(40, 36, 110, 38, hex('#5a3a22')); R.rect(40, 36, 110, 36, hex('#8a6038'));
  for (let k = 0; k < 7; k++) { const x = 44 + k * 9, c = [hex('#c8283a'), hex('#e8b830'), hex('#4a7aa4'), hex('#6a9a4a'), hex('#e8dcc0'), hex('#8a5a32'), hex('#c8a040')][k]; R.rect(x, 28, x + 5, 35, K); R.rect(x + 1, 29, x + 4, 35, c); R.pset(x + 1, 29, BLANCO); R.rect(x + 1, 27, x + 4, 28, hex('#5a5a62')); }
  R.rect(212, 30, 272, 34, hex('#6a4a2a')); R.rect(214, 34, 216, 40, hex('#5a3a22')); R.rect(268, 34, 270, 40, hex('#5a3a22')); R.rect(212, 30, 272, 30, hex('#a8784a'));
  pizarra(...LA); pizarra(...LB);
};
// lo que dibuja cada uno: el pozo entibado con su galería y la cueva natural
const SEG_T = [[32, 70, 110, 70], [64, 70, 64, 120], [76, 70, 76, 112], [64, 80, 76, 80], [64, 90, 76, 90], [64, 100, 76, 100], [64, 110, 76, 110], [64, 120, 108, 120], [76, 112, 108, 112], [86, 112, 86, 120], [96, 112, 96, 120], [106, 112, 106, 120]];
const CUE = []; for (let k = 0; k <= 24; k++) { const a = k / 24 * Math.PI * 2, r = 1 + Math.sin(a * 3) * 0.12 + Math.cos(a * 5) * 0.08; CUE.push([Math.round(243 + Math.cos(a) * 30 * r), Math.round(106 + Math.sin(a) * 15 * r)]); }
const SEG_C = [[204, 70, 282, 70], [238, 70, 236, 78], [236, 78, 240, 84], [240, 84, 238, 91]]; for (let k = 0; k < 24; k++) SEG_C.push([...CUE[k], ...CUE[k + 1]]);
for (const x of [226, 234, 246, 254]) SEG_C.push([x, 93 + Math.round(Math.abs(x - 243) * 0.1), x + 1, 98]);
SEG_C.push([222, 116, 230, 115], [232, 117, 240, 116], [244, 117, 252, 116], [254, 116, 262, 115]);
const gallina = (x, y, t) => { const X = Math.round(x), pica = Math.floor(t * 2.5) % 3 === 0, d = Math.sin(t * 0.5) > 0 ? 1 : -1, q = (i, j, c) => R.pset(X + i * d, y + j, c);
  for (let i = -3; i <= 2; i++) for (let j = -5; j <= -2; j++) q(i, j, j === -5 ? hex('#ffffff') : i === -3 ? hex('#c8c0b0') : hex('#f2eee2')); q(-4, -5, hex('#c8c0b0')); q(-4, -6, hex('#c8c0b0'));
  const hy = pica ? -2 : -7; q(3, hy, hex('#f2eee2')); q(3, hy + 1, hex('#f2eee2')); q(4, hy, K); q(5, hy + 1, hex('#e8a030')); q(3, hy - 1, hex('#d8283a')); q(4, hy + 2, hex('#d8283a'));
  q(-1, -1, hex('#e8a030')); q(1, -1, hex('#e8a030')); q(-1, 0, hex('#e8a030')); q(1, 0, hex('#e8a030')); };
const p3 = (t) => {
  if (!BG) { const prev = R.usar(BG = R.nuevo()); pintaGranero(); R.usar(prev); }
  R.copiar(BG);
  // por el portón: nubes, gaviotas y los bueyes que ya salen del hoyo tirados de una cuerda
  R.recorte([134, 40, 182, 139]); for (let k = 0; k < 2; k++) R.nube(Math.round(((t * 3 + k * 40) % 90) + 120), 52 + k * 8, 12); R.gaviota(Math.round(140 + ((t * 7) % 40)), 62, t, 1);
  { const bx = 166, by = 108; for (let i = -6; i <= 6; i++) R.pset(bx + i, by - 3, hex('#6e3c1e')); R.rect(bx - 6, by - 6, bx + 4, by - 3, hex('#a0603a')); R.rect(bx + 4, by - 8, bx + 7, by - 5, hex('#a0603a')); R.pset(bx + 6, by - 9, hex('#efe4c8')); for (const lx of [-5, -2, 1, 3]) R.rect(bx + lx, by - 2, bx + lx, by + (Math.floor(t * 4 + lx) % 2), hex('#6e3c1e'));
    const tira = Math.floor(t * 2) % 2; R.linea(bx + 7, by - 6, bx + 14 + tira, by - 8, hex('#c8b890')); R.rect(bx + 15 + tira, by - 13, bx + 17 + tira, by - 2, hex('#8a5a32')); R.rect(bx + 15 + tira, by - 16, bx + 17 + tira, by - 14, hex('#f2c8a0')); }
  R.recorte(null);
  // las rendijas de luz, con polvo que flota
  for (const x of [130, 182, 195]) for (let y = 24; y < 140; y++) if ((y + Math.floor(t * 8)) % 9 < 6) R.pset(x, y, hex('#f8e0a0'));
  for (let k = 0; k < 18; k++) { const u = (t * 0.08 + k * 0.137) % 1, x = Math.round(140 + Math.sin(t * 0.7 + k) * 20 + k), y = Math.round(140 - u * 100); if (tr(x, y, 0.5)) R.pset(x, y, hex('#f8e8b8')); }
  // el farol que se mece colgado de la viga
  { const a = Math.sin(t * 1.4) * 0.12, fx = Math.round(176 + Math.sin(a) * 14), fy = 38; R.linea(176, 23, fx, fy - 6, K); const fl = 0.85 + Math.sin(t * 17) * 0.08 + Math.sin(t * 7.3) * 0.07;
    for (let j = -14; j <= 14; j++) for (let i = -18; i <= 18; i++) { const d = Math.hypot(i, j * 1.2); if (d < 18 * fl && tr(fx + i, fy + j, 0.45 * (1 - d / 18))) osc(fx + i, fy + j, 0.25, hex('#f8d070')); }
    R.rect(fx - 3, fy - 6, fx + 3, fy - 5, K); R.rect(fx - 3, fy - 4, fx + 3, fy + 4, K); R.rect(fx - 2, fy - 3, fx + 2, fy + 3, hex('#f8e0a0')); R.rect(fx - 1, fy - 1 - (Math.sin(t * 19) > 0 ? 1 : 0), fx + 1, fy + 2, hex('#e8783a')); R.pset(fx, fy, hex('#fff8d0')); R.rect(fx - 4, fy + 4, fx + 4, fy + 5, hex('#3a3a46')); }
  // los dibujos de tiza
  const uT = tramo(t, P3 + 0.25, TUNEL + 0.55), uC = tramo(t, GEO + 0.2, CUEVA + 0.45), TZ = hex('#e8ecdf');
  const pT = trazo(SEG_T, uT, TZ, true); if (uT >= 1) R.icono('X', 99, 113, hex('#f8e070'), hex('#3a4a44'));
  for (let k = 0; k < 4; k++) if (uT > 0.45 + k * 0.1) R.numero(String((k + 1) * 10), 52, 84 + k * 10, { fina: true, color: hex('#c8d0c0') });
  const pC = trazo(SEG_C, uC, TZ, true);
  for (const p of [pT, pC]) if (p) for (let k = 0; k < 4; k++) R.pset(Math.round(p[0] + hh(k, Math.floor(t * 20)) * 6 - 3), Math.round(p[1] + hh(Math.floor(t * 20), k) * 6 - 2), hex('#f2f4ea'));
  // el buscador y el geólogo: dibujan, se vuelven y se miran
  const hT = t > P3 + 0.1 && t < TUNEL + 0.6, hC = t > GEO + 0.1 && t < CUEVA + 0.5;
  for (const cx of [112, 178]) { R.rect(cx, 146, cx + 22, 168, hex('#4a3018')); R.rect(cx + 1, 147, cx + 21, 167, hex('#9a6a3a')); for (const y of [153, 160]) R.rect(cx + 1, y, cx + 21, y, hex('#6a4626')); R.linea(cx + 1, 147, cx + 21, 167, hex('#7a5230')); R.rect(cx + 1, 147, cx + 21, 147, hex('#c8945a')); for (let i = 0; i < 26; i++) osc(cx - 2 + i, 169, 0.35); }
  R.actor(EL.cavador, 116, 146, t, { dir: t > CUEVA + 0.2 ? 1 : -1, dedo: hT, sonrisa: t > TUNEL + 0.6 && t < GEO, sorpresa: t > CUEVA + 0.2, habla: t > TUNEL + 0.7 && t < GEO && Math.sin(t * 9) > 0 });
  R.actor(EL.geologo, 182, 146, t, { dir: t < GEO - 0.2 || t > CUEVA + 0.5 ? -1 : 1, dedo: hC, sonrisa: t > CUEVA + 0.5, habla: t > CUEVA + 0.6 && Math.sin(t * 8) > 0 });
  if (t > CUEVA + 0.6) R.icono('?', 152, 106 - (Math.floor(t * 3) % 2), hex('#f8f0d0'), K, 2);
  gallina(lerp(250, 214, (Math.sin(t * 0.5) + 1) / 2), 174, t);
};
const efectos = [[SUELO + 0.1, 'golpecito'], [CAE, 'avalancha'], [CAE + 0.55, 'chof'], [RASCA + 0.2, 'pop'], [P3 + 0.3, 'lapiz'], [GEO + 0.25, 'lapiz'], [CUEVA + 0.6, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { cartela: '1878', efectos, año: 1878 });
''')

E['oi-tinte'] = ('El tinte rojo', '''// OI-TINTE (frases 32–33), 1898, cartela «1898». Cuatro planos:
// 1. la boca del pozo en 1898, con la caldera humeando: un buscador trae el cubo de tinte rojo y lo vuelca en el pozo
//    en «poured red dye» (golpe de música en la marca); el agua se tiñe de rojo; el capataz lo señala;
// 2. corte en «And»: el mapa de la isla: el pozo late; en «Smith's Cove» cae la chincheta en la ensenada; en «expected
//    the tunnel» se dibuja la línea de puntos del túnel hasta la ensenada… y allí no aparece nada: «?»;
// 3. corte en «but»: la orilla sur: la mancha roja brota entre las rocas («south shore»); los dos buscadores llegan y se
//    quedan de piedra; el pez asoma la cabeza teñido de rojo (gag); en «a second secret tunnel» el capataz traza en el
//    aire el segundo túnel, de puntos, desde tierra hasta la grieta;
// 4. corte en «Scientists»: el laboratorio de hoy: en el tanque, el agua del mar se cuela sola por las grietas de la
//    roca y sube por el pozo hasta el nivel del mar; la geóloga lo señala.''', AYUDA + r'''
const ECHA = en('tinte', .195), DYE = en('tinte', .247), POZOW = en('tinte', .312), P2 = en('tinte', .388), COVE = en('tinte', .504);
const ESPERA = en('tinte', .638), TUN = en('tinte', .756), P3 = en('tinte', .842), SUR = en('tinte', .924);
const CULPA = en('tunel', .058), SECR = en('tunel', .259), P4 = en('tunel', .409), AGUA = en('tunel', .562), ROCA = en('tunel', .917);
const ROJO = hex('#c8283a'), ROJOL = hex('#e8506a');
// ── plano 1: la boca del pozo ──
const cubo = (x, y, inclina) => { const X = Math.round(x), Y = Math.round(y);
  if (!inclina) { R.rect(X - 3, Y, X + 3, Y + 6, K); R.rect(X - 2, Y + 1, X + 2, Y + 5, hex('#8a8a96')); R.rect(X - 2, Y + 1, X + 2, Y + 1, ROJO); R.pset(X - 2, Y + 3, hex('#c8d2dc')); R.linea(X - 3, Y, X, Y - 4, K); R.linea(X + 3, Y, X, Y - 4, K); return; }
  R.poligono([[X - 4, Y - 2], [X + 2, Y - 6], [X + 6, Y], [X, Y + 4]], K); R.poligono([[X - 3, Y - 2], [X + 2, Y - 5], [X + 5, Y], [X, Y + 3]], hex('#8a8a96')); R.linea(X + 2, Y - 5, X + 5, Y, ROJO); R.linea(X + 3, Y - 5, X + 6, Y - 1, ROJOL); };
const p1 = (t) => {
  T.pozo(R, t, { encuadre: 'boca', epoca: '1909', agua: 1 });
  // el tinte que se extiende por el agua de la boca
  const u = tramo(t, ECHA + 0.15, P2 - 0.2);
  if (u > 0) for (let y = 132; y <= 156; y++) for (let x = 132; x <= 188; x++) { const c = R.pget(x, y), r = c & 255, b = (c >>> 16) & 255; if (b > r + 18) { const d = Math.hypot(x - 146, (y - 144) * 2.2); if (d < 8 + u * 52 + Math.sin(x * 0.5 + t * 4) * 3) R.pset(x, y, mz(c, tr(x, y, 0.5) ? ROJO : ROJOL, Math.min(0.85, 0.4 + u))); } }
  if (u > 0 && u < 1) for (let k = 0; k < 3; k++) { const r = ((t * 1.2 + k / 3) % 1) * 18; for (let a = 0; a < 6.28; a += 0.35) { const x = Math.round(146 + Math.cos(a) * r), y = Math.round(144 + Math.sin(a) * r * 0.35); const c = R.pget(x, y); if (((c >>> 16) & 255) > (c & 255)) R.pset(x, y, ROJOL); } }
  // el buscador del cubo, el capataz y el fogonero
  const anda = t < ECHA - 0.25, x = Math.round(lerp(30, 112, tramo(t, 1.3, ECHA - 0.25))), vuelca = t >= ECHA - 0.1 && t < POZOW + 0.4;
  R.actor(EL.cavador2, 248, 166, t, { dir: t > DYE ? -1 : 1, sorpresa: t > DYE + 0.2 && t < P2 - 0.6, dedo: t < 2.2 && Math.sin(t * 3) > 0 });
  R.actor(EL.capataz, 204, 162, t, { dir: -1, dedo: t > DYE && t < POZOW + 0.5, habla: t > POZOW && Math.sin(t * 9) > 0, sonrisa: t > POZOW + 0.6 });
  R.actor(EL.cavador, x, 160, t, { dir: 1, anda, dedo: vuelca, sonrisa: t > POZOW + 0.4 });
  if (vuelca) { cubo(x + 17, 129, true); const s = tramo(t, ECHA, ECHA + 0.15) - tramo(t, POZOW, POZOW + 0.3); if (s > 0) for (let j = 0; j < 14; j++) { const yy = 130 + j, xx = x + 23 + Math.round(j * 0.3 + Math.sin(t * 20 + j) * 0.6); R.pset(xx, yy, j % 3 ? ROJO : ROJOL); R.pset(xx + 1, yy, ROJO); } }
  else if (t < ECHA) { cubo(x + 15, 148, false); const g = (t - en('tinte', 0) - 0.1) / 0.5; if (g > 0 && g < 1) for (let k = 0; k < 5; k++) R.pset(x + 13 + k, Math.round(147 - Math.sin(g * Math.PI) * (4 + k % 3 * 2)), k % 2 ? ROJO : ROJOL); }
  else { R.rect(x + 16, 154, x + 21, 159, K); R.rect(x + 17, 155, x + 20, 158, hex('#8a8a96')); }
};
// ── plano 2: el mapa de la isla ──
const ISLA = [[44, 104], [50, 90], [66, 80], [90, 76], [112, 80], [132, 74], [156, 66], [182, 62], [208, 64], [230, 70], [248, 80], [260, 90], [262, 98], [252, 101], [249, 108], [260, 113], [264, 122], [254, 132], [232, 140], [206, 140], [180, 136], [156, 140], [128, 142], [100, 138], [76, 132], [56, 122]];
const TIERRA_N = [[0, 0], [320, 0], [320, 20], [292, 24], [262, 18], [232, 26], [200, 22], [172, 28], [140, 20], [110, 27], [80, 21], [50, 28], [22, 24], [0, 28]];
const dentro = (x, y, P) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const ISLOTES = [[30, 46, 7], [292, 64, 6], [66, 162, 5], [118, 166, 4]];
const tierra = (x, y) => dentro(x, y, ISLA) || dentro(x, y, TIERRA_N) || ISLOTES.some(([a, b, r]) => Math.hypot(x - a, (y - b) * 1.3) < r);
const POZO = [224, 98], CALA = [256, 107], ORILLA = [214, 141];
let BM = null;
const pintaMapa = () => {
  const M = new Uint8Array(320 * 180); for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) M[y * 320 + x] = tierra(x, y) ? 1 : 0;
  const en_ = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180 && M[y * 320 + x] === 1;
  const cerca = (x, y, r) => en_(x + r, y) || en_(x - r, y) || en_(x, y + r) || en_(x, y - r) || en_(x + r * 0.7 | 0, y + r * 0.7 | 0) || en_(x - r * 0.7 | 0, y - r * 0.7 | 0) || en_(x + r * 0.7 | 0, y - r * 0.7 | 0) || en_(x - r * 0.7 | 0, y + r * 0.7 | 0);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c;
    if (en_(x, y)) { const borde = !en_(x + 1, y) || !en_(x - 1, y) || !en_(x, y + 1) || !en_(x, y - 1), playa = !borde && !(en_(x + 2, y) && en_(x - 2, y) && en_(x, y + 2) && en_(x, y - 2));
      c = borde ? hex('#4a3a22') : playa ? hex('#ecdcae') : tr(x, y, 0.2 + (y % 60) / 200 + (hh(x >> 3, y >> 3, 2) > 0.7 ? 0.3 : 0)) ? hex('#c8b47e') : hex('#dccc9a'); }
    else if (cerca(x, y, 4)) c = tr(x, y, 0.5) ? hex('#9ac4dc') : hex('#88b6d2');
    else if (cerca(x, y, 10) && !cerca(x, y, 9) && (x + y) % 3 === 0) c = hex('#4a7aa4');
    else c = tr(x, y, 0.3 + y / 600) ? hex('#5a8ab4') : hex('#6898c0');
    R.pset(x, y, c);
  }
  for (let k = 0; k < 150; k++) { const x = Math.round(hh(k, 91) * 316), y = Math.round(hh(k, 92) * 176); if (!en_(x, y) && !en_(x + 3, y) && !cerca(x, y, 6)) { R.pset(x, y, hex('#9ac0dc')); R.pset(x + 1, y - 1, hex('#9ac0dc')); R.pset(x + 2, y, hex('#9ac0dc')); } }
  // árboles (salvo en el claro del pozo y en la ciénaga), la ciénaga y los árboles de la costa de enfrente
  for (let k = 0; k < 260; k++) { const x = Math.round(hh(k, 93) * 316), y = Math.round(hh(k, 94) * 176); if (y < 16 || !en_(x, y) || !en_(x + 3, y + 3) || !en_(x - 3, y - 2) || Math.hypot(x - POZO[0], y - POZO[1]) < 16 || (x > 118 && x < 154 && y > 94 && y < 118) || (x > 272 && y < 46)) continue;
    R.disco(x + 1, y + 1, 2, hex('#2e5226')); R.disco(x, y, 2, hex('#4a7a3a')); R.pset(x - 1, y - 1, hex('#7aaa52')); R.pset(x, y + 3, hex('#5a3a22')); }
  for (let y = 96; y < 118; y += 3) for (let x = 118; x < 154; x++) if (en_(x, y) && hh(x >> 2, y, 4) > 0.4) { R.pset(x, y, hex('#5a9a8a')); if (x % 7 === 0) { R.pset(x, y - 1, hex('#4a7a3a')); R.pset(x, y - 2, hex('#4a7a3a')); } }
  // la rosa de los vientos (sin letras), la escala y los sondeos
  { const [cx, cy] = [34, 146]; R.anillo(cx, cy, 11, hex('#3a2a1a')); R.anillo(cx, cy, 9, hex('#7a6a4a'), 1);
    for (const [a, l, c] of [[-Math.PI / 2, 15, ROJO], [Math.PI / 2, 12, hex('#3a2a1a')], [0, 12, hex('#3a2a1a')], [Math.PI, 12, hex('#3a2a1a')]]) R.poligono([[cx + Math.cos(a + 1.5) * 3, cy + Math.sin(a + 1.5) * 3], [cx + Math.cos(a) * l, cy + Math.sin(a) * l], [cx + Math.cos(a - 1.5) * 3, cy + Math.sin(a - 1.5) * 3]].map(([u, v]) => [Math.round(u), Math.round(v)]), c);
    R.disco(cx, cy, 2, hex('#e8dcc0')); }
  for (let k = 0; k < 5; k++) { R.rect(230 + k * 10, 166, 239 + k * 10, 169, K); if (k % 2) R.rect(231 + k * 10, 167, 238 + k * 10, 168, hex('#f2eee2')); }
  for (const [rx, ry] of [[180, 40], [86, 54], [300, 118], [150, 160]]) { R.disco(rx, ry, 2, hex('#6a6a72')); R.pset(rx - 1, ry - 1, hex('#a8a8b0')); R.anillo(rx, ry, 4, hex('#c8e4f4'), 1); }
  for (const [cx, cy, r] of ISLOTES) R.anillo(cx, cy, r + 6, hex('#4a7aa4'), 1);
  for (const [n, x, y] of [['4', 96, 160], ['7', 176, 158], ['9', 284, 140], ['3', 62, 66], ['6', 150, 48], ['12', 196, 166]]) R.numero(n, x, y, { fina: true, color: hex('#2e5a80') });
  // el marco del mapa: dos filetes de tinta y esquinas
  for (const [i, c] of [[1, hex('#2a1a10')], [2, hex('#e8dcc0')], [3, hex('#2a1a10')], [6, hex('#2a1a10')]]) { R.rect(i, i, 319 - i, i, c); R.rect(i, 179 - i, 319 - i, 179 - i, c); R.rect(i, i, i, 179 - i, c); R.rect(319 - i, i, 319 - i, 179 - i, c); }
  R.rect(0, 0, 319, 0, hex('#2a1a10')); R.rect(0, 179, 319, 179, hex('#2a1a10')); R.rect(0, 0, 0, 179, hex('#2a1a10')); R.rect(319, 0, 319, 179, hex('#2a1a10'));
};
const p2 = (t) => {
  if (!BM) { const prev = R.usar(BM = R.nuevo()); pintaMapa(); R.usar(prev); }
  R.copiar(BM);
  // olas que brillan, la goleta que pasa y una gaviota con su sombra
  for (let k = 0; k < 30; k++) { const x = Math.round((k * 61 + t * 4) % 300) + 8, y = (k * 37) % 160 + 10; if (!tierra(x, y) && !tierra(x, y + 2) && Math.sin(t * 3 + k) > 0.3) { R.pset(x, y, hex('#e8f4fa')); R.pset(x + 1, y, hex('#c8e4f4')); } }
  { const gx = Math.round(lerp(330, 150, (t - P2) / 7)), gy = 160; R.linea(gx + 4, gy + 1, gx + 16, gy + 1, hex('#9ac4dc')); R.rect(gx - 4, gy - 1, gx + 4, gy, hex('#5a3a22')); R.pset(gx - 5, gy - 1, hex('#5a3a22')); R.linea(gx, gy - 2, gx, gy - 9, K); R.poligono([[gx + 1, gy - 9], [gx + 1, gy - 2], [gx + 5, gy - 2]], hex('#f2eee2')); R.poligono([[gx - 1, gy - 8], [gx - 1, gy - 2], [gx - 4, gy - 2]], hex('#e8dcc0')); }
  { const u = ((t - P2) / 4.2) % 1, gx = Math.round(lerp(20, 300, u)), gy = Math.round(150 - u * 90); osc(gx + 6, gy + 10, 0.3); osc(gx + 7, gy + 10, 0.3); osc(gx + 5, gy + 11, 0.3); R.gaviota(gx, gy, t, 2); }
  { const bx = Math.round(lerp(40, 110, (t - P2) / 6)), by = 50; R.rect(bx - 3, by, bx + 3, by + 1, hex('#5a3a22')); R.linea(bx, by - 1, bx, by - 6, K); R.poligono([[bx + 1, by - 6], [bx + 1, by - 1], [bx + 4, by - 1]], hex('#f2eee2')); R.linea(bx - 8, by + 1, bx - 4, by + 1, hex('#9ac4dc')); }
  // el pozo, que late
  { const [x, y] = POZO; R.rect(x - 3, y - 3, x + 3, y + 3, K); R.rect(x - 2, y - 2, x + 2, y + 2, hex('#2a1a10')); R.linea(x - 2, y - 2, x + 2, y + 2, hex('#a8784a')); R.linea(x + 2, y - 2, x - 2, y + 2, hex('#a8784a'));
    if (t < COVE + 0.4) { const r = 5 + ((t * 1.5) % 1) * 9; R.anillo(x, y, r, ROJO); } else R.anillo(x, y, 6, ROJO, 1); }
  // la chincheta en Smith's Cove y la línea de puntos del túnel que todos esperaban
  T.chincheta(R, CALA[0], CALA[1], t, ROJO, { baja: tramo(t, COVE, COVE + 0.35), pulso: t > COVE + 0.4 && t < ESPERA });
  R.ruta([POZO, [238, 100], [251, 106]], tramo(t, ESPERA, TUN + 0.15), ROJO, { grueso: true });
  if (t > TUN + 0.3) { const r = 4 + ((t * 2) % 1) * 8; for (let a = 0; a < 6.28; a += 0.4) R.pset(Math.round(CALA[0] + Math.cos(a) * r), Math.round(CALA[1] + Math.sin(a) * r * 0.7), hex('#e8f4fa')); R.icono('?', 266, 80 - (Math.floor(t * 4) % 2), BLANCO, K, 2); }
};
// ── plano 3: la orilla sur ──
const p3 = (t) => {
  T.smithsCove(R, t, { encuadre: 'sur', tinte: tramo(t, P3 + 0.15, P3 + 2.8) });
  // el pez del gag, teñido de rojo
  const pa = tramo(t, SUR + 0.55, SUR + 0.95) - tramo(t, CULPA + 0.2, CULPA + 0.6); if (pa > 0) T.pez(R, 218, 148, t, { rojo: 1, asoma: pa, dir: -1 });
  // el segundo túnel secreto que se imaginan: de tierra a la grieta
  const u = tramo(t, CULPA, SECR + 0.3); if (u > 0) { const L = [[2, 120], [60, 128], [118, 134], [160, 133], [179, 131]]; R.ruta(L.map(([x, y]) => [x, y - 2]), u, hex('#f8e070'), { grueso: false, flecha: false }); R.ruta(L.map(([x, y]) => [x, y + 2]), u, hex('#f8e070'), { grueso: false }); }
  const e1 = tramo(t, P3, P3 + 1.1), e2 = tramo(t, P3 + 0.3, P3 + 1.4), sor = t > SUR + 0.25 && t < CULPA;
  R.actor(EL.cavador, Math.round(lerp(-16, 52, e1)), 158, t, { dir: 1, anda: e1 > 0 && e1 < 1, sorpresa: sor || (t > SUR + 0.6 && t < CULPA), habla: t > SECR && Math.sin(t * 8) > 0 });
  R.actor(EL.capataz, Math.round(lerp(-30, 92, e2)), 152, t, { dir: 1, anda: e2 > 0 && e2 < 1, dedo: (t > SUR && t < SUR + 0.8) || (t > CULPA && t < SECR + 0.5), sorpresa: sor, sonrisa: t > SECR + 0.4 });
  if (t > SUR + 0.3 && t < SUR + 1.4) R.icono('!', 104, 112, hex('#e83a2a'), K, 2);
};
// ── plano 4: el laboratorio de hoy: el agua encuentra sola su camino ──
const FL = [[[151, 100], [164, 110], [180, 120], [196, 123], [204, 121]], [[263, 100], [250, 110], [234, 120], [218, 123], [210, 121]]];
const p4 = (t) => {
  const v = tramo(t, AGUA - 0.2, ROCA);
  T.labAgua(R, t, { encuadre: 'mesa', nivel: lerp(0.08, 1, v) });
  R.recorte([150, 74, 264, 136]);
  if (t > AGUA - 0.4) for (const L of FL) { let tot = 0; const segs = []; for (let i = 1; i < L.length; i++) { const d = Math.hypot(L[i][0] - L[i - 1][0], L[i][1] - L[i - 1][1]); segs.push([L[i - 1], L[i], tot, d]); tot += d; }
    for (let s = (t * 14) % 10; s < tot; s += 10) for (const [[ax, ay], [bx, by], a0, d] of segs) if (s >= a0 && s < a0 + d) { const f = (s - a0) / d, x = ax + (bx - ax) * f, y = ay + (by - ay) * f, an = Math.atan2(by - ay, bx - ax); for (const [dd, c] of [[1, hex('#1e5a8a')], [0, hex('#d8f4ff')]]) for (const sg of [-1, 1]) { R.linea(Math.round(x) + dd, Math.round(y) + dd, Math.round(x - Math.cos(an + sg * 0.75) * 4) + dd, Math.round(y - Math.sin(an + sg * 0.75) * 4) + dd, c); R.linea(Math.round(x - Math.cos(an) * 2) + dd, Math.round(y - Math.sin(an) * 2) + dd, Math.round(x - Math.cos(an) * 2 - Math.cos(an + sg * 0.75) * 3) + dd, Math.round(y - Math.sin(an) * 2 - Math.sin(an + sg * 0.75) * 3) + dd, c); } R.pset(Math.round(x), Math.round(y), BLANCO); } }
  R.recorte(null);
  R.actor(EL.geologo, 62, 163, t, { dir: 1, dedo: t > AGUA - 0.3 && t < ROCA, habla: t > P4 + 0.1 && t < AGUA && Math.sin(t * 9) > 0, sonrisa: t > ROCA - 0.2 });
  R.actor(EL.fisica, 294, 163, t, { dir: -1, sorpresa: t > AGUA + 0.5 && t < ROCA - 0.3, sonrisa: t > ROCA - 0.3, dedo: t > ROCA && Math.sin(t * 6) > 0 });
};
const efectos = [[ECHA, 'chof'], [DYE + 0.3, 'burbujas'], [COVE + 0.3, 'golpecito'], [ESPERA + 0.1, 'lapiz'], [TUN + 0.35, 'pop'], [P3 + 0.3, 'burbujas'], [SUR + 0.6, 'chof'], [CULPA + 0.1, 'whoosh'], [AGUA - 0.1, 'burbujas']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1898', efectos, año: (t) => t < P4 ? 1898 : 2026 });
''')

E['oi-sumidero'] = ('El sumidero', '''// OI-SUMIDERO (frases 34–35), hoy. Cuatro planos:
// 1. el tanque del laboratorio: el agua va disolviendo cuevas en la roca blanca; en «sinkhole» el geólogo lo señala y
//    en «opened up on its own» el suelo se hunde solo sobre la cueva y el arbolito cae dentro;
// 2. corte en «and»: el sumidero en sección, a cámara rápida: los árboles del borde caen dentro uno tras otro y la tierra
//    los va enterrando en capas, uno cada diez pies (la regla marca 20–70); en el borde vuelven a brotar arbolitos;
// 3. corte en «But»: la zanja de la playa con los canales de piedra: una mano coge un mechón de fibra de coco
//    («coconut fiber»), el agua corre por los canales con destellos («stone channels») y los dos que miran desde el borde
//    se encogen de hombros: «?»;
// 4. corte en «which»: unas salinas antiguas como las que algunos imaginan: las balsas de piedra con la sal que brilla, el
//    salinero que rastrilla y otro que carga un cesto; en «still open» se queda flotando un «?» grande, y una gaviota
//    se posa encima.''', AYUDA + r'''
const SKEP = en('sumidero', .022), NAT = en('sumidero', .232), SINK = en('sumidero', .266), OPEN = en('sumidero', .404), P2 = en('sumidero', .514);
const LOGS = en('sumidero', .618), DIEZ = en('sumidero', .686), ARB = en('sumidero', .772), CAEN = en('sumidero', .829), ENT = en('sumidero', .94);
const P3 = en('abierto', 0), COCO = en('abierto', .241), PIEDRA = en('abierto', .403), PLAYA = en('abierto', .523), P4 = en('abierto', .61);
const SAL = en('abierto', .703), DEBATE = en('abierto', .834), ABIERTO = en('abierto', .932);
// un árbol (roble) que puede caer: (x, y) la base, a el ángulo (0 de pie, +π/2 tumbado hacia la derecha), s escala
const roble = (x, y, a, t, s = 1, hojas = 1) => { const h = 22 * s, ca = Math.sin(a), cb = -Math.cos(a), tx = x + ca * h, ty = y + cb * h;
  for (const [dd, c] of [[-1, hex('#4a3018')], [0, hex('#6a4a2a')], [1, hex('#8a6a44')]]) R.linea(Math.round(x + dd * -cb), Math.round(y + dd * ca), Math.round(tx + dd * -cb), Math.round(ty + dd * ca), c);
  if (hojas <= 0) return; const r = Math.round(8 * s * hojas), m = Math.round(Math.sin(t * 1.3 + x) * 0.8);
  R.disco(Math.round(tx) + m, Math.round(ty) + 2, r, hex('#2e5226')); R.disco(Math.round(tx) - 1 + m, Math.round(ty), r - 1, hex('#447a34')); R.disco(Math.round(tx) - 2 + m, Math.round(ty) - 2, Math.max(1, r - 4), hex('#6a9a4a'));
  for (let k = 0; k < 5; k++) R.pset(Math.round(tx - 3 + hh(k, x) * 6) + m, Math.round(ty - 3 + hh(x, k) * 6), hex('#8aba5a')); };
// ── plano 1: el tanque, con las cuevas que se disuelven y el suelo que se hunde ──
const HX = 167;
const p1 = (t) => {
  T.labAgua(R, t, { encuadre: 'tanque', disuelve: lerp(0.15, 1, tramo(t, SKEP, OPEN)), flechas: tramo(t, 0.3, 1.2) });
  const h = tramo(t, OPEN, OPEN + 0.7);
  R.recorte([11, 21, 235, 141]);
  if (h > 0) { // el embudo que se abre desde la superficie hasta la cueva
    const w = Math.round(5 + h * 12), fondo = Math.round(lerp(44, 92, h));
    for (let y = 39; y <= fondo; y++) { const k = (y - 39) / Math.max(1, fondo - 39), a = Math.round(w * (1 - k * 0.55)); for (let x = HX - a; x <= HX + a; x++) { const ed = Math.min(x - HX + a, HX + a - x); R.pset(x, y, ed < 2 ? (y % 4 < 2 ? hex('#6a4a32') : hex('#8a6a44')) : tr(x, y, k * 0.8 + hh(x, y >> 1, 4) * 0.3) ? hex('#3a2a20') : hex('#24180f')); } R.pset(HX - a - 1, y, K); R.pset(HX + a + 1, y, K); }
    for (let k = 0; k < 5; k++) { const y = 46 + k * 9; if (y < fondo - 2) { R.pset(HX - 2 + (k % 3), y, hex('#7a7680')); R.pset(HX - 1 + (k % 3), y, hex('#5e5a62')); } }
    for (let k = 0; k < 8; k++) { const u = ((t - OPEN) * 1.6 + k / 8) % 1; if (t - OPEN < 2.2) R.pset(HX - 4 + k, Math.round(40 + u * 52), k % 2 ? hex('#8a6a44') : hex('#5a3e2a')); }
    for (let i = -w - 4; i <= w + 4; i++) if (Math.abs(i) > w) R.pset(HX + i, 39 + (Math.abs(i) - w < 3 ? 1 : 0), hex('#5a3e2a')); }
  // el arbolito que cae dentro
  const c = tramo(t, OPEN + 0.25, OPEN + 0.9); if (c < 1) roble(HX + Math.round(c * 2), 39 + Math.round(c * c * 40), c * 1.7, t, 0.55, 1 - c * 0.6);
  R.recorte(null);
  if (t > OPEN + 0.1 && t < P2 - 0.1 && Math.floor(t * 5) % 3) R.icono('!', HX + 14, 24, hex('#e83a2a'), K, 2);
  R.actor(EL.geologo, 290, 178, t, { dir: -1, dedo: t > NAT - 0.3 && t < OPEN + 0.2, habla: t < NAT && Math.sin(t * 9) > 0, sorpresa: t > OPEN + 0.2 });
};
// ── plano 2: el sumidero en corte, a cámara rápida ──
const GS = 62, NIV = [174, 158, 142, 126, 110, 94];
const TCAE = [null, null, LOGS - 0.35, DIEZ + 0.05, ARB, CAEN + 0.35];   // cuándo empieza a caer cada árbol (los dos primeros ya están enterrados)
const bordeI = (y) => y < GS ? 0 : y < 72 ? 108 + (y - GS) * 2 : y < 84 ? 128 + (y - 72) : 140;
const bordeD = (y) => y < GS ? 0 : y < 72 ? 212 - (y - GS) * 2 : y < 84 ? 192 - (y - 72) : 180;
let BS = null;
const pintaSumidero = () => {
  degr(0, 50, [hex('#4e86d4'), hex('#7cb0e6'), hex('#b4d4f0'), hex('#dceaf4')]); cirros(16, 8, hex('#e8f0f8'));
  for (let x = 0; x < 320; x++) { const hh2 = 44 + Math.round(Math.sin(x * 0.025) * 2 + hh(x >> 2, 9) * 2); for (let y = hh2; y < 50; y++) R.pset(x, y, tr(x, y, 0.5) ? hex('#7a94a8') : hex('#6a8698')); }
  // el bosque por detrás del corte (robles y abetos), salvo sobre el sumidero
  for (let k = 0; k < 30; k++) { const x = Math.round(k * 11 + hh(k, 1) * 6), y = 50 + Math.round(hh(k, 2) * 6); if (x > 96 && x < 224) continue; const r = 6 + Math.round(hh(k, 3) * 3);
    if (k % 4 === 0) { for (let j = 0; j < 4; j++) R.poligono([[x, y - 12 + j * 4 - 6], [x - 6 + j, y - 12 + j * 4 + 2], [x + 6 - j, y - 12 + j * 4 + 2]], j % 2 ? hex('#2a5a3a') : hex('#1e4a2e')); continue; }
    R.disco(x, y + 2, r, hex('#2e5226')); R.disco(x - 1, y, r - 1, hex('#447a34')); R.disco(x - 2, y - 2, r - 3, hex('#6a9a4a')); }
  for (let y = 54; y < GS; y++) for (let x = 0; x < 320; x++) if (x < 104 || x > 216) R.pset(x, y, tres([hex('#4a7a3a'), hex('#36602c'), hex('#6a9a4a')], x, y, 3)); else R.pset(x, y, tr(x, y, (y - 54) / 10) ? hex('#5a8a40') : hex('#7aa850'));
  // la tierra en capas, con piedras, raíces y la roca blanca abajo
  for (let y = GS; y < 180; y++) for (let x = 0; x < 320; x++) { const c = y < 74 + Math.round(Math.sin(x * 0.07) * 1.5) ? 0 : y < 100 + Math.round(Math.sin(x * 0.05) * 2) ? 1 : y < 118 + Math.round(Math.sin(x * 0.09) * 1.5) ? 2 : 3; R.pset(x, y, tres([[hex('#4a3222'), hex('#3a261a'), hex('#6a4a32')], [hex('#a06a3e'), hex('#86562f'), hex('#c08a58')], [hex('#8a7a66'), hex('#6a5c4c'), hex('#b0a088')], [hex('#cfc8ba'), hex('#b0a898'), hex('#e6e0d4')]][c], x, y, c + 21)); }
  for (let x = 0; x < 320; x++) { R.pset(x, GS, hex('#3a5a24')); R.pset(x, GS - 1, hh(x, 2) > 0.5 ? hex('#6a9a3a') : hex('#4a7a2a')); if (hh(x, 3) > 0.7) R.pset(x, GS - 2, hex('#8aba4a')); }
  for (let k = 0; k < 60; k++) { const x = Math.round(hh(k, 31) * 320), y = 76 + Math.round(hh(k, 32) * 100); if (x > 132 && x < 188) continue; if (y > 118) { R.linea(x, y, x + 6, y + Math.round(hh(k, 34) * 4 - 2), hex('#b0a898')); continue; } R.disco(x, y, 1 + (k % 2), hex('#5e5a62')); R.pset(x - 1, y - 1, hex('#9a96a0')); }
  for (let k = 0; k < 18; k++) { const x0 = Math.round(hh(k, 41) * 320); if (x0 > 100 && x0 < 220) continue; let x = x0; for (let j = 0; j < 8 + (k % 6); j++) { x += Math.round(hh(k, j) * 2 - 1); R.pset(x, GS + 1 + j, hex('#7a5a3a')); } }
  // el hueco del sumidero: el aire del embudo (el bosque de enfrente se ve por él) y la pared del fondo, oscura
  for (let y = GS - 1; y < 180; y++) { const a = bordeI(y), b = bordeD(y); if (!a) continue; for (let x = a; x <= b; x++) R.pset(x, y, y < 84 ? (tr(x, y, (y - GS) / 22) ? hex('#4a3a2e') : hex('#5e4a3a')) : tr(x, y, 0.35 + hh(x >> 2, y >> 2, 6) * 0.3) ? hex('#3a2e26') : hex('#2e241e')); R.pset(a - 1, y, K); R.pset(b + 1, y, K); }
  // la roca blanca en capas, con grietas, fósiles y una bolsa de agua; conchas en la grava
  for (let k = 0; k < 7; k++) { const y = 124 + k * 8; for (let x = 0; x < 320; x++) if ((x < 138 || x > 182) && hh(x >> 2, k, 44) > 0.3) R.pset(x, y + Math.round(Math.sin(x * 0.03 + k) * 1.5), hex('#a8a090')); }
  for (let k = 0; k < 9; k++) { let x = Math.round(hh(k, 45) * 300) + 10; if (x > 128 && x < 192) x += 70; for (let y = 120 + (k % 3) * 12; y < 150 + (k % 4) * 8; y++) { x += Math.round(hh(k, y) * 2 - 1); R.pset(x, y, hex('#7a7468')); R.pset(x + 1, y, hex('#ece6da')); } }
  for (const [fx, fy] of [[30, 112], [78, 108], [236, 110], [290, 114], [262, 104]]) { R.anillo(fx, fy, 2, hex('#e8e0d0')); R.pset(fx, fy, hex('#c8b8a0')); R.pset(fx + 1, fy - 1, hex('#5e5a62')); }
  for (let y = 150; y < 168; y++) for (let x = 38; x < 92; x++) { const d = Math.hypot((x - 64) / 26, (y - 159) / 9); if (d < 1) R.pset(x, y, d > 0.86 ? K : y < 157 ? (tr(x, y, 0.5) ? hex('#3a3646') : hex('#2e2a3a')) : y === 157 ? hex('#6a9ac0') : tr(x, y, 0.4) ? hex('#2c4e6a') : hex('#223e58')); }
  for (let k = 0; k < 8; k++) { const x = 240 + k * 9, y = 150 + (k % 3) * 9; R.disco(x, y, 2, hex('#b0a898')); R.pset(x - 1, y - 1, hex('#f2ece0')); }
  // el hueco: humedad en la pared del fondo, piedras y raíces que cuelgan
  for (let k = 0; k < 14; k++) { const x = 142 + Math.round(hh(k, 47) * 36), y = 86 + Math.round(hh(k, 48) * 90); R.disco(x, y, 1, hex('#5e5a62')); R.pset(x - 1, y - 1, hex('#8a8690')); }
  for (let x = 142; x < 180; x += 5) for (let y = 86; y < 180; y++) if (hh(x, y >> 3, 49) > 0.6) R.pset(x + Math.round(Math.sin(y * 0.2) * 1), y, hex('#463830'));
  for (const x of [112, 120, 202, 208]) for (let j = 0; j < 9; j++) R.pset(x + Math.round(Math.sin(j) * 1), GS + 2 + j, hex('#8a6a44'));
  // la regla de los pies a la derecha
  R.rect(198, 64, 201, 179, hex('#e8c040')); R.rect(198, 64, 198, 179, hex('#a8801c')); for (let y = 64; y < 180; y += 8) R.rect(199, y, y % 16 === 14 ? 204 : 202, y, K);
};
// la tierra que entierra (u 0–1 por capa) y los troncos de cada capa
const capaRelleno = (y0, y1) => { for (let y = Math.max(y0, 62); y <= y1; y++) { const a = bordeI(y) + 1, b = bordeD(y) - 1, k = Math.floor((y + 3) / 4); for (let x = a; x <= b; x++) R.pset(x, y, tres([[hex('#8a6a48'), hex('#76583a'), hex('#a07a54')], [hex('#6a4a32'), hex('#5a3e2a'), hex('#7a5a3e')]][k % 2], x, y, 30)); } };
const tronco = (y0, k = 0) => { for (let x = 140; x <= 180; x++) { const y = y0 + Math.round((x - 160) / 40 * ((k % 3) - 1) * 2); R.pset(x, y - 2, K); R.pset(x, y - 1, hh(x, k) > 0.6 ? hex('#8a6a44') : hex('#6a4a2a')); R.pset(x, y, hh(x, k + 2) > 0.5 ? hex('#5a3a22') : hex('#6a4a2a')); R.pset(x, y + 1, hex('#4a3018')); R.pset(x, y + 2, K); }
  const y = y0; const bx = 148 + (k * 7) % 22; R.linea(bx, y0 - 2, bx + 3, y0 - 6, hex('#5a3a22')); R.pset(bx + 4, y0 - 7, hex('#4a7a3a')); R.disco(152 + (k * 5) % 16, y0, 1, hex('#3a2418'));
  R.disco(140, y, 2, hex('#c8a070')); R.pset(140, y, hex('#8a6038')); R.disco(180, y, 2, hex('#c8a070')); R.pset(180, y, hex('#8a6038')); R.pset(158, y - 3, hex('#4a3018')); R.pset(159, y - 4, hex('#4a3018')); };
const p2 = (t) => {
  if (!BS) { const prev = R.usar(BS = R.nuevo()); pintaSumidero(); R.usar(prev); }
  R.copiar(BS);
  nubes(t, [18, 30, 24], 6); gaviotas(t * 1.8, 30, 2);
  // el relleno: hasta dónde ha llegado la tierra en cada instante
  let tope = 150; for (let k = 2; k < 6; k++) { const c = TCAE[k]; tope = Math.min(tope, Math.round(lerp(NIV[k] + 8, NIV[k] - 8, tramo(t, c + 0.85, c + 1.6)))); if (t < c + 0.85) break; }
  capaRelleno(tope, 179);
  for (let k = 0; k < 6; k++) { const c = TCAE[k]; if (c != null && t < c + 0.8) continue; tronco(NIV[k], k); const d = (NIV[k] - GS) / 1.6; R.numero(String(Math.round(d / 10) * 10), 206, NIV[k] + 3, { fina: true, color: hex('#f8f0d0') }); }
  // los árboles del borde: caen por turnos y en su sitio vuelve a brotar uno
  for (let k = 2; k < 6; k++) { const c = TCAE[k], izq = k % 2 === 0, bx = izq ? 104 : 216, d = izq ? 1 : -1;
    if (t < c) { roble(bx, GS, Math.sin(t * 1.3 + k) * 0.03, t, 1); continue; }
    const g = tramo(t, c + 0.9, c + 2.2); if (g > 0) roble(bx, GS, 0, t, 0.3 + g * 0.7, 1);
    if (t > c + 0.85) continue;
    const r = tramo(t, c, c + 0.45), cae = tramo(t, c + 0.45, c + 0.8);
    if (cae === 0) roble(bx, GS, d * r * 1.5, t, 1);
    else { const y = Math.round(lerp(GS - 4, NIV[k] - 2, cae * cae)); for (let x = 141; x <= 179; x++) { R.pset(x, y, hex('#6a4a2a')); R.pset(x, y + 1, hex('#4a3018')); } R.disco(izq ? 174 : 146, y - 3, Math.round(8 * (1 - cae * 0.6)), hex('#447a34')); R.disco(izq ? 173 : 145, y - 4, Math.round(5 * (1 - cae * 0.6)), hex('#6a9a4a')); }
    if (r > 0.5) for (let j = 0; j < 6; j++) { const u = (t - c) * 1.5 + j * 0.17, x = Math.round(160 + Math.sin(j * 2 + t * 3) * 14), y = Math.round(GS - 12 + u * 40 + j * 3); if (u < 1.2 && y < tope) R.pset(x, y, j % 2 ? hex('#8aba5a') : hex('#6a9a4a')); } }
  // el escéptico señala los troncos; el buscador lo mira sin estar muy convencido
  R.actor(EL.geologo, 236, GS, t, { dir: -1, dedo: t > LOGS - 0.2 && t < ARB, sonrisa: t > ENT - 0.4, habla: t > ARB && t < ENT && Math.sin(t * 9) > 0 });
  R.actor(EL.cavador, 62, GS, t, { dir: 1, sorpresa: t > DIEZ && t < ARB, triste: t > ENT - 0.2 });
  // una ardilla que corre por el borde y se para a mirar
  { const u = (t - P2) / 6, ax = Math.round(lerp(10, 92, Math.min(1, u * 2))), corre = u < 0.5, ay = GS - 1 - (corre && Math.floor(t * 10) % 2 ? 1 : 0);
    R.rect(ax, ay - 3, ax + 4, ay - 1, hex('#a8582a')); R.rect(ax + 4, ay - 5, ax + 6, ay - 2, hex('#a8582a')); R.pset(ax + 6, ay - 4, K); R.pset(ax + 5, ay - 6, hex('#a8582a')); R.rect(ax - 3, ay - 7, ax - 1, ay - 2, hex('#c8783a')); R.pset(ax - 2, ay - 8, hex('#c8783a')); R.pset(ax + 1, ay, K); R.pset(ax + 4, ay, K); }
};
// ── plano 3: los canales de piedra de la playa y la fibra de coco ──
const p3 = (t) => {
  const g = T.smithsCove(R, t, { encuadre: 'canales' });
  // destellos que corren por los canales cuando se nombran
  if (t > PIEDRA - 0.2) { const f = tramo(t, PIEDRA - 0.2, PIEDRA + 0.3); for (let k = 0; k < 5; k++) { const can = g && g.canales && g.canales[k]; if (!can) continue; for (let j = 0; j < 3; j++) { const y = Math.round(100 + ((t * 40 + j * 27 + k * 9) % 80)), x = Math.round(can(y)); if (f > 0.5) { R.pset(x, y, BLANCO); R.pset(x + 1, y, hex('#c8ecff')); R.pset(x, y - 1, hex('#c8ecff')); } } } }
  // la mano que coge un mechón de fibra de coco del suelo y lo enseña
  const ag = tramo(t, COCO - 0.6, COCO), sube = tramo(t, COCO + 0.15, COCO + 0.8), wx = Math.round(lerp(lerp(266, 236, ag), 246, sube)), wy = Math.round(lerp(lerp(178, 160, ag), 146, sube));
  const fx = sube > 0 ? wx + 5 : 240, fy = sube > 0 ? wy - 6 : 162;
  const fibra = (x, y) => { for (let k = 0; k < 22; k++) { const a = k / 22 * Math.PI - Math.PI, L = 6 + (k % 5); R.linea(x, y, Math.round(x + Math.cos(a) * L + Math.sin(t * 3 + k) * 0.6), Math.round(y + Math.sin(a) * L * 0.8), k % 3 ? hex('#a8743c') : hex('#d8a868')); } R.disco(x, y + 1, 3, hex('#7a4e26')); R.disco(x - 1, y, 1, hex('#a8743c')); };
  if (sube === 0) fibra(fx, fy);
  if (ag > 0) { T.brazo(R, 266, 194, wx, wy, '#5a7a9a', -1); if (sube > 0) fibra(fx, fy); }
  if (t > COCO && t < PIEDRA + 0.3) { const r = 13 + ((t * 2) % 1) * 4; for (let a = 0; a < 6.28; a += 0.12) { const x = Math.round(fx + Math.cos(a) * r), y = Math.round(fy - 2 + Math.sin(a) * r); R.pset(x + 1, y + 1, K); R.pset(x, y, hex('#f8e070')); R.pset(x, y - 1, hex('#fff4b0')); } }
  // los dos que miran desde el borde de la zanja, y el «?» que no se resuelve
  const enc = t > PLAYA + 0.1;
  R.actor(EL.geologo, 118, 66, t, { dir: 1, dedo: t > PIEDRA && t < PLAYA, brazos: enc && Math.floor(t * 2) % 2 === 0, habla: t < COCO && Math.sin(t * 8) > 0 });
  R.actor(EL.cavador, 150, 66, t, { dir: -1, sorpresa: t > COCO + 0.2 && t < PIEDRA, brazos: enc && Math.floor(t * 2 + 1) % 2 === 0, sonrisa: t < COCO });
  if (enc) R.icono('?', 136, 34 - (Math.floor(t * 3) % 2), hex('#f8f0d0'), K, 3);
};
// ── plano 4: las salinas que algunos imaginan ──
let BSAL = null;
const BALSAS = [[64, 104, 112, 116], [118, 104, 166, 116], [172, 104, 220, 116], [46, 124, 110, 146], [118, 124, 182, 146], [190, 124, 254, 146]];
const pintaSalinas = () => {
  degr(0, 58, [hex('#5a90d8'), hex('#86b8ea'), hex('#bcdaf2'), hex('#f0e8d8')]); cirros(14, 8, hex('#f0f4f8'));
  R.disco(70, 30, 11, hex('#fff0c0')); R.disco(70, 30, 8, hex('#fffae0'));
  for (let x = 0; x < 320; x++) { const h = 54 + Math.round(Math.sin(x * 0.04) * 2 + hh(x >> 2, 9) * 2); for (let y = h; y < 59; y++) R.pset(x, y, tr(x, y, 0.5) ? hex('#7a94a8') : hex('#6a8698')); }
  degr(59, 94, [hex('#3a6a98'), hex('#4a80ac'), hex('#6aa0c4')]);
  for (let k = 0; k < 70; k++) { const x = Math.round(hh(k, 51) * 316), y = 60 + Math.round(hh(k, 52) * 32); R.linea(x, y, x + 2 + (k % 3), y, hex('#a8cce4')); }
  for (let y = 94; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 98 ? (tr(x, y, 0.5) ? hex('#f0f4f0') : hex('#c8dcd8')) : tres([hex('#dcc89a'), hex('#c8b484'), hex('#ecdcb0')], x, y, 7));
  for (const [ix, iw] of [[236, 58], [12, 30]]) { for (let x = ix; x < ix + iw; x++) { const h = Math.round(Math.sin((x - ix) / iw * Math.PI) * 6); for (let y = 58 - h; y < 59; y++) R.pset(x, y, tr(x, y, 0.5) ? hex('#3a6a4a') : hex('#2e5a3e')); } }
  for (let x = 0; x < 320; x++) for (let y = 98; y < 104; y++) if (y < 100 + Math.round(Math.sin(x * 0.1) * 1.5)) R.pset(x, y, tr(x, y, 0.5) ? hex('#b8a47c') : hex('#c8b48c'));
  for (let k = 0; k < 90; k++) { const x = Math.round(hh(k, 71) * 316), y = 104 + Math.round(hh(k, 72) * 74); if (hh(k, 73) > 0.6) { R.pset(x, y, hex('#8a8a92')); R.pset(x + 1, y, hex('#6a6a72')); R.pset(x, y - 1, hex('#c8c8d0')); } else if (hh(k, 73) > 0.35) { R.pset(x, y, hex('#f4e8e0')); R.pset(x + 1, y, hex('#e8b8a8')); } else R.linea(x, y, x + 3, y + 1, hex('#4a6a3a')); }
  for (let k = 0; k < 9; k++) { const x = 30 + k * 11, y = 154 + (k % 2) * 3; R.rect(x, y, x + 1, y + 2, hex('#b8a47c')); }
  R.rect(8, 168, 70, 173, hex('#8a7a66')); R.rect(8, 168, 70, 168, hex('#c8b8a0')); R.rect(8, 173, 70, 174, hex('#4a3a2a')); for (let x = 10; x < 70; x += 7) R.pset(x, 170, hex('#5a4a3a')); R.disco(70, 170, 3, hex('#c8a878')); R.anillo(70, 170, 2, hex('#8a6a4a'));
  for (const [gx, gy] of [[300, 178], [312, 176], [90, 179], [4, 160]]) for (let k = 0; k < 6; k++) R.linea(gx, gy, gx - 4 + k * 2, gy - 6 - (k % 3) * 2, k % 2 ? hex('#6a8a3a') : hex('#8aa84a'));
  // el canal de piedras que trae el agua del mar hasta las balsas, con su compuerta de tablas
  for (let y = 96; y < 124; y++) { const x = 30 + Math.round((y - 96) * 0.5); for (let i = -3; i <= 3; i++) R.pset(x + i, y, Math.abs(i) === 3 ? (y % 3 ? hex('#8a8a92') : hex('#5e5a62')) : tr(x + i, y, 0.5) ? hex('#6aa0c4') : hex('#8abcd8')); }
  R.rect(38, 120, 44, 123, hex('#6a4a2a')); R.rect(38, 120, 44, 120, hex('#a8784a'));
  for (const [x0, y0, x1, y1] of BALSAS) { for (let y = y0 - 2; y <= y1 + 2; y++) for (let x = x0 - 2; x <= x1 + 2; x++) { const borde = x < x0 || x > x1 || y < y0 || y > y1; if (borde) R.pset(x, y, hh(x >> 1, y >> 1, 3) > 0.5 ? hex('#9a969e') : hex('#7a7680')); else { const ed = Math.min(x - x0, x1 - x, y - y0, y1 - y); R.pset(x, y, ed < 2 && hh(x, y, 5) > 0.3 ? hex('#f4f6f2') : (x - x0 + (y - y0) * 2) % 23 < 2 ? hex('#c8e8f4') : tr(x, y, (y - y0) / (y1 - y0) * 0.7) ? hex('#5e9cb8') : hex('#7ab4cc')); } }
    for (let k = 0; k < 18; k++) { const x = x0 + Math.round(hh(k, x0) * (x1 - x0)), y = y0 + Math.round(hh(x0, k) * (y1 - y0)); R.disco(x, y, 1 + (k % 2), hex('#f8f8f4')); R.pset(x + 1, y + 1, hex('#d8e0e4')); }
    R.rect(x0 - 2, y1 + 3, x1 + 2, y1 + 3, hex('#5e5a62')); }
  // los montones de sal, la caseta de tablas con tejado de paja y los barriles
  for (const [x, y, r] of [[266, 166, 16], [296, 160, 12], [236, 172, 10]]) { R.poligono([[x - r, y], [x, y - r], [x + r, y]], hex('#e8ecec')); R.poligono([[x, y - r], [x + r, y], [x + 2, y]], hex('#c8d0d4')); R.linea(x - r, y, x, y - r, BLANCO); R.rect(x - r, y, x + r, y + 1, hex('#a8a090')); }
  R.rect(6, 112, 40, 150, hex('#7a5232')); for (let x = 6; x <= 40; x += 5) R.rect(x, 112, x, 150, hex('#5a3a22')); R.poligono([[2, 114], [23, 96], [44, 114]], hex('#c8a04a')); for (let k = 0; k < 20; k++) R.linea(4 + k * 2, 113, 23, 97, k % 2 ? hex('#a8803a') : hex('#e0c068')); R.rect(18, 130, 28, 150, hex('#3a2418'));
  { const bx = 96, by = 166; R.poligono([[bx, by - 6], [bx + 44, by - 6], [bx + 38, by + 2], [bx + 6, by + 2]], hex('#3a2418')); R.poligono([[bx + 1, by - 5], [bx + 43, by - 5], [bx + 37, by + 1], [bx + 7, by + 1]], hex('#8a5a32')); R.rect(bx + 2, by - 6, bx + 42, by - 6, hex('#c8945a')); for (const x of [bx + 14, bx + 28]) R.rect(x, by - 5, x + 1, by - 2, hex('#5a3a22')); R.linea(bx + 10, by - 4, bx + 34, by - 9, hex('#c8a070')); R.linea(bx + 44, by - 4, bx + 60, by + 4, hex('#c8b890')); for (let i = 0; i < 46; i++) osc(bx + i - 2, by + 3, 0.3); }
  for (let k = 0; k < 12; k++) { const x = 64 + k * 9, y = 152 + Math.round(Math.sin(k) * 2); R.pset(x, y, hex('#b8a47c')); R.pset(x + 1, y, hex('#b8a47c')); }
  for (const x of [50, 60]) { R.rect(x, 150, x + 8, 162, hex('#6a4a2a')); R.rect(x, 152, x + 8, 152, hex('#3a3a46')); R.rect(x, 159, x + 8, 159, hex('#3a3a46')); R.rect(x + 1, 150, x + 7, 150, hex('#a8784a')); }
};
const p4 = (t) => {
  if (!BSAL) { const prev = R.usar(BSAL = R.nuevo()); pintaSalinas(); R.usar(prev); }
  R.copiar(BSAL);
  nubes(t, [16, 26, 20]); gaviotas(t, 40, 2);
  // el mar: olas que rompen en la orilla y una barca de pesca
  for (let x = 0; x < 320; x++) if ((x + Math.floor(t * 6)) % 11 < 3) R.pset(x, 95 + Math.round(Math.sin(x * 0.2 + t * 2)), BLANCO);
  { const bx = Math.round(lerp(330, 220, (t - P4) / 5)), by = 74 + Math.round(Math.sin(t * 2) * 1); R.rect(bx - 6, by, bx + 6, by + 2, hex('#6a4a2a')); R.linea(bx, by - 1, bx, by - 10, K); R.poligono([[bx + 1, by - 10], [bx + 1, by - 1], [bx + 7, by - 1]], hex('#e8dcc0')); }
  for (let k = 0; k < 6; k++) { const x = Math.round((k * 57 + t * 10) % 320), y = 64 + (k * 11) % 26; if (Math.sin(t * 2 + k) > 0) R.linea(x, y, x + 3, y, BLANCO); }
  // la sal que brilla en las balsas
  for (let k = 0; k < 16; k++) { const [x0, y0, x1, y1] = BALSAS[k % 6], x = x0 + Math.round(hh(k, 61) * (x1 - x0)), y = y0 + Math.round(hh(61, k) * (y1 - y0)); if (Math.sin(t * 5 + k * 1.7) > 0.7 || (t > SAL && t < SAL + 0.6)) { R.pset(x, y, BLANCO); R.pset(x - 1, y, hex('#f8f0c0')); R.pset(x + 1, y, hex('#f8f0c0')); R.pset(x, y - 1, hex('#f8f0c0')); R.pset(x, y + 1, hex('#f8f0c0')); } }
  // el salinero que rastrilla la sal hacia un montoncito
  { const x = 132, s = 150, v = Math.sin(t * 3.2) * 5, rx = Math.round(x + 30 + v); const mont = 3 + Math.round(tramo(t, P4, P4 + 4) * 3);
    R.poligono([[146, 146], [150, 146 - mont], [154, 146]], hex('#f2f4f4')); R.linea(x + 14, s - 12, rx, 141, hex('#8a6038')); R.linea(x + 14, s - 11, rx, 142, hex('#5a3a22')); R.rect(rx - 3, 141, rx + 3, 142, hex('#6a4a2a')); for (let i = -3; i <= 3; i += 2) R.pset(rx + i, 143, hex('#6a4a2a'));
    R.actor(EL.amigo2, x, s, t, { dir: 1, sonrisa: Math.sin(t * 1.5) > 0 }); }
  // otro que carga un cesto de sal hacia los montones
  { const u = tramo(t, P4 + 0.2, P4 + 3.6), x = Math.round(lerp(190, 222, u)), s = 168; R.actor(EL.cavador2, x, s, t, { dir: 1, anda: u > 0 && u < 1, dedo: true });
    R.rect(x + 10, s - 33, x + 22, s - 28, hex('#8a6038')); for (let i = x + 10; i <= x + 22; i += 2) R.pset(i, s - 30, hex('#5a3a22')); R.rect(x + 11, s - 35, x + 21, s - 34, hex('#f2f4f4')); }
  // el «?» del debate, que se queda; una gaviota se posa encima
  if (t > DEBATE) { const b = tramo(t, DEBATE, DEBATE + 0.3), y = Math.round(lerp(26, 40, b)); R.icono('?', 104, y, hex('#f8f0d0'), K, 4);
    const g = tramo(t, ABIERTO - 0.2, ABIERTO + 0.5), gx = Math.round(lerp(250, 115, g)), gy = Math.round(lerp(50, y - 2, g)); if (g < 1) R.gaviota(gx, gy, t, 1); else { R.rect(gx - 2, gy - 2, gx + 2, gy, hex('#f2f4f4')); R.pset(gx + 3, gy - 3, hex('#f2f4f4')); R.pset(gx + 4, gy - 3, hex('#e8a030')); R.pset(gx - 3, gy - 1, hex('#8a8a96')); R.pset(gx, gy + 1, hex('#e8a030')); } }
};
const efectos = [[SKEP + 0.2, 'burbujas'], [OPEN, 'avalancha'], [OPEN + 0.6, 'golpecito'], [LOGS - 0.35 + 0.8, 'toc'], [DIEZ + 0.85, 'toc'], [ARB + 0.8, 'toc'], [CAEN + 1.15, 'toc'], [COCO, 'papel'], [PIEDRA, 'burbujas'], [PLAYA + 0.15, 'pop'], [SAL, 'brillo'], [DEBATE + 0.1, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
''')
