# Borrador de escenas del ep48 (grupo S7): bl-parsons, bl-gillogly y bl-azar, con el movimiento ya hecho.
# Los instantes salen de las palabras de la voz inglesa (atomo/build/largo/ep48/linea.json), escritos como en('marca', f).
# bl-azar es la PAUSA «fíjate» (la técnica de ms-suenos del 47): congela planos de bl-gillogly con las MISMAS funciones
# (COMPARTIDO), con los instantes de bl-gillogly escritos como números (en bl-azar, M es el de la pausa).
# Fondos locales (pintados en la escena, con su búfer): P2 el alquiler de máquinas, P3 la mesa de la cocina, P6 la cárcel;
# G1 la fachada de RAND, G3 el escritorio desde arriba, G5 el rincón de la impresora, G6 el corcho, G7 la mesa de luz.
E = {}

MARCAS = {'excavadora': (1.5, 31.097), 'tira': (1.5, 37.474), 'fijate4': (0.2, 33.739)}

# bl-parsons: las palabras que mandan, en segundos de la escena
TP = {
    'DIGGING': 2.24, 'N1983': 3.46, 'WOMAN': 4.90, 'PENN': 5.42, 'MARILYN': 6.84, 'CASHED': 8.40, 'CHECK': 8.88,
    'SPENT': 9.48, 'RENTING': 10.02, 'BACKHOE': 10.48, 'BECAUSE': 11.44, 'CONVINCED': 12.06, 'TREASURE': 12.96,
    'UNMARKED': 14.22, 'PLOT': 14.84, 'CHURCH': 15.54, 'GRAVEYARD': 15.72, 'AND': 16.78, 'WENT': 17.22, 'PURPOSE': 17.90,
    'PROVE': 18.58, 'IMAGINE': 20.14, 'ENDED': 21.22, 'WITH': 21.98, 'ARRESTED': 22.32, 'DESECRATING': 23.04,
    'CEMETERY': 23.90, 'COUPLE': 25.00, 'MONTHS': 25.56, 'BEDFORD': 26.10, 'JAIL': 26.80, 'AND2': 27.88, 'ADVICE': 28.12,
    'NEVER': 28.50, 'SET': 29.18, 'FOOT': 29.48, 'VIRGINIA': 30.08, 'AGAIN': 30.48,
}
# bl-gillogly
TG = {
    'N1980': 1.74, 'GOLPE': 2.50, 'COMPUTER': 2.76, 'RAND': 4.16, 'CORP': 4.58, 'JIM': 5.98, 'DID': 7.22, 'NOBODY': 7.66,
    'DONE': 8.58, 'CAREFULLY': 9.12, 'HE': 10.34, 'APPLIED': 10.56, 'DECL': 11.30, 'FIRST': 12.34, 'SHEET': 12.66,
    'THEONE': 13.70, 'SAYS': 14.16, 'VAULT': 14.68, 'TO': 15.68, 'SEE': 15.82, 'LETTERS': 16.24, 'OUT': 17.02,
    'ALMOST': 18.48, 'GIBBERISH': 19.70, 'BUT': 20.56, 'MIDDLE': 20.96, 'APPEARED': 21.16, 'SOMETHING': 21.52,
    'HAIR': 22.30, 'END': 23.02, 'RUN': 23.80, 'PERFECT': 24.84, 'ALPHA': 25.20, 'ORDER': 25.84, 'CORTE6': 26.00,
    'L0': 26.18, 'L1': 26.72, 'L2': 27.30, 'L3': 27.82, 'L4': 28.46, 'L5': 28.68, 'L6': 29.22, 'L7': 29.46, 'L8': 29.94,
    'L9': 30.50, 'L10': 31.06, 'L11': 31.70, 'L12': 31.98, 'L13': 32.52, 'L14': 32.94, 'CORTE7': 33.16, 'L15': 33.16,
    'L16': 33.38, 'L17': 33.78, 'L18': 34.22, 'L19': 34.64, 'WITH': 34.84, 'COUPLE': 35.54, 'STUMBLES': 35.84,
    'LOOK': 36.44, 'MADE': 36.62, 'HAND': 37.02, 'FIN': 38.90,
}
# bl-azar
TA = {
    'NOTICE': 0.34, 'SERIOUS': 1.56, 'BECAUSE': 2.60, 'FIRST': 3.18, 'SHEET': 3.48, 'MESSAGE': 4.36, 'OTHER': 5.50,
    'BOOK': 5.82, 'PUTTING': 6.68, 'DECL': 7.08, 'GIVE': 8.66, 'SCRAMBLED': 9.08, 'NO': 10.74, 'ORDER': 11.04, 'ALL': 11.70,
    'AND': 12.48, 'AMERICAN': 13.26, 'ASSOC': 14.38, 'THE': 15.78, 'ODDS': 15.88, 'MANY': 16.50, 'ALPHA': 17.62,
    'ORDER2': 18.32, 'BY': 18.78, 'CHANCE': 19.28, 'ARE': 19.74, 'LESS': 20.10, 'ONE': 20.62, 'HUNDRED': 21.62,
    'MILLION': 21.92, 'MILLION2': 22.38, 'THE2': 23.83, 'EASIEST': 24.16, 'BELIEVE': 25.06, 'WHOEVER': 26.26,
    'WROTE': 26.56, 'NUMBERS': 27.22, 'PICKED': 27.60, 'DECL2': 28.82, 'FRONT': 29.66, 'HIM': 30.04, 'MORE': 30.64,
    'RANDOM': 31.48, 'WITHOUT': 32.24, 'ENCODING': 32.54, 'ANYTHING': 33.12,
}


def frac(k, s):
    a, b = MARCAS[k]
    return (s - a) / (b - a)


def tabla(nombre, T, k):
    return f'const {nombre} = {{ ' + ', '.join(f"{n}: en('{k}', {frac(k, s):.4f})" for n, s in T.items()) + ' };\n'


def tabla_num(nombre, T):
    """los mismos instantes como números (para bl-azar, que tiene otro M)"""
    return f'const {nombre} = {{ ' + ', '.join(f"{n}: {s}" for n, s in T.items()) + ' };\n'


COMUN = r'''
const AT = T.AT, BL = T.BL, C = T.C, K = C.k, ri = Math.round, H = (s) => hex(s);
const B4M = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4M[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const ns = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h2(xi, yi), b = h2(xi + 1, yi), c = h2(xi, yi + 1), d = h2(xi + 1, yi + 1); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const pal = (a) => a.map((c) => hex(c));
// rampa de oscuro a claro: el valor v (0..n-1) se trama entre dos tonos
const rmp = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return ramp[Math.max(0, Math.min(ramp.length - 1, l))]; };
// aparece con un rebote (0 antes de a; 1 al final)
const pop = (t, a, d = 0.3) => { const u = Math.max(0, Math.min(1, (t - a) / d)); return u <= 0 ? 0 : u < 1 ? 1 - Math.pow(1 - u, 3) * Math.cos(u * 7) : 1; };
const ps = (x, y, c) => R.pset(ri(x), ri(y), c);
const rr = (x0, y0, x1, y1, c) => R.rect(ri(Math.min(x0, x1)), ri(Math.min(y0, y1)), ri(Math.max(x0, x1)), ri(Math.max(y0, y1)), c);
// un rectángulo con pset (respeta R.recorte)
const rp = (x0, y0, x1, y1, c) => { for (let y = ri(y0); y <= ri(y1); y++) for (let x = ri(x0); x <= ri(x1); x++) R.pset(x, y, c); };
const tine = (x, y, c, a) => { x = ri(x); y = ri(y); if (x < 0 || y < 0 || x > 319 || y > 179) return; const B = R.buf, i = y * 320 + x; B[i] = mez(B[i], c, a); };
const luz = (cx, cy, r, c, a) => { for (let y = Math.max(0, ri(cy - r)); y <= Math.min(179, ri(cy + r)); y++) for (let x = Math.max(0, ri(cx - r)); x <= Math.min(319, ri(cx + r)); x++) {
  const d = Math.hypot(x - cx, y - cy) / r; if (d < 1) { const k = (1 - d) * (1 - d) * a; if (k > 0.02) tine(x, y, c, Math.min(0.85, k)); } } };
const sombraS = (cx, cy, w, a = 0.35) => { for (let i = -w; i <= w; i++) { const k = 1 - (i / (w + 1)) ** 2; tine(cx + i, cy, K, a * k); if (Math.abs(i) < w * 0.7) tine(cx + i, cy + 1, K, a * 0.6 * k); } };
const destello = (x, y, r, c = H('#fff8d0')) => { x = ri(x); y = ri(y); for (let k = 1; k <= r; k++) { ps(x + k, y, c); ps(x - k, y, c); ps(x, y + k, c); ps(x, y - k, c); } ps(x, y, H('#ffffff')); };
const elipse = (cx, cy, rx, ry, c) => { for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 <= 1) ps(cx + i, cy + j, c); };
// un fondo fijo: se pinta una vez en su búfer y se copia en cada fotograma (con R.usar(prev), nunca R.usar() a secas)
const FIJ = new Map();
const fijo = (clave, f) => { let b = FIJ.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); FIJ.set(clave, b); } R.copiar(b); return b; };
// vuelve a pegar un trozo del fondo fijo (lo que va por delante de un personaje: la pared bajo una ventanilla…)
const repega = (b, x0, y0, x1, y1) => { const B = R.buf; for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) B.set(b.subarray(y * 320 + Math.max(0, x0), y * 320 + Math.min(319, x1) + 1), y * 320 + Math.max(0, x0)); };
// la máscara del cielo de un fondo fijo: donde el píxel sigue siendo el del cielo pintado al principio
const MASC = new Map();
const mascara = (clave, b, cieloB, yMax) => { let m = MASC.get(clave); if (!m) { m = new Uint8Array(320 * 180); for (let i = 0; i < 320 * (yMax + 1); i++) m[i] = b[i] === cieloB[i] ? 1 : 0; MASC.set(clave, m); } return (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180 && m[ri(y) * 320 + ri(x)] === 1; };
// cifras de 3 × 5 (calculadora, calendario, precios)
const DG = { 0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['##.', '..#', '.#.', '#..', '###'], 3: ['##.', '..#', '.#.', '..#', '##.'],
  4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '##.', '..#', '##.'], 6: ['.##', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'],
  8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '##.'], $: ['.##', '##.', '.#.', '.##', '##.'] };
const cifras = (s, x, y, c, esc = 1) => { for (const ch of String(s)) { const g = DG[ch]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j][i] === '#') rp(x + i * esc, y + j * esc, x + i * esc + esc - 1, y + j * esc + esc - 1, c); x += 4 * esc; } };
// las letras de la tira (a–p) en 3 × 5: solo las de la historia (la tira y el galimatías de la impresora)
const LT = { a: ['.#.', '#.#', '###', '#.#', '#.#'], b: ['##.', '#.#', '##.', '#.#', '##.'], c: ['.##', '#..', '#..', '#..', '.##'], d: ['##.', '#.#', '#.#', '#.#', '##.'],
  e: ['###', '#..', '##.', '#..', '###'], f: ['###', '#..', '##.', '#..', '#..'], g: ['.##', '#..', '#.#', '#.#', '.##'], h: ['#.#', '#.#', '###', '#.#', '#.#'],
  i: ['###', '.#.', '.#.', '.#.', '###'], j: ['..#', '..#', '..#', '#.#', '.#.'], k: ['#.#', '#.#', '##.', '#.#', '#.#'], l: ['#..', '#..', '#..', '#..', '###'],
  m: ['#.#', '###', '###', '#.#', '#.#'], n: ['##.', '#.#', '#.#', '#.#', '#.#'], o: ['.#.', '#.#', '#.#', '#.#', '.#.'], p: ['##.', '#.#', '##.', '#..', '#..'] };
const letra = (ch, x, y, c, esc = 1) => { const g = LT[ch]; if (!g) return; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j][i] === '#') rp(x + i * esc, y + j * esc, x + i * esc + esc - 1, y + j * esc + esc - 1, c); };
const ABC = 'abcdefghijklmnop';
const galima = (fila, i) => ABC[Math.floor(h2(fila, i, 61) * 16)];   // una letra revuelta (fila, columna)
const TIRA = 'abfdefghiijklmmnohpp';
// madera con vetas (tablas de «tab» px)
const vetas = (x0, y0, x1, y1, ramp, k = 0, tab = 12, vert = false) => { const n = ramp.length - 1;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = vert ? y : x, b = vert ? x - x0 : y - y0, f = Math.floor(b / tab), j = b % tab, A = a + h2(f, k, 7) * 400, junta = 40 + ri(h2(f, k, 8) * 50);
    let v = n * 0.55 + Math.sin(A * 0.09 + Math.sin(A * 0.021 + f * 1.7) * 2.6 + j * 0.45) * 0.55 + (ns(A * 0.06, b * 0.4 + k) - 0.5) * 1.3;
    if (j === 0) v = 0.25; else if (j === 1) v += 0.5; else if (j === tab - 1) v -= 0.45;
    if (!vert && Math.floor(A) % junta === 0) v = 0.3;
    if (h2(x, y, k + 3) > 0.988) v -= 1.2;
    ps(x, y, rmp(ramp, v, x, y)); } };
// yeso o piedra: grano grande y fino
const yeso = (x0, y0, x1, y1, ramp, k = 0) => { const n = ramp.length - 1;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = n * 0.55 + (ns(x * 0.07 + k, y * 0.07) - 0.5) * 1.6 + (ns(x * 0.25, y * 0.25 + k) - 0.5) * 0.7 + (h2(x, y, k) - 0.5) * 0.35; ps(x, y, rmp(ramp, v, x, y)); } };
// un cielo de día tramado (de y0 a y1), más claro hacia el horizonte, con velos
const CIELO = pal(['#3a68b0', '#4a7cc2', '#5e90d0', '#76a6dc', '#92bce6', '#b0d0ee', '#cce0f2']);
const cieloT = (y0, y1, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const u = (y - y0) / Math.max(1, y1 - y0);
  ps(x, y, rmp(CIELO, 0.6 + u * 5.2 + (ns(x * 0.03 + k, y * 0.09) - 0.5) * 0.9, x, y)); } };
// nube de tres tonos (sombra, cuerpo y luz); m(x, y): solo donde se ve el cielo
const NUB = pal(['#a8bcd8', '#dce6f2', '#ffffff']);
const nube = (cx, cy, w, m, c3 = NUB) => { const Bq = [[0, 0, 0.32], [-0.32, 0.06, 0.24], [0.3, 0.05, 0.26], [-0.1, -0.12, 0.26], [0.14, -0.08, 0.22]];
  for (let q = 0; q < 3; q++) for (const [dx, dy, r0] of Bq) { const r = w * r0 * (q === 2 ? 0.72 : 1), X = cx + dx * w - (q === 2 ? 1 : 0), Y = cy + dy * w + (q === 0 ? 1 : q === 2 ? -2 : 0);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) { const px = ri(X + i), py = ri(Y + j); if (!m || m(px, py)) ps(px, py, c3[q]); } } };
// tres capas de nubes a tres velocidades y una bandada; fuera de la zona de Atom (x > 268, y < 48)
const nubes = (t, m, ys = [20, 36, 50], k = 0) => { for (let q = 0; q < 6; q++) { const capa = q % 3, w = [40, 28, 18][capa] + h2(q, k, 3) * 10, vel = [2.2, 1.3, 0.6][capa];
    const x = ((h2(q, k, 4) * 460 + t * vel) % 480) - 80, y = ys[capa] + h2(q, k, 5) * 6; nube(x, y, w, (px, py) => m(px, py) && (py >= 50 || b4(px, py) < cl((262 - px) / 26))); } };
const pajaros = (t, m, y0 = 40, k = 0) => { for (let q = 0; q < 4; q++) { const x = ((t * (9 + q) + q * 30 + k * 80) % 380) - 30, y = y0 + q * 4 + Math.sin(t * 1.3 + q) * 2, a = Math.sin(t * 10 + q * 2) > 0;
    if (x > 262 && y < 50) continue; for (const [dx, dy] of [[0, 0], [-1, a ? -1 : 0], [1, a ? -1 : 0], [-2, a ? -1 : 1], [2, a ? -1 : 1]]) if (m(x + dx, y + dy)) ps(x + dx, y + dy, H('#2a3040')); } };
const parp = (t, f = 7) => Math.sin(t * f) > -0.2;
// la ranchera de los ochenta de Marilyn: beige con el panel de madera (x: el morro trasero; by: suelo; dir 1 mira a la derecha)
const ranchera = (x, by, dir = 1, t = 0, col = null) => { const X = (i) => ri(x + (dir > 0 ? i : 58 - i)), B = col || pal(['#8a7a5a', '#b8a67e', '#d8c89c', '#ece0bc']), M = col ? [col[0], col[1], col[1]] : pal(['#4a2a14', '#6a4020', '#8a5a2e']);
  sombraS(x + 29, by + 1, 28, 0.4);
  R.poligono([[X(0), by - 4], [X(0), by - 12], [X(10), by - 12], [X(10), by - 20], [X(42), by - 20], [X(48), by - 12], [X(58), by - 11], [X(58), by - 4]], (xx, yy) => rmp(B, 3.2 - (yy - by + 20) * 0.16, xx, yy));
  R.poligono([[X(12), by - 19], [X(24), by - 19], [X(24), by - 13], [X(12), by - 13]], H('#3a4a5e')); R.poligono([[X(26), by - 19], [X(40), by - 19], [X(45), by - 13], [X(26), by - 13]], H('#3a4a5e'));
  R.linea(X(13), by - 18, X(17), by - 18, H('#9ab8d0')); R.linea(X(27), by - 18, X(31), by - 18, H('#9ab8d0'));
  for (let i = 2; i <= 52; i++) for (let j = 10; j >= 6; j--) R.pset(X(i), by - j, rmp(M, 1.2 + Math.sin(i * 0.7 + j) * 0.5 + (j === 10 ? 0.8 : 0), X(i), by - j));
  R.rect(Math.min(X(0), X(58)), by - 5, Math.max(X(0), X(58)), by - 4, H('#c8ccd0'));
  R.rect(Math.min(X(56), X(58)), by - 11, Math.max(X(56), X(58)), by - 9, H('#f0e8a0')); R.rect(Math.min(X(0), X(1)), by - 11, Math.max(X(0), X(1)), by - 9, H('#c83a2a'));
  for (const i of [12, 46]) { R.disco(X(i), by - 3, 3.5, K); R.disco(X(i), by - 3, 1.6, H('#a8a8b0')); R.pset(X(i) + ri(Math.cos(t * 9) * 1.4), by - 3 + ri(Math.sin(t * 9) * 1.4), H('#4a4a52')); } };
// la excavadora amarilla (la misma de bl-comun, copiada aquí porque no se exporta): bx izquierda de las orugas, by suelo
const AMA = pal(['#6a4a10', '#a87a14', '#d8a820', '#f0c838', '#fff07a']);
const excav = (bx, by, s, a, quieto, dir = 1) => {
  const Y = AMA, KX = H('#1e1e22'), KL = H('#46464e'), X = (i) => bx + (dir > 0 ? i : 40 - i) * s, YY = (j) => by - j * s, ton = (v, x, y) => rmp(Y, v * 4, x, y);
  sombraS(X(15), by + 1, ri(20 * s), 0.35);
  R.poligono([[X(0), YY(6)], [X(30), YY(6)], [X(32), YY(3)], [X(30), YY(0)], [X(0), YY(0)], [X(-2), YY(3)]], KX);
  for (let i = 0; i <= 30; i += 3) R.rect(Math.min(X(i), X(i + 1)), YY(1), Math.max(X(i), X(i + 1)), YY(0), KL);
  for (const i of [3, 10, 17, 24, 29]) R.disco(X(i), YY(3), 1.8 * s, KL);
  R.poligono([[X(-2), YY(13)], [X(28), YY(13)], [X(28), YY(7)], [X(-2), YY(7)]], (x, y) => ton(0.62 - (y - YY(13)) / (6 * s) * 0.35, x, y));
  R.poligono([[X(-4), YY(12)], [X(6), YY(12)], [X(6), YY(7)], [X(-4), YY(7)]], Y[1]);
  R.poligono([[X(8), YY(26)], [X(22), YY(26)], [X(24), YY(13)], [X(8), YY(13)]], (x, y) => ton(0.7 - (x - X(8)) * 0.01 * dir, x, y));
  R.poligono([[X(10), YY(24)], [X(20), YY(24)], [X(21), YY(17)], [X(10), YY(17)]], H('#2a3a4a'));
  R.linea(X(11), YY(23), X(14), YY(23), H('#9ab8c8')); R.linea(X(11), YY(22), X(12), YY(22), H('#6a8aa0'));
  R.rect(Math.min(X(8), X(22)), YY(27), Math.max(X(8), X(22)), YY(26), Y[0]);
  R.rect(Math.min(X(2), X(3)), YY(18), Math.max(X(2), X(3)), YY(13), KX);
  const fase = quieto ? -1 : Math.sin(a * Math.PI * 2), ang1 = -0.75 + fase * 0.25, ang2 = 1.25 + fase * 0.35;
  const p0 = [X(24), YY(14)], L1 = 20 * s, L2 = 15 * s;
  const p1 = quieto ? [X(38), YY(16)] : [p0[0] + Math.cos(ang1) * L1 * dir, p0[1] + Math.sin(ang1) * L1];
  const p2 = quieto ? [X(44), by] : [p1[0] + Math.cos(ang2) * L2 * dir, p1[1] + Math.sin(ang2) * L2];
  const viga = (a0, a1, g) => { for (let j = -g; j <= g; j++) R.linea(ri(a0[0]), ri(a0[1] + j), ri(a1[0]), ri(a1[1] + j), j === -g ? Y[4] : j === g ? Y[0] : Y[2]); };
  viga(p0, p1, Math.max(1, ri(1.5 * s))); viga(p1, p2, Math.max(1, ri(1.2 * s)));
  R.linea(p0[0], p0[1] + 2 * s, ri((p0[0] + p1[0]) / 2), ri((p0[1] + p1[1]) / 2 + 2 * s), H('#b8b8c0'));
  R.disco(ri(p1[0]), ri(p1[1]), 1.2 * s, KX);
  R.poligono([[p2[0] - 3 * s * dir, p2[1] - 4 * s], [p2[0] + 3 * s * dir, p2[1] - 3 * s], [p2[0] + 2 * s * dir, p2[1]], [p2[0] - 2 * s * dir, p2[1] + 0.5]].map(([u, v]) => [ri(u), ri(v)]), KX);
  return { cazo: p2, escape: [X(2.5), YY(18)], cabina: [X(15), YY(20)], faro: [X(16), YY(27)] };
};
// una bocanada de humo gris que sube desde (x, y) (u 0–1)
const bocanada = (x, y, u, r0 = 3) => { if (u <= 0 || u >= 1) return; const r = r0 + u * 6, yy = y - u * 16, c = mez(H('#5a5a60'), H('#c8c8cc'), u);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && h2(i, j, 9) > u * 0.8) tine(x + i + u * 4, yy + j, c, 0.75 * (1 - u)); };
// la nota musical (a color) que sube cantando
const nota = (x, y, c) => { x = ri(x); y = ri(y); rr(x + 3, y - 6, x + 3, y, K); rr(x + 4, y - 6, x + 6, y - 5, K); R.disco(x + 1, y, 2, K); R.disco(x + 1, y, 1, c); R.pset(x + 3, y - 5, c); R.pset(x + 5, y - 5, c); };
// el globito con un icono ('?', '!', 'X'…) que salta encima de alguien
const globo = (ic, x, y, p, col = H('#fff0a0')) => { if (p <= 0) return; const yy = ri(y - 3 * Math.min(1, p)); R.icono(ic, ri(x), yy, col, K, 2); };
'''

PARSONS = r'''
// ════ BL-PARSONS ════
// un fondo fijo con cielo: devuelve el búfer y la máscara del cielo (para las nubes y los pájaros)
const FCI = new Map();
const fondoC = (clave, yc, resto, k = 0) => { const b = fijo(clave, () => { cieloT(0, yc, k); FCI.set(clave, R.buf.slice()); resto(); }); return { b, m: mascara(clave, b, FCI.get(clave), yc) }; };
// la pala: el mango de (hx, hy) a (bx, by) y la hoja de hierro más allá
const pala = (hx, hy, bx, by) => { const L = Math.hypot(bx - hx, by - hy) || 1, ux = (bx - hx) / L, uy = (by - hy) / L;
  R.linea(ri(hx + 1), ri(hy), ri(bx + 1), ri(by), K); R.linea(ri(hx), ri(hy), ri(bx), ri(by), H('#a87a48'));
  for (let q = 0; q < 5; q++) { const cx = bx + ux * q, cy = by + uy * q, w = q < 1 ? 1 : 2; for (let s = -w; s <= w; s += 0.5) ps(cx - uy * s, cy + ux * s, Math.abs(s) > w - 0.6 ? K : s < 0 ? H('#9aa2ae') : H('#6a727e')); } };

// ── P1 · el mapa (1983): «people kept digging» (palas que cavan alrededor de Bedford); «a woman from Pennsylvania»:
//    Marilyn aparece de figurita en Pensilvania con su chincheta azul y baja en su ranchera hacia Bedford ──
const RUTA1 = (P) => { const a = P([-77.25, 40.62]), b = P([-79.52, 37.36]), c = P([-79.6, 39.5]); return (u) => [(1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]]; };
const cochecito = (x, y, ang) => { const ca = Math.cos(ang), sa = Math.sin(ang), Q = (i, j) => [ri(x + i * ca - j * sa), ri(y + i * sa + j * ca)];
  for (let i = -9; i <= 9; i += 0.5) for (let j = -4.5; j <= 4.5; j += 0.5) { const [px, py] = Q(i, j); R.pset(px, py, Math.abs(j) > 3.9 || Math.abs(i) > 8.4 ? K : Math.abs(j) > 2.4 ? H('#6a4020') : i > 2 && i < 6 ? H('#3a4a5e') : i >= 6 ? H('#ece0bc') : H('#d8c89c')); }
  for (const [i, j] of [[-5, -5], [5, -5], [-5, 5], [5, 5]]) { const [px, py] = Q(i, j); R.disco(px, py, 1.5, K); } };
const P1 = (t) => {
  const P = T.mapa(R, t, { zoom: 5.2, centro: [-78.5, 39.0] });
  const [bx, by] = P([-79.52, 37.36]).map(ri), [px, py] = P([-77.25, 40.62]).map(ri);
  // «kept digging»: hoyos con su pala que cavan a saltos alrededor de Bedford
  [[-78.7, 37.75], [-80.3, 37.05], [-79.85, 37.95], [-78.85, 36.95], [-80.45, 37.6], [-79.3, 36.75]].forEach(([lo, la], k) => {
    const t0 = TP.DIGGING - 0.25 + k * 0.2, p = pop(t, t0, 0.3); if (p <= 0) return; const [x, y] = P([lo, la]).map(ri), dig = Math.max(0, Math.sin(t * 7 + k * 1.7)) * 3;
    const yy = ri(y + 4 * (1 - Math.min(1, p))); elipse(x + 9, yy, 5, 3, H('#5a3a1e')); elipse(x + 9, yy - 1, 4, 2, H('#7a5430')); ps(x + 8, yy - 3, H('#9a7044'));
    elipse(x, yy + 1, 6, 3, H('#3a2414')); elipse(x, yy + 1, 5, 2, H('#160c06'));
    pala(x - 9, ri(yy - 18 + dig), x - 2, ri(yy - 4 + dig * 0.4));
    if (dig > 2.5) for (let q = 0; q < 3; q++) ps(x + 4 + q * 2, y - 3 - q, H('#9a7044')); });
  T.chincheta(R, bx, by, t, H('#d83a2a'), { pulso: true });
  // la ruta de Marilyn: rayitas rojas que se van trazando detrás de la ranchera
  const ruta = RUTA1(P), u = ease(tramo(t, TP.PENN + 0.45, TP.MARILYN + 0.6));
  for (let k = 0; k < 60; k++) { const a = k / 60; if (a > u) break; if (k % 2 === 0) { const [x, y] = ruta(a); ps(x, y, H('#c83a2a')); ps(x + 1, y, H('#c83a2a')); } }
  // Marilyn de figurita en Pensilvania: sale en «woman», señala al sur en «Pennsylvania» y se sube
  const sal = pop(t, TP.WOMAN - 0.15, 0.35), sube = t > TP.PENN + 0.45;
  T.chincheta(R, px + 6, py, t, H('#3a7ae8'), { baja: tramo(t, TP.PENN - 0.3, TP.PENN) });
  if (sal > 0 && !sube) { R.disco(px - 4, py + 1, 4, H('#8a7a5a')); R.actor(BL.parsonsBL, px - 12, ri(py + 2 - 4 * (1 - Math.min(1, sal))), t, { dir: 1, dedo: t > TP.PENN - 0.1, sonrisa: true }); }
  if (sube) { const [cx, cy] = ruta(u), [nx, ny] = ruta(Math.min(1, u + 0.02)); cochecito(cx, cy, Math.atan2(ny - cy, nx - cx));
    if (u < 1) for (let q = 1; q < 4; q++) tine(cx - (nx - cx) * q * 6, cy - (ny - cy) * q * 6 - q, H('#e8e0d0'), 0.5 - q * 0.12); }
};

// ── P2 · el alquiler de máquinas (fondo local, 1983): Marilyn llega a la ventanilla; en «cashed a check» enseña el cheque y
//    se lo da a la empleada, que le devuelve las llaves en «spent it»; en «renting a backhoe» se vuelve hacia la
//    excavadora, que arranca (humo y rotativo). El mecánico engrasa las orugas; una camioneta pasa por detrás de la alambrada ──
const MALLA = (x0, x1) => { for (let y = 98; y <= 132; y++) for (let x = Math.max(0, ri(x0)); x <= Math.min(319, ri(x1)); x++) if ((x + y) % 6 === 0 || (x - y + 600) % 6 === 0) ps(x, y, (x + y) % 12 === 0 ? H('#c8ccd2') : H('#8a9098')); };
const PATIO = () => fondoC('patio', 100, () => {
  // lomas lejanas, un depósito de agua y la fila de árboles
  for (let x = 0; x < 320; x++) { const yl = 82 + Math.sin(x * 0.02) * 5 + Math.sin(x * 0.07 + 1) * 2; for (let y = ri(yl); y <= 100; y++) ps(x, y, rmp(pal(['#5a7a8a', '#6a8a96', '#7e9aa2']), 1.2 + (y - yl) * 0.08 + (ns(x * 0.1, y * 0.1) - 0.5), x, y)); }
  rr(234, 54, 256, 66, H('#9aa6ae')); rr(234, 54, 256, 55, H('#c8d0d6')); rr(236, 66, 237, 92, H('#6a747c')); rr(253, 66, 254, 92, H('#6a747c')); R.linea(237, 70, 253, 88, H('#7a848c')); R.linea(253, 70, 237, 88, H('#7a848c'));
  R.poligono([[232, 54], [245, 47], [258, 54]], H('#7a868e'));
  for (let k = 0; k < 40; k++) { const x = h2(k, 1, 11) * 330 - 5, y = 92 + h2(k, 2, 11) * 4, r = 4 + h2(k, 3, 11) * 6; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j * 1.4 <= r * r) ps(x + i, y + j, rmp(pal(['#2a4a2a', '#3a5e30', '#4e763a', '#62884a']), 1.6 - j / r * 1.4 + (h2(x + i, y + j, 12) - 0.5), x + i, y + j)); }
  // la carretera de detrás de la alambrada
  for (let y = 100; y <= 112; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(pal(['#4a4a50', '#5a5a60', '#6a6a70']), 1 + (h2(x, y, 13) - 0.5) * 1.2, x, y));
  for (let x = 0; x < 320; x += 16) rr(x, 106, x + 7, 106, H('#e8c840'));
  // el suelo de grava, con roderas, manchas de aceite y matojos
  for (let y = 113; y < 180; y++) for (let x = 0; x < 320; x++) { const rod = Math.abs(y - 152 - Math.sin(x * 0.02) * 6) < 3 || Math.abs(y - 166 - Math.sin(x * 0.02 + 1) * 5) < 3;
    ps(x, y, rmp(pal(['#6a5e4e', '#7e705c', '#94846c', '#a8987e', '#bcae94']), 2.2 + (y - 113) * 0.01 + (ns(x * 0.3, y * 0.3) - 0.5) * 1.4 + (h2(x, y, 14) - 0.5) * 1.2 - (rod ? 0.9 : 0), x, y)); }
  for (let k = 0; k < 70; k++) { const x = h2(k, 1, 15) * 320, y = 120 + h2(k, 2, 15) * 58; ps(x, y, H('#c8bca4')); ps(x + 1, y, H('#4a4034')); }
  for (const [x, y, w] of [[176, 172, 14], [256, 160, 9], [66, 168, 8]]) for (let j = -2; j <= 2; j++) for (let i = -w; i <= w; i++) if ((i / w) ** 2 + (j / 2.5) ** 2 < 1 && h2(i, j, 16) > 0.15) tine(x + i, y + j, H('#2a2620'), 0.55);
  for (let k = 0; k < 50; k++) { const x = h2(k, 3, 17) * 320, a = 3 + h2(k, 4, 17) * 6; for (let i = 0; i < a; i++) ps(x + (i % 2), 133 - i, i < 2 ? H('#4a6a2a') : H('#6a8a3a')); }
  // la alambrada: postes, barra de arriba y la malla en rombos
  MALLA(0, 319);
  for (let x = 4; x < 320; x += 32) { rr(x, 94, x + 2, 134, H('#5a6068')); rr(x, 94, x, 134, H('#9aa2aa')); }
  rr(0, 96, 319, 97, H('#7a828a')); rr(0, 96, 319, 96, H('#b8c0c8'));
  // la caseta de alquiler: chapa ondulada, puerta, ventanilla con toldo y el cartel del tejado (excavadora y «$35»)
  for (let y = 66; y <= 150; y++) for (let x = 12; x <= 112; x++) ps(x, y, rmp(pal(['#7a8a96', '#94a4ae', '#b0bec6', '#c8d4da']), 2 - ((x % 4) === 0 ? 1.4 : (x % 4) === 1 ? -0.8 : 0) - (y > 140 ? 0.6 : 0) + (h2(x >> 2, y >> 3, 18) - 0.5) * 0.5, x, y));
  for (let y = 60; y <= 66; y++) rr(8, y, 116, y, y === 60 ? H('#d8dce0') : y === 66 ? H('#3a4048') : H('#6a7480'));
  for (let x = 14; x < 112; x += 7) ps(x, 67, H('#4a3a2a'));   // chorretones de óxido
  rr(17, 103, 39, 150, K); vetas(18, 104, 38, 150, pal(['#2a4a6a', '#3a5a7a', '#4a6a8a']), 3, 7, true); rr(21, 110, 35, 122, H('#9ac0d8')); rr(21, 110, 35, 110, H('#d8ecf4')); ps(35, 130, H('#e8d070')); ps(36, 130, H('#e8d070'));
  rr(55, 91, 99, 121, K); rr(56, 92, 98, 120, H('#3a3430')); for (let x = 58; x < 76; x += 3) for (let y = 95; y < 112; y += 4) ps(x, y, H('#e8c840'));   // el tablero de llaves
  rr(80, 95, 96, 109, H('#e8e0d0')); rr(80, 95, 96, 97, H('#c83a2a')); cifras('1983', 81, 100, H('#3a3430'));   // el calendario de dentro
  for (let x = 51; x <= 103; x++) for (let y = 83; y <= 90; y++) ps(x, y, (Math.floor((x - 51) / 5) % 2) ? H('#f4f0e8') : H('#e8782a'));
  for (let x = 51; x <= 103; x++) { const y = 91 + ((x % 5) < 3 ? 1 : 0); ps(x, y, (Math.floor((x - 51) / 5) % 2) ? H('#d8d4cc') : H('#b85a1a')); }
  rr(53, 120, 101, 123, H('#6a4a2a')); rr(53, 120, 101, 120, H('#b0885a'));
  rr(30, 56, 32, 60, H('#4a4a52')); rr(94, 56, 96, 60, H('#4a4a52'));
  rr(26, 34, 100, 56, K); rr(27, 35, 99, 55, H('#1e2a4a')); rr(27, 35, 99, 35, H('#3a4a7a'));
  rr(32, 48, 52, 51, H('#2a2a2e')); rr(38, 41, 47, 47, H('#e8b820')); rr(36, 44, 50, 47, H('#e8b820')); R.linea(47, 42, 58, 39, H('#e8b820')); R.linea(58, 39, 62, 48, H('#e8b820')); rr(60, 47, 64, 49, H('#e8b820'));
  cifras('$35', 70, 40, H('#f4f0e0'), 2);
  // neumáticos apilados, conos, la caja de herramientas roja y el palé de sacos
  for (let k = 0; k < 4; k++) { const y = 147 - k * 6; elipse(125, y, 10, 3, K); elipse(125, y, 9, 2, H('#2a2a2e')); elipse(125, y - 1, 4, 1, H('#1a1a1e')); R.linea(117, y - 1, 120, y - 2, H('#4a4a52')); }
  for (const x of [143, 153]) { R.poligono([[x - 4, 150], [x, 136], [x + 4, 150]], H('#e86a1a')); rr(x - 2, 142, x + 2, 144, H('#f4f0e8')); rr(x - 5, 150, x + 5, 151, H('#c84a10')); }
  rr(270, 124, 300, 150, K); for (let y = 125; y <= 149; y++) rr(271, y, 299, y, (y - 125) % 6 === 0 ? H('#7a1a14') : H(y < 130 ? '#d83a2a' : '#b82a22')); for (let y = 131; y < 150; y += 6) rr(282, y + 2, 288, y + 2, H('#c8c8d0'));
  for (let k = 0; k < 6; k++) { const x = 302 + (k % 3) * 6, y = 146 - Math.floor(k / 3) * 5; elipse(x, y, 3, 2, H('#8a7a52')); ps(x - 1, y - 1, H('#b8a678')); } rr(300, 150, 320, 152, H('#8a6a3a'));
  rr(306, 62, 307, 150, H('#7a828a')); ps(306, 61, H('#e8c840'));
});
const camioneta = (x, y) => { x = ri(x); rr(x, y - 7, x + 24, y - 2, H('#b83a2a')); rr(x + 14, y - 12, x + 23, y - 7, H('#b83a2a')); rr(x + 16, y - 11, x + 22, y - 8, H('#3a4a5e')); rr(x, y - 8, x + 13, y - 7, H('#8a2a1e'));
  rr(x, y - 2, x + 24, y - 2, K); for (const i of [5, 19]) { R.disco(x + i, y - 1, 2, K); ps(x + i, y - 1, H('#9a9aa2')); } ps(x + 24, y - 5, H('#f0e8a0')); };
const banderines = (t) => { for (let k = 0; k < 20; k++) { const u = k / 19, x = 114 + u * 192, y = 62 + Math.sin(u * Math.PI) * 9, sw = Math.sin(t * 5 + k * 0.8) * 1.5, c = [H('#d83a2a'), H('#e8c840'), H('#3a6ad8'), H('#f4f0e8')][k % 4];
    if (k < 19) R.linea(ri(x), ri(y), ri(x + 10), ri(62 + Math.sin((k + 1) / 19 * Math.PI) * 9), H('#3a3a40'));
    R.poligono([[ri(x + 2), ri(y + 1)], [ri(x + 7), ri(y + 1)], [ri(x + 4.5 + sw), ri(y + 7)]], c); } };
const P2 = (t) => {
  const { b, m } = PATIO();
  nubes(t, m, [18, 34, 48], 2); pajaros(t, m, 44, 2);
  // la camioneta que pasa por detrás de la alambrada
  const cx = lerp(-40, 340, tramo(t, TP.MARILYN + 0.4, TP.BACKHOE + 0.6)); if (cx > -40 && cx < 340) { camioneta(cx, 111); MALLA(cx - 2, cx + 27); for (let x = 4; x < 320; x += 32) if (x > cx - 4 && x < cx + 28) rr(x, 98, x + 2, 112, H('#5a6068')); }
  banderines(t);
  // la empleada tras la ventanilla (asoman cabeza y hombros)
  const cobra = t > TP.CHECK + 0.35 && t < TP.SPENT, da = t > TP.SPENT - 0.05 && t < TP.SPENT + 0.4;
  const em = R.actor(EL.cajera, 66, 127, t, { dir: 1, sostiene: cobra ? [86, 108] : da ? [92, 112] : false, sonrisa: t > TP.CHECK, habla: t > TP.CHECK + 0.3 && t < TP.SPENT + 0.4 && parp(t, 9) });
  repega(b, 53, 120, 102, 150);
  // Marilyn: llega, enseña el cheque, se lo da, coge las llaves y se vuelve a la excavadora
  const lle = ease(tramo(t, TP.MARILYN + 0.05, TP.CASHED - 0.15)), va = ease(tramo(t, TP.RENTING, TP.BECAUSE + 0.2));
  const mx = ri(lerp(-18, 100, lle) + 28 * va), anda = (lle > 0 && lle < 1) || (va > 0 && va < 1), vuelta = t > TP.RENTING;
  const ench = t > TP.CASHED - 0.05 && t < TP.CHECK + 0.05, llaves = t > TP.SPENT + 0.35;
  const ma = R.actor(BL.parsonsBL, mx, 150, t, { dir: vuelta ? 1 : -1, anda, sostiene: ench ? [97, 117] : llaves && !anda ? [mx + (vuelta ? 16 : -2), 118 + ri(Math.abs(Math.sin(t * 9)) * 2)] : llaves, dedo: t > TP.BACKHOE - 0.1 && va >= 1, sonrisa: t > TP.SPENT });
  const cheque = (x, y) => { x = ri(x); y = ri(y); rr(x - 8, y - 5, x + 8, y + 5, K); rr(x - 7, y - 4, x + 7, y + 4, H('#c8ecc0')); rr(x - 7, y - 4, x + 7, y - 4, H('#f0fff0')); R.linea(x - 6, y + 2, x - 1, y + 2, H('#3a7a3a')); R.linea(x - 6, y - 1, x - 3, y - 1, H('#7aa87a')); cifras('$', x + 2, y - 2, H('#1e5a1e')); destello(x + 7, y - 5, 2); };
  const vuela = tramo(t, TP.CHECK, TP.CHECK + 0.35);
  if (ench) cheque(ma.mano[0] - 2, ma.mano[1] - 4); else if (vuela > 0 && vuela < 1) cheque(lerp(95, 86, vuela), lerp(113, 104, vuela)); else if (cobra) cheque(em.mano[0] + 2, em.mano[1] - 3);
  const llav = (x, y) => { R.disco(x, y, 2, K); R.disco(x, y, 1, H('#e8c840')); rr(x + 1, y + 1, x + 5, y + 2, H('#c8c8d0')); rr(x + 4, y + 3, x + 5, y + 3, H('#c8c8d0')); rr(x - 4, y - 1, x - 2, y + 3, H('#e8b820')); };
  if (da) llav(em.mano[0] + 2, em.mano[1] - 2); else if (llaves) llav(ma.mano[0] + 1, ma.mano[1] - 2);
  // la excavadora: en «backhoe» arranca (tiembla, bocanadas por el escape, el rotativo ámbar)
  const vivo = t > TP.BACKHOE, tb = vivo ? Math.sin(t * 40) * 0.6 : 0;
  const ex = excav(150 + tb, 166, 2, 0, true, 1);
  if (vivo) { for (let q = 0; q < 4; q++) bocanada(ex.escape[0], ex.escape[1] - 2, ((t - TP.BACKHOE) * 1.2 + q / 4) % 1, 2 + (t - TP.BACKHOE < 0.4 ? 2 : 0));
    const g = Math.floor(t * 8) % 2; rr(ex.faro[0] - 2, ex.faro[1] - 3, ex.faro[0] + 2, ex.faro[1] - 1, g ? H('#ffb020') : H('#8a5a10')); if (g) luz(ex.faro[0], ex.faro[1] - 2, 10, H('#ffd060'), 0.5); }
  else rr(ex.faro[0] - 2, ex.faro[1] - 3, ex.faro[0] + 2, ex.faro[1] - 1, H('#8a5a10'));
  // el mecánico engrasa la oruga con la aceitera; en «backhoe» se aparta y levanta el pulgar
  const ap = ease(tramo(t, TP.BACKHOE + 0.1, TP.BACKHOE + 0.7)), mcx = ri(lerp(244, 258, ap));
  const me = R.actor(EL.operario, mcx, 158, t, { dir: -1, anda: ap > 0 && ap < 1, sostiene: ap <= 0 ? [mcx - 3, 148 + ri(Math.sin(t * 6) * 2)] : true, dedo: ap >= 1, sonrisa: ap >= 1 });
  if (ap <= 0) { const [ax, ay] = me.mano; rr(ax - 3, ay - 1, ax + 1, ay + 3, H('#c83a2a')); R.linea(ax - 3, ay - 1, ax - 7, ay + 2, H('#8a8a92')); if (Math.sin(t * 6) > 0.7) ps(ax - 8, ay + 4, H('#2a2a1a')); }
};

// ── P3 · la mesa de la cocina desde arriba (fondo local): el folleto abierto y su croquis de la iglesia (setos, valla,
//    camino, sin una sola tumba); la mano de Marilyn toca el folleto en «convinced», rodea en rojo un trozo de hierba en
//    «unmarked plot», lo tacha con una X y en «church» toca la iglesia del croquis. El café humea; una mosca se posa ──
const MANTEL = () => fijo('mantel', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const cx = Math.floor((x + 3) / 9) % 2, cy = Math.floor((y + 5) / 9) % 2, tr = (x + y) % 2;
    const pl = Math.sin(x * 0.035 + y * 0.02) * 0.4 + Math.sin(y * 0.09 - x * 0.01) * 0.25, base = cx && cy ? 0 : cx || cy ? 1 : 2;
    const R3 = [pal(['#8a1a1a', '#a82424', '#c03030', '#d24040']), pal(['#c86a6a', '#d88282', '#e8a0a0', '#f0b8b8']), pal(['#c8c0b8', '#dcd6ce', '#ece8e2', '#f8f6f2'])][base];
    ps(x, y, rmp(R3, 2 + pl + (tr ? 0.25 : -0.25) + (h2(x, y, 21) - 0.5) * 0.4, x, y)); }
  // el mapa de carreteras doblado (arriba a la izquierda, bajo la barra del año)
  for (let y = 26; y <= 58; y++) for (let x = 8; x <= 60; x++) ps(x, y, (x - 8) % 13 === 0 ? H('#b8b09a') : ns(x * 0.15, y * 0.15) > 0.6 ? H('#b8d8a0') : H('#ece6d0'));
  R.linea(10, 54, 58, 30, H('#c83a2a')); R.linea(12, 40, 58, 48, H('#3a6ab8')); R.linea(26, 26, 34, 58, H('#c8a040')); for (let k = 0; k < 6; k++) ps(14 + k * 8, 46 - k * 3, K);
  for (let x = 9; x <= 61; x++) tine(x, 59, K, 0.3);
  // el croquis en papel cuadriculado
  for (let y = 24; y <= 158; y++) for (let x = 106; x <= 236; x++) { tine(x + 3, y + 3, K, 0.25); }
  for (let y = 22; y <= 156; y++) for (let x = 104; x <= 234; x++) ps(x, y, (x - 104) % 6 === 0 || (y - 22) % 6 === 0 ? H('#c8d8e8') : rmp(pal(['#e8e4d8', '#f4f2ea', '#fcfbf6']), 1.6 + (ns(x * 0.1, y * 0.1) - 0.5) * 0.6, x, y));
  const lap = H('#6a6a76'), ver = H('#4a8a3a'), verL = H('#7ab85a');
  for (let x = 108; x <= 230; x++) { ps(x, 142, lap); ps(x, 150, lap); if (x % 8 < 4) ps(x, 146, lap); }   // el camino
  for (let x = 108; x <= 230; x++) for (let k = 0; k < 3; k++) ps(x, 72 + k * 3 + Math.sin(x * 0.9 + k) * 1.5, k === 1 ? verL : ver);   // el seto
  for (let x = 108; x <= 230; x++) { ps(x, 86, lap); ps(x, 90, lap); if (x % 5 === 0) for (let y = 84; y <= 92; y++) ps(x, y, lap); }   // la valla
  for (let y = 96; y <= 136; y++) for (let x = 108; x <= 230; x++) if ((x + y * 2) % 7 === 0 && h2(x, y, 22) > 0.35) ps(x, y, verL);   // la hierba rayada
  for (const [x, y, r] of [[122, 50, 9], [150, 44, 7], [234 - 12, 104, 0]]) if (r) { for (let a = 0; a < 6.28; a += 0.12) ps(x + Math.cos(a) * r + Math.sin(a * 5) * 1.2, y + Math.sin(a) * r, ver); R.linea(x, y + r, x, y + r + 8, lap); }
  // la iglesia del croquis: muros, tejado, campanario y aguja
  R.linea(190, 46, 222, 46, lap); R.linea(190, 46, 190, 66, lap); R.linea(222, 46, 222, 66, lap); R.linea(190, 66, 222, 66, lap); R.linea(186, 47, 206, 36, lap); R.linea(206, 36, 226, 47, lap);
  R.linea(200, 36, 200, 26, lap); R.linea(212, 36, 212, 26, lap); R.linea(200, 26, 212, 26, lap); R.linea(200, 26, 206, 16 + 6, lap); R.linea(212, 26, 206, 22, lap);
  rr(204, 56, 208, 65, lap); for (const x of [195, 215]) rr(x, 52, x + 2, 56, lap);
  // la flecha que va del camino a la hierba
  R.linea(170, 140, 160, 126, lap); R.linea(160, 126, 164, 128, lap); R.linea(160, 126, 159, 130, lap);
  // la taza (vista de arriba), las gafas, las llaves con la chapa amarilla y un lápiz
  for (let j = -12; j <= 12; j++) for (let i = -12; i <= 16; i++) { const d = Math.hypot(i, j); if (d <= 12) ps(262 + i, 84 + j, d > 11 ? K : d > 8.5 ? rmp(pal(['#b8b4ac', '#dcd8d0', '#f4f2ee']), 1 + (i < 0 ? 1 : 0) - (j > 0 ? 0.6 : 0), 262 + i, 84 + j) : d > 8 ? H('#3a2010') : H(i + j < -6 ? '#6a3a1a' : '#4a2410')); }
  for (let j = -4; j <= 4; j++) for (let i = 12; i <= 18; i++) { const d = Math.hypot(i - 15, j); if (d > 2 && d < 4.5) ps(262 + i, 84 + j, d > 3.8 ? K : H('#dcd8d0')); }
  ps(257, 80, H('#c89a6a')); ps(258, 80, H('#c89a6a'));
  for (const gx of [268, 284]) for (let a = 0; a < 6.28; a += 0.2) ps(gx + Math.cos(a) * 6, 136 + Math.sin(a) * 4, K); R.linea(274, 136, 278, 136, K); R.linea(262, 134, 254, 130, K); R.linea(290, 134, 298, 130, K);
  for (const gx of [268, 284]) { ps(gx - 2, 134, H('#ffffff')); ps(gx - 1, 133, H('#ffffff')); }
  R.disco(254, 160, 3, K); R.disco(254, 160, 2, H('#c8c8d0')); rr(256, 160, 266, 162, H('#a8a8b0')); rr(242, 156, 250, 164, K); rr(243, 157, 249, 163, H('#e8c020'));
  R.linea(26, 150, 70, 168, H('#e8c040')); R.linea(26, 151, 70, 169, H('#a88020')); ps(25, 150, K); ps(71, 169, H('#e88aa0')); ps(72, 169, H('#e88aa0'));
});
const P3 = (t) => {
  MANTEL();
  // el rayo de sol con las motas
  for (let k = 0; k < 10; k++) { const u = (t * 0.07 + h2(k, 1, 23)) % 1, x = 30 + h2(k, 2, 23) * 120 + u * 30, y = 70 + h2(k, 3, 23) * 90 - u * 20; tine(x, y, H('#fff8e0'), 0.6 * Math.sin(u * Math.PI)); }
  T.d_folleto(R, 54, 98, { escala: 2, abierto: 1, t });
  // el vapor del café
  for (let k = 0; k < 14; k++) { const u = (t * 0.35 + k / 14) % 1, x = 262 + Math.sin(u * 6 + k) * (2 + u * 4), y = 80 - u * 26; tine(x, y, H('#ffffff'), 0.45 * (1 - u)); tine(x + 1, y, H('#ffffff'), 0.25 * (1 - u)); }
  // la mosca que da vueltas y se posa en la mesa
  { const u = (t * 0.25) % 1, quieta = u > 0.55, fx = quieta ? 84 : 84 + Math.cos(t * 3.1) * 26, fy = quieta ? 150 : 150 + Math.sin(t * 4.3) * 12; ps(fx, fy, K); ps(fx + 1, fy, K); if (!quieta || Math.sin(t * 30) > 0) { ps(fx, fy - 1, H('#c8d8e8')); ps(fx + 1, fy - 1, H('#c8d8e8')); } }
  // la tinta roja: el círculo y la X que se van trazando
  const C0 = [150, 116], circ = tramo(t, TP.UNMARKED, TP.PLOT - 0.05), x1 = tramo(t, TP.PLOT, TP.PLOT + 0.25), x2 = tramo(t, TP.PLOT + 0.25, TP.PLOT + 0.5), RO = H('#d82a2a');
  for (let a = 0; a < circ * 6.6; a += 0.04) { const px = C0[0] + Math.cos(a - 1.6) * (17 + Math.sin(a * 3) * 0.8), py = C0[1] + Math.sin(a - 1.6) * 13; ps(px, py, RO); ps(px + 1, py, RO); }
  if (x1 > 0) { R.linea(C0[0] - 8, C0[1] - 7, ri(C0[0] - 8 + 16 * x1), ri(C0[1] - 7 + 14 * x1), RO); R.linea(C0[0] - 7, C0[1] - 7, ri(C0[0] - 7 + 16 * x1), ri(C0[1] - 7 + 14 * x1), RO); }
  if (x2 > 0) { R.linea(C0[0] + 8, C0[1] - 7, ri(C0[0] + 8 - 16 * x2), ri(C0[1] - 7 + 14 * x2), RO); R.linea(C0[0] + 7, C0[1] - 7, ri(C0[0] + 7 - 16 * x2), ri(C0[1] - 7 + 14 * x2), RO); }
  const ig = pop(t, TP.CHURCH, 0.3); if (ig > 0) { luz(206, 46, 26, H('#fff0a0'), 0.4 * Math.min(1, ig)); destello(226, 30, 3); }
  // la mano de Marilyn con el rotulador rojo: el folleto, la hierba, el círculo, la X y la iglesia
  let tx = 340, ty = 210;
  const K1 = [[TP.BECAUSE + 0.1, 340, 210], [TP.CONVINCED - 0.05, 66, 104], [TP.CONVINCED + 0.15, 66, 108], [TP.CONVINCED + 0.5, 70, 100], [TP.TREASURE + 0.1, 70, 100], [TP.TREASURE + 0.6, 152, 108], [TP.UNMARKED - 0.05, 150, 103]];
  if (t < TP.UNMARKED) { for (let k = 0; k < K1.length - 1; k++) { const [a0, x0, y0] = K1[k], [a1, xx, yy] = K1[k + 1]; if (t >= a0 && t < a1) { const u = ease((t - a0) / (a1 - a0)); tx = lerp(x0, xx, u); ty = lerp(y0, yy, u); } }
    if (t >= K1[K1.length - 1][0]) { tx = 150; ty = 103; } if (t > TP.TREASURE + 0.6) { tx += Math.sin(t * 5) * 2; } }
  else if (t < TP.PLOT) { const a = circ * 6.6 - 1.6; tx = C0[0] + Math.cos(a) * 17; ty = C0[1] + Math.sin(a) * 13; }
  else if (t < TP.PLOT + 0.25) { tx = C0[0] - 8 + 16 * x1; ty = C0[1] - 7 + 14 * x1; }
  else if (t < TP.PLOT + 0.5) { tx = C0[0] + 8 - 16 * x2; ty = C0[1] - 7 + 14 * x2; }
  else { const u = ease(tramo(t, TP.PLOT + 0.55, TP.CHURCH - 0.05)); tx = lerp(C0[0] - 8, 206, u); ty = lerp(C0[1] + 7, 50, u) + (t > TP.CHURCH && t < TP.CHURCH + 0.2 ? 2 : 0); }
  const wx = ri(tx + 7), wy = ri(ty + 7);
  T.brazo(R, wx + 50, 214, wx, wy, '#5a7ab0', -1, { codo: [wx + 40, Math.min(200, wy + 34)] });
  for (let i = 0; i < 13; i++) { const px = wx - 7 + i, py = wy - 7 + ri(i * 0.5); R.pset(px, py, i < 2 ? H('#e82a2a') : i < 10 ? H('#c82a2a') : H('#f4f0e8')); R.pset(px, py + 1, i < 2 ? H('#8a1a1a') : i < 10 ? H('#8a1a1a') : H('#c8c4bc')); }
};
'''

PARSONS2 = r'''
// ── P4 · la valla de la iglesia, de cerca (bedford·iglesia·valla): Marilyn llega decidida; en «on purpose» señala la
//    tierra junto a la excavadora y en «prove it» levanta los brazos. GAG del detector: Atom barre la hierba, el detector
//    se le pega a sus propias órbitas y pita como loco; al final saca de la tierra… una percha ──
const detector = (mx, my, dx, dy, pita, t) => { for (const d of [-1, 0, 1]) R.linea(ri(mx) + d, ri(my), ri(dx) + d, ri(dy - 3), d ? K : H('#b8c0c8'));
  const bx = lerp(mx, dx, 0.28), by = lerp(my, dy, 0.28); rr(bx - 4, by - 3, bx + 4, by + 2, K); rr(bx - 3, by - 2, bx + 3, by + 1, H('#3a3a44')); rr(bx - 1, by - 1, bx + 1, by, pita && Math.floor(t * 12) % 2 ? H('#ff3a2a') : H('#5a1a14'));
  for (let j = -2; j <= 1; j++) for (let i = -9; i <= 9; i++) { const e = (i / 9) ** 2 + (j / 2.5) ** 2; if (e <= 1) ps(dx + i, dy + j, e > 0.6 ? K : j < 0 ? H('#e8c020') : H('#2a2a30')); }
  if (pita) for (let k = 0; k < 3; k++) { const r = 6 + ((t * 14 + k * 4) % 12); for (let a = -2.5; a < -0.6; a += 0.1) ps(dx + Math.cos(a) * r, dy - 4 + Math.sin(a) * r, H('#fff070')); } };
const percha = (x, y) => { x = ri(x); y = ri(y); const c = H('#d8dce2'), cs = H('#8a9098');
  for (const [a, b, c2, d] of [[0, -18, 0, -12], [0, -12, -16, 0], [0, -12, 16, 0], [-16, 0, 16, 0]]) { R.linea(x + a, y + b, x + c2, y + d, c); R.linea(x + a, y + b + 1, x + c2, y + d + 1, cs); }
  R.linea(x, y - 18, x + 3, y - 20, c); R.linea(x + 3, y - 20, x + 5, y - 18, c); ps(x - 16, y, K); ps(x + 16, y, K); };
const P4 = (t) => {
  const o = { encuadre: 'iglesia', camara: 'valla' }; T.bedford(R, t, o);
  // la tierra que suelta la excavadora parada: terrones que ruedan por el montón
  for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1; ps(288 - u * 18, 150 + u * u * 10, H('#5a3a1e')); }
  // Marilyn entra decidida, señala la tierra en «on purpose» y alza los brazos en «prove it»
  const ent = ease(tramo(t, TP.GRAVEYARD + 0.1, TP.PURPOSE - 0.35)), mx = ri(lerp(-18, 132, ent) + 16 * ease(tramo(t, TP.PROVE + 0.7, TP.IMAGINE + 0.3)));
  R.actor(BL.parsonsBL, mx, 150, t, { dir: 1, anda: (ent > 0 && ent < 1) || (t > TP.PROVE + 0.7), dedo: t > TP.PURPOSE - 0.1 && t < TP.PROVE - 0.05, brazos: t > TP.PROVE - 0.05 && t < TP.PROVE + 0.7, habla: t > TP.PURPOSE - 0.1 && t < TP.PROVE + 0.6 && parp(t, 9), enfado: t < TP.PROVE });
  // Atom (escala 2) con el detector: barre la hierba; en «went there» el disco se le pega a sus propias órbitas y pita
  // como loco (se gira para quitárselo de encima); en «prove it» rebusca y saca de la tierra… una percha
  const PEGA = TP.WENT - 0.25, SUELTA = TP.PURPOSE + 0.35, SACA = TP.PROVE + 0.05;
  const pegado = t > PEGA && t < SUELTA, gira = t > PEGA + 0.4 && t < SUELTA - 0.1, sg = Math.sin((t - PEGA) * 8);
  const dir = gira && sg > 0 ? -1 : 1, ax = ri(52 + (gira ? sg * 4 : 0));
  const saca = tramo(t, SACA, SACA + 0.5), tiene = saca >= 1;
  const a = AT.atom(R, ax, 172, t, { s: 2, dir, pose: saca > 0 ? 'sostiene' : t > SUELTA ? 'piensa' : 'sostiene', cara: tiene ? 'triste' : pegado ? 'sorpresa' : 'normal', habla: 0 });
  const [hx, hy] = a.mano;
  if (saca <= 0) { let dx = hx + 22 * dir + Math.sin(t * 4) * 10, dy = 173;
    if (pegado) { const c = a.centro || [ax, 140]; dx = c[0] + 12 * dir + Math.sin(t * 14) * 2; dy = c[1] + 6; }
    else if (t > SUELTA) { dx = hx + 20; dy = 173; }
    detector(hx, hy, dx, dy, pegado, t);
    if (pegado) globo('!', ax - 6 + (Math.floor(t * 6) % 2) * 12, 108, pop(t, PEGA, 0.2), H('#fff070'));
    if (t > SUELTA) globo('?', ax - 4, 110, pop(t, SUELTA, 0.25)); }
  else { // la percha sale de la tierra hasta la mano, con terrones; el detector, tirado en la hierba
    for (let i = -9; i <= 9; i++) { ps(ax + 26 + i, 175, Math.abs(i) > 7 ? K : H('#e8c020')); } R.linea(ax + 26, 174, ax + 6, 160, H('#9aa2aa'));
    const px = lerp(hx + 20, hx + 2, ease(saca)), py = lerp(178, hy + 2, ease(saca)); percha(px, py);
    if (saca < 1) for (let k = 0; k < 6; k++) ps(hx + 14 + k * 3, 176 - saca * 14 - (k % 3) * 2, H('#5a3a1e'));
    if (tiene) globo('?', ax - 4, 108, pop(t, SACA + 0.5, 0.25)); }
  T.bedfordDelante(R, t, o);
};

// ── P5 · la iglesia de lejos (bedford·iglesia): la excavadora cava junto al seto; en «Imagine how that ended» llega el
//    coche del sheriff con el rotativo; la excavadora se para y Marilyn baja; en «arrested» el sheriff le habla y le
//    señala el coche; en «desecrating» ella va al coche cabizbaja y él detrás. Un vecino mira desde el camino ──
let COCHE = null;
const cocheSprite = () => { if (COCHE) return COCHE; const a = R.nuevo(), b = R.nuevo();
  const prev = R.usar(a); T.bedford(R, 0, { encuadre: 'iglesia' }); R.usar(b); T.bedford(R, 0, { encuadre: 'iglesia', sheriff: true }); R.usar(prev);
  COCHE = []; for (let y = 112; y < 152; y++) for (let x = 16; x < 92; x++) { const i = y * 320 + x; if (a[i] !== b[i]) COCHE.push([x - 26, y, b[i]]); } return COCHE; };
const coche = (x, t) => { for (const [dx, y, c] of cocheSprite()) R.pset(ri(x + dx), y, c);
  const g = Math.floor(t * 6) % 2, X0 = ri(x); rr(X0 + 20, 126, X0 + 26, 127, g ? H('#ff3a2a') : H('#6a1a14')); rr(X0 + 27, 126, X0 + 33, 127, g ? H('#2a3a6a') : H('#3a7aff'));
  const fx = g ? X0 + 23 : X0 + 30; for (let i = 1; i < 5; i++) { ps(fx - i, 126, g ? H('#ff8a7a') : H('#8ab0ff')); ps(fx + i, 126, g ? H('#ff8a7a') : H('#8ab0ff')); } };
const P5 = (t) => {
  const llega = tramo(t, TP.IMAGINE + 0.15, TP.ENDED + 0.2), aqui = llega >= 1, cava = t < TP.WITH - 0.2;
  const o = { encuadre: 'iglesia', excavadora: cava ? 1 : 0, sheriff: aqui }; T.bedford(R, t, o);
  const cx = lerp(-80, 26, 1 - Math.pow(1 - llega, 3));
  if (!aqui && llega > 0) { coche(cx, t); for (let k = 0; k < 6; k++) { const u = (t * 2 + k / 6) % 1; tine(cx - 4 - u * 22, 144 - u * 8 + h2(k, 1, 30) * 3, H('#c8b898'), 0.6 * (1 - u)); } }
  if (aqui && t < TP.ENDED + 0.9) for (let k = 0; k < 6; k++) { const u = cl((t - TP.ENDED - 0.2) * 1.4 + k * 0.05); tine(16 - u * 20 + k * 3, 142 - u * 10, H('#c8b898'), 0.5 * (1 - u)); }
  // el vecino del camino (a la derecha) se para a mirar; en «arrested» se lleva un susto
  const vx = ri(lerp(296, 262, ease(tramo(t, TP.IMAGINE, TP.WITH))));
  R.actor(EL.vecina, vx, 158, t, { dir: -1, anda: t > TP.IMAGINE && t < TP.WITH, sorpresa: t > TP.ARRESTED && t < TP.CEMETERY, triste: t > TP.CEMETERY });
  if (t > TP.ARRESTED) globo('!', vx + 4, 124, pop(t, TP.ARRESTED, 0.25));
  // Marilyn baja de la excavadora y se acerca; en «desecrating» va al coche cabizbaja
  const baja = t > TP.WITH - 0.1, ida = ease(tramo(t, TP.DESECRATING + 0.15, TP.CEMETERY + 0.9));
  const mxp = ri(lerp(150, 120, ease(tramo(t, TP.WITH - 0.1, TP.ARRESTED + 0.1))) - 54 * ida), dentroM = ida >= 1;
  // el sheriff sale del coche, se acerca, le habla en «arrested», le señala el coche, se aparta y la sigue
  const sal = t > TP.ENDED + 0.55, sx0 = ri(lerp(66, 92, ease(tramo(t, TP.ENDED + 0.6, TP.ARRESTED - 0.1)))), aparta = ease(tramo(t, TP.DESECRATING, TP.DESECRATING + 0.5)), sigue = ease(tramo(t, TP.CEMETERY + 0.3, TP.COUPLE - 0.1));
  const sx = ri(sx0 + 12 * aparta - 36 * sigue), dentroS = sigue >= 1;
  if (sal && !dentroS) R.actor(BL.sheriffBL, sx, 150, t, { dir: t > TP.ARRESTED + 0.55 && t < TP.DESECRATING ? -1 : sigue > 0 && sigue < 1 ? -1 : 1, anda: (t > TP.ENDED + 0.6 && t < TP.ARRESTED - 0.1) || (aparta > 0 && aparta < 1) || (sigue > 0 && sigue < 1), dedo: t > TP.ARRESTED - 0.05 && t < TP.DESECRATING, habla: t > TP.ARRESTED - 0.05 && t < TP.DESECRATING && parp(t, 9) });
  if (baja && !dentroM) R.actor(BL.parsonsBL, mxp, 152, t, { dir: -1, anda: (t > TP.WITH - 0.1 && t < TP.ARRESTED + 0.1) || (ida > 0 && ida < 1), triste: t > TP.ARRESTED + 0.2, sorpresa: t > TP.WITH + 0.1 && t < TP.ARRESTED + 0.2 });
  // ya junto al coche: el coche por delante de los dos (se suben)
  if (aqui && (ida > 0.6 || sigue > 0.6)) coche(26, t);
  T.bedfordDelante(R, t, o);
};

// ── P6 · la cárcel del condado (fondo local): «a couple of months»: pasan dos días y dos noches de golpe (dos lunas) con
//    Marilyn tras los barrotes; en «and the advice» se abre la puerta, sale ella y el sheriff, en el umbral, le señala la
//    carretera y le menea el dedo en «never»; ella sube a la ranchera y se va; en «Virginia» la señal se tacha con una X ──
const CARCEL = () => fondoC('carcel', 104, () => {
  for (let x = 0; x < 320; x++) { const yl = 86 + Math.sin(x * 0.025 + 2) * 6 + Math.sin(x * 0.08) * 2; for (let y = ri(yl); y <= 104; y++) ps(x, y, rmp(pal(['#4a6a5a', '#5a7e62', '#6e9270']), 1 + (y - yl) * 0.1 + (ns(x * 0.12, y * 0.12) - 0.5), x, y)); }
  for (let k = 0; k < 30; k++) { const x = 200 + h2(k, 1, 31) * 130, y = 98 + h2(k, 2, 31) * 6, r = 4 + h2(k, 3, 31) * 5; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j * 1.3 <= r * r) ps(x + i, y + j, rmp(pal(['#2a4a2a', '#3a5e30', '#4e763a', '#62884a']), 1.6 - j / r * 1.4 + (h2(x + i, y + j, 32) - 0.5), x + i, y + j)); }
  // el césped, la acera de losas, el bordillo y la carretera
  for (let y = 105; y < 180; y++) for (let x = 0; x < 320; x++) {
    if (y < 154) ps(x, y, rmp(pal(['#4a6e2a', '#5a8232', '#6e963c', '#82aa48']), 1.8 + (ns(x * 0.2, y * 0.3) - 0.5) * 1.4 + (h2(x, y, 33) - 0.5) * 0.8, x, y));
    else if (y < 161) ps(x, y, (x % 22 === 0 || y === 154) ? H('#8a8a84') : rmp(pal(['#a8a69c', '#bab8ae', '#cccac0']), 1.2 + (h2(x, y, 34) - 0.5), x, y));
    else if (y < 163) ps(x, y, y === 161 ? H('#d8d6cc') : H('#6a6a64'));
    else ps(x, y, rmp(pal(['#3a3a40', '#46464c', '#525258', '#5e5e64']), 1.6 + (h2(x, y, 35) - 0.5) * 1.6 + (y > 176 ? -0.5 : 0), x, y)); }
  for (let x = 0; x < 320; x += 20) rr(x, 172, x + 9, 172, H('#d8d6cc'));
  // el edificio de ladrillo (x 34–206, y 46–148)
  for (let y = 46; y <= 148; y++) for (let x = 34; x <= 206; x++) { const fila = Math.floor(y / 4), off = fila % 2 ? 4 : 0, junta = y % 4 === 0 || (x + off) % 8 === 0;
    ps(x, y, junta ? H('#8a7a6a') : rmp(pal(['#6a2a1e', '#7e3424', '#92402c', '#a84e36']), 1.6 + (h2(Math.floor((x + off) / 8), fila, 36) - 0.5) * 1.6 + (x > 196 ? -0.8 : 0), x, y)); }
  const PIE = pal(['#9a9284', '#b4ac9c', '#ccc4b4', '#e0d8c8']);
  for (const [y0, y1] of [[44, 51], [94, 98], [140, 148]]) for (let y = y0; y <= y1; y++) for (let x = 32; x <= 208; x++) ps(x, y, rmp(PIE, y === y0 ? 3 : y === y1 ? 0.4 : 2 + (h2(x, y, 37) - 0.5), x, y));
  for (let x = 34; x <= 206; x += 6) rr(x, 52, x + 2, 54, H('#ccc4b4'));
  // las ventanas con barrotes (la del segundo piso a la derecha es la de Marilyn: dentro, luz)
  const ven = (x, y, w, h, clara) => { rr(x - 2, y - 3, x + w + 2, y - 1, PIE[2]); rr(x - 3, y + h, x + w + 3, y + h + 2, PIE[3]); rr(x, y, x + w, y + h, K);
    for (let j = y + 1; j < y + h; j++) for (let i = x + 1; i < x + w; i++) ps(i, j, clara ? rmp(pal(['#8a7a62', '#a8967a', '#c4b090']), 1 + (j - y) / h + (h2(i, j, 38) - 0.5), i, j) : rmp(pal(['#1e2a3a', '#2e3e52', '#4a5e76']), 0.8 + (i - x - j + y > 0 ? 1 : 0) * 0.6, i, j)); };
  for (const x of [46, 72, 150, 176]) { ven(x, 62, 14, 24, x === 150); ven(x, 104, 14, 24, false); }
  // la entrada: pilastras, frontón, la placa sin letras, la puerta verde, los faroles y los escalones
  for (let y = 100; y <= 148; y++) for (let x = 102; x <= 138; x++) if (x < 108 || x > 132) ps(x, y, rmp(PIE, 1.8 + (x === 102 || x === 133 ? 0.8 : 0) + (h2(x, y, 39) - 0.5), x, y));
  R.poligono([[100, 100], [120, 90], [140, 100]], (x, y) => rmp(PIE, 2 + (x < 120 ? 0.6 : -0.4), x, y)); R.linea(100, 100, 140, 100, PIE[0]);
  rr(112, 104, 128, 110, H('#8a6a2a')); rr(113, 105, 127, 109, H('#c8a04a')); ps(114, 105, H('#f0d88a'));
  rr(111, 115, 129, 146, K); vetas(112, 116, 128, 146, pal(['#1e3a2a', '#2a4a36', '#3a5e44']), 9, 8, true); R.linea(120, 116, 120, 146, K); ps(118, 132, H('#e8c840')); ps(122, 132, H('#e8c840'));
  for (const x of [105, 135]) { rr(x - 2, 110, x + 2, 118, K); rr(x - 1, 111, x + 1, 117, H('#f0e0a0')); }
  for (let k = 0; k < 3; k++) rr(100 - k * 3, 148 + k * 2, 140 + k * 3, 149 + k * 2, k % 2 ? PIE[1] : PIE[2]);
  // matorrales al pie de la fachada, la boca de riego y el mástil
  for (let k = 0; k < 14; k++) { const x = 38 + k * 12 + (k > 4 ? 44 : 0), r = 5 + h2(k, 1, 40) * 2; if (x > 206) continue; for (let j = -r; j <= 2; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) ps(x + i, 150 + j, rmp(pal(['#1e3a1e', '#2a4e26', '#3a6430', '#4e7a3a']), 1.8 - j / r + (h2(x + i, j, 41) - 0.5), x + i, 150 + j)); }
  rr(214, 144, 220, 154, K); rr(215, 145, 219, 153, H('#d83a2a')); rr(213, 147, 221, 148, H('#a82a22')); ps(216, 145, H('#ff8a7a'));
  rr(229, 36, 230, 152, H('#8a9098')); rr(229, 36, 229, 152, H('#d8dce0')); R.disco(230, 35, 1, H('#e8c840'));
  // la señal verde de la carretera: el contorno de Virginia y una flecha
  rr(305, 112, 306, 162, H('#7a828a')); rr(289, 92, 318, 113, K); rr(290, 93, 317, 112, H('#2a7a4a')); R.linea(291, 94, 316, 94, H('#f4f0e8')); R.linea(291, 111, 316, 111, H('#f4f0e8'));
  R.poligono([[293, 106], [298, 104], [301, 100], [305, 101], [309, 97], [313, 101], [314, 106]], H('#f4f0e8'));
});
const P6 = (t) => {
  const { b, m } = CARCEL();
  nubes(t, m, [20, 34, 50], 6); pajaros(t, m, 50, 6);
  // la bandera que ondea en el mástil
  for (let j = 0; j < 12; j++) for (let i = 0; i < 20; i++) { const yy = 37 + j + Math.sin(t * 4 - i * 0.45) * (i / 20) * 2, c = i < 8 && j < 6 ? (((i + j) % 2) && i % 2 ? H('#f4f0e8') : H('#2a3a7a')) : (Math.floor(j / 2) % 2 ? H('#f4f0e8') : H('#c83a2a'));
    ps(231 + i, yy, rmp([mez(c, K, 0.35), c], Math.sin(t * 4 - i * 0.45) > 0 ? 1 : 0.4, 231 + i, ri(yy))); }
  // el árbol de la esquina: sus hojas pasan de verdes a doradas con los dos meses
  const otono = cl((t - TP.COUPLE) / 2.6), HOJ = [pal(['#1e4a1e', '#2e6228', '#427e34', '#5a9a42']), pal(['#6a3a10', '#9a5a18', '#c88a24', '#e8b440'])];
  rr(14, 90, 21, 150, H('#4a3020')); rr(14, 90, 15, 150, H('#6a4a30'));
  for (let y = 40; y <= 100; y++) for (let x = 0; x <= 40; x++) { const d = ((x - 18) / 22) ** 2 + ((y - 70) / 30) ** 2 + (ns(x * 0.25 + 3, y * 0.25) - 0.5) * 0.6; if (d > 1) continue;
    const v = 2.2 - (y - 40) / 30 + (ns(x * 0.5, y * 0.5 + t * 0.4) - 0.5) * 1.4; ps(x, y, h2(x, y, 42) < otono ? rmp(HOJ[1], v, x, y) : rmp(HOJ[0], v, x, y)); }
  if (otono > 0.3) for (let k = 0; k < 5; k++) { const u = (t * 0.5 + k / 5) % 1; ps(6 + k * 7 + Math.sin(u * 9) * 3, 80 + u * 70, HOJ[1][2]); }
  // Marilyn tras los barrotes (recortada al hueco de la ventana) mientras pasan los días
  if (t < TP.AND2 + 0.1) { R.recorte([151, 63, 163, 85]); R.actor(BL.parsonsBL, ri(149 + Math.sin(t * 0.9) * 1.5), 94, t, { dir: -1, triste: true }); R.recorte(null);
    for (let x = 153; x < 164; x += 3) rr(x, 63, x, 85, H('#2a2a30')); rr(151, 72, 163, 72, H('#2a2a30')); }
  // dos días y dos noches de golpe: la luz baja dos veces, se encienden las ventanas y cruzan dos lunas
  const ph = (t - TP.COUPLE - 0.1) / 1.25, noche = ph > 0 && ph < 2 ? 0.62 * Math.sin(ph * Math.PI) ** 2 : 0;
  if (noche > 0.02) { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) tine(x, y, H('#0a1236'), noche);
    for (const x of [46, 72, 176]) for (let j = 105; j < 128; j++) for (let i = x + 1; i < x + 14; i++) tine(i, j, H('#ffd070'), noche * 0.7);
    const lx = 150 + (ph % 1) * 110, ly = 70 - Math.sin((ph % 1) * Math.PI) * 30; if (m(lx, ly)) { R.disco(ri(lx), ri(ly), 5, H('#f4f0d8')); R.disco(ri(lx) + 2, ri(ly) - 1, 4, mez(H('#f4f0d8'), H('#0a1236'), 0.6 * (1 - noche))); } }
  for (let k = 0; k < 2; k++) { const p = pop(t, TP.MONTHS - 0.1 + k * 0.45, 0.3); if (p > 0 && t < TP.AND2) R.icono('luna', 246 + k * 16, ri(62 - 3 * Math.min(1, p)), H('#f4e8a0'), K, 2); }
  // se abre la puerta en «and the advice»: sale Marilyn hacia la ranchera; el sheriff en el umbral señala la carretera
  const ab = ease(tramo(t, TP.AND2 - 0.05, TP.AND2 + 0.35));
  if (ab > 0) { rr(112, 116, 128, 146, H('#2a241e')); luz(120, 132, 16, H('#ffe0a0'), 0.35 * ab); const w = ri(8 * (1 - ab)); if (w > 0) { rr(112, 116, 112 + w, 146, H('#2a4a36')); rr(128 - w, 116, 128, 146, H('#2a4a36')); } }
  const sale = tramo(t, TP.AND2 + 0.1, TP.SET + 0.35), dentro = sale >= 1;
  const sheriffSale = t > TP.ADVICE + 0.3;
  if (sheriffSale) R.actor(BL.sheriffBL, 113, 146, t, { dir: 1, dedo: t > TP.ADVICE && t < TP.VIRGINIA + 0.6, habla: t > TP.ADVICE && t < TP.AGAIN + 0.3 && parp(t, 9), enfado: t > TP.NEVER && t < TP.FOOT });
  if (sale > 0 && !dentro) { const x = ri(lerp(113, 246, sale)), y = ri(sale < 0.12 ? 146 + sale / 0.12 * 12 : 158); const pa = R.actor(BL.parsonsBL, x, y, t, { dir: 1, anda: true, triste: true, sostiene: true }); const [hx, hy] = pa.mano; rr(hx - 4, hy, hx + 4, hy + 6, K); rr(hx - 3, hy + 1, hx + 3, hy + 5, H('#8a5a3a')); rr(hx - 3, hy + 1, hx + 3, hy + 1, H('#b07a50')); }
  // la ranchera arranca y se va por la derecha
  const va = tramo(t, TP.FOOT + 0.25, TP.AGAIN + 0.95), rx = 230 + 140 * va * va;
  ranchera(rx, 174, 1, t * (va > 0 ? 1 : 0));
  if (va > 0 && va < 1) for (let q = 0; q < 3; q++) bocanada(rx - 2, 170, ((t - TP.FOOT) * 1.6 + q / 3) % 1, 2);
  // en «Virginia» la señal se ilumina y se tacha con una X roja
  const vi = pop(t, TP.VIRGINIA - 0.05, 0.3);
  if (vi > 0) { luz(303, 102, 22, H('#fff0a0'), 0.35); R.icono('X', 296, ri(95 - 3 * (1 - Math.min(1, vi))), H('#ff3a2a'), K, 3); }
};

T.rodar(E, R, [[0, P1], [TP.MARILYN, P2], [TP.BECAUSE, P3], [TP.GRAVEYARD, P4], [TP.IMAGINE, P5], [TP.COUPLE, P6]], {
  efectos: [[TP.DIGGING, 'pop'], [TP.PENN, 'toc'], [TP.CASHED + 0.05, 'papel'], [TP.SPENT + 0.25, 'tic'], [TP.BACKHOE, 'arranque'],
    [TP.UNMARKED + 0.05, 'lapiz'], [TP.CHURCH, 'toc'], [TP.WENT - 0.2, 'bip'], [TP.PURPOSE - 0.3, 'bip'], [TP.PROVE + 0.1, 'boing'],
    [TP.IMAGINE + 0.2, 'coche'], [TP.ENDED + 0.55, 'puerta'], [TP.CEMETERY + 0.9, 'puerta'], [TP.AND2, 'cerrojo'], [TP.FOOT + 0.25, 'arranque'], [TP.VIRGINIA, 'pop']],
  cartela: '1983', año: 1983 });
'''

CAB_PARSONS = r'''// bl-parsons (frase 23, cartela 1983). Seis planos cortados en la voz inglesa:
// 1 · El mapa (zoom 3,6 sobre Pensilvania–Virginia): en «kept digging» brotan hoyos con palas alrededor de Bedford; en
//   «a woman from Pennsylvania» Marilyn sale de figurita junto a su chincheta azul y baja en su ranchera. Corta en «Marilyn».
// 2 · El alquiler de máquinas (fondo local): cheque en «cashed a check», llaves en «spent it», y en «renting a backhoe»
//   arranca la excavadora (humo y rotativo); el mecánico se aparta; una camioneta pasa tras la alambrada. Corta en «because».
// 3 · La mesa de la cocina desde arriba (fondo local): el folleto y el croquis (iglesia, seto, valla, sin tumbas); la mano
//   rodea en rojo la hierba en «unmarked plot», la tacha y toca la iglesia en «church». Corta en «graveyard».
// 4 · La valla de cerca (bedford·iglesia·valla): Marilyn señala en «on purpose» y alza los brazos en «prove it». GAG del
//   detector: pita por las órbitas de Atom y al final saca una percha. Corta en «Imagine».
// 5 · La iglesia de lejos (bedford·iglesia): llega el sheriff; la excavadora se para; en «arrested» le señala el coche y
//   se la lleva; un vecino se asusta. Corta en «a couple of months».
// 6 · La cárcel (fondo local): dos días y dos noches de golpe con ella tras los barrotes; en «the advice» sale, el sheriff
//   le señala la carretera y le menea el dedo en «never»; la ranchera se va; en «Virginia» la señal se tacha con una X.'''

E['bl-parsons'] = ('Marilyn Parsons', CAB_PARSONS, tabla('TP', TP, 'excavadora') + COMUN + PARSONS + PARSONS2)

COMPARTIDO = r'''
// ════ BL-GILLOGLY (lo compartido con bl-azar: la pausa congela G7, G4, G5, G2 y G3 con estas MISMAS funciones) ════
const FCG = new Map();
const fondoG = (clave, yc, resto, k = 0) => { const b = fijo(clave, () => { cieloT(0, yc, k); FCG.set(clave, R.buf.slice()); resto(); }); return { b, m: mascara(clave, b, FCG.get(clave), yc) }; };
const LETRAS_T = [TG.L0, TG.L1, TG.L2, TG.L3, TG.L4, TG.L5, TG.L6, TG.L7, TG.L8, TG.L9, TG.L10, TG.L11, TG.L12, TG.L13, TG.L14, TG.L15, TG.L16, TG.L17, TG.L18, TG.L19];
// cuántas letras de la tira ha dicho ya la voz (con decimales: la última aparece en 0,15 s) y cuál es la última
const dichas = (t) => { let k = 0; while (k < 20 && t >= LETRAS_T[k]) k++; if (k === 0) return [0, -1]; return [k - 1 + cl((t - LETRAS_T[k - 1]) / 0.15), k - 1]; };

// ── G1 · la fachada de RAND en Santa Mónica (fondo local, 1980): edificio de cintas de ventanas, palmeras, el mar; en el
//    golpe (2,5 s) un destello de sol barre los cristales; Jim llega con su maletín, se cruza con un compañero que le
//    saluda, pasa un coche, y en «Rand Corporation» se abren las puertas de cristal y entra ──
const RANDF = () => fondoG('randF', 96, () => {
  // el mar a la derecha, la arena y la orilla
  for (let y = 66; y <= 88; y++) for (let x = 232; x < 320; x++) ps(x, y, rmp(pal(['#1e5a8a', '#2a6e9e', '#3a84b2', '#5a9cc4']), 3 - (y - 66) * 0.1 + (ns(x * 0.2, y * 0.6) - 0.5) * 1.2, x, y));
  for (let y = 88; y <= 98; y++) for (let x = 232; x < 320; x++) ps(x, y, rmp(pal(['#c8b088', '#dcc49c', '#ecd8b4']), 1.4 + (h2(x, y, 51) - 0.5) * 1.2, x, y));
  for (let y = 98; y <= 142; y++) for (let x = 232; x < 320; x++) { const carril = y >= 118 && y <= 124; ps(x, y, carril ? (y === 121 && x % 8 < 4 ? H('#e8e4d8') : rmp(pal(['#6a6a70', '#7a7a80', '#8a8a90']), 1 + (h2(x, y, 57) - 0.5), x, y)) : y > 134 ? rmp(pal(['#9a968a', '#aeaa9e', '#c2beb2']), 1.2 + (y === 135 ? 1 : 0) + (h2(x, y, 58) - 0.5), x, y) : rmp(pal(['#c0a880', '#d4bc94', '#e6d2ac', '#f0e0c0']), 1.6 + Math.sin(x * 0.12 + y * 0.3) * 0.5 + (h2(x, y, 59) - 0.5) * 1.1, x, y)); }
  for (let k = 0; k < 18; k++) { const x = 234 + h2(k, 1, 60) * 84, y = 102 + h2(k, 2, 60) * 12; for (let i = -3; i <= 3; i++) ps(x + i, y - Math.abs(i) * 0.6, i % 2 ? H('#5a8a3a') : H('#c84a7a')); }
  rr(292, 74, 306, 82, H('#f4f0e8')); rr(293, 82, 294, 92, H('#8a7a62')); rr(304, 82, 305, 92, H('#8a7a62')); R.poligono([[290, 74], [299, 68], [308, 74]], H('#d83a2a'));
  // el edificio: pretil, dos cintas de ventanas con montantes y antepechos de hormigón claro
  const HOR = pal(['#a89c88', '#bcb09a', '#d0c4ac', '#e2d8c2']);
  for (let y = 50; y <= 142; y++) for (let x = 0; x <= 232; x++) ps(x, y, rmp(HOR, 1.8 + (ns(x * 0.12, y * 0.12) - 0.5) * 1 + (h2(x, y, 52) - 0.5) * 0.5 - (x > 224 ? 1 : 0), x, y));
  for (let x = 0; x <= 234; x++) { ps(x, 50, H('#f0e8d8')); ps(x, 51, H('#e2d8c2')); ps(x, 55, H('#8a806e')); }
  for (const [y0, y1] of [[62, 80], [94, 110]]) { for (let y = y0; y <= y1; y++) for (let x = 0; x <= 228; x++) { const mon = x % 10 === 0;
      ps(x, y, mon ? H('#5a6470') : rmp(pal(['#2a4a6a', '#3a6286', '#5a86aa', '#8ab0cc', '#c8e0ee']), 1 + (y1 - y) / (y1 - y0) * 2.4 + ((x + y * 2) % 37 < 4 ? 1.4 : 0), x, y)); }
    for (let x = 0; x <= 228; x++) { ps(x, y0 - 1, H('#6a6458')); ps(x, y1 + 1, H('#f0e8d8')); ps(x, y1 + 2, H('#8a806e')); } }
  for (let k = 0; k < 6; k++) { const x = 8 + k * 38; rr(x, 100, x + 6, 108, H('#e8e0c8')); rr(x + 1, 101, x + 5, 103, H('#c8c0a8')); }   // persianas a medio bajar
  rr(20, 40, 56, 49, H('#8a8a8a')); rr(20, 40, 56, 40, H('#b8b8b8')); for (let x = 24; x < 54; x += 4) rr(x, 42, x + 2, 47, H('#5a5a5a')); rr(190, 44, 204, 49, H('#9a9a9a'));
  // la marquesina y las puertas de cristal
  rr(138, 112, 186, 116, H('#5a5248')); rr(138, 112, 186, 112, H('#a89c88'));
  rr(149, 116, 175, 142, H('#2a2a30')); for (let y = 117; y <= 141; y++) for (let x = 150; x <= 174; x++) ps(x, y, rmp(pal(['#1e2a36', '#2e4252', '#4a6478']), 1 + (x - y + 120) * 0.02, x, y));
  // las jardineras con agaves, el césped, la acera y la calle
  for (let y = 142; y <= 150; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(pal(['#3a6a2a', '#4a7e32', '#5e963e']), 1.4 + (h2(x, y, 53) - 0.5) * 1.4, x, y));
  for (let k = 0; k < 9; k++) { const x = 14 + k * 26 + (k > 4 ? 24 : 0); if (x > 140 && x < 186) continue; for (let i = -4; i <= 4; i++) R.linea(x, 146, x + i * 1.6, 138 - (4 - Math.abs(i)) * 1.4, i % 2 ? H('#6a9a6a') : H('#4a7a5a')); }
  for (let y = 151; y <= 159; y++) for (let x = 0; x < 320; x++) ps(x, y, (x % 20 === 0 || y === 151) ? H('#9a968a') : rmp(pal(['#bab6aa', '#cccac0', '#dedcd2']), 1.2 + (h2(x, y, 54) - 0.5), x, y));
  for (let x = 0; x < 320; x++) { ps(x, 160, H('#e8e6dc')); ps(x, 161, H('#6a6a64')); }
  for (let y = 162; y < 180; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(pal(['#3a3a40', '#46464c', '#525258']), 1.2 + (h2(x, y, 55) - 0.5) * 1.6, x, y));
  for (let x = 0; x < 320; x += 18) rr(x, 171, x + 9, 171, H('#e8c840'));
});
const palmera = (x, base, alto, t, k) => { for (let j = 0; j < alto; j++) { const xx = x + Math.sin(j / alto * 1.6) * 6; rr(xx - 1, base - j, xx + 1, base - j, j % 4 === 0 ? H('#6a5232') : H('#8a6a42')); }
  const tx = x + Math.sin(1.6) * 6, ty = base - alto;
  for (let f = 0; f < 7; f++) { const a = -Math.PI / 2 + (f - 3) * 0.55 + Math.sin(t * 1.6 + f + k) * 0.06; for (let s = 0; s < 18; s++) { const px = tx + Math.cos(a) * s, py = ty + Math.sin(a) * s * 0.6 + (s * s) * 0.04; if (py < 46 && px > 270) continue; ps(px, py, s % 3 === 0 ? H('#2a5a2a') : H('#3e7a34')); ps(px, py + 1, H('#2a4a22')); } }
  R.disco(ri(tx), ri(ty + 2), 2, H('#6a4a22')); };
const G1 = (t) => {
  const { m } = RANDF();
  nubes(t, m, [18, 32, 44], 11);
  // las olas y los destellos del mar, las gaviotas
  for (let k = 0; k < 16; k++) { const x = 234 + ((h2(k, 1, 56) * 90 + t * 6) % 86), y = 68 + h2(k, 2, 56) * 18; if (Math.sin(t * 5 + k) > 0.3) { ps(x, y, H('#e8f4ff')); ps(x + 1, y, H('#e8f4ff')); } }
  for (let x = 232; x < 320; x++) if (Math.sin(x * 0.3 + t * 3) > 0.4) ps(x, 87 + ri(Math.sin(t * 2 + x * 0.1)), H('#f4f8fc'));
  pajaros(t, m, 54, 3);
  palmera(246, 150, 92, t, 0); palmera(276, 150, 80, t, 2);
  // el golpe: un destello de sol barre las cintas de cristal
  const g = tramo(t, TG.GOLPE - 0.05, TG.GOLPE + 0.55); if (g > 0 && g < 1) for (const [y0, y1] of [[62, 80], [94, 110]]) for (let y = y0; y <= y1; y++) { const cx = -20 + g * 280 + (y - y0) * 0.6; for (let x = ri(cx); x < cx + 10; x++) if (x >= 0 && x <= 228 && x % 10) tine(x, y, H('#ffffff'), 0.7 * Math.sin(g * Math.PI)); }
  // el compañero que sale y saluda; Jim que llega con el maletín
  const ab = ease(tramo(t, TG.RAND + 0.6, TG.CORP + 0.8)) - ease(tramo(t, TG.JIM + 0.6, TG.JIM + 1.0));
  const sal = tramo(t, 1.4, TG.CORP), cx2 = ri(lerp(156, -24, sal));
  if (sal < 1) R.actor(EL.oficinista, cx2, 156, t, { dir: -1, anda: true, sostiene: true, habla: t > 2.9 && t < 3.6, dedo: t > 2.9 && t < 3.6 });
  const lle = tramo(t, 1.3, TG.CORP + 0.35), jx = ri(lerp(-20, 152, lle) + 8 * ease(tramo(t, TG.CORP + 0.7, TG.JIM + 0.3)));
  const dentro = t > TG.CORP + 0.9;
  if (dentro) R.recorte([149, 100, 175, 142]);
  if (t < TG.JIM + 0.4) { const a = R.actor(BL.gilloglyBL, jx, 156, t, { dir: 1, anda: lle < 1 || dentro, sostiene: true, sonrisa: t > 2.9 && t < 3.8 }); const [hx, hy] = a.mano; rr(hx - 4, hy + 1, hx + 5, hy + 8, K); rr(hx - 3, hy + 2, hx + 4, hy + 7, H('#5a3a22')); rr(hx - 3, hy + 2, hx + 4, hy + 2, H('#8a5a34')); rr(hx, hy, hx + 1, hy + 1, K); }
  R.recorte(null);
  // las hojas de las puertas de cristal se abren hacia los lados
  const w = ri(12 * cl(ab));
  for (let y = 117; y <= 141; y++) { for (let x = 150; x <= 161 - w; x++) tine(x, y, H('#a8c8e0'), 0.35); for (let x = 163 + w; x <= 174; x++) tine(x, y, H('#a8c8e0'), 0.35); }
  rr(161 - w, 117, 162 - w, 141, H('#c8ccd0')); rr(162 + w, 117, 163 + w, 141, H('#c8ccd0'));
  // un coche de 1980 que pasa por delante
  const cc = tramo(t, TG.COMPUTER, TG.CORP + 0.6); if (cc > 0 && cc < 1) ranchera(lerp(340, -70, cc), 176, -1, t, pal(['#2a4a7a', '#3a62a0', '#5a82c0', '#8ab0e0']));
};

// ── G2 · el despacho de 1980 (buscadores·rand): Jim entra, se sienta al terminal en «did something» y teclea; un compañero
//    cruza con un café y señala la pizarra en «done»; el ventilador y la persiana viven solos ──
const G2 = (t) => {
  const o = { encuadre: 'rand' }; T.buscadores(R, t, o);
  const u = tramo(t, TG.JIM + 0.1, TG.DID - 0.05), x = ri(lerp(-16, 186, ease(u))), y = ri(lerp(150, 146, cl((x - 120) / 40))), sent = u >= 1;
  const col = tramo(t, TG.JIM + 0.4, TG.CAREFULLY + 1.0), cx = ri(lerp(150, 30, col) + (t > TG.DONE - 0.2 && t < TG.CAREFULLY + 0.1 ? 0 : 0));
  const para = t > TG.DONE - 0.3 && t < TG.CAREFULLY + 0.2, cxp = para ? ri(lerp(150, 30, tramo(TG.DONE - 0.3, TG.JIM + 0.4, TG.CAREFULLY + 1.0))) : cx;
  R.actor(EL.oficinista2 || EL.oficinista, cxp, 152, t, { dir: -1, anda: !para && col > 0 && col < 1, sostiene: true, dedo: para, habla: para && parp(t, 9) });
  const teclea = sent && t > TG.DID;
  R.actor(BL.gilloglyBL, x, y, t, { dir: 1, anda: u > 0 && u < 1, sostiene: teclea ? [212, 136 + (Math.floor(t * 9) % 2)] : false, sonrisa: t > TG.CAREFULLY });
  T.buscadoresDelante(R, t, o);
};

// ── G3 · el escritorio desde arriba (fondo local): la hoja 1 a escala 3 y la Declaración en fotocopia; la mano con el lápiz
//    va del número a su palabra y la primera letra baja a la tira de resultados; en «first sheet» brilla la hoja; en
//    «where the vault is» sale la cámara de las ollas con su «?». Al final la mano se retira ──
const DECL = [[150, 50], [204, 74], [178, 98], [158, 122], [214, 136]];   // las palabras que va eligiendo (centro del bloque)
const ESCR = () => fijo('escr', () => {
  vetas(0, 0, 319, 179, pal(['#3a2214', '#4e2e1a', '#643c22', '#7a4c2c', '#8e5c36']), 5, 22);
  // el secante verde con sus esquinas de cuero
  for (let y = 16; y <= 172; y++) for (let x = 30; x <= 256; x++) ps(x, y, rmp(pal(['#1e3a2a', '#2a4a34', '#365a40', '#44694c']), 1.8 + (ns(x * 0.08, y * 0.08) - 0.5) * 1.2 + (h2(x, y, 61) - 0.5) * 0.5, x, y));
  for (const [cx, cy, sx, sy] of [[30, 16, 1, 1], [256, 16, -1, 1], [30, 172, 1, -1], [256, 172, -1, -1]]) R.poligono([[cx, cy], [cx + 18 * sx, cy], [cx, cy + 18 * sy]], H('#5a2a1a'));
  // la Declaración en fotocopia: cabecera en barra y renglones de palabras-bloque, con marquitas rojas de cuenta
  for (let y = 26; y <= 162; y++) for (let x = 140; x <= 238; x++) tine(x + 3, y + 3, K, 0.3);
  for (let y = 24; y <= 160; y++) for (let x = 138; x <= 236; x++) ps(x, y, rmp(pal(['#cfcbc0', '#e2ded4', '#f0ede6']), 1.5 + (h2(x, y, 62) - 0.5) * 0.8 + (x > 228 ? -0.6 : 0), x, y));
  rr(150, 30, 224, 34, H('#3a3a40')); rr(162, 37, 212, 38, H('#6a6a72'));
  for (let y = 44; y <= 154; y += 6) { let x = 144; while (x < 230) { const w = 3 + ri(h2(x, y, 63) * 9); if (x + w > 230) break; rr(x, y, x + w, y + 1, H('#4a4a52')); if (h2(x, y, 64) > 0.86) ps(x, y - 2, H('#c83a2a')); x += w + 3; } }
  // la tira de resultados (papel continuo con agujeros) bajo la hoja
  for (let y = 146; y <= 166; y++) for (let x = 36; x <= 132; x++) ps(x, y, (y === 146 || y === 166) ? H('#9aa89a') : (x - 36) % 8 === 4 && (y === 149 || y === 163) ? H('#2a4a34') : rmp(pal(['#d8e2d4', '#e8f0e4', '#f4faf0']), 1.4 + (h2(x, y, 65) - 0.5) * 0.6, x, y));
  for (let x = 44; x < 128; x += 12) rr(x, 152, x + 9, 160, H('#c8d4c4'));
  // una carpeta de cartulina cerrada en la esquina de arriba a la derecha (la de Atom queda tranquila)
  for (let y = 0; y <= 52; y++) for (let x = 258; x < 320; x++) { tine(x - 3, y + 3, K, 0.25); }
  for (let y = 0; y <= 50; y++) for (let x = 262; x < 320; x++) ps(x, y, rmp(pal(['#c8a86a', '#d4b67a', '#dcc088']), 1.2 + (h2(x, y, 68) - 0.5) * 0.35, x, y));
  rr(262, 50, 319, 50, H('#a8884a')); rr(262, 0, 262, 50, H('#a8884a')); rr(270, 44, 290, 47, H('#b8985a'));
  // la calculadora, el taco de fichas perforadas, los clips, la taza y las virutas del sacapuntas
  rr(262, 118, 302, 164, K); rr(263, 119, 301, 163, H('#3a3a40')); rr(266, 122, 298, 132, H('#1a1010'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { rr(267 + i * 8, 136 + j * 7, 272 + i * 8, 140 + j * 7, i === 3 ? H('#c86a2a') : H('#a8a8b0')); ps(267 + i * 8, 136 + j * 7, H('#d8d8e0')); }
  for (let k = 0; k < 3; k++) { rr(266 + k * 2, 60 + k * 2, 312 + k * 2, 82 + k * 2, H('#8a7a5a')); rr(267 + k * 2, 61 + k * 2, 311 + k * 2, 81 + k * 2, H('#e8d8a8')); }
  for (let y = 66; y < 86; y += 4) for (let x = 274; x < 312; x += 3) if (h2(x, y, 66) > 0.55) rr(x, y, x + 1, y + 1, H('#3a3020'));
  for (const [x, y] of [[262, 96], [270, 100], [284, 98]]) { R.linea(x, y, x + 6, y, H('#c8ccd2')); R.linea(x, y + 2, x + 6, y + 2, H('#c8ccd2')); ps(x + 6, y + 1, H('#c8ccd2')); }
  for (let j = -11; j <= 11; j++) for (let i = -11; i <= 15; i++) { const d = Math.hypot(i, j); if (d <= 11) ps(14 + i, 150 + j, d > 10 ? K : d > 7.5 ? rmp(pal(['#8a3a2a', '#b84a34', '#d86a50']), 1 + (i < 0 ? 1 : 0), 14 + i, 150 + j) : H(i + j < -5 ? '#6a3a1a' : '#4a2410')); }
  for (let k = 0; k < 12; k++) ps(292 + h2(k, 1, 67) * 16, 168 + h2(k, 2, 67) * 8, k % 2 ? H('#c89a5a') : H('#e8c040'));
});
const G3 = (t) => {
  ESCR();
  luz(160, 70, 120, H('#fff4d8'), 0.16);
  // la calculadora: las cifras rojas cambian
  cifras(String(1000 + Math.floor(t * 7) % 9000), 270, 125, H('#ff4a3a'));
  // el vapor del café
  for (let k = 0; k < 10; k++) { const u = (t * 0.35 + k / 10) % 1; tine(14 + Math.sin(u * 6 + k) * (2 + u * 4), 146 - u * 24, H('#ffffff'), 0.4 * (1 - u)); }
  const brillo = Math.max(0, 1 - Math.abs(t - (TG.FIRST + TG.SHEET) / 2) / 0.5) * 0.8;
  const hoja = T.d_hoja(R, 82, 94, { escala: 3, n: 1, t, brillo });
  const [nx0, ny0] = hoja.primera;
  // las cinco elecciones: número de la hoja → palabra de la Declaración → letra a la tira de resultados
  const PK = [TG.APPLIED + 0.1, TG.DECL + 0.45, TG.SHEET + 0.35, TG.SAYS - 0.2, TG.VAULT + 0.05];
  const NUM = (k) => [nx0 + (k % 3) * 14 + 4, ny0 + Math.floor(k / 3) * 10 + 1];
  let tx = 330, ty = 200;
  for (let k = 0; k < 5; k++) { const t0 = PK[k], [qx, qy] = NUM(k), [dx, dy] = DECL[k];
    const ida = tramo(t, t0 + 0.15, t0 + 0.45), baja = tramo(t, t0 + 0.45, t0 + 0.8);
    if (ida > 0) { for (let s = 0; s < ida; s += 0.04) if (Math.floor(s * 25) % 2 === 0) ps(lerp(qx, dx, s), lerp(qy, dy, s) - Math.sin(s * Math.PI) * 10, H('#c83a2a')); }
    if (ida >= 1) { rr(dx - 6, dy - 2, dx + 6, dy + 3, H('#ffe070')); rr(dx - 5, dy - 1, dx + 5, dy + 2, H('#e8b020')); }
    if (baja > 0) { const lx = ri(lerp(dx, 46 + k * 12, ease(baja))), ly = ri(lerp(dy, 154, ease(baja))); if (baja < 1) { rr(lx - 3, ly - 3, lx + 3, ly + 3, H('#fff0a0')); } else letra('kcopa'[k], 45 + k * 12, 152, H('#2a2a30'), 2); } }
  // la mano con el lápiz: salta de la hoja a la Declaración en cada elección y se retira al final
  for (let k = 0; k < 5; k++) { const t0 = PK[k], [qx, qy] = NUM(k), [dx, dy] = DECL[k];
    if (t >= t0 - 0.25 && t < t0 + 0.15) { const u = ease(tramo(t, t0 - 0.25, t0 + 0.05)), [px, py] = k ? DECL[k - 1] : [330, 200]; tx = lerp(px, qx, u); ty = lerp(py, qy, u); }
    else if (t >= t0 + 0.15 && t < (k < 4 ? PK[k + 1] - 0.25 : 99)) { const u = ease(tramo(t, t0 + 0.15, t0 + 0.45)); tx = lerp(qx, dx, u); ty = lerp(qy, dy, u) - Math.sin(u * Math.PI) * 10; } }
  if (t < PK[0] - 0.25) { tx = 330; ty = 200; }
  const sale = ease(tramo(t, TG.TO - 0.45, TG.TO - 0.1)); tx = lerp(tx, 340, sale); ty = lerp(ty, 214, sale);
  // en «where the vault is»: la mano da dos golpecitos en la hoja y sale la cámara con sus tres ollas y una «?»
  const va = pop(t, TG.VAULT - 0.1, 0.35);
  if (va > 0) { const cx = 82, cy = ri(28 - 3 * (1 - Math.min(1, va))); luz(cx, cy + 10, 34, H('#fff0a0'), 0.45);
    rr(cx - 22, cy - 6, cx + 22, cy + 24, K); for (let j = cy - 5; j <= cy + 23; j++) for (let i = cx - 21; i <= cx + 21; i++) ps(i, j, ((Math.floor((j - cy) / 5) + (Math.floor((i - cx + (Math.floor((j - cy) / 5) % 2) * 4) / 8))) % 2) && ((j - cy) % 5 && (i - cx + (Math.floor((j - cy) / 5) % 2) * 4) % 8) ? H('#9a9284') : (j - cy) % 5 === 0 || (i - cx + (Math.floor((j - cy) / 5) % 2) * 4) % 8 === 0 ? H('#5a5448') : H('#aaa292'));
    rr(cx - 17, cy + 2, cx + 17, cy + 22, H('#2a2018'));
    for (const ox of [-10, 0, 10]) { R.disco(cx + ox, cy + 16, 5, K); R.disco(cx + ox, cy + 16, 4, H('#3a3a44')); rr(cx + ox - 3, cy + 11, cx + ox + 3, cy + 12, H('#ffd040')); ps(cx + ox - 1, cy + 10, H('#fff8c0')); destello(cx + ox + 2, cy + 9, 1); }
    globo('?', cx + 26, cy - 2, va); }
  const wx = ri(tx + 7), wy = ri(ty + 7);
  if (wx < 330) { T.brazo(R, wx + 46, 214, wx, wy, '#c8c0a8', -1, { codo: [wx + 38, Math.min(200, wy + 32)] });
    for (let i = 0; i < 13; i++) { const px = wx - 7 + i, py = wy - 7 + ri(i * 0.5); R.pset(px, py, i < 2 ? H('#3a3a3a') : i < 11 ? H('#e8c040') : H('#e88aa0')); R.pset(px, py + 1, i < 2 ? H('#3a3a3a') : i < 11 ? H('#a88020') : H('#c86a80')); } }
};

// ── G4 · el terminal de cerca (buscadores·rand·pantalla): «to see what letters came out»: la pantalla se llena de filas
//    de letras revueltas que suben; la mano teclea; en «almost all» corren más deprisa; en «gibberish» la mano se aparta
//    y salta una «?» enorme ──
const G4pant = (R2, rc, t) => { const [x0, y0, x1, y1] = rc, AM = H('#ffb040'), AMS = H('#a86a20');
  const rate = t < TG.ALMOST ? 7 : 16, filas = t < TG.SEE ? 0 : (t < TG.ALMOST ? (t - TG.SEE) * 7 : (TG.ALMOST - TG.SEE) * 7 + (t - TG.ALMOST) * 16), n = Math.floor(filas), fr = filas - n;
  R.recorte([x0 + 2, y0 + 2, x1 - 2, y1 - 2]);
  for (let k = 0; k <= 14; k++) { const f = n - k; if (f < 0) break; const y = ri(y1 - 12 - k * 7 + (1 - fr) * 0);
    const largo = k === 0 ? Math.floor(fr * 44) : 44; for (let i = 0; i < largo; i++) letra(galima(f, i), x0 + 6 + i * 4, y, (f + i) % 5 ? AM : AMS); }
  if (Math.sin(t * 8) > 0) rp(x0 + 6 + (Math.floor(fr * 44) % 44) * 4, y1 - 12, x0 + 8 + (Math.floor(fr * 44) % 44) * 4, y1 - 8, AM);
  R.recorte(null); };
const G4 = (t) => {
  const o = { encuadre: 'rand', camara: 'pantalla', pantalla: G4pant }; const g = T.buscadores(R, t, o);
  const q = pop(t, TG.GIBBERISH, 0.35);
  if (q > 0) { const [x0, y0, x1, y1] = g.pantalla || [64, 32, 256, 126]; luz((x0 + x1) / 2, (y0 + y1) / 2, 40, H('#ffd080'), 0.25); rr((x0 + x1) / 2 - 16, (y0 + y1) / 2 - 22 - 4 * (1 - Math.min(1, q)), (x0 + x1) / 2 + 14, (y0 + y1) / 2 + 16 - 4 * (1 - Math.min(1, q)), H('#1a0e04')); R.icono('?', ri((x0 + x1) / 2 - 10), ri((y0 + y1) / 2 - 16 - 4 * (1 - Math.min(1, q))), H('#ffd060'), K, 4); }
  T.buscadoresDelante(R, t, o);
  // la mano que teclea (y se aparta en «gibberish»)
  const sale = ease(tramo(t, TG.GIBBERISH - 0.2, TG.GIBBERISH + 0.4)), teclea = t > TG.SEE - 0.2 && sale <= 0;
  const wx = ri(lerp(118 + (teclea ? (Math.floor(t * 6) % 3) * 8 : 0), 60, sale)), wy = ri(lerp(166 + (teclea && Math.floor(t * 12) % 2 ? 2 : 0), 196, sale));
  T.brazo(R, wx - 60, 214, wx, wy, '#c8c0a8', 1, { codo: [wx - 34, Math.min(204, wy + 26)] });
};

// ── G5 · el rincón de la impresora (fondo local): la matricial escupe galimatías; Jim lee el papel; en «appeared» la
//    impresora se calla; en «hair stand on end» da un respingo con «!»; en «a run of letters» se enciende una fila de la
//    hoja (en rojo, en orden); un compañero cruza el pasillo ──
const IMPR = () => fijo('impr', () => {
  yeso(0, 0, 319, 68, pal(['#b8ae96', '#c8bea6', '#d6ccb4', '#e2d8c0']), 4);
  vetas(0, 69, 319, 121, pal(['#4a2e18', '#5e3a20', '#744a2a', '#8a5a34']), 7, 9, true);
  rr(0, 68, 319, 69, H('#8a5a34')); rr(0, 120, 319, 124, H('#3a2414'));
  for (let y = 125; y < 180; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(pal(['#6a3a1a', '#7e4a22', '#945a2c', '#a86a36']), 1.6 + (h2(x, y, 71) - 0.5) * 1.8 + (ns(x * 0.1, y * 0.2) - 0.5), x, y));
  // el calendario de 1980, el corcho con avisos y el pasillo con su puerta
  rr(34, 24, 68, 64, K); rr(35, 25, 67, 63, H('#f4f0e6')); rr(35, 25, 67, 33, H('#c83a2a')); cifras('1980', 37, 27, H('#f4f0e6'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) rr(37 + i * 4, 37 + j * 6, 39 + i * 4, 40 + j * 6, H('#b8b4a8')); R.disco(50, 44, 3, H('#d83a2a')); R.disco(50, 44, 2, H('#f4f0e6'));
  rr(90, 26, 132, 60, H('#6a4a2a')); for (let y = 28; y <= 58; y++) for (let x = 92; x <= 130; x++) ps(x, y, rmp(pal(['#a87a4a', '#c08e58', '#d4a26a']), 1.4 + (h2(x, y, 72) - 0.5) * 1.6, x, y));
  rr(96, 32, 110, 46, H('#f4f0e6')); for (let y = 35; y < 45; y += 3) rr(98, y, 108, y, H('#8a8a92')); rr(114, 34, 126, 52, H('#e8e0a0')); ps(103, 31, H('#d83a2a')); ps(120, 33, H('#3a6ad8'));
  rr(270, 48, 310, 122, K); for (let y = 49; y <= 121; y++) for (let x = 271; x <= 309; x++) ps(x, y, rmp(pal(['#a8a290', '#bcb6a2', '#ccc6b2']), 1.4 + (y > 110 ? -0.6 : 0) + (h2(x, y, 73) - 0.5) * 0.6, x, y));
  rr(266, 46, 270, 122, H('#6a4a2a')); rr(310, 46, 314, 122, H('#6a4a2a')); rr(266, 44, 314, 47, H('#6a4a2a'));
  // la silla naranja, la papelera con bolas de papel y la caja de papel continuo
  rr(58, 104, 90, 110, H('#d8782a')); rr(60, 96, 88, 104, H('#e88a3a')); rr(60, 96, 88, 97, H('#f8aa5a')); rr(72, 110, 75, 140, H('#3a3a40')); R.linea(62, 146, 86, 146, H('#3a3a40')); for (const x of [62, 74, 86]) R.disco(x, 147, 2, K);
  R.poligono([[14, 132], [36, 132], [33, 158], [17, 158]], H('#6a6a72')); for (let y = 134; y < 158; y += 3) R.linea(15 + (y - 132) * 0.12, y, 35 - (y - 132) * 0.12, y, H('#8a8a92'));
  for (const [x, y] of [[20, 130], [28, 128], [24, 125]]) { R.disco(x, y, 4, H('#f4f0e6')); ps(x - 1, y - 1, H('#c8c4bc')); ps(x + 2, y + 1, H('#c8c4bc')); }
  rr(146, 126, 214, 150, H('#8a6a3a')); rr(147, 127, 213, 149, H('#b08a50')); rr(147, 127, 213, 129, H('#d0aa70'));
  // el soporte metálico y el cuerpo de la impresora
  for (const x of [144, 214]) { rr(x, 112, x + 2, 152, H('#5a5e66')); rr(x, 112, x, 152, H('#9aa0a8')); } rr(142, 112, 218, 115, H('#5a5e66'));
  rr(138, 90, 222, 112, K); for (let y = 91; y <= 111; y++) for (let x = 139; x <= 221; x++) ps(x, y, rmp(pal(['#a8a08a', '#c4bca4', '#d8d0b8', '#e8e0ca']), 2.4 - (y - 91) * 0.08 + (h2(x, y, 74) - 0.5) * 0.4, x, y));
  rr(146, 91, 214, 95, H('#2a2a30')); rr(224, 96, 228, 104, H('#5a5a62')); rr(140, 104, 160, 108, H('#8a8472')); for (let x = 166; x < 212; x += 6) rr(x, 105, x + 3, 107, H('#b8b0a0'));
  // el papel que cae plegado al suelo a la derecha
  for (let k = 0; k < 6; k++) { const y = 156 - k * 3; rr(222, y, 266, y + 2, k % 2 ? H('#e4ecde') : H('#f4faf0')); rr(222, y + 2, 266, y + 2, H('#a8b4a2')); }
  R.linea(220, 100, 236, 140, H('#e4ecde')); R.linea(221, 100, 237, 140, H('#c8d4c4'));
});
const G5 = (t) => {
  const b = IMPR();
  // el fluorescente que parpadea (una franja de luz en la pared)
  const fl = Math.sin(t * 40) > 0.97 ? 0.05 : 0.14; for (let y = 0; y < 30; y++) for (let x = 60; x < 260; x += 1) if ((x + y) % 2 === 0) tine(x, y, H('#fffff0'), fl * (1 - y / 30));
  // el compañero que cruza el pasillo (recortado a la puerta)
  const pc = tramo(t, TG.BUT + 0.6, TG.RUN + 0.4); if (pc > 0 && pc < 1) { R.recorte([271, 49, 309, 121]); R.actor(EL.oficinista, ri(lerp(320, 250, pc)), 118, t, { dir: -1, anda: true, sostiene: true }); R.recorte(null); }
  // la hoja que sale por arriba con filas de galimatías que suben mientras imprime
  const imprime = t < TG.APPEARED, desp = (imprime ? t : TG.APPEARED) * 9;
  for (let y = 40; y <= 92; y++) for (let x = 150; x <= 210; x++) ps(x, y, (x === 150 || x === 210) ? H('#a8b4a2') : ((y + ri(desp)) % 24 === 0) ? H('#c8d4c4') : rmp(pal(['#e4ecde', '#eef4ea', '#f8fcf6']), 1.4 + (h2(x, y, 75) - 0.5) * 0.4, x, y));
  for (let y = 44; y < 88; y += 4) for (const x of [152, 208]) R.disco(x, y + ((ri(desp)) % 4), 1, H('#c8d4c4'));
  R.recorte([153, 40, 207, 92]);
  const f0 = Math.floor(desp / 7), fr = desp / 7 - f0, filaR = 3;
  for (let k = 0; k < 9; k++) { const f = f0 - k, y = ri(86 - k * 7 + fr * 7 - 7); const roja = !imprime && k === filaR && t > TG.RUN;
    if (roja) { const g2 = 0.5 + 0.5 * Math.sin(t * 6); rp(153, y - 1, 207, y + 5, mez(H('#fff0a0'), H('#ffe070'), g2)); }
    for (let i = 0; i < 13; i++) letra(roja ? TIRA[i] : galima(f + 500, i), 156 + i * 4, y, roja ? H('#d82a2a') : (f + i) % 4 ? H('#5a5a62') : H('#8a8a92')); }
  R.recorte(null);
  repega(b, 138, 90, 222, 112);
  // el cabezal que va y viene mientras imprime
  const cab = imprime ? 150 + Math.abs(((t * 1.8) % 2) - 1) * 56 : 178; rr(cab, 92, cab + 6, 95, H('#3a3a40')); rr(cab + 1, 92, cab + 5, 92, H('#6a6a72'));
  ps(218, 108, imprime && Math.floor(t * 8) % 2 ? H('#4aff4a') : H('#2a8a2a'));
  if (imprime) for (let k = 0; k < 2; k++) ps(cab + 3 + k, 89 - (Math.floor(t * 20) % 3), H('#c8c0b0'));
  // Jim lee el papel; en «hair stand on end», respingo y «!»; en «a run of letters» lo señala
  const resp = t > TG.HAIR - 0.05 && t < TG.END + 0.2, salto = resp ? ri(Math.max(0, Math.sin((t - TG.HAIR) * 9)) * 4) : 0;
  R.actor(BL.gilloglyBL, 122, 152, t, { dir: 1, sostiene: t < TG.SOMETHING ? [146, 112] : t > TG.RUN ? false : [146, 104], dedo: t > TG.RUN - 0.1, sorpresa: t > TG.HAIR - 0.05, salto, habla: t > TG.PERFECT && parp(t, 9) });
  globo('!', 126, 104, pop(t, TG.HAIR - 0.05, 0.25), H('#fff070'));
  if (t > TG.RUN) luz(180, 64, 34, H('#fff0a0'), 0.25);
};

// ── G6 · el corcho de la pared (fondo local): la tira a escala 2 clavada con chinchetas: cada letra aparece y salta cuando
//    la voz la dice. GAG: Atom, de pie en la mesa, la canta como una canción infantil con notas… y en «K» se calla de
//    golpe (disco rayado), boquiabierto, con «!», y se queda pensando ──
const CORCHO = () => fijo('corcho', () => {
  yeso(0, 0, 319, 45, pal(['#c4baa4', '#d0c6b0', '#dcd2bc']), 8);
  rr(2, 44, 317, 138, H('#5a3a1e')); rr(2, 44, 317, 45, H('#8a5a34')); rr(2, 137, 317, 138, H('#3a2414'));
  for (let y = 48; y <= 134; y++) for (let x = 6; x <= 313; x++) ps(x, y, rmp(pal(['#8a5a2e', '#a46c38', '#b87e44', '#c89254', '#d8a464']), 2.2 + (h2(x, y, 81) - 0.5) * 2.6 + (ns(x * 0.2, y * 0.2) - 0.5) * 0.8, x, y));
  // fichas, listados, una polaroid de la playa y una copia de la hoja 1, con chinchetas de colores
  const pin = (x, y, c) => { R.disco(x, y, 2, K); R.disco(x, y, 1, c); ps(x - 1, y - 1, H('#ffffff')); };
  for (const [x, y, w, h] of [[14, 98, 30, 20], [52, 104, 34, 26], [96, 100, 26, 30], [226, 98, 30, 22], [266, 104, 40, 26]]) { for (let j = y; j <= y + h; j++) for (let i = x; i <= x + w; i++) tine(i + 2, j + 2, K, 0.3); rr(x, y, x + w, y + h, H('#f4f0e6')); for (let j = y + 5; j < y + h - 2; j += 4) rr(x + 3, j, x + w - 3 - ri(h2(x, j, 82) * 8), j, H('#8a8a92')); pin(x + ri(w / 2), y + 2, [H('#d83a2a'), H('#3a6ad8'), H('#e8c040')][x % 3]); }
  rr(176, 98, 210, 132, H('#f4f0e6')); for (let y = 102; y <= 122; y++) for (let x = 180; x <= 206; x++) ps(x, y, y < 110 ? H('#7ab0e0') : y < 114 ? H('#3a7ab0') : H('#e8d4a0')); R.disco(198, 106, 2, H('#fff0a0')); pin(193, 100, H('#4ab84a'));
  T.d_hoja(R, 140, 116, { escala: 1, n: 1 }); pin(140, 101, H('#d83a2a'));
  // la mesa por delante: el tablero y el frente con cajones
  for (let y = 139; y <= 150; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(pal(['#6a4a2a', '#84603a', '#9a744a', '#b08a5a']), 3 - (y - 139) * 0.15 + (h2(x, y, 83) - 0.5) * 0.6, x, y));
  vetas(0, 151, 319, 179, pal(['#3a2414', '#4a2e1a', '#5e3a22', '#704828']), 9, 14);
  for (const x of [40, 160, 280]) { rr(x - 16, 158, x + 16, 176, H('#3a2414')); rr(x - 6, 165, x + 6, 167, H('#c8a860')); }
  // en la mesa: el cubilete de lápices, la grapadora, la taza y un montón de listados
  rr(226, 128, 234, 146, H('#3a6a8a')); for (let k = 0; k < 4; k++) R.linea(228 + k * 2, 128, 226 + k * 3, 118 + k, [H('#e8c040'), H('#d83a2a'), H('#3a3a3a'), H('#3a6ad8')][k]);
  rr(246, 140, 266, 146, H('#2a2a30')); rr(246, 138, 264, 140, H('#5a5a62'));
  for (let k = 0; k < 6; k++) rr(280 - k, 146 - k * 2, 314 - k, 147 - k * 2, k % 2 ? H('#e4ecde') : H('#f4faf0'));
  for (let j = -6; j <= 6; j++) for (let i = -6; i <= 9; i++) { const d = Math.hypot(i, j * 1.6); if (d <= 6 && j < 4) ps(20 + i, 140 + j, d > 5 ? K : H('#e8e4dc')); }
});
const G6 = (t) => {
  CORCHO();
  const [n, ult] = dichas(t), foco = ult >= 0 && t < LETRAS_T[ult] + 0.45 ? ult : -1;
  const ti = T.d_tira(R, 6, 58, TIRA, { escala: 2, n: Math.max(0.01, n), foco, t });
  for (const x of [8, 312]) { R.disco(x, 60, 2, K); R.disco(x, 60, 1, H('#d83a2a')); }
  // Atom canta la tira: abre la boca en cada letra, mueve los brazos y suelta notas; en la «K» se calla de golpe
  const calla = t > TG.L11 - 0.02, canto = calla ? 0 : (ult >= 0 ? Math.exp(-(t - LETRAS_T[ult]) * 5) : 0);
  const pose = calla ? (t > TG.L11 + 0.7 ? 'piensa' : 'quieto') : ult < 0 ? 'quieto' : (ult % 2 ? 'brazos' : 'saluda');
  AT.atom(R, 160, 150, t, { s: 2, dir: ult % 2 ? 1 : -1, pose, cara: calla ? 'sorpresa' : ult >= 0 ? 'sonrisa' : 'normal', habla: canto });
  if (!calla) for (let k = 0; k <= ult; k++) { const u = (t - LETRAS_T[k]) / 1.4; if (u > 0 && u < 1) nota(160 + (k % 2 ? 14 : -18) + Math.sin(u * 8 + k) * 4, 110 - u * 14, [H('#ff5a8a'), H('#5ad0ff'), H('#ffd040'), H('#7ae05a')][k % 4]); }
  if (calla) { globo('!', 182, 98, pop(t, TG.L11, 0.2), H('#fff070')); const q = tramo(t, TG.L11, TG.L11 + 0.4); if (q < 1) for (let k = 0; k < 3; k++) nota(150 + k * 10, 112 + q * 30, H('#8a8a92')); }
  if (foco >= 0 && ti.letras[foco]) luz(ti.letras[foco][0], ti.letras[foco][1], 14, H('#fff0a0'), 0.4);
};

// ── G7 · la mesa de luz (fondo local): la tira entera a escala 3; la luz marca «o, h, p, p» al decirlas; en «stumbles» la
//    mano rodea en rojo la «h» que sobra, el papel se desliza y en «made by hand» rodea la «f» ──
const MLUZ = () => fijo('mluz', () => {
  yeso(0, 0, 319, 31, pal(['#1e2228', '#262a32', '#2e333c']), 12);
  for (let y = 32; y <= 167; y++) for (let x = 0; x < 320; x++) { const v = 1 - (((x - 160) / 200) ** 2 + ((y - 100) / 110) ** 2) * 0.6;
    ps(x, y, (x % 16 === 0 || y % 16 === 0) ? H('#b8d4e0') : rmp(pal(['#a8c8d8', '#c4dce8', '#dcecf4', '#f0f8fc', '#ffffff']), 1 + v * 3.2 + (h2(x, y, 91) - 0.5) * 0.4, x, y)); }
  rr(0, 30, 319, 33, H('#6a6e76')); rr(0, 30, 319, 30, H('#a8acb4')); rr(0, 166, 319, 171, H('#5a5e66')); rr(0, 166, 319, 166, H('#9aa0a8'));
  for (let y = 172; y < 180; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(pal(['#1a1c22', '#24272e']), 0.6 + h2(x, y, 92), x, y));
  // la regla, la lupa, clips y el capuchón del rotulador
  rr(18, 140, 190, 152, H('#c8e0d8')); for (let x = 20; x < 190; x += 4) rr(x, 140, x, x % 20 === 0 ? 146 : 143, H('#3a4a4a'));
  for (let a = 0; a < 6.28; a += 0.05) { ps(268 + Math.cos(a) * 14, 140 + Math.sin(a) * 14, K); ps(268 + Math.cos(a) * 13, 140 + Math.sin(a) * 13, H('#8a8a92')); }
  R.linea(278, 150, 296, 164, K); R.linea(279, 150, 297, 164, H('#3a2a1a'));
  for (const [x, y] of [[214, 150], [226, 154]]) { R.linea(x, y, x + 7, y, H('#8a8a92')); R.linea(x, y + 2, x + 7, y + 2, H('#8a8a92')); ps(x + 7, y + 1, H('#8a8a92')); }
  rr(240, 132, 250, 136, H('#c82a2a'));
});
const G7 = (t) => {
  MLUZ();
  // el zumbido de la mesa: la luz respira un poco; motas
  for (let k = 0; k < 8; k++) { const u = (t * 0.1 + h2(k, 1, 93)) % 1; tine(20 + h2(k, 2, 93) * 280, 50 + h2(k, 3, 93) * 100 - u * 30, H('#ffffff'), 0.6 * Math.sin(u * Math.PI)); }
  const pan = ease(tramo(t, TG.LOOK - 0.05, TG.MADE + 0.25)), x0 = ri(lerp(-190, -10, pan));
  const [, ult] = dichas(t), foco = ult >= 16 && t < LETRAS_T[ult] + 0.45 ? ult : -1;
  const ti = T.d_tira(R, x0, 64, TIRA, { escala: 3, n: 20, foco, marca: t > TG.STUMBLES, t });
  const cen = (i) => ti.letras[i];
  if (foco >= 0) luz(cen(foco)[0], cen(foco)[1], 20, H('#fff0a0'), 0.45);
  // los dos círculos rojos (la «h» que sobra y la «f»), que se van trazando
  const RO = H('#d82a2a'), circulo = (cx, cy, u) => { for (let a = 0; a < u * 6.5; a += 0.03) { const px = cx + Math.cos(a - 1.4) * (16 + Math.sin(a * 3) * 0.8), py = cy + Math.sin(a - 1.4) * 22; ps(px, py, RO); ps(px + 1, py, RO); } };
  const c1 = tramo(t, TG.STUMBLES, TG.LOOK - 0.1), c2 = tramo(t, TG.MADE + 0.3, TG.HAND + 0.5);
  if (c1 > 0) circulo(cen(17)[0], cen(17)[1], c1);
  if (c2 > 0) circulo(cen(2)[0], cen(2)[1], c2);
  // la mano con el rotulador rojo (desde abajo a la derecha)
  let tx, ty;
  if (t < TG.STUMBLES - 0.4) { const u = ease(tramo(t, TG.CORTE7 + 0.2, TG.STUMBLES - 0.4)); tx = lerp(330, cen(17)[0] + 4, u); ty = lerp(200, cen(17)[1] + 26, u); }
  else if (c1 < 1) { const a = c1 * 6.5 - 1.4; tx = cen(17)[0] + Math.cos(a) * 16; ty = cen(17)[1] + Math.sin(a) * 22; }
  else if (c2 <= 0) { const u = ease(tramo(t, TG.LOOK, TG.MADE + 0.3)); tx = lerp(cen(17)[0] + 10, cen(2)[0], u); ty = lerp(cen(17)[1] + 30, cen(2)[1] - 22, u) + Math.sin(u * Math.PI) * 14; }
  else if (c2 < 1) { const a = c2 * 6.5 - 1.4; tx = cen(2)[0] + Math.cos(a) * 16; ty = cen(2)[1] + Math.sin(a) * 22; }
  else { const u = ease(tramo(t, TG.HAND + 0.6, TG.HAND + 1.3)); tx = lerp(cen(2)[0] + 16, cen(2)[0] + 40, u); ty = lerp(cen(2)[1] + 22, 148, u); }
  const wx = ri(tx + 7), wy = ri(ty + 7);
  T.brazo(R, wx + 60, 214, wx, wy, '#c8c0a8', -1, { codo: [wx + 44, Math.min(204, wy + 36)] });
  for (let i = 0; i < 13; i++) { const px = wx - 7 + i, py = wy - 7 + ri(i * 0.5); R.pset(px, py, i < 2 ? H('#e82a2a') : i < 10 ? H('#c82a2a') : H('#f4f0e8')); R.pset(px, py + 1, i < 2 ? H('#8a1a1a') : i < 10 ? H('#8a1a1a') : H('#c8c4bc')); }
};
'''

GILLOGLY = r'''
T.rodar(E, R, [[0, G1], [TG.JIM, G2], [TG.HE, G3], [TG.TO, G4], [TG.BUT, G5], [TG.CORTE6, G6], [TG.CORTE7, G7]], {
  efectos: [[TG.COMPUTER + 0.1, 'coche'], [TG.CORP + 0.6, 'puerta'], [TG.DID + 0.1, 'tecleo'], [TG.APPLIED + 0.1, 'lapiz'], [TG.VAULT - 0.1, 'brillo'],
    [TG.SEE, 'tecleo'], [TG.GIBBERISH, 'pop'], [TG.BUT + 0.1, 'maquina'], [TG.HAIR, 'aviso'], [TG.RUN, 'brillo'], [TG.L11, 'tapestop'],
    [TG.STUMBLES, 'lapiz'], [TG.MADE + 0.3, 'lapiz']],
  cartela: '1980', año: 1980 });
'''

CAB_GILLOGLY = r'''// bl-gillogly (frase 24, cartela 1980; el golpe de la música cae en «tira»+1 = 2,5 s, con el destello en los cristales).
// 1 · La fachada de RAND en Santa Mónica (fondo local): Jim llega con el maletín, el compañero le saluda, pasa un coche,
//   y en «Rand Corporation» se abren las puertas de cristal y entra. Corta en «Jim».
// 2 · El despacho (buscadores·rand): Jim entra y se sienta al terminal en «did something»; teclea; el compañero señala la
//   pizarra en «done». Corta en «He applied».
// 3 · El escritorio desde arriba (fondo local): la hoja 1 escala 3 y la Declaración; el lápiz va de número a palabra y
//   la letra baja a la tira; en «first sheet» brilla la hoja; en «where the vault is», la cámara con «?». Corta en «to see».
// 4 · El terminal de cerca (buscadores·rand·pantalla): filas de letras revueltas; en «gibberish» una «?» enorme. Corta en «but».
// 5 · El rincón de la impresora (fondo local): Jim lee el papel; respingo en «hair stand on end»; la fila en orden se
//   enciende en «a run of letters». Corta en «order».
// 6 · El corcho (fondo local): la tira a escala 2, letra a letra con la voz. GAG: Atom la canta y en «K» se calla de golpe.
//   Corta entre «M» y «O».
// 7 · La mesa de luz (fondo local): la tira a escala 3; en «stumbles» se rodea la «h», el papel se desliza y en «made by
//   hand» se rodea la «f». Su último fotograma lo congela bl-azar.'''

E['bl-gillogly'] = ('Jim Gillogly', CAB_GILLOGLY, tabla('TG', TG, 'tira') + COMUN + COMPARTIDO + GILLOGLY)

AZAR = r'''
// ── la PAUSA: el mundo de bl-gillogly congelado (las mismas G7, G4, G5, G2 y G3) y Atom al doble ──
const TF7 = TG.FIN, TF4 = TG.BUT - 0.06, TF5 = TG.CORTE6 - 0.05, TF2 = TG.HE - 0.05, TF3 = TG.TO - 0.04;
const hab = (t) => Math.min(1, (E.energia ? E.energia(t) : 0) * 1.4);
// un libro cerrado a color (el «otro libro» que nadie conoce)
const libro = (x, y) => { x = ri(x); y = ri(y); rr(x - 12, y - 16, x + 12, y + 16, K); rr(x - 11, y - 15, x + 11, y + 15, H('#8a1e2a')); rr(x - 11, y - 15, x - 8, y + 15, H('#5a1018'));
  rr(x - 7, y - 12, x + 9, y - 10, H('#e8c040')); rr(x - 7, y + 10, x + 9, y + 12, H('#e8c040')); rr(x - 3, y - 4, x + 5, y + 4, H('#e8c040')); rr(x - 2, y - 3, x + 4, y + 3, H('#8a1e2a'));
  rr(x + 9, y - 14, x + 11, y + 14, H('#f0e8d0')); for (let j = -13; j < 14; j += 2) ps(x + 10, y + j, H('#c8bca4')); ps(x - 10, y - 14, H('#c84a5a')); };
// el cuadernillo de criptogramas: rejilla de casillas con símbolos (sin letras)
const cuaderno = (x, y) => { x = ri(x); y = ri(y); rr(x - 14, y - 18, x + 14, y + 18, K); rr(x - 13, y - 17, x + 13, y + 17, H('#f4f0e6')); rr(x - 13, y - 17, x + 13, y - 11, H('#3a6ad8'));
  R.icono('?', x - 3, y - 18, H('#ffffff'), H('#1e3a8a'), 1);
  for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) { const bx = x - 11 + i * 5, by = y - 7 + j * 6; rr(bx, by, bx + 3, by + 4, H('#2a2a30')); rr(bx + 1, by + 1, bx + 2, by + 3, (i + j) % 3 ? H('#f4f0e6') : H('#e8c040')); }
  R.linea(x + 10, y + 12, x + 20, y + 2, H('#e8c040')); };
// un dado blanco con sus puntos (cara k), girado por su vuelta
const dado = (x, y, k) => { x = ri(x); y = ri(y); rr(x - 5, y - 5, x + 5, y + 5, K); rr(x - 4, y - 4, x + 4, y + 4, H('#f4f0e6')); rr(x - 4, y + 3, x + 4, y + 4, H('#c8c4bc'));
  const P = [[[0, 0]], [[-2, -2], [2, 2]], [[-2, -2], [0, 0], [2, 2]], [[-2, -2], [2, -2], [-2, 2], [2, 2]], [[-2, -2], [2, -2], [0, 0], [-2, 2], [2, 2]], [[-2, -2], [2, -2], [-2, 0], [2, 0], [-2, 2], [2, 2]]][k % 6];
  for (const [i, j] of P) { ps(x + i, y + j, H('#d82a2a')); } };
// la figurita de papel del que escribió los números: chistera, levita y la cara en blanco
const figurita = (x, y) => { x = ri(x); y = ri(y); sombraS(x, y + 1, 7, 0.35); rr(x - 5, y - 18, x + 5, y, K); rr(x - 4, y - 17, x + 4, y - 1, H('#3a3a5a')); rr(x - 1, y - 17, x + 1, y - 9, H('#f4f0e6'));
  R.disco(x, y - 22, 5, K); R.disco(x, y - 22, 4, H('#e8d0b0')); rr(x - 6, y - 27, x + 6, y - 26, K); rr(x - 4, y - 36, x + 4, y - 27, K); rr(x - 3, y - 35, x + 3, y - 28, H('#2a2a3a'));
  R.linea(x + 5, y - 12, x + 12, y - 22, H('#f4f0e6')); R.linea(x + 6, y - 12, x + 13, y - 22, H('#c8c4bc')); rr(x - 8, y, x + 8, y + 1, H('#d8ccb0')); };

// ── S1 · la mesa de luz congelada (el último instante de bl-gillogly): Atom entra al doble, rodea la «f» con su órbita en
//    «serious», saca la hoja 1 en «first sheet» y, en «some other book», aparece a color un libro rojo con su «?» ──
const S1 = (t) => {
  G7(TF7); AT.pausa(R, tramo(t, 0, 0.3));
  const u = tramo(t, 0.15, 1.4), x = ri(lerp(350, 262, ease(u))), anda = u > 0 && u < 1;
  if (t > TA.SERIOUS - 0.1) AT.anillo(R, 60, 90, 26, 34, t, tramo(t, TA.SERIOUS - 0.1, TA.SERIOUS + 0.5));
  const h = pop(t, TA.FIRST - 0.1, 0.35);
  const a = AT.atom(R, x, 178, t, { s: 2, dir: -1, pose: anda ? 'camina' : h > 0 ? 'sostiene' : t > TA.SERIOUS - 0.2 ? 'senala' : 'quieto', cara: t > TA.OTHER ? 'sorpresa' : 'normal', habla: hab(t) });
  if (h > 0) { const hx = a.mano[0] - 20, hy = ri(a.mano[1] - 30 - 4 * (1 - Math.min(1, h))); luz(hx, hy, 34, H('#fff4c0'), 0.3); T.d_hoja(R, hx, hy, { escala: 2, n: 1, t, brillo: t > TA.MESSAGE && t < TA.OTHER ? 0.6 : 0 }); }
  const b = pop(t, TA.OTHER - 0.05, 0.35);
  if (b > 0) { const by = ri(124 - 6 * (1 - Math.min(1, b))); luz(186, by, 30, H('#ffe0e0'), 0.3); libro(186, by); globo('?', 196, by - 34, b); }
};
// ── S2 · el terminal congelado: «putting the Declaration on it should give you scrambled letters»: Atom saca a color el
//    BOMBO, que gira y escupe fichas revueltas; en «no order at all» niega con la cabeza ──
const S2 = (t) => {
  G4(TF4); AT.pausa(R, 1);
  const p = pop(t, TA.SCRAMBLED - 0.15, 0.4);
  if (p > 0) { const y = ri(168 + 12 * (1 - Math.min(1, p))); luz(186, 120, 60, H('#fff4c0'), 0.25); T.pausa(R, 186, y, t, { cual: 'bombo', numero: false, vel: t > TA.SCRAMBLED ? 3.2 : 1 }); }
  const niega = t > TA.NO && t < TA.ALL + 0.4;
  AT.atom(R, 66, 178, t, { s: 2, dir: niega ? (Math.sin(t * 14) > 0 ? 1 : -1) : 1, pose: t < TA.SCRAMBLED - 0.2 ? (t > TA.DECL - 0.1 ? 'senala' : 'quieto') : niega ? 'brazos' : 'senala', cara: niega ? 'triste' : 'normal', habla: hab(t) });
};
// ── S3 · el rincón de la impresora congelado: «the American Cryptogram Association»: Atom enseña un cuadernillo de
//    criptogramas; «the odds of that many coming out in alphabetical order»: caen las veinte fichas de la tira y se
//    colocan en fila; en «order» la fila se enciende ──
const S3 = (t) => {
  G5(TF5); AT.pausa(R, 1);
  const c = pop(t, TA.AMERICAN - 0.1, 0.35);
  const a = AT.atom(R, 262, 178, t, { s: 2, dir: -1, pose: t < TA.ODDS - 0.2 ? (c > 0 ? 'sostiene' : 'quieto') : 'senala', cara: t > TA.ORDER2 ? 'sorpresa' : 'normal', habla: hab(t) });
  if (c > 0 && t < TA.ODDS - 0.2) cuaderno(a.mano[0] - 16, ri(a.mano[1] - 22 - 4 * (1 - Math.min(1, c))));
  const enc = t > TA.ORDER2 ? 0.5 + 0.5 * Math.sin(t * 7) : 0;
  if (enc > 0) luz(150, 40, 130, H('#fff0a0'), 0.25);
  for (let k = 0; k < 20; k++) { const t0 = TA.ODDS + k * 0.12, u = tramo(t, t0, t0 + 0.35); if (u <= 0) continue;
    const x = 32 + k * 12, y = ri(lerp(-12, 30, 1 - (1 - u) ** 3) + (u >= 1 ? 0 : Math.sin(u * 9) * 2));
    rr(x - 5, y - 5, x + 5, y + 6, K); rr(x - 4, y - 4, x + 4, y + 5, enc > 0 ? mez(H('#fff4d0'), H('#ffe070'), enc) : H('#f4ecd0')); rr(x - 4, y + 4, x + 4, y + 5, H('#c8b888'));
    letra(TIRA[k], x - 2, y - 2, k === 2 || k === 17 ? H('#d82a2a') : H('#2a2a30')); }
};
// ── S4 · el despacho congelado: «by chance»: Atom tira dos dados a color; «less than one in a hundred million million»:
//    sale el «1» y debajo, cifra a cifra, «100 000 000 000 000» ──
const S4 = (t) => {
  G2(TF2); AT.pausa(R, 1);
  const ti = tramo(t, TA.CHANCE - 0.1, TA.ARE + 0.2);
  const a = AT.atom(R, 54, 178, t, { s: 2, dir: 1, pose: ti > 0 && ti < 0.3 ? 'saluda' : t > TA.MILLION2 ? 'brazos' : t > TA.ONE - 0.2 ? 'senala' : 'quieto', cara: t > TA.MILLION2 ? 'sorpresa' : 'normal', habla: hab(t) });
  if (ti > 0) for (let k = 0; k < 2; k++) { const u = cl(ti * 1.2 - k * 0.1), x = lerp(a.mano[0] + 4, 118 + k * 18, u), y = 168 - Math.abs(Math.sin(u * 3 * Math.PI)) * (1 - u) * 40 - (u < 0.1 ? 20 : 0); dado(x, ri(y), u < 1 ? Math.floor(t * 12) + k : 4 + k); }
  const uno = pop(t, TA.ONE - 0.05, 0.35);
  if (uno > 0) { luz(200, 86, 70, H('#fff0a0'), 0.3); R.numero('1', 200, ri(66 - 4 * (1 - Math.min(1, uno))), { tam: 16, centro: true }); rr(150, 74, 250, 75, K); rr(150, 72, 250, 73, H('#ffe070')); }
  const trozos = [[TA.HUNDRED - 0.05, '100'], [TA.MILLION - 0.05, '100 000 000'], [TA.MILLION2 - 0.05, '100 000 000 000 000']];
  let txt = ''; for (const [a0, s] of trozos) if (t > a0) txt = s;
  if (txt) R.numero(txt, 200, 96, { tam: 8, centro: true });
};
// ── S5 · la mesa del estudio (a color): «the easiest thing to believe»: Atom piensa; «whoever wrote the numbers»: sale la
//    figurita de papel sin cara, con chistera y pluma, y a su lado se va escribiendo una hoja de números ──
const S5 = (t) => {
  const o = { encuadre: 'estudio', camara: 'mesa' }; T.estudio(R, t, o);
  const f = pop(t, TA.WHOEVER - 0.1, 0.35);
  if (f > 0) { figurita(170, ri(146 - 6 * (1 - Math.min(1, f)))); globo('?', 166, 96, f); }
  if (t > TA.WROTE - 0.1) T.d_hoja(R, 204, 120, { escala: 2, n: 1, t, ver: tramo(t, TA.WROTE - 0.1, TA.PICKED) });
  AT.atom(R, 128, 150, t, { s: 2, dir: 1, pose: t < TA.WHOEVER - 0.2 ? (t > TA.EASIEST ? 'piensa' : 'quieto') : 'senala', cara: t > TA.BELIEVE && t < TA.WHOEVER ? 'sonrisa' : 'normal', habla: hab(t) });
  T.estudioDelante(R, t, o);
};
// ── S6 · el escritorio congelado: «picked them with the Declaration in front of him, more or less at random»: la
//    Declaración se enciende; una mano antigua a color, con pluma, salta de palabra en palabra (cada vez más al azar) y
//    cada número vuela a la hoja; en «without encoding anything» la mano se va y Atom se encoge de hombros ──
const PICKS = [[TA.PICKED + 0.1, 170, 62], [TA.PICKED + 0.8, 212, 90], [TA.DECL2 + 0.2, 156, 112], [TA.FRONT, 200, 140], [TA.HIM + 0.3, 176, 76], [TA.MORE + 0.25, 222, 122], [TA.MORE + 0.55, 150, 96], [TA.RANDOM - 0.1, 190, 52], [TA.RANDOM + 0.2, 160, 146], [TA.RANDOM + 0.5, 214, 70]];
const S6 = (t) => {
  G3(TF3); AT.pausa(R, 1);
  const dc = tramo(t, TA.DECL2 - 0.2, TA.DECL2 + 0.3);
  if (dc > 0) for (let y = 24; y <= 160; y++) for (let x = 138; x <= 236; x++) if ((x + y) % 2 === 0) tine(x, y, H('#ffe8a0'), 0.35 * dc);
  let tx = 340, ty = 214;
  const sale = ease(tramo(t, TA.WITHOUT, TA.ENCODING + 0.5));
  for (let k = 0; k < PICKS.length; k++) { const [t0, px, py] = PICKS[k], t1 = k + 1 < PICKS.length ? PICKS[k + 1][0] : 99;
    if (t >= t0 - 0.3 && t < t1 - 0.3) { const [ax, ay] = k ? PICKS[k - 1].slice(1) : [330, 200], u = ease(tramo(t, t0 - 0.3, t0)); tx = lerp(ax, px, u); ty = lerp(ay, py, u) - Math.sin(u * Math.PI) * 8; }
    if (t > t0) { rr(px - 6, py - 2, px + 6, py + 3, H('#ffe070')); const v = tramo(t, t0 + 0.05, t0 + 0.45), nx = 62 + (k % 3) * 14, ny = 140 + Math.floor(k / 3) * 7 - 70;
      if (v < 1) { const qx = lerp(px, nx, ease(v)), qy = lerp(py, ny, ease(v)) - Math.sin(v * Math.PI) * 16; luz(qx + 4, qy + 4, 10, H('#fff0a0'), 0.4); cifras(String((k * 37 + 11) % 98 + 1), ri(qx), ri(qy), H('#2a3a9a'), 2); }
      else cifras(String((k * 37 + 11) % 98 + 1), nx, ny, H('#2a3a9a')); } }
  if (t < PICKS[0][0] - 0.3) { tx = 330; ty = 200; }
  tx = lerp(tx, 340, sale); ty = lerp(ty, 214, sale);
  const wx = ri(tx + 7), wy = ri(ty + 7);
  if (wx < 330) { T.brazo(R, wx + 50, 214, wx, wy, '#3a2a5a', -1, { codo: [wx + 40, Math.min(200, wy + 34)], puno: '#f2eee2' });
    for (let i = 0; i < 16; i++) { const px = wx - 8 + i, py = wy - 8 + ri(i * 0.55); R.pset(px, py, i < 2 ? K : H('#f8f4ea')); R.pset(px, py - 1, i > 4 ? H('#ffffff') : H('#d8d4c8')); if (i > 6) R.pset(px, py - 2, H('#e8e4da')); } }
  const enc = t > TA.WITHOUT;
  AT.atom(R, 286, 178, t, { s: 2, dir: -1, pose: enc ? 'brazos' : t > TA.PICKED ? 'senala' : 'quieto', cara: enc ? 'guino' : 'normal', habla: hab(t) });
};

T.rodar(E, R, [[0, S1], [TA.PUTTING, S2], [TA.AND, S3], [TA.BY, S4], [TA.THE2, S5], [TA.PICKED, S6]], {
  efectos: [[TA.SERIOUS, 'brillo'], [TA.FIRST, 'pop'], [TA.OTHER, 'pop'], [TA.SCRAMBLED - 0.1, 'pop'], [TA.AMERICAN, 'papel'], [TA.ODDS, 'tic'],
    [TA.ORDER2, 'brillo'], [TA.CHANCE + 0.4, 'golpecito'], [TA.ONE, 'brillo'], [TA.MILLION2, 'pop'], [TA.WHOEVER, 'pop'], [TA.WROTE, 'lapiz'],
    [TA.PICKED + 0.1, 'lapiz'], [TA.RANDOM, 'lapiz']],
  año: 1980 });
'''

CAB_AZAR = r'''// bl-azar (frase 25, PAUSA «fíjate»): el mundo de bl-gillogly congelado en gris azulado y Atom al doble.
// 1 · La mesa de luz congelada (G7, su último instante): Atom rodea la «f» en «serious», saca la hoja 1 en «first sheet» y
//   aparece el libro rojo con «?» en «some other book». Corta en «putting».
// 2 · El terminal congelado (G4): en «scrambled letters» Atom saca a color el BOMBO, que escupe fichas; niega en «no order».
//   Corta en «and according».
// 3 · El rincón de la impresora congelado (G5): el cuadernillo de criptogramas en «American Cryptogram»; en «the odds» caen
//   las veinte fichas de la tira en fila y se encienden en «order». Corta en «by chance».
// 4 · El despacho congelado (G2): dos dados en «chance»; el «1» y «100 000 000 000 000» cifra a cifra. Corta en «The easiest».
// 5 · La mesa del estudio a color: la figurita sin cara del que escribió los números, y su hoja que se escribe. Corta en «picked».
// 6 · El escritorio congelado (G3): la Declaración se enciende; la mano antigua elige palabras al azar y los números
//   vuelan a la hoja; en «without encoding anything», Atom se encoge de hombros.'''

E['bl-azar'] = ('La tira no es casualidad', CAB_AZAR, tabla_num('TG', TG) + tabla('TA', TA, 'fijate4') + COMUN + COMPARTIDO + AZAR)
