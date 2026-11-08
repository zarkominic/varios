import re

# Grupo S8 del ep25: vm-plantas, vm-ia y vm-fraude (frases 20–22).
# las marcas reales de la voz (atomo/plato/escenas/marcas-ep25.json): marca, inicio y _fin de la frase de cada escena
MARCAS = {'vm-plantas': ('plantas', 0.5, 21.396), 'vm-ia': ('ia', 0.5, 22.342), 'vm-fraude': ('fraude', 0.5, 18.274)}


def marcas(sc, s):
    # @s@ (segundos de la escena, sacados de linea.json) → en('marca', fracción)
    k, a, b = MARCAS[sc]
    return re.sub(r'@([0-9.]+)@', lambda m: "en('%s', %.4f)" % (k, (float(m.group(1)) - a) / (b - a)), s)


# lo que comparten los fondos locales y los insertos (copiado de escenas6.py: paleta Q, ruido, búferes, cielo, nubes,
# madera, ladrillo, signos inventados, pergamino, tapete, degradado, cajas, moteado, rayas, la X roja, bocadillos…)
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

# ── lo propio del grupo S8 ──
COMUN8 = r'''
Object.assign(Q, Object.fromEntries(Object.entries({
  girA: '#f8cc28', girAL: '#ffec80', girAS: '#c88a14', girC: '#5a3418', girCL: '#8a5a28', girCD: '#2e1a0c',
  tallo: '#4a8a3a', talloL: '#6aaa4a', talloS: '#2e6428',
  cal: '#efe6d2', calL: '#fbf4e4', calS: '#d6c8aa', calD: '#b0a084',
  almag: '#a8443a', almagL: '#c8644e', almagS: '#7a2e28',
  amate: '#d8c098', amateL: '#e8d4b0', amateS: '#b49a70', amateD: '#8a7250', azteca: '#2a8a8a', aztecaL: '#5ab8b0',
  pizarra: '#2e4a3a', pizarraL: '#3e5e4a', pizarraS: '#22382c', tiza: '#e8ece0', tizaS: '#a8b8a4',
  telon: '#24305a', telonL: '#34447a', telonS: '#18203e',
  moq: '#6a3a44', moqL: '#7e4a54', moqS: '#4e2a32',
  lluvia: '#9ab0c8', cielG: '#8a96a8', cielGL: '#a8b2c0', cielGS: '#6e7a8c',
  pantA: '#0c1830', pantAL: '#16284a', azulN: '#5ab4f0', ambar: '#f0a83a', ambarS: '#a86a1a',
  carton: '#c49a64', cartonL: '#dcb47e', cartonS: '#9a7244', cartonD: '#6e5030',
  metal: '#8a929e', metalL: '#b0b8c4', metalS: '#5e6670',
  talav: '#2a4aa8', loroV: '#3ab04a', loroR: '#d83a2a', loroA: '#2a6ad8',
}).map(([k, v]) => [k, hex(v)])));
// un girasol de verdad: tallo que se mece, hojas de corazón y la cabeza con dos coronas de pétalos y semillas en espiral
const girasol = (x, yb, h, t, k = 0, r = 5) => {
  const s = Math.sin(t * 1.3 + k) * 1.4, hx = Math.round(x + s), hy = yb - h;
  for (let i = 0; i <= h; i++) { const u = i / h, X = Math.round(x + s * u * u), Y = yb - i; R.pset(X - 1, Y, Q.talloS); R.pset(X, Y, Q.tallo); if (r > 4) R.pset(X + 1, Y, Q.talloL); }
  for (let j = 1; j <= 3; j++) { const Y = yb - Math.round(h * j / 4.2), u = 1 - j / 4.2, X = Math.round(x + s * u * u), d = j % 2 ? 1 : -1, w = r > 4 ? 5 : 3;
    for (let i = 1; i <= w; i++) { const yy = Y - Math.round(Math.sin(i / w * 3) * (w / 2.4)); R.pset(X + d * i, yy, Q.tallo); R.pset(X + d * i, yy + 1, Q.talloS); if (i > 1 && i < w) R.pset(X + d * i, yy - 1, Q.talloL); } }
  const rp = r + Math.max(2, Math.round(r * 0.8));
  for (let a = 0; a < 16; a++) { const an = a / 16 * Math.PI * 2 + k, px = hx + Math.cos(an) * rp, py = hy + Math.sin(an) * rp * 0.92; R.linea(hx, hy, Math.round(px), Math.round(py), a % 2 ? Q.girAS : Q.girA); R.pset(Math.round(px), Math.round(py), Q.girAS); }
  for (let a = 0; a < 16; a++) { const an = (a + 0.5) / 16 * Math.PI * 2 + k, px = hx + Math.cos(an) * (rp - 1), py = hy + Math.sin(an) * (rp - 1) * 0.92; R.pset(Math.round(px), Math.round(py), Q.girAL); }
  R.disco(hx, hy, r, Q.girCD); R.disco(hx, hy, r - 1, Q.girC);
  for (let i = 0; i < r * 6; i++) { const an = i * 2.4, d = Math.sqrt(i / (r * 6)) * (r - 1); R.pset(Math.round(hx + Math.cos(an) * d), Math.round(hy + Math.sin(an) * d), i % 3 ? Q.girCL : Q.girCD); }
  return [hx, hy];
};
// la nuca de alguien del público, de espaldas (x, y: el centro de la cabeza)
const nuca = (x, y, pelo, ropa) => {
  x = Math.round(x); y = Math.round(y);
  R.rect(x - 10, y + 6, x + 10, y + 22, Q.k); R.rect(x - 9, y + 7, x + 9, y + 22, ropa); R.rect(x - 9, y + 7, x + 9, y + 8, mez(ropa, Q.blanco, 0.25)); R.rect(x + 5, y + 9, x + 9, y + 22, mez(ropa, Q.k, 0.3)); R.rect(x - 1, y + 10, x - 1, y + 22, mez(ropa, Q.k, 0.2));
  R.rect(x - 2, y + 4, x + 2, y + 7, Q.pielS);
  R.disco(x, y, 6, Q.k); R.disco(x, y, 5, pelo); R.pset(x - 2, y - 3, mez(pelo, Q.blanco, 0.35)); R.pset(x - 3, y - 2, mez(pelo, Q.blanco, 0.2)); R.pset(x + 2, y + 3, mez(pelo, Q.k, 0.3));
  R.pset(x - 6, y + 1, Q.piel); R.pset(x + 6, y + 1, Q.piel);
};
// el sello rojo del «no» (un círculo tachado) que cae: u 0–1 (grande y claro al llegar, firme al final), con la tinta a trozos
const selloNo = (cx, cy, r, u) => {
  if (u <= 0) return; const s = r * (1 + (1 - Math.min(1, u)) * 0.8), c = u < 1 ? Q.rojoL : Q.rojo;
  for (let a = 0; a < 360; a += 1) for (let w = -1.5; w <= 1.5; w += 0.5) { const an = a * Math.PI / 180, X = Math.round(cx + Math.cos(an) * (s + w)), Y = Math.round(cy + Math.sin(an) * (s + w)); if (hh(X, Y, 77) > 0.12) R.pset(X, Y, c); }
  for (let i = -s * 0.72; i <= s * 0.72; i += 0.5) for (let w = -1.5; w <= 1.5; w += 0.5) { const X = Math.round(cx + i + w * 0.7), Y = Math.round(cy + i - w * 0.7); if (hh(X, Y, 78) > 0.12) R.pset(X, Y, c); }
};
// un libro pequeño de icono (7 × 6), para pantallas y chinchetas
const libroMini = (x, y, c, cS) => { R.rect(x, y, x + 7, y + 6, Q.k); R.rect(x + 1, y + 1, x + 3, y + 5, c); R.rect(x + 4, y + 1, x + 6, y + 5, c); R.rect(x + 3, y + 1, x + 4, y + 5, cS); R.pset(x + 2, y + 2, cS); R.pset(x + 5, y + 3, cS); };
// la lupa en la mano (hx, hy: el puño): el mango que sale del puño y la lente arriba a la izquierda, con lo de debajo aclarado
const lupaMano = (hx, hy, r = 11, L = 6) => {
  const cx = hx - 3, cy = hy - r - L;
  raya(hx + 1, hy - 2, cx + 2, cy + r, Q.nogS, 1); raya(hx, hy - 3, cx + 1, cy + r - 1, Q.nogL, 0);
  for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy); if (d < r - 1) tine(x, y, 0.28, Q.aguaL); }
  for (let a = 0; a < 360; a += 2) { const an = a * Math.PI / 180; R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r), Q.k); R.pset(Math.round(cx + Math.cos(an) * (r - 1)), Math.round(cy + Math.sin(an) * (r - 1)), a > 180 ? Q.bronceS : Q.bronceL); }
  R.linea(cx - r + 4, cy - 3, cx - 3, cy - r + 4, Q.blanco); R.pset(cx - r + 4, cy, Q.blanco);
  return [cx, cy];
};
// unas esquinas doradas que parpadean alrededor de lo que hay que mirar
const marco = (x0, y0, x1, y1, t, c = Q.oroL) => {
  if (Math.sin(t * 9) < -0.3) return;
  for (const [x, y, dx, dy] of [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]]) for (let i = 0; i < 6; i++) { R.pset(x + dx * i, y, c); R.pset(x, y + dy * i, c); R.pset(x + dx * i, y + dy, Q.oroS); }
};
// una partícula de polvo que sube y se apaga
const polvo = (x, y, t, n, k = 0) => { for (let i = 0; i < n; i++) { const u = (t * 0.7 + hh(i, k, 81)) % 1, X = Math.round(x + (hh(i, k, 82) - 0.5) * 30 * u + Math.sin(t * 3 + i) * 2), Y = Math.round(y - u * 26); if (u < 0.85) R.pset(X, Y, u < 0.4 ? Q.calL : Q.calS); } };
'''

E = {}

# ──────────────────────────────────────────────────────────────────
E['vm-plantas'] = ('Las plantas', '''// VM-PLANTAS (frase 20): las plantas de México. Cuatro planos:
// 1. fondo local: el jardín botánico en 2013 (invernadero victoriano, nubes, girasoles, jardinero con carretilla,
//    aspersor, mariposa, abejas): la botánica llega con el libro; en «botanist» él señala la cabeza del girasol gigante, en
//    «colleague» ella abre el libro a su lado y en «proposed» un hilo dorado une el dibujo con la flor y salta el «!»;
// 2. «plants from Mexico»: inserto local, la mesa de trabajo: en «Mexico» entra deslizándose el herbario azteca junto
//    al libro; la mano con la lupa va del dibujo del libro («drawn») al del herbario y en «Aztec» se encienden los dos y
//    aparece el «=»;
// 3. «and that the book came»: el estudio de Atom, la pantalla: el mapa de América se ilumina de norte a sur en
//    «Americas», con la chincheta del libro en México; en «But» sale 1404-1438, en «Europeans» la carabela de 1492 cruza
//    el océano con el «<», y en «arrived» el mapa se apaga y la chincheta se tacha; la botánica señala, él objeta;
// 4. «so for that to be true»: fondo local, un cuarto colonial hacia 1550 (volcán y campanario por la ventana, sarape,
//    loro): el escribano abre el arcón en «someone» (polvo), saca una hoja vieja con su «1420» en «old sheets», la lleva
//    a la mesa y en «afterward» se rasca la cabeza con un «?».''', marcas('vm-plantas', COMUN + COMUN8 + r'''
const P2 = @6.81@, P3 = @11.45@, P4 = @16.84@;
const LLEGA = @2.20@, BOT = @4.01@, COLE = @4.89@, PROP = @5.33@, MEX = @7.49@, DRAWN = @8.43@, AZTEC = @10.15@, HERB = @10.79@;
const AMER = @12.75@, BUT = @13.88@, VELL = @14.08@, EURO = @15.12@, ARR = @15.76@, SOMEONE = @18.28@, WRITE = @19.20@, OLD = @19.72@, AFTER = @20.64@;

// ── plano 1: el jardín botánico ──
const cieloJ = () => fijo('cieloJ', () => cieloFijo(100));
const dentroG = (x, y) => { if (x < 6 || x > 150 || y > 108) return false; if (y >= 66) return true; const dx = (x - 78) / 36, dy = (66 - y) / 36; return dx * dx + dy * dy <= 1; };
const jardin = () => capa('jardin', () => {
  // las colinas lejanas y los árboles del fondo a la derecha (por debajo de la esquina de Atom)
  for (let x = 0; x < 320; x++) { const y1 = Math.round(86 - Math.sin(x * 0.021 + 1) * 7 - Math.sin(x * 0.057) * 3); for (let y = y1; y <= 108; y++) R.pset(x, y, y === y1 ? Q.lejosL : ((x * 3 + y * 7) % 11 === 0 ? Q.lejosS : Q.lejos)); }
  for (const [x, y, r] of [[214, 84, 12], [236, 76, 16], [262, 68, 17], [290, 72, 19], [316, 66, 16]]) { R.disco(x, y + 2, r, Q.setoD); R.disco(x - 1, y, r - 1, Q.setoS); R.disco(x - 3, y - 2, r - 4, Q.seto); for (let i = 0; i < r * 4; i++) { const a = hh(i, x, 41) * 6.28, d = hh(i, x, 42) * (r - 3); R.pset(Math.round(x - 3 + Math.cos(a) * d), Math.round(y - 3 + Math.sin(a) * d), i % 3 ? Q.setoL : Q.hierbaL); } }
  // el invernadero victoriano: cristal con reflejos, palmeras dentro, armazón blanco de hierro, linterna y zócalo de ladrillo
  for (let y = 26; y <= 108; y++) for (let x = 6; x <= 150; x++) {
    if (!dentroG(x, y)) continue;
    const verde = y > 74 && hh(x >> 3, y >> 3, 43) > 0.4 && y > 74 + hh(x >> 2, 1, 44) * 16;
    let c = verde ? (hh(x, y, 45) > 0.55 ? Q.setoS : Q.seto) : (y < 50 ? hex('#cfe8f2') : hex('#b8dcea'));
    if (!verde && ((x + y) % 23) < 3) c = Q.blanco; else if (!verde && ((x + y) % 23) === 3) c = hex('#e4f4fa');
    R.pset(x, y, c);
  }
  for (let y = 66; y <= 104; y++) for (let x = 6; x <= 150; x += 9) { R.pset(x, y, Q.blanco); R.pset(x + 1, y, Q.blancoS); }
  for (const y of [66, 67, 80, 92]) for (let x = 6; x <= 150; x++) R.pset(x, y, y === 67 ? Q.blancoS : Q.blanco);
  for (let a = 0; a <= 12; a++) { const an = Math.PI * a / 12; R.linea(78, 66, Math.round(78 - Math.cos(an) * 36), Math.round(66 - Math.sin(an) * 36), Q.blanco); }
  for (const rr of [12, 24, 36]) for (let a = 0; a <= 360; a++) { const an = Math.PI * a / 360; R.pset(Math.round(78 - Math.cos(an) * rr), Math.round(66 - Math.sin(an) * rr), rr === 36 ? Q.blancoS : Q.blanco); }
  caja(73, 22, 83, 30, hex('#d8eef6')); R.rect(74, 26, 82, 26, Q.blanco); R.rect(77, 17, 79, 22, Q.blanco); R.pset(78, 16, Q.oro); R.pset(78, 15, Q.oroL);
  caja(68, 86, 88, 104, hex('#3a5a4a')); R.rect(78, 87, 78, 103, Q.blanco); R.disco(78, 86, 10, Q.blanco); R.disco(78, 86, 9, hex('#b8dcea')); R.rect(69, 86, 87, 86, Q.blanco);
  ladrillo(6, 104, 150, 110, 7);
  // el seto y el bancal de los girasoles
  for (let x = 150; x < 320; x++) { const yt = Math.round(100 + Math.sin(x * 0.4) * 1.5 + hh(x >> 2, 1, 46) * 2); for (let y = yt; y <= 112; y++) R.pset(x, y, y === yt ? Q.setoL : hh(x, y, 47) > 0.7 ? Q.setoD : (x + y) % 3 ? Q.setoS : Q.seto); }
  // el césped segado a franjas con briznas, el camino de grava en perspectiva con su bordillo
  for (let y = 108; y < 180; y++) for (let x = 0; x < 320; x++) {
    const cx = 160 + (y - 108) * 0.15, w = 8 + (y - 108) * 0.95, d = Math.abs(x - cx);
    if (d < w) { const n = hh(x >> 1, y >> 1, 48); R.pset(x, y, d > w - 1.5 ? Q.piedraS : n < 0.12 ? Q.gravaD : n < 0.4 ? Q.gravaS : n > 0.85 ? Q.gravaL : Q.grava); continue; }
    if (y > 108 && y < 112 && x > 6 && x < 150) { R.pset(x, y, Q.hierbaS); continue; }
    const franja = (Math.floor((x + (y - 108) * 0.6) / 18) & 1), n = hh(x, y, 49);
    let c = franja ? Q.hierba : Q.hierbaL; if (n > 0.88) c = Q.hierbaS; else if (n < 0.06) c = Q.hierbaD; if ((x * 5 + y * 3) % 13 === 0) c = franja ? Q.hierbaL : Q.hierba;
    R.pset(x, y, c);
  }
  for (let x = 180; x < 286; x++) for (let y = 112; y < 120; y++) R.pset(x, y, hh(x, y, 50) > 0.7 ? Q.nogS : (x + y) % 4 ? hex('#6a4a2e') : hex('#7e5a38'));
  // el arriate de tulipanes con el aspersor, a la izquierda
  for (let y = 128; y <= 156; y++) for (let x = 6; x <= 104; x++) { const e = ((x - 55) / 49) ** 2 + ((y - 142) / 14) ** 2; if (e <= 1) R.pset(x, y, e > 0.85 ? Q.piedraS : hh(x, y, 51) > 0.7 ? Q.nogS : hex('#6a4a2e')); }
  for (let i = 0; i < 26; i++) { const x = 14 + Math.round(hh(i, 1, 52) * 82), y = 134 + Math.round(hh(i, 2, 52) * 16), c = [Q.rojo, Q.amar, Q.rosa, Q.blanco][i % 4]; R.rect(x, y - 6, x, y, Q.tallo); R.pset(x - 1, y - 3, Q.talloL); R.rect(x - 1, y - 9, x + 1, y - 6, c); R.pset(x, y - 9, Q.k); R.pset(x - 1, y - 9, mez(c, Q.blanco, 0.4)); }
  // la farola de hierro y el banco de listones a la derecha
  R.rect(117, 96, 118, 150, Q.negro); R.rect(114, 148, 121, 151, Q.negro); caja(112, 86, 123, 96, hex('#f8e8a0')); R.rect(111, 84, 124, 86, Q.negro); R.pset(117, 82, Q.negro);
  for (let j = 0; j < 4; j++) { R.rect(250, 128 + j * 3, 300, 129 + j * 3, j % 2 ? Q.roble : Q.robleL); R.rect(250, 130 + j * 3, 300, 130 + j * 3, Q.robleS); }
  for (const x of [253, 297]) { R.rect(x, 128, x + 1, 152, Q.negro); R.rect(x - 2, 151, x + 3, 152, Q.negro); }
  for (let x = 250; x <= 300; x++) R.pset(x, 153, Q.hierbaD);
});
const p1 = (t) => {
  cieloJ(); nubes(t, 6, 60, 3); jardin();
  // los girasoles del bancal, que se mecen
  for (let i = 0; i < 7; i++) girasol(188 + i * 15, 118, 34 + (i * 7) % 13, t, i * 1.7, 3);
  // el jardinero de fondo con la carretilla de macetas, por el césped de detrás
  { const u = tramo(t, 0, P2), x = Math.round(lerp(330, 186, u)); R.actor(EL.granjero, x, 124, t, { dir: -1, anda: u < 1 });
    const cx = x - 16; caja(cx - 1, 112, cx + 13, 118, Q.metalS); R.rect(cx, 113, cx + 12, 113, Q.metalL); R.disco(cx + 2, 121, 3, Q.k); R.disco(cx + 2, 121, 2, Q.grisS); raya(cx + 12, 116, cx + 18, 112, Q.nogS, 0);
    for (const dx of [2, 7]) { caja(cx + dx, 106, cx + dx + 4, 112, Q.ladr); R.disco(cx + dx + 2, 104, 3, Q.hierbaL); } }
  // el aspersor del arriate que gira
  for (let k = 0; k < 14; k++) { const a = t * 2.2 + k * 0.45, u = (k % 7) / 7, X = Math.round(44 + Math.cos(a) * u * 34), Y = Math.round(138 - Math.sin(u * Math.PI) * 14 + Math.sin(a) * u * 6); R.pset(X, Y, k % 2 ? Q.aguaL : Q.agua); }
  R.rect(43, 136, 45, 140, Q.grisS); R.pset(44, 135, Q.grisL);
  // la mariposa sobre los tulipanes
  { const x = Math.round(60 + Math.sin(t * 0.9) * 32), y = Math.round(120 + Math.sin(t * 2.3) * 7), a = Math.sin(t * 16) > 0; R.pset(x, y, Q.k); R.pset(x, y + 1, Q.k); R.rect(x - 2, y - (a ? 2 : 0), x - 1, y, Q.naranja ?? Q.amar); R.rect(x + 1, y - (a ? 2 : 0), x + 2, y, Q.naranja ?? Q.amar); }
  // el girasol gigante, de verdad, atado a su tutor
  R.rect(171, 88, 172, 158, Q.robleS); R.pset(171, 88, Q.robleL);
  const [hx, hy] = girasol(166, 158, 66, t, 0.4, 7);
  for (let j = 0; j < 3; j++) R.rect(166, 112 + j * 14, 172, 112 + j * 14, Q.amarS);
  for (let k = 0; k < 2; k++) { const a = t * (3 + k) + k * 3, X = Math.round(hx + Math.cos(a) * (16 + k * 4)), Y = Math.round(hy + Math.sin(a * 1.3) * 8); R.pset(X, Y, Q.k); R.pset(X + 1, Y, Q.amar); R.pset(X, Y - 1, Q.blanco); }
  // la botánica llega con el libro; en «colleague» lo abre junto a la flor
  const u = tramo(t, 0.2, LLEGA), cx = Math.round(lerp(-18, 122, ease(u)));
  const abre = t > COLE, col = R.actor(EL.colega, cx, 160, t, { dir: 1, anda: u > 0 && u < 1, sostiene: abre ? [cx + 18, 140] : true, sonrisa: t > PROP + 0.3, habla: t > LLEGA + 0.3 && t < BOT - 0.2 && Math.sin(t * 8) > 0 });
  const [mx, my] = col.mano;
  if (abre) PIEZAS_VM.libroVoynich(R, mx + 2, my + 4, { abierto: true, pagina: 'planta' }); else PIEZAS_VM.libroVoynich(R, mx, my + 6, {});
  const bot = R.actor(EL.botanico, 184, 160, t, { dir: -1, dedo: t > BOT && t < PROP + 0.6, sonrisa: t > PROP, habla: t > PROP + 0.9 && Math.sin(t * 7) > 0.2 });
  // en «proposed» el hilo dorado une el dibujo del libro con la cabeza del girasol
  const hilo = ease(tramo(t, PROP - 0.1, PROP + 0.6));
  if (hilo > 0) { const ax = mx - 12, ay = my - 6, n = 26; for (let i = 0; i <= n * hilo; i++) { const f = i / n, X = Math.round(lerp(ax, hx - 6, f)), Y = Math.round(lerp(ay, hy + 6, f) - Math.sin(f * Math.PI) * 10); if ((i + Math.floor(t * 12)) % 3) { R.pset(X, Y, Q.oroL); R.pset(X, Y + 1, Q.oroS); } }
    if (hilo >= 1) { destello(hx, hy, 3 + (Math.sin(t * 9) > 0 ? 1 : 0)); destello(ax, ay, 2); } }
  if (t > PROP + 0.3 && t < PROP + 1.3) globo(bot.cabeza[0], bot.cabeza[1] - 4, '!');
};

// ── plano 2: la mesa con el libro y el herbario azteca ──
const mesaH = () => fijo('mesaH', () => {
  madera(0, 0, 319, 179, Q.roble, Q.robleL, Q.robleS, Q.robleD, 12, 201);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 150, (y - 96) * 1.25); if ((x + y) & 1) R.pset(x, y, mez(R.pget(x, y), d < 140 ? Q.luz : Q.nogD, d < 140 ? 0.16 * (1 - d / 140) : Math.min(0.35, (d - 140) / 160))); }
  // el pliego de herbario con un girasol prensado (arriba, fuera de la barra del año)
  { const X = 182, Y = 22; caja(X, Y, X + 78, Y + 42, Q.papel, Q.papelS); R.rect(X + 1, Y + 41, X + 77, Y + 41, Q.papelS);
    for (const [x, y] of [[X + 6, Y + 4], [X + 72, Y + 4], [X + 6, Y + 37], [X + 72, Y + 37]]) { R.rect(x - 1, y, x + 2, y + 1, Q.blancoS); }
    raya(X + 12, Y + 38, X + 42, Y + 18, Q.talloS, 0); raya(X + 13, Y + 38, X + 43, Y + 18, Q.tallo, 0); for (const [x, y] of [[X + 22, Y + 32], [X + 32, Y + 26]]) { R.disco(x, y, 3, Q.tallo); R.pset(x - 1, y - 1, Q.talloL); }
    for (let a = 0; a < 14; a++) { const an = a / 14 * Math.PI * 2; R.linea(X + 47, Y + 14, Math.round(X + 47 + Math.cos(an) * 10), Math.round(Y + 14 + Math.sin(an) * 9), a % 2 ? Q.girAS : hex('#d8b040')); }
    R.disco(X + 47, Y + 14, 5, Q.girC); for (let i = 0; i < 20; i++) R.pset(X + 47 + Math.round(Math.cos(i * 2.4) * Math.sqrt(i) * 1.1), Y + 14 + Math.round(Math.sin(i * 2.4) * Math.sqrt(i) * 1.1), Q.girCD);
    caja(X + 58, Y + 30, X + 74, Y + 38, Q.blanco, Q.papelS); R.numero('2013', X + 60, Y + 37, { color: Q.tinta, sombra: false, fina: true }); }
  // la libreta de campo con hojas dibujadas a lápiz, y el sobre de semillas de girasol con las pipas sueltas
  { caja(14, 24, 94, 64, Q.blanco, Q.grisS); R.rect(54, 25, 54, 63, Q.grisL); for (let y = 30; y < 62; y += 5) { R.rect(16, y, 52, y, hex('#dce4ee')); R.rect(56, y, 92, y, hex('#dce4ee')); }
    for (const [x, y] of [[30, 44], [72, 40]]) { R.linea(x, y + 14, x, y - 8, Q.grisS); for (let j = 0; j < 3; j++) { R.linea(x, y - j * 6, x - 7, y - j * 6 - 4, Q.grisS); R.linea(x, y - j * 6, x + 7, y - j * 6 - 4, Q.grisS); } }
    for (let i = 0; i < 6; i++) R.disco(18, 28 + i * 6, 1, Q.grisS); raya(84, 70, 108, 62, Q.amar, 0); R.pset(108, 62, Q.negro); }
  { caja(116, 32, 146, 58, Q.cartonL, Q.cartonS); R.poligono([[116, 32], [146, 32], [131, 42]], Q.carton); R.disco(131, 50, 5, Q.girA); R.disco(131, 50, 2, Q.girC);
    for (let i = 0; i < 9; i++) { const x = 150 + Math.round(hh(i, 1, 205) * 22), y = 38 + Math.round(hh(i, 2, 205) * 20); R.rect(x, y, x + 2, y + 1, Q.k); R.pset(x + 1, y, Q.blancoS); } }
  // la mazorca de maíz con sus hojas, abajo a la izquierda, y tres chiles rojos
  R.poligono([[4, 160], [30, 140], [52, 146], [26, 172]], Q.cacS); R.poligono([[6, 158], [30, 143], [48, 147], [24, 168]], Q.cac);
  for (let i = 0; i < 9; i++) for (let j = 0; j < 4; j++) { const x = 14 + i * 4 + j, y = 158 - i * 2 + j * 3; caja(x, y, x + 3, y + 3, (i + j) % 3 ? Q.amar : Q.amarS); R.pset(x + 1, y + 1, Q.amarL); }
  for (let k = 0; k < 3; k++) { const x0 = 66 + k * 12, y0 = 150 + k * 4; for (let i = 0; i < 16; i++) { const X = x0 + i, Y = Math.round(y0 + Math.sin(i / 16 * 3) * 5); R.rect(X, Y, X, Y + 3, Q.k); R.rect(X, Y + 1, X, Y + 2, i < 2 ? Q.tallo : Q.rojo); if (i > 2 && i % 3 === 0) R.pset(X, Y + 1, Q.rojoL); } }
  // la regla y el lápiz
  caja(214, 158, 270, 164, hex('#e8d8a0'), Q.ocreS); for (let x = 216; x < 268; x += 3) R.rect(x, 159, x, x % 9 === 0 ? 162 : 160, Q.ocreS);
  raya(204, 150, 240, 140, Q.amarS, 1); raya(204, 149, 240, 139, Q.amar, 0); R.pset(241, 139, Q.rosa); R.pset(203, 150, Q.negro);
});
const herbario = (x0, y0) => {
  // el códice de papel de amate, abierto, con su marco rojo y el dibujo de una planta al estilo de los herbarios aztecas
  caja(x0 - 2, y0 - 2, x0 + 116, y0 + 62, Q.amateD);
  for (let y = y0; y <= y0 + 60; y++) for (let x = x0; x <= x0 + 114; x++) { const n = hh(x >> 1, y, 61), b = Math.min(x - x0, x0 + 114 - x, y - y0, y0 + 60 - y); R.pset(x, y, b < 2 ? Q.amateS : n < 0.1 ? Q.amateS : n > 0.9 ? Q.amateL : (y % 3 === 0 && n > 0.5) ? Q.amateL : Q.amate); }
  R.rect(x0 + 57, y0, x0 + 57, y0 + 60, Q.amateD);
  for (const [a, b] of [[3, 54], [60, 111]]) { for (let x = x0 + a; x <= x0 + b; x++) { R.pset(x, y0 + 3, Q.almag); R.pset(x, y0 + 57, Q.almag); } for (let y = y0 + 3; y <= y0 + 57; y++) { R.pset(x0 + a, y, Q.almag); R.pset(x0 + b, y, Q.almag); } }
  // la planta: raíces azules en espiral, el tallo y las hojas simétricas verdes, flores rojas y amarillas, puntos de número
  const px = x0 + 28, pb = y0 + 50;
  for (const d of [-1, 1]) { for (let i = 0; i < 9; i++) { R.pset(px + d * i, pb + Math.round(Math.sin(i * 0.6) * 2) + 2, Q.azteca); } R.disco(px + d * 9, pb + 2, 2, Q.aztecaL); R.pset(px + d * 9, pb + 2, Q.azteca); }
  R.rect(px - 1, pb - 34, px, pb, Q.verdeS);
  for (let j = 0; j < 3; j++) for (const d of [-1, 1]) { const y = pb - 8 - j * 9; R.poligono([[px, y], [px + d * 14, y - 5], [px + d * 4, y - 2]], Q.verde); R.linea(px, y, px + d * 14, y - 5, Q.verdeS); R.pset(px + d * 8, y - 4, Q.verdeL); }
  for (const [dx, dy, c] of [[0, -38, Q.rojo], [-8, -32, Q.amar], [8, -32, Q.rojo]]) { R.disco(px + dx, pb + dy, 3, Q.k); R.disco(px + dx, pb + dy, 2, c); R.pset(px + dx, pb + dy, Q.amarL); }
  for (let i = 0; i < 4; i++) { R.disco(x0 + 8 + i * 5, y0 + 9, 1, Q.almag); }
  // la otra página: glifos de pictograma (un cerro, una gota de agua, un sol) y una planta más pequeña
  const qx = x0 + 70; R.poligono([[qx, y0 + 26], [qx + 8, y0 + 12], [qx + 16, y0 + 26]], Q.verde); R.linea(qx, y0 + 26, qx + 16, y0 + 26, Q.verdeS); R.disco(qx + 8, y0 + 19, 2, Q.aztecaL);
  R.disco(qx + 30, y0 + 18, 5, Q.amarS); R.disco(qx + 30, y0 + 18, 3, Q.amar); for (let a = 0; a < 8; a++) R.pset(qx + 30 + Math.round(Math.cos(a * 0.785) * 7), y0 + 18 + Math.round(Math.sin(a * 0.785) * 7), Q.almag);
  R.disco(qx + 12, y0 + 44, 4, Q.azteca); R.disco(qx + 12, y0 + 42, 2, Q.aztecaL); R.rect(qx + 30, y0 + 34, qx + 31, y0 + 52, Q.verdeS);
  for (const d of [-1, 1]) for (let j = 0; j < 2; j++) { R.disco(qx + 30 + d * 4, y0 + 44 - j * 7, 2, Q.verde); }
  R.disco(qx + 30, y0 + 32, 2, Q.rosa);
  return [px, pb];
};
const p2 = (t) => {
  mesaH();
  // el libro de Voynich, abierto por la planta, a 3×
  PIEZAS_VM.libroVoynich(R, 88, 130, { abierto: true, pagina: 'planta', s: 3, brilla: t > AZTEC });
  // en «Mexico» entra el herbario deslizándose desde la derecha, empujado por una mano
  const e = ease(tramo(t, MEX - 0.5, MEX + 0.35)), hx0 = Math.round(lerp(330, 176, e));
  herbario(hx0, 70);
  if (e < 1 && e > 0) T.brazo(R, 360, 150, hx0 + 120, 104, '#c87a3a', -1, { codo: [350, 128] });
  // la mano con la lupa: del dibujo del libro (desde «drawn») al herbario; en «Aztec» los dos se encienden con el «=»
  const K = [[P2 - 0.1, 150, 214], [P2 + 0.7, 70, 136], [DRAWN, 76, 140], [DRAWN + 0.8, 210, 132], [AZTEC, 210, 130], [HERB + 0.4, 164, 160], [P3, 164, 214]];
  const [wx, wy] = camino(K, t);
  if (wy < 196) { T.brazo(R, Math.round(wx) + 26, 206, Math.round(wx), Math.round(wy), '#7a8a5a', 1, { codo: [Math.round(wx) + 22, Math.round(wy) + 30] }); lupaMano(Math.round(wx), Math.round(wy), 11, 20); }
  if (t > AZTEC) { marco(42, 82, 88, 126, t); marco(hx0 + 8, 76, hx0 + 50, 124, t);
    const s = ease(tramo(t, AZTEC, AZTEC + 0.3)); if (s > 0) { const cx = 158, cy = 100, w = Math.round(9 * s); R.rect(cx - w - 1, cy - 5, cx + w + 1, cy - 1, Q.k); R.rect(cx - w, cy - 4, cx + w, cy - 2, Q.oroL); R.rect(cx - w - 1, cy + 1, cx + w + 1, cy + 5, Q.k); R.rect(cx - w, cy + 2, cx + w, cy + 4, Q.oroL); } }
  // el vapor de la taza de cacao (la taza, abajo a la derecha)
  R.disco(292, 160, 16, Q.k); R.disco(292, 160, 15, Q.blancoS); R.disco(292, 158, 14, Q.blanco); R.disco(292, 157, 11, Q.k); R.disco(292, 157, 10, hex('#6a3418')); R.disco(289, 155, 3, hex('#8a4a24'));
  for (let k = 0; k < 6; k++) { const u = (t * 0.4 + k / 6) % 1, X = Math.round(292 + Math.sin(t * 1.7 + k * 1.3) * (2 + u * 6)), Y = Math.round(150 - u * 28); if (u < 0.85) R.pset(X, Y, u < 0.5 ? Q.blanco : Q.blancoS); }
};

// ── plano 3: la pantalla del estudio con el mapa de América ──
const PRJ = ([lon, lat]) => [Math.round(70 + (lon + 170) * 0.6), Math.round(24 + (72 - lat) * 0.64)];
const NAM = [[-165, 60], [-160, 70], [-140, 70], [-125, 71], [-95, 71], [-80, 72], [-65, 62], [-60, 55], [-56, 50], [-65, 45], [-70, 42], [-76, 35], [-81, 31], [-80, 26], [-82, 25], [-83, 29], [-90, 30], [-97, 27], [-97, 22], [-92, 19], [-87, 21], [-88, 16], [-83, 15], [-83, 10], [-79, 9], [-77, 8], [-80, 7], [-85, 10], [-92, 14], [-105, 20], [-110, 24], [-112, 29], [-115, 31], [-117, 32], [-121, 35], [-124, 40], [-124, 48], [-130, 54], [-140, 60], [-150, 59], [-158, 57], [-165, 55]].map(PRJ);
const SAM = [[-77, 8], [-72, 12], [-62, 11], [-52, 5], [-50, 0], [-35, -6], [-39, -15], [-41, -22], [-48, -26], [-53, -34], [-58, -38], [-63, -41], [-65, -47], [-68, -52], [-70, -55], [-74, -52], [-73, -40], [-71, -30], [-70, -18], [-76, -14], [-81, -5], [-80, 0], [-77, 4]].map(PRJ);
const GRO = [[-73, 72], [-55, 72], [-28, 71], [-22, 70], [-42, 60], [-50, 62], [-56, 68]].map(PRJ);
const MXC = [[-117, 32], [-108, 31], [-97, 26], [-97, 22], [-92, 19], [-87, 21], [-88, 16], [-92, 14], [-105, 20], [-110, 24], [-112, 29], [-115, 31]].map(PRJ);
const CUB = [[-85, 22], [-80, 23], [-74, 20], [-78, 20]].map(PRJ);
const HUD = [[-95, 60], [-80, 63], [-78, 55], [-85, 52], [-94, 57]].map(PRJ);
const borde = (P, c) => { for (let i = 0; i < P.length; i++) R.linea(P[i][0], P[i][1], P[(i + 1) % P.length][0], P[(i + 1) % P.length][1], c); };
const carabela = (x, y) => {
  x = Math.round(x); y = Math.round(y);
  R.poligono([[x - 8, y], [x + 8, y], [x + 6, y + 4], [x - 6, y + 4]], Q.k); R.poligono([[x - 7, y + 1], [x + 7, y + 1], [x + 5, y + 3], [x - 5, y + 3]], Q.robleS);
  R.rect(x - 1, y - 12, x - 1, y, Q.k); R.rect(x + 4, y - 9, x + 4, y, Q.k);
  caja(x - 6, y - 11, x + 2, y - 3, Q.papel); caja(x + 2, y - 8, x + 7, y - 2, Q.papel); R.pset(x - 1, y - 13, Q.rojo); R.pset(x, y - 13, Q.rojo);
};
const p3 = (t) => {
  T.hoy(R, t, { camara: 'pantalla', pasa: 0, lupa: false });
  const S = [66, 22, 232, 108];
  R.recorte(S);
  for (let y = S[1]; y <= S[3]; y++) for (let x = S[0]; x <= S[2]; x++) R.pset(x, y, (x + y * 3) % 11 === 0 ? Q.pantAL : ((x - 66) % 18 === 0 || (y - 22) % 16 === 0) && (x + y) % 2 ? hex('#1c3460') : Q.pantA);
  // el océano: ondas que se mueven
  for (let k = 0; k < 24; k++) { const x = 70 + ((k * 37 + Math.floor(t * 6)) % 92), y = 30 + (k * 13) % 76; R.pset(x, y, hex('#2a4a7a')); R.pset(x + 1, y, hex('#2a4a7a')); }
  // las Américas: de norte a sur se encienden en «Americas»; en «arrived» se apagan
  const lit = ease(tramo(t, AMER - 0.2, AMER + 0.6)), off = ease(tramo(t, ARR, ARR + 0.6)), on = lit * (1 - off);
  const tierra = hex('#3a4a5e'), tierraL = hex('#4e6078');
  for (const P of [NAM, SAM, GRO, CUB]) R.poligono(P, tierra);
  R.poligono(HUD, Q.pantA);
  if (on > 0) { const corte = Math.round(lerp(22, 108, lit)); R.recorte([S[0], S[1], S[2], corte]);
    const c = mez(tierra, Q.oro, on), cL = mez(tierraL, Q.oroL, on); for (const P of [NAM, SAM, GRO, CUB]) R.poligono(P, c); R.poligono(HUD, Q.pantA); for (const P of [NAM, SAM, GRO, CUB]) borde(P, cL);
    R.poligono(MXC, mez(c, Q.naranja ?? Q.rojoL, 0.5 + 0.3 * Math.sin(t * 6))); R.recorte(S); }
  else for (const P of [NAM, SAM, GRO, CUB]) borde(P, tierraL);
  for (const P of [NAM, SAM]) for (let i = 0; i < P.length; i += 3) R.pset(P[i][0] + 1, P[i][1], hex('#7a8aa0'));
  // la chincheta del libro en México
  const [mx, my] = PRJ([-101, 21]);
  if (lit > 0.6) { R.linea(mx, my, mx, my - 8, Q.blanco); libroMini(mx - 4, my - 15, Q.pergL, Q.ocreS); R.pset(mx, my, Q.rojo); R.pset(mx, my + 1, Q.rojoS); if (t > ARR + 0.3) tache(mx, my - 12, 6, tramo(t, ARR + 0.3, ARR + 0.8)); }
  // el panel de la derecha: 1404-1438 (desde «But»), el «<» y la carabela de 1492 (desde «Europeans»)
  R.rect(164, 26, 164, 104, hex('#22406a'));
  const a1 = tramo(t, BUT - 0.1, VELL + 0.2);
  if (a1 > 0) { libroMini(170, 32, Q.pergL, Q.ocreS); R.rect(180, 36, 180 + Math.round(48 * a1), 38, Q.oro); R.numero('1404-1438', 170, 50, { color: Q.oroL, sombra: false, fina: true, n: Math.round(a1 * 60) }); }
  const a2 = tramo(t, EURO - 0.2, EURO + 0.2);
  if (a2 > 0) { R.numero('<', 194, 64, { color: Q.rojoL, sombra: false }); R.numero('1492', 186, 96, { color: Q.blanco, sombra: false, fina: true });
    const v = ease(tramo(t, EURO, ARR + 0.2)), [ex, ey] = PRJ([-64, 18]); carabela(lerp(200, ex + 6, v), lerp(80, ey, v) + Math.sin(t * 5)); }
  // los reflejos del cristal
  for (let i = 0; i < 30; i++) { R.pset(80 + i, 104 - i * 2, hex('#2a3e62')); R.pset(84 + i, 104 - i * 2, hex('#22365a')); }
  R.recorte(null);
  // la botánica entra y señala el mapa; él objeta en «But»; en «arrived», los dos se quedan tristes
  const u = tramo(t, P3 + 0.05, P3 + 1.0), cx = Math.round(lerp(20, 70, ease(u)));
  const col = R.actor(EL.colega, cx, 168, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > AMER - 0.3 && t < BUT + 0.4, sonrisa: t > AMER && t < ARR, triste: t > ARR + 0.3 });
  const bot = R.actor(EL.botanico, 200, 168, t, { dir: -1, dedo: t > BUT && t < EURO + 0.5, habla: t > BUT && t < ARR && Math.sin(t * 8) > 0, triste: t > ARR + 0.3 });
  if (t > BUT + 0.1 && t < BUT + 0.9) globo(bot.cabeza[0], bot.cabeza[1] - 4, '!');
  if (t > ARR + 0.4) globo(col.cabeza[0] + 2, col.cabeza[1] - 4, '?');
  T.hoyDelante(R, t, { camara: 'pantalla' });
};

// ── plano 4: el cuarto colonial, hacia 1550 ──
const VEN = [186, 30, 246, 96];
const dentroV = (x, y) => x >= VEN[0] && x <= VEN[2] && y <= VEN[3] && (y >= 46 || Math.hypot(x - 216, (y - 46) * 1.0) <= 30);
const cuarto = () => fijo('colonial', () => {
  // el muro encalado con grietas y manchas, el techo de vigas oscuras, el zócalo de almagre con su greca
  madera(0, 0, 319, 9, Q.nogS, Q.nog, Q.nogD, Q.nogD, 10, 301);
  moteado(0, 10, 319, 118, Q.cal, Q.calL, Q.calS, 302, 0.08);
  R.rect(0, 10, 319, 11, Q.calD);
  for (const [x, y, n] of [[40, 30, 14], [150, 90, 10], [268, 70, 12], [120, 20, 8]]) { let X = x, Y = y; for (let i = 0; i < n; i++) { R.pset(X, Y, Q.calD); X += hh(i, x, 303) > 0.5 ? 1 : 0; Y += 1; } }
  for (let y = 96; y <= 118; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 96 || y === 97 ? Q.ocreS : hh(x >> 1, y >> 1, 304) > 0.85 ? Q.almagS : Q.almag);
  for (let x = 0; x < 320; x++) { const zz = Math.abs(((x % 12) - 6)); R.pset(x, 100 + Math.floor(zz / 2), Q.calL); }
  // el suelo de barro cocido en perspectiva, con sus juntas
  for (let y = 119; y < 180; y++) { const fila = Math.floor(Math.log(y - 112) * 5.2), w = 10 + (y - 119) * 0.32; for (let x = 0; x < 320; x++) { const cx = (x - 160) / w + fila * 0.5, j = (cx - Math.floor(cx)) < 0.07 || (Math.log(y - 112) * 5.2 - fila) < 0.12;
    R.pset(x, y, j ? hex('#7a3a22') : hh(Math.floor(cx), fila, 306) > 0.6 ? hex('#c06a42') : hh(x, y, 307) > 0.93 ? hex('#a05432') : hex('#b05e3a')); } }
  R.rect(0, 118, 319, 119, hex('#6a3a24'));
  // la ristra de chiles secos y la hornacina con una vela y un jarrito de barro
  R.rect(60, 64, 61, 66, Q.nogS); for (let j = 0; j < 9; j++) { const y = 68 + j * 3, d = j % 2 ? 1 : -1; R.disco(60 + d, y, 2, Q.k); R.disco(60 + d, y, 1, j % 3 ? Q.rojo : Q.rojoS); R.pset(60 + d - 1, y - 1, Q.rojoL); }
  for (let y = 60; y <= 92; y++) for (let x = 8; x <= 40; x++) { const d = y >= 70 || Math.hypot(x - 24, y - 70) <= 16; if (d && (y >= 70 ? x >= 10 && x <= 38 : Math.hypot(x - 24, y - 70) <= 14)) R.pset(x, y, x < 16 ? Q.calD : Q.calS); }
  R.rect(8, 92, 40, 94, Q.calD); R.rect(8, 92, 40, 92, Q.calL); caja(28, 82, 36, 92, Q.ladr); R.rect(29, 83, 35, 83, Q.ladrL); R.rect(26, 80, 38, 82, Q.ladrS);
  // el sarape colgado: franjas de colores, el rombo del centro y los flecos
  { const X0 = 96, X1 = 150, Y0 = 30, Y1 = 80, F = [Q.rojo, Q.naranja ?? Q.amarS, Q.amar, Q.verdeT, Q.aztecaL, Q.rosa, Q.azulT2, Q.rojo];
    R.rect(X0 - 2, Y0 - 3, X1 + 2, Y0 - 2, Q.nogS); R.pset(X0 - 2, Y0 - 4, Q.k); R.pset(X1 + 2, Y0 - 4, Q.k);
    for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { let c = F[Math.floor((y - Y0) / 4) % F.length]; if ((x + y) % 2 && (y - Y0) % 4 === 0) c = Q.blanco;
      const d = Math.abs(x - 123) + Math.abs(y - 55); if (d < 16) c = d < 6 ? Q.amar : d < 11 ? Q.k : Q.blanco; R.pset(x, y, c); }
    for (let x = X0; x <= X1; x += 2) R.rect(x, Y1 + 1, x, Y1 + 4, Q.blancoS); }
  // la repisa con tres jarros de talavera
  R.rect(14, 54, 84, 56, Q.nog); R.rect(14, 54, 84, 54, Q.nogL); R.rect(20, 57, 21, 62, Q.nogS); R.rect(77, 57, 78, 62, Q.nogS);
  for (const [x, w, h] of [[26, 7, 14], [46, 9, 18], [68, 6, 11]]) { R.disco(x, 54 - h / 2, w, Q.k); R.disco(x, 54 - h / 2, w - 1, Q.blanco); R.rect(x - 3, 54 - h - 2, x + 3, 54 - h + 2, Q.k); R.rect(x - 2, 54 - h - 1, x + 2, 54 - h + 2, Q.blanco);
    for (let a = 0; a < 6; a++) R.pset(x + Math.round(Math.cos(a) * (w - 3)), Math.round(54 - h / 2 + Math.sin(a) * (w - 3)), Q.talav); R.disco(x, 54 - h / 2, 2, Q.talav); R.rect(x - w + 1, 53, x + w - 1, 53, Q.k); }
  // el hueco de la ventana con su derrame, las contraventanas de madera abiertas y el alféizar con un geranio
  for (let y = 12; y <= 104; y++) for (let x = 176; x <= 256; x++) { const dentroD = x >= VEN[0] - 6 && x <= VEN[2] + 6 && y <= VEN[3] + 4 && (y >= 46 || Math.hypot(x - 216, y - 46) <= 36); if (dentroD && !dentroV(x, y)) R.pset(x, y, x < 216 ? Q.calS : Q.calD); }
  for (const [x0, x1] of [[164, 178], [254, 268]]) { caja(x0, 44, x1, 98, Q.roble); for (let y = 48; y < 96; y += 8) { R.rect(x0 + 2, y, x1 - 2, y + 5, Q.robleS); R.rect(x0 + 3, y + 1, x1 - 3, y + 4, Q.robleL); } R.rect(x0 === 164 ? x1 - 1 : x0 + 1, 60, x0 === 164 ? x1 - 1 : x0 + 1, 64, Q.negro); }
  R.rect(180, 96, 252, 101, Q.calD); R.rect(180, 96, 252, 96, Q.calL);
  caja(236, 88, 246, 96, Q.ladr); R.rect(237, 89, 245, 89, Q.ladrL); for (const [dx, dy] of [[-3, -3], [2, -5], [5, -2]]) { R.disco(241 + dx, 86 + dy, 2, Q.hierba); } R.disco(240, 80, 2, Q.rojo); R.disco(243, 82, 1, Q.rojoL);
  // el arcón (la tapa se pinta en vivo)
  caja(22, 126, 92, 160, Q.nog); madera(23, 127, 91, 159, Q.nog, Q.nogL, Q.nogS, Q.nogD, 8, 305);
  for (const x of [30, 84]) { R.rect(x - 2, 126, x + 2, 160, Q.k); R.rect(x - 1, 127, x + 1, 159, Q.grisS); for (let y = 130; y < 158; y += 6) R.pset(x, y, Q.grisL); }
  caja(52, 132, 62, 144, Q.oroS); R.rect(56, 136, 58, 140, Q.k); R.rect(22, 160, 92, 162, hex('#3a2416'));
  // la mesa de escribir con el tintero, la pluma y el papel
  caja(212, 130, 314, 136, Q.nog); R.rect(213, 131, 313, 131, Q.nogL); caja(216, 136, 222, 172, Q.nogS); caja(304, 136, 310, 172, Q.nogS); caja(222, 136, 304, 146, Q.nog); R.rect(223, 137, 303, 137, Q.nogL);
  caja(256, 139, 270, 143, Q.oroS); R.rect(262, 140, 264, 141, Q.k);
  caja(232, 124, 238, 130, Q.negro); R.pset(234, 125, Q.grisL); raya(236, 124, 244, 112, Q.blanco, 0); raya(237, 124, 245, 112, Q.blancoS, 0);
  for (let k = 2; k >= 0; k--) caja(272 + k, 125 - k, 300 + k, 130 - k, k ? Q.pergS : Q.perg);
  // el haz de luz de la ventana sobre el suelo
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { const a = x - 186 + (y - 100) * 0.55, b = 246 + (y - 100) * 0.55 - x; if (a > 0 && b > 0 && y > 118 && ((x + y) & 1)) R.pset(x, y, mez(R.pget(x, y), Q.luz, 0.22)); }
  // la percha del loro
  R.rect(270, 92, 271, 160, Q.nogS); R.rect(262, 92, 280, 93, Q.nog); R.rect(264, 158, 278, 161, Q.nogS); R.rect(277, 94, 279, 97, Q.ladr);
});
const p4 = (t) => {
  cuarto();
  // por la ventana: el cielo, las nubes, el volcán humeante, el campanario con la campana que se mueve y los magueyes
  R.recorte([VEN[0], 16, VEN[2], VEN[3]]);
  for (let y = 16; y <= VEN[3]; y++) for (let x = VEN[0]; x <= VEN[2]; x++) if (dentroV(x, y)) R.pset(x, y, [Q.c1, Q.c2, Q.c3, Q.c4][Math.min(3, Math.floor((y - 16) / 18 + ((x + y) % 3) * 0.15))]);
  for (let i = 0; i < 3; i++) { const x = 180 + ((i * 41 + t * (2 + i)) % 90), y = 30 + i * 9; R.disco(Math.round(x), y, 4 + i, Q.nubeS); R.disco(Math.round(x) - 1, y - 1, 3 + i, Q.nube); }
  R.poligono([[192, 86], [218, 52], [226, 52], [248, 86]], Q.lejosS); R.poligono([[212, 60], [218, 52], [226, 52], [232, 60], [226, 58], [220, 61]], Q.blanco);
  for (let k = 0; k < 5; k++) { const u = (t * 0.25 + k / 5) % 1; R.disco(Math.round(222 + u * 10 + Math.sin(t + k) * 2), Math.round(48 - u * 16), 2 + Math.round(u * 2), u < 0.5 ? Q.blancoS : Q.nubeS2); }
  caja(190, 52, 204, 96, Q.amarS); R.rect(191, 53, 203, 95, hex('#e0b860')); R.rect(194, 58, 200, 68, Q.k); R.poligono([[188, 52], [197, 42], [206, 52]], Q.tejaS);
  { const a = Math.sin(t * 3) * 0.5, bx = Math.round(197 + Math.sin(a) * 3); R.disco(bx, 64, 3, Q.bronce); R.pset(bx - 1, 63, Q.bronceL); R.pset(bx, 67, Q.k); }
  for (let x = VEN[0]; x <= VEN[2]; x++) { const y0 = 88 + Math.round(Math.sin(x * 0.3) * 1.5); for (let y = y0; y <= VEN[3]; y++) R.pset(x, y, y === y0 ? Q.hierbaL : Q.hierba); }
  for (const [x, s] of [[212, 1], [236, 0.8]]) for (let k = -3; k <= 3; k++) R.linea(x, 94, Math.round(x + k * 3 * s), Math.round(94 - (8 - Math.abs(k)) * s * 1.6), k % 2 ? Q.cacS : Q.cacL);
  R.recorte(null);
  // el polvo en el haz de luz
  for (let i = 0; i < 14; i++) { const u = (t * 0.06 + hh(i, 1, 310)) % 1, x = Math.round(196 + u * 40 + hh(i, 2, 310) * 50), y = Math.round(104 + u * 60 + Math.sin(t + i) * 3); if (i % 2) R.pset(x, y, Q.calL); }
  // el loro en su percha, que cabecea y en «afterward» abre las alas
  { const ab = t > AFTER + 0.3 && t < AFTER + 1.2, b = Math.sin(t * 4) > 0.5 ? 1 : 0, x = 270, y = 91;
    R.rect(x - 2, y - 10 + b, x + 3, y, Q.k); R.rect(x - 1, y - 9 + b, x + 2, y - 1, Q.loroR); R.rect(x - 1, y - 13 + b, x + 2, y - 9 + b, Q.loroR); R.pset(x + 3, y - 11 + b, Q.amar); R.pset(x + 1, y - 12 + b, Q.k); R.rect(x - 3, y - 5, x - 2, y + 6, Q.loroA);
    if (ab) { R.poligono([[x - 1, y - 7], [x - 10, y - 14], [x - 6, y - 4]], Q.loroV); R.poligono([[x + 2, y - 7], [x + 11, y - 14], [x + 7, y - 4]], Q.loroV); } else R.rect(x - 1, y - 6, x, y - 2, Q.loroV); }
  // la vela de la mesa
  { const f = Math.sin(t * 13) > 0 ? 1 : 0; caja(298, 116, 302, 130, Q.blanco); R.rect(299, 112 - f, 301, 115, Q.amar); R.pset(300, 111 - f, Q.amarL); R.pset(300, 114, Q.blanco); }
  // el arcón se abre en «someone»: la tapa sube y salta el polvo; dentro, las hojas viejas
  const ab = ease(tramo(t, SOMEONE, SOMEONE + 0.5)), h = Math.round(4 + ab * 26);
  if (ab > 0) { R.rect(23, 124, 91, 128, hex('#2a1a10')); for (let k = 0; k < 4; k++) caja(28 + k * 2, 122 - k, 86 - k * 3, 127 - k, k % 2 ? Q.pergS : Q.perg); }
  R.poligono([[22, 126], [92, 126], [94 - ab * 2, 126 - h], [20 + ab * 2, 126 - h]], Q.k); R.poligono([[23, 125], [91, 125], [92 - ab * 2, 127 - h], [22 + ab * 2, 127 - h]], ab > 0.4 ? Q.nog : Q.nogL);
  if (h > 8) { for (let y = 128 - h; y < 125; y += 5) R.rect(25, y, 89, y, Q.nogS); for (let y = 129 - h; y < 125; y += 5) R.rect(25, y, 89, y, Q.nogL); R.rect(25, 127 - h, 89, 128 - h, Q.grisS); }
  for (const x of [30, 84]) R.linea(x, 126, x + Math.round((x < 57 ? 1 : -1) * ab * 2), 127 - h, Q.grisS);
  if (t > SOMEONE && t < SOMEONE + 2.2) polvo(57, 122, t - SOMEONE, 18, 3);
  // el escribano: viene al arcón, saca una hoja (su «1420» en «old sheets»), la lleva a la mesa y se rasca la cabeza
  const v1 = tramo(t, P4 + 0.1, SOMEONE - 0.15), v2 = tramo(t, OLD + 0.3, AFTER + 0.5), x = Math.round(lerp(lerp(236, 96, ease(v1)), 196, ease(v2)));
  const coge = t > WRITE - 0.2, deja = t > AFTER + 0.55;
  const es = R.actor(EL.escribano, x, 160, t, { dir: v2 > 0 ? 1 : -1, anda: (v1 > 0 && v1 < 1) || (v2 > 0 && v2 < 1), sostiene: (coge && !deja) ? true : (t > SOMEONE - 0.2 && t < WRITE - 0.2) ? [62, 124] : false, dedo: deja && t > AFTER + 0.8, sorpresa: t > SOMEONE && t < SOMEONE + 0.6 });
  const hoja = (hx, hy) => { pergamino(hx - 7, hy - 9, hx + 7, hy + 1, 9); R.rect(hx - 4, hy - 6, hx + 3, hy - 6, Q.pergD); R.rect(hx - 4, hy - 3, hx + 1, hy - 3, Q.pergD); };
  if (coge && !deja) hoja(es.mano[0], es.mano[1]);
  if (deja) hoja(256, 129);
  if (t > OLD - 0.1) { const s = ease(tramo(t, OLD - 0.1, OLD + 0.3)), lx = deja ? 256 : es.mano[0], ly = (deja ? 129 : es.mano[1]) - 14;
    caja(lx - 17, ly - 9, lx + 17, ly + 1, Q.oroD); R.numero('1420', lx - 14, ly, { color: s >= 1 ? Q.oroL : Q.oro, sombra: false }); }
  if (t > AFTER + 0.8) globo(es.cabeza[0], es.cabeza[1] - 6, '?');
};

const efectos = [[PROP + 0.1, 'brillo'], [MEX - 0.2, 'papel'], [AZTEC + 0.05, 'brillo'], [AMER, 'bip'], [EURO + 0.1, 'whoosh'], [ARR + 0.1, 'interruptor'], [SOMEONE + 0.05, 'cerrojo'], [WRITE, 'papel'], [AFTER + 0.8, 'pop']];
const año = (t) => t < BUT ? 2013 : t < P4 ? Math.round(lerp(2013, 1420, ease(tramo(t, BUT, VELL + 0.6))) + lerp(0, 72, ease(tramo(t, EURO, ARR)))) : Math.round(lerp(1492, 1550, ease(tramo(t, P4, SOMEONE))));
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
'''))

# ──────────────────────────────────────────────────────────────────
E['vm-ia'] = ('Los anuncios', '''// VM-IA (frase 21): cada pocos años, alguien dice que lo ha resuelto. Cinco planos:
// 1. fondo local: la sala de prensa: en el atril, cada pocos años alguien distinto alza el libro entre flashes; el
//    contador del telón pasa 1921, 1945, 1978, 2004 y se para en 2018 en «2018»; el público de espaldas con cámaras;
// 2. «researchers»: la sala de ordenadores de noche (2018): los dos investigadores de sudadera tras la mesa; en
//    «artificial intelligence» la pantalla de pared lee la página y escupe palabras de bloques; en «Hebrew» sale el
//    rollo con un «?», él da un salto con su «!» y ella señala;
// 3. «In 2019»: fondo local, el aula británica con lluvia en la ventana y un autobús rojo: el académico dibuja con tiza
//    el árbol de las lenguas; en «lost» crece una rama punteada hasta el libro con un «?»; los alumnos de espaldas;
// 4. «Manuscript experts»: la gráfica de cerca con las dos propuestas (azul 2018, ámbar 2019) en palabras de bloques;
//    en «reviewed» una franja las repasa y en «rejected» cae el sello del «no» en cada una, a la vez que una mano sella
//    los dos impresos de la mesa;
// 5. «The translated words»: inserto local, las fichas de palabras en el riel de una frase: las manos meten una, la
//    siguiente no encaja y salta en «didn't», otra en «form», y en «made sense» el riel se vuelca con un «?».''', marcas('vm-ia', COMUN + COMUN8 + r'''
const P2 = @4.58@, P3 = @9.50@, P4 = @14.44@, P5 = @18.66@;
const ANUNCIA = @1.70@, Y18 = @3.64@, ART = @5.66@, PROG = @6.88@, SAID = @7.76@, HEB = @8.58@;
const BRIT = @10.72@, CLAIM = @11.48@, LOST = @12.42@, LANG = @13.20@;
const EXP = @15.08@, REV = @15.52@, REJ = @17.52@, THEM = @17.94@, WORDS = @19.32@, DIDNT = @19.86@, FORM = @20.28@, SENSE = @21.48@;

// ── plano 1: la sala de prensa ──
const ANOS = [1921, 1945, 1978, 2004, 2018], CAMBIOS = [0, 0.75, 1.5, 2.45, Y18];
const turno = (t) => { let i = 0; for (let k = 1; k < 5; k++) if (t >= CAMBIOS[k]) i = k; return i; };
const prensa = () => fijo('prensa', () => {
  // la pared con paneles y su zócalo, el telón azul con el libro en pictograma repetido, la tarima
  moteado(0, 0, 319, 118, hex('#c8bca8'), hex('#d8ceba'), hex('#b0a490'), 401, 0.08);
  for (let x = 0; x < 320; x += 40) R.rect(x, 0, x, 118, hex('#b0a490'));
  madera(0, 96, 319, 118, Q.nog, Q.nogL, Q.nogS, Q.nogD, 11, 402);
  for (let y = 20; y <= 112; y++) for (let x = 64; x <= 256; x++) { const p = (x - 64) % 12; R.pset(x, y, p < 2 ? Q.telonS : p > 9 ? Q.telonL : Q.telon); }
  for (let j = 0; j < 7; j++) for (let i = 0; i < 12; i++) { if ((i + j) % 2) continue; const x = 68 + i * 16, y = 20 + j * 14; if (x > 108 && x < 212 && y < 104) continue; R.rect(x, y, x + 5, y + 4, Q.telonL); R.rect(x + 2, y, x + 3, y + 4, Q.telonS); }
  R.rect(62, 18, 258, 20, Q.oroS); R.rect(62, 18, 258, 18, Q.oroL);
  // la pantalla del telón (el libro se pinta en vivo)
  caja(110, 24, 210, 72, Q.blancoS); R.rect(112, 26, 208, 70, hex('#1a2440'));
  // el cartel del contador bajo la pantalla
  caja(118, 76, 202, 98, Q.k); R.rect(119, 77, 201, 97, hex('#141a30')); R.rect(119, 77, 201, 77, hex('#2a345a'));
  // la tarima de madera con su canto y la moqueta
  madera(0, 118, 319, 126, Q.roble, Q.robleL, Q.robleS, Q.robleD, 4, 403); R.rect(0, 126, 319, 128, Q.robleD);
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x >> 1, y >> 1, 404) > 0.8 ? Q.moqS : (x + y * 2) % 7 === 0 ? Q.moqL : Q.moq);
  // dos plantas en macetas a los lados y la jarra de agua
  for (const x of [34, 284]) { caja(x - 8, 100, x + 8, 118, hex('#d8d4cc')); R.rect(x - 7, 101, x + 7, 102, Q.blanco); for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.32, L = 18 + (k % 3) * 5; raya(x, 100, Math.round(x + Math.cos(a) * L), Math.round(100 + Math.sin(a) * L), k % 2 ? Q.seto : Q.setoL, 1); } }
  // la cámara de televisión en su trípode, a la derecha
  R.linea(256, 150, 248, 176, Q.k); R.linea(256, 150, 264, 176, Q.k); R.linea(256, 150, 256, 176, Q.k);
  caja(244, 132, 270, 148, hex('#3a3a44')); R.rect(245, 133, 269, 134, hex('#5a5a66')); caja(232, 136, 244, 146, Q.negro); R.disco(234, 141, 4, hex('#2a3a5a')); R.pset(233, 139, Q.blanco); R.rect(268, 128, 272, 132, Q.negro);
});
const atril = () => {
  caja(140, 112, 182, 156, Q.nogS); madera(141, 113, 181, 155, Q.nog, Q.nogL, Q.nogS, Q.nogD, 6, 405); R.rect(138, 110, 184, 114, Q.k); R.rect(139, 111, 183, 113, Q.nogL);
  // la lupa en pictograma en el frente
  R.disco(158, 130, 7, Q.oroL); R.disco(158, 130, 5, Q.nogS); raya(163, 135, 169, 141, Q.oroL, 1);
  // tres micrófonos de cuello de cisne
  for (const [x, c] of [[152, Q.rojo], [161, Q.azulT], [170, Q.verdeT]]) { R.linea(x, 110, x + (x < 161 ? 2 : x > 161 ? -2 : 0), 100, Q.grisS); R.rect(x - 1 + (x < 161 ? 2 : x > 161 ? -2 : 0), 96, x + 1 + (x < 161 ? 2 : x > 161 ? -2 : 0), 100, c); }
  caja(176, 104, 181, 110, hex('#bfe4ff')); R.rect(177, 107, 180, 109, hex('#7ab8e8'));
};
const p1 = (t) => {
  prensa();
  const i = turno(t), tc = t - CAMBIOS[i];
  // la pantalla: el libro abierto, que brilla
  PIEZAS_VM.libroVoynich(R, 160, 66, { abierto: true, pagina: ['planta', 'estrellas', 'estanques', 'tarros', 'planta'][i], s: 2, brilla: Math.sin(t * 4) > 0 });
  // el contador de años
  R.numero(String(ANOS[i]), 160, 95, { tam: 16, centro: true, color: i === 4 ? Q.oroL : Q.blanco });
  // quien anuncia (cada pocos años, otro) alza el libro tras el atril
  const QUIEN = [EL.profesor, EL.cientifico, EL.ingeniero, EL.fisica, EL.investigadorIA];
  const sube = ease(tramo(tc, 0.1, 0.4)), x = 153;
  const a = R.actor(QUIEN[i], x, 128, t, { dir: 1, sostiene: [x + 18, Math.round(lerp(114, 102, sube))], sonrisa: true, habla: tc > 0.4 && Math.sin(t * 9) > 0 });
  PIEZAS_VM.libroVoynich(R, a.mano[0], a.mano[1] + 4, {});
  if (t > ANUNCIA && t < ANUNCIA + 0.9) globo(a.cabeza[0], a.cabeza[1] - 4, '!');
  atril();
  // el público de espaldas, con cámaras que disparan el flash en cada cambio
  const PUB = [[18, hex('#2a1c14'), Q.azulTS], [50, hex('#8a5428'), Q.verdeS], [82, hex('#1c1424'), Q.grisS], [114, hex('#c8a060'), Q.tercS], [206, hex('#5a3418'), Q.azulT], [238, hex('#1c1424'), Q.ocreS], [270, hex('#7a7a84'), Q.verdeS], [302, hex('#3a2418'), Q.tercS]];
  PUB.forEach(([px, pelo, ropa], k) => {
    const b = Math.sin(t * 2 + k) > 0.8 ? 1 : 0, py = 160 + (k % 2) * 4 + b;
    nuca(px, py, pelo, ropa);
    if (k % 3 === 1) { const cx = px + 4, cy = py - 14; caja(cx - 6, cy - 4, cx + 6, cy + 4, Q.negro); R.disco(cx, cy, 2, hex('#3a4a6a')); R.rect(cx - 4, cy - 6, cx - 1, cy - 4, Q.negro);
      const f = CAMBIOS.some((c, j) => j > 0 && t > c + 0.02 * k && t < c + 0.14 + 0.02 * k) || (t > ANUNCIA + 0.3 && t < ANUNCIA + 0.42);
      if (f) { destello(cx - 3, cy - 6, 5); for (let r = 2; r < 6; r++) R.pset(cx - 3 + r, cy - 6 - r, Q.blanco); } }
  });
  // la luz roja de la cámara de televisión
  if (Math.sin(t * 5) > 0) R.pset(270, 129, Q.rojoL);
};

// ── plano 2: la sala de ordenadores, de noche ──
const p2 = (t) => {
  const g = T.laboratorio(R, t, { encuadre: 'ordenadores' });
  T.tinte(R, 0, 179, [14, 18, 46], 0.5);
  // la ventana de noche: cielo con estrellas, la luna, el edificio de ladrillo con ventanas encendidas
  const V = g.ventana; R.recorte(V);
  for (let y = V[1]; y <= V[3]; y++) for (let x = V[0]; x <= V[2]; x++) R.pset(x, y, y < 50 ? Q.noche : y < 70 ? Q.noche2 : Q.noche3);
  for (let k = 0; k < 14; k++) { const x = V[0] + 2 + Math.round(hh(k, 1, 410) * 52), y = V[1] + 2 + Math.round(hh(k, 2, 410) * 34); if (Math.sin(t * 3 + k * 2) > -0.4) R.pset(x, y, Q.blanco); }
  R.disco(22, 34, 5, Q.ventL); R.disco(24, 33, 4, Q.noche);
  for (let y = 62; y <= V[3]; y++) for (let x = 12; x <= 60; x++) R.pset(x, y, (y - 62) % 4 === 0 ? hex('#3a2a2a') : hex('#4a3030'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) { const on = hh(i, j + Math.floor(t * 0.5 + i), 411) > 0.45; const x = 15 + i * 8, y = 66 + j * 7; R.pset(x, y, on ? Q.ventL : hex('#2a2030')); R.pset(x + 1, y, on ? Q.ventS : hex('#2a2030')); R.pset(x, y + 1, on ? Q.ventS : hex('#2a2030')); R.pset(x + 1, y + 1, on ? Q.ventL : hex('#2a2030')); }
  R.recorte(null);
  R.rect(35, 24, 36, 92, hex('#5a5e6a')); R.rect(8, 56, 64, 57, hex('#5a5e6a'));
  // la pantalla de pared: la página leída por el programa y sus palabras de bloques; en «Hebrew», el rollo con «?»
  const S = g.tele; R.rect(S[0] + 2, S[1] + 2, S[2] - 2, S[3] - 2, Q.pantA);
  R.recorte([S[0] + 2, S[1] + 2, S[2] - 2, S[3] - 2]);
  pergamino(S[0] + 5, S[1] + 6, S[0] + 30, S[3] - 6, 41);
  for (let j = 0; j < 6; j++) renglon(S[0] + 8, S[1] + 13 + j * 6, S[0] + 28, 40 + j, Q.tinta);
  const lee = tramo(t, P2 + 0.3, ART + 0.4); if (lee > 0 && lee < 1) { const y = Math.round(S[1] + 7 + lee * 36); R.linea(S[0] + 5, y, S[0] + 30, y, Q.azulN); R.linea(S[0] + 5, y + 1, S[0] + 30, y + 1, hex('#2a6aa8')); }
  const n = Math.floor(lerp(0, 6, tramo(t, ART, PROG + 0.3)));
  for (let j = 0; j < n; j++) { const y = S[1] + 9 + j * 6; R.linea(S[0] + 32, y - 2, S[0] + 37, y - 2, hex('#2a4a7a')); renglon(S[0] + 40, y, S[0] + 58 - (j % 3) * 4, 60 + j, Q.azulN); }
  if (t > HEB - 0.2) { const s = ease(tramo(t, HEB - 0.2, HEB + 0.2)), x = S[2] - 18, y = S[1] + 22;
    R.rect(x - 8, y - 6, x + 8, y + 6, Q.perg); R.rect(x - 8, y - 6, x + 8, y - 6, Q.pergD); for (const dx of [-9, 9]) { R.rect(x + dx - 1, y - 8, x + dx + 1, y + 8, Q.nog); R.pset(x + dx, y - 9, Q.oro); R.pset(x + dx, y + 9, Q.oro); }
    for (let j = 0; j < 3; j++) R.rect(x - 6, y - 3 + j * 3, x + 5 - j * 2, y - 3 + j * 3, Q.tinta);
    if (s >= 1) R.icono('?', x - 3, y + 11, Q.amarL, Q.k); }
  R.recorte(null);
  for (let k = 0; k < 40; k++) { const x = S[0] + 2 + Math.round(hh(k, 3, 412) * 82), y = S[3] + 1 + Math.round(hh(k, 4, 412) * 16); if ((x + y) % 2) tine(x, y, 0.15, Q.azulN); }
  // las lámparas de mesa: dos charcos de luz cálida
  for (const [lx, ly] of [[112, 128], [238, 128]]) for (let y = ly - 26; y < ly + 14; y++) for (let x = lx - 30; x < lx + 30; x++) { const d = Math.hypot(x - lx, (y - ly) * 1.4); if (d < 30 && ((x + y) & 1)) tine(x, y, 0.22 * (1 - d / 30), Q.luz); }
  // los dos investigadores tras la mesa; ella entra con el café; en «Hebrew», él salta con «!» y ella señala
  const u = tramo(t, P2 + 0.1, ART - 0.2), xa = Math.round(lerp(300, 188, ease(u)));
  const el = R.actor(EL.investigadorIA, 146, 150, t, { dir: 1, salto: t > HEB && t < HEB + 0.5 ? Math.round(Math.sin((t - HEB) / 0.5 * Math.PI) * 6) : 0, sonrisa: t > HEB, sorpresa: t > ART && t < ART + 0.5, habla: t > PROG && t < SAID && Math.sin(t * 8) > 0 });
  const ella = R.actor(EL.investigadoraIA, xa, 150, t, { dir: -1, anda: u > 0 && u < 1, sostiene: t < ART + 0.3 ? true : false, dedo: t > SAID - 0.2, sonrisa: t > HEB, habla: t > SAID && t < HEB && Math.sin(t * 8) > 0 });
  if (t < ART + 0.3) { const [mx, my] = ella.mano; caja(mx - 3, my - 5, mx + 3, my + 1, Q.blanco); R.rect(mx - 2, my - 4, mx + 2, my - 4, hex('#6a4024')); R.pset(mx + 4, my - 2, Q.blanco); }
  T.laboratorioDelante(R, t, { encuadre: 'ordenadores' });
  if (t > HEB && t < HEB + 1.1) globo(el.cabeza[0], el.cabeza[1] - 4, '!');
};

// ── plano 3: el aula británica, 2019 ──
const aula = () => fijo('aula', () => {
  // la pared de yeso verde pálido, el friso de roble, la ventana alta de guillotina (la lluvia, en vivo)
  moteado(0, 0, 319, 112, hex('#c8d0b8'), hex('#d8dec8'), hex('#aab49c'), 420, 0.07);
  madera(0, 98, 319, 124, Q.roble, Q.robleL, Q.robleS, Q.robleD, 13, 421); for (let x = 6; x < 320; x += 30) { R.rect(x, 101, x + 24, 101, Q.robleL); R.rect(x, 101, x, 121, Q.robleL); R.rect(x + 24, 101, x + 24, 121, Q.robleD); R.rect(x, 121, x + 24, 121, Q.robleD); }
  caja(6, 18, 62, 96, Q.blancoS); R.rect(7, 19, 61, 95, Q.blanco); R.rect(33, 19, 34, 95, Q.blanco); R.rect(7, 56, 61, 58, Q.blanco); R.rect(4, 96, 64, 99, Q.blancoS);
  // la pizarra verde con su marco, el polvo de tiza y la repisa con tizas y borrador
  caja(78, 20, 244, 94, Q.nogS); for (let y = 23; y <= 91; y++) for (let x = 81; x <= 241; x++) { const n = hh(x >> 2, y >> 2, 422); R.pset(x, y, n < 0.15 ? Q.pizarraS : n > 0.85 ? Q.pizarraL : Q.pizarra); }
  for (let k = 0; k < 4; k++) for (let i = 0; i < 30; i++) { const x = 90 + k * 40 + i, y = 30 + (k * 17) % 50 + Math.round(Math.sin(i * 0.3) * 3); if (i % 2) R.pset(x, y, mez(Q.pizarra, Q.tiza, 0.2)); }
  R.rect(76, 94, 246, 97, Q.nog); R.rect(76, 94, 246, 94, Q.nogL); R.rect(100, 92, 106, 93, Q.tiza); R.rect(112, 92, 115, 93, Q.amarL); caja(200, 90, 214, 94, Q.nog); R.rect(201, 93, 213, 93, Q.grisL);
  // el reloj de pared y el perchero con un paraguas que gotea, a la derecha (lejos de la esquina de Atom)
  R.disco(262, 62, 9, Q.k); R.disco(262, 62, 8, Q.blanco); R.disco(262, 62, 1, Q.k); for (let a = 0; a < 12; a++) R.pset(262 + Math.round(Math.cos(a * 0.524) * 6), 62 + Math.round(Math.sin(a * 0.524) * 6), Q.grisS);
  R.rect(298, 56, 300, 124, Q.nogS); R.rect(292, 56, 306, 58, Q.nog); raya(292, 60, 288, 104, Q.rojoS, 1); R.poligono([[284, 104], [292, 60], [296, 104]], Q.rojo); R.rect(286, 104, 294, 105, Q.rojoS);
  // la mesa del profesor con libros y la taza de té
  caja(250, 124, 318, 130, Q.nog); R.rect(251, 125, 317, 125, Q.nogL); caja(254, 130, 314, 160, Q.nogS); for (let y = 134; y < 158; y += 8) R.rect(258, y, 310, y + 5, Q.nog);
  for (let k = 0; k < 3; k++) caja(260, 118 - k * 4, 284 - k * 3, 122 - k * 4, [Q.terc, Q.azulTS, Q.verde][k]);
  caja(296, 116, 304, 124, Q.blanco); R.rect(297, 117, 303, 117, hex('#8a5a2a')); R.rect(304, 118, 306, 121, Q.blanco); caja(292, 123, 308, 125, Q.blancoS);
  // el suelo de parquet en espiga
  for (let y = 124; y < 180; y++) for (let x = 0; x < 250; x++) { const a = ((x + y) >> 3) & 1, b = ((x - y) >> 3) & 1; R.pset(x, y, ((x + y) % 8 === 0 || (x - y) % 8 === 0) ? Q.robleD : a ^ b ? Q.roble : Q.robleL); }
  for (let y = 160; y < 180; y++) for (let x = 250; x < 320; x++) R.pset(x, y, ((x + y) % 8 === 0) ? Q.robleD : Q.roble);
});
const NODOS = [[110, 40], [140, 34], [182, 34], [212, 42]];
const p3 = (t) => {
  aula();
  // la lluvia por la ventana: cielo gris, las casas de enfrente, el autobús rojo que pasa y las gotas que resbalan
  R.recorte([7, 19, 61, 95]);
  for (let y = 19; y <= 95; y++) for (let x = 7; x <= 61; x++) R.pset(x, y, y < 50 ? ((x + y) % 3 ? Q.cielG : Q.cielGL) : Q.cielGS);
  for (let i = 0; i < 4; i++) { const x = 8 + i * 14; caja(x, 56 - (i % 2) * 6, x + 12, 90, hex('#6a5a5a')); R.rect(x + 3, 62, x + 5, 66, Q.ventL); R.rect(x + 8, 70, x + 10, 74, hex('#3a3a44')); }
  { const bx = Math.round(((t * 22) % 120) - 50); caja(bx, 70, bx + 34, 90, Q.rojo); R.rect(bx + 1, 71, bx + 33, 72, Q.rojoL); for (let k = 0; k < 6; k++) { R.rect(bx + 3 + k * 5, 74, bx + 6 + k * 5, 77, hex('#bfd8ea')); R.rect(bx + 3 + k * 5, 81, bx + 6 + k * 5, 84, hex('#bfd8ea')); } R.disco(bx + 7, 90, 3, Q.k); R.disco(bx + 27, 90, 3, Q.k); }
  for (let k = 0; k < 40; k++) { const x = 7 + ((k * 13 + Math.floor(t * 40)) % 56), y = 19 + ((k * 29 + Math.floor(t * 90)) % 78); R.pset(x, y, Q.lluvia); R.pset(x - 1, y + 1, Q.lluvia); }
  R.recorte(null);
  R.rect(33, 19, 34, 95, Q.blanco); R.rect(7, 56, 61, 58, Q.blanco);
  for (let k = 0; k < 3; k++) { const y = 98 + ((t * 8 + k * 7) % 22); R.pset(290, Math.round(105 + ((t * 10 + k * 4) % 18)), Q.aguaL); }
  // el árbol de las lenguas, a tiza; en «lost» crece una rama punteada hasta el libro con «?»
  const tz = (x0, y0, x1, y1, f = 1, punteada = false) => { const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0)); for (let i = 0; i <= n * f; i++) { if (punteada && (i >> 1) % 2) continue; const X = Math.round(x0 + (x1 - x0) * i / n), Y = Math.round(y0 + (y1 - y0) * i / n); R.pset(X, Y, Q.tiza); if (hh(X, Y, 423) > 0.4) R.pset(X + 1, Y, Q.tizaS); } };
  tz(160, 88, 160, 60); tz(159, 88, 159, 62);
  const dib = tramo(t, P3, BRIT + 0.4);
  NODOS.forEach(([x, y], k) => { const f = Math.max(0, Math.min(1, dib * 4 - k)); if (f > 0) { tz(160, 62, x, y + 6, f); if (f >= 1) { R.disco(x, y, 4, Q.tiza); R.disco(x, y, 2, [Q.rojoL, Q.amarL, Q.aguaL, Q.rosa][k]); tz(x - 4, y + 6, x - 10, y + 16); tz(x + 4, y + 6, x + 10, y + 16); for (const dx of [-10, 10]) R.disco(x + dx, y + 18, 2, Q.tizaS); } } });
  const r = tramo(t, LOST - 0.1, LANG);
  if (r > 0) { tz(160, 70, 226, 70, r, true); if (r >= 1) { R.rect(220, 62, 236, 76, Q.tiza); R.rect(221, 63, 235, 75, Q.pizarra); R.rect(228, 63, 228, 75, Q.tiza); for (let j = 0; j < 3; j++) { R.rect(222, 66 + j * 3, 226, 66 + j * 3, Q.tizaS); R.rect(230, 66 + j * 3, 234, 66 + j * 3, Q.tizaS); } if (Math.sin(t * 7) > -0.3) R.icono('?', 225, 52, Q.amarL, Q.pizarraS); } }
  // el académico: dibuja con la tiza, se vuelve en «claimed» y alza el dedo; en «lost» señala la rama nueva
  const vuelve = t > CLAIM && t < LOST - 0.1;
  const ac = R.actor(EL.academicoBritanico, vuelve ? 222 : 214, 150, t, { dir: vuelve ? 1 : -1, dedo: !vuelve, sostiene: false, habla: vuelve && Math.sin(t * 8) > 0, sonrisa: t > LANG });
  if (!vuelve && t < LOST) { const [hx, hy] = [214 + 0, 128]; R.pset(hx - 1, hy - 1, Q.tiza); }
  // los alumnos de espaldas en sus pupitres; uno ladea la cabeza con «?» en «language»
  for (let k = 0; k < 7; k++) { const x = 24 + k * 34, ladea = k === 3 && t > LANG ? 1 : 0, y = 154 + (k % 2) * 3 + (Math.sin(t * 1.8 + k) > 0.85 ? 1 : 0);
    nuca(x + ladea, y, [hex('#2a1c14'), hex('#c8a060'), hex('#8a5428'), hex('#1c1424'), hex('#a83a2a'), hex('#5a3418'), hex('#7a7a84')][k], [Q.azulTS, Q.verdeS, Q.tercS, Q.grisS, Q.ocreS, Q.azulT, Q.verde][k]); }
  for (let x = 0; x < 250; x++) { R.pset(x, 172, Q.nogD); for (let y = 173; y < 180; y++) R.pset(x, y, (x + y) % 9 === 0 ? Q.nogL : Q.nog); }
  if (t > LANG + 0.1) globo(126, 140, '?');
  // el vapor del té
  for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1; if (u < 0.8) R.pset(Math.round(300 + Math.sin(t * 2 + k) * 2), Math.round(114 - u * 12), Q.blanco); }
};

// ── plano 4: la gráfica de cerca, las dos propuestas y los sellos del «no» ──
const panel = (x0, x1, col, colS, ano, t, rev, sello, k) => {
  R.rect(x0, 32, x1, 120, hex('#0e1626')); R.rect(x0, 32, x1, 42, colS); R.numero(String(ano), x0 + 4, 41, { color: col, sombra: false });
  libroMini(x1 - 12, 34, Q.pergL, Q.ocreS);
  for (let j = 0; j < 8; j++) { const y = 52 + j * 9;
    if (rev > 0 && Math.abs(j - rev * 8) < 0.7) R.rect(x0 + 1, y - 7, x1 - 1, y + 1, mez(hex('#0e1626'), col, 0.25));
    R.rect(x0 + 3, y - 4, x0 + 5, y - 2, col); renglon(x0 + 9, y, x1 - 8 - ((j * 7 + k) % 4) * 8, 80 + j + k * 9, mez(col, Q.blanco, 0.3));
    if (sello > 0.3 && j % 2 === k % 2) { R.rect(x1 - 7, y - 5, x1 - 3, y - 1, Q.rojo); R.pset(x1 - 6, y - 4, Q.blanco); } }
  selloNo(Math.round((x0 + x1) / 2), 82, 24, sello);
};
const impresoP = (x, y, c) => { caja(x, y, x + 38, y + 22, Q.papel); R.rect(x + 1, y + 1, x + 37, y + 3, c); for (let j = 0; j < 4; j++) renglon(x + 3, y + 9 + j * 4, x + 32 - j * 4, 90 + j, Q.grisS); R.rect(x + 30, y - 2, x + 34, y + 2, Q.metal); };
const p4 = (t) => {
  T.laboratorio(R, t, { encuadre: 'ordenadores', camara: 'grafica', plumas: false });
  const rev = tramo(t, REV, REJ - 0.1), s1 = ease(tramo(t, REJ, REJ + 0.15)), s2 = ease(tramo(t, THEM, THEM + 0.15));
  panel(52, 156, Q.azulN, hex('#1a3a6a'), 2018, t, rev, s1, 0);
  panel(162, 266, Q.ambar, Q.ambarS, 2019, t, rev, s2, 1);
  // en la mesa: los dos impresos, el tampón y la mano que sella
  impresoP(150, 140, Q.azulN); impresoP(200, 146, Q.ambar);
  caja(256, 150, 284, 162, Q.negro); R.rect(258, 152, 282, 160, Q.rojoS);
  if (t > REJ + 0.05) selloNo(169, 152, 6, 1); if (t > THEM + 0.05) selloNo(219, 158, 6, 1);
  const K = [[P4, 300, 214], [EXP + 0.2, 270, 152], [REV + 0.6, 270, 150], [REJ - 0.25, 176, 138], [REJ, 176, 150], [REJ + 0.2, 200, 134], [THEM, 226, 156], [THEM + 0.3, 240, 140], [P5, 300, 214]];
  const [wx, wy] = camino(K, t);
  if (wy < 200) { T.brazo(R, Math.round(wx) + 40, 214, Math.round(wx), Math.round(wy), '#3a4a6a', -1, { codo: [Math.round(wx) + 34, Math.round(wy) + 34] });
    caja(Math.round(wx) - 8, Math.round(wy) - 2, Math.round(wx) + 2, Math.round(wy) + 4, Q.nog); caja(Math.round(wx) - 9, Math.round(wy) + 4, Math.round(wx) + 3, Math.round(wy) + 7, Q.rojo); }
  if (t > REJ && t < REJ + 0.6) globo(104, 56, '!');
};

// ── plano 5: las fichas de palabras que no forman frase ──
const mesaF = () => fijo('mesaF', () => {
  madera(0, 0, 319, 179, Q.nog, Q.nogL, Q.nogS, Q.nogD, 10, 430);
  tapete(20, 40, 300, 172);
  for (let x = 20; x <= 300; x++) { R.pset(x, 40, Q.tapD); R.pset(x, 172, Q.tapD); } for (let y = 40; y <= 172; y++) { R.pset(20, y, Q.tapD); R.pset(300, y, Q.tapD); }
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 170, (y - 70) * 1.3); if ((x + y) & 1) R.pset(x, y, mez(R.pget(x, y), d < 130 ? Q.luz : Q.nogD, d < 130 ? 0.14 * (1 - d / 130) : 0.3)); }
  // el diccionario gordo cerrado, las gafas, la goma con sus migas y bolas de papel
  caja(28, 50, 86, 88, Q.terc); R.rect(29, 51, 85, 53, Q.tercL); R.rect(29, 84, 85, 88, Q.pergS); for (let y = 85; y < 88; y++) R.rect(30, y, 84, y, y % 2 ? Q.perg : Q.pergS); R.rect(50, 60, 66, 62, Q.oro); R.rect(50, 74, 66, 76, Q.oro);
  for (const cx of [104, 120]) { R.disco(cx, 66, 6, Q.k); R.disco(cx, 66, 5, hex('#bfe4ff')); R.pset(cx - 2, 64, Q.blanco); } R.rect(110, 65, 114, 66, Q.k); raya(98, 64, 92, 58, Q.k, 0);
  caja(236, 54, 252, 62, Q.rosa); R.rect(237, 55, 251, 55, Q.blanco); for (let i = 0; i < 6; i++) R.pset(256 + i * 2, 60 + (i % 2), Q.rosaS);
  for (const [x, y] of [[42, 150], [60, 160], [276, 76]]) { R.disco(x, y, 6, Q.blancoS); R.disco(x - 1, y - 1, 5, Q.blanco); R.linea(x - 3, y, x + 2, y - 2, Q.blancoS); R.linea(x - 1, y + 3, x + 3, y + 1, Q.blancoS); }
  // el riel de la frase: una regleta de madera con su ranura
  caja(28, 92, 292, 126, Q.roble); R.rect(29, 93, 291, 94, Q.robleL); R.rect(32, 98, 288, 122, Q.robleD); R.rect(32, 98, 288, 99, Q.k); for (let x = 74; x < 288; x += 42) R.rect(x, 99, x, 122, Q.nogD);
});
const FORMAS = ['tri', 'dis', 'cua', 'tri', 'cua', 'dis'];
const ficha = (x, y, k, c = Q.papel) => {
  x = Math.round(x); y = Math.round(y);
  caja(x, y, x + 34, y + 18, c); R.rect(x + 1, y + 17, x + 33, y + 17, Q.papelS);
  const f = FORMAS[k % 6], cy = y + 9;
  if (f === 'tri') R.poligono([[x + 35, cy - 4], [x + 40, cy], [x + 35, cy + 4]], c); else if (f === 'dis') R.disco(x + 37, cy, 3, c); else R.rect(x + 35, cy - 3, x + 39, cy + 3, c);
  if (f === 'tri') R.poligono([[x, cy - 4], [x + 5, cy], [x, cy + 4]], Q.tapS); else if (f === 'dis') R.disco(x + 1, cy, 3, Q.tapS); else R.rect(x, cy - 3, x + 4, cy + 3, Q.tapS);
  renglon(x + 7, y + 12, x + 31, 120 + k, Q.tinta);
};
const p5 = (t) => {
  mesaF();
  // la ficha 0 entra (encaja), la 1 no encaja y salta en «didn't», la 2 salta en «form»; en «made sense» se vuelca todo
  const vuelca = ease(tramo(t, SENSE, SENSE + 0.6));
  const sitio = (i) => [36 + i * 42, 101];
  // las fichas de abajo, esperando
  for (let i = 3; i < 6; i++) { const b = Math.sin(t * 2 + i) > 0.9 ? 1 : 0; ficha(70 + (i - 3) * 64, 140 - b + Math.round(vuelca * 8), i); }
  // la primera ya en el riel
  { const e = ease(tramo(t, P5 + 0.1, WORDS)), [sx, sy] = sitio(0); ficha(lerp(50, sx, e), lerp(140, sy, e) + vuelca * 30, 0, Q.papel); }
  // la segunda y la tercera: llegan y rebotan
  const salto = (i, t0, t1) => { const [sx, sy] = sitio(i), e = ease(tramo(t, t0, t1)), b = tramo(t, t1, t1 + 0.6), x = lerp(120 + i * 30, sx + 6, e) + b * 18, y = lerp(150, sy, e) - Math.sin(b * Math.PI) * 26 + b * 36;
    ficha(x, y + vuelca * 20, i, b > 0 && b < 0.5 ? hex('#ffd8d0') : Q.papel); if (b > 0 && b < 0.6) R.icono('X', Math.round(sx + 16), sy - 12, Q.rojoL, Q.k); return [x, y]; };
  const f1 = salto(1, WORDS + 0.05, DIDNT), f2 = salto(2, DIDNT + 0.5, FORM + 0.2);
  // las manos: la de la izquierda empuja la primera, la de la derecha las otras dos
  { const [wx, wy] = camino([[P5, 40, 200], [P5 + 0.3, 60, 158], [WORDS, 76, 118], [WORDS + 0.4, 50, 170], [DIDNT + 0.6, 40, 214]], t); if (wy < 196) T.brazo(R, Math.round(wx) - 30, 212, Math.round(wx), Math.round(wy), '#5a3a6a', 1, { codo: [Math.round(wx) - 26, Math.round(wy) + 28] }); }
  { const [wx, wy] = camino([[P5, 300, 214], [WORDS, 170, 172], [DIDNT - 0.1, 128, 120], [DIDNT + 0.4, 172, 166], [FORM, 170, 124], [FORM + 0.5, 210, 168], [SENSE + 0.2, 240, 160], [SENSE + 0.9, 300, 214]], t); if (wy < 196) T.brazo(R, Math.round(wx) + 34, 212, Math.round(wx), Math.round(wy), '#5a3a6a', -1, { codo: [Math.round(wx) + 30, Math.round(wy) + 28] }); }
  if (t > SENSE + 0.3) { const s = Math.sin(t * 6) > -0.5; if (s) { R.rect(150, 18, 172, 46, Q.k); R.rect(152, 20, 170, 44, Q.blanco); R.icono('?', 154, 24, Q.rojo, Q.blanco, 2); } }
  // la taza de café con su vapor
  R.disco(280, 140, 12, Q.k); R.disco(280, 140, 11, Q.blanco); R.disco(280, 139, 8, Q.k); R.disco(280, 139, 7, hex('#4a2a14'));
  for (let k = 0; k < 4; k++) { const u = (t * 0.45 + k / 4) % 1; if (u < 0.85) R.pset(Math.round(280 + Math.sin(t * 2 + k) * (1 + u * 4)), Math.round(130 - u * 22), u < 0.5 ? Q.blanco : Q.blancoS); }
};

const efectos = [[CAMBIOS[1] + 0.02, 'flash'], [ANUNCIA + 0.3, 'flash'], [Y18 + 0.02, 'flash'], [ART + 0.1, 'tecleo'], [HEB, 'bip'], [LOST, 'lapiz'], [REV, 'bip'], [REJ, 'sello'], [THEM, 'sello'], [WORDS, 'golpecito'], [DIDNT, 'boing'], [FORM + 0.2, 'boing'], [SENSE + 0.1, 'papel'], [SENSE + 0.35, 'pop']];
const año = (t) => t < P2 ? ANOS[turno(t)] : t < P3 ? 2018 : t < P4 ? 2019 : t < P5 ? 2019 : 2019;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
'''))

# ──────────────────────────────────────────────────────────────────
E['vm-fraude'] = ('El fraude no cuadra', '''// VM-FRAUDE (frase 22): la teoría del fraude tampoco cuadra. Cuatro planos:
// 1. inserto local: la mesa de la teoría del fraude: la máscara de teatro, el ábaco y la pizarrita; en «hoax» la
//    máscara deja de sonreír, en «add up» la mano corre las cuentas y en «up» la suma acaba en «?»;
// 2. «Making gibberish»: el taller de escribas del siglo XV con cinco pupitres: cinco escribas, cada uno con su tinta;
//    en «five» se encienden los números 1 a 5 y la muestra de letra de cada uno; el viejo se rasca la cabeza;
// 3. «so close»: inserto local, la balanza de latón sobre la mesa de roble: una mano pone el libro de verdad, la otra
//    el galimatías con la máscara; se balancea y en «as hard as» queda igualada con el «=» dorado;
// 4. «That's why»: fondo local, el archivo: el contador de la pared va de 1420 a 2026 y sale «600» en «600»; la
//    bibliotecaria va a cerrar la caja del caso en «close», la tapa salta en «case» con el libro que brilla y un «?».''', marcas('vm-fraude', COMUN + COMUN8 + r'''
const P2 = @4.33@, P3 = @8.95@, P4 = @14.37@;
const HOAX = @1.82@, DOESNT = @2.46@, ADD = @3.12@, UP = @3.42@, GIB = @4.61@, CENT = @5.93@, FIVE = @7.17@, SCR = @7.53@;
const REAL = @10.01@, ALMOST = @11.43@, HARD = @12.07@, BOOK = @13.51@, SEIS = @15.09@, LATER = @15.73@, NOBODY = @16.43@, CLOSE = @17.33@, CASE = @17.59@;

// ── plano 1: la máscara, el ábaco y la suma que no sale ──
const mesaA = () => fijo('mesaA', () => {
  madera(0, 0, 319, 179, Q.nog, Q.nogL, Q.nogS, Q.nogD, 14, 501);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 140, (y - 100) * 1.2); if ((x + y) & 1) R.pset(x, y, mez(R.pget(x, y), d < 150 ? Q.luz : Q.nogD, d < 150 ? 0.2 * (1 - d / 150) : 0.35)); }
  // el libro cerrado con su cinta, unas plumas y un rollo atado, por los bordes
  caja(20, 24, 62, 70, Q.pergS); R.rect(21, 25, 61, 27, Q.perg); R.rect(21, 66, 61, 69, Q.pergD); R.rect(40, 24, 42, 78, Q.rojo); R.rect(40, 78, 42, 82, Q.rojoS);
  raya(62, 168, 100, 150, Q.blanco, 1); raya(64, 168, 100, 152, Q.blancoS, 0); R.pset(62, 168, Q.k);
  caja(232, 64, 288, 78, Q.perg); for (const x of [232, 288]) { R.disco(x, 71, 7, Q.pergD); R.disco(x, 71, 5, Q.pergS); } R.rect(258, 64, 260, 78, Q.rojo);
  // la pizarrita con su marco y la suma a tiza
  caja(146, 20, 232, 56, Q.nogD); for (let y = 23; y <= 53; y++) for (let x = 149; x <= 229; x++) R.pset(x, y, hh(x >> 1, y >> 1, 502) > 0.85 ? hex('#3a4040') : hex('#2a3030'));
  R.numero('1+1=', 156, 44, { color: Q.tiza, sombra: false });
  // el candil de aceite de la izquierda
  caja(20, 132, 52, 140, Q.bronceS); R.poligono([[22, 132], [50, 132], [44, 120], [28, 120]], Q.bronce); R.rect(28, 120, 44, 121, Q.bronceL); R.rect(50, 126, 58, 128, Q.bronce);
});
const p1 = (t) => {
  mesaA();
  // la llama del candil
  { const f = Math.sin(t * 13) > 0 ? 1 : 0; R.rect(57, 120 - f, 60, 125, Q.amar); R.pset(58, 118 - f, Q.amarL); R.pset(58, 123, Q.blanco); for (let y = 100; y < 130; y++) for (let x = 40; x < 80; x++) { const d = Math.hypot(x - 58, y - 120); if (d < 18 && ((x + y) & 1)) tine(x, y, 0.15 * (1 - d / 18), Q.amarL); } }
  // la máscara de teatro: en «doesn't» se le cae la sonrisa
  { const cx = 96, cy = 74, tri = t > DOESNT, bote = t > HOAX && t < HOAX + 0.35 ? -2 : 0;
    R.disco(cx, cy + bote, 22, Q.k); R.disco(cx, cy + bote, 21, Q.blanco); R.disco(cx - 4, cy - 4 + bote, 14, hex('#f8f4ec')); for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI; R.pset(Math.round(cx + Math.cos(an) * 19), Math.round(cy + 6 + Math.sin(an) * 14) + bote, Q.blancoS); }
    for (const dx of [-8, 8]) { R.poligono([[cx + dx - 5, cy - 4 + bote], [cx + dx + 5, cy - 4 + bote], [cx + dx + (tri ? (dx < 0 ? 3 : -3) : 0), cy - 10 + bote]], Q.k); R.rect(cx + dx - 5, cy - 4 + bote, cx + dx + 5, cy - 2 + bote, Q.k); }
    for (let i = -9; i <= 9; i++) { const y = cy + 10 + bote + Math.round((tri ? 1 : -1) * (1 - (i * i) / 81) * 5) * -1; R.rect(cx + i, y, cx + i, y + 1, Q.k); if (!tri && Math.abs(i) < 7) R.pset(cx + i, y - 1, Q.rojo); }
    R.disco(cx - 13, cy + 4 + bote, 3, Q.rosa); R.disco(cx + 13, cy + 4 + bote, 3, Q.rosa);
    raya(cx - 21, cy + bote, cx - 34, cy + 22, Q.negro, 0); raya(cx + 21, cy + bote, cx + 32, cy + 24, Q.negro, 0);
    if (t > DOESNT && t < DOESNT + 0.4) R.icono('!', cx + 18, cy - 28, Q.rojoL, Q.k); }
  // el ábaco: marco de madera, cinco varillas con cuentas de colores; la mano corre las cuentas en «add up»
  caja(116, 100, 276, 166, Q.robleS); caja(120, 104, 272, 162, Q.robleD); R.rect(121, 105, 271, 161, hex('#2a1c14'));
  const corre = ease(tramo(t, ADD - 0.2, UP));
  for (let j = 0; j < 5; j++) { const y = 110 + j * 12; R.rect(121, y, 271, y, Q.metalL); R.rect(121, y + 1, 271, y + 1, Q.metalS);
    for (let i = 0; i < 6; i++) { const mueve = j === 2 && i < 2, x = 134 + i * 9 + (mueve ? Math.round(corre * 70 * (1 - i * 0.2)) : (j === 4 && i < 1 ? 70 : 0)), c = [Q.rojo, Q.amar, Q.verdeT, Q.azulT, Q.tercL][j];
      R.disco(x, y, 4, Q.k); R.disco(x, y, 3, c); R.pset(x - 1, y - 2, Q.blanco); } }
  // la mano que corre las cuentas
  { const [wx, wy] = camino([[0, 250, 214], [ADD - 0.5, 158, 140], [UP, 222, 140], [UP + 0.4, 250, 170], [P2, 260, 214]], t); if (wy < 196) T.brazo(R, Math.round(wx) + 40, 210, Math.round(wx), Math.round(wy), '#6a4a8a', -1, { codo: [Math.round(wx) + 30, Math.round(wy) + 30] }); }
  // el resultado: en «up» un «?» rojo que salta en la pizarrita
  if (t > UP) { const s = ease(tramo(t, UP, UP + 0.2)), y = Math.round(lerp(60, 28, s)); R.recorte([149, 23, 229, 53]); R.icono('?', 206, y, Q.rojoL, Q.k, 3); R.recorte(null); }
};

// ── plano 2: los cinco escribas ──
const XP = [34, 96, 158, 220, 282], TINTAS = [Q.neg, Q.sepia, Q.rojoT, Q.verdeT, Q.azulT2];
const p2 = (t) => {
  T.laboratorio(R, t, { encuadre: 'escriptorio' });
  const ES = [EL.escriba1, EL.escriba2, EL.escriba3, EL.escriba4, EL.escriba5];
  const heads = ES.map((def, k) => R.actor(def, XP[k] - 7, 150, t, { dir: k < 2 ? 1 : k > 2 ? -1 : 1, dedo: k === 4 && t > GIB && t < CENT + 0.4, sorpresa: k === 4 && t > GIB && t < GIB + 0.4, sonrisa: t > SCR + 0.3, habla: k === 2 && t > GIB && t < CENT && Math.sin(t * 7) > 0 }));
  T.laboratorioDelante(R, t, { encuadre: 'escriptorio', pupitres: XP });
  // cada uno escribe su renglón en su pupitre: la pluma que se mueve y los signos que salen, con su tinta
  XP.forEach((c, k) => { const n = Math.floor(((t - P2) * (1.4 + k * 0.17) + k) % 6), y = 148;
    for (let i = 0; i < n; i++) glifo(k * 5 + i, c - 14 + i * 5, y, 1, TINTAS[k]);
    const px = c - 13 + n * 5 + Math.round(Math.sin(t * 12 + k) * 1.2); raya(px, y - 1, px + 4, y - 9, Q.blanco, 0); R.pset(px, y, Q.k); });
  // en «five», los números 1 a 5 y la muestra de letra de cada uno, en su tinta, encima de las cabezas
  XP.forEach((c, k) => { const s = ease(tramo(t, FIVE + k * 0.14, FIVE + k * 0.14 + 0.25)); if (s <= 0) return; const y = Math.round(lerp(120, 98, s));
    caja(c - 14, y - 12, c + 14, y + 6, Q.perg, TINTAS[k]); R.numero(String(k + 1), c - 10, y + 3, { color: TINTAS[k], sombra: false });
    for (let i = 0; i < 3; i++) glifo(k * 7 + i + 2, c - 1 + i * 5, y + 2, 1, TINTAS[k]); });
  if (t > CENT && t < CENT + 0.8) globo(heads[4].cabeza[0], heads[4].cabeza[1] - 4, '?');
};

// ── plano 3: la balanza igualada ──
const sala = () => fijo('balanza', () => {
  // el muro de sillares con su luz, la hornacina con el reloj de arena y la mesa de roble
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 16), o = (f % 2) * 22, j = (y % 16 === 0) || ((x + o) % 44 === 0); const n = hh(Math.floor((x + o) / 44), f, 511);
    R.pset(x, y, j ? Q.piedraD : hh(x, y, 512) > 0.92 ? Q.piedraS : n > 0.6 ? Q.piedraL : Q.piedra); }
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 160, (y - 60) * 1.1); if ((x + y) & 1) R.pset(x, y, mez(R.pget(x, y), d < 120 ? Q.luz : Q.piedraD, d < 120 ? 0.18 * (1 - d / 120) : 0.25)); }
  for (let y = 48; y <= 104; y++) for (let x = 92; x <= 130; x++) { const ok = y >= 66 ? true : Math.hypot(x - 111, y - 66) <= 19; if (ok) R.pset(x, y, x < 99 ? Q.piedraD : hex('#7a6e5a')); }
  R.rect(90, 104, 132, 107, Q.piedraL);
  madera(0, 128, 319, 179, Q.roble, Q.robleL, Q.robleS, Q.robleD, 9, 513); R.rect(0, 128, 319, 129, Q.robleL); R.rect(0, 140, 319, 141, Q.robleD);
  // en la mesa: el tintero, un pliego, la vela y unas plumas
  caja(30, 132, 40, 142, Q.negro); R.pset(32, 134, Q.grisL); raya(38, 132, 48, 116, Q.blanco, 0); raya(39, 132, 49, 116, Q.blancoS, 0);
  pergamino(262, 134, 306, 158, 12); for (let j = 0; j < 4; j++) renglon(266, 140 + j * 5, 300 - j * 3, 140 + j, Q.tinta);
  caja(286, 108, 292, 134, Q.blanco); R.rect(284, 132, 294, 136, Q.bronce);
});
const p3 = (t) => {
  sala();
  // el reloj de arena de la hornacina, que corre
  { const u = ((t - P3) / 6) % 1, o = 111; R.rect(o - 6, 72, o + 6, 73, Q.nog); R.rect(o - 6, 101, o + 6, 102, Q.nog); R.poligono([[o - 5, 74], [o + 5, 74], [o, 87]], hex('#d8ecf4')); R.poligono([[o - 5, 100], [o + 5, 100], [o, 87]], hex('#d8ecf4'));
    R.poligono([[o - 3, 74 + Math.round(u * 9)], [o + 3, 74 + Math.round(u * 9)], [o, 86]], Q.arena ?? Q.amarS); R.rect(o, 87, o, 99, Q.arena ?? Q.amarS); R.poligono([[o - 4, 100], [o + 4, 100], [o, 100 - Math.round(u * 8)]], Q.arena ?? Q.amarS); }
  // la vela
  { const f = Math.sin(t * 12) > 0 ? 1 : 0; R.rect(288, 103 - f, 290, 107, Q.amar); R.pset(289, 102 - f, Q.amarL); }
  // la balanza: el poste, el astil que oscila y se iguala, las cadenas y los platos
  const pone1 = tramo(t, P3 + 0.2, P3 + 0.8), pone2 = tramo(t, REAL - 0.4, REAL + 0.1);
  const amp = t < REAL ? 0.22 * ease(tramo(t, P3 + 0.6, P3 + 0.9)) : 0.22 * Math.exp(-(t - REAL) * 1.4) * Math.cos((t - REAL) * 5.2);
  const igual = t > HARD - 0.2, ang = igual ? 0 : amp;
  const PX = 160, PY = 48, L = 108, dx = Math.cos(ang) * L, dy = Math.sin(ang) * L;
  caja(150, 120, 170, 132, Q.bronceS); R.rect(151, 121, 169, 122, Q.bronceL); caja(157, 48, 163, 122, Q.bronce); R.rect(158, 50, 158, 120, Q.bronceL); R.poligono([[154, 48], [166, 48], [160, 38]], Q.bronceS);
  R.linea(Math.round(PX - dx), Math.round(PY - dy), Math.round(PX + dx), Math.round(PY + dy), Q.k); R.linea(Math.round(PX - dx), Math.round(PY - dy) - 1, Math.round(PX + dx), Math.round(PY + dy) - 1, Q.bronceL); R.linea(Math.round(PX - dx), Math.round(PY - dy) + 1, Math.round(PX + dx), Math.round(PY + dy) + 1, Q.bronceS);
  R.disco(PX, PY, 4, Q.k); R.disco(PX, PY, 3, Q.oroS); R.pset(PX - 1, PY - 1, Q.oroL);
  // la aguja del fiel
  R.linea(PX, PY, Math.round(PX + Math.sin(ang) * 16), Math.round(PY - Math.cos(ang) * 16), Q.k);
  const plato = (sx, sy) => { sx = Math.round(sx); sy = Math.round(sy); for (const d of [-16, 0, 16]) R.linea(sx, sy, sx + d, sy + 42, Q.grisS); R.poligono([[sx - 22, sy + 42], [sx + 22, sy + 42], [sx + 16, sy + 48], [sx - 16, sy + 48]], Q.k); R.poligono([[sx - 21, sy + 43], [sx + 21, sy + 43], [sx + 15, sy + 47], [sx - 15, sy + 47]], Q.bronce); R.rect(sx - 20, sy + 43, sx + 20, sy + 43, Q.bronceL); return [sx, sy + 42]; };
  const [lx, ly] = plato(PX - dx, PY - dy), [rx, ry] = plato(PX + dx, PY + dy);
  // en el plato de la derecha, el libro de verdad (encuadernado, con sus cantos y la cinta); en el de la izquierda, el
  // galimatías (una hoja de garabatos) con la máscara encima. Llegan en la mano
  const libro = (x, y) => { x = Math.round(x); y = Math.round(y); caja(x - 14, y - 16, x + 14, y, Q.terc); R.rect(x - 13, y - 15, x + 13, y - 14, Q.tercL); R.rect(x - 13, y - 4, x + 13, y - 1, Q.perg); for (let i = -12; i <= 12; i += 2) R.pset(x + i, y - 3, Q.pergS); R.rect(x - 6, y - 12, x + 6, y - 8, Q.oro); R.rect(x + 8, y - 16, x + 9, y + 3, Q.azulT); };
  const garab = (x, y) => { x = Math.round(x); y = Math.round(y); pergamino(x - 15, y - 14, x + 15, y, 14); for (let i = 0; i < 40; i++) { const a = i * 0.7, X = Math.round(x + Math.cos(a) * (2 + i * 0.28)), Y = Math.round(y - 7 + Math.sin(a * 1.3) * (1 + i * 0.12)); R.pset(X, Y, Q.tinta); }
    R.disco(x + 4, y - 16, 7, Q.k); R.disco(x + 4, y - 16, 6, Q.blanco); R.pset(x + 1, y - 18, Q.k); R.pset(x + 7, y - 18, Q.k); for (let i = -3; i <= 3; i++) R.pset(x + 4 + i, y - 13 - (Math.abs(i) < 2 ? 1 : 0), Q.k); };
  if (pone1 >= 1) libro(rx, ry); if (pone2 >= 1) garab(lx, ly);
  // las dos manos que los dejan
  { const [wx, wy] = camino([[P3, 344, 120], [P3 + 0.5, rx + 18, ry - 8], [P3 + 0.8, rx + 20, ry - 10], [P3 + 1.4, 346, 110]], t);
    if (wx < 330) { T.brazo(R, 338, Math.round(wy) + 40, Math.round(wx), Math.round(wy), '#3a6a5a', -1, { codo: [Math.round(wx) + 30, Math.round(wy) + 22] }); if (pone1 < 1) libro(wx - 16, wy + 6); } }
  { const [wx, wy] = camino([[REAL - 0.9, -24, 120], [REAL - 0.4, lx - 18, ly - 8], [REAL + 0.1, lx - 20, ly - 10], [REAL + 0.8, -26, 110]], t);
    if (wx > -10) { T.brazo(R, -18, Math.round(wy) + 40, Math.round(wx), Math.round(wy), '#6a3a3a', 1, { codo: [Math.round(wx) - 30, Math.round(wy) + 22] }); if (pone2 < 1) garab(wx + 16, wy + 6); } }
  // el «=» dorado cuando queda igualada, y sus destellos
  if (igual) { const s = ease(tramo(t, HARD - 0.2, HARD + 0.1)), w = Math.round(10 * s); caja(PX - 16, 66, PX + 16, 92, Q.oroD, Q.k); R.rect(PX - w - 1, 70, PX + w + 1, 75, Q.k); R.rect(PX - w, 71, PX + w, 74, Q.oroL); R.rect(PX - w - 1, 81, PX + w + 1, 86, Q.k); R.rect(PX - w, 82, PX + w, 85, Q.oroL);
    if (Math.sin(t * 8) > 0) { destello(PX - L, PY + 50, 3); destello(PX + L, PY + 50, 3); } }
};

// ── plano 4: el archivo y la caja que no se cierra ──
const archivo = () => fijo('archivo', () => {
  moteado(0, 0, 319, 120, hex('#cfc8b8'), hex('#ddd8ca'), hex('#b4ac9a'), 520, 0.07);
  R.rect(0, 112, 319, 120, hex('#8a8476')); R.rect(0, 112, 319, 112, hex('#a8a294'));
  // las estanterías metálicas con cajas de archivo (números, no letras), a los dos lados
  for (const [x0, x1] of [[4, 96], [226, 316]]) { for (const x of [x0, x1]) R.rect(x, 22, x + 2, 150, Q.metalS);
    for (let s = 0; s < 4; s++) { const y = 46 + s * 28; R.rect(x0, y, x1 + 2, y + 2, Q.metal); R.rect(x0, y, x1 + 2, y, Q.metalL);
      if (x0 > 200 && y < 50) continue;
      let x = x0 + 4; let i = 0; while (x < x1 - 14) { const w = 14 + (i % 3) * 2, h = 18 + ((i + s) % 2) * 3; caja(x, y - h, x + w, y - 1, (i + s) % 4 ? Q.carton : Q.cartonS); R.rect(x + 1, y - h + 1, x + w - 1, y - h + 1, Q.cartonL);
        caja(x + 3, y - h + 5, x + w - 3, y - h + 11, Q.papel, Q.cartonD); R.numero(String((s * 7 + i * 3) % 9 + 1), x + w / 2 - 2, y - h + 11, { color: Q.tinta, sombra: false, fina: true }); x += w + 2; i++; } } }
  // la puerta de cristal esmerilado al fondo, en el centro, y el reloj
  caja(136, 34, 184, 112, Q.nogS); R.rect(140, 38, 180, 70, hex('#c8d8e0')); for (let y = 38; y < 70; y++) for (let x = 140; x <= 180; x++) if ((x + y) % 4 === 0) R.pset(x, y, hex('#b0c4ce')); R.rect(140, 74, 180, 108, Q.nog); R.rect(176, 86, 178, 90, Q.oro);
  R.disco(208, 40, 8, Q.k); R.disco(208, 40, 7, Q.blanco); R.pset(208, 40, Q.k); R.linea(208, 40, 208, 35, Q.k); R.linea(208, 40, 212, 42, Q.k);
  // el contador de la pared (el número va en vivo)
  caja(138, 17, 182, 31, Q.k); R.rect(139, 18, 181, 30, hex('#2a2420'));
  // el suelo de linóleo a cuadros
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { const a = (Math.floor((x - 160) / (14 + (y - 120) * 0.3)) + Math.floor((y - 120) / 10)) & 1; R.pset(x, y, a ? hex('#9a9488') : hex('#b4aea0')); }
  // la mesa de consulta (el tablero; la caja va en vivo) con un flexo
  caja(110, 132, 214, 138, Q.nog); R.rect(111, 133, 213, 133, Q.nogL); caja(114, 138, 120, 172, Q.nogS); caja(204, 138, 210, 172, Q.nogS); R.rect(120, 150, 204, 152, Q.nogS);
  R.rect(116, 128, 128, 132, Q.negro); raya(122, 128, 116, 108, Q.negro, 0); raya(116, 108, 130, 100, Q.negro, 0); R.poligono([[126, 98], [138, 98], [134, 106], [130, 106]], Q.verdeT);
});
const p4 = (t) => {
  archivo();
  // el contador: de 1420 a 2026 y, en «600», el «600» dorado
  const c = ease(tramo(t, P4 + 0.1, LATER)); R.numero(String(Math.round(lerp(1420, 2026, c))), 160, 28, { color: Q.ambar, sombra: false, centro: true });
  if (t > SEIS) { const s = ease(tramo(t, SEIS, SEIS + 0.3)), y = Math.round(lerp(34, 64, s)); R.rect(140, y - 18, 180, y + 2, Q.k); R.rect(141, y - 17, 179, y + 1, Q.oroD); R.numero('600', 160, y - 1, { tam: 16, centro: true }); }
  // la luz del flexo sobre la mesa y las motas
  for (let y = 100; y < 140; y++) for (let x = 120; x < 200; x++) { const d = Math.hypot(x - 150, (y - 130) * 1.6); if (d < 34 && ((x + y) & 1)) tine(x, y, 0.25 * (1 - d / 34), Q.luz); }
  for (let i = 0; i < 6; i++) { const a = t * 2 + i; R.pset(Math.round(134 + Math.cos(a) * (6 + i)), Math.round(110 + Math.sin(a * 1.3) * 5), Q.blancoS); }
  // el ayudante de fondo coloca una caja en la estantería de la izquierda
  { const u = (Math.sin(t * 0.9) + 1) / 2; const a = R.actor(EL.estudiante, 46, 150, t, { dir: 1, sostiene: [62, Math.round(lerp(132, 104, u))] }); caja(a.mano[0] - 7, a.mano[1] - 14, a.mano[0] + 7, a.mano[1], Q.carton); R.rect(a.mano[0] - 6, a.mano[1] - 13, a.mano[0] + 6, a.mano[1] - 13, Q.cartonL); }
  // la caja del caso, con su «?» y el libro dentro: en «close» la bibliotecaria la cierra y en «case» la tapa salta
  const cierra = ease(tramo(t, CLOSE - 0.15, CLOSE + 0.15)), salta = tramo(t, CASE + 0.05, CASE + 0.5);
  const abierta = salta > 0 ? 1 : 1 - cierra, bx = 160, by = 132, sb = salta > 0 && salta < 1 ? Math.round(Math.sin(salta * Math.PI) * 8) : 0;
  // la tapa (por detrás, abierta hacia arriba), el libro asomando y el frente de la caja
  { const h = Math.round(abierta * 22); if (h + sb > 2) { R.rect(bx - 30, by - 30 - h - sb, bx + 30, by - 28, Q.k); R.rect(bx - 29, by - 29 - h - sb, bx + 29, by - 29, Q.cartonS); R.rect(bx - 29, by - 29 - h - sb, bx + 29, by - 28 - h - sb, Q.cartonL); } }
  if (abierta > 0.3) PIEZAS_VM.libroVoynich(R, bx, by - 16 + Math.round((1 - abierta) * 10), { abierto: true, pagina: 'estrellas', brilla: salta > 0, mueve: salta > 0, t });
  caja(bx - 30, by - 28, bx + 30, by, Q.carton); R.rect(bx - 29, by - 27, bx + 29, by - 26, Q.cartonL); R.rect(bx + 23, by - 27, bx + 29, by - 1, Q.cartonS);
  caja(bx - 10, by - 22, bx + 10, by - 6, Q.papel, Q.cartonD); R.icono('?', bx - 3, by - 18, Q.rojo, Q.papel);
  R.numero('408', bx - 26, by - 4, { color: Q.cartonD, sombra: false, fina: true });
  if (abierta <= 0.05 && !salta) R.rect(bx - 31, by - 31, bx + 31, by - 28, Q.cartonL);
  if (salta > 0) { for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + t, r = 10 + salta * 18; R.pset(Math.round(bx + Math.cos(a) * r), Math.round(by - 30 + Math.sin(a) * r * 0.6), Q.oroL); } }
  // la bibliotecaria: entra en «nobody», alarga las manos a la tapa en «close» y da un salto en «case»
  const u = tramo(t, NOBODY - 0.6, CLOSE - 0.3), x = Math.round(lerp(330, 190, ease(u)));
  const bi = R.actor(EL.bibliotecaria, x, 156, t, { dir: -1, anda: u > 0 && u < 1, sostiene: t > CLOSE - 0.4 && t < CASE + 0.1 ? [bx + 22, by - 30] : false, sorpresa: t > CASE, salto: t > CASE && t < CASE + 0.45 ? Math.round(Math.sin((t - CASE) / 0.45 * Math.PI) * 6) : 0 });
  if (t > CASE + 0.3) globo(bx, by - 58, '?');
};

const efectos = [[DOESNT, 'toc'], [ADD, 'tic'], [UP + 0.05, 'pop'], [GIB, 'lapiz'], [FIVE, 'pop'], [P3 + 0.75, 'golpecito'], [REAL + 0.05, 'golpecito'], [HARD - 0.1, 'brillo'], [SEIS, 'tic'], [CLOSE + 0.1, 'golpecito'], [CASE + 0.1, 'boing'], [CASE + 0.35, 'brillo']];
const año = (t) => t < P2 ? 2026 : t < P3 ? 1420 : t < P4 ? 2026 : Math.round(lerp(1420, 2026, ease(tramo(t, P4 + 0.1, LATER))));
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
'''))
