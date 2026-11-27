E = {}

# ── piezas comunes de las tres escenas (se pegan delante de cada cuerpo) ──────────────────────────────────────────────
COMUN = r'''
const K = hex('#1c1424');
const H = (x, y, s = 0) => R.hash2(x * 1 + s * 131, y * 1 - s * 71);
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const mez = (p, q, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((p >>> s) & 255) * (1 - k) + ((q >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const pal = (a) => a.map(hex);
// un fondo fijo en su búfer: se pinta una vez y se copia en cada fotograma; devuelve el búfer para repintar lo de delante
const fijo = (pinta) => { const o = { b: null }; o.copia = () => { if (!o.b) { o.b = R.nuevo(); const prev = R.usar(o.b); pinta(); R.usar(prev); } R.copiar(o.b); }; o.px = (x, y) => o.b[y * 320 + x]; return o; };
// repinta desde el búfer los píxeles que van delante (test(x, y) true) en la caja dada
const delante = (F, x0, y0, x1, y1, test) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (test(x, y)) R.pset(x, y, F.px(x, y)); };
// lo que pinta(), en coordenadas a la mitad, se copia a la pantalla al doble (insertos de cerca: objetos y topo grandes)
const AMP = { b: null };
const ampliar = (pinta) => { if (!AMP.b) AMP.b = R.nuevo(); AMP.b.fill(0); const prev = R.usar(AMP.b); pinta(); R.usar(prev);
  for (let j = 0; j < 90; j++) for (let i = 0; i < 160; i++) { const c = AMP.b[j * 320 + i]; if (!c) continue; R.pset(2 * i, 2 * j, c); R.pset(2 * i + 1, 2 * j, c); R.pset(2 * i, 2 * j + 1, c); R.pset(2 * i + 1, 2 * j + 1, c); } };
const SP = (f) => { const w = Math.max(...f.map((r) => r.length)); return f.map((r) => r.padEnd(w, '.')); };
const D = {
  k: K, K: hex('#2a2430'), G: hex('#3ab04a'), g: hex('#1e7a34'), L: hex('#8ae070'), R: hex('#e0402c'), r: hex('#a02418'),
  B: hex('#2a6ad8'), b: hex('#1a4aa8'), Y: hex('#f8d040'), y: hex('#c8902c'), O: hex('#fff4b0'), o: hex('#8a5a1c'),
  W: hex('#ffffff'), w: hex('#c8c8d8'), P: hex('#f0c070'), p: hex('#b07830'), M: hex('#9a6c40'), m: hex('#5a3a22'),
  N: hex('#c89a62'), n: hex('#3a2416'), S: hex('#c8ccd8'), s: hex('#8a90a0'), X: hex('#4a4e5c'), Z: hex('#f4f6fc'),
  E: hex('#f1dfae'), e: hex('#c8aa70'), A: hex('#e8c030'), a: hex('#a8801c'), Q: hex('#c83a3a'), q: hex('#8a2a2a'),
  F: hex('#f0a0b4'), V: hex('#6ab0e8'), v: hex('#3a78b8'),
};
const spr = (f, x, y, esp = false) => R.sprite(f, Math.round(x), Math.round(y), D, esp);
// tablas de madera con vetas, juntas a tope, nudos y clavos; P: cinco tonos de oscuro a claro; o.horiz; o.luz(x, y)
const tablas = (x0, y0, x1, y1, w, P, o = {}) => {
  const hz = !!o.horiz, sem = o.sem ?? 0, lar = o.largo ?? 90;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const a = hz ? y - y0 : x - x0, l = hz ? x : y, k = Math.floor(a / w), u = a % w, off = Math.floor(H(k, 9, sem) * lar);
    const tramo_ = Math.floor((l + off) / lar), kk = k * 7 + tramo_, junta = (l + off) % lar === 0;
    const veta = Math.sin(l * 0.11 + H(kk, 3, sem) * 30 + Math.sin(l * 0.035 + kk) * 2.2 + u * 0.8);
    const v = 2 + (H(kk, 1, sem) - 0.5) * 1.3 + (veta > 0.86 ? -0.9 : veta < -0.92 ? 0.5 : 0) + (u === 1 ? 0.7 : 0) + (u >= w - 2 ? -0.7 : 0) + (o.luz ? o.luz(x, y) : 0);
    R.pset(x, y, u === 0 || junta ? P[0] : R.tone(P, v, x, y));
    if (!junta && (l + off) % lar === 4 && (u === 2 || u === w - 3)) { R.pset(x, y, P[0]); }
    if (!junta && (l + off) % lar === 3 && (u === 2 || u === w - 3)) { R.pset(x, y, P[4]); }
  }
  // nudos
  const n = Math.round((x1 - x0) * (y1 - y0) / 900);
  for (let q = 0; q < n; q++) { const nx = x0 + Math.floor(H(q, 5, sem + 3) * (x1 - x0)), ny = y0 + Math.floor(H(q, 6, sem + 3) * (y1 - y0)); R.disco(nx, ny, 1, P[0]); R.pset(nx + (hz ? 2 : 0), ny + (hz ? 0 : 2), P[1]); R.pset(nx - (hz ? 2 : 0), ny - (hz ? 0 : 2), P[1]); }
};
const MAD = pal(['#2a180e', '#4a2e1a', '#6a4426', '#8a5c34', '#aa7a48']);
const MADC = pal(['#3a2416', '#6a4426', '#8e6238', '#b0804c', '#d4a66a']);
// destello de cuatro puntas
const destello = (x, y, r, c = D.O) => { R.pset(x, y, D.W); for (let k = 1; k <= r; k++) { const cc = k === r ? c : D.W; R.pset(x + k, y, cc); R.pset(x - k, y, cc); R.pset(x, y + k, cc); R.pset(x, y - k, cc); } };
// una moneda de 4 px (oro o plata) con su brillo
const moneda = (x, y, plata = false, gira = 0) => { const c0 = plata ? D.s : D.y, c1 = plata ? D.S : D.Y, c2 = plata ? D.Z : D.O; const w = Math.abs(Math.cos(gira)) > 0.4 ? 1 : 0; R.rect(x - w - 1, y - 2, x + w + 1, y + 2, K); R.rect(x - w, y - 1, x + w, y + 1, c1); R.pset(x - w, y - 1, c2); if (w) R.pset(x + w, y + 1, c0); };
'''

# ── los tesoros de las teorías, dibujados a mano ─────────────────────────────────────────────────────────────────────
OBJ = r'''
// el loro pirata (mira a la derecha; esp lo voltea), con su sombrero de tres picos y la calavera; o.ala: −1 abajo … 1 arriba
const LORO = SP([
  '.....kkkkkk.......',
  '....kKKKKKKk......',
  '...kKKKWKKKKk.....',
  '..kkkkkkkkkkkk....',
  '....kGGGGGGk......',
  '...kGLLGGGGGkk....',
  '...kGLWkGGGkPPk...',
  '...kGGkkGGGkPPpk..',
  '...kGGGGGLGGkPpk..',
  '....kGGGGGGGkpk...',
  '....kGGGGGGGGk....',
  '...kgGGGGGGLGk....',
  '...kggGGGGLLGk....',
  '...kgggGGGLGGk....',
  '...kRgggGGGGk.....',
  '....kRRggGGk......',
  '....kBRkPkPk......',
  '...kBBk.kkkk......',
  '..kBBk............',
  '..kBk.............',
  '..kk..............',
]);
const loro = (x, y, t, o = {}) => {
  const esp = (o.dir ?? 1) < 0, X = (i) => (esp ? x + 17 - i : x + i);
  spr(LORO, x, y, esp);
  if (o.pico) { R.pset(X(13), y + 8, K); R.pset(X(14), y + 8, hex('#6a2018')); R.pset(X(14), y + 9, D.P); }
  // el ala: sale del hombro y sube o baja
  const a = o.ala ?? 0, sx = X(6), sy = y + 11;
  const tip = [X(6 - 9 * Math.cos(a * 1.1)), Math.round(sy - 10 * a)], mid = [X(4 - 4 * Math.cos(a)), Math.round(sy - 4 * a + 3)];
  R.poligono([[sx, sy - 1], [tip[0], tip[1]], [mid[0], mid[1] + 2], [sx + (esp ? -2 : 2), sy + 3]], D.g);
  R.linea(sx, sy - 1, tip[0], tip[1], K); R.linea(tip[0], tip[1], mid[0], mid[1] + 2, K);
  R.linea(Math.round((sx + tip[0]) / 2), Math.round((sy + tip[1]) / 2), tip[0], tip[1], D.B); R.pset(tip[0], tip[1], D.R);
  R.pset(Math.round((sx * 2 + tip[0]) / 3), Math.round((sy * 2 + tip[1]) / 3), D.L);
};
// el cofre de Kidd abierto, lleno de oro (28 × 21); o.cerrado
const COFRE = SP([
  '...kkkkkkkkkkkkkkkkkkkkkk...',
  '..kmMMMMMMMMMMMMMMMMMMMMmk..',
  '..kmMNNNNNNNNNNNNNNNNNNMmk..',
  '..kmAMMMMMMMMMMMMMMMMMMAmk..',
  '..kmAmmmmmmmmmmmmmmmmmmAmk..',
  '..knnnnnnnnnnnnnnnnnnnnnnk..',
  '..kYOyYOYYOyYOYYOYyOYYOYyk..',
  '.kYOYYyYYOYYYyOYYYOYYYyYOYk.',
  '.kyYYOYYyYYOYYyYYOYYyYYOYYk.',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkk',
  'kAAAAAAAAAAAAAAAAAAAAAAAAAak',
  'kNMMMMMMMMMMAAAAMMMMMMMMMMmk',
  'kNMMMMMMMMMAkYYkAMMMMMMMMMmk',
  'kAMMMMMMMMMAkyykAMMMMMMMMMak',
  'kAMMMMMMMMMMAkkAMMMMMMMMMMak',
  'kNmmmmmmmmmmmmmmmmmmmmmmmmmk',
  'kAAAAAAAAAAAAAAAAAAAAAAAAAak',
  'kNMMMMMMMMMMMMMMMMMMMMMMMMmk',
  'kAmMMMMMMMMMMMMMMMMMMMMMMmak',
  'kmmmmmmmmmmmmmmmmmmmmmmmmmmk',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkk',
]);
const cofre = (x, y, t) => { spr(COFRE, x, y); for (let k = 0; k < 3; k++) { const ph = (t * 1.3 + k * 0.33) % 1; if (ph < 0.18) destello(x + 4 + Math.floor(H(k, Math.floor(t * 1.3)) * 20), y + 6 + (k % 2), 2); } };
// la corona con perlas y joyas (21 × 12)
const CORONA = SP([
  '.kWk.....kWk.....kWk.',
  '.kOk.....kOk.....kOk.',
  '.kYYk...kYOYk...kYYk.',
  '.kYYYk.kYYYYYk.kYYYk.',
  '.kYOYYkYYYRYYYkYYOYk.',
  '.kYYYYYYYRrRYYYYYYYk.',
  '.kYYYOYYYYRYYYYOYYyk.',
  'kkkkkkkkkkkkkkkkkkkkk',
  'kAWABBAAWARRAAWABBAak',
  'kAWAbbAAWArrAAWAbbAak',
  'kaaaaaaaaaaaaaaaaaaak',
  'kkkkkkkkkkkkkkkkkkkkk',
]);
const corona = (x, y, t) => { spr(CORONA, x, y); const ph = (t * 1.7) % 1; if (ph < 0.2) destello(x + 10, y + 5, 3); if ((t * 1.1 + 0.5) % 1 < 0.15) destello(x + 4, y + 9, 2, D.V); if ((t * 0.9 + 0.2) % 1 < 0.15) destello(x + 16, y + 8, 2, D.R); };
// el pergamino enrollado con su cinta y su lacre (22 × 9)
const ROLLO = SP([
  '..kkkkkkkkkkkkkkkkkk..',
  '.kEEEEEEEEEEEEEEEEEEk.',
  'kEeEEEEEEEQQEEEEEEEeEk',
  'kEeEEEEEEEQqEEEEEEEeEk',
  'kEeEEEEEEkQQkEEEEEEeEk',
  'kEeEEEEEkQqqQkEEEEEeEk',
  'keeeeeeeekQQkeeeeeeeek',
  '.keeeeeeeekkeeeeeeeek.',
  '..kkkkkkkkkkkkkkkkkk..',
]);
// la pluma de escribir: de la punta (x, y) hacia arriba con el ángulo a (0 = vertical), larga l
const pluma = (x, y, a, l = 20) => {
  const dx = Math.sin(a), dy = -Math.cos(a), nx = -dy, ny = dx;
  for (let k = 0; k <= l; k++) { const px = x + dx * k, py = y + dy * k;
    const w = k < 4 ? 0 : k > l - 2 ? 1 : Math.min(3, Math.round(1 + (k - 4) * 0.25 + Math.sin(k * 0.4) * 0.3));
    for (let s = -w; s <= w + 1; s++) R.pset(Math.round(px + nx * s), Math.round(py + ny * s), s === -w || s === w + 1 ? K : s > 0 ? (k % 3 === 0 ? D.w : D.W) : (k % 4 === 1 ? D.w : D.Z));
    R.pset(Math.round(px), Math.round(py), k < 4 ? D.I ?? K : D.e); }
  R.pset(x, y, K); R.pset(Math.round(x + dx), Math.round(y + dy), hex('#22182a'));
};
// el yelmo templario con la cruz de latón (17 × 20)
const YELMO = SP([
  '....kkkkkkkkk....',
  '...kZSSSSSSSsk...',
  '..kZSSSSSSSSSsk..',
  '.kZSSSSSSSSSSsXk.',
  '.kZSSSSSAASSSsXk.',
  '.kSSSSSSAASSSsXk.',
  '.kSAAAAAAAAAAAak.',
  '.kSaaaaaAAaaaaak.',
  '.kkkkkkkkkkkkkkk.',
  '.kSSSSSSAASSSsXk.',
  '.kkkkkkkkkkkkkkk.',
  '.kSSSSSSAASSSsXk.',
  '.kSSkSSSAASSkSXk.',
  '.kSkSkSSAASkSkXk.',
  '.kSSkSSSAASSkSXk.',
  '.kZSSSSSAASSSsXk.',
  '.kZSSSSSAASSSsXk.',
  '.kZSSSSSaaSSSsXk.',
  '..kSSSSSSSSSssk..',
  '..kkkkkkkkkkkkk..',
]);
const yelmo = (x, y, t) => { spr(YELMO, x, y); if ((t * 1.2) % 1.6 < 0.25) { const u = ((t * 1.2) % 1.6) / 0.25; R.pset(x + 3 + Math.round(u * 10), y + 3, D.W); R.pset(x + 2 + Math.round(u * 10), y + 4, D.W); } };
// la caja de campaña del ejército británico: roja, con flejes de hierro, la flecha ancha y monedas (30 × 18)
const CAJA = SP([
  '...kkkkkkkkkkkkkkkkkkkkkkkk...',
  '..kqQQQQQQQQQQQQQQQQQQQQQQqk..',
  '..kqQQQQQQQQQQQQQQQQQQQQQQqk..',
  '..kXXXXXXXXXXXXXXXXXXXXXXXXk..',
  '..knnnnnnnnnnnnnnnnnnnnnnnnk..',
  '.kZSZYSZSYZSZSZYSZSZSYZSZSZSk.',
  '.kSZSYZSZSYSZSZSZYSZSZSSZSZYk.',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
  'kXXXXXXXXXXXXXXXXXXXXXXXXXXXXk',
  'kQQQQQQQQQQQQQkQQQQQQQQQQQQQqk',
  'kQQQQQQQQQQQQkkkQQQQQQQQQQQQqk',
  'kXQQQQQQQQQQkQkQkQQQQQQQQQQQXk',
  'kXQQQQQQQQQQQQkQQQQQQQQQQQQQXk',
  'kXQQQQQQQQQQQQkQQQQQQQQQQQQqXk',
  'kQQQQQQQQQQQQQQQQQQQQQQQQQQQqk',
  'kXXXXXXXXXXXXXXXXXXXXXXXXXXXXk',
  'kqqqqqqqqqqqqqqqqqqqqqqqqqqqqk',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
]);
const caja = (x, y, t) => { spr(CAJA, x, y); if ((t * 1.4) % 1 < 0.18) destello(x + 8 + Math.floor(H(1, Math.floor(t * 1.4)) * 14), y + 5, 2, D.Z); };
// el galeón pequeño (para verlo por el ventanuco), 24 × 15
const GALEON = SP([
  '...........Q............',
  '...........QQ...........',
  '.....W.....k.....W......',
  '....WWW....k....WWW.....',
  '...WWWWW...k...WWWWW....',
  '...WWWWW..WWW..WWWWW....',
  '...wWWWW.WWWWW.wWWWW....',
  '....k....WWWWW...k......',
  '....k....wWWWW...k......',
  '....k......k.....k......',
  'nmmmmmmmmmmmmmmmmmmmmMMk',
  '.nMMMyMMMyMMMyMMMMMMMMk.',
  '..nMMMMMMMMMMMMMMMMMMk..',
  '...nnnnnnnnnnnnnnnnnk...',
]);
// los tesoros en pequeño, para las burbujas de los retratos (caben en 20 × 12)
const MINI = {
  cofre: SP(['.kkkkkkkkkk.', 'kYOYyYOYYOyk', 'kkkkkkkkkkkk', 'kMMMMAAMMMMk', 'kMMMAkkAMMMk', 'kAAAAAAAAAak', 'kmmmmmmmmmmk', 'kkkkkkkkkkkk']),
  oro: SP(['.....kkk......', '....kYOYk.....', '..kkkYYykkk...', '.kYOYkkkYOYk..', '.kYYykYkYYyk..', 'kkkkkYOYkkkkk.', 'kYOYkYYykYOYk.', 'kYYykkkkkYYyk.', '.kkk.....kkk..']),
  corona: SP(['kWk.kWk.kWk', 'kYk.kYk.kYk', 'kYYkYRYkYYk', 'kYYYYYYYYYk', 'kkkkkkkkkkk', 'kABAARAABAk', 'kkkkkkkkkkk']),
  rollo: SP(['..........kk', '.........kWk', '........kWk.', '.kkkkkkkWkk.', 'kEEEEEkWkEEk', 'kEeEEQkkEeEk', 'kEeEQqQEEeEk', 'keeeeQeeeeek', '.kkkkkkkkkk.']),
  yelmo: SP(['.kkkkkkk.', 'kZSSAASsk', 'kSAAAAAak', 'kkkkkkkkk', 'kSSSAASsk', 'kSkSAAkSk', 'kZSSAASsk', '.kkkkkkk.']),
  caja: SP(['.kkkkkkkkkkk.', 'kZSYSZSYSZSk.', 'kkkkkkkkkkkkk', 'kXXXXXXXXXXXk', 'kQQQQQkQQQQQk', 'kQQQQkkkQQQQk', 'kXQQkQkQkQQXk', 'kQQQQQkQQQQqk', 'kkkkkkkkkkkkk']),
};
'''

E['oi-teorias'] = ('Las teorías', '''// OI-TEORIAS (frases 23–25), el gabinete de las teorías (sin año: la barra sale en el último plano). Seis planos:
// 1. el desván: el cavador y el niño se acercan al agujero del suelo, «?» sobre los dos en «pit?»; en «theories» asoma el
//    topo del casco de minero y olfatea, y los dos dan un respingo (corta en «The treasure»);
// 2. el ventanuco de cerca: en «Pirate» sale disparado del agujero un loro pirata que aletea y grita en «Kidd»; por el
//    cristal pasa un galeón; en «Gold» sube el cofre lleno de oro y salta una moneda; el topo lo baja de un tirón y el
//    loro se tira detrás (corta en «Marie»);
// 3. el escritorio de cerca, bajo el retrato de la dama: en «Marie» sube una corona que destella en «jewels»; en
//    «Shakespeare» suben el pergamino y la pluma, que moja en el tintero y garabatea; el topo se lleva la corona (corta
//    en «Some»);
// 4. el agujero a ras del suelo: una luz dorada y sube el yelmo templario, que destella en «Templar»; el topo se lo
//    prueba, le tapa hasta la nariz, y se hunde con él (corta en «hid»);
// 5. bajo el suelo, la madriguera del topo con el montón de tesoros devueltos (el loro sentado en el cofre): por el pozo
//    sube la caja de campaña británica en «war chest»; el topo la arrastra al montón y se rasca el casco en
//    «Revolution» (corta en «Every»);
// 6. la galería de los retratos de los buscadores (1795–2026): una a una se hinchan las burbujas con el tesoro soñado de
//    cada uno, y la barra del año va con ellas; un visitante de hoy las recorre y en «find» se para ante el clavo vacío,
//    con su «?».''', COMUN + OBJ + r'''
const a = (f) => en('teorias', f), b = (f) => en('templarios', f), c = (f) => en('generacion', f);
const P2 = a(0.339), P3 = a(0.687), P4 = b(0), P5 = b(0.549), P6 = c(0);
const pit = a(0.078), theories = a(0.184), pirate = a(0.393), kidd = a(0.449), gold = a(0.529), galleon = a(0.6);
const jewels = a(0.757), shakes = a(0.849), templar = b(0.153), others = b(0.29), chest = b(0.617), revol = b(0.883), find = c(0.869);

// ── 1 · el desván ──
const p1 = (t) => {
  const g = T.gabinete(R, t, {});
  const f = t < theories - 0.15 ? 0 : cl((t - theories + 0.15) / 4.6, 0, 0.42);
  T.topo(R, g.topo[0], g.topo[1], t, { fase: f });
  T.e_bordeAgujero(R);
  const u = tramo(t, 0.1, 1.9), atras = tramo(t, theories + 0.1, theories + 0.5);
  const xc = Math.round(lerp(40, 98, u) - 8 * atras), sorp = t > theories && t < theories + 1.3;
  R.actor(EL.cavador, xc, 160, t, { dir: 1, anda: (u > 0 && u < 1) || (atras > 0 && atras < 1), sorpresa: sorp, dedo: t > theories + 1.5 && t < P2 - 0.3 });
  const v = tramo(t, 0.4, 1.7), xn = Math.round(lerp(232, 202, v));
  R.actor(EL.rickNino, xn, 162, t, { dir: -1, anda: v > 0 && v < 1, sorpresa: sorp, sonrisa: t > theories + 1.3, salto: t > theories && t < theories + 0.3 ? 2 : 0 });
  if (t > pit && t < theories) { const e = tramo(t, pit, pit + 0.25), dy = Math.round((1 - e) * 4);
    R.icono('?', xc + 2, 112 + dy, D.W, K, 2); R.icono('?', xn + 2, 114 + dy, D.W, K, 2); }
  if (t > theories + 0.2 && t < theories + 1.1) R.icono('!', xn + 5, 112, D.Y, K, 2);
};

// ── 2 · el ventanuco de cerca (lo que sale del agujero va al doble, con ampliar) ──
const VX = 150, VY = 62, VR = 38, AX = 160, AY = 156, ARX = 68, ARY = 15;
const hoyo = (cx, cy, rx, ry, sem) => {
  for (let j = -ry - 6; j <= ry + 6; j++) for (let i = -rx - 9; i <= rx + 9; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2 + (H(i, j, sem) - 0.5) * 0.14, x = cx + i, y = cy + j;
    if (y < 0 || y > 179) continue;
    if (d < 1) { const lado = j / ry; R.pset(x, y, lado < -0.15 ? R.tone(pal(['#1a100a', '#3a2416', '#5a3e28', '#7a5a3a']), 0.8 + (lado + 1) * 2 + (Math.floor((j + ry) / 3) % 2) * 0.5 + (H(x, y) - 0.5) * 0.8, x, y) : d < 0.75 ? hex('#0a0604') : hex('#1a100a')); }
    else if (d < 1.5 && H(x, y, sem + 1) < 0.62) R.pset(x, y, H(x, y, sem + 2) < 0.5 ? hex('#5a3e28') : hex('#8a6a42')); }
  for (let q = 0; q < 7; q++) { const an = Math.PI * (0.05 + 0.9 * H(q, 1, sem)) + (q % 2 ? Math.PI : 0), x0 = Math.round(cx + Math.cos(an) * rx), y0 = Math.round(cy + Math.sin(an) * ry), l = 5 + Math.floor(H(q, 2, sem) * 6), dd = q % 3 - 1;
    R.poligono([[x0 - 2, y0], [x0 + 2, y0], [x0 + dd * 3, y0 - l]], MADC[3]); R.linea(x0 - 2, y0, x0 + dd * 3, y0 - l, K); R.pset(x0 + dd * 3, y0 - l + 1, MADC[4]); }
};
const F2 = fijo(() => {
  tablas(0, 0, 319, 127, 13, MAD, { sem: 2, largo: 70, luz: (x, y) => 0.8 - Math.hypot(x - VX, y - VY) / 150 });
  for (let y = 0; y <= 9; y++) R.rect(0, y, 319, y, y === 9 ? K : R.tone(MAD, 1.1 + (y > 6 ? -0.6 : 0), 0, y));
  // la estantería de la izquierda: libros, el barco en la botella y un reloj de arena
  R.rect(6, 58, 86, 61, K); R.rect(7, 58, 85, 59, MADC[4]); R.rect(7, 60, 85, 60, MADC[1]); R.rect(12, 62, 14, 68, K); R.rect(76, 62, 78, 68, K);
  for (const [x0, w, hh, c0] of [[9, 4, 16, '#7a2a2a'], [14, 3, 14, '#2a4a7a'], [18, 4, 17, '#3a6a3a'], [23, 3, 12, '#8a6a2a'], [27, 4, 15, '#5a3a6a']]) { R.rect(x0, 57 - hh, x0 + w, 57, K); R.rect(x0 + 1, 58 - hh, x0 + w - 1, 57, hex(c0)); R.pset(x0 + 1, 60 - hh, hex('#e8c860')); R.pset(x0 + 1, 52, hex('#e8c860')); }
  R.rect(36, 44, 64, 57, K); R.rect(37, 45, 63, 56, hex('#7ab89a')); R.rect(64, 48, 70, 53, K); R.rect(65, 49, 69, 52, hex('#a8763a'));
  R.rect(40, 52, 58, 55, hex('#6a4426')); R.linea(48, 46, 48, 52, K); R.poligono([[43, 51], [48, 47], [48, 51]], D.W); R.poligono([[49, 51], [49, 46], [55, 51]], D.W);
  for (let x = 38; x < 63; x += 3) R.pset(x, 45, hex('#c8f0dc'));
  R.rect(72, 44, 82, 46, K); R.rect(72, 55, 82, 57, K); R.poligono([[73, 47], [81, 47], [77, 51]], hex('#e8d8a0')); R.poligono([[77, 51], [73, 55], [81, 55]], hex('#e8d8a0')); R.rect(76, 52, 78, 54, hex('#c8a060'));
  // el mapa clavado a la derecha (sin letras): la isla, el camino de puntos y la X
  R.rect(224, 40, 266, 80, K); R.rect(225, 41, 265, 79, hex('#e8d0a0'));
  for (let y = 42; y < 79; y++) for (let x = 226; x < 265; x++) if (H(x, y, 7) < 0.14) R.pset(x, y, hex('#d4b884'));
  R.disco(242, 61, 11, hex('#9ab870')); R.disco(249, 57, 7, hex('#9ab870')); R.anillo(242, 61, 11, hex('#5a7a40'));
  R.linea(230, 74, 238, 66, hex('#7a3a2a'), 2); R.linea(238, 66, 247, 59, hex('#7a3a2a'), 2);
  R.linea(245, 55, 251, 61, D.Q); R.linea(251, 55, 245, 61, D.Q);
  for (const [x, y] of [[226, 42], [264, 42], [226, 78], [264, 78]]) R.pset(x, y, D.A);
  // el catalejo apoyado en la pared y el rollo de cuerda colgado
  R.linea(204, 82, 228, 128, K); R.linea(205, 82, 229, 128, hex('#b08840')); R.linea(206, 82, 230, 128, hex('#7a5a2a')); R.rect(201, 78, 208, 83, K); R.rect(202, 79, 207, 82, D.A);
  for (let k = 0; k < 4; k++) R.anillo(284, 92, 12 - k * 3, k % 2 ? hex('#a8884a') : hex('#d8b878')); R.disco(284, 92, 2, MAD[0]); R.linea(284, 66, 284, 80, hex('#a8884a')); R.rect(282, 64, 286, 66, K);
  // la telaraña de la esquina
  for (let k = 0; k < 5; k++) R.linea(0, 10, 26 - k * 5, 10 + k * 6, hex('#b8b0a8'));
  for (let r = 6; r < 26; r += 6) for (let k = 0; k < 5; k++) R.pset(Math.round((26 - k * 5) * r / 26), Math.round(10 + k * 6 * r / 26), hex('#d8d0c8'));
  // el aro de latón del ventanuco, con remaches
  for (let j = -VR - 8; j <= VR + 8; j++) for (let i = -VR - 8; i <= VR + 8; i++) { const d = Math.hypot(i, j); if (d < VR || d > VR + 7) continue;
    const l = -(i + j) / (VR * 1.4); R.pset(VX + i, VY + j, d > VR + 6.2 || d < VR + 0.8 ? K : R.tone(pal(['#6a4a14', '#a8801c', '#e8c030', '#fff0a0']), 1.6 + l * 1.6, VX + i, VY + j)); }
  for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6, x = Math.round(VX + Math.cos(an) * (VR + 3.5)), y = Math.round(VY + Math.sin(an) * (VR + 3.5)); R.rect(x, y, x + 1, y + 1, hex('#6a4a14')); R.pset(x, y, hex('#fff0a0')); }
  // el zócalo, el suelo de tablas y el agujero
  R.rect(0, 122, 319, 127, K); R.rect(0, 123, 319, 125, MAD[3]); R.rect(0, 126, 319, 126, MAD[1]);
  tablas(0, 128, 319, 179, 8, MADC, { horiz: true, sem: 4, largo: 60, luz: (x, y) => (y - 128) * 0.015 + (Math.abs(x - 130 - (y - 128) * 0.8) < 30 ? 0.7 : 0) });
  hoyo(AX, AY, ARX, ARY, 30);
  // la palanca y una vela en su palmatoria en el suelo
  R.linea(14, 172, 52, 160, K); R.linea(14, 171, 52, 159, hex('#7a7a8a')); R.linea(52, 159, 56, 154, K);
  R.rect(270, 160, 284, 165, K); R.rect(271, 161, 283, 164, D.A); R.rect(274, 148, 280, 160, hex('#f0e8d0')); R.rect(274, 148, 274, 160, hex('#d8ccb0'));
});
// lo que se ve por el cristal: cielo tramado, nubes a tres velocidades, la isla, el mar con brillos, gaviotas y el galeón
const ventana = (t, gal) => {
  const dentro = (x, y) => (x - VX) ** 2 + (y - VY) ** 2 < VR * VR, HZ = VY + 12;
  const CI = pal(['#4a8ad8', '#6aaae8', '#8ac4f2', '#b4dcf8', '#e0f2fc']), MAR = pal(['#1a4a7a', '#2a6aa0', '#3a86c0', '#6ab0e0', '#c8e8f8']);
  for (let y = VY - VR; y <= VY + VR; y++) for (let x = VX - VR; x <= VX + VR; x++) { if (!dentro(x, y)) continue;
    if (y < HZ) R.pset(x, y, R.tone(CI, 0.6 + (y - (VY - VR)) / 13, x, y));
    else { const o = Math.sin(x * 0.4 + t * 2 + y) * Math.sin(x * 0.13 - t * 1.3); R.pset(x, y, R.tone(MAR, 2.4 - (y - HZ) / 12 + (o > 0.6 ? 1.4 : 0), x, y)); } }
  for (let x = VX + 12; x <= VX + 36; x++) for (let y = HZ - 6; y < HZ; y++) if (dentro(x, y) && y > HZ - Math.round(5 * Math.sin((x - VX - 12) / 24 * Math.PI))) R.pset(x, y, hex('#2a5a3a'));
  for (const x of [VX + 17, VX + 22, VX + 27, VX + 31]) for (let j = 0; j < 6; j++) for (let i = -Math.floor(j / 2); i <= Math.floor(j / 2); i++) if (dentro(x + i, HZ - 11 + j)) R.pset(x + i, HZ - 11 + j, hex('#1e4a2e'));
  for (const [x0, y, w, v] of [[90, VY - 22, 24, 2.5], [170, VY - 10, 30, 1.4], [130, VY + 4, 16, 4]]) { const x = ((x0 + t * v - 100) % 130 + 130) % 130 + 95;
    for (const [dx, dy, r, cc] of [[0, 1, w * 0.3, '#a8c8e4'], [0, 0, w * 0.3, '#d2e6f6'], [-w * 0.28, 2, w * 0.22, '#d2e6f6'], [w * 0.28, 2, w * 0.24, '#d2e6f6'], [-2, -2, w * 0.22, '#ffffff']])
      for (let j = -Math.ceil(r); j <= r; j++) for (let i = -Math.ceil(r); i <= r; i++) if (i * i + j * j <= r * r && dentro(Math.round(x + dx + i), Math.round(y + dy + j))) R.pset(Math.round(x + dx + i), Math.round(y + dy + j), hex(cc)); }
  if (gal != null) { const gx = Math.round(gal), gy = HZ - 12 + Math.round(Math.sin(t * 2.2)); for (let j = 0; j < GALEON.length; j++) for (let i = 0; i < 24; i++) { const cc = D[GALEON[j][i]]; if (cc != null && dentro(gx + i, gy + j)) R.pset(gx + i, gy + j, cc); }
    for (let k = 0; k < 5; k++) if (dentro(gx + k * 4, gy + 14)) R.pset(gx + k * 4 - ((t * 6 + k) % 2 | 0), gy + 14, D.W); }
  for (const [x0, y0, v] of [[120, VY - 16, 9], [150, VY - 24, 7]]) { const x = Math.round(((x0 + t * v) - 115) % 75 + 115), y = y0 + Math.round(Math.sin(t * 3 + x0) * 2), ab = Math.sin(t * 10 + x0) > 0;
    for (const [i, j] of [[0, 0], [-1, ab ? -1 : 0], [-2, ab ? -2 : 0], [1, ab ? -1 : 0], [2, ab ? -2 : 0]]) if (dentro(x + i, y + j)) R.pset(x + i, y + j, D.W); }
  for (let k = 0; k < 26; k++) { const x = VX - 22 + k, y = VY - 4 - k; if (dentro(x, y) && k % 2 === 0) R.pset(x, y, hex('#f0f8ff')); if (dentro(x + 6, y + 4) && k % 3 === 0) R.pset(x + 6, y + 4, hex('#e0f0ff')); }
};
const p2 = (t) => {
  F2.copia(); ventana(t, lerp(VX - 50, VX + 30, tramo(t, P2, P3)));
  llama(277, 147, t);
  for (let k = 0; k < 14; k++) { const x = Math.round(110 + ((k * 37 + t * 4) % 90)), y = Math.round(100 + ((k * 23 + t * 3) % 50)); if (Math.sin(t * 2 + k) > 0) R.pset(x, y, hex('#f8e8b0')); }
  const sube = tramo(t, gold - 0.05, gold + 0.45), baja = tramo(t, galleon + 0.35, P3 - 0.1), sal = tramo(t, pirate - 0.1, pirate + 0.6), vuelve = tramo(t, P3 - 0.7, P3 - 0.1);
  ampliar(() => {
    // el cofre (al doble): sube del agujero, suelta una moneda y el topo lo baja
    const cy = Math.round(lerp(92, 50, sube) + lerp(0, 46, baja));
    if (sube > 0) { cofre(52, cy, t); const m = tramo(t, gold + 0.5, gold + 1.2); if (m > 0 && m < 1) moneda(Math.round(lerp(72, 96, m)), Math.round(cy - 2 - 16 * Math.sin(m * Math.PI) + m * 22), false, t * 9); }
    if (t > galleon) { const ft = cl((t - galleon) / (P3 - galleon)); T.topo(R, 98, 80, t, { fuera: ft < 0.2 ? ft / 0.2 : ft < 0.5 ? 1 : 1 - (ft - 0.5) / 0.5, mira: -1 }); }
    if (sal > 0) { const lx = lerp(70, 28 + Math.sin(t * 2.3) * 14, sal) + vuelve * 40, ly = lerp(86, 22 + Math.sin(t * 3.1) * 5, sal) + vuelve * 70;
      loro(Math.round(lx), Math.round(ly), t, { dir: vuelve > 0 ? 1 : Math.cos(t * 2.3) > 0 ? 1 : -1, ala: vuelve > 0 ? 0.8 : Math.sin(t * 22), pico: t > kidd && t < kidd + 0.8 });
      for (let k = 0; k < 3; k++) { const pu = cl((t - pirate - 0.2 - k * 0.5) / 2.2); if (pu > 0 && pu < 1) { const fx = Math.round(70 + k * 9 + Math.sin(t * 3 + k) * 4), fy = Math.round(36 + pu * 44); R.pset(fx, fy, D.G); R.pset(fx + 1, fy, D.L); } } }
  });
  delante(F2, AX - ARX - 10, AY, AX + ARX + 10, 179, (x, y) => (x - AX) ** 2 / (ARX * ARX) + (y - AY) ** 2 / (ARY * ARY) >= 1);
  if (sal > 0 && t > kidd && t < kidd + 0.8) { const lx = lerp(70, 28 + Math.sin(t * 2.3) * 14, sal) * 2; R.icono('!', Math.round(lx) + 40, 20, D.Y, K, 2); }
};

// ── 3 · el escritorio bajo el retrato de la dama ──
const F3 = fijo(() => {
  tablas(0, 0, 319, 139, 11, MAD, { sem: 5, largo: 80, luz: (x, y) => 0.5 - Math.hypot(x - 300, y - 90) / 260 });
  for (let y = 0; y <= 9; y++) R.rect(0, y, 319, y, y === 9 ? K : MAD[1]);
  R.rect(0, 132, 131, 139, K); R.rect(0, 133, 131, 135, MAD[3]); R.rect(0, 136, 131, 138, MAD[1]);
  // el retrato de la dama: marco dorado con molduras, fondo verde, la dama con el pelo empolvado y el collar
  R.rect(150, 16, 222, 92, K);
  for (let y = 17; y <= 91; y++) for (let x = 151; x <= 221; x++) { const b = Math.min(x - 151, 221 - x, y - 17, 91 - y); if (b < 6) R.pset(x, y, b === 0 || b === 5 ? hex('#6a4a14') : R.tone(pal(['#8a6a1c', '#c8a030', '#f0d060', '#fff4b0']), 1.5 + (b === 2 ? 1 : 0) - (x + y) / 400 + ((x + y) % 5 === 0 ? 0.6 : 0), x, y)); }
  for (let y = 23; y <= 85; y++) for (let x = 157; x <= 215; x++) R.pset(x, y, R.tone(pal(['#1e3a2a', '#2a4e38', '#3a6448']), 1 + (H(x, y, 11) - 0.5) * 0.8 - (y - 23) / 60, x, y));
  R.disco(186, 45, 13, hex('#e8e4ec')); R.disco(186, 38, 9, hex('#f4f2f6')); for (let k = 0; k < 14; k++) R.pset(176 + Math.floor(H(k, 1, 12) * 20), 34 + Math.floor(H(k, 2, 12) * 22), hex('#c8c4d0'));
  R.disco(186, 52, 7, hex('#f2c8a8')); R.disco(186, 54, 6, hex('#f2c8a8')); R.pset(183, 52, K); R.pset(189, 52, K); R.pset(185, 57, hex('#c84a5a')); R.pset(186, 57, hex('#c84a5a')); R.pset(182, 55, hex('#f0a0a0')); R.pset(190, 55, hex('#f0a0a0'));
  R.poligono([[168, 85], [172, 64], [186, 61], [200, 64], [204, 85]], hex('#6a8ac8')); R.poligono([[178, 85], [182, 66], [190, 66], [194, 85]], hex('#a8c0e8'));
  R.poligono([[180, 62], [186, 70], [192, 62]], hex('#f2c8a8'));
  for (let i = -6; i <= 6; i += 2) R.pset(186 + i, 65 + Math.round(Math.abs(i) * -0.3 + 2), D.Z);
  // el aplique con su vela a la izquierda y la estantería con frascos a la derecha (bajo la zona de Atom)
  R.rect(26, 62, 34, 66, K); R.rect(27, 63, 33, 65, D.A); R.rect(29, 48, 31, 62, hex('#f0e8d0')); R.rect(29, 66, 31, 72, K);
  R.rect(236, 62, 316, 65, K); R.rect(237, 62, 315, 63, MADC[4]);
  for (const [x0, w, hh, c0] of [[240, 6, 12, '#3a7a5a'], [248, 5, 9, '#8a3a6a'], [256, 7, 14, '#c8a040'], [266, 4, 8, '#3a5a9a'], [272, 8, 11, '#7a5a3a'], [284, 5, 13, '#5a8aaa'], [292, 9, 7, '#aa4a3a'], [304, 6, 10, '#4a6a3a']]) { R.rect(x0, 61 - hh, x0 + w, 61, K); R.rect(x0 + 1, 62 - hh, x0 + w - 1, 61, hex(c0)); R.pset(x0 + 1, 63 - hh, D.W); R.rect(x0 + 1, 61 - hh - 2, x0 + w - 1, 62 - hh, K); }
  // el mapa de la isla a la izquierda, clavado
  R.rect(56, 24, 112, 60, K); R.rect(57, 25, 111, 59, hex('#e8d0a0')); for (let y = 26; y < 59; y++) for (let x = 58; x < 111; x++) if (H(x, y, 31) < 0.12) R.pset(x, y, hex('#d4b884'));
  R.disco(80, 42, 12, hex('#9ab870')); R.disco(92, 38, 8, hex('#9ab870')); R.anillo(80, 42, 12, hex('#5a7a40')); R.linea(88, 40, 92, 44, D.Q); R.linea(92, 40, 88, 44, D.Q); R.linea(64, 54, 86, 42, hex('#7a3a2a'), 2);
  // la mesa de nogal: tablero, cajones con tiradores de latón y patas torneadas
  R.rect(132, 106, 319, 113, K);
  for (let y = 107; y <= 112; y++) for (let x = 133; x <= 319; x++) R.pset(x, y, R.tone(MADC, (y === 107 ? 3.6 : 2.2) + Math.sin(x * 0.2 + y) * 0.4, x, y));
  tablas(138, 114, 319, 160, 46, MAD, { sem: 6, largo: 400 });
  for (const x0 of [146, 192, 238, 284]) { R.rect(x0, 120, x0 + 36, 140, K); R.rect(x0 + 1, 121, x0 + 35, 139, MAD[2]); R.rect(x0 + 1, 121, x0 + 35, 121, MAD[4]); R.rect(x0 + 16, 128, x0 + 20, 131, K); R.rect(x0 + 17, 129, x0 + 19, 130, D.A); }
  for (const x0 of [140, 312]) { R.rect(x0, 140, x0 + 6, 166, K); R.rect(x0 + 1, 141, x0 + 5, 166, MAD[3]); R.rect(x0 + 2, 148, x0 + 4, 150, MAD[1]); }
  // encima de la mesa: el libro abierto con renglones, el tintero, la vela, la lupa y una pila de libros
  R.poligono([[226, 104], [234, 96], [258, 98], [262, 106]], K); R.poligono([[228, 104], [235, 97], [246, 98], [246, 105]], D.E); R.poligono([[246, 98], [257, 99], [260, 105], [246, 105]], hex('#e8d4a0'));
  for (let k = 0; k < 4; k++) { R.linea(236 - k, 100 + k, 244, 100 + k, hex('#a89070'), 2); R.linea(248, 100 + k, 256 + k * 0.5, 100 + k, hex('#a89070'), 2); }
  R.rect(274, 96, 284, 106, K); R.rect(275, 97, 283, 105, hex('#2a2a4a')); R.rect(277, 93, 281, 96, K); R.rect(278, 94, 280, 95, hex('#4a4a6a')); R.pset(276, 98, hex('#8a8ab8'));
  R.rect(296, 100, 306, 106, K); R.rect(297, 101, 305, 105, D.A); R.rect(299, 84, 303, 100, hex('#f0e8d0')); R.rect(299, 84, 299, 100, hex('#d8ccb0'));
  R.rect(198, 96, 222, 106, K); for (let k = 0; k < 3; k++) { R.rect(199, 97 + k * 3, 221, 98 + k * 3, hex(['#7a2a2a', '#2a4a7a', '#3a6a3a'][k])); R.pset(219, 97 + k * 3, D.A); }
  R.anillo(192, 102, 3, hex('#c8a040')); R.linea(194, 104, 197, 106, MAD[0]);
  // el suelo de tablas y el agujero a la izquierda
  tablas(0, 140, 137, 179, 7, MADC, { horiz: true, sem: 7, largo: 50 }); tablas(138, 161, 319, 179, 7, MADC, { horiz: true, sem: 8, largo: 50 });
  R.rect(0, 139, 137, 139, K);
  hoyo(66, 160, 52, 12, 40);
  R.linea(92, 178, 128, 168, K); R.linea(92, 177, 128, 167, hex('#6a6a7a'));
  for (const x0 of [140, 312]) { R.rect(x0, 160, x0 + 6, 168, K); R.rect(x0 + 1, 160, x0 + 5, 167, MAD[3]); R.rect(x0 - 1, 166, x0 + 7, 168, K); }
  R.rect(138, 161, 319, 161, MAD[0]);
});
const llama = (x, y, t) => { const f = Math.sin(t * 13 + x) > 0 ? 1 : 0; R.halo(x, y - 2, 7, [hex('#f8d890'), hex('#fff0c0')], 0.45); R.rect(x - 1, y - 3 - f, x + 1, y, hex('#f8a030')); R.pset(x, y - 4 - f, hex('#f8d040')); R.pset(x, y - 1, D.W); };
const p3 = (t) => {
  F3.copia(); llama(30, 47, t); llama(301, 83, t);
  if ((t * 0.8) % 1 < 0.12) destello(186, 66, 2);
  for (let k = 0; k < 10; k++) { const x = Math.round(20 + ((k * 41 + t * 3) % 280)), y = Math.round(30 + ((k * 29 + t * 5) % 90)); if (Math.sin(t * 1.5 + k) > 0.3) R.pset(x, y, hex('#c8a878')); }
  // la corona sube del agujero y flota junto al retrato; el topo la coge y se la lleva
  const sube = tramo(t, P3 + 0.05, jewels - 0.05), coge = tramo(t, shakes + 1.45, shakes + 1.85), baja = tramo(t, shakes + 1.9, P4 - 0.15);
  const r = tramo(t, shakes - 0.25, shakes + 0.4), pl = tramo(t, shakes - 0.1, shakes + 0.5), moja = tramo(t, shakes + 0.5, shakes + 0.8), esc = tramo(t, shakes + 0.85, P4 - 0.2);
  ampliar(() => {
    let crx = Math.round(lerp(28, 52, sube)), cry = Math.round(lerp(88, 28, sube) + Math.sin(t * 2.4) * 1.5);
    if (coge > 0) { crx = Math.round(lerp(52, 24, coge)); cry = Math.round(lerp(28, 58, coge)); }
    if (baja > 0) cry = Math.round(58 + baja * 30);
    if (sube > 0) { corona(crx, cry, t); if (t > jewels && t < jewels + 0.9) { destello(crx + 4, cry + 8, 2, D.V); destello(crx + 16, cry + 8, 2, D.R); destello(crx + 10, cry + 2, 3); } }
    if (t > shakes + 1.0) { const ft = cl((t - shakes - 1.0) / (P4 - shakes - 1.0)); T.topo(R, 33, 82, t, { fuera: ft < 0.2 ? ft / 0.2 : ft < 0.55 ? 1 : 1 - (ft - 0.55) / 0.45, mira: 1 }); }
    if (r > 0) { const rx = Math.round(lerp(26, 70, r)), ry = Math.round(lerp(86, 44, r) - Math.sin(r * Math.PI) * 18); spr(ROLLO, rx, ry);
      if (esc > 0) for (let k = 0; k < Math.floor(esc * 36); k++) { const fila = Math.floor(k / 12), i = k % 12; R.pset(rx + 5 + i, ry + 2 + fila * 2 + (fila === 1 ? 1 : 0) + Math.round(Math.sin(i * 1.3 + fila) * 0.5), hex('#2a1a3a')); } }
    if (pl > 0) {
      let px = lerp(34, 139, pl), py = lerp(86, 44, pl) - Math.sin(pl * Math.PI) * 20, an = 0.3;
      if (moja > 0) py = lerp(44, 48, Math.sin(moja * Math.PI));
      if (esc > 0) { px = 75 + (esc * 3 % 1) * 12 + Math.sin(t * 30); py = 46 + Math.floor(esc * 3) * 2; an = 0.55 + Math.sin(t * 25) * 0.15; }
      pluma(Math.round(px), Math.round(py), an, 13);
    }
  });
  delante(F3, 0, 160, 130, 179, (x, y) => (x - 66) ** 2 / (52 * 52) + (y - 160) ** 2 / 144 >= 1);
};

// ── 4 · el agujero a ras del suelo ──
const F4 = fijo(() => {
  // la pared del fondo en penumbra, con el escudo y el soporte vacío del yelmo, el barril, el timón y un farol en la viga
  tablas(0, 0, 319, 92, 15, pal(['#1a100a', '#2a1a10', '#3a2618', '#4e3420', '#64442a']), { sem: 9, largo: 100, luz: (x, y) => 0.7 - Math.abs(x - 170) / 190 });
  for (let y = 0; y <= 8; y++) R.rect(0, y, 319, y, y === 8 ? K : hex('#1a100a'));
  R.poligono([[60, 30], [92, 30], [92, 58], [76, 74], [60, 58]], K); R.poligono([[62, 32], [90, 32], [90, 57], [76, 71], [62, 57]], hex('#e8e0d0'));
  R.rect(73, 33, 79, 69, hex('#b83030')); R.rect(63, 44, 89, 50, hex('#b83030')); R.linea(63, 33, 63, 56, D.W);
  R.rect(226, 46, 242, 90, K); R.rect(229, 46, 239, 88, hex('#5a3a22')); R.rect(222, 44, 246, 47, K); R.rect(223, 44, 245, 45, hex('#7a5232'));
  R.rect(14, 54, 46, 92, K); for (let x = 15; x <= 45; x++) for (let y = 55; y <= 92; y++) R.pset(x, y, R.tone(MAD, 2 + Math.sin((x - 15) / 30 * Math.PI) * 1.4 - 0.6, x, y)); for (const y of [62, 84]) R.rect(14, y, 46, y + 2, hex('#3a3a46'));
  R.rect(22, 44, 34, 54, K); for (let k = 0; k < 3; k++) R.rect(24 + k * 3, 46 - k, 25 + k * 3, 53, hex(['#7a2a2a', '#2a4a7a', '#c8a040'][k]));
  for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; R.linea(286, 56, Math.round(286 + Math.cos(an) * 22), Math.round(56 + Math.sin(an) * 22), hex('#5a3a22')); } R.anillo(286, 56, 16, hex('#6a4426')); R.anillo(286, 56, 15, hex('#4a2e1a')); R.disco(286, 56, 4, hex('#7a5232'));
  for (let k = 0; k < 5; k++) R.linea(120 + k * 12, 8, 132 + k * 12, 92, hex('#2e1e12'));
  // el suelo de tablas en perspectiva, que se va hacia el fondo
  for (let y = 93; y <= 179; y++) { const pr = (y - 84) / 95, z = 30 / pr;
    for (let x = 0; x <= 319; x++) { const wx = (x - 160) / pr + 1000, k = Math.floor(wx / 34), u = (wx / 34) % 1, zz = z + H(k, 3, 16) * 40;
      const borde = u * 34 * pr < 1.0, junta = ((zz / 22) % 1) < 0.06 / pr * 0.35;
      const v = 1.5 + pr * 1.3 + (H(k, 1, 17) - 0.5) * 1.1 + (Math.sin(zz * 0.9 + u * 6 + k) > 0.8 ? -0.7 : 0) + (Math.abs(x - 150 - (y - 150) * 0.9) < 28 ? 0.8 : 0);
      R.pset(x, y, borde || junta ? MADC[0] : R.tone(MADC, v, x, y)); } }
  R.rect(0, 92, 319, 93, K);
  hoyo(160, 134, 74, 16, 50);
  // los flecos de la alfombra a la izquierda, la palanca y el farol en el suelo a la derecha
  for (let y = 150; y <= 179; y++) for (let x = 0; x <= 40 - (179 - y) * 0.6; x++) R.pset(x, y, R.tone(pal(['#5a1a1a', '#8a2a2a', '#b83a3a', '#d8a040']), 1.6 + ((x + y) % 9 < 2 ? 1.4 : 0) + (H(x, y, 21) - 0.5), x, y));
  for (let y = 152; y <= 179; y += 2) { const x = Math.round(41 - (179 - y) * 0.6); R.linea(x, y, x + 4, y + 1, hex('#e8d8a0')); }
  R.linea(232, 176, 300, 156, K); R.linea(232, 175, 300, 155, hex('#7a7a8a')); R.linea(298, 155, 305, 150, K);
  R.rect(262, 112, 280, 140, K); R.rect(264, 116, 278, 136, hex('#f8d890')); R.rect(266, 118, 276, 134, hex('#fff0c0')); R.rect(262, 108, 280, 112, K); R.rect(267, 102, 275, 108, K); R.rect(262, 136, 280, 140, hex('#3a3a46'));
  for (const x of [264, 270, 276]) R.rect(x, 116, x, 136, hex('#3a3a46'));
  for (const [x, y] of [[96, 162], [104, 168], [222, 160], [230, 170]]) { R.rect(x, y, x + 3, y + 2, hex('#5a3e28')); R.pset(x, y, hex('#8a6a42')); }
});
const p4 = (t) => {
  F4.copia();
  R.halo(271, 126, 22, [hex('#5a4020'), hex('#8a6a3a')], 0.35); R.rect(269, 124 - (Math.sin(t * 11) > 0 ? 1 : 0), 273, 130, hex('#f8a030')); R.pset(271, 122, hex('#f8d040'));
  for (let k = 0; k < 18; k++) { const y = Math.round(12 + ((k * 17 + t * 6) % 110)), x = Math.round(118 + ((k * 31) % 50) + (y - 12) * 0.35); if ((x + y + k) % 3) R.pset(x, y, hex('#c8a878')); }
  const luz = tramo(t, P4, P4 + 0.6) * (1 - tramo(t, b(0.85), P5));
  if (luz > 0) R.halo(160, 136, Math.round(36 * luz), [hex('#6a4a14'), hex('#c8902c'), hex('#f8d040')], 0.7);
  const sube = tramo(t, P4 + 0.4, templar - 0.05), sale = tramo(t, b(0.2), b(0.25)), encima = tramo(t, b(0.3), b(0.36)), hunde = tramo(t, b(0.45), P5 - 0.1);
  ampliar(() => {
    const fuera = sale * (1 - hunde);
    let yx = 64 + Math.round(Math.sin(t * 1.3) * 2), yy = Math.round(lerp(80, 30, sube) + Math.sin(t * 2.1) * 1.5);
    let tp = null;
    if (fuera > 0.02) tp = T.topo(R, 88, 68, t, { fuera, mira: encima > 0 ? 0 : -1, casco: encima < 0.6 });
    if (encima > 0) { const cx = tp ? tp.cabeza[0] - 8 : 80, cyy = tp ? tp.cabeza[1] - 8 : 40; yx = Math.round(lerp(yx, cx, encima)); yy = Math.round(lerp(yy, cyy, encima)) + (encima >= 1 ? Math.round(Math.sin(t * 9) * 0.6) : 0); }
    if (sube > 0 && !(tp == null && encima > 0.5)) { yelmo(yx, yy, t); if (t > templar && t < templar + 0.8) { destello(yx + 8, yy + 6, 3); destello(yx + 2, yy + 1, 2); } }
  });
  delante(F4, 70, 134, 250, 179, (x, y) => (x - 160) ** 2 / (74 * 74) + (y - 134) ** 2 / 256 >= 1);
  if (encima >= 0.8 && hunde < 0.15) R.icono('!', 196, 64, D.Y, K, 2);
};

// ── 5 · la madriguera bajo el suelo ──
const SX = 22, SW = 66, CX = 210, CY = 122, CRX = 106, CRY = 50;
const F5 = fijo(() => {
  // arriba, el desván en penumbra: la pared, las patas del escritorio, la alfombra y una papelera
  tablas(0, 0, 319, 26, 14, pal(['#1a100a', '#2a1a10', '#3a2618', '#4e3420', '#64442a']), { sem: 10 });
  R.rect(226, 4, 319, 6, K); R.rect(230, 6, 236, 26, K); R.rect(231, 6, 235, 26, hex('#5a3a22')); R.rect(300, 6, 306, 26, K); R.rect(301, 6, 305, 26, hex('#5a3a22'));
  R.rect(110, 22, 200, 26, hex('#8a2a2a')); for (let x = 112; x < 200; x += 6) R.rect(x, 23, x + 2, 24, hex('#d8a040'));
  R.rect(262, 14, 272, 26, K); R.rect(263, 15, 271, 26, hex('#c8a040'));
  // el suelo en sección: tablas y vigas
  R.rect(0, 27, 319, 33, K); for (let x = 0; x < 320; x++) for (let y = 28; y <= 32; y++) R.pset(x, y, x % 24 === 0 ? MADC[0] : R.tone(MADC, 2.4 + Math.sin(x * 0.3) * 0.3 + (y === 28 ? 1 : 0), x, y));
  const VIG = [100, 156, 212, 268];
  // la tierra en capas: mantillo con raíces, arcilla roja con piedras, grava y arcilla azul
  const CAPAS = [[33, pal(['#2a1a10', '#3e2a1a', '#523a24', '#6a4c30'])], [64, pal(['#5a2a1a', '#7a3a22', '#9a4e2c', '#b8683a'])], [104, pal(['#4a4038', '#6a5e52', '#8a7e70', '#aaa090'])], [146, pal(['#2a3a4a', '#3a4e60', '#4e6478', '#6a8094'])]];
  for (let y = 33; y <= 179; y++) for (let x = 0; x <= 319; x++) {
    const ond = Math.sin(x * 0.05) * 3 + Math.sin(x * 0.13) * 1.5; let k = 0; for (let q = 0; q < CAPAS.length; q++) if (y >= CAPAS[q][0] + ond) k = q;
    const v = 1.6 + (H(x, y, 22) - 0.5) * 1.1 + (H(Math.floor(x / 4), Math.floor(y / 3), 23) - 0.5) * 0.9; R.pset(x, y, R.tone(CAPAS[k][1], v, x, y)); }
  for (const x0 of VIG) { R.rect(x0, 33, x0 + 14, 44, K); for (let x = x0 + 1; x < x0 + 14; x++) for (let y = 34; y < 44; y++) R.pset(x, y, R.tone(MAD, 2 + ((Math.hypot(x - x0 - 7, y - 39) | 0) % 3 === 0 ? -0.8 : 0), x, y)); }
  for (let q = 0; q < 80; q++) { const x = Math.floor(H(q, 1, 24) * 320), y = 46 + Math.floor(H(q, 2, 24) * 130), r = 1 + Math.floor(H(q, 3, 24) * 3); R.disco(x, y, r, K); R.disco(x, y, Math.max(0, r - 1), hex(['#8a8a90', '#a8a098', '#6a6a72'][q % 3])); R.pset(x - 1, y - 1, hex('#d0ccc4')); }
  for (let q = 0; q < 9; q++) { let x = 10 + q * 36 + H(q, 4, 25) * 10, y = 44; for (let s = 0; s < 28; s++) { x += Math.sin(s * 0.5 + q) * 0.8; y += 1; R.pset(Math.round(x), y, hex('#c8a878')); if (s % 7 === 3) R.pset(Math.round(x) + 1, y + 1, hex('#a88858')); } }
  // el pozo del topo: de la boca del suelo hasta abajo, con la pared de tierra picada
  for (let y = 27; y <= 179; y++) for (let x = SX; x <= SX + SW; x++) { const e = Math.min(x - SX, SX + SW - x); R.pset(x, y, e === 0 ? K : R.tone(pal(['#0e0806', '#1a100a', '#2e1e12', '#44301c']), (e < 6 ? 2.4 - e * 0.25 : 0.7) + (H(x, Math.floor(y / 2), 26) - 0.5) * 0.9 + (y < 60 ? (60 - y) / 30 : 0), x, y)); }
  for (let y = 40; y < 179; y += 9) { R.pset(SX + 3, y, hex('#6a4a30')); R.pset(SX + SW - 3, y + 4, hex('#6a4a30')); }
  // la luz que baja de la boca, las marcas de las zarpas, piedras en las paredes y la escalera de raíces del topo
  for (let y = 34; y < 179; y++) for (let x = SX + 14; x < SX + SW - 14; x++) if (H(x, y, 32) < 0.22 - (y - 34) / 900 && (x + y) % 2) R.pset(x, y, hex('#4a3420'));
  for (let q = 0; q < 14; q++) { const lado = q % 2, x = lado ? SX + SW - 4 : SX + 4, y = 50 + q * 9; for (let k = 0; k < 3; k++) R.linea(x - (lado ? 3 : -1) + k * 2 * (lado ? 1 : -1) * 0, y + k * 2, x + (lado ? 0 : 3), y + k * 2 + 3, hex('#140c08')); }
  for (let q = 0; q < 8; q++) { const x = q % 2 ? SX + 2 : SX + SW - 4, y = 56 + q * 15; R.disco(x, y, 2, K); R.disco(x, y, 1, hex('#8a8a90')); }
  R.linea(SX + 30, 34, SX + 30, 179, hex('#8a6a42')); R.linea(SX + 31, 34, SX + 31, 179, hex('#c8a878'));
  for (let y = 44; y < 179; y += 12) { R.linea(SX + 24, y, SX + 37, y + 1, hex('#5a3e28')); R.linea(SX + 24, y - 1, SX + 37, y, hex('#a8884a')); R.pset(SX + 30, y, hex('#e8d0a0')); }
  // la galería y la madriguera: la cámara redonda con suelo apisonado, raíces que cuelgan y su mobiliario
  for (let x = SX + SW; x <= CX - CRX + 10; x++) for (let y = 128; y <= 172; y++) { const r = Math.abs(y - 150) / 22; if (r <= 1) R.pset(x, y, r > 0.93 ? K : R.tone(pal(['#1a100a', '#2a1a10', '#3a2618']), 1.4 - r + (H(x, y, 27) - 0.5) * 0.5, x, y)); }
  for (let j = -CRY; j <= CRY; j++) for (let i = -CRX; i <= CRX; i++) { const d = (i / CRX) ** 2 + (j / CRY) ** 2; if (d > 1) continue; const x = CX + i, y = CY + j; if (y > 179 || x > 319) continue;
    R.pset(x, y, d > 0.96 ? K : y > 166 ? R.tone(pal(['#3a2416', '#5a3e28', '#7a5a3a']), 1.4 + (H(x, y, 28) - 0.5), x, y) : R.tone(pal(['#2a1a10', '#3e2a1a', '#523a24', '#6a4c30']), 2.4 - d * 1.8 + (H(Math.floor(x / 3), Math.floor(y / 3), 29) - 0.5) * 1.2 + ((x * 3 + y * 5) % 23 === 0 ? 0.8 : 0), x, y)); }
  for (let x = CX - CRX + 8; x < 320; x++) { R.pset(x, 166, hex('#2a1a10')); if (x % 7 === 0) R.pset(x, 168, hex('#8a6a42')); }
  for (let q = 0; q < 6; q++) { let x = 130 + q * 30, y = CY - CRY + 6 + (q % 2) * 4; for (let s = 0; s < 8 + (q % 3) * 3; s++) { x += Math.sin(s + q) * 0.6; y += 1; R.pset(Math.round(x), y, hex('#c8a878')); } }
  // un cuadrito de la isla colgado de una raíz, la seta-lámpara y la cama de hojas
  R.rect(286, 92, 304, 106, K); R.rect(287, 93, 303, 105, hex('#e8d0a0')); R.disco(295, 99, 4, hex('#9ab870')); R.pset(296, 98, D.Q); R.linea(295, 84, 289, 92, hex('#c8a878')); R.linea(295, 84, 301, 92, hex('#c8a878'));
  R.disco(306, 162, 12, hex('#7a8a3a')); R.disco(304, 160, 10, hex('#9aaa4a')); for (let k = 0; k < 9; k++) R.pset(296 + k * 2, 156 + (k % 2), hex('#c8d070'));
});
const gusano = (x, y, t, s) => { for (let k = 0; k < 9; k++) { const xx = Math.round(x + k * s), yy = Math.round(y + Math.sin(t * 5 + k * 0.8) * 1.4); R.pset(xx, yy, hex('#e88a8a')); R.pset(xx, yy + 1, hex('#b85a6a')); } };
const p5 = (t) => {
  F5.copia();
  gusano(110 + Math.round((t * 3) % 30), 80, t, 1); gusano(300 - Math.round((t * 2.5) % 24), 60, t, -1); gusano(10 + Math.round((t * 2) % 8), 150, t, 1);
  for (let k = 0; k < 6; k++) { const y = Math.round(34 + ((t * 40 + k * 27) % 146)); R.pset(SX + 8 + (k * 11) % 50, y, hex('#7a5a3a')); }
  // la gota que cae de una raíz del techo de la madriguera
  { const ph = (t * 0.7) % 1, gy = Math.round(78 + ph * ph * 86); R.pset(176, gy, hex('#8ac8e8')); R.pset(176, gy + 1, hex('#5a98c8')); }
  const sube = tramo(t, P5 + 0.05, chest), va = tramo(t, P5 + 0.2, chest + 0.5), arrastra = tramo(t, chest + 0.6, revol - 0.6), rasca = t > revol - 0.3;
  const grita = t > chest && t < chest + 0.8;
  ampliar(() => {
    // el montón de tesoros devueltos: el cofre con el loro encima, la corona, el yelmo, el rollo con la pluma y monedas
    cofre(92, 62, t); corona(124, 70, t); yelmo(140, 63, t); spr(ROLLO, 104, 74); pluma(118, 76, 0.8, 12);
    for (const [x, y] of [[90, 81], [122, 82], [146, 82], [150, 80]]) moneda(x, y, false, t * 2 + x);
    loro(96, 42 + (grita ? -2 : 0), t, { dir: -1, ala: grita ? Math.sin(t * 24) : -0.6, pico: grita });
    // la caja británica sube por el pozo y el topo la arrastra hasta el montón
    const bx = Math.round(lerp(13, 56, arrastra)), by = Math.round(lerp(100, 66, sube));
    R.recorte([0, 17, 159, 89]); caja(bx, by, t); R.recorte(null);
    const tx = Math.round(arrastra > 0 ? bx + 36 : lerp(150, 50, va));
    T.topo(R, tx, 83, t, { fuera: 1, mira: rasca ? 0 : arrastra > 0 ? 1 : va < 1 ? -1 : 0, rasca, fase: 0.3 });
  });
  if (rasca) R.icono('?', 210, 92 + Math.round(Math.sin(t * 4)), D.W, K, 2);
  if (grita) R.icono('!', 170, 64, D.Y, K, 2);
};

// ── 6 · la galería de los retratos ──
const MINIS = ['cofre', 'oro', 'corona', 'rollo', 'yelmo', 'caja'], AÑOS = [1795, 1803, 1849, 1909, 1965, 2026];
const nb = (t) => cl((t - P6 - 0.15) / 0.62, 0, 6);
const p6 = (t) => {
  const g = T.gabinete(R, t, { encuadre: 'retratos', burbujas: nb(t) });
  (g.burbujas || []).forEach((q, k) => { if ((q.s ?? 1) < 0.7) return; const f = MINI[MINIS[k]], w = f[0].length; spr(f, q.x - Math.floor(w / 2), q.y - Math.floor(f.length / 2) - 1); if (k === Math.floor(nb(t)) - 1 && (t * 3) % 1 < 0.3) destello(q.x + 7, q.y - 4, 2); });
  // el visitante de hoy recorre la galería, mira cada retrato y se para ante el clavo vacío
  const u = tramo(t, P6 + 0.2, find - 0.3), x = Math.round(lerp(24, 280, u));
  R.actor(EL.marty, x, 170, t, { dir: 1, anda: u > 0 && u < 1 && (Math.floor(u * 6) % 2 === 0 || u > 0.85), sonrisa: u < 1, sorpresa: t > find && t < find + 0.4 });
  if (t > find) R.bocadillo(x + 18, 136, { icono: '?' });
};

const efectos = [[pit, 'pop'], [theories, 'golpecito'], [pirate, 'whoosh'], [gold, 'brillo'], [gold + 0.55, 'pop'], [galleon + 0.6, 'toc'],
  [P3 + 0.4, 'brillo'], [shakes + 0.1, 'papel'], [shakes + 0.9, 'lapiz'], [shakes + 1.9, 'pop'],
  [templar, 'brillo'], [others + 1.1, 'golpecito'], [P5 - 0.9, 'whoosh'],
  [chest, 'toc'], [chest + 0.7, 'golpecito'], [revol, 'boing'],
  [P6 + 0.8, 'pop'], [P6 + 2.0, 'pop'], [P6 + 3.2, 'brillo'], [find, 'pop']];
const año = (t) => t < P6 ? null : AÑOS[Math.max(0, Math.ceil(nb(t)) - 1)];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año });
''')

E['oi-pajita'] = ('La pajita', '''// OI-PAJITA (frases 27–28), el laboratorio del agua (hoy, sin barra del año). Cuatro planos:
// 1. la mesa del laboratorio: el geólogo entra desde la puerta y señala; en «glass» late un aro en el vaso de zumo y
//    una flecha baja sobre él, en «straw» sobre la pajita; en «the sea is the glass» la flecha salta al mar del tanque y
//    en «the pit is the straw» al pozo; la compañera asiente (corta en «If»);
// 2. el vaso de cerca, junto a la ventana de la bahía: una mano tapa la pajita con el dedo y la hunde por debajo del
//    nivel del zumo («dig deeper than sea level»); en «water seeps in» la suelta y el zumo sube por la pajita hasta la
//    raya del nivel de fuera, que parpadea en «matches» (corta en «And the bedrock»);
// 3. el rincón de las rocas: el testigo de sondeo en su soporte, de la hierba a la roca blanca; el geólogo señala con
//    el puntero abajo en «deeper down», sube a la arcilla en «clay» y vuelve abajo en «easier», cuando el agua baja
//    por las grietas y la roca blanca se agujerea; la compañera apunta en su tablilla (corta en «It's anhydrite»);
// 4. el tanque de cerca: aro en la anhidrita en «anhydrite»; el geólogo señala el trozo de yeso en «gypsum»; en
//    «dissolves» la roca blanca se disuelve y en «caves and hollows» las cuevas ya están hechas.''', COMUN + r'''
const a = (f) => en('pajita', f), b = (f) => en('anhidrita', f);
const P2 = a(0.423), P3 = a(1), P4 = b(0.428);
const glass = a(0.03), straw = a(0.117), sea = a(0.204), pit = a(0.303), dig = a(0.591), seeps = a(0.747), matches = a(0.866);
const deeper = b(0.048), clay = b(0.225), easier = b(0.294), anhy = b(0.457), gypsum = b(0.638), dissolves = b(0.766), caves = b(0.889);
// el aro que late y la flecha que baja sobre lo que se nombra
const pulso = (x, y, t, t0, c = D.W) => { const u = (t - t0) / 0.6; if (u < 0 || u > 1) return; const r = Math.round(3 + u * 10); R.anillo(x, y, r + 1, K); R.anillo(x, y, r, c); };
const flecha = (x, y, t) => { const dy = Math.round(Math.abs(Math.sin(t * 6)) * -3); for (let j = 0; j < 8; j++) { const w = j < 4 ? 1 : 7 - j; R.rect(x - w - 1, y - 12 + j + dy, x + w + 1, y - 12 + j + dy, K); } for (let j = 0; j < 7; j++) { const w = j < 4 ? 0 : 6 - j; R.rect(x - w, y - 12 + j + dy, x + w, y - 12 + j + dy, D.Y); } };

// ── 1 · la mesa del laboratorio ──
const p1 = (t) => {
  const g = T.labAgua(R, t, {});
  const u = tramo(t, 0.15, glass - 0.15), x = Math.round(lerp(296, 62, u));
  R.actor(EL.geologo, x, 163, t, { dir: u < 1 ? -1 : 1, anda: u > 0 && u < 1, dedo: u >= 1 && t < P2 - 0.2, habla: u >= 1 && Math.sin(t * 8) > 0.2 && t < P2 - 0.6, sonrisa: t > pit + 0.5 });
  R.actor(EL.operaria, 298, 163, t, { dir: -1, quieto: false, sonrisa: t > pit, habla: t > sea + 0.2 && t < sea + 0.8 && Math.sin(t * 9) > 0 });
  // la flecha va del vaso a la pajita, al mar del tanque y al pozo
  const obj = t < straw ? [118, 98] : t < sea ? [134, 80] : t < pit ? [168, 88] : [207, 82];
  if (t > glass) flecha(obj[0], obj[1], t);
  pulso(118, 120, t, glass); pulso(134, 86, t, straw); pulso(168, 100, t, sea, hex('#bfe8ff')); pulso(207, 98, t, pit, hex('#bfe8ff'));
};

// ── 2 · el vaso de cerca ──
const GX0 = 222, GX1 = 300, GY0 = 70, GY1 = 168, NIV = 104, SXA = 266, SXB = 274;   // el vaso, el nivel del zumo y la pajita
const F2 = fijo(() => {
  // la pared de azulejos verde menta con su lechada
  const AZ = pal(['#7aa898', '#98c4b2', '#b4dccb', '#d0eee0']);
  for (let y = 0; y <= 118; y++) for (let x = 0; x <= 319; x++) { const tx = Math.floor((x + (Math.floor(y / 10) % 2) * 6) / 12), u = (x + (Math.floor(y / 10) % 2) * 6) % 12, v = y % 10;
    R.pset(x, y, u === 0 || v === 0 ? hex('#6a8e80') : R.tone(AZ, 1.8 + (H(tx, Math.floor(y / 10), 33) - 0.5) * 0.9 + (v === 1 || u === 1 ? 0.8 : 0) - y / 300, x, y)); }
  // la ventana a la bahía (el hueco se pinta en cada fotograma) y su marco blanco
  R.rect(14, 12, 132, 98, K); R.rect(15, 13, 131, 97, hex('#f0f0ec')); R.rect(15, 97, 131, 97, hex('#b8bcb4'));
  R.rect(10, 96, 136, 102, K); R.rect(11, 97, 135, 100, hex('#f8f8f4')); R.rect(11, 101, 135, 101, hex('#c8ccc4'));
  // una maceta con un cactus en el alféizar y un cuadro de la isla (sin letras)
  R.rect(110, 86, 122, 96, K); R.rect(111, 87, 121, 95, hex('#c86a3a')); R.rect(113, 74, 119, 87, K); R.rect(114, 75, 118, 86, hex('#4a9a4a')); R.pset(116, 77, hex('#8ad870')); R.rect(110, 78, 113, 80, K); R.rect(111, 79, 113, 79, hex('#4a9a4a'));
  R.rect(150, 22, 196, 56, K); R.rect(151, 23, 195, 55, hex('#e8e0c8')); R.rect(154, 26, 192, 52, hex('#9ad0e8')); R.disco(168, 44, 8, hex('#8ab86a')); R.rect(154, 46, 192, 52, hex('#3a86c0')); R.rect(166, 32, 168, 40, hex('#6a4426')); R.disco(167, 31, 4, hex('#3a7a3a'));
  // la balda con frascos
  R.rect(200, 52, 262, 55, K); R.rect(201, 52, 261, 53, hex('#e8e8e0'));
  for (const [x0, w, hh, c0] of [[204, 8, 14, '#c8e8f0'], [216, 6, 10, '#f0c860'], [226, 9, 16, '#a8d8a8'], [240, 7, 12, '#e8a0a0'], [251, 8, 9, '#c8c8f0']]) { R.rect(x0, 51 - hh, x0 + w, 51, K); R.rect(x0 + 1, 52 - hh, x0 + w - 1, 51, hex(c0)); R.rect(x0 + 1, 52 - hh, x0 + 1, 51, D.W); R.rect(x0 + 2, 49 - hh, x0 + w - 2, 51 - hh, K); }
  // el tablero negro de la mesa con su canto claro y reflejos
  R.rect(0, 117, 319, 121, K); R.rect(0, 118, 319, 119, hex('#6a6e78')); R.rect(0, 120, 319, 120, hex('#3a3e48'));
  for (let y = 122; y <= 179; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, R.tone(pal(['#16181e', '#22262e', '#2e323c', '#40444e']), 1.4 + (y - 122) / 60 + (Math.abs((x - 40) - (y - 122) * 1.4) < 10 ? 1.1 : 0) + (H(x, y, 34) - 0.5) * 0.4, x, y));
  // la tabla de cortar con las naranjas, el cuchillo y la jarra de zumo
  R.rect(22, 136, 112, 160, K); for (let y = 137; y <= 159; y++) for (let x = 23; x <= 111; x++) R.pset(x, y, R.tone(MADC, 3 + Math.sin(x * 0.3 + y * 0.1) * 0.4 - (y === 159 ? 1.5 : 0), x, y));
  for (const [cx, cy] of [[46, 146], [70, 150]]) { R.disco(cx, cy, 9, K); R.disco(cx, cy, 8, hex('#f08a1a')); R.disco(cx, cy, 6, hex('#f8c040')); for (let k = 0; k < 8; k++) R.linea(cx, cy, Math.round(cx + Math.cos(k * 0.785) * 5), Math.round(cy + Math.sin(k * 0.785) * 5), hex('#f8e8a0')); R.pset(cx, cy, D.W); }
  R.disco(96, 146, 7, K); R.disco(96, 146, 6, hex('#f08a1a')); R.pset(93, 143, hex('#f8c070')); R.pset(97, 140, hex('#3a7a3a'));
  R.rect(56, 156, 104, 158, K); R.rect(57, 157, 84, 157, hex('#d8dce4')); R.rect(85, 156, 104, 158, hex('#3a2a20'));
  R.rect(140, 98, 176, 150, K); R.rect(141, 99, 175, 149, hex('#d8eef4')); for (let y = 112; y <= 148; y++) for (let x = 142; x <= 174; x++) R.pset(x, y, R.tone(pal(['#c86a10', '#e88a1a', '#f8a830', '#f8c860']), 2 + (x < 148 ? 1 : x > 168 ? -1 : 0), x, y));
  R.rect(176, 108, 186, 112, K); R.rect(182, 108, 186, 136, K); R.rect(176, 132, 186, 136, K); R.rect(177, 109, 185, 111, hex('#d8eef4')); R.rect(183, 112, 185, 135, hex('#d8eef4'));
  R.rect(138, 94, 156, 100, K); R.rect(139, 95, 155, 98, hex('#e8f4f8')); R.rect(142, 101, 142, 146, hex('#f8ffff'));
  // el trozo de yeso y la libreta con el dibujo del vaso y del pozo
  R.poligono([[190, 158], [196, 148], [206, 147], [212, 156], [204, 162], [192, 162]], K); R.poligono([[192, 158], [197, 150], [205, 149], [210, 156], [203, 160], [193, 160]], hex('#f0ece0')); R.linea(198, 151, 206, 158, hex('#c8c4b8')); R.pset(200, 152, D.W);
  R.poligono([[120, 158], [182, 154], [186, 176], [118, 179]], K); R.poligono([[122, 159], [180, 156], [183, 174], [121, 177]], hex('#f8f4e8'));
  for (let k = 0; k < 5; k++) R.linea(124, 162 + k * 3, 180, 160 + k * 3, hex('#c8d4e8'));
  R.rect(132, 162, 140, 172, hex('#5a5a6a')); R.rect(133, 166, 139, 171, hex('#f8a830')); R.linea(160, 164, 160, 172, hex('#5a5a6a')); R.linea(166, 164, 166, 172, hex('#5a5a6a')); R.rect(161, 168, 165, 172, hex('#3a86c0'));
});
const ventana2 = (t) => {
  R.recorte([15, 13, 131, 96]);
  const CI = pal(['#5a9ae0', '#7ab4ec', '#9ccaf4', '#c4e2fa', '#e8f6fe']), MAR = pal(['#1a4a7a', '#2a6aa0', '#3a86c0', '#6ab0e0', '#c8e8f8']);
  for (let y = 13; y <= 96; y++) for (let x = 15; x <= 131; x++) { if (y < 62) R.pset(x, y, R.tone(CI, 0.5 + (y - 13) / 13, x, y)); else { const o = Math.sin(x * 0.4 + t * 2 + y) * Math.sin(x * 0.13 - t * 1.3); R.pset(x, y, R.tone(MAR, 2.4 - (y - 62) / 14 + (o > 0.6 ? 1.4 : 0), x, y)); } }
  for (let x = 70; x <= 112; x++) { const hh = Math.round(7 * Math.sin((x - 70) / 42 * Math.PI)); for (let y = 62 - hh; y < 62; y++) R.pset(x, y, y < 62 - hh + 2 ? hex('#3a6a4a') : hex('#2a5a3a')); }
  for (const x of [80, 86, 92, 98, 103]) for (let j = 0; j < 7; j++) for (let i = -Math.floor(j / 2); i <= Math.floor(j / 2); i++) R.pset(x + i, 49 + j - (x === 92 ? 2 : 0), hex('#1e4a2e'));
  for (const [x0, y, w, v, c1, c2] of [[20, 24, 26, 1.2, '#ffffff', '#d2e6f6'], [80, 34, 20, 2.4, '#f4faff', '#c4dcf0'], [50, 44, 14, 3.6, '#e8f4fc', '#b4d0e8']]) { const x = ((x0 + t * v) % 150) + 2;
    for (const [dx, dy, r, cc] of [[0, 1, w * 0.3, c2], [-w * 0.28, 2, w * 0.22, c2], [w * 0.28, 2, w * 0.24, c2], [-1, -1, w * 0.24, c1]]) R.disco(Math.round(x + dx), Math.round(y + dy), Math.round(r), hex(cc)); }
  const bx = Math.round(((t * 5) % 140) + 5); R.rect(bx, 70, bx + 12, 72, hex('#f8f8f0')); R.rect(bx + 1, 73, bx + 11, 74, hex('#c84a3a')); R.linea(bx + 6, 60, bx + 6, 70, K); R.poligono([[bx + 7, 60], [bx + 7, 69], [bx + 13, 69]], D.W);
  for (const [x0, y0, v] of [[30, 30, 8], [60, 24, 6]]) { const x = Math.round((x0 + t * v) % 120 + 12), y = y0 + Math.round(Math.sin(t * 3 + x0) * 2), ab = Math.sin(t * 10 + x0) > 0; for (const [i, j] of [[0, 0], [-1, ab ? -1 : 0], [-2, ab ? -2 : 0], [1, ab ? -1 : 0], [2, ab ? -2 : 0]]) R.pset(x + i, y + j, D.W); }
  R.recorte(null);
  R.rect(72, 13, 74, 96, hex('#f0f0ec')); R.rect(15, 54, 131, 56, hex('#f0f0ec')); R.rect(72, 13, 72, 96, hex('#c8ccc4'));
};
const p2 = (t) => {
  F2.copia(); ventana2(t);
  // la pajita: hundida por la mano (el dedo tapa la boca) y luego suelta; el zumo de dentro sube hasta el nivel
  const baja = tramo(t, dig - 0.35, a(0.69)), top = Math.round(lerp(48, 90, baja)), bot = top + 54;
  const sube = tramo(t, seeps + 0.1, matches + 0.1), nivelDentro = bot <= NIV ? bot : Math.round(lerp(bot, NIV, sube));
  // el vaso: cristal con el fondo de la pared, el zumo con pulpa, burbujas y el cubito
  for (let y = GY0; y <= GY1; y++) { const ins = Math.round((y - GY0) * 0.08); for (let x = GX0 + ins; x <= GX1 - ins; x++) {
    const borde = x === GX0 + ins || x === GX1 - ins || y === GY1;
    if (borde) { R.pset(x, y, hex('#8ab0bc')); continue; }
    if (y >= NIV + Math.round(Math.sin(x * 0.5 + t * 3) * 0.6)) { const sh = x < GX0 + ins + 5 ? 1.2 : x > GX1 - ins - 7 ? -0.8 : 0; R.pset(x, y, R.tone(pal(['#c85a08', '#e87a14', '#f89a28', '#f8c050', '#fff0b0']), 2.2 + sh - (y - NIV) / 120 + (H(x, y, 35) < 0.05 ? 1 : 0) + (y === NIV ? 1.5 : 0), x, y)); }
    else { const c = R.pget(x, y); R.pset(x, y, mez(c, hex('#e8f8ff'), 0.35)); } } }
  for (let k = 0; k < 8; k++) { const ph = (t * 0.5 + k * 0.13) % 1, x = GX0 + 12 + (k * 9) % 60, y = Math.round(GY1 - 6 - ph * (GY1 - NIV - 8)); R.pset(x, y, hex('#fff8d0')); R.pset(x + 1, y, hex('#f8d080')); }
  { const cx = 240, cy = NIV - 4 + Math.round(Math.sin(t * 1.7) * 1); R.rect(cx, cy, cx + 12, cy + 10, hex('#a8c8d8')); R.rect(cx + 1, cy + 1, cx + 11, cy + 9, hex('#e0f4fc')); R.rect(cx + 2, cy + 2, cx + 4, cy + 3, D.W); R.rect(cx + 1, cy + 6, cx + 11, cy + 9, hex('#f8d090')); }
  // la rodaja de naranja en el borde y los reflejos y gotas del cristal
  R.disco(GX0 + 2, GY0 - 2, 9, K); R.disco(GX0 + 2, GY0 - 2, 8, hex('#f08a1a')); R.disco(GX0 + 2, GY0 - 2, 6, hex('#f8c040')); for (let k = 0; k < 6; k++) R.linea(GX0 + 2, GY0 - 2, Math.round(GX0 + 2 + Math.cos(k * 1.05) * 5), Math.round(GY0 - 2 + Math.sin(k * 1.05) * 5), hex('#f8e8a0')); R.rect(GX0 - 7, GY0 - 1, GX0 + 11, GY0 + 7, F2.px(GX0 - 7, GY0 + 20) ? null : null);
  for (let y = GY0 + 4; y < GY1 - 6; y += 2) R.pset(GX0 + 4 + Math.round((y - GY0) * 0.08), y, hex('#f4feff'));
  for (let k = 0; k < 4; k++) { const ph = (t * 0.25 + k * 0.27) % 1, x = GX0 + 18 + k * 15, y = Math.round(GY0 + 20 + ph * 70); R.pset(x, y, hex('#f0fcff')); R.pset(x, y + 1, hex('#a8d0dc')); }
  // la pajita transparente de rayas rojas, con el zumo dentro
  for (let y = top; y <= bot; y++) for (let x = SXA; x <= SXB; x++) {
    const borde = x === SXA || x === SXB; const raya = ((y + (x - SXA)) % 8) < 3;
    let c = borde ? hex('#c84a4a') : y >= nivelDentro && y >= NIV - 0 && bot > NIV ? (x === SXA + 1 ? hex('#f8c050') : hex('#f09020')) : raya ? hex('#e85a5a') : mez(R.pget(x, y), hex('#ffffff'), 0.5);
    if (!borde && raya && y >= nivelDentro && bot > NIV) c = mez(c, hex('#e85a5a'), 0.5);
    R.pset(x, y, c); }
  R.rect(SXA, top, SXB, top, hex('#a83a3a'));
  // flechitas del zumo que entra por abajo mientras sube
  if (sube > 0 && sube < 1) for (let k = 0; k < 3; k++) { const ph = (t * 2 + k / 3) % 1, y = Math.round(bot + 4 - ph * 10); R.pset(SXA - 3 + k * 0, y, hex('#fff0b0')); R.pset(SXB + 3, y, hex('#fff0b0')); }
  // la raya del nivel: parpadea cuando el zumo de la pajita llega a la altura del de fuera
  if (t > matches - 0.1) { const on = Math.floor(t * 6) % 2 === 0 || t > matches + 0.9; if (on) for (let x = GX0 - 14; x <= GX1 + 12; x += 3) { R.pset(x, NIV - 1, K); R.pset(x + 1, NIV - 1, D.W); }
    R.icono('X', GX1 + 6, NIV - 9, D.W, K, 1); }
  // la mano: entra desde la derecha, tapa la pajita con el dedo, la hunde y se va al soltarla
  const entra = tramo(t, P2 + 0.1, P2 + 0.7), sale = tramo(t, seeps - 0.1, seeps + 0.5);
  if (entra > 0 && sale < 1) { const wx = Math.round(lerp(345, SXB + 12, entra) + sale * 70), wy = top + 4;
    T.brazo(R, wx + 46, wy + 20, wx, wy, '#4e6a4a', -1, { codo: [wx + 26, wy + 16] }); }
};

// ── 3 · el rincón de las rocas: el testigo de sondeo ──
const CXa = 146, CXb = 172, CYa = 22, CYb = 148, Y_ARC = 60, Y_ANH = 108;
const F3 = fijo(() => {
  // la pared de yeso verde pálido con su moldura, el suelo de linóleo y el zócalo
  for (let y = 0; y <= 149; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, R.tone(pal(['#a8c4b4', '#bcd6c6', '#d0e6d8', '#e4f2ea']), 1.8 + (H(Math.floor(x / 3), Math.floor(y / 3), 36) - 0.5) * 0.7 - y / 260 + (y > 110 ? -0.5 : 0), x, y));
  R.rect(0, 108, 319, 111, K); R.rect(0, 109, 319, 109, hex('#f0f8f4')); R.rect(0, 110, 319, 110, hex('#90ac9c'));
  R.rect(0, 144, 319, 149, K); R.rect(0, 145, 319, 147, hex('#5a7a6a'));
  for (let y = 150; y <= 179; y++) for (let x = 0; x <= 319; x++) { const tx = Math.floor((x - 160) / (14 + (y - 150) * 0.6)), ty = Math.floor((y - 150) / 6); R.pset(x, y, R.tone(pal(['#6a6e7a', '#868a96', '#a2a6b2', '#c0c4cc']), 1.6 + ((tx + ty) % 2 ? 0.6 : 0) + (Math.abs(x - 160) < 22 && y < 168 ? 0.9 : 0) + (H(x, y, 37) - 0.5) * 0.4, x, y)); }
  // el cartel de los estratos (dibujo, sin letras)
  R.rect(12, 18, 92, 96, K); R.rect(13, 19, 91, 95, hex('#f8f4e8'));
  const capas = [[24, '#5ab0e0'], [40, '#7aa84a'], [46, '#6a4426'], [58, '#c86a3a'], [74, '#9aa0a8'], [84, '#f4f0e4']];
  for (let k = 0; k < capas.length; k++) { const y0 = capas[k][0], y1 = k + 1 < capas.length ? capas[k + 1][0] - 1 : 92; for (let y = y0; y <= y1; y++) for (let x = 16; x <= 88; x++) R.pset(x, y, k === 5 && H(x, y, 38) < 0.12 ? hex('#c8c4b8') : k === 3 && H(x, y, 38) < 0.06 ? hex('#8a4a2a') : hex(capas[k][1])); }
  R.rect(50, 30, 56, 92, K); R.rect(51, 30, 55, 91, hex('#2a2a3a')); R.rect(51, 60, 55, 91, hex('#3a86c0'));
  for (let x = 16; x <= 88; x += 4) R.pset(x, 40, D.W); R.rect(13, 19, 91, 20, hex('#d0ccc0'));
  // la vitrina de rocas con estantes: piedras de colores, un geoda, un amonites y cristales
  R.rect(218, 48, 312, 142, K); R.rect(219, 49, 311, 141, hex('#a8763a')); R.rect(222, 52, 308, 138, hex('#dceef0'));
  for (const y of [74, 98, 122]) { R.rect(222, y, 308, y + 2, hex('#8a5c2a')); R.rect(222, y, 308, y, hex('#c8965a')); }
  const ROC = ['#9a9aa8', '#c86a3a', '#e8e4d8', '#6a8a5a', '#8a5a8a', '#d8b860', '#5a6a8a', '#b8a088'];
  for (let k = 0; k < 16; k++) { const fila = k % 4, col = Math.floor(k / 4), x = 230 + col * 20 + (fila % 2) * 4, y = [70, 94, 118, 136][fila]; R.disco(x, y - 3, 5, K); R.disco(x, y - 3, 4, hex(ROC[k % 8])); R.pset(x - 2, y - 5, D.W); R.rect(x - 3, y + 1, x + 3, y + 1, hex('#f8f8f0')); }
  R.disco(290, 112, 7, K); R.disco(290, 112, 6, hex('#8a6a5a')); R.disco(290, 112, 4, hex('#b88ad8')); for (let k = 0; k < 6; k++) R.pset(287 + k, 110 + (k % 3), D.W);
  for (let k = 0; k < 3; k++) R.anillo(250, 112, 2 + k * 2, hex('#c8a878'));
  for (let x = 223; x < 307; x += 7) R.linea(x, 53, x + 10, 63, hex('#f4ffff'));
  // el microscopio en su mesita
  R.rect(184, 118, 214, 121, K); R.rect(185, 118, 213, 119, hex('#e8e8e0')); R.rect(188, 122, 190, 144, K); R.rect(208, 122, 210, 144, K);
  R.rect(192, 112, 206, 117, K); R.rect(193, 113, 205, 116, hex('#3a3e4a')); R.rect(200, 92, 204, 112, K); R.rect(201, 93, 203, 111, hex('#d8dce4')); R.linea(194, 96, 200, 104, K); R.linea(195, 96, 201, 104, hex('#5a5e6a')); R.rect(191, 92, 197, 97, K); R.rect(192, 93, 196, 96, hex('#3a3e4a'));
  // el soporte del testigo: la peana, la varilla de latón y las abrazaderas
  R.rect(132, 148, 186, 160, K); R.rect(133, 149, 185, 159, hex('#3a3e48')); R.rect(133, 149, 185, 150, hex('#6a6e78'));
  R.rect(178, 16, 182, 148, K); R.rect(179, 17, 181, 148, D.A); R.rect(179, 17, 179, 148, hex('#fff0a0'));
  for (const y of [30, 90, 140]) { R.rect(170, y, 182, y + 4, K); R.rect(171, y + 1, 181, y + 3, D.a); }
  // la moldura del techo y la lámpara colgada
  R.rect(0, 0, 319, 3, hex('#e8f2ec')); R.rect(0, 4, 319, 5, K); R.rect(0, 6, 319, 6, hex('#90ac9c'));
  R.linea(205, 6, 205, 22, K); R.poligono([[195, 31], [215, 31], [210, 22], [200, 22]], K); R.poligono([[197, 30], [213, 30], [209, 23], [201, 23]], hex('#3a6a5a')); R.rect(201, 24, 203, 28, hex('#5a8a7a')); R.rect(201, 31, 209, 32, hex('#fff4c0'));
  // el mapa de la isla con curvas de nivel y la chincheta roja del pozo (sin letras)
  R.rect(98, 22, 138, 62, K); R.rect(99, 23, 137, 61, hex('#f4f0e2'));
  for (let y = 25; y <= 59; y++) for (let x = 101; x <= 135; x++) { const d = ((x - 118) / 14) ** 2 + ((y - 42) / 12) ** 2 + Math.sin(x * 0.4 + y * 0.3) * 0.08;
    R.pset(x, y, Math.abs(d - 0.65) < 0.05 || Math.abs(d - 0.3) < 0.05 ? hex('#4a6a3a') : d < 0.3 ? hex('#6a9a4a') : d < 0.65 ? hex('#8ab85a') : d < 1 ? hex('#b0d070') : (x + y) % 6 ? hex('#7ab4d8') : hex('#9ac8e8')); }
  R.rect(116, 40, 117, 41, D.Q); R.pset(116, 39, D.W); R.rect(99, 23, 100, 24, D.Q); R.rect(136, 23, 137, 24, D.Q);
  // la foto enmarcada de una torre de sondeo y la lámina de los testigos de colores
  R.rect(188, 40, 212, 66, K); R.rect(189, 41, 211, 65, hex('#f0e8d0')); R.rect(191, 43, 209, 63, hex('#c8a878')); R.rect(191, 57, 209, 63, hex('#8a6a4a'));
  R.linea(195, 58, 200, 44, hex('#4a2e1a')); R.linea(205, 58, 200, 44, hex('#4a2e1a')); for (let k = 0; k < 4; k++) R.linea(196 + k, 55 - k * 3, 204 - k, 55 - k * 3, hex('#4a2e1a'));
  R.rect(224, 12, 270, 40, K); R.rect(225, 13, 269, 39, hex('#f8f4e8'));
  for (let k = 0; k < 4; k++) { const x0 = 229 + k * 10; let y = 15; [['#5a3e28', 6], ['#d0ae70', 5], ['#c86a3a', 7], ['#9aa0a8', 4], ['#f0ece0', 3]].forEach(([c, h], j) => { const hh = h - ((k + j) % 2); R.rect(x0, y, x0 + 5, Math.min(37, y + hh - 1), hex(c)); y += hh; }); }
  // la cajonera baja bajo el cartel, con tiradores; encima, una caja de testigos, un frasco y una lupa
  R.rect(10, 112, 128, 144, K); R.rect(11, 113, 127, 143, hex('#c8d8cc')); R.rect(11, 113, 127, 114, hex('#e8f2ec'));
  for (const y of [113, 123, 133]) { R.rect(11, y + 9, 127, y + 9, hex('#90ac9c')); for (const x of [30, 68, 106]) { R.rect(x - 5, y + 4, x + 5, y + 5, K); R.pset(x - 4, y + 4, D.S); } }
  R.rect(18, 100, 62, 112, K); R.rect(19, 101, 61, 111, hex('#8a5c34')); ['#c86a3a', '#9aa0a8', '#e8e4d8'].forEach((c, k) => { R.rect(21, 102 + k * 3, 59, 103 + k * 3, hex(c)); R.pset(21 + k * 13, 102 + k * 3, K); });
  R.rect(84, 101, 90, 112, K); R.rect(85, 104, 89, 111, hex('#a86a3a')); R.rect(86, 99, 88, 103, K); R.pset(86, 105, D.W);
  R.anillo(104, 107, 3, K); R.disco(104, 107, 2, hex('#c8e8f4')); R.linea(106, 110, 113, 111, K);
  // en el suelo: la alfombrilla de goma junto a la vitrina y el sumidero
  R.rect(232, 156, 300, 172, K); R.rect(233, 157, 299, 171, hex('#3a3e48')); for (let x = 236; x < 298; x += 4) R.rect(x, 158, x + 1, 170, hex('#4a4e5a'));
  R.disco(120, 172, 4, K); R.disco(120, 172, 3, hex('#5a5e6a')); for (const k of [-2, 0, 2]) R.linea(118, 172 + k, 122, 172 + k, K);
});
const p3 = (t) => {
  F3.copia();
  // el testigo cilíndrico: hierba, mantillo, arena, arcilla roja, arcilla azul y la anhidrita blanca con sus huecos
  const agua = tramo(t, easier - 0.2, P4 - 0.3);
  for (let y = CYa; y <= CYb; y++) for (let x = CXa; x <= CXb; x++) {
    const u = (x - CXa) / (CXb - CXa), luz = 1.2 - Math.abs(u - 0.32) * 2.4, bd = x === CXa || x === CXb;
    let P = y < CYa + 4 ? pal(['#2a6a2a', '#3a8a3a', '#5aaa4a', '#8ad870']) : y < 34 ? pal(['#2a1a10', '#3e2a1a', '#5a3e28', '#7a5a3a']) : y < Y_ARC ? pal(['#a8884a', '#c8a868', '#e0c488', '#f4dca8']) : y < 98 ? pal(['#6a2a1a', '#8a3e22', '#b05a32', '#d07a48']) : y < Y_ANH ? pal(['#3a4a5a', '#4e6274', '#6a8094', '#8aa0b4']) : pal(['#a8a49a', '#d0ccc0', '#ece8dc', '#ffffff']);
    let v = 1.6 + luz + (H(x, y, 39) - 0.5) * 0.7;
    if (y >= Y_ANH && ((x * 7 + y * 3) % 29 === 0)) v -= 1.2;
    let c = bd ? K : R.tone(P, v, x, y);
    // los huecos que el agua va abriendo en la roca blanca
    if (y >= Y_ANH) for (const [hx, hy, hr] of [[152, 118, 3], [164, 128, 4], [156, 138, 3], [166, 114, 2]]) { const r = hr * agua; if (r > 0.6 && (x - hx) ** 2 + (y - hy) ** 2 < r * r) c = (x - hx) ** 2 + (y - hy) ** 2 < (r - 1) ** 2 ? hex('#3a86c0') : hex('#5a6a7a'); }
    R.pset(x, y, c); }
  for (const y of [CYa + 4, 34, Y_ARC, 98, Y_ANH]) for (let x = CXa + 1; x < CXb; x++) if ((x + y) % 3) R.pset(x, y, hex('#1c1424'));
  for (let x = CXa + 1; x < CXb; x += 3) { R.pset(x, CYa - 1, hex('#3a8a3a')); R.pset(x + 1, CYa - 2, hex('#5aaa4a')); }
  for (let k = 0; k < 9; k++) { const x = CXa + 3 + (k * 7) % 20, y = 64 + (k * 11) % 30; R.pset(x, y, hex('#e8d8c8')); R.pset(x + 1, y, hex('#8a6a5a')); }
  // las gotas de agua que bajan por la arcilla hasta la roca blanca
  if (agua > 0) for (let k = 0; k < 4; k++) { const ph = (t * 0.9 + k * 0.25) % 1, x = CXa + 5 + k * 5, y = Math.round(CYa + 10 + ph * (Y_ANH + 20 - CYa)); R.pset(x, y, hex('#8ad0f8')); R.pset(x, y + 1, hex('#3a86c0')); }
  // el geólogo señala con el puntero; la compañera apunta en su tablilla
  const yp = t < deeper ? lerp(60, 130, tramo(t, P3, deeper)) : t < clay - 0.3 ? 130 : t < easier - 0.2 ? lerp(130, 80, tramo(t, clay - 0.3, clay + 0.1)) : lerp(80, 128, tramo(t, easier - 0.2, easier + 0.3));
  const u = tramo(t, P3 + 0.05, P3 + 0.9), gx = Math.round(lerp(60, 106, u));
  const m = R.actor(EL.geologo, gx, 168, t, { dir: 1, anda: u > 0 && u < 1, dedo: u >= 1, habla: u >= 1 && Math.sin(t * 7) > 0.3, sonrisa: t > easier });
  if (u >= 1) { const [hx, hy] = m.mano; R.linea(hx, hy, CXa - 2, Math.round(yp), K); R.linea(hx, hy - 1, CXa - 2, Math.round(yp) - 1, hex('#c8965a')); R.pset(CXa - 2, Math.round(yp), D.Q); }
  R.actor(EL.operaria, 214, 168, t, { dir: -1, sorpresa: t > easier && t < easier + 0.6, sonrisa: t > easier + 0.6, habla: t > clay && t < clay + 0.5 });
  { const ox = 212, oy = 150; R.rect(ox - 1, oy, ox + 5, oy + 8, K); R.rect(ox, oy + 1, ox + 4, oy + 7, hex('#f8f4e8')); R.rect(ox + 1, oy - 1, ox + 3, oy, D.A); if (t > clay) { const n = Math.min(3, Math.floor((t - clay) * 2)); for (let k = 0; k < n; k++) R.linea(ox + 1, oy + 3 + k * 2, ox + 3, oy + 3 + k * 2, hex('#3a3a5a')); } }
  // las motas de polvo en la luz y el reflejo de la vitrina que pasa
  for (let k = 0; k < 8; k++) { const x = Math.round(30 + ((k * 43 + t * 3) % 260)), y = Math.round(20 + ((k * 31 + t * 2) % 120)); if (Math.sin(t * 2 + k) > 0.4) R.pset(x, y, D.W); }
  { const rx = 222 + Math.round(((t * 18) % 140)); for (let k = 0; k < 10; k++) if (rx + k < 308 && rx + k > 222) R.linea(rx + k, 52, rx + k + 6, 64, hex('#ffffff')); }
};

// ── 4 · el tanque de cerca ──
const p4 = (t) => {
  const g = T.labAgua(R, t, { encuadre: 'tanque', disuelve: tramo(t, dissolves - 0.6, caves + 0.3) });
  pulso(120, 112, t, anhy); pulso(150, 120, t, anhy + 0.25);
  if (t > anhy && t < gypsum) flecha(120, 92, t);
  if (t > gypsum) flecha(286, 132, t);
  pulso(286, 145, t, gypsum);
  R.actor(EL.geologo, 296, 178, t, { dir: -1, dedo: (t > anhy && t < anhy + 1.2) || (t > gypsum - 0.1 && t < gypsum + 1.4), habla: Math.sin(t * 7) > 0.4 && t < caves, sorpresa: t > caves && t < caves + 0.7, sonrisa: t > caves + 0.7 });
};

const efectos = [[glass, 'pop'], [straw, 'pop'], [sea + 0.05, 'brillo'], [pit + 0.05, 'brillo'], [P2 + 0.7, 'golpecito'], [dig, 'burbujas'], [seeps, 'burbujas'], [matches, 'brillo'],
  [deeper, 'toc'], [clay + 0.1, 'toc'], [easier, 'burbujas'], [clay + 0.6, 'lapiz'], [anhy, 'brillo'], [gypsum, 'pop'], [dissolves - 0.4, 'burbujas'], [caves, 'burbujas']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos });
''')

E['oi-esponja'] = ('La esponja', '''// OI-ESPONJA (frases 29–30): hoy, de muy cerca, y la isla en 1909 (sin barra del año). Cuatro planos:
// 1. bajo tierra, de muy cerca: el agua baja sin parar por las raíces, entre los granos de arena y por las grietas de la
//    roca blanca; el topo del casco recorre su túnel (al fondo, el tesoro que se llevó) y en «cracks» la grieta grande
//    se llena y le cae una gota en el casco: «!» y se rasca (corta en «Sand»);
// 2. la mesa de las pruebas: una mano con bata riega con una regadera la columna de arena («Sand»: se moja de arriba
//    abajo), la roca con agujeros («holes in the rock»: gotea al vaso de debajo, que se llena) y la esponja en su plato
//    («soaks through a sponge»: se oscurece, se hincha y deja charco), y se va (corta en «And»);
// 3. el pozo en corte, 1909 por la tarde: el cavador ahonda de 64 a 100 pies (la cifra al lado); en «sea level» late la
//    raya del nivel del mar; en «harder» las flechas de agua entran más gruesas abajo, el capataz se asusta y en
//    «pushes» el cavador sube por la escalera con el agua detrás (corta en «So»);
// 4. la bomba de balancín sobre el pozo: dos buscadores bombean cada vez más deprisa («every pump»), el agua sale por
//    la canaleta al mar y por la grava vuelve del mar al pozo («pulled the sea in»), con flechas más gruesas y rápidas;
//    el agua del pozo sube igual y en «faster» todos se asustan, «!» del capataz.''', COMUN + r'''
const a = (f) => en('esponja', f), b = (f) => en('bombas', f);
const P2 = a(0.507), P3 = b(0), P4 = b(0.565);
const under = a(0.03), still = a(0.164), slips = a(0.317), cracks = a(0.38), holes = a(0.565), way = a(0.692), soaks = a(0.822), sponge = a(0.916);
const deeper = b(0.024), sealev = b(0.145), harder = b(0.29), pushes = b(0.376), wayin = b(0.477), pump = b(0.616), pulled = b(0.809), faster = b(0.908);
const AGUA = pal(['#1a4a7a', '#2a6aa0', '#3a86c0', '#6ab0e0', '#c8e8f8']);
const largo = (pts) => { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; };
const enLinea = (pts, u) => { let L = largo(pts) * cl(u); for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (L <= d) { const k = d ? L / d : 0; return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k]; } L -= d; } return pts[pts.length - 1]; };
// una gota que corre: cabeza clara y estela
const gota = (x, y) => { x = Math.round(x); y = Math.round(y); R.pset(x, y - 2, AGUA[2]); R.pset(x, y - 1, AGUA[3]); R.pset(x, y, AGUA[4]); R.pset(x + 1, y, AGUA[3]); R.pset(x, y + 1, AGUA[2]); };
const pulso = (x, y, t, t0, c = D.W) => { const u = (t - t0) / 0.6; if (u < 0 || u > 1) return; const r = Math.round(3 + u * 10); R.anillo(x, y, r + 1, K); R.anillo(x, y, r, c); };

// ── 1 · bajo tierra, de muy cerca ──
const Y_ARE = 34, Y_GRA = 82, Y_ROC = 126;
const bArena = (x) => Y_ARE + Math.round(Math.sin(x * 0.07) * 2 + Math.sin(x * 0.23 + 1) * 1.5);
const bGrava = (x) => Y_GRA + Math.round(Math.sin(x * 0.05 + 2) * 3 + Math.sin(x * 0.19) * 1.2);
const bRoca = (x) => Y_ROC + Math.round(Math.sin(x * 0.045 + 4) * 3 + Math.sin(x * 0.17) * 1.5);
const TUN = { x: 96, y: 104, rx: 80, ry: 18, suelo: 120 };
const enTunel = (x, y) => y <= TUN.suelo && ((x - TUN.x) / TUN.rx) ** 2 + ((y - TUN.y) / TUN.ry) ** 2 <= 1;
const techo = (x) => Math.round(TUN.y - TUN.ry * Math.sqrt(Math.max(0, 1 - ((x - TUN.x) / TUN.rx) ** 2)));
const GRIETAS = [
  [[182, 128], [190, 136], [186, 144], [200, 150], [216, 156], [234, 166], [246, 179]],
  [[216, 156], [238, 150], [262, 154], [288, 144], [319, 149]],
  [[30, 128], [40, 138], [34, 150], [50, 162], [56, 179]],
  [[124, 128], [130, 140], [146, 148], [154, 162], [150, 179]],
];
const HUECOS = [[96, 160, 12, 7], [166, 140, 6, 4], [284, 166, 12, 6], [20, 150, 7, 4], [214, 136, 6, 3]];
const CAMINOS = [
  [[196, 4], [200, 18], [194, 30], [202, 44], [196, 58], [204, 72], [198, 86], [190, 104], [184, 120], ...GRIETAS[0]],
  [[262, 6], [258, 22], [266, 38], [258, 54], [268, 70], [262, 86], [270, 104], [266, 124], [262, 154], [288, 144], [319, 149]],
  [[118, 4], [114, 20], [120, 36], [114, 52], [120, 68], [116, 80], [118, techo(118) - 1]],
  [[26, 6], [30, 24], [24, 40], [32, 56], [26, 72], [8, 88], [10, 112], [30, 128], ...GRIETAS[2].slice(1)],
  [[232, 4], [236, 20], [228, 36], [236, 52], [230, 68], [238, 84], [232, 100], [222, 118], [214, 134]],
  [[300, 8], [296, 26], [304, 44], [298, 60], [306, 78], [300, 96], [296, 116], [290, 140], [284, 162]],
  [[156, 4], [152, 22], [160, 40], [154, 58], [162, 72], [178, 86], [180, 108], [124, 128], ...GRIETAS[3].slice(1)],
];
const ARE = pal(['#7a5a30', '#a8844c', '#ccaa6c', '#ead096']), GRA = pal(['#4a4a52', '#6a6a72', '#8a8a92', '#b0b0b6']);
const ROC = pal(['#9a968c', '#bcb8ac', '#dcd8cc', '#f6f4ec']), PORO = hex('#2c2018');
const POROS = [];
const F1 = fijo(() => {
  // la anhidrita blanca con sus vetas, motas y cristales
  for (let y = 96; y <= 179; y++) for (let x = 0; x <= 319; x++) { const v = Math.sin(x * 0.05 + y * 0.12 + Math.sin(y * 0.07) * 2); R.pset(x, y, R.tone(ROC, 2.1 + (H(x >> 1, y >> 1, 53) - 0.5) * 0.9 + (v > 0.9 ? -0.9 : 0) - (y - 126) / 120, x, y)); }
  for (let k = 0; k < 160; k++) { const x = Math.floor(H(k, 1, 54) * 320), y = Y_ROC + 6 + Math.floor(H(k, 2, 54) * 50); R.pset(x, y, k % 5 ? hex('#a8a498') : D.W); if (k % 7 === 0) { R.pset(x + 1, y, hex('#e8f4f8')); R.pset(x, y - 1, hex('#e8f4f8')); } }
  // una concha fósil en la roca
  for (let k = 0; k < 4; k++) R.anillo(258, 172, 1 + k * 2, hex('#a8a090'));
  // las grietas: oscuras, con su labio claro
  for (const G of GRIETAS) for (let i = 1; i < G.length; i++) { R.linea(G[i - 1][0], G[i - 1][1] + 1, G[i][0], G[i][1] + 1, D.W); R.linea(G[i - 1][0], G[i - 1][1], G[i][0], G[i][1], hex('#4a443c')); R.linea(G[i - 1][0] + 1, G[i - 1][1], G[i][0] + 1, G[i][1], K); }
  // los huecos de la roca
  for (const [hx, hy, rx, ry] of HUECOS) for (let y = hy - ry - 1; y <= hy + ry + 1; y++) for (let x = hx - rx - 1; x <= hx + rx + 1; x++) { const d = ((x - hx) / rx) ** 2 + ((y - hy) / ry) ** 2; if (d > 1.25) continue; R.pset(x, y, d > 1 ? (y < hy ? hex('#8a867c') : D.W) : R.tone(pal(['#1e1a16', '#2e2a24', '#4a453c']), 1.6 - (y - hy) / ry, x, y)); }
  // la grava: cantos redondos de varios tonos sobre tierra húmeda
  for (let y = 56; y <= Y_ROC + 6; y++) for (let x = 0; x <= 319; x++) if (y < bRoca(x)) R.pset(x, y, PORO);
  for (let j = 0; j < 5; j++) for (let i = 0; i < 23; i++) { const cx = i * 15 + Math.floor(H(i, j, 55) * 8) - 4 + (j % 2) * 7, cy = Y_GRA + 4 + j * 10 + Math.floor(H(i, j, 56) * 4), r = 4 + Math.floor(H(i, j, 57) * 3.5);
    const hh = H(i, j, 58), P = hh < 0.3 ? pal(['#5a4434', '#7a5e46', '#9a7c5e', '#bca080']) : hh < 0.45 ? pal(['#3a4a5a', '#5a6a7a', '#7a8a9a', '#a0b0bc']) : hh < 0.55 ? pal(['#6a3a2a', '#8a4e36', '#aa6a4a', '#c88a68']) : GRA;
    for (let y = cy - r - 1; y <= cy + r + 1; y++) for (let x = cx - r - 1; x <= cx + r + 1; x++) { const d = ((x - cx) ** 2 + (y - cy) ** 2) / (r * r); if (d > 1 || x < 0 || x > 319 || y >= bRoca(x) || y < bGrava(x)) continue;
      R.pset(x, y, d > 0.8 ? K : R.tone(P, 2.3 - ((x - cx) + (y - cy)) / (r * 1.3), x, y)); }
    if (cx > 0 && cx < 319) R.pset(cx - Math.round(r / 2), cy - Math.round(r / 2), D.W); }
  // la arena: granos con luz y sombra y los poros oscuros entre ellos
  for (let y = 20; y <= Y_GRA + 6; y++) for (let x = 0; x <= 319; x++) if (y < bGrava(x)) R.pset(x, y, PORO);
  for (let j = 0; j < 9; j++) for (let i = 0; i < 42; i++) { const cx = i * 8 + Math.floor(H(i, j, 60) * 4) - 2 + (j % 2) * 4, cy = Y_ARE - 2 + j * 6 + Math.floor(H(i, j, 61) * 3), r = 2.7 + H(i, j, 62) * 1.3;
    for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = ((x - cx) ** 2 + (y - cy) ** 2) / (r * r); if (d > 1 || x < 0 || x > 319 || y >= bGrava(x)) continue;
      R.pset(x, y, R.tone(ARE, 2.3 - ((x - cx) + (y - cy)) / (r * 1.3) + (H(i, j, 63) - 0.5) * 0.8, x, y)); } }
  // la tierra negra de arriba, con el césped, piedrecitas, raíces y una lombriz que duerme
  const HI = pal(['#1e5a24', '#2e7a30', '#4a9a3a', '#7ac850']), TI = pal(['#1a0e08', '#2a1a10', '#3e2818', '#56381e']);
  for (let y = 0; y <= Y_ARE + 4; y++) for (let x = 0; x <= 319; x++) { if (y >= bArena(x)) continue; const hb = 2 + Math.floor(H(x, 1, 50) * 4);
    R.pset(x, y, y < hb && H(x, 2, 50) > 0.2 ? R.tone(HI, 3.2 - y * 0.7, x, y) : R.tone(TI, 1.7 + (H(x >> 1, y >> 1, 52) - 0.5) * 1.3 - y / 60, x, y)); }
  for (let k = 0; k < 30; k++) { const x = Math.floor(H(k, 3, 64) * 316) + 2, y = 9 + Math.floor(H(k, 4, 64) * 20), r = H(k, 5, 64) < 0.3 ? 2 : 1; R.disco(x, y, r, K); R.disco(x, y, r - 1 < 0 ? 0 : r - 1, k % 3 ? hex('#8a8078') : hex('#a86a4a')); R.pset(x - 1, y - 1, hex('#c8c0b8')); }
  for (const [x0, y1, s] of [[24, 46, 1], [70, 32, -1], [140, 28, 1], [180, 44, 1], [214, 36, -1], [244, 50, 1], [288, 34, -1], [310, 40, 1]]) { let x = x0;
    for (let y = 3; y <= y1; y++) { x += Math.sin(y * 0.4 + x0) * 0.7 * s; const xi = Math.round(x); R.pset(xi, y, hex('#d0aa78')); if (y < y1 - 10) R.pset(xi + 1, y, hex('#8a6440'));
      if (y % 9 === 4) for (let k = 1; k < 7; k++) R.pset(xi + k * s, y + Math.round(k * 0.7), k < 5 ? hex('#b08a5e') : hex('#8a6440')); } }
  // el túnel del topo, excavado en la arena y la grava, con el suelo pisado y raicillas que cuelgan
  const TU = pal(['#120a06', '#1e120c', '#2e1e14', '#42301e']);
  for (let y = TUN.y - TUN.ry - 2; y <= TUN.suelo + 2; y++) for (let x = TUN.x - TUN.rx - 2; x <= TUN.x + TUN.rx + 2; x++) { if (x < 0 || x > 319) continue; const d = ((x - TUN.x) / TUN.rx) ** 2 + ((y - TUN.y) / TUN.ry) ** 2;
    if (enTunel(x, y)) R.pset(x, y, y >= TUN.suelo - 2 ? R.tone(pal(['#3a2618', '#5a3e28', '#6e4e32']), y === TUN.suelo - 2 ? 2 : 1 + H(x, y, 65) * 0.8, x, y) : R.tone(TU, 1.2 + (y - TUN.y + TUN.ry) / (TUN.ry * 1.6) + (H(x >> 1, y, 66) - 0.5) * 0.5, x, y));
    else if (d < 1.12 && y <= TUN.suelo + 1) R.pset(x, y, mez(R.pget(x, y), K, 0.55)); }
  for (const x0 of [40, 72, 150, 164]) { const y0 = techo(x0); for (let k = 0; k < 6 + (x0 % 5); k++) R.pset(x0 + (k % 3 === 2 ? 1 : 0), y0 + k, hex('#a8845a')); R.pset(x0 + 1, y0 + 2, hex('#7a5a3a')); }
  // piedras que asoman en la pared del túnel, migas en el suelo, la cama de hojas y un hueso de cereza
  for (let k = 0; k < 14; k++) { const x = 24 + k * 11 + Math.floor(H(k, 1, 68) * 5), y = k % 2 ? techo(x) + 2 : TUN.suelo - 4 - Math.floor(H(k, 2, 68) * 3); if (!enTunel(x, y)) continue; R.disco(x, y, 2, K); R.disco(x, y, 1, k % 3 ? hex('#7a7a82') : hex('#9a7c5e')); R.pset(x - 1, y - 1, hex('#b0b0b6')); }
  for (let k = 0; k < 40; k++) { const x = 20 + Math.floor(H(k, 3, 68) * 150), y = TUN.suelo - 1 - Math.floor(H(k, 4, 68) * 2); if (enTunel(x, y)) R.pset(x, y, k % 2 ? hex('#8a6a48') : hex('#2a1a10')); }
  for (let k = 0; k < 9; k++) { const x = 146 + k * 3, y = TUN.suelo - 2 - (k % 2); R.rect(x, y - 1, x + 3, y, K); R.rect(x + 1, y - 1, x + 2, y - 1, hex(['#c86a2a', '#e8a03a', '#8a9a3a'][k % 3])); }
  R.disco(64, TUN.suelo - 3, 2, K); R.disco(64, TUN.suelo - 3, 1, hex('#e8d8c0'));
  // al fondo del túnel, el tesoro que el topo se llevó: monedas, la corona y una esquina del cofre
  { const bx = 26, by = TUN.suelo - 2; R.rect(bx - 6, by - 9, bx + 10, by, K); R.rect(bx - 5, by - 8, bx + 9, by - 1, hex('#8a5a2a')); R.rect(bx - 5, by - 8, bx + 9, by - 7, hex('#b07a3a')); R.rect(bx - 5, by - 5, bx + 9, by - 5, D.A); R.rect(bx + 1, by - 6, bx + 3, by - 3, D.A);
    for (const [dx, dy] of [[14, 0], [18, -1], [16, -4], [21, 0]]) moneda(bx + dx, by + dy - 1);
    spr(['.k.k.k.', 'kAkYkAk', 'kYYYYYk', 'kQYBYQk', 'kkkkkkk'], bx - 4, by - 15); }
  // los poros de la arena (para mojarlos en cada fotograma)
  for (let y = 22; y <= Y_GRA + 6; y++) for (let x = 0; x <= 319; x++) if (y >= bArena(x) && y < bGrava(x) && !enTunel(x, y) && R.pget(x, y) === PORO) POROS.push(x, y);
});
const p1 = (t) => {
  F1.copia();
  // la arena se moja: los poros por encima del frente se llenan de agua, que brilla
  for (let k = 0; k < POROS.length; k += 2) { const x = POROS[k], y = POROS[k + 1], fr = Y_ARE + 8 + t * 10 + Math.sin(x * 0.06 + t * 0.8) * 5;
    if (y < fr) R.pset(x, y, ((x * 3 + y * 5 + Math.floor(t * 5)) % 19) === 0 ? AGUA[4] : y > fr - 3 ? AGUA[2] : AGUA[1]); }
  // el agua entra en las grietas: la grande se llena en «cracks»
  GRIETAS.forEach((G, k) => { const f = k < 2 ? tramo(t, slips - 0.3, cracks + 0.25) : tramo(t, under, cracks + 0.8), L = largo(G);
    for (let s = 0; s <= L * f; s += 0.5) { const [x, y] = enLinea(G, s / L), m = Math.floor(s - t * 24); R.pset(Math.round(x), Math.round(y), (m % 9 + 9) % 9 === 0 ? AGUA[4] : AGUA[2]); R.pset(Math.round(x) + 1, Math.round(y), AGUA[1]); } });
  pulso(200, 150, t, cracks - 0.1); pulso(262, 154, t, cracks + 0.1);
  // los huecos de la roca: el agua de dentro se mece y sube
  for (const [hx, hy, rx, ry] of HUECOS) { const lv = hy + ry - 1 - Math.round(ry * 1.3 * (0.3 + 0.6 * tramo(t, cracks - 0.6, P2)));
    for (let y = lv; y < hy + ry; y++) for (let x = hx - rx + 1; x < hx + rx; x++) if (((x - hx) / rx) ** 2 + ((y - hy) / ry) ** 2 < 0.82) R.pset(x, y, y === lv + Math.round(Math.sin(x * 0.7 + t * 5) * 0.5) ? (((x + Math.floor(t * 8)) % 5) ? AGUA[3] : AGUA[4]) : AGUA[1]); }
  // las gotas que bajan sin parar por las raíces, entre los granos y por las grietas
  CAMINOS.forEach((C, k) => { const L = largo(C), n = Math.max(2, Math.round(L / 34)); for (let j = 0; j < n; j++) { const u = (t * 20 / L + j / n + k * 0.17) % 1; if (k === 2 && u > 0.92) continue; const [x, y] = enLinea(C, u); gota(x, y); } });
  // la lombriz que se abre paso por la tierra negra
  for (let s = 0; s < 14; s++) { const x = Math.round(150 + t * 6 - s * 1.6), y = Math.round(20 + Math.sin(t * 4 - s * 0.6) * 2.2); R.pset(x, y - 1, K); R.pset(x, y + 1, K); R.pset(x, y, s === 0 ? hex('#f0a0a8') : s % 4 === 1 ? hex('#c86a7a') : hex('#e08a96')); }
  // el topo recorre su túnel con la lámpara encendida y se para bajo la gota
  const X0 = 46, XG = 118, u = tramo(t, 0.25, cracks - 0.6), tx = Math.round(lerp(X0, XG - 4, u)), anda = u > 0 && u < 1;
  // la luz de la lámpara en las paredes del túnel
  for (let y = TUN.y - TUN.ry; y <= TUN.suelo; y++) for (let x = tx - 30; x <= tx + 30; x++) { if (!enTunel(x, y)) continue; const d = Math.hypot(x - tx - 6, (y - 96) * 1.4); if (d < 34) R.pset(x, y, mez(R.pget(x, y), hex('#f8d070'), (H(x, y, 67) < 0.5 ? 0.5 : 0.36) * (1 - d / 34))); }
  const golpe = cracks, rasca = t > golpe + 0.45;
  T.topo(R, tx, TUN.suelo - (anda && Math.floor(t * 8) % 2 ? 1 : 0), t, { fuera: 1, mira: anda ? 1 : rasca ? 0 : -1, rasca });
  // la gota del techo: crece, cae sobre el casco y salpica
  const gx = XG, gy0 = techo(XG) + 1, cae = tramo(t, golpe - 0.22, golpe);
  if (t < golpe) { const r = cl((t - (golpe - 1.4)) / 1.2); if (cae <= 0) { R.pset(gx, gy0, AGUA[3]); if (r > 0.4) R.pset(gx, gy0 + 1, AGUA[4]); if (r > 0.8) { R.pset(gx - 1, gy0 + 1, AGUA[2]); R.pset(gx, gy0 + 2, AGUA[3]); } } else gota(gx, gy0 + 2 + cae * 8); }
  else if (t < golpe + 0.35) { const s = (t - golpe) / 0.35; for (const [vx, vy] of [[-6, -4], [5, -5], [-3, -7], [7, -2]]) R.pset(Math.round(gx + vx * s), Math.round(gy0 + 10 + vy * s + 10 * s * s), AGUA[4]); }
  if (t > golpe && t < golpe + 1.1) R.icono('!', tx + 10, 92, D.Y, K, 1);
};

// ── 2 · la mesa de las pruebas: arena, roca con agujeros y esponja ──
const SA = { x0: 118, x1: 146, y0: 52, top: 64, y1: 120 }, RO = { x: 178, y: 82 }, BK = { x0: 164, x1: 192, y0: 104, y1: 124 }, SP0 = { x0: 212, x1: 252, y0: 94, y1: 120 }, PL = { x: 232, y: 124, rx: 36, ry: 7 };
const AGUJ = [[168, 78, 3], [180, 72, 2], [189, 84, 3], [174, 90, 2], [162, 88, 2], [184, 94, 2]];
const F2 = fijo(() => {
  // la pared de azulejos blancos con su lechada
  const AZ = pal(['#c8ccc8', '#dcdfda', '#ecefea', '#f8faf6']);
  for (let y = 0; y <= 100; y++) for (let x = 0; x <= 319; x++) { const r = Math.floor(y / 9), u = (x + (r % 2) * 7) % 14, v = y % 9;
    R.pset(x, y, u === 0 || v === 0 ? hex('#a8aca6') : R.tone(AZ, 2 + (H(Math.floor((x + (r % 2) * 7) / 14), r, 70) - 0.5) * 0.9 + (u === 1 || v === 1 ? 0.8 : 0) - y / 220, x, y)); }
  // el tablero perforado con sus herramientas colgadas
  R.rect(6, 18, 104, 92, K); for (let y = 19; y <= 91; y++) for (let x = 7; x <= 103; x++) R.pset(x, y, (x % 6 === 3 && y % 6 === 3) ? hex('#6a4a2a') : R.tone(pal(['#a8804e', '#c09460', '#d4aa72', '#e4c28a']), 2 + (H(x >> 2, y, 71) - 0.5) * 0.6 - (x - 7) / 200, x, y));
  // la lupa, las pinzas, la regla, la goma enrollada, el embudo y la gradilla de tubos
  R.anillo(22, 34, 7, K); R.anillo(22, 34, 6, hex('#3a3e4a')); R.disco(22, 34, 5, hex('#c8e8f4')); R.pset(20, 32, D.W); R.pset(19, 33, D.W); R.linea(27, 39, 32, 50, K); R.linea(28, 39, 33, 50, hex('#3a2a20'));
  R.linea(40, 26, 44, 56, K); R.linea(48, 26, 44, 56, K); R.linea(41, 26, 45, 55, hex('#c8ccd8')); R.linea(47, 26, 45, 55, hex('#9aa0ac')); R.rect(41, 24, 47, 26, K);
  R.rect(54, 22, 59, 70, K); R.rect(55, 23, 58, 69, D.Y); for (let y = 25; y < 69; y += 3) R.rect(55, y, y % 9 === 1 ? 57 : 56, y, K);
  for (let k = 0; k < 4; k++) R.anillo(74, 34, 4 + k * 2, k % 2 ? hex('#c8602a') : hex('#e8803a')); R.anillo(74, 34, 11, K);
  R.poligono([[86, 24], [100, 24], [95, 36], [95, 46], [92, 46], [92, 36]], K); R.poligono([[88, 25], [98, 25], [94, 35], [94, 45], [93, 45], [93, 35]], hex('#c8d8e0'));
  R.rect(14, 70, 100, 74, K); R.rect(15, 71, 99, 72, hex('#8a5a2a')); R.rect(14, 84, 100, 88, K); R.rect(15, 85, 99, 86, hex('#8a5a2a'));
  for (let k = 0; k < 8; k++) { const x = 19 + k * 10, c = ['#e85a5a', '#5aa8e8', '#f0c040', '#7ac860', '#c870d8', '#f08a3a', '#5ad0c0', '#e8e8f0'][k], y0 = 62 + (k % 3); R.rect(x, y0, x + 5, 86, K); R.rect(x + 1, y0 + 1, x + 4, 85, hex('#e8f4f8')); R.rect(x + 1, y0 + 10 + (k % 3) * 2, x + 4, 85, hex(c)); R.pset(x + 1, y0 + 2, D.W); }
  // el reloj de pared (las agujas se pintan en cada fotograma) y una lámina de los estratos
  R.disco(150, 36, 13, K); R.disco(150, 36, 12, hex('#3a3e4a')); R.disco(150, 36, 10, hex('#f8f8f0')); for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6; R.pset(Math.round(150 + Math.cos(an) * 8), Math.round(36 + Math.sin(an) * 8), k % 3 ? hex('#8a8e9a') : K); }
  R.rect(118, 58, 186, 92, K); R.rect(119, 59, 185, 91, hex('#f8f4e8')); [[62, '#7aa84a'], [66, '#5a3e28'], [72, '#d0ae70'], [80, '#9aa0a8'], [86, '#ece8dc']].forEach(([y, c], k, A) => R.rect(122, y, 182, (A[k + 1] ? A[k + 1][0] : 89) - 1, hex(c)));
  for (let k = 0; k < 7; k++) { R.pset(130 + k * 7, 76 + (k % 2), K); R.pset(126 + k * 8, 83, hex('#c8c4b8')); } R.rect(150, 62, 152, 88, hex('#2a3a5a')); R.rect(150, 74, 152, 88, hex('#3a86c0'));
  // la balda con muestras de suelo en tarros y el fregadero con su grifo
  R.rect(196, 50, 270, 53, K); R.rect(197, 50, 269, 51, hex('#e8e0d0'));
  for (const [x0, cs] of [[200, ['#d0ae70', '#5a3e28', '#9aa0a8']], [214, ['#c86a3a', '#e8d8a8', '#5a3e28']], [228, ['#9aa0a8', '#3a4a5a', '#d0ae70']], [242, ['#ece8dc', '#c86a3a', '#7aa84a']], [256, ['#5a3e28', '#d0ae70', '#c86a3a']]]) {
    R.rect(x0, 34, x0 + 10, 49, K); R.rect(x0 + 1, 33, x0 + 9, 35, hex('#c8302a')); cs.forEach((c, k) => R.rect(x0 + 1, 37 + k * 4, x0 + 9, 40 + k * 4, hex(c))); R.pset(x0 + 2, 38, D.W); }
  R.rect(268, 66, 319, 70, K); R.rect(269, 67, 319, 68, hex('#d8dce4')); R.rect(272, 70, 319, 99, K); R.rect(273, 71, 319, 98, hex('#b8bcc6')); R.rect(276, 74, 319, 96, hex('#8a8e9a'));
  R.rect(292, 52, 296, 66, K); R.rect(293, 53, 295, 65, hex('#c8ccd8')); R.rect(284, 50, 296, 54, K); R.rect(285, 51, 295, 53, hex('#e0e4ec')); R.rect(282, 54, 286, 60, K); R.rect(283, 55, 285, 59, hex('#c8ccd8')); R.rect(290, 46, 298, 49, K); R.rect(291, 47, 297, 48, hex('#3a86c0'));
  // la encimera: tablas claras, el canto y los armarios
  R.rect(0, 99, 319, 101, K); R.rect(0, 100, 319, 100, hex('#7a5a3a'));
  tablas(0, 102, 319, 165, 9, MADC, { horiz: true, sem: 7, largo: 120, luz: (x, y) => (y < 110 ? 0.4 : 0) - (y - 102) / 140 });
  R.rect(0, 166, 319, 170, K); R.rect(0, 167, 319, 168, hex('#6a4426')); R.rect(0, 169, 319, 169, hex('#3a2416'));
  for (let y = 171; y <= 179; y++) for (let x = 0; x <= 319; x++) R.pset(x, y, x % 64 === 0 ? K : R.tone(MAD, 2.4 - (y - 171) / 8 + (x % 64 === 1 ? 0.8 : 0), x, y)); for (let x = 28; x < 320; x += 64) { R.rect(x, 173, x + 8, 175, K); R.rect(x + 1, 174, x + 7, 174, D.S); }
  // la taza humeante, el paño de rayas, el cuaderno con el dibujo de la esponja, el lápiz y el trozo de yeso
  R.rect(14, 118, 32, 138, K); R.rect(15, 119, 31, 137, hex('#e85a4a')); R.rect(15, 119, 17, 137, hex('#f8907a')); R.rect(16, 119, 30, 121, hex('#5a3a22')); R.anillo(34, 128, 5, K); R.anillo(34, 128, 4, hex('#e85a4a'));
  R.poligono([[0, 142], [30, 140], [34, 166], [0, 166]], K); R.poligono([[0, 143], [29, 141], [33, 165], [0, 165]], hex('#e8eef8')); for (const y of [147, 153, 159]) R.linea(0, y, 31, y - 1, hex('#4a7ad8'));
  R.poligono([[44, 136], [100, 132], [104, 162], [46, 166]], K); R.poligono([[46, 137], [98, 134], [102, 160], [47, 164]], hex('#f8f4e8')); R.linea(73, 135, 75, 162, hex('#c8c4b8'));
  for (let k = 0; k < 5; k++) R.linea(50, 142 + k * 4, 70, 141 + k * 4, hex('#c8d4e8'));
  R.rect(80, 144, 94, 154, hex('#5a5a6a')); R.rect(81, 145, 93, 147, hex('#7ac860')); R.rect(81, 148, 93, 153, hex('#f0c040')); for (const x of [84, 88, 92]) { R.pset(x, 140, hex('#3a86c0')); R.pset(x, 142, hex('#3a86c0')); }
  R.linea(58, 170 - 6, 96, 158 - 6, K); R.linea(58, 169 - 6, 96, 157 - 6, hex('#f0c040')); R.pset(97, 157 - 6, hex('#f0b0a0')); R.pset(57, 170 - 6, hex('#3a3a3a'));
  R.poligono([[270, 150], [278, 140], [292, 139], [300, 148], [292, 156], [274, 156]], K); R.poligono([[272, 150], [279, 142], [291, 141], [298, 148], [291, 154], [275, 154]], hex('#f0ece0')); R.linea(280, 143, 292, 152, hex('#c8c4b8'));
  // la botella de agua y un cerco mojado en la madera
  R.rect(286, 102, 304, 134, K); R.rect(287, 108, 303, 133, hex('#9ad0f0')); R.rect(287, 116, 303, 133, hex('#3a86c0')); R.rect(289, 117, 290, 131, hex('#8ac8f0')); R.rect(291, 98, 299, 108, K); R.rect(292, 99, 298, 107, hex('#c8e8f8')); R.rect(291, 96, 299, 99, hex('#2a5aa8'));
  R.anillo(70, 124, 6, hex('#8e6238'));
  // la columna de arena: el cristal, la arena seca y la bandeja
  R.rect(SA.x0 - 6, SA.y1 + 1, SA.x1 + 6, SA.y1 + 7, K); R.rect(SA.x0 - 5, SA.y1 + 2, SA.x1 + 5, SA.y1 + 5, hex('#c8ccd8')); R.rect(SA.x0 - 5, SA.y1 + 6, SA.x1 + 5, SA.y1 + 6, hex('#8a8e9a'));
  R.rect(SA.x0 - 1, SA.y0, SA.x1 + 1, SA.y1 + 1, K);
  for (let y = SA.y0 + 1; y <= SA.y1; y++) for (let x = SA.x0; x <= SA.x1; x++) R.pset(x, y, y < SA.top ? hex('#e4f2f6') : R.tone(ARE, 2.2 + (H(x, y, 72) - 0.5) * 1.6 + (x < SA.x0 + 4 ? 0.7 : x > SA.x1 - 4 ? -0.7 : 0), x, y));
  for (let k = 0; k < 18; k++) R.pset(SA.x0 + 2 + Math.floor(H(k, 1, 73) * 24), SA.top + 2 + Math.floor(H(k, 2, 73) * 52), k % 2 ? hex('#8a7a6a') : hex('#c86a3a'));
  // el soporte con el aro, la roca con agujeros y el vaso de precipitados debajo
  R.rect(158, 124, 200, 128, K); R.rect(159, 125, 199, 126, hex('#3a3e48')); R.rect(156, 52, 159, 124, K); R.rect(157, 53, 158, 123, hex('#c8ccd8'));
  R.rect(158, 95, 166, 98, K); R.rect(159, 96, 165, 97, hex('#8a8e9a'));
  R.rect(BK.x0, BK.y0, BK.x1, BK.y1, K); R.rect(BK.x0 + 1, BK.y0 + 1, BK.x1 - 1, BK.y1 - 1, hex('#e8f6fa')); R.rect(BK.x0 - 2, BK.y0, BK.x0, BK.y0 + 1, K);
  for (let y = BK.y0 + 4; y < BK.y1 - 2; y += 4) R.rect(BK.x1 - 7, y, BK.x1 - 3, y, hex('#8a9aa8')); R.rect(BK.x0 + 2, BK.y0 + 2, BK.x0 + 2, BK.y1 - 3, D.W);
  // el plato de la esponja
  for (let y = PL.y - PL.ry - 1; y <= PL.y + PL.ry + 2; y++) for (let x = PL.x - PL.rx - 1; x <= PL.x + PL.rx + 1; x++) { const d = ((x - PL.x) / PL.rx) ** 2 + ((y - PL.y) / PL.ry) ** 2; if (d > 1.12) continue;
    R.pset(x, y, d > 1 ? K : d > 0.8 ? (y < PL.y ? hex('#ffffff') : hex('#a8b0c0')) : d > 0.66 ? hex('#5a7ad8') : R.tone(pal(['#c8ccd8', '#e0e4ec', '#f4f6fc']), 2 - (y - PL.y) / 6, x, y)); }
});
// la regadera en la mano: el asa bajo los dedos, el cuerpo, el caño y la alcachofa
const regadera = (hx, hy, vierte) => { const bx0 = hx - 24, bx1 = hx - 8, by0 = hy + 3, by1 = hy + 16, tip = vierte ? [hx - 32, hy + 14] : [hx - 33, hy + 2];
  R.linea(bx0 + 2, by0 + 10, tip[0], tip[1], K); R.linea(bx0 + 2, by0 + 9, tip[0], tip[1] - 1, K); R.linea(bx0 + 2, by0 + 9, tip[0] + 1, tip[1], hex('#3a8a5a'));
  R.disco(tip[0], tip[1], 3, K); R.disco(tip[0], tip[1], 2, hex('#6ac08a')); R.pset(tip[0] - 1, tip[1] - 1, D.W);
  R.rect(bx0, by0, bx1, by1, K); R.rect(bx0 + 1, by0 + 1, bx1 - 1, by1 - 1, hex('#3a8a5a')); R.rect(bx0 + 1, by0 + 1, bx0 + 3, by1 - 1, hex('#6ac08a')); R.rect(bx1 - 3, by0 + 1, bx1 - 1, by1 - 1, hex('#1e5a3a')); R.rect(bx0 + 1, by0 + 5, bx1 - 1, by0 + 5, hex('#2a6a44'));
  R.anillo(bx1 - 1, by0 + 2, 5, K); R.anillo(bx1 - 1, by0 + 2, 4, hex('#3a8a5a'));
  return tip; };
const mano2 = (t) => { // [x, y, vierte, objetivo y]
  const A = [162, 30, SA.top - 2], B = [208, 40, 68], C = [262, 46, SP0.y0 - 2];
  if (t < holes - 0.05) return [A[0], A[1], true, A[2]];
  if (t < holes + 0.25) { const u = tramo(t, holes - 0.05, holes + 0.25); return [lerp(A[0], B[0], u), lerp(A[1], B[1], u) - Math.sin(u * Math.PI) * 6, false, 0]; }
  if (t < way - 0.3) return [B[0], B[1], true, B[2]];
  if (t < way + 0.05) { const u = tramo(t, way - 0.3, way + 0.05); return [lerp(B[0], C[0], u), lerp(B[1], C[1], u) - Math.sin(u * Math.PI) * 6, false, 0]; }
  if (t < sponge + 0.15) return [C[0], C[1], true, C[2]];
  const u = tramo(t, sponge + 0.3, P3 - 0.15); return [C[0] + u * 10, lerp(C[1], -70, u), false, 0]; };
const p2 = (t) => {
  F2.copia();
  // el segundero del reloj, que salta cada segundo; el grifo que gotea al fregadero
  { const an = Math.floor(t) * Math.PI / 30 - Math.PI / 2; R.linea(150, 36, Math.round(150 + Math.cos(an) * 8), Math.round(36 + Math.sin(an) * 8), D.Q); R.linea(150, 36, 150, 29, K); R.linea(150, 36, 155, 38, K); R.pset(150, 36, K); }
  { const ph = (t * 0.8) % 1; if (ph < 0.6) { const y = Math.round(61 + ph * 50); if (y < 74) { R.pset(284, y, AGUA[4]); R.pset(284, y + 1, AGUA[2]); } } else R.pset(284, 61, AGUA[3]); }
  // el vapor de la taza
  for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3) % 1, y = Math.round(116 - ph * 22), x = Math.round(22 + k * 3 + Math.sin(t * 2 + k + ph * 5) * 2); if (ph < 0.85) { R.pset(x, y, hex('#f8f8f8')); R.pset(x + 1, y - 1, hex('#e0e4e8')); } }
  // la arena se moja de arriba abajo; cuando llega abajo gotea a la bandeja
  const wy = Math.round(lerp(SA.top, SA.y1, tramo(t, P2 + 0.05, P2 + 3.4)));
  for (let y = SA.top; y <= wy; y++) for (let x = SA.x0; x <= SA.x1; x++) R.pset(x, y, y === wy && (x + Math.floor(t * 4)) % 3 === 0 ? AGUA[3] : mez(F2.px(x, y), hex('#3a2a1e'), 0.42));
  if (t < holes + 0.6) for (let x = SA.x0; x <= SA.x1; x++) { R.pset(x, SA.top - 1, AGUA[3]); if ((x + Math.floor(t * 9)) % 4 === 0) R.pset(x, SA.top - 2, AGUA[4]); }
  if (wy >= SA.y1 - 1) { const ph = (t * 1.5) % 1; R.pset(SA.x0 + 12, SA.y1 + 2 + Math.round(ph * 3), AGUA[4]); R.rect(SA.x0 - 3, SA.y1 + 4, SA.x1 + 3, SA.y1 + 4, AGUA[2]); }
  R.rect(SA.x0 + 1, SA.y0 + 2, SA.x0 + 1, SA.y1 - 2, D.W);
  // la roca con agujeros: se moja y gotea por cada agujero al vaso, que se llena
  const mojaR = tramo(t, holes + 0.25, way);
  const lv = Math.round(BK.y1 - 2 - 12 * tramo(t, holes + 0.45, P3 - 0.4));
  for (let y = lv; y < BK.y1; y++) for (let x = BK.x0 + 1; x < BK.x1; x++) R.pset(x, y, y === lv ? AGUA[4] : x < BK.x0 + 4 ? AGUA[3] : AGUA[2]);
  for (let y = 66; y <= 98; y++) for (let x = 156; x <= 200; x++) { const dx = (x - RO.x) / 22, dy = (y - RO.y) / 15, d = dx * dx + dy * dy + Math.sin(x * 0.5 + y * 0.3) * 0.06; if (d > 1) continue;
    let c = d > 0.86 ? K : R.tone(ROC, 2.4 - dx * 0.8 - dy * 1.0 + (H(x, y, 74) - 0.5) * 0.7, x, y); if (d <= 0.86 && dy > 0.6 - mojaR * 1.6) c = mez(c, hex('#6a7a8a'), 0.35 * mojaR); R.pset(x, y, c); }
  for (const [hx, hy, r] of AGUJ) { R.disco(hx, hy, r, hex('#2a2620')); R.pset(hx - 1, hy - r, hex('#8a867c')); if (mojaR > 0.15) R.pset(hx, hy + r - 1, AGUA[3]); }
  R.rect(158, 96, 198, 97, K); R.rect(160, 96, 196, 96, hex('#8a8e9a'));
  if (mojaR > 0.1) for (const [hx, , r] of AGUJ.filter((q) => q[0] > BK.x0 + 2 && q[0] < BK.x1 - 2)) { const ph = (t * 1.8 + hx * 0.13) % 1, y = Math.round(98 + ph * (lv - 98)); gota(hx, y); }
  // la esponja: se empapa de arriba abajo, se hincha y deja charco en el plato
  const moja = tramo(t, way + 0.2, sponge + 0.7), hin = Math.round(2 * tramo(t, sponge - 0.2, sponge + 0.7)), charco = tramo(t, sponge, P3 - 0.2);
  if (charco > 0) for (let y = PL.y - 4; y <= PL.y + 4; y++) for (let x = PL.x - 30; x <= PL.x + 30; x++) { const d = ((x - PL.x) / (22 + charco * 9)) ** 2 + ((y - PL.y) / (3 + charco * 2)) ** 2; if (d < 1) R.pset(x, y, d > 0.75 ? AGUA[4] : (x + y + Math.floor(t * 6)) % 7 ? AGUA[3] : AGUA[4]); }
  const sx0 = SP0.x0 - hin, sx1 = SP0.x1 + hin, sy0 = SP0.y0 - hin, sy1 = SP0.y1, wf = Math.round(lerp(sy0 + 6, sy1 + 1, moja));
  R.rect(sx0 - 1, sy0 - 1, sx1 + 1, sy1 + 1, K);
  for (let y = sy0; y <= sy1; y++) for (let x = sx0; x <= sx1; x++) { const verde = y < sy0 + 6, mojado = moja > 0 && y < wf;
    let P = verde ? pal(['#1e6a34', '#2e8a44', '#4aaa5a', '#6ac870']) : mojado ? pal(['#8a6a10', '#b08a1c', '#c8a028', '#e0bc40']) : pal(['#c8a020', '#e8c030', '#f8d850', '#fff0a0']);
    let v = 2 + (x < sx0 + 3 ? 0.8 : x > sx1 - 4 ? -0.8 : 0) + (y === sy0 + 6 ? -1 : 0); const poro = !verde && H(x, y, 75) < 0.12;
    R.pset(x, y, poro ? (mojado ? hex('#4a3a10') : hex('#b08a1c')) : R.tone(P, v, x, y)); if (verde && H(x, y, 76) < 0.1) R.pset(x, y, hex('#1a4a24')); }
  if (moja > 0 && moja < 1) for (let x = sx0; x <= sx1; x += 3) R.pset(x + (Math.floor(t * 6) % 3), wf, AGUA[4]);
  if (charco > 0.2) for (let k = 0; k < 3; k++) { const ph = (t * 1.2 + k / 3) % 1; R.pset(sx0 + 4 + k * 16, sy1 + 1 + Math.round(ph * 3), AGUA[4]); }
  // la mano con la regadera: riega la arena, la roca y la esponja, y se va
  const [hx, hy, vierte, ty] = mano2(t), X = Math.round(hx), Y = Math.round(hy);
  if (Y > -50) {
    if (vierte) { const tx = X - 32, ty0 = Y + 16; for (let y = ty0; y <= ty; y++) { const w = 1 + (y - ty0) / 16; for (let i = -w; i <= w; i += 1) if ((y + Math.floor(t * 30) + Math.round(i) * 3) % 4) R.pset(Math.round(tx + i), y, Math.abs(i) < 1 ? AGUA[4] : AGUA[3]); }
      for (let k = 0; k < 4; k++) { const ph = (t * 4 + k / 4) % 1; R.pset(Math.round(tx - 5 + k * 3 + (k - 1.5) * ph * 4), Math.round(ty - ph * 4 + ph * ph * 4), AGUA[4]); } }
    regadera(X, Y, vierte);
    T.brazo(R, X + 12, Y - 70, X, Y, '#3a5aa8', -1, { codo: [X - 4, Y - 26] });
  }
};

// ── 3 · el pozo en corte, 1909 por la tarde: cuanto más hondo, más empuja ──
const p3 = (t) => {
  const pies = lerp(64, 100, tramo(t, P3 + 0.1, sealev + 0.5)), fl = tramo(t, sealev - 0.1, wayin), niv = 0.42 * tramo(t, harder + 0.1, P4 - 0.2);
  const g = T.pozo(R, t, { encuadre: 'corte', epoca: '1909', luz: 'tarde', fondo: pies, flechas: fl, nivel: niv, cubo: false });
  const fy = g.fondoY ?? Math.round(52 + 1.2 * pies), my = g.marY ?? 88;
  // la raya del nivel del mar, del mar al pozo: late en «sea level»
  if (t > sealev - 0.25) { const on = t > sealev + 0.9 || Math.floor(t * 6) % 2 === 0; if (on) for (let x = 96; x <= 230; x += 4) { R.pset(x, my, D.W); R.pset(x + 1, my, AGUA[4]); R.pset(x, my + 1, K); } }
  pulso(216, my, t, sealev);
  // la profundidad cavada, junto al pozo
  R.numero(String(Math.round(pies / 2) * 2), 128, Math.min(176, fy + 2), { tam: 8 });
  // el cavador del fondo: pica; cuando el agua empuja, sube por la escalera
  const sube = tramo(t, pushes, P4 - 0.25), cy = Math.round(lerp(fy, fy - 44, sube));
  const m = R.actor(EL.cavador, sube > 0 ? 108 : 112, cy, t, { dir: sube > 0 ? -1 : 1, anda: sube > 0 && sube < 1, sorpresa: t > harder && t < pushes + 0.2, brazos: sube > 0 && sube < 1 && Math.floor(t * 5) % 2 === 0 });
  if (sube <= 0 && t < harder) { const golpe = Math.floor(t * 2.6) % 2, [mx, mmy] = m.mano || [118, fy - 12], an = golpe ? 0.5 : -1.1, px = Math.round(mx + Math.cos(an) * 9), py = Math.round(mmy + Math.sin(an) * 9);
    R.linea(mx, mmy, px, py, hex('#8a5c34')); R.rect(px - 2, py - 1, px + 2, py, hex('#5a5e6a')); R.pset(px - 3, py + 1, K);
    if (golpe) for (let k = 0; k < 4; k++) R.pset(116 + k, fy - 2 - ((k * 3 + Math.floor(t * 9)) % 4), hex('#9a7a5a')); }
  // arriba: el capataz mira abajo y se asusta; el fogonero echa carbón a la caldera
  R.actor(EL.capataz, 140, g.suelo ?? 52, t, { dir: -1, dedo: t > deeper && t < harder, sorpresa: t > harder && t < harder + 0.9, habla: t > deeper && t < sealev + 0.6 && Math.sin(t * 8) > 0 });
  { const ph = (t - P3) % 1.3 / 1.3, br = ph < 0.4; R.actor(EL.cavador2, 58, g.suelo ?? 52, t, { dir: 1, brazos: br });
    if (ph > 0.35 && ph < 0.75) { const u = (ph - 0.35) / 0.4; R.rect(Math.round(64 + u * 16) - 1, Math.round(34 - Math.sin(u * Math.PI) * 10), Math.round(64 + u * 16), Math.round(35 - Math.sin(u * Math.PI) * 10), K); } }
  if (t > harder) R.bocadillo(156, 30, { icono: '!' });
};

// ── 4 · la bomba de balancín: bombean más deprisa y el mar entra más deprisa ──
const ritmo = (t) => tramo(t, pump - 0.3, faster);
const fase = (t) => { const a0 = pump - 0.3, b0 = faster, w0 = 4, w1 = 13; const r = t < a0 ? 0 : t < b0 ? (t - a0) ** 2 / (2 * (b0 - a0)) : (b0 - a0) / 2 + (t - b0); return w0 * (t - P4) + (w1 - w0) * r; };
const orilla = (y) => 214 + (y - 98) * 1.05;
const CIELO4 = pal(['#4a5a98', '#7a7ab0', '#b08aa8', '#e8a890', '#f8d0a0']);
const MASK4 = new Uint8Array(320 * 180), ESP4 = { b: null };
const F4 = fijo(() => {
  // el cielo de la tarde, tramado, y el sol bajo
  for (let y = 0; y <= 66; y++) for (let x = 0; x <= 319; x++) { R.pset(x, y, R.tone(CIELO4, y / 15 + 0.2 + (H(x >> 2, y >> 1, 80) - 0.5) * 0.25, x, y)); MASK4[y * 320 + x] = 1; }
  for (const [x0, y0, w] of [[66, 22, 50], [130, 30, 46], [200, 18, 50]]) for (let k = 0; k < w; k++) if (H(k, x0, 81) < 0.7) R.pset(x0 + k, y0 + Math.round(Math.sin(k * 0.2) * 1), hex('#d8b0b8'));
  R.disco(70, 56, 11, hex('#f8c890')); R.disco(70, 56, 8, hex('#fce0a8')); R.disco(70, 56, 6, hex('#fff4d0'));
  // la costa de enfrente con sus pinos y casitas, y el mar de la tarde
  for (let x = 150; x <= 319; x++) { const hh = Math.round(4 + Math.sin(x * 0.04) * 3 + Math.sin(x * 0.13) * 1.5); for (let y = 64 - hh; y <= 66; y++) { R.pset(x, y, y < 66 - hh + 1 ? hex('#5a6a7a') : hex('#4a5a6a')); MASK4[y * 320 + x] = 0; } if (x % 5 === 0 && H(x, 1, 82) < 0.6) for (let j = 0; j < 6; j++) for (let i = -(j >> 1); i <= (j >> 1); i++) { R.pset(x + i, 58 - hh + j, hex('#3a4a5a')); MASK4[(58 - hh + j) * 320 + x + i] = 0; } }
  for (const x of [196, 232, 280]) { R.rect(x, 59, x + 4, 62, hex('#f0e8e0')); R.pset(x + 2, 58, hex('#c86a5a')); }
  for (let y = 67; y <= 98; y++) for (let x = 140; x <= 319; x++) R.pset(x, y, R.tone(pal(['#3a5a8a', '#5a7aa8', '#8a9ac0', '#e8b8a8']), 2.6 - (y - 67) / 14 + (Math.abs(x - 70) < 26 && y < 82 ? 0.6 : 0), x, y));
  // la isla: robles y abetos detrás del claro
  for (let x = 0; x <= 150; x++) { const hh = Math.round(30 + Math.sin(x * 0.05) * 6 + Math.sin(x * 0.17) * 3); for (let y = 98 - hh; y <= 98; y++) { R.pset(x, y, R.tone(pal(['#1e3a2a', '#2e4e34', '#3e6a3e', '#5a8a4a']), 1.5 + (H(x >> 1, y >> 1, 83) - 0.5) * 1.5 - (y - 98 + hh) / 30 + (x < 60 && y < 80 ? 0.6 : 0), x, y)); MASK4[y * 320 + x] = 0; } }
  for (const [cx, cy, r] of [[18, 66, 13], [50, 62, 15], [86, 62, 13], [122, 60, 15], [146, 70, 10]]) { R.disco(cx, cy, r + 1, hex('#1a2e22')); for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r && x >= 0) { R.pset(x, y, R.tone(pal(['#2a4a2a', '#3e6a34', '#5a8a3e', '#8aaa4a']), 2 - ((x - cx) + (y - cy)) / r + (H(x, y, 84) - 0.5) * 1.2, x, y)); MASK4[y * 320 + x] = 0; } }
  // el suelo en corte: tierra negra con raíces, arcilla roja, la grava que deja pasar el agua y la arcilla gris
  for (let y = 99; y <= 179; y++) for (let x = 0; x <= 319; x++) { if (x > orilla(y)) continue;
    const P = y < 104 ? pal(['#2a5a24', '#3e7a30', '#5a9a3a', '#7ac850']) : y < 114 ? pal(['#1e120a', '#2e1c10', '#42291a', '#5a3a24']) : y < 136 ? pal(['#6a2a1a', '#8a3e22', '#b05a32', '#c87448']) : y < 158 ? pal(['#4a4a52', '#6a6a72', '#8a8a92', '#a8a8ae']) : pal(['#3a4250', '#4e5866', '#66707e', '#808a98']);
    let v = 1.7 + (H(x >> 1, y >> 1, 85) - 0.5) * 1.1; if (y >= 136 && y < 158) { const gx = x % 9, gy = (y - 136 + (Math.floor(x / 9) % 2) * 4) % 8; v += (gx === 0 || gy === 0) ? -1.2 : (gx + gy < 5 ? 0.7 : 0); }
    if (y >= 104 && y < 158 && y % 11 === 0 && (x + y) % 3) v -= 0.6;
    R.pset(x, y, R.tone(P, v, x, y)); }
  for (const x0 of [16, 40, 132, 170, 196]) { let x = x0; for (let y = 104; y < 124; y++) { x += Math.sin(y * 0.5 + x0) * 0.6; R.pset(Math.round(x), y, hex('#c8a070')); } }
  for (let k = 0; k < 24; k++) { const x = Math.floor(H(k, 1, 86) * 200), y = 116 + Math.floor(H(k, 2, 86) * 18); R.disco(x, y, 2, K); R.disco(x, y, 1, hex('#a8a090')); }
  // la orilla de rocas y el mar en corte, más oscuro abajo
  for (let y = 96; y <= 179; y++) for (let x = Math.floor(orilla(y)) + 1; x <= 319; x++) R.pset(x, y, R.tone(pal(['#0e2a4a', '#1a4a7a', '#2a6aa0', '#3a86c0']), 3 - (y - 96) / 24 + (H(x >> 2, y >> 2, 87) - 0.5) * 0.4, x, y));
  for (let y = 97; y <= 179; y++) { const xo = Math.round(orilla(y)); for (let x = xo - 6; x <= xo + 1; x++) R.pset(x, y, x === xo + 1 ? K : R.tone(pal(['#6a5a3e', '#8a7a5a', '#a8946a', '#c8b080']), 2 + (H(x, y, 89) - 0.5) * 1.6 - (x - xo + 6) / 8, x, y)); }
  for (let k = 0; k < 14; k++) { const y = 100 + k * 6 + Math.floor(H(k, 1, 90) * 3), x = Math.round(orilla(y)) - 2, r = 1 + Math.floor(H(k, 2, 90) * 3); R.disco(x, y, r + 1, K); R.disco(x, y, r, k % 3 ? hex('#7a7a82') : hex('#8a6a5a')); R.pset(x - 1, y - r, hex('#b0b0b6')); }
  for (let k = 0; k < 5; k++) { const y = 112 + k * 14, x = Math.round(orilla(y)) + 3; R.pset(x, y, hex('#f0e8d8')); R.pset(x + 1, y, hex('#c8b8a8')); }
  // el pozo con su entibado, la tapa de tablones, los caballetes de la canaleta, montones de tierra y el cubo
  for (let y = 98; y <= 179; y++) for (let x = 70; x <= 108; x++) R.pset(x, y, x < 74 || x > 104 ? (y % 12 < 2 ? K : R.tone(MAD, 2.4 + (x > 104 ? -0.6 : 0.4), x, y)) : R.tone(pal(['#120c08', '#1e140c', '#2e2016']), 1.2 + (x - 74) / 40 + (H(x, y >> 1, 88) - 0.5) * 0.6, x, y));
  R.rect(64, 95, 114, 99, K); R.rect(65, 96, 113, 98, hex('#8a5c34')); for (let x = 66; x < 113; x += 8) R.pset(x, 97, hex('#4a2e1a'));
  R.rect(76, 72, 79, 96, K); R.rect(77, 72, 78, 95, hex('#8a5c34')); R.rect(99, 72, 102, 96, K); R.rect(100, 72, 101, 95, hex('#6a4426')); R.rect(74, 70, 104, 73, K); R.rect(75, 71, 103, 72, hex('#aa7a48'));
  R.rect(83, 76, 95, 96, K); R.rect(84, 77, 94, 95, hex('#5a5e6a')); R.rect(84, 77, 85, 95, hex('#8a8e9a')); R.rect(83, 80, 95, 81, K); R.rect(95, 79, 100, 82, K); R.rect(96, 80, 99, 81, hex('#5a5e6a'));
  R.rect(86, 99, 89, 168, K); R.rect(87, 99, 88, 168, hex('#6a6e7a'));
  for (const x of [140, 190]) { R.linea(x - 5, 99, x, 88 + (x - 98) * 0.09, K); R.linea(x + 5, 99, x, 88 + (x - 98) * 0.09, K); R.linea(x - 4, 99, x, 89 + (x - 98) * 0.09, hex('#8a5c34')); }
  for (let x = 98; x <= 232; x++) { const y = Math.round(80 + (x - 98) * 0.11); R.rect(x, y, x, y + 5, K); R.rect(x, y + 1, x, y + 4, x % 16 === 0 ? hex('#4a2e1a') : hex('#8a5c34')); R.pset(x, y + 1, hex('#aa7a48')); }
  R.poligono([[16, 99], [26, 88], [40, 86], [54, 99]], K); R.poligono([[18, 98], [27, 89], [40, 88], [52, 98]], hex('#5a3a24')); for (let k = 0; k < 8; k++) R.pset(24 + k * 3, 92 + (k % 3), hex('#7a5a3a'));
  R.rect(160, 90, 170, 99, K); R.rect(161, 91, 169, 98, hex('#8a8e9a')); R.rect(161, 91, 169, 92, hex('#c8ccd8'));
});
const p4 = (t) => {
  if (!ESP4.b) ESP4.b = R.nuevo();
  const prev = R.usar(ESP4.b);
  F4.copia();
  const rt = ritmo(t), ph = fase(t), s = Math.sin(ph);
  // nubes bajas de tres tonos a tres velocidades (solo en el cielo, lejos de Atom) y dos gaviotas
  for (const [x0, y0, w, v] of [[84, 26, 22, 1.5], [128, 40, 28, 3], [186, 22, 18, 4]]) { const cx = x0 + (t - P4) * v;
    for (const [dx, dy, r, c] of [[0, 2, w * 0.32, '#c8909c'], [-w * 0.3, 3, w * 0.22, '#c8909c'], [w * 0.3, 3, w * 0.24, '#e8b4b0'], [-2, -1, w * 0.26, '#fce4d8'], [w * 0.12, 0, w * 0.18, '#fff4ec']]) {
      const X = Math.round(cx + dx), Y = Math.round(y0 + dy), rr = Math.round(r); for (let y = Y - rr; y <= Y + rr; y++) for (let x = X - rr; x <= X + rr; x++) if ((x - X) ** 2 + (y - Y) ** 2 <= rr * rr && x >= 60 && x < 262 && y >= 16 && MASK4[y * 320 + x]) R.pset(x, y, hex(c)); } }
  for (const [x0, y0, v] of [[70, 46, 14], [200, 40, -10]]) { const x = Math.round(x0 + (t - P4) * v), y = y0 + Math.round(Math.sin(t * 2 + x0) * 2), ab = Math.sin(t * 9 + x0) > 0; if (x > 62 && x < 258) for (const [i, j] of [[0, 0], [-1, ab ? -1 : 0], [-2, ab ? -2 : 1], [1, ab ? -1 : 0], [2, ab ? -2 : 1]]) R.pset(x + i, y + j, K); }
  // la goleta lejana y los reflejos del mar
  { const x = Math.round(300 - (t - P4) * 3); R.rect(x, 64, x + 10, 65, hex('#2a2a3a')); R.linea(x + 3, 54, x + 3, 64, K); R.linea(x + 7, 56, x + 7, 64, K); R.poligono([[x + 4, 55], [x + 4, 63], [x + 9, 63]], hex('#f8ece0')); }
  for (let k = 0; k < 18; k++) { const y = 70 + (k * 7) % 27, x = Math.round(150 + ((k * 53 + t * (6 + (k % 3) * 4)) % 168)); R.rect(x, y, x + 3 + (k % 3), y, k % 2 ? hex('#e8c8b8') : hex('#c8d8f0')); }
  // en el mar en corte: algas que se mecen, un pez, burbujas y los rayos de luz
  for (const [x0, y0, hh] of [[262, 179, 26], [284, 179, 34], [306, 179, 22]]) for (let j = 0; j < hh; j++) { const x = Math.round(x0 + Math.sin(t * 1.6 + j * 0.25 + x0) * j * 0.14); R.pset(x, y0 - j, j % 5 ? hex('#3a8a4a') : hex('#5aaa5a')); R.pset(x + 1, y0 - j, hex('#2a6a3a')); }
  { const x = Math.round(300 - ((t * 8) % 60)), y = 128 + Math.round(Math.sin(t * 2) * 2); if (x > orilla(y) + 4) { R.rect(x, y - 1, x + 6, y + 1, hex('#f0a040')); R.pset(x + 7, y - 1, hex('#f0a040')); R.pset(x + 7, y + 1, hex('#f0a040')); R.pset(x + 1, y - 1, K); } }
  for (let k = 0; k < 5; k++) { const x0 = 248 + k * 15, y = 96 + ((k * 23 + t * 15) % 80); if (x0 > orilla(y) + 2) R.linea(x0, Math.round(y), x0 + 3, Math.round(y) + 8, hex('#4a96d0')); }
  // el agua del mar vuelve por la grava al pozo: flechas más gruesas y más rápidas cuanto más se bombea
  const vel = 14 + rt * 60, gr = 1 + Math.round(rt * 2);
  for (const yy of [140, 147, 154]) { const xe = Math.floor(orilla(yy)), L = xe - 106;
    for (let k = 0; k < 6; k++) { const u = ((t - P4) * vel / L + k / 6) % 1, x = Math.round(xe - 10 - u * (L - 10)); for (let j = -gr; j <= gr; j++) { const x0 = x + Math.abs(j) * 2; R.pset(x0 - 1, yy + j, K); for (let i = x0; i <= x + 11; i++) R.pset(i, yy + j, j === 0 || i === x0 ? AGUA[4] : AGUA[3]); } R.rect(x + 12, yy - 1, x + 12, yy + 1, K); }
    for (let j = -2 - gr; j <= 2 + gr; j++) R.pset(110 + Math.abs(j), yy + j, D.W); for (let j = -1 - gr; j <= 1 + gr; j++) R.pset(111 + Math.abs(j), yy + j, AGUA[3]);
    pulso(xe - 2, yy, t, pulled + (yy - 140) * 0.02); }
  // el agua del pozo: aunque bombean, sube
  const lw = Math.round(lerp(152, 122, tramo(t, pulled - 0.6, faster + 0.8)));
  for (let y = lw; y <= 179; y++) for (let x = 74; x <= 104; x++) { if (x >= 86 && x <= 89) continue; R.pset(x, y, y === lw + Math.round(Math.sin(x * 0.6 + t * 6) * 0.6) ? AGUA[4] : R.tone(AGUA, 2.6 - (y - lw) / 18 + (x < 78 ? 0.5 : 0), x, y)); }
  for (let k = 0; k < 6; k++) { const pb = (t * (1 + rt * 2) + k / 6) % 1, y = Math.round(178 - pb * (178 - lw)); R.pset(80 + k * 4, y, AGUA[4]); }
  // el balancín y la varilla de la bomba
  const pvx = 89, pvy = 70, half = 34, le = [pvx - half, Math.round(pvy + s * 6)], ri = [pvx + half, Math.round(pvy - s * 6)];
  R.linea(92, Math.round(pvy - s * 0.5), 89, 76, K); R.linea(93, Math.round(pvy - s * 0.5), 90, 76, hex('#c8ccd8'));
  for (const d of [-1, 0, 1]) R.linea(le[0], le[1] + d, ri[0], ri[1] + d, d ? K : hex('#aa7a48')); R.linea(le[0], le[1], ri[0], ri[1], hex('#aa7a48')); R.disco(pvx, pvy, 2, K); R.pset(pvx, pvy, D.A);
  // el chorro por la canaleta hasta el mar, al ritmo del bombeo
  const caudal = 0.5 + 0.5 * Math.max(0, -Math.cos(ph)) * (0.6 + rt * 0.8);
  for (let x = 98; x <= 230; x++) { const y = Math.round(80 + (x - 98) * 0.11); R.pset(x, y, ((x - Math.floor((t - P4) * (30 + rt * 60))) % 7 + 7) % 7 === 0 ? AGUA[4] : AGUA[3]); if (caudal > 0.7) R.pset(x, y - 1, AGUA[2]); }
  for (let k = 0; k < 5; k++) { const pw = (t * 3 + k / 5) % 1; R.pset(Math.round(232 + pw * (4 + rt * 6)), Math.round(95 + pw * pw * 4), AGUA[4]); }
  if (caudal > 0.6) for (let k = 0; k < 4; k++) { const pw = (t * 5 + k / 4) % 1; R.pset(236 + k * 2 - Math.round(pw * 3), Math.round(96 - Math.sin(pw * Math.PI) * (3 + rt * 4)), D.W); }
  // los dos buscadores bombean del balancín; el capataz mira el mar y se asusta
  R.actor(EL.cavador, le[0] - 4, 100 + (s > 0.3 ? 1 : 0), t, { dir: 1, brazos: s < 0.2, sonrisa: t < pulled, sorpresa: t > faster, enfado: t > pulled && t < faster });
  R.actor(EL.cavador2, ri[0] + 4, 100 + (s < -0.3 ? 1 : 0), t, { dir: -1, brazos: s > -0.2, sonrisa: t < pulled, sorpresa: t > faster + 0.1 });
  R.actor(EL.capataz, 204, 100, t, { dir: t > pulled - 0.2 && t < faster ? 1 : -1, dedo: t > pulled - 0.2 && t < faster, habla: t > pump && t < pulled && Math.sin(t * 8) > 0.2, sorpresa: t > faster });
  if (t > faster) R.bocadillo(212, 74, { icono: '!' });
  // gotas que saltan del cubo al bombear
  if (Math.cos(ph) < -0.6) for (let k = 0; k < 3; k++) R.pset(97 + k * 2, 78 - k, AGUA[4]);
  // el plano va en espejo: el mar a la izquierda y la bomba a la derecha (otro encuadre que el corte del plano 3)
  R.usar(prev);
  for (let y = 0; y < 180; y++) { const o = y * 320; for (let x = 0; x < 320; x++) R.pset(x, y, ESP4.b[o + 319 - x]); }
};

const efectos = [[slips, 'burbujas'], [cracks, 'golpecito'], [P2 + 0.1, 'burbujas'], [holes + 0.4, 'burbujas'], [soaks, 'burbujas'],
  [deeper, 'toc'], [sealev, 'brillo'], [harder, 'burbujas'], [pushes + 0.2, 'whoosh'],
  [pump, 'maquina'], [pulled, 'ola'], [faster, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos });
''')
