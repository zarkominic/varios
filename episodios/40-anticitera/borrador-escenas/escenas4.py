# Borrador de escenas del ep40 (Anticitera), grupo S4: ak-espirales, ak-eclipses, ak-quien.
# python3 atomo/herramientas/generar-escenas.py ak ep40 episodios/40-anticitera/borrador-escenas/escenas4.py --destino atomo/plato/escenas/_tmp_S4 --pisar
E = {}

# Utilidades de las tres escenas (ruido, tramas, mezcla, búferes de lo fijo, cielos tramados con nubes de tres tonos,
# piedra, madera, columnas, bronce con verdín, garabatos, marcas de eclipse, lucernas, atletitas). No redeclaran T, R, E,
# M, EL, tramo, lerp, hex ni en.
PRE = r'''
const H_ = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const B4_ = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4_[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const K = hex('#0e0c14'), BL = hex('#f6f2e6');
const cl = (v, a, b) => Math.max(a, Math.min(b, v));
const rp = (x0, y0, x1, y1, c) => { x0 = Math.round(x0); x1 = Math.round(x1); for (let y = Math.round(y0); y <= Math.round(y1); y++) R.linea(x0, y, x1, y, c); };
// parpadeo para hablar
const bla = (t, v = 7) => Math.sin(t * v) > 0.1;
// la esquina de Atom, tranquila: funde lo que haya hacia un color liso, con un borde suave de 14 px
const calma = (col) => { for (let y = 0; y <= 58; y++) for (let x = 264; x < 320; x++) { const d = Math.max(278 - x, y - 44, 0), w = d >= 14 ? 0 : 1 - d / 14; if (w > 0) R.pset(x, y, mez(R.pget(x, y), col, Math.min(1, w * 1.15))); } };
const CAPAS = new Map();
// lo fijo se pinta una vez en su búfer y se copia en cada fotograma
const capa = (clave, dibuja) => { let b = CAPAS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); R.recorte(null); CAPAS.set(clave, b); } R.copiar(b); };
// degradado vertical tramado entre y0 e y1 con la lista de colores
const degr = (x0, y0, x1, y1, cols) => { for (let y = y0; y <= y1; y++) { const v = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), i = Math.floor(v), f = v - i; for (let x = x0; x <= x1; x++) R.pset(x, y, cols[Math.min(cols.length - 1, f > b4(x, y) ? i + 1 : i)]); } };
// oscurece (o aclara) un rectángulo hacia col en la proporción a
const velo = (x0, y0, x1, y1, col, a) => { if (a <= 0) return; for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) R.pset(x, y, mez(R.pget(x, y), col, a)); };
// un círculo de luz cálida (la lucerna, la antorcha)
const halo = (cx, cy, r, col, a) => { for (let y = Math.max(0, Math.round(cy - r)); y <= Math.min(179, Math.round(cy + r)); y++) for (let x = Math.max(0, Math.round(cx - r)); x <= Math.min(319, Math.round(cx + r)); x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1) { const w = (1 - d) * a; if (w > b4(x, y) * 0.35) R.pset(x, y, mez(R.pget(x, y), col, w)); } } };
// tablas horizontales con juntas al tresbolillo, vetas, nudos y clavos
const tablas = (x0, y0, x1, y1, alto, c, cS, cL, k = 0) => {
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / alto), jy = (y - y0) % alto;
    for (let x = x0; x <= x1; x++) { const largo = 38 + Math.floor(H_(fila, 3, k) * 30), off = Math.floor(H_(fila, 7, k) * 40), jx = (x - x0 + off) % largo;
      let col = c; const v = H_(Math.floor((x + off) / 3), fila * 13 + jy, k + 1);
      if (jy === alto - 1 || jx === 0) col = K; else if (jy === 0) col = cL; else if (v > 0.86) col = cS; else if (v < 0.07) col = cL;
      if (jx === 3 && (jy === 2 || jy === alto - 3)) col = mez(cS, K, 0.5);
      R.pset(x, y, col); } } };
// pared de estuco con su trama (y manchas suaves)
const estuco = (x0, y0, x1, y1, c, cS, cL, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = H_(x >> 1, y >> 1, k + 50), w = H_(x >> 3, y >> 3, k + 51); R.pset(x, y, v > 0.9 ? cL : v < 0.08 || (w > 0.82 && v < 0.4) ? cS : c); } };
// sillares de piedra con juntas, desconchones y musgo
const sillares = (x0, y0, x1, y1, alto, ancho, c, cS, cL, k = 0) => { for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / alto), jy = (y - y0) % alto, off = (f % 2) * (ancho >> 1);
  for (let x = x0; x <= x1; x++) { const jx = (x - x0 + off) % ancho, bl = Math.floor((x - x0 + off) / ancho), v = H_(x >> 1, y >> 1, k + 7), w = H_(bl, f, k + 8);
    let col = w > 0.7 ? mez(c, cL, 0.25) : w < 0.2 ? mez(c, cS, 0.25) : c;
    if (jy === 0 || jx === 0) col = cS; else if (jy === 1 || jx === 1) col = cL; else if (v > 0.93) col = cS; else if (v < 0.05) col = cL;
    R.pset(x, y, col); } } };
// losas del suelo en perspectiva suave (las juntas se abren hacia abajo)
const losas = (x0, y0, x1, y1, c, cS, cL, k = 0) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0), alto = 5 + Math.round(u * 7), f = Math.floor(Math.sqrt((y - y0) * 4)), ancho = 18 + Math.round(u * 20), off = (f % 2) * (ancho >> 1);
  const jy = Math.floor(Math.sqrt((y - y0) * 4)) !== Math.floor(Math.sqrt((y - y0 + 1) * 4));
  for (let x = x0; x <= x1; x++) { const jx = ((x - 160) * (1 - u * 0.15) + 1000 + off) % ancho < 1, v = H_(x >> 1, y, k + 9), w = H_(Math.floor((x + off) / ancho), f, k + 10);
    let col = w > 0.66 ? mez(c, cL, 0.3) : w < 0.25 ? mez(c, cS, 0.3) : c; if (jy || jx) col = cS; else if (v > 0.94) col = cL; else if (v < 0.04) col = cS; R.pset(x, y, col); } } };
// nube de tres tonos (sombra, cuerpo y luz) hecha de bolas
const nube3 = (cx, cy, w, c0, c1, c2) => { const n = Math.max(3, Math.round(w / 6)), k0 = Math.round(w * 7 + 3);
  const rr = (i) => (w / n) * (0.55 + 0.9 * Math.sin(Math.PI * (i + 0.5) / n) * (0.7 + 0.5 * H_(i, k0, 31))) + 1.2, xx = (i) => cx - w / 2 + (i + 0.5) * w / n, yy = (i) => cy - rr(i) * 0.55 + (H_(i, k0, 32) - 0.5) * 2;
  for (let i = 0; i < n; i++) R.disco(xx(i), yy(i) + 1.5, rr(i), c0);
  for (let i = 0; i < n; i++) R.disco(xx(i) - 0.5, yy(i) - 0.5, rr(i) - 0.8, c1);
  for (let i = 0; i < n; i++) { const r = rr(i); R.disco(xx(i) - r * 0.25, yy(i) - r * 0.35, r * 0.62, c2); R.disco(xx(i) + r * 0.05, yy(i) - r * 0.05, r * 0.6, c1); }
  rp(cx - w / 2 + 3, cy, cx + w / 2 - 3, cy + 1, c0); };
// nubes a tres velocidades (lejos lentas y pequeñas): lista [x0, y, w, v]; envuelven por la pantalla
const nubes = (t, lista, c0, c1, c2) => { for (const [x0, y, w, v] of lista) nube3(((x0 + t * v) % (340 + w)) - w / 2 - 10, y, w, c0, c1, c2); };
// estrellas que titilan dentro de un rectángulo
const estrellas = (t, x0, y0, x1, y1, n, k = 0, a = 1) => { for (let i = 0; i < n; i++) { const x = Math.round(x0 + H_(i, 1, k) * (x1 - x0)), y = Math.round(y0 + H_(i, 2, k) * (y1 - y0)); if (x > 270 && y < 50) continue;
  const tw = Math.sin(t * (2 + H_(i, 3, k) * 3) + i * 1.7); if (a < H_(i, 4, k)) continue; R.pset(x, y, tw > 0.55 ? BL : tw > -0.2 ? hex('#b8c0e0') : hex('#5a6890')); if (H_(i, 5, k) > 0.9 && tw > 0.6) { R.pset(x - 1, y, hex('#8a98c8')); R.pset(x + 1, y, hex('#8a98c8')); R.pset(x, y - 1, hex('#8a98c8')); R.pset(x, y + 1, hex('#8a98c8')); } } };
// pájaro lejano en uve que aletea
const ave = (x, y, t, c = K, k = 0) => { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 10 + k) > 0 ? -1 : 1; R.pset(x, y, c); R.pset(x - 1, y + a, c); R.pset(x - 2, y + a * 2 - (a > 0 ? 1 : 0), c); R.pset(x + 1, y + a, c); R.pset(x + 2, y + a * 2 - (a > 0 ? 1 : 0), c); };
// rueda dentada de dientes triangulares: centro, radio (base de los dientes), n dientes, ángulo, colores
const rueda = (cx, cy, r, n, ang, c, cS, cL, o = {}) => {
  const td = o.diente ?? Math.max(1.6, r * 0.14), P = [], Q = [];
  for (let k = 0; k < n; k++) { const a = ang + k * 2 * Math.PI / n, da = Math.PI / n;
    for (const [aa, rr] of [[a - da, r], [a - da * 0.4, r + td], [a + da * 0.4 - da * 0.2, r + td], [a + da * 0.6, r]]) { P.push([cx + Math.cos(aa) * (rr + 1), cy + Math.sin(aa) * (rr + 1)]); Q.push([cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr]); } }
  R.poligono(P, o.borde ?? K); R.poligono(Q, (x, y) => { const d = (x - cx) * 0.7 + (y - cy) * 0.7; return d < -r * 0.35 ? cL : d > r * 0.4 ? cS : c; });
  if (r > 7) { R.anillo(cx + 0.5, cy + 0.5, r * 0.72, cS); if (o.radios !== false) for (let k = 0; k < 4; k++) { const a = ang + k * Math.PI / 2 + 0.4; R.linea(cx + Math.cos(a) * r * 0.2, cy + Math.sin(a) * r * 0.2, cx + Math.cos(a) * r * 0.68, cy + Math.sin(a) * r * 0.68, cS); }
    for (let k = 0; k < 4 && o.huecos; k++) { const a = ang + k * Math.PI / 2 + Math.PI / 4 + 0.4; R.disco(cx + Math.cos(a) * r * 0.45, cy + Math.sin(a) * r * 0.45, r * 0.16, o.huecos); } }
  R.disco(cx, cy, Math.max(1.2, r * 0.16), K); R.disco(cx, cy, Math.max(0.6, r * 0.1), cL); };
// bronce corroído con verdín (para placas y fragmentos), dentro de una función de máscara opcional
const BP = { b: hex('#b8863a'), s: hex('#7a5422'), l: hex('#e8b860'), ll: hex('#fff0b0'), m: hex('#9a6a2a'), g: hex('#5a3a14') };
const BR = { v: hex('#4e7a5e'), vS: hex('#2e5040'), vL: hex('#7ab092'), vLL: hex('#a8d4b8'), b: hex('#8a6a3a'), bS: hex('#5a4220'), bL: hex('#c8a060'), o: hex('#e8c068') };
// ruido suave (valor interpolado) para manchas orgánicas
const vn = (x, y, sc, k = 0) => { const gx = x / sc, gy = y / sc, i = Math.floor(gx), j = Math.floor(gy), fx = gx - i, fy = gy - j, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = H_(i, j, k), b = H_(i + 1, j, k), c = H_(i, j + 1, k), d = H_(i + 1, j + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };
const bronce = (x0, y0, x1, y1, dentro = null, k = 0, pulido = false) => { if (pulido) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (dentro && !dentro(x, y)) continue;
    const v = H_(x, y, k + 20), z = vn(x, y, 20, k + 22) * 0.6 + vn(x, y, 6, k + 24) * 0.4 + (b4(x, y) - 0.5) * 0.05;
    R.pset(x, y, z > 0.68 ? (v > 0.7 ? BP.ll : BP.l) : z > 0.45 ? (v > 0.85 ? BP.l : BP.b) : z > 0.3 ? BP.m : (v > 0.5 ? BP.s : hex('#6a4a2a'))); } return; } for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (dentro && !dentro(x, y)) continue;
  const v = H_(x, y, k + 20), z = vn(x, y, 22, k + 22) * 0.65 + vn(x, y, 7, k + 24) * 0.35 + (b4(x, y) - 0.5) * 0.05, w = vn(x, y, 5, k + 21);
  let c = z > 0.6 ? (z > 0.7 ? (v > 0.8 ? BR.bL : BR.b) : (v > 0.7 ? BR.b : hex('#6e6a40'))) : (w > 0.62 ? (v > 0.75 ? BR.vL : hex('#5a8a6c')) : w < 0.3 ? (v < 0.4 ? BR.vS : hex('#3e6a52')) : BR.v);
  if (v > 0.992) c = BR.vLL; R.pset(x, y, c); } };
// filas de garabatos diminutos que no se leen (las inscripciones)
const garab = (x0, y0, x1, y1, c, k = 0, paso = 4) => { for (let y = y0; y + 2 <= y1; y += paso) { let x = x0 + Math.floor(H_(y, 1, k) * 3);
  while (x < x1 - 2) { const w = 1 + Math.floor(H_(x, y, k + 1) * 3), f = Math.floor(H_(x, y, k + 2) * 4);
    if (f === 0) { R.pset(x, y, c); R.pset(x, y + 1, c); R.pset(x + 1, y + 2, c); } else if (f === 1) { R.pset(x, y + 2, c); R.pset(x + 1, y + 1, c); R.pset(x + 2, y, c); } else if (f === 2) { R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x, y + 2, c); R.pset(x + 1, y + 1, c); } else { R.pset(x, y + 1, c); R.pset(x + 1, y + 1, c); R.pset(x + 1, y, c); }
    x += w + 2; if (H_(x, y, k + 3) > 0.86) x += 3; } } };
// marca de eclipse: Sol (disco de oro con rayos) o Luna (disco de plata mordido); on 0–1 la enciende
const marcaEcl = (x, y, tipo, on, r = 3, fondo = BR.vS) => { x = Math.round(x); y = Math.round(y);
  const oro = mez(hex('#7a5a2a'), hex('#ffd860'), on), plata = mez(hex('#5a6a6a'), hex('#f0f4f8'), on);
  R.disco(x, y, r + 1, K);
  if (tipo === 'sol') { R.disco(x, y, r, oro); if (on > 0.3) for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; R.pset(Math.round(x + Math.cos(a) * (r + 2)), Math.round(y + Math.sin(a) * (r + 2)), oro); } R.pset(x - 1, y - 1, mez(oro, BL, 0.6)); }
  else { R.disco(x, y, r, plata); R.disco(x + r * 0.55, y - r * 0.35, r * 0.75, fondo); R.pset(x - 1, y - 1, mez(plata, BL, 0.5)); }
  if (on > 0.9) { R.pset(x, y - r - 3, BL); R.pset(x, y + r + 3, BL); R.pset(x - r - 3, y, BL); R.pset(x + r + 3, y, BL); } };
// columna dórica con estrías, capitel y basa (x centro, y0 arriba, y1 abajo)
const columna = (x, y0, y1, w, c, cS, cL) => { const h = w >> 1;
  for (let y = y0 + 4; y <= y1 - 2; y++) for (let i = -h; i <= h; i++) { const e = (i + h) % 3; R.pset(x + i, y, i === -h || i === h ? cS : i < -h + 2 ? cL : e === 0 ? cS : i > h - 3 ? mez(c, cS, 0.5) : c); }
  rp(x - h - 2, y0, x + h + 2, y0 + 1, cS); rp(x - h - 3, y0 - 2, x + h + 3, y0 - 1, c); R.linea(x - h - 3, y0 - 2, x + h + 3, y0 - 2, cL); rp(x - h - 1, y0 + 2, x + h + 1, y0 + 3, cS);
  rp(x - h - 2, y1 - 1, x + h + 2, y1, cS); R.linea(x - h - 2, y1 - 1, x + h + 2, y1 - 1, c); };
// tejado de tejas de barro (filas de medias cañas)
const tejas = (x0, y0, x1, y1, c, cS, cL) => { for (let y = y0; y <= y1; y++) { const f = (y - y0) % 4; for (let x = x0; x <= x1; x++) { const j = (x + ((y - y0) >> 2) * 3) % 6; R.pset(x, y, f === 3 ? cS : j === 0 ? cS : j < 3 && f === 0 ? cL : c); } } };
// olivo de copa plateada que se mece
const olivo = (x, suelo, t, s = 1, k = 0) => { const h = Math.round(18 * s), m = Math.sin(t * 1.3 + x * 0.1) * s;
  R.linea(x, suelo, x + 2, suelo - h * 0.5, hex('#4a3a2a')); R.linea(x + 1, suelo, x + 3, suelo - h * 0.5, hex('#6a5038')); R.linea(x + 2, suelo - h * 0.5, x - 3, suelo - h * 0.8, hex('#4a3a2a'));
  for (let i = 0; i < 9; i++) { const a = i * 0.7 + k, r = (4 + H_(i, k, 5) * 3) * s; const cx = x + Math.cos(a) * 8 * s + m * (i % 2), cy = suelo - h + Math.sin(a) * 4 * s; R.disco(cx, cy + 1, r, hex('#3e5a3a')); }
  for (let i = 0; i < 9; i++) { const a = i * 0.7 + k, r = (3 + H_(i, k, 5) * 3) * s; const cx = x + Math.cos(a) * 8 * s + m * (i % 2), cy = suelo - h + Math.sin(a) * 4 * s; R.disco(cx - 0.5, cy - 0.5, r * 0.8, hex('#6a8a5e')); R.pset(Math.round(cx - 1), Math.round(cy - r * 0.5), hex('#a8c098')); } };
// ciprés oscuro que se mece
const cipres = (x, suelo, h, t, k = 0) => { const m = Math.sin(t * 1.1 + k) * 1.2; for (let y = 0; y < h; y++) { const u = y / h, w = Math.max(1, Math.round(Math.sin(u * Math.PI * 0.95 + 0.15) * 4.5)), dx = m * u; for (let i = -w; i <= w; i++) R.pset(Math.round(x + i + dx), suelo - y, i === -w || i === w ? hex('#1a2e22') : i < 0 && H_(i, y, k) > 0.6 ? hex('#4a6a44') : hex('#2e4a34')); } };
// lucerna de barro con su llama que baila (x, y = la base)
const lucerna = (x, y, t, k = 0) => { x = Math.round(x); y = Math.round(y); rp(x - 6, y - 3, x + 5, y, K); rp(x - 5, y - 3, x + 4, y - 1, hex('#b0623a')); R.linea(x - 5, y - 3, x + 3, y - 3, hex('#d8885a')); rp(x + 4, y - 4, x + 7, y - 2, hex('#8a4a2a')); R.pset(x - 1, y - 2, K);
  const f = Math.sin(t * 13 + k) > 0 ? 1 : 0, g = Math.sin(t * 7 + k * 2) > 0.3 ? 1 : 0; R.pset(x + 7, y - 5, hex('#ff9a2a')); R.pset(x + 7 + f, y - 6, hex('#ffd860')); R.pset(x + 7, y - 7 - g, hex('#fff2b0')); R.pset(x + 8, y - 5, hex('#ffd860')); return [x + 7, y - 6]; };
// atletita de 8 px que corre (para las esferas), d dirección
const atletita = (x, y, t, d = 1, col = hex('#d8483a'), k = 0, sc = 1) => { x = Math.round(x); y = Math.round(y); const p = Math.floor(t * 10 + k) % 2, piel = hex('#e8a878'), s = sc;
  const L = (x0, y0, x1, y1, c) => { R.linea(x + x0 * s, y + y0 * s, x + x1 * s, y + y1 * s, c); if (s > 1) R.linea(x + x0 * s + 1, y + y0 * s, x + x1 * s + 1, y + y1 * s, c); };
  if (p) { L(0, -1, 2 * d, 1, K); L(0, -1, -2 * d, 0, K); } else { L(0, -1, d, 1, K); L(0, -1, -d, 1, K); }
  rp(x - s, y - 4 * s, x + s, y - 1 * s, K); rp(x - s + 1, y - 4 * s + 1, x + s - 1, y - s - 1, col);
  if (p) { L(0, -4, 2 * d, -3, piel); L(0, -4, -2 * d, -5, piel); } else { L(0, -4, -2 * d, -3, piel); L(0, -4, 2 * d, -5, piel); }
  R.disco(x, y - 6 * s, 2 * s, K); R.disco(x, y - 6 * s, 2 * s - 0.8, piel); R.pset(x + d * s, y - 6 * s, K); R.pset(x - d, y - 7 * s, hex('#3a2a1a')); R.pset(x, y - 7 * s - 1, hex('#3a2a1a')); };
// bocadillo grande con un símbolo
const globo = (x, y, ic = '?') => { R.disco(x, y, 9, K); R.disco(x, y, 8, BL); R.poligono([[x - 4, y + 6], [x - 8, y + 13], [x + 1, y + 7]], K); R.poligono([[x - 3, y + 6], [x - 6, y + 11], [x, y + 7]], BL); R.icono(ic, x - 5, y - 6, K, hex('#b0b0b8'), 2); };
// la Luna con su fase (0 nueva, 0.5 llena, 1 nueva), r radio; luz y sombra
const lunaF = (x, y, r, fase, cS = hex('#1a2040')) => { R.disco(x, y, r + 1, mez(cS, K, 0.4)); R.disco(x, y, r, hex('#e8ecf0')); R.disco(x - r * 0.3, y + r * 0.2, r * 0.25, hex('#c0c8d0')); R.disco(x + r * 0.3, y - r * 0.3, r * 0.2, hex('#c8d0d8'));
  const f = fase % 1, lado = f < 0.5 ? -1 : 1, cubre = Math.abs(f - 0.5) * 2; if (cubre > 0.04) R.disco(x + lado * r * 2 * (1 - cubre) * 0.5 + lado * r * (1 - cubre) * 0.0, y, r * (0.4 + cubre * 0.6) + 0.5, cS); };
// el Sol con su halo
const solD = (x, y, r, t) => { R.disco(x, y, r + 3, hex('#fff0b0')); R.disco(x, y, r + 1, hex('#ffe070')); R.disco(x, y, r, hex('#ffd040')); R.disco(x - r * 0.3, y - r * 0.3, r * 0.4, hex('#fff4c0')); };
'''

# ───────────────────────────────────────────── AK-ECLIPSES ─────────────────────────────────────────────
E['ak-eclipses'] = ('Eclipses y Juegos', '''// AK-ECLIPSES (frases 22–23), Grecia antigua, sin año ni cartela. Seis planos:
// 1. (0 → «an eclipse») fondo local: la espiral de abajo de muy cerca, en bronce con verdín y surcos de casillas con
//    garabatos; una mano canónica pasa una lucerna por encima y las marcas de eclipse se encienden una a una al paso de
//    la luz («small marks flagged the months»).
// 2. («an eclipse» → «It was») fondo local: el ágora al pie de la acrópolis; en «sun» la Luna se come el Sol encima del
//    templo, el cielo se oscurece, salen estrellas y los pájaros vuelven a los árboles; la gente señala y se asombra; en
//    «the hour» la clepsidra del ágora marca su rayita y brilla.
// 3. («It was» → «And there was») fondo local: un pórtico con el calendario de eclipses pintado (18 casillas de años); el
//    maestro mueve el puntero casilla a casilla mientras el contador sube a 18 («next 18 years»); en «started over» la
//    marca vuelve de un salto a la primera y los dos alumnos se sorprenden.
// 4. («And there was» → «A four-year») fondo local: la esferita de los Juegos enorme en la placa de bronce; una mano con
//    el estilete la señala en «small dial»; «?» en «unexpected»; en «the Games» salen cuatro atletitas que corren por el
//    borde, y el último se para a resoplar y corre detrás (gag 7).
// 5. («A four-year» → «It was a calendar») antigua olimpia general (2.ª vez; la otra en ak-gancho), o.carrera: el juez
//    baja el cordel en «Olympic Games» y salen los corredores; un atleta del primer término aplaude; el «4» en el cielo.
// 6. («It was a calendar» → fin) fondo local: una calle de noche con la Luna llena sobre el mar; un atleta corre con la
//    antorcha (la carrera de antorchas) y la gente aplaude; en la azotea, un astrónomo señala la Luna («of the sky and of
//    sports at the same time»).''', PRE + r'''
const A = (s) => en('marcas', (s - 0.5) / 11.688), B = (s) => en('juegos', (s - 12.688) / 11.998);
const P2 = A(3.90), P3 = A(7.46), P4 = B(12.69), P5 = B(16.53), P6 = B(21.67);
const TUNI = '#c8b896';

// 1 · la espiral de abajo de cerca: la lucerna pasa y las marcas se encienden
const CX1 = -60, CY1 = 330, PITCH = 30, R0 = 150, CPT = 46;
const polar1 = (x, y) => { const dx = x - CX1, dy = y - CY1, r = Math.hypot(dx, dy); let th = Math.atan2(dy, dx); if (th < 0) th += 2 * Math.PI; const tn = th / (2 * Math.PI), s = (r - R0 - PITCH * tn) / PITCH; return { r, th, tn, s }; };
const celda1 = (k, j) => { const tn = (j + 0.5) / CPT, th = tn * 2 * Math.PI, r = R0 + PITCH * (k + tn) + PITCH / 2; return [CX1 + Math.cos(th) * r, CY1 + Math.sin(th) * r]; };
const MARCAS1 = []; for (const [k, j, tp] of [[2, 39, 'sol'], [3, 41, 'luna'], [2, 42, 'luna'], [4, 37, 'sol'], [3, 36, 'sol'], [5, 40, 'luna'], [4, 43, 'sol'], [5, 35, 'luna'], [6, 38, 'sol']]) { const [x, y] = celda1(k, j); if (x > 6 && x < 314 && y > 24 && y < 172) MARCAS1.push([x, y, tp]); }
MARCAS1.sort((a, b) => a[0] - b[0]);
const placa1 = () => capa('placa1', () => {
  bronce(0, 0, 319, 179, null, 3, true);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const { th, s } = polar1(x, y), fs = s - Math.floor(s), fc = (th / (2 * Math.PI) * CPT) % 1;
    if (s < 0) continue;
    if (fs < 0.07) R.pset(x, y, K); else if (fs < 0.12) R.pset(x, y, BP.g); else if (fs > 0.95) R.pset(x, y, BP.ll);
    else if (fc < 0.035 && fs > 0.15 && fs < 0.88) R.pset(x, y, BP.s); }
  // los garabatos en cada casilla (dos filas cortas por casilla)
  for (let k = 0; k < 9; k++) for (let j = 0; j < CPT; j++) { const [x, y] = celda1(k, j); if (x < -8 || x > 328 || y < -8 || y > 188) continue; if (H_(k, j, 9) < 0.35) continue;
    const c = H_(k, j, 10) > 0.5 ? hex('#4a2e10') : hex('#5e3e1a'); garab(Math.round(x) - 6, Math.round(y) - 4, Math.round(x) + 6, Math.round(y) + 4, c, k * 50 + j, 4); }
  // las marcas apagadas, grabadas
  for (const [x, y, tp] of MARCAS1) marcaEcl(x, y, tp, 0, 6, BP.s);
  // remaches y el borde roto arriba a la izquierda
  for (const [x, y] of [[14, 160], [300, 168], [60, 18], [240, 70]]) { R.disco(x, y, 3, BP.s); R.disco(x - 0.5, y - 0.5, 2, BP.l); R.pset(x - 1, y - 1, BP.ll); }
  R.poligono([[0, 0], [52, 0], [40, 10], [24, 8], [14, 22], [0, 26]], hex('#2a1e14')); R.linea(52, 0, 40, 10, BP.ll); R.linea(40, 10, 24, 8, BP.ll); R.linea(24, 8, 14, 22, BP.ll); R.linea(14, 22, 0, 26, BP.ll);
  calma(BP.b);
});
const p1 = (t) => {
  placa1();
  // la lucerna en la mano recorre las marcas de izquierda a derecha
  const u = tramo(t, 0.3, P2 - 0.15), lx = lerp(-30, 300, u), ly = 150 - Math.sin(u * Math.PI) * 22 + Math.sin(t * 3) * 2;
  halo(lx + 7, ly - 8, 46, hex('#ffd890'), 0.42);
  for (const [x, y, tp] of MARCAS1) { const on = cl((lx + 30 - x) / 30, 0, 1); if (on > 0) marcaEcl(x, y, tp, on, 6, BP.s); }
  // motas en la luz
  for (let k = 0; k < 8; k++) { const a = t * 0.7 + k * 0.8; R.pset(Math.round(lx + 7 + Math.cos(a) * (10 + k * 3)), Math.round(ly - 18 + Math.sin(a * 1.3) * 8 - k), hex('#ffe8b0')); }
  lucerna(lx, ly, t);
  T.brazo(R, lx - 4, 198, lx - 4, ly + 2, '#8a5a3a', 1, { codo: [lx - 16, ly + 24] });
};

// 2 · el eclipse sobre el templo, desde el ágora
const SOL2 = [214, 30];
const agora = () => capa('agora', () => {
  degr(0, 0, 319, 96, [hex('#6aa8e0'), hex('#8ac0ec'), hex('#aad4f2'), hex('#d0e6f4')]);
  // montes lejanos
  for (let x = 0; x < 320; x++) { const h = 84 + Math.sin(x * 0.03) * 6 + Math.sin(x * 0.09 + 1) * 3; for (let y = Math.round(h); y < 100; y++) R.pset(x, y, H_(x >> 1, y, 3) > 0.8 ? hex('#8aa0b8') : hex('#9ab0c4')); }
  // la acrópolis: la roca con estratos
  R.poligono([[100, 100], [130, 70], [168, 62], [290, 60], [320, 72], [320, 128], [100, 128]], hex('#b09070'));
  for (let y = 60; y < 128; y++) for (let x = 100; x < 320; x++) { const c = R.pget(x, y); if (c !== hex('#b09070')) continue; const v = H_(x >> 1, y, 4), e = (y + Math.round(Math.sin(x * 0.05) * 3)) % 7; R.pset(x, y, e === 0 ? hex('#8a6a50') : v > 0.88 ? hex('#d0b090') : v < 0.1 ? hex('#7a5a40') : x > 240 && v > 0.6 ? hex('#a08060') : hex('#b09070')); }
  // el templo: escalones, columnas, frontón
  rp(166, 58, 286, 61, hex('#c8bca8')); R.linea(166, 58, 286, 58, hex('#ece4d4')); rp(170, 55, 282, 57, hex('#dcd2c0'));
  for (let i = 0; i < 9; i++) columna(176 + i * 13, 36, 55, 6, hex('#e4dccc'), hex('#a89c88'), hex('#f8f4ea'));
  rp(170, 30, 282, 35, hex('#d8ceba')); R.linea(170, 30, 282, 30, hex('#f4ecdc')); for (let x = 172; x < 282; x += 4) R.pset(x, 33, hex('#a89c88'));
  R.poligono([[168, 30], [226, 16], [284, 30]], K); R.poligono([[172, 29], [226, 18], [280, 29]], hex('#e0d6c4')); R.linea(172, 29, 226, 18, hex('#f8f4ea'));
  for (let i = 0; i < 5; i++) R.pset(200 + i * 12, 26 - Math.round(i < 3 ? i * 1.5 : (4 - i) * 1.5), hex('#b8ac98'));
  // la fila de casas de atrás, más pálidas
  for (let i = 0; i < 14; i++) { const x0 = 6 + i * 24, y0 = 100 + Math.round(H_(i, 4, 2) * 6); estuco(x0, y0, x0 + 22, 124, hex('#ddd4c0'), hex('#c0b49c'), hex('#efe8d8'), i + 30); tejas(x0 - 1, y0 - 4, x0 + 23, y0 - 1, hex('#a8684a'), hex('#7a4a32'), hex('#c8886a')); rp(x0 + 8, y0 + 5, x0 + 10, y0 + 8, hex('#6a5a4a')); }
  // casas de la ciudad, de cal, con tejados de teja
  for (let i = 0; i < 13; i++) { const x0 = -6 + i * 26 + Math.round(H_(i, 1, 2) * 6), w = 20 + Math.round(H_(i, 2, 2) * 8), y0 = 96 + Math.round(H_(i, 3, 2) * 12);
    if (x0 > 320) continue; estuco(x0, y0, x0 + w, 124, hex('#ece4d2'), hex('#c8bca4'), hex('#fffaf0'), i); tejas(x0 - 2, y0 - 5, x0 + w + 2, y0 - 1, hex('#b8603a'), hex('#7a3a22'), hex('#d8805a'));
    rp(x0 + 4, y0 + 6, x0 + 7, y0 + 12, hex('#4a3a2a')); R.pset(x0 + 5, y0 + 7, hex('#6a5a4a')); if (w > 24) rp(x0 + w - 8, y0 + 8, x0 + w - 5, y0 + 11, hex('#5a7a9a')); }
  // el pórtico del ágora a la izquierda
  rp(0, 98, 64, 102, hex('#d8ceba')); R.linea(0, 98, 64, 98, hex('#f4ecdc')); tejas(0, 92, 66, 97, hex('#b8603a'), hex('#7a3a22'), hex('#d8805a'));
  for (let i = 0; i < 5; i++) columna(6 + i * 14, 103, 140, 6, hex('#e4dccc'), hex('#a89c88'), hex('#f8f4ea'));
  estuco(0, 103, 64, 138, hex('#c8a880'), hex('#a88a62'), hex('#dcc098'), 6); for (let i = 0; i < 5; i++) columna(6 + i * 14, 103, 140, 6, hex('#e4dccc'), hex('#a89c88'), hex('#f8f4ea'));
  // el suelo de losas del ágora
  losas(0, 124, 319, 179, hex('#d0c4ac'), hex('#a8987c'), hex('#ece2cc'), 2);
  // un altar con guirnalda y ánforas
  rp(250, 130, 290, 150, hex('#e0d6c4')); R.linea(250, 130, 290, 130, hex('#f8f4ea')); rp(250, 148, 290, 150, hex('#a89c88')); for (let x = 254; x < 288; x += 4) R.pset(x, 138 + ((x >> 2) % 2), hex('#5a8a4a'));
  for (const [x, y] of [[296, 150], [306, 152]]) { R.disco(x, y - 6, 4, K); R.disco(x, y - 6, 3, hex('#b8603a')); rp(x - 1, y - 12, x + 1, y - 9, hex('#b8603a')); R.pset(x - 1, y - 7, hex('#d8805a')); }
  calma(hex('#7ab4e6'));
});
const clepsidra = (t, marca) => { // el reloj de agua: una jarra que gotea en otra con una varilla que sube
  rp(30, 120, 34, 160, hex('#8a7a62')); rp(52, 120, 56, 160, hex('#8a7a62')); rp(28, 118, 58, 121, hex('#b0a088')); rp(26, 158, 60, 161, hex('#a09078'));
  R.disco(43, 112, 8, K); R.disco(43, 112, 7, hex('#b8603a')); R.disco(41, 110, 3, hex('#d8805a')); rp(41, 103, 45, 105, hex('#7a3a22'));
  const ph = (t * 3) % 1; R.pset(43, 122 + Math.round(ph * 10), hex('#6ab0e0')); R.pset(43, 121, hex('#6ab0e0'));
  rp(36, 136, 50, 156, K); rp(37, 137, 49, 155, hex('#c0703a')); R.linea(37, 137, 49, 137, hex('#e0905a')); const nivel = 150 - Math.round(tramo(t, 3.9, 7.4) * 8);
  rp(38, nivel, 48, 154, hex('#3a7ab0')); R.linea(38, nivel, 48, nivel, hex('#8ac8f0'));
  R.linea(43, nivel - 14, 43, nivel, hex('#d8c070')); for (let y = 124; y < 136; y += 2) R.pset(47, y, K);
  if (marca > 0) { const r = Math.round(2 + marca * 3); R.linea(43 - r, nivel - 15, 43 + r, nivel - 15, BL); R.linea(43, nivel - 15 - r, 43, nivel - 15 + r, BL); }
};
const p2 = (t) => {
  agora();
  const e = tramo(t, A(4.6), A(6.3)), osc = tramo(t, A(5.6), A(6.5)) * 0.62;
  // nubes y pájaros (vuelven a los árboles cuando oscurece)
  nubes(t, [[20, 44, 30, 2.5], [140, 52, 22, 4], [230, 70, 18, 6]], hex('#a8bcd0'), hex('#e8eef4'), hex('#ffffff'));
  for (let k = 0; k < 5; k++) { const v = tramo(t, A(5.2) + k * 0.1, A(6.6)), x = lerp(60 + k * 30, 20 + k * 8, v), y = lerp(50 + (k % 2) * 8, 108, v); ave(x, y, t, K, k); }
  // el Sol y la Luna que se lo come
  solD(SOL2[0], SOL2[1], 9, t);
  if (e > 0) { const mx = Math.round(lerp(SOL2[0] - 22, SOL2[0], e)); R.disco(mx, SOL2[1] + Math.round((1 - e) * 4), 9, hex('#2a2a3a')); }
  // la gente del ágora
  const ve = t > A(4.7);
  R.actor(EL.romana, 92, 168, t, { dir: 1, dedo: ve && t < A(6.4), sorpresa: t > A(5.0), habla: t > A(6.4) && bla(t) });
  R.actor(EL.romanoPileo, 126, 170, t, { dir: 1, sorpresa: t > A(5.3), dedo: t > A(6.2) });
  const w = tramo(t, P2 + 0.1, A(5.4)); R.actor(EL.atletaAK, Math.round(lerp(330, 196, w)), 172, t, { dir: -1, anda: w > 0 && w < 1, sorpresa: w >= 1 });
  T.gato(R, 236, 176, t, { dir: -1 });
  // se oscurece todo: el día del eclipse
  if (osc > 0) { velo(0, 0, 319, 179, hex('#141a34'), osc); estrellas(t, 0, 0, 319, 70, 30, 5, osc * 1.4); }
  if (e > 0.92) { R.anillo(SOL2[0] + 0.5, SOL2[1] + 0.5, 10.5, hex('#fff4c0')); R.anillo(SOL2[0] + 0.5, SOL2[1] + 0.5, 12, hex('#f0d890')); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + 0.2; R.linea(SOL2[0] + Math.cos(a) * 12, SOL2[1] + Math.sin(a) * 12, SOL2[0] + Math.cos(a) * 16, SOL2[1] + Math.sin(a) * 16, hex('#f8e8b0')); } R.disco(SOL2[0], SOL2[1], 9, hex('#0a0a14')); }
  // la clepsidra (por delante y con su luz) marca la hora en «the hour»
  clepsidra(t, tramo(t, A(6.66), A(6.9)) - tramo(t, A(7.2), A(7.5)));
};

// 3 · el calendario de eclipses de 18 años en el pórtico
const CAS3 = []; for (let i = 0; i < 18; i++) CAS3.push([42 + (i % 9) * 26, 46 + Math.floor(i / 9) * 30]);
const portico = () => capa('portico', () => {
  // la pared del fondo pintada de ocre, con zócalo rojo
  estuco(0, 0, 319, 140, hex('#d8b47a'), hex('#b8925a'), hex('#ecd09a'), 11);
  rp(0, 112, 319, 140, hex('#9a3a2a')); R.linea(0, 112, 319, 112, hex('#c85a3a')); for (let x = 0; x < 320; x += 4) R.pset(x, 114 + ((x >> 2) % 2), hex('#7a2a1e'));
  // el gran fresco: el calendario de 18 casillas, cada una con sus marcas de eclipse
  rp(26, 28, 270, 104, K); rp(28, 30, 268, 102, hex('#f0e4c8'));
  for (let y = 30; y <= 102; y++) for (let x = 28; x <= 268; x++) if (H_(x >> 1, y >> 1, 12) > 0.92) R.pset(x, y, hex('#e0d0b0'));
  for (let i = 0; i < 18; i++) { const [x, y] = CAS3[i]; rp(x - 11, y - 12, x + 11, y + 12, hex('#3a5a7a')); rp(x - 10, y - 11, x + 10, y + 11, hex('#f8f0dc'));
    for (let k = 0; k < 6; k++) { const xx = x - 7 + (k % 3) * 7, yy = y - 6 + Math.floor(k / 3) * 9; if (H_(i, k, 13) > 0.62) marcaEcl(xx, yy, H_(i, k, 14) > 0.5 ? 'sol' : 'luna', 0.85, 2, hex('#f8f0dc')); else { R.pset(xx, yy, hex('#a89070')); R.pset(xx + 1, yy, hex('#a89070')); } } }
  // la cenefa de olas
  for (let x = 28; x < 268; x++) { const p = (x % 8); R.pset(x, 31 + (p < 4 ? 0 : 1), hex('#3a5a7a')); R.pset(x, 101 - (p < 4 ? 0 : 1), hex('#3a5a7a')); }
  // el techo de vigas
  rp(0, 0, 319, 10, hex('#6a4a2e')); for (let x = 6; x < 320; x += 22) { rp(x, 0, x + 8, 14, hex('#4a3020')); R.linea(x, 14, x + 8, 14, K); R.linea(x, 0, x, 13, hex('#8a6a4a')); }
  // el suelo de losas
  losas(0, 141, 319, 179, hex('#d8ccb4'), hex('#a8987c'), hex('#f0e6d0'), 4);
  // las columnas del pórtico, por delante del fresco a los lados
  columna(10, 14, 150, 12, hex('#e8e0d0'), hex('#a89c88'), hex('#fbf8f0')); columna(298, 14, 150, 12, hex('#e8e0d0'), hex('#a89c88'), hex('#fbf8f0'));
  // un banco de piedra con un cesto y rollos
  rp(214, 148, 268, 156, hex('#c8bca8')); R.linea(214, 148, 268, 148, hex('#ece4d4')); rp(218, 157, 222, 166, hex('#a89c88')); rp(260, 157, 264, 166, hex('#a89c88'));
  R.disco(254, 144, 5, K); R.disco(254, 144, 4, hex('#c8a060')); for (let x = 250; x < 259; x += 2) R.pset(x, 143, hex('#8a6a3a'));
  for (let i = 0; i < 3; i++) { rp(226 + i * 6, 143, 230 + i * 6, 147, K); rp(227 + i * 6, 144, 229 + i * 6, 146, hex('#f0e4c8')); }
  calma(hex('#d8b47a'));
});
const p3 = (t) => {
  portico();
  const ini = P3 + 0.4, fin = A(10.6), sube = tramo(t, ini, fin), reset = t > A(11.3);
  const i = reset ? Math.min(2, Math.floor(tramo(t, A(11.3), A(12.4)) * 3)) : Math.min(17, Math.floor(sube * 18));
  const [cx, cy] = CAS3[cl(i, 0, 17)], salto = reset ? Math.max(0, 1 - (t - A(11.3)) * 4) : 0;
  // la casilla encendida y el disco de bronce colgado que la marca
  R.anillo(cx + 0.5, cy + 0.5, 14, hex('#ffd860')); R.anillo(cx + 0.5, cy + 0.5, 15, hex('#c8963a'));
  const dx = Math.round(cx + salto * 120), dy = Math.round(cy - 18 - Math.sin(salto * Math.PI) * 16); R.disco(dx, dy, 4, K); R.disco(dx, dy, 3, BR.o); R.pset(dx - 1, dy - 1, BL);
  // el contador de años (1–18) en su tablilla
  rp(272, 60, 292, 76, K); rp(273, 61, 291, 75, hex('#3a2a1a')); R.numero(String(i + 1), 282, 72, { centro: true });
  // el maestro con su puntero largo sigue la casilla
  const mx = cl(Math.round(cx - 18), 30, 196), m = R.actor(EL.romanoPileo2, mx, 168, t, { dir: 1, sostiene: [mx + 16, 140], habla: t < A(10.2) && bla(t), sonrisa: reset });
  R.linea(m.mano[0], m.mano[1], cx - 2, cy + 12, K); R.linea(m.mano[0] + 1, m.mano[1], cx - 1, cy + 12, hex('#8a6a3a'));
  // los alumnos miran; en «started over» se sorprenden
  R.actor(EL.romana, 240, 170, t, { dir: -1, sorpresa: reset && t < A(12.2), sonrisa: t > A(12.2), habla: t > A(9.0) && t < A(9.8) && bla(t) });
  R.actor(EL.atletaAK, 268, 174, t, { dir: -1, dedo: t > A(9.66) && t < A(10.5), sorpresa: reset });
  // palomas que picotean en el suelo
  for (let k = 0; k < 3; k++) { const x = 130 + k * 26 + Math.round(Math.sin(t * 0.8 + k) * 6), y = 172 + (k % 2) * 4, pic = Math.sin(t * 6 + k * 2) > 0.5 ? 1 : 0; rp(x - 3, y - 3, x + 2, y, hex('#8a8a98')); R.pset(x + 3, y - 4 + pic, hex('#6a6a7a')); R.pset(x + 4, y - 3 + pic, hex('#d8a040')); R.pset(x - 4, y - 2, hex('#5a5a6a')); R.pset(x, y + 1, hex('#c86a4a')); }
};

// 4 · la esferita de los Juegos, enorme: los atletitas corren por el borde
const DX4 = 150, DY4 = 96, DR4 = 58;
const dial4 = () => capa('dial4', () => {
  bronce(0, 0, 319, 179, null, 41, true);
  // los surcos de la espiral grande alrededor
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const r = Math.hypot(x - DX4, y - DY4); if (r < DR4 + 10) continue; const th = Math.atan2(y - DY4, x - DX4), s = (r - DR4 - 10 - th / (2 * Math.PI) * 22) / 22, f = s - Math.floor(s); if (f < 0.07) R.pset(x, y, K); else if (f > 0.94) R.pset(x, y, BP.ll); }
  for (let k = 0; k < 40; k++) { const a = k * 0.33, r = DR4 + 22 + (k % 4) * 22; garab(Math.round(DX4 + Math.cos(a) * r) - 7, Math.round(DY4 + Math.sin(a) * r) - 3, Math.round(DX4 + Math.cos(a) * r) + 7, Math.round(DY4 + Math.sin(a) * r) + 4, hex('#4a2e10'), k, 4); }
  // la esfera: anillo de bronce, pista de tierra y cuatro sectores con sus emblemas (corona, ánfora, rama, trípode)
  R.disco(DX4, DY4 + 2, DR4 + 6, hex('#4a3010')); R.disco(DX4, DY4, DR4 + 5, K); R.disco(DX4, DY4, DR4 + 4, BR.b); R.anillo(DX4 + 0.5, DY4 + 0.5, DR4 + 3, BR.bL);
  R.disco(DX4, DY4, DR4, hex('#c89a62')); R.disco(DX4, DY4, DR4 - 12, K); R.disco(DX4, DY4, DR4 - 13, hex('#2a3a5a'));
  for (let y = DY4 - DR4; y <= DY4 + DR4; y++) for (let x = DX4 - DR4; x <= DX4 + DR4; x++) { const r = Math.hypot(x - DX4, y - DY4); if (r < DR4 - 12 || r > DR4) continue; if (H_(x, y, 44) > 0.85) R.pset(x, y, hex('#a87a48')); if (Math.abs(r - (DR4 - 6)) < 0.5 && (x + y) % 3 === 0) R.pset(x, y, hex('#f0e0c0')); }
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + Math.PI / 4; R.linea(DX4 + Math.cos(a) * (DR4 - 13), DY4 + Math.sin(a) * (DR4 - 13), DX4 + Math.cos(a) * (DR4 + 3), DY4 + Math.sin(a) * (DR4 + 3), K); }
  R.linea(DX4 - DR4 + 13, DY4, DX4 + DR4 - 13, DY4, hex('#1a2440')); R.linea(DX4, DY4 - DR4 + 13, DX4, DY4 + DR4 - 13, hex('#1a2440'));
  const em = (k, x, y) => { x = Math.round(x); y = Math.round(y); const O = BR.o, OS = hex('#8a6a2a');
    if (k === 0) { R.anillo(x + 0.5, y + 0.5, 7, OS); R.anillo(x + 0.5, y + 0.5, 6, O); for (let i = 0; i < 8; i++) { const a = i * 0.8 - 2.6; R.pset(Math.round(x + Math.cos(a) * 8), Math.round(y + Math.sin(a) * 8), hex('#6ab05a')); } }
    else if (k === 1) { R.disco(x, y + 2, 6, OS); R.disco(x, y + 2, 5, O); rp(x - 2, y - 7, x + 2, y - 3, O); R.linea(x - 5, y - 4, x - 3, y, OS); R.linea(x + 5, y - 4, x + 3, y, OS); R.pset(x - 2, y, BL); }
    else if (k === 2) { R.linea(x - 8, y + 6, x + 8, y - 6, OS); for (let i = 0; i < 6; i++) { const px = x - 6 + i * 2.6, py = y + 4 - i * 2; R.disco(px + 2, py + 2, 1.6, hex('#6ab05a')); R.disco(px - 1, py - 2, 1.6, hex('#8ad07a')); } }
    else { R.linea(x - 6, y + 7, x - 2, y - 3, OS); R.linea(x + 6, y + 7, x + 2, y - 3, OS); R.linea(x, y + 7, x, y - 3, OS); R.disco(x, y - 4, 5, O); R.linea(x - 5, y - 4, x + 5, y - 4, OS); } };
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 - Math.PI / 4 - Math.PI / 2; em(k, DX4 + Math.cos(a) * 24, DY4 + Math.sin(a) * 24); }
  R.disco(DX4, DY4, 4, K); R.disco(DX4, DY4, 3, BR.bL);
  // la lucerna a la derecha, en su repisa
  rp(258, 150, 300, 154, hex('#4a3020')); R.linea(258, 150, 300, 150, hex('#6a4a30'));
  calma(BP.b);
});
const p4 = (t) => {
  dial4();
  halo(272, 140, 70, hex('#ffd890'), 0.25); lucerna(272, 150, t);
  // la aguja de la esferita gira despacio
  const an = -Math.PI / 2 + (t - P4) * 0.5; R.linea(DX4, DY4, DX4 + Math.cos(an) * 40, DY4 + Math.sin(an) * 40, K); R.linea(DX4 + 1, DY4, DX4 + 1 + Math.cos(an) * 39, DY4 + Math.sin(an) * 39, BR.o); R.disco(DX4, DY4, 3, BR.o);
  // «?» en «unexpected»
  const q = tramo(t, B(14.21), B(14.4)) - tramo(t, B(15.3), B(15.5)); if (q > 0) globo(232, 54 - Math.round(q * 4), '?');
  // los atletitas en «the Games»: corren por la pista; el último se para a resoplar y luego corre
  const sale = B(15.59);
  if (t > sale - 0.2) for (let k = 0; k < 4; k++) { const ini = Math.max(0, t - sale) ; let p = ini * 1.25 - k * 0.32; if (k === 3) p = Math.min(p, 0.9 - 0.96) + Math.max(0, ini - 1.6) * 1.9;
    const a = -Math.PI * 0.8 + p, x = DX4 + Math.cos(a) * (DR4 - 6), y = DY4 + Math.sin(a) * (DR4 - 6) + 6, d = Math.sin(a) > 0 ? -1 : 1;
    if (k === 3 && ini > 0.9 && ini < 1.6) { atletita(x, y, 0, d, hex('#3a6ad8'), k, 2); if (Math.sin(t * 8) > 0) { R.disco(Math.round(x) + 6 * d, Math.round(y) - 16, 1.5, BL); R.disco(Math.round(x) + 8 * d, Math.round(y) - 19, 1, BL); } }
    else atletita(x, y, t, d, [hex('#d8483a'), hex('#e8c040'), hex('#f0f0f0'), hex('#3a6ad8')][k], k, 2);
    const pa = (t * 6 + k) % 1; R.pset(Math.round(x - Math.cos(a + 0.6) * 4), Math.round(y + 1 - pa * 2), hex('#e0c8a0')); }
  // la mano con el estilete señala la esferita en «small dial» y se aparta cuando salen los atletas
  const v = tramo(t, P4 + 0.2, B(13.4)) - tramo(t, B(15.2), B(15.9)), hx = Math.round(lerp(-30, 72, v)), hy = Math.round(lerp(200, 140, v));
  if (v > 0) { R.linea(hx + 10, hy - 2, hx + 34, hy - 26, K); R.linea(hx + 11, hy - 2, hx + 35, hy - 26, hex('#c8a060')); T.brazo(R, hx - 30, hy + 40, hx, hy, '#5a6a8a', 1, { codo: [hx - 22, hy + 16] }); }
};

// 5 · el estadio de Olimpia: la salida
const p5 = (t) => {
  const g = T.antigua(R, t, { encuadre: 'olimpia', carrera: tramo(t, B(18.0), B(21.9)) });
  // el juez baja el cordel en «Olympic Games»
  const baja = t > B(17.97); R.actor(EL.romanoPileo, 58, 158, t, { dir: 1, brazos: !baja && t > P5 + 0.3, dedo: baja && t < B(19.2), habla: t > B(19.4) && bla(t) });
  R.linea(66, baja ? 150 : 128, 66, baja ? 158 : 150, hex('#f0e0b0'));
  // un atleta en primer término aplaude
  const w = tramo(t, P5 + 0.2, P5 + 1.6); R.actor(EL.atletaAK, Math.round(lerp(330, 238, w)), 172, t, { dir: -1, anda: w > 0 && w < 1, brazos: t > B(18.8) && Math.sin(t * 7) > 0, sonrisa: t > B(18.3) });
  // el 4 de «four-year», con su corona de laurel
  const q = tramo(t, B(16.61), B(16.9)); if (q > 0) { const y = 50 + Math.round((1 - q) * 6); R.anillo(100.5, y - 4.5, 11, hex('#4a8a3a')); for (let i = 0; i < 10; i++) { const a = i * 0.55 + 0.8; R.disco(100 + Math.cos(a) * 11, y - 5 + Math.sin(a) * 11, 1.6, hex('#7ab85a')); } R.numero('4', 101, y, { centro: true }); }
  T.antiguaDelante(R, t, { encuadre: 'olimpia' });
};

// 6 · de noche, la carrera de antorchas bajo la Luna llena
const LUNA6 = [96, 38];
const calleNoche = () => capa('calleNoche', () => {
  degr(0, 0, 319, 92, [hex('#0e1430'), hex('#162048'), hex('#22305e'), hex('#34406e')]);
  // el mar con el reflejo de la Luna
  degr(0, 92, 319, 130, [hex('#1a2a4a'), hex('#22365a'), hex('#1c2c4c')]);
  for (let k = 0; k < 40; k++) { const x = Math.round(H_(k, 1, 70) * 320), y = 96 + Math.round(H_(k, 2, 70) * 32); R.linea(x, y, x + 3, y, hex('#3a4e7a')); }
  // un islote lejano
  R.poligono([[230, 92], [250, 84], [272, 86], [290, 92]], hex('#121a2e'));
  // el murete del jardín entre las casas, con su pérgola de parra
  sillares(118, 128, 176, 150, 5, 12, hex('#4e4e66'), hex('#383850'), hex('#62627c'), 3);
  rp(118, 126, 176, 128, hex('#6e6e8c'));
  for (const x of [122, 172]) rp(x - 1, 104, x + 1, 128, hex('#3a2a22'));
  R.linea(118, 104, 176, 104, hex('#3a2a22')); for (let x = 120; x < 176; x += 2) { const y = 104 + Math.round(Math.sin(x * 0.4) * 2 + 2); R.disco(x, y, 2, x % 6 ? hex('#2a4a34') : hex('#3a5e40')); if (x % 10 === 0) { R.pset(x, y + 3, hex('#5a3a6a')); R.pset(x + 1, y + 4, hex('#5a3a6a')); } }
  // las casas: muros de cal en penumbra, ventanas encendidas, tejados y una azotea
  const casa = (x0, y0, x1, ven) => { estuco(x0, y0, x1, 150, hex('#5a5a78'), hex('#44445e'), hex('#6e6e8c'), x0); tejas(x0 - 2, y0 - 5, x1 + 2, y0 - 1, hex('#5a3a3a'), hex('#3a2228'), hex('#7a4a44'));
    rp(x0, 146, x1, 150, hex('#3e3e56'));
    for (const [vx, vy] of ven) { rp(vx, vy, vx + 6, vy + 8, K); rp(vx + 1, vy + 1, vx + 5, vy + 7, hex('#f0b050')); R.linea(vx + 3, vy + 1, vx + 3, vy + 7, hex('#a86a2a')); R.pset(vx + 1, vy + 1, hex('#ffe0a0'));
      rp(vx - 1, vy + 9, vx + 7, vy + 10, hex('#7a7a96')); R.disco(vx + 1, vy + 7, 2, hex('#2e5a3a')); R.disco(vx + 5, vy + 7, 2, hex('#3a6a44')); R.pset(vx + 5, vy + 5, hex('#d84a6a')); R.pset(vx + 1, vy + 5, hex('#e8d050')); } };
  casa(0, 104, 58, [[10, 118], [36, 116]]); casa(62, 112, 118, [[76, 124]]);
  casa(176, 100, 246, [[188, 114], [222, 112]]); casa(250, 108, 319, [[266, 120], [296, 118]]);
  // la cuerda de la ropa entre dos casas, con un paño
  for (let x = 250; x < 300; x++) R.pset(x, 132 + Math.round(Math.sin((x - 250) / 50 * Math.PI) * 3), hex('#8a8aa0'));
  rp(262, 134, 270, 142, hex('#8a4a5a')); R.linea(262, 134, 270, 134, hex('#aa6a7a')); rp(280, 135, 286, 140, hex('#a8a8c0'));
  // ánforas junto a las puertas
  for (const x of [52, 170, 240]) { R.disco(x, 146, 4, K); R.disco(x, 146, 3, hex('#6a3a2e')); rp(x - 1, 139, x + 1, 142, hex('#6a3a2e')); R.pset(x - 1, 145, hex('#8a5a44')); }
  // la puerta de una casa con su cortina
  rp(92, 130, 104, 150, K); rp(93, 131, 103, 150, hex('#8a3a2a')); for (let y = 132; y < 150; y += 3) R.pset(98, y, hex('#5a2218'));
  // la calle empedrada
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 150) / 4), j = (x + f * 5) % 9; R.pset(x, y, (y - 150) % 4 === 0 || j === 0 ? hex('#2a2a3a') : H_(x >> 1, y, 61) > 0.85 ? hex('#5a5a6e') : hex('#44445a')); }
  // un ciprés y un olivo en sombra
  calma(hex('#0e1430'));
});
const p6 = (t) => {
  calleNoche();
  estrellas(t, 0, 0, 319, 88, 46, 66);
  // la Luna llena con su halo y su reflejo en el mar
  R.anillo(LUNA6[0] + 0.5, LUNA6[1] + 0.5, 16, hex('#2a3a6a')); R.anillo(LUNA6[0] + 0.5, LUNA6[1] + 0.5, 14, hex('#3a4a7a')); lunaF(LUNA6[0], LUNA6[1], 11, 0.5);
  for (let k = 0; k < 9; k++) { const y = 96 + k * 2, w = 1 + (k % 3) + Math.round(Math.sin(t * 3 + k * 1.7) * 1.5), dx = Math.round(Math.sin(t * 2 + k) * 2); R.linea(LUNA6[0] - w + dx, y, LUNA6[0] + w + dx, y, k % 2 ? hex('#6a78a8') : hex('#a8b4d8')); }
  nubes(t, [[30, 60, 40, 1.2], [200, 50, 30, 2], [120, 22, 24, 3]], hex('#141a38'), hex('#26305a'), hex('#3a4672'));
  cipres(132, 150, 46, t, 1); cipres(160, 150, 38, t, 2); olivo(286, 150, t, 1.1, 3);
  // la azotea: el astrónomo señala la Luna en «sky»
  rp(176, 96, 246, 100, hex('#6e6e8c')); R.actor(EL.hiparcoAK, 204, 100, t, { dir: -1, dedo: t > B(22.4), habla: t > B(22.4) && t < B(23.2) && bla(t) });
  // el corredor con la antorcha cruza la calle en «sports»
  const u = tramo(t, P6 + 0.2, B(25.2)), rx = Math.round(lerp(-20, 330, u)), m = R.actor(EL.atletaAK, rx, 172, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [rx + 16, 146] });
  const [ax, ay] = m.mano; R.linea(ax, ay + 3, ax + 1, ay - 6, hex('#6a4a2a')); halo(ax + 1, ay - 10, 30, hex('#ffb850'), 0.35);
  for (let k = 0; k < 4; k++) { const f = Math.sin(t * 17 + k * 2); R.pset(ax + 1 + (k % 2 ? 1 : -1) * (f > 0 ? 1 : 0), ay - 7 - k, k < 2 ? hex('#ffd860') : hex('#ff8a2a')); }
  for (let k = 0; k < 5; k++) { const ph = (t * 2 + k / 5) % 1; R.pset(Math.round(ax - ph * 14 - k), Math.round(ay - 10 - ph * 6), hex('#ffb850')); }
  // la gente aplaude al paso
  R.actor(EL.romana, 40, 166, t, { dir: 1, brazos: rx > 10 && rx < 120 && Math.sin(t * 8) > 0, sonrisa: rx > 0 });
  R.actor(EL.romanoPileo2, 258, 168, t, { dir: -1, brazos: rx > 180 && Math.sin(t * 8 + 1) > 0, sonrisa: rx > 150, habla: rx < 150 && bla(t) });
  T.gato(R, 112, 160, t, { dir: 1 });
};

const efectos = [[0.4, 'brillo'], [A(2.0), 'tic'], [A(2.9), 'tic'], [P2 + 0.2, 'publico'], [A(4.8), 'whoosh'], [A(5.9), 'viento'], [A(6.7), 'brillo'],
  [P3 + 0.5, 'golpecito'], [A(9.0), 'tic'], [A(10.0), 'tic'], [A(11.3), 'boing'], [B(13.4), 'golpecito'], [B(14.25), 'pop'], [B(15.6), 'publico'],
  [B(16.7), 'brillo'], [B(18.0), 'toc'], [B(18.4), 'publico'], [B(20.2), 'palmada'], [P6 + 0.3, 'rafaga'], [B(23.0), 'publico'], [B(24.2), 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: null });
''')

# ───────────────────────────────────────────── AK-ESPIRALES ─────────────────────────────────────────────
E['ak-espirales'] = ('Las espirales', '''// AK-ESPIRALES (frases 20–21), Grecia antigua, sin año ni cartela. Siete planos; golpe «saros+8.6» = corte seco en «Saros»:
// 1. (0 → «the time») maquina atras general: una mano quita el paño que tapa la parte de atrás («On the back»); aparecen
//    las dos espirales y, en «counted 19 years», la aguja de arriba recorre su espiral y sale el «19».
// 2. («the time» → «The Greeks») fondo local: el disco de la espiral de arriba tumbado en una mesa; la mano gira su
//    manivela, la bolita corre por el surco y el contador de meses sube hasta «235»; por la ventana el almendro pasa por
//    las cuatro estaciones.
// 3. («The Greeks» → «The lower one») fondo local: un campo griego; arriba, la fila de 12 lunas se desfasa de la de las
//    estaciones; en «keep» entra la luna 13 y las dos filas vuelven a cuadrar; el labrador sonríe y siembra; los cuervos
//    bajan a las semillas.
// 4. («The lower one» → «223 months») fondo local: por dentro de la caja, la rueda grande de dientes finos mueve el piñón
//    y la aguja de la espiral de abajo; en «big wheel» el dedo de la mano cuenta dientes y en «223» baja la plaquita «223».
// 5. («223 months» → «Saros») fondo local: un pastor en un monte de noche; la Luna pasa por sus fases deprisa y él raya
//    una tabla mes a mes (contador hasta 223); en «18 years» salen 18 solecitos.
// 6. (golpe en «Saros» → «The Babylonians») fondo local: un telar griego; la tejedora pasa la lanzadera y la fila nueva de
//    marcas de eclipse repite la de arriba («eclipses repeat in almost the same pattern»), con una marca un poco corrida.
// 7. («The Babylonians» → fin) antigua reloj camara 'tablillas', o.apunta: el astrónomo babilonio llega al atril, apunta
//    marcas en la tablilla y en «watching the sky» señala la Luna.''', PRE + r'''
const M_ = (s) => en('meton', (s - 0.9) / 14.51), S_ = (s) => en('saros', (s - 16.539) / 18.353);
const P2 = M_(5.37), P3 = M_(11.86), P4 = S_(16.40), P5 = S_(21.55), P6 = S_(25.14), P7 = S_(30.41);

// 1 · la parte de atrás: la mano quita el paño y la aguja de arriba recorre la espiral
const p1 = (t) => {
  const up = tramo(t, M_(3.4), M_(5.6)), g = T.maquina(R, t, { encuadre: 'atras', aguja: [up, 0.12], giro: t * 0.05 });
  // el «19» al lado de la espiral de arriba
  const q = tramo(t, M_(4.05), M_(4.3)); if (q > 0) { const [ax, ay, ar] = g.arriba ?? [160, 64, 40]; const x = ax + ar + 22, y = ay + 4 - Math.round((1 - q) * 5); R.disco(x, y - 4, 11, K); R.disco(x, y - 4, 10, hex('#3a2a1a')); R.anillo(x + 0.5, y - 3.5, 10, BR.o); R.numero('19', x + 1, y, { centro: true }); }
  // el paño de lana: tapa la placa y la mano lo retira hacia abajo a la derecha
  const u = tramo(t, M_(1.05), M_(2.2)), dx = u * u * 240, dy = u * u * 170;
  if (u < 1) { const pts = [[84 + dx, 14 + dy], [240 + dx, 10 + dy], [246 + dx, 184 + dy], [80 + dx, 186 + dy]];
    R.poligono(pts.map(([x, y]) => [x + 1, y + 2]), K); R.poligono(pts, (x, y) => { const f = (x - dx - y * 0.1) % 18; return f < 2 ? hex('#5a1e22') : f < 5 ? hex('#7a2a2e') : f > 14 ? hex('#b8484a') : hex('#9a3438'); });
    for (let y = Math.round(20 + dy); y < 180; y += 6) R.pset(Math.round(150 + dx + Math.sin(y) * 30), y, hex('#c86a5a'));
    for (let x = Math.round(86 + dx); x < 244 + dx; x += 3) R.pset(Math.round(x), Math.round(184 + dy), hex('#e8c060'));
    const hx = Math.round(236 + dx), hy = Math.round(150 + dy * 0.6 - u * 20); if (hx < 360) T.brazo(R, hx + 34, 204, hx, hy, '#4a6a8a', -1, { codo: [hx + 26, hy + 26] }); }
};

// 2 · el disco de la espiral de arriba en la mesa, la manivela y las estaciones por la ventana
const CX2 = 176, CY2 = 132, RX2 = 84, RY2 = 36, K2 = RY2 / RX2;
const esp2 = (m) => { const th = m / 235 * 5 * 2 * Math.PI, r = 14 + (RX2 - 16 - 14) * th / (10 * Math.PI); return [CX2 + Math.cos(th - Math.PI / 2) * r, CY2 + Math.sin(th - Math.PI / 2) * r * K2]; };
const sala2 = () => capa('sala2', () => {
  estuco(0, 0, 319, 112, hex('#d8be8e'), hex('#b89a68'), hex('#ecd6aa'), 21);
  rp(0, 96, 319, 112, hex('#8a5a3a')); R.linea(0, 96, 319, 96, hex('#b07a50')); for (let x = 3; x < 320; x += 9) rp(x, 99, x + 5, 109, hex('#6e4428'));
  // la ventana con sus contraventanas
  rp(14, 18, 106, 92, K); rp(8, 18, 16, 92, hex('#5a7a4a')); rp(104, 18, 112, 92, hex('#5a7a4a')); for (let y = 20; y < 92; y += 4) { R.linea(9, y, 15, y, hex('#3e5a32')); R.linea(105, y, 111, y, hex('#3e5a32')); }
  rp(12, 90, 108, 95, hex('#c8b48a')); R.linea(12, 90, 108, 90, hex('#e8dcc0'));
  // la cenefa de meandros arriba y una hornacina con un ánfora y una lucerna colgada
  rp(0, 4, 319, 12, hex('#8a4a2e')); for (let x = 0; x < 320; x++) { const m = x % 8; R.pset(x, 5, hex('#e8c890')); R.pset(x, 11, hex('#e8c890')); if (m === 0 || m === 4) R.linea(x, 6, x, 10, hex('#e8c890')); if (m < 4) R.pset(x, 6, hex('#e8c890')); else R.pset(x, 10, hex('#e8c890')); }
  rp(146, 52, 176, 90, hex('#a8885a')); R.poligono([[146, 52], [161, 42], [176, 52]], hex('#a8885a')); rp(149, 55, 173, 90, hex('#6a4a2e')); R.disco(161, 78, 7, K); R.disco(161, 78, 6, hex('#b8603a')); rp(158, 64, 164, 71, hex('#b8603a')); R.pset(158, 76, hex('#d8805a')); rp(144, 90, 178, 93, hex('#c8b48a'));
  R.linea(186, 0, 186, 58, hex('#3a2a1a')); R.linea(180, 58, 192, 58, hex('#6a4a2a'));
  // un dibujo de rueda clavado y unos higos secos colgados
  rp(276, 52, 306, 80, hex('#e8dcb8')); R.anillo(291.5, 66.5, 9, hex('#6a5a3a')); for (let k = 0; k < 10; k++) { const a = k * 0.628; R.pset(Math.round(291 + Math.cos(a) * 11), Math.round(66 + Math.sin(a) * 11), hex('#6a5a3a')); } R.pset(278, 54, hex('#c83a2a'));
  for (let k = 0; k < 5; k++) { R.disco(122 + k * 3, 70 + k * 4, 2, hex('#6a3a4a')); } R.linea(121, 64, 136, 88, hex('#c8b090'));
  // el estante con rollos y un compás colgado
  rp(196, 40, 268, 43, hex('#6a4428')); R.linea(196, 40, 268, 40, hex('#9a6a44'));
  for (let i = 0; i < 6; i++) { const x = 200 + i * 11; R.disco(x, 36, 4, K); R.disco(x, 36, 3, i % 2 ? hex('#e8dcb8') : hex('#d8c498')); R.pset(x, 36, hex('#a88a5a')); }
  R.linea(130, 30, 124, 60, hex('#6a5a4a')); R.linea(130, 30, 138, 60, hex('#6a5a4a')); R.disco(130, 30, 2, BR.b);
  // la mesa: tablas de nogal en perspectiva
  tablas(0, 112, 319, 179, 9, hex('#8a5a34'), hex('#5e3a1e'), hex('#b07a4a'), 22);
  // el disco de bronce tumbado, con su canto
  for (let y = CY2 - RY2 - 4; y <= CY2 + RY2 + 6; y++) for (let x = CX2 - RX2 - 2; x <= CX2 + RX2 + 2; x++) { const dx = (x - CX2) / RX2, dyc = (y - CY2) / RY2, dye = (y - CY2 - 5) / RY2, d = dx * dx + dyc * dyc;
    if (d > 1 && dx * dx + dye * dye <= 1 && y > CY2) R.pset(x, y, y > CY2 + RY2 + 3 ? hex('#3a2a14') : BP.s);
    if (d <= 1) { const rr = Math.sqrt(d) * RX2, th = Math.atan2((y - CY2) / K2, x - CX2) + Math.PI / 2, tn = ((th % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) / (2 * Math.PI), s = (rr - 14 - (RX2 - 30) * tn / 5) / ((RX2 - 30) / 5), f = s - Math.floor(s);
      let c = vn(x, y, 14, 23) > 0.62 ? BP.l : vn(x, y, 9, 25) < 0.3 ? BP.m : BP.b; if (H_(x, y, 24) > 0.93) c = BP.ll; if (rr > RX2 - 3) c = d > 0.97 ? K : BP.ll;
      else if (s >= 0 && s < 5 && f < 0.12) c = BP.g; else if (s >= 0 && s < 5 && f > 0.9) c = BP.ll; R.pset(x, y, c); } }
  // garabatos alrededor del disco y la tablilla de cera con el contador
  rp(18, 138, 74, 170, K); rp(19, 139, 73, 169, hex('#6a4a2a')); rp(22, 142, 70, 166, hex('#3a3022'));
  R.disco(268, 168, 6, K); R.disco(268, 168, 5, hex('#c8a060')); for (let i = 0; i < 3; i++) R.linea(250 + i * 4, 172, 258 + i * 4, 160, hex('#d8c498'));
  calma(hex('#d8be8e'));
});
const ESTA = [[hex('#7ab85a'), hex('#f0a8c0')], [hex('#3e7a3a'), hex('#4e8a44')], [hex('#c8782a'), hex('#e8a040')], [hex('#6a5a4a'), hex('#f0f4f8')]];
const ventana2 = (t, est) => { R.recorte([14, 18, 106, 89]);
  const cielo = [hex('#8ac0ec'), hex('#a8d4f2'), hex('#f0c890'), hex('#b8c4d4')][est]; for (let y = 18; y < 90; y += 1) R.linea(14, y, 106, y, mez(cielo, BL, (y - 18) / 140));
  nube3(((t * 4) % 120) + 0, 32, 20, hex('#a8bcd0'), hex('#e8eef4'), BL); nube3(((t * 2 + 60) % 130), 26, 14, hex('#a8bcd0'), hex('#e8eef4'), BL);
  for (let x = 14; x <= 106; x++) { const h = 70 + Math.round(Math.sin(x * 0.07) * 4); R.linea(x, h, x, 89, est === 3 ? hex('#d8e0e8') : est === 2 ? hex('#a89048') : hex('#6a9a4a')); }
  // el almendro: tronco y copa de la estación
  R.linea(60, 89, 60, 60, hex('#4a3020')); R.linea(61, 89, 61, 60, hex('#6a4a30')); R.linea(60, 66, 50, 56, hex('#4a3020')); R.linea(61, 64, 72, 54, hex('#4a3020'));
  const [c1, c2] = ESTA[est]; if (est !== 3) { for (let i = 0; i < 12; i++) { const a = i * 0.52, x = 60 + Math.cos(a) * 14 + Math.sin(t * 1.5 + i) * 0.6, y = 52 + Math.sin(a) * 7; R.disco(x, y, 4, mez(c1, K, 0.25)); R.disco(x - 0.5, y - 0.5, 3, c1); if (est === 0 && i % 2 === 0) R.pset(Math.round(x), Math.round(y - 2), c2); }
    if (est === 2) for (let k = 0; k < 6; k++) { const ph = (t * 0.6 + k / 6) % 1; R.pset(Math.round(50 + k * 4 + Math.sin(t * 3 + k) * 3), Math.round(56 + ph * 32), c2); } }
  else { R.linea(60, 60, 54, 48, hex('#4a3020')); R.linea(61, 60, 68, 46, hex('#4a3020')); for (let k = 0; k < 14; k++) { const ph = (t * 0.4 + k / 14) % 1; R.pset(Math.round(16 + k * 6.5 + Math.sin(t + k) * 2), Math.round(18 + ph * 70), BL); } }
  if (est === 1) solD(92, 30, 6, t);
  R.recorte(null); };
const p2 = (t) => {
  sala2();
  const est = Math.floor(Math.max(0, t - P2) / 0.75) % 4; ventana2(t, est);
  // las cuatro estaciones también en los iconitos del borde de la mesa (se enciende la de ahora)
  for (let k = 0; k < 4; k++) { const x = 116 + k * 20, y = 106, on = k === est; R.disco(x, y, 5, K); R.disco(x, y, 4, on ? ESTA[k][1] : hex('#7a6a50')); if (on) R.anillo(x + 0.5, y + 0.5, 6, hex('#ffe8a0')); }
  // la bolita corre por el surco: 235 meses
  const m = Math.round(tramo(t, P2 + 0.3, M_(9.67)) * 235), [bx, by] = esp2(m);
  for (let k = 1; k < 30; k++) { const [x, y] = esp2(Math.max(0, m - k * 2)); if (k % 2) R.pset(Math.round(x), Math.round(y), hex('#ffe070')); }
  R.disco(bx, by, 3.5, K); R.disco(bx, by, 2.5, hex('#f0f4f8')); R.pset(Math.round(bx) - 1, Math.round(by) - 1, BL);
  // el contador de meses en la tablilla; en «235» brilla en oro
  const fin = t > M_(9.67); R.numero(String(m), 46, 160, { centro: true, color: fin ? hex('#ffd860') : hex('#e8dcc0') }); if (fin && t < M_(10.6)) R.anillo(46.5, 154.5, 22, hex('#ffd860'));
  // la manivela del disco y la mano que la gira
  const ga = (t - P2) * 7 * (t < M_(9.8) ? 1 : 0.15), kx = 294, ky = 150, px = kx + Math.cos(ga) * 7, py = ky + Math.sin(ga) * 4;
  R.linea(CX2 + RX2 - 2, CY2 + 2, kx, ky, K); R.linea(CX2 + RX2 - 2, CY2 + 1, kx, ky - 1, BR.bL); R.disco(kx, ky, 3, BR.b); R.linea(kx, ky, px, py, BR.bL); R.disco(px, py, 2, hex('#6a4428'));
  T.brazo(R, 340, 204, px + 2, py + 3, '#6a4a8a', -1, { codo: [328, 180] });
};

// 3 · el campo: las lunas se desfasan de las estaciones y la luna 13 las vuelve a juntar
const campo3 = () => capa('campo3', () => {
  degr(0, 0, 319, 96, [hex('#6aa0dc'), hex('#86b6e6'), hex('#a8cef0'), hex('#d4e6f2')]);
  for (let x = 0; x < 320; x++) { const h = 78 + Math.sin(x * 0.025 + 1) * 8 + Math.sin(x * 0.08) * 3; for (let y = Math.round(h); y < 100; y++) R.pset(x, y, H_(x >> 1, y, 31) > 0.82 ? hex('#7a9a74') : hex('#8aa884')); }
  for (let x = 0; x < 320; x++) { const h = 92 + Math.sin(x * 0.04 + 3) * 5; for (let y = Math.round(h); y < 104; y++) R.pset(x, y, H_(x >> 1, y, 32) > 0.75 ? hex('#5e7e4a') : hex('#6e8e56')); }
  for (let i = 0; i < 14; i++) { const x = 10 + i * 23 + Math.round(H_(i, 3, 3) * 8); R.disco(x, 96, 3, hex('#3e5a3a')); R.disco(x - 1, 95, 2, hex('#6a8a5e')); }
  // un templete en la colina y una casa de labranza
  rp(240, 78, 262, 88, hex('#e4dccc')); for (let i = 0; i < 4; i++) rp(242 + i * 6, 80, 243 + i * 6, 88, hex('#a89c88')); R.poligono([[238, 78], [251, 71], [264, 78]], hex('#d0c4b0'));
  estuco(30, 90, 62, 106, hex('#ece4d2'), hex('#c8bca4'), hex('#fffaf0'), 3); tejas(28, 85, 64, 89, hex('#b8603a'), hex('#7a3a22'), hex('#d8805a')); rp(42, 96, 48, 106, hex('#4a3a2a'));
  // el campo arado con surcos en perspectiva
  for (let y = 104; y < 180; y++) { const u = (y - 104) / 76; for (let x = 0; x < 320; x++) { const xs = (x - 160) / (0.4 + u * 1.2) + 160, f = ((xs % 10) + 10) % 10; R.pset(x, y, f < 2 ? hex('#6a4a2e') : f < 4 ? hex('#8a6440') : H_(x >> 1, y, 33) > 0.9 ? hex('#b0885a') : hex('#9a7248')); } }
  // el borde de piedras y hierba a la derecha, un cesto y un arado apoyado
  for (let i = 0; i < 12; i++) { const x = 270 + (i % 4) * 12, y = 150 + Math.floor(i / 4) * 10; R.disco(x, y, 4, hex('#8a8478')); R.disco(x - 1, y - 1, 3, hex('#aaa498')); }
  R.linea(250, 150, 288, 176, hex('#5a3a22')); R.linea(251, 150, 289, 176, hex('#7a5232')); rp(284, 172, 292, 178, hex('#8a8a90'));
  // el camino de tierra clara y unas matas en el borde
  for (let y = 104; y < 180; y++) { const u = (y - 104) / 76, x0 = Math.round(196 + u * 30), w = Math.round(6 + u * 26); for (let x = x0; x < x0 + w; x++) R.pset(x, y, H_(x >> 1, y, 35) > 0.85 ? hex('#d8c098') : hex('#c8ac80')); }
  for (let i = 0; i < 9; i++) { const x = 8 + i * 36, y = 108 + (i % 3) * 3; for (let k = 0; k < 5; k++) R.linea(x + k * 2 - 4, y, x + k * 3 - 6, y - 5 - (k % 2) * 2, hex('#5e7e3a')); }
  calma(hex('#7aaae0'));
});
const p3 = (t) => {
  campo3();
  nubes(t, [[10, 60, 34, 2], [150, 66, 26, 3.5], [240, 58, 18, 5.5]], hex('#a8bcd0'), hex('#e8eef4'), BL);
  for (let k = 0; k < 3; k++) ave(((t * 14 + k * 30) % 360) - 20, 70 + k * 3, t, hex('#3a3a4a'), k);
  // la tira de las estaciones (el año del Sol) y la tira de las lunas (12 meses: se queda corta)
  const bx0 = 26, bx1 = 266; rp(bx0 - 3, 18, bx1 + 3, 60, hex('#5a3a22')); rp(bx0 - 2, 19, bx1 + 2, 59, hex('#f0e4c8')); for (let y = 20; y < 59; y++) for (let x = bx0; x < bx1; x += 7) if (H_(x, y, 34) > 0.8) R.pset(x, y, hex('#e0d0b0'));
  const W = (bx1 - bx0) / 4, ESTI = [[hex('#5aa84a'), 'brote'], [hex('#e8b030'), 'sol'], [hex('#c86a2a'), 'hoja'], [hex('#8ab0e0'), 'nieve']];
  for (let k = 0; k < 4; k++) { const x0 = Math.round(bx0 + k * W), xc = Math.round(x0 + W / 2); rp(x0 + 1, 46, x0 + W - 1, 57, mez(ESTI[k][0], BL, 0.55)); R.linea(x0, 46, x0, 57, hex('#8a6a4a'));
    const c = ESTI[k][0]; if (k === 0) { R.linea(xc, 56, xc, 50, c); R.disco(xc - 2, 50, 1.5, c); R.disco(xc + 2, 49, 1.5, c); } else if (k === 1) { R.disco(xc, 51, 3, c); for (let i = 0; i < 8; i++) R.pset(Math.round(xc + Math.cos(i * 0.8) * 5), Math.round(51 + Math.sin(i * 0.8) * 5), c); }
    else if (k === 2) { R.poligono([[xc - 4, 54], [xc, 47], [xc + 4, 54]], c); R.linea(xc, 47, xc, 56, hex('#6a3a1a')); } else { R.linea(xc - 4, 51, xc + 4, 51, c); R.linea(xc, 47, xc, 55, c); R.linea(xc - 3, 48, xc + 3, 54, c); R.linea(xc - 3, 54, xc + 3, 48, c); } }
  // las lunas: 12 a lo ancho de 354 días; se van corriendo; en «keep» entra la 13 y todo cuadra
  const deriva = tramo(t, P3 + 0.2, M_(12.7)), entra = tramo(t, M_(12.74), M_(13.6)), n = 12 + (entra > 0 ? 1 : 0);
  const ancho = (bx1 - bx0) * (354 / 365) * (1 - deriva * 0.12) * (1 - entra) + (bx1 - bx0) * entra, paso = ancho / n;
  for (let i = 0; i < n; i++) { const x = bx0 + paso * (i + 0.5), y = 32, ult = i === 12; const yy = ult ? y - Math.round((1 - entra) * 26) : y; lunaF(x, yy, 6, 0.5, hex('#f0e4c8')); if (ult && entra < 1) R.anillo(x + 0.5, yy + 0.5, 9, hex('#ffd860')); }
  // el hueco que queda al final de la tira de lunas (en rojo) y el brillo cuando cuadra
  const hueco = bx0 + ancho; if (entra < 0.9 && hueco < bx1 - 2) { rp(Math.round(hueco), 24, bx1, 40, hex('#f0b0a0')); R.icono('X', Math.round((hueco + bx1) / 2) - 2, 28, hex('#c83a2a'), hex('#f0b0a0')); }
  const ok = tramo(t, M_(13.9), M_(14.2)) - tramo(t, M_(14.9), M_(15.4)); if (ok > 0) { R.linea(bx0, 43, bx1, 43, hex('#ffd860')); for (let k = 0; k <= 4; k++) R.linea(Math.round(bx0 + k * W), 40, Math.round(bx0 + k * W), 46, hex('#ffd860')); }
  // la ruedecita de bronce que trae la luna 13
  if (entra > 0 && entra < 1) rueda(bx1 - 4, 32 - Math.round((1 - entra) * 24), 6, 10, t * 6, BR.b, BR.bS, BR.bL);
  // el labrador mira la tira, sonríe y siembra; los cuervos bajan a las semillas
  const siembra = tramo(t, M_(14.6), P4 + 0.3), fx = Math.round(lerp(70, 168, siembra));
  const m = R.actor(EL.romanoPileo2, fx, 168, t, { dir: 1, anda: siembra > 0 && siembra < 1, dedo: t > P3 + 0.3 && t < M_(13.0), sonrisa: t > M_(14.0), sostiene: siembra > 0 ? [fx + 15, 150] : undefined, habla: t > M_(12.2) && t < M_(13.0) && bla(t) });
  if (siembra > 0) { R.disco(m.mano[0] + 2, m.mano[1] + 2, 3, K); R.disco(m.mano[0] + 2, m.mano[1] + 2, 2, hex('#c8b090')); for (let k = 0; k < 8; k++) { const ph = (t * 2.2 + k / 8) % 1; R.pset(Math.round(m.mano[0] + 4 + ph * 10 + k), Math.round(m.mano[1] + 4 + ph * ph * 18), hex('#f0e0a0')); } }
  for (let k = 0; k < 2; k++) { const v = tramo(t, M_(15.0) + k * 0.3, M_(15.8) + k * 0.3), x = Math.round(lerp(330, 120 + k * 22, v)), y = Math.round(lerp(60, 170, v)), p = Math.sin(t * 12 + k) > 0;
    R.disco(x, y - 2, 2.5, K); R.pset(x - 3, y - 3, K); R.pset(x - 4, y - 3, hex('#e8b030')); R.pset(x - 2, y - 4, hex('#5a5a6a')); R.linea(x + 2, y - 2, x + 5, y - 1, K);
    if (v < 1) { R.linea(x, y - 3, x - 3, y - 7 + (p ? 0 : 6), K); R.linea(x + 1, y - 3, x + 4, y - 7 + (p ? 0 : 6), K); } else { R.pset(x - 1, y + 1, hex('#e8b030')); R.pset(x + 1, y + 1, hex('#e8b030')); if (Math.sin(t * 7 + k) > 0.4) R.pset(x - 4, y - 1, K); } }
  T.gato(R, 238, 176, t, { dir: -1 });
};

// 4 · por dentro: la rueda grande de dientes finos mueve el piñón y la aguja de abajo
const GX4 = 222, GY4 = 112, GR4 = 84, NG4 = 223;
const dentro4 = () => capa('dentro4', () => {
  // el fondo: la tabla de nogal oscura de la caja por dentro, con sus vetas, clavijas y polvo
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(y * 0.5 + Math.sin(x * 0.03 + y * 0.02) * 4) * 0.5 + 0.5, n = H_(x >> 1, y, 41); R.pset(x, y, v > 0.82 ? hex('#3a2616') : n > 0.92 ? hex('#5a3c24') : v < 0.15 ? hex('#22160c') : hex('#2e1e12')); }
  // la placa de atrás con un trozo de la espiral de abajo, a la izquierda
  bronce(0, 40, 96, 179, (x, y) => Math.hypot(x - 30, y - 120) < 70, 5, true);
  for (let y = 50; y < 180; y++) for (let x = 0; x < 100; x++) { const r = Math.hypot(x - 30, y - 120); if (r > 70) continue; if (r > 68) { R.pset(x, y, K); continue; } const th = Math.atan2(y - 120, x - 30), s = (r - 14 - th / (2 * Math.PI) * 13) / 13, f = s - Math.floor(s); if (f < 0.1) R.pset(x, y, K); else if (f > 0.9) R.pset(x, y, BP.ll); }
  for (let k = 0; k < 9; k++) { const a = k * 0.7, r = 24 + (k % 3) * 13; garab(Math.round(30 + Math.cos(a) * r) - 4, Math.round(120 + Math.sin(a) * r) - 3, Math.round(30 + Math.cos(a) * r) + 4, Math.round(120 + Math.sin(a) * r) + 3, hex('#4a2e10'), k); }
  // los ejes y un puente de bronce con remaches
  rp(100, 22, 170, 30, BR.bS); R.linea(100, 22, 170, 22, BR.bL); for (const x of [106, 164]) { R.disco(x, 26, 2, K); R.pset(x, 25, BR.o); }
  calma(hex('#2e1e12'));
});
const p4 = (t) => {
  dentro4();
  // la luz de la lucerna desde abajo
  halo(150, 190, 120, hex('#ffb860'), 0.22);
  const ang = (t - P4) * 0.12, pin = -ang * (NG4 / 15);
  // la sombra de la rueda grande y la rueda
  R.disco(GX4 + 4, GY4 + 6, GR4 + 3, hex('#160e08'));
  rueda(GX4, GY4, GR4, NG4, ang, BR.b, BR.bS, BR.bL, { diente: 3, huecos: hex('#2e1e12'), radios: true });
  for (let k = 0; k < 4; k++) { const a = ang + k * Math.PI / 2 + 0.4; for (let w = -2; w <= 2; w++) R.linea(GX4 + Math.cos(a) * 12 + Math.cos(a + 1.57) * w, GY4 + Math.sin(a) * 12 + Math.sin(a + 1.57) * w, GX4 + Math.cos(a) * (GR4 * 0.7) + Math.cos(a + 1.57) * w, GY4 + Math.sin(a) * (GR4 * 0.7) + Math.sin(a + 1.57) * w, w === -2 ? BR.bL : w === 2 ? BR.bS : BR.b); }
  // las dos ruedecitas de la Luna montadas en la grande
  const ra = ang + 2.3, rx = GX4 + Math.cos(ra) * 46, ry = GY4 + Math.sin(ra) * 46; rueda(rx, ry, 11, 15, t * 0.8, BR.b, BR.bS, BR.bL, { diente: 2 }); rueda(rx + 6, ry - 3, 9, 15, -t * 0.8, mez(BR.b, BR.bL, 0.3), BR.bS, BR.bL, { diente: 2 });
  // el piñón que engrana con la rueda grande y su eje hasta la aguja de la espiral de abajo
  const pa = Math.PI * 1.11, px = GX4 + Math.cos(pa) * (GR4 + 13), py = GY4 + Math.sin(pa) * (GR4 + 13);
  rueda(px, py, 11, 15, pin, BR.b, BR.bS, BR.bL, { diente: 3 });
  R.linea(px, py, 30, 120, K); R.linea(px, py - 1, 30, 119, BR.bS);
  const aa = pin * 0.15; R.linea(30, 120, 30 + Math.cos(aa) * 56, 120 + Math.sin(aa) * 56, K); R.linea(31, 120, 31 + Math.cos(aa) * 55, 120 + Math.sin(aa) * 55, BR.o); R.disco(30, 120, 4, BR.o); R.disco(30, 120, 2, K);
  // el dedo cuenta dientes en «big wheel»: la mano entra por abajo y toca diente a diente
  const v = tramo(t, S_(17.7), S_(18.3)) - tramo(t, S_(20.9), S_(21.4)), tap = Math.abs(Math.sin((t - S_(18.3)) * 9)) * 3;
  if (v > 0) { const ex = GX4 + Math.cos(2.62) * (GR4 + 6), ey = GY4 + Math.sin(2.62) * (GR4 + 6); const hx = Math.round(lerp(ex - 40, ex - 12, v)), hy = Math.round(lerp(ey + 40, ey + 2 - tap, v)); T.brazo(R, hx - 30, 200, hx, hy, '#6a4a8a', 1, { codo: [hx - 26, hy + 28] }); }
  // la plaquita «223» baja de su cuerda en «223»
  const q = tramo(t, S_(19.7), S_(20.2)), ty = Math.round(lerp(-30, 36, q) + Math.sin(t * 3) * (q > 0.9 ? 1.5 : 0));
  if (q > 0) { R.linea(140, 0, 140, ty - 9, hex('#c8b090')); rp(116, ty - 9, 164, ty + 6, K); rp(117, ty - 8, 163, ty + 5, BR.b); R.linea(117, ty - 8, 163, ty - 8, BR.bL); R.numero('223', 140, ty + 2, { centro: true }); }
  // motas de polvo en la luz
  for (let k = 0; k < 10; k++) { const ph = (t * 0.15 + k / 10) % 1; R.pset(Math.round(110 + k * 17 + Math.sin(t + k) * 5), Math.round(170 - ph * 140), hex('#c8a070')); }
};

// 5 · el pastor de noche: las fases de la Luna y la tabla con las rayas de los meses
const monte5 = () => capa('monte5', () => {
  degr(0, 0, 319, 110, [hex('#0a1028'), hex('#121a3a'), hex('#1c2850'), hex('#2a3460')]);
  // la Vía Láctea en diagonal, tramada
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { const d = Math.abs((x * 0.4 - y) - 20) / 26; if (d < 1 && H_(x, y, 51) > 0.55 + d * 0.4 && !(x > 266 && y < 50)) R.pset(x, y, d < 0.4 ? hex('#3a4678') : hex('#2a3664')); }
  // los montes lejanos y el mar
  for (let x = 0; x < 320; x++) { const h = 96 + Math.sin(x * 0.03) * 8 + Math.sin(x * 0.11) * 3; for (let y = Math.round(h); y < 120; y++) R.pset(x, y, hex('#141a30')); }
  // nuestro monte: hierba seca, piedras y matas
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const top = 112 + Math.sin(x * 0.02 + 2) * 6; if (y < top) continue; const v = H_(x >> 1, y, 52); R.pset(x, y, v > 0.9 ? hex('#4a5a3a') : v < 0.1 ? hex('#1e2618') : (x + y) % 7 === 0 ? hex('#34422a') : hex('#2a3622')); }
  for (let i = 0; i < 10; i++) { const x = 8 + i * 33, y = 168 + (i % 3) * 4; R.disco(x, y, 4, hex('#2a2e34')); R.disco(x - 1, y - 1, 3, hex('#4a4e58')); }
  // la cabaña de piedra con su puerta iluminada
  sillares(210, 104, 290, 146, 6, 14, hex('#4a4a56'), hex('#30303a'), hex('#5e5e6c'), 5); R.poligono([[204, 106], [250, 86], [296, 106]], hex('#3a2a22')); for (let x = 210; x < 292; x += 4) R.linea(x, 104, 250 + (x - 250) * 0.2, 90, hex('#2a1e18'));
  rp(244, 118, 258, 146, K); rp(245, 119, 257, 146, hex('#e0903a')); R.linea(251, 119, 251, 146, hex('#b86a2a'));
  // la tabla de las rayas en su poste
  rp(118, 138, 122, 170, hex('#4a3020')); rp(92, 112, 176, 140, K); rp(93, 113, 175, 139, hex('#8a6a44')); for (let y = 115; y < 139; y += 3) R.linea(94, y, 174, y, hex('#7a5a38'));
  calma(hex('#0a1028'));
});
const p5 = (t) => {
  monte5();
  estrellas(t, 0, 0, 319, 96, 50, 55);
  // la Luna cambia de fase deprisa (un mes cada vez)
  const mes = tramo(t, P5 + 0.1, S_(23.6)) * 223; lunaF(176, 40, 12, (mes % 1) * 0.999 + 0.0005, hex('#0e1430')); R.anillo(176.5, 40.5, 15, hex('#1e2a50'));
  // la hoguera junto a la cabaña con su humo
  for (let k = 0; k < 5; k++) { const f = Math.sin(t * 15 + k * 2); R.pset(198 + k - 2 + (f > 0 ? 1 : 0), 154 - k - (f > 0.5 ? 1 : 0), k < 2 ? hex('#ffd860') : hex('#ff8a2a')); }
  halo(198, 152, 34, hex('#ff9a40'), 0.3); rp(192, 156, 204, 158, hex('#4a3020'));
  for (let k = 0; k < 5; k++) { const ph = (t * 0.4 + k / 5) % 1; R.disco(198 + Math.sin(ph * 6 + k) * 3 + ph * 8, 148 - ph * 40, 1 + ph * 2, hex('#3a4060')); }
  // las ovejas que duermen (respiran)
  for (const [x, y, k] of [[40, 162, 0], [62, 168, 1], [296, 166, 2]]) { const r = Math.sin(t * 2 + k) > 0.5 ? 1 : 0; rp(x - 7, y - r - 4, x + 5, y, K); R.disco(x - 3, y - 3 - r, 4, hex('#d8d4c8')); R.disco(x + 1, y - 3 - r, 4, hex('#d8d4c8')); R.disco(x - 2, y - 5 - r, 2, hex('#f0ece0')); R.disco(x + 2, y - 5 - r, 2, hex('#f0ece0')); rp(x + 5, y - 5, x + 9, y - 1, hex('#2a2a32')); R.pset(x + 8, y - 4, hex('#5a5a62')); R.pset(x + 6, y - 6, hex('#2a2a32')); }
  // las rayas de los meses en la tabla (filas de 37) y el contador
  const n = Math.floor(mes); for (let i = 0; i < Math.min(n, 223); i++) { const fila = Math.floor(i / 37), col = i % 37, x = 96 + col * 2, y = 116 + fila * 4; R.linea(x, y, x, y + 2, hex('#2a1a0e')); }
  rp(130, 96, 168, 108, K); rp(131, 97, 167, 107, hex('#3a2a1a')); R.numero(String(Math.min(223, Math.max(1, n))), 149, 105, { centro: true, color: n >= 223 ? hex('#ffd860') : undefined });
  // en «18 years» salen 18 solecitos encima de la tabla
  const so = tramo(t, S_(23.79), S_(24.6)); for (let i = 0; i < Math.floor(so * 18); i++) { const x = 92 + (i % 9) * 10, y = 70 + Math.floor(i / 9) * 11; R.disco(x, y, 3.5, hex('#c88a20')); R.disco(x, y, 3, hex('#ffd040')); for (let k = 0; k < 4; k++) R.pset(Math.round(x + Math.cos(k * 1.57) * 5), Math.round(y + Math.sin(k * 1.57) * 5), hex('#ffd040')); R.pset(x - 1, y - 1, hex('#fff4c0')); }
  // el pastor raya la tabla con su cuchillo y luego la mira contento
  const raya = t < S_(23.6), m = R.actor(EL.romanoPileo2, 74, 168, t, { dir: 1, sostiene: raya ? [92 + (n % 37) * 2, 118 + Math.floor(Math.min(n, 222) / 37) * 4 + Math.round(Math.sin(t * 18))] : undefined, sonrisa: !raya, dedo: !raya && t > S_(23.9) });
  if (raya) { R.linea(m.mano[0], m.mano[1], m.mano[0] + 3, m.mano[1] - 3, hex('#c8c8d0')); }
  // el perro que duerme junto al fuego y levanta la oreja
  rp(176, 168, 190, 173, K); rp(177, 169, 189, 172, hex('#8a6a44')); R.disco(176, 168, 3, hex('#8a6a44')); R.pset(175, 165 - (Math.sin(t * 1.3) > 0.7 ? 1 : 0), hex('#5a4024'));
};

// 6 · el telar: la fila nueva de marcas repite la de arriba (golpe en «Saros»)
const PAT = ['sol', 'luna', null, 'luna', 'sol', null, null, 'luna', 'sol', 'luna', null, 'sol'];
const telar6 = () => capa('telar6', () => {
  // el patio: pared de cal con una ventana alta y una parra; suelo de guijarros
  estuco(0, 0, 319, 150, hex('#e8dcc4'), hex('#c8b89c'), hex('#f8f0e0'), 61);
  rp(0, 120, 319, 150, hex('#b86a4a')); R.linea(0, 120, 319, 120, hex('#d88a6a')); for (let x = 0; x < 320; x += 6) R.pset(x, 124 + (x % 12 ? 0 : 1), hex('#8a4a32'));
  rp(252, 46, 290, 84, K); rp(254, 48, 288, 82, hex('#8ac0ec')); R.linea(271, 48, 271, 82, K); R.linea(254, 65, 288, 65, K); rp(250, 84, 292, 87, hex('#c8b89c'));
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const v = H_(x >> 1, y >> 1, 62); R.pset(x, y, v > 0.8 ? hex('#b8a888') : v < 0.2 ? hex('#8a7a62') : (x + y * 3) % 5 === 0 ? hex('#a89878') : hex('#9e8e70')); }
  // el telar vertical: dos postes, el travesaño de arriba y las pesas de barro abajo
  rp(78, 10, 84, 168, hex('#6a4428')); rp(236, 10, 242, 168, hex('#6a4428')); R.linea(78, 10, 78, 168, hex('#8a5a34')); R.linea(236, 10, 236, 168, hex('#8a5a34'));
  rp(72, 14, 248, 20, hex('#5a3a22')); R.linea(72, 14, 248, 14, hex('#8a5a34'));
  for (let x = 88; x < 234; x += 3) R.linea(x, 21, x + Math.round(Math.sin(x) * 1), 140, hex('#d8c8a0'));
  for (let i = 0; i < 12; i++) { const x = 92 + i * 12, y = 146 + (i % 2) * 3; R.linea(x, 140, x, y - 4, hex('#c8b890')); R.disco(x, y, 4, K); R.disco(x, y, 3, hex('#a8603a')); R.pset(x - 1, y - 1, hex('#c8805a')); }
  // las madejas de lana colgadas en clavijas y un estante con cuencos
  for (let i = 0; i < 4; i++) { const x = 14 + i * 14; R.disco(x, 30, 2, hex('#5a3a22')); const c = [hex('#d84a4a'), hex('#3a6ab0'), hex('#e8c040'), hex('#f0e8d0')][i]; for (let y = 32; y < 60; y++) { R.pset(x - 2 + (y % 3 === 0 ? 1 : 0), y, c); R.pset(x + 1, y, mez(c, K, 0.25)); R.pset(x, y, c); } rp(x - 3, 58, x + 2, 61, c); }
  rp(250, 100, 300, 103, hex('#6a4428')); R.linea(250, 100, 300, 100, hex('#8a5a34')); for (let i = 0; i < 4; i++) { const x = 256 + i * 12; R.disco(x, 96, 4, K); R.disco(x, 96, 3, i % 2 ? hex('#3a3a3a') : hex('#b8603a')); rp(x - 4, 92, x + 4, 95, hex('#e8dcc4')); }
  R.disco(10, 92, 4, BR.b); R.linea(10, 88, 10, 70, hex('#3a2a1a'));
  // un cesto de lana, el huso y un ánfora
  R.disco(40, 158, 12, K); R.disco(40, 158, 11, hex('#b8904a')); for (let x = 30; x < 52; x += 3) R.linea(x, 150, x + 1, 168, hex('#8a6a34')); R.disco(36, 148, 5, hex('#d84a4a')); R.disco(44, 147, 5, hex('#3a6ab0')); R.disco(40, 144, 4, hex('#f0e8d0'));
  R.disco(290, 150, 8, K); R.disco(290, 150, 7, hex('#b8603a')); rp(287, 136, 293, 143, hex('#b8603a')); R.pset(287, 148, hex('#d8805a'));
  calma(hex('#e8dcc4'));
});
const p6 = (t) => {
  telar6();
  // la tela tejida: dos filas con el mismo dibujo de eclipses; la de abajo crece con cada pasada
  const x0 = 90, cw = 12, fila1 = 34, fila2 = 70, teje = tramo(t, P6 + 0.2, S_(28.2)), golpe = 1 - tramo(t, P6, P6 + 0.6);
  rp(x0 - 4, 21, x0 + cw * 12 + 2, 52, hex('#c84a3a')); for (let x = x0 - 4; x < x0 + cw * 12 + 2; x += 2) { R.pset(x, 23, hex('#e8c060')); R.pset(x + 1, 50, hex('#e8c060')); }
  const alto2 = Math.round(52 + teje * 36); rp(x0 - 4, 53, x0 + cw * 12 + 2, alto2, hex('#c84a3a')); if (alto2 > 86) for (let x = x0 - 4; x < x0 + cw * 12 + 2; x += 2) { R.pset(x, 55, hex('#e8c060')); R.pset(x + 1, 86, hex('#e8c060')); }
  for (let y = 22; y < alto2; y += 2) for (let x = x0 - 4; x < x0 + cw * 12 + 2; x += 4) R.pset(x + (y % 4 ? 0 : 2), y, hex('#a83a2e'));
  for (let i = 0; i < 12; i++) { const tp = PAT[i]; if (!tp) continue; marcaEcl(x0 + i * cw + 4, fila1, tp, 1, 4, hex('#c84a3a'));
    // la fila nueva: el mismo dibujo, corrido un poquito (casi igual)
    const x = x0 + i * cw + 4 + (i === 9 ? 3 : 0); if (fila2 + 6 < alto2) marcaEcl(x, fila2, tp, 1, 4, hex('#c84a3a')); }
  if (golpe > 0) velo(x0 - 4, 21, x0 + cw * 12 + 2, 52, hex('#fff4c0'), golpe * 0.6);
  // en «repeat»: las parejas se unen con una línea de puntos
  const une = tramo(t, S_(28.33), S_(29.2)); if (une > 0) for (let i = 0; i < 12; i++) { if (!PAT[i]) continue; const xa = x0 + i * cw + 4, xb = xa + (i === 9 ? 3 : 0); for (let y = fila1 + 7; y < fila1 + 7 + (fila2 - fila1 - 14) * une; y += 3) R.pset(Math.round(lerp(xa, xb, (y - fila1) / (fila2 - fila1))), y, hex('#ffe8a0')); }
  // la lanzadera va y viene por la urdimbre
  const ph = ((t - P6) / 1.2) % 1, ida = Math.floor((t - P6) / 1.2) % 2 === 0, sx = Math.round(ida ? lerp(232, 86, ph) : lerp(86, 232, ph)); if (teje < 1) { rp(sx - 6, alto2 + 1, sx + 6, alto2 + 4, K); rp(sx - 5, alto2 + 2, sx + 5, alto2 + 3, hex('#a87a4a')); }
  // la tejedora sigue la lanzadera con la mano; en «repeat» señala la fila de arriba
  const tx = 250, m = R.actor(EL.romana, tx, 166, t, { dir: -1, sostiene: teje < 1 ? [cl(sx + 8, 226, 246), alto2 + 4] : undefined, dedo: une > 0 && t < S_(29.8), sonrisa: t > S_(29.0) });
  // el gato juega con el ovillo que rueda
  const gv = (t - P6) * 0.6, gx = Math.round(60 + Math.sin(gv * 2) * 14); R.disco(gx + 10, 170, 3, K); R.disco(gx + 10, 170, 2, hex('#d84a4a')); T.gato(R, gx, 176, t, { dir: Math.cos(gv * 2) > 0 ? 1 : -1 });
};

// 7 · Babilonia: el astrónomo apunta eclipses en la tablilla y mira el cielo
const p7 = (t) => {
  const g = T.antigua(R, t, { encuadre: 'reloj', camara: 'tablillas', apunta: tramo(t, S_(31.4), S_(34.0)) });
  const w = tramo(t, P7 + 0.1, S_(31.3)), bx = Math.round(lerp(96, 172, w)), mira = t > S_(33.8);
  const [tx, ty] = g.tablilla ?? [206, 128];
  const m = R.actor(EL.babilonioAK, bx, 160, t, { dir: 1, anda: w > 0 && w < 1, sostiene: w >= 1 && !mira ? [tx - 8 + Math.round(Math.sin(t * 5) * 3), ty - 2 + Math.round(Math.cos(t * 4) * 3)] : undefined, dedo: mira, sonrisa: mira });
  if (w >= 1 && !mira) R.linea(m.mano[0], m.mano[1], m.mano[0] + 4, m.mano[1] - 4, hex('#c8a060'));
  T.antiguaDelante(R, t, { encuadre: 'reloj', camara: 'tablillas' });
};

const efectos = [[M_(1.2), 'papel'], [M_(3.7), 'tic'], [M_(4.4), 'tic'], [M_(4.1), 'brillo'], [P2 + 0.4, 'maquina'], [M_(8.0), 'tic'], [M_(9.7), 'brillo'],
  [P3 + 0.3, 'viento'], [M_(12.8), 'pop'], [M_(14.0), 'brillo'], [M_(15.2), 'papel'], [P4 + 0.2, 'maquina'], [S_(18.4), 'tic'], [S_(18.9), 'tic'], [S_(19.8), 'golpecito'],
  [P5 + 0.2, 'viento'], [S_(22.3), 'lapiz'], [S_(23.0), 'lapiz'], [S_(23.8), 'brillo'], [P6 + 0.02, 'brillo'], [S_(26.3), 'toc'], [S_(27.5), 'toc'], [S_(28.4), 'brillo'],
  [P7 + 0.3, 'viento'], [S_(31.6), 'lapiz'], [S_(32.6), 'lapiz'], [S_(33.9), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6, 'corte'], [P7, p7]], { efectos, año: null });
''')

# ───────────────────────────────────────────── AK-QUIEN ─────────────────────────────────────────────
E['ak-quien'] = ('Quién la hizo', '''// AK-QUIEN (frases 24–26), Grecia antigua, sin año ni cartela. Diez planos:
// 1. (0 → «which points») fondo local: un fragmento de bronce con los nombres de los meses (garabatos) sobre una mesa
//    con fieltro; «?» en «who built it»; los garabatos se encienden en «names of the months» y en «Corinthian» una mano
//    deja al lado una moneda de Corinto con su caballo alado.
// 2. («which points» → «Other researchers») antigua olimpia camara 'mapa' (2.ª vez; la otra en ak-buzos): la mano con el
//    puntero va de Corinto a Siracusa; se enciende Corinto; la línea de puntos de las colonias; Siracusa en «Syracuse»,
//    la esferita de Arquímedes en «Archimedes' city» y el noroeste de Grecia en «Northwestern Greece».
// 3. («Other researchers» → frase 25) antigua taller general, luz de tarde (2.ª vez; la otra en ak-luna): el artesano
//    lima una rueda en el banco; en «astronomy» entra un astrónomo con su rollo y se lo enseña; por la ventana, el
//    puerto de Rodas.
// 4. (frase 25 → «by Archimedes») fondo local: el estudio de Cicerón (paredes rojas pintadas, rollos en su armario,
//    mosaico); Cicerón escribe en la tablilla de cera y en «two machines» le sale un bocadillo con dos esferas.
// 5. («by Archimedes» → «The other») fondo local: un patio de Siracusa junto a las murallas y el mar; Arquímedes junto a
//    su esfera; en «Roman general» entran el general y un soldado y en «took it home» se la llevan (sin violencia).
// 6. («The other» → «What does seem clear» −2 s) fondo local: la terraza de una escuela de Rodas sobre el puerto;
//    Posidonio enseña su esfera a dos alumnos; en «tempting» una línea de puntos va de su esfera a nuestra caja con «?»;
//    en «no proof» la línea se rompe con una «X».
// 7. (→ «Gears») fondo local: la tienda del artesano vista desde la calle, con varias cajas como la nuestra en los
//    estantes; en «wasn't the only one» brillan una a una y el artesano le da una a una clienta.
// 8. («Gears» → «But no other») fondo local: el banco visto desde arriba con cinco ruedas de prueba, de la más torpe a la
//    perfecta; se encienden una a una; en «practice» la mano con la lima termina la última y brilla.
// 9. («But no other» → «this one») fondo local: la fundición: el fundidor vuelca un cesto de bronce viejo en el crisol en
//    «melted down» (salta una ruedecita) y en «new things» sale un caldero nuevo del molde.
// 10. («this one» → fin) fondo naufragio general (2.ª vez; la otra en ak-buzos), luz tranquila: nuestra caja medio
//    enterrada en la arena; en «survived» la encuentra un rayo de luz; un pez la curiosea y un cangrejo pasa.''', PRE + r'''
const C_ = (s) => en('corinto', (s - 0.9) / 15.304), Ci_ = (s) => en('ciceron', (s - 18.391) / 14.878), U_ = (s) => en('unica', (s - 35.698) / 15.264);
const P2 = C_(4.83), P3 = C_(11.82), P4 = Ci_(17.9), P5 = Ci_(22.19), P6 = Ci_(26.71), P7 = Ci_(33.4), P8 = U_(38.31), P9 = U_(43.72), P10 = U_(48.43);
// la moneda de Corinto: el caballo alado en plata
const PEG = ['..#...##.', '.##..###.', '.#######.', '..######.', '.#######.', '#.##..#..', '#..#..#..'];
const moneda = (x, y) => { x = Math.round(x); y = Math.round(y); R.disco(x, y, 10, K); R.disco(x, y, 9, hex('#b8bcc4')); R.disco(x - 2, y - 2, 6, hex('#d8dce4')); R.anillo(x + 0.5, y + 0.5, 8, hex('#8a8e98'));
  for (let j = 0; j < PEG.length; j++) for (let i = 0; i < PEG[j].length; i++) if (PEG[j][i] === '#') R.pset(x - 4 + i, y - 3 + j, hex('#5a5e68')); R.pset(x - 6, y - 6, BL); };
// la caja de la máquina, pequeña (para insertos): x, y = centro de abajo
const cajita = (x, y, s = 1, brillo = 0) => { x = Math.round(x); y = Math.round(y); const w = Math.round(14 * s), h = Math.round(11 * s);
  rp(x - w, y - h * 2, x + w, y, K); tablas(x - w + 1, y - h * 2 + 1, x + w - 1, y - 1, 4, hex('#7a4a2a'), hex('#4e2e18'), hex('#a8703e'), x);
  R.disco(x - Math.round(2 * s), y - h, Math.round(7 * s), K); R.disco(x - Math.round(2 * s), y - h, Math.round(6 * s), mez(BR.b, BR.o, brillo)); R.anillo(x - Math.round(2 * s) + 0.5, y - h + 0.5, Math.round(4 * s), BR.bS);
  R.linea(x - Math.round(2 * s), y - h, x - Math.round(2 * s) + Math.round(4 * s), y - h - Math.round(3 * s), K); R.linea(x + w, y - h, x + w + Math.round(4 * s), y - h, BR.b); R.disco(x + w + Math.round(4 * s), y - h, Math.max(1, s * 1.4), BR.bL); };
// esfera armilar de bronce en su pie (los anillos giran)
const armilar = (x, y, r, t, k = 0) => { x = Math.round(x); y = Math.round(y);
  R.linea(x, y + r, x, y + r + 8, K); R.linea(x - 6, y + r + 9, x + 6, y + r + 9, K); rp(x - 5, y + r + 8, x + 5, y + r + 10, BR.b); R.linea(x + 1, y + r, x + 1, y + r + 8, BR.bL);
  R.disco(x, y, r * 0.35, hex('#4a7ab0')); R.disco(x - 1, y - 1, r * 0.2, hex('#7aaad8'));
  for (let i = 0; i < 3; i++) { const a = t * (0.6 + i * 0.3) + i * 1.1 + k; for (let q = 0; q < 64; q++) { const th = q / 64 * 2 * Math.PI, px = Math.cos(th) * r * Math.abs(Math.cos(a)), py = Math.sin(th) * r; const cx = i === 2 ? Math.cos(th) * r : px, cy = i === 2 ? Math.sin(th) * r * 0.35 : py;
    R.pset(Math.round(x + cx), Math.round(y + cy), i === 2 ? BR.o : (q % 8 < 2 ? BR.bL : BR.b)); } }
  R.anillo(x + 0.5, y + 0.5, r, BR.bS); R.pset(x, y - r - 1, BR.o); };

// 1 · el fragmento con los meses, el «?» y la moneda de Corinto
const FRAG = [[96, 48], [150, 36], [206, 44], [222, 70], [214, 116], [188, 138], [130, 142], [100, 120], [86, 84]];
const dentroF = (x, y) => { let c = false; for (let i = 0, j = FRAG.length - 1; i < FRAG.length; j = i++) { const [xi, yi] = FRAG[i], [xj, yj] = FRAG[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const mesa1 = () => capa('mesa1', () => {
  tablas(0, 0, 319, 179, 11, hex('#7a4e2c'), hex('#4e2e16'), hex('#a8743e'), 71);
  // el fieltro azul y su borde
  rp(60, 22, 262, 162, K); rp(61, 23, 261, 161, hex('#2a3a5a')); for (let y = 24; y < 161; y++) for (let x = 62; x < 261; x++) if (H_(x, y, 72) > 0.86) R.pset(x, y, hex('#34466a'));
  // la sombra y el fragmento de bronce con su madera negra pegada
  R.poligono(FRAG.map(([x, y]) => [x + 4, y + 5]), hex('#141c2c'));
  bronce(84, 34, 224, 144, dentroF, 73);
  for (let y = 34; y < 145; y++) for (let x = 84; x < 225; x++) if (dentroF(x, y) && (x < 100 + Math.sin(y * 0.2) * 4)) R.pset(x, y, H_(x, y, 74) > 0.7 ? hex('#3a2a1e') : hex('#22160e'));
  for (let i = 0; i < FRAG.length; i++) { const [x0, y0] = FRAG[i], [x1, y1] = FRAG[(i + 1) % FRAG.length]; R.linea(x0, y0, x1, y1, K); R.linea(x0, y0 + 1, x1, y1 + 1, i < 3 ? BR.vLL : BR.vS); }
  // las herramientas: pinzas, pincel, regla y un cuenco de barro; la lucerna
  R.linea(30, 120, 52, 150, hex('#a8acb4')); R.linea(32, 119, 54, 149, hex('#d8dce4'));
  R.linea(270, 40, 300, 30, hex('#6a4a2a')); rp(298, 26, 306, 32, hex('#3a2a1a'));
  rp(232, 150, 316, 158, K); rp(233, 151, 315, 157, hex('#d8c498')); for (let x = 236; x < 315; x += 4) R.linea(x, 151, x, x % 8 ? 153 : 155, hex('#6a5a3a'));
  R.disco(28, 46, 10, K); R.disco(28, 46, 9, hex('#a8603a')); R.disco(28, 46, 6, hex('#5a2e1a')); R.pset(24, 41, hex('#c8805a'));
  calma(hex('#7a4e2c'));
});
const p1 = (t) => {
  mesa1();
  const [lx, ly] = lucerna(36, 168, t); halo(lx, ly, 60, hex('#ffd890'), 0.22);
  // los renglones de garabatos (los meses): se encienden uno a uno en «names of the months»
  const luz = tramo(t, C_(2.2), C_(3.4));
  for (let r = 0; r < 8; r++) { const y = 54 + r * 10, on = cl(luz * 9 - r, 0, 1); garab(112, y, 206, y + 4, on > 0 ? mez(hex('#26402e'), hex('#ffe8a0'), on) : hex('#26402e'), r * 7 + 3, 6); }
  // «?» en «who built it»
  const q = tramo(t, C_(1.2), C_(1.45)) - tramo(t, C_(3.6), C_(3.9)); if (q > 0) globo(246, 40 - Math.round(q * 3), '?');
  // la mano deja la moneda de Corinto en «Corinthian»
  const v = tramo(t, C_(3.0), C_(3.9)), w = tramo(t, C_(4.1), P2 + 0.3), mx = Math.round(lerp(336, 276, v) + w * 60), my = Math.round(lerp(176, 140, v) + w * 40);
  if (v >= 1) moneda(272, 140); if (v > 0 && w < 1) { if (v < 1) moneda(mx - 4, my); T.brazo(R, mx + 28, 204, mx, my, '#6a4a8a', -1, { codo: [mx + 24, my + 26] }); }
  if (v >= 1 && t < C_(4.6)) { const r = Math.round(12 + (t - C_(3.9)) * 8); R.anillo(272.5, 140.5, r, hex('#ffe8a0')); }
};

// 2 · el mapa: Corinto, sus colonias, Siracusa (la de Arquímedes) y el noroeste de Grecia
const p2 = (t) => {
  const marca = ['corinto']; if (t > C_(7.29)) marca.push('siracusa');
  const g = T.antigua(R, t, { encuadre: 'olimpia', camara: 'mapa', marca });
  const co = g.corinto ?? [169, 75], si = g.siracusa ?? [90, 84], nw = [144, 61];
  R.recorte([12, 9, 307, 170]);
  // la línea de puntos de las colonias de Corinto
  const lin = tramo(t, C_(5.65), C_(7.2)); for (let k = 0; k < 40 * lin; k++) { const u = k / 40, x = lerp(co[0], si[0], u), y = lerp(co[1], si[1], u) - Math.sin(u * Math.PI) * 12; if (k % 2 === 0) R.disco(x, y, 1, hex('#c83a2a')); }
  const lin2 = tramo(t, C_(10.0), C_(10.9)); for (let k = 0; k < 12 * lin2; k++) { const u = k / 12; if (k % 2 === 0) R.disco(lerp(co[0], nw[0], u), lerp(co[1], nw[1], u), 1, hex('#c83a2a')); }
  // la esferita de Arquímedes junto a Siracusa
  const ar = tramo(t, C_(8.75), C_(9.1)); if (ar > 0) { armilar(si[0] - 14, si[1] - 16, 6 * ar + 0.5, t); }
  // el noroeste de Grecia
  if (t > C_(10.13)) { const r = 4 + Math.sin(t * 6) * 1.5; R.anillo(nw[0] + 0.5, nw[1] + 0.5, r + 2, K); R.anillo(nw[0] + 0.5, nw[1] + 0.5, r, hex('#d83a2a')); R.disco(nw[0], nw[1], 1.5, hex('#d83a2a')); }
  R.recorte(null);
  // la mano con el puntero de caña: Corinto → Siracusa → noroeste
  const a = tramo(t, C_(6.4), C_(7.3)), b = tramo(t, C_(9.6), C_(10.2)), tx = lerp(lerp(co[0], si[0], a), nw[0], b), ty = lerp(lerp(co[1], si[1], a), nw[1], b), hx = Math.round(tx + 40), hy = 150;
  R.linea(hx + 4, hy - 4, tx + 2, ty + 3, K); R.linea(hx + 5, hy - 4, tx + 3, ty + 3, hex('#c8a060')); T.brazo(R, hx + 34, 206, hx, hy, '#6a4a8a', -1, { codo: [hx + 28, hy + 26] });
  T.antiguaDelante(R, t, { encuadre: 'olimpia', camara: 'mapa' });
};

// 3 · el taller de Rodas por la tarde: lima la rueda; llega el astrónomo
const p3 = (t) => {
  T.antigua(R, t, { encuadre: 'taller', luz: 'tarde' });
  const lima = t < C_(14.9), ax = 212, gira = t > C_(15.0);
  const m = R.actor(EL.artesanoAK, ax, 160, t, { dir: gira ? -1 : 1, sostiene: lima ? [ax + 22 + Math.round(Math.sin(t * 9) * 3), 126] : undefined, sonrisa: t > C_(15.6), habla: t > C_(15.8) && bla(t) });
  if (lima) { const [hx, hy] = m.mano; R.linea(hx, hy, hx + 8, hy - 2, K); R.linea(hx, hy - 1, hx + 8, hy - 3, hex('#9aa0a8')); for (let k = 0; k < 4; k++) { const ph = (t * 3 + k / 4) % 1; R.pset(hx + 9 + Math.round(ph * 6), hy - 3 + Math.round(ph * 10) - k, hex('#ffd890')); } }
  // el astrónomo entra con su rollo y se lo enseña
  const v = tramo(t, C_(14.3), C_(15.6)), sx = Math.round(lerp(-20, 150, v)), s = R.actor(EL.romanoPileo, sx, 160, t, { dir: 1, anda: v > 0 && v < 1, sostiene: v > 0 ? [sx + 16, 140] : undefined, habla: v >= 1 && t < C_(16.6) && bla(t, 8), sonrisa: t > C_(16.6) });
  if (v > 0) { const [rx, ry] = s.mano; rp(rx - 2, ry - 7, rx + 2, ry + 3, K); rp(rx - 1, ry - 6, rx + 1, ry + 2, hex('#f0e4c8')); R.pset(rx, ry - 7, hex('#a88a5a')); if (v >= 1) { rp(rx + 3, ry - 6, rx + 18, ry + 2, K); rp(rx + 4, ry - 5, rx + 17, ry + 1, hex('#f0e4c8')); R.anillo(rx + 10.5, ry - 1.5, 3, hex('#6a5a3a')); } }
  T.antiguaDelante(R, t, { encuadre: 'taller', luz: 'tarde' });
};

// 4 · el estudio de Cicerón: escribe y le salen dos máquinas
const estudio4 = () => capa('estudio4', () => {
  // paredes pintadas: paneles rojos con marcos negros y columnitas, zócalo negro
  rp(0, 0, 319, 128, hex('#9a2a22')); for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) if (H_(x >> 1, y >> 1, 81) > 0.9) R.pset(x, y, hex('#8a2420'));
  for (const [x0, x1] of [[10, 86], [104, 200], [218, 300]]) { rp(x0, 18, x1, 104, hex('#c8a040')); rp(x0 + 2, 20, x1 - 2, 102, hex('#a82e24')); rp(x0 + 4, 22, x1 - 4, 100, hex('#b8352a')); }
  // la viñeta pintada del panel del centro: una marina con una villa, y candelabros pintados a los lados
  rp(126, 26, 178, 60, hex('#c8a040')); degr(128, 28, 176, 44, [hex('#9ac8e0'), hex('#c8e0e8')]); degr(128, 45, 176, 58, [hex('#3a7aa8'), hex('#2a5a88')]);
  rp(150, 36, 166, 46, hex('#f0e8d8')); R.poligono([[148, 36], [158, 30], [168, 36]], hex('#b8603a')); for (let i = 0; i < 4; i++) rp(151 + i * 4, 40, 151 + i * 4, 46, hex('#c8bca8')); R.disco(136, 42, 5, hex('#4a7a4a')); R.linea(136, 44, 136, 50, hex('#5a3a22'));
  R.linea(140, 52, 146, 52, hex('#f0e8d8')); R.poligono([[141, 51], [143, 46], [145, 51]], hex('#f0e8d8'));
  for (const x of [114, 190]) { R.linea(x, 24, x, 96, hex('#e0c060')); for (let y = 30; y < 96; y += 12) { R.linea(x - 3, y, x + 3, y, hex('#e0c060')); R.pset(x - 3, y - 1, hex('#e0c060')); R.pset(x + 3, y - 1, hex('#e0c060')); } R.disco(x, 22, 2, hex('#e0c060')); }
  for (const x of [20, 76]) { R.linea(x, 24, x, 96, hex('#e0c060')); for (let y = 34; y < 96; y += 14) R.disco(x, y, 1.5, hex('#e0c060')); }
  for (let x = 108; x < 198; x += 10) { R.disco(x, 84, 2, hex('#3a6a3a')); R.pset(x, 82, hex('#e8c060')); }
  for (const x of [95, 209, 309]) { rp(x - 2, 10, x + 2, 110, hex('#e8d8a8')); R.linea(x - 2, 10, x - 2, 110, hex('#fff4d0')); R.linea(x + 2, 10, x + 2, 110, hex('#a89868')); }
  rp(0, 0, 319, 8, hex('#2a1a14')); for (let x = 0; x < 320; x += 6) { R.pset(x, 3, hex('#c8a040')); R.pset(x + 3, 5, hex('#c8a040')); }
  // guirnalda pintada
  for (let x = 12; x < 300; x++) { const y = 14 + Math.round(Math.abs(Math.sin(x * 0.06)) * 6); R.pset(x, y, hex('#3a6a3a')); if (x % 5 === 0) R.pset(x, y + 1, hex('#5a8a4a')); }
  rp(0, 106, 319, 128, hex('#1e1614')); R.linea(0, 106, 319, 106, hex('#c8a040')); for (let x = 8; x < 320; x += 24) { R.linea(x, 110, x + 10, 124, hex('#3a2e28')); R.linea(x + 10, 110, x, 124, hex('#3a2e28')); }
  // el armario de los rollos (a la derecha)
  rp(222, 52, 262, 104, K); rp(223, 53, 261, 103, hex('#6a4428')); for (let r = 0; r < 3; r++) { rp(225, 55 + r * 16, 259, 56 + r * 16, hex('#4a2e18')); for (let i = 0; i < 4; i++) { const x = 229 + i * 8, y = 63 + r * 16; R.disco(x, y, 3.5, K); R.disco(x, y, 3, H_(i, r, 82) > 0.5 ? hex('#f0e4c8') : hex('#d8c498')); R.pset(x, y, hex('#8a6a3a')); if (H_(i, r, 83) > 0.6) R.pset(x, y + 4, hex('#c83a2a')); } }
  // el busto de mármol sobre su pedestal (sin cara: de espaldas a la luz)
  rp(30, 64, 50, 104, hex('#d8d0c4')); R.linea(30, 64, 50, 64, hex('#f4f0e8')); rp(28, 60, 52, 64, hex('#c8c0b4')); R.disco(40, 46, 9, hex('#c8c0b4')); R.disco(40, 40, 7, hex('#e0dace')); R.disco(38, 38, 4, hex('#f0ece4'));
  // el suelo de mosaico blanco y negro
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (y - 128) / 52, cx = Math.floor((x - 160) / (4 + u * 4)), cy = Math.floor((y - 128) / (2 + u * 3)), borde = y < 132 || y > 174; const ola = ((x >> 2) + (y >> 1)) % 6 < 2; R.pset(x, y, borde ? (ola ? hex('#9a2a22') : hex('#2a2220')) : (cx + cy) % 2 === 0 ? hex('#e8e0d0') : (cx * 3 + cy) % 7 === 0 ? hex('#b86a5a') : hex('#c8bcac')); }
  // la mesa de escribir con tintero, rollos y tablillas
  rp(118, 128, 196, 134, K); rp(119, 129, 195, 133, hex('#8a5a34')); R.linea(119, 129, 195, 129, hex('#b07a4a')); rp(124, 134, 128, 160, hex('#5a3a22')); rp(186, 134, 190, 160, hex('#5a3a22'));
  for (let i = 0; i < 3; i++) { rp(150 + i * 10, 122, 158 + i * 10, 128, K); rp(151 + i * 10, 123, 157 + i * 10, 127, hex('#e8dcb8')); } R.disco(134, 125, 3, K); R.disco(134, 125, 2, hex('#3a2a6a'));
  calma(hex('#9a2a22'));
});
const p4 = (t) => {
  estudio4();
  const [lx, ly] = lucerna(178, 128, t); halo(lx, ly, 50, hex('#ffd890'), 0.25);
  // un brasero que brilla
  rp(268, 150, 290, 156, K); rp(269, 151, 289, 155, hex('#6a6a70')); for (let k = 0; k < 8; k++) R.pset(270 + k * 2, 149 - (Math.sin(t * 9 + k) > 0 ? 1 : 0), k % 2 ? hex('#ff8a2a') : hex('#ffd860')); R.linea(272, 156, 268, 166, K); R.linea(286, 156, 290, 166, K);
  // Cicerón escribe en la tablilla de cera; en «two machines» le sale el bocadillo con las dos esferas
  const dos = t > Ci_(19.81), cx = 90, escribe = t < Ci_(19.5) || t > Ci_(21.0);
  const m = R.actor(EL.ciceronAK, cx, 166, t, { dir: 1, sostiene: escribe ? [cx + 17, 144] : undefined, dedo: !escribe, habla: t > Ci_(19.0) && t < Ci_(21.0) && bla(t), sonrisa: dos });
  if (escribe) { const [hx, hy] = m.mano; rp(hx - 1, hy - 6, hx + 9, hy + 1, K); rp(hx, hy - 5, hx + 8, hy, hex('#7a5a2a')); rp(hx + 1, hy - 4, hx + 7, hy - 1, hex('#3a2e1a')); const sx = hx + 2 + Math.round(((t * 3) % 1) * 5); R.linea(sx, hy - 3, sx + 3, hy - 9, hex('#c8c8c8')); R.pset(sx, hy - 2, hex('#e8dcc0')); }
  const b = tramo(t, Ci_(19.81), Ci_(20.2)); if (b > 0) { const bx = 148, by = 56; R.disco(bx - 26, by, 18 * b, K); R.disco(bx + 14, by - 2, 22 * b, K); R.disco(bx - 26, by, 17 * b, BL); R.disco(bx + 14, by - 2, 21 * b, BL);
    for (const [px, py] of [[118, 86], [112, 96]]) { R.disco(px, py, 3 * b, K); R.disco(px, py, 2 * b, BL); }
    if (b > 0.9) { armilar(bx - 26, by - 4, 10, t, 0); armilar(bx + 14, by - 6, 12, t, 2); } }
  T.gato(R, 210, 176, t, { dir: -1 });
};

// 5 · Siracusa: la esfera de Arquímedes y el general que se la lleva
const patio5 = () => capa('patio5', () => {
  degr(0, 0, 319, 84, [hex('#5a9ad8'), hex('#7ab2e4'), hex('#9cc8ec'), hex('#c8e0f0')]);
  // el mar con barcos de vela roja a lo lejos
  degr(0, 78, 319, 104, [hex('#3a7ab0'), hex('#4a8ac0'), hex('#5a9acc')]);
  for (let k = 0; k < 30; k++) { const x = Math.round(H_(k, 1, 91) * 320), y = 82 + Math.round(H_(k, 2, 91) * 20); R.linea(x, y, x + 4, y, hex('#8ac0e8')); }
  // la muralla con sus torres
  for (let x = 0; x < 320; x++) for (let y = 92; y < 120; y++) R.pset(x, y, ((y - 92) % 6 === 0 || (x + ((y - 92) / 6 | 0) * 7) % 14 === 0) ? hex('#9a8a6a') : H_(x >> 1, y, 92) > 0.85 ? hex('#d8c8a0') : hex('#c4b48c'));
  for (let x = 0; x < 320; x += 10) rp(x, 88, x + 5, 92, hex('#c4b48c'));
  for (const tx of [20, 236]) { sillares(tx, 62, tx + 34, 120, 6, 12, hex('#c4b48c'), hex('#9a8a6a'), hex('#d8c8a0'), tx); for (let x = tx; x < tx + 34; x += 8) rp(x, 56, x + 4, 62, hex('#c4b48c')); rp(tx + 14, 76, tx + 19, 86, K); }
  // el patio: losas, una columnata a la izquierda y una higuera
  losas(0, 120, 319, 179, hex('#d4c6a6'), hex('#a8987a'), hex('#ece0c4'), 9);
  // un pórtico a la izquierda, delante de la muralla
  rp(0, 96, 84, 102, hex('#d8ceba')); R.linea(0, 96, 84, 96, hex('#f4ecdc')); tejas(0, 90, 86, 95, hex('#b8603a'), hex('#7a3a22'), hex('#d8805a'));
  estuco(0, 103, 84, 150, hex('#c8a880'), hex('#a88a62'), hex('#dcc098'), 6); rp(10, 118, 26, 150, hex('#4a3a2a')); rp(56, 116, 74, 140, hex('#6a4428')); for (let y = 118; y < 140; y += 4) R.linea(57, y, 73, y, hex('#4a2e18'));
  for (let i = 0; i < 6; i++) columna(6 + i * 15, 103, 152, 6, hex('#e4dccc'), hex('#a89c88'), hex('#f8f4ea'));
  // la higuera a la derecha y unas ánforas apoyadas
  R.linea(300, 150, 296, 112, hex('#5a4030')); R.linea(301, 150, 297, 112, hex('#7a5a40')); R.linea(298, 124, 284, 110, hex('#5a4030'));
  for (let i = 0; i < 14; i++) { const a = i * 0.45, x = 294 + Math.cos(a) * 18, y = 104 + Math.sin(a) * 9; R.disco(x, y + 1, 6, hex('#2e5a2e')); R.disco(x - 1, y - 1, 4, hex('#4a8a3e')); R.pset(Math.round(x - 2), Math.round(y - 3), hex('#7ab85a')); }
  for (const [x, y] of [[196, 150], [206, 152], [186, 154]]) { R.disco(x, y - 6, 5, K); R.disco(x, y - 6, 4, hex('#b8603a')); rp(x - 1, y - 14, x + 1, y - 10, hex('#b8603a')); R.pset(x - 2, y - 8, hex('#d8805a')); }
  // el pozo de piedra
  rp(100, 132, 124, 146, hex('#a89878')); R.linea(100, 132, 124, 132, hex('#d8c8a8')); rp(103, 116, 105, 132, hex('#6a4428')); rp(119, 116, 121, 132, hex('#6a4428')); R.linea(103, 116, 121, 116, hex('#6a4428')); R.linea(112, 117, 112, 126, hex('#c8b090')); rp(109, 126, 115, 130, hex('#8a6a44'));
  // la caja de arena con los círculos de Arquímedes
  rp(214, 150, 300, 170, K); rp(215, 151, 299, 169, hex('#6a4a2a')); rp(218, 154, 296, 166, hex('#e8d4a0'));
  for (const [x, y, r] of [[236, 160, 5], [256, 160, 4], [276, 159, 5], [246, 160, 9]]) R.anillo(x + 0.5, y + 0.5, r, hex('#a88a5a')); R.linea(222, 164, 292, 156, hex('#a88a5a'));
  calma(hex('#5a9ad8'));
});
const p5 = (t) => {
  patio5();
  nubes(t, [[10, 26, 30, 2], [130, 38, 24, 3.5], [220, 56, 16, 5]], hex('#a8bcd0'), hex('#e8eef4'), BL);
  for (let k = 0; k < 3; k++) { const x = ((t * (3 + k) + k * 110) % 360) - 20, y = 84 + k * 4; R.linea(x, y, x + 8, y, hex('#5a3a22')); R.poligono([[x + 2, y - 1], [x + 4, y - 10], [x + 7, y - 1]], hex('#c83a2a')); }
  for (let k = 0; k < 2; k++) ave(((t * 16 + k * 90) % 360) - 20, 40 + k * 6, t, hex('#3a3a4a'), k);
  // la esfera en su trípode; el soldado la levanta en «took it home» y se la lleva
  const coge = Ci_(24.13), lleva = tramo(t, coge + 0.4, P6 + 0.3), solx = Math.round(lerp(lerp(330, 170, tramo(t, Ci_(23.5), coge)), 340, lleva));
  if (t < coge) { R.linea(150, 164, 142, 176, K); R.linea(150, 164, 158, 176, K); R.linea(150, 164, 150, 176, K); armilar(150, 150, 11, t, 1); }
  else { R.linea(150, 164, 142, 176, K); R.linea(150, 164, 158, 176, K); R.linea(150, 164, 150, 176, K); }
  // el general entra delante y señala; el soldado detrás
  const gv = tramo(t, Ci_(23.4), Ci_(24.0)), gx = Math.round(lerp(lerp(340, 200, gv), 350, lleva));
  const s = R.actor(EL.legionario, solx, 172, t, { dir: lleva > 0 ? 1 : -1, anda: (t > Ci_(23.5) && t < coge) || (lleva > 0 && lleva < 1), sostiene: t > coge ? true : undefined });
  if (t > coge) armilar(s.mano[0] + (lleva > 0 ? 3 : -3), s.mano[1] - 12, 9, t, 1);
  R.actor(EL.generalAK, gx, 174, t, { dir: lleva > 0 ? 1 : -1, anda: (gv > 0 && gv < 1) || (lleva > 0 && lleva < 1), dedo: gv >= 1 && t < coge + 0.3, habla: gv >= 1 && t < coge && bla(t) });
  // Arquímedes junto a su esfera: la explica, se sorprende y mira cómo se va
  R.actor(EL.arquimedesAK, 110, 170, t, { dir: 1, dedo: t > P5 + 0.2 && t < Ci_(23.4), habla: t < Ci_(23.4) && bla(t), sorpresa: t > Ci_(23.8) && t < Ci_(25.2), triste: t > Ci_(25.2) });
};

// 6 · Rodas: Posidonio enseña su esfera; ¿la nuestra? sin pruebas
const terraza6 = () => capa('terraza6', () => {
  degr(0, 0, 319, 92, [hex('#5a9ad8'), hex('#78b0e2'), hex('#98c6ea'), hex('#cce2ee')]);
  // la isla al fondo, el puerto con su muelle y barcos
  for (let x = 0; x < 320; x++) { const h = 76 + Math.sin(x * 0.04 + 1) * 6 + Math.sin(x * 0.13) * 2; for (let y = Math.round(h); y < 92; y++) R.pset(x, y, H_(x >> 1, y, 93) > 0.8 ? hex('#7a9a74') : hex('#8aaa80')); }
  degr(0, 92, 319, 124, [hex('#3a7ab0'), hex('#4a8ac0'), hex('#5a9acc')]);
  rp(200, 100, 319, 104, hex('#c4b48c')); R.linea(200, 100, 319, 100, hex('#e0d0a8')); for (let x = 204; x < 320; x += 12) R.pset(x, 102, hex('#9a8a6a'));
  for (let i = 0; i < 6; i++) { const x = 206 + i * 16; estuco(x, 86, x + 12, 99, hex('#ece4d2'), hex('#c8bca4'), hex('#fffaf0'), i); tejas(x - 1, 82, x + 13, 85, hex('#b8603a'), hex('#7a3a22'), hex('#d8805a')); }
  // la terraza: balaustrada, dos columnas y el suelo
  rp(0, 124, 319, 132, hex('#e0d6c4')); R.linea(0, 124, 319, 124, hex('#f8f4ea')); for (let x = 4; x < 320; x += 8) rp(x, 132, x + 3, 146, hex('#d0c4b0'));
  rp(0, 146, 319, 150, hex('#c8bca8'));
  losas(0, 150, 319, 179, hex('#d8ccb4'), hex('#a8987c'), hex('#f0e6d0'), 6);
  columna(12, 20, 150, 12, hex('#e8e0d0'), hex('#a89c88'), hex('#fbf8f0')); columna(196, 20, 150, 10, hex('#e8e0d0'), hex('#a89c88'), hex('#fbf8f0'));
  rp(0, 10, 210, 18, hex('#d8ceba')); R.linea(0, 18, 210, 18, hex('#a89c88')); for (let x = 2; x < 210; x += 6) rp(x, 12, x + 2, 16, hex('#c8bca8'));
  // la mesa de la esfera y un pizarrín con círculos
  rp(66, 140, 120, 145, K); rp(67, 141, 119, 144, hex('#8a5a34')); rp(72, 145, 75, 166, hex('#5a3a22')); rp(110, 145, 113, 166, hex('#5a3a22'));
  calma(hex('#5a9ad8'));
});
const p6 = (t) => {
  terraza6();
  nubes(t, [[40, 30, 30, 2], [170, 44, 22, 3.5], [250, 60, 16, 5]], hex('#a8bcd0'), hex('#e8eef4'), BL);
  for (let k = 0; k < 2; k++) { const x = ((t * (4 + k) + k * 140) % 360) - 20, y = 110 + k * 6; R.linea(x, y, x + 10, y, hex('#5a3a22')); R.poligono([[x + 2, y - 1], [x + 5, y - 12], [x + 9, y - 1]], hex('#f0e8d0')); }
  for (let k = 0; k < 3; k++) ave(((t * 18 + k * 70) % 360) - 20, 54 + k * 5, t, BL, k);
  armilar(93, 124, 14, t, 2);
  // Posidonio la enseña; dos alumnos atienden
  const nombre = t > Ci_(27.69), duda = t > Ci_(30.31), roto = t > Ci_(32.55);
  R.actor(EL.posidonioAK, 124, 170, t, { dir: -1, dedo: nombre && t < Ci_(29.6), habla: t < Ci_(30.2) && bla(t), sonrisa: !roto && t > Ci_(29.6), triste: roto });
  R.actor(EL.romana, 36, 172, t, { dir: 1, sorpresa: duda && !roto, triste: roto, sonrisa: nombre && !duda });
  R.actor(EL.romanoPileo, 150, 174, t, { dir: -1, dedo: duda && !roto, habla: duda && !roto && bla(t, 6), triste: roto });
  // la línea de puntos de su esfera a nuestra caja (con «?») y se rompe en «no proof»
  const lin = tramo(t, Ci_(30.31), Ci_(31.3)), cajx = 250, cajy = 58;
  if (lin > 0) { R.disco(cajx, cajy - 10, 22, K); R.disco(cajx, cajy - 10, 21, hex('#f0e4c8')); cajita(cajx - 2, cajy, 0.9); R.icono('?', cajx + 12, cajy - 26, hex('#c83a2a'), hex('#f0e4c8'));
    for (let k = 0; k < 30 * lin; k++) { const u = k / 30, x = lerp(106, cajx - 24, u), y = lerp(112, cajy - 6, u) - Math.sin(u * Math.PI) * 18; if (roto && Math.abs(u - 0.55) < 0.12) continue; if (k % 2 === 0) R.disco(x, y, 1, hex('#ffd860')); }
    if (roto) { const r = tramo(t, Ci_(32.55), Ci_(32.8)); R.icono('X', 168, 66 - Math.round((1 - r) * 4), hex('#d83a2a'), K, 2); } }
};

// 7 · la tienda: no era la única
const tienda7 = () => capa('tienda7', () => {
  // la fachada de piedra, el toldo de rayas y el hueco de la tienda en penumbra
  sillares(0, 0, 319, 140, 7, 16, hex('#cbb894'), hex('#a08c68'), hex('#e0d0ac'), 11);
  rp(40, 34, 258, 128, K); rp(41, 35, 257, 127, hex('#3a2a1e')); for (let y = 36; y < 127; y++) for (let x = 42; x < 257; x++) if (H_(x >> 1, y >> 1, 101) > 0.9) R.pset(x, y, hex('#4a3626'));
  for (let x = 30; x < 268; x++) for (let y = 18; y < 32; y++) { const b = Math.floor((x - 30) / 10) % 2; R.pset(x, y, y > 28 ? (b ? hex('#a83a2a') : hex('#e8dcc0')) : b ? hex('#c84a3a') : hex('#f4ecd8')); } for (let x = 30; x < 268; x += 10) R.poligono([[x, 32], [x + 5, 36], [x + 10, 32]], Math.floor((x - 30) / 10) % 2 ? hex('#a83a2a') : hex('#e8dcc0'));
  // los estantes con cacharros de bronce (lucernas, cuencos, una balanza)
  for (const y of [62, 94]) { rp(46, y, 252, y + 3, hex('#7a4e2c')); R.linea(46, y, 252, y, hex('#a8743e')); }
  for (let i = 0; i < 5; i++) { const x = 160 + i * 18; R.disco(x, 56, 5, K); R.disco(x, 56, 4, i % 2 ? BR.b : hex('#b8603a')); R.pset(x - 2, 54, BR.bL); }
  for (let i = 0; i < 3; i++) { const x = 180 + i * 22; rp(x - 6, 88, x + 6, 93, K); rp(x - 5, 89, x + 5, 92, BR.b); R.linea(x - 5, 89, x + 5, 89, BR.bL); }
  R.linea(236, 104, 236, 122, K); R.linea(226, 104, 246, 104, K); R.disco(226, 110, 3, BR.b); R.disco(246, 110, 3, BR.b);
  // la calle: losas, una acera y un canalillo
  rp(0, 140, 319, 144, hex('#a08c68')); losas(0, 144, 319, 179, hex('#c8b898'), hex('#9a8a6a'), hex('#e0d4b8'), 12);
  calma(hex('#cbb894'));
});
const CAJAS7 = [[62, 61], [96, 61], [130, 61], [70, 93], [118, 93]];
const p7 = (t) => {
  tienda7();
  for (let i = 0; i < CAJAS7.length; i++) { const [x, y] = CAJAS7[i], on = tramo(t, U_(36.9) + i * 0.15, U_(37.1) + i * 0.15) - tramo(t, U_(38.0) + i * 0.1, P8 + 0.3); cajita(x, y, 0.8, on); if (on > 0.5) { R.anillo(x - 1.5, y - 8.5, 14, hex('#ffe8a0')); } }
  // el artesano tras el mostrador le da una caja a la clienta
  const da = tramo(t, U_(37.0), U_(37.8)), ax = 178;
  const m = R.actor(EL.artesanoAK, ax, 133, t, { dir: 1, sostiene: da < 1 ? [ax + 18 + Math.round(da * 22), 118] : undefined, habla: t < U_(36.8) && bla(t), sonrisa: da > 0.5 });
  // el mostrador por delante
  rp(150, 128, 286, 160, K); tablas(151, 129, 285, 159, 6, hex('#8a5a34'), hex('#5e3a1e'), hex('#b07a4a'), 7); rp(150, 126, 286, 129, hex('#6a4428')); R.linea(150, 126, 286, 126, hex('#a8743e'));
  R.disco(160, 122, 4, K); R.disco(160, 122, 3, hex('#b8603a'));
  const cl7 = R.actor(EL.romana, 236, 172, t, { dir: -1, sostiene: da >= 1 ? true : undefined, sonrisa: da >= 1, habla: t < U_(36.5) && bla(t, 6) });
  if (da < 1) cajita(m.mano[0] + 4, m.mano[1] + 4, 0.7); else cajita(cl7.mano[0] - 4, cl7.mano[1] + 4, 0.7, 0.3);
  // un burro con alforjas pasa por la calle, delante
  const bu = tramo(t, P7 + 0.2, P8 + 0.3), bx = Math.round(lerp(-50, 110, bu)), pa = Math.floor(t * 6) % 2;
  rp(bx, 150, bx + 26, 162, K); rp(bx + 1, 151, bx + 25, 161, hex('#8a8a90')); rp(bx + 24, 144, bx + 34, 154, K); rp(bx + 25, 145, bx + 33, 153, hex('#9a9aa0')); R.pset(bx + 31, 147, K); rp(bx + 26, 140, bx + 27, 145, hex('#6a6a70'));
  for (const [lx, d] of [[bx + 3, pa], [bx + 9, 1 - pa], [bx + 18, pa], [bx + 23, 1 - pa]]) R.linea(lx, 162, lx + (d ? 2 : -1), 172, K);
  rp(bx + 4, 146, bx + 12, 158, hex('#c8a060')); rp(bx + 14, 146, bx + 22, 158, hex('#a8803e'));
};

// 8 · el banco visto desde arriba: cinco ruedas de prueba, de la más torpe a la perfecta
const banco8 = () => capa('banco8', () => {
  tablas(0, 0, 319, 179, 13, hex('#9a6a3e'), hex('#6a4224'), hex('#c08a54'), 111);
  // virutas, un papiro con círculos, un compás y limas
  for (let k = 0; k < 40; k++) { const x = Math.round(H_(k, 1, 112) * 320), y = 120 + Math.round(H_(k, 2, 112) * 58); R.linea(x, y, x + 3, y + 1, hex('#e0b070')); R.pset(x + 1, y + 1, hex('#c8963a')); }
  rp(192, 10, 258, 52, K); rp(193, 11, 257, 51, hex('#efe2bc')); for (const [x, y, r] of [[212, 30, 12], [238, 28, 8], [252, 38, 4]]) R.anillo(x + 0.5, y + 0.5, r, hex('#6a5a3a')); R.linea(212, 30, 238, 28, hex('#6a5a3a'));
  R.linea(20, 20, 40, 60, hex('#9aa0a8')); R.linea(40, 20, 30, 60, hex('#9aa0a8')); R.disco(30, 20, 3, BR.b);
  R.linea(8, 150, 70, 168, hex('#7a7e86')); R.linea(8, 151, 70, 169, hex('#aab0b8')); rp(0, 146, 10, 154, hex('#5a3a22'));
  // un trapo, una jarrita de aceite, un cesto de discos de bronce sin cortar y unas raspaduras de cálculo
  for (let y = 18; y < 44; y++) for (let x = 64; x < 104; x++) if (Math.abs(y - 30 - Math.sin(x * 0.2) * 4) < 9) R.pset(x, y, (x + y) % 5 === 0 ? hex('#a89070') : hex('#d8c8a8'));
  R.disco(130, 32, 9, K); R.disco(130, 32, 8, hex('#b8603a')); R.disco(128, 30, 3, hex('#d8805a')); R.disco(130, 32, 3, hex('#3a2a1a'));
  R.disco(176, 34, 14, K); R.disco(176, 34, 13, hex('#b8904a')); for (let k = 0; k < 6; k++) { const a = k * 1.05; R.disco(176 + Math.cos(a) * 6, 34 + Math.sin(a) * 6, 3.5, BR.b); R.pset(Math.round(175 + Math.cos(a) * 6), Math.round(33 + Math.sin(a) * 6), BR.bL); }
  for (let k = 0; k < 14; k++) R.linea(150 + k * 4, 150, 150 + k * 4, 155, hex('#4e2e16')); R.linea(148, 152, 206, 152, hex('#4e2e16'));
  calma(hex('#9a6a3e'));
});
const RU8 = [[52, 92, 18, 9], [104, 96, 19, 13], [158, 92, 20, 18], [212, 96, 21, 24], [266, 94, 22, 30]];
const p8 = (t) => {
  banco8();
  const [lx, ly] = lucerna(300, 172, t); halo(lx, ly, 50, hex('#ffd890'), 0.2);
  for (let i = 0; i < 5; i++) { const [x, y, r, n] = RU8[i], on = tramo(t, P8 + 0.3 + i * 0.5, P8 + 0.6 + i * 0.5), q = i / 4;
    R.disco(x + 3, y + 4, r + 2, hex('#5a3a1e'));
    const base = mez(hex('#6a5a3a'), BR.b, q); rueda(x, y, r, n, i * 0.3 + (i === 4 ? (t - P8) * 0.4 : 0), base, mez(hex('#3a2e1e'), BR.bS, q), mez(hex('#8a7a5a'), BR.bL, q), { diente: 2 + q * 2, radios: i > 1 });
    if (i === 0) { R.linea(x - 10, y - 12, x + 4, y + 2, K); R.linea(x + 4, y + 2, x + 2, y + 14, K); }
    if (i === 1) { R.disco(x + 12, y - 12, 4, hex('#9a6a3e')); }
    if (on > 0 && on < 1) R.anillo(x + 0.5, y + 0.5, r + 6, hex('#ffe8a0'));
    for (let k = 0; k <= i; k++) R.pset(x - 4 + k * 2, y + r + 9, hex('#3a2a1a')); }
  // la mano con la lima termina la última en «practice» y brilla
  const v = tramo(t, U_(41.0), U_(41.6)) - tramo(t, U_(42.9), U_(43.4)), hx = Math.round(lerp(340, 300, v) + Math.sin(t * 10) * 3 * (v >= 1 && t < U_(42.6) ? 1 : 0)), hy = 112;
  if (v > 0) { R.linea(hx - 12, hy - 2, hx - 22, hy - 12, K); R.linea(hx - 12, hy - 3, hx - 22, hy - 13, hex('#aab0b8')); T.brazo(R, 352, 140, hx, hy, '#5a6a8a', -1, { codo: [336, 120] }); }
  const g = tramo(t, U_(42.69), U_(42.9)) - tramo(t, U_(43.3), U_(43.7)); if (g > 0) { const [x, y, r] = RU8[4], s = Math.round(4 + g * 8); R.linea(x - s, y - r, x + s, y - r, BL); R.linea(x, y - r - s, x, y - r + s, BL); R.anillo(x + 0.5, y + 0.5, r + 4, hex('#fff4c0')); }
};

// 9 · la fundición: el bronce viejo al crisol y un caldero nuevo
const fundicion9 = () => capa('fundicion9', () => {
  degr(0, 0, 319, 60, [hex('#8ab4dc'), hex('#a8c8e4'), hex('#c8dcec')]);
  // las tapias del patio y un cobertizo
  sillares(0, 40, 319, 140, 6, 14, hex('#b8a888'), hex('#8a7a5e'), hex('#d0c0a0'), 21);
  rp(196, 58, 319, 62, hex('#6a4428')); tejas(190, 50, 319, 57, hex('#b8603a'), hex('#7a3a22'), hex('#d8805a')); rp(200, 62, 204, 140, hex('#5a3a22')); rp(300, 62, 304, 140, hex('#5a3a22'));
  // herramientas colgadas: tenazas, cazos, moldes
  for (let i = 0; i < 5; i++) { const x = 216 + i * 16; R.linea(x, 64, x, 82, K); R.disco(x, 84, 4, i % 2 ? hex('#4a4a50') : hex('#8a6a4a')); } for (let i = 0; i < 3; i++) { rp(222 + i * 24, 100, 238 + i * 24, 110, hex('#9a7a5a')); R.disco(230 + i * 24, 105, 4, hex('#5a4030')); }
  // el horno de barro con su boca
  R.disco(84, 110, 40, K); R.disco(84, 110, 39, hex('#a8684a')); for (let y = 70; y < 150; y++) for (let x = 44; x < 124; x++) { const c = R.pget(x, y); if (c === hex('#a8684a') && H_(x >> 1, y >> 1, 121) > 0.8) R.pset(x, y, hex('#8a5038')); }
  rp(44, 110, 124, 150, hex('#a8684a')); rp(64, 120, 104, 150, K); R.disco(84, 120, 20, K);
  rp(76, 56, 92, 72, hex('#8a5038')); R.linea(76, 56, 92, 56, hex('#c8805a'));
  // el suelo de tierra apisonada con escoria y carbón
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const v = H_(x >> 1, y >> 1, 122); R.pset(x, y, v > 0.92 ? hex('#3a3030') : v < 0.08 ? hex('#a89070') : hex('#8a7458')); }
  // la leña apilada, el fuelle de cuero y la pila de agua
  for (let r = 0; r < 4; r++) for (let i = 0; i < 6 - (r % 2); i++) { const x = 136 + i * 9 + (r % 2) * 4, y = 136 - r * 6; R.disco(x, y, 3.5, K); R.disco(x, y, 3, hex('#8a6a44')); R.disco(x, y, 1.5, hex('#c8a070')); }
  R.poligono([[124, 128], [140, 122], [140, 136]], hex('#6a4a2a')); R.linea(124, 128, 108, 134, hex('#3a2a1a'));
  rp(268, 138, 312, 152, K); rp(269, 139, 311, 151, hex('#8a8478')); rp(272, 140, 308, 144, hex('#4a7ab0')); R.linea(272, 140, 308, 140, hex('#8ac0e8'));
  calma(hex('#8ab4dc'));
});
const p9 = (t) => {
  fundicion9();
  // el humo que sale del horno y el fuego por la boca
  for (let k = 0; k < 7; k++) { const ph = (t * 0.3 + k / 7) % 1; R.disco(84 + Math.sin(ph * 5 + k) * 6 + ph * 18, 52 - ph * 50, 2 + ph * 5, mez(hex('#6a6a74'), hex('#c8ccd4'), ph)); }
  const vuelca = tramo(t, U_(46.6), U_(47.3)), funde = tramo(t, U_(47.0), U_(48.0));
  for (let y = 102; y < 150; y++) for (let x = 64; x < 104; x++) { const d = Math.hypot(x - 84, y - 120); if ((y >= 120 || d < 20) && R.pget(x, y) === K) { const f = Math.sin(x * 0.7 + t * 9) + Math.sin(y * 0.5 - t * 7); R.pset(x, y, f > 1 ? hex('#ffe070') : f > 0 ? hex('#ff9a2a') : f > -1 ? hex('#d84a1a') : hex('#5a1a10')); } }
  halo(84, 130, 60, hex('#ff9a40'), 0.25 + funde * 0.15);
  // el crisol delante de la boca, con el bronce que se funde
  rp(68, 138, 100, 152, K); rp(69, 139, 99, 151, hex('#6a6a70')); rp(71, 139, 97, 143, mez(hex('#8a6a3a'), hex('#ffd860'), funde)); if (funde > 0.3) for (let k = 0; k < 5; k++) R.pset(72 + k * 6, 139 - (Math.sin(t * 8 + k) > 0.6 ? 2 : 0), hex('#fff4c0'));
  // la pila de bronce viejo
  const pila = [[150, 168, 'cuenco'], [162, 166, 'lucerna'], [174, 170, 'casco'], [140, 172, 'rueda'], [186, 172, 'cuenco']];
  if (vuelca < 0.5) for (const [x, y, tipo] of pila) { if (tipo === 'cuenco') { R.disco(x, y, 5, K); R.disco(x, y, 4, BR.v); R.linea(x - 4, y - 2, x + 4, y - 2, BR.vL); } else if (tipo === 'lucerna') { rp(x - 4, y - 2, x + 4, y + 1, BR.b); R.pset(x + 5, y - 1, BR.bS); } else if (tipo === 'casco') { R.disco(x, y, 5, K); R.disco(x, y, 4, BR.b); rp(x - 5, y, x + 5, y + 2, BR.bS); } else rueda(x, y, 4, 8, 0.3, BR.v, BR.vS, BR.vL); }
  // el fundidor lleva el cesto y lo vuelca en «melted down»
  const anda = tramo(t, U_(45.4), U_(46.6)), fx = Math.round(lerp(196, 110, anda));
  const m = R.actor(EL.romanoPileo2, fx, 168, t, { dir: -1, anda: anda > 0 && anda < 1, sostiene: anda > 0 ? [fx - 4 - Math.round(vuelca * 6), 146 - Math.round(vuelca * 8)] : undefined, sorpresa: t > P9 && t < U_(45.0), habla: t < U_(45.3) && bla(t) });
  if (anda > 0) { const [hx, hy] = m.mano; R.disco(hx - 4, hy, 7, K); R.disco(hx - 4, hy, 6, hex('#b8904a')); for (let x = hx - 9; x < hx + 2; x += 3) R.linea(x, hy - 4, x, hy + 5, hex('#8a6a34')); if (vuelca < 0.6) { R.disco(hx - 6, hy - 6, 3, BR.v); R.disco(hx - 2, hy - 7, 3, BR.b); } }
  // los cacharros caen al crisol (salta una ruedecita) y brillan
  if (vuelca > 0 && vuelca < 1) for (let k = 0; k < 4; k++) { const u = cl(vuelca * 1.4 - k * 0.1, 0, 1), x = lerp(m.mano[0] - 8, 84, u), y = lerp(m.mano[1] - 6, 140, u) - Math.sin(u * Math.PI) * 10; if (k === 3) rueda(x, y, 3, 8, t * 5, BR.v, BR.vS, BR.vL); else R.disco(x, y, 2.5, k % 2 ? BR.v : BR.b); }
  // el caldero nuevo sale del molde en «new things»
  const nu = tramo(t, U_(48.0), U_(48.3)); rp(214, 150, 262, 158, hex('#6a5a4a')); R.linea(214, 150, 262, 150, hex('#8a7a6a'));
  if (nu > 0) { const y = 148 - Math.round(nu * 4); R.disco(238, y - 6, 10, K); R.disco(238, y - 6, 9, mez(BR.b, BR.o, 0.5)); rp(228, y - 14, 248, y - 12, BR.bS); R.disco(234, y - 9, 3, BR.o); if (nu > 0.5) { R.linea(250, y - 18, 256, y - 24, BL); R.linea(253, y - 24, 253, y - 18, BL); } }
  // un gato que mira el fuego desde la tapia
  T.gato(R, 150, 40, t, { dir: -1 });
};

// 10 · el fondo del mar: la caja, a salvo
const p10 = (t) => {
  const o = { luz: 0.5, pulpo: true }; T.fondo(R, t, o);
  // la caja medio enterrada en la arena junto a las ánforas
  const bx = 128, by = 158, rayo = tramo(t, U_(49.2), U_(49.9));
  if (rayo > 0) { for (let y = 0; y < by; y++) { const w = 6 + y * 0.08, x0 = bx + 10 - (by - y) * 0.25; for (let x = Math.round(x0 - w); x <= Math.round(x0 + w); x++) if (H_(x, y, 131) < 0.55 * rayo) R.pset(x, y, mez(R.pget(x, y), hex('#bfe8f0'), 0.25)); } }
  R.poligono([[bx - 26, by + 2], [bx - 18, by - 6], [bx + 18, by - 8], [bx + 30, by + 2]], hex('#c8b88a'));
  rp(bx - 16, by - 22, bx + 18, by - 2, K); tablas(bx - 15, by - 21, bx + 17, by - 3, 5, hex('#3a2a1e'), hex('#22160e'), hex('#5a4030'), 9);
  R.disco(bx, by - 12, 7, K); R.disco(bx, by - 12, 6, mez(BR.v, BR.o, rayo * 0.6)); R.anillo(bx + 0.5, by - 11.5, 4, BR.vS); R.linea(bx, by - 12, bx + 4, by - 15, K);
  R.poligono([[bx - 22, by + 2], [bx - 14, by - 4], [bx + 6, by - 2], [bx + 26, by + 2]], hex('#d8c89a'));
  if (rayo > 0.7) { const g = Math.sin(t * 5) > 0 ? 1 : 0; R.linea(bx + 2 - 4 - g, by - 18, bx + 2 + 4 + g, by - 18, BL); R.linea(bx + 2, by - 22 - g, bx + 2, by - 14 + g, BL); }
  // un pez se acerca a curiosear y se va
  const pv = tramo(t, P10 + 0.3, U_(50.3)) - tramo(t, U_(50.9), U_(51.6)), px = Math.round(lerp(-20, bx - 26, pv) + (t > U_(50.9) ? (t - U_(50.9)) * 40 : 0)), py = Math.round(by - 20 + Math.sin(t * 3) * 2);
  rp(px - 5, py - 2, px + 5, py + 2, K); rp(px - 4, py - 1, px + 4, py + 1, hex('#e8b040')); R.linea(px - 4, py, px + 4, py, hex('#f8d870')); R.pset(px + 3, py - 1, K); R.poligono([[px - 5, py], [px - 9, py - 3], [px - 9, py + 3]], hex('#d89030'));
  // un cangrejo cruza por la arena
  const cx = Math.round(lerp(220, 60, tramo(t, P10, P10 + 3.9))), cy = 172; rp(cx - 3, cy - 2, cx + 3, cy, K); rp(cx - 2, cy - 2, cx + 2, cy - 1, hex('#c84a2a')); R.pset(cx - 4, cy - 3 - (Math.sin(t * 8) > 0 ? 1 : 0), hex('#c84a2a')); R.pset(cx + 4, cy - 3, hex('#c84a2a')); for (let k = -2; k <= 2; k += 2) R.pset(cx + k + (Math.sin(t * 12 + k) > 0 ? 1 : 0), cy + 1, K);
  // burbujitas
  for (let k = 0; k < 6; k++) { const ph = (t * 0.5 + k / 6) % 1; R.pset(Math.round(bx - 10 + k * 4 + Math.sin(t * 3 + k) * 2), Math.round(by - 24 - ph * 60), hex('#d8f0f8')); }
  T.fondoDelante(R, t, o);
};

const efectos = [[C_(1.3), 'pop'], [C_(2.4), 'brillo'], [C_(3.9), 'toc'], [P2 + 0.3, 'papel'], [C_(6.2), 'lapiz'], [C_(7.3), 'pop'], [C_(8.8), 'brillo'], [C_(10.2), 'pop'],
  [P3 + 0.2, 'tic'], [C_(13.0), 'tic'], [C_(14.0), 'tic'], [C_(15.7), 'papel'], 
  [P4 + 0.4, 'lapiz'], [Ci_(19.0), 'lapiz'], [Ci_(19.85), 'pop'], [Ci_(21.2), 'lapiz'],
  [P5 + 0.3, 'ola'], [Ci_(23.6), 'toc'], [Ci_(24.2), 'golpecito'],
  [P6 + 0.3, 'ola'], [Ci_(28.0), 'brillo'], [Ci_(30.4), 'pop'], [Ci_(32.6), 'boing'],
  [P7 + 0.3, 'aldea', { k: 1 }], [U_(36.9), 'brillo'], [U_(37.6), 'golpecito'],
  [P8 + 0.3, 'tic'], [U_(39.7), 'brillo'], [U_(41.3), 'tic'], [U_(41.9), 'tic'], [U_(42.7), 'brillo'],
  [P9 + 0.2, 'vapor'], [U_(45.6), 'golpecito'], [U_(47.0), 'golpecito'], [U_(47.6), 'vapor'], [U_(48.05), 'brillo'],
  [P10 + 0.2, 'burbujas'], [U_(49.5), 'brillo'], [U_(50.6), 'burbujas']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10]], { efectos, año: null });
''')
