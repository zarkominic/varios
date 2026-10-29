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


E = {}

E['ny-hoy'] = ('Hoy', '''// prueba''', PRE + r'''
const p1 = (t) => T.hoy(R, t, { encuadre: 'onu' });
const p2 = (t) => T.hoy(R, t, { encuadre: 'capas' });
T.rodar(E, R, [[0, p1], [10, p2]], { cartela: '1950', año: 1950 });
''')
E['ny-verrazzano'] = ('Verrazzano', '''// prueba''', PRE + r'''
const p1 = (t) => T.hoy(R, t, { encuadre: 'puente', fantasma: 1 });
const p2 = (t) => T.hoy(R, t, { encuadre: 'puente', luz: 'tarde' });
T.rodar(E, R, [[0, p1], [9, p2]], { cartela: '1964', año: 1964 });
''')
E['ny-cierre'] = ('Cierre', '''// prueba''', PRE + r'''
const p1 = (t) => T.bahia1524(R, t, { encuadre: 'estrecho', luz: 'anochecer' });
const p2 = (t) => T.hoy(R, t, { encuadre: 'muelle', luz: 'anochecer', encender: tramo(t, 7, 12) });
T.rodar(E, R, [[0, p1], [7, p2]], { año: 2026 });
''')

E = {k: (v[0], v[1], _conv(k, v[2])) for k, v in E.items()}
