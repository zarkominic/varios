# Borrador de escenas del ep40 (Anticitera), grupo S5: ak-planetas, ak-atasco, ak-cierre.
# python3 atomo/herramientas/generar-escenas.py ak ep40 episodios/40-anticitera/borrador-escenas/escenas5.py --destino atomo/plato/escenas/_tmp_S5 --pisar
E = {}

# Utilidades comunes (copiadas del grupo S4: ruido, tramas, mezcla, búferes, cielos, piedra, madera, ruedas, bronce,
# garabatos, lucernas, globo con símbolo, Luna con fase).
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

# Piezas propias del grupo S5 (guante de Atom, panel con número, marco de monitor, anillos en elipse, caja de la máquina,
# lobos marinos, faro, autobús, mate, polilla). No redeclaran nada de PRE.
MIO = r'''
const ease = (u) => u * u * (3 - 2 * u);
const GUANTE = '#5a8ad0';
// el guante de Atom (mano canónica sin manga), dedos a la izquierda
const guante = (x, y, d = -1) => T.mano(R, Math.round(x), Math.round(y), d, GUANTE, { sinManga: true });
// panel blanco con una cifra grande (R.numero de 16 px), con su sombra; a 0–1 lo hace aparecer con un rebote
const panelNum = (cx, cy, txt, a = 1, o = {}) => { if (a <= 0) return; const s = a < 1 ? 0.6 + 0.4 * ease(a) + Math.sin(a * Math.PI) * 0.15 : 1, w = Math.round((o.w ?? 44) * s / 2), h = Math.round((o.h ?? 24) * s / 2);
  cx = Math.round(cx); cy = Math.round(cy); rp(cx - w + 2, cy - h + 3, cx + w + 2, cy + h + 3, mez(K, hex('#000000'), 0.5)); rp(cx - w - 1, cy - h - 1, cx + w + 1, cy + h + 1, K); rp(cx - w, cy - h, cx + w, cy + h, o.fondo ?? BL);
  R.linea(cx - w, cy + h, cx + w, cy + h, hex('#c8c0a8')); R.linea(cx - w, cy - h, cx + w, cy - h, hex('#ffffff')); if (a > 0.5) R.numero(txt, cx, cy + 8, { tam: 16, centro: true, ...(o.num || {}) }); };
// marco de monitor oscuro con brillo en el canto
const marco = (x0, y0, x1, y1, c = hex('#2a2c34')) => { rp(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K); rp(x0, y0, x1, y1, c); R.linea(x0 + 1, y0 + 1, x1 - 1, y0 + 1, mez(c, BL, 0.25)); R.linea(x0 + 1, y1 - 1, x1 - 1, y1 - 1, mez(c, K, 0.4)); };
// rueda de líneas de luz (simulación): solo el contorno y los radios
const ruedaLuz = (cx, cy, r, n, ang, col, colS) => { const P = []; for (let k = 0; k < n; k++) { const a = ang + k * 2 * Math.PI / n, da = Math.PI / n, td = Math.max(2, r * 0.13);
    for (const [aa, rr] of [[a - da, r], [a - da * 0.45, r + td], [a + da * 0.35, r + td], [a + da * 0.55, r]]) P.push([cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr]); }
  for (let i = 0; i < P.length; i++) { const [x0, y0] = P[i], [x1, y1] = P[(i + 1) % P.length]; R.linea(x0, y0, x1, y1, col); }
  R.anillo(cx + 0.5, cy + 0.5, r * 0.3, colS); for (let k = 0; k < 5; k++) { const a = ang + k * 2 * Math.PI / 5; R.linea(cx + Math.cos(a) * r * 0.3, cy + Math.sin(a) * r * 0.3, cx + Math.cos(a) * r * 0.85, cy + Math.sin(a) * r * 0.85, colS); }
  R.disco(cx, cy, 1.5, col); };
// la caja de madera de la máquina, vista de frente (x, y = centro de abajo; s escala); tapa 0–1 abierta (para meter cosas)
const cajaMaq = (x, y, s = 1, brillo = 0) => { x = Math.round(x); y = Math.round(y); const w = Math.round(16 * s), h = Math.round(22 * s);
  rp(x - w + 2, y + 1, x + w + 3, y + 2, mez(K, hex('#000000'), 0.4)); rp(x - w, y - h, x + w, y, K); tablas(x - w + 1, y - h + 1, x + w - 1, y - 1, Math.max(3, Math.round(4 * s)), hex('#7a4a2a'), hex('#4e2e18'), hex('#a8703e'), x);
  const cx = x - Math.round(2 * s), cy = y - Math.round(h * 0.55), r = Math.round(9 * s); R.disco(cx, cy, r + 1, K); R.disco(cx, cy, r, mez(BR.b, BR.o, brillo)); R.anillo(cx + 0.5, cy + 0.5, r * 0.62, BR.bS); R.disco(cx - r * 0.3, cy - r * 0.3, r * 0.25, mez(BR.bL, BL, brillo * 0.5));
  R.linea(cx, cy, cx + Math.round(r * 0.6), cy - Math.round(r * 0.5), K); R.linea(x + w, y - Math.round(h * 0.5), x + w + Math.round(4 * s), y - Math.round(h * 0.5), BR.b); R.disco(x + w + Math.round(4 * s), y - Math.round(h * 0.5), Math.max(1, s * 1.4), BR.bL); };
// polilla que revolotea alrededor de (x, y)
const polilla = (x, y, t, k = 0) => { const a = t * 3.1 + k, px = Math.round(x + Math.cos(a) * 9 + Math.sin(t * 7 + k) * 2), py = Math.round(y + Math.sin(a * 1.3) * 5); const f = Math.sin(t * 30 + k) > 0;
  R.pset(px, py, hex('#e8dcc0')); R.pset(px - 1, py - (f ? 1 : 0), hex('#c8b898')); R.pset(px + 1, py - (f ? 1 : 0), hex('#c8b898')); };
// motas de polvo que flotan en un rayo de luz (rectángulo)
const polvo = (t, x0, y0, x1, y1, n, k = 0, c = hex('#fff4d0')) => { for (let i = 0; i < n; i++) { const x = x0 + ((H_(i, 1, k) * (x1 - x0) + t * (2 + H_(i, 2, k) * 3)) % (x1 - x0)), y = y0 + ((H_(i, 3, k) * (y1 - y0) + Math.sin(t * 0.7 + i) * 4 + t * 1.5) % (y1 - y0)); if (Math.sin(t * 2 + i) > -0.3) R.pset(Math.round(x), Math.round(y), c); } };
// un punto de una elipse
const eli = (cx, cy, rx, ry, a) => [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry];
// lobo marino de 22 px tumbado (x, y = la panza en la roca); o.aplaude
const loboMarino = (x, y, t, d = 1, o = {}) => { x = Math.round(x); y = Math.round(y); const X = (i) => x + i * d, cab = o.ladra ? -2 : 0, ap = o.aplaude && Math.sin(t * 16) > 0 ? 1 : 0;
  const c = hex('#a8784e'), cS = hex('#6a4a2e'), cL = hex('#d8a878');
  R.poligono([[X(-11), y], [X(-6), y - 5], [X(2), y - 7], [X(7), y - 9 + cab], [X(9), y - 14 + cab], [X(13), y - 13 + cab], [X(14), y - 10 + cab], [X(10), y - 7], [X(9), y], [X(-11), y + 1]], K);
  R.poligono([[X(-10), y - 1], [X(-6), y - 4], [X(2), y - 6], [X(7), y - 8 + cab], [X(9), y - 13 + cab], [X(12), y - 12 + cab], [X(13), y - 10 + cab], [X(9), y - 7], [X(8), y - 1]], c);
  R.linea(X(-8), y - 2, X(5), y - 5, cL); R.pset(X(11), y - 12 + cab, K); R.pset(X(14), y - 10 + cab, K); R.pset(X(13), y - 9 + cab, cL); R.linea(X(-11), y - 1, X(-14), y - 3 - ap, cS); R.linea(X(-11), y, X(-14), y + 1, cS);
  R.linea(X(5), y - 2, X(8 + ap * 2), y - 6 - ap * 2, cS); if (o.ladra && Math.sin(t * 9) > 0) { R.pset(X(17), y - 15, BL); R.pset(X(18), y - 17, BL); R.pset(X(16), y - 17, BL); } };
// gaviota que planea (x, y), aleteo
const gaviota = (x, y, t, k = 0) => { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 6 + k) > 0 ? 1 : 0; R.linea(x - 4, y - a, x - 1, y, hex('#f0f0f0')); R.linea(x + 1, y, x + 4, y - a, hex('#f0f0f0')); R.pset(x, y, hex('#d0d0d8')); R.pset(x - 4, y - a - 1, K); R.pset(x + 4, y - a - 1, K); };
// el mate con su bombilla y su vapor
const mate = (x, y, t) => { x = Math.round(x); y = Math.round(y); R.disco(x, y - 6, 7, K); R.disco(x, y - 6, 6, hex('#8a5a2e')); R.disco(x - 2, y - 8, 2, hex('#b07a40')); rp(x - 5, y - 13, x + 5, y - 11, hex('#c8c8d0')); R.linea(x - 5, y - 13, x + 5, y - 13, BL);
  rp(x - 4, y - 12, x + 4, y - 12, hex('#4a7a2e')); R.linea(x + 2, y - 12, x + 7, y - 24, hex('#d8d8e0')); R.linea(x + 3, y - 12, x + 8, y - 24, hex('#9a9aa8'));
  for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3) % 1; R.pset(Math.round(x - 2 + Math.sin(t * 2 + k * 2) * 2), Math.round(y - 15 - ph * 12), mez(BL, hex('#8a8a90'), ph)); } };
'''

# ───────────────────────────────────────────── AK-PLANETAS ─────────────────────────────────────────────
E['ak-planetas'] = ('Los planetas', '''// AK-PLANETAS (frases 27–28), 2021→2024, cartela «2021». Seis planos:
// 1. (0 → «a team») fondo local: el taller de reconstrucción de noche: la caja de la máquina dibujada en fantasma (líneas
//    de puntos) con los tres trozos de bronce verde que quedan en su sitio; en «missing» saltan tres «?» en los huecos; en
//    «research goes on» la mano canónica con un lápiz traza el círculo de la esfera y salen ruedas de puntos; polilla en
//    el flexo.
// 2. («a team» → «planets») fondo local: un laboratorio de Londres en 2021 (ventana con lluvia, la torre del reloj y un
//    autobús rojo que pasa): investigadoraAK entra, en «proposed» señala la pantalla grande y en «front dial» se ilumina
//    la esfera y salen los anillos uno a uno; investigadorAK teclea detrás de su mesa y la impresora 3D imprime una rueda.
// 3. («planets» → «In 2024») fondo local: la esfera de los planetas en escorzo (anillos en elipse sobre un plato que gira,
//    bajo un foco): en «planets» entran las cuentas de los planetas una a una y giran a su ritmo; en «cycles» salen las
//    cifras de los ciclos y en «inscriptions» se encienden los garabatos de la placa de abajo.
// 4. («In 2024» → «count») hoy 'ordenador' general (2.ª vez; la otra en ak-escaner, con el guante; aquí sin Atom, de noche
//    en Glasgow, 2024): fisico2AK entra con una taza; fisicoAK en «statistics» señala la pantalla y sale la campana de
//    Gauss en barras; los dos sonríen.
// 5. («count» → «a year») fondo local: el anillo del calendario de muy cerca en diagonal sobre fieltro: los agujeros que
//    quedan y el trozo que falta; en «count the missing holes» van saliendo los agujeros que faltan, de puntos, uno a uno;
//    el panel cuenta hasta 354 en «354» y cambia a 355 en «355».
// 6. («a year» → fin) fondo local: el anillo entero tumbado en la mesa, de noche, con la Luna de verdad por la ventana:
//    en «twelve lunar months» se encienden 12 lunas alrededor; en «not a solar year» un Sol intenta entrar y le sale «X»;
//    en «followed the Moon» el guante de Atom pone la Luna de papel en el anillo y echa a correr; en «not the Sun», otra
//    «X» al Sol, que se va.''', PRE + MIO + r'''
const S_ = (s) => s < 17.0 ? en('planetas', (s - 1.5) / 13.821) : en('agujeros', (s - 17.319) / 16.892);
const P2 = S_(6.05), P3 = S_(10.91), P4 = S_(17.32), P5 = S_(22.36), P6 = S_(28.73);

// ── 1 · la caja en fantasma ──
const BOX = [96, 30, 224, 138], DC = [160, 82, 38];
const FR1 = [[112, 98], [150, 92], [176, 106], [172, 132], [128, 136], [108, 124]], FR2 = [[188, 36], [214, 40], [216, 62], [196, 66]], FR3 = [[196, 112], [212, 108], [218, 124], [204, 130]];
const dentroP = (P) => (x, y) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const fondo1 = () => capa('taller21', () => {
  estuco(0, 0, 319, 127, hex('#2c4446'), hex('#203436'), hex('#3a5856'), 3);
  // tablero de herramientas a la izquierda
  rp(8, 34, 64, 104, K); rp(9, 35, 63, 103, hex('#8a6a46')); for (let y = 39; y < 102; y += 6) for (let x = 13; x < 62; x += 6) R.pset(x, y, hex('#4a3624'));
  R.linea(16, 44, 16, 70, hex('#a8acb4')); rp(13, 40, 19, 45, hex('#c84a2a')); R.linea(26, 42, 34, 66, hex('#c8ccd4')); R.linea(27, 42, 35, 66, hex('#8a8e98')); R.anillo(46.5, 54.5, 7, hex('#c8a040')); R.linea(40, 76, 58, 76, hex('#d8c498')); for (let x = 40; x < 58; x += 3) R.pset(x, 77, hex('#5a4a30'));
  R.linea(18, 82, 24, 98, hex('#6a4a2a')); rp(15, 80, 21, 84, hex('#a8acb4')); R.disco(48, 90, 6, hex('#3a3a44')); R.disco(48, 90, 3, hex('#8a8e98'));
  // estante con cajas de fragmentos y rollos a la derecha (por debajo de la esquina de Atom)
  rp(244, 62, 316, 64, K); R.linea(244, 62, 316, 62, hex('#a0703e')); rp(244, 96, 316, 98, K); R.linea(244, 96, 316, 96, hex('#a0703e'));
  for (const [x, w, c] of [[248, 18, '#c8b088'], [268, 14, '#a88a5a'], [284, 22, '#d8c8a0']]) { rp(x, 48, x + w, 61, K); rp(x + 1, 49, x + w - 1, 60, hex(c)); R.linea(x + 3, 54, x + w - 3, 54, hex('#5a4a30')); }
  for (const [x, w, c] of [[248, 10, '#e8e0c8'], [260, 10, '#d8d0b8'], [274, 24, '#5a6a8a'], [300, 12, '#8a3a2a']]) { rp(x, 80, x + w, 95, K); rp(x + 1, 81, x + w - 1, 94, hex(c)); R.linea(x + 1, 81, x + w - 1, 81, mez(hex(c), BL, 0.4)); }
  // zócalo y mesa de tablas
  rp(0, 118, 319, 127, hex('#1a282a')); R.linea(0, 118, 319, 118, hex('#4a6664'));
  tablas(0, 128, 319, 179, 9, hex('#6e4a2e'), hex('#46301e'), hex('#946638'), 5);
  // tapete de corte verde con su cuadrícula bajo la caja
  rp(70, 132, 250, 176, K); rp(71, 133, 249, 175, hex('#2e5a44')); for (let x = 75; x < 249; x += 8) R.linea(x, 134, x, 174, hex('#3a6a52')); for (let y = 137; y < 175; y += 8) R.linea(72, y, 248, y, hex('#3a6a52'));
  // papeles con garabatos, un calibre y un lápiz de repuesto
  rp(12, 140, 58, 170, K); rp(13, 141, 57, 169, hex('#e8e0c8')); garab(16, 145, 54, 166, hex('#6a6a7a'), 41);
  R.linea(262, 158, 300, 150, hex('#c8ccd4')); R.linea(262, 159, 300, 151, hex('#8a8e98')); rp(296, 146, 300, 158, hex('#c8ccd4'));
  // la caja de la máquina en fantasma: el marco de puntos
  for (let x = BOX[0]; x <= BOX[2]; x += 2) { R.pset(x, BOX[1], hex('#5ad0e0')); R.pset(x, BOX[3], hex('#5ad0e0')); }
  for (let y = BOX[1]; y <= BOX[3]; y += 2) { R.pset(BOX[0], y, hex('#5ad0e0')); R.pset(BOX[2], y, hex('#5ad0e0')); }
  for (let x = BOX[0] + 6; x <= BOX[2] + 6; x += 3) R.pset(x, BOX[1] - 6, hex('#3a8a9a')); for (let y = BOX[1] - 6; y <= BOX[3] - 6; y += 3) R.pset(BOX[2] + 6, y, hex('#3a8a9a'));
  R.linea(BOX[0], BOX[1], BOX[0] + 6, BOX[1] - 6, hex('#3a8a9a')); R.linea(BOX[2], BOX[1], BOX[2] + 6, BOX[1] - 6, hex('#3a8a9a')); R.linea(BOX[2], BOX[3], BOX[2] + 6, BOX[3] - 6, hex('#3a8a9a'));
  // los tres trozos de bronce que quedan, con sombra y madera negra pegada
  for (const [P, k] of [[FR1, 11], [FR2, 12], [FR3, 13]]) { R.poligono(P.map(([x, y]) => [x + 3, y + 3]), hex('#101a1c')); const d = dentroP(P), xs = P.map((p) => p[0]), ys = P.map((p) => p[1]);
    bronce(Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys), d, k); for (let i = 0; i < P.length; i++) { const [x0, y0] = P[i], [x1, y1] = P[(i + 1) % P.length]; R.linea(x0, y0, x1, y1, K); } }
  garab(118, 112, 166, 130, BR.vS, 51, 5);
  for (const [x, y, r] of [[138, 104, 7], [158, 120, 5]]) rueda(x, y, r, 10, 0.3, BR.b, BR.bS, BR.bL);
  calma(hex('#2c4446'));
});
const p1 = (t) => {
  fondo1();
  // el cono de luz del flexo sobre la caja
  for (let y = 80; y < 176; y++) { const w = (y - 80) * 0.6, c0 = 240 - (y - 80) * 0.7; for (let x = Math.round(c0 - w); x <= Math.round(c0 + w); x++) { const u = 1 - Math.abs(x - c0) / Math.max(1, w); if (x >= 0 && x < 320 && u * 0.6 > b4(x, y)) R.pset(x, y, mez(R.pget(x, y), hex('#fff0c0'), 0.14)); } }
  // el flexo: pie, brazo y cabeza
  rp(254, 160, 276, 164, K); rp(255, 161, 275, 163, hex('#3a3a44')); R.linea(264, 160, 252, 104, K); R.linea(265, 160, 253, 104, hex('#5a5a66')); R.linea(252, 104, 248, 74, K); R.linea(253, 104, 249, 74, hex('#5a5a66')); R.disco(252, 104, 2, hex('#c8c8d0'));
  R.poligono([[236, 70], [252, 64], [258, 74], [244, 82]], K); R.poligono([[238, 70], [251, 66], [256, 74], [244, 80]], hex('#c84a2a')); R.disco(242, 78, 3, hex('#fff6c8'));
  polilla(242, 76, t, 1); polvo(t, 150, 70, 240, 170, 14, 3);
  // el círculo de la esfera y las ruedas de puntos que va trazando el lápiz
  const traza = ease(tramo(t, S_(3.3), S_(5.8))), rue = tramo(t, S_(4.6), S_(5.9)), A0 = -Math.PI * 0.5;
  for (let k = 0; k < 240; k++) { const a = A0 + k / 240 * Math.PI * 2, [x, y] = eli(DC[0], DC[1], DC[2], DC[2], a); const hecho = k / 240 <= traza; if ((k % 3 === 0) || hecho) R.pset(Math.round(x), Math.round(y), hecho ? hex('#9af0ff') : hex('#2a6a78')); }
  for (let k = 0; k < 160; k++) { const a = k / 160 * Math.PI * 2; if (k % 3 === 0) { const [x, y] = eli(DC[0], DC[1], DC[2] - 9, DC[2] - 9, a); R.pset(Math.round(x), Math.round(y), hex('#2a6a78')); } }
  for (const [x, y, r, k] of [[128, 60, 12, 0], [196, 92, 10, 1], [118, 84, 7, 2]]) if (rue > k * 0.25) for (let q = 0; q < 48; q++) if (q % 2 === 0) { const a = q / 48 * Math.PI * 2 + t * 0.4; const rr = r + (q % 4 === 0 ? 2 : 0); R.pset(Math.round(x + Math.cos(a) * rr), Math.round(y + Math.sin(a) * rr), hex('#7ae0f0')); }
  // los «?» en los huecos en «missing»
  for (const [x, y, s] of [[190, 80, 2.44], [126, 50, 2.62], [206, 96, 2.8]]) { const a = tramo(t, S_(s), S_(s) + 0.25) * (1 - tramo(t, S_(3.7), S_(4.1))); if (a > 0) { const yy = y - Math.round(Math.sin(Math.min(1, a) * Math.PI) * 4), r = Math.round(10 * Math.min(1, a * 1.5)); R.disco(x, yy, r + 1, K); R.disco(x, yy, r, hex('#ffe070')); if (a > 0.4) R.icono('?', x - 5, yy - 7, K, hex('#c8a040'), 2); } }
  // el compás de dibujo, cogido por el guante de Atom por la cabeza: la punta en el centro y el lápiz traza el círculo
  const ent = ease(tramo(t, S_(2.9), S_(3.3))), sal = ease(tramo(t, S_(5.9), S_(6.3))), aP = A0 + traza * Math.PI * 2, [px, py] = eli(DC[0], DC[1], DC[2], DC[2], aP);
  const dy = Math.round((1 - ent) * -110 + sal * -110), L = Math.hypot(px - DC[0], py - DC[1]) || 1; let nx = -(py - DC[1]) / L, ny = (px - DC[0]) / L; if (ny > 0.2 || (Math.abs(ny) <= 0.2 && nx < 0)) { nx = -nx; ny = -ny; }
  const Hx = (DC[0] + px) / 2 + nx * 26, Hy = (DC[1] + py) / 2 + ny * 26 + dy;
  if (Hy > -40) { for (const [x1, y1, c] of [[DC[0], DC[1] + dy, '#c8ccd4'], [px, py + dy, '#c8ccd4']]) { R.linea(Hx, Hy, x1, y1, K); R.linea(Hx + 1, Hy, x1 + 1, y1, K); R.linea(Hx, Hy + 1, x1, y1 - 1, hex(c)); }
    R.pset(Math.round(DC[0]), Math.round(DC[1] + dy), hex('#3a3a44')); R.disco(px, py + dy - 2, 1.5, hex('#e8c040')); R.pset(Math.round(px), Math.round(py + dy), hex('#3a3a44'));
    R.disco(Hx, Hy, 3, K); R.disco(Hx, Hy, 2, hex('#e8e8f0')); R.linea(Hx, Hy - 3, Hx, Hy - 7, K); guante(Hx + 9, Hy - 6); }
};

// ── 2 · el laboratorio de Londres ──
const VEN2 = [18, 30, 118, 104], PAN2 = [170, 46, 268, 112];
const fondo2 = () => capa('londres', () => {
  estuco(0, 0, 319, 122, hex('#d8d4c8'), hex('#c4c0b4'), hex('#e8e4d8'), 21);
  // zócalo y suelo de linóleo
  rp(0, 120, 319, 125, hex('#5a6a7a')); losas(0, 126, 319, 179, hex('#8a9aa0'), hex('#6a7a80'), hex('#a8b8bc'), 22);
  // la ventana: marco blanco con parteluz
  rp(VEN2[0] - 4, VEN2[1] - 4, VEN2[2] + 4, VEN2[3] + 6, K); rp(VEN2[0] - 3, VEN2[1] - 3, VEN2[2] + 3, VEN2[3] + 5, hex('#f0ece0')); R.linea(VEN2[0] - 3, VEN2[3] + 5, VEN2[2] + 3, VEN2[3] + 5, hex('#a8a498'));
  // pizarra blanca con círculos y flechas de rotulador (sin letras), entre la ventana y la pantalla
  rp(126, 54, 164, 98, K); rp(127, 55, 163, 97, hex('#f4f4f0')); R.anillo(140.5, 70.5, 8, hex('#3a5ac8')); R.anillo(140.5, 70.5, 4, hex('#c83a3a')); R.linea(150, 66, 158, 60, hex('#3a5ac8')); R.linea(132, 84, 158, 84, hex('#2a8a4a')); R.linea(132, 90, 150, 90, hex('#2a8a4a')); rp(128, 96, 162, 97, hex('#a8a8a0'));
  // la pantalla grande en la pared
  marco(PAN2[0] - 3, PAN2[1] - 3, PAN2[2] + 3, PAN2[3] + 3); R.linea(219, PAN2[3] + 4, 219, 118, hex('#5a5a66'));
  // estantería baja con archivadores y una planta (x 274–316)
  rp(274, 70, 316, 120, K); rp(275, 71, 315, 119, hex('#c8b898')); for (const y of [86, 102]) R.linea(275, y, 315, y, hex('#8a7a5a'));
  for (let i = 0; i < 6; i++) { const c = ['#3a5a8a', '#c84a3a', '#e8c040', '#3a8a5a', '#8a4a8a', '#5a6a7a'][i]; rp(277 + i * 6, 74, 281 + i * 6, 85, hex(c)); rp(277 + i * 6, 104, 281 + i * 6, 118, hex(['#5a6a7a', '#3a5a8a', '#c84a3a', '#3a8a5a', '#e8c040', '#8a4a8a'][i])); }
  R.disco(286, 94, 4, hex('#c86a3a')); R.disco(300, 94, 3, hex('#d8d0c0'));
  // la mesa del investigador (se pinta delante: aquí solo la pata de detrás) y la papelera
  rp(64, 150, 76, 166, K); rp(65, 151, 75, 165, hex('#5a6a7a'));
  calma(hex('#d8d4c8'));
});
const cieloLondres = (t) => { const [x0, y0, x1, y1] = VEN2; R.recorte(VEN2);
  degr(x0, y0, x1, y1, [hex('#8a98a8'), hex('#a8b4c0'), hex('#c0c8d0')]);
  nubes(t, [[0, 40, 46, 3], [150, 50, 38, 5], [80, 34, 52, 2]].map(([a, b, c, d]) => [a, b, c, d]), hex('#6a7888'), hex('#8a98a8'), hex('#b0bcc8'));
  // tejados con chimeneas y la torre del reloj
  for (let x = x0; x <= x1; x++) { const h = 84 + Math.round(Math.sin(x * 0.3) * 1) + (Math.floor(x / 14) % 2 ? -4 : 0); R.linea(x, h, x, y1, hex('#4a4e5a')); }
  for (let i = 0; i < 6; i++) { const x = x0 + 6 + i * 17; rp(x, 76 + (i % 2) * 3, x + 3, 84, hex('#3a3e48')); }
  rp(84, 48, 94, 92, hex('#5a5a5a')); rp(85, 49, 93, 92, hex('#7a7468')); R.poligono([[83, 48], [89, 36], [95, 48]], hex('#4a4a52')); R.disco(89, 56, 3, hex('#e8e0c0')); R.linea(89, 56, 89, 54, K); R.linea(89, 56, 91, 56, K);
  for (let y = 62; y < 90; y += 5) { R.pset(87, y, hex('#e8d890')); R.pset(91, y, hex('#e8d890')); }
  // la calle con el autobús rojo de dos pisos que pasa
  rp(x0, 96, x1, y1, hex('#3a3c44')); R.linea(x0, 96, x1, 96, hex('#5a5c64'));
  const bx = Math.round(((t - P2) * 34) % 220) - 60; rp(bx, 84, bx + 34, 99, K); rp(bx + 1, 85, bx + 33, 98, hex('#c82a2a')); for (let i = 0; i < 6; i++) { rp(bx + 3 + i * 5, 87, bx + 6 + i * 5, 89, hex('#d8e8f0')); rp(bx + 3 + i * 5, 92, bx + 6 + i * 5, 94, hex('#d8e8f0')); } R.disco(bx + 7, 99, 2, K); R.disco(bx + 27, 99, 2, K);
  // paraguas que pasan
  for (let k = 0; k < 2; k++) { const ux = Math.round(x1 - ((t - P2) * 12 + k * 50) % 110); R.poligono([[ux - 4, 98], [ux, 95], [ux + 4, 98]], hex(k ? '#2a2a3a' : '#3a5a8a')); R.linea(ux, 98, ux, 102, K); }
  // la lluvia que cae en la ventana
  for (let i = 0; i < 40; i++) { const x = x0 + (H_(i, 1, 5) * 110 + t * 30) % 104, y = y0 + (H_(i, 2, 5) * 80 + t * 90 + i * 7) % 76; R.linea(x, y, x - 1, y + 3, hex('#c8d4e0')); }
  R.recorte(null);
  // parteluz y reflejo
  R.linea(68, VEN2[1], 68, VEN2[3], hex('#f0ece0')); R.linea(VEN2[0], 66, VEN2[2], 66, hex('#f0ece0')); R.linea(69, VEN2[1], 69, VEN2[3], hex('#b8b4a8'));
  for (let y = y0; y < y1; y++) { const x = x0 + 20 + (y - y0) * 0.4; if (x < x1) R.pset(Math.round(x), y, mez(R.pget(Math.round(x), y), BL, 0.25)); } };
const pantalla2 = (t) => { const [x0, y0, x1, y1] = PAN2, cx = 219, cy = 79; R.recorte(PAN2); degr(x0, y0, x1, y1, [hex('#0e1a2e'), hex('#14284a')]);
  for (let x = x0 + 4; x < x1; x += 8) R.linea(x, y0, x, y1, hex('#18304e')); for (let y = y0 + 4; y < y1; y += 8) R.linea(x0, y, x1, y, hex('#18304e'));
  const luz = tramo(t, S_(9.03), S_(9.5)), ani = tramo(t, S_(9.5), S_(10.8));
  R.disco(cx, cy, 27, mez(hex('#5a4a2a'), hex('#c8963a'), luz)); R.disco(cx, cy, 24, mez(hex('#3a3020'), hex('#8a6a3a'), luz)); R.anillo(cx + 0.5, cy + 0.5, 25, mez(hex('#7a6a4a'), hex('#ffe08a'), luz));
  const COL = ['#ffd860', '#e8ecf0', '#c8c8d0', '#f0e0a0', '#e85a3a', '#e8a050', '#d8c088'];
  for (let i = 0; i < 7; i++) if (ani > i / 7) { const r = 6 + i * 2.7, a = t * (1.6 - i * 0.18) + i; R.anillo(cx + 0.5, cy + 0.5, r, hex('#4a6a8a')); R.disco(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1.3, hex(COL[i])); }
  if (luz > 0 && luz < 1) R.anillo(cx + 0.5, cy + 0.5, 28 + luz * 6, hex('#ffe08a'));
  // la barra de abajo y el puntero
  rp(x0 + 4, y1 - 6, x1 - 4, y1 - 4, hex('#22344e')); rp(x0 + 4, y1 - 6, x0 + 4 + Math.round((x1 - x0 - 8) * tramo(t, P2, P3)), y1 - 4, hex('#3ac8e8'));
  R.recorte(null); };
const p2 = (t) => {
  fondo2(); cieloLondres(t); pantalla2(t);
  // la impresora 3D sobre la mesa imprime una rueda (detrás de la mesa, encima del tablero)
  const imp = tramo(t, P2, P3); rp(222, 120, 250, 146, K); rp(223, 121, 249, 145, hex('#3a3a44')); rp(226, 124, 246, 142, hex('#16161c')); const ny = 141 - Math.round(imp * 6);
  rp(230, ny + 1, 242, 141, hex('#e86a3a')); for (let x = 230; x <= 242; x += 3) R.pset(x, ny, hex('#e86a3a')); const hxp = 230 + Math.round((Math.sin(t * 9) * 0.5 + 0.5) * 12); rp(hxp - 2, ny - 4, hxp + 2, ny - 1, hex('#c8c8d0')); R.linea(223, ny - 3, 249, ny - 3, hex('#8a8a96')); R.pset(hxp, ny, hex('#ffd860'));
  // el investigador detrás de su mesa teclea (la mesa va delante)
  R.actor(EL.investigadorAK, 290, 158, t, { dir: -1, habla: t > S_(8.2) && t < S_(9.2) && bla(t), sonrisa: t > S_(10.0) });
  // la mesa de delante con el portátil, la taza y papeles
  rp(206, 146, 316, 150, K); rp(207, 147, 315, 149, hex('#e8e0d0')); R.linea(207, 147, 315, 147, BL); rp(210, 151, 214, 179, hex('#8a8a96')); rp(306, 151, 310, 179, hex('#8a8a96'));
  R.poligono([[258, 146], [262, 134], [278, 134], [276, 146]], K); R.poligono([[260, 145], [263, 135], [277, 135], [275, 145]], hex('#a8acb4')); R.disco(269, 140, 1.5, BL); const tk = Math.floor(t * 8) % 2; if (bla(t, 9)) R.pset(279, 145 - tk, hex('#f6c290'));
  R.disco(214, 142, 4, K); rp(211, 139, 217, 146, hex('#e8e8f0')); R.pset(218, 141, K); if (Math.sin(t * 3) > 0) R.pset(214, 135 - Math.floor(t * 4) % 3, hex('#c8c8d0'));
  // la alfombra, la silla de ruedas y la planta grande del rincón (por delante)
  rp(20, 168, 128, 178, K); rp(21, 169, 127, 177, hex('#7a3a3a')); for (let x = 24; x < 126; x += 6) R.linea(x, 170, x, 176, hex('#a85a4a')); R.linea(21, 172, 127, 172, hex('#5a2a2a'));
  rp(100, 132, 116, 150, K); rp(101, 133, 115, 149, hex('#3a4a6a')); rp(98, 150, 118, 153, K); rp(99, 151, 117, 152, hex('#2a3a5a')); R.linea(108, 153, 108, 160, K); R.linea(102, 162, 114, 162, K); R.pset(101, 163, K); R.pset(115, 163, K);
  rp(0, 150, 14, 166, K); rp(1, 151, 13, 165, hex('#b86a3a')); for (let k = 0; k < 6; k++) { const a = -2.6 + k * 0.45 + Math.sin(t * 1.3 + k) * 0.06; R.linea(7, 152, 7 + Math.cos(a) * 16, 152 + Math.sin(a) * 18, hex(k % 2 ? '#3a7a3a' : '#5a9a4a')); }
  // la investigadora entra y señala la pantalla en «proposed»; habla en «front dial»
  const an = ease(tramo(t, P2 - 0.1, S_(7.6))), x = Math.round(lerp(-12, 148, an)), señala = t > S_(7.87) && t < S_(10.6);
  R.actor(EL.investigadoraAK, x, 162, t, { dir: 1, anda: an > 0 && an < 1, dedo: señala, habla: t > S_(8.6) && t < S_(10.0) && bla(t, 8), sonrisa: t > S_(10.0) });
};

// ── 3 · la esfera de los planetas en escorzo ──
const RING = [{ c: '#e8ecf0', v: 2.2, n: 'luna' }, { c: '#c8c8d0', v: 1.5 }, { c: '#f4e8b0', v: 1.1 }, { c: '#ffd040', v: 0.8 }, { c: '#e85a3a', v: 0.55 }, { c: '#e8a050', v: 0.35 }, { c: '#d8c088', v: 0.22 }];
const fondo3 = () => capa('foco', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) * 0.8, y - 70) / 170; R.pset(x, y, mez(hex('#1c2a48'), hex('#070a14'), Math.min(1, d + (b4(x, y) - 0.5) * 0.08))); }
  // telón de fondo con pliegues
  for (let x = 0; x < 320; x++) { const p = Math.sin(x * 0.18) * 0.5 + 0.5; for (let y = 0; y < 128; y++) if (p > 0.82 && H_(x, y >> 2, 3) > 0.3) R.pset(x, y, mez(R.pget(x, y), hex('#2e4068'), 0.35)); }
  // la mesa redonda de nogal donde gira el plato
  R.disco(160, 156, 132, hex('#2a1a10')); for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) if (Math.hypot((x - 160) / 1.4, (y - 160) * 1.6) < 104) R.pset(x, y, H_(x >> 2, y, 4) > 0.85 ? hex('#5a3820') : (x + y) % 37 < 2 ? hex('#3a2414') : hex('#4a2e1a'));
  // la placa de las inscripciones (abajo) y sus remaches
  rp(76, 156, 244, 172, K); bronce(77, 157, 243, 171, null, 31); for (const x of [80, 240]) for (const y of [160, 168]) { R.disco(x, y, 1.2, BR.bS); R.pset(x, y - 1, BR.o); }
  garab(86, 159, 236, 170, BR.vS, 33, 5);
  calma(hex('#0c1220'));
});
const p3 = (t) => {
  fondo3();
  const cx = 160, cy = 100, gir = (t - P3) * 0.25;
  // el plato de bronce en escorzo
  for (let y = cy - 52; y <= cy + 52; y++) for (let x = cx - 124; x <= cx + 124; x++) { const u = (x - cx) / 122, v = (y - cy) / 50, d = u * u + v * v; if (d <= 1) R.pset(x, y, d > 0.93 ? BR.bS : H_(x >> 1, y, 7) > 0.92 ? BR.bL : vn(x, y, 14, 8) > 0.62 ? hex('#a8823e') : hex('#8a6a34')); }
  for (let a = 0; a < Math.PI * 2; a += 0.004) { const [x, y] = eli(cx, cy + 2, 123, 51, a); if (Math.sin(a) > 0) R.pset(Math.round(x), Math.round(y), K); }
  // los anillos y sus marcas
  for (let i = 0; i < 7; i++) { const rx = 22 + i * 14.5, ry = rx * 0.41; for (let a = 0; a < Math.PI * 2; a += 0.012) { const [x, y] = eli(cx, cy, rx, ry, a); R.pset(Math.round(x), Math.round(y), i % 2 ? BR.bS : hex('#5a4220')); }
    for (let k = 0; k < 24 + i * 4; k++) { const a = k / (24 + i * 4) * Math.PI * 2 + gir * 0.1, [x, y] = eli(cx, cy, rx + 1.5, ry + 0.6, a); R.pset(Math.round(x), Math.round(y), BR.bL); } }
  // la Tierra en el centro
  R.disco(cx, cy - 4, 9, K); R.disco(cx, cy - 4, 8, hex('#3a7ab8')); R.disco(cx - 3, cy - 6, 3, hex('#5aa04a')); R.disco(cx + 3, cy - 2, 2, hex('#5aa04a')); R.pset(cx - 4, cy - 9, BL);
  // las cuentas de los planetas: entran una a una desde «planets» y giran a su ritmo; detrás primero, delante después
  const cuentas = []; for (let i = 0; i < 7; i++) { const a0 = tramo(t, S_(10.95) + i * 0.13, S_(10.95) + i * 0.13 + 0.3); if (a0 <= 0) continue; const rx = 22 + i * 14.5, ry = rx * 0.41, a = gir * RING[i].v * 4 + i * 1.3 + (1 - a0) * 2, [x, y] = eli(cx, cy, rx, ry, a); cuentas.push([y, x, i, a0]); }
  cuentas.sort((p, q) => p[0] - q[0]);
  for (const [y, x, i, a0] of cuentas) { const r = (i === 3 ? 4.5 : i === 0 ? 3.5 : 3) * (0.5 + 0.5 * a0); R.linea(x, y, x, y - 6, hex('#5a4220')); R.disco(x, y - 7, r + 1, K); if (i === 0) lunaF(x, y - 7, r, 0.3 + (t - P3) * 0.1, hex('#3a3020')); else { R.disco(x, y - 7, r, hex(RING[i].c)); R.pset(Math.round(x - 1), Math.round(y - 8), BL); } if (i === 3 && a0 >= 1) for (let k = 0; k < 8; k++) { const q = k * Math.PI / 4 + t; R.pset(Math.round(x + Math.cos(q) * 7), Math.round(y - 7 + Math.sin(q) * 7), hex('#ffe070')); } }
  // las cifras de los ciclos en «cycles» (sobre la esfera, en paneles pequeños)
  for (const [x, y, c, k] of [[56, 58, '#f4e8b0', 0], [264, 62, '#d8c088', 1], [62, 126, '#e85a3a', 2]]) { const a = tramo(t, S_(13.05) + k * 0.2, S_(13.3) + k * 0.2); if (a > 0) { R.disco(x, y, 11, K); R.disco(x, y, 10, hex('#f0e6c8'));
    if (a > 0.5) { const g0 = (t - P3) * 2 + k; for (let q = 0; q < 20; q++) { const aa = g0 + q / 20 * Math.PI * 1.6; R.pset(Math.round(x + Math.cos(aa) * 7), Math.round(y + Math.sin(aa) * 7), hex('#5a3a1a')); } const ae = g0 + Math.PI * 1.6; R.disco(x + Math.cos(ae) * 7, y + Math.sin(ae) * 7, 1.6, hex('#5a3a1a')); R.disco(x, y, 3, K); R.disco(x, y, 2.2, hex(c)); }
    R.linea(x + (x < 160 ? 11 : -11), y, lerp(x, cx, 0.3), lerp(y, cy, 0.3), hex('#f0e6c8'), 2); } }
  // los garabatos de la placa se encienden en «inscriptions»
  const ins = tramo(t, S_(14.4), S_(15.6)); if (ins > 0) { const xm = 86 + Math.round(150 * ins); R.recorte([86, 158, xm, 171]); garab(86, 159, 236, 170, hex('#ffe08a'), 33, 5); R.recorte(null); R.linea(xm, 157, xm, 171, hex('#fff6c8')); }
  // el foco: un brillo que barre el bronce
  const bx = ((t - P3) * 60) % 360 - 40; for (let y = cy - 50; y < cy + 50; y += 1) for (let i = -3; i <= 3; i++) { const x = Math.round(bx + i + (y - cy) * 0.5), u = (x - cx) / 122, v = (y - cy) / 50; if (u * u + v * v < 1) R.pset(x, y, mez(R.pget(x, y), hex('#fff6d8'), 0.2)); }
  polvo(t, 60, 20, 260, 140, 18, 7, hex('#8a9ac8'));
};

// ── 4 · Glasgow, 2024: los dos físicos ante el ordenador ──
const p4 = (t) => {
  const o = { encuadre: 'ordenador', simula: 0 }; const g = T.hoy(R, t, o);
  // en la pantalla de la derecha, la campana de Gauss en barras que crece en «statistics»
  const [x0, y0, x1, y1] = (g.pantallas && g.pantallas[1]) || [196, 102, 254, 134], cr = tramo(t, S_(20.9), S_(22.2));
  R.recorte([x0, y0, x1, y1]); for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, y % 3 ? hex('#0e1a24') : hex('#122230'));
  const n = 13, w = (x1 - x0 - 6) / n; for (let i = 0; i < n; i++) { const g0 = Math.exp(-Math.pow((i - 6) / 2.6, 2)), h = Math.round(g0 * 24 * Math.min(1, cr * 1.6 - i * 0.04)); if (h > 0) { const bx = Math.round(x0 + 3 + i * w); for (let y = y1 - 3 - h; y <= y1 - 3; y++) R.linea(bx, y, bx + Math.round(w) - 2, y, i === 6 ? hex('#ffd860') : hex('#3ac8a8')); } }
  if (cr >= 1) { for (let i = 0; i <= 40; i++) { const u = i / 40, xx = x0 + 3 + u * (x1 - x0 - 8), yy = y1 - 3 - Math.exp(-Math.pow((u * 12 - 6) / 2.6, 2)) * 25; R.pset(Math.round(xx), Math.round(yy), BL); } }
  R.recorte(null);
  // el que entra con la taza; el otro señala la pantalla en «statistics» y sonríe cuando sale la campana
  const an = ease(tramo(t, P4, S_(19.2))), x2 = Math.round(lerp(-14, 44, an));
  const f2 = R.actor(EL.fisico2AK, x2, 162, t, { dir: 1, anda: an > 0 && an < 1, sostiene: true, sonrisa: t > S_(22.0), habla: t > S_(19.4) && t < S_(20.6) && bla(t) });
  if (f2 && f2.mano) { const [mx, my] = f2.mano; rp(mx - 2, my - 4, mx + 2, my, K); rp(mx - 1, my - 3, mx + 1, my - 1, hex('#e8e8f0')); if (Math.sin(t * 4) > 0) R.pset(mx, my - 6 - (Math.floor(t * 3) % 2), hex('#c8c8d0')); }
  R.actor(EL.fisicoAK, 86, 162, t, { dir: 1, dedo: t > S_(20.84) && t < S_(22.3), sorpresa: t > S_(21.9) && t < S_(22.25), sonrisa: t > S_(22.25), habla: t > S_(18.6) && t < S_(20.6) && bla(t, 6) });
  // un «!» sobre el que señala cuando la campana se completa
  if (cr >= 1) { const a = tramo(t, S_(22.2), S_(22.35)); if (a > 0) { R.disco(92, 120 - a * 4, 6, K); R.disco(92, 120 - a * 4, 5, hex('#ffe070')); R.icono('!', 91, 115 - a * 4, K, hex('#c8a040'), 1); } }
  T.hoyDelante(R, t, o);
};

// ── 5 · el anillo del calendario de muy cerca, en diagonal ──
const ACX = -70, ACY = 330, AR0 = 286, AR1 = 340, AGU = 0.022;   // centro fuera de cuadro; los agujeros cada ~7 px
const arcoA = (x, y) => Math.atan2(y - ACY, x - ACX);
const A_FALTA0 = -1.04, A_FALTA1 = -0.80;   // el trozo que falta (en radianes)
const enHueco = (a) => a > A_FALTA0 && a < A_FALTA1;
const fondo5 = () => capa('anillo5', () => {
  // fieltro verde oscuro con su pelusa y la mancha de luz del flexo
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = H_(x, y, 61), l = Math.max(0, 1 - Math.hypot(x - 230, y - 120) / 150); R.pset(x, y, mez(v > 0.92 ? hex('#2e5a46') : v < 0.06 ? hex('#16302a') : vn(x, y, 30, 62) > 0.6 ? hex('#22463a') : hex('#1e4034'), hex('#4a7a5a'), l * 0.5 > b4(x, y) ? 0.25 : 0)); }
  // la sombra del anillo en el fieltro
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - ACX - 4, y - ACY - 5); if (d > AR0 - 2 && d < AR1 + 2 && !enHueco(arcoA(x - 4, y - 5))) R.pset(x, y, mez(R.pget(x, y), K, 0.45)); }
  // el anillo de bronce corroído (la banda), con el trozo que falta
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - ACX, y - ACY), a = arcoA(x, y); if (d < AR0 || d > AR1 || enHueco(a)) continue;
    if (d < AR0 + 1.5 || d > AR1 - 1.5) { R.pset(x, y, K); continue; } if (d < AR0 + 4) { R.pset(x, y, BR.bS); continue; } if (d > AR1 - 4) { R.pset(x, y, BR.bL); continue; }
    const v = H_(x, y, 63), z = vn(x, y, 9, 64); R.pset(x, y, z > 0.62 ? (v > 0.7 ? BR.bL : BR.b) : z > 0.4 ? (v > 0.8 ? BR.vL : BR.v) : (v < 0.3 ? BR.vS : hex('#3e6a52'))); }
  // los bordes rotos (dentados) a cada lado del hueco
  for (const a of [A_FALTA0, A_FALTA1]) for (let r = AR0; r <= AR1; r++) { const j = (H_(r >> 2, a * 100, 65) - 0.5) * 0.02, x = ACX + Math.cos(a + j) * r, y = ACY + Math.sin(a + j) * r; R.pset(Math.round(x), Math.round(y), K); R.pset(Math.round(x) + (a > -0.9 ? 1 : -1), Math.round(y), BR.vL); }
  // las dos rayas grabadas y los agujeros que quedan (algunos tapados por el verdín)
  for (let a = -1.6; a < 0; a += 0.002) { if (enHueco(a)) continue; for (const r of [AR0 + 10, AR1 - 10]) R.pset(Math.round(ACX + Math.cos(a) * r), Math.round(ACY + Math.sin(a) * r), BR.vS); }
  for (let a = -1.6; a < 0; a += AGU) { if (a > A_FALTA0 - 0.012 && a < A_FALTA1 + 0.012) continue; const r = (AR0 + AR1) / 2, x = ACX + Math.cos(a) * r, y = ACY + Math.sin(a) * r; if (x < -4 || x > 324 || y < -4 || y > 184) continue;
    if (H_(Math.round(a * 1000), 1, 66) < 0.2) { R.disco(x, y, 2.4, BR.vL); R.pset(Math.round(x), Math.round(y), BR.vLL); continue; } R.disco(x, y, 3, K); R.disco(x - 0.5, y - 0.5, 1.8, hex('#0a0a10')); R.pset(Math.round(x + 1), Math.round(y + 2), BR.bL); R.pset(Math.round(x + 2), Math.round(y + 1), BR.bL); }
  // en el fieltro: el calibre, las pinzas, un trocito de bronce suelto, la libreta con palotes y el lápiz, una taza
  R.linea(150, 172, 214, 152, hex('#c8ccd4')); R.linea(150, 173, 214, 153, hex('#8a8e98')); rp(210, 144, 216, 160, hex('#c8ccd4')); rp(156, 164, 160, 176, hex('#c8ccd4'));
  R.linea(250, 28, 300, 54, hex('#a8acb4')); R.linea(250, 30, 300, 58, hex('#d8dce4'));
  R.poligono([[34, 150], [50, 144], [56, 156], [40, 162]], K); bronce(35, 145, 55, 161, (x, y) => x + (y - 150) * 0.4 > 36 && x - (y - 150) * 0.3 < 54 && y > 145 && y < 161, 68);
  rp(226, 118, 312, 176, K); rp(227, 119, 311, 175, hex('#efe6cc')); for (let y = 126; y < 174; y += 6) R.linea(229, y, 309, y, hex('#b8c8d8')); R.linea(240, 119, 240, 175, hex('#e8a0a0'));
  R.linea(290, 104, 318, 120, K); R.linea(290, 105, 318, 121, hex('#e8c040')); R.pset(289, 104, hex('#3a3a44'));
  R.disco(196, 40, 11, K); R.disco(196, 40, 10, hex('#e8e0d0')); R.disco(196, 40, 7, hex('#6a3a1e')); R.disco(194, 38, 2, hex('#8a5a3a')); rp(206, 36, 210, 44, hex('#e8e0d0'));
  calma(hex('#1e4034'));
});
const p5 = (t) => {
  fondo5();
  // el vapor de la taza
  for (let k = 0; k < 3; k++) { const ph = (t * 0.5 + k / 3) % 1; R.pset(Math.round(194 + Math.sin(t * 2 + k * 2) * 3), Math.round(28 - ph * 14), mez(BL, hex('#2e5a46'), ph)); }
  // los agujeros que faltan salen de puntos, uno a uno, en «count the missing holes»; el último brilla
  const nF = Math.floor((A_FALTA1 - A_FALTA0) / AGU), cu = tramo(t, S_(22.5), S_(24.6)), rm = (AR0 + AR1) / 2;
  for (const r of [AR0, AR1]) for (let a = A_FALTA0; a < A_FALTA1; a += 0.0035) if (Math.floor(a * 600) % 3 === 0) R.pset(Math.round(ACX + Math.cos(a) * r), Math.round(ACY + Math.sin(a) * r), hex('#5ac0d0'));
  for (let k = 0; k < nF; k++) { const a = A_FALTA0 + (k + 0.5) * (A_FALTA1 - A_FALTA0) / nF, x = ACX + Math.cos(a) * rm, y = ACY + Math.sin(a) * rm; if (k / nF > cu) continue; const nuevo = k / nF > cu - 0.1;
    for (let q = 0; q < 16; q++) if (q % 2 === 0) R.pset(Math.round(x + Math.cos(q / 16 * Math.PI * 2) * 3), Math.round(y + Math.sin(q / 16 * Math.PI * 2) * 3), nuevo ? BL : hex('#7ae0f0'));
    if (nuevo && cu < 1) { R.pset(Math.round(x), Math.round(y - 6), BL); R.pset(Math.round(x), Math.round(y + 6), BL); R.pset(Math.round(x - 6), Math.round(y), BL); R.pset(Math.round(x + 6), Math.round(y), BL); } }
  // los palotes de la libreta, que crecen con la cuenta
  const pal = Math.floor(ease(tramo(t, S_(22.6), S_(25.47))) * 30);
  { const i = Math.max(0, pal - 1), g = Math.floor(i / 5), px = 246 + (g % 6) * 11 + (i % 5) * 2, py = 134 + Math.floor(g / 6) * 12, mv = t < S_(25.6) ? (Math.sin(t * 20) > 0 ? 2 : 0) : 0, ent = ease(tramo(t, S_(22.4), S_(22.7))) * (1 - ease(tramo(t, S_(25.8), S_(26.3))));
    if (ent > 0) { const wx = lerp(340, px + 14, ent), wy = lerp(200, py + 8 + mv, ent); R.linea(wx - 10, wy - 1, px, py - 2 + mv, K); R.linea(wx - 9, wy - 1, px + 1, py - 2 + mv, hex('#e8c040')); T.brazo(R, 330, 196, Math.round(wx), Math.round(wy), '#3a4a6a', -1, { codo: [Math.round(wx + 20), Math.round(wy + 28)] }); } }
  for (let i = 0; i < pal; i++) { const g = Math.floor(i / 5), j = i % 5, x = 246 + (g % 6) * 11 + j * 2, y = 128 + Math.floor(g / 6) * 12; if (j < 4) R.linea(x, y, x, y + 6, hex('#3a3a5a')); else R.linea(x - 8, y + 5, x + 1, y + 1, hex('#c83a3a')); }
  // el panel que cuenta: hasta 354 en «354» y 355 en «355»
  const c1 = tramo(t, S_(22.6), S_(25.47)), n = t < S_(27.05) ? Math.round(lerp(1, 354, ease(c1))) : 355, ap = tramo(t, S_(22.5), S_(22.8));
  panelNum(266, 96, String(n), ap, { w: 62, h: 26 });
  if (t > S_(25.47) && t < S_(25.95)) R.anillo(266.5, 96.5, 34 + (t - S_(25.47)) * 30, hex('#ffe070'));
  if (t > S_(27.05) && t < S_(27.5)) R.anillo(266.5, 96.5, 34 + (t - S_(27.05)) * 30, hex('#7ae0f0'));
  polvo(t, 0, 0, 320, 180, 12, 11, hex('#6a9a8a'));
};

// ── 6 · el anillo entero, con la Luna ──
const fondo6 = () => capa('mesa6', () => {
  // la pared de noche (tablas) arriba y la ventana con el cielo
  tablas(0, 0, 319, 60, 8, hex('#2a2a40'), hex('#1e1e30'), hex('#36364e'), 81);
  rp(184, 8, 262, 60, K); rp(185, 9, 261, 59, hex('#c8b898'));
  // la mesa de nogal en perspectiva desde arriba
  for (let y = 60; y < 180; y++) { const u = (y - 60) / 120; for (let x = 0; x < 320; x++) { const xx = (x - 160) / (0.8 + u * 0.5) + 400, v = H_(Math.floor(xx / 3), Math.floor(y * 0.6), 82), vt = Math.sin(xx * 0.05 + Math.sin(y * 0.08) * 2) > 0.92; R.pset(x, y, v > 0.9 ? hex('#6a4026') : vt ? hex('#3e2414') : v < 0.06 ? hex('#3a2010') : mez(hex('#4a2c18'), hex('#5e3a22'), u)); } }
  rp(0, 60, 319, 62, hex('#7a5034')); R.linea(0, 63, 319, 63, hex('#2a180c'));
  // la hoja con el dibujo del anillo, el compás y el lápiz (abajo a la izquierda); papeles; la lámpara (a la derecha)
  R.poligono([[8, 150], [70, 140], [80, 176], [14, 180]], K); R.poligono([[9, 150], [69, 141], [79, 175], [15, 179]], hex('#e8e0c8')); R.anillo(42.5, 160.5, 12, hex('#6a6a8a')); for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; R.pset(Math.round(42 + Math.cos(a) * 9), Math.round(160 + Math.sin(a) * 9), hex('#6a6a8a')); }
  R.linea(64, 170, 96, 178, K); R.linea(64, 169, 96, 177, hex('#e8c040'));
  // dentro del anillo: la hoja con la tira de las fases y un trozo del anillo de verdad, de bronce verde
  R.poligono([[110, 100], [196, 96], [200, 126], [112, 130]], K); R.poligono([[111, 101], [195, 97], [199, 125], [113, 129]], hex('#e8e0c8'));
  for (let i = 0; i < 8; i++) { const x = 120 + i * 10, y = 106 + i * 0.2; R.disco(x, y, 3.5, hex('#3a3a5a')); lunaF(x, y, 3, (i + 0.5) / 8, hex('#e8e0c8')); } garab(118, 114, 192, 125, hex('#8a7a6a'), 77);
  R.poligono([[120, 132], [150, 130], [148, 138], [122, 139]], K); bronce(121, 131, 149, 138, (x, y) => y > 131 && y < 138, 93);
  for (const [x, y, w, h, c] of [[268, 132, 46, 30, '#e8dcc0'], [276, 124, 40, 22, '#d8ccb0']]) { rp(x, y, x + w, y + h, K); rp(x + 1, y + 1, x + w - 1, y + h - 1, hex(c)); garab(x + 4, y + 4, x + w - 4, y + h - 3, hex('#7a6a5a'), x); }
  calma(hex('#2a2a40'));
});
const cieloVentana = (t) => { const V = [185, 9, 261, 59]; R.recorte(V); degr(V[0], V[1], V[2], V[3], [hex('#0a1028'), hex('#16204a'), hex('#28306a')]); estrellas(t, V[0], V[1], V[2], V[3], 18, 4);
  lunaF(236, 26, 8, 0.55, hex('#16204a')); halo(236, 26, 16, hex('#8a9ad8'), 0.25); for (let x = V[0]; x <= V[2]; x++) { const h = 52 + Math.round(Math.sin(x * 0.2) * 2 + Math.sin(x * 0.07) * 3); R.linea(x, h, x, V[3], hex('#0a0e1e')); }
  R.recorte(null); R.linea(223, 9, 223, 59, hex('#c8b898')); R.linea(185, 34, 261, 34, hex('#c8b898')); };
const p6 = (t) => {
  fondo6(); cieloVentana(t);
  const cx = 158, cy = 114, rx = 128, ry = 44, W = 15;
  // la sombra y el anillo tumbado (banda ancha de bronce con los agujeros como trama fina)
  for (let a = 0; a < Math.PI * 2; a += 0.003) for (let w = 0; w < W; w += 2) { const [x, y] = eli(cx + 4, cy + 6, rx - w, ry - w * 0.34, a); R.pset(Math.round(x), Math.round(y), hex('#24140a')); }
  for (let w = 0; w <= W; w++) for (let a = 0; a < Math.PI * 2; a += 0.0035) { const [x, y] = eli(cx, cy, rx - w, ry - w * 0.34, a), k = Math.floor((a / (Math.PI * 2)) * 354);
    R.pset(Math.round(x), Math.round(y), w === 0 || w === W ? K : w === 1 ? BR.bL : (w === 7 || w === 8) && k % 2 === 0 ? hex('#1a120a') : Math.sin(a) < -0.3 ? mez(BR.b, BR.bS, 0.4) : vn(x, y, 8, 91) > 0.6 ? BR.bL : vn(x, y, 6, 92) < 0.28 ? BR.v : BR.b); }
  // las 12 lunas de los meses sobre la banda: se encienden en «twelve lunar months»
  const doce = tramo(t, S_(29.29), S_(30.2));
  for (let i = 0; i < 12; i++) { const a = -Math.PI / 2 + i * Math.PI / 6, [x, y] = eli(cx, cy, rx - W / 2, ry - W * 0.17, a), on = doce * 12 > i; R.disco(x, y, 7, K); if (on) { lunaF(x, y, 6, (i + 0.5) / 12, hex('#3a2a1a')); if (doce * 12 < i + 1.5 && doce < 1) R.anillo(x + 0.5, y + 0.5, 9, hex('#fff6c8')); } else R.disco(x, y, 6, hex('#5a4a3a')); }
  // el Sol que quiere entrar: «X» en «not a solar year» y en «not the Sun», y se va
  const sv = ease(tramo(t, S_(30.5), S_(30.95))), sx = tramo(t, S_(33.75), S_(34.6)), SX = lerp(lerp(340, 262, sv), 345, ease(sx)), SY = 92 + Math.sin(t * 2) * 2;
  if (SX < 338) { solD(SX, SY, 11, t); R.disco(SX - 4, SY - 1, 1.4, K); R.disco(SX + 4, SY - 1, 1.4, K); R.linea(SX - 3, SY + 4, SX + 3, SY + 4, K);
    if ((t > S_(30.95) && t < S_(32.0)) || (t > S_(33.6) && t < S_(34.4))) { R.disco(SX - 20, SY - 16, 11, K); R.disco(SX - 20, SY - 16, 10, BL); R.icono('X', SX - 25, SY - 21, hex('#d83a2a'), hex('#8a2a1a'), 2); } }
  // el guante de Atom trae la Luna de papel y la pone en el anillo en «followed the Moon»; luego la Luna corre por él
  const g1 = ease(tramo(t, S_(31.5), S_(32.5))), corre = t > S_(32.5), ga = -Math.PI / 2 + (corre ? (t - S_(32.5)) * 1.3 : 0), [lx, ly] = eli(cx, cy, rx - W / 2, ry - W * 0.17, ga);
  const MX = corre ? lx : lerp(296, lx, g1), MY = corre ? ly : lerp(20, ly, g1);
  if (g1 > 0) { R.linea(MX, MY, MX, MY - 8, hex('#c8c8d0')); R.disco(MX, MY - 18, 11, K); lunaF(MX, MY - 18, 10, 0.32, hex('#4a3a2a')); R.disco(MX - 3, MY - 20, 1.3, K); R.linea(MX - 1, MY - 14, MX + 2, MY - 14, K); }
  const gs = ease(tramo(t, S_(32.5), S_(33.3))); if (g1 > 0 && gs < 1) guante(lerp(MX + 18, 300, gs), lerp(MY - 18, 22, gs));
  // un gato en el borde de la mesa que sigue la Luna con la cabeza, y la llama de una vela
  T.gato(R, 24, 112, t, { dir: corre && Math.cos(ga) > 0 ? 1 : -1 }); lucerna(300, 108, t, 2);
};

const efectos = [[S_(2.5), 'pop'], [S_(3.4), 'lapiz'], [S_(5.5), 'brillo'],
  [P2 + 0.2, 'lluvia'], [S_(7.9), 'toc'], [S_(9.05), 'interruptor'], [S_(9.6), 'bip'],
  [S_(10.95), 'pop'], [S_(11.8), 'maquina', { dur: 1.2, ritmo: 6 }], [S_(13.1), 'tic'], [S_(14.5), 'brillo'],
  [S_(17.6), 'puerta'], [S_(18.4), 'tecleo', { dur: 1 }], [S_(20.9), 'bip'], [S_(22.2), 'pop'],
  [S_(22.5), 'tic'], [S_(23.5), 'tic'], [S_(25.47), 'campana', { nota: 69 }], [S_(27.05), 'pop'],
  [S_(29.3), 'brillo'], [S_(30.95), 'boing'], [S_(32.0), 'papel'], [S_(32.6), 'whoosh'], [S_(33.6), 'boing']];
const año = (t) => t < P4 ? 2021 : 2024;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, cartela: '2021', año });
''')

# ───────────────────────────────────────────── AK-ATASCO ─────────────────────────────────────────────
E['ak-atasco'] = ('El atasco', '''// AK-ATASCO (frases 29–30), 2025 → hoy, sin cartela. Ocho planos:
// 1. (0 → «simulated») fondo local: Mar del Plata de día: la rambla, el edificio de la universidad, el faro de rayas rojas
//    y blancas con su haz, gaviotas, paseantes; en «two researchers» se enciende una ventana de la universidad; en
//    «Argentina» un lobo marino de la escollera aplaude y ladra (los investigadores no salen de cara).
// 2. («simulated» → «Their result») fondo local: el ordenador de cerca, con las dos manos (T.brazo desde abajo) que teclean
//    junto al mate; en la pantalla, la simulación del tren de ruedas; en «errors measured in their teeth» una lupa de
//    pantalla agranda un diente con sus rayitas rojas de error; por la ventana, el mar y el faro.
// 3. («Their result» → «But») fondo local: la simulación a pantalla completa: las ruedas giran y el contador de días sube;
//    en «jam» chocan dos dientes con un destello rojo, el tren se para temblando y sale «!»; en «four months» el panel «4»
//    con cuatro lunas.
// 4. («But» → «and that the original») museo 'escaner' cámara 'pantalla' (2.ª vez; la otra en ak-escaner, con letras;
//    aquí sin letras, con o.corte): la mano mueve el ratón y la raya de luz descubre las ruedas; en «2,000 years» sale el
//    panel «2000» y en «under the sea» el visor se tiñe de agua con burbujas y un pez.
// 5. («and that the original» → «Was it») fondo local: el banco de un relojero: un trozo de rueda corroído a la izquierda y,
//    en «finer», la mano trae una rueda nueva de dientes finos que brilla; en «question is still open», un «?» grande.
// 6. («Was it» → «Maybe») hoy 'estudio' general, o.gira y o.atasco (2.ª vez; la otra en ak-hola): el guante de Atom gira la
//    manivela de su mecanismo de cartón en «precise instrument» y «teaching model»; en «didn't always work» se atasca, la
//    rueda salta y sale rodando por la alfombra; «?».
// 7. («Maybe both» → «explain») hoy 'ordenador' cámara 'globo', o.gira: el aula; el profesor señala el globo en «globe in
//    a classroom» y el globo y la pelotita-Luna giran; una alumna levanta la mano en «Maybe both».
// 8. («explain» → fin) fondo local: un planetario con una réplica grande de la máquina en su pedestal; la
//    manivela de la réplica gira sola (motor), la guía habla y señala la cúpula; en «explain the sky» se encienden las
//    constelaciones y la Luna proyectada cruza; los niños, de pie entre las butacas, se sorprenden y sonríen.''', PRE + MIO + r'''
const A_ = (s) => s < 24.3 ? en('simulacion', (s - 0.5) / 23.565) : en('pregunta', (s - 24.565) / 13.568);
const P2 = A_(6.38), P3 = A_(11.74), P4 = A_(17.47), P5 = A_(22.41), P6 = A_(26.44), P7 = A_(31.3), P8 = A_(35.3);

// ── 1 · Mar del Plata ──
const fondo1 = () => capa('mdp', () => {
  // la arena de la playa y la escollera abajo; la rambla con baldosas y el muro
  degr(0, 0, 319, 70, [hex('#5a9ad8'), hex('#7ab4e4'), hex('#a8d0ec')]);
  for (let y = 70; y < 120; y++) for (let x = 0; x < 320; x++) R.pset(x, y, H_(x >> 1, y, 11) > 0.93 ? hex('#a8d8f0') : y < 76 ? hex('#3a7ab0') : hex('#2e6aa0'));
  // el edificio de la universidad (ladrillo, columnas blancas, ventanas con persianas) a la izquierda
  sillares(0, 30, 128, 120, 4, 8, hex('#b8643e'), hex('#8a4a2e'), hex('#d0805a'), 12);
  rp(0, 24, 130, 30, K); rp(0, 25, 129, 29, hex('#e8e4d8')); for (let x = 4; x < 128; x += 8) R.pset(x, 27, hex('#a8a498'));
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { const x = 8 + i * 30, y = 40 + j * 24; rp(x, y, x + 16, y + 16, K); rp(x + 1, y + 1, x + 15, y + 15, hex('#5a7a9a')); for (let k = y + 2; k < y + 15; k += 2) R.linea(x + 1, k, x + 15, k, hex('#7a9aba')); R.linea(x - 1, y + 17, x + 17, y + 17, hex('#e8e4d8')); }
  for (const x of [2, 32, 62, 92, 122]) { rp(x, 30, x + 4, 112, hex('#e8e4d8')); R.linea(x, 30, x, 112, hex('#f8f4ec')); R.linea(x + 4, 30, x + 4, 112, hex('#b8b4a8')); }
  rp(40, 96, 72, 120, K); rp(41, 97, 71, 119, hex('#4a3020')); R.linea(56, 97, 56, 119, hex('#2a1a10')); R.pset(54, 108, hex('#e8c040')); R.pset(58, 108, hex('#e8c040'));
  // la rambla: muro bajo con balaustrada y baldosas
  rp(0, 118, 319, 122, hex('#d8d0c0')); for (let x = 2; x < 320; x += 6) { rp(x, 112, x + 2, 118, hex('#e8e0d0')); R.pset(x, 112, BL); } R.linea(0, 111, 319, 111, hex('#c8c0b0'));
  losas(0, 122, 319, 152, hex('#c8b898'), hex('#a8987a'), hex('#e0d0b0'), 13);
  // la escollera de piedras y la espuma (abajo)
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hex('#2e6aa0'));
  for (let i = 0; i < 40; i++) { const x = 150 + H_(i, 1, 14) * 170, y = 158 + H_(i, 2, 14) * 22, r = 6 + H_(i, 3, 14) * 8; R.disco(x, y, r + 1, K); R.disco(x, y, r, i % 3 ? hex('#7a7468') : hex('#8a8478')); R.disco(x - r * 0.3, y - r * 0.3, r * 0.4, hex('#a8a294')); }
  // el faro de rayas rojas y blancas
  for (let y = 46; y < 112; y++) { const w = 6 + (y - 46) * 0.06; for (let x = Math.round(250 - w); x <= Math.round(250 + w); x++) R.pset(x, y, x === Math.round(250 - w) || x === Math.round(250 + w) ? K : Math.floor((y - 46) / 10) % 2 ? (x < 250 ? hex('#f0ece0') : hex('#c8c4b8')) : (x < 250 ? hex('#d83a2a') : hex('#a82a1a'))); }
  rp(242, 38, 258, 46, K); rp(243, 39, 257, 45, hex('#e8e0a0')); rp(240, 46, 260, 48, K); R.poligono([[243, 38], [250, 31], [257, 38]], hex('#3a3a44')); R.pset(250, 30, K);
  calma(hex('#5a9ad8'));
});
const p1 = (t) => {
  fondo1();
  // nubes a tres velocidades y gaviotas
  R.recorte([132, 22, 274, 66]); nubes(t, [[20, 34, 40, 2], [180, 44, 30, 4], [100, 56, 22, 7]], hex('#a8b8c8'), hex('#d8e4ec'), hex('#ffffff')); R.recorte(null);
  for (let k = 0; k < 3; k++) gaviota(140 + (t * (14 + k * 5) + k * 50) % 130, 30 + k * 9 + Math.sin(t + k) * 3, t, k);
  // las olas que se mueven y rompen en la escollera
  for (let i = 0; i < 26; i++) { const y = 78 + (i % 9) * 4, x = ((H_(i, 1, 15) * 320 + t * (6 + (i % 3) * 3)) % 340) - 10; R.linea(x, y, x + 5 + (i % 3) * 2, y, hex('#a8d8f0')); }
  for (let x = 140; x < 320; x += 3) { const y = 152 + Math.round(Math.sin(x * 0.2 + t * 3) * 1.5); R.pset(x, y, BL); if (Math.sin(x * 0.7 + t * 5) > 0.6) R.pset(x, y - 1, BL); }
  // el haz del faro que barre (no entra en la esquina de Atom)
  const ha = Math.sin(t * 0.9) * 0.9; for (let k = 0; k < 70; k++) { const x = 250 + Math.cos(Math.PI + ha) * k * (Math.sin(t * 0.9 + Math.PI / 2) > 0 ? 1 : -1), y = 42 + Math.sin(ha * 0.3) * k * 0.2; if (x > 272 || x < 0) continue; for (let w = -1; w <= 1; w++) R.pset(Math.round(x), Math.round(y + w * (1 + k * 0.04)), mez(R.pget(Math.round(x), Math.round(y + w)), hex('#fff6c8'), 0.4)); }
  // la ventana de la universidad que se enciende en «two researchers» (sin caras: solo la luz y el brillo de dos pantallas)
  const luz = tramo(t, A_(2.06), A_(2.4)); if (luz > 0) { rp(69, 65, 83, 79, mez(hex('#5a7a9a'), hex('#ffe8a0'), luz)); rp(71, 72, 75, 77, hex('#3ac8e8')); rp(77, 72, 81, 77, hex('#3ac8e8')); if (luz < 1) R.anillo(76.5, 72.5, 10 + luz * 6, hex('#fff6c8')); }
  // paseantes por la rambla (por delante del muro): un chico en bici, una señora con su perro, un turista que hace una foto
  const bx = Math.round(((t * 30) % 380) - 30); rp(bx - 6, 146, bx + 6, 147, K); R.anillo(bx - 6.5, 147.5, 3, K); R.anillo(bx + 6.5, 147.5, 3, K); R.actor(EL.chico, bx, 143, t, { dir: 1, quieto: true });
  const sx = Math.round(310 - ((t * 9) % 200)); R.actor(EL.abuela, sx, 150, t, { dir: -1, anda: true }); T.gato(R, sx - 14, 150, t, { dir: -1 });
  const tu = R.actor(EL.turista, 196, 150, t, { dir: 1, sostiene: true, sonrisa: t > A_(5.9) }); if (tu && tu.mano) { const [mx, my] = tu.mano; rp(mx - 3, my - 3, mx + 3, my + 1, K); rp(mx - 2, my - 2, mx + 2, my, hex('#3a3a44')); R.pset(mx + 1, my - 1, hex('#8ac8e8')); if (t > A_(5.95) && t < A_(6.1)) R.disco(mx, my - 1, 4, BL); }
  // los lobos marinos en la escollera: uno aplaude y ladra en «Argentina»
  const ap = t > A_(5.6) && t < P2;
  loboMarino(222, 160, t, 1); loboMarino(300, 168, t, -1, { aplaude: ap, ladra: ap }); loboMarino(266, 176, t, 1);
  if (ap) { R.disco(306, 144, 7, K); R.disco(306, 144, 6, BL); R.icono('!', 305, 140, hex('#d83a2a'), hex('#8a2a1a'), 1); }
};

// ── 2 · el ordenador de cerca, con las manos ──
const PANT2 = [92, 28, 256, 118];
const fondo2 = () => capa('mesa25', () => {
  estuco(0, 0, 319, 126, hex('#d8c8a0'), hex('#c4b48c'), hex('#e8dcb8'), 23);
  // la ventana (a la izquierda) con el marco de madera
  rp(6, 24, 74, 104, K); rp(7, 25, 73, 103, hex('#8a5a34'));
  // un corcho con papeles a la derecha (por debajo de la esquina de Atom) y una repisa con libros
  rp(266, 52, 316, 100, K); rp(267, 53, 315, 99, hex('#b88a5a')); for (let i = 0; i < 60; i++) R.pset(267 + H_(i, 1, 24) * 48, 53 + H_(i, 2, 24) * 46, hex('#8a6a3a'));
  for (const [x, y, c] of [[272, 58, '#f0ece0'], [292, 62, '#e8f0a0'], [276, 78, '#a0d0f0'], [298, 82, '#f0c0c0']]) { rp(x, y, x + 14, y + 12, hex(c)); R.disco(x + 7, y, 1.2, hex('#d83a2a')); R.linea(x + 2, y + 4, x + 11, y + 4, hex('#8a8a96')); R.linea(x + 2, y + 7, x + 9, y + 7, hex('#8a8a96')); }
  rp(270, 112, 318, 114, K); R.linea(270, 112, 318, 112, hex('#a0703e')); for (const [x, h, c] of [[274, 14, '#3a5a8a'], [281, 12, '#c84a3a'], [287, 15, '#3a8a5a'], [294, 11, '#e8c040']]) { rp(x, 112 - h, x + 5, 111, K); rp(x + 1, 113 - h, x + 4, 111, hex(c)); }
  // la mesa
  tablas(0, 126, 319, 179, 9, hex('#8a6a46'), hex('#5a4228'), hex('#a8845a'), 25); R.linea(0, 126, 319, 126, hex('#c8a87a'));
  // el monitor y su pie
  marco(PANT2[0] - 6, PANT2[1] - 6, PANT2[2] + 6, PANT2[3] + 6); rp(160, PANT2[3] + 7, 188, 136, K); rp(161, PANT2[3] + 7, 187, 135, hex('#3a3c44')); rp(146, 134, 202, 138, K); rp(147, 135, 201, 137, hex('#4a4c54'));
  // el teclado
  rp(104, 144, 240, 166, K); rp(105, 145, 239, 165, hex('#3a3c44')); for (let j = 0; j < 4; j++) for (let i = 0; i < 16; i++) { const x = 108 + i * 8, y = 147 + j * 4.5; rp(x, y, x + 6, y + 3, hex('#5a5c64')); R.linea(x, y, x + 6, y, hex('#7a7c84')); }
  // papeles con ruedas, la libreta y el lápiz
  R.poligono([[12, 140], [76, 134], [82, 172], [16, 178]], K); R.poligono([[13, 141], [75, 135], [81, 171], [17, 177]], hex('#f0ece0')); R.anillo(40.5, 156.5, 12, hex('#6a6a8a')); R.anillo(62.5, 150.5, 7, hex('#6a6a8a'));
  calma(hex('#d8c8a0'));
});
const marVentana = (t) => { const V = [7, 25, 73, 103]; R.recorte(V); degr(7, 25, 73, 70, [hex('#6aa8dc'), hex('#a8d0ec')]); nubes(t, [[0, 36, 20, 3], [50, 48, 16, 5]], hex('#a8b8c8'), hex('#d8e4ec'), BL);
  for (let y = 70; y <= 103; y++) R.linea(7, y, 73, y, y % 4 === 0 && Math.sin(y + t * 2) > 0 ? hex('#5aa0d0') : hex('#2e6aa0'));
  for (let y = 52; y < 72; y++) { const w = 2 + (y - 52) * 0.05; for (let x = Math.round(56 - w); x <= Math.round(56 + w); x++) R.pset(x, y, Math.floor((y - 52) / 4) % 2 ? BL : hex('#d83a2a')); } rp(54, 48, 58, 52, hex('#e8e0a0'));
  gaviota(20 + (t * 8) % 50, 40, t); R.recorte(null); R.linea(40, 25, 40, 103, hex('#8a5a34')); R.linea(7, 64, 73, 64, hex('#8a5a34')); };
// tres ruedas de luz engranadas: el ángulo de la primera y las demás según sus dientes
const tren = (G, a1, col, colS, error) => { let a = a1; const angs = [a1]; for (let i = 1; i < G.length; i++) { a = -angs[i - 1] * G[i - 1][3] / G[i][3] + Math.PI / G[i][3]; angs.push(a); }
  G.forEach(([x, y, r, n], i) => ruedaLuz(x, y, r, n, angs[i], col, colS)); return angs; };
const p2 = (t) => {
  fondo2(); marVentana(t);
  const [x0, y0, x1, y1] = PANT2; R.recorte(PANT2); for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, hex('#0c1424')); for (let x = x0; x <= x1; x += 8) R.linea(x, y0, x, y1, hex('#142034')); for (let y = y0; y <= y1; y += 8) R.linea(x0, y, x1, y, hex('#142034'));
  const G = [[140, 76, 30, 24], [190, 58, 16, 13], [216, 92, 13, 11]]; tren(G, (t - P2) * 0.6, hex('#5ae0f0'), hex('#2a6a8a'));
  // el contador de días y la barra de avance
  R.numero(String(Math.floor((t - P2) * 9) % 120), 100, 40, { color: hex('#7ae8a0'), sombra: false }); rp(100, 112, 248, 114, hex('#1a2a3a')); rp(100, 112, 100 + Math.round(148 * tramo(t, P2, P3)), 114, hex('#3ac8a8'));
  // la lupa de pantalla sobre un diente en «errors measured in their teeth»
  const lu = tramo(t, A_(9.4), A_(9.8)); if (lu > 0) { const lx = 170, ly = 66, r = Math.round(18 * lu); R.disco(lx, ly, r + 1, hex('#ffe070')); R.disco(lx, ly, r, hex('#0c1424'));
    if (lu >= 1) { R.poligono([[158, 80], [164, 56], [176, 56], [182, 80]], hex('#5ae0f0')); R.poligono([[160, 80], [165, 58], [175, 58], [180, 80]], hex('#0c1424')); for (const [a, b] of [[163, 60], [177, 62], [161, 70], [179, 72]]) { R.linea(a - 3, b, a + 3, b, hex('#e84a3a')); R.pset(a, b - 1, hex('#e84a3a')); }
      R.linea(166, 58, 172, 57, hex('#e84a3a')); } R.linea(lx + r * 0.7, ly + r * 0.7, lx + r + 6, ly + r + 6, hex('#ffe070')); }
  R.recorte(null);
  // reflejo en la pantalla
  for (let k = 0; k < 30; k++) R.pset(PANT2[0] + 8 + k, PANT2[1] + 4 + k, mez(R.pget(PANT2[0] + 8 + k, PANT2[1] + 4 + k), BL, 0.18));
  mate(272, 160, t);
  // las dos manos sobre el teclado (brazos canónicos desde abajo) que teclean; la derecha pulsa en «errors»
  const tl = (k) => Math.sin(t * 14 + k) > 0.3 ? 1 : 0, pulsa = t > A_(9.2) && t < A_(9.6) ? 2 : 0;
  T.brazo(R, 92, 196, 128, 156 + tl(0), '#4a6a5a', 1, { codo: [100, 176] });
  T.brazo(R, 252, 196, 214, 156 + tl(2) + pulsa, '#4a6a5a', -1, { codo: [246, 176] });
};

// ── 3 · la simulación a pantalla completa: el atasco ──
const G3 = [[92, 100, 44, 32], [166, 80, 26, 19], [205, 115, 18, 13], [232, 88, 11, 8]];
const fondo3 = () => capa('sim3', () => { marco(0, 0, 319, 179, hex('#1e2028')); for (let y = 6; y <= 173; y++) for (let x = 6; x <= 313; x++) R.pset(x, y, (x % 10 === 0 || y % 10 === 0) ? hex('#122034') : hex('#0a1220'));
  // regla y escala en el borde, botones de la interfaz (iconos, sin letras)
  for (let x = 10; x < 300; x += 5) R.linea(x, 168, x, x % 25 === 0 ? 162 : 165, hex('#2a4a6a'));
  for (let i = 0; i < 4; i++) { rp(262 + i * 12, 150, 270 + i * 12, 158, hex('#1a3050')); R.pset(266 + i * 12, 154, hex('#5ae0f0')); }
  R.icono('reloj', 12, 150, hex('#5ae0f0'), hex('#0a1220'), 1); calma(hex('#0a1220')); });
const p3 = (t) => {
  fondo3();
  const JAM = A_(15.02), parado = t >= JAM, tt = parado ? JAM : t, tiem = parado ? Math.round(Math.sin(t * 40) * (1 - tramo(t, JAM, JAM + 1.5))) : 0;
  R.recorte([6, 6, 313, 173]);
  const col = (i) => parado && (i === 1 || i === 2) ? hex('#ff5a4a') : hex('#5ae0f0'), colS = (i) => parado && (i === 1 || i === 2) ? hex('#8a2a2a') : hex('#2a6a8a');
  let a = (tt - P3) * 0.9; const angs = [a]; for (let i = 1; i < G3.length; i++) angs.push(-angs[i - 1] * G3[i - 1][3] / G3[i][3] + Math.PI / G3[i][3]);
  G3.forEach(([x, y, r, n], i) => ruedaLuz(x + (i > 0 ? tiem : 0), y, r, n, angs[i], col(i), colS(i)));
  // los dientes con error marcados en amarillo
  for (const [i, k] of [[1, 3], [2, 5], [0, 11]]) { const [x, y, r, n] = G3[i], aa = angs[i] + k * 2 * Math.PI / n; R.disco(x + Math.cos(aa) * (r + 2), y + Math.sin(aa) * (r + 2), 2, hex('#ffd860')); }
  // el choque: destello rojo entre la segunda y la tercera
  if (parado) { const cx = 186 + tiem, cy = 99, f = Math.sin(t * 18) > 0; R.disco(cx, cy, f ? 7 : 5, hex('#ff5a4a')); R.disco(cx, cy, 3, hex('#fff0c0')); for (let k = 0; k < 8; k++) { const q = k * Math.PI / 4; R.linea(cx + Math.cos(q) * 7, cy + Math.sin(q) * 7, cx + Math.cos(q) * (11 + (f ? 2 : 0)), cy + Math.sin(q) * (11 + (f ? 2 : 0)), hex('#ffb04a')); }
    const ex = tramo(t, JAM, JAM + 0.2); R.disco(210, 56, 9 * ex + 1, K); R.disco(210, 56, 9 * ex, hex('#ff5a4a')); if (ex > 0.5) R.icono('!', 207, 49, BL, hex('#8a2a1a'), 2); }
  // el contador de días (abajo a la izquierda): sube hasta que se atasca
  const dias = Math.min(118, Math.floor((tt - P3) * 36)); rp(22, 148, 66, 162, hex('#122a40')); R.numero(String(dias), 26, 160, { color: parado ? hex('#ff5a4a') : hex('#7ae8a0'), sombra: false });
  // la barra de avance: verde, y roja cuando se para
  rp(76, 152, 250, 158, hex('#122a40')); rp(76, 152, 76 + Math.round(174 * Math.min(1, (tt - P3) / 4.2)), 158, parado && Math.sin(t * 8) > 0 ? hex('#ff5a4a') : hex('#3ac8a8'));
  R.recorte(null);
  // «four months»: el panel 4 y cuatro lunas en fila
  const cu = tramo(t, A_(15.78), A_(16.1)); panelNum(270, 118, '4', cu, { w: 34, h: 28 });
  for (let k = 0; k < 4; k++) { const a = tramo(t, A_(15.9) + k * 0.12, A_(16.1) + k * 0.12); if (a > 0) { R.disco(232 + k * 22, 146, 7, K); lunaF(232 + k * 22, 146, 6, 0.5, hex('#0a1220')); } }
};

// ── 4 · la pantalla del escáner: el daño de dos mil años ──
const p4 = (t) => {
  const o = { encuadre: 'escaner', camara: 'pantalla', corte: ease(tramo(t, P4 + 0.3, A_(19.6))), letras: 0 }; T.museo(R, t, o);
  const V = [70, 38, 262, 126], ag = tramo(t, A_(21.3), A_(21.9));
  // «under the sea»: el visor se tiñe de agua, con burbujas y un pez que pasa
  if (ag > 0) { R.recorte(V); for (let y = V[1]; y <= V[3]; y++) for (let x = V[0]; x <= V[2]; x++) if (b4(x, y) < ag * 0.45) R.pset(x, y, mez(R.pget(x, y), hex('#2a6aa0'), 0.5));
    for (let k = 0; k < 10; k++) { const ph = (t * 0.4 + k / 10) % 1; R.anillo(80 + k * 18 + Math.sin(t * 3 + k) * 2, V[3] - ph * 86, 1.5, hex('#a8d8f0')); }
    const fx = Math.round(V[2] - (t - A_(21.3)) * 40); rp(fx - 5, 60, fx + 4, 64, K); rp(fx - 4, 61, fx + 3, 63, hex('#e8b040')); R.poligono([[fx + 4, 62], [fx + 8, 59], [fx + 8, 65]], hex('#d89030')); R.pset(fx - 3, 61, K); R.recorte(null); }
  // «2,000 years»: el panel 2000
  panelNum(212, 60, '2000', tramo(t, A_(19.85), A_(20.15)), { w: 76, h: 24 });
  // la mano en el ratón (brazo canónico desde abajo a la derecha)
  const mv = Math.sin(t * 2) * 2 * (t < A_(19.6) ? 1 : 0.2); T.brazo(R, 300, 196, 238 + mv, 166, '#5a5a7a', -1, { codo: [296, 176] });
};

// ── 5 · el banco del relojero: un diente corroído y uno fino ──
const fondo5 = () => capa('relojero', () => {
  sillares(0, 0, 319, 112, 7, 16, hex('#a8644a'), hex('#7a4432'), hex('#c07a5a'), 52);
  // la cajonera de cajoncitos (izquierda) y el tablero de limas (derecha, bajo la esquina de Atom)
  rp(10, 30, 92, 108, K); rp(11, 31, 91, 107, hex('#6a4426')); for (let j = 0; j < 6; j++) for (let i = 0; i < 4; i++) { const x = 14 + i * 19, y = 34 + j * 12; rp(x, y, x + 16, y + 9, hex('#8a5a34')); R.linea(x, y, x + 16, y, hex('#a8744a')); R.disco(x + 8, y + 5, 1, hex('#e8c040')); }
  rp(232, 52, 314, 106, K); rp(233, 53, 313, 105, hex('#c8a878')); for (let i = 0; i < 9; i++) { const x = 240 + i * 8; R.linea(x, 58, x, 92 + (i % 3) * 4, hex('#8a8e98')); R.linea(x + 1, 58, x + 1, 92 + (i % 3) * 4, hex('#c8ccd4')); rp(x - 1, 92 + (i % 3) * 4, x + 2, 100, hex(['#c84a2a', '#3a5a8a', '#e8c040'][i % 3])); }
  // el banco de nogal con el tapete de cuero verde
  tablas(0, 112, 319, 179, 8, hex('#6a4026'), hex('#46280e'), hex('#8a5a34'), 53); rp(30, 122, 290, 176, K); rp(31, 123, 289, 175, hex('#6a3a26')); for (let i = 0; i < 300; i++) R.pset(31 + H_(i, 1, 54) * 258, 123 + H_(i, 2, 54) * 52, hex('#7a4a32')); R.linea(33, 125, 287, 125, hex('#8a5a3a'));
  // destornilladores, pinzas y un lupa de relojero en el tapete
  R.linea(220, 160, 270, 150, hex('#c8ccd4')); rp(266, 146, 280, 154, hex('#c84a2a')); R.linea(40, 132, 70, 142, hex('#a8acb4')); R.linea(40, 134, 70, 145, hex('#d8dce4'));
  R.disco(254, 134, 7, K); R.disco(254, 134, 6, hex('#2a2a30')); R.disco(254, 134, 4, hex('#8aa8c8')); R.pset(252, 132, BL);
  calma(hex('#a8644a'));
});
const p5 = (t) => {
  fondo5();
  // la lámpara de brazo que cuelga de arriba y su luz (se mece un poco)
  const lx = 150 + Math.sin(t * 0.8) * 2; R.linea(150, 0, lx, 26, K); R.poligono([[lx - 12, 36], [lx - 6, 26], [lx + 6, 26], [lx + 12, 36]], K); R.poligono([[lx - 10, 35], [lx - 5, 27], [lx + 5, 27], [lx + 10, 35]], hex('#3a6a5a')); R.disco(lx, 37, 3, hex('#fff6c8'));
  for (let y = 40; y < 176; y++) { const w = (y - 40) * 0.7; for (let x = Math.round(lx - w); x <= Math.round(lx + w); x++) { const u = 1 - Math.abs(x - lx) / Math.max(1, w); if (u * 0.45 > b4(x, y)) R.pset(x, y, mez(R.pget(x, y), hex('#fff0c0'), 0.12)); } }
  // el reloj de pared que anda (arriba, entre el tablero y la cajonera)
  R.disco(196, 40, 12, K); R.disco(196, 40, 11, hex('#6a4026')); R.disco(196, 40, 9, hex('#f0e8d0')); for (let k = 0; k < 12; k++) R.pset(Math.round(196 + Math.cos(k * Math.PI / 6) * 7), Math.round(40 + Math.sin(k * Math.PI / 6) * 7), K);
  R.linea(196, 40, 196 + Math.cos(t * 0.5) * 6, 40 + Math.sin(t * 0.5) * 6, K); R.linea(196, 40, 196 + Math.cos(t * 6) * 8, 40 + Math.sin(t * 6) * 8, hex('#c83a2a')); rp(194, 52, 198, 62, K); R.disco(196 + Math.sin(t * 3) * 3, 66, 3, hex('#c8963a'));
  // la rueda vieja en su soporte (izquierda): la misma forma, pero gastada, con verdín y dientes rotos
  const cx = 98, cy = 118; rp(cx - 3, cy, cx + 3, 150, K); rp(cx - 2, cy, cx + 2, 150, hex('#5a5a66')); rp(cx - 16, 148, cx + 16, 154, K); rp(cx - 15, 149, cx + 15, 153, hex('#3a3a44'));
  rueda(cx, cy, 26, 40, 0.2, BR.v, BR.vS, BR.vL, { diente: 3 });
  for (let k = 0; k < 40; k++) if (H_(k, 1, 59) < 0.35) { const a = 0.2 + (k + 0.5) * 2 * Math.PI / 40; R.disco(cx + Math.cos(a) * 28.5, cy + Math.sin(a) * 28.5, 2.2, hex('#3a5a3a')); }
  for (let y = cy - 30; y <= cy + 30; y++) for (let x = cx - 30; x <= cx + 30; x++) { const d = Math.hypot(x - cx, y - cy); if (d < 26 && d > 6 && vn(x, y, 5, 60) > 0.62) R.pset(x, y, H_(x, y, 61) > 0.5 ? BR.bS : hex('#8a6a3a')); }
  // la rueda nueva, de dientes finos: la mano la trae en «finer» y brilla
  const ll = ease(tramo(t, A_(22.6), A_(23.3))), nx = lerp(330, 222, ll), ny = lerp(160, 128, ll), g = (t - P5) * 0.3;
  if (ll > 0) { rueda(nx, ny, 26, 40, g, BP.b, BP.s, BP.l, { diente: 3 }); R.disco(nx, ny, 5, K); R.disco(nx, ny, 4, BP.l); if (t > A_(23.3) && t < A_(24.4)) { const s = Math.sin(t * 12) > 0 ? 1 : 0; for (const [dx, dy] of [[-16, -18], [18, -12], [8, 20]]) { R.linea(nx + dx - 3 - s, ny + dy, nx + dx + 3 + s, ny + dy, BL); R.linea(nx + dx, ny + dy - 3 - s, nx + dx, ny + dy + 3 + s, BL); } }
    T.brazo(R, Math.round(nx + 60), 196, Math.round(nx + 30), Math.round(ny + 14), '#6a4a8a', -1, { codo: [Math.round(nx + 54), Math.round(ny + 40)] }); }
  // el «?» grande en «question is still open»
  const q = tramo(t, A_(24.85), A_(25.2)); if (q > 0) { const y = 70 - Math.round(Math.sin(Math.min(1, q) * Math.PI) * 4); R.disco(160, y, 14 * Math.min(1, q * 1.4), K); R.disco(160, y, 13 * Math.min(1, q * 1.4), BL); if (q > 0.5) R.icono('?', 155, y - 7, hex('#3a5ac8'), hex('#1a2a6a'), 2); }
  polvo(t, 110, 40, 200, 170, 10, 5);
};

// ── 6 · el estudio de Atom: su mecanismo de cartón se atasca ──
const p6 = (t) => {
  const o = { encuadre: 'estudio', gira: ease(tramo(t, A_(26.6), A_(29.9))), atasco: tramo(t, A_(29.9), A_(31.2)) }; const g = T.hoy(R, t, o);
  T.hoyDelante(R, t, o);
  // el guante de Atom en la manivela: baja, gira, y se aparta cuando se atasca; «?» al final
  const [mx, my] = g.manivela || [182, 117], b = ease(tramo(t, P6, A_(26.7))), sa = ease(tramo(t, A_(30.3), A_(30.9)));
  guante(lerp(lerp(300, mx + 8, b), mx + 30, sa), lerp(lerp(30, my, b), my - 26, sa));
  if (t > A_(30.6)) { const a = tramo(t, A_(30.6), A_(30.9)); R.disco(mx + 36, my - 46, 9 * a, K); R.disco(mx + 36, my - 46, 8 * a, BL); if (a > 0.6) R.icono('?', mx + 31, my - 53, hex('#3a5ac8'), hex('#1a2a6a'), 2); }
};

// ── 7 · el aula con el globo ──
const p7 = (t) => {
  const o = { encuadre: 'ordenador', camara: 'globo', gira: ease(tramo(t, A_(32.5), A_(35.2))) }; T.hoy(R, t, o);
  R.actor(EL.profesor, 170, 162, t, { dir: 1, dedo: t > A_(32.6) && t < A_(34.9), habla: t > A_(33.0) && t < A_(34.4) && bla(t), sonrisa: t > A_(34.4) });
  // la alumna levanta la mano en «Maybe both»; el alumno mira el globo
  R.actor(EL.alumna, 26, 172, t, { dir: 1, dedo: t > A_(31.4) && t < A_(32.4), sonrisa: t > A_(32.6) }); R.actor(EL.alumno, 58, 172, t, { dir: 1, sorpresa: t > A_(33.0) && t < A_(33.6), sonrisa: t > A_(33.6) });
  T.hoyDelante(R, t, o);
};

// ── 8 · el planetario con la réplica ──
const EST8 = Array.from({ length: 70 }, (_, i) => [H_(i, 1, 81) * Math.PI - Math.PI, 30 + H_(i, 2, 81) * 120]);
const fondo8 = () => capa('planet', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 160, (y - 150) * 1.3) / 190; R.pset(x, y, mez(hex('#1a1a4a'), hex('#06061a'), Math.min(1, d + (b4(x, y) - 0.5) * 0.1))); }
  // el borde de la cúpula, las butacas del fondo y la moqueta
  for (let a = Math.PI; a < Math.PI * 2; a += 0.003) { const x = 160 + Math.cos(a) * 176, y = 150 + Math.sin(a) * 150; if ((x > 18 && x < 172 && y < 22) || (x > 270 && y < 50)) continue; R.pset(Math.round(x), Math.round(y), hex('#2a2a5a')); }
  rp(0, 138, 319, 179, hex('#2a1a3a')); for (let y = 140; y < 180; y += 3) for (let x = (y % 6); x < 320; x += 6) R.pset(x, y, hex('#3a2a4a'));
  for (let i = 0; i < 14; i++) { const x = 10 + i * 23; rp(x, 128, x + 16, 140, K); rp(x + 1, 129, x + 15, 139, hex('#6a2a3a')); R.linea(x + 1, 129, x + 15, 129, hex('#8a3a4a')); }
  // el pedestal de la réplica
  rp(132, 108, 188, 150, K); rp(133, 109, 187, 149, hex('#3a3a50')); R.linea(133, 109, 187, 109, hex('#5a5a78')); R.linea(160, 112, 160, 146, hex('#2a2a40'));
  calma(hex('#10102e'));
});
const p8 = (t) => {
  fondo8();
  // las estrellas proyectadas en la cúpula que giran despacio; en «explain the sky» se encienden las constelaciones
  const gi = (t - P8) * 0.04, con = tramo(t, A_(35.5), A_(36.3)), P = EST8.map(([a, r]) => [160 + Math.cos(a + gi) * r * 1.3, 150 + Math.sin(a + gi) * r]);
  for (const [x, y] of P) if (y < 126 && !(x > 270 && y < 50) && !(x > 18 && x < 172 && y < 22)) R.pset(Math.round(x), Math.round(y), Math.sin(t * 3 + x) > 0 ? BL : hex('#a8b0e0'));
  if (con > 0) { R.recorte([0, 22, 268, 126]); for (const [i, j] of [[0, 3], [3, 7], [7, 12], [12, 18], [20, 24], [24, 29], [29, 33], [40, 44], [44, 47], [47, 52]]) { const [a, b] = [P[i], P[j]]; if (H_(i, j, 3) < con * 1.2) R.linea(a[0], a[1], b[0], b[1], hex('#5a7ad8'), 2); } R.recorte(null); }
  // la réplica grande en su pedestal, con su manivela que gira la guía; la esfera brilla
  cajaMaq(160, 108, 2.4, 0.3 + 0.3 * Math.sin(t * 2)); const ma = (t - P8) * 2.4; R.linea(198, 82, 198 + Math.cos(ma) * 6, 82 + Math.sin(ma) * 6, K); R.disco(198 + Math.cos(ma) * 6, 82 + Math.sin(ma) * 6, 2, BR.o);
  // la Luna proyectada que cruza la cúpula (con su haz desde la réplica)
  const lu = tramo(t, A_(35.8), A_(38.6)), la = Math.PI * (1.1 + 0.75 * lu), lx = 160 + Math.cos(la) * 140, ly = 140 + Math.sin(la) * 110; if (lu > 0 && lu < 1) { for (let k = 0; k < 40; k++) { const u = k / 40; R.pset(Math.round(lerp(156, lx, u)), Math.round(lerp(64, ly, u)), mez(R.pget(Math.round(lerp(156, lx, u)), Math.round(lerp(64, ly, u))), hex('#a8b8f0'), 0.35)); } lunaF(lx, ly, 6, 0.4 + lu * 0.3, hex('#10102e')); }
  // la guía junto a la manivela; los niños sentados que miran arriba
  R.actor(EL.visitante2, 216, 160, t, { dir: -1, habla: t > A_(35.6) && t < A_(37.6) && bla(t), dedo: t > A_(37.0) && t < A_(38.6), sonrisa: t > A_(38.6) });
  const kids = [[EL.nina, 40], [EL.alumno, 70], [EL.alumna, 100], [EL.chico, 250], [EL.chicaHoy || EL.turista, 280]];
  kids.forEach(([d, x], i) => R.actor(d, x, 172, t, { dir: x < 160 ? 1 : -1, sorpresa: t > A_(35.6) + i * 0.15 && t < A_(36.5) + i * 0.15, sonrisa: t > A_(36.5) + i * 0.15 }));
  for (let i = 0; i < 6; i++) { const x = 6 + i * 54; rp(x, 172, x + 40, 180, K); rp(x + 1, 173, x + 39, 179, hex('#4a2a5a')); R.linea(x + 1, 173, x + 39, 173, hex('#6a3a7a')); }
};

const efectos = [[0.3, 'ola'], [A_(2.1), 'interruptor'], [A_(5.8), 'palmada'],
  [P2 + 0.1, 'tecleo', { dur: 1.4 }], [A_(7.5), 'bip'], [A_(9.4), 'pop'],
  [P3 + 0.1, 'maquina', { dur: 2, ritmo: 7 }], [A_(15.02), 'golpecito'], [A_(15.1), 'aviso'], [A_(15.8), 'pop'], [A_(16.2), 'brillo'],
  [P4 + 0.2, 'zumbido'], [A_(18.4), 'tic'], [A_(19.85), 'pop'], [A_(21.3), 'burbujas', { dur: 1.2 }],
  [P5 + 0.2, 'whoosh'], [A_(23.3), 'brillo'], [A_(24.85), 'pop'],
  [A_(26.7), 'carro', { largo: 1.6 }], [A_(29.9), 'golpecito'], [A_(30.3), 'boing'],
  [A_(32.6), 'tic'], [A_(33.2), 'carro', { largo: 1.6 }],
  [A_(35.6), 'brillo'], [A_(36.4), 'publico', { dur: 1.5 }], [A_(37.6), 'brillo']];
const año = (t) => t < P6 ? 2025 : 2026;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { efectos, año });
''')

# ───────────────────────────────────────────── AK-CIERRE ─────────────────────────────────────────────
E['ak-cierre'] = ('El cierre', '''// AK-CIERRE (frases 31–33), sin cartela; el año dice la verdad de cada plano. Siete planos:
// 1. (0 → «nothing») maquina 'atras' general (2.ª vez; la otra en ak-espirales, con el paño): el guante de Atom toca la
//    placa en «astonishing» y se encienden las marcas de eclipse una a una; corren los atletitas de los Juegos y las agujas.
// 2. («nothing» → pausa) antigua 'reloj' general, o.siglos: los hitos de mil cuatrocientos años se plantan de la cajita
//    al reloj; un monje con su vela cruza la plaza y en «astronomical clocks» señala la esfera y suena la campana.
// 3. (pausa → «It wasn't») museo 'sala1902' cámara 'grieta' (2.ª vez; la otra en ak-terron, sin lupa; aquí con la lupa del
//    decorado): en «mystery» se abre la grieta y brilla la rueda; en «could be lost» la luz se apaga y cae el polvo.
// 4. («It wasn't» → «wrote») fondo local: una noche con tres miradores: el zigurat de Babilonia, la colina griega y la
//    torre de un monasterio; el cielo gira; en «people who watched the sky» señalan arriba, uno tras otro, el babilonio,
//    Hiparco y el monje; una estrella fugaz en «out of this world».
// 5. («wrote» → «And sometimes») antigua 'reloj' cámara 'tablillas', o.apunta (2.ª vez; la otra en ak-espirales): el
//    babilonio apunta en «wrote down»; en «fit it inside a box» las tablillas y los rollos vuelan a un cofre, la tapa se
//    cierra y el cofre se vuelve la caja de la máquina, con su brillo.
// 6. («And sometimes» → «and someone») mar 'cala' general, tormenta (2.ª vez; la otra en ak-buzos, entrando; aquí
//    fondeado, con la bomba): rayo en «storm»; en «sponge divers» Stadiatis baja por la escalerilla y Kontos le señala.
// 7. («and someone» → fin) hoy 'estudio' cámara 'carton', o.final (2.ª vez; la otra en ak-manivela): el guante de Atom
//    coge el lápiz-manivela en «looks at a lump of bronze», las ruedas de cartón giran por fin sin atascarse y en «sees a
//    gear» la Luna de cartón sale volando por arriba, hacia la ventana.''', PRE + MIO + r'''
const C_ = (s) => s < 12.5 ? en('siglos', (s - 0.9) / 10.418) : s < 27.8 ? en('misterio', (s - 13.233) / 14.328) : en('final', (s - 28.061) / 8.103);
const P2 = C_(4.4), P3 = C_(11.2), P4 = C_(18.0), P5 = C_(23.5), P6 = C_(28.0), P7 = C_(32.7);

// ── 1 · la parte de atrás: todo se enciende ──
const p1 = (t) => {
  const o = { encuadre: 'atras', eclipses: ease(tramo(t, C_(1.6), C_(3.8))), juegos: 1, aguja: [0.15 + tramo(t, 0, P2) * 0.5, 0.1 + tramo(t, 0, P2) * 0.4], giro: t * 0.08 }; const g = T.maquina(R, t, o);
  polilla(46, 116, t, 3);
  // el guante de Atom baja y toca la placa en «astonishing»; se aparta en «After this machine»
  const m = (g.marcas && g.marcas[0]) || [130, 150], b = ease(tramo(t, C_(0.9), C_(1.6))), sa = ease(tramo(t, C_(3.0), C_(3.8)));
  guante(lerp(lerp(300, m[0] + 12, b), 300, sa), lerp(lerp(28, m[1], b), 28, sa));
  if (t > C_(1.6) && t < C_(2.0)) R.anillo(m[0] + 0.5, m[1] + 0.5, 4 + (t - C_(1.6)) * 30, hex('#fff6c8'));
  // un brillo que cruza la placa en «After this machine»
  const bx = lerp(60, 280, tramo(t, C_(3.0), C_(4.3))); if (bx > 60 && bx < 280) for (let y = 18; y < 180; y++) for (let i = -3; i <= 3; i++) { const x = Math.round(bx + i + (y - 100) * 0.3); if (x > 96 && x < 225) R.pset(x, y, mez(R.pget(x, y), hex('#fff6d8'), 0.22 * (1 - Math.abs(i) / 4))); }
};

// ── 2 · la plaza del reloj astronómico: mil cuatrocientos años ──
const p2 = (t) => {
  const o = { encuadre: 'reloj', siglos: ease(tramo(t, C_(4.6), C_(9.4))) }; T.antigua(R, t, o);
  // el monje con su vela cruza la plaza y señala el reloj en «astronomical clocks»
  const an = ease(tramo(t, P2, C_(8.6))), x = Math.round(lerp(84, 170, an)), señ = t > C_(9.1);
  R.actor(EL.monje, x, 160, t, { dir: 1, anda: an > 0 && an < 1, dedo: señ, sorpresa: t > C_(9.6) && t < C_(10.2), sonrisa: t > C_(10.2) });
  // un niño corre a mirar cuando suena la campana
  const nx = Math.round(lerp(250, 216, ease(tramo(t, C_(9.6), C_(10.6))))); R.actor(EL.ninoCampo || EL.nina, nx, 160, t, { dir: -1, anda: t > C_(9.6) && t < C_(10.6), sorpresa: t > C_(10.6) });
  panelNum(112, 46, '1400', tramo(t, C_(6.94), C_(7.25)) * (1 - tramo(t, C_(9.4), C_(9.6))), { w: 72, h: 24 });
  // la campana: ondas en «clocks»
  if (t > C_(9.6) && t < C_(11.0)) { const u = ((t - C_(9.6)) * 2) % 1; R.anillo(204.5, 36.5, 6 + u * 12, mez(hex('#ffe070'), hex('#b8d0e8'), u)); }
  T.antiguaDelante(R, t, o);
};

// ── 3 · la grieta: el misterio ──
const p3 = (t) => {
  const o = { encuadre: 'sala1902', camara: 'grieta', grieta: ease(tramo(t, C_(13.5), C_(16.4))) }; T.museo(R, t, o);
  // en «could be lost» la luz se apaga y cae el polvo
  const ap = tramo(t, C_(16.6), C_(17.9)); if (ap > 0) { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (b4(x, y) < ap * 0.5 && !(x > 270 && y < 50)) R.pset(x, y, mez(R.pget(x, y), hex('#2a2420'), 0.45)); }
  for (let k = 0; k < 26; k++) { const ph = (t * (0.12 + H_(k, 1, 3) * 0.1) + H_(k, 2, 3)) % 1, x = 40 + H_(k, 3, 3) * 240 + Math.sin(t + k) * 4; if (k < 10 || ap > 0) R.pset(Math.round(x), Math.round(10 + ph * 160), hex('#e8dcc0')); }
};

// ── 4 · tres miradores a lo largo de los siglos ──
const POLO = [212, 46];
const fondo4 = () => capa('miradores', () => {
  degr(0, 0, 319, 130, [hex('#060818'), hex('#0e1430'), hex('#1e2450')]);
  // la Vía Láctea en diagonal
  for (let y = 0; y < 130; y++) for (let x = 0; x < 320; x++) { const d = Math.abs((x - 40) * 0.45 - y + 10) / 26; if (d < 1 && vn(x, y, 7, 5) > 0.45 + d * 0.3 && !(x > 18 && x < 172 && y < 22) && !(x > 270 && y < 50)) R.pset(x, y, mez(R.pget(x, y), hex('#5a5a8a'), 0.5 * (1 - d))); }
  // los montes y llanos en tres términos
  for (let x = 0; x < 320; x++) { const h1 = 112 + Math.round(Math.sin(x * 0.03) * 6 + Math.sin(x * 0.11) * 2), h2 = 130 + Math.round(Math.sin(x * 0.05 + 1) * 5), h3 = 152 + Math.round(Math.sin(x * 0.07 + 2) * 3);
    R.linea(x, h1, x, 179, hex('#141a30')); R.linea(x, h2, x, 179, hex('#1a2238')); R.linea(x, h3, x, 179, hex('#222a3e')); if (H_(x, 1, 6) > 0.7) R.pset(x, h3 + 2 + (x % 5), hex('#2e3850')); }
  // el zigurat de Babilonia (izquierda)
  for (let k = 0; k < 4; k++) { const w = 40 - k * 9, y = 150 - k * 10; rp(56 - w, y - 10, 56 + w, y, K); rp(57 - w, y - 9, 55 + w, y - 1, hex(k % 2 ? '#8a6a4a' : '#7a5a3e')); for (let x = 58 - w; x < 55 + w; x += 4) R.pset(x, y - 5, hex('#5a4030')); } rp(52, 112, 60, 150, hex('#6a5038'));
  // la colina griega con un pequeño templo (centro)
  R.poligono([[110, 160], [160, 128], [210, 160]], hex('#2a3446')); rp(138, 118, 182, 128, K); for (let i = 0; i < 6; i++) rp(140 + i * 8, 112, 143 + i * 8, 127, hex('#c8c0a8')); R.poligono([[136, 112], [160, 102], [184, 112]], hex('#d8d0b8'));
  // la torre del monasterio con su ventana encendida (derecha)
  rp(250, 86, 276, 160, K); sillares(251, 87, 275, 160, 5, 9, hex('#6a6a7a'), hex('#4a4a5a'), hex('#8a8a9a'), 7); R.poligono([[248, 86], [263, 66], [278, 86]], hex('#4a2a2a')); rp(260, 100, 266, 110, hex('#e8b850'));
  rp(276, 120, 318, 160, K); sillares(277, 121, 318, 160, 5, 9, hex('#5a5a6a'), hex('#3e3e4e'), hex('#7a7a8a'), 8); rp(290, 132, 296, 140, hex('#e8b850')); rp(304, 132, 310, 140, hex('#d8a840'));
  // casitas del llano con luz
  for (const [x, y] of [[96, 150], [206, 156], [222, 152]]) { rp(x, y, x + 12, y + 9, K); rp(x + 1, y + 1, x + 11, y + 8, hex('#4a4050')); R.poligono([[x - 2, y], [x + 6, y - 6], [x + 14, y]], hex('#5a3030')); rp(x + 4, y + 3, x + 6, y + 5, hex('#ffd860')); }
  // el camino que sube a la colina y los muros de piedra de los campos
  for (let k = 0; k < 60; k++) { const u = k / 60, x = Math.round(lerp(96, 150, u) + Math.sin(u * 6) * 6), y = Math.round(lerp(178, 140, u)); R.pset(x, y, hex('#3a4258')); R.pset(x + 1, y, hex('#2e364c')); }
  for (let x = 0; x < 320; x += 2) { const y = 166 + Math.round(Math.sin(x * 0.04) * 3); if (x % 40 < 30) R.pset(x, y, hex('#3a4258')); }
});
const p4 = (t) => {
  fondo4();
  // las estrellas que giran alrededor del polo (el cielo de los siglos)
  const gi = (t - P4) * 0.06; for (let i = 0; i < 90; i++) { const r = 8 + H_(i, 1, 41) * 190, a = H_(i, 2, 41) * Math.PI * 2 + gi, x = POLO[0] + Math.cos(a) * r * 1.2, y = POLO[1] + Math.sin(a) * r;
    if (y > 118 || y < 0 || x < 0 || x > 319 || (x > 18 && x < 172 && y < 22) || (x > 270 && y < 50)) continue; for (let k = 1; k < 4; k++) { const xx = POLO[0] + Math.cos(a - k * 0.012) * r * 1.2, yy = POLO[1] + Math.sin(a - k * 0.012) * r; R.pset(Math.round(xx), Math.round(yy), hex('#3a4070')); }
    R.pset(Math.round(x), Math.round(y), Math.sin(t * 3 + i) > 0.3 ? BL : hex('#a8b0d8')); }
  R.disco(POLO[0], POLO[1], 1.5, BL);
  // cipreses y olivos que se mecen; ovejas que pastan en el llano
  for (const [x, h, k] of [[102, 22, 1], [194, 18, 2], [244, 26, 3], [12, 20, 4]]) cipres(x, 162 - (x === 194 ? 6 : 0), h, t, k);
  olivo(126, 168, t, 0.8, 1); olivo(306, 176, t, 0.7, 2);
  for (const [x, y, k] of [[150, 172, 0], [166, 175, 1], [182, 171, 2]]) { const c = Math.sin(t * 1.5 + k) > 0.5 ? 1 : 0; rp(x - 4, y - 3, x + 3, y, hex('#c8c8d0')); R.linea(x - 4, y - 3, x + 3, y - 3, BL); rp(x + 3 + 0, y - 3 + c, x + 5, y - 1 + c, hex('#3a3a44')); R.pset(x - 3, y + 1, K); R.pset(x + 2, y + 1, K); }
  // la Luna que sale y la estrella fugaz en «out of this world»
  lunaF(30, 60 - tramo(t, P4, P5) * 10, 7, 0.45, hex('#0e1430'));
  const fu = tramo(t, C_(19.9), C_(20.5)); if (fu > 0 && fu < 1) { const x = lerp(200, 120, fu), y = lerp(60, 96, fu); for (let k = 0; k < 10; k++) R.pset(Math.round(x + k * 3), Math.round(y - k * 1.35), mez(BL, hex('#1e2450'), k / 10)); }
  // los tres que miran el cielo: señalan arriba uno tras otro en «people who watched the sky … for centuries»
  R.actor(EL.babilonioAK, 56, 112, t, { dir: 1, dedo: t > C_(21.3), sonrisa: t > C_(22.0) });
  R.actor(EL.hiparcoAK, 160, 128, t, { dir: -1, dedo: t > C_(21.9), habla: t > C_(18.5) && t < C_(20.4) && bla(t, 5) });
  R.actor(EL.monje, 230, 160, t, { dir: 1, dedo: t > C_(22.6), sorpresa: t > C_(19.9) && t < C_(20.5) });
  // un perro tumbado junto a la torre que levanta la cabeza
  const pe = Math.sin(t * 2) > 0.6 ? 1 : 0; rp(284, 164, 298, 170, K); rp(285, 165, 297, 169, hex('#8a6a4a')); R.disco(298, 164 - pe, 3, hex('#8a6a4a')); R.pset(299, 163 - pe, K); R.pset(296, 161 - pe, hex('#6a4a2a'));
};

// ── 5 · las tablillas: todo cabe en una caja ──
const COFRE = [88, 170];
const p5 = (t) => {
  const o = { encuadre: 'reloj', camara: 'tablillas', apunta: ease(tramo(t, C_(23.6), C_(25.0))) }; T.antigua(R, t, o);
  // el babilonio apunta en su tablilla y luego mira volar las cosas
  R.actor(EL.babilonioAK, 176, 160, t, { dir: t < C_(25.2) ? 1 : -1, habla: t > C_(23.6) && t < C_(25.0) && bla(t, 6), sorpresa: t > C_(25.3) && t < C_(26.4), sonrisa: t > C_(26.9) });
  // el cofre: abierto hasta «box», luego se cierra y se vuelve la caja de la máquina
  const cierra = tramo(t, C_(26.6), C_(26.95)), magia = tramo(t, C_(26.95), C_(27.3)), [cx, cy] = COFRE;
  if (magia < 1) { rp(cx - 20, cy - 18, cx + 20, cy, K); tablas(cx - 19, cy - 17, cx + 19, cy - 1, 5, hex('#7a4a2a'), hex('#4e2e18'), hex('#a8703e'), 11); rp(cx - 20, cy - 10, cx + 20, cy - 9, hex('#c8963a'));
    const ang = (1 - cierra) * 1.9; const lx = cx - 20, ly = cy - 18; R.poligono([[lx, ly], [lx + Math.cos(-ang) * 40, ly + Math.sin(-ang) * 40], [lx + Math.cos(-ang) * 40 + Math.sin(ang) * 6, ly + Math.sin(-ang) * 40 - Math.cos(ang) * 6 + 6], [lx + 0, ly + 6]], hex('#5a3420')); }
  if (magia > 0) { cajaMaq(cx, cy, 1.1, magia); if (magia < 1) R.anillo(cx + 0.5, cy - 12.5, 10 + magia * 20, hex('#ffe070')); }
  // las tablillas y los rollos vuelan al cofre en «fit it inside a box»
  const COSAS = [[206, 128, 'tab'], [232, 137, 'rollo'], [190, 150, 'tab'], [268, 148, 'rollo'], [212, 150, 'tab']];
  COSAS.forEach(([x0, y0, k], i) => { const u = ease(tramo(t, C_(25.3) + i * 0.24, C_(25.9) + i * 0.24)); if (u <= 0 || u >= 1) return; const x = lerp(x0, cx, u), y = lerp(y0, cy - 10, u) - Math.sin(u * Math.PI) * 30;
    if (k === 'tab') { rp(x - 4, y - 5, x + 4, y + 5, K); rp(x - 3, y - 4, x + 3, y + 4, hex('#c8a878')); R.pset(Math.round(x - 1), Math.round(y - 2), hex('#6a5038')); R.pset(Math.round(x + 1), Math.round(y), hex('#6a5038')); }
    else { rp(x - 6, y - 2, x + 6, y + 2, K); rp(x - 5, y - 1, x + 5, y + 1, hex('#e8dcb8')); R.pset(Math.round(x - 6), Math.round(y), hex('#8a6a3a')); R.pset(Math.round(x + 6), Math.round(y), hex('#8a6a3a')); } });
  T.antiguaDelante(R, t, o);
};

// ── 6 · la tormenta y los buzos ──
const p6 = (t) => {
  const o = { encuadre: 'cala', tormenta: 1, entra: 1, bomba: 1 }; const g = T.mar(R, t, o), dx = g.dx ?? 0, s = g.suelo ?? 150, [ex, ey] = g.escalera || [225, 146];
  // Kontos señala al buzo; Stadiatis baja por la escalerilla en «sponge divers»
  R.actor(EL.kontosAK, 168 + dx, s, t, { dir: 1, dedo: t > C_(31.5), sorpresa: t > C_(30.88) && t < C_(31.4), habla: t > C_(28.3) && t < C_(30.6) && bla(t) });
  const baja = ease(tramo(t, C_(31.5), C_(32.6))); R.actor(EL.stadiatisAK, ex + dx, Math.round(lerp(s, s + 20, baja)), t, { dir: -1, quieto: baja > 0 && baja < 1 });
  T.marDelante(R, t, o);
  // el rayo en «storm»
  const ra = tramo(t, C_(30.85), C_(31.25)); if (ra > 0 && ra < 1) { const v = ra < 0.3 ? 0.5 : (1 - ra) * 0.4; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (b4(x, y) < v) R.pset(x, y, mez(R.pget(x, y), BL, 0.5));
    R.linea(120, 30, 128, 52, BL); R.linea(128, 52, 118, 64, BL); R.linea(118, 64, 126, 90, BL); R.linea(121, 30, 129, 52, hex('#c8d8ff')); }
};

// ── 7 · el mecanismo de cartón gira por fin ──
const p7 = (t) => {
  const o = { encuadre: 'estudio', camara: 'carton', final: t < C_(35.2) ? 0.2 * tramo(t, C_(34.0), C_(35.2)) : 0.2 + 0.65 * tramo(t, C_(35.2), C_(36.6)) }; const g = T.hoy(R, t, o);
  const [mx, my] = g.manivela || [230, 70], b = ease(tramo(t, P7, C_(33.9)));
  guante(lerp(300, mx, b), lerp(26, my, b));
  // un brillo en la rueda grande en «sees a gear»
  const br = tramo(t, C_(35.3), C_(35.7)); if (br > 0 && br < 1) { const s = Math.round(br * 8); R.linea(104 - s, 114, 104 + s, 114, BL); R.linea(104, 114 - s, 104, 114 + s, BL); R.anillo(104.5, 114.5, 33 + br * 6, hex('#fff6c8')); }
};

const efectos = [[C_(1.6), 'brillo'], [C_(2.1), 'tic'], [C_(3.6), 'whoosh'],
  [C_(5.2), 'aldea', { k: 0 }], [C_(6.2), 'aldea', { k: 2 }], [C_(7.2), 'aldea', { k: 4 }], [C_(8.2), 'aldea', { k: 5 }], [C_(9.6), 'campana', { nota: 57 }], [C_(10.4), 'campana', { nota: 62 }],
  [C_(13.6), 'toc'], [C_(14.6), 'golpecito'], [C_(15.4), 'brillo'],
  [P4 + 0.3, 'viento', { dur: 1.5 }], [C_(19.9), 'brillo'],
  [C_(23.7), 'lapiz'], [C_(24.4), 'lapiz'], [C_(25.4), 'whoosh'], [C_(25.9), 'papel'], [C_(26.4), 'papel'], [C_(26.9), 'cerrojo'], [C_(27.1), 'brillo'],
  [P6 + 0.05, 'lluvia'], [C_(30.88), 'trueno'], [C_(31.7), 'burbujas', { dur: 1.2 }],
  [C_(34.0), 'carro', { largo: 2.2 }], [C_(35.2), 'whoosh'], [C_(35.3), 'brillo']];
const año = (t) => t < P2 ? null : t < P3 ? null : t < P4 ? 1902 : t < P6 ? null : t < P7 ? 1900 : 2026;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')
