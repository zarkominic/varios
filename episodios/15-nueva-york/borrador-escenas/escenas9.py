import re

# Borrador de las escenas del grupo S9 del ep15: ny-carrera y ny-empire (con el movimiento hecho).
# Los instantes se escriben como @(s) (segundos de escena, sacados de linea.json) y se convierten aquí en en('marca', f).
# PRE: las piezas locales del grupo S8 (cielo, capa, gente…); LIB: copias de piezas de ny-comun.js que no se exportan
# (e_cielo, e_skyline, e_edificio, e_corona, e_fusteChrysler, e_fordT…), para los fondos locales.

MARCAS = {
    'ny-carrera': [('carrera', 1.5, 12.42), ('aguja', 13.22, 21.513)],
    'ny-empire': [('empire', 1.5, 7.976), ('vacio', 8.778, 17.162)],
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


PRE = r'''const C = T.C;
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

LIB = r'''
const h = hh, E_FIG = FIG, E_ROPA = ROPA, E_PIEL = PIEL, E_SOMB = SOMB, E_SOMBM = SOMBM;
const EC = {
  dia: [hex('#3e7cc8'), hex('#5a96dc'), hex('#7ab0e8'), hex('#a4cbee'), hex('#d4e4ee')],
  otono: [hex('#3a5ea8'), hex('#6680c0'), hex('#a0a2cc'), hex('#dcb4a2'), hex('#f2cc96')],
  nubeDia: [hex('#a8bed6'), hex('#dce8f2'), hex('#ffffff')],
  nubeOtono: [hex('#b4949e'), hex('#eec8b4'), hex('#fff0d8')],
  sol: hex('#fff8dc'), solL: hex('#ffe08a'), halo: hex('#fff2c0'), ave: hex('#2e3446'),
  lejos: [hex('#a6b4cc'), hex('#909eba'), hex('#c6d0de'), hex('#bac6da')],
  medio: [hex('#7c8aa8'), hex('#64708e'), hex('#a8b6cc'), hex('#98a6c0')],
  lejosT: [hex('#c8a8a8'), hex('#b0909a'), hex('#e0c4b4'), hex('#d8b8b0')],
  medioT: [hex('#8a7890'), hex('#6e6078'), hex('#f0c880'), hex('#a08ca0')],
  minio: hex('#a84a3a'), minioS: hex('#743026'), minioL: hex('#d07050'),
  hierro: hex('#46525e'), hierroS: hex('#2c343e'), hierroL: hex('#76848e'), hierroT: hex('#a8c0d0'),
  inox: hex('#d8dee6'), inoxS: hex('#8e98a6'), inoxL: hex('#ffffff'), inoxM: hex('#b4bcc8'), inoxD: hex('#5e6876'),
  brasa: hex('#ff6a2a'), brasaL: hex('#ffd060'), brasaS: hex('#b83a1a'),
  vidrio: hex('#2e3e58'), vidrioM: hex('#46607e'), vidrioL: hex('#8aa8c4'), calido: hex('#f8d070'), calidoS: hex('#d89a40'),
  camisa: hex('#f2eee2'), camisaS: hex('#c8c0b0'), pantalon: hex('#3a3a48'),
  adoquin: hex('#6e6a72'), adoquinS: hex('#4e4a56'), adoquinL: hex('#8e8a92'),
  tranvia: hex('#3a6a4a'), tranviaS: hex('#28503a'), crema: hex('#e8dcb8'), cremaS: hex('#c4b690'),
  tabla: hex('#b08a5a'), tablaS: hex('#8a6a40'), tablaL: hex('#cca878'), tablaD: hex('#5e4428'),
  sombra: hex('#2a3048'), alfombra: hex('#9a2a2e'), alfombraS: hex('#6e1c22'),
};
function e_nube(R, cx, cy, w, [cS, cB, cL]) {
  const P = [[0, 0, 0.28], [-0.3, 0.07, 0.2], [0.3, 0.06, 0.22], [-0.1, -0.13, 0.23], [0.15, -0.09, 0.19], [0.48, 0.12, 0.12], [-0.48, 0.13, 0.11]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of P) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 2), r(f), cS);
  for (const [dx, dy, f] of P) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f), cB);
  for (const [dx, dy, f] of P) if (dy < 0.05) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), r(f * 0.55), cL);
  R.linea(Math.round(cx - w * 0.55), Math.round(cy + w * 0.13 + 2), Math.round(cx + w * 0.55), Math.round(cy + w * 0.13 + 2), cS);
}
function e_cielo(R, t, o = {}) {
  const B = R.buf, hor = Math.min(180, o.hor ?? 120), cols = o.cols ?? EC.dia, n = cols.length - 1, sem = o.sem ?? 0, nub = o.nubes ?? EC.nubeDia;
  for (let y = 0; y < hor; y++) { const p = Math.min(n - 1e-6, (y / hor) * n), i = Math.floor(p), f = p - i, a = cols[i], b = cols[i + 1], f0 = y * 320;
    for (let x = 0; x < 320; x++) B[f0 + x] = bay(x, y) < f ? b : a; }
  if (o.sol) { const [sx, sy, sr] = o.sol;
    R.disco(sx, sy, sr + 9, (x, y) => (bay(x, y) < 0.3 ? mez(R.pget(x, y), EC.halo, 0.5) : R.pget(x, y)));
    R.disco(sx, sy, sr + 4, (x, y) => (bay(x, y) < 0.6 ? EC.halo : R.pget(x, y)));
    R.disco(sx, sy, sr, EC.solL); R.disco(sx - 1, sy - 1, sr - 2, EC.sol); }
  const y0 = o.yN ?? 18;
  [[1.5, 3, y0, 0.55], [4, 2, y0 + 18, 0.8], [8, 2, y0 + 34, 1.05]].forEach(([v, nn, yb, s], L) => {
    for (let k = 0; k < nn; k++) { const w = Math.round((16 + hh(k, L, 501 + sem) * 14) * s), per = 320 + w * 2 + 60,
      x = ((hh(k, L, 502 + sem) * per + t * v) % per) - w - 30, y = Math.round(yb + hh(k, L, 503 + sem) * 12 * s);
      if (y + w * 0.2 < hor) e_nube(R, x, y, w, L === 0 ? nub.map((c) => mez(c, cols[1], 0.4)) : nub); } });
  for (let k = 0; k < (o.aves ?? 3); k++) { const per = 420, x = Math.round(((hh(k, 9, 504 + sem) * per + t * (11 + k * 3)) % per) - 50),
    y = Math.round((o.yAves ?? 40) + hh(k, 8, 505 + sem) * 30 + Math.sin(t * 0.8 + k) * 3), a = Math.sin(t * 9 + k * 2) > 0;
    if ((x > 270 && y < 50) || y >= hor) continue;
    R.pset(x, y, EC.ave); R.pset(x - 1, y - (a ? 1 : 0), EC.ave); R.pset(x + 1, y - (a ? 1 : 0), EC.ave); R.pset(x - 2, y - (a ? 2 : -1), EC.ave); R.pset(x + 2, y - (a ? 2 : -1), EC.ave); }
}
function e_gente(R, x, suelo, t, k, o = {}) {
  const muj = o.mujer ?? (k % 3 === 2), T = muj ? E_FIG.mujer : E_FIG.hombre, paso = o.anda !== false && !o.sentado ? Math.floor(t * 5 + k * 1.7) % 2 : 0;
  const ropa = o.ropa ?? E_ROPA[k % E_ROPA.length], piel = E_PIEL[(k >> 1) % E_PIEL.length], som = o.som ?? (muj ? E_SOMBM[k % 3] : E_SOMB[(k >> 2) % E_SOMB.length]);
  const col = { H: som, p: piel, c: o.camisa ? EC.camisa : ropa[0], C: o.camisa ? EC.camisaS : ropa[1], l: ropa[2], z: C.k };
  x = Math.round(x); const y0 = suelo - 11 - (paso && !muj ? 0 : 0);
  const fila = (j) => (o.sentado ? (j >= 8 ? (j === 8 ? 'll.ll' : j === 9 ? '.l.l.' : '.z.z.') : T[j]) : !muj && paso && j >= 8 && j <= 9 ? ['..ll.', '.l..l'][j - 8] : T[j]);
  const dy = (j) => (o.sentado && j >= 8 ? 1 : 0);
  for (let j = 0; j < 11; j++) { const f = fila(j); for (let i = 0; i < 5; i++) if (f[i] !== '.') { const yy = y0 + j + dy(j); if (f[i - 1] === undefined || f[i - 1] === '.') R.pset(x + i - 1, yy, C.k); if (f[i + 1] === undefined || f[i + 1] === '.') R.pset(x + i + 1, yy, C.k); if (j === 0) R.pset(x + i, yy - 1, C.k); } }
  for (let j = 0; j < 11; j++) { const f = fila(j); for (let i = 0; i < 5; i++) if (f[i] !== '.') R.pset(x + i, y0 + j + dy(j), col[f[i]]); }
}
function e_skyline(R, base, cols, o = {}) {
  const { rect, pset, poligono } = R, [cB, cS, cV, cL] = cols, sem = o.sem ?? 0, [amin, amax] = o.alto ?? [30, 70], [wmin, wmax] = o.ancho ?? [10, 26];
  let x = o.x0 ?? -4, k = 0; const x1 = o.x1 ?? 324;
  while (x < x1) { const w = wmin + Math.floor(hh(k, 1, 600 + sem) * (wmax - wmin)); let top = base - Math.round(amin + hh(k, 2, 600 + sem) * (amax - amin));
    if (x + w > 268 && top < 52) top = 52; if (x < 174 && x + w > 16 && top < 20) top = 20;
    rect(x, top, x + w - 1, base, cB); rect(x + w - 2, top, x + w - 1, base, cS); rect(x, top, x, base, cL);
    for (let y = top + 3; y < base - 1; y += 4) for (let i = x + 2; i < x + w - 3; i += 3) if (hh(i, y, 610 + sem) < 0.72) pset(i, y, cV);
    const r = hh(k, 3, 600 + sem), cx = x + (w >> 1);
    if (r < 0.16 && w > 9) { rect(x + 3, top - 7, x + 8, top - 3, cS); poligono([[x + 2, top - 7], [x + 5.5, top - 11], [x + 9, top - 7]], cS); pset(x + 3, top - 2, cS); pset(x + 8, top - 2, cS); pset(x + 3, top - 1, cS); pset(x + 8, top - 1, cS); }
    else if (r < 0.27 && top > (cx > 268 ? 62 : cx < 174 ? 32 : 14)) { poligono([[cx - 3, top], [cx, top - 12], [cx + 3, top]], cB); pset(cx, top - 13, cS); }
    else if (r < 0.42) { rect(x + 2, top - 5, x + w - 3, top, cB); rect(x + 4, top - 9, x + w - 5, top - 5, cB); rect(x + w - 4, top - 9, x + w - 3, top, cS); }
    x += w - (hh(k, 4, 600 + sem) < 0.3 ? 3 : 0); k++; }
}
function e_ventana(R, x, y, w, hh, r, o = {}) {
  const { rect, pset } = R, lit = r < (o.encendidas ?? 0.1), pers = r > 0.78, pf = 0.25 + (r - 0.78) * 2.5;
  rect(x - 1, y - 2, x + w, y - 1, o.dintel ?? C.calizaL); rect(x - 1, y + hh, x + w, y + hh, o.dintel ?? C.calizaL); rect(x - 1, y + hh + 1, x + w, y + hh + 1, mez(o.dintel ?? C.calizaL, C.k, 0.55));
  rect(x - 1, y, x - 1, y + hh - 1, o.marco ?? C.k); rect(x + w - 1, y, x + w - 1, y + hh - 1, o.marco ?? C.k);
  for (let j = 0; j < hh; j++) for (let i = 0; i < w - 1; i++) { let c = lit ? (j < hh / 2 ? EC.calido : EC.calidoS) : (i + j) % 7 < 2 ? EC.vidrioL : j < hh * 0.45 ? EC.vidrioM : EC.vidrio; if (pers && j < hh * pf) c = j % 2 ? hex('#d8ccb0') : hex('#c4b896'); pset(x + i, y + j, c); }
  if (w >= 5) rect(x + ((w - 1) >> 1), y, x + ((w - 1) >> 1), y + hh - 1, o.marco ?? hex('#e8e0d0')); if (hh >= 7) rect(x, y + (hh >> 1), x + w - 2, y + (hh >> 1), o.marco ?? hex('#e8e0d0'));
}
function e_edificio(R, x0, x1, y0, y1, o = {}) {
  const { rect, pset, linea, poligono } = R, B = R.buf, [c, cS, cL] = o.pared ?? [C.ladrillo, C.ladrilloS, C.ladrilloL], piedra = o.tipo === 'piedra', sem = o.sem ?? 0;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    let col; const q = hh(x >> 1, y, 620 + sem);
    if (piedra) { const fila = Math.floor((y - y0) / 5), jy = (y - y0) % 5 === 4, jx = (x - x0 + fila * 7) % 14 === 0; col = jy || jx ? cS : q < 0.14 ? cL : q > 0.9 ? cS : c; }
    else { const fila = (y - y0) >> 1, jy = (y - y0) % 2 === 1, jx = (x - x0 + (fila & 1) * 2) % 4 === 0; col = jy ? mez(cS, c, 0.4) : jx ? cS : q < 0.12 ? cL : q > 0.93 ? cS : c; }
    if (x === x0) col = cL; else if (x >= x1 - 1) col = cS;
    B[y * 320 + x] = col; }
  const [vw, vh, px, py] = o.ventanas ?? [6, 9, 12, 14], ox = o.ox ?? 5, oy = o.oy ?? 8;
  for (let y = y0 + oy, j = 0; y + vh < y1 - (o.bajo ?? 14); y += py, j++) for (let x = x0 + ox, i = 0; x + vw < x1 - 2; x += px, i++) e_ventana(R, x, y, vw, vh, hh(i + sem, j, 630), o);
  if (o.escalera) { const ex = o.escalera; for (let y = y0 + oy + vh; y < y1 - 14; y += py) { rect(ex - 2, y, ex + 16, y, C.k); for (let i = ex - 2; i <= ex + 16; i += 2) pset(i, y - 1, C.k); rect(ex - 2, y - 4, ex - 2, y, C.k); rect(ex + 16, y - 4, ex + 16, y, C.k); linea(ex + 1, y, ex + 13, y + py, C.k); } }
  if (o.cornisa !== false) { const cc = o.cornisaCol ?? [C.calizaL, C.calizaS];
    rect(x0 - 2, y0 - 4, x1 + 2, y0 - 1, cc[0]); rect(x0 - 2, y0 - 1, x1 + 2, y0 - 1, cc[1]); for (let x = x0 - 1; x <= x1 + 1; x += 3) pset(x, y0 - 2, cc[1]); rect(x0 - 3, y0 - 5, x1 + 3, y0 - 5, mez(cc[0], C.blanco, 0.4));
    for (let x = x0; x <= x1; x++) { const i = y0 * 320 + x; if (x >= 0 && x < 320 && y0 < 180) B[i] = mez(B[i], C.k, 0.35); } }
  if (o.deposito) { const dx = o.deposito; for (const lx of [dx, dx + 10]) rect(lx, y0 - 13, lx, y0 - 5, C.k); linea(dx, y0 - 6, dx + 10, y0 - 12, C.k);
    rect(dx - 2, y0 - 24, dx + 12, y0 - 13, EC.tablaS); for (let x = dx - 1; x <= dx + 11; x += 2) rect(x, y0 - 24, x, y0 - 13, EC.tablaD); rect(dx - 2, y0 - 24, dx - 1, y0 - 13, EC.tabla);
    for (const yy of [y0 - 21, y0 - 16]) rect(dx - 2, yy, dx + 12, yy, C.k); poligono([[dx - 3, y0 - 24], [dx + 5, y0 - 31], [dx + 13, y0 - 24]], C.k); poligono([[dx - 1, y0 - 25], [dx + 5, y0 - 30], [dx + 11, y0 - 25]], EC.tablaD); }
}
function e_fordT(R, x, suelo, t, dir = 1, col = hex('#24242c')) {
  const { rect, pset, disco } = R; x = Math.round(x); const y = suelo, X = (i) => x + i * dir, R2 = (a, b, y0, y1, c) => rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c);
  rect(x - 13, y, x + 13, y + 1, mez(EC.adoquinS, C.k, 0.5));
  R2(-12, 12, y - 8, y - 4, C.k); R2(-11, 11, y - 7, y - 5, col); R2(4, 11, y - 9, y - 5, col); R2(5, 10, y - 8, y - 8, hex('#4a4a56'));
  R2(-10, 2, y - 16, y - 15, C.k); R2(-10, -9, y - 15, y - 8, C.k); R2(1, 2, y - 15, y - 8, hex('#8aa8c4')); R2(-8, 0, y - 14, y - 9, hex('#3a3a46'));
  pset(X(-5), y - 11, E_PIEL[1]); pset(X(-4), y - 11, E_PIEL[1]); R2(-6, -3, y - 13, y - 12, E_SOMB[0]);
  pset(X(12), y - 8, C.oro); pset(X(12), y - 7, EC.solL);
  for (const wx of [-8, 8]) { disco(X(wx), y - 3, 3, C.k); disco(X(wx), y - 3, 2, hex('#5a5a66')); pset(X(wx), y - 3, C.k); const a = t * 10 * dir; pset(Math.round(X(wx) + Math.cos(a) * 1.5), Math.round(y - 3 + Math.sin(a) * 1.5), C.metalL); }
}
function e_viga(R, x0, x1, y, c = EC.minio, cS = EC.minioS, cL = EC.minioL) {
  const { rect, pset } = R; rect(x0, y - 2, x1, y + 2, C.k); rect(x0, y - 1, x1, y - 1, cL); rect(x0, y, x1, y, c); rect(x0, y + 1, x1, y + 1, cS);
  for (let x = x0 + 2; x < x1; x += 5) pset(x, y, cS);
}
function e_pilar(R, x, y0, y1, c = EC.minio, cS = EC.minioS, cL = EC.minioL) {
  const { rect, pset } = R; rect(x - 1, y0, x + 3, y1, C.k); rect(x, y0, x, y1, cL); rect(x + 1, y0, x + 1, y1, c); rect(x + 2, y0, x + 2, y1, cS);
  for (let y = y0 + 2; y < y1; y += 4) pset(x + 1, y, cS);
}
function e_corona(R, cx, yb, s, aguja, t, o = {}) {
  const { pset, disco, poligono, linea } = R, n = o.tiers ?? 6, DY = 12, DR = 4, ven = o.luces ? EC.calido : hex('#1e2a42'), venL = hex('#46608a');
  const cuerpo = (x, y, r, d) => { const u = (x - cx) / r, q = hh(x, y, 710), v = u + (d > 0.7 ? 0 : 0.35); if (s >= 0.6 && d < 0.66 && Math.round(x - cx + 100) % 5 === 2 && y % 4) return u > 0.5 ? hex('#3a4256') : EC.vidrio; return v < -0.5 ? EC.inoxL : v < 0.05 ? (q < 0.08 ? EC.inoxL : EC.inox) : v < 0.55 ? EC.inoxM : v < 0.95 ? EC.inoxS : EC.inoxD; };
  // de atrás (el piso más alto y estrecho) a delante: cada arco tapa la parte baja del de detrás, que asoma por encima
  for (let k = n - 1; k >= 0; k--) { const r = (36 - k * DR) * s, y0 = yb - k * DY * s;
    // el arco (semicírculo) y su costado vertical hasta la base: así cada piso es un escalón redondeado
    disco(cx, y0, r + 1, (x, y) => (y <= y0 ? C.k : R.pget(x, y)));
    for (let y = Math.round(y0); y <= yb; y++) { pset(Math.round(cx - r) - 1, y, C.k); pset(Math.round(cx + r) + 1, y, C.k); for (let x = Math.round(cx - r); x <= Math.round(cx + r); x++) { const lx = x - Math.round(cx - r); pset(x, y, s >= 0.6 && y > y0 + 3 && lx > 2 && x < cx + r - 2 && lx % 5 === 2 && y % 4 ? (x > cx + r * 0.5 ? hex('#3a4256') : EC.vidrio) : cuerpo(x, y, r, 0.5)); } }
    disco(cx, y0, r, (x, y, d) => (y > y0 ? R.pget(x, y) : cuerpo(x, y, r, d)));
    // las ventanas triangulares en abanico, oscuras, con la punta hacia fuera (el sol naciente del Chrysler)
    const nv = Math.max(5, Math.round(r / (s > 0.6 ? 3.6 : 3))), tam = Math.max(1.6, 4 * s);
    for (let i = 1; i < nv; i++) { const a = Math.PI + (i / nv) * Math.PI, ca = Math.cos(a), sa = Math.sin(a), r1 = r - 1, r0 = r - 1 - tam * 1.5, w = tam * 0.62;
      const col = o.luces && hh(i, k, 711) < 0.6 ? EC.calido : ven;
      if (s < 0.6) { pset(Math.round(cx + ca * (r - 2)), Math.round(y0 + sa * (r - 2)), col); continue; }
      poligono([[cx + ca * r1, y0 + sa * r1], [cx + ca * r0 - sa * w, y0 + sa * r0 + ca * w], [cx + ca * r0 + sa * w, y0 + sa * r0 - ca * w]], col);
      if (ca < -0.3) pset(Math.round(cx + ca * (r0 + 1.5)), Math.round(y0 + sa * (r0 + 1.5)), venL); }
    if (s >= 0.6) for (let x = Math.round(cx - r); x <= Math.round(cx + r); x += 3) pset(x, Math.round(y0) + 2, EC.inoxD); }
  const yt = yb - (n - 1) * DY * s - (36 - (n - 1) * DR) * s, L = 46 * s * cl(aguja);
  if (L > 0.5) { const yTip = Math.round(yt - L);
    for (let y = yTip; y <= Math.round(yt) + 1; y++) { const u = (y - yTip) / Math.max(1, yt - yTip), w = Math.max(0, u * 2.6 * s); for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) pset(x, y, x < cx ? EC.inoxL : x > cx ? EC.inoxS : EC.inox); if (w < 0.5) pset(cx, y, EC.inoxM); }
    const g = (t * 0.7) % 1, gy = Math.round(yTip + g * (yt - yTip)); pset(cx, gy, C.blanco); if (s > 0.6) { pset(cx - 1, gy, C.blanco); pset(cx, gy - 1, C.blanco); }
    return [cx, yTip]; }
  pset(Math.round(cx), Math.round(yt) - 1, EC.inoxM); return [cx, Math.round(yt)];
}
function e_fusteChrysler(R, x0, x1, y0, y1, o = {}) {
  const B = R.buf, paso = o.paso ?? 4;
  for (let y = Math.max(0, Math.round(y0)); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const lx = x - x0, u = lx / (x1 - x0); let c = u < 0.12 ? hex('#f0ece4') : u > 0.85 ? hex('#a8a4a0') : hex('#dcd8d0');
    if (lx % paso === Math.floor(paso / 2) && u > 0.06 && u < 0.94 && (y % 3) !== 0) c = u > 0.85 ? hex('#3a4256') : EC.vidrio;
    if (y % 22 === 0) c = hex('#6a6e7a'); if (o.luces && lx % paso === Math.floor(paso / 2) && hh(x, y >> 1, 712) < 0.12) c = EC.calido;
    B[y * 320 + x] = c; }
}
function e_chispas(R, t, x, y, k = 0, f = 1) {
  if (Math.sin(t * 11 + k * 3) < 0.35 * f) return;
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (hh(i, Math.floor(t * 8), 650 + k) - 0.5) * 2.4, r = 1 + hh(i, Math.floor(t * 8), 651 + k) * 4; R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), i % 2 ? EC.brasaL : C.blanco); }
}
'''

E = {}

E['ny-carrera'] = ('La carrera al cielo', '''// NY-CARRERA (frases 46–47), 1929, cartela «1929». Cuatro planos:
// 1. cielo1930 'carrera': desde una azotea, el Chrysler y el rival de Wall Street crecen a la vez; el juez de salida
//    levanta la bandera de cuadros y la baja a «race» (silbato); las dos torres se disparan con flechas que suben; la
//    vecina mira con prismáticos y a «tallest» señala; el chaval llega corriendo y salta. Corta en «Chrysler».
// 2. cielo1930 'cupula': dentro de la corona, la aguja se monta por piezas («ace up its sleeve»: el capataz enseña el
//    plano azul de la aguja); un obrero tira del polipasto; encaja una pieza a «spire» y la última a «crown»; a «secret»
//    una paloma espía en el andamio y el capataz la echa. Corta en «One (October day)».
// 3. cielo1930 'aguja' (GOLPE en «aguja»): la corona por fuera; a «hoisted» la aguja sale como un periscopio en dos
//    tirones mientras el reloj corre y aparece «90»; en la azotea del rival el obrero se queda pasmado y a «suddenly» se le
//    cae el bocadillo (gag); una paloma baja a por él. Corta en «tallest».
// 4. fondo local 'hudson1929': el perfil de Manhattan al atardecer desde la orilla de Nueva Jersey: el Chrysler con su
//    aguja, el más alto («1046»), y el rival con su pirámide («927», a «rival»); la raya de la medida a «beating»; en la
//    orilla, uno salta de alegría, ella señala la aguja y el chico de los periódicos llega voceando; remolcador y luna.''', PRE + LIB + r'''
const P2 = @(6.16), P3 = @(13.22), P4 = @(18.07);
const race = @(3.17), tallest = @(4.19), world = @(5.17), ace = @(7.38), spire = @(9.17), assembled = @(10.21), secret = @(10.87), crown = @(11.87);
const hoist = @(14.80), noventa = @(15.72), arriba = @(16.30), suddenly = @(17.17), earth = @(18.93), beating = @(19.68), rival = @(20.14), wall = @(20.70);

// una flecha «sube» (chevron de 9 px con contorno) que asciende y se apaga
const chevron = (x, y, col) => { for (const [dx, dy] of [[0, 0], [-1, 1], [1, 1], [-2, 2], [2, 2], [-3, 3], [3, 3], [-4, 4], [4, 4]]) { R.pset(x + dx, y + dy - 1, C.k); R.pset(x + dx, y + dy + 2, C.k); } for (const [dx, dy] of [[0, 0], [-1, 1], [1, 1], [-2, 2], [2, 2], [-3, 3], [3, 3], [-4, 4], [4, 4]]) { R.pset(x + dx, y + dy, col); R.pset(x + dx, y + dy + 1, col); } };
const sube = (x, y, t) => { for (let k = 0; k < 2; k++) { const f = (t * 1.6 + k * 0.5) % 1; if (f < 0.85) chevron(x, Math.round(y - f * 14), k ? hex('#ffe08a') : hex('#fff4c0')); } };
// el destello de cuatro puntas
const destello = (x, y, r, col = C.blanco) => { R.linea(x - r, y, x + r, y, col); R.linea(x, y - r, x, y + r, col); R.pset(x - 1, y - 1, col); R.pset(x + 1, y - 1, col); R.pset(x - 1, y + 1, col); R.pset(x + 1, y + 1, col); R.disco(x, y, 1, hex('#fff8dc')); };
const ss = (u) => u * u * (3 - 2 * u);

// ── 1 · 1929: la azotea; los dos rascacielos crecen a la vez; la salida de la carrera con la bandera de cuadros ──────
const p1 = (t) => {
  const g = 0.25 * ss(tramo(t, 0.2, race)) + 0.75 * tramo(t, race, P2 - 0.25);
  const d = T.cielo1930(R, t, { encuadre: 'carrera', alturas: [0.52 + 0.43 * g, 0.56 + 0.41 * g], aguja: 0 });
  if (t > race && t < P2 - 0.3) { sube(d.chrysler[0] - 24, d.chrysler[1] + 6, t); sube(d.rival[0] + 22, d.rival[1] + 10, t + 0.3); }
  // la vecina de los prismáticos sigue la obra; a «tallest» los baja y señala al Chrysler
  const xv = 46, mira = t < tallest;
  if (mira) { const a = R.actor(EL.neoyorquina, xv, 172, t, { dir: 1, sostiene: [xv + 15, 151] }); const [hx, hy] = a.mano; R.rect(hx - 2, hy - 5, hx + 3, hy - 2, C.k); R.rect(hx - 1, hy - 4, hx + 2, hy - 3, hex('#3a3a46')); R.pset(hx + 2, hy - 4, hex('#a8c8e8')); R.pset(hx + 2, hy - 3, hex('#a8c8e8')); }
  else { R.actor(EL.neoyorquina, xv, 172, t, { dir: 1, dedo: true, sorpresa: t < tallest + 0.5, sonrisa: t > tallest + 0.5, habla: t > world - 0.4 && Math.sin(t * 9) > 0 }); R.rect(xv + 6, 158, xv + 9, 160, C.k); R.rect(xv + 7, 158, xv + 8, 159, hex('#3a3a46')); }
  // el juez de salida: levanta la bandera de cuadros, la baja de golpe a «race», y luego anima con el dedo
  const xs = 168, alza = ss(tramo(t, 0.9, 1.5)), baja = ss(tramo(t, race - 0.06, race + 0.2));
  const tx = Math.round(lerp(lerp(xs - 4, xs - 2, alza), xs - 9, baja)), ty = Math.round(lerp(lerp(160, 147, alza), 163, baja));
  const js = R.actor(EL.neoyorquino2, xs, 172, t, { dir: -1, sostiene: t < world ? [tx, ty] : undefined, dedo: t > world, habla: t > race + 0.2 && Math.sin(t * 8) > 0.2, sonrisa: t > race + 0.2 });
  if (t < world) { const [hx, hy] = js.mano, ang = lerp(lerp(-1.2, -1.75, alza), -0.15 - Math.PI, baja), L = 12, px = Math.round(hx + Math.cos(ang) * L), py = Math.round(hy + Math.sin(ang) * L);
    R.linea(hx, hy, px, py, C.k); R.linea(hx + 1, hy, px + 1, py, hex('#8a6a40'));
    const ond = Math.sin(t * 10) * 1.2; for (let i = 0; i < 9; i++) for (let j = 0; j < 6; j++) { const yy = py + j + Math.round(Math.sin(t * 10 - i * 0.7) * (i / 9) * 1.5) + (baja > 0.5 ? 0 : 0); R.pset(px - 1 - i, yy, (Math.floor(i / 3) + Math.floor(j / 2)) % 2 ? C.blanco : C.k); }
    R.linea(px - 10, py - 1, px - 1, py - 1, C.k); R.linea(px - 10, py + 6, px - 1, py + 6, C.k); }
  // el chaval que llega corriendo al oír el silbato y salta de emoción
  const u = tramo(t, race + 0.25, race + 1.3), xk = Math.round(lerp(334, 236, u)), salta = t > race + 1.4 && t < P2 - 0.2;
  R.actor(EL.neoyorquino, xk, 172, t, { dir: -1, anda: u > 0 && u < 1, brazos: salta, sonrisa: salta, salto: salta ? Math.round(Math.abs(Math.sin((t - race) * 7)) * 4) : 0 });
};

// ── 2 · dentro de la corona: la aguja se monta por piezas en secreto; el polipasto; la paloma espía ─────────────────
const plano = (x, y, grande) => {   // el plano azul de la aguja (pictograma: la corona de arcos y la aguja)
  const w = grande ? 18 : 12, hgt = grande ? 13 : 9; R.rect(x - 1, y - 1, x + w, y + hgt, C.k); R.rect(x, y, x + w - 1, y + hgt - 1, hex('#2a5a9a')); R.rect(x, y, x + w - 1, y, hex('#4a7aba'));
  const cx = x + (w >> 1), b = y + hgt - 2; for (let k = 0; k < 3; k++) { const r = (grande ? 6 : 4) - k * (grande ? 2 : 1.4); for (let a = Math.PI; a <= 2 * Math.PI; a += 0.25) R.pset(Math.round(cx + Math.cos(a) * r), Math.round(b - k * 2 + Math.sin(a) * r * 0.8), C.blanco); }
  R.linea(cx, b - (grande ? 6 : 4), cx, y + 1, hex('#e8f0ff'));
};
const p2 = (t) => {
  const piezas = t < spire + 0.1 ? 0.45 : t < crown + 0.05 ? 0.7 : 1;
  T.cielo1930(R, t, { encuadre: 'cupula', piezas });
  // el destello de cada pieza que encaja
  for (const [t0, y] of [[spire + 0.1, 82], [crown + 0.05, 56]]) { const f = tramo(t, t0, t0 + 0.45); if (f > 0 && f < 1) { destello(160, y, Math.round(3 + f * 5)); for (let k = 0; k < 6; k++) { const a = k * 1.05 + 0.3; R.pset(Math.round(160 + Math.cos(a) * (6 + f * 12)), Math.round(y + Math.sin(a) * (3 + f * 6)), hex('#ffd060')); } } }
  // el que tira del cabo del polipasto (a tirones mientras sube cada pieza)
  const tira = (t > P2 + 0.3 && t < spire) || (t > assembled - 0.6 && t < crown), f = tira ? (Math.sin(t * 6) + 1) / 2 : 0.4, xp = 100;
  const tp = R.actor(EL.vigas2, xp, 172, t, { dir: 1, sostiene: [xp + 20, Math.round(150 + f * 8)], habla: tira && f > 0.8 });
  const [hx, hy] = tp.mano; R.linea(157, 19, hx + 1, hy - 1, hex('#5a4a30')); for (let i = 0; i < 12; i++) { const k = i / 12; R.pset(Math.round(lerp(157, hx + 1, k)), Math.round(lerp(19, hy - 1, k)), (i + Math.floor(t * 8)) % 3 ? hex('#8a7048') : hex('#5a4a30')); }
  R.linea(hx + 1, hy + 2, hx - 3, 171, hex('#8a7048')); R.pset(hx - 4, 171, hex('#5a4a30')); R.pset(hx - 5, 171, hex('#5a4a30'));
  // el capataz con el plano de la aguja: lo lee, a «ace» lo enseña, a «spire» señala arriba; la paloma: «¡fuera!»
  const xc = 206, ve = t > secret - 0.1 && t < secret + 0.2, ahuyenta = t > secret + 0.15 && t < secret + 0.9;
  if (t < spire - 0.1) { const ensena = tramo(t, ace - 0.25, ace + 0.05), c = R.actor(EL.vigas, xc, 172, t, { dir: -1, sostiene: [Math.round(lerp(xc - 5, xc - 4, ensena)), Math.round(lerp(162, 150, ensena))], habla: t < ace - 0.3 && Math.sin(t * 7) > 0.3, sonrisa: t > ace });
    plano(c.mano[0] - (ensena > 0.5 ? 19 : 13), c.mano[1] - (ensena > 0.5 ? 8 : 5), ensena > 0.5);
    if (t > ace && t < ace + 0.5) destello(c.mano[0] - 10, c.mano[1] - 10, 3, hex('#fff4c0')); }
  else { R.actor(EL.vigas, xc, 172, t, { dir: -1, dedo: !ahuyenta && t < crown + 0.6, brazos: ahuyenta, sorpresa: ve, enfado: ahuyenta, habla: (t < secret - 0.3 || ahuyenta) && Math.sin(t * 9) > 0, sonrisa: t > crown }); plano(xc + 13, 167, false); }
  // la paloma entra por una ventana triangular, se posa en el andamio, y a «secret» sale volando
  if (t > assembled - 0.5) { const e = tramo(t, assembled - 0.5, secret - 0.2), s = tramo(t, secret + 0.25, secret + 1.1);
    const x = s > 0 ? lerp(204, 330, s) : lerp(300, 204, e), y = s > 0 ? lerp(111, 70, s) - Math.sin(s * Math.PI) * 14 : lerp(46, 111, e) - Math.sin(e * Math.PI) * 10;
    if (s < 1) T.e_paloma(R, Math.round(x), Math.round(y), t, { vuela: (e > 0 && e < 1) || s > 0, picotea: e >= 1 && s === 0, dir: s > 0 ? 1 : -1 });
    if (ve) R.icono('!', xc + 5, 132, hex('#ffe060')); }
};

// ── 3 · la corona por fuera: la aguja sale como un periscopio; al obrero del rival se le cae el bocadillo (gag) ───────
const bocata = (x, y) => { R.rect(x - 5, y - 3, x + 4, y + 3, C.k); R.rect(x - 4, y - 2, x + 3, y - 1, hex('#f0c888')); R.pset(x - 3, y - 2, hex('#fff0c0')); R.rect(x - 5, y, x + 4, y, hex('#5aa84a')); R.rect(x - 4, y + 1, x + 3, y + 1, hex('#e87a8a')); R.rect(x - 4, y + 2, x + 3, y + 2, hex('#c89050')); R.pset(x - 5, y + 1, hex('#5aa84a')); };
const p3 = (t) => {
  const ag = 0.32 * ss(tramo(t, hoist - 0.15, hoist + 0.45)) + 0.68 * ss(tramo(t, hoist + 0.85, arriba));
  const d = T.cielo1930(R, t, { encuadre: 'aguja', aguja: ag });
  // el golpe del corte: un destello en la corona; al acabar, la estrella en la punta
  if (t < P3 + 0.3) destello(110, 62, Math.round(6 - (t - P3) * 16));
  { const f = tramo(t, arriba, arriba + 0.7); if (f > 0 && f < 1) { destello(d.punta[0], d.punta[1], Math.round(4 + f * 6)); R.disco(d.punta[0], d.punta[1], Math.round(2 + f * 3), (x, y) => (bay(x, y) < 0.35 ? C.blanco : R.pget(x, y))); } }
  // el reloj de los 90 minutos: las agujas corren mientras sube; a «90», el número
  const cx = 168, cy = 42, run = tramo(t, hoist - 0.1, arriba), am = -Math.PI / 2 + run * Math.PI * 3, ah = -Math.PI / 2 + run * Math.PI * 0.25;
  R.disco(cx, cy, 11, C.k); R.disco(cx, cy, 10, hex('#c8a040')); R.disco(cx, cy, 8, hex('#f4ecd4')); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.pset(Math.round(cx + Math.cos(a) * 7), Math.round(cy + Math.sin(a) * 7), k % 3 ? hex('#8a7a5a') : C.k); }
  R.linea(cx, cy, Math.round(cx + Math.cos(am) * 6), Math.round(cy + Math.sin(am) * 6), C.k); R.linea(cx, cy, Math.round(cx + Math.cos(ah) * 4), Math.round(cy + Math.sin(ah) * 4), hex('#c83a3a')); R.pset(cx, cy, C.k);
  R.rect(cx - 2, cy - 13, cx + 2, cy - 11, C.k); R.rect(cx - 1, cy - 12, cx + 1, cy - 12, hex('#e8c060'));
  if (t > noventa) { const e = tramo(t, noventa, noventa + 0.2); R.numero('90', 200, Math.round(lerp(58, 50, e)), { tam: 16, centro: true }); }
  // el obrero del rival come; al ver la aguja se queda pasmado y el bocadillo se le cae; la paloma se lo lleva
  const xo = 244, cae = tramo(t, arriba + 0.15, suddenly), pasma = t > hoist + 0.3;
  const mord = !pasma && Math.sin((t - P3) * 4.2) > 0.2;
  if (cae === 0) { const o = R.actor(EL.estibador, xo, 166, t, { dir: -1, sostiene: pasma ? [xo - 4, 152] : mord ? [xo + 1, 150] : [xo - 3, 156], habla: !pasma && !mord && Math.sin(t * 14) > 0, sorpresa: pasma }); bocata(o.mano[0] - 1, o.mano[1] - 1); }
  else { R.actor(EL.estibador, xo, 166, t, { dir: -1, sorpresa: true, manos: t < suddenly + 0.6 });
    const x = Math.round(lerp(xo - 5, xo - 14, cae)), y = Math.round(lerp(151, 164, cae * cae));
    if (cae < 1) { bocata(x, y); for (let k = 1; k < 4; k++) R.pset(x + (k % 2 ? 2 : -2), y - 4 - k * 2, hex('#f8f8ff')); } else { R.rect(x - 5, 164, x + 4, 165, C.k); R.rect(x - 4, 164, x + 3, 164, hex('#e8c080')); R.pset(x - 6, 163, hex('#5aa84a')); R.pset(x + 5, 162, hex('#5aa84a')); R.pset(x + 2, 163, hex('#e87a8a')); } }
  // su compañero bebe del termo, y a «hoist» señala la aguja con la boca abierta
  const xm = 210, se = t > hoist + 0.6; const m = R.actor(EL.vigas, xm, 166, t, { dir: -1, sostiene: se ? undefined : [xm + 1, 151], dedo: se, sorpresa: se && t < suddenly, sonrisa: t > suddenly + 0.3, habla: se && t > suddenly && Math.sin(t * 8) > 0 });
  if (!se) { const [hx, hy] = m.mano; R.rect(hx - 2, hy - 6, hx + 1, hy + 2, C.k); R.rect(hx - 1, hy - 5, hx, hy + 1, hex('#5a8a6a')); R.pset(hx - 1, hy - 5, hex('#8ac0a0')); }
  if (t > arriba && t < suddenly + 0.3) R.icono('!', xo + 5, 132, hex('#ffe060'));
  // la paloma: baja del pretil al bocadillo y picotea
  if (t > suddenly + 0.05) { const v = tramo(t, suddenly + 0.05, suddenly + 0.5), px = Math.round(lerp(286, xo - 18, v)), py = Math.round(lerp(140, 166, v) - Math.sin(v * Math.PI) * 8); T.e_paloma(R, px, py, t, { vuela: v < 1, picotea: v >= 1, dir: -1 }); }
};

// ── 4 · fondo local 'hudson1929': el perfil de Manhattan al atardecer desde la orilla de Nueva Jersey ──────────────
const ATARDECER = [hex('#2e3a78'), hex('#4e4e92'), hex('#8a6aa6'), hex('#d08aa0'), hex('#f2b896')];
const hudsonFijo = () => {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  // el perfil lejano y el medio, con las fachadas encendidas por el sol que se pone a la espalda del espectador
  e_skyline(R, 118, [hex('#a07ea8'), hex('#86689a'), hex('#c8a0c0'), hex('#b48eb4')], { alto: [16, 46], sem: 91, ancho: [8, 18] });
  // el rival de Wall Street (x 220): fuste de caliza en escalones, la pirámide de cobre verde y el mástil
  for (let y = 60; y <= 118; y++) for (let x = 200; x <= 240; x++) { const w = y < 84 ? 9 : y < 100 ? 13 : 18; if (Math.abs(x - 220) > w) continue; const lx = x - 220 + w, uu = lx / (2 * w);
    let c = uu < 0.12 ? hex('#f8e0c0') : uu > 0.8 ? hex('#a8806a') : hex('#e0bc98'); if (lx % 3 === 1 && y % 3 !== 0 && uu > 0.08 && uu < 0.9) c = hh(x, y >> 1, 913) < 0.18 ? EC.calido : hex('#5a4a6a'); pset(x, y, c); }
  for (const [y, w] of [[84, 9], [100, 13]]) { rect(220 - w - 1, y, 220 + w + 1, y, hex('#fff0d8')); }
  poligono([[210, 61], [220, 47], [231, 61]], C.k); poligono([[211, 60], [220, 48], [220, 60]], hex('#7ac0a8')); poligono([[220, 48], [230, 60], [220, 60]], hex('#3e7a6a'));
  for (let j = 51; j < 60; j += 3) linea(220 - (j - 47) * 0.7, j, 220 + (j - 47) * 0.7, j, hex('#2e5a4e'));
  rect(219, 39, 221, 47, C.k); rect(220, 39, 220, 47, EC.inoxL); pset(220, 38, C.k);
  // una torre gótica (x 172) y algunas de piedra en medio
  e_skyline(R, 118, [hex('#c88a6e'), hex('#9a6252'), hex('#f8d070'), hex('#ecb090')], { alto: [6, 30], sem: 92, ancho: [10, 22], x0: -4, x1: 196 });
  e_skyline(R, 118, [hex('#c88a6e'), hex('#9a6252'), hex('#f8d070'), hex('#ecb090')], { alto: [6, 24], sem: 93, ancho: [10, 22], x0: 244, x1: 324 });
  for (let y = 64; y <= 118; y++) for (let x = 166; x <= 180; x++) { const lx = x - 166; pset(x, y, lx === 0 ? hex('#fff0d8') : lx > 11 ? hex('#a8786a') : lx % 3 === 1 && y % 4 ? hex('#5a4a6a') : hex('#e8c0a0')); }
  poligono([[166, 64], [173, 48], [180, 64]], hex('#5a7a7a')); poligono([[173, 48], [180, 64], [173, 64]], hex('#3e5a5a')); rect(172, 42, 174, 48, hex('#5a7a7a')); pset(173, 41, C.k);
  for (const x of [166, 180]) { rect(x - 1, 58, x + 1, 64, hex('#e8c0a0')); pset(x, 57, hex('#5a7a7a')); }
  // el Chrysler (x 96): las alas en escalón, el fuste y la corona con su aguja (más alto que nadie)
  e_fusteChrysler(R, 76, 116, 98, 118, { paso: 3, luces: true }); e_fusteChrysler(R, 84, 108, 81, 118, { paso: 3, luces: true });
  e_corona(R, 96, 82, 0.42, 1, 0, { luces: true });
  // la luz del atardecer en todas las fachadas (tinte cálido)
  for (let y = 18; y < 119; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (B[i]) B[i] = mez(B[i], hex('#f8a070'), 0.16); }
  // los muelles de Manhattan: cobertizos, el trasatlántico de chimeneas rojas y las grúas
  for (let x = 0; x < 320; x++) { pset(x, 117, hex('#4a3a5a')); pset(x, 118, hex('#3a2e4a')); }
  for (const [x0, x1] of [[6, 52], [70, 120], [150, 196]]) { rect(x0, 110, x1, 118, hex('#6a4e5e')); rect(x0, 110, x1, 110, hex('#a88290')); for (let x = x0 + 3; x < x1; x += 6) rect(x, 113, x + 2, 117, hex('#3a2e4a')); poligono([[x0 - 1, 110], [(x0 + x1) / 2, 106], [x1 + 1, 110]], hex('#8a6a76')); }
  rect(232, 106, 300, 118, C.k); rect(233, 107, 299, 117, hex('#2a2a3a')); rect(233, 107, 299, 109, hex('#e8e0d0')); for (let x = 238; x < 296; x += 5) pset(x, 112, hex('#f8d070'));
  for (const x of [250, 266, 282]) { rect(x - 3, 92, x + 3, 106, C.k); rect(x - 2, 93, x + 2, 106, hex('#c83a2a')); rect(x - 2, 93, x + 2, 95, C.k); rect(x - 2, 99, x + 2, 99, hex('#2a2a3a')); }
  linea(236, 106, 244, 90, hex('#3a2e4a')); linea(296, 106, 302, 92, hex('#3a2e4a')); linea(244, 90, 302, 92, hex('#3a2e4a'));
  // la orilla de delante: la barandilla de hierro, el entablado, los norays, las cajas y la farola
  for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const q = hh(x >> 2, y, 914), tab = (y - 146) % 6 === 5, jun = (x + ((y - 146) / 6 | 0) * 37) % 52 === 0;
    B[y * 320 + x] = tab || jun ? hex('#4a3226') : q < 0.15 ? hex('#8a6448') : q > 0.9 ? hex('#5e4232') : (x + y) % 11 === 0 ? hex('#7a5840') : hex('#6e4e38'); }
  for (let x = 0; x < 320; x++) { pset(x, 146, hex('#2a1e18')); pset(x, 147, hex('#b88a5a')); }
  for (let x = 0; x < 320; x++) { pset(x, 132, C.k); pset(x, 133, hex('#5a5a6a')); pset(x, 134, C.k); pset(x, 139, hex('#3a3a46')); }
  for (let x = 4; x < 320; x += 22) { rect(x, 132, x + 2, 146, C.k); rect(x + 1, 133, x + 1, 145, hex('#6a6a7a')); disco(x + 1, 131, 1, C.k); }
  for (const x of [150, 252]) { rect(x - 4, 140, x + 4, 152, C.k); rect(x - 3, 141, x + 3, 151, hex('#3a3a46')); rect(x - 3, 141, x - 2, 151, hex('#6a6a7a')); rect(x - 5, 139, x + 5, 141, C.k); }
  disco(260, 160, 6, C.k); disco(260, 160, 5, hex('#c8a870')); disco(260, 160, 3, hex('#8a6a40')); disco(260, 160, 1, hex('#c8a870'));
  for (const [x, y, w, hgt] of [[284, 150, 22, 14], [292, 138, 14, 12], [272, 158, 14, 12]]) { rect(x, y, x + w, y + hgt, C.k); rect(x + 1, y + 1, x + w - 1, y + hgt - 1, hex('#b08a5a')); for (let i = x + 3; i < x + w; i += 4) rect(i, y + 1, i, y + hgt - 1, hex('#8a6a40')); rect(x + 1, y + 1, x + w - 1, y + 1, hex('#cca878')); linea(x + 1, y + 1, x + w - 1, y + hgt - 1, hex('#8a6a40')); }
  rect(14, 70, 16, 146, C.k); rect(15, 70, 15, 146, hex('#4a4a56')); rect(11, 144, 19, 147, C.k); rect(10, 62, 20, 70, C.k); rect(11, 63, 19, 69, hex('#f8d070')); rect(11, 63, 19, 64, hex('#fff4c0')); poligono([[9, 62], [15, 56], [21, 62]], C.k);
};
const p4 = (t) => {
  const { rect, pset, linea, disco } = R;
  e_cielo(R, t, { hor: 120, cols: ATARDECER, nubes: [hex('#a86a8a'), hex('#e8a0a8'), hex('#ffd8c0')], aves: 3, sem: 61, yN: 22, yAves: 50 });
  // la luna que sale por el este, encima del río (fuera de la zona de Atom)
  disco(250, 62, 5, hex('#fff0d8')); disco(252, 61, 4, hex('#f4dcc0')); pset(248, 61, hex('#e8d0b8'));
  capa('hudson1929', hudsonFijo);
  // las ventanas que se van encendiendo al caer la tarde
  for (let k = 0; k < 40; k++) { const x = Math.round(4 + hh(k, 1, 915) * 312), y = Math.round(80 + hh(k, 2, 915) * 30); if (t - P4 > hh(k, 3, 915) * 4 && CAPAS.hudson1929[y * 320 + x]) pset(x, y, EC.calido); }
  // el río: el reflejo del perfil, ondulado, con los brillos de la puesta
  for (let y = 119; y < 132; y++) { const fy = 118 - (y - 118) * 3; for (let x = 0; x < 320; x++) { const sx = Math.max(0, Math.min(319, x + Math.round(Math.sin(t * 2 + y * 0.9) * 1.5))), c = R.pget(sx, Math.max(0, fy));
    pset(x, y, bay(x, y) < 0.5 + (y - 119) * 0.03 ? mez(c, hex('#3a3a6a'), 0.45 + (y - 119) * 0.03) : hex('#4a4a7a')); if (hh(x, y, Math.floor(t * 3)) < 0.03) pset(x, y, hex('#ffd8b0')); } }
  for (let y = 135; y < 146; y++) for (let x = 0; x < 320; x++) { if ((x - 4) % 22 < 3 || y === 139) continue; pset(x, y, hh(x + Math.floor(t * 6), y, 916) < 0.06 ? hex('#f8c8a0') : (x + y * 2) % 13 === 0 ? hex('#5a5a8a') : hex('#3e3e6a')); }
  // el remolcador que pasa con su humo, y un ferry lejos
  { const x = Math.round(lerp(-30, 140, tramo(t, P4, P4 + 4.4))); R.recorte([0, 119, 319, 131]); rect(x - 12, 126, x + 10, 130, C.k); rect(x - 11, 127, x + 9, 129, hex('#c83a2a')); rect(x - 4, 122, x + 4, 126, C.k); rect(x - 3, 123, x + 3, 126, hex('#e8e0d0')); rect(x, 118, x + 2, 122, C.k);
    for (let k = 0; k < 4; k++) { const f = (t * 0.8 + k / 4) % 1; disco(Math.round(x + 1 - f * 14), Math.round(116 - f * 8), Math.round(1 + f * 2), mez(hex('#d8c8d0'), hex('#a890a8'), f)); }
    rect(x + 11, 129, x + 13, 129, hex('#f8d8c0')); R.recorte(null); }
  { const x = Math.round(300 - ((t * 5) % 360)); R.recorte([0, 119, 319, 131]); rect(x - 8, 121, x + 8, 124, C.k); rect(x - 7, 122, x + 7, 123, hex('#e8a040')); rect(x - 4, 119, x + 3, 121, hex('#e8e0d0')); R.recorte(null); }
  // la aguja brilla; la raya de la medida y las cifras: 1046 pies contra 927
  const tip = 28, g = (t * 0.9) % 1; if (g < 0.3) destello(96, tip + 2, 3);
  if (t > P4 + 0.35) { const e = tramo(t, P4 + 0.35, P4 + 0.6); R.numero('1046', 58, Math.round(lerp(46, 40, e)), { centro: true }); linea(72, 38, 91, 31, C.k); linea(72, 37, 91, 30, hex('#ffe08a')); }
  { const f = tramo(t, beating, rival + 0.1); if (f > 0) for (let x = 100; x < 100 + f * 146; x++) if (x % 6 < 4) { pset(x, tip, hex('#fff4c0')); pset(x, tip + 1, C.k); } }
  if (t > rival + 0.15) { const e = tramo(t, rival + 0.15, rival + 0.35); R.numero('927', 252, Math.round(lerp(50, 44, e)), { centro: true }); for (let y = tip + 2; y < 38; y += 2) pset(220, y, hex('#fff4c0')); linea(238, 40, 224, 37, C.k); linea(238, 39, 224, 36, hex('#ffe08a')); }
  // en la orilla: el del gorro salta de alegría, ella señala la aguja, el chico de los periódicos llega voceando
  const salta = t > P4 + 0.25 && t < earth + 0.5;
  R.actor(EL.neoyorquino2, 60, 172, t, { dir: 1, brazos: salta, sonrisa: true, salto: salta ? Math.round(Math.abs(Math.sin((t - P4) * 7)) * 4) : 0, habla: !salta && Math.sin(t * 7) > 0.4 });
  R.actor(EL.neoyorquina, 104, 172, t, { dir: -1, dedo: t > earth - 0.3, sorpresa: t > P4 && t < earth - 0.3, sonrisa: t > earth - 0.3, habla: t > earth && t < beating && Math.sin(t * 9) > 0 });
  const u = tramo(t, earth - 0.5, rival + 0.2), xn = Math.round(lerp(334, 196, u));
  const n = R.actor(EL.neoyorquino, xn, 174, t, { dir: -1, anda: u > 0 && u < 1, sostiene: [xn - 4, 146 + (Math.sin(t * 9) > 0 ? 0 : 2)], habla: Math.sin(t * 8) > 0 });
  { const [hx, hy] = n.mano; rect(hx - 13, hy - 10, hx - 1, hy + 4, C.k); rect(hx - 12, hy - 9, hx - 2, hy + 3, hex('#efe6cc')); rect(hx - 11, hy - 8, hx - 3, hy - 7, hex('#2a2a4a'));
    rect(hx - 11, hy - 5, hx - 7, hy + 2, hex('#8a8a96')); for (let j = hy - 4; j < hy + 2; j++) pset(hx - 9, j, C.blanco); pset(hx - 9, hy - 5, C.blanco); for (let j = hy - 5; j < hy + 3; j += 2) rect(hx - 6, j, hx - 3, j, hex('#9a9aa8')); }
  // las gaviotas sobre el agua
  for (let k = 0; k < 3; k++) { const x = Math.round((k * 97 + t * (14 + k * 4)) % 340) - 10, y = Math.round(100 + k * 6 + Math.sin(t * 2 + k) * 3), a = Math.sin(t * 9 + k) > 0; pset(x, y, C.blanco); pset(x - 1, y - (a ? 1 : 0), C.blanco); pset(x + 1, y - (a ? 1 : 0), C.blanco); pset(x - 2, y - (a ? 2 : 0), C.blanco); pset(x + 2, y - (a ? 2 : 0), C.blanco); }
};

const efectos = [[race, 'silbato'], [race + 1.5, 'palmada'], [ace, 'brillo'], [spire + 0.1, 'golpecito'], [secret + 0.2, 'whoosh'], [crown + 0.05, 'golpecito'],
  [hoist, 'maquina'], [noventa, 'tic'], [arriba, 'brillo'], [suddenly, 'chof'], [P4 + 0.3, 'publico'], [beating, 'lapiz'], [rival + 0.2, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1929', efectos, año: 1929 });
''')

E['ny-empire'] = ('Empty State', '''// NY-EMPIRE (frases 48–49), 1930–1933, cartela «1931». Cuatro planos:
// 1. cielo1930 'empire': el Empire sube piso a piso y a «last» pasa la raya de la altura del Chrysler («!»); a «1931»
//    se corona con el mástil (destello); en la viga de delante, el calentador lanza remaches al rojo y el compañero los
//    recoge con el cubo; al final señala la cima. Corta en «(the) Empire».
// 2. fondo local 'quinta1931': la entrada de la Quinta Avenida: banderas, guirnaldas, la cinta roja; a «opens» la cortan
//    con las tijeras, el público aplaude, vuela un sombrero y llueven papelitos; a «built … year» se tachan las doce
//    casillas del calendario de la obra y una más; un dirigible pasa detrás; coches por delante. Corta en «But».
// 3. cielo1930 'oficinas': la planta vacía: el único oficinista entra con su maletín y cada paso deja su eco; a «for
//    years» el calendario pasa de 31 a 33; a «offices» llama «?» y el eco se lo devuelve tres veces. Corta en «sit».
// 4. fondo local 'vestibulo': el vestíbulo de mármol con el mural del edificio (el pictograma): a «empty» sus ventanas se
//    apagan una a una hasta «Empty», el edificio se apaga y sale una telaraña; el ascensor llega («ding») y no sale nadie;
//    el ascensorista bosteza, el conserje barre y cruza una planta rodadora (gag).''', PRE + LIB + r'''
const P2 = @(5.08), P3 = @(9.82), P4 = @(13.83);
const last = @(1.90), y1931 = @(2.98), opens = @(5.42), built = @(6.55), year_ = @(7.61), middle = @(9.82), depression = @(10.36), forYears = @(11.81), offices = @(12.95);
const empty = @(13.83), nickname = @(14.83), Empty = @(15.75), building = @(16.49);
const ss = (u) => u * u * (3 - 2 * u);
const destello = (x, y, r, col = C.blanco) => { R.linea(x - r, y, x + r, y, col); R.linea(x, y - r, x, y + r, col); R.pset(x - 1, y - 1, col); R.pset(x + 1, y - 1, col); R.pset(x - 1, y + 1, col); R.pset(x + 1, y + 1, col); R.disco(x, y, 1, hex('#fff8dc')); };
// una banderita de barras y estrellas que ondea (x, y: arriba del mástil; d: hacia dónde ondea)
const bandera = (x, y, t, d = 1, w = 12, hgt = 8) => { for (let i = 0; i < w; i++) for (let j = 0; j < hgt; j++) { const yy = y + j + Math.round(Math.sin(t * 7 - i * 0.7) * (i / w) * 1.6), xx = x + d * (i + 1);
  R.pset(xx, yy, j < hgt / 2 && i < w * 0.42 ? ((i + j) % 2 ? C.blanco : hex('#2a3a8a')) : (j % 2 ? C.blanco : hex('#c8303a'))); } };

// ── 1 · 1930–1931: el Empire sube piso a piso y pasa al Chrysler; en la viga de delante, el lanzador de remaches ───────
const remache = (x, y) => { R.disco(x, y, 2, hex('#b83a1a')); R.disco(x, y, 1, hex('#ff6a2a')); R.pset(x, y, hex('#ffd060')); };
const p1 = (t) => {
  const p = 0.78 + 0.22 * ss(tramo(t, 1.1, y1931 - 0.05));
  const d = T.cielo1930(R, t, { encuadre: 'empire', pisos: p });
  // la raya de la altura del Chrysler: el Empire la pasa a «last»
  const ra = tramo(t, 1.3, 1.7) * (1 - tramo(t, y1931 + 0.4, y1931 + 0.8));
  if (ra > 0) for (let x = 80; x < 80 + ra * 170; x++) if (x % 6 < 4) { R.pset(x, 38, hex('#fff4c0')); R.pset(x, 39, C.k); }
  if (t > last + 0.35 && t < last + 0.95) R.icono('!', 244, 30, hex('#ffe060'));
  if (t > y1931 && t < y1931 + 0.8) destello(200, 6, Math.round(3 + tramo(t, y1931, y1931 + 0.8) * 5));
  // la fragua de carbón en la viga, con su resplandor
  { const { rect, disco } = R; rect(38, 140, 50, 149, C.k); rect(39, 141, 49, 148, hex('#3a3a46')); for (let x = 40; x < 49; x++) R.pset(x, 141, (x + Math.floor(t * 9)) % 3 ? hex('#ff6a2a') : hex('#ffd060')); rect(40, 149, 41, 149, C.k); rect(47, 149, 48, 149, C.k);
    for (let k = 0; k < 3; k++) { const f = (t * 0.9 + k / 3) % 1; disco(Math.round(44 + Math.sin(t * 3 + k) * 2), Math.round(138 - f * 12), 1, mez(hex('#c8c0c8'), hex('#8a8090'), f)); } }
  // los lanzamientos: del calentador (izquierda) al que recoge con el cubo (derecha)
  const LZ = [1.5, 3.3], vuelo = 0.62, xa = 20, xb = 120;
  let enCubo = false, tenaza = null;
  for (const t0 of LZ) { const f = (t - t0) / vuelo; if (f >= 1) enCubo = enCubo || t < t0 + vuelo + 0.35; }
  const lanza = LZ.some((t0) => t > t0 - 0.35 && t < t0 + 0.05);
  const a = R.actor(EL.vigas2, xa, 150, t, { dir: 1, sostiene: lanza ? [xa + 20, 128] : [xa + 20, 140], sonrisa: t > y1931, brazos: t > LZ[1] + 0.3 && t < P2 - 0.2 });
  if (t <= LZ[1] + 0.3) { const [hx, hy] = a.mano; R.linea(hx, hy, hx + 5, hy + (lanza ? -2 : 3), C.k); R.linea(hx, hy + 1, hx + 5, hy + (lanza ? -1 : 4), C.k); if (!LZ.some((t0) => t > t0 && t < t0 + 1.2) && t < LZ[1]) remache(hx + 6, hy + (lanza ? -2 : 4)); }
  for (const t0 of LZ) { const f = (t - t0) / vuelo; if (f > 0 && f < 1) { const x = lerp(xa + 26, xb - 2, f), y = lerp(126, 128, f) - Math.sin(f * Math.PI) * 26; for (let k = 1; k < 4; k++) R.pset(Math.round(x - k * 3), Math.round(y + Math.sin((f - k * 0.04) * Math.PI) * 0 + k * (f < 0.5 ? 1 : -1)), hex('#ff9a4a')); remache(Math.round(x), Math.round(y)); } }
  const recoge = LZ.some((t0) => t > t0 + vuelo - 0.3 && t < t0 + vuelo + 0.2);
  const b = R.actor(EL.vigas, xb, 150, t, { dir: -1, sostiene: t < LZ[1] + 0.95 ? [xb - 4, recoge ? 128 : 134] : undefined, dedo: t > LZ[1] + 0.95, sorpresa: t > last + 0.3 && t < last + 0.9, sonrisa: t > y1931 || recoge, habla: t > LZ[1] + 1.1 && Math.sin(t * 8) > 0 });
  if (t < LZ[1] + 0.95) { const [hx, hy] = b.mano; R.poligono([[hx - 5, hy - 5], [hx + 2, hy - 5], [hx + 1, hy + 2], [hx - 4, hy + 2]], C.k); R.rect(hx - 4, hy - 4, hx + 1, hy + 1, hex('#5a5e6a')); R.rect(hx - 4, hy - 4, hx + 1, hy - 4, hex('#8a8e9a')); if (enCubo && Math.floor(t * 12) % 2) R.pset(hx - 2, hy - 5, hex('#ffd060')); }
  // el obrero de la grúa de abajo saluda con la gorra (al fondo, en la viga, pequeño)
  gente(76, 150, t, 2, { anda: false, ropa: [hex('#3e5a8a'), hex('#2c4468'), hex('#3e5a8a')], som: hex('#5a4030') });
  if (t > y1931 + 0.2 && Math.floor(t * 4) % 2) { R.rect(75, 136, 79, 137, hex('#5a4030')); }
};

// ── 2 · fondo local 'quinta1931': la entrada de la Quinta Avenida el día de la inauguración ─────────────────────────
const quintaFijo = () => {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  // los vecinos: ladrillo a la izquierda con su escalera de incendios, piedra a la derecha
  e_edificio(R, -4, 92, 34, 152, { pared: [C.ladrillo, C.ladrilloS, C.ladrilloL], ventanas: [6, 9, 11, 13], escalera: 40, sem: 31 });
  e_edificio(R, 272, 324, 64, 152, { tipo: 'piedra', pared: [hex('#c8bca4'), hex('#a09478'), hex('#e0d6c0')], ventanas: [6, 8, 12, 12], sem: 32 });
  // el Empire: la torre de franjas verticales (caliza y montantes de metal) que se pierde por arriba
  const torre = (x0, x1, y0, y1) => { const xc = x0 + (x1 - x0) * 0.66; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const lado = x > xc, m = (x - x0) % 4;
    let c = m === 0 ? (lado ? hex('#a8a090') : hex('#ece4d0')) : m === 3 ? (lado ? hex('#8e8678') : hex('#ccc4b0')) : (y % 5 === 0 ? (lado ? hex('#5a6070') : hex('#b0b8c4')) : lado ? hex('#2a3044') : (hh(x >> 2, y >> 3, 921) < 0.08 ? EC.calido : EC.vidrioM));
    if (x === x0) c = hex('#f8f2e2'); if (x === x1) c = hex('#6e6658'); B[y * 320 + x] = c; } rect(x0 - 1, y1 + 1, x1 + 1, y1 + 2, hex('#f4eedc')); rect(x0 - 1, y1 + 3, x1 + 1, y1 + 3, hex('#8e8678')); };
  torre(176, 222, 0, 26); torre(156, 242, 28, 94);
  // la base de cinco plantas: caliza con ventanas, el zócalo de granito y la cornisa
  for (let y = 98; y <= 152; y++) for (let x = 100; x <= 270; x++) { const q = hh(x >> 1, y, 922), fila = Math.floor((y - 98) / 6); B[y * 320 + x] = y > 140 ? ((x + y) % 9 === 0 ? hex('#5a4e5a') : q < 0.2 ? hex('#4a3e4a') : hex('#3a3040')) : (y - 98) % 6 === 5 || (x - 100 + fila * 9) % 18 === 0 ? hex('#c4bca4') : q < 0.12 ? hex('#f4eedc') : hex('#e2dac4'); }
  rect(98, 96, 272, 97, hex('#f8f2e2')); rect(98, 98, 272, 98, hex('#9a927e'));
  for (let y = 102; y < 138; y += 12) for (let x = 106; x < 266; x += 11) if (x < 170 || x > 222) e_ventana(R, x, y, 6, 8, hh(x, y, 923), { encendidas: 0.25 });
  // el portal art déco: marco de bronce, el sol naciente del dintel, las puertas de latón y el pictograma del edificio
  rect(170, 106, 222, 152, C.k); rect(171, 107, 221, 152, hex('#b08a3a')); rect(174, 110, 218, 152, hex('#2a2430'));
  for (let k = 0; k < 13; k++) { const a = Math.PI + (k + 0.5) / 13 * Math.PI; linea(196, 128, Math.round(196 + Math.cos(a) * 20), Math.round(128 + Math.sin(a) * 16), k % 2 ? hex('#e8c060') : hex('#a87a2a')); }
  rect(174, 127, 218, 129, hex('#e8c060'));
  for (const x0 of [176, 188, 200]) { rect(x0, 130, x0 + 15, 152, C.k); rect(x0 + 1, 131, x0 + 14, 152, hex('#c8a048')); rect(x0 + 3, 133, x0 + 12, 146, hex('#3a4a5a')); rect(x0 + 3, 133, x0 + 5, 146, hex('#6a7e90')); pset(x0 + 13, 141, C.k); }
  rect(180, 100, 212, 106, C.k); rect(181, 101, 211, 105, hex('#1e1a26')); for (const [x, y0] of [[193, 101], [195, 101], [197, 101], [199, 101]]) rect(x, y0 + (x === 195 || x === 197 ? 0 : 2), x + 1, 105, hex('#e8c060'));
  // la acera de losas, el bordillo, la calle de asfalto con las vías del tranvía tapadas
  for (let y = 152; y < 164; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = (x + (y > 157 ? 10 : 0)) % 20 === 0 || y === 158 ? hex('#8e8a96') : hh(x >> 1, y, 924) < 0.1 ? hex('#cac6ce') : hex('#b4b0ba');
  rect(0, 164, 319, 165, hex('#e8e4ec')); rect(0, 166, 319, 166, hex('#6a6670'));
  for (let y = 167; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = hh(x >> 1, y, 925) < 0.08 ? hex('#5a5a66') : (x % 40 < 20 && y === 174) ? hex('#d8d0a0') : hex('#3e3e4a');
  // la farola, el buzón y la boca de riego
  rect(270, 96, 272, 160, C.k); rect(271, 96, 271, 160, hex('#5a6a5a')); rect(266, 88, 276, 96, C.k); rect(267, 89, 275, 95, hex('#f8e0a0')); poligono([[265, 88], [271, 82], [277, 88]], C.k); rect(267, 160, 275, 162, C.k);
  rect(92, 146, 102, 160, C.k); rect(93, 147, 101, 160, hex('#2a4a8a')); disco(97, 147, 4, C.k); disco(97, 147, 3, hex('#2a4a8a')); rect(94, 150, 100, 150, C.k);
  rect(296, 152, 302, 162, C.k); rect(297, 153, 301, 162, hex('#c83a2a')); rect(295, 155, 303, 157, C.k); pset(298, 153, hex('#e86a5a'));
  // el calendario de la obra: doce casillas y una más (en blanco: la escena las tacha)
  rect(130, 108, 164, 138, C.k); rect(131, 109, 163, 137, hex('#f4ecd8')); rect(131, 109, 163, 114, hex('#c8303a')); for (const x of [137, 157]) { rect(x, 106, x + 1, 111, C.k); }
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { const x = 133 + i * 7, y = 117 + j * 6; rect(x, y, x + 5, y + 4, hex('#a89a80')); rect(x + 1, y + 1, x + 4, y + 3, C.blanco); }
  rect(164, 126, 170, 132, C.k); rect(165, 127, 169, 131, C.blanco);
};
const p2 = (t) => {
  const { rect, pset, linea, disco } = R;
  e_cielo(R, t, { hor: 150, cols: EC.dia, aves: 3, sem: 71, yN: 30, yAves: 50 });
  // el dirigible que pasa por detrás (el mástil del Empire se pensó para amarrarlos)
  { const x = Math.round(lerp(-30, 120, tramo(t, P2 - 1, P3 + 1))), y = 48; disco(x, y, 6, C.k); rect(x - 14, y - 6, x + 10, y + 6, C.k); disco(x - 14, y, 6, C.k); disco(x, y, 5, hex('#c8ccd4')); rect(x - 14, y - 5, x + 10, y + 5, hex('#c8ccd4')); disco(x - 14, y, 5, hex('#c8ccd4')); rect(x - 14, y - 5, x + 8, y - 4, hex('#e8ecf0')); rect(x - 14, y + 3, x + 8, y + 5, hex('#9a9ea8'));
    for (let k = -12; k < 8; k += 5) pset(x + k, y, hex('#9a9ea8')); linea(x - 20, y - 6, x - 17, y - 1, C.k); linea(x - 20, y + 6, x - 17, y + 1, C.k); rect(x - 6, y + 6, x, y + 8, C.k); rect(x - 5, y + 6, x - 1, y + 7, hex('#5a4a3a')); }
  capa('quinta1931', quintaFijo);
  // las banderas en el retranqueo y las guirnaldas de tres colores
  for (const [x, d] of [[160, -1], [238, 1]]) { rect(x, 60, x, 96, C.k); disco(x, 59, 1, C.oro); bandera(x, 61, t, d, 14, 9); }
  for (let k = 0; k < 6; k++) { const x0 = 102 + k * 28; for (let i = 0; i <= 28; i++) { const y = Math.round(99 + Math.sin(i / 28 * Math.PI) * 4 + Math.sin(t * 2 + k) * 0.6); pset(x0 + i, y, [hex('#c8303a'), C.blanco, hex('#2a3a8a')][Math.floor(i / 10) % 3]); pset(x0 + i, y + 1, C.k); } }
  // el calendario: a «built» se tachan las doce casillas, a «year» la de más
  for (let k = 0; k < 13; k++) { if (t < built + k * 0.075) break; const [x, y] = k < 12 ? [133 + (k % 4) * 7 + 1, 117 + Math.floor(k / 4) * 6 + 1] : [165, 127]; linea(x, y, x + 3, y + 2, hex('#c8303a')); linea(x + 3, y, x, y + 2, hex('#c8303a')); }
  if (t > year_ && t < year_ + 0.6) destello(167, 129, Math.round(2 + tramo(t, year_, year_ + 0.6) * 4), hex('#fff4c0'));
  // la cinta roja con su lazo, y el que la corta con las tijeras a «opens»
  const corte = opens + 0.1, corta = t > corte, cae = tramo(t, corte, corte + 0.6);
  for (let x = 172; x <= 220; x++) { if (corta && Math.abs(x - 196) < 1 + cae * 24) continue; const y = corta ? Math.round(146 + Math.abs(x - 196) * 0 + cae * (x < 196 ? (x - 172) / 24 * 10 : (220 - x) / 24 * 10)) : 146 + Math.round(Math.sin((x - 172) / 48 * Math.PI) * 2); pset(x, y, hex('#e8303a')); pset(x, y + 1, hex('#8a1a22')); }
  for (const x of [170, 222]) { rect(x - 1, 140, x + 1, 160, C.k); rect(x, 140, x, 160, hex('#c8a048')); disco(x, 139, 2, C.k); disco(x, 139, 1, hex('#e8c060')); rect(x - 3, 159, x + 3, 160, C.k); }
  if (!corta) { disco(196, 147, 3, C.k); disco(193, 147, 2, hex('#e8303a')); disco(199, 147, 2, hex('#e8303a')); pset(196, 147, hex('#8a1a22')); pset(195, 150, hex('#e8303a')); pset(197, 150, hex('#e8303a')); }
  const xo = 150, o = R.actor(EL.comerciante, xo, 162, t, { dir: 1, sostiene: t < opens + 0.8 ? [xo + 22, 146] : undefined, brazos: t > opens + 0.8 && t < built, sonrisa: t > opens, habla: t < opens - 0.6 && Math.sin(t * 7) > 0.3 });
  if (t < opens + 0.8) { const [hx, hy] = o.mano, ab = corta ? 0 : 3 + Math.round(Math.sin(t * 6) * 1); linea(hx, hy, hx + 9, hy - ab, C.k); linea(hx, hy + 1, hx + 9, hy + 1 + ab, C.k); linea(hx + 1, hy - 1, hx + 8, hy - ab, hex('#d8dee6')); linea(hx + 1, hy + 2, hx + 8, hy + 1 + ab, hex('#b4bcc8')); disco(hx - 1, hy - 2, 1, hex('#c8303a')); disco(hx - 1, hy + 3, 1, hex('#c8303a')); }
  // el público: aplauden, lanzan el sombrero; el guardia sujeta a la gente
  const viva = t > opens + 0.1;
  R.actor(EL.funcionario, 104, 164, t, { dir: 1, dedo: t < opens - 0.4, sonrisa: viva });
  R.actor(EL.neoyorquina, 122, 166, t, { dir: 1, brazos: viva && t < opens + 1.4, sonrisa: viva, sorpresa: t > opens - 0.15 && t < opens + 0.1 });
  R.actor(EL.dama, 226, 164, t, { dir: -1, brazos: viva && Math.sin(t * 9) > -0.3 && t < built + 0.4, sonrisa: viva });
  const sal = t > opens + 0.2 && t < opens + 1.2; R.actor(EL.estibador, 246, 166, t, { dir: -1, salto: sal ? Math.round(Math.abs(Math.sin((t - opens) * 8)) * 4) : 0, brazos: sal, sonrisa: viva, habla: !sal && viva && Math.sin(t * 8) > 0.3 });
  { const f = tramo(t, opens + 0.2, opens + 1.4); if (f > 0 && f < 1) { const x = Math.round(254 + f * 14), y = Math.round(140 - Math.sin(f * Math.PI) * 40); rect(x - 3, y, x + 3, y + 1, C.k); rect(x - 2, y - 3, x + 2, y, hex('#5a3a24')); } }
  R.actor(EL.oficinista, 262, 166, t, { dir: -1, sonrisa: viva, dedo: t > built - 0.3 && t < year_ + 0.4, habla: t > built - 0.3 && t < year_ + 0.4 && Math.sin(t * 9) > 0 });
  // la lluvia de papelitos desde las ventanas
  if (viva) { const n = Math.round(50 * tramo(t, opens, opens + 0.8)); for (let k = 0; k < n; k++) { const x = Math.round((hh(k, 1, 926) * 280 + 20 + Math.sin(t * 3 + k) * 5)), y = Math.round(90 + ((hh(k, 2, 926) * 60 + (t - opens) * (18 + (k % 4) * 6)) % 76)); if (x > 270 && y < 48) continue; pset(x, y, [C.blanco, hex('#f0e8c0'), hex('#e8a0b8'), hex('#a8d8f0')][k % 4]); if (Math.sin(t * 9 + k) > 0) pset(x + 1, y, mez([C.blanco, hex('#f0e8c0'), hex('#e8a0b8'), hex('#a8d8f0')][k % 4], C.k, 0.3)); } }
  // los coches de la Quinta Avenida pasan por delante de la gente
  { const x = Math.round(lerp(-40, 360, tramo(t, P2 + 1.6, P3 + 0.2))); e_fordT(R, x, 179, t, 1, hex('#24242c')); }
  { const x = Math.round(lerp(360, -40, tramo(t, P2 - 0.6, P2 + 3.0))); e_fordT(R, x, 179, t, -1, hex('#5a2a2a')); }
};

// ── 3 · una planta vacía del Empire: entra el único oficinista y sus pasos resuenan; «¿hola?» y el eco ────────────────
const ondas = (x, y, f) => { if (f <= 0 || f >= 1) return; const rx = 3 + f * 22, ry = rx * 0.28; for (let a = 0; a < Math.PI * 2; a += 0.12) { const px = Math.round(x + Math.cos(a) * rx), py = Math.round(y + Math.sin(a) * ry); if (bay(px, py) < 1 - f) R.pset(px, py, mez(R.pget(px, py), hex('#fff6dc'), 0.7)); } };
const p3 = (t) => {
  T.cielo1930(R, t, { encuadre: 'oficinas' });
  // el calendario de la pared: 31 → 32 → 33 a «for years»
  { const { rect } = R; rect(2, 72, 19, 96, C.k); rect(3, 73, 18, 95, hex('#f4ecd8')); rect(3, 73, 18, 78, hex('#c8303a')); rect(6, 70, 7, 74, C.k); rect(14, 70, 15, 74, C.k);
    const k = Math.min(2, Math.floor(tramo(t, forYears, P4 - 0.15) * 3)), f = (tramo(t, forYears, P4 - 0.15) * 3) % 1; R.numero(String(31 + k), 11, 89, { centro: true, color: hex('#2a2a4a') });
    if (t > forYears && k < 2 && f > 0.75) { const y = Math.round(73 + (f - 0.75) * 4 * 22); rect(3, 73, 18, Math.min(95, y), hex('#e4dcc8')); } }
  // el oficinista llega con el maletín; cada paso deja su eco en el suelo
  const u = tramo(t, P3 + 0.05, forYears), x = Math.round(lerp(-18, 162, u)), anda = u > 0 && u < 1;
  for (let k = 0; k < 6; k++) { const t0 = P3 + 0.25 + k * 0.45; if (t0 > forYears) break; ondas(Math.round(lerp(-18, 162, tramo(t0, P3 + 0.05, forYears))) + 7, 169, (t - t0) / 1.2); }
  const mira = t > forYears + 0.1 && t < offices - 0.4, llama = t > offices - 0.4;
  const o = R.actor(EL.oficinista, x, 168, t, { dir: mira ? -1 : 1, anda, sostiene: anda ? true : undefined, habla: llama && t < offices + 0.4, sorpresa: false, triste: t > offices + 0.6, dedo: false });
  if (anda) { const [hx, hy] = o.mano; R.rect(hx - 3, hy - 1, hx + 4, hy + 6, C.k); R.rect(hx - 2, hy, hx + 3, hy + 5, hex('#6a3a1a')); R.rect(hx - 2, hy, hx + 3, hy, hex('#8a5a34')); R.pset(hx, hy + 2, C.oro); }
  else if (u >= 1) { R.rect(178, 160, 186, 168, C.k); R.rect(179, 161, 185, 167, hex('#6a3a1a')); R.rect(179, 161, 185, 161, hex('#8a5a34')); R.pset(182, 163, C.oro); }
  // «¿hola?»: el bocadillo y su eco, cada vez más pequeño y más lejos
  if (llama) { R.bocadillo(x + 7, 136, { icono: '?' }); for (let k = 0; k < 3; k++) { const t0 = offices + 0.15 + k * 0.35; if (t > t0 && t < t0 + 1.2) { const ex = [236, 60, 256][k], ey = [124, 120, 100][k]; if (t < t0 + 0.55) R.bocadillo(ex, ey, { icono: '?' }); else if (bay(ex, ey) < 1 - (t - t0) / 1.2) R.icono('?', ex - 2, ey - 7, mez(hex('#f8f2e0'), hex('#8a826e'), 0.4), C.k); } } }
};

// ── 4 · fondo local 'vestibulo': el vestíbulo de mármol; el pictograma del edificio se vacía; el ascensor llega vacío ────
const VENT = []; for (let j = 0; j < 9; j++) for (let i = 0; i < 4; i++) VENT.push([i, j]);
const ORDEN = VENT.map((v, k) => [hh(k, 3, 931), k]).sort((a, b) => a[0] - b[0]).map((p) => p[1]);
const vestFijo = () => {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  // las paredes de mármol con vetas, el techo de oro y la cornisa
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.07 + Math.sin(y * 0.09 + x * 0.013) * 3.2) * 0.5 + 0.5, q = hh(x >> 1, y >> 1, 932);
    const w2 = Math.sin(x * 0.11 - y * 0.05 + Math.sin(x * 0.03 + y * 0.07) * 4) * 0.5 + 0.5;
    B[y * 320 + x] = y < 14 ? (((x + y) % 8 === 0 || (x - y) % 8 === 0) ? hex('#c89a40') : hex('#7a5a2a')) : y < 17 ? (y === 16 ? hex('#4a3418') : hex('#e8c060')) : x % 40 === 0 ? hex('#a88a6a') : x % 40 === 1 ? hex('#f4e6d0') : Math.abs(v - 0.5) < 0.025 ? hex('#a8845e') : Math.abs(w2 - 0.5) < 0.015 ? hex('#c4a27c') : q < 0.05 ? hex('#f4e6d0') : (y >> 1) % 2 && bay(x, y) < 0.2 ? hex('#d6be9a') : hex('#e2ceae'); }
  rect(0, 126, 319, 131, hex('#3a2a1e')); rect(0, 126, 319, 126, hex('#c89a40'));
  // el panel del mural: mármol verde oscuro con marco de aluminio; los rayos y el edificio (el pictograma)
  rect(104, 20, 216, 120, C.k); rect(106, 22, 214, 118, hex('#c8ccd4')); rect(108, 24, 212, 116, hex('#1e3a34'));
  for (let y = 24; y <= 116; y++) for (let x = 108; x <= 212; x++) if (hh(x, y, 933) < 0.05) pset(x, y, hex('#2e5048'));
  for (let k = 0; k < 15; k++) { const a = Math.PI + (k + 0.5) / 15 * Math.PI; linea(160, 40, Math.round(160 + Math.cos(a) * 52), Math.round(40 + Math.sin(a) * 16 + (Math.abs(Math.cos(a)) * 70)), hex('#a8823a')); }
  rect(108, 112, 212, 116, hex('#a8823a'));
  rect(140, 60, 180, 112, C.k); rect(141, 61, 179, 112, hex('#d8b050')); rect(146, 48, 174, 60, C.k); rect(147, 49, 173, 60, hex('#d8b050')); rect(152, 38, 168, 48, C.k); rect(153, 39, 167, 48, hex('#e8c060')); rect(157, 30, 163, 38, C.k); rect(158, 31, 162, 38, hex('#f0d070'));
  rect(159, 18, 161, 30, C.k); rect(160, 19, 160, 30, hex('#fff0a0')); rect(141, 61, 142, 112, hex('#f8e090')); rect(177, 61, 179, 112, hex('#a8823a'));
  // los ascensores: dos puertas de bronce a cada lado con su esfera de planta
  for (const x0 of [14, 58, 234, 278]) { rect(x0, 62, x0 + 30, 126, C.k); rect(x0 + 1, 63, x0 + 29, 126, hex('#8a6a3a')); rect(x0 + 3, 66, x0 + 27, 126, hex('#6a4e2a')); linea(x0 + 15, 66, x0 + 15, 126, C.k);
    for (const [cx, cy] of [[x0 + 9, 84], [x0 + 21, 84], [x0 + 9, 108], [x0 + 21, 108]]) { poligono([[cx, cy - 6], [cx + 4, cy], [cx, cy + 6], [cx - 4, cy]], hex('#c89a40')); pset(cx, cy, hex('#fff0a0')); }
    disco(x0 + 15, 56, 6, C.k); disco(x0 + 15, 56, 5, hex('#e8d8a8')); rect(x0 + 9, 56, x0 + 21, 58, C.k); rect(x0 + 10, 56, x0 + 20, 57, hex('#8a6a3a')); }
  // el suelo de mármol pulido en damero, con el reflejo del mural
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (x - 160) / (y - 110), tx = Math.floor(u * 6 + 100), ty = Math.floor(320 / (y - 110)), c0 = (tx + ty) % 2 ? hex('#5a4234') : hex('#dccdb4');
    let c = c0; if (x > 140 && x < 180 && y < 160 && bay(x, y) < 0.35) c = mez(c, hex('#d8b050'), 0.5); if (hh(x, y, 934) < 0.03) c = mez(c, C.blanco, 0.4); B[y * 320 + x] = c; }
  // el mostrador de información, vacío: art déco con su lámpara y el timbre
  rect(124, 138, 196, 160, C.k); rect(125, 139, 195, 160, hex('#5a3a22')); rect(125, 139, 195, 141, hex('#c89a40')); for (let x = 130; x < 194; x += 8) rect(x, 144, x + 3, 158, hex('#4a2e1a')); rect(125, 159, 195, 160, hex('#3a2416'));
  rect(132, 128, 133, 138, C.k); disco(132, 127, 3, C.k); disco(132, 127, 2, hex('#2a6a4a')); disco(184, 136, 2, C.k); disco(184, 136, 1, hex('#e8c060'));
  // macetas de palmera en los rincones
  for (const x of [114, 206]) { rect(x - 5, 140, x + 5, 154, C.k); rect(x - 4, 141, x + 4, 154, hex('#a8823a')); for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * 0.55; linea(x, 140, Math.round(x + Math.cos(a) * 14), Math.round(140 + Math.sin(a) * 14), hex('#3e7a38')); linea(x + 1, 140, Math.round(x + 1 + Math.cos(a) * 13), Math.round(141 + Math.sin(a) * 13), hex('#5a9a4a')); } }
};
const p4 = (t) => {
  const { rect, pset, linea, disco } = R;
  capa('vestibulo', vestFijo);
  // las ventanas del pictograma: llenas (encendidas) y se apagan una a una hasta «Empty»
  const apag = Math.round(36 * ss(tramo(t, empty + 0.25, Empty)));
  const off = new Set(ORDEN.slice(0, apag));
  VENT.forEach(([i, j], k) => { const x = 146 + i * 8, y = 64 + j * 5; rect(x, y, x + 4, y + 3, C.k); rect(x + 1, y + 1, x + 3, y + 2, off.has(k) ? hex('#2a2a36') : (Math.sin(t * 3 + k) > 0.9 ? hex('#fff8d0') : hex('#f8d070'))); });
  if (t > Empty) { const f = tramo(t, Empty, Empty + 0.5); for (let y = 30; y < 113; y++) for (let x = 140; x < 181; x++) { const c = R.pget(x, y); if (c === hex('#d8b050') || c === hex('#e8c060') || c === hex('#f0d070')) { if (bay(x, y) < f) pset(x, y, hex('#8a8a7a')); } } }
  // la telaraña que aparece en la esquina del mural, con su araña que baja
  if (t > Empty + 0.2) { const f = tramo(t, Empty + 0.2, Empty + 0.9); for (let k = 0; k < 5; k++) { const a = k / 4 * Math.PI / 2; linea(108, 24, Math.round(108 + Math.cos(a) * 18 * f), Math.round(24 + Math.sin(a) * 18 * f), hex('#e8e8e8')); } for (const r of [6, 11, 16]) if (r < 18 * f) for (let a = 0; a <= Math.PI / 2; a += 0.2) pset(Math.round(108 + Math.cos(a) * r), Math.round(24 + Math.sin(a) * r), hex('#d8d8d8'));
    const sy = Math.round(28 + tramo(t, Empty + 0.6, building + 0.6) * 18 + Math.sin(t * 3) * 1); linea(120, 28, 120, sy, hex('#e8e8e8')); disco(120, sy + 1, 1, C.k); pset(119, sy + 2, C.k); pset(121, sy + 2, C.k); }
  // el ascensor de la izquierda llega («ding»), la puerta se abre y no sale nadie; se vuelve a cerrar
  const ab = ss(tramo(t, nickname - 0.6, nickname - 0.1)) * (1 - ss(tramo(t, nickname + 0.9, nickname + 1.4)));
  { const x0 = 58, w = Math.round(ab * 12); disco(x0 + 15, 56, 4, (x, y) => R.pget(x, y)); const ag = -Math.PI + (ab > 0 ? 0 : 0.6); linea(x0 + 15, 57, Math.round(x0 + 15 + Math.cos(ag + 0.2) * 4), Math.round(57 + Math.sin(ag + 0.2) * 4), C.k);
    if (w > 0) { rect(x0 + 15 - w, 66, x0 + 15 + w, 126, hex('#2a1e18')); rect(x0 + 15 - w, 66, x0 + 15 + w, 70, hex('#f8e0a0')); for (let y = 72; y < 126; y++) if (bay(x0 + 15, y) < 0.3) pset(x0 + 15, y, hex('#4a3a2a')); }
    if (t > nickname - 0.15 && t < nickname + 0.3) { disco(x0 + 15, 50, 2, hex('#fff0a0')); } }
  // el ascensorista bosteza, mira el ascensor vacío y se aburre
  const bost = t > Empty + 0.3 && t < building + 0.4;
  R.actor(EL.oficinista2, 84, 162, t, { dir: -1, sorpresa: bost, triste: !bost && t > nickname + 0.4, dedo: t > nickname - 0.1 && t < nickname + 0.6 });
  // el conserje barre el mármol, despacio
  { const xb = 238, f = Math.sin(t * 3.2), b = R.actor(EL.vigas2, xb, 172, t, { dir: -1, sostiene: [xb - 4 + Math.round(f * 2), 160] }); const [hx, hy] = b.mano, px = hx - 8 + Math.round(f * 4);
    linea(hx + 2, hy - 8, px, 171, hex('#8a6a40')); linea(hx + 3, hy - 8, px + 1, 171, hex('#5a4428')); rect(px - 5, 170, px + 3, 173, C.k); rect(px - 4, 171, px + 2, 172, hex('#d8b878')); for (let k = 0; k < 3; k++) { const dx = Math.round((t * 20 + k * 7) % 14); pset(px - 6 - dx, 172 - (k % 2), hex('#c8bca8')); } }
  // la planta rodadora (gag) cruza el vestíbulo vacío dando botes
  { const f = tramo(t, Empty + 0.15, E.duracion - 0.2); if (f > 0 && f < 1) { const x = Math.round(lerp(334, -20, f)), y = Math.round(170 - Math.abs(Math.sin(f * 14)) * 7), a = -t * 8;
    disco(x, y, 6, C.k); for (let k = 0; k < 14; k++) { const b = a + k * 0.9, r = 2 + (k % 4); pset(Math.round(x + Math.cos(b) * r), Math.round(y + Math.sin(b) * r), k % 2 ? hex('#c8a060') : hex('#8a6a3a')); linea(x, y, Math.round(x + Math.cos(b) * 5), Math.round(y + Math.sin(b) * 5), hex('#a8823a')); }
    for (let k = 1; k < 4; k++) pset(x + k * 4, 176 - (k % 2), mez(hex('#c8bca8'), hex('#e8dcc8'), k / 4)); } }
};

const efectos = [[1.5, 'whoosh'], [2.12, 'golpecito'], [y1931, 'brillo'], [3.92, 'golpecito'], [P2 + 0.2, 'claxon'], [opens + 0.1, 'publico'], [built + 0.1, 'lapiz'], [year_, 'pop'],
  [P3 + 0.25, 'toc'], [P3 + 1.15, 'toc'], [offices - 0.3, 'aviso'], [nickname - 0.15, 'timbre'], [Empty, 'interruptor'], [Empty + 0.4, 'viento']];
const año = (t) => (t < y1931 ? 1930 : t < forYears ? 1931 : t < P4 ? 1931 + Math.min(2, Math.floor(tramo(t, forYears, P4 - 0.15) * 3)) : 1933);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1931', efectos, año });
''')

E = {k: (v[0], v[1], _conv(k, v[2])) for k, v in E.items()}
