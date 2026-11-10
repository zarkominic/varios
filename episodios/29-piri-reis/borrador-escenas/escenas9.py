E = {}
COMUN = r'''
const K = hex('#1c1424');
const NOG = [hex('#5a3420'), hex('#432414'), hex('#6e4229'), hex('#2e180c')];
const PERG = [hex('#e8d4a4'), hex('#d8c08c'), hex('#b89a64'), hex('#f2e2b8')], TIN = hex('#2a2018'), TROJA = hex('#a83224'), TVERDE = hex('#3a6a3a');
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const tr = (x, y, a) => a * 16 > BAY[((y & 3) << 2) | (x & 3)] + 0.5;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const CAPAS = new Map();
// la capa fija de un plano: se pinta una vez en su búfer y en cada fotograma se copia entera
const capa = (k, pintar) => { let b = CAPAS.get(k); if (!b) { b = R.nuevo(); const prev = R.usar(b); pintar(); R.usar(prev); CAPAS.set(k, b); } R.copiar(b); return b; };
// la capa sin copiarla (para mezclar dos búferes a mano)
const capaB = (k, pintar) => { let b = CAPAS.get(k); if (!b) { b = R.nuevo(); const prev = R.usar(b); pintar(); R.usar(prev); CAPAS.set(k, b); } return b; };
// la capa de delante: solo se copian los píxeles pintados (el búfer nuevo empieza vacío)
const delante = (k, pintar) => { const b = capaB(k, pintar), B = R.buf; for (let i = 0; i < 57600; i++) if (b[i]) B[i] = b[i]; return b; };
// devuelve un trozo de una capa a la pantalla (para lo que va delante de un personaje)
const restaurar = (b, x0, y0, x1, y1) => { const B = R.buf; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = b[y * 320 + x]; };
const grad = (x0, y0, x1, y1, cols) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i; for (let x = x0; x <= x1; x++) R.pset(x, y, tr(x, y, f) ? cols[i + 1] : cols[i]); } };
const caja = (x0, y0, x1, y1, c, borde = K) => { R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, borde); R.rect(x0, y0, x1, y1, c); };
const sombrear = (x0, y0, x1, y1, c, a) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (tr(x, y, a)) R.pset(x, y, c); };
const oscurecer = (x0, y0, x1, y1, a, c = K) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) R.pset(x, y, mez(R.pget(x, y), c, a)); };
// un halo de luz: mezcla hacia c con caída radial (sin tramas duras)
const halo = (cx, cy, r, c, a) => { for (let y = Math.max(0, Math.round(cy - r)); y <= Math.min(179, Math.round(cy + r)); y++) for (let x = Math.max(0, Math.round(cx - r)); x <= Math.min(319, Math.round(cx + r)); x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1) R.pset(x, y, mez(R.pget(x, y), c, a * (1 - d) * (1 - d))); } };
// madera de tablas horizontales con vetas, nudos y juntas: cols = [base, sombra, luz, junta]
const madera = (x0, y0, x1, y1, cols, alto = 9, k = 0) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / alto), j = (y - y0) % alto; for (let x = x0; x <= x1; x++) {
  let c = cols[0]; const v = Math.sin(x * 0.09 + fila * 3.1 + Math.sin(x * 0.023 + fila) * 2.4 + j * 0.7);
  if (v > 0.82) c = cols[1]; else if (v < -0.9) c = cols[2]; if (hh(x >> 1, y, k + fila) > 0.97) c = cols[1];
  if (j === 0) c = cols[3]; else if (j === 1) c = cols[2]; if ((x + fila * 37 + k * 11) % 71 === 0 && j > 0) c = cols[3];
  R.pset(x, y, c); } }
  for (let n = 0; n < (x1 - x0) * (y1 - y0) / 900; n++) { const nx = x0 + Math.round(hh(n, 1, k + 50) * (x1 - x0)), ny = y0 + Math.round(hh(n, 2, k + 50) * (y1 - y0)); R.disco(nx, ny, 1.6, cols[1]); R.pset(nx, ny, cols[3]); } };
// yeso o estuco con manchas, puntos y alguna grieta: cols = [base, sombra, luz]
const yeso = (x0, y0, x1, y1, cols, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = hh(x >> 3, y >> 3, k) * 0.6 + hh(x >> 1, y >> 1, k + 1) * 0.4;
  R.pset(x, y, n > 0.78 && tr(x, y, 0.5) ? cols[1] : n < 0.16 && tr(x, y, 0.5) ? cols[2] : hh(x, y, k + 2) > 0.985 ? cols[1] : cols[0]); }
  for (let g = 0; g < 3; g++) { let gx = x0 + 20 + hh(g, 9, k) * (x1 - x0 - 40), gy = y0 + 6 + hh(g, 8, k) * (y1 - y0 - 20); for (let i = 0; i < 14; i++) { R.pset(Math.round(gx), Math.round(gy), cols[1]); gx += hh(g, i, k + 3) - 0.5; gy += 0.8; } } };
// suelo de tablas en perspectiva suave (de y0 a y1), con juntas y brillo
const tablas = (y0, y1, cols, k = 0) => { for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / 6); for (let x = 0; x < 320; x++) { const off = (f * 53 + k) % 47, j = (x + off) % 47 === 0;
  R.pset(x, y, (y - y0) % 6 === 0 ? cols[3] : j ? cols[3] : hh(x >> 2, y, k + f) > 0.93 ? cols[1] : Math.sin(x * 0.07 + f * 2.3) > 0.9 ? cols[2] : cols[0]); } } };
const nube = (cx, cy, w, c1, c2, c3) => {
  const r = w / 5, P = [[-1.6, .4, .9], [-.6, -.2, 1.2], [.6, -.4, 1.3], [1.6, .3, 1], [0, .5, 1.1]];
  for (const [a, b, q] of P) R.disco(Math.round(cx + a * r), Math.round(cy + b * r + 1), Math.round(q * r), c3);
  for (const [a, b, q] of P) R.disco(Math.round(cx + a * r), Math.round(cy + b * r), Math.round(q * r), c2);
  for (const [a, b, q] of P.slice(1, 3)) R.disco(Math.round(cx + a * r - 1), Math.round(cy + b * r - 1), Math.max(1, Math.round(q * r * .6)), c1);
};
// nubes de tres tonos a tres velocidades dentro de cl (pone y quita el recorte)
const nubes = (cl, t, y0, y1, cols, n = 6, v = 1, w0 = 12) => { R.recorte(cl); for (let k = 0; k < n; k++) { const c3 = k % 3, vel = (1.5 + c3 * 2.5) * v, w = w0 + c3 * 6 + hh(k, 1) * 8, ancho = cl[2] - cl[0] + 2 * w + 20;
  const x = cl[0] - w - 10 + ((hh(k, 2) * ancho + t * vel) % ancho), y = y0 + hh(k, 3) * (y1 - y0); nube(x, y, w, cols[0], cols[1], cols[2]); } R.recorte(null); };
const pajaros = (t, x0, x1, y, n = 3, v = 9, c = K) => { for (let k = 0; k < n; k++) { const x = Math.round(x0 + ((hh(k, 7) * (x1 - x0) + t * v * (1 + (k % 2) * 0.3)) % (x1 - x0))), yy = Math.round(y + hh(k, 8) * 10 + Math.sin(t * 2 + k) * 2), a = Math.sin(t * 11 + k * 2) > 0 ? 1 : 0;
  R.pset(x, yy, c); R.pset(x - 1, yy - a, c); R.pset(x + 1, yy - a, c); R.pset(x - 2, yy - 1 + a, c); R.pset(x + 2, yy - 1 + a, c); } };
// el globo grande de un símbolo (se lee a 640 px): «!», «?» o «X» a escala 2 sobre fondo claro, con su piquito abajo en (x, y)
const globo = (x, y, ic, col = hex('#c8382e')) => { R.rect(x - 9, y - 18, x + 9, y - 1, K); R.rect(x - 8, y - 17, x + 8, y - 2, hex('#fbf6ea')); R.rect(x - 8, y - 3, x + 8, y - 2, hex('#d8d0c0'));
  R.rect(x - 2, y, x + 1, y, K); R.rect(x - 1, y + 1, x, y + 1, K); R.rect(x - 1, y - 1, x, y, hex('#fbf6ea')); R.icono(ic, x - 6, y - 16, col, K, 2); };
const destello = (x, y, u, c = hex('#fff6c0')) => { if (u <= 0 || u >= 1) return; const r = Math.round(2 + 4 * Math.sin(u * Math.PI)); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } R.pset(x - 1, y - 1, c); R.pset(x + 1, y + 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); };
// una polilla que da vueltas alrededor de una luz
const polilla = (cx, cy, t, r = 9) => { const a = t * 3.1, x = Math.round(cx + Math.cos(a) * r + Math.sin(t * 7) * 2), y = Math.round(cy + Math.sin(a * 1.3) * r * 0.6); const al = Math.sin(t * 30) > 0; R.pset(x, y, hex('#5a4a3a')); R.pset(x - 1, y - (al ? 1 : 0), hex('#c8b898')); R.pset(x + 1, y - (al ? 1 : 0), hex('#c8b898')); };
// la llama de una vela que tiembla, con su halo (x, y: la punta del pabilo)
const llama = (x, y, t, k = 0) => { const f = Math.sin(t * 13 + k) * 0.6 + Math.sin(t * 7.3 + k * 2) * 0.4, dx = Math.round(f);
  halo(x, y - 3, 22, hex('#ffd890'), 0.35 + 0.05 * f); R.disco(x + dx * 0.5, y - 3, 2.4, hex('#f0902a')); R.rect(x - 1 + dx, y - 7, x + dx, y - 4, hex('#ffd860')); R.pset(x + dx, y - 8, hex('#fff4c0')); R.rect(x, y - 3, x, y - 1, hex('#fff8e0')); R.pset(x, y, K); };
// una vela en su palmatoria (x, y: la base)
const vela = (x, y, t, alto = 12, k = 0) => { R.rect(x - 7, y - 2, x + 7, y, K); R.rect(x - 6, y - 2, x + 6, y - 1, hex('#b8862a')); R.rect(x - 6, y - 2, x - 2, y - 2, hex('#f0c860'));
  R.rect(x - 3, y - 2 - alto, x + 2, y - 3, K); R.rect(x - 2, y - 1 - alto, x + 1, y - 3, hex('#f4ecd8')); R.rect(x - 2, y - 1 - alto, x - 2, y - 3, hex('#ffffff')); R.rect(x + 1, y - 1 - alto, x + 1, y - 3, hex('#d8cca8')); R.pset(x + 2, y - alto + 3, hex('#f4ecd8'));
  llama(x, y - 2 - alto, t, k); };
// una pluma de escribir con la punta en (x, y), inclinada hacia arriba a la derecha (dx: 1) o a la izquierda (-1)
const pluma = (x, y, dx = 1, c = hex('#f4f0e4')) => { for (let i = 0; i < 18; i++) { const px = x + Math.round(i * 0.55 * dx), py = y - i; R.pset(px, py, i < 3 ? K : hex('#8a7a5a')); if (i > 5) { const w = Math.round(Math.sin((i - 5) / 13 * Math.PI) * 3); for (let s = 1; s <= w; s++) { R.pset(px + s * dx, py + 1, s === w ? hex('#a8a090') : c); R.pset(px - s * dx, py - 1, s === w ? hex('#a8a090') : c); } } } };
// una gota que cae de (x, y0) a (x, y1) con la fracción u
const gota = (x, y0, y1, u, c) => { if (u <= 0 || u >= 1) return; const y = Math.round(y0 + (y1 - y0) * u * u); R.rect(x - 1, y - 1, x + 1, y + 1, c); R.pset(x, y - 2, c); R.pset(x - 1, y - 1, mez(c, hex('#ffffff'), 0.5)); };
// un gato sentado (x, y: los pies), mirando a dir; la cola se mueve
const gato = (x, y, t, dir = 1, col = hex('#4a4048'), luz = hex('#6a6070'), mira = 0) => { const cola = Math.round(Math.sin(t * 2.2) * 3);
  R.disco(x, y - 4, 4, K); R.disco(x, y - 4, 3, col); R.rect(x - 3, y - 2, x + 3, y, K); R.rect(x - 2, y - 2, x + 2, y - 1, col);
  const hx = x + dir * 2, hy = y - 9 - mira; R.disco(hx, hy, 3.2, K); R.disco(hx, hy, 2.4, col); R.pset(hx - 2, hy - 3, K); R.pset(hx + 2, hy - 3, K); R.pset(hx - 2, hy - 2, col); R.pset(hx + 2, hy - 2, col);
  R.pset(hx + dir, hy, hex('#c8e070')); R.pset(hx + dir * 2, hy, K); R.pset(hx - 1, hy - 1, luz);
  for (let i = 0; i < 7; i++) R.pset(x - dir * (4 + i), y - 1 - Math.round(Math.max(0, i - 3) * (0.6 + cola * 0.12)), K); };
'''

# piezas propias de este grupo (se pegan después de COMUN)
COMUN2 = r'''
const suave = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u));
// Atom en el plano, con su halo
const atomEn = (x, y, t, e = 0.4, r = 13) => {
  x = Math.round(x); y = Math.round(y);
  for (let j = -20; j <= 20; j++) for (let i = -20; i <= 20; i++) { const g = 1 - Math.hypot(i, j) / 19; if (g > 0.3 && ((i + j) & 1 || g > 0.6)) R.pset(x + i, y + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(x, y, t, { r, orbita: R.PAL.ATOM[7], energia: e });
};
// un rollo de cartas pequeño para la mano de un chibi (11 × 5)
const rolloMini = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x, y, x + 10, y + 4, K); R.rect(x + 1, y + 1, x + 9, y + 3, PERG[0]); R.rect(x + 1, y + 3, x + 9, y + 3, PERG[2]); R.rect(x + 3, y + 1, x + 3, y + 3, TROJA); R.rect(x + 7, y + 1, x + 7, y + 3, TROJA); R.pset(x + 2, y + 1, PERG[3]); };
// una costa de tinta (línea abierta) y una tierra con aguada tramada y su contorno
const costaT = (pts, c = TIN) => { for (let i = 1; i < pts.length; i++) R.linea(Math.round(pts[i - 1][0]), Math.round(pts[i - 1][1]), Math.round(pts[i][0]), Math.round(pts[i][1]), c); };
const tierra = (pts, c1, c2, tinta = TIN) => { R.poligono(pts, (x, y) => (tr(x, y, 0.25 + 0.25 * hh(x >> 2, y >> 2, 5)) ? c2 : c1)); costaT([...pts, pts[0]], tinta); };
// las islas del Caribe de la carta de Colón (La Española de pie), con origen en (ox, oy); modo 'fantasma': solo el contorno en oro
const CUBA = [[12, 20], [22, 17], [34, 18], [44, 21], [50, 24], [44, 26], [32, 24], [20, 24], [12, 23]];
const ESPA = [[60, 9], [65, 10], [68, 19], [67, 29], [71, 36], [64, 39], [60, 32], [58, 21]];
const JAMA = [[30, 30], [37, 29], [39, 32], [31, 33]], PRIC = [[76, 29], [83, 29], [83, 32], [76, 32]];
const islas = (ox, oy, modo, c = hex('#ffd860')) => {
  const m = (P) => P.map(([x, y]) => [ox + x, oy + y]);
  if (modo === 'fantasma') { for (const P of [CUBA, ESPA, JAMA, PRIC]) { const q = m(P); costaT([...q, q[0]], c); } for (const [x, y] of [[40, 8], [46, 11], [52, 6], [36, 12]]) R.pset(ox + x, oy + y, c); return; }
  tierra(m(CUBA), hex('#c8a060'), hex('#a8c070')); tierra(m(ESPA), hex('#c86a4a'), hex('#e09060')); tierra(m(JAMA), hex('#8ab070'), hex('#c8a060')); tierra(m(PRIC), hex('#d0a050'), hex('#e8c070'));
  for (const [x, y] of [[40, 8], [46, 11], [52, 6], [36, 12], [88, 24], [92, 30]]) { R.rect(ox + x, oy + y, ox + x + 1, oy + y + 1, hex('#c86a4a')); R.pset(ox + x + 1, oy + y + 1, TIN); }
};
// una carabela de tinta pequeña (x, y: la línea de flotación), que cabecea
const carabelaT = (x, y, t, s = 1, c = TIN) => { x = Math.round(x); y = Math.round(y + Math.sin(t * 2.4) * s);
  R.linea(x - 6 * s, y - 2, x + 6 * s, y - 2, c); R.linea(x - 6 * s, y - 2, x - 4 * s, y, c); R.linea(x + 6 * s, y - 2, x + 4 * s, y, c); R.linea(x - 4 * s, y, x + 4 * s, y, c);
  R.linea(x, y - 2, x, y - 10 * s, c); R.poligono([[x + 1, y - 9 * s], [x + 5 * s, y - 3], [x + 1, y - 3]], PERG[3]); R.linea(x + 1, y - 9 * s, x + 5 * s, y - 3, c); R.poligono([[x - 1, y - 8 * s], [x - 4 * s, y - 3], [x - 1, y - 3]], PERG[3]); R.linea(x - 1, y - 8 * s, x - 4 * s, y - 3, c); R.pset(x, y - 11 * s, TROJA); R.pset(x + 1, y - 11 * s, TROJA); };
// rumbos desde una rosa (dentro del recorte que ponga quien llama)
const rumbos = (cx, cy, L = 260) => { for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; R.linea(cx, cy, Math.round(cx + Math.cos(a) * L), Math.round(cy + Math.sin(a) * L), k % 4 === 0 ? mez(PERG[0], TIN, 0.35) : k % 2 ? mez(PERG[0], TVERDE, 0.3) : mez(PERG[0], TROJA, 0.3)); } };
const rosaT = (cx, cy, r) => { for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 - Math.PI / 2, l = k % 2 ? r * 0.55 : r; R.poligono([[cx, cy], [Math.round(cx + Math.cos(a) * l), Math.round(cy + Math.sin(a) * l)], [Math.round(cx + Math.cos(a + 0.35) * l * 0.35), Math.round(cy + Math.sin(a + 0.35) * l * 0.35)]], k % 2 ? TVERDE : k === 0 ? TROJA : TIN); } R.disco(cx, cy, 2, hex('#e8c050')); R.pset(cx, cy, TIN); };
// garabatos de nota (sin letras): renglones de bucles cortos; rtl: de derecha a izquierda, con puntos encima
const garabato = (x0, y0, w, filas, c, rtl = false, k = 0, n = 1) => { for (let f = 0; f < filas; f++) { const y = y0 + f * 4, lw = Math.round(w * (f === filas - 1 ? 0.6 : 0.92)), vis = Math.round(lw * Math.max(0, Math.min(1, n * filas - f)));
  for (let i = 0; i < vis; i++) { const x = rtl ? x0 + w - 1 - i : x0 + i, v = rtl ? Math.round(Math.sin(i * 0.9 + f + k) * 1.2 + (i % 7 === 0 ? -1 : 0)) : Math.round(Math.sin(i * 1.7 + f * 2 + k)); R.pset(x, y + v, c); if (!rtl && i % 6 === 3) R.pset(x, y - 2, c); if (rtl && i % 9 === 4) R.pset(x, y - 3, c); } } };
// un barco de vela lejano (x: centro, wl: flotación, s: escala) con su bandera de colores [fondo, figura, tipo]
const nave = (x, wl, t, s, vela, band, dir = 1, fase = 0) => { x = Math.round(x); const b = Math.round(Math.sin(t * 2 + fase) * s), y = wl + b, L = Math.round(14 * s), H = Math.round(24 * s);
  R.poligono([[x - L, y - Math.round(5 * s)], [x + L, y - Math.round(5 * s)], [x + L - Math.round(4 * s), y], [x - L + Math.round(4 * s), y]], hex('#4a2c18')); R.linea(x - L, y - Math.round(5 * s), x + L, y - Math.round(5 * s), hex('#8a5a32'));
  R.rect(x - L - (dir < 0 ? 0 : 0), y - Math.round(8 * s), x - L + Math.round(5 * s), y - Math.round(5 * s), hex('#5a3420'));
  R.linea(x, y - Math.round(5 * s), x, y - H, hex('#2a1a10')); const hv = Math.round((1.5 + Math.sin(t * 3 + fase)) * s);
  R.poligono([[x - Math.round(7 * s), y - H + 3], [x + Math.round(7 * s), y - H + 3], [x + Math.round(7 * s) + hv * dir, y - Math.round(9 * s)], [x - Math.round(7 * s) + hv * dir, y - Math.round(9 * s)]], vela);
  R.linea(x - Math.round(7 * s), y - H + 3, x + Math.round(7 * s), y - H + 3, hex('#5a3a22'));
  const fw = Math.max(5, Math.round(8 * s)), fh = Math.max(3, Math.round(5 * s)); for (let i = 1; i <= fw; i++) { const off = Math.round(Math.sin(i * 0.8 - t * 9 + fase)); for (let j = 0; j < fh; j++) { let c = band[0]; if (band[2] === 'cruz' && (Math.abs(i - fw / 2) < 1 || j === Math.floor(fh / 2))) c = band[1]; if (band[2] === 'raya' && j % 2) c = band[1]; if (band[2] === 'luna' && i === 3 && j > 0 && j < fh - 1) c = band[1]; R.pset(x - dir * i, y - H + j + off, c); } } };
'''

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['pr-foto'] = ('La foto de un momento', """// PR-FOTO (frase 24), sin cartela; la barra marca 1498 en el primer plano y 1513 en los demás. Cuatro planos:
// 1. «Because the Piri Reis map is the only known copy, even if only in pieces,» (0–5,22 s): LOCAL el camarote de
//    popa de la nao de Colón, de noche (las ventanas emplomadas con la luna y el mar que se mece, el farol que se balancea,
//    el reloj de arena que corre, el gato en el arcón): Colón dibuja en su mesa; en «copy» señala su carta grande clavada
//    en la pared (La Española de pie) y el marinero de su tripulación la copia en su atril (la copia se llena de islas);
//    en «pieces» dobla la copia en cuatro y se la guarda en la camisa.
// 2. «of a lost map by Columbus. And it's a snapshot of a single moment,» (5,22–9,8 s): LOCAL el mapa de Piri terminado
//    sobre su mesa, a la luz de la tarde (Sudamérica, el Caribe, África y España, rosas y rumbos, una carabela que
//    navega, dos cartas sueltas, el polvo en el haz de luz): en «lost map by Columbus» baja del aire el contorno dorado de
//    la carta de Colón y encaja con las islas; en «snapshot» un fogonazo de foto, las esquinas de un retrato y la fecha
//    «1513» en la esquina; la foto se vuelve sepia y se apaga.
// 3. «an Ottoman captain with Arab, Greek, Portuguese and Spanish maps,» (9,8–14,32 s): el puerto de Galípoli al
//    atardecer (2.ª vez; galeras con banderas): Piri, el capitán, entra por la derecha detrás de la mesa de las cartas;
//    cuatro cartas cuelgan de una cuerda con pinzas y cada una se enciende y salta cuando la voz la nombra mientras Piri la
//    señala; en «maps» se vuelve con los brazos arriba. Un marinero recoge un cabo en el muelle.
// 4. «drawing in 1513 a world that was changing size before his eyes.» (14,32 s–fin): LOCAL la azotea de Piri al
//    atardecer sobre el estrecho (barcos con cuatro banderas distintas que pasan, gaviotas, una paloma en el pretil, el sol
//    que se pone): Piri dibuja en su tablero de caballete; en «1513» aparece la fecha en tinta roja; en «changing size» el
//    pergamino crece hacia fuera y aparecen costas nuevas en oro; en «before his eyes» Piri da dos pasos atrás asombrado
//    y sonríe.""", COMUN + COMUN2 + r"""
const P2 = en('foto', .2582), P3 = en('foto', .5087), P4 = en('foto', .7559);
const copia = en('foto', .1116), trozos = en('foto', .2155);
const perdido = en('foto', .2691), colonT = en('foto', .3183), foto = en('foto', .402), momento = en('foto', .4513);
const capitan = en('foto', .5388), arabe = en('foto', .5858), griego = en('foto', .6219), portu = en('foto', .6536), espa = en('foto', .6985), mapas = en('foto', .7182);
const a1513 = en('foto', .786), cambia = en('foto', .8845), ojos = en('foto', .9326);
const MAD = [hex('#6e4229'), hex('#5a3420'), hex('#84542e'), hex('#3a2010')];

// la carta de Colón (98 × 64) con su origen en (x0, y0)
const cartaColon = (x0, y0) => {
  R.rect(x0 - 1, y0 - 1, x0 + 98, y0 + 64, K);
  for (let y = y0; y < y0 + 64; y++) for (let x = x0; x < x0 + 98; x++) { const n = hh(x >> 2, y >> 2, 9), e = Math.min(x - x0, y - y0, x0 + 97 - x, y0 + 63 - y); R.pset(x, y, e < 2 ? PERG[2] : n > 0.82 ? PERG[1] : n < 0.1 ? PERG[3] : PERG[0]); }
  R.recorte([x0 + 2, y0 + 2, x0 + 95, y0 + 61]); rumbos(x0 + 26, y0 + 44, 120); R.recorte(null);
  tierra([[x0 + 2, y0 + 58], [x0 + 6, y0 + 55], [x0 + 30, y0 + 52], [x0 + 56, y0 + 54], [x0 + 80, y0 + 50], [x0 + 95, y0 + 52], [x0 + 95, y0 + 61], [x0 + 2, y0 + 61]], hex('#a8c070'), hex('#c8a060'));
  for (let i = 0; i < 6; i++) { const mx = x0 + 10 + i * 14, my = y0 + 58; R.pset(mx, my - 1, TIN); R.pset(mx - 1, my, TIN); R.pset(mx + 1, my, TIN); }
  islas(x0, y0); rosaT(x0 + 26, y0 + 44, 6); carabelaT(x0 + 84, y0 + 46, 0, 1);
  garabato(x0 + 70, y0 + 6, 20, 2, TROJA, false, 3);
  for (const [cx, cy] of [[x0 + 2, y0 + 2], [x0 + 95, y0 + 2], [x0 + 2, y0 + 61], [x0 + 95, y0 + 61]]) { R.rect(cx - 1, cy - 1, cx + 1, cy + 1, hex('#3a3a44')); R.pset(cx, cy, hex('#c8c8d0')); }
};
// el mar de noche por una ventana del camarote, que se mece con el barco
const ventanaNoche = (x0, y0, x1, y1, t, luna) => {
  const cx = (x0 + x1) / 2, tilt = Math.sin(t * 1.1) * 0.06, hz0 = y0 + Math.round((y1 - y0) * 0.56) + Math.sin(t * 1.1 + 0.6) * 2;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const yh = hz0 + (x - cx) * tilt; let c;
    if (y < yh) { const u = (y - y0) / Math.max(1, yh - y0); c = tr(x, y, u * 0.9) ? hex('#2a3a6a') : hex('#141c3a'); if (hh(x, y, 4) > 0.985 && ((t * 2 + hh(x, y, 5) * 6) % 3) > 0.5) c = hex('#e8ecff'); }
    else { const d = y - yh, o = Math.sin(x * 0.21 + d * 0.9 - t * 2.4) * Math.sin(x * 0.07 - d * 0.4 + t * 1.3); c = d < 1.2 ? hex('#4a5a8a') : o > 0.35 ? hex('#2a3a64') : o < -0.5 ? hex('#0a1028') : hex('#141e40');
      if (luna && Math.abs(x - luna[0]) < 1 + d * 0.18 && o > 0.3 && (x + y) % 2) c = hex('#e8e0b0'); }
    R.pset(x, y, c);
  }
  if (luna) { R.recorte([x0, y0, x1, y1]); R.disco(luna[0], luna[1], 6, hex('#f0ead0')); R.disco(luna[0] + 2, luna[1] - 1, 2, hex('#d8d0b0')); R.pset(luna[0] - 2, luna[1] + 2, hex('#d8d0b0')); R.recorte(null); }
  for (let x = x0 + 11; x < x1; x += 11) R.linea(x, y0, x, y1, hex('#2a1a10'));
  for (let y = y0 + 11; y < y1; y += 11) R.linea(x0, y, x1, y, hex('#2a1a10'));
};
// ── 1 · el camarote de Colón: la carta y la copia del marinero ──
const p1 = (t) => {
  capa('fc1', () => {
    madera(0, 14, 319, 139, MAD, 7, 3);
    R.rect(0, 0, 319, 12, hex('#24140a')); R.rect(0, 12, 319, 13, hex('#3a2212')); R.rect(0, 14, 319, 14, hex('#160c06'));
    for (const x of [0, 92, 204, 312]) { R.rect(x, 15, x + 6, 139, hex('#3e2414')); R.rect(x + 1, 15, x + 1, 139, hex('#7a4a2a')); R.rect(x + 6, 15, x + 6, 139, hex('#1e1008')); for (let y = 26; y < 139; y += 22) R.pset(x + 3, y, hex('#b8a080')); }
    caja(14, 26, 86, 100, hex('#4a2c18')); caja(216, 26, 272, 100, hex('#4a2c18'));
    for (const [a, b] of [[12, 88], [214, 274]]) { R.rect(a, 101, b, 104, hex('#6e4229')); R.rect(a, 101, b, 101, hex('#a06a3a')); R.rect(a, 105, b, 105, K); }
    cartaColon(100, 22);
    tablas(140, 179, [hex('#5a3a22'), hex('#432a18'), hex('#6e4a2c'), hex('#2a180c')], 7);
    R.rect(0, 136, 319, 139, hex('#3a2010')); R.rect(0, 136, 319, 136, hex('#5a3420'));
    // el arcón de la izquierda con sus flejes
    caja(4, 142, 40, 164, hex('#6e4229')); madera(5, 143, 39, 163, MAD, 5, 8); for (const y of [146, 158]) R.rect(4, y, 40, y + 1, hex('#3a3a44')); R.rect(4, 149, 40, 149, K); caja(20, 150, 24, 154, hex('#c8a040'));
    // la mesa de cartas del centro, con compás, tintero y rollos
    caja(112, 138, 186, 141, hex('#7a4a2a')); R.rect(112, 138, 186, 138, hex('#a06a3a')); R.rect(114, 142, 184, 146, hex('#5a3420')); for (const x of [116, 179]) caja(x, 147, x + 3, 164, hex('#432414'));
    R.rect(140, 134, 162, 137, PERG[0]); R.rect(140, 137, 162, 137, PERG[2]); garabato(142, 135, 18, 1, TIN, false, 2);
    R.linea(120, 137, 126, 131, hex('#c8c8d0')); R.linea(126, 131, 129, 137, hex('#c8c8d0')); R.pset(126, 130, hex('#e8c050'));
    caja(166, 132, 171, 137, hex('#2a2a3a')); R.pset(167, 133, hex('#6a6a8a')); rolloMini(150, 128);
    // el atril del marinero
    caja(68, 124, 98, 143, hex('#7a4a2a')); R.rect(68, 124, 98, 124, hex('#a06a3a')); R.rect(66, 143, 100, 145, hex('#5a3420')); caja(82, 146, 84, 161, hex('#432414')); R.rect(74, 161, 92, 163, hex('#432414'));
    // la alfombra bajo la mesa, la hamaca recogida, el barril y el sombrero en su clavo
    for (let y = 166; y < 176; y++) for (let x = 104; x < 196; x++) { const e = Math.min(x - 104, 195 - x, y - 166, 175 - y); R.pset(x, y, e === 0 ? hex('#3a1414') : e === 2 ? hex('#d8a838') : ((x >> 2) + (y >> 1)) % 4 === 0 ? hex('#3a4a7a') : hex('#8a2a24')); }
    for (let x = 214; x < 300; x++) { const y = 110 + Math.round(Math.sin((x - 214) / 86 * Math.PI) * 10); R.rect(x, y, x, y + 4, (x >> 2) % 2 ? hex('#d8ccb0') : hex('#b8ac90')); R.pset(x, y + 5, hex('#6e5a40')); }
    R.linea(214, 110, 208, 104, hex('#c8a870')); R.linea(300, 110, 306, 104, hex('#c8a870'));
    caja(236, 140, 260, 164, hex('#7a4a2a')); for (let x = 238; x < 260; x += 4) R.rect(x, 140, x, 164, hex('#5a3420')); for (const y of [144, 158]) R.rect(235, y, 261, y + 1, hex('#3a3a44')); R.rect(237, 140, 259, 141, hex('#a06a3a'));
    R.rect(56, 64, 58, 66, hex('#c8c8d0')); R.poligono([[46, 66], [68, 66], [64, 72], [50, 72]], hex('#2a2a3a')); R.rect(44, 72, 70, 74, hex('#2a2a3a')); R.rect(50, 70, 64, 70, hex('#a83224'));
    // un cabo adujado en el suelo, a la derecha
    for (let r = 9; r > 2; r -= 2) R.anillo(292, 166, r, r % 4 === 1 ? hex('#c8a870') : hex('#a08050'));
    R.disco(292, 166, 2, hex('#6e5030'));
  });
  ventanaNoche(17, 29, 83, 97, t, [38, 44]); ventanaNoche(219, 29, 269, 97, t + 0.3, null);
  // el reloj de arena que corre sobre la mesa
  { const x = 132, y = 137, a = ((t * 0.15) % 1); R.rect(x - 3, y - 11, x + 3, y - 11, hex('#6e4229')); R.rect(x - 3, y, x + 3, y, hex('#6e4229'));
    for (let j = 0; j < 5; j++) { const w = 2 - Math.floor(j / 2); R.pset(x - w - 1, y - 10 + j, hex('#c8d8e0')); R.pset(x + w + 1, y - 10 + j, hex('#c8d8e0')); R.pset(x - w - 1, y - 1 - j, hex('#c8d8e0')); R.pset(x + w + 1, y - 1 - j, hex('#c8d8e0')); }
    const arriba = Math.round((1 - a) * 3), abajo = Math.round(a * 3); for (let j = 0; j < arriba; j++) R.rect(x - 1, y - 6 - j, x + 1, y - 6 - j, hex('#e8c070')); for (let j = 0; j < abajo; j++) R.rect(x - 1 - (j === 0 ? 1 : 0), y - 1 - j, x + 1 + (j === 0 ? 1 : 0), y - 1 - j, hex('#e8c070')); if (Math.floor(t * 8) % 2) R.pset(x, y - 4, hex('#e8c070')); R.pset(x, y - 3, hex('#e8c070')); }
  vela(176, 137, t, 7, 2);
  // el gato del barco en el arcón, que mira al marinero en «copy»
  gato(30, 141, t, 1, hex('#8a6a4a'), hex('#b8946a'), t > copia && t < trozos ? 1 : 0);
  // la carta de Colón brilla cuando la señala, y un rastro de puntos de oro va de la carta a la copia
  const cop = tramo(t, copia + 0.1, trozos - 0.1), fold = tramo(t, trozos, trozos + 0.45), mete = tramo(t, trozos + 0.45, trozos + 0.85);
  if (t > copia - 0.2 && t < trozos) { const p = (t - copia) * 1.4; for (let k = 0; k < 6; k++) { const u = ((p + k / 6) % 1); const x = Math.round(lerp(150, 84, u)), y = Math.round(lerp(58, 128, u) - Math.sin(u * Math.PI) * 18); R.rect(x, y, x + 1, y + 1, hex('#ffe070')); R.pset(x, y, hex('#fff8d0')); } if (Math.floor(t * 4) % 2) islas(100, 22, 'fantasma'); }
  // Colón dibuja y luego señala su carta
  const dibuja = t < copia - 0.2;
  const c = R.actor(EL.colon, 187, 160, t, { dir: -1, sostiene: dibuja ? [181, 136 + Math.round(Math.sin(t * 15))] : false, dedo: !dibuja && t < trozos + 0.5, habla: !dibuja && t < trozos && Math.sin(t * 8) > 0, sonrisa: t > trozos + 0.5 });
  if (dibuja) pluma(c.mano[0] - 1, c.mano[1] + 1, -1);
  // el marinero copia en su atril; en «pieces» dobla la copia y se la guarda
  const pen = t > copia + 0.1 && t < trozos - 0.1 ? [72 + Math.round(cop * 5 + Math.sin(t * 17)), 138 + Math.round(Math.sin(t * 23))] : null;
  const sm = R.actor(EL.prisionero, 51, 160, t, { dir: 1, sostiene: pen ?? (fold > 0 && mete < 1 ? [70 - Math.round(mete * 6), 142 - Math.round(mete * 4)] : false), sonrisa: mete >= 1, sorpresa: t > copia - 0.3 && t < copia + 0.1 });
  if (fold <= 0) { R.rect(70, 126, 96, 141, K); R.rect(71, 127, 95, 140, PERG[3]); R.rect(71, 140, 95, 140, PERG[2]);
    if (cop > 0) { const m = (P) => P.map(([x, y]) => [71 + x * 0.4, 124 + y * 0.4]); if (cop > 0.15) tierra(m(CUBA), hex('#c8a060'), hex('#a8c070')); if (cop > 0.45) tierra(m(ESPA), hex('#c86a4a'), hex('#e09060')); if (cop > 0.7) { tierra(m(JAMA), hex('#8ab070'), hex('#c8a060')); R.linea(72, 138, 94, 137, hex('#5a8a3a')); } if (cop > 0.85) R.pset(91, 129, TROJA); } }
  else if (mete < 1) { const [hx, hy] = sm.mano, w = Math.round(lerp(16, 5, fold)), h = Math.round(lerp(5, 4, fold)); R.rect(hx - 1, hy - h - 1, hx + w + 1, hy, K); R.rect(hx, hy - h, hx + w, hy - 1, PERG[3]); R.pset(hx + Math.round(w / 2), hy - h, PERG[2]); }
  if (pen) pluma(pen[0], pen[1], 1);
  // una rata que cruza el zócalo de vez en cuando
  { const u = ((t + 1.5) % 6) / 2.2; if (u < 1) { const x = Math.round(lerp(300, 196, u)), y = 138, p = Math.floor(t * 12) % 2; R.rect(x, y - 3, x + 5, y - 1, hex('#5a5048')); R.rect(x - 1, y - 2, x, y - 1, hex('#6a6058')); R.pset(x - 1, y - 3, K); R.linea(x + 6, y - 2, x + 10, y - 3 + p, hex('#8a7a6a')); R.pset(x + 1, y, p ? K : hex('#5a5048')); R.pset(x + 4, y, p ? hex('#5a5048') : K); } }
  // el farol del techo, que se balancea con el barco
  const ang = Math.sin(t * 1.1) * 0.22, fx = Math.round(243 + Math.sin(ang) * 22), fy = Math.round(14 + Math.cos(ang) * 22);
  R.linea(243, 14, fx, fy - 5, hex('#3a3a44')); halo(fx, fy, 26, hex('#ffd890'), 0.32); caja(fx - 3, fy - 5, fx + 3, fy + 4, hex('#c8a040')); R.rect(fx - 2, fy - 3, fx + 2, fy + 2, hex('#ffe8a0')); R.rect(fx - 1, fy - 2, fx + 1, fy + 1, hex('#fff8e0')); R.rect(fx - 3, fy - 7, fx + 3, fy - 6, hex('#8a6a2a'));
};

// ── 2 · el mapa de Piri a la luz de la tarde: la carta de Colón encaja y la foto ──
const MP = [36, 18, 264, 152];
const SA = [[38, 96], [60, 92], [86, 96], [110, 94], [132, 98], [146, 110], [144, 126], [132, 140], [114, 150], [38, 150]];
const AFR = [[262, 48], [248, 52], [236, 64], [226, 80], [228, 96], [240, 110], [250, 126], [258, 140], [262, 148]];
const ESP = [[262, 21], [244, 21], [236, 28], [240, 36], [252, 40], [262, 38]];
const p2 = (t) => {
  capa('fc2', () => {
    madera(0, 0, 319, 179, NOG, 12, 21);
    sombrear(MP[0] + 3, MP[1] + 3, MP[2] + 4, MP[3] + 4, K, 0.55);
    for (let y = MP[1]; y <= MP[3]; y++) for (let x = MP[0]; x <= MP[2]; x++) { const e = Math.min(x - MP[0], MP[2] - x, y - MP[1], MP[3] - y), bor = 2 + 2 * hh(x >> 2, y >> 2, 3); if (e < bor - 1.5) continue; const n = hh(x >> 2, y >> 2, 8) * 0.6 + hh(x, y, 9) * 0.4; R.pset(x, y, e < bor + 1 ? PERG[2] : n > 0.8 ? PERG[1] : n < 0.12 ? PERG[3] : PERG[0]); }
    R.recorte([MP[0] + 3, MP[1] + 3, MP[2] - 3, MP[3] - 3]);
    rumbos(184, 92); rumbos(96, 126, 200);
    // la aguada azulada del mar junto a las costas
    for (let y = MP[1] + 3; y < MP[3] - 3; y++) for (let x = MP[0] + 3; x < MP[2] - 3; x++) { if (R.dentro(SA, x, y) || R.dentro(AFR.concat([[264, 152], [264, 46]]), x, y)) continue; const d = Math.min(Math.abs(y - 94) + Math.max(0, x - 146), 999); if (x < 150 && y > 84 && y < 100 && tr(x, y, 0.3)) R.pset(x, y, mez(R.pget(x, y), hex('#7aa8a8'), 0.35)); if (x > 214 && tr(x, y, 0.22)) R.pset(x, y, mez(R.pget(x, y), hex('#7aa8a8'), 0.3)); }
    tierra(SA, hex('#a8c070'), hex('#c8a060')); tierra(AFR.concat([[264, 152], [264, 46]]), hex('#d8b060'), hex('#c89a50')); tierra(ESP.concat([[264, 18]]), hex('#c8a060'), hex('#a8c070'));
    islas(40, 24);
    // montes, ríos, árboles y bichos de la tierra; ciudades con banderolas; notas rojas sin letras
    for (const [mx, my] of [[58, 112], [72, 118], [90, 108], [64, 130], [242, 80], [250, 96]]) { R.linea(mx - 4, my, mx, my - 4, TIN); R.linea(mx, my - 4, mx + 4, my, TIN); R.linea(mx - 1, my - 2, mx + 1, my - 2, hex('#8a6a3a')); }
    costaT([[110, 104], [100, 118], [104, 132], [96, 146]], hex('#4a7aa0')); costaT([[246, 70], [236, 84], [240, 100]], hex('#4a7aa0'));
    for (const [px, py] of [[80, 140], [120, 120], [56, 100]]) { R.rect(px, py - 4, px, py, hex('#5a3a1a')); R.disco(px, py - 6, 2, hex('#4a8a3a')); R.pset(px - 2, py - 6, hex('#6aaa4a')); }
    for (const [cx, cy] of [[246, 40], [236, 60], [252, 118]]) { R.rect(cx - 2, cy - 2, cx + 2, cy, TROJA); R.rect(cx - 1, cy - 3, cx + 1, cy - 3, TROJA); R.linea(cx, cy - 3, cx, cy - 7, TIN); R.rect(cx + 1, cy - 7, cx + 3, cy - 6, hex('#3a7a4a')); }
    garabato(150, 132, 40, 3, TROJA, true, 1); garabato(60, 70, 30, 2, TIN, false, 2); garabato(196, 28, 30, 2, TIN, true, 4);
    rosaT(184, 92, 11); rosaT(96, 126, 7);
    R.recorte(null);
    // en la mesa: el tintero con la pluma, el compás, el estuche, un trozo de lacre y unas migas
    caja(8, 150, 26, 166, hex('#2a2a3a')); R.rect(10, 150, 24, 151, hex('#4a4a6a')); R.rect(14, 147, 20, 149, hex('#1a1a28')); pluma(18, 148, 1);
    R.linea(270, 132, 296, 156, hex('#c8c8d0')); R.linea(276, 128, 300, 150, hex('#c8c8d0')); R.disco(272, 130, 2, hex('#e8c050'));
    caja(60, 160, 210, 166, hex('#c8a060')); for (let x = 62; x < 210; x += 4) R.rect(x, 160, x, x % 20 === 2 ? 163 : 161, hex('#5a3a1a'));
    caja(276, 162, 300, 170, hex('#7a2a20')); R.rect(277, 162, 299, 162, hex('#b84a3a'));
    // la luz de la tarde en franjas inclinadas (la sombra del parteluz de la ventana)
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const s = ((x + y * 0.7) % 96 + 96) % 96; if (s < 54) { if (tr(x, y, 0.5)) R.pset(x, y, mez(R.pget(x, y), hex('#ffc070'), 0.14)); } else if (s > 60 && tr(x, y, 0.5)) R.pset(x, y, mez(R.pget(x, y), hex('#1a0c04'), 0.16)); }
  });
  // las olas que se mueven y la carabela que navega por el Atlántico
  R.recorte([MP[0] + 3, MP[1] + 3, MP[2] - 3, MP[3] - 3]);
  for (let k = 0; k < 14; k++) { const x = 156 + ((k * 23 + Math.floor(t * 6)) % 60), y = 34 + k * 8; if (y > 140) continue; R.pset(x, y, hex('#4a7aa0')); R.pset(x + 1, y - 1, hex('#4a7aa0')); R.pset(x + 2, y, hex('#4a7aa0')); R.pset(x + 3, y - 1, hex('#4a7aa0')); }
  carabelaT(150 + (t - P2) * 5, 76, t, 1); carabelaT(206 - (t - P2) * 3, 124, t + 1, 1, hex('#7a3020'));
  R.recorte(null);
  // las dos cartas sueltas, una con la esquina que levanta la brisa
  T.c_carta(R, 290, 74, 'portugues', { levanta: 0.4 + 0.4 * Math.sin(t * 2.3) }); T.c_carta(R, 292, 122, 'arabe');
  // el polvo que brilla en el haz de luz
  for (let k = 0; k < 16; k++) { const x = Math.round((hh(k, 1, 30) * 320 + t * (4 + k % 3)) % 320), y = Math.round((hh(k, 2, 30) * 180 + Math.sin(t + k) * 6 + 180) % 180); if (((x + y * 0.7) % 96) < 54 && !(x > 276 && y < 46)) R.pset(x, y, hex('#fff2c8')); }
  // la carta de Colón baja del aire en oro y encaja con las islas
  const g = tramo(t, perdido, colonT - 0.1);
  R.recorte([0, 18, 319, 179]);
  if (g > 0) { const dy = Math.round((1 - suave(g)) * -46), on = g >= 1 ? (Math.floor(t * 5) % 2 ? 1 : 0.6) : g;
    const c = mez(hex('#c8a040'), hex('#fff0a0'), on); for (let x = 40; x <= 138; x++) { if ((x + Math.floor(t * 8)) % 4 < 2) { R.pset(x, 22 + dy, c); R.pset(x, 88 + dy, c); } } for (let y = 22; y <= 88; y++) if ((y + Math.floor(t * 8)) % 4 < 2) { R.pset(40, y + dy, c); R.pset(138, y + dy, c); }
    islas(40, 24 + dy, 'fantasma', c); if (g >= 1) for (let k = 0; k < 5; k++) destello(98 + k * 7 - 14, 30 + (k % 2) * 30, ((t - colonT) * 1.2 + k / 5) % 1, hex('#fff0a0')); }
  R.recorte(null);
  // «snapshot»: el fogonazo, la foto en sepia y sus esquinas, con la fecha
  if (t >= foto) { const k = t - foto;
    if (k < 0.1) R.rect(0, 0, 319, 179, hex('#fffaf0'));
    else { const s = Math.max(0, 1 - (k - 0.1) / 1.4) * 0.65, bl = Math.max(0, 0.6 - (k - 0.1) * 2); if (s > 0) { const B = R.buf, BL = hex('#ffffff'); for (let i = 0; i < 57600; i++) { const c = B[i], l = ((c & 255) * 0.3 + ((c >>> 8) & 255) * 0.59 + ((c >>> 16) & 255) * 0.11) | 0; const sep = (0xff000000 | (Math.min(255, l * 0.78) << 16) | (Math.min(255, l * 0.95) << 8) | Math.min(255, l * 1.12 + 10)) >>> 0; B[i] = bl > 0 ? mez(mez(c, sep, s), BL, bl) : mez(c, sep, s); } }
      for (const [cx, cy, sx, sy] of [[32, 22, 1, 1], [268, 22, -1, 1], [32, 158, 1, -1], [268, 158, -1, -1]]) { R.rect(Math.min(cx, cx + sx * 14), cy - 1, Math.max(cx, cx + sx * 14), cy + 1, K); R.rect(cx - 1, Math.min(cy, cy + sy * 14), cx + 1, Math.max(cy, cy + sy * 14), K); R.rect(Math.min(cx, cx + sx * 13), cy, Math.max(cx, cx + sx * 13), cy, hex('#e8c050')); R.rect(cx, Math.min(cy, cy + sy * 13), cx, Math.max(cy, cy + sy * 13), hex('#e8c050')); }
      if (k > 0.25) R.numero('1513', 220, 154, { color: hex('#ff9a3a'), n: Math.floor((k - 0.25) * 30) });
      if (t > momento && t < momento + 0.9) { const u = (t - momento) / 0.9; R.anillo(150, 86, Math.round(8 + u * 60), hex('#fff6d0'), 2); } } }
};

// ── 3 · el puerto al atardecer: el capitán y sus cuatro cartas ──
const o3 = { encuadre: 'puerto', luz: 'tarde', banderas: true };
const cuerdaY = (x) => 94 + Math.round(5 * Math.sin((x - 186) / 128 * Math.PI));
const CARTAS = [[296, 'arabe', arabe], [264, 'ptolomeo', griego], [232, 'portugues', portu], [200, 'colon', espa]];
const p3 = (t) => {
  T.galipoli(R, t, o3);
  // los postes y la cuerda con las cuatro cartas
  for (const px of [184, 314]) { caja(px, 90, px + 3, 150, hex('#6e4229')); R.rect(px + 1, 90, px + 1, 150, hex('#a06a3a')); R.rect(px - 1, 89, px + 4, 90, hex('#432414')); }
  for (let x = 187; x < 314; x++) { R.pset(x, cuerdaY(x), hex('#e8d8b0')); R.pset(x, cuerdaY(x) + 1, hex('#8a7a5a')); }
  for (const [cx, est, w] of CARTAS) {
    const pulso = tramo(t, w - 0.1, w + 0.8), sway = Math.round(Math.sin(t * 1.7 + cx) * 1), salta = pulso > 0 && pulso < 1 ? Math.round(Math.sin(pulso * Math.PI) * 4) : 0, cy = cuerdaY(cx) + 13 - salta, x = cx + sway;
    if (t > w - 0.1) { const on = pulso < 1 ? (Math.floor(t * 10) % 2 ? hex('#fff0a0') : hex('#ffc040')) : hex('#e8b040'); R.rect(x - 17, cy - 13, x + 17, cy - 13, on); R.rect(x - 17, cy + 13, x + 17, cy + 13, on); R.rect(x - 17, cy - 13, x - 17, cy + 13, on); R.rect(x + 17, cy - 13, x + 17, cy + 13, on); }
    T.c_carta(R, x, cy, est, { levanta: 0.25 + 0.25 * Math.sin(t * 2 + cx) });
    for (const dx of [-9, 8]) { R.rect(x + dx, cuerdaY(cx + dx) - 2, x + dx + 1, cy - 9, hex('#8a5a32')); R.pset(x + dx, cuerdaY(cx + dx) - 2, hex('#c8945a')); }
    if (pulso > 0 && pulso < 1) for (let k = 0; k < 4; k++) destello(x - 14 + k * 9, cy - 16 + (k % 2) * 30, (pulso * 1.6 + k / 4) % 1);
  }
  // Piri entra por la derecha detrás de la mesa y señala cada carta cuando la nombran; en «maps», los brazos arriba
  const K3 = [[P3 + 0.15, 334], [arabe - 0.3, 288], [arabe + 0.3, 288], [griego - 0.25, 256], [griego + 0.25, 256], [portu - 0.25, 224], [portu + 0.35, 224], [espa - 0.3, 192]];
  let px = 334, anda = false; for (let i = 0; i < K3.length; i++) { const [ta, xa] = K3[i], nx = K3[i + 1]; if (t >= ta) { px = xa; if (nx && t < nx[0]) { const u = (t - ta) / (nx[0] - ta); px = lerp(xa, nx[1], u); anda = xa !== nx[1]; } } }
  const señala = [arabe, griego, portu, espa].some((w) => t > w - 0.1 && t < w + 0.55), fin = t > mapas;
  R.actor(EL.piri, Math.round(px), 154, t, { dir: fin ? 1 : -1, anda, dedo: señala && !fin, brazos: fin && t < mapas + 0.9, sonrisa: fin || señala, salto: fin && t < mapas + 0.3 ? 2 : 0, habla: t > capitan - 0.2 && t < arabe - 0.3 && Math.sin(t * 8) > 0 });
  // la mesa de caballetes por delante, con el astrolabio, el compás, el tintero y rollos
  caja(180, 146, 316, 148, hex('#8a5a32')); R.rect(180, 146, 316, 146, hex('#b8844a')); R.rect(181, 149, 315, 153, hex('#5a3420')); R.rect(181, 153, 315, 153, K);
  for (const x of [188, 304]) { R.linea(x - 6, 154, x + 6, 170, hex('#432414')); R.linea(x + 6, 154, x - 6, 170, hex('#432414')); R.linea(x - 5, 154, x + 7, 170, hex('#6e4229')); }
  R.disco(204, 140, 5, K); R.disco(204, 140, 4, hex('#c8a040')); R.anillo(204, 140, 2, hex('#8a6a20')); R.linea(201, 140, 207, 140, hex('#5a4010')); R.rect(203, 134, 205, 135, hex('#c8a040'));
  R.linea(232, 145, 238, 137, hex('#c8c8d0')); R.linea(238, 137, 242, 145, hex('#c8c8d0')); caja(262, 140, 268, 145, hex('#2a2a3a')); pluma(266, 140, 1);
  rolloMini(282, 141); rolloMini(292, 137);
  // un marinero recoge un cabo en el muelle (las adujas crecen)
  const tir = Math.sin(t * 3.2), vueltas = Math.min(5, 2 + Math.floor((t - P3) * 0.8));
  R.actor(EL.marineroOtomano2, 58, 170, t, { dir: 1, sostiene: [78, 158 + Math.round(tir * 4)] });
  for (let r = 2; r <= vueltas + 2; r++) R.anillo(86, 170, r * 1.6, r % 2 ? hex('#c8a870') : hex('#a08050'));
  R.linea(78, 158 + Math.round(tir * 4), 86, 168, hex('#c8a870'));
  T.galipoliDelante(R, t, o3);
};

// ── 4 · la azotea al atardecer: el mundo crece en el tablero ──
const NAVES = [[0.9, 104, 0.6, hex('#f4ecd8'), [hex('#c8302a'), hex('#f4f0e4'), 'luna'], 1, 26], [1.1, 112, 0.8, hex('#ece0c8'), [hex('#f4f0e4'), hex('#c8302a'), 'cruz'], -1, 300],
  [1.0, 119, 1.0, hex('#f4e8cc'), [hex('#e8c040'), hex('#c8302a'), 'raya'], 1, -40], [1.2, 125, 1.15, hex('#f0e4c8'), [hex('#3a8a4a'), hex('#f4f0e4'), 'luna'], -1, 380]];
const p4 = (t) => {
  capa('fc4', () => {
    grad(0, 0, 319, 86, [hex('#2e2450'), hex('#4e3062'), hex('#8a4068'), hex('#d0605a'), hex('#f09450'), hex('#f8c070')]);
    R.disco(70, 84, 9, hex('#ffe0a0')); R.disco(70, 84, 7, hex('#fff4d0'));
    for (let x = 0; x < 320; x++) { const h1 = 84 + Math.round(Math.sin(x * 0.03) * 3 + Math.sin(x * 0.11) * 2); for (let y = h1; y < 95; y++) R.pset(x, y, tr(x, y, (y - h1) / 12) ? hex('#4a2e5a') : hex('#5e3a66')); }
    for (let k = 0; k < 18; k++) { const x = 120 + Math.round(hh(k, 1, 60) * 190), y = 88 + Math.round(hh(k, 2, 60) * 5); R.rect(x, y - 2, x + 3, y, hex('#6e4a72')); if (k % 3 === 0) R.pset(x + 1, y - 1, hex('#ffd890')); }
    R.rect(200, 76, 201, 88, hex('#6e4a72')); R.disco(200, 76, 1, hex('#6e4a72')); R.disco(236, 86, 4, hex('#6e4a72'));
  });
  // el mar con el reflejo del sol que tiembla
  for (let y = 95; y < 136; y++) { const d = (y - 95) / 40; for (let x = 0; x < 320; x++) { const o = Math.sin(x * 0.19 + y * 1.3 - t * 2.2) * Math.sin(x * 0.05 - y * 0.5 + t * 1.1); let c = o > 0.4 ? hex('#b86a7a') : o < -0.4 ? hex('#3a2a5a') : tr(x, y, d) ? hex('#4a3468') : hex('#7a4a72');
    if (Math.abs(x - 70) < 4 + (y - 95) * 0.4 && o > -0.1 && (x + y) % 2) c = hex('#ffd890'); R.pset(x, y, c); } }
  for (let k = 0; k < 22; k++) { const x = Math.round(hh(k, 1, 80) * 268), y = 18 + Math.round(hh(k, 2, 80) * 26); if ((t * 1.5 + hh(k, 3, 80) * 5) % 4 > 0.6) R.pset(x, y, hex('#f0e8ff')); }
  nubes([0, 16, 266, 50], t + 7, 24, 38, [hex('#d8a0b0'), hex('#a0607a'), hex('#5e3a66')], 4, 0.6, 10);
  nubes([0, 16, 319, 74], t, 48, 66, [hex('#ffd8b0'), hex('#e88a7a'), hex('#8a4a6a')], 6, 1, 12);
  pajaros(t, 20, 300, 40, 4, 8, hex('#3a2040'));
  // los barcos de cuatro banderas que pasan por el estrecho
  for (const [v, wl, s, vel, band, dir, x0] of NAVES) { const x = ((x0 + dir * t * 6 * v) % 400 + 400) % 400 - 40; nave(x, wl, t, s * 1.5, vel, band, dir, x0); }
  // el pretil con sus macetas y el suelo de barro de la azotea
  delante('fc4d', () => {
    R.rect(0, 126, 319, 130, hex('#e8c8a0')); R.rect(0, 126, 319, 126, hex('#fff0d8')); R.rect(0, 131, 319, 131, hex('#8a5a4a'));
    for (let y = 132; y < 152; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 132) / 6), j = (x + f * 9) % 18; R.pset(x, y, (y - 132) % 6 === 0 || j === 0 ? hex('#8a5a4a') : hh(x >> 1, y, f) > 0.9 ? hex('#b8805a') : hex('#c89470')); }
    for (let y = 152; y < 180; y++) { const f = Math.floor((y - 152) / 7); for (let x = 0; x < 320; x++) { const xx = (x - 160) * (1 + (y - 152) / 40), j = Math.abs(xx % 22) < 1; R.pset(x, y, (y - 152) % 7 === 0 || j ? hex('#7a3a24') : hh(x >> 2, f, 7) > 0.85 ? hex('#a85a3a') : (x + f) % 5 === 0 ? hex('#c8784a') : hex('#b86a40')); } }
    for (const [mx, c] of [[24, hex('#4a8a3a')], [296, hex('#5a9a4a')]]) { R.poligono([[mx - 7, 126], [mx + 7, 126], [mx + 5, 114], [mx - 5, 114]], hex('#c8643a')); R.rect(mx - 6, 114, mx + 6, 115, hex('#e0804a')); for (const [dx, dy] of [[-5, -8], [0, -12], [5, -7], [-2, -4], [3, -3]]) R.disco(mx + dx, 112 + dy, 4, c); for (const [dx, dy] of [[-2, -12], [4, -10]]) R.pset(mx + dx, 112 + dy, hex('#f0d040')); }
  });
  // la paloma que pasea por el pretil
  { const x = Math.round(118 + Math.sin(t * 0.8) * 12), y = 125, pico = Math.floor(t * 3) % 4 === 0 ? 1 : 0, d = Math.cos(t * 0.8) > 0 ? 1 : -1; R.disco(x, y - 3, 3, hex('#8a8aa0')); R.disco(x + d * 3, y - 6 + pico, 2, hex('#9a9ab0')); R.pset(x + d * 5, y - 6 + pico, hex('#e8a040')); R.pset(x + d * 3, y - 7 + pico, K); R.rect(x - d * 4, y - 3, x - d * 2, y - 2, hex('#6a6a80')); R.pset(x, y, hex('#d86a5a')); }
  // el caballete con el tablero y el pergamino que crece
  const cre = suave(tramo(t, cambia - 0.15, cambia + 0.7)), dib = tramo(t, P4 + 0.1, cambia - 0.2);
  R.linea(150, 154, 142, 178, hex('#432414')); R.linea(151, 154, 143, 178, hex('#6e4229')); R.linea(244, 154, 252, 178, hex('#432414')); R.linea(245, 154, 253, 178, hex('#6e4229')); R.linea(197, 60, 197, 172, hex('#3a2010'));
  caja(144, 62, 250, 154, hex('#6e4229')); madera(145, 63, 249, 153, NOG, 6, 31); R.rect(142, 154, 252, 157, hex('#8a5a32')); R.rect(142, 154, 252, 154, hex('#b8844a'));
  const L = Math.round(lerp(160, 147, cre)), Rr = Math.round(lerp(238, 247, cre)), Tp = Math.round(lerp(72, 65, cre)), Bt = Math.round(lerp(148, 152, cre));
  for (let y = Tp; y <= Bt; y++) for (let x = L; x <= Rr; x++) { const e = Math.min(x - L, Rr - x, y - Tp, Bt - y), n = hh(x >> 2, y >> 2, 12); R.pset(x, y, e < 2 ? PERG[2] : n > 0.84 ? PERG[1] : PERG[0]); }
  R.recorte([L + 2, Tp + 2, Rr - 2, Bt - 2]);
  rumbos(206, 112, 120);
  // el Viejo Mundo: Europa, África, Arabia; el Mediterráneo en medio
  tierra([[192, 80], [206, 74], [222, 76], [236, 80], [240, 90], [226, 92], [214, 90], [200, 94], [190, 90]], hex('#c8a060'), hex('#a8c070'));
  tierra([[196, 100], [214, 98], [230, 100], [236, 112], [230, 126], [222, 140], [212, 138], [204, 122], [194, 110]], hex('#d8b060'), hex('#c89a50'));
  tierra([[236, 96], [246, 96], [246, 110], [240, 108]], hex('#d0a050'), hex('#e8c070'));
  rosaT(206, 112, 7);
  for (const [mx, my] of [[214, 112], [222, 120], [206, 80], [226, 82]]) { R.linea(mx - 3, my, mx, my - 3, TIN); R.linea(mx, my - 3, mx + 3, my, TIN); }
  costaT([[220, 100], [222, 110], [218, 122]], hex('#4a7aa0')); costaT([[196, 96], [206, 95], [218, 97], [230, 95]], hex('#4a7aa0'));
  for (const [ix, iy] of [[204, 96], [214, 95], [224, 96]]) R.rect(ix, iy, ix + 1, iy, hex('#c86a4a'));
  garabato(186, 128, 16, 2, TROJA, true, 2); garabato(220, 70, 16, 1, TIN, false, 1); carabelaT(186, 112, t, 1);
  for (let k = 0; k < 4; k++) { const x = 180 + ((k * 13 + Math.floor(t * 4)) % 20), y = 100 + k * 9; R.pset(x, y, hex('#4a7aa0')); R.pset(x + 1, y - 1, hex('#4a7aa0')); R.pset(x + 2, y, hex('#4a7aa0')); }
  // lo nuevo de Piri: la costa de las Indias y de Brasil al oeste, que va saliendo de su pluma
  const costa = [[176, 76], [172, 86], [178, 94], [172, 104], [166, 114], [170, 124], [164, 134], [168, 146]], n = Math.round(dib * (costa.length - 1));
  if (n > 0) costaT(costa.slice(0, n + 1), TIN); if (dib > 0.5) for (const [ix, iy] of [[184, 88], [188, 92], [182, 98]]) R.rect(ix, iy, ix + 1, iy + 1, hex('#c86a4a'));
  if (cre > 0) { const c = mez(hex('#c8a040'), hex('#fff0a0'), Math.floor(t * 6) % 2 ? 1 : 0.4); costaT([[160, 68], [156, 82], [160, 96], [152, 112], [156, 128], [150, 146]].map(([x, y]) => [lerp(176, x, cre), y]), c); costaT([[200, 150], [214, 146], [230, 150]].map(([x, y]) => [x, lerp(160, y, cre)]), c); costaT([[244, 70], [246, 80], [243, 92]].map(([x, y]) => [lerp(236, x, cre), y]), c); }
  if (t > a1513) R.numero('1513', 214, Bt - 3, { color: TROJA, sombra: false, n: Math.floor((t - a1513) * 24) });
  R.recorte(null);
  if (cre > 0 && cre < 1) for (let k = 0; k < 8; k++) destello(k % 2 ? L : Rr, Tp + 8 + k * 10, (cre * 2 + k / 8) % 1, hex('#fff0a0'));
  // Piri dibuja en el borde del tablero; en «before his eyes» da dos pasos atrás, se asombra y sonríe
  const atras = tramo(t, ojos - 0.25, ojos + 0.35), px = Math.round(lerp(140, 118, atras)), dibu = t < cambia - 0.2;
  const pr = R.actor(EL.piri, px, 170, t, { dir: 1, anda: atras > 0 && atras < 1, sostiene: dibu ? [157 + Math.round(Math.sin(t * 9)), 152 - Math.round(dib * 2)] : false, sorpresa: t > cambia - 0.1 && t < ojos + 0.5, sonrisa: t > ojos + 0.5, dedo: t > ojos + 0.6 });
  if (dibu) pluma(pr.mano[0], pr.mano[1], -1);
};

const año = (t) => (t < P2 ? 1498 : 1513);
const efectos = [[copia + 0.1, 'lapiz'], [trozos + 0.05, 'papel'], [perdido + 0.3, 'brillo'], [foto, 'flash'], [P3 + 0.4, 'ola'], [arabe, 'pop'], [portu, 'pop'], [mapas, 'brillo'],
  [P4 + 0.15, 'lapiz'], [a1513, 'lapiz'], [cambia, 'whoosh'], [ojos + 0.5, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
""")

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['pr-leccion'] = ('Lo que enseña el mapa', """// PR-LECCION (frase 25), sin cartela; la barra marca 2026, 1513, 1501 y 2026. Cuatro planos:
// 1. «So if you think about it, the Piri Reis map doesn't show Antarctica.» (0–4,75 s): LOCAL una mesa de trabajo de
//    hoy con la copia impresa del mapa (la costa del sur que se tuerce) sobre una plancha de corte verde, la caja de un
//    puzle con un pingüino, la taza que humea y el lápiz: una mano trae una pieza blanca con forma de Antártida, la
//    prueba contra la costa y no encaja; en «doesn't» sale una «X» roja y en «Antarctica» la mano la lanza fuera del plano.
// 2. «It shows something better how knowledge traveled in 1513 from ship to ship,» (4,75–9,95 s): LOCAL dos barcos
//    juntos en alta mar (la galera otomana a la izquierda, la nao portuguesa a la derecha, un tercero en el horizonte):
//    en «knowledge traveled» el marinero otomano lanza un rollo de cartas que deja un rastro de oro; el piloto portugués
//    lo atrapa, lo enseña en «1513» y en «ship to ship» lo deja caer al bote, que rema hacia el barco del horizonte.
// 3. «from prisoner to admiral, from one language to another. Today it rests in» (9,95–14,3 s): LOCAL la popa de la
//    galera de Kemal bajo el toldo de rayas (1501): el prisionero entra con un guardia y en «admiral» da su rollo a Kemal
//    Reis; Kemal se lo pasa a Piri, que lo abre: en «one language to another» los renglones negros se vuelven, uno a uno,
//    escritura roja de derecha a izquierda; en «Today it rests» Piri lo enrolla y lo guarda en un cofre que se cierra.
// 4. «the Topkapi Palace and it's almost never brought out because it's very fragile.» (14,3 s–fin): la sala del museo
//    de Topkapı (hoy): el conservador de guantes blancos coloca el pergamino; en «almost never brought out» baja la
//    campana de cristal; llegan dos visitantes; uno saca el móvil para hacer una foto y en «fragile» el conservador le
//    dice que no con el dedo («X»); el visitante lo guarda y la sala se queda en penumbra.""", COMUN + COMUN2 + r"""
const P2 = en('leccion', .2168), P3 = en('leccion', .5097), P4 = en('leccion', .7546);
const mapaT = en('leccion', .0743), noT = en('leccion', .1295), antT = en('leccion', .1633);
const saber = en('leccion', .3131), a1513 = en('leccion', .3784), barco = en('leccion', .4257);
const prisi = en('leccion', .517), almi = en('leccion', .5519), lengua = en('leccion', .5936), otra = en('leccion', .6465), hoyT = en('leccion', .6949), descansa = en('leccion', .7242);
const casiNunca = en('leccion', .8188), saca = en('leccion', .8797), fragil = en('leccion', .9112);

// ── 1 · la pieza de la Antártida que no encaja ──
const COSTA = [[66, 28], [80, 46], [94, 62], [106, 78], [114, 92], [126, 102], [146, 108], [172, 110], [200, 108], [226, 112], [246, 114]];
const pieza = (cx, cy, giro = 0) => { cx = Math.round(cx); cy = Math.round(cy); const P = [[-20, -4], [-12, -10], [-2, -9], [8, -12], [18, -6], [21, 2], [14, 9], [2, 10], [-10, 8], [-19, 4]].map(([x, y]) => [cx + (giro ? -x : x), cy + y]);
  R.poligono(P.map(([x, y]) => [x + 2, y + 2]), mez(hex('#2e6a4a'), K, 0.5)); R.poligono(P, (x, y) => (y > cy + 4 || tr(x, y, 0.15) ? hex('#c8dcf0') : hex('#f4f8ff'))); costaT([...P, P[0]], hex('#5a7a9a'));
  R.disco(cx + (giro ? 6 : -6), cy - 11, 3, hex('#f4f8ff')); R.disco(cx + (giro ? -8 : 8), cy + 11, 3, hex('#c8dcf0')); R.pset(cx - 4, cy - 2, hex('#ffffff')); R.pset(cx + 6, cy, hex('#a8c0dc')); };
const p1 = (t) => {
  capa('lc1', () => {
    madera(0, 0, 319, 179, [hex('#c89a64'), hex('#b4885a'), hex('#d8ac76'), hex('#9a6e44')], 16, 41);
    // la plancha de corte verde con su cuadrícula (lisa en la esquina de Atom)
    caja(14, 14, 300, 172, hex('#2e6a4a'));
    for (let y = 14; y <= 172; y++) for (let x = 14; x <= 300; x++) { if (x > 268 && y < 50) continue; const g = (x - 14) % 10 === 0 || (y - 14) % 10 === 0, G = (x - 14) % 50 === 0 || (y - 14) % 50 === 0; if (G) R.pset(x, y, hex('#6aa884')); else if (g && (x + y) % 2) R.pset(x, y, hex('#4a8a64')); else if (hh(x, y, 2) > 0.985) R.pset(x, y, hex('#3a7a54')); }
    for (let x = 24; x < 268; x += 5) R.rect(x, 15, x, x % 25 === 4 ? 19 : 17, hex('#a8d0b4'));
    // la copia impresa del mapa: la costa del sur que se tuerce hacia el este
    const M = [44, 26, 254, 130];
    sombrear(M[0] + 3, M[1] + 3, M[2] + 3, M[3] + 3, K, 0.5);
    for (let y = M[1]; y <= M[3]; y++) for (let x = M[0]; x <= M[2]; x++) { const n = hh(x >> 2, y >> 2, 18); R.pset(x, y, n > 0.84 ? PERG[1] : n < 0.08 ? PERG[3] : PERG[0]); }
    R.rect(M[0], M[1], M[2], M[1], PERG[2]); R.rect(M[0], M[3], M[2], M[3], PERG[2]);
    R.recorte([M[0] + 1, M[1] + 1, M[2] - 1, M[3] - 1]);
    rumbos(196, 58, 200);
    tierra([...COSTA, [254, 130], [44, 130], [44, 28]], hex('#a8c070'), hex('#c8a060'));
    for (const [mx, my] of [[70, 76], [86, 98], [60, 110], [150, 122], [200, 124], [110, 116]]) { R.linea(mx - 4, my, mx, my - 4, TIN); R.linea(mx, my - 4, mx + 4, my, TIN); }
    for (const [px, py] of [[76, 60], [130, 118], [228, 124]]) { R.rect(px, py - 4, px, py, hex('#5a3a1a')); R.disco(px, py - 6, 2, hex('#4a8a3a')); }
    costaT([[96, 76], [90, 90], [100, 106]], hex('#4a7aa0')); garabato(160, 118, 30, 2, TROJA, true, 2); garabato(150, 36, 34, 2, TIN, false, 1);
    for (let i = 0; i < 6; i++) { const x = 170 + i * 12, y = 76 + (i % 2) * 6; R.pset(x, y, hex('#4a7aa0')); R.pset(x + 1, y - 1, hex('#4a7aa0')); R.pset(x + 2, y, hex('#4a7aa0')); }
    rosaT(196, 58, 9); carabelaT(150, 72, 0, 1);
    R.recorte(null);
    // la tapa de la caja del puzle con su pingüino y piezas azules sueltas; el lápiz; la goma
    caja(22, 134, 92, 166, hex('#e8eef4')); R.rect(24, 136, 90, 164, hex('#6aa8d8')); R.rect(24, 154, 90, 164, hex('#f4f8ff')); R.rect(24, 152, 90, 153, hex('#c8dcf0'));
    R.disco(56, 146, 6, K); R.disco(56, 148, 5, hex('#2a2a3a')); R.disco(56, 149, 3, hex('#f4f4f4')); R.disco(56, 139, 4, hex('#2a2a3a')); R.pset(55, 138, hex('#ffffff')); R.pset(57, 138, hex('#ffffff')); R.rect(59, 139, 61, 140, hex('#f0a020')); R.rect(52, 155, 54, 156, hex('#f0a020')); R.rect(58, 155, 60, 156, hex('#f0a020'));
    for (const [x, y, c] of [[104, 140, '#6aa8d8'], [118, 150, '#4a88c0'], [100, 158, '#8ac0e8'], [126, 138, '#6aa8d8']]) { R.rect(x - 4, y - 3, x + 4, y + 3, K); R.rect(x - 3, y - 2, x + 3, y + 2, hex(c)); R.disco(x + 4, y, 2, hex(c)); }
    R.linea(150, 160, 196, 140, hex('#e8c030')); R.linea(150, 161, 196, 141, hex('#c8a020')); R.linea(196, 140, 200, 139, hex('#f0c8a0')); R.pset(201, 139, K); R.rect(146, 160, 150, 162, hex('#e88aa0'));
  });
  // la taza que humea (fuera de la esquina de Atom)
  caja(270, 120, 290, 142, hex('#e8e4dc')); R.rect(271, 121, 289, 123, hex('#5a3418')); R.rect(291, 126, 294, 136, K); R.rect(292, 127, 293, 135, hex('#e8e4dc')); R.rect(271, 136, 289, 141, hex('#c8c4bc'));
  for (let k = 0; k < 3; k++) { const u = ((t * 0.6 + k / 3) % 1); const y = Math.round(116 - u * 40); if (y < 52) continue; const x = 276 + k * 5 + Math.round(Math.sin(t * 3 + k + u * 5) * 3); R.pset(x, y, hex('#f4f4f4')); R.pset(x, y - 1, hex('#e0e0e0')); R.pset(x + 1, y - 2, hex('#f4f4f4')); }
  // la mano trae la pieza, la prueba en la costa, «X» y la lanza fuera
  const llega = suave(tramo(t, 0.4, noT - 0.35)), prueba = t > noT - 0.35 && t < antT, lanza = tramo(t, antT, antT + 0.7), sale = tramo(t, antT + 0.25, antT + 0.9);
  let wx = lerp(268, 238, llega), wy = lerp(196, 136, llega);
  if (prueba) { wx += Math.round(Math.sin(t * 22) * 2); wy += Math.round(Math.cos(t * 17) * 1); }
  wy += sale * 80; wx += sale * 20;
  let cx = wx - 26, cy = wy - 2;
  if (lanza > 0) { cx = lerp(212, 360, lanza); cy = 134 - Math.sin(lanza * Math.PI) * 60 - lanza * 20; }
  if (lanza < 1) pieza(cx, cy, lanza > 0 ? Math.floor(t * 10) % 2 : 0);
  if (wy < 200) T.brazo(R, wx + 22, wy + 50, wx, wy, '#5a6a8a', -1, { codo: [wx + 18, wy + 24] });
  if (t > noT && t < antT + 0.6) { const s = t < noT + 0.15 ? 4 : 3; R.icono('X', 206 - s * 2, 118 - s * 2, hex('#e83a2a'), K, s); }
  if (prueba && Math.floor(t * 8) % 2) for (const [x, y] of [[198, 116], [226, 118]]) { R.pset(x, y, hex('#e83a2a')); R.pset(x + 1, y + 1, hex('#e83a2a')); }
};

// ── 2 · de barco a barco ──
const p2 = (t) => {
  capa('lc2', () => { grad(0, 0, 319, 92, [hex('#4a7ac8'), hex('#6a98dc'), hex('#9ac0ec'), hex('#cce0f4')]);
    for (let x = 0; x < 130; x++) { const h1 = 88 + Math.round(Math.sin(x * 0.05) * 2 + Math.sin(x * 0.17)); for (let y = h1; y < 93; y++) R.pset(x, y, tr(x, y, 0.4) ? hex('#7a9ab8') : hex('#8aaac8')); } });
  nubes([0, 16, 268, 74], t, 26, 42, [hex('#ffffff'), hex('#e4ecf6'), hex('#b8c8dc')], 4, 0.8, 14);
  nubes([0, 40, 319, 80], t + 3, 54, 70, [hex('#ffffff'), hex('#e4ecf6'), hex('#b8c8dc')], 5, 1.2, 12);
  pajaros(t, 120, 270, 50, 3, 10);
  // el mar, más oscuro delante, con espuma
  for (let y = 93; y < 180; y++) { const d = (y - 93) / 87; for (let x = 0; x < 320; x++) { const o = Math.sin(x * 0.13 + y * 0.8 - t * 2.4) * Math.sin(x * 0.04 - y * 0.3 + t * 1.2); let c = d < 0.33 ? (tr(x, y, d * 3) ? hex('#3a78b0') : hex('#5a98c8')) : d < 0.66 ? (tr(x, y, d * 3 - 1) ? hex('#2a5a90') : hex('#3a78b0')) : (tr(x, y, d * 3 - 2) ? hex('#1a4070') : hex('#2a5a90'));
    if (o > 0.55) c = hex('#8ac0e8'); if (o > 0.82 && d > 0.2) c = hex('#e8f4ff'); R.pset(x, y, c); } }
  // el barco del horizonte
  nave(262 - (t - P2) * 2, 98, t, 0.9, hex('#f4ecd8'), [hex('#f4f0e4'), hex('#c8302a'), 'cruz'], -1, 2);
  // la galera otomana a la izquierda
  const bA = Math.round(Math.sin(t * 1.6) * 1.5), bB = Math.round(Math.sin(t * 1.4 + 1) * 1.5);
  { const dk = 120 + bA; R.linea(52, dk, 60, 26, hex('#5a3a22')); R.linea(53, dk, 61, 26, hex('#3a2212')); R.linea(10, 70, 128, 30, hex('#d8c8a0')); R.linea(10, 71, 128, 31, hex('#a89870'));
    R.poligono([[-4, dk - 4], [138, dk - 6], [130, dk + 18], [-4, dk + 20]], hex('#6e4229')); R.rect(-4, dk - 6, 138, dk - 4, hex('#a83224')); R.rect(-4, dk - 7, 138, dk - 7, hex('#e8c050'));
    for (let x = 4; x < 128; x += 10) { R.rect(x, dk + 2, x + 3, dk + 4, K); R.linea(x + 1, dk + 4, x - 6, dk + 26 + Math.round(Math.sin(t * 2 + x) * 2), hex('#c8a870')); }
    for (let x = 0; x < 132; x += 3) R.pset(x, dk + 10, hex('#8a5a32')); R.rect(-4, dk + 18, 132, dk + 20, hex('#3a2010'));
    R.rect(100, dk - 24, 136, dk - 21, hex('#c83a2a')); for (let x = 100; x <= 136; x += 6) R.rect(x, dk - 21, x + 2, dk - 19, hex('#e8c050')); R.linea(100, dk - 21, 100, dk - 7, hex('#5a3a22')); R.linea(136, dk - 21, 136, dk - 7, hex('#5a3a22'));
    for (let i = 1; i <= 10; i++) { const off = Math.round(Math.sin(i * 0.7 - t * 9)); for (let j = 0; j < 6; j++) R.pset(61 + i, 26 + j + off, i === 4 && j > 1 && j < 4 ? hex('#f4f0e4') : hex('#c8302a')); } }
  // la nao portuguesa a la derecha
  { const dk = 112 + bB; R.linea(240, dk, 240, 20, hex('#5a3a22')); R.linea(241, dk, 241, 20, hex('#3a2212')); R.linea(222, 30, 262, 30, hex('#5a3a22'));
    const hv = Math.round(3 + Math.sin(t * 2) * 1.5); R.poligono([[222, 31], [262, 31], [262 + hv, 76], [222 + hv, 76]], hex('#f4ecd8')); R.linea(222, 31, 222 + hv, 76, hex('#c8bca0')); R.rect(238 + hv, 40, 244 + hv, 66, hex('#c8302a')); R.rect(230 + hv, 50, 252 + hv, 55, hex('#c8302a'));
    R.poligono([[182, dk - 4], [330, dk - 10], [330, dk + 26], [190, dk + 22]], hex('#6e4229')); R.poligono([[280, dk - 24], [330, dk - 26], [330, dk - 8], [280, dk - 6]], hex('#5a3420')); R.rect(280, dk - 26, 330, dk - 25, hex('#a06a3a'));
    for (let x = 186; x < 330; x += 3) { R.pset(x, dk + 4, hex('#432414')); R.pset(x, dk + 12, hex('#432414')); } R.rect(182, dk - 6, 330, dk - 4, hex('#432414')); R.rect(182, dk - 7, 330, dk - 7, hex('#a06a3a'));
    for (let x = 186; x < 278; x += 8) R.rect(x, dk - 12, x + 1, dk - 6, hex('#5a3420')); R.rect(184, dk - 13, 278, dk - 12, hex('#8a5a32'));
    R.rect(296, dk - 20, 302, dk - 14, K); R.rect(297, dk - 19, 301, dk - 15, hex('#ffd860')); }
  // los marineros: el otomano lanza el rollo, el portugués lo atrapa, lo enseña y lo deja caer al bote
  const vuela = tramo(t, saber, saber + 0.7), atrapa = t > saber + 0.7, cae = tramo(t, barco, barco + 0.5), rema = tramo(t, barco + 0.5, P3 + 0.2);
  const mA = R.actor(EL.marineroOtomano1, 104, 114 + bA, t, { dir: 1, sostiene: t < saber ? [124, 98 + bA] : false, dedo: t > saber && t < saber + 0.6, sonrisa: t > saber });
  const lb = t > a1513 && t < barco, mB = R.actor(EL.pilotoPortugues, 196, 106 + bB, t, { dir: -1, sostiene: atrapa && cae <= 0 ? (lb ? [192, 78 + bB] : [188, 92 + bB]) : cae > 0 ? [206, 96 + bB] : false, sorpresa: atrapa && t < saber + 1.1, sonrisa: t > saber + 1.1 });
  let rx, ry;
  if (t < saber) { [rx, ry] = mA.mano; rx += 1; ry -= 2; }
  else if (vuela < 1) { rx = lerp(mA.mano[0], mB.mano[0] - 10, vuela); ry = lerp(mA.mano[1] - 2, mB.mano[1] - 2, vuela) - Math.sin(vuela * Math.PI) * 46; }
  else if (cae <= 0) { [rx, ry] = mB.mano; rx -= 10; ry -= 2; }
  else if (cae < 1) { rx = lerp(206, 214, cae); ry = lerp(94, 160, cae * cae); }
  else { rx = lerp(214, 300, rema) - 4; ry = 160 + Math.round(Math.sin(t * 2.4)); }
  // el rastro de oro del saber que viaja
  if (t > saber && t < barco + 1.6) for (let k = 1; k < 9; k++) { const u = vuela - k * 0.05; if (u <= 0 || u >= 1) continue; const x = Math.round(lerp(mA.mano[0], mB.mano[0] - 10, u)), y = Math.round(lerp(mA.mano[1] - 2, mB.mano[1] - 2, u) - Math.sin(u * Math.PI) * 46); if ((k + Math.floor(t * 10)) % 2) R.rect(x + 4, y + 2, x + 5, y + 3, hex('#ffe070')); }
  if (lb) { const [hx, hy] = mB.mano; R.rect(hx - 16, hy - 12, hx + 2, hy - 1, K); R.rect(hx - 15, hy - 11, hx + 1, hy - 2, PERG[3]); islas(hx - 20, hy - 15, 'fantasma', hex('#c86a4a')); R.rect(hx - 17, hy - 12, hx - 15, hy - 1, PERG[2]); R.rect(hx + 1, hy - 12, hx + 3, hy - 1, PERG[2]); for (let k = 0; k < 3; k++) destello(hx - 8 + k * 6, hy - 16, ((t - a1513) * 1.5 + k / 3) % 1); }
  else if (t > saber && vuela < 1) { const x = Math.round(rx), y = Math.round(ry); R.rect(x - 2, y - 2, x + 15, y + 6, K); R.rect(x - 1, y - 1, x + 14, y + 5, PERG[0]); R.rect(x - 1, y + 4, x + 14, y + 5, PERG[2]); R.rect(x + 3, y - 1, x + 4, y + 5, TROJA); R.rect(x + 10, y - 1, x + 11, y + 5, TROJA); R.rect(x, y, x + 13, y, PERG[3]); }
  else rolloMini(rx, ry);
  // el bote con su remero que lleva el rollo al barco del horizonte
  { const bx = Math.round(lerp(204, 300, rema)), by = 168 + Math.round(Math.sin(t * 2.4)); R.poligono([[bx - 18, by - 4], [bx + 18, by - 4], [bx + 13, by + 3], [bx - 13, by + 3]], hex('#7a4a2a')); R.rect(bx - 18, by - 5, bx + 18, by - 4, hex('#a06a3a'));
    R.actor(EL.marineroOtomano2, bx - 8, by - 2, t, { dir: 1, sostiene: [bx + 10 + Math.round(Math.sin(t * 5) * 4), by - 4] }); const r = Math.round(Math.sin(t * 5) * 4); R.linea(bx + 10 + r, by - 4, bx + 22 + r * 2, by + 6, hex('#c8a870'));
    if (cae > 0.9) for (let k = 0; k < 3 && t < barco + 1; k++) R.pset(bx - 10 + k * 8, by - 8 - k, hex('#e8f4ff')); }
};

// ── 3 · la popa de la galera: del prisionero al almirante, de una lengua a otra ──
const p3 = (t) => {
  capa('lc3', () => {
    grad(0, 0, 319, 80, [hex('#5a90d0'), hex('#80b0e0'), hex('#b0d0ec'), hex('#e4ecf0')]);
    for (let y = 80; y < 104; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tr(x, y, (y - 80) / 24) ? hex('#2a6aa0') : hex('#4a8ac0'));
    // las naos españolas apresadas, al fondo, con las velas recogidas
    for (const [x, s] of [[34, 0.8], [252, 0.7]]) { R.poligono([[x - 14 * s, 92], [x + 14 * s, 92], [x + 10 * s, 97], [x - 10 * s, 97]], hex('#4a2c18')); R.linea(x, 92, x, 92 - 22 * s, hex('#2a1a10')); R.linea(x - 8 * s, 92 - 16 * s, x + 8 * s, 92 - 16 * s, hex('#d8ccb0')); R.rect(x + 10 * s, 86, x + 14 * s, 91, hex('#5a3420')); }
    // la borda con sus balaustres y los toletes
    R.rect(0, 104, 319, 108, hex('#6e4229')); R.rect(0, 104, 319, 104, hex('#a06a3a')); for (let x = 2; x < 320; x += 7) { R.rect(x, 109, x + 2, 122, hex('#5a3420')); R.rect(x, 109, x, 122, hex('#8a5a32')); } R.rect(0, 122, 319, 126, hex('#4a2c18')); R.rect(0, 122, 319, 122, hex('#7a4a2a'));
    for (let x = 6; x < 320; x += 24) caja(x, 100, x + 2, 104, hex('#3a2010'));
    tablas(126, 179, [hex('#a8784a'), hex('#8a5e38'), hex('#c08a58'), hex('#5a3a22')], 13);
    // los cojines, el barril, la aduja y el farol de popa
    for (const [x, c] of [[176, '#a83224'], [194, '#3a6a8a']]) { R.disco(x, 166, 8, K); R.disco(x, 166, 7, hex(c)); R.rect(x - 7, 166, x + 7, 172, hex(c)); R.pset(x - 2, 162, hex('#e8c050')); }
    caja(282, 132, 300, 156, hex('#7a4a2a')); for (const y of [136, 150]) R.rect(281, y, 301, y + 1, hex('#3a3a44'));
    for (let r = 9; r > 2; r -= 2) R.anillo(30, 166, r, r % 4 === 1 ? hex('#c8a870') : hex('#a08050'));
  });
  nubes([0, 34, 319, 78], t, 46, 66, [hex('#ffffff'), hex('#e4ecf6'), hex('#b8c8dc')], 5, 1, 12);
  for (let y = 82; y < 104; y += 2) for (let x = (y * 7 + Math.floor(t * 8)) % 9; x < 320; x += 9) if (Math.sin(x * 0.3 + y - t * 2) > 0.6) { R.pset(x, y, hex('#8ac0e8')); R.pset(x + 1, y, hex('#8ac0e8')); }
  // la bandera de popa y un marinero que tira de un cabo junto a la borda
  { R.rect(304, 52, 305, 104, hex('#5a3420')); for (let i = 1; i <= 12; i++) { const off = Math.round(Math.sin(i * 0.7 - t * 9) * (i / 12) * 1.5); for (let j = 0; j < 8; j++) R.pset(305 - i, 52 + j + off, i === 5 && j > 2 && j < 6 ? hex('#f4f0e4') : hex('#c8302a')); } }
  { const tira = Math.sin(t * 3); R.actor(EL.marineroOtomano2, 236, 132, t, { dir: 1, sostiene: [254, 118 + Math.round(tira * 3)] }); R.linea(254, 118 + Math.round(tira * 3), 270, 98, hex('#c8a870')); }
  // el toldo de rayas que se mece (sin tocar la esquina de Atom), sus postes y los flecos
  for (const x of [14, 262]) { R.rect(x, 30, x + 2, 126, hex('#5a3420')); R.rect(x, 30, x, 126, hex('#8a5a32')); }
  for (let x = 0; x < 268; x++) { const caida = 30 + Math.round(Math.sin(x * 0.05 + t * 2) * 1.2); for (let y = 18; y <= caida; y++) R.pset(x, y, ((x >> 3) % 2 ? hex('#c8302a') : hex('#f4ecd8'))); R.pset(x, caida + 1, K); if (x % 4 === 0) { R.pset(x, caida + 2, hex('#e8c050')); R.pset(x, caida + 3 + (Math.sin(t * 5 + x) > 0 ? 1 : 0), hex('#e8c050')); } }
  R.rect(0, 17, 268, 17, hex('#7a2420'));
  pajaros(t, 20, 260, 46, 3, 9);
  // el farol de popa que se balancea
  { const a = Math.sin(t * 1.4) * 0.2, fx = Math.round(290 + Math.sin(a) * 10), fy = Math.round(60 + Math.cos(a) * 10); R.rect(289, 46, 291, 126, hex('#5a3420')); R.linea(290, 50, fx, fy - 4, K); caja(fx - 3, fy - 4, fx + 3, fy + 5, hex('#c8a040')); R.rect(fx - 2, fy - 2, fx + 2, fy + 3, hex('#fff0b0')); }
  // el prisionero entra con su guardia y da el rollo a Kemal; Kemal lo pasa a Piri
  const entra = suave(tramo(t, P3, almi - 0.25)), da = t > almi - 0.1, pasa = tramo(t, lengua - 0.35, lengua), abre = tramo(t, lengua, lengua + 0.3), cambia = tramo(t, lengua + 0.2, otra + 0.5), guarda = tramo(t, hoyT, hoyT + 0.5), cierra = tramo(t, descansa, descansa + 0.3);
  const pxp = Math.round(lerp(330, 206, entra));
  const pri = R.actor(EL.prisionero, pxp, 164, t, { dir: -1, anda: entra > 0 && entra < 1, sostiene: !da ? [pxp + 1, 150] : false, sonrisa: da, triste: !da });
  R.actor(EL.marineroOtomano1, pxp + 26, 164, t, { dir: -1, anda: entra > 0 && entra < 1, dedo: da && t < almi + 0.6 });
  const kDir = t > lengua - 0.45 ? -1 : 1;
  const ke = R.actor(EL.kemal, 164, 164, t, { dir: kDir, sostiene: da && pasa < 1 ? (kDir > 0 ? [182, 150] : [160, 148]) : false, sonrisa: da, habla: t > almi && t < lengua - 0.4 && Math.sin(t * 8) > 0 });
  const pr = R.actor(EL.piri, 112, 164, t, { dir: 1, sostiene: pasa >= 1 && guarda < 1 ? [128, 150 + Math.round(guarda * 10)] : false, sonrisa: cambia >= 1, sorpresa: abre > 0 && cambia < 0.3 });
  if (!da) rolloMini(pri.mano[0] - 9, pri.mano[1] - 2);
  else if (pasa < 1) { const [kx, ky] = ke.mano; rolloMini(lerp(kx - (kDir > 0 ? 1 : 10), 124, pasa), lerp(ky - 2, 147, pasa) - Math.sin(pasa * Math.PI) * 6); }
  else if (guarda < 1) { const [hx, hy] = pr.mano;
    if (abre < 1 || guarda > 0) { const w = Math.round(lerp(10, 40, abre) * (1 - guarda * 0.8)); R.rect(hx - 1, hy - 4, hx + w, hy + 1, K); R.rect(hx, hy - 3, hx + w - 1, hy, PERG[0]); }
    else { // la hoja abierta: renglones latinos en negro que se vuelven escritura árabe en rojo, de derecha a izquierda
      const x0 = hx - 4, y0 = hy - 30; R.rect(x0 - 1, y0 - 1, x0 + 41, y0 + 27, K); R.rect(x0, y0, x0 + 40, y0 + 26, PERG[3]); R.rect(x0 - 2, y0 - 1, x0, y0 + 27, PERG[2]); R.rect(x0 + 40, y0 - 1, x0 + 42, y0 + 27, PERG[2]);
      const filas = 5; for (let f = 0; f < filas; f++) { const hecho = cambia * filas - f; if (hecho >= 1) garabato(x0 + 3, y0 + 4 + f * 4, 34, 1, TROJA, true, f); else { garabato(x0 + 3, y0 + 4 + f * 4, 34, 1, TIN, false, f); if (hecho > 0) { R.rect(x0 + 3 + Math.round(34 * (1 - hecho)), y0 + 2 + f * 4, x0 + 37, y0 + 5 + f * 4, PERG[3]); garabato(x0 + 3, y0 + 4 + f * 4, 34, 1, TROJA, true, f, hecho); } } }
      if (cambia > 0 && cambia < 1) { const sx = x0 + 3 + Math.round(34 * (1 - (cambia * filas % 1))), sy = y0 + 4 + Math.floor(cambia * filas) * 4; destello(sx, sy, (t * 3) % 1, hex('#fff0a0')); } } }
  // el cofre a los pies de Piri: se abre al guardar el rollo y se cierra en «rests»
  { const x = 136, y = 168, tapa = guarda > 0 ? 1 - cierra : 0; caja(x, y - 10, x + 20, y, hex('#7a4a2a')); R.rect(x, y - 6, x + 20, y - 5, hex('#c8a040')); caja(x + 9, y - 7, x + 11, y - 4, hex('#e8c050'));
    if (tapa > 0.05) { const h = Math.round(tapa * 8); R.rect(x - 1, y - 11 - h, x + 21, y - 10, K); R.rect(x, y - 10 - h, x + 20, y - 11, hex('#5a3420')); if (guarda > 0.5) rolloMini(x + 5, y - 14); } else { R.rect(x - 1, y - 13, x + 21, y - 10, K); R.rect(x, y - 12, x + 20, y - 11, hex('#8a5a32')); R.rect(x, y - 12, x + 20, y - 12, hex('#b8844a')); } }
};

// ── 4 · el museo de Topkapı: la campana baja y el pergamino descansa ──
const p4 = (t) => {
  const baja = suave(tramo(t, casiNunca + 0.05, casiNunca + 1.1)), dim = tramo(t, fragil + 0.5, fragil + 1.4) * 0.35;
  const o = { encuadre: 'palacio', camara: 'museo', tapa: 1 - baja, pergamino: true };
  T.estambul(R, t, o);
  const coloca = t < casiNunca, sube = t > casiNunca && t < casiNunca + 1.1, no = t > fragil - 0.05 && t < fragil + 1.2;
  R.actor(EL.conservador, 152, 126, t, { dir: no ? -1 : 1, sostiene: coloca ? [160 + Math.round(Math.sin(t * 2.2) * 6), 129] : false, brazos: sube, dedo: no, enfado: no && t < fragil + 0.6, sonrisa: t > fragil + 1.2 });
  // los visitantes: llegan, uno saca el móvil y lo guarda cuando el conservador dice que no
  const v1 = suave(tramo(t, P4 + 0.2, P4 + 1.6)), v2 = suave(tramo(t, P4 + 0.8, casiNunca + 0.4));
  const movil = t > saca - 0.1 && t < fragil + 0.5;
  const a = R.actor(EL.visitante1, Math.round(lerp(-16, 50, v1)), 168, t, { dir: 1, anda: v1 > 0 && v1 < 1, sostiene: movil ? [72, 138] : false, sorpresa: t > fragil && t < fragil + 0.7, triste: t > fragil + 0.7 });
  if (movil) { const [hx, hy] = a.mano; R.rect(hx - 1, hy - 7, hx + 4, hy + 1, K); R.rect(hx, hy - 6, hx + 3, hy, hex('#3a4a6a')); R.pset(hx + 1, hy - 5, hex('#8ac0e8')); }
  R.actor(EL.visitante2, Math.round(lerp(330, 246, v2)), 168, t, { dir: -1, anda: v2 > 0 && v2 < 1, dedo: t > casiNunca + 0.4 && t < saca, sonrisa: t > P4 + 2 });
  T.estambulDelante(R, t, o);
  if (no) { R.icono('X', 120, 86, hex('#e83a2a'), K, 2); }
  if (baja > 0 && baja < 1) for (let k = 0; k < 3; k++) destello(110 + k * 50, 112, (baja * 2 + k / 3) % 1);
  // la sala se queda en penumbra (menos la vitrina)
  if (dim > 0) for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 1.6, y - 132); if (d > 40 && !(x > 276 && y < 46)) R.pset(x, y, mez(R.pget(x, y), hex('#06040c'), dim * Math.min(1, (d - 40) / 60))); }
};

const año = (t) => (t < P2 ? 2026 : t < P3 ? 1513 : t < P4 ? 1501 : 2026);
const efectos = [[noT - 0.3, 'golpecito'], [noT, 'boing'], [antT + 0.05, 'whoosh'], [saber, 'whoosh'], [saber + 0.7, 'palmada'], [barco + 0.5, 'chof'],
  [almi, 'papel'], [lengua + 0.3, 'brillo'], [descansa + 0.3, 'cerrojo'], [casiNunca + 1.1, 'golpecito'], [fragil, 'aviso']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
""")

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['pr-cierre'] = ('Cierre', """// PR-CIERRE (frase 26), hoy, sin cartela; la barra marca 2026. Dos planos (Atom sale en los dos: la esquina queda
// tranquila):
// 1. «Now tell me in the comments, what other impossible object would you like me to check?» (0–5,35 s): el despacho de
//    hoy (2.ª vez; el globo que gira, la ventana al campus con estudiantes): Atom entra por la ventana y salta en
//    «comments»; en «impossible object» se encienden uno a uno, con su «?», tres objetos raros sobre el escritorio (una
//    cabeza de piedra, un engranaje de bronce y una bola de piedra); en «check?» Atom da una vuelta con un «?» grande.
// 2. «Meanwhile, I'm going to try to unroll this map, without it rolling up on me again.» (5,35 s–fin): LOCAL el
//    escritorio de cerca a la luz de la tarde (la lámpara verde, la taza que humea, la ventana con el árbol): Atom baja
//    junto al rollo y en «unroll this map» lo empuja con muchísimo cuidado y el mapa se despliega; en «without» va a
//    sujetar el borde y en «rolling up on me» el rollo vuelve de golpe y se enrolla con él dentro (gag 8): el rollo se
//    sacude y se ve su luz por la punta.""", COMUN + COMUN2 + r"""
R.companero = () => {};   // Atom está en el plano: la esquina queda tranquila
const P2 = en('cierre', .4952);
const ahora = en('cierre', .0511), coment = en('cierre', .096), obj = en('cierre', .2226), mira = en('cierre', .435);
const desenrolla = en('cierre', .6749), sin = en('cierre', .8097), enrolla = en('cierre', .8628);

// ── 1 · el despacho: los objetos imposibles ──
const p1 = (t) => {
  const o = { encuadre: 'despacho' };
  T.hoy(R, t, o);
  // los tres objetos raros del escritorio, que se encienden uno a uno
  const on = [obj - 0.1, obj + 0.35, obj + 0.8].map((w) => tramo(t, w, w + 0.4));
  { const x = 168, y = 115, s = on[0] > 0 && on[0] < 1 ? -2 : 0; R.rect(x - 4, y - 14 + s, x + 4, y, K); R.rect(x - 3, y - 13 + s, x + 3, y - 1, hex('#8a8478')); R.rect(x - 3, y - 13 + s, x + 3, y - 11 + s, hex('#6a645a')); R.rect(x - 2, y - 9 + s, x - 1, y - 8 + s, K); R.rect(x + 1, y - 9 + s, x + 2, y - 8 + s, K); R.rect(x - 1, y - 6 + s, x + 1, y - 3 + s, hex('#a8a090')); R.rect(x - 2, y - 2, x + 2, y - 2, hex('#6a645a')); }
  { const x = 186, y = 108, s = on[1] > 0 && on[1] < 1 ? -2 : 0; R.disco(x, y + s, 6, K); R.disco(x, y + s, 5, hex('#5a8a6a')); for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5 + t * 0.8; R.pset(Math.round(x + Math.cos(a) * 6), Math.round(y + s + Math.sin(a) * 6), hex('#b8a050')); } R.disco(x, y + s, 2, hex('#c8b060')); R.linea(x - 3, y + s, x + 3, y + s, hex('#3a5a4a')); R.rect(x - 3, y + 6, x + 3, y + 7, hex('#5a3420')); }
  { const x = 202, y = 111, s = on[2] > 0 && on[2] < 1 ? -2 : 0; R.disco(x, y + s, 4, K); R.disco(x, y + s, 3, hex('#9a9488')); R.pset(x - 1, y - 2 + s, hex('#d0c8b8')); R.rect(x - 3, y + 4, x + 3, y + 5, hex('#5a3420')); }
  for (let i = 0; i < 3; i++) if (on[i] > 0) { const x = [168, 186, 202][i], y = [98, 96, 102][i] - Math.round(Math.min(1, on[i] * 2) * 4); globo(x, y, '?', hex('#3a6ac8')); if (on[i] < 1) for (let k = 0; k < 3; k++) destello(x - 8 + k * 8, y + 8, (on[i] * 2 + k / 3) % 1); }
  T.hoyDelante(R, t, o);
  // Atom entra por la ventana, salta en «comments», recorre los objetos y da una vuelta en «check?»
  const entra = suave(tramo(t, 0, ahora + 0.5)), va = suave(tramo(t, obj - 0.4, obj + 1.0)), vuelve = suave(tramo(t, mira - 0.6, mira));
  let ax = lerp(108, 150, entra), ay = lerp(56, 72, entra);
  if (va > 0) { ax = lerp(150, 186, va); ay = lerp(72, 74, va); }
  if (vuelve > 0) { ax = lerp(186, 238, vuelve); ay = lerp(74, 70, vuelve); }
  const salto = t > coment && t < coment + 0.7 ? Math.round(Math.abs(Math.sin((t - coment) * Math.PI * 2.8)) * 8) : 0;
  const giro = t > mira ? tramo(t, mira, mira + 0.6) : 0;
  ax += Math.round(Math.sin(giro * Math.PI * 2) * 6); ay += Math.sin(t * 2.6) * 2 - salto;
  atomEn(ax, ay, t, giro > 0 && giro < 1 ? 0.9 : salto ? 0.7 : 0.4);
  if (t > mira) { const y = Math.round(ay - 24 - Math.min(1, (t - mira) * 4) * 4); R.rect(Math.round(ax) - 9, y - 4, Math.round(ax) + 9, y + 14, K); R.rect(Math.round(ax) - 8, y - 3, Math.round(ax) + 8, y + 13, hex('#fbf6ea')); R.icono('?', Math.round(ax) - 6, y - 2, hex('#e8a020'), K, 2); }
};

// ── 2 · el escritorio de cerca: el mapa se enrolla otra vez con Atom dentro ──
const XL = 58, Y0 = 106, Y1 = 142;
const p2 = (t) => {
  capa('cc2', () => {
    // la pared de papel pintado crema con rayas suaves (lisa arriba a la derecha)
    for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) { const r = x > 270 && y < 50 ? 0 : (x % 16 === 0 ? 2 : x % 16 === 8 && (y >> 2) % 2 ? 1 : 0); R.pset(x, y, r === 2 ? hex('#d8c8a0') : r === 1 ? hex('#e4d4ac') : hh(x >> 3, y >> 3, 51) > 0.92 ? hex('#ecdcb6') : hex('#f2e4c0')); }
    R.rect(0, 90, 319, 95, hex('#8a5a32')); R.rect(0, 90, 319, 90, hex('#b8844a'));
    // la ventana con su marco blanco
    caja(12, 14, 98, 82, hex('#f4f0e8')); R.rect(10, 82, 100, 85, hex('#f4f0e8')); R.rect(10, 85, 100, 85, hex('#c8c0b0'));
    // la estantería pequeña con libros y una planta (lejos de la esquina de Atom)
    caja(196, 40, 262, 42, hex('#6e4229')); caja(196, 64, 262, 66, hex('#6e4229'));
    for (let i = 0; i < 9; i++) { const x = 198 + i * 6, h = 14 + (i * 7) % 6, c = [hex('#a83224'), hex('#3a6a8a'), hex('#c8a040'), hex('#4a7a4a'), hex('#6a3a6a')][i % 5]; R.rect(x, 63 - h, x + 4, 63, K); R.rect(x + 1, 64 - h, x + 3, 63, c); R.rect(x + 1, 60 - h + 6, x + 3, 60 - h + 6, hex('#e8d8a0')); }
    R.poligono([[228, 40], [240, 40], [238, 30], [230, 30]], hex('#c8643a')); for (const [dx, dy] of [[-4, -6], [0, -10], [4, -6]]) R.disco(234 + dx, 28 + dy, 3, hex('#4a8a4a'));
    R.rect(150, 30, 176, 60, K); R.rect(151, 31, 175, 59, hex('#c8a070')); R.rect(153, 33, 173, 57, hex('#e8d8b0')); R.disco(163, 45, 7, hex('#6aa8d8')); R.poligono([[159, 41], [165, 39], [167, 47], [161, 50]], hex('#8ab070'));
    // el tablero del escritorio con vetas, el canto y los cajones con tiradores
    madera(0, 96, 319, 150, NOG, 9, 61); R.rect(0, 150, 319, 156, hex('#3a2010')); R.rect(0, 150, 319, 150, hex('#8a5a32'));
    for (const x0 of [0, 108, 216]) { caja(x0 + 4, 158, x0 + 102, 179, hex('#5a3420')); madera(x0 + 5, 159, x0 + 101, 179, NOG, 7, x0); caja(x0 + 46, 166, x0 + 58, 169, hex('#c8a040')); }
    // la lámpara verde de banquero y un tarro de lápices
    caja(106, 72, 138, 82, hex('#2a6a3a')); R.rect(107, 73, 137, 74, hex('#5aa86a')); R.rect(121, 82, 123, 108, hex('#c8a040')); caja(112, 108, 132, 112, hex('#c8a040'));
    caja(246, 96, 258, 114, hex('#3a4a6a')); for (const [dx, c] of [[0, '#e8c030'], [3, '#c83a2a'], [6, '#3a8ae8'], [9, '#e8c030']]) { R.rect(247 + dx, 84 + (dx % 4), 248 + dx, 96, hex(c)); }
  });
  // la ventana: cielo, nubes y el árbol que se mece
  R.recorte([15, 17, 95, 79]); grad(15, 17, 95, 79, [hex('#7ab0e0'), hex('#a8cceb'), hex('#d8e8f4')]); nubes([15, 17, 95, 79], t, 26, 44, [hex('#ffffff'), hex('#e4ecf6'), hex('#b8c8dc')], 3, 1, 10); R.recorte([15, 17, 95, 79]);
  for (const [dx, dy, r, c] of [[0, 0, 14, '#3a7a3a'], [12, -8, 10, '#4a8a3a'], [-8, 6, 10, '#2e6a2e'], [18, 8, 9, '#3a7a3a']]) R.disco(70 + dx + Math.round(Math.sin(t * 1.3 + dx) * 1.5), 58 + dy, r, hex(c));
  R.rect(66, 64, 70, 80, hex('#5a3a1a')); pajaros(t, 18, 92, 24, 2, 7); R.recorte(null);
  R.rect(54, 14, 56, 82, hex('#f4f0e8')); R.rect(12, 47, 98, 49, hex('#f4f0e8'));
  // la luz de la lámpara y la taza que humea
  halo(122, 92, 34, hex('#fff0c0'), 0.25);
  { const a = Math.sin(t * 3.1) * 0.3, px = Math.round(214 + Math.sin(a) * 9), py = Math.round(24 + Math.cos(a) * 9); caja(207, 4, 221, 36, hex('#6e4229')); R.rect(209, 19, 219, 35, hex('#3a2010')); R.disco(214, 11, 5, hex('#f4ecd8')); R.anillo(214, 11, 5, K); R.linea(214, 11, 214, 8, K); R.linea(214, 11, 216, 12, K); R.linea(214, 18, px, py, hex('#c8a040')); R.disco(px, py, 2, hex('#e8c050')); }
  caja(276, 112, 294, 132, hex('#c83a2a')); R.rect(277, 113, 293, 114, hex('#5a3418')); R.rect(295, 117, 298, 126, K); R.rect(296, 118, 297, 125, hex('#c83a2a')); R.rect(277, 126, 293, 131, hex('#a82a1a'));
  for (let k = 0; k < 3; k++) { const u = ((t * 0.6 + k / 3) % 1), y = Math.round(108 - u * 40); if (y < 56) continue; R.pset(280 + k * 5 + Math.round(Math.sin(t * 3 + k + u * 5) * 3), y, hex('#f4f4f4')); }
  // el mapa: se despliega al empujar el rollo y vuelve de golpe
  const empuja = suave(tramo(t, desenrolla - 0.1, sin - 0.1)), golpe = tramo(t, enrolla, enrolla + 0.3);
  const xr = Math.round(golpe > 0 ? lerp(232, XL + 4, golpe * golpe) : lerp(XL + 10, 232, empuja));
  const mapa = capaB('cc2m', () => {
    for (let y = Y0; y <= Y1; y++) for (let x = XL; x <= 250; x++) { const n = hh(x >> 2, y >> 2, 71); R.pset(x, y, y === Y0 || y === Y1 ? PERG[2] : n > 0.84 ? PERG[1] : PERG[0]); }
    R.recorte([XL, Y0 + 1, 250, Y1 - 1]); rumbos(170, 124, 120);
    tierra([[XL, 110], [80, 112], [96, 118], [104, 128], [98, 142], [XL, 142]], hex('#a8c070'), hex('#c8a060'));
    tierra([[250, 108], [232, 112], [222, 122], [228, 134], [240, 142], [250, 142]], hex('#d8b060'), hex('#c89a50'));
    islas(96, 98); rosaT(170, 124, 7); carabelaT(196, 132, 0, 1); garabato(120, 136, 30, 1, TROJA, true, 3); R.recorte(null);
  });
  const B = R.buf; for (let y = Y0; y <= Y1; y++) for (let x = XL; x < xr; x++) { const i = y * 320 + x; if (mapa[i]) B[i] = mapa[i]; }
  for (let y = Y0 + 2; y <= Y1 + 2; y++) R.pset(xr, y, mez(R.pget(xr, y), K, 0.4));
  // el rollo: un cilindro de pie a lo hondo, con su espiral arriba
  const dentro = golpe >= 1, sacude = dentro ? Math.round(Math.sin(t * 25) * (t < enrolla + 1.2 ? 2 : 0.6)) : 0, rx = xr + sacude + (dentro ? Math.round(Math.sin((t - enrolla) * 3) * 4) : 0);
  { const w = dentro ? 14 : 10; R.rect(rx - 1, Y0 - 3, rx + w + 1, Y1 + 1, K); for (let x = rx; x <= rx + w; x++) { const u = (x - rx) / w, c = u < 0.2 ? PERG[2] : u < 0.6 ? PERG[3] : u < 0.85 ? PERG[0] : PERG[1]; R.rect(x, Y0 - 2, x, Y1, c); }
    R.rect(rx, Y0 - 4, rx + w, Y0 - 1, K); R.rect(rx + 1, Y0 - 3, rx + w - 1, Y0 - 2, PERG[1]); R.anillo(rx + Math.round(w / 2), Y0 - 3, 2, PERG[2]);
    R.rect(rx + 2, Y0 + 8, rx + w - 2, Y0 + 8, TROJA); R.rect(rx + 2, Y1 - 8, rx + w - 2, Y1 - 8, TROJA);
    if (dentro) { const c = Math.floor(t * 6) % 2 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]; R.rect(rx + 3, Y0 - 3, rx + w - 3, Y0 - 2, c); for (let k = 0; k < 3; k++) { const a = t * 6 + k * 2.1; R.pset(Math.round(rx + w / 2 + Math.cos(a) * 10), Math.round(Y0 - 6 + Math.sin(a) * 4), hex('#c8f0ff')); } } }
  // Atom: baja junto al rollo, lo empuja con cuidado, va a sujetar el borde y el rollo lo atrapa
  if (golpe < 0.6) { const baja = suave(tramo(t, P2, P2 + 1.2)), va = suave(tramo(t, sin - 0.1, enrolla - 0.05));
    let ax = lerp(180, XL + 2, baja), ay = lerp(40, 98, baja);
    if (empuja > 0) ax = xr - 14; if (va > 0) ax = lerp(xr - 14, XL + 6, va);
    const punt = empuja > 0 && empuja < 1 ? Math.round(Math.abs(Math.sin(t * 6)) * 2) : 0;
    atomEn(ax, ay + Math.sin(t * 2.6) * 2 - punt, t, empuja > 0 && empuja < 1 ? 0.3 : 0.45, 12);
    if (empuja > 0 && empuja < 1) for (let k = 0; k < 2; k++) destello(Math.round(xr - 4), Y0 + 10 + k * 16, ((t * 1.5) + k / 2) % 1, hex('#fff6c0')); }
  if (golpe > 0 && golpe < 1) for (let k = 0; k < 6; k++) R.pset(xr + 12 + k * 6, Y0 + 4 + (k % 3) * 12, hex('#fff6c0'));
  if (dentro && t > enrolla + 0.5) { const y = Y0 - 26 - Math.round(Math.min(1, (t - enrolla - 0.5) * 4) * 4); globo(rx + 8, y + 18, '!', hex('#e83a2a')); }
  if (dentro && t > enrolla + 1.3) for (let k = 0; k < 3; k++) { const a = t * 4 + k * 2.1; R.icono('?', Math.round(rx + 26 + Math.cos(a) * 4 + k * 10), Math.round(Y0 - 14 + Math.sin(a) * 3 - k * 4), hex('#ffe890'), K, 1); }
};

const efectos = [[ahora + 0.2, 'whoosh'], [coment + 0.1, 'boing'], [obj, 'pop'], [obj + 0.8, 'pop'], [mira, 'brillo'], [P2 + 0.9, 'pop'], [desenrolla, 'papel'], [enrolla, 'whoosh'], [enrolla + 0.3, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 2026 });
""")
