E = {}

# Ayudas comunes a las cuatro escenas (cada .html lleva su copia)
H = r'''
const PZ = T.PIEZAS_DO, K = hex('#1a1014'), BLANCO = hex('#f6f2ea');
const hh = (a, b = 0) => { const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return s - Math.floor(s); };
// recorrido por puntos [t, x, y]: devuelve { x, y, mv }
const ruta = (t, pts) => {
  if (t <= pts[0][0]) return { x: pts[0][1], y: pts[0][2], mv: false };
  for (let i = 0; i < pts.length - 1; i++) { const [t0, x0, y0] = pts[i], [t1, x1, y1] = pts[i + 1]; if (t < t1) { const u = (t - t0) / (t1 - t0); return { x: Math.round(lerp(x0, x1, u)), y: Math.round(lerp(y0, y1, u)), mv: x1 !== x0 || y1 !== y0 }; } }
  const l = pts[pts.length - 1]; return { x: l[1], y: l[2], mv: false };
};
const cache = new Map();
const fijo = (k, dibuja) => { let b = cache.get(k); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); cache.set(k, b); } R.copiar(b); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const tine = (x, y, c, a) => R.pset(x, y, mez(R.pget(x, y), c, a));
const TR = [[0.12, 0.62], [0.87, 0.37]];
const trama = (x, y, f) => f > TR[y & 1][x & 1];
// degradado tramado en bandas (cielos, paredes)
const banda = (x0, y0, x1, y1, cols) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i; for (let x = x0; x <= x1; x++) R.pset(x, y, trama(x, y, f) ? cols[i + 1] : cols[i]); } };
const rp = (x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= Math.round(y1); y++) for (let x = Math.round(x0); x <= Math.round(x1); x++) R.pset(x, y, c); };
// nube de tres tonos y capas de nubes a varias velocidades: [y, ancho, velocidad, cuántas, [sombra, cuerpo, luz], semilla]
const nube3 = (cx, cy, w, c3) => { const B = [[0, 0, .32], [-.32, .06, .24], [.3, .05, .26], [-.1, -.12, .26], [.14, -.08, .22]]; for (const [dx, dy, r] of B) R.disco(cx + dx * w, cy + dy * w + 1, r * w, c3[0]); for (const [dx, dy, r] of B) R.disco(cx + dx * w, cy + dy * w - 1, r * w * 0.9, c3[1]); for (const [dx, dy, r] of B) R.disco(cx + dx * w - 1, cy + dy * w - 3, r * w * 0.55, c3[2]); };
const nubes = (t, capas, x0 = -40, x1 = 360) => { for (const [y, w, v, n, c3, sem] of capas) for (let k = 0; k < n; k++) { const x = x0 + ((hh(k, sem) * (x1 - x0) + t * v) % (x1 - x0)); nube3(x, y + hh(k, sem + 1) * 6, w * (0.8 + hh(k, sem + 2) * 0.4), c3); } };
const pajaros = (t, y, n = 3, v = 16, sem = 0, x0 = 0, x1 = 270) => { for (let k = 0; k < n; k++) { const x = Math.round(x0 + ((hh(k, sem) * (x1 - x0) + t * v) % (x1 - x0))), yy = Math.round(y + hh(k, sem + 2) * 10 + Math.sin(t * 1.7 + k) * 2), a = Math.sin(t * 9 + k * 2) > 0 ? 1 : 0; R.pset(x, yy, K); R.pset(x - 1, yy - a, K); R.pset(x + 1, yy - a, K); R.pset(x - 2, yy - 1 - a, K); R.pset(x + 2, yy - 1 - a, K); } };
// chispas que saltan de (cx, cy) en t0
const chispas = (cx, cy, t, t0, n, cols, v = 40, dur = 0.8, g = 30) => { const d = t - t0; if (d < 0 || d > dur) return; for (let k = 0; k < n; k++) { const a = hh(k, Math.round(t0 * 10)) * 6.283, s = v * (0.35 + hh(k + 7, Math.round(t0 * 10)) * 0.65), x = cx + Math.cos(a) * s * d, y = cy + Math.sin(a) * s * d + g * d * d; R.pset(x, y, cols[k % cols.length]); if (d < dur * 0.45) R.pset(x + 1, y, cols[(k + 1) % cols.length]); } };
// polvo que levanta un aterrizaje
const polvo = (cx, cy, t, t0, col = hex('#c8a07a'), colL = hex('#e8c8a0')) => { const d = t - t0; if (d < 0 || d > 0.9) return; for (let k = 0; k < 6; k++) { const s = k < 3 ? -1 : 1, r = 2 + d * 6 * (1 - d * 0.4), x = cx + s * (4 + (k % 3) * 5 + d * 18), y = cy - 2 - (k % 3) * 2 - d * 4; R.disco(x, y, r * (1 - d * 0.6), col); R.disco(x - 1, y - 1, r * 0.5 * (1 - d), colL); } };
// Xavier en su silla de ruedas (respaldo, el actor y las ruedas delante): (x, suelo) como R.actor
const xavier = (x, s, t, o = {}) => { const d = o.dir ?? 1, sx = d > 0 ? x + 2 : x + 12; PZ.silla(R, sx, s, { dir: d, parte: 'respaldo' }); const r = R.actor(EL.xavier, x, s - 8, t, o); PZ.silla(R, sx, s, { dir: d, parte: 'ruedas' }); return r; };
// el perrito con capa (gag 5): unos 18 × 14 px; o.dir, o.anda, o.ladra
const perrito = (x, s, t, o = {}) => {
  const d = o.dir ?? 1, X = (i) => Math.round(x + d * i), P = (i, j, c) => R.pset(X(i), s + j, c);
  const F = hex('#f0dcc0'), f = hex('#c8a07a'), RC = hex('#d0303a'), RS = hex('#8a1e28'), RL = hex('#f05a5a'), N = hex('#3a2430');
  const lad = o.ladra && Math.floor(t * 7) % 2 ? 1 : 0, paso = o.anda ? Math.floor(t * 12) % 2 : 0, y0 = -(o.anda ? paso : 0) - lad;
  for (const [i, ph] of [[1, 0], [3, 1], [8, 1], [10, 0]]) { const lev = o.anda && ph === paso ? 1 : 0; P(i, -1 - lev, N); P(i, -2 - lev, f); P(i, -3 - lev, f); }
  for (let i = 0; i <= 11; i++) for (let j = -8; j <= -3; j++) P(i, j + y0, i === 0 || i === 11 || j === -8 || j === -3 ? K : j === -4 ? f : F);
  const w = Math.sin(t * 16) > 0 ? 1 : 0; P(-1, -6 + y0, K); P(-2, -7 - w + y0, K); P(-3, -8 - w * 2 + y0, K); P(-2, -8 - w + y0, F);
  for (let i = 9; i <= 15; i++) for (let j = -13; j <= -6; j++) P(i, j + y0, i === 9 || i === 15 || j === -13 || j === -6 ? K : j === -7 ? f : F);
  for (let i = 15; i <= 18; i++) for (let j = -10; j <= -7 + lad; j++) P(i, j + y0, j === -10 || i === 18 || j === -7 + lad ? K : F);
  P(18, -10 + y0, N); P(19, -10 + y0, N); P(13, -11 + y0, K); P(12, -11 + y0, hex('#ffffff'));
  if (lad) { P(16, -7 + y0, hex('#e86a7a')); P(17, -7 + y0, hex('#e86a7a')); for (const [i, j] of [[21, -13], [22, -14], [21, -9], [22, -8], [22, -11], [23, -11]]) P(i, j, K); }
  P(10, -14 + y0, K); P(11, -15 + y0 + lad, K); P(12, -14 + y0, K); P(11, -14 + y0, f); P(13, -14 + y0, K); P(14, -15 + y0 + lad, K); P(15, -14 + y0, K); P(14, -14 + y0, f);
  const ola = Math.round(Math.sin(t * 12) * 1.5);
  R.poligono([[X(10), s - 9 + y0], [X(8), s - 9 + y0], [X(-4), s - 5 + y0 + ola], [X(-2), s - 2 + y0 + ola], [X(4), s - 4 + y0], [X(9), s - 6 + y0]], RC);
  R.linea(X(10), s - 9 + y0, X(-4), s - 5 + y0 + ola, RS); R.linea(X(-4), s - 5 + y0 + ola, X(-2), s - 2 + y0 + ola, RS); R.linea(X(8), s - 8 + y0, X(2), s - 6 + y0, RL);
  P(10, -9 + y0, hex('#e8b830')); P(9, -9 + y0, hex('#e8b830'));
};
'''

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['do-fox'] = ('Los X-Men de Fox', '''// DO-FOX (frases 35–36), sin cartela; año 2024 (y 2019 en el plano del estudio). Cuatro planos:
// 1. la mansión de la escuela en verano: Deadpool y Lobezno llegan por el camino de grava; en «Deadpool» Deadpool salta
//    con los brazos arriba, en «Wolverine» a Lobezno le salen las garras; en «opens the door» se abre la puerta del
//    pórtico con la luz dentro y Deadpool la señala; echan a andar hacia ella (corta en «another»);
// 2. el otro estudio, de cerca (fondo local): un despacho con la ventana a los platós, tres carteles sin letras (las
//    garras, la silla, el casco), latas de película, una claqueta y el café que humea; en la moviola una mano gira la
//    manivela de la bobina y en «lived … for 20 years» el contador de años corre de 2000 a 2019 (parpadea); en «Fox's
//    X-Men» se encienden los tres carteles (corta en «That's»);
// 3. la escalinata de la mansión, de cerca: Lobezno entra y saca las garras en «Wolverine»; en «Professor X» se abre la
//    puerta doble y sale Xavier en su silla; en «Magneto» Magneto baja flotando entre tornillos que giran; se miran
//    (corta en «a universe»);
// 4. el muro (fondo local): la ciudad de los Vengadores a la izquierda y el jardín de la mansión a la derecha; Lobezno
//    sube una escalera y asoma en «peeked» mientras el Capitán patrulla; se esconde; en «a couple of brief cameos» asoma
//    Bestia de un salto; el Capitán se gira y ya no hay nadie («?»); pasa un coche y vuela la armadura.''', H + r'''
const a = (f) => en('fox', f), b = (f) => en('xmen', f);
const P2 = a(0.467), P3 = b(0), P4 = b(0.51);
const DP = a(0.214), LOBO = a(0.292), ABRE = a(0.352), PUERTA = a(0.41), LIVED = a(0.631), ANOS = a(0.806), FOX = a(0.904);
const JACK = b(0.093), PROF = b(0.246), MAG = b(0.414), PEEK = b(0.724), CAMEO = b(0.882), CAMEOS = b(0.929);
const LUZ = hex('#f8dc98'), LUZS = hex('#e8b060'), MAD = hex('#5a3420'), MADL = hex('#7a4a2a');
// la puerta del pórtico (cámara general) que se abre: hojas en x 139–154, y 85–107
const puertaG = (t, u) => {
  if (u <= 0) return; const x0 = 139, x1 = 154, y0 = 85, y1 = 107, w = Math.round(lerp(8, 2, u));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, trama(x, y, Math.abs(x - 146.5) / 9 + (y - y0) / 60) ? LUZS : LUZ);
  R.rect(x0 + 4, y0 + 3, x1 - 4, y0 + 3, hex('#fff8e0')); R.pset(146, y0 + 4, hex('#ffffff')); R.pset(147, y0 + 4, hex('#ffffff'));
  R.rect(x0, y1 - 2, x1, y1, hex('#b87a40')); for (let x = x0; x <= x1; x += 3) R.pset(x, y1 - 1, hex('#8a5a2a'));
  for (const [xa, s] of [[x0, 1], [x1, -1]]) { const xb = xa + s * (w - 1); R.rect(Math.min(xa, xb), y0, Math.max(xa, xb), y1, MAD); R.rect(xb, y0, xb, y1, MADL); R.rect(xa, y0, xa, y1, K); }
  for (let j = 0; j < 8; j++) for (let i = -j; i <= 15 + j; i++) if ((i + j) % 2 === 0) tine(x0 + i, y1 + 1 + j, hex('#fff0c0'), 0.35 * u * (1 - j / 8));
};
// la puerta doble de la escalinata (cámara cerca) que se abre: hueco x 139–181, y 78–119
const puertaC = (t, u) => {
  if (u <= 0) return; const x0 = 139, x1 = 181, y0 = 78, y1 = 119, w = Math.round(lerp(21, 4, u));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, trama(x, y, Math.abs(x - 160) / 26 + (y - y0) / 90) ? LUZS : LUZ);
  // el vestíbulo: la escalera del fondo, la lámpara de araña, el suelo de damas y la alfombra
  for (let k = 0; k < 6; k++) R.rect(146 + k * 2, 100 - k * 3, 176, 100 - k * 3, hex('#c88a50'));
  R.linea(150, 80, 150, 84, hex('#8a6a3a')); R.rect(145, 85, 155, 86, hex('#e8b830')); for (const i of [145, 148, 152, 155]) R.pset(i, 87 + (Math.sin(t * 3 + i) > 0.6 ? 1 : 0), hex('#fff8d0'));
  for (let y = 106; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, ((x >> 2) + (y >> 2)) % 2 ? hex('#e8d8b8') : hex('#8a6a4a'));
  R.rect(154, 108, 166, y1, hex('#a8303a')); R.rect(154, 108, 166, 108, hex('#e8b830')); R.rect(154, y1, 166, y1, hex('#e8b830'));
  for (const [xa, s] of [[x0, 1], [x1, -1]]) { const xb = xa + s * (w - 1); R.rect(Math.min(xa, xb), y0, Math.max(xa, xb), y1, MAD); R.rect(xb, y0, xb, y1, MADL); R.rect(xa, y0, xa, y1, K); if (w > 8) { R.rect(Math.min(xa, xb) + 3, y0 + 4, Math.max(xa, xb) - 3, y0 + 4, K); R.rect(Math.min(xa, xb) + 3, y0 + 22, Math.max(xa, xb) - 3, y0 + 22, K); } }
  for (let j = 0; j < 40; j++) for (let i = -Math.round(j * 0.5); i <= 42 + Math.round(j * 0.5); i++) if ((i + j) % 2 === 0) tine(x0 + i, y1 + 1 + j, hex('#fff0c0'), 0.3 * u * (1 - j / 40));
};
// garras que salen: un destello en la mano
const destello = (x, y, t, t0) => { const d = t - t0; if (d < 0 || d > 0.35) return; const r = Math.round(2 + d * 14); R.linea(x - r, y, x + r, y, hex('#ffffff')); R.linea(x, y - r, x, y + r, hex('#ffffff')); R.linea(x - r / 2, y - r / 2, x + r / 2, y + r / 2, hex('#d8e8ff')); R.linea(x - r / 2, y + r / 2, x + r / 2, y - r / 2, hex('#d8e8ff')); };

// 1. la mansión en verano: llegan los dos y se abre la puerta
const p1 = (t) => {
  T.vacio(R, t, { encuadre: 'mansion' });
  puertaG(t, tramo(t, ABRE, PUERTA + 0.1));
  const lo = ruta(t, [[0, -18, 168], [3.0, 86, 166], [PUERTA + 0.1, 86, 166], [P2 + 0.3, 110, 154]]);
  const dp = ruta(t, [[0.4, -42, 170], [3.3, 118, 168], [PUERTA + 0.3, 118, 168], [P2 + 0.3, 136, 158]]);
  const sd = t > DP && t < DP + 0.55 ? Math.round(Math.sin((t - DP) / 0.55 * Math.PI) * 9) : 0, garras = t > LOBO;
  R.actor(EL.lobezno, lo.x, lo.y, t, { dir: 1, anda: lo.mv, garras, enfado: t > LOBO - 0.1 && t < PUERTA, sorpresa: t > ABRE + 0.1 && t < PUERTA + 0.4 });
  destello(lo.x + 17, lo.y - 11, t, LOBO);
  R.actor(EL.deadpool, dp.x, dp.y, t, { dir: t > DP + 0.6 && t < LOBO + 0.5 ? -1 : 1, anda: dp.mv, brazos: sd > 0, salto: sd, dedo: t > PUERTA - 0.2 && t < PUERTA + 0.5 });
};

// 2. el otro estudio: el despacho de cerca, la moviola y el contador que corre veinte años
const MURO = hex('#e6d6b4'), MUROS = hex('#d8c6a0'), MUROL = hex('#f0e4c8');
const fondoEstudio = () => {
  banda(0, 0, 319, 118, [hex('#d8c6a0'), MURO, MURO, MUROL]);
  for (let k = 0; k < 900; k++) { const x = Math.floor(hh(k, 3) * 320), y = Math.floor(hh(k, 4) * 92); if (!(x > 270 && y < 50)) R.pset(x, y, hh(k, 5) > 0.5 ? MUROS : MUROL); }
  R.rect(0, 0, 319, 3, hex('#8a5a30')); R.rect(0, 4, 319, 4, hex('#5a3418')); R.rect(0, 5, 319, 5, hex('#c8a070'));
  // zócalo de cuarterones
  R.rect(0, 92, 319, 118, hex('#7a4a26')); R.rect(0, 92, 319, 93, hex('#a8743c')); R.rect(0, 94, 319, 94, hex('#4a2a14'));
  for (let x = 4; x < 316; x += 30) { R.rect(x, 98, x + 24, 114, hex('#6a3e1e')); R.rect(x, 98, x + 24, 98, hex('#4a2a14')); R.rect(x, 114, x + 24, 114, hex('#9a6438')); R.rect(x + 24, 98, x + 24, 114, hex('#9a6438')); }
  // la ventana a los platós (marco)
  R.rect(10, 18, 96, 90, K); R.rect(11, 19, 95, 89, hex('#f2eee2')); R.rect(14, 22, 92, 86, K); R.rect(52, 22, 53, 86, hex('#f2eee2')); R.rect(10, 86, 98, 91, hex('#d8d0c0')); R.rect(10, 91, 98, 91, K);
  // tres marcos de cartel
  for (const x0 of [106, 150, 194]) { R.rect(x0 + 2, 24, x0 + 38, 80, hex('#b8a888')); R.rect(x0, 22, x0 + 36, 78, K); R.rect(x0 + 1, 23, x0 + 35, 77, hex('#4a2a14')); R.rect(x0 + 2, 24, x0 + 34, 76, hex('#6a3e1e')); }
  // la estantería de latas, a la derecha (por debajo de la esquina de Atom)
  R.rect(244, 60, 318, 62, hex('#6a3e1e')); R.rect(244, 63, 318, 63, hex('#3a2010')); R.rect(244, 84, 318, 86, hex('#6a3e1e')); R.rect(244, 87, 318, 87, hex('#3a2010'));
  for (let k = 0; k < 9; k++) { const x = 248 + k * 8, alto = 14 + Math.round(hh(k, 9) * 6), c = [hex('#8c90a4'), hex('#a8743c'), hex('#5a6a8a'), hex('#c8303a')][k % 4]; R.rect(x, 59 - alto, x + 6, 59, K); R.rect(x + 1, 60 - alto, x + 5, 59, c); R.rect(x + 1, 60 - alto, x + 1, 59, mez(c, BLANCO, 0.4)); R.rect(x + 1, 52 - Math.round(alto / 3), x + 5, 53 - Math.round(alto / 3), BLANCO); }
  for (let k = 0; k < 4; k++) { const x = 252 + k * 16, y = 83; R.rect(x - 7, y - 4, x + 7, y, K); R.rect(x - 6, y - 3, x + 6, y - 1, hex('#9ca0b4')); R.rect(x - 6, y - 3, x + 6, y - 3, hex('#d8dce8')); R.rect(x - 7, y - 9, x + 7, y - 5, K); R.rect(x - 6, y - 8, x + 6, y - 6, hex('#8c90a4')); R.rect(x - 2, y - 8, x + 2, y - 6, [hex('#e8b830'), hex('#3a8ae8'), hex('#c8303a'), hex('#3ab0a8')][k]); }
  // la mesa de madera con vetas
  R.rect(0, 118, 319, 152, hex('#9a6438')); for (let k = 0; k < 60; k++) { const y = 119 + Math.floor(hh(k, 11) * 32), x = Math.floor(hh(k, 12) * 300), L = 10 + Math.floor(hh(k, 13) * 40); R.rect(x, y, x + L, y, hh(k, 14) > 0.5 ? hex('#8a5630') : hex('#aa7444')); }
  R.rect(0, 118, 319, 118, hex('#c88a50')); R.rect(0, 152, 319, 156, hex('#5a3418')); R.rect(0, 152, 319, 152, hex('#b87a40'));
  R.rect(0, 157, 319, 179, hex('#7a4a26')); for (const x0 of [20, 170]) { R.rect(x0, 162, x0 + 130, 176, K); R.rect(x0 + 1, 163, x0 + 129, 175, hex('#8a5630')); R.rect(x0 + 1, 163, x0 + 129, 163, hex('#aa7444')); R.rect(x0 + 58, 167, x0 + 72, 170, K); R.rect(x0 + 59, 168, x0 + 71, 169, hex('#e8b830')); }
  // latas de película apiladas (izquierda)
  for (let k = 0; k < 3; k++) { const cx = 42 + (k === 1 ? 3 : 0), cy = 132 - k * 8; for (let i = -22; i <= 22; i++) { const e = Math.round(Math.sqrt(1 - (i / 22) ** 2) * 5); R.rect(cx + i, cy - e, cx + i, cy + e + 5, K); } for (let i = -21; i <= 21; i++) { const e = Math.round(Math.sqrt(1 - (i / 21) ** 2) * 4); R.rect(cx + i, cy + 1, cx + i, cy + e + 4, i < -12 ? hex('#a8acbc') : i > 12 ? hex('#5a5e70') : hex('#8c90a4')); R.rect(cx + i, cy - e, cx + i, cy + Math.max(0, e - 1) - 0, i < 0 ? hex('#c8ccd8') : hex('#aeb2c2')); } R.rect(cx - 8, cy + 3, cx + 8, cy + 4, [hex('#c8303a'), hex('#e8b830'), hex('#3a8ae8')][k]); R.anillo(cx, cy, 6, hex('#8c90a4')); }
  // la claqueta (sin letras: rayas y barras de tiza)
  R.rect(72, 108, 108, 136, K); R.rect(73, 109, 107, 135, hex('#2a2430')); for (const y of [116, 122, 128]) R.rect(76, y, 104, y, hex('#8a8494')); R.rect(76, 112, 90, 112, hex('#c8c4bc')); R.rect(94, 112, 102, 112, hex('#c8c4bc'));
  R.poligono([[72, 101], [108, 95], [109, 101], [73, 107]], K); for (let k = 0; k < 6; k++) R.poligono([[74 + k * 6, 101 - k], [77 + k * 6, 100 - k], [80 + k * 6, 105 - k], [77 + k * 6, 106 - k]], k % 2 ? hex('#2a2430') : BLANCO);
  R.rect(72, 104, 108, 107, K); for (let k = 0; k < 6; k++) R.rect(74 + k * 6, 105, 76 + k * 6, 106, k % 2 ? hex('#2a2430') : BLANCO);
  // la taza
  R.rect(111, 122, 125, 138, K); R.rect(112, 123, 124, 137, BLANCO); R.rect(112, 127, 124, 129, hex('#c8303a')); R.rect(112, 123, 124, 124, hex('#5a3418')); R.rect(125, 126, 128, 133, K); R.rect(126, 127, 127, 132, BLANCO); R.rect(112, 123, 113, 137, hex('#ffffff'));
  // el reloj de pared (a la izquierda de la esquina de Atom)
  R.disco(256, 36, 9, K); R.disco(256, 36, 8, hex('#f2eee2')); R.anillo(256, 36, 8, hex('#a8743c'));
};
const ventanaFuera = (t) => {
  R.recorte([15, 23, 91, 85]);
  banda(15, 23, 91, 85, [hex('#6aa8e8'), hex('#8ac0f0'), hex('#b8d8f8')]);
  nubes(t, [[34, 18, 2.2, 2, [hex('#c8d8f0'), hex('#e8f0ff'), hex('#ffffff')], 3]], 0, 110);
  // depósito de agua, platós con sus números, palmera, calle
  R.linea(60, 40, 58, 60, K); R.linea(70, 40, 72, 60, K); rp(56, 30, 74, 40, hex('#c8c4bc')); rp(56, 30, 74, 30, K); rp(56, 40, 74, 40, K); rp(57, 31, 59, 39, hex('#e8e4dc')); rp(58, 26, 72, 29, hex('#8a8494'));
  for (const [x0, x1, y0, n] of [[16, 50, 48, 7], [52, 90, 44, 12]]) { R.disco((x0 + x1) / 2, y0 + 4, (x1 - x0) / 2, hex('#c8b898')); rp(x0, y0 + 4, x1, 80, hex('#d8c8a8')); rp(x0, y0 + 4, x0 + 2, 80, hex('#e8dcc0')); rp(x0 + 6, 58, x1 - 6, 80, hex('#9a8a70')); for (let y = 60; y < 80; y += 3) rp(x0 + 6, y, x1 - 6, y, hex('#8a7a62')); R.numero(String(n), (x0 + x1) / 2, 56, { centro: true, color: hex('#5a3418'), sombra: false }); }
  R.linea(86, 80, 84, 56, hex('#6a4a2a')); for (const [dx, dy] of [[-6, 2], [6, 3], [-4, -2], [5, -1]]) R.linea(84, 56, 84 + dx, 56 + dy + Math.round(Math.sin(t * 2) * 1), hex('#3a8a3a'));
  rp(15, 80, 91, 85, hex('#8a8494')); for (let x = 16; x < 91; x += 6) R.pset(x, 82, hex('#e8e4dc'));
  const cx = Math.round(-20 + ((t * 14) % 130)); rp(cx, 76, cx + 10, 80, BLANCO); rp(cx, 74, cx + 10, 74, hex('#3a8a3a')); R.pset(cx + 1, 81, K); R.pset(cx + 8, 81, K); rp(cx + 6, 75, cx + 7, 77, hex('#f6c290'));
  const px = Math.round(100 - ((t * 6) % 100)); rp(px, 75, px + 1, 80, hex('#3a4a8a')); R.pset(px, 74, hex('#f6c290')); R.pset(px + 1, 74, hex('#f6c290'));
  R.recorte(null);
  // la persiana recogida arriba, con su cordón
  for (let y = 23; y < 31; y += 2) { R.rect(15, y, 91, y, hex('#e8e0cc')); R.rect(15, y + 1, 91, y + 1, hex('#b8ae98')); } R.linea(88, 31, 88, 60 + Math.round(Math.sin(t * 1.3) * 2), hex('#8a8070'));
};
// los carteles: las garras, la silla y el casco (pictogramas sin letras); luz 0–1
const cartel = (x0, k, t, luz) => {
  const fondo = mez(hex('#1e2a5a'), hex('#4a6ac8'), luz * 0.6); banda(x0 + 3, 25, x0 + 33, 75, [mez(fondo, K, 0.3), fondo, mez(fondo, BLANCO, 0.15)]);
  const cx = x0 + 18, cy = 46;
  if (k === 0) { R.poligono([[cx - 12, cy - 12], [cx - 6, cy - 4], [cx + 6, cy - 4], [cx + 12, cy - 12], [cx + 9, cy + 6], [cx, cy + 10], [cx - 9, cy + 6]], K); R.poligono([[cx - 10, cy - 9], [cx - 5, cy - 3], [cx + 5, cy - 3], [cx + 10, cy - 9], [cx + 8, cy + 5], [cx, cy + 8], [cx - 8, cy + 5]], hex('#f0c830')); R.rect(cx - 6, cy - 1, cx - 2, cy + 1, K); R.rect(cx + 2, cy - 1, cx + 6, cy + 1, K); R.pset(cx - 4, cy, BLANCO); R.pset(cx + 4, cy, BLANCO); for (const dx of [-4, 0, 4]) R.linea(cx + dx, cy + 12, cx + dx + 2, cy + 22, hex('#e8ecf4')); }
  if (k === 1) { R.disco(cx, cy - 6, 6, K); R.disco(cx, cy - 6, 5, hex('#f6c290')); R.pset(cx - 2, cy - 7, hex('#ffffff')); R.rect(cx - 6, cy, cx + 6, cy + 10, K); R.rect(cx - 5, cy + 1, cx + 5, cy + 10, hex('#2a2e3a')); R.anillo(cx - 2, cy + 14, 7, hex('#c8ccd8')); R.anillo(cx - 2, cy + 14, 6, K); R.linea(cx - 9, cy + 14, cx + 5, cy + 14, hex('#8c90a4')); R.linea(cx - 2, cy + 7, cx - 2, cy + 21, hex('#8c90a4')); }
  if (k === 2) { R.disco(cx, cy, 12, K); R.disco(cx, cy, 11, hex('#c8303a')); R.disco(cx - 3, cy - 4, 4, hex('#e85a5a')); R.rect(cx - 6, cy - 2, cx + 6, cy + 12, K); R.rect(cx - 5, cy - 1, cx + 5, cy + 12, hex('#f6c290')); R.rect(cx - 4, cy + 2, cx - 2, cy + 3, K); R.rect(cx + 2, cy + 2, cx + 4, cy + 3, K); R.rect(cx - 12, cy + 2, cx - 7, cy + 14, hex('#8a1e28')); R.rect(cx + 7, cy + 2, cx + 12, cy + 14, hex('#8a1e28')); R.poligono([[cx - 14, cy + 14], [cx + 14, cy + 14], [cx + 16, cy + 24], [cx - 16, cy + 24]], hex('#6a3a9a')); }
  for (const [y, w, c] of [[66, 22, hex('#e8b830')], [70, 14, hex('#c8c4bc')]]) R.rect(cx - w / 2, y, cx + w / 2, y + 1, c);
  if (luz > 0) { R.anillo(cx, 50, 26 + Math.round(Math.sin(t * 9) * 1), mez(hex('#fff0a0'), K, 0.2), 3); for (let y = 21; y <= 79; y++) { R.pset(x0 - 1, y, hex('#ffe890')); R.pset(x0 + 37, y, hex('#ffe890')); } R.rect(x0 - 1, 21, x0 + 37, 21, hex('#ffe890')); R.rect(x0 - 1, 79, x0 + 37, 79, hex('#ffe890')); }
};
const p2 = (t) => {
  fijo('estudio', fondoEstudio); ventanaFuera(t);
  for (let k = 0; k < 3; k++) cartel(106 + k * 44, k, t, tramo(t, FOX + k * 0.22, FOX + k * 0.22 + 0.15));
  // el reloj de pared, el humo del café y la bobina que rebobina
  const ang = t * 0.5; R.linea(256, 36, 256 + Math.round(Math.cos(ang) * 6), 36 + Math.round(Math.sin(ang) * 6), K); R.linea(256, 36, 256 + Math.round(Math.cos(t * 0.05 - 1.5) * 4), 36 + Math.round(Math.sin(t * 0.05 - 1.5) * 4), K);
  for (let k = 0; k < 3; k++) { const f = ((t * 0.7 + k / 3) % 1), y = Math.round(118 - f * 22), x = Math.round(118 + Math.sin(t * 3 + k * 2 + f * 5) * 3); if (f < 0.85) { R.pset(x, y, hex('#ffffff')); R.pset(x, y - 1, hex('#e8e4dc')); } }
  const rx = 146, ry = 124, gir = t * 4; R.disco(rx, ry, 17, K); R.disco(rx, ry, 16, hex('#3a3446')); R.disco(rx, ry, 11, hex('#5a5468')); for (let k = 0; k < 3; k++) { const a = gir + k * 2.094; R.disco(rx + Math.cos(a) * 7, ry + Math.sin(a) * 7, 3, K); } R.disco(rx, ry, 2, hex('#c8ccd8')); R.anillo(rx, ry, 16, hex('#8c90a4'));
  // la moviola: la bobina grande con su manivela, la película que corre entre las dos bobinas y el contador de años
  const rapido = tramo(t, LIVED - 0.2, LIVED + 0.3) - tramo(t, ANOS, ANOS + 0.4), mano = tramo(t, P2 + 0.2, P2 + 0.9) - tramo(t, FOX - 0.3, FOX + 0.3);
  const giro = (t - P2) * 2.2 + Math.max(0, Math.min(t, ANOS + 0.4) - (LIVED - 0.2)) * 14;
  const bx = 280, by = 118;
  R.rect(bx - 3, by, bx + 3, 150, K); R.rect(bx - 2, by, bx + 2, 150, hex('#5a5e70')); R.rect(bx - 14, 146, bx + 14, 152, K); R.rect(bx - 13, 147, bx + 13, 151, hex('#3a3446'));
  R.disco(bx, by, 25, K); R.disco(bx, by, 24, hex('#3a3446')); R.disco(bx, by, 19, hex('#2a2430')); for (let r2 = 9; r2 < 19; r2 += 2) R.anillo(bx, by, r2, hex('#4a3a2a'));
  for (let k = 0; k < 3; k++) { const a2 = giro + k * 2.094; R.disco(bx + Math.cos(a2) * 13, by + Math.sin(a2) * 13, 4, K); R.disco(bx + Math.cos(a2) * 13, by + Math.sin(a2) * 13, 3, hex('#5a5468')); }
  R.anillo(bx, by, 24, hex('#8c90a4')); R.disco(bx, by, 3, hex('#c8ccd8'));
  for (let k = 0; k < 10; k++) { const u = k / 10, x = lerp(146, bx - 2, u), y = lerp(108, by - 24, u) - Math.sin(u * Math.PI) * 4; R.pset(x, y, K); R.pset(x, y + 1, hex('#4a3a2a')); if ((k + Math.floor(giro * 2)) % 2) R.pset(x, y + 1, hex('#c8a070')); }
  R.linea(146, 108, bx - 2, by - 24, (x, y, k) => ((k + Math.floor(giro * 3)) % 3 === 0 ? hex('#c8a070') : hex('#3a2a1a')));
  // el contador de años (caja negra con marco de latón)
  R.rect(166, 92, 240, 124, K); R.rect(167, 93, 239, 123, hex('#c8a040')); R.rect(169, 95, 237, 121, K); R.rect(170, 96, 236, 120, hex('#1e1a22'));
  for (let i = 0; i < 4; i++) R.rect(171 + i * 16, 97, 184 + i * 16, 119, hex('#2a2430'));
  const año = 2000 + Math.round(19 * tramo(t, LIVED, ANOS)), parpadea = t > ANOS && t < FOX && Math.floor(t * 6) % 2;
  if (!parpadea) R.numero(String(año), 203, 117, { tam: 16, centro: true, color: hex('#f8b030') });
  R.rect(170, 107, 236, 107, hex('#14101a')); R.rect(170, 96, 236, 97, hex('#4a4250'));
  R.rect(180, 124, 226, 128, K); R.rect(181, 125, 225, 127, hex('#6a6e80')); R.pset(186, 126, rapido > 0.5 ? hex('#7ae86a') : hex('#3a5a3a')); R.pset(190, 126, hex('#e83a3a'));
  // la manivela gira y la mano la mueve (brazo canónico desde el borde derecho)
  const ka = giro, kx = Math.round(bx + Math.cos(ka) * 11), ky = Math.round(by + Math.sin(ka) * 11);
  R.linea(bx, by, kx, ky, K); R.linea(bx + 1, by, kx + 1, ky, hex('#c8ccd8')); R.disco(kx, ky, 2.5, K); R.disco(kx, ky, 1.5, hex('#c8303a'));
  if (mano > 0) { const wx = Math.round(lerp(352, kx + 12, mano)), wy = Math.round(lerp(150, ky + 1, mano)); T.brazo(R, 340, 160, wx, wy, '#3a5a9a', -1, { codo: [Math.round(lerp(340, wx + 22, 0.5)), Math.round(Math.max(wy, 150))] }); }
};

// 3. la escalinata: los tres, uno a uno
const p3 = (t) => {
  T.vacio(R, t, { encuadre: 'mansion', camara: 'cerca' });
  const ab = tramo(t, PROF - 0.55, PROF);
  puertaC(t, ab);
  if (ab > 0.6) xavier(152, 121 + Math.round(tramo(t, PROF, PROF + 0.6) * 2), t, { dir: 1, habla: t > MAG + 0.5 && t < P4 && Math.sin(t * 9) > 0, sonrisa: t > MAG, dedo: t > MAG + 0.6 && t < MAG + 1.0 });
  const al = ruta(t, [[P3, 330, 140], [PROF - 0.7, 236, 140], [MAG - 1.0, 236, 140], [MAG - 0.4, 262, 144], [P4, 262, 144]]);
  const ar = R.actor(EL.estudiante, al.x, al.y, t, { dir: -1, anda: al.mv, sorpresa: t > MAG - 0.9, sostiene: true });
  { const [bx, by] = ar.mano; R.rect(bx - 3, by - 4, bx + 3, by + 2, K); R.rect(bx - 2, by - 3, bx + 2, by + 1, hex('#3a6ac8')); R.rect(bx - 2, by - 3, bx - 2, by + 1, hex('#e8e4dc')); }
  const lo = ruta(t, [[P3, -18, 168], [P3 + 1.0, 100, 166]]);
  R.actor(EL.lobezno, lo.x, lo.y, t, { dir: 1, anda: lo.mv, garras: t > JACK, enfado: t > MAG - 0.2, sorpresa: t > PROF - 0.2 && t < PROF + 0.5 });
  destello(lo.x + 17, lo.y - 11, t, JACK);
  const vu = tramo(t, MAG - 1.1, MAG), alto = Math.round((1 - vu) ** 1.6 * 130);
  if (vu > 0) {
    const mx = 200, my = 166;
    for (let k = 0; k < 7; k++) { const ang = t * 3 + k * 0.9, r = 16 + (k % 3) * 3, x = mx + 7 + Math.cos(ang) * r, y = my - 14 - alto + Math.sin(ang) * r * 0.45; if (t < MAG + 1.4) { R.rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y), hex('#8c90a4')); R.pset(Math.round(x), Math.round(y) - 1, hex('#c8ccd8')); } }
    if (t < MAG + 0.4) R.anillo(mx + 7, my - 14 - alto, 14 + Math.round(Math.sin(t * 12) * 1.5), hex('#b07ae8'), 2);
    R.actor(EL.magneto, mx, my, t, { dir: -1, salto: alto, brazos: vu < 1, sonrisa: t > MAG + 0.3 });
    polvo(mx + 7, my, t, MAG, hex('#d8d0c0'), hex('#f2eee2'));
  }
};

// 4. el muro entre los dos mundos
const fondoMuro = () => {
  banda(0, 0, 319, 112, [hex('#3a78c8'), hex('#5a98e0'), hex('#8ab8f0'), hex('#c8e0f8')]);
  // la ciudad de los Vengadores (izquierda)
  for (let k = 0; k < 9; k++) { const x0 = -6 + k * 18, w = 14 + Math.floor(hh(k, 21) * 6), top = 70 + Math.floor(hh(k, 22) * 30), c = [hex('#8a9ab8'), hex('#6a7a98'), hex('#a8b4c8')][k % 3]; R.rect(x0, top, x0 + w, 132, K); R.rect(x0 + 1, top + 1, x0 + w - 1, 132, c); R.rect(x0 + 1, top + 1, x0 + 2, 132, mez(c, BLANCO, 0.3)); for (let y = top + 4; y < 128; y += 5) for (let x = x0 + 4; x < x0 + w - 2; x += 4) R.rect(x, y, x + 1, y + 2, hh(x, y) > 0.3 ? hex('#d8ecff') : hex('#3a4a6a')); }
  // la torre de cristal con su plataforma (sin letras)
  R.poligono([[54, 24], [82, 24], [86, 132], [50, 132]], K); R.poligono([[55, 25], [81, 25], [85, 132], [51, 132]], hex('#8ab0d8'));
  for (let y = 28; y < 132; y += 4) R.linea(52 + (y - 24) * 0.04, y, 84 - (y - 24) * 0.04 + 0, y, hex('#6a90c0')); for (let x = 58; x < 82; x += 5) R.linea(x, 26, x + (x - 68) * 0.1, 132, hex('#a8c8e8'));
  R.poligono([[56, 25], [62, 25], [58, 132], [53, 132]], hex('#d8ecff')); R.rect(46, 34, 90, 36, K); R.rect(47, 34, 89, 35, hex('#c8ccd8')); R.rect(66, 20, 70, 24, K); R.rect(67, 21, 69, 24, hex('#e8b830'));
  // la acera y la calle
  R.rect(0, 132, 150, 172, hex('#b8b4b0')); for (let y = 136; y < 172; y += 6) R.rect(0, y, 150, y, hex('#9a9690')); for (let x = 0; x < 150; x += 12) R.rect(x + ((Math.floor(x / 12) % 2) * 6) % 12, 132, x + ((Math.floor(x / 12) % 2) * 6) % 12, 172, hex('#a8a4a0'));
  R.rect(0, 172, 150, 179, hex('#4a4a52')); R.rect(0, 172, 150, 172, hex('#e8e4dc')); for (let x = 6; x < 150; x += 20) R.rect(x, 177, x + 8, 177, hex('#e8c840'));
  R.rect(20, 120, 22, 160, K); R.rect(17, 116, 25, 120, K); R.rect(18, 117, 24, 119, hex('#fff0b0')); R.rect(110, 150, 126, 160, K); R.rect(111, 151, 125, 159, hex('#3a7a4a')); R.rect(112, 146, 113, 150, K); R.rect(123, 146, 124, 150, K);
  // el jardín de la mansión (derecha)
  for (let y = 112; y < 180; y++) for (let x = 172; x < 320; x++) R.pset(x, y, (Math.floor((x - y * 0.4) / 10) % 2 ? hex('#5aa848') : hex('#4a9a3c')));
  for (let k = 0; k < 160; k++) { const x = 172 + Math.floor(hh(k, 31) * 148), y = 114 + Math.floor(hh(k, 32) * 64); R.pset(x, y, hex('#7ac85a')); R.pset(x, y - 1, hex('#3a8a30')); }
  R.rect(238, 48, 319, 110, K); R.rect(239, 49, 319, 110, hex('#a84a32')); for (let y = 52; y < 110; y += 4) for (let x = 239 + ((y >> 2) % 2) * 4; x < 320; x += 8) R.rect(x, y, x, y + 3, hex('#8a3a26')); for (let y = 52; y < 110; y += 4) R.rect(239, y, 319, y, hex('#c8a890'));
  R.rect(236, 44, 319, 48, hex('#e8dcc8')); R.rect(236, 48, 319, 48, K);
  for (const x0 of [252, 284]) { R.rect(x0, 60, x0 + 18, 90, K); R.rect(x0 + 1, 61, x0 + 17, 89, hex('#f2eee2')); R.rect(x0 + 3, 63, x0 + 15, 87, hex('#3a5a7a')); R.rect(x0 + 9, 63, x0 + 9, 87, hex('#f2eee2')); R.rect(x0 + 3, 75, x0 + 15, 75, hex('#f2eee2')); R.rect(x0 + 4, 64, x0 + 6, 70, hex('#8ab0d8')); }
  R.rect(176, 100, 319, 114, K); R.rect(177, 101, 319, 113, hex('#2e7a3a')); for (let x = 178; x < 320; x += 3) R.pset(x, 101 + (x % 5 === 0 ? 1 : 0), hex('#4a9a4a'));
  // el roble del jardín, el parterre y el banco
  R.rect(204, 70, 210, 150, K); R.rect(205, 70, 209, 150, hex('#6a4a2a')); R.rect(205, 70, 206, 150, hex('#8a6a4a'));
  for (const [dx, dy, r, c] of [[0, 0, 24, '#2e6a2a'], [-14, 10, 16, '#2e6a2a'], [14, 8, 17, '#2e6a2a'], [-4, -6, 18, '#3a8a32'], [10, -2, 14, '#3a8a32'], [-12, 2, 11, '#4aa040'], [4, -12, 10, '#5ab04a']]) R.disco(207 + dx, 70 + dy, r, hex(c));
  for (let k = 0; k < 50; k++) { const a = hh(k, 61) * 6.283, r = hh(k, 62) * 26; R.pset(207 + Math.cos(a) * r, 70 + Math.sin(a) * r * 0.9, hh(k, 63) > 0.5 ? hex('#7ac85a') : hex('#24521e')); }
  for (let x = 176; x < 320; x += 4) { R.rect(x, 114, x + 2, 118, hex('#2e6a2a')); R.disco(x + 1, 113, 1.5, ['#e83a5a', '#f0c830', '#e8e4f0', '#b07ae8'].map(hex)[(x >> 2) % 4]); }
  R.rect(240, 138, 278, 141, K); R.rect(241, 139, 277, 140, hex('#a8743c')); R.rect(240, 132, 278, 134, K); R.rect(241, 133, 277, 133, hex('#c89a5a')); for (const x of [244, 274]) R.rect(x, 141, x + 1, 148, K);
  // el muro de ladrillo con su albardilla, hiedra y grietas
  R.rect(146, 38, 174, 174, K); R.rect(147, 39, 173, 174, hex('#b85a3a'));
  for (let y = 42; y < 174; y += 4) { R.rect(147, y, 173, y, hex('#d8c0a8')); for (let x = 147 + ((y >> 2) % 2) * 5; x < 174; x += 10) R.rect(x, y, x, y + 3, hex('#d8c0a8')); }
  for (let k = 0; k < 40; k++) { const x = 148 + Math.floor(hh(k, 41) * 25), y = 40 + Math.floor(hh(k, 42) * 130); R.pset(x, y, hh(k, 43) > 0.5 ? hex('#8a3a26') : hex('#d87a5a')); }
  R.rect(147, 39, 149, 174, hex('#d87a5a')); R.rect(171, 39, 173, 174, hex('#7a3020'));
  R.rect(142, 32, 178, 38, K); R.rect(143, 33, 177, 37, hex('#c8c4bc')); R.rect(143, 33, 177, 33, hex('#ecebe4')); for (let x = 148; x < 178; x += 8) R.pset(x, 35, hex('#8a8494'));
  R.linea(158, 60, 162, 72, K); R.linea(162, 72, 159, 84, K);
  for (let k = 0; k < 30; k++) { const x = 147 + Math.floor(hh(k, 51) * 10), y = 120 + Math.floor(hh(k, 52) * 54); R.pset(x, y, hex('#3a8a3a')); R.pset(x + 1, y, hex('#5ab04a')); }
  R.rect(0, 174, 319, 179, hex('#6a6a6a')); R.rect(172, 174, 319, 179, hex('#3a7a30'));
  // la escalera apoyada en el muro (lado de la mansión)
  R.linea(176, 172, 174, 40, K); R.linea(186, 172, 182, 40, K); R.linea(177, 172, 175, 40, hex('#c8a070')); R.linea(187, 172, 183, 40, hex('#c8a070'));
  for (let y = 46; y < 172; y += 9) { const d = (172 - y) / 132; R.rect(Math.round(176 - d * 2), y, Math.round(186 - d * 4), y, hex('#a87a48')); }
};
const p4 = (t) => {
  fijo('muro', fondoMuro);
  R.recorte([0, 0, 145, 31]); nubes(t, [[18, 22, 1.5, 3, [hex('#b8c8e0'), hex('#e8f0ff'), hex('#ffffff')], 5]]); R.recorte(null);
  R.recorte([179, 0, 319, 43]); nubes(t, [[24, 20, 1.0, 2, [hex('#b8c8e0'), hex('#e8f0ff'), hex('#ffffff')], 7]], 180, 330); R.recorte(null);
  R.recorte([90, 40, 230, 70]); nubes(t, [[56, 14, 3.2, 2, [hex('#c8d8f0'), hex('#f0f6ff'), hex('#ffffff')], 9]]); R.recorte(null);
  pajaros(t, 50, 3, 14, 3, 180, 236);
  // el aspersor del jardín y la gente de la ciudad que pasa
  for (let k = 0; k < 14; k++) { const u = ((t * 0.9 + k / 14) % 1), a = -Math.PI * (0.2 + 0.6 * ((Math.sin(t * 1.2) + 1) / 2)), x = 300 + Math.cos(a) * u * 30, y = 158 + Math.sin(a) * u * 30 + u * u * 22; R.pset(x, y, u < 0.5 ? hex('#d8f0ff') : hex('#8ac8f0')); }
  R.rect(298, 157, 302, 160, K); R.rect(299, 158, 301, 159, hex('#8c90a4'));
  for (const [d, k, dd] of [[EL.neoyorquina, 0, 1], [EL.neoyorquino, 1, -1]]) { const x = Math.round(dd > 0 ? -20 + ((t * 9 + k * 60) % 170) : 150 - ((t * 8 + k * 50) % 170)); R.recorte([0, 0, 145, 179]); R.actor(d, x, 146, t, { dir: dd, anda: true }); R.recorte(null); }
  // la armadura que cruza volando por la ciudad
  const iv = ((t - P4) * 60) % 260; if (t > P4 + 0.5) { const ix = Math.round(-30 + iv), iy = 60 + Math.round(Math.sin(t * 2) * 4); if (ix < 134) { R.recorte([0, 0, 141, 179]); R.actor(EL.ironman, ix, iy, t, { dir: 1, brazos: false, quieto: true }); for (let k = 0; k < 3; k++) R.pset(ix + 4 + k * 3, iy + 1 + (Math.floor(t * 20 + k) % 2), k === 1 ? hex('#fff0a0') : hex('#f8a030')); R.recorte(null); } }
  // el Capitán patrulla por la acera con el escudo; se gira al oír algo
  const cp = ruta(t, [[P4, 20, 160], [PEEK - 0.6, 92, 160], [PEEK + 0.6, 92, 160], [CAMEO - 0.2, 60, 160], [CAMEOS + 0.2, 60, 160], [E.duracion, 86, 160]]);
  const mira = (t > PEEK + 0.1 && t < PEEK + 0.9) || (t > CAMEOS - 0.05 && t < CAMEOS + 1.2);
  const c = R.actor(EL.capitan, cp.x, cp.y, t, { dir: mira ? 1 : cp.mv && t > PEEK && t < CAMEOS ? -1 : 1, anda: cp.mv, sostiene: true, sorpresa: mira });
  PZ.escudo(R, c.mano[0], c.mano[1], { r: 6 });
  if (t > CAMEOS + 0.35 && t < CAMEOS + 1.4) R.bocadillo(cp.x + 8, cp.y - 30, { icono: '?' });
  // Lobezno sube, asoma y se esconde; luego asoma Bestia de un salto
  const ly = t < PEEK - 2.0 ? 172 : t < PEEK ? Math.round(lerp(172, 66, tramo(t, PEEK - 2.0, PEEK - 0.05))) : t < PEEK + 0.75 ? 66 : Math.round(lerp(66, 172, tramo(t, PEEK + 0.75, PEEK + 1.3)));
  const lx = Math.round(lerp(180, 176, (172 - ly) / 106));
  if (t < PEEK + 1.3) R.actor(EL.lobezno, lx, ly, t, { dir: ly < 80 ? -1 : 1, anda: t > PEEK - 2.0 && t < PEEK, sorpresa: t > PEEK + 0.3 && t < PEEK + 1.0, garras: false });
  else { const lo = ruta(t, [[PEEK + 1.3, 180, 172], [CAMEO - 0.5, 240, 172]]); R.actor(EL.lobezno, lo.x, lo.y, t, { dir: lo.mv ? 1 : -1, anda: lo.mv, sonrisa: t > CAMEOS, garras: false }); }
  const bs = t > CAMEO - 0.1 && t < CAMEO + 0.9 ? Math.round(Math.sin((t - CAMEO + 0.1) / 1.0 * Math.PI) * 112) : 0;
  const be = ruta(t, [[CAMEO - 1.6, 330, 174], [CAMEO - 0.2, 188, 174], [CAMEOS + 0.8, 188, 174], [E.duracion, 286, 174]]);
  if (t > CAMEO - 1.6) R.actor(EL.bestia, be.x, be.y, t, { dir: be.mv && t > CAMEOS ? 1 : -1, anda: be.mv, salto: bs, brazos: bs > 20, sonrisa: true });
  // las palomitas, en la acera, se ríen del escondite
  T.palomitas(R, 128, 172, t, { dir: 1, expresion: t > CAMEOS + 0.2 ? 'risa' : t > PEEK && t < PEEK + 1.2 ? 'susto' : 'normal', tapa: t > CAMEO - 0.2 && t < CAMEOS });
  // un coche que pasa por la calle, delante de todos
  const kx = Math.round(lerp(-60, 360, tramo(t, P4 + 2.8, P4 + 5.0))); if (kx > -50 && kx < 150) { R.recorte([0, 0, 145, 179]); rp(kx, 166, kx + 40, 176, K); rp(kx + 1, 167, kx + 39, 175, hex('#c8303a')); rp(kx + 8, 160, kx + 30, 167, K); rp(kx + 9, 161, kx + 29, 166, hex('#a8d0f0')); rp(kx + 19, 161, kx + 20, 166, hex('#c8303a')); rp(kx + 1, 167, kx + 39, 168, hex('#f05a5a')); R.disco(kx + 9, 176, 4, K); R.disco(kx + 31, 176, 4, K); R.disco(kx + 9, 176, 2, hex('#8c90a4')); R.disco(kx + 31, 176, 2, hex('#8c90a4')); R.recorte(null); }
};
const efectos = [[DP, 'boing'], [LOBO, 'brillo'], [PUERTA - 0.2, 'puerta'], [LIVED, 'maquina'], [ANOS + 0.1, 'tic'], [FOX, 'brillo'],
  [JACK, 'brillo'], [PROF - 0.5, 'puerta'], [MAG - 1.0, 'zumbido'], [MAG, 'golpecito'], [PEEK - 1.8, 'toc'], [PEEK, 'pop'], [CAMEO, 'boing'], [P4 + 3.4, 'coche']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t > P2 && t < P3 ? 2019 : 2024) });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['do-10005'] = ('La Tierra 10005', '''// DO-10005 (frases 37–38), sin cartela; año 2024. Cinco planos:
// 1. el espacio desde la luna: una Tierra ocre con un «?» en su placa; Deadpool llega andando y la señala en «Deadpool's
//    Earth»; en «10005» la placa cambia a 10005 con un destello y Deadpool salta de alegría (corta en «fading»);
// 2. la repisa de la chimenea de Deadpool (fondo local): la foto enmarcada de Lobezno con su lazo, la vela, las flores y
//    una bola de nieve con la Tierra 10005 dentro, que pierde el color; todo se apaga poco a poco; las palomitas cruzan la
//    repisa con una flor y la dejan ante la foto en «Wolverine», y lloran con su servilleta (corta en «and an agent»);
// 3. la oficina del tiempo: un agente cruza de puntillas por el pasillo con una máquina mientras dos jefes charlan de
//    espaldas; en «behind his bosses' backs» pide silencio; en «wipe it out» la máquina proyecta la Tierra 10005 con una
//    mira roja; un jefe se gira y el agente silba (corta en «So»);
// 4. el pasillo de las realidades (fondo local): tres portales con tres mundos y tres Lobeznos; Deadpool salta de uno a
//    otro en «jumps to other realities»; los dos primeros dicen que no; en «replacement Wolverine» el tercero saca las
//    garras y sale con él (corta en «in the Void»);
// 5. el Vacío: se abre el portal y los dos caen rodando a la arena en «Void»; se levantan, miran el vertedero y Deadpool
//    señala la cabeza gigante en «leftovers of erased universes».''', H + r'''
const a = (f) => en('10005', f), b = (f) => en('vacio', f);
const P2 = a(0.302), P3 = a(0.649), P4 = b(0), P5 = b(0.508);
const SUYA = a(0.114), NUM = a(0.171), IMPORT = a(0.406), WOLV = a(0.513), MUERTO = a(0.585), AGENTE = a(0.662), ESPALDAS = a(0.781), BORRAR = a(0.915), GOLPE = a(0.955);
const SALTA = b(0.045), OTRAS = b(0.112), REPUESTO = b(0.254), LOBO = b(0.302), DOS = b(0.418), VOID = b(0.524), VERTE = b(0.628), RESTOS = b(0.766), BORRADOS = b(0.846);

// 1. la Tierra que recibe su número
const p1 = (t) => {
  const tiene = t > NUM;
  T.cosmos(R, t, { numeros: [tiene ? 10005 : '?'] });
  const d = t - NUM; if (d > 0 && d < 0.8) { R.anillo(100, 78, 34 + d * 30, hex('#fff6c8'), 2); R.anillo(100, 78, 30 + d * 50, hex('#f0b040'), 3); chispas(100, 130, t, NUM, 18, [hex('#fff6c8'), hex('#f0b040'), hex('#ffffff')], 50, 0.8, 10); }
  const dp = ruta(t, [[0, 336, 164], [SUYA - 0.3, 196, 162]]);
  const sd = t > NUM + 0.15 && t < NUM + 0.75 ? Math.round(Math.sin((t - NUM - 0.15) / 0.6 * Math.PI) * 10) : 0;
  R.actor(EL.deadpool, dp.x, dp.y, t, { dir: -1, anda: dp.mv, dedo: t > SUYA - 0.2 && t < NUM + 0.1, brazos: sd > 0 || (t > NUM + 1.4 && t < NUM + 1.9), salto: sd });
};

// 2. la repisa: la foto, la vela, la bola de nieve; el mundo que se apaga
const fondoRepisa = () => {
  banda(0, 0, 319, 104, [hex('#2a2238'), hex('#3a3048'), hex('#4a3e58'), hex('#5a4a64')]);
  for (let k = 0; k < 500; k++) { const x = Math.floor(hh(k, 61) * 320), y = Math.floor(hh(k, 62) * 100); if (!(x > 268 && y < 50)) R.pset(x, y, hh(k, 63) > 0.5 ? hex('#4a3e58') : hex('#342a42')); }
  // la ventana con cortinas (izquierda)
  R.rect(8, 14, 72, 92, K); R.rect(9, 15, 71, 91, hex('#5a4a3a')); R.rect(12, 18, 68, 88, K); R.rect(39, 18, 41, 88, hex('#5a4a3a')); R.rect(12, 52, 68, 53, hex('#5a4a3a'));
  for (const [x0, x1, s] of [[2, 18, 1], [62, 78, -1]]) for (let x = x0; x <= x1; x++) for (let y = 8; y < 100; y++) R.pset(x, y, ((x + (y >> 3)) % 4 === 0) ? hex('#6a2a32') : (x - x0) % 4 < 2 ? hex('#8a3a42') : hex('#a84a52'));
  R.rect(0, 6, 82, 8, hex('#c8a060')); R.rect(0, 9, 82, 9, K);
  // la repisa y la chimenea de piedra
  R.rect(60, 98, 300, 106, K); R.rect(61, 99, 299, 105, hex('#8a5a30')); R.rect(61, 99, 299, 100, hex('#c88a50')); for (let x = 66; x < 296; x += 9) R.pset(x, 103, hex('#6a3e1e'));
  R.rect(84, 106, 276, 179, hex('#7a7068'));
  for (let y = 108; y < 180; y += 7) for (let x = 84 + ((y / 7) % 2) * 8; x < 276; x += 16) { R.rect(x, y, x + 14, y + 5, hex('#8a8078')); R.rect(x, y, x + 14, y, hex('#a89e94')); R.rect(x + 14, y, x + 14, y + 5, hex('#5a524c')); }
  R.rect(116, 122, 244, 179, K); R.rect(118, 124, 242, 179, hex('#1a1014')); R.rect(118, 124, 242, 128, hex('#3a2a2a'));
  R.rect(84, 106, 87, 179, hex('#5a524c')); R.rect(273, 106, 276, 179, hex('#5a524c'));
  // el suelo de tablas y una alfombra
  R.rect(0, 106, 83, 179, hex('#3a2a2a')); R.rect(277, 106, 319, 179, hex('#3a2a2a'));
  for (let y = 112; y < 180; y += 8) { R.rect(0, y, 83, y, hex('#2a1e1e')); R.rect(277, y, 319, y, hex('#2a1e1e')); }
  for (let y = 160; y < 180; y++) for (let x = 0; x < 84; x++) R.pset(x, y, ((x >> 1) + (y >> 1)) % 4 === 0 ? hex('#8a3a32') : hex('#a84a3a'));
  // la lámpara de pie (derecha) y la estantería baja
  R.rect(298, 64, 300, 179, K); R.rect(290, 174, 308, 179, K); R.poligono([[286, 64], [312, 64], [306, 50], [292, 50]], K); R.poligono([[288, 63], [310, 63], [305, 51], [293, 51]], hex('#e8c890'));
  R.rect(14, 118, 70, 158, K); R.rect(15, 119, 69, 157, hex('#5a3418')); for (const y of [132, 145]) R.rect(15, y, 69, y + 1, hex('#3a2010'));
  for (let k = 0; k < 12; k++) { const x = 17 + k * 4, y0 = k < 6 ? 120 : 134, alto = 9 + Math.floor(hh(k, 71) * 3); R.rect(x, y0 + 12 - alto, x + 3, y0 + 11, [hex('#c8303a'), hex('#e8b830'), hex('#3a8ae8'), hex('#3a9a5a')][k % 4]); R.rect(x, y0 + 12 - alto, x, y0 + 11, K); }
  R.rect(17, 148, 40, 156, hex('#c8303a')); R.rect(17, 148, 40, 148, hex('#f05a5a'));
  // dos katanas cruzadas en su soporte, en la pared (las de Deadpool)
  for (const s2 of [1, -1]) { const x0 = 212 - s2 * 26, x1 = 212 + s2 * 26; R.linea(x0, 46, x1, 18, K); R.linea(x0, 45, x1, 17, hex('#c8ccd8')); R.linea(x0, 44, x1, 16, hex('#ffffff')); R.linea(x0, 47, x0 + s2 * 9, 42, K); R.linea(x0, 46, x0 + s2 * 9, 41, hex('#2a2430')); R.rect(x0 + s2 * 9 - 2, 39, x0 + s2 * 9 + 2, 43, hex('#e8b830')); }
  R.rect(196, 30, 228, 34, K); R.rect(197, 31, 227, 33, hex('#5a3418')); R.disco(212, 32, 3, hex('#c8303a')); R.disco(212, 32, 1, K);
  // un cuadrito con un unicornio de colores (sin letras) y el enchufe
  R.rect(96, 30, 124, 52, K); R.rect(97, 31, 123, 51, hex('#c8a040')); R.rect(99, 33, 121, 49, hex('#f8e0f0')); R.disco(110, 43, 5, hex('#ffffff')); R.rect(106, 46, 108, 49, hex('#ffffff')); R.rect(112, 46, 114, 49, hex('#ffffff')); R.linea(113, 38, 116, 34, hex('#e8b830')); for (const [i, c] of [[0, '#e83a5a'], [1, '#f0c830'], [2, '#3ab0a8'], [3, '#3a6ac8']]) R.rect(100 + i * 2, 36 + i, 103 + i * 2, 37 + i, hex(c));
  // el marco de la foto (dentro se pinta en cada fotograma)
  R.rect(142, 46, 186, 98, K); R.rect(143, 47, 185, 97, hex('#c8a040')); R.rect(143, 47, 185, 48, hex('#f0d070')); R.rect(146, 50, 182, 94, K);
  R.poligono([[143, 47], [154, 47], [143, 58]], K); R.linea(144, 56, 152, 48, hex('#3a3046'));
  // la base de la bola de nieve
  R.poligono([[228, 99], [262, 99], [258, 90], [232, 90]], K); R.poligono([[230, 98], [260, 98], [257, 91], [233, 91]], hex('#6a3e1e')); R.rect(233, 91, 257, 92, hex('#9a6438'));
  // el jarrón
  R.poligono([[104, 98], [118, 98], [120, 84], [114, 78], [108, 78], [102, 84]], K); R.poligono([[105, 97], [117, 97], [119, 84], [113, 79], [109, 79], [103, 84]], hex('#3a8ab0')); R.rect(105, 84, 107, 94, hex('#7ac0e0'));
};
const p2 = (t) => {
  const apaga = tramo(t, P2 + 0.2, P3 - 0.2);
  fijo('repisa', fondoRepisa);
  // fuera: la ciudad de noche, que se va apagando ventana a ventana
  R.recorte([12, 18, 68, 88]); banda(12, 18, 68, 88, [hex('#141a3e'), hex('#2a2a5a'), hex('#4a3a6a')]);
  for (let k = 0; k < 6; k++) { const x0 = 10 + k * 10, top = 44 + Math.floor(hh(k, 81) * 22); rp(x0, top, x0 + 9, 88, hex('#1e1e34')); for (let y = top + 3; y < 86; y += 5) for (let x = x0 + 2; x < x0 + 8; x += 3) { const on = hh(x, y) > apaga * 1.1 && hh(x + 1, y) > 0.25; rp(x, y, x + 1, y + 1, on ? hex('#f8d890') : hex('#2a2a44')); } }
  R.disco(56, 28, 4, mez(hex('#f2eee2'), hex('#5a5a6a'), apaga)); R.recorte(null);
  R.rect(12, 52, 68, 53, hex('#5a4a3a')); R.rect(39, 18, 41, 88, hex('#5a4a3a'));
  // el fuego de la chimenea
  for (let k = 0; k < 7; k++) { const x = 140 + k * 12, f = 0.5 + 0.5 * Math.sin(t * 9 + k * 1.7), hgt = Math.round((14 + f * 14) * (1 - apaga * 0.4)); R.poligono([[x - 7, 172], [x + 7, 172], [x + Math.round(Math.sin(t * 6 + k) * 2), 172 - hgt]], hex('#e85a20')); R.poligono([[x - 4, 172], [x + 4, 172], [x + Math.round(Math.sin(t * 7 + k) * 2), 172 - hgt * 0.6]], hex('#f8b030')); R.poligono([[x - 2, 172], [x + 2, 172], [x, 172 - hgt * 0.3]], hex('#fff0a0')); }
  R.rect(132, 170, 228, 175, hex('#5a3418')); R.rect(140, 166, 220, 170, hex('#6a3e1e')); R.rect(118, 176, 242, 179, hex('#2a2020'));
  for (let k = 0; k < 4; k++) { const d = (t * 0.8 + k * 0.25) % 1, x = Math.round(150 + k * 18 + Math.sin(t * 3 + k) * 4), y = Math.round(166 - d * 40); if (y > 128) R.pset(x, y, hex('#f8b030')); }
  // la foto: Lobezno sonríe; la luz cae sobre ella en «Wolverine»
  R.recorte([147, 51, 181, 93]); banda(147, 51, 181, 93, [hex('#8ab8e8'), hex('#c8e0f8'), hex('#e8d8b8')]); rp(147, 84, 181, 93, hex('#5aa848')); R.actor(EL.lobezno, 157, 90, 4, { quieto: true, sonrisa: true, garras: false }); R.recorte(null);
  const luz = tramo(t, WOLV - 0.3, WOLV + 0.2); if (luz > 0) { for (let y = 47; y <= 97; y++) { R.pset(142 + (y % 2), y, hex('#fff0a0')); R.pset(186 - (y % 2), y, hex('#fff0a0')); } R.anillo(164, 72, 30 + Math.round(Math.sin(t * 5) * 1.5), mez(hex('#fff0a0'), hex('#4a3e58'), 0.3), 3); }
  // la vela y su halo
  const fl = Math.round(Math.sin(t * 13) * 1 + Math.sin(t * 7)); R.rect(198, 82, 206, 98, K); R.rect(199, 83, 205, 98, hex('#f2e8d0')); R.rect(199, 83, 200, 98, hex('#ffffff')); R.rect(202, 79, 202, 82, K);
  R.disco(202, 75 + fl * 0.3, 3, hex('#f8b030')); R.disco(202, 74, 2, hex('#fff0a0')); R.pset(202 + (fl > 0 ? 1 : 0), 70, hex('#fff0a0'));
  for (let j = -14; j <= 14; j += 1) for (let i = -14; i <= 14; i++) { const r = Math.hypot(i, j); if (r > 6 && r < 14 && (i + j) % 2 === 0) tine(202 + i, 75 + j, hex('#f8d890'), 0.25 * (1 - r / 14)); }
  // las flores del jarrón que se mecen
  for (const [dx, c] of [[-4, hex('#e83a5a')], [0, hex('#f0c830')], [4, hex('#e85a8a')]]) { const m = Math.round(Math.sin(t * 1.8 + dx) * 1.5), fx = 111 + dx + m; R.linea(111, 80, fx, 66 + Math.abs(dx), hex('#3a8a3a')); R.disco(fx, 65 + Math.abs(dx), 2.5, c); R.pset(fx, 65 + Math.abs(dx), hex('#fff0a0')); }
  // la bola de nieve con la Tierra 10005 que pierde el color
  R.disco(245, 78, 14, K); R.disco(245, 78, 13, hex('#2a3a6a')); const ocre = mez(hex('#d89a4a'), hex('#8a8494'), apaga), ocreS = mez(hex('#a86a2a'), hex('#5a5468'), apaga);
  R.disco(245, 80, 8, K); R.disco(245, 80, 7, ocre); for (let k = 0; k < 4; k++) { const a = t * 0.8 + k * 1.6, x = 245 + Math.cos(a) * 4, y = 80 + Math.sin(a * 0.7) * 3; if (Math.cos(a) > -0.2) R.disco(x, y, 1.6, ocreS); }
  for (let k = 0; k < 10; k++) { const x = 235 + ((hh(k, 91) * 20 + Math.sin(t + k) * 2) % 20), y = 67 + ((hh(k, 92) * 22 + t * 4) % 22); if (Math.hypot(x - 245, y - 78) < 12) R.pset(x, y, BLANCO); }
  R.pset(239, 70, hex('#ffffff')); R.pset(240, 69, hex('#ffffff')); R.pset(238, 72, hex('#c8d8f0'));
  // las palomitas cruzan la repisa con una flor, la dejan y lloran
  const pa = ruta(t, [[P2 + 0.3, 92, 98], [WOLV - 0.5, 132, 98]]), deja = t > WOLV;
  const pal = T.palomitas(R, pa.x, pa.y, t, { dir: 1, anda: pa.mv, expresion: t > MUERTO - 0.3 ? 'llora' : 'normal', servilleta: t > MUERTO + 0.3 });
  const fx = deja ? 150 : pal.mano[0] + 2, fy = deja ? 97 : pal.mano[1];
  if (deja) { R.linea(fx, fy, fx + 12, fy, hex('#3a8a3a')); R.disco(fx + 13, fy - 1, 2.5, hex('#e83a5a')); R.pset(fx + 13, fy - 1, hex('#fff0a0')); } else { R.linea(fx, fy, fx + 2, fy - 10, hex('#3a8a3a')); R.disco(fx + 2, fy - 11, 2.5, hex('#e83a5a')); R.pset(fx + 2, fy - 11, hex('#fff0a0')); }
  // todo se apaga: el mundo pierde el color
  if (apaga > 0.02) T.tinte(R, 0, 179, [96, 92, 104], apaga * 0.42);
};

// 3. la oficina del tiempo: el agente y su máquina, a espaldas de los jefes
const p3 = (t) => {
  T.tiempo(R, t, {});
  const gira = t > GOLPE + 0.25;
  R.actor(EL.mobius, 196, 162, t, { dir: gira ? -1 : 1, habla: !gira && Math.sin(t * 8) > 0, sorpresa: gira && t < GOLPE + 0.7 });
  R.actor(EL.oficinista2, 216, 162, t, { dir: -1, habla: !gira && Math.sin(t * 8 + 2) > 0, dedo: t > AGENTE && t < ESPALDAS });
  const ag = ruta(t, [[P3, 70, 164], [ESPALDAS - 0.1, 128, 164], [BORRAR - 0.6, 140, 164]]);
  const puntillas = ag.mv ? Math.round(Math.abs(Math.sin(t * 6)) * 2) : 0, apunta = t > BORRAR - 0.6 && !gira;
  const r = R.actor(EL.agenteTVA, ag.x, ag.y, t, { dir: 1, anda: ag.mv, salto: puntillas, dedo: t > ESPALDAS && t < ESPALDAS + 0.9, sostiene: apunta ? [ag.x + 22, ag.y - 22] : t > ESPALDAS + 0.9 || t < ESPALDAS ? [ag.x + 18, ag.y - 12] : undefined, habla: gira, sonrisa: gira });
  // la máquina: caja con diales y cañón con su punta que brilla
  if (r.mano && !(t > ESPALDAS && t < ESPALDAS + 0.9)) {
    const [mx, my] = r.mano, ar = apunta ? -6 : 0;
    R.rect(mx - 6, my - 4, mx + 6, my + 4, K); R.rect(mx - 5, my - 3, mx + 5, my + 3, hex('#8a6a3a')); R.rect(mx - 5, my - 3, mx + 5, my - 3, hex('#c8a060')); R.disco(mx - 2, my, 1.5, hex('#e8b830')); R.pset(mx + 2, my - 1, Math.sin(t * 10) > 0 ? hex('#e83a3a') : hex('#5a1a1a'));
    R.linea(mx + 6, my - 1, mx + 16, my - 1 + ar, K); R.linea(mx + 6, my, mx + 16, my + ar, hex('#5a5e70')); R.linea(mx + 6, my + 1, mx + 16, my + 1 + ar, K);
    const tip = [mx + 17, my + ar]; R.disco(tip[0], tip[1], 2 + (apunta ? Math.round(Math.abs(Math.sin(t * 12))) : 0), apunta ? hex('#f8b030') : hex('#8a5a2a'));
    // la Tierra 10005 proyectada con la mira roja
    const pr = tramo(t, BORRAR, BORRAR + 0.3);
    if (pr > 0 && !gira) { const hx = 186, hy = 118; for (let k = 0; k < 7; k++) R.linea(tip[0], tip[1], hx - 15 + k * 5, hy + 15, (x, y, i) => ((i + Math.floor(t * 12)) % 3 ? (k % 2 ? hex('#f8d890') : hex('#f0b040')) : null)); R.disco(hx, hy, 16 * pr, K); R.disco(hx, hy, 15 * pr, hex('#d89a4a')); R.disco(hx - 4, hy - 4, 5 * pr, hex('#a86a2a')); R.disco(hx + 6, hy + 3, 4 * pr, hex('#a86a2a')); R.disco(hx - 6, hy - 7, 2 * pr, hex('#f8d890'));
      if (pr >= 1) { R.rect(hx - 23, hy - 32, hx + 23, hy - 22, K); R.numero('10005', hx, hy - 23, { centro: true, color: hex('#f8d890') }); const fija = t > GOLPE - 0.2, c = fija && Math.floor(t * 8) % 2 ? hex('#ffffff') : hex('#e83a3a'), rr = fija ? 18 : 18 + Math.round(Math.sin(t * 6) * 3); R.anillo(hx, hy, rr, c); R.linea(hx - rr - 4, hy, hx - rr + 3, hy, c); R.linea(hx + rr - 3, hy, hx + rr + 4, hy, c); R.linea(hx, hy - rr - 4, hx, hy - rr + 3, c); R.linea(hx, hy + rr - 3, hx, hy + rr + 4, c); } }
  }
  if (gira) { for (let k = 0; k < 3; k++) { const d = (t * 1.5 + k / 3) % 1; R.pset(ag.x + 12 + Math.round(d * 8), ag.y - 18 - Math.round(d * 10 + Math.sin(d * 9) * 2), hex('#e8e4dc')); } }
  T.tiempoDelante(R, t, {});
};

// 4. el pasillo de las realidades: tres portales y tres Lobeznos
const PORT = [[66, 108], [160, 108], [254, 108]];
const fondoPasillo = () => {
  banda(0, 0, 319, 150, [hex('#120c2a'), hex('#22164a'), hex('#3a2470'), hex('#5a3a8a')]);
  for (let k = 0; k < 160; k++) { const x = Math.floor(hh(k, 101) * 320), y = Math.floor(hh(k, 102) * 140); if (!(x > 270 && y < 48) && !(x > 18 && x < 172 && y < 16)) R.pset(x, y, hh(k, 103) > 0.7 ? hex('#ffffff') : hex('#8a7ab8')); }
  for (let k = 0; k < 7; k++) { const y0 = 40 + k * 14; for (let x = 0; x < 320; x++) { const y = Math.round(y0 + Math.sin(x / 30 + k) * 6); if ((x + k * 7) % 5 < 3) R.pset(x, y, hex('#4a3080')); } }
  // la plataforma de roca que flota
  R.poligono([[0, 150], [320, 146], [320, 180], [0, 180]], K); R.poligono([[0, 152], [320, 148], [320, 180], [0, 180]], hex('#5a4a6a'));
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const v = hh(x >> 1, y >> 1); if (v < 0.18) R.pset(x, y, hex('#4a3a5a')); else if (v > 0.9) R.pset(x, y, hex('#7a6a8a')); }
  R.rect(0, 152, 319, 153, hex('#8a7aa8')); for (let k = 0; k < 12; k++) { const x = 10 + k * 27; R.linea(x, 156 + (k % 3) * 6, x + 10, 160 + (k % 3) * 6, hex('#3a2a4a')); }
  for (let k = 0; k < 14; k++) { const x = 8 + k * 23; R.disco(x, 166 + (k % 2) * 6, 1, hex('#b07ae8')); }
};
const mundo = (k, cx, cy, t) => {
  const x0 = cx - 26, x1 = cx + 26, y0 = cy - 36, y1 = cy + 36; R.recorte([x0, y0, x1, y1]);
  if (k === 0) { banda(x0, y0, x1, y1, [hex('#8aa8c8'), hex('#c8d8e8'), hex('#f2f6fa')]); for (let i = 0; i < 4; i++) { const px = x0 + 6 + i * 14; R.poligono([[px, cy + 10], [px + 6, cy - 14], [px + 12, cy + 10]], hex('#2a5a4a')); R.poligono([[px + 4, cy - 6], [px + 6, cy - 14], [px + 8, cy - 6]], BLANCO); } R.disco(cx, y1 + 14, 40, hex('#f2f6fa')); for (let i = 0; i < 16; i++) R.pset(x0 + ((hh(i, 111) * 52 + Math.sin(t + i) * 3) % 52), y0 + ((hh(i, 112) * 72 + t * 10) % 72), BLANCO); }
  if (k === 1) { banda(x0, y0, x1, y1, [hex('#e8784a'), hex('#f0a860'), hex('#f8d890')]); R.disco(cx + 8, cy - 14, 7, hex('#fff0a0')); R.poligono([[x0, cy + 4], [x0 + 18, cy - 12], [x0 + 22, cy + 4]], hex('#a84a2a')); R.poligono([[x1 - 20, cy + 4], [x1 - 8, cy - 18], [x1, cy + 4]], hex('#c85a32')); R.disco(cx, y1 + 20, 44, hex('#d89a5a')); R.rect(cx + 14, cy - 4, cx + 15, cy + 10, hex('#3a8a3a')); R.rect(cx + 12, cy, cx + 13, cy + 2, hex('#3a8a3a')); }
  if (k === 2) { banda(x0, y0, x1, y1, [hex('#0e1430'), hex('#1e2650'), hex('#3a3a6a')]); for (let i = 0; i < 4; i++) { const bx = x0 + i * 14; rp(bx, cy - 22 + (i % 2) * 8, bx + 11, y1, hex('#2a2a44')); for (let y = cy - 18 + (i % 2) * 8; y < y1; y += 5) rp(bx + 3, y, bx + 4, y + 1, hh(bx, y) > 0.4 ? hex('#f8d890') : hex('#3a3a5a')); } for (let i = 0; i < 18; i++) { const x = x0 + (hh(i, 121) * 52) % 52, y = y0 + ((hh(i, 122) * 72 + t * 60) % 72); R.linea(x, y, x - 1, y + 3, hex('#8ab0d8')); } rp(x0, cy + 22, x1, y1, hex('#3a3a52')); }
  R.recorte(null);
  const fb = cache.get('pasillo'); if (fb) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (((x - cx) / 26) ** 2 + ((y - cy) / 36) ** 2 > 1) R.pset(x, y, fb[y * 320 + x]);
};
const borde = (cx, cy, t, u) => { for (let k = 0; k < 64; k++) { const a = k / 64 * 6.283 + t * (k % 2 ? 2 : -1.5), rx = 26 + Math.sin(t * 6 + k) * 1.5, ry = 36 + Math.cos(t * 5 + k) * 1.5, x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry; R.pset(x, y, k % 3 ? hex('#f8b030') : hex('#fff0a0')); R.pset(x + 1, y, hex('#e85a20')); if (k % 8 === 0 && u > 0) R.pset(x + Math.cos(a) * 4, y + Math.sin(a) * 4, hex('#fff6c8')); } };
const VARIANTE = [{ C: '#a8743c', c: '#6a4220', W: '#a8743c', F: '#a8743c', G: '#6a4220', n: '#6a4220', I: '#3a2a1a' }, { C: '#2a3a8a', c: '#f0c830', W: '#2a3a8a', F: '#2a3a8a', G: '#f0c830', n: '#f0c830', I: '#c8303a' }, null].map((p) => p && Object.fromEntries(Object.entries(p).map(([k, v]) => [k, hex(v)])));
const p4 = (t) => {
  fijo('pasillo', fondoPasillo);
  for (let k = 0; k < 8; k++) { const x = ((hh(k, 131) * 360 + t * (6 + k * 2)) % 360) - 20, y = 30 + hh(k, 132) * 100; R.rect(Math.round(x), Math.round(y), Math.round(x) + 2, Math.round(y) + 2, hex('#6a5a9a')); R.pset(Math.round(x), Math.round(y), hex('#b8a8e8')); }
  const llegan = [OTRAS - 0.4, OTRAS + 0.75, REPUESTO];
  PORT.forEach(([cx, cy], k) => {
    mundo(k, cx, cy, t); borde(cx, cy, t, 1);
    if (k < 2) { const no = t > llegan[k] + 0.35; R.recorte([cx - 25, cy - 35, cx + 25, cy + 35]); R.actor(EL.lobezno, cx - 7, cy + 30, t, { dir: -1, pal: VARIANTE[k], enfado: no, garras: false, habla: no && Math.sin(t * 10) > 0 }); R.recorte(null); if (no && t < llegan[k] + 1.2) R.bocadillo(cx + 2, cy - 2, { icono: 'X' }); }
  });
  // el tercer Lobezno: saca las garras y sale del portal
  const lo = ruta(t, [[0, 247, 138], [DOS - 0.5, 247, 138], [DOS, 236, 166], [P5, 236, 166]]), fuera = t > DOS - 0.5;
  if (!fuera) { R.recorte([229, 73, 279, 143]); R.actor(EL.lobezno, lo.x, lo.y, t, { dir: -1, garras: t > LOBO, enfado: true, sorpresa: t > REPUESTO + 0.1 && t < LOBO }); R.recorte(null); }
  else R.actor(EL.lobezno, lo.x, lo.y, t, { dir: t > DOS + 0.3 ? 1 : -1, garras: true, enfado: true, salto: lo.mv ? 4 : 0 });
  if (t > LOBO && t < LOBO + 0.35) { const d = t - LOBO, r = Math.round(2 + d * 14); R.linea(247 - r, 116, 247 + r, 116, hex('#ffffff')); R.linea(247, 116 - r, 247, 116 + r, hex('#ffffff')); }
  // Deadpool salta de portal en portal
  const sx = [[SALTA - 0.35, -20], [SALTA, 46], [OTRAS + 0.45, 46], [OTRAS + 0.75, 140], [REPUESTO - 0.3, 140], [REPUESTO, 214], [DOS + 0.2, 214], [P5, 330]];
  let dx = sx[0][1], dy = 166, enAire = false;
  for (let i = 0; i < sx.length - 1; i++) { const [t0, x0] = sx[i], [t1, x1] = sx[i + 1]; if (t >= t0 && t < t1) { const u = (t - t0) / (t1 - t0); dx = Math.round(lerp(x0, x1, u)); if (x1 !== x0) { dy = 166 - Math.round(Math.sin(u * Math.PI) * (i === sx.length - 2 ? 10 : 34)); enAire = true; } } else if (t >= t1) dx = x1; }
  R.actor(EL.deadpool, dx, dy, t, { dir: 1, brazos: enAire && t < DOS, dedo: t > LOBO && t < DOS, anda: enAire && t > DOS, salto: 0 });
  if (t > LOBO + 0.05 && t < LOBO + 0.9) R.bocadillo(dx + 8, dy - 30, {});
};

// 5. el Vacío: caen rodando del portal
const p5 = (t) => {
  const pu = tramo(t, P5 - 0.2, VOID) - tramo(t, VERTE + 0.4, VERTE + 1.0);
  T.vacio(R, t, { portal: pu });
  const cae = (t0, x1, s) => { const d = t - t0; if (d < 0) return null; if (d < 0.55) { const u = d / 0.55; return { x: Math.round(lerp(143, x1, u)), y: Math.round(lerp(150, 160, u) - Math.sin(u * Math.PI) * 18), dir: Math.floor(d * 14) % 2 ? 1 : -1, aire: true }; } const b = d < 0.85 ? Math.round(Math.sin((d - 0.55) / 0.3 * Math.PI) * 4) : 0; return { x: x1, y: 160 - b, dir: s, aire: false }; };
  const lo = cae(VOID + 0.18, 176, -1), dp = cae(VOID, 112, 1);
  if (lo) R.actor(EL.lobezno, lo.x, lo.y, t, { dir: lo.aire ? lo.dir : t > RESTOS ? 1 : -1, enfado: !lo.aire, garras: false, brazos: t > BORRADOS && t < BORRADOS + 0.8 });
  if (dp) R.actor(EL.deadpool, dp.x, dp.y, t, { dir: dp.aire ? dp.dir : t > VERTE && t < RESTOS ? (Math.floor(t * 1.5) % 2 ? 1 : -1) : t > RESTOS ? -1 : 1, dedo: t > RESTOS && t < BORRADOS + 0.6, brazos: dp.aire });
  polvo(119, 160, t, VOID + 0.55); polvo(183, 160, t, VOID + 0.73);
  if (t > VERTE && t < VERTE + 0.9) R.bocadillo(184, 128, { icono: '?' });
};
const efectos = [[NUM, 'brillo'], [NUM + 0.2, 'boing'], [WOLV, 'brillo'], [ESPALDAS + 0.1, 'golpecito'], [BORRAR, 'zumbido'], [GOLPE - 0.2, 'aviso'],
  [SALTA - 0.1, 'whoosh'], [OTRAS + 0.75, 'whoosh'], [LOBO, 'brillo'], [REPUESTO, 'whoosh'], [P5, 'whoosh'], [VOID + 0.55, 'chof'], [RESTOS, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2024 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['do-vacio'] = ('Gambito y la Antorcha', '''// DO-VACIO (frases 39–40), sin cartela; año 2024. Cuatro planos:
// 1. el Vacío, al pie de la cabeza gigante: Deadpool y Lobezno; en «show up» Gambito salta sobre el coche volcado con
//    sus cartas rosas; sale de detrás del coche un perrito con capa que le ladra a Deadpool (gag 5) y Deadpool da un
//    respingo (corta en «Like Gambit»);
// 2. la mesa de cartas sobre un bidón (fondo local): la mano de Gambito abre las cartas, que brillan rosa en «Gambit»;
//    lanza una que gira y cae en el centro; en «cast of Doomsday» la carta se da la vuelta y es la máscara de Doom, que
//    brilla verde (corta en «And like»);
// 3. la fortaleza de restos: la Antorcha llega volando con su estela en «Human Torch», se posa en el arco y en
//    «Fantastic Four» lanza cuatro bolas de fuego que estallan una tras otra y las palomitas las cuentan con la manita
//    (1, 2, 3, 4); abajo, Deadpool aplaude, Gambito y Lobezno miran (corta en «The same actor»);
// 4. la pared de chapa (fondo local): la Antorcha junto al bidón de fuego; su sombra en la pared se convierte en
//    «Captain America» en la de un héroe con escudo y casco de alas; se mira la sombra, Deadpool la señala y en «joke»
//    las palomitas y Deadpool se parten de risa; Lobezno niega con la cabeza.''', H + r'''
const a = (f) => en('gambito', f), b = (f) => en('antorcha', f);
const P2 = a(0.502), P3 = b(0), P4 = b(0.573);
const APARECEN = a(0.215), NUNCA = a(0.31), GAMBIT = a(0.515), TATUM = a(0.706), TAMBIEN = a(0.826), DOOMS = a(0.921);
const TORCH = b(0.042), CUATRO = b(0.24), EVANS = b(0.449), CAPI = b(0.662), BROMA = b(0.827), NUNCAV = b(0.941);

// 1. al pie de la cabeza: Gambito y el perrito
const p1 = (t) => {
  T.vacio(R, t, { camara: 'restos', relampagos: true });
  const g = t < APARECEN - 0.35 ? null : t < APARECEN ? { x: Math.round(lerp(60, 44, tramo(t, APARECEN - 0.35, APARECEN))), y: Math.round(124 - Math.sin(tramo(t, APARECEN - 0.35, APARECEN) * Math.PI) * 20 + (1 - tramo(t, APARECEN - 0.35, APARECEN)) * 30) } : { x: 44, y: 124 };
  if (g) { R.actor(EL.gambito, g.x, g.y, t, { dir: 1, sonrisa: true, dedo: t > NUNCA + 0.4 && t < NUNCA + 1.2 }); if (t > APARECEN + 0.1) for (let k = 0; k < 3; k++) { const a2 = t * 4 + k * 2.1; R.rect(g.x + 8 + Math.round(Math.cos(a2) * 10), g.y - 16 + Math.round(Math.sin(a2) * 4), g.x + 9 + Math.round(Math.cos(a2) * 10), g.y - 14 + Math.round(Math.sin(a2) * 4), Math.sin(t * 9 + k) > 0 ? hex('#ff8ad8') : hex('#e84aa8')); } }
  const LADRA = NUNCA + 0.25;
  const pe = ruta(t, [[NUNCA - 0.5, 92, 166], [LADRA, 116, 166], [P2 - 0.5, 116, 166], [P2, 126, 166]]);
  const asusta = t > LADRA + 0.15 && t < LADRA + 1.3;
  const dx = asusta ? Math.round(lerp(140, 158, tramo(t, LADRA + 0.15, LADRA + 0.45))) : t > LADRA + 1.3 ? 158 : 140;
  const sd = t > LADRA + 0.15 && t < LADRA + 0.55 ? Math.round(Math.sin((t - LADRA - 0.15) / 0.4 * Math.PI) * 10) : 0;
  R.actor(EL.lobezno, 176, 164, t, { dir: -1, sonrisa: t > LADRA + 0.4, garras: false, sorpresa: t > APARECEN && t < APARECEN + 0.6 });
  R.actor(EL.deadpool, dx, 164, t, { dir: -1, sorpresa: asusta, salto: sd, brazos: sd > 0, dedo: t < APARECEN + 1.2 && t > APARECEN + 0.2 });
  if (t > NUNCA - 0.5) perrito(pe.x, pe.y, t, { dir: 1, anda: pe.mv, ladra: t > LADRA && t < P2 - 0.6 });
  if (t > LADRA + 0.1 && t < LADRA + 1.0) R.bocadillo(dx + 8, 134, {});
  if (t > LADRA && t < P2 - 0.6 && Math.floor(t * 7) % 2) R.bocadillo(pe.x + 16, 146, {});
};

// 2. la mesa de cartas sobre el bidón
const fondoBidon = () => {
  banda(0, 0, 319, 74, [hex('#2a1e30'), hex('#5a2e3a'), hex('#a8503a'), hex('#e08a4a')]);
  // los restos lejanos en la bruma: la noria, la cúpula, el rascacielos torcido
  const bru = hex('#9a5a5a'); R.anillo(60, 52, 22, bru); R.anillo(60, 52, 21, bru); for (let k = 0; k < 8; k++) { const a = k * 0.785; R.linea(60, 52, 60 + Math.cos(a) * 21, 52 + Math.sin(a) * 21, bru); } R.rect(30, 66, 90, 76, hex('#c87a4a'));
  R.disco(150, 76, 20, bru); R.rect(128, 76, 172, 80, hex('#c87a4a')); for (let k = 0; k < 5; k++) R.linea(132 + k * 9, 62 + Math.abs(k - 2) * 3, 132 + k * 9, 76, hex('#7a4a4a'));
  R.poligono([[236, 76], [250, 22], [264, 26], [256, 76]], bru); for (let y = 30; y < 74; y += 5) R.linea(252, y, 260, y + 1, hex('#7a4a4a'));
  // la arena con sus ondas
  for (let y = 74; y < 180; y++) for (let x = 0; x < 320; x++) { const o = Math.sin(x / 9 + y / 3 + Math.sin(x / 31) * 2); R.pset(x, y, o > 0.7 ? hex('#e8a06a') : o < -0.8 ? hex('#a8603a') : y < 90 ? hex('#d08a58') : hex('#c87a4a')); }
  for (let k = 0; k < 6; k++) { const x = 10 + k * 56, y = 92 + (k % 3) * 8; R.rect(x, y, x + 6, y + 3, hex('#5a4a4a')); R.rect(x, y, x + 6, y, hex('#8a7a70')); }
  // el bidón: tapa vista desde arriba, cuerpo con aros y óxido
  const cx = 160, cy = 124, rx = 118, ry = 36;
  R.rect(cx - rx, cy, cx + rx, 179, K); R.rect(cx - rx + 1, cy, cx + rx - 1, 179, hex('#3a5a6a'));
  for (let x = cx - rx + 1; x < cx + rx; x++) { const u = (x - cx) / rx; for (let y = cy; y < 180; y++) { const v = hh(x >> 1, y >> 1); R.pset(x, y, u < -0.6 ? hex('#5a7a8a') : u > 0.55 ? hex('#24384a') : v < 0.08 ? hex('#a8603a') : v > 0.94 ? hex('#7a4a2a') : hex('#3a5a6a')); } }
  for (const y of [166, 172]) for (let x = cx - rx; x <= cx + rx; x++) { const e = Math.round(Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2)) * 6); R.pset(x, y + e, K); R.pset(x, y + e - 1, hex('#6a8a9a')); }
  for (let x = cx - rx; x <= cx + rx; x++) { const e = Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2)) * ry; for (let y = Math.round(cy - e); y <= Math.round(cy + e); y++) R.pset(x, y, hex('#4a6a7a')); R.pset(x, Math.round(cy - e), K); R.pset(x, Math.round(cy + e), K); R.pset(x, Math.round(cy + e) - 1, hex('#2a4050')); R.pset(x, Math.round(cy - e) + 1, hex('#8aa8b8')); }
  for (let x = cx - rx + 10; x <= cx + rx - 10; x++) { const e = Math.sqrt(Math.max(0, 1 - ((x - cx) / (rx - 10)) ** 2)) * (ry - 6); R.pset(x, Math.round(cy - e), hex('#3a5a6a')); R.pset(x, Math.round(cy + e), hex('#6a8a9a')); }
  for (let k = 0; k < 220; k++) { const x = cx - 100 + hh(k, 141) * 200, y = cy - 24 + hh(k, 142) * 48; if (((x - cx) / 104) ** 2 + ((y - cy) / 30) ** 2 < 1) R.pset(x, y, hh(k, 143) > 0.5 ? hex('#a8603a') : hex('#5a7a8a')); }
  for (let k = 0; k < 14; k++) { const a = k / 14 * 6.283, x = cx + Math.cos(a) * (rx - 5), y = cy + Math.sin(a) * (ry - 3); R.pset(x, y, hex('#c8d8e0')); R.pset(x + 1, y + 1, K); }
  // manchas de óxido, abolladuras, el tapón, un charco de aceite y otro aro
  const elip = (ex, ey, rx2, ry2, c) => { for (let y = Math.round(ey - ry2); y <= Math.round(ey + ry2); y++) for (let x = Math.round(ex - rx2); x <= Math.round(ex + rx2); x++) { const q = ((x - ex) / rx2) ** 2 + ((y - ey) / ry2) ** 2 + (hh(x, y) - 0.5) * 0.35; if (q < 1) R.pset(x, y, typeof c === 'function' ? c(q) : c); } };
  for (const [ex, ey, r2] of [[120, 104, 14], [196, 140, 18], [64, 136, 10], [250, 132, 9], [150, 146, 8]]) elip(ex, ey, r2, r2 * 0.32, (q) => (q > 0.7 ? hex('#7a4a2a') : q > 0.35 ? hex('#a8603a') : hex('#c87a4a')));
  for (let x = cx - rx + 22; x <= cx + rx - 22; x++) { const e = Math.sqrt(Math.max(0, 1 - ((x - cx) / (rx - 22)) ** 2)) * (ry - 11); R.pset(x, Math.round(cy - e), hex('#33505e')); R.pset(x, Math.round(cy - e) + 1, hex('#6a8a9a')); }
  elip(230, 150, 16, 4, (q) => (q > 0.6 ? hex('#1a2028') : hex('#2a3038'))); for (const [i, c] of [[-6, '#b07ae8'], [-3, '#3ab0a8'], [0, '#f0c830'], [3, '#e85a8a']]) R.rect(230 + i, 149, 231 + i, 149, hex(c));
  for (const [ax, ay] of [[90, 118], [176, 100], [140, 150]]) { R.linea(ax - 4, ay, ax + 4, ay, hex('#2a4050')); R.linea(ax - 3, ay + 1, ax + 3, ay + 1, hex('#8aa8b8')); }
  R.disco(204, 108, 5, K); R.disco(204, 108, 4, hex('#8aa8b8')); R.disco(204, 108, 2, hex('#4a6a7a')); R.pset(203, 106, hex('#ffffff'));
  // monedas, dos dados, un reloj de bolsillo y una chapa
  for (const [mx, my] of [[124, 132], [130, 135], [118, 138], [182, 152], [268, 116]]) { R.rect(mx - 2, my - 1, mx + 2, my + 1, K); R.rect(mx - 1, my - 1, mx + 1, my, hex('#f0c830')); R.pset(mx - 1, my - 1, hex('#fff0a0')); }
  for (const [dx2, dy2, n] of [[56, 112, 5], [68, 116, 3]]) { R.rect(dx2 - 4, dy2 - 4, dx2 + 4, dy2 + 4, K); R.rect(dx2 - 3, dy2 - 3, dx2 + 3, dy2 + 3, BLANCO); R.rect(dx2 - 3, dy2 + 3, dx2 + 3, dy2 + 3, hex('#c8c4bc')); for (const [i, j] of (n === 5 ? [[-2, -2], [2, -2], [0, 0], [-2, 2], [2, 2]] : [[-2, -2], [0, 0], [2, 2]])) R.pset(dx2 + i, dy2 + j, K); }
  R.disco(272, 140, 7, K); R.disco(272, 140, 6, hex('#e8b830')); R.disco(272, 140, 4, BLANCO); R.linea(272, 140, 272, 137, K); R.linea(272, 140, 274, 141, K); R.rect(271, 132, 273, 133, hex('#e8b830')); for (let k = 0; k < 8; k++) R.pset(274 + k * 2, 132 - Math.round(Math.sin(k) * 2), hex('#c8a040'));
  R.disco(150, 104, 3, K); R.disco(150, 104, 2, hex('#c8303a')); R.pset(149, 103, hex('#f05a5a'));
  // sobre la tapa: fichas, un farol oxidado, una lata y el mazo de cartas
  for (let k = 0; k < 4; k++) { const x = 78, y = 124 - k * 3; R.rect(x - 8, y - 2, x + 8, y + 2, K); R.rect(x - 7, y - 1, x + 7, y + 1, [hex('#c8303a'), hex('#2a4fa8'), hex('#f2eee2'), hex('#c8303a')][k]); }
  R.rect(236, 100, 252, 126, K); R.rect(237, 101, 251, 125, hex('#6a4a2a')); R.rect(239, 104, 249, 120, hex('#f8d890')); R.rect(236, 96, 252, 100, K); R.rect(242, 92, 246, 96, K);
  R.rect(212, 132, 222, 146, K); R.rect(213, 133, 221, 145, hex('#c8c4bc')); R.rect(213, 137, 221, 141, hex('#c8303a')); R.rect(213, 133, 214, 145, hex('#ffffff'));
  R.rect(100, 136, 120, 148, K); R.rect(101, 137, 119, 147, hex('#8a1e28')); R.rect(103, 139, 117, 145, hex('#c8303a'));
};
const carta = (cx, cy, w, h, cara, t) => { // w puede ser negativo (vuelta): cara = 'dorso' | 'mascara'
  const W = Math.max(1, Math.abs(Math.round(w))); R.rect(cx - W - 1, cy - h - 1, cx + W + 1, cy + h + 1, K); R.rect(cx - W, cy - h, cx + W, cy + h, cara === 'dorso' ? hex('#8a1e28') : BLANCO);
  if (cara === 'dorso') { for (let y = cy - h + 2; y < cy + h - 1; y += 3) for (let x = cx - W + 2; x < cx + W - 1; x += 3) R.pset(x, y, hex('#c8303a')); R.rect(cx - W + 1, cy - h + 1, cx + W - 1, cy - h + 1, hex('#e85a5a')); }
  else if (W > 6) { T.e_mascara(R, cx, cy, 3, { ojos: 0.6 + 0.4 * Math.sin(t * 6), brillo: (t * 0.6) % 1 }); for (const [x, y] of [[cx - W + 3, cy - h + 3], [cx + W - 3, cy + h - 3]]) { R.pset(x, y, hex('#2e7a3e')); R.pset(x + 1, y, hex('#2e7a3e')); R.pset(x, y + 1, hex('#2e7a3e')); } }
};
const brilloRosa = (cx, cy, r, t, f) => { for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283 + t * 3, rr = r + Math.sin(t * 12 + k) * 2; if ((k + Math.floor(t * 10)) % 3) R.pset(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.8, f > 0.5 ? hex('#ffd0f0') : hex('#ff8ad8')); } };
const p2 = (t) => {
  fijo('bidon', fondoBidon);
  R.recorte([0, 0, 319, 70]); nubes(t, [[22, 30, 2.0, 3, [hex('#3a2230'), hex('#6a3a40'), hex('#8a4a48')], 11], [44, 22, 4.5, 3, [hex('#7a3a3a'), hex('#a8504a'), hex('#c87a5a')], 13]]); R.recorte(null);
  pajaros(t, 48, 2, 10, 5, 100, 260);
  // el farol que parpadea
  if (Math.sin(t * 17) > 0.2) for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { const r = Math.hypot(i, j); if (r > 8 && r < 14 && (i + j) % 2 === 0) tine(244 + i, 112 + j, hex('#f8d890'), 0.25); }
  // el brazo de Gambito (manga de gabardina) con el abanico de cartas
  const lanza = tramo(t, TATUM - 0.5, TATUM - 0.25), wx = Math.round(46 + Math.sin(lanza * Math.PI) * 10), wy = Math.round(110 - Math.sin(lanza * Math.PI) * 6);
  T.brazo(R, -6, 132, wx, wy, '#8a5a2a', 1, { codo: [18, 128] });
  const brillan = t > GAMBIT, f = Math.sin(t * 10) > 0 ? 1 : 0, quedan = t > TATUM - 0.3 ? 2 : 3;
  for (let k = 0; k < quedan; k++) { const x = wx + 8 + k * 8, y = wy - 14 + Math.abs(k - 1) * 2; R.rect(x - 6, y - 10, x + 6, y + 8, K); R.rect(x - 5, y - 9, x + 5, y + 7, brillan ? (f ? hex('#ff8ad8') : hex('#e84aa8')) : hex('#8a1e28')); R.rect(x - 4, y - 8, x + 4, y + 6, brillan ? hex('#ffd0f0') : hex('#c8303a')); for (let j = -6; j < 6; j += 3) for (let i = -3; i < 4; i += 3) R.pset(x + i, y + j, brillan ? hex('#ff8ad8') : hex('#8a1e28')); }
  T.mano(R, wx + 2, wy, 1, '#8a5a2a', { sinManga: true });
  if (brillan) brilloRosa(wx + 16, wy - 14, 18, t, f);
  // la carta lanzada: vuela girando y cae en el centro; luego se da la vuelta
  const vu = tramo(t, TATUM - 0.25, TATUM + 0.35);
  if (vu > 0) {
    const cx = Math.round(lerp(wx + 16, 168, vu)), cy = Math.round(lerp(wy - 10, 116, vu) - Math.sin(vu * Math.PI) * 26);
    if (vu < 1) { const g = Math.cos(t * 30); carta(cx, cy, 7 * g, 10, 'dorso', t); brilloRosa(cx, cy, 10, t, f); }
    else { const gi = tramo(t, TAMBIEN, DOOMS), w = 16 * Math.cos(gi * Math.PI), cara = gi < 0.5 ? 'dorso' : 'mascara';
      R.rect(150, 139, 188, 141, hex('#2a4050')); carta(168, 112, w, 26, cara, t); if (gi < 1) brilloRosa(168, 112, 28, t, f);
      if (gi >= 1) { const d = t - DOOMS; if (d < 0.6) { R.anillo(168, 112, 30 + d * 30, hex('#7ae86a'), 2); } for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283 + t, r = 30 + Math.sin(t * 5 + k) * 3; R.pset(168 + Math.cos(a) * r, 112 + Math.sin(a) * r * 0.75, k % 2 ? hex('#7ae86a') : hex('#2e7a3e')); } } }
  }
  chispas(168, 116, t, TATUM + 0.35, 12, [hex('#ff8ad8'), hex('#ffd0f0'), hex('#ffffff')], 36, 0.6, 20);
};

// 3. la fortaleza: la Antorcha llega y lanza cuatro fuegos
const p3 = (t) => {
  T.vacio(R, t, { camara: 'fortaleza' });
  // cuatro bolas de fuego, una tras otra, estallan en el cielo como cuatro fuegos artificiales (uno, dos, tres, cuatro)
  const FUEGOS = [[184, 34], [208, 24], [232, 34], [256, 24]], fade = 1 - tramo(t, P4 - 0.8, P4);
  FUEGOS.forEach(([fx, fy], k) => { const t0 = CUATRO - 0.15 + k * 0.2, d = t - t0; if (d < 0) return; const u = Math.min(1, d / 0.22);
    if (u < 1) { const x = lerp(166, fx, u), y = lerp(52, fy, u); R.disco(x, y, 2.5, hex('#f8b030')); R.disco(x, y, 1.5, hex('#fff0a0')); R.pset(x - 2, y + 2, hex('#e85a20')); return; }
    const e = d - 0.22; if (e < 1.2) chispas(fx, fy, t, t0 + 0.22, 22, [hex('#fff0a0'), hex('#f8b030'), hex('#e85a20'), hex('#ffffff')], 34, 1.2, 14);
    if (fade > 0) { const r = 3 + Math.round(Math.min(1, e * 3) * 3); R.anillo(fx, fy, r, e < 2 ? hex('#f8b030') : hex('#a84a2a')); R.disco(fx, fy, 1.5, hex('#fff0a0')); } });
  // la Antorcha: vuela desde la derecha con su estela y se posa en el arco
  const escribe = t > CUATRO - 0.2 && t < CUATRO + 0.7, vu = tramo(t, P3, TORCH + 0.7), ax = Math.round(lerp(330, 152, vu)), ay = Math.round(lerp(96, 69, vu) - Math.sin(vu * Math.PI) * 10);
  for (let k = 1; k < 10 && vu < 1; k++) { const u = Math.max(0, vu - k * 0.025), x = lerp(330, 152, u) + 7, y = lerp(96, 69, u) - Math.sin(u * Math.PI) * 10 - 14; R.disco(x + 4, y, Math.max(1, 4 - k * 0.35), k < 3 ? hex('#fff0a0') : k < 6 ? hex('#f8b030') : hex('#e85a20')); }
  R.actor(EL.antorcha, ax, ay, t, { dir: vu < 1 ? -1 : 1, brazos: vu < 1 || (t > EVANS && t < EVANS + 0.8), dedo: escribe, sonrisa: true });
  // las palomitas, abajo a la derecha, cuentan los fuegos con la manita
  const nf = FUEGOS.filter((_, k) => t > CUATRO + 0.07 + k * 0.2).length;
  T.palomitas(R, 252, 176, t, { dir: -1, expresion: nf >= 4 ? 'emocion' : nf > 0 ? 'normal' : 'susto', cuenta: nf > 0 ? nf : undefined, salta: nf >= 4 && t < EVANS + 0.6 ? 0.6 : 0 });
  // abajo, los tres miran
  const ve = t > TORCH - 0.2;
  R.actor(EL.deadpool, 74, 172, t, { dir: 1, brazos: t > CUATRO + 0.6 && t < CUATRO + 1.6, salto: t > CUATRO + 0.6 && t < CUATRO + 1.6 ? Math.round(Math.abs(Math.sin(t * 9)) * 3) : 0, sorpresa: ve && t < CUATRO, dedo: t > EVANS + 0.3 });
  R.actor(EL.gambito, 132, 172, t, { dir: 1, sonrisa: t > CUATRO + 0.6 });
  R.actor(EL.lobezno, 186, 172, t, { dir: -1, enfado: true, sorpresa: t > CUATRO && t < CUATRO + 0.8, garras: false });
};

// 4. la pared de chapa y la sombra con escudo
const CONT = [[0, 112, '#a84a32', '#8a3a26', '#c86a4a'], [112, 228, '#2e5a8a', '#1e4270', '#4a7ab0'], [228, 320, '#3a7a4a', '#2a5a36', '#5a9a62']];
const fondoChapa = () => {
  banda(0, 0, 319, 36, [hex('#2a1e30'), hex('#5a2e3a'), hex('#8a4a48')]);
  for (const [x0, x1, c, cs, cl] of CONT.map(([a2, b2, c, d, e]) => [a2, b2, hex(c), hex(d), hex(e)])) {
    const top = x0 === 228 ? 40 : x0 === 0 ? 30 : 34;
    R.rect(x0, top - 2, x1 - 1, 146, K); for (let x = x0 + 1; x < x1 - 1; x++) { const m = (x - x0) % 6, col = m < 2 ? cl : m < 4 ? c : cs; R.rect(x, top, x, 146, col); }
    R.rect(x0, top, x1 - 1, top + 2, cs); R.rect(x0, 142, x1 - 1, 146, cs); for (let x = x0 + 4; x < x1; x += 12) { R.pset(x, top + 1, hex('#c8c4bc')); R.pset(x, 144, hex('#c8c4bc')); }
    for (let k = 0; k < 40; k++) { const x = x0 + Math.floor(hh(k, x0 + 1) * (x1 - x0)), y = top + 4 + Math.floor(hh(k, x0 + 2) * 100), L = 3 + Math.floor(hh(k, x0 + 3) * 14); R.rect(x, y, x, y + L, hex('#8a4a2a')); R.pset(x + 1, y + L, hex('#a8603a')); }
    for (let k = 0; k < 3; k++) { const y = top + 18 + k * 9; R.rect(x0 + 10, y, x0 + 10 + 20 + k * 8, y + 3, mez(c, BLANCO, 0.55)); }
    R.rect(x1 - 2, top, x1 - 1, 146, K);
  }
  // las barras de cierre de la puerta del contenedor rojo, con sus manillas; las rejillas del verde
  for (const x of [22, 38, 74, 90]) { R.rect(x, 36, x + 2, 140, K); R.rect(x + 1, 36, x + 1, 140, hex('#c8c4bc')); for (const y of [44, 132]) { R.rect(x - 2, y, x + 4, y + 3, K); R.rect(x - 1, y + 1, x + 3, y + 2, hex('#8c90a4')); } R.rect(x - 4, 86, x + 2, 90, K); R.rect(x - 3, 87, x + 1, 89, hex('#e8b830')); }
  R.rect(55, 32, 56, 140, K);
  for (const x0 of [244, 284]) { R.rect(x0, 56, x0 + 22, 70, K); for (let y = 58; y < 70; y += 3) R.rect(x0 + 1, y, x0 + 21, y, hex('#1e3a26')); }
  // el cable con la bombilla, los tubos y una rejilla
  R.linea(150, 34, 150, 52, K);
  R.rect(0, 146, 319, 179, hex('#9a6a4a')); for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const v = hh(x >> 1, y >> 1); if (v < 0.12) R.pset(x, y, hex('#7a4a32')); else if (v > 0.93) R.pset(x, y, hex('#c89068')); }
  R.rect(0, 146, 319, 147, hex('#5a3a2a'));
  // trastos del suelo: un neumático, una caja, tornillos
  R.disco(298, 160, 12, K); R.disco(298, 160, 11, hex('#2a2430')); R.disco(298, 160, 5, hex('#5a5468')); R.disco(298, 160, 3, K);
  R.rect(262, 150, 284, 166, K); R.rect(263, 151, 283, 165, hex('#a8743c')); R.rect(263, 151, 283, 152, hex('#c89a5a')); R.linea(263, 151, 283, 165, hex('#7a4a26')); R.linea(283, 151, 263, 165, hex('#7a4a26'));
  for (let k = 0; k < 8; k++) { const x = 60 + k * 26, y = 168 + (k % 3) * 3; R.rect(x, y, x + 2, y, hex('#c8c4bc')); R.pset(x + 1, y + 1, K); }
};
// la sombra en la pared: oscurece lo que haya; c = Capitán (escudo y casco de alas)
const sombra = (x, base, s, cap, t) => {
  const M = new Set();
  const D = (x0, y0, x1, y1) => { for (let y = Math.round(y0); y <= Math.round(y1); y++) for (let xx = Math.round(x0); xx <= Math.round(x1); xx++) if (y < 146) M.add(y * 320 + xx); };
  const Dd = (cx, cy, r) => { for (let y = Math.round(cy - r); y <= Math.round(cy + r); y++) for (let xx = Math.round(cx - r); xx <= Math.round(cx + r); xx++) if (Math.hypot(xx - cx, y - cy) <= r && y < 146) M.add(y * 320 + xx); };
  const sx = (i) => x + i * s, sy = (j) => base - j * s;
  D(sx(-3), sy(9), sx(-1), sy(0)); D(sx(1), sy(9), sx(3), sy(0)); D(sx(-5), sy(19), sx(5), sy(9)); D(sx(-7), sy(18), sx(-5), sy(10)); Dd(sx(0), sy(25), 7 * s);
  if (!cap) { for (let k = 0; k < 5; k++) { const fx = sx(-6 + k * 3), fh = (3 + Math.abs(Math.sin(t * 9 + k)) * 4) * s; D(fx, sy(30) - fh, fx + s, sy(28)); } D(sx(5), sy(18), sx(9), sy(16)); }
  else { D(sx(-11), sy(25), sx(-7), sy(24)); D(sx(-12), sy(28), sx(-9), sy(25)); D(sx(7), sy(25), sx(11), sy(24)); D(sx(9), sy(28), sx(12), sy(25)); D(sx(5), sy(17), sx(9), sy(13)); Dd(sx(12), sy(14), 7 * s); }
  for (const k of M) { const xx = k % 320, y = (k - xx) / 320; tine(xx, y, K, 0.58); }
  if (cap) { const cx = sx(12), cy = sy(14);
    for (const rr of [5.2 * s, 3.4 * s]) for (let k = 0; k < 70; k++) { const a = k / 70 * 6.283, xx = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr; R.pset(xx, y, mez(R.pget(xx, y), BLANCO, 0.2)); }
    const pts = []; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 1.1 * s : 2.6 * s; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); }
    R.poligono(pts, (xx, y) => mez(R.pget(xx, y), BLANCO, 0.3)); }
};
const p4 = (t) => {
  fijo('chapa', fondoChapa);
  R.recorte([0, 0, 319, 28]); nubes(t, [[16, 26, 2.5, 3, [hex('#3a2230'), hex('#6a3a40'), hex('#8a4a48')], 17]]); R.recorte(null);
  // la bombilla que se mece
  const bx = 150 + Math.round(Math.sin(t * 1.4) * 3); R.linea(150, 34, bx, 52, K); R.disco(bx, 55, 3, hex('#fff0a0')); R.rect(bx - 2, 51, bx + 2, 52, hex('#5a5468'));
  // la sombra de la Antorcha en la pared, que se vuelve la del Capitán
  const cap = t > CAPI - 0.05;
  sombra(200 + Math.round(Math.sin(t * 7) * 1), 142, 3, cap, t);
  if (t > CAPI - 0.05 && t < CAPI + 0.35) { const d = t - CAPI + 0.05; R.anillo(236, 100, 14 + d * 50, hex('#f2eee2'), 3); }
  // el bidón con fuego (la luz que hace la sombra)
  R.rect(14, 140, 40, 172, K); R.rect(15, 141, 39, 171, hex('#5a5468')); R.rect(15, 141, 18, 171, hex('#8a8494')); for (const y of [150, 162]) R.rect(14, y, 40, y + 1, K); for (let k = 0; k < 6; k++) { const x = 19 + k * 4, hgt = 8 + Math.round(Math.abs(Math.sin(t * 9 + k * 1.3)) * 10); R.poligono([[x - 3, 141], [x + 3, 141], [x + Math.round(Math.sin(t * 7 + k) * 2), 141 - hgt]], k % 2 ? hex('#f8b030') : hex('#e85a20')); R.pset(x, 140 - Math.round(hgt * 0.4), hex('#fff0a0')); }
  for (let k = 0; k < 5; k++) { const d = (t * 0.7 + k / 5) % 1; R.disco(27 + Math.sin(t + k) * 4 + d * 10, 130 - d * 60, 2 + d * 3, mez(hex('#5a4a4a'), hex('#8a4a48'), d)); }
  for (let j = -30; j <= 30; j += 1) for (let i = -30; i <= 30; i++) { const r = Math.hypot(i, j); if (r > 16 && r < 30 && (i + j) % 2 === 0) tine(27 + i, 136 + j, hex('#f8b030'), 0.18 * (1 - r / 30)); }
  // los personajes
  const mira = t > CAPI + 0.2;
  R.actor(EL.antorcha, 128, 168, t, { dir: mira ? 1 : -1, sorpresa: mira && t < BROMA, brazos: t > NUNCAV - 0.4, sonrisa: t > BROMA });
  const rie = t > BROMA;
  R.actor(EL.deadpool, 238, 170, t, { dir: -1, dedo: mira && t < BROMA, habla: rie && Math.sin(t * 16) > 0, salto: rie ? Math.round(Math.abs(Math.sin(t * 12)) * 3) : 0, brazos: rie && t > BROMA + 0.8 });
  R.actor(EL.lobezno, 270, 168, t, { dir: Math.floor(t * 3) % 2 && rie ? 1 : -1, enfado: true, garras: false });
  T.palomitas(R, 74, 178, t, { dir: 1, expresion: rie ? 'risa' : mira ? 'susto' : 'normal', salta: rie ? 0.6 : 0 });
};
const efectos = [[APARECEN - 0.3, 'whoosh'], [NUNCA + 0.25, 'guau'], [NUNCA + 0.45, 'boing'], [GAMBIT, 'brillo'], [TATUM - 0.25, 'whoosh'], [DOOMS, 'flash'],
  [P3 + 0.1, 'whoosh'], [CUATRO, 'brillo'], [CAPI, 'boing'], [BROMA, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2024 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['do-xmen'] = ('Vuelven los X-Men', '''// DO-XMEN (frase 41), sin cartela; año 2026. Dos planos:
// 1. la mansión al atardecer: los X-Men vuelven por el camino de grava (Cíclope, Mística, Rondador, Bestia y Magneto en
//    fila, con los faroles encendidos); en «Professor X» se abre la puerta con su luz (corta en «X»);
// 2. la escalinata al atardecer: Xavier en el centro; cada uno llega cuando la voz dice su nombre: Magneto baja
//    flotando, Cíclope baja la escalinata y su visor destella, una alumna se transforma en Mística, Rondador aparece en
//    una nube de humo y Bestia cae de un salto; en «same actors» todos saludan y las palomitas se emocionan.''', H + r'''
const a = (f) => en('vuelven', f);
const P2 = a(0.377);
const VUELVEN = a(0.231), PROF = a(0.343), MAG = a(0.463), CIC = a(0.51), MIS = a(0.608), NOC = a(0.655), BES = a(0.718), MISMOS = a(0.851);
const LUZ = hex('#f8dc98'), LUZS = hex('#e8b060'), MAD = hex('#5a3420'), MADL = hex('#7a4a2a');
const puertaG = (t, u) => {
  if (u <= 0) return; const x0 = 139, x1 = 154, y0 = 85, y1 = 107, w = Math.round(lerp(8, 2, u));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, trama(x, y, Math.abs(x - 146.5) / 9 + (y - y0) / 60) ? LUZS : LUZ);
  R.rect(x0 + 4, y0 + 3, x1 - 4, y0 + 3, hex('#fff8e0'));
  for (const [xa, s] of [[x0, 1], [x1, -1]]) { const xb = xa + s * (w - 1); R.rect(Math.min(xa, xb), y0, Math.max(xa, xb), y1, MAD); R.rect(xb, y0, xb, y1, MADL); R.rect(xa, y0, xa, y1, K); }
  for (let j = 0; j < 10; j++) for (let i = -j; i <= 15 + j; i++) if ((i + j) % 2 === 0) tine(x0 + i, y1 + 1 + j, hex('#fff0c0'), 0.4 * u * (1 - j / 10));
};
// 1. vuelven por el camino
const FILA = [['ciclope', 0.0], ['mistica', 0.35], ['rondador', 0.7], ['bestia', 1.05], ['magneto', 1.4]];
const p1 = (t) => {
  T.vacio(R, t, { encuadre: 'mansion', luz: 'tarde' });
  puertaG(t, tramo(t, PROF - 0.4, PROF + 0.1));
  if (t > PROF - 0.1) { const u = tramo(t, PROF - 0.1, P2); R.recorte([139, 85, 154, 107]); xavier(140, 107, t, { dir: 1, sonrisa: true }); R.recorte(null); }
  for (let k = FILA.length - 1; k >= 0; k--) { const [n, d] = FILA[k], u = tramo(t, 0.2 + d, VUELVEN + 0.8 + d), x = Math.round(lerp(-30 - k * 4, 136 - k * 24, u)), y = Math.round(lerp(176, 146 + k * 6, u));
    R.actor(EL[n], x, y, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: t > PROF, dedo: n === 'ciclope' && t > PROF - 0.2 && t < P2 }); }
};
// 2. la fila en la escalinata
const HUMO = hex('#3a2a5a'), HUMOL = hex('#6a5a8a');
const p2 = (t) => {
  T.vacio(R, t, { encuadre: 'mansion', camara: 'cerca', luz: 'tarde' });
  const salud = t > MISMOS, ola = (k) => salud && Math.sin(t * 8 + k) > 0;
  xavier(153, 166, t, { dir: 1, sonrisa: true, habla: t < MAG && Math.sin(t * 9) > 0, dedo: ola(0) });
  // Magneto baja flotando
  const mu = tramo(t, MAG - 0.8, MAG), malto = Math.round((1 - mu) ** 1.6 * 150);
  if (mu > 0) { if (mu < 1) R.anillo(115, 152 - malto, 13, hex('#b07ae8'), 2); R.actor(EL.magneto, 108, 166, t, { dir: 1, salto: malto, brazos: mu < 1 || ola(1), sonrisa: true }); }
  // Cíclope baja la escalinata y su visor destella
  const cy = ruta(t, [[CIC - 0.9, 189, 121], [CIC - 0.1, 199, 166]]);
  if (t > CIC - 0.9) { R.actor(EL.ciclope, cy.x, cy.y, t, { dir: 1, anda: cy.mv, sonrisa: t > CIC + 0.6, brazos: ola(2) }); const d = t - CIC; if (d > 0 && d < 0.45) { const L = Math.round(d * 400); R.linea(cy.x + 10, cy.y - 18, cy.x + 10 + L * 0.4, cy.y - 18 - L, hex('#e83a3a')); R.linea(cy.x + 11, cy.y - 18, cy.x + 11 + L * 0.4, cy.y - 18 - L, hex('#ff8a8a')); R.disco(cy.x + 11, cy.y - 18, 3, hex('#ffd0d0')); } }
  // la alumna que se transforma en Mística (la escama azul barre de arriba abajo)
  const mt = tramo(t, MIS - 0.35, MIS + 0.05), yb = Math.round(lerp(136, 168, mt));
  if (mt < 1) { R.recorte([40, yb, 80, 179]); R.actor(EL.estudiante, 57, 166, t, { dir: 1, sorpresa: mt > 0 }); R.recorte(null); }
  if (mt > 0) { R.recorte([40, 120, 80, yb]); R.actor(EL.mistica, 57, 166, t, { dir: 1, sonrisa: true, brazos: ola(3) }); R.recorte(null); for (let i = 52; i < 78; i++) if ((i + Math.floor(t * 20)) % 3 === 0 && mt < 1) R.pset(i, yb, hex('#8ac8ff')); }
  // Rondador aparece en una nube de humo
  const nd = t - NOC;
  if (nd > 0.12) R.actor(EL.rondador, 236, 166, t, { dir: -1, sonrisa: true, dedo: ola(4) });
  if (nd > -0.05 && nd < 0.9) { const s = Math.min(1, (nd + 0.05) / 0.2), f = Math.max(0, (nd - 0.3) / 0.6); for (let k = 0; k < 7; k++) { const a2 = k / 7 * 6.283, r = 6 + nd * 12, x = 243 + Math.cos(a2) * r, y = 152 + Math.sin(a2) * r * 0.8 - nd * 6; if (f < 1) { R.disco(x, y, (6 + (k % 3)) * s * (1 - f * 0.7), HUMO); R.disco(x - 1, y - 2, (3 + (k % 2)) * s * (1 - f), HUMOL); } } }
  // Bestia cae de un salto
  const bu = tramo(t, BES - 0.6, BES), bx = Math.round(lerp(330, 270, bu)), balto = Math.round(Math.sin(bu * Math.PI * 0.5 + Math.PI * 0.5) * 70 * (1 - bu) + (1 - bu) * 20);
  if (bu > 0) R.actor(EL.bestia, bx, 166, t, { dir: -1, salto: balto, brazos: bu < 1 || ola(5), sonrisa: true });
  polvo(bx + 7, 166, t, BES, hex('#d8c0a0'), hex('#f2e0c0'));
  // las palomitas, en la losa de delante, se emocionan
  T.palomitas(R, 22, 178, t, { dir: 1, expresion: t > MISMOS - 0.3 ? 'emocion' : t > NOC && t < NOC + 0.8 ? 'susto' : 'normal', salta: t > MISMOS ? 0.7 : 0, saluda: t > MISMOS + 0.5 });
};
const efectos = [[0.4, 'viento'], [PROF - 0.4, 'puerta'], [MAG - 0.7, 'zumbido'], [CIC, 'flash'], [MIS - 0.3, 'brillo'], [NOC, 'pop'], [BES, 'boing'], [MISMOS, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 2026 });
''')
