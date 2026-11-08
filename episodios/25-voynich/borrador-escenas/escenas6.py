import re

# Grupo S6 del ep25: vm-carbono, vm-fecha y vm-estadistica (frases 15–17).
# las marcas reales de la voz (atomo/plato/escenas/marcas-ep25.json): marca, inicio y _fin de la frase de cada escena
MARCAS = {'vm-carbono': ('carbono', 1.5, 17.213), 'vm-fecha': ('fecha', 0.5, 19.008), 'vm-estadistica': ('estadistica', 0.5, 20.462)}


def marcas(sc, s):
    # @s@ (segundos de la escena, sacados de linea.json) → en('marca', fracción)
    k, a, b = MARCAS[sc]
    return re.sub(r'@([0-9.]+)@', lambda m: "en('%s', %.4f)" % (k, (float(m.group(1)) - a) / (b - a)), s)


# lo que comparten los fondos locales y los insertos del grupo (la paleta, el ruido, los búferes, el cielo con nubes de
# tres tonos y pájaros, la madera y el ladrillo, copiados de escenas4.py; los signos inventados y el pergamino, de
# escenas2.py) y lo propio del grupo (degradado, cajas, moteado, rayas, la X roja, saguaros, matas, el maletín…)
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

E = {}

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['vm-carbono'] = ('El carbono 14', '''// VM-CARBONO (frase 15), Arizona, 2009, cartela «2009». Cuatro planos:
// 1. fondo local: el laboratorio de Tucson por fuera, en el desierto (montañas, mesetas, saguaros, nubes y un halcón);
//    Hodgins cruza la plaza con el maletín del libro («?» en «couldn't read it»), un correcaminos pasa corriendo; en
//    «science» se le enciende un «!», la puerta de cristal se abre y entra;
// 2. «In 2009»: el laboratorio de radiocarbono: Hodgins entra con el libro y lo deja en la mesa de muestras; el
//    técnico de detrás de la mesa lo abre y en «Arizona» señala el acelerador; la colega del fondo se asombra;
// 3. «tiny samples»: inserto local, el acelerador por dentro: una mano con pinzas mete el trocito de pergamino en el
//    carrusel, el carrusel gira, en «carbon» se dispara el haz; el imán separa los átomos 12 (al vaso) de los 14 (al
//    detector, que los cuenta);
// 4. «the skin»: la mesa de muestras de cerca: las pinzas cortan el trocito y lo dejan en la placa; en «1404» la franja
//    dorada se marca en la pantalla con «1404-1438».''', marcas('vm-carbono', COMUN + r'''
const P2 = @5.30@, P3 = @9.26@, P4 = @13.30@;
const DUDA = @2.40@, CIENCIA = @3.56@, PONE = @7.15@, ARIZONA = @8.38@, FUEGO = @11.16@, F1404 = @14.55@, F1438 = @16.25@;

// ── plano 1: el laboratorio por fuera ──
const exterior = () => capa('ext', () => {
  // la sierra lejana con sus laderas de luz y sombra
  const sierra = (x) => 60 + 6 * Math.sin(x * 0.021 + 1) + 4 * Math.sin(x * 0.067) + 2 * Math.sin(x * 0.19 + 2);
  for (let x = 0; x < 320; x++) {
    const y1 = Math.round(sierra(x)), d = sierra(x + 1) - sierra(x);
    for (let y = y1; y <= 98; y++) { let c = d > 0.2 ? Q.lejosS : Q.lejos; if (y === y1) c = Q.lejosL; else if (hh(x >> 1, y >> 1, 21) > 0.88) c = d > 0.2 ? Q.lejosD : Q.lejosL; if (y > 80 && ((x + y) & 1)) c = Q.lejosS; R.pset(x, y, c); }
    // las mesetas rojas más cerca
    const y2 = Math.round(x > 30 && x < 104 ? 78 + (x < 36 ? (36 - x) * 2 : x > 98 ? (x - 98) * 2 : 0) : 86 + 3 * Math.sin(x * 0.05 + 3) + 2 * Math.sin(x * 0.13));
    for (let y = y2; y <= 98; y++) { let c = Q.meseta; if (y - y2 < 1) c = Q.mesetaL; else if ((y - y2) % 5 === 0) c = Q.mesetaS; else if (hh(x, y, 22) > 0.9) c = Q.mesetaD; else if (x < 40 || (x > 96 && x < 110)) c = Q.mesetaS; R.pset(x, y, c); }
  }
  // el llano: arena con su moteado, piedras y matas, y los saguaros pequeños del fondo
  moteado(0, 96, 319, 136, Q.arena, Q.arenaL, Q.arenaS, 23, 0.14);
  for (let y = 98; y < 136; y += 3) for (let x = (y * 7) % 11; x < 320; x += 11 + (y % 5)) if (hh(x, y, 24) > 0.5) R.pset(x, y, Q.arenaD);
  for (let i = 0; i < 26; i++) { const x = Math.round(hh(i, 1, 25) * 320), y = Math.round(99 + hh(i, 2, 25) * 30); mata(x, y, 2 + Math.round((y - 96) / 12), i); }
  for (const [x, y, h] of [[18, 104, 12], [64, 102, 10], [246, 100, 9], [300, 104, 13]]) saguaro(x, y, h, x);
  // el edificio: dos plantas de hormigón claro con bandas de ventanas, la marquesina y la puerta de cristal (sin letreros)
  const bx0 = 116, bx1 = 306, by0 = 58, by1 = 134;
  caja(bx0 - 3, by0 - 5, bx1 + 3, by0 + 1, Q.hormL); R.rect(bx0 - 2, by0 - 4, bx1 + 2, by0 - 4, Q.blanco);
  moteado(bx0, by0 + 1, bx1, by1, Q.horm, Q.hormL, Q.hormS, 31, 0.1);
  for (let x = bx0 + 24; x < bx1; x += 24) { R.rect(x, by0 + 1, x, by1, Q.hormS); R.rect(x + 1, by0 + 1, x + 1, by1, Q.hormL); }
  R.rect(bx0, 94, bx1, 95, Q.hormD); R.rect(bx0, 96, bx1, 96, Q.hormL);
  R.rect(bx1 - 10, by0 + 1, bx1, by1, Q.hormS); for (let y = by0 + 1; y < by1; y += 2) R.pset(bx1 - 11, y, Q.hormS);
  const ventana = (x, y, w, h, k) => {
    caja(x - 1, y - 1, x + w + 1, y + h + 1, Q.aceroS);
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const d = (i + j) % 17; let c = j < h * 0.4 ? Q.cristalL : j < h * 0.75 ? Q.cristal : Q.cristalS; if (d < 2) c = Q.cristalL; if (d === 2 && j > 3) c = Q.blanco; R.pset(x + i, y + j, c); }
    const per = 2 + Math.round(hh(k, 1, 33) * (h * 0.5));   // la persiana a medio bajar
    for (let j = 0; j < per; j++) R.rect(x, y + j, x + w - 1, y + j, j % 2 ? Q.blancoS : Q.blanco);
    if (hh(k, 2, 33) > 0.6) for (let j = per; j < h; j++) for (let i = 0; i < w; i++) if ((i + j) % 2) R.pset(x + i, y + j, mez(R.pget(x + i, y + j), Q.ventL, 0.35));
    R.rect(x + (w >> 1), y, x + (w >> 1), y + h - 1, Q.aceroS);
    R.rect(x - 1, y + h + 2, x + w + 1, y + h + 2, Q.hormL); R.rect(x - 1, y + h + 3, x + w + 1, y + h + 3, Q.hormD);
  };
  let k = 0;
  for (let x = bx0 + 4; x + 16 < bx1 - 10; x += 24) { ventana(x, 64, 16, 20, k++); if (x + 16 < 194 || x > 234) ventana(x, 102, 16, 20, k++); }
  // la entrada con su marquesina
  caja(196, 98, 236, by1, Q.aceroS); for (let y = 99; y < by1; y++) for (let x = 197; x < 236; x++) R.pset(x, y, y < 112 ? Q.cristalD : hh(x >> 1, y >> 1, 34) > 0.8 ? Q.vidrioL : Q.vidrioS);
  R.rect(200, 118, 232, 122, Q.hormS); R.rect(201, 117, 231, 117, Q.hormL);   // el mostrador de dentro
  for (const lx of [206, 226]) { R.disco(lx, 104, 2, Q.ventL); R.pset(lx, 104, Q.blanco); }
  caja(186, 90, 246, 97, Q.aceroD); R.rect(187, 91, 245, 91, Q.aceroL); for (let x = 188; x < 246; x += 4) R.pset(x, 95, Q.ventL);
  for (let y = 98; y < 102; y++) for (let x = 188; x < 246; x++) if ((x + y) & 1) R.pset(x, y, mez(R.pget(x, y), Q.k, 0.3));
  // la placa de bronce sin letras junto a la puerta
  caja(166, 104, 186, 114, Q.bronce); R.rect(167, 105, 185, 105, Q.bronceL); for (let y = 107; y < 113; y += 2) R.rect(169, y, 183, y, Q.bronceS);
  // las máquinas del tejado
  for (const [x0, w] of [[134, 22], [256, 20]]) { caja(x0, 46, x0 + w, 53, Q.aceroL); for (let x = x0 + 2; x < x0 + w - 1; x += 2) R.rect(x, 48, x, 51, Q.aceroS); R.rect(x0 + 1, 47, x0 + w - 1, 47, Q.blanco); }
  caja(176, 48, 182, 53, Q.acero);
  // la plaza: losas claras, el camino a la puerta, parterres de grava con agaves y biznagas, el aparcabicis y el banco
  moteado(0, 135, 319, 179, Q.piedra, Q.piedraL, Q.piedraS, 35, 0.1);
  for (let y = 135; y < 180; y++) for (let x = 0; x < 320; x++) { const yy = y - 135; if (yy % 11 === 0 || (x + Math.floor(yy / 11) * 9) % 26 === 0) R.pset(x, y, Q.piedraS); }
  R.rect(0, 134, 319, 135, Q.hormD); R.rect(0, 136, 319, 136, Q.piedraL);
  for (const [x0, x1] of [[110, 186], [248, 319]]) { moteado(x0, 138, x1, 148, Q.grava, Q.gravaL, Q.gravaS, x0, 0.25); R.rect(x0, 137, x1, 137, Q.hormS); R.rect(x0, 149, x1, 149, Q.hormD); }
  const agave = (x, y) => { for (let a = -5; a <= 5; a++) { const L = 9 - Math.abs(a) * 0.9; raya(x, y, x + a * 1.6, y - L, Math.abs(a) % 2 ? Q.cacS : Q.cacL, 0); } R.rect(x - 4, y, x + 4, y, Q.cacD); };
  const biznaga = (x, y) => { R.disco(x, y - 3, 4, Q.cacD); R.disco(x, y - 3, 3, Q.cac); R.pset(x - 1, y - 5, Q.cacL); for (let i = -3; i <= 3; i += 2) R.pset(x + i, y - 3, Q.cacS); R.pset(x, y - 7, Q.rosa); R.pset(x + 1, y - 7, Q.amar); };
  agave(122, 146); agave(176, 147); biznaga(150, 147); biznaga(266, 146); agave(300, 146); biznaga(312, 147);
  for (let i = 0; i < 14; i++) R.pset(112 + Math.round(hh(i, 4, 36) * 74), 140 + Math.round(hh(i, 5, 36) * 7), Q.piedraD);
  // el todoterreno blanco aparcado a la izquierda
  caja(4, 132, 60, 150, Q.blanco); R.rect(5, 133, 59, 134, Q.blancoS); caja(14, 122, 50, 134, Q.blancoS);
  for (let y = 124; y < 133; y++) for (let x = 16; x < 49; x++) R.pset(x, y, x === 32 ? Q.aceroS : (x + y) % 9 < 2 ? Q.cristalL : Q.cristalS);
  R.rect(5, 141, 59, 141, Q.aceroS); R.rect(56, 138, 59, 140, Q.amar); R.rect(5, 138, 7, 140, Q.rojo);
  for (const wx of [16, 48]) { R.disco(wx, 150, 6, Q.k); R.disco(wx, 150, 4, Q.negro); R.disco(wx, 150, 2, Q.aceroL); }
  for (let x = 0; x < 64; x++) if ((x & 1) === 0) R.pset(x, 157, Q.piedraD);
  // el banco de la plaza
  caja(250, 140, 290, 143, Q.roble); R.rect(251, 141, 289, 141, Q.robleL); caja(252, 143, 255, 150, Q.aceroS); caja(285, 143, 288, 150, Q.aceroS);
  // el aparcabicis con una bici, la papelera y una losa con un lagarto de piedra (sombras al pie)
  for (let x = 118; x < 170; x += 10) { R.rect(x, 160, x, 172, Q.aceroS); R.rect(x + 6, 160, x + 6, 172, Q.aceroS); R.rect(x, 160, x + 6, 160, Q.aceroL); }
  const rueda = (x, y) => { R.disco(x, y, 6, Q.k); R.disco(x, y, 5, Q.piedraL); R.disco(x, y, 4, Q.k); R.disco(x, y, 3, Q.piedra); R.pset(x, y, Q.aceroS); };
  rueda(130, 168); rueda(150, 168); raya(130, 168, 138, 158, Q.rojo, 0); raya(138, 158, 148, 158, Q.rojo, 0); raya(148, 158, 150, 168, Q.rojo, 0); raya(138, 158, 141, 168, Q.rojo, 0); R.rect(136, 156, 140, 156, Q.k); R.rect(147, 155, 150, 155, Q.k);
  for (let x = 116; x < 172; x++) R.pset(x, 175, Q.piedraS);
  caja(226, 154, 238, 172, Q.aceroS); R.rect(227, 155, 237, 156, Q.aceroL); for (let y = 158; y < 171; y += 3) R.rect(227, y, 237, y, Q.aceroD); R.rect(225, 152, 239, 154, Q.aceroD);
  for (let x = 224; x < 244; x++) R.pset(x, 173, Q.piedraS);
  // la farola
  caja(171, 104, 174, 150, Q.aceroD); caja(167, 100, 178, 105, Q.aceroS); R.rect(168, 104, 177, 104, Q.ventL);
});
const correcaminos = (t) => {
  const u = tramo(t, 0.4, 2.3); if (u <= 0 || u >= 1) return;
  const x = Math.round(lerp(330, -20, u)), y = 168, p = Math.floor(t * 16) % 2;
  R.rect(x, y - 8, x + 9, y - 5, Q.nogS); R.rect(x + 1, y - 7, x + 8, y - 6, Q.robleL); R.rect(x - 2, y - 11, x + 1, y - 7, Q.nogS); R.pset(x - 1, y - 10, Q.blanco); R.pset(x - 3, y - 9, Q.k); R.pset(x - 4, y - 9, Q.k);
  R.rect(x + 9, y - 10, x + 13, y - 8, Q.nogS);   // la cola levantada
  R.rect(x - 1, y - 13, x, y - 12, Q.azulTL);       // la cresta
  raya(x + 3, y - 5, x + 3 + (p ? 3 : -2), y, Q.ocreS, 0); raya(x + 6, y - 5, x + 6 + (p ? -2 : 3), y, Q.ocreS, 0);
  for (let i = 0; i < 4; i++) { const dx = 16 + i * 6, r = 1 + (i >> 1); R.disco(x + dx, y - 1 - (i & 1), r, mez(Q.arenaL, Q.piedra, 0.5)); }
};
const halcon = (t) => { const a = t * 0.9, x = Math.round(84 + Math.cos(a) * 22), y = Math.round(34 + Math.sin(a) * 6), al = Math.sin(t * 5) > 0.3; R.pset(x, y, Q.k); R.pset(x + 1, y, Q.nogS); for (let i = 1; i <= 4; i++) { R.pset(x - i, y - (al ? Math.min(i, 2) : 0), Q.nogS); R.pset(x + 1 + i, y - (al ? Math.min(i, 2) : 0), Q.nogS); } };
const p1 = (t) => {
  fijo('cielo', () => cieloFijo(100));
  R.disco(44, 34, 11, mez(Q.c4, Q.amarL, 0.4)); R.disco(44, 34, 8, Q.amarL); R.disco(44, 34, 6, Q.blanco);
  nubes(t, 20, 52, 2); halcon(t);
  exterior();
  // el árbol palo verde, que se mece, delante de la esquina del edificio
  const sw = Math.sin(t * 1.3) * 1.5;
  raya(104, 134, 102, 112, Q.cacS, 1); raya(102, 116, 92, 104, Q.cacS, 0); raya(103, 118, 114, 102, Q.cacS, 0);
  for (let i = 0; i < 90; i++) { const a = hh(i, 1, 41) * 6.28, d = Math.sqrt(hh(i, 2, 41)) * 16; const X = Math.round(102 + Math.cos(a) * d * 1.3 + sw * (1 - d / 20)), Y = Math.round(100 + Math.sin(a) * d * 0.6); R.pset(X, Y, hh(i, 3, 41) > 0.66 ? Q.verdeL : hh(i, 4, 41) > 0.4 ? Q.cacL : Q.cac); if (i % 9 === 0) R.pset(X + 1, Y, Q.amarL); }
  // el saguaro grande de la izquierda
  saguaro(76, 134, 40, 7);
  // el vapor del tejado y la antena que gira
  for (let i = 0; i < 4; i++) { const f = ((t * 0.6 + i * 0.25) % 1); R.disco(179 + Math.round(Math.sin(t + i) * 2 + f * 6), Math.round(46 - f * 18), 1 + Math.round(f * 2), mez(Q.c4, Q.blanco, 0.6 - f * 0.5)); }
  const an = Math.sin(t * 0.8) * 3; R.rect(224, 44, 224, 53, Q.aceroS); for (let j = -5; j <= 5; j++) R.pset(Math.round(224 + j * 0.8 + an * (j / 5)), 42 + Math.round(Math.abs(j) * 0.4), Q.aceroL); R.pset(224 + Math.round(an), 40, Q.rojo);
  // una silueta que pasa por detrás de una ventana del primer piso
  { const sx = Math.round(152 + Math.sin(t * 0.7) * 6); for (let j = 74; j < 84; j++) for (let i = -2; i <= 2; i++) { const X = sx + i; if (X >= 148 && X <= 163 && (j > 77 || Math.abs(i) < 2)) R.pset(X, j, mez(R.pget(X, j), Q.vidrioS, 0.5)); } }
  correcaminos(t);
  // la estudiante del banco lee y levanta la vista cuando se abre la puerta
  const est = R.actor(EL.estudiante, 262, 150, t, { dir: t > CIENCIA + 0.2 ? -1 : 1, sostiene: t < CIENCIA + 0.2 ? true : false, sonrisa: t > CIENCIA + 0.4 });
  if (t < CIENCIA + 0.2) { const [mx, my] = est.mano; caja(mx - 3, my - 3, mx + 3, my + 2, Q.azulTL); R.rect(mx, my - 2, mx, my + 1, Q.blanco); }
  // Hodgins cruza la plaza con el maletín y entra
  const u = tramo(t, 0.3, 3.3), entra = tramo(t, CIENCIA + 0.6, CIENCIA + 1.3);
  const x = Math.round(lerp(28, 208, u)), y = Math.round(lerp(150, 136, entra));
  const h = R.actor(EL.hodgins, x, y, t, { dir: 1, anda: (u > 0 && u < 1) || (entra > 0 && entra < 1), sostiene: true, sonrisa: t > CIENCIA, sorpresa: t > CIENCIA - 0.1 && t < CIENCIA + 0.4 });
  maletin(h.mano[0], h.mano[1] - 1);
  if (t > DUDA && t < DUDA + 1) globo(x + 7, y - 28, '?');
  if (t > CIENCIA && t < CIENCIA + 0.9) globo(x + 7, y - 28, '!');
  // las dos hojas de cristal de la puerta: se abren y se cierran detrás de él
  const ab = tramo(t, CIENCIA + 0.1, CIENCIA + 0.6) - tramo(t, CIENCIA + 1.5, CIENCIA + 1.9);
  for (const [a, b] of [[198, 215 - Math.round(ab * 16)], [217 + Math.round(ab * 16), 234]]) for (let yy = 99; yy < 134; yy++) for (let xx = Math.max(198, a); xx <= Math.min(234, b); xx++) { const d = (xx + yy) % 19; tine(xx, yy, d < 2 ? 0.55 : 0.32, d < 2 ? Q.blanco : Q.cristal); if (xx === a || xx === b) R.pset(xx, yy, Q.aceroD); }
};

// ── plano 2: el laboratorio de radiocarbono ──
const p2 = (t) => {
  const g = T.laboratorio(R, t);
  const abre = t > PONE + 0.75, u = tramo(t, P2 + 0.05, PONE - 0.3), x = Math.round(lerp(-18, 94, u));
  const col = R.actor(EL.reiffel, 274, 150, t, { dir: -1, sostiene: true, sorpresa: t > PONE + 0.1 && t < PONE + 0.9, sonrisa: t > PONE + 0.9 });
  { const [mx, my] = col.mano; caja(mx - 4, my - 6, mx + 3, my + 3, Q.ocreL); R.rect(mx - 2, my - 7, mx + 1, my - 6, Q.aceroL); for (let j = my - 4; j < my + 2; j += 2) R.rect(mx - 2, j, mx + 1, j, Q.grisS); }
  R.actor(EL.cientifico, 192, 150, t, { dir: -1, sonrisa: t > PONE, dedo: t > ARIZONA - 0.2 && t < ARIZONA + 1.1, habla: t > PONE + 0.8 && t < ARIZONA + 0.6 && Math.sin(t * 9) > 0 });
  const h = R.actor(EL.hodgins, x, 150, t, { dir: 1, anda: u > 0 && u < 1, sostiene: t < PONE ? true : false, dedo: t > ARIZONA + 0.1 && t < ARIZONA + 0.9, sonrisa: t > PONE, habla: t > PONE + 0.2 && t < PONE + 0.9 && Math.sin(t * 8) > 0 });
  T.laboratorioDelante(R, t);
  const [lx, ly] = g.libro;
  if (t < PONE) PIEZAS_VM.libroVoynich(R, h.mano[0], h.mano[1] + 4, {});
  else {
    const v = ease(tramo(t, PONE, PONE + 0.4)), bx = Math.round(lerp(h.mano[0], lx + 17, v)), by = Math.round(lerp(h.mano[1] + 4, ly, v) - Math.sin(v * Math.PI) * 8);
    if (abre) { PIEZAS_VM.libroVoynich(R, lx + 17, ly, { abierto: true, pagina: 'planta' }); if (Math.sin(t * 6) > 0.3) destello(lx + 30, ly - 16, 2); }
    else PIEZAS_VM.libroVoynich(R, bx, by, {});
  }
};

// ── plano 3: el acelerador por dentro ──
const CX = 50, CY = 100, CR = 30, BOCA = [CX, CY - 22];
const corte = () => fijo('corte', () => {
  // la nave: paneles de acero azulados con juntas y remaches
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const px = x % 40, py = y % 30, n = hh(x >> 1, y >> 1, 61);
    let c = n < 0.1 ? Q.aceroS : n > 0.93 ? Q.aceroL : Q.acero;
    if (px === 0 || py === 0) c = Q.aceroD; else if (px === 1 || py === 1) c = Q.aceroL;
    if ((px === 4 || px === 35) && (py === 4 || py === 25)) c = Q.aceroL;
    if ((px === 5 || px === 36) && (py === 5 || py === 26)) c = Q.aceroD;
    R.pset(x, y, mez(c, Q.azulTD, 0.5));
  }
  // la ventana de la sala de control (arriba), con su marco
  caja(108, 20, 204, 58, Q.aceroD); caja(110, 22, 202, 56, Q.azulTD);
  for (let y = 23; y < 56; y++) for (let x = 111; x < 202; x++) R.pset(x, y, y > 44 ? Q.aceroS : hh(x >> 2, y >> 2, 62) > 0.85 ? Q.noche3 : Q.noche2);
  caja(112, 44, 200, 50, Q.aceroD); R.rect(113, 45, 199, 45, Q.aceroL);
  for (const mx of [122, 150, 178]) caja(mx, 32, mx + 16, 43, Q.k);
  for (let y = 23; y < 56; y++) for (let x = 111; x < 202; x++) if ((x - y) % 23 === 0 || (x - y) % 23 === 1) tine(x, y, 0.18, Q.blanco);
  // la bandeja de cables
  R.rect(0, 64, 319, 67, Q.aceroD); R.rect(0, 64, 319, 64, Q.aceroL); for (let x = 0; x < 320; x += 12) R.rect(x, 64, x + 1, 67, Q.aceroS);
  for (const [c, dy] of [[Q.rojo, 0], [Q.amar, 1], [Q.verde, 2]]) for (let x = 0; x < 320; x++) R.pset(x, 62 + dy + Math.round(Math.abs(Math.sin(x * 0.05 + dy)) * 1), c);
  // el suelo de chapa estriada y la franja de peligro
  for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const d = (x * 2 + y * 3) % 9, e = (x * 2 - y * 3 + 900) % 9; R.pset(x, y, d === 0 || e === 0 ? Q.aceroL : hh(x >> 2, y >> 1, 63) > 0.8 ? Q.aceroS : Q.acero); }
  for (let x = 0; x < 320; x++) for (let y = 142; y < 146; y++) R.pset(x, y, ((x + y) >> 2) % 2 ? Q.amar : Q.k);
  // las patas que sostienen el tubo del haz
  for (const lx of [100, 196, 254]) { caja(lx - 2, 104, lx + 2, 142, Q.aceroS); R.rect(lx - 1, 105, lx - 1, 141, Q.aceroL); caja(lx - 6, 139, lx + 6, 142, Q.aceroD); }
  // el tubo del haz, de cristal y acero, con sus bridas
  const tubo = (x0, x1) => { R.rect(x0, 95, x1, 104, Q.k); R.rect(x0, 96, x1, 103, Q.aceroL); R.rect(x0, 97, x1, 97, Q.blanco); R.rect(x0, 98, x1, 101, Q.cristalD); R.rect(x0, 102, x1, 102, Q.aceroS); };
  tubo(80, 262);
  for (const fx of [92, 140, 170, 252]) { caja(fx - 2, 92, fx + 2, 107, Q.aceroL); R.pset(fx, 94, Q.k); R.pset(fx, 105, Q.k); }
  // el tanque del acelerador, con su ventana de corte por la que se ve el tubo
  for (let y = 70; y <= 130; y++) for (let x = 112; x <= 200; x++) { const v = (y - 70) / 60; let c = v < 0.12 ? Q.azulTL : v < 0.6 ? Q.azulT : v < 0.88 ? Q.azulTS : Q.azulTD; if ((x - 112) % 18 < 2) c = Q.azulTD; if (y === 74) c = Q.cristalL; if (x === 112 || x === 200 || y === 70 || y === 130) c = Q.k; R.pset(x, y, c); }
  for (let x = 121; x < 200; x += 18) for (const yy of [73, 127]) R.pset(x, yy, Q.aceroL);
  caja(124, 88, 188, 110, Q.k); for (let y = 89; y < 110; y++) for (let x = 125; x < 188; x++) R.pset(x, y, hh(x >> 1, y >> 1, 64) > 0.85 ? Q.azulTS : Q.azulTD);
  for (let x = 125; x < 188; x++) { R.pset(x, 89, Q.cristalL); R.pset(x, 109, Q.azulTS); }
  tubo(125, 187);
  for (let x = 128; x < 186; x += 8) { R.rect(x, 91, x + 1, 93, Q.cobreL); R.rect(x, 106, x + 1, 108, Q.cobreL); }   // los anillos de aceleración
  // el imán de análisis, rojo, con sus bobinas de cobre
  bisel(206, 80, 238, 118, Q.imanR, Q.imanRL, Q.imanRS); R.rect(207, 95, 237, 104, Q.k); R.rect(207, 96, 237, 103, Q.imanRS);
  for (const yy of [74, 118]) { caja(208, yy, 236, yy + 6, Q.bronce); for (let x = 210; x < 236; x += 2) R.rect(x, yy + 1, x, yy + 5, Q.bronceS); R.rect(209, yy + 1, 235, yy + 1, Q.bronceL); }
  // la salida de los 12 (abajo, al vaso) y la de los 14 (recta, al detector)
  for (let i = 0; i <= 26; i++) { const x = 236 + i * 0.62, y = 106 + i; R.rect(Math.round(x) - 3, y, Math.round(x) + 3, y, Q.k); R.rect(Math.round(x) - 2, y, Math.round(x) + 2, y, Q.aceroL); R.pset(Math.round(x), y, Q.cristalD); R.pset(Math.round(x) - 1, y, Q.cristalD); }
  caja(244, 132, 260, 141, Q.aceroL); R.rect(245, 133, 259, 133, Q.blanco); R.rect(246, 136, 258, 139, Q.aceroS);
  // el detector con su pantalla
  bisel(262, 80, 314, 132, Q.grisL, Q.blanco, Q.gris); caja(268, 88, 308, 104, Q.k); R.rect(269, 89, 307, 103, Q.pantalla);
  for (let x = 268; x < 310; x += 4) R.rect(x, 116, x + 1, 128, Q.grisS);
  for (let i = 0; i < 5; i++) caja(270 + i * 8, 108, 274 + i * 8, 112, i === 0 ? Q.verde : Q.grisS);
  R.numero('14', 288, 78, { centro: true });
  R.numero('12', 236, 156, { centro: true, color: Q.cristalL });
  // el carrusel de muestras: la base
  caja(CX - 12, CY + 28, CX + 12, 142, Q.aceroS); R.rect(CX - 11, CY + 29, CX - 11, 141, Q.aceroL);
  caja(CX + CR - 2, 96, 82, 104, Q.aceroL);
});
const p3 = (t) => {
  corte();
  // la sala de control: las pantallas y el operador
  for (const [k, mx] of [[0, 122], [1, 150], [2, 178]]) { for (let y = 33; y < 43; y++) for (let x = mx + 1; x < mx + 16; x++) R.pset(x, y, (x + y + Math.floor(t * 4) + k) % 7 ? Q.pantalla : Q.verdeL); R.rect(mx + 2, 38 + Math.round(Math.sin(t * 3 + k) * 2), mx + 14, 38 + Math.round(Math.sin(t * 3 + k) * 2), Q.cobreL); }
  { const ox = Math.round(160 + Math.sin(t * 0.9) * 10); R.disco(ox, 41, 3, Q.k); R.disco(ox, 41, 2, Q.nogS); R.rect(ox - 4, 44, ox + 4, 50, Q.k); R.rect(ox - 3, 45, ox + 3, 50, Q.bata); }
  // el carrusel gira para llevar la muestra dorada a la boca del haz
  const rot = ease(tramo(t, P3 + 1.6, FUEGO - 0.2)) * Math.PI / 2;
  R.disco(CX + 1, CY + 2, CR + 1, Q.k); R.disco(CX, CY, CR, Q.k); R.disco(CX, CY, CR - 1, Q.aceroL); R.disco(CX, CY, CR - 4, Q.acero); R.disco(CX - 2, CY - 2, CR - 8, Q.aceroL); R.disco(CX, CY, CR - 9, Q.acero);
  R.disco(CX, CY, 5, Q.aceroD); R.disco(CX, CY, 3, Q.aceroL);
  const dentro = t > P3 + 1.0;
  for (let k = 0; k < 12; k++) {
    const a = -Math.PI / 2 + rot + k * Math.PI / 6, hx = Math.round(CX + Math.cos(a) * 22), hy = Math.round(CY + Math.sin(a) * 22);
    R.disco(hx, hy, 3, Q.k); R.disco(hx, hy, 2, Q.aceroD);
    if (k === 0) { if (dentro) { R.rect(hx - 1, hy - 1, hx + 1, hy, Q.oro); R.pset(hx - 1, hy - 1, Q.oroL); if (Math.sin(t * 7) > 0.2) destello(hx + 3, hy - 3, 2); } }
    else { R.pset(hx, hy, Q.negro); R.pset(hx - 1, hy, Q.aceroS); }
  }
  // el haz: los átomos salen de la boca, cruzan el acelerador y el imán los separa
  if (t > FUEGO) {
    const g = 0.5 + 0.5 * Math.sin(t * 20);
    for (let x = 82; x < 262; x++) if ((x < 112 || x > 200 || (x > 124 && x < 188)) && (x < 207 || x > 237)) { tine(x, 99, 0.45 + g * 0.2, Q.agua); tine(x, 100, 0.45 + g * 0.2, Q.agua); }
    for (let i = 0; i < 22; i++) {
      const s = ((t - FUEGO) * 0.8 + i / 22) % 1; if ((t - FUEGO) * 0.8 < i / 22) continue;
      const pesado = i % 4 === 0; let x, y;
      if (s < 0.7) { x = 82 + (s / 0.7) * 125; y = 99.5; }
      else if (s < 0.8) continue;
      else { const w = (s - 0.8) / 0.2; if (pesado) { x = 238 + w * 26; y = 99.5; } else { x = 236 + w * 17; y = 106 + w * 28; } }
      x = Math.round(x); y = Math.round(y);
      if (x > 112 && x < 124) continue; if (x > 188 && x < 200) continue;
      R.disco(x, y, pesado ? 2 : 1, pesado ? Q.oro : Q.blanco); if (pesado) R.pset(x - 1, y - 1, Q.oroL); else R.pset(x - 1, y, Q.aguaL);
    }
    // el detector cuenta los 14
    const n = Math.max(0, Math.floor((t - FUEGO - 0.5) * 3.6));
    R.numero(String(n), 288, 100, { centro: true, color: Q.amarL });
    if (Math.sin(t * 14) > 0.6) R.disco(272, 110, 1, Q.verdeL);
    if (Math.sin(t * 9) > 0.5) { R.disco(252, 136, 3, Q.aguaL); R.pset(252, 136, Q.blanco); }
  } else R.numero('0', 288, 100, { centro: true, color: Q.grisL });
  // la mano con las pinzas mete el trocito de pergamino en el carrusel
  const ent = ease(tramo(t, P3, P3 + 0.9)) - ease(tramo(t, P3 + 1.25, P3 + 2.0));
  if (ent > 0) {
    const wx = Math.round(lerp(-18, 30, ent)), wy = Math.round(lerp(40, 62, ent));
    const tx = wx + 20, ty = wy + 16;
    T.brazo(R, -6, 30, wx, wy, '#f4f4f8', 1, { puno: '#a8c0e0', sombra: false });
    raya(wx + 10, wy + 1, tx, ty, Q.k, 1); raya(wx + 10, wy, tx, ty - 1, Q.aceroL, 0); raya(wx + 11, wy + 2, tx + 1, ty, Q.aceroS, 0);
    if (!dentro) { R.rect(tx - 1, ty, tx + 1, ty + 1, Q.oro); R.pset(tx - 1, ty, Q.oroL); }
  }
};

// ── plano 4: la mesa de muestras de cerca, con la franja en la pantalla ──
const p4 = (t) => { T.laboratorio(R, t, { camara: 'muestra', corta: tramo(t, P4 + 0.1, P4 + 3.2), franja: tramo(t, F1404, F1438 + 0.2) }); };

const efectos = [[CIENCIA + 0.1, 'puerta'], [DUDA, 'pop'], [PONE + 0.4, 'golpecito'], [P3 + 1.0, 'golpecito'], [FUEGO, 'zumbido'], [FUEGO + 1.2, 'bip'], [P4 + 2.2, 'pop'], [F1404, 'brillo'], [F1438 + 0.3, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '2009', efectos, año: 2009 });
'''))

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['vm-fecha'] = ('La fecha', '''// VM-FECHA (frase 16): la fecha tumba dos teorías. Cuatro planos:
// 1. fondo local: el pasillo del laboratorio con la línea del tiempo en el tablón (1200–1500): Bacon en 1292, la
//    carabela de 1492 y Voynich con su 1912 fuera de escala; Hodgins pega la franja dorada 1404–1438 con el libro; en
//    «knocked down» las dos fichas de teoría se tambalean; en «Roger Bacon's» el colega la señala, la flecha roja mide
//    los 112 años y en «earlier» salta y le planta una X;
// 2. «and it was unlikely»: inserto local, el escritorio de Voynich en 1912: su mano moja la pluma y en «forgery» imita
//    los signos en una hoja; en «unless» la otra mano pasa las hojas en blanco (todas nuevas, blancas), «?»; en «era»
//    cae la X roja;
// 3. «The book»: el escriptorio del siglo XV (1420): tres escribas escriben; en «fifteenth» el del medio levanta la
//    hoja terminada;
// 4. «before Columbus»: fondo local, el mar de 1492: la carabela navega hacia la isla de palmeras, el marinero señala
//    la tierra en «reached», saltan los delfines.''', marcas('vm-fecha', COMUN + r'''
const P2 = @6.90@, P3 = @12.75@, P4 = @16.60@;
const PEGA = @0.85@, TUMBA = @0.62@, BACON = @3.08@, MURIO = @4.54@, ANTES = @6.14@, FORJA = @8.18@, SALVO = @9.94@, ERA = @12.20@, SIGLO = @14.09@, COLON = @16.93@, LLEGA = @17.47@;

// ── plano 1: la línea del tiempo en el pasillo ──
const XY = (yr) => Math.round(30 + (yr - 1200) * 0.7);
const AX = 106;   // el eje
const ficha = (x0, y0, w, h, f, sh = 0, dy = 0) => {
  // una ficha de papel clavada con su chincheta: f pinta el retrato; sh tuerce la ficha (px por fila)
  const pin = [x0 + (w >> 1), y0 + 2];
  for (let j = -1; j <= h; j++) { const o = Math.round((j - 2) * sh); for (let i = -1; i <= w; i++) R.pset(x0 + i + o, y0 + j + dy, j === -1 || j === h || i === -1 || i === w ? Q.k : j > h - 3 ? Q.papelS : Q.papel); }
  for (let j = 0; j < h; j++) R.pset(x0 + w + 1 + Math.round((j - 2) * sh), y0 + j + dy + 1, Q.corchoD);
  f(x0, y0 + dy, sh);
  R.disco(pin[0], pin[1], 2, Q.rojoS); R.disco(pin[0] - 1, pin[1] - 1, 1, Q.rojoL);
};
const retratoBacon = (x, y, sh) => { const px = (i, j, c) => R.pset(x + i + Math.round((j - 2) * sh), y + j, c);
  for (let j = 4; j < 24; j++) for (let i = 6; i < 30; i++) { const dx = i - 18, dy = j - 13; if (dx * dx / 90 + dy * dy / 100 < 1) px(i, j, Q.nogS); }
  for (let j = 8; j < 20; j++) for (let i = 12; i < 24; i++) { const dx = i - 18, dy = j - 14; if (dx * dx / 26 + dy * dy / 34 < 1) px(i, j, Q.piel); }
  for (let i = 13; i < 23; i++) px(i, 8, Q.nogL); px(15, 13, Q.k); px(20, 13, Q.k); px(16, 17, Q.pielS); px(17, 17, Q.pielS); px(18, 17, Q.pielS);
  for (let j = 23; j < 28; j++) for (let i = 8; i < 28; i++) px(i, j, Q.nog);
};
const retratoVoynich = (x, y, sh) => { const px = (i, j, c) => R.pset(x + i + Math.round((j - 2) * sh), y + j, c);
  for (let j = 6; j < 20; j++) for (let i = 11; i < 25; i++) { const dx = i - 18, dy = j - 13; if (dx * dx / 40 + dy * dy / 48 < 1) px(i, j, Q.piel); }
  for (let i = 11; i < 25; i++) { px(i, 6, Q.negro); if (i < 14 || i > 22) px(i, 7, Q.negro); }
  for (const cx of [15, 21]) { px(cx - 1, 12, Q.k); px(cx + 1, 12, Q.k); px(cx, 11, Q.k); px(cx, 13, Q.k); px(cx, 12, Q.blanco); }
  for (let i = 12; i < 25; i++) px(i, 16 - (i < 15 || i > 21 ? 1 : 0), Q.negro);
  for (let j = 20; j < 28; j++) for (let i = 8; i < 28; i++) px(i, j, i === 18 ? Q.blanco : Q.negro);
};
const muro = () => fijo('muro', () => {
  // el techo de placas con la luz
  for (let y = 0; y <= 15; y++) for (let x = 0; x < 320; x++) { const px = x % 32, py = y % 8; R.pset(x, y, px === 0 || py === 7 ? Q.grisL : hh(x, y, 71) > 0.85 ? Q.blancoS : Q.blanco); }
  caja(196, 3, 256, 11, Q.grisL); R.rect(198, 5, 254, 9, Q.luz);
  R.rect(0, 16, 319, 18, Q.grisL); R.rect(0, 16, 319, 16, Q.blanco);
  // la pared verde gris moteada
  moteado(0, 19, 319, 125, Q.verdeP, Q.verdePL, Q.verdePS, 72, 0.08);
  for (let y = 19; y < 125; y++) for (let x = 0; x < 320; x++) if (y < 30 && ((x + y) & 1)) R.pset(x, y, mez(R.pget(x, y), Q.luz, 0.12));
  R.rect(0, 124, 319, 128, Q.grisS); R.rect(0, 124, 319, 124, Q.gris);
  // la rejilla de ventilación y el reloj
  caja(30, 24, 56, 32, Q.grisL); for (let x = 33; x < 54; x += 3) R.rect(x, 26, x, 30, Q.grisS);
  // el tablón: marco de aluminio y corcho
  caja(8, 42, 302, 121, Q.aceroS); R.rect(9, 43, 301, 43, Q.aceroL); R.rect(9, 43, 9, 120, Q.aceroL);
  moteado(11, 45, 299, 118, Q.corcho, Q.corchoL, Q.corchoS, 73, 0.2);
  for (let i = 0; i < 300; i++) R.pset(11 + Math.round(hh(i, 1, 74) * 288), 45 + Math.round(hh(i, 2, 74) * 73), Q.corchoD);
  // notas adhesivas y chinchetas sueltas
  for (const [x, y, c] of [[22, 50, Q.amar], [36, 54, Q.rosa], [130, 50, Q.amar], [196, 52, Q.aguaL]]) { caja(x, y, x + 10, y + 10, c); R.rect(x + 2, y + 3, x + 8, y + 3, mez(c, Q.k, 0.3)); R.rect(x + 2, y + 6, x + 6, y + 6, mez(c, Q.k, 0.3)); R.pset(x + 5, y + 1, Q.azulTL); }
  // el eje con sus marcas y los años
  R.rect(16, AX, 292, AX + 1, Q.negro); for (let k = 0; k < 4; k++) { R.pset(292 + k, AX - 3 + k, Q.negro); R.pset(292 + k, AX + 4 - k, Q.negro); }
  for (let yr = 1200; yr <= 1550; yr += 25) { const x = XY(yr), l = yr % 100 === 0 ? 5 : 2; R.rect(x, AX - l, x, AX - 1, Q.negro); }
  for (const yr of [1200, 1300, 1400, 1500]) R.numero(String(yr), XY(yr), AX + 11, { centro: true, color: Q.negro, sombra: false });
  // la ficha de la carabela de 1492 (no se cae)
  ficha(XY(1492) - 18, 60, 36, 40, (x, y) => {
    for (let j = 3; j < 26; j++) for (let i = 2; i < 34; i++) R.pset(x + i, y + j, j < 15 ? (j < 8 ? Q.c3 : Q.c4) : (i + j) % 5 ? Q.mar : Q.marL);
    R.rect(x + 8, y + 18, x + 26, y + 20, Q.nog); R.rect(x + 10, y + 21, x + 24, y + 21, Q.nogS); R.rect(x + 17, y + 6, x + 17, y + 18, Q.nogS);
    caja(x + 12, y + 8, x + 22, y + 15, Q.tela); R.rect(x + 16, y + 10, x + 18, y + 13, Q.rojo);
    R.numero('1492', x + 18, y + 35, { centro: true, color: Q.negro, sombra: false });
  });
  R.linea(XY(1492), 101, XY(1492), AX - 1, Q.k);
  // el banco y la mochila, la planta y la fuente de agua
  caja(14, 128, 60, 133, Q.roble); R.rect(15, 129, 59, 129, Q.robleL); caja(17, 133, 20, 142, Q.aceroS); caja(54, 133, 57, 142, Q.aceroS);
  caja(40, 120, 52, 128, Q.rojo); R.rect(41, 121, 51, 121, Q.rojoL); R.rect(43, 124, 49, 126, Q.rojoS);
  caja(0, 112, 8, 134, Q.bronce); for (let i = 0; i < 16; i++) raya(4, 112, 4 + Math.round((hh(i, 1, 75) - 0.5) * 18), 88 + Math.round(hh(i, 2, 75) * 18), i % 2 ? Q.cacL : Q.cac, 0);
  caja(302, 100, 318, 142, Q.blanco); R.rect(303, 101, 317, 101, Q.blancoS); caja(304, 78, 316, 100, Q.aguaL); R.rect(305, 79, 315, 82, Q.aguaS); caja(306, 108, 310, 112, Q.azulTL); caja(311, 108, 315, 112, Q.rojo);
  // el suelo de linóleo: baldosas grandes en perspectiva, juntas, el brillo de la luz y el reflejo del tablón
  for (let y = 129; y < 180; y++) for (let x = 0; x < 320; x++) {
    const z = 520 / (y - 100), u = (x - 160) * z / 26, v = z * 1.6, fu = u / 6 - Math.floor(u / 6), fv = v / 5 - Math.floor(v / 5), a = ((Math.floor(u / 6) + Math.floor(v / 5)) & 1);
    let c = a ? Q.piedraL : Q.piedra; if (fu < 0.04 * z / 4 || fv < 0.05) c = Q.piedraS;
    if (hh(x >> 1, y >> 1, 76) > 0.94) c = Q.piedraS; else if (hh(x, y, 77) > 0.97) c = Q.blanco;
    if (y < 142 && x > 10 && x < 300 && ((x + y) & 1)) c = mez(c, Q.corcho, 0.22);
    if (Math.abs(x - 226 + (y - 129) * 0.5) < 10 && ((x + y) & 1)) c = mez(c, Q.blanco, 0.35);
    R.pset(x, y, c);
  }
  // el carrito del laboratorio con cajas de muestras y el maletín, y la señal amarilla de suelo mojado
  caja(232, 136, 286, 140, Q.aceroL); caja(234, 156, 284, 159, Q.aceroL); for (const lx of [235, 282]) caja(lx - 1, 140, lx + 1, 166, Q.aceroS);
  for (const wx of [236, 282]) { R.disco(wx, 168, 2, Q.k); R.pset(wx, 168, Q.grisL); }
  for (const [x0, c] of [[238, Q.azulTL], [254, Q.blanco], [270, Q.ocre]]) { caja(x0, 126, x0 + 13, 136, c); R.rect(x0 + 1, 127, x0 + 12, 127, mez(c, Q.blanco, 0.4)); R.rect(x0 + 4, 130, x0 + 9, 131, mez(c, Q.k, 0.3)); }
  caja(240, 147, 256, 156, Q.aceroL); R.rect(241, 148, 255, 148, Q.blanco); R.rect(240, 151, 256, 151, Q.aceroS); R.rect(246, 145, 250, 146, Q.k);
  for (let k = 0; k < 4; k++) caja(260 + k * 6, 148, 264 + k * 6, 156, [Q.rojo, Q.amar, Q.verde, Q.azulTL][k]);
  R.poligono([[22, 172], [30, 146], [38, 172]], Q.k); R.poligono([[24, 170], [30, 149], [36, 170]], Q.amar); R.rect(29, 156, 30, 162, Q.k); R.rect(29, 165, 30, 166, Q.k);
  caja(44, 162, 60, 174, Q.azulTS); R.rect(45, 163, 59, 164, Q.aguaL); raya(52, 162, 60, 132, Q.nogS, 0); R.rect(56, 130, 64, 133, Q.grisL);
});
const p1 = (t) => {
  muro();
  // el reloj de pared (con su segundero)
  R.disco(236, 30, 8, Q.k); R.disco(236, 30, 7, Q.blanco); for (let k = 0; k < 12; k++) R.pset(236 + Math.round(Math.cos(k * 0.52) * 6), 30 + Math.round(Math.sin(k * 0.52) * 6), Q.grisS);
  R.linea(236, 30, 236, 25, Q.k); R.linea(236, 30, 240, 31, Q.k); { const a = t * 1.05 - 1.57; R.linea(236, 30, 236 + Math.round(Math.cos(a) * 6), 30 + Math.round(Math.sin(a) * 6), Q.rojo); }
  // la burbuja de la fuente de agua
  { const f = (t * 0.7) % 1; R.disco(310, Math.round(98 - f * 16), 1, Q.blanco); }
  // las dos fichas de teoría que se tambalean al tumbarse
  const tam = (k) => { const s = t - TUMBA - k * 0.12; return s > 0 && s < 2 ? Math.sin(s * 18) * Math.exp(-s * 2.2) * 0.22 : 0; };
  const caeB = ease(tramo(t, TUMBA, TUMBA + 0.4)) * 3;
  ficha(XY(1292) - 18, 60, 36, 40, (x, y, sh) => { retratoBacon(x, y, sh); R.numero('1292', x + 18 + Math.round(33 * sh), y + 35, { centro: true, color: Q.negro, sombra: false }); }, tam(0) + (t > TUMBA ? 0.04 : 0), Math.round(caeB));
  ficha(262, 58, 36, 40, (x, y, sh) => { retratoVoynich(x, y, sh); R.numero('1912', x + 18 + Math.round(33 * sh), y + 35, { centro: true, color: Q.negro, sombra: false }); }, tam(1) - (t > TUMBA ? 0.04 : 0), Math.round(caeB));
  for (let x = 252; x < 292; x += 4) R.pset(x, AX - 3, Q.grisS);
  R.linea(XY(1292), 104, XY(1292), AX - 1, Q.k);
  // la franja dorada 1404–1438 con el libro: vuela de la mano de Hodgins al eje
  const hx = Math.round(lerp(134, 166, tramo(t, 0, PEGA - 0.25)));
  const h = R.actor(EL.hodgins, hx, 142, t, { dir: t > PEGA + 0.4 && t < MURIO ? -1 : 1, anda: t < PEGA - 0.25, sostiene: t < PEGA ? [hx + 18, 116] : false, dedo: t > PEGA + 0.5 && t < 2.4, habla: t > PEGA + 0.4 && t < 2.2 && Math.sin(t * 8) > 0, sonrisa: t > PEGA, sorpresa: t > ANTES && t < ANTES + 0.7 });
  const a0 = XY(1404), a1 = XY(1438);
  if (t < PEGA) { const [mx, my] = h.mano; caja(mx - 2, my - 3, mx + 22, my + 1, Q.oro); R.rect(mx - 1, my - 2, mx + 21, my - 2, Q.oroL); }
  else {
    const v = ease(tramo(t, PEGA, PEGA + 0.25)), y = Math.round(lerp(116, AX - 2, v));
    caja(a0, y - 3, a1, y + 3, Q.oroS); R.rect(a0 + 1, y - 2, a1 - 1, y + 2, Q.oro); R.rect(a0 + 1, y - 2, a1 - 1, y - 2, Q.oroL);
    if (Math.sin(t * 6) > 0) for (let x = a0 - 2; x <= a1 + 2; x += 2) { tine(x, y - 5, 0.4, Q.oroL); tine(x, y + 5, 0.4, Q.oroL); }
    const bc = Math.round((a0 + a1) / 2), car = ease(tramo(t, PEGA + 0.2, PEGA + 0.5));
    if (car > 0) { const cy = Math.round(lerp(AX - 6, 66, car)); caja(bc - 13, cy, bc + 13, cy + 30, Q.oroS); caja(bc - 11, cy + 2, bc + 11, cy + 28, Q.blanco); PIEZAS_VM.libroVoynich(R, bc, cy + 25, {}); R.disco(bc, cy + 2, 2, Q.oroS); R.pset(bc - 1, cy + 1, Q.oroL); if (car >= 1) { R.linea(bc, cy + 31, bc, AX - 4, Q.oroS); if (Math.sin(t * 5) > 0.2) destello(bc + 13, cy + 4, 3); } }
  }
  // la flecha roja mide los años entre Bacon y el libro, y el contador llega a 112
  const m = tramo(t, MURIO, ANTES - 0.15);
  if (m > 0) {
    const xa = XY(1292) + 2, xb = Math.round(lerp(xa, a0 - 2, m));
    for (let x = xa; x <= xb; x++) if (((x - xa) >> 1) % 2 === 0) { R.pset(x, 101, Q.rojo); R.pset(x, 102, Q.rojoS); }
    for (let k = 0; k < 3; k++) { R.pset(xb - k, 101 - k, Q.rojo); R.pset(xb - k, 102 + k, Q.rojo); }
    R.numero(String(Math.round(112 * m)), Math.round((xa + a0) / 2) + 4, 97, { centro: true, color: Q.rojo });
  }
  // el colega señala a Bacon, coge la X y salta a pegarla
  const sal = tramo(t, ANTES - 0.45, ANTES + 0.35), alto = Math.round(Math.sin(sal * Math.PI) * 15);
  const c = R.actor(EL.cientifico, 94, 142, t, { dir: 1, dedo: t > BACON - 0.2 && t < MURIO, habla: t > BACON && t < MURIO && Math.sin(t * 9) > 0, sostiene: t > MURIO + 0.2 && t < ANTES ? [112, 116 - alto] : false, salto: alto, sonrisa: t > ANTES + 0.3 });
  if (t > MURIO + 0.2 && t < ANTES) { const [mx, my] = c.mano; tache(mx + 1, my - 3, 3, 1); }
  if (t >= ANTES) { const v = ease(tramo(t, ANTES, ANTES + 0.25)); tache(XY(1292), Math.round(lerp(100, 80, v)), Math.round(lerp(4, 17, v)), 1); }
  // la aspiradora redonda que cruza el pasillo y gira
  { const v = (t * 18) % 260, x = Math.round(70 + (v < 130 ? v : 260 - v)), y = 166; R.disco(x, y, 6, Q.k); R.disco(x, y - 1, 5, Q.negro); R.disco(x, y - 2, 3, Q.grisS); R.pset(x + (v < 130 ? 3 : -3), y - 2, Math.sin(t * 8) > 0 ? Q.verdeL : Q.verde); R.rect(x - 6, y + 1, x + 6, y + 1, Q.piedraS); }
  // un estudiante cruza por delante con su café
  const e = tramo(t, 1.6, 6.6), ex = Math.round(lerp(330, -20, e));
  if (e > 0 && e < 1) { const s = R.actor(EL.estudiante, ex, 172, t, { dir: -1, anda: true, sostiene: true }); const [mx, my] = s.mano; caja(mx - 2, my - 3, mx + 2, my + 2, Q.blanco); R.rect(mx - 1, my - 3, mx + 1, my - 3, Q.nogS); if (Math.sin(t * 6) > 0) R.pset(mx, my - 5, Q.blancoS); }
};

// ── plano 2: el escritorio de Voynich, 1912 ──
const escritorio = () => fijo('esc1912', () => {
  moteado(0, 0, 319, 64, Q.perg, Q.pergL, Q.pergM, 81, 0.07);
  for (let y = 0; y < 64; y++) for (let x = 0; x < 320; x++) { if ((x + y) % 2 && y > 48) R.pset(x, y, mez(R.pget(x, y), Q.pergS, 0.3)); const d = Math.hypot(x - 76, (y - 70) * 1.4); if (d < 50 && ((x + y) & 1)) R.pset(x, y, mez(R.pget(x, y), Q.luz, 0.35 * (1 - d / 50))); }
  // el mapa antiguo enmarcado (Europa en manchas, sin letras)
  caja(100, 22, 160, 58, Q.oroS); caja(103, 25, 157, 55, Q.nogD); for (let y = 27; y < 54; y++) for (let x = 105; x < 156; x++) { const n = Math.sin(x * 0.17 + Math.sin(y * 0.2) * 2) + Math.sin(y * 0.23 + x * 0.05); R.pset(x, y, n > 0.4 ? (hh(x, y, 88) > 0.8 ? Q.ocreS : Q.ocre) : (hh(x, y, 89) > 0.9 ? Q.c3 : Q.c4)); }
  for (const [x, y] of [[120, 38], [136, 46], [146, 34]]) { R.pset(x, y, Q.rojo); R.pset(x + 1, y, Q.rojoS); }
  // el friso de madera con sus cuarterones
  madera(0, 64, 319, 98, Q.nog, Q.nogL, Q.nogS, Q.nogD, 6, 82);
  for (let x = 6; x < 320; x += 52) { bisel(x, 70, x + 44, 92, Q.nog, Q.nogL, Q.nogD); R.rect(x + 3, 73, x + 41, 89, Q.nogS); R.rect(x + 4, 74, x + 40, 88, Q.nog); }
  R.rect(0, 62, 319, 64, Q.nogD); R.rect(0, 62, 319, 62, Q.nogL);
  // la librería de la izquierda
  caja(0, 6, 52, 98, Q.nogD); for (let s = 0; s < 4; s++) { const y = 10 + s * 22; R.rect(2, y + 18, 50, y + 20, Q.nogL);
    let x = 3; while (x < 46) { const w = 3 + Math.floor(hh(x, s, 83) * 4), hgt = 12 + Math.floor(hh(x, s, 84) * 6), c = [Q.terc, Q.verde, Q.azulTS, Q.nogS, Q.ocreS, Q.damasco][Math.floor(hh(x, s, 85) * 6)]; caja(x, y + 18 - hgt, x + w, y + 18, c); R.rect(x + 1, y + 20 - hgt, x + 1, y + 16, mez(c, Q.blanco, 0.3)); R.rect(x + 1, y + 21 - hgt + 3, x + w - 1, y + 21 - hgt + 3, Q.oro); x += w + 1; } }
  // el calendario de 1912 en la pared
  caja(196, 18, 234, 58, Q.papel); R.rect(197, 19, 233, 27, Q.terc); R.numero('1912', 215, 26, { centro: true, color: Q.blanco, sombra: false });
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) R.rect(200 + i * 5, 31 + j * 5, 202 + i * 5, 32 + j * 5, (i + j * 7) === 17 ? Q.rojo : Q.grisS);
  R.disco(215, 16, 1, Q.k);
  // el escritorio: la tapa de nogal con vetas y el secante verde con su filete dorado
  madera(0, 98, 319, 179, Q.nogL, Q.robleL, Q.nog, Q.nogS, 9, 86);
  R.rect(0, 98, 319, 100, Q.nogD); R.rect(0, 101, 319, 101, Q.robleL);
  caja(84, 112, 244, 176, Q.lampVS); for (let y = 113; y < 176; y++) for (let x = 85; x < 244; x++) R.pset(x, y, hh(x >> 1, y >> 1, 87) > 0.86 ? Q.lampV : Q.lampVS);
  R.rect(88, 116, 240, 116, Q.oroS); R.rect(88, 172, 240, 172, Q.oroS); R.rect(88, 116, 88, 172, Q.oroS); R.rect(240, 116, 240, 172, Q.oroS);
  // la lámpara verde de banquero
  caja(66, 104, 84, 110, Q.bronce); R.rect(67, 105, 83, 105, Q.bronceL); R.rect(74, 88, 76, 104, Q.bronceS); caja(56, 76, 96, 90, Q.lampV); R.rect(57, 77, 95, 78, Q.lampVL); R.rect(57, 88, 95, 89, Q.lampVS); R.rect(60, 90, 92, 90, Q.amarL);
  // el tintero doble de latón
  caja(250, 104, 290, 120, Q.bronce); R.rect(251, 105, 289, 105, Q.bronceL); for (const ix of [258, 280]) { R.disco(ix, 109, 5, Q.k); R.disco(ix, 109, 4, Q.bronceS); R.disco(ix, 109, 3, Q.negro); R.pset(ix - 1, 108, Q.grisS); }
  // el cenicero con la pipa y la lupa
  R.disco(290, 150, 11, Q.k); R.disco(290, 150, 10, Q.grisL); R.disco(290, 150, 7, Q.gris); caja(280, 146, 300, 150, Q.nogS); R.disco(297, 146, 4, Q.nogD); R.disco(297, 146, 2, Q.k);
  R.disco(44, 150, 10, Q.k); R.disco(44, 150, 9, Q.bronce); R.disco(44, 150, 7, mez(Q.nogL, Q.aguaL, 0.4)); R.pset(41, 147, Q.blanco); caja(50, 156, 68, 160, Q.nogD);
  // el montón de hojas en blanco (papel nuevo, blanquísimo)
  for (let k = 5; k >= 0; k--) caja(112 + k, 124 - k, 176 + k, 164 - k, k ? Q.blancoS : Q.blanco);
});
const hoja = (x, y, c, k) => { caja(x, y, x + 64, y + 40, c); if (k) for (let j = 0; j < 3; j++) R.pset(x + 8 + j * 20, y + 34, Q.blancoS); };
const p2 = (t) => {
  escritorio();
  // la llama del aplique de gas reflejada en la lámpara y el humo de la pipa
  for (let i = 0; i < 5; i++) { const f = (t * 0.5 + i * 0.2) % 1; R.disco(Math.round(297 + Math.sin(t * 2 + i) * 3 + f * 4), Math.round(142 - f * 30), 1 + Math.round(f * 2), mez(Q.ocreL, Q.blanco, 0.5 - f * 0.4)); }
  for (let y = 91; y < 116; y++) for (let x = 58 - (y - 91) * 0.6; x < 94 + (y - 91) * 0.6; x++) if ((x + y) % 2 === 0 && Math.sin(t * 9) > -0.8) tine(x, y, 0.12, Q.luz);
  // las hojas que la mano izquierda pasa (todas nuevas)
  const pasa = [SALVO + 0.1, SALVO + 0.6, SALVO + 1.1];
  for (const [k, t0] of pasa.entries()) { const v = ease(tramo(t, t0, t0 + 0.45)); if (v > 0 && v < 1) { const x = Math.round(lerp(112, 10, v)), y = Math.round(lerp(124, 108, v) - Math.sin(v * Math.PI) * 18); hoja(x, y, Q.blanco, true); } else if (v >= 1) hoja(4 + k * 6, 106 + k * 4, Q.blanco, true); }
  // los signos que imita en la hoja de arriba (desde «forgery»)
  const escrito = tramo(t, FORJA, SALVO - 0.1), pts = []; renglon(122, 136, 170, 7, Q.tinta, 1, pts); renglon(122, 146, 170, 8, Q.tinta, 1, pts); renglon(122, 156, 164, 9, Q.tinta, 1, pts);
  const n = Math.floor(escrito * pts.length);
  if (t < pasa[0] + 0.1) for (let i = 0; i < n; i++) glifo(pts[i].id, pts[i].x, pts[i].y, 1, Q.tinta);
  // la mano de la pluma: llega, moja en el tintero, escribe
  const llega = ease(tramo(t, P2, P2 + 0.8)), moja = tramo(t, P2 + 0.8, FORJA - 0.1);
  let wx, wy;
  if (t < FORJA) { wx = lerp(330, 252, llega); wy = lerp(190, 100 + Math.round(Math.abs(Math.sin(moja * Math.PI * 2)) * -6), llega); }
  else { const q = pts[Math.min(pts.length - 1, n)] || { x: 160, y: 150 }; wx = q.x + 6 + Math.sin(t * 30); wy = q.y - 14; if (t > pasa[0]) { wx = lerp(wx, 230, tramo(t, pasa[0], pasa[0] + 0.5)); wy = lerp(wy, 120, tramo(t, pasa[0], pasa[0] + 0.5)); } }
  wx = Math.round(wx); wy = Math.round(wy);
  // la pluma de ave en la mano
  raya(wx - 2, wy + 12, wx + 14, wy - 14, Q.k, 1); raya(wx - 2, wy + 12, wx + 14, wy - 14, Q.tela, 0); for (let i = 0; i < 9; i++) { R.pset(wx + 6 + i, wy - 2 - i * 1.4 | 0, Q.telaS); R.pset(wx + 8 + i, wy - 1 - i * 1.4 | 0, Q.blanco); }
  R.pset(wx - 3, wy + 13, Q.negro); R.pset(wx - 2, wy + 13, Q.negro);
  T.brazo(R, wx + 46, 200, wx + 12, wy + 4, '#34343e', -1, { codo: [wx + 40, wy + 34] });
  // la mano izquierda que pasa las hojas
  const iz = ease(tramo(t, SALVO - 0.4, SALVO)) - ease(tramo(t, ERA - 0.5, ERA - 0.1));
  if (iz > 0) { const b = pasa.findIndex((t0) => t < t0 + 0.45); const fx = b < 0 ? 104 : lerp(116, 60, ease(tramo(t, pasa[b], pasa[b] + 0.45))); const hx = Math.round(lerp(-20, fx, iz)), hy = Math.round(lerp(190, 136, iz)); T.brazo(R, hx - 40, 200, hx, hy, '#34343e', 1, { codo: [hx - 34, hy + 30] }); }
  // «?» sobre el montón: no hay pergamino viejo
  if (t > SALVO + 1.5 && t < ERA) { const b = Math.round(Math.sin(t * 6) * 2); R.disco(146, 96 + b, 13, Q.k); R.disco(146, 96 + b, 12, Q.blanco); R.icono('?', 139, 87 + b, Q.rojo, Q.k, 3); }
  // la X roja cae sobre la teoría
  if (t > ERA - 0.2) tache(160, 138, 34, tramo(t, ERA - 0.2, ERA + 0.25));
};

// ── plano 3: el escriptorio del siglo XV ──
const p3 = (t) => {
  const g = T.laboratorio(R, t, { encuadre: 'escriptorio' });
  const pu = g.pupitres || [70, 160, 250];
  const sube = tramo(t, SIGLO - 0.3, SIGLO + 0.3);
  const e1 = R.actor(EL.escriba1, pu[0] - 7, 150, t, { dir: 1, sostiene: [pu[0] + 10 + Math.round(Math.sin(t * 9) * 2), 140], sonrisa: t > SIGLO + 0.6 });
  const e2 = R.actor(EL.escriba2, pu[1] - 7, 150, t, { dir: 1, sostiene: [pu[1] + 10 + (sube > 0 ? 0 : Math.round(Math.sin(t * 8) * 2)), Math.round(lerp(140, 112, sube))], sonrisa: sube > 0.5 });
  R.actor(EL.escriba3, pu[2] - 7, 150, t, { dir: -1, habla: t > SIGLO + 0.3 && t < SIGLO + 1.4 && Math.sin(t * 8) > 0, dedo: t > SIGLO + 1.4, sorpresa: t > SIGLO && t < SIGLO + 0.3, sonrisa: t > SIGLO + 1.5 });
  T.laboratorioDelante(R, t, { encuadre: 'escriptorio' });
  // la hoja terminada en alto, con su planta y sus signos
  if (sube > 0) { const [mx, my] = e2.mano; pergamino(mx - 9, my - 22, mx + 9, my, 3); for (let j = 0; j < 4; j++) R.rect(mx - 1, my - 18 + j * 4, mx + 6, my - 18 + j * 4, Q.tinta); R.rect(mx - 6, my - 16, mx - 5, my - 6, Q.verdeS); R.pset(mx - 7, my - 15, Q.verde); R.pset(mx - 4, my - 13, Q.verde); if (sube >= 1 && Math.sin(t * 6) > 0) destello(mx + 10, my - 20, 2); }
  // las plumas en la mano de los otros dos
  for (const m of [e1.mano]) { raya(m[0], m[1], m[0] + 6, m[1] - 10, Q.tela, 0); R.pset(m[0] + 6, m[1] - 10, Q.blanco); }
};

// ── plano 4: la carabela de 1492 llega a las islas ──
const isla = () => capa('isla', () => {
  for (let x = 206; x < 320; x++) { const y1 = Math.round(84 - Math.max(0, Math.sin((x - 206) * 0.03)) * 18 - Math.sin(x * 0.15) * 2); for (let y = y1; y < 106; y++) R.pset(x, y, y === y1 ? Q.setoL : hh(x >> 1, y >> 1, 91) > 0.75 ? Q.setoS : hh(x, y, 92) > 0.9 ? Q.setoD : Q.seto); }
  for (let x = 196; x < 320; x++) for (let y = 104; y < 112; y++) if (y > 104 + Math.max(0, (226 - x) * 0.3)) R.pset(x, y, y < 106 ? Q.arenaL : hh(x, y, 93) > 0.8 ? Q.arenaS : Q.arena);
  for (const [x, y] of [[236, 104], [292, 103]]) { R.disco(x, y, 4, Q.grisS); R.pset(x - 1, y - 2, Q.grisL); }
});
const palmera = (x, yb, h, t, k) => {
  const sw = Math.sin(t * 1.4 + k) * 2;
  for (let j = 0; j < h; j++) { const X = Math.round(x + Math.sin(j / h * 1.4) * 5 + sw * j / h); R.pset(X, yb - j, j % 3 ? Q.nog : Q.nogS); R.pset(X + 1, yb - j, Q.nogS); }
  const tx = Math.round(x + Math.sin(1.4) * 5 + sw), ty = yb - h;
  for (let a = 0; a < 7; a++) { const an = -2.9 + a * 0.48 + Math.sin(t * 2 + a + k) * 0.06; for (let r = 0; r < 14; r++) { const X = Math.round(tx + Math.cos(an) * r), Y = Math.round(ty + Math.sin(an) * r * 0.6 + r * r * 0.03); R.pset(X, Y, r % 3 ? Q.palma : Q.palmaL); R.pset(X, Y + 1, Q.palmaS); } }
  R.disco(tx, ty + 1, 2, Q.nogS);
};
const carabela = (cx, wy, t) => {
  cx = Math.round(cx); const ro = Math.sin(t * 1.6) * 0.04;
  const yH = (x) => Math.round(wy + (x - cx) * ro);
  // el casco: tablas, cintas y el castillo de popa
  for (let x = cx - 52; x <= cx + 50; x++) {
    const u = (x - cx) / 52, top = yH(x) - 14 - (x < cx - 30 ? 8 : 0) - (x > cx + 38 ? 3 : 0), bot = yH(x) + 6 - Math.round(Math.abs(u) ** 3 * 8);
    for (let y = top; y <= bot; y++) { let c = (y - top) % 4 === 0 ? Q.nogS : Q.nog; if (y === top) c = Q.robleL; if (y === top + 5) c = Q.ocreS; if (y > yH(x) + 1) c = Q.nogD; if (x === cx - 52 || x === cx + 50 || y === bot) c = Q.k; R.pset(x, y, c); }
  }
  for (const px of [cx - 20, cx - 4, cx + 12, cx + 28]) { R.disco(px, yH(px) - 6, 1, Q.k); }
  // los mástiles, las velas hinchadas y las banderolas
  const mastil = (mx, h, w, hv) => {
    raya(mx, yH(mx) - 14, mx, yH(mx) - 14 - h, Q.nogS, 0); R.pset(mx + 1, yH(mx) - 20, Q.nog);
    const inf = Math.sin(t * 2.2 + mx) * 1.5;
    for (let j = 0; j < hv; j++) { const yy = yH(mx) - 14 - h + 6 + j, b = Math.round(Math.sin(j / hv * Math.PI) * (3 + inf)); for (let i = -w; i <= w; i++) { const xx = mx + i + b; R.pset(xx, yy, i === -w || i === w || j === 0 || j === hv - 1 ? Q.telaS : i > w * 0.4 ? Q.telaS : Q.tela); } }
    R.rect(mx - w - 1, yH(mx) - 14 - h + 5, mx + w + 1, yH(mx) - 14 - h + 5, Q.nogS);
    for (let i = 0; i < 6; i++) R.pset(mx + i, yH(mx) - 14 - h + Math.round(Math.sin(t * 9 + i) * (i / 3)), Q.rojo);
  };
  mastil(cx - 34, 34, 7, 20); mastil(cx - 2, 52, 13, 30); mastil(cx + 26, 40, 9, 22);
  R.rect(cx - 6, yH(cx) - 64, cx + 2, yH(cx) - 61, Q.nogS); R.disco(cx - 2, yH(cx) - 66, 1, Q.piel);
  raya(cx + 50, yH(cx + 50) - 10, cx + 66, yH(cx + 66) - 24, Q.nogS, 0);
  for (const [a, b] of [[cx + 66, cx - 2], [cx - 52, cx - 34]]) R.linea(a, yH(a) - 24, b, yH(b) - 66 + (b === cx - 34 ? 18 : 0), Q.nogD);
  // la estela y la ola de proa
  for (let i = 0; i < 40; i++) { const x = cx - 52 - i * 2, y = yH(cx) + 4 + Math.round(Math.sin(i * 0.7 + t * 6)); if (hh(i, Math.floor(t * 6), 94) > 0.4) R.pset(x, y, Q.espuma); }
  for (let i = 0; i < 8; i++) R.pset(cx + 48 + i, yH(cx) + 3 - (i >> 2) + Math.round(Math.sin(t * 10 + i)), Q.espuma);
};
const p4 = (t) => {
  fijo('cielo1492', () => cieloFijo(104));
  R.disco(62, 40, 12, mez(Q.c4, Q.amarL, 0.4)); R.disco(62, 40, 9, Q.amarL); R.disco(62, 40, 7, Q.blanco);
  nubes(t, 22, 70, 5);
  isla();
  for (const [x, h, k] of [[226, 40, 0], [248, 52, 1], [268, 36, 2], [298, 48, 3]]) palmera(x, 106, h, t, k);
  // el loro que cruza
  { const v = tramo(t, P4 + 0.5, P4 + 3.5); if (v > 0 && v < 1) { const x = Math.round(lerp(310, 210, v)), y = Math.round(80 - Math.sin(v * 6) * 4), a = Math.sin(t * 14) > 0; R.rect(x, y, x + 3, y + 1, Q.rojo); R.pset(x - 1, y, Q.amar); R.pset(x + 1, y - (a ? 2 : -2), Q.azulTL); R.pset(x + 2, y - (a ? 1 : -1), Q.verde); } }
  // el mar: olas en filas que corren, más claras lejos, con brillos
  for (let y = 105; y < 180; y++) { const z = (y - 100) / 80, sp = t * (6 + z * 18); for (let x = 0; x < 320; x++) { const w = Math.sin((x + sp) * (0.25 - z * 0.15) + y * 1.7) + Math.sin(x * 0.07 - t + y); let c = z < 0.15 ? Q.marL : z < 0.5 ? Q.mar : Q.marS; if (w > 1.5) c = Q.marL; else if (w < -1.6) c = Q.marD; if (w > 1.85 && z > 0.2) c = Q.espuma; R.pset(x, y, c); } }
  for (let x = 196; x < 320; x++) if (Math.sin(x * 0.3 + t * 3) > 0.2) R.pset(x, 112 + (Math.sin(x * 0.2 + t * 2) > 0 ? 0 : 1), Q.espuma);
  for (let i = 0; i < 6; i++) { const x = Math.round(70 + i * 9 + Math.sin(t * 2 + i) * 3), y = 107 + (i % 3); if (Math.sin(t * 5 + i * 2) > 0.3) R.pset(x, y, Q.blanco); }
  // la carabela llega
  const v = ease(tramo(t, P4 - 0.3, @19.3@)), cx = lerp(-40, 138, v), wy = 140 + Math.round(Math.sin(t * 1.6) * 1.5);
  carabela(cx, wy, t);
  const mar = R.actor(EL.marinero, Math.round(cx + 30), wy - 14 - 2 + Math.round((cx + 30 - cx) * Math.sin(t * 1.6) * 0.04), t, { dir: 1, dedo: t > LLEGA - 0.1, sorpresa: t > LLEGA - 0.1 && t < LLEGA + 0.6, sonrisa: t > LLEGA + 0.6, habla: t > LLEGA && t < LLEGA + 1 && Math.sin(t * 8) > 0 });
  if (t > LLEGA && t < LLEGA + 1.0) globo(cx + 37, wy - 46, '!');
  // la borda tapa los pies del marinero
  for (let x = Math.round(cx + 26); x < Math.round(cx + 48); x++) { const y = Math.round(wy + (x - cx) * Math.sin(t * 1.6) * 0.04) - 14; R.rect(x, y, x, y + 2, (x & 3) ? Q.nog : Q.nogS); R.pset(x, y, Q.robleL); }
  // los delfines saltan delante
  for (const [k, t0] of [[0, @18.4@], [1, @18.8@]]) { const d = tramo(t, t0, t0 + 0.9); if (d > 0 && d < 1) { const x = Math.round(214 + k * 26 + d * 30), y = Math.round(162 - Math.sin(d * Math.PI) * 16), an = Math.cos(d * Math.PI); for (let i = -5; i <= 5; i++) { const yy = y + Math.round(i * an * 0.6); R.pset(x + i, yy, Q.aceroS); R.pset(x + i, yy - 1, Q.aceroL); } R.pset(x - 1, y - 3, Q.aceroS); R.pset(x + 4, y - 1 - Math.round(an * 3), Q.k); for (let i = 0; i < 4; i++) R.pset(x - 6 + i * 4, 166 + (i & 1), Q.espuma); } }
};

const año = (t) => t < P2 ? 2009 : t < P3 ? 1912 : t < P4 ? 1420 : 1492;
const efectos = [[TUMBA + 0.05, 'boing'], [PEGA + 0.2, 'pop'], [ANTES, 'palmada'], [P2 + 1.2, 'burbujas'], [FORJA + 0.1, 'lapiz'], [SALVO + 0.1, 'papel'], [ERA - 0.15, 'sello'], [SIGLO, 'papel'], [P4 + 0.2, 'ola'], [@18.5@, 'chof']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
'''))

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['vm-estadistica'] = ('La estadística', '''// VM-ESTADISTICA (frase 17): las estadísticas y los cinco escribas. Cuatro planos:
// 1. la sala de ordenadores (2013): entra el analista con el listado; en «frequency» la pantalla de pared dibuja dos
//    curvas de frecuencia (la del libro, dorada, y la de un idioma de verdad, azul) que acaban encima; él la señala y la
//    colega de la mesa se sorprende en «real languages»;
// 2. «but at the same time»: la gráfica de cerca: una mano pulsa una tecla y en «too orderly» las barras se ponen en
//    fila y bailan en ola (gag 6); en «rigid rules» se paran firmes;
// 3. «In 2020»: fondo local, el despacho de Davis: en el tablón de corcho, fichas con letras del libro en cinco
//    columnas de colores; ella coge una ficha de la mesa y la clava en su columna, y en «every letter» compara con la
//    lupa en la pantalla;
// 4. «and concluded»: inserto local: la tira de pergamino con cinco manos de letra en cinco tintas, cada tintero con su
//    pluma que escribe; la mano de Davis pasa la lupa por las cinco; en «five» se encienden los números 1 a 5.''', marcas('vm-estadistica', COMUN + r'''
const P2 = @6.31@, P3 = @11.36@, P4 = @16.84@;
const LISTADO = @1.04@, FREQ = @3.87@, REALES = @5.35@, ORDEN = @7.63@, REGLAS = @9.91@, COMPARA = @15.14@, LETRA = @16.54@, CINCO = @19.14@, PERSONAS = @19.90@;

// ── plano 1: la sala de ordenadores ──
const p1 = (t) => {
  const g = T.laboratorio(R, t, { encuadre: 'ordenadores' });
  // la pantalla de pared: dos curvas de frecuencia que se dibujan (desde «frequency») y acaban casi encima
  const [tx0, ty0, tx1, ty1] = g.tele, X0 = tx0 + 4, Y0 = ty0 + 4, X1 = tx1 - 4, Y1 = ty1 - 4;
  const d = tramo(t, FREQ - 0.3, REALES + 0.2);
  if (d > 0) {
    for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) R.pset(x, y, (x - X0) % 10 === 0 || (y - Y0) % 8 === 0 ? Q.rejilla : Q.pantalla);
    R.rect(X0 + 3, Y0 + 2, X0 + 3, Y1 - 3, Q.grisL); R.rect(X0 + 3, Y1 - 3, X1 - 2, Y1 - 3, Q.grisL);
    const n = Math.floor((X1 - X0 - 6) * d);
    for (let i = 0; i <= n; i++) {
      const x = X0 + 4 + i, f = (i + 2) / (X1 - X0);
      const yA = Math.round(Y0 + 3 + (Y1 - Y0 - 8) * (1 - 0.95 / (1 + f * 14))), yB = Math.round(yA + Math.sin(i * 0.9) * 1.5 + (1 - tramo(t, FREQ + 0.6, REALES)) * 4);
      R.pset(x, yA, Q.aguaL); if (i % 2) R.pset(x, yA + 1, Q.azulTL);
      R.pset(x, yB, Q.oro); R.pset(x, yB - 1, Q.oroL);
    }
    R.rect(X1 - 12, Y0 + 2, X1 - 9, Y0 + 3, Q.oro); R.rect(X1 - 12, Y0 + 6, X1 - 9, Y0 + 7, Q.aguaL);
    if (t > REALES && Math.sin(t * 8) > 0) { R.icono('!', X1 - 22, Y0 + 2, Q.amarL, Q.k); }
  }
  // la colega de la mesa (detrás) y el analista que entra con el listado
  const col = R.actor(EL.oficinista2, 150, 150, t, { dir: 1, habla: t > LISTADO + 0.4 && t < FREQ && Math.sin(t * 8) > 0, sorpresa: t > REALES - 0.1 && t < REALES + 0.6, sonrisa: t > REALES + 0.6 });
  const u = tramo(t, 0.15, LISTADO + 0.5), x = Math.round(lerp(330, 262, u));
  const an = R.actor(EL.empollon, x, 150, t, { dir: -1, anda: u > 0 && u < 1, sostiene: t < FREQ - 0.3 ? true : false, dedo: t > FREQ - 0.3, sonrisa: t > REALES, habla: t > FREQ && t < REALES && Math.sin(t * 9) > 0 });
  if (t < FREQ - 0.3) impreso(an.mano[0], an.mano[1]);
  T.laboratorioDelante(R, t, { encuadre: 'ordenadores' });
  // el listado que cae sobre la mesa cuando señala
  if (t >= FREQ - 0.3) { const v = ease(tramo(t, FREQ - 0.3, FREQ)); const px = Math.round(lerp(an.mano[0], 238, v)), py = Math.round(lerp(an.mano[1], 140, v)); impreso(px, py); }
};

// ── plano 2: la gráfica baila ──
const p2 = (t) => {
  T.laboratorio(R, t, { encuadre: 'ordenadores', camara: 'grafica', baila: ease(tramo(t, ORDEN - 0.2, ORDEN + 0.6)) * (t < REGLAS ? 1 : 1), plumas: false });
  // la mano pulsa la tecla que pone a bailar las barras
  const pul = tramo(t, P2 + 0.2, ORDEN - 0.4), tecla = t > ORDEN - 0.5 && t < ORDEN - 0.2 ? 2 : 0;
  const wx = Math.round(lerp(-10, 52, ease(pul)) - ease(tramo(t, REGLAS + 0.4, REGLAS + 1.1)) * 50), wy = Math.round(lerp(190, 154 + tecla, ease(pul)) + ease(tramo(t, REGLAS + 0.4, REGLAS + 1.1)) * 30);
  if (wx > -14) T.brazo(R, 6, 196, wx, wy, '#3a4a6a', 1, { codo: [16, 176] });
  // en la mesa: el montón de listados de papel pautado, la calculadora y el lápiz
  for (let k = 3; k >= 0; k--) { caja(196 + k, 146 - k * 2, 246 + k, 168 - k * 2, Q.blanco); for (let y = 149 - k * 2; y < 166 - k * 2; y += 4) R.rect(198 + k, y, 244 + k, y + 1, k ? Q.blancoS : hex('#cfe8c8')); }
  for (let j = 0; j < 4; j++) R.rect(202, 142 + j * 4, 202 + 8 + ((j * 7) % 12) * 2, 142 + j * 4, Q.grisS);
  caja(258, 148, 284, 168, Q.negro); caja(261, 150, 281, 155, hex('#9ab88a')); R.numero('9', 278, 155, { color: Q.negro, sombra: false, fina: true });
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) caja(261 + i * 5, 157 + j * 4, 264 + i * 5, 159 + j * 4, i === 3 ? Q.ocre : Q.grisL);
  raya(290, 166, 312, 150, Q.amar, 1); R.pset(312, 150, Q.grafito ?? Q.negro); R.pset(290, 166, Q.rosa);
  if (t > REGLAS && t < REGLAS + 0.8) R.icono('!', 150, 12 + 20, Q.amarL, Q.k, 2);
};

// ── plano 3: el despacho de Davis, 2020 ──
const COLS = [Q.neg, Q.sepia, Q.rojoT, Q.verdeT, Q.azulT2];
const ficha = (x, y, id, c) => { caja(x, y, x + 11, y + 13, Q.papel); R.rect(x + 1, y + 12, x + 10, y + 12, Q.papelS); glifo(id, x + 3, y + 9, 1, c); R.rect(x + 2, y + 1, x + 9, y + 1, c); };
const BX = (k) => 106 + k * 26;   // la x de cada columna del tablón
const despacho = () => fijo('davis', () => {
  // la pared cálida moteada con su zócalo; la luz de la lámpara de pie arriba a la derecha (sin nada detrás de Atom)
  moteado(0, 0, 319, 130, Q.piedraL, Q.blanco, Q.piedra, 101, 0.1);
  for (let y = 0; y < 130; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 239, (y - 56) * 1.3); if (d < 50 && ((x + y) & 1)) R.pset(x, y, mez(R.pget(x, y), Q.luz, 0.3 * (1 - d / 50))); }
  R.rect(0, 126, 319, 132, Q.robleS); R.rect(0, 126, 319, 126, Q.robleL);
  // la estantería llena de facsímiles, cajas de archivo y una lupa
  caja(0, 12, 86, 132, Q.robleD); for (let s = 0; s < 4; s++) { const y = 16 + s * 28; R.rect(2, y + 24, 84, y + 26, Q.robleL);
    let x = 3; while (x < 80) { const w = 3 + Math.floor(hh(x, s, 102) * 5), hgt = 13 + Math.floor(hh(x, s, 103) * 9), c = [Q.terc, Q.verde, Q.azulTS, Q.ocreS, Q.damasco, Q.grisS, Q.perg][Math.floor(hh(x, s, 104) * 7)]; if (hh(x, s, 105) > 0.85 && x < 72) { caja(x, y + 24 - 11, x + 10, y + 24, Q.papelS); R.rect(x + 3, y + 17, x + 7, y + 18, Q.blanco); x += 12; continue; } caja(x, y + 24 - hgt, x + w, y + 24, c); R.rect(x + 1, y + 26 - hgt, x + 1, y + 22, mez(c, Q.blanco, 0.3)); if (w > 4) R.rect(x + 1, y + 28 - hgt, x + w - 1, y + 28 - hgt, Q.oro); x += w + 1; } }
  // el tablón de corcho con las cinco columnas de colores (una chincheta de cada tinta arriba)
  caja(94, 40, 230, 122, Q.robleS); R.rect(95, 41, 229, 41, Q.robleL); moteado(97, 43, 227, 119, Q.corcho, Q.corchoL, Q.corchoS, 106, 0.2);
  for (let i = 0; i < 120; i++) R.pset(97 + Math.round(hh(i, 1, 107) * 130), 43 + Math.round(hh(i, 2, 107) * 76), Q.corchoD);
  for (let k = 0; k < 5; k++) { const x = BX(k); R.disco(x + 6, 48, 3, Q.k); R.disco(x + 6, 48, 2, COLS[k]); R.pset(x + 5, 47, mez(COLS[k], Q.blanco, 0.5)); for (let y = 54; y < 118; y += 3) R.pset(x + 6, y, Q.corchoD); }
  // el suelo de tarima con la alfombra
  madera(0, 133, 319, 179, Q.roble, Q.robleL, Q.robleS, Q.robleD, 7, 108);
  for (let y = 152; y < 180; y++) for (let x = 20; x < 214; x++) { const b = y === 152 || y === 179 || x === 20 || x === 213; R.pset(x, y, b ? Q.tercS : (x + y) % 6 === 0 ? Q.oroS : ((x >> 2) + (y >> 2)) % 2 ? Q.terc : Q.tercL); }
  // la mesa de trabajo a la derecha, contra la pared, con el monitor, la taza, el facsímil abierto y el flexo
  caja(234, 128, 319, 133, Q.nog); R.rect(235, 129, 319, 129, Q.nogL); R.rect(235, 132, 319, 132, Q.nogS);
  caja(238, 133, 244, 150, Q.nogS); caja(300, 133, 318, 150, Q.nog); for (const y of [136, 143]) { R.rect(302, y, 316, y + 5, Q.nogL); caja(307, y + 2, 311, y + 3, Q.bronce); }
  caja(248, 84, 312, 124, Q.k); R.rect(249, 85, 311, 123, Q.negro); caja(252, 88, 308, 120, Q.papel); caja(276, 124, 284, 128, Q.grisS); caja(268, 126, 292, 128, Q.gris);
  caja(237, 120, 244, 127, Q.blanco); R.rect(244, 122, 246, 125, Q.blanco); R.rect(238, 121, 243, 122, Q.nogS);
  // el aplique de pared entre el tablón y la mesa, y el enchufe
  caja(236, 54, 242, 64, Q.bronce); R.disco(239, 52, 4, Q.amarL); R.pset(238, 50, Q.blanco); caja(236, 112, 242, 118, Q.blanco); R.pset(238, 115, Q.grisS); R.pset(240, 115, Q.grisS);
});
const p3 = (t) => {
  despacho();
  // la pantalla: la letra del libro de la ficha y su gemela de otra página, a 4×; la superposición las compara
  const cmp = ease(tramo(t, COMPARA - 0.3, LETRA + 0.1));
  for (let y = 90; y < 120; y += 6) R.rect(253, y, 307, y, Q.pergM);
  glifo(5, 262, 112, 3, Q.tinta); glifo(5, 286 - Math.round(cmp * 24), 112, 3, mez(Q.rojoT, Q.blanco, 0.15 + cmp * 0.2));
  if (cmp >= 1 && Math.sin(t * 8) > 0) { R.rect(253, 89, 307, 89, Q.verdeT); R.rect(253, 119, 307, 119, Q.verdeT); }
  // las fichas ya clavadas y las tres que Davis va clavando, una por columna
  const nCol = [3, 2, 3, 2, 1];
  for (let k = 0; k < 5; k++) for (let j = 0; j < nCol[k]; j++) ficha(BX(k), 56 + j * 15, 3 + k * 6 + j, COLS[k]);
  const extra = [[1, 2], [4, 1], [3, 2]], cic = 1.15, t0 = P3 + 0.2, i = Math.floor((t - t0) / cic), f = ((t - t0) % cic) / cic;
  for (let j = 0; j < Math.min(3, Math.max(0, i + (f > 0.7 ? 1 : 0))); j++) { const [k, r] = extra[j]; ficha(BX(k), 56 + r * 15, 31 + j, COLS[k]); }
  const obj = t > t0 && i < 3 ? extra[i] : null, va = t > COMPARA - 0.7;
  const xa = obj ? BX(obj[0]) - 6 : BX(3) - 6;
  const cx = va ? Math.round(lerp(BX(3) - 6, 206, ease(tramo(t, COMPARA - 0.7, COMPARA)))) : Math.round(lerp(i > 0 && extra[i - 1] ? BX(extra[i - 1][0]) - 6 : 150, xa, ease(Math.min(1, f * 2.2))));
  const lleva = obj && f < 0.7 && !va;
  const dav = R.actor(EL.davis, cx, 158, t, { dir: 1, anda: (!va && obj && f < 0.45) || (va && t < COMPARA), sostiene: t > COMPARA ? [cx + 26, 112] : lleva ? [cx + 16, Math.round(lerp(132, 118, Math.max(0, (f - 0.4) * 3.3)))] : false, sonrisa: t > LETRA || (f > 0.7 && f < 0.95 && !va), habla: t > COMPARA + 0.3 && t < LETRA && Math.sin(t * 7) > 0.3 });
  if (lleva) { const [mx, my] = dav.mano; ficha(mx - 5, my - 12, 31 + i, COLS[obj[0]]); }
  // en «compared» alza la lupa hacia la pantalla
  if (t > COMPARA) { const [mx, my] = dav.mano; R.disco(mx + 4, my - 5, 6, Q.k); R.disco(mx + 4, my - 5, 5, Q.bronce); R.disco(mx + 4, my - 5, 4, mez(Q.papel, Q.aguaL, 0.3)); R.pset(mx + 2, my - 7, Q.blanco); raya(mx, my, mx - 2, my + 4, Q.nogS, 0); }
  if (t > LETRA && Math.sin(t * 7) > 0) globo(cx + 7, 128, '!');
  // el gato del despacho se despereza sobre la alfombra
  { const s = Math.sin(t * 1.5) > 0.6 ? 1 : 0, gx = 46, gy = 170; R.rect(gx, gy - 4 - s, gx + 12, gy, Q.grisS); R.rect(gx + 1, gy - 3 - s, gx + 11, gy - 1, Q.gris); R.rect(gx + 10, gy - 8, gx + 15, gy - 3, Q.gris); R.pset(gx + 11, gy - 9, Q.grisS); R.pset(gx + 14, gy - 9, Q.grisS); R.pset(gx + 13, gy - 6, Q.k); raya(gx, gy - 3, gx - 4, gy - 7 - Math.round(Math.sin(t * 3) * 2), Q.grisS, 0); }
};

// ── plano 4: las cinco tintas ──
const mesa5 = () => fijo('cinco', () => {
  // la pared del despacho: la ventana del atardecer con el campus, el facsímil enmarcado, el aplique y la repisa
  moteado(0, 0, 319, 70, Q.piedraL, Q.blanco, Q.piedra, 111, 0.1);
  caja(132, 18, 200, 64, Q.robleS); caja(135, 21, 197, 61, Q.blanco);
  degr(137, 23, 195, 59, [Q.c2, Q.c3, Q.c4, hex('#f0c8a0'), hex('#e8a070')]);
  for (let x = 137; x < 196; x++) { const yb = Math.round(46 - Math.max(0, Math.sin((x - 140) * 0.08)) * 6); for (let y = yb; y < 60; y++) R.pset(x, y, y === yb ? Q.ladrL : (x % 6 === 0 || y % 4 === 0) ? Q.ladrS : Q.ladr); if (x > 150 && x < 160 && yb > 40) for (let y = 30; y < yb; y++) R.pset(x, y, x % 3 ? Q.ladr : Q.ladrS); }
  for (const [x, y] of [[144, 52], [186, 50]]) { R.disco(x, y, 6, Q.setoS); R.disco(x - 1, y - 1, 5, Q.seto); R.pset(x - 2, y - 3, Q.setoL); }
  R.rect(165, 21, 166, 61, Q.blanco); R.rect(135, 40, 197, 41, Q.blanco); for (let y = 23; y < 30; y += 2) R.rect(137, y, 195, y, Q.blancoS);
  caja(52, 12, 98, 60, Q.oroS); caja(55, 15, 95, 57, Q.nogD); pergamino(58, 18, 92, 54, 11);
  R.rect(74, 24, 75, 48, Q.verdeS); for (const [dx, dy] of [[-5, -2], [5, 2], [-4, 8], [4, 12]]) { R.disco(74 + dx, 30 + dy, 3, Q.verde); R.pset(74 + dx, 29 + dy, Q.verdeL); } R.disco(75, 22, 3, Q.azulTL); for (let i = 0; i < 5; i++) R.pset(70 + i * 2, 50 + (i & 1), Q.nogS);
  caja(110, 26, 118, 38, Q.bronce); R.disco(114, 24, 4, Q.amarL); R.pset(113, 22, Q.blanco);
  for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 114, (y - 28) * 1.2); if (d < 40 && ((x + y) & 1)) R.pset(x, y, mez(R.pget(x, y), Q.luz, 0.3 * (1 - d / 40))); }
  madera(0, 64, 319, 70, Q.robleS, Q.roble, Q.robleD, Q.nogD, 6, 112); R.rect(0, 64, 319, 64, Q.robleL);
  for (let x = 8; x < 46; x += 6) { const h = 12 + Math.floor(hh(x, 1, 113) * 8); caja(x, 64 - h, x + 5, 64, [Q.terc, Q.verde, Q.azulTS, Q.ocreS][Math.floor(hh(x, 2, 113) * 4)]); R.rect(x + 1, 66 - h, x + 4, 66 - h, Q.oro); }
  R.poligono([[220, 64], [224, 50], [228, 64]], Q.k); R.poligono([[221, 63], [224, 52], [227, 63]], Q.ocreL); caja(236, 54, 246, 64, Q.ladr); R.disco(241, 50, 5, Q.seto); R.pset(239, 47, Q.setoL);
  // la mesa de nogal con la tira de pergamino de las cinco manos
  madera(0, 70, 319, 179, Q.nogL, Q.robleL, Q.nog, Q.nogS, 9, 114); R.rect(0, 70, 319, 72, Q.nogD);
  for (let y = 73; y < 100; y++) for (let x = 0; x < 320; x++) if ((x + y) & 1) R.pset(x, y, mez(R.pget(x, y), Q.nogD, 0.25 * (1 - (y - 73) / 27)));
  caja(250, 78, 300, 96, Q.papel); R.rect(251, 79, 299, 80, Q.papelS); for (let j = 0; j < 3; j++) R.rect(254, 84 + j * 4, 290 - j * 8, 84 + j * 4, Q.grisS);
  caja(20, 78, 34, 96, Q.blanco); R.rect(34, 82, 37, 90, Q.blanco); R.rect(21, 79, 33, 80, Q.nogS);
  pergamino(14, 102, 306, 160, 7);
  for (let k = 0; k < 4; k++) { const x = 14 + (k + 1) * 58; for (let y = 106; y < 158; y += 2) R.pset(x, y, Q.pergD); }
});
const p4 = (t) => {
  mesa5();
  // la luz de la lámpara que entra por la izquierda
  for (let y = 0; y < 70; y++) for (let x = 200 + y; x < 260 + y; x++) if ((x + y) % 3 === 0) tine(x, y, 0.1, Q.luz);
  // cada mano escribe su renglón con su tinta (cinco formas de letra: más inclinada, más gruesa, más ancha…)
  for (let k = 0; k < 5; k++) {
    const x0 = 22 + k * 58, w = 46, pts = [];
    for (let r = 0; r < 4; r++) renglon(x0, 116 + r * 11, x0 + w, 40 + k * 7 + r, COLS[k], 1, pts);
    const n = Math.floor(tramo(t, P4 - 0.6 + k * 0.1, @21.6@) * pts.length);
    for (let i = 0; i < Math.max(Math.floor(pts.length * 0.4), n); i++) { const p = pts[i]; glifo(p.id, p.x + (k === 1 ? 0 : 0), p.y, 1, COLS[k]); if (k === 2) R.pset(p.x + 3, p.y - 7, COLS[k]); if (k === 3) R.pset(p.x, p.y + 1, COLS[k]); }
    const q = pts[Math.min(pts.length - 1, Math.max(Math.floor(pts.length * 0.4), n))] || { x: x0, y: 116 };
    // el tintero de su tinta y la pluma que escribe sobre el renglón
    const ix = x0 + 23; R.disco(ix, 170, 6, Q.k); R.disco(ix, 170, 5, mez(COLS[k], Q.k, 0.3)); R.disco(ix - 1, 169, 2, mez(COLS[k], Q.blanco, 0.3)); caja(ix - 3, 163, ix + 3, 166, Q.k); R.rect(ix - 2, 164, ix + 2, 165, mez(COLS[k], Q.k, 0.5));
    const px = q.x + 4 + Math.round(Math.sin(t * 22 + k) * 1.5), py = q.y - 2;
    raya(px, py, px + 10, py - 22, Q.k, 1); raya(px, py, px + 10, py - 22, Q.tela, 0);
    for (let i = 0; i < 12; i++) { R.pset(px + 4 + Math.round(i * 0.45) + 1, py - 8 - i, i % 3 ? Q.telaS : Q.blanco); R.pset(px + 6 + Math.round(i * 0.45), py - 7 - i, Q.tela); }
    R.pset(px, py + 1, COLS[k]);
    // en «five» se encienden los números 1 a 5
    const on = tramo(t, CINCO - 0.3 + k * 0.17, CINCO - 0.1 + k * 0.17);
    if (on > 0) { const y = Math.round(lerp(104, 98, on)); R.disco(x0 + 23, y - 4, 8, Q.k); R.disco(x0 + 23, y - 4, 7, COLS[k]); R.numero(String(k + 1), x0 + 24, y, { centro: true, color: Q.blanco, sombra: false }); }
  }
  // la mano de Davis pasa la lupa por las cinco letras
  const l = tramo(t, P4 + 0.2, CINCO - 0.4), lx = Math.round(lerp(40, 280, l)), ly = 128 + Math.round(Math.sin(l * 15) * 4);
  if (t < PERSONAS + 0.6) { const sale = ease(tramo(t, CINCO - 0.3, PERSONAS + 0.5)); const X = Math.round(lx + sale * 60), Y = Math.round(ly + sale * 70);
    R.disco(X, Y, 11, Q.k); R.disco(X, Y, 10, Q.bronce); for (let y = -8; y <= 8; y++) for (let x = -8; x <= 8; x++) if (x * x + y * y <= 64) tine(X + x, Y + y, 0.25, Q.aguaL); R.pset(X - 4, Y - 5, Q.blanco); R.pset(X - 3, Y - 6, Q.blanco);
    T.brazo(R, X + 60, Y + 70, X + 10, Y + 12, '#2a3a5a', -1, { codo: [X + 40, Y + 40] }); }
};

const año = (t) => t < P3 ? 2013 : 2020;
const efectos = [[LISTADO + 0.3, 'papel'], [FREQ, 'bip'], [ORDEN - 0.45, 'tecleo'], [ORDEN + 0.1, 'boing'], [REGLAS, 'golpecito'], [P3 + 1.4, 'toc'], [P3 + 2.65, 'toc'], [COMPARA, 'brillo'], [P4 + 0.3, 'lapiz'], [CINCO, 'pop'], [PERSONAS, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
'''))
