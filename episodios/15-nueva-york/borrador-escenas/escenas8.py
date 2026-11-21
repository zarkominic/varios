import re

# Borrador de las escenas del grupo S8 del ep15: ny-otis y ny-tartas (con el movimiento hecho).
# Los instantes se escriben como @(s) (segundos de escena, sacados de linea.json) y se convierten aquí en en('marca', f).

MARCAS = {
    'ny-otis': [('arriba', 1.5, 8.536), ('otis', 10.931, 21.223), ('flatiron', 22.449, 31.469)],
    'ny-tartas': [('sombra', 1.5, 13.245), ('tartas', 14.045, 17.649)],
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


# ── piezas locales comunes a las dos escenas (copias de las de ny-comun.js, que no se exportan) ─────────────────────
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

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['ny-otis'] = ('Hacia arriba', '''// NY-OTIS (frases 41–43), 1854 → 1902, cartela «1854». Seis planos, todos con acción y vida de fondo:
// 1. (fondo local) Broadway en 1850, abarrotado: fachadas bajas de ladrillo y piedra con toldos y rótulos sin letras, la
//    torre de Trinity, los postes del telégrafo, mástiles de los dos ríos asomando a los lados (la isla estrecha);
//    ómnibus y carros atascados, gente por las aceras; delante, el comerciante choca con la dama («narrow island»), se
//    enfada, mira atrás (el carretillero tampoco pasa) y a «Up» señala arriba: una flecha amarilla sube desde la acera;
// 2. (fondo local) la feria de 1853–54: el Palacio de Cristal por fuera (cúpula de costillas, alas de cristal, torrecillas
//    con banderas) y la torre de madera del observatorio; el público entra; Otis llega y dirige a dos mozos que empujan
//    la caja de su invento hasta la puerta («shown off in New York»); a «1854» saluda con el sombrero;
// 3. alturas 'palacio': Otis salta a la plataforma, saluda al público y sube («rides an elevator platform») mientras el
//    mozo da vueltas al torno; el público señala; una paloma picotea migas delante;
// 4. alturas 'palacio' arriba: la cuerda se parte con un chasquido («the rope is cut»), la plataforma cae un palmo y los
//    trinquetes la frenan con chispas («doesn't fall»); el público se tapa los ojos y luego aplaude y salta; Otis levanta
//    los brazos («catches it»); la paloma sigue comiendo como si nada (gag);
// 5. alturas 'obra': el esqueleto de acero crece planta a planta («steel skeletons», «stretch»); el capataz señala
//    arriba con el plano bajo el brazo, un obrero cruza con una viga al hombro y un señor se para a mirar, boquiabierto;
// 6. alturas 'flatiron' (1902): la plancha antigua de hierro en el escaparate de la ferretería; un muchacho la mira,
//    se gira al Flatiron y lo señala («old clothes iron»): las dos siluetas brillan una tras otra; una señora persigue el
//    sombrero que se lleva el viento de la esquina.''', PRE + r'''
const P2 = @(6.1), P3 = @(11.9), P4 = @(16.39), P5 = @(22.45), P6 = @(26.81);
const angosta = @(2.62), sube = @(5.7), corta = @(16.89), noCae = @(18.31), freno = @(19.9), acero = @(23.75), estira = @(25.9), plancha = @(30.3);

// ── 1 · Broadway en 1850 (fondo local) ─────────────────────────────────────────────────────────────────────────
const broadwayFijo = () => {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  // los mástiles de los dos ríos asoman por los lados: la isla es estrecha
  for (const [mx, top, k] of [[6, 24, 0], [20, 34, 1], [34, 28, 2], [290, 50, 3], [304, 47, 4], [314, 54, 5]]) {
    rect(mx, top, mx + 1, 70, hex('#5a4630')); pset(mx, top, C.k);
    for (const [dy, w] of [[5, 7], [13, 9], [22, 10]]) if (top + dy < 66) { rect(mx - w, top + dy, mx + w + 1, top + dy, hex('#4a3a2a')); for (let i = -w + 1; i < w; i += 3) pset(mx + i, top + dy + 1, hex('#e8e0c8')); }
    linea(mx + 1, top + 1, mx + 16, 68, hex('#6a5a48')); linea(mx, top + 1, mx - 14, 68, hex('#6a5a48'));
    if (k % 2 === 0) { rect(mx + 2, top, mx + 7, top + 2, X.rojo); }
  }
  // la torre de Trinity, la más alta de la ciudad, al fondo
  { const cx = 108; rect(cx - 7, 46, cx + 7, 70, hex('#6a4e46')); rect(cx - 7, 46, cx - 6, 70, hex('#8a6a5e')); rect(cx + 6, 46, cx + 7, 70, hex('#4a342e'));
    for (const yy of [50, 60]) { rect(cx - 2, yy, cx + 2, yy + 6, hex('#2a1e1c')); pset(cx, yy - 1, hex('#2a1e1c')); }
    rect(cx - 8, 44, cx + 8, 46, hex('#8a6a5e')); for (const dx of [-8, -3, 3, 8]) { rect(cx + dx - 1, 40, cx + dx, 44, hex('#6a4e46')); pset(cx + dx, 39, hex('#4a342e')); }
    poligono([[cx - 6, 44], [cx, 17], [cx + 6, 44]], hex('#6a4e46')); poligono([[cx, 17], [cx + 6, 44], [cx + 2, 44]], hex('#4a342e')); linea(cx, 17, cx - 6, 44, hex('#8a6a5e'));
    rect(cx, 15, cx, 17, C.k); pset(cx - 1, 15, C.k); pset(cx + 1, 15, C.k); disco(cx, 52, 2, hex('#e8dcb0')); pset(cx, 51, C.k); pset(cx + 1, 52, C.k); }
  // las fachadas de Broadway (de 3 a 6 plantas), cada una con su rótulo, su toldo y su escaparate
  const casas = [[-2, 44, 62, 'l', 31], [44, 94, 52, 'p', 32], [94, 128, 70, 'b', 33], [128, 196, 40, 'p', 34], [196, 238, 58, 'l', 35], [238, 282, 50, 'p', 36], [282, 322, 68, 'b', 37]];
  for (const [x0, x1, y0, tp, sem] of casas) edificio(x0, x1, y0, 124, { tipo: tp === 'p' ? 'piedra' : 'ladrillo', pared: tp === 'p' ? [X.caliza, X.calizaS, X.calizaL] : tp === 'b' ? [X.brown, X.brownS, X.brownL] : undefined, ventanas: [5, 8, 10, 12], ox: 5, oy: 7, bajo: 28, sem, chimeneas: tp === 'p' ? [] : [x0 + 8, x1 - 14] });
  // los bajos: rótulo de barras (sin letras), toldo de rayas con flecos y el escaparate con géneros
  const toldos = [X.rojo, X.verde, hex('#c8903a'), X.azul, X.rojo, hex('#5a3a7a'), X.verde];
  casas.forEach(([x0, x1], k) => { const a = Math.max(0, x0 + 2), b = Math.min(319, x1 - 2), c = toldos[k];
    rect(a, 94, b, 100, C.k); rect(a + 1, 95, b - 1, 99, k % 2 ? hex('#2a2a3a') : hex('#e8dcb0')); for (let x = a + 4; x < b - 6; x += 9) rect(x, 97, x + 5 + (k + x) % 3, 97, k % 2 ? X.oro : hex('#3a2a2a'));
    for (let x = a; x <= b; x++) { rect(x, 103, x, 108, (x >> 2) % 2 ? c : C.blanco); pset(x, 109, (x >> 1) % 2 ? C.k : mez(c, C.k, 0.4)); } rect(a, 102, b, 102, C.k);
    rect(a + 1, 110, b - 1, 124, C.k); rect(a + 2, 111, b - 2, 124, X.vidrioM);
    for (let x = a + 4; x < b - 6; x += 6) { const q = hh(x, k, 640); rect(x, 119 - Math.floor(q * 4), x + 3, 122, [hex('#e8b830'), C.blanco, hex('#c8603a'), hex('#6a8ac8'), hex('#8a5a3a')][Math.floor(q * 5)]); }
    linea(a + 3, 111, a + 9, 123, X.vidrioL); rect(a + 1, 123, b - 1, 124, X.tablaD);
    const px = a + ((b - a) >> 1) - 3; rect(px, 112, px + 6, 124, hex('#3a2418')); rect(px + 1, 113, px + 5, 124, hex('#5a3a24')); pset(px + 4, 118, X.oro); });
  // la acera de enfrente, la calzada de adoquines con rodadas y la acera de delante de losas
  for (let y = 124; y < 131; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = x % 16 === 0 || y === 127 ? X.aceraS : hh(x >> 1, y, 650) < 0.1 ? X.aceraL : X.acera;
  rect(0, 131, 319, 131, hex('#d0ccd4')); rect(0, 132, 319, 132, hex('#5a5662'));
  for (let y = 133; y < 158; y++) for (let x = 0; x < 320; x++) { const fila = (y - 133) >> 1, jx = (x + fila * 3) % 6 === 0, q = hh(x >> 1, fila, 651); let c = (y - 133) % 2 === 1 || jx ? X.adoquinS : q < 0.16 ? X.adoquinL : q > 0.9 ? X.adoquinS : X.adoquin; if ((y === 143 || y === 152) && hh(x >> 3, y, 652) < 0.7) c = mez(c, C.k, 0.25); B[y * 320 + x] = c; }
  for (const [x0, y0] of [[60, 140], [212, 148], [150, 136]]) { for (let i = 0; i < 8; i++) for (let j = 0; j < 2; j++) pset(x0 + i, y0 + j, hex('#5a6a7a')); pset(x0 + 2, y0, hex('#9ab0c8')); }   // charcos
  for (const [x0, y0] of [[96, 146], [250, 140], [30, 150]]) { disco(x0, y0, 1, hex('#5a4a2a')); pset(x0 + 2, y0 + 1, hex('#5a4a2a')); }   // boñigas
  rect(0, 158, 319, 159, hex('#d0ccd4')); rect(0, 160, 319, 160, hex('#5a5662'));
  for (let y = 161; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = x % 24 === 0 || (y - 161) % 9 === 0 ? X.aceraS : hh(x >> 1, y >> 1, 653) < 0.08 ? X.aceraL : hh(x, y, 654) > 0.96 ? X.aceraS : X.acera;
  // los postes del telégrafo con sus travesaños y los hilos que cuelgan de calle a calle
  for (const px of [72, 248]) { rect(px, 54, px + 1, 130, hex('#4a3a2a')); rect(px, 54, px, 130, hex('#6a5a44')); for (const yy of [56, 61]) { rect(px - 9, yy, px + 10, yy + 1, hex('#4a3a2a')); for (let i = -8; i <= 9; i += 4) pset(px + i, yy - 1, hex('#8ab0a8')); } }
  for (const yy of [56, 61]) for (let i = -8; i <= 9; i += 4) { for (let x = 0; x < 320; x++) { const a = x < 72 ? x / 72 : x < 248 ? (x - 72) / 176 : (x - 248) / 72, s = x < 72 || x > 248 ? 3 : 7; pset(x, Math.round(yy - 1 + (i + 8) / 16 + Math.sin(a * Math.PI) * s), hex('#3a3440')); } }
  // farolas de gas, una boca de riego y un poste para atar caballos en la acera de delante
  for (const lx of [10, 300]) { rect(lx, 136, lx + 1, 170, C.k); rect(lx - 3, 128, lx + 4, 136, C.k); rect(lx - 2, 129, lx + 3, 135, hex('#e8e0b0')); rect(lx - 3, 127, lx + 4, 127, C.k); pset(lx, 126, C.k); rect(lx - 2, 170, lx + 3, 171, C.k); }
};
const flecha = (cx, base, top, a) => {   // la flecha amarilla que sube desde la calle
  if (a <= 0) return; const { rect, poligono, pset } = R, yt = Math.round(base - (base - top) * a), oro = hex('#f8c838'), oroS = hex('#c88a18'), oroL = hex('#fff0a0');
  rect(cx - 6, yt + 14, cx + 6, base, C.k); rect(cx - 5, yt + 14, cx + 5, base, oro); rect(cx - 5, yt + 14, cx - 3, base, oroL); rect(cx + 3, yt + 14, cx + 5, base, oroS);
  poligono([[cx - 15, yt + 16], [cx, yt - 1], [cx + 16, yt + 16]], C.k); poligono([[cx - 12, yt + 15], [cx, yt + 2], [cx + 13, yt + 15]], oro); poligono([[cx, yt + 2], [cx + 13, yt + 15], [cx + 5, yt + 15]], oroS); for (let j = 0; j < 9; j++) pset(cx - 2 - j, yt + 5 + j, oroL);
  for (let k = 0; k < 6; k++) { const y = Math.round(base - (k * 17) % Math.max(1, base - yt - 14)); pset(cx - 9, y, C.blanco); pset(cx + 9, y + 6, C.blanco); }
};
const omnibus = (x, suelo, t, dir, col = hex('#e8c050'), franja = X.rojo) => {   // el ómnibus de Broadway: caja larga, ventanillas, viajeros en el techo y dos caballos
  const { rect, pset } = R; x = Math.round(x); const y = suelo, x0 = x - 22, x1 = x + 22;
  rect(x0 + 2, y, x1 - 2, y + 1, mez(X.adoquinS, C.k, 0.5));
  rect(x0, y - 22, x1, y - 6, C.k); rect(x0 + 1, y - 21, x1 - 1, y - 7, col); rect(x0 + 1, y - 10, x1 - 1, y - 8, franja); rect(x0 + 1, y - 21, x1 - 1, y - 21, mez(col, C.blanco, 0.4));
  for (let wx = x0 + 3, k = 0; wx < x1 - 4; wx += 6, k++) { rect(wx, y - 19, wx + 3, y - 13, X.vidrio); pset(wx, y - 19, X.vidrioL); if (hh(k, x0 >> 5, 660) < 0.7) { pset(wx + 1, y - 15, PIEL[k % 4]); pset(wx + 2, y - 15, PIEL[k % 4]); rect(wx + 1, y - 17, wx + 2, y - 16, SOMB[k % 4]); } }
  rect(x0 - 1, y - 24, x1 + 1, y - 23, C.k); for (let i = x0 + 2; i < x1 - 2; i += 8) { gente(i, y - 24, t, (i >> 3) + 3, { anda: false }); }
  const fx = dir > 0 ? x1 : x0; rect(Math.min(fx, fx + dir * 4), y - 26, Math.max(fx, fx + dir * 4), y - 24, C.k); gente(fx + dir * 2 - 2, y - 26, t, 5, { anda: false, som: hex('#1c1c24') });
  rueda(x0 + 8, y - 4, 4, t, dir); rueda(x1 - 8, y - 4, 4, t, dir);
  R.linea(fx + dir * 2, y - 12, fx + dir * 10, y - 12, C.k); caballo(fx + dir * 22, y, t, dir, hex('#8a5a32')); caballo(fx + dir * 18, y + 2, t + 0.3, dir, hex('#3a2a22'), hex('#1e1612'));
};
const carro = (x, suelo, t, dir, carga = 0) => {   // un carro de mercancías con barriles o fardos y su mula
  const { rect, pset } = R; x = Math.round(x); const y = suelo, Xd = (i) => x + i * dir, rr = (a, b, y0, y1, c) => rect(Math.min(Xd(a), Xd(b)), y0, Math.max(Xd(a), Xd(b)), y1, c);
  rect(Math.min(Xd(-22), Xd(14)), y, Math.max(Xd(-22), Xd(14)), y + 1, mez(X.adoquinS, C.k, 0.5));
  rr(-22, -2, y - 9, y - 6, C.k); rr(-21, -3, y - 8, y - 7, X.tablaS);
  if (carga === 0) for (let k = 0; k < 3; k++) { const bx = Xd(-19 + k * 6); rect(Math.min(bx, bx + 4 * dir), y - 16, Math.max(bx, bx + 4 * dir), y - 9, C.k); rect(Math.min(bx, bx + 4 * dir), y - 15, Math.max(bx, bx + 4 * dir), y - 10, X.tabla); rect(Math.min(bx, bx + 4 * dir), y - 13, Math.max(bx, bx + 4 * dir), y - 13, X.tablaD); }
  else { rr(-21, -4, y - 17, y - 9, C.k); rr(-20, -5, y - 16, y - 10, hex('#e8dcc0')); for (let i = -18; i < -5; i += 4) rr(i, i, y - 16, y - 10, hex('#b8a888')); }
  rr(-2, -1, y - 15, y - 9, C.k); gente(Xd(-2) - 2, y - 9, t, 1, { anda: false });
  rueda(Xd(-12), y - 4, 4, t, dir, X.tablaS); R.linea(Xd(-2), y - 7, Xd(4), y - 8, C.k); caballo(Xd(16), y, t, dir, hex('#6a5a4a'), hex('#3e3428'));
};
const p1 = (t) => {
  const { rect, pset, disco } = R;
  cielo(t, { hor: 72, sem: 3, yN: 16, aves: 3, yAves: 24 });
  capa('broadway', broadwayFijo);
  // el humo de las chimeneas y la bandera del hotel de piedra, que ondea
  for (const [cx, cy] of [[6, 49], [176 - 150 + 190, 45], [290, 55], [102, 57]]) for (let k = 0; k < 3; k++) { const u = (t * 0.45 + k / 3) % 1; disco(Math.round(cx + 2 + u * 10 + Math.sin(t + k) * 2), Math.round(cy - u * 16), Math.round(1 + u * 3), mez(hex('#c8c8d0'), X.dia[2], u * 0.7)); }
  rect(162, 22, 162, 35, C.k); for (let i = 0; i < 14; i++) for (let j = 0; j < 8; j++) pset(163 + i, 23 + j + Math.round(Math.sin(t * 5 - i * 0.5) * (i / 14) * 1.5), j < 4 && i < 6 ? ((i + j) % 2 ? C.blanco : X.azul) : j % 2 ? C.blanco : X.rojo);
  // la gente de la acera de enfrente: mucha, en los dos sentidos
  for (let k = 0; k < 22; k++) { const v = 4 + (k % 5), u = ((t * v + k * 37) % 360) - 20, x = k % 2 ? u : 340 - u; gente(x, 130, t, k + 1); }
  // la calzada atascada: arranca y se para (dos carriles), y alguien cruza entre los coches
  const go = (t2) => t2 * 5 + Math.sin(t2 * 1.3) * 4;
  omnibus(70 + go(t), 146, t, 1); carro(214 + go(t) * 0.8, 146, t, 1, 1); omnibus(330 - go(t + 2), 155, t, -1, hex('#c84a3a'), X.oro); carro(120 - go(t) * 0.9, 155, t, -1, 0);
  gente(176 + Math.sin(t * 0.7) * 6, 151, t, 4); gente(262 - t * 3, 152, t, 8);
  // las palomas del bordillo
  T.e_paloma(R, 132, 160, t, { picotea: true, dir: 1 }); T.e_paloma(R, 140 + Math.round(Math.sin(t * 0.6) * 3), 161, t + 1.5, { picotea: true, dir: -1 });
  // la flecha que sube a «Up»
  flecha(222, 156, 30, tramo(t, sube - 0.55, sube));
  barriles();
  // delante: el carretillero que no pasa, el emigrante con su saco, el chico de los periódicos, el comerciante y la dama
  const u1 = tramo(t, 1.35, 3.6), bx = Math.round(lerp(-30, 34, u1));
  { const a = R.actor(EL.estibador, bx, 175, t, { dir: 1, anda: u1 > 0 && u1 < 1, sostiene: [bx + 20, 162], triste: t > 3.7 });
    const [hx, hy] = a.mano; R.linea(hx - 2, hy + 1, hx + 6, hy + 5, C.k); rect(bx + 22, 160, bx + 40, 168, C.k); rect(bx + 23, 161, bx + 39, 167, X.tablaS); rect(bx + 23, 161, bx + 39, 161, X.tablaL); rect(bx + 26, 155, bx + 34, 161, C.k); rect(bx + 27, 156, bx + 33, 160, hex('#d8c8a0')); rueda(bx + 36, 170, 4, t, u1 > 0 && u1 < 1 ? 1 : 0, X.tablaS); }
  R.actor(EL.emigrante, 86, 176, t, { dir: 1, habla: t > 1.6 && t < 2.6 && Math.sin(t * 9) > 0, triste: t > angosta && t < sube });
  rect(84, 150, 92, 160, C.k); rect(85, 151, 91, 159, hex('#a8906a')); pset(87, 153, hex('#8a7450'));
  { const a = R.actor(EL.hermanoMoore, 118, 175, t, { dir: -1, sostiene: true, habla: Math.sin(t * 8) > 0.2 }); const [hx, hy] = a.mano; rect(hx - 6, hy - 6, hx + 1, hy + 2, C.k); rect(hx - 5, hy - 5, hx, hy + 1, X.papel); rect(hx - 4, hy - 3, hx - 1, hy - 3, X.tinta); rect(hx - 4, hy - 1, hx - 2, hy - 1, X.tinta); }
  const u2 = tramo(t, 1.3, angosta), cx2 = Math.round(lerp(136, 176, u2)), mira = t > angosta + 0.9 && t < @(4.3);
  R.actor(EL.comerciante, cx2, 176, t, { dir: mira ? -1 : 1, anda: u2 > 0 && u2 < 1, enfado: t > angosta && t < @(4.3), sonrisa: t > sube, dedo: t > sube - 0.15, sorpresa: t > @(4.3) && t < sube - 0.15 });
  const u3 = tramo(t, 1.3, angosta), dx3 = Math.round(lerp(300, 196, u3)) + (t > angosta && t < angosta + 0.25 ? 2 : 0);
  R.actor(EL.dama, dx3, 176, t, { dir: -1, anda: u3 > 0 && u3 < 1, enfado: t > angosta && t < @(4.6), sorpresa: t > sube });
  if (t > angosta && t < angosta + 0.5) { R.icono('!', 188, 140, hex('#fff0a0')); }
  // a la derecha, más gente que espera para cruzar
  R.actor(EL.emigranta, 262, 176, t, { dir: -1, habla: Math.sin(t * 6) > 0.5 }); R.actor(EL.estibador2, 286, 177, t, { dir: -1, sostiene: true, sorpresa: t > sube });
  // un perro que cruza olisqueando por delante de todos
  perro(Math.round(330 - t * 34), 179, t, -1);
};
const barriles = () => { const { rect, pset } = R; for (const [x, y] of [[48, 172], [58, 174], [304, 173]]) { rect(x, y - 12, x + 8, y, C.k); rect(x + 1, y - 11, x + 7, y - 1, X.tabla); rect(x + 1, y - 11, x + 2, y - 1, X.tablaL); rect(x + 6, y - 11, x + 7, y - 1, X.tablaS); rect(x, y - 9, x + 8, y - 9, C.k); rect(x, y - 3, x + 8, y - 3, C.k); } };
const perro = (x, y, t, dir) => {   // un perro pequeño que trota (cola que se mueve, patas alternas)
  const { rect, pset } = R, Xd = (i) => x + i * dir, s = Math.floor(t * 9) % 2, c = hex('#c8904a'), cS = hex('#8a5a2a');
  rect(Math.min(Xd(-4), Xd(4)), y - 7, Math.max(Xd(-4), Xd(4)), y - 3, C.k); rect(Math.min(Xd(-3), Xd(3)), y - 6, Math.max(Xd(-3), Xd(3)), y - 4, c);
  rect(Math.min(Xd(3), Xd(7)), y - 10, Math.max(Xd(3), Xd(7)), y - 6, C.k); rect(Math.min(Xd(4), Xd(6)), y - 9, Math.max(Xd(4), Xd(6)), y - 7, c); pset(Xd(6), y - 8, C.k); pset(Xd(4), y - 10, cS); pset(Xd(8), y - 7, C.k);
  pset(Xd(-5), y - 7 - s, cS); pset(Xd(-6), y - 8 - s, cS);
  for (const [lx, f] of [[-3, 0], [-1, 1], [2, 1], [3, 0]]) rect(Xd(lx), y - 3, Xd(lx), y - 1 + ((f ^ s) ? -1 : 0), C.k);
};

// ── 2 · la feria: el Palacio de Cristal por fuera (fondo local) ───────────────────────────────────────────────
const feriaFija = () => {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf;
  // al fondo: árboles y el muro del depósito de agua de Croton (a la izquierda)
  for (let x = 0; x < 320; x++) { const top = 104 + Math.round(Math.sin(x * 0.21) * 2 + Math.sin(x * 0.07) * 3); for (let y = top; y < 126; y++) pset(x, y, hh(x >> 1, y >> 1, 700) < 0.3 ? hex('#4a7a4a') : (y - top) < 2 ? hex('#7aa86a') : hex('#5a8a52')); }
  for (let y = 92; y < 126; y++) for (let x = 0; x < 30 + (y - 92) * 0.3; x++) pset(x, y, (y % 6 === 0 || (x + (y / 6 | 0) * 5) % 10 === 0) ? hex('#8a8478') : hh(x, y, 701) < 0.15 ? hex('#c8c0b0') : hex('#b0a898'));
  rect(0, 90, 30, 92, hex('#d0c8b8'));
  // la torre del observatorio de madera (octogonal, que se estrecha, con sus rellanos y la garita de arriba)
  { const cx = 256, yb = 124, yt = 26; for (let y = yt; y <= yb; y++) { const w = Math.round(4 + (y - yt) / (yb - yt) * 11); rect(cx - w, y, cx + w, y, hex('#8a6a44')); pset(cx - w, y, C.k); pset(cx + w, y, C.k); pset(cx - w + 1, y, hex('#b08a5a')); pset(cx + w - 1, y, hex('#5e4428'));
      const s = (y - yt) % 14; if (s === 0) rect(cx - w - 1, y, cx + w + 1, y + 1, C.k); else { pset(Math.round(cx - w + s * w / 7), y, hex('#5e4428')); pset(Math.round(cx + w - s * w / 7), y, hex('#5e4428')); } }
    for (let y = yt + 7; y < yb; y += 14) { const w = Math.round(4 + (y - yt) / (yb - yt) * 11); rect(cx - 2, y - 2, cx + 1, y + 2, hex('#2a3a4a')); pset(cx - 2, y - 2, X.vidrioL); }
    rect(cx - 6, yt - 8, cx + 6, yt, C.k); rect(cx - 5, yt - 7, cx + 5, yt - 1, hex('#d8d0c0')); for (let x = cx - 4; x <= cx + 4; x += 3) rect(x, yt - 6, x + 1, yt - 2, X.vidrio); poligono([[cx - 7, yt - 8], [cx, yt - 14], [cx + 7, yt - 8]], hex('#5a6a7a')); rect(cx, yt - 22, cx, yt - 14, C.k); }
  // el Palacio de Cristal: las dos alas con arcos abajo y cristal arriba, las torrecillas y el frontón con su abanico
  const crema = hex('#e8dcc4'), cremaS = hex('#b8a888'), cremaL = hex('#fff6e2'), cris = (x, y) => ((x + y) % 9 < 2 ? hex('#d8ecf8') : bay(x, y) < 0.5 ? hex('#8ab8d8') : hex('#a8cce4'));
  for (const [x0, x1] of [[26, 124], [196, 240]]) {
    for (let y = 84; y < 126; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = y < 104 ? ((x - x0) % 6 === 0 || y % 5 === 0 ? crema : cris(x, y)) : crema;
    rect(x0, 82, x1, 84, cremaL); rect(x0, 85, x1, 85, cremaS); rect(x0, 103, x1, 104, cremaS); rect(x0, 102, x1, 102, cremaL);
    for (let x = x0 + 3; x < x1 - 8; x += 12) { rect(x, 108, x + 8, 126, hex('#3a3a4e')); disco(x + 4, 108, 4, hex('#3a3a4e')); rect(x + 1, 112, x + 7, 126, hex('#4a4a62')); linea(x + 1, 112, x + 4, 108, cris(x, 108)); pset(x + 4, 104, cremaS); rect(x - 2, 105, x - 1, 126, cremaS); }
    for (let x = x0 + 2; x < x1; x += 6) { rect(x, 78, x + 1, 82, crema); pset(x, 77, X.oro); } }
  for (const tx of [22, 236]) { rect(tx, 62, tx + 12, 126, crema); rect(tx, 62, tx + 1, 126, cremaL); rect(tx + 11, 62, tx + 12, 126, cremaS); for (let y = 68; y < 120; y += 12) { rect(tx + 4, y, tx + 8, y + 7, hex('#4a6a8a')); disco(tx + 6, y, 2, hex('#4a6a8a')); pset(tx + 5, y + 1, cris(tx, y)); }
    disco(tx + 6, 61, 7, hex('#7a8a9a')); rect(tx - 1, 61, tx + 13, 63, cremaS); pset(tx + 4, 57, hex('#b8c8d8')); rect(tx + 6, 48, tx + 6, 54, C.k); }
  // la nave central: el frontón con el abanico de cristal, la puerta grande en arco
  for (let y = 70; y < 126; y++) for (let x = 124; x <= 196; x++) B[y * 320 + x] = crema;
  for (let y = 60; y < 104; y++) for (let x = 126; x <= 194; x++) { const dx = x - 160, dy = y - 104, r = Math.hypot(dx, dy); if (r < 34 && r > 31) pset(x, y, cremaS); else if (r <= 31) { const a = Math.atan2(dy, dx), rib = Math.abs(((a * 8 / Math.PI) % 1 + 1) % 1 - 0.5) < 0.06; pset(x, y, rib || Math.abs(r - 18) < 0.8 ? crema : cris(x, y)); } }
  rect(124, 104, 196, 106, cremaL); rect(124, 70, 125, 126, cremaS); rect(195, 70, 196, 126, cremaS);
  rect(148, 108, 172, 126, C.k); disco(160, 110, 12, C.k); rect(149, 112, 171, 126, hex('#2e2e40')); disco(160, 110, 11, hex('#2e2e40')); for (let x = 150; x < 171; x += 4) rect(x, 104, x, 108, hex('#4a4a62'));
  rect(130, 110, 142, 126, hex('#4a4a62')); rect(178, 110, 190, 126, hex('#4a4a62')); rect(130, 110, 142, 111, cremaS); rect(178, 110, 190, 111, cremaS);
  // la cúpula de costillas de hierro y cristal, con su linterna
  for (let y = 26; y < 70; y++) for (let x = 124; x <= 196; x++) { const dx = (x - 160) / 36, dy = (y - 70) / 44, r = Math.hypot(dx, dy); if (r <= 1) { const a = Math.asin(Math.max(-1, Math.min(1, dx / Math.max(0.01, Math.sqrt(1 - dy * dy))))), rib = Math.abs(((a * 5 / Math.PI) % 1 + 1) % 1 - 0.5) < 0.09, anillo = (y - 26) % 9 === 0;
      pset(x, y, r > 0.96 ? cremaS : rib || anillo ? crema : dx < -0.3 ? hex('#d8ecf8') : dx > 0.45 ? hex('#7aa8c8') : cris(x, y)); } }
  rect(122, 68, 198, 71, cremaL); rect(122, 71, 198, 71, cremaS);
  rect(154, 18, 166, 27, C.k); rect(155, 19, 165, 27, crema); for (let x = 156; x < 165; x += 3) rect(x, 20, x + 1, 25, hex('#8ab8d8')); disco(160, 18, 5, hex('#7a8a9a')); rect(160, 6 + 10, 160, 13, C.k);
  // la explanada: grava con paseos, arriates de flores, farolas y mástiles con gallardetes
  for (let y = 126; y < 180; y++) for (let x = 0; x < 320; x++) { const q = hh(x >> 1, y >> 1, 702), camino = Math.abs(x - 160) < 18 + (y - 126) * 0.9; B[y * 320 + x] = camino ? (q < 0.12 ? X.gravaL : q > 0.9 ? X.gravaS : X.grava) : (q < 0.2 ? X.hierbaS : q > 0.88 ? X.hierbaL : X.hierba); }
  for (let y = 126; y < 180; y++) { const w = 18 + (y - 126) * 0.9; pset(Math.round(160 - w), y, X.gravaS); pset(Math.round(160 + w), y, X.gravaS); }
  for (const [x0, x1, y0] of [[24, 74, 140], [246, 296, 140]]) { for (let y = y0; y < y0 + 10; y++) for (let x = x0; x <= x1; x++) { const q = hh(x, y, 703); pset(x, y, y === y0 || y === y0 + 9 || x === x0 || x === x1 ? hex('#b0a080') : q < 0.25 ? X.rojo : q < 0.42 ? X.oro : q < 0.5 ? C.blanco : X.hierbaS); } }
  for (const lx of [100, 220]) { rect(lx, 132, lx + 1, 164, C.k); rect(lx - 3, 124, lx + 4, 132, C.k); rect(lx - 2, 125, lx + 3, 131, hex('#f0e0a0')); rect(lx - 3, 123, lx + 4, 123, C.k); pset(lx, 122, C.k); rect(lx - 2, 164, lx + 3, 165, C.k); }
  for (const mx of [58, 262]) { rect(mx, 112, mx, 150, C.k); pset(mx, 111, X.oro); rect(mx - 2, 150, mx + 2, 151, C.k); }
  // el puesto de cacahuetes (toldo de rayas, la estufa)
  rect(6, 150, 40, 168, C.k); rect(7, 151, 39, 167, X.tablaS); rect(7, 151, 39, 152, X.tablaL); for (let x = 9; x < 38; x += 5) rect(x, 154, x + 2, 166, X.tablaD);
  rect(4, 134, 42, 141, C.k); for (let x = 5; x <= 41; x++) R.rect(x, 135, x, 140, (x >> 2) % 2 ? X.rojo : C.blanco); rect(6, 141, 7, 150, C.k); rect(39, 141, 40, 150, C.k);
  rect(26, 144, 34, 150, C.k); rect(27, 145, 33, 150, hex('#6a6a76')); for (let i = 0; i < 5; i++) pset(12 + i * 3, 149, hex('#c8903a'));
};
const p2 = (t) => {
  const { rect, pset, disco } = R;
  cielo(t, { hor: 108, sem: 5, sol: [64, 36, 8], yN: 18, aves: 3 });
  capa('feria', feriaFija);
  // las banderas de la cúpula, las torrecillas, el observatorio y los mástiles, que ondean
  const bandera = (x, y, w, k) => { const cols = [[X.rojo, C.blanco, X.azul], [hex('#2a8a4a'), C.blanco, X.rojo], [X.azul, C.blanco, X.rojo], [X.oro, X.rojo, X.oro]][k % 4];
    for (let i = 0; i < w; i++) for (let j = 0; j < 6; j++) pset(x + 1 + i, y + j + Math.round(Math.sin(t * 5 - i * 0.6 + k) * (i / w) * 1.6), cols[Math.floor(j / 2)]); };
  bandera(160, 16, 12, 0); bandera(28, 48, 9, 1); bandera(242, 48, 9, 2); bandera(256, 4 + 0, 0, 3); bandera(256, 8, 10, 3); bandera(58, 112, 10, 2); bandera(262, 112, 10, 1);
  // el vapor del tostador de cacahuetes y el vendedor que remueve
  for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1; disco(Math.round(30 + Math.sin(t * 1.4 + k) * 2), Math.round(142 - u * 12), Math.round(1 + u * 2), mez(C.blanco, X.dia[3], u * 0.6)); }
  gente(16, 150, t, 2, { anda: false, ropa: [X.camisa, X.camisaS, hex('#3a3a48')] });
  // el público que entra por el paseo y por los lados hacia la puerta
  for (let k = 0; k < 16; k++) { const u = ((t * 0.09 + k / 16) % 1), lado = k % 2 ? 1 : -1, x = 160 + lado * (14 + (1 - u) * (90 + (k % 4) * 14)), y = 127 + Math.round((1 - u) * (k % 3) * 2);
    if (u < 0.97) gente(x - 2, y, t, k + 2); }
  for (let k = 0; k < 4; k++) { const x = 150 + ((t * 3 + k * 6) % 20); gente(x - 2, 126, t, k + 9); }
  // un coche de caballos que cruza por el fondo
  { const u = (t * 18 + 40) % 460 - 60, y = 132; rect(u - 20, y - 14, u - 4, y - 5, C.k); rect(u - 19, y - 13, u - 5, y - 6, hex('#2a2430')); rect(u - 17, y - 12, u - 11, y - 9, X.vidrioM); rueda(u - 16, y - 3, 4, t, 1); rueda(u - 6, y - 3, 3, t, 1); gente(u - 6, y - 11, t, 5, { anda: false, som: hex('#1c1c24') }); caballo(u + 12, y, t, 1); }
  // en el césped: arbolitos en sus macetones, un banco con una pareja sentada, un niño con su aro y las palomas
  for (const [ax, ay] of [[80, 150], [244, 152]]) { rect(ax - 5, ay - 6, ax + 5, ay, C.k); rect(ax - 4, ay - 5, ax + 4, ay - 1, hex('#8a6a5a')); rect(ax - 4, ay - 5, ax + 4, ay - 5, hex('#b08a7a')); rect(ax, ay - 14, ax + 1, ay - 6, X.tablaD);
    const sw = Math.round(Math.sin(t * 1.3 + ax) * 1); disco(ax + sw, ay - 19, 8, C.k); disco(ax + sw, ay - 19, 7, X.hierbaS); disco(ax - 2 + sw, ay - 21, 4, X.hierba); disco(ax - 3 + sw, ay - 23, 2, X.hierbaL); }
  { const bx = 270; rect(bx, 160, bx + 26, 162, C.k); rect(bx + 1, 160, bx + 25, 161, X.tabla); rect(bx, 153, bx + 26, 155, C.k); rect(bx + 1, 154, bx + 25, 154, X.tablaL); for (const lx of [bx + 2, bx + 23]) rect(lx, 162, lx + 1, 167, C.k);
    gente(bx + 6, 160, t, 3, { anda: false }); gente(bx + 15, 160, t, 2, { anda: false, mujer: true }); if (Math.sin(t * 2) > 0.3) pset(bx + 13, 148, C.blanco); }
  { const u = ((t - P2) * 22) % 420 - 40, ax = Math.round(u), ay = 150, a = t * 8; R.disco(ax + 8, ay - 5, 5, C.k); R.disco(ax + 8, ay - 5, 4, hex('#c8a060')); R.disco(ax + 8, ay - 5, 3, hex('#3a5a3a')); R.pset(Math.round(ax + 8 + Math.cos(a) * 4), Math.round(ay - 5 + Math.sin(a) * 4), C.k); R.linea(ax + 2, ay - 9, ax + 6, ay - 6, C.k); gente(ax - 2, ay, t, 6); }
  T.e_paloma(R, 120, 170, t, { picotea: true, dir: 1 }); T.e_paloma(R, 206, 166, t + 2, { picotea: true, dir: -1 }); T.e_paloma(R, 228, 172, t + 1, { picotea: true, dir: 1 });
  // Otis llega y dirige a los dos mozos que empujan la caja de su invento hasta la puerta; a «1854» saluda
  const u = tramo(t, P2 + 0.15, P2 + 2.6), ox = Math.round(lerp(-18, 112, u)), vuelve = t > P2 + 2.6 && t < @(10.2), saluda = t > @(10.9);
  const v = tramo(t, P2 + 0.4, @(10.0)), cx = Math.round(lerp(-70, 118, v)), empuja = v > 0 && v < 1;
  R.actor(EL.estibador, cx - 34, 174, t, { dir: 1, anda: empuja, sostiene: [cx - 18, 156], sonrisa: v >= 1 });
  R.actor(EL.estibador2, cx - 16, 177, t, { dir: 1, anda: empuja, sostiene: [cx, 160], habla: v >= 1 && Math.sin(t * 8) > 0 });
  // la caja con la carretilla de dos ruedas, y el engranaje pintado (el invento)
  rect(cx, 140, cx + 30, 170, C.k); rect(cx + 1, 141, cx + 29, 169, X.tabla); for (let y = 146; y < 169; y += 6) rect(cx + 1, y, cx + 29, y, X.tablaS); rect(cx + 1, 141, cx + 29, 141, X.tablaL); R.linea(cx + 1, 141, cx + 29, 169, X.tablaD);
  disco(cx + 15, 155, 7, hex('#3a3a46')); disco(cx + 15, 155, 4, X.tabla); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; rect(Math.round(cx + 15 + Math.cos(a) * 8) - 1, Math.round(155 + Math.sin(a) * 8) - 1, Math.round(cx + 15 + Math.cos(a) * 8), Math.round(155 + Math.sin(a) * 8), hex('#3a3a46')); }
  rueda(cx + 6, 172, 4, t, empuja ? 1 : 0, hex('#5a5a66')); rueda(cx + 24, 172, 4, t, empuja ? 1 : 0, hex('#5a5a66'));
  R.actor(EL.otis, ox, 175, t, { dir: vuelve ? -1 : 1, anda: u > 0 && u < 1, dedo: vuelve && Math.sin(t * 3) > -0.3 || saluda, habla: vuelve && Math.sin(t * 9) > 0, sonrisa: saluda });
  // una dama y un señor que se acercan a mirar la caja
  const w = tramo(t, P2 + 1.2, P2 + 3.6); R.actor(EL.dama, Math.round(lerp(330, 236, w)), 176, t, { dir: -1, anda: w > 0 && w < 1, sorpresa: t > @(10.0) && t < @(11.2), sonrisa: t > @(11.2) });
  R.actor(EL.comerciante, 262, 174, t, { dir: -1, habla: t > P2 + 3.8 && Math.sin(t * 7) > 0.3 });
};

// ── 3 y 4 · el ascensor de Otis en el Palacio de Cristal ─────────────────────────────────────────────────────
// las migas del pretzel que alguien dejó caer, en la alfombra roja, debajo de la plataforma
const migas = (n = 9) => { for (let k = 0; k < n; k++) { const x = 146 + k * 3 + (k % 2) * 1, y = 164 + (k * 7) % 5; R.pset(x, y, hex('#f8e4a8')); R.pset(x + 1, y, hex('#d8b070')); } R.rect(170, 165, 175, 168, C.k); R.rect(171, 166, 174, 167, hex('#c8903a')); R.pset(172, 166, hex('#f8e4a8')); };
// la nuca del público de delante (de espaldas, mirando la torre): pelo, sombrero o cofia y los hombros
const nucas = (t, salto) => { const { rect, disco, pset } = R;
  [[4, 0], [26, 1], [50, 2], [76, 3], [100, 4], [120, 5], [196, 6], [218, 7], [242, 8], [266, 9], [292, 10]].forEach(([x, k]) => {
    const y = 170 - (salto ? Math.round(Math.abs(Math.sin(t * 7 + k)) * 4) : 0) + (k % 3), ropa = ROPA[k % 7], pelo = [hex('#3a2418'), hex('#6a3a1a'), hex('#1c1424'), hex('#a8743c')][k % 4];
    rect(x - 2, y + 8, x + 18, 180, C.k); rect(x - 1, y + 9, x + 17, 180, ropa[0]); rect(x - 1, y + 9, x + 2, 180, mez(ropa[0], C.blanco, 0.15)); rect(x + 14, y + 9, x + 17, 180, ropa[1]);
    disco(x + 8, y + 4, 7, C.k); disco(x + 8, y + 4, 6, pelo); pset(x + 5, y + 1, mez(pelo, C.blanco, 0.3));
    if (k % 3 === 0) { rect(x + 2, y - 2, x + 14, y, C.k); rect(x + 4, y - 11, x + 12, y - 2, C.k); rect(x + 5, y - 10, x + 11, y - 2, hex('#26262e')); rect(x + 5, y - 4, x + 11, y - 4, hex('#6a4a3a')); rect(x + 3, y - 1, x + 13, y - 1, hex('#26262e')); }
    else if (k % 3 === 1) { disco(x + 8, y + 1, 7, C.k); disco(x + 8, y + 1, 6, SOMBM[k % 3]); rect(x + 1, y + 2, x + 15, y + 3, C.k); pset(x + 8, y - 4, C.blanco); }
    else { rect(x + 2, y - 3, x + 14, y, C.k); rect(x + 3, y - 2, x + 13, y - 1, hex('#5a5a66')); } }); };
const publico = (t, o, suelo = 177) => {   // la fila del público, mirando a la torre
  const gente4 = [[EL.dama, 22, 1], [EL.comerciante, 44, 1], [EL.emigranta, 70, 1], [EL.emigrante2, 198, -1], [EL.colona ?? EL.dama, 222, -1], [EL.estibador2, 252, -1]];
  gente4.forEach(([def, x, d], k) => { const f = o(k); const a = R.actor(def, x, suelo - (k % 2), t, { dir: d, ...f.op });
    if (f.tapa) tapaOjos(a.cabeza, d); });
};
const p3 = (t) => {
  const subida = tramo(t, @(13.9), @(15.75)), ease = subida * subida * (3 - 2 * subida);
  const d = T.alturas(R, t, { encuadre: 'palacio', plataforma: ease, cuerda: 0 });
  // el mozo da vueltas al torno mientras sube
  { const a = (subida > 0 && subida < 1) ? t * 9 : 0; R.actor(EL.estibador, 208, 166, t, { dir: -1, sostiene: [Math.round(203 + Math.cos(a) * 3), Math.round(140 + Math.sin(a) * 3)], habla: subida >= 1 && Math.sin(t * 8) > 0 }); }
  // Otis camina hasta la plataforma, salta a ella, saluda y sube
  const u = tramo(t, P3 + 0.05, P3 + 0.7), s = tramo(t, P3 + 0.7, P3 + 1.05);
  const ox = Math.round(s > 0 ? lerp(124, 152, s) : lerp(100, 124, u)), oy = s > 0 ? Math.round(lerp(166, d.plataforma.y, s) - Math.sin(s * Math.PI) * 8) : 166;
  R.actor(EL.otis, ox, s >= 1 ? d.plataforma.y : oy, t, { dir: s >= 1 && t < @(13.8) ? -1 : 1, anda: u > 0 && u < 1, dedo: s >= 1 && t > @(13.0), sonrisa: s >= 1, habla: s >= 1 && t < @(13.8) && Math.sin(t * 9) > 0 });
  // la paloma entra andando por la alfombra, picoteando migas, hasta debajo de la plataforma
  { const w = tramo(t, P3 + 0.4, @(15.2)), px = Math.round(lerp(112, 150, w)); migas(Math.max(0, Math.round(9 - w * 4))); T.e_paloma(R, px, 167, t, { picotea: w >= 1 || Math.sin(t * 7) > 0.6, dir: 1 }); }
  publico(t, (k) => ({ op: { dedo: subida > 0.2 + k * 0.08 && k % 2 === 0, sorpresa: subida > 0.3 + k * 0.05, habla: subida < 0.1 && Math.sin(t * 6 + k) > 0.4 } }));
};
const p4 = (t) => {
  const caida = tramo(t, corta, corta + 0.22), plat = 1 - 0.09 * caida;
  const d = T.alturas(R, t, { encuadre: 'palacio', plataforma: plat, cuerda: t >= corta ? 1 : 0, chispas: tramo(t, corta + 0.12, corta + 0.25) - tramo(t, corta + 0.7, corta + 1.2) });
  // el chasquido de la cuerda junto a la polea
  if (t > corta - 0.04 && t < corta + 0.3) { const r = Math.round(3 + (t - corta) * 20); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; R.linea(160, 36, Math.round(160 + Math.cos(a) * r), Math.round(36 + Math.sin(a) * r), k % 2 ? hex('#fff0a0') : C.blanco); } }
  R.actor(EL.estibador, 208, 166, t, { dir: -1, sorpresa: t > corta && t < noCae + 0.3, sonrisa: t > freno, salto: t > freno + 0.3 && t < freno + 1.4 ? Math.round(Math.abs(Math.sin((t - freno) * 8)) * 3) : 0 });
  // Otis, tranquilo arriba: un respingo con el frenazo y luego levanta los brazos
  R.actor(EL.otis, 152, d.plataforma.y, t, { dir: 1, sorpresa: t > corta && t < corta + 0.5, sonrisa: t > corta + 0.5, brazos: t > freno, habla: t > corta + 0.6 && t < freno && Math.sin(t * 9) > 0 });
  // la paloma sigue picoteando debajo de la plataforma, como si nada (gag)
  migas(5); T.e_paloma(R, 150 + (t > @(18.6) ? 3 : 0) + (t > @(20.6) ? 3 : 0), 167, t, { picotea: true, dir: 1 });
  publico(t, (k) => { const tapa = t > corta + 0.08 * k && t < noCae + 0.1 * k; const salta = t > freno + 0.1 * k && t < freno + 1.6;
    return { tapa, op: { sorpresa: tapa || (t > noCae && t < freno), sonrisa: t > freno, manos: tapa, brazos: salta && k % 2 === 1, salto: salta ? Math.round(Math.abs(Math.sin((t - freno) * 7 + k)) * 3) : 0 } }; }, 160);
  nucas(t, t > freno && t < freno + 2);
};

// ── 5 · la obra: el esqueleto de acero que crece ─────────────────────────────────────────────────────────────
const p5 = (t) => {
  const pisos = lerp(0.42, 1, tramo(t, P5 + 0.2, estira + 0.3));
  T.alturas(R, t, { encuadre: 'obra', pisos });
  // el capataz con el plano enrollado señala arriba («steel skeletons»)
  { const a = R.actor(EL.vigas, 118, 170, t, { dir: 1, dedo: t > acero - 0.1, habla: t > acero && Math.sin(t * 8) > 0, sonrisa: t > estira }); }
  { const a = R.actor(EL.vigas, 98, 172, t, { dir: 1, sostiene: true, pal: { C: hex('#7a6a4a'), c: hex('#5a4a34') } }); const [hx, hy] = a.mano; R.rect(hx - 1, hy - 3, hx + 9, hy, C.k); R.rect(hx, hy - 2, hx + 8, hy - 1, hex('#5a7ab8')); R.rect(hx, hy - 2, hx + 8, hy - 2, hex('#8aa8d8')); }
  // un obrero cruza con una viga al hombro
  { const u = tramo(t, P5 + 0.1, P5 + 3.6), x = Math.round(lerp(330, 196, u)), b = u > 0 && u < 1 && Math.floor(t * 5 + x * 0.37) % 2 ? 1 : 0;
    R.rect(x - 14, 154 - b, x + 26, 158 - b, C.k); R.rect(x - 13, 155 - b, x + 25, 155 - b, hex('#d07050')); R.rect(x - 13, 156 - b, x + 25, 157 - b, hex('#a84a3a')); R.rect(x - 13, 157 - b, x + 25, 157 - b, hex('#743026')); for (let i = x - 11; i < x + 25; i += 6) R.pset(i, 156 - b, hex('#743026'));
    R.actor(EL.vigas2, x, 174, t, { dir: -1, anda: u > 0 && u < 1, sostiene: [x - 1, 157 - b] }); }
  // un señor que pasa se para y mira arriba, boquiabierto («stretch»)
  { const u = tramo(t, P5 + 0.3, P5 + 2.4), x = Math.round(lerp(-20, 44, u)); R.actor(EL.comerciante, x, 173, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > estira - 0.4, dedo: t > estira }); }
  R.actor(EL.dama, 256, 176, t, { dir: -1, habla: Math.sin(t * 5) > 0.6, sorpresa: t > estira });
};

// ── 6 · el Flatiron y la plancha del escaparate ───────────────────────────────────────────────────────────────
const planchaAntigua = (x, y) => {   // la plancha de hierro antigua (34 px): suela en punta hacia la derecha, cuerpo y asa de madera; (x, y) = talón abajo
  const { rect, pset, linea, poligono } = R, hi = hex('#6a6a7c'), hiS = hex('#2e2e38'), hiL = hex('#d0d0e0'), m = hex('#8a5a2a'), mL = hex('#c8904a'), mS = hex('#5e3a1a');
  poligono([[x - 1, y + 1], [x - 1, y - 12], [x + 13, y - 15], [x + 35, y - 4], [x + 37, y + 1]], C.k);
  poligono([[x, y], [x, y - 11], [x + 13, y - 14], [x + 34, y - 4], [x + 35, y]], hi); linea(x, y - 11, x + 13, y - 14, hiL); linea(x + 13, y - 14, x + 34, y - 4, hiL); linea(x + 1, y - 10, x + 12, y - 12, hiL);
  rect(x, y - 3, x + 34, y, hiS); rect(x, y - 3, x + 33, y - 3, hiL); poligono([[x + 2, y - 9], [x + 11, y - 11], [x + 11, y - 5], [x + 2, y - 5]], hex('#5a5a6a'));
  rect(x + 8, y - 22, x + 11, y - 12, C.k); rect(x + 9, y - 21, x + 10, y - 13, hiS); rect(x + 25, y - 19, x + 28, y - 8, C.k); rect(x + 26, y - 18, x + 27, y - 9, hiS);
  rect(x + 7, y - 26, x + 29, y - 20, C.k); rect(x + 8, y - 25, x + 28, y - 21, m); rect(x + 8, y - 25, x + 28, y - 25, mL); rect(x + 8, y - 21, x + 28, y - 21, mS); pset(x + 12, y - 24, mL);
};
// lo que no es cielo dentro de una caja se mezcla con el oro (el brillo de una silueta)
const brilla = (x0, y0, x1, y1, a) => { if (a <= 0) return; const oro = hex('#ffe070');
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const p = R.pget(x, y), r = p & 255, b = (p >>> 16) & 255; if (r + 8 >= b) R.pset(x, y, mez(p, oro, a)); } };
const p6 = (t) => {
  T.alturas(R, t, { encuadre: 'flatiron' });
  // la plancha en el centro de la balda del escaparate, sobre su paño de terciopelo (recortada al cristal); brilla a «old clothes iron»
  R.recorte([11, 113, 65, 147]);
  for (let y = 117; y <= 146; y++) for (let x = 18; x <= 58; x++) R.pset(x, y, y === 117 || x === 18 || x === 58 ? hex('#4a1218') : (x + y) % 5 === 0 ? hex('#6a1c24') : hex('#8a2630'));
  for (let x = 16; x <= 60; x++) { R.pset(x, 146, hex('#e8dcc0')); R.pset(x, 147, hex('#c8b898')); }
  planchaAntigua(21, 144); if (Math.floor(t * 2) % 3 === 0) { R.pset(30, 133, C.blanco); R.pset(31, 132, C.blanco); }
  const g1 = tramo(t, plancha - 0.4, plancha) * (1 - tramo(t, plancha + 1.2, plancha + 1.6)); brilla(19, 117, 58, 145, g1 * (0.45 + 0.15 * Math.sin(t * 12)));
  R.recorte(null);
  const g2 = tramo(t, plancha + 0.4, plancha + 0.8) * (1 - tramo(t, plancha + 1.9, plancha + 2.3)); brilla(94, 16, 236, 150, g2 * (0.42 + 0.12 * Math.sin(t * 12)));
  // el muchacho se para ante el escaparate, mira la plancha y luego señala el Flatiron
  const u = tramo(t, P6 + 0.1, P6 + 1.7), x = Math.round(lerp(150, 72, u)), gira = t > plancha + 0.3;
  R.actor(EL.hermanoMoore, x, 176, t, { dir: gira ? 1 : -1, anda: u > 0 && u < 1, dedo: gira, sorpresa: gira && t < plancha + 1.2, sonrisa: t > plancha + 1.2 });
  // una señora persigue el sombrero que se lleva el viento de la esquina
  const w = tramo(t, @(28.2), @(30.9)); R.actor(EL.dama, Math.round(lerp(96, 236, w)), 177, t, { dir: 1, anda: w > 0 && w < 1, sorpresa: w > 0 && w < 1, sonrisa: w >= 1 });
  R.actor(EL.comerciante, 266, 176, t, { dir: -1, habla: Math.sin(t * 6) > 0.3, sonrisa: w >= 1 });
};

const efectos = [[1.5, 'publico'], [angosta + 0.05, 'golpecito'], [sube - 0.5, 'whoosh'], [P2 + 0.6, 'maquina'], [@(10.0), 'toc'], [P3 + 0.95, 'golpecito'], [@(13.9), 'maquina'],
  [corta, 'cuelga'], [corta + 0.2, 'cerrojo'], [freno, 'publico'], [P5 + 0.4, 'maquina'], [acero, 'golpecito'], [@(28.2), 'viento'], [plancha, 'brillo']];
const año = (t) => (t < P5 ? 1854 : t < P6 ? Math.round(lerp(1889, 1901, tramo(t, P5, P6))) : 1902);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '1854', efectos, año });
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['ny-tartas'] = ('Tartas de boda', '''// NY-TARTAS (frases 44–45), 1915–1916, cartela «1916». Cuatro planos:
// 1. alturas 'calle1915' (1915): la torre enorme y recta tapa el sol; abajo todo a la sombra: la oficinista sale en
//    mangas de camisa, tirita y se pone el abrigo («into shadow»); el vendedor de periódicos se frota las manos; la
//    maceta del portal se mustia;
// 2. (fondo local) inserto: la mesa del urbanista en 1916: el plano de la calle con la torre recta y el sol; a «law» el
//    sello cae sobre el plano; a «step back» la pluma dibuja en rojo la silueta en escalones y los rayos llegan a la calle;
// 3. alturas 'calle1915' con la ley: la torre se estrecha en escalones («as they rise»), el sol asoma y la cuña de luz
//    baja a la calle («light can reach the street»): la oficinista se quita el abrigo y levanta los brazos, la maceta
//    florece y el gato se tumba al sol;
// 4. alturas 'pasteleria': una pareja mira la tarta de boda del escaparate; ella señala la tarta y él el rascacielos de
//    enfrente, con la misma silueta («skyscrapers»); a «wedding cakes» una paloma baja y se posa en lo alto de la tarta
//    (gag) y los dos se ríen.''', PRE + r'''
const P2 = @(6.59), P3 = @(10.49), P4 = @(14.05);
const torre = @(3.6), sombra = @(5.62), ley = @(8.2), escalon = @(9.99), suben = @(10.69), luz = @(12.0), tartas = @(16.9);

// la oficinista: o.abrigo (0: mangas de camisa, 1: el abrigo puesto)
const oficinista = (x, suelo, t, o) => R.actor(EL.oficinista2, x, suelo, t, { ...o, pal: o.abrigo ? { C: hex('#4a3a5a'), c: hex('#34283e') } : { C: X.camisa, c: X.camisaS } });
const maceta = (x, y, vida, t) => {   // la maceta del portal: la flor se mustia (vida 0) o se abre (vida 1)
  const { rect, pset, linea, disco } = R; rect(x - 5, y - 7, x + 5, y, C.k); rect(x - 4, y - 6, x + 4, y - 1, hex('#b8603a')); rect(x - 4, y - 6, x + 4, y - 6, hex('#d8804a')); rect(x - 5, y - 8, x + 5, y - 7, hex('#8a4a2a'));
  const dob = (1 - vida) * 7, sw = Math.sin(t * 1.5) * 0.6, tx = Math.round(x + dob + sw), ty = Math.round(y - 20 + dob * 1.2);
  linea(x, y - 8, Math.round(x + dob * 0.4), y - 15, hex('#3e7a38')); linea(Math.round(x + dob * 0.4), y - 15, tx, ty, hex('#3e7a38'));
  pset(x - 2, y - 12, hex('#5a9a4a')); pset(x - 3, y - 13, hex('#5a9a4a')); pset(x + 2, y - 11, hex('#5a9a4a')); pset(x + 3, y - 12, hex('#5a9a4a'));
  const r = vida > 0.6 ? 3 : 2, c = mez(hex('#8a6a5a'), hex('#e84a6a'), vida); disco(tx, ty, r, C.k); disco(tx, ty, r - 1, c); if (vida > 0.6) { for (const [dx, dy] of [[-3, 0], [3, 0], [0, -3], [0, 3]]) pset(tx + dx, ty + dy, c); pset(tx, ty, X.oro); }
};
const quiosquero = (t, frio) => { const a = R.actor(EL.neoyorquino2, 230, 174, t, { dir: -1, sostiene: true, habla: !frio && Math.sin(t * 7) > 0.3, triste: frio });
  const [hx, hy] = a.mano; R.rect(hx - 6, hy - 6, hx + 1, hy + 2, C.k); R.rect(hx - 5, hy - 5, hx, hy + 1, X.papel); R.rect(hx - 4, hy - 3, hx - 1, hy - 3, X.tinta); R.rect(hx - 4, hy - 1, hx - 2, hy - 1, X.tinta); return a; };

// ── 1 · 1915: la torre recta y la calle a la sombra ─────────────────────────────────────────────────────────
const p1 = (t) => {
  T.alturas(R, t, { encuadre: 'calle1915', ley: 0 });
  // el sol, tapado: solo asoman sus rayos por el canto izquierdo de la torre, en abanico sobre el cielo
  for (let k = 0; k < 5; k++) { const a = Math.PI + 0.25 + k * 0.22 + Math.sin(t * 0.8 + k) * 0.02, L = 34 + (k % 2) * 14;
    for (let i = 0; i < L; i++) { const x = Math.round(91 + Math.cos(a) * i), y = Math.round(26 + Math.sin(a) * i * 0.9); if (x < 0 || y < 15 || y > 62 || (i + k) % 3 === 0) continue; R.pset(x, y, mez(R.pget(x, y), hex('#fff2c0'), 0.55 * (1 - i / L))); } }
  for (let y = 16; y < 40; y++) R.pset(91, y, mez(R.pget(91, y), hex('#fff2c0'), 0.6 - Math.abs(y - 28) / 30));
  const som = (dibuja, x0, y0, x1, y1) => tintado(x0, y0, x1, y1, X.sombra, 0.36, dibuja);
  // la oficinista sale de la izquierda en mangas de camisa; con la sombra tirita y se pone el abrigo
  const u = tramo(t, 1.4, torre + 0.4), x = Math.round(lerp(-16, 96, u)), tirita = t > torre + 0.5 && t < sombra + 0.2, abrigo = t > sombra;
  som(() => oficinista(x + (tirita ? (Math.floor(t * 20) % 2) : 0), 175, t, { dir: 1, anda: u > 0 && u < 1, abrigo, triste: tirita, sorpresa: t > torre && t < torre + 0.5, sostiene: tirita ? true : false }), x - 4, 140, x + 24, 178);
  if (tirita) { const a = 0; som(() => { R.rect(x + 12, 150, x + 22, 165, C.k); R.rect(x + 13, 151, x + 21, 164, hex('#4a3a5a')); R.rect(x + 13, 151, x + 21, 152, hex('#5e4c70')); }, x + 10, 148, x + 24, 167); }
  if (t > sombra - 0.1 && t < sombra + 0.6) for (let k = 0; k < 3; k++) R.pset(x + 2 + k * 5, 146 - ((t * 20 + k * 3) % 6), hex('#c8d8f0'));
  // un señor con sombrero mira arriba la torre que le quita el sol, con los brazos cruzados
  som(() => R.actor(EL.oficinista, 150, 176, t, { dir: 1, dedo: t > torre - 0.2 && t < sombra, triste: t > sombra, habla: t > torre && t < torre + 1 && Math.sin(t * 8) > 0 }), 146, 140, 170, 178);
  // la maceta del portal, que se mustia, y el vendedor de periódicos que se frota las manos
  som(() => maceta(196, 172, 1 - tramo(t, torre, sombra + 0.4), t), 186, 148, 210, 174);
  som(() => quiosquero(t, t > sombra - 0.3), 222, 140, 246, 178);
  som(() => R.actor(EL.vigas2, 270 + (t > sombra ? Math.floor(t * 12) % 2 : 0), 176, t, { dir: -1, triste: t > sombra, habla: t < sombra && Math.sin(t * 6) > 0.5 }), 264, 140, 290, 178);
};

// ── 2 · 1916: la mesa del urbanista (fondo local) ───────────────────────────────────────────────────────────
const mesaFija = () => {
  const { rect, pset, linea, disco } = R, B = R.buf;
  // la mesa de roble con sus vetas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.11) * 2 + y * 0.012) * 0.5 + 0.5, q = hh(x >> 2, y, 710); B[y * 320 + x] = (y % 28 === 0) ? hex('#4a2e1a') : v > 0.82 ? hex('#8a5a32') : v < 0.15 ? hex('#5e3a20') : q < 0.08 ? hex('#7a4e2a') : hex('#6e4426'); }
  // el plano: papel grande con su sombra, chinchetas, el margen y la cuadrícula tenue
  rect(52, 26, 252, 168, mez(hex('#4a2e1a'), C.k, 0.4)); rect(48, 22, 248, 164, C.k); rect(49, 23, 247, 163, X.papel);
  for (let y = 24; y < 163; y++) for (let x = 50; x < 247; x++) if ((x - 50) % 10 === 0 || (y - 24) % 10 === 0) pset(x, y, hex('#dcd2b8')); else if (hh(x, y, 711) < 0.04) pset(x, y, X.papelS);
  rect(54, 28, 242, 158, hex('#b8ac8c')); rect(55, 29, 241, 157, X.papel);
  for (const [cx, cy] of [[52, 26], [244, 26], [52, 160], [244, 160]]) { disco(cx, cy, 2, C.k); disco(cx, cy, 1, X.rojo); }
  // en el plano: la calle (con los dos bordillos y la gente), la casa baja de los lados y la torre recta a lápiz
  linea(60, 146, 236, 146, hex('#6a6a7a')); linea(60, 150, 236, 150, hex('#6a6a7a')); for (let x = 64; x < 234; x += 8) pset(x, 148, hex('#9a9aaa'));
  for (const xx of [70, 84, 196, 216]) { rect(xx, 140, xx + 1, 145, hex('#5a5a6a')); disco(xx, 139, 1, hex('#5a5a6a')); }
  rect(62, 112, 92, 146, hex('#8a8a9a')); rect(63, 113, 91, 145, X.papel); for (let y = 116; y < 142; y += 6) for (let x = 66; x < 88; x += 6) rect(x, y, x + 2, y + 3, hex('#9a9aaa'));
  rect(204, 120, 236, 146, hex('#8a8a9a')); rect(205, 121, 235, 145, X.papel); for (let y = 124; y < 142; y += 6) for (let x = 208; x < 232; x += 6) rect(x, y, x + 2, y + 3, hex('#9a9aaa'));
  for (let y = 40; y <= 146; y++) { pset(116, y, hex('#5a5a6a')); pset(184, y, hex('#5a5a6a')); } linea(116, 40, 184, 40, hex('#5a5a6a'));
  for (let y = 46; y < 144; y += 6) for (let x = 121; x < 180; x += 7) rect(x, y, x + 2, y + 2, hex('#b0a890'));
  // el sol del plano (arriba a la izquierda) y la sombra larga rayada sobre la calle
  disco(78, 50, 7, hex('#c89a3a')); disco(78, 50, 5, hex('#f0c860')); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; linea(Math.round(78 + Math.cos(a) * 9), Math.round(50 + Math.sin(a) * 9), Math.round(78 + Math.cos(a) * 12), Math.round(50 + Math.sin(a) * 12), hex('#c89a3a')); }
  // lo de la mesa: el tintero con su pluma, la regla, el compás, las gafas, la taza de café y el calendario de 1916
  rect(260, 52, 296, 92, C.k); rect(261, 53, 295, 91, hex('#f2eee2')); rect(261, 53, 295, 61, X.rojo); rect(261, 61, 295, 61, hex('#8a1a22')); for (let y = 76; y < 90; y += 4) for (let x = 264; x < 294; x += 4) rect(x, y, x + 1, y + 1, hex('#8a8a96')); rect(268, 50, 269, 55, C.k); rect(287, 50, 288, 55, C.k); rect(262, 91, 296, 92, hex('#b8b0a0'));
  disco(280, 122, 11, C.k); disco(280, 122, 10, hex('#e8e4dc')); disco(280, 122, 7, hex('#4a2a18')); disco(278, 120, 2, hex('#6a4a30')); rect(290, 118, 295, 126, C.k); rect(291, 120, 293, 124, hex('#e8e4dc'));
  for (let x = 258; x < 316; x++) for (let y = 146; y < 154; y++) pset(x, y, y === 146 || y === 153 || x === 258 || x === 315 ? C.k : (x - 258) % 4 === 0 && y < 150 ? hex('#5a4a2a') : hex('#d8b878'));
  rect(14, 120, 30, 136, C.k); rect(15, 121, 29, 135, hex('#2a2a3a')); rect(16, 122, 18, 125, hex('#5a5a7a')); rect(13, 119, 31, 120, hex('#b08a3a'));
  linea(24, 120, 40, 96, C.k); linea(25, 120, 41, 96, hex('#f2eee2')); linea(26, 119, 42, 97, hex('#d8d0c0'));
  linea(10, 60, 30, 92, C.k); linea(30, 60, 14, 92, C.k); disco(20, 74, 2, hex('#a8a8b0')); linea(11, 60, 28, 88, hex('#a8a8b0'));
  disco(18, 160, 6, C.k); disco(18, 160, 5, hex('#c8d8e8')); disco(34, 160, 6, C.k); disco(34, 160, 5, hex('#c8d8e8')); linea(24, 160, 28, 160, C.k); pset(16, 158, C.blanco); pset(32, 158, C.blanco);
  for (let k = 0; k < 4; k++) { rect(264 + k * 8, 162, 268 + k * 8, 179, C.k); rect(265 + k * 8, 163, 267 + k * 8, 179, [hex('#c8303a'), hex('#2a7a5a'), hex('#e8b830'), hex('#3a5a9a')][k]); }
};
const p2 = (t) => {
  const { rect, pset, linea, disco } = R;
  capa('mesa1916', mesaFija);
  // el calendario: el año (solo números)
  R.numero('1916', 278, 72, { centro: true, tam: 8 });
  // el vapor del café y una mota de polvo que flota en la luz de la lámpara
  for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; disco(Math.round(280 + Math.sin(t * 2 + k) * 2), Math.round(108 - u * 12), 1, mez(C.blanco, hex('#6e4426'), u)); }
  // el sello cae a «law»: la mano baja con él y deja el círculo rojo con una estrella
  const baja = tramo(t, ley - 0.35, ley), sube = tramo(t, ley + 0.25, ley + 0.7), sy = Math.round(lerp(-20, 48, baja) - sube * 80);
  if (t > ley) { disco(212, 53, 11, X.rojo); disco(212, 53, 9, X.papel); disco(212, 53, 8, mez(X.rojo, X.papel, 0.35)); for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 4 * Math.PI / 5; linea(212, 53, Math.round(212 + Math.cos(a) * 6), Math.round(53 + Math.sin(a) * 6), X.rojo); } }
  if (t > ley && t < ley + 0.3) for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, r = 14 + (t - ley) * 30; pset(Math.round(212 + Math.cos(a) * r), Math.round(53 + Math.sin(a) * r), X.rojo); }
  if (sy > -40) { rect(204, sy - 18, 220, sy + 2, C.k); rect(205, sy - 17, 219, sy + 1, hex('#6a3a1a')); rect(206, sy - 17, 208, sy + 1, hex('#8a5a32')); rect(201, sy + 2, 223, sy + 5, C.k); rect(202, sy + 3, 222, sy + 4, X.rojo);
    T.brazo(R, 246, sy - 56, 222, sy - 10, '#3a3a4a', -1, { codo: [240, sy - 28] }); }
  // la pluma traza la silueta en escalones a «step back» y luego los rayos del sol que llegan a la calle
  const pasos = [[116, 146], [116, 96], [128, 96], [128, 72], [140, 72], [140, 54], [150, 54], [150, 40], [150, 40], [170, 40], [170, 54], [180, 54], [180, 72], [184, 72]];
  const u = tramo(t, escalon - 0.35, P3 - 0.2), n = pasos.length - 1, f = u * n; let px = pasos[0][0], py = pasos[0][1];
  for (let i = 0; i < n; i++) { const a = pasos[i], b = pasos[i + 1], g = cl(f - i); if (g <= 0) break; px = Math.round(lerp(a[0], b[0], g)); py = Math.round(lerp(a[1], b[1], g)); linea(a[0], a[1], px, py, X.rojo); linea(a[0] + 1, a[1], px + 1, py, X.rojo); }
  const r = tramo(t, P3 - 0.45, P3 - 0.02); if (r > 0) for (const x1 of [98, 108]) { for (let k = 0; k < 40; k++) { const g = k / 40; if (g > r) break; if (k % 3 !== 2) { pset(Math.round(lerp(82, x1, g)), Math.round(lerp(57, 144, g)), hex('#e8a020')); } } }
  // la punta del trazo, que brilla como tinta fresca
  if (u > 0 && u < 1) { disco(px, py, 2, hex('#fff0a0')); pset(px, py, X.rojo); }
};

// ── 3 · la ley: la torre en escalones deja pasar el sol ─────────────────────────────────────────────────────
const p3 = (t) => {
  const l = tramo(t, suben - 0.1, suben + 0.9), lE = l * l * (3 - 2 * l);
  const d = T.alturas(R, t, { encuadre: 'calle1915', ley: lE });
  const [l0, l1] = d.luz, enLuz = (x) => lE > 0.2 && x > l0 + 4 && x < l1 - 4, sol = tramo(t, luz - 0.2, luz + 0.5);
  const som = (x, dibuja, x0, y0, x1, y1) => tintado(x0, y0, x1, y1, enLuz(x + 7) && sol > 0.5 ? hex('#fff0c0') : X.sombra, enLuz(x + 7) && sol > 0.5 ? 0.12 : 0.36, dibuja);
  // la oficinista, ya con abrigo, se lo quita al llegar la luz y levanta los brazos
  const x = 96, quita = t > luz + 0.1;
  som(x, () => oficinista(x, 175, t, { dir: 1, abrigo: !quita, brazos: t > luz + 0.4, sonrisa: quita, sorpresa: t > luz - 0.3 && t < luz + 0.1, triste: !quita && t < luz - 0.3 }), x - 4, 140, x + 24, 178);
  if (quita && t < luz + 1.6) { const k = tramo(t, luz + 0.1, luz + 1.2); R.rect(x + 18, 160 + Math.round(k * 6), x + 30, 168 + Math.round(k * 6), C.k); R.rect(x + 19, 161 + Math.round(k * 6), x + 29, 167 + Math.round(k * 6), hex('#4a3a5a')); }
  if (quita && t >= luz + 1.6) { R.rect(x + 18, 166, x + 30, 174, C.k); R.rect(x + 19, 167, x + 29, 173, hex('#4a3a5a')); }
  som(150, () => R.actor(EL.oficinista, 150, 176, t, { dir: 1, sonrisa: sol > 0.5, dedo: t > suben && t < luz, sorpresa: t > suben && t < luz - 0.2 }), 146, 140, 170, 178);
  som(196, () => maceta(196, 172, tramo(t, luz, luz + 1.2), t), 186, 148, 210, 174);
  som(230, () => quiosquero(t, sol < 0.5), 222, 140, 246, 178);
  // el gato que se tumba en la mancha de sol
  { const gx = 124, a = tramo(t, luz + 0.3, luz + 1.6); som(gx, () => { R.rect(gx - 6, 170, gx + 6, 174, C.k); R.rect(gx - 5, 171, gx + 5, 173, hex('#e8904a')); R.rect(gx - 5, 171, gx + 5, 171, hex('#f8b070'));
      const hy = Math.round(169 + a * 2); R.rect(gx + 4, hy - 3, gx + 9, hy + 1, C.k); R.rect(gx + 5, hy - 2, gx + 8, hy, hex('#e8904a')); R.pset(gx + 5, hy - 4, C.k); R.pset(gx + 8, hy - 4, C.k); R.pset(gx + 7, hy - 1, a > 0.5 ? C.k : hex('#3a8a3a'));
      for (let i = 0; i < 6; i++) R.pset(gx - 6 - i, 172 - Math.round(Math.sin(t * 3 + i * 0.6) * (i / 3)), hex('#c8703a')); }, gx - 14, 160, gx + 12, 176); }
  som(270, () => R.actor(EL.vigas2, 270, 176, t, { dir: -1, sonrisa: sol > 0.5, habla: Math.sin(t * 6) > 0.5 }), 264, 140, 290, 178);
};

// ── 4 · la pastelería: la tarta de boda y el rascacielos de enfrente ───────────────────────────────────────
const p4 = (t) => {
  const d = T.alturas(R, t, { encuadre: 'pasteleria' });
  const [tx, ty] = d.tarta;
  // el brillo que recorre la tarta y el rascacielos a «skyscrapers»
  const b = tramo(t, @(15.4), @(16.2));
  if (b > 0 && b < 1) { const y = Math.round(lerp(140, 99, b)); R.recorte([15, 67, 149, 149]); R.linea(tx - 22, y, tx + 22, y, hex('#fff6d0')); R.recorte(null); const y2 = Math.round(lerp(136, 52, b)); R.linea(232, y2, 268, y2, hex('#fff6d0')); }
  // la pareja llega, ella señala la tarta, él el rascacielos; se ríen con la paloma
  const u = tramo(t, P4 + 0.05, P4 + 1.4), x = Math.round(lerp(320, 116, u));
  const rien = t > tartas + 0.2;
  oficinista(x, 175, t, { dir: -1, anda: u > 0 && u < 1, abrigo: true, dedo: t > @(14.9) && t < tartas, sonrisa: rien || (t > @(14.9) && t < tartas), sorpresa: t > tartas - 0.1 && t < tartas + 0.2 });
  R.actor(EL.oficinista, x + 22, 176, t, { dir: t > @(15.3) && t < tartas - 0.2 ? 1 : -1, anda: u > 0 && u < 1, dedo: t > @(15.4) && t < tartas - 0.2, sonrisa: rien, habla: t > @(15.4) && t < @(16.4) && Math.sin(t * 9) > 0 });
  // la paloma baja del alero de enfrente y se posa en lo alto de la tarta (gag)
  const v = tramo(t, tartas - 0.9, tartas), px = Math.round(lerp(200, tx, v)), py = Math.round(lerp(40, ty, v) - Math.sin(v * Math.PI) * 10);
  if (t > tartas - 0.9) T.e_paloma(R, px, py, t, { vuela: v < 1, picotea: v >= 1, dir: -1 });
  if (t > tartas && t < tartas + 0.5) R.icono('!', tx - 2, ty - 18, hex('#fff0a0'));
};

const efectos = [[torre, 'viento'], [sombra + 0.1, 'papel'], [ley, 'sello'], [escalon, 'lapiz'], [suben + 0.1, 'maquina'], [luz, 'brillo'], [@(15.4), 'brillo'], [tartas - 0.85, 'whoosh'], [tartas + 0.05, 'pop']];
const año = (t) => (t < P2 ? 1915 : 1916);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1916', efectos, año });
''')

E = {k: (v[0], v[1], _conv(k, v[2])) for k, v in E.items()}
