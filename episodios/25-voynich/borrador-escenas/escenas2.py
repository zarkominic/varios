import re

# las marcas reales de la voz (atomo/plato/escenas/marcas-ep25.json): inicio y _fin de la frase de cada escena
MARCAS = {'vm-pergamino': (0.9, 16.466), 'vm-dibujos': (0.5, 21.778), 'vm-pista': (0.5, 17.257)}


def marcas(sc, s):
    # @s@ (segundos de la escena, sacados de linea.json) → en('marca', fracción)
    a, b = MARCAS[sc]
    return re.sub(r'@([0-9.]+)@', lambda m: "en('%s', %.4f)" % (sc[3:], (float(m.group(1)) - a) / (b - a)), s)


# lo que comparten los insertos locales: la paleta del pergamino y la mesa, el pergamino con sus manchas, el tapete,
# los signos inventados (nunca letras), la lupa con su aumento, las motas y la cadena de cuentas
COMUN = r'''
const Q = Object.fromEntries(Object.entries({
  perg: '#ecdcb2', pergL: '#f7ecd2', pergS: '#d2bc90', pergD: '#a88c60', pergM: '#dcc698', pergO: '#8a6e44',
  tinta: '#4a2e1c', tintaL: '#7a5034', tintaS: '#2a180c', oro: '#e8b830', oroL: '#ffe890', oroS: '#a87a18',
  verde: '#6a9a4a', verdeL: '#a0c870', verdeS: '#3e6a2a', azul: '#5a82b8', azulL: '#9ab8dc', azulS: '#34588a',
  rojo: '#b0482e', rojoL: '#d87a50', rojoS: '#7a2a1a', ocre: '#c8a050', ocreL: '#e0c078', ocreS: '#9a7430',
  agua: '#6aae7e', aguaL: '#a8d8b0', aguaS: '#3e8058',
  tap: '#2e5a3a', tapL: '#3e7048', tapS: '#1e3e28', tapD: '#14281a',
  nog: '#5a3a24', nogL: '#7a5232', nogS: '#3a2414', nogD: '#2a180c',
  laton: '#c8a040', latonL: '#f0d080', latonS: '#8a6420', papel: '#f2eedc', papelS: '#cfc8b0', raya: '#a8bcd2', margen: '#d88a8a',
  guante: '#f4f2ea', guanteS: '#c8c4b8', k: '#1a1014', luz: '#fff0c4', blanco: '#ffffff', piel: '#f2c49a', pielS: '#d4946a', grafito: '#4a4a52', amarillo: '#e8c040',
}).map(([k, v]) => [k, hex(v)]));
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const tine = (x, y, k, c) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, k)); };
const ease = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
const BUF = {};
// un fondo fijo, pintado una sola vez en su búfer
const fijo = (k, f) => { if (!BUF[k]) { const b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); BUF[k] = b; } R.copiar(BUF[k]); };
// una trayectoria por fotogramas clave [t, x, y] con entrada y salida suaves
const camino = (K, t) => { if (t <= K[0][0]) return [K[0][1], K[0][2]]; for (let i = 1; i < K.length; i++) if (t < K[i][0]) { const u = ease((t - K[i - 1][0]) / (K[i][0] - K[i - 1][0])); return [lerp(K[i - 1][1], K[i][1], u), lerp(K[i - 1][2], K[i][2], u)]; } const L = K[K.length - 1]; return [L[1], L[2]]; };
// los signos del libro, inventados (bucles, rizos, «gallows»; nunca letras): 8 formas de 5 × 9 (la fila 6 es la línea)
// y cuatro variantes (punto, cola, raya), 32 en total
const GL = [
  ['.....', '.....', '.....', '.##..', '#..#.', '#..#.', '.##.#', '.....', '.....'],
  ['.#.#.', '.#.#.', '.###.', '##.##', '.#.#.', '.#.#.', '.#.#.', '.....', '.....'],
  ['.....', '.....', '.....', '.##..', '#..#.', '.###.', '...#.', '..#..', '.#...'],
  ['.....', '.....', '.....', '.....', '#.#..', '#.#..', '.#.#.', '.....', '.....'],
  ['.....', '.....', '.#...', '.....', '.##..', '#..#.', '...#.', '..#..', '.....'],
  ['#....', '.#...', '.#...', '.##..', '.#.#.', '.#.#.', '.##..', '.....', '.....'],
  ['.....', '.....', '.....', '.....', '.#.#.', '#.#..', '.#.#.', '.....', '.....'],
  ['..##.', '.#...', '..#..', '...#.', '.##..', '#..#.', '.##..', '.....', '.....'],
];
const GLW = GL.map((m) => Math.max(...m.map((f) => f.lastIndexOf('#') + 1)));
const anchoG = (id) => GLW[id % 8] + (((id >> 3) & 3) === 2 ? 1 : 0);
const glifo = (id, x, yb, esc, col) => {
  const g = id % 8, mod = (id >> 3) & 3, m = GL[g], w = GLW[g];
  const p = (i, j) => { const X = Math.round(x + i * esc), Y = Math.round(yb + (j - 6) * esc); for (let a = 0; a < esc; a++) for (let b = 0; b < esc; b++) R.pset(X + a, Y + b, col); };
  for (let j = 0; j < 9; j++) for (let i = 0; i < 5; i++) if (m[j][i] === '#') p(i, j);
  if (mod === 1) p(Math.max(0, w - 2), 1);
  if (mod === 2) { p(w, 5); p(w, 4); }
  if (mod === 3) for (let i = 0; i < w; i++) p(i, 2);
  return anchoG(id) * esc;
};
// un renglón de palabras de signos entre x0 y x1 (col: color o función (x, id, i)); con out, solo apunta las posiciones
const renglon = (x0, yb, x1, sem, col, esc = 1, out = null) => {
  let x = x0, i = 0;
  for (let p = 0; p < 60; p++) {
    const nw = 2 + Math.floor(hh(sem, p, 8) * 4), ids = []; let w = 0;
    for (let j = 0; j < nw; j++) { const id = Math.floor(hh(sem, i + j, 9) * 32); ids.push(id); w += (anchoG(id) + 1) * esc; }
    if (x + w > x1) break;
    for (const id of ids) { if (out) out.push({ x, y: yb, id, i }); else glifo(id, x, yb, esc, typeof col === 'function' ? col(x, id, i) : col); x += (anchoG(id) + 1) * esc; i++; }
    x += 3 * esc;
  }
  return i;
};
// una hoja de pergamino: moteado en tres tonos, poros, bordes irregulares oscurecidos, puntos de óxido y dos cercos de agua
const pergamino = (x0, y0, x1, y1, k = 0) => {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const d = Math.min(y - y0 - hh(x >> 2, k, 7) * 2, y1 - y - hh(x >> 2, k, 17) * 2, x - x0 - hh(y >> 2, k, 27) * 2, x1 - x - hh(y >> 2, k, 37) * 2);
    if (d < 0) continue;
    const n = hh(x >> 1, y >> 1, k + 1), m = hh(x >> 3, y >> 3, k + 2), m2 = hh(x >> 4, y >> 4, k + 12);
    let c = Q.perg;
    if (m < 0.3 && n < 0.6) c = Q.pergM;
    if (m2 < 0.2 && n < 0.4) c = Q.pergS;
    if (n > 0.93) c = Q.pergL;
    if (hh(x, y, k + 5) > 0.988) c = Q.pergS;
    if (d < 1.5) c = Q.pergD; else if (d < 4 && ((x + y) & 1)) c = Q.pergS; else if (d < 7 && (x + y) % 3 === 0) c = Q.pergM;
    if (hh(x >> 1, y >> 1, k + 9) > 0.996) c = Q.pergO;
    R.pset(x, y, c);
  }
  for (let s = 0; s < 2; s++) {
    const cx = x0 + (x1 - x0) * (0.2 + hh(s, k, 41) * 0.6), cy = y0 + (y1 - y0) * (0.2 + hh(s, k, 42) * 0.6), rx = 12 + hh(s, k, 43) * 14, ry = rx * 0.7;
    for (let a = 0; a < 220; a++) { const an = a / 220 * Math.PI * 2, w = 1 + Math.sin(an * 5 + s) * 0.08, X = Math.round(cx + Math.cos(an) * rx * w), Y = Math.round(cy + Math.sin(an) * ry * w); if (X >= x0 + 4 && X <= x1 - 4 && Y >= y0 + 4 && Y <= y1 - 4) { tine(X, Y, 0.3, Q.pergO); tine(X, Y + 1, 0.12, Q.pergD); } }
  }
};
// el tapete verde de la mesa, con su trama
const tapete = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = hh(x >> 1, y >> 1, 3); let c = n < 0.2 ? Q.tapS : n > 0.86 ? Q.tapL : Q.tap; if ((x + 2 * y) % 5 === 0 && n > 0.45) c = Q.tapS; if (hh(x, y, 13) > 0.985) c = Q.tapL; R.pset(x, y, c); } };
// la luz de la lámpara: un charco cálido y los bordes en penumbra
const vineta = (cx, cy, r, k = 0.45) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - cx) / r, (y - cy) / (r * 0.75)); if (d > 1) { const a = Math.min(k, (d - 1) * 0.7); if (a > 0.04 && ((x + y) & 1 || a > 0.12)) R.pset(x, y, mez(R.pget(x, y), Q.tapD, a)); } else if (d < 0.55 && ((x + y) & 1)) tine(x, y, 0.07, Q.luz); } };
// motas de polvo en la luz
const motas = (t, n = 12, y0 = 20, y1 = 170, sem = 3) => { for (let k = 0; k < n; k++) { const x = Math.round((hh(k, 1, sem) * 340 + t * (3 + hh(k, 2, sem) * 4)) % 340 - 10), y = Math.round(y0 + hh(k, 3, sem) * (y1 - y0) + Math.sin(t * 0.7 + k) * 5); if (Math.sin(t * 1.3 + k * 1.7) > -0.2 && !(x > 274 && y < 48) && !(x < 172 && y < 16)) { tine(x, y, 0.6, Q.luz); if (k % 3 === 0) tine(x + 1, y, 0.3, Q.luz); } } };
// la cadena de cuentas de latón que sujeta la hoja (con t, un brillo la recorre)
const cuentas = (x0, y0, x1, y1, t = null) => { const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 4); const b = t == null ? -9 : Math.floor(((t % 4) / 4) * (n + 20)); for (let i = 0; i <= n; i++) { const x = Math.round(x0 + (x1 - x0) * i / n), y = Math.round(y0 + (y1 - y0) * i / n + Math.sin(i * 0.7)); if (t == null) { R.disco(x + 1, y + 2, 1.6, Q.tapD); R.disco(x, y, 1.7, Q.latonS); R.pset(x, y, Q.laton); R.pset(x - 1, y - 1, Q.latonL); } else if (i === b) { R.pset(x - 1, y - 1, Q.blanco); R.pset(x, y - 1, Q.latonL); } } };
// un lápiz de grafito: madera amarilla, punta afilada
const lapiz = (x0, y0, x1, y1) => { const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0)); for (let i = 0; i <= n; i++) { const u = i / n, x = Math.round(lerp(x0, x1, u)), y = Math.round(lerp(y0, y1, u)); if (u > 0.9) R.pset(x, y, Q.grafito); else if (u > 0.78) { R.pset(x, y, Q.ocreL); R.pset(x + 1, y, Q.pergD); } else { R.pset(x, y, Q.amarillo); R.pset(x + 1, y, Q.ocreS); R.pset(x - 1, y, Q.k); R.pset(x + 2, y, Q.k); } } };
// la lupa de latón: el cristal aumenta (zoom) lo que tiene debajo, con su reflejo; el aro con luz y sombra y un brillo
const lupa = (cx, cy, r, t, zoom = 2) => {
  cx = Math.round(cx); cy = Math.round(cy);
  const S = [];
  for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) { const sx = Math.round(cx + x / zoom), sy = Math.round(cy + y / zoom); S.push(sx >= 0 && sx < 320 && sy >= 0 && sy < 180 ? R.pget(sx, sy) : Q.k); }
  let n = 0;
  for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++, n++) { const d = Math.hypot(x, y); if (d > r) continue; let c = mez(S[n], hex('#d8eef6'), 0.1); if (d > r - 4 && x + y < -r * 0.7) c = mez(c, Q.blanco, 0.5); else if (Math.abs(x + y + r * 0.45) < 1.1 && d < r - 3) c = mez(c, Q.blanco, 0.35); R.pset(cx + x, cy + y, c); }
  for (let y = -r - 4; y <= r + 4; y++) for (let x = -r - 4; x <= r + 4; x++) { const d = Math.hypot(x, y); if (d > r && d <= r + 3.6) { const l = (-x - y) / (d * 1.41); R.pset(cx + x, cy + y, d > r + 2.8 || d < r + 0.6 ? Q.k : l > 0.45 ? Q.latonL : l < -0.35 ? Q.latonS : Q.laton); } }
  const g = (t % 3.2) / 0.6; if (g < 1) { const a = -2.7 + g * 1.9; R.pset(Math.round(cx + Math.cos(a) * (r + 2)), Math.round(cy + Math.sin(a) * (r + 2)), Q.blanco); R.pset(Math.round(cx + Math.cos(a) * (r + 1)), Math.round(cy + Math.sin(a) * (r + 1)), Q.latonL); }
};
// el mango de la lupa, a 45° hacia abajo a la derecha; devuelve su punta
const mango = (cx, cy, r, L = 18) => { const s = (r + 3) / 1.414; for (let k = 0; k <= L; k++) { const x = cx + s + k * 0.707, y = cy + s + k * 0.707; for (let w = -2; w <= 2; w++) { const X = Math.round(x - w * 0.707), Y = Math.round(y + w * 0.707), c = Math.abs(w) === 2 ? Q.k : k < 5 ? (w < 0 ? Q.latonL : Q.laton) : (w < 0 ? Q.nogL : w > 0 ? Q.nogS : Q.nog); R.pset(X, Y, c); if (Math.abs(w) < 2) R.pset(X + 1, Y, c); } } return [Math.round(cx + s + L * 0.707), Math.round(cy + s + L * 0.707)]; };
// una hoja dibujada a tinta con aguada: elipse girada con nervio
const hojaT = (cx, cy, l, w, ang, c, cS) => { const ca = Math.cos(ang), sa = Math.sin(ang); for (let j = -l - 1; j <= l + 1; j++) for (let i = -w - 1; i <= w + 1; i++) { const d = (j * j) / (l * l) + (i * i) / (w * w); if (d > 1.25) continue; const X = Math.round(cx + j * ca - i * sa), Y = Math.round(cy + j * sa + i * ca); R.pset(X, Y, d > 0.8 ? Q.tinta : i === 0 ? cS : (i < 0 ? c : mez(c, cS, 0.35))); } };
'''

E = {}

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['vm-pergamino'] = ('El pergamino', '''// VM-PERGAMINO (frase 4): lo que sabemos del libro. Cuatro planos:
// 1. la mesa de estudio de la biblioteca: la bibliotecaria entra por detrás de la lámpara hasta el libro; con «240» las
//    hojas pasan solas y un contador sube hasta 240 con el icono del libro; el investigador lo apunta;
// 2. inserto local, los signos de muy cerca sobre el pergamino (vitela, poros, cercos): un dedo recorre el renglón de
//    abajo y los signos que toca se encienden; con «anywhere else» saltan tres «?» sobre los signos;
// 3. inserto local, el recuento: la libreta cuadriculada junto al libro; los signos se copian en casillas (20 con
//    «20», 30 con «30») y la mano con el lápiz escribe la cifra en la etiqueta; con «over and over» se marcan palotes y
//    en el libro parpadean en oro los que se repiten;
// 4. inserto local, gag 2: la lupa baja sobre la página y los signos echan patitas y huyen del cristal; la lupa los
//    persigue tres veces («single word», «anyone», «read») y se va; los signos vuelven a su renglón.''', COMUN + marcas('vm-pergamino', r'''
const P2 = @4.57@, P3 = @8.73@, P4 = @12.72@;
const N240 = @2.97@;
// 1 · la mesa: la bibliotecaria entra, las hojas pasan solas y el contador llega a 240
const p1 = (t) => {
  T.biblioteca(R, t, { camara: 'mesa' });
  const u = tramo(t, 0.25, 1.75), x = Math.round(lerp(18, 112, ease(u)));
  R.actor(EL.bibliotecaria, x, 118, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > N240 - 0.25 && t < P2 - 0.2, sonrisa: t > @3.79@, habla: t > @0.9@ && t < @1.86@ + 0.2 && Math.sin(t * 9) > 0 });
  const v = tramo(t, @3.79@, @4.4@);
  R.actor(EL.investigadorIA, 206, 118, t, { dir: -1, sorpresa: t > N240 + 0.2 && t < @3.79@, sonrisa: t > @3.79@, dedo: v > 0 && v < 1 });
  T.bibliotecaDelante(R, t, { camara: 'mesa' });
  // las hojas de la derecha pasan solas mientras sube la cuenta
  const f = tramo(t, N240 - 0.1, @3.79@ + 0.15);
  if (f > 0 && f < 1) for (let k = 0; k < 2; k++) {
    const ph = (f * 7 + k * 0.5) % 1, xe = Math.round(218 - ph * 55), lift = Math.round(Math.sin(ph * Math.PI) * 9);
    R.poligono([[163, 127], [xe, 127 - lift], [xe, 157 - lift], [163, 157]], mez(Q.pergL, Q.pergS, ph * 0.6));
    R.linea(xe, 127 - lift, xe, 157 - lift, Q.pergD); R.linea(163, 127, xe, 127 - lift, Q.pergD);
    for (let j = 133; j < 154; j += 5) R.linea(Math.min(xe, 166) + 3, j - Math.round(lift * 0.5), Math.max(xe, 166) - 4, j - Math.round(lift * 0.6), Q.tintaL);
  }
  // la cuenta: el icono del libro y la cifra, sobre los paneles
  const c = tramo(t, N240 - 0.1, @3.79@);
  if (c > 0) {
    const n = Math.round(240 * (1 - (1 - c) * (1 - c))), sube = Math.round((1 - ease(tramo(t, N240 - 0.1, N240 + 0.25))) * 6);
    { const bx = 140, by = 72 + sube; R.poligono([[bx - 1, by + 1], [bx + 10, by - 1], [bx + 10, by + 13], [bx - 1, by + 15]], Q.tintaS); R.poligono([[bx + 10, by - 1], [bx + 21, by + 1], [bx + 21, by + 15], [bx + 10, by + 13]], Q.tintaS); R.poligono([[bx, by + 2], [bx + 9, by], [bx + 9, by + 12], [bx, by + 14]], Q.pergL); R.poligono([[bx + 11, by], [bx + 20, by + 2], [bx + 20, by + 14], [bx + 11, by + 12]], Q.perg); for (let j = 3; j < 12; j += 3) { R.linea(bx + 2, by + j + 1, bx + 7, by + j, Q.tintaL); R.linea(bx + 13, by + j, bx + 18, by + j + 1, Q.tintaL); } }
    R.numero(String(n), 186, 86 + sube, { tam: 16, centro: true });
    if (t > @3.79@ && t < @3.79@ + 0.5 && Math.floor(t * 10) % 2) for (const [dx, dy] of [[-30, -18], [30, -16], [-26, 4], [34, 2]]) { R.pset(186 + dx, 76 + dy, Q.blanco); R.pset(185 + dx, 76 + dy, Q.oroL); }
  }
};
// 2 · los signos de cerca: el dedo recorre el renglón y se encienden; saltan los «?»
const L1 = [], L4 = [];
const p2 = (t) => {
  fijo('signos', () => {
    tapete(0, 0, 319, 179);
    pergamino(-8, 10, 330, 190, 11);
    // la hoja de debajo asoma por arriba y la cadena de cuentas la sujeta
    for (let x = 0; x < 320; x++) { R.pset(x, 9 + Math.round(hh(x >> 3, 0, 4)), Q.pergD); }
    cuentas(-4, 17, 324, 14);
    // en el margen izquierdo, la punta de un dibujo: un tallo con tres hojas azules y verdes
    R.linea(14, 178, 20, 24, Q.tinta); R.linea(15, 178, 21, 24, Q.verdeS);
    hojaT(10, 60, 10, 4, 2.2, Q.azul, Q.azulS); hojaT(26, 104, 11, 4, 0.9, Q.verde, Q.verdeS); hojaT(9, 146, 10, 4, 2.4, Q.azul, Q.azulS);
    renglon(36, 60, 306, 3, Q.tinta, 3, L1); for (const g of L1) glifo(g.id, g.x, g.y, 3, Q.tinta);
    renglon(36, 90, 306, 4, Q.tinta, 3);
    renglon(36, 120, 306, 5, Q.tinta, 3);
    renglon(36, 150, 306, 6, Q.tinta, 3, L4); for (const g of L4) glifo(g.id, g.x, g.y, 3, Q.tinta);
    // la tinta, más clara donde se gastó: unos píxeles de luz dentro de los trazos
    for (let y = 30; y < 170; y++) for (let x = 36; x < 306; x++) if (R.pget(x, y) === Q.tinta && hh(x, y, 61) > 0.86) R.pset(x, y, Q.tintaL);
    vineta(170, 96, 196, 0.38);
  });
  cuentas(-4, 17, 324, 14, t);
  // el renglón de abajo: lo que el dedo ya tocó, en oro
  const u = tramo(t, @4.83@, @8.39@), fx = Math.round(lerp(30, 300, u));
  for (const g of L4) { const c = g.x + 6 < fx ? (fx - g.x < 22 ? Q.oroL : Q.oro) : Q.tinta; if (c !== Q.tinta) glifo(g.id, g.x, g.y, 3, c); }
  motas(t, 14, 24, 170, 5);
  // los «?» que saltan sobre tres signos del primer renglón: «doesn't appear anywhere else»
  [[@7.03@, 3], [@7.37@, 9], [@7.57@, 15]].forEach(([t0, i]) => { const g = L1[Math.min(i, L1.length - 1)]; if (!g || t < t0) return; const s = tramo(t, t0, t0 + 0.25), y = Math.round(20 - Math.sin(s * Math.PI) * 4); glifo(g.id, g.x, g.y, 3, Q.rojoS); R.icono('?', g.x, y, Q.rojo, Q.k, 3); });
  // el dedo con su brazo canónico, desde abajo a la izquierda
  T.brazo(R, fx - 44, 202, fx - 13, 163, '#3a4a6a', 1);
};
// 3 · el recuento en la libreta
const MS = [];
const CEL = (k) => [128 + (k % 6) * 28, 56 + Math.floor(k / 6) * 24];
const p3 = (t) => {
  fijo('recuento', () => {
    tapete(0, 0, 319, 179);
    pergamino(-10, 4, 100, 128, 21);
    for (let r = 0; r < 7; r++) renglon(4, 24 + r * 16, 92, 30 + r, Q.tinta, 2, MS);
    for (const g of MS) glifo(g.id, g.x, g.y, 2, Q.tinta);
    // la libreta de espiral con su cuadrícula y el margen rojo
    R.rect(112, 50, 306, 179, Q.tapD);
    for (let y = 46; y <= 179; y++) for (let x = 108; x <= 302; x++) { let c = hh(x >> 1, y >> 1, 71) > 0.9 ? Q.papelS : Q.papel; if ((x - 108) % 8 === 0 || (y - 46) % 8 === 0) c = ((x + y) & 1) ? Q.raya : mez(Q.raya, Q.papel, 0.5); if (x === 120) c = Q.margen; if (x > 296) c = mez(c, Q.papelS, 0.5); R.pset(x, y, c); }
    for (let x = 114; x < 300; x += 10) { R.disco(x, 46, 3, Q.grafito); R.disco(x, 46, 2, Q.tap); R.pset(x - 1, 43, Q.blanco); R.rect(x - 1, 47, x + 1, 50, Q.tapD); }
    // arriba, en la mesa: la goma, un clip y la caja de fichas de archivo
    R.rect(186, 22, 266, 42, Q.tapD); R.rect(182, 18, 262, 38, Q.nogS); R.rect(183, 19, 261, 37, Q.nog); for (let x = 188; x < 258; x += 4) { R.rect(x, 15, x + 2, 19, x % 8 ? Q.papel : Q.papelS); } R.rect(210, 25, 234, 31, Q.latonS); R.rect(211, 26, 233, 30, Q.laton); R.rect(211, 26, 233, 26, Q.latonL);
    R.linea(130, 26, 150, 26, Q.grafito); R.linea(130, 26, 130, 32, Q.grafito); R.linea(130, 32, 148, 32, Q.grafito); R.linea(148, 32, 148, 28, Q.grafito);
    // la etiqueta de papel con su ojal y cordel
    R.rect(16, 138, 94, 174, Q.tapD); R.rect(13, 135, 91, 171, Q.papelS); R.rect(14, 136, 90, 170, Q.papel);
    for (let x = 14; x < 91; x++) if (hh(x, 1, 5) > 0.7) R.pset(x, 136, Q.papelS);
    R.disco(22, 142, 2.5, Q.papelS); R.disco(22, 142, 1.2, Q.tapD); R.linea(22, 142, 4, 128, Q.rojoS); R.linea(23, 142, 5, 128, Q.rojo);
    // el lápiz de repuesto y la goma
    lapiz(232, 178, 300, 172); R.rect(16, 120, 30, 126, Q.rojoL); R.rect(16, 120, 30, 120, Q.blanco);
    vineta(200, 92, 210, 0.3);
  });
  // cuántas casillas: 20 con «20», 30 con «30»
  const n = t < @9.3@ ? Math.round(20 * ease(tramo(t, P3 + 0.03, @9.0@))) : 20 + Math.round(10 * ease(tramo(t, @9.4@, @9.85@)));
  for (let k = 0; k < n; k++) {
    const [cx, cy] = CEL(k), id = (k * 7 + 3) % 32, nueva = k === n - 1 && t < @9.95@;
    if (nueva) { R.rect(cx, cy, cx + 13, cy + 22, Q.oroL); }
    glifo(id, cx + 2, cy + 16, 2, nueva ? Q.tintaS : Q.tinta);
  }
  // «repeated over and over»: los palotes crecen en ola y los signos repetidos parpadean en el libro
  for (let k = 0; k < n; k++) {
    const [cx, cy] = CEL(k), m = Math.floor(Math.max(0, Math.min(5 + (k % 4), (t - @10.6@ - k * 0.025) * 7)));
    for (let s = 0; s < m; s++) { const x = cx + 15 + (s % 5) * 2, y = cy + 6 + Math.floor(s / 5) * 9; if (s % 5 === 4) R.linea(x - 8, y + 6, x, y + 1, Q.rojoS); else R.linea(x, y, x, y + 6, Q.grafito); }
  }
  const sel = [2, 9, 21][Math.floor(Math.max(0, t - @10.77@) / 0.45) % 3];
  if (t > @10.77@ && t < @12.3@) for (const g of MS) if (g.id % 8 === sel % 8) glifo(g.id, g.x, g.y, 2, Math.floor(t * 6) % 2 ? Q.oroL : Q.oro);
  // la cifra de la etiqueta, que escribe la mano con el lápiz
  const cifra = n >= 30 ? 30 : n >= 20 ? 20 : n;
  if (cifra > 0) R.numero(String(cifra), 56, 165, { tam: 16, centro: true });
  const escribe = (t > P3 && t < @9.1@) || (t > @9.4@ && t < @9.95@) || (t > @10.6@ && t < @12.4@);
  const jx = escribe ? Math.round(Math.sin(t * 31) * 2) : 0, jy = escribe ? Math.round(Math.cos(t * 23)) : 0, mx = 70 + jx + (t > @10.6@ ? 6 : 0), my = 160 + jy;
  lapiz(mx + 4, my - 12, mx + 13, my + 3);
  T.brazo(R, mx - 46, 204, mx, my, '#3a4a6a', 1);
  motas(t, 10, 24, 170, 9);
};
// 4 · gag 2: la lupa, y los signos que huyen con patitas
const G4 = [];
const LUPA = [[P4, 352, 160], [@13.25@, 150, 112], [@14.05@, 150, 112], [@14.4@, 84, 132], [@15.05@, 84, 132], [@15.4@, 196, 120], [@16.1@, 196, 120], [@16.45@, 118, 104], [@17.2@, 118, 104], [@17.9@, 372, 168]];
const p4 = (t) => {
  fijo('lupa', () => {
    tapete(0, 0, 319, 179);
    pergamino(4, 6, 316, 178, 31);
    // la planta del margen derecho: bulbo con raíces, tallo y hojas en espiral
    R.linea(268, 98, 262, 26, Q.tinta); R.linea(269, 98, 263, 26, Q.verdeS);
    hojaT(250, 40, 12, 5, 2.6, Q.azul, Q.azulS); hojaT(282, 52, 13, 5, 0.4, Q.verde, Q.verdeS); hojaT(248, 70, 12, 5, 2.9, Q.verde, Q.verdeS); hojaT(286, 82, 11, 4, 0.2, Q.azul, Q.azulS);
    for (let j = -8; j <= 8; j++) for (let i = -14; i <= 14; i++) { const d = (i * i) / 196 + (j * j) / 64; if (d <= 1) R.pset(268 + i, 104 + j, d > 0.78 ? Q.tinta : (i + j) % 4 === 0 ? Q.ocreS : Q.ocre); }
    for (const [a, b] of [[-12, 116], [-4, 118], [6, 118], [13, 115]]) { R.linea(268 + Math.round(a * 0.6), 110, 268 + a, b, Q.tinta); R.pset(268 + a - 1, b, Q.tinta); R.pset(268 + a + 1, b, Q.tinta); }
    for (let r = 0; r < 9; r++) renglon(20, 30 + r * 16, 30 + r * 16 < 120 ? 228 : 300, 50 + r, Q.tinta, 2, G4);
    vineta(156, 100, 200, 0.5);
  });
  const L = (tt) => camino(LUPA, tt);
  const RF = 36;
  for (const g of G4) {
    const hx = g.x + 4, hy = g.y - 4; let ox = 0, oy = 0, best = 0;
    for (const tau of [0, 0.15, 0.3, 0.45, 0.6, 0.8]) { const [lx, ly] = L(t - tau), vx = hx - lx, vy = hy - ly, d = Math.max(0.5, Math.hypot(vx, vy)); if (d < RF) { const w = (RF - d) * (1 - tau / 0.9), m = Math.abs(w); if (m > best) { best = m; ox = vx / d * w; oy = vy / d * w * 0.8; } } }
    const x = Math.round(g.x + ox), y = Math.round(g.y + oy);
    glifo(g.id, x, y, 2, Q.tinta);
    if (best > 1.5) { const p = Math.sin(t * 24 + g.i) > 0 ? 1 : 0; R.pset(x + 1, y + 2 + p, Q.tinta); R.pset(x + 1, y + 3 + p, Q.tinta); R.pset(x + 5, y + 3 - p, Q.tinta); R.pset(x + 5, y + 2 - p, Q.tinta); }
    if (best > 6) { R.pset(x + 1, y - 9, Q.blanco); R.pset(x + 4, y - 9, Q.blanco); R.pset(x + (ox > 0 ? 2 : 1), y - 9, Q.k); R.pset(x + (ox > 0 ? 5 : 4), y - 9, Q.k); }
  }
  motas(t, 10, 24, 170, 13);
  const [lx, ly] = L(t);
  if (lx < 345) {
    lupa(lx, ly, 22, t, 2);
    const [ex, ey] = mango(Math.round(lx), Math.round(ly), 22, 16);
    T.brazo(R, ex + 46, ey + 52, ex + 12, ey + 2, '#7a3a4a', -1);
  }
};
const efectos = [[N240, 'papel'], [@7.37@, 'brillo'], [@8.91@, 'pop'], [@9.61@, 'pop'], [@10.8@, 'lapiz'], [@13.35@, 'boing'], [@15.4@, 'whoosh'], [@17.5@, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
'''))

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['vm-dibujos'] = ('Los dibujos', '''// VM-DIBUJOS (frase 5): los dibujos del libro. Cinco planos:
// 1. el libro a pantalla completa (biblioteca/pagina): con «drawings» pasa sola la hoja de las estrellas y aparece la
//    planta; una mano señala su raíz; otra trae una ramita de verdad al lado y con «real plants» salta un «?»;
// 2. inserto local, la planta de cerca: con «legs» la raíz echa a andar sobre sus patas por la página; con «another
//    species» las hojas, cada una de una especie distinta, se encienden una tras otra; una hormiga cruza el margen;
// 3. inserto local, la rueda de estrellas: con «wheels» empieza a girar (anillos en sentidos contrarios, el sol del
//    centro con cara); con «zodiac» los doce signos se encienden en oro uno tras otro;
// 4. inserto local, los estanques verdes unidos por tubos: las figuritas vestidas se bañan, una saluda y otra salpica;
//    con «tubes» el agua corre por los tubos y sube el nivel;
// 5. inserto local, los tarros de botica: con «jars» saltan uno tras otro; a uno se le levanta la tapa con un polvillo
//    verde; con «apothecary» brillan y una mano baja a cerrar la tapa.''', COMUN + marcas('vm-dibujos', r'''
const P2 = @6.52@, P3 = @10.2@, P4 = @13.84@, P5 = @18.04@;
// 1 · la página: pasa la hoja, la mano señala la raíz y la ramita de verdad
const p1 = (t) => {
  T.biblioteca(R, t, { encuadre: 'pagina', pagina: 'estrellas', siguiente: 'planta', pasa: tramo(t, @0.6@, @1.04@ + 0.5) });
  // la mano que señala la raíz del dibujo («full of plants»)
  const a = ease(tramo(t, @2.16@, @3.26@)) - ease(tramo(t, @5.9@, @6.4@));
  if (a > 0) { const x1 = Math.round(lerp(10, 66, a)), y1 = Math.round(lerp(196, 134, a)); T.brazo(R, x1 - 34, y1 + 44, x1, y1, '#3a4a6a', 1); }
  // la ramita de verdad, en la otra mano («almost none look like real plants»)
  const b = ease(tramo(t, @3.96@, @4.86@));
  if (b > 0) {
    const x1 = Math.round(lerp(330, 252, b)), y1 = Math.round(lerp(196, 150, b)), sw = Math.sin(t * 2.4) * 0.15;
    const sx = x1 - 12, sy = y1 - 2;
    R.linea(sx, sy, sx - 6, sy - 46, Q.verdeS); R.linea(sx + 1, sy, sx - 5, sy - 46, Q.verde);
    [[8, 0.6], [16, 2.5], [24, 0.5], [32, 2.6], [40, 0.7]].forEach(([d, an]) => { const px = sx - Math.round(d * 0.13), py = sy - d; for (let j = 0; j < 9; j++) for (let i = -3; i <= 3; i++) { const e = (j - 4.5) * (j - 4.5) / 20 + i * i / 9; if (e > 1) continue; const ang = an + sw, X = Math.round(px + Math.cos(ang) * j - Math.sin(ang) * i), Y = Math.round(py + Math.sin(ang) * j * 0.7 + Math.cos(ang) * i * 0.6 - j * 0.3); R.pset(X, Y, e > 0.7 ? Q.verdeS : i === 0 ? Q.verdeS : i < 0 ? Q.verdeL : Q.verde); } });
    R.disco(sx - 6, sy - 48, 2.5, Q.blanco); R.disco(sx - 6, sy - 48, 1, Q.amarillo);
    T.brazo(R, x1 + 40, y1 + 48, x1, y1, '#7a3a4a', -1);
  }
  const q = tramo(t, @5.36@, @5.36@ + 0.3);
  if (q > 0) R.icono('?', 112, Math.round(30 - Math.sin(q * Math.PI) * 6), Q.rojo, Q.k, 3);
};
// 2 · la planta de cerca: echa a andar sobre sus raíces
const p2 = (t) => {
  fijo('raiz', () => {
    tapete(0, 0, 319, 179);
    pergamino(14, 4, 334, 186, 41);
    for (let r = 0; r < 9; r++) renglon(r < 2 ? 196 : 172, 34 + r * 15, r < 2 ? 268 : 312, 70 + r, Q.tinta, 2);
    // un dibujo pequeño en la esquina: una raíz suelta con su etiqueta de signos
    for (let j = -5; j <= 5; j++) for (let i = -8; i <= 8; i++) { const d = (i * i) / 64 + (j * j) / 25; if (d <= 1) R.pset(250 + i, 172 + j, d > 0.75 ? Q.tinta : Q.ocreL); }
    for (const a of [-6, 0, 6]) R.linea(250 + a, 176, 250 + a * 2, 184, Q.tinta);
    // la línea de suelo dibujada a plumilla
    for (let x = 30; x < 190; x++) if (hh(x >> 1, 2, 5) > 0.3) R.pset(x, 157 + Math.round(Math.sin(x * 0.2)), Q.tintaL);
    // en el margen, un guante blanco y el lápiz
    lapiz(4, 40, 9, 100); cuentas(6, 120, 2, 176);
    vineta(130, 90, 210, 0.36);
  });
  // la hormiga que cruza por el margen de abajo
  { const x = Math.round(330 - ((t - P2) * 22) % 360), y = 172 + Math.round(Math.sin(x * 0.2)); R.rect(x, y, x + 1, y + 1, Q.k); R.rect(x + 2, y, x + 3, y, Q.k); R.pset(x - 1, y - 1, Q.k); if (Math.floor(t * 12) % 2) { R.pset(x + 1, y + 2, Q.k); R.pset(x + 3, y + 1, Q.k); } else { R.pset(x, y + 2, Q.k); R.pset(x + 2, y + 2, Q.k); } }
  // anda: de «legs» a casi «leaves»
  const w = tramo(t, @7.08@, @7.08@ + 1.5), bx = Math.round(88 + 30 * w), anda = w > 0 && w < 1, bob = anda ? Math.round(Math.abs(Math.sin(t * 9)) * 2) : 0, by = 128 - bob;
  // las cuatro patas de raíz
  for (let k = 0; k < 4; k++) {
    const fase = anda ? Math.sin(t * 9 + k * Math.PI / 2) : 0, hx = bx - 15 + k * 10, kx = hx + (k < 2 ? -5 : 5) + Math.round(fase * 3), ky = by + 18 - (fase > 0 ? Math.round(fase * 4) : 0), fx = kx + Math.round(fase * 4), fy = 156 - (fase > 0 ? Math.round(fase * 5) : 0);
    for (const [x0, y0, x1, y1] of [[hx, by + 8, kx, ky], [kx, ky, fx, fy]]) { R.linea(x0, y0, x1, y1, Q.tinta); R.linea(x0 + 1, y0, x1 + 1, y1, Q.ocreS); R.linea(x0 + 2, y0, x1 + 2, y1, Q.tinta); }
    R.linea(fx - 3, fy, fx + 4, fy, Q.tinta); R.pset(fx - 4, fy + 1, Q.tinta); R.pset(fx + 5, fy + 1, Q.tinta);
  }
  // el bulbo
  for (let j = -12; j <= 12; j++) for (let i = -22; i <= 22; i++) { const d = (i * i) / 484 + (j * j) / 144; if (d <= 1) R.pset(bx + i, by + j, d > 0.82 ? Q.tinta : ((i - j) % 5 === 0 && d > 0.3) ? Q.ocreS : j < -4 ? Q.ocreL : Q.ocre); }
  R.pset(bx - 6, by - 2, Q.tinta); R.pset(bx + 6, by - 2, Q.tinta);
  // el tallo y las hojas de cinco especies distintas, que se mecen; con «another species» se encienden una a una
  const sw = (k) => Math.sin(t * 2 + k) * (0.08 + 0.15 * tramo(t, @9.32@, @9.32@ + 0.3));
  const tallo = (s) => [bx + Math.round(Math.sin(s * 3 + t * 1.5) * 3 * s), Math.round(by - 12 - s * 84)];
  for (let s = 0; s <= 1; s += 0.005) { const [x, y] = tallo(s); R.pset(x, y, Q.tinta); R.pset(x + 1, y, Q.verdeS); R.pset(x + 2, y, Q.tinta); }
  const luzH = (k) => t > @9.32@ + k * 0.14 && t < @9.32@ + k * 0.14 + 0.45;
  [[0.2, 1], [0.38, -1], [0.56, 1], [0.74, -1], [0.92, 1]].forEach(([s, lado], k) => {
    const [x, y] = tallo(s), ang = (lado > 0 ? -0.35 : Math.PI + 0.35) + sw(k), cx = Math.round(x + Math.cos(ang) * 16), cy = Math.round(y + Math.sin(ang) * 10);
    if (k === 0) hojaT(cx, cy, 15, 6, ang, Q.azul, Q.azulS);
    if (k === 1) for (let r = 0; r < 7; r++) { const a2 = ang - 0.7 + r * 0.23; R.linea(x, y, Math.round(x + Math.cos(a2) * 22), Math.round(y + Math.sin(a2) * 16), r % 2 ? Q.verdeS : Q.tinta); R.pset(Math.round(x + Math.cos(a2) * 22), Math.round(y + Math.sin(a2) * 16), Q.verdeL); }
    if (k === 2) { for (let n = 0; n < 4; n++) { R.disco(Math.round(x + Math.cos(ang) * (6 + n * 6)), Math.round(y + Math.sin(ang) * (5 + n * 4) - 3 + (n % 2) * 5), 4, Q.tinta); R.disco(Math.round(x + Math.cos(ang) * (6 + n * 6)), Math.round(y + Math.sin(ang) * (5 + n * 4) - 3 + (n % 2) * 5), 3, n % 2 ? Q.verde : Q.verdeL); } }
    if (k === 3) { R.disco(cx, cy, 9, Q.tinta); R.disco(cx, cy, 8, Q.azulL); R.disco(cx - 2, cy - 2, 4, Q.azul); R.linea(x, y, cx, cy, Q.azulS); }
    if (k === 4) hojaT(cx, cy, 12, 9, ang, Q.verde, Q.verdeS);
    if (luzH(k)) { R.disco(cx, cy - 14, 2, Q.oroL); R.pset(cx, cy - 17, Q.blanco); for (let a = 0; a < 18; a++) tine(cx + Math.cos(a) * 15, cy + Math.sin(a) * 11, 0.6, Q.oroL); }
  });
  // la flor de la punta
  { const [x, y] = tallo(1); R.disco(x + 1, y - 2, 5, Q.tinta); R.disco(x + 1, y - 2, 4, Q.rojoL); R.disco(x + 1, y - 2, 2, Q.amarillo); }
  motas(t, 10, 24, 170, 21);
};
// 3 · la rueda de estrellas, que gira
const ZOD = [
  ['.#.#.', '#.#.#', '..#..', '..#..', '.....'], ['#...#', '.###.', '#####', '.###.', '.....'], ['.###.', '#...#', '#####', '..#..', '.###.'],
  ['#.#..', '.###.', '..###', '.#.#.', '.....'], ['##.##', '#####', '.###.', '..#..', '.....'], ['..##.', '.#..#', '#....', '.#..#', '..##.'],
  ['#####', '..#..', '#####', '#...#', '.....'], ['....#', '...#.', '#.#..', '.#...', '#.#..'], ['.#...', '###..', '.#.#.', '..#.#', '...##'],
  ['#...#', '#...#', '#####', '#...#', '#...#'], ['.###.', '#.#.#', '#####', '#.#.#', '.###.'], ['#.#.#', '.#.#.', '#.#.#', '.....', '.....'],
];
const p3 = (t) => {
  fijo('rueda', () => {
    tapete(0, 0, 319, 179);
    pergamino(-6, 0, 326, 186, 51);
    // el pliegue de la hoja desplegable
    for (let y = 0; y < 180; y++) { tine(236, y, 0.25, Q.pergD); tine(237, y, 0.15, Q.pergL); }
    for (let r = 0; r < 4; r++) renglon(10, 30 + r * 12, 66, 90 + r, Q.tinta, 1);
    for (let r = 0; r < 9; r++) renglon(248, 58 + r * 12, 312, 95 + r, Q.tinta, 1);
    for (let r = 0; r < 4; r++) renglon(10, 134 + r * 11, 74, 99 + r, Q.tinta, 1);
    // una estrella suelta dibujada y la luna en cuarto, en los márgenes
    R.disco(54, 72, 6, Q.tinta); R.disco(54, 72, 5, Q.amarillo); R.disco(57, 70, 5, Q.perg); R.disco(57, 70, 4, Q.perg);
    for (let a = 0; a < 8; a++) R.linea(292, 32, Math.round(292 + Math.cos(a * 0.785) * 7), Math.round(32 + Math.sin(a * 0.785) * 7), a % 2 ? Q.oroS : Q.tinta);
    R.disco(292, 32, 3, Q.amarillo);
    // dos figuritas vestidas que sostienen estrellas, a los lados (sin moverse: son dibujo)
    for (const [x, c] of [[34, Q.azul], [276, Q.rojoL]]) { R.rect(x - 3, 96, x + 3, 112, Q.tinta); R.rect(x - 2, 97, x + 2, 111, c); R.disco(x, 92, 3, Q.tinta); R.disco(x, 92, 2, Q.piel); R.linea(x + 3, 99, x + 8, 92, Q.tinta); R.icono('X', x + 6, 86, Q.oro, Q.tinta, 1); }
    vineta(160, 92, 190, 0.32);
  });
  const cx = 160, cy = 94;
  const giro = 0.1 * (t - P3) + 1.4 * ease(tramo(t, @11.22@, @12.6@)), giro2 = -giro * 1.6;
  const enc = (k) => t > @13.26@ + k * 0.05;
  for (let y = cy - 77; y <= cy + 77; y++) for (let x = cx - 77; x <= cx + 77; x++) {
    const dx = x - cx, dy = y - cy, r = Math.hypot(dx, dy); if (r > 77) continue;
    const a = Math.atan2(dy, dx); let c = null;
    if (r > 71) { const onda = 73 + 2.2 * Math.abs(Math.sin(a * 18 + giro2)); c = r > onda ? null : r > onda - 1 ? Q.tinta : Q.ocreL; }
    else if (r > 70) c = Q.tinta;
    else if (r > 50) { const s = (((a - giro) / (Math.PI * 2)) % 1 + 1) % 1, k = Math.floor(s * 12), f = s * 12 - k; c = f < 0.04 || f > 0.96 ? Q.tinta : enc(k) ? (Math.floor(t * 8 + k) % 3 ? Q.oroL : Q.oro) : k % 2 ? Q.azulL : Q.pergM; }
    else if (r > 49) c = Q.tinta;
    else if (r > 30) { c = (r > 39.5 && r < 40.5) ? Q.tintaL : Q.perg; if (((x + y) & 1) && r < 34) c = Q.azulL; }
    else if (r > 29) c = Q.tinta;
    else { const rayo = Math.sin(a * 10 + giro * 2) > 0.2; c = r < 17 ? (r > 16 ? Q.tinta : Q.amarillo) : rayo ? Q.oro : Q.perg; }
    if (c != null) R.pset(x, y, c);
  }
  // los signos del zodiaco, en el centro de cada sector
  for (let k = 0; k < 12; k++) { const an = giro + (k + 0.5) / 12 * Math.PI * 2, x = Math.round(cx + Math.cos(an) * 60) - 2, y = Math.round(cy + Math.sin(an) * 60) - 2; ZOD[k].forEach((f, j) => { for (let i = 0; i < 5; i++) if (f[i] === '#') R.pset(x + i, y + j, enc(k) ? Q.rojoS : Q.tinta); }); }
  // las estrellas del anillo de en medio, que titilan
  for (let k = 0; k < 14; k++) { const an = giro2 + k / 14 * Math.PI * 2, rr = 40 + (k % 2 ? 5 : -5), x = Math.round(cx + Math.cos(an) * rr), y = Math.round(cy + Math.sin(an) * rr), on = Math.sin(t * 5 + k * 1.3) > 0; R.pset(x, y, Q.oroL); R.pset(x - 1, y, Q.oro); R.pset(x + 1, y, Q.oro); R.pset(x, y - 1, Q.oro); R.pset(x, y + 1, Q.oro); if (on) { R.pset(x - 2, y, Q.oroS); R.pset(x + 2, y, Q.oroS); R.pset(x, y - 2, Q.oroS); R.pset(x, y + 2, Q.oroS); } }
  // la cara del sol
  R.pset(cx - 5, cy - 3, Q.tinta); R.pset(cx - 4, cy - 3, Q.tinta); R.pset(cx + 4, cy - 3, Q.tinta); R.pset(cx + 5, cy - 3, Q.tinta); R.linea(cx - 4, cy + 4, cx + 4, cy + 4, Q.tinta); R.pset(cx - 5, cy + 3, Q.tinta); R.pset(cx + 5, cy + 3, Q.tinta);
  if (Math.sin(t * 1.7) > 0.92) R.linea(cx - 5, cy - 3, cx + 5, cy - 3, Q.tinta);
  motas(t, 10, 24, 170, 31);
};
// 4 · los estanques verdes unidos por tubos, con figuritas vestidas
const POZ = [[66, 116, 46, 20], [166, 136, 44, 18], [264, 110, 42, 20]];
const FIG = [[0, -22, Q.azul, 'gorro'], [0, 14, Q.rojoL, 'corona'], [1, -18, Q.ocre, 'gorro'], [1, 6, Q.azul, 'velo'], [1, 26, Q.verdeS, 'corona'], [2, -10, Q.rojoL, 'velo'], [2, 16, Q.azulL, 'gorro']];
const TUBOS = [[[2, 30], [30, 30], [46, 60], [48, 96]], [[106, 112], [122, 112], [130, 128]], [[202, 132], [214, 120], [226, 108]], [[300, 104], [310, 84], [314, 58]]];
const p4 = (t) => {
  fijo('estanques', () => {
    tapete(0, 0, 319, 179);
    pergamino(-6, 14, 326, 190, 61);
    cuentas(-4, 21, 324, 18);
    for (let r = 0; r < 2; r++) renglon(70, 36 + r * 13, 262, 110 + r, Q.tinta, 2);
    for (let r = 0; r < 2; r++) renglon(112, 76 + r * 11, 218, 113 + r, Q.tinta, 1);
    for (let r = 0; r < 2; r++) renglon(20, 156 + r * 11, 120, 116 + r, Q.tinta, 1);
    for (let r = 0; r < 2; r++) renglon(214, 158 + r * 11, 314, 118 + r, Q.tinta, 1);
    // los bordes de piedra de los estanques
    for (const [x, y, rx, ry] of POZ) for (let j = -ry - 5; j <= ry + 5; j++) for (let i = -rx - 5; i <= rx + 5; i++) { const d = (i * i) / ((rx + 4) * (rx + 4)) + (j * j) / ((ry + 4) * (ry + 4)); if (d <= 1) R.pset(x + i, y + j, d > 0.9 ? Q.tinta : (i + 2 * j) % 6 === 0 ? Q.ocreS : Q.ocreL); }
    vineta(160, 100, 200, 0.3);
  });
  // los tubos: dos trazos de tinta con el relleno azul y sus anillos; el agua corre por ellos
  const flujo = 0.6 + 2.2 * tramo(t, @16.82@, @17.64@);
  TUBOS.forEach((pts, n) => {
    let s = 0;
    for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], L = Math.hypot(x1 - x0, y1 - y0), nx = -(y1 - y0) / L, ny = (x1 - x0) / L;
      for (let k = 0; k <= L; k++, s++) { const x = x0 + (x1 - x0) * k / L, y = y0 + (y1 - y0) * k / L;
        for (let w = -4; w <= 4; w++) R.pset(Math.round(x + nx * w), Math.round(y + ny * w), Math.abs(w) === 4 ? Q.tinta : s % 9 === 0 ? Q.azulS : w < -1 ? Q.azulL : Q.azul);
        if (((s - t * 30 * flujo) % 14 + 14) % 14 < 2) { R.pset(Math.round(x), Math.round(y), Q.blanco); R.pset(Math.round(x + nx), Math.round(y + ny), Q.aguaL); } } }
  });
  // el agua: sube con «connected by tubes»; ondas que se mueven
  const sube = Math.round(3 * tramo(t, @17.0@, @17.9@));
  POZ.forEach(([x, y, rx, ry], n) => {
    for (let j = -ry + 3 - sube; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = (i * i) / (rx * rx) + (j * j) / (ry * ry); if (d > 1) continue; const o = Math.sin(i * 0.4 + t * 3 + n) + Math.sin(j * 0.9 - t * 2); R.pset(x + i, y + j, j < -ry + 6 - sube ? Q.aguaL : o > 1.3 ? Q.aguaL : o < -1.4 ? Q.aguaS : Q.agua); }
    // burbujas que suben
    for (let k = 0; k < 4; k++) { const ph = (t * 0.8 + k * 0.27 + n * 0.13) % 1, bx = x - rx + 10 + Math.round(hh(k, n, 7) * (2 * rx - 20)), by = Math.round(y + ry - 4 - ph * (2 * ry - 6)); R.pset(bx, by, Q.aguaL); R.pset(bx + 1, by - 1, Q.blanco); }
  });
  // las figuritas vestidas, metidas en el agua hasta la cintura: se mecen; una saluda («bathing») y otra salpica
  FIG.forEach(([p, dx, col, gorro], k) => {
    const [x0, y0] = POZ[p], x = x0 + dx, b = Math.round(Math.sin(t * 2.2 + k * 1.7)), y = y0 - 2 - sube + b;
    R.rect(x - 4, y - 9, x + 4, y + 1, Q.tinta); R.rect(x - 3, y - 8, x + 3, y + 1, col); R.rect(x - 3, y - 8, x + 3, y - 7, mez(col, Q.blanco, 0.4)); R.pset(x, y - 5, Q.tinta); R.pset(x, y - 3, Q.tinta);
    R.disco(x, y - 13, 4, Q.tinta); R.disco(x, y - 13, 3, Q.piel); R.pset(x - 1, y - 13, Q.tinta); R.pset(x + 1, y - 13, Q.tinta); R.pset(x, y - 11, Q.pielS);
    if (gorro === 'gorro') { R.rect(x - 4, y - 18, x + 4, y - 16, Q.tinta); R.rect(x - 3, y - 18, x + 3, y - 17, Q.rojoS); }
    if (gorro === 'corona') { R.rect(x - 3, y - 18, x + 3, y - 17, Q.oro); R.pset(x - 3, y - 19, Q.oro); R.pset(x, y - 19, Q.oro); R.pset(x + 3, y - 19, Q.oro); }
    if (gorro === 'velo') { R.rect(x - 4, y - 17, x + 4, y - 15, Q.blanco); R.rect(x - 4, y - 15, x - 4, y - 9, Q.blanco); R.rect(x + 4, y - 15, x + 4, y - 9, Q.blanco); }
    // las ondas alrededor de la cintura
    const ro = 6 + ((t * 2 + k) % 1) * 4; for (let a = 0; a < 16; a++) { const an = a / 16 * Math.PI * 2; if (Math.sin(an) > -0.2) tine(x + Math.cos(an) * ro, y + 2 + Math.sin(an) * ro * 0.3, 0.5, Q.aguaL); }
    if (k === 1 && t > @14.82@ && t < @14.82@ + 1.6) { const up = Math.sin((t - @14.82@) * 10) > 0; R.linea(x + 3, y - 7, x + 8, up ? y - 15 : y - 12, Q.tinta); R.disco(x + 8, up ? y - 15 : y - 12, 1, Q.piel); }
    if (k === 4) { const s = tramo(t, @16.2@, @16.2@ + 0.8); if (s > 0 && s < 1) for (let d = 0; d < 6; d++) { const an = -Math.PI * (0.2 + d * 0.12), rr = s * 18; R.pset(Math.round(x + Math.cos(an) * rr), Math.round(y - 4 + Math.sin(an) * rr + s * s * 14), Q.aguaL); R.pset(Math.round(x + Math.cos(an) * rr) + 1, Math.round(y - 4 + Math.sin(an) * rr + s * s * 14), Q.blanco); } }
  });
  motas(t, 10, 24, 170, 41);
};
// 5 · los tarros de botica: saltan, a uno se le levanta la tapa y una mano la cierra
const TAR = [[110, Q.azul, Q.azulS], [160, Q.rojoL, Q.rojoS], [210, Q.ocre, Q.ocreS]];
const p5 = (t) => {
  fijo('tarros', () => {
    tapete(0, 0, 319, 179);
    pergamino(72, 2, 248, 186, 71);
    // a los lados, en la mesa: la lupa tumbada y el lápiz; la cadena de cuentas y el guante
    for (let j = -11; j <= 11; j++) for (let i = -11; i <= 11; i++) { const d = Math.hypot(i, j); if (d <= 11) R.pset(36 + i, 120 + j, d > 9 ? (i + j < 0 ? Q.latonL : Q.latonS) : mez(Q.tap, Q.blanco, (i + j < -6) ? 0.3 : 0.1)); }
    for (let k = 0; k < 20; k++) for (let w = -2; w <= 2; w++) R.pset(44 + k, 128 + k + w, Math.abs(w) === 2 ? Q.k : k < 4 ? Q.laton : Q.nog);
    lapiz(14, 98, 62, 92);
    cuentas(258, 160, 312, 120);
    // las gafas de leer, plegadas
    for (const gx of [268, 290]) { for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2; R.pset(Math.round(gx + Math.cos(an) * 8), Math.round(84 + Math.sin(an) * 6), Q.k); } for (let j = -5; j <= 5; j++) for (let i = -7; i <= 7; i++) if ((i * i) / 49 + (j * j) / 25 < 1) tine(gx + i, 84 + j, i + j < -3 ? 0.35 : 0.12, Q.blanco); }
    R.linea(276, 82, 282, 82, Q.k); R.linea(260, 82, 254, 70, Q.k); R.linea(298, 82, 306, 70, Q.k);
    // el guante blanco, con sus dedos
    for (let j = 0; j < 16; j++) for (let i = 0; i < 18; i++) if ((i - 9) * (i - 9) / 81 + (j - 8) * (j - 8) / 64 < 1) R.pset(262 + i, 104 + j, i > 13 ? Q.guanteS : Q.guante);
    for (let f = 0; f < 4; f++) R.rect(264 + f * 4, 94 + (f === 0 || f === 3 ? 3 : 0), 266 + f * 4, 105, Q.guante);
    R.rect(280, 110, 288, 113, Q.guante); R.linea(262, 119, 280, 119, Q.guanteS);
    // las fichas de archivo y la libreta, a la izquierda
    R.rect(10, 52, 62, 84, Q.tapD); for (let k = 0; k < 3; k++) { R.rect(8 + k * 2, 48 + k * 3, 58 + k * 2, 78 + k * 3, Q.papelS); R.rect(9 + k * 2, 49 + k * 3, 57 + k * 2, 77 + k * 3, Q.papel); }
    for (let y = 60; y < 80; y += 4) R.linea(14, y, 58, y, Q.raya); R.linea(14, 56, 58, 56, Q.margen);
    renglon(16, 70, 56, 140, Q.tinta, 1);
    R.rect(6, 150, 58, 178, Q.tapD); R.rect(4, 146, 56, 175, hex('#6a2a2a')); R.rect(4, 146, 56, 147, hex('#8a3a3a')); R.rect(8, 146, 9, 175, hex('#4a1a1a'));
    // los renglones de arriba y las partes de plantas con su etiqueta de signos
    for (let r = 0; r < 2; r++) renglon(84, 26 + r * 10, 236, 120 + r, Q.tinta, 1);
    [[100, 1], [150, 2], [200, 3]].forEach(([x, k]) => { R.linea(x, 56, x + 6, 40, Q.tinta); hojaT(x + 8, 44, 7, 3, -0.6 + k * 0.4, k % 2 ? Q.verde : Q.azul, k % 2 ? Q.verdeS : Q.azulS); for (let i = 0; i < 4; i++) R.linea(x, 56, x - 4 + i * 3, 64, Q.tintaL); renglon(x - 6, 74, x + 22, 130 + k, Q.tinta, 1); });
    for (let r = 0; r < 2; r++) renglon(84, 168 + r * 9, 236, 125 + r, Q.tinta, 1);
    vineta(160, 104, 180, 0.42);
  });
  TAR.forEach(([x, c, cS], k) => {
    const hop = tramo(t, @19.12@ + k * 0.2, @19.12@ + k * 0.2 + 0.35), dy = -Math.round(Math.sin(hop * Math.PI) * 6), y0 = 156 + dy;
    const brilla = t > @20.86@ + k * 0.1 && t < @20.86@ + k * 0.1 + 0.6;
    // el albarelo: cintura estrecha, bandas y adornos
    for (let j = 0; j <= 62; j++) { const y = y0 - j, wv = 17 - Math.round(Math.sin(j / 62 * Math.PI) * 4) + (j < 4 ? -1 : 0); for (let i = -wv; i <= wv; i++) { let col = Math.abs(i) >= wv - 1 ? Q.tinta : (j % 14 < 2 && j > 6) ? cS : (j > 20 && j < 42) ? (i + j) % 7 === 0 ? cS : Q.pergL : c; if (i < -wv + 4 && Math.abs(i) < wv - 1) col = mez(col, Q.blanco, 0.25); R.pset(x + i, y, brilla && Math.abs(i) >= wv - 1 ? Q.oroL : col); } }
    // el dibujo de una hoja en la panza
    hojaT(x, y0 - 31, 6, 3, 0.8 + k, Q.verde, Q.verdeS);
    // la tapa (la del medio se levanta con un polvillo verde y la mano la cierra)
    const abre = k === 1 ? Math.min(tramo(t, @20.0@, @20.0@ + 0.3), 1 - tramo(t, @21.6@, @21.9@)) : 0, ly = y0 - 63 - Math.round(abre * 12), la = abre * 0.3;
    for (let i = -14; i <= 14; i++) { R.pset(x + i, ly + Math.round(i * la), Q.tinta); R.pset(x + i, ly - 1 + Math.round(i * la), cS); R.pset(x + i, ly - 2 + Math.round(i * la), Math.abs(i) > 12 ? Q.tinta : c); R.pset(x + i, ly - 3 + Math.round(i * la), Math.abs(i) > 11 ? Q.tinta : cS); }
    R.disco(x, ly - 6, 3, Q.tinta); R.disco(x, ly - 6, 2, cS);
    if (k === 1 && abre > 0) for (let d = 0; d < 10; d++) { const ph = ((t - @20.0@) * 1.2 + d * 0.1) % 1; R.pset(Math.round(x - 10 + hh(d, 1, 3) * 20 + Math.sin(t * 4 + d) * 3), Math.round(y0 - 64 - ph * 30), ph < 0.7 ? Q.verdeL : Q.verde); }
  });
  // la mano que baja a cerrar la tapa del tarro del medio
  const m = ease(tramo(t, @21.0@, @21.6@)) - ease(tramo(t, @21.95@, @22.4@));
  if (m > 0) { const x1 = Math.round(lerp(330, 178, m)), y1 = Math.round(lerp(150, 92, m)); T.brazo(R, x1 + 44, y1 + 50, x1, y1, '#7a3a4a', -1); }
  motas(t, 10, 24, 170, 51);
};
const efectos = [[@0.6@, 'papel'], [@5.36@, 'pop'], [@7.08@, 'golpecito'], [@9.32@, 'brillo'], [@11.22@, 'whoosh'], [@13.26@, 'brillo'], [@14.82@, 'burbujas'], [@16.2@, 'chof'], [@19.12@, 'toc'], [@20.0@, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2026 });
'''))

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['vm-pista'] = ('La pista', '''// VM-PISTA (frase 6): ¿medicina, astrología, alquimia? Sin leerlo, cada dibujo es un acertijo: hay que seguir el
// rastro del libro. Tres planos:
// 1. fondo local, una galería de la biblioteca con tres cuadros apagados: la colega entra y, al decirlos la voz, se
//    encienden la medicina (el mortero que muele), la astrología (la esfera armilar que gira) y la alquimia (el alambique
//    que hierve); con «all three» tres haces de oro bajan al libro de la peana y ella se sorprende;
// 2. la mesa de estudio (biblioteca/mesa, la página de las estrellas): la colega estudia el dibujo; con «riddle» un «?»;
//    con «the only way forward» saca un mapa plegado y lo despliega sobre la mesa: Praga y Roma con su hilo;
// 3. el tablero de detective (biblioteca/pagina/tablero): los hilos rojos se tienden y una lupa sigue el camino del
//    libro: el libro, Praga («owned it»), Roma («tried to read it») y Nueva York («left in writing»); la barra del año
//    va de 2026 a 1610, 1665 y 1912.''', COMUN + marcas('vm-pista', r'''
const P2 = @5.98@, P3 = @11.59@;
const MED = @1.38@, AST = @2.16@, ALQ = @3.06@, TRES = @4.62@;
const MARCOS = [[16, 46, 92, 104], [122, 46, 198, 104], [228, 46, 304, 104]];
// 1 · la galería con los tres cuadros
const p1 = (t) => {
  fijo('galeria', () => {
    // la pared de estuco verde oscuro, con la luz de arriba y una moldura de nogal
    for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) { const n = hh(x >> 1, y >> 1, 5); let c = mez(hex('#2e4438'), hex('#1e2e26'), Math.min(1, y / 160 + (Math.abs(x - 160) / 600))); if (n > 0.9) c = mez(c, hex('#3e5648'), 0.6); if (n < 0.06) c = mez(c, Q.k, 0.3); R.pset(x, y, c); }
    for (let y = 8; y < 122; y++) for (let x = 0; x < 320; x++) { if (x > 262 && y < 50) continue; if (((x + y) % 14 === 0 || (x - y + 700) % 14 === 0) && hh(x, y, 3) > 0.25) R.pset(x, y, mez(R.pget(x, y), hex('#3e5a4a'), 0.5)); }
    // el friso de grecas bajo la moldura y las placas de latón de los cuadros
    for (let x = 0; x < 264; x++) { const m = x % 12; for (let y = 20; y < 27; y++) { const on = y === 20 || y === 26 || (m === 0 && y > 20) || (m < 8 && y === 23) || (m === 8 && y < 24) || (m > 3 && m < 9 && y === 21 && false); R.pset(x, y, on ? hex('#6a7a50') : hex('#24382e')); } }
    for (const [x0, , x1, y1] of [MARCOS[0], MARCOS[2]]) { const c = (x0 + x1) >> 1; R.rect(c - 8, y1 + 6, c + 8, y1 + 10, Q.latonS); R.rect(c - 7, y1 + 7, c + 7, y1 + 9, Q.laton); R.rect(c - 7, y1 + 7, c + 7, y1 + 7, Q.latonL); }
    for (let x = 0; x < 320; x++) { R.pset(x, 0, Q.nogD); R.pset(x, 1, Q.nogS); R.pset(x, 2, Q.nogL); R.pset(x, 3, Q.nog); R.pset(x, 4, Q.nogD); }
    // el friso de paneles de nogal y el zócalo
    for (let y = 124; y < 152; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.07 + Math.sin(y * 0.4) * 1.5 + hh(x >> 3, 0, 9) * 4); R.pset(x, y, v > 0.75 ? Q.nogL : v < -0.8 ? Q.nogS : Q.nog); }
    for (let px = 6; px < 314; px += 44) { R.rect(px, 128, px + 38, 128, Q.nogL); R.rect(px, 128, px, 146, Q.nogL); R.rect(px + 38, 128, px + 38, 146, Q.nogD); R.rect(px, 146, px + 38, 146, Q.nogD); }
    R.rect(0, 122, 319, 124, Q.nogL); R.rect(0, 125, 319, 125, Q.nogD); R.rect(0, 148, 319, 151, Q.nogD); R.rect(0, 148, 319, 148, Q.nogS);
    // el suelo de espiga con reflejos
    for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const a = ((x + (y - 152) * 2) >> 3), b = ((x - (y - 152) * 2) >> 3), d = (Math.floor(y / 4) % 2) ? a : b; let c = (d % 3 === 0) ? Q.nogL : (d % 3 === 1) ? hex('#6a4428') : Q.nog; if (((x + y * 2) % 8) === 0 || ((x - y * 2 + 400) % 8) === 0) c = Q.nogD; R.pset(x, y, c); }
    for (const [x0, , x1] of MARCOS) for (let y = 154; y < 176; y++) for (let x = x0 + 10; x < x1 - 10; x++) if (((x + y) & 1) && y < 154 + (176 - y) / 3) tine(x, y, 0.12, Q.oroL);
    // los marcos dorados
    for (const [x0, y0, x1, y1] of MARCOS) {
      R.rect(x0 + 3, y0 + 3, x1 + 3, y1 + 3, Q.k);
      for (let w = 0; w < 5; w++) { const c = w === 0 ? Q.oroS : w === 1 ? Q.oroL : w === 4 ? Q.oroS : Q.oro; R.rect(x0 + w, y0 + w, x1 - w, y0 + w, w === 1 ? Q.oroL : c); R.rect(x0 + w, y1 - w, x1 - w, y1 - w, w === 1 ? Q.oro : Q.oroS); R.rect(x0 + w, y0 + w, x0 + w, y1 - w, c); R.rect(x1 - w, y0 + w, x1 - w, y1 - w, Q.oroS); }
      for (let x = x0 + 6; x < x1 - 4; x += 6) { R.pset(x, y0 + 2, Q.oroS); R.pset(x, y1 - 2, Q.oroL); }
      // la lamparita de latón de encima
      R.rect((x0 + x1) / 2 - 10, y0 - 8, (x0 + x1) / 2 + 10, y0 - 5, Q.latonS); R.rect((x0 + x1) / 2 - 10, y0 - 8, (x0 + x1) / 2 + 10, y0 - 8, Q.latonL); R.rect((x0 + x1) / 2 - 1, y0 - 5, (x0 + x1) / 2 + 1, y0 - 1, Q.latonS);
    }
    // la peana con el libro, el helecho y el banco
    R.rect(146, 124, 176, 128, Q.nogL); R.rect(148, 129, 174, 160, Q.nog); R.rect(148, 129, 150, 160, Q.nogL); R.rect(172, 129, 174, 160, Q.nogS); R.rect(144, 160, 178, 164, Q.nogD); R.rect(144, 160, 178, 160, Q.nogL);
    for (let x = 153; x < 170; x += 4) { R.rect(x, 131, x, 158, Q.nogS); R.rect(x + 1, 131, x + 1, 158, Q.nogL); } R.rect(146, 128, 176, 130, Q.nogD);
    R.rect(2, 150, 22, 170, Q.rojoS); R.rect(2, 150, 22, 152, Q.rojoL); R.rect(4, 153, 20, 169, Q.rojo);
    for (let k = 0; k < 9; k++) { const an = -Math.PI * (0.15 + k * 0.085); for (let r = 0; r < 26; r++) { const x = Math.round(12 + Math.cos(an) * r), y = Math.round(150 + Math.sin(an) * r * 0.9 + r * r * 0.02); R.pset(x, y, Q.verdeS); if (r % 3 === 0) { R.pset(x - 1, y - 1, Q.verde); R.pset(x + 1, y - 1, Q.verdeL); } } }
    R.rect(250, 140, 314, 144, Q.rojoS); R.rect(250, 137, 314, 140, Q.rojo); R.rect(250, 137, 314, 137, Q.rojoL); R.rect(254, 145, 258, 162, Q.nogD); R.rect(306, 145, 310, 162, Q.nogD);
  });
  const enc = (k) => tramo(t, [MED, AST, ALQ][k], [MED, AST, ALQ][k] + 0.25);
  // dentro de cada cuadro
  MARCOS.forEach(([x0, y0, x1, y1], k) => {
    R.recorte([x0 + 5, y0 + 5, x1 - 5, y1 - 5]);
    const X0 = x0 + 5, Y0 = y0 + 5, X1 = x1 - 5, Y1 = y1 - 5, cx = (X0 + X1) >> 1;
    if (k === 0) {
      for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) R.pset(x, y, hh(x >> 1, y >> 1, 7) > 0.85 ? Q.pergS : Q.pergM);
      R.linea(X0, Y0 + 20, X1, Y0 + 20, Q.nog); R.linea(X0, Y0 + 21, X1, Y0 + 21, Q.nogS);
      for (const [x, c] of [[X0 + 8, Q.azul], [X0 + 20, Q.rojoL], [X1 - 12, Q.verde]]) { R.rect(x - 4, Y0 + 9, x + 4, Y0 + 19, Q.tinta); R.rect(x - 3, Y0 + 10, x + 3, Y0 + 19, c); R.rect(x - 3, Y0 + 8, x + 3, Y0 + 9, Q.tinta); }
      for (let b = 0; b < 3; b++) { const bx = X0 + 40 + b * 9, sw = Math.round(Math.sin(t * 1.6 + b) * 1.5); R.linea(bx, Y0, bx + sw, Y0 + 10, Q.tinta); hojaT(bx + sw, Y0 + 13, 4, 2, 1.57 + sw * 0.1, Q.verde, Q.verdeS); }
      const mx = cx, my = Y1 - 10;
      for (let j = 0; j < 12; j++) for (let i = -14 + Math.round(j * 0.4); i <= 14 - Math.round(j * 0.4); i++) R.pset(mx + i, my + j, Math.abs(i) >= 13 - Math.round(j * 0.4) ? Q.k : i < -4 ? hex('#a8a4b0') : hex('#8a8692'));
      R.rect(mx - 15, my - 1, mx + 15, my, Q.k); R.rect(mx - 13, my, mx + 13, my, Q.verdeS);
      const a = t * 4 * (0.3 + enc(0)), ex = Math.round(mx + Math.cos(a) * 7), ey = my - 1 + Math.round(Math.sin(a) * 2);
      R.linea(ex, ey, ex + 6, ey - 18, Q.k); R.linea(ex + 1, ey, ex + 7, ey - 18, hex('#c8c4cc')); R.linea(ex + 2, ey, ex + 8, ey - 18, Q.k);
      if (enc(0) > 0) for (let d = 0; d < 5; d++) { const ph = (t * 1.3 + d * 0.2) % 1; R.pset(Math.round(mx - 8 + d * 4 + Math.sin(t * 3 + d) * 2), Math.round(my - 2 - ph * 14), ph < 0.6 ? Q.verdeL : Q.verde); }
    }
    if (k === 1) {
      for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) R.pset(x, y, y < Y0 + 30 ? hex('#1a2448') : hex('#222e58'));
      for (let s = 0; s < 18; s++) { const x = X0 + Math.round(hh(s, 1, 9) * (X1 - X0)), y = Y0 + Math.round(hh(s, 2, 9) * (Y1 - Y0)); R.pset(x, y, Math.sin(t * 3 + s) > 0 ? Q.blanco : Q.azulL); }
      R.disco(X0 + 9, Y0 + 9, 4, Q.oroL); R.disco(X0 + 11, Y0 + 8, 4, hex('#1a2448'));
      const ay = Y0 + 23, g = t * (0.6 + 1.6 * enc(1));
      for (let a = 0; a < 90; a++) { const an = a / 90 * Math.PI * 2;
        R.pset(Math.round(cx + Math.cos(an) * 20), Math.round(ay + Math.sin(an) * 20 * Math.abs(Math.cos(g))), Math.sin(an) < 0 ? Q.latonS : Q.laton);
        R.pset(Math.round(cx + Math.cos(an) * 20 * Math.sin(g)), Math.round(ay + Math.sin(an) * 20), Math.cos(an) < 0 ? Q.latonS : Q.latonL);
        R.pset(Math.round(cx + Math.cos(an) * 19), Math.round(ay + Math.sin(an) * 6 + Math.cos(an) * 8), Q.oro); }
      R.disco(cx, ay, 4, Q.azul); R.disco(cx - 1, ay - 1, 2, Q.azulL);
      R.rect(cx - 1, ay + 20, cx + 1, Y1 - 4, Q.latonS); R.rect(cx - 8, Y1 - 4, cx + 8, Y1 - 2, Q.laton);
    }
    if (k === 2) {
      for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const row = Math.floor((y - Y0) / 5), j = (y - Y0) % 5 === 0 || ((x + (row % 2) * 6) % 12 === 0); R.pset(x, y, j ? hex('#4a2a1e') : (hh(x >> 2, row, 3) > 0.6 ? hex('#8a4630') : hex('#7a3a26'))); }
      R.rect(X0 + 8, Y1 - 16, X0 + 38, Y1, hex('#3a3236')); R.rect(X0 + 8, Y1 - 16, X0 + 38, Y1 - 15, hex('#5a5258'));
      for (let f = 0; f < 6; f++) { const fx = X0 + 14 + f * 4, fh = 4 + Math.round((Math.sin(t * 13 + f * 2) + 1) * 3) + Math.round(enc(2) * 3); R.linea(fx, Y1 - 16, fx, Y1 - 16 - fh, f % 2 ? Q.amarillo : Q.rojoL); R.pset(fx, Y1 - 17 - fh, Q.luz); }
      const fx = X0 + 23, fy = Y1 - 30;
      R.disco(fx, fy, 10, Q.k); R.disco(fx, fy, 9, hex('#b8d8e0')); for (let j = 0; j < 9; j++) for (let i = -9; i <= 9; i++) if (Math.hypot(i, j) < 9) R.pset(fx + i, fy + j, Q.verde);
      R.rect(fx - 2, fy - 18, fx + 2, fy - 9, Q.k); R.rect(fx - 1, fy - 18, fx + 1, fy - 9, hex('#b8d8e0'));
      R.linea(fx + 2, fy - 17, X1 - 12, Y1 - 26, Q.k); R.linea(fx + 2, fy - 16, X1 - 12, Y1 - 25, hex('#b8d8e0'));
      R.disco(X1 - 10, Y1 - 12, 7, Q.k); R.disco(X1 - 10, Y1 - 12, 6, hex('#b8d8e0')); R.rect(X1 - 15, Y1 - 12, X1 - 5, Y1 - 7, Q.verdeL);
      for (let k2 = 0; k2 < 4; k2++) { const ph = (t * (1 + enc(2) * 1.5) + k2 * 0.25) % 1; R.pset(fx - 5 + k2 * 3, Math.round(fy + 6 - ph * 12), Q.verdeL); }
      { const ph = (t * 1.4) % 1; R.pset(X1 - 12, Y1 - 24 + Math.round(ph * 8), Q.verdeL); }
    }
    // apagado hasta que la voz lo nombra; luego la luz de la lamparita
    const e = enc(k);
    for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { if (e < 1) R.pset(x, y, mez(R.pget(x, y), Q.k, 0.62 * (1 - e))); else if (((x + y) & 1) && y < Y0 + 18 && Math.abs(x - cx) < 20 - (y - Y0)) tine(x, y, 0.1, Q.luz); }
    R.recorte(null);
    if (e > 0) { const lx = (x0 + x1) >> 1; for (let y = y0 - 4; y < y0 + 6; y++) for (let x = lx - 18; x <= lx + 18; x++) if (((x + y) & 1) && Math.abs(x - lx) < 6 + (y - y0 + 4)) tine(x, y, 0.25 * e, Q.luz); R.rect(lx - 9, y0 - 5, lx + 9, y0 - 5, Q.luz); }
  });
  // la colega recorre los cuadros y los señala; con «all three», sorpresa
  const w1 = tramo(t, 0.2, MED - 0.05), w2 = tramo(t, AST + 0.35, ALQ - 0.05);
  const x = Math.round(w2 > 0 ? lerp(98, 196, ease(w2)) : lerp(-16, 98, ease(w1)));
  const dir = (t > MED && t < AST + 0.35) ? -1 : 1;
  R.actor(EL.colega, x, 172, t, { dir: t > TRES ? -1 : dir, anda: (w1 > 0 && w1 < 1) || (w2 > 0 && w2 < 1), dedo: (t > MED && t < AST + 0.3) || (t > ALQ && t < TRES - 0.1), sorpresa: t > TRES && t < TRES + 0.9, sonrisa: t > TRES + 0.9 });
  // el libro en la peana: con «all three» brilla y los tres haces de oro bajan a él
  const tr = tramo(t, TRES, TRES + 0.5);
  T.PIEZAS_VM.libroVoynich(R, 144, 123, { abierto: true, pagina: 'tarros', brilla: tr > 0, t });
  if (tr > 0) MARCOS.forEach(([x0, , x1, y1], k) => { const sx = (x0 + x1) >> 1, sy = y1 + 1, n = 40; for (let i = 0; i <= n * tr; i++) { const u = i / n, X = Math.round(lerp(sx, 160, u)), Y = Math.round(lerp(sy, 116, u) + Math.sin(u * Math.PI) * 12); if ((i + Math.floor(t * 12)) % 4 !== 0) { R.pset(X, Y, Q.oroL); R.pset(X, Y + 1, Q.oroS); } } });
  if (tr >= 1) for (let k = 0; k < 6; k++) { const an = t * 2 + k, rr = 22 + Math.sin(t * 3 + k) * 4; R.pset(Math.round(161 + Math.cos(an) * rr), Math.round(114 + Math.sin(an) * rr * 0.5), Q.oroL); }
  for (const sx of [107, 213]) { R.rect(sx - 4, 84, sx + 4, 86, Q.latonS); R.rect(sx - 1, 86, sx + 1, 94, Q.laton); R.rect(sx - 3, 94, sx + 3, 95, Q.latonS); R.rect(sx - 1, 74, sx + 1, 83, Q.papel); R.pset(sx + 1, 75, Q.papelS);
    const fl = Math.round(Math.sin(t * 11 + sx) * 1.2); R.pset(sx + fl, 71, Q.amarillo); R.pset(sx, 72, Q.luz); R.pset(sx, 73, Q.amarillo); R.pset(sx - 1, 72, Q.rojoL);
    for (let a = 0; a < 30; a++) { const an = a / 30 * Math.PI * 2, rr = 6 + Math.sin(t * 7 + a) * 0.8; tine(sx + Math.cos(an) * rr, 72 + Math.sin(an) * rr, 0.18, Q.luz); } }
  // una polilla que ronda la lamparita del primer cuadro
  { const lx = 54 + Math.round(Math.sin(t * 2.3) * 12), ly = 36 + Math.round(Math.sin(t * 3.7) * 4), al = Math.floor(t * 16) % 2; R.pset(lx, ly, Q.pergD); R.pset(lx - 1, ly - al, Q.pergS); R.pset(lx + 1, ly - al, Q.pergS); }
  motas(t, 12, 40, 150, 61);
};
// 2 · la mesa: el acertijo y el mapa que se despliega
const p2 = (t) => {
  T.biblioteca(R, t, { camara: 'mesa', pagina: 'estrellas' });
  const coge = t > @9.71@ + 0.1 && t < @10.5@;
  const yo = R.actor(EL.colega, 124, 118, t, { dir: t > @9.71@ ? 1 : -1, dedo: t > @7.2@ && t < @8.7@, sorpresa: t > @8.92@ && t < @9.6@, sonrisa: t > @10.6@, habla: t > @6.06@ && t < @7.2@ && Math.sin(t * 9) > 0, sostiene: coge ? [150, 104] : undefined });
  T.bibliotecaDelante(R, t, { camara: 'mesa', pagina: 'estrellas' });
  // «every drawing is a riddle»
  const q = tramo(t, @8.92@, @8.92@ + 0.25);
  if (q > 0 && t < @10.3@) { R.icono('?', 126, Math.round(70 - Math.sin(q * Math.PI) * 5), Q.rojo, Q.k, 3); }
  // el mapa plegado en la mano, y luego desplegado sobre la mesa
  if (coge && yo && yo.mano) { const [mx, my] = yo.mano; R.rect(mx - 2, my - 9, mx + 8, my + 3, Q.k); R.rect(mx - 1, my - 8, mx + 7, my + 2, Q.pergM); R.linea(mx + 3, my - 8, mx + 3, my + 2, Q.pergD); R.pset(mx + 1, my - 4, Q.rojo); }
  const d = tramo(t, @10.5@, @11.2@);
  if (t >= @10.5@) {
    const w = Math.round(lerp(14, 70, ease(d))), x0 = 238, y0 = 122, h = 38;
    R.rect(x0 + 2, y0 + 2, x0 + w + 2, y0 + h + 2, Q.tapD);
    for (let y = y0; y <= y0 + h; y++) for (let x = x0; x <= x0 + w; x++) {
      const u = (x - x0) / 70, v = (y - y0) / h, tierra = Math.sin(u * 9 + v * 3) + Math.sin(v * 7 - u * 2) * 0.8 + (u - 0.4) * 2 > 0.2 || (u > 0.55 && v < 0.5);
      let c = tierra ? (hh(x >> 1, y >> 1, 7) > 0.85 ? Q.pergS : Q.pergM) : (hh(x >> 1, y >> 1, 8) > 0.8 ? Q.azulL : hex('#a8c4cc'));
      const pl = Math.floor((x - x0) / Math.max(1, w / 3)); if (pl % 2) c = mez(c, Q.pergD, 0.15);
      if (x === x0 || y === y0 || x === x0 + w || y === y0 + h) c = Q.pergD;
      R.pset(x, y, c);
    }
    for (let p = 1; p < 3; p++) { const x = x0 + Math.round(w * p / 3); R.linea(x, y0, x, y0 + h, Q.pergD); }
    if (d >= 1) {
      const PR = [x0 + 44, y0 + 12], RO = [x0 + 40, y0 + 28];
      const l = tramo(t, @11.2@, @11.55@); for (let i = 0; i <= 16 * l; i++) { const u = i / 16; R.pset(Math.round(lerp(PR[0], RO[0], u)), Math.round(lerp(PR[1], RO[1], u)), Q.rojo); }
      for (const [x, y] of [PR, RO]) { R.disco(x, y, 2, Q.rojoS); R.pset(x, y, Q.rojoL); }
    }
  }
};
// 3 · el tablero: los hilos y la lupa que sigue el camino del libro
const HIL = [[P3 + 0.2, 0], [@12.17@, 0.33], [@13.05@, 0.5], [@13.95@, 0.667], [@14.75@, 0.833], [@16.17@, 1]];
const hilos = (t) => { if (t <= HIL[0][0]) return 0; for (let i = 1; i < HIL.length; i++) if (t < HIL[i][0]) return lerp(HIL[i - 1][1], HIL[i][1], (t - HIL[i - 1][0]) / (HIL[i][0] - HIL[i - 1][0])); return 1; };
const RUTA = [[P3, 330, 190], [@12.6@, 172, 104], [@13.6@, 172, 104], [@14.0@, 80, 129], [@14.5@, 80, 129], [@14.8@, 75, 151], [@15.6@, 75, 151], [@16.2@, 22, 126], [99, 22, 126]];
const p3 = (t) => {
  T.biblioteca(R, t, { encuadre: 'pagina', camara: 'tablero', hilos: hilos(t) });
  const [lx, ly] = camino(RUTA, t);
  lupa(lx, ly, 15, t, 2);
  const [ex, ey] = mango(Math.round(lx), Math.round(ly), 15, 14);
  T.brazo(R, ex + 44, ey + 50, ex + 12, ey + 2, '#3a4a6a', -1);
};
const AÑOS = [[@13.6@, 2026], [@14.0@, 1610], [@14.5@, 1610], [@14.8@, 1665], [@15.6@, 1665], [@16.2@, 1912]];
const año = (t) => { if (t <= AÑOS[0][0]) return 2026; for (let i = 1; i < AÑOS.length; i++) if (t < AÑOS[i][0]) return Math.round(lerp(AÑOS[i - 1][1], AÑOS[i][1], ease((t - AÑOS[i - 1][0]) / (AÑOS[i][0] - AÑOS[i - 1][0])))); return 1912; };
const efectos = [[MED, 'interruptor'], [ALQ, 'interruptor'], [TRES, 'brillo'], [@8.92@, 'pop'], [@10.5@, 'papel'], [@12.2@, 'whoosh'], [@14.0@, 'toc'], [@14.8@, 'toc'], [@16.2@, 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
'''))
