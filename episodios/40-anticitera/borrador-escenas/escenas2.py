# Borrador de escenas del ep40 (Anticitera), grupo S2: ak-rescate, ak-terron, ak-price.
# python3 atomo/herramientas/generar-escenas.py ak ep40 episodios/40-anticitera/borrador-escenas/escenas2.py --destino atomo/plato/escenas/_tmp_S2 --pisar
E = {}

# Utilidades compartidas por las tres escenas (ruido, tramas, mezcla de color, búferes de lo fijo, madera, ruedas,
# nubes, gaviotas). No redeclaran T, R, E, M, EL, tramo, lerp, hex ni en.
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

E['ak-rescate'] = ('El rescate', '''// AK-RESCATE (frases 6–7), 1900→1901. Cinco planos:
// 1. (0 → «It was») mar rescate general: la grúa iza una estatua de bronce que chorrea; los bomberos dan a la bomba,
//    Kontos señala la estatua en «navy» y sonríe en «bring it all up»; un buzo sube por la escalerilla.
// 2. («It was» → «and it lasted») fondo local, bajo el agua: dos buzos con escafandra de cobre trabajan en el yacimiento
//    (uno ata un cabo a una estatua de mármol; el otro mete un ánfora en el cesto que baja); las mangueras laten con el
//    aire bombeado a mano. Gag 3: un pulpo le quita el pañuelo rojo al buzo y se lo pone en la cabeza a la estatua.
// 3. («and it lasted» → «The ship») mar rescate 'hallazgos', 1901: Kontos señala cada hallazgo cuando la voz lo dice
//    (bronce, vidrio, cerámica, joyas) y un marinero deja otra ánfora en su caballete.
// 4. («The ship» → «treasures») fondo local, cenital: el barco mercante de hacia el 60 a. C. avanza cargado de filas de
//    ánforas, dos estatuas tumbadas y un cofre de joyas que destella en «luxuries»; el de proa señala adelante en «Rome».
// 5. («treasures» → fin) fondo local: el rincón de los terrones en la cubierta del vapor; un marinero pasa con un ánfora
//    sin mirarlos; una gaviota se posa, picotea un terrón y se le cae un trozo («falling apart»); se va.''', PRE + r'''
const a = (f) => en('rescate', f), b = (f) => en('tesoros', f);
const P2 = a(0.374), P3 = a(0.832), P4 = b(0.206), P5 = b(0.62);

// 1 · la grúa iza la estatua
const p1 = (t) => {
  const iza = tramo(t, 0.6, a(0.31)), o = { encuadre: 'rescate', iza, bomba: 1 };
  const g = T.mar(R, t, o), s = g.suelo;
  // un marinero cruza la cubierta con un rollo de cabo al hombro y lo deja junto al torno
  const u = tramo(t, 0.3, 3.2), mx = Math.round(lerp(78, 150, u));
  const mm = R.actor(EL.marineroAK, mx, s, t, { dir: 1, anda: u > 0 && u < 1, sostiene: u < 1 ? [mx + 14, s - 18] : [mx + 15, s - 8] });
  R.disco(mm.mano[0] + 1, mm.mano[1] + 1, 4, K); R.disco(mm.mano[0] + 1, mm.mano[1] + 1, 3, hex('#c8a870')); R.anillo(mm.mano[0] + 1.5, mm.mano[1] + 1.5, 1.5, hex('#8a6a40'));
  // Kontos dirige: señala la estatua al decir «navy» y sonríe cuando sale entera
  const habla = t > a(0.05) && t < a(0.17) && Math.sin(t * 9) > 0;
  R.actor(EL.kontosAK, 120, s, t, { dir: 1, dedo: t > a(0.16) && t < a(0.33), habla, sonrisa: t > a(0.29), sorpresa: t > a(0.25) && t < a(0.29) });
  // un buzo sube por la escalerilla y se queda en la borda mirando la estatua
  const sb = tramo(t, 2.0, 4.6), by = Math.round(lerp(s + 30, s, sb));
  R.recorte([0, 0, 319, s + 1]); R.actor(EL.buzoAK, 172, by, t, { dir: 1, anda: sb > 0 && sb < 1, brazos: sb > 0.2 && sb < 0.9 }); R.recorte(null);
  T.marDelante(R, t, o);
  // las gotas de la estatua al salir del agua
  if (iza > 0.55) for (let k = 0; k < 6; k++) { const ph = (t * 1.6 + k / 6) % 1, gx = 286 + (k * 5) % 13, gy = Math.round(g.estatua[1] + 2 + ph * (160 - g.estatua[1])); if (gy < 160) R.pset(gx, gy, hex('#a8d8f0')); }
};

// 2 · bajo el agua: el yacimiento, los buzos y el pulpo
const fondoAgua = () => capa('agua', () => {
  degr(0, 0, 319, 132, [hex('#5aaec8'), hex('#3a8aae'), hex('#2a6a92'), hex('#1e5476'), hex('#174460')]);
  // la superficie vista desde abajo: ondas claras y la quilla del caíque
  for (let x = 0; x < 320; x++) { const y = Math.round(3 + Math.sin(x * 0.11) * 1.5 + Math.sin(x * 0.037) * 2); R.rect(x, 0, x, y, hex('#8ad0e0')); if (H_(x, 1) > 0.6) R.pset(x, y + 1, hex('#bfe8f0')); }
  // arrecifes lejanos en dos tonos
  for (let x = 0; x < 320; x++) { const y1 = 92 + Math.round(Math.sin(x * 0.045) * 9 + Math.sin(x * 0.13) * 3), y2 = 108 + Math.round(Math.sin(x * 0.03 + 2) * 7 + Math.sin(x * 0.17) * 2);
    for (let y = y1; y < 132; y++) R.pset(x, y, y < y2 ? (H_(x, y, 4) > 0.9 ? hex('#2a6680') : hex('#235a76')) : (H_(x, y, 5) > 0.88 ? hex('#245570') : hex('#1c4a64'))); }
  // la arena con ondas, conchas y piedras
  for (let y = 126; y < 180; y++) for (let x = 0; x < 320; x++) { const w = Math.sin(x * 0.22 + y * 0.9 + Math.sin(y * 0.3) * 2), d = (y - 126) / 54;
    let c = d < 0.25 ? hex('#7a8a7a') : d < 0.6 ? hex('#a89a74') : hex('#c2ae80'); if (w > 0.82) c = mez(c, BL, 0.25); else if (w < -0.85) c = mez(c, K, 0.2);
    if (H_(x, y, 6) > 0.985) c = hex('#e8dcc0'); R.pset(x, y, c); }
  for (let k = 0; k < 14; k++) { const x = Math.round(H_(k, 1, 8) * 310) + 4, y = 140 + Math.round(H_(k, 2, 8) * 36); R.disco(x, y, 2 + H_(k, 3, 8) * 2, hex('#6a6a5a')); R.pset(x - 1, y - 1, hex('#9a9a88')); }
  // las cuadernas y la tablazón del barco hundido, a la derecha
  for (let k = 0; k < 7; k++) { const x = 214 + k * 15, alto = 12 + Math.round(H_(k, 4, 9) * 12); R.poligono([[x, 152], [x + 4, 152], [x + 7, 152 - alto], [x + 3, 150 - alto]], K); R.poligono([[x + 1, 152], [x + 3, 152], [x + 6, 153 - alto], [x + 4, 152 - alto]], hex('#5a4030')); R.pset(x + 2, 148, hex('#7a5a40')); R.pset(x + 5, 140 - (k % 3), hex('#4a8a6a')); R.pset(x + 4, 150 - alto + 3, hex('#5a4430')); }
  tablas(206, 150, 319, 162, 4, hex('#4a3626'), hex('#2e2018'), hex('#6a5038'), 3);
  // ánforas tumbadas y de pie con incrustaciones
  const anfora = (x, y, tum) => { if (tum) { R.disco(x, y, 6, K); R.disco(x, y, 5, hex('#a86a40')); R.rect(x + 5, y - 2, x + 11, y + 2, K); R.rect(x + 6, y - 1, x + 10, y + 1, hex('#a86a40')); R.disco(x - 1, y - 2, 2, hex('#c88a58')); R.pset(x + 2, y + 2, hex('#e8e0c8')); R.pset(x - 3, y + 1, hex('#7ab89a')); }
    else { R.disco(x, y, 6, K); R.disco(x, y, 5, hex('#a86a40')); R.rect(x - 2, y - 12, x + 2, y - 4, K); R.rect(x - 1, y - 11, x + 1, y - 4, hex('#a86a40')); R.rect(x - 4, y - 10, x - 3, y - 6, K); R.rect(x + 3, y - 10, x + 4, y - 6, K); R.disco(x - 2, y - 2, 2, hex('#c88a58')); R.pset(x + 2, y + 1, hex('#e8e0c8')); } };
  for (const [x, y, tu] of [[226, 146, 0], [240, 148, 1], [262, 144, 0], [276, 147, 0], [292, 146, 1], [306, 143, 0], [250, 158, 1], [20, 160, 1], [48, 152, 0]]) anfora(x, y, tu);
  // la estatua de mármol de pie sobre su peana medio enterrada: un hombre con himatión, el brazo doblado sobre el pecho
  const sx = 128, MA = hex('#eeeae0'), MS = hex('#c8c2b4'), MSS = hex('#a89e8e'), ML = hex('#fbf9f2');
  R.rect(sx - 14, 138, sx + 14, 155, K); R.rect(sx - 13, 139, sx + 13, 154, MS); R.rect(sx - 13, 139, sx + 13, 141, MA); R.rect(sx - 13, 151, sx + 13, 154, MSS); R.rect(sx - 15, 136, sx + 15, 138, K); R.rect(sx - 14, 136, sx + 14, 137, MA);
  R.poligono([[sx - 9, 136], [sx + 10, 136], [sx + 10, 112], [sx + 11, 100], [sx + 7, 96], [sx - 7, 96], [sx - 10, 102], [sx - 10, 116]], K);
  R.poligono([[sx - 8, 135], [sx + 9, 135], [sx + 9, 112], [sx + 10, 101], [sx + 6, 97], [sx - 6, 97], [sx - 9, 103], [sx - 9, 116]], (x, y) => ((x - y * 0.6) % 6 + 6) % 6 < 1 ? MS : x < sx - 3 ? ML : x > sx + 5 ? MS : MA);
  R.rect(sx - 6, 133, sx - 2, 136, K); R.rect(sx + 2, 133, sx + 6, 136, K); R.rect(sx - 5, 134, sx - 3, 135, MA); R.rect(sx + 3, 134, sx + 5, 135, MA);
  R.linea(sx - 8, 100, sx - 10, 112, K); R.linea(sx - 9, 112, sx + 3, 106, K); R.linea(sx - 8, 111, sx + 3, 105, MA); R.disco(sx + 4, 105, 2, MA);
  R.linea(sx + 10, 100, sx + 12, 116, K); R.linea(sx + 11, 100, sx + 12, 115, MS); R.disco(sx + 12, 117, 1.6, MS);
  R.rect(sx - 2, 91, sx + 2, 97, K); R.rect(sx - 1, 92, sx + 1, 96, MA); R.disco(sx, 87, 6, K); R.disco(sx, 87, 5, MA); R.disco(sx - 2, 85, 2, ML);
  for (const [dx, dy] of [[-4, -3], [-2, -5], [1, -5], [3, -4], [4, -1]]) R.pset(sx + dx, 87 + dy, MS);
  R.pset(sx - 5, 110, hex('#7ab89a')); R.pset(sx + 6, 124, hex('#7ab89a')); R.pset(sx + 7, 125, hex('#4a8a6a')); R.pset(sx - 7, 146, hex('#4a8a6a')); R.pset(sx + 9, 149, hex('#4a8a6a')); R.pset(sx - 2, 120, hex('#d8a8a0'));
  // la roca de la izquierda, con estratos, grietas, esponjas de bola y de tubo y erizos
  R.poligono([[0, 96], [22, 90], [48, 100], [62, 126], [60, 162], [0, 168]], K);
  R.poligono([[0, 98], [21, 92], [46, 102], [60, 126], [58, 160], [0, 166]], (x, y) => { const v = H_(x >> 1, y >> 1, 11), e = Math.sin(y * 0.5 + x * 0.1); return v > 0.82 ? hex('#5e7680') : e > 0.85 ? hex('#26363e') : y < 112 ? hex('#4e6470') : x > 40 ? hex('#2e3e46') : hex('#3a4e58'); });
  for (const [x0, y0, x1, y1] of [[10, 110, 26, 124], [36, 132, 48, 150], [6, 144, 20, 152]]) R.linea(x0, y0, x1, y1, hex('#1e2a30'));
  for (const [x, y, c, r] of [[14, 98, '#e8a040', 4], [40, 104, '#c85a7a', 3], [30, 128, '#e8c050', 4], [10, 140, '#9a5ac8', 3], [50, 146, '#e86a3a', 3]]) { R.disco(x, y, r + 1, K); R.disco(x, y, r, hex(c)); R.disco(x - 1, y - 1, r * 0.4, mez(hex(c), BL, 0.5)); R.pset(x + 1, y + 1, mez(hex(c), K, 0.4)); }
  for (const [x, y] of [[24, 112], [28, 110], [32, 113]]) { R.rect(x, y - 7, x + 2, y, K); R.rect(x + 1, y - 6, x + 1, y, hex('#d8c870')); }
  for (const [x, y] of [[52, 120], [20, 156]]) { R.disco(x, y, 3, K); R.disco(x, y, 2, hex('#2a1a3a')); for (let k = 0; k < 8; k++) { const an = k * 0.785; R.pset(Math.round(x + Math.cos(an) * 4), Math.round(y + Math.sin(an) * 4), K); } }
  for (const [x, y, c] of [[64, 128, '#c84a5a'], [270, 128, '#e8a050']]) for (let k = 0; k < 9; k++) { const an = -Math.PI / 2 + (k - 4) * 0.2; R.linea(x, y, x + Math.cos(an) * 14, y + Math.sin(an) * 14, hex(c)); R.pset(Math.round(x + Math.cos(an) * 14), Math.round(y + Math.sin(an) * 14), mez(hex(c), BL, 0.4)); }
});
const p2 = (t) => {
  fondoAgua();
  // rayos de luz que se mueven (lejos de Atom y del año)
  for (let k = 0; k < 4; k++) { const x0 = 30 + k * 70 + Math.sin(t * 0.4 + k) * 12; for (let y = 22; y < 128; y++) { const x = Math.round(x0 + y * 0.35); if (x > 270) continue; for (let w = 0; w < 6; w++) if (b4(x + w, y) < 0.18) R.pset(x + w, y, mez(R.pget(x + w, y), hex('#bfeaf2'), 0.35)); } }
  // la quilla del caíque y la manguera que baja
  // peces que cruzan (un banco lejano y dos sargos)
  for (let k = 0; k < 7; k++) { const x = ((t * 14 + k * 9) % 380) - 30, y = 62 + (k % 3) * 4 + Math.sin(t * 2 + k) * 2; pez(x, y, 1, hex('#8ab8c8'), hex('#4a7a8a')); }
  pez(320 - ((t * 22) % 360) + 20, 116, -1, hex('#c8c0a0'), hex('#7a7458')); pez(320 - ((t * 17 + 90) % 360) + 20, 104, -1, hex('#c8c0a0'), hex('#7a7458'));
  { const mx = Math.round(((t * 6) % 400) - 40), my = 78 + Math.round(Math.sin(t * 0.7) * 3); R.poligono([[mx - 12, my], [mx - 4, my - 6], [mx + 8, my - 4], [mx + 12, my], [mx + 8, my + 4], [mx - 4, my + 5]], hex('#3a6a82')); R.poligono([[mx - 12, my], [mx - 18, my - 5], [mx - 18, my + 5]], hex('#3a6a82')); R.pset(mx + 8, my - 1, hex('#1e3a4a')); }
  { const jx = 236 + Math.round(Math.sin(t * 0.5) * 8), jy = 52 + Math.round(Math.sin(t * 0.9) * 4) - Math.round(Math.abs(Math.sin(t * 1.8)) * 2), puls = Math.abs(Math.sin(t * 1.8)) > 0.5 ? 1 : 0;
    R.disco(jx, jy, 5 - puls, hex('#c8a8d8')); R.disco(jx - 1, jy - 1, 2, hex('#f0e0f8')); R.rect(jx - 5 + puls, jy, jx + 5 - puls, jy + 1, hex('#a888c0')); for (let k = -3; k <= 3; k += 2) for (let j = 2; j < 10; j++) R.pset(jx + k + Math.round(Math.sin(t * 3 + j * 0.6 + k) * 1), jy + j, hex('#b898c8')); }
  // las burbujas del aire bombeado a mano: salen a golpes, al ritmo de la bomba
  const pulso = (t * 1.3) % 1;
  // el cesto que baja con su cabo
  const cb = tramo(t, P2 + 0.2, P2 + 2.4), cy = Math.round(lerp(10, 150, cb)), cx = 196;
  R.linea(cx, 8, cx, cy - 12, hex('#d8c8a0')); R.linea(cx - 7, cy - 6, cx, cy - 12, hex('#d8c8a0')); R.linea(cx + 7, cy - 6, cx, cy - 12, hex('#d8c8a0'));
  R.rect(cx - 9, cy - 6, cx + 9, cy + 6, K); for (let y = cy - 5; y <= cy + 5; y++) for (let x = cx - 8; x <= cx + 8; x++) R.pset(x, y, (x + y) % 3 === 0 ? hex('#7a5a30') : (x - y) % 4 === 0 ? hex('#5a4020') : hex('#a07a44'));
  // buzo 1: llega desde la izquierda y ata un cabo a la cintura de la estatua; luego tira del cabo para avisar arriba
  const u1 = tramo(t, P2, P2 + 1.6), x1 = Math.round(lerp(60, 96, u1)), ata = t > P2 + 1.7 && t < a(0.70);
  const m1 = R.actor(EL.buzoAK, x1, 160, t, { dir: 1, anda: u1 > 0 && u1 < 1, sostiene: ata ? [114 + Math.round(Math.sin(t * 6) * 3), 124 + Math.round(Math.cos(t * 6) * 2)] : undefined, dedo: t > a(0.72) && t < a(0.80) });
  const lazo = tramo(t, P2 + 2.2, a(0.66));
  if (lazo > 0) { R.linea(118, 124, 118 + 20 * lazo, 124, hex('#e8d8a8')); R.linea(118, 125, 118 + 20 * lazo, 125, hex('#b89a60')); }
  if (lazo >= 1) { const tens = tramo(t, a(0.72), a(0.80)); for (let y = 10; y < 124; y += 1) { const x = Math.round(lerp(150, 138, (y - 10) / 114) + (1 - tens) * Math.sin(y * 0.15) * 3); R.pset(x, y, hex('#d8c8a0')); } }
  // buzo 2: coge un ánfora del montón y la mete en el cesto
  const u2 = tramo(t, P2 + 0.4, P2 + 2.0), x2 = Math.round(lerp(236, 170, u2)), lleva = t > P2 + 0.4 && t < P2 + 3.6;
  const mete = tramo(t, P2 + 2.8, P2 + 3.6), sorpresa2 = t > a(0.70);
  const m2 = R.actor(EL.buzoAK, x2, 162, t, { dir: t > a(0.71) ? -1 : t > P2 + 2.0 && t < P2 + 3.8 ? 1 : -1, anda: u2 > 0 && u2 < 1, sostiene: lleva ? [Math.round(lerp(x2 - 2, cx - 4, mete)), Math.round(lerp(148, cy - 2, mete))] : undefined, sorpresa: sorpresa2, habla: sorpresa2 && Math.sin(t * 8) > 0 });
  if (lleva) { const [hx, hy] = m2.mano; R.disco(hx, hy + 2, 4, K); R.disco(hx, hy + 2, 3, hex('#a86a40')); R.rect(hx - 1, hy - 5, hx + 1, hy - 1, hex('#a86a40')); R.pset(hx - 1, hy + 1, hex('#c88a58')); }
  else if (t > P2 + 3.6) { R.disco(cx, cy - 6, 3, K); R.disco(cx, cy - 6, 2, hex('#a86a40')); R.rect(cx, cy - 11, cx + 1, cy - 8, hex('#a86a40')); }
  // las mangueras de aire: de cada casco hasta la superficie, con un latido
  for (const [m, kx] of [[m1, 0], [m2, 1]]) { const hx = (kx ? x2 : x1) + 7, hy = (kx ? 162 : 160) - 26;
    for (let y = 8; y < hy; y += 1) { const f = (y - 8) / (hy - 8), x = Math.round(lerp(200 + kx * 30, hx, f) + Math.sin(f * 6 + t * 1.5 + kx) * 6 * (1 - f) * f * 4); R.pset(x, y, hex('#2a2420')); R.pset(x + 1, y, hex('#5a4a3a')); if (((y - t * 60) % 22 + 22) % 22 < 3 && pulso < 0.6) R.pset(x, y, hex('#8a7a60')); }
    for (let k = 0; k < 4; k++) { const ph = (pulso + k * 0.25 + kx * 0.13) % 1; const bx = hx + 4 + Math.round(Math.sin(ph * 9 + k) * 2), by = Math.round(hy - 2 - ph * 60); if (by > 8) { R.anillo(bx + 0.5, by + 0.5, 1 + (k % 2), hex('#d8f2f8')); R.pset(bx, by - 1, BL); } } }
  // el pañuelo rojo del buzo 2 (gag 3): colgado del cinturón; el pulpo se lo lleva y lo deja en la cabeza de la estatua
  const coge = a(0.66), suelta = a(0.78), vuela = tramo(t, coge + 0.3, suelta);
  const px0 = 252, py0 = 150, px = Math.round(lerp(px0, 136, vuela) + Math.sin(vuela * 9) * 3), py = Math.round(lerp(py0, 92, vuela) - Math.sin(vuela * Math.PI) * 12);
  const pana = (x, y) => { R.poligono([[x - 7, y - 3], [x + 7, y - 3], [x + 1, y + 6]], K); R.poligono([[x - 6, y - 2], [x + 6, y - 2], [x + 1, y + 5]], hex('#d8303a')); R.pset(x - 3, y - 1, BL); R.pset(x + 3, y, BL); R.pset(x - 2, y, BL); R.pset(x + 1, y + 1, BL); R.pset(x, y - 1, hex('#f05a5a')); };
  const pulpoX = t < coge + 0.3 ? px0 : t < suelta ? px : Math.round(lerp(136, 70, tramo(t, suelta + 0.05, suelta + 0.6)));
  const pulpoY = t < coge + 0.3 ? py0 : t < suelta ? py + 8 : Math.round(lerp(100, 66, tramo(t, suelta + 0.05, suelta + 0.6)));
  T.b_pulpo(R, pulpoX, pulpoY, t, { dir: -1, hacia: t < coge + 0.3 ? [x2 + 2, 150] : undefined, estira: tramo(t, coge - 0.5, coge), color: t > suelta ? 0.6 : 0 });
  if (t < coge) pana(x2 + 3, 150); else if (t < suelta) pana(px - 6, py + 2); else { pana(128, 83); }
  // la tinta del pulpo al irse, una nubecita
  if (t > suelta + 0.2 && t < suelta + 1.2) { const v = tramo(t, suelta + 0.2, suelta + 1.2); R.disco(140 - v * 10, 98, 3 + v * 4, mez(hex('#1a2a3a'), hex('#2a6a92'), v)); }
  // la posidonia de delante, que ondea, y el velo azul del agua
  velo(0, 0, 319, 179, hex('#1e5a80'), 0.12);
  for (const x0 of [6, 14, 300, 310]) for (let k = 0; k < 4; k++) { let x = x0 + k * 2, y = 180; for (let j = 0; j < 26 + k * 4; j++) { const nx = x + Math.sin(t * 1.4 + j * 0.2 + k) * 0.6; R.pset(Math.round(nx), y - j, j % 5 === 0 ? hex('#3a7a3a') : hex('#2a5a2a')); x = nx; } }
};

// 3 · los hallazgos en la cubierta del vapor (1901)
const p3 = (t) => {
  const o = { encuadre: 'rescate', camara: 'hallazgos' }, g = T.mar(R, t, o), s = g.suelo;
  // Kontos repasa la carga: señala el bronce, luego el vidrio, la cerámica y las joyas, cuando la voz los nombra
  const mira = t < b(0.07) ? -1 : 1;
  R.actor(EL.kontosAK, 156, s, t, { dir: mira, dedo: (t > b(0.02) && t < b(0.08)) || (t > b(0.085) && t < b(0.2)), sonrisa: t > b(0.15), habla: t < b(0.0) && Math.sin(t * 8) > 0.3 });
  // un marinero entra con un ánfora a cuestas y la deja en el caballete
  const u = tramo(t, P3 + 0.3, b(0.06)), mx = Math.round(lerp(330, 202, u)), deja = tramo(t, b(0.06), b(0.12));
  const mm = R.actor(EL.marineroAK, mx, s, t, { dir: -1, anda: u > 0 && u < 1, sostiene: deja < 1 ? [mx - 2, Math.round(lerp(s - 18, s - 24, deja))] : undefined, sonrisa: deja >= 1 });
  if (deja < 1) { const [hx, hy] = mm.mano; R.disco(hx - 1, hy, 5, K); R.disco(hx - 1, hy, 4, hex('#b87a48')); R.rect(hx - 2, hy - 8, hx, hy - 4, K); R.pset(hx - 1, hy - 6, hex('#b87a48')); R.pset(hx - 2, hy - 1, hex('#e0e8d0')); R.pset(hx, hy + 2, hex('#7ab89a')); }
  else { R.disco(206, s - 30, 5, K); R.disco(206, s - 30, 4, hex('#b87a48')); R.rect(205, s - 38, 207, s - 34, K); }
  // un grumete friega el bronce con un trapo (vida)
  R.actor(EL.marineroAK, 22, s, t, { dir: 1, sostiene: [42 + Math.round(Math.sin(t * 7) * 3), s - 12], pal: { H: hex('#6a3a1a') } });
  T.marDelante(R, t, o);
  // las joyas destellan cuando la voz dice «jewelry»
  const j = tramo(t, b(0.15), b(0.15) + 0.25) - tramo(t, b(0.15) + 0.6, b(0.15) + 1.0);
  if (j > 0) for (const [x, y] of [[244, 140], [251, 137]]) { const r = Math.round(1 + j * 3); R.linea(x - r, y, x + r, y, BL); R.linea(x, y - r, x, y + r, BL); R.pset(x, y, hex('#fff8c0')); }
};

// 4 · el barco de hacia el 60 a. C., cargado, camino de Roma: visto desde arriba, al atardecer
const marArriba = () => capa('marArriba', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const sw = Math.sin(x * 0.05 + y * 0.11) * 0.5 + Math.sin(x * 0.13 - y * 0.07) * 0.3, d = x / 320 * 0.6 + y / 180 * 0.4 + sw * 0.25, v = Math.max(0, d * 3.2), i = Math.floor(v), f = v - i, cols = [hex('#3a7a9a'), hex('#2a6a8a'), hex('#235a7a'), hex('#1c4a6a'), hex('#163c5a')];
    R.pset(x, y, cols[Math.min(4, f > b4(x, y) ? i + 1 : i)]); }
  // un islote de roca con espuma, abajo a la derecha, con unas gaviotas posadas
  R.poligono([[236, 180], [246, 158], [266, 146], [292, 142], [312, 150], [320, 156], [320, 180]], hex('#e8f4f8'));
  R.poligono([[242, 180], [250, 160], [268, 150], [292, 146], [310, 153], [320, 158], [320, 180]], K);
  R.poligono([[243, 180], [251, 161], [268, 151], [292, 147], [309, 154], [319, 159], [319, 180]], (x, y) => { const v = H_(x >> 1, y >> 1, 44); return v > 0.85 ? hex('#d8c8a0') : v < 0.15 ? hex('#6a5a48') : y < 160 ? hex('#b8a882') : hex('#988a6a'); });
  for (const [x, y] of [[262, 160], [280, 154], [300, 158], [274, 170]]) { R.linea(x - 4, y, x + 4, y - 1, hex('#5a4a3a')); R.pset(x, y - 1, hex('#e0d0a8')); }
  for (const [x, y] of [[286, 152], [298, 155]]) { R.rect(x - 2, y - 2, x + 2, y, K); R.rect(x - 1, y - 2, x + 1, y - 1, BL); R.pset(x + 2, y - 3, hex('#e8a030')); }
  // algas flotando y una boya de corcho
  for (const [x, y] of [[40, 40], [210, 30], [60, 160], [180, 168]]) for (let k = 0; k < 6; k++) R.pset(x + k * 2, y + Math.round(Math.sin(k) * 2), hex('#5a7a3a'));
});
const barcoArriba = (x, y, t) => {
  const s = 1.35, X = (i) => Math.round(x + i * s), Y = (j) => Math.round(y + j * s);
  const L = Math.round(84 * s), W = Math.round(24 * s), perfil = (u) => Math.pow(Math.max(0, 1 - Math.pow(Math.abs(u), 2.4)), 0.55);
  for (let i = -L; i <= L; i++) { const w = Math.round(W * perfil(i / L)); if (w > 0) for (let j = -w; j <= w; j++) { const px = x + i + 7, py = y + j + 9; R.pset(px, py, mez(R.pget(px, py), hex('#0a1a2a'), 0.45)); } }
  for (let i = -L; i <= L; i++) { const w = Math.round(W * perfil(i / L)); if (w <= 0) continue;
    for (let j = -w; j <= w; j++) { const borde = Math.abs(j) >= w - 2 || Math.abs(i) >= L - 1, fila = (j + 40) % 5;
      R.pset(x + i, y + j, borde ? (Math.abs(j) >= w - 1 ? K : hex('#5a3420')) : fila === 0 ? hex('#6a4428') : H_(Math.floor((i + 200) / 7), j, 40) > 0.88 ? hex('#a8784a') : (Math.floor((i + 300 + (j + 40) * 13) / 23) % 2 ? hex('#c09060') : hex('#b88858'))); } }
  for (let i = -L + 6; i < L - 6; i += 9) { const w = Math.round(W * perfil(i / L)) - 2; R.pset(x + i, y - w, hex('#d8b080')); R.pset(x + i, y + w, hex('#d8b080')); }
  for (const sg of [-1, 1]) { R.linea(X(-66), Y(sg * 16), X(-84), Y(sg * 28), K); R.linea(X(-66), Y(sg * 15), X(-84), Y(sg * 27), hex('#a07040')); R.rect(X(-90), Y(sg * 28) - 3, X(-82), Y(sg * 28) + 3, K); R.rect(X(-89), Y(sg * 28) - 2, X(-83), Y(sg * 28) + 2, hex('#8a5a34')); }
  R.disco(X(-80), y, 7, K); R.disco(X(-80), y, 6, hex('#c8a060')); R.disco(X(-80), y, 3.5, hex('#8a5a34')); R.disco(X(-80), y, 1.5, hex('#c8a060'));
  for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) { const ax = X(-52 + c * 7 + (r % 2) * 3), ay = Y(-13 + r * 6.5); R.disco(ax, ay, 4, K); R.disco(ax, ay, 3.2, r % 2 ? hex('#c07848') : hex('#b06a40')); R.disco(ax, ay, 1.2, hex('#3a1e10')); R.pset(ax - 2, ay - 2, hex('#e8a070')); R.pset(ax + 2, ay + 1, hex('#8a4a28')); }
  for (let c = 0; c < 10; c++) R.linea(X(-54 + c * 7), Y(-16), X(-51 + c * 7), Y(16), hex('#d8c8a0'));
  const bz = hex('#c8963a'), bzS = hex('#8a6024'), bzL = hex('#f0c868'), ma = hex('#e4ded0'), maS = hex('#c8c2b4');
  const tumbada = (j0, c, cS, cL) => {
    R.rect(X(13), Y(j0 - 6), X(52), Y(j0 + 6), K); R.rect(X(13) + 1, Y(j0 - 6) + 1, X(52) - 1, Y(j0 + 6) - 1, hex('#d8c070')); for (let k = 0; k < 24; k++) R.pset(X(14) + (k * 7) % 50, Y(j0 - 5) + (k * 3) % 14, hex('#b89a50'));
    R.disco(X(47), Y(j0), 5, K); R.disco(X(47), Y(j0), 4, c); R.disco(X(46), Y(j0) - 1, 1.6, cL);
    R.rect(X(21), Y(j0 - 3.5), X(43), Y(j0 + 3.5), K); R.rect(X(21) + 1, Y(j0 - 3.5) + 1, X(43) - 1, Y(j0 + 3.5) - 1, c); R.rect(X(21) + 1, Y(j0 - 3.5) + 1, X(43) - 1, Y(j0 - 3.5) + 2, cL);
    R.linea(X(41), Y(j0 - 3), X(33), Y(j0 - 8), K); R.linea(X(40), Y(j0 - 3), X(33), Y(j0 - 7), c); R.linea(X(41), Y(j0 + 3), X(32), Y(j0 + 7), K); R.linea(X(40), Y(j0 + 3), X(32), Y(j0 + 6), c);
    R.rect(X(15), Y(j0 - 3), X(21), Y(j0 - 1), K); R.rect(X(15), Y(j0 + 1), X(21), Y(j0 + 3), K); R.rect(X(16), Y(j0 - 2), X(20), Y(j0 - 2), cS); R.rect(X(16), Y(j0 + 2), X(20), Y(j0 + 2), cS);
    for (const k of [26, 37]) R.linea(X(k), Y(j0 - 6), X(k), Y(j0 + 6), hex('#e8d8a8')); };
  tumbada(-8.5, bz, bzS, bzL); R.pset(X(30), Y(-9), hex('#4a8a6a')); R.pset(X(36), Y(-8), hex('#4a8a6a'));
  tumbada(8.5, ma, maS, BL);
  R.rect(X(55), Y(-6), X(66), Y(6), K); R.rect(X(55) + 1, Y(-6) + 1, X(66) - 1, Y(6) - 1, hex('#7a4a28')); R.rect(X(56) + 1, Y(-5) + 1, X(65) - 1, Y(5) - 1, hex('#e8c060'));
  for (const [dx, dy, c] of [[2, 2, '#d83a3a'], [5, 4, '#3a8ad8'], [8, 2, '#f8f0d0'], [4, 7, '#3ac87a'], [9, 8, '#d83a3a']]) R.pset(X(56) + dx, Y(-5) + dy, hex(c));
  const hin = 12 + Math.sin(t * 1.3) * 2, Lm = Math.round(36 * s);
  for (let j = -Lm; j <= Lm; j++) { const bx = x + 2 + Math.round(hin * (1 - (j / Lm) ** 2)); for (let i = x + 2; i <= bx; i++) { const px = i + 7, py = y + j + 9; R.pset(px, py, mez(R.pget(px, py), K, 0.3)); } }
  for (let j = -Lm + 1; j < Lm; j++) { const bx = x + 2 + Math.round(hin * (1 - (j / Lm) ** 2)); R.pset(x + 1, y + j, K); for (let i = x + 2; i <= bx; i++) R.pset(i, y + j, (j + 60) % 12 === 0 ? hex('#c8a878') : i > bx - 3 ? hex('#e0c098') : hex('#f4e4c4')); R.pset(bx + 1, y + j, K); }
  R.rect(x - 1, y - Lm - 2, x + 1, y + Lm + 2, K); R.rect(x, y - Lm - 1, x, y + Lm + 1, hex('#a07040')); R.disco(x, y, 3, K); R.disco(x, y, 2, hex('#8a5a34'));
  for (const sg of [-1, 1]) { R.linea(x, y + sg * Lm, X(60), Y(sg * 18), hex('#3a2a20')); R.linea(x, y + sg * Lm, X(-50), Y(sg * 20), hex('#3a2a20')); }
  R.poligono([[x + L - 2, y - 4], [x + L + 13, y], [x + L - 2, y + 4]], K); R.poligono([[x + L - 1, y - 2], [x + L + 10, y], [x + L - 1, y + 2]], hex('#8a5a34'));
};
// un marinero visto desde arriba: el gorro, los hombros y un brazo que puede señalar
const marArr = (x, y, gorro, brazo) => { R.disco(x, y + 1, 5, K); R.disco(x, y + 1, 4, hex('#c8bc9a')); R.disco(x - 1, y + 2, 2, hex('#a89a7a')); R.disco(x, y, 3.4, K); R.disco(x, y, 2.6, hex(gorro)); R.pset(x - 1, y - 1, mez(hex(gorro), BL, 0.4));
  if (brazo) { R.linea(x + 3, y + 2, x + 13, y - 4, K); R.linea(x + 3, y + 1, x + 12, y - 4, hex('#d8a070')); R.disco(x + 13, y - 5, 1.5, hex('#f0c090')); } };
const p4 = (t) => {
  marArriba();
  // el oleaje que corre, con el brillo del sol bajo que viene de la izquierda
  for (let k = 0; k < 170; k++) { const wx = Math.round(((H_(k, 1, 41) * 340 + t * (6 + (k % 4) * 2)) % 340) - 10), wy = Math.round(H_(k, 2, 41) * 180), l = 3 + (k % 3) * 2, g = wx < 140 && (k % 3) === 0;
    R.rect(wx, wy, wx + l, wy, g ? hex('#f8c878') : hex('#4a8aa8')); R.rect(wx + 1, wy + 1, wx + l + 1, wy + 1, hex('#12344c')); }
  // el barco avanza despacio hacia la derecha, camino de Roma, y la estela queda atrás
  const u = (t - P4) / (P5 - P4), x = Math.round(lerp(132, 168, u)), y = 100 + Math.round(Math.sin(t * 1.4) * 1);
  for (let k = 0; k < 40; k++) { const ex = x - 90 - k * 4, sp = 3 + k * 0.6; for (const s of [-1, 1]) { const ey = Math.round(y + s * sp + Math.sin(k * 0.8 + t * 3)); if (ex > -4) R.rect(ex, ey, ex + 2, ey, k % 4 ? hex('#a8d0e0') : BL); } }
  for (let k = 0; k < 8; k++) { const fx = x + 86 + k, fy = y + Math.round((k + 2) * 1.4 * (k % 2 ? 1 : -1)); R.pset(fx, fy, BL); }
  barcoArriba(x, y, t);
  // los marineros: el timonel en popa y el de proa, que señala adelante en «Rome»; otro repasa las ánforas
  marArr(x - 98, y - 14, '#8a3a2a', false); marArr(x + 92, y - 6, '#c8a040', t > b(0.50) && t < b(0.62));
  { const v = tramo(t, P4 + 0.5, b(0.40)), sx2 = Math.round(lerp(x - 70, x - 12, v)); marArr(sx2, y + 24, '#3a5a8a', false); }
  // el destello de los lujos en «luxuries»
  const lu = tramo(t, b(0.39), b(0.39) + 0.3) - tramo(t, b(0.39) + 0.7, b(0.39) + 1.1);
  if (lu > 0) for (const [gx, gy] of [[x + 81, y - 1], [x + 46, y - 12], [x + 40, y + 11]]) { const r = Math.round(1 + lu * 4); R.linea(gx - r, gy, gx + r, gy, BL); R.linea(gx, gy - r, gx, gy + r, BL); R.pset(gx, gy, hex('#fff8c0')); }
  // dos delfines que nadan junto al casco y asoman el lomo
  for (let k = 0; k < 2; k++) { const dx = Math.round(x + 10 + k * 40 + Math.sin(t * 1.1 + k) * 6), dy = y + 52 + k * 9, asoma = Math.sin(t * 2.2 + k * 2) > 0;
    R.poligono([[dx - 8, dy], [dx - 2, dy - 2], [dx + 7, dy - 1], [dx + 10, dy], [dx + 7, dy + 1], [dx - 2, dy + 2]], asoma ? hex('#6a7a9a') : hex('#2a5070')); R.poligono([[dx - 8, dy], [dx - 12, dy - 3], [dx - 12, dy + 3]], asoma ? hex('#5a6a8a') : hex('#24486a')); if (asoma) { R.pset(dx + 3, dy - 1, hex('#9aaac8')); R.pset(dx - 12, dy - 3, BL); } }
  // gaviotas que cruzan por encima y su sombra en el agua
  for (let k = 0; k < 3; k++) { const gx = ((t * 20 + k * 40) % 400) - 40, gy = 150 - k * 8 + Math.sin(t + k) * 3; gaviota(gx + 8, gy + 10, t, 1, false, k); }
};

// 5 · el rincón de los terrones: nadie los mira
const rincon = () => capa('rincon', () => {
  // el cielo tramado y el mar detrás de la amurada
  degr(0, 0, 319, 60, [hex('#7ab0d8'), hex('#9ac4e2'), hex('#bcd8ea'), hex('#dcebf0')]);
  for (let y = 54; y < 72; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (Math.sin(x * 0.4 + y * 2) > 0.8) ? hex('#6aa6c8') : y < 60 ? hex('#3a7aa8') : hex('#2a6a9a'));
  for (let x = 0; x < 120; x++) { const y = 54 - Math.round(Math.max(0, Math.sin(x * 0.04) * 10 + Math.sin(x * 0.2) * 2)); R.rect(x, y, x, 54, H_(x, 3) > 0.7 ? hex('#a8987a') : hex('#8a7c64')); }
  // la amurada de chapa con costuras, remaches y chorreras de óxido, y la regala de madera
  R.rect(0, 68, 319, 72, K); tablas(0, 64, 319, 70, 7, hex('#8a6038'), hex('#5e3c22'), hex('#b88a58'), 5);
  for (let y = 72; y < 132; y++) for (let x = 0; x < 320; x++) { let c = (x % 46 === 0 || y === 100) ? hex('#4a5054') : hex('#7a8288'); if ((x % 46 === 3 || x % 46 === 43) && y % 6 === 0) c = hex('#a8b0b4'); if (y % 6 === 1 && (x % 46 === 3 || x % 46 === 43)) c = hex('#3a4044');
    const ox = (x * 7) % 46; if (ox < 2 && H_(x, 1) > 0.5 && y > 74 && y < 74 + H_(x, 2) * 50) c = hex('#a85a2a'); if (H_(x >> 1, y >> 1, 12) > 0.93) c = mez(c, hex('#9a6a3a'), 0.5); R.pset(x, y, c); }
  // la cubierta de teca calafateada
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const alto = 5 + Math.floor((y - 132) / 12), fila = Math.floor((y - 132) / 6), jx = (x + fila * 31) % 64;
    let c = (y - 132) % 6 === 0 ? hex('#2a1e14') : jx === 0 ? hex('#3a2a1e') : H_(x >> 2, y, 13) > 0.85 ? hex('#8a6a44') : hex('#a88458'); if (H_(x, y, 14) > 0.97) c = hex('#c8a474'); R.pset(x, y, c); }
  // el salvavidas colgado y un bichero trincado
  R.disco(40, 96, 13, K); R.disco(40, 96, 12, hex('#e8e0d0')); for (let k = 0; k < 4; k++) { const a1 = k * Math.PI / 2 + 0.4; R.disco(40 + Math.cos(a1) * 9, 96 + Math.sin(a1) * 9, 3.6, hex('#d83a3a')); } R.disco(40, 96, 6, K); R.disco(40, 96, 5, hex('#7a8288'));
  R.linea(64, 76, 104, 128, K); R.linea(65, 76, 105, 128, hex('#a07040')); R.rect(62, 74, 66, 78, hex('#5a5a62'));
  // un portillo con su reflejo, una chaqueta de faena en un gancho y las defensas de cabo
  R.disco(150, 92, 10, K); R.disco(150, 92, 9, hex('#c8a040')); R.disco(150, 92, 7, K); R.disco(150, 92, 6, hex('#3a6a8a')); R.linea(146, 89, 150, 87, hex('#bfe0f0')); R.pset(153, 95, hex('#6a9aba')); for (let k = 0; k < 6; k++) { const an = k * 1.047; R.pset(Math.round(150 + Math.cos(an) * 8), Math.round(92 + Math.sin(an) * 8), hex('#7a5a20')); }
  R.rect(196, 74, 197, 80, K); R.rect(192, 80, 202, 98, K); R.rect(193, 81, 201, 97, hex('#2a4a6a')); R.rect(193, 81, 196, 97, hex('#3a5a7a')); R.rect(196, 84, 198, 92, hex('#c8a040')); R.pset(194, 96, hex('#1a2a3a')); R.pset(200, 96, hex('#1a2a3a'));
  R.rect(232, 78, 240, 79, K); R.rect(235, 74, 237, 78, K);
  for (let k = 0; k < 3; k++) { const fx = 104 + k * 26; R.linea(fx, 72, fx, 82, hex('#c8a870')); R.rect(fx - 3, 82, fx + 3, 92, K); R.rect(fx - 2, 83, fx + 2, 91, hex('#b8945a')); R.rect(fx - 2, 86, fx + 2, 86, hex('#8a6a3a')); R.rect(fx - 2, 89, fx + 2, 89, hex('#8a6a3a')); }
  // el rollo de cabo y un balde con agua
  for (let r = 14; r > 2; r -= 2) R.anillo(222.5, 158.5, r, r % 4 ? hex('#c8a870') : hex('#8a6a40')); R.disco(222, 158, 2, K);
  R.rect(250, 140, 268, 162, K); R.rect(251, 141, 267, 161, hex('#d83a3a')); R.rect(251, 141, 267, 143, hex('#f06a5a')); R.rect(252, 141, 266, 142, hex('#4a8ab8')); R.linea(251, 140, 259, 132, K); R.linea(259, 132, 267, 140, K);
  // la caja tapada con lona a la derecha
  R.rect(276, 108, 319, 162, K); tablasV(277, 109, 319, 161, 7, hex('#9a7044'), hex('#6a4a2a'), hex('#c09060'), 6);
  R.poligono([[272, 104], [319, 100], [319, 130], [300, 126], [284, 132], [274, 122]], K); R.poligono([[274, 105], [319, 101], [319, 128], [300, 124], [284, 130], [276, 121]], (x, y) => (x + y) % 7 === 0 ? hex('#6a7a5a') : hex('#8a9a6e'));
  // el cesto de mimbre con los terrones verdes
  R.poligono([[104, 124], [186, 124], [178, 166], [112, 166]], K);
  R.poligono([[106, 125], [184, 125], [176, 165], [114, 165]], (x, y) => ((x + (y >> 1)) % 4 === 0) ? hex('#6a4a24') : ((y % 4) === 0 ? hex('#8a6430') : hex('#b88a4a')));
  R.rect(102, 120, 188, 125, K); R.rect(103, 121, 187, 124, hex('#c89a58')); for (let x = 104; x < 188; x += 3) R.pset(x, 122, hex('#7a5a2a'));
  // un ánfora rota y unas tablas viejas apoyadas
  R.disco(78, 160, 10, K); R.disco(78, 160, 9, hex('#a86a40')); R.disco(74, 156, 3, hex('#c88a58')); R.poligono([[70, 150], [86, 150], [82, 146], [72, 147]], hex('#c8b898'));
});
const terron = (x, y, w, hgt, k, roto) => {
  // bronce verde de corrosión con madera negra pegada; roto por un lado
  const P = []; for (let i = 0; i < 10; i++) { const an = i / 10 * Math.PI * 2, r = 0.75 + 0.25 * H_(i, k, 20); P.push([x + Math.cos(an) * w * r, y + Math.sin(an) * hgt * r]); }
  R.poligono(P.map(([px, py]) => [px + (px > x ? 1 : -1), py + (py > y ? 1 : -1)]), K);
  R.poligono(P, (px, py) => { const v = H_(px >> 1, py >> 1, k + 21), d = (px - x) / w + (py - y) / hgt; if (v > 0.8) return hex('#2e5a46'); if (v < 0.12) return hex('#7ab89a'); if (v > 0.66 && v < 0.72) return hex('#1a1612'); return d < -0.4 ? hex('#6aa888') : d > 0.5 ? hex('#3a6a54') : hex('#4a8a6a'); });
  // vetas de madera negra
  for (let i = 0; i < 3; i++) R.linea(x - w * 0.6, y - hgt * 0.3 + i * 3, x + w * 0.2, y - hgt * 0.4 + i * 3, hex('#2a2018'));
  if (roto) { R.linea(x + w * 0.5, y - hgt * 0.6, x + w * 0.7, y + hgt * 0.5, K); R.pset(Math.round(x + w * 0.62), Math.round(y), hex('#c8963a')); }
};
const p5 = (t) => {
  rincon();
  // nubes de tres tonos por debajo del año y lejos de Atom
  nube3(54 + ((t * 4) % 100), 42, 34, hex('#b8c8d8'), hex('#e8f0f4'), BL);
  nube3(188 + ((t * 3) % 70), 42, 26, hex('#a8bccc'), hex('#dce8f0'), BL);
  nube3(110 + ((t * 2 + 40) % 60), 48, 18, hex('#c0d0dc'), hex('#eef4f6'), BL);
  // el farol que se mece
  { const fx = 226 + Math.round(Math.sin(t * 1.5) * 3); R.linea(236, 79, fx, 86, K); R.rect(fx - 4, 86, fx + 4, 98, K); R.rect(fx - 3, 87, fx + 3, 97, hex('#e8c860')); R.rect(fx - 3, 91, fx + 3, 92, K); R.pset(fx, 94, hex('#fff4c0')); R.rect(fx - 5, 98, fx + 5, 99, K); }
  // el vapor de la marina pasa lejos con su humo
  const vx = Math.round(260 - (t - P5) * 4); R.rect(vx - 30, 56, vx + 30, 60, hex('#4a5058')); R.rect(vx - 10, 50, vx + 6, 55, hex('#6a7078')); R.rect(vx - 2, 42, vx + 2, 50, hex('#3a3a3a'));
  for (let k = 0; k < 5; k++) R.disco(vx - k * 6 + Math.sin(t + k), 40 - k * 3, 2 + k * 0.8, hex('#8a8a90'));
  // los terrones: el de la izquierda se va desmoronando cuando la voz dice «falling apart»
  const cae = tramo(t, b(0.93), b(0.99));
  terron(128, 120, 16, 11, 1, false); terron(166, 118, 14, 10, 2, true); terron(146, 112, 18, 12, 3, false);
  if (cae > 0) { for (let k = 0; k < 4; k++) { const fx = 116 + k * 5, fy = Math.round(lerp(118, 170, Math.min(1, cae * (1 + k * 0.2)))); R.rect(fx - 1, fy - 1, fx + 3, fy + 2, K); R.rect(fx, fy, fx + 2, fy + 1, k % 2 ? hex('#5a3e26') : hex('#4a8a6a')); } }
  // un marinero pasa por delante con un ánfora y ni los mira
  const u = Math.min(1, Math.max(0, (t - P5) / (b(0.97) - P5))), mx = Math.round(lerp(30, 340, u));
  const mm = R.actor(EL.marineroAK, mx, 175, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [mx + 12, 158], sonrisa: true });
  { const [hx, hy] = mm.mano; R.disco(hx + 1, hy, 5, K); R.disco(hx + 1, hy, 4, hex('#b87a48')); R.rect(hx, hy - 8, hx + 2, hy - 4, K); R.pset(hx, hy - 1, hex('#e0a070')); }
  { const tr = tramo(t, b(0.85), b(0.875)), bo = tramo(t, b(0.875), b(0.9)); if (tr > 0 && t < b(0.97)) { const fx = Math.round(lerp(164, 196, tr) + bo * 8), fy = Math.round(tr < 1 ? lerp(121, 172, tr * tr) : 172 - Math.sin(bo * Math.PI) * 6);
    R.rect(fx - 3, fy - 3, fx + 3, fy + 2, K); R.rect(fx - 2, fy - 2, fx + 2, fy + 1, hex('#4a8a6a')); R.rect(fx - 2, fy - 2, fx, fy - 2, hex('#7ab89a')); R.rect(fx + 1, fy, fx + 2, fy + 1, hex('#2a2018'));
    if (tr >= 1 && bo < 1) for (let k = 0; k < 6; k++) R.pset(Math.round(188 + (k - 2.5) * (3 + bo * 4)), Math.round(174 - Math.abs(k - 2.5) * bo * 2 - bo * 3), hex('#d8c8a0')); } }
  // la gaviota baja, se posa en el borde del cesto, picotea un terrón y se va sin interés
  const llega = tramo(t, b(0.74), b(0.79)), pica = t > b(0.79) && t < b(0.9), vete = tramo(t, b(0.94), b(1.0));
  if (llega < 1) gaviota(lerp(330, 170, llega), lerp(30, 118, llega), t, -1, false);
  else if (vete <= 0) { const baja = pica && Math.sin(t * 14) > 0; gaviota(172, 120 + (baja ? 2 : 0), t, -1, true); if (baja) R.pset(166, 121, hex('#e8a030')); }
  else gaviota(lerp(172, 340, vete), lerp(118, 20, vete), t, 1, false);
};

const efectos = [[0.4, 'ola'], [1.2, 'maquina'], [T.primerT((t) => tramo(t, 0.6, a(0.31)) > 0.6, 0.6, 6), 'chof'], [3.0, 'burbujas'], [a(0.33), 'golpecito'],
  [P2 + 0.3, 'burbujas'], [P2 + 2.4, 'golpecito'], [P2 + 3.6, 'toc'], [a(0.62), 'burbujas'], [a(0.66), 'pop'], [a(0.78), 'boing'], [a(0.80), 'burbujas'],
  [P3 + 0.2, 'ola'], [b(0.02), 'golpecito'], [b(0.12), 'toc'], [b(0.15), 'brillo'],
  [P4 + 0.1, 'viento'], [b(0.30), 'ola'], [b(0.40), 'brillo'], [b(0.47), 'ola'], [b(0.52), 'whoosh'],
  [P5 + 0.2, 'ola'], [b(0.76), 'whoosh'], [b(0.80), 'golpecito'], [b(0.85), 'golpecito'], [b(0.93), 'papel'], [b(0.95), 'whoosh']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => (t > P4 && t < P5 ? null : t >= a(0.898) ? 1901 : 1900) });
''')

E['ak-terron'] = ('El terrón', '''// AK-TERRON (frases 8–9), 1902, cartela «1902». Siete planos:
// 1. (cartela → «and his cousin») museo sala1902 general: Stais entra y va a la mesa del terrón; Spyridon trae una caja
//    de la estantería y la deja; Stais señala el terrón en «archaeologist».
// 2. («and his cousin» → «and in a crack») museo 'grieta' (sin la lupa del decorado): la mano de Spyridon cepilla el
//    polvo con un pincel y la de Stais pasa la lupa (que aumenta de verdad); en «split» la madera se raja.
// 3. («and in a crack» → «Some said») fondo local: la grieta enorme bajo una lupa grande, con la mano canónica que la
//    sostiene; dentro asoma una rueda dentada que brilla en «toothed wheel» y destella en «A gear».
// 4. («Some said» → «The Greeks») fondo local: una sala de conferencias de 1902; un estudioso señala con el puntero el
//    astrolabio de la pizarra y asiente («astronomical instrument»); el otro, enfadado, niega con la cabeza («impossible»).
// 5. («The Greeks» → «The lump») fondo local: una galería con un cuadro de un vapor moderno; el escéptico lo señala en
//    «modern» y, dentro del cuadro, una caja cae del vapor al mar en «fallen into the sea».
// 6. («The lump» → «but») fondo local: un estudioso dibuja ruedas de noche, arruga el papel en «small», «broken» y
//    «strange» y lo tira a la papelera; en «tried» se desanima.
// 7. («but» → fin) fondo local: la vitrina con el terrón; las hojas del calendario vuelan de 1902 a 1950, se posa el polvo,
//    crece una telaraña y la luz pasa de día a noche; un «?» sobre el terrón («no one could see what was inside it»).''', PRE + r'''
const a = (f) => en('stais', f), b = (f) => en('dudas', f);
const P2 = a(0.373), P3 = a(0.699), P4 = b(0) - 0.05, P5 = b(0.246), P6 = b(0.615), P7 = b(0.847);
const LEVITA = '#2e2a3a', LEVITA2 = '#3a3446';

// 1 · la sala del museo: Stais llega a la mesa; Spyridon trae una caja
const p1 = (t) => {
  const o = { encuadre: 'sala1902' }; T.museo(R, t, o);
  // una señora visita las estatuas al fondo y se va despacio
  const vv = tramo(t, 1.6, 7.6); R.actor(EL.dama, Math.round(lerp(300, 262, vv)), 160, t, { dir: -1, anda: vv > 0 && vv < 1 });
  const v = tramo(t, 1.5, 4.0), spx = Math.round(lerp(268, 238, v)), lleva = t < 4.5;
  const ms = R.actor(EL.spyridonAK, spx, 160, t, { dir: -1, anda: v > 0 && v < 1, sostiene: lleva ? [spx - 3, Math.round(lerp(146, 141, tramo(t, 4.0, 4.5)))] : undefined, habla: t > 5.0 && t < 6.2 && Math.sin(t * 8) > 0, sonrisa: t > 6.2 });
  const caja = (x, y) => { R.rect(x - 6, y - 5, x + 6, y + 2, K); R.rect(x - 5, y - 4, x + 5, y + 1, hex('#c8a870')); R.rect(x - 5, y - 4, x + 5, y - 3, hex('#e8d0a0')); R.pset(x - 2, y - 1, hex('#4a8a6a')); R.pset(x + 2, y - 2, hex('#6a5030')); };
  if (lleva) caja(ms.mano[0] - 1, ms.mano[1] + 1); else caja(226, 142);
  const u = tramo(t, 1.4, 4.8), sx = Math.round(lerp(40, 158, u));
  R.actor(EL.staisAK, sx, 160, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > a(0.25) && t < a(0.36), sonrisa: t > a(0.28), habla: t > 5.0 && t < a(0.25) && Math.sin(t * 7) > 0.3 });
  T.museoDelante(R, t, o);
};

// 2 · la grieta: el pincel y la lupa que aumenta; la madera se raja en «split»
const lente = (cx, cy, r, zoom) => { cx = Math.round(cx); cy = Math.round(cy); const m = [];
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) m.push([cx + i, cy + j, R.pget(Math.round(cx + i / zoom), Math.round(cy + j / zoom))]);
  for (const [x, y, c] of m) R.pset(x, y, mez(c, BL, 0.08));
  R.anillo(cx + 0.5, cy + 0.5, r + 1, K); R.anillo(cx + 0.5, cy + 0.5, r + 2, hex('#c8963a')); R.anillo(cx + 0.5, cy + 0.5, r + 3, hex('#8a6024')); R.anillo(cx + 0.5, cy + 0.5, r + 4, K);
  for (let k = 0; k < 6; k++) { const an = -2.4 + k * 0.12; R.pset(Math.round(cx + Math.cos(an) * (r - 3)), Math.round(cy + Math.sin(an) * (r - 3)), BL); } };
const p2 = (t) => {
  const gr = 0.3 * tramo(t, a(0.62), a(0.655)) + 0.32 * tramo(t, a(0.655), P3 + 0.2);
  T.museo(R, t, { encuadre: 'sala1902', camara: 'grieta', grieta: gr, lupa: false });
  // la lupa de Stais: entra por la derecha, recorre el terrón y se aparta cuando la madera se raja
  const ent = tramo(t, P2, P2 + 0.9), sal = tramo(t, a(0.60), a(0.64)), rec = (t - P2) * 0.9;
  const lx = lerp(lerp(340, 196, ent) - Math.sin(rec) * 34 * ent, 252, sal), ly = lerp(108 + Math.cos(rec * 1.3) * 10 * ent, 64, sal);
  lente(lx, ly, 18, 1.7);
  const hx = Math.round(lx + 30), hy = Math.round(ly + 40); for (let k = 0; k < 3; k++) R.linea(lx + 13 + k, ly + 14, hx + k, hy, k === 0 ? K : hex('#6a3e22')); R.linea(lx + 16, ly + 14, hx + 3, hy, K);
  T.brazo(R, hx + 40, hy + 52, hx + 4, hy + 4, LEVITA2, -1, { codo: [hx + 26, hy + 34] });
  // el pincel de Spyridon quita el polvo del terrón (por la izquierda) y se retira al rajarse
  const cep = 1 - tramo(t, a(0.58), a(0.62)), bx = Math.round(lerp(10, 80 + Math.sin(t * 10) * 6, cep)), by = Math.round(lerp(236, 154, cep));
  for (let k = 0; k < 2; k++) R.linea(bx + 3 + k, by - 3, bx + 24 + k, by - 26, k ? hex('#c89a58') : K); R.rect(bx + 23, by - 31, bx + 28, by - 25, K); R.rect(bx + 24, by - 30, bx + 27, by - 26, hex('#6a4a2a')); R.rect(bx + 24, by - 26, bx + 27, by - 25, hex('#c8963a'));
  T.brazo(R, bx - 40, by + 50, bx, by, LEVITA, 1, { codo: [bx - 24, by + 30] });
  // el polvillo que levanta el pincel
  if (cep > 0.5) for (let k = 0; k < 6; k++) { const ph = (t * 2 + k / 6) % 1; R.pset(bx + 28 + Math.round(ph * 14 + k), by - 30 - Math.round(ph * 18) + k, hex('#d8c8a0')); }
};

// 3 · la grieta bajo la lupa grande: la rueda dentada
const GR = [[140, -2], [162, -2], [170, 30], [184, 58], [178, 92], [190, 126], [178, 182], [150, 182], [158, 140], [146, 104], [152, 70], [138, 34]];
const enGrieta = (x, y) => { let c = false; for (let i = 0, j = GR.length - 1; i < GR.length; j = i++) { const [xi, yi] = GR[i], [xj, yj] = GR[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const zoomTerron = () => capa('zoomTerron', () => {
  // dentro de la grieta: oscuridad y la rueda de bronce con sus dientes
  R.rect(0, 0, 319, 179, hex('#141010'));
  rueda(166, 92, 30, 22, 0.13, hex('#8a6a34'), hex('#5a4220'), hex('#b8904a'), { diente: 5, huecos: hex('#141010') });
  rueda(150, 150, 14, 12, 0.4, hex('#6a5228'), hex('#4a3818'), hex('#8a6a34'), { diente: 3 });
  // fuera: el bronce corroído y la madera negra con fibras, enorme
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (enGrieta(x, y)) continue;
    const v = H_(x >> 1, y >> 1, 60), w = H_(x >> 3, y >> 3, 61), fibra = Math.sin(y * 0.9 + Math.sin(x * 0.05) * 3) > 0.6, madera = x < 70 || (x > 250 && y > 60) || (y > 150 && x < 120);
    const nudo = madera && ((x - 30) ** 2 + ((y - 110) * 2) ** 2 < 60 || (x - 286) ** 2 + ((y - 120) * 2) ** 2 < 50); let c = madera ? (nudo ? (((x - 30) ** 2 + ((y - 110) * 2) ** 2) % 17 < 6 ? hex('#3a2616') : hex('#7a5232')) : fibra ? hex('#5a3e26') : v > 0.8 ? hex('#a87a4e') : w > 0.6 ? hex('#8a6240') : hex('#76522f')) : (v > 0.85 ? hex('#7ab89a') : v < 0.1 ? hex('#2e5a46') : w > 0.7 ? hex('#3a6a54') : w < 0.2 ? hex('#5a9a7a') : hex('#4a8a6a'));
    if (!madera && H_(x, y, 62) > 0.985) c = hex('#c8963a'); R.pset(x, y, c); }
  // el canto de la grieta, con luz y sombra
  for (let i = 0; i < GR.length; i++) { const [x0, y0] = GR[i], [x1, y1] = GR[(i + 1) % GR.length]; R.linea(x0, y0, x1, y1, K); R.linea(x0 + 1, y0, x1 + 1, y1, x0 < 160 ? hex('#9ad8b8') : hex('#1e3a2e')); }
  // los bordes de las tablas de madera y las grietas pequeñas
  for (const [x0, y0, x1, y1] of [[70, 0, 70, 180], [250, 60, 320, 60], [0, 150, 120, 150], [100, 20, 128, 60], [210, 120, 240, 170], [40, 80, 60, 120]]) { R.linea(x0, y0, x1, y1, K); R.linea(x0 + 1, y0 + 1, x1 + 1, y1 + 1, hex('#5a4838')); }
});
const p3 = (t) => {
  zoomTerron();
  // la luz que entra en la grieta y hace brillar la rueda en «toothed wheel»; destella en «A gear»
  const luz = tramo(t, a(0.86), a(0.93)), fl = tramo(t, a(0.968), a(0.968) + 0.25) - tramo(t, a(0.968) + 0.6, a(0.968) + 1.0);
  if (luz > 0) for (let y = 56; y < 130; y++) for (let x = 130; x < 202; x++) if (enGrieta(x, y)) { const c = R.pget(x, y); if (c !== hex('#141010')) R.pset(x, y, mez(c, hex('#ffe08a'), luz * 0.55)); }
  if (fl > 0) { const gx = 186, gy = 66, r = Math.round(2 + fl * 8); R.linea(gx - r, gy, gx + r, gy, BL); R.linea(gx, gy - r, gx, gy + r, BL); R.linea(gx - r / 2, gy - r / 2, gx + r / 2, gy + r / 2, hex('#fff4c0')); R.linea(gx - r / 2, gy + r / 2, gx + r / 2, gy - r / 2, hex('#fff4c0')); }
  // motas en la luz
  for (let k = 0; k < 14; k++) { const ph = (t * 0.2 + k / 14) % 1, x = Math.round(120 + k * 7 + Math.sin(t + k) * 4), y = Math.round(20 + ph * 140); R.pset(x, y, hex('#e8e0c0')); }
  // la lupa grande entra por la derecha y se para sobre la grieta: lo de fuera queda más oscuro
  const ent = tramo(t, P3, P3 + 1.2), cx = Math.round(lerp(380, 166, ent)), cy = Math.round(lerp(120, 92, ent)), r = 58;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = (x - cx) * (x - cx) + (y - cy) * (y - cy); if (d > r * r) R.pset(x, y, mez(R.pget(x, y), hex('#0a0806'), 0.42)); }
  for (let k = 0; k < 5; k++) R.anillo(cx + 0.5, cy + 0.5, r + 1 + k, k === 0 || k === 4 ? K : k === 1 ? hex('#f0c868') : k === 2 ? hex('#c8963a') : hex('#8a6024'));
  for (let k = 0; k < 10; k++) { const an = -2.5 + k * 0.07; R.pset(Math.round(cx + Math.cos(an) * (r - 5)), Math.round(cy + Math.sin(an) * (r - 5)), BL); R.pset(Math.round(cx + Math.cos(an) * (r - 7)), Math.round(cy + Math.sin(an) * (r - 7)), hex('#d8e8e0')); }
  // el mango de la lupa y la mano canónica que la sostiene
  const hx = cx + 52, hy = cy + 52; for (let k = 0; k < 4; k++) R.linea(cx + 42 + k, cy + 44 - k, hx + 12 + k, hy + 14 - k, k === 0 || k === 3 ? K : hex('#6a3e22'));
  T.brazo(R, hx + 52, hy + 50, hx + 10, hy + 8, LEVITA2, -1, { codo: [hx + 34, hy + 34] });
};

// 4 · la sala de conferencias de 1902: «un instrumento de astronomía» / «imposible»
const salaConf = () => capa('salaConf', () => {
  papelPintado(0, 0, 319, 112, hex('#c8a870'), hex('#b89a62'), hex('#8a6a3a'), 9);
  R.rect(0, 0, 319, 6, hex('#e8dcc0')); R.rect(0, 7, 319, 8, hex('#a88a5a')); R.rect(0, 9, 319, 9, K);
  calma(hex('#c8a870')); zocalo(0, 112, 319, 142, hex('#7a4a2a'), hex('#4e2e18'), hex('#a8703e'), 36);
  parque(0, 143, 319, 179, hex('#9a6a3a'), hex('#5a3a1e'), hex('#c08a50'));
  // la ventana alta con cortinas (el cielo se pinta en cada fotograma)
  R.rect(12, 22, 66, 112, K); R.rect(14, 24, 64, 110, 0xff010203); R.rect(38, 24, 39, 110, hex('#e8e0d0')); R.rect(14, 64, 64, 65, hex('#e8e0d0')); R.rect(10, 110, 68, 114, hex('#e8e0d0')); R.rect(10, 114, 68, 115, K);
  for (const [x0, x1] of [[4, 16], [62, 74]]) for (let x = x0; x <= x1; x++) for (let y = 23; y < 128; y++) R.pset(x, y, (x + Math.floor(y / 30)) % 4 === 0 ? hex('#6a1e24') : hex('#8a2a30'));
  R.rect(2, 21, 76, 24, K); R.rect(3, 22, 75, 23, hex('#c8963a'));
  // la pizarra en su caballete, con el astrolabio a tiza
  R.rect(84, 30, 172, 106, K); R.rect(86, 32, 170, 104, hex('#7a5030')); R.rect(89, 35, 167, 101, hex('#24332c'));
  for (let k = 0; k < 40; k++) R.pset(90 + (k * 37) % 76, 36 + (k * 23) % 64, hex('#34463e'));
  const ax = 128, ay = 68, T1 = hex('#e8eee8'), T2 = hex('#a8c8d8');
  R.anillo(ax + 0.5, ay + 0.5, 26, T1); R.anillo(ax + 0.5, ay + 0.5, 22, T1); for (let k = 0; k < 36; k++) { const an = k * Math.PI / 18; R.linea(ax + Math.cos(an) * 22, ay + Math.sin(an) * 22, ax + Math.cos(an) * (k % 3 ? 24 : 26), ay + Math.sin(an) * (k % 3 ? 24 : 26), T1); }
  R.anillo(ax + 0.5, ay + 2.5, 12, T2); R.linea(ax - 22, ay, ax + 22, ay, T2); R.linea(ax, ay - 22, ax, ay + 22, T2); R.rect(ax - 2, ay - 31, ax + 2, ay - 27, T1);
  R.rect(80, 104, 176, 107, K); R.rect(81, 104, 175, 106, hex('#9a6a3a')); R.linea(96, 107, 88, 142, K); R.linea(160, 107, 168, 142, K); R.linea(97, 107, 89, 142, hex('#7a5030')); R.linea(159, 107, 167, 142, hex('#7a5030'));
  for (const [x, c] of [[100, '#f4f0e0'], [106, '#e8c860'], [112, '#a8d0e8']]) R.rect(x, 102, x + 3, 103, hex(c));
  // el atril con libros, la estantería y los retratos (sin caras: siluetas de busto en grabado)
  R.rect(190, 112, 210, 142, K); R.rect(191, 113, 209, 141, hex('#6a3e22')); R.poligono([[184, 104], [216, 104], [212, 114], [188, 114]], K); R.poligono([[185, 105], [215, 105], [211, 113], [189, 113]], hex('#8a5a34'));
  R.rect(192, 99, 208, 104, K); R.rect(193, 100, 207, 103, hex('#f0e8d0')); R.rect(200, 100, 200, 103, hex('#a89a7a'));
  R.rect(236, 52, 318, 142, K); R.rect(238, 54, 316, 140, hex('#5a341c'));
  for (let s = 0; s < 4; s++) { const y = 56 + s * 22; R.rect(238, y + 19, 316, y + 21, hex('#8a5a34')); for (let x = 240; x < 314; ) { const w = 3 + Math.floor(H_(x, s, 70) * 4), hh = 13 + Math.floor(H_(x, s, 71) * 5), cols = ['#8a2a2a', '#2a4a6a', '#3a5a2a', '#a8803a', '#5a2a4a', '#2a2a3a']; R.rect(x, y + 19 - hh, x + w - 1, y + 18, hex(cols[Math.floor(H_(x, s, 72) * 6)])); R.rect(x, y + 19 - hh, x, y + 18, K); R.rect(x + 1, y + 21 - hh, x + w - 2, y + 21 - hh, hex('#e8c860')); x += w + (H_(x, s, 73) > 0.85 ? 4 : 0); } }
  marco(186, 30, 222, 70); R.rect(190, 34, 218, 66, hex('#e8dcc0')); R.disco(204, 48, 7, hex('#8a7a60')); R.poligono([[192, 66], [216, 66], [212, 56], [196, 56]], hex('#8a7a60'));
  // el reloj de pared y el aplique de gas
  R.rect(176, 24, 180, 26, hex('#c8963a'));
});
const p4 = (t) => {
  salaConf();
  // el cielo de la ventana: tramado, con nubes a tres velocidades y una paloma
  R.recorte([14, 24, 64, 110]);
  for (let y = 24; y <= 110; y++) for (let x = 14; x <= 64; x++) if (R.pget(x, y) === 0xff010203) R.pset(x, y, (y - 24) / 86 > b4(x, y) * 0.9 + 0.1 ? hex('#b8d8f0') : hex('#8ab8e0'));
  nube3(((t * 4) % 90) + 2, 44, 22, hex('#c8d8e8'), hex('#eef4f8'), BL); nube3(((t * 7 + 40) % 100) - 10, 80, 16, hex('#c8d8e8'), hex('#eef4f8'), BL);
  for (let x = 14; x <= 64; x++) { const y = 98 - Math.round(Math.max(0, Math.sin(x * 0.2) * 3 + (x > 40 && x < 52 ? 6 : 0))); for (let yy = y; yy <= 110; yy++) R.pset(x, yy, hex('#c8b898')); }
  R.rect(44, 92, 52, 97, hex('#e8e0d0')); for (let x = 45; x <= 51; x += 2) R.rect(x, 89, x, 92, hex('#e8e0d0'));
  gaviota(((t * 16) % 80) + 4, 56, t, 1, false); R.recorte(null);
  relojPared(178, 40, 10, t);
  // la luz que entra por la ventana con motas
  for (let k = 0; k < 10; k++) { const ph = (t * 0.15 + k / 10) % 1; R.pset(Math.round(70 + ph * 70 + k * 3), Math.round(60 + ph * 70), hex('#f4e8c8')); }
  // el estudioso de la barba llega a la pizarra, señala el astrolabio con el puntero y asiente: «un instrumento de astronomía»
  const llega = tramo(t, P4 + 0.1, P4 + 1.0), ex = Math.round(lerp(176, 150, llega)), apunta = tramo(t, P4 + 1.0, b(0.044));
  const asiente = t > b(0.044) && t < b(0.13) && Math.floor(t * 5) % 2 === 0;
  const me = R.actor(EL.estudiosoAK, ex, 160, t, { dir: -1, anda: llega > 0 && llega < 1, sostiene: [ex - 2, 140], salto: asiente ? 1 : 0, sonrisa: t > b(0.04), habla: t > b(0.0) && t < b(0.09) && Math.sin(t * 9) > 0 });
  { const [hx, hy] = me.mano, tx = Math.round(lerp(hx - 10, 140, apunta)), ty = Math.round(lerp(hy - 24, 82 + (asiente ? 1 : 0), apunta)); R.linea(hx, hy, tx, ty, K); R.linea(hx + 1, hy, tx + 1, ty, hex('#a07040')); R.pset(tx, ty, BL); }
  // el escéptico niega con la cabeza, enfadado: «imposible»
  const niega = t > b(0.17) && t < b(0.24);
  if (niega) R.icono('X', 212, 122 - (Math.floor(t * 6) % 2), hex('#e83a3a'), BL, 2);
  R.actor(EL.estudioso2AK, 212, 160, t, { dir: niega ? (Math.floor(t * 7) % 2 ? 1 : -1) : -1, enfado: t > b(0.15), dedo: t > b(0.16) && t < b(0.19), habla: t > b(0.15) && t < b(0.2) && Math.sin(t * 9) > 0 });
  // un oyente joven sentado en primera fila que toma notas (de espaldas no: de perfil, a la derecha)
  R.actor(EL.spyridonAK, 268, 166, t, { dir: -1, sostiene: [262, 150 + Math.round(Math.sin(t * 6))] });
  // las sillas de delante
  for (const x of [240, 286]) { R.rect(x, 150, x + 22, 152, K); R.rect(x + 1, 150, x + 21, 151, hex('#6a3e22')); R.rect(x + 2, 152, x + 3, 179, hex('#4e2e18')); R.rect(x + 19, 152, x + 20, 179, hex('#4e2e18')); R.rect(x + 1, 160, x + 21, 163, K); R.rect(x + 2, 161, x + 20, 162, hex('#8a5a34')); }
};

// 5 · la galería: «algo más moderno que cayó al mar mucho después»
const galeria = () => capa('galeria', () => {
  estuco(0, 0, 319, 118, hex('#3a5a4a'), hex('#2e4a3c'), hex('#4a6a5a'), 3);
  R.rect(0, 0, 319, 5, hex('#d8d0b8')); R.rect(0, 6, 319, 7, hex('#a89a7a')); R.rect(0, 8, 319, 8, K);
  calma(hex('#3a5a4a')); zocalo(0, 118, 319, 144, hex('#5a3a22'), hex('#3a2414'), hex('#8a5a34'), 40);
  for (let y = 145; y < 180; y++) for (let x = 0; x < 320; x++) { const c = (Math.floor((x + (y - 145) * 1.4) / 18) + Math.floor((y - 145) / 9)) % 2; R.pset(x, y, (y - 145) % 9 === 0 ? hex('#6a6050') : c ? hex('#d8d0bc') : hex('#a89e88')); }
  // el cuadro grande (el mar se pinta en cada fotograma)
  marco(116, 26, 266, 112); R.rect(120, 30, 262, 108, 0xff010203);
  // el aplique de gas y una cartela de latón (sin letras)
  for (const x of [96, 286]) { R.rect(x - 1, 54, x + 1, 64, hex('#c8963a')); R.rect(x - 4, 48, x + 4, 54, K); R.rect(x - 3, 49, x + 3, 53, hex('#f8e8a8')); }
  R.rect(176, 116, 206, 121, K); R.rect(177, 117, 205, 120, hex('#c8963a')); R.rect(180, 118, 202, 118, hex('#8a6024'));
  // la mesa con el terrón en su caja, un globo y papeles
  R.rect(14, 124, 84, 128, K); R.rect(15, 125, 83, 127, hex('#8a5a34')); R.rect(18, 128, 21, 160, hex('#5a3a22')); R.rect(77, 128, 80, 160, hex('#5a3a22')); R.rect(16, 140, 82, 142, hex('#5a3a22'));
  R.rect(22, 110, 46, 124, K); R.rect(23, 111, 45, 123, hex('#c8a870')); R.rect(26, 112, 42, 120, hex('#e8dcc0')); R.disco(34, 117, 5, K); R.disco(34, 117, 4, hex('#4a8a6a')); R.pset(33, 115, hex('#7ab89a')); R.pset(36, 118, hex('#1a1612'));
  R.disco(68, 110, 9, K); R.disco(68, 110, 8, hex('#c8b070')); R.rect(62, 107, 70, 110, hex('#6a9a5a')); R.rect(66, 112, 73, 115, hex('#6a9a5a')); R.anillo(68.5, 110.5, 10, hex('#c8963a')); R.rect(66, 120, 70, 124, hex('#8a6024'));
  R.rect(50, 121, 60, 123, hex('#f4f0e0')); R.rect(52, 119, 62, 121, hex('#e8e0c8'));
});
const p5 = (t) => {
  galeria();
  // dentro del cuadro: un mar de tormenta pintado, un vapor moderno con su humo; una caja cae al agua en «fallen into the sea»
  R.recorte([120, 30, 262, 108]);
  for (let y = 30; y <= 108; y++) for (let x = 120; x <= 262; x++) R.pset(x, y, y < 70 ? ((y - 30) / 40 > b4(x, y) ? hex('#8a9aa8') : hex('#5a6a7a')) : (Math.sin(x * 0.3 + y * 0.8 + t * 2) > 0.7 ? hex('#a8c0c8') : y < 84 ? hex('#3a5a6a') : hex('#2a4858')));
  nube3(((t * 3) % 170) + 110, 46, 30, hex('#4a5a6a'), hex('#6a7a8a'), hex('#9aaab8')); nube3(((t * 5 + 80) % 170) + 110, 38, 20, hex('#4a5a6a'), hex('#6a7a8a'), hex('#9aaab8'));
  const vx = 196 + Math.round(Math.sin(t * 0.8) * 2), vy = 76 + Math.round(Math.sin(t * 1.6)); R.poligono([[vx - 30, vy], [vx + 32, vy], [vx + 26, vy + 8], [vx - 26, vy + 8]], hex('#1e1e24')); R.rect(vx - 26, vy + 6, vx + 26, vy + 7, hex('#a83a2a'));
  R.rect(vx - 14, vy - 7, vx + 14, vy - 1, hex('#e8e0d0')); for (let k = 0; k < 6; k++) R.pset(vx - 12 + k * 5, vy - 4, hex('#2a3a4a')); R.rect(vx - 4, vy - 18, vx + 2, vy - 8, hex('#c83a2a')); R.rect(vx - 4, vy - 18, vx + 2, vy - 16, K);
  for (let k = 0; k < 6; k++) { const ph = (t * 0.6 + k / 6) % 1; R.disco(vx - 2 - ph * 30, vy - 20 - ph * 10, 2 + ph * 4, mez(hex('#3a3a40'), hex('#8a9aa8'), ph)); }
  const cae = tramo(t, b(0.47), b(0.53)); if (cae < 1) { const cx = Math.round(vx + 22 + cae * 10), cy = Math.round(vy - 4 + cae * cae * 22); R.rect(cx - 6, cy - 5, cx + 6, cy + 5, K); R.rect(cx - 5, cy - 4, cx + 5, cy + 4, hex('#e8b060')); R.rect(cx - 5, cy - 1, cx + 5, cy, hex('#8a5a2a')); R.rect(cx - 1, cy - 4, cx, cy + 4, hex('#8a5a2a')); R.rect(cx - 5, cy - 4, cx + 5, cy - 4, hex('#fff0b0'));
    for (let k = 0; k < 3; k++) R.pset(cx - 8 - k * 3, cy - 6 - k * 2, hex('#f8f0d0')); }
  else { const s = tramo(t, b(0.53), b(0.62)), sx = vx + 32, sy = vy + 18;
    if (s < 1) { for (let k = 0; k < 11; k++) { const an = Math.PI * (0.1 + 0.8 * k / 10), rr = 4 + s * 12; R.rect(Math.round(sx + Math.cos(an) * rr), Math.round(sy - Math.sin(an) * rr * 1.4 + s * s * 10), Math.round(sx + Math.cos(an) * rr) + 1, Math.round(sy - Math.sin(an) * rr * 1.4 + s * s * 10) + 1, BL); }
      R.poligono([[sx - 8 - s * 6, sy + 2], [sx + 8 + s * 6, sy + 2], [sx + 5, sy - 2], [sx - 5, sy - 2]], hex('#e8f4f8')); R.rect(sx - 3, sy - 1 - Math.round((1 - s) * 3), sx + 3, sy - 1, hex('#c8963a')); } }
  R.recorte(null);
  // un vigilante pasa al fondo (vida) y el escéptico va hasta el cuadro, mueve el dedo («no hacían cosas así») y señala el vapor en «modern»
  const vg = tramo(t, P5 + 0.4, P6 - 0.3); R.actor(EL.policia, Math.round(lerp(330, 238, vg)), 156, t, { dir: -1, anda: vg > 0 && vg < 1 });
  const u = tramo(t, P5, P5 + 1.4), x = Math.round(lerp(60, 98, u));
  const reprende = t > b(0.26) && t < b(0.33), senala = t > b(0.43) && t < b(0.58);
  R.actor(EL.estudioso2AK, x, 162, t, { dir: reprende ? -1 : 1, anda: u > 0 && u < 1, dedo: reprende ? Math.floor(t * 6) % 2 === 0 : senala, sostiene: senala ? [126, 92] : undefined, habla: (reprende || senala) && Math.sin(t * 9) > 0, sonrisa: t > b(0.55) });
  // Stais escucha a la izquierda, junto a su terrón, con los brazos cruzados (respira)
  R.actor(EL.staisAK, 38, 164, t, { dir: 1, triste: t > b(0.5), sorpresa: t > b(0.53) && t < b(0.57) });
};

// 6 · de noche, un estudioso lo intenta: dibuja ruedas, arruga el papel y lo tira
const estudio = () => capa('estudio', () => {
  papelPintado(0, 0, 319, 124, hex('#4a5068'), hex('#40465c'), hex('#6a7090'), 10);
  R.rect(0, 0, 319, 5, hex('#6a6a7a')); R.rect(0, 6, 319, 6, K);
  calma(hex('#4a5068')); zocalo(0, 124, 319, 150, hex('#4a2e1c'), hex('#2e1c10'), hex('#6a4428'), 38);
  parque(0, 151, 319, 179, hex('#5a3a22'), hex('#3a2414'), hex('#7a5030'));
  // la ventana de noche (Luna y estrellas)
  R.rect(14, 22, 66, 104, K); R.rect(16, 24, 64, 102, hex('#141a34')); for (let k = 0; k < 18; k++) R.pset(18 + (k * 29) % 44, 26 + (k * 17) % 60, k % 3 ? hex('#8a90b0') : BL);
  R.disco(50, 40, 6, hex('#f4ecc8')); R.disco(52, 38, 5, hex('#141a34')); for (let x = 16; x <= 64; x++) { const y = 88 - Math.round(Math.abs(Math.sin(x * 0.17)) * 6); R.rect(x, y, x, 102, hex('#0a0e1e')); }
  R.rect(39, 24, 40, 102, hex('#8a6a4a')); R.rect(16, 62, 64, 63, hex('#8a6a4a')); R.rect(12, 102, 68, 106, hex('#8a6a4a'));
  // una estantería con tarros y un cuadro con ruedas dibujadas
  R.rect(92, 40, 160, 42, K); R.rect(93, 40, 159, 41, hex('#8a5a34')); for (let k = 0; k < 6; k++) { const x = 96 + k * 11; R.rect(x, 30, x + 7, 39, K); R.rect(x + 1, 31, x + 6, 38, hex(['#a8c8b8', '#c8a870', '#8a9ab8', '#d8c8a8', '#a8b088', '#c89a9a'][k])); R.pset(x + 2, 32, BL); }
  marco(176, 26, 230, 70); R.rect(180, 30, 226, 66, hex('#efe6cc')); rueda(196, 48, 9, 12, 0, hex('#efe6cc'), hex('#8a7a5a'), hex('#efe6cc'), { borde: hex('#5a4a3a') }); rueda(212, 52, 6, 8, 0.2, hex('#efe6cc'), hex('#8a7a5a'), hex('#efe6cc'), { borde: hex('#5a4a3a') });
  // la estantería de la derecha con libros, un astrolabio de latón y un diploma
  R.rect(246, 50, 318, 124, K); R.rect(248, 52, 316, 122, hex('#3a2414'));
  for (let s = 0; s < 3; s++) { const y = 54 + s * 23; R.rect(248, y + 20, 316, y + 22, hex('#6a4428')); for (let x = 250; x < 312; ) { const w = 3 + Math.floor(H_(x, s, 74) * 4), hh = 12 + Math.floor(H_(x, s, 75) * 6), cols = ['#6a2a2a', '#2a3a5a', '#3a4a2a', '#8a6a3a', '#4a2a3a']; if (s === 1 && x > 286) break; R.rect(x, y + 20 - hh, x + w - 1, y + 19, hex(cols[Math.floor(H_(x, s, 76) * 5)])); R.rect(x, y + 20 - hh, x, y + 19, K); x += w + 1; } }
  R.anillo(300.5, 88.5, 7, hex('#c8963a')); R.anillo(300.5, 88.5, 4, hex('#a07028')); R.linea(294, 88, 306, 88, hex('#c8963a')); R.rect(299, 95, 302, 97, hex('#8a6024'));
  // la papelera de mimbre
  R.poligono([[258, 148], [290, 148], [286, 178], [262, 178]], K); R.poligono([[259, 149], [289, 149], [285, 177], [263, 177]], (x, y) => (x + y) % 4 === 0 ? hex('#6a4a24') : y % 4 === 0 ? hex('#8a6430') : hex('#b88a4a'));
});
const mesaEstudio = (t) => {
  // el escritorio (delante del estudioso): tablero, cajones con tiradores, el quinqué, libros, tintero y el terrón bajo una campana de cristal
  R.rect(70, 122, 250, 127, K); tablas(71, 123, 249, 126, 4, hex('#7a4a2a'), hex('#4e2e18'), hex('#a8703e'), 7);
  R.rect(74, 128, 246, 179, K); tablasV(75, 128, 245, 179, 20, hex('#6a3e22'), hex('#4a2a16'), hex('#8a5a34'), 8);
  for (const x of [100, 220]) { R.rect(x - 16, 136, x + 16, 152, K); R.rect(x - 15, 137, x + 15, 151, hex('#7a4a2a')); R.disco(x, 144, 2, hex('#c8963a')); }
  R.rect(90, 104, 110, 122, K); R.rect(91, 105, 109, 121, hex('#d8e8f0')); R.disco(100, 104, 10, K); R.disco(100, 104, 9, hex('#d8e8f0')); R.disco(100, 104, 6, hex('#c8dce8'));
  R.disco(100, 116, 6, K); R.disco(100, 116, 5, hex('#4a8a6a')); R.pset(98, 114, hex('#7ab89a')); R.pset(102, 117, hex('#1a1612')); R.linea(94, 100, 96, 96, BL); R.linea(93, 108, 93, 116, BL); R.rect(88, 120, 112, 122, hex('#5a3a22'));
  for (let k = 0; k < 3; k++) { R.rect(214, 116 - k * 5, 244, 121 - k * 5, K); R.rect(215, 117 - k * 5, 243, 120 - k * 5, hex(['#7a2a2a', '#2a4a6a', '#5a6a2a'][k])); R.rect(216, 118 - k * 5, 242, 118 - k * 5, hex('#e8c860')); }
  R.rect(196, 114, 204, 122, K); R.rect(197, 115, 203, 121, hex('#2a2a3a')); R.linea(200, 114, 208, 100, hex('#f4f0e0')); R.linea(201, 114, 209, 100, hex('#d8d0c0'));
  // el quinqué con su llama
  R.rect(74, 112, 84, 122, K); R.rect(75, 113, 83, 121, hex('#c8963a')); R.rect(76, 96, 82, 112, K); R.rect(77, 97, 81, 111, hex('#f4f0d8')); const fl = Math.round(Math.sin(t * 13) * 0.8); R.rect(78, 101 + fl, 80, 106, hex('#f8b040')); R.pset(79, 100 + fl, hex('#fff4c0'));
};
const p6 = (t) => {
  estudio();
  // el halo del quinqué en la pared
  for (let y = 70; y < 122; y++) for (let x = 40; x < 120; x++) { const g = 1 - Math.hypot(x - 79, y - 104) / 40; if (g > 0 && g * 0.9 > b4(x, y) + 0.3) R.pset(x, y, mez(R.pget(x, y), hex('#f8d890'), 0.25)); }
  // el estudioso escribe; arruga la hoja y la lanza a la papelera en «small», «broken» y «strange»; en «tried» se desanima
  const tiros = [b(0.648), b(0.685), b(0.72)], hechos = tiros.filter((x) => t > x + 0.45).length, lanzando = tiros.find((x) => t > x - 0.25 && t < x + 0.45);
  const escribe = !lanzando && t < b(0.77), mano = escribe ? [170 + Math.round(Math.sin(t * 11) * 4), 116] : lanzando ? [184, 96] : undefined;
  const m = R.actor(EL.estudiosoAK, 146, 127, t, { dir: 1, sostiene: mano, enfado: !!lanzando, triste: t > b(0.79), habla: !!lanzando && Math.sin(t * 10) > 0 });
  mesaEstudio(t);
  // la hoja con ruedas a medio dibujar
  R.rect(164, 116, 192, 122, K); R.rect(165, 116, 191, 121, hex('#f4f0e0')); const dib = escribe ? ((t - P6) * 0.8) % 1 : 0; for (let k = 0; k < Math.floor(dib * 20); k++) { const an = k / 20 * 6.28; R.pset(Math.round(178 + Math.cos(an) * 4), Math.round(118 + Math.sin(an) * 1.8), hex('#2a2a4a')); }
  if (escribe) { const [hx, hy] = m.mano; R.linea(hx, hy, hx + 5, hy - 8, hex('#f4f0e0')); }
  // las bolas de papel: vuelan en arco hasta la papelera
  for (let k = 0; k < 3; k++) { const v = tramo(t, tiros[k], tiros[k] + 0.45); if (v > 0 && v < 1) { const x = lerp(186, 274, v), y = lerp(96, 150, v) - Math.sin(v * Math.PI) * 30; R.disco(x, y, 3.4, K); R.disco(x, y, 2.6, hex('#f4f0e0')); R.pset(Math.round(x) - 1, Math.round(y), hex('#c8c0a8')); }
    else if (v >= 1) { const x = 266 + k * 7, y = 147 - (k % 2) * 3; R.disco(x, y, 3.4, K); R.disco(x, y, 2.6, hex('#f4f0e0')); R.pset(x + 1, y - 1, hex('#c8c0a8')); } }
  // dos bolas de antes, en el suelo junto a la papelera
  for (const [x, y] of [[248, 172], [296, 175]]) { R.disco(x, y, 3.4, K); R.disco(x, y, 2.6, hex('#e8e0c8')); }
  // una polilla da vueltas a la luz
  { const an = t * 5, mx = Math.round(79 + Math.cos(an) * 12), my = Math.round(90 + Math.sin(an * 1.3) * 6); R.pset(mx, my, hex('#c8b898')); R.pset(mx + (Math.sin(t * 30) > 0 ? 1 : -1), my, hex('#a89878')); }
};

// 7 · la vitrina: pasa medio siglo y nadie puede ver dentro
const vitrinaFondo = () => capa('vitrina', () => {
  estuco(0, 0, 319, 128, hex('#c8b490'), hex('#b09c78'), hex('#dcc8a4'), 9);
  R.rect(0, 0, 319, 6, hex('#e8dcc0')); R.rect(0, 7, 319, 8, hex('#a88a5a')); R.rect(0, 9, 319, 9, K);
  calma(hex('#c8b490')); zocalo(0, 128, 319, 150, hex('#6a4428'), hex('#4a2e18'), hex('#8a5a34'), 34);
  parque(0, 151, 319, 179, hex('#9a6a3a'), hex('#5a3a1e'), hex('#c08a50'));
  // la vitrina de nogal y cristal
  R.rect(118, 36, 232, 152, K); R.rect(120, 38, 230, 150, hex('#5a341c')); R.rect(124, 42, 226, 118, hex('#8aa8b0'));
  R.rect(120, 118, 230, 122, hex('#7a4a2a')); R.rect(124, 124, 226, 146, hex('#6a3e22')); R.rect(170, 126, 180, 144, K); R.rect(171, 127, 179, 143, hex('#7a4a2a')); R.disco(175, 135, 1.5, hex('#c8963a'));
  R.rect(116, 30, 234, 36, K); R.rect(117, 31, 233, 35, hex('#7a4a2a')); R.rect(117, 31, 233, 31, hex('#a8703e'));
  R.rect(116, 152, 122, 158, K); R.rect(228, 152, 234, 158, K);
  // el pedestal de terciopelo y el terrón
  R.rect(154, 98, 196, 118, K); R.rect(155, 99, 195, 117, hex('#8a1e2a')); R.rect(155, 99, 195, 100, hex('#b83a46'));
  // el calendario de pared (taco de hojas) y el reloj de péndulo
  R.rect(40, 44, 88, 104, K); R.rect(41, 45, 87, 103, hex('#f4f0e0')); R.rect(41, 45, 87, 56, hex('#c83a3a')); R.rect(62, 40, 66, 46, K);
  for (let y = 70; y < 100; y += 6) for (let x = 46; x < 84; x += 6) R.rect(x, y, x + 3, y + 3, hex('#d8d0c0'));
  R.rect(256, 54, 290, 150, K); R.rect(258, 56, 288, 148, hex('#6a3e22')); R.disco(273, 72, 11, K); R.disco(273, 72, 10, hex('#f4ecd8')); R.rect(264, 92, 282, 140, K); R.rect(265, 93, 281, 139, hex('#2a1a10'));
  for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6; R.pset(Math.round(273 + Math.cos(an) * 8.5), Math.round(72 + Math.sin(an) * 8.5), K); }
});
const p7 = (t) => {
  vitrinaFondo();
  const pasa = tramo(t, P7 + 0.2, E.duracion - 0.8), anio = Math.round(1902 + 48 * pasa);
  // lo que hay dentro de la vitrina: el terrón y unos fragmentos con sus etiquetas de rayas
  for (const [x, y] of [[136, 112], [212, 113]]) { R.rect(x - 6, y - 3, x + 6, y + 2, K); R.rect(x - 5, y - 2, x + 5, y + 1, hex('#5a8a6a')); R.rect(x - 4, y + 3, x + 4, y + 5, hex('#f4f0e0')); R.rect(x - 3, y + 4, x + 3, y + 4, hex('#8a8a8a')); }
  terronV(175, 88);
  // el polvo que se posa: una trama gris que crece en el cristal y en el terrón
  const polvo = pasa; for (let y = 42; y < 118; y++) for (let x = 124; x < 227; x++) if (H_(x, y, 80) < polvo * 0.28) R.pset(x, y, mez(R.pget(x, y), hex('#c8c0b0'), 0.6));
  // la telaraña que crece en la esquina y la araña que baja
  const tela = tramo(t, P7 + 0.5, b(0.95)); if (tela > 0) { for (let k = 0; k < 5; k++) { const an = k * 0.39; R.linea(124, 42, 124 + Math.cos(an) * 22 * tela, 42 + Math.sin(an) * 22 * tela, hex('#e8e8e0')); } for (let r = 5; r < 22 * tela; r += 5) for (let k = 0; k < 4; k++) { const a1 = k * 0.39, a2 = a1 + 0.39; R.linea(124 + Math.cos(a1) * r, 42 + Math.sin(a1) * r, 124 + Math.cos(a2) * r, 42 + Math.sin(a2) * r, hex('#c8c8c0')); } }
  { const ay = Math.round(lerp(42, 70, tramo(t, b(0.88), b(0.98)))); R.linea(140, 42, 140, ay, hex('#d8d8d0')); R.disco(140, ay + 1, 1.6, K); for (const s of [-1, 1]) { R.pset(140 + s * 2, ay, K); R.pset(140 + s * 2, ay + 2, K); } }
  // el calendario: la cifra del año avanza y las hojas salen volando
  R.rect(41, 57, 87, 68, hex('#f4f0e0')); R.numero(String(anio), 64, 66, { centro: true, color: hex('#2a2a3a'), sombra: false });
  for (let k = 0; k < 5; k++) { const ph = ((t - P7) * 2.2 + k / 5) % 1; if (pasa > 0 && pasa < 1) { const x = Math.round(64 + ph * 70 + Math.sin(ph * 9 + k) * 8), y = Math.round(60 - ph * 24 + ph * ph * 60); R.rect(x - 3, y - 2, x + 3, y + 2, K); R.rect(x - 2, y - 1, x + 2, y + 1, hex('#f4f0e0')); R.pset(x, y - 1, hex('#c83a3a')); } }
  // el reloj de péndulo: las agujas corren deprisa
  R.linea(273, 72, 273 + Math.cos(t * 9) * 7, 72 + Math.sin(t * 9) * 7, K); R.linea(273, 72, 273 + Math.cos(t * 0.8) * 5, 72 + Math.sin(t * 0.8) * 5, K);
  { const pa = Math.sin(t * 6) * 0.35, px = Math.round(273 + Math.sin(pa) * 34), py = Math.round(96 + Math.cos(pa) * 34); R.linea(273, 96, px, py, hex('#c8963a')); R.disco(px, py, 3, hex('#c8963a')); }
  // gente que pasa deprisa, como en un reloj acelerado: nadie se para
  for (let k = 0; k < 3; k++) { const ph = ((t - P7) * 0.9 + k / 3) % 1, d = k % 2 ? 1 : -1, x = Math.round(d > 0 ? lerp(-20, 330, ph) : lerp(330, -20, ph)); if (pasa > 0.05 && pasa < 0.9) R.actor([EL.caballero, EL.dama, EL.estudiosoAK][k], x, 172, t * 3, { dir: d, anda: true }); }
  // la luz pasa del día a la noche y vuelve
  const ciclo = Math.sin((t - P7) * 9) * 0.5 + 0.5; velo(0, 0, 319, 179, ciclo > 0.5 ? hex('#1a2040') : hex('#f8d890'), Math.abs(ciclo - 0.5) * 0.3 * (pasa > 0 && pasa < 1 ? 1 : 0));
  // al final, la pregunta: nadie pudo ver lo que tenía dentro
  const q = tramo(t, b(0.9), b(0.95)); if (q > 0) { R.icono('?', 172, Math.round(lerp(64, 56, q)), hex('#f8f0d0'), K, 2); }
};
const terronV = (x, y) => { const P = [[x - 15, y + 8], [x - 16, y - 2], [x - 9, y - 10], [x + 4, y - 11], [x + 14, y - 5], [x + 16, y + 4], [x + 9, y + 10], [x - 6, y + 10]];
  R.poligono(P.map(([px, py]) => [px + (px > x ? 1 : -1), py + (py > y ? 1 : -1)]), K);
  R.poligono(P, (px, py) => { const v = H_(px >> 1, py >> 1, 81); if (v > 0.8) return hex('#2e5a46'); if (v < 0.12) return hex('#7ab89a'); if (v > 0.66 && v < 0.74) return hex('#1a1612'); return (px - x) + (py - y) < -6 ? hex('#6aa888') : hex('#4a8a6a'); });
  for (let i = 0; i < 3; i++) R.linea(x - 12, y - 3 + i * 3, x + 2, y - 4 + i * 3, hex('#2a2018')); R.linea(x + 8, y - 8, x + 11, y + 8, K); R.pset(x + 10, y, hex('#c8963a')); };

const efectos = [[2.0, 'tic'], [4.2, 'toc'], [a(0.25), 'golpecito'],
  [P2 + 0.3, 'papel'], [P2 + 1.8, 'papel'], [a(0.655), 'toc'], [a(0.68), 'golpecito'],
  [P2 + 0.2, 'whoosh'], [P3 + 0.2, 'whoosh'], [a(0.91), 'brillo'], [a(0.968), 'pop'],
  [P4 + 0.2, 'toc'], [b(0.04), 'whoosh'], [b(0.17), 'boing'],
  [P5 + 0.3, 'toc'], [b(0.53), 'chof'],
  [b(0.62), 'lapiz'], [b(0.648) + 0.1, 'papel'], [b(0.685) + 0.1, 'papel'], [b(0.72) + 0.1, 'papel'],
  [P6 + 0.2, 'tic'], [P7 + 0.3, 'tic'], [b(0.88), 'papel'], [b(0.9), 'pop'], [b(0.93), 'viento']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, cartela: '1902', año: (t) => t < P7 ? 1902 : Math.round(1902 + 48 * tramo(t, P7 + 0.2, E.duracion - 0.8)) });
''')

E['ak-price'] = ('Price y los rayos', '''// AK-PRICE (frases 10–12), 1951→1974, cartela «1951». Diez planos:
// 1. (cartela → «He studied») price despacho general: Price entra por la puerta de cristal con su maletín, lo deja y se
//    inclina sobre la caja del terrón; en «obsessed» se le iluminan los ojos.
// 2. («He studied» → «with the Greek») fondo local: el tablero de corcho de Price se llena de fotos y dibujos a lo largo
//    de veinte años (la barra corre de 1951 a 1970); en «1970s» se aparta y lo señala.
// 3. («with the Greek» → «and gamma») fondo local: el laboratorio de rayos gamma; Price pone el terrón bajo el cabezal,
//    Karakalos gira el mando en «something new» y en «X-rays» se enciende el piloto y baja el haz.
// 4. («and gamma» → «Price counted») price 'radiografia': la placa se enciende y van apareciendo las capas de ruedas
//    («layers… one on top of another… like pages stuck together»); una mano con lápiz las señala.
// 5. («Price counted» → «If») fondo local, la mesa de Price desde arriba: el lápiz rojo marca los dientes y la cuenta sube;
//    suena el teléfono, el lápiz da un salto, la cuenta se emborrona («?») y vuelve a empezar (gag 4).
// 6. («If» → «Each») fondo local, el estudio de Atom: dos ruedas de cartón de 20 y 40 dientes clavadas en un cartón; al
//    girar, la de 40 da una vuelta mientras la de 20 da dos («½»).
// 7. («Each» → «In 1974») fondo local: un tren de ruedas de bronce sobre fieltro que una mano hace girar; cada pareja se
//    enciende por turno y al final la aguja de la esfera marca el resultado.
// 8. («In 1974» → «His») fondo local: una librería de 1974; Price levanta su libro (tapa con una rueda, sin letras) y le
//    aplauden; «1974» en el atril.
// 9. («His» → «Not») fondo local: el plano de Price en una mesa de dibujo: la esfera con las agujas del Sol y de la Luna
//    que giran mientras el Sol y la Luna recorren sus arcos.
// 10. («Not» → fin) fondo local: una charla con proyector; dos colegas dudan («?»), Price señala la radiografía en la
//    pantalla y sonríe en «right track».''', PRE + r'''
const a = (f) => en('price', f), b = (f) => en('dientes', f), c = (f) => en('libro', f);
const P2 = a(0.36), P3 = a(0.567), P4 = a(0.937), P5 = b(0.269), P6 = b(0.54), P7 = b(0.80), P8 = c(0) - 0.05, P9 = c(0.33), P10 = c(0.714);
const TRAJE = '#4a4a56', BATA = '#e8e8e0';
const terronP = (x, y, s = 1) => { const P = [[-15, 8], [-16, -2], [-9, -10], [4, -11], [14, -5], [16, 4], [9, 10], [-6, 10]].map(([px, py]) => [x + px * s, y + py * s]);
  R.poligono(P.map(([px, py]) => [px + (px > x ? 1 : -1), py + (py > y ? 1 : -1)]), K);
  R.poligono(P, (px, py) => { const v = H_(px >> 1, py >> 1, 81); if (v > 0.8) return hex('#2e5a46'); if (v < 0.12) return hex('#7ab89a'); if (v > 0.66 && v < 0.74) return hex('#1a1612'); return (px - x) + (py - y) < -6 * s ? hex('#6aa888') : hex('#4a8a6a'); });
  for (let i = 0; i < 3; i++) R.linea(x - 12 * s, y + (-3 + i * 3) * s, x + 2 * s, y + (-4 + i * 3) * s, hex('#2a2018')); R.linea(x + 8 * s, y - 8 * s, x + 11 * s, y + 8 * s, K); R.pset(x + 10 * s, y, hex('#c8963a')); };

// 1 · el despacho: Price llega
const p1 = (t) => {
  const puerta = tramo(t, 1.4, 2.1) - tramo(t, 4.0, 4.8), o = { puerta };
  T.price(R, t, o);
  // la caja con el terrón sobre la mesa
  R.rect(214, 146, 242, 160, K); R.rect(215, 147, 241, 159, hex('#c8a870')); R.rect(215, 147, 241, 148, hex('#e8d0a0')); R.rect(215, 153, 241, 153, hex('#a8885a')); for (let k = 0; k < 8; k++) R.pset(217 + k * 3, 145 + (k % 3), hex('#e8d890')); terronP(228, 144, 0.6);
  const u = tramo(t, 1.9, 4.6), x = Math.round(lerp(292, 200, u)), deja = t > 4.9;
  const mp = R.actor(EL.priceAK, x, 160, t, { dir: u < 1 ? -1 : 1, anda: u > 0 && u < 1, sostiene: deja ? undefined : [x + (u < 1 ? -1 : 15), 150], sorpresa: t > a(0.27) && t < a(0.30), sonrisa: t > a(0.30), habla: t > a(0.30) && t < a(0.34) && Math.sin(t * 8) > 0 });
  const mal = (mx, my) => { R.rect(mx - 6, my - 4, mx + 6, my + 4, K); R.rect(mx - 5, my - 3, mx + 5, my + 3, hex('#6a3a1e')); R.rect(mx - 5, my - 3, mx + 5, my - 2, hex('#8a5030')); R.rect(mx - 2, my - 6, mx + 2, my - 4, K); R.pset(mx, my, hex('#c8963a')); };
  if (deja) mal(192, 156); else mal(mp.mano[0], mp.mano[1] + 4);
  T.priceDelante(R, t, o);
};

// 2 · veinte años: el corcho se llena
const corcho = () => capa('corcho', () => {
  papelPintado(0, 0, 319, 132, hex('#c8b890'), hex('#bcac84'), hex('#9a8a62'), 12);
  R.rect(0, 0, 319, 4, hex('#e8e0c8')); R.rect(0, 5, 319, 5, K);
  calma(hex('#c8b890')); zocalo(0, 132, 319, 150, hex('#7a5a3a'), hex('#5a3e24'), hex('#9a7a52'), 40);
  for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, ((x >> 4) + (y >> 3)) % 2 ? hex('#8a7a5a') : hex('#9a8a68'));
  // el tablero de corcho con su marco
  R.rect(26, 34, 254, 136, K); R.rect(28, 36, 252, 134, hex('#8a5a34'));
  for (let y = 40; y <= 130; y++) for (let x = 32; x <= 248; x++) { const v = H_(x, y, 90); R.pset(x, y, v > 0.8 ? hex('#a0703e') : v < 0.15 ? hex('#7a5028') : hex('#b8844a')); }
  // el archivador metálico y una lámpara de pie
  R.rect(262, 76, 312, 160, K); R.rect(263, 77, 311, 159, hex('#7a8a7a'));
  for (let k = 0; k < 4; k++) { const y = 80 + k * 20; R.rect(266, y, 308, y + 17, K); R.rect(267, y + 1, 307, y + 16, hex('#8a9a8a')); R.rect(282, y + 6, 292, y + 8, hex('#c8c8c0')); R.rect(284, y + 11, 290, y + 13, hex('#e8e0c8')); }
  R.rect(270, 64, 300, 76, K); R.rect(271, 65, 299, 75, hex('#e8dcc0')); R.rect(274, 67, 296, 68, hex('#a89a7a')); R.rect(274, 70, 290, 71, hex('#a89a7a'));
  R.rect(8, 60, 10, 150, K); R.poligono([[0, 48], [18, 48], [14, 60], [4, 60]], K); R.poligono([[1, 49], [17, 49], [13, 59], [5, 59]], hex('#3a6a5a'));
});
const notas = (() => { const L = []; for (let k = 0; k < 26; k++) L.push({ x: 40 + Math.floor(H_(k, 1, 91) * 196), y: 42 + Math.floor(H_(k, 2, 91) * 78), tipo: k % 4, w: 12 + Math.floor(H_(k, 3, 91) * 8), h: 10 + Math.floor(H_(k, 4, 91) * 6), ch: Math.floor(H_(k, 5, 91) * 4) }); return L; })();
const nota = (n) => { const { x, y, tipo, w, h } = n; R.rect(x, y, x + w, y + h, K);
  if (tipo === 0) { R.rect(x + 1, y + 1, x + w - 1, y + h - 1, BL); R.rect(x + 2, y + 2, x + w - 2, y + h - 3, hex('#3a4a40')); R.disco(x + w / 2, y + h / 2, 3, hex('#4a8a6a')); R.pset(x + w / 2 + 1, y + h / 2, hex('#1a1612')); }
  else if (tipo === 1) { R.rect(x + 1, y + 1, x + w - 1, y + h - 1, hex('#f4f0e0')); rueda(x + w / 2, y + h / 2, Math.min(w, h) / 2 - 3, 10, 0, hex('#f4f0e0'), hex('#8a7a5a'), hex('#f4f0e0'), { borde: hex('#3a3a5a'), radios: false }); }
  else if (tipo === 2) { R.rect(x + 1, y + 1, x + w - 1, y + h - 1, hex('#f8e88a')); for (let j = y + 3; j < y + h - 1; j += 2) R.rect(x + 2, j, x + w - 3, j, hex('#c8b860')); }
  else { R.rect(x + 1, y + 1, x + w - 1, y + h - 1, hex('#e8eef8')); R.anillo(x + w / 2 + 0.5, y + h / 2 + 0.5, Math.min(w, h) / 2 - 2, hex('#3a5aa8')); R.linea(x + 2, y + h - 2, x + w - 2, y + 2, hex('#c83a3a')); }
  R.disco(x + w / 2, y + 1, 1.4, [hex('#d83a3a'), hex('#3a7ad8'), hex('#e8c040'), hex('#3ab86a')][n.ch]); };
const p2 = (t) => {
  corcho();
  const u = tramo(t, P2 + 0.1, a(0.49)), n = 3 + Math.floor(u * (notas.length - 3));
  for (let k = 0; k < n; k++) nota(notas[k]);
  // los hilos rojos que unen las notas
  for (let k = 1; k < n; k += 3) { const p = notas[k], q = notas[k - 1]; R.linea(p.x + p.w / 2, p.y + 1, q.x + q.w / 2, q.y + 1, hex('#c83a3a')); }
  // Price va y viene clavando notas; en «1970s» se aparta, lo mira y lo señala
  const fin = t > a(0.495), px = fin ? Math.round(lerp(150, 214, tramo(t, a(0.495), a(0.53)))) : Math.round(140 + Math.sin((t - P2) * 2.2) * 70);
  const mp = R.actor(EL.priceAK, px, 160, t, { dir: fin ? -1 : Math.cos((t - P2) * 2.2) > 0 ? 1 : -1, anda: !fin || t < a(0.53), sostiene: fin ? undefined : [px + 8, 130], dedo: fin && t > a(0.53), sonrisa: fin, triste: !fin && Math.sin(t * 1.3) > 0.6 });
  if (!fin) { const [hx, hy] = mp.mano; R.rect(hx - 4, hy - 4, hx + 4, hy + 2, K); R.rect(hx - 3, hy - 3, hx + 3, hy + 1, BL); }
  // la luz de la lámpara de pie, que se enciende y apaga con los días y las noches que pasan
  if (!fin && Math.sin((t - P2) * 7) > 0) for (let y = 60; y < 150; y++) for (let x = 0; x < 30; x++) if (b4(x, y) < 0.2 * (1 - (y - 60) / 90)) R.pset(x, y, hex('#f8e8a8'));
};

// 3 · el laboratorio de rayos gamma
const labGamma = () => capa('labGamma', () => {
  // azulejos blancos con juntas y alguna mancha, y la franja verde de la pared
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) { let c = (x % 10 === 0 || y % 10 === 0) ? hex('#a8b0a8') : hex('#e4e8e0'); if (H_(x >> 1, y >> 1, 95) > 0.94) c = hex('#d0d4c8'); if (y < 4) c = hex('#c8ccc0'); R.pset(x, y, c); }
  calma(hex('#e4e8e0')); R.rect(0, 112, 319, 124, hex('#4a7a6a')); R.rect(0, 112, 319, 113, hex('#6a9a8a')); R.rect(0, 124, 319, 125, K);
  for (let y = 126; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, ((x >> 3) + (y >> 3)) % 2 ? hex('#6a6a64') : hex('#7a7a72'));
  // el muro de plomo (bloques grises) a la derecha
  for (let r = 0; r < 7; r++) for (let k = 0; k < 4; k++) { const x = 238 + k * 20 - (r % 2) * 10, y = 70 + r * 12; R.rect(x, y, x + 19, y + 11, K); R.rect(x + 1, y + 1, x + 18, y + 10, hex('#7a7e86')); R.rect(x + 1, y + 1, x + 18, y + 2, hex('#a0a4ac')); }
  // la mesa de control con sus diales, a la izquierda
  R.rect(8, 104, 92, 160, K); R.rect(9, 105, 91, 159, hex('#8a9488')); R.poligono([[8, 104], [92, 104], [86, 90], [14, 90]], K); R.poligono([[9, 103], [91, 103], [85, 91], [15, 91]], hex('#6a7468'));
  for (let k = 0; k < 4; k++) { const x = 24 + k * 18; R.disco(x, 97, 5, K); R.disco(x, 97, 4, BL); R.linea(x, 97, x + 2, 94, hex('#c83a3a')); }
  for (let k = 0; k < 6; k++) { R.disco(16 + k * 13, 116, 2.5, K); R.disco(16 + k * 13, 116, 1.6, [hex('#3ab86a'), hex('#e8c040'), hex('#3a7ad8')][k % 3]); }
  R.rect(20, 128, 80, 150, hex('#7a8478')); for (let k = 0; k < 3; k++) R.rect(24 + k * 20, 134, 36 + k * 20, 144, hex('#6a7468'));
  // el trébol de radiación en la pared (sin letras)
  R.disco(150, 30, 11, K); R.disco(150, 30, 10, hex('#f0c830')); for (let k = 0; k < 3; k++) { const a0 = k * 2.094 - 1.57; R.poligono([[150, 30], [150 + Math.cos(a0 - 0.5) * 9, 30 + Math.sin(a0 - 0.5) * 9], [150 + Math.cos(a0 + 0.5) * 9, 30 + Math.sin(a0 + 0.5) * 9]], K); } R.disco(150, 30, 3, hex('#f0c830')); R.disco(150, 30, 2, K);
  // un reloj de laboratorio y una pizarrita con cifras
  relojPared(200, 30, 8, 0); R.rect(30, 30, 90, 70, K); R.rect(31, 31, 89, 69, hex('#2a3a34')); R.rect(31, 31, 89, 32, hex('#5a4030')); R.numero('1.17', 52, 44, { centro: true, color: hex('#d8e0d8'), sombra: false }); R.numero('1.33', 52, 56, { centro: true, color: hex('#d8e0d8'), sombra: false }); R.linea(74, 40, 86, 52, hex('#d8e0d8')); R.anillo(80.5, 58.5, 5, hex('#d8e0d8'));
  // la columna y el brazo del aparato de rayos (lo que se mueve se pinta encima)
  R.rect(176, 40, 188, 160, K); R.rect(177, 41, 187, 159, hex('#a8aca0')); R.rect(177, 41, 179, 159, hex('#c8ccc0')); R.rect(170, 150, 194, 160, K); R.rect(171, 151, 193, 159, hex('#7a7e74'));
  R.rect(110, 40, 182, 50, K); R.rect(111, 41, 181, 49, hex('#b8bcb0')); R.rect(111, 41, 181, 42, hex('#d8dcd0'));
  // la mesita del terrón con la placa debajo
  R.rect(116, 128, 160, 132, K); R.rect(117, 129, 159, 131, hex('#9aa094')); R.rect(120, 132, 122, 160, hex('#5a5e56')); R.rect(154, 132, 156, 160, hex('#5a5e56'));
  R.rect(122, 124, 154, 128, K); R.rect(123, 125, 153, 127, hex('#2a3a4a'));
});
const p3 = (t) => {
  labGamma();
  // el cabezal baja en «X-rays»; el piloto rojo y el haz
  const rayo = tramo(t, a(0.90), a(0.93)), cy = Math.round(lerp(52, 78, rayo));
  R.rect(134, 50, 138, cy, K); R.rect(135, 50, 137, cy, hex('#8a8e84'));
  R.poligono([[118, cy], [154, cy], [148, cy + 18], [124, cy + 18]], K); R.poligono([[119, cy + 1], [153, cy + 1], [147, cy + 17], [125, cy + 17]], hex('#c8ccc0')); R.rect(120, cy + 1, 152, cy + 3, hex('#e8ece0'));
  R.disco(146, cy + 8, 2, K); R.disco(146, cy + 8, 1.4, rayo > 0.5 || (t > a(0.79) && Math.floor(t * 4) % 2) ? hex('#ff3a3a') : hex('#5a1a1a'));
  if (rayo > 0.6) { const f = 0.25 + Math.sin(t * 20) * 0.08; for (let y = cy + 18; y < 124; y++) for (let x = 124 - (y - cy - 18) * 0.15; x < 148 + (y - cy - 18) * 0.15; x++) { const px = Math.round(x); if (b4(px, y) < f) R.pset(px, y, hex('#f8f0a0')); } }
  // el terrón: Price lo trae en la mano y lo deja sobre la placa
  const lleva = tramo(t, P3 + 0.2, P3 + 1.6), deja = t > P3 + 2.0, px = Math.round(lerp(236, 150, lleva));
  const sale = tramo(t, a(0.72), a(0.80)), px2 = Math.round(lerp(px, 216, sale));
  const mp = R.actor(EL.priceAK, deja ? px2 : px, 160, t, { dir: sale > 0 && sale < 1 ? 1 : -1, anda: (lleva > 0 && lleva < 1) || (sale > 0 && sale < 1), sostiene: deja ? undefined : [px - 2, 128], sorpresa: rayo > 0.8, sonrisa: t > a(0.93) });
  if (deja) terronP(138, 120, 0.42); else terronP(mp.mano[0] - 2, mp.mano[1] - 3, 0.42);
  // Karakalos en la mesa de control: gira el mando en «something new» y señala el piloto
  const gira = t > a(0.76) && t < a(0.86);
  R.actor(EL.karakalosAK, 62, 160, t, { dir: 1, sostiene: gira ? [56 + Math.round(Math.sin(t * 8)), 98] : undefined, dedo: t > a(0.88) && t < a(0.94), habla: t > a(0.62) && t < a(0.70) && Math.sin(t * 9) > 0 });
  // el contador del aparato que sube
  R.rect(30, 132, 70, 146, K); R.rect(31, 133, 69, 145, hex('#0e1a12')); if (rayo > 0) R.numero(String(Math.round(rayo * 900 + Math.sin(t * 9) * 4 + 100)), 50, 143, { centro: true, color: hex('#7aff9a'), sombra: false });
};

// 4 · la radiografía a contraluz: las capas aparecen
const p4 = (t) => {
  T.price(R, t, { camara: 'radiografia' });
  const enc = tramo(t, P4, P4 + 0.6), capasV = tramo(t, b(0.04), b(0.22));
  // la placa se enciende y las capas salen de la oscuridad
  if (capasV < 1) velo(80, 32, 238, 150, hex('#0a1420'), 0.75 * (1 - capasV) * (enc < 1 ? 1 : 1) + (1 - enc) * 0.2);
  // dos capas más que se deslizan y se quedan pegadas, como páginas
  R.recorte([80, 32, 238, 150]);
  for (let k = 0; k < 2; k++) { const v = tramo(t, b(0.12 + k * 0.05), b(0.2 + k * 0.03)), cx = Math.round(lerp(260 + k * 30, 140 + k * 26, v)), cy = 86 + k * 18;
    if (v > 0) { R.anillo(cx + 0.5, cy + 0.5, 22 - k * 6, hex('#c8e0f0')); for (let d = 0; d < 18 - k * 4; d++) { const an = d / (18 - k * 4) * 6.28 + k; R.linea(cx + Math.cos(an) * (22 - k * 6), cy + Math.sin(an) * (22 - k * 6), cx + Math.cos(an) * (26 - k * 6), cy + Math.sin(an) * (26 - k * 6), hex('#a8c8e0')); } R.disco(cx, cy, 2, hex('#c8e0f0')); } }
  R.recorte(null);
  // la mano de Price con el lápiz señala las capas en «pages stuck together»
  const m = tramo(t, b(0.17), b(0.21)), hx = Math.round(lerp(300, 222, m)), hy = Math.round(lerp(190, 124, m) + Math.sin(t * 3) * 2);
  if (m > 0) { R.linea(hx - 2, hy - 2, hx - 12, hy - 12, K); R.linea(hx - 1, hy - 2, hx - 11, hy - 12, hex('#c83a3a')); R.pset(hx - 12, hy - 13, hex('#3a3a3a')); T.brazo(R, hx + 40, hy + 56, hx, hy, TRAJE, -1, { codo: [hx + 28, hy + 34] }); }
};

// 5 · la mesa de Price desde arriba: contar dientes (gag 4)
const mesaArriba = () => capa('mesaArriba', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.08) * 2) + H_(x >> 2, y, 97) * 0.6; R.pset(x, y, Math.floor(y / 30) % 2 === 0 && y % 30 === 0 ? hex('#3a2010') : v > 1.1 ? hex('#8a5030') : v < -0.5 ? hex('#5a3018') : hex('#6e3e22')); }
  calma(hex('#6e3e22'));
  // la radiografía sobre la mesa, con su rueda de 24 dientes fantasmal
  R.rect(30, 26, 196, 166, K); R.rect(31, 27, 195, 165, hex('#1e2a3e'));
  for (let y = 28; y < 165; y++) for (let x = 32; x < 195; x++) if (H_(x, y, 98) > 0.93) R.pset(x, y, hex('#2a3a52'));
  rueda(160, 70, 22, 16, 0.3, hex('#24344a'), hex('#1e2a3e'), hex('#3a4a66'), { borde: hex('#4a6a8a') });
  // el bloc de notas, la goma, la regla, las gafas y el café
  R.rect(212, 96, 262, 160, K); R.rect(213, 97, 261, 159, hex('#f4f0e0')); for (let y = 104; y < 158; y += 6) R.rect(215, y, 259, y, hex('#a8c8e8')); R.rect(213, 97, 261, 100, hex('#c83a3a'));
  R.rect(270, 150, 300, 156, K); R.rect(271, 151, 299, 155, hex('#e8c860')); for (let x = 273; x < 299; x += 3) R.pset(x, 151, K);
  R.rect(204, 30, 216, 36, K); R.rect(205, 31, 215, 35, hex('#e89aaa'));
  R.disco(150, 172, 9, K); R.disco(150, 172, 8, BL); R.disco(150, 172, 6, hex('#5a3418')); R.disco(148, 170, 2, hex('#8a5a34'));
  R.anillo(242.5, 46.5, 7, K); R.anillo(258.5, 46.5, 7, K); R.linea(249, 46, 252, 46, K); R.disco(242, 46, 5, hex('#c8d8e0')); R.disco(258, 46, 5, hex('#c8d8e0'));
});
const p5 = (t) => {
  mesaArriba();
  // la rueda grande de la radiografía, más clara, con sus dientes contables
  const cx = 100, cy = 100, r = 46, N = 24;
  rueda(cx, cy, r, N, 0.1, hex('#5a7a9a'), hex('#3a5a7a'), hex('#9ab8d8'), { borde: hex('#c8e0f0'), diente: 6, huecos: hex('#1e2a3e') });
  // la cuenta: un diente cada 0,3 s; suena el teléfono, salta el lápiz y se emborrona; luego vuelve a empezar
  const ring = b(0.41), salto = ring + 0.25, reinicio = b(0.47);
  const n1 = Math.min(10, Math.floor(Math.max(0, t - (P5 + 0.15)) / 0.3)), n = t < salto ? n1 : t < reinicio ? Math.min(10, Math.floor(Math.max(0, salto - (P5 + 0.15)) / 0.3)) : Math.min(10, Math.floor((t - reinicio) / 0.3) + 1);
  const borron = t > salto && t < reinicio;
  for (let k = 0; k < n; k++) { const an = 0.25 + k * 2 * Math.PI / N, mx = Math.round(cx + Math.cos(an) * (r + 9)), my = Math.round(cy + Math.sin(an) * (r + 9)); R.rect(mx - 1, my - 1, mx + 1, my + 1, borron ? hex('#8a2a3a') : hex('#e83a3a')); }
  if (borron) for (let k = 0; k < 40; k++) { const an = H_(k, 1, 99) * 6.28, rr = r * 0.4 + H_(k, 2, 99) * 20; R.linea(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, cx + Math.cos(an + 0.3) * (rr + 8), cy + Math.sin(an + 0.3) * (rr + 8), hex('#c83a3a')); }
  // la cifra en el bloc (y el «?» cuando se pierde)
  if (borron) { R.icono('?', 230, 116, hex('#c83a3a'), BL, 2); for (let k = 0; k < 6; k++) R.linea(220 + k * 5, 130, 228 + k * 5, 140, hex('#c83a3a')); }
  else if (n > 0) R.numero(String(n), 236, 136, { centro: true, color: hex('#c83a3a'), sombra: false, tam: 16 });
  // el lápiz rojo en la mano: va de diente en diente; al sonar el teléfono, raya y salta
  const an = 0.25 + Math.max(0, n - 1 + ((t - P5) % 0.3) / 0.3 * 0.6) * 2 * Math.PI / N;
  let lx = cx + Math.cos(an) * (r + 9), ly = cy + Math.sin(an) * (r + 9);
  if (t > ring && t < reinicio) { const s = tramo(t, ring, salto); lx += s * 40; ly -= s * 30; }
  R.linea(lx, ly, lx + 14, ly + 14, K); R.linea(lx + 1, ly, lx + 15, ly + 14, hex('#c83a3a')); R.linea(lx + 1, ly + 1, lx + 14, ly + 14, hex('#e85a4a')); R.pset(lx, ly, hex('#3a3a3a'));
  T.brazo(R, lx + 46, 206, lx + 16, ly + 16, TRAJE, -1, { codo: [lx + 36, Math.round((ly + 206) / 2 + 6)] });
  // el teléfono negro de disco: tiembla y echa ondas
  const suena = t > ring && t < reinicio + 0.4, v = suena ? Math.round(Math.sin(t * 60) * 1.5) : 0, tx = 270 + v, ty = 84;
  R.rect(tx - 20, ty - 12, tx + 20, ty + 16, K); R.rect(tx - 19, ty - 11, tx + 19, ty + 15, hex('#1e1e24')); R.rect(tx - 18, ty - 10, tx + 18, ty - 8, hex('#3a3a44'));
  R.disco(tx, ty + 3, 10, K); R.disco(tx, ty + 3, 9, hex('#c8c8c0')); for (let k = 0; k < 10; k++) { const a2 = k * 0.55 - 1.2; R.disco(Math.round(tx + Math.cos(a2) * 6), Math.round(ty + 3 + Math.sin(a2) * 6), 1.2, K); } R.disco(tx, ty + 3, 2.5, BL);
  const sube = suena ? Math.abs(Math.sin(t * 30)) * 3 : 0; R.rect(tx - 22, ty - 20 - sube, tx + 22, ty - 14 - sube, K); R.rect(tx - 21, ty - 19 - sube, tx + 21, ty - 15 - sube, hex('#2a2a32')); R.rect(tx - 21, ty - 19 - sube, tx + 21, ty - 18 - sube, hex('#4a4a54'));
  if (suena) for (let k = 0; k < 3; k++) { const rr = 6 + ((t * 30 + k * 6) % 18); for (let q = -3; q <= 3; q++) { const a3 = -1.57 + q * 0.18; R.pset(Math.round(tx + 26 + Math.cos(a3 + 1.57) * rr * 0.4), Math.round(ty - 14 + Math.sin(a3) * rr * 0.6), hex('#f8e8a0')); R.pset(Math.round(tx - 26 - Math.cos(a3 + 1.57) * rr * 0.4), Math.round(ty - 14 + Math.sin(a3) * rr * 0.6), hex('#f8e8a0')); } }
};

// 6 · el estudio de Atom: 20 y 40 dientes
const cartonFondo = () => capa('cartonAtom', () => {
  papelPintado(0, 0, 319, 140, hex('#d8c8a8'), hex('#ccbc9a'), hex('#b8a47a'), 10);
  calma(hex('#d8c8a8'));
  // la ventana al Egeo y una estantería con el globo
  R.rect(8, 22, 54, 92, K); R.rect(10, 24, 52, 90, hex('#8ac0e8')); R.rect(10, 70, 52, 90, hex('#2a6a9a')); R.rect(10, 68, 52, 70, hex('#c8b898')); R.rect(30, 24, 31, 90, BL); R.rect(10, 56, 52, 57, BL);
  R.rect(262, 100, 316, 103, K); R.rect(263, 100, 315, 102, hex('#8a5a34')); R.disco(296, 88, 10, K); R.disco(296, 88, 9, hex('#4a8ab8')); R.rect(290, 84, 298, 90, hex('#6a9a5a')); R.rect(294, 98, 298, 100, hex('#c8963a'));
  for (let k = 0; k < 4; k++) { const x = 266 + k * 6; R.rect(x, 82, x + 4, 99, K); R.rect(x + 1, 83, x + 3, 98, hex(['#c83a3a', '#3a7ad8', '#e8c040', '#3ab86a'][k])); }
  // el cartón grande clavado en la pared, con sus chinchetas y cinta
  R.rect(62, 18, 252, 140, K); for (let y = 19; y < 140; y++) for (let x = 63; x < 252; x++) R.pset(x, y, (y % 3 === 0 && H_(x, y, 100) > 0.6) ? hex('#b89060') : H_(x >> 1, y >> 1, 101) > 0.92 ? hex('#a87e50') : hex('#c8a070'));
  for (const [x, y] of [[66, 22], [248, 22], [66, 136], [248, 136]]) { R.rect(x - 4, y - 2, x + 4, y + 2, hex('#e8e0c0')); R.disco(x, y, 2, K); R.disco(x, y, 1.4, hex('#d83a3a')); }
  // la mesa con tijeras, regla, compás y recortes
  R.rect(0, 140, 319, 145, K); tablas(0, 141, 319, 179, 6, hex('#a87a4a'), hex('#7a5430'), hex('#c89a62'), 9);
  R.rect(40, 150, 110, 154, K); R.rect(41, 151, 109, 153, hex('#e8c860')); for (let x = 43; x < 109; x += 3) R.pset(x, 151, K);
  R.linea(150, 156, 170, 170, K); R.linea(150, 170, 170, 156, K); R.disco(148, 172, 3, hex('#d83a3a')); R.disco(148, 154, 3, hex('#d83a3a'));
  for (const [x, y] of [[200, 160], [214, 166], [230, 158]]) R.poligono([[x, y], [x + 6, y - 2], [x + 8, y + 3], [x + 2, y + 5]], hex('#c8a070'));
  R.disco(280, 160, 9, K); R.disco(280, 160, 8, hex('#e8e0d0')); R.disco(280, 160, 6, hex('#5a3418'));
});
const p6 = (t) => {
  cartonFondo();
  const gira = tramo(t, b(0.60), b(0.60) + 0.2), w = 4 * Math.PI * Math.min(1, Math.max(0, (t - b(0.60)) / (b(0.745) - b(0.60))));
  const A = [118, 82], B = [190, 82], rA = 22, rB = 44;
  const brilloA = t > b(0.55) && t < b(0.61), brilloB = t > b(0.627) && t < b(0.69);
  if (brilloA) R.disco(A[0], A[1], rA + 8, hex('#f8e8a0')); if (brilloB) R.disco(B[0], B[1], rB + 8, hex('#f8e8a0'));
  // la sombra de las ruedas en el cartón
  R.disco(A[0] + 3, A[1] + 3, rA + 3, hex('#9a7448')); R.disco(B[0] + 3, B[1] + 3, rB + 3, hex('#9a7448'));
  const angA = w, angB = -w / 2 + Math.PI / 40;
  rueda(B[0], B[1], rB, 40, angB, hex('#d8b880'), hex('#a88850'), hex('#f0d8a8'), { diente: 4.5, huecos: hex('#c8a070') });
  rueda(A[0], A[1], rA, 20, angA, hex('#e8d0a0'), hex('#b89a68'), hex('#f8e8c8'), { diente: 4.5 });
  // un diente rojo en cada rueda para ver las vueltas
  const ra = (cx, cy, r, an) => { R.disco(cx + Math.cos(an) * (r + 1), cy + Math.sin(an) * (r + 1), 2.6, hex('#d83a3a')); };
  ra(A[0], A[1], rA, angA - Math.PI / 2); ra(B[0], B[1], rB, angB - Math.PI / 2);
  // las chinchetas de los ejes
  for (const [x, y] of [A, B]) { R.disco(x, y, 3, K); R.disco(x, y, 2.2, hex('#3a7ad8')); R.pset(x - 1, y - 1, BL); }
  // las cifras: 20 y 40, y las vueltas que lleva cada una; «½» al decir «half»
  if (t > b(0.565)) R.numero('20', A[0], A[1] + rA + 22, { centro: true, tam: 16 });
  if (t > b(0.64)) R.numero('40', B[0], B[1] + rB + 0, { centro: true, tam: 16 });
  const vA = Math.floor(w / (2 * Math.PI) + 0.02), vB = Math.floor(w / 2 / (2 * Math.PI) + 0.02);
  if (gira > 0) { R.numero(String(vA), A[0] - 34, A[1] - 22, { centro: true, color: hex('#d83a3a') }); R.numero(String(vB), B[0] + 46, B[1] - 44, { centro: true, color: hex('#d83a3a') }); }
  if (t > b(0.74)) { const s = tramo(t, b(0.74), b(0.74) + 0.3); R.numero('½', B[0] + 46, B[1] - 20 + Math.round((1 - s) * 6), { centro: true, tam: 16 }); }
  // la mano de Atom (guante) que da el primer empujón a la rueda pequeña
  const mano = 1 - tramo(t, b(0.62), b(0.66)); if (mano > 0) T.mano(R, A[0] - rA - 4 - Math.round((1 - mano) * 20), A[1] + 10, 1, '#e8e8f0', { sinManga: true });
  // un gato de papel? no: un moscardón que cruza la ventana (vida)
  { const fx = 12 + ((t * 9) % 38), fy = 40 + Math.round(Math.sin(t * 7) * 6); R.pset(Math.round(fx), fy, K); R.pset(Math.round(fx) + 1, fy - 1, hex('#c8d8e8')); }
  for (let k = 0; k < 2; k++) { const x = ((t * (4 + k * 3) + k * 20) % 60) - 8, y = 74 + k * 6; R.rect(Math.round(x) + 8, y, Math.round(x) + 14, y, BL); }
};

// 7 · el tren de ruedas: cada pareja divide; todas juntas, un cálculo
const fieltro = () => capa('fieltro', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, H_(x, y, 105) > 0.85 ? hex('#2a5a3a') : H_(x >> 1, y >> 1, 106) > 0.9 ? hex('#3a6a4a') : hex('#2e5e40'));
  calma(hex('#2e5e40')); R.rect(0, 160, 319, 179, K); tablas(0, 161, 319, 179, 6, hex('#6a3e22'), hex('#4a2a16'), hex('#8a5a34'), 11);
  // la esfera con su aguja (lo que gira se pinta encima) y las marquitas
  R.disco(272, 124, 27, K); R.disco(272, 124, 26, hex('#c8963a')); R.disco(272, 124, 22, hex('#f0e8d0')); for (let k = 0; k < 24; k++) { const an = k * Math.PI / 12; R.linea(272 + Math.cos(an) * 18, 124 + Math.sin(an) * 18, 272 + Math.cos(an) * 21, 124 + Math.sin(an) * 21, k % 2 ? hex('#a89a7a') : K); } R.disco(272, 124 - 15, 2, hex('#d83a3a'));
  // tornillos, una lupa y unas pinzas sobre el fieltro
  for (const [x, y] of [[30, 30], [50, 150], [210, 150], [300, 150]]) { R.disco(x, y, 2, K); R.disco(x, y, 1.4, hex('#c8c8c0')); }
  R.linea(20, 140, 40, 120, hex('#a8a8b0')); R.linea(22, 140, 42, 120, hex('#a8a8b0'));
  // la hoja con el boceto de las ruedas, la regla, la aceitera y unas ruedecitas sueltas
  R.rect(220, 12, 268, 52, K); R.rect(221, 13, 267, 51, hex('#f0e8d0')); rueda(236, 32, 9, 12, 0, hex('#f0e8d0'), hex('#a89a7a'), hex('#f0e8d0'), { borde: hex('#5a5a7a') }); rueda(254, 26, 5, 8, 0.3, hex('#f0e8d0'), hex('#a89a7a'), hex('#f0e8d0'), { borde: hex('#5a5a7a') }); R.linea(240, 46, 264, 46, hex('#5a5a7a'));
  R.rect(176, 146, 246, 151, K); R.rect(177, 147, 245, 150, hex('#d8c070')); for (let x = 179; x < 245; x += 3) R.pset(x, 147, K);
  R.disco(70, 142, 7, K); R.disco(70, 142, 6, hex('#8a8a90')); R.disco(68, 140, 2, hex('#c8c8d0')); R.linea(74, 138, 86, 126, K); R.linea(75, 138, 87, 126, hex('#8a8a90'));
  for (const [x, y, r] of [[300, 168 - 30, 5], [24, 96, 4], [190, 24, 4]]) rueda(x, y, r, 8, 0.5, hex('#c8963a'), hex('#8a6024'), hex('#f0c868'), { radios: false });
  for (let k = 0; k < 30; k++) R.pset(Math.round(H_(k, 1, 107) * 320), Math.round(H_(k, 2, 107) * 150), hex('#3e7050'));
});
const p7 = (t) => {
  fieltro();
  const w = (t - P7) * 6;
  // tres parejas en zigzag: piñón A → rueda B; el eje de B lleva al piñón C → rueda D; el eje de D, al piñón E → rueda F
  const G = { A: [30, 66, 9, 10], B: [70, 66, 28, 30], C: [104, 124, 9, 10], D: [142, 124, 26, 28], E: [180, 64, 9, 10], F: [214, 64, 22, 24] };
  const om = { A: 1, B: -1 / 3 }; om.C = om.B; om.D = -om.C * 10 / 28; om.E = om.D; om.F = -om.E * 10 / 24;
  const pares = [['A', 'B'], ['C', 'D'], ['E', 'F']], toca = [b(0.81), b(0.845), b(0.88)];
  // los ejes de bronce que unen cada rueda con el piñón siguiente
  for (const [p, q] of [['B', 'C'], ['D', 'E']]) { const [x0, y0] = G[p], [x1, y1] = G[q]; for (let k = -1; k <= 1; k++) R.linea(x0 + k, y0, x1 + k, y1, k ? K : hex('#e0b050')); R.linea(x0 + 1, y0 + 2, x1 + 1, y1 + 2, hex('#1e3e2a')); }
  for (let p = 0; p < 3; p++) if (t > toca[p] && t < toca[p] + 0.9) for (const i of pares[p]) { const [x, y, r] = G[i]; R.disco(x, y, r + 6, hex('#7aa86a')); }
  for (const i of ['B', 'D', 'F', 'A', 'C', 'E']) { const [x, y, r] = G[i]; R.disco(x + 3, y + 3, r + 3, hex('#1e3e2a')); }
  for (const i of ['B', 'D', 'F', 'A', 'C', 'E']) { const [x, y, r, n] = G[i]; rueda(x, y, r, n, w * om[i], r < 12 ? hex('#e0b050') : hex('#c8963a'), hex('#8a6024'), hex('#f0c868'), { diente: 3.5, huecos: r > 20 ? hex('#2e5e40') : undefined }); }
  const ag0 = w * om.F;
  // el eje que lleva a la esfera y la aguja que marca
  for (let k = -1; k <= 1; k++) R.linea(214 + k, 64, 254 + k, 106, k ? K : hex('#e0b050'));
  const ag = -1.57 - ag0 * 2.2; R.linea(272, 124, 272 + Math.cos(ag) * 17, 124 + Math.sin(ag) * 17, K); R.linea(273, 124, 273 + Math.cos(ag) * 17, 124 + Math.sin(ag) * 17, hex('#c83a3a')); R.disco(272, 124, 3, K); R.disco(272, 124, 2, hex('#c8963a'));
  const fin = tramo(t, b(0.955), b(0.955) + 0.3) - tramo(t, b(0.955) + 0.8, b(0.955) + 1.2);
  if (fin > 0) { const gx = Math.round(272 + Math.cos(ag) * 17), gy = Math.round(124 + Math.sin(ag) * 17), r = Math.round(2 + fin * 5); R.linea(gx - r, gy, gx + r, gy, BL); R.linea(gx, gy - r, gx, gy + r, BL); }
  // la manivela de la primera rueda y la mano que la gira
  const mx = Math.round(30 + Math.cos(w + 1) * 14), my = Math.round(66 + Math.sin(w + 1) * 14); R.linea(30, 66, mx, my, K); R.linea(31, 66, mx + 1, my, hex('#8a6024')); R.disco(mx, my, 2.5, hex('#6a3e22'));
  T.brazo(R, -8, 122, mx, my + 3, TRAJE, 1, { codo: [8, my + 34] });
};

// 8 · 1974: el libro
const libreria = () => capa('libreria', () => {
  // la pared de madera de los setenta y estanterías llenas
  tablasV(0, 0, 319, 126, 12, hex('#8a5a30'), hex('#6a4220'), hex('#a8743e'), 12);
  calma(hex('#8a5a30'));
  for (const x0 of [6, 214]) { const y0 = x0 === 214 ? 46 : 20; R.rect(x0, y0, x0 + 96, 126, K); R.rect(x0 + 2, y0 + 2, x0 + 94, 124, hex('#4a2a14'));
    for (let s = x0 === 214 ? 1 : 0; s < 4; s++) { const y = 24 + s * 25; R.rect(x0 + 2, y + 21, x0 + 94, y + 23, hex('#7a4a28')); for (let x = x0 + 4; x < x0 + 90; ) { const w = 3 + Math.floor(H_(x, s, 110) * 5), hh = 14 + Math.floor(H_(x, s, 111) * 6), cols = ['#e8803a', '#c83a3a', '#3a8a8a', '#e8c040', '#6a3a6a', '#3a5a2a', '#f0e0c0']; if (x0 === 214 && s === 0) break; R.rect(x, y + 21 - hh, x + w - 1, y + 20, hex(cols[Math.floor(H_(x, s, 112) * 7)])); R.rect(x, y + 21 - hh, x, y + 20, K); x += w + (H_(x, s, 113) > 0.8 ? 3 : 0); } } }
  // el cartel de la presentación: una rueda grande (sin letras)
  R.rect(126, 18, 190, 74, K); R.rect(127, 19, 189, 73, hex('#e8803a')); R.rect(129, 21, 187, 71, hex('#f0e0c0')); rueda(158, 46, 16, 16, 0.2, hex('#c8963a'), hex('#8a6024'), hex('#f0c868'), { diente: 3.5 });
  // la moqueta naranja y la mesa con la pila de libros
  for (let y = 127; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 127) / 13), gx = ((x + fila * 14) % 28) - 14, gy = ((y - 127) % 13) - 6.5, d = Math.hypot(gx, gy * 2);
    let c = d > 8 && d < 10.5 ? hex('#e8843e') : d < 3.5 ? hex('#8a3a1a') : d > 5 && d < 6.5 ? hex('#a84a22') : H_(x, y, 114) > 0.8 ? hex('#b85a2a') : hex('#c8662e');
    if (x > 112 && x < 228 && y > 133 && y < 163) c = mez(c, hex('#4a1e0e'), 0.35); if (y < 132) c = mez(c, hex('#4a1e0e'), (132 - y) / 10); R.pset(x, y, c); }
  R.rect(0, 126, 319, 127, K);
  R.rect(116, 128, 222, 134, K); R.rect(117, 129, 221, 133, hex('#6a3e22')); R.rect(117, 129, 221, 129, hex('#8a5a34')); R.rect(120, 134, 124, 160, hex('#4a2a14')); R.rect(214, 134, 218, 160, hex('#4a2a14'));
  for (let p = 0; p < 2; p++) for (let k = 0; k < 4; k++) { const x = 128 + p * 58, y = 124 - k * 4; R.rect(x, y, x + 24, y + 3, K); R.rect(x + 1, y + 1, x + 23, y + 2, hex('#2a4a6a')); R.rect(x + 1, y + 1, x + 2, y + 2, hex('#e8c860')); }
  // el atril con «1974» (se pinta encima) y una planta de interior
  R.rect(250, 96, 280, 120, K); R.rect(251, 97, 279, 119, hex('#f0e0c0')); R.linea(258, 120, 252, 150, K); R.linea(272, 120, 278, 150, K);
  R.rect(296, 130, 312, 150, K); R.rect(297, 131, 311, 149, hex('#c8662e')); for (let k = 0; k < 7; k++) { const an = -2.6 + k * 0.35; R.linea(304, 130, 304 + Math.cos(an) * 16, 130 + Math.sin(an) * 18, hex('#3a7a3a')); }
});
const libro = (x, y, s = 1) => { R.rect(x - 9 * s, y - 12 * s, x + 9 * s, y + 12 * s, K); R.rect(x - 8 * s, y - 11 * s, x + 8 * s, y + 11 * s, hex('#2a4a6a')); R.rect(x - 8 * s, y - 11 * s, x - 7 * s, y + 11 * s, hex('#1e3854'));
  rueda(x, y - 1 * s, 5 * s, 10, 0.3, hex('#e8c860'), hex('#c8963a'), hex('#f8e8a0'), { diente: 1.6 * s, radios: false }); R.rect(x - 5 * s, y + 7 * s, x + 5 * s, y + 7 * s, hex('#e8c860')); };
const p8 = (t) => {
  libreria();
  R.numero('1974', 265, 113, { centro: true, color: hex('#2a4a6a'), sombra: false });
  // el público: aplauden cuando levanta el libro; un fotógrafo dispara el flash
  const alza = tramo(t, c(0.17), c(0.21)), aplauso = t > c(0.22) && t < c(0.32);
  R.actor(EL.senora75 || EL.senora30, 34, 172, t, { dir: 1, brazos: aplauso && Math.floor(t * 8) % 2 === 0, sonrisa: aplauso });
  R.actor(EL.oficinista, 64, 176, t, { dir: 1, brazos: aplauso && Math.floor(t * 8 + 1) % 2 === 0, sonrisa: aplauso });
  R.actor(EL.consejero, 94, 178, t, { dir: 1, brazos: aplauso && Math.floor(t * 8 + 0.5) % 2 === 0, sonrisa: aplauso, habla: !aplauso && Math.sin(t * 3) > 0.7 });
  R.actor(EL.senora30, 196, 179, t, { dir: -1, brazos: aplauso && Math.floor(t * 8 + 1.5) % 2 === 0, sonrisa: aplauso });
  const fl = t > c(0.25) && t < c(0.25) + 0.15; R.actor(EL.periodista, 236, 172, t, { dir: -1, sostiene: [228, 152] }); R.rect(222, 148, 232, 155, K); R.rect(223, 149, 231, 154, hex('#3a3a44')); R.disco(225, 151, 1.5, hex('#a8c8e8')); if (fl) { R.disco(228, 146, 6, BL); velo(0, 0, 319, 179, BL, 0.25); }
  // Price, detrás de la mesa, levanta su libro y sonríe
  const mp = R.actor(EL.priceAK, 160, 128, t, { dir: 1, sostiene: [176, Math.round(lerp(118, 96, alza))], sonrisa: t > c(0.2), habla: t > P8 + 0.3 && t < c(0.12) && Math.sin(t * 8) > 0 });
  libro(mp.mano[0] + 2, mp.mano[1] - 6, 1);
};

// 9 · el plano de Price: un calendario del Sol y de la Luna
const plano = () => capa('planoAzul', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, H_(x >> 2, y >> 2, 120) > 0.85 ? hex('#5a3e24') : hex('#6a4a2c'));
  calma(hex('#6a4a2c'));
  // la hoja azul de dibujo con su cuadrícula
  R.rect(40, 24, 270, 172, K); for (let y = 25; y < 172; y++) for (let x = 41; x < 270; x++) R.pset(x, y, (x % 10 === 0 || y % 10 === 0) ? hex('#3a62a8') : hex('#2a52a0'));
  const W = hex('#e8f0f8'), WS = hex('#a8c0e0');
  R.anillo(155.5, 92.5, 56, W); R.anillo(155.5, 92.5, 48, W); R.anillo(155.5, 92.5, 36, WS);
  for (let k = 0; k < 60; k++) { const an = k * Math.PI / 30; R.linea(155 + Math.cos(an) * 48, 92 + Math.sin(an) * 48, 155 + Math.cos(an) * (k % 5 ? 51 : 55), 92 + Math.sin(an) * (k % 5 ? 51 : 55), W); }
  for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6 + 0.26; R.disco(155 + Math.cos(an) * 42, 92 + Math.sin(an) * 42, 1.5, WS); }
  // la escuadra, el compás y el lápiz sobre la mesa
  R.poligono([[278, 40], [314, 40], [278, 110]], K); R.poligono([[280, 43], [310, 43], [280, 104]], hex('#c8e0d0'));
  R.linea(10, 150, 30, 120, hex('#a8a8b0')); R.linea(30, 120, 34, 150, hex('#a8a8b0')); R.disco(30, 120, 2, hex('#c8963a'));
  R.linea(280, 160, 312, 140, K); R.linea(281, 160, 313, 140, hex('#e8c040'));
});
const p9 = (t) => {
  plano();
  const W = hex('#e8f0f8'), d = (t - P9) * 0.9;
  // la aguja del Sol y la de la Luna giran (la de la Luna, más deprisa)
  const aS = -1.57 + d * 0.6, aL = -1.57 + d * 1.5;
  R.linea(155, 92, 155 + Math.cos(aS) * 44, 92 + Math.sin(aS) * 44, hex('#f8d850')); R.linea(156, 92, 156 + Math.cos(aS) * 44, 92 + Math.sin(aS) * 44, hex('#f8d850'));
  R.linea(155, 92, 155 + Math.cos(aL) * 32, 92 + Math.sin(aL) * 32, BL);
  R.disco(155 + Math.cos(aS) * 44, 92 + Math.sin(aS) * 44, 5, K); R.disco(155 + Math.cos(aS) * 44, 92 + Math.sin(aS) * 44, 4, hex('#f8d850'));
  { const x = 155 + Math.cos(aL) * 32, y = 92 + Math.sin(aL) * 32; R.disco(x, y, 4, K); R.disco(x, y, 3, BL); R.disco(x + 1.5, y, 2.4, hex('#2a3a5a')); }
  R.disco(155, 92, 3, K); R.disco(155, 92, 2, W);
  // el destello en «sun» y en «moon»
  for (const [m0, ang, rr] of [[c(0.614), aS, 44], [c(0.664), aL, 32]]) { const f = tramo(t, m0, m0 + 0.2) - tramo(t, m0 + 0.6, m0 + 0.9); if (f > 0) { const x = Math.round(155 + Math.cos(ang) * rr), y = Math.round(92 + Math.sin(ang) * rr), r = Math.round(4 + f * 6); R.linea(x - r, y, x + r, y, BL); R.linea(x, y - r, x, y + r, BL); } }
  // en «calendar», las marcas de los meses se encienden una a una
  const cal = tramo(t, c(0.45), c(0.55)); for (let k = 0; k < Math.floor(cal * 12); k++) { const an = k * Math.PI / 6 + 0.26; R.disco(155 + Math.cos(an) * 42, 92 + Math.sin(an) * 42, 2, hex('#f8d850')); }
  // la mano de Price con el lápiz repasa el anillo de los meses
  const hx = Math.round(155 + Math.cos(0.7 + d * 0.16) * 58), hy = Math.round(92 + Math.sin(0.7 + d * 0.16) * 58);
  R.linea(hx, hy, hx + 10, hy + 12, K); R.linea(hx + 1, hy, hx + 11, hy + 12, hex('#e8c040')); T.brazo(R, hx + 44, 204, hx + 11, hy + 13, TRAJE, -1, { codo: [hx + 34, Math.round((hy + 204) / 2 + 6)] });
  // la sombra de la lámpara de la mesa de dibujo
  velo(0, 0, 40, 179, K, 0.18);
};

// 10 · la charla: no todos le creen; él va por buen camino
const charla = () => capa('charla', () => {
  // placas acústicas arriba y friso de listones abajo
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { let c = y < 80 ? ((x % 16 === 0 || y % 16 === 0) ? hex('#24202c') : ((x >> 1) + (y >> 1)) % 3 === 0 ? hex('#3a3644') : hex('#34303e')) : (x % 6 === 0 ? hex('#3a2418') : H_(x, y >> 2, 132) > 0.8 ? hex('#6a4428') : hex('#5a3a22')); R.pset(x, y, c); }
  calma(hex('#34303e')); R.rect(0, 79, 319, 81, K); R.rect(0, 80, 319, 80, hex('#8a6a4a'));
  // las cortinas del escenario, la puerta con el pictograma de salida y el radiador
  for (const [x0, x1] of [[0, 18], [300, 319]]) for (let x = x0; x <= x1; x++) for (let y = x0 === 300 ? 50 : 0; y < 132; y++) R.pset(x, y, (x + Math.floor(y / 26)) % 5 === 0 ? hex('#4a1418') : hex('#6a1e24'));
  R.rect(270, 62, 296, 132, K); R.rect(271, 63, 295, 131, hex('#7a5a3a')); R.disco(291, 98, 1.5, hex('#c8963a')); R.rect(274, 52, 292, 59, K); R.rect(275, 53, 291, 58, hex('#3ab86a')); R.rect(280, 54, 282, 57, BL); R.rect(284, 55, 288, 56, BL); R.rect(298, 47, 319, 49, hex('#c8963a'));
  for (let k = 0; k < 6; k++) R.rect(66 + k * 5, 98, 68 + k * 5, 118, hex('#a8a8a8')); R.rect(64, 96, 96, 98, hex('#c8c8c8'));
  relojPared(240, 30, 8, 0);
  R.rect(0, 132, 319, 179, hex('#3a2a24')); for (let y = 133; y < 180; y += 4) R.rect(0, y, 319, y, hex('#2e201c'));
  // la pantalla de proyección (la imagen se pinta encima) y su trípode
  R.rect(110, 14, 262, 104, K); R.rect(112, 16, 260, 102, hex('#e8e8e0')); R.rect(108, 12, 264, 15, hex('#6a6a70')); R.linea(186, 104, 176, 132, K); R.linea(186, 104, 196, 132, K);
  // el proyector sobre su carrito, a la izquierda
  R.rect(20, 110, 60, 132, K); R.rect(21, 111, 59, 131, hex('#5a5a62')); R.rect(30, 96, 54, 110, K); R.rect(31, 97, 53, 109, hex('#7a7a84')); R.disco(56, 103, 4, K); R.disco(56, 103, 3, hex('#c8d8e8'));
  // sillas en fila y una mesa con jarra de agua
  for (let k = 0; k < 4; k++) { const x = 220 + k * 24; R.rect(x, 150, x + 16, 152, K); R.rect(x + 1, 150, x + 15, 151, hex('#c8662e')); R.rect(x + 1, 152, x + 2, 170, hex('#4a4a4a')); R.rect(x + 14, 152, x + 15, 170, hex('#4a4a4a')); }
  R.rect(70, 120, 104, 124, K); R.rect(71, 121, 103, 123, hex('#6a3e22')); R.rect(84, 108, 92, 120, K); R.rect(85, 109, 91, 119, hex('#a8c8e0')); R.rect(73, 124, 75, 132, hex('#4a2a14')); R.rect(99, 124, 101, 132, hex('#4a2a14'));
  // el público de espaldas, en la primera fila (cabezas)
  for (let k = 0; k < 5; k++) { const x = 20 + k * 22, y = 168; R.disco(x, y, 7, K); R.disco(x, y, 6, [hex('#3a2a1c'), hex('#8a8a90'), hex('#6a4424'), hex('#2a1c14'), hex('#c8a060')][k]); R.disco(x - 2, y - 3, 2, mez([hex('#3a2a1c'), hex('#8a8a90'), hex('#6a4424'), hex('#2a1c14'), hex('#c8a060')][k], BL, 0.3)); R.rect(x - 7, y, x - 6, y + 2, hex('#e8b088')); R.rect(x + 6, y, x + 7, y + 2, hex('#e8b088')); R.rect(x - 3, y + 6, x + 3, y + 7, hex('#e8b088')); R.rect(x - 9, y + 6, x + 9, 179, K); R.rect(x - 8, y + 7, x + 8, 179, [hex('#4a4a56'), hex('#6a3a2a'), hex('#2a3a5a'), hex('#5a5a3a'), hex('#4a2a3a')][k]); }
});
const p10 = (t) => {
  charla();
  // el haz del proyector con motas, y la radiografía en la pantalla
  for (let k = 0; k < 400; k++) { const u = H_(k, 1, 131), v = H_(k, 2, 131), x = Math.round(60 + u * 52), y = Math.round(103 - (v - 0.5) * u * 88); if (b4(x, y) < 0.5) R.pset(x, y, mez(R.pget(x, y), hex('#f8f0d0'), 0.25)); }
  R.rect(116, 20, 256, 98, hex('#1e2a3e')); const brilla = t > c(0.95);
  rueda(186, 60, 30, 24, 0.1, brilla ? hex('#8ab8e8') : hex('#5a7a9a'), hex('#3a5a7a'), hex('#9ab8d8'), { borde: hex('#c8e0f0'), diente: 4, huecos: hex('#1e2a3e') });
  rueda(150, 78, 14, 14, 0.4, hex('#3a5a7a'), hex('#2a4a6a'), hex('#5a7a9a'), { borde: hex('#7a9ab8') }); rueda(226, 40, 10, 12, 0.2, hex('#3a5a7a'), hex('#2a4a6a'), hex('#5a7a9a'), { borde: hex('#7a9ab8') });
  for (let k = 0; k < 6; k++) { const ph = (t * 0.3 + k / 6) % 1; R.pset(Math.round(64 + ph * 46), Math.round(100 - k * 3 + Math.sin(t + k) * 2), hex('#f8f0d0')); }
  // dos colegas dudan (cruzan los brazos, niegan) y a uno le sale un «?»
  const duda = t > P10 && t < c(0.8);
  R.actor(EL.consejero, 236, 168, t, { dir: -1, enfado: duda, dir2: 0, sorpresa: t > c(0.93) });
  R.actor(EL.consejeroCalvo, 262, 170, t, { dir: duda && t > c(0.74) && t < c(0.79) ? (Math.floor(t * 7) % 2 ? 1 : -1) : -1, triste: duda, sonrisa: t > c(0.95) });
  if (t > c(0.725) && t < c(0.86)) R.icono('?', 268, 132, hex('#f8f0d0'), K, 2);
  for (let k = 0; k < 3; k++) { const x = 166 + k * 22 + Math.round(Math.sin(t * 0.7 + k * 2) * 1.2), y = 170 + (k === 1 && t > c(0.74) && t < c(0.8) ? -2 : 0), pelo = [hex('#5a3a22'), hex('#b8b8b8'), hex('#1e1612')][k], ropa = [hex('#3a4a3a'), hex('#4a3a5a'), hex('#6a4a2a')][k];
    R.rect(x - 9, y + 6, x + 9, 179, K); R.rect(x - 8, y + 7, x + 8, 179, ropa); R.rect(x - 8, y + 7, x - 7, 179, mez(ropa, BL, 0.2)); R.rect(x - 3, y + 5, x + 3, y + 7, hex('#e8b088'));
    R.disco(x, y, 7, K); R.disco(x, y, 6, pelo); R.disco(x - 2, y - 3, 2, mez(pelo, BL, 0.3)); R.rect(x - 7, y, x - 6, y + 2, hex('#e8b088')); R.rect(x + 6, y, x + 7, y + 2, hex('#e8b088')); }
  // Price señala la rueda de la pantalla y sonríe en «right track»
  R.actor(EL.priceAK, 140, 160, t, { dir: 1, dedo: t > c(0.81), habla: t > c(0.82) && t < c(0.95) && Math.sin(t * 8) > 0, sonrisa: t > c(0.95) });
};

const efectos = [[2.0, 'puerta'], [4.9, 'golpecito'], [a(0.28), 'brillo'],
  [P2 + 0.4, 'golpecito'], [P2 + 1.4, 'golpecito'], [P2 + 2.4, 'golpecito'], [P2 + 3.3, 'golpecito'],
  [P3 + 2.0, 'toc'], [a(0.78), 'interruptor'], [a(0.90), 'zumbido'], [a(0.93), 'bip'],
  [P4 + 0.2, 'interruptor'], [P4 + 0.8, 'zumbido'], [b(0.12), 'papel'], [b(0.17), 'whoosh'],
  [P5 + 0.2, 'lapiz'], [b(0.41), 'ring'], [b(0.425), 'lapiz'], [b(0.47), 'lapiz'],
  [P6 + 0.2, 'papel'], [b(0.565), 'pop'], [b(0.61), 'golpecito'], [b(0.64), 'pop'], [b(0.66), 'maquina'], [b(0.74), 'brillo'],
  [P7 + 0.2, 'tic'], [b(0.81), 'pop'], [b(0.87), 'pop'], [b(0.955), 'campana'],
  [P8 + 0.2, 'papel'], [c(0.19), 'papel'], [c(0.23), 'palmada'], [c(0.25), 'flash'], [c(0.29), 'palmada'],
  [P9 + 0.3, 'lapiz'], [c(0.48), 'tic'], [c(0.614), 'brillo'], [c(0.664), 'brillo'],
  [P10 + 0.2, 'maquina'], [c(0.73), 'boing'], [c(0.96), 'brillo']];
const año = (t) => t < P2 ? 1951 : t < P3 ? Math.round(1951 + 19 * tramo(t, P2 + 0.1, a(0.49))) : t < P6 ? 1971 : t < P8 ? null : 1974;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10]], { efectos, cartela: '1951', año });
''')
