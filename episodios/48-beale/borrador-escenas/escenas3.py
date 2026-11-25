# Borrador de escenas del ep48 (grupo S3): bl-oeste y bl-peso, con el movimiento ya hecho.
# Los instantes salen de las palabras de la voz inglesa (atomo/build/largo/ep48/linea.json), escritos como en('marca', f).
# bl-peso es la PAUSA «fíjate» (la técnica de ms-suenos del 47): congela planos de bl-oeste con las MISMAS funciones
# (COMPARTIDO), con los instantes de bl-oeste escritos como números (en bl-peso, M es el de la pausa).
# Fondos locales (pintados en la escena, con su búfer): P1 Virginia, P6 la plaza de Santa Fe, P9 la tienda de noche y
# P12 la mesa de la taberna (inserto).
E = {}

MARCAS = {'oro': (1.5, 35.328), 'viaje': (35.728, 67.753), 'fijate1': (0.2, 33.572)}

# las palabras que mandan en bl-oeste (corte de plano o acción), en segundos de la escena
TB = {
    'BEALE': 4.10, 'VIRGINIA': 5.00, 'N30': 5.90, 'MEN': 6.30, 'HUNT': 7.24, 'BUFFALO': 7.44, 'PLAINS': 8.20,
    'AFTER': 10.20, 'WINTER': 10.62, 'SANTA': 11.34, 'FEW': 12.52, 'CHASING': 13.26, 'HERD': 14.16, 'CAMPED': 14.56,
    'IN1': 15.28, 'RAVINE': 15.46, 'NORTH': 16.64, 'WHILE': 17.62, 'SUPPER': 18.46, 'ONE': 19.40, 'SAW': 19.72,
    'SOMETHING': 20.40, 'GLINT': 20.84, 'ROCKS': 21.56, 'IT': 22.94, 'GOLD': 23.78,
    'THOSE': 24.64, 'HUNTERS': 24.86, 'LOOKING': 26.54, 'HIDES': 27.16, 'SENT': 27.64, 'BEALE2': 28.72,
    'STAYED': 29.56, 'YEAR': 30.02, 'DIGGING': 30.88, 'MOUNTAIN': 31.94, 'TOOLS': 32.60, 'BROUGHT': 33.06, 'SANTAFE2': 34.36,
    'NOW': 35.73, 'PICTURE': 35.93, 'PROBLEM': 36.41, 'MIDDLE': 38.43, 'NOWHERE': 38.83, 'HUNDREDS': 39.73, 'MILES': 40.29, 'BANK': 41.21,
    'THEYVE': 42.19, 'PILED': 42.43, 'MORE': 42.95, 'GUARD': 44.31, 'DECIDE': 45.49, 'SAFEST': 46.15, 'TAKE': 47.51, 'HOME': 47.89,
    'HIDE': 48.73, 'ACCORDING': 50.47, 'LETTERS': 51.35,
    'BIEL': 52.13, 'CROSSES': 52.31, 'HALF': 52.73, 'GOLD3': 54.01, 'SILVER': 54.99, 'ESCORT': 56.09, 'TEN': 56.61,
    'AND5': 57.59, 'SUSPICION': 58.79, 'SPEND': 59.57, 'MONTH': 60.21,
    'TAVERN': 61.67, 'BEDFORD': 62.53, 'PRETENDING': 63.73, 'COME': 64.65, 'HUNT2': 65.07, 'LOOK': 66.05, 'PLACE': 66.61, 'BURY': 67.19,
}
# las de bl-peso
TS = {
    'NOTICE': 0.32, 'PAMPHLET': 1.80, 'NUMBERS': 2.24, 'SMALL': 2.96, 'IT': 4.58, 'N2921': 5.54, 'POUNDS': 7.62, 'GOLD': 8.20,
    'SOMEWHERE': 9.46, 'THOUSAND': 10.92, 'N1300': 11.54, 'KILOS': 12.06, 'DEPENDING': 12.82, 'POUND': 13.92, 'USE': 14.48,
    'AND': 15.36, 'N5100': 15.58, 'SILVER': 17.58, 'AND2': 18.52, 'ALONE': 19.26, 'AT': 20.18, 'TODAYS': 20.36, 'WORTH': 21.96,
    'HUNDRED': 22.78, 'MILLION': 23.08, 'DOLLARS': 23.46, 'TO': 23.96, 'IDEA': 25.18, 'IT2': 26.06, 'WEIGHS': 26.20,
    'SMALL2': 27.58, 'CAR': 27.84, 'MADE': 28.76, 'ENTIRELY': 29.06, 'GOLD2': 29.82, 'SITTING': 30.66, 'IRON': 31.20,
    'POTS': 31.46, 'VIRGINIA': 32.34, 'FOREST': 32.76,
}


def marca_de(s):
    return 'oro' if s < MARCAS['viaje'][0] - 0.2 else 'viaje'


def frac(k, s):
    a, b = MARCAS[k]
    return (s - a) / (b - a)


def tb_en():
    """const TB = {...}: cada instante como en('marca', fracción) (para bl-oeste)"""
    return 'const TB = { ' + ', '.join(f"{n}: en('{marca_de(s)}', {frac(marca_de(s), s):.4f})" for n, s in TB.items()) + ' };\n'


def tb_num():
    """los mismos instantes de bl-oeste como números (para bl-peso, que tiene otro M)"""
    return 'const TB = { ' + ', '.join(f"{n}: {s}" for n, s in TB.items()) + ' };\n'


def ts_en():
    return 'const TS = { ' + ', '.join(f"{n}: en('fijate1', {frac('fijate1', s):.4f})" for n, s in TS.items()) + ' };\n'


COMPARTIDO = r'''
const AT = T.AT, BL = T.BL, C = T.C, K = C.k, ri = Math.round, H = (s) => hex(s);
const B4M = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4M[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
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
const tine = (x, y, c, a) => { x = ri(x); y = ri(y); if (x < 0 || y < 0 || x > 319 || y > 179) return; const B = R.buf, i = y * 320 + x; B[i] = mez(B[i], c, a); };
// un resplandor tramado (luz de hoguera, de farol, del oro)
const luz = (cx, cy, r, c, a) => { for (let y = Math.max(0, ri(cy - r)); y <= Math.min(179, ri(cy + r)); y++) for (let x = Math.max(0, ri(cx - r)); x <= Math.min(319, ri(cx + r)); x++) {
  const d = Math.hypot(x - cx, y - cy) / r; if (d < 1) { const k = (1 - d) * (1 - d) * a; if (k > 0.02) tine(x, y, c, Math.min(0.85, k)); } } };
const sombraS = (cx, cy, w, a = 0.35) => { for (let i = -w; i <= w; i++) { const k = 1 - (i / (w + 1)) ** 2; tine(cx + i, cy, K, a * k); if (Math.abs(i) < w * 0.7) tine(cx + i, cy + 1, K, a * 0.6 * k); } };
const destello = (x, y, r, c = H('#fff8d0')) => { x = ri(x); y = ri(y); for (let k = 1; k <= r; k++) { ps(x + k, y, c); ps(x - k, y, c); ps(x, y + k, c); ps(x, y - k, c); } ps(x, y, H('#ffffff')); };
// la boca de quien habla
const parp = (t, f = 7) => Math.sin(t * f) > -0.2;
const ORO = pal(['#5a3c0c', '#a87820', '#e0a830', '#f0c040', '#fff0a0']);
const PLATA = pal(['#3a3e4a', '#6a7080', '#9aa2b0', '#c8ced8', '#f4f6fa']);
const HIE = pal(['#141418', '#26262e', '#3c3c46', '#5a5a66', '#84848f']);
const CUERO = pal(['#2e1c10', '#5a3a22', '#7a5232', '#9a6c44', '#b88a5c']);

// ── un jinete: el caballo (la misma pieza que las mulas del decorado, sin carga) y el personaje sentado encima. El
// caballo se pinta en un búfer aparte y su flanco se vuelve a pegar por encima de las piernas del jinete.
const BJ = R.nuevo();
const pegaBJ = (x0, x1, y0, y1) => { const B = R.buf; for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let i = Math.max(0, x0); i <= Math.min(319, x1); i++) { const c = BJ[y * 320 + i]; if (c) B[y * 320 + i] = c; } };
const jinete = (def, x, suelo, t, o = {}) => {
  x = ri(x); const dir = o.dir ?? 1, mov = !!(o.anda || o.galope);
  if (x < -30 || x > 350) return { mano: [x, suelo - 30], cabeza: [x, suelo - 40] };
  const prev = R.usar(BJ);
  for (let y = Math.max(0, suelo - 42); y <= Math.min(179, suelo + 2); y++) for (let i = Math.max(0, x - 26); i <= Math.min(319, x + 26); i++) BJ[y * 320 + i] = 0;
  T.b_mula(R, x, suelo, t * (o.galope ? 1.8 : 1), { mula: false, carga: false, color: o.color ?? 'bayo', dir, anda: mov, k: o.k ?? 0 });
  R.usar(prev);
  if (o.galope) for (let i = 0; i < 6; i++) { const u = (t * 2.6 + i / 6 + (o.k ?? 0) * 0.3) % 1, px = x - dir * (12 + u * 22), py = suelo - 1 - u * 7, r = 1 + u * 3;
    for (let a = 0; a < 7; a++) tine(px + Math.cos(a) * r * 0.8, py + Math.sin(a * 1.7) * r * 0.5, H('#d8c8a0'), 0.45 * (1 - u)); }
  pegaBJ(x - 26, x + 26, suelo - 42, suelo + 2);
  const bob = mov ? Math.floor(t * (o.galope ? 10 : 6) + x * 0.1) % 2 : 0;
  const a = R.actor(def, x - 7 - 3 * dir, suelo - 13 - bob, t, { dir, quieto: true, ...(o.a || {}) });
  pegaBJ(x - 10, x + 10, suelo - 19, suelo + 2);
  // la pierna que cuelga por el flanco, con la bota en el estribo
  const lx = x - 3 * dir + 1, pant = H('#3e3630');
  rr(lx - 1, suelo - 19 - bob, lx + 1, suelo - 12, K); rr(lx, suelo - 19 - bob, lx, suelo - 13, pant);
  rr(lx - 1 + (dir > 0 ? 0 : -1), suelo - 12, lx + 2 + (dir > 0 ? 0 : -1), suelo - 11, H('#2a2018'));
  return a;
};
// un jinete lejano (8 px): caballo, jinete y sombrero, al paso o al galope
const jineteMini = (x, y, t, dir = -1, c = H('#a8443a'), gal = true) => {
  x = ri(x); y = ri(y); const f = Math.floor(t * (gal ? 10 : 5) + x) % 2, X = (i) => x + dir * i;
  rr(X(-3), y - 4, X(3), y - 2, H('#5a3a22')); ps(X(4), y - 5, H('#5a3a22')); ps(X(5), y - 5, H('#4a2a16')); ps(X(4), y - 4, H('#5a3a22')); ps(X(-4), y - 3 - f, H('#3a2414'));
  ps(X(-2 - f), y - 1, H('#3a2414')); ps(X(-2 - f), y, H('#2a1a10')); ps(X(2 + f), y - 1, H('#3a2414')); ps(X(2 + f), y, H('#2a1a10'));
  rr(X(-1), y - 7, X(0), y - 5, c); ps(X(0), y - 8, H('#d8a078')); rr(X(-1), y - 9, X(1), y - 9, H('#3a2a1a'));
};
// un búfalo pequeño que corre (estampida de media distancia), s ≈ 1 → 12 px
const bufaloMini = (x, y, t, dir = -1, s = 1, k = 0) => {
  const X = (i) => ri(x + dir * i * s), Y = (j) => ri(y + j * s), f = Math.sin(t * 13 + k * 1.7), D = H('#2e1c12'), M = H('#4e3020'), L = H('#6e4a30');
  R.disco(X(-1), Y(-5), ri(3.4 * s), D); R.disco(X(-1), Y(-5), Math.max(1, ri(2.6 * s)), M);
  R.disco(X(3), Y(-6), ri(3.6 * s), D); R.disco(X(3), Y(-7), Math.max(1, ri(2.6 * s)), L);
  R.disco(X(6), Y(-4), Math.max(1, ri(2.2 * s)), D); ps(X(7), Y(-6), H('#d8ccb0'));
  for (const [i, ph] of [[-3, 1], [-1, -1], [3, -1], [5, 1]]) R.linea(X(i), Y(-2), X(i + ph * f * 1.2), Y(0), D);
};
// una figurita lejana de pie (6–8 px) que anda o trabaja
const figurita = (x, y, t, c = H('#5a6a8a'), anda = false, dir = 1) => {
  x = ri(x); y = ri(y); const f = anda ? Math.floor(t * 6 + x) % 2 : 0;
  ps(x - f, y, H('#2a2418')); ps(x + 1 + f, y, H('#2a2418')); rr(x, y - 3, x + 1, y - 1, c); ps(x + (dir > 0 ? 1 : 0), y - 4, H('#e0b088')); ps(x, y - 5, H('#3a2a1a')); ps(x + 1, y - 5, H('#3a2a1a'));
};

// ── la olla de hierro llena de oro (de tres patas, con su asa de aro): x, base = el centro de abajo; o.s escala ──
const olla = (x, base, t, o = {}) => {
  const s = o.s ?? 1, X = (i) => ri(x + i * s), Y = (j) => ri(base + j * s), P = (i, j, c) => R.rect(X(i), Y(j), X(i) + s - 1, Y(j) + s - 1, c);
  if (o.sombra !== false) for (let i = -9; i <= 9; i++) for (let q = 0; q < s; q++) tine(X(i) + q, Y(1), K, 0.35 * (1 - (i / 10) ** 2));
  for (const i of [-5, 0, 5]) { P(i, -1, HIE[0]); P(i, 0, HIE[0]); }
  for (let j = -11; j <= -1; j++) { const u = (j + 11) / 10, w = Math.round(5 + 2.6 * Math.sin(u * Math.PI * 0.8 + 0.25));
    for (let i = -w; i <= w; i++) { const l = (-i / w) * 0.55 + (1 - u) * 0.25 - (j > -3 ? 0.3 : 0), c = Math.abs(i) === w || j === -1 ? HIE[0] : l > 0.5 ? HIE[4] : l > 0.2 ? HIE[3] : l > -0.2 ? HIE[2] : HIE[1];
      P(i, j, (c === HIE[2] || c === HIE[1]) && h2(i, j, 31) > 0.86 ? H('#6a4a3a') : c); } }
  for (let i = -7; i <= 7; i++) { P(i, -12, Math.abs(i) === 7 ? HIE[0] : i < -2 ? HIE[4] : HIE[3]); P(i, -13, Math.abs(i) >= 6 ? HIE[0] : HIE[0]); }
  if (o.oro !== false) { const ll = o.lleno ?? 1;
    for (let j = -13; j >= -13 - Math.round(4 * ll); j--) { const w = Math.round(6.2 - (-13 - j) * 1.45); for (let i = -w; i <= w; i++) { const v = h2(i, j, 7 + (o.k ?? 0)); P(i, j, v > 0.82 ? ORO[4] : v > 0.5 ? ORO[3] : v > 0.22 ? ORO[2] : ORO[1]); } }
    for (let q = 0; q < 3; q++) { const ph = (t * 1.3 + q * 0.37 + (o.k ?? 0) * 0.21) % 1; if (ph < 0.25) { const i = ri((h2(q, 1, o.k ?? 0) - 0.5) * 8), j = -14 - ri(h2(q, 2, o.k ?? 0) * 2); destello(X(i) + ri(s / 2), Y(j), ri((1 - Math.abs(ph - 0.12) * 8) * 2 * s) + 1); } } }
  if (o.asa !== false) { const aa = o.asaArriba ?? 0.4; for (let a = 0; a <= 18; a++) { const p = Math.PI * a / 18; P(Math.round(-7.5 * Math.cos(p)), Math.round(-12 - 7 * aa * Math.sin(p)), HIE[0]); } }
  return { asas: [[X(-8), Y(-11)], [X(8), Y(-11)]], arriba: [x, Y(-17)] };
};
// un saco de cuero atado (x, base: el centro de abajo), con un destello de oro en la boca
const saco = (x, base, t, k = 0, oro = true) => {
  x = ri(x); base = ri(base);
  for (let j = -9; j <= 0; j++) { const w = j < -6 ? 2 + (j + 9) * 0.6 : 4 - (j > -2 ? (j + 2) * 0.5 : 0); for (let i = -ri(w); i <= ri(w); i++) { const l = -i / w * 0.5 - (j + 5) / 10;
    ps(x + i, base + j, Math.abs(i) === ri(w) || j === 0 ? CUERO[0] : l > 0.3 ? CUERO[4] : l > 0 ? CUERO[3] : l > -0.35 ? CUERO[2] : CUERO[1]); } }
  rr(x - 2, base - 7, x + 2, base - 7, H('#c8b07a')); ps(x - 1, base - 10, CUERO[1]); ps(x + 1, base - 10, CUERO[2]);
  if (oro && Math.sin(t * 2.3 + k * 1.9) > 0.86) destello(x + 1, base - 9, 2, ORO[4]);
};
// un lingote (trapecio) de oro o de plata; x, y = el centro de abajo, s escala
const lingote = (x, y, s, P) => { x = ri(x); y = ri(y); const w = 5 * s, hh = 3 * s;
  for (let j = 0; j < hh; j++) { const ww = w - ri((hh - 1 - j) * 0.6); for (let i = -ww; i <= ww; i++) ps(x + i, y - hh + j, Math.abs(i) === ww || j === hh - 1 ? P[0] : j === 0 ? P[4] : i < -ww * 0.3 ? P[3] : P[2]); }
  rr(x - w + 1, y - hh, x + w - 1, y - hh, P[4]); };
// un pico (herramienta): mango del punto (x0, y0) al (x1, y1) y la cabeza de hierro en (x1, y1)
const pico = (x0, y0, x1, y1) => { R.linea(ri(x0), ri(y0), ri(x1), ri(y1), H('#5a3a1e')); R.linea(ri(x0), ri(y0) - 1, ri(x1), ri(y1) - 1, H('#9a6c40'));
  const dx = x1 - x0, dy = y1 - y0, n = Math.hypot(dx, dy) || 1, px = -dy / n, py = dx / n;
  R.linea(ri(x1 - px * 5), ri(y1 - py * 5), ri(x1 + px * 5), ri(y1 + py * 5), HIE[0]); R.linea(ri(x1 - px * 4), ri(y1 - py * 4 - 1), ri(x1 + px * 4), ri(y1 + py * 4 - 1), HIE[3]); };
const pala = (x0, y0, x1, y1) => { R.linea(ri(x0), ri(y0), ri(x1), ri(y1), H('#5a3a1e')); R.linea(ri(x0) + 1, ri(y0), ri(x1) + 1, ri(y1), H('#9a6c40'));
  const dx = x1 - x0, dy = y1 - y0, n = Math.hypot(dx, dy) || 1, ux = dx / n, uy = dy / n; R.poligono([[ri(x1 - uy * 3), ri(y1 + ux * 3)], [ri(x1 + uy * 3), ri(y1 - ux * 3)], [ri(x1 + ux * 6 + uy * 2), ri(y1 + uy * 6 - ux * 2)], [ri(x1 + ux * 6 - uy * 2), ri(y1 + uy * 6 + ux * 2)]], HIE[2]); };
// un rifle de chispa (cañón largo y culata), de (x0, y0) — la culata — a (x1, y1) — la boca
const rifle = (x0, y0, x1, y1) => { R.linea(ri(x0), ri(y0), ri(x1), ri(y1), HIE[1]); const mx = x0 + (x1 - x0) * 0.3, my = y0 + (y1 - y0) * 0.3; R.linea(ri(x0), ri(y0), ri(mx), ri(my), H('#7a4a26')); R.linea(ri(x0), ri(y0) + 1, ri(mx), ri(my) + 1, H('#5a3418')); };

// ── un cielo tramado para los fondos locales: degradado en rampa, cúmulos de tres tonos a tres velocidades y aves ──
const nubeT = (cx, base, w, t, tonos) => {
  const bumps = [[-0.36, 0.2], [-0.12, 0.3], [0.14, 0.27], [0.36, 0.17]].map(([dx, r]) => [cx + dx * w, r * w]);
  const x0 = ri(cx - w * 0.6), x1 = ri(cx + w * 0.6), y0 = ri(base - w * 0.45);
  for (let y = Math.max(0, y0); y <= ri(base); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    let best = -1; for (const [bx, r] of bumps) { const by = base - r * 0.55, d = Math.hypot(x - bx, (y - by) * 1.15) / r; if (d < 1) best = Math.max(best, 1 - d + (bx - x) / (w * 2) * 0 + (by - y) / r * 0.6); }
    if (best < 0) continue;
    const v = y > base - 2 ? 0.4 : Math.min(2.99, best * 2.6 + (base - y) / (w * 0.45) * 0.6);
    R.pset(x, y, rmp(tonos, v, x, y));
  }
};
const avesT = (t, y0, n = 3, c = H('#2a2a3a')) => { for (let k = 0; k < n; k++) { const x = ((k * 97 + t * (9 + k * 2)) % 380) - 30, y = y0 + k * 6 + Math.sin(t * 0.8 + k) * 3, a = Math.sin(t * 10 + k * 2) > 0;
  if (x > 270 && y < 48) continue; ps(x, y, c); ps(x - 1, y + (a ? -1 : 1), c); ps(x + 1, y + (a ? -1 : 1), c); ps(x - 2, y + (a ? -1 : 0), c); ps(x + 2, y + (a ? -1 : 0), c); } };
// ── P1 · VIRGINIA, ABRIL DE 1817 (fondo local): la granja al pie del Blue Ridge en primavera; la partida sale al oeste ──
const VA = {
  cielo: pal(['#4e7ed0', '#628ed8', '#78a0e0', '#90b4e8', '#acc8f0', '#c8dcf4']),
  nube: pal(['#9aaccc', '#c8d4e8', '#f4f8ff']),
  lejos: pal(['#6a7eae', '#7e92bc', '#94a6c8', '#aab8d4']), cerca: pal(['#44607e', '#52708c', '#62809a', '#7894aa']),
  verde: pal(['#2e5a2a', '#3e7234', '#52883e', '#6aa04a', '#86b85a', '#a4cc72']),
  tierra: pal(['#5a4228', '#7a5a36', '#9a7a4e', '#b89a6a', '#d0b88a']),
  surco: pal(['#4e3a24', '#6e5232', '#8a6a44']),
  blanco: pal(['#8e887c', '#bab2a4', '#ece6da', '#ffffff']), tejado: pal(['#4a1e1a', '#7a2e28', '#a8443a', '#c86a5a']),
  rojo: pal(['#4e1c16', '#7a2a22', '#9a3a2e', '#b85a48']), madera: pal(['#3a2818', '#5a4428', '#8a6a44', '#a8885a']),
  flor: pal(['#e8e0e8', '#f8f4f8', '#ffffff']), rosa: pal(['#a83a78', '#d86aa8', '#f0a0c8']),
};
const BVA = R.nuevo(); let hechoVA = false;
const crestaVA = (x, k, a, b) => a + Math.sin(x * 0.021 + k) * b + Math.sin(x * 0.057 + k * 2.3) * b * 0.45 + Math.sin(x * 0.13 + k) * b * 0.15;
const fondoVA = () => {
  if (hechoVA) return; hechoVA = true;
  const prev = R.usar(BVA);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(VA.cielo, Math.min(5, y / 62 * 5.2), x, y));
  // el Blue Ridge: dos crestas azules con la bruma de la mañana y las vaguadas
  for (let x = 0; x < 320; x++) {
    const c1 = ri(crestaVA(x, 1.1, 60, 9) - (x > 60 && x < 210 ? Math.sin((x - 60) / 150 * Math.PI) * 8 : 0)), c2 = ri(crestaVA(x, 3.7, 74, 6));
    for (let y = Math.max(48, c1); y < 100; y++) { const v = 3 - (y - c1) / 14 + (h2(x >> 2, y >> 2, 3) - 0.5) * 0.6 + (Math.sin(x * 0.2 + y * 0.05) > 0.92 ? -1 : 0); R.pset(x, y, rmp(VA.lejos, Math.max(0, v), x, y)); }
    for (let y = c2; y < 104; y++) { const v = 3 - (y - c2) / 10 + (h2(x >> 1, y >> 1, 4) - 0.5) * 0.8 + ((x + y * 2) % 17 === 0 ? -1 : 0); R.pset(x, y, rmp(VA.cerca, Math.max(0, v), x, y)); }
  }
  // las lomas verdes con prados, campos arados y setos
  for (let x = 0; x < 320; x++) { const c3 = ri(86 + Math.sin(x * 0.03 + 0.6) * 5 + Math.sin(x * 0.011) * 4);
    for (let y = c3; y < 138; y++) {
      const campo = ((Math.floor((x + y * 1.7) / 46) + Math.floor(y / 11)) % 4), u = (y - c3) / 50;
      let c;
      if (campo === 1 && y < 118 && x < 200) c = (x + Math.floor(y * 2.2)) % 4 < 2 ? VA.surco[1] : VA.surco[(y & 1) ? 2 : 0];
      else if (campo === 3 && y < 116) c = rmp(VA.verde, 4.2 - u * 1.2 + (h2(x >> 1, y, 5) - 0.5), x, y);
      else c = rmp(VA.verde, 3.2 - u * 1.3 + (h2(x >> 1, y >> 1, 6) - 0.5) * 1.2, x, y);
      if (((x + Math.floor(y * 1.7)) % 46 === 0 || y % 11 === 0) && y < 118 && h2(x, y, 9) > 0.3) c = VA.verde[1];
      R.pset(x, y, c);
    } }
  // árboles del linde (copas redondas de tres verdes) y cornejos en flor sueltos por la loma
  for (let k = 0; k < 34; k++) { const x = ri(h2(k, 1, 11) * 320), y = ri(92 + h2(k, 2, 11) * 22), r = 2 + ri(h2(k, 3, 11) * 3), fl = k % 5 === 0;
    if (x > 196 && x < 296 && y < 116) continue;
    R.rect(x, y, x, y + r + 2, VA.madera[0]); R.disco(x, y, r + 1, VA.verde[0]); R.disco(x - 1, y - 1, r, VA.verde[2]); R.disco(x - 1, y - 2, Math.max(1, r - 2), VA.verde[4]);
    if (fl) for (let q = 0; q < 6; q++) R.pset(x - r + ri(h2(k, q, 19) * r * 2), y - r + ri(h2(q, k, 19) * r * 1.6), q % 2 ? VA.rosa[1] : VA.rosa[2]); }
  // LA GRANJA: casa blanca de tablas con porche, tejado rojo y chimenea de ladrillo; granero rojo; el camino de la casa
  const cx0 = 206, cx1 = 250, cy0 = 92, cy1 = 116;
  for (let y = cy0; y <= cy1; y++) for (let x = cx0; x <= cx1; x++) R.pset(x, y, (y - cy0) % 3 === 2 ? VA.blanco[1] : x < cx0 + 3 ? VA.blanco[1] : VA.blanco[2]);
  R.poligono([[cx0 - 4, cy0], [cx1 + 4, cy0], [cx1 - 6, cy0 - 12], [cx0 + 6, cy0 - 12]], VA.tejado[1]);
  for (let y = cy0 - 11; y < cy0; y++) for (let x = cx0; x <= cx1; x++) if (R.pget(x, y) === VA.tejado[1]) R.pset(x, y, (y % 2 === 0 && (x + y) % 6 === 0) ? VA.tejado[0] : y < cy0 - 8 ? VA.tejado[3] : VA.tejado[2]);
  R.rect(cx0 - 4, cy0, cx1 + 4, cy0, VA.tejado[0]);
  R.rect(cx1 - 12, cy0 - 18, cx1 - 8, cy0 - 8, VA.rojo[2]); R.rect(cx1 - 13, cy0 - 19, cx1 - 7, cy0 - 18, VA.rojo[0]); for (let y = cy0 - 17; y < cy0 - 8; y += 2) R.rect(cx1 - 12, y, cx1 - 8, y, VA.rojo[1]);
  for (const wx of [cx0 + 6, cx0 + 18, cx0 + 32]) { R.rect(wx, cy0 + 4, wx + 5, cy0 + 10, K); R.rect(wx + 1, cy0 + 5, wx + 4, cy0 + 9, H('#5a7aa0')); R.pset(wx + 1, cy0 + 5, H('#c8dcf0')); R.rect(wx - 1, cy0 + 4, wx - 1, cy0 + 10, H('#3a5a3a')); R.rect(wx + 6, cy0 + 4, wx + 6, cy0 + 10, H('#3a5a3a')); }
  R.rect(cx0 + 24, cy0 + 12, cx0 + 29, cy1, VA.madera[1]); R.rect(cx0 + 25, cy0 + 13, cx0 + 28, cy1, VA.madera[2]); R.pset(cx0 + 27, cy0 + 18, VA.tejado[3]);
  R.rect(cx0 - 2, cy0 + 11, cx1 + 2, cy0 + 12, VA.blanco[1]); for (let x = cx0; x <= cx1; x += 7) R.rect(x, cy0 + 12, x, cy1, VA.blanco[3]);
  // el granero
  const gx0 = 260, gx1 = 294, gy0 = 96, gy1 = 118;
  R.rect(gx0, gy0, gx1, gy1, VA.rojo[2]); for (let x = gx0; x <= gx1; x += 3) R.rect(x, gy0, x, gy1, VA.rojo[1]);
  R.poligono([[gx0 - 3, gy0], [gx1 + 3, gy0], [ri((gx0 + gx1) / 2), gy0 - 12]], VA.tejado[0]); R.linea(gx0 - 3, gy0, ri((gx0 + gx1) / 2), gy0 - 12, VA.tejado[2]);
  R.rect(gx0 + 11, gy0 + 6, gx1 - 11, gy1, VA.rojo[0]); R.linea(gx0 + 11, gy0 + 6, gx1 - 11, gy1, VA.blanco[2]); R.linea(gx1 - 11, gy0 + 6, gx0 + 11, gy1, VA.blanco[2]); R.rect(gx0 + 11, gy0 + 6, gx1 - 11, gy0 + 6, VA.blanco[2]);
  R.rect(gx0 + 15, gy0 - 6, gx0 + 19, gy0 - 2, K); R.rect(gx0 + 16, gy0 - 5, gx0 + 18, gy0 - 3, H('#e8c060'));
  // el camino de la casa que baja a la cancela (x 250–262)
  for (let y = cy1; y < 138; y++) { const xa = ri(lerp(228, 252, (y - cy1) / 22)); for (let x = xa - 3; x <= xa + 3 + ri((y - cy1) / 6); x++) R.pset(x, y, rmp(VA.tierra, 2.4 + (h2(x, y, 12) - 0.5), x, y)); }
  // EL CAMINO de tierra en primer término, con rodadas, piedras y un charco
  for (let y = 132; y < 166; y++) for (let x = 0; x < 320; x++) { const borde = y < 135 || y > 162, rod = Math.abs(y - 145) < 1 || Math.abs(y - 155) < 1;
    let v = 2.6 + (h2(x >> 1, y, 13) - 0.5) * 0.9 - (rod ? 1.2 : 0) - (borde ? 0.8 : 0) + (y > 148 && y < 152 ? 0.4 : 0);
    R.pset(x, y, borde && h2(x, y, 14) > 0.5 ? VA.verde[2] : rmp(VA.tierra, v, x, y)); }
  for (let k = 0; k < 40; k++) { const x = ri(h2(k, 1, 15) * 318), y = ri(136 + h2(k, 2, 15) * 26); R.pset(x, y, VA.tierra[4]); R.pset(x + 1, y, VA.tierra[1]); }
  R.disco(96, 158, 4, VA.tierra[1]); for (let x = 90; x <= 102; x++) for (let y = 156; y <= 160; y++) if (Math.hypot((x - 96) / 6, (y - 158) / 2.2) < 1) R.pset(x, y, (x + y) % 3 ? H('#8aaad0') : H('#c8dcf0'));
  // la cerca de troncos en zigzag a lo largo del camino (con la cancela abierta en x 250–262)
  for (let x = 0; x < 320; x += 12) { if (x > 244 && x < 266) continue; const z = (x / 12) % 2 ? 2 : -2;
    for (const yy of [122, 127, 132]) { R.linea(x, yy + z, x + 12, yy - z, VA.madera[0]); R.linea(x, yy + z - 1, x + 12, yy - z - 1, VA.madera[3]); }
    R.rect(x, 118 + z, x + 1, 134, VA.madera[1]); }
  R.linea(262, 120, 276, 128, VA.madera[1]); R.linea(262, 126, 276, 133, VA.madera[1]); R.linea(262, 119, 276, 127, VA.madera[3]);
  // la hierba de delante con flores (dientes de león y violetas)
  for (let y = 162; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 3.2 + (y - 162) / 14 + (h2(x, y >> 1, 16) - 0.5) * 1.4; R.pset(x, y, rmp(VA.verde, v, x, y)); }
  for (let k = 0; k < 70; k++) { const x = ri(h2(k, 1, 17) * 320), y = ri(164 + h2(k, 2, 17) * 15); R.pset(x, y, k % 3 ? H('#f0d040') : H('#9a7ad8')); R.pset(x, y + 1, VA.verde[1]); }
  // el cornejo en flor de la izquierda (tronco y copa blanca) que enmarca
  for (let y = 96; y < 166; y++) { const w = y > 156 ? 5 + (y - 156) * 0.4 : 3 + Math.sin(y * 0.3) * 0.5, cx = 12 + Math.sin(y * 0.07) * 2; for (let x = ri(cx - w); x <= ri(cx + w); x++) R.pset(x, y, x === ri(cx - w) || x === ri(cx + w) ? VA.madera[0] : rmp(VA.madera, 2.4 - (x - cx) / w * 0.8 + ((x * 3 + y) % 7 === 0 ? -1 : 0) + (h2(x, y >> 1, 20) - 0.5) * 0.6, x, y)); }
  for (const [x0, y0, x1, y1] of [[12, 112, 36, 94], [12, 104, -2, 88], [24, 102, 30, 84], [10, 98, 16, 78]]) { R.linea(x0, y0, x1, y1, VA.madera[0]); R.linea(x0 + 1, y0, x1 + 1, y1, VA.madera[2]); }
  R.linea(12, 112, 34, 96, VA.madera[1]); R.linea(12, 106, -4, 92, VA.madera[1]);
  for (let k = 0; k < 150; k++) { const a = h2(k, 1, 18) * Math.PI * 2, d = Math.sqrt(h2(k, 2, 18)), x = ri(22 + Math.cos(a) * d * 32), y = ri(86 + Math.sin(a) * d * 20); if (y < 64) continue;
    R.disco(x, y, 2, VA.verde[1]); R.pset(x, y, VA.flor[k % 3]); R.pset(x + 1, y, VA.flor[1]); R.pset(x, y - 1, VA.flor[2]); }
  R.usar(prev);
};
const P1 = (t) => {
  fondoVA(); R.buf.set(BVA);
  // nubes a tres velocidades y golondrinas
  for (const [x0, y, w, v] of [[30, 26, 46, 1.2], [150, 18, 60, 0.7], [230, 40, 30, 1.8], [96, 44, 26, 2.2]]) { const x = ((x0 + t * v) % 400) - 40; if (x > 240 && y < 46) continue; nubeT(x, y, w, t, VA.nube); }
  avesT(t, 30, 3);
  // humo de la chimenea, que se va a la izquierda
  for (let k = 0; k < 6; k++) { const u = (t * 0.4 + k / 6) % 1, x = 238 - u * 22 + Math.sin(u * 6 + k) * 2, y = 72 - u * 22; R.disco(ri(x), ri(y), ri(1 + u * 3), mez(H('#d8dce4'), H('#a8b4c8'), u)); }
  // gente pequeña en la granja: un mozo con un cubo, gallinas junto al granero
  figurita(272 + Math.sin(t * 0.6) * 8, 121, t, H('#7a5a3a'), true, Math.cos(t * 0.6) > 0 ? 1 : -1);
  for (let k = 0; k < 3; k++) { const x = ri(282 + k * 6 + Math.sin(t * 1.3 + k) * 3), y = 124 + (k % 2); ps(x, y - 2, H('#f4f0e8')); ps(x + 1, y - 2, H('#f4f0e8')); ps(x + 2, y - 3, H('#c83a2a')); ps(x, y - 1, H('#e0d8c8')); ps(x + (Math.sin(t * 6 + k) > 0 ? 2 : 1), y - 1 + (Math.sin(t * 6 + k) > 0 ? 1 : 0), H('#e8a040')); }
  // LA PARTIDA A LO LEJOS: la columna de jinetes (casi treinta) que ya baja por el camino de la loma hacia el oeste
  for (let k = 0; k < 22; k++) { const x = 150 - t * 6 + k * 9 + (k % 3) * 2, y = 113 + Math.sin(x * 0.04) * 2; if (x < -10 || x > 200) continue; jineteMini(x, y, t, -1, [H('#a8443a'), H('#5a6a4a'), H('#8a6a48'), H('#3a5a8a')][k % 4], false); }
  // la mujer de la granja en la cancela: despide con la mano
  const mu = t > 1.6 && t < TB.MEN + 0.2;
  R.actor(BL.mujerAmigoBL, 214, 119, t, { dir: -1, brazos: mu && Math.sin(t * 5) > 0, dedo: mu && Math.sin(t * 5) <= 0, sonrisa: true });
  // el perro de la granja que corre junto a los caballos y ladra
  const px = ri(lerp(270, 150, tramo(t, 1.4, TB.MEN))); R.perro(px, 160, t, { dir: -1, corre: true, anda: true });
  // BEALE delante, y sus hombres detrás con la mula de carga: salen al oeste (a la izquierda)
  const u = (t - 0.4) / (TB.MEN - 0.4), xB = lerp(238, 92, cl(u));
  const fila = [[BL.cazadorBL, 'tordo'], [BL.cazador2BL, 'bayo'], ['mula'], [BL.cazadorBL, 'pinto', { C: '#3a5a8a', c: '#2a4268' }], [BL.cazador2BL, 'pardo', { C: '#8a7a4a', c: '#6a5a34' }]];
  for (let k = fila.length - 1; k >= 0; k--) { const [d, col, pc] = fila[k], x = xB + 34 * (k + 1) + (k > 2 ? 4 : 0);
    if (d === 'mula') { T.b_mula(R, ri(x), 152, t, { dir: -1, anda: true }); continue; }
    jinete(d, x, 151 + (k % 2), t, { dir: -1, anda: true, color: col, k, a: { pal: pc, habla: k === 0 && t > 2.4 && t < 3.6 && parp(t) } }); }
  const dedoB = t > TB.BEALE - 0.1 && t < TB.MEN + 0.2;
  jinete(BL.bealeOesteBL, xB, 150, t, { dir: -1, anda: true, color: 'bayo', a: { dedo: dedoB, habla: t > TB.BEALE - 0.2 && t < TB.MEN && parp(t), sonrisa: !dedoB } });
  // pétalos del cornejo que caen
  for (let k = 0; k < 10; k++) { const v = 8 + (k % 3) * 3, y = 70 + ((k * 23 + t * v) % 110), x = 10 + ((k * 31 + t * 7) % 90) + Math.sin(t * 2 + k) * 4; ps(x, y, VA.flor[2]); if (k % 2) ps(x + 1, y, VA.flor[1]); }
  // «about 30 men»: el 30 sale encima de la columna lejana
  const n30 = pop(t, TB.N30 - 0.05, 0.35);
  if (n30 > 0) { luz(120, 100, 22, H('#fff4c0'), 0.35 * Math.min(1, n30)); R.numero('30', 120, ri(104 - 6 * Math.min(1, n30)), { tam: 16, centro: true }); }
};
// ── P2 · LAS LLANURAS (oeste 'llanura', cámara 'manada'): la partida caza; la estampida corre por la loma ──
const O2 = { encuadre: 'llanura', camara: 'manada' };
const P2 = (t) => {
  T.oeste(R, t, O2);
  // la estampida de media distancia (por la pradera vacía de la loma, y 84–108) con su polvo
  const u0 = t - TB.MEN;
  for (let k = 0; k < 16; k++) { const v = 26 + (k % 4) * 3, x = 340 - ((u0 * v + h2(k, 1, 40) * 300) % 380), y = 92 + ri(h2(k, 2, 40) * 16), s = 0.75 + (y - 92) / 40;
    for (let q = 0; q < 4; q++) { const px = x + 8 + q * 4, py = y - 2 - q % 2; tine(px, py, H('#d8c8a0'), 0.25); tine(px + 1, py - 1, H('#e8dcc0'), 0.2); }
    bufaloMini(x, y, t, -1, s, k); }
  // un jinete lejano que galopa detrás de la manada
  jineteMini(360 - u0 * 34, 106, t, -1, H('#5a6a4a'));
  jineteMini(400 - u0 * 34, 103, t, -1, H('#a8443a'));
  // LOS CAZADORES de primer término: galopan tras la manada; Beale señala los búfalos («buffalo»), otro alza el sombrero
  const g = [[BL.bealeOesteBL, 0, 'bayo', 150], [BL.cazadorBL, 46, 'tordo', 156], [BL.cazador2BL, 92, 'pinto', 147]];
  for (const [d, dx, col, s] of g.sort((a, b) => a[3] - b[3])) { const x = 300 + dx - (t - TB.MEN) * 62;
    const a = d === BL.bealeOesteBL ? { dedo: t > TB.BUFFALO - 0.1, habla: t > TB.BUFFALO && t < TB.PLAINS + 0.5 && parp(t), sonrisa: true }
      : d === BL.cazadorBL ? { brazos: t > TB.PLAINS && t < TB.PLAINS + 0.9, sonrisa: true } : { sorpresa: t > TB.PLAINS + 0.6 };
    jinete(d, x, s, t, { dir: -1, galope: true, color: col, k: dx, a }); }
  T.oesteDelante(R, t, O2);
};
// ── P3 · EL MAPA DEL OESTE (T.mapa 'oeste'): la ruta llega por el camino de Santa Fe, el invierno en Santa Fe y la
// partida pequeña que sube al norte detrás de una manada hasta el barranco ──
const SANTAFE = [-105.94, 35.69], BARRANCO = [-105.1, 38.5], BEDFORD = [-79.52, 37.33], BANCO = [-90.2, 38.63];
const RUTA_IDA = [[-95.0, 38.9], [-97.2, 38.6], [-99.6, 38.1], [-101.8, 37.9], [-103.5, 37.8], [-104.4, 37.0], [-105.2, 36.2], SANTAFE];
const RUTA_N = [SANTAFE, [-105.6, 36.5], [-105.3, 37.3], [-105.0, 37.9], BARRANCO];
const tienda = (x, y, c = H('#e8dcc0')) => { R.poligono([[x - 8, y], [x + 8, y], [x, y - 11]], K); R.poligono([[x - 7, y - 1], [x + 7, y - 1], [x, y - 10]], c); R.poligono([[x - 7, y - 1], [x - 1, y - 1], [x, y - 10]], H('#b8a888')); R.linea(x, y - 9, x, y - 1, H('#5a4a3a')); R.rect(x - 1, y - 4, x + 1, y - 1, H('#3a2a1a')); };
const P3 = (t) => {
  const P = T.mapa(R, t, { zoom: 2.5, centro: [-105.5, 37.4], rosa: [58, 146] }), Q = (p) => P(p).map(ri);
  R.recorte([20, 14, 300, 170]);
  const ida = tramo(t, TB.AFTER - 0.1, TB.SANTA);
  if (ida > 0) R.ruta(RUTA_IDA.map(Q), ida, C.rojo, { grueso: true });
  // el invierno en Santa Fe: la chincheta cae y una nube nieva encima
  const [sx, sy] = Q(SANTAFE);
  const inv = tramo(t, TB.SANTA, TB.SANTA + 0.4) * (1 - tramo(t, TB.CAMPED, TB.CAMPED + 0.6));
  if (inv > 0) { const nx = sx + 2, ny = sy - 26;
    for (let k = 0; k < 30; k++) { const v = 6 + (k % 3) * 3, yy = ny + 3 + ((k * 7 + t * v) % 22), xx = nx - 15 + ((k * 7) % 31) + Math.sin(t * 2 + k); if (Math.hypot(xx - nx, (yy - ny - 10) * 0.8) < 17 * inv) { ps(xx, yy, H('#ffffff')); ps(xx + 1, yy, H('#c8d8f0')); } }
    nubeT(nx, ny + 2, 36 * inv, t, pal(['#7a8aa8', '#aab8cc', '#e8eef8'])); }
  if (t > TB.SANTA - 0.1) T.chincheta(R, sx, sy, t, C.rojo, { baja: tramo(t, TB.SANTA - 0.1, TB.SANTA + 0.3) });
  // unos pocos siguen a una manada hacia el norte: el búfalo corre delante por la ruta y la ruta se pinta detrás
  const nor = tramo(t, TB.FEW, TB.CAMPED);
  if (nor > 0) { const pts = RUTA_N.map(Q); R.ruta(pts, nor, H('#3a5a8a'), { grueso: true });
    let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    let q = L * nor, i = 0; while (i < seg.length - 1 && q > seg[i]) { q -= seg[i]; i++; } const f = Math.min(1, q / seg[i]), bx = lerp(pts[i][0], pts[i + 1][0], f), by = lerp(pts[i][1], pts[i + 1][1], f);
    if (nor < 1) { bufaloMini(bx + 2, by - 6, t, -1, 1.4, 1); jineteMini(bx + 2, by + 12, t, -1, H('#a8443a')); jineteMini(bx + 6, by + 22, t, -1, H('#5a6a4a')); } }
  // el campamento en el barranco: la tienda y la chincheta dorada
  const cam = pop(t, TB.CAMPED - 0.05, 0.35);
  if (cam > 0) { const [bx, by] = Q(BARRANCO); luz(bx, by - 4, 16, H('#ffd890'), 0.3 * Math.min(1, cam)); tienda(bx - 8, by + 2); tienda(bx + 6, by + 3, H('#d8c8a0')); R.disco(bx, by + 6, 2, H('#ff9a3a')); ps(bx, by + 4, H('#ffe080')); T.chincheta(R, bx, by - 8, t, C.oro, { baja: Math.min(1, cam) }); }
  R.recorte(null);
};
// ── P4 · EL BARRANCO AL ATARDECER (oeste 'barranco'): la cena al fuego; uno ve brillar algo en la roca ──
const brillo4 = (t) => t < TB.ONE - 0.3 ? 0 : 0.08 + 0.17 * tramo(t, TB.ONE - 0.3, TB.SOMETHING);
const P4 = (t) => {
  const O = { encuadre: 'barranco', brillo: brillo4(t) };
  const g = T.oeste(R, t, O);
  // la leña que llega: un cazador entra con un haz de leña y lo suelta junto al fuego en «supper»
  const lle = tramo(t, TB.IN1 + 0.2, TB.SUPPER - 0.2), xl = ri(lerp(-14, 92, lle)), suelta = t > TB.SUPPER - 0.1;
  for (let k = 0; k < (suelta ? 3 : 0); k++) { R.rect(100 + k * 2, 140 - k * 2, 116 - k, 142 - k * 2, H('#4a2e18')); R.rect(100 + k * 2, 140 - k * 2, 116 - k, 140 - k * 2, H('#8a5a30')); }
  const am = R.actor(BL.cazadorBL, xl, 151, t, { dir: 1, anda: lle > 0 && lle < 1, sostiene: suelta ? undefined : true, sonrisa: suelta, pal: { C: '#3a5a8a', c: '#2a4268' } }).mano;
  if (!suelta) for (let k = 0; k < 3; k++) { R.rect(am[0] - 6, am[1] - 3 + k * 2, am[0] + 6, am[1] - 2 + k * 2, H('#4a2e18')); R.rect(am[0] - 6, am[1] - 3 + k * 2, am[0] + 6, am[1] - 3 + k * 2, H('#8a5a30')); }
  // el cocinero remueve la olla del trípode con el cucharón
  const rem = Math.sin(t * 3.2), mc = R.actor(BL.cazador2BL, 104, 151, t, { dir: 1, sostiene: [122 + ri(rem * 2), 128], habla: t > TB.SUPPER && t < TB.ONE && parp(t) }).mano;
  R.linea(mc[0], mc[1], 129 + ri(rem * 2), 134, H('#7a5a3a')); R.linea(mc[0], mc[1] + 1, 129 + ri(rem * 2), 135, H('#4a3220'));
  // Beale, sentado en la silla de montar junto al fuego, con su taza, habla y se ríe
  R.actor(BL.bealeOesteBL, 150, 151, t, { dir: -1, sostiene: [146, 132 + (Math.sin(t * 1.4) > 0.6 ? -2 : 0)], habla: t > TB.RAVINE && t < TB.WHILE + 0.4 && parp(t), sonrisa: t > TB.WHILE + 0.4 && t < TB.ONE });
  { const [cx, cy] = [146, 132 + (Math.sin(t * 1.4) > 0.6 ? -2 : 0)]; R.rect(cx - 2, cy - 4, cx + 1, cy, K); R.rect(cx - 1, cy - 3, cx, cy - 1, H('#c8ccd4')); }
  // EL QUE LO VE: estaba mirando el fuego; en «saw» se vuelve hacia la grieta, se sorprende y la señala
  const ve = t > TB.SAW - 0.15;
  R.actor(BL.cazadorBL, 178 + (ve ? 6 : 0), 152, t, { dir: ve ? 1 : -1, sorpresa: ve, dedo: t > TB.SAW, anda: t > TB.SAW - 0.15 && t < TB.SAW + 0.15, pal: { C: '#8a7a4a', c: '#6a5a34' } });
  if (ve) { const e = pop(t, TB.SAW, 0.25); if (e > 0) R.icono('!', 190, ri(118 - 4 * e), H('#ffe080'), K, 1); }
  T.oesteDelante(R, t, O);
};
// ── P5 · LA ROCA DE CERCA (oeste 'barranco', cámara 'roca'): la tea se acerca, la sombra del cazador en la pared, la
// veta brilla cada vez más y en «gold» estalla (el golpe) ──
const brillo5 = (t) => Math.max(0.25 + 0.3 * tramo(t, TB.SOMETHING, TB.ROCKS) + 0.15 * tramo(t, TB.ROCKS + 0.4, TB.GOLD - 0.2), t >= TB.GOLD ? 1 : 0);
const P5 = (t) => {
  const O = { encuadre: 'barranco', camara: 'roca', brillo: brillo5(t) };
  const g = T.oeste(R, t, O);
  const [bx, by] = g.brillo ?? [176, 90];
  // la sombra del cazador que sube por la pared (cabeza con sombrero y hombros), proyectada por la tea de abajo
  const ac = tramo(t, TB.SOMETHING - 0.3, TB.IT), sx = lerp(40, 118, ac), sy = lerp(150, 112, ac);
  for (let y = -30; y <= 40; y++) for (let x = -34; x <= 34; x++) {
    const cab = Math.hypot(x / 11, (y + 8) / 12) < 1, ala = Math.abs(y + 16) < 2 && Math.abs(x) < 19, copa = y < -16 && y > -26 && Math.abs(x) < 9, hombros = y > 4 && Math.abs(x) < 26 - Math.max(0, 14 - y) * 0.9;
    if (cab || ala || copa || hombros) tine(sx + x, sy + y, H('#1e0e10'), 0.42);
  }
  // la luz de la tea, que tiembla y se acerca a la veta
  const fl = 0.85 + Math.sin(t * 19) * 0.08 + Math.sin(t * 7.3) * 0.07, tx = lerp(70, 148, ac), ty = lerp(176, 128, ac);
  luz(tx, ty, 70 * fl, H('#ffb860'), 0.42);
  // el golpe en «gold»: un fogonazo dorado, un anillo que se abre y chispas que saltan
  const gol = tramo(t, TB.GOLD, TB.GOLD + 0.7);
  if (t >= TB.GOLD - 0.02) {
    if (gol < 1) for (let y = 0; y < 180; y += 1) for (let x = (y & 1); x < 320; x += 2) tine(x, y, H('#fff4c0'), 0.5 * (1 - gol));
    const r = 8 + gol * 60; for (let a = 0; a < 90; a++) { const p = a / 90 * Math.PI * 2; ps(bx + Math.cos(p) * r, by + Math.sin(p) * r * 0.8, mez(H('#fff0a0'), H('#e0a830'), gol)); }
    for (let k = 0; k < 14; k++) { const p = k / 14 * Math.PI * 2 + 0.3, d = 6 + ((t - TB.GOLD) * 40 + k * 7) % 46; if ((t - TB.GOLD) * 40 + k * 7 > 80) continue; destello(bx + Math.cos(p) * d, by + Math.sin(p) * d * 0.8, 1 + (k % 2), ORO[4]); }
    luz(bx, by, 46, H('#ffe080'), 0.45 + 0.08 * Math.sin(t * 6));
  }
};
// ── P6 · LA PLAZA DE SANTA FE (fondo local, primavera de 1818): el palacio de adobe con su portal, la iglesia de dos
// torres, los montes Sangre de Cristo con nieve, la carreta de pieles; el mensajero llega al galope con la pepita y
// Beale sale de la cantina ──
const SF = {
  cielo: pal(['#3a6cc4', '#4c7ed0', '#6292da', '#7ca8e4', '#9cc0ec', '#bcd6f2']), nube: pal(['#a8b4cc', '#d4dcec', '#f8faff']),
  monte: pal(['#4a4a6a', '#5e5a7a', '#76708a', '#8e88a0']), nieve: pal(['#b8c4dc', '#dce4f2', '#ffffff']), pino: pal(['#24402e', '#2e5236', '#3e6640']),
  adobe: pal(['#6e4a32', '#9a6a48', '#b8865e', '#d0a274', '#e2bc90']), suelo: pal(['#8a6a48', '#a88660', '#c0a078', '#d4b890']),
  viga: pal(['#3a2416', '#5a3a22', '#7a5232']), chile: pal(['#6a1410', '#a8241c', '#d8402a']), cal: pal(['#b8b0a0', '#ded6c6', '#f4eee2']),
};
const BSF = R.nuevo(); let hechoSF = false;
// un muro de adobe con su textura (revoque desigual, grietas, manchas de lluvia) entre x0..x1, y0..y1, con luz l
const adobeM = (x0, y0, x1, y1, l = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
  let v = 2.4 + l + (h2(x >> 1, y >> 1, 41) - 0.5) * 0.9 + (h2(x >> 3, y >> 3, 42) - 0.5) * 0.6 - (y > y1 - 3 ? 0.9 : 0) - (x === x0 ? 0.6 : 0);
  if ((x * 7 + y * 3) % 53 === 0) v -= 1.3; R.pset(x, y, rmp(SF.adobe, v, x, y)); } };
const fondoSF = () => {
  if (hechoSF) return; hechoSF = true; const prev = R.usar(BSF);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(SF.cielo, Math.min(5, y / 70 * 5.4), x, y));
  // los Sangre de Cristo: cumbres con nieve, pinares en la falda y cárcavas
  for (let x = 0; x < 320; x++) { const c = ri(52 + Math.sin(x * 0.024 + 0.4) * 10 + Math.sin(x * 0.07 + 1) * 4 + (x > 250 ? (x - 250) * 0.12 : 0));
    for (let y = c; y < 96; y++) { const d = y - c, nv = d < 7 - Math.sin(x * 0.3) * 3 && c < 54;
      let col = nv ? rmp(SF.nieve, 2 - d / 4 + (h2(x, y, 43) - 0.5), x, y) : rmp(SF.monte, 3 - d / 12 + (h2(x >> 1, y >> 1, 44) - 0.5) * 0.8, x, y);
      if (!nv && d > 12 && h2(x >> 1, y >> 1, 45) > 0.55) col = SF.pino[(x + y) % 3 === 0 ? 2 : 1];
      if ((x + d * 2) % 29 === 0 && d > 3) col = SF.monte[0];
      R.pset(x, y, col); } }
  // el suelo de la plaza: tierra apisonada con rodadas de carreta, piedras, charcos de nieve derretida
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const rod = Math.abs(y - (150 + Math.sin(x * 0.03) * 3)) < 1 || Math.abs(y - (160 + Math.sin(x * 0.03 + 1) * 3)) < 1;
    R.pset(x, y, rmp(SF.suelo, 2.2 + (h2(x >> 1, y, 46) - 0.5) * 1.1 - (rod ? 1.1 : 0) - (y < 118 ? 0.6 : 0), x, y)); }
  for (let k = 0; k < 50; k++) { const x = ri(h2(k, 1, 47) * 318), y = ri(118 + h2(k, 2, 47) * 60); R.pset(x, y, SF.suelo[3]); R.pset(x + 1, y, SF.suelo[0]); }
  for (const [cx, cy, w] of [[120, 166, 9], [200, 172, 6], [60, 128, 5]]) for (let y = -2; y <= 2; y++) for (let x = -w; x <= w; x++) if (Math.hypot(x / w, y / 2.2) < 1) R.pset(cx + x, cy + y, (x + y) % 3 ? H('#a8c0dc') : H('#e8f0f8'));
  // EL PALACIO DE LOS GOBERNADORES (fondo, x 0–196): muro largo de adobe con vigas que asoman, el portal con postes
  adobeM(0, 84, 196, 118, 0.2);
  for (let x = 4; x < 196; x += 9) { R.rect(x, 86, x + 2, 87, SF.viga[0]); R.pset(x, 86, SF.viga[2]); }
  R.rect(0, 82, 196, 83, SF.adobe[1]); for (let x = 0; x < 196; x += 14) R.rect(x, 80, x + 6, 81, SF.adobe[2]);
  // el portal: tejadillo de vigas, zapatas y postes, y la sombra de debajo con puertas y ventanas
  for (let y = 96; y <= 118; y++) for (let x = 0; x <= 196; x++) R.pset(x, y, mez(R.pget(x, y), H('#3a2418'), 0.45));
  R.rect(0, 94, 196, 96, SF.viga[1]); R.rect(0, 94, 196, 94, SF.viga[2]); for (let x = 2; x < 196; x += 5) R.pset(x, 97, SF.viga[0]);
  for (let x = 6; x < 196; x += 22) { R.rect(x, 97, x + 2, 118, SF.viga[1]); R.rect(x, 97, x, 118, SF.viga[2]); R.rect(x - 2, 97, x + 4, 98, SF.viga[0]); }
  for (let x = 16; x < 190; x += 44) { R.rect(x, 101, x + 8, 117, SF.viga[0]); R.rect(x + 1, 102, x + 7, 117, H('#5a3018')); R.pset(x + 6, 110, SF.chile[2]); }
  for (let x = 38; x < 190; x += 44) { R.rect(x, 103, x + 7, 110, SF.viga[0]); R.rect(x + 1, 104, x + 6, 109, H('#2a2430')); R.rect(x + 1, 104, x + 6, 104, H('#4a4a5a')); for (let i = x + 1; i < x + 7; i += 2) R.rect(i, 104, i, 109, SF.viga[1]); }
  // ristras de chile colgadas del portal
  for (const rx of [30, 74, 118, 162]) for (let j = 0; j < 9; j++) { R.pset(rx + (j % 2), 99 + j, SF.chile[1 + (j % 2)]); R.pset(rx + 1 - (j % 2), 99 + j, SF.chile[0]); }
  // LA IGLESIA de dos torres (x 206–266): adobe encalado, balcón de madera, puerta de dos hojas, cruces de madera
  adobeM(206, 72, 266, 120, 0.6);
  for (const tx of [206, 248]) { adobeM(tx, 56, tx + 18, 74, 0.7); R.rect(tx + 6, 60, tx + 12, 68, H('#2a1a14')); R.rect(tx + 7, 61, tx + 11, 68, H('#3a2418')); R.disco(tx + 9, 64, 2, H('#c8a048')); R.rect(tx - 1, 54, tx + 19, 55, SF.adobe[1]); R.rect(tx + 8, 46, tx + 9, 54, SF.viga[1]); R.rect(tx + 6, 48, tx + 11, 49, SF.viga[1]); }
  R.rect(222, 84, 250, 86, SF.viga[1]); for (let x = 223; x < 250; x += 3) R.rect(x, 80, x, 84, SF.viga[2]); R.rect(222, 79, 250, 79, SF.viga[1]);
  R.rect(228, 96, 244, 120, SF.viga[0]); R.rect(229, 97, 243, 120, SF.viga[1]); R.rect(236, 97, 236, 120, SF.viga[0]); for (let y = 100; y < 120; y += 5) { R.rect(230, y, 234, y + 3, SF.viga[2]); R.rect(238, y, 242, y + 3, SF.viga[2]); }
  R.disco(236, 92, 3, SF.viga[0]); R.disco(236, 92, 2, H('#3a4a6a'));
  // casitas de adobe entre medias, un horno de colmena y escaleras de mano sobre los tejados
  adobeM(196, 96, 206, 120, -0.2); adobeM(266, 92, 286, 120, 0.1);
  R.linea(272, 92, 278, 76, SF.viga[2]); R.linea(276, 92, 282, 76, SF.viga[2]); for (let j = 79; j < 92; j += 3) R.linea(ri(lerp(278, 272, (92 - j) / -16 + 1)), j, ri(lerp(282, 276, (92 - j) / -16 + 1)), j, SF.viga[1]);
  for (let y = 0; y < 12; y++) for (let x = -9; x <= 9; x++) if (Math.hypot(x / 9, y / 12) < 1) R.pset(296 + x, 120 - y, rmp(SF.adobe, 3 - x / 9 * 0.8 + (h2(x, y, 48) - 0.4) * 0.6, 296 + x, 120 - y));
  R.disco(296, 116, 2, SF.adobe[0]); R.rect(286, 119, 306, 120, SF.adobe[0]);
  // LA CANTINA de la derecha (primer término, x 262–320): muro de adobe, vigas, la puerta con su cortina y un banco
  adobeM(262, 100, 320, 152, 0.4);
  for (let x = 266; x < 320; x += 8) { R.rect(x, 104, x + 2, 106, SF.viga[0]); R.pset(x, 104, SF.viga[2]); }
  R.rect(262, 100, 320, 101, SF.adobe[1]);
  R.rect(280, 118, 300, 152, SF.viga[0]); R.rect(281, 119, 299, 152, H('#2a1810'));
  R.rect(304, 122, 316, 134, SF.viga[0]); R.rect(305, 123, 315, 133, H('#3a3040')); R.rect(305, 123, 315, 123, H('#6a6a80'));
  for (let j = 0; j < 12; j++) { R.pset(270 + (j % 2), 114 + j, SF.chile[1 + (j % 2)]); R.pset(271 - (j % 2), 114 + j, SF.chile[0]); }
  R.rect(264, 146, 278, 148, SF.viga[1]); R.rect(264, 146, 278, 146, SF.viga[2]); R.rect(266, 148, 267, 152, SF.viga[0]); R.rect(275, 148, 276, 152, SF.viga[0]);
  for (let y = 152; y < 156; y++) for (let x = 262; x < 320; x++) R.pset(x, y, mez(R.pget(x, y), K, 0.25));
  // el álamo de la plaza (tronco y copa con las hojas nuevas)
  for (let y = 90; y < 152; y++) { const w = y > 140 ? 4 : 2; R.rect(148 - w, y, 148 + w, y, SF.viga[1]); R.pset(148 - w, y, SF.viga[0]); if (y % 4 === 0) R.pset(148, y, SF.viga[0]); }
  R.linea(148, 104, 132, 86, SF.viga[1]); R.linea(148, 100, 166, 82, SF.viga[1]); R.linea(148, 96, 150, 76, SF.viga[1]);
  for (let k = 0; k < 70; k++) { const a = h2(k, 1, 49) * Math.PI * 2, d = Math.sqrt(h2(k, 2, 49)), x = ri(148 + Math.cos(a) * d * 26), y = ri(82 + Math.sin(a) * d * 14); if (y < 60) continue; R.disco(x, y, 2, H('#4a7a34')); R.pset(x, y - 1, H('#8ac05a')); R.pset(x - 1, y, H('#6aa04a')); }
  // LA CARRETA de las pieles (x 10–76): ruedas macizas, caja de tablas y el montón de pieles de búfalo
  for (let k = 0; k < 6; k++) { const y = 128 - k * 4, x0 = 16 + (k % 2) * 3, x1 = 68 - (k % 3) * 2; for (let x = x0; x <= x1; x++) for (let j = 0; j < 5; j++) R.pset(x, y + j, rmp(CUERO, 1.6 + (h2(x, y + j, 50) - 0.5) * 1.6 - (j === 4 ? 1 : 0) + (j === 0 ? 0.8 : 0), x, y + j)); }
  R.rect(12, 132, 72, 140, SF.viga[1]); for (let x = 12; x < 72; x += 6) R.rect(x, 132, x, 140, SF.viga[0]); R.rect(12, 132, 72, 132, SF.viga[2]);
  R.linea(72, 138, 92, 146, SF.viga[0]); R.linea(72, 137, 92, 145, SF.viga[2]);
  for (const wx of [24, 58]) { R.disco(wx, 144, 9, SF.viga[0]); R.disco(wx, 144, 8, SF.viga[2]); R.disco(wx, 144, 6, SF.viga[1]); R.disco(wx, 144, 2, SF.viga[0]); }
  // el pozo de piedra con su torno y el cubo (x 200–222), un abrevadero de troncos y piedras sueltas por la plaza
  for (let y = 0; y < 14; y++) for (let x = -11; x <= 11; x++) R.pset(211 + x, 166 - y, rmp(pal(['#6a6058', '#8a8078', '#aaa098', '#c8c0b4']), 2.2 - y / 14 + ((x + 11) % 6 === 0 || y % 5 === 0 ? -1.2 : 0) + (x < -6 ? 0.5 : 0), 211 + x, 166 - y));
  R.rect(198, 148, 224, 152, H('#5a5048')); R.rect(200, 148, 222, 148, H('#c8c0b4'));
  R.rect(200, 132, 201, 150, SF.viga[1]); R.rect(221, 132, 222, 150, SF.viga[1]); R.rect(199, 131, 223, 133, SF.viga[0]); R.rect(206, 138, 216, 140, SF.viga[2]);
  R.linea(211, 140, 211, 144, H('#c8a868')); R.rect(208, 144, 214, 149, K); R.rect(209, 145, 213, 148, SF.viga[2]);
  R.rect(96, 160, 132, 168, SF.viga[0]); R.rect(97, 161, 131, 163, H('#5a7aa0')); R.rect(97, 161, 131, 161, H('#a8c0dc')); R.rect(96, 160, 132, 160, SF.viga[2]); R.rect(98, 168, 100, 172, SF.viga[0]); R.rect(128, 168, 130, 172, SF.viga[0]);
  for (let k = 0; k < 24; k++) { const x = ri(h2(k, 1, 52) * 310), y = ri(156 + h2(k, 2, 52) * 22); R.rect(x, y, x + 2, y + 1, SF.suelo[0]); R.rect(x, y, x + 1, y, SF.suelo[3]); }
  for (let k = 0; k < 30; k++) { const x = ri(h2(k, 1, 53) * 318), y = ri(170 + h2(k, 2, 53) * 9); R.pset(x, y, H('#6a7a3a')); R.pset(x, y - 1, H('#8a9a4a')); }
  R.usar(prev);
};
const P6 = (t) => {
  fondoSF(); R.buf.set(BSF);
  for (const [x0, y, w, v] of [[20, 22, 50, 1.0], [170, 30, 40, 1.6], [110, 14, 32, 2.3]]) { const x = ((x0 + t * v) % 400) - 40; if (x > 250 && y < 46) continue; nubeT(x, y, w, t, SF.nube); }
  avesT(t, 38, 2);
  // el humo del horno y de una chimenea
  for (let k = 0; k < 5; k++) { const u = (t * 0.45 + k / 5) % 1; R.disco(ri(296 - u * 14 + Math.sin(u * 5 + k)), ri(106 - u * 22), ri(1 + u * 3), mez(H('#d8d8e0'), H('#a8b0c4'), u)); }
  // la vida de la plaza: una mujer con su cántaro bajo el portal, un hombre con un burro cargado de leña, gallinas
  figurita(100 + Math.sin(t * 0.5) * 20, 117, t, H('#8a3a5a'), true, Math.cos(t * 0.5) > 0 ? 1 : -1); R.rect(ri(100 + Math.sin(t * 0.5) * 20), 109, ri(101 + Math.sin(t * 0.5) * 20), 110, H('#b8866e'));
  { const x = ri(250 - ((t * 7) % 120)); figurita(x, 124, t, H('#e0d8c0'), true, -1); R.rect(x - 9, 118, x - 3, 122, H('#7a7068')); R.rect(x - 10, 116, x - 3, 117, H('#8a5a30')); ps(x - 10, 117, H('#5a504a')); ps(x - 11, 116, H('#5a504a')); ps(x - 8, 123, H('#4a403a')); ps(x - 4, 123, H('#4a403a')); }
  for (let k = 0; k < 3; k++) { const x = ri(196 + k * 7 + Math.sin(t * 1.2 + k * 2) * 4), y = 134 + (k % 2) * 2; ps(x, y - 2, H('#8a5a30')); ps(x + 1, y - 2, H('#8a5a30')); ps(x + 2, y - 3, H('#c83a2a')); ps(x + (Math.sin(t * 6 + k) > 0 ? 2 : 1), y - 1, H('#e8a040')); }
  // el tratante de pieles levanta una piel en «hides»
  const lev = tramo(t, TB.HIDES - 0.3, TB.HIDES + 0.2) * (1 - tramo(t, TB.SENT + 0.6, TB.SENT + 1.0)), mt = R.actor(BL.cazador2BL, 80, 150, t, { dir: -1, sostiene: lev > 0 ? [72, ri(132 - lev * 10)] : undefined, habla: lev > 0.5 && parp(t), pal: { C: '#6a5a8a', c: '#4a3e6a' } }).mano;
  if (lev > 0) { for (let y = -6; y <= 6; y++) for (let x = -7; x <= 7; x++) if (Math.abs(x) + Math.abs(y) * 0.9 < 9) ps(mt[0] - 4 + x, mt[1] + 7 + y, rmp(CUERO, 1.8 + (h2(x, y, 51) - 0.5) * 1.4, x, y)); }
  // EL MENSAJERO llega al galope desde el barranco, frena y levanta la pepita de oro en «sent for»
  const lle = tramo(t, TB.THOSE - 0.2, TB.LOOKING + 0.3), mx = lerp(-40, 196, 1 - (1 - lle) * (1 - lle)), alza = t > TB.SENT - 0.3;
  const mm = jinete(BL.cazadorBL, mx, 160, t, { dir: 1, galope: lle < 1, color: 'pinto', k: 3, a: { sostiene: alza ? [ri(mx) + 8, 112] : undefined, sonrisa: alza, habla: alza && t < TB.BEALE2 + 0.3 && parp(t, 9) } }).mano;
  if (alza) { R.disco(mm[0], mm[1] - 2, 2, ORO[1]); R.disco(mm[0], mm[1] - 2, 1, ORO[3]); ps(mm[0] - 1, mm[1] - 3, ORO[4]); luz(mm[0], mm[1] - 2, 14, H('#ffe080'), 0.4); if (Math.sin(t * 9) > 0) destello(mm[0] + 2, mm[1] - 5, 3, ORO[4]); }
  // BEALE sale de la cantina, ve la pepita, se sorprende en «Beale» y echa a andar hacia el mensajero
  const sal = tramo(t, TB.LOOKING, TB.SENT + 0.2), anda2 = tramo(t, TB.BEALE2 + 0.25, TB.BEALE2 + 1.2), bx = ri(lerp(lerp(283, 250, sal), 226, anda2));
  if (t > TB.LOOKING - 0.1) R.actor(BL.bealeOesteBL, bx, 152, t, { dir: -1, anda: (sal > 0 && sal < 1) || (anda2 > 0 && anda2 < 1), sorpresa: t > TB.BEALE2 - 0.1 && t < TB.BEALE2 + 0.6, sonrisa: t > TB.BEALE2 + 0.6, dedo: t > TB.BEALE2 + 0.6 });
};
// ── P7 · LA MINA (oeste 'barranco' {mina}, de día, año y medio después): los mineros pican, los sacos se apilan y en
// «tools» llega de Santa Fe la mula cargada de picos y palas; Beale coge un pico ──
const O7 = { encuadre: 'barranco', mina: true };
const P7 = (t) => {
  const g = T.oeste(R, t, O7);
  // los sacos que se van apilando a la izquierda (el año y medio: el montón crece durante el plano)
  const n = Math.min(9, Math.floor(tramo(t, TB.STAYED, TB.SANTAFE2) * 9.99));
  const PILA = [[40, 150], [50, 151], [60, 150], [45, 143], [55, 144], [70, 151], [65, 143], [50, 136], [60, 137]];
  for (let k = 0; k < n; k++) { const [x, y] = PILA[k], c = k === n - 1 ? 1 - pop(t, TB.STAYED + (k + 1) * (TB.SANTAFE2 - TB.STAYED) / 9.99, 0.25) : 0; saco(x, y - ri(c * 6), t, k); }
  // el minero que pica la roca (el pico sube y baja) y otro que lleva un saco al montón
  const golpe = Math.sin(t * 5.2), mp = R.actor(BL.cazador2BL, 176, 151, t, { dir: 1, sostiene: [194, ri(124 - golpe * 6)], pal: { C: '#8a4a3a', c: '#6a3428' } }).mano;
  pico(mp[0] - 4, mp[1] + 3, mp[0] + 6 + ri(golpe * 2), mp[1] - 8 + ri(golpe * 5));
  for (const [x, y] of [[202, 138], [206, 140], [199, 141]]) { ps(x, y, H('#9a6a4a')); ps(x + 1, y, H('#c8a080')); }
  if (golpe < -0.85) for (let k = 0; k < 4; k++) ps(202 + k * 2, 134 - k, H('#e8d0a0'));
  const vu = ((t - TB.STAYED) / 3.2) % 1, cx2 = ri(lerp(160, 76, vu)), carga = vu < 0.92;
  const ms = R.actor(BL.cazadorBL, cx2, 152, t, { dir: -1, anda: true, sostiene: carga ? true : undefined, pal: { C: '#5a6a4a', c: '#424e36' } }).mano;
  if (carga) saco(ms[0] - 2, ms[1] + 6, t, 9, false);
  // LA MULA DE LAS HERRAMIENTAS que llega de Santa Fe en «tools brought up», con el arriero; Beale coge un pico
  const lle = tramo(t, TB.MOUNTAIN - 0.6, TB.TOOLS + 0.2), xm = ri(lerp(-30, 100, ease(lle)));
  T.b_mula(R, xm, 152, t, { dir: 1, anda: lle > 0 && lle < 1, color: 'bayo' });
  for (let k = 0; k < 3; k++) { pico(xm - 10 + k * 3, 128 + k, xm + 4 + k * 3, 118 + k); }
  pala(xm - 6, 131, xm + 10, 124);
  R.actor(BL.cazadorBL, xm - 34, 152, t, { dir: 1, anda: lle > 0 && lle < 1, sonrisa: lle >= 1, pal: { C: '#a07a4e', c: '#7a5a36' } });
  const coge = t > TB.BROUGHT;
  const mb = R.actor(BL.bealeOesteBL, 124, 151, t, { dir: -1, sostiene: coge ? [ri(lerp(112, 120, tramo(t, TB.BROUGHT, TB.BROUGHT + 0.4))), ri(lerp(124, 110, tramo(t, TB.BROUGHT, TB.BROUGHT + 0.5)))] : undefined, dedo: !coge && t > TB.TOOLS - 0.2, sonrisa: coge, habla: t > TB.YEAR && t < TB.DIGGING + 0.6 && parp(t) }).mano;
  if (coge) pico(mb[0] + 3, mb[1] + 8, mb[0] - 2, mb[1] - 6);
  T.oesteDelante(R, t, O7);
};
// ── P8 · EN MEDIO DE LA NADA (oeste 'llanura' general): el montón de oro bajo una lona, con un solo guardia, en la
// pradera inmensa; Atom entra, mira alrededor en «middle of nowhere» y tira la cuenta de las millas hasta el banco ──
const P8 = (t) => {
  const g = T.oeste(R, t, {});
  // el montón: sacos y ollas bajo una lona tendida entre dos palos, el rifle apoyado y el caballo del guardia
  const LX = 92;
  R.linea(LX - 26, 150, LX - 26, 124, H('#5a3a1e')); R.linea(LX + 22, 150, LX + 22, 126, H('#5a3a1e'));
  for (let y = 124; y <= 132; y++) { const x0 = LX - 30 + (y - 124), x1 = LX + 26 - (y - 124) * 0.3; for (let x = ri(x0); x <= ri(x1); x++) ps(x, y, (y === 124 || x === ri(x0)) ? H('#8a7a5a') : ((x + y * 3) % 9 === 0) ? H('#b8a888') : mez(H('#d8ccae'), H('#b8ac8c'), (y - 124) / 8 + Math.sin(t * 2 + x * 0.2) * 0.06)); }
  R.linea(LX - 26, 124, LX - 34, 150, H('#7a6a4a')); R.linea(LX + 22, 126, LX + 32, 150, H('#7a6a4a'));
  for (const [dx, dy, k] of [[-16, 150, 0], [-6, 151, 1], [4, 150, 2], [-11, 143, 3], [0, 143, 4], [14, 151, 5]]) saco(LX + dx, dy, t, k);
  olla(LX - 22, 151, t, { k: 2 }); olla(LX + 14, 143, t, { k: 3, lleno: 0.7 });
  rifle(LX + 24, 150, LX + 18, 128);
  T.b_mula(R, LX - 52, 150, t, { mula: false, carga: false, color: 'tordo', dir: 1, come: true });
  // el guardia, solo: se asoma, mira a un lado y a otro; en «bank» se rasca la cabeza (triste)
  const mira = Math.sin(t * 0.9) > 0;
  R.actor(BL.cazador2BL, LX + 30, 151, t, { dir: mira ? 1 : -1, triste: t > TB.BANK, sostiene: t > TB.BANK ? [LX + 40, 122] : undefined, pal: { C: '#8a4a3a', c: '#6a3428' } });
  // ATOM entra desde la derecha, piensa en «picture the problem», abre los brazos en «middle of nowhere»
  const en8 = tramo(t, TB.NOW + 0.1, TB.PROBLEM + 0.4), ax = lerp(340, 214, ease(en8)), anda = en8 > 0 && en8 < 1;
  const pose = anda ? 'camina' : t < TB.MIDDLE - 0.1 ? 'piensa' : t < TB.HUNDREDS - 0.1 ? 'brazos' : t < TB.BANK + 0.3 ? 'senala' : 'brazos';
  const adir = anda ? -1 : t > TB.NOWHERE && t < TB.HUNDREDS - 0.1 ? (Math.sin((t - TB.NOWHERE) * 5) > 0 ? 1 : -1) : t >= TB.HUNDREDS - 0.1 ? 1 : -1;
  // la cuenta de las millas: una línea de trazos que sale del montón hacia el este (la derecha) y se pierde en el horizonte
  const lin = tramo(t, TB.HUNDREDS, TB.BANK);
  if (lin > 0) { const x0 = LX + 30, y0 = 118, x1 = lerp(x0, 312, lin), y1 = lerp(y0, 100, lin);
    for (let k = 0; k <= 1; k += 1 / 120) { const x = lerp(x0, x1, k), y = lerp(y0, y1, k); if (Math.floor(k * 40 + t * 6) % 2 === 0) { ps(x, y + 1, K); ps(x, y, H('#ffe080')); } }
    const mi = ri(lin * 800 / 50) * 50, nx = ri(Math.min(x1 - 20, 246)); luz(nx, 84, 24, H('#fff4c0'), 0.35); R.numero(String(mi), nx, 90, { tam: 16, centro: true });
    if (lin >= 1) { const bb = pop(t, TB.BANK, 0.3); if (bb > 0) { const bx = 290, by = 112;
      const S = 2, B = (i, j, c) => R.rect(bx + i * S, by + j * S, bx + i * S + S - 1, by + j * S + S - 1, c);
      for (let j = -10; j <= 0; j++) for (let i = -8; i <= 8; i++) { const fr = j <= -6 && Math.abs(i) <= (j + 10) * 2 + 0, mu = j > -6;
        if (fr) B(i, j, Math.abs(i) === (j + 10) * 2 || j === -6 ? K : H('#e8e0d0')); else if (mu) B(i, j, j === 0 || Math.abs(i) === 8 ? K : (i + 8) % 4 === 1 ? H('#a8a090') : H('#f4eee0')); }
      R.numero('$', bx, by - 22 - ri(2 * Math.sin(t * 4)), { tam: 16, centro: true }); } } }
  AT.atom(R, ax, 152, t, { pose, dir: adir, cara: t > TB.BANK ? 'sorpresa' : t > TB.MIDDLE ? 'normal' : 'normal', habla: t > TB.NOW && t < TB.THEYVE ? (parp(t, 8) ? 1 : 0) : 0 });
  T.oesteDelante(R, t, {});
};
// ── P9 · DENTRO DE LA TIENDA, DE NOCHE (fondo local): la lona iluminada por el farol, el montón de ollas y sacos que
// crece en «piled up», la sombra del guardia que pasa por fuera en «guard»; Beale decide y señala al este ──
const TI = { lona: pal(['#5a4a3a', '#7a6650', '#9a846a', '#b8a080', '#d0b894']), suelo: pal(['#3a2a1e', '#4e3a28', '#644a34', '#7a5c40']), noche: pal(['#0e1226', '#182040', '#24305a']) };
const BTI = R.nuevo(); let hechoTI = false;
const fondoTI = () => {
  if (hechoTI) return; hechoTI = true; const prev = R.usar(BTI);
  // la lona del fondo y los dos faldones inclinados, con costuras, remiendos y las arrugas de las cuerdas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const lado = x < 80 ? (80 - x) / 80 : x > 240 ? (x - 240) / 80 : 0, cos = (x - 80) % 46 === 0 && x > 80 && x < 240, arr = Math.sin(x * 0.18 + y * 0.05) * 0.25;
    let v = 3.1 - lado * 1.6 - Math.abs(y - 70) / 140 + arr + (h2(x >> 1, y >> 1, 60) - 0.5) * 0.35 - (cos ? 0.9 : 0) - ((y + (x < 80 ? x * 0.6 : x > 240 ? (320 - x) * 0.6 : 0)) % 31 === 0 ? 0.6 : 0);
    R.pset(x, y, rmp(TI.lona, v, x, y)); }
  for (let k = 0; k < 4; k++) { const x = [100, 176, 212, 132][k], y = [40, 96, 30, 118][k]; for (let j = 0; j < 9; j++) for (let i = 0; i < 11; i++) R.pset(x + i, y + j, (i === 0 || j === 0 || i === 10 || j === 8) ? TI.lona[1] : rmp(TI.lona, 2.6 + (h2(i, j, 61 + k) - 0.5) * 0.4, x + i, y + j)); for (let i = 0; i < 11; i += 2) { R.pset(x + i, y - 1, TI.lona[0]); R.pset(x + i, y + 9, TI.lona[0]); } }
  // los faldones del techo que bajan desde la cumbrera (más oscuros, con costuras que convergen) y las varas
  for (let y = 0; y < 64; y++) for (let x = 0; x < 320; x++) { const lim = 64 - Math.abs(x - 160) * 0.42; if (y > lim) continue;
    const ang = Math.atan2(x - 160, y + 30), cos = Math.abs((ang * 9) % 1) < 0.06; R.pset(x, y, mez(R.pget(x, y), cos ? H('#3a2a1e') : H('#4a3a2a'), 0.35 + (lim - y) / 160)); }
  for (const s0 of [-1, 1]) { R.linea(160 + s0 * 14, 16, 160 + s0 * 152, 64, H("#3a2414")); R.linea(160 + s0 * 14, 17, 160 + s0 * 152, 65, H('#7a5232')); }
  // la piel de búfalo tendida en la lona de la izquierda (con sus correas) y una silla de montar sobre un tronco
  for (let y = 70; y < 118; y++) for (let x = 14; x < 64; x++) { const d = Math.hypot((x - 39) / 25, (y - 94) / 24) + Math.sin(Math.atan2(y - 94, x - 39) * 5) * 0.06; if (d < 1) R.pset(x, y, rmp(CUERO, 2.2 - d * 1.6 + (h2(x >> 1, y >> 1, 66) - 0.5) * 1.2, x, y)); }
  for (const [x, y] of [[16, 72], [62, 72], [16, 116], [62, 116]]) { R.linea(x, y, x + (x < 39 ? -6 : 6), y + (y < 94 ? -6 : 6), H('#3a2414')); R.disco(x, y, 1, H('#2a1a10')); }
  R.rect(0, 136, 34, 150, H('#4a3220')); R.rect(0, 136, 34, 137, H('#7a5232')); for (let x = 2; x < 34; x += 6) R.pset(x, 142, H('#2a1a10'));
  for (let y = 0; y < 16; y++) for (let x = -14; x <= 14; x++) { const d = Math.hypot(x / 14, (y - 4) / 12); if (d < 1 && !(y > 8 && Math.abs(x) < 6)) R.pset(18 + x, 122 + y, rmp(CUERO, 3 - d * 1.5 - y / 20 + (x < -6 ? 0.6 : 0), 18 + x, 122 + y)); }
  R.rect(14, 118, 22, 122, CUERO[1]); R.rect(15, 118, 21, 119, CUERO[3]);
  // cajas de madera apiladas a la derecha, con flejes y números de carga
  for (const [x0, y0, w, hh] of [[264, 116, 30, 34], [296, 124, 24, 26], [270, 92, 22, 24]]) { R.rect(x0, y0, x0 + w, y0 + hh, H('#3a2414')); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, H('#8a6a44'));
    for (let y = y0 + 4; y < y0 + hh; y += 6) R.rect(x0 + 1, y, x0 + w - 1, y, H('#6a4e30')); R.rect(x0 + 3, y0 + 1, x0 + 4, y0 + hh - 1, H('#5a5a64')); R.rect(x0 + w - 4, y0 + 1, x0 + w - 3, y0 + hh - 1, H('#5a5a64')); }
  // cuerda enrollada, la cafetera y dos tazas de hojalata en el suelo
  for (let r = 7; r > 2; r -= 2) { for (let a = 0; a < 40; a++) { const p = a / 40 * Math.PI * 2; R.pset(ri(232 + Math.cos(p) * r), ri(170 + Math.sin(p) * r * 0.45), a % 3 ? H('#c8a868') : H('#8a6a3a')); } }
  R.rect(66, 162, 74, 172, K); R.rect(67, 163, 73, 171, H('#6a7080')); R.rect(67, 163, 68, 171, H('#a8b0c0')); R.linea(74, 165, 78, 162, K); R.rect(68, 160, 72, 162, K);
  // el mástil del centro y la cumbrera
  R.rect(146, 15, 174, 17, H("#3a2414")); R.rect(146, 15, 174, 15, H("#7a5232")); R.rect(158, 16, 162, 150, H("#3a2414")); R.rect(159, 16, 160, 150, H("#7a5232")); R.rect(161, 16, 161, 150, H('#5a3a22'));
  // la puerta de la tienda (a la derecha) abierta: la noche fuera, con estrellas y el perfil de los montes
  R.poligono([[252, 150], [300, 150], [276, 52]], TI.noche[0]);
  // el suelo: mantas de búfalo, tierra pisada y la cama enrollada
  for (let y = 148; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(TI.suelo, 2.4 - (y - 148) / 24 + (h2(x >> 1, y, 62) - 0.5) * 0.8, x, y));
  for (let y = 152; y < 172; y++) for (let x = 18; x < 96; x++) if (Math.hypot((x - 57) / 40, (y - 162) / 11) < 1) R.pset(x, y, rmp(CUERO, 1.2 + (h2(x, y, 63) - 0.5) * 1.8 + (Math.hypot((x - 57) / 40, (y - 162) / 11) > 0.9 ? -0.8 : 0), x, y));
  for (let x = 104; x < 230; x++) for (let y = 166; y < 178; y++) R.pset(x, y, (x - 104) % 14 < 2 ? H('#e8d8a0') : (y - 166) % 6 < 1 ? H('#5a1e1a') : ((x + y) & 1) ? H('#9a2a22') : H('#8a2420'));
  // la penumbra de los rincones: la lona se oscurece lejos del farol
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 166) / 190, (y - 60) / 150); if (d > 0.45) R.pset(x, y, mez(R.pget(x, y), H('#1e140e'), Math.min(0.55, (d - 0.45) * 1.1))); }
  // de la cumbrera cuelgan un sombrero, una cantimplora y un manojo de tasajo puesto a secar
  R.linea(150, 17, 150, 20, H('#3a2414')); for (let y = 0; y < 7; y++) for (let x = -7; x <= 7; x++) if ((y > 4 && Math.abs(x) < 8) || (y <= 5 && Math.abs(x) < 4)) R.pset(150 + x, 20 + y, y === 3 ? H('#8a2a20') : y > 4 ? H('#4a3424') : H('#5a3c26'));
  R.linea(176, 10, 180, 24, H('#5a3a22')); R.disco(181, 29, 5, K); R.disco(181, 29, 4, H('#6a7080')); R.disco(180, 28, 2, H('#a8b0c0'));
  R.linea(110, 26, 136, 14, H('#8a6a44')); for (let k = 0; k < 6; k++) { const x = 114 + k * 4, y = 25 - k * 2; R.rect(x, y, x + 1, y + 7 + (k % 2) * 2, H('#6a2a1e')); R.pset(x, y + 1, H('#9a4a30')); }
  R.usar(prev);
};
const P9 = (t) => {
  fondoTI(); R.buf.set(BTI);
  // la noche por la puerta: estrellas que titilan y una luna en cuarto (recortado al hueco)
  for (let k = 0; k < 14; k++) { const x = 256 + ri(h2(k, 1, 64) * 40), y = 60 + ri(h2(k, 2, 64) * 80); if (Math.abs(x - 276) < (y - 52) * 24 / 98 && Math.sin(t * 2 + k) > 0) ps(x, y, H('#e8ecff')); }
  for (let x = 258; x < 296; x++) { const yy = ri(128 + Math.sin(x * 0.2) * 3); for (let y = yy; y < 150; y++) if (Math.abs(x - 276) < (y - 52) * 24 / 98) ps(x, y, TI.noche[1]); }
  // la sombra del guardia que pasa por fuera, proyectada en la lona (va y vuelve; en «guard» se para y se vuelve)
  const gx = 40 + ((t - TB.THEYVE) * 26) % 220, para = t > TB.GUARD - 0.2 && t < TB.GUARD + 1.0, sx = para ? 40 + ((TB.GUARD - 0.2 - TB.THEYVE) * 26) % 220 : gx;
  for (let y = -44; y <= 30; y++) for (let x = -14; x <= 14; x++) { const cab = Math.hypot(x / 6, (y + 34) / 7) < 1, ala = Math.abs(y + 40) < 1.2 && Math.abs(x) < 10, cuerpo = y > -27 && y < 6 && Math.abs(x) < 9 - (y > 0 ? y * 0.3 : 0), pier = y >= 6 && (Math.abs(x - 3 - Math.sin(t * 6) * 2) < 2.2 || Math.abs(x + 3 + Math.sin(t * 6) * 2) < 2.2) && !para, rif = Math.abs(x - 10 + (y + 30) * 0.05) < 1 && y < 0 && y > -50;
    if (cab || ala || cuerpo || pier || rif) tine(sx + x, 104 + y, H('#2a1a12'), 0.45); }
  // el farol colgado del mástil y su luz que tiembla
  const fl = 0.9 + Math.sin(t * 13) * 0.06 + Math.sin(t * 5.1) * 0.05;
  luz(166, 52, 120 * fl, H('#ffc870'), 0.3);
  R.linea(161, 40, 166, 44, K); R.rect(163, 44, 169, 46, K); R.rect(162, 47, 170, 58, K); R.rect(163, 48, 169, 57, H('#ffe8a0')); R.rect(165, 50, 167, 55, H('#fff8e0')); R.rect(162, 58, 170, 59, H('#3a3a42'));
  // EL MONTÓN: ollas llenas y sacos; en «piled up» van cayendo más sacos encima
  olla(112, 156, t, { s: 2, k: 1 }); olla(196, 158, t, { s: 2, k: 4, lleno: 0.8 });
  const MON = [[140, 152], [151, 152], [162, 152], [173, 152], [146, 144], [157, 144], [168, 144], [151, 136], [162, 136], [157, 128]];
  MON.forEach(([x, y], k) => saco(x, y, t, k));
  for (let k = 0; k < 5; k++) { const a = TB.PILED + k * 0.3, c = tramo(t, a, a + 0.25); if (c <= 0) continue; const [x, y] = [[146, 128], [168, 128], [151, 120], [163, 120], [157, 112]][k]; saco(x, ri(lerp(y - 50, y, c)), t, 12 + k);
    if (c >= 1 && t < a + 0.5) for (let q = 0; q < 4; q++) ps(x - 6 + q * 4, y - 2 - ((t - a) * 20 + q) % 4, H('#c8a878')); }
  olla(212, 152, t, { k: 6, lleno: 0.6 }); olla(132, 170, t, { k: 7 });
  olla(246, 156, t, { k: 5 }); rifle(258, 150, 244, 110);
  // Beale y un cazador junto al montón: miran la sombra en «guard», hablan en «decide» y Beale señala al este en «take it home»
  const oye = t > TB.GUARD - 0.1 && t < TB.DECIDE - 0.2;
  R.actor(BL.cazadorBL, 50, 152, t, { dir: oye ? -1 : 1, sorpresa: oye, habla: t > TB.DECIDE && t < TB.SAFEST + 0.6 && parp(t), triste: t > TB.MORE && t < TB.GUARD - 0.1 });
  R.actor(BL.bealeOesteBL, 74, 152, t, { dir: t > TB.TAKE - 0.2 ? 1 : oye ? -1 : 1, dedo: t > TB.TAKE - 0.2, sonrisa: t > TB.TAKE, habla: t > TB.SAFEST && t < TB.TAKE + 0.5 && parp(t), piensa: t > TB.DECIDE - 0.2 && t < TB.SAFEST });
  if (t > TB.TAKE - 0.1) { const e = pop(t, TB.TAKE - 0.1, 0.3); for (let k = 0; k < 3; k++) { const x = 94 + k * 7 + ri((t * 20) % 7); ps(x, 124, H('#ffe080')); ps(x + 1, 125, H('#ffe080')); ps(x, 126, H('#ffe080')); } }
};
// ── P10 · EL MAPA DE TODO EL PAÍS (T.mapa 'eeuu'): la ruta de vuelta se pinta del barranco a Virginia con la mula que la
// recorre; en «hide» cae la chincheta de Bedford con su «?»; en «letters» se abre una carta (sobre) junto a la ruta ──
const RUTA_V = [BARRANCO, [-103.0, 38.2], [-100.0, 38.6], [-96.5, 38.8], [-94.0, 39.0], [-90.6, 38.7], [-87.0, 38.3], [-84.5, 38.0], [-82.0, 37.8], BEDFORD];
const P10 = (t) => {
  const P = T.mapa(R, t, { zona: 'eeuu', rosa: [282, 150] }), Q = (p) => P(p).map(ri);
  R.recorte([20, 14, 300, 170]);
  const pts = RUTA_V.map(Q), u = tramo(t, TB.HOME - 0.2, TB.BIEL + 0.1);
  const [bx, by] = Q(BARRANCO); T.chincheta(R, bx, by, t, C.oro, {}); luz(bx, by - 4, 12, H('#ffd890'), 0.25);
  if (u > 0) { R.ruta(pts, u, C.rojo, { grueso: true });
    let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    let q = L * u, i = 0; while (i < seg.length - 1 && q > seg[i]) { q -= seg[i]; i++; } const f = Math.min(1, q / seg[i]), mx = lerp(pts[i][0], pts[i + 1][0], f), my = lerp(pts[i][1], pts[i + 1][1], f);
    T.b_mula(R, ri(mx), ri(my) - 3, t, { dir: 1, anda: u < 1 }); if (Math.sin(t * 5) > 0.3) destello(ri(mx) - 2, ri(my) - 22, 2, ORO[4]); }
  // Bedford: la chincheta y la interrogación (¿dónde esconderlo?)
  const [vx, vy] = Q(BEDFORD), ch = tramo(t, TB.HIDE - 0.2, TB.HIDE + 0.15);
  if (ch > 0) { T.chincheta(R, vx, vy, t, C.rojo, { baja: ch }); const q = pop(t, TB.HIDE + 0.1, 0.3); if (q > 0) R.icono('?', vx - 5, ri(vy - 22 - 3 * q), H('#ffe080'), K, 2); }
  // la carta de Beale, que se abre junto a la ruta en «according to the letters»
  const ca = pop(t, TB.ACCORDING + 0.4, 0.35);
  if (ca > 0) { const x = 150, y = ri(56 - 4 * Math.min(1, ca)); R.rect(x - 15, y - 10, x + 15, y + 10, K); R.rect(x - 14, y - 9, x + 14, y + 9, C.papel);
    for (let j = 0; j < 5; j++) for (let i = -11; i < 11; i += 1) if (h2(i, j, 70) > 0.25 && !(j === 4 && i > 2)) ps(x + i, y - 6 + j * 3, (i + j) % 5 ? C.tinta : H('#4a4a6a'));
    R.disco(x + 9, y + 6, 2, H('#a8241c')); ps(x + 8, y + 5, H('#e8604a')); R.linea(x - 14, y - 2, x + 14, y - 2, H('#c8bc98')); }
  R.recorte(null);
};
// ── P11 · LA RECUA CRUZA LOS MONTES (oeste 'camino' {recua}, otoño): la recua pequeña por la ladera y, por el camino de
// primer término, Beale delante a caballo, las mulas cargadas (brilla el oro en «gold», la plata en «silver») y la
// escolta; en «ten men» sale el 10 ──
const O11 = { encuadre: 'camino', recua: true };
const P11 = (t) => {
  T.oeste(R, t, O11);
  const v = 10, x0 = 238 + (t - TB.BIEL) * v;
  // de atrás (izquierda) hacia delante: escolta, mulas, escolta… y Beale el primero (a la derecha)
  const F = [['j', BL.cazador2BL, 'pardo', { C: '#5a6a4a', c: '#424e36' }], ['m', 'oro'], ['j', BL.cazadorBL, 'tordo'], ['m', 'plata'], ['m', 'oro'], ['j', BL.cazador2BL, 'bayo', { C: '#8a4a3a', c: '#6a3428' }], ['m', 'plata'], ['j', BL.cazadorBL, 'pinto', { C: '#3a5a8a', c: '#2a4268' }], ['m', 'oro'], ['j', BL.cazadorBL, 'bayo']];
  F.forEach((f, k) => { const x = x0 - (F.length - k) * 31, s = 150 + (k % 2);
    if (x < -30 || x > 350) return;
    if (f[0] === 'm') { T.b_mula(R, ri(x), s, t, { dir: 1, anda: true, k });
      const g = f[1] === 'oro' ? (t > TB.GOLD3 - 0.1 && t < TB.GOLD3 + 0.9) : (t > TB.SILVER - 0.1 && t < TB.SILVER + 0.9);
      if (g) { const P = f[1] === 'oro' ? ORO : PLATA; luz(x - 1, s - 20, 12, P[3], 0.4); destello(x - 1 + ri(Math.sin(t * 9 + k) * 3), s - 22, 3, P[4]); }
      return; }
    jinete(f[1], x, s, t, { dir: 1, anda: true, color: f[2], k, a: { pal: f[3], sonrisa: t > TB.TEN && t < TB.TEN + 1.2 } }); });
  // Beale, delante de todos, con la mano en alto en «crosses half a continent»
  const xb = x0 + 6;
  jinete(BL.bealeOesteBL, xb, 151, t, { dir: 1, anda: true, color: 'bayo', a: { dedo: t > TB.HALF - 0.1 && t < TB.HALF + 1.4, habla: t > TB.ESCORT && t < TB.TEN + 0.8 && parp(t) } });
  // «an escort of ten men»: el 10
  const d = pop(t, TB.TEN - 0.05, 0.35);
  if (d > 0) { luz(150, 104, 22, H('#fff4c0'), 0.35 * Math.min(1, d)); R.numero('10', 150, ri(110 - 6 * Math.min(1, d)), { tam: 16, centro: true }); }
  T.oesteDelante(R, t, O11);
};
// ── P12 · LA MESA DE LA TABERNA (inserto, fondo local): la pared de troncos con la ventanita a los picos de Otter, la
// mesa con jarras, naipes, el sombrero y el cuerno de pólvora; una mano con tiza marca los días en una pizarra: en
// «a month» ya son treinta rayas y sale el 30 ──
const TA = { tronco: pal(['#3a2416', '#5a3a22', '#7a5232', '#9a6c44', '#b88a5c']), barro: pal(['#6a5a48', '#8a7a62', '#a8987e']), mesa: pal(['#4a2e18', '#6a4426', '#8a5a34', '#a87244', '#c08a58']) };
const BTA = R.nuevo(); let hechoTA = false;
const fondoTA = () => {
  if (hechoTA) return; hechoTA = true; const prev = R.usar(BTA);
  // la pared de troncos con el barro de las juntas y las vetas
  for (let y = 0; y < 98; y++) for (let x = 0; x < 320; x++) { const f = y % 16, junta = f > 12;
    R.pset(x, y, junta ? rmp(TA.barro, 1.2 + (h2(x >> 1, y, 80) - 0.5) * 1.4, x, y) : rmp(TA.tronco, 3 - Math.abs(f - 5) / 3.2 + (Math.sin(x * 0.07 + y * 1.3) > 0.9 ? -1 : 0) + (h2(x >> 2, y >> 1, 81) - 0.5) * 0.6, x, y)); }
  for (let k = 0; k < 16; k++) { const x = ri(h2(k, 1, 82) * 318), y = Math.floor(h2(k, 2, 82) * 6) * 16 + 5; R.disco(x, y, 2, TA.tronco[1]); R.pset(x, y, TA.tronco[0]); }
  // la ventanita con los picos de Otter (recortada a su hueco)
  const W0 = [196, 12, 262, 62];
  R.rect(W0[0] - 4, W0[1] - 4, W0[2] + 4, W0[3] + 6, TA.tronco[0]); R.rect(W0[0] - 3, W0[1] - 3, W0[2] + 3, W0[3] + 5, TA.mesa[3]);
  for (let y = W0[1]; y <= W0[3]; y++) for (let x = W0[0]; x <= W0[2]; x++) {
    const pk = 46 - Math.max(0, 22 - Math.abs(x - 218) * 1.3) - Math.max(0, 12 - Math.abs(x - 244) * 0.5), lo = 54 + Math.sin(x * 0.2) * 2;
    let c = rmp(pal(['#7aa8e0', '#94bce8', '#b4d0f0']), 2 - (y - W0[1]) / 24, x, y);
    if (y > pk) c = rmp(pal(['#4a5a7a', '#5a6a8a', '#7080a0']), 2 - (y - pk) / 8, x, y);
    if (y > lo) c = rmp(pal(['#2e4a32', '#3e5e3a', '#4e7040']), 1.5 + (h2(x, y, 83) - 0.5), x, y);
    R.pset(x, y, c); }
  R.rect(228, W0[1], 229, W0[3], TA.tronco[1]); R.rect(W0[0], 36, W0[2], 37, TA.tronco[1]);
  // el rifle de chispa en dos clavijas, la cuerna de pólvora, el abrigo y el sombrero en la percha, una herradura
  for (const x of [26, 118]) { R.rect(x, 26, x + 3, 30, TA.tronco[0]); R.rect(x + 1, 26, x + 2, 28, TA.mesa[4]); }
  R.rect(16, 30, 140, 32, HIE[1]); R.rect(16, 30, 140, 30, HIE[3]); R.rect(16, 30, 58, 34, H('#6a3e1e')); R.rect(16, 33, 40, 36, H('#6a3e1e')); R.rect(16, 30, 58, 30, H('#9a6234')); R.rect(70, 32, 76, 35, HIE[2]);
  R.linea(150, 14, 176, 34, H('#d8ccae')); R.linea(150, 15, 176, 35, H('#a89a78')); R.disco(176, 34, 3, H('#5a3a22')); R.disco(176, 34, 1, H('#3a2414')); R.linea(150, 14, 160, 10, H('#4a3020')); R.linea(160, 10, 172, 20, H('#4a3020'));
  R.linea(150, 40, 144, 52, H('#4a3020')); R.linea(150, 40, 156, 52, H('#4a3020')); for (let y = 52; y < 70; y++) { const w = 7 - Math.abs(y - 60) * 0.25; for (let x = -w; x <= w; x++) R.pset(ri(150 + x), y, rmp(CUERO, 2.2 - x / w * 0.8 - (y - 52) / 30 + (h2(x, y, 86) > 0.85 ? -1 : 0), ri(150 + x), y)); }
  R.rect(146, 55, 154, 57, CUERO[1]); R.disco(150, 62, 2, CUERO[4]); R.pset(150, 62, ORO[3]);
  R.rect(146, 36, 154, 39, TA.tronco[0]);
  for (let y = 0; y < 8; y++) for (let x = -10; x <= 10; x++) { const ala = y > 5, copa = y <= 6 && Math.abs(x) < 6; if ((ala && Math.abs(x) < 11) || copa) R.pset(150 + x, 30 + y, y === 4 ? H('#8a2a20') : ala ? H('#4a3424') : H('#5a3c26')); }
  for (let a = 0; a <= 20; a++) { const p = Math.PI * (0.15 + a / 20 * 0.7); R.pset(ri(272 + Math.cos(p) * 8), ri(90 - Math.sin(p) * 9), HIE[3]); R.pset(ri(272 + Math.cos(p) * 7), ri(90 - Math.sin(p) * 8), HIE[1]); }
  // una repisa con botellas y un candil
  R.rect(276, 70, 318, 73, TA.mesa[1]); R.rect(276, 70, 318, 70, TA.mesa[3]);
  for (const [x, c, hh] of [[280, '#3a5a3a', 14], [290, '#6a3a2a', 11], [300, '#2e3a5a', 16]]) { R.rect(x, 70 - hh, x + 5, 69, K); R.rect(x + 1, 71 - hh, x + 4, 69, H(c)); R.rect(x + 2, 67 - hh, x + 3, 70 - hh, K); R.pset(x + 1, 72 - hh, H('#e8e8f0')); }
  // LA MESA: tablas gruesas con vetas, nudos y marcas, en perspectiva
  for (let y = 98; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y - 98) / 20), ju = (y - 98) % 20 === 19;
    R.pset(x, y, ju ? TA.mesa[0] : rmp(TA.mesa, 2.6 - ((y - 98) % 20) / 21 + (Math.sin(x * 0.05 + tabla * 2 + Math.sin(x * 0.013) * 3) > 0.85 ? -1 : 0) + (h2(x >> 2, y, 84) - 0.5) * 0.5, x, y)); }
  R.rect(0, 98, 319, 99, TA.mesa[4]); R.rect(0, 97, 319, 97, TA.tronco[0]);
  for (const [x, y] of [[48, 128], [130, 172], [180, 112]]) { R.disco(x, y, 3, TA.mesa[1]); R.disco(x, y, 1, TA.mesa[0]); }
  R.usar(prev);
};
// una jarra de estaño con su asa
const jarra = (x, y, t, c = H('#9aa2b0'), S = 2) => { const P = (i, j, col) => R.rect(x + i * S, y + j * S, x + i * S + S - 1, y + j * S + S - 1, col);
  sombraS(x + S, y + 1, 9 * S, 0.3);
  for (let j = -15; j <= 0; j++) for (let i = -6; i <= 6; i++) P(i, j, Math.abs(i) === 6 || j === 0 || j === -15 ? K : i < -3 ? H('#e0e4ec') : i > 3 ? H('#5a6070') : j === -12 || j === -3 ? H('#6a7080') : c);
  for (let j = -12; j <= -4; j++) { P(7, j, K); P(9, j, K); if (j === -12 || j === -4) P(8, j, K); else P(8, j, c); }
  for (let i = -5; i <= 5; i++) { P(i, -16, H('#f4eee0')); P(i, -17, i % 3 ? H('#ffffff') : H('#f4eee0')); } P(-4, -18, H('#ffffff')); P(2, -18, H('#f4eee0'));
};
const P12 = (t) => {
  fondoTA(); R.buf.set(BTA);
  // por la ventana pasan nubes y una bandada (recortadas al hueco)
  R.recorte([196, 12, 262, 34]); for (let k = 0; k < 2; k++) { const x = 196 + ((k * 40 + t * 4) % 90) - 10; R.disco(ri(x), 22 + k * 6, 4, H('#f0f4fa')); R.disco(ri(x) + 5, 22 + k * 6, 3, H('#ffffff')); R.disco(ri(x) - 4, 23 + k * 6, 3, H('#d8e0ec')); }
  for (let k = 0; k < 4; k++) { const x = 270 - ((t * 9 + k * 6) % 90), y = 28 + (k % 2) * 2; R.pset(ri(x), y, K); R.pset(ri(x) + 1, y - (Math.sin(t * 9 + k) > 0 ? 1 : 0), K); }
  R.recorte(null);
  // la luz de la lámpara del estante que tiembla
  luz(70, 26, 70 + Math.sin(t * 9) * 3, H('#ffd890'), 0.22);
  // la mesa: dos jarras, los naipes, el sombrero de cazador y el cuerno de pólvora
  jarra(40, 150, t); jarra(96, 164, t, H('#8a929e'));
  for (let k = 0; k < 4; k++) { const x = 66 + k * 11, y = 118 + (k % 2) * 3; R.rect(x, y, x + 11, y + 16, K); R.rect(x + 1, y + 1, x + 10, y + 15, H('#f4eee0')); R.rect(x + 1, y + 1, x + 1, y + 15, H('#d8d0c0'));
    const pc = k % 2 ? H('#c8241c') : K; R.rect(x + 3, y + 3, x + 4, y + 4, pc); R.rect(x + 7, y + 11, x + 8, y + 12, pc); R.rect(x + 5, y + 7, x + 6, y + 8, pc); }
  // una pipa humeante y unas monedas
  R.rect(112, 142, 126, 143, H('#5a3a22')); R.rect(110, 136, 113, 143, H('#3a2414')); R.rect(110, 136, 113, 136, H('#7a5232'));
  for (let k = 0; k < 5; k++) { const u = (t * 0.6 + k / 5) % 1; tine(111 + Math.sin(u * 6 + k) * 2 + u * 4, 133 - u * 26, H('#e8e8f0'), 0.5 * (1 - u)); tine(112 + Math.sin(u * 6 + k) * 2 + u * 4, 133 - u * 26, H('#e8e8f0'), 0.4 * (1 - u)); }
  R.rect(14, 140, 24, 142, HIE[2]); R.rect(8, 142, 30, 144, HIE[1]); R.rect(8, 142, 30, 142, HIE[3]); R.rect(16, 122, 21, 140, H('#f0e6c8')); R.rect(16, 122, 17, 140, H('#ffffff')); R.rect(21, 124, 21, 140, H('#c8bc98'));
  { const fl = Math.sin(t * 11) > 0 ? 1 : 0; R.rect(18, 116 - fl, 19, 121, H('#ffd890')); ps(18, 114 - fl, H('#fff4c0')); ps(19, 121, H('#3a2414')); luz(19, 118, 34, H('#ffd890'), 0.25); }
  for (const [x, y] of [[40, 172], [46, 174], [43, 169]]) { R.disco(x, y, 3, K); R.disco(x, y, 2, ORO[2]); ps(x - 1, y - 1, ORO[4]); }
  // LA PIZARRA apoyada contra una jarra, y la mano con la tiza que va marcando los días
  const PZ = [146, 118, 308, 172];
  R.rect(PZ[0] - 3, PZ[1] - 3, PZ[2] + 3, PZ[3] + 3, TA.mesa[0]); R.rect(PZ[0] - 2, PZ[1] - 2, PZ[2] + 2, PZ[3] + 2, TA.mesa[3]);
  for (let y = PZ[1]; y <= PZ[3]; y++) for (let x = PZ[0]; x <= PZ[2]; x++) R.pset(x, y, rmp(pal(['#1e2a26', '#26342e', '#2e3e36']), 1.2 + (h2(x >> 1, y >> 1, 85) - 0.5) * 0.8, x, y));
  const n = Math.min(30, Math.floor(tramo(t, TB.SPEND - 0.6, TB.MONTH + 0.3) * 30.999)), TZ = H('#e8ecf0');
  let px = 0, py = 0;
  for (let k = 0; k < n; k++) { const g = Math.floor(k / 5), r = k % 5, gx = PZ[0] + 12 + (g % 3) * 50, gy = PZ[1] + 7 + Math.floor(g / 3) * 25;
    if (r < 4) { const x = gx + r * 8; R.linea(x, gy, x + 2, gy + 18, TZ); R.linea(x + 1, gy, x + 3, gy + 18, TZ); ps(x + 2, gy + 4, H('#b8c0c4')); px = x + 3; py = gy + 18; }
    else { R.linea(gx - 4, gy + 14, gx + 30, gy + 3, TZ); R.linea(gx - 4, gy + 15, gx + 30, gy + 4, TZ); px = gx + 30; py = gy + 4; } }
  // el 30, que sale en «a month»
  const m = pop(t, TB.MONTH, 0.35);
  if (m > 0) { luz(226, 106, 26, H('#fff4c0'), 0.35 * Math.min(1, m)); R.numero('30', 226, ri(112 - 6 * Math.min(1, m)), { tam: 16, centro: true }); }
  // la mano con la tiza (brazo canónico que entra por la esquina de abajo a la derecha)
  if (n > 0 && n < 30) { const wx = px + 6, wy = py + 6 + ri(Math.sin(t * 20)); T.brazo(R, wx + 22, 206, wx + 6, wy + 8, '#7a5a36', -1, {}); R.rect(wx - 5, wy + 6, wx - 1, wy + 8, TZ); R.rect(wx - 5, wy + 6, wx - 4, wy + 6, H('#ffffff')); }
  else if (n === 0) T.brazo(R, 180, 206, 166, 172, '#7a5a36', -1, {});
};
// ── P13 · LA TABERNA DE BUFORD (bedford 'taberna'): las mulas de la recua atadas, los cazadores salen «a cazar» con el
// rifle al hombro y saludan; Beale, en medio, mira a los picos de Otter buscando el sitio y en «bury it» mira la pala ──
const O13 = { encuadre: 'taberna' };
const P13 = (t) => {
  T.bedford(R, t, O13);
  // las dos mulas cargadas de la recua, atadas junto al porche (la pala asoma en la carga)
  T.b_mula(R, 146, 147, t, { dir: -1, come: true, k: 1 }); T.b_mula(R, 30, 148, t, { dir: 1, k: 2, color: 'bayo' });
  pala(156, 133, 144, 119);
  if (t > TB.BURY - 0.1 && Math.sin(t * 8) > 0) destello(143, 118, 3, H('#ffffff'));
  // los dos cazadores que salen a «cazar»: bajan del porche con el rifle al hombro y se van hacia la izquierda;
  // el segundo se vuelve y saluda al tabernero en «come to hunt»
  const s1 = tramo(t, TB.TAVERN + 0.3, TB.TAVERN + 6.0), x1 = ri(lerp(230, 52, s1));
  const m1 = R.actor(BL.cazadorBL, x1, 162, t, { dir: -1, anda: s1 > 0 && s1 < 1, sostiene: [x1 + 2, 144], sonrisa: true, habla: t > TB.PRETENDING && t < TB.COME && parp(t) }).mano;
  rifle(m1[0] + 6, m1[1] + 6, m1[0] - 12, m1[1] - 12);
  const s2 = tramo(t, TB.PRETENDING - 0.4, TB.BURY + 0.6), x2 = ri(lerp(244, 96, s2)), sal = t > TB.HUNT2 - 0.1 && t < TB.HUNT2 + 0.9;
  const m2 = R.actor(BL.cazador2BL, x2, 166, t, { dir: sal ? 1 : -1, anda: s2 > 0 && s2 < 1 && !sal, brazos: sal, sostiene: sal ? undefined : [x2 + 2, 148], sonrisa: true });
  if (!sal) rifle(m2.mano[0] + 6, m2.mano[1] + 6, m2.mano[0] - 12, m2.mano[1] - 12);
  else rifle(x2 + 18, 163, x2 + 24, 141);
  // BEALE: en «look for the place» se pone la mano de visera y mira a los picos; en «bury it» mira la pala de la mula
  const busca = t > TB.LOOK - 0.1, entierra = t > TB.BURY - 0.1;
  R.actor(BL.bealeOesteBL, 186, 158, t, { dir: entierra ? 1 : busca ? -1 : 1, dedo: busca && !entierra, piensa: entierra, habla: t > TB.TAVERN && t < TB.BEDFORD + 0.6 && parp(t), sonrisa: t < TB.PRETENDING });
  T.bedfordDelante(R, t, O13);
};
'''

OESTE = r'''
// ── el montaje: un plano nuevo en cada palabra que manda ──
T.rodar(E, R, [[0, P1], [TB.MEN, P2], [TB.AFTER, P3], [TB.IN1, P4], [TB.SOMETHING, P5], [TB.THOSE, P6], [TB.STAYED, P7], [TB.NOW, P8],
  [TB.THEYVE, P9], [TB.HOME, P10], [TB.BIEL, P11], [TB.AND5, P12], [TB.TAVERN, P13]], {
  cartela: '1817',
  efectos: [[2.0, 'pasos'], [3.2, 'guau'], [TB.N30, 'pop'], [TB.MEN + 0.3, 'pasos'], [TB.SANTA, 'pop'], [TB.CAMPED, 'pop'],
    [TB.IN1 + 0.3, 'burbujas'], [TB.SUPPER - 0.1, 'golpecito'], [TB.SAW, 'brillo'], [TB.GLINT, 'brillo'], [TB.GOLD, 'campana'],
    [TB.HUNTERS, 'pasos'], [TB.SENT - 0.3, 'brillo'], [TB.YEAR, 'golpecito'], [TB.MOUNTAIN + 0.4, 'golpecito'], [TB.BROUGHT + 0.1, 'golpecito'],
    [TB.NOW + 0.2, 'pop'], [TB.HUNDREDS, 'whoosh'], [TB.BANK, 'brillo'], [TB.PILED, 'chof'], [TB.GUARD, 'pasos'], [TB.TAKE - 0.1, 'whoosh'],
    [TB.HIDE, 'pop'], [TB.ACCORDING + 0.4, 'papel'], [TB.BIEL + 0.3, 'pasos'], [TB.GOLD3, 'brillo'], [TB.SILVER, 'brillo'], [TB.TEN, 'pop'],
    [TB.SPEND - 0.4, 'lapiz'], [TB.MONTH, 'pop'], [TB.TAVERN + 0.4, 'puerta'], [TB.HUNT2, 'palmada'], [TB.BURY, 'brillo']],
  año: (t) => (t < TB.IN1 ? 1817 : t < TB.YEAR ? 1818 : 1819) });
'''

PESO = r'''
// ── la PAUSA «fíjate»: el mundo de bl-oeste congelado (los mismos planos, con las mismas funciones) en gris azulado, y
// Atom al doble y a color ──
const TF13 = 67.97, TF9 = 47.8, TF7 = 35.6, TF11 = 56.4, TF4 = 20.3, TF12 = 60.1, TF1 = 5.7;
const VOZ = [[0.2, 3.2], [4.5, 8.6], [9.4, 14.7], [15.3, 17.9], [18.5, 19.5], [20.1, 23.6], [23.9, 25.4], [26.0, 28.1], [28.7, 30.1], [30.6, 33.0]];
const habla = (t) => VOZ.some(([a, b]) => t > a && t < b) && parp(t, 8) ? 1 : 0;
const mudo = (t) => 0;
// una pesa de hierro (de campana, con su aro) a color; s escala
const pesa = (x, base, s, c = HIE) => { x = ri(x); base = ri(base);
  for (let j = 0; j < 10 * s; j++) { const w = ri((6 - j / s * 0.35) * s); for (let i = -w; i <= w; i++) ps(x + i, base - j, Math.abs(i) === w || j === 0 ? c[0] : i < -w * 0.4 ? c[4] : i < 0 ? c[3] : c[2]); }
  for (let a = 0; a <= 20; a++) { const p = Math.PI * a / 20; for (let q = 0; q < s; q++) ps(x + Math.cos(p) * 3 * s, base - 10 * s - Math.sin(p) * 3 * s - q, c[0]); } };
// un número a color que cuenta hasta n, con su resplandor
const cuenta = (n, u, x, y, tam = 16) => { if (u <= 0) return; luz(x, y - 6, 30, H('#fff4c0'), 0.35 * Math.min(1, u * 2)); R.numero(String(ri(n * Math.min(1, u))), x, y, { tam, centro: true }); };
// los brazos de Atom que se estiran (a su escala 2: crema con contorno y el guante blanco), de la mano (x0, y0) a (x1, y1)
const brazoAtom = (x0, y0, x1, y1) => { const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0)));
  for (let k = 0; k <= n; k++) { const x = lerp(x0, x1, k / n), y = lerp(y0, y1, k / n); R.rect(ri(x) - 2, ri(y) - 2, ri(x) + 1, ri(y) + 1, K); }
  for (let k = 0; k <= n; k++) { const x = lerp(x0, x1, k / n), y = lerp(y0, y1, k / n); R.rect(ri(x) - 1, ri(y) - 1, ri(x), ri(y), H('#f4e6c8')); }
  R.rect(ri(x1) - 4, ri(y1) - 4, ri(x1) + 3, ri(y1) + 3, K); R.rect(ri(x1) - 3, ri(y1) - 3, ri(x1) + 2, ri(y1) + 2, H('#ffffff')); };
const gota = (x, y) => { ps(x, y, H('#8ac8f0')); ps(x, y + 1, H('#8ac8f0')); ps(x - 1, y + 2, H('#5aa0d8')); ps(x + 1, y + 2, H('#5aa0d8')); ps(x, y + 3, H('#5aa0d8')); ps(x, y - 1, H('#d8f0ff')); };

// ── S1 · la taberna congelada (el último instante de bl-oeste): Atom entra al doble, saca el folleto y lo abre ──
const S1 = (t) => {
  P13(TF13); AT.pausa(R, tramo(t, 0, 0.3));
  const u = tramo(t, 0.15, 1.5), x = lerp(350, 262, ease(u)), anda = u > 0 && u < 1;
  const f = pop(t, TS.PAMPHLET - 0.1, 0.35);
  const a = AT.atom(R, x, 178, t, { s: 2, dir: -1, pose: anda ? 'camina' : f > 0 ? 'sostiene' : 'senala', cara: t > TS.SMALL - 0.1 ? 'sorpresa' : 'normal', habla: habla(t) });
  if (f > 0) { const ab = tramo(t, TS.NUMBERS - 0.1, TS.NUMBERS + 0.4), fx = ri(a.mano[0] - 30), fy = ri(a.mano[1] - 26 - 4 * Math.min(1, f));
    luz(fx, fy, 40, H('#fff4c0'), 0.3); T.d_folleto(R, fx, fy, { escala: 2, abierto: ab, brillo: t > TS.SMALL ? 1 : 0, t }); }
  if (t > TS.SMALL - 0.05) AT.anillo(R, x - 64, 104, 40, 30, t, tramo(t, TS.SMALL - 0.05, TS.SMALL + 0.5));
};
// ── S2 · la tienda congelada: sobre el montón sale el 2921 a color, que cuenta; en «gold» brillan los lingotes ──
const S2 = (t) => {
  P9(TF9); AT.pausa(R, 1);
  const c = tramo(t, TS.N2921 - 0.1, TS.POUNDS - 0.2);
  cuenta(2921, c, 158, 76);
  const g = pop(t, TS.GOLD - 0.15, 0.35);
  if (g > 0) { luz(158, 118, 44, H('#ffe080'), 0.4 * Math.min(1, g)); for (let k = 0; k < 5; k++) { const px = 140 + (k % 3) * 18 + (k > 2 ? 9 : 0), py = ri(104 - (k > 2 ? 7 : 0) - 6 * (1 - Math.min(1, g))); lingote(px, py, 2, ORO); } }
  AT.atom(R, 262, 178, t, { s: 2, dir: -1, pose: t > TS.N2921 - 0.2 && t < TS.POUNDS ? 'senala' : t >= TS.POUNDS ? 'brazos' : 'quieto', cara: g > 0 ? 'sonrisa' : 'normal', habla: habla(t) });
};
// ── S3 · la mina congelada: «1000» y «1300», con una pesa pequeña y una grande; Atom mira una y otra y se encoge ──
const S3 = (t) => {
  P7(TF7); AT.pausa(R, 1);
  const a1 = pop(t, TS.THOUSAND - 0.1, 0.35), a2 = pop(t, TS.N1300 - 0.1, 0.35);
  if (a1 > 0) { luz(84, 58, 30, H('#fff4c0'), 0.3); R.numero('1000', 84, ri(64 - 6 * Math.min(1, a1)), { tam: 16, centro: true }); }
  if (a2 > 0) { luz(236, 58, 30, H('#fff4c0'), 0.3); R.numero('1300', 236, ri(64 - 6 * Math.min(1, a2)), { tam: 16, centro: true }); }
  if (a1 > 0 && a2 > 0) for (let x = 120; x <= 200; x += 4) { ps(x, 56, H('#ffe080')); ps(x + 1, 56, H('#ffe080')); ps(x, 57, K); }
  const p1 = pop(t, TS.DEPENDING - 0.1, 0.35), p2 = pop(t, TS.DEPENDING + 0.3, 0.35);
  if (p1 > 0) { sombraS(84, 101, 12); pesa(84, ri(100 - 8 * (1 - Math.min(1, p1))), 2); }
  if (p2 > 0) { sombraS(236, 105, 16); pesa(236, ri(104 - 8 * (1 - Math.min(1, p2))), 3); }
  const mira = t > TS.POUND - 0.1 && t < TS.USE ? (Math.sin((t - TS.POUND) * 9) > 0 ? 1 : -1) : -1;
  AT.atom(R, 160, 178, t, { s: 2, dir: mira, pose: t > TS.USE - 0.05 ? 'brazos' : t > TS.DEPENDING ? 'piensa' : t > TS.THOUSAND - 0.2 ? 'senala' : 'quieto', cara: t > TS.USE ? 'guino' : 'normal', habla: habla(t) });
};
// ── S4 · la recua congelada: la pila de lingotes de plata y el «5100»; en «that gold alone» la plata se aparta y queda el oro ──
const S4 = (t) => {
  P11(TF11); AT.pausa(R, 1);
  const p = pop(t, TS.N5100 - 0.1, 0.4), fuera = tramo(t, TS.AND2, TS.AND2 + 0.5);
  if (p > 0) { const ox = ri(lerp(0, 200, ease(fuera))); for (let k = 0; k < 6; k++) { const px = 118 + (k % 3) * 22 + (k > 2 ? 11 : 0) + ox, py = ri(124 - (k > 2 ? 9 : 0) - 10 * (1 - Math.min(1, p))); lingote(px, py, 2, PLATA); }
    if (fuera < 1) cuenta(5100, tramo(t, TS.N5100, TS.SILVER - 0.6), 140 + ox, 92); if (t > TS.SILVER - 0.1 && t < TS.SILVER + 0.8) destello(150 + ox, 108, 5, PLATA[4]); }
  const g = pop(t, TS.ALONE - 0.3, 0.35);
  if (g > 0) { luz(140, 112, 40, H('#ffe080'), 0.4); for (let k = 0; k < 3; k++) lingote(124 + k * 16, ri(124 - 8 * (1 - Math.min(1, g))), 2, ORO); lingote(132, 116, 2, ORO); lingote(148, 116, 2, ORO); AT.anillo(R, 140, 116, 38, 16, t, tramo(t, TS.ALONE, TS.ALONE + 0.5)); }
  AT.atom(R, 262, 178, t, { s: 2, dir: -1, pose: fuera > 0 && fuera < 1 ? 'sostiene' : t > TS.ALONE ? 'senala' : t > TS.N5100 ? 'brazos' : 'quieto', cara: t > TS.ALONE ? 'sonrisa' : 'sorpresa', habla: habla(t) });
};
// ── S5 · el barranco congelado al atardecer: «$100000000», los ceros salen uno a uno; caen monedas a color ──
const S5 = (t) => {
  P4(TF4); AT.pausa(R, 1);
  const d = pop(t, TS.TODAYS, 0.35);
  if (d > 0) { const nz = Math.min(8, Math.floor(tramo(t, TS.HUNDRED - 0.1, TS.DOLLARS) * 8.99)), txt = t < TS.HUNDRED - 0.1 ? '$' : '$1' + '0'.repeat(nz);
    luz(160, 60, 70, H('#fff4c0'), 0.3); R.numero(txt, 160, ri(70 - 6 * Math.min(1, d)), { tam: 16, centro: true }); }
  if (t > TS.WORTH) for (let k = 0; k < 18; k++) { const u = ((t - TS.WORTH) * (0.9 + (k % 4) * 0.15) + k * 0.13) % 1.2; if (u > 1 || (t - TS.WORTH) < k * 0.08) continue; const x = 40 + ((k * 61) % 240), y = 76 + u * 100, fr = Math.floor(t * 8 + k) % 3;
    const w = fr === 1 ? 1 : 2; R.rect(ri(x) - w - 1, ri(y) - 3, ri(x) + w + 1, ri(y) + 3, K); R.rect(ri(x) - w, ri(y) - 2, ri(x) + w, ri(y) + 2, fr === 2 ? ORO[2] : ORO[3]); ps(ri(x) - w + 1, ri(y) - 1, ORO[4]); }
  AT.atom(R, 64, 178, t, { s: 2, dir: 1, pose: t > TS.MILLION ? 'brazos' : t > TS.TODAYS ? 'senala' : 'quieto', cara: t > TS.MILLION - 0.1 ? 'sorpresa' : 'normal', habla: habla(t) });
};
// ── S6 · la mesa congelada: EL GAG DE LA OLLA (Atom tira y se le estiran los brazos; la olla ni se mueve) y, en «weighs»,
// la balanza: la olla de oro contra el coche, que se equilibra en «small car» y saca el 2921 ──
const S6 = (t) => {
  P12(TF12); AT.pausa(R, 1);
  const OX = 104, OB = 158;
  const tira = tramo(t, TS.TO + 0.15, TS.IDEA + 0.1), suelta = t > TS.IDEA + 0.35, cae = tramo(t, TS.IDEA + 0.35, TS.IDEA + 0.6);
  const tiemb = tira > 0 && !suelta ? ri(Math.sin(t * 40)) : 0;
  const sube = suelta ? lerp(30, 0, cae) - (cae >= 1 ? ri(Math.abs(Math.sin((t - TS.IDEA - 0.6) * 9)) * 4 * Math.max(0, 1 - (t - TS.IDEA - 0.6) * 2)) : 0) : 30 * ease(tira);
  const va = tramo(t, TS.WEIGHS - 0.3, TS.WEIGHS + 0.3), ax = lerp(OX, 176, ease(va)), ay = lerp(128 - sube, 176, ease(va)), detras = va < 0.5;
  const pinta = () => AT.atom(R, ax, ay, t, { s: 2, dir: 1, pose: va > 0 && va < 1 ? 'camina' : va >= 1 ? 'senala' : tira > 0 && !suelta ? 'sostiene' : 'quieto', cara: tira > 0.5 && !suelta ? 'triste' : suelta && va <= 0 ? 'sorpresa' : 'sonrisa', habla: habla(t) });
  const a = detras ? pinta() : null;
  const o = olla(OX + tiemb, OB, t, { s: 3, k: 9, asaArriba: 0.15 });
  if (a && tira > 0 && !suelta) { brazoAtom(a.centro[0] - 9, a.centro[1] + 6, o.asas[0][0] + 2, o.asas[0][1]); brazoAtom(a.centro[0] + 9, a.centro[1] + 6, o.asas[1][0] - 2, o.asas[1][1]);
    if (Math.sin(t * 7) > 0) gota(ri(a.centro[0]) - 18, ri(a.centro[1]) - 22); if (Math.sin(t * 7 + 2) > 0) gota(ri(a.centro[0]) + 18, ri(a.centro[1]) - 26); }
  if (suelta && va <= 0) for (let k = 0; k < 4; k++) { const p = t * 5 + k * Math.PI / 2; R.icono('!', ri(OX + Math.cos(p) * 18) - 1, ri(92 + Math.sin(p) * 5), H('#ffe080'), K, 1); }
  if (!detras) pinta();
  // la balanza, en «weighs»: sube del suelo de la mesa y se equilibra en «small car»
  const b = pop(t, TS.WEIGHS - 0.1, 0.4);
  if (b > 0) { const by = ri(176 + 12 * (1 - Math.min(1, b))); luz(238, by - 50, 60, H('#fff4c0'), 0.3); T.pausa(R, 238, by, t, { cual: 'balanza', peso: tramo(t, TS.WEIGHS + 0.3, TS.CAR) }); }
};
// ── S7 · Virginia congelada: «iron pots in a Virginia forest»: las ollas aparecen a color bajo el cornejo; vuelve el color ──
const S7 = (t) => {
  P1(TF1);
  const vuelve = tramo(t, TS.FOREST + 0.1, TS.FOREST + 0.9);
  AT.pausa(R, 1 - vuelve);
  const OLL = [[40, 172, TS.SITTING - 0.1], [70, 176, TS.IRON], [100, 171, TS.POTS]];
  for (const [x, y, a] of OLL) { const p = pop(t, a, 0.35); if (p > 0) { luz(x, y - 16, 22, H('#ffe080'), 0.3 * (1 - vuelve)); olla(x, ri(y - 8 * (1 - Math.min(1, p))), t, { s: 2, k: x }); } }
  if (t > TS.MADE && t < TS.SITTING) { const u = (t - TS.MADE) / (TS.SITTING - TS.MADE); luz(lerp(20, 300, u), 120, 36, H('#ffe080'), 0.25); }
  if (t > TS.VIRGINIA - 0.1) AT.anillo(R, 70, 162, 46, 16, t, tramo(t, TS.VIRGINIA - 0.1, TS.VIRGINIA + 0.5));
  const sale = tramo(t, TS.FOREST + 0.3, TS.FOREST + 1.4);
  AT.atom(R, lerp(190, 360, ease(sale)), 178, t, { s: 2, dir: sale > 0 ? 1 : -1, pose: sale > 0 ? 'camina' : t > TS.VIRGINIA - 0.2 ? 'senala' : t > TS.MADE ? 'brazos' : 'quieto', cara: 'sonrisa', habla: habla(t) });
};

T.rodar(E, R, [[0, S1], [TS.IT, S2], [TS.SOMEWHERE, S3], [TS.AND, S4], [TS.AT, S5], [TS.TO, S6], [TS.MADE, S7]], {
  efectos: [[0.1, 'tapestop'], [TS.PAMPHLET, 'papel'], [TS.SMALL, 'pop'], [TS.N2921, 'tic'], [TS.GOLD, 'brillo'], [TS.THOUSAND, 'pop'], [TS.N1300, 'pop'],
    [TS.DEPENDING, 'golpecito'], [TS.USE, 'boing'], [TS.N5100, 'pop'], [TS.SILVER, 'brillo'], [TS.AND2, 'whoosh'], [TS.HUNDRED, 'tic'], [TS.DOLLARS, 'brillo'],
    [TS.TO + 0.3, 'boing'], [TS.IDEA + 0.35, 'boing'], [TS.WEIGHS, 'pop'], [TS.CAR, 'campana'], [TS.SITTING, 'pop'], [TS.POTS, 'pop'], [TS.FOREST + 0.1, 'whoosh']],
  año: 1819 });
'''

CAB_OESTE = r'''// bl-oeste (frases 9–10, cartela 1817; la barra del año: 1817 → 1818 en el barranco → 1819 en la mina).
// 1 · Virginia en abril (fondo local): la granja al pie del Blue Ridge; Beale a caballo encabeza la partida hacia el
//   oeste, la mujer despide desde el porche, el perro corre; a lo lejos baja la columna de jinetes; en «30 men» sale el 30.
// 2 · Las llanuras (oeste llanura, cámara manada): galopan entre los búfalos; la estampida corre por la loma; Beale
//   señala en «buffalo». Corta en «after».
// 3 · El mapa del oeste (T.mapa): la ruta llega por el camino de Santa Fe, nieva sobre Santa Fe en «Santa Fe»; unos pocos
//   suben al norte tras un búfalo; en «camped» la tienda y la chincheta dorada. Corta en «in a ravine».
// 4 · El barranco al atardecer (oeste barranco): llega la leña, el cocinero remueve la olla, Beale habla; en «saw» uno se
//   vuelve y señala la grieta, que empieza a brillar. Corta en «something».
// 5 · La roca de cerca (cámara roca): la sombra del cazador y su tea suben por la pared, la veta brilla más y en «gold»
//   estalla (el golpe). Corta en «those hunters».
// 6 · La plaza de Santa Fe (fondo local): el tratante levanta una piel en «hides»; el mensajero llega al galope y alza la
//   pepita en «sent for»; Beale sale de la cantina, se sorprende en «Beale». Corta en «stayed».
// 7 · La mina (oeste barranco mina): pican, los sacos se apilan (el año y medio); en «tools» llega la mula con picos y
//   palas de Santa Fe y Beale coge un pico. Corta en «Now».
// 8 · En medio de la nada (oeste llanura): el montón con un solo guardia; Atom entra, abre los brazos en «nowhere» y en
//   «hundreds of miles» tira la línea hasta el banco, con la cuenta hasta 800. Corta en «they've piled».
// 9 · La tienda de noche (fondo local): caen más sacos en «piled up»; la sombra del guardia pasa por la lona en «guard»;
//   Beale decide y señala al este en «take it home». Corta en «home».
// 10 · El mapa de todo el país: la mula recorre la ruta de vuelta; en «hide» la chincheta de Bedford con «?»; en
//   «letters» la carta. Corta en «Beale crosses».
// 11 · La recua por los montes (oeste camino recua): Beale delante, mulas con oro y plata (brillan en su palabra) y la
//   escolta; en «ten men» sale el 10. Corta en «and so as not».
// 12 · La mesa de la taberna (inserto, fondo local): la mano con tiza marca los días; en «a month» son 30. Corta en «Tavern».
// 13 · La taberna de Buford (bedford taberna): los cazadores salen «a cazar» con el rifle al hombro y uno saluda en
//   «hunt»; Beale busca el sitio mirando a los picos y en «bury it» mira la pala de la mula. Su último instante lo
//   congela bl-peso.'''

CAB_PESO = r'''// bl-peso (frase 11, PAUSA «fíjate»): el mundo de bl-oeste congelado en gris azulado (los mismos planos y funciones) y
// Atom al doble, a color.
// 1 · La taberna congelada (el último instante de bl-oeste): Atom entra, saca el folleto en «pamphlet» y lo abre en
//   «numbers». Corta en «It talks».
// 2 · La tienda congelada: el 2921 cuenta sobre el montón en «2,921»; en «gold» brillan los lingotes. Corta en «somewhere».
// 3 · La mina congelada: «1000» y «1300»; en «depending» una pesa pequeña y una grande; Atom duda y se encoge en «use».
// 4 · La recua congelada: la pila de plata y el «5100»; en «that gold alone» la plata se aparta y queda el oro.
// 5 · El barranco congelado: «$100000000», los ceros salen en «hundred million dollars»; caen monedas.
// 6 · La mesa congelada: GAG DE LA OLLA (Atom tira, se le estiran los brazos y la olla ni se mueve; suelta en «idea») y en
//   «weighs» la balanza: la olla contra el coche, equilibrada en «small car», con el 2921.
// 7 · Virginia congelada: en «sitting in iron pots» aparecen las ollas a color; en «Virginia forest» la órbita y vuelve el color.'''

E['bl-oeste'] = ('El oro del oeste', CAB_OESTE, tb_en() + COMPARTIDO + OESTE)
E['bl-peso'] = ('Fíjate: el peso', CAB_PESO, tb_num() + ts_en() + COMPARTIDO + PESO)
