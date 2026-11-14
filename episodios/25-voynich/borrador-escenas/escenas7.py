import re

# Grupo S7 del ep25: vm-rarezas y vm-teorias (frases 18–19).
# las marcas reales de la voz (atomo/plato/escenas/marcas-ep25.json): marca, inicio y _fin de la frase de cada escena
MARCAS = {'vm-rarezas': ('rarezas', 0.5, 20.028), 'vm-teorias': ('teorias', 0.9, 21.381)}


def marcas(sc, s):
    # @s@ (segundos de la escena, sacados de linea.json) → en('marca', fracción)
    k, a, b = MARCAS[sc]
    return re.sub(r'@([0-9.]+)@', lambda m: "en('%s', %.4f)" % (k, (float(m.group(1)) - a) / (b - a)), s)


# lo común (la paleta, el ruido, los búferes, el cielo con nubes de tres tonos y pájaros, la madera, los signos
# inventados y el pergamino) es el del grupo S6 (escenas6.py), copiado tal cual; lo propio del grupo S7 va en COMUN7
COMUN = r'''
const PIEZAS_VM = T.PIEZAS_VM;
const Q = Object.fromEntries(Object.entries({
  k: '#1a1014', blanco: '#ffffff', luz: '#fff0c4',
  c0: '#4a7ad0', c1: '#5e8ed8', c2: '#78a4e2', c3: '#98bcec', c4: '#bcd4f2', c5: '#dce8f6',
  nube: '#ffffff', nubeS: '#dde6f2', nubeS2: '#b4c4da',
  hierba: '#5a9e44', hierbaL: '#86c058', hierbaS: '#3e7a34', hierbaD: '#285a28',
  seto: '#356e32', setoL: '#4e8c40', setoS: '#22501f', setoD: '#163a16',
  grava: '#dccaa0', gravaL: '#ede0bf', gravaS: '#bba77c', gravaD: '#957f58',
  piedra: '#d4c8b0', piedraL: '#eee6d4', piedraS: '#a89a80', piedraD: '#7a6e5a',
  cobre: '#58a88e', cobreL: '#8cceb2', cobreS: '#3a7a66', cobreD: '#26584a',
  teja: '#b8503a', tejaL: '#d8785a', tejaS: '#86362a',
  lejos: '#9aaccc', lejosL: '#b8c6dc', lejosS: '#7a8cae', lejosD: '#64769a',
  rojo: '#c43a34', rojoL: '#e8665a', rojoS: '#8a2424', rojoD: '#5a1618',
  amar: '#f0c840', amarL: '#fff09a', amarS: '#c89a20',
  rosa: '#e87ab0', rosaS: '#b84a80', blancoS: '#d8d4e0', lila: '#9a7ad8', lilaS: '#6a4aa8',
  oro: '#e8b830', oroL: '#ffe890', oroS: '#a87a18', oroD: '#6a4a10',
  bronce: '#a8743a', bronceL: '#d4a060', bronceS: '#6e4a24',
  nog: '#6a4228', nogL: '#8a5a36', nogS: '#4a2c18', nogD: '#2e1a0e',
  roble: '#9a6a3a', robleL: '#b8864e', robleS: '#744c28', robleD: '#4e3018',
  perg: '#ecdcb2', pergL: '#f7ecd2', pergS: '#d2bc90', pergD: '#a88c60', tinta: '#4a2e1c', tintaL: '#7a5034',
  terc: '#a82a36', tercL: '#cc4a52', tercS: '#741a24', tercD: '#4a1018',
  estuco: '#7e9a70', estucoL: '#9cb68a', estucoS: '#62805a', estucoD: '#4a6444',
  ladr: '#a85a42', ladrL: '#c47a5a', ladrS: '#844432', ladrD: '#5e2e22', junta: '#cbbca4',
  acera: '#b4b0a8', aceraL: '#cecac2', aceraS: '#8e8a84', asf: '#4a4a52', asfL: '#5e5e66', asfS: '#36363e',
  taxi: '#f2c218', taxiS: '#c4940c', vidrio: '#2a3a4a', vidrioL: '#4a6a82', vidrioS: '#18222e',
  verde: '#3e7a52', verdeL: '#5e9e6e', verdeS: '#285438', toldo: '#2e6a48', toldoL: '#f0ece0',
  noche: '#141a3a', noche2: '#1e2650', noche3: '#2a3466', ventL: '#ffd870', ventS: '#c89a40',
  papel: '#f2eedc', papelS: '#cfc8b0', damasco: '#7a2430', damascoL: '#94343e', damascoS: '#5a1822',
  piel: '#f2c49a', pielS: '#d4946a', gris: '#8a8a96', grisL: '#b8b8c4', grisS: '#5e5e6a', negro: '#2a2430',
  lampV: '#3e8a5a', lampVL: '#6ab884', lampVS: '#24583a', agua: '#8ac8e8', aguaL: '#d4f0ff', aguaS: '#4a8ab8',
}).map(([k, v]) => [k, hex(v)]));
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const tine = (x, y, k, c) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, k)); };
const ease = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
const BUF = {};
// un fondo fijo, pintado una sola vez en su búfer y copiado en cada fotograma
const fijo = (k, f) => { if (!BUF[k]) { const b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); BUF[k] = b; } R.copiar(BUF[k]); };
// una capa fija con huecos (lo que no se pinta queda transparente): se pinta una vez y se pone encima de lo que haya
const capa = (k, f) => {
  if (!BUF[k]) { const b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); BUF[k] = b; }
  const dst = R.usar(null); R.usar(dst); const b = BUF[k];
  for (let i = 0; i < b.length; i++) { const c = b[i]; if (c) dst[i] = c; }
};
// una trayectoria por fotogramas clave [t, x, y] con entrada y salida suaves
const camino = (K, t) => { if (t <= K[0][0]) return [K[0][1], K[0][2]]; for (let i = 1; i < K.length; i++) if (t < K[i][0]) { const u = ease((t - K[i - 1][0]) / (K[i][0] - K[i - 1][0])); return [lerp(K[i - 1][1], K[i][1], u), lerp(K[i - 1][2], K[i][2], u)]; } const L = K[K.length - 1]; return [L[1], L[2]]; };
const parpadeo = (t, f = 8) => Math.sin(t * f) > 0;
// el cielo tramado de día: cinco bandas con su trama de transición (para el búfer)
const cieloFijo = (y1) => {
  const B = [Q.c0, Q.c1, Q.c2, Q.c3, Q.c4, Q.c5];
  for (let y = 0; y <= y1; y++) { const v = (y / y1) * (B.length - 1), i = Math.floor(v), f = v - i; for (let x = 0; x < 320; x++) { const d = ((x + y * 2) % 4) / 4 + (((x >> 1) + y) % 2) * 0.12; R.pset(x, y, B[Math.min(B.length - 1, f > d ? i + 1 : i)]); } }
};
// una nube de tres tonos (sombra de abajo, cuerpo y luz arriba)
const nube = (cx, cy, w) => {
  const bolas = [[0, 0, w * 0.32], [-w * 0.32, w * 0.06, w * 0.24], [w * 0.3, w * 0.05, w * 0.26], [-w * 0.1, -w * 0.12, w * 0.26], [w * 0.14, -w * 0.08, w * 0.22]];
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx), Math.round(cy + dy + 1), Math.round(r), Q.nubeS2);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx), Math.round(cy + dy), Math.round(r), Q.nubeS);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx - 1), Math.round(cy + dy - 2), Math.round(r * 0.8), Q.nube);
  for (let x = Math.round(cx - w * 0.5); x <= cx + w * 0.5; x++) R.pset(x, Math.round(cy + w * 0.28), Q.nubeS2);
};
// las nubes en tres planos (lentas y pequeñas arriba, rápidas y grandes abajo) y una bandada; y0/y1: la franja del cielo
const nubes = (t, y0, y1, k = 0) => {
  for (const [v, w, n, yy] of [[1.2, 14, 3, 0.15], [2.6, 22, 3, 0.45], [4.4, 30, 2, 0.75]]) for (let i = 0; i < n; i++) {
    const x = ((i * 137 + k * 61 + t * v) % 420) - 50, y = Math.round(y0 + (y1 - y0) * (yy + hh(i, k, 3) * 0.12));
    nube(Math.round(x), y, Math.round(w * (0.85 + hh(i, k, 5) * 0.3)));
  }
  for (let i = 0; i < 4; i++) { const x = Math.round(((t * 14 + i * 9 + k * 40) % 380) - 30), y = Math.round(y0 + 6 + i % 2 * 4 + Math.sin(t * 2 + i) * 2), a = Math.sin(t * 10 + i * 2) > 0;
    R.pset(x, y, Q.k); R.pset(x - 1, y - (a ? 1 : 0), Q.k); R.pset(x + 1, y - (a ? 1 : 0), Q.k); R.pset(x - 2, y - (a ? 2 : 0), Q.k); R.pset(x + 2, y - (a ? 2 : 0), Q.k); }
};
// madera con vetas (tablas horizontales de alto h), con las juntas y nudos
const madera = (x0, y0, x1, y1, c, cL, cS, cD, h = 7, k = 0) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const tb = Math.floor((y - y0) / h), j = (y - y0) % h, ve = Math.sin((x + tb * 37) * 0.09 + Math.sin(x * 0.03 + tb) * 2 + j * 0.9);
    let col = ve > 0.75 ? cS : ve < -0.85 ? cL : c;
    if (j === h - 1) col = cD; else if (j === 0) col = cL;
    if (((x + tb * 53) % 61) === 0 && j > 0 && j < h - 1) col = cD;
    if (hh(x, y, k) > 0.97) col = cS;
    R.pset(x, y, col);
  }
};
// ladrillo de tres tonos con sus juntas y algún ladrillo más oscuro
const ladrillo = (x0, y0, x1, y1, k = 0) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const f = Math.floor((y - y0) / 5), j = (y - y0) % 5, o = (x - x0 + (f % 2) * 5) % 10, id = Math.floor((x - x0 + (f % 2) * 5) / 10);
    if (j === 4 || o === 9) { R.pset(x, y, hh(x, y, k) > 0.8 ? Q.piedraS : Q.junta); continue; }
    const v = hh(id, f, k + 9); let c = v < 0.18 ? Q.ladrS : v > 0.85 ? Q.ladrL : Q.ladr; if (v > 0.95) c = Q.ladrD;
    if (j === 0 && hh(x, y, k + 1) > 0.6) c = mez(c, Q.ladrL, 0.4);
    R.pset(x, y, c);
  }
};
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
// ── lo propio del grupo S6 ──
Object.assign(Q, Object.fromEntries(Object.entries({
  pergM: '#dcc698', pergO: '#8a6e44', ocre: '#c8a050', ocreL: '#e0c078', ocreS: '#9a7430',
  tap: '#2e5a3a', tapL: '#3e7048', tapS: '#1e3e28', tapD: '#14281a',
  cac: '#4e8a4a', cacL: '#7ab06a', cacS: '#36683a', cacD: '#22482a',
  arena: '#e0b884', arenaL: '#f0d0a0', arenaS: '#c49464', arenaD: '#9a6e46',
  meseta: '#c87a5a', mesetaL: '#e09a74', mesetaS: '#9a5440', mesetaD: '#6e3a30',
  horm: '#d8ccb4', hormL: '#ece4d2', hormS: '#b4a88e', hormD: '#8a7e66',
  cristal: '#5a8ab8', cristalL: '#a8cce8', cristalS: '#3a5e8a', cristalD: '#24405e',
  acero: '#7a8a9a', aceroL: '#a8b6c4', aceroS: '#55626e', aceroD: '#38424c',
  azulT: '#3a6aa8', azulTL: '#5a8ccc', azulTS: '#284a7a', azulTD: '#1a3054',
  imanR: '#c43a34', imanRL: '#e8665a', imanRS: '#8a2424',
  bata: '#f4f4f8', bataS: '#c8ccd8', verdeP: '#a8b8a0', verdePL: '#bccab4', verdePS: '#8a9a84',
  corcho: '#c8925a', corchoL: '#dcaa72', corchoS: '#a8743e', corchoD: '#86562a',
  mar: '#2a6aa8', marL: '#4a8ccc', marS: '#1e4e84', marD: '#143866', espuma: '#e8f4fa',
  palma: '#3e8a3a', palmaL: '#6ab04e', palmaS: '#286a2a',
  ocreP: '#c89a50', ocrePL: '#e0b870', ocrePS: '#9a7430', tela: '#f2ead2', telaS: '#d4c8a6',
  neg: '#2a2832', sepia: '#7a4a24', rojoT: '#b02a2a', verdeT: '#2a7a3a', azulT2: '#2a4aa8',
  pantalla: '#0e1a2e', pantallaL: '#1e3250', rejilla: '#24405e',
}).map(([k, v]) => [k, hex(v)])));
// un degradado tramado vertical entre varios colores
const degr = (x0, y0, x1, y1, cols) => { for (let y = y0; y <= y1; y++) { const v = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), i = Math.floor(v), f = v - i; for (let x = x0; x <= x1; x++) { const d = ((x + y * 2) % 4) / 4 + (((x >> 1) + y) % 2) * 0.12; R.pset(x, y, cols[Math.min(cols.length - 1, f > d ? i + 1 : i)]); } } };
const caja = (x0, y0, x1, y1, c, b = Q.k) => { R.rect(x0, y0, x1, y1, b); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
// caja con luz arriba a la izquierda y sombra abajo a la derecha
const bisel = (x0, y0, x1, y1, c, cL, cS) => { caja(x0, y0, x1, y1, c); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, cL); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, cL); R.rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, cS); R.rect(x1 - 1, y0 + 1, x1 - 1, y1 - 1, cS); };
// pintura o piedra con moteado de tres tonos
const moteado = (x0, y0, x1, y1, c, cL, cS, k = 0, dens = 0.12) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = hh(x >> 1, y >> 1, k), m = hh(x, y, k + 3); let col = c; if (n < dens) col = cS; else if (n > 1 - dens * 0.6) col = cL; if (m > 0.987) col = cS; R.pset(x, y, col); } };
// una raya gruesa (w de radio)
const raya = (x0, y0, x1, y1, c, w = 1) => { const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0))); for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n, y = y0 + (y1 - y0) * i / n; for (let a = -w; a <= w; a++) for (let b = -w; b <= w; b++) if (a * a + b * b <= w * w + 0.5) R.pset(Math.round(x + a), Math.round(y + b), c); } };
// una X roja que se traza en dos trazos (u 0–1), con su borde oscuro
const tache = (cx, cy, r, u) => { const a = Math.min(1, u * 2), b = Math.max(0, u * 2 - 1); for (const [w, col] of [[3, Q.rojoD], [2, Q.rojo], [1, Q.rojoL]]) { if (a > 0) raya(cx - r, cy - r, cx - r + 2 * r * a, cy - r + 2 * r * a, col, w === 1 ? 0 : w - 1); if (b > 0) raya(cx + r, cy - r, cx + r - 2 * r * b, cy - r + 2 * r * b, col, w === 1 ? 0 : w - 1); } };
// un saguaro con sus costillas y dos brazos (yb: el pie)
const saguaro = (x, yb, h, k = 0) => {
  const col = (x0, y0, y1, w) => { for (let y = y0; y <= y1; y++) for (let i = 0; i < w; i++) R.pset(x0 + i, y, i === 0 || i === w - 1 ? Q.cacD : i === 1 ? Q.cacL : (i + (y >> 1)) % 2 ? Q.cacS : Q.cac); for (let i = 1; i < w - 1; i++) R.pset(x0 + i, y0 - 1, Q.cacD); };
  const w = h > 30 ? 6 : 4;
  col(x - (w >> 1), yb - h, yb, w);
  const a1 = Math.round(h * (0.42 + hh(k, 1, 4) * 0.1)), a2 = Math.round(h * (0.55 + hh(k, 2, 4) * 0.1)), aw = w > 4 ? 4 : 3;
  R.rect(x - (w >> 1) - 6, yb - a1, x - (w >> 1), yb - a1 + aw - 1, Q.cacD); R.rect(x - (w >> 1) - 5, yb - a1 + 1, x - (w >> 1), yb - a1 + aw - 2, Q.cac);
  col(x - (w >> 1) - 6, yb - a1 - Math.round(h * 0.28), yb - a1 + aw - 1, aw);
  R.rect(x + (w >> 1), yb - a2, x + (w >> 1) + 6, yb - a2 + aw - 1, Q.cacD); R.rect(x + (w >> 1), yb - a2 + 1, x + (w >> 1) + 5, yb - a2 + aw - 2, Q.cac);
  col(x + (w >> 1) + 3, yb - a2 - Math.round(h * 0.22), yb - a2 + aw - 1, aw);
  for (let y = yb - h + 2; y < yb; y += 3) R.pset(x, y, Q.cacL);
};
// una mata del desierto (gobernadora) de tres tonos
const mata = (x, y, r, k = 0) => { for (let i = 0; i < r * 5; i++) { const a = hh(i, k, 51) * 6.28, d = hh(i, k, 52) * r; const X = Math.round(x + Math.cos(a) * d * 1.4), Y = Math.round(y - Math.abs(Math.sin(a)) * d); R.pset(X, Y, hh(i, k, 53) > 0.6 ? Q.cacL : hh(i, k, 54) > 0.5 ? Q.cac : Q.cacS); } R.rect(x - r, y + 1, x + r, y + 1, Q.arenaS); };
// las dos letras de un «bocadillo» con un símbolo encima de una cabeza
const globo = (x, y, ic) => R.bocadillo(Math.round(x), Math.round(y), { icono: ic });
// un brillo de cuatro puntas
const destello = (x, y, r, c = Q.blanco) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, Math.abs(i) < r ? c : Q.oroL); R.pset(x, y + i, Math.abs(i) < r ? c : Q.oroL); } };
// el maletín de aluminio (en la mano: x, y es el asa)
const maletin = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 2, y - 1, x + 2, y, Q.k); caja(x - 7, y + 1, x + 7, y + 10, Q.aceroL); R.rect(x - 6, y + 2, x + 6, y + 2, Q.blanco); R.rect(x - 6, y + 9, x + 6, y + 9, Q.acero); R.rect(x - 7, y + 5, x + 7, y + 5, Q.aceroS); R.pset(x - 4, y + 5, Q.amar); R.pset(x + 4, y + 5, Q.amar); };
// una tira de papel en la mano (impresión con barras)
const impreso = (x, y) => { x = Math.round(x); y = Math.round(y); caja(x - 5, y - 9, x + 5, y + 3, Q.papel); for (let i = 0; i < 4; i++) R.rect(x - 3 + i * 2, y + 1 - [7, 5, 4, 3][i], x - 3 + i * 2, y + 1, Q.azulTL); R.rect(x - 4, y + 2, x + 4, y + 2, Q.papelS); };
'''

COMUN7 = r'''
// ── lo propio del grupo S7 ──
Object.assign(Q, Object.fromEntries(Object.entries({
  marca: '#fff04a', marcaS: '#d8b820',
  salaD: '#14161f', salaS: '#1e2130', sala: '#2a2e42', salaL: '#3a4058',
  listo: '#4a3428', listoL: '#5e4232', listoS: '#33241b', listoD: '#22170f',
  butaca: '#8a2a34', butacaL: '#b04450', butacaS: '#5a1820', alfo: '#3a2a4a', alfoL: '#4a3a5e',
  loro: '#3aa84a', loroL: '#86d870', loroS: '#24703a', loroY: '#f0d040', loroA: '#3a6ad8', loroR: '#e04a3a', loroP: '#e8e0c8',
  mate: '#2e6a54', mateL: '#36765e', mateS: '#24564a',
  azulC: '#3a5a9a', azulCL: '#5a7ac0', azulCS: '#2a4274', azulCD: '#1c2c50',
  verdeC: '#3e7a4a', verdeCL: '#5e9e64', verdeCS: '#2a5a36', verdeCD: '#1c3e24',
  rojoC: '#a83a3a', rojoCL: '#cc5a50', rojoCS: '#7a2628', rojoCD: '#4e1618',
  niebla: '#c4ccd8', nieblaL: '#dde3ea',
  ocaso1: '#2e2450', ocaso2: '#5a3466', ocaso3: '#9a4a62', ocaso4: '#d8745a', ocaso5: '#f0aa66',
  alba1: '#6a8ec8', alba2: '#94b2dc', alba3: '#c8cce0', alba4: '#f0d4bc', alba5: '#f8e4c8',
  monte: '#6a7a9a', monteL: '#8a9aba', monteS: '#4e5c7a', nieve: '#eef2f8',
  entra: '#e8dcc0', entraL: '#f4ecd8', entraS: '#c4b494', viga: '#4a2e1c',
  fuego: '#ffb030', fuegoL: '#fff0a0', fuegoS: '#e05a20',
  pared4: '#a8b8a8', pared4L: '#bccab8', pared4S: '#8a9a8a',
  lav: '#8a6ac8', lavL: '#b09ae0', salvia: '#8aa88a', salviaL: '#aac4a4',
  oscuro: '#0e0c14',
}).map(([k, v]) => [k, hex(v)])));
// una palabra de signos (ids) y su ancho
const palabra = (ids, x, yb, esc, col) => { let w = 0; for (const id of ids) w += glifo(id, x + w, yb, esc, col) + esc; return w - esc; };
const anchoP = (ids, esc) => ids.reduce((s, id) => s + (anchoG(id) + 1) * esc, 0) - esc;
// un sprite de cuadrícula a escala s (pal: carácter → color; '.' transparente)
const spr = (g, x, y, s, pal, dir = 1) => { const w = g[0].length; for (let j = 0; j < g.length; j++) for (let i = 0; i < w; i++) { const c = pal[g[j][i]]; if (c == null) continue; const X = Math.round(x + (dir > 0 ? i : w - 1 - i) * s), Y = Math.round(y + j * s); R.rect(X, Y, X + s - 1, Y + s - 1, c); } };
// la espalda de un espectador sentado: x el centro, y lo alto de la cabeza; f el peinado (0 corto, 1 coleta, 2 moño, 3 capucha)
const espalda = (x, y, pelo, ropa, f = 0) => {
  x = Math.round(x); y = Math.round(y);
  const pS = mez(pelo, Q.k, 0.35), pL = mez(pelo, Q.blanco, 0.25), rS = mez(ropa, Q.k, 0.32), rL = mez(ropa, Q.blanco, 0.2);
  R.rect(x - 9, y + 11, x + 9, y + 26, Q.k); R.rect(x - 8, y + 12, x + 8, y + 26, ropa); R.rect(x + 3, y + 13, x + 8, y + 26, rS); R.rect(x - 8, y + 12, x - 6, y + 26, rL);
  R.rect(x, y + 15, x, y + 24, rS);
  if (f !== 3) R.rect(x - 2, y + 9, x + 2, y + 12, Q.pielS);
  R.disco(x, y + 5, 6, Q.k); R.disco(x, y + 5, 5, pelo); R.disco(x + 1, y + 6, 4, pS); R.disco(x - 1, y + 4, 3, pelo); R.pset(x - 2, y + 2, pL); R.pset(x - 3, y + 3, pL); R.pset(x - 1, y + 1, pL);
  if (f !== 3) { R.pset(x - 7, y + 6, Q.piel); R.pset(x - 7, y + 7, Q.pielS); R.pset(x + 7, y + 6, Q.pielS); R.pset(x + 7, y + 7, Q.pielS); }
  if (f === 1) { R.rect(x - 1, y + 10, x + 1, y + 17, Q.k); R.rect(x, y + 10, x, y + 16, pelo); }
  if (f === 2) { R.disco(x, y - 1, 3, Q.k); R.disco(x, y - 1, 2, pelo); R.pset(x - 1, y - 2, pL); }
  if (f === 3) { R.disco(x, y + 6, 8, Q.k); R.poligono([[x - 10, y + 14], [x - 7, y + 5], [x + 7, y + 5], [x + 10, y + 14]], Q.k); R.disco(x, y + 6, 7, ropa); R.poligono([[x - 9, y + 13], [x - 6, y + 6], [x + 6, y + 6], [x + 9, y + 13]], ropa); R.disco(x + 2, y + 8, 5, rS); R.rect(x + 3, y + 9, x + 9, y + 13, rS); R.pset(x - 3, y + 1, rL); R.pset(x - 4, y + 2, rL); R.pset(x - 5, y + 4, rL); R.rect(x - 1, y + 10, x, y + 13, rS); }
};
// un bocadillo con una palabra de signos (u 0–1: aparece); la cola apunta a (hx, hy)
const bocadilloG = (cx, cy, ids, col, hx, hy, u = 1, esc = 1) => {
  if (u <= 0) return; const w = anchoP(ids, esc) + 8, h = 5 + 9 * esc, W = Math.max(4, Math.round(w * Math.min(1, u))), H = Math.max(3, Math.round(h * Math.min(1, u)));
  const x0 = Math.round(cx - W / 2), y0 = Math.round(cy - H / 2);
  { const d = Math.max(1, Math.hypot(hx - cx, hy - cy)), L = Math.min(d, H / 2 + 7); hx = Math.round(cx + (hx - cx) / d * L); hy = Math.round(cy + (hy - cy) / d * L); }
  raya(cx, cy, hx, hy, Q.k, 1); raya(cx, cy, Math.round(lerp(cx, hx, 0.8)), Math.round(lerp(cy, hy, 0.8)), Q.blanco, 0);
  R.rect(x0 + 1, y0, x0 + W - 1, y0 + H, Q.k); R.rect(x0, y0 + 1, x0 + W, y0 + H - 1, Q.k); R.rect(x0 + 1, y0 + 1, x0 + W - 1, y0 + H - 1, Q.blanco); R.rect(x0 + 2, y0 + H - 1, x0 + W - 1, y0 + H - 1, Q.blancoS);
  if (u >= 1) palabra(ids, x0 + 4, y0 + 4 + 6 * esc, esc, col);
};
// una elipse que se dibuja (u 0–1), de trazo doble
const elipse = (cx, cy, rx, ry, u, col) => { const n = Math.round(u * 60); for (let i = 0; i <= n; i++) { const a = -2.2 + i / 60 * 6.6; const x = Math.round(cx + Math.cos(a) * rx), y = Math.round(cy + Math.sin(a) * ry); R.pset(x, y, col); R.pset(x + 1, y, col); } };
// el lápiz que sostiene una mano (dir 1: la punta abajo a la derecha de la muñeca)
const lapiz = (x1, y1, dir, col) => { const tx = x1 + dir * 13, ty = y1 + 7, ex = x1 + dir * 2, ey = y1 - 9; raya(ex, ey, tx, ty, Q.k, 1); raya(ex, ey, tx, ty, col, 0); R.pset(ex, ey, Q.rosa); R.pset(tx, ty, Q.k); R.pset(tx - dir, ty - 1, Q.perg); return [tx, ty]; };
// una carpeta de cartulina de frente (de pie): x, y la esquina de arriba; sim 'candado' | 'pueblo' | 'mascara'
const casita = (x, y, c, cS) => { R.poligono([[x - 1, y + 3], [x + 3, y - 1], [x + 7, y + 3]], Q.k); R.poligono([[x, y + 3], [x + 3, y], [x + 6, y + 3]], Q.tejaL); caja(x, y + 3, x + 6, y + 8, c); R.rect(x + 3, y + 5, x + 4, y + 7, cS); };
const careta = (cx, cy, s, triste, c = Q.blanco, cS = Q.blancoS) => {
  // la máscara de teatro: óvalo, dos ojos huecos y la boca (sonrisa o mueca)
  R.disco(cx, cy, 6 * s + 1, Q.k); R.disco(cx, cy, 6 * s, c); R.disco(cx + s, cy + s, 5 * s, cS); R.disco(cx - s, cy - s, 5 * s, c);
  for (const d of [-1, 1]) { R.disco(cx + d * 2 * s, cy - s, Math.max(1, s), Q.k); R.pset(cx + d * 2 * s - 1, cy - 2 * s - 1, Q.k); R.pset(cx + d * 2 * s + 1 - 2 * (d < 0), cy - 2 * s - 1, Q.k); }
  for (let i = -3 * s; i <= 3 * s; i++) { const k = (i / (3 * s)) ** 2; const y = Math.round(cy + 2 * s + (triste ? k * 2 * s - s : -k * 2 * s + s)); R.pset(cx + i, y, Q.k); R.pset(cx + i, y + (triste ? -1 : 1), i % 2 ? Q.k : Q.rojoL); }
  R.pset(cx - 4 * s, cy + s, Q.rosa); R.pset(cx + 4 * s, cy + s, Q.rosa);
};
const carpeta = (x, y, c, cL, cS, sim, brillo = 0) => {
  R.rect(x + 2, y - 4, x + 12, y, Q.k); R.rect(x + 3, y - 3, x + 11, y, cL);   // la pestaña
  caja(x, y, x + 26, y + 34, c); R.rect(x + 1, y + 1, x + 25, y + 1, cL); R.rect(x + 1, y + 1, x + 1, y + 33, cL); R.rect(x + 25, y + 2, x + 25, y + 33, cS); R.rect(x + 2, y + 33, x + 25, y + 33, cS);
  R.rect(x + 22, y - 2, x + 24, y, Q.papel);   // la hoja que asoma
  for (let i = 0; i < 6; i++) R.pset(x + 4 + i * 4, y + 30, cS);
  caja(x + 5, y + 6, x + 21, y + 24, Q.papel); R.rect(x + 6, y + 23, x + 20, y + 23, Q.papelS);
  if (sim === 'candado') { R.icono('candado', x + 6, y + 8, Q.oroS, Q.k, 2); R.pset(x + 12, y + 18, Q.k); R.pset(x + 13, y + 18, Q.k); }
  if (sim === 'pueblo') { R.rect(x + 6, y + 19, x + 20, y + 22, Q.hierba); R.rect(x + 6, y + 18, x + 20, y + 18, Q.hierbaL); casita(x + 7, y + 11, Q.piedra, Q.piedraS); casita(x + 14, y + 13, Q.entra, Q.viga); R.rect(x + 18, y + 8, x + 18, y + 10, Q.gris); }
  if (sim === 'mascara') careta(x + 13, y + 15, 1, false);
  if (brillo > 0) { const on = Math.sin(brillo * 30) > -0.3; if (on) { R.rect(x - 1, y - 1, x + 27, y - 1, Q.oroL); R.rect(x - 1, y + 35, x + 27, y + 35, Q.oroL); R.rect(x - 1, y, x - 1, y + 34, Q.oroL); R.rect(x + 27, y, x + 27, y + 34, Q.oroL); } }
};
// prepara un búfer con huecos sin pintarlo; revela(k, u, rect): lo pone encima a trozos (u 0–1)
const prepara = (k, f) => { if (!BUF[k]) { const b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); BUF[k] = b; } return BUF[k]; };
const revela = (b, u, x0, y0, x1, y1) => { const dst = R.usar(null); R.usar(dst); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = y * 320 + x, c = b[i]; if (c && (u >= 1 || hh(x, y, 5) < u)) dst[i] = c; } };
'''

E = {}

# ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['vm-rarezas'] = ('Rarezas', '''// VM-RAREZAS (frase 18): las rarezas del texto. Cinco planos:
// 1. el aula a oscuras: la conferenciante apaga las luces con el mando; el proyector de carrusel enciende la página en
//    la pantalla; con el puntero láser recorre los renglones y en «two» se marca en amarillo una palabra repetida dos
//    veces (con su «2») y en «three» la que sale tres veces seguidas (con su «3»); el público cuchichea, uno llega tarde;
// 2. «one after another»: el despacho con el loro: ella le enseña la tarjeta con la palabra y el loro la repite tres
//    veces, una tras otra («one», «after», «another»); en «something» va a la mesa, hojea el diccionario y en «no
//    language» sale la X roja sobre la pila de diccionarios del mundo;
// 3. «Certain letters»: inserto cenital: la página en la alfombrilla de corte; la mano izquierda rodea en rojo el signo
//    del principio de cada renglón («beginning»); en «others» entra la derecha y rodea en azul el del final («end»);
// 4. «and the plant pages»: la mesa de clasificar: dos cajas de luz (la planta y los baños), ella reparte fichas: las
//    verdes al montón de la planta y las azules al de los baños; las palabras de cada caja se encienden en su color;
// 5. «as if they were two dialects»: 1420, un huerto de hierbas y un baño junto a un muro bajo: el herbolario y la
//    bañera hablan cada uno con sus palabras (verdes y azules), se entienden a medias y se sonríen; una rana se tira al
//    agua.''', marcas('vm-rarezas', COMUN + COMUN7 + r'''
const P2 = @4.33@, P3 = @8.49@, P4 = @14.39@, P5 = @18.35@;
const CLIC = @0.55@, SOME = @2.37@, DOS = @3.15@, TRES = @3.71@;

// ── plano 1: el aula a oscuras con el proyector ──
const aula = () => fijo('aula', () => {
  // el techo de placas perforadas, oscuro y tranquilo bajo el año
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 40 === 0 || y === 13 ? Q.salaD : (x % 4 === 1 && y % 4 === 2) ? Q.salaD : Q.salaS);
  R.rect(0, 14, 319, 15, Q.k);
  // la pared de listones de madera, en penumbra, con la banda de tela acústica y el zócalo
  for (let y = 16; y < 124; y++) for (let x = 0; x < 268; x++) { const s = Math.floor(x / 7), j = x % 7, ve = Math.sin(y * 0.16 + s * 1.7 + Math.sin(y * 0.05 + s) * 2);
    let c = j === 0 ? Q.listoD : j === 1 ? Q.listoL : ve > 0.8 ? Q.listoS : Q.listo; if (hh(s, y >> 3, 61) > 0.94 && j > 1) c = Q.listoS; R.pset(x, y, c); }
  for (let y = 100; y < 112; y++) for (let x = 0; x < 268; x++) R.pset(x, y, (x + y) % 2 ? Q.sala : Q.salaS);
  R.rect(0, 99, 267, 99, Q.k); R.rect(0, 112, 267, 113, Q.listoL); R.rect(0, 114, 267, 114, Q.k);
  // la columna de hormigón (tranquila bajo Atom) con la salida de emergencia y el extintor
  moteado(268, 16, 319, 123, Q.sala, Q.salaL, Q.salaS, 62, 0.08); R.rect(268, 16, 268, 123, Q.k); R.rect(269, 16, 270, 123, Q.salaL);
  caja(282, 54, 306, 64, hex('#1e8a4a')); R.disco(288, 57, 1, Q.blanco); R.rect(287, 59, 289, 60, Q.blanco); R.pset(286, 61, Q.blanco); R.pset(290, 62, Q.blanco); R.pset(290, 59, Q.blanco);
  R.rect(294, 59, 302, 59, Q.blanco); R.pset(301, 58, Q.blanco); R.pset(301, 60, Q.blanco); R.rect(282, 65, 306, 65, Q.k);
  caja(289, 96, 299, 120, Q.rojo); R.rect(290, 97, 291, 119, Q.rojoL); caja(291, 92, 297, 96, Q.k); raya(297, 94, 302, 110, Q.k, 0); R.rect(290, 104, 298, 108, Q.papel);
  // la pantalla con su caja de rodillo, su borde negro y el tirador
  caja(58, 16, 254, 21, Q.gris); R.rect(59, 17, 253, 17, Q.grisL); R.rect(59, 20, 253, 20, Q.grisS);
  R.rect(64, 21, 248, 117, Q.k);
  for (let y = 22; y <= 115; y++) for (let x = 65; x <= 247; x++) R.pset(x, y, (x + 2 * y) % 7 === 0 ? Q.gris : Q.grisL);
  R.rect(65, 22, 247, 24, Q.negro); R.rect(65, 113, 247, 115, Q.negro); R.rect(65, 22, 67, 115, Q.negro); R.rect(245, 22, 247, 115, Q.negro);
  R.rect(62, 116, 250, 118, Q.grisS); R.rect(156, 119, 156, 124, Q.grisL); R.disco(156, 126, 2, Q.grisL);
  // el escenario de la izquierda con el atril y su lamparita
  madera(0, 124, 72, 132, Q.listoL, Q.roble, Q.listo, Q.listoD, 4, 63); R.rect(0, 133, 72, 134, Q.k);
  R.poligono([[8, 92], [32, 88], [34, 96], [10, 100]], Q.k); R.poligono([[9, 93], [31, 89], [32, 95], [11, 98]], Q.listoL);
  caja(13, 98, 29, 126, Q.listo); R.rect(14, 99, 15, 125, Q.listoL); R.rect(27, 99, 28, 125, Q.listoS); R.rect(16, 104, 26, 105, Q.listoD); R.rect(16, 116, 26, 117, Q.listoD);
  R.rect(29, 84, 30, 90, Q.bronceS); R.poligono([[25, 84], [35, 82], [34, 86], [26, 87]], Q.lampV);
  // la moqueta del suelo, con su dibujo
  for (let y = 124; y < 180; y++) for (let x = 73; x < 320; x++) R.pset(x, y, ((x >> 2) + (y >> 2)) % 5 === 0 ? Q.alfoL : (x + y) % 3 === 0 ? Q.salaD : Q.alfo);
  for (let y = 135; y < 180; y++) for (let x = 0; x < 73; x++) R.pset(x, y, (x + y) % 3 === 0 ? Q.salaD : Q.alfo);
  // los dos escalones del estrado, la mochila de la conferenciante, su botella de agua y el cable del proyector
  for (let k = 0; k < 2; k++) { caja(40 + k * 6, 134 + k * 6, 72, 140 + k * 6, Q.listo); R.rect(41 + k * 6, 135 + k * 6, 71, 135 + k * 6, Q.listoL); }
  R.disco(20, 160, 9, Q.k); R.disco(20, 160, 8, Q.azulTS); R.rect(12, 160, 28, 170, Q.k); R.rect(13, 160, 27, 169, Q.azulTS); R.rect(15, 154, 25, 158, Q.azulT); caja(14, 162, 26, 168, Q.azulT); R.rect(16, 165, 24, 165, Q.amar); R.rect(18, 150, 22, 151, Q.k);
  caja(32, 156, 37, 170, Q.cristalL); R.rect(33, 157, 34, 169, Q.blanco); caja(33, 153, 36, 156, Q.azulT);
  for (let x = 0; x < 150; x++) { const y = Math.round(176 - Math.sin(x * 0.05) * 3); R.pset(x, y, Q.k); R.pset(x, y - 1, Q.salaL); }
  for (let i = 0; i < 30; i++) R.pset(Math.round(hh(i, 1, 64) * 70), 136 + Math.round(hh(i, 2, 64) * 40), Q.alfoL);
});
// la página proyectada (un búfer con huecos)
const PROY = () => prepara('proy', () => {
  pergamino(68, 25, 244, 112, 9);
  for (let x = 68; x <= 244; x++) { R.pset(x, 25, Q.pergD); R.pset(x, 112, Q.pergD); }
});
const LP = [[[7, 22, 13], [14, 3], [9, 30, 1], [19, 4]], [[25, 6], [3, 17, 9], [3, 17, 9], [20, 11]], [[12, 5], [12, 5], [12, 5], [26, 8, 2]], [[18, 4, 31], [10, 21], [6, 13, 28], [1, 19]]];
const LPX = LP.map((ws) => { let x = 80; return ws.map((w) => { const a = x, b = x + anchoP(w, 2); x = b + 8; return [a, b]; }); });
const LPY = (k) => 46 + k * 20;
const butacas = (y0, xs) => { for (const x of xs) { R.rect(x - 11, y0, x + 11, 179, Q.k); R.rect(x - 10, y0 + 1, x + 10, 179, Q.butaca); R.rect(x - 10, y0 + 1, x + 10, y0 + 2, Q.butacaL); R.rect(x + 6, y0 + 3, x + 10, 179, Q.butacaS); for (let y = y0 + 5; y < 180; y += 4) R.rect(x - 8, y, x + 4, y, Q.butacaS); } };
const p1 = (t) => {
  aula();
  // las luces del techo se apagan una a una tras el clic del mando
  for (const [k, lx] of [[0, 40], [1, 112], [2, 200]]) {
    const on = t < CLIC + 0.12 * k + 0.05;
    R.rect(lx - 5, 13, lx + 5, 14, on ? Q.amarL : Q.salaL);
    if (on) for (let y = 16; y < 96; y++) { const w = 4 + (y - 16) * 0.4; for (let x = Math.round(lx - w); x <= lx + w; x++) if ((x + y) & 1) tine(x, y, 0.22 * (1 - (y - 16) / 80), Q.luz); }
  }
  // el proyector calienta y la página se enciende en la pantalla
  const enc = tramo(t, CLIC + 0.3, CLIC + 0.9);
  if (enc > 0) revela(PROY(), enc, 68, 25, 244, 112);
  if (enc >= 1) {
    for (let k = 0; k < 4; k++) {
      const yb = LPY(k);
      // los marcadores amarillos (la pareja en «two», el trío en «three»)
      const mk = (a, b, u) => { if (u <= 0) return; const x1 = Math.round(a - 2 + (b - a + 4) * Math.min(1, u)); for (let y = yb - 14; y <= yb + 5; y++) for (let x = a - 2; x <= x1; x++) tine(x, y, 0.62, Q.marca); };
      if (k === 1) mk(LPX[1][1][0], LPX[1][2][1], tramo(t, DOS - 0.1, DOS + 0.3));
      if (k === 2) mk(LPX[2][0][0], LPX[2][2][1], tramo(t, TRES - 0.1, TRES + 0.35));
      LP[k].forEach((w, i) => palabra(w, LPX[k][i][0], yb, 2, Q.tinta));
    }
    // el «2» y el «3» en su chapa amarilla
    const chapa = (n, x, y, u) => { if (u <= 0) return; const r = Math.round(7 * Math.min(1, u * 1.4)); R.disco(x, y, r + 1, Q.k); R.disco(x, y, r, Q.marca); if (u > 0.6) R.numero(n, x + 1, y + 4, { centro: true, color: Q.k, sombra: false }); };
    chapa('2', LPX[1][2][1] + 9, LPY(1) - 12, tramo(t, DOS + 0.2, DOS + 0.45));
    chapa('3', LPX[2][2][1] + 9, LPY(2) - 12, tramo(t, TRES + 0.25, TRES + 0.5));
  }
  // el haz del proyector, con las motas que flotan
  const lx = 161, ly = 134;
  if (enc > 0) {
    for (let y = 113; y < ly; y++) { const u = (y - 113) / (ly - 113), xl = Math.round(lerp(68, lx, u)), xr = Math.round(lerp(244, lx, u)); for (let x = xl; x <= xr; x++) if ((x + y) % 2 === 0) tine(x, y, 0.16 * enc, Q.proy); }
    for (let i = 0; i < 26; i++) { const u = (hh(i, 1, 81) + t * 0.05 * (0.5 + hh(i, 2, 81))) % 1, y = Math.round(lerp(ly, 30, u)), w = lerp(0, 88, (ly - y) / (ly - 30)), x = Math.round(lx + (hh(i, 3, 81) * 2 - 1) * w + Math.sin(t + i) * 2); if (y < 113 || Math.abs(x - lx) < w) tine(x, y, 0.5, Q.blanco); }
  }
  // la fila de atrás (junto a la pantalla): cabezas y respaldos
  const fila1 = [[86, Q.negro, Q.verde, 0], [108, hex('#8a5428'), Q.azulTS, 1], [130, Q.amarS, Q.terc, 0], [194, hex('#3a2418'), Q.grisS, 2], [216, Q.gris, Q.damasco, 0], [238, hex('#5a3418'), Q.verdeS, 1], [262, Q.negro, Q.ocreS, 0]];
  const cuchi = t > TRES + 0.25 && t < TRES + 0.6;
  fila1.forEach(([x, pe, ro, f], i) => espalda(x + (cuchi && i === 1 ? 2 : cuchi && i === 2 ? -2 : 0), 122 + (Math.sin(t * 1.7 + i * 2) > 0.85 ? 1 : 0), pe, ro, f));
  // el que llega tarde: entra por la derecha y se sienta
  const lt = tramo(t, 0.2, 2.2), sx = Math.round(lerp(336, 286, lt)), sb = Math.round(132 + 12 * ease(tramo(t, 2.3, 2.7)));
  R.actor(EL.estudiante, sx, sb, t, { dir: -1, anda: lt > 0 && lt < 1 });
  butacas(140, [86, 108, 130, 194, 216, 238, 262, 286, 310]);
  if (t > TRES + 0.15 && t < TRES + 0.65) globo(108, 119, '!');
  // el proyector de carrusel en su carrito, de espaldas, con el ventilador que brilla
  caja(146, 146, 176, 149, Q.grisS); R.rect(149, 150, 150, 170, Q.k); R.rect(172, 150, 173, 170, Q.k); R.rect(147, 158, 175, 159, Q.grisS); R.disco(150, 172, 2, Q.k); R.disco(172, 172, 2, Q.k);
  caja(149, 134, 173, 146, Q.gris); R.rect(150, 135, 172, 135, Q.grisL); for (let x = 152; x < 170; x += 3) R.rect(x, 138, x, 143, Q.grisS);
  R.disco(161, 128, 8, Q.k); R.disco(161, 128, 7, Q.negro); for (let k = 0; k < 8; k++) { const a = k / 8 * 6.28 + Math.floor(t * 0.9) * 0.785; R.pset(Math.round(161 + Math.cos(a) * 5), Math.round(128 + Math.sin(a) * 2.5), Q.grisL); } R.disco(161, 128, 2, Q.gris);
  if (enc > 0 && Math.sin(t * 20) > 0) R.pset(170, 140, Q.verdeL); else R.pset(170, 140, Q.verdeS);
  // la fila de delante (junto a nosotros); a uno le brilla el móvil
  const fila2 = [[74, hex('#c89a50'), Q.azulT, 1], [98, Q.negro, Q.rojoS, 0], [122, hex('#6a3a1a'), Q.grisL, 2], [200, hex('#2a1c14'), Q.lilaS, 0], [224, hex('#8a5428'), Q.verdeS, 1], [248, Q.grisS, Q.ocre, 0], [272, hex('#4a3020'), Q.terc, 2], [298, Q.negro, Q.azulTS, 0]];
  fila2.forEach(([x, pe, ro, f], i) => espalda(x, 146 + (Math.sin(t * 1.4 + i * 3) > 0.85 ? 1 : 0), pe, ro, f));
  butacas(164, [74, 98, 122, 200, 224, 248, 272, 298]);
  if (Math.sin(t * 0.8) > -0.4) { caja(230, 160, 236, 166, hex('#9ad0ff')); for (let y = 150; y < 164; y++) for (let x = 226; x < 242; x++) if ((x + y) & 1) tine(x, y, 0.18, hex('#9ad0ff')); }
  // la conferenciante: el mando (clic) y luego el puntero láser
  const lec = R.actor(EL.colega, 38, 128, t, { dir: 1, sostiene: t < SOME ? [52, 112] : false, dedo: t >= SOME, habla: t > 1.0 && t < SOME && Math.sin(t * 9) > 0.2, sonrisa: t > TRES + 0.3 });
  if (t < SOME) { const [mx, my] = lec.mano; caja(mx - 1, my - 5, mx + 3, my + 1, Q.negro); R.pset(mx + 1, my - 4, t > CLIC - 0.1 && t < CLIC + 0.2 ? Q.rojoL : Q.grisS); }
  if (t >= SOME && enc >= 1) {
    const [px, py] = camino([[SOME, 56, 102], [DOS - 0.2, (LPX[1][1][0] + LPX[1][2][1]) / 2, LPY(1) - 4], [TRES - 0.3, (LPX[1][1][0] + LPX[1][2][1]) / 2 + 6, LPY(1) - 3], [TRES - 0.05, (LPX[2][0][0] + LPX[2][2][1]) / 2, LPY(2) - 4]], t);
    const X = Math.round(px + Math.sin(t * 11) * 2), Y = Math.round(py + Math.cos(t * 9) * 1.5);
    for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) if (x * x + y * y <= 16) tine(X + x, Y + y, 0.25, Q.rojoL);
    R.disco(X, Y, 1, Q.rojoL); R.pset(X, Y, Q.blanco);
  }
};

// ── plano 2: el despacho del loro ──
const ONE = @4.85@, AFTER = @5.21@, ANOTHER = @5.49@, SOMETHING = @5.81@, NOLANG = @6.85@, DOES = @7.51@;
const PAL_R = [3, 17, 9];
const LORO = [
  '....kkkk....',
  '...kYYGGk...',
  '..kGGGGGGk..',
  '..kGwkGGGkk.',
  '..kGGGGGkWWk',
  '..kRGGGGkWWk',
  '...kGGGGkWk.',
  '..kSGGGGGk..',
  '.kSSGGLLGk..',
  '.kSSSGLLGk..',
  '.kSSSGLLGk..',
  '..kSSGLGk...',
  '..kAkSSkk...',
  '.kAAkffk....',
  '.kAk.kk.....',
  '.kk.........',
];
const LORO_ABRE = LORO.map((f, j) => j === 4 ? '..kGGGGGkWWk' : j === 5 ? '..kRGGGGk..k' : j === 6 ? '...kGGGGkWWk' : j === 7 ? '..kSGGGGGkk.' : f);
const PAL_LORO = { k: Q.k, G: Q.loro, L: Q.loroL, S: Q.loroS, Y: Q.loroY, A: Q.loroA, R: Q.loroR, W: Q.loroP, w: Q.blanco, f: Q.gris };
const loro = (x, y, t, abre, aletea) => {
  const s = 2, bob = Math.sin(t * 3) > 0.6 ? 1 : 0;
  const hop = aletea ? -3 : 0;
  spr(abre ? LORO_ABRE : LORO, x, y + bob + hop, s, PAL_LORO, 1);
  if (aletea) for (const d of [-1, 1]) { const wx = x + 8 + d * 9, wy = y + 16 + hop; R.poligono([[wx, wy], [wx + d * 8, wy - 8], [wx + d * 4, wy + 4]], Q.k); R.poligono([[wx, wy + 1], [wx + d * 6, wy - 6], [wx + d * 3, wy + 3]], Q.loroS); }
};
const loroFijo = () => fijo('loro', () => {
  // la pared de yeso cálido (tranquila arriba a la derecha) y el friso de cuarterones
  moteado(0, 0, 319, 94, Q.piedraL, Q.blanco, Q.piedra, 63, 0.1);
  for (let y = 0; y < 95; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 222, (y - 54) * 1.3); if (d < 80 && ((x + y) & 1)) R.pset(x, y, mez(R.pget(x, y), Q.luz, 0.25 * (1 - d / 80))); }
  R.rect(0, 94, 319, 96, Q.robleD); madera(0, 97, 319, 120, Q.roble, Q.robleL, Q.robleS, Q.robleD, 24, 64);
  for (let x = 4; x < 320; x += 36) { caja(x, 100, x + 30, 116, Q.roble); R.rect(x + 1, 101, x + 29, 101, Q.robleL); R.rect(x + 1, 115, x + 29, 115, Q.robleS); }
  R.rect(0, 120, 319, 121, Q.k);
  // el suelo de tarima con la alfombra
  madera(0, 122, 319, 179, Q.nog, Q.nogL, Q.nogS, Q.nogD, 6, 65);
  for (let y = 150; y < 178; y++) for (let x = 46; x < 160; x++) { const b = y === 150 || y === 177 || x === 46 || x === 159; R.pset(x, y, b ? Q.azulTS : (x + y) % 6 === 0 ? Q.oroS : ((x >> 2) + (y >> 2)) % 2 ? Q.azulT : Q.azulTL); }
  // la librería de la izquierda, llena de diccionarios y cajas
  caja(0, 10, 50, 132, Q.robleD); for (let sv = 0; sv < 4; sv++) { const y = 14 + sv * 29; R.rect(2, y + 25, 48, y + 27, Q.robleL);
    let x = 3; while (x < 45) { const w = 3 + Math.floor(hh(x, sv, 72) * 5), hg = 13 + Math.floor(hh(x, sv, 73) * 10), c = [Q.terc, Q.verde, Q.azulTS, Q.ocreS, Q.damasco, Q.grisS, Q.perg][Math.floor(hh(x, sv, 74) * 7)]; caja(x, y + 25 - hg, x + w, y + 25, c); R.rect(x + 1, y + 27 - hg, x + 1, y + 23, mez(c, Q.blanco, 0.3)); if (w > 4) R.rect(x + 1, y + 29 - hg, x + w - 1, y + 29 - hg, Q.oro); x += w + 1; } }
  // el cuadro de la selva (de donde viene el loro)
  caja(60, 22, 102, 54, Q.oroS); caja(63, 25, 99, 51, Q.verdeS); for (let i = 0; i < 40; i++) { const x = 64 + Math.round(hh(i, 1, 75) * 34), y = 26 + Math.round(hh(i, 2, 75) * 24); R.disco(x, y, 2, [Q.verde, Q.verdeL, Q.hierba, Q.setoL][i % 4]); } R.disco(86, 36, 3, Q.rojo); R.pset(88, 35, Q.amar); R.rect(84, 39, 85, 45, Q.azulT);
  // el mapa del mundo con sus chinchetas de idiomas
  caja(110, 24, 172, 58, Q.robleS); caja(112, 26, 170, 56, Q.aguaS); for (let y = 27; y < 56; y++) for (let x = 113; x < 170; x++) if ((x + y) % 4 === 0) R.pset(x, y, Q.agua);
  for (const [x, y, rx, ry] of [[124, 36, 7, 6], [128, 48, 4, 6], [146, 34, 9, 5], [150, 46, 5, 6], [162, 37, 6, 5], [163, 51, 4, 2]]) for (let yy = -ry; yy <= ry; yy++) for (let xx = -rx; xx <= rx; xx++) if (xx * xx / (rx * rx) + yy * yy / (ry * ry) <= 1 + hh(xx, yy, 8) * 0.3) R.pset(x + xx, y + yy, (xx + yy) % 3 ? Q.hierba : Q.hierbaL);
  for (const [x, y, c] of [[122, 34, Q.rojo], [130, 49, Q.amar], [144, 33, Q.rojo], [152, 45, Q.blanco], [160, 36, Q.amar], [164, 51, Q.rojo], [148, 37, Q.lila]]) { R.pset(x, y, c); R.pset(x, y + 1, Q.k); }
  // el reloj de pared
  R.disco(166, 76, 8, Q.k); R.disco(166, 76, 7, Q.bronce); R.disco(166, 76, 6, Q.papel); for (let k = 0; k < 12; k++) R.pset(Math.round(166 + Math.cos(k / 12 * 6.28) * 5), Math.round(76 + Math.sin(k / 12 * 6.28) * 5), Q.grisS);
  // la ventana al campus: cielo, torre de ladrillo y árboles
  caja(186, 20, 264, 90, Q.blanco); degr(189, 23, 261, 87, [Q.c1, Q.c2, Q.c3, Q.c4, Q.c5]);
  for (let x = 189; x < 262; x++) { const yb = 70 - Math.round(Math.max(0, Math.sin((x - 189) * 0.07)) * 6); for (let y = yb; y < 88; y++) R.pset(x, y, y === yb ? Q.ladrL : (x % 5 === 0 || y % 4 === 0) ? Q.ladrS : Q.ladr); }
  caja(218, 34, 230, 72, Q.ladr); R.poligono([[216, 34], [224, 24], [232, 34]], Q.cobre); for (let y = 40; y < 70; y += 8) R.rect(222, y, 225, y + 3, Q.vidrio);
  for (const [x, y] of [[196, 78], [252, 76], [240, 82]]) { R.disco(x, y, 7, Q.setoS); R.disco(x - 1, y - 1, 6, Q.seto); R.pset(x - 3, y - 4, Q.setoL); R.pset(x + 1, y - 5, Q.setoL); }
  R.rect(186, 90, 266, 93, Q.blancoS);
  // la mesa al fondo a la derecha con el globo, el diccionario abierto, la pila de diccionarios y el flexo
  caja(168, 126, 312, 131, Q.nog); R.rect(169, 127, 311, 127, Q.nogL); caja(170, 131, 176, 146, Q.nogS); caja(290, 131, 310, 146, Q.nog);
  for (const y of [133, 139]) { R.rect(292, y, 308, y + 4, Q.nogL); caja(298, y + 1, 302, y + 2, Q.bronce); }
  R.disco(180, 112, 8, Q.k); R.disco(180, 112, 7, Q.azulTL); R.disco(178, 110, 3, Q.verdeL); R.disco(183, 115, 2, Q.verdeL); R.rect(179, 120, 181, 125, Q.bronce); R.rect(175, 125, 185, 126, Q.bronceS);
  const libros = [[Q.terc, 6], [Q.azulT, 5], [Q.verde, 7], [Q.ocreS, 5], [Q.damasco, 6]]; let y = 126;
  libros.forEach(([c, h], i) => { const x0 = 262 + (i % 2) * 2; caja(x0, y - h, x0 + 26, y, c); R.rect(x0 + 1, y - h + 1, x0 + 25, y - h + 1, mez(c, Q.blanco, 0.3)); R.rect(x0 + 4, y - h + 2, x0 + 5, y - 1, Q.oro); R.rect(x0 + 20, y - h + 2, x0 + 21, y - 1, Q.oro); y -= h; });
  R.rect(304, 86, 305, 126, Q.k); R.rect(298, 124, 312, 126, Q.k); R.poligono([[296, 84], [312, 80], [314, 88], [298, 92]], Q.lampV);
  for (let yy = 92; yy < 126; yy++) for (let x = 284; x < 318; x++) if ((x + yy) & 1 && Math.abs(x - 304) < (yy - 90) * 0.5) R.pset(x, yy, mez(R.pget(x, yy), Q.luz, 0.25));
  // el pie del loro: barra de latón, la percha y los comederos
  R.rect(82, 106, 85, 150, Q.k); R.rect(83, 106, 84, 150, Q.bronce); R.rect(73, 149, 95, 153, Q.k); R.rect(74, 149, 94, 151, Q.bronce); R.rect(74, 152, 94, 152, Q.bronceS); R.rect(75, 149, 93, 149, Q.bronceL);
  R.rect(64, 105, 104, 107, Q.k); R.rect(65, 105, 103, 106, Q.bronceL); caja(62, 106, 70, 112, Q.blanco); R.rect(63, 107, 69, 108, Q.amar); caja(98, 106, 106, 112, Q.blanco); R.rect(99, 107, 105, 108, Q.aguaS);
  for (let i = 0; i < 6; i++) R.pset(78 + i * 3, 152 + (i % 2), Q.amar);
});
const p2 = (t) => {
  loroFijo();
  // la ventana: nubes que pasan y pájaros (dentro del hueco)
  R.recorte([189, 23, 261, 66]); nubes(t, 26, 58, 4); R.recorte(null);
  R.rect(224, 23, 225, 87, Q.blanco); R.rect(189, 54, 261, 55, Q.blanco);
  // las agujas del reloj
  raya(166, 76, Math.round(166 + Math.cos(t * 0.6) * 5), Math.round(76 + Math.sin(t * 0.6) * 5), Q.k, 0); raya(166, 76, 166 + 3, 76 - 2, Q.k, 0);
  // el diccionario abierto sobre la mesa: las hojas pasan desde «something»
  const dx = 206, dy = 124;
  R.poligono([[dx, dy], [dx + 24, dy - 2], [dx + 24, dy + 2], [dx, dy + 2]], Q.k); R.poligono([[dx + 24, dy - 2], [dx + 48, dy], [dx + 48, dy + 2], [dx + 24, dy + 2]], Q.k);
  R.poligono([[dx + 1, dy - 10], [dx + 24, dy - 8], [dx + 24, dy + 1], [dx + 1, dy + 1]], Q.papel); R.poligono([[dx + 24, dy - 8], [dx + 47, dy - 10], [dx + 47, dy + 1], [dx + 24, dy + 1]], Q.papel);
  for (let j = 0; j < 4; j++) { R.rect(dx + 4, dy - 7 + j * 2, dx + 20 - (j % 2) * 3, dy - 7 + j * 2, Q.grisS); R.rect(dx + 28, dy - 7 + j * 2, dx + 44 - (j % 3) * 2, dy - 7 + j * 2, Q.grisS); }
  const hoj = tramo(t, SOMETHING + 0.6, NOLANG + 0.1);
  if (hoj > 0 && hoj < 1) { const f = (hoj * 4) % 1, x = Math.round(lerp(dx + 46, dx + 2, f)), h = Math.round(10 + Math.sin(f * 3.14) * 6); R.poligono([[dx + 24, dy], [x, dy - h], [x, dy - h + 3], [dx + 24, dy + 1]], Q.blanco); R.rect(dx + 24, dy - 9, dx + 24, dy, Q.papelS); }
  // la X roja sobre la pila de diccionarios del mundo
  const xx = tramo(t, NOLANG + 0.15, NOLANG + 0.4);
  if (xx > 0) { R.disco(276, 82, Math.round(11 * xx) + 1, Q.k); R.disco(276, 82, Math.round(11 * xx), Q.blanco); if (xx >= 1) R.icono('X', 269, 75, Q.rojo, Q.rojoD, 3); }
  // el loro repite la palabra una vez, otra y otra
  const sq = [ONE, AFTER, ANOTHER], abre = sq.some((s) => t > s - 0.05 && t < s + 0.18);
  loro(72, 74, t, abre, sq.some((s) => t > s - 0.05 && t < s + 0.3));
  const fin = tramo(t, SOMETHING + 0.3, SOMETHING + 0.6);
  [[118, 70], [146, 54], [174, 38]].forEach(([bx, by], i) => { const u = tramo(t, sq[i] - 0.05, sq[i] + 0.1) * (1 - fin); if (u > 0) bocadilloG(bx, by, PAL_R, Q.rojoS, 96, 82, u, 2); });
  // ella: le enseña la tarjeta al loro; en «something» va a la mesa y hojea; en «no language», la X y se encoge
  const va = tramo(t, SOMETHING, SOMETHING + 0.6), x = Math.round(lerp(110, 184, ease(va)));
  const ella = R.actor(EL.colega, x, 150, t, { dir: va > 0 ? 1 : -1, anda: va > 0 && va < 1, sostiene: va <= 0 ? [100, 120] : va >= 1 && t < NOLANG + 0.2 ? [206, 120] : false, sonrisa: t > ONE && t < SOMETHING, sorpresa: t > ANOTHER && t < SOMETHING, triste: t > NOLANG + 0.3, habla: t < ONE - 0.2 && Math.sin(t * 9) > 0 });
  if (va <= 0) { const [mx, my] = ella.mano; caja(mx - 10, my - 11, mx + 8, my + 1, Q.papel); R.rect(mx - 9, my, mx + 7, my, Q.papelS); palabra(PAL_R, mx - 8, my - 3, 1, Q.rojoS); }
  if (t > NOLANG + 0.3 && t < DOES + 0.3 && Math.sin(t * 9) > 0) globo(x + 8, 122, '?');
};

// ── plano 3: la página en la alfombrilla de corte ──
const CERTAIN = @8.49@, BEGIN = @10.83@, OTHERS = @12.09@, END = @13.73@;
const LIN3 = [0, 1, 2, 3, 4].map((k) => {
  const out = [], esc = 2, x1 = 284; let x = 36;
  out.push({ x, id: 2, ini: true }); x += (anchoG(2) + 1) * esc + 7;
  const fin = anchoG(7) * esc;
  for (let p = 0; p < 20; p++) { const nw = 2 + Math.floor(hh(k, p, 71) * 3), ids = []; for (let j = 0; j < nw; j++) { let id = Math.floor(hh(k * 7 + p, j, 72) * 32); if (id % 8 === 2 || id % 8 === 7) id += 1; ids.push(id); }
    const w = anchoP(ids, esc); if (x + w > x1 - fin - 9) break; for (const id of ids) { out.push({ x, id }); x += (anchoG(id) + 1) * esc; } x += 7; }
  out.push({ x: x1 - fin, id: 7, fin: true });
  return out;
});
const Y3 = (k) => 60 + k * 24;
const corteFijo = () => fijo('corte', () => {
  // la alfombrilla de corte verde con su cuadrícula suave
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let c = (x % 10 === 0 || y % 10 === 0) ? Q.mateL : Q.mate; if ((x % 50 === 0 || y % 50 === 0) && (x + y) % 2) c = Q.mateL; if (hh(x >> 1, y >> 1, 66) > 0.975) c = Q.mateS; R.pset(x, y, c); }
  // la regla metálica, la goma, los clips y el cúter (arriba, bajo el año, quietos)
  caja(26, 18, 182, 26, Q.aceroL); R.rect(27, 19, 181, 19, Q.blanco); for (let x = 30; x < 180; x += 4) R.rect(x, 20, x, x % 20 === 10 ? 24 : 22, Q.aceroS);
  caja(4, 30, 18, 38, Q.rosa); R.rect(5, 31, 17, 31, mez(Q.rosa, Q.blanco, 0.4)); R.rect(5, 35, 17, 37, Q.azulTL);
  for (const [x, y] of [[198, 20], [210, 24]]) { R.rect(x, y, x + 8, y, Q.aceroL); R.rect(x, y + 3, x + 8, y + 3, Q.aceroL); R.rect(x, y, x, y + 3, Q.aceroL); R.rect(x + 8, y + 1, x + 8, y + 3, Q.aceroL); }
  // el bote de los lápices (rojo, azul, verde) y la taza
  R.disco(244, 16, 11, Q.k); R.disco(244, 16, 10, Q.bronceS); R.disco(244, 16, 8, Q.k); for (const [dx, dy, c] of [[-3, -2, Q.rojo], [3, -3, Q.azulT], [0, 3, Q.verde], [-4, 3, Q.amar]]) { R.disco(244 + dx, 16 + dy, 2, c); R.pset(244 + dx, 16 + dy, Q.perg); }
  // la página del facsímil (con su folio)
  pergamino(22, 34, 298, 176, 21);
  for (let k = 0; k < 5; k++) for (const g of LIN3[k]) glifo(g.id, g.x, Y3(k), 2, Q.tinta);
  R.numero('78', 282, 47, { color: Q.tintaL, sombra: false, fina: true });
});
const p3 = (t) => {
  corteFijo();
  // el vapor de la taza de la esquina
  for (let i = 0; i < 6; i++) { const u = (t * 0.6 + i / 6) % 1, x = Math.round(214 + Math.sin(u * 8 + i) * 3), y = Math.round(10 - u * 10); if (y >= 0) tine(x, y, 0.4 * (1 - u), Q.blanco); }
  // los círculos rojos del principio (uno por renglón) y los azules del final
  const ini = (k) => CERTAIN + 1.2 + k * 0.36, fin = (k) => OTHERS + 0.55 + k * 0.33;
  for (let k = 0; k < 5; k++) {
    const g0 = LIN3[k][0], g1 = LIN3[k][LIN3[k].length - 1], y = Y3(k) - 4;
    const u0 = tramo(t, ini(k), ini(k) + 0.3); if (u0 > 0) elipse(g0.x + 5, y, 9, 11, u0, Q.rojo);
    const u1 = tramo(t, fin(k), fin(k) + 0.28); if (u1 > 0) elipse(g1.x + 5, y, 9, 11, u1, Q.azulT);
  }
  // en «beginning» y en «end» los cinco círculos laten a la vez
  if (t > BEGIN + 0.75 && t < BEGIN + 1.2 && Math.sin(t * 20) > 0) for (let k = 0; k < 5; k++) elipse(LIN3[k][0].x + 5, Y3(k) - 4, 10, 12, 1, Q.rojoL);
  if (t > END && t < END + 0.5 && Math.sin(t * 20) > 0) for (let k = 0; k < 5; k++) { const g1 = LIN3[k][LIN3[k].length - 1]; elipse(g1.x + 5, Y3(k) - 4, 10, 12, 1, Q.azulTL); }
  // la mano izquierda (lápiz rojo) entra por la izquierda y baja por el margen
  const tipo = (k, u, x) => [x + Math.cos(-2.2 + u * 6.6) * 9, Y3(k) - 4 + Math.sin(-2.2 + u * 6.6) * 11];
  if (t < OTHERS + 0.2) {
    let tx, ty; const k = Math.max(0, Math.min(4, Math.floor((t - ini(0)) / 0.36))), u = tramo(t, ini(k), ini(k) + 0.3);
    if (t < ini(0)) { const e = ease(tramo(t, CERTAIN + 0.2, ini(0))); [tx, ty] = [lerp(-30, LIN3[0][0].x + 5 + Math.cos(-2.2) * 9, e), lerp(110, Y3(0) - 4 + Math.sin(-2.2) * 11, e)]; }
    else { [tx, ty] = tipo(k, u, LIN3[k][0].x + 5); if (u >= 1 && k < 4) { const v = ease(tramo(t, ini(k) + 0.3, ini(k + 1))); const [ax, ay] = tipo(k + 1, 0, LIN3[k + 1][0].x + 5); tx = lerp(tx, ax, v); ty = lerp(ty, ay, v); } }
    const sale = ease(tramo(t, ini(4) + 0.45, OTHERS + 0.15)); tx = lerp(tx, -40, sale); ty = lerp(ty, 150, sale);
    const x1 = Math.round(tx - 13), y1 = Math.round(ty - 7);
    lapiz(x1, y1, 1, Q.rojo); T.brazo(R, x1 - 44, y1 + 34, x1, y1, '#c87a3a', 1, { codo: [x1 - 22, y1 + 22] });
  }
  // la derecha (lápiz azul) entra en «others» y baja por el final de los renglones
  if (t > OTHERS - 0.1) {
    let tx, ty; const k = Math.max(0, Math.min(4, Math.floor((t - fin(0)) / 0.33))), u = tramo(t, fin(k), fin(k) + 0.28), gx = (k) => LIN3[k][LIN3[k].length - 1].x + 5;
    if (t < fin(0)) { const e = ease(tramo(t, OTHERS - 0.1, fin(0))); [tx, ty] = [lerp(350, gx(0) + Math.cos(-2.2) * 9, e), lerp(120, Y3(0) - 4 + Math.sin(-2.2) * 11, e)]; }
    else { [tx, ty] = tipo(k, u, gx(k)); if (u >= 1 && k < 4) { const v = ease(tramo(t, fin(k) + 0.28, fin(k + 1))); const [ax, ay] = tipo(k + 1, 0, gx(k + 1)); tx = lerp(tx, ax, v); ty = lerp(ty, ay, v); } }
    const x1 = Math.round(tx + 13), y1 = Math.round(ty - 7);
    lapiz(x1, y1, -1, Q.azulT); T.brazo(R, x1 + 44, y1 + 34, x1, y1, '#c87a3a', -1, { codo: [x1 + 22, y1 + 22] });
  }
};

// ── plano 4: la mesa de clasificar con las dos cajas de luz ──
const PLANT = @14.57@, VOCAB = @16.05@, BATHING = @17.31@;
const VERDES = [[5, 12, 20], [1, 26], [14, 9, 4]], AZULES = [[19, 3, 28], [11, 22], [30, 6, 15]];
const cajaLuz = (x0, y0, x1, y1, que) => {
  caja(x0, y0, x1, y1, Q.grisS); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, Q.grisL); caja(x0 + 3, y0 + 3, x1 - 3, y1 - 3, Q.k);
  pergamino(x0 + 4, y0 + 4, x1 - 4, y1 - 4, que === 'planta' ? 31 : 37);
  const cx = (x0 + x1) >> 1;
  if (que === 'planta') {
    // la planta del libro: raíz con patas, tallo y hojas grandes
    R.disco(cx, y0 + 46, 6, Q.tintaL); R.disco(cx, y0 + 46, 5, Q.sepia); for (const d of [-7, -3, 2, 6]) raya(cx + d * 0.5, y0 + 48, cx + d, y0 + 56, Q.sepia, 0);
    R.rect(cx, y0 + 16, cx + 1, y0 + 41, Q.verdeS);
    for (const [dx, dy, r] of [[-9, 22, 6], [9, 26, 6], [-8, 34, 5], [8, 37, 4], [0, 13, 5]]) { R.disco(cx + dx, y0 + dy, r + 1, Q.verdeS); R.disco(cx + dx, y0 + dy, r, Q.verde); R.pset(cx + dx - 1, y0 + dy - 2, Q.verdeL); }
    R.disco(cx, y0 + 11, 3, Q.azulTL);
  } else {
    // los baños: dos estanques verdes con tubos y figuritas vestidas
    for (const [ex, ey] of [[cx - 16, y0 + 30], [cx + 14, y0 + 44]]) { for (let y = -6; y <= 6; y++) for (let x = -14; x <= 14; x++) if ((x * x) / 196 + (y * y) / 36 <= 1) R.pset(ex + x, ey + y, (x + y) % 4 ? Q.cobreL : Q.cobre); for (let x = -14; x <= 14; x++) { const y = Math.round(Math.sqrt(Math.max(0, 1 - x * x / 196)) * 6); R.pset(ex + x, ey - y, Q.cobreD); R.pset(ex + x, ey + y, Q.cobreD); }
      for (let i = -1; i <= 1; i++) { const fx = ex + i * 7; R.disco(fx, ey - 4, 2, Q.piel); R.pset(fx, ey - 6, Q.sepia); R.rect(fx - 2, ey - 2, fx + 2, ey + 1, i ? Q.azulTL : Q.rosa); } }
    raya(cx - 2, y0 + 32, cx + 2, y0 + 40, Q.cobreS, 1); raya(cx - 32, y0 + 12, cx - 16, y0 + 24, Q.cobreS, 1);
  }
};
const LUZ_X = [[34, 128], [188, 272]];
const clasifFijo = () => fijo('clasif', () => {
  // la cornisa y la pared verde gris moteada
  R.rect(0, 0, 319, 5, Q.pared4S); R.rect(0, 6, 319, 6, Q.k); moteado(0, 7, 319, 120, Q.pared4, Q.pared4L, Q.pared4S, 67, 0.09);
  // las dos cajas de luz, con su cable
  cajaLuz(34, 20, 128, 100, 'planta'); cajaLuz(188, 20, 272, 100, 'banos');
  R.rect(80, 101, 81, 112, Q.k); R.rect(230, 101, 231, 112, Q.k);
  // el reloj y la balda con tarros de etiquetas de colores
  R.disco(158, 40, 9, Q.k); R.disco(158, 40, 8, Q.grisL); R.disco(158, 40, 7, Q.blanco); for (let k = 0; k < 12; k++) R.pset(Math.round(158 + Math.cos(k / 12 * 6.28) * 6), Math.round(40 + Math.sin(k / 12 * 6.28) * 6), Q.grisS);
  R.rect(136, 82, 180, 84, Q.robleS); R.rect(136, 82, 180, 82, Q.robleL); for (const [x, c] of [[140, Q.verde], [150, Q.azulT], [160, Q.ocre], [170, Q.terc]]) { caja(x, 70, x + 7, 82, Q.cristalL); R.rect(x + 1, 74, x + 6, 78, c); R.rect(x + 1, 70, x + 6, 71, Q.grisS); }
  // la puerta de cristal de la derecha (por ella pasa alguien)
  caja(280, 48, 314, 124, Q.roble); R.rect(281, 49, 313, 49, Q.robleL); caja(285, 54, 309, 84, Q.cristalD); R.rect(286, 55, 287, 83, Q.cristalL); caja(305, 94, 309, 96, Q.bronce);
  R.rect(0, 112, 319, 113, Q.k);
});
const clasifDelante = (n) => {
  // la mesa larga de roble con sus cajones, y encima las bandejas con los montones que crecen
  madera(0, 124, 319, 131, Q.robleL, Q.oroS, Q.roble, Q.robleS, 4, 69); R.rect(0, 123, 319, 123, Q.k); R.rect(0, 132, 319, 133, Q.k);
  madera(0, 134, 319, 179, Q.roble, Q.robleL, Q.robleS, Q.robleD, 11, 70);
  for (let x = 14; x < 320; x += 62) { caja(x, 140, x + 50, 164, Q.roble); R.rect(x + 1, 141, x + 49, 141, Q.robleL); R.rect(x + 1, 163, x + 49, 163, Q.robleS); caja(x + 19, 150, x + 31, 153, Q.bronce); R.rect(x + 20, 150, x + 30, 150, Q.bronceL); caja(x + 21, 143, x + 29, 147, Q.papel); }
  // las dos bandejas, con su icono en la tarjeta del frente
  for (const [bx, ic, c] of [[46, 'planta', Q.verdeT], [220, 'gota', Q.azulT2]]) {
    caja(bx, 112, bx + 52, 125, Q.nog); R.rect(bx + 1, 113, bx + 51, 113, Q.nogL);
    const m = ic === 'planta' ? n[0] : n[1];
    for (let i = 0; i < m; i++) { const y = 122 - i * 2; caja(bx + 8 + (i % 2), y - 2, bx + 44 + (i % 3), y, Q.papel); R.rect(bx + 10, y - 1, bx + 22 + (i % 4) * 3, y - 1, c); }
    caja(bx + 16, 115, bx + 36, 124, Q.papel);
    if (ic === 'gota') R.icono('gota', bx + 23, 116, c, Q.papelS); else { R.rect(bx + 26, 117, bx + 26, 123, Q.verdeT); R.disco(bx + 23, 119, 2, Q.verdeT); R.disco(bx + 29, 118, 2, Q.verdeT); }
  }
  // el montón del medio, por repartir
  for (let i = 0; i < 4; i++) caja(142 + (i % 2), 120 - i * 2, 168 + (i % 2), 122 - i * 2, Q.papel);
  // el ventilador de la mesa
  caja(296, 112, 310, 124, Q.grisS);
};
const p4 = (t) => {
  clasifFijo();
  // las palabras de cada caja de luz: se encienden en su color (las verdes en «plant», las azules en «bathing»)
  const pal = (x0, ws, col, u, k) => ws.forEach((w, i) => { const x = x0 + 8 + (i % 2) * 22, y = 84 + Math.floor(i / 2) * 0 + (i === 2 ? 0 : 0); const yb = 80 + i * 0; const xx = x0 + 8 + i * 27; const on = tramo(u, i * 0.25, i * 0.25 + 0.25); if (on > 0) { for (let yy = 70; yy <= 92; yy++) for (let q = xx - 2; q <= xx + anchoP(w, 1) + 1; q++) if (yy >= 82 && yy <= 92) tine(q, yy, 0.5 * on, col); } palabra(w, xx, 90, 1, on > 0 ? mez(col, Q.k, 0.3) : Q.tinta); });
  pal(34, VERDES, Q.verdeL, tramo(t, PLANT - 0.1, PLANT + 0.8), 0); pal(188, AZULES, Q.aguaS, tramo(t, BATHING - 0.1, BATHING + 0.8), 1);
  // las agujas del reloj y la sombra que pasa tras el cristal de la puerta
  raya(158, 40, Math.round(158 + Math.cos(t * 0.5 - 1) * 5), Math.round(40 + Math.sin(t * 0.5 - 1) * 5), Q.k, 0); raya(158, 40, 161, 37, Q.k, 0);
  { const sx = Math.round(lerp(270, 330, tramo(t, PLANT + 0.6, BATHING + 0.4))); R.recorte([286, 55, 308, 83]); R.disco(sx, 66, 5, Q.cristalS); R.rect(sx - 7, 72, sx + 7, 90, Q.cristalS); R.recorte(null); }
  // ella reparte: coge una ficha del montón y la lanza a su bandeja (verde a la izquierda, azul a la derecha)
  const T0 = PLANT - 0.25, cic = 0.5, i = Math.floor((t - T0) / cic), f = ((t - T0) % cic) / cic, izq = i % 2 === 0;
  const n = [Math.max(0, Math.min(9, 2 + Math.floor((i + 1) / 2) - (f < 0.8 && izq ? 1 : 0))), Math.max(0, Math.min(9, 1 + Math.floor(i / 2) - (f < 0.8 && !izq ? 1 : 0)))];
  const quieta = t < T0, mira = t > VOCAB - 0.2 && t < VOCAB + 0.5;
  const ella = R.actor(EL.colega, 180, 131, t, { dir: quieta ? -1 : izq ? -1 : 1, sostiene: quieta ? false : f < 0.35 ? [izq ? 168 : 200, 112] : false, dedo: mira, sonrisa: t > BATHING, sorpresa: mira, habla: quieta && Math.sin(t * 8) > 0 });
  clasifDelante(n);
  // el aspa del ventilador gira y la ficha vuela en su arco
  for (let k = 0; k < 3; k++) { const a = t * 18 + k * 2.09; raya(303, 106, Math.round(303 + Math.cos(a) * 6), Math.round(106 + Math.sin(a) * 6), Q.grisL, 0); } R.disco(303, 106, 1, Q.k);
  if (!quieta && f >= 0.35 && f < 0.85) { const u = (f - 0.35) / 0.5, x0 = izq ? 166 : 200, x1 = izq ? 72 : 246; const x = Math.round(lerp(x0, x1, u)), y = Math.round(lerp(112, 116, u) - Math.sin(u * 3.14) * 22); caja(x - 6, y - 3, x + 6, y + 3, Q.papel); R.rect(x - 4, y, x + 3, y, izq ? Q.verdeT : Q.azulT2); }
  if (ella.mano && !quieta && f < 0.35) { const [mx, my] = ella.mano; caja(mx - 6, my - 4, mx + 6, my + 1, Q.papel); R.rect(mx - 4, my - 2, mx + 3, my - 2, izq ? Q.verdeT : Q.azulT2); }
};

// ── plano 5: 1420, el huerto y el baño: dos dialectos ──
const DIALECTS = @19.23@;
const H1 = [7, 22, 13], H2 = [19, 3, 28], H3 = [14, 26];
const huertoFijo = () => fijo('huerto', () => {
  // el cielo tramado
  degr(0, 0, 319, 84, [Q.c1, Q.c2, Q.c3, Q.c4, Q.c5]);
  // la ciudad a lo lejos: murallas y torres (lejos de Atom)
  for (let x = 0; x < 320; x++) { const yb = 70 - Math.round(Math.max(0, Math.sin(x * 0.04)) * 4); for (let y = yb; y < 92; y++) R.pset(x, y, y === yb ? Q.lejosL : (x % 6 === 0 && y % 5 === 0) ? Q.lejosS : Q.lejos); }
  for (const [x, w, h] of [[40, 10, 30], [96, 14, 40], [140, 8, 24], [212, 12, 34], [250, 10, 26]]) { R.rect(x, 92 - h, x + w, 92, Q.lejosS); R.rect(x + 1, 93 - h, x + w - 1, 92, Q.lejos); R.poligono([[x - 1, 92 - h], [x + w / 2, 82 - h], [x + w + 1, 92 - h]], Q.lejosD); R.rect(x + w / 2 - 1, 98 - h, x + w / 2, 101 - h, Q.lejosD); }
  // la pradera y el muro bajo de piedra del fondo
  for (let y = 92; y < 180; y++) for (let x = 0; x < 320; x++) { const n = hh(x >> 1, y >> 1, 76); R.pset(x, y, n < 0.15 ? Q.hierbaS : n > 0.9 ? Q.hierbaL : Q.hierba); }
  for (let x = 0; x < 320; x += 9) { const r = (x >> 3) % 2; caja(x, 98 + r, x + 9, 108, Q.piedra); R.rect(x + 1, 99 + r, x + 8, 99 + r, Q.piedraL); R.rect(x + 1, 107, x + 8, 107, Q.piedraS); }
  for (let x = 4; x < 320; x += 11) caja(x, 104, x + 11, 112, Q.piedra);
  // a la izquierda, el huerto de hierbas: bancales con borde de madera y matas de varias clases
  for (const [x0, y0, x1, y1, k] of [[4, 118, 70, 134, 0], [6, 142, 74, 160, 1], [80, 120, 132, 140, 2]]) {
    caja(x0, y0, x1, y1, Q.nog); for (let y = y0 + 2; y < y1 - 1; y++) for (let x = x0 + 2; x < x1 - 1; x++) R.pset(x, y, (x + y) % 3 ? Q.nogS : Q.nogD);
    for (let x = x0 + 6; x < x1 - 4; x += 8) { const c = [[Q.lav, Q.lavL], [Q.salvia, Q.salviaL], [Q.seto, Q.setoL]][(k + (x >> 3)) % 3]; for (let i = 0; i < 14; i++) { const a = hh(i, x, 77) * 3.14, d = hh(i, x, 78) * 6; R.pset(Math.round(x + Math.cos(a) * d), Math.round(y1 - 4 - Math.sin(a) * d * 1.3), i % 3 ? c[0] : c[1]); } }
  }
  // la colmena de paja
  for (let j = 0; j < 4; j++) { R.rect(140 - (3 - j) * 2, 132 - j * 5, 156 + (3 - j) * 2, 136 - j * 5, j % 2 ? Q.ocre : Q.ocreL); R.rect(140 - (3 - j) * 2, 136 - j * 5, 156 + (3 - j) * 2, 136 - j * 5, Q.ocreS); } R.rect(146, 133, 150, 136, Q.k);
  // a la derecha, el baño: el pilón de piedra con agua, el caño de león y la casita con tejado
  caja(214, 66, 306, 112, Q.entra); for (let y = 70; y < 112; y += 8) R.rect(215, y, 305, y, Q.entraS); R.rect(244, 66, 246, 112, Q.viga); R.rect(274, 66, 276, 112, Q.viga);
  R.poligono([[208, 68], [260, 50], [312, 68]], Q.k); R.poligono([[211, 67], [260, 52], [309, 67]], Q.teja); for (let i = 0; i < 6; i++) R.rect(220 + i * 14, 62 - Math.abs(i - 2.5) * 3, 226 + i * 14, 63 - Math.abs(i - 2.5) * 3, Q.tejaS);
  caja(252, 84, 268, 112, Q.nogD); R.rect(253, 85, 267, 85, Q.nogL);
  caja(200, 116, 316, 150, Q.piedra); R.rect(201, 117, 315, 118, Q.piedraL); caja(206, 122, 310, 146, Q.piedraS); R.rect(200, 150, 316, 152, Q.piedraD);
  caja(300, 96, 314, 112, Q.piedraS); R.disco(307, 104, 4, Q.oroS); R.pset(306, 103, Q.k); R.pset(309, 103, Q.k);
  // el tendedero con un paño
  R.rect(196, 84, 197, 116, Q.nogS);
  // el sendero de losas entre el huerto y el baño, matas de flores, la carretilla, el cesto de hierbas y el cubo
  for (let y = 112; y < 180; y++) { const c = 160 + Math.round((y - 112) * 0.1), w = 8 + Math.round((y - 112) * 0.18); for (let x = c - w; x <= c + w; x++) { const r = Math.floor((y - 112) / 6), o = (r % 2) * 5; R.pset(x, y, ((x + o) % 10 === 0 || (y - 112) % 6 === 0) ? Q.gravaD : hh(x >> 2, r, 99) > 0.6 ? Q.gravaL : Q.grava); } }
  for (let i = 0; i < 26; i++) { const x = Math.round(hh(i, 1, 100) * 316), y = 154 + Math.round(hh(i, 2, 100) * 22); if (Math.abs(x - 162) < 22) continue; const c = [Q.amarL, Q.blanco, Q.lavL, Q.rosa][i % 4]; R.pset(x, y, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y - 1, c); R.pset(x, y - 2, c); R.pset(x, y + 1, Q.hierbaS); R.pset(x, y + 2, Q.hierbaS); }
  for (let i = 0; i < 70; i++) { const x = Math.round(hh(i, 3, 100) * 318), y = 150 + Math.round(hh(i, 4, 100) * 28); if (Math.abs(x - 162) < 24) continue; R.pset(x, y, Q.hierbaD); R.pset(x + 1, y - 1, Q.hierbaS); R.pset(x - 1, y - 2, Q.hierbaL); }
  R.poligono([[18, 164], [62, 164], [56, 174], [24, 174]], Q.k); R.poligono([[20, 165], [60, 165], [55, 173], [25, 173]], Q.nog); R.rect(22, 165, 58, 166, Q.nogL); R.disco(40, 176, 4, Q.k); R.disco(40, 176, 3, Q.nogS); raya(56, 170, 72, 160, Q.nogS, 1); for (let i = 0; i < 8; i++) R.disco(26 + i * 4, 163, 2, i % 2 ? Q.setoL : Q.salvia);
  caja(88, 166, 106, 176, Q.ocreS); for (let x = 89; x < 106; x += 2) R.rect(x, 167, x, 175, Q.ocre); R.rect(88, 162, 106, 165, Q.k); for (let i = 0; i < 6; i++) R.disco(91 + i * 3, 163, 2, i % 2 ? Q.lav : Q.salviaL);
  caja(212, 160, 226, 174, Q.nogS); for (const y of [163, 170]) R.rect(212, y, 226, y, Q.aceroS); R.rect(213, 161, 225, 162, Q.aguaS); R.rect(214, 161, 218, 161, Q.aguaL);
});
const p5 = (t) => {
  huertoFijo();
  R.recorte([0, 0, 319, 70]); nubes(t, 6, 50, 7); R.recorte(null);
  // el agua del pilón con sus ondas, el vapor y el chorro del caño
  for (let y = 124; y < 145; y++) for (let x = 208; x < 309; x++) R.pset(x, y, ((x + Math.round(Math.sin(y * 0.8 + t * 3) * 2)) % 9 === 0) ? Q.aguaL : y < 128 ? Q.agua : Q.aguaS);
  for (let y = 108; y < 126; y++) { const x = Math.round(305 - (y - 108) * 0.3 + Math.sin(t * 20 + y) * 0.6); R.pset(x, y, Q.aguaL); R.pset(x + 1, y, Q.agua); }
  for (let i = 0; i < 8; i++) { const u = (t * 0.35 + i / 8) % 1, x = Math.round(220 + i * 11 + Math.sin(u * 6 + i) * 3), y = Math.round(122 - u * 28); tine(x, y, 0.45 * (1 - u), Q.blanco); tine(x + 1, y, 0.3 * (1 - u), Q.blanco); }
  // el paño tendido que ondea
  for (let i = 0; i < 14; i++) { const y = 86 + Math.round(Math.sin(t * 4 + i * 0.5) * 1); R.rect(198 + i, y, 198 + i, y + 12, i % 4 ? Q.blanco : Q.blancoS); }
  // las abejas de la colmena
  for (let i = 0; i < 4; i++) { const a = t * 3 + i * 1.6, x = Math.round(150 + Math.cos(a) * (8 + i * 3)), y = Math.round(118 + Math.sin(a * 1.3) * 5); R.pset(x, y, Q.amar); R.pset(x + 1, y, Q.k); }
  // la rana salta al agua
  const sr = tramo(t, DIALECTS + 1.0, DIALECTS + 1.6);
  if (sr < 1) { const x = Math.round(lerp(196, 232, sr)), y = Math.round(lerp(158, 132, sr) - Math.sin(sr * 3.14) * 16); R.rect(x - 3, y - 3, x + 3, y, Q.verdeS); R.rect(x - 2, y - 4, x + 2, y - 1, Q.verdeL); R.pset(x - 2, y - 5, Q.k); R.pset(x + 2, y - 5, Q.k); }
  else if (sr >= 1 && t < DIALECTS + 2.1) { const r = Math.round((t - DIALECTS - 1.6) * 20); elipse(232, 134, r, Math.round(r / 3), 1, Q.aguaL); }
  // el muro bajito entre los dos
  // los dos hablan: él (verde) y ella (azul); se entienden a medias y se sonríen
  const b1 = tramo(t, P5 + 0.15, P5 + 0.3), b2 = tramo(t, P5 + 0.7, P5 + 0.85), b3 = tramo(t, DIALECTS + 0.5, DIALECTS + 0.65), fuera = tramo(t, DIALECTS + 1.7, DIALECTS + 1.9);
  const hab1 = (t > P5 && t < P5 + 0.6) || (t > DIALECTS + 0.45 && t < DIALECTS + 1.1), hab2 = t > P5 + 0.6 && t < DIALECTS + 0.4;
  const ok = t > DIALECTS + 1.7;
  R.actor(EL.monje, 128, 162, t, { dir: 1, habla: hab1 && Math.sin(t * 9) > 0, sorpresa: t > DIALECTS + 0.1 && t < DIALECTS + 0.45, sonrisa: ok, dedo: t > DIALECTS + 0.5 && t < DIALECTS + 1.1 });
  R.actor(EL.criada, 178, 162, t, { dir: -1, habla: hab2 && Math.sin(t * 9) > 0, sorpresa: t > DIALECTS + 0.6 && t < DIALECTS + 1.2, sonrisa: ok });
  // el poste bajo de piedra entre los dos
  caja(160, 146, 170, 164, Q.piedra); R.rect(161, 147, 169, 147, Q.piedraL); R.rect(168, 148, 169, 163, Q.piedraS);
  const quita1 = 1 - tramo(t, DIALECTS + 0.4, DIALECTS + 0.5);
  if (b1 * quita1 > 0) bocadilloG(112, 112, H1, Q.verdeT, 136, 138, b1 * quita1, 2);
  if (b2 * (1 - fuera) > 0) bocadilloG(204, 104, H2, Q.azulT2, 186, 138, b2 * (1 - fuera), 2);
  if (b3 * (1 - fuera) > 0) bocadilloG(112, 112, H3, Q.verdeT, 136, 138, b3 * (1 - fuera), 2);
  if (t > DIALECTS + 0.1 && t < DIALECTS + 1.0) { globo(186, 128, '?'); }
  if (ok && t < DIALECTS + 2.6 && Math.sin(t * 8) > -0.2) { globo(136, 130, '!'); globo(186, 130, '!'); }
};

const año = (t) => t < P5 ? 2026 : 1420;
const efectos = [[CLIC, 'interruptor'], [CLIC + 0.5, 'tic'], [DOS, 'lapiz'], [TRES, 'lapiz'], [ONE, 'pop'], [ANOTHER, 'pop'], [SOMETHING + 0.7, 'papel'], [NOLANG + 0.2, 'golpecito'], [CERTAIN + 1.2, 'lapiz'], [OTHERS + 0.55, 'lapiz'], [PLANT - 0.1, 'papel'], [BATHING - 0.1, 'papel'], [P5 + 0.15, 'aldea'], [DIALECTS + 1.6, 'chof']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
'''))

# ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['vm-teorias'] = ('Las teorías', '''// VM-TEORIAS (frase 19): las tres teorías. Cinco planos:
// 1. el archivo de noche: la investigadora entra con tres carpetas y las pone de pie en el atril de la mesa en «three»,
//    «big» y «theories» (candado azul, pueblo verde, máscara roja); en «first» señala la del candado, que brilla;
// 2. «it's a code»: inserto cenital: la carpeta azul abierta; los renglones de un idioma conocido (rayas grises) se
//    encienden en «known language»; la mano gira la rueda de cifrar y cada renglón pasa a signos inventados en la hoja
//    de al lado («written in invented letters»); en «hide it» cae el candado y se cierra;
// 3. «a lost language» (1420): un pueblo de montaña al amanecer; dos vecinas hablan con su propio alfabeto y el niño
//    pinta sus signos en el muro; en «no other text left behind» la niebla se traga el pueblo, los signos del muro y a
//    la gente, y solo queda el libro sobre la piedra;
// 4. «And the third»: el carro de comedias en la plaza al anochecer; se abre el telón; el cómico, con la careta en un
//    palo, se la gira a la mueca en «most uncomfortable»; abre la boca y el bocadillo está vacío: en «nothing» revienta;
//    «?» del público;
// 5. «gibberish made to look like a learned book»: el taller del alquimista: el copista garabatea deprisa (los signos
//    saltan de la página), espolvorea oro y el libro brilla en «learned book»; entra el cortesano y en «sell» le da el
//    libro; en «money» cae la bolsa de monedas en la mesa; el cortesano se va contento con el libro.''', marcas('vm-teorias', COMUN + COMUN7 + r'''
const P2 = @3.70@, P3 = @7.73@, P4 = @13.38@, P5 = @17.18@;
const THREE = @1.62@, BIG = @1.82@, THEORIES = @2.04@, FIRST = @3.14@;

// ── plano 1: el archivo de noche ──
const archivoFijo = () => fijo('archivo', () => {
  // el techo de vigas oscuras (tranquilo bajo el año)
  for (let y = 0; y < 16; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y % 8 === 7 ? Q.salaD : (x + y * 3) % 11 === 0 ? Q.salaD : Q.salaS);
  R.rect(0, 16, 319, 17, Q.k);
  // la pared del fondo
  moteado(0, 18, 319, 122, Q.sala, Q.salaL, Q.salaS, 68, 0.1);
  // la ventana alta de arco con la noche (la lluvia va en cada fotograma)
  caja(14, 24, 72, 102, Q.listoD); R.disco(43, 40, 26, Q.listoD);
  for (let y = 18; y < 100; y++) for (let x = 18; x < 69; x++) { const d = Math.hypot(x - 43, y - 40); if (y >= 40 || d < 23) R.pset(x, y, y < 60 ? Q.noche2 : y < 80 ? Q.noche3 : Q.noche); }
  R.disco(56, 34, 5, Q.ventL); R.disco(58, 32, 4, Q.noche2);
  for (let x = 18; x < 69; x++) { const yb = 82 - Math.round(Math.abs(Math.sin(x * 0.3)) * 8 + (x % 9 < 3 ? 6 : 0)); for (let y = yb; y < 100; y++) R.pset(x, y, Q.noche); if (x % 4 === 1) R.pset(x, yb + 4, Q.ventL); }
  R.rect(42, 18, 44, 100, Q.listoD); R.rect(18, 62, 68, 63, Q.listoD); R.rect(12, 100, 74, 104, Q.listo); R.rect(12, 100, 74, 100, Q.listoL);
  caja(16, 106, 70, 120, Q.grisS); for (let x = 19; x < 69; x += 4) R.rect(x, 108, x + 1, 118, Q.gris);
  // las estanterías del archivo: cuatro cuerpos de metal con cajas de archivo y pasillos oscuros entre ellos
  for (let c = 0; c < 4; c++) { const x0 = 86 + c * 47, x1 = x0 + 42;
    caja(x0, 20, x1, 122, Q.aceroS); R.rect(x0 + 1, 21, x0 + 1, 121, Q.aceroL);
    for (let sv = 0; sv < 5; sv++) { const y = 24 + sv * 20; R.rect(x0 + 2, y + 17, x1 - 2, y + 18, Q.acero); R.rect(x0 + 2, y + 19, x1 - 2, y + 19, Q.aceroD);
      let x = x0 + 3; while (x < x1 - 6) { const w = 8 + Math.floor(hh(x, sv, 79) * 4), c2 = [Q.papelS, Q.ocreS, hex('#8a7a62'), Q.azulTS][Math.floor(hh(x, sv, 80) * 4)]; caja(x, y + 4, x + w, y + 17, c2); R.rect(x + 1, y + 5, x + w - 1, y + 5, mez(c2, Q.blanco, 0.3)); R.rect(x + 3, y + 8, x + w - 3, y + 11, Q.papel); R.rect(x + 3, y + 8, x + 3, y + 11, [Q.rojo, Q.verdeL, Q.amar, Q.aguaS][Math.floor(hh(x, sv, 81) * 4)]); R.disco(x + (w >> 1), y + 14, 1, Q.k); x += w + 1; } } }
  // la columna de la derecha (tranquila bajo Atom) con el extintor y el interruptor
  moteado(276, 18, 319, 122, Q.salaS, Q.sala, Q.salaD, 82, 0.08); R.rect(276, 18, 276, 122, Q.k);
  caja(296, 98, 304, 118, Q.rojo); R.rect(297, 99, 298, 117, Q.rojoL); caja(298, 94, 302, 98, Q.k); caja(284, 70, 290, 78, Q.papelS); R.rect(286, 72, 288, 76, Q.grisS);
  // el suelo de losetas
  for (let y = 122; y < 180; y++) for (let x = 0; x < 320; x++) { const a = Math.floor(x / 16), b = Math.floor((y - 122) / 10); R.pset(x, y, (x % 16 === 0 || (y - 122) % 10 === 0) ? Q.salaD : (a + b) % 2 ? Q.salaL : Q.sala); }
  // el carrito de libros de la derecha y el paragüero con un paraguas mojado a la izquierda
  caja(20, 148, 34, 170, Q.aceroS); R.rect(21, 149, 22, 169, Q.aceroL); raya(28, 148, 34, 128, Q.k, 1); R.poligono([[30, 132], [36, 124], [40, 134]], Q.terc); R.rect(26, 170, 34, 171, Q.aguaS); R.rect(18, 172, 38, 172, Q.aguaS);
});
const archivoDelante = (t) => {
  // la mesa de roble con su tapete verde, la lámpara de banquero y la pila de libros
  R.rect(56, 127, 266, 128, Q.k); tapete(58, 128, 264, 133); R.rect(56, 134, 266, 136, Q.robleS);
  madera(58, 137, 264, 179, Q.roble, Q.robleL, Q.robleS, Q.robleD, 9, 83); R.rect(56, 137, 57, 179, Q.k); R.rect(265, 137, 266, 179, Q.k);
  for (const x of [80, 152, 224]) { caja(x, 144, x + 40, 168, Q.roble); R.rect(x + 1, 145, x + 39, 145, Q.robleL); caja(x + 15, 154, x + 25, 157, Q.bronce); }
  R.rect(84, 104, 85, 128, Q.bronce); caja(76, 126, 94, 128, Q.bronceS); R.poligono([[70, 104], [74, 96], [96, 96], [100, 104]], Q.k); R.poligono([[72, 103], [75, 97], [95, 97], [98, 103]], Q.lampV); R.rect(75, 97, 95, 98, Q.lampVL);
  for (let y = 105; y < 128; y++) for (let x = 64; x < 108; x++) if ((x + y) & 1 && Math.abs(x - 85) < (y - 102) * 0.9) tine(x, y, 0.3, Q.luz);
  for (const [y, c, w] of [[126, Q.terc, 26], [120, Q.verde, 22], [115, Q.azulTS, 24]]) { caja(232, y - 5, 232 + w, y, c); R.rect(233, y - 4, 231 + w, y - 4, mez(c, Q.blanco, 0.3)); R.rect(236, y - 4, 237, y - 1, Q.oro); }
  // el carrito de libros de la derecha (por detrás pasa ella al entrar)
  caja(272, 128, 316, 132, Q.aceroS); caja(272, 150, 316, 154, Q.aceroS); R.rect(274, 132, 275, 166, Q.k); R.rect(313, 132, 314, 166, Q.k); R.disco(276, 170, 3, Q.k); R.disco(312, 170, 3, Q.k);
  let bx = 274; for (let i = 0; bx < 312; i++) { const w = 3 + (i * 7) % 4, h = 12 + (i * 5) % 7, c = [Q.terc, Q.verde, Q.azulTS, Q.ocreS, Q.damasco][i % 5]; caja(bx, 128 - h, bx + w, 128, c); R.rect(bx + 1, 130 - h, bx + 1, 126, mez(c, Q.blanco, 0.3)); bx += w + 1; }
  for (let i = 0; i < 5; i++) { caja(276 + i * 7, 140, 282 + i * 7, 150, [Q.papelS, Q.ocreS][i % 2]); }
  // el atril de las carpetas
  caja(116, 124, 210, 128, Q.robleD); R.rect(117, 125, 209, 125, Q.robleL);
};
const CARP = [[122, Q.azulC, Q.azulCL, Q.azulCS, 'candado'], [152, Q.verdeC, Q.verdeCL, Q.verdeCS, 'pueblo'], [182, Q.rojoC, Q.rojoCL, Q.rojoCS, 'mascara']];
const p1 = (t) => {
  archivoFijo();
  // la lluvia en la ventana y la luna entre nubes
  R.recorte([18, 18, 68, 99]); for (let i = 0; i < 24; i++) { const x = 18 + Math.round(hh(i, 1, 84) * 50), y = Math.round((hh(i, 2, 84) * 90 + t * 120) % 90) + 14; R.linea ? R.linea(x, y, x - 1, y + 4, Q.noche3) : raya(x, y, x - 1, y + 4, Q.c2, 0); }
  R.recorte(null);
  // la linterna del vigilante barre los pasillos entre estanterías
  const lx = (t * 70) % 420 - 50;
  for (const gx of [129, 176, 223]) { const d = Math.abs(gx - lx); if (d < 40) for (let y = 22; y < 122; y++) for (let x = gx; x < gx + 4; x++) tine(x, y, 0.5 * (1 - d / 40) * (0.6 + 0.4 * Math.sin(y * 0.2)), Q.ventL); }
  // ella entra con las carpetas y las pone en el atril: «three», «big», «theories»
  const PON = [THREE, BIG, THEORIES], ent = tramo(t, 0.15, 1.2), x = Math.round(lerp(300, 214, ease(ent)));
  const pon = PON.findIndex((s) => t > s - 0.35 && t < s + 0.05), apunta = t > FIRST - 0.25;
  const ella = R.actor(EL.colega, x, 133, t, { dir: -1, anda: ent > 0 && ent < 1, sostiene: pon >= 0 ? [CARP[pon][0] + 30, 112] : t < THREE - 0.35 ? true : false, dedo: apunta, sonrisa: t > THEORIES && !apunta, sorpresa: apunta && t < FIRST + 0.3, habla: t > THEORIES + 0.3 && t < FIRST - 0.3 && Math.sin(t * 9) > 0 });
  archivoDelante(t);
  // las carpetas que lleva y las que ya están en el atril
  const n = PON.filter((s) => t >= s).length;
  if (t < THREE - 0.35 && ella.mano) { const [mx, my] = ella.mano; for (let k = 2; k >= 0; k--) { caja(mx - 10 + k, my - 8 - k * 2, mx + 6 + k, my - 4 - k * 2, CARP[k][1]); } }
  CARP.forEach(([cx, c, cL, cS, sim], k) => { if (k < n) { const sube = ease(tramo(t, PON[k], PON[k] + 0.15)); carpeta(cx, Math.round(90 + (1 - sube) * 6), c, cL, cS, sim, k === 0 && t > FIRST ? t : 0); } });
  // la polilla que ronda la lámpara
  { const a = t * 5, mx = Math.round(85 + Math.cos(a) * 9), my = Math.round(92 + Math.sin(a * 1.7) * 4); R.pset(mx, my, Q.papelS); R.pset(mx + (Math.sin(t * 30) > 0 ? 1 : -1), my - 1, Q.blancoS); }
};

// ── plano 2: la carpeta del candado ──
const KNOWN = @4.58@, WRITTEN = @5.22@, LETTERS = @6.26@, HIDE = @6.86@;
const candadoFijo = () => fijo('candado', () => {
  // la mesa de nogal con un lápiz y clips en los márgenes
  madera(0, 0, 319, 179, Q.nog, Q.nogL, Q.nogS, Q.nogD, 12, 85);
  R.rect(2, 60, 3, 120, Q.amar); R.rect(2, 120, 3, 124, Q.k); R.rect(312, 130, 318, 136, Q.aceroL); R.rect(313, 131, 317, 135, Q.nog);
  for (let x = 40; x < 120; x++) R.pset(x, 176, Q.k); R.rect(40, 175, 118, 177, Q.k); R.rect(41, 176, 117, 176, Q.terc); R.rect(118, 175, 124, 177, Q.oro);
  // la carpeta azul abierta con su lomo
  caja(22, 10, 298, 172, Q.azulC); R.rect(23, 11, 297, 12, Q.azulCL); R.rect(158, 11, 162, 171, Q.azulCS); R.rect(160, 11, 160, 171, Q.azulCD);
  for (let i = 0; i < 40; i++) R.pset(24 + Math.round(hh(i, 1, 86) * 270), 12 + Math.round(hh(i, 2, 86) * 158), Q.azulCS);
  // la hoja del idioma conocido (rayas grises: palabras sin letras) y la hoja de pergamino de al lado
  caja(32, 20, 152, 164, Q.papel); R.rect(33, 163, 151, 163, Q.papelS); R.rect(33, 21, 151, 21, Q.blanco);
  pergamino(168, 20, 288, 164, 87);
  // la rueda de cifrar (su anillo fijo)
  R.disco(160, 144, 21, Q.k); R.disco(160, 144, 20, Q.perg); for (let k = 0; k < 24; k++) { const a = k / 24 * 6.28; R.pset(Math.round(160 + Math.cos(a) * 18), Math.round(144 + Math.sin(a) * 18), Q.tinta); R.pset(Math.round(160 + Math.cos(a) * 17), Math.round(144 + Math.sin(a) * 17), Q.tintaL); }
});
const RENG = (k) => { const out = []; let x = 38; for (let p = 0; p < 12; p++) { const w = 6 + Math.floor(hh(k, p, 88) * 12); if (x + w > 146) break; out.push([x, w]); x += w + 4; } return out; };
const RG = [0, 1, 2, 3, 4].map(RENG), YR = (k) => 42 + k * 20;
const p2 = (t) => {
  candadoFijo();
  // los renglones conocidos: se encienden uno tras otro en «known language»
  for (let k = 0; k < 5; k++) { const on = tramo(t, KNOWN - 0.2 + k * 0.08, KNOWN + k * 0.08), mezcla = tramo(t, HIDE + 0.2, HIDE + 0.7);
    for (const [x, w] of RG[k]) { if (on > 0 && mezcla < 1) for (let y = YR(k) - 6; y <= YR(k) + 1; y++) for (let q = x - 1; q <= x + Math.round(w * on); q++) tine(q, y, 0.55, Q.marca);
      for (let q = x; q < x + w; q++) { const yy = YR(k) - 2 + (mezcla > 0 && hh(q, k, 89) < mezcla ? Math.round(hh(q, k, 90) * 6 - 3) : 0); R.pset(q, yy, Q.grisS); R.pset(q, yy - 1, (q + k) % 3 ? Q.negro : Q.grisS); if ((q - x) % 5 === 2) R.pset(q, yy - 3, Q.negro); } } }
  // la rueda interior gira con la mano; cada renglón pasa a signos en la hoja de al lado
  const gira = ease(tramo(t, KNOWN - 0.3, LETTERS + 0.3));
  R.disco(160, 144, 13, Q.k); R.disco(160, 144, 12, Q.bronceL); for (let k = 0; k < 16; k++) { const a = k / 16 * 6.28 + gira * 9; const X = Math.round(160 + Math.cos(a) * 9), Y = Math.round(144 + Math.sin(a) * 9); R.pset(X, Y, Q.tinta); R.pset(X + 1, Y, k % 2 ? Q.tinta : Q.bronceS); }
  R.disco(160, 144, 3, Q.bronceS); R.pset(159, 143, Q.oroL);
  const pts = []; for (let k = 0; k < 5; k++) { const tk = WRITTEN - 0.1 + k * 0.24, u = tramo(t, tk, tk + 0.3);
    if (u > 0) { const arr = []; renglon(176, YR(k) + 1, 282, 30 + k, Q.tinta, 1, arr); const m = Math.floor(arr.length * u); for (let i = 0; i < m; i++) glifo(arr[i].id, arr[i].x, arr[i].y, 1, Q.tinta); }
    // la chispa que salta de una hoja a la otra
    const c = tramo(t, tk - 0.25, tk); if (c > 0 && c < 1) { const x = Math.round(lerp(148, 176, c)), y = Math.round(YR(k) - 3 - Math.sin(c * 3.14) * 8); destello(x, y, 2, Q.oroL); } }
  // la mano gira la rueda y se va antes del candado
  const sale = ease(tramo(t, LETTERS + 0.3, HIDE - 0.1)), ent = ease(tramo(t, P2, KNOWN - 0.3));
  if (sale < 1) { const a = 0.6 + Math.sin(gira * 18) * 0.35, hx = Math.round(160 + Math.cos(a) * 18 + (1 - ent) * 60 + sale * 70), hy = Math.round(144 + Math.sin(a) * 18 + (1 - ent) * 40 + sale * 40); T.brazo(R, hx + 40, hy + 46, hx, hy, '#c87a3a', -1, { codo: [hx + 26, hy + 26] }); }
  // en «hide it» cae el candado y se cierra con su clic
  const cae = tramo(t, HIDE - 0.15, HIDE + 0.1), cierra = tramo(t, HIDE + 0.15, HIDE + 0.3);
  if (cae > 0) { const y = Math.round(lerp(-30, 84, ease(cae)) - (cae >= 1 ? Math.max(0, Math.sin((t - HIDE - 0.1) * 20) * 3 * (1 - tramo(t, HIDE + 0.1, HIDE + 0.5))) : 0));
    for (let yy = y + 30; yy < y + 34; yy++) for (let x = 140; x < 182; x++) if ((x + yy) & 1) tine(x, yy, 0.3, Q.k);
    const sh = Math.round(8 * (1 - cierra));
    for (const w of [4, 3]) { raya(150, y + 6 - sh, 150, y - 6 - sh, w === 4 ? Q.k : Q.aceroL, w === 4 ? 2 : 1); raya(170, y + 6, 170, y - 6, w === 4 ? Q.k : Q.aceroL, w === 4 ? 2 : 1); }
    for (let a = 0; a <= 20; a++) { const an = Math.PI + a / 20 * Math.PI, X = Math.round(160 + Math.cos(an) * 10), Y = Math.round(y - 6 - sh + Math.sin(an) * 10); R.disco(X, Y, 2, Q.k); R.disco(X, Y, 1, Q.aceroL); }
    caja(144, y, 176, y + 28, Q.oro); R.rect(145, y + 1, 175, y + 2, Q.oroL); R.rect(145, y + 1, 146, y + 27, Q.oroL); R.rect(173, y + 3, 175, y + 27, Q.oroS); R.disco(160, y + 12, 3, Q.k); R.rect(159, y + 14, 161, y + 21, Q.k);
    if (cierra >= 1 && t < HIDE + 0.7) destello(178, y - 2, 4); }
};

// ── plano 3: 1420, el pueblo de montaña que se pierde en la niebla ──
const LOST = @8.59@, ALPHABET = @10.41@, NOOTHER = @11.21@, BEHIND = @12.29@;
const RUNA = ['#...#', '.#.#.', '..#..', '..#..'], RUNA2 = ['###', '#.#', '..#', '.#.'], RUNA3 = ['#.#.', '####', '..#.', '..#.'], RUNAS = [RUNA, RUNA2, RUNA3];
const runa = (k, x, y, s, c) => { const g = RUNAS[k % 3]; for (let j = 0; j < g.length; j++) for (let i = 0; i < g[j].length; i++) if (g[j][i] === '#') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); };
const puebloFijo = () => fijo('pueblo', () => {
  // el cielo del amanecer, tramado
  degr(0, 0, 319, 70, [Q.alba1, Q.alba2, Q.alba3, Q.alba4, Q.alba5]);
  // tres términos de montañas (con nieve en las lejanas)
  for (let x = 0; x < 320; x++) { const y1 = Math.round(52 + Math.sin(x * 0.03) * 10 + Math.sin(x * 0.11) * 4), y2 = Math.round(72 + Math.sin(x * 0.045 + 2) * 8 + Math.sin(x * 0.13) * 3), y3 = Math.round(96 + Math.sin(x * 0.02 + 1) * 6);
    for (let y = y1; y < 180; y++) R.pset(x, y, y < y1 + 4 ? Q.nieve : (x + y) % 5 === 0 ? Q.monteL : Q.monte);
    for (let y = y2; y < 180; y++) R.pset(x, y, (x + y) % 4 === 0 ? Q.monte : Q.monteS);
    for (let y = y3; y < 180; y++) { const n = hh(x >> 1, y >> 1, 91); R.pset(x, y, n < 0.15 ? Q.hierbaS : n > 0.9 ? Q.hierbaL : Q.hierba); } }
  // el pueblo en la ladera: casas de piedra con tejados y una torre
  for (const [x, y, w, h, c] of [[150, 92, 18, 12, Q.piedra], [172, 88, 16, 14, Q.entra], [194, 92, 20, 12, Q.piedra], [218, 86, 16, 16, Q.piedraL], [238, 92, 18, 12, Q.entra], [160, 104, 16, 10, Q.entra], [204, 104, 18, 10, Q.piedra]]) {
    caja(x, y, x + w, y + h, c); for (let yy = y + 3; yy < y + h; yy += 3) R.rect(x + 1, yy, x + w - 1, yy, mez(c, Q.k, 0.15)); R.poligono([[x - 2, y + 1], [x + w / 2, y - 7], [x + w + 2, y + 1]], Q.k); R.poligono([[x - 1, y], [x + w / 2, y - 6], [x + w + 1, y]], Q.teja); caja(x + 3, y + h - 6, x + 6, y + h, Q.nogD); R.rect(x + w - 6, y + 3, x + w - 4, y + 5, Q.ventS); }
  caja(258, 72, 268, 104, Q.piedra); R.poligono([[256, 72], [263, 60], [270, 72]], Q.tejaS); R.rect(262, 78, 263, 82, Q.k);
  // el camino que sube al pueblo y el muro de piedra seca
  for (let y = 104; y < 180; y++) { const c = Math.round(120 + (y - 104) * 0.9 + Math.sin(y * 0.1) * 6), w = Math.round(3 + (y - 104) * 0.25); for (let x = c - w; x <= c + w; x++) R.pset(x, y, (x + y) % 5 === 0 ? Q.gravaS : Q.grava); }
  for (let x = 170; x < 320; x += 10) { const r = (x / 10) % 2; caja(x, 136 + r, x + 10, 146, Q.piedra); R.rect(x + 1, 137 + r, x + 9, 137 + r, Q.piedraL); }
  // la piedra grande de delante, donde queda el libro
  R.poligono([[236, 180], [242, 156], [262, 148], [290, 150], [306, 162], [312, 180]], Q.k); R.poligono([[238, 179], [243, 157], [262, 150], [289, 152], [304, 163], [310, 179]], Q.piedraS); R.poligono([[246, 158], [262, 152], [286, 154], [270, 160]], Q.piedra);
  // el árbol de la izquierda (tronco)
  R.rect(22, 104, 27, 160, Q.nogS); R.rect(23, 104, 24, 160, Q.nog);
  // flores en la hierba
  for (let i = 0; i < 40; i++) R.pset(Math.round(hh(i, 1, 92) * 320), 150 + Math.round(hh(i, 2, 92) * 28), [Q.amarL, Q.blanco, Q.lavL][i % 3]);
});
const p3 = (t) => {
  puebloFijo();
  R.recorte([0, 0, 319, 60]); nubes(t, 4, 36, 9); R.recorte(null);
  // el humo de las chimeneas
  for (const [cx, cy] of [[160, 82], [226, 76], [246, 84]]) for (let i = 0; i < 5; i++) { const u = (t * 0.4 + i / 5) % 1; tine(cx + Math.round(Math.sin(u * 5 + cx) * 3 + u * 6), cy - Math.round(u * 22), 0.5 * (1 - u), Q.blanco); }
  // la copa del árbol que se mece
  for (let i = 0; i < 6; i++) { const x = Math.round(24 + Math.cos(i) * 12 + Math.sin(t * 1.5 + i) * 1.5), y = Math.round(96 + Math.sin(i * 2) * 8); R.disco(x, y, 10, Q.setoS); R.disco(x - 1, y - 1, 9, Q.seto); R.disco(x - 3, y - 3, 4, Q.setoL); }
  // el niño pinta los signos de su alfabeto en el muro (desde «own alphabet»)
  const pinta = tramo(t, ALPHABET - 0.6, ALPHABET + 0.6), niebla = ease(tramo(t, NOOTHER - 0.4, BEHIND + 0.2));
  for (let k = 0; k < 3; k++) if (pinta > k / 3) runa(k, 186 + k * 14, 125, 2, Q.blanco);
  // las dos vecinas hablan con su alfabeto; la oveja pasta; luego se van hacia el pueblo
  const vanse = ease(tramo(t, NOOTHER - 0.3, BEHIND + 0.4));
  const xa = Math.round(lerp(70, 128, vanse)), xb = Math.round(lerp(100, 140, vanse)), sa = Math.round(lerp(158, 132, vanse)), sb = Math.round(lerp(160, 126, vanse));
  R.actor(EL.chicaPueblo, xa, sa, t, { dir: vanse > 0 ? 1 : 1, anda: vanse > 0 && vanse < 1, habla: t < LOST + 0.9 && Math.sin(t * 9) > 0, sonrisa: t > LOST + 0.9 && t < NOOTHER });
  R.actor(EL.pastora, xb, sb, t, { dir: vanse > 0 ? 1 : -1, anda: vanse > 0 && vanse < 1, habla: t > LOST + 0.9 && t < ALPHABET && Math.sin(t * 9) > 0, sonrisa: t < LOST + 0.9 });
  R.actor(EL.chicoPueblo, Math.round(lerp(182, 150, vanse)), Math.round(lerp(150, 124, vanse)), t, { dir: vanse > 0 ? -1 : 1, anda: vanse > 0 && vanse < 1, sostiene: pinta > 0 && pinta < 1 ? [186 + pinta * 40, 128] : false, sonrisa: pinta >= 1 && vanse <= 0 });
  { const ox = Math.round(lerp(40, 112, vanse) + Math.sin(t * 0.7) * 3), oy = Math.round(lerp(166, 136, vanse)); R.disco(ox, oy - 5, 5, Q.k); R.disco(ox, oy - 5, 4, Q.blanco); R.disco(ox - 1, oy - 6, 2, Q.blancoS); R.rect(ox + 3, oy - 8, ox + 7, oy - 4, Q.negro); R.rect(ox - 3, oy - 1, ox - 3, oy + 1, Q.k); R.rect(ox + 2, oy - 1, ox + 2, oy + 1, Q.k); }
  // los bocadillos con su alfabeto propio
  const bo = (cx, cy, k, u, hx, hy) => { if (u <= 0) return; const W = Math.round(30 * u), H = Math.round(14 * u); raya(cx, cy, hx, hy, Q.k, 1); R.rect(cx - W / 2, cy - H / 2, cx + W / 2, cy + H / 2, Q.k); R.rect(cx - W / 2 + 1, cy - H / 2 + 1, cx + W / 2 - 1, cy + H / 2 - 1, Q.blanco); if (u >= 1) for (let i = 0; i < 3; i++) runa(k + i, cx - 12 + i * 9, cy - 4, 1, Q.sepia); };
  if (vanse <= 0) { bo(84, 112, 0, tramo(t, P3 + 0.1, P3 + 0.25) * (1 - tramo(t, LOST + 0.8, LOST + 0.9)), 78, 132); bo(112, 104, 1, tramo(t, LOST + 0.9, LOST + 1.05) * (1 - tramo(t, ALPHABET - 0.2, ALPHABET - 0.1)), 108, 134); }
  // la niebla se traga el pueblo, la gente y los signos del muro (el libro queda)
  const tf = Math.min(t, BEHIND + 0.3);   // la niebla se asienta al final (y el corte queda limpio)
  if (niebla > 0) for (let y = 40; y < 172; y++) { const dy = 1 - Math.abs(y - 112) / 72; for (let x = 0; x < 320; x++) { if (x > 238 && y > 118) continue; const n = hh(x >> 2, (y >> 2) + Math.floor(tf * 2), 93), v = niebla * (0.45 + 0.4 * dy) - n * 0.3 + Math.sin(x * 0.05 + tf * 0.8 + y * 0.02) * 0.08; if (v > 0.62) R.pset(x, y, Q.nieblaL); else if (v > 0.45) { if ((x + y) & 1) R.pset(x, y, Q.niebla); } else if (v > 0.3 && (x + 2 * y) % 4 === 0) R.pset(x, y, Q.niebla); } }
  // el libro sobre la piedra, que brilla cuando todo se ha ido
  const brilla = t > BEHIND;
  T.PIEZAS_VM.libroVoynich(R, 276, 158, { abierto: true, pagina: 'estrellas', s: 2, brilla, t });
  if (brilla && Math.sin(t * 8) > 0) { destello(300, 122, 3); destello(256, 130, 2); }
};

// ── plano 4: 1420, el carro de comedias en la plaza ──
const THIRD = @13.64@, UNCOMF = @14.42@, SAYS = @15.94@, NOTHING = @16.12@, ALL = @16.72@;
const carroFijo = () => fijo('carro', () => {
  // el cielo del anochecer tramado, con las primeras estrellas
  degr(0, 0, 319, 76, [Q.ocaso1, Q.ocaso2, Q.ocaso3, Q.ocaso4, Q.ocaso5]);
  for (let i = 0; i < 18; i++) R.pset(Math.round(hh(i, 1, 94) * 260), Math.round(hh(i, 2, 94) * 30) + 16, Q.amarL);
  // las casas de entramado a los dos lados de la plaza
  for (const [x0, x1, top] of [[0, 64, 30], [64, 104, 44], [214, 258, 40], [258, 320, 52]]) {
    R.poligono([[x0 - 2, top + 10], [(x0 + x1) / 2, top - 6], [x1 + 2, top + 10]], Q.k); R.poligono([[x0, top + 9], [(x0 + x1) / 2, top - 4], [x1, top + 9]], Q.tejaS);
    caja(x0, top + 9, x1, 130, Q.entra); for (let x = x0 + 8; x < x1; x += 12) R.rect(x, top + 10, x + 1, 129, Q.viga); for (let y = top + 24; y < 130; y += 22) R.rect(x0 + 1, y, x1 - 1, y + 1, Q.viga);
    for (let x = x0 + 4; x < x1 - 8; x += 24) for (let y = top + 28; y < 116; y += 22) { caja(x + 6, y - 14, x + 14, y - 4, Q.viga); R.rect(x + 7, y - 13, x + 13, y - 5, Q.ventL); R.rect(x + 10, y - 13, x + 10, y - 5, Q.viga); } }
  // la plaza empedrada
  for (let y = 130; y < 180; y++) for (let x = 0; x < 320; x++) { const r = Math.floor((y - 130) / 5), o = (r % 2) * 4; R.pset(x, y, ((x + o) % 8 === 0 || (y - 130) % 5 === 0) ? Q.gravaD : hh(x >> 2, r, 95) > 0.7 ? Q.gravaS : Q.grava); }
  // el carro de comedias: ruedas, tablado, postes, el telón de fondo con la luna
  for (const wx of [92, 222]) { R.disco(wx, 146, 12, Q.k); R.disco(wx, 146, 11, Q.nog); R.disco(wx, 146, 8, Q.k); R.disco(wx, 146, 7, Q.nogS); for (let k = 0; k < 8; k++) raya(wx, 146, Math.round(wx + Math.cos(k * 0.785) * 8), Math.round(146 + Math.sin(k * 0.785) * 8), Q.nog, 0); R.disco(wx, 146, 2, Q.bronce); }
  caja(70, 120, 246, 134, Q.nog); R.rect(71, 121, 245, 121, Q.nogL); for (let x = 74; x < 244; x += 12) R.rect(x, 122, x, 133, Q.nogS);
  caja(80, 44, 236, 120, Q.noche); for (let i = 0; i < 30; i++) R.pset(82 + Math.round(hh(i, 1, 96) * 152), 46 + Math.round(hh(i, 2, 96) * 40), i % 4 ? Q.amarL : Q.blanco); R.disco(206, 60, 8, Q.ventL); R.disco(210, 57, 7, Q.noche);
  for (let x = 81; x < 236; x++) { const y = 98 + Math.round(Math.sin(x * 0.08) * 4); for (let yy = y; yy < 120; yy++) R.pset(x, yy, (x + yy) % 4 ? Q.noche3 : Q.noche2); }
  for (const px of [72, 238]) { caja(px, 30, px + 8, 120, Q.rojoCS); R.rect(px + 1, 31, px + 2, 119, Q.rojoCL); }
  // el frontón con la careta pintada (en la parte de arriba, lejos de la barra del año)
  caja(66, 22, 250, 44, Q.rojoC); R.rect(67, 23, 249, 24, Q.rojoCL); for (let x = 70; x < 248; x += 6) R.rect(x, 41, x + 2, 43, Q.oro); R.rect(67, 38, 249, 38, Q.oroS);
});
const p4 = (t) => {
  carroFijo();
  careta(158, 33, 1, t > UNCOMF, Q.oroL, Q.oro);
  // las antorchas de las esquinas
  for (const fx of [68, 248]) { R.rect(fx - 1, 44, fx + 1, 60, Q.nogD); const f = Math.sin(t * 17 + fx) > 0 ? 1 : 0; R.disco(fx, 40 - f, 4, Q.fuegoS); R.disco(fx, 41 - f, 3, Q.fuego); R.pset(fx, 38 - f, Q.fuegoL); for (let y = 30; y < 54; y++) for (let x = fx - 12; x < fx + 12; x++) if ((x + y) & 1 && Math.hypot(x - fx, y - 40) < 12) tine(x, y, 0.15, Q.fuegoL); }
  // el cómico sale con la careta en un palo; el atril con el libro
  const sale = ease(tramo(t, THIRD, THIRD + 0.7)), x = Math.round(lerp(150, 128, sale));
  caja(170, 100, 186, 120, Q.nogS); R.rect(171, 101, 185, 101, Q.nogL);
  T.PIEZAS_VM.libroVoynich(R, 178, 102, { abierto: true, pagina: 'planta', t });
  const habla = t > SAYS - 0.6 && t < NOTHING;
  const ac = R.actor(EL.actor, x, 120, t, { dir: 1, sostiene: [x + 16, 98], habla: habla && Math.sin(t * 9) > 0, sorpresa: t > NOTHING && t < ALL });
  const [mx, my] = ac.mano; R.rect(mx, my - 12, mx, my, Q.nogS); careta(mx, my - 15, 1, t > UNCOMF);
  // el bocadillo vacío que crece y en «nothing» revienta
  const crece = tramo(t, SAYS - 0.6, NOTHING - 0.05);
  if (crece > 0 && t < NOTHING) { const W = Math.round(14 + 30 * crece), H = Math.round(10 + 14 * crece), cx = 118, cy = 68; raya(cx + 6, cy + H / 2, mx - 4, my - 18, Q.k, 1); R.rect(cx - W / 2, cy - H / 2 + 1, cx + W / 2, cy + H / 2 - 1, Q.k); R.rect(cx - W / 2 + 1, cy - H / 2, cx + W / 2 - 1, cy + H / 2, Q.k); R.rect(cx - W / 2 + 1, cy - H / 2 + 1, cx + W / 2 - 1, cy + H / 2 - 1, Q.blanco); R.rect(cx - W / 2 + 2, cy + H / 2 - 1, cx + W / 2 - 1, cy + H / 2 - 1, Q.blancoS); }
  if (t >= NOTHING && t < NOTHING + 0.5) { const u = (t - NOTHING) / 0.5; for (let k = 0; k < 10; k++) { const a = k / 10 * 6.28, r = 10 + u * 22; R.disco(Math.round(118 + Math.cos(a) * r), Math.round(68 + Math.sin(a) * r * 0.6), Math.max(1, Math.round(3 * (1 - u))), Q.blanco); } }
  // el telón rojo, que se abre en «third»
  const ab = ease(tramo(t, THIRD + 0.05, THIRD + 0.65));
  for (const lado of [-1, 1]) { const w = Math.round(78 * (1 - ab)) + 10; for (let i = 0; i < w; i++) { const x = lado < 0 ? 80 + i : 236 - i, ond = Math.sin(i * 0.6 + t * 2); for (let y = 44 + Math.round(i * ab * 0.15); y < 120; y++) R.pset(x, y, ond > 0.5 ? Q.telonL ?? Q.rojoCL : ond < -0.5 ? Q.rojoCD : Q.rojoC); } }
  // el público de espaldas, con capuchas y gorros; un niño a hombros; en «at all», «?»
  const pub = [[40, hex('#6a3a1a'), Q.verdeCS, 3], [66, Q.negro, Q.rojoCS, 0], [92, hex('#8a5428'), Q.azulCS, 3], [120, Q.amarS, Q.ocreS, 2], [150, hex('#3a2418'), Q.grisS, 0], [178, hex('#5a3418'), Q.verdeC, 3], [206, Q.gris, Q.terc, 1], [234, Q.negro, Q.nogS, 3], [262, hex('#8a5428'), Q.azulC, 0], [290, hex('#2a1c14'), Q.rojoC, 3]];
  pub.forEach(([px, pe, ro, f], i) => espalda(px + (t > UNCOMF && t < UNCOMF + 0.5 && i % 3 === 0 ? 1 : 0), 150 + (i % 2) * 4 + (Math.sin(t * 2 + i) > 0.85 ? 1 : 0), pe, ro, f));
  espalda(150, 138, hex('#c89a50'), Q.amar, 0);
  if (t > ALL - 0.1) { if (Math.sin(t * 8) > -0.3) globo(66, 146, '?'); if (Math.sin(t * 8 + 2) > -0.3) globo(206, 146, '?'); }
};

// ── plano 5: el taller del alquimista: el copista, el oro y la venta ──
const GIBBERISH = @17.48@, LEARNED = @18.92@, BOOK = @19.20@, SELL = @19.82@, MONEY = @20.96@;
const p5 = (t) => {
  T.pragua(R, t, { encuadre: 'alquimista' });
  // el copista detrás de la mesa garabatea deprisa, luego espolvorea oro, entrega el libro y recibe la bolsa
  const escribe = t < LEARNED - 0.5, polvo = t > LEARNED - 0.5 && t < BOOK + 0.3, da = tramo(t, SELL - 0.1, SELL + 0.4);
  const cop = R.actor(EL.copista, 178, 128, t, { dir: 1, sostiene: escribe ? [204 + Math.round(Math.sin(t * 25) * 3), 117 + Math.round(Math.cos(t * 31))] : polvo ? [206, 106] : da > 0 && da < 1 ? [Math.round(lerp(196, 140, da)), 116] : false, sonrisa: t > GIBBERISH, habla: t > SELL - 0.6 && t < SELL && Math.sin(t * 9) > 0, dedo: t > MONEY + 0.4 });
  // el cortesano entra por la izquierda, recibe el libro, deja la bolsa y se va con el libro
  const va = tramo(t, BOOK - 0.4, SELL - 0.1), vuelve = tramo(t, MONEY + 0.6, MONEY + 2.2);
  const cx = Math.round(vuelve > 0 ? lerp(108, -20, vuelve) : lerp(-20, 108, va));
  const cor = R.actor(EL.cortesano, cx, 150, t, { dir: vuelve > 0 ? -1 : 1, anda: (va > 0 && va < 1) || (vuelve > 0 && vuelve < 1), sostiene: t > SELL + 0.3 ? true : t > SELL - 0.6 ? [124, 124] : false, sonrisa: t > SELL + 0.3, sorpresa: t > LEARNED && t < SELL - 0.3 && va > 0.5 });
  T.praguaDelante(R, t, { encuadre: 'alquimista' });
  // el libro: en la mesa (garabatos que saltan, brillo de oro) o en la mano del cortesano
  const enMano = t > SELL + 0.3, brilla = t > LEARNED;
  if (!enMano && !(da > 0 && da < 1)) T.PIEZAS_VM.libroVoynich(R, 212, 124, { abierto: true, pagina: 'tarros', brilla, mueve: escribe, t });
  else if (da > 0 && da < 1) T.PIEZAS_VM.libroVoynich(R, Math.round(lerp(212, 136, da)), 122, { abierto: false, brilla, t });
  else if (cor.mano) T.PIEZAS_VM.libroVoynich(R, cor.mano[0], cor.mano[1] + 4, { abierto: false, t });
  if (escribe && t > GIBBERISH - 0.3) for (let i = 0; i < 6; i++) { const u = (t * 1.6 + i / 6) % 1, x = Math.round(204 + hh(i, 1, 97) * 18 + Math.sin(u * 6 + i) * 4), y = Math.round(112 - u * 34); glifo(i * 5 + Math.floor(t * 3), x, y, 2, mez(Q.tinta, Q.perg, u * 0.7)); }
  if (escribe && cop.mano) T.PIEZAS_VM.pluma(R, cop.mano[0] + 2, cop.mano[1] + 2, { t });
  if (polvo) for (let i = 0; i < 12; i++) { const u = (t * 2 + i / 12) % 1; R.pset(Math.round(200 + hh(i, 1, 98) * 24), Math.round(104 + u * 18), i % 2 ? Q.oroL : Q.amar); }
  if (brilla && t < SELL && Math.sin(t * 9) > 0) { destello(222, 108, 3); destello(204, 112, 2); }
  // la bolsa de monedas: del cortesano a la mesa en «money»
  const bol = tramo(t, MONEY - 0.45, MONEY);
  if (t > SELL - 0.6 && t < MONEY - 0.45 && cor.mano) T.PIEZAS_VM.bolsaMonedas(R, cor.mano[0], cor.mano[1] + 6, { t });
  else if (bol > 0) { const x = Math.round(lerp(132, 168, bol)), y = Math.round(lerp(130, 124, bol) - Math.sin(bol * 3.14) * 14); T.PIEZAS_VM.bolsaMonedas(R, x, y, { abierta: bol >= 1, t }); if (bol >= 1 && t < MONEY + 0.5) destello(176, 108, 3);
    if (bol >= 1) for (let k = 0; k < 5; k++) { const u = Math.min(1, (t - MONEY) / 0.5), mx = Math.round(168 + (k - 2) * 7 * u), my = Math.round(118 - Math.sin(u * 3.14) * (10 + k * 2) + u * 4); R.disco(mx, my, 2, Q.oroS); R.pset(mx, my, Q.oroL); R.pset(mx - 1, my - 1, Q.amarL); } }
};

const año = (t) => t < P3 ? 2026 : 1420;
const efectos = [[0.4, 'puerta'], [THREE, 'toc'], [BIG, 'toc'], [THEORIES, 'toc'], [FIRST, 'brillo'], [KNOWN, 'tic'], [WRITTEN, 'maquina'], [HIDE, 'cerrojo'], [LOST, 'viento'], [ALPHABET - 0.4, 'lapiz'], [THIRD, 'publico'], [NOTHING, 'pop'], [GIBBERISH, 'lapiz'], [LEARNED, 'brillo'], [MONEY, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
'''))
