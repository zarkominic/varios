import re

# Borrador de las escenas del grupo S10 del ep15: ny-hoy, ny-verrazzano y ny-cierre (con el movimiento hecho).
# Los instantes se escriben como @(s) (segundos de escena, sacados de linea.json) y se convierten aquí en en('marca', f).

MARCAS = {
    'ny-hoy': [('onu', 1.5, 12.283), ('capas', 13.131, 20.748)],
    'ny-verrazzano': [('puente', 1.5, 9.688), ('zeta', 10.488, 17.367)],
    'ny-cierre': [('barcos', 0.5, 10.539), ('adios', 11.339, 13.163)],
}


def _en(id_, s):
    ms = MARCAS[id_]
    k = ms[0]
    for m in ms:
        if s >= m[1] - 1e-6:
            k = m
    f = (s - k[1]) / (k[2] - k[1])
    return f"en('{k[0]}', {f:.4f})"


def _conv(id_, cuerpo):
    return re.sub(r'@\(([-\d.]+)\)', lambda m: _en(id_, float(m.group(1))), cuerpo)


# ── piezas locales (copias de las del grupo S8, que no se exportan de ny-comun.js) ──────────────────────────────────
PRE = r'''
const C = T.C;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (BAY[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const cl = (v) => Math.max(0, Math.min(1, v));
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const X = {
  dia: [hex('#3e7cc8'), hex('#5a96dc'), hex('#7ab0e8'), hex('#a4cbee'), hex('#d4e4ee')],
  nube: [hex('#a8bed6'), hex('#dce8f2'), hex('#ffffff')],
  sol: hex('#fff8dc'), solL: hex('#ffe08a'), halo: hex('#fff2c0'), ave: hex('#2e3446'),
  vidrio: hex('#2e3e58'), vidrioM: hex('#46607e'), vidrioL: hex('#8aa8c4'), calido: hex('#f8d070'), calidoS: hex('#d89a40'),
  adoquin: hex('#6e6a72'), adoquinS: hex('#4e4a56'), adoquinL: hex('#8e8a92'),
  tabla: hex('#b08a5a'), tablaS: hex('#8a6a40'), tablaL: hex('#cca878'), tablaD: hex('#5e4428'),
  sombra: hex('#2a3048'), camisa: hex('#f2eee2'), camisaS: hex('#c8c0b0'),
  lejos: [hex('#a6b4cc'), hex('#909eba'), hex('#c6d0de'), hex('#bac6da')],
  hierro: hex('#46525e'), hierroS: hex('#2c343e'), hierroL: hex('#76848e'),
  acera: hex('#b4b0ba'), aceraS: hex('#8e8a96'), aceraL: hex('#cac6ce'),
  ladrillo: hex('#a84a34'), ladrilloS: hex('#7a3424'), ladrilloL: hex('#c86a4a'), brown: hex('#7a4a3a'), brownS: hex('#5a3428'), brownL: hex('#9a6450'),
  caliza: hex('#d8d0bc'), calizaS: hex('#b0a890'), calizaL: hex('#ece6d6'),
  rojo: hex('#c8303a'), azul: hex('#2a3a7a'), oro: hex('#e8b830'), oroS: hex('#a8801c'), verde: hex('#2a7a5a'),
  hierba: hex('#5a9a4a'), hierbaS: hex('#3e7a38'), hierbaL: hex('#7ab85a'), grava: hex('#c8b490'), gravaS: hex('#a89470'), gravaL: hex('#e0d0ac'),
  papel: hex('#efe6cc'), papelS: hex('#d4c8a6'), tinta: hex('#2a2a4a'),
};
const ROPA = [[hex('#2e3a5a'), hex('#1e2840'), hex('#2a2a36')], [hex('#6a4a34'), hex('#4a3224'), hex('#3a3030')], [hex('#5e6068'), hex('#44464e'), hex('#2e2e38')],
  [hex('#7a2e38'), hex('#561e28'), hex('#2a2a36')], [hex('#3e5a3a'), hex('#2c4028'), hex('#2e2e36')], [hex('#26262e'), hex('#141418'), hex('#24242e')], [hex('#4a4a7a'), hex('#34345a'), hex('#2a2a36')]];
const PIEL = [hex('#e8b890'), hex('#c8906a'), hex('#8a5a3a'), hex('#f0c8a0')];
const SOMB = [hex('#1c1c24'), hex('#3a2e26'), hex('#d8c070'), hex('#4a4a56')];
const SOMBM = [hex('#8a3a5a'), hex('#3a4a7a'), hex('#e8d8b0')];
const FIG = {
  hombre: ['.HHH.', 'HHHHH', '.ppp.', '.ppp.', 'ccccc', 'cccCc', 'ccccc', '.ccc.', '.l.l.', '.l.l.', '.z.z.'],
  mujer: ['.HHH.', 'HHHHH', '.ppp.', '.ppp.', '.ccc.', 'ccccc', '.cCc.', 'ccccc', 'ccccc', 'cccCc', '.z.z.'],
};
// una capa fija (se pinta una vez en un búfer y se copia encima en cada fotograma)
const CAPAS = {};
const capa = (clave, dibuja) => {
  if (!CAPAS[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); CAPAS[clave] = b; }
  const b = CAPAS[clave], B = R.buf; for (let i = 0; i < b.length; i++) if (b[i]) B[i] = b[i];
};
// una nube de tres tonos
const nube = (cx, cy, w, [cS, cB, cL]) => {
  const P = [[0, 0, 0.28], [-0.3, 0.07, 0.2], [0.3, 0.06, 0.22], [-0.1, -0.13, 0.23], [0.15, -0.09, 0.19], [0.48, 0.12, 0.12], [-0.48, 0.13, 0.11]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of P) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 2), r(f), cS);
  for (const [dx, dy, f] of P) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f), cB);
  for (const [dx, dy, f] of P) if (dy < 0.05) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), r(f * 0.55), cL);
};
// el cielo tramado con sol, nubes de tres tonos en tres capas a tres velocidades y pájaros (fuera de la zona de Atom)
const cielo = (t, o = {}) => {
  const B = R.buf, hor = Math.min(180, o.hor ?? 120), cols = o.cols ?? X.dia, n = cols.length - 1, sem = o.sem ?? 0;
  for (let y = 0; y < hor; y++) { const p = Math.min(n - 1e-6, (y / hor) * n), i = Math.floor(p), f = p - i, a = cols[i], b = cols[i + 1], f0 = y * 320;
    for (let x = 0; x < 320; x++) B[f0 + x] = bay(x, y) < f ? b : a; }
  if (o.sol) { const [sx, sy, sr] = o.sol;
    R.disco(sx, sy, sr + 4, (x, y) => (bay(x, y) < 0.6 ? X.halo : R.pget(x, y)));
    R.disco(sx, sy, sr, X.solL); R.disco(sx - 1, sy - 1, sr - 2, X.sol); }
  const y0 = o.yN ?? 18;
  [[1.5, 3, y0, 0.55], [4, 2, y0 + 16, 0.8], [8, 2, y0 + 30, 1.05]].forEach(([v, nn, yb, s], L) => {
    for (let k = 0; k < nn; k++) { const w = Math.round((16 + hh(k, L, 501 + sem) * 14) * s), per = 320 + w * 2 + 60,
      x = ((hh(k, L, 502 + sem) * per + t * v) % per) - w - 30, y = Math.round(yb + hh(k, L, 503 + sem) * 10 * s);
      if (y + w * 0.2 < hor) nube(x, y, w, L === 0 ? X.nube.map((c) => mez(c, cols[1], 0.4)) : X.nube); } });
  for (let k = 0; k < (o.aves ?? 3); k++) { const per = 420, x = Math.round(((hh(k, 9, 504 + sem) * per + t * (11 + k * 3)) % per) - 50),
    y = Math.round((o.yAves ?? 36) + hh(k, 8, 505 + sem) * 24 + Math.sin(t * 0.8 + k) * 3), a = Math.sin(t * 9 + k * 2) > 0;
    if ((x > 266 && y < 50) || y >= hor) continue;
    R.pset(x, y, X.ave); R.pset(x - 1, y - (a ? 1 : 0), X.ave); R.pset(x + 1, y - (a ? 1 : 0), X.ave); R.pset(x - 2, y - (a ? 2 : -1), X.ave); R.pset(x + 2, y - (a ? 2 : -1), X.ave); }
};
// gente pequeña de fondo (13 px con el sombrero, sin cara)
const gente = (x, suelo, t, k, o = {}) => {
  const muj = o.mujer ?? (k % 3 === 2), F = muj ? FIG.mujer : FIG.hombre, paso = o.anda !== false ? Math.floor(t * 5 + k * 1.7) % 2 : 0;
  const ropa = o.ropa ?? ROPA[k % ROPA.length], piel = PIEL[(k >> 1) % PIEL.length], som = o.som ?? (muj ? SOMBM[k % 3] : SOMB[(k >> 2) % SOMB.length]);
  const col = { H: som, p: piel, c: o.camisa ? X.camisa : ropa[0], C: o.camisa ? X.camisaS : ropa[1], l: ropa[2], z: C.k };
  x = Math.round(x); const y0 = suelo - 11;
  const fila = (j) => (!muj && paso && j >= 8 && j <= 9 ? ['..ll.', '.l..l'][j - 8] : F[j]);
  for (let j = 0; j < 11; j++) { const f = fila(j); for (let i = 0; i < 5; i++) if (f[i] !== '.') { const yy = y0 + j; if (f[i - 1] === undefined || f[i - 1] === '.') R.pset(x + i - 1, yy, C.k); if (f[i + 1] === undefined || f[i + 1] === '.') R.pset(x + i + 1, yy, C.k); if (j === 0) R.pset(x + i, yy - 1, C.k); } }
  for (let j = 0; j < 11; j++) { const f = fila(j); for (let i = 0; i < 5; i++) if (f[i] !== '.') R.pset(x + i, y0 + j, col[f[i]]); }
};
// una ventana de fachada (dintel, cristal con reflejo, parteluz); r decide luz encendida o persiana
const ventana = (x, y, w, hv, r, o = {}) => {
  const { rect, pset } = R, lit = r < (o.encendidas ?? 0.1), pers = r > 0.78, pf = 0.25 + (r - 0.78) * 2.5;
  rect(x - 1, y - 2, x + w, y - 1, o.dintel ?? X.calizaL); rect(x - 1, y + hv, x + w, y + hv, o.dintel ?? X.calizaL); rect(x - 1, y + hv + 1, x + w, y + hv + 1, mez(o.dintel ?? X.calizaL, C.k, 0.55));
  rect(x - 1, y, x - 1, y + hv - 1, C.k); rect(x + w - 1, y, x + w - 1, y + hv - 1, C.k);
  for (let j = 0; j < hv; j++) for (let i = 0; i < w - 1; i++) { let c = lit ? (j < hv / 2 ? X.calido : X.calidoS) : (i + j) % 7 < 2 ? X.vidrioL : j < hv * 0.45 ? X.vidrioM : X.vidrio; if (pers && j < hv * pf) c = j % 2 ? hex('#d8ccb0') : hex('#c4b896'); pset(x + i, y + j, c); }
  if (w >= 5) rect(x + ((w - 1) >> 1), y, x + ((w - 1) >> 1), y + hv - 1, hex('#e8e0d0')); if (hv >= 7) rect(x, y + (hv >> 1), x + w - 2, y + (hv >> 1), hex('#e8e0d0'));
};
// una fachada de ladrillo o de piedra con ventanas, cornisa con dentículos y su sombra
const edificio = (x0, x1, y0, y1, o = {}) => {
  const { rect, pset } = R, B = R.buf, [c, cS, cL] = o.pared ?? [X.ladrillo, X.ladrilloS, X.ladrilloL], piedra = o.tipo === 'piedra', sem = o.sem ?? 0;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    let col; const q = hh(x >> 1, y, 620 + sem);
    if (piedra) { const fila = Math.floor((y - y0) / 5), jy = (y - y0) % 5 === 4, jx = (x - x0 + fila * 7) % 14 === 0; col = jy || jx ? cS : q < 0.14 ? cL : q > 0.9 ? cS : c; }
    else { const fila = (y - y0) >> 1, jy = (y - y0) % 2 === 1, jx = (x - x0 + (fila & 1) * 2) % 4 === 0; col = jy ? mez(cS, c, 0.4) : jx ? cS : q < 0.12 ? cL : q > 0.93 ? cS : c; }
    if (x === x0) col = cL; else if (x >= x1 - 1) col = cS;
    B[y * 320 + x] = col; }
  const [vw, vh, px, py] = o.ventanas ?? [6, 9, 12, 14], ox = o.ox ?? 5, oy = o.oy ?? 8;
  for (let y = y0 + oy, j = 0; y + vh < y1 - (o.bajo ?? 14); y += py, j++) for (let x = x0 + ox, i = 0; x + vw < x1 - 2; x += px, i++) ventana(x, y, vw, vh, hh(i + sem, j, 630), o);
  rect(x0 - 2, y0 - 4, x1 + 2, y0 - 1, X.calizaL); rect(x0 - 2, y0 - 1, x1 + 2, y0 - 1, X.calizaS); for (let x = x0 - 1; x <= x1 + 1; x += 3) pset(x, y0 - 2, X.calizaS); rect(x0 - 3, y0 - 5, x1 + 3, y0 - 5, mez(X.calizaL, C.blanco, 0.4));
  for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const i = y0 * 320 + x; B[i] = mez(B[i], C.k, 0.35); }
  if (o.chimeneas) for (const cx of o.chimeneas) { rect(cx, y0 - 12, cx + 5, y0 - 5, C.k); rect(cx + 1, y0 - 11, cx + 4, y0 - 5, X.ladrilloS); rect(cx + 1, y0 - 11, cx + 4, y0 - 10, X.ladrilloL); rect(cx, y0 - 13, cx + 5, y0 - 12, C.k); }
};
// un caballo de tiro (para los coches): patas alternas, crin y cola; x: el pecho, y: el suelo
const caballo = (x, y, t, dir = 1, cab = hex('#7a4a2a'), cabS = hex('#4e2e18')) => {
  const { rect, pset } = R, Xd = (i) => Math.round(x + i * dir), s = Math.floor(t * 8 + x * 0.1) % 2, rr = (a, b, y0, y1, c) => rect(Math.min(Xd(a), Xd(b)), y0, Math.max(Xd(a), Xd(b)), y1, c);
  rr(-9, 0, y - 13, y - 8, C.k); rr(-8, -1, y - 12, y - 9, cab); rr(-8, -1, y - 12, y - 12, mez(cab, C.blanco, 0.25));
  rr(-1, 1, y - 17, y - 11, cab); rr(1, 4, y - 18, y - 15, cab); pset(Xd(4), y - 16, cabS); pset(Xd(2), y - 17, C.k); pset(Xd(0), y - 19, cabS); pset(Xd(-1), y - 18, cabS); for (let j = 0; j < 5; j++) pset(Xd(-2), y - 16 + j, cabS);
  pset(Xd(-10), y - 12, cabS); pset(Xd(-11), y - 11 + s, cabS); pset(Xd(-11), y - 10 + s, cabS);
  for (const [lx, f] of [[-8, 0], [-6, 1], [-3, 1], [-1, 0]]) { const up = (f ^ s) ? 1 : 0, sx = up ? dir : 0; rect(Math.min(Xd(lx), Xd(lx) + sx), y - 7, Math.max(Xd(lx), Xd(lx) + sx), y - 1 - up, cabS); pset(Xd(lx) + sx, y - up, C.k); }
};
// una rueda de radios que gira
const rueda = (x, y, r, t, dir, c = hex('#c8a040')) => { R.disco(x, y, r, C.k); R.disco(x, y, r - 1, c); R.disco(x, y, r - 2, C.k); const a = t * 7 * dir; for (let q = 0; q < 3; q++) R.pset(Math.round(x + Math.cos(a + q * 2.1) * (r - 1)), Math.round(y + Math.sin(a + q * 2.1) * (r - 1)), C.k); R.pset(x, y, c); };
// lo que se pinta dentro de dibuja() se mezcla con un color (la sombra de la torre, la luz del sol) en la caja dada
const tintado = (x0, y0, x1, y1, col, a, dibuja) => {
  x0 = Math.max(0, Math.round(x0)); x1 = Math.min(319, Math.round(x1)); y0 = Math.max(0, Math.round(y0)); y1 = Math.min(179, Math.round(y1));
  const v = []; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) v.push(R.pget(x, y));
  dibuja(); let i = 0; if (a <= 0) return;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const p = R.pget(x, y); if (p !== v[i++]) R.pset(x, y, mez(p, col, a)); }
};
// las manos que tapan los ojos de un personaje chibi (cabeza = lo que devuelve R.actor)
const tapaOjos = (cab, dir = 1, piel = hex('#f0c8a0')) => { const [cx, cy] = cab, y = cy + 4; R.rect(cx - 5, y, cx + 6, y + 3, C.k); R.rect(cx - 4, y + 1, cx + 5, y + 2, piel); R.pset(cx, y + 1, C.k); R.pset(cx + 1, y + 2, C.k); R.rect(cx - 4, y + 2, cx + 5, y + 2, mez(piel, C.k, 0.25)); };
'''

# ── piezas propias del grupo S10 ─────────────────────────────────────────────────────────────────────────────────────
PRE2 = r'''
const GH = hex('#c4f6e2'), GHS = hex('#6ac8a0');
// el fantasma de 1524: lo que pinta dibuja() se mezcla con lo de debajo, tramado (a: cuánto se ve) y teñido de verde pálido
const fantasmal = (x0, y0, x1, y1, a, dibuja) => {
  x0 = Math.max(0, Math.round(x0)); x1 = Math.min(319, Math.round(x1)); y0 = Math.max(0, Math.round(y0)); y1 = Math.min(179, Math.round(y1));
  if (x1 < x0 || y1 < y0) return; const v = []; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) v.push(R.pget(x, y));
  dibuja(); let i = 0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++, i++) { const p = R.pget(x, y), q = v[i]; if (p !== q) R.pset(x, y, bay(x, y) < a ? mez(mez(p, GH, 0.5), q, 0.2) : mez(q, GH, 0.18 * a)); }
};
// dibuja una figura en coordenadas locales giradas: u a lo largo, v hacia abajo (lo alto, v < 0); fn(u, v) → color o 0
const rotado = (cx, cy, ang, u0, u1, v0, v1, fn) => {
  const c = Math.cos(ang), s = Math.sin(ang), P = [[u0, v0], [u1, v0], [u0, v1], [u1, v1]].map(([u, v]) => [cx + u * c - v * s, cy + u * s + v * c]);
  const xa = Math.floor(Math.min(...P.map((p) => p[0]))) - 1, xb = Math.ceil(Math.max(...P.map((p) => p[0]))) + 1, ya = Math.floor(Math.min(...P.map((p) => p[1]))) - 1, yb = Math.ceil(Math.max(...P.map((p) => p[1]))) + 1;
  for (let y = Math.max(0, ya); y <= Math.min(179, yb); y++) for (let x = Math.max(0, xa); x <= Math.min(319, xb); x++) {
    const dx = x - cx, dy = y - cy, u = Math.round(dx * c + dy * s), v = Math.round(-dx * s + dy * c);
    if (u < u0 || u > u1 || v < v0 || v > v1) continue; const col = fn(u, v); if (col) R.pset(x, y, col); }
};
// un pictograma de filas de letras-clave (cada letra, un color de cols), con su contorno negro
const picto = (pat, x, y, cols, o = {}) => {
  const filas = o.filas ?? pat.length, j0 = pat.length - filas, en = (i, j) => j >= j0 && j < pat.length && i >= 0 && i < pat[j].length && pat[j][i] !== '.';
  for (let j = j0 - 1; j <= pat.length; j++) for (let i = -1; i <= pat[0].length; i++) if (!en(i, j) && (en(i - 1, j) || en(i + 1, j) || en(i, j - 1) || en(i, j + 1))) R.pset(x + i, y + j, C.k);
  for (let j = j0; j < pat.length; j++) for (let i = 0; i < pat[j].length; i++) if (pat[j][i] !== '.') R.pset(x + i, y + j, cols[pat[j][i]]);
};
// una banderita lisa que ondea (sin escudos): tipos 0–5; (x, y) = la punta del mástil
const BANDERAS = [[hex('#2a5aa8'), hex('#f2eee2'), hex('#c8303a'), 'v'], [hex('#2a8a4a'), hex('#f2eee2'), hex('#e8783a'), 'v'], [hex('#e8c030'), hex('#2a3a7a'), hex('#e8c030'), 'h'],
  [hex('#c8303a'), hex('#f2eee2'), hex('#c8303a'), 'd'], [hex('#2a3a7a'), hex('#e8c030'), hex('#2a3a7a'), 'c'], [hex('#1a1a24'), hex('#c8303a'), hex('#e8c030'), 'h']];
const banderita = (x, y, t, k, w = 9, h = 6) => {
  const [a, b, c, tipo] = BANDERAS[k % BANDERAS.length];
  for (let i = 0; i < w; i++) { const dy = Math.round(Math.sin(t * 6 - i * 0.7 + k) * (i / w) * 1.6); for (let j = 0; j < h; j++) {
    let col = tipo === 'v' ? [a, b, c][Math.min(2, Math.floor(i * 3 / w))] : tipo === 'h' ? [a, b, c][Math.min(2, Math.floor(j * 3 / h))] : tipo === 'd' ? (Math.hypot(i - w / 2, j - h / 2 + 0.5) < h * 0.32 ? b : a) : (i === Math.floor(w / 3) || j === Math.floor(h / 2) ? b : a);
    if (i === w - 1 || j === h - 1) col = mez(col, C.k, 0.3); R.pset(x + 1 + i, y + j + dy, col); } }
};
// un bocadillo de diálogo pequeño con una banderita dentro (los idiomas) o un icono
const bocadillo = (x, y, t, k, o = {}) => {
  R.rect(x - 1, y - 1, x + 14, y + 10, C.k); R.rect(x, y, x + 13, y + 9, C.blanco); R.rect(x, y + 8, x + 13, y + 9, hex('#d8d4e0'));
  const d = o.dir ?? 1, cola = d > 0 ? x + 2 : x + 10; R.rect(cola, y + 10, cola + 2, y + 11, C.k); R.pset(cola + 1, y + 10, C.blanco); R.pset(d > 0 ? cola - 1 : cola + 3, y + 12, C.k);
  if (o.icono) R.icono(o.icono, x + 4, y + 1, o.col ?? hex('#c8303a'), hex('#5a1a1a')); else banderita(x + 1, y + 2, t, k, 11, 6);
};
// un coche visto por detrás, a escala s; (xc, yb) = el centro abajo (sus ruedas en el suelo)
const cocheDetras = (xc, yb, s, col) => {
  const w = Math.max(3, Math.round(12 * s)), h = Math.max(3, Math.round(11 * s)), xa = Math.round(xc - w), xb = Math.round(xc + w), yt = Math.round(yb - h);
  R.rect(xa - 1, yt - 1, xb + 1, yb, C.k); R.rect(xa, yt + Math.round(h * 0.45), xb, yb - Math.max(1, Math.round(2 * s)), col);
  R.rect(xa + Math.round(w * 0.3), yt, xb - Math.round(w * 0.3), yt + Math.round(h * 0.45), col); R.rect(xa + Math.round(w * 0.38), yt + 1, xb - Math.round(w * 0.38), yt + Math.round(h * 0.42), hex('#2a3a5a'));
  if (s > 0.5) { R.rect(xa + 1, yt + Math.round(h * 0.6), xa + Math.max(1, Math.round(3 * s)), yt + Math.round(h * 0.72), hex('#e83a3a')); R.rect(xb - Math.max(1, Math.round(3 * s)), yt + Math.round(h * 0.6), xb - 1, yt + Math.round(h * 0.72), hex('#e83a3a'));
    R.rect(xa, yb - Math.max(2, Math.round(3 * s)), xb, yb - Math.max(2, Math.round(3 * s)) + Math.max(0, Math.round(s) - 1), hex('#d8dce4')); R.rect(xa, yt + Math.round(h * 0.45), xb, yt + Math.round(h * 0.45), mez(col, C.blanco, 0.4)); }
  R.rect(xa, yb - Math.max(1, Math.round(2 * s)) + 1, xa + Math.max(1, Math.round(3 * s)), yb, C.k); R.rect(xb - Math.max(1, Math.round(3 * s)), yb - Math.max(1, Math.round(2 * s)) + 1, xb, yb, C.k);
};
// un perrito que pasea (9 px), x: la cola, y: las patas
const perro = (x, y, t, dir = 1, anda = true) => {
  const X0 = (i) => Math.round(x + i * dir), f = anda ? Math.floor(t * 8) % 2 : 0, c = hex('#a8743c'), cS = hex('#7a4a24');
  R.rect(Math.min(X0(1), X0(8)), y - 6, Math.max(X0(1), X0(8)), y - 3, C.k); R.rect(Math.min(X0(2), X0(7)), y - 5, Math.max(X0(2), X0(7)), y - 4, c);
  R.rect(Math.min(X0(7), X0(10)), y - 8, Math.max(X0(7), X0(10)), y - 5, C.k); R.rect(Math.min(X0(8), X0(9)), y - 7, Math.max(X0(8), X0(9)), y - 6, c); R.pset(X0(9), y - 7, C.k); R.pset(X0(8), y - 8, cS);
  R.pset(X0(0), y - 6 - f, C.k); R.pset(X0(1), y - 7 - f, C.k);
  for (const [lx, g] of [[2, 0], [3, 1], [6, 1], [7, 0]]) R.rect(X0(lx), y - 3, X0(lx), y - ((g ^ f) ? 1 : 0), cS);
};
'''

E = {}

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['ny-hoy'] = ('Hoy', '''// NY-HOY (frases 50–51), de 1950 a hoy, cartela «1950». Cinco planos:
// 1. (hasta «And beside») 1950, la ciudad más grande del mundo: un desfile de papelitos por Broadway; el descapotable
//    con el marinero y el concejal y la moto de la policía delante; la gente tira papeles desde las ventanas y aplaude
//    tras la valla; en «biggest» se desenrolla en la fachada el estandarte con el «1» y el marinero salta y lanza la gorra;
// 2. (hasta el silencio antes de «A glass») 1952, la sede de la ONU junto al río Este: una pareja llega, ella señala la
//    torre en «rises» y él le hace una foto en «headquarters» (el flash espanta a las palomas); un diplomático saluda;
// 3. (hasta «Today») el planeta desde arriba: la torre de cristal de Nueva York brilla en «glass tower» y en «half the
//    planet» brotan sus copias por el mundo, una tras otra, junto a una pagoda, una cúpula, una palmera, unas columnas,
//    unas cebollas y un molino, con su banderita lisa y el rastro de puntos desde Nueva York (la barra de 1952 a 2010);
// 4. (hasta «like») la calle de las capas, hoy: cada vecino habla en su idioma (bocadillos con banderitas): una pareja que
//    charla, un cliente que compra un perrito caliente en el carrito, unos turistas con el plano que preguntan y una
//    vecina que les señala el camino; en «buildings» las épocas se encienden una tras otra;
// 5. el tocón de Central Park: un chico señala los anillos, que se encienden del centro afuera en «rings»; en «Every era»
//    cada anillo se tiñe con el color de su época y brota su casita (la holandesa, la federal, la brownstone, el art déco
//    y el cristal); una ardilla sube al tocón con su bellota y sale de un salto; la abuela lo explica.''', PRE + PRE2 + r'''
const P2 = @(5.5), P3 = @(9.6), P4 = @(13.13), P5 = @(17.41);
const mayor = @(4.13), sube = @(7.07), cuartel = @(8.79), vidrio = @(10.15), mitad = @(10.73), idiomas = @(14.01), calles = @(15.55), edif = @(16.63), anillos = @(17.75), era = @(19.25);

// ── 1 · el desfile de papelitos de 1950 ──
const ED = [
  [0, 58, 26, 'piedra', [X.caliza, X.calizaS, X.calizaL], [5, 7, 9, 11], hex('#c8303a'), hex('#f2eee2')],
  [60, 118, 40, 'ladrillo', [X.ladrillo, X.ladrilloS, X.ladrilloL], [5, 8, 10, 12], hex('#2a6a4a'), hex('#e8e0c8')],
  [120, 196, 20, 'piedra', [hex('#c8c0ac'), hex('#a09884'), hex('#e0d8c4')], [5, 7, 9, 11], hex('#2a3a7a'), hex('#e8e0c8')],
  [198, 246, 46, 'ladrillo', [X.brown, X.brownS, X.brownL], [5, 8, 10, 12], hex('#e8783a'), hex('#f2eee2')],
  [248, 319, 58, 'piedra', [hex('#b8b4a8'), hex('#908c80'), hex('#d4d0c4')], [6, 8, 11, 12], hex('#7a2e38'), hex('#e8d8b0')],
];
const fondoDesfile = () => capa('desfile', () => {
  const { rect, pset } = R;
  for (const [x0, x1, top, tipo, pared, v] of ED) edificio(x0, x1, top, 131, { tipo, pared, ventanas: v, bajo: 26, sem: x0, encendidas: 0 });
  // la corona escalonada del edificio del centro
  rect(140, 16, 176, 19, C.k); rect(141, 17, 175, 19, hex('#e0d8c4')); for (let x = 143; x < 175; x += 4) pset(x, 18, hex('#a09884'));
  // las plantas bajas: toldos de rayas, escaparates con género y puertas
  for (const [x0, x1, , , pared, , ca, cb] of ED) {
    rect(x0, 104, x1, 131, mez(pared[0], C.k, 0.25)); rect(x0, 104, x1, 105, pared[2]);
    for (let x = x0 + 2; x < x1 - 2; x++) { const c = Math.floor((x - x0) / 4) % 2 ? ca : cb; rect(x, 107, x, 112, c); pset(x, 113, (x - x0) % 4 < 2 ? mez(c, C.k, 0.3) : C.k); }
    rect(x0 + 2, 106, x1 - 2, 106, C.k);
    for (let x = x0 + 4; x + 12 < x1 - 2; x += 18) { rect(x, 116, x + 12, 129, C.k); for (let j = 117; j <= 128; j++) for (let i = x + 1; i <= x + 11; i++) pset(i, j, (i + j) % 9 < 2 ? X.vidrioL : j < 121 ? X.vidrioM : X.vidrio);
      for (let k = 0; k < 4; k++) { const gx = x + 2 + k * 3, c = [hex('#e8b830'), hex('#c8303a'), hex('#5a9a4a'), hex('#e8e0d0')][(k + x) % 4]; rect(gx, 125, gx + 1, 128, c); } }
    const dx = Math.round((x0 + x1) / 2) - 3; rect(dx, 116, dx + 6, 131, C.k); rect(dx + 1, 117, dx + 5, 131, hex('#5a3a24')); pset(dx + 4, 124, X.oro);
  }
  // la acera de enfrente, el bordillo y la calzada con alcantarillas y papelitos pisados
  for (let y = 132; y <= 140; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 140 ? C.k : (x % 16 === 0 || y === 136) ? X.aceraS : hh(x, y, 3) < 0.1 ? X.aceraL : X.acera);
  for (let y = 141; y < 180; y++) for (let x = 0; x < 320; x++) { const q = hh(x >> 1, y, 7); pset(x, y, q < 0.08 ? X.adoquinL : q > 0.93 ? X.adoquinS : X.adoquin); }
  for (let x = 6; x < 320; x += 30) rect(x, 158, x + 12, 158, hex('#e8e0c0'));
  for (const mx of [44, 236]) { rect(mx - 6, 148, mx + 6, 150, C.k); rect(mx - 5, 149, mx + 5, 149, X.hierroL); }
  for (let k = 0; k < 260; k++) { const x = Math.floor(hh(k, 1, 40) * 320), y = 141 + Math.floor(hh(k, 2, 40) * 39); pset(x, y, [C.blanco, hex('#f2e8a0'), hex('#f0b8c8'), hex('#a8d0f0')][k % 4]); }
});
// las ventanas de donde tiran papeles (y la gente que se asoma)
const TIRAN = [[24, 58], [94, 74], [100, 98], [150, 42], [170, 66], [218, 82], [272, 78], [296, 92], [36, 86], [132, 86]];
const CONF = [C.blanco, C.blanco, hex('#f2e8a0'), hex('#f0b8c8'), hex('#a8d0f0'), hex('#b8e8a8')];
const confeti = (t, n, t0 = 0) => {
  for (let k = 0; k < n; k++) { const v = 12 + hh(k, 3, 50) * 18, per = 220, y = Math.round(((hh(k, 1, 50) * per + (t - t0) * v) % per) - 30), x = Math.round(((hh(k, 2, 50) * 340 + Math.sin(t * 1.6 + k) * 6 + t * 5) % 340) - 10);
    if (y < -2 || y > 179 || (x > 274 && y < 48) || (y < 16 && x > 16 && x < 172)) continue; const c = CONF[k % CONF.length], g = Math.sin(t * 7 + k) > 0;
    if (k % 7 === 0) { R.pset(x, y, c); R.pset(x + (g ? 1 : -1), y + 1, c); R.pset(x, y + 2, c); R.pset(x + (g ? -1 : 1), y + 3, c); } else { R.pset(x, y, c); if (g) R.pset(x + 1, y, mez(c, C.k, 0.2)); } }
};
const bandera50 = (x, y, t, d) => {
  R.linea(x, y, x + 6 * d, y - 5, hex('#c8c0a8'));
  for (let i = 0; i < 11; i++) { const xx = x + (6 + i) * d, dy = Math.round(Math.sin(t * 5 - i * 0.6) * i / 10 * 1.5); for (let j = 0; j < 7; j++) { const canton = i < 5 && j < 4; R.pset(xx, y - 5 + j + dy, canton ? ((i + j) % 2 ? C.blanco : hex('#2a3a7a')) : j % 2 ? C.blanco : hex('#c8303a')); } }
};
const descapotable = (x, b, t, delante) => {
  const { rect, pset } = R, neg = hex('#e8e0c8'), negL = hex('#fff8e8'), cro = hex('#a8acb8');
  if (!delante) { rect(x + 4, b - 14, x + 52, b - 9, hex('#7a2a2a')); rect(x + 30, b - 17, x + 46, b - 12, hex('#8a3434')); rect(x + 30, b - 17, x + 46, b - 17, hex('#a84a4a')); return; }
  rect(x, b - 11, x + 60, b - 2, C.k); rect(x + 1, b - 10, x + 59, b - 3, neg); rect(x + 1, b - 10, x + 59, b - 9, negL); rect(x + 2, b - 6, x + 58, b - 6, cro);
  rect(x + 54, b - 9, x + 60, b - 7, C.k); rect(x + 57, b - 9, x + 59, b - 8, hex('#f8f0b0')); rect(x - 1, b - 4, x + 61, b - 3, cro);
  rect(x + 18, b - 16, x + 20, b - 11, C.k); rect(x + 19, b - 16, x + 19, b - 12, hex('#9ac8e0'));
  for (const wx of [x + 12, x + 48]) { R.disco(wx, b - 2, 5, C.k); R.disco(wx, b - 2, 3, C.blanco); R.disco(wx, b - 2, 2, hex('#8a8a96')); const a = t * 9; pset(Math.round(wx + Math.cos(a) * 2), Math.round(b - 2 + Math.sin(a) * 2), C.k); }
  for (const [fx, d] of [[x + 6, -1], [x + 56, 1]]) { R.linea(fx, b - 11, fx, b - 22, hex('#c8c0a8')); for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) pset(fx + (1 + i) * (d > 0 ? 1 : -1) * -1 + 0, b - 22 + j + Math.round(Math.sin(t * 8 - i) * 0.6), j % 2 ? C.blanco : hex('#c8303a')); }
};
const moto = (x, b, t) => { const { rect } = R; rueda(x, b - 4, 4, t, 1, hex('#3a3a46')); rueda(x + 18, b - 4, 4, t, 1, hex('#3a3a46')); rect(x + 2, b - 10, x + 16, b - 6, C.k); rect(x + 3, b - 9, x + 15, b - 7, hex('#2a3a6a')); rect(x + 16, b - 12, x + 19, b - 9, C.k); rect(x + 17, b - 11, x + 18, b - 10, hex('#f8f0b0')); rect(x + 5, b - 11, x + 9, b - 10, C.k); };
const p1 = (t) => {
  cielo(t, { hor: 64, cols: X.dia, sol: [96, 26, 6], yN: 12, aves: 2, yAves: 20, sem: 1 });
  fondoDesfile();
  for (const [bx, by, d] of [[58, 60, -1], [196, 54, 1], [118, 84, -1], [246, 74, 1]]) bandera50(bx, by, t, d);
  // el estandarte con el «1» que se desenrolla en «biggest»
  const u = tramo(t, mayor - 0.05, mayor + 0.45);
  R.rect(136, 50, 180, 53, C.k); R.rect(137, 51, 179, 52, hex('#8a5a2a'));
  if (u > 0) { const h = Math.round(54 * u); R.rect(139, 53, 177, 53 + h, C.k); R.rect(140, 53, 176, 52 + h, hex('#f2ead2'));
    for (let y = 53; y < 52 + h; y++) { R.pset(141, y, hex('#c8303a')); R.pset(142, y, hex('#2a3a7a')); R.pset(175, y, hex('#c8303a')); R.pset(174, y, hex('#2a3a7a')); }
    R.recorte([140, 53, 176, 52 + h]);
    R.disco(158, 80, 13, C.k); for (let a = 0; a < 24; a++) { const ang = a / 24 * Math.PI * 2; R.disco(Math.round(158 + Math.cos(ang) * 11), Math.round(80 + Math.sin(ang) * 11), 2, a % 2 ? hex('#2a3a7a') : hex('#3a5aa8')); }
    R.disco(158, 80, 9, C.k); R.disco(158, 80, 8, X.oro); R.disco(157, 79, 6, hex('#f8d860'));
    R.poligono([[150, 92], [146, 104], [151, 101], [154, 104], [156, 92]], hex('#c8303a')); R.poligono([[160, 92], [162, 104], [165, 101], [170, 104], [166, 92]], hex('#c8303a'));
    if (h > 34) R.numero('1', 158, 87, { tam: 16, centro: true });
    R.recorte(null);
    R.rect(138, 52 + h, 178, 54 + h, C.k); R.rect(139, 53 + h, 177, 53 + h, hex('#8a5a2a')); }
  // la gente que se asoma a las ventanas y tira papeles
  for (const [k, [wx, wy]] of TIRAN.entries()) { const tira = Math.sin(t * 3 + k * 1.7) > 0.2;
    R.rect(wx, wy, wx + 4, wy + 4, C.k); R.rect(wx + 1, wy + 1, wx + 3, wy + 3, PIEL[k % 4]); R.rect(wx + 1, wy, wx + 3, wy, [hex('#3a2418'), hex('#c8904c'), hex('#1c1424')][k % 3]);
    R.rect(wx + 4, wy + (tira ? 0 : 3), wx + 5, wy + (tira ? 2 : 5), PIEL[k % 4]); if (tira) for (let i = 0; i < 5; i++) R.pset(wx + 6 + i, wy - 1 + Math.round(Math.sin(t * 9 + i + k) * 2) + i, CONF[(i + k) % CONF.length]); }
  // la acera de enfrente, llena de gente que saluda
  tintado(0, 126, 319, 140, hex('#c8c0b0'), 0.35, () => { for (let k = 0; k < 22; k++) { const gx = 4 + k * 14 + Math.round(hh(k, 0, 60) * 6), salta = Math.sin(t * 6 + k * 2) > 0.8 ? 1 : 0; gente(gx, 139 - salta, t, k + 3, { anda: false }); if (k % 3 === 0) R.rect(gx + 5, 127 - salta, gx + 5, 130 - salta, PIEL[k % 4]); } });
  R.rect(0, 141, 319, 141, hex('#c8303a')); for (let x = 6; x < 320; x += 24) { R.rect(x, 136, x + 1, 142, C.k); }
  // la moto de la policía, el descapotable con el concejal y el marinero
  const v = tramo(t, 1.2, 5.3), cx = Math.round(lerp(-90, 132, v)), b = 157;
  const mx = cx + 76; R.actor(EL.funcionario, mx + 2, b - 6, t, { dir: 1, quieto: v > 0.98, sonrisa: true }); moto(mx, b, t);
  descapotable(cx, b, t, false);
  R.actor(EL.oficinista, cx + 12, b - 7, t, { dir: 1, sonrisa: true, dedo: Math.sin(t * 2.4) > 0, habla: t > 2.2 && t < 3.2 && Math.sin(t * 9) > 0 });
  const salta = t > mayor - 0.05 && t < mayor + 0.45, lanza = t > mayor + 0.1;
  const ma = R.actor(EL.marinero39, cx + 32, b - 11, t, { dir: 1, sonrisa: true, salto: salta ? 3 : 0, brazos: t > mayor - 0.05, dedo: t < mayor && Math.sin(t * 3.2) > -0.3, tocado: lanza ? false : undefined });
  descapotable(cx, b, t, true);
  if (lanza) { const g = Math.min(1.6, t - mayor - 0.1), gx = Math.round(ma.cabeza[0] + g * 34), gy = Math.round(ma.cabeza[1] - 4 - g * 52 + g * g * 22);
    if (gy < 175) { R.rect(gx - 3, gy - 1, gx + 3, gy + 2, C.k); R.rect(gx - 2, gy, gx + 2, gy + 1, C.blanco); R.rect(gx - 3, gy + 2, gx + 3, gy + 2, hex('#d8dce4')); } }
  confeti(t, 150);
  // la valla y el público de delante, que aplaude
  R.rect(0, 160, 319, 162, C.k); for (let x = 0; x < 320; x++) R.pset(x, 161, Math.floor(x / 8) % 2 ? hex('#2a4a8a') : C.blanco);
  const tipos = ['rizos', 'calvo', 'mujer', 'marinero', 'rizos', 'mujer'], ropa = ['#2a3a6a', '#7a5a3a', '#5a7a4a', '#8a2a2a', '#3a3a4a', '#c8a060', '#5a3a6a', '#2a5a5a'], pelo = ['#3a2418', '#5a3418', '#8a5428', '#1c1424', '#c8904c'];
  for (let fila = 0; fila < 2; fila++) for (let k = 0; k < 30; k++) { const x = Math.round(k * 11 - 4 + fila * 5 + (hh(k, fila, 4) - 0.5) * 4); if (fila === 1 && x > 96 && x < 214) continue;
    const y = 156 + fila * 10 - (Math.sin(t * 7 + k * 1.3) > 0.6 ? 1 : 0), cr = hex(ropa[Math.floor(hh(k, fila, 7) * 8)]), ph = hex(pelo[Math.floor(hh(k, fila, 9) * 5)]);
    R.busto(tipos[Math.floor(hh(k, fila, 6) * 6)], { C: cr, c: mez(cr, C.k, 0.3), H: ph, h: ph, V: hex('#e8dcc0'), P: C.blanco, p: hex('#d8dce4') }, x, y, t + k, { rie: Math.sin(t * 2 + k) > -0.4, saluda: hh(k, fila, 10) > 0.7 });
    if (hh(k, fila, 11) > 0.82) { const f = Math.sin(t * 8 + k) > 0 ? 1 : 0; R.linea(x + 9, y + 2, x + 9, y - 7, hex('#8a6a40')); R.rect(x + 10, y - 7 + f, x + 15, y - 4 + f, hex('#c8303a')); R.rect(x + 10, y - 7 + f, x + 12, y - 6 + f, hex('#2a3a7a')); R.rect(x + 13, y - 5 + f, x + 15, y - 5 + f, C.blanco); } }
};

// ── 2 · la ONU junto al río Este, 1952 ──
const p2 = (t) => {
  T.hoy(R, t, { encuadre: 'onu' });
  const fl = cuartel, vuela = t > fl + 0.05;
  for (let k = 0; k < 5; k++) { const x0 = 150 + k * 9, y0 = 170 + (k % 2) * 4, d = k % 2 ? 1 : -1, s = Math.max(0, t - fl - 0.05 - k * 0.04);
    const x = vuela ? x0 + s * (40 + k * 12) * (k % 2 ? 1 : 0.6) : x0 + Math.sin(t * 0.7 + k) * 3, y = vuela ? y0 - s * (46 + k * 8) : y0;
    if (y > 50 || x < 270) T.e_paloma(R, Math.round(x), Math.round(y), t, { picotea: !vuela, vuela, dir: vuela ? 1 : d }); }
  // el diplomático del maletín, que cruza y saluda con el sombrero
  const dv = tramo(t, P2 + 0.2, P2 + 2.6), dx = Math.round(lerp(300, 196, dv));
  const di = R.actor(EL.vecino, dx, 166, t, { dir: -1, anda: dv > 0 && dv < 1, sostiene: true, dedo: t > cuartel + 0.3, sonrisa: t > cuartel + 0.3 });
  if (!(t > cuartel + 0.3)) { const [hx, hy] = di.mano; R.rect(hx - 5, hy, hx + 2, hy + 5, C.k); R.rect(hx - 4, hy + 1, hx + 1, hy + 4, hex('#7a4a24')); R.rect(hx - 2, hy - 1, hx - 1, hy, C.k); }
  // la pareja que llega: ella señala la torre que sube; él hace la foto
  const a = tramo(t, P2 + 0.05, P2 + 1.3), xh = Math.round(lerp(-22, 92, a)), xm = Math.round(lerp(-44, 116, a));
  const sube_ = t > sube - 0.1 && t < cuartel + 0.4;
  R.actor(EL.oficinista2, xm, 166, t, { dir: 1, anda: a > 0 && a < 1, dedo: sube_, sorpresa: t > sube - 0.1 && t < sube + 0.6, sonrisa: t > sube + 0.6 });
  const alza = tramo(t, cuartel - 0.8, cuartel - 0.4) * (1 - tramo(t, cuartel + 0.5, cuartel + 0.8));
  const ho = R.actor(EL.oficinista, xh, 166, t, { dir: 1, anda: a > 0 && a < 1, sostiene: alza > 0 ? [xh + 18, Math.round(lerp(151, 143, alza))] : true, sonrisa: t > cuartel });
  const [cx, cy] = ho.mano; R.rect(cx - 2, cy - 3, cx + 5, cy + 2, C.k); R.rect(cx - 1, cy - 2, cx + 4, cy + 1, hex('#3a3a46')); R.rect(cx + 1, cy - 2, cx + 3, cy - 1, hex('#8a8a96')); R.rect(cx + 5, cy - 1, cx + 6, cy, C.k); R.rect(cx, cy - 4, cx + 1, cy - 3, C.k);
  if (t > fl && t < fl + 0.18) { R.disco(cx + 7, cy - 1, 10, (x, y) => (bay(x, y) < 0.5 ? C.blanco : R.pget(x, y))); R.disco(cx + 7, cy - 1, 4, C.blanco); for (let i = 5; i < 13; i++) { R.pset(cx + 7 + i, cy - 1, C.blanco); R.pset(cx + 7, cy - 1 - i, C.blanco); R.pset(cx + 7 - i, cy - 1, C.blanco); } }
};

// ── 3 · las copias por el planeta ──
const ESP = [hex('#0c1230'), hex('#1c2c5c'), hex('#36589a'), hex('#6a9ad0'), hex('#b4dcf2')];
const PLA = { r: 440, cx: 160, cy: 540 };
const limbo = (x) => PLA.cy - Math.sqrt(PLA.r * PLA.r - (x - PLA.cx) ** 2);
const planeta = () => capa('planeta', () => {
  const { pset } = R;
  for (let y = 96; y < 180; y++) for (let x = 0; x < 320; x++) {
    const d = Math.hypot(x - PLA.cx, y - PLA.cy) - PLA.r;
    if (d > 0) { if (d < 5) pset(x, y, bay(x, y) < (5 - d) / 5 ? hex('#b8e8ff') : hex('#7ab8e8')); continue; }
    const dd = -d, lat = dd / 80, n = 0.55 * R.vnoise(x / 26 + 3, y / 9) + 0.3 * R.vnoise(x / 11, y / 4.5 + 7) + 0.15 * R.vnoise(x / 4, y / 2);
    let c = n > 0.56 ? (n > 0.7 ? (n > 0.76 ? hex('#c8b48a') : hex('#a8946a')) : (n > 0.63 ? hex('#3e7a3e') : hex('#5a9a4a'))) : (n > 0.5 ? hex('#3a8ac0') : lat > 0.55 ? hex('#1a3e6a') : hex('#24609a'));
    if (n > 0.555 && n < 0.57) c = hex('#e0d8a8');
    if (n < 0.45 && (x + y * 3) % 23 === 0) c = hex('#3a7ab0');
    if (dd < 2) c = mez(c, hex('#d8f4ff'), 0.6); else if (dd < 5 && bay(x, y) < 0.5) c = mez(c, hex('#b8e8ff'), 0.4);
    if (hh(x >> 1, y, 83) < 0.06) c = mez(c, C.blanco, 0.25);
    pset(x, y, c); }
});
// cada ciudad: [x en el limbo, monumento, alto de la torre, bandera]
const CIUDADES = [[160, 'ny', 34, 0], [114, 'cupula', 22, 1], [206, 'columnas', 24, 2], [70, 'pagoda', 20, 3], [250, 'cebolla', 22, 4], [28, 'palmera', 18, 5], [292, 'molino', 18, 0]];
const MON = {
  cupula: ['...a...', '..aaa..', '.aaaaa.', '.aaaaa.', 'bbbbbbb', 'bcbcbcb', 'bcbcbcb', 'bbbbbbb'],
  columnas: ['....a....', '..aaaaa..', 'aaaaaaaaa', 'bbbbbbbbb', 'b.b.b.b.b', 'b.b.b.b.b', 'b.b.b.b.b', 'bbbbbbbbb'],
  pagoda: ['...a...', '..aaa..', '.bbbbb.', 'aaaaaaa', '.bcbcb.', 'aaaaaaa', '.bcbcb.', '.bbbbb.'],
  cebolla: ['.a...a.', 'aaa.aaa', 'aaa.aaa', '.a...a.', 'bbbbbbb', 'bcbbbcb', 'bcbbbcb', 'bbbbbbb'],
  palmera: ['aa.aa..', '.aaa.aa', 'aa.a...', '...b...', '...b...', '..b....', '..b....', '..b....'],
  molino: ['a...a', '.a.a.', '..b..', '.a.a.', 'a.b.a', '.bbb.', '.bcb.', '.bbb.'],
};
const MONC = { cupula: { a: hex('#e8c860'), b: hex('#f0ece0'), c: hex('#8a7a5a') }, columnas: { a: hex('#e8e0d0'), b: hex('#d0c8b4'), c: hex('#8a8070') },
  pagoda: { a: hex('#c8303a'), b: hex('#e8c060'), c: hex('#5a1a1a') }, cebolla: { a: hex('#3a8a6a'), b: hex('#e8d8c0'), c: hex('#c8303a') },
  palmera: { a: hex('#3a8a3a'), b: hex('#8a5a2a'), c: hex('#8a5a2a') }, molino: { a: hex('#e8e0d0'), b: hex('#8a5a3a'), c: hex('#3a2a1a') } };
const torreCristal = (x, ang, H, e, t, k, grande) => {
  const y = limbo(x), h = Math.round(H * e), w = grande ? 6 : 4; if (h < 1) return;
  const brillo = grande ? tramo(t, vidrio, vidrio + 0.7) : 0, by = -h + Math.round(brillo * (h + 6)) - 3;
  rotado(x, y, ang, -w - 1, w + 1, -h - 1, 1, (u, v) => {
    if (u === -w - 1 || u === w + 1 || v === -h - 1) return C.k;
    if (grande && (u <= -w + 1 || u >= w - 1)) return u < 0 ? hex('#e8e4dc') : hex('#b8b4ac');
    if (brillo > 0 && brillo < 1 && Math.abs(v - by - u * 0.5) < 1.6) return hex('#ffffff');
    if ((v + h) % 3 === 0) return hex('#2a4a6a');
    return u < -1 ? hex('#9ad0e8') : (u + v) % 5 === 0 ? hex('#c8eef8') : hex('#5a9ac0'); });
  return [x + Math.sin(ang) * (h + 2), y - Math.cos(ang) * (h + 2)];
};
const p3 = (t) => {
  cielo(t * 0.6, { hor: 130, cols: ESP, yN: 76, aves: 0, sem: 7 });
  for (let k = 0; k < 70; k++) { const x = Math.floor(hh(k, 1, 90) * 320), y = Math.floor(hh(k, 2, 90) * 70); if ((x > 276 && y < 46) || (y < 16 && x > 18 && x < 172)) continue; if (Math.sin(t * 3 + k) > -0.5) R.pset(x, y, k % 5 ? hex('#c8d4f0') : C.blanco); }
  // un satélite que cruza
  { const sx = Math.round(((t - P3) * 34 + 20) % 340) - 10, sy = 52 + Math.round((sx - 160) * 0.06); if (sx < 270) { R.rect(sx - 4, sy, sx - 2, sy + 1, hex('#5a7ab0')); R.rect(sx + 2, sy, sx + 4, sy + 1, hex('#5a7ab0')); R.rect(sx - 1, sy - 1, sx + 1, sy + 2, hex('#d8d8e0')); if (Math.sin(t * 8) > 0) R.pset(sx, sy - 2, hex('#ff5050')); } }
  planeta();
  // el sol que asoma por el borde del planeta, a la izquierda
  { const fx = 14, fy = Math.round(limbo(14)) - 2; R.disco(fx, fy, 16, (x, y) => (bay(x, y) < 0.35 ? hex('#fff6d8') : R.pget(x, y))); R.disco(fx, fy, 9, (x, y) => (bay(x, y) < 0.75 ? hex('#fff6d8') : R.pget(x, y))); R.disco(fx, fy, 4, C.blanco);
    for (let i = 10; i < 70; i++) { if (bay(fx + i, fy) < 1 - i / 70) R.pset(fx + i, fy, hex('#fff6d8')); if (bay(fx + i, fy - Math.round(i * 0.5)) < 0.6 - i / 120) R.pset(fx + i, fy - Math.round(i * 0.5), hex('#fff6d8')); } }
  // las nubes que corren sobre el planeta
  for (let k = 0; k < 9; k++) { const x = Math.round(((hh(k, 3, 91) * 380 + t * (4 + k % 3 * 2)) % 380) - 30), y = Math.round(limbo(Math.max(0, Math.min(319, x))) + 8 + hh(k, 4, 91) * 40);
    for (let i = 0; i < 14; i++) for (let j = 0; j < 3; j++) if (bay(x + i, y + j) < 0.55 - Math.abs(i - 7) / 18) R.pset(x + i, y + j, mez(R.pget(x + i, y + j), C.blanco, 0.7)); }
  // las ciudades, con su monumento, sus casas y la torre de cristal (Nueva York, desde el principio; las copias brotan)
  const cimas = [];
  for (const [i, [x, mon, H, kb]] of CIUDADES.entries()) {
    const ang = Math.asin((x - PLA.cx) / PLA.r), y = limbo(x), t0 = i === 0 ? -9 : mitad + (i - 1) * 0.26, e = tramo(t, t0, t0 + 0.35);
    // las casitas
    rotado(x, y, ang, -14, 14, -4, 0, (u, v) => { const c = Math.floor((u + 14) / 4); if (v < -2 - (c % 3 === 0 ? 1 : 0)) return 0; return (u + 14) % 4 === 3 ? C.k : [hex('#e8d8c0'), hex('#c86a4a'), hex('#d8c8a8'), hex('#a8a090')][c % 4]; });
    if (mon !== 'ny') { const P = MON[mon], w = P[0].length, h = P.length, col = MONC[mon]; rotado(x, y, ang, -12, -12 + w + 1, -h - 1, 0, (u, v) => { const ii = u + 12, jj = v + h; if (ii < 0 || ii >= w || jj < 0 || jj >= h) return 0; const ch = P[jj][ii]; return ch === '.' ? 0 : col[ch]; }); }
    else { rotado(x, y, ang, -16, -9, -9, 0, (u, v) => (v < -8 ? C.k : (u + v) % 3 ? hex('#d8ccb0') : hex('#a89a80'))); }
    if (e > 0) { const top = torreCristal(x + (mon === 'ny' ? 0 : 4), ang, H, e, t, i, mon === 'ny'); if (top) { cimas.push([top, t0]); if (e >= 1 && mon !== 'ny') { R.linea(Math.round(top[0]), Math.round(top[1]), Math.round(top[0]), Math.round(top[1]) - 6, hex('#c8c0a8')); banderita(Math.round(top[0]), Math.round(top[1]) - 6, t, kb, 7, 4); }
      if (e > 0 && e < 1 && mon !== 'ny') for (let q = 0; q < 6; q++) { const a = q * 1.05 + t * 3, r = 4 + e * 8; R.pset(Math.round(top[0] + Math.cos(a) * r), Math.round(top[1] + Math.sin(a) * r * 0.6), hex('#fff6c0')); } } }
  }
  // el rastro de puntos desde la torre de Nueva York hasta cada copia, cuando brota
  const ny = cimas[0]; if (ny) for (const [[x1, y1], t0] of cimas.slice(1)) { const f = tramo(t, t0 - 0.25, t0 + 0.05), apaga = 1 - tramo(t, t0 + 0.6, t0 + 1.2); if (f <= 0 || apaga <= 0) continue;
    const [x0, y0] = ny[0], mx = (x0 + x1) / 2, my = Math.min(y0, y1) - 26 - Math.abs(x1 - x0) * 0.12;
    for (let s = 0; s <= f; s += 0.025) { const q = 1 - s, x = q * q * x0 + 2 * q * s * mx + s * s * x1, y = q * q * y0 + 2 * q * s * my + s * s * y1; if (Math.floor(s * 40 - t * 10) % 2 === 0 && bay(Math.round(x), Math.round(y)) < apaga + 0.1) R.pset(Math.round(x), Math.round(y), hex('#fff0a0')); } }
};

// ── 4 · la calle de las capas, hoy: los idiomas ──
const p4 = (t) => {
  const rs = t > edif ? Math.min(4, Math.floor((t - edif) / 0.16)) : undefined;
  T.hoy(R, t, { encuadre: 'capas', resalta: rs });
  // la pareja que charla delante de la casa federal (cada uno en su idioma)
  const hA = t > P4 + 0.3 && t < P4 + 1.4, hB = t > P4 + 1.2 && t < P4 + 2.4;
  R.actor(EL.neoyorquino, 48, 152, t, { dir: 1, habla: hA && Math.sin(t * 9) > 0, sonrisa: t > P4 + 2.4, dedo: t > P4 + 2.5 && t < P4 + 3.2 });
  R.actor(EL.neoyorquina, 70, 152, t, { dir: -1, habla: hB && Math.sin(t * 9) > 0, sonrisa: t > P4 + 1.2 });
  if (hA) bocadillo(40, 112, t, 0); if (hB) bocadillo(74, 110, t, 1, { dir: -1 });
  // el cliente del carrito: llega, pide en su idioma y se lleva el perrito caliente
  const c = tramo(t, P4 + 0.05, P4 + 1.2), cx = Math.round(lerp(330, 156, c)), tiene = t > calles - 0.4;
  const cl_ = R.actor(EL.neoyorquino2, cx, 152, t, { dir: -1, anda: c > 0 && c < 1, sostiene: tiene ? [cx - 3, 136] : undefined, sonrisa: tiene, habla: t > P4 + 1.3 && t < P4 + 2.2 && Math.sin(t * 9) > 0 });
  if (t > P4 + 1.3 && t < P4 + 2.3) bocadillo(cx + 6, 110, t, 2, { dir: -1 });
  if (tiene) { const [hx, hy] = cl_.mano, mord = t > calles + 0.2 ? 2 : 0; R.rect(hx - 5 + mord, hy - 2, hx + 2, hy + 1, C.k); R.rect(hx - 4 + mord, hy - 1, hx + 1, hy, hex('#e8b870')); R.rect(hx - 5 + mord, hy - 2, hx + 2, hy - 2, hex('#c84a2a')); R.pset(hx - 2, hy - 3, hex('#f0d030')); }
  // los turistas del plano, que preguntan, y la vecina que les señala el camino
  const p_ = t > idiomas - 0.2 && t < idiomas + 0.9;
  const tu = R.actor(EL.vecina, 214, 152, t, { dir: 1, sostiene: [232, 136], sorpresa: p_, sonrisa: t > calles });
  { const [mx, my] = tu.mano; R.rect(mx - 1, my - 7, mx + 10, my + 1, C.k); R.rect(mx, my - 6, mx + 9, my, hex('#efe6cc')); R.linea(mx + 1, my - 2, mx + 8, my - 5, hex('#c8303a')); R.rect(mx + 4, my - 6, mx + 4, my, hex('#c8bc9a')); R.pset(mx + 7, my - 4, hex('#2a5aa8')); }
  R.actor(EL.vecino, 196, 152, t, { dir: 1, habla: p_ && Math.sin(t * 8) > 0, sonrisa: t > calles });
  if (p_) bocadillo(190, 110, t, 0, { icono: '?' });
  const lv = tramo(t, P4 + 0.4, idiomas + 0.1), lx = Math.round(lerp(330, 252, lv)), senala = t > idiomas + 0.5 && t < edif;
  R.actor(EL.oficinista2, lx, 152, t, { dir: -1, anda: lv > 0 && lv < 1, dedo: senala, habla: senala && Math.sin(t * 9) > 0, sonrisa: true });
  if (t > idiomas + 0.4 && t < idiomas + 1.5) bocadillo(lx + 2, 110, t, 4, { dir: -1 });
};

// ── 5 · los anillos del tocón de Central Park ──
const ERA = [hex('#e8783a'), hex('#c84a3a'), hex('#8a5a3a'), hex('#e8c860'), hex('#6ac0e0')];
const ERAP = [
  ['...a...', '..aaa..', '.aaaaa.', '.awawa.', 'aaaaaaa', 'awawawa', 'aaaaaaa', 'aaadaaa', 'aaadaaa'],
  ['...b...', '.bbbbb.', 'bbbbbbb', 'acacaca', 'acacaca', 'acacaca', 'acacaca', 'aaaaaaa', 'aaadaaa'],
  ['aaaaaaa', 'awawawa', 'aaaaaaa', 'awawawa', 'aaaaaaa', 'awadawa', '..ada..', '.sssss.', 'sssssss'],
  ['...a...', '...a...', '..aaa..', '..awa..', '.aaaaa.', '.awawa.', '.aaaaa.', 'aaaaaaa', 'awawawa', 'aaaaaaa', 'awawawa', 'aaadaaa'],
  ['.aaaa..', '.alaa..', 'aaaaaa.', 'alaala.', 'aaaaaa.', 'alaala.', 'aaaaaa.', 'alaala.', 'aaaaaa.', 'alaala.', 'aaaaaa.', 'aadaaa.'],
];
const ERAC = [
  { a: hex('#e8783a'), w: hex('#f8e8c0'), d: hex('#5a3a24') }, { a: hex('#c84a3a'), b: hex('#f0ece0'), c: hex('#f0ece0'), w: hex('#f8e8c0'), d: hex('#3a2418') },
  { a: hex('#8a5a3a'), w: hex('#f8e0a0'), d: hex('#3a2418'), s: hex('#b08060') }, { a: hex('#d8d8e0'), w: hex('#e8c860'), d: hex('#5a4a2a') },
  { a: hex('#6ac0e0'), l: hex('#c8f0f8'), d: hex('#2a4a6a') },
];
const TC = [166, 122], TRX = 62, TRY = 20;
const fondoParque = () => capa('parque', () => {
  const { rect, pset } = R;
  // los edificios de Central Park South en la bruma, por encima de los árboles
  for (let k = 0; k < 16; k++) { const x0 = k * 21 - 6 + Math.floor(hh(k, 1, 70) * 6), w = 14 + Math.floor(hh(k, 2, 70) * 10), top = (x0 > 262 ? 50 : 26) + Math.floor(hh(k, 3, 70) * 22), c = X.lejos[k % 4];
    for (let y = top; y < 92; y++) for (let x = Math.max(0, x0); x < Math.min(320, x0 + w); x++) pset(x, y, x === x0 ? mez(c, C.blanco, 0.3) : ((x - x0) % 3 === 1 && (y - top) % 4 === 2) ? mez(c, C.blanco, 0.35) : c);
    if (k % 4 === 1) { rect(x0 + 3, top - 5, x0 + 8, top - 1, mez(c, C.k, 0.15)); rect(x0 + 5, top - 9, x0 + 6, top - 5, mez(c, C.k, 0.15)); } }
  // la arboleda en tres tonos
  for (let k = 0; k < 46; k++) { const x = Math.floor(hh(k, 1, 71) * 340) - 10, y = 66 + Math.floor(hh(k, 2, 71) * 22), r = 9 + Math.floor(hh(k, 3, 71) * 7);
    R.disco(x, y + 2, r, hex('#2a5030')); R.disco(x, y, r, hex('#3a6a3a')); R.disco(x - 2, y - 3, Math.round(r * 0.6), hex('#5a8a4a')); R.disco(x - 3, y - 5, Math.round(r * 0.3), hex('#7ab05a')); }
  for (let x = 0; x < 320; x++) for (let y = 86; y < 100; y++) if (hh(x, y, 72) < 0.5 - (y - 86) / 30) pset(x, y, hex('#2a5030'));
  for (const tx of [22, 58, 214, 252, 300]) { rect(tx, 88, tx + 3, 102, C.k); rect(tx + 1, 88, tx + 2, 102, hex('#5a3a24')); }
  // el césped con sus franjas de siega, el tréboles y el camino de grava
  for (let y = 98; y < 180; y++) for (let x = 0; x < 320; x++) { const fr = Math.floor((x + y * 1.6) / 22) % 2, q = hh(x, y, 73); pset(x, y, q < 0.06 ? X.hierbaL : q > 0.94 ? X.hierbaS : fr ? X.hierba : mez(X.hierba, X.hierbaL, 0.3)); }
  for (let y = 98; y < 180; y++) { const xc = 250 - (y - 98) * 0.9 + Math.sin(y * 0.08) * 6, w = 6 + (y - 98) * 0.18; for (let x = Math.round(xc - w); x <= Math.round(xc + w); x++) pset(x, y, Math.abs(x - xc) > w - 1 ? X.gravaS : hh(x, y, 74) < 0.12 ? X.gravaL : X.grava); }
  for (let k = 0; k < 40; k++) { const x = Math.floor(hh(k, 1, 75) * 320), y = 104 + Math.floor(hh(k, 2, 75) * 74); pset(x, y, [C.blanco, hex('#f0e060'), hex('#e8a0c0')][k % 3]); pset(x, y + 1, X.hierbaS); }
  // la roca de esquisto con sus capas, a la izquierda
  for (let k = 0; k < 9; k++) { const x = 4 + k * 7 + Math.floor(hh(k, 1, 78) * 4), y = 124 + Math.floor(hh(k, 2, 78) * 6), r = 6 + Math.floor(hh(k, 3, 78) * 4);
    R.disco(x, y + 2, r, hex('#2a5030')); R.disco(x, y, r, hex('#3e7a3a')); R.disco(x - 2, y - 2, Math.round(r * 0.55), hex('#6aa04a')); if (k % 3 === 0) { pset(x + 1, y - 3, hex('#f0e060')); pset(x - 3, y + 1, hex('#f0a0c0')); } }
  for (let x = 0; x < 72; x++) for (let y = 134; y < 141; y++) { const fila = Math.floor((y - 134) / 3.5), jx = (x + fila * 5) % 10 === 0; pset(x, y, y === 134 ? hex('#c8c0b0') : y === 140 ? C.k : jx || (y - 134) % 4 === 3 ? hex('#6a6460') : hh(x, y, 79) < 0.2 ? hex('#a8a098') : hex('#8a847c')); }
  // el banco y la farola junto al camino
  rect(262, 112, 290, 114, C.k); rect(263, 112, 289, 113, hex('#6a8a5a')); rect(262, 106, 290, 107, hex('#4a6a3a')); rect(264, 114, 265, 119, C.k); rect(287, 114, 288, 119, C.k);
  rect(232, 76, 233, 116, C.k); rect(229, 72, 236, 76, C.k); rect(230, 73, 235, 75, hex('#f0e0a0'));
  // el tocón: la sombra, la corteza y las raíces
  for (let y = 120; y < 160; y++) for (let x = 90; x < 250; x++) if (((x - TC[0] - 10) / 78) ** 2 + ((y - 150) / 10) ** 2 < 1) pset(x, y, mez(R.pget(x, y), C.k, 0.3));
  for (let x = TC[0] - TRX; x <= TC[0] + TRX; x++) { const dx = (x - TC[0]) / TRX, top = TC[1] + Math.round(TRY * Math.sqrt(Math.max(0, 1 - dx * dx))), bot = top + 20 + Math.round(Math.abs(Math.sin(x * 0.4)) * 3);
    for (let y = top; y <= bot; y++) { const g = (x * 3 + Math.floor(y / 5)) % 7; pset(x, y, x === TC[0] - TRX || x === TC[0] + TRX || y === bot ? C.k : g < 2 ? hex('#3a2418') : dx < -0.5 ? hex('#7a5434') : dx > 0.5 ? hex('#4a3020') : hex('#5e3e26')); } }
  for (const [rx, d] of [[TC[0] - 56, -1], [TC[0] + 52, 1], [TC[0] - 20, -1], [TC[0] + 22, 1]]) R.poligono([[rx, 140], [rx + d * 16, 152], [rx + d * 3, 150], [rx - d * 4, 144]], hex('#4a3020'));
});
const tocon = (t) => {
  const { pset } = R, onda = (t - anillos) * 7;
  for (let y = TC[1] - TRY; y <= TC[1] + TRY; y++) for (let x = TC[0] - TRX; x <= TC[0] + TRX; x++) {
    const dx = (x - TC[0]) / TRX, dy = (y - TC[1]) / TRY, r = Math.hypot(dx, dy); if (r > 1) continue;
    if (r > 0.93) { pset(x, y, r > 0.97 ? C.k : hex('#4a3020')); continue; }
    const rr = r / 0.93 * 10 + Math.sin(Math.atan2(dy, dx) * 3 + r * 4) * 0.12, k = Math.min(9, Math.floor(rr)), fr = rr - k;
    let c = fr > 0.82 ? hex('#9a6a3a') : (k % 2 ? hex('#d8b07a') : hex('#c89c64'));
    if (hh(x, y, 76) < 0.05) c = mez(c, C.k, 0.15);
    if (Math.abs(Math.atan2(dy, dx) - 0.5) < 0.03 && r > 0.3) c = hex('#6a4424');
    const e = Math.floor(k / 2), te = era + e * 0.22, ten = tramo(t, te, te + 0.25);
    if (ten > 0) c = mez(c, ERA[e], 0.55 * ten);
    if (t > anillos && onda > k && onda < k + 2.2 && fr > 0.7) c = hex('#fff2c0');
    if (k === 0 && rr < 0.4) c = hex('#6a4424');
    pset(x, y, c); }
};
const ardilla = (x, y, t, dir, salto) => {
  const X0 = (i) => Math.round(x + i * dir), yy = Math.round(y - salto), cola = hex('#a86a3a'), c = hex('#8a5a32');
  for (let j = 0; j < 7; j++) for (let i = -1; i <= 2; i++) if (Math.hypot(i - 0.5, j - 3) < 3.2) R.pset(X0(-4 + i), yy - 4 - j + 3, j < 2 ? hex('#c88a4a') : cola);
  R.rect(Math.min(X0(-1), X0(4)), yy - 5, Math.max(X0(-1), X0(4)), yy - 1, C.k); R.rect(Math.min(X0(0), X0(3)), yy - 4, Math.max(X0(0), X0(3)), yy - 2, c);
  R.rect(Math.min(X0(3), X0(6)), yy - 7, Math.max(X0(3), X0(6)), yy - 4, C.k); R.rect(Math.min(X0(4), X0(5)), yy - 6, Math.max(X0(4), X0(5)), yy - 5, c); R.pset(X0(5), yy - 6, C.k); R.pset(X0(4), yy - 8, C.k);
  R.pset(X0(1), yy, C.k); R.pset(X0(3), yy, C.k);
};
const p5 = (t) => {
  cielo(t, { hor: 64, cols: X.dia, sol: [214, 22, 6], yN: 10, aves: 3, yAves: 22, sem: 4 });
  fondoParque(); tocon(t);
  // las casitas de cada época, que brotan sobre su anillo
  for (let e = 0; e < 5; e++) { const te = era + e * 0.22, f = tramo(t, te, te + 0.2); if (f <= 0) continue; const P = ERAP[e].flatMap((r) => [r, r]).map((r) => r.split('').map((ch) => ch + ch).join('')), x = Math.round(TC[0] - 20 + e * 15), y = TC[1] + 4 - P.length;
    picto(P, x, y, ERAC[e], { filas: Math.max(1, Math.round(P.length * f)) }); if (f < 1) for (let q = 0; q < 4; q++) R.pset(x + 3 + Math.round(Math.cos(q * 1.6 + t * 9) * 6), y + 4 + Math.round(Math.sin(q * 1.6 + t * 9) * 4), hex('#fff6c0')); }
  // las hojas que caen y el corredor del camino
  for (let k = 0; k < 8; k++) { const x = Math.round(((hh(k, 1, 77) * 320 + t * 6) % 320)), y = Math.round(80 + ((hh(k, 2, 77) * 90 + t * 9) % 90)); R.pset(x + Math.round(Math.sin(t * 3 + k) * 2), y, k % 2 ? hex('#e8a040') : hex('#7ab05a')); }
  { const u = ((t - P5) * 0.12 + 0.2) % 1, gx = Math.round(lerp(300, 214, u)), gy = Math.round(98 + u * 14); gente(gx, gy, t, 5, { anda: true }); }
  // la ardilla: sube al tocón con su bellota, la mordisquea y sale de un salto cuando se encienden las épocas
  const a1 = tramo(t, P5 + 0.05, P5 + 0.8), a2 = tramo(t, era + 0.15, era + 0.8);
  let ax, ay, sal = 0, ad = -1;
  if (a2 > 0) { ax = lerp(150, 330, a2); ay = lerp(118, 150, a2); sal = Math.abs(Math.sin(a2 * Math.PI * 4)) * 5 + (a2 < 0.15 ? 6 : 0); ad = 1; }
  else { ax = lerp(326, 150, a1); ay = a1 < 0.6 ? lerp(160, 140, a1 / 0.6) : lerp(140, 118, (a1 - 0.6) / 0.4); sal = a1 < 1 ? Math.abs(Math.sin(a1 * Math.PI * 5)) * 5 : 0; }
  ardilla(ax, ay, t, ad, sal);
  if (a1 >= 1 && a2 <= 0) { const m = Math.sin(t * 12) > 0 ? 1 : 0; R.rect(Math.round(ax) - 4, Math.round(ay) - 4 - m, Math.round(ax) - 2, Math.round(ay) - 2 - m, hex('#8a5a2a')); R.pset(Math.round(ax) - 3, Math.round(ay) - 5 - m, hex('#5a3a1a')); }
  if (a2 > 0 && a2 < 0.3) R.icono('!', Math.round(ax) - 2, Math.round(ay) - 18, hex('#fff0a0'));
  // el chico que cuenta los anillos y la abuela que lo explica
  R.actor(EL.neoyorquino2, 76, 150, t, { dir: 1, dedo: t > anillos - 0.2 && t < era, sorpresa: t > era - 0.05 && t < era + 0.7, sonrisa: t > era + 0.7, salto: t > era && t < era + 0.25 ? 2 : 0 });
  R.actor(EL.vecina, 246, 150, t, { dir: -1, habla: t > era - 0.1 && t < era + 1.2 && Math.sin(t * 9) > 0, dedo: t > era + 0.1 && t < era + 1.4, sonrisa: true });
};

const efectos = [[1.5, 'publico'], [2.8, 'claxon'], [mayor, 'papel'], [mayor + 0.25, 'whoosh'], [cuartel, 'flash'], [vidrio + 0.05, 'brillo'], [mitad + 0.05, 'pop'], [mitad + 0.6, 'pop'], [mitad + 1.15, 'pop'],
  [P4 + 0.4, 'claxon'], [calles + 0.25, 'masca'], [edif, 'brillo'], [anillos, 'brillo'], [era + 0.18, 'boing'], [era + 0.9, 'pop']];
const año = (t) => (t < P2 ? 1950 : t < P3 ? 1952 : t < P4 ? Math.round(lerp(1952, 2010, tramo(t, mitad - 0.1, mitad + 1.6))) : 2026);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '1950', efectos, año });
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['ny-verrazzano'] = ('El puente Verrazzano', '''// NY-VERRAZZANO (frases 52–53), 1964 → 2018, cartela «1964». Cuatro planos:
// 1. (hasta «straight») la inauguración en el tablero del puente, mirando hacia la torre: los coches de 1964 esperan tras
//    la cinta; el concejal corta la cinta en «opened», la gente aplaude, sale el confeti y los coches arrancan hacia la torre;
// 2. (hasta el silencio antes de «For») el puente desde el paseo: la bahía de 1524 aparece encima como un recuerdo verde y
//    el bote fantasma de Verrazzano sale de debajo del puente remando hacia nosotros; el chico lo señala en «boat» y en
//    «named after him» Verrazzano se quita la boina y el chico le devuelve el saludo; el pescador y una corredora;
// 3. (hasta «a Z») el letrero del puente de cerca, en cámara rápida (días y noches, de 1964 a 2018): barras y huecos sin
//    letras; «50+» en «fifty»; una gaviota se posa justo en el hueco como si fuera la letra; en «Missing a Z» se va y
//    parpadea en rojo la «z» que falta;
// 4. 2018: la grúa de cesta sube al operario con la pieza de la «z»; el compañero de abajo le guía; en «fixed» la encaja,
//    en «2018» el letrero brilla entero y abajo lo celebran.''', PRE + PRE2 + r'''
const P2 = @(5.65), P3 = @(9.6), P4 = @(14.0);
const abre = @(4.31), bote = @(7.01), nombre = @(8.62), cincuenta = @(10.87), mal = @(12.67), falta = @(13.75), arregla = @(15.79), d2018 = @(16.43);

// ── 1 · la inauguración, en el tablero ──
const VP = [160, 96];
const bordeY = (x) => 96 + Math.abs(x - 160) * 0.42;          // el canto de la calzada (de la punta de fuga a la esquina de abajo)
const muroY = (x) => 96 + (bordeY(x) - 96) * 0.64;            // lo alto del pretil
const fondoTablero = () => capa('tablero', () => {
  const { rect, pset } = R;
  // el mar abajo y las dos orillas lejanas
  for (let y = 96; y < 180; y++) for (let x = 0; x < 320; x++) { const q = hh(x >> 1, y, 30); pset(x, y, (y + Math.floor(x / 9)) % 5 === 0 && q < 0.5 ? hex('#7ab0d0') : y < 101 ? hex('#5a90b8') : q < 0.08 ? hex('#8ac0e0') : hex('#3a7aa8')); }
  for (let x = 0; x < 112; x++) { const top = 88 + Math.round(Math.sin(x * 0.05) * 2 + x * 0.04); for (let y = top; y < 97; y++) pset(x, y, y === top ? hex('#8aa890') : (x * 3 + y) % 11 === 0 ? hex('#e8e0d0') : hex('#6a8a74')); }
  for (let x = 210; x < 320; x++) { const top = 90 - Math.round((x - 210) * 0.03); for (let y = top; y < 97; y++) pset(x, y, y === top ? hex('#8a9aa0') : (x * 5 + y) % 9 === 0 ? hex('#e8e0d0') : hex('#6a7a84')); }
  // la calzada, con el asfalto nuevo, las rayas y las juntas
  for (let y = 97; y < 180; y++) { const hw = (y - 96) / 0.42; for (let x = Math.max(0, Math.ceil(160 - hw)); x <= Math.min(319, Math.floor(160 + hw)); x++) {
    const rel = (x - 160) / hw, z = 1 / (y - 95), q = hh(x >> 1, y, 31);
    let c = q < 0.07 ? hex('#6a6a72') : q > 0.95 ? hex('#3a3a42') : hex('#4e4e58');
    if (Math.abs(Math.abs(rel) - 0.33) < 0.012 + 1 / hw && Math.floor(z * 160) % 2 === 0) c = hex('#e8e4d8');
    if (Math.abs(rel) < 0.012 + 0.6 / hw) c = hex('#e8c030');
    if (Math.floor(z * 60) !== Math.floor((1 / (y - 94)) * 60)) c = mez(c, C.k, 0.3);
    pset(x, y, c); } }
  // los pretiles con su barandilla
  for (let x = 0; x < 320; x++) { if (Math.abs(x - 160) < 2) continue; const yb = Math.round(bordeY(x)), yt = Math.round(muroY(x)); if (yb > 180 && yt > 180) continue;
    for (let y = yt; y <= Math.min(179, yb); y++) pset(x, y, y === yt ? hex('#e8e4dc') : y === yt + 1 ? hex('#a8a49c') : y > yb - 2 ? hex('#5a5a60') : (y - yt) % 4 === 0 ? hex('#9a968e') : hex('#bab6ae')); }
});
const torrePortal = () => {
  const { rect, pset } = R, ac = hex('#7c8a9a'), acS = hex('#56626e'), acL = hex('#aab6c2');
  for (const [x0, x1] of [[142, 147], [173, 178]]) { rect(x0 - 1, 29, x1 + 1, 102, C.k); rect(x0, 30, x1, 102, ac); rect(x0, 30, x0, 102, acL); rect(x1, 30, x1, 102, acS); for (let y = 34; y < 100; y += 6) rect(x0, y, x1, y, acS); }
  for (const [y0, h] of [[30, 4], [50, 3], [72, 3], [92, 2]]) { rect(147, y0, 173, y0 + h, C.k); rect(148, y0 + 1, 172, y0 + h - 1, ac); rect(148, y0 + 1, 172, y0 + 1, acL); }
  rect(140, 26, 180, 30, C.k); rect(141, 27, 179, 29, acS); pset(144, 25, hex('#e83a3a')); pset(176, 25, hex('#e83a3a'));
};
const cables = (t) => {
  const { pset } = R, cab = hex('#5a6470'), pen = hex('#8a949e');
  for (const [x0, xc, x1, yc, y1] of [[145, 96, -30, 104, 120], [175, 224, 350, 104, 120]]) {
    let prev = null;
    for (let s = 0; s <= 1; s += 0.004) { const q = 1 - s, x = q * q * x0 + 2 * q * s * xc + s * s * x1, y = q * q * 28 + 2 * q * s * yc + s * s * y1; const px = Math.round(x), py = Math.round(y);
      pset(px, py, cab); pset(px, py + 1, C.k); if (s > 0.25) pset(px, py - 1, hex('#8a949e'));
      const xi = Math.round(x); if (prev !== null && Math.floor(s * 26 * s) !== Math.floor(prev * 26 * prev)) { const yt = Math.round(muroY(xi)); for (let yy = py + 2; yy < yt; yy++) pset(xi, yy, pen); } prev = s; } }
  // las farolas con banderitas del día de la inauguración
  for (const z of [0.18, 0.3, 0.5, 0.8]) for (const d of [-1, 1]) { const x = Math.round(160 + d * 200 * z * 0.95), yt = Math.round(muroY(x)), h = Math.round(40 * z);
    R.linea(x, yt, x, yt - h, hex('#4a5460')); R.linea(x, yt - h, x - d * Math.round(6 * z), yt - h, hex('#4a5460')); R.pset(x - d * Math.round(6 * z), yt - h + 1, hex('#f8f0c0'));
    const w = Math.max(2, Math.round(9 * z)); for (let i = 0; i < w; i++) for (let j = 0; j < Math.max(2, Math.round(5 * z)); j++) R.pset(x + d * (1 + i), yt - h + 2 + j + Math.round(Math.sin(t * 6 - i + x) * i / w), [hex('#c8303a'), C.blanco, hex('#2a3a7a')][Math.floor(j * 3 / Math.max(2, Math.round(5 * z)))]); }
};
const COCHES64 = [[150, 107, 0.55, hex('#e8e0c8')], [171, 107, 0.55, hex('#c83a3a')], [136, 117, 0.95, hex('#5ab0b0')], [186, 117, 0.95, hex('#e8c860')], [118, 138, 1.7, hex('#c86a8a')], [204, 138, 1.7, hex('#4a6aa8')]];
const p1 = (t) => {
  cielo(t, { hor: 98, cols: X.dia, sol: [228, 34, 6], yN: 14, aves: 3, yAves: 30, sem: 2 });
  fondoTablero();
  for (let k = 0; k < 2; k++) { const bx = Math.round(40 + ((t * 3 + k * 140) % 260)); R.rect(bx, 99 + k, bx + 6, 100 + k, C.blanco); R.pset(bx + 3, 98 + k, hex('#c8c8d0')); }
  torrePortal();
  const va = Math.max(0, t - abre - 0.35);
  for (const [xc, yb, s, col] of COCHES64.map((c, i) => [c[0], c[1], c[2], c[3], i]).map(([xc, yb, s, col]) => { const k = 1 / (1 + va * (0.6 + s * 0.25)); return [160 + (xc - 160) * k, 96 + (yb - 96) * k, s * k, col]; }).sort((a, b) => a[1] - b[1])) cocheDetras(Math.round(xc), Math.round(yb), s, col);
  cables(t);
  // los postes y la cinta (cortada en «opened»)
  for (const px of [26, 294]) { R.rect(px - 2, 142, px + 2, 166, C.k); R.rect(px - 1, 143, px + 1, 166, hex('#d8d4c8')); R.disco(px, 141, 3, C.k); R.disco(px, 141, 2, X.oro); }
  const cor = t > abre, ca = tramo(t, abre, abre + 0.5);
  if (!cor) { for (let x = 28; x < 293; x++) { const y = Math.round(146 + Math.sin((x - 28) / 265 * Math.PI) * 4); R.pset(x, y, hex('#c8303a')); R.pset(x, y + 1, hex('#8a1a2a')); }
    R.disco(160, 150, 4, C.k); R.disco(156, 149, 3, hex('#c8303a')); R.disco(164, 149, 3, hex('#c8303a')); R.disco(160, 150, 2, hex('#e84a4a')); }
  else for (const d of [-1, 1]) { const x0 = d < 0 ? 28 : 292, ex = 160 + d * Math.round(4 + ca * 30), ey = Math.round(150 + ca * 18);
    for (let s = 0; s <= 1; s += 0.01) { const x = Math.round(lerp(x0, ex, s)), y = Math.round(lerp(146, ey, s) + Math.sin(s * Math.PI) * (3 + ca * 4)); R.pset(x, y, hex('#c8303a')); R.pset(x, y + 1, hex('#8a1a2a')); } }
  // el fotógrafo, el concejal de las tijeras, la madrina de la cinta y el policía
  const fo = R.actor(EL.vecino, 62, 168, t, { dir: 1, sostiene: [80, 150], sonrisa: cor });
  { const [cx, cy] = fo.mano; R.rect(cx - 2, cy - 3, cx + 4, cy + 2, C.k); R.rect(cx - 1, cy - 2, cx + 3, cy + 1, hex('#3a3a46')); R.disco(cx + 2, cy - 5, 2, C.k); R.disco(cx + 2, cy - 5, 1, hex('#e8e8f0'));
    if (t > abre && t < abre + 0.16) { R.disco(cx + 2, cy - 5, 9, (x, y) => (bay(x, y) < 0.5 ? C.blanco : R.pget(x, y))); R.disco(cx + 2, cy - 5, 3, C.blanco); } }
  const corta = tramo(t, abre - 1.2, abre - 0.4);
  const co = R.actor(EL.oficinista, 132, 168, t, { dir: 1, sostiene: cor ? undefined : [Math.round(lerp(146, 154, corta)), Math.round(lerp(152, 149, corta))], brazos: cor, sonrisa: cor, habla: t > 1.6 && t < abre - 1.4 && Math.sin(t * 9) > 0 });
  if (!cor) { const [hx, hy] = co.mano, ab = t > abre - 0.25 ? 0 : 1 + Math.round(Math.abs(Math.sin(t * 5))); R.linea(hx, hy, hx + 9, hy - 1 - ab, hex('#c8ccd4')); R.linea(hx, hy, hx + 9, hy + 1 + ab, hex('#a8acb4')); R.disco(hx - 1, hy - 2, 2, C.k); R.disco(hx - 1, hy + 2, 2, C.k); R.pset(hx - 1, hy - 2, X.oro); R.pset(hx - 1, hy + 2, X.oro); }
  R.actor(EL.oficinista2, 176, 168, t, { dir: -1, sonrisa: true, brazos: cor && t < abre + 1.0, dedo: !cor && t > 2.4 });
  R.actor(EL.funcionario, 254, 168, t, { dir: -1, habla: t > abre + 0.4 && Math.sin(t * 10) > 0, dedo: t > abre + 0.5, quieto: false });
  // el confeti al cortar la cinta
  if (cor) for (let k = 0; k < 60; k++) { const s = t - abre, a = hh(k, 1, 33) * Math.PI - Math.PI, v = 30 + hh(k, 2, 33) * 50, x = Math.round(160 + Math.cos(a) * v * s), y = Math.round(150 + Math.sin(a) * v * s + 40 * s * s); if (y < 179 && y > 16) R.pset(x, y, CONF6[k % 6]); }
  // el público de las esquinas, con banderitas
  const tipos = ['rizos', 'calvo', 'mujer', 'rizos'], ropa = ['#2a3a6a', '#7a5a3a', '#5a7a4a', '#8a2a2a', '#c8a060', '#5a3a6a'];
  for (let k = 0; k < 18; k++) { const x = k < 9 ? -3 + k * 10 : 236 + (k - 9) * 10, fila = k % 2, y = 160 + fila * 9 - (cor && Math.sin(t * 8 + k) > 0.4 ? 1 : 0); if (x > 86 && x < 232) continue; const cr = hex(ropa[k % 6]);
    R.busto(tipos[k % 4], { C: cr, c: mez(cr, C.k, 0.3), H: hex('#5a3418'), h: hex('#8a5428'), V: hex('#e8dcc0') }, x, y, t + k, { rie: cor, saluda: cor && k % 3 === 0 });
    if (k % 3 === 1) { const f = Math.sin(t * 7 + k) > 0 ? 1 : 0; R.linea(x + 8, y + 2, x + 8, y - 6, hex('#8a6a40')); R.rect(x + 9, y - 6 + f, x + 14, y - 3 + f, hex('#c8303a')); R.rect(x + 9, y - 6 + f, x + 11, y - 5 + f, hex('#2a3a7a')); } }
};
const CONF6 = [C.blanco, hex('#f2e8a0'), hex('#f0b8c8'), hex('#a8d0f0'), hex('#b8e8a8'), hex('#e8c030')];

// ── 2 · el bote fantasma bajo el puente ──
const boteFantasma = (x, y, s, t, quita) => {
  const L = Math.round(16 * s), H = Math.max(2, Math.round(4 * s));
  for (let j = 0; j <= H; j++) { const l = L - Math.round((j / H) ** 2 * 4 * s); R.rect(x - l, y - H + j, x + l + (j === 0 ? Math.round(2 * s) : 0), y - H + j, j === 0 ? hex('#a8804c') : j % 2 ? hex('#6a4a2a') : hex('#8a6438')); }
  R.rect(x - L - 1, y - H, x - L - 1, y - H + 1, C.k); R.rect(x + L + Math.round(2 * s), y - H - 1, x + L + Math.round(2 * s), y - H, C.k);
  for (let k = 0; k < 3; k++) { const px = Math.round(x - 6 * s + k * 6 * s), ph = t * 3.2 + k * 0.3, b = Math.round(Math.sin(ph) * 1.5 * s);
    R.rect(px - Math.round(s), y - H - Math.round(4 * s) + b, px + Math.round(s), y - H, hex('#8a3a2a')); R.disco(px, y - H - Math.round(5 * s) + b, Math.max(1, Math.round(1.4 * s)), hex('#f0c8a0'));
    R.linea(px, y - H, Math.round(px + Math.cos(ph) * 7 * s), Math.round(y + 1 + Math.sin(ph) * s), hex('#c8a060')); }
  // Verrazzano de pie a popa, que se quita la boina
  const vx = Math.round(x - 13 * s), top = y - H - Math.round(11 * s);
  R.rect(vx - Math.round(1.5 * s), top + Math.round(3 * s), vx + Math.round(1.5 * s), y - H, hex('#2a2430')); R.disco(vx, top + Math.round(1.5 * s), Math.max(1, Math.round(1.6 * s)), hex('#f0c8a0'));
  const by = top - Math.round(quita * 5 * s); R.rect(vx - Math.round(2 * s), by - Math.round(s), vx + Math.round(2 * s), by, hex('#1c1424'));
  if (quita > 0) R.linea(vx + Math.round(1.5 * s), top + Math.round(4 * s), vx + Math.round(2 * s), by + 1, hex('#2a2430'));
  for (let i = 0; i < 6; i++) R.pset(Math.round(x + L + 2 * s + i * 2), y + 1 + (i % 2), hex('#e8f0f0'));
};
const p2 = (t) => {
  const f = tramo(t, P2 + 0.1, bote - 0.4) * 0.6;
  T.hoy(R, t, { encuadre: 'puente', fantasma: f, barco: 0 });
  const u = tramo(t, P2 + 0.3, nombre - 0.1), bx = Math.round(lerp(166, 200, u)), by = Math.round(lerp(104, 134, u)), s = lerp(0.5, 1.9, u), quita = tramo(t, nombre, nombre + 0.35) * (1 - tramo(t, nombre + 1.1, nombre + 1.4));
  fantasmal(bx - 50, by - 50, bx + 70, by + 8, 0.95, () => boteFantasma(bx, by, s, t, quita));
  for (let q = 0; q < 6; q++) { const a = q * 1.1 + t * 1.7, r = 14 + 8 * s + Math.sin(t * 3 + q) * 3, x = Math.round(bx + Math.cos(a) * r * 1.4), y = Math.round(by - 8 * s + Math.sin(a) * r * 0.6); if (Math.sin(t * 6 + q * 2) > 0) { R.pset(x, y, GH); R.pset(x + 1, y, GHS); R.pset(x, y - 1, GHS); } }
  // el pescador con su caña, que mira atrás cuando pasa el bote
  const pe = R.actor(EL.vecino, 228, 172, t, { dir: t > bote + 0.6 ? -1 : 1, sostiene: [246, 150], sorpresa: t > bote + 0.6 && t < bote + 1.2 });
  R.linea(pe.mano[0], pe.mano[1], 262, 126, hex('#5a3a1a')); R.linea(262, 126, 268, 138 + Math.round(Math.sin(t * 2) * 1), hex('#d8dce4'));
  // el chico y su madre que llegan por el paseo: él ve el bote y lo señala; luego saluda a Verrazzano
  const a = tramo(t, P2, P2 + 1.1), xc = Math.round(lerp(-20, 112, a)), xm = Math.round(lerp(-44, 88, a));
  R.actor(EL.neoyorquina, xm, 172, t, { dir: 1, anda: a > 0 && a < 1, sorpresa: t > bote + 0.4 && t < bote + 1.0, sonrisa: t > bote + 1.0 });
  R.actor(EL.neoyorquino2, xc, 172, t, { dir: 1, anda: a > 0 && a < 1, dedo: t > bote - 0.1 && t < nombre, sorpresa: t > bote - 0.1 && t < bote + 0.6, brazos: t > nombre + 0.15, sonrisa: t > bote + 0.6, salto: t > nombre + 0.15 && t < nombre + 0.45 ? 2 : 0 });
  // la corredora que pasa por delante
  const c = tramo(t, P2 + 0.6, P3 - 0.2); R.actor(EL.oficinista2, Math.round(lerp(330, -24, c)), 179, t, { dir: -1, anda: c > 0 && c < 1 });
};

// ── 3 y 4 · el letrero del puente (barras y huecos; sin letras) ──
// cada letra es un bloque de barras distinto (no una letra de verdad); la sexta casilla de la primera fila es el hueco
const CEL = [0, 1, 2, 2, 3, 4, 9, 3, 5, 6], CEL2 = [5, 3, 2, 2, 6, 7, 0, 8, 1, 2, 1, 7, 7];
const celda = (x, y, s, k, w = 6, h = 10, c = C.blanco) => {
  // una «letra» es solo un bloque blanco con las esquinas romas (barras y huecos: nada que se lea como letra)
  const x1 = x + w * s - 1, y1 = y + h * s - 1, r = Math.max(1, Math.round(s * 0.6));
  R.rect(x, y + r, x1, y1 - r, c); R.rect(x + r, y, x1 - r, y1, c); if (s >= 2) R.rect(x + r, y1 - r + 1, x1 - r, y1, mez(c, VERDE, 0.25));
};
const ZETA = ['######', '######', '....##', '...##.', '..##..', '.##...', '##....', '##....', '######', '######'];
const zeta = (x, y, s, c, a = 1) => { for (let j = 0; j < 10; j++) for (let i = 0; i < 6; i++) if (ZETA[j][i] === '#' && (a >= 1 || bay(x + i * s, y + j * s) < a)) R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); };
const VERDE = hex('#1e6a42'), VERDES = hex('#14502e'), VERDEL = hex('#2e8a58');
// el letrero entero: (x0, y0) esquina, s escala de la primera fila; devuelve la caja del hueco
const letrero = (x0, y0, s, o = {}) => {
  const paso = 9 * s, w = paso * 10 + 6 * s, h = 32 * s;
  R.rect(x0 - 1, y0 - 1, x0 + w + 1, y0 + h + 1, C.k); R.rect(x0, y0, x0 + w, y0 + h, VERDE);
  for (let y = y0; y <= y0 + h; y++) for (let x = x0; x <= x0 + w; x++) if (hh(x >> 1, y >> 1, 40) < 0.08) R.pset(x, y, VERDEL); else if (hh(x, y, 41) < 0.04) R.pset(x, y, VERDES);
  const b = Math.max(1, Math.round(s * 0.7)); R.rect(x0 + 2 * b, y0 + 2 * b, x0 + w - 2 * b, y0 + 2 * b + b - 1, C.blanco); R.rect(x0 + 2 * b, y0 + h - 3 * b + 1, x0 + w - 2 * b, y0 + h - 2 * b, C.blanco);
  R.rect(x0 + 2 * b, y0 + 2 * b, x0 + 3 * b - 1, y0 + h - 2 * b, C.blanco); R.rect(x0 + w - 3 * b + 1, y0 + 2 * b, x0 + w - 2 * b, y0 + h - 2 * b, C.blanco);
  const yr = y0 + 5 * s; let hueco = null;
  for (let i = 0; i < 10; i++) { const x = x0 + 4 * s + i * paso; if (i === 6) { hueco = [x, yr, x + 6 * s - 1, yr + 10 * s - 1]; if (o.zeta) zeta(x, yr, s, C.blanco); continue; } celda(x, yr, s, CEL[i]); }
  const s2 = Math.max(1, Math.round(s * 0.5)), p2_ = 8 * s2, y2 = y0 + 20 * s, x2 = x0 + Math.round((w - 13 * p2_) / 2);
  for (let i = 0; i < 13; i++) if (i !== 7) celda(x2 + i * p2_, y2, s2, CEL2[i], 6, 8);
  if (o.brillo > 0 && o.brillo < 1) { const bx = x0 + Math.round(o.brillo * (w + 60)) - 30; R.recorte([x0, y0, x0 + w, y0 + h]); for (let y = y0; y <= y0 + h; y++) for (let d = 0; d < 6; d++) { const x = bx + d + Math.round((y - y0) * 0.4); R.pset(x, y, mez(R.pget(x, y), C.blanco, 0.5)); } R.recorte(null); }
  return { hueco, w, h };
};
const DIA = X.dia, NOCHE = [hex('#0c1028'), hex('#141c40'), hex('#1e2a58'), hex('#2a3a6a'), hex('#3a4a78')], OCASO = [hex('#3a3a7a'), hex('#7a4a8a'), hex('#c8607a'), hex('#e89060'), hex('#f8c878')];
const gaviota = (x, y, t, sentada, dir = 1) => {
  const X0 = (i) => Math.round(x + i * dir), B = hex('#f2f2f0'), G = hex('#a8aeb8');
  if (sentada) { R.rect(Math.min(X0(-3), X0(4)), y - 6, Math.max(X0(-3), X0(4)), y - 2, C.k); R.rect(Math.min(X0(-2), X0(3)), y - 5, Math.max(X0(-2), X0(3)), y - 3, B); R.rect(Math.min(X0(-3), X0(1)), y - 5, Math.max(X0(-3), X0(1)), y - 4, G);
    R.rect(Math.min(X0(2), X0(5)), y - 9, Math.max(X0(2), X0(5)), y - 5, C.k); R.rect(Math.min(X0(3), X0(4)), y - 8, Math.max(X0(3), X0(4)), y - 6, B); R.pset(X0(4), y - 7, C.k); R.pset(X0(6), y - 7, hex('#e8c030')); R.pset(X0(0), y - 1, hex('#e8c030')); R.pset(X0(2), y - 1, hex('#e8c030')); }
  else { const a = Math.sin(t * 12) > 0 ? -3 : 1; R.linea(x - 6, y + a, x, y, C.k); R.linea(x, y, x + 6, y + a, C.k); R.linea(x - 5, y + a, x - 1, y, B); R.linea(x + 1, y, x + 5, y + a, B); R.rect(x - 1, y - 1, x + 1, y + 1, B); }
};
const p3 = (t) => {
  const ph = Math.max(0, t - P3) * 0.85, n = 0.5 - 0.5 * Math.cos(ph * Math.PI * 2), o = Math.max(0, 1 - Math.abs(n - 0.5) * 3);
  const cols = DIA.map((c, i) => mez(mez(c, NOCHE[i], n), OCASO[i], o * 0.7));
  cielo(t * 9, { hor: 132, cols, yN: 18, aves: 0, sem: 3 });
  if (n > 0.55) for (let k = 0; k < 50; k++) { const x = Math.floor(hh(k, 1, 42) * 320), y = Math.floor(hh(k, 2, 42) * 110); if ((x > 276 && y < 46) || (y < 16 && x > 18 && x < 172)) continue; if (bay(x, y) < (n - 0.55) * 2.4) R.pset(x, y, C.blanco); }
  { const f = ph % 1, sx = Math.round(30 + f * 230), sy = Math.round(118 - Math.sin(f * Math.PI) * 70); if (n < 0.5) { R.disco(sx, sy, 6, hex('#fff2c0')); R.disco(sx, sy, 5, hex('#ffe08a')); } else { R.disco(sx, sy, 5, hex('#f0ecdc')); R.disco(sx + 2, sy - 1, 4, cols[1]); } }
  // la torre del puente a la izquierda y los cables por detrás del letrero; el mar y la orilla abajo
  for (const [a, b] of [[4, 13], [21, 30]]) { R.rect(a, 18, b, 132, C.k); R.rect(a + 1, 19, b - 1, 132, mez(hex('#9aa8b6'), C.k, n * 0.55)); R.rect(a + 1, 19, a + 2, 132, mez(hex('#c8d2dc'), C.k, n * 0.55)); for (let y = 24; y < 130; y += 5) R.rect(a + 1, y, b - 1, y, mez(hex('#6e7a86'), C.k, n * 0.55)); }
  for (const y of [22, 50, 82, 114]) { R.rect(13, y, 21, y + 3, C.k); R.rect(13, y + 1, 21, y + 2, mez(hex('#8a96a2'), C.k, n * 0.55)); }
  if (n > 0.5) { R.pset(9, 17, hex('#ff4040')); R.pset(25, 17, hex('#ff4040')); }
  for (let x = 30; x < 320; x++) { const y = Math.round(22 + (x - 30) * 0.32 + ((x - 30) / 290) ** 2 * 10); R.pset(x, y, hex('#3a4450')); if (x % 9 === 0) R.linea(x, y + 1, x, 132, mez(hex('#8a949e'), C.k, n * 0.5)); }
  for (let y = 120; y < 132; y++) for (let x = 30; x < 320; x++) R.pset(x, y, mez((x + y * 3) % 7 ? hex('#3a7aa8') : hex('#7ab0d0'), C.k, n * 0.6));
  // la calzada de abajo, en cámara rápida: estelas de faros
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const hw = (y - 116) * 4.2; R.pset(x, y, Math.abs(x - 160) > hw ? mez(hex('#8a8a90'), C.k, n * 0.5) : mez(hh(x >> 1, y, 43) < 0.08 ? hex('#5a5a62') : hex('#46464e'), C.k, n * 0.5)); }
  for (let y = 134; y < 180; y += 1) for (const r_ of [-0.62, -0.28, 0.28, 0.62]) if (Math.floor(40 / (y - 114) * 3) % 2 === 0) R.pset(Math.round(160 + r_ * (y - 116) * 4.2 * 0.5), y, mez(hex('#d8d4c8'), C.k, n * 0.5));
  for (let k = 0; k < 34; k++) { const lado = k % 2 ? 1 : -1, lane = 0.06 + (k % 6) * 0.075, f = ((t * (2.2 + (k % 3) * 0.4) + hh(k, 1, 44)) % 1), y0 = 132 + f * 48, y1 = Math.min(179, y0 + 4 + f * 10);
    const col = lado < 0 ? (n > 0.4 ? hex('#fff8d8') : hex('#d8dce4')) : (n > 0.4 ? hex('#ff4848') : hex('#c84a4a'));
    for (let y = Math.round(y0); y <= Math.round(y1); y++) R.pset(Math.round(160 + lado * lane * (y - 116) * 4.2), y, col); }
  // el pórtico y el letrero
  const L = letrero(68, 38, 2);
  for (const px of [52, 266]) { R.rect(px - 3, 28, px + 3, 179, C.k); R.rect(px - 2, 29, px + 2, 179, hex('#9aa4ae')); for (let y = 32; y < 176; y += 6) { R.pset(px - 1, y, hex('#5e6a76')); R.pset(px + 1, y + 3, hex('#5e6a76')); } }
  for (const by of [30, 104]) { R.rect(49, by, 269, by + 4, C.k); R.rect(50, by + 1, 268, by + 3, hex('#9aa4ae')); for (let x = 52; x < 268; x += 6) R.linea(x, by + 1, x + 3, by + 3, hex('#5e6a76')); }
  if (n > 0.45) for (const lx of [100, 160, 220]) { R.rect(lx - 3, 109, lx + 3, 111, C.k); for (let j = 0; j < 30; j++) for (let i = -j * 0.4; i <= j * 0.4; i++) { const x = Math.round(lx + i), y = 104 - j; if (y > 38 && bay(x, y) < 0.25 * (n - 0.45) * 2) R.pset(x, y, mez(R.pget(x, y), hex('#fff8d0'), 0.35)); } }
  if (n > 0.45) { for (let y = 38; y <= 38 + 64; y++) for (let x = 68; x <= 68 + L.w; x++) if (bay(x, y) < (n - 0.45) * 0.8) R.pset(x, y, mez(R.pget(x, y), hex('#0c1028'), 0.35)); }
  // «50+» en «fifty»
  const e5 = tramo(t, cincuenta - 0.1, cincuenta + 0.25) * (1 - tramo(t, mal - 0.2, mal + 0.2));
  if (e5 > 0) { R.rect(124, 140, 196, 164, C.k); R.rect(125, 141, 195, 163, hex('#2a2430')); R.rect(125, 141, 195, 141, hex('#5a4a6a')); R.numero('50+', 160, Math.round(lerp(168, 160, e5)), { tam: 16, centro: true }); }
  // la gaviota que se posa en el hueco de la letra que falta; se va en «Missing»
  const [hx0, hy0, hx1, hy1] = L.hueco, gcx = Math.round((hx0 + hx1) / 2);
  const ll = tramo(t, P3 + 0.9, P3 + 1.8), sale = tramo(t, falta - 0.1, falta + 0.5);
  if (sale > 0) gaviota(Math.round(gcx + sale * 90), Math.round(hy1 - 4 - sale * 70), t, false);
  else if (ll < 1) gaviota(Math.round(lerp(-10, gcx, ll)), Math.round(lerp(20, hy1 - 6, ll) - Math.sin(ll * Math.PI) * 12), t, false);
  else gaviota(gcx - 1, hy1 + 1, t, true, Math.sin(t * 1.3) > 0 ? 1 : -1);
  if (t > mal && t < falta) R.icono('!', gcx - 2, hy0 - 16 - Math.round(Math.abs(Math.sin(t * 5)) * 2), hex('#e83a3a'), hex('#5a1a1a'));
  if (t > falta) { const bl = Math.floor(t * 4) % 2 ? 1 : 0.5; zeta(hx0, hy0, 2, hex('#e84a4a'), bl); R.rect(hx0 - 2, hy0 - 2, hx1 + 2, hy0 - 2, hex('#e84a4a')); R.rect(hx0 - 2, hy1 + 2, hx1 + 2, hy1 + 2, hex('#e84a4a')); for (let y = hy0 - 2; y <= hy1 + 2; y += 2) { R.pset(hx0 - 2, y, hex('#e84a4a')); R.pset(hx1 + 2, y, hex('#e84a4a')); } }
};

// ── 4 · 2018: la grúa de cesta y la pieza que falta ──
const fondoCesta = () => capa('cesta', () => {
  const { rect, pset } = R;
  // cables, péndolas y la torre lejana por detrás del letrero; el mar y la otra calzada abajo
  for (let x = 0; x < 320; x++) { const y = Math.round(10 + x * 0.12); pset(x, y + 40, hex('#3a4450')); pset(x, y + 41, hex('#5a6470')); if (x % 14 === 0) R.linea(x, y + 42, x, 124, hex('#8a949e')); }
  rect(292, 50, 312, 124, C.k); rect(294, 52, 298, 124, hex('#9aa6b4')); rect(306, 52, 310, 124, hex('#8a96a2')); for (const y of [56, 84, 110]) rect(294, y, 310, y + 2, hex('#6e7a86'));
  for (let y = 118; y < 132; y++) for (let x = 0; x < 320; x++) pset(x, y, (x * 3 + y * 7) % 13 === 0 ? hex('#8ac0e0') : hex('#3a7aa8'));
  for (let x = 0; x < 320; x++) { const top = 112 + Math.round(Math.sin(x * 0.04) * 2); for (let y = top; y < 119; y++) pset(x, y, (x + y) % 9 === 0 ? hex('#e8e0d0') : hex('#6a8a74')); }
  // la calzada en perspectiva: el arcén, las rayas y el pretil
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const q = hh(x >> 1, y, 45), rel = (x - 140) / ((y - 118) * 5.5);
    let c = q < 0.07 ? hex('#6a6a72') : q > 0.95 ? hex('#3a3a42') : hex('#50505a'); if (Math.abs(rel - 0.15) < 0.02 && Math.floor(60 / (y - 116)) % 2 === 0) c = hex('#e8e4d8'); if (Math.abs(rel + 0.45) < 0.025) c = hex('#e8c030');
    if (rel < -0.62) c = (y % 3 === 0) ? hex('#9a968e') : hex('#bab6ae'); pset(x, y, c); }
});
const camion = (t) => {
  const { rect, pset } = R, bl = hex('#f2f0ea'), na = hex('#e8783a'), naS = hex('#b8501e');
  rect(214, 140, 319, 170, C.k); rect(215, 141, 319, 160, bl); rect(215, 150, 319, 152, na); rect(215, 158, 319, 160, hex('#c8c4bc'));
  rect(214, 128, 246, 141, C.k); rect(215, 129, 245, 140, bl); rect(218, 131, 232, 138, hex('#5a8ab0')); rect(218, 131, 232, 132, hex('#a8d0e8')); rect(214, 146, 216, 150, hex('#f8f0b0'));
  const ba = Math.floor(t * 5) % 2; rect(236, 125, 242, 128, C.k); rect(237, 126, 241, 127, ba ? hex('#ffb030') : hex('#a86a10'));
  for (const wx of [232, 296]) { R.disco(wx, 170, 8, C.k); R.disco(wx, 170, 5, hex('#3a3a42')); R.disco(wx, 170, 2, hex('#a8a8b0')); }
  for (let x = 250; x < 318; x += 8) { rect(x, 141, x + 1, 149, hex('#d8d4cc')); }
  // los conos
  for (const [cx, cy] of [[178, 176], [150, 166], [128, 158], [112, 152]]) { const s = (cy - 120) / 50; const h = Math.round(9 * s); R.poligono([[cx - Math.round(3 * s), cy], [cx, cy - h], [cx + Math.round(3 * s), cy]], na); R.rect(cx - Math.round(2 * s), cy - Math.round(h * 0.55), cx + Math.round(2 * s), cy - Math.round(h * 0.45), C.blanco); R.rect(cx - Math.round(4 * s), cy, cx + Math.round(4 * s), cy, C.k); }
};
const p4 = (t) => {
  cielo(t, { hor: 120, cols: X.dia, sol: [60, 30, 6], yN: 12, aves: 2, yAves: 14, sem: 5 });
  fondoCesta();
  // el tráfico de la otra calzada
  for (const [k, col] of [[0, hex('#c83a3a')], [1, hex('#5ab0b0')]]) { const f = ((t * 0.32 + k * 0.5) % 1), k_ = 1 - f; cocheDetras(Math.round(120 - 104 * k_), Math.round(124 + 56 * k_), 0.3 + 1.4 * k_, col); }
  const sube_ = tramo(t, P4 + 0.15, P4 + 1.4), bxL = Math.round(lerp(196, 164, sube_)), byF = Math.round(lerp(150, 92, sube_));
  // el letrero a escala 3 (el hueco queda en x 150)
  const L = letrero(-10, 18, 3, { zeta: t > arregla + 0.05, brillo: tramo(t, d2018, d2018 + 0.9) });
  R.rect(-10, 116, 300, 120, C.k); R.rect(-10, 117, 300, 119, hex('#9aa4ae')); for (let x = -8; x < 300; x += 7) R.linea(x, 117, x + 3, 119, hex('#5e6a76'));
  const [hx0, hy0, hx1, hy1] = L.hueco;
  camion(t);
  // el brazo de la grúa, la cesta y el operario
  R.linea(262, 126, bxL + 20, byF + 2, C.k); R.linea(263, 127, bxL + 21, byF + 3, hex('#e8e4dc')); R.linea(264, 128, bxL + 22, byF + 4, hex('#c8c4bc')); R.linea(265, 129, bxL + 22, byF + 5, C.k);
  R.rect(256, 122, 270, 130, C.k); R.rect(257, 123, 269, 129, hex('#e8783a'));
  const pone = tramo(t, arregla - 0.35, arregla), tiene = t < arregla;
  const op = R.actor(EL.vigas, bxL + 4, byF - 2, t, { dir: -1, tocado: 'casco', sostiene: tiene ? [Math.round(lerp(bxL - 2, hx1 + 2, pone)), Math.round(lerp(byF - 14, (hy0 + hy1) / 2, pone))] : undefined, dedo: t > arregla + 0.5, sonrisa: t > arregla + 0.3, habla: t > P4 + 1.5 && t < arregla - 0.6 && Math.sin(t * 9) > 0 });
  if (tiene) { const [mx, my] = op.mano, px = Math.round(mx - 18), py = Math.round(my - 15); R.rect(px - 1, py - 1, px + 18, py + 30, C.k); R.rect(px, py, px + 17, py + 29, VERDE); zeta(px, py, 3, C.blanco); R.pset(px + 1, py + 1, hex('#c8ccd4')); R.pset(px + 16, py + 28, hex('#c8ccd4')); }
  R.rect(bxL - 2, byF - 10, bxL + 24, byF + 4, C.k); R.rect(bxL - 1, byF - 9, bxL + 23, byF + 3, hex('#f0c030')); R.rect(bxL - 1, byF - 9, bxL + 23, byF - 8, hex('#f8e070')); for (let x = bxL + 2; x < bxL + 22; x += 5) R.rect(x, byF - 7, x, byF + 2, hex('#c89a20'));
  if (t > arregla && t < arregla + 0.6) for (let q = 0; q < 8; q++) { const a = q * 0.8 + t * 6, r = 6 + (t - arregla) * 30; R.pset(Math.round((hx0 + hx1) / 2 + Math.cos(a) * r), Math.round((hy0 + hy1) / 2 + Math.sin(a) * r), hex('#fff6c0')); }
  // el compañero de abajo, con su chaleco, que le guía y lo celebra
  R.actor(EL.estibador, 90, 168, t, { dir: 1, pal: { C: hex('#f08a2a'), c: hex('#c86a1a') }, tocado: 'casco', dedo: t > P4 + 0.4 && t < arregla, habla: t > P4 + 0.6 && t < arregla - 0.3 && Math.sin(t * 9) > 0, brazos: t > d2018, sonrisa: t > arregla, salto: t > d2018 && t < d2018 + 0.3 ? 3 : 0 });
  // la gaviota de antes, en lo alto del letrero; se va en «2018»
  const gv = tramo(t, d2018 + 0.1, d2018 + 1.0);
  if (gv > 0) gaviota(Math.round(230 + gv * 80), Math.round(16 - gv * 6 + Math.sin(gv * 9) * 2), t, false); else gaviota(230, 18, t, true, -1);
};

const efectos = [[1.6, 'publico'], [abre - 0.05, 'golpecito'], [abre + 0.1, 'publico'], [abre + 0.7, 'claxon'], [P2 + 0.5, 'brillo'], [bote, 'ola'], [nombre + 0.05, 'brillo'],
  [P3 + 0.2, 'whoosh'], [cincuenta, 'pop'], [mal, 'aviso'], [falta + 0.05, 'whoosh'], [P4 + 0.2, 'motor'], [arregla, 'golpecito'], [d2018, 'brillo'], [d2018 + 0.15, 'palmada']];
const año = (t) => (t < P3 ? 1964 : t < P4 ? Math.round(lerp(1964, 2017, tramo(t, P3 + 0.2, P4 - 0.2))) : 2018);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1964', efectos, año });
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['ny-cierre'] = ('El cierre', '''// NY-CIERRE (frases 54–55), hoy y 1524, sin cartela. Tres planos, con calma:
// 1. (hasta «beneath») desde lo alto de un portacontenedores que entra al atardecer: el puente se acerca y pasa por
//    encima; sobre las dos orillas asoma el bosque de 1524 y una canoa fantasma; un marinero de cubierta señala el puente
//    y su sombra cruza la proa en «beneath»;
// 2. (hasta «without») 1524, el estrecho al anochecer: el bote de Verrazzano vuelve a La Dauphine; en «stayed so briefly»
//    él se vuelve a mirar la bahía (y en el hueco del estrecho asoma, pálido, el puente que no sabe que vendrá); la nao
//    suelta las velas y se aleja en «sailed away», con el bote a remolque y el farol de popa encendido;
// 3. el muelle del bajo Manhattan al anochecer: las ventanas se encienden una a una en «what he'd found»; el chico de los
//    prismáticos se vuelve hacia Atom y le saluda en «What do you want me to explain next?»; pasa una vecina con su perro.''', PRE + PRE2 + r'''
const P2 = @(4.7), P3 = @(8.89);
const pasa = @(4.04), breve = @(7.22), zarpa = @(8.31), hallo = @(9.99), quieres = @(11.34), next = @(12.42);

// ── 1 · desde la proa, bajo el puente ──
const TARDE = [hex('#2e2e6a'), hex('#6a3e7e'), hex('#c45a78'), hex('#ee8a5a'), hex('#f8c878')];
const orillaTop = (x) => (x < 128 ? 86 + Math.round(Math.sin(x * 0.035) * 5 + x * 0.06 + Math.max(0, x - 100) * 0.7) : x > 194 ? 92 + Math.round(Math.sin(x * 0.05 + 1) * 3 - (x - 194) * 0.02 + Math.max(0, 222 - x) * 0.6) : 112);
const fondoBahia = () => capa('bahiaTarde', () => {
  const { pset, rect } = R, cer = [hex('#4a3a62'), hex('#3a2e54'), hex('#2e2446'), hex('#5a4672')];
  // las dos orillas: la loma, las casas con las ventanas encendidas, los árboles y las farolas
  for (let x = 0; x < 320; x++) { const top = orillaTop(x); if (top >= 112) continue;
    for (let y = top; y < 112; y++) { const d = (y - top) / (112 - top + 1); let c = d < 0.08 ? cer[3] : d < 0.5 ? cer[0] : d < 0.85 ? cer[1] : cer[2]; if (hh(x, y, 22) < 0.07) c = mez(c, C.k, 0.2); pset(x, y, c); }
    if (x % 5 === 0 && hh(x, 1, 23) < 0.6) { const r = 2 + Math.floor(hh(x, 2, 23) * 2); R.disco(x, top, r, cer[2]); R.disco(x - 1, top - 1, Math.max(1, r - 1), cer[1]); } }
  for (let k = 0; k < 70; k++) { const x = Math.floor(hh(k, 1, 24) * 320); if (x > 124 && x < 198) continue; const top = orillaTop(x), y = top + 4 + Math.floor(hh(k, 2, 24) * Math.max(1, 108 - top - 6)); if (y > 108) continue;
    const w = 3 + Math.floor(hh(k, 3, 24) * 4); rect(x, y, x + w, y + 3, hex('#5a4a6a')); rect(x, y - 1, x + w, y - 1, hex('#2a2038')); if (hh(k, 4, 24) < 0.7) pset(x + 1 + (k % Math.max(1, w - 1)), y + 1, hex('#f8d070')); if (hh(k, 5, 24) < 0.3) pset(x + w - 1, y + 2, hex('#f0b860')); }
  for (let x = 4; x < 320; x += 7) { if (x > 120 && x < 200) continue; const y = orillaTop(x) + Math.round((112 - orillaTop(x)) * 0.8); if (y < 111) pset(x, y, hex('#f8b860')); }
  // en medio, la bahía con la ciudad lejana encendida
  for (let k = 0; k < 18; k++) { const x = 128 + k * 4, h = 3 + Math.floor(hh(k, 1, 20) * 9); for (let y = 110 - h; y < 110; y++) { pset(x, y, (y + k) % 3 ? hex('#4a3e5e') : hex('#f0c060')); pset(x + 1, y, hex('#3a3050')); } }
  rect(124, 110, 198, 111, hex('#3a3050'));
  // el mar al atardecer
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const d = (y - 112) / 68, q = hh(x >> 2, y, 21), onda = (x + Math.floor(y * 2.3)) % (9 + Math.floor(d * 10)) === 0;
    let c = mez(hex('#c86a78'), hex('#2a2a5a'), Math.min(1, d * 1.4)); if (onda) c = mez(c, hex('#f8b878'), 0.5); if (Math.abs(x - 160) < 4 + d * 30 && q < 0.35 - d * 0.2) c = hex('#f8d090'); pset(x, y, c); }
  for (let x = 0; x < 320; x++) { const top = orillaTop(x); if (top < 112) for (let j = 0; j < Math.min(8, 112 - top); j++) if (bay(x, 112 + j) < 0.45 - j * 0.05) pset(x, 112 + j, mez(R.pget(x, 112 + j), cer[1], 0.6)); }
});
const fantasmaOrillas = (a) => fantasmal(0, 60, 319, 112, a, () => {
  for (let x = 0; x < 320; x += 4) { if (x > 122 && x < 200) continue; const top = orillaTop(x), r = 4 + Math.floor(hh(x, 1, 25) * 4), y = top - 2 - Math.floor(hh(x, 2, 25) * 6);
    R.disco(x, y + 3, r, GHS); R.disco(x - 1, y + 1, r - 2, GH); if (x % 12 === 0) { R.disco(x + 2, y + 9, r, GHS); R.disco(x + 1, y + 8, r - 2, GH); } }
});
const puenteEncima = (t, d) => {
  const { rect, pset } = R, yd = Math.round(112 - 44 / d), th = Math.max(5, Math.round(8 / d)), ac = hex('#5a5272'), acS = hex('#2e2e48'), luz = hex('#f8e8a0');
  // los cables con sus péndolas (la curva baja en el centro y sale por arriba antes de la zona de Atom)
  for (let x = 0; x < 320; x++) { const u = (x - 160) / 160, y = Math.round(yd - 3 / d - 150 * u * u); if (y < 0 || y > 179 || (y < 17 && x > 14 && x < 176)) continue; pset(x, y, acS); if (y + 1 < yd) pset(x, y + 1, hex('#6a5a7a'));
    if (x % Math.max(3, Math.round(6 / d)) === 0) for (let yy = y + 2; yy < yd; yy++) pset(x, yy, hex('#5a5070'));
    if (x % Math.max(4, Math.round(8 / d)) === 2) { const tw = Math.sin(t * 3 + x * 0.7) > -0.3; pset(x, y - 1, tw ? hex('#fff6c8') : hex('#e8c878')); if (tw && d < 0.7) pset(x + 1, y - 1, hex('#f8e0a0')); } }
  if (yd + th < 0) return;
  for (let y = Math.max(0, yd); y <= Math.min(179, yd + th); y++) for (let x = 0; x < 320; x++) { const f = (y - yd) / th;
    pset(x, y, y === yd ? hex('#a88a9a') : f > 0.85 ? C.k : f > 0.7 ? hex('#c87a6a') : f < 0.3 ? ac : (x % Math.max(4, Math.round(9 / d)) < Math.max(1, Math.round(1.2 / d))) ? acS : (Math.floor(x / Math.max(4, Math.round(9 / d))) + Math.floor(f * 3)) % 2 ? mez(ac, acS, 0.5) : ac); }
  for (let x = Math.floor((t * 40) % Math.round(14 / d)); x < 320; x += Math.max(6, Math.round(14 / d))) { const y = yd - 1; if (y >= 0) { pset(x, y, luz); pset(x + 1, y, luz); } }
};
const proa = (t) => {
  const { rect, pset } = R;
  // la cubierta de proa vista desde el puente de mando: triángulo que se estrecha, con las bordas, el molinete y el mástil
  R.poligono([[-30, 180], [160, 132], [350, 180]], C.k); R.poligono([[-24, 180], [160, 135], [344, 180]], hex('#6a2e2a'));
  for (let y = 136; y < 180; y++) { const hw = (y - 134) * 4.1; for (let x = Math.max(0, Math.round(160 - hw)); x <= Math.min(319, Math.round(160 + hw)); x++) { if ((x * 3 + y * 5) % 23 === 0) pset(x, y, hex('#7a3a34')); if (Math.abs(Math.abs(x - 160) - hw * 0.7) < 0.6) pset(x, y, hex('#e8c030')); } }
  for (const d of [-1, 1]) { for (let y = 134; y < 180; y++) { const x = Math.round(160 + d * (y - 134) * 4.1); rect(Math.min(x, x - d * 2), y, Math.max(x, x - d * 2), y, hex('#d8d4cc')); if (y % 6 === 0) rect(x - d * 1, y - 7, x - d * 1, y, hex('#e8e4dc')); } }
  for (let y = 136; y < 180; y++) { const hw = (y - 134) * 4.1; for (let x = Math.max(0, Math.round(160 - hw + 3)); x <= Math.min(319, Math.round(160 + hw - 3)); x++) { const c = R.pget(x, y); if (y < 150 && bay(x, y) < (150 - y) / 18) R.pset(x, y, mez(c, hex('#d87a5a'), 0.35)); } }
  for (const ys of [139, 143, 148, 155, 164, 175]) { const hw = (ys - 134) * 4.1; R.rect(Math.max(0, Math.round(160 - hw + 3)), ys, Math.min(319, Math.round(160 + hw - 3)), ys, hex('#4e2220')); }
  // el rompeolas en uve, los norays, las cadenas a los escobenes, la adujada y el salvavidas
  R.linea(122, 147, 160, 140, C.k); R.linea(160, 140, 198, 147, C.k); R.linea(122, 148, 160, 141, hex('#c8c4bc')); R.linea(160, 141, 198, 148, hex('#c8c4bc')); R.linea(124, 149, 160, 143, hex('#8a8690')); R.linea(160, 143, 196, 149, hex('#8a8690'));
  for (const [bx, by] of [[96, 162], [104, 162], [216, 162], [224, 162], [60, 174], [68, 174], [252, 174], [260, 174]]) { R.rect(bx - 2, by - 4, bx + 2, by, C.k); R.rect(bx - 1, by - 3, bx + 1, by, hex('#5a5a66')); R.rect(bx - 2, by - 5, bx + 2, by - 4, hex('#3a3a46')); R.pset(bx - 1, by - 3, hex('#8a8a96')); }
  for (const d of [-1, 1]) { for (let k = 0; k < 14; k++) { const x = Math.round(160 + d * (10 - k * 0.5)), y = 155 - k; R.pset(x, y, k % 2 ? hex('#5a5a66') : hex('#8a8a96')); } R.disco(160 + d * 4, 140, 1, C.k); }
  R.rect(132, 166, 188, 179, C.k); R.rect(133, 167, 187, 179, hex('#2e5a4a')); R.rect(133, 167, 187, 167, hex('#4e8a6a')); for (let x = 138; x < 186; x += 8) R.rect(x, 168, x, 179, hex('#1e3e32')); R.rect(133, 172, 187, 172, hex('#1e3e32'));
  for (const wx of [84, 236]) { R.rect(wx - 8, 150, wx + 8, 158, C.k); R.rect(wx - 7, 151, wx + 7, 157, hex('#3e6a52')); R.disco(wx, 154, 3, C.k); R.disco(wx, 154, 2, hex('#8a8a96')); R.rect(wx - 7, 151, wx + 7, 151, hex('#6a9a7a')); }
  for (let k = 0; k < 40; k++) { const x = Math.floor(hh(k, 1, 26) * 320), y = 140 + Math.floor(hh(k, 2, 26) * 40); if (Math.abs(x - 160) < (y - 134) * 4.0) { R.pset(x, y, hex('#8a4a3a')); R.pset(x, y + 1, hex('#5a2a24')); } }
  R.disco(126, 170, 6, C.k); R.disco(126, 170, 5, hex('#c8a870')); R.disco(126, 170, 3, hex('#a8885a')); R.disco(126, 170, 1, hex('#5a4a30'));
  R.disco(40, 166, 5, C.k); R.disco(40, 166, 4, hex('#e8783a')); R.disco(40, 166, 2, C.k); R.pset(40, 162, C.blanco); R.pset(36, 166, C.blanco); R.pset(44, 166, C.blanco);
  rect(144, 152, 176, 160, C.k); rect(145, 153, 175, 159, hex('#3a5a3a')); R.disco(150, 156, 4, C.k); R.disco(150, 156, 3, hex('#5a6a5a')); R.disco(170, 156, 4, C.k); R.disco(170, 156, 3, hex('#5a6a5a'));
  for (let k = 0; k < 10; k++) { pset(152 - k * 3, 156 - k, hex('#8a8a96')); pset(168 + k * 3, 156 - k, hex('#8a8a96')); }
  rect(159, 104, 161, 152, C.k); rect(160, 105, 160, 152, hex('#e8e4dc')); rect(154, 112, 166, 113, C.k); const lz = Math.sin(t * 3) > -0.6; R.disco(160, 103, 2, C.k); pset(160, 103, lz ? C.blanco : hex('#a8a8a8'));
  // la bandera de proa
  R.linea(160, 132, 160, 122, hex('#e8e4dc')); banderita(160, 122, t, 2, 7, 5);
  // los contenedores de las esquinas
  for (const [x0, x1, c] of [[0, 34, hex('#2a5aa8')], [0, 26, hex('#c8303a')], [286, 319, hex('#e8783a')], [294, 319, hex('#2a8a6a')]]) { const y0 = x0 === 0 ? (c === hex('#c8303a') ? 168 : 158) : (c === hex('#e8783a') ? 158 : 168); rect(x0, y0, x1, 179, C.k); rect(x0, y0 + 1, x1, 179, c); for (let x = x0 + 1; x < x1; x += 3) rect(x, y0 + 2, x, 179, mez(c, C.k, 0.3)); }
  // la espuma de la proa
  for (const d of [-1, 1]) for (let k = 0; k < 24; k++) { const s = ((k / 24 + t * 0.6) % 1), x = Math.round(160 + d * (2 + s * 70)), y = Math.round(136 + s * 22 + Math.sin(k + t * 4)); if (x >= 0 && x < 320) { pset(x, y, hex('#f0f0f4')); if (k % 2) pset(x + d, y, hex('#c8c8dc')); } }
};
const p1 = (t) => {
  const keep = X.nube; X.nube = [hex('#9a5a8a'), hex('#e8a0a0'), hex('#f8d0b0')];
  cielo(t, { hor: 112, cols: TARDE, sol: [160, 104, 9], yN: 30, aves: 3, yAves: 46, sem: 6 });
  X.nube = keep;
  fondoBahia();
  fantasmaOrillas(tramo(t, 1.6, 3.4) * 0.5);
  // la canoa fantasma que cruza
  { const u = tramo(t, 1.8, P2), cx = Math.round(lerp(30, 120, u)); if (u > 0) fantasmal(cx - 14, 112, cx + 14, 124, 0.8 * Math.min(1, u * 3), () => { R.rect(cx - 10, 120, cx + 10, 121, hex('#6a4a2a')); R.rect(cx - 8, 122, cx + 8, 122, hex('#4a3020')); for (const dx of [-4, 3]) { R.rect(cx + dx, 116, cx + dx + 1, 119, hex('#c88a5a')); R.pset(cx + dx, 115, hex('#2a2a2a')); R.linea(cx + dx + 1, 118, cx + dx + 4 + Math.round(Math.sin(t * 4 + dx) * 2), 123, hex('#a8804c')); } }); }
  const d = lerp(1, 0.68, Math.min(1, Math.max(0, t / (P2 + 0.05))) ** 1.4);
  puenteEncima(t, d);
  proa(t);
  // el marinero de cubierta: llega por la borda, señala el puente y se queda mirando cómo pasa por encima
  const a = tramo(t, 0.3, 1.6), mx = Math.round(lerp(238, 200, a));
  R.actor(EL.estibador, mx, 170, t, { dir: -1, anda: a > 0 && a < 1, pal: { C: hex('#f08a2a'), c: hex('#c86a1a') }, tocado: 'casco', dedo: t > 2.0 && t < pasa + 0.4, sorpresa: t > pasa + 0.2, habla: t > 2.2 && t < 3.0 && Math.sin(t * 9) > 0 });
  const ad = R.actor(EL.estibador2, 100, 174, t, { dir: t > 2.6 ? 1 : -1, sostiene: true, sonrisa: t > 3.0, sorpresa: t > 2.6 && t < 3.0 });
  { const [hx, hy] = ad.mano; R.disco(hx, hy + 3, 4, C.k); R.disco(hx, hy + 3, 3, hex('#c8a870')); R.disco(hx, hy + 3, 1, C.k); R.linea(hx, hy + 6, hx + 3, 174, hex('#c8a870')); }
  // la sombra del puente que cruza la proa
  const so = tramo(t, P2 - 0.6, P2); if (so > 0) { const ys = Math.round(190 * so); if (ys > 10) T.tinte(R, 0, Math.min(179, ys - 10), [24, 20, 48], 0.42); for (let y = Math.max(0, ys - 10); y <= Math.min(179, ys); y++) for (let x = 0; x < 320; x++) if (bay(x, y) < (ys - y) / 10 * 0.8) R.pset(x, y, mez(R.pget(x, y), hex('#181430'), 0.42)); }
};

// ── 2 · 1524: La Dauphine se aleja al anochecer ──
const bote = (x, y, t, dir) => {
  const { rect, pset } = R, L = 22;
  for (let j = 0; j <= 7; j++) { const l = L - Math.round((j / 7) ** 2 * 6); rect(x - l, y - 7 + j, x + l, y - 7 + j, j === 0 ? hex('#c8a06a') : j === 1 ? hex('#5a3a20') : j % 2 ? hex('#7a5430') : hex('#8a6438')); pset(x - l - 1, y - 7 + j, C.k); pset(x + l + 1, y - 7 + j, C.k); }
  rect(x - L, y - 8, x + L, y - 8, C.k); pset(x + dir * (L + 1), y - 9, C.k); pset(x + dir * (L + 2), y - 10, C.k);
  for (let i = -3; i <= 3; i++) pset(x - dir * (L + 3 + Math.abs(i) * 2), y + 1 + i % 2, hex('#a8b0c8'));
};
const p2 = (t) => {
  T.bahia1524(R, t, { encuadre: 'estrecho', luz: 'anochecer', viento: 0.45 });
  // el puente que vendrá, pálido, en el hueco del estrecho
  const fb = tramo(t, breve - 0.6, breve + 0.3) * (1 - tramo(t, zarpa + 0.1, P3 + 0.4)) * 0.55;
  if (fb > 0) fantasmal(110, 40, 232, 92, fb, () => { for (const tx of [134, 204]) { R.rect(tx - 2, 44, tx + 2, 90, GH); R.rect(tx - 2, 52, tx + 2, 53, GHS); R.rect(tx - 2, 66, tx + 2, 67, GHS); }
    for (let x = 112; x < 230; x++) { R.pset(x, 74, GH); R.pset(x, 75, GHS); const u = (x - 169) / 35, y = Math.round(72 - 26 * (1 - u * u)) ; if (x > 134 && x < 204) { const yy = Math.round(46 + 26 * (1 - ((x - 169) / 35) ** 2)) ; R.pset(x, Math.min(73, yy), GH); if (x % 5 === 0) for (let k = Math.min(73, yy) + 1; k < 74; k++) R.pset(x, k, GHS); } } });
  // La Dauphine: suelta las velas y se va hacia el mar abierto, con el farol de popa encendido
  const m = tramo(t, P2 + 1.6, P3 + 1.0), sx = Math.round(lerp(78, 22, m)), sy = Math.round(lerp(128, 120, m)), s = lerp(1, 0.84, m);
  const D = T.dauphine(R, sx, sy, t, { dir: -1, s, ancla: m <= 0, leva: tramo(t, P2 + 0.6, P2 + 1.8), avanza: m > 0.02, viento: 0.6 });
  { const px = Math.round(sx + 30 * s), py = Math.round(sy - 22 * s); R.disco(px, py, 5, (x, y) => (bay(x, y) < 0.4 ? mez(R.pget(x, y), hex('#f8c060'), 0.6) : R.pget(x, y))); R.rect(px - 1, py - 1, px + 1, py + 1, hex('#ffe08a')); }
  // el bote: llega remando a la popa y luego va a remolque
  const b = tramo(t, P2, P2 + 1.5), popa = [Math.round(sx + 40 * s), Math.round(sy + 6)];
  const bx = Math.round(b < 1 ? lerp(212, popa[0] + 8, b) : popa[0] + 26), by = Math.round(b < 1 ? lerp(158, popa[1] + 8, b) : popa[1] + 8 + Math.sin(t * 2) * 1);
  if (b >= 1) R.linea(popa[0] + 2, popa[1] - 4, bx - 18, by - 7, hex('#c8a87a'));
  const mira = t > breve - 0.75 && t < zarpa - 0.1;
  R.actor(EL.verrazzano, bx + 6, by - 4, t, { dir: mira ? 1 : -1, dedo: mira && t > breve - 0.2 && t < breve + 0.7, sonrisa: t > breve + 0.6 && t < zarpa });
  R.actor(EL.marinero, bx - 14, by + 1, t, { dir: -1, sonrisa: false });
  if (b < 1) for (const dx of [-12, -4]) { const ph = t * 3.6 + dx; R.linea(bx + dx, by - 8, bx + dx + Math.round(Math.cos(ph) * 10), by + 2 + Math.round(Math.sin(ph) * 2), hex('#c8a060')); }
  bote(bx, by, t, -1);
};

// ── 3 · el muelle al anochecer y Atom ──
const p3 = (t) => {
  const enc = lerp(0.12, 1, tramo(t, hallo - 0.5, hallo + 1.6));
  T.hoy(R, t, { encuadre: 'muelle', luz: 'anochecer', encender: enc, ferry: Math.round(lerp(60, 220, tramo(t, P3, E.duracion))) });
  for (let k = 0; k < 3; k++) T.e_paloma(R, 150 + k * 10, 164 + (k % 2) * 3, t, { picotea: Math.sin(t * 2 + k) > 0, dir: k % 2 ? 1 : -1 });
  // el chico de los prismáticos: mira la ciudad, se asombra cuando se encienden las ventanas y se vuelve hacia Atom
  const vuelve = t > quieres - 0.1;
  R.actor(EL.neoyorquino2, vuelve ? 70 : 56, 160, t, { dir: 1, sorpresa: t > hallo && t < hallo + 0.7, sonrisa: t > hallo + 0.7, dedo: vuelve && t < next - 0.1, brazos: t > next - 0.1, salto: t > next - 0.1 && t < next + 0.3 ? 3 : 0, habla: t > hallo + 0.8 && t < quieres - 0.3 && Math.sin(t * 8) > 0 });
  if (t > next + 0.1) { const b = Math.round(Math.abs(Math.sin((t - next) * 4)) * 2); R.icono('?', 92, 120 - b, hex('#f8e070'), hex('#3a2a10'), 2); }
  // la vecina del perro que pasea por delante
  const v = tramo(t, P3 + 0.2, E.duracion), vx = Math.round(lerp(322, 150, v));
  R.actor(EL.neoyorquina, vx, 172, t, { dir: -1, anda: v > 0 && v < 1, sostiene: [vx - 6, 162], sonrisa: true });
  R.linea(vx - 6, 162, vx - 16, 169, hex('#c8303a')); perro(vx - 12, 172, t, -1, v > 0 && v < 1);
};

const efectos = [[0.8, 'ola'], [pasa + 0.3, 'whoosh'], [P2 + 0.5, 'ola'], [P2 + 1.0, 'viento'], [breve, 'brillo'], [hallo, 'brillo'], [11.0, 'guau'], [next, 'pop']];
const año = (t) => (t < P2 || t >= P3 ? 2026 : 1524);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')

E = {k: (v[0], v[1], _conv(k, v[2])) for k, v in E.items()}
