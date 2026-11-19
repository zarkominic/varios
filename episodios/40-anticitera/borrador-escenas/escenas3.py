# Borrador de escenas del ep40 (Anticitera), grupo S3: ak-escaner, ak-manivela, ak-luna.
# python3 atomo/herramientas/generar-escenas.py ak ep40 episodios/40-anticitera/borrador-escenas/escenas3.py --destino atomo/plato/escenas/_tmp_S3 --pisar
# Los instantes se escriben como en('marca', fracción): A(s), B(s)… pasan un segundo de la escena a la fracción de su frase.
E = {}

# Utilidades compartidas (las mismas del grupo S2: ruido, tramas, mezcla, búferes, madera, ruedas, nubes, gaviotas…).
PRE = r'''
const H_ = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const B4_ = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4_[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const K = hex('#0e0c14'), BL = hex('#f6f2e6');
const rp = (x0, y0, x1, y1, c) => { x0 = Math.round(x0); x1 = Math.round(x1); for (let y = Math.round(y0); y <= Math.round(y1); y++) R.linea(x0, y, x1, y, c); };
// la esquina de Atom, pared tranquila: funde lo que haya hacia un color liso, con un borde suave de 14 px
const calma = (col) => { for (let y = 0; y <= 58; y++) for (let x = 264; x < 320; x++) { const d = Math.max(278 - x, y - 44, 0), w = d >= 14 ? 0 : 1 - d / 14; if (w > 0) R.pset(x, y, mez(R.pget(x, y), col, Math.min(1, w * 1.15))); } };
const capas = new Map();
// lo fijo se pinta una vez en su búfer y se copia en cada fotograma
const capa = (clave, dibuja) => { let b = capas.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); capas.set(clave, b); } R.copiar(b); };
// degradado vertical tramado entre y0 e y1 con la lista de colores
const degr = (x0, y0, x1, y1, cols) => { for (let y = y0; y <= y1; y++) { const v = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), i = Math.floor(v), f = v - i; for (let x = x0; x <= x1; x++) R.pset(x, y, cols[Math.min(cols.length - 1, f > b4(x, y) ? i + 1 : i)]); } };
// oscurece (o aclara) un rectángulo hacia col en la proporción a
const velo = (x0, y0, x1, y1, col, a) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) R.pset(x, y, mez(R.pget(x, y), col, a)); };
// tablas horizontales con juntas al tresbolillo, vetas, nudos y clavos
const tablas = (x0, y0, x1, y1, alto, c, cS, cL, k = 0) => {
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / alto), jy = (y - y0) % alto;
    for (let x = x0; x <= x1; x++) { const largo = 38 + Math.floor(H_(fila, 3, k) * 30), off = Math.floor(H_(fila, 7, k) * 40), jx = (x - x0 + off) % largo;
      let col = c; const v = H_(Math.floor((x + off) / 3), fila * 13 + jy, k + 1);
      if (jy === alto - 1 || jx === 0) col = K; else if (jy === 0) col = cL; else if (v > 0.86) col = cS; else if (v < 0.07) col = cL;
      if (jx === 3 && (jy === 2 || jy === alto - 3)) col = mez(cS, K, 0.5);
      R.pset(x, y, col); } } };
// tablas verticales (paredes de madera, puertas, cajones)
const tablasV = (x0, y0, x1, y1, ancho, c, cS, cL, k = 0) => {
  for (let x = x0; x <= x1; x++) { const col0 = Math.floor((x - x0) / ancho), jx = (x - x0) % ancho;
    for (let y = y0; y <= y1; y++) { let col = c; const v = H_(col0 * 17 + jx, Math.floor(y / 3), k + 2);
      if (jx === ancho - 1) col = K; else if (jx === 0) col = cL; else if (v > 0.87) col = cS; else if (v < 0.06) col = cL;
      R.pset(x, y, col); } } };
// nube de tres tonos (sombra, cuerpo y luz) hecha de bolas
const nube3 = (cx, cy, w, c0, c1, c2) => { const n = Math.max(3, Math.round(w / 6)), k0 = Math.round(w * 7 + cx * 0.01);
  const rr = (i) => (w / n) * (0.55 + 0.9 * Math.sin(Math.PI * (i + 0.5) / n) * (0.7 + 0.5 * H_(i, k0, 31))) + 1.2, xx = (i) => cx - w / 2 + (i + 0.5) * w / n, yy = (i) => cy - rr(i) * 0.55 + (H_(i, k0, 32) - 0.5) * 2;
  for (let i = 0; i < n; i++) R.disco(xx(i), yy(i) + 1.5, rr(i), c0);
  for (let i = 0; i < n; i++) R.disco(xx(i) - 0.5, yy(i) - 0.5, rr(i) - 0.8, c1);
  for (let i = 0; i < n; i++) { const r = rr(i); R.disco(xx(i) - r * 0.25, yy(i) - r * 0.35, r * 0.62, c2); R.disco(xx(i) + r * 0.05, yy(i) - r * 0.05, r * 0.6, c1); }
  rp(cx - w / 2 + 3, cy, cx + w / 2 - 3, cy + 1, c0); };
// rueda dentada de dientes triangulares: centro, radio (base de los dientes), n dientes, ángulo, colores
const rueda = (cx, cy, r, n, ang, c, cS, cL, o = {}) => {
  const td = o.diente ?? Math.max(1.6, r * 0.14), P = [], Q = [];
  for (let k = 0; k < n; k++) { const a = ang + k * 2 * Math.PI / n, da = Math.PI / n;
    for (const [aa, rr] of [[a - da, r], [a - da * 0.4, r + td], [a + da * 0.4 - da * 0.2, r + td], [a + da * 0.6, r]]) { P.push([cx + Math.cos(aa) * (rr + 1), cy + Math.sin(aa) * (rr + 1)]); Q.push([cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr]); } }
  R.poligono(P, o.borde ?? K); R.poligono(Q, (x, y) => { const d = (x - cx) * 0.7 + (y - cy) * 0.7; return d < -r * 0.35 ? cL : d > r * 0.4 ? cS : c; });
  if (r > 7) { R.anillo(cx + 0.5, cy + 0.5, r * 0.72, cS); if (o.radios !== false) for (let k = 0; k < 4; k++) { const a = ang * 1 + k * Math.PI / 2 + 0.4; R.linea(cx + Math.cos(a) * r * 0.2, cy + Math.sin(a) * r * 0.2, cx + Math.cos(a) * r * 0.68, cy + Math.sin(a) * r * 0.68, cS); }
    for (let k = 0; k < 4 && o.huecos; k++) { const a = ang + k * Math.PI / 2 + Math.PI / 4 + 0.4; R.disco(cx + Math.cos(a) * r * 0.45, cy + Math.sin(a) * r * 0.45, r * 0.16, o.huecos); } }
  R.disco(cx, cy, Math.max(1.2, r * 0.16), K); R.disco(cx, cy, Math.max(0.6, r * 0.1), cL); };
// gaviota: vuela (aleteo) o está posada; d dirección
const gaviota = (x, y, t, d = 1, posada = false, k = 0) => { x = Math.round(x); y = Math.round(y);
  const G = hex('#f2f0ea'), GS = hex('#a8b0b8'), GK = hex('#5a6068'), PI = hex('#e8a030');
  if (posada) { R.poligono([[x - 7 * d, y - 3], [x + 4 * d, y - 6], [x + 6 * d, y - 2], [x + 2 * d, y + 1], [x - 5 * d, y]], K); R.poligono([[x - 6 * d, y - 3], [x + 4 * d, y - 5], [x + 5 * d, y - 2], [x + 2 * d, y], [x - 4 * d, y - 1]], G);
    R.linea(x - 6 * d, y - 3, x + 1 * d, y - 3, GS); R.linea(x - 7 * d, y - 3, x - 4 * d, y - 2, GK); R.disco(x + 4 * d, y - 7, 2.6, K); R.disco(x + 4 * d, y - 7, 1.8, G); R.pset(x + 5 * d, y - 8, K);
    rp(Math.min(x + 6 * d, x + 8 * d), y - 7, Math.max(x + 6 * d, x + 8 * d), y - 6, PI); R.pset(x - 1, y + 1, PI); R.pset(x - 1, y + 2, PI); R.pset(x + 1, y + 1, PI); R.pset(x + 1, y + 2, PI); return; }
  const a = Math.sin(t * 9 + k) > 0 ? -3 : 2; R.linea(x - 7, y + a, x - 1, y, K); R.linea(x + 7, y + a, x + 1, y, K); R.linea(x - 6, y + a - 1, x - 1, y - 1, G); R.linea(x + 6, y + a - 1, x + 1, y - 1, G); R.pset(x - 7, y + a, GK); R.pset(x + 7, y + a, GK);
  rp(x - 2, y - 1, x + 2, y + 1, K); rp(x - 1, y - 1, x + 1, y, G); R.pset(x + 3 * d, y - 1, PI); };
// pared de estuco con su trama (y manchas suaves)
const estuco = (x0, y0, x1, y1, c, cS, cL, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = H_(x >> 1, y >> 1, k + 50), w = H_(x >> 3, y >> 3, k + 51); R.pset(x, y, v > 0.9 ? cL : v < 0.08 || (w > 0.82 && v < 0.4) ? cS : c); } };
// papel pintado de rayas con florecitas
const papelPintado = (x0, y0, x1, y1, c, c2, cF, paso = 8) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const m = (x - x0) % paso; let col = m < 3 ? c2 : c; if (m === 5 && (y - y0 + (Math.floor((x - x0) / paso) % 2) * 6) % 12 === 0) col = cF; R.pset(x, y, col); } };
// zócalo de madera con cuarterones (los paneles en relieve)
const zocalo = (x0, y0, x1, y1, c, cS, cL, ancho = 34) => { R.rect(x0, y0, x1, y1, c); R.rect(x0, y0, x1, y0 + 1, cL); R.rect(x0, y0 + 2, x1, y0 + 2, K);
  for (let x = x0 + 4; x + ancho - 6 <= x1; x += ancho) { R.rect(x, y0 + 6, x + ancho - 8, y1 - 5, cS); R.rect(x + 1, y0 + 7, x + ancho - 9, y1 - 6, c); R.rect(x + 1, y0 + 7, x + ancho - 9, y0 + 7, cL); R.rect(x + 1, y0 + 7, x + 1, y1 - 6, cL);
    for (let y = y0 + 9; y < y1 - 7; y += 3) R.pset(x + 4 + ((y * 7) % (ancho - 14)), y, cS); }
  R.rect(x0, y1 - 1, x1, y1, cS); };
// parqué en espiga suave con juntas y brillos
const parque = (x0, y0, x1, y1, c, cS, cL) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const fila = Math.floor((y - y0) / 4), jx = (x + fila * 9) % 22; R.pset(x, y, (y - y0) % 4 === 0 || jx === 0 ? cS : H_(x >> 2, y, 52) > 0.9 ? cL : c); } };
// marco dorado de un cuadro
const marco = (x0, y0, x1, y1) => { R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K); R.rect(x0, y0, x1, y1, hex('#c89a3a')); R.rect(x0, y0, x1, y0, hex('#f0d070')); R.rect(x0, y0, x0, y1, hex('#f0d070')); R.rect(x0 + 2, y0 + 2, x1 - 2, y1 - 2, hex('#8a6020')); R.rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, K); };
// el reloj de pared que anda
const relojPared = (x, y, r, t) => { R.disco(x, y, r + 2, K); R.disco(x, y, r + 1, hex('#8a5a34')); R.disco(x, y, r, hex('#f4ecd8')); for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6; R.pset(Math.round(x + Math.cos(an) * (r - 1.5)), Math.round(y + Math.sin(an) * (r - 1.5)), K); }
  const am = t * 0.8, ah = t * 0.07; R.linea(x, y, x + Math.cos(am - 1.57) * (r - 2), y + Math.sin(am - 1.57) * (r - 2), K); R.linea(x, y, x + Math.cos(ah - 1.57) * (r - 4), y + Math.sin(ah - 1.57) * (r - 4), K); R.pset(x, y, hex('#c83a3a')); };
// pez pequeño
const pez = (x, y, d, c, cS) => { x = Math.round(x); y = Math.round(y); R.rect(x - 3, y - 1, x + 3, y + 1, cS); R.rect(x - 2, y - 1, x + 2, y, c); R.pset(x - 4 * d, y - 1, cS); R.pset(x - 4 * d, y + 1, cS); R.pset(x + 2 * d, y - 1, K); };
'''


# piezas propias del grupo S3 (esfera de bronce, garabatos, fragmentos, regla, lupa, aves, guante de Atom)
MIO = r'''
const ease = (u) => u * u * (3 - 2 * u);
// ruido suave (interpolado) de celda s
const vn = (x, y, s, k = 0) => { const ix = Math.floor(x / s), iy = Math.floor(y / s), fx = ease(x / s - ix), fy = ease(y / s - iy); const a = H_(ix, iy, k), b = H_(ix + 1, iy, k), c = H_(ix, iy + 1, k), d = H_(ix + 1, iy + 1, k); return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy; };
const GUANTE = '#5a8ad0', MANGA_INV = '#4a6a9a', MANGA_INVA = '#8a4a6a';
const BR = hex('#c8963a'), BRS = hex('#8a6020'), BRL = hex('#f0c868'), BRD = hex('#5a3e18');
const VERD = hex('#4a7a5a'), VERDS = hex('#2e5a40'), VERDL = hex('#7aa87a'), VERDLL = hex('#a8c89a');
// pájaro lejano (dos alitas que aletean)
const ave = (x, y, t, k = 0, c = hex('#3a4050')) => { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 10 + k) > 0 ? -1 : 1; R.pset(x, y, c); R.pset(x - 1, y + a, c); R.pset(x - 2, y + a, c); R.pset(x + 1, y + a, c); R.pset(x + 2, y + a, c); };
// una fila de garabatos (inscripción ilegible): x0..x1 en la línea y; col, y una semilla
const garabatos = (x0, x1, y, col, k = 0, alto = 3, hasta = 1e9) => { for (let x = x0, i = 0; x < Math.min(x1, hasta); x += 4, i++) { const v = H_(i, y, k), w = H_(i, y, k + 1);
  if (v < 0.12) continue; R.pset(x, y, col); if (v > 0.4) R.pset(x, y + alto - 1, col); if (w > 0.5) R.pset(x + 1, y + 1, col); else R.pset(x + 1, y, col); if (alto > 2 && w > 0.3) R.pset(x + (w > 0.7 ? 2 : 0), y + 1, col); if (v > 0.75) R.pset(x + 2, y + alto - 1, col); } };
// 12 iconitos del zodiaco (dibujos de 5×5, no glifos)
const ZOD = [
  ['.#.#.', '#...#', '#.#.#', '.###.', '..#..'], ['#...#', '.###.', '#####', '#####', '.###.'], ['.#.#.', '###.#', '.#.##', '.#.#.', '#.#.#'], ['.##..', '#..#.', '.....', '.#..#', '..##.'],
  ['.###.', '#####', '##.#.', '.###.', '.#.#.'], ['..#..', '.###.', '..#..', '.###.', '.#.#.'], ['..#..', '#####', '##.##', '..#..', '.###.'], ['..##.', '....#', '#..#.', '####.', '#.#.#'],
  ['....#', '...#.', '#.#..', '.#...', '#.#..'], ['#....', '##.#.', '.###.', '..##.', '...##'], ['.#.#.', '#.#.#', '.....', '.#.#.', '#.#.#'], ['#...#', '.#.#.', '#####', '.#.#.', '#...#']];
const icZod = (k, x, y, c, s = 1) => { const f = ZOD[k % 12]; for (let j = 0; j < 5; j++) for (let i = 0; i < 5; i++) if (f[j][i] === '#') R.rect(Math.round(x - 2.5 * s + i * s), Math.round(y - 2.5 * s + j * s), Math.round(x - 2.5 * s + i * s) + s - 1, Math.round(y - 2.5 * s + j * s) + s - 1, c); };
// LA ESFERA DE BRONCE de delante (cx, cy, r): anillo de los meses (marquitas), anillo del zodiaco (iconitos), agujas del Sol
// y de la Luna con la bolita de las fases. o.sol y o.luna (ángulos), o.fase (giro de la bolita), o.zod 0–1 y o.cal 0–1 (luz
// que recorre cada anillo), o.icono (true: iconitos aunque sea pequeña), o.mareo (la aguja tiembla)
const esfera = (cx, cy, r, t, o = {}) => {
  const rc0 = r * 0.83, rz0 = r * 0.56, rz1 = rc0 - 1;
  R.disco(cx + 2, cy + 3, r + 2, mez(R.pget(cx, cy + r + 4), K, 0.5));
  R.disco(cx, cy, r + 1, K); R.disco(cx, cy, r, BRS); R.disco(cx - 1, cy - 1, r - 1, BR);
  for (let y = Math.ceil(cy - r); y <= cy + r; y++) for (let x = Math.ceil(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy); if (d > r - 0.5) continue;
    const a = Math.atan2(y - cy, x - cx), luz = Math.cos(a + 2.4);
    let c = d > rc0 ? (luz > 0.55 ? BRL : luz < -0.6 ? BRS : BR) : d > rz0 ? (luz > 0.6 ? mez(BR, BRL, 0.5) : luz < -0.5 ? mez(BR, BRS, 0.6) : mez(BR, hex('#d8a84a'), 0.4)) : (luz > 0.5 ? mez(BR, BRL, 0.3) : BRS);
    if (H_(x, y, 77) > 0.93) c = VERDL; else if (H_(x >> 1, y >> 1, 78) > 0.94) c = VERD;
    if (Math.abs(d - rc0) < 0.6 || Math.abs(d - rz0) < 0.6 || Math.abs(d - (r - 1.2)) < 0.5) c = BRD;
    R.pset(x, y, c); }
  // marquitas de los meses (365 si cabe: una cada 3 px de perímetro) y los 12 cortes
  const nM = Math.min(365, Math.floor(2 * Math.PI * r / 2.2));
  for (let k = 0; k < nM; k++) { const a = k / nM * 2 * Math.PI, rr = r - 2.2; R.pset(Math.round(cx + Math.cos(a) * rr), Math.round(cy + Math.sin(a) * rr), BRD); }
  for (let k = 0; k < 12; k++) { const a = k / 12 * 2 * Math.PI; R.linea(cx + Math.cos(a) * rc0, cy + Math.sin(a) * rc0, cx + Math.cos(a) * (r - 1), cy + Math.sin(a) * (r - 1), BRD);
    if (r > 30) { const am = a + Math.PI / 12, rg = (rc0 + r) / 2; garabatos(Math.round(cx + Math.cos(am) * rg) - 3, Math.round(cx + Math.cos(am) * rg) + 4, Math.round(cy + Math.sin(am) * rg) - 1, BRD, k + 40, 2); }
    const az = a + Math.PI / 12; R.linea(cx + Math.cos(a) * rz0, cy + Math.sin(a) * rz0, cx + Math.cos(a) * rz1, cy + Math.sin(a) * rz1, BRD);
    const rzm = (rz0 + rz1) / 2; if (r > 26 || o.icono) icZod(k, cx + Math.cos(az) * rzm, cy + Math.sin(az) * rzm, BRD, r > 60 ? 2 : 1); }
  // la luz que recorre un anillo (o.zod / o.cal de 0 a 1): una cuña clara
  for (const [v, r0, r1, col] of [[o.zod, rz0, rz1, hex('#fff2b0')], [o.cal, rc0, r - 1, hex('#fff2b0')]]) { if (!(v > 0)) continue; const a1 = -Math.PI / 2 + v * 2 * Math.PI;
    for (let y = Math.ceil(cy - r); y <= cy + r; y++) for (let x = Math.ceil(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy); if (d < r0 + 0.8 || d > r1 - 0.6) continue;
      let a = Math.atan2(y - cy, x - cx); if (a < -Math.PI / 2) a += 2 * Math.PI; if (a <= a1) { const p = R.pget(x, y); R.pset(x, y, p === BRD ? hex('#6a3a10') : mez(p, col, v >= 1 ? 0.45 : 0.55)); } } }
  // los anillos de los planetas (finos) y el centro
  for (const [rr, c] of [[rz0 * 0.75, hex('#d8d8e0')], [rz0 * 0.55, hex('#c86a4a')], [rz0 * 0.38, hex('#e8c060')]]) R.anillo(cx + 0.5, cy + 0.5, rr, mez(c, BRS, 0.35));
  // aguja del Sol: rayito de oro con su solecito
  const as = o.sol ?? 0, al = o.luna ?? 0, tb = o.mareo ? Math.sin(t * 31) * 0.25 * o.mareo : 0;
  const sx = cx + Math.cos(as) * rz1 * 0.98, sy = cy + Math.sin(as) * rz1 * 0.98;
  R.linea(cx, cy + 1, sx, sy + 1, BRD); R.linea(cx, cy, sx, sy, hex('#f6d040')); const rs = Math.max(2, r * 0.07);
  R.disco(sx, sy, rs + 1, K); R.disco(sx, sy, rs, hex('#f6c830')); R.pset(Math.round(sx - 1), Math.round(sy - 1), hex('#fff6c0'));
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + t * 0.5; R.pset(Math.round(sx + Math.cos(a) * (rs + 2)), Math.round(sy + Math.sin(a) * (rs + 2)), hex('#f6d040')); }
  // aguja de la Luna (plata) con la bolita de la fase
  const lx = cx + Math.cos(al + tb) * rz0 * 0.9, ly = cy + Math.sin(al + tb) * rz0 * 0.9;
  R.linea(cx, cy + 1, lx, ly + 1, BRD); R.linea(cx, cy, lx, ly, hex('#d8dce8'));
  const rb = Math.max(2.5, r * 0.11); bolita(lx, ly, rb, o.fase ?? 0);
  R.disco(cx, cy, Math.max(2, r * 0.06), K); R.disco(cx, cy, Math.max(1, r * 0.04), BRL);
  return { sol: [sx, sy], luna: [lx, ly], bolita: [lx, ly, rb] };
};
// la bolita de las fases: mitad plata y mitad negra; f es su giro (0–1 = una vuelta: llena → nueva → llena)
const bolita = (x, y, r, f) => { const fi = f * 2 * Math.PI;
  R.disco(x, y, r + 1, K);
  for (let yy = Math.ceil(y - r); yy <= y + r; yy++) for (let xx = Math.ceil(x - r); xx <= x + r; xx++) { const dx = (xx - x) / r, dy = (yy - y) / r; if (dx * dx + dy * dy > 1) continue;
    const w = Math.sqrt(Math.max(1e-6, 1 - dy * dy)), lam = Math.asin(Math.max(-1, Math.min(1, dx / w))), claro = Math.cos(lam - fi) > 0, d = Math.hypot(dx + 0.35, dy + 0.4);
    R.pset(xx, yy, claro ? (d < 0.35 ? hex('#ffffff') : d < 0.85 ? hex('#e4e6ee') : d < 1.15 ? hex('#c4c8d4') : hex('#9a9eac')) : (d < 0.45 ? hex('#3a3a4a') : d < 0.9 ? hex('#22222e') : hex('#14141c'))); }
  if (r > 3) R.pset(Math.round(x - r * 0.4), Math.round(y - r * 0.5), hex('#ffffff')); };
// fragmento de bronce corroído: polígono con verdín a manchas, grietas y un canto de bronce
const fragmento = (pts, k = 0, o = {}) => {
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  R.poligono(pts.map(([x, y]) => [x + 2, y + 3]), o.sombra ?? mez(R.pget((x0 + x1) >> 1, y1 + 2), K, 0.55));
  R.poligono(pts.map(([x, y]) => [x + (x < (x0 + x1) / 2 ? -1 : 1), y + (y < (y0 + y1) / 2 ? -1 : 1)]), K);
  R.poligono(pts, (x, y) => { const v = H_(x >> 1, y >> 1, k), w = H_(x >> 2, y >> 2, k + 3), u = H_(x, y, k + 5), luz = ((x - x0) / (x1 - x0 + 1)) * 0.5 + ((y - y0) / (y1 - y0 + 1)) * 0.5;
    if (u > 0.96) return VERDLL; if (w > 0.8 && v > 0.5) return hex('#8a6a3a'); if (v > 0.84) return VERDL; if (v < 0.1 || luz > 0.82) return VERDS; if (w < 0.12) return hex('#5a8a62'); return luz < 0.3 ? mez(VERD, VERDL, 0.4) : VERD; });
  for (let i = 0; i < 3; i++) { let x = x0 + (x1 - x0) * H_(i, k, 9), y = y0 + 2; for (let s = 0; s < (y1 - y0) * 0.7; s++) { const nx = x + (H_(i, s, k + 11) - 0.5) * 2.2; y += 1; x = nx; if (R.pget(Math.round(x), Math.round(y)) !== K) R.pset(Math.round(x), Math.round(y), VERDS); } } };
// destello de cuatro puntas
const destello = (x, y, s, c = hex('#fff6c0')) => { x = Math.round(x); y = Math.round(y); if (s <= 0) return; const n = Math.round(1 + s * 3); R.linea(x - n, y, x + n, y, c); R.linea(x, y - n, x, y + n, c); if (s > 0.5) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y + 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); } R.pset(x, y, hex('#ffffff')); };
// rueda dentada pequeña rápida (para insertos): igual que rueda() pero con dientes cuadrados de 1 px si r < 8
const ruedita = (cx, cy, r, n, ang, c, cS, cL) => rueda(cx, cy, r, n, ang, c, cS, cL, { diente: Math.max(1.4, r * 0.16) });
// bocadillo con un icono (para dudas y sustos)
const icoBoca = (x, y, ic, c = hex('#3a6ac8')) => { R.disco(x, y, 7, K); R.disco(x, y, 6, BL); R.poligono([[x - 2, y + 5], [x + 2, y + 5], [x - 3, y + 10]], K); R.poligono([[x - 1, y + 5], [x + 1, y + 5], [x - 2, y + 8]], BL); R.icono(ic, x - (ic === '!' ? 1 : 2), y - 4, c, BL, 1); };
'''


E['ak-escaner'] = ('El escáner', '''// AK-ESCANER (frases 13–15), 2005, cartela «2005». Nueve planos:
// 1. (0 → «brought») la fachada neoclásica del museo de Atenas de día: el camión entra con la caja enorme del «8» y frena
//    (las palomas se espantan); en «a team» llegan los dos investigadores por la acera y ella señala la caja;
// 2. («brought» → pausa) museo 'escaner' general: el escáner llega por el pasillo y se encaja en la puerta con un píxel de
//    margen (gag 5): él le hace señas, ella se tapa la sorpresa y le cae una gota; cruza y aplauden («too fragile»);
// 3. (pausa → «on») museo 'pantalla': la raya de luz baja y descubre las ruedas; en «letters» sale el recuadro con las
//    filas de garabatos; una mano en el ratón hace clic;
// 4. («on» → «They're») el fragmento de bronce de cerca: la luz recorre la corrosión y aparecen en oro las filas de
//    garabatos («hidden under the corrosion»); en «millimeter» la mano mete la regla y la lupa marca la altura: «1»;
// 5. («They're» → «With», año 2026) el escritorio de Atom de noche: su guante toca la pantalla del escáner y la imagen se
//    vuelve un manual que pasa páginas («user's manual»);
// 6. («With» → «82», plano añadido) la mesa de luz: las tres láminas (ruedas, esfera, garabatos) se encienden en «gears»,
//    «dials», «texts» y en «together» se juntan; en «rebuild» las ruedas del dibujo giran; ella señala, él sonríe;
// 7. («82» → «The largest») cenital de la mesa de fieltro con los 82 fragmentos en cajitas; las pinzas dejan el último;
//    «82»; en «30» se encienden las ruedas escondidas, una a una, y sale el «30»;
// 8. («The largest» → «wheel») el engranaje más grande sobre terciopelo con un foco; la mano canónica se posa a su lado en
//    «palm» (≈); en «behind it» se enciende detrás el borde de una rueda enorme;
// 9. («wheel» → fin) maquina 'atras' cámara 'rueda': la rueda de 223 dientes gira y el contador sube hasta 223 en
//    «teeth»; la mano toca los dientes y en «That number» el contador destella.''', PRE + MIO + r'''
const A = (s) => en('escaner', (s - 1.5) / 11.954), Bl = (s) => en('letras', (s - 14.401) / 12.849), Cp = (s) => en('piezas', (s - 28.529) / 17.012);
const P2 = A(6.86), P3 = A(13.95), P4 = Bl(19.22), P5 = Bl(24.54), P6 = Cp(28.53), P7 = Cp(33.86), P8 = Cp(37.67), P9 = Cp(41.58);

// ── 1 · la fachada del museo con el camión ──
const fachadaFondo = () => capa('fachada', () => {
  degr(0, 0, 319, 76, [hex('#4a86ca'), hex('#62a0da'), hex('#84bae6'), hex('#aed4ee')]);
  // el Licabeto al fondo, con su capillita, y la ciudad blanca
  for (let x = 176; x <= 319; x++) { const h = 64 - Math.round(17 * Math.exp(-(((x - 236) / 28) ** 2))); for (let y = h; y <= 80; y++) R.pset(x, y, H_(x >> 1, y >> 1, 3) > 0.78 ? hex('#6a8a62') : y < h + 2 ? hex('#9ab48a') : hex('#82a072')); }
  rp(233, 45, 238, 48, hex('#f2efe6')); R.pset(235, 44, hex('#f2efe6')); R.pset(235, 43, hex('#c8c0b0'));
  for (let x = 0; x < 320; x += 7) { const hgt = 4 + Math.floor(H_(x, 1, 4) * 6), y = 76 - hgt; rp(x, y, x + 5, 80, H_(x, 2, 4) > 0.5 ? hex('#ece8de') : hex('#dcd6c8')); R.pset(x + 2, y + 2, hex('#7a8a9a')); }
  // las alas del museo: estuco ocre claro, cornisa terracota con dentículos, ventanas altas en arco
  const ala = (x0, x1) => {
    estuco(x0, 76, x1, 134, hex('#e8d6b2'), hex('#cdb68e'), hex('#f6e8cc'), x0);
    rp(x0, 70, x1, 72, hex('#8a3a26')); rp(x0, 73, x1, 77, hex('#b0583a')); for (let x = x0; x <= x1; x += 3) R.pset(x, 76, hex('#6a2a1a')); rp(x0, 78, x1, 78, hex('#cdb68e'));
    for (let x = x0 + 6; x + 9 <= x1 - 2; x += 19) {
      rp(x - 1, 87, x + 10, 119, hex('#f6ead0')); rp(x, 89, x + 9, 118, hex('#2c3a4c')); R.disco(x + 4.5, 89, 5, hex('#f6ead0')); R.disco(x + 4.5, 90, 4, hex('#2c3a4c'));
      rp(x + 4, 86, x + 5, 118, hex('#e0d0b0')); rp(x, 103, x + 9, 103, hex('#e0d0b0')); R.linea(x + 1, 116, x + 3, 92, hex('#5a7a9a')); R.pset(x + 7, 94, hex('#8ab0d0'));
      rp(x - 2, 119, x + 11, 121, hex('#d4c09a')); rp(x - 2, 122, x + 11, 122, hex('#a89070')); }
    rp(x0, 123, x1, 134, hex('#b8ae9c')); for (let y = 123; y <= 134; y += 4) rp(x0, y, x1, y, hex('#968c7a')); for (let x = x0; x <= x1; x += 9) for (let y = 124; y <= 134; y++) if (((y - 124) >> 2) % 2 === (x >> 3) % 2) R.pset(x, y, hex('#968c7a'));
  };
  ala(0, 106); ala(214, 319);
  // el pórtico: muro en sombra, puerta abierta, cuatro columnas jónicas, entablamento y frontón
  estuco(106, 70, 214, 122, hex('#c8b08a'), hex('#a8906c'), hex('#d8c4a0'), 9);
  rp(150, 92, 170, 122, hex('#f0e6cc')); rp(152, 94, 168, 122, hex('#2a1e16')); rp(152, 94, 154, 122, hex('#6a4a2a')); rp(166, 94, 168, 122, hex('#6a4a2a')); rp(156, 104, 164, 122, hex('#3e2e22'));
  for (const wx of [118, 192]) { rp(wx - 1, 88, wx + 9, 112, hex('#e8dcc0')); rp(wx, 90, wx + 8, 111, hex('#2c3a4c')); rp(wx + 4, 90, wx + 4, 111, hex('#d8c8a8')); }
  for (const cx of [127, 149, 171, 193]) {
    for (let y = 72; y <= 119; y++) for (let x = cx - 4; x <= cx + 4; x++) R.pset(x, y, x === cx - 4 ? hex('#fbf8f0') : x >= cx + 3 ? hex('#b4ac9c') : (x - cx) % 2 === 0 ? hex('#d8d2c4') : hex('#f2eee4'));
    rp(cx - 7, 69, cx + 7, 72, hex('#f2eee4')); R.disco(cx - 6, 72, 1.6, hex('#b4ac9c')); R.disco(cx + 6, 72, 1.6, hex('#b4ac9c')); R.pset(cx - 6, 72, hex('#fbf8f0')); R.pset(cx + 6, 72, hex('#fbf8f0'));
    rp(cx - 6, 118, cx + 6, 121, hex('#e6e0d2')); rp(cx - 6, 121, cx + 6, 121, hex('#a8a090')); }
  rp(104, 62, 216, 69, hex('#efe4c8')); rp(104, 64, 216, 66, hex('#b0583a')); for (let x = 106; x < 216; x += 6) rp(x, 64, x + 1, 66, hex('#e6d8b8')); rp(104, 69, 216, 69, hex('#a89070'));
  R.poligono([[102, 62], [160, 42], [218, 62]], K); R.poligono([[104, 61], [160, 43], [216, 61]], hex('#efe4c8')); R.poligono([[113, 59], [160, 47], [207, 59]], hex('#d4c09c'));
  for (let i = 0; i < 9; i++) { const x = 128 + i * 8, y = 58 - Math.round(Math.min(i, 8 - i) * 1.2); rp(x, y - 2, x + 3, 59, hex('#c4ae88')); R.pset(x + 1, y - 2, hex('#e8dcc0')); }
  rp(158, 39, 162, 42, hex('#efe4c8')); rp(101, 59, 106, 62, hex('#efe4c8')); rp(214, 59, 219, 62, hex('#efe4c8'));
  // escalinata
  for (let i = 0; i < 6; i++) { const y = 122 + i * 2; rp(112 - i * 3, y, 208 + i * 3, y + 1, i % 2 ? hex('#e6dece') : hex('#d2c8b6')); rp(112 - i * 3, y + 1, 208 + i * 3, y + 1, hex('#b0a690')); }
  // la explanada de losas bajo la escalinata
  for (let y = 134; y <= 141; y++) for (let x = 100; x < 220; x++) R.pset(x, y, (y - 134) % 4 === 0 || (x + (y > 137 ? 5 : 0)) % 10 === 0 ? hex('#b8ae9a') : H_(x, y, 18) > 0.9 ? hex('#e6dece') : hex('#d4cab8'));
  // jardín: setos con flores y césped
  for (let x = 0; x < 320; x++) { if (x > 100 && x < 220) continue; const hgt = 7 + Math.round(H_(x >> 2, 0, 12) * 3); for (let y = 141 - hgt; y <= 141; y++) R.pset(x, y, H_(x, y, 13) > 0.86 ? hex('#5a9a4a') : H_(x >> 1, y >> 1, 14) > 0.5 ? hex('#3a7a3a') : hex('#2e6232'));
    if (H_(x, 7, 15) > 0.82) R.pset(x, 141 - hgt + 2, [hex('#e84a6a'), hex('#f6e04a'), hex('#f6f2e6')][x % 3]); }
  // acera de losas y bordillo
  for (let y = 142; y <= 151; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y - 142) % 5 === 0 || (x + (y > 146 ? 6 : 0)) % 12 === 0 ? hex('#a8a090') : H_(x, y, 16) > 0.9 ? hex('#d8d0c0') : hex('#c4bcac'));
  rp(0, 152, 319, 153, hex('#e2dcd0')); rp(0, 154, 319, 154, hex('#6a6a70'));
  // calzada: asfalto con grano, rayas, una tapa de alcantarilla y una mancha
  for (let y = 155; y <= 179; y++) for (let x = 0; x < 320; x++) { const v = H_(x, y, 17); R.pset(x, y, v > 0.93 ? hex('#6a6a74') : v < 0.06 ? hex('#34343c') : hex('#4a4a54')); }
  for (let x = 4; x < 320; x += 26) rp(x, 167, x + 13, 168, hex('#e8e4d8'));
  R.disco(90, 174, 4, hex('#2a2a30')); R.anillo(90.5, 174.5, 3, hex('#5a5a64')); rp(88, 174, 92, 174, hex('#5a5a64'));
  rp(0, 155, 319, 155, hex('#3a3a42'));
});
const palmera = (x, y, t, k) => { const sw = Math.sin(t * 1.3 + k) * 1.5;
  for (let i = 0; i <= 48; i++) { const yy = y - i, xx = x + Math.sin(i / 30) * 5 + sw * (i / 48); rp(xx - 2, yy, xx + 2, yy, i % 4 === 0 ? hex('#6a4a2a') : hex('#9a7048')); R.pset(Math.round(xx + 2), yy, hex('#5a3a1e')); }
  const tx = x + Math.sin(48 / 30) * 5 + sw, ty = y - 48;
  for (let f = 0; f < 8; f++) { const a = -Math.PI / 2 + (f - 3.5) * 0.42 + Math.sin(t * 1.6 + f + k) * 0.06, L = 20 + (f % 2) * 5;
    for (let s = 0; s <= L; s++) { const px = tx + Math.cos(a) * s, py = ty + Math.sin(a) * s + (s * s) / 40; R.pset(Math.round(px), Math.round(py), hex('#2e6a2e'));
      if (s > 3 && s % 2 === 0) { R.pset(Math.round(px), Math.round(py + 2), hex('#4a8a3a')); R.pset(Math.round(px + 1), Math.round(py + 1), hex('#3a7a32')); } } }
  R.disco(tx, ty + 1, 2.5, hex('#6a4a2a')); };
const camion = (x, t, mov) => { x = Math.round(x);
  // caja de carga: la caja de madera enorme con el «8», flejes amarillos y flechas
  rp(x + 26, 150, x + 122, 156, hex('#3a3a40')); rp(x + 26, 146, x + 122, 149, hex('#7a5232')); rp(x + 26, 146, x + 122, 146, hex('#a0703e'));
  const c0 = x + 32, c1 = x + 118; R.rect(c0 - 1, 103, c1 + 1, 146, K); tablasV(c0, 104, c1, 145, 7, hex('#c89a5a'), hex('#a07840'), hex('#e0b878'), 21);
  rp(c0, 104, c1, 107, hex('#8a6434')); rp(c0, 142, c1, 145, hex('#8a6434')); rp(c0, 104, c0 + 3, 145, hex('#8a6434')); rp(c1 - 3, 104, c1, 145, hex('#8a6434'));
  R.linea(c0 + 3, 141, c1 - 3, 108, hex('#8a6434')); R.linea(c0 + 3, 142, c1 - 3, 109, hex('#6a4a24'));
  for (const fx of [c0 + 16, c1 - 16]) { rp(fx, 103, fx + 2, 146, hex('#e8c030')); rp(fx + 2, 103, fx + 2, 146, hex('#a8861a')); }
  R.rect(c0 + 34, 113, c0 + 54, 137, hex('#e8d8b0')); R.numero('8', c0 + 44, 134, { tam: 16, centro: true, color: hex('#2a2018') });
  for (const ax of [c0 + 8, c1 - 8]) { R.linea(ax, 112, ax, 120, K); R.linea(ax - 2, 114, ax, 112, K); R.linea(ax + 2, 114, ax, 112, K); }
  // copa frágil (pictograma)
  { const gx = c1 - 26, gy = 112; rp(gx - 3, gy, gx + 3, gy + 3, hex('#c83a3a')); rp(gx, gy + 4, gx, gy + 7, hex('#c83a3a')); rp(gx - 2, gy + 8, gx + 2, gy + 8, hex('#c83a3a')); }
  // cabina
  R.rect(x - 1, 125, x + 27, 162, K); rp(x, 126, x + 26, 161, hex('#e8ecf0')); rp(x, 150, x + 26, 161, hex('#c8ced6')); rp(x + 24, 126, x + 26, 161, hex('#b4bcc6'));
  rp(x + 2, 129, x + 12, 142, hex('#3a5a7a')); R.linea(x + 3, 140, x + 9, 130, hex('#8ab4d8')); rp(x + 15, 129, x + 23, 141, hex('#3a5a7a')); R.disco(x + 19, 136, 2, hex('#e0b090')); rp(x + 17, 133, x + 21, 134, hex('#4a3020'));
  rp(x + 15, 145, x + 18, 145, K); rp(x - 3, 155, x + 4, 160, hex('#8a8e96')); rp(x - 1, 150, x + 1, 152, hex('#f6e070')); rp(x + 4, 152, x + 9, 156, hex('#5a5e66'));
  rp(x + 1, 124, x + 25, 125, hex('#c83a3a'));
  rp(x + 27, 118, x + 29, 146, hex('#7a7e86')); R.pset(x + 28, 117, hex('#3a3a40'));
  // ruedas que giran
  for (const wx of [x + 13, x + 84, x + 104]) { R.disco(wx, 160, 7, K); R.disco(wx, 160, 6, hex('#2a2a30')); R.disco(wx, 160, 3, hex('#a8acb4')); const a = -x / 6; for (let k = 0; k < 3; k++) R.linea(wx, 160, wx + Math.cos(a + k * 2.1) * 3, 160 + Math.sin(a + k * 2.1) * 3, hex('#5a5e66')); }
  // humo del tubo
  for (let i = 0; i < 4; i++) { const f = ((t * 0.9 + i / 4) % 1), r = 1.5 + f * (mov ? 3 : 2); if (f < 0.9) R.disco(x + 28 + f * 12 + Math.sin(t * 3 + i) * 2, 114 - f * 22, r, mez(hex('#d8d8dc'), hex('#a8b0c0'), f)); }
};
const coche = (x, y, col) => { x = Math.round(x); R.rect(x - 1, y - 9, x + 27, y, K); rp(x, y - 8, x + 26, y - 1, hex(col)); rp(x + 6, y - 14, x + 19, y - 8, hex(col)); R.rect(x + 5, y - 15, x + 20, y - 15, K);
  rp(x + 7, y - 13, x + 12, y - 9, hex('#9ac4e4')); rp(x + 14, y - 13, x + 18, y - 9, hex('#9ac4e4')); rp(x, y - 8, x + 26, y - 8, mez(hex(col), BL, 0.4)); rp(x + 25, y - 6, x + 26, y - 5, hex('#f6e070'));
  for (const wx of [x + 6, x + 21]) { R.disco(wx, y, 3, K); R.disco(wx, y, 1.5, hex('#a8acb4')); } };
const p1 = (t) => {
  fachadaFondo();
  // nubes de tres tonos a tres velocidades (lejos del año y de Atom) y pájaros
  for (const [b, y, w, v] of [[30, 34, 34, 2.2], [150, 30, 26, 3.4], [230, 42, 40, 1.4], [90, 52, 22, 4.6]]) nube3(((b + t * v) % 300) - 40, y, w, hex('#b8c8dc'), hex('#e6eef6'), hex('#ffffff'));
  for (let i = 0; i < 4; i++) ave(((40 + i * 9 + t * 14) % 360) - 20, 46 + (i % 2) * 4 + Math.sin(t * 2 + i) * 2, t, i);
  palmera(54, 140, t, 0); palmera(270, 140, t, 2);
  // gente pequeña en el pórtico (visitantes que suben)
  for (let i = 0; i < 2; i++) { const f = ((t * 0.08 + i * 0.5) % 1), x = Math.round(lerp(120 + i * 40, 160, f)), y = Math.round(lerp(134, 122, f)); rp(x, y - 6, x + 2, y, i ? hex('#c84a4a') : hex('#3a6aa8')); R.pset(x + 1, y - 7, hex('#e0b090')); }
  // palomas en la acera: se espantan cuando llega el camión
  const sp = tramo(t, A(2.6), A(4.2));
  for (let i = 0; i < 4; i++) { const bx = 150 + i * 13, by = 149 - Math.round(sp * (40 + i * 10)), px = bx - Math.round(sp * (30 + i * 12));
    if (sp <= 0) { const pk = Math.sin(t * 6 + i * 2) > 0.6 ? 1 : 0; rp(px - 2, by - 3 + pk, px + 2, by - 1, hex('#8a8e9a')); R.pset(px + 2, by - 4 + pk * 2, hex('#6a6e7a')); R.pset(px + 3, by - 3 + pk * 2, hex('#e8a030')); R.pset(px, by, hex('#c86a4a')); }
    else ave(px, by, t, i, hex('#6a6e7a')); }
  // los investigadores llegan por la acera; ella señala la caja en «researchers»
  const u = tramo(t, A(4.6), A(6.1)), ap = t > A(6.25);
  R.actor(EL.investigadorAK, Math.round(lerp(-30, 104, ease(u))), 151, t, { dir: 1, anda: u > 0 && u < 1, habla: ap && Math.sin(t * 7) > 0, sonrisa: u >= 1 && !ap });
  R.actor(EL.investigadoraAK, Math.round(lerp(-14, 134, ease(u))), 151, t, { dir: 1, anda: u > 0 && u < 1, dedo: ap, sorpresa: u >= 1 && !ap });
  // el camión entra, frena y se balancea
  const c = tramo(t, 0.15, A(3.4)), xc = lerp(330, 170, 1 - (1 - c) * (1 - c)), bal = c >= 1 ? Math.round(Math.sin((t - A(3.4)) * 9) * Math.max(0, 1 - (t - A(3.4)) * 1.5)) : 0;
  camion(xc + bal, t, c < 1);
  // un coche que pasa por el carril de delante
  const v = tramo(t, A(3.9), A(6.6)); if (v > 0 && v < 1) coche(lerp(-40, 340, v), 179, '#c8483a');
};

// ── 2 · el escáner por la puerta (gag 5) ──
const p2 = (t) => {
  const a = tramo(t, P2 + 0.05, A(8.6)), b = tramo(t, A(8.6), A(11.2)), c = tramo(t, A(11.2), A(13.3));
  const entra = a < 1 ? 0.3 * ease(a) : b < 1 ? 0.3 + 0.2 * b : 0.5 + 0.12 * ease(c);
  const o = { encuadre: 'escaner', entra };
  T.museo(R, t, o);
  const apr = b > 0 && b < 1, paso = c > 0.15;
  R.actor(EL.investigadorAK, 122, 160, t, { dir: -1, brazos: apr && Math.sin(t * 6) > 0, dedo: a > 0 && a < 1, sonrisa: paso, salto: paso && c < 0.6 ? Math.round(Math.abs(Math.sin(c * 12)) * 3) : 0 });
  R.actor(EL.investigadoraAK, 170, 160, t, { dir: -1, sorpresa: apr, sonrisa: paso, brazos: paso && c < 0.7, habla: !apr && !paso && Math.sin(t * 5) > 0.2 });
  if (apr) { const gy = 128 + Math.round(((t * 1.5) % 1) * 8); R.disco(178, gy, 1.5, hex('#8ad0f0')); R.pset(178, gy - 2, hex('#8ad0f0')); R.pset(177, gy, BL); }
  T.museoDelante(R, t, o);
};

// ── 3 · la pantalla: las ruedas y las letras ──
const p3 = (t) => {
  const o = { encuadre: 'escaner', camara: 'pantalla', corte: tramo(t, P3 + 0.3, Bl(16.3)), letras: tramo(t, Bl(16.55), Bl(19.0)) };
  T.museo(R, t, o);
  const clic = (t > Bl(16.5) && t < Bl(16.7)) || (t > Bl(14.55) && t < Bl(14.75)) ? 1 : 0, dx = Math.round(Math.sin(t * 0.9) * 3);
  T.brazo(R, 282 + dx, 186, 240 + dx, 165 + clic, MANGA_INV, -1, { codo: [262 + dx, 178] });
  T.museoDelante(R, t, o);
};

// ── 4 · el fragmento con sus letras diminutas y la regla ──
const FRAG = [[66, 52], [104, 36], [150, 42], [196, 30], [236, 50], [250, 84], [238, 118], [204, 132], [150, 128], [110, 136], [74, 118], [58, 84]];
// una «letra» grabada (garabato de 3×5 que no se lee): s escala
// patrones de ruido de 3×5 (6–9 puntos), sin formas de letra: rasguños y ganchitos que no se leen
const LET = []; for (let k = 0; k < 24; k++) { const f = []; for (let j = 0; j < 5; j++) { let row = ''; for (let i = 0; i < 3; i++) row += H_(i + k * 5, j, 72) > (j === 0 || j === 4 ? 0.62 : 0.5) ? '#' : '.'; f.push(row); } if (k % 3 === 0) f[4] = '.' + f[4].slice(1); LET.push(f); }
const letra = (x, y, k, col, s = 1) => { const f = LET[k % LET.length]; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (f[j][i] === '#') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, col); };
const FILAS = []; for (let r = 0; r < 7; r++) for (let x = 86 + (r % 2) * 3; x < 230; x += 5) { const k = Math.floor(H_(x, r, 70) * 40); if (k < 3 || x > 200 + r * 4 && r > 4) continue; FILAS.push([x, 50 + r * 11, k]); }
const fragFondo = () => capa('fragmento', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = H_(x, y, 60), w = H_(x >> 2, y >> 2, 61), d = Math.hypot(x - 150, y - 80) / 240;
    R.pset(x, y, mez(v > 0.88 ? hex('#34466a') : w > 0.8 ? hex('#2a3a5c') : (x + y) % 3 === 0 ? hex('#29375a') : hex('#26344f'), hex('#0e1424'), Math.min(0.75, d * d * 1.8))); }
  // cosas sobre el fieltro: pinzas, pincel, cajita con algodón y fragmentito, etiqueta con su número
  R.linea(18, 168, 54, 148, hex('#9aa0aa')); R.linea(19, 170, 56, 149, hex('#c8ccd4')); R.linea(20, 171, 55, 151, hex('#6a707a'));
  rp(268, 158, 300, 161, hex('#a87a4a')); rp(268, 158, 300, 158, hex('#d0a070')); rp(296, 155, 312, 164, hex('#3a2a1e')); for (let i = 0; i < 6; i++) R.linea(304, 156 + i, 318, 154 + i * 2, hex('#2a1e14'));
  R.rect(270, 112, 308, 140, K); rp(271, 113, 307, 139, hex('#e8e0cc')); rp(274, 116, 304, 136, hex('#f6f2e6')); for (let i = 0; i < 18; i++) R.pset(275 + Math.floor(H_(i, 1, 62) * 28), 117 + Math.floor(H_(i, 2, 62) * 18), hex('#d8d2c4'));
  fragmento([[280, 124], [290, 120], [298, 126], [294, 134], [282, 132]], 63);
  R.rect(262, 92, 296, 106, K); rp(263, 93, 295, 105, hex('#f2ecd8')); R.numero('19', 279, 103, { centro: true, color: hex('#3a3a48') });
  // el fragmento grande: verdín en manchas grandes, costras, zonas de bronce y grietas
  const xs = FRAG.map((q) => q[0]), ys = FRAG.map((q) => q[1]);
  R.poligono(FRAG.map(([x, y]) => [x + 3, y + 4]), hex('#141c30'));
  R.poligono(FRAG.map(([x, y]) => [x + (x < 154 ? -1 : 1), y + (y < 84 ? -1 : 1)]), K);
  R.poligono(FRAG, (x, y) => { const g = vn(x, y, 9, 65), g2 = vn(x, y, 4, 66), f = H_(x, y, 67), luz = (x - 58) / 192 * 0.5 + (y - 30) / 106 * 0.5;
    if (g > 0.7 && g2 > 0.45) return f > 0.7 ? hex('#c89a52') : hex('#a8783a');
    if (g < 0.25) return f > 0.6 ? hex('#2a4a34') : VERDS;
    if (g2 > 0.8) return VERDLL; if (g2 > 0.66) return VERDL; if (f > 0.93) return hex('#d8e8c8');
    return luz > 0.72 ? mez(VERD, VERDS, 0.45) : luz < 0.3 ? mez(VERD, VERDL, 0.35) : VERD; });
  for (const [x0, y0, x1, y1] of [[120, 40, 132, 132], [204, 34, 196, 128], [62, 96, 140, 92]]) { let x = x0, y = y0; const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)); for (let i = 0; i <= n; i++) { const px = Math.round(lerp(x0, x1, i / n) + Math.sin(i * 0.7) * 2), py = Math.round(lerp(y0, y1, i / n)); R.pset(px, py, hex('#1e3a2a')); R.pset(px + 1, py, VERDL); } }
  // las filas grabadas, oscuras (apenas se ven bajo el verdín)
  for (const [x, y, k] of FILAS) letra(x, y, k, mez(VERD, VERDS, 0.55));
  // la lámpara arriba (su pie) y su luz cálida
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 150, y - 70); if (d < 150 && ((x ^ y) & 1)) R.pset(x, y, mez(R.pget(x, y), hex('#fff0c8'), 0.06 * (1 - d / 150))); }
});
const p4 = (t) => {
  fragFondo();
  // la luz que barre la corrosión y deja las letras en oro (con su sombra de grabado)
  const bx = lerp(50, 260, tramo(t, Bl(19.5), Bl(21.3)));
  for (const [x, y, k] of FILAS) if (x < bx) { letra(x + 1, y + 1, k, hex('#1e3a2a')); letra(x, y, k, H_(x, y, 71) > 0.8 && Math.sin(t * 4 + x) > 0.6 ? hex('#fff6c0') : hex('#f2d060')); }
  if (bx > 52 && bx < 258) for (let y = 28; y <= 140; y++) for (let x = Math.round(bx) - 4; x <= bx + 4; x++) { const p = R.pget(x, y); R.pset(x, y, mez(p, hex('#e8f4ff'), 0.5 - Math.abs(x - bx) * 0.1)); }
  T.motas(R, t, 60, 250, 30, 140, 16, hex('#9ab0d0'));
  // la regla de milímetros que entra con la mano en «millimeter»
  const g = ease(tramo(t, Bl(22.0), Bl(23.0))), ry = Math.round(lerp(196, 144, g));
  if (g > 0) {
    R.rect(40, ry - 1, 296, ry + 13, K); rp(41, ry, 295, ry + 12, hex('#c8ccd4')); rp(41, ry, 295, ry + 1, hex('#eef0f4')); rp(41, ry + 11, 295, ry + 12, hex('#9aa0aa'));
    for (let k = 0; k <= 120; k++) { const x = 46 + k * 2, L = k % 10 === 0 ? 6 : k % 5 === 0 ? 4 : 2; rp(x, ry + 1, x, ry + L, hex('#2a2a34')); if (k % 10 === 0 && k <= 110) R.numero(String(k / 10), x, ry + 12, { centro: true, color: hex('#2a2a34'), fina: true }); }
    T.brazo(R, 330, ry + 34, 302, ry + 7, MANGA_INV, -1, { codo: [324, ry + 18] });
  }
  // la lupa sobre la primera fila: tres letras enormes y la cota de 1 mm
  const lu = ease(tramo(t, Bl(22.7), Bl(23.3)));
  if (lu > 0) { const lx = 74, ly = 64, lr = Math.max(2, Math.round(26 * lu));
    R.disco(lx + 3, ly + 4, lr + 3, hex('#141c30')); R.disco(lx, ly, lr + 3, K); R.disco(lx, ly, lr + 2, hex('#3a3a42'));
    R.recorte([lx - lr, ly - lr, lx + lr, ly + lr]);
    for (let y = ly - lr; y <= ly + lr; y++) for (let x = lx - lr; x <= lx + lr; x++) if (Math.hypot(x - lx, y - ly) <= lr) R.pset(x, y, vn(x, y, 12, 80) > 0.68 ? VERDL : vn(x, y, 7, 81) < 0.28 ? VERDS : VERD);
    // dos garabatos ampliados: cuñas y puntos grabados (no se leen como letra)
    for (const [gx, k] of [[lx - 21, 5], [lx - 7, 13]]) for (let q = 0; q < 3; q++) { const x = gx + Math.round(H_(q, k, 90) * 8), y = ly - 10 + q * 5 + Math.round(H_(q, k, 91) * 2), d = H_(q, k, 92) > 0.5 ? 1 : -1;
      R.poligono([[x + 1, y + 1], [x + 1 + d * 5, y - 1], [x + 1 + d * 5, y + 4]], hex('#1e3a2a')); R.poligono([[x, y], [x + d * 5, y - 2], [x + d * 5, y + 3]], hex('#f2d060')); R.linea(x + d * 5, y, x + d * 8, y + (q % 2 ? 2 : -1), hex('#f2d060')); }
    R.recorte(null);
    if (lu >= 1) { const c = BL; R.linea(lx + 8, ly - 10, lx + 8, ly + 6, c); R.linea(lx + 6, ly - 10, lx + 10, ly - 10, c); R.linea(lx + 6, ly + 6, lx + 10, ly + 6, c);
      R.rect(lx + 12, ly - 7, lx + 23, ly + 4, K); rp(lx + 13, ly - 6, lx + 22, ly + 3, BL); R.numero('1', lx + 18, ly + 2, { centro: true, color: hex('#2a2a34') }); }
    R.anillo(lx + 0.5, ly + 0.5, lr + 1, hex('#a8acb4')); R.anillo(lx + 0.5, ly + 0.5, lr + 2, hex('#5a5a62'));
    R.linea(lx - lr * 0.55, ly - lr * 0.7, lx - lr * 0.75, ly - lr * 0.45, BL);
    const mx = lx - lr * 0.72, my = ly + lr * 0.72; for (let i = 0; i < 18; i++) rp(mx - i * 0.8 - 2, my + i * 0.9, mx - i * 0.8 + 2, my + i * 0.9, i % 5 ? hex('#5a3a22') : hex('#3a2414'));
  }
};

// ── 5 · el escritorio de Atom: la pantalla del escáner se vuelve un manual ──
const p5 = (t) => {
  const o = { encuadre: 'ordenador' };
  const g5 = T.hoy(R, t, o), PANT = (g5.pantallas && g5.pantallas[0]) || [128, 102, 186, 134];
  // el manual en la pantalla del escáner (recortado a su hueco)
  const toca = Bl(24.75), m = tramo(t, toca, toca + 0.4), hoja = t < Bl(25.4) ? 0 : t < Bl(26.8) ? 1 : 2;
  if (m > 0) { const [x0, y0, x1, y1] = PANT; R.recorte([x0, y0, x1, y1]);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(R.pget(x, y), hex('#f2ecda'), m));
    if (m >= 1) { const xm = (x0 + x1) >> 1; rp(xm - 1, y0, xm, y1, hex('#c8bea8'));
      for (const [px, k] of [[x0 + 3, hoja * 2], [xm + 2, hoja * 2 + 1]]) {
        if (k % 3 === 0) { rueda(px + 12, y0 + 12, 7, 12, t * 0.8, hex('#d8a84a'), hex('#8a6020'), hex('#f0c868')); rueda(px + 22, y0 + 18, 4, 8, -t * 1.4, hex('#d8a84a'), hex('#8a6020'), hex('#f0c868')); }
        else if (k % 3 === 1) { R.anillo(px + 13, y0 + 14, 9, hex('#8a6020')); R.anillo(px + 13, y0 + 14, 6, hex('#8a6020')); R.linea(px + 13, y0 + 14, px + 13 + Math.cos(t) * 6, y0 + 14 + Math.sin(t) * 6, hex('#c83a3a')); }
        else { for (let i = 0; i < 3; i++) R.anillo(px + 13, y0 + 14, 3 + i * 3, hex('#8a6020')); }
        for (let r = 0; r < 4; r++) garabatos(px, px + 24, y0 + 26 + r * 2, hex('#4a4038'), k * 10 + r, 2);
      }
      const pg = tramo(t, Bl(25.4), Bl(25.7)) % 1 || tramo(t, Bl(26.8), Bl(27.1)) % 1; if (pg > 0) { const xx = Math.round(lerp(x1 - 2, xm + 1, pg)); rp(xx, y0, Math.min(x1 - 2, xx + 6), y1, BL); R.linea(xx, y0, xx, y1, hex('#c8bea8')); } }
    R.recorte(null); }
  // el guante de Atom: baja de su esquina, toca la pantalla, señala y vuelve
  const b = ease(tramo(t, P5 + 0.05, toca)), v = ease(tramo(t, Bl(27.5), Bl(28.4)));
  if (v >= 1) { T.hoyDelante(R, t, o); return; }
  const hx = lerp(lerp(294, 192, b), 294, v) + (t > Bl(26.0) && t < Bl(27.3) ? Math.round(Math.sin(t * 9) * 2) : 0), hy = lerp(lerp(34, 116, b), 34, v) + (t > toca - 0.05 && t < toca + 0.15 ? 1 : 0);
  T.mano(R, Math.round(hx), Math.round(hy), -1, GUANTE, { sinManga: true });
  T.hoyDelante(R, t, o);
};

// ── 6 · la mesa de luz: ruedas, esfera y textos que se juntan ──
const labFondo = () => capa('lab', () => {
  estuco(0, 0, 319, 150, hex('#c4ccc0'), hex('#aab4a6'), hex('#d4dcd0'), 90);
  rp(0, 136, 319, 150, hex('#8a9a8a')); rp(0, 136, 319, 137, hex('#a8b8a8')); for (let x = 0; x < 320; x += 16) rp(x, 138, x, 150, hex('#6a7a6a'));
  for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) { const s = Math.floor((x - 160) * 16 / (y - 120) + 400), f = Math.floor((y - 150) / 6); R.pset(x, y, (s + f) % 2 ? hex('#9a9890') : hex('#b0aea4')); if ((y - 150) % 6 === 0) R.pset(x, y, hex('#7a7870')); }
  // estantería de cajas de archivo a la izquierda
  R.rect(4, 36, 58, 132, K); rp(5, 37, 57, 131, hex('#7a5a3a')); for (const y of [60, 84, 108, 131]) rp(5, y, 57, y + 2, hex('#a07a4a'));
  for (let s = 0; s < 4; s++) for (let i = 0; i < 4; i++) { const x = 8 + i * 12, y0 = 40 + s * 24; rp(x, y0 + 2, x + 10, y0 + 19, [hex('#e8dcc0'), hex('#c8b890'), hex('#d8ccaa')][(s + i) % 3]); rp(x + 3, y0 + 6, x + 7, y0 + 8, BL); R.pset(x + 5, y0 + 14, K); }
  // la ventana con persiana a la derecha (Atenas de día)
  R.rect(262, 52, 314, 112, K); degr(263, 53, 313, 111, [hex('#7ab4e4'), hex('#aed4ee'), hex('#e8e0c8')]);
  for (let x = 263; x <= 313; x++) { const h = 96 - Math.round(H_(x >> 2, 1, 91) * 8); for (let y = h; y <= 111; y++) R.pset(x, y, (x + y) % 5 ? hex('#ece6da') : hex('#c8beb0')); }
  for (let y = 54; y < 80; y += 3) rp(263, y, 313, y + 1, hex('#e6e2d8')); rp(262, 80, 314, 81, hex('#bab6aa'));
  rp(260, 112, 316, 115, hex('#d8dcd4'));
  // la mesa bajo la caja de luz
  R.rect(56, 122, 264, 128, K); rp(57, 122, 263, 127, hex('#6a6e76')); rp(57, 122, 263, 122, hex('#9aa0a8')); rp(64, 128, 68, 160, hex('#4a4e56')); rp(252, 128, 256, 160, hex('#4a4e56'));
  // la caja de luz: marco y superficie que brilla
  R.rect(62, 30, 258, 120, K); rp(63, 31, 257, 119, hex('#4a4e56')); rp(63, 31, 257, 32, hex('#7a7e86'));
  for (let y = 35; y <= 115; y++) for (let x = 67; x <= 253; x++) R.pset(x, y, H_(x >> 3, y >> 3, 92) > 0.92 ? hex('#f6faff') : hex('#e4eef8'));
  for (let x = 30; x < 290; x++) for (let y = 22; y < 136; y++) { if (x > 61 && x < 259 && y > 29 && y < 121) continue; const d = Math.max(Math.max(62 - x, x - 258, 0), Math.max(30 - y, y - 120, 0)); if (d < 10) { const p = R.pget(x, y); R.pset(x, y, mez(p, hex('#f6faff'), 0.22 * (1 - d / 10))); } }
  // bajo la mesa: una caja de cartón, la papelera y una silla con ruedas
  R.rect(140, 140, 182, 160, K); rp(141, 141, 181, 159, hex('#c8a070')); rp(141, 141, 181, 143, hex('#e0bc88')); rp(158, 141, 164, 159, hex('#e8d8b0'));
  R.rect(204, 144, 220, 160, K); rp(205, 145, 219, 159, hex('#5a6a7a')); for (let x = 207; x < 219; x += 3) rp(x, 146, x, 158, hex('#3a4a5a')); rp(206, 143, 210, 145, BL);
  rp(100, 132, 104, 144, hex('#2a2e36')); rp(100, 144, 122, 148, hex('#2a2e36')); rp(101, 144, 121, 144, hex('#4a4e56')); rp(110, 148, 112, 156, hex('#4a4e56')); rp(98, 156, 124, 157, hex('#3a3e46')); R.disco(99, 159, 2, K); R.disco(123, 159, 2, K);
  // taza y papeles en la mesa
  rp(230, 116, 238, 121, BL); R.anillo(240.5, 118.5, 2, BL); rp(80, 119, 104, 121, hex('#f6f2e6')); rp(84, 118, 100, 118, hex('#d8d2c4'));
});
const lamina = (x0, y0, x1, y1, tipo, t, luz, giro) => {
  const tint = tipo === 0 ? hex('#1e2e4a') : hex('#e8f0f8');
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(R.pget(x, y), tint, tipo === 0 ? 0.88 : 0.15));
  R.linea(x0, y0, x1, y0, hex('#8a9ab0')); R.linea(x0, y1, x1, y1, hex('#8a9ab0')); R.linea(x0, y0, x0, y1, hex('#8a9ab0')); R.linea(x1, y0, x1, y1, hex('#8a9ab0'));
  const cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1, tin = hex('#2a3a5a');
  if (tipo === 0) { rueda(cx - 6, cy - 6, 13, 20, giro, hex('#b8c8e0'), hex('#7a8aa8'), hex('#e8f0ff'), { borde: hex('#1e2e4a') }); rueda(cx + 12, cy + 12, 8, 12, -giro * 1.6, hex('#b8c8e0'), hex('#7a8aa8'), hex('#e8f0ff'), { borde: hex('#1e2e4a') }); rueda(cx - 14, cy + 18, 6, 10, -giro * 2.1, hex('#9ab0d0'), hex('#6a7a98'), hex('#d8e4f8'), { borde: hex('#1e2e4a') }); }
  else if (tipo === 1) { R.anillo(cx + 0.5, cy + 0.5, 22, tin); R.anillo(cx + 0.5, cy + 0.5, 18, tin); R.anillo(cx + 0.5, cy + 0.5, 12, tin); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.linea(cx + Math.cos(a) * 12, cy + Math.sin(a) * 12, cx + Math.cos(a) * 22, cy + Math.sin(a) * 22, tin); }
    R.linea(cx, cy, cx + Math.cos(giro * 0.3) * 16, cy + Math.sin(giro * 0.3) * 16, hex('#c8963a')); R.disco(cx, cy, 2, tin); }
  else for (let r = 0; r < 10; r++) garabatos(x0 + 4, x1 - 3, y0 + 6 + r * 6, tin, 120 + r, 3);
  if (luz > 0) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if ((x === x0 || x === x1 || y === y0 || y === y1)) R.pset(x, y, mez(hex('#8a9ab0'), hex('#f6d040'), luz));
};
const p6 = (t) => {
  labFondo();
  const tg = (s) => tramo(t, Cp(s), Cp(s) + 0.25) * (1 - tramo(t, Cp(s) + 0.9, Cp(s) + 1.2));
  const j = ease(tramo(t, Cp(30.6), Cp(31.6))), giro = t > Cp(32.2) ? (t - Cp(32.2)) * 1.4 : 0;
  // las láminas: se encienden en su palabra y en «together» se juntan en el centro
  const L = [[72, 0, tg(28.77)], [132, 1, tg(29.35)], [192, 2, tg(30.23)]];
  if (j < 1) for (const [x, tipo, luz] of [L[0], L[1], L[2]]) { const xx = Math.round(lerp(x, 132, j)), yy = 40 - (luz > 0 ? 3 : 0); lamina(xx, yy, xx + 56, yy + 68, tipo, t, luz, giro); }
  if (j >= 1) { // el plano de la máquina: ruedas de la radiografía, la esfera en oro y las filas de texto
    const X0 = 96, Y0 = 37, X1 = 224, Y1 = 113; for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) R.pset(x, y, mez(R.pget(x, y), hex('#1e2e4a'), 0.9));
    const bl = hex('#b8c8e0'), bS = hex('#7a8aa8'), bL = hex('#e8f0ff'), bo = { borde: hex('#1e2e4a') };
    rueda(140, 72, 24, 36, giro, bl, bS, bL, bo); rueda(175, 64, 12, 18, -giro * 2, bl, bS, bL, bo); rueda(170, 94, 10, 15, -giro * 2.4, bl, bS, bL, bo); rueda(112, 98, 9, 14, -giro * 2.66, bl, bS, bL, bo);
    R.anillo(200.5, 74.5, 18, hex('#f0c868')); R.anillo(200.5, 74.5, 12, hex('#c8963a')); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.linea(200 + Math.cos(a) * 12, 74 + Math.sin(a) * 12, 200 + Math.cos(a) * 18, 74 + Math.sin(a) * 18, hex('#c8963a')); }
    R.linea(200, 74, 200 + Math.cos(giro * 0.4) * 15, 74 + Math.sin(giro * 0.4) * 15, hex('#f6d040')); R.disco(200, 74, 2, hex('#f0c868'));
    for (let r = 0; r < 3; r++) garabatos(184, 220, 100 + r * 4, hex('#e8f0ff'), 300 + r, 2);
    R.linea(X0, Y0, X1, Y0, hex('#f6d040')); R.linea(X0, Y1, X1, Y1, hex('#f6d040')); R.linea(X0, Y0, X0, Y1, hex('#f6d040')); R.linea(X1, Y0, X1, Y1, hex('#f6d040'));
    const b = tramo(t, Cp(32.2), Cp(32.6)); for (let k = 0; k < 4; k++) destello(112 + k * 30, 46 + (k % 2) * 56, b > 0 && b < 1 ? 1 - Math.abs(b - 0.5) * 2 : Math.sin(t * 5 + k) > 0.8 ? 0.5 : 0); }
  // un ventilador de mesa que gira
  { const fx = 92, fy = 106; R.rect(fx - 1, 110, fx + 1, 121, hex('#4a4e56')); R.disco(fx, fy, 8, hex('#3a3e46')); for (let k = 0; k < 3; k++) { const a = t * 18 + k * 2.1; R.poligono([[fx, fy], [fx + Math.cos(a) * 7, fy + Math.sin(a) * 7], [fx + Math.cos(a + 0.6) * 7, fy + Math.sin(a + 0.6) * 7]], hex('#a8b0bc')); } R.anillo(fx + 0.5, fy + 0.5, 8, hex('#6a6e76')); R.disco(fx, fy, 1.5, hex('#e8e8f0')); }
  // vapor de la taza
  for (let i = 0; i < 3; i++) { const f = (t * 0.6 + i / 3) % 1; R.pset(Math.round(234 + Math.sin(t * 3 + i * 2) * 2), Math.round(114 - f * 14), mez(hex('#e8eef4'), hex('#c4ccc0'), f)); }
  // ella señala en «together»; él asiente y sonríe en «worked»
  const ap = t > Cp(30.5) && t < Cp(32.8), son = t > Cp(32.9);
  R.actor(EL.investigadoraAK, 46, 166, t, { dir: 1, dedo: ap, habla: !ap && t < Cp(30.5) && Math.sin(t * 6) > 0, sonrisa: son });
  R.actor(EL.investigadorAK, 274, 166, t, { dir: -1, sorpresa: t > Cp(31.6) && t < Cp(32.4), sonrisa: son, brazos: son && t < Cp(33.5), habla: t < Cp(30.0) && Math.sin(t * 5 + 1) > 0.3 });
  calma(hex('#c4ccc0'));
};

// ── 7 · los 82 fragmentos en sus cajitas ──
const CAJ = []; for (let r = 0; r < 7; r++) for (let c = 0; c < 12; c++) if (CAJ.length < 82 && !(r === 0 && c >= 11)) CAJ.push([14 + c * 24, 50 + r * 18, r * 12 + c]);
const RUEDAS30 = CAJ.map((_, i) => i).filter((i) => H_(i, 3, 130) < 0.42).slice(0, 30);
while (RUEDAS30.length < 30) RUEDAS30.push(RUEDAS30.length * 2 + 1);
const cajasFondo = () => capa('cajas', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, H_(x, y, 131) > 0.86 ? hex('#2a5a3a') : H_(x >> 1, y >> 1, 132) > 0.9 ? hex('#3a6e4a') : hex('#2e6040'));
  for (let i = 0; i < CAJ.length - 1; i++) { const [x, y, k] = CAJ[i]; R.rect(x - 1, y - 1, x + 21, y + 15, K); rp(x, y, x + 20, y + 14, hex('#e8dcbc')); rp(x + 2, y + 2, x + 18, y + 12, hex('#f6f2e6')); rp(x + 2, y + 2, x + 18, y + 2, hex('#c8bc9c'));
    const w = 3 + Math.floor(H_(k, 1, 133) * 6), h = 2 + Math.floor(H_(k, 2, 133) * 4), cx = x + 10, cy = y + 7;
    fragmento([[cx - w, cy - h + 1], [cx - 1, cy - h], [cx + w, cy - h + 2], [cx + w - 1, cy + h], [cx, cy + h + 1], [cx - w + 1, cy + h - 1]], k, { sombra: hex('#d8d0bc') }); }
  // la cajita vacía (la última) y la tarjeta para la cifra
  { const [x, y] = CAJ[CAJ.length - 1]; R.rect(x - 1, y - 1, x + 21, y + 15, K); rp(x, y, x + 20, y + 14, hex('#e8dcbc')); rp(x + 2, y + 2, x + 18, y + 12, hex('#f6f2e6')); }
});
const p7 = (t) => {
  cajasFondo();
  // las pinzas dejan el último fragmento en su cajita
  const [lx, ly] = CAJ[CAJ.length - 1], u = ease(tramo(t, P7 + 0.1, P7 + 1.0)), sube = ease(tramo(t, P7 + 1.2, P7 + 1.8));
  const fx = lerp(lx + 70, lx + 10, u), fy = lerp(ly - 20, ly + 7, u);
  fragmento([[fx - 5, fy - 3], [fx, fy - 4], [fx + 5, fy - 2], [fx + 4, fy + 3], [fx - 4, fy + 3]], 140, { sombra: u >= 1 ? hex('#d8d0bc') : hex('#1e4a2e') });
  if (sube < 1) { const px = fx + sube * 40, py = fy - 2 - sube * 30; R.linea(px, py, px + 24, py - 16, hex('#c8ccd4')); R.linea(px + 1, py + 1, px + 25, py - 13, hex('#9aa0aa')); T.mano(R, Math.round(px + 26), Math.round(py - 12), -1, MANGA_INV, { sinManga: true }); }
  // las 30 ruedas escondidas que se encienden en «30», una a una
  const r30 = tramo(t, Cp(36.15), Cp(37.3));
  RUEDAS30.forEach((i, n) => { if (n / 30 < r30) { const [x, y] = CAJ[i]; const b = Math.min(1, (r30 - n / 30) * 8); R.anillo(x + 10.5, y + 7.5, 3, mez(hex('#8a6020'), hex('#f6d040'), b)); R.pset(x + 10, y + 7, hex('#f6d040')); if (b < 1) destello(x + 10, y + 7, 1 - b); } });
  // la luz del flexo que se pasea despacio
  const sx = 160 + Math.sin(t * 0.7) * 30; for (let y = 48; y < 176; y += 1) for (let x = Math.round(sx - 50); x < sx + 50; x += 1) if (((x + y) & 1) === 0 && Math.hypot(x - sx, (y - 110) * 1.4) < 50) { const p = R.pget(x, y); R.pset(x, y, mez(p, hex('#fff6d8'), 0.12)); }
  // las cifras en sus tarjetas
  const c82 = tramo(t, Cp(33.9), Cp(34.2)), c30 = tramo(t, Cp(36.2), Cp(36.5));
  if (c82 > 0) { const y = 46 - Math.round((1 - c82) * 6); R.rect(198, y - 22, 246, y + 2, K); rp(199, y - 21, 245, y + 1, BL); rp(199, y + 1, 245, y + 1, hex('#c8c0b0')); R.numero('82', 222, y - 2, { tam: 16, centro: true }); }
  if (c30 > 0) { const y = 46 - Math.round((1 - c30) * 6); R.rect(148, y - 22, 194, y + 2, K); rp(149, y - 21, 193, y + 1, BL); rp(149, y + 1, 193, y + 1, hex('#c8c0b0')); ruedita(158, y - 10, 5, 10, t * 2, BR, BRS, BRL); R.numero('30', 180, y - 2, { centro: true, tam: 16 }); }
};

// ── 8 · el engranaje más grande junto a la mano ──
const vitrinaFondo = () => capa('vitrina', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 158, (y - 112) * 1.3) / 190; const v = (x * 3 + y) % 4 === 0 ? 1 : 0;
    R.pset(x, y, mez(v ? hex('#2e2a52') : hex('#26224a'), hex('#08060e'), Math.min(0.85, d * 1.2))); }
  // el marco de la vitrina (nogal y latón) y el cristal con su reflejo
  R.rect(0, 0, 319, 6, hex('#3a2416')); R.rect(0, 166, 319, 179, hex('#4a2e1a')); rp(0, 166, 319, 167, hex('#8a5a34')); rp(0, 6, 319, 7, hex('#c8963a')); rp(0, 165, 319, 165, hex('#c8963a'));
  for (let x = 0; x < 320; x += 40) { R.disco(x + 20, 172, 2, hex('#c8963a')); R.pset(x + 19, 171, hex('#f0c868')); }
  // otros fragmentos en su atril, con su tarjetita en blanco
  for (const [x, y, k] of [[46, 128, 1], [262, 126, 2], [72, 70, 3], [252, 64, 4]]) { rp(x - 12, y + 10, x + 12, y + 12, hex('#5a5a7a')); fragmento([[x - 9, y - 4], [x - 2, y - 8], [x + 8, y - 5], [x + 9, y + 4], [x + 1, y + 8], [x - 8, y + 5]], 150 + k); rp(x - 6, y + 16, x + 6, y + 21, hex('#e8e0cc')); }
  // el atril del engranaje grande
  
});
const p8 = (t) => {
  vitrinaFondo();
  // detrás, en «behind it», se enciende la llanta de una rueda enorme con sus dientes
  const bh = tramo(t, Cp(40.45), Cp(41.3));
  if (bh > 0) { const cx = 160, cy = 268, r0 = 150, c1 = mez(hex('#26224a'), hex('#a87a32'), bh * 0.85), c2 = mez(hex('#26224a'), hex('#e8b858'), bh * 0.85), c3 = mez(hex('#26224a'), hex('#5a3e18'), bh * 0.85);
    for (let a = Math.PI * 1.02; a < Math.PI * 1.98; a += 0.004) { const ca = Math.cos(a), sa = Math.sin(a); for (let r = r0 - 7; r <= r0; r++) R.pset(Math.round(cx + ca * r), Math.round(cy + sa * r), r === r0 - 7 ? c3 : r > r0 - 3 ? c2 : c1); }
    for (let k = 0; k < 140; k++) { const a = Math.PI * (1.02 + k / 140 * 0.96) + (t - P8) * 0.02; if (a > Math.PI * 1.98) continue; R.poligono([[cx + Math.cos(a - 0.008) * r0, cy + Math.sin(a - 0.008) * r0], [cx + Math.cos(a) * (r0 + 5), cy + Math.sin(a) * (r0 + 5)], [cx + Math.cos(a + 0.008) * r0, cy + Math.sin(a + 0.008) * r0]], c2); } }
  // el foco: cono de luz sobre el engranaje (abajo, junto al marco)
  for (let y = 8; y < 164; y++) { const w = 6 + (y - 8) * 0.34; for (let x = Math.round(146 - w); x <= 146 + w; x++) if (((x ^ y) & 1) === 0) R.pset(x, y, mez(R.pget(x, y), hex('#fff4d0'), 0.16)); }
  T.motas(R, t, 104, 190, 20, 160, 14, hex('#c8c0e0'));
  // el atril y el engranaje: corroído, con sus cuatro radios; brilla en el foco
  rp(98, 152, 196, 156, hex('#6a6a8a')); rp(98, 152, 196, 152, hex('#9a9ab8')); rp(118, 157, 176, 162, hex('#3a3a5a'));
  const gx = 124, gy = 141;
  R.disco(gx + 2, gy + 3, 11, hex('#14102a')); rueda(gx, gy, 9, 22, 0.2, mez(VERD, BR, 0.35), VERDS, mez(VERDL, BRL, 0.4), { diente: 1.8, huecos: hex('#26224a') });
  for (let k = 0; k < 9; k++) if (H_(k, 1, 160) > 0.5) R.pset(gx - 7 + Math.floor(H_(k, 2, 160) * 14), gy - 7 + Math.floor(H_(k, 3, 160) * 14), VERDLL);
  destello(gx - 6, gy - 7, Math.max(0, Math.sin(t * 2.5)) * 0.8);
  // el recuadro ampliado del engranaje (arriba), unido con dos líneas
  const z = ease(tramo(t, P8 + 0.2, P8 + 0.8)), zx = 124, zy = 64, zr = Math.max(2, Math.round(34 * z));
  if (z > 0) { R.linea(gx - 8, gy - 8, zx - zr * 0.8, zy + zr * 0.6, hex('#8a86b8'), 2); R.linea(gx + 8, gy - 8, zx + zr * 0.8, zy + zr * 0.6, hex('#8a86b8'), 2);
    R.disco(zx, zy, zr + 3, K); R.disco(zx, zy, zr + 2, hex('#c8963a')); R.disco(zx, zy, zr, hex('#1a1636'));
    if (zr > 10) { rueda(zx, zy, zr - 7, 22, 0.2, mez(VERD, BR, 0.35), VERDS, mez(VERDL, BRL, 0.4), { diente: 3.5, huecos: hex('#1a1636') });
      R.recorte([zx - zr, zy - zr, zx + zr, zy + zr]); for (let k = 0; k < 40; k++) { const x = zx - zr + Math.floor(H_(k, 1, 161) * zr * 2), y = zy - zr + Math.floor(H_(k, 2, 161) * zr * 2); if (Math.hypot(x - zx, y - zy) < zr - 8) R.rect(x, y, x + 1, y + 1, H_(k, 3, 161) > 0.5 ? VERDLL : VERDS); } R.recorte(null); } }
  // la mano canónica se posa al lado en «palm» (el brazo entra por abajo, desde fuera del cuadro), y el ≈ entre los dos
  const m = ease(tramo(t, Cp(38.8), Cp(39.5))), mx = Math.round(lerp(212, 172, m)), my = Math.round(lerp(196, 142, m));
  T.brazo(R, mx + 26, 192, mx, my, MANGA_INV, -1, { codo: [mx + 20, my + 22] });
  const q = tramo(t, Cp(39.6), Cp(39.9));
  if (q > 0) { const c = hex('#f6e8b0'); for (const yy of [137, 143]) for (let i = 0; i < 11; i++) { const d = i % 4 === 1 ? -1 : i % 4 === 3 ? 1 : 0; R.pset(140 + i, yy + d, c); R.pset(140 + i, yy + 1 + d, c); }
    R.anillo(gx + 0.5, gy + 0.5, 13, mez(hex('#26224a'), c, q), 2); }
  // el reflejo del cristal que se desliza
  const rx = ((t * 30) % 480) - 80; for (let i = 0; i < 40; i++) { const x = Math.round(rx + i * 0.6), y = 10 + i * 4; R.pset(x, y, mez(R.pget(x, y), BL, 0.25)); R.pset(x + 6, y, mez(R.pget(x + 6, y), BL, 0.15)); }
  // el marco de abajo por delante del brazo
  { const bf = capas.get('vitrina'); for (let y = 165; y < 180; y++) for (let x = 140; x < 260; x++) R.pset(x, y, bf[y * 320 + x]); }
};

// ── 9 · la rueda de 223 dientes ──
const p9 = (t) => {
  const cuenta = tramo(t, Cp(41.85), Cp(44.3));
  const geo = T.maquina(R, t, { encuadre: 'atras', camara: 'rueda', cuenta });
  // la mano que toca los dientes mientras cuentan y, en «That number», señala el contador
  const sen = ease(tramo(t, Cp(44.4), Cp(44.9))), ent = ease(tramo(t, P9 + 0.05, Cp(42.2)));
  const hx = lerp(lerp(-20, 64, ent), 30, sen) + (cuenta > 0 && cuenta < 1 ? Math.round(Math.sin(t * 18)) : 0), hy = lerp(132, 66, sen);
  T.brazo(R, hx - 26, hy + 34, hx, hy, MANGA_INV, 1, { codo: [hx - 24, hy + 12] });
  const d = tramo(t, Cp(44.5), Cp(45.6)); if (d > 0 && d < 1) { const [cx, cy] = geo.contador ?? [52, 44]; destello(cx - 22, cy - 10, 1 - d); destello(cx + 22, cy + 4, Math.max(0, 1 - Math.abs(d - 0.4) * 2.5)); }
};

const efectos = [[0.2, 'motor'], [A(3.3), 'vapor'], [A(3.6), 'whoosh'], [A(4.4), 'coche'],
  [A(7.0), 'carro'], [A(9.0), 'golpecito'], [A(10.3), 'golpecito'], [A(11.3), 'palmada'],
  [Bl(14.55), 'tic'], [Bl(15.0), 'zumbido'], [Bl(16.5), 'tic'], [Bl(16.7), 'brillo'],
  [Bl(19.5), 'zumbido'], [Bl(22.1), 'toc'], [Bl(23.2), 'brillo'],
  [Bl(24.75), 'tic'], [Bl(25.4), 'papel'], [Bl(26.8), 'papel'],
  [Cp(28.6), 'interruptor'], [Cp(30.6), 'papel'], [Cp(32.2), 'brillo'],
  [P7 + 0.9, 'toc'], [Cp(33.9), 'pop'], [Cp(36.2), 'brillo'],
  [Cp(39.4), 'toc'], [Cp(40.5), 'brillo'],
  [Cp(41.85), 'maquina'], [Cp(43.7), 'campana']];
const año = (t) => (t >= P5 && t < P6 ? 2026 : 2005);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9]], { efectos, cartela: '2005', año });
''')


E['ak-manivela'] = ('La manivela', '''// AK-MANIVELA (frases 16–17), hoy (2026), sin cartela. Siete planos:
// 1. (0 → «You») un banco de taller con la caja del mecanismo y una caja de zapatos al lado: en «wooden box» la caja
//    brilla, en «shoe box» la tapa se levanta y asoma un gatito (que vuelve a esconderse), y la cota compara los
//    tamaños; en «crank» la manivela da media vuelta;
// 2. («You» → «Every») maquina 'caja' general: el guante de Atom coge el pomo y gira; la plaquita de la fecha corre hacia
//    delante en «forward» y hacia atrás en «back»; la investigadora lo sigue con el dedo y se sorprende al volver;
// 3. («Every» → «the signs») hoy 'carton': el guante gira el lápiz y las ruedas de cartón giran sin atascarse (de momento);
// 4. («the signs» → «which») la esfera de delante, enorme: la luz recorre el zodiaco en «zodiac» y el anillo de los meses
//    en «Egyptian months»; la salamanquesa cruza;
// 5. («which» → «Pointers») el anillo de los meses rueda y se desenrolla en una cinta sobre la mesa de un estudioso de
//    1905: la aguja corre los días (12 × 30 y 5) y en «365» destella; la barra del año pasa de 1905 a 2005 («a century»);
// 6. («Pointers» → «And») pantalla partida: el cielo de verdad con el Sol y la Luna y, al lado, la esfera con sus agujas
//    que apuntan igual; en «sun» y «moon» se encienden y en «chosen» los dos corren a otra fecha;
// 7. («And» → fin) la bolita de la fase, grande: mitad clara, mitad oscura; en «turn» gira y abajo se enciende la fase
//    de la Luna que toca.''', PRE + MIO + r'''
const M_ = (s) => en('caja', (s - 0.9) / 11.888), Sf = (s) => en('esfera', (s - 13.288) / 20.041);
const P2 = M_(5.63), P3 = M_(11.23), P4 = Sf(16.19), P5 = Sf(20.43), P6 = Sf(25.06), P7 = Sf(29.38);

// ── 1 · la caja junto a una caja de zapatos ──
const tallerFondo = () => capa('tallerZap', () => {
  // pared de ladrillo encalado con un panel de herramientas y una ventana de día
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 6), jx = (x + (f % 2) * 9) % 18, v = H_(x >> 1, y >> 1, 200);
    R.pset(x, y, y % 6 === 5 || jx === 0 ? hex('#cfc6b6') : v > 0.9 ? hex('#f2ece0') : v < 0.08 ? hex('#d8d0c0') : hex('#e6dfd2')); }
  R.rect(18, 26, 76, 92, K); degr(19, 27, 75, 91, [hex('#6aa4dc'), hex('#9ac8ec'), hex('#d4e8f4')]); for (let x = 19; x <= 75; x++) { const h = 78 - Math.round(H_(x >> 2, 1, 201) * 10); for (let y = h; y <= 91; y++) R.pset(x, y, (x + y) % 4 ? hex('#7a9a6a') : hex('#5a7a4a')); }
  rp(46, 27, 47, 91, hex('#f2ece0')); rp(19, 58, 75, 59, hex('#f2ece0')); rp(14, 92, 80, 95, hex('#a8a090'));
  // panel perforado con herramientas colgadas (sierra, martillo, escuadra, compás, tenazas)
  R.rect(194, 24, 270, 92, K); rp(195, 25, 269, 91, hex('#b8925a')); for (let y = 29; y < 90; y += 5) for (let x = 199; x < 268; x += 5) R.pset(x, y, hex('#7a5a32'));
  rp(200, 32, 230, 40, hex('#c8ccd4')); for (let x = 200; x < 230; x += 2) R.pset(x, 41, hex('#8a8e96')); rp(230, 31, 238, 41, hex('#8a4a2a'));
  rp(244, 30, 246, 58, hex('#8a5a32')); rp(239, 30, 251, 35, hex('#5a5e66')); R.linea(204, 50, 204, 80, hex('#c8ccd4')); R.linea(204, 80, 228, 80, hex('#c8ccd4')); R.linea(205, 50, 205, 79, hex('#8a8e96'));
  R.linea(256, 46, 250, 76, hex('#c8963a')); R.linea(256, 46, 262, 76, hex('#c8963a')); R.disco(256, 46, 2, hex('#8a6020'));
  R.linea(236, 60, 228, 86, hex('#5a5e66')); R.linea(238, 60, 244, 86, hex('#5a5e66')); R.disco(237, 62, 1.5, hex('#c83a3a'));
  // estante con tarros de tornillos y un rollo de papel
  rp(96, 50, 176, 52, hex('#8a5a32')); rp(96, 53, 176, 53, hex('#5a3a1e'));
  for (const [x, c] of [[100, '#a8c8d8'], [114, '#c8d8a8'], [128, '#d8c8a8']]) { R.rect(x - 1, 38, x + 9, 50, K); rp(x, 39, x + 8, 49, hex(c)); rp(x, 37, x + 8, 39, hex('#c83a3a')); for (let i = 0; i < 6; i++) R.pset(x + 1 + Math.floor(H_(i, x, 202) * 7), 43 + Math.floor(H_(i, x, 203) * 6), hex('#5a5e66')); }
  rp(146, 40, 172, 49, hex('#f2ece0')); R.disco(146, 44, 5, hex('#e2dccc')); R.anillo(146.5, 44.5, 2, hex('#a8a090'));
  // el banco: tablero grueso de madera con vetas, cinta métrica, virutas y lápiz
  R.rect(0, 128, 319, 131, K); tablas(0, 132, 319, 179, 8, hex('#b07a46'), hex('#8a5a32'), hex('#d09a5e'), 204); rp(0, 128, 319, 131, hex('#d8a868'));
  for (let i = 0; i < 9; i++) { const x = 20 + Math.floor(H_(i, 1, 205) * 280), y = 150 + Math.floor(H_(i, 2, 205) * 24); R.anillo(x + 0.5, y + 0.5, 2, hex('#e8c890')); R.pset(x + 2, y, hex('#f0d8a8')); }
  R.rect(16, 160, 58, 170, K); rp(17, 161, 57, 169, hex('#e8c030')); R.disco(17, 165, 6, K); R.disco(17, 165, 5, hex('#e8c030')); R.disco(17, 165, 2, hex('#2a2a30')); for (let x = 22; x < 57; x += 3) rp(x, 161, x, 163, K);
  rp(250, 166, 290, 168, hex('#e8a830')); rp(290, 166, 294, 167, hex('#f0c8a0')); R.pset(295, 167, K); rp(250, 166, 252, 168, hex('#f2a0a0'));
  // la caja del mecanismo: cara de delante de nogal, tapa de arriba, lado derecho con la manivela
  R.poligono([[66, 74], [80, 62], [182, 62], [168, 74]], K); R.poligono([[68, 73], [81, 63], [180, 63], [167, 73]], hex('#7a4e2c'));
  for (let i = 0; i < 4; i++) R.linea(72 + i * 26, 72, 84 + i * 26, 64, hex('#6a4024'));
  R.poligono([[168, 74], [182, 62], [182, 128], [168, 138]], K); R.poligono([[169, 74], [181, 64], [181, 127], [169, 136]], hex('#4a2c18'));
  R.rect(64, 74, 169, 139, K); tablasV(65, 75, 168, 138, 9, hex('#6a4024'), hex('#4a2c18'), hex('#8a5a34'), 206);
  rp(65, 75, 168, 77, hex('#8a5a34')); rp(65, 136, 168, 138, hex('#3a2010'));
  for (let c = 0; c < 2; c++) for (let r = 0; r < 7; r++) garabatos(70 + c * 82, 86 + c * 82, 82 + r * 7, hex('#c8963a'), 210 + r + c * 9, 2);
  // la caja de zapatos de cartón: cuerpo y su sombra (la tapa se pinta aparte)
  R.rect(200, 106, 274, 139, K); rp(201, 107, 273, 138, hex('#d8b07a')); rp(201, 107, 273, 109, hex('#e8c896')); rp(265, 107, 273, 138, hex('#b8905a')); rp(201, 122, 264, 124, hex('#f2ecda'));
  for (let x = 274; x < 284; x++) for (let y = 112 + (x - 274); y < 140; y++) R.pset(x, y, mez(R.pget(x, y), K, 0.25));
  for (let x = 170; x < 196; x++) for (let y = 128 + (x - 170) / 3; y < 142; y++) R.pset(x, Math.round(y), mez(R.pget(x, Math.round(y)), K, 0.25));
});
const p1 = (t) => {
  tallerFondo();
  // nubes por la ventana y la cortinilla
  R.recorte([19, 27, 75, 77]); for (const [b, y, v] of [[0, 38, 3], [30, 50, 5]]) { const x = ((b + t * v) % 90) - 15; R.disco(x, y, 5, hex('#e6eef6')); R.disco(x + 6, y - 1, 4, BL); R.disco(x - 5, y + 1, 3, hex('#c8d4e4')); } R.recorte(null);
  // la esfera de la caja (pequeña) que gira despacio y la manivela del lado
  const g0 = 0, gc = tramo(t, M_(3.9), M_(4.8));
  esfera(116, 106, 26, t, { sol: -1.2 + t * 0.03, luna: 0.4 + g0 * 2 * Math.PI + t * 0.1, fase: g0 + t * 0.05 });
  const ax = 175, ay = 100, an = -Math.PI / 2 + g0 * 2 * Math.PI, px = ax + Math.cos(an) * 12, py = ay + Math.sin(an) * 12;
  R.disco(ax, ay, 3, K); R.disco(ax, ay, 2, BR); R.linea(ax, ay, px, py, K); R.linea(ax + 1, ay, px + 1, py, BR); R.disco(px, py, 3, K); R.disco(px, py, 2, hex('#8a5a32')); R.pset(Math.round(px) - 1, Math.round(py) - 1, hex('#d09a5e'));
  if (gc > 0 && gc < 1) { destello(px + 3, py - 3, 1 - Math.abs(gc - 0.4) * 2); R.anillo(ax + 0.5, ay + 0.5, 17 + gc * 3, mez(hex('#e6dfd2'), hex('#c83a3a'), 1 - gc), 2); }
  // en «wooden box» la caja brilla
  const b1 = tramo(t, M_(1.3), M_(2.1)); if (b1 > 0 && b1 < 1) { destello(70 + b1 * 100, 76, 1 - Math.abs(b1 - 0.5) * 2); destello(166, 76 + b1 * 60, 0.6); }
  // la tapa de la caja de zapatos: se levanta en «shoe box», asoma el gatito, mira y se esconde
  const tp = ease(tramo(t, M_(2.85), M_(3.15))) * (1 - ease(tramo(t, M_(5.0), M_(5.4)))), ga = tramo(t, M_(3.0), M_(3.4)) * (1 - tramo(t, M_(4.8), M_(5.1)));
  { const lx = 198, yt = 99 - Math.round(tp * 20), dx = Math.round(tp * 5), yb = 106 - Math.round(tp * 1); R.poligono([[lx + dx - 1, yt - 1], [lx + 79 + dx, yt - 1], [lx + 79, yb + 1], [lx - 1, yb + 1]], K); R.poligono([[lx + dx, yt], [lx + 78 + dx, yt], [lx + 78, yb], [lx, yb]], (x, y) => y < yt + 2 ? hex('#f0d0a0') : tp > 0.3 ? hex('#c8a06a') : hex('#e2bc86')); }
  if (ga > 0) { const gy = Math.round(112 - ga * 16), gx = 236 + Math.round(Math.sin(t * 2) * 4), r = 9;
    R.disco(gx, gy, r + 1, K); R.disco(gx, gy, r, hex('#e8a050')); R.disco(gx - 3, gy - 3, 3, hex('#f0b868'));
    R.poligono([[gx - 9, gy - 3], [gx - 6, gy - 13], [gx - 1, gy - 7]], K); R.poligono([[gx + 9, gy - 3], [gx + 6, gy - 13], [gx + 1, gy - 7]], K);
    R.poligono([[gx - 7, gy - 4], [gx - 6, gy - 10], [gx - 3, gy - 7]], hex('#e8a050')); R.poligono([[gx + 7, gy - 4], [gx + 6, gy - 10], [gx + 3, gy - 7]], hex('#e8a050')); R.pset(gx - 6, gy - 8, hex('#f0a0a0')); R.pset(gx + 6, gy - 8, hex('#f0a0a0'));
    for (let i = -6; i <= 6; i += 4) R.linea(gx + i, gy - 9 + Math.abs(i) / 3, gx + i, gy - 6, hex('#c87a30'));
    const parp = Math.sin(t * 3) > 0.95; for (const d of [-4, 4]) { R.rect(gx + d - 1, gy - 2, gx + d, gy + 1, parp ? hex('#a86a30') : K); if (!parp) R.pset(gx + d - 1, gy - 2, BL); }
    R.pset(gx, gy + 2, hex('#e86a8a')); R.pset(gx - 1, gy + 3, K); R.pset(gx + 1, gy + 3, K); for (const d of [-1, 1]) { R.linea(gx + d * 5, gy + 2, gx + d * 13, gy + 1, hex('#f6e8d0')); R.linea(gx + d * 5, gy + 4, gx + d * 12, gy + 5, hex('#f6e8d0')); }
    R.rect(200, 107, 273, 112, K); rp(201, 107, 273, 112, hex('#d8b07a')); rp(201, 107, 273, 108, hex('#e8c896')); rp(265, 107, 273, 112, hex('#b8905a'));
    R.rect(gx - 9, 107, gx - 5, 110, K); rp(gx - 8, 107, gx - 6, 109, hex('#e8a050')); R.rect(gx + 5, 107, gx + 9, 110, K); rp(gx + 6, 107, gx + 8, 109, hex('#e8a050')); }
  // la cota: la caja es «un poco más grande» que la de zapatos (aparece en «bigger than»)
  const c = tramo(t, M_(2.2), M_(2.6)); if (c > 0) { const col = mez(hex('#d8a868'), hex('#c83a3a'), c);
    R.linea(64, 150, 169, 150, col); R.linea(64, 146, 64, 154, col); R.linea(169, 146, 169, 154, col); R.linea(200, 150, 274, 150, col); R.linea(200, 146, 200, 154, col); R.linea(274, 146, 274, 154, col);
    if (c >= 1) { R.rect(178, 145, 192, 155, K); rp(179, 146, 191, 154, BL); R.linea(182, 150, 188, 150, hex('#c83a3a')); R.linea(185, 147, 185, 153, hex('#c83a3a')); } }
  T.motas(R, t, 20, 300, 30, 125, 12, hex('#fff8e8'));
  calma(hex('#e6dfd2'));
};

// ── 2 · la manivela gira: las fechas adelante y atrás ──
const giro2 = (t) => { const a = M_(5.95), b = M_(9.62), c = M_(9.85), d = P3;
  if (t < a) return 0; if (t < b) { const u = t - a; return 0.25 * u * u / 2 + 0.2 * u; } const gb = 0.25 * (b - a) ** 2 / 2 + 0.2 * (b - a);
  if (t < c) return gb; return gb - Math.min(t - c, d - c) * 1.3; };
const p2 = (t) => {
  const g = giro2(t), o = { encuadre: 'caja', giro: g, fecha: 120 };
  const geo = T.maquina(R, t, o);
  // la investigadora sigue las fechas con el dedo; se sorprende cuando vuelven atrás
  const atras = t > M_(9.7);
  R.actor(EL.investigadoraAK, 60, 160, t, { dir: 1, dedo: t > M_(8.2) && t < M_(9.6), sorpresa: atras && t < M_(10.8), sonrisa: t > M_(10.8), habla: t < M_(8.2) && Math.sin(t * 6) > 0.3 });
  T.maquinaDelante(R, t, o);
  // el guante de Atom baja de su esquina al pomo y gira con él
  const [px, py] = geo.pomo ?? [268, 79], b = ease(tramo(t, P2 + 0.05, M_(5.9))), sa = ease(tramo(t, P3 - 0.5, P3 - 0.05));
  const hx = lerp(lerp(296, px + 4, b), 296, sa), hy = lerp(lerp(34, py, b), 34, sa);
  T.mano(R, Math.round(hx), Math.round(hy), -1, GUANTE, { sinManga: true });
  // flechas de avance/retroceso junto a la plaquita
  const [fx, fy] = geo.fecha ?? [148, 124], adel = t > M_(8.2) && t < M_(9.62);
  if (adel || atras && t < P3 - 0.2) { const d = adel ? 1 : -1, k = Math.floor(t * 6) % 2, x = fx + d * 24, y = fy - 1; R.disco(x, y, 6, K); R.disco(x, y, 5, adel ? hex('#3ac85a') : hex('#e85a3a'));
    R.poligono([[x - 3 * d, y - 3], [x + 3 * d, y], [x - 3 * d, y + 3]], k ? BL : hex('#f6f2e6')); }
};

// ── 3 · el mecanismo de cartón de Atom ──
const p3 = (t) => {
  const o = { encuadre: 'estudio', camara: 'carton', gira: ease(tramo(t, P3 + 0.4, P4 - 0.2)) };
  const geo = T.hoy(R, t, o);
  const [mx, my] = geo.manivela ?? [230, 70], b = ease(tramo(t, P3, P3 + 0.4)), sa = ease(tramo(t, P4 - 0.15, P4 + 0.3));
  const hx = lerp(lerp(300, mx, b), 300, sa), hy = lerp(lerp(30, my, b), 30, sa);
  T.mano(R, Math.round(hx), Math.round(hy), -1, GUANTE, { sinManga: true });
  // un «visto» de alivio: no se atasca (todavía)
  const v = tramo(t, Sf(14.7), Sf(15.0)) * (1 - tramo(t, Sf(15.8), Sf(16.1))); if (v > 0) { const x = 268, y = 120 - Math.round(v * 6); R.disco(x, y, 7, K); R.disco(x, y, 6, BL); R.linea(x - 3, y, x - 1, y + 2, hex('#3a9a4a')); R.linea(x - 1, y + 2, x + 3, y - 3, hex('#3a9a4a')); R.linea(x - 3, y + 1, x - 1, y + 3, hex('#3a9a4a')); }
};

// ── 4 · la esfera de delante, enorme ──
const frenteFondo = () => capa('frente', () => {
  tablasV(0, 0, 319, 179, 11, hex('#5a3820'), hex('#3e2414'), hex('#7a4e2c'), 220);
  for (const [x0, x1] of [[14, 70], [250, 306]]) { R.rect(x0 - 1, 40, x1 + 1, 166, K); rp(x0, 41, x1, 165, hex('#a8783a')); rp(x0, 41, x1, 42, hex('#d0a058')); rp(x1 - 1, 41, x1, 165, hex('#6a4a20'));
    for (let r = 0; r < 17; r++) garabatos(x0 + 4, x1 - 3, 47 + r * 7, hex('#5a3e18'), 230 + r + x0, 3);
    for (const y of [44, 162]) for (const x of [x0 + 3, x1 - 3]) { R.disco(x, y, 1.5, hex('#5a3e18')); R.pset(x, y - 1, hex('#f0c868')); } }
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 160, y - 100); if (d > 84 && d < 96) R.pset(x, y, mez(R.pget(x, y), K, 0.35 * (1 - (d - 84) / 12))); }
});
const p4 = (t) => {
  frenteFondo();
  const zod = tramo(t, Sf(16.3), Sf(17.7)), cal = tramo(t, Sf(18.0), Sf(19.7));
  esfera(160, 100, 78, t, { sol: -0.9 + (t - P4) * 0.04, luna: 1.1 + (t - P4) * 0.25, fase: 0.3 + (t - P4) * 0.06, zod: zod > 0 ? (zod >= 1 && t > Sf(17.9) ? 0 : zod) : 0, cal });
  // brillo que cruza el bronce y la salamanquesa que pasa por la madera
  const sx = ((t - P4) * 70) % 400 - 40; for (let i = -6; i <= 6; i++) for (let y = 30; y < 172; y += 1) { const x = Math.round(sx + i + (y - 100) * 0.3); if (Math.hypot(x - 160, y - 100) < 77) R.pset(x, y, mez(R.pget(x, y), hex('#fff6d8'), 0.18 * (1 - Math.abs(i) / 7))); }
  const gx = lerp(330, 236, tramo(t, P4 + 0.3, P4 + 2.5)) - tramo(t, P4 + 3.0, P5) * 30, gy = 160 + Math.round(Math.sin(t * 2) * 2);
  if (gx < 330) { const k = Math.sin(t * 12) > 0 ? 1 : -1; rp(gx, gy - 1, gx + 12, gy + 1, hex('#8a9a5a')); R.disco(gx, gy, 2.5, hex('#8a9a5a')); R.pset(gx - 1, gy - 1, K); R.linea(gx + 12, gy, gx + 20, gy + 2, hex('#7a8a4a'));
    for (const [dx, dy] of [[3, 2 * k], [3, -2 * k], [10, -2 * k], [10, 2 * k]]) R.pset(gx + dx, gy + dy + (dy > 0 ? 1 : -1), hex('#6a7a3a')); }
};

// ── 5 · el anillo se desenrolla: 365 días ──
const estudioFondo = () => capa('estudio1905', () => {
  papelPintado(0, 0, 319, 118, hex('#5a6a4a'), hex('#4e5e40'), hex('#a8b080'));
  zocalo(0, 100, 319, 118, hex('#6a4024'), hex('#4a2c18'), hex('#8a5a34'));
  // librería con lomos, un reloj de pared y un globo celeste
  R.rect(14, 26, 92, 100, K); rp(15, 27, 91, 99, hex('#5a3820')); for (const y of [44, 62, 80, 98]) rp(15, y, 91, y + 1, hex('#8a5a34'));
  for (let s = 0; s < 4; s++) for (let x = 17; x < 89; ) { const w = 3 + Math.floor(H_(x, s, 240) * 3), h = 10 + Math.floor(H_(x, s, 241) * 6); rp(x, 43 + s * 18 - h, x + w - 1, 43 + s * 18, [hex('#8a2a2a'), hex('#2a4a6a'), hex('#5a6a2a'), hex('#8a6a2a'), hex('#4a2a4a')][Math.floor(H_(x, s, 242) * 5)]); R.pset(x + 1, 43 + s * 18 - h + 2, hex('#e8c860')); x += w + (H_(x, s, 243) > 0.8 ? 3 : 0); }
  relojPared(250, 64, 10, 0);
  R.rect(116, 30, 168, 92, K); marco(117, 31, 167, 91); for (let y = 35; y <= 87; y++) for (let x = 121; x <= 163; x++) R.pset(x, y, H_(x >> 1, y >> 1, 244) > 0.9 ? hex('#f2ecd8') : hex('#e6dcc0'));
  for (let k = 0; k < 3; k++) R.anillo(142.5, 61.5, 8 + k * 7, hex('#8a6a3a')); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.linea(142 + Math.cos(a) * 15, 61 + Math.sin(a) * 15, 142 + Math.cos(a) * 22, 61 + Math.sin(a) * 22, hex('#8a6a3a')); }
  // la mesa del estudioso: tablero verde de escritorio, tintero, libros, lámpara de aceite
  R.rect(0, 118, 319, 179, K); tablas(0, 119, 319, 179, 9, hex('#7a4a28'), hex('#5a321a'), hex('#9a6a3e'), 245);
  for (let y = 124; y < 172; y++) for (let x = 6; x < 314; x++) R.pset(x, y, H_(x, y, 246) > 0.9 ? hex('#3a6a4a') : hex('#2e5a3e'));
  rp(6, 124, 313, 125, hex('#8a6a2a')); rp(6, 171, 313, 172, hex('#8a6a2a'));
  R.rect(270, 102, 300, 124, K); rp(271, 103, 299, 112, hex('#8a2a2a')); rp(271, 113, 299, 123, hex('#2a4a6a')); rp(271, 103, 299, 104, hex('#c86a5a'));
  // papeles, una pluma y una lupa sobre el tapete
  for (const [x, y, k] of [[60, 156, 0], [118, 158, 1], [196, 155, 2]]) { R.rect(x - 1, y - 1, x + 33, y + 13, K); rp(x, y, x + 32, y + 12, hex('#f2ecd8')); for (let r = 0; r < 3; r++) garabatos(x + 3, x + 29, y + 3 + r * 3, hex('#5a4a3a'), 290 + k * 3 + r, 2); }
  R.linea(160, 170, 182, 156, hex('#f6f2e6')); R.linea(161, 170, 183, 157, hex('#c8c0b0')); R.anillo(262.5, 162.5, 7, hex('#2a2a30')); R.anillo(262.5, 162.5, 6, hex('#c8963a')); R.linea(267, 167, 276, 174, hex('#5a3a22'));
  R.disco(24, 116, 5, K); R.disco(24, 116, 4, hex('#2a2a3a')); R.linea(26, 112, 34, 100, hex('#f2ecd8')); R.linea(27, 112, 35, 100, hex('#c8c0b0'));
});
const p5 = (t) => {
  estudioFondo();
  // la llama de la lámpara de aceite
  { const x = 52, y = 106; R.rect(x - 5, y + 2, x + 5, 118, K); rp(x - 4, y + 3, x + 4, 117, hex('#c8963a')); R.disco(x, y, 4, hex('#f0e8c8')); const f = Math.sin(t * 13) > 0 ? 1 : 0; R.disco(x, y - 1 - f, 2, hex('#f6c830')); R.pset(x, y - 3 - f, hex('#fff6c0')); }
  // el anillo rueda desde la izquierda y deja la cinta de 365 marquitas
  const ru = ease(tramo(t, P5 + 0.1, Sf(21.8))), xr = lerp(30, 296, ru), y0 = 134, y1 = 150;
  if (xr > 18) { R.rect(16, y0 - 1, Math.round(xr), y1 + 1, K); rp(17, y0, Math.round(xr), y1, BR); rp(17, y0, Math.round(xr), y0 + 1, BRL); rp(17, y1 - 1, Math.round(xr), y1, BRS);
    for (let d = 0; d < 365; d++) { const x = 18 + d * 0.76; if (x > xr - 1) break; const mes = Math.floor(d / 30), epa = d >= 360; R.pset(Math.round(x), y0 + 3, epa ? hex('#c83a3a') : BRD); if (d % 30 === 0 || epa) R.linea(Math.round(x), y0 + 2, Math.round(x), y0 + (epa ? 9 : 7), epa ? hex('#c83a3a') : BRD);
      if (d % 30 === 15 && !epa) garabatos(Math.round(x) - 4, Math.round(x) + 4, y0 + 10, BRD, 260 + mes, 2); } }
  if (ru < 1) { const rr = 14 * (1 - ru * 0.7) + 3, a = -xr / rr; R.disco(xr, y1 - rr + 1, rr + 1, K); R.disco(xr, y1 - rr + 1, rr, BR); R.anillo(xr + 0.5, y1 - rr + 1.5, rr - 3, BRS); for (let k = 0; k < 12; k++) R.pset(Math.round(xr + Math.cos(a + k * 0.52) * (rr - 1.5)), Math.round(y1 - rr + 1 + Math.sin(a + k * 0.52) * (rr - 1.5)), BRD); }
  // la aguja corre los días y el contador sube hasta 365 en «365»
  const cu = tramo(t, Sf(21.9), Sf(22.8)), dia = Math.max(1, Math.round(cu * 365));
  if (cu > 0) { const x = Math.round(18 + (dia - 1) * 0.76); R.poligono([[x - 3, y0 - 8], [x + 3, y0 - 8], [x, y0 - 2]], K); R.poligono([[x - 2, y0 - 7], [x + 2, y0 - 7], [x, y0 - 3]], hex('#c83a3a'));
    const fin = t > Sf(22.85), cx = 216, cy = 98; R.rect(cx - 24, cy - 20, cx + 24, cy + 3, K); rp(cx - 23, cy - 19, cx + 23, cy + 2, fin ? hex('#fff2b0') : hex('#f2ecd8'));
    R.numero(String(dia), cx, cy - 1, { centro: true, tam: 16 }); if (fin) { const d = tramo(t, Sf(22.85), Sf(23.6)); destello(cx - 26, cy - 20, 1 - d); destello(cx + 26, cy - 4, Math.max(0, 1 - Math.abs(d - 0.3) * 3)); } }
  // el estudioso de 1905 asiente (y le salen canas: «a century»)
  const fin = t > Sf(23.0);
  R.actor(EL.estudiosoAK, 252, 124, t, { dir: -1, dedo: fin && t < Sf(24.4), sonrisa: fin, habla: !fin && Math.sin(t * 5) > 0.4 });
  { const bf = capas.get('estudio1905'); for (let y = 119; y <= 126; y++) for (let x = 232; x <= 272; x++) R.pset(x, y, bf[y * 320 + x]); }
  calma(hex('#5a6a4a'));
};

// ── 6 · el cielo de verdad y la esfera que apunta igual ──
const p6 = (t) => {
  const elige = ease(tramo(t, Sf(27.6), Sf(28.7))), as = lerp(-2.4, -1.5, elige) + (t - P6) * 0.01, al = lerp(-0.95, -0.45, elige) + (t - P6) * 0.02;
  // izquierda: el cielo del atardecer sobre el mar griego, con el Sol y la Luna en su arco
  degr(0, 0, 157, 128, [hex('#3a4a8a'), hex('#6a6aa8'), hex('#c87a8a'), hex('#f0a868'), hex('#f6d090')]);
  for (const [b, y, w, v] of [[10, 46, 30, 2], [90, 62, 24, 3.5], [40, 80, 34, 1.2]]) { const x = ((b + t * v) % 200) - 30; R.recorte([0, 0, 157, 179]); nube3(x, y, w, hex('#a86a7a'), hex('#e8a090'), hex('#f6d0b0')); R.recorte(null); }
  const ox = 80, oy = 150, rr = 96;
  for (let a = -Math.PI; a <= 0; a += 0.02) R.pset(Math.round(ox + Math.cos(a) * rr), Math.round(oy + Math.sin(a) * rr), hex('#f6e0c0'));
  const sxx = ox + Math.cos(as) * rr, syy = oy + Math.sin(as) * rr, lxx = ox + Math.cos(al) * rr, lyy = oy + Math.sin(al) * rr;
  const ls = t > Sf(26.0) ? 1 : 0, ll = t > Sf(26.6) ? 1 : 0;
  R.recorte([0, 0, 157, 179]);
  R.disco(sxx, syy, 9 + ls * Math.sin(t * 6), mez(hex('#f6d090'), hex('#fff6c0'), 0.5)); R.disco(sxx, syy, 6, hex('#f6c830')); R.disco(sxx - 1, syy - 1, 4, hex('#fff2a0'));
  R.disco(lxx, lyy, 5 + ll, hex('#f2f2f6')); R.disco(lxx + 2, lyy - 1, 4, mez(hex('#6a6aa8'), hex('#c87a8a'), 0.3)); if (ll) R.anillo(lxx + 0.5, lyy + 0.5, 8 + Math.sin(t * 6), hex('#f2f2f6'));
  R.recorte(null);
  // mar con brillos, una isla con un templo y una barquita
  for (let y = 128; y < 180; y++) for (let x = 0; x < 158; x++) { const v = Math.sin(x * 0.4 + y * 1.3 + t * 2) > 0.85; R.pset(x, y, v ? hex('#f0b080') : y < 140 ? hex('#4a5a9a') : hex('#3a4a8a')); }
  R.poligono([[0, 132], [30, 118], [62, 126], [78, 132]], hex('#2a2a4a')); for (const cx of [26, 32, 38, 44]) rp(cx, 112, cx + 1, 120, hex('#3a3a5a')); rp(24, 110, 46, 112, hex('#3a3a5a'));
  { const bx = 100 + Math.sin(t * 0.4) * 10; R.poligono([[bx - 6, 146], [bx + 6, 146], [bx + 4, 149], [bx - 4, 149]], K); R.linea(bx, 136, bx, 146, K); R.poligono([[bx + 1, 137], [bx + 7, 144], [bx + 1, 144]], hex('#f2ecda')); }
  for (let i = 0; i < 3; i++) ave(((t * 10 + i * 30) % 170) - 10, 100 + i * 4, t, i, hex('#2a2a4a'));
  // el marco de bronce que parte la pantalla
  rp(158, 0, 163, 179, BRS); rp(159, 0, 161, 179, BR); rp(159, 0, 159, 179, BRL); for (let y = 10; y < 180; y += 30) { R.disco(160.5, y, 1.5, BRD); R.pset(160, y - 1, BRL); }
  // derecha: la madera con la esfera; sus agujas apuntan igual
  tablasV(164, 0, 319, 179, 10, hex('#5a3820'), hex('#3e2414'), hex('#7a4e2c'), 250);
  for (let r = 0; r < 4; r++) garabatos(176, 222, 150 + r * 6, hex('#c8963a'), 270 + r, 3);
  const e = esfera(240, 96, 54, t, { sol: as, luna: al, fase: 0.35 + elige * 0.2, zod: 0, cal: 0 });
  if (ls) destello(e.sol[0], e.sol[1], 0.6 + 0.4 * Math.sin(t * 8)); if (ll) destello(e.luna[0], e.luna[1] - 6, 0.6 + 0.4 * Math.sin(t * 8 + 1));
  // la plaquita de la fecha elegida
  { const n = Math.round(lerp(117, 163, elige)); R.rect(274, 156, 310, 172, K); rp(275, 157, 309, 171, BR); rp(275, 157, 309, 158, BRL); R.numero(String(n), 292, 169, { centro: true, color: hex('#2a1a0a') }); }
};

// ── 7 · la bolita de la fase ──
const bolitaFondo = () => capa('bolita', () => {
  tablasV(0, 0, 319, 128, 12, hex('#5a3820'), hex('#3e2414'), hex('#7a4e2c'), 280);
  // el borde de la esfera (un arco de bronce con sus marquitas) a la izquierda
  for (let y = 0; y < 129; y++) for (let x = 0; x < 120; x++) { const d = Math.hypot(x + 60, y - 70); if (d < 150) R.pset(x, y, d > 146 ? K : d > 136 ? (d > 141 ? BR : mez(BR, BRL, 0.3)) : d > 104 ? (H_(x, y, 281) > 0.94 ? VERDL : mez(BR, BRS, 0.3)) : BRS); }
  for (let k = 0; k < 40; k++) { const a = -0.8 + k * 0.04, x = -60 + Math.cos(a) * 143, y = 70 + Math.sin(a) * 143; R.pset(Math.round(x), Math.round(y), BRD); }
  for (let k = 0; k < 4; k++) icZod(k, -60 + Math.cos(-0.5 + k * 0.3) * 120, 70 + Math.sin(-0.5 + k * 0.3) * 120, BRD, 2);
  // abajo, la franja de cielo de noche con las ocho fases
  for (let y = 129; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, H_(x, y, 282) > 0.985 ? BL : y < 132 ? BRS : hex('#141a34'));
  rp(0, 129, 319, 131, BR); rp(0, 129, 319, 129, BRL);
});
const p7 = (t) => {
  bolitaFondo();
  // la aguja de la Luna sale de la esfera y lleva la bolita
  const gi = tramo(t, Sf(31.85), Sf(33.6)), f = 0.25 + gi * 0.75 + (t - P7) * 0.01, bx = 196, by = 70;
  R.linea(60, 74, bx, by + 1, K); R.linea(60, 73, bx, by, hex('#d8dce8')); R.linea(60, 75, bx, by + 2, hex('#8a8e9a'));
  R.disco(bx + 3, by + 4, 32, hex('#2a1810'));
  bolita(bx, by, 30, f);
  // en «half light… half dark» el borde de cada mitad destella
  const hl = tramo(t, Sf(30.3), Sf(30.8)), hd = tramo(t, Sf(30.95), Sf(31.4));
  if (hl > 0 && hl < 1) destello(bx - 18, by - 16, 1 - hl); if (hd > 0 && hd < 1) destello(bx + 26, by + 10, 1 - hd);
  // las fases en la franja: se enciende la que toca
  for (let k = 0; k < 8; k++) { const x = 30 + k * 37, y = 155, on = Math.floor(((f % 1) * 8 + 0.5)) % 8 === k;
    if (on) { R.disco(x, y, 13, hex('#2a3a6a')); R.anillo(x + 0.5, y + 0.5, 13, hex('#f6d040')); }
    bolita(x, y, 9, k / 8); }
};

const efectos = [[M_(1.5), 'golpecito'], [M_(2.85), 'papel'], [M_(3.1), 'miau'], [M_(4.0), 'tic'],
  [M_(5.9), 'tic'], [M_(6.2), 'maquina'], [M_(9.7), 'golpecito'], [M_(9.9), 'maquina'],
  [P3 + 0.45, 'tic'], [Sf(13.4), 'tic'], [Sf(14.5), 'tic'], [Sf(14.8), 'pop'],
  [Sf(16.33), 'brillo'], [Sf(18.1), 'brillo'],
  [P5 + 0.15, 'carro'], [Sf(21.9), 'maquina'], [Sf(22.85), 'campana'],
  [Sf(26.06), 'brillo'], [Sf(26.64), 'brillo'], [Sf(27.6), 'tic'],
  [Sf(29.75), 'pop'], [Sf(30.4), 'brillo'], [Sf(31.9), 'maquina']];
const año = (t) => (t >= P5 && t < P6 ? Math.round(1905 + 100 * tramo(t, P5 + 0.2, Sf(23.9))) : 2026);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')


E['ak-luna'] = ('La Luna', '''// AK-LUNA (frases 18–19), Grecia antigua y la caja de hoy, sin año ni cartela. Seis planos:
// 1. (0 → «Sometimes») noche sobre el mar y un pueblo griego: la Luna cruza el cielo y deja lunas fantasma a intervalos
//    iguales que quedan desiguales («doesn't cross the sky at a steady speed»); la lechuza de la columna la sigue con la
//    cabeza; la barca con su farol se mece;
// 2. («Sometimes» → «the builder») la carrera del cielo: la Luna adelanta a la liebre en «faster» (con rayas de
//    velocidad) y en «slower» se queda junto a la tortuga mientras la liebre la pasa;
// 3. («the builder» → «The result») maquina 'caja' cámara 'dentro': la lente sigue las dos ruedecitas en «two gears»,
//    marca los ejes en «offset axles» y la clavija en «pin»/«slot», que va a tirones;
// 4. («The result» → «That was») el frente del mecanismo de cerca sobre el banco: la aguja de la Luna acelera y frena;
//    en el silencio, el guante de Atom gira la manivela demasiado rápido, la bolita da vueltas locas, la caja tiembla y
//    a la bolita le giran estrellitas: se marea (gag 6); el guante se aparta;
// 5. («That was» → «2,000») antigua 'taller' general: Hiparco enseña su papiro de círculos clavado en la pared y lo
//    señala en «Hipparchus»; el artesano llega con una rueda de bronce y la levanta en «bronze» (los círculos se doran);
// 6. («2,000» → fin) un cofre de madera en una mesa con lucerna, de noche: en «model of the sky» se abre la tapa y dentro
//    hay un cielo con estrellas, el Sol y la Luna que giran; en «gears» se encienden las ruedas del fondo.''', PRE + MIO + r'''
import { PIEZAS_TR } from '/atomo/plato/kits/pixel-chibi.js';
const Lu = (s) => en('truco', (s - 0.5) / 17.383), Hp = (s) => en('hiparco', (s - 21.183) / 9.278);
const P2 = Lu(5.39), P3 = Lu(9.41), P4 = Lu(14.92), P5 = Hp(21.18), P6 = Hp(26.0);

// ── 1 · la Luna cruza el cielo sobre el mar ──
const nocheFondo = () => capa('nocheMar', () => {
  degr(0, 0, 319, 112, [hex('#0c1030'), hex('#141a44'), hex('#1e2858'), hex('#2a3a6a')]);
  for (let i = 0; i < 90; i++) { const x = Math.floor(H_(i, 1, 300) * 320), y = Math.floor(H_(i, 2, 300) * 100); if ((x > 272 && y < 50) || (x > 18 && x < 172 && y < 22)) continue; R.pset(x, y, H_(i, 3, 300) > 0.7 ? BL : hex('#8a9ac8')); }
  // colina con el templo y el pueblo de casitas encaladas
  for (let x = 0; x < 320; x++) { const h = 96 + Math.round(Math.sin(x * 0.02) * 6 + Math.sin(x * 0.07) * 2) - (x > 180 && x < 300 ? Math.round(14 * Math.exp(-(((x - 236) / 34) ** 2))) : 0); for (let y = h; y <= 124; y++) R.pset(x, y, H_(x >> 1, y >> 1, 301) > 0.85 ? hex('#1e2a3a') : hex('#18222e')); }
  for (const cx of [222, 230, 238, 246]) rp(cx, 70, cx + 2, 80, hex('#4a5068')); rp(218, 67, 252, 70, hex('#5a6078')); R.poligono([[218, 67], [235, 60], [252, 67]], hex('#4a5068')); rp(218, 80, 252, 82, hex('#3a4058'));
  for (let i = 0; i < 14; i++) { const x = 20 + i * 13 + Math.floor(H_(i, 1, 302) * 6), y = 100 + Math.floor(H_(i, 2, 302) * 12); rp(x, y, x + 9, y + 7, hex('#c8ccd8')); rp(x, y, x + 9, y, hex('#e8ecf4')); rp(x + 9, y, x + 9, y + 7, hex('#8a90a8')); rp(x + 3, y + 3, x + 4, y + 7, hex('#2a2e3e'));
    if (H_(i, 3, 302) > 0.5) rp(x + 6, y + 2, x + 7, y + 3, hex('#f6c860')); }
  // olivos
  for (const [x, y] of [[8, 112], [196, 106], [300, 112]]) { rp(x, y, x + 1, y + 10, hex('#3a2a1e')); R.disco(x, y - 3, 6, hex('#2a3a2e')); R.disco(x - 3, y - 1, 4, hex('#33463a')); R.disco(x + 3, y - 5, 3, hex('#3e5244')); }
  // el muelle de piedra y la columna de la lechuza
  rp(0, 124, 80, 130, hex('#5a5a6a')); for (let x = 0; x < 80; x += 8) rp(x, 124, x, 130, hex('#3a3a4a')); rp(0, 124, 80, 124, hex('#7a7a8a'));
  rp(58, 92, 66, 124, hex('#9a9aa8')); for (let x = 59; x < 66; x += 2) rp(x, 93, x, 123, hex('#7a7a88')); rp(55, 89, 69, 92, hex('#aaaab8'));
});
const lunaU = (t) => { const s = tramo(t, 0.2, P2 + 0.4); return s + 0.07 * Math.sin(s * 2 * Math.PI) - 0.02 * Math.sin(s * 4 * Math.PI); };
const lunaP = (u) => [lerp(20, 300, u), 92 - Math.sin(u * Math.PI) * 58];
const p1 = (t) => {
  nocheFondo();
  // las lunas fantasma, una cada 0,6 s: quedan desiguales
  for (let k = 1; k < 12; k++) { const tk = 0.2 + k * 0.6; if (tk >= t - 0.05) break; const [x, y] = lunaP(lunaU(tk)); R.anillo(x + 0.5, y + 0.5, 5, hex('#5a6aa8')); R.pset(Math.round(x), Math.round(y), hex('#8a9ac8')); }
  const [lx, ly] = lunaP(lunaU(t)); R.disco(lx, ly, 10, hex('#2e3a6e')); R.disco(lx, ly, 7, hex('#f2f0e0')); R.disco(lx + 2, ly + 1, 2, hex('#d8d6c4')); R.disco(lx - 2, ly - 2, 1.4, hex('#d8d6c4'));
  // nubecitas de noche a dos velocidades
  for (const [b, y, w, v] of [[40, 44, 30, 3], [200, 60, 24, 5]]) nube3(((b + t * v) % 280) - 30, y, w, hex('#1e2858'), hex('#3a4a7a'), hex('#5a6a9a'));
  // el mar con el reguero de la Luna
  for (let y = 125; y < 180; y++) for (let x = 0; x < 320; x++) { const w = Math.sin(x * 0.25 + y * 0.9 + t * 2.2 + Math.sin(y) * 2), cerca = Math.abs(x - lx) < 6 + (y - 125) * 0.3;
    R.pset(x, y, w > 0.8 ? (cerca ? hex('#f2f0e0') : hex('#3a4a7a')) : cerca && w > 0.2 ? hex('#8a9ac8') : y < 140 ? hex('#141c40') : hex('#101634')); }
  // la barca con su farol que se mece
  { const bx = 150 + Math.sin(t * 0.3) * 14, by = 152 + Math.round(Math.sin(t * 1.7) * 1.5); R.poligono([[bx - 14, by - 4], [bx + 14, by - 4], [bx + 10, by + 2], [bx - 10, by + 2]], hex('#5a3a22')); rp(bx - 14, by - 4, bx + 14, by - 4, hex('#8a5a32'));
    R.linea(bx + 8, by - 4, bx + 8, by - 14, hex('#3a2a1e')); R.disco(bx + 8, by - 15, 2, hex('#f6c860')); R.disco(bx + 8, by - 15, 4 + Math.sin(t * 9) * 0.5, mez(hex('#141c40'), hex('#f6c860'), 0.25)); R.disco(bx + 8, by - 15, 1.5, hex('#fff6c0'));
    R.disco(bx - 4, by - 7, 2.5, hex('#2a2a3a')); rp(bx - 6, by - 6, bx - 2, by - 4, hex('#2a2a3a')); }
  // la lechuza en la columna: gira la cabeza hacia la Luna
  { const ox = 62, oy = 82, mira = lx < ox - 20 ? -1 : lx > ox + 20 ? 1 : 0; R.disco(ox, oy, 6, hex('#7a6a4a')); R.disco(ox, oy - 6, 4.5, hex('#8a7a5a')); R.pset(ox - 4, oy - 10, hex('#7a6a4a')); R.pset(ox + 4, oy - 10, hex('#7a6a4a'));
    const parp = Math.sin(t * 1.3) > 0.97; for (const d of [-2, 2]) { R.disco(ox + d + mira, oy - 6, 1.6, hex('#f6d040')); if (!parp) R.pset(ox + d + mira, oy - 6, K); } R.pset(ox + mira, oy - 4, hex('#e8a030')); for (let i = -3; i <= 3; i += 2) R.pset(ox + i, oy + 2, hex('#5a4a2a')); }
  // los faroles del pueblo titilan
  for (let i = 0; i < 14; i++) if (H_(i, 3, 302) > 0.5 && Math.sin(t * 3 + i) > 0.6) { const x = 20 + i * 13 + Math.floor(H_(i, 1, 302) * 6), y = 100 + Math.floor(H_(i, 2, 302) * 12); R.pset(x + 6, y + 2, hex('#fff6c0')); }
};

// ── 2 · la carrera del cielo ──
const carreraFondo = () => capa('carrera', () => {
  degr(0, 0, 319, 126, [hex('#0e1236'), hex('#141c4c'), hex('#1e2860'), hex('#2e3672')]);
  // la Vía Láctea en diagonal: niebla suave y muchas estrellitas
  for (let y = 0; y < 126; y++) for (let x = 0; x < 320; x++) { if ((x > 262 && y < 54) || (x > 14 && x < 176 && y < 24)) continue; const d = Math.abs((y - 110) + (x - 40) * 0.32) / 26, n = vn(x, y, 7, 315); if (d < 1 && n > 0.45) R.pset(x, y, mez(R.pget(x, y), hex('#6a72b0'), (1 - d) * (n - 0.45) * 0.9)); if (d < 1 && H_(x, y, 316) > 0.97) R.pset(x, y, hex('#c8d0f0')); }
  for (let i = 0; i < 110; i++) { const x = Math.floor(H_(i, 1, 310) * 320), y = Math.floor(H_(i, 2, 310) * 124); if ((x > 272 && y < 50) || (x > 18 && x < 172 && y < 22)) continue; R.pset(x, y, H_(i, 3, 310) > 0.6 ? BL : hex('#7a8ab8')); }
  // la pista: la banda del zodiaco (dos rayas de puntos) con sus constelaciones unidas
  for (let x = 0; x < 320; x++) { if ((x >> 2) % 2) { R.pset(x, 50, hex('#4a5aa0')); R.pset(x, 96, hex('#4a5aa0')); } }
  for (let c = 0; c < 6; c++) { let px = 12 + c * 52, py = 62 + Math.floor(H_(c, 1, 311) * 20); for (let s = 0; s < 4; s++) { const nx = px + 6 + Math.floor(H_(c, s, 312) * 8), ny = 56 + Math.floor(H_(c, s, 313) * 36); R.linea(px, py, nx, ny, hex('#34449a')); R.pset(px, py, BL); px = nx; py = ny; } R.pset(px, py, BL); }
  // montes lejanos, la colina de la carrera con su camino, olivos, piedras y la meta con su cinta
  for (let x = 0; x < 320; x++) { const h = 116 + Math.round(Math.sin(x * 0.05) * 5 + Math.sin(x * 0.013) * 6); for (let y = h; y < 126; y++) R.pset(x, y, hex('#1e2440')); }
  for (let x = 0; x < 320; x++) { const h = 124 + Math.round(Math.sin(x * 0.03) * 3); for (let y = h; y < 180; y++) R.pset(x, y, y < h + 2 ? hex('#5a6a42') : vn(x, y, 5, 314) > 0.62 ? hex('#34422a') : H_(x, y, 317) > 0.93 ? hex('#4a5a36') : hex('#2a3620')); }
  for (let y = 148; y < 162; y++) for (let x = 0; x < 320; x++) R.pset(x, y, H_(x, y, 318) > 0.85 ? hex('#8a7a5a') : y === 148 || y === 161 ? hex('#4a4030') : hex('#6a5a40'));
  for (let i = 0; i < 12; i++) { const x = Math.floor(H_(i, 1, 319) * 320), y = 166 + Math.floor(H_(i, 2, 319) * 10); R.disco(x, y, 2, hex('#6a6a5a')); R.pset(x - 1, y - 1, hex('#9a9a8a')); }
  for (const [x, y] of [[36, 128], [130, 126], [222, 128]]) { rp(x, y, x + 2, y + 14, hex('#3a2a1e')); R.disco(x, y - 4, 8, hex('#26342a')); R.disco(x - 4, y - 2, 6, hex('#2e4032')); R.disco(x + 4, y - 7, 5, hex('#3a5040')); for (let k = 0; k < 6; k++) R.pset(x - 6 + Math.floor(H_(k, x, 320) * 12), y - 9 + Math.floor(H_(k, 2, 320) * 10), hex('#5a7050')); }
  rp(296, 120, 298, 160, hex('#c8c0a8')); rp(312, 120, 314, 160, hex('#c8c0a8')); R.linea(298, 128, 312, 130, hex('#e83a3a')); R.disco(297, 119, 2, hex('#f6d040')); R.disco(313, 119, 2, hex('#f6d040'));
});
const TORT = ['....kkkkk.....', '...kGgGgGk....', '..kGgGgGgGk.kk', '.kgGgGgGgGgkLk', 'kkkkkkkkkkkkLk', '.kLLk..kLLk.k.'];
const tortuga = (x, y, t) => { const p = Math.floor(t * 3) % 2, C = { k: K, G: hex('#5a8a3a'), g: hex('#7aaa4a'), L: hex('#9ab870') };
  TORT.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = C[f[i]]; if (!c) continue; let jj = j; if (j === 5 && ((i < 6) === !!p)) jj = 4.5; R.rect(Math.round(x - 14 + i * 2), Math.round(y - 12 + jj * 2), Math.round(x - 13 + i * 2), Math.round(y - 11 + jj * 2), c); } }); };
const p2 = (t) => {
  carreraFondo();
  const s = t - P2, f1 = Lu(6.1) - P2, f2 = Lu(7.25) - P2;
  const xm = 50 + (s < f1 ? s * 20 : f1 * 20 + (s < f2 ? (s - f1) * 72 : (f2 - f1) * 72 + (s - f2) * 5)), ym = 74 + Math.sin(s * 2) * 3;
  const xh = 30 + s * 34, xt = 64 + s * 10, rap = s > f1 && s < f2;
  // estela de la Luna (larga deprisa, corta despacio) y rayas de velocidad
  const L = rap ? 60 : s < f1 ? 14 : 4; for (let i = 0; i < L; i++) { const c = mez(hex('#1e2860'), hex('#f2f0e0'), (1 - i / L) * 0.7); R.pset(Math.round(xm - 14 - i), Math.round(ym - 3 + (i % 3)), c); R.pset(Math.round(xm - 14 - i), Math.round(ym + 3 - (i % 3)), c); }
  if (rap) for (let k = 0; k < 4; k++) R.linea(xm - 18 - k * 4, ym - 9 + k * 6, xm - 44 - k * 8, ym - 9 + k * 6, hex('#8a9ac8'));
  R.disco(xm, ym, 16, mez(hex('#1e2860'), hex('#f2f0e0'), 0.2)); R.disco(xm, ym, 13, K); R.disco(xm, ym, 12, hex('#f2f0e0')); R.disco(xm + 3, ym + 2, 3, hex('#d8d6c4')); R.disco(xm - 4, ym - 3, 2, hex('#d8d6c4')); R.disco(xm + 2, ym - 6, 1.5, hex('#d8d6c4'));
  for (let y = Math.round(ym) + 18; y < 140; y += 3) R.pset(Math.round(xm), y, hex('#8a9ac8'));
  // los corredores por el camino
  PIEZAS_TR.liebre(R, Math.round(xh), 158, { t, salta: true, s: 2 });
  tortuga(xt, 158, t);
  // cuando la Luna frena, la liebre la pasa: una «!»
  const ad = tramo(t, Lu(8.0), Lu(8.3)) * (1 - tramo(t, Lu(9.0), Lu(9.3))); if (ad > 0) icoBoca(Math.round(xh) + 6, 112, '!', hex('#c83a2a'));
};

// ── 3 · por dentro: las dos ruedecitas, la clavija y la ranura ──
const p3 = (t) => {
  const o = { encuadre: 'caja', camara: 'dentro', giro: (t - P3) * 0.3 + 0.2 };
  const geo = T.maquina(R, t, o);
  T.maquinaDelante(R, t, o);
  const [cx, cy] = geo.clavija ?? [200, 64];
  // la lente que sigue a las ruedecitas
  const ap = ease(tramo(t, Lu(10.0), Lu(10.4))), r = 14 + (1 - ap) * 30;
  if (ap > 0) { R.anillo(cx + 0.5, cy + 0.5, r + 1, K); R.anillo(cx + 0.5, cy + 0.5, r, hex('#f6e8b0')); R.anillo(cx + 0.5, cy + 0.5, r - 1, mez(hex('#f6e8b0'), K, 0.5)); }
  // los ejes desplazados: dos puntitos rojos en «offset axles»
  const ej = tramo(t, Lu(11.1), Lu(11.5)) * (1 - tramo(t, Lu(12.6), Lu(12.8)));
  if (ej > 0) { const a = (t - P3) * 0.3 * 2 * Math.PI; for (const [dx, dy] of [[-3, 0], [3, 0]]) { const x = cx - 6 + dx, y = cy + 6 + dy; R.disco(x, y, 2, K); R.disco(x, y, 1.4, hex('#e83a3a')); } R.linea(cx - 9, cy + 9, cx - 3, cy + 9, hex('#f6e8b0')); }
  // la clavija que late en «pin» y en «slot»
  const pi = (t > Lu(13.0) && t < Lu(13.6)) || (t > Lu(14.0) && t < Lu(14.6)); if (pi) { R.disco(cx, cy, 3, hex('#e83a3a')); R.pset(cx - 1, cy - 1, BL); destello(cx + 6, cy - 6, 0.5 + 0.5 * Math.sin(t * 12)); }
};

// ── 4 · la caja desde el lado de la manivela: la Luna acelera y frena… y se marea ──
const ladoFondo = () => capa('lado', () => {
  // pared azul petróleo con zócalo, un plano de ruedas enmarcado y una lámpara colgada
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const v = H_(x >> 1, y >> 1, 325), w = vn(x, y, 11, 326); R.pset(x, y, y > 112 ? ((x % 22) === 0 ? hex('#1a2e30') : y === 113 ? hex('#4a6a6a') : hex('#24403e')) : w > 0.7 ? hex('#2e4e52') : v > 0.9 ? hex('#3a5a5e') : hex('#2a4648')); }
  R.rect(16, 24, 70, 74, K); rp(17, 25, 69, 73, hex('#c8963a')); rp(19, 27, 67, 71, hex('#1e3a6a')); for (let y = 30; y < 70; y += 6) for (let x = 20; x < 67; x += 6) R.pset(x, y, hex('#3a5a8a'));
  rueda(36, 46, 10, 14, 0.3, hex('#1e3a6a'), hex('#1e3a6a'), hex('#1e3a6a'), { borde: hex('#a8c8f0'), radios: false }); rueda(54, 58, 7, 10, 0.1, hex('#1e3a6a'), hex('#1e3a6a'), hex('#1e3a6a'), { borde: hex('#a8c8f0'), radios: false });
  rp(160, 0, 160, 14, hex('#1a1a1a'));
  // mesa con tapete rojo y flecos
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 134 ? hex('#e86a5a') : H_(x, y, 327) > 0.9 ? hex('#a83a32') : (x + y) % 5 === 0 ? hex('#b2443a') : hex('#c04a3e'));
  for (let x = 0; x < 320; x += 3) rp(x, 176, x, 179, hex('#e8c060'));
  // la caja: cara de delante en escorzo (izquierda), lado grande (derecha) y tapa
  R.poligono([[44, 40], [104, 26], [104, 150], [44, 150]], K); R.poligono([[45, 41], [103, 27], [103, 149], [45, 149]], hex('#5a3820'));
  for (let x = 46; x < 103; x += 6) R.linea(x, 41 - Math.round((x - 45) * 0.24), x, 148, hex('#4a2c18'));
  R.poligono([[44, 40], [104, 26], [292, 26], [262, 40]], K); R.poligono([[46, 39], [104, 27], [290, 27], [262, 39]], hex('#7a4e2c'));
  R.rect(104, 26, 264, 150, K); tablas(105, 27, 263, 149, 11, hex('#6a4024'), hex('#4a2c18'), hex('#8a5a34'), 328);
  R.poligono([[264, 40], [292, 26], [292, 136], [264, 150]], K); R.poligono([[265, 40], [291, 27], [291, 135], [265, 149]], hex('#3e2414'));
  for (let x = 108; x < 262; x += 30) { R.disco(x, 31, 1.4, BRD); R.pset(x, 30, BRL); R.disco(x, 145, 1.4, BRD); }
  for (let x = 0; x < 320; x++) for (let y = 150; y < 158; y++) if (x > 40 && x < 300) R.pset(x, y, mez(R.pget(x, y), K, 0.35 * (1 - (y - 150) / 8)));
});
const p4 = (t) => {
  ladoFondo();
  // la lámpara colgada que se mece un poco, con su cono de luz
  const lx = 160 + Math.round(Math.sin(t * 1.1) * 2); R.linea(160, 14, lx, 20, hex('#1a1a1a')); R.poligono([[lx - 9, 28], [lx + 9, 28], [lx + 4, 20], [lx - 4, 20]], hex('#3a5a3a')); R.disco(lx, 29, 3, hex('#fff6c0'));
  const L0 = Lu(17.75), L1 = Lu(19.2), loca = t > L0 && t < L1;
  const giro = (t - P4) * 0.22 + (t > L0 ? Math.min(t - L0, L1 - L0) * 3.0 : 0);
  const marea = tramo(t, L1 - 0.4, L1 + 0.1) * (1 - tramo(t, P5 - 0.45, P5 - 0.05)), tb = loca ? Math.round(Math.sin(t * 50)) : 0;
  // la esfera en escorzo sobre la cara de delante: elipse de bronce y la aguja de la Luna (acelera y frena)
  const ex = 74 + tb, ey = 90, rx = 22, ry = 44, ang = giro * 2 * Math.PI, alu = ang + 0.35 * Math.sin(ang);
  for (let y = ey - ry; y <= ey + ry; y++) for (let x = ex - rx; x <= ex + rx; x++) { const d = ((x - ex) / rx) ** 2 + ((y - ey) / ry) ** 2; if (d > 1) continue; R.pset(x, y, d > 0.86 ? (d > 0.95 ? K : BRL) : d > 0.5 ? (H_(x, y, 329) > 0.9 ? VERDL : mez(BR, BRS, (x - ex + rx) / (4 * rx))) : BRS); }
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.linea(ex + Math.cos(a) * rx * 0.7, ey + Math.sin(a) * ry * 0.7, ex + Math.cos(a) * rx * 0.93, ey + Math.sin(a) * ry * 0.93, BRD); }
  const bx = ex + Math.cos(alu - Math.PI / 2) * rx * 0.6, by = ey + Math.sin(alu - Math.PI / 2) * ry * 0.6;
  R.linea(ex, ey + 1, bx, by + 1, BRD); R.linea(ex, ey, bx, by, hex('#d8dce8')); R.disco(ex, ey, 2, K);
  bolita(bx + (marea > 0 ? Math.sin(t * 9) * 2 : 0), by, 7, giro * 1.0 + (loca ? t * 3 : 0) + (marea > 0 ? t * 1.5 : 0));
  // la manivela grande, de cara: el eje en el lado y el brazo que gira
  const ax = 214 + tb, ay = 86, px = ax + Math.cos(ang) * 34, py = ay + Math.sin(ang) * 34;
  R.disco(ax, ay, 10, K); R.disco(ax, ay, 9, BRS); R.disco(ax - 1, ay - 1, 7, BR); R.disco(ax, ay, 3, BRD);
  for (const [dx, dy, c] of [[0, 2, K], [0, 1, BRS], [0, 0, BR], [0, -1, BRL]]) R.linea(ax + dx, ay + dy, px + dx, py + dy, c);
  R.disco(px + 1, py + 2, 7, hex('#2a1810')); R.disco(px, py, 7, K); R.disco(px, py, 6, hex('#8a5a32')); R.disco(px - 2, py - 2, 3, hex('#b07a46'));
  if (loca) for (let k = 0; k < 6; k++) { const a = ang - k * 0.25; R.pset(Math.round(ax + Math.cos(a) * 40), Math.round(ay + Math.sin(a) * 40), mez(hex('#3e2414'), hex('#f6e8b0'), 1 - k / 6)); }
  // el guante en el pomo desde el corte: despacio, luego demasiado rápido; al marearse la bolita, se aparta
  const sa = ease(tramo(t, L1, L1 + 0.5));
  if (sa < 1) { const hx = lerp(px + 2, 300, sa), hy = lerp(py, 30, sa); T.mano(R, Math.round(hx), Math.round(hy), -1, GUANTE, { sinManga: true }); }
  // la bolita mareada: estrellitas que giran y una espiral
  if (marea > 0) { for (let k = 0; k < 3; k++) { const a = t * 6 + k * 2.09, x = bx + Math.cos(a) * 15, y = by - 15 + Math.sin(a) * 5; R.disco(x, y, 4, K); R.linea(x - 3, y, x + 3, y, BL); R.linea(x, y - 3, x, y + 3, BL); R.pset(Math.round(x), Math.round(y), hex('#f6d040')); }
    for (let i = 0; i < 26; i++) { const a = i * 0.45 + t * 5, r = 1 + i * 0.28, x = Math.round(bx + 20 + Math.cos(a) * r), y = Math.round(by - 22 + Math.sin(a) * r); R.pset(x + 1, y + 1, K); R.pset(x, y, hex('#e8d8ff')); } }
  // la «?» del guante cuando se aparta
  const qq = tramo(t, L1 + 0.3, L1 + 0.6) * (1 - tramo(t, P5 - 0.3, P5)); if (qq > 0) icoBoca(276, 60, '?');
};

// ── 5 · el taller: el papiro de Hiparco y la rueda de bronce ──
const p5 = (t) => {
  const o = { encuadre: 'taller' };
  T.antigua(R, t, o);
  // el papiro grande clavado en la pared: círculo, epiciclo y la trayectoria de la Luna
  const dor = tramo(t, Hp(25.0), Hp(25.5)), px = 96, py = 34, pw = 82, ph = 58;
  R.rect(px - 1, py - 1, px + pw + 1, py + ph + 1, K);
  for (let y = py; y <= py + ph; y++) for (let x = px; x <= px + pw; x++) R.pset(x, y, (y - py) % 9 === 0 ? hex('#d8c08a') : H_(x >> 1, y, 340) > 0.88 ? hex('#c8ac78') : hex('#e8d4a0'));
  rp(px - 3, py - 2, px - 1, py + ph + 2, hex('#a07840')); rp(px + pw + 1, py - 2, px + pw + 3, py + ph + 2, hex('#a07840'));
  const tin = mez(hex('#5a4030'), hex('#d89a2a'), dor), cx = px + 30, cy = py + 30, a = (t - P5) * 0.8;
  R.anillo(cx + 0.5, cy + 0.5, 20, tin); R.disco(cx, cy, 2, tin); const ex = cx + Math.cos(a) * 20, ey = cy + Math.sin(a) * 20; R.anillo(ex + 0.5, ey + 0.5, 6, tin);
  const mx = ex + Math.cos(a * 3) * 6, my = ey + Math.sin(a * 3) * 6; R.disco(mx, my, 2, hex('#8a8e9a')); R.linea(cx, cy, ex, ey, tin, 2);
  for (let k = 0; k < 40; k++) { const b = k * 0.157, x = cx + Math.cos(b) * 20 + Math.cos(b * 3) * 6, y = cy + Math.sin(b) * 20 + Math.sin(b * 3) * 6; if (k % 2) R.pset(Math.round(x), Math.round(y), mez(tin, hex('#e8d4a0'), 0.4)); }
  for (let r = 0; r < 5; r++) garabatos(px + 58, px + pw - 3, py + 8 + r * 7, hex('#5a4030'), 360 + r, 3);
  if (dor > 0 && dor < 1) destello(cx + 20, cy - 16, 1 - dor);
  // Hiparco habla y señala su papiro en «Hipparchus»; el artesano trae la rueda y la levanta en «bronze»
  const se = t > Hp(23.7) && t < Hp(25.0), u = tramo(t, P5 + 0.2, Hp(22.6)), sube = t > Hp(24.95);
  R.actor(EL.hiparcoAK, 140, 160, t, { dir: 1, dedo: se, habla: !se && t < Hp(23.7) && Math.sin(t * 6) > 0, sonrisa: sube });
  const ar = R.actor(EL.artesanoAK, Math.round(lerp(236, 176, ease(u))), 160, t, { dir: -1, anda: u > 0 && u < 1, sostiene: sube ? [Math.round(lerp(236, 176, ease(u))) - 6, 130] : true, sorpresa: false, sonrisa: sube });
  if (ar && ar.mano) { const [hx, hy] = ar.mano, rr = sube ? 7 : 5; rueda(hx, hy - rr + 1, rr, 14, t * (sube ? 1.5 : 0.3), BR, BRS, BRL); if (sube) destello(hx + 6, hy - rr * 2, 0.5 + 0.5 * Math.sin(t * 9)); }
  T.antiguaDelante(R, t, o);
};

// ── 6 · el cofre con el cielo dentro ──
const cofreFondo = () => capa('cofre', () => {
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const v = H_(x >> 1, y >> 1, 370), w = vn(x, y, 10, 371); R.pset(x, y, w > 0.78 ? hex('#3a2e26') : v > 0.9 ? hex('#3e3028') : v < 0.07 ? hex('#261c16') : (x >> 1) % 7 === 0 && (y % 9) < 1 ? hex('#2a1e18') : hex('#32261e')); }
  rp(0, 114, 319, 131, hex('#4a2e1c')); rp(0, 114, 319, 115, hex('#6a4428')); for (let x = 0; x < 320; x += 24) rp(x, 116, x, 131, hex('#2a1a10'));
  // nicho con ánforas y rollos; ventana de noche con estrellas
  R.rect(16, 40, 72, 98, K); rp(17, 41, 71, 97, hex('#20160f')); for (const [x, c] of [[26, '#a8643a'], [44, '#8a5a32']]) { R.disco(x, 80, 7, hex(c)); rp(x - 2, 66, x + 2, 74, hex(c)); rp(x - 4, 64, x + 4, 66, hex(c)); R.pset(x - 3, 78, hex('#d08a5a')); }
  for (let i = 0; i < 3; i++) { R.disco(60, 90 - i * 5, 3, hex('#e8d4a0')); R.pset(60, 90 - i * 5, hex('#a8905a')); }
  R.rect(232, 46, 274, 96, K); degr(233, 47, 273, 95, [hex('#0c1030'), hex('#1e2858')]); rp(252, 47, 253, 95, hex('#5a4030')); rp(233, 70, 273, 71, hex('#5a4030'));
  // la mesa
  R.rect(0, 132, 319, 135, K); tablas(0, 136, 319, 179, 8, hex('#7a4a28'), hex('#5a321a'), hex('#9a6a3e'), 372); rp(0, 132, 319, 135, hex('#a07040'));
});
const p6 = (t) => {
  cofreFondo();
  for (let i = 0; i < 9; i++) if (Math.sin(t * 2 + i * 1.7) > 0.3) R.pset(234 + Math.floor(H_(i, 1, 373) * 38), 48 + Math.floor(H_(i, 2, 373) * 46), BL);
  // la lucerna de la mesa (la llama baila) y un gato que duerme y respira
  { const x = 52, y = 128; R.disco(x, y, 7, K); R.disco(x, y, 6, hex('#a8643a')); rp(x + 4, y - 3, x + 12, y, hex('#a8643a')); const f = Math.sin(t * 13) > 0 ? 1 : 0; R.disco(x + 12, y - 5 - f, 2, hex('#f6c830')); R.pset(x + 12, y - 8 - f, hex('#fff6c0'));
    for (let yy = 100; yy < 132; yy++) for (let xx = 30; xx < 96; xx++) if (((xx ^ yy) & 1) && Math.hypot(xx - 64, yy - 122) < 30) R.pset(xx, yy, mez(R.pget(xx, yy), hex('#f6c860'), 0.08)); }
  T.gato(R, 270, 132, t);
  // el cofre: se abre en «model of the sky»
  const ab = ease(tramo(t, Hp(27.95), Hp(28.6))), x0 = 104, x1 = 216, yT = 98, yB = 152;
  const glow = ab; if (glow > 0) for (let yy = 30; yy < 132; yy++) for (let xx = 80; xx < 240; xx++) if (((xx ^ yy) & 1) && Math.hypot(xx - 160, yy - 98) < 70) R.pset(xx, yy, mez(R.pget(xx, yy), hex('#8ab0f0'), 0.18 * glow * (1 - Math.hypot(xx - 160, yy - 98) / 70)));
  // la tapa: de cerrada (encima) a abierta (de pie detrás), con su cara de dentro de cielo
  const hl = Math.round(lerp(10, 58, ab)), yl = yT - hl;
  if (ab > 0.05) { const ins = Math.round(8 * ab), q = [[x0 + 2 + ins, yl], [x1 - 2 - ins, yl], [x1 - 2, yT], [x0 + 2, yT]];
    R.poligono(q.map(([x, y]) => [x + (x < 160 ? -1 : 1), y - 1]), K); R.poligono(q, hex('#5a3820'));
    const qi = [[x0 + 6 + ins, yl + 4], [x1 - 6 - ins, yl + 4], [x1 - 5, yT - 1], [x0 + 5, yT - 1]];
    R.poligono(qi, (x, y) => H_(x, y, 380) > 0.95 ? BL : H_(x, y, 381) > 0.988 ? hex('#f6d040') : y < yl + 10 ? hex('#101640') : hex('#18205a'));
    if (ab > 0.6) { R.recorte([x0 + 6, yl + 4, x1 - 6, yT - 1]); const cx = 160, cy = yT + 6, rr = (yT - yl) * 0.75;
      for (let a = Math.PI * 1.08; a < Math.PI * 1.92; a += 0.03) { R.pset(Math.round(cx + Math.cos(a) * rr * 1.2), Math.round(cy + Math.sin(a) * rr), hex('#c8963a')); }
      for (let k = 0; k < 12; k++) { const a = Math.PI * (1.1 + k * 0.07); icZod(k, cx + Math.cos(a) * rr * 1.2, cy + Math.sin(a) * rr - 6, hex('#8a6a3a')); }
      const as = Math.PI * (1.15 + ((t - P6) * 0.12) % 0.7), al = Math.PI * (1.2 + ((t - P6) * 0.33) % 0.65);
      const sx = cx + Math.cos(as) * rr * 1.2, sy = cy + Math.sin(as) * rr; R.disco(sx, sy, 5, mez(hex('#18205a'), hex('#f6c830'), 0.4)); R.disco(sx, sy, 3.5, hex('#f6c830')); R.pset(Math.round(sx) - 1, Math.round(sy) - 1, hex('#fff6c0'));
      const mx = cx + Math.cos(al) * rr * 1.2, my = cy + Math.sin(al) * rr; R.disco(mx, my, 3, hex('#f2f0e0')); R.disco(mx + 1, my - 1, 2, hex('#18205a'));
      R.recorte(null); } }
  else { R.rect(x0 - 2, yT - 12, x1 + 2, yT, K); tablas(x0 - 1, yT - 11, x1 + 1, yT - 1, 5, hex('#7a4e2c'), hex('#5a3418'), hex('#9a6a3e'), 382); rp(156, yT - 4, 164, yT, BR); }
  // dentro: el cielo con el Sol y la Luna que giran, y las ruedas al fondo
  R.rect(x0 - 1, yT - 1, x1 + 1, yB + 1, K);
  if (ab > 0.05) { R.recorte([x0 + 3, yT, x1 - 3, yT + 18]);
    for (let y = yT; y <= yT + 18; y++) for (let x = x0 + 3; x <= x1 - 3; x++) R.pset(x, y, H_(x, y, 383) > 0.95 ? BL : hex('#101640'));
    const a = (t - P6) * 0.9; R.disco(160 + Math.cos(a) * 40, yT + 10 + Math.sin(a) * 4, 3, hex('#f6c830')); R.disco(160 + Math.cos(a * 2.4 + 1) * 26, yT + 8 + Math.sin(a * 2.4 + 1) * 3, 2, hex('#f2f0e0'));
    const ge = tramo(t, Hp(29.4), Hp(29.9)); for (let k = 0; k < 5; k++) rueda(118 + k * 21, yT + 18, 7 + (k % 2) * 2, 12, (k % 2 ? -1 : 1) * (t - P6) * 1.5, mez(BRS, BR, ge), BRD, mez(BR, BRL, ge));
    R.recorte(null); }
  // el frente del cofre: tablas, herrajes y la cerradura
  tablas(x0, yT + (ab > 0.05 ? 19 : 0), x1, yB, 7, hex('#7a4e2c'), hex('#5a3418'), hex('#9a6a3e'), 384);
  for (const x of [x0 + 8, x1 - 12]) { rp(x, yT, x + 4, yB, BRS); rp(x, yT, x + 4, yT + 1, BRL); for (let y = yT + 6; y < yB; y += 12) { R.disco(x + 2, y, 1.2, BRD); } }
  R.disco(160, yT + 30, 4, BRS); R.disco(160, yT + 30, 3, BR); rp(159, yT + 30, 161, yT + 34, K);
  for (let x = x0; x < x1 + 14; x++) for (let y = yB + 1; y < yB + 5; y++) R.pset(x, y, mez(R.pget(x, y), K, 0.35));
  // en «gears», destellos sobre las ruedas
  const g = tramo(t, Hp(29.5), Hp(30.3)); if (g > 0 && g < 1 && ab > 0.05) for (let k = 0; k < 3; k++) destello(124 + k * 36, yT + 10, Math.max(0, 1 - Math.abs(g - k * 0.2 - 0.2) * 3));
};

const efectos = [[0.6, 'ola'], [Lu(2.0), 'brillo'], [Lu(4.45), 'tic'],
  [Lu(6.1), 'whoosh'], [Lu(7.3), 'golpecito'], [Lu(8.1), 'pop'],
  [P3 + 0.1, 'maquina'], [Lu(10.1), 'brillo'], [Lu(11.2), 'tic'], [Lu(13.05), 'tic'], [Lu(14.05), 'tic'],
  [P4 + 0.1, 'tic'], [Lu(16.0), 'tic'], [Lu(17.75), 'maquina'], [Lu(19.2), 'boing'], [Lu(20.0), 'pop'],
  [P5 + 0.2, 'papel'], [Hp(22.6), 'golpecito'], [Hp(25.06), 'campana'],
  [Hp(26.4), 'cerrojo'], [Hp(28.0), 'brillo'], [Hp(29.5), 'maquina']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: null });
''')

