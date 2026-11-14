E = {}

# utilidades comunes de las dos escenas (van al principio del cuerpo de cada una)
AUX = r'''
const K = hex('#17151d'), BL = hex('#f6f2ea'), Z = T.PIEZAS_CF, VAC = 0;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4[((y | 0) & 3) * 4 + ((x | 0) & 3)] + 0.5) / 16;
const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = (u) => u * u * (3 - 2 * u);
// degradado tramado entre varios colores (f da 0–1 en cada punto; por omisión, de arriba abajo)
const grad = (x0, y0, x1, y1, cols, f) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = f ? f(x, y) : (y - y0) / Math.max(1, y1 - y0); R.pset(x, y, cols[Math.max(0, Math.min(cols.length - 1, Math.floor(u * (cols.length - 1) + b4(x, y))))]); } };
// luz: mezcla cada punto con col en la proporción que da f
const luz = (x0, y0, x1, y1, col, f) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const a = f(x, y); if (a > 0) R.pset(x, y, mez(R.pget(x, y), col, Math.min(1, a))); } };
const halo = (cx, cy, r, col, f = 0.6) => luz(Math.floor(cx - r), Math.floor(cy - r), Math.ceil(cx + r), Math.ceil(cy + r), col, (x, y) => { const g = 1 - Math.hypot(x - cx, y - cy) / r; return g <= 0 ? 0 : g * g * f; });
// lo fijo de un plano, pintado una vez en un búfer y pegado en cada fotograma
const CAPAS = {};
const fondo = (k, fn) => { if (!CAPAS[k]) { const b = R.nuevo(); b.fill(VAC); const prev = R.usar(b); fn(); R.usar(prev); CAPAS[k] = b; } R.buf.set(CAPAS[k]); };
// una pieza guardada como dibujo suelto (para girarla): fn(x, y) la pinta con (x, y) = centro de abajo
const SPR = {};
const sprite = (k, fn, w, h) => { if (!SPR[k]) { const b = R.nuevo(); b.fill(VAC); const prev = R.usar(b); fn(Math.floor(w / 2), h - 1); R.usar(prev); const a = new Uint32Array(w * h); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) a[y * w + x] = b[y * 320 + x]; SPR[k] = { a, w, h }; } return SPR[k]; };
// pinta el dibujo S girado ang radianes (sentido de las agujas) alrededor del punto (px, py) del dibujo, puesto en (x, y)
const girado = (S, px, py, ang, x, y) => { const c = Math.cos(ang), s = Math.sin(ang), r = Math.ceil(Math.hypot(S.w, S.h));
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const u = Math.round(c * i + s * j + px), v = Math.round(-s * i + c * j + py); if (u < 0 || v < 0 || u >= S.w || v >= S.h) continue; const col = S.a[v * S.w + u]; if (col !== VAC) R.pset(Math.round(x) + i, Math.round(y) + j, col); } };
// una nube de tres tonos (centro x, base y, ancho w)
const nube = (x, y, w, c) => { const hg = Math.max(3, Math.round(w / 4)); for (let j = 0; j <= hg; j++) for (let i = -w / 2; i <= w / 2; i++) { const e = (i / (w / 2)) ** 2 + ((j - hg) / hg) ** 2 * (Math.abs(i) < w / 4 ? 0.55 : 1.4); if (e <= 1) R.pset(Math.round(x + i), Math.round(y + j - hg), j > hg * 0.7 ? c[2] : (j < hg * 0.35 && i < 0) ? c[0] : c[1]); } };
// un pájaro pequeño que aletea
const pajaro = (x, y, t, k, c) => { const a = Math.sin(t * 9 + k * 2) > 0 ? 1 : 0; x = Math.round(x); y = Math.round(y); R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - 2 * a + 1, c); R.pset(x + 2, y - 2 * a + 1, c); };
// un destello en cruz
const destello = (x, y, r, c) => { x = Math.round(x); y = Math.round(y); R.pset(x, y, c); for (let k = 1; k <= r; k++) { R.pset(x - k, y, c); R.pset(x + k, y, c); R.pset(x, y - k, c); R.pset(x, y + k, c); } };
// chispas que se abren alrededor de un punto (u de 0 a 1)
const puf = (x, y, u, n, r, c, c2) => { if (u <= 0 || u >= 1) return; for (let k = 0; k < n; k++) { const an = k * Math.PI * 2 / n + k, q = r * (0.3 + u * 0.7); const px = Math.round(x + Math.cos(an) * q), py = Math.round(y + Math.sin(an) * q * 0.8 - u * 4); R.pset(px, py, k % 2 ? c : c2); if (u < 0.6) R.pset(px + 1, py, c); } };
// un terrón que salta de (x0, y0) a (x1, y1) en arco (u de 0 a 1)
const terron = (x0, y0, x1, y1, u, alto, c, cs) => { if (u <= 0 || u >= 1) return; const x = Math.round(lerp(x0, x1, u)), y = Math.round(lerp(y0, y1, u) - Math.sin(u * Math.PI) * alto); R.rect(x, y, x + 1, y + 1, c); R.pset(x + 1, y + 1, cs); };
// humo o vapor que sube de (x, y)
const vapor = (x, y, t, c, n = 4, alto = 14) => { for (let k = 0; k < n; k++) { const u = (t * 0.45 + k / n) % 1, xx = Math.round(x + Math.sin(u * 5 + k * 2) * 2), yy = Math.round(y - u * alto); R.pset(xx, yy, c); if (u > 0.3 && u < 0.8) R.pset(xx + 1, yy, c); } };
// una caja con su contorno
const caja = (x0, y0, x1, y1, c, borde = K) => { R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, borde); R.rect(x0, y0, x1, y1, c); };
// madera con tablas y vetas; ladrillo con sus juntas
const madera = (x0, y0, x1, y1, c, cs, cL, k = 0, ancho = 12) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = Math.floor((y - y0) / ancho), v = hh((x + f * 37) >> 3, y, k); R.pset(x, y, (y - y0) % ancho === 0 ? cs : v < 0.16 ? cs : v > 0.86 ? cL : c); } };
const ladrillo = (x0, y0, x1, y1, c, cs, cL, junta, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = Math.floor(y / 5), xx = x + (f & 1) * 5, v = hh(Math.floor(xx / 10), f, k); R.pset(x, y, y % 5 === 0 || xx % 10 === 0 ? junta : v < 0.22 ? cs : v > 0.84 ? cL : c); } };
// un bocadillo blanco con el pico hacia (px, py)
const globo = (x0, y0, x1, y1, px, py) => { const mx = Math.max(x0 + 6, Math.min(x1 - 6, px));
  R.poligono([[mx - 5, y1], [mx + 5, y1], [px, py]], K);
  R.rect(x0 - 1, y0 + 1, x1 + 1, y1 - 1, K); R.rect(x0 + 1, y0 - 1, x1 - 1, y1 + 1, K); R.rect(x0, y0, x1, y1, BL); R.rect(x0 + 1, y1, x1 - 1, y1, hex('#d0c4a4'));
  R.poligono([[mx - 3, y1 - 1], [mx + 3, y1 - 1], [px, py - 2]], BL); };
// la caja de plástico transparente: tiñe lo de dentro y pinta los cantos y los brillos
const vitrina = (x0, y0, x1, y1, t) => { const I = hex('#bfe8f4'), E2 = hex('#ffffff'), i2 = hex('#6aa8c0');
  luz(x0, y0, x1, y1, I, () => 0.2);
  R.rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, K); R.rect(x0 - 1, y1 + 1, x1 + 1, y1 + 1, K); R.rect(x0 - 1, y0, x0 - 1, y1, K); R.rect(x1 + 1, y0, x1 + 1, y1, K);
  R.rect(x0, y0, x1, y0, I); R.rect(x0, y1, x1, y1, i2); R.rect(x0, y0, x0, y1, I); R.rect(x1, y0, x1, y1, i2); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, E2); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 3, E2);
  const g = Math.round(((t * 0.35) % 1) * (x1 - x0 + 30)) - 15; for (let d = 0; d < 3; d++) for (let j = 2; j < y1 - y0 - 1; j++) { const x = x0 + g + d * 3 - Math.round(j * 0.5); if (x > x0 + 1 && x < x1 - 1 && d !== 1) R.pset(x, y0 + j, mez(R.pget(x, y0 + j), E2, 0.55)); }
  R.pset(x1 - 2, y0 + 3, E2); R.pset(x1 - 3, y0 + 3, E2); R.pset(x1 - 2, y0 + 4, E2); };
// un coche familiar de 1981, genérico y sin marca, de perfil (x = la trasera, y = el suelo); dir 1 mira a la derecha.
// o.cristal: las ventanillas dejan ver lo de detrás; o.quieto: sin el temblor del motor; o.madera: el panel de los lados
const coche = (x, y, t, color, dir = 1, o = {}) => { const c = hex(color), cs = mez(c, K, 0.3), cL = mez(c, BL, 0.35), X = (i) => x + (dir > 0 ? i : 66 - i), bot = o.quieto ? 0 : Math.floor(t * 12) % 2, V = hex('#bfe0f0');
  const fila = (i0, i1, j0, j1, col) => R.rect(Math.min(X(i0), X(i1)), y - j1 - bot, Math.max(X(i0), X(i1)), y - j0 - bot, col);
  const vid = (i0, i1) => { if (!o.cristal) { fila(i0, i1, 17, 23, V); fila(i0, i0 + 2, 17, 23, hex('#e8f4fa')); return; } for (let j = 17; j <= 23; j++) for (let i = i0; i <= i1; i++) { const px = X(i), py = y - j - bot; R.pset(px, py, mez(R.pget(px, py), i - i0 < 3 ? hex('#e8f4fa') : V, 0.45)); } };
  for (let i = 4; i < 64; i++) if ((i + y) % 2) R.pset(X(i), y + 1, hex('#3a3a44'));
  fila(0, 66, 5, 16, K); fila(1, 65, 6, 15, c); fila(1, 65, 6, 8, cs); fila(1, 65, 14, 15, cL);
  fila(12, 50, 24, 26, K); fila(13, 49, 24, 25, c); fila(13, 49, 25, 25, cL); for (const i of [12, 13, 29, 30, 49, 50]) fila(i, i, 16, 24, i === 13 || i === 49 ? c : K); fila(13, 49, 16, 16, c);
  vid(15, 28); vid(31, 47);
  if (o.madera) { fila(5, 61, 9, 13, hex('#a8743e')); for (let i = 6; i < 61; i += 3) fila(i, i, 9, 13, hex('#7e5228')); fila(5, 61, 13, 13, hex('#c89454')); }
  fila(0, 1, 10, 13, hex('#e03a3a')); fila(65, 66, 10, 13, hex('#fff0a0')); fila(0, 2, 5, 7, hex('#b8bcc8')); fila(64, 66, 5, 7, hex('#b8bcc8')); fila(30, 30, 8, 15, cs); fila(34, 37, 14, 14, K);
  for (const i of [14, 52]) { R.disco(X(i), y - 4, 5, K); R.disco(X(i), y - 4, 3, hex('#5a5a66')); R.disco(X(i), y - 4, 1, hex('#c8ccd4')); R.pset(X(i) + (bot ? 2 : -2), y - 4, hex('#c8ccd4')); } };
'''

E['cf-cuento'] = ('El cuento y el premio', '''// CF-CUENTO (frases 6–7), el cuento del libro y, desde el plano 4, la vida real (1982). Siete planos (seis del
// registro y uno añadido: «a little ceramic box… and inside it was a key» no cabía en uno de 8,5 s):
// 1. B cuento/bosque: la puerta de las hadas se abre y un duende sale con una piedra que brilla; la Gente Bella pasea;
//    en «old world» suben las antorchas de los hombres («!»); al nombrarlos se encienden los duendes, las hadas y el
//    dragón, que echan a correr (o.huida);
// 2. B cuento/bosque/barco («fled from mankind»): el barco se aleja de la costa del Viejo Mundo, donde quedan las
//    antorchas; en «precious stones» las piedras suben del cofre de cubierta y brillan;
// 3. B cuento/orilla («Then they vanished»): desembarcan, desaparecen en una nubecilla de chispas y los doce cofrecitos
//    se hunden uno a uno en la arena (o.cofres 0→12) con la cuenta hasta 12;
// 4. LOCAL el taller de cerámica («In real life»): un brazo da la última pincelada azul al cofrecito sobre la torneta;
//    en «sealed inside a clear plastic case» lo empuja dentro de la caja transparente y cierra la tapa;
// 5. LOCAL el alféizar de una ventana de Nueva York («and inside it was a key»): el cofrecito abierto y la mano que
//    saca la llave, grande; en «ceramic» la llave tintinea;
// 6. LOCAL una casa de las afueras («If you found it»): el buscador sale con la llave, la mete en un sobre y lo deja en
//    su buzón (bandera arriba); el cartero se lo lleva y le trae un paquetito: la piedra y «$1000»;
// 7. A editorial/banco/caja («which he kept in a safe deposit box»): el empleado abre y Preiss va dejando las doce
//    piedras en sus huecos (o.piedras 0→12); deja la última y pide silencio con el dedo.''', AUX + r'''
const ha = (s) => en('hadas', (s - 0.5) / 13.216), ll = (s) => en('llave', (s - 15.016) / 18.038);
const P2 = ha(7.1), P3 = ha(11.05), P4 = ll(14.98), P5 = ll(20.1), P6 = ll(23.8), P7 = ll(30.02);
const ORO = hex('#ffd860'), OROL = hex('#fff4b8'), ROJO = hex('#e03a3a');
const GEMAS = ['#2eb872', '#62cce8', '#a8d430', '#e83a4a', '#b070f0', '#ffc030', '#3a6af0', '#ff8ac0', '#f4f4ff', '#ff8030', '#30d0c0', '#c03ac0'];

// ── 1 · el bosque del cuento ───────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const alarma = ha(4.5), corre = ease(tramo(t, ha(5.9), P2 + 0.6));
  const o = { encuadre: 'bosque', huida: (t * 4 + corre * 62) / 110, antorchas: lerp(0.1, 1, ease(tramo(t, ha(3.9), ha(6.2)))) };
  const g = T.cuento(R, t, o), cam = g.camino ?? (() => 152);
  // la puerta de las hadas se abre: una luz dorada en el tronco
  const ab = tramo(t, 0.3, 1.1) * (1 - tramo(t, ha(4.6), ha(5.4)));
  if (ab > 0) { halo(36, 134, 10 + ab * 10, ORO, 0.75 * ab); for (let k = 0; k < 5; k++) { const u = (t * 0.7 + k / 5) % 1; R.pset(Math.round(36 + Math.sin(k * 2 + t) * 5 + u * 10), Math.round(138 - u * 16), u < 0.5 ? OROL : ORO); } }
  // un duende sale con su piedra, se asusta con las antorchas y corre con los demás
  const sale = tramo(t, 0.9, ha(4.2)), dx = Math.round(lerp(42, 112, sale) + corre * 150), susto = t > alarma && t < ha(5.9);
  if (sale > 0 && dx < 300) { const dy = cam(dx) + (sale < 1 || corre > 0 ? (Math.floor(t * 7) % 2 ? -1 : 0) : 0), gy = dy - 22 - (susto ? 2 : 0);
    Z.duende(R, dx, dy, { t, dir: 1 }); halo(dx + 1, gy, 11, hex('#62f0a0'), 0.55); T.b_gema(R, dx + 1, gy, GEMAS[0], 1); if (Math.floor(t * 5) % 3 === 0) destello(dx - 3, gy - 4, 1, BL);
    if (susto) R.icono('!', dx + 8, gy - 14 - (Math.floor(t * 8) % 2), ROJO, K, 2); }
  // al nombrarlos: los duendes, las hadas y el dragón
  const cr = g.criaturas, nom = (a, b, lista, col) => { const u = tramo(t, a, a + 0.25) * (1 - tramo(t, b, b + 0.3)); if (u > 0) for (const p of lista) if (p) { halo(p[0], p[1] - 7, 19, col, 0.8 * u); destello(p[0] - 9, p[1] - 15, 1 + (Math.floor(t * 8) % 2), BL); destello(p[0] + 9, p[1] - 3, Math.floor(t * 8) % 2, BL); } };
  if (cr) { nom(ha(5.6), ha(6.4), cr.duendes ?? [], hex('#a0ff90')); nom(ha(6.4), ha(6.95), cr.hadas ?? [], hex('#ffb0e8')); nom(ha(6.95), P2 + 0.4, [cr.dragon], hex('#ffc860')); }
  T.cuentoDelante(R, t, o);
};

// ── 2 · el barco: huyen de los hombres con sus piedras ─────────────────────────────────────────────────────
const p2 = (t) => {
  const o = { encuadre: 'bosque', camara: 'barco', avance: lerp(0.15, 0.95, ease(tramo(t, P2 - 0.3, P3 + 0.4))), piedras: 12 };
  const g = T.cuento(R, t, o);
  // las antorchas de los hombres, que se quedan en la costa del Viejo Mundo
  for (let k = 0; k < 7; k++) { const x = 8 + k * 11 + Math.round(hh(k, 1, 5) * 4), y = 97 + Math.round(hh(k, 2, 5) * 4), f = Math.floor(t * 9 + k * 1.7) % 3; halo(x, y - 2, 6, hex('#ff9a30'), 0.5); R.rect(x, y, x, y + 2, hex('#3a2418')); R.pset(x, y - 1, hex('#ff8a20')); R.pset(x + (f === 1 ? 1 : 0), y - 2, f ? hex('#ffd060') : hex('#ff8a20')); if (f === 2) R.pset(x, y - 3, hex('#fff0a0')); }
  // el duende de la piedra, en cubierta, la levanta
  const sube = tramo(t, ha(9.9), ha(10.2)), sx = (g.x0 ?? 114) + 26, sy = g.suelo ?? 121;
  Z.duende(R, sx, sy, { t, dir: 1 }); halo(sx + 1, sy - 21 - sube * 5, 10, hex('#62f0a0'), 0.5); T.b_gema(R, sx + 1, sy - 21 - Math.round(sube * 5), GEMAS[0], 1);
  // «with their precious stones»: las piedras suben del cofre y brillan
  const [cx, cy] = g.cofre ?? [170, 118], u = tramo(t, ha(10.1), ha(10.9)), baja = tramo(t, P3 - 0.25, P3 + 0.3);
  if (u > 0) { halo(cx, cy - 12, 18 + u * 12, OROL, 0.55 * (1 - baja * 0.6));
    for (let k = 0; k < 6; k++) { const a = -Math.PI * (0.12 + k * 0.152), r = ease(Math.min(1, u * 1.3)) * (17 + (k % 2) * 8) * (1 - baja * 0.7), gx = Math.round(cx + Math.cos(a) * r * 1.5), gy = Math.round(cy - 9 + Math.sin(a) * r + Math.sin(t * 5 + k) * 1.5);
      halo(gx, gy, 10, hex(GEMAS[k * 2 + 1]), 0.7); T.b_gema(R, gx, gy, GEMAS[k * 2 + 1], 1); if ((Math.floor(t * 7) + k) % 3 === 0) destello(gx + 4, gy - 4, 1, BL); } }
  T.cuentoDelante(R, t, o);
};

// ── 3 · la orilla del Nuevo Mundo: desaparecen y esconden los doce ─────────────────────────────────────────
let orillaPos = null;
const p3 = (t) => {
  const van = ha(12.0), n = lerp(0, 12, tramo(t, ha(12.35), ha(13.75)));
  const o = { encuadre: 'orilla', llegada: (t * 4 + ease(tramo(t, P3 - 0.3, van)) * 46) / 120, cofres: n, criaturas: t < van };
  const g = T.cuento(R, t, o);
  if (g.criaturas) orillaPos = g.criaturas;
  if (!orillaPos) { const prev = R.usar(R.nuevo()); orillaPos = T.cuento(R, van - 0.02, { encuadre: 'orilla', llegada: ((van - 0.02) * 4 + 46) / 120, cofres: 0 }).criaturas ?? {}; R.usar(prev); }
  // «vanished»: una nubecilla de chispas donde estaba cada uno
  if (t >= van && orillaPos) { const u = (t - van) / 0.7; for (const p of [...(orillaPos.duendes ?? []), orillaPos.hada, orillaPos.dragon]) if (p) { if (u < 1) halo(p[0], p[1] - 7, 20 * (1 - u * 0.4), BL, 0.9 * (1 - u)); puf(p[0], p[1] - 7, u, 12, 18, OROL, BL); puf(p[0], p[1] - 7, u * 1.4, 7, 9, BL, OROL); } }
  // la cuenta: doce
  const k = Math.min(12, Math.floor(n + 0.001));
  if (n > 0) { const bx = 26, by = 150; caja(bx, by, bx + 43, by + 17, hex('#2a2244'), hex('#f0c040')); R.rect(bx + 1, by + 1, bx + 42, by + 1, hex('#4a3c70')); T.b_cofrecito(R, bx + 9, by + 13); R.numero(String(k), bx + 20, by + 14, { color: k >= 12 ? OROL : BL }); if (k >= 12 && Math.floor(t * 6) % 2) destello(bx + 40, by + 3, 2, BL); }
  T.cuentoDelante(R, t, o);
};

// ── 4 · el taller de cerámica: el cofrecito y su caja transparente ─────────────────────────────────────────
const C4 = pal({ w: '#e6d6b6', wS: '#d6c49e', wL: '#f0e4c8', az: '#f4f0e4', azS: '#c8d4dc', azA: '#4a78c0', mad: '#a8743e', madS: '#7e5228', madL: '#c89454', madD: '#4e3018', mesa: '#c49a62', mesaS: '#a67c48', mesaL: '#dcb47c',
  cielo: '#9ad0f0', cieloL: '#d4eefc', nubeL: '#ffffff', nube: '#e4f0f8', nubeS: '#b8cfe0', horno: '#8a8e9a', hornoS: '#5e626e', hornoL: '#b4b8c4', lad: '#b4583c', ladS: '#8e3e2a', ladL: '#cc7450', jun: '#6a3020',
  barro: '#c8784a', barroS: '#9a5632', barroL: '#e09a6a', crema: '#f0e6cc', cremaS: '#cdbd96', azul: '#3a6ac8', azulS: '#28488e', verde: '#4a9a5a', verdeS: '#2e6e40', metal: '#b8bcc8', metalS: '#7a7e8c', rojo: '#d84a3a', papel: '#f6f0e0', papelS: '#d8ccb0' });
const TOR = [112, 160], CAJ = [200, 116, 246, 162];
const taller = () => {
  // la pared de yeso con su zócalo de azulejos
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x >> 2, y >> 1, 1) < 0.12 ? C4.wS : hh(x, y, 2) < 0.05 ? C4.wL : C4.w);
  for (let y = 100; y < 126; y++) for (let x = 0; x < 320; x++) { const gx = x % 13, gy = (y - 100) % 13; R.pset(x, y, gx === 0 || gy === 0 ? C4.azS : (gx === 6 && gy === 6) || (gx === 5 && gy === 6) || (gx === 7 && gy === 6) || (gx === 6 && gy === 5) || (gx === 6 && gy === 7) ? (((x / 13) | 0) % 2 ? C4.azA : C4.verde) : hh(x, y, 3) < 0.06 ? C4.azS : C4.az); }
  R.rect(0, 98, 319, 99, C4.madS); R.rect(0, 97, 319, 97, C4.madD);
  // la ventana, a la izquierda, con su maceta
  caja(14, 24, 74, 88, C4.cielo, C4.madD); grad(14, 24, 74, 88, [C4.cielo, C4.cielo, C4.cieloL]); R.rect(14, 24, 74, 26, C4.mad); R.rect(14, 86, 74, 88, C4.mad); R.rect(14, 24, 16, 88, C4.mad); R.rect(72, 24, 74, 88, C4.mad); R.rect(43, 24, 45, 88, C4.mad); R.rect(14, 54, 74, 55, C4.mad);
  for (let x = 17; x < 72; x++) { if (x >= 43 && x <= 45) continue; const hgt = 6 + Math.floor(hh(x >> 3, 1, 4) * 14); for (let y = 85 - hgt; y <= 85; y++) if (y !== 54 && y !== 55) R.pset(x, y, hh(x, y, 5) < 0.12 ? C4.cieloL : hex('#7aa0c4')); }
  R.rect(10, 89, 78, 91, C4.madL); R.rect(10, 92, 78, 92, C4.madD);
  caja(24, 80, 34, 88, C4.barro); R.rect(24, 80, 34, 81, C4.barroL); for (const [i, j] of [[-3, -5], [0, -8], [3, -6], [-1, -3], [2, -3], [5, -9]]) { R.rect(29 + i, 79 + j, 30 + i, 80 + j, C4.verde); R.pset(29 + i, 79 + j, C4.verdeS); }
  // las baldas con las piezas: los otros once cofrecitos, sin esmaltar unos y pintados otros
  for (const [y, n, x0] of [[38, 6, 96], [70, 5, 104]]) { R.rect(88, y + 1, 204, y + 3, C4.mad); R.rect(88, y + 1, 204, y + 1, C4.madL); R.rect(88, y + 4, 204, y + 4, C4.madD); R.rect(92, y + 5, 93, y + 9, C4.madD); R.rect(199, y + 5, 200, y + 9, C4.madD);
    for (let x = 90; x < 204; x++) if (hh(x, y, 6) < 0.5) R.pset(x, y + 6, C4.wS);
    for (let k = 0; k < n; k++) Z.cofre(R, x0 + k * 19, y, { sinCaja: true }); }
  for (const [x, c, cs] of [[196, C4.azul, C4.azulS], [188, C4.barro, C4.barroS]]) { caja(x - 3, 60, x + 3, 69, c); R.rect(x - 3, 60, x - 3, 69, cs); R.rect(x - 1, 57, x + 1, 59, K); R.rect(x, 58, x, 59, c); }
  // el reloj de pared
  R.disco(222, 30, 10, K); R.disco(222, 30, 9, C4.papel); R.disco(222, 30, 8, BL); for (let k = 0; k < 12; k++) R.pset(Math.round(222 + Math.cos(k * Math.PI / 6) * 7), Math.round(30 + Math.sin(k * Math.PI / 6) * 7), K);
  // el horno, a la derecha, con su tubo
  caja(240, 0, 248, 52, C4.horno); R.rect(240, 0, 241, 52, C4.hornoL); R.rect(247, 0, 248, 52, C4.hornoS); for (const y of [14, 34]) R.rect(239, y, 249, y + 1, C4.hornoS);
  caja(226, 52, 308, 124, C4.lad); ladrillo(226, 52, 308, 124, C4.lad, C4.ladS, C4.ladL, C4.jun, 7);
  caja(226, 52, 308, 58, C4.horno); R.rect(226, 52, 308, 53, C4.hornoL);
  caja(242, 66, 292, 112, C4.hornoS); R.rect(242, 66, 292, 67, C4.hornoL); R.rect(244, 68, 290, 110, C4.horno); for (const [x, y] of [[246, 70], [288, 70], [246, 108], [288, 108]]) R.pset(x, y, C4.hornoL);
  caja(256, 78, 278, 92, K); R.rect(294, 84, 297, 94, K); R.rect(295, 85, 296, 93, C4.metal);
  caja(230, 114, 240, 120, K); R.pset(233, 117, C4.rojo); R.pset(237, 117, C4.verde);
  // el tablero de herramientas
  caja(206, 46, 220, 92, C4.madL, C4.madD); for (let y = 49; y < 92; y += 4) for (let x = 208; x < 220; x += 4) R.pset(x, y, C4.madS);
  R.rect(209, 50, 209, 66, C4.metal); R.rect(208, 66, 210, 72, C4.mad); R.rect(214, 52, 214, 60, C4.madD); R.rect(213, 60, 215, 68, C4.metal); R.rect(217, 50, 218, 51, C4.metalS); R.rect(217, 52, 217, 74, C4.madS); R.rect(210, 78, 216, 79, C4.metal); R.rect(212, 80, 214, 88, C4.rojo);
  // la mesa de trabajo, vista un poco desde arriba
  madera(0, 126, 319, 179, C4.mesa, C4.mesaS, C4.mesaL, 8, 14); R.rect(0, 126, 319, 126, C4.madD); R.rect(0, 127, 319, 127, C4.mesaL);
  for (let k = 0; k < 40; k++) { const x = Math.floor(hh(k, 1, 9) * 320), y = 130 + Math.floor(hh(k, 2, 9) * 48); R.pset(x, y, k % 3 ? C4.crema : C4.azul); if (k % 4 === 0) R.pset(x + 1, y, C4.cremaS); }
  // los botes de esmalte con sus pinceles, la esponja y el trapo
  [[22, C4.azul, C4.azulS], [40, C4.crema, C4.cremaS], [58, C4.verde, C4.verdeS]].forEach(([x, c, cs], k) => { caja(x - 6, 140, x + 6, 156, C4.metal); R.rect(x - 6, 140, x - 5, 156, BL); R.rect(x + 5, 140, x + 6, 156, C4.metalS); R.rect(x - 6, 146, x + 6, 151, c); R.rect(x + 3, 146, x + 6, 151, cs); R.rect(x - 5, 139, x + 5, 139, c);
    R.linea(x - 2 + k, 139, x - 6 + k * 3, 120, C4.madD); R.linea(x - 1 + k, 139, x - 5 + k * 3, 120, C4.madL); R.rect(x - 7 + k * 3, 116, x - 5 + k * 3, 120, c); });
  caja(70, 166, 88, 174, hex('#e8c84a')); for (let k = 0; k < 9; k++) R.pset(72 + (k * 5) % 16, 168 + (k * 3) % 6, hex('#b8962a'));
  R.poligono([[14, 166], [48, 162], [56, 174], [20, 178]], K); R.poligono([[15, 167], [47, 163], [54, 173], [21, 177]], C4.azS); for (let k = 0; k < 6; k++) R.linea(18 + k * 6, 168 + (k % 2), 22 + k * 6, 175 - (k % 2), C4.azA);
  // el boceto del cofrecito, la regla y la taza
  R.poligono([[258, 138], [308, 142], [302, 176], [252, 172]], K); R.poligono([[259, 139], [307, 143], [301, 175], [253, 171]], C4.papel);
  caja(272, 150, 286, 162, C4.papel, C4.azulS); R.rect(272, 150, 286, 152, C4.azulS); R.rect(278, 147, 280, 149, C4.azulS); for (const y of [146, 166, 169]) R.rect(262, y, 262 + ((y * 7) % 20) + 14, y, C4.papelS); R.linea(290, 148, 290, 164, C4.rojo); R.pset(289, 149, C4.rojo); R.pset(291, 149, C4.rojo); R.pset(289, 163, C4.rojo); R.pset(291, 163, C4.rojo);
  caja(150, 132, 166, 146, BL); R.rect(163, 132, 166, 146, C4.papelS); R.rect(152, 133, 162, 134, hex('#6a4028')); R.rect(167, 136, 170, 142, K); R.rect(167, 138, 168, 140, C4.mesa); R.rect(150, 140, 166, 141, C4.azA);
  // la torneta: el plato giratorio donde se pinta
  for (let j = -5; j <= 5; j++) for (let i = -26; i <= 26; i++) { const e = (i / 26) ** 2 + (j / 5) ** 2; if (e <= 1) R.pset(TOR[0] + i, TOR[1] + 2 + j, e > 0.8 ? K : j > 2 ? C4.metalS : C4.metal); }
  for (let i = -24; i <= 24; i++) R.pset(TOR[0] + i, TOR[1] + 8 + Math.round(2 * (1 - (i / 26) ** 2)), K); R.rect(TOR[0] - 8, TOR[1] + 7, TOR[0] + 8, TOR[1] + 13, C4.metalS); R.rect(TOR[0] - 9, TOR[1] + 14, TOR[0] + 9, TOR[1] + 14, K);
  // la sombra de la caja transparente en la mesa
  for (let x = CAJ[0] - 2; x <= CAJ[2] + 8; x++) for (let y = CAJ[3] + 1; y <= CAJ[3] + 4; y++) if ((x + y) % 2) R.pset(x, y, C4.mesaS);
};
const p4 = (t) => {
  fondo('taller', taller);
  // vida: las nubes de la ventana, el segundero, el horno que arde y el vapor de la taza
  R.recorte([17, 27, 42, 53]); nube(((t * 3) % 50) + 6, 44, 18, [C4.nubeL, C4.nube, C4.nubeS]); R.recorte([46, 27, 71, 53]); nube(((t * 3) % 50) + 26, 40, 16, [C4.nubeL, C4.nube, C4.nubeS]); pajaro(48 + ((t * 9) % 30), 34 + Math.sin(t * 2) * 2, t, 1, K); R.recorte(null);
  R.linea(222, 30, Math.round(222 + Math.cos(t * 1.05 - 1.57) * 6), Math.round(30 + Math.sin(t * 1.05 - 1.57) * 6), ROJO); R.linea(222, 30, 222, 25, K); R.linea(222, 30, 226, 31, K);
  for (let y = 79; y <= 91; y++) for (let x = 257; x <= 277; x++) { const f = hh(x >> 1, (y + Math.floor(t * 9)) >> 1, 11) + (y - 79) / 26 + Math.sin(t * 5 + x * 0.4) * 0.15; R.pset(x, y, f > 1.05 ? hex('#fff0a0') : f > 0.75 ? hex('#ffb030') : f > 0.45 ? hex('#f06a20') : hex('#a83018')); }
  halo(267, 85, 26, hex('#ff9a30'), 0.25 + 0.06 * Math.sin(t * 7)); vapor(245, -2, t, C4.hornoL, 0, 0); vapor(158, 131, t, BL, 4, 12);
  for (let k = 0; k < 8; k++) { const u = (t * 0.1 + hh(k, 1, 12)) % 1, x = Math.round(20 + hh(k, 2, 12) * 80 + u * 20), y = Math.round(94 + u * 40); if (Math.sin(t * 2 + k) > 0.2) R.pset(x, y, C4.wL); }
  // el cofrecito: primero en la torneta, luego empujado dentro de su caja
  const emp = ease(tramo(t, ll(17.75), ll(18.95))), cx = Math.round(lerp(TOR[0], 223, emp)), cy = TOR[1] - 1;
  const cierra = ease(tramo(t, ll(19.1), ll(19.45))), gira = emp === 0 && t < ll(16.6);
  // la torneta gira mientras se pinta
  for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + (gira ? t * 2.2 : 3.3), x = Math.round(TOR[0] + Math.cos(a) * 22), y = Math.round(TOR[1] + 2 + Math.sin(a) * 4); if (Math.sin(a) > -0.2) R.pset(x, y, C4.hornoS); }
  if (emp > 0 && emp < 1) for (let k = 0; k < 4; k++) R.pset(cx - 18 - k * 5, cy + 1, C4.mesaS);
  Z.cofre(R, cx, cy, { sinCaja: true, s: 3 });
  // la última pincelada azul («a little ceramic box»)
  const pinta = t < ll(16.75), sal = tramo(t, ll(16.55), ll(17.0));
  if (pinta || sal < 1) { const by = 146 + Math.round(Math.sin(t * 6) * 3) + Math.round(sal * 44), bx = 138 + Math.round(Math.cos(t * 6) * 2) + Math.round(sal * 10);
    R.linea(bx - 10, by + 1, bx - 20, by - 5, C4.madD); R.linea(bx - 10, by, bx - 20, by - 6, C4.madL); R.rect(bx - 23, by - 8, bx - 21, by - 6, C4.azul); R.pset(bx - 24, by - 8, C4.azulS);
    T.brazo(R, bx + 22, 186, bx, by, '#6a8a9c', -1, { codo: [bx + 20, by + 22] });
    if (pinta && Math.floor(t * 4) % 2) destello(cx - 6, cy - 22, 1, BL); }
  if (t > ll(16.0) && t < ll(17.5)) { const u = ((t - ll(16.0)) * 1.4) % 1; destello(cx + 9, cy - 28, u < 0.5 ? 2 : 1, BL); }
  // la caja transparente y su tapa de bisagra (a la izquierda)
  const [x0, y0, x1, y1] = CAJ; vitrina(x0, y0, x1, y1, t);
  { const L = y1 - y0, by = Math.round(lerp(y0 - 2, y1, cierra)); for (let y = by - L; y <= by; y++) { R.pset(x0 - 2, y, K); R.pset(x0 - 1, y, mez(R.pget(x0 - 1, y), hex('#bfe8f4'), 0.8)); R.pset(x0, y, hex('#ffffff')); R.pset(x0 + 1, y, K); }
    R.rect(x0 - 2, by - L - 1, x0 + 1, by - L - 1, K); R.rect(x0 - 3, by - L + 4, x0 - 3, by - L + 9, C4.metalS); if (cierra < 1) R.rect(x0 - 2, by + 1, x0 + 1, by + 1, K); }
  // el brazo que empuja y luego aprieta la tapa
  const e0 = ll(17.35), fin = tramo(t, ll(19.75), ll(20.1));
  if (t > e0) { const ent = ease(tramo(t, e0, ll(17.75))), ap = tramo(t, ll(19.0), ll(19.2));
    const wx = Math.round(lerp(cx - 30, 176, ap)), wy = Math.round(lerp(196, 148, ent) - ap * 8 + (cierra >= 1 ? Math.sin(Math.min(1, (t - ll(19.45)) * 4) * Math.PI) * -3 : 0) + fin * 50);
    T.brazo(R, wx - 16, 186 + Math.round(fin * 30), wx, wy, '#6a8a9c', 1, { codo: [wx - 20, wy + 22] }); }
  if (cierra >= 1) { const u = (t - ll(19.45)) / 0.5; if (u < 1) { halo(223, 138, 30, BL, 0.5 * (1 - u)); destello(x1 - 4, y0 + 4, 3, BL); destello(x0 + 6, y1 - 8, 2, BL); } else if (Math.floor(t * 3) % 2) destello(x1 - 5, y0 + 5, 1, BL); }
};
''' + r'''
// ── 5 · el alféizar: dentro, la llave ──────────────────────────────────────────────────────────────────────
const C5 = pal({ lad: '#a85a44', ladS: '#88402e', ladL: '#c07258', jun: '#5e2c20', marco: '#e8e0cc', marcoS: '#b8ac90', marcoD: '#6a6050', c0: '#6ab4e8', c1: '#9ad0f0', c2: '#c8e8f8', c3: '#f0f4e8', nubeL: '#ffffff', nube: '#e8f2f8', nubeS: '#b4cce0',
  e0: '#8a9ab8', e1: '#7486a8', e2: '#5e7094', e3: '#a8b4c8', vent: '#d8e4f0', ventO: '#f8d880', dep: '#6a4a3a', depS: '#4a3228', alf: '#c8a070', alfS: '#a07c4c', alfL: '#e0bc8c', alfD: '#5a3c20', cort: '#d8b04a', cortS: '#b08a2e', cortL: '#f0d070',
  barro: '#c8784a', barroS: '#9a5632', barroL: '#e09a6a', verde: '#4a9a5a', verdeS: '#2e6e40', verdeL: '#7ac070', papel: '#f6f0e0', papelS: '#d8ccb0', azul: '#3a6ac8', rojo: '#d84a3a', tela: '#7a3048', telaS: '#5a2034', telaL: '#9a4a60' });
const VEN = [40, 18, 236, 120];
const alfeizar = () => {
  ladrillo(0, 0, 319, 130, C5.lad, C5.ladS, C5.ladL, C5.jun, 21);
  // esquina tranquila para Atom: un paño de yeso liso arriba a la derecha
  for (let y = 0; y < 52; y++) for (let x = 262; x < 320; x++) R.pset(x, y, hh(x >> 2, y >> 2, 22) < 0.1 ? hex('#d8c8a8') : hex('#e0d2b4')); R.rect(261, 0, 261, 52, C5.jun); R.rect(261, 52, 319, 53, C5.jun);
  for (let y = 0; y < 15; y++) for (let x = 0; x < 262; x++) R.pset(x, y, hh(x >> 2, y >> 2, 22) < 0.1 ? hex('#d8c8a8') : hex('#e0d2b4')); R.rect(0, 15, 261, 16, C5.jun);
  // el marco y el cielo de Manhattan
  const [x0, y0, x1, y1] = VEN; caja(x0 - 5, y0 - 5, x1 + 5, y1 + 2, C5.marco, C5.marcoD); R.rect(x0 - 5, y0 - 5, x1 + 5, y0 - 4, BL); R.rect(x1 + 3, y0 - 5, x1 + 5, y1 + 2, C5.marcoS);
  grad(x0, y0, x1, y1, [C5.c0, C5.c0, C5.c1, C5.c2, C5.c3]);
  // los edificios de enfrente, con sus depósitos de agua
  for (let k = 0; k < 13; k++) { const bx = x0 + k * 16 - 4 + Math.floor(hh(k, 1, 23) * 6), w = 12 + Math.floor(hh(k, 2, 23) * 9), top = 58 + Math.floor(hh(k, 3, 23) * 34), c = [C5.e0, C5.e1, C5.e2][k % 3];
    for (let y = top; y <= y1; y++) for (let x = Math.max(x0, bx); x <= Math.min(x1, bx + w); x++) R.pset(x, y, x === bx ? C5.e3 : (y - top) % 6 > 2 && (x - bx) % 4 > 1 ? (hh(x >> 1, y >> 1, 24) < 0.18 ? C5.ventO : C5.vent) : c);
    if (hh(k, 4, 23) > 0.45 && bx > x0 + 4 && bx + 10 < x1) { R.rect(bx + 3, top - 9, bx + 9, top - 3, C5.dep); R.rect(bx + 3, top - 9, bx + 4, top - 3, C5.depS); R.poligono([[bx + 2, top - 9], [bx + 6, top - 13], [bx + 10, top - 9]], C5.depS); R.rect(bx + 3, top - 2, bx + 3, top, C5.depS); R.rect(bx + 9, top - 2, bx + 9, top, C5.depS); } }
  // los travesaños
  R.rect(x0, 66, x1, 68, C5.marco); R.rect(x0, 69, x1, 69, C5.marcoS); R.rect(137, y0, 139, y1, C5.marco); R.rect(140, y0, 140, y1, C5.marcoS);
  // las cortinas recogidas
  for (const [a, b, d] of [[x0 - 4, x0 + 16, 1], [x1 - 16, x1 + 4, -1]]) for (let y = y0 - 3; y <= y1; y++) { const w = Math.round(20 - 9 * Math.sin((y - y0) / (y1 - y0) * Math.PI * 0.9)); for (let i = 0; i < w; i++) { const x = d > 0 ? a + i : b - i; R.pset(x, y, i === w - 1 ? K : (i + (y >> 3)) % 5 === 0 ? C5.cortS : (i + (y >> 3)) % 5 === 2 ? C5.cortL : C5.cort); } }
  caja(x0 - 8, y0 - 9, x1 + 8, y0 - 7, C5.alfD);
  Z.cuadro(R, 290, 100, { n: 1 }); R.rect(289, 73, 291, 75, K); R.linea(290, 73, 284, 76, K); R.linea(290, 73, 296, 76, K);
  // el alféizar ancho de madera
  madera(0, 131, 319, 179, C5.alf, C5.alfS, C5.alfL, 25, 16); R.rect(0, 129, 319, 130, C5.alfD); R.rect(0, 131, 319, 132, C5.alfL);
  // el paño de terciopelo donde se abre el cofre
  R.poligono([[52, 146], [246, 142], [262, 176], [40, 178]], K); R.poligono([[54, 147], [245, 143], [259, 175], [42, 177]], C5.tela); for (let y = 144; y < 178; y++) for (let x = 42; x < 260; x++) if (R.pget(x, y) === C5.tela) R.pset(x, y, hh(x >> 1, y, 26) < 0.14 ? C5.telaS : hh(x, y >> 1, 27) < 0.08 ? C5.telaL : C5.tela);
  // la maceta con su geranio, los libros y la lupa
  caja(276, 140, 300, 162, C5.barro); R.rect(276, 140, 300, 143, C5.barroL); R.rect(296, 144, 300, 162, C5.barroS); caja(273, 137, 303, 140, C5.barroL);
  for (const [i, j, c] of [[-8, -10, C5.verde], [0, -16, C5.verdeL], [8, -11, C5.verde], [-4, -20, C5.verdeS], [5, -22, C5.verde], [-10, -18, C5.verdeL]]) { R.disco(288 + i, 138 + j, 4, K); R.disco(288 + i, 138 + j, 3, c); }
  for (const [i, j] of [[-6, -26], [3, -29], [10, -20]]) { R.disco(288 + i, 138 + j, 3, K); R.disco(288 + i, 138 + j, 2, C5.rojo); R.pset(288 + i - 1, 137 + j, hex('#ff8a7a')); }
  [[C5.azul, 8], [C5.rojo, 5], [C5.verde, 7]].forEach(([c, hgt], k) => { const y = 170 - k * 9; caja(4 + k * 2, y - hgt, 34 - k, y, c); R.rect(4 + k * 2, y - 1, 34 - k, y, C5.papel); R.rect(8 + k * 2, y - hgt + 2, 12 + k * 2, y - 3, C5.cortL); });
  R.disco(20, 136, 8, K); R.disco(20, 136, 6, hex('#c8e8f8')); R.disco(18, 134, 2, BL); R.linea(26, 141, 36, 147, K); R.linea(26, 142, 36, 148, C5.alfD);
};
const p5 = (t) => {
  fondo('alfeizar', alfeizar);
  const [x0, y0, x1, y1] = VEN;
  // vida: nubes de tres tonos a tres velocidades, palomas, humo de una chimenea, la cortina que se mece
  R.recorte([x0 + 17, y0, 136, 65]); nube(((t * 5 + 30) % 150) + 30, 40, 34, [C5.nubeL, C5.nube, C5.nubeS]); nube(((t * 3 + 90) % 150) + 30, 54, 22, [C5.nubeL, C5.nube, C5.nubeS]);
  R.recorte([141, y0, x1 - 17, 65]); nube(((t * 5 + 30) % 150) + 30, 40, 34, [C5.nubeL, C5.nube, C5.nubeS]); nube(((t * 7 + 60) % 150) + 110, 30, 26, [C5.nubeL, C5.nube, C5.nubeS]);
  for (let k = 0; k < 4; k++) pajaro(150 + ((t * 14 + k * 9) % 80), 36 + k * 4 + Math.sin(t * 2 + k) * 3, t, k, C5.marcoD);
  R.recorte([x0 + 17, 70, 136, y1]); vapor(96, 76, t, C5.nubeL, 5, 16); R.recorte(null);
  { const px = 170 + Math.round(Math.sin(t * 0.8) * 8), cab = Math.floor(t * 3) % 2; R.rect(px - 4, 116, px + 3, 120, hex('#7a7e8c')); R.rect(px + 3, 114 - cab, px + 5, 116 - cab, hex('#5a5e6c')); R.pset(px + 6, 115 - cab, hex('#e8a030')); R.rect(px - 6, 117, px - 5, 118, hex('#5a5e6c')); R.pset(px + 4, 114 - cab, K); }
  // el cofrecito abierto sobre el paño y, al lado, su caja transparente
  vitrina(58, 132, 92, 166, t);
  const CX = 126, CY = 168; Z.cofre(R, CX, CY, { sinCaja: true, abierto: true, s: 3 });
  // la mano saca la llave («inside it was a key»)
  const saca = ease(tramo(t, ll(20.5), ll(21.6))), ent = ease(tramo(t, P5 - 0.1, ll(20.5))), kx = Math.round(lerp(CX + 6, 186, saca)), ky = Math.round(lerp(CY - 30, 150, saca) - Math.sin(saca * Math.PI) * 14);
  const son = t > ll(22.8) ? Math.sin(Math.min(1, (t - ll(22.8)) * 3) * Math.PI) : 0, wx = kx + 20, wy = Math.round(ky - 9 + (1 - ent) * 60 - son * 3);
  if (saca > 0.05) { halo(kx, ky - 12, 30, OROL, 0.5 + 0.1 * Math.sin(t * 4)); Z.llave(R, kx, ky - Math.round(son * 3), { s: 3 });
    const br = ((t - ll(21.6)) * 0.9) % 1; if (saca >= 1) { destello(kx - 16 + Math.round(br * 32), ky - 22 + Math.round(br * 6), br < 0.5 ? 2 : 1, BL); }
    // «also made of ceramic»: tintinea
    if (t > ll(22.8)) for (let k = 0; k < 3; k++) { const u = ((t - ll(22.8)) * 1.8 + k * 0.33) % 1, r = 20 + u * 12; for (let a = -1.0; a <= -0.3; a += 0.12) R.pset(Math.round(kx - 4 + Math.cos(a - 1.2) * r), Math.round(ky - 14 + Math.sin(a - 1.2) * r), u < 0.7 ? OROL : ORO); } }
  T.brazo(R, wx + 24, 186, wx, wy, '#5e6a44', -1, { codo: [wx + 26, wy + 24] });
};

// ── 6 · el buzón de casa: la llave va por correo y vuelve una piedra ───────────────────────────────────────
const C6 = pal({ c0: '#5aa8e4', c1: '#86c4ee', c2: '#b8e0f6', c3: '#e4f2f4', nubeL: '#ffffff', nube: '#e8f2f8', nubeS: '#b4cce0', casa: '#f0e4c4', casaS: '#d4c49c', casaL: '#fbf4dc', tej: '#8a4a3a', tejS: '#6a3428', tejL: '#a8624c', casa2: '#9ab8d0', casa2S: '#7a98b4', tej2: '#4a5a6a', tej2S: '#364452',
  mad: '#f6f2ea', madS: '#c8c0b0', puerta: '#b03a34', puertaS: '#84282a', vid: '#bfe0f0', vidS: '#8ab8d4', ces: '#5aa84a', cesS: '#3e8a3e', cesL: '#86c85a', cesD: '#2e6e38', ac: '#cfc8b8', acS: '#aaa290', acL: '#e4dece', asf: '#5a5a66', asfS: '#484854', asfL: '#70707c', raya: '#f0d860',
  tr: '#6a4630', trS: '#4a3020', h0: '#e87a2a', h1: '#f0a030', h2: '#c8502a', h3: '#f8c84a', buz: '#8aa0b8', buzS: '#5e7490', buzL: '#c4d4e4', seto: '#3e7a44', setoS: '#2a5a34', setoL: '#5a9a54' });
const BUZ = [184, 150];
const afueras = () => {
  grad(0, 0, 319, 100, [C6.c0, C6.c0, C6.c1, C6.c2, C6.c3]);
  for (let y = 96; y < 114; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 96 ? C6.setoL : hh(x, y, 29) < 0.22 ? C6.setoS : hh(x, y, 28) < 0.1 ? C6.setoL : C6.seto);
  // los árboles de otoño del fondo y la casa del vecino
  for (let k = 0; k < 9; k++) { const x = 150 + k * 22 + Math.floor(hh(k, 1, 30) * 8), y = 78 + Math.floor(hh(k, 2, 30) * 10), r = 13 + Math.floor(hh(k, 3, 30) * 6); if (x > 262 && y - r < 50) continue; R.rect(x - 1, y, x + 1, y + 28, C6.trS); for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j * 1.15); if (d <= r) R.pset(x + i, y + j, d > r - 1 ? C6.h2 : hh(x + i, y + j, 31) < 0.2 ? C6.h3 : (i + j < -3) ? C6.h1 : hh((x + i) >> 1, (y + j) >> 1, 32) < 0.3 ? C6.h2 : C6.h0); } }
  caja(206, 74, 306, 112, C6.casa2); for (let y = 74; y <= 112; y++) for (let x = 206; x <= 306; x++) if ((y - 74) % 4 === 3) R.pset(x, y, C6.casa2S);
  R.poligono([[200, 75], [256, 52], [312, 75]], K); R.poligono([[203, 74], [256, 54], [309, 74]], C6.tej2); for (let y = 56; y < 74; y += 3) for (let x = 204; x < 310; x++) if (R.pget(x, y) === C6.tej2 && (x + y) % 5) R.pset(x, y, C6.tej2S);
  R.rect(200, 73, 312, 75, C6.tej2S); R.rect(200, 76, 312, 76, K);
  caja(216, 84, 236, 100, C6.vid, C6.mad); R.rect(226, 84, 226, 100, C6.mad); R.rect(216, 92, 236, 92, C6.mad); caja(250, 82, 296, 112, C6.mad, C6.casa2S); for (let y = 86; y < 112; y += 6) R.rect(250, y, 296, y, C6.madS); R.rect(270, 106, 276, 107, C6.tej2);
  // la casa: tablas, tejado, porche, puerta roja y ventana
  caja(8, 52, 134, 112, C6.casa); for (let y = 52; y <= 112; y++) for (let x = 8; x <= 134; x++) R.pset(x, y, (y - 52) % 4 === 3 ? C6.casaS : hh(x >> 3, y, 33) < 0.08 ? C6.casaL : C6.casa);
  R.poligono([[0, 54], [70, 14], [142, 54]], K); R.poligono([[4, 53], [70, 17], [138, 53]], C6.tej); R.rect(1, 54, 141, 55, C6.tejS); R.rect(1, 56, 141, 56, K); for (let y = 18; y < 54; y++) for (let x = 4; x < 139; x++) if (R.pget(x, y) === C6.tej) R.pset(x, y, y % 4 === 0 ? C6.tejS : (x + (y >> 2) * 3) % 7 === 0 ? C6.tejS : hh(x, y, 34) < 0.08 ? C6.tejL : C6.tej);
  caja(98, 20, 108, 40, C6.tejS); R.rect(96, 18, 110, 21, C6.tejS); R.rect(96, 18, 110, 18, K);
  R.disco(70, 40, 6, K); R.disco(70, 40, 5, C6.vid); R.rect(70, 35, 70, 45, C6.mad); R.rect(65, 40, 75, 40, C6.mad);
  caja(20, 66, 58, 96, C6.vid, C6.mad); R.rect(20, 66, 58, 67, C6.mad); R.rect(39, 66, 39, 96, C6.mad); R.rect(20, 81, 58, 81, C6.mad); for (const x of [14, 60]) { caja(x, 64, x + 4, 98, C6.puerta); for (let y = 67; y < 98; y += 4) R.rect(x, y, x + 4, y, C6.puertaS); }
  for (let x = 21; x <= 38; x++) for (let y = 68; y <= 80; y++) if (x - 21 + (y - 68) < 10 || (x > 30 && y < 72)) R.pset(x, y, hex('#f4e0a0'));
  caja(18, 98, 60, 101, C6.mad); for (let x = 22; x < 58; x += 5) { R.rect(x, 96, x + 2, 98, [C6.puerta, C6.h3, hex('#e86aa0')][(x >> 2) % 3]); R.pset(x + 1, 95, C6.cesL); }
  // el porche con su tejadillo y la puerta
  R.poligono([[76, 68], [124, 68], [128, 76], [72, 76]], K); R.poligono([[77, 69], [123, 69], [126, 75], [74, 75]], C6.tej); caja(78, 77, 80, 111, C6.mad); caja(120, 77, 122, 111, C6.mad);
  caja(90, 80, 110, 111, C6.puerta); R.rect(90, 80, 91, 111, hex('#d05a4c')); R.rect(108, 80, 110, 111, C6.puertaS); caja(94, 84, 106, 92, C6.vid, C6.puertaS); R.pset(106, 98, C6.raya); R.pset(107, 98, C6.raya);
  R.numero('42', 112, 90, { color: K, sombra: false }); R.rect(74, 112, 126, 114, C6.acS); R.rect(74, 115, 126, 117, C6.ac); R.rect(74, 115, 126, 115, C6.acL);
  // el césped con hojas caídas y el camino de losas
  for (let y = 113; y < 142; y++) for (let x = 0; x < 320; x++) { if (y < 118 && x > 73 && x < 127) continue; const f = Math.floor((x + (y - 113) * 2) / 26) & 1; R.pset(x, y, hh(x, y, 35) < 0.05 ? C6.cesL : hh(x >> 1, y, 36) < 0.1 ? C6.cesD : f ? C6.cesS : C6.ces); }
  for (let k = 0; k < 70; k++) { const x = Math.floor(hh(k, 1, 37) * 320), y = 114 + Math.floor(hh(k, 2, 37) * 27); if (x > 84 && x < 118) continue; R.pset(x, y, [C6.h0, C6.h1, C6.h2, C6.h3][k % 4]); if (k % 3 === 0) R.pset(x + 1, y, C6.h2); }
  for (let y = 118; y < 142; y++) { const w = 12 + Math.round((y - 118) * 0.35); for (let x = 100 - w; x <= 100 + w; x++) R.pset(x, y, (y - 118) % 8 === 7 ? C6.acS : hh(x >> 2, y >> 2, 38) < 0.2 ? C6.acL : C6.ac); R.pset(100 - w - 1, y, C6.cesD); R.pset(100 + w + 1, y, C6.cesD); }
  // el seto, la valla blanca y un montón de hojas con su rastrillo
  for (let x = 134; x < 204; x++) { const top = 100 + Math.round(Math.sin(x * 0.4) * 1.2); for (let y = top; y <= 114; y++) R.pset(x, y, y === top ? C6.setoL : hh(x, y, 39) < 0.2 ? C6.setoS : hh(x, y, 40) < 0.12 ? C6.setoL : C6.seto); }
  for (let x = 2; x < 76; x += 7) { caja(x, 104, x + 3, 122, C6.mad, C6.madS); R.pset(x + 1, 103, C6.mad); R.pset(x + 2, 103, C6.mad); } R.rect(0, 109, 76, 110, C6.mad); R.rect(0, 117, 76, 118, C6.mad); R.rect(0, 111, 76, 111, C6.madS); R.rect(0, 119, 76, 119, C6.madS);
  for (let j = 0; j < 9; j++) for (let i = -14 + j; i <= 14 - j; i++) R.pset(256 + i, 138 - j, [C6.h0, C6.h1, C6.h2, C6.h3][Math.floor(hh(i, j, 41) * 4)]); R.linea(276, 138, 268, 112, C6.trS); R.linea(277, 138, 269, 112, C6.tr); R.rect(272, 136, 284, 137, C6.trS); for (let x = 272; x <= 284; x += 2) R.pset(x, 138, C6.trS);
  // la acera, el bordillo y la calzada
  for (let y = 142; y < 158; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 142 ? C6.acL : (x + (y - 142)) % 34 === 0 ? C6.acS : hh(x >> 1, y >> 1, 42) < 0.12 ? C6.acS : hh(x, y, 43) < 0.05 ? C6.acL : C6.ac);
  R.rect(0, 158, 319, 159, C6.acL); R.rect(0, 160, 319, 161, C6.acS);
  for (let y = 162; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x >> 2, y >> 1, 44) < 0.16 ? C6.asfS : hh(x, y, 45) < 0.07 ? C6.asfL : C6.asf);
  for (let x = 6; x < 320; x += 44) R.rect(x, 173, x + 22, 174, C6.raya); for (let k = 0; k < 16; k++) R.pset(Math.floor(hh(k, 1, 46) * 320), 162 + (k % 2), [C6.h0, C6.h2, C6.h3][k % 3]);
  for (let j = -3; j <= 3; j++) for (let i = -9; i <= 9; i++) if ((i / 9) ** 2 + (j / 3) ** 2 <= 1) R.pset(38 + i, 168 + j, (i + j) % 3 === 0 ? C6.asfL : C6.asfS);
  // la boca de riego y el poste del buzón
  caja(292, 146, 298, 157, C6.puerta); R.rect(291, 149, 299, 150, K); R.rect(293, 143, 297, 145, K); R.rect(294, 144, 296, 145, C6.puerta); R.rect(292, 146, 293, 157, hex('#d05a4c'));
  caja(BUZ[0] - 1, BUZ[1] - 20, BUZ[0] + 1, BUZ[1] + 2, C6.tr); R.rect(BUZ[0] + 1, BUZ[1] - 20, BUZ[0] + 1, BUZ[1] + 2, C6.trS); for (let x = BUZ[0] - 5; x <= BUZ[0] + 5; x++) R.pset(x, BUZ[1] + 3 - (Math.abs(x - BUZ[0]) < 3 ? 1 : 0), C6.cesD);
};
// el buzón: cuerpo de chapa con el lomo redondo, la puerta (ab 0–1) y la bandera roja (ba 0–1)
const buzon = (ab, ba) => { const [x, y] = [BUZ[0], BUZ[1] - 21];
  R.rect(x - 12, y - 11, x + 12, y + 1, K); R.rect(x - 10, y - 13, x + 10, y - 12, K); R.rect(x - 11, y - 10, x + 11, y, C6.buz); R.rect(x - 9, y - 12, x + 9, y - 11, C6.buzL); R.rect(x - 11, y - 10, x + 11, y - 9, C6.buzL); R.rect(x - 11, y - 2, x + 11, y, C6.buzS); R.rect(x - 2, y - 6, x + 2, y - 5, C6.buzS);
  if (ab > 0.3) { R.rect(x + 12, y - 10, x + 13, y, K); R.rect(x + 12, y - 9, x + 12, y - 1, hex('#2a3444')); R.rect(x + 13, y + 1, x + 20, y + 2, K); R.rect(x + 13, y + 1, x + 19, y + 1, C6.buzL); } else { R.rect(x + 12, y - 10, x + 13, y, K); R.rect(x + 12, y - 9, x + 12, y - 1, C6.buzL); R.pset(x + 14, y - 5, K); }
  const a = lerp(0, -Math.PI / 2, ba), fx = x - 4, fy = y - 3, ex = Math.round(fx + Math.cos(a) * 9), ey = Math.round(fy + Math.sin(a) * 9); R.linea(fx, fy, ex, ey, K); R.linea(fx, fy - 1, ex, ey - 1, hex('#e03a3a'));
  if (ba > 0.5) { R.rect(ex - 1, ey - 5, ex + 5, ey - 1, K); R.rect(ex, ey - 4, ex + 4, ey - 2, hex('#e03a3a')); R.pset(ex, ey - 4, hex('#ff8a7a')); } else { R.rect(ex - 5, ey - 2, ex + 1, ey + 2, K); R.rect(ex - 4, ey - 1, ex, ey + 1, hex('#e03a3a')); } };
const p6 = (t) => {
  fondo('afueras', afueras);
  // vida: nubes (lejos de la esquina de Atom), pájaros, hojas que caen, el gato de la ventana, el humo de la chimenea
  R.recorte([0, 15, 262, 60]); nube(((t * 4 + 140) % 330) - 30, 34, 40, [C6.nubeL, C6.nube, C6.nubeS]); R.recorte([0, 15, 319, 60]); nube(((t * 2.5 + 250) % 380) - 30, 56, 30, [C6.nubeL, C6.nube, C6.nubeS]); nube(((t * 6 + 40) % 400) - 40, 62, 22, [C6.nubeL, C6.nube, C6.nubeS]); R.recorte(null);
  for (let k = 0; k < 3; k++) pajaro(((t * 22 + k * 13) % 300) - 10, 48 + k * 5 + Math.sin(t * 2 + k) * 3, t, k, hex('#4a5a6a'));
  vapor(103, 17, t, C6.nubeS, 5, 14);
  for (let k = 0; k < 10; k++) { const u = (t * 0.22 + hh(k, 1, 47)) % 1, x = Math.round(150 + hh(k, 2, 47) * 160 + Math.sin(u * 9 + k) * 6 - u * 20), y = Math.round(70 + u * 76); R.pset(x, y, [C6.h0, C6.h1, C6.h3][k % 3]); R.pset(x + (Math.floor(t * 5 + k) % 2), y + 1, C6.h2); }
  { const m = Math.floor(t * 1.5) % 4 === 0 ? 1 : 0; R.rect(46, 75, 52, 80, K); R.rect(47, 72, 51, 76, K); R.pset(47, 71, K); R.pset(51, 71, K); R.pset(48, 74, C6.raya); R.pset(50, 74, C6.raya); R.linea(53, 80, 55 + m, 77 - m, K); }
  // una furgoneta de reparto cruza por el fondo de la calle del vecino… y un chico en bici por la acera de enfrente
  const sale = tramo(t, P6 - 0.2, ll(24.65)), bx = Math.round(lerp(88, BUZ[0] - 34, sale));
  const tieneLlave = t < ll(24.55), mete = tramo(t, ll(24.7), ll(25.0)), bandera = ease(tramo(t, ll(24.95), ll(25.2))) * (1 - ease(tramo(t, ll(26.0), ll(26.2))));
  // el cartero: llega, coge el sobre («to Preiss») y saca el paquetito («and he sent you»)
  const llega = tramo(t, ll(24.9), ll(25.85)), kx = Math.round(lerp(330, BUZ[0] + 22, llega)), coge = t > ll(25.95), da = tramo(t, ll(26.55), ll(27.0));
  const abre = t > ll(27.3), gema = ease(tramo(t, ll(27.4), ll(27.75))), mil = tramo(t, ll(28.85), ll(29.05)), salta = t > ll(28.9) ? Math.abs(Math.sin((t - ll(28.9)) * 6)) * 4 * (1 - tramo(t, ll(29.6), P7)) : 0;
  buzon(t > ll(24.6) && t < ll(26.3) ? 1 : 0, bandera);
  const b = R.actor(EL.buscadorCF, bx, 152, t, { dir: 1, anda: sale > 0 && sale < 1, sostiene: sale < 1 ? [bx + 17, 118] : mete < 1 ? [bx + 20 + Math.round(mete * 6), 126] : da > 0.6 ? [bx + 19, 128] : undefined, sonrisa: sale < 1 || abre, sorpresa: mil > 0 && t < ll(29.3), salto: Math.round(salta) });
  if (tieneLlave) { halo(b.mano[0] + 2, b.mano[1] - 6, 12, OROL, 0.5); Z.llave(R, b.mano[0] + 2, b.mano[1] - 1, {}); if (Math.floor(t * 6) % 2) destello(b.mano[0] + 9, b.mano[1] - 10, 1, BL); }
  else if (mete < 1) Z.sobre(R, b.mano[0] + 3, b.mano[1] + 3, {});
  if (llega > 0) { const c = R.actor(EL.carteroCF, kx, 152, t, { dir: -1, anda: llega < 1, sostiene: (coge && t < ll(26.45)) || (da > 0 && da < 0.6) ? [kx - 4, 128] : undefined, sonrisa: da > 0, habla: t > ll(26.45) && t < ll(26.9) && Math.sin(t * 9) > 0 });
    if (coge && t < ll(26.45)) Z.sobre(R, c.mano[0] - 3, c.mano[1] + 3, {});
    if (da > 0 && da < 0.6) paquete(c.mano[0] - 3, c.mano[1] + 2, 0); }
  if (da >= 0.6) { const px = b.mano[0] + 4, py = b.mano[1] + 2 - Math.round(salta); paquete(px, py, abre ? 1 : 0);
    if (gema > 0) { const gy = py - 8 - Math.round(gema * 16); halo(px, gy - 10, 22 + Math.sin(t * 5) * 2, hex('#7af0a8'), 0.55 * gema); Z.piedra(R, px, gy, { s: 2, t }); for (let k = 0; k < 4; k++) if ((Math.floor(t * 6) + k) % 3 === 0) destello(px - 14 + k * 9, gy - 22 + (k % 2) * 12, 1, BL);
      if (mil > 0) { const y0 = gy - 44 + Math.round((1 - mil) * 6); caja(px - 26, y0, px + 28, y0 + 13, hex('#2a2244'), hex('#f0c040')); R.numero('$1000', px + 1, y0 + 11, { centro: true, color: OROL }); } } }
  // un coche pasa por delante
  const cu = tramo(t, ll(25.1), ll(26.9)); if (cu > 0 && cu < 1) coche(Math.round(lerp(-70, 330, cu)), 178, t, '#c8a040', 1);
};
// el paquetito de papel de estraza con su cuerda (ab: abierto)
const paquete = (x, y, ab) => { R.rect(x - 6, y - 8, x + 6, y + 1, K); R.rect(x - 5, y - 7, x + 5, y, hex('#c89a5a')); R.rect(x - 5, y - 1, x + 5, y, hex('#a07a40')); if (!ab) { R.rect(x - 5, y - 4, x + 5, y - 4, hex('#e8e0d0')); R.rect(x, y - 7, x, y, hex('#e8e0d0')); R.pset(x - 1, y - 8, hex('#e8e0d0')); R.pset(x + 1, y - 8, hex('#e8e0d0')); } else { R.rect(x - 5, y - 7, x + 5, y - 6, hex('#3a2a20')); R.linea(x - 6, y - 8, x - 9, y - 12, K); R.linea(x + 6, y - 8, x + 9, y - 12, K); } };

// ── 7 · la caja de seguridad de Nueva York ─────────────────────────────────────────────────────────────────
const p7 = (t) => {
  const n = lerp(0, 12, tramo(t, ll(30.35), ll(32.2))), o = { encuadre: 'banco', camara: 'caja', piedras: n };
  const g = T.editorial(R, t, o);
  const ult = n >= 11.2, shh = t > ll(32.5);
  const pr = R.actor(EL.preiss, 54, 162, t, { dir: 1, sostiene: !ult ? [78, 122 + Math.round(Math.sin(t * 9) * 2)] : undefined, sonrisa: ult, dedo: shh });
  if (!ult) { const k = Math.min(11, Math.floor(n) + 1); Z.piedra(R, pr.mano[0] + 3, pr.mano[1] + 1, { color: GEMAS[k], t }); halo(pr.mano[0] + 3, pr.mano[1] - 5, 10, hex(GEMAS[k]), 0.45); }
  const em = R.actor(EL.empleadoBancoCF, 250, 162, t, { dir: -1, sostiene: t < ll(30.5) ? [246, 134] : undefined, sorpresa: n > 3 && n < 9, sonrisa: n >= 9, habla: t > ll(32.3) && t < ll(32.9) && Math.sin(t * 9) > 0 });
  if (t < ll(30.5)) { R.rect(em.mano[0] - 6, em.mano[1] - 1, em.mano[0], em.mano[1], hex('#c8ccd4')); R.rect(em.mano[0] - 8, em.mano[1] - 2, em.mano[0] - 6, em.mano[1] + 1, hex('#f0c040')); R.pset(em.mano[0] - 7, em.mano[1], K); }
  T.editorialDelante(R, t, o);
  // la cuenta de las piedras y el brillo final
  const k = Math.min(12, Math.floor(n + 0.01)); if (k > 0) { caja(146, 60, 174, 74, hex('#2a2244'), hex('#f0c040')); R.numero(String(k), 160, 72, { centro: true, color: k >= 12 ? OROL : BL }); }
  if (n >= 12) { const u = (t - ll(32.2)) / 0.6; if (u < 1) halo(160, 128, 60, BL, 0.4 * (1 - u)); for (let i = 0; i < 5; i++) if ((Math.floor(t * 5) + i) % 3 === 0) destello(118 + i * 21, 112 + (i % 2) * 8, 2, BL); }
  if (shh) R.icono('candado', pr.cabeza[0] + 12, pr.cabeza[1] - 16 - (Math.floor(t * 4) % 2), ORO, K, 2);
};
const efectos = [[ha(4.5), 'aviso'], [ha(6.3), 'whoosh'], [P2 + 0.3, 'ola'], [ha(10.15), 'brillo'], [ha(12.0), 'pop'], [ha(12.74), 'golpecito'], 
  [ll(15.6), 'lapiz'], [ll(18.95), 'toc'], [ll(19.45), 'cerrojo'], [ll(21.6), 'brillo'], [ll(22.86), 'tic'], [ll(24.95), 'toc'], [ll(25.4), 'coche'], [ll(26.75), 'papel'], [ll(27.56), 'brillo'], [ll(28.88), 'pop'],
  [ll(30.1), 'cerrojo'], [ll(30.6), 'golpecito'], [ll(31.4), 'golpecito'], [ll(32.2), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año: (t) => (t < P4 ? null : 1982) });
''')

E['cf-pala'] = ('La pala de casi dos metros', '''// CF-PALA (frases 8–9), 1981, cartela «1981». Seis planos:
// 1. LOCAL una calle de Nueva York: Preiss, con los cofres en el maletero, intenta meter la pala en el coche (gag 2): no
//    cabe, el portón rebota en el mango («boing»), acaba atada en la baca con un trapo rojo y el coche arranca;
// 2. LOCAL T.mapa («crisscrossed the country»): el cochecito con la pala en el techo cruza el país en zigzag y deja un
//    montoncito de tierra en cada ciudad; la cuenta de los cofres enterrados sube a 12 («buried the boxes himself»);
// 3. LOCAL un jardín público en corte, a media tarde («three and a half feet down»): Preiss da las últimas paladas, la
//    regla marca 1, 2, 3 y «3.5», deja caer el cofre y lo tapa («in parks and public gardens»: fuente, paseantes);
// 4. LOCAL otro jardín, de noche, con invernadero («According to Stanford's alumni magazine»): apisona la tierra con
//    la pala, la planta a su lado y sale la medida: seis marcas y un «6» («six-foot shovel»); se va silbando por la verja;
// 5. A editorial/estudio/mesa («He didn't write the spots down»): con el lápiz sobre la libreta en blanco, duda, niega y
//    lo tira al bote; «only he knew them» (mapa con candado, dedo en la sien); su miedo no es que nadie los
//    encuentre (cofre con «?», tachado)… y mira el reloj de arena;
// 6. LOCAL el reloj de arena de cerca («solved too quickly»): caen piezas de puzle en vez de arena, el reloj de pared
//    corre, y el puzle de doce piezas de al lado se completa a toda prisa; la mano de Preiss llega tarde a tumbarlo.''', AUX + r'''
const pa = (s) => en('pala', (s - 1.5) / 16.919), na = (s) => en('nadie', (s - 19.952) / 9.874);
const P2 = pa(5.98), P3 = pa(9.94), P4 = pa(14.4), P5 = na(19.8), P6 = na(26.5);
const ORO = hex('#ffd860'), OROL = hex('#fff4b8'), ROJO = hex('#e03a3a');
const palaS = () => sprite('pala', (x, y) => Z.pala(R, x, y, { larga: true }), 13, 48);
// la pala larga girada: (hx, hy) = donde va el puño del mango; ang 0 = de pie con la hoja abajo; positivo, la hoja hacia la izquierda
const pala = (hx, hy, ang) => girado(palaS(), 6, 2, ang, hx, hy);

// ── 1 · la calle de la editorial: la pala no cabe en el coche (gag 2) ──────────────────────────────────────
const C1 = pal({ c0: '#6ab0e4', c1: '#9acbee', c2: '#cfe6f2', lad: '#a4523c', ladS: '#84392a', ladL: '#bc6a50', jun: '#5a2a1e', pie: '#d8ccb4', pieS: '#b4a88e', pieL: '#ece2cc', vid: '#9cc4dc', vidS: '#6e9cbc', vidL: '#d4ecf6', marco: '#3a3430',
  ac: '#c4beb2', acS: '#a09a8c', acL: '#dcd6ca', asf: '#56565f', asfS: '#44444e', asfL: '#6c6c78', raya: '#e8e4d8', hierro: '#2c2c34', toldo: '#c83a34', toldoB: '#f4eee0', verde: '#3e8a4a', verdeS: '#2a6436', verdeL: '#62ac58',
  mad: '#8a5a34', madS: '#62401f', puerta: '#2e5a4e', puertaS: '#1e3e36', oro: '#e8c050', e0: '#8a98b4', e1: '#7282a2', dep: '#6a4a3a', depS: '#4a3228', rojo: '#d84a3a', amar: '#f0c030', naranja: '#f08a30' });
const CX0 = 138, CY0 = 160;
const calle = () => {
  // el hueco de cielo sobre la tienda baja, con los edificios lejanos
  grad(236, 0, 319, 72, [C1.c0, C1.c0, C1.c1, C1.c2]);
  for (let k = 0; k < 6; k++) { const x = 236 + k * 15, top = 57 + Math.floor(hh(k, 1, 60) * 9); for (let y = top; y < 72; y++) for (let xx = x; xx < x + 14; xx++) R.pset(xx, y, xx === x ? C1.vidL : (y - top) % 5 > 2 && (xx - x) % 4 > 1 ? C1.vidL : k % 2 ? C1.e0 : C1.e1); if (k % 2 === 0) { R.rect(x + 4, top - 7, x + 9, top - 2, C1.dep); R.poligono([[x + 3, top - 7], [x + 6, top - 10], [x + 10, top - 7]], C1.depS); R.rect(x + 4, top - 1, x + 4, top, C1.depS); R.rect(x + 9, top - 1, x + 9, top, C1.depS); } }
  // el edificio de ladrillo de la editorial, con su cornisa de piedra
  ladrillo(0, 16, 235, 130, C1.lad, C1.ladS, C1.ladL, C1.jun, 61);
  for (let y = 131; y < 141; y++) for (let x = 0; x < 237; x++) R.pset(x, y, y === 131 ? C1.jun : y === 132 ? C1.pieL : x % 24 === 0 ? C1.jun : hh(x >> 2, y >> 1, 59) < 0.14 ? hex('#9a8e76') : C1.pieS);
  for (let y = 0; y < 16; y++) for (let x = 0; x < 236; x++) R.pset(x, y, y === 15 ? C1.jun : y > 11 ? C1.pieS : hh(x >> 3, y >> 1, 62) < 0.1 ? C1.pieS : C1.pie); for (let x = 4; x < 236; x += 12) R.rect(x, 12, x + 5, 14, C1.pie);
  R.rect(234, 0, 236, 130, C1.jun);
  // dos filas de ventanas con su dintel, persianas, macetas y un aparato de aire
  [[22, 54], [60, 92]].forEach(([y0, y1], f) => [12, 68, 124, 180].forEach((x, k) => { caja(x - 1, y0 - 4, x + 39, y0 - 2, C1.pie, C1.jun); caja(x, y0, x + 38, y1, C1.vid, C1.marco);
    for (let y = y0; y <= y1; y++) for (let xx = x; xx <= x + 38; xx++) R.pset(xx, y, xx - x + (y - y0) < 16 ? C1.vidL : xx - x + (y - y0) > 50 ? C1.vidS : C1.vid);
    R.rect(x + 19, y0, x + 19, y1, C1.marco); R.rect(x, y0 + 14, x + 38, y0 + 14, C1.marco); caja(x - 2, y1 + 2, x + 40, y1 + 3, C1.pieL, C1.jun);
    const q = (f * 4 + k) % 5; if (q === 0) { for (let y = y0 + 1; y < y0 + 13; y += 2) R.rect(x + 1, y, x + 18, y, C1.pieL); } if (q === 1) { caja(x + 22, y1 - 12, x + 36, y1 - 1, C1.pieS); for (let y = y1 - 10; y < y1 - 1; y += 2) R.rect(x + 24, y, x + 34, y, C1.marco); }
    if (q === 2 || q === 4) { caja(x + 4, y1 - 3, x + 16, y1 + 1, C1.lad, C1.jun); for (let i = 0; i < 5; i++) { R.rect(x + 5 + i * 2, y1 - 7 - (i % 2) * 2, x + 6 + i * 2, y1 - 4, C1.verde); if (i % 2) R.pset(x + 5 + i * 2, y1 - 9, q === 2 ? C1.rojo : C1.amar); } }
    if (q === 3) { R.rect(x + 1, y0 + 1, x + 9, y1 - 1, C1.toldoB); R.rect(x + 29, y0 + 1, x + 37, y1 - 1, C1.toldoB); for (let y = y0 + 3; y < y1; y += 4) { R.pset(x + 9, y, C1.pieS); R.pset(x + 29, y, C1.pieS); } } }));
  // la escalera de incendios
  for (const y of [57, 95]) { R.rect(100, y, 172, y, C1.hierro); R.rect(100, y - 9, 172, y - 9, C1.hierro); for (let x = 100; x <= 172; x += 4) R.rect(x, y - 9, x, y, C1.hierro); R.rect(100, y + 1, 172, y + 2, C1.hierro); }
  for (let i = 0; i < 30; i++) { R.pset(164 - i, 58 + i, C1.hierro); R.pset(165 - i, 58 + i, C1.hierro); if (i % 4 === 0) R.rect(160 - i, 58 + i, 168 - i, 58 + i, C1.hierro); }
  // la planta baja: el portal con su número, el escaparate de la editorial y el cierre
  caja(0, 100, 235, 104, C1.pie, C1.jun); R.rect(0, 100, 235, 100, C1.pieL);
  caja(22, 106, 46, 136, C1.puerta, C1.jun); R.rect(22, 106, 23, 136, hex('#3e7262')); R.rect(44, 106, 46, 136, C1.puertaS); caja(26, 110, 42, 122, C1.vid, C1.puertaS); R.rect(34, 110, 34, 122, C1.puertaS); R.rect(42, 126, 43, 127, C1.oro);
  caja(24, 98, 44, 104, hex('#2a2244'), C1.oro); R.numero('17', 28, 104, { color: OROL, sombra: false }); R.rect(18, 137, 50, 139, C1.pieS); R.rect(16, 140, 52, 141, C1.pie);
  caja(60, 108, 124, 132, C1.vid, C1.marco); for (let y = 108; y <= 132; y++) for (let x = 60; x <= 124; x++) R.pset(x, y, x - 60 + (y - 108) < 22 ? C1.vidL : C1.vid);
  for (const [x, c] of [[64, C1.rojo], [78, C1.amar], [92, hex('#3a6ac8')], [106, C1.verde]]) { caja(x, 114, x + 9, 127, c, C1.marco); R.rect(x + 1, 115, x + 8, 119, C1.pieL); R.rect(x + 2, 122, x + 7, 122, C1.pieL); R.rect(x + 2, 124, x + 6, 124, C1.pieL); } R.rect(60, 128, 124, 132, C1.madS); R.rect(60, 128, 124, 128, C1.mad);
  caja(58, 133, 126, 136, C1.pie, C1.jun);
  caja(178, 106, 228, 138, C1.pieS, C1.jun); for (let y = 108; y < 138; y += 3) R.rect(178, y, 228, y, hex('#8e8470')); R.rect(200, 134, 206, 136, C1.hierro);
  // el toldo y la frutería de al lado
  for (let y = 72; y < 141; y++) for (let x = 237; x < 320; x++) R.pset(x, y, (y - 72) % 9 === 0 || (x + ((y - 72) / 9 | 0) * 6) % 13 === 0 ? C1.pieS : hh(x, y, 63) < 0.05 ? C1.pieL : C1.pie);
  R.rect(237, 70, 319, 72, C1.jun); R.rect(237, 68, 319, 69, C1.pieL);
  caja(246, 96, 290, 126, C1.vid, C1.marco); for (let y = 96; y <= 126; y++) for (let x = 246; x <= 290; x++) R.pset(x, y, x - 246 + (y - 96) < 18 ? C1.vidL : C1.vid); for (let k = 0; k < 9; k++) R.disco(251 + (k % 5) * 8, 122 - Math.floor(k / 5) * 6, 2, [C1.naranja, C1.rojo, C1.amar][k % 3]); R.rect(246, 110, 290, 110, C1.marco);
  caja(298, 98, 316, 138, C1.mad, C1.jun); caja(301, 102, 313, 116, C1.vid, C1.madS); R.pset(300, 122, C1.oro);
  for (let x = 240; x < 320; x++) { const d = x - 240; for (let y = 78; y <= 90 + (d % 8 < 4 ? 1 : 0); y++) R.pset(x, y, y >= 90 ? (Math.floor(d / 8) % 2 ? C1.toldo : C1.toldoB) : Math.floor(d / 8) % 2 ? C1.toldo : C1.toldoB); } R.rect(240, 77, 319, 77, C1.jun); R.rect(239, 77, 239, 90, C1.jun);
  // la acera, el bordillo y la calzada
  for (let y = 141; y < 152; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 141 ? C1.acS : (x + (y - 141) * 2) % 30 === 0 ? C1.acS : hh(x >> 1, y >> 1, 64) < 0.12 ? C1.acS : hh(x, y, 65) < 0.05 ? C1.acL : C1.ac);
  R.rect(0, 152, 319, 153, C1.acL); R.rect(0, 154, 319, 155, C1.acS);
  for (let y = 156; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x >> 2, y >> 1, 66) < 0.16 ? C1.asfS : hh(x, y, 67) < 0.07 ? C1.asfL : C1.asf);
  for (let x = 10; x < 320; x += 46) R.rect(x, 174, x + 24, 175, C1.raya);
  for (let j = -3; j <= 3; j++) for (let i = -10; i <= 10; i++) if ((i / 10) ** 2 + (j / 3) ** 2 <= 1) R.pset(64 + i, 166 + j, (i + j * 2) % 4 === 0 ? C1.asfL : C1.asfS);
  for (let j = -2; j <= 2; j++) for (let i = -14; i <= 14; i++) if ((i / 14) ** 2 + (j / 2) ** 2 <= 1) R.pset(250 + i, 164 + j, (i + j) % 5 === 0 ? C1.vidL : hex('#4a5a70'));
  // las cajas de fruta en la acera, la boca de riego, el parquímetro, la caja de periódicos y el árbol con su alcorque
  for (const [x, c] of [[244, C1.naranja], [262, C1.rojo], [280, C1.verdeL]]) { caja(x, 134, x + 14, 144, C1.mad, C1.jun); R.rect(x, 138, x + 14, 138, C1.madS); for (let i = 0; i < 4; i++) { R.disco(x + 2 + i * 3, 132, 2, K); R.disco(x + 2 + i * 3, 132, 1, c); } }
  caja(6, 138, 12, 150, C1.rojo); R.rect(5, 141, 13, 142, K); R.rect(7, 135, 11, 137, K); R.rect(8, 136, 10, 137, C1.rojo); R.rect(6, 138, 7, 150, hex('#f07a6a'));
  for (const x of [84, 214]) { R.rect(x, 128, x + 1, 150, C1.hierro); caja(x - 2, 120, x + 3, 128, hex('#8a8e9a')); R.rect(x - 1, 122, x + 2, 124, C1.vidL); R.pset(x + 2, 126, C1.rojo); }
  caja(60, 136, 72, 150, hex('#3a6ac8')); R.rect(60, 136, 72, 137, hex('#6a94e0')); caja(62, 139, 70, 144, C1.vidL, K); for (const y of [140, 142]) R.rect(63, y, 68, y, C1.acS); R.rect(64, 147, 68, 147, K);
  R.rect(199, 112, 202, 150, C1.madS); R.rect(199, 112, 199, 150, C1.mad); for (const [i, j, r] of [[0, -6, 12], [-9, 2, 8], [10, 0, 9], [2, -15, 8]]) { R.disco(200 + i, 104 + j, r + 1, K); } for (const [i, j, r, c] of [[0, -6, 12, C1.verde], [-9, 2, 8, C1.verdeS], [10, 0, 9, C1.verde], [2, -15, 8, C1.verdeL]]) { R.disco(200 + i, 104 + j, r, c); }
  for (let k = 0; k < 40; k++) { const a = hh(k, 1, 68) * 6.28, r = hh(k, 2, 68) * 15; R.pset(Math.round(200 + Math.cos(a) * r), Math.round(100 + Math.sin(a) * r), k % 3 ? C1.verdeL : C1.verdeS); }
  caja(194, 150, 208, 151, C1.madS);
};
const p1 = (t) => {
  fondo('calle', calle);
  // vida: una nube y pájaros en el hueco, la cortina de una ventana, vapor de la alcantarilla, palomas en la acera
  R.recorte([237, 14, 276, 48]); nube(244 + ((t * 3) % 40), 60, 26, [BL, hex('#e8f2f8'), hex('#b4cce0')]); R.recorte([237, 44, 319, 49]); nube(270 + ((t * 3) % 40), 58, 30, [BL, hex('#e8f2f8'), hex('#b4cce0')]); R.recorte(null);
  for (let k = 0; k < 3; k++) pajaro(240 + ((t * 12 + k * 14) % 36), 52 + k * 3 + Math.sin(t * 2 + k), t, k, C1.marco);
  vapor(64, 164, t, C1.acL, 6, 22); vapor(65, 162, t + 0.4, BL, 4, 16);
  { const m = Math.round(Math.sin(t * 1.6) * 2); for (let y = 61; y < 91; y++) { R.pset(133 + m * (y - 61) / 30, y, C1.toldoB); R.pset(134 + m * (y - 61) / 30, y, C1.pieS); } }   // la cortina de una ventana
  { const rg = Math.floor(t * 2) % 2; R.rect(74, 44, 78, 52, K); R.rect(75, 45, 77, 51, hex('#e8b890')); R.rect(74, 43, 78, 45, hex('#6a4028')); R.rect(79, 49 + rg, 82, 50 + rg, C1.vidS); if (rg) for (let i = 0; i < 3; i++) R.pset(83, 52 + i * 2, C1.vidL); }   // una vecina riega sus macetas
  const arranca = pa(5.25), va = t > arranca ? Math.round(((t - arranca) ** 2) * 70) : 0, CX = CX0 + va;
  const huyen = t > arranca - 0.1;
  for (let k = 0; k < 4; k++) { const x0 = 226 + k * 9, u = huyen ? (t - arranca + 0.1) * (1.2 + k * 0.2) : 0, pic = !huyen && Math.floor(t * 3 + k) % 3 === 0 ? 1 : 0; if (u > 2) continue;
    if (!huyen) { const x = x0 + Math.round(Math.sin(t * 0.7 + k * 2) * 3); R.rect(x - 2, 147, x + 2, 149, hex('#7a7e8c')); R.rect(x + 2, 145 + pic, x + 3, 146 + pic, hex('#5a5e6c')); R.pset(x + 4, 146 + pic, C1.naranja); } else pajaro(x0 + u * 26, 147 - u * 50, t, k, hex('#5a5e6c')); }
  // una paseante con su perro pasa por la acera, por detrás del coche
  { const u = tramo(t, 1.0, pa(3.4)), x = Math.round(lerp(334, 268, u)), mira = u >= 1; R.actor(EL.clienta ?? EL.senora30, x, 148, t, { dir: -1, anda: !mira, dedo: mira && t > pa(4.0) && t < pa(5.0), sorpresa: t > arranca }); const px = x - 16, bot = Math.floor(t * 6) % 2; R.linea(x + 1, 138, px + 8, 143, K); R.rect(px, 143 - bot, px + 9, 146 - bot, K); R.rect(px + 1, 144 - bot, px + 8, 145 - bot, hex('#c89a5a')); R.rect(px - 3, 141 - bot, px + 1, 144 - bot, K); R.rect(px - 2, 142 - bot, px, 143 - bot, hex('#c89a5a')); R.pset(px + 10, 142 - bot, K); R.rect(px + 1 + bot, 147, px + 1 + bot, 148, K); R.rect(px + 7 - bot, 147, px + 7 - bot, 148, K); }
  // los tiempos del gag
  const a0 = pa(2.05), a1 = pa(2.55), b1 = pa(3.55), c0 = pa(3.6), c1 = pa(4.45), d1 = pa(4.9);
  const dentro = t >= a0 && t < c0, mete = ease(tramo(t, a0, a1)), sube = ease(tramo(t, c0, c1)), enBaca = t >= c0;
  const golpe = t > a1 && t < a1 + 0.25 ? 1 : 0;
  // el portón: abierto, intenta cerrar y rebota en el mango, y al final cierra
  const reb = dentro && t > a1 + 0.2 ? Math.abs(Math.sin((t - a1 - 0.2) * 7.5)) * (1 - tramo(t, b1 - 0.4, b1)) : 0, porton = t < a1 + 0.2 ? 1 : dentro ? 0.52 + reb * 0.4 : 1 - ease(tramo(t, c1 - 0.1, c1 + 0.3));
  // Preiss
  const anda = tramo(t, d1, arranca - 0.05), px = Math.round(lerp(t < a0 ? 90 : 100, 150, anda)) , alVolante = anda >= 1;
  const empuja = dentro && t > a1 + 0.35 ? Math.round(Math.max(0, Math.sin((t - a1 - 0.35) * 9)) * 3) : 0, PX = dentro ? 66 + Math.round(mete * 22) + golpe + empuja : px;
  if (!alVolante) { const hx = dentro ? Math.round(lerp(84, 106, mete)) + golpe + empuja : PX + 16, pr = R.actor(EL.preiss, PX, 158, t, { dir: 1, anda: anda > 0 && anda < 1, sostiene: t < c1 ? [hx, dentro ? 137 : enBaca ? Math.round(lerp(137, 126, sube)) : 134] : undefined, sorpresa: (t > a1 && t < a1 + 0.5) || reb > 0.5, enfado: dentro && t > a1 + 0.6, sonrisa: t > c1 });
    if (t < a0) { Z.pala(R, pr.mano[0] + 3, 160, { larga: true }); if (t > pa(1.55)) R.icono('?', PX + 2, 112 - (Math.floor(t * 4) % 2), ROJO, K, 2); } }
  // la pala: dentro del coche (se ve por las ventanillas y asoma por detrás) o en la baca
  if (dentro) pala(Math.round(lerp(84, 106, mete)) + golpe + empuja - 2, 137, -Math.PI / 2);
  // los cofres en el maletero, y Preiss al volante
  for (let k = 0; k < 3; k++) T.b_cofrecito(R, CX + 17 + k * 5, CY0 - 17 - (k % 2) * 4);
  if (alVolante) { R.recorte([CX + 31, CY0 - 24, CX + 47, CY0 - 16]); R.actor(EL.preiss, CX + 31, CY0 - 3, t, { dir: 1, sonrisa: true }); R.recorte(null); }
  coche(CX + golpe, CY0, t, '#c8a040', 1, { cristal: true, quieto: t < arranca - 0.3, madera: true });
  // el portón levantado (bisagra en el techo, atrás)
  if (porton > 0.02) { const a = lerp(Math.PI * 0.62, Math.PI * 1.36, porton), hx = CX + 13, hy = CY0 - 25, ex = Math.round(hx + Math.cos(a) * 15), ey = Math.round(hy + Math.sin(a) * 15); const nx = -Math.sin(a), ny = Math.cos(a); for (let d = -2; d <= 2; d++) R.linea(Math.round(hx + nx * d), Math.round(hy + ny * d), Math.round(ex + nx * d), Math.round(ey + ny * d), Math.abs(d) === 2 ? K : hex('#c8a040')); R.linea(Math.round(hx + Math.cos(a) * 3), Math.round(hy + Math.sin(a) * 3), Math.round(hx + Math.cos(a) * 10), Math.round(hy + Math.sin(a) * 10), hex('#bfe0f0')); R.rect(ex - 1, ey - 1, ex + 1, ey + 1, K); }
  // la baca: la pala atada, con su trapo rojo
  if (enBaca) { const yb = Math.round(lerp(137, CY0 - 30, sube)), xb = Math.round(lerp(104, CX + 6, sube)) + (t > arranca ? 0 : 0); pala(xb, yb, -Math.PI / 2);
    if (sube >= 1) { for (const i of [20, 40]) { R.rect(CX + i, yb - 4, CX + i, CY0 - 26, hex('#e8e0d0')); R.pset(CX + i + 1, yb - 4, K); } const f = Math.floor(t * 8) % 2; R.rect(xb - 7, yb - 2 + f, xb - 1, yb + 2 + f, K); R.rect(xb - 6, yb - 1 + f, xb - 2, yb + 1 + f, ROJO); R.pset(xb - 8, yb + 2 - f, ROJO); } }
  if (reb > 0.85) R.icono('!', CX - 6, CY0 - 50, ROJO, K, 2);
  // el humo del escape al arrancar
  if (t > arranca - 0.25) for (let k = 0; k < 4; k++) { const u = ((t - arranca) * 2 + k * 0.25) % 1; R.disco(Math.round(CX - 4 - u * 16), Math.round(CY0 - 6 - u * 6), 1 + Math.round(u * 2), u < 0.5 ? C1.acL : C1.ac); }
  // un taxi pasa por delante
  const tu = tramo(t, pa(2.9), pa(4.6)); if (tu > 0 && tu < 1) { const tx = Math.round(lerp(330, -80, tu)); coche(tx, 180, t, '#f0c030', -1); R.rect(tx + 28, 180 - 30, tx + 36, 180 - 27, K); R.rect(tx + 29, 180 - 29, tx + 35, 180 - 28, BL); }
};

// ── 2 · el mapa: de ciudad en ciudad ───────────────────────────────────────────────────────────────────────
const RUTA = [[-74.0, 40.71], [-71.06, 42.36], [-73.57, 45.5], [-81.69, 41.5], [-87.63, 41.88], [-87.91, 43.04], [-104.5, 41.5], [-122.42, 37.77], [-112, 33.5], [-95.37, 29.76], [-90.07, 29.95], [-81.31, 29.9], [-79.93, 32.78], [-75.66, 35.89], [-74.0, 40.71]];
const PARADA = [1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14];   // en qué puntos de la ruta se entierra un cofre (doce)
const p2 = (t) => {
  const P = T.mapa(R, t, { zona: 'eeuu' });
  const pts = RUTA.map((q) => P(q).map(Math.round)), L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const u = tramo(t, P2 + 0.25, pa(9.55)), d = u * L[L.length - 1]; let cx = pts[0][0], cy = pts[0][1], dir = 1, n = 0;
  R.recorte([8, 16, 311, 171]);
  for (let i = 1; i < pts.length; i++) { const f = cl((d - L[i - 1]) / (L[i] - L[i - 1])); if (f <= 0) break; const [ax, ay] = pts[i - 1], bx = lerp(ax, pts[i][0], f), by = lerp(ay, pts[i][1], f), m = Math.ceil(Math.hypot(bx - ax, by - ay));
    for (let k = 0; k <= m; k++) { const x = Math.round(lerp(ax, bx, k / m)), y = Math.round(lerp(ay, by, k / m)); if ((Math.round(L[i - 1]) + k) % 5 < 3) { R.pset(x, y, ROJO); R.pset(x, y + 1, hex('#8e2222')); } }
    cx = Math.round(bx); cy = Math.round(by); dir = pts[i][0] >= ax ? 1 : -1; }
  // los montoncitos de tierra recién removida, con su palita, en cada parada
  PARADA.forEach((i, k) => { const dt = (d - L[i]) / 26; if (dt < 0 && i !== pts.length - 1) return; if (i === pts.length - 1 && u < 1) return; n++; const [x, y] = pts[i], s = Math.min(1, Math.max(0, i === pts.length - 1 ? (t - pa(9.55)) * 4 : dt) * 3);
    if (s < 1) halo(x, y, 12, OROL, 0.7 * (1 - s)); R.rect(x - 4, y, x + 4, y + 1, K); R.rect(x - 3, y - 1, x + 3, y, hex('#7a5232')); R.rect(x - 2, y - 2, x + 1, y - 2, hex('#9a6e42')); R.pset(x - 1, y - 2, hex('#b88a54')); R.rect(x + 3, y - 7 - Math.round((1 - s) * 3), x + 3, y - 2, hex('#a8743e')); R.rect(x + 2, y - 3, x + 4, y - 1, hex('#c8ccd4')); R.pset(x + 2, y - 8 - Math.round((1 - s) * 3), K); R.pset(x + 4, y - 8 - Math.round((1 - s) * 3), K); });
  // el cochecito, con la pala en la baca y su trapo rojo
  if (u < 1) { const b = Math.floor(t * 10) % 2, X = (i) => cx + dir * i; halo(cx, cy - 4, 13, BL, 0.35);
    R.rect(cx - 8, cy - 6 - b, cx + 8, cy - b, K); R.rect(cx - 5, cy - 10 - b, cx + 4, cy - 6 - b, K); R.rect(cx - 7, cy - 5 - b, cx + 7, cy - 1 - b, hex('#c8a040')); R.rect(cx - 4, cy - 9 - b, cx + 3, cy - 6 - b, hex('#bfe0f0')); R.rect(cx - 7, cy - 3 - b, cx + 7, cy - 2 - b, hex('#a8743e'));
    R.rect(Math.min(X(-11), X(9)), cy - 12 - b, Math.max(X(-11), X(9)), cy - 11 - b, hex('#a8743e')); R.rect(Math.min(X(9), X(13)), cy - 13 - b, Math.max(X(9), X(13)), cy - 10 - b, hex('#c8ccd4')); R.rect(Math.min(X(-14), X(-12)), cy - 13 - b + (Math.floor(t * 8) % 2), Math.max(X(-14), X(-12)), cy - 11 - b, ROJO);
    for (const i of [-5, 5]) { R.disco(cx + i, cy, 2, K); R.pset(cx + i, cy, hex('#c8ccd4')); } for (let k = 1; k < 4; k++) if ((Math.floor(t * 9) + k) % 2) R.pset(X(-9 - k * 3), cy - 1 - k, hex('#f6f2ea')); }
  R.recorte(null);
  // la cuenta de los cofres enterrados
  { const bx = 236, by = 138; R.rect(bx + 2, by + 2, bx + 62, by + 30, hex('#3a2a20')); caja(bx, by, bx + 60, by + 28, hex('#f4ecd8'), hex('#5a4030')); R.rect(bx, by, bx + 60, by + 1, BL); R.rect(bx, by + 27, bx + 60, by + 28, hex('#d0c4a4'));
    Z.cofre(R, bx + 16, by + 25, {}); R.numero(String(n), bx + 34, by + 22, { tam: 16 }); R.disco(bx + 30, by, 2, K); R.pset(bx + 30, by, ROJO); R.pset(bx + 29, by - 1, hex('#ff8a7a')); }
};

// ── 3 · un jardín público en corte: a un metro largo de hondo ──────────────────────────────────────────────
const C3 = pal({ s0: '#74b4e0', s1: '#a4cfe6', s2: '#dce4cc', s3: '#f6dc9c', s4: '#fcc87c', nubeL: '#fffae6', nube: '#fce4b4', nubeS: '#e4ac8c', sol: '#fff6c0', a0: '#5a8a4a', a1: '#3e6e3e', a2: '#86a84a', a3: '#c8a83a', seto: '#2e6a3c', setoS: '#1e4e30', setoL: '#4a8a48',
  ces: '#62a84a', cesS: '#4a8e42', cesL: '#8ac85a', cesD: '#2e6a36', grava: '#e4d4a8', gravaS: '#c4b488', pie: '#d8d4c8', pieS: '#a8a498', pieL: '#f0ece0', agua: '#7ac4e8', aguaL: '#d4f0fc', cob: '#5aa890', cobS: '#3a8070',
  t0: '#4a3020', t1: '#7a5232', t1S: '#62401f', t1L: '#946a42', t2: '#a8703c', t2S: '#8a5a2e', t3: '#6a5a50', t3S: '#4e4038', t3L: '#8a7a6e', hoyo: '#2a1a14', hoyoS: '#3e2a1e', raiz: '#c8a070', gus: '#e88a8a', tubo: '#7a8e9a', tuboL: '#a8bcc8', tul: '#e84a5a', tul2: '#f8d040', tul3: '#c06ad8', regla: '#f0e0a0', reglaS: '#c8b070' });
const SUE = 108, HX0 = 80, HX1 = 118, FT = 14, MONT = 138;   // el suelo, el hoyo y los píxeles de cada pie de la regla
const topiario = (x, tipo) => { if (tipo) { for (let j = 0; j < 30; j++) { const w = Math.round(j * 0.3) + 1; for (let i = -w; i <= w; i++) R.pset(x + i, SUE - 34 + j, Math.abs(i) === w ? C3.setoS : hh(x + i, j, 71) < 0.2 ? C3.setoL : i > w * 0.3 ? C3.setoS : C3.seto); } R.rect(x - 1, SUE - 4, x + 1, SUE, C3.t0); }
  else { R.disco(x, SUE - 14, 9, C3.setoS); R.disco(x, SUE - 14, 8, C3.seto); for (let k = 0; k < 14; k++) R.pset(x - 6 + Math.floor(hh(k, x, 72) * 10), SUE - 20 + Math.floor(hh(k, x, 73) * 9), C3.setoL); R.rect(x - 1, SUE - 5, x + 1, SUE, C3.t0); } };
const jardin = () => {
  grad(0, 0, 319, 76, [C3.s0, C3.s0, C3.s1, C3.s2, C3.s3, C3.s4]);
  for (let r = 22; r >= 10; r -= 4) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (Math.hypot(i, j) <= r && b4(46 + i, 58 + j) < (1 - r / 26) * 1.3) R.pset(46 + i, 58 + j, C3.sol); R.disco(46, 58, 8, C3.sol); R.disco(46, 58, 6, BL);
  // la arboleda del fondo
  for (let k = 0; k < 26; k++) { const x = k * 13 + Math.floor(hh(k, 1, 74) * 6), y = 66 + Math.floor(hh(k, 2, 74) * 8), r = 8 + Math.floor(hh(k, 3, 74) * 6), c = [C3.a0, C3.a1, C3.a2, C3.a3][Math.floor(hh(k, 4, 74) * 3.4)]; if (x > 262 && y - r < 48) continue;
    for (let j = -r; j <= r + 6; j++) for (let i = -r; i <= r; i++) if (Math.hypot(i, Math.min(j, 0) * 1.1) <= r) R.pset(x + i, y + j, i + j < -r * 0.5 ? mez(c, C3.sol, 0.35) : hh(x + i, y + j, 75) < 0.16 ? C3.a1 : c); }
  // el templete de música
  caja(18, 70, 74, 74, C3.pie); R.rect(18, 70, 74, 70, C3.pieL); for (const x of [22, 34, 46, 58, 70]) { R.rect(x - 1, 46, x + 1, 70, C3.pieS); R.rect(x - 1, 46, x - 1, 70, C3.pieL); } caja(18, 42, 74, 45, C3.pie);
  for (let j = 0; j < 14; j++) { const w = Math.round(30 * Math.sqrt(1 - (j / 14) ** 2)); for (let i = -w; i <= w; i++) R.pset(46 + i, 41 - j, Math.abs(i) === w ? C3.cobS : (i + 60) % 9 === 0 ? C3.cobS : i < -w * 0.4 ? mez(C3.cob, BL, 0.3) : C3.cob); } R.rect(45, 22, 47, 27, C3.cobS); R.disco(46, 21, 2, C3.sol);
  for (let x = 20; x < 74; x += 3) R.pset(x, 62, C3.pieS); R.rect(20, 60, 72, 60, C3.pieS);
  // el seto del fondo, el paseo de grava y el césped a franjas
  for (let x = 0; x < 320; x++) { const top = 76 + (Math.floor(x / 40) % 2 ? 0 : 1); for (let y = top; y <= 88; y++) R.pset(x, y, y === top ? C3.setoL : hh(x, y, 76) < 0.22 ? C3.setoS : hh(x, y, 77) < 0.1 ? C3.setoL : C3.seto); }
  for (let y = 89; y <= 94; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 89 ? C3.gravaS : hh(x, y, 78) < 0.22 ? C3.gravaS : hh(x, y, 79) < 0.1 ? BL : C3.grava);
  for (let y = 95; y <= SUE; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((x + (y - 95) * 2) / 18) & 1; R.pset(x, y, y === 95 ? C3.cesD : hh(x, y, 80) < 0.06 ? C3.cesL : hh(x >> 1, y, 81) < 0.08 ? C3.cesD : f ? C3.cesS : C3.ces); }
  // la fuente de piedra
  for (let j = -5; j <= 5; j++) for (let i = -34; i <= 34; i++) { const e = (i / 34) ** 2 + (j / 5) ** 2; if (e <= 1) R.pset(244 + i, 100 + j, e > 0.78 ? (j < 0 ? C3.pieL : C3.pieS) : (i + j * 3 + 90) % 7 < 2 ? C3.aguaL : C3.agua); }
  for (let i = -35; i <= 35; i++) { R.pset(244 + i, 100 + Math.round(5 * Math.sqrt(Math.max(0, 1 - (i / 35) ** 2))) + 1, K); } caja(241, 80, 247, 98, C3.pie); R.rect(241, 80, 242, 98, C3.pieL); R.rect(246, 80, 247, 98, C3.pieS);
  for (let j = -2; j <= 2; j++) for (let i = -14; i <= 14; i++) if ((i / 14) ** 2 + (j / 2) ** 2 <= 1) R.pset(244 + i, 80 + j, j < 0 ? C3.pieL : C3.pieS); R.rect(243, 70, 245, 78, C3.pie); R.disco(244, 69, 2, C3.pieL);
  // los topiarios, los parterres de tulipanes y un banco
  topiario(186, 1); topiario(206, 0); topiario(300, 0); topiario(14, 0); topiario(52, 1);
  for (const [x0, x1] of [[22, 44], [272, 292]]) { for (let x = x0; x <= x1; x++) R.rect(x, SUE - 3, x, SUE, hh(x, 1, 82) < 0.5 ? C3.t1 : C3.t1S); for (let x = x0 + 1; x < x1; x += 4) { R.rect(x, SUE - 8, x, SUE - 4, C3.cesD); R.rect(x - 1, SUE - 11, x + 1, SUE - 9, [C3.tul, C3.tul2, C3.tul3][(x >> 2) % 3]); R.pset(x + 1, SUE - 6, C3.cesL); } }
  caja(92, 84, 122, 86, hex('#8a5a34')); caja(92, 78, 122, 81, hex('#8a5a34')); R.rect(94, 87, 95, 93, K); R.rect(119, 87, 120, 93, K); R.rect(92, 78, 122, 78, hex('#b07a4a'));
  // ── el corte del terreno ──
  for (let y = SUE + 1; y < 180; y++) for (let x = 0; x < 320; x++) { const yy = y + Math.round(Math.sin(x * 0.04) * 2);
    R.pset(x, y, y <= SUE + 2 ? C3.cesD : yy < SUE + 10 ? (hh(x, y, 83) < 0.25 ? C3.t1S : C3.t0) : yy < SUE + 44 ? (hh(x >> 1, y, 84) < 0.14 ? C3.t1S : hh(x, y, 85) < 0.08 ? C3.t1L : C3.t1) : yy < SUE + 58 ? ((yy - SUE) % 5 === 0 && hh(x >> 2, y, 86) < 0.7 ? C3.t2S : hh(x, y, 87) < 0.1 ? C3.t1L : C3.t2) : (hh(x >> 3, yy >> 2, 88) < 0.35 ? C3.t3S : hh(x, y, 89) < 0.1 ? C3.t3L : C3.t3)); }
  for (let x = 0; x < 320; x += 2) if (hh(x, 1, 90) < 0.6) R.rect(x, SUE + 1, x, SUE + 2 + Math.floor(hh(x, 2, 90) * 3), C3.cesS);
  // piedras, raíces, la tubería de la fuente, una botella vieja y un fósil
  for (let k = 0; k < 16; k++) { const x = Math.floor(hh(k, 1, 91) * 320), y = SUE + 14 + Math.floor(hh(k, 2, 91) * 56), r = 2 + Math.floor(hh(k, 3, 91) * 3); if (x > HX0 - 26 && x < HX1 + 34) continue; R.disco(x, y, r + 1, C3.t3S); R.disco(x, y, r, C3.t3); R.pset(x - 1, y - 1, C3.t3L); }
  for (const x of [186, 206, 300, 14, 52]) for (let k = 0; k < 4; k++) { let rx = x, ry = SUE + 3; for (let i = 0; i < 16 + k * 5; i++) { rx += (hh(i, k + x, 92) - 0.5) * 2.6 + (k - 1.5) * 0.5; ry += 0.9; R.pset(Math.round(rx), Math.round(ry), i < 6 ? C3.raiz : C3.t1L); } }
  R.rect(242, SUE + 3, 246, SUE + 40, C3.tubo); R.rect(242, SUE + 3, 242, SUE + 40, C3.tuboL); R.rect(242, SUE + 36, 319, SUE + 40, C3.tubo); R.rect(246, SUE + 36, 319, SUE + 36, C3.tuboL); for (const x of [262, 292]) { R.rect(x, SUE + 35, x + 2, SUE + 41, hex('#5a6e7a')); } R.rect(241, SUE + 20, 247, SUE + 22, hex('#5a6e7a'));
  caja(204, SUE + 30, 208, SUE + 40, hex('#5a9a7a')); R.rect(205, SUE + 26, 207, SUE + 29, hex('#5a9a7a')); R.rect(204, SUE + 30, 204, SUE + 40, hex('#9ad0b0'));
  for (let a = 0; a < 14; a += 0.3) { const r = a * 0.6; R.pset(Math.round(286 + Math.cos(a) * r), Math.round(SUE + 60 + Math.sin(a) * r * 0.8), a > 12 ? C3.t3S : C3.t3L); }
  // la regla clavada junto al hoyo, con sus pies
  caja(HX0 - 12, SUE - 2, HX0 - 6, SUE + 4 * FT + 4, C3.regla, K); R.rect(HX0 - 7, SUE - 2, HX0 - 6, SUE + 4 * FT + 4, C3.reglaS);
  for (let k = 0; k <= 8; k++) R.rect(HX0 - 12, SUE + k * (FT / 2), HX0 - (k % 2 ? 10 : 8), SUE + k * (FT / 2), K);
};
const p3 = (t) => {
  fondo('jardin', jardin);
  // vida: nubes de tres tonos, pájaros, la fuente, mariposas, paseantes por el paseo de grava y una lombriz
  R.recorte([0, 15, 262, 70]); nube(((t * 4 + 60) % 330) - 30, 36, 44, [C3.nubeL, C3.nube, C3.nubeS]); R.recorte([0, 15, 319, 70]); nube(((t * 2.5 + 200) % 390) - 30, 54, 34, [C3.nubeL, C3.nube, C3.nubeS]); nube(((t * 6 + 110) % 400) - 40, 64, 22, [C3.nubeL, C3.nube, C3.nubeS]); R.recorte(null);
  for (let k = 0; k < 4; k++) pajaro(((t * 20 + k * 16) % 330) - 10, 50 + k * 4 + Math.sin(t * 2 + k) * 3, t, k, hex('#4a5a6a'));
  for (let k = 0; k < 9; k++) { const u = (t * 1.3 + k / 9) % 1, a = (k - 4) * 0.22, x = Math.round(244 + a * 26 * u), y = Math.round(68 - Math.sin(u * Math.PI) * 13 + u * 30); if (y < 100) { R.pset(x, y, C3.aguaL); R.pset(x, y + 1, C3.agua); } }
  for (let k = 0; k < 5; k++) { const u = (t * 0.9 + k / 5) % 1; R.pset(Math.round(244 + (k - 2) * 12 + Math.sin(t * 3 + k) * 2), 99 + (k % 2), u < 0.5 ? BL : C3.aguaL); }
  for (let k = 0; k < 3; k++) { const x = Math.round(170 + k * 46 + Math.sin(t * 1.3 + k * 2) * 10), y = Math.round(92 + Math.sin(t * 2.1 + k) * 5), f = Math.floor(t * 8 + k) % 2; R.pset(x, y, K); R.pset(x - 1, y - f, k % 2 ? C3.tul2 : BL); R.pset(x + 1, y - f, k % 2 ? C3.tul2 : BL); }
  [[0.0, -9, '#d84a3a', '#3a4a6a'], [0.42, 7, '#3a6ac8', '#6a4028'], [0.48, 7, '#e8c84a', '#3a3a44']].forEach(([f, v, c1, c2], k) => { const x = Math.round((((t * v + f * 420) % 420) + 420) % 420 - 50), b = Math.floor(t * 5 + k) % 2; if (x > 148 && x < 172) return; R.rect(x, 82 - b, x + 2, 84 - b, hex('#e8b890')); R.rect(x - 1, 85 - b, x + 3, 89, hex(c1)); R.rect(x, 90, x, 92, hex(c2)); R.rect(x + 2, 90, x + 2, 92 - b, hex(c2)); R.pset(x + 1, 81 - b, K); R.rect(x, 81 - b, x + 2, 81 - b, hex(c2)); });
  { const gx = 168 + Math.round(Math.sin(t * 0.9) * 5); for (let i = 0; i < 9; i++) R.pset(gx + i, SUE + 24 + Math.round(Math.sin(t * 5 + i * 0.9) * 1.4), i === 4 ? hex('#c86a6a') : C3.gus); }
  // el hoyo: se ahonda con las últimas paladas, recibe el cofre y se vuelve a tapar
  const cava = tramo(t, P3, pa(11.15)), hondo = Math.round(lerp(30, 3.5 * FT, cava)), deja = tramo(t, pa(11.75), pa(12.45)), tapa = ease(tramo(t, pa(12.7), pa(14.25))), fondoY = SUE + hondo;
  for (let y = SUE - 1; y <= fondoY; y++) for (let x = HX0; x <= HX1; x++) R.pset(x, y, x < HX0 + 2 || x > HX1 - 2 ? C3.hoyoS : hh(x, y, 93) < 0.06 ? C3.hoyoS : C3.hoyo);
  for (let x = HX0; x <= HX1; x++) R.pset(x, fondoY + 1, C3.t0);
  // el cofre que baja
  const cy = Math.round(lerp(SUE - 12, fondoY, deja * deja) - Math.sin(Math.min(1, deja * 2.2) * Math.PI) * 10), cxx = Math.round(lerp(139, 99, Math.min(1, deja * 2.2)));
  if (deja > 0) { Z.cofre(R, cxx, cy, {}); if (deja >= 1 && t < pa(12.45) + 0.4) puf(99, fondoY - 2, (t - pa(12.45)) / 0.4, 8, 16, C3.t1L, C3.raiz); }
  // la tierra que vuelve al hoyo
  const nivel = Math.round(lerp(fondoY, SUE - 1, tapa)); if (tapa > 0) for (let y = nivel; y <= fondoY; y++) for (let x = HX0; x <= HX1; x++) R.pset(x, y, y === nivel ? C3.t1L : hh(x, y, 94) < 0.3 ? C3.t1L : hh(x, y, 95) < 0.2 ? C3.t1S : C3.t1);
  // la regla se enciende pie a pie y marca «3.5»
  for (let k = 1; k <= 4; k++) { const on = hondo >= k * FT - 1 && k < 4; R.numero(String(k), HX0 - 26, SUE + k * FT + 3, { color: on ? OROL : hex('#b89a6a'), sombra: on }); }
  const marca = tramo(t, pa(10.95), pa(11.2)); if (marca > 0 && tapa < 0.5) { const y = SUE + Math.round(3.5 * FT), f = Math.floor(t * 5) % 2;
    for (let x = HX0 - 5; x < HX1 + 4; x += 3) R.pset(x, y, OROL); R.poligono([[HX1 + 5 + f, y], [HX1 + 10 + f, y - 4], [HX1 + 10 + f, y + 4]], K); R.poligono([[HX1 + 7 + f, y], [HX1 + 9 + f, y - 2], [HX1 + 9 + f, y + 2]], OROL);
    caja(HX1 + 13, y - 9, HX1 + 46, y + 7, hex('#2a2244'), hex('#f0c040')); R.numero('3.5', HX1 + 17, y + 4, { color: OROL }); }
  // el montón de tierra, a la izquierda, que crece y luego mengua
  const mont = cl(0.55 + cava * 0.45 - tapa * 0.85); for (let j = 0; j < Math.round(15 * mont); j++) { const w = Math.round((Math.round(15 * mont) - j) * 1.5) + 2; for (let i = -w; i <= w; i++) R.pset(MONT + i, SUE - j, Math.abs(i) >= w - 1 || j === Math.round(15 * mont) - 1 ? C3.t1S : hh(MONT + i, j, 96) < 0.25 ? C3.t1L : C3.t1); }
  // Preiss: cava, deja el cofre y tapa
  const PXp = 152, cavando = t < pa(11.2), tapando = tapa > 0 && tapa < 1, fase = cavando ? ((t - P3) / 0.4) % 1 : tapando ? ((t - pa(12.7)) / 0.42) % 1 : 0;
  const conCofre = t >= pa(11.35) && deja < 0.25, mira = t >= pa(11.2) && t < pa(11.4);
  const pr = R.actor(EL.preiss, PXp, SUE, t, { dir: -1, sostiene: conCofre ? [PXp - 4, SUE - 14] : cavando || tapando ? [PXp - 2, SUE - 20 + Math.round(Math.sin(fase * Math.PI * 2) * 2)] : undefined, sonrisa: mira || deja >= 1, sorpresa: false });
  if (conCofre) Z.cofre(R, pr.mano[0] - 9, pr.mano[1] + 10, {});
  if (cavando || tapando) { const a = cavando ? 0.92 + Math.sin(fase * Math.PI * 2) * 0.2 : 0.62 + Math.sin(fase * Math.PI * 2) * 0.22; pala(pr.mano[0] + 4, pr.mano[1] - 14, a);
    if (cavando) terron(104, SUE + 6, MONT, SUE - 12, (fase - 0.3) / 0.6, 26, C3.t1, C3.t1S), terron(100, SUE + 10, MONT - 5, SUE - 10, (fase - 0.36) / 0.6, 20, C3.t1L, C3.t1S);
    else terron(MONT - 4, SUE - 10, 100, Math.max(SUE, nivel - 2), (fase - 0.25) / 0.6, 18, C3.t1, C3.t1S), terron(MONT, SUE - 8, 106, Math.max(SUE, nivel - 2), (fase - 0.32) / 0.6, 24, C3.t1L, C3.t1S); }
  else Z.pala(R, PXp + 26, SUE + 5, { larga: true });
  if (tapa >= 1) { const u = (t - pa(14.25)) / 0.4; if (u < 1) destello(99, SUE - 6, 2, BL); }
};

// ── 4 · otro jardín, de noche: la pala de seis pies ────────────────────────────────────────────────────────
const C4 = pal({ n0: '#0c1030', n1: '#141a48', n2: '#1e2c66', n3: '#2c4680', n4: '#3e6894', luna: '#f4f0d4', lunaS: '#c8c8b4', nubeL: '#4a5a94', nube: '#36447c', nubeS: '#262e60', arb: '#16284a', arbS: '#0e1c38', arbL: '#24406a',
  inv: '#f8e09a', invL: '#fff4c8', invS: '#d8a85a', hierro: '#1a2030', hierroL: '#3a4660', ces: '#1e4a4a', cesS: '#163a40', cesL: '#2e6a58', cesD: '#0e2a34', grava: '#7a7890', gravaS: '#5a5a74', gravaL: '#9c9ab0', lad: '#5a3a4a', ladS: '#3e2838', ladL: '#74506a', jun: '#2a1a2a', pie: '#8a8ea8', pieS: '#5e6280', pieL: '#b4b8cc',
  rosa: '#d84a6a', rosaL: '#ff8aa0', hoja: '#1e5a40', hojaL: '#3a7a50', tierra: '#5a3e30', tierraL: '#7a5a42', tierraS: '#3e2a22', mad: '#5a4038', madL: '#7a5a4a', farol: '#ffe8a0' });
const VERJA = [262, 296], S4 = 150;
const senda = (y) => [186 + (S4 + 29 - y) * 1.5 + Math.sin((179 - y) * 0.07) * 8, 6 + (y - 118) * 0.3];
const noche = () => {
  grad(0, 0, 319, 96, [C4.n0, C4.n0, C4.n1, C4.n2, C4.n3, C4.n4]);
  for (let k = 0; k < 90; k++) { const x = Math.floor(hh(k, 1, 100) * 320), y = Math.floor(hh(k, 2, 100) * 86); if ((y < 15 && x < 180) || (x > 272 && y < 48 && k % 3 === 0)) continue; R.pset(x, y, k % 7 === 0 && !(x > 272 && y < 48) ? BL : k % 3 ? hex('#6a80d0') : hex('#a8c8ff')); }
  // la luna creciente, con su halo
  for (let r = 24; r >= 12; r -= 4) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (Math.hypot(i, j) <= r && b4(214 + i, 36 + j) < (1 - r / 28) * 1.1) R.pset(214 + i, 36 + j, C4.n3);
  R.disco(214, 36, 9, C4.luna); R.disco(210, 33, 8, C4.n2); R.pset(219, 40, C4.lunaS); R.pset(221, 35, C4.lunaS);
  // los árboles del fondo, en silueta
  for (let k = 0; k < 20; k++) { const x = k * 17 + Math.floor(hh(k, 1, 101) * 8), y = 82 + Math.floor(hh(k, 2, 101) * 10), r = 10 + Math.floor(hh(k, 3, 101) * 7); if (x > 250 && y - r < 50) continue; for (let j = -r; j <= r + 12; j++) for (let i = -r; i <= r; i++) if (Math.hypot(i, Math.min(j, 0)) <= r) R.pset(x + i, y + j, i + j < -r * 0.6 ? C4.arbL : hh(x + i, y + j, 102) < 0.2 ? C4.arbS : C4.arb); }
  for (let y = 97; y < 120; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x, y, 98) < 0.25 ? C4.arbS : hh(x, y, 99) < 0.08 ? C4.arbL : C4.arb);
  // el invernadero de hierro y cristal, con luz dentro
  const gx0 = 70, gx1 = 196, gy0 = 70, gy1 = 116;
  for (let y = gy0; y <= gy1; y++) for (let x = gx0; x <= gx1; x++) R.pset(x, y, hh(x >> 2, y >> 2, 103) < 0.2 ? C4.invS : b4(x, y) < (gy1 - y) / 80 ? C4.invL : C4.inv);
  for (let j = 0; j <= 20; j++) { const w = Math.round((gx1 - gx0) / 2 * (1 - j / 21)) + 1; for (let i = -w; i <= w; i++) R.pset(133 + i, gy0 - j, Math.abs(i) >= w - 1 ? C4.hierro : hh((133 + i) >> 2, j >> 2, 97) < 0.2 ? C4.invS : b4(133 + i, gy0 - j) < j / 40 ? C4.invS : C4.inv); }
  // las plantas, a contraluz, dentro
  for (let k = 0; k < 13; k++) { const x = gx0 + 6 + k * 9 + Math.floor(hh(k, 1, 104) * 4), hgt = 10 + Math.floor(hh(k, 2, 104) * 24); R.rect(x, gy1 - hgt, x, gy1, C4.hoja); for (let i = 0; i < hgt; i += 4) { R.linea(x, gy1 - i - 2, x - 4 - (i % 3), gy1 - i - 6, C4.hoja); R.linea(x, gy1 - i - 3, x + 4 + (i % 3), gy1 - i - 7, C4.hojaL); } if (k % 3 === 0) R.disco(x, gy1 - hgt - 2, 4, C4.hoja); }
  // los hierros: montantes, arcos de la cúpula y la linterna
  for (let x = gx0; x <= gx1; x += 14) R.rect(x, gy0, x, gy1, C4.hierro); R.rect(gx0, gy0, gx1, gy0 + 1, C4.hierro); R.rect(gx0, 92, gx1, 92, C4.hierro); R.rect(gx0 - 1, gy0, gx0, gy1, C4.hierro); R.rect(gx1, gy0, gx1 + 1, gy1, C4.hierro);
  for (let x = gx0 + 14; x < gx1; x += 14) { const hgt = Math.round(21 * (1 - Math.abs(x - 133) / ((gx1 - gx0) / 2))); R.rect(x, gy0 - hgt, x, gy0, C4.hierro); } R.rect(gx0 + 30, gy0 - 10, gx1 - 30, gy0 - 10, C4.hierro); R.rect(128, gy0 - 23, 138, gy0 - 21, C4.hierro);
  caja(124, 94, 142, 116, C4.invL, C4.hierro); R.rect(133, 94, 133, 116, C4.hierro); R.rect(gx0 - 2, gy1 + 1, gx1 + 2, gy1 + 3, C4.pieS); R.rect(gx0 - 2, gy1 + 1, gx1 + 2, gy1 + 1, C4.pieL);
  // el muro de ladrillo con su verja y los dos pilares con farol
  ladrillo(204, 96, 319, 118, C4.lad, C4.ladS, C4.ladL, C4.jun, 105); R.rect(204, 94, 319, 95, C4.pieS); R.rect(204, 93, 319, 93, C4.pieL); R.rect(0, 108, 66, 118, C4.arbS); for (let x = 0; x < 68; x++) { const top = 104 + Math.round(Math.sin(x * 0.5) * 1.3); for (let y = top; y <= 118; y++) R.pset(x, y, y === top ? C4.cesL : hh(x, y, 106) < 0.25 ? C4.cesD : C4.cesS); }
  for (let y = 80; y <= 118; y++) for (let x = VERJA[0]; x <= VERJA[1]; x++) R.pset(x, y, b4(x, y) < 0.4 ? C4.n3 : C4.n2); for (let k = 0; k < 5; k++) { const x = 266 + k * 7; R.disco(x, 100 - (k % 2) * 4, 5, C4.arb); }
  for (const x of [VERJA[0] - 6, VERJA[1] + 1]) { caja(x, 76, x + 5, 118, C4.pie, C4.jun); R.rect(x, 76, x + 1, 118, C4.pieL); R.rect(x + 4, 76, x + 5, 118, C4.pieS); caja(x - 1, 73, x + 6, 75, C4.pieL, C4.jun); R.rect(x + 2, 68, x + 3, 72, C4.hierro); }
  // el césped a la luz de la luna, con la senda de grava hacia la verja
  for (let y = 119; y < 180; y++) for (let x = 0; x < 320; x++) { const [sx, sw] = senda(y), d = Math.abs(x - sx), f = Math.floor((x - (y - 119)) / 20) & 1, lu = Math.max(0, 1 - Math.hypot((x - 150) / 150, (y - 119) / 50));
    R.pset(x, y, d < sw ? (hh(x, y, 107) < 0.2 ? C4.gravaS : hh(x, y, 108) < 0.08 ? C4.gravaL : C4.grava) : d < sw + 1.2 ? C4.cesD : hh(x, y, 109) < 0.04 + lu * 0.08 ? C4.cesL : b4(x, y) < (y - 119) / 90 + (f ? 0.1 : 0) ? C4.cesD : hh(x >> 1, y, 110) < 0.12 ? C4.cesS : C4.ces); }
  R.rect(0, 119, 319, 119, C4.cesD);
  // el arriate de rosales, el banco y un reloj de flores a medio hacer
  for (let x = 6; x < 68; x++) for (let y = 160; y <= 172; y++) if (((x - 37) / 32) ** 2 + ((y - 166) / 7) ** 2 <= 1) R.pset(x, y, hh(x, y, 111) < 0.3 ? C4.tierraS : C4.tierra);
  for (let k = 0; k < 7; k++) { const x = 12 + k * 8, y = 163 - (k % 2) * 3; R.rect(x, y - 8, x, y, C4.hoja); R.disco(x - 2, y - 5, 2, C4.hoja); R.disco(x + 2, y - 7, 2, C4.hojaL); R.disco(x, y - 10, 2, K); R.disco(x, y - 10, 1, k % 3 ? C4.rosa : C4.rosaL); R.pset(x + 3, y - 4, C4.rosa); }
  caja(16, 130, 54, 132, C4.mad); caja(16, 123, 54, 127, C4.mad); R.rect(16, 123, 54, 123, C4.madL); R.rect(18, 133, 19, 140, K); R.rect(51, 133, 52, 140, K); for (let x = 20; x < 54; x += 6) R.rect(x, 123, x, 127, K);
  caja(296, 128, 310, 150, C4.pie, C4.jun); R.rect(296, 128, 297, 150, C4.pieL); caja(293, 150, 313, 153, C4.pieS, C4.jun); for (let j = 0; j < 8; j++) { const w = 9 - Math.abs(j - 3); R.rect(303 - w, 120 + j, 303 + w, 120 + j, j < 2 ? C4.pieL : C4.pie); } R.rect(293, 119, 313, 119, C4.jun); for (const [i, j] of [[-5, -4], [0, -7], [5, -5], [-2, -10], [3, -11]]) { R.disco(303 + i, 119 + j, 2, C4.hoja); R.pset(303 + i, 118 + j, C4.hojaL); }
  // la carretilla con plantones, la regadera y unas margaritas en el césped
  { const ox = 56, oy = 24;
  R.poligono([[196 + ox, 136 + oy], [226 + ox, 136 + oy], [222 + ox, 146 + oy], [200 + ox, 146 + oy]], K); R.poligono([[198 + ox, 137 + oy], [224 + ox, 137 + oy], [221 + ox, 145 + oy], [201 + ox, 145 + oy]], hex('#3e6a5a')); R.rect(198 + ox, 137 + oy, 224 + ox, 137 + oy, hex('#5a8a74')); R.linea(226 + ox, 137 + oy, 236 + ox, 133 + oy, K); R.linea(226 + ox, 138 + oy, 236 + ox, 134 + oy, C4.mad); R.disco(204 + ox, 149 + oy, 3, K); R.disco(204 + ox, 149 + oy, 1, C4.pieS); R.rect(218 + ox, 146 + oy, 219 + ox, 151 + oy, K);
  for (let k = 0; k < 5; k++) { const x = 201 + ox + k * 5; R.rect(x, 132 + oy - (k % 2), x, 136 + oy, C4.hoja); R.pset(x - 1, 132 + oy - (k % 2), C4.hojaL); R.pset(x + 1, 133 + oy - (k % 2), C4.hojaL); if (k % 2) R.pset(x, 131 + oy, C4.rosaL); }
  caja(182 + ox, 144 + oy, 190 + ox, 152 + oy, C4.pieS); R.rect(182 + ox, 144 + oy, 183 + ox, 152 + oy, C4.pieL); R.linea(180 + ox, 146 + oy, 175 + ox, 142 + oy, K); R.rect(174 + ox, 140 + oy, 176 + ox, 142 + oy, K); R.linea(191 + ox, 146 + oy, 193 + ox, 149 + oy, K); }
  for (let k = 0; k < 26; k++) { const x = Math.floor(hh(k, 1, 115) * 320), y = 124 + Math.floor(hh(k, 2, 115) * 54), [sx, sw] = senda(y); if (Math.abs(x - sx) < sw + 3) continue; R.pset(x, y, BL); R.pset(x + 1, y, hex('#f0d860')); R.pset(x, y + 1, C4.cesL); }
  // la tierra recién removida
  for (let j = 0; j < 6; j++) { const w = 15 - j * 2; for (let i = -w; i <= w; i++) R.pset(86 + i, S4 + 2 - j, Math.abs(i) >= w - 1 ? C4.tierraS : hh(i, j, 112) < 0.3 ? C4.tierraL : C4.tierra); }
};
// una nota de música que sube
const nota = (x, y, c) => { x = Math.round(x); y = Math.round(y); R.rect(x - 1, y - 1, x + 2, y + 2, K); R.rect(x, y, x + 1, y + 1, c); R.rect(x + 2, y - 7, x + 3, y + 1, K); R.rect(x + 2, y - 6, x + 2, y, c); R.rect(x + 3, y - 7, x + 6, y - 4, K); R.rect(x + 3, y - 6, x + 5, y - 5, c); };
const p4 = (t) => {
  fondo('noche', noche);
  // vida: estrellas que titilan, nubes finas, murciélagos, la luz del invernadero, los faroles con sus polillas, luciérnagas, un gato en el muro y un búho
  for (let k = 0; k < 14; k++) { const x = Math.floor(hh(k, 1, 113) * 320), y = Math.floor(hh(k, 2, 113) * 80); if ((y < 15 && x < 180) || (x > 60 && x < 200 && y > 44) || (x > 270 && y < 50)) continue; if (Math.sin(t * (2 + k % 3) + k * 2) > 0.5) destello(x, y, 1, BL); }
  R.recorte([0, 15, 319, 66]); nube(((t * 3 + 40) % 300) - 30, 60, 46, [C4.nubeL, C4.nube, C4.nubeS]); R.recorte([0, 15, 262, 50]); nube(((t * 5 + 190) % 330) - 30, 30, 30, [C4.nubeL, C4.nube, C4.nubeS]); R.recorte(null);
  for (let k = 0; k < 2; k++) { const x = ((t * (26 + k * 9) + k * 150) % 360) - 20, y = 54 + k * 9 + Math.sin(t * 4 + k) * 6, f = Math.floor(t * 10 + k) % 2; if (x > 268 && y < 50) continue; R.rect(Math.round(x) - 1, Math.round(y), Math.round(x) + 1, Math.round(y), K); R.pset(Math.round(x) - 2, Math.round(y) - f, K); R.pset(Math.round(x) + 2, Math.round(y) - f, K); R.pset(Math.round(x) - 3, Math.round(y) + 1 - 2 * f, K); R.pset(Math.round(x) + 3, Math.round(y) + 1 - 2 * f, K); }
  halo(133, 86, 90, C4.inv, 0.16 + 0.02 * Math.sin(t * 2)); { const jx = 84 + Math.round(tramo(t, P4, P5 + 0.5) * 60); R.rect(jx, 100, jx + 3, 116, C4.hoja); R.rect(jx, 96, jx + 3, 99, C4.hoja); R.rect(jx + 4, 103, jx + 8, 104, C4.hoja); R.rect(jx + 8, 105 + (Math.floor(t * 4) % 2), jx + 8, 108, hex('#bfe0f0')); }   // el jardinero riega dentro, a contraluz
  for (const x of [VERJA[0] - 6, VERJA[1] + 1]) { halo(x + 3, 64, 22, C4.farol, 0.5 + 0.05 * Math.sin(t * 9 + x)); R.disco(x + 3, 64, 4, K); R.disco(x + 3, 64, 3, C4.farol); R.pset(x + 2, 63, BL); for (let k = 0; k < 3; k++) R.pset(Math.round(x + 3 + Math.cos(t * (3 + k) + k * 2) * (7 + k)), Math.round(64 + Math.sin(t * (4 + k) + k) * 5), C4.pieL); }
  for (let k = 0; k < 12; k++) { const x = Math.round(20 + hh(k, 1, 114) * 280 + Math.sin(t * 0.7 + k) * 8), y = Math.round(124 + hh(k, 2, 114) * 50 + Math.cos(t * 0.9 + k * 2) * 4); if (Math.sin(t * 2.2 + k * 1.7) > 0.3) { R.pset(x, y, hex('#e8ff8a')); R.pset(x + 1, y, hex('#a8d040')); } }
  { const cxg = Math.round(lerp(224, 246, tramo(t, P4 + 0.5, pa(17.0)))), cola = Math.round(Math.sin(t * 3) * 2); R.rect(cxg, 88, cxg + 9, 92, K); R.rect(cxg + 8, 84, cxg + 12, 89, K); R.pset(cxg + 8, 83, K); R.pset(cxg + 12, 83, K); R.pset(cxg + 9, 86, hex('#e8ff8a')); R.pset(cxg + 11, 86, hex('#e8ff8a')); R.linea(cxg, 89, cxg - 4, 85 + cola, K); }
  { const ojo = Math.floor(t * 0.8) % 4 !== 0; R.rect(130, 39, 136, 46, K); R.rect(131, 40, 135, 45, hex('#8a7460')); R.pset(130, 38, K); R.pset(136, 38, K); if (ojo) { R.pset(132, 41, hex('#f8e060')); R.pset(134, 41, hex('#f8e060')); } R.pset(133, 43, hex('#e8a030')); }
  // la verja se abre cuando Preiss se va
  const abre = ease(tramo(t, pa(18.9), pa(19.5)));
  for (const [x0, d] of [[VERJA[0], 1], [VERJA[1], -1]]) { const w = Math.round(17 * (1 - abre * 0.72)); for (let i = 0; i <= w; i += 3) { const x = x0 + d * i; R.rect(x, 82 + Math.round(Math.abs(i - w / 2) * 0.5), x, 118, C4.hierro); R.pset(x, 81 + Math.round(Math.abs(i - w / 2) * 0.5), C4.hierroL); } R.rect(Math.min(x0, x0 + d * w), 90, Math.max(x0, x0 + d * w), 90, C4.hierro); R.rect(Math.min(x0, x0 + d * w), 110, Math.max(x0, x0 + d * w), 110, C4.hierro); }
  // Preiss: apisona, planta la pala a su lado, la mira y se va silbando
  const g1 = pa(14.85), g2 = pa(15.35), planta = ease(tramo(t, pa(15.75), pa(16.6))), mide = tramo(t, pa(16.9), pa(17.6)), seva = tramo(t, pa(18.45), P5 + 0.5), yendo = seva > 0;
  const golpea = (g) => { const u = (t - g) / 0.5; return u > -0.6 && u < 0.4 ? (u < 0 ? 1 - (u + 0.6) / 0.6 : u / 0.4) : 1; };   // 1 arriba, 0 abajo
  const arr = Math.min(golpea(g1), golpea(g2)), PX = Math.round(lerp(126, 250, seva)), suelo = Math.round(lerp(S4, 124, Math.max(0, seva - 0.35) / 0.65));
  const apis = t < pa(15.75), SX = 158;
  const pr = R.actor(EL.preiss, PX, suelo, t, { dir: apis ? -1 : 1, anda: yendo, sostiene: apis ? [PX - 3, 134 - Math.round(arr * 6)] : planta < 1 ? [Math.round(lerp(PX + 17, SX - 2, planta)), 128] : yendo ? [PX + 17, suelo - 14] : undefined, sorpresa: mide > 0 && mide < 1, sonrisa: mide >= 1, dedo: mide >= 1 && !yendo && t < pa(18.3) });
  if (apis) { pala(pr.mano[0] + 1, pr.mano[1] - 3, lerp(1.22, 1.75, arr)); for (const g of [g1, g2]) { const u = (t - g) / 0.35; if (u > 0 && u < 1) puf(84, S4 - 2, u, 8, 12, C4.tierraL, C4.tierra); } }
  else if (!yendo) { const a = lerp(1.22, 0, planta); if (planta < 1) pala(Math.round(lerp(PX - 2, SX, planta)), Math.round(lerp(131, S4 - 44, planta)), a); else Z.pala(R, SX, S4 + 2, { larga: true }); }
  else { pala(pr.mano[0] + 1, pr.mano[1] + 2, 2.25); for (let k = 0; k < 3; k++) { const u = ((t - pa(18.45)) * 0.9 + k * 0.33) % 1; nota(pr.cabeza[0] + 8 + u * 14 + Math.sin(u * 6 + k) * 3, pr.cabeza[1] - 4 - u * 22, k % 2 ? ORO : hex('#a8e0ff')); } }
  // la medida: seis marcas y un 6
  if (mide > 0 && !yendo) { const x = SX + 9, n = Math.floor(mide * 6 + 0.001); R.rect(x - 1, S4 - 45, x + 2, S4 + 3, K); R.rect(x, S4 + 2 - 46, x + 1, S4 + 2, OROL); R.rect(x - 3, S4 + 1, x + 4, S4 + 3, K); R.rect(x - 2, S4 + 2, x + 3, S4 + 2, OROL); R.rect(x - 3, S4 - 45, x + 4, S4 - 43, K); R.rect(x - 2, S4 - 44, x + 3, S4 - 44, OROL);
    for (let k = 1; k <= n; k++) { const y = S4 + 2 - Math.round(k * 46 / 6); R.rect(x + 1, y - 1, x + 7, y + 1, K); R.rect(x + 2, y, x + 6, y, k === n ? BL : OROL); }
    if (mide >= 1) { const u = Math.min(1, (t - pa(17.6)) / 0.2), y0 = 106 + Math.round((1 - u) * 5); caja(x + 9, y0, x + 37, y0 + 22, hex('#2a2244'), hex('#f0c040')); R.numero('6', x + 13, y0 + 20, { tam: 16 }); R.rect(x + 30, y0 + 4, x + 31, y0 + 8, OROL); R.pset(x + 30, y0 + 9, OROL); if (Math.floor(t * 5) % 2) destello(x + 36, y0 + 1, 2, BL); } }
};

// ── 5 · la mesa de Preiss: ni una nota ─────────────────────────────────────────────────────────────────────
const mapita = (x, y) => { R.rect(x - 8, y - 7, x + 8, y + 6, K); R.rect(x - 7, y - 6, x + 7, y + 5, hex('#f4ecd8')); R.rect(x - 7, y - 6, x - 2, y - 2, hex('#7ab0d8')); R.rect(x - 7, y - 2, x - 5, y + 1, hex('#7ab0d8')); R.linea(x - 4, y + 3, x + 1, y - 1, hex('#3a8a5a')); R.linea(x + 1, y - 1, x + 6, y + 3, hex('#3a8a5a'));
  R.linea(x + 1, y - 5, x + 5, y - 1, ROJO); R.linea(x + 5, y - 5, x + 1, y - 1, ROJO); R.rect(x, y - 6, x, y + 5, hex('#d0c4a4')); };
const lapiz = (x, y, a) => { const c = Math.cos(a), s = Math.sin(a); for (let i = -6; i <= 6; i++) { const px = Math.round(x + c * i), py = Math.round(y + s * i); R.rect(px, py, px + 1, py + 1, i > 4 ? hex('#3a3a44') : i > 2 ? hex('#e8c8a0') : i < -4 ? hex('#e88aa0') : hex('#f0c030')); } };
const tacha = (x0, y0, x1, y1) => { for (let d = 0; d < 2; d++) { R.linea(x0 + d, y0, x1 + d, y1, ROJO); R.linea(x1 + d, y0, x0 + d, y1, ROJO); } };
const p5 = (t) => {
  const mira = t > na(26.05), o = { encuadre: 'estudio', camara: 'mesa', epoca: 1981, libreta: 'blanco', arena: lerp(0.04, 0.3, tramo(t, na(25.6), P6 + 0.5)) };
  const g = T.editorial(R, t, o);
  const duda = t < na(20.95), tira = tramo(t, na(20.95), na(21.4)), niega = t > na(21.0) && t < na(21.9) ? Math.round(Math.sin(t * 14)) : 0;
  const sabe = t > na(22.0) && t < na(23.2), preoc = t >= na(23.3) && !mira;
  const pr = R.actor(EL.preiss, 153 + niega, g.detras ?? 138, t, { dir: 1, sostiene: duda ? [171, 127 + Math.round(Math.abs(Math.sin(t * 4.5)) * 5)] : undefined, dedo: sabe, sonrisa: sabe, triste: preoc && t < na(24.3), habla: preoc && t > na(24.3) && Math.sin(t * 8) > 0.3, sorpresa: mira });
  if (duda) lapiz(pr.mano[0] + 2, pr.mano[1] + 3, 1.1);
  T.editorialDelante(R, t, o);
  // la libreta sigue en blanco: un marco que parpadea
  if (t < na(21.9) && Math.floor(t * 4) % 2) { R.rect(136, 137, 185, 137, OROL); R.rect(136, 147, 185, 147, OROL); R.rect(136, 137, 136, 147, OROL); R.rect(185, 137, 185, 147, OROL); }
  // el lápiz vuela al bote de la izquierda
  if (tira > 0 && tira < 1) lapiz(lerp(172, 104, tira), lerp(130, 138, tira) - Math.sin(tira * Math.PI) * 30, 1.1 + tira * 9);
  // lo que piensa
  const hx = pr.cabeza[0], gl = (a, b) => { const s = Math.min(1, (t - a) / 0.2), y0 = Math.round(lerp(96, 84, s)); return t > a && t < b ? y0 : null; };
  let y0;
  if ((y0 = gl(na(20.05), na(21.85))) != null) { globo(180, y0, 238, y0 + 21, hx + 8, 112); mapita(194, y0 + 11); for (let i = 0; i < 3; i++) R.rect(206 + i * 3, y0 + 10, 207 + i * 3, y0 + 11, K); R.poligono([[214, y0 + 7], [218, y0 + 10], [214, y0 + 14]], K);
    R.rect(222, y0 + 3, 234, y0 + 18, K); R.rect(223, y0 + 4, 233, y0 + 17, BL); R.rect(223, y0 + 4, 233, y0 + 5, hex('#d0c4a4')); if (t > na(21.0)) tacha(203, y0 + 4, 219, y0 + 17); }
  if ((y0 = gl(na(22.05), na(23.25))) != null) { globo(180, y0, 228, y0 + 21, hx + 8, 112); mapita(194, y0 + 11); R.icono('candado', 208, y0 + 3, hex('#a87818'), hex('#d0c4a4'), 2); }
  if ((y0 = gl(na(23.4), na(26.0))) != null) { globo(180, y0, 232, y0 + 21, hx + 8, 112); Z.cofre(R, 197, y0 + 20, { sinCaja: true }); for (let i = 0; i < 4; i++) R.rect(187 + i * 6, y0 + 19, 190 + i * 6, y0 + 19, hex('#7a5232')); R.icono('?', 212, y0 + 4 + (Math.floor(t * 4) % 2), hex('#3a6ac8'), hex('#d0c4a4'), 2); if (t > na(24.25)) tacha(184, y0 + 3, 228, y0 + 18); }
  // … y el reloj de arena
  if (mira) { const u = (t - na(26.05)) / 0.3; halo(205, 136, 16, OROL, 0.5); R.icono('!', 201, 108 - Math.round(Math.min(1, u) * 4) - (Math.floor(t * 6) % 2), ROJO, K, 2); }
};

// ── 6 · el reloj de arena de cerca: demasiado deprisa ──────────────────────────────────────────────────────
const C6 = pal({ w: '#8aa890', wS: '#7a9882', wL: '#9ab89e', nog: '#6a4228', nogS: '#4e2e1a', nogL: '#86583a', mesa: '#8a5a34', mesaS: '#6e4424', mesaL: '#a6723e', vade: '#2e6a4e', vadeS: '#245a40', vadeL: '#3e7e5e', cuero: '#5a3420', oro: '#e0b040', oroS: '#a87818', oroL: '#fff0a0',
  cris: '#d4ecf4', crisS: '#9cc4d8', c0: '#f0a060', c1: '#f8c880', c2: '#f4e0b0', e0: '#6a5a84', e1: '#544870', vent: '#ffd870', corcho: '#c89a5e', corchoS: '#a67c44', papel: '#f6f0e0', papelS: '#d8ccb0', tapa: '#cdb88a', tapaS: '#a8946a', tapaL: '#e0cea4' });
const HG = [92, 170, 58], TAB = [176, 98];   // el reloj: centro, base y arriba; el tablero del puzle: esquina
const PZ = ['#e84a5a', '#f8c030', '#3a8ae0', '#3ab870', '#b070f0', '#ff8a30'];
const hw = (y) => { const m = (HG[1] - 7 + HG[2] + 7) / 2, d = Math.abs(y - m) / (m - HG[2] - 8); return d > 1 ? 0 : Math.round(2 + 21 * d ** 0.62); };   // el medio ancho del cristal en cada fila
const despacho = () => {
  for (let y = 0; y < 94; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x >> 2, y >> 1, 120) < 0.12 ? C6.wS : hh(x, y, 121) < 0.04 ? C6.wL : C6.w);
  for (let y = 94; y < 114; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 96 ? C6.nogS : y === 96 ? C6.nogL : x % 40 < 2 ? C6.nogS : x % 40 === 2 ? C6.nogL : hh(x >> 3, y, 122) < 0.16 ? C6.nogS : C6.nog);
  // la ventana al atardecer
  caja(12, 24, 70, 84, C6.c1, C6.nogS); grad(12, 24, 70, 84, [C6.c0, C6.c1, C6.c2]); for (let k = 0; k < 6; k++) { const x = 12 + k * 10, top = 50 + Math.floor(hh(k, 1, 123) * 22); for (let y = top; y <= 84; y++) for (let xx = x; xx < Math.min(71, x + 9); xx++) R.pset(xx, y, (y - top) % 5 > 2 && (xx - x) % 3 === 1 && hh(xx, y, 124) < 0.5 ? C6.vent : k % 2 ? C6.e0 : C6.e1); }
  R.rect(40, 24, 41, 84, C6.nog); R.rect(12, 52, 70, 53, C6.nog); caja(8, 85, 74, 87, C6.nogL, C6.nogS);
  // el reloj de pared (las agujas, en cada fotograma)
  R.disco(150, 46, 17, K); R.disco(150, 46, 16, C6.oroS); R.disco(150, 46, 14, C6.papel); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.rect(Math.round(150 + Math.cos(a) * 12), Math.round(46 + Math.sin(a) * 12), Math.round(150 + Math.cos(a) * 12) + (k % 3 ? 0 : 1), Math.round(46 + Math.sin(a) * 12) + (k % 3 ? 0 : 1), K); }
  // el corcho con los doce bocetos
  caja(196, 54, 264, 90, C6.corcho, C6.nogS); for (let k = 0; k < 90; k++) R.pset(197 + Math.floor(hh(k, 1, 125) * 66), 55 + Math.floor(hh(k, 2, 125) * 34), C6.corchoS);
  for (let k = 0; k < 12; k++) { const x = 200 + (k % 6) * 11, y = 58 + Math.floor(k / 6) * 16; R.rect(x, y, x + 8, y + 11, K); R.rect(x + 1, y + 1, x + 7, y + 10, C6.papel); R.rect(x + 1, y + 1, x + 7, y + 5, hex(PZ[k % 6])); R.rect(x + 2, y + 7, x + 6, y + 7, C6.papelS); R.rect(x + 2, y + 9, x + 5, y + 9, C6.papelS); R.pset(x + 4, y, ROJO); }
  // la mesa y el vade verde
  madera(0, 114, 319, 179, C6.mesa, C6.mesaS, C6.mesaL, 126, 17); R.rect(0, 114, 319, 114, C6.nogS); R.rect(0, 115, 319, 115, C6.mesaL);
  for (let y = 126; y < 180; y++) for (let x = 14; x < 306; x++) R.pset(x, y, y === 126 || x === 14 || x === 305 ? C6.vadeS : hh(x >> 1, y >> 1, 127) < 0.14 ? C6.vadeS : hh(x, y, 128) < 0.05 ? C6.vadeL : C6.vade);
  for (const x of [14, 292]) { R.rect(x, 126, x + 13, 134, C6.cuero); R.rect(x, 126, x + 13, 126, K); R.pset(x + 6, 130, C6.oro); }
  // el bote de lápices, la libreta en blanco y el cofrecito en su caja
  caja(24, 100, 40, 124, hex('#3a6ac8')); R.rect(24, 100, 26, 124, hex('#6a94e0')); R.rect(38, 100, 40, 124, hex('#28488e')); for (const [i, c] of [[2, '#f0c030'], [6, '#e84a5a'], [10, '#3ab870'], [13, '#f0c030']]) { R.rect(25 + i, 88 + (i % 4), 26 + i, 100, hex(c)); R.pset(25 + i, 87 + (i % 4), K); }
  R.poligono([[126, 152], [164, 150], [168, 176], [128, 178]], K); R.poligono([[127, 153], [163, 151], [166, 175], [129, 177]], C6.papel); for (let y = 154; y < 176; y += 3) R.pset(129, y, K); R.rect(160, 172, 165, 174, C6.papelS);
  Z.cofre(R, 288, 150, {});
  // el reloj de arena: los remates de latón, las columnas torneadas y el cristal
  const [cx, by, ty] = HG;
  for (let x = cx - 30; x <= cx + 30; x++) for (let y = by + 1; y <= by + 4; y++) if ((x + y) % 2) R.pset(x + 4, y, C6.vadeS);
  for (const y of [ty, by - 6]) { caja(cx - 30, y, cx + 30, y + 6, C6.oro); R.rect(cx - 30, y, cx + 30, y + 1, C6.oroL); R.rect(cx - 30, y + 5, cx + 30, y + 6, C6.oroS); R.rect(cx - 26, y + 3, cx + 26, y + 3, C6.oroS); }
  for (const x of [cx - 27, cx + 25]) for (let y = ty + 8; y <= by - 8; y++) { const b = Math.round(Math.abs(Math.sin((y - ty) * 0.24)) * 1.6); R.rect(x - b - 1, y, x + 2 + b + 1, y, K); R.rect(x - b, y, x + 2 + b, y, C6.oro); R.pset(x - b, y, C6.oroL); R.pset(x + 2 + b, y, C6.oroS); }
  for (let y = ty + 8; y <= by - 8; y++) { const w = hw(y); for (let x = cx - w; x <= cx + w; x++) R.pset(x, y, Math.abs(x - cx) === w ? K : mez(R.pget(x, y), C6.cris, 0.72)); R.pset(cx - w + 2, y, BL); if (w > 8) R.pset(cx - w + 3, y, BL); if (w > 6) R.pset(cx + w - 2, y, C6.crisS); }
  // el atril del puzle
  const [tx, ty2] = TAB; R.rect(tx + 4, ty2 + 73, tx + 8, ty2 + 76, K); R.rect(tx + 76, ty2 + 73, tx + 80, ty2 + 76, K); for (let x = tx - 2; x <= tx + 92; x++) for (let y = ty2 + 75; y <= ty2 + 78; y++) if ((x + y) % 2) R.pset(x, y, C6.vadeS);
};
// una pieza de puzle pequeña (4 × 4, con su pestaña)
const pieza = (x, y, c, k = 0) => { x = Math.round(x); y = Math.round(y); R.rect(x - 2, y - 2, x + 2, y + 2, K); R.rect(x - 1, y - 1, x + 1, y + 1, c); R.pset(x - 1, y - 1, mez(c, BL, 0.5)); if (k % 2) { R.pset(x + 3, y, K); R.pset(x + 2, y, c); } else { R.pset(x, y - 3, K); R.pset(x, y - 2, c); } };
const p6 = (t) => {
  fondo('despacho', despacho);
  const [cx, by, ty] = HG, [tx, ty2] = TAB, m = Math.round((by - 7 + ty + 7) / 2);
  // el reloj de pared corre: las agujas dan vueltas
  { const a1 = t * 7, a2 = t * 0.6; R.linea(150, 46, Math.round(150 + Math.cos(a1) * 11), Math.round(46 + Math.sin(a1) * 11), K); for (let d = 0; d < 2; d++) R.linea(150 + d, 46, Math.round(150 + Math.cos(a2) * 7) + d, Math.round(46 + Math.sin(a2) * 7), K); R.disco(150, 46, 1, ROJO); for (let k = 0; k < 3; k++) { const a = a1 - 0.5 - k * 0.35; R.pset(Math.round(150 + Math.cos(a) * 19), Math.round(46 + Math.sin(a) * 19), C6.wL); } }
  // las luces de la ciudad en la ventana y el polvo en la luz
  for (let k = 0; k < 6; k++) if (Math.sin(t * 1.5 + k * 2.3) > 0.2) R.pset(15 + k * 9 + (k % 3), 62 + (k * 7) % 18, C6.oroL);
  for (let k = 0; k < 8; k++) { const u = (t * 0.12 + hh(k, 1, 129)) % 1; if (Math.sin(t * 2 + k) > 0) R.pset(Math.round(16 + hh(k, 2, 129) * 70 + u * 16), Math.round(88 + u * 30), C6.c2); }
  // la «arena»: piezas de puzle que bajan cada vez más deprisa
  const f = cl(0.12 + 0.86 * tramo(t, P6 - 0.3, na(29.3)) ** 1.25), topY = Math.round(lerp(ty + 14, m - 3, f)), pileH = Math.round(lerp(4, 30, f));
  for (let y = topY; y < m - 1; y += 4) { const w = hw(y) - 3; for (let x = cx - w + ((y >> 2) % 2) * 2; x <= cx + w - 2; x += 5) pieza(x + 1, y + 1, hex(PZ[(x * 7 + y * 3) % 6 | 0]), x + y); }
  for (let j = 0; j < pileH; j += 4) { const y = by - 10 - j, w = Math.min(hw(y) - 3, Math.round((pileH - j) * 1.1) + 2); for (let x = cx - w + ((j >> 2) % 2) * 2; x <= cx + w - 2; x += 5) pieza(x + 1, y, hex(PZ[((x * 5 + j * 3) % 6 + 6) % 6 | 0]), x + j); }
  if (f < 1) for (let k = 0; k < 5; k++) { const u = (t * (2.2 + f * 2.5) + k / 5) % 1, y = lerp(m - 2, by - 12 - pileH, u); pieza(cx + Math.round(Math.sin(k * 2.1 + u * 3) * (u * 4)), y, hex(PZ[k % 6]), k); }
  // el brillo que recorre el cristal
  { const g = ((t * 0.5) % 1) * 120 - 20; for (let y = ty + 10; y < by - 10; y++) { const w = hw(y), x = Math.round(cx - w + g - (y - ty) * 0.4); if (x > cx - w + 1 && x < cx + w - 1) R.pset(x, y, mez(R.pget(x, y), BL, 0.6)); } }
  // el puzle de doce piezas: el cuadro nuestro del barco, que se completa a toda prisa
  Z.cuadro(R, tx + 42, ty2 + 72, { n: 3, s: 3 });
  const llega = (k) => lerp(P6 + 0.5, na(29.25), ((k + 1) / 12) ** 0.85), ORD = [5, 0, 10, 3, 7, 1, 8, 11, 2, 6, 9, 4];
  ORD.forEach((q, k) => { const x0 = tx + (q % 4) * 21, y0 = ty2 + Math.floor(q / 4) * 24, tk = llega(k);
    if (t < tk) { for (let y = y0; y < y0 + 24; y++) for (let x = x0; x < x0 + 21; x++) R.pset(x, y, x === x0 || y === y0 ? C6.tapaS : hh(x, y, 130) < 0.12 ? C6.tapaS : hh(x >> 1, y, 131) < 0.08 ? C6.tapaL : C6.tapa); R.icono('?', x0 + 8, y0 + 8, C6.tapaS, C6.tapaL, 1); }
    else { for (let i = 0; i < 21; i++) { R.pset(x0 + i, y0 + (i > 7 && i < 13 ? -1 - (i > 8 && i < 12 ? 1 : 0) : 0) + (q < 4 ? 1 : 0), K); } for (let j = 0; j < 24; j++) R.pset(x0 + (j > 8 && j < 15 ? 1 + (j > 9 && j < 14 ? 1 : 0) : 0) - (q % 4 === 0 ? -1 : 0), y0 + j, K); const u = (t - tk) / 0.25; if (u < 1) halo(x0 + 10, y0 + 12, 16, BL, 0.7 * (1 - u)); }
    // la pieza que vuela del reloj a su hueco
    const v = (t - (tk - 0.38)) / 0.38; if (v > 0 && v < 1) { const px = lerp(cx + 8, x0 + 10, v), py = lerp(by - 16, y0 + 12, v) - Math.sin(v * Math.PI) * 34; R.rect(px - 5, py - 5, px + 5, py + 5, K); R.rect(px - 4, py - 4, px + 4, py + 4, hex(PZ[q % 6])); R.rect(px - 4, py - 4, px + 4, py - 3, mez(hex(PZ[q % 6]), BL, 0.5)); R.rect(px + 5, py - 1, px + 7, py + 1, K); R.pset(px + 5, py, hex(PZ[q % 6])); } });
  R.rect(tx - 1, ty2 - 1, tx + 84, ty2 - 1, K); R.rect(tx - 1, ty2 + 72, tx + 84, ty2 + 72, K); R.rect(tx - 1, ty2 - 1, tx - 1, ty2 + 72, K); R.rect(tx + 84, ty2 - 1, tx + 84, ty2 + 72, K);
  const hecho = t > na(29.25);
  if (hecho) { const u = (t - na(29.25)) / 0.5; if (u < 1) halo(tx + 42, ty2 + 36, 70, BL, 0.5 * (1 - u)); R.disco(tx + 84, ty2, 11, K); R.disco(tx + 84, ty2, 10, hex('#1e5a34')); T.visto(R, tx + 78, ty2 - 6, 1); for (let k = 0; k < 4; k++) if ((Math.floor(t * 6) + k) % 3 === 0) destello(tx + 8 + k * 24, ty2 + 6 + (k % 2) * 56, 2, BL); }
  // la mano de Preiss tamborilea en la mesa… y da un respingo
  const ent = ease(tramo(t, P6 + 0.2, P6 + 0.8)), sus = hecho ? Math.sin(Math.min(1, (t - na(29.25)) * 3) * Math.PI) * 9 : 0, tam = hecho && t > na(29.25) + 0.4 ? 0 : Math.abs(Math.sin(t * 11)) * 2;
  const wx = 286, wy = Math.round(172 + (1 - ent) * 30 - tam - sus);
  T.brazo(R, wx + 22, 190, wx, wy, '#6a4a3a', -1, { codo: [wx + 24, wy + 14] });
  if (hecho) R.icono('!', 262, 138 - (Math.floor(t * 6) % 2), ROJO, K, 2);
};
const efectos = [[pa(2.55), 'toc'], [pa(2.95), 'boing'], [pa(4.5), 'puerta'], [pa(5.25), 'arranque'],
  [pa(6.3), 'coche'], [pa(8.2), 'golpecito'], [pa(9.55), 'pop'],
  [pa(10.1), 'golpecito'], [pa(11.0), 'brillo'], [pa(12.45), 'toc'], [pa(13.0), 'golpecito'], [pa(13.85), 'golpecito'],
  [pa(14.85), 'palmada'], [pa(15.35), 'palmada'], [pa(17.63), 'brillo'], [pa(19.2), 'puerta'],
  [na(20.2), 'lapiz'], [na(21.4), 'tic'], [na(22.1), 'pop'], [na(24.27), 'pop'], [na(26.05), 'aviso'],
  [P6 + 0.5, 'tic'], [na(27.6), 'tic'], [na(28.8), 'tic'], [na(29.25), 'brillo'], [na(29.6), 'aviso']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, cartela: '1981', año: 1981 });
''')
