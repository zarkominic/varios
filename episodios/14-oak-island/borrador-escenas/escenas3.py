E = {}

# piezas comunes de las dos escenas (van al principio de cada cuerpo)
AYUDA = r'''
const K = T.C.k, BL = T.C.blanco;
const H = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
// degradado tramado (bayer) entre varios colores, de arriba abajo
const grad = (x0, x1, y0, y1, cols) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), fr = f - i; for (let x = x0; x <= x1; x++) R.pset(x, y, fr > bay(x, y) ? cols[i + 1] : cols[i]); } };
const BUF = {};
const fijo = (k, pinta) => { let b = BUF[k]; if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); BUF[k] = b; } R.copiar(b); };
// una capa con huecos (lo que va delante del cielo): se pinta una vez y cada fotograma se copia solo lo pintado
const capa = (k, pinta) => { let b = BUF[k]; if (!b) { b = R.nuevo(); b.fill(0); const prev = R.usar(b); pinta(); R.usar(prev); const I = []; for (let i = 0; i < b.length; i++) if (b[i] !== 0) I.push(i); BUF[k] = b; BUF[k + '·'] = Int32Array.from(I); }
  const I = BUF[k + '·']; for (let j = 0; j < I.length; j++) { const i = I[j]; R.pset(i % 320, (i / 320) | 0, b[i]); } };
const ease = (u) => u * u * (3 - 2 * u);
const bump = (t, a, b) => Math.sin(tramo(t, a, b) * Math.PI);
// recorrido por fotogramas clave [t, x, suelo, dir]: dónde está, si anda y hacia dónde mira
const ruta = (t, kf) => { if (t <= kf[0][0]) return { x: kf[0][1], s: kf[0][2], mv: false, d: kf[0][3] ?? 1 };
  for (let i = 0; i + 1 < kf.length; i++) if (t < kf[i + 1][0]) { const [t0, x0, s0] = kf[i], [t1, x1, s1] = kf[i + 1], u = (t - t0) / (t1 - t0); return { x: Math.round(lerp(x0, x1, u)), s: Math.round(lerp(s0, s1, u)), mv: x1 !== x0, d: x1 < x0 ? -1 : x1 > x0 ? 1 : (kf[i + 1][3] ?? 1) }; }
  const u = kf[kf.length - 1]; return { x: u[1], s: u[2], mv: false, d: u[3] ?? 1 }; };
const elipse = (cx, cy, rx, ry, c) => { for (let y = -ry; y <= ry; y++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry || 1)))); for (let x = -w; x <= w; x++) R.pset(cx + x, cy + y, c); } };
const tintaE = (cx, cy, rx, ry, c, a) => { for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) { const d = (x * x) / (rx * rx) + (y * y) / (ry * ry); if (d <= 1) R.pset(cx + x, cy + y, mez(R.pget(cx + x, cy + y), c, a * (1 - d * 0.7))); } };
// bocadillo de pensamiento con sus bolitas hacia la cabeza (hx, hy); devuelve si ya se ve el contenido
const piensa = (cx, cy, rx, ry, hx, hy, u = 1) => {
  if (u <= 0) return false; const k = Math.min(1, u * 1.6), sx = Math.max(2, Math.round(rx * k)), sy = Math.max(2, Math.round(ry * k));
  for (const [f, r] of [[0.25, 1], [0.6, 2]]) { const bx = Math.round(lerp(hx, cx, f * 0.7)), by = Math.round(lerp(hy, cy + sy, f)); R.disco(bx, by, r + 1, K); R.disco(bx, by, r, BL); }
  const bol = [[0, 0, 1], [-0.62, 0.12, 0.6], [0.62, 0.12, 0.6], [-0.3, -0.42, 0.55], [0.32, -0.4, 0.55]];
  for (const [dx, dy, s] of bol) elipse(cx + Math.round(dx * sx), cy + Math.round(dy * sy), Math.round(sx * s * 0.72) + 1, Math.round(sy * s * 0.72) + 1, K);
  for (const [dx, dy, s] of bol) elipse(cx + Math.round(dx * sx), cy + Math.round(dy * sy), Math.round(sx * s * 0.72), Math.round(sy * s * 0.72), BL);
  for (let x = -sx + 3; x <= sx - 3; x++) R.pset(cx + x, cy + Math.round(sy * 0.62), hex('#d8dce4'));
  return u > 0.55;
};
// cubo de madera de duelas con dos aros de hierro, de lado; (x, y) = el fondo, en el suelo
const cuboL = (x, y, o = {}) => { const M1 = hex('#8a5e36'), M2 = hex('#6a4426'), M3 = hex('#b08250'), FE = hex('#4a4a56'), hh = 9;
  for (let j = 0; j <= hh; j++) { const w = Math.round(lerp(5, 4, j / hh)), yy = y - hh + j; R.rect(x - w - 1, yy, x + w + 1, yy, K); R.rect(x - w, yy, x + w, yy, M1); R.pset(x - w, yy, M3); R.pset(x + w, yy, M2); for (let i = -w + 2; i < w; i += 3) R.pset(x + i, yy, M2); }
  R.rect(x - 5, y + 1, x + 5, y + 1, K);
  for (const j of [2, 7]) { const w = Math.round(lerp(5, 4, j / hh)); R.rect(x - w, y - hh + j, x + w, y - hh + j, FE); R.pset(x - w + 1, y - hh + j, hex('#8a8a96')); }
  R.rect(x - 5, y - hh - 1, x + 5, y - hh - 1, K); R.rect(x - 4, y - hh, x + 4, y - hh, o.lleno ? hex('#3e6a7a') : hex('#3a2416')); if (o.lleno) { R.pset(x - 2, y - hh, hex('#a8d0dc')); R.pset(x + 1, y - hh, hex('#6a9aaa')); }
  if (o.asa !== false) { R.linea(x - 6, y - hh, x - 3, y - hh - 4, FE); R.linea(x + 6, y - hh, x + 3, y - hh - 4, FE); R.linea(x - 3, y - hh - 4, x + 3, y - hh - 4, FE); }
};
// el pico (mango y cabeza de hierro), girado ang radianes alrededor de la empuñadura (x, y)
const pico = (x, y, ang) => { const c = Math.cos(ang), s = Math.sin(ang), ex = x + c * 11, ey = y + s * 11;
  R.linea(Math.round(x), Math.round(y), Math.round(ex), Math.round(ey), hex('#8a6038')); R.linea(Math.round(x + 1), Math.round(y), Math.round(ex + 1), Math.round(ey), hex('#5a3a20'));
  R.linea(Math.round(ex - s * 5), Math.round(ey + c * 5), Math.round(ex + s * 5), Math.round(ey - c * 5), hex('#5a5a66')); R.pset(Math.round(ex - s * 5), Math.round(ey + c * 5), hex('#b8bcc8')); R.pset(Math.round(ex + s * 5), Math.round(ey - c * 5), hex('#b8bcc8')); };
// gaviota lejana: una uve que aletea
const uve = (x, y, t, k, c) => { const a = Math.sin(t * 8 + k) > 0 ? 1 : 0; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x - 2, y - 1 - a, c); R.pset(x + 1, y - a, c); R.pset(x + 2, y - 1 - a, c); };
// nube de tres tonos (sombra, cuerpo, luz)
const nube3 = (cx, cy, w, c0, c1, c2) => { const b = [[0, 0, 0.32], [-0.32, 0.06, 0.24], [0.3, 0.05, 0.26], [-0.1, -0.12, 0.26], [0.14, -0.08, 0.22]];
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), Math.round(r * w), c0);
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), Math.round(r * w), c1);
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), Math.round(r * w * 0.72), c2); };
'''

E['oi-inunda'] = ('El pozo se inunda', '''// OI-INUNDA (frases 12–14), 1803, sin cartela. Golpe de música en la marca «inunda». Cinco planos:
// 1. (fondo local) el campamento al atardecer: el cavador sale del brocal, tira el pico al montón y va a la hoguera; el
//    capataz señala el pozo y sueña con el cofre («almost in reach»); el otro bosteza, se mete en la tienda, se cierra la
//    lona, se enciende el farol y su sombra se despereza en la lona;
// 2. (fondo local, cenital) a la mañana siguiente, el pozo desde arriba: el agua sube por el entibado hasta el tercer
//    marco («full»), los reflejos de dos cabezas y «!»; la sonda de nudos baja y marca «30'»; baja el primer cubo («buckets»);
// 3. pozo en corte: la bomba de mano escupe agua, el cubo sube y el nivel baja… y vuelve en cuanto el obrero lo tira
//    (gag del cubo); cavan el segundo pozo, la galería por debajo (flecha) y el agua lo llena: el cavador sube a toda prisa;
// 4. (fondo local) el cobertizo con el barril de lluvia y el mar detrás: uno bebe del barril (dulce); el de después trae
//    el cubo del pozo, ¿lluvia? no; lo prueba: salado; asoma un cangrejo del cubo; señala el mar cuando rompe una ola: cubo = mar.''', AYUDA + r'''
const P2 = en('inunda', 0.43), P3 = en('cubos', 0.205), P4 = en('salada', -0.006);
const LLENO = en('inunda', 0.588), TREINTA = en('inunda', 0.80), CUBOS = en('cubos', 0.062);
const BOMBA = en('cubos', 0.252), SEGUNDO = en('cubos', 0.416), DEBAJO = en('cubos', 0.608), INUNDA2 = en('cubos', 0.874);
const LLUVIA = en('salada', 0.465), SALADO = en('salada', 0.67), MAR = en('salada', 0.912);

// ── 1 · el campamento al atardecer ───────────────────────────────────────────────────────────────────────────────────
const CA = {
  cielo: ['#2a2452', '#382a62', '#52306e', '#763672', '#a0446c', '#c85a60', '#e47656', '#f2985a', '#f8bc6c'].map(hex),
  mar: ['#f0a46c', '#c8707a', '#8a4c74', '#5a3a68'].map(hex), cerro: hex('#4a3254'), cerroL: hex('#6c4868'),
  sil: hex('#2e1e2c'), silR: hex('#c8684a'), tierra: hex('#5a3e36'), tierraS: hex('#46302c'), tierraL: hex('#785440'),
  hierba: hex('#4a5034'), hierbaS: hex('#363c28'), hierbaL: hex('#b0844a'), lona: hex('#d6b28a'), lonaS: hex('#a8846a'), lonaSS: hex('#7a5a4c'),
  tronco: hex('#5a3a2e'), troncoS: hex('#34201c'), troncoL: hex('#d07a50'),
};
const PUERTA = [[240, 124], [230, 160], [250, 160]];
const robleSil = (cx, base, top, w) => { // roble a contraluz: copa de muchas matas pequeñas, ramas en los huecos y el filo encendido por el sol (a la derecha)
  const ry = Math.round(w * 0.42), cy = top + ry, n = Math.round(w * 0.8), P = [];
  for (let k = 0; k < n; k++) { const a = H(k, cx, 7) * 6.283, f = Math.sqrt(H(k, cx, 8)); P.push([Math.round(cx + Math.cos(a) * f * w * 0.5), Math.round(cy + Math.sin(a) * f * ry * 0.85), 3 + Math.round(H(k, cx, 9) * 4)]); }
  R.rect(cx - 2, cy, cx + 2, base, CA.sil); R.rect(cx - 3, base - 3, cx + 3, base, CA.sil);
  for (const [a, b] of [[-0.9, 0.7], [0.8, 0.6], [-0.2, 0.9]]) R.linea(cx, cy + 6, Math.round(cx + a * w * 0.4), Math.round(cy - b * ry * 0.6), CA.sil);
  for (const [x, y, r] of P) R.disco(x + 1, y - 1, r, CA.silR);
  for (const [x, y, r] of P) { R.disco(x, y, r, CA.sil); R.pset(x - 1, y + r - 1, hex('#3e2834')); }
  for (let k = 0; k < 7; k++) { const x = Math.round(cx + (H(k, cx, 10) - 0.5) * w * 0.7), y = Math.round(cy + (H(k, cx, 11) - 0.5) * ry); R.pset(x, y, mez(CA.sil, hex('#a0446c'), 0.5)); R.pset(x + 1, y, mez(CA.sil, hex('#a0446c'), 0.4)); }
};
// nube alargada del atardecer: el filo de abajo encendido, el cuerpo violeta y el lomo oscuro
const nubeL = (x, y, len, th) => { for (let i = 0; i <= len; i++) { const hh = Math.max(1, Math.round(th * Math.sin(Math.PI * i / len) * (0.75 + 0.25 * Math.sin(i * 0.5)))), xx = Math.round(x + i);
  R.pset(xx, y + 1, hex('#f8b070')); R.pset(xx, y, hex('#f0906a')); for (let j = 1; j <= hh; j++) R.pset(xx, y - j, j === hh ? hex('#5e3668') : j > hh * 0.6 ? hex('#7a4074') : hex('#a04a72')); } };
const brocalF = () => { // la cara de delante del brocal de troncos (va delante del que sale)
  for (const [y, s] of [[128, 0], [132, 1], [136, 2]]) { R.rect(54, y, 98, y + 3, CA.tronco); R.rect(54, y, 98, y, CA.troncoL); R.rect(54, y + 3, 98, y + 3, CA.troncoS);
    for (let x = 57 + s * 3; x < 96; x += 7) R.pset(x, y + 1 + (x & 1), CA.troncoS); R.disco(53, y + 2, 2, K); R.disco(53, y + 2, 1, hex('#a8704a')); R.pset(53, y + 2, hex('#6a4430')); R.disco(99, y + 2, 2, K); R.disco(99, y + 2, 1, hex('#e09a64')); }
};
const pintaCampo = () => {
  grad(0, 319, 0, 100, CA.cielo);
  for (let k = 0; k < 9; k++) R.pset(178 + ((k * 37) % 80), 17 + ((k * 23) % 20), hex('#c8b8e8'));
  // la costa de enfrente (a la izquierda) y el mar con el sol que se pone (a la derecha)
  for (let x = 0; x < 160; x++) { const top = Math.round(92 + 4 * Math.sin(x * 0.045) + 2 * Math.sin(x * 0.13 + 1)); for (let y = top; y <= 106; y++) R.pset(x, y, y === top ? CA.cerroL : CA.cerro); }
  grad(150, 319, 100, 112, CA.mar);
  for (let x = 262; x < 320; x++) { const top = Math.round(98 - 3 * Math.sin((x - 262) / 58 * Math.PI)); for (let y = top; y <= 100; y++) R.pset(x, y, y === top ? CA.cerroL : CA.cerro); }
};
const pintaCampoD = () => {
  // el claro: tierra pisada, hierba en matas con la punta encendida, guijarros y rodadas
  for (let y = 106; y < 180; y++) for (let x = 0; x < 320; x++) { const v = H(x >> 1, y >> 1, 3), w = H(x >> 3, y >> 2, 4); R.pset(x, y, v < 0.14 ? CA.tierraS : v > 0.9 ? CA.tierraL : w > 0.62 ? CA.hierba : w < 0.18 ? CA.hierbaS : CA.tierra); }
  for (let x = 0; x < 320; x++) { const y = Math.round(170 + Math.sin(x * 0.03) * 3); R.pset(x, y, CA.tierraS); R.pset(x, y + 4, CA.tierraS); }
  for (let k = 0; k < 90; k++) { const x = Math.round(H(k, 1, 11) * 320), y = 112 + Math.round(H(k, 2, 11) * 66), hgt = 2 + Math.round(H(k, 3, 11) * 4);
    for (let i = -2; i <= 2; i++) { R.linea(x + i, y, x + i + Math.round(i * 0.6), y - hgt + Math.abs(i), CA.hierbaS); } R.pset(x, y - hgt, CA.hierbaL); R.pset(x + 1, y - hgt + 1, CA.hierbaL); }
  for (let k = 0; k < 40; k++) { const x = Math.round(H(k, 4, 12) * 320), y = 114 + Math.round(H(k, 5, 12) * 64); R.pset(x, y, hex('#8a7a78')); R.pset(x + 1, y, hex('#5a4a4a')); R.pset(x, y - 1, hex('#c09070')); }
  // los matorrales que tapan la orilla, a contraluz
  for (let x = 140; x < 320; x++) { const top = Math.round(106 + 3 * Math.sin(x * 0.31) + 2 * H(x, 0, 5)); for (let y = top; y < 116; y++) R.pset(x, y, y <= top + 1 ? CA.silR : CA.sil); }
  // robles a contraluz: el grande de la izquierda y dos detrás de la hoguera
  robleSil(18, 124, 24, 76); robleSil(122, 116, 62, 46); robleSil(150, 114, 76, 30);
  // montones de tierra sacada del pozo, con la pala clavada
  for (const [cx, cy, rx, ry] of [[132, 146, 22, 9], [26, 150, 20, 8]]) { for (let y = -ry; y <= 0; y++) { const w = Math.round(rx * Math.sqrt(1 - (y * y) / (ry * ry))); for (let x = -w; x <= w; x++) R.pset(cx + x, cy + y, H(cx + x, cy + y, 13) < 0.2 ? hex('#6a4430') : x > w * 0.3 ? hex('#a86a48') : hex('#8a5a40')); } R.rect(cx - rx, cy + 1, cx + rx, cy + 1, CA.tierraS); }
  R.linea(140, 120, 146, 140, hex('#6a4a30')); R.rect(144, 138, 149, 145, hex('#5a5a66')); R.rect(144, 138, 149, 138, hex('#c88a60'));
  // el castillete de 1803 a contraluz: tres troncos, el travesaño, la roldana y el torno
  const pata = (x0, y0, x1, y1, w, c, r) => { for (let i = 0; i < w; i++) R.linea(x0 + i, y0, x1 + i, y1, i === w - 1 ? r : c); };
  pata(78, 132, 75, 52, 2, hex('#22161e'), hex('#22161e'));
  R.rect(56, 122, 96, 127, hex('#140c0c')); R.rect(58, 123, 94, 124, hex('#2a1814'));
  pata(52, 140, 74, 50, 3, CA.sil, CA.silR); pata(98, 140, 76, 50, 3, CA.sil, CA.silR);
  R.linea(62, 102, 92, 102, CA.sil); R.linea(62, 103, 92, 103, CA.sil); R.linea(62, 101, 92, 101, CA.silR);
  R.disco(76, 52, 5, K); R.disco(76, 52, 4, hex('#3a2a2e')); R.anillo(76, 52, 4, CA.silR); for (let a = 0; a < 4; a++) R.linea(76, 52, Math.round(76 + Math.cos(a * 0.8) * 3), Math.round(52 + Math.sin(a * 0.8) * 3), hex('#5a4448'));
  R.rect(30, 124, 34, 140, CA.sil); R.rect(46, 124, 50, 140, CA.sil); R.rect(28, 121, 52, 125, CA.tronco); R.rect(28, 121, 52, 121, CA.troncoL); R.disco(40, 123, 4, K); R.disco(40, 123, 3, CA.tronco);
  R.linea(52, 123, 56, 119, hex('#6a6a72')); R.rect(55, 117, 58, 119, hex('#6a6a72'));
  brocalF();
  // las herramientas apoyadas en el caballete
  R.linea(160, 128, 158, 150, CA.tronco); R.linea(176, 128, 178, 150, CA.tronco); R.rect(156, 128, 180, 130, CA.tronco); R.rect(156, 128, 180, 128, CA.troncoL);
  for (const [x, ht] of [[162, 26], [168, 28], [174, 24]]) { R.linea(x, 150, x + 3, 150 - ht, hex('#8a6038')); R.pset(x + 3, 150 - ht, hex('#c89060')); }
  R.rect(160, 146, 165, 151, hex('#5a5a66')); R.rect(172, 147, 177, 152, hex('#5a5a66'));
  // la tienda de lona, vista de tres cuartos: frente, costado, costuras, vientos y estacas
  R.poligono([[240, 104], [292, 108], [306, 158], [274, 160]], CA.lonaS); R.poligono([[240, 104], [206, 160], [274, 160]], CA.lona);
  for (let k = 1; k < 4; k++) { R.linea(240, 104, Math.round(lerp(206, 274, k / 4)), 160, hex('#c09c78')); R.linea(Math.round(lerp(240, 292, k / 4)), Math.round(lerp(104, 108, k / 4)), Math.round(lerp(274, 306, k / 4)), Math.round(lerp(160, 158, k / 4)), CA.lonaSS); }
  R.linea(240, 104, 292, 108, K); R.linea(240, 104, 206, 160, K); R.linea(240, 104, 274, 160, CA.lonaSS); R.linea(206, 160, 274, 160, CA.lonaSS); R.linea(292, 108, 306, 158, K);
  for (let x = 208; x < 306; x += 2) R.pset(x, 160 + (x > 274 ? -1 : 0), hex('#3a2a24'));
  R.linea(240, 102, 240, 98, K); R.linea(292, 106, 292, 101, K);
  R.linea(240, 100, 196, 168, hex('#a89070')); R.linea(292, 103, 316, 170, hex('#a89070')); R.rect(195, 167, 197, 170, CA.tronco); R.rect(315, 169, 317, 172, CA.tronco);
  R.poligono(PUERTA, hex('#24161a')); R.poligono([[240, 124], [230, 160], [236, 160], [240, 132]], hex('#e6c49a'));
  // la hoguera: piedras, leña y el trébede con la tetera
  for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2, x = Math.round(168 + Math.cos(a) * 11), y = Math.round(162 + Math.sin(a) * 3); R.disco(x, y, 2, hex('#4a3a3a')); R.pset(x - 1, y - 1, hex('#9a7a6a')); }
  R.linea(158, 163, 178, 159, hex('#3a2418')); R.linea(160, 159, 177, 164, hex('#4a2c1c'));
  R.linea(156, 164, 168, 136, hex('#3a2a24')); R.linea(180, 164, 168, 136, hex('#3a2a24')); R.linea(168, 136, 169, 165, hex('#2a1e1a'));
};
// la tetera colgada, el humo que sube, la llama
const hoguera = (t) => {
  tintaE(168, 163, 30, 8, hex('#f0a050'), 0.35 + 0.08 * Math.sin(t * 13));
  for (let k = 0; k < 6; k++) { const x = 162 + k * 2 + (k > 2 ? 1 : 0), ht = 5 + Math.round(4 * (0.5 + 0.5 * Math.sin(t * 17 + k * 2.1))) - Math.abs(k - 2.5);
    R.linea(x, 161, x + Math.round(Math.sin(t * 9 + k)), Math.round(161 - ht), hex('#d85a30')); if (ht > 3) R.linea(x, 161, x, Math.round(161 - ht * 0.6), hex('#f0a040')); if (ht > 5) R.pset(x, 160 - Math.round(ht * 0.3), hex('#f8e888')); }
  for (let k = 0; k < 4; k++) { const u = (t * 0.9 + k / 4) % 1; R.pset(Math.round(168 + Math.sin(k * 5 + t * 3) * 4), Math.round(156 - u * 20), u < 0.5 ? hex('#f8d070') : hex('#d86030')); }
  R.rect(164, 145, 172, 151, K); R.rect(165, 146, 171, 150, hex('#3a3a42')); R.rect(165, 146, 171, 146, hex('#7a7a86')); R.rect(172, 147, 175, 148, K); R.linea(168, 140, 168, 145, hex('#2a2a2e'));
  for (let k = 0; k < 3; k++) { const u = (t * 0.7 + k / 3) % 1; R.pset(Math.round(176 + u * 5 + Math.sin(u * 7 + k) * 1.5), Math.round(145 - u * 9), mez(R.pget(176, 140), BL, 0.6 * (1 - u))); }
  for (let k = 0; k < 7; k++) { const u = (t * 0.22 + k / 7) % 1, x = Math.round(168 + u * 30 + Math.sin(u * 6 + k) * 3), y = Math.round(136 - u * 70), r = 1 + Math.round(u * 3);
    if (y > 16) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && bay(x + i, y + j) < 0.6 - u * 0.4) R.pset(x + i, y + j, mez(R.pget(x + i, y + j), hex('#9a7a94'), 0.45)); }
};
const p1 = (t) => {
  fijo('campo', pintaCampo);
  // el sol que se hunde en el mar y su camino de luz (todo lo del cielo va detrás del claro, que se copia encima)
  R.recorte([0, 15, 319, 100]); const sy = Math.round(97 + t * 0.9);
  for (const [r, a] of [[16, 0.15], [12, 0.25]]) tintaE(186, sy, r, r, hex('#f8d080'), a);
  R.disco(186, sy, 9, hex('#f8c860')); R.disco(185, sy - 1, 6, hex('#fce49c')); R.recorte(null);
  for (let y = 101; y < 112; y++) for (let k = 0; k < 3; k++) { const x = Math.round(186 + (H(y, k, 21) - 0.5) * (y - 98) * 2.2 + Math.sin(t * 3 + y + k) * 2); if (Math.sin(t * 5 + y * 1.7 + k * 2) > -0.2) R.rect(x, y, x + 2, y, hex('#f8d888')); }
  // nubes de tres tonos a tres velocidades (lejos de Atom y de la barra del año)
  R.recorte([0, 15, 319, 100]);
  for (const [x0, y, len, th, v] of [[40, 86, 50, 2, 1.0], [190, 82, 38, 2, 1.0], [120, 66, 70, 4, 1.8], [236, 72, 44, 3, 1.8], [40, 44, 90, 6, 2.8], [150, 30, 40, 4, 2.8], [-20, 24, 56, 4, 2.8]]) nubeL(x0 + v * t - 20, y, len, th);
  R.recorte(null);
  for (let k = 0; k < 3; k++) uve(Math.round(110 + k * 9 + t * 22), 66 + (k & 1) * 4 - k, t, k, hex('#2a1a2a'));
  capa('campoD', pintaCampoD);
  // la soga con el cubo que cuelga de la roldana y se mece; el farol del travesaño
  const sw = Math.round(Math.sin(t * 1.4) * 2); R.linea(76, 57, 76 + sw, 92, hex('#c8a878')); cuboL(76 + sw, 101, { asa: false });
  { const fl = 0.5 + 0.5 * Math.sin(t * 11) * Math.sin(t * 7.3); tintaE(91, 109, 9, 9, hex('#f8c060'), 0.3 + fl * 0.15); R.linea(91, 103, 91, 105, K); R.rect(89, 106, 93, 112, K); R.rect(90, 107, 92, 111, fl > 0.4 ? hex('#fce890') : hex('#f8c060')); R.rect(89, 105, 93, 105, hex('#5a5a62')); }
  hoguera(t);
  // el capataz, a la derecha del pozo: señala el fondo y sueña con el cofre
  const señala = t > en('inunda', 0.20) && t < 3.8;
  R.actor(EL.capataz, 108, 150, t, { dir: -1, dedo: señala, sonrisa: t > 2.9, habla: t > 0.6 && t < 1.4 && Math.sin(t * 9) > 0 });
  const pu = tramo(t, en('inunda', 0.21), en('inunda', 0.30));
  if (piensa(124, 80, 17, 11, 118, 122, pu)) { const cx = 124, cy = 81, ab = Math.round(bump(t, 2.9, 3.9) * 3);
    R.rect(cx - 7, cy - 1, cx + 7, cy + 5, K); R.rect(cx - 6, cy, cx + 6, cy + 4, hex('#8a5a2a')); R.rect(cx - 6, cy + 2, cx + 6, cy + 2, hex('#c8a040'));
    R.rect(cx - 7, cy - 5 - ab, cx + 7, cy - 1 - ab, K); R.rect(cx - 6, cy - 4 - ab, cx + 6, cy - 2 - ab, hex('#a06a34')); R.rect(cx - 1, cy - 1, cx + 1, cy + 1, hex('#f0c840'));
    if (ab > 0) for (let i = -5; i <= 5; i += 2) R.pset(cx + i, cy - 1, hex('#f8e070')); }
  // el cavador sale del brocal, tira el pico al montón y se va a la hoguera
  const sube = ease(tramo(t, 0.1, 0.85)), q = ruta(t, [[0.95, 68, 127], [1.2, 78, 150], [en('inunda', 0.13), 80, 152], [3.25, 148, 160, 1]]);
  let dx = t < 0.95 ? 68 : q.x, ds = t < 0.95 ? Math.round(lerp(162, 127, sube)) : q.s;
  if (t >= 0.95 && t < 1.2) ds -= Math.round(Math.sin(tramo(t, 0.95, 1.2) * Math.PI) * 6);
  if (t < 0.95) R.recorte([0, 0, 319, 127]);
  R.actor(EL.cavador, dx, ds, t, { dir: t < 1.2 ? 1 : q.d, anda: t > 1.25 && q.mv, dedo: t > 3.3, sonrisa: t > 3.3, sorpresa: t < 0.9 && t > 0.5 });
  const TIRA = en('inunda', 0.095);
  if (t < TIRA) pico(dx + 13, ds - 12, -1.0 + Math.sin(t * 3) * 0.2);
  else { const u = tramo(t, TIRA, TIRA + 0.4); pico(Math.round(lerp(dx + 13, 150, u)), Math.round(lerp(ds - 14, 140, u) - Math.sin(u * Math.PI) * 18), -1.0 + u * 5); }
  R.recorte(null);
  if (t < 1.0) brocalF();
  // el otro bosteza junto al fuego y se mete en la tienda; la lona se cierra, se enciende el farol y su sombra se despereza
  const q2 = ruta(t, [[2.3, 186, 164, -1], [3.0, 232, 162]]), dentro = t > 3.05;
  if (!dentro) R.actor(EL.cavador2, q2.x, q2.s, t, { dir: t < 2.3 ? -1 : 1, anda: q2.mv, habla: t > 0.4 && t < 1.9 && Math.sin(t * 2.5) > -0.2, triste: t > 1.9 && t < 2.3 });
  if (t < 2.0 && t > 0.6) { const u = tramo(t, 0.6, 1.9); R.icono('luna', 176, Math.round(126 - u * 6), hex('#e8e0f8'), hex('#2a2040')); }
  const cierra = tramo(t, 3.0, 3.35), luz = tramo(t, 3.35, 3.6);
  if (luz > 0) { const fl = 0.85 + 0.15 * Math.sin(t * 12); for (let y = 105; y < 160; y++) for (let x = 207; x < 306; x++) { const c = R.pget(x, y); if (c === CA.lona || c === CA.lonaS || c === hex('#c09c78') || c === CA.lonaSS) R.pset(x, y, mez(c, hex('#f8c870'), luz * fl * (c === CA.lona ? 0.45 : 0.32))); } }
  if (cierra > 0) { const xx = Math.round(lerp(236, 249, cierra)); R.poligono([[240, 124], [230, 160], [xx, 160], [240, 128]], luz > 0 ? mez(CA.lona, hex('#f8c870'), 0.45) : CA.lona); R.linea(240, 124, xx, 160, CA.lonaSS); }
  if (luz > 0) { const s = Math.sin(t * 3) * 2, ox = 280, oy = 140; R.disco(ox + Math.round(s), oy - 12, 4, mez(CA.lonaS, K, 0.55)); R.rect(ox - 4, oy - 8, ox + 4, oy + 10, mez(CA.lonaS, K, 0.55));
    R.linea(ox - 4, oy - 6, ox - 9, oy - 16 - Math.round(s), mez(CA.lonaS, K, 0.55)); R.linea(ox + 4, oy - 6, ox + 9, oy - 16 + Math.round(s), mez(CA.lonaS, K, 0.55)); }
  // luciérnagas
  for (let k = 0; k < 9; k++) { const x = Math.round(20 + ((k * 61) % 270) + Math.sin(t * 0.8 + k) * 6), y = Math.round(128 + ((k * 17) % 44) + Math.sin(t * 1.3 + k * 2) * 3); if (Math.sin(t * 3 + k * 1.7) > 0.5) { R.pset(x, y, hex('#e8f088')); R.pset(x + 1, y, hex('#a8b058')); } }
};

// ── 2 · a la mañana siguiente, el pozo desde arriba ─────────────────────────────────────────────────────────────────
const CX = 160, CY = 100, A0 = 58, B0 = 50, Q = 0.8, LQ = Math.log(Q);
const prof = (x, y) => { const u = Math.max(Math.abs(x - CX) / A0, Math.abs(y - CY) / B0); return u <= 0.004 ? 30 : Math.log(u) / LQ; };
const enProf = (x0, y0, d) => [CX + (x0 - CX) * Q ** d, CY + (y0 - CY) * Q ** d];
const tronco = (x0, y0, x1, y1, vert) => { // un tronco del brocal visto desde arriba
  R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = vert ? (x - x0) / (x1 - x0) : (y - y0) / (y1 - y0), v = H(vert ? x : x >> 2, vert ? y >> 2 : y, 31);
    R.pset(x, y, f < 0.25 ? hex('#a87a4c') : f > 0.75 ? hex('#5a3a22') : v < 0.18 ? hex('#6a4a2c') : hex('#86603a')); }
  if (vert) for (let y = y0 + 3; y < y1; y += 9) R.linea(x0 + 2, y, x1 - 2, y + 1, hex('#5a3a22')); else for (let x = x0 + 3; x < x1; x += 9) R.linea(x, y0 + 2, x + 1, y1 - 2, hex('#5a3a22'));
};
const pintaArriba = () => {
  // la hierba con rocío, la tierra pisada alrededor del brocal y las sombras de la mañana (el sol por la derecha)
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = H(x >> 1, y >> 1, 32), w = H(x >> 3, y >> 3, 33), d = Math.max(Math.abs(x - CX) / 96, Math.abs(y - CY) / 84);
    const pis = d < 1 && w > 0.25 - (1 - d) * 0.6; R.pset(x, y, pis ? (v < 0.2 ? hex('#6a4c34') : v > 0.85 ? hex('#a07a54') : hex('#86644a')) : (v < 0.25 ? hex('#3e6430') : v > 0.8 ? hex('#7a9e4a') : w > 0.5 ? hex('#5a8238') : hex('#4c7434'))); }
  for (let k = 0; k < 160; k++) { const x = Math.round(H(k, 1, 34) * 320), y = Math.round(H(k, 2, 34) * 180), d = Math.max(Math.abs(x - CX) / 96, Math.abs(y - CY) / 84); if (d < 1.02) continue;
    R.linea(x, y, x + 1, y - 3, hex('#2e5226')); R.linea(x + 2, y, x + 3, y - 2, hex('#3a6a2c')); R.pset(x + 1, y - 3, hex('#9ac060')); }
  for (let k = 0; k < 50; k++) { const x = Math.round(70 + H(k, 3, 35) * 180), y = Math.round(18 + H(k, 4, 35) * 160); R.pset(x, y, hex('#b8a088')); R.pset(x + 1, y, hex('#5a4434')); }
  // huellas de botas en la tierra
  for (let k = 0; k < 6; k++) { const x = 92 + k * 9, y = 168 - (k & 1) * 4; R.rect(x, y, x + 3, y + 5, hex('#6a4c34')); R.rect(x + 1, y + 1, x + 2, y + 4, hex('#5a3e2a')); }
  // las paredes del pozo: arcilla con la luz por la izquierda, los marcos del entibado cada diez pies y la escalera
  for (let y = CY - B0; y <= CY + B0; y++) for (let x = CX - A0; x <= CX + A0; x++) {
    const d = prof(x, y), ax = Math.abs(x - CX) / A0, ay = Math.abs(y - CY) / B0, lado = ax > ay ? (x < CX ? 0 : 1) : (y < CY ? 2 : 3);
    const base = [hex('#a8845e'), hex('#5a4232'), hex('#8e6c4c'), hex('#74563e')][lado], fr = d - Math.floor(d), v = H(x, y, 36);
    let c = fr < 0.16 ? mez(hex('#7a5232'), K, fr > 0.12 ? 0.5 : 0) : v < 0.12 ? mez(base, K, 0.25) : v > 0.93 ? mez(base, BL, 0.2) : base;
    if (fr < 0.16 && lado === 0 && fr < 0.05) c = hex('#b08a5a');
    R.pset(x, y, mez(c, hex('#0a0806'), Math.min(1, (d / 10) ** 0.75))); }
  for (const s of [-1, 1]) for (let d = 0; d < 9; d += 0.05) { const [x, y] = enProf(CX - A0 + 3, CY + s * 7, d); R.pset(Math.round(x), Math.round(y), mez(hex('#c8a070'), hex('#0a0806'), Math.min(1, (d / 10) ** 0.75))); }
  for (let d = 0.3; d < 9; d += 0.42) { const [x, y0] = enProf(CX - A0 + 3, CY - 7, d), [, y1] = enProf(CX - A0 + 3, CY + 7, d); R.linea(Math.round(x), Math.round(y0), Math.round(x), Math.round(y1), mez(hex('#a87a4a'), hex('#0a0806'), Math.min(1, (d / 10) ** 0.75))); }
  // gotas que brillan en las paredes de arriba
  for (let k = 0; k < 30; k++) { const x = Math.round(CX - A0 + H(k, 5, 37) * A0 * 2), y = Math.round(CY - B0 + H(k, 6, 37) * B0 * 2); if (prof(x, y) < 3.5) R.pset(x, y, hex('#d8e8e8')); }
  // el brocal de troncos, cruzados en las esquinas con sus testas y anillos; su sombra a la izquierda
  for (let y = 40; y <= 162; y++) for (let x = 84; x <= 91; x++) R.pset(x, y, mez(R.pget(x, y), K, 0.35));
  tronco(92, 40, 228, 48, false); tronco(92, 152, 228, 160, false); tronco(92, 40, 100, 160, true); tronco(220, 40, 228, 160, true);
  for (const [x, y] of [[90, 44], [230, 44], [90, 156], [230, 156], [96, 38], [224, 38], [96, 162], [224, 162]]) { R.disco(x, y, 4, K); R.disco(x, y, 3, hex('#c89a64')); R.anillo(x, y, 2, hex('#a07444')); R.pset(x, y, hex('#7a5232')); }
  // lo que hay alrededor: el pico, la pala, el rollo de soga, el farol de la noche y una piedra
  R.linea(242, 64, 266, 88, hex('#8a6038')); R.linea(243, 64, 267, 88, hex('#5a3a20')); R.linea(258, 92, 272, 78, hex('#5a5a66')); R.linea(259, 93, 273, 79, hex('#3a3a46')); R.pset(272, 78, hex('#c8ccd8'));
  R.linea(40, 60, 70, 74, hex('#8a6038')); R.linea(40, 61, 70, 75, hex('#5a3a20')); R.rect(70, 70, 78, 80, K); R.rect(71, 71, 77, 79, hex('#6a6a76')); R.rect(71, 71, 77, 72, hex('#a8acb8'));
  for (let r = 9; r > 1; r -= 2) R.anillo(258, 140, r, r & 2 ? hex('#c8a870') : hex('#8a7048')); R.disco(258, 140, 1, hex('#5a4428'));
  R.disco(52, 120, 8, mez(hex('#4c7434'), K, 0.3)); R.disco(50, 118, 8, hex('#7a7a80')); R.disco(48, 116, 5, hex('#9a9aa0')); R.pset(46, 114, hex('#d0d0d8'));
  // la carretilla vista desde arriba, la pila de tablones, el cesto del almuerzo con su paño y flores del prado
  R.rect(252, 92, 280, 112, K); R.rect(253, 93, 279, 111, hex('#8a6038')); R.rect(255, 95, 277, 109, hex('#6a4a30')); for (let k = 0; k < 9; k++) R.pset(257 + k * 2, 97 + (k * 5) % 10, hex('#9a7a5a'));
  R.rect(280, 98, 284, 106, K); R.rect(281, 99, 283, 105, hex('#3a3a46')); R.linea(252, 95, 238, 92, hex('#5a3a20')); R.linea(252, 109, 238, 112, hex('#5a3a20'));
  for (let k = 0; k < 5; k++) { const y = 140 + k * 5; R.rect(270, y, 316, y + 3, K); R.rect(271, y + 1, 315, y + 2, k & 1 ? hex('#c89a64') : hex('#b08250')); R.pset(272 + k * 7, y + 1, hex('#8a6038')); }
  R.disco(30, 34, 9, K); R.disco(30, 34, 8, hex('#b08a50')); for (let r = 2; r < 8; r += 2) R.anillo(30, 34, r, hex('#8a6a38')); R.rect(24, 30, 36, 37, hex('#e8e0d0')); for (let x = 24; x <= 36; x += 3) R.rect(x, 30, x + 1, 37, hex('#c84a3a')); R.disco(33, 39, 2, hex('#c83a2a')); R.pset(32, 38, hex('#f8a090'));
  for (let k = 0; k < 70; k++) { const x = Math.round(H(k, 9, 39) * 320), y = Math.round(16 + H(k, 10, 39) * 162), d = Math.max(Math.abs(x - CX) / 100, Math.abs(y - CY) / 88); if (d < 1.02 || (x > 276 && y < 46)) continue;
    const c = [hex('#f8f0a0'), hex('#f2f2f2'), hex('#c8a0e8'), hex('#f8b0c0')][k % 4]; R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x, y + 1, c); R.pset(x + 1, y + 1, hex('#e8c040')); }
};
const p2 = (t) => {
  fijo('arriba', pintaArriba);
  // el agua sube de golpe por el entibado y se queda en el tercer marco (treinta pies)
  const sube = ease(tramo(t, P2 + 0.45, LLENO + 0.05)), w = lerp(10.5, 3.05, sube), aw = Math.round(A0 * Q ** w), bw = Math.round(B0 * Q ** w);
  if (sube > 0) {
    const x0 = CX - aw, x1 = CX + aw, y0 = CY - bw, y1 = CY + bw;
    const nx = CX - 30 + ((t * 5) % 60);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = (y - y0) / Math.max(1, y1 - y0), dn = ((x - nx) / 16) ** 2 + ((y - y0 - 9) / 6) ** 2;
      let c = mez(hex('#6a9ab4'), hex('#16303e'), Math.min(1, v * 0.85 + 0.1)); if (dn < 1 && bay(x, y) < 0.75 - dn * 0.5) c = mez(c, hex('#e8f0f4'), 0.45);
      if (y % 3 === 0 && Math.sin(x * 0.31 + Math.floor(y / 3) * 1.7 + t * 2.2) > 0.9) c = mez(c, hex('#d8f0f8'), 0.7); else if (y % 3 === 1 && Math.sin(x * 0.27 + y + t * 1.6) > 0.94) c = mez(c, K, 0.3);
      R.pset(x, y, c); }
    R.rect(x0, y0, x1, y0, hex('#d8ecf0')); R.rect(x0, y1, x1, y1, hex('#14282e'));
    // los reflejos de dos cabezas con sombrero que se asoman
    if (t > LLENO - 0.1) for (const [hx, hy, k] of [[CX - 14, y1 - 12, 0], [CX + 12, y1 - 14, 1]]) { const by = hy + Math.round(Math.sin(t * 2 + k) * 1); elipse(hx, by, 9, 2, hex('#1a2a34')); R.disco(hx, by + 4, 5, hex('#1a2a34')); R.pset(hx - 2, by + 4, hex('#3a5a6a')); }
    // la ola del golpe: aros que se abren desde el centro
    const gr = tramo(t, LLENO - 0.1, LLENO + 1.2); if (gr > 0 && gr < 1) for (const r0 of [0, 8]) { const r = Math.round(4 + gr * 40 - r0); if (r > 2) for (let a = 0; a < 6.28; a += 0.04) { const px = Math.round(CX + Math.cos(a) * r * 1.15), py = Math.round(CY + Math.sin(a) * r * 0.9); if (px > x0 && px < x1 && py > y0 && py < y1) R.pset(px, py, hex('#e8f8fc')); } }
    // la neblina de la mañana sobre el agua
    for (let k = 0; k < 5; k++) { const yy = y0 + 4 + k * Math.round((y1 - y0) / 6), xx = x0 + Math.round(((t * 6 + k * 23) % (x1 - x0 + 20))) - 10; for (let i = 0; i < 16; i++) if (bay(xx + i, yy) < 0.5) R.pset(xx + i, yy, mez(R.pget(xx + i, yy), BL, 0.4)); }
  }
  if (t > LLENO && t < LLENO + 1.3) { const u = tramo(t, LLENO, LLENO + 0.25); R.icono('!', 132, Math.round(166 - u * 6), hex('#e83a3a'), K, 2); }
  // la sonda de nudos que baja desde la mano de abajo hasta el agua; «30'»
  const baja = tramo(t, TREINTA - 1.4, TREINTA - 0.15), dS = Math.min(w, baja * 3.2);
  if (baja > 0) { let [px, py] = [157, 151]; R.linea(157, 158, 157, 151, hex('#d8c89a'));
    for (let d = 0.05; d <= dS; d += 0.05) { const [x, y] = enProf(157, 151, d); R.linea(Math.round(px), Math.round(py), Math.round(x), Math.round(y), hex('#d8c89a')); px = x; py = y; }
    for (let k = 1; k <= Math.floor(dS + 0.01); k++) { const [x, y] = enProf(157, 151, k); R.disco(Math.round(x), Math.round(y), 1, hex('#8a6a3a')); }
    const [ex, ey] = enProf(157, 151, dS); R.rect(Math.round(ex) - 1, Math.round(ey) - 1, Math.round(ex) + 1, Math.round(ey) + 1, hex('#5a5a66'));
    if (baja >= 1 && t < TREINTA + 0.4) { const r = Math.round((t - TREINTA + 0.15) * 30); if (r > 0) R.anillo(Math.round(ex), Math.round(ey), Math.min(9, r), hex('#e8f8fc')); } }
  T.brazo(R, 140, 196, 147, 162, '#4a5a7a', 1);
  const n = tramo(t, TREINTA, TREINTA + 0.25); if (n > 0) { R.linea(160, 127, 172, 127, BL); R.numero("30'", 174, Math.round(lerp(150, 136, ease(n))), { tam: 16 }); }
  // el primer cubo baja desde la otra mano, se hunde, se llena y sube chorreando
  const bajaC = ease(tramo(t, CUBOS - 0.5, CUBOS)), subeC = ease(tramo(t, CUBOS + 0.3, P3)), dC = t < CUBOS - 0.5 ? -1 : 0.25 + (w - 0.25) * bajaC * (1 - subeC * 0.85);
  if (dC >= 0) { const [rx, ry] = enProf(205, 151, 0), [bx, by] = enProf(205, 151, dC), r = Math.max(2, Math.round(8 * Q ** dC));
    R.linea(207, 160, Math.round(rx), Math.round(ry), hex('#d8c89a')); R.linea(Math.round(rx), Math.round(ry), Math.round(bx), Math.round(by), hex('#d8c89a'));
    const lleno = t > CUBOS; R.disco(Math.round(bx), Math.round(by), r + 1, K); R.disco(Math.round(bx), Math.round(by), r, hex('#8a5e36')); R.disco(Math.round(bx), Math.round(by), Math.max(1, r - 2), lleno ? hex('#3e6a7a') : hex('#2a1a10'));
    if (lleno) R.pset(Math.round(bx) - 1, Math.round(by) - 1, hex('#a8d8e4'));
    if (t > CUBOS && t < CUBOS + 0.7) { const r2 = Math.round(2 + (t - CUBOS) * 14); R.anillo(Math.round(bx), Math.round(by), r2, hex('#e8f8fc')); }
    if (subeC > 0) for (let k = 0; k < 4; k++) { const u = (t * 2 + k / 4) % 1, [gx, gy] = enProf(bx, by + 2, u * 2); R.pset(Math.round(gx), Math.round(gy), hex('#a8d8e4')); } }
  T.brazo(R, 214, 196, 208, 162, '#7a3a2a', -1);
  // vida: el rocío que brilla, un escarabajo que cruza, dos hojas que vuelan con su sombra y el farol que se apaga
  for (let k = 0; k < 22; k++) { const x = Math.round(H(k, 7, 38) * 320), y = Math.round(16 + H(k, 8, 38) * 160); if (Math.max(Math.abs(x - CX) / 70, Math.abs(y - CY) / 62) > 1 && !(x > 276 && y < 46) && Math.sin(t * 4 + k * 2.3) > 0.7) { R.pset(x, y, BL); R.pset(x + 1, y, hex('#c8f0ff')); R.pset(x, y - 1, hex('#c8f0ff')); } }
  { const bx = Math.round(14 + (t - P2) * 7), by = 132 + Math.round(Math.sin(t * 2) * 2); R.disco(bx, by, 3, K); R.disco(bx, by, 2, hex('#2a3a5a')); R.pset(bx - 1, by - 1, hex('#6a8ac8')); for (const s of [-1, 1]) for (const i of [-2, 0, 2]) R.pset(bx + i, by + s * 4 + (Math.floor(t * 10 + i) & 1) * s, K); }
  for (let k = 0; k < 2; k++) { const u = ((t - P2) * 0.11 + k * 0.45) % 1, x = Math.round(-10 + u * 340), y = Math.round(22 + k * 120 + Math.sin(u * 9 + k) * 8), a = Math.sin(t * 3 + k) > 0;
    R.rect(x + 3, y + 4, x + 6, y + 5, hex('#2e4a22')); R.rect(x, y, x + (a ? 4 : 2), y + (a ? 1 : 3), hex('#c8a030')); R.pset(x + 1, y, hex('#e8c860')); }
  { const fl = Math.sin(t * 9) > 0 && t < P2 + 4 ? 1 : 0; R.disco(56, 152, 6, K); R.disco(56, 152, 5, hex('#5a5a62')); R.disco(56, 152, 3, fl ? hex('#f8d870') : hex('#c89a40')); R.pset(55, 151, hex('#fcf0b8')); }
};

// ── 3 · en corte: cubos, la bomba y el segundo pozo ─────────────────────────────────────────────────────────────────
const p3 = (t) => {
  // el gag del cubo: al subir el cubo lleno el nivel baja… y en cuanto el obrero tira el agua y se vuelve, ya está otra vez
  const vuelve = P3 + 2.05, nivel = 1 - 0.16 * tramo(t, P3 + 0.05, P3 + 0.75) * (1 - tramo(t, vuelve, vuelve + 0.12));
  const cuboSube = tramo(t, P3, P3 + 0.95), lleva = t > P3 + 0.95;
  const s2 = t < SEGUNDO + 0.3 ? 0 : t < INUNDA2 - 0.3 ? 0.6 * ease(tramo(t, SEGUNDO + 0.3, DEBAJO)) : 0.6 + 0.4 * ease(tramo(t, INUNDA2 - 0.3, INUNDA2 + 0.5));
  const g = T.pozo(R, t, { encuadre: 'corte', epoca: '1803', fondo: 95, nivel, segundo: s2, cubo: lleva ? false : lerp(0.3, 0.02, ease(cuboSube)) });
  // la bomba de mano junto a la boca: caja de tablas, palanca, tubo que baja al agua y el chorro que sale
  const ph = Math.sin((t - BOMBA) * 7), bombea = t > BOMBA - 0.25, ly = bombea ? Math.round(34 + ph * 5) : 34;
  R.linea(98, 52, 104, 58, K); R.rect(103, 58, 105, 104, K); R.rect(104, 58, 104, 104, hex('#7a7a86'));
  R.rect(89, 33, 98, 52, K); R.rect(90, 34, 97, 51, hex('#8a6038')); R.rect(90, 34, 91, 51, hex('#b08250')); for (const y of [38, 46]) R.rect(90, y, 97, y, hex('#4a4a56'));
  R.rect(85, 37, 89, 39, K); R.rect(86, 38, 89, 38, hex('#5a5a66'));
  R.linea(94, 32, 76, ly, K); R.linea(94, 31, 76, ly - 1, hex('#a87a4a')); R.disco(94, 32, 1, hex('#4a4a56'));
  if (bombea) { const fl = ph > -0.3; for (let y = 39; y < 52; y++) { const x = Math.round(85 - (y - 39) * 0.35); R.pset(x, y, fl ? hex('#7ab4cc') : hex('#4a8aa4')); if (fl) R.pset(x - 1, y, hex('#a8d8e8')); }
    for (let k = 0; k < 4; k++) { const u = (t * 3 + k / 4) % 1; R.pset(Math.round(80 - u * 6 - k), Math.round(51 - Math.sin(u * Math.PI) * 4), hex('#c8ecf8')); }
    const ch = Math.min(18, Math.round((t - BOMBA) * 9)); R.rect(80 - ch, 51, 84, 52, hex('#4a8aa4')); R.rect(80 - ch, 51, 84, 51, hex('#8ac4d8')); }
  // el que bombea: sube y baja con la palanca
  R.actor(EL.amigo2, 60, 52, t, { dir: 1, dedo: bombea && ph > 0, salto: bombea && ph > 0.4 ? 1 : 0, habla: t > INUNDA2 && t < INUNDA2 + 0.8, sorpresa: t > INUNDA2 && t < INUNDA2 + 1.6 });
  // el del cubo: da al torno, coge el cubo, lo tira por las rocas al mar, se vuelve… y el agua ya está donde estaba
  const qc = ruta(t, [[P3 + 1.0, 140, 52, -1], [P3 + 1.45, 188, 52], [vuelve - 0.15, 188, 52, 1]]);
  const tira = tramo(t, P3 + 1.5, P3 + 1.9), seVuelve = t > vuelve;
  R.actor(EL.cavador, qc.x, qc.s, t, { dir: seVuelve ? -1 : qc.d, anda: qc.mv, dedo: t < P3 + 0.95 && Math.sin(t * 12) > 0, sorpresa: seVuelve && t < vuelve + 1.4 || (t > INUNDA2 && t < INUNDA2 + 1.2), sonrisa: t > P3 + 1.9 && !seVuelve });
  if (lleva && t < P3 + 2.05) { const bx = qc.x + 16 + Math.round(tira * 3), by = 46 - Math.round(tira * 4); cuboL(bx, by, { lleno: tira < 0.5 }); }
  if (tira > 0.2 && tira < 1 || (t > P3 + 1.9 && t < P3 + 2.4)) { const u = tramo(t, P3 + 1.55, P3 + 2.35); for (let k = 0; k < 14; k++) { const f = u - k * 0.03; if (f > 0 && f < 1) R.pset(Math.round(206 + f * 24 + (k % 3)), Math.round(36 + f * f * 40 - Math.sin(f * Math.PI) * 6), k % 2 ? hex('#7ab4cc') : hex('#c8ecf8')); }
    if (u > 0.85) for (let k = 0; k < 6; k++) R.pset(230 + k * 2, 74 - ((k * 3 + Math.floor(t * 20)) % 5), hex('#e8f8fc')); }
  if (seVuelve && t < vuelve + 1.2) { R.icono('!', 191, 16, hex('#e83a3a'), K, 2); for (let k = 0; k < 3; k++) { const r = Math.round((t - vuelve) * 18) - k * 5; if (r > 0 && r < 12) for (let i = -r; i <= r; i++) R.pset(112 + i, Math.round(g.aguaY ?? 88) - 1 - (Math.abs(i) === r ? 1 : 0), hex('#e8f8fc')); } }
  // el capataz: señala dónde cavar el segundo pozo y, cuando se llena, da una patada al suelo
  R.actor(EL.capataz, 36, 52, t, { dir: 1, dedo: t > SEGUNDO && t < DEBAJO + 0.6, habla: t > SEGUNDO && t < SEGUNDO + 1.2 && Math.sin(t * 9) > 0, enfado: t > INUNDA2 + 0.1, salto: t > INUNDA2 + 0.2 && t < INUNDA2 + 1.4 && Math.sin(t * 14) > 0 ? 2 : 0 });
  // el que cava el segundo pozo: llega con el pico, baja cavando, abre la galería por debajo… y sale corriendo del agua
  const y2 = Math.round(52 + 120 * Math.min(1, s2 / 0.6)), agua2 = s2 > 0.6 ? Math.round(lerp(172, 88, (s2 - 0.6) / 0.4)) : 999;
  if (t < SEGUNDO + 0.3) { const qq = ruta(t, [[SEGUNDO - 0.35, 170, 52, -1], [SEGUNDO + 0.25, 155, 52]]); R.actor(EL.cavador2, qq.x, qq.s, t, { dir: -1, anda: qq.mv, habla: t > P3 + 2.1 && t < SEGUNDO - 0.4 && Math.sin(t * 8) > 0, sorpresa: t > P3 + 2.05 && t < P3 + 2.9 }); pico(qq.x + 1, qq.s - 12, -2.3); }
  else if (t < INUNDA2 - 0.25) { const gol = Math.floor(t * 3.2) % 2, lado = t > DEBAJO - 0.4; R.actor(EL.cavador2, 155, y2, t, { dir: lado ? -1 : 1, quieto: false });
    pico(lado ? 154 : 168, y2 - 12, lado ? (gol ? Math.PI - 0.3 : Math.PI + 1.1) : (gol ? 0.5 : -1.1));
    if (gol && t > SEGUNDO + 0.5) for (let k = 0; k < 5; k++) { const u = ((t * 2.6 + k * 0.2) % 1); R.pset(162 + Math.round((k - 2) * 3 * u), Math.round(y2 - 4 - u * (y2 - 40) * 0.9), k & 1 ? hex('#9a7a5a') : hex('#6a4a30')); } }
  else { const u = ease(tramo(t, INUNDA2 - 0.25, INUNDA2 + 0.55)), yy = Math.round(lerp(172, 52, u)), q = ruta(t, [[INUNDA2 + 0.55, 155, 52], [INUNDA2 + 0.95, 172, 52]]);
    R.actor(EL.cavador2, t < INUNDA2 + 0.55 ? 155 : q.x, t < INUNDA2 + 0.55 ? Math.min(yy, agua2 - 2) : 52, t, { dir: 1, anda: true, sorpresa: true, salto: t > INUNDA2 + 0.55 && t < INUNDA2 + 0.95 ? 3 : 0 });
    if (t < INUNDA2 + 0.6) for (let k = 0; k < 6; k++) R.pset(156 + k * 2, Math.min(yy, agua2 - 2) + 1 + ((k + Math.floor(t * 12)) & 1), hex('#c8ecf8')); }
  // la flecha que dice «por debajo»: de la galería del segundo pozo al primero
  const fl = tramo(t, DEBAJO - 0.15, DEBAJO + 0.25);
  if (fl > 0 && t < INUNDA2 - 0.2 && (Math.floor(t * 4) & 1)) { const yg = (g.segundo && g.segundo.galeriaY) || 167, xa = Math.round(lerp(152, 128, fl)); R.linea(152, yg - 5, xa, yg - 5, hex('#f8e070'), 2); R.linea(xa, yg - 5, xa + 4, yg - 9, hex('#f8e070')); R.linea(xa, yg - 5, xa + 4, yg - 1, hex('#f8e070')); }
};

// ── 4 · (fondo local) el cobertizo de la compañía con el barril de lluvia, y el mar detrás ──────────────────────────
const pintaCobertizo = () => {
  grad(0, 319, 0, 84, ['#5e9ad6', '#74aadc', '#8cbae4', '#a6cbec', '#c2dcf2'].map(hex));
  // el mar con las islitas y la costa de enfrente
  for (let x = 0; x < 320; x++) { const top = Math.round(76 + 2 * Math.sin(x * 0.04) + 2 * Math.sin(x * 0.15)); for (let y = top; y < 84; y++) R.pset(x, y, y === top ? hex('#7a9a8e') : hex('#5c7c72')); }
  for (const [x0, x1] of [[150, 196], [236, 262]]) for (let x = x0; x < x1; x++) { const top = Math.round(80 - 5 * Math.sin((x - x0) / (x1 - x0) * Math.PI)); for (let y = top; y < 84; y++) R.pset(x, y, H(x, y, 70) < 0.3 ? hex('#2e5226') : hex('#3e6a30')); }
  grad(0, 319, 84, 112, ['#6a9ac0', '#4e82aa', '#3e6e98', '#34628a'].map(hex));
};
const pintaCobertizoD = () => {
  // la pradera que baja hasta las rocas de la orilla: hierba en matas, flores, piedras y la vereda
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { const top = 100 + Math.round((x > 200 ? (x - 200) * 0.12 : 0) + 2 * Math.sin(x * 0.05)); if (y < top) continue;
    const v = H(x >> 1, y >> 1, 71), w = H(x >> 3, y >> 2, 72); R.pset(x, y, y === top ? hex('#8aae54') : v < 0.14 ? hex('#3e6a30') : v > 0.9 ? hex('#9aba5e') : w > 0.6 ? hex('#5a8a3c') : hex('#4c7c36')); }
  for (let y = 150; y < 180; y++) { const xc = Math.round(200 + (y - 150) * 2.2 + Math.sin(y * 0.2) * 3); for (let x = xc - 12 - (y - 150) / 3; x < xc + 12 + (y - 150) / 3; x++) R.pset(Math.round(x), y, H(x >> 1, y >> 1, 73) < 0.2 ? hex('#8a6a48') : hex('#a8865e')); }
  for (let k = 0; k < 110; k++) { const x = Math.round(H(k, 1, 74) * 320), y = 112 + Math.round(H(k, 2, 74) * 66), hg = 2 + Math.round(H(k, 3, 74) * 4); if (x > 120 && x < 136 && y < 152) continue;
    for (let i = -2; i <= 2; i++) R.linea(x + i, y, x + i + Math.round(i * 0.5), y - hg + Math.abs(i), hex('#2e5226')); R.pset(x, y - hg, hex('#9ac060')); if (k % 5 === 0) { R.pset(x + 2, y - hg - 1, [hex('#f8f0a0'), hex('#f2f2f2'), hex('#c8a0e8')][k % 3]); } }
  // las rocas de la orilla, a la derecha, con algas, percebes y la espuma
  for (const [cx, cy, rx, ry] of [[286, 112, 36, 14], [244, 116, 18, 8], [316, 124, 16, 10]]) { for (let y = -ry; y <= ry; y++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry)))); for (let x = -w; x <= w; x++) { const v = H(cx + x, cy + y, 75); R.pset(cx + x, cy + y, y > ry * 0.5 ? hex('#4a5a3a') : v < 0.15 ? hex('#5a5a62') : y < -ry * 0.4 ? hex('#a8a8b0') : hex('#7a7a84')); } }
    for (let k = 0; k < 8; k++) R.pset(cx - rx + 4 + k * Math.round(rx / 4), cy + Math.round(ry * 0.3), hex('#e8e0d0')); }
  // el cobertizo de troncos: muro de troncos con las esquinas en cruz, puerta, ventanuco, tejado de tablillas y chimenea de piedra
  R.rect(8, 58, 18, 150, K); for (let y = 60; y < 150; y += 4) { R.rect(9, y, 17, y + 3, H(1, y, 76) < 0.5 ? hex('#8a8a90') : hex('#a0a0a6')); R.pset(9, y + 3, hex('#5a5a62')); }
  for (let y = 70; y < 150; y += 7) { R.rect(16, y, 118, y + 6, K); R.rect(17, y + 1, 117, y + 5, hex('#8a6038')); R.rect(17, y + 1, 117, y + 1, hex('#b08250')); R.rect(17, y + 5, 117, y + 5, hex('#5a3a22'));
    for (let x = 24 + (y % 14); x < 116; x += 13) R.linea(x, y + 3, x + 5, y + 3, hex('#6a4426')); R.disco(16, y + 3, 3, K); R.disco(16, y + 3, 2, hex('#c89a64')); R.disco(118, y + 3, 3, K); R.disco(118, y + 3, 2, hex('#c89a64')); R.pset(118, y + 3, hex('#7a5232')); }
  R.rect(44, 104, 66, 150, K); R.rect(45, 105, 65, 150, hex('#6a4426')); for (let x = 48; x < 65; x += 5) R.rect(x, 105, x, 150, hex('#4a2c18')); R.rect(45, 112, 65, 113, hex('#4a2c18')); R.rect(45, 138, 65, 139, hex('#4a2c18')); R.rect(61, 126, 63, 128, hex('#c8a040'));
  R.rect(80, 92, 104, 110, K); R.rect(81, 93, 103, 109, hex('#2a3a4a')); R.rect(81, 93, 103, 95, hex('#8ab4d0')); R.rect(92, 93, 92, 109, hex('#6a4426')); R.rect(81, 101, 103, 101, hex('#6a4426'));
  R.rect(72, 92, 79, 110, hex('#5a7a4a')); R.rect(105, 92, 112, 110, hex('#5a7a4a')); R.rect(72, 92, 72, 110, K); R.rect(112, 92, 112, 110, K);
  R.poligono([[2, 72], [64, 42], [132, 72], [128, 76], [6, 76]], K); R.poligono([[4, 72], [64, 44], [130, 72], [127, 74], [7, 74]], hex('#7a6a5a'));
  for (let y = 48; y < 74; y += 3) { const w = Math.round((y - 44) * 2.2); for (let x = 64 - w; x < 64 + w; x += 5) { R.rect(x, y, x + 3, y + 1, (x + y) % 3 ? hex('#8a7a68') : hex('#6a5a4a')); R.pset(x + 3, y + 1, hex('#4a3e34')); } }
  R.rect(14, 40, 26, 72, K); R.rect(15, 41, 25, 72, hex('#8a8a90')); for (let y = 42; y < 72; y += 4) R.rect(15, y, 25, y, hex('#5a5a62'));
  // el canalón de madera que baja al barril de lluvia, con sus aros y el cazo de lata colgado
  R.linea(118, 76, 130, 120, K); R.linea(119, 76, 131, 120, hex('#8a6038')); R.linea(120, 76, 132, 120, hex('#5a3a22'));
  R.rect(120, 122, 140, 152, K); R.rect(121, 123, 139, 152, hex('#8a5e36')); for (let x = 124; x < 139; x += 4) R.rect(x, 123, x, 152, hex('#6a4426')); R.rect(121, 123, 123, 152, hex('#b08250'));
  for (const y of [127, 140, 149]) R.rect(120, y, 140, y + 1, hex('#4a4a56')); R.rect(121, 122, 139, 123, hex('#3e6a7a')); R.pset(126, 122, hex('#a8d0dc'));
  R.linea(141, 126, 143, 134, hex('#8a8a96')); R.rect(141, 134, 146, 137, K); R.rect(142, 135, 145, 136, hex('#a8acb8'));
  // la leña apilada y el banco
  for (let k = 0; k < 6; k++) { const x = 70 + (k % 3) * 9 - (k > 2 ? -4 : 0), y = 150 - (k > 2 ? 7 : 0); R.disco(x, y, 4, K); R.disco(x, y, 3, hex('#c89a64')); R.anillo(x, y, 2, hex('#a07444')); }
  R.rect(150, 142, 182, 145, K); R.rect(151, 143, 181, 144, hex('#a87a4c')); R.rect(153, 145, 155, 152, hex('#5a3a22')); R.rect(177, 145, 179, 152, hex('#5a3a22'));
  // la cerca de estacas junto a la vereda y unas piedras
  for (let k = 0; k < 6; k++) { const x = 236 + k * 14, y = 136 + k * 3; R.rect(x, y - 12, x + 2, y, K); R.rect(x + 1, y - 11, x + 1, y, hex('#a87a4c')); }
  R.linea(236, 128, 308, 143, hex('#8a6038')); R.linea(236, 132, 308, 147, hex('#6a4426'));
  for (const [x, y, r] of [[22, 168, 5], [196, 132, 3], [300, 166, 6]]) { R.disco(x + 1, y + 1, r, hex('#3e6a30')); R.disco(x, y, r, hex('#8a8a92')); R.disco(x - 1, y - 1, r - 2, hex('#a8a8b0')); }
};
const gallina = (x, y, t, k) => { const p = Math.sin(t * 3 + k * 2) > 0.6 ? 2 : 0; R.rect(x, y - 5, x + 6, y - 1, K); R.rect(x + 1, y - 4, x + 5, y - 2, hex('#e8e0d0')); R.rect(x + 5, y - 7 + p, x + 7, y - 4 + p, hex('#e8e0d0')); R.pset(x + 6, y - 8 + p, hex('#d83a2a')); R.pset(x + 8, y - 5 + p, hex('#e8a030')); R.pset(x + 6, y - 6 + p, K); R.pset(x + 2, y, hex('#e8a030')); R.pset(x + 4, y, hex('#e8a030')); };
const p4 = (t) => {
  fijo('cobertizo', pintaCobertizo);
  // nubes, gaviotas, la vela, las olas del mar (por detrás del cobertizo y la pradera); la espuma en las rocas; el humo; dos gallinas
  R.recorte([0, 15, 319, 84]); for (const [x0, y, w, v] of [[-30, 62, 28, 1.4], [150, 58, 22, 1.4], [90, 40, 38, 2.4], [170, 26, 26, 2.4], [-60, 24, 30, 3.6]]) nube3(x0 + v * (t - P4) + 30, y, w, hex('#b8c8d8'), hex('#f2f6f8'), BL); R.recorte(null);
  for (let k = 0; k < 3; k++) uve(Math.round(330 - ((t - P4) * 14 + k * 30) % 360), 50 + k * 6, t, k, hex('#3a4a5a'));
  for (let k = 0; k < 6; k++) { const y = 88 + k * 4, off = (t * (6 + k * 2) + k * 37) % 40; for (let x = 136 - off; x < 320; x += 40) R.rect(Math.round(x), y, Math.round(x) + 6 + k, y, hex('#8ab4d0')); }
  { const vx = Math.round(150 + (t - P4) * 4); R.poligono([[vx, 82], [vx + 5, 72], [vx + 7, 82]], BL); R.linea(vx + 5, 72, vx + 5, 84, K); R.rect(vx - 1, 84, vx + 9, 85, hex('#5a3a24')); }
  capa('cobertizoD', pintaCobertizoD);
  const ola = bump(t, MAR - 0.25, MAR + 0.9);
  if (ola > 0) for (let k = 0; k < 18; k++) { const a = -0.2 - k * 0.15, r = ola * (8 + (k % 5) * 4), x = Math.round(272 + (k % 6) * 6 + Math.cos(a) * r * 0.4), y = Math.round(100 - Math.abs(Math.sin(a)) * r * 1.4 - (k % 3) * 3); R.pset(x, y, BL); R.pset(x + 1, y, hex('#d8ecf4')); R.pset(x, y + 1, hex('#a8d0e4')); }
  for (let k = 0; k < 10; k++) { const u = (t * 1.3 + k / 10) % 1, x = 254 + k * 6, y = Math.round(104 - Math.sin(u * Math.PI) * (3 + ola * 16) - k % 2); R.pset(x, y, BL); R.pset(x + 1, y + 1, hex('#d8ecf4')); if (ola > 0.3) R.pset(x + 2, y - 2, BL); }
  for (let k = 0; k < 6; k++) { const u = (t * 0.3 + k / 6) % 1, x = Math.round(20 + u * 18 + Math.sin(u * 6 + k) * 2), y = Math.round(38 - u * 22), r = 1 + Math.round(u * 2); if (y > 15) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && bay(x + i, y + j) < 0.6 - u * 0.4) R.pset(x + i, y + j, mez(R.pget(x + i, y + j), hex('#e0e0e6'), 0.6)); }
  gallina(Math.round(90 + Math.sin(t * 0.5) * 6), 166, t, 0); gallina(108, 172, t, 1);
  // el de la orilla bebe del barril de lluvia con el cazo: dulce
  const bebe = t > P4 + 0.3 && t < P4 + 1.6, pruebaB = t > SALADO + 0.3 && t < SALADO + 0.9;
  R.actor(EL.cavador2, 140, 158, t, { dir: -1, dedo: bebe || pruebaB, sonrisa: (t > P4 + 1.0 && t < LLUVIA) || (t > SALADO + 0.7 && t < MAR - 0.6), sorpresa: t > SALADO + 0.9 && t < SALADO + 1.4, habla: t > LLUVIA - 0.2 && t < LLUVIA + 0.7 && Math.sin(t * 8) > 0, salto: t > SALADO + 0.95 && t < SALADO + 1.3 ? 2 : 0 });
  if (bebe) R.rect(141, 134, 146, 137, hex('#a8acb8'));
  // el de después llega del pozo con el cubo, lo deja junto al banco, piensa: ¿lluvia? no; lo prueba: salado
  const DEJA = P4 + 1.75, q = ruta(t, [[P4 + 0.05, 334, 164, -1], [DEJA, 174, 164, -1]]), dejado = t > DEJA;
  const prueba = t > SALADO - 0.45 && t < SALADO, salado = t > SALADO && t < MAR - 0.5, asusta = t > SALADO + 0.9 && t < SALADO + 1.3;
  R.actor(EL.amigo1, q.x, q.s, t, { dir: t > MAR - 0.6 ? 1 : -1, anda: q.mv, dedo: (t > LLUVIA - 0.5 && t < LLUVIA + 0.6) || prueba || t > MAR - 0.5, enfado: salado, salto: asusta ? 3 : 0, sonrisa: t > MAR + 0.4 });
  if (salado) { const hx = q.x + 7, hy = q.s - 24; R.pset(hx - 4, hy + 11, hex('#e85a6a')); R.pset(hx - 4, hy + 12, hex('#e85a6a')); for (const s of [-1, 1]) for (let i = 0; i < 3; i++) R.pset(hx + s * (10 + (Math.floor(t * 12) & 1)), hy + 2 + i * 3, BL); }
  const bx = dejado ? 166 : q.x - 3, by = dejado ? 166 : q.s - 6 + (Math.floor(t * 5) & 1);
  cuboL(bx, by, { lleno: true });
  if (!dejado) for (let k = 0; k < 2; k++) { const u = (t * 2.5 + k * 0.5) % 1; R.pset(bx - 4 + k * 7, Math.round(by - 9 + u * 9), hex('#a8d8e4')); }
  // el cangrejo que asoma del cubo
  const cg = tramo(t, SALADO + 0.6, SALADO + 0.9) * (1 - tramo(t, MAR + 0.6, MAR + 0.9)); if (cg > 0) { T.cangrejo(R, bx, by - 9 - Math.round(cg * 3), t, { dir: 1, pinzas: true, sorpresa: true, hundido: 1 - cg * 0.55, s: 0.7 }); cuboL(bx, by, { lleno: true, asa: false }); R.rect(bx - 4, by - 9, bx + 4, by - 9, hex('#3e6a7a')); }
  if (piensa(158, 112, 15, 10, q.x + 6, q.s - 26, tramo(t, LLUVIA - 0.35, LLUVIA - 0.05) * (1 - tramo(t, SALADO - 0.5, SALADO - 0.3)))) { R.icono('gota', 149, 108, hex('#4a8ad8'), hex('#1a3a6a')); R.icono('X', 159, 109, hex('#e83a3a'), K, 2); }
  // cubo = mar: señala el mar justo cuando una ola rompe en las rocas
  if (piensa(222, 120, 24, 11, q.x + 12, q.s - 26, tramo(t, MAR - 0.6, MAR - 0.3))) { cuboL(208, 126, { lleno: true, asa: false }); R.rect(217, 118, 223, 119, K); R.rect(217, 122, 223, 123, K);
    for (let i = 0; i < 12; i++) { const y = Math.round(122 + Math.sin(i * 0.9 + t * 4) * 2); R.pset(228 + i, y, hex('#3a7aa8')); R.pset(228 + i, y + 1, hex('#3a7aa8')); R.pset(228 + i, y - 1, hex('#a8d8f0')); } }
};

const efectos = [[en('inunda', 0.095) + 0.38, 'golpecito'], [LLENO, 'burbujas'], [TREINTA, 'pop'], [CUBOS, 'chof'], [BOMBA, 'burbujas'], [P3 + 1.6, 'chof'], [P3 + 2.05, 'boing'],
  [SEGUNDO + 0.8, 'golpecito'], [INUNDA2 - 0.3, 'ola'], [P4 + 1.75, 'golpecito'], [LLUVIA, 'pop'], [SALADO, 'masca'], [SALADO + 0.9, 'burbujas'], [MAR, 'ola']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1803 });
''')

E['oi-truro'] = ('1849: la broca', '''// OI-TRURO (frase 15), 1849, cartela «1849». Dos planos:
// 1. la boca del pozo con el taladro de mano gigante: dos obreros dan vueltas a la cruceta encima del brocal; llega la
//    compañía nueva (el capataz de chistera y uno con barras de repuesto al hombro, que las deja); «drill»: el capataz
//    señala el taladro;
// 2. (fondo local, inserto) la mesa con el trapo blanco junto al brocal: la broca sube del pozo («comes up»), se mece
//    sobre el trapo y suelta astillas («wood chips»), trocitos de metal («scraps of metal») y, uno a uno, tres eslabones
//    de oro («three tiny links»), que brillan en «gold»; detrás, el capataz y el obrero se asoman, se asombran y sonríen.''', AYUDA + r'''
const C = (f) => en('cadena', f), P2 = C(0.388);
const OTRA = C(0.152), TALADRO = C(0.311), SUBE = C(0.505), ASTILLAS = C(0.584), METAL = C(0.69), E1 = C(0.79), E2 = C(0.83), E3 = C(0.866), ORO = C(0.922);

// ── 1 · la boca del pozo en 1849, con el taladro ────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const g = T.pozo(R, t, { encuadre: 'boca', epoca: '1849' });
  const cx = 160, yC = 119, th = t * 2.4;
  // los dos de la cruceta, encima del brocal: el de detrás va detrás de la barrena y de la cruceta
  const hombres = [[th, EL.cavador], [th + Math.PI, EL.amigo2]].map(([a, def]) => ({ x: Math.round(cx + 13 * Math.cos(a)) - 7, z: Math.sin(a), d: -Math.sin(a) >= 0 ? 1 : -1, def }));
  for (const m of hombres) if (m.z < 0) R.actor(m.def, m.x, 137, t, { dir: m.d, anda: true, enfado: t > TALADRO });
  { const L = Math.round(Math.abs(Math.cos(th)) * 12) + 2; for (let y = yC - 4; y <= 140; y++) { R.pset(cx, y, (Math.floor(y / 2 + t * 6) & 1) ? hex('#9a9aa6') : hex('#6a6a76')); R.pset(cx + 1, y, hex('#4a4a56')); }
    R.rect(cx - L, yC - 1, cx + L, yC, K); R.rect(cx - L + 1, yC - 1, cx + L - 1, yC - 1, hex('#b08a5a')); R.rect(cx - 2, yC - 3, cx + 2, yC + 2, hex('#4a4a56')); }
  for (const m of hombres) if (m.z >= 0) R.actor(m.def, m.x, 137, t, { dir: m.d, anda: true, sonrisa: t > TALADRO });
  // virutas de arcilla que escupe la boca mientras gira
  for (let k = 0; k < 5; k++) { const u = (t * 1.7 + k / 5) % 1, s = k & 1 ? 1 : -1; R.pset(Math.round(cx + s * (3 + u * 14)), Math.round(141 - Math.sin(u * Math.PI) * 6), k % 3 ? hex('#9a7a5a') : hex('#6a4a30')); }
  // llega la compañía nueva: el capataz de chistera con el plano enrollado y uno con las barras de repuesto
  const qc = ruta(t, [[1.4, -16, 166], [OTRA + 1.0, 96, 166, 1]]);
  R.actor(EL.capataz, qc.x, qc.s, t, { dir: 1, anda: qc.mv, tocado: 'chistera', dedo: t > TALADRO - 0.1, habla: t > OTRA && t < OTRA + 1.2 && Math.sin(t * 9) > 0, sonrisa: t > TALADRO + 0.4 });
  if (t < TALADRO - 0.1) { const bx = qc.x + 14, by = qc.s - 12; R.rect(bx, by - 1, bx + 9, by + 1, K); R.rect(bx + 1, by, bx + 8, by, hex('#f2ecd8')); R.pset(bx + 9, by, hex('#c8bca0')); }
  const DEJA = TALADRO - 0.35, qb = ruta(t, [[1.7, 336, 168], [DEJA, 214, 168, -1]]);
  R.actor(EL.cavador2, qb.x, qb.s, t, { dir: -1, anda: qb.mv, sonrisa: t > DEJA + 0.3, habla: t > DEJA + 0.2 && t < DEJA + 1.0 && Math.sin(t * 8) > 0 });
  if (t < DEJA) { for (let k = 0; k < 3; k++) R.linea(qb.x - 12, qb.s - 13 + k, qb.x + 24, qb.s - 19 + k, k === 1 ? hex('#9a9aa6') : hex('#5a5a66')); }
  else { const u = ease(tramo(t, DEJA, DEJA + 0.3)); for (let k = 0; k < 3; k++) R.linea(196 - k * 3, 168, Math.round(lerp(226, 200, u)) - k * 3, Math.round(lerp(148, 168 - k, u)), k === 1 ? hex('#9a9aa6') : hex('#5a5a66')); }
};

// ── 2 · la mesa con el trapo blanco: lo que sube con la broca ───────────────────────────────────────────────────────
const MESA = { top: 118, frente: 150 };
const brocalCerca = () => { // los troncos del brocal en primer término, a la derecha
  for (const [y, s] of [[112, 0], [121, 1], [130, 0], [139, 1], [148, 0]]) { R.rect(232, y, 319, y + 8, K); R.rect(233, y + 1, 319, y + 7, hex('#7a5232')); R.rect(233, y + 1, 319, y + 2, hex('#a87a4a')); R.rect(233, y + 6, 319, y + 7, hex('#5a3a22'));
    for (let x = 238 + s * 5; x < 319; x += 11) { R.linea(x, y + 3, x + 6, y + 4, hex('#5a3a22')); R.pset(x + 2, y + 5, hex('#c89a64')); }
    R.disco(232, y + 4, 4, K); R.disco(232, y + 4, 3, hex('#c89a64')); R.anillo(232, y + 4, 2, hex('#a07444')); R.pset(232, y + 4, hex('#7a5232')); }
  for (let y = 157; y < 180; y++) for (let x = 226; x < 320; x++) R.pset(x, y, H(x >> 1, y >> 1, 51) < 0.3 ? hex('#4a3420') : hex('#5e4430'));
};
const pintaMesa = () => {
  // el cielo tramado, la bahía, la costa de enfrente con casitas, robles y el campamento al fondo
  grad(0, 319, 0, 74, ['#6aa4dc', '#7eb2e2', '#94c2ea', '#acd2f0', '#c6e2f4'].map(hex));
  for (let x = 0; x < 320; x++) { const top = Math.round(66 + 3 * Math.sin(x * 0.05) + 2 * Math.sin(x * 0.17)); for (let y = top; y < 76; y++) R.pset(x, y, y === top ? hex('#7a9a8a') : hex('#5e7e74')); }
  for (let k = 0; k < 7; k++) { const x = 20 + k * 19 + (k & 1) * 5, y = 70 - (k & 1); R.rect(x, y - 3, x + 4, y, hex('#f2eee2')); R.rect(x, y - 4, x + 4, y - 4, hex('#a84a3a')); R.pset(x + 2, y - 1, hex('#5a5a66')); }
  grad(0, 319, 76, 94, ['#5a8ab0', '#4a7aa0', '#3e6a90'].map(hex));
  for (let k = 0; k < 40; k++) { const x = Math.round(H(k, 1, 52) * 320), y = 78 + Math.round(H(k, 2, 52) * 15); R.rect(x, y, x + 3, y, hex('#8ab4d0')); }
};
const pintaMesaD = () => {
  // el claro detrás de la mesa: hierba, montones de tierra, la tienda pequeña con la ropa tendida y la hoguera
  for (let y = 90; y < 120; y++) for (let x = 0; x < 320; x++) { if (y < 94 + Math.max(0, 6 - Math.abs(x - 200) / 10) && x > 150 && x < 250) continue; const v = H(x >> 1, y >> 1, 53), w = H(x >> 3, y >> 2, 54); R.pset(x, y, v < 0.15 ? hex('#3e6a30') : v > 0.88 ? hex('#8aae54') : w > 0.55 ? hex('#5a8a3c') : w < 0.2 ? hex('#7a5a3a') : hex('#4c7c36')); }
  // el bosque de robles detrás del claro: una masa continua de copas de tres tonos con troncos en los huecos
  for (let x = 0; x < 320; x++) { if (x > 146 && x < 254) continue; const top = Math.round(60 + 6 * Math.sin(x * 0.07) + 4 * Math.sin(x * 0.19 + 2) + 3 * H(x >> 2, 0, 61) + Math.max(0, 12 - Math.min(Math.abs(x - 146), Math.abs(x - 254)))); for (let y = top; y < 96; y++) R.pset(x, y, H(x >> 1, y >> 1, 62) < 0.25 ? hex('#2e5226') : hex('#3e6a30')); }
  for (let k = 0; k < 14; k++) { const x = 8 + k * 23 + Math.round(H(k, 1, 63) * 8); if (x > 140 && x < 258) continue; R.rect(x, 82, x + 2, 96, hex('#4a3020')); R.pset(x, 84, hex('#6a4a30')); }
  for (let k = 0; k < 120; k++) { const x = Math.round(H(k, 2, 64) * 320); if (x > 138 && x < 262) continue; const y = Math.round(54 + H(k, 3, 64) * 34), r = 3 + Math.round(H(k, 4, 64) * 4); R.disco(x, y + 1, r, hex('#2e5226')); R.disco(x, y, r, k % 3 ? hex('#4a7a3a') : hex('#5a8a40')); R.disco(x - 1, y - 2, Math.max(1, r - 3), hex('#7aa64e')); }
  R.poligono([[52, 86], [34, 108], [70, 108]], hex('#e8dcc0')); R.poligono([[52, 86], [84, 88], [90, 108], [70, 108]], hex('#c8b898')); R.poligono([[52, 92], [48, 108], [56, 108]], hex('#3a2a20')); R.linea(52, 86, 34, 108, K); R.linea(52, 86, 84, 88, K);
  for (const [cx, rx] of [[150, 18], [196, 14]]) for (let y = -7; y <= 0; y++) { const w = Math.round(rx * Math.sqrt(1 - (y * y) / 49)); R.rect(cx - w, 110 + y, cx + w, 110 + y, y < -4 ? hex('#b08a64') : hex('#8a6a4a')); }
  R.rect(120, 104, 126, 110, hex('#5a5a62')); R.disco(123, 104, 3, hex('#f0a040')); R.pset(123, 102, hex('#f8e070'));
  // la mesa de tablas: tablero con vetas, canto y patas
  for (let y = MESA.top; y <= MESA.frente; y++) for (let x = 0; x < 236; x++) { const tab = Math.floor((y - MESA.top) / 8), v = H(x >> 2, y, 58 + tab);
    R.pset(x, y, (y - MESA.top) % 8 === 0 ? hex('#5a3a22') : v < 0.1 ? hex('#7a5232') : v > 0.9 ? hex('#c8986a') : Math.sin(x * 0.08 + tab * 2 + Math.sin(x * 0.02) * 3) > 0.8 ? hex('#8a6038') : hex('#a87a4c')); }
  R.rect(0, MESA.top - 1, 235, MESA.top - 1, K);
  R.rect(0, MESA.frente + 1, 235, MESA.frente + 6, hex('#6a4426')); R.rect(0, MESA.frente + 1, 235, MESA.frente + 1, hex('#c8986a')); R.rect(0, MESA.frente + 7, 235, MESA.frente + 7, K);
  for (let y = MESA.frente + 8; y < 180; y++) for (let x = 0; x < 236; x++) R.pset(x, y, H(x >> 1, y >> 1, 59) < 0.3 ? hex('#2e2018') : hex('#3e2c20'));
  for (const x of [8, 210]) { R.rect(x, MESA.frente + 8, x + 10, 179, K); R.rect(x + 1, MESA.frente + 8, x + 9, 179, hex('#6a4426')); R.rect(x + 1, MESA.frente + 8, x + 2, 179, hex('#9a6a3c')); }
  // el trapo blanco: pliegues, el borde deshilachado y una mancha de barro
  R.poligono([[96, 124], [214, 122], [222, 148], [88, 150]], hex('#b8b4ac')); R.poligono([[97, 123], [213, 121], [220, 146], [90, 148]], hex('#f2f0ea'));
  for (const [x0, x1] of [[120, 116], [160, 162], [196, 202]]) { R.linea(x0, 124, x1, 147, hex('#d8d6ce')); R.linea(x0 + 1, 124, x1 + 1, 147, hex('#ffffff')); }
  for (let x = 90; x < 220; x += 3) R.pset(x, 149 + (x % 2), hex('#d8d6ce'));
  for (let y = 124; y < 148; y += 2) for (let x = 96; x < 216; x += 4) if (H(x, y, 65) < 0.5) R.pset(x + (y & 2), y, hex('#e2e0d8'));
  for (let x = 100; x < 214; x++) R.pset(x, 146 - Math.round((x - 100) * 0.02), hex('#d0cec6'));
  R.poligono([[96, 124], [112, 124], [100, 132]], hex('#d8d6ce')); R.linea(96, 124, 100, 132, hex('#b8b4ac'));
  for (const [x, y] of [[132, 140], [176, 128], [150, 144]]) { R.pset(x, y, hex('#c8b8a0')); R.pset(x + 1, y, hex('#d8ccb8')); }
  R.disco(204, 140, 3, hex('#c8b090')); R.pset(203, 139, hex('#a88a68'));
  // lo que hay en la mesa: el farol, la taza de lata, el cuaderno con su lápiz, la pipa y una broca de repuesto
  R.rect(18, 98, 32, 122, K); R.rect(19, 100, 31, 120, hex('#c8d8e0')); R.rect(19, 100, 21, 120, hex('#e8f0f4')); R.rect(18, 96, 32, 99, hex('#3a3a46')); R.rect(18, 120, 32, 123, hex('#3a3a46')); R.linea(25, 90, 25, 96, K); R.anillo(25, 89, 3, K); R.rect(24, 110, 26, 117, hex('#e8e0c8'));
  R.rect(42, 110, 53, 124, K); R.rect(43, 111, 52, 123, hex('#8a96a2')); R.rect(43, 111, 45, 123, hex('#c8d2dc')); R.rect(53, 113, 56, 120, K); R.rect(43, 111, 52, 112, hex('#5a3a24'));
  R.poligono([[58, 128], [92, 126], [94, 142], [56, 144]], K); R.poligono([[59, 129], [75, 128], [76, 142], [58, 143]], hex('#f2ecd8')); R.poligono([[76, 128], [91, 127], [93, 141], [76, 142]], hex('#e8e0c8'));
  for (let j = 0; j < 5; j++) { R.linea(61, 131 + j * 2, 73, 130 + j * 2, hex('#7a7a9a')); R.linea(79, 130 + j * 2, 89, 129 + j * 2, hex('#7a7a9a')); }
  R.linea(66, 146, 84, 140, hex('#d8a040')); R.pset(84, 140, K);
  R.linea(30, 140, 44, 136, hex('#4a3020')); R.disco(46, 135, 3, K); R.disco(46, 135, 2, hex('#7a4a2a'));
  for (let x = 20; x < 80; x++) { R.pset(x, 147, hex('#5a5a66')); R.pset(x, 148, (x & 3) === 0 ? hex('#9a9aa6') : hex('#3a3a46')); }
  brocalCerca();
};
// la broca (barrena de cucharas en espiral) colgada de su soga; (x, y) = la punta
const broca = (x, y, t) => {
  R.linea(262, -20, x, y - 44, hex('#c8b088')); R.linea(263, -20, x + 1, y - 44, hex('#8a7048'));
  R.rect(x - 2, y - 46, x + 2, y - 26, K); R.rect(x - 1, y - 46, x + 1, y - 26, hex('#8a8a96')); R.rect(x - 1, y - 46, x - 1, y - 26, hex('#c8ccd8'));
  for (let j = 0; j < 22; j++) { const yy = y - 26 + j, w = j > 18 ? 22 - j : 5, ph = Math.sin(j * 0.9 + t * 0.5);
    R.rect(x - w - 1, yy, x + w + 1, yy, K); R.rect(x - w, yy, x + w, yy, ph > 0 ? hex('#6a6a76') : hex('#9a9aa6')); R.pset(x + Math.round(ph * w), yy, hex('#d8dce4'));
    if (H(j, 1, 60) > 0.55) R.pset(x - Math.round(ph * w), yy, hex('#8a6a4a')); }
  R.pset(x, y - 3, K); R.pset(x, y - 2, hex('#5a5a66'));
};
// una astilla, un trocito de metal y un eslabón de oro
const astilla = (x, y, k) => { const a = (k * 1.3) % 3.1 - 1.5, ex = Math.round(x + Math.cos(a) * 6), ey = Math.round(y + Math.sin(a) * 3);
  R.linea(x, y + 1, ex, ey + 1, hex('#5a3a20')); R.linea(x - 1, y, ex - 1, ey, K); R.linea(x, y, ex, ey, hex('#d8a860')); R.linea(x, y - 1, ex, ey - 1, hex('#f0d090')); R.pset(ex + 1, ey, hex('#a87a4a')); };
const metal = (x, y, k, t) => { const w = 2 + (k & 1); R.rect(x - 2, y - 2, x + w, y + 1, K); R.rect(x - 1, y - 1, x + w - 1, y, hex('#6a6a76')); R.pset(x - 1, y - 1, hex('#a8acb8')); R.pset(x + w, y - 2, K); R.pset(x, y - 1, Math.sin(t * 5 + k * 2) > 0.5 ? BL : hex('#c8ccd8')); };
const eslabon = (x, y, a) => { const rx = a ? 4 : 3, ry = a ? 3 : 4; elipse(x, y, rx + 1, ry + 1, K); elipse(x, y, rx, ry, hex('#e8b830')); elipse(x, y, rx - 2, ry - 2, hex('#4a3a22')); R.pset(x - rx + 1, y - 1, hex('#fcf0a0')); R.pset(x - 1, y - ry + 1, hex('#fcf0a0')); R.pset(x + rx - 1, y + 1, hex('#a8801c')); };
const p2 = (t) => {
  fijo('mesa', pintaMesa);
  // nubes de tres tonos a tres velocidades, la vela que cruza la bahía y gaviotas, por detrás del bosque y de la mesa
  R.recorte([0, 15, 319, 96]); for (const [x0, y, w, v] of [[20, 62, 30, 1.5], [190, 60, 26, 1.5], [60, 40, 40, 2.6], [170, 34, 28, 2.6], [-10, 22, 34, 3.8]]) nube3(x0 + v * t - 40, y, w, hex('#b8c8d8'), hex('#f2f6f8'), BL); R.recorte(null);
  { const vx = Math.round(236 - (t - P2) * 6); R.poligono([[vx, 74], [vx + 6, 64], [vx + 8, 74]], BL); R.linea(vx + 6, 64, vx + 6, 76, K); R.rect(vx - 1, 76, vx + 10, 77, hex('#5a3a24')); }
  for (let k = 0; k < 2; k++) uve(Math.round(40 + k * 14 + (t - P2) * 12), 44 + k * 5, t, k, hex('#3a4a5a'));
  capa('mesaD', pintaMesaD);
  for (let k = 0; k < 6; k++) { const u = (t * 0.25 + k / 6) % 1, x = Math.round(123 + u * 16 + Math.sin(u * 7 + k) * 2), y = Math.round(100 - u * 40), r = 1 + Math.round(u * 2); for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && bay(x + i, y + j) < 0.65 - u * 0.4) R.pset(x + i, y + j, mez(R.pget(x + i, y + j), hex('#e8e8ee'), 0.6)); }
  { const fl = Math.sin(t * 6); R.linea(72, 96, 110, 98, hex('#5a4a3a')); for (const [x, c] of [[78, '#c84a3a'], [90, '#4a6ab0'], [100, '#e8dcc0']]) R.rect(x, 97, x + 5, 102 + Math.round(fl * (x % 3)), hex(c)); }
  // detrás de la mesa, el capataz y el obrero se asoman; la mesa los tapa de cintura para abajo
  const vio = t > E1 + 0.1, rie = t > ORO + 0.2;
  R.recorte([0, 0, 319, MESA.top - 2]);
  R.actor(EL.capataz, 112, 124, t, { dir: 1, tocado: 'chistera', sorpresa: vio && !rie, sonrisa: rie, dedo: t > ORO + 0.1 });
  R.actor(EL.cavador, 142, 124, t, { dir: -1, sorpresa: t > ASTILLAS && !rie, sonrisa: rie, salto: rie && t < ORO + 0.9 ? Math.round(bump(t, ORO + 0.2, ORO + 0.9) * 4) : 0, habla: t > P2 + 0.3 && t < SUBE - 0.3 && Math.sin(t * 8) > 0 });
  R.recorte(null);
  // la broca sube del pozo, se mece hasta el trapo y suelta lo que trae
  const sube = ease(tramo(t, SUBE - 0.35, SUBE + 0.45)), va = ease(tramo(t, SUBE + 0.5, ASTILLAS - 0.05)), meneo = t > ASTILLAS - 0.05 ? Math.round(Math.sin(t * 22) * (t < E3 + 0.4 ? 1.5 : 0.3)) : 0;
  const bx = Math.round(lerp(262, 166, va) + Math.sin(tramo(t, ASTILLAS - 0.05, ASTILLAS + 1.4) * 9) * 4 * (1 - tramo(t, ASTILLAS, ASTILLAS + 1.4))) + meneo, by = Math.round(lerp(196, 108, sube));
  broca(bx, by, t);
  if (t < SUBE + 1.2) for (let k = 0; k < 3; k++) { const u = (t * 2 + k / 3) % 1; R.pset(bx - 2 + k * 2, Math.round(by + u * 20), hex('#8a7a6a')); }
  brocalCerca();
  // astillas, metal y los tres eslabones, que caen al trapo
  const cae = (t0, x1, y1) => { const u = tramo(t, t0, t0 + 0.35); return u <= 0 ? null : [Math.round(lerp(bx, x1, u)), Math.round(lerp(by - 4, y1, u * u) - (u >= 1 ? Math.round(bump(t, t0 + 0.35, t0 + 0.55) * 3) : 0))]; };
  for (let k = 0; k < 7; k++) { const p = cae(ASTILLAS + k * 0.07, 118 + k * 12 + (k & 1) * 3, 132 + (k * 5) % 12); if (p) astilla(p[0], p[1], k); }
  for (let k = 0; k < 4; k++) { const p = cae(METAL + k * 0.09, 128 + k * 17, 138 - (k * 3) % 7); if (p) metal(p[0], p[1], k, t); }
  const ES = [[E1, 146, 136, 1], [E2, 160, 134, 0], [E3, 174, 137, 1]];
  for (const [t0, x1, y1, a] of ES) { const p = cae(t0, x1, y1); if (p) eslabon(p[0], p[1], a); }
  // en «gold»: los tres brillan (cruces de luz que giran y el halo que late)
  const br = tramo(t, ORO - 0.05, ORO + 0.25);
  if (br > 0) for (const [, x, y] of ES) { tintaE(x, y, 9, 7, hex('#f8e070'), 0.28 * br * (0.7 + 0.3 * Math.sin(t * 6))); eslabon(x, y, 1); const r = Math.round(3 + 3 * Math.abs(Math.sin(t * 4 + x)) * br), d = Math.sin(t * 3 + x) > 0;
    for (let i = 1; i <= r; i++) { const c = i < r ? BL : hex('#f8e070'); if (d) { R.pset(x + i + 1, y - i - 1, c); R.pset(x - i + 1, y + i - 1, c); } else { R.pset(x + 1, y - 4 - i, c); R.pset(x + 1, y + 2 + i, c); R.pset(x + 5 + i, y - 1, c); R.pset(x - 3 - i, y - 1, c); } } }
  // la mano que acerca el último eslabón a la luz
  const coge = tramo(t, ORO + 0.25, ORO + 0.75);
  if (coge > 0) { const wx = Math.round(lerp(196, 182, coge)), wy = Math.round(lerp(176, 146, coge)); T.brazo(R, 214, 196, wx, wy, '#3a4a6a', -1); }
};

const efectos = [[TALADRO, 'maquina'], [TALADRO - 0.35, 'golpecito'], [SUBE, 'whoosh'], [ASTILLAS + 0.3, 'papel'], [METAL + 0.3, 'tic'], [E1 + 0.35, 'tic'], [E2 + 0.35, 'tic'], [E3 + 0.35, 'tic'], [ORO, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, cartela: '1849', año: 1849 });
''')
