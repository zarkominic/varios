import re

E = {}

# Grupo 6 del ep29: pr-hapgood, pr-carta y pr-libro (acto 4, el mito: el profesor, la carta y el libro).
# En los cuerpos, @s@ es un instante en segundos de la voz inglesa (palabras de linea.json, relativas al inicio de la
# escena) y se escribe en('marca', fracción). H (lo común) se antepone a cada cuerpo.
MARCAS = {'pr-hapgood': ('hapgood', 0.9, 19.824), 'pr-carta': ('carta', 1.5, 19.07), 'pr-libro': ('libro', 0.5, 23.26)}

H = r'''
const K = hex('#1c1222');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const umb = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const suave = (u) => { u = cl(u); return u * u * (3 - 2 * u); };
const H_ = (s) => hex(s);
// lo fijo de un plano, pintado una vez en su búfer (sin R.usar() a secas: rompe los fundidos)
const fijo = (pinta) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); } R.copiar(b); }; };
// degradado vertical tramado entre varios colores
const degr = (x0, y0, x1, y1, cols) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const v = (y - y0) / Math.max(1, y1 - y0) * n, k = Math.min(n - 1, Math.floor(v)), f = v - k;
  for (let x = x0; x <= x1; x++) R.pset(x, y, f > umb(x, y) ? cols[k + 1] : cols[k]); } };
// moteado: puntos más claros y más oscuros sobre un color
const moteado = (x0, y0, x1, y1, c, osc, cla, d = 0.08, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = hh(x, y, k); R.pset(x, y, v < d ? osc : v > 1 - d * 0.6 ? cla : c); } };
// tablas de madera horizontales (vetas, nudos y juntas)
const tablas = (x0, y0, x1, y1, alto, cols, k = 0) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / alto), jy = (y - y0) % alto;
  for (let x = x0; x <= x1; x++) { const corte = Math.floor((x + hh(fila, 3, k) * 90) / 70), base = cols[(fila + corte) % 2 ? 1 : 2];
    let c = jy === 0 ? cols[0] : ((x + hh(fila, corte, k) * 90) % 70) < 1 ? cols[0] : base;
    const veta = Math.sin(x * 0.09 + fila * 2.1 + Math.sin(x * 0.023 + fila) * 3 + jy * 0.9);
    if (jy && c !== cols[0] && veta > 0.86) c = cols[1 + ((fila + corte + 1) % 2)];
    if (jy && c !== cols[0] && hh(x >> 1, y, k + 5) > 0.985) c = cols[0];
    if (jy === 1 && c !== cols[0]) c = cols[3] ?? c; R.pset(x, y, c); } } };
// nube de tres tonos con discos (respeta R.recorte)
const nubeD = (cx, cy, w, c3) => { const b = [[0, 0, w * 0.3], [-w * 0.3, w * 0.07, w * 0.22], [w * 0.3, w * 0.06, w * 0.24], [-w * 0.08, -w * 0.12, w * 0.24]];
  for (const [dx, dy, r] of b) R.disco(cx + dx, cy + dy + 1, r, c3[0]); for (const [dx, dy, r] of b) R.disco(cx + dx, cy + dy, r, c3[1]); for (const [dx, dy, r] of b) R.disco(cx + dx - 1, cy + dy - 1.5, r * 0.75, c3[2]); };
const NUBE = ['#9eb2cc', '#dfe8f2', '#ffffff'].map(H_);
const pajaro = (x, y, t, k, c = K) => { const a = Math.sin(t * 10 + k) > 0; R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 1 : -1), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x + 2, y - (a ? 1 : -1), c); };
// aclara (o tiñe) un polígono mezclando con un color: haces de luz
const haz = (pts, col, a) => R.poligono(pts, (x, y) => mez(R.pget(x, y), col, a * (0.75 + 0.25 * umb(x, y))));
// lomos de libros en una balda, de x0 a x1, apoyados en y (sin letras: bandas y filetes)
const LOMOS = ['#7a2a2a', '#2a4a6a', '#3a6a3a', '#8a6a2a', '#5a3a6a', '#a8542a', '#2a5a5a', '#6a2a3a', '#c8a050', '#3a3a5a'].map(H_);
const lomos = (x0, x1, y, alto, k) => { let x = x0; while (x < x1 - 2) { const w = 3 + Math.floor(hh(x, k, 1) * 3), hgt = alto - Math.floor(hh(x, k, 2) * 6), c = LOMOS[Math.floor(hh(x, k, 3) * LOMOS.length)];
  if (hh(x, k, 4) > 0.9 && x + 12 < x1) { R.rect(x, y - 3, x + 11, y, K); R.rect(x, y - 2, x + 10, y - 1, c); R.rect(x, y - 3, x + 10, y - 3, mez(c, H_('#ffffff'), 0.3)); x += 13; continue; }
  R.rect(x, y - hgt, x + w - 1, y, K); R.rect(x, y - hgt + 1, x + w - 2, y, c); R.rect(x, y - hgt + 1, x, y, mez(c, H_('#ffffff'), 0.25));
  for (const f of [3, hgt - 4]) R.rect(x, y - f, x + w - 2, y - f, hh(x, k, 5) > 0.5 ? H_('#d8b860') : mez(c, K, 0.4)); x += w; } };
// marco dorado o de madera con su bisel
const marco = (x0, y0, x1, y1, g, c) => { R.rect(x0, y0, x1, y1, K); for (let i = 1; i <= g; i++) { const cc = i === 1 ? c[0] : i === g ? c[2] : c[1]; R.rect(x0 + i, y0 + i, x1 - i, y0 + i, mez(cc, H_('#ffffff'), 0.25)); R.rect(x0 + i, y1 - i, x1 - i, y1 - i, mez(cc, K, 0.3)); R.rect(x0 + i, y0 + i, x0 + i, y1 - i, cc); R.rect(x1 - i, y0 + i, x1 - i, y1 - i, mez(cc, K, 0.2)); } };
const ORO = ['#8a6420', '#d8a838', '#f6e08a'].map(H_), NOGAL = ['#3a2414', '#6a4428', '#8a5a34'].map(H_);
// vapor que sube de una taza
const vapor = (x, y, t, k = 0) => { for (let i = 0; i < 9; i++) { const u = ((t * 0.5 + i / 9 + k) % 1), px = Math.round(x + Math.sin(u * 7 + i + t) * 2.2 * u), py = Math.round(y - u * 18); if (hh(i, Math.floor(t * 3), k) > 0.25) R.pset(px, py, mez(R.pget(px, py), H_('#ffffff'), 0.55 * (1 - u))); } };
// la hoja que vuela de a a b (u 0–1) con su vuelo en arco y su aleteo
const hojaVuela = (a, b, u, alto, w = 6, h = 4, c = H_('#f6f2e6')) => { const x = lerp(a[0], b[0], u), y = lerp(a[1], b[1], u) - Math.sin(u * Math.PI) * alto, s = Math.round(Math.sin(u * 18) * 1.5);
  R.poligono([[x - w / 2, y - h / 2 + s], [x + w / 2, y - h / 2 - s], [x + w / 2, y + h / 2 - s], [x - w / 2, y + h / 2 + s]], c); R.linea(x - w / 2, y + h / 2 + s + 1, x + w / 2, y + h / 2 - s + 1, mez(c, K, 0.45)); };
// el libro de Hapgood de 1966 (cerrado, de frente, 10 × 13 · s): tapa azul marino con el filete de oro, el mapa y una carabela
const libroHG = (x, y, s = 1) => { const X = (i) => Math.round(x + i * s), Y = (j) => Math.round(y + j * s);
  R.rect(X(-5), Y(-13), X(5), Y(0), K); R.rect(X(-4), Y(-12), X(4), Y(-1), H_('#1e3a6a')); R.rect(X(-4), Y(-12), X(-4), Y(-1), H_('#142850'));
  R.rect(X(-3), Y(-11), X(3), Y(-11), ORO[1]); R.rect(X(-3), Y(-2), X(3), Y(-2), ORO[1]);
  R.rect(X(-2), Y(-9), X(3), Y(-4), H_('#e8d4a4')); R.pset(X(-1), Y(-8), H_('#3a6a3a')); R.pset(X(-1), Y(-7), H_('#3a6a3a')); R.pset(X(0), Y(-6), H_('#3a6a3a')); R.pset(X(1), Y(-5), H_('#3a6a3a'));
  R.pset(X(2), Y(-8), H_('#f6f0de')); R.pset(X(2), Y(-7), H_('#f6f0de')); R.pset(X(2), Y(-6), H_('#8a5a2e')); R.pset(X(3), Y(-6), H_('#8a5a2e')); };
// un sobre de correo aéreo (franjas rojas y azules en el borde, el sello con un avión)
const sobre = (x, y, w = 10, h = 7) => { R.rect(x - 1, y - 1, x + w, y + h, K); for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) { const borde = i === 0 || j === 0 || i === w - 1 || j === h - 1;
  R.pset(x + i, y + j, borde ? (((i + j) >> 1) % 2 ? H_('#c83a3a') : H_('#2a4a9a')) : H_('#f6f2e6')); } R.rect(x + w - 4, y + 1, x + w - 2, y + 3, H_('#3a6aa8')); R.pset(x + w - 3, y + 2, H_('#ffffff')); R.linea(x + 2, y + 3, x + 5, y + 3, H_('#7a7a84')); R.linea(x + 2, y + 5, x + 6, y + 5, H_('#7a7a84')); };
// una tetera de loza (x, y = el centro de abajo) con la tapa que salta (o.salta px)
const tetera = (x, y, t, salta = 0) => { const AZ = H_('#e8eef6'), AZS = H_('#a8b8d0'), FL = H_('#3a6aa8');
  R.linea(x - 9, y - 7, x - 15, y - 13, K); R.linea(x - 9, y - 6, x - 14, y - 12, AZS); R.linea(x - 10, y - 6, x - 16, y - 12, K); R.pset(x - 16, y - 13, K);
  for (let j = -2; j <= 2; j++) { R.pset(x + 10, y - 7 + j, K); R.pset(x + 11, y - 7 + j, K); } R.pset(x + 9, y - 10, K); R.pset(x + 9, y - 4, K); R.rect(x + 10, y - 9, x + 10, y - 5, AZS);
  R.disco(x, y - 7, 9.5, K); R.disco(x, y - 7, 8.6, (px, py) => py > y - 4 ? AZS : AZ); R.rect(x - 7, y, x + 7, y, K);
  for (const [i, j] of [[-4, -8], [0, -6], [4, -8], [-2, -10], [2, -10]]) { R.pset(x + i, y + j, FL); R.pset(x + i + 1, y + j, FL); } R.pset(x - 4, y - 12, H_('#ffffff')); R.pset(x - 5, y - 11, H_('#ffffff'));
  const ty = y - 15 - salta; R.rect(x - 5, ty, x + 5, ty + 1, K); R.rect(x - 4, ty, x + 4, ty, AZ); R.rect(x - 1, ty - 2, x + 1, ty - 1, K); R.pset(x, ty - 2, AZ); };
// un gato atigrado que duerme (o salta: u 0–1)
const gatoD = (x, y, t, u = 0) => { const N = H_('#d88a3a'), NS = H_('#a8622a'), dy = -Math.round(Math.sin(cl(u) * Math.PI) * 10);
  const cy = y + dy; R.disco(x, cy - 3, 4.5, K); R.disco(x, cy - 3, 3.6, N); R.disco(x + 5, cy - 4, 3, K); R.disco(x + 5, cy - 4, 2.2, N);
  R.pset(x + 4, cy - 7, K); R.pset(x + 7, cy - 7, K); R.pset(x + 4, cy - 6, N); R.pset(x + 7, cy - 6, N); for (const i of [-2, 0, 2]) R.pset(x + i, cy - 5, NS);
  if (u > 0 && u < 1) { R.pset(x + 4, cy - 4, K); R.pset(x + 6, cy - 4, K); } else R.linea(x + 4, cy - 4, x + 6, cy - 4, NS);
  const c = Math.sin(t * 2) * 2; R.linea(x - 4, cy - 1, x - 8, cy - 2 + c, K); R.linea(x - 4, cy - 2, x - 8, cy - 3 + c, N); };
'''


def cuerpo(id_, s):
    k, a, b = MARCAS[id_]
    s = re.sub(r'@(-?[\d.]+)@', lambda m: "en('%s', %.4f)" % (k, (float(m.group(1)) - a) / (b - a)), s)
    return H + s


# ───────────────────────────────────────────────── PR-HAPGOOD ─────────────────────────────────────────────────
E['pr-hapgood'] = ('Hapgood', '''// PR-HAPGOOD (frase 15), 1930–1956, sin cartela. Cuatro planos; la voz inglesa manda:
// 1. («For decades… treasure for historians. Until in the 1950s») LOCAL la sala de lectura de un museo: la copia del
//    mapa de 1513 enmarcada con su lámpara de cuadro, que se enciende en «map»; dos historiadores la estudian (uno con
//    la lupa, otro toma notas) y en «treasure» brilla; el calendario de pared deja caer hojas de año en año, 1931…1955,
//    y un tercero entra con un libro y la señala; por la ventana, nubes, gaviotas y cúpulas; el péndulo del reloj.
// 2. (corte en «an American history professor») el aula del college: Hapgood entra con un montón de copias, en «gave
//    it to his students» reparte una a cada pupitre (vuelan y caen en cada uno), señala la costa de la pizarra y en
//    «New Hampshire / puzzle» la alumna levanta un «?».
// 3. (corte en «puzzle») el pupitre de cerca (gag 5): el papel de calco se desliza solo con la brisa de la ventana y en
//    «coasts» se posa justo sobre la costa; una mano con lápiz repasa el calco y el trazo resulta ser… una tetera,
//    como la de verdad que humea sobre el atlas, cuya tapa da un salto en «maps».
// 4. (corte en «And at the bottom») el pergamino, la costa del sur: una mano con el lápiz baja por la costa de
//    Sudamérica y en «suddenly turns east» tuerce de golpe al este; en «they saw something else» la costa torcida
//    brilla en oro, se escarcha y empiezan a caer copos.''', cuerpo('pr-hapgood', r'''
const P2 = @5.41@, P3 = @11.03@, P4 = @14.88@;
// ── 1 · la sala de lectura (LOCAL) ──
const sala = fijo(() => {
  // el techo: la moldura de nogal
  R.rect(0, 0, 319, 5, NOGAL[0]); R.rect(0, 4, 319, 4, NOGAL[2]); R.rect(0, 6, 319, 6, NOGAL[1]);
  // la pared de yeso con su moteado; papel pintado de rayas con flor de lis hasta la librería
  moteado(0, 7, 319, 99, H_('#d8c49a'), H_('#c8b088'), H_('#e6d6b0'), 0.07, 1);
  for (let y = 22; y <= 99; y++) for (let x = 0; x < 196; x++) { if (x % 10 < 3) R.pset(x, y, mez(R.pget(x, y), H_('#a88a5a'), 0.28)); if (x % 10 === 6 && y % 12 === 5) { R.pset(x, y, H_('#b89a6a')); R.pset(x, y - 1, H_('#b89a6a')); R.pset(x - 1, y, H_('#b89a6a')); R.pset(x + 1, y, H_('#b89a6a')); } }
  R.rect(0, 20, 319, 21, NOGAL[1]); R.rect(0, 20, 319, 20, NOGAL[2]);
  // el friso de nogal con cuarterones
  R.rect(0, 100, 319, 140, H_('#6a4024')); R.rect(0, 100, 319, 102, NOGAL[2]); R.rect(0, 100, 319, 100, H_('#a87448')); R.rect(0, 103, 319, 103, NOGAL[0]);
  for (let x0 = 4; x0 < 316; x0 += 40) { R.rect(x0, 108, x0 + 32, 134, H_('#5e381e')); R.rect(x0, 108, x0 + 32, 108, NOGAL[0]); R.rect(x0, 108, x0, 134, NOGAL[0]); R.rect(x0, 134, x0 + 32, 134, NOGAL[2]); R.rect(x0 + 32, 108, x0 + 32, 134, NOGAL[2]);
    for (let y = 110; y < 133; y++) for (let x = x0 + 2; x < x0 + 31; x++) if (Math.sin(x * 0.7 + Math.sin(y * 0.15 + x0) * 2) > 0.8) R.pset(x, y, H_('#704626')); }
  R.rect(0, 140, 319, 145, NOGAL[0]); R.rect(0, 141, 319, 141, NOGAL[1]);
  // el suelo de espiga
  for (let y = 146; y <= 179; y++) for (let x = 0; x <= 319; x++) { const cx = Math.floor(x / 10), v = cx % 2 ? y + x : y - x + 400, idx = Math.floor(v / 6);
    const w = hh(cx, idx, 7); let c = w < 0.33 ? H_('#9a6a3e') : w < 0.66 ? H_('#8a5c34') : H_('#a8784a'); if (v % 6 === 0 || x % 10 === 0) c = H_('#5a3a20'); R.pset(x, y, c); }
  // la alfombra roja con su cenefa
  R.poligono([[64, 156], [256, 156], [270, 178], [50, 178]], (x, y) => { const b = y < 159 || y > 175 || x < 58 + (178 - y) * 0.6 + 4 || x > 262 - (178 - y) * 0.6 - 4; if (b) return (x + y) % 3 ? H_('#c8a050') : H_('#8a6420');
    const d = Math.abs(((x - 160) % 24 + 24) % 24 - 12) + Math.abs(y - 167); return d < 5 ? H_('#2a3a5a') : d < 7 ? H_('#d8b860') : (x + y) % 5 ? H_('#8a2a2a') : H_('#7a2424'); });
  for (let x = 52; x < 270; x += 3) R.pset(x, 179, H_('#f0e6cc'));
  // la ventana alta (el cielo y la ciudad se pintan en cada fotograma): cortinas, barra y alféizar
  R.rect(8, 15, 70, 17, ORO[0]); R.rect(8, 15, 70, 15, ORO[2]);
  R.rect(12, 22, 66, 98, K); R.rect(10, 98, 68, 102, H_('#e8dcc0')); R.rect(10, 102, 68, 102, H_('#a89878'));
  for (const [a, b] of [[4, 16], [62, 74]]) for (let x = a; x <= b; x++) for (let y = 17; y <= 108; y++) { const f = Math.sin((x - a) * 1.1 + (a > 30 ? 1 : 0)); R.pset(x, y, f > 0.5 ? H_('#3a6a4a') : f > -0.3 ? H_('#2a5238') : H_('#1e3e2a')); }
  for (const a of [4, 62]) { R.rect(a, 60, a + 12, 62, ORO[1]); R.rect(a, 60, a + 12, 60, ORO[2]); }
  // el reloj de pared (el péndulo va aparte)
  R.rect(282, 52, 306, 100, K); R.rect(283, 53, 305, 99, NOGAL[1]); R.rect(283, 53, 305, 55, NOGAL[2]); R.disco(294, 64, 8, K); R.disco(294, 64, 7, H_('#f6f0de'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(Math.round(294 + Math.cos(a) * 5.6), Math.round(64 + Math.sin(a) * 5.6), K); }
  R.rect(286, 74, 302, 96, H_('#2a1810')); R.rect(287, 75, 288, 95, H_('#5a4a3a'));
  // la librería de la derecha
  R.rect(198, 22, 274, 140, K); R.rect(199, 23, 273, 139, NOGAL[0]); R.rect(199, 23, 201, 139, NOGAL[2]); R.rect(271, 23, 273, 139, NOGAL[1]);
  for (const y of [50, 78, 106, 134]) { R.rect(202, y, 270, y + 2, NOGAL[2]); R.rect(202, y, 270, y, H_('#a87448')); }
  lomos(203, 270, 49, 22, 1); lomos(203, 250, 77, 22, 2); lomos(203, 270, 105, 22, 3); lomos(203, 270, 133, 22, 4);
  R.disco(259, 70, 5, K); R.disco(259, 70, 4, H_('#e8e4dc')); R.rect(255, 74, 263, 77, K); R.rect(256, 74, 262, 76, H_('#c8c4bc'));   // un busto de yeso
  R.rect(204, 23, 270, 25, NOGAL[1]);
  // en la pared, un grabado de los dos hemisferios en su marco
  marco(112, 28, 188, 70, 3, NOGAL); R.rect(116, 32, 184, 66, H_('#efe6cc'));
  for (const cx of [133, 167]) { R.disco(cx, 49, 15, H_('#5a4a3a')); R.disco(cx, 49, 14, H_('#dcd0b0')); for (let k = -2; k <= 2; k++) { R.linea(cx + k * 6, 36, cx + k * 6, 62, H_('#c8bc9c')); R.linea(cx - 13, 49 + k * 6, cx + 13, 49 + k * 6, H_('#c8bc9c')); } }
  R.poligono([[124, 42], [134, 38], [138, 48], [130, 58], [126, 52]], H_('#a89870')); R.poligono([[160, 40], [174, 42], [170, 50], [176, 56], [164, 58], [158, 48]], H_('#a89870'));
  // el caballete con la copia del mapa de 1513 en su marco dorado
  R.linea(128, 166, 146, 90, NOGAL[0]); R.linea(129, 166, 147, 90, NOGAL[1]); R.linea(172, 166, 154, 90, NOGAL[0]); R.linea(171, 166, 153, 90, NOGAL[1]); R.linea(150, 86, 150, 160, NOGAL[0]);
  marco(113, 94, 187, 142, 4, ORO); R.rect(117, 98, 183, 138, H_('#efe6cc')); T.PIEZAS_PR.pergamino(R, 150, 139, { s: 2 });
  R.rect(110, 142, 190, 145, K); R.rect(111, 142, 189, 143, NOGAL[2]);
  // la lámpara de cuadro (el brazo de latón) encima del marco
  R.rect(132, 86, 168, 89, K); R.rect(133, 87, 167, 88, ORO[1]); R.rect(133, 87, 167, 87, ORO[2]); R.rect(149, 89, 151, 94, ORO[0]);
  // el calendario de pared (las hojas se pintan aparte) y la consola con el globo
  R.rect(80, 26, 108, 66, K); R.rect(81, 27, 107, 65, H_('#e8e0cc')); R.rect(93, 23, 95, 27, K);
  R.rect(78, 92, 106, 95, K); R.rect(79, 92, 105, 93, NOGAL[2]); R.rect(82, 96, 83, 140, NOGAL[0]); R.rect(101, 96, 102, 140, NOGAL[0]);
  R.disco(92, 82, 8, K); R.disco(92, 82, 7, H_('#3a6aa8')); R.rect(88, 79, 92, 81, H_('#6a9a4a')); R.rect(93, 84, 96, 86, H_('#c8a050')); R.rect(91, 90, 93, 92, ORO[0]); R.pset(90, 78, H_('#ffffff'));
});
const p1 = (t) => {
  sala();
  // por la ventana: el cielo de otoño, nubes a dos velocidades, gaviotas y la silueta de cúpulas y minaretes
  R.recorte([13, 23, 65, 97]);
  degr(13, 23, 65, 97, ['#6a9ad8', '#8ab4e6', '#b4d0ee', '#e4e6dc'].map(H_));
  nubeD(((t * 3 + 20) % 90) - 10, 38, 20, NUBE); nubeD(((t * 6 + 60) % 100) - 15, 54, 14, NUBE);
  for (let k = 0; k < 2; k++) pajaro(Math.round(((t * (9 + k * 4) + k * 40) % 80) - 6), 44 + k * 9 + Math.round(Math.sin(t + k) * 2), t, k, H_('#4a4a5a'));
  const SIL = H_('#6a7488'), SIL2 = H_('#4e5870');
  R.disco(30, 80, 11, SIL); R.poligono([[13, 97], [13, 82], [44, 82], [52, 86], [65, 86], [65, 97]], SIL); R.linea(30, 66, 30, 69, SIL);
  for (const mx of [16, 50]) { R.poligono([[mx - 2, 84], [mx - 2, 60], [mx, 54], [mx + 2, 60], [mx + 2, 84]], SIL2); R.rect(mx - 3, 66, mx + 3, 67, SIL2); }
  for (let x = 13; x <= 65; x++) if (x % 5 === 0) R.pset(x, 90, H_('#e8d890'));
  R.recorte(null);
  R.rect(38, 22, 39, 98, K); R.rect(12, 58, 66, 59, K); R.rect(37, 22, 37, 98, H_('#e8dcc0')); R.rect(12, 57, 66, 57, H_('#e8dcc0'));
  // el haz de sol que entra por la ventana, con motas
  haz([[14, 99], [64, 99], [176, 178], [96, 178]], H_('#fff0c8'), 0.16);
  for (let k = 0; k < 16; k++) { const u = (t * 0.05 + hh(k, 1)) % 1, x = Math.round(lerp(30, 140, hh(k, 2)) + u * 20), y = Math.round(100 + u * 70 + Math.sin(t + k) * 3); if (Math.sin(t * 2 + k) > -0.3) R.pset(x, y, H_('#fff6dc')); }
  // el péndulo del reloj
  const pa = Math.sin(t * Math.PI) * 0.35, px = Math.round(294 + Math.sin(pa) * 12), py = Math.round(76 + Math.cos(pa) * 12);
  R.linea(294, 76, px, py, ORO[1]); R.disco(px, py, 2.5, ORO[0]); R.disco(px - 0.5, py - 0.5, 1.5, ORO[2]);
  const ha = t * 0.5, ma = t * 3; R.linea(294, 64, Math.round(294 + Math.sin(ha) * 3), Math.round(64 - Math.cos(ha) * 3), K); R.linea(294, 64, Math.round(294 + Math.sin(ma) * 5), Math.round(64 - Math.cos(ma) * 5), K);
  // el calendario: de 1931 a 1955 (cada cambio de año, la hoja vieja sale volando)
  const ua = tramo(t, 0.35, @4.45@), an = Math.round(lerp(1931, 1955, ua)), fase = (ua * 24) % 1;
  R.rect(81, 27, 107, 33, H_('#b83a2a')); R.rect(81, 33, 107, 33, H_('#8a2a1e')); for (const rx of [86, 101]) R.rect(rx, 25, rx + 1, 29, H_('#7a7a84'));
  R.numero(String(an), 95, 45, { centro: true, color: K, sombra: false });
  for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) R.rect(84 + i * 3, 49 + j * 4, 85 + i * 3, 50 + j * 4, (i + j * 7) % 7 === 6 ? H_('#c83a3a') : H_('#7a7a84'));
  if (ua > 0 && ua < 1 && fase < 0.6) { const f = fase / 0.6, hx = Math.round(94 + f * 26), hy = Math.round(46 + f * 70 - Math.sin(f * 3) * 8), s = Math.round(Math.sin(f * 12) * 3);
    R.poligono([[hx - 10, hy - 12 + s], [hx + 10, hy - 12 - s], [hx + 9, hy + 10 - s], [hx - 9, hy + 10 + s]], mez(H_('#e8e0cc'), H_('#ffffff'), 0.3)); R.rect(hx - 6, hy - 9, hx + 6, hy - 8, H_('#b83a2a')); }
  // la lámpara del cuadro se enciende en «map» y el mapa brilla en «treasure»
  const luz = t > @1.66@ ? 1 : 0;
  if (luz) haz([[136, 90], [164, 90], [190, 142], [110, 142]], H_('#fff4c8'), 0.15 + 0.02 * Math.sin(t * 9));
  const br = tramo(t, @2.16@, @2.5@) - tramo(t, @3.2@, @3.9@);
  if (br > 0) for (let k = 0; k < 7; k++) { const a = t * 1.5 + k * 0.9, x = Math.round(150 + Math.cos(a) * 30 * (0.5 + hh(k, 3) * 0.6)), y = Math.round(118 + Math.sin(a * 1.3) * 18), on = Math.sin(t * 8 + k * 2) > 0;
    if (on) { R.pset(x, y, H_('#ffffff')); R.pset(x - 1, y, ORO[2]); R.pset(x + 1, y, ORO[2]); R.pset(x, y - 1, ORO[2]); R.pset(x, y + 1, ORO[2]); } }
  // los historiadores: el de la barba negra con la lupa, el de la barba blanca con su cuaderno
  const lx = 116 + Math.round(Math.sin(t * 1.3) * 2), ly = 142 + Math.round(Math.cos(t * 1.1) * 2);
  const k1 = R.actor(EL.kahle, 96, 162, t, { dir: 1, sostiene: [lx, ly], sonrisa: t > @2.16@ });
  T.PIEZAS_PR.lupa(R, k1.mano[0] + 2, k1.mano[1] + 5);
  const nota = Math.floor(t * 4) % 2;
  const d1 = R.actor(EL.deissmann, 192, 164, t, { dir: -1, sostiene: true, habla: t > @2.6@ && t < @3.6@ && Math.sin(t * 7) > 0 });
  R.rect(d1.mano[0] - 7, d1.mano[1] - 3, d1.mano[0] - 1, d1.mano[1] + 3, K); R.rect(d1.mano[0] - 6, d1.mano[1] - 2, d1.mano[0] - 2, d1.mano[1] + 2, H_('#f6f0de'));
  R.rect(d1.mano[0] - 5, d1.mano[1] - 1 + nota, d1.mano[0] - 3, d1.mano[1] - 1 + nota, H_('#7a7a84'));
  // el tercero entra con un libro bajo el brazo y señala el mapa en «1950s»
  const ue = tramo(t, @2.3@, @3.9@), xe = Math.round(lerp(-20, 58, ue));
  const s1 = R.actor(EL.senor30, xe, 172, t, { dir: 1, anda: ue > 0 && ue < 1, sostiene: t < @4.3@, dedo: t >= @4.3@, sonrisa: t > @4.6@ });
  if (t < @4.3@) libroHG(s1.mano[0] + 1, s1.mano[1] + 6);
};
// ── 2 · el aula ──
const hojas = [[66, 150], [176, 150], [284, 150]], salidas = [@8.17@, @8.6@, @9.05@];
const p2 = (t) => {
  const o = { encuadre: 'aula' }; T.america(R, t, o);
  const u = tramo(t, P2 + 0.05, @7.4@), x = Math.round(lerp(262, 168, u));
  const quedan = 3 - salidas.filter((s) => t > s).length, señala = t > @9.6@ && t < @11.0@;
  const hp = R.actor(EL.hapgood, x, 132, t, { dir: señala ? -1 : -1, anda: u > 0 && u < 1, sostiene: !señala && quedan > 0, dedo: señala, sonrisa: t > @8.1@, habla: t > @7.5@ && t < @8.1@ && Math.sin(t * 8) > 0 });
  if (!señala && quedan > 0) for (let k = 0; k < quedan + 1; k++) { R.rect(hp.mano[0] - 6, hp.mano[1] - k, hp.mano[0] + 2, hp.mano[1] - k, k === quedan ? H_('#c8c0a8') : H_('#f6f2e6')); R.pset(hp.mano[0] - 7, hp.mano[1] - k, K); }
  // los alumnos detrás de sus pupitres: miran y reciben su copia
  const llega = (k) => t > salidas[k] + 0.45;
  R.actor(EL.alumno1, 58, 155, t, { dir: 1, sonrisa: llega(0), sorpresa: t > salidas[0] + 0.3 && t < salidas[0] + 0.7 });
  R.actor(EL.alumna1, 184, 155, t, { dir: -1, sonrisa: llega(1) && t < @10.3@, dedo: t > @10.3@ });
  R.actor(EL.alumno2, 276, 155, t, { dir: -1, sonrisa: llega(2), habla: t > @9.8@ && Math.sin(t * 6) > 0.3 });
  T.americaDelante(R, t, o);
  // las copias vuelan de la mano a cada pupitre y se quedan allí
  hojas.forEach((h, k) => { const v = tramo(t, salidas[k], salidas[k] + 0.45);
    if (v > 0 && v < 1) hojaVuela([hp.mano[0], hp.mano[1]], h, v, 24, 8, 5);
    if (v >= 1) { R.rect(h[0] - 6, h[1] - 2, h[0] + 6, h[1] + 3, K); R.rect(h[0] - 5, h[1] - 1, h[0] + 5, h[1] + 2, H_('#efe2c0')); R.linea(h[0] - 3, h[1] - 1, h[0] - 1, h[1] + 2, H_('#3a6a3a')); R.rect(h[0] + 1, h[1], h[0] + 4, h[1] + 1, H_('#c8a050')); } });
  // la alumna levanta un «?»: el rompecabezas
  if (t > @10.3@) R.bocadillo(194, 118 - Math.round(tramo(t, @10.3@, @10.5@) * 2), { icono: '?' });
};
// ── 3 · el pupitre de cerca: el calco (gag 5) ──
const p3 = (t) => {
  const cal = suave(tramo(t, P3 + 0.1, @12.45@)), dib = t < @13.4@ ? 'costa' : 'tetera';
  const o = { encuadre: 'aula', camara: 'pupitre', calco: cal, dibujo: dib };
  T.america(R, t, o);
  const a = R.actor(EL.alumna1, 228, 106, t, { dir: -1, sorpresa: t > @12.45@ && t < @13.3@, sonrisa: t > @13.6@ });
  const g = T.americaDelante(R, t, o);
  // la brisa: hojas de arce que entran por la ventana y empujan el calco
  for (let k = 0; k < 4; k++) { const v = tramo(t, P3 + k * 0.25, P3 + 1.1 + k * 0.25); if (v <= 0 || v >= 1) continue; const lx = Math.round(lerp(250, 120 - k * 10, v)), ly = Math.round(40 + k * 14 + v * 60 + Math.sin(v * 12 + k) * 5);
    R.disco(lx, ly, 2.2, K); R.disco(lx, ly, 1.5, k % 2 ? H_('#d8542a') : H_('#e8a030')); R.pset(lx + 2, ly + 2, H_('#6a3a1a')); }
  // la tetera de verdad, sobre el atlas, que humea; la tapa salta cuando el calco se vuelve tetera
  const sal = Math.round(Math.max(0, Math.sin(cl((t - @13.45@) / 0.5) * Math.PI)) * 5);
  R.rect(270, 155, 302, 157, mez(H_('#c8b890'), K, 0.4));
  tetera(286, 155, t, sal);
  if (g.calco) { const [c0, c1, c2, c3] = g.calco; for (let y = Math.max(c1, 130); y <= Math.min(c3, 158); y++) for (let x = Math.max(c0, 266); x <= Math.min(c2, 300); x++) R.pset(x, y, mez(R.pget(x, y), H_('#f2f2ea'), 0.6)); }
  vapor(271, 140, t); vapor(287, 137 - sal, t, 0.4);
  // la mano con el lápiz que repasa el calco
  const um = tramo(t, @12.55@, @12.85@) - tramo(t, @13.75@, P4 - 0.1);
  if (um > 0) { const ux = tramo(t, @12.85@, @13.4@), tx = Math.round(lerp(96, 150, ux) + Math.sin(t * 20) * 1.5), ty = Math.round(lerp(148, 140, ux) + Math.cos(t * 17) * 1.5 + (1 - um) * 40);
    T.brazo(R, tx + 10, 200, tx - 8, ty + 6, '#f0e0b0', 1, { codo: [tx + 14, ty + 30] });
    R.linea(tx - 2, ty - 7, tx + 3, ty, H_('#e8b830')); R.linea(tx - 1, ty - 7, tx + 4, ty, H_('#c89020')); R.pset(tx - 3, ty - 8, H_('#e88aa0')); R.pset(tx + 4, ty + 1, K); }
  // ¡encaja!: un «!» cuando se posa; un «?» cuando sale la tetera
  if (t > @12.45@ && t < @13.3@) R.icono('!', 128, 106 - Math.round(tramo(t, @12.45@, @12.6@) * 4), H_('#3ac85a'), K, 2);
  if (t > @13.5@) R.bocadillo(a.cabeza[0] + 8, a.cabeza[1] - 4, { icono: '?' });
};
// ── 4 · el pergamino: la costa que se tuerce al este ──
const p4 = (t) => {
  const tr = t < @17.45@ ? lerp(0.5, 0.6, tramo(t, P4 + 0.6, @17.45@)) : lerp(0.6, 0.94, tramo(t, @17.45@, @18.5@));
  const algo = tramo(t, @18.6@, @19.3@);
  const r = T.pergamino(R, t, { vista: 'sur', trazo: tr, vivo: 0.5, ilumina: algo > 0 ? 'sur' : undefined });
  // la mano con el lápiz en la punta de la costa (entra desde abajo, sale en «something else»)
  const en_ = tramo(t, P4, P4 + 0.6) - tramo(t, @18.55@, @19.1@);
  if (r.punta && en_ > 0) { const [px, py] = r.punta, wy = py + 8 + Math.round((1 - en_) * 45), wx = px - 11;
    T.brazo(R, wx + 2, 215, wx, wy, '#7a2a32', 1, { codo: [wx + 8, wy + 22] });
    R.linea(px - 6, py - 8, px, py, H_('#e8b830')); R.linea(px - 5, py - 8, px + 1, py, H_('#c89020')); R.pset(px - 7, py - 9, H_('#e88aa0')); R.pset(px - 7, py - 10, H_('#e88aa0')); R.pset(px, py, K); }
  // algo más: la costa torcida se escarcha y caen copos
  if (algo > 0) { for (let k = 0; k < 26; k++) { const x = Math.round(30 + hh(k, 1) * 280), y = Math.round(((t * (8 + hh(k, 2) * 8) + hh(k, 3) * 180) % 180)); if (hh(k, 4) < algo) { R.pset(x, y, H_('#ffffff')); if (k % 3 === 0) { R.pset(x + 1, y, H_('#d8ecf8')); R.pset(x, y + 1, H_('#d8ecf8')); } } }
    for (let k = 0; k < 9; k++) { const x = Math.round(70 + k * 26 + hh(k, 5) * 10), y = Math.round(150 + hh(k, 6) * 18), on = Math.sin(t * 6 + k * 1.7) > 0.2 - algo;
      if (on) { R.pset(x, y, H_('#ffffff')); R.pset(x - 1, y, H_('#bfe4f6')); R.pset(x + 1, y, H_('#bfe4f6')); R.pset(x, y - 1, H_('#bfe4f6')); R.pset(x, y + 1, H_('#bfe4f6')); } }
    if (t > @19.0@) R.bocadillo(200, 120 - Math.round(tramo(t, @19.0@, @19.2@) * 3), { icono: '?' }); }
};
const efectos = [[@1.66@, 'interruptor'], [@2.2@, 'brillo'], [@3.0@, 'papel'], [@8.2@, 'papel'], [@10.3@, 'pop'], [@12.4@, 'papel'], [@12.9@, 'lapiz'], [@13.45@, 'pop'], [@16.0@, 'lapiz'], [@18.65@, 'brillo']];
const año = (t) => t < P2 ? Math.round(lerp(1931, 1955, tramo(t, 0.35, @4.45@))) : 1956;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
'''))


# ───────────────────────────────────────────────── PR-CARTA ─────────────────────────────────────────────────
E['pr-carta'] = ('La carta', '''// PR-CARTA (frase 16), 1960, cartela «1960». Cinco planos:
// 1. («In 1960, Hapgood received a letter…») el porche de New Hampshire: Hapgood rastrilla hojas; el cartero mete una
//    carta en el buzón y sube la banderita; Hapgood va, abre la tapa y en «letter» saca un sobre de correo aéreo; en
//    «officer… Air Force» un avión plateado cruza el cielo con su estela.
// 2. (corte en «Air Force») la base aérea: el oficial teclea la carta en la máquina; en «It said» se vuelve, y en
//    «the coast at the bottom… Antarctica» una línea roja de puntos une la copia del mapa de 1513 clavada en la pared
//    con la costa de la Antártida del mapa polar, que se rodea en rojo.
// 3. (corte en «Antarctica») el corte del hielo: el avión del radar dibuja la roca de debajo; en «Queen Maud Land» un
//    explorador clava su banderita; en «under the ice» la costa del mapa (línea sepia) baja y encaja con la roca.
// 4. (corte en «Hapgood was thrilled») LOCAL el despacho de Hapgood de noche: lee la carta, da dos saltos de alegría (el
//    gato salta de la ventana), la lanza al aire y la atrapa, y en «mapped Antarctica» la deja en la mesa entre la copia
//    del mapa y el perfil bajo el hielo, que brillan; luciérnagas por la ventana.
// 5. (corte en «before the ice covered it») la Antártida como la imaginaba Hapgood: una costa verde sin hielo, una
//    nave antigua con su cartógrafo que la dibuja; en «the ice covered it» el hielo baja y la cubre; la nave se aleja.''', cuerpo('pr-carta', r'''
const P2 = @6.28@, P3 = @10.52@, P4 = @14.4@, P5 = @18.02@;
// ── 1 · el buzón ──
const p1 = (t) => {
  const band = tramo(t, @2.0@, @2.3@), tapa = tramo(t, @3.05@, @3.3@);
  const o = { encuadre: 'base', camara: 'buzon', bandera: band, puerta: tapa };
  T.america(R, t, o);
  // el avión plateado que cruza el cielo (con su estela), en «Air Force»
  const va = tramo(t, @4.4@, P2 + 0.2), ax = Math.round(lerp(-40, 350, va)), ay = Math.round(70 - va * 12);
  if (va > 0 && va < 1) { for (let x = Math.max(0, ax - 160); x < ax - 16; x++) { const yy = Math.round(ay + (ax - x) * 16 / 390); for (const d of [0, 1]) if ((x + Math.floor(t * 6)) % 9) R.pset(x, yy + d, mez(R.pget(x, yy + d), H_('#ffffff'), 0.7 * (x - ax + 160) / 160)); }
    R.rect(ax - 18, ay - 2, ax + 6, ay + 2, K); R.rect(ax - 17, ay - 1, ax + 5, ay + 1, H_('#d8dce4')); R.rect(ax - 17, ay - 1, ax + 5, ay - 1, H_('#f6f6fa')); R.rect(ax + 2, ay - 1, ax + 4, ay, H_('#2a3a5a'));
    R.poligono([[ax - 6, ay], [ax - 14, ay + 8], [ax - 10, ay + 8], [ax - 1, ay + 1]], H_('#a8acb8')); R.poligono([[ax - 6, ay], [ax - 12, ay - 6], [ax - 9, ay - 6], [ax - 2, ay - 1]], H_('#c8ccd6'));
    R.poligono([[ax - 16, ay - 1], [ax - 20, ay - 7], [ax - 17, ay - 7], [ax - 13, ay - 1]], H_('#b8bcc8')); }
  // el cartero llega por la carretera, mete la carta y sube la bandera; luego sigue
  const uc = tramo(t, 0.3, @1.9@), uc2 = tramo(t, @2.45@, P2), xc = Math.round(lerp(330, 258, uc) + uc2 * 90);
  const c = R.actor(EL.cartero, xc, 164, t, { dir: uc2 > 0 ? 1 : -1, anda: (uc > 0 && uc < 1) || (uc2 > 0 && uc2 < 1), sostiene: t > @1.2@ && t < @2.3@ ? [250, 132] : t < @1.2@, sonrisa: t > @2.0@ });
  if (t < @2.0@) sobre(c.mano[0] - 6, c.mano[1] - 3, 8, 5);
  if (uc2 <= 0) { R.rect(xc - 2, 150, xc + 2, 158, K); R.rect(xc - 1, 151, xc + 1, 157, H_('#6a4a2a')); }   // su saca
  // Hapgood rastrilla, ve la bandera, va al buzón, abre la tapa y saca el sobre
  const uh = tramo(t, @2.35@, @3.0@), xh = Math.round(lerp(140, 206, uh)), lee = t > @3.45@;
  const rastr = t < @2.35@, rx = Math.sin(t * 5) * 4;
  const h = R.actor(EL.hapgood, xh, 160, t, { dir: lee ? -1 : 1, anda: uh > 0 && uh < 1, sostiene: rastr ? [xh + 18 + rx, 152] : !lee ? [226, 130] : true, sorpresa: t > @2.1@ && t < @2.5@, sonrisa: lee });
  if (rastr) { R.linea(h.mano[0], h.mano[1], h.mano[0] + 8, 160, H_('#8a5a2e')); R.linea(h.mano[0] + 4, 160, h.mano[0] + 12, 160, H_('#5a5a64')); for (let i = 0; i < 5; i++) R.pset(h.mano[0] + 4 + i * 2, 161, H_('#5a5a64'));
    for (let k = 0; k < 8; k++) { const lx = Math.round(xh + 18 + hh(k, 1) * 26 + Math.sin(t * 5 + k) * 2), ly = 158 + Math.round(hh(k, 2) * 6); R.pset(lx, ly, k % 2 ? H_('#d8542a') : H_('#e8a030')); R.pset(lx + 1, ly, H_('#c8442a')); } }
  if (lee) { sobre(h.mano[0] - 10, h.mano[1] - 6, 11, 8); if (t > @4.4@) R.icono('!', h.cabeza[0] - 2, h.cabeza[1] - 14, H_('#f6e08a'), K, 1); }
};
// ── 2 · la base aérea ──
const p2 = (t) => {
  const vuelve = t > @8.2@;
  const o = { encuadre: 'base', hoja: lerp(0.2, 1, tramo(t, P2 + 0.1, @8.1@)) };
  T.america(R, t, o);
  // la copia del mapa de 1513 clavada entre el mapa polar y el ventanal
  R.rect(113, 36, 148, 60, K); T.PIEZAS_PR.pergamino(R, 131, 60, { s: 1 }); R.disco(116, 38, 1.5, H_('#c83a3a')); R.disco(145, 38, 1.5, H_('#c83a3a'));
  // el oficial teclea; luego se vuelve y señala
  const tecla = !vuelve && Math.floor(t * 9) % 2;
  R.actor(EL.ohlmeyer, 140, 147, t, { dir: vuelve ? -1 : -1, sostiene: !vuelve ? [118 + (tecla ? 2 : -1), 131 + tecla] : false, dedo: vuelve, habla: vuelve && Math.sin(t * 7) > 0 });
  T.americaDelante(R, t, o);
  // el hilo rojo de puntos, de la costa de abajo de la copia a la Antártida del mapa polar
  const u = tramo(t, @8.7@, @10.3@);
  if (u > 0) { const a = [120, 56], b = [86, 34], n = 40; for (let i = 0; i <= n * u; i++) { const v = i / n, x = Math.round(lerp(a[0], b[0], v)), y = Math.round(lerp(a[1], b[1], v) - Math.sin(v * Math.PI) * 6); if (i % 3 !== 2) { R.pset(x, y, H_('#d83a2a')); R.pset(x, y + 1, H_('#8a1e18')); } }
    if (u >= 1) { const r = 6 + Math.sin(t * 6) * 0.6; for (let k = 0; k < 40; k++) { const a2 = k / 40 * Math.PI * 2; R.pset(Math.round(b[0] + Math.cos(a2) * r), Math.round(b[1] + Math.sin(a2) * r * 0.8), H_('#d83a2a')); } } }
};
// ── 3 · el corte del hielo (el radar) ──
const p3 = (t) => {
  const pr = lerp(0.15, 1, tramo(t, P3, @13.6@));
  const g = T.hoy(R, t, { encuadre: 'antartida', camara: 'radar', perfil: pr, avionX: Math.round(lerp(10, 300, pr)) });
  // el explorador clava su banderita en «Queen Maud Land»
  const ue = tramo(t, P3 + 0.1, @11.4@), xe = Math.round(lerp(26, 92, ue)), clava = t > @11.7@;
  const ex = R.actor(EL.chico, xe, 98, t, { dir: 1, anda: ue > 0 && ue < 1, sostiene: !clava, brazos: t > @12.0@ && t < @12.8@, sonrisa: clava, pal: { C: H_('#e8642a'), c: H_('#b84a1a') } });
  const fx = clava ? xe + 18 : ex.mano[0], fy = clava ? 98 : ex.mano[1] + 4;
  R.linea(fx, fy, fx, fy - 13, K); R.linea(fx + 1, fy, fx + 1, fy - 13, H_('#a8a8b0')); R.rect(fx + 2, fy - 13, fx + 9, fy - 9 + Math.round(Math.sin(t * 9)), H_('#c83a3a')); R.rect(fx + 2, fy - 13, fx + 9, fy - 13, H_('#e86a5a'));
  // la costa del mapa (línea sepia de puntos) baja hasta la roca y encaja con ella
  const u = tramo(t, @12.7@, @13.7@);
  if (u > 0 && g.rocaY) { for (let x = 18; x <= 316; x++) { const y = Math.round(lerp(104, g.rocaY(x) - 1, suave(u))); if (u >= 1 ? true : x % 3 !== 0) { R.pset(x, y, u >= 1 ? H_('#f6d860') : H_('#8a5a2e')); R.pset(x, y - 1, u >= 1 ? H_('#fff4b0') : H_('#c89a5a')); } } }
};
// ── 4 · el despacho de Hapgood, de noche (LOCAL) ──
const despacho = fijo(() => {
  R.rect(0, 0, 319, 7, NOGAL[0]); R.rect(0, 6, 319, 6, NOGAL[2]);
  for (let y = 8; y <= 109; y++) for (let x = 0; x <= 319; x++) { const atom = x > 270 && y < 50, s = x % 12 < 6, c = s ? H_('#3e5a48') : H_('#466652'); let cc = atom ? mez(c, H_('#42604c'), 0.7) : c;
    if (!atom && x % 12 === 9 && y % 10 === 4) cc = H_('#8a9a5a'); if (hh(x, y, 3) > 0.97) cc = mez(cc, K, 0.2); R.pset(x, y, cc); }
  R.rect(0, 22, 319, 23, NOGAL[1]); R.rect(0, 22, 319, 22, NOGAL[2]);
  R.rect(0, 110, 319, 150, H_('#5a361e')); R.rect(0, 110, 319, 112, NOGAL[2]); R.rect(0, 110, 319, 110, H_('#a87448'));
  for (let x0 = 2; x0 < 318; x0 += 28) { R.rect(x0, 116, x0 + 23, 145, H_('#4e2e18')); R.rect(x0, 145, x0 + 23, 145, NOGAL[2]); R.rect(x0 + 23, 116, x0 + 23, 145, NOGAL[2]); }
  tablas(0, 151, 319, 179, 6, ['#3a2414', '#7a4e2a', '#6a4224', '#9a6a3e'].map(H_), 4);
  R.poligono([[40, 158], [280, 158], [300, 179], [20, 179]], (x, y) => { const b = y < 161 || x < 26 + (179 - y) * 0.9 + 3 || x > 294 - (179 - y) * 0.9 - 3; return b ? H_('#c8a050') : ((x >> 2) + (y >> 2)) % 2 ? H_('#2a3a6a') : H_('#34467a'); });
  // la ventana: marco, alféizar y cortinas (la noche va aparte)
  R.rect(10, 24, 68, 98, K); R.rect(8, 98, 70, 102, H_('#e8dcc0')); R.rect(8, 102, 70, 102, H_('#a89878'));
  for (const [a, b] of [[2, 12], [66, 76]]) for (let x = a; x <= b; x++) for (let y = 18; y <= 106; y++) { const f = Math.sin((x - a) * 1.2); R.pset(x, y, f > 0.4 ? H_('#9a3a3a') : f > -0.3 ? H_('#7a2a2a') : H_('#5a1e1e')); }
  R.rect(0, 16, 80, 18, ORO[0]); R.rect(0, 16, 80, 16, ORO[2]);
  // la librería baja de la derecha, un diploma y un barómetro
  R.rect(250, 56, 318, 150, K); R.rect(251, 57, 317, 149, NOGAL[0]); for (const y of [80, 104, 128]) R.rect(252, y, 316, y + 2, NOGAL[2]);
  lomos(253, 316, 79, 20, 11); lomos(253, 300, 103, 20, 12); lomos(253, 316, 127, 20, 13); lomos(253, 316, 148, 18, 14);
  marco(90, 30, 128, 58, 3, NOGAL); R.rect(94, 34, 124, 54, H_('#efe6cc')); for (let j = 0; j < 4; j++) R.rect(98, 38 + j * 4, 120, 38 + j * 4, H_('#b8ac8c')); R.disco(116, 50, 3, H_('#c83a3a'));
  marco(196, 26, 236, 70, 3, ORO); R.rect(200, 30, 232, 66, H_('#2a4a6a')); R.disco(216, 48, 13, H_('#3a6aa8')); R.rect(208, 42, 214, 50, H_('#6a9a4a')); R.rect(218, 46, 224, 56, H_('#6a9a4a')); R.disco(216, 60, 4, H_('#f0f6fa'));
  // la mesa (el tablero va delante, aparte)
});
const mesaDelante = (t) => {
  R.rect(70, 122, 244, 128, K); R.rect(71, 123, 243, 125, H_('#8a5a34')); R.rect(71, 123, 243, 123, H_('#a87448')); R.rect(72, 128, 242, 152, K); R.rect(73, 129, 241, 151, H_('#6a4024'));
  for (const x0 of [78, 166]) { R.rect(x0, 133, x0 + 70, 147, H_('#5a361e')); R.rect(x0, 133, x0 + 70, 133, NOGAL[0]); R.rect(x0 + 32, 139, x0 + 38, 140, ORO[1]); }
};
const p4 = (t) => {
  despacho();
  // la noche por la ventana: estrellas, la luna, la rama del arce y luciérnagas
  R.recorte([11, 25, 67, 97]); degr(11, 25, 67, 97, ['#0e1430', '#1a2448', '#2a3460'].map(H_));
  for (let k = 0; k < 18; k++) { const x = 12 + Math.floor(hh(k, 1) * 54), y = 26 + Math.floor(hh(k, 2) * 60); if (Math.sin(t * 3 + k * 2) > -0.4) R.pset(x, y, k % 4 ? H_('#c8d0f0') : H_('#ffffff')); }
  R.disco(52, 40, 7, H_('#f6f0d0')); R.disco(50, 38, 2, H_('#e4dcb4')); R.disco(55, 43, 1.5, H_('#e4dcb4'));
  const sw = Math.sin(t * 1.2) * 2; R.linea(11, 70, 40, 62 + sw, H_('#0a0c18')); R.linea(11, 71, 40, 63 + sw, H_('#0a0c18'));
  for (let k = 0; k < 7; k++) R.disco(20 + k * 4, 64 + sw * 0.6 + (k % 2) * 3, 3, H_('#101428'));
  R.poligono([[11, 97], [11, 84], [30, 80], [50, 86], [67, 82], [67, 97]], H_('#0a0c18'));
  for (let k = 0; k < 5; k++) { const x = Math.round(20 + hh(k, 7) * 40 + Math.sin(t * 0.8 + k) * 6), y = Math.round(78 + hh(k, 8) * 14 + Math.cos(t * 1.1 + k) * 3); if (Math.sin(t * 4 + k * 3) > 0.2) { R.pset(x, y, H_('#e8f070')); R.pset(x + 1, y, H_('#a8c040')); } }
  R.recorte(null); R.rect(38, 24, 39, 98, K); R.rect(10, 60, 68, 61, K);
  // el gato del alféizar salta asustado con la alegría de Hapgood
  const ug = tramo(t, @15.0@, @15.6@); gatoD(lerp(30, 58, ug), 98 + (ug >= 1 ? 0 : 0), t, ug > 0 && ug < 1 ? ug : 0);
  // el flexo: su luz cálida sobre la mesa
  haz([[214, 94], [222, 94], [250, 124], [178, 124]], H_('#fff0b0'), 0.22);
  // Hapgood detrás de la mesa: lee, salta de alegría, lanza la carta y la atrapa, la deja en la mesa y señala
  const salta = t > @14.95@ && t < @15.75@, s = salta ? Math.round(Math.abs(Math.sin((t - @14.95@) * Math.PI / 0.4)) * 7) : 0;
  const deja = t > @16.3@ && t < @16.75@, puesta = t >= @16.75@;
  const hp = R.actor(EL.hapgood, 150, 129, t, { dir: puesta ? -1 : 1, salto: s, brazos: salta, sostiene: !salta && !puesta ? (deja ? [170, 121] : true) : false, dedo: puesta, sonrisa: t > @14.9@, sorpresa: t < @14.9@ && t > P4 + 0.2 });
  mesaDelante(t);
  // en la mesa: la copia del mapa en su atril, el perfil bajo el hielo, la taza, el flexo y el sobre abierto
  const brilla = t > @16.9@ && Math.sin(t * 8) > -0.2;
  R.rect(92, 96, 132, 122, K); T.PIEZAS_PR.pergamino(R, 112, 120, { s: 1 }); R.linea(100, 122, 96, 127, NOGAL[0]); R.linea(124, 122, 128, 127, NOGAL[0]);
  R.rect(184, 96, 226, 122, K); R.rect(185, 97, 225, 121, H_('#f6f6f0')); R.rect(186, 99, 224, 108, H_('#d8ecf8')); for (let x = 186; x <= 224; x++) { const y = Math.round(112 + Math.sin(x * 0.35) * 2.5 + Math.sin(x * 0.11) * 3); R.rect(x, y, x, 120, H_('#8a6a4a')); R.pset(x, y, H_('#4a2e1a')); if (x % 3 === 0) R.pset(x, Math.round(lerp(99, y, 0.5)), H_('#a8c4d8')); }
  R.linea(192, 122, 188, 127, NOGAL[0]); R.linea(218, 122, 222, 127, NOGAL[0]);
  if (brilla) { for (const [x0, y0, x1, y1] of [[91, 95, 133, 123], [183, 95, 227, 123]]) { R.rect(x0, y0, x1, y0, ORO[2]); R.rect(x0, y1, x1, y1, ORO[2]); R.rect(x0, y0, x0, y1, ORO[2]); R.rect(x1, y0, x1, y1, ORO[2]); } }
  R.rect(212, 92, 224, 96, K); R.rect(213, 92, 223, 94, H_('#2a6a3a')); R.linea(218, 96, 232, 120, ORO[0]); R.rect(226, 120, 238, 123, ORO[0]);
  R.rect(80, 114, 87, 122, K); R.rect(81, 115, 86, 121, H_('#e8e4dc')); R.rect(87, 116, 88, 119, K); vapor(83, 112, t);
  // la carta: en la mano, por el aire o ya en la mesa
  if (salta) { const v = (t - @14.95@) / 0.8, cx = Math.round(158 + Math.sin(v * 7) * 4), cy = Math.round(96 - Math.sin(v * Math.PI) * 26); sobre(cx - 5, cy - 3, 11, 8); }
  else if (puesta) { R.rect(150, 120, 172, 123, K); R.rect(151, 120, 171, 122, H_('#f6f2e6')); R.rect(151, 120, 171, 120, H_('#c83a3a')); }
  else if (hp.mano) sobre(hp.mano[0] - 5, hp.mano[1] - 6, 11, 8);
};
// ── 5 · la Antártida sin hielo que imaginaba Hapgood; el hielo la cubre ──
const nave = (x, y, t) => {
  const yy = y + Math.round(Math.sin(t * 1.6) * 1.2);
  R.linea(x, yy - 34, x, yy - 4, NOGAL[0]); R.linea(x + 1, yy - 34, x + 1, yy - 4, NOGAL[1]);
  for (let j = 0; j < 20; j++) { const w = 13 + Math.round(Math.sin(j / 19 * Math.PI) * 2); R.rect(x - w, yy - 32 + j, x + w, yy - 32 + j, j % 6 < 3 ? H_('#c84a2a') : H_('#f0e2c0')); }
  R.rect(x - 14, yy - 33, x + 14, yy - 33, NOGAL[0]); R.disco(x, yy - 22, 4, H_('#e8b830'));
  for (let k = 0; k < 6; k++) R.pset(x + k, yy - 35 - Math.round(Math.sin(t * 8 + k) * (k / 3)), H_('#3a6aa8'));
};
const p5 = (t) => {
  T.hoy(R, t, { encuadre: 'antartida', barco: false });
  // la costa sin hielo (verde, con bosques y acantilados) hasta que baja el hielo en «the ice covered it»
  const u = suave(tramo(t, @18.15@, @19.4@));
  for (let x = 0; x <= 319; x++) { const cima = 70 + Math.round(Math.sin(x * 0.05) * 4 + Math.sin(x * 0.13 + 1) * 2), frente = Math.round(lerp(cima, 98, u) + (u > 0 && u < 1 ? Math.sin(x * 0.4 + t * 3) * 1.5 : 0));
    for (let y = Math.max(cima, frente); y <= 97; y++) { let c = y > 92 ? (y === 97 ? H_('#e8f4f8') : ((x + y) % 4 ? H_('#7a5a3a') : H_('#5a3e28'))) : (hh(x >> 1, y >> 1, 9) > 0.6 ? H_('#2a5a2a') : (y - cima) / 22 > umb(x, y) ? H_('#4a7a3a') : H_('#6a9a4a'));
      if (y === Math.max(cima, frente) && frente > cima && u < 1) c = H_('#f4fafc'); R.pset(x, y, c); }
    if (u < 0.5 && hh(x, 3, 9) > 0.85 && cima < 76) { R.pset(x, cima - 1, H_('#1e4a22')); R.pset(x, cima - 2, H_('#2a5a2a')); } }
  // la nave antigua del cartógrafo, que dibuja la costa y luego se aleja
  const xn = Math.round(lerp(60, 360, tramo(t, @19.6@, P5 + 4.9)) + (t - P5) * 4);
  const subeY = 132;
  nave(xn, subeY, t);
  const ca = R.actor(EL.socrates, xn - 8, subeY - 4, t, { dir: -1, sostiene: true, triste: u >= 1, sorpresa: u > 0.1 && u < 1 });
  R.rect(ca.mano[0] - 6, ca.mano[1] - 4, ca.mano[0] + 1, ca.mano[1] + 2, K); R.rect(ca.mano[0] - 5, ca.mano[1] - 3, ca.mano[0], ca.mano[1] + 1, H_('#e8d4a4')); R.linea(ca.mano[0] - 4, ca.mano[1] - 2, ca.mano[0] - 1, ca.mano[1], H_('#3a6a3a'));
  const yb = subeY + Math.round(Math.sin(t * 1.6) * 1.2);
  R.poligono([[xn - 26, yb - 7], [xn + 24, yb - 7], [xn + 30, yb - 13], [xn + 20, yb], [xn - 20, yb], [xn - 30, yb - 12]], H_('#5a3a20'));
  R.rect(xn - 24, yb - 7, xn + 24, yb - 6, H_('#8a5a34')); for (let i = -20; i <= 18; i += 6) R.rect(xn + i, yb - 4, xn + i + 2, yb - 3, H_('#c8a050'));
  R.disco(xn + 27, yb - 12, 2, H_('#e8b830'));
  for (let k = 0; k < 6; k++) { const ox = xn - 18 + k * 7; R.linea(ox, yb - 2, ox - 3 + Math.round(Math.sin(t * 3 + k) * 2), yb + 5, NOGAL[2]); }
  T.hoyDelante(R, t, { encuadre: 'antartida', barco: false });
};
const efectos = [[@2.0@, 'golpecito'], [@3.1@, 'papel'], [@4.9@, 'jet'], [P2 + 0.2, 'tecleo'], [@8.1@, 'maquina'], [@10.3@, 'brillo'], [@11.0@, 'bip'], [@11.7@, 'golpecito'], [@13.7@, 'brillo'], [@15.0@, 'miau'], [@15.75@, 'papel'], [@16.95@, 'brillo'], [@18.2@, 'viento'], [@19.9@, 'ola']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '1960', efectos, año: 1960 });
'''))


# ───────────────────────────────────────────────── PR-LIBRO ─────────────────────────────────────────────────
E['pr-libro'] = ('El libro', '''// PR-LIBRO (frase 17), 1966, sin cartela. Cinco planos:
// 1. («In 1966, he published it in a book, Maps of the Ancient Sea Kings») la imprenta: Hapgood llega por la nave,
//    en «book» coge un libro recién hecho de la cinta (azul, con el mapa y una carabela, sin letras) y en «Sea Kings»
//    lo levanta orgulloso; el impresor le hace un gesto.
// 2. (corte en «His idea») LOCAL la portada de cerca, sobre la mesa (gafas, taza, lápiz, el sobre de la carta): el
//    dibujo cobra vida: una nave antigua da la vuelta al mundo dejando una estela de oro que se cierra en «whole
//    planet»; en «thousands of years ago» el reloj de arena del adorno se da la vuelta; la mano de Hapgood la toca.
// 3. (corte en «and that its maps») LOCAL una galería de las épocas, con cuatro hornacinas: un escriba egipcio, un sabio
//    griego, un monje copista y Piri Reis; el mapa se copia y pasa volando de uno a otro en «copied again and again» y
//    en «reached Piri Reis» llega a Piri, que lo levanta.
// 4. (corte en «Years earlier») LOCAL la vitrina de una biblioteca: un libro antiguo abierto y, encima, el retrato de un
//    científico de pelo blanco despeinado, de espaldas; en «Albert Einstein» se enciende la luz del retrato; un chico
//    lo señala, una señora se sorprende; en «foreword» pasa una página del libro.
// 5. (corte en «and that name opened a lot of doors») la librería: la puerta se abre con su campanilla y entra gente,
//    uno tras otro, a coger el libro de la mesa; el librero cobra en la caja.''', cuerpo('pr-libro', r'''
const P2 = @5.5@, P3 = @11.08@, P4 = @15.94@, P5 = @20.62@;
// ── 1 · la imprenta ──
const p1 = (t) => {
  const o = { encuadre: 'libreria', camara: 'imprenta' }; T.america(R, t, o);
  const u = tramo(t, 0.1, @2.4@), x = Math.round(lerp(10, 214, u)), coge = t > @2.86@, alza = t > @4.3@;
  const i = R.actor(EL.impresor, 118, 162, t, { dir: 1, habla: t > @3.4@ && t < @4.2@ && Math.sin(t * 7) > 0, dedo: t > @4.6@, sonrisa: t > @4.6@, sostiene: t < @3.2@ });
  if (t < @3.2@) { R.rect(i.mano[0] - 4, i.mano[1] - 3, i.mano[0] + 4, i.mano[1] + 1, K); R.rect(i.mano[0] - 3, i.mano[1] - 2, i.mano[0] + 3, i.mano[1], H_('#f6f2e6')); }
  const hp = R.actor(EL.hapgood, x, 154, t, { dir: 1, anda: u > 0 && u < 1, sostiene: t > @2.5@ ? (alza ? [x + 18, 124] : coge ? true : [236, 133]) : false, sonrisa: coge, sorpresa: t > @2.5@ && t < @2.86@ });
  if (coge) libroHG(hp.mano[0] + 1, hp.mano[1] + 9, 1.4);
  T.americaDelante(R, t, o);
  if (alza) for (let k = 0; k < 5; k++) { const a = t * 2 + k * 1.3, rx = Math.round(hp.mano[0] + 1 + Math.cos(a) * 11), ry = Math.round(hp.mano[1] - 2 + Math.sin(a) * 9); if (Math.sin(t * 9 + k) > 0) { R.pset(rx, ry, H_('#ffffff')); R.pset(rx + 1, ry, ORO[2]); R.pset(rx - 1, ry, ORO[2]); } }
};
// ── 2 · la portada de cerca (LOCAL): la nave antigua da la vuelta al mundo ──
const MESA = ['#3a2414', '#7a4a2a', '#6a3e22', '#8e5a32'].map(H_);
const portadaFija = fijo(() => {
  tablas(0, 0, 319, 179, 30, MESA, 21);
  // la sombra del libro y los objetos de la mesa
  for (let y = 26; y <= 172; y++) for (let x = 100; x <= 230; x++) R.pset(x, y, mez(R.pget(x, y), K, 0.45));
  // las gafas de leer
  for (const cx of [34, 54]) { R.disco(cx, 34, 8, K); R.disco(cx, 34, 6.5, (x, y) => mez(R.pget(x, y), H_('#dfeaf2'), 0.35)); R.pset(cx - 3, 31, H_('#ffffff')); R.pset(cx - 2, 30, H_('#ffffff')); }
  R.rect(42, 33, 46, 34, K); R.linea(26, 33, 14, 40, K); R.linea(62, 33, 74, 40, K);
  // el sobre de la carta de 1960, debajo del libro, y un lápiz
  R.poligono([[20, 120], [84, 112], [90, 150], [26, 158]], K); R.poligono([[22, 121], [83, 113], [88, 149], [27, 156]], (x, y) => { const b = Math.abs(x - 22 - (y - 121) * 0.15) < 3 || Math.abs(y - 121 + (x - 22) * 0.13) < 3 || Math.abs(y - 155 + (x - 27) * 0.12) < 3; return b ? (((x + y) >> 2) % 2 ? H_('#c83a3a') : H_('#2a4a9a')) : H_('#f2eee2'); });
  R.rect(70, 120, 78, 128, H_('#3a6aa8')); R.rect(72, 122, 76, 126, H_('#e8eef6')); R.linea(34, 136, 60, 132, H_('#8a8a94')); R.linea(36, 142, 66, 138, H_('#8a8a94'));
  R.linea(236, 175, 300, 167, K); R.linea(236, 176, 300, 168, H_('#e8b830')); R.linea(236, 177, 300, 169, H_('#c89020')); R.linea(300, 167, 304, 167, H_('#e88aa0')); R.pset(234, 176, K);
  // otro libro cerrado, rojo, a la derecha
  R.rect(246, 58, 300, 110, K); R.rect(247, 59, 299, 109, H_('#7a2a2a')); R.rect(247, 59, 251, 109, H_('#5a1e1e')); R.rect(255, 64, 294, 104, H_('#8a3434')); R.rect(255, 64, 294, 64, ORO[1]); R.rect(255, 104, 294, 104, ORO[1]);
  R.rect(300, 60, 303, 108, H_('#efe6cc')); for (let y = 61; y < 108; y += 2) R.pset(301, y, H_('#c8bc9c'));
  // la taza en su plato, vista desde arriba
  R.disco(272, 146, 16, K); R.disco(272, 146, 15, H_('#e8e4dc')); R.disco(272, 146, 10, K); R.disco(272, 146, 9, H_('#e8e4dc')); R.disco(272, 146, 7, H_('#4a2a16')); R.disco(270, 144, 2, H_('#7a4a2a'));
  R.rect(281, 144, 287, 148, K); R.rect(282, 145, 286, 147, H_('#e8e4dc'));
  // EL LIBRO: tapa de tela azul con su trama, el lomo, el filete y los adornos de oro (sin letras)
  R.rect(94, 20, 226, 168, K);
  for (let y = 21; y <= 167; y++) for (let x = 95; x <= 225; x++) R.pset(x, y, x < 103 ? (x < 99 ? H_('#142850') : H_('#1a3260')) : ((x + y) % 2 && hh(x, y, 4) > 0.5) ? H_('#22427a') : H_('#1e3a6a'));
  for (const yy of [21, 167]) for (let x = 95; x <= 225; x++) R.pset(x, yy, H_('#f2eee2'));
  R.rect(226, 22, 229, 166, H_('#efe6cc')); for (let y = 23; y < 166; y += 2) R.pset(228, y, H_('#c8bc9c'));
  marco(108, 26, 220, 162, 2, ORO); R.rect(111, 29, 217, 159, H_('#1e3a6a')); marco(113, 31, 215, 157, 1, ORO); R.rect(114, 32, 214, 156, H_('#1a335e'));
  // las olas de oro arriba y abajo (en lugar del título) y cuatro carabelas grabadas en las esquinas
  for (const yb of [40, 146]) for (let x = 122; x <= 206; x++) { const y = Math.round(yb + Math.sin(x * 0.5) * 1.6); R.pset(x, y, ORO[1]); if (x % 6 === 0) R.pset(x, y - 2, ORO[0]); }
  for (const [cx, cy, d] of [[124, 52, 1], [204, 52, -1], [124, 136, 1], [204, 136, -1]]) { R.rect(cx - 5, cy + 2, cx + 5, cy + 3, ORO[1]); R.rect(cx - 4, cy + 4, cx + 4, cy + 4, ORO[0]); R.linea(cx, cy - 7, cx, cy + 2, ORO[1]); R.rect(cx - 3, cy - 6, cx + 2, cy - 1, ORO[2]); R.pset(cx + d * 3, cy - 7, ORO[1]); }
  // el globo del mundo (el disco) con sus meridianos y tierras de mapa antiguo
  R.disco(164, 94, 37, ORO[0]); R.disco(164, 94, 35, (x, y) => { const dx = x - 164, dy = y - 94; return ((dx * dx + dy * dy) < 900 ? H_('#2a5a8a') : H_('#24507e')); });
  for (const lx of [-24, -12, 0, 12, 24]) for (let y = 60; y <= 128; y++) { const w = Math.sqrt(Math.max(0, 1225 - (y - 94) ** 2)) / 35, x = Math.round(164 + lx * w); if (y % 2) R.pset(x, y, H_('#4a7aa8')); }
  for (const ly of [-20, 0, 20]) for (let x = 130; x <= 198; x++) { const w = Math.sqrt(Math.max(0, 1225 - (x - 164) ** 2)); if (Math.abs(ly) < w - 1 && x % 2) R.pset(x, 94 + ly, H_('#4a7aa8')); }
  const tierra = (pts) => { R.poligono(pts, H_('#c8a868')); for (let i = 0; i < pts.length; i++) { const [a, b] = pts[i], [c, d] = pts[(i + 1) % pts.length]; R.linea(a, b, c, d, H_('#6a4a22')); } };
  tierra([[140, 72], [152, 66], [160, 72], [156, 86], [146, 92], [138, 84]]); tierra([[150, 98], [160, 96], [162, 110], [154, 122], [148, 110]]);
  tierra([[172, 70], [186, 66], [194, 76], [188, 90], [176, 86]]); tierra([[176, 96], [190, 94], [194, 106], [182, 114], [174, 106]]); tierra([[150, 124], [178, 122], [172, 128], [154, 128]]);
  for (let k = 0; k < 14; k++) { const x = 168 + Math.round((hh(k, 1) - 0.5) * 56), y = 94 + Math.round((hh(k, 2) - 0.5) * 56); if ((x - 164) ** 2 + (y - 94) ** 2 < 1100) R.pset(x, y, H_('#3a6a3a')); }
  R.rect(158, 147, 170, 151, ORO[0]);
});
const p2 = (t) => {
  portadaFija();
  // las estrellas de oro de la tapa titilan
  for (let k = 0; k < 14; k++) { const x = 118 + Math.round(hh(k, 11) * 92), y = 46 + Math.round(hh(k, 12) * 96); if ((x - 164) ** 2 + (y - 94) ** 2 < 1600) continue; if (Math.sin(t * 3 + k * 1.7) > 0.3) { R.pset(x, y, ORO[2]); R.pset(x + 1, y, ORO[1]); R.pset(x - 1, y, ORO[1]); } }
  // la órbita: la nave antigua da la vuelta al globo y deja la estela de oro; se cierra en «whole planet»
  const v = tramo(t, P2 + 0.2, @9.02@), A = (a) => [Math.round(164 + Math.cos(a) * 52), Math.round(94 + Math.sin(a) * 20)];
  const delante = (a) => Math.sin(a) > 0;
  for (let i = 0; i <= 160 * v; i++) { const a = Math.PI / 2 + i / 160 * Math.PI * 2, [x, y] = A(a); if (!delante(a) && (x - 164) ** 2 + (y - 94) ** 2 < 1369) continue; if (i % 3) R.pset(x, y, v >= 1 && Math.sin(t * 8 + i * 0.3) > 0.5 ? ORO[2] : ORO[1]); }
  const an = Math.PI / 2 + v * Math.PI * 2, [nx, ny] = A(an), oculta = !delante(an) && (nx - 164) ** 2 + (ny - 94) ** 2 < 1369;
  if (!oculta) { const d = Math.cos(an) < 0 ? 1 : -1, yy = ny + Math.round(Math.sin(t * 4) * 1);
    R.rect(nx - 7, yy - 1, nx + 7, yy + 1, K); R.rect(nx - 6, yy - 1, nx + 6, yy, H_('#8a5a2e')); R.pset(nx + d * 7, yy - 2, K);
    R.linea(nx, yy - 12, nx, yy - 2, K); R.rect(nx - 4, yy - 11, nx + 4, yy - 4, K); R.rect(nx - 3, yy - 10, nx + 3, yy - 5, H_('#f0e2c0')); R.rect(nx - 3, yy - 8, nx + 3, yy - 7, H_('#c84a2a'));
    for (let k = 1; k < 5; k++) R.pset(nx - d * (7 + k * 2), yy + 1 - (k % 2), H_('#e8f0f6')); }
  if (v >= 1) { const b = tramo(t, @9.02@, @9.4@); for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + t, x = Math.round(164 + Math.cos(a) * (40 + b * 20)), y = Math.round(94 + Math.sin(a) * (30 + b * 16)); if (b < 1) { R.pset(x, y, ORO[2]); R.pset(x + 1, y, H_('#ffffff')); } } }
  // el reloj de arena del adorno de abajo: se da la vuelta en «thousands of years ago»
  const g = tramo(t, @9.4@, @9.9@), cx = 164, cy = 149, ang = g * Math.PI;
  const P = (dx, dy) => [Math.round(cx + dx * Math.cos(ang) - dy * Math.sin(ang)), Math.round(cy + dx * Math.sin(ang) + dy * Math.cos(ang))];
  R.poligono([P(-5, -7), P(5, -7), P(1, 0), P(5, 7), P(-5, 7), P(-1, 0)], ORO[0]); R.poligono([P(-4, -6), P(4, -6), P(0, 0), P(4, 6), P(-4, 6), P(0, 0)], H_('#2a3a5a'));
  const arena = g >= 1 ? tramo(t, @9.9@, P3) : 1 - tramo(t, P2, @9.4@) * 0.3;
  R.poligono([P(-3 * (1 - arena) - 0.5, 6 - 5 * (1 - arena)), P(3 * (1 - arena) + 0.5, 6 - 5 * (1 - arena)), P(4, 6), P(-4, 6)], ORO[2]);
  if (g >= 1 && arena < 1) R.linea(cx, cy, cx, cy + 5, ORO[2]);
  R.rect(cx - 6, cy - 8, cx + 6, cy - 8, ORO[1]); R.rect(cx - 6, cy + 8, cx + 6, cy + 8, ORO[1]);
  // la luz de la lámpara y el vapor de la taza
  haz([[0, 0], [120, 0], [230, 179], [0, 179]], H_('#fff2c8'), 0.07);
  vapor(268, 140, t); vapor(276, 138, t, 0.5);
  // la mano de Hapgood (la manga de tweed) entra, coge la esquina de la tapa y la levanta: asoman las hojas
  const um = tramo(t, @9.6@, @10.2@), L = Math.round(tramo(t, @10.2@, P3 - 0.1) * 34);
  if (L > 1) { const cx = 225, cy = 167;
    R.poligono([[cx - L, cy + 1], [cx + 1, cy + 1], [cx + 1, cy - L]], H_('#f2eadc')); for (let k = 3; k < L; k += 3) R.linea(cx - L + k, cy, cx, cy - L + k, H_('#c8bc9c'));
    R.poligono([[cx - L, cy], [cx, cy - L], [cx - L, cy - L]], H_('#d8cfb8')); R.linea(cx - L, cy, cx, cy - L, H_('#a89878')); R.linea(cx - L, cy - L, cx, cy - L, K); R.linea(cx - L, cy - L, cx - L, cy, K);
    for (let k = 4; k < L; k += 5) R.pset(cx - L + 2, cy - L + k, H_('#b8ac94')); }
  if (um > 0) { const wx = 225 - L + 12, wy = 167 - L + 4 + Math.round((1 - um) * 34); T.brazo(R, wx + 18, 215, wx, wy, '#8a7a5a', -1, { codo: [wx + 18, wy + 26] }); }
};
// ── 3 · la galería de las épocas (LOCAL): el mapa se copia de mano en mano hasta Piri Reis ──
const HORN = [[14, 74], [90, 150], [166, 226], [242, 302]];
const galeria = fijo(() => {
  // la bóveda oscura y el muro de sillares
  degr(0, 0, 319, 20, ['#2a2230', '#3a3040'].map(H_));
  for (let y = 21; y <= 150; y++) for (let x = 0; x <= 319; x++) { const fila = Math.floor((y - 21) / 10), off = fila % 2 ? 12 : 0, jx = (x + off) % 24, jy = (y - 21) % 10, atom = x > 270 && y < 48;
    let c = jx === 0 || jy === 0 ? H_('#6a5e56') : hh(Math.floor((x + off) / 24), fila, 2) > 0.5 ? H_('#a8988a') : H_('#988878'); if (atom) c = jx === 0 || jy === 0 ? H_('#8a7c70') : H_('#9c8e80');
    if (jy === 1 && jx !== 0 && !atom) c = mez(c, H_('#ffffff'), 0.15); if (hh(x, y, 5) > 0.97 && !atom) c = mez(c, K, 0.3); R.pset(x, y, c); }
  for (let x = 0; x <= 319; x += 40) { R.rect(x, 0, x + 2, 20, H_('#4a3e4a')); }
  R.rect(0, 20, 319, 21, H_('#5a4e48'));
  // el suelo de losas en perspectiva
  for (let y = 151; y <= 179; y++) for (let x = 0; x <= 319; x++) { const p = (y - 151) / 28, w = 20 + p * 14, cx = Math.floor((x - 160) / w + 100), fy = Math.floor((y - 151) / (5 + p * 4)), lin = ((x - 160) / w + 100) % 1 < 0.06 || ((y - 151) % Math.round(5 + p * 4)) === 0;
    R.pset(x, y, lin ? H_('#4a3e3a') : hh(cx, fy, 6) > 0.5 ? H_('#7a6a5e') : H_('#6e5e54')); }
  R.rect(0, 150, 319, 151, H_('#3a302c'));
  // las cuatro hornacinas: el arco, el fondo de cada época
  HORN.forEach(([a, b], k) => { const cx = (a + b) / 2, r = (b - a) / 2, top = 76;
    const dentro = (x, y) => x >= a && x <= b && y <= 140 && (y >= top || Math.hypot(x - cx, y - top) <= r);
    // el arco de piedra clara con su dovela
    for (let y = top - r - 5; y <= 142; y++) for (let x = a - 5; x <= b + 5; x++) { const d = Math.hypot(x - cx, y - top); if ((y >= top && (x < a || x > b) && x >= a - 5 && x <= b + 5) || (y < top && d > r && d <= r + 5)) R.pset(x, y, (y < top ? Math.floor(Math.atan2(y - top, x - cx) * 5) % 2 : Math.floor(y / 8) % 2) ? H_('#d8ccb8') : H_('#c8bca8')); }
    R.rect(cx - 3, top - r - 6, cx + 3, top - r + 1, H_('#e8dcc8'));
    for (let y = top - r; y <= 140; y++) for (let x = a; x <= b; x++) { if (!dentro(x, y)) continue; let c;
      if (k === 0) { c = y < 112 ? (hh(x, y, 1) > 0.985 ? H_('#ffffff') : y < 90 ? H_('#141a3a') : H_('#1e2a50')) : y < 118 ? H_('#c8a050') : H_('#2a4a7a'); }
      else if (k === 1) { c = y < 108 ? (y < 80 ? H_('#6aa8e0') : H_('#8ac0ea')) : y < 120 ? H_('#2a7ab8') : H_('#e8dcc0'); }
      else if (k === 2) { c = ((Math.floor(x / 6) + Math.floor(y / 5)) % 2) ? H_('#6a6070') : H_('#5e5464'); }
      else { c = y < 112 ? H_('#e8d8b0') : ((x + y) % 6 < 3 ? H_('#3a8a9a') : H_('#f2eee2')); }
      R.pset(x, y, c); }
    if (k === 0) { R.poligono([[cx - 20, 112], [cx - 6, 90], [cx + 8, 112]], H_('#a8884a')); for (let j = 0; j < 5; j++) R.rect(cx - 18 + j * 3, 110 - j * 4, cx + 6 - j * 3, 110 - j * 4, H_('#8a6a34')); R.disco(cx + 18, 84, 4, H_('#f6f0d0')); }
    if (k === 1) { for (const px of [a + 6, b - 8]) { R.rect(px, 80, px + 4, 112, H_('#f2eee2')); R.rect(px + 3, 80, px + 4, 112, H_('#c8c0b0')); R.rect(px - 1, 78, px + 5, 80, H_('#e8e0d0')); } R.disco(cx, 86, 5, H_('#fff4b0')); }
    if (k === 2) { R.disco(cx, 92, 13, K); for (let j = 0; j < 8; j++) R.poligono([[cx, 92], [cx + Math.cos(j * 0.785) * 12, 92 + Math.sin(j * 0.785) * 12], [cx + Math.cos(j * 0.785 + 0.785) * 12, 92 + Math.sin(j * 0.785 + 0.785) * 12]], [H_('#c83a3a'), H_('#2a5aa8'), H_('#e8b830'), H_('#3a8a4a')][j % 4]);
      R.disco(cx, 92, 3, H_('#f6e08a')); }
    if (k === 3) { R.rect(cx - 14, 82, cx + 14, 104, K); degr(cx - 13, 83, cx + 13, 96, ['#7ab0e0', '#a8d0ee'].map(H_)); R.rect(cx - 13, 97, cx + 13, 103, H_('#2a6a9a')); R.rect(cx + 4, 84, cx + 6, 96, H_('#d8ccb8')); R.pset(cx + 5, 83, H_('#d8ccb8')); R.disco(cx - 6, 95, 4, H_('#c8bca8')); R.rect(cx - 13, 92, cx - 10, 96, H_('#c8bca8')); }
    // el atril de cada uno
    R.poligono([[cx + 4, 134], [cx + 30, 126], [cx + 30, 131], [cx + 4, 139]], K); R.rect(cx + 15, 133, cx + 19, 160, K); R.rect(cx + 16, 133, cx + 18, 159, NOGAL[1]); R.rect(cx + 9, 158, cx + 25, 161, K); R.rect(cx + 10, 159, cx + 24, 160, NOGAL[2]);
    R.poligono([[cx + 5, 134], [cx + 29, 127], [cx + 29, 130], [cx + 5, 137]], NOGAL[2]); R.linea(cx + 5, 137, cx + 29, 130, NOGAL[0]); });
  // las antorchas entre las hornacinas (la llama va aparte)
  for (const x of [82, 158, 234]) { R.rect(x - 1, 70, x + 1, 82, K); R.rect(x, 70, x, 82, NOGAL[1]); R.rect(x - 3, 66, x + 3, 70, H_('#3a3030')); }
});
const quien = [EL.escriba1 ?? EL.escriba, EL.socrates, EL.monje1, EL.piri];
const pasa = [@12.3@, @12.9@, @13.55@], llegaPiri = @14.66@;
const p3 = (t) => {
  galeria();
  // la vida: las llamas, las estrellas y el agua de cada época
  for (const x of [82, 158, 234]) { const f = Math.sin(t * 13 + x) * 1.2; R.disco(x, 63, 3, H_('#e8541a')); R.disco(x + f * 0.4, 62, 2, H_('#f6c030')); R.pset(Math.round(x + f), 58, H_('#fff4b0')); }
  for (let k = 0; k < 6; k++) { const x = 20 + Math.floor(hh(k, 4) * 50), y = 50 + Math.floor(hh(k, 5) * 38); if (Math.sin(t * 4 + k) > 0.3) R.pset(x, y, H_('#ffffff')); }
  for (let x = 92; x <= 148; x++) if ((x + Math.floor(t * 4)) % 7 === 0) R.pset(x, 112 + (x % 3), H_('#8ac0ea'));
  { const bx = 272 + Math.round(Math.sin(t * 0.5) * 6); R.rect(bx - 4, 97, bx + 4, 98, NOGAL[0]); R.poligono([[bx, 87], [bx, 96], [bx + 6, 96]], H_('#f2eee2')); }
  for (let k = 0; k < 3; k++) { const v = (t * 0.07 + k / 3) % 1, x = Math.round(lerp(100, 140, v)), y = Math.round(84 + Math.sin(t * 2 + k) * 2); if (v < 0.9) pajaro(x, y, t, k, H_('#4a5a7a')); }

  // los cuatro copistas, cada uno ante su atril; cada uno copia en cuanto le llega el mapa
  const tiene = (k) => k === 0 || t > (k < 3 ? pasa[k - 1] + 0.45 : llegaPiri);
  const cols = ['#efe2c0', '#e8d4a4', '#dcc48e', '#d4b87a'].map(H_);
  HORN.forEach(([a, b], k) => { const cx = (a + b) / 2, x = cx - 14, escribe = tiene(k) && (k === 3 ? false : (k === 0 ? t < pasa[0] : t < (pasa[k] ?? 99)));
    const ac = R.actor(quien[k], x, 160, t, { dir: 1, sostiene: k === 3 && t > llegaPiri ? [x + 17, 130 - Math.round(tramo(t, llegaPiri, llegaPiri + 0.6) * 6)] : escribe ? [cx + 12 + Math.round(Math.sin(t * 14) * 1.5), 131] : false, sonrisa: k === 3 && t > llegaPiri, sorpresa: k === 3 && t > llegaPiri - 0.5 && t < llegaPiri });
    if (tiene(k) && k < 3) { R.poligono([[cx + 7, 126], [cx + 27, 120], [cx + 28, 128], [cx + 8, 134]], K); R.poligono([[cx + 8, 127], [cx + 26, 121], [cx + 27, 127], [cx + 9, 133]], cols[k]);
      R.linea(cx + 11, 130, cx + 13, 125, H_('#3a6a3a')); R.linea(cx + 13, 125, cx + 18, 126, H_('#3a6a3a')); R.linea(cx + 18, 126, cx + 24, 124, H_('#a83224')); R.pset(cx + 21, 128, H_('#2a4a7a')); R.pset(cx + 22, 128, H_('#2a4a7a')); }
    if (k === 3 && t > llegaPiri) { T.PIEZAS_PR.pergamino(R, ac.mano[0] + 2, ac.mano[1] + 8, { s: 1 }); } });
  // el mapa vuela de un atril al siguiente
  pasa.forEach((s, k) => { const v = tramo(t, s, k < 2 ? s + 0.45 : llegaPiri); if (v <= 0 || v >= 1) return; const a = [(HORN[k][0] + HORN[k][1]) / 2 + 16, 128], b = k < 2 ? [(HORN[k + 1][0] + HORN[k + 1][1]) / 2 + 16, 128] : [(HORN[3][0] + HORN[3][1]) / 2 + 2, 124];
    hojaVuela(a, b, v, 30, 12, 8, cols[k + 1]); });
  if (t > llegaPiri) for (let k = 0; k < 6; k++) { const a2 = t * 2 + k, x = Math.round(274 + Math.cos(a2) * 18), y = Math.round(116 + Math.sin(a2) * 10); if (Math.sin(t * 9 + k) > 0) R.pset(x, y, ORO[2]); }
};
// ── 4 · la vitrina y el retrato (LOCAL) ──
const vitrinaFija = fijo(() => {
  for (let y = 0; y <= 112; y++) for (let x = 0; x <= 319; x++) { const atom = x > 268 && y < 50, d = (Math.abs(((x % 16) - 8)) + Math.abs(((y % 20) - 10))) < 5;
    R.pset(x, y, atom ? H_('#6a2a2e') : d ? H_('#7a3236') : hh(x, y, 2) > 0.96 ? H_('#5a2226') : H_('#6a2a2e')); }
  R.rect(0, 0, 319, 5, NOGAL[0]); R.rect(0, 5, 319, 5, NOGAL[2]);
  R.rect(0, 112, 319, 160, H_('#4a2a16')); R.rect(0, 112, 319, 114, NOGAL[2]); for (let x = 0; x < 320; x += 10) { R.rect(x, 115, x, 159, H_('#3a2010')); R.rect(x + 1, 115, x + 1, 159, H_('#5a361e')); }
  tablas(0, 161, 319, 179, 5, ['#3a2414', '#8a5a34', '#7a4a2a', '#a8784a'].map(H_), 31);
  // las librerías de los lados
  for (const [a, b, y0] of [[0, 78, 30], [244, 319, 56]]) { R.rect(a, y0, b, 160, K); R.rect(a + 1, y0 + 1, b - 1, 159, NOGAL[0]); for (let y = y0 + 26; y < 160; y += 26) R.rect(a + 2, y, b - 2, y + 2, NOGAL[2]);
    for (let y = y0 + 25, k = 0; y < 160; y += 26, k++) lomos(a + 3, b - 3, y, 20, k + a); }
  // el retrato: un marco dorado y el científico de pelo blanco despeinado, de espaldas (sin rasgos)
  marco(124, 18, 196, 72, 4, ORO);
  for (let y = 23; y <= 67; y++) for (let x = 129; x <= 191; x++) R.pset(x, y, mez(H_('#5a3a22'), H_('#8a6038'), cl(1 - Math.hypot(x - 160, y - 40) / 40 + (hh(x >> 1, y >> 1, 8) - 0.5) * 0.3)));
  for (let y = 54; y <= 67; y++) for (let x = 138; x <= 182; x++) if (Math.hypot(x - 160, y - 72) <= 22 && y <= 67) R.pset(x, y, x < 160 ? ((x + y) % 4 ? H_('#54545e') : H_('#484852')) : ((x + y) % 4 ? H_('#3e3e48') : H_('#34343e')));
  R.rect(155, 50, 165, 56, H_('#d8a888')); R.rect(155, 55, 165, 56, H_('#b88868'));
  R.disco(160, 41, 12, H_('#c8c8d0')); R.disco(159, 40, 11, H_('#e8e8ee')); R.disco(157, 37, 6, H_('#f6f6f8'));
  for (let k = 0; k < 36; k++) { const a = hh(k, 1) * Math.PI * 2, r = 10 + hh(k, 2) * 6, x = Math.round(160 + Math.cos(a) * r), y = Math.round(41 + Math.sin(a) * r * 0.9); if (y > 52) continue; R.linea(Math.round(160 + Math.cos(a) * 8), Math.round(41 + Math.sin(a) * 7), x, y, hh(k, 3) > 0.4 ? H_('#f6f6f8') : H_('#c8c8d0')); }
  R.rect(147, 47, 149, 51, H_('#c89878')); R.rect(171, 47, 173, 51, H_('#c89878'));
  // la vitrina: el mueble de nogal y la caja de cristal con el libro antiguo abierto
  R.rect(92, 128, 228, 162, K); R.rect(93, 129, 227, 161, H_('#5a361e')); R.rect(93, 129, 227, 131, NOGAL[2]); for (const x0 of [98, 164]) { R.rect(x0, 135, x0 + 58, 157, H_('#4e2e18')); R.rect(x0, 135, x0 + 58, 135, NOGAL[0]); R.rect(x0 + 26, 145, x0 + 32, 146, ORO[1]); }
  R.rect(98, 82, 222, 128, K); R.rect(99, 83, 221, 127, H_('#1e3a2a')); R.rect(99, 116, 221, 127, H_('#2a5a3a')); R.rect(99, 116, 221, 116, H_('#3a7a4a'));
  R.poligono([[136, 116], [184, 116], [178, 102], [142, 102]], H_('#3a2414'));
  T.PIEZAS_PR.libro(R, 160, 114, { abierto: true, s: 2 });
  R.rect(196, 118, 216, 125, H_('#efe6cc')); R.rect(196, 118, 216, 118, H_('#c8bc9c'));
  R.rect(98, 82, 222, 83, ORO[1]); R.rect(98, 82, 99, 128, ORO[1]); R.rect(221, 82, 222, 128, ORO[0]);
  // una maceta con un helecho
  R.rect(232, 146, 246, 160, K); R.rect(233, 147, 245, 159, H_('#a8542a')); for (let k = 0; k < 9; k++) R.linea(239, 146, 239 + Math.round(Math.cos(-0.3 - k * 0.32) * 13), 146 + Math.round(Math.sin(-0.3 - k * 0.32) * 13), H_('#3a7a3a'));
});
const p4 = (t) => {
  vitrinaFija();
  // el número del año del libro en su cartelita y la luz del retrato que se enciende en «Albert Einstein»
  R.numero('1958', 206, 124, { centro: true, color: K, sombra: false });
  const luz = t > @17.4@;
  R.rect(140, 15, 180, 18, K); R.rect(141, 16, 179, 17, ORO[1]); R.rect(141, 16, 179, 16, ORO[2]);
  if (luz) haz([[142, 18], [178, 18], [198, 74], [122, 74]], H_('#fff4c8'), 0.2 + 0.02 * Math.sin(t * 9));
  else for (let y = 23; y <= 67; y++) for (let x = 129; x <= 191; x++) R.pset(x, y, mez(R.pget(x, y), K, 0.35));
  // los reflejos del cristal que corren
  for (let k = 0; k < 2; k++) { const x0 = 100 + ((t * 14 + k * 60) % 150); haz([[x0, 84], [x0 + 6, 84], [x0 - 14, 126], [x0 - 20, 126]], H_('#ffffff'), 0.16); }
  // pasa una página del libro antiguo en «foreword»
  const pg = tramo(t, @18.96@, @19.5@);
  if (pg > 0 && pg < 1) { const w = Math.round(Math.cos(pg * Math.PI) * 22); R.poligono([[160, 92], [160 + w, 92 - Math.round(Math.sin(pg * Math.PI) * 6)], [160 + w, 114 - Math.round(Math.sin(pg * Math.PI) * 6)], [160, 114]], H_('#f2eadc')); R.linea(160, 92, 160 + w, 92 - Math.round(Math.sin(pg * Math.PI) * 6), H_('#8a7a5a')); }
  // el chico señala el retrato; la señora se sorprende; un cliente pasa al fondo
  const uc = tramo(t, P4 + 0.1, @17.2@), xc = Math.round(lerp(40, 72, uc));
  R.actor(EL.chico, xc, 174, t, { dir: 1, anda: uc > 0 && uc < 1, dedo: t > @17.7@, sonrisa: t > @19.0@ });
  R.actor(EL.senora30, 250, 174, t, { dir: -1, sorpresa: t > @17.6@ && t < @19.2@, sonrisa: t > @19.2@, habla: t > @19.4@ && Math.sin(t * 7) > 0.2 });
  const ub = tramo(t, P4, P5), xb = Math.round(lerp(330, -20, ub));
  if (xb > 238 || xb < 80) R.actor(EL.librero, xb, 166, t, { dir: -1, anda: true });
  if (luz && t < @18.6@) for (let k = 0; k < 6; k++) { const a = t * 2 + k, x = Math.round(160 + Math.cos(a) * 34), y = Math.round(45 + Math.sin(a) * 24); if (Math.sin(t * 9 + k) > 0) { R.pset(x, y, H_('#ffffff')); R.pset(x + 1, y, ORO[2]); } }
};
// ── 5 · la librería: la puerta se abre y entra la gente ──
const p5 = (t) => {
  const o = { encuadre: 'libreria' }; T.america(R, t, o);
  // la puerta abierta: la luz de la calle y la hoja de la puerta girada
  const ab = tramo(t, @21.3@, @21.7@);
  if (ab > 0) { const w = Math.round(lerp(26, 6, ab)); R.rect(5, 35, 29, 131, H_('#f2e8c8')); R.rect(5, 110, 29, 131, H_('#b8a88a')); R.rect(5, 60, 29, 109, H_('#a85a3a')); for (let y = 62; y < 108; y += 6) R.rect(5, y, 29, y, H_('#8a4a2e'));
    R.rect(5, 35, 29, 58, H_('#bcd8ee')); R.rect(12, 46, 22, 58, H_('#e8b830'));
    for (let k = 0; k < 2; k++) { const qx = 8 + k * 9 + Math.round(Math.sin(t * 2 + k) * 1); R.disco(qx + 3, 98, 4, K); R.disco(qx + 3, 98, 3, k ? H_('#e8b890') : H_('#c8906a')); R.rect(qx + 1, 93, qx + 5, 95, k ? H_('#4a3a2a') : H_('#d8a850')); R.rect(qx - 1, 102, qx + 7, 112, K); R.rect(qx, 103, qx + 6, 112, k ? H_('#3a5a8a') : H_('#a83a3a')); }

    R.rect(4, 34, 4 + w, 132, K); R.rect(5, 35, 3 + w, 131, H_('#6a4224')); if (w > 8) R.rect(7, 40, 1 + w, 80, H_('#a8c8e0')); }
  // los clientes entran uno tras otro y cogen el libro de la mesa
  const cl_ = [[EL.chica, @21.6@, 132, 152], [EL.senor30, @22.3@, 168, 152], [EL.chico, @23.0@, 82, 176]];
  const pers = [];
  cl_.forEach(([def, t0, xf, s]) => { const u = tramo(t, t0, t0 + 1.2); if (u <= 0) return; const x = Math.round(lerp(10, xf, u)), y = Math.round(lerp(132, s, Math.min(1, u * 3)));
    pers.push([def, x, y, u, t0, s]); });
  R.actor(EL.librero, 262, 146, t, { dir: -1, sonrisa: t > @22.5@, sostiene: t > @23.6@ && t < @24.2@ ? [254, 116] : false, habla: t > @22.0@ && t < @22.8@ && Math.sin(t * 7) > 0 });
  const delanteros = [];
  for (const p of pers) { if (p[5] === 176) { delanteros.push(p); continue; } const [def, x, y, u, t0] = p, coge = u >= 1 && t > t0 + 1.4;
    const a = R.actor(def, x, y, t, { dir: u < 1 ? 1 : -1, anda: u < 1, sostiene: coge, sonrisa: coge }); if (coge) libroHG(a.mano[0] + 1, a.mano[1] + 7); }
  T.americaDelante(R, t, o);
  for (const [def, x, y, u, t0] of delanteros) { const coge = u >= 1 && t > t0 + 1.3; const a = R.actor(def, x, Math.round(lerp(132, 176, Math.min(1, u * 1.5))), t, { dir: 1, anda: u < 1, sostiene: coge, sonrisa: coge }); if (coge) libroHG(a.mano[0] + 1, a.mano[1] + 7); }
  if (ab > 0 && ab < 1 || (t > @21.3@ && t < @22.0@)) { const sw = Math.round(Math.sin(t * 20) * 2); R.rect(16 + sw, 30, 18 + sw, 33, ORO[1]); R.pset(17 + sw, 34, ORO[0]); }
};
const efectos = [[@0.6@, 'maquina'], [@2.9@, 'papel'], [@4.5@, 'brillo'], [@9.02@, 'brillo'], [@9.5@, 'whoosh'], [@10.5@, 'papel'], [@12.3@, 'papel'], [@13.55@, 'papel'], [@14.7@, 'brillo'], [@17.4@, 'interruptor'], [@19.0@, 'papel'], [@21.4@, 'campana'], [@22.6@, 'puerta'], [@23.8@, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 1966 });
'''))
