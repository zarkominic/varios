E = {}

# Ayudas comunes de las tres escenas del grupo S3 (ny-muro, ny-ingleses, ny-timbre): cielos tramados, nubes de tres
# tonos a tres velocidades, gaviotas, agua viva, ladrillo, casas holandesas, adoquines, el navío de guerra inglés de 1664,
# capas fijas en búfer (con transparencia) y figuritas de fondo. Se pegan delante del cuerpo de cada escena.
AYUDA = r'''
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], um = (x, y) => (BY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const H = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const grad = (x, y, cols, f) => { const g = Math.max(0, Math.min(cols.length - 1.001, f * (cols.length - 1))), i = Math.floor(g); return g - i > um(x, y) ? cols[i + 1] : cols[i]; };
const X = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Array.isArray(v) ? v.map(hex) : hex(v)]));
const K = X({
  k: '#1c1424', blanco: '#f4f0e6', papel: '#efe4c4', papelS: '#d4c49c', papelL: '#fbf4dc', tinta: '#3a3040', tintaL: '#8a8494',
  cielo: ['#3a78c4', '#4686ce', '#5694d6', '#68a4de', '#7cb2e4', '#94c2ea', '#b0d2ec', '#cde0ea'],
  noche: ['#0c1028', '#121838', '#182044', '#1e2850', '#26325c', '#303e6a'],
  agua: ['#8ab8d0', '#6aa0be', '#4a84aa', '#3a6e8e', '#2e5c7a', '#24506a'], aguaL: '#b4d6e4', aguaS: '#1e4258', espuma: '#eef4f2',
  lejos: '#8aa4c0', lejosS: '#7290b0', lejosL: '#a8bed4', lejosV: '#7a9a8a', lejosVS: '#668674',
  hierba: '#6a9a44', hierbaS: '#4e7a34', hierbaL: '#90bc5a', hierbaSS: '#3a5e2a', seca: '#b0a058', secaS: '#8a7a3e',
  tierra: '#8a6440', tierraS: '#6a4a2c', tierraL: '#aa8458', camino: '#c4a878', caminoS: '#a48a5e', caminoL: '#dcc49a',
  madera: '#8a5a34', maderaS: '#5e3a20', maderaL: '#b07a48', maderaSS: '#3e2414',
  tronco: '#86643e', troncoS: '#5a4228', troncoL: '#aa8456', troncoG: '#8a8478', troncoGS: '#64605a',
  ladrillo: '#a84a34', ladrilloS: '#7a3424', ladrilloL: '#c86a4a', mortero: '#c8b49a',
  piedra: '#a8a294', piedraS: '#7a766c', piedraL: '#cec8b8', teja: '#b8503a', tejaS: '#86362a', tejaL: '#d8785a',
  pizarra: '#4a5262', pizarraS: '#363c4a', pizarraL: '#6a7484',
  vidrio: '#2a3a52', vidrioL: '#7a9aba', luz: '#f8d878', luzS: '#d8a040', luzL: '#fff4c0',
  verde: '#3a6a4a', verdeS: '#284a34', verdeL: '#5a8a64', rojo: '#c8303a', rojoS: '#8a1e26', rojoL: '#e86a5a',
  oro: '#e8b830', oroS: '#a8801c', oroL: '#fff0a0', naranja: '#e8783a', azulB: '#2a3a7a', hierro: '#3a3a48', hierroL: '#6a6a7a',
  piel: '#f6c290', vaca: '#f2eee2', vacaS: '#4a3a30', humo: '#d8d4cc', humoS: '#b0aca4',
});
const mez = (c1, c2, a) => { const ch = (s) => Math.round(((c1 >>> s) & 255) * (1 - a) + ((c2 >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };
// un fondo fijo pintado una vez en su búfer (R.usar devuelve el anterior: nunca R.usar() a secas)
const BUF = new Map();
const fijo = (clave, pinta) => { let b = BUF.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); BUF.set(clave, b); } R.copiar(b); };
// una capa fija con transparencia (lo que va por delante de algo animado): se pinta una vez y se pega sin los huecos
const VACIO = 0x01020304;
const capa = (clave, pinta) => { let b = BUF.get(clave); if (!b) { b = R.nuevo(); b.fill(VACIO); const prev = R.usar(b); pinta(); R.usar(prev); BUF.set(clave, b); } const B = R.buf; for (let i = 0; i < b.length; i++) { const c = b[i]; if (c !== VACIO) B[i] = c; } };
// nubes de tres tonos [x0, y, w, v] desde t0; ninguna entra en la zona de Atom
const nubes = (t, L) => { for (const [x0, y, w, v] of L) { let x = x0 + t * v; if (y < 56 && x > 252 - w * 0.6) x = 252 - w * 0.6; R.nube(Math.round(x), y, w); } };
const gaviotas = (t, L) => { for (const [x0, y0, v, k] of L) { const x = Math.round(((x0 + t * v) % 380 + 380) % 380 - 30), y = Math.round(y0 + Math.sin(t * 0.9 + k * 2) * 3); if (x > 266 && y < 50) continue; if (x > 16 && x < 174 && y < 18) continue; R.gaviota(x, y, t, k); } };
// cielo tramado de y0 a y1 con cirros quietos
const cieloFijo = (y0, y1, cols = K.cielo) => { for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) R.pset(x, y, grad(x, y, cols, (y - y0) / Math.max(1, y1 - y0)));
  for (let k = 0; k < 8; k++) { const cx = 14 + k * 38 + Math.round(H(k, 1) * 20), cy = y0 + 16 + Math.round(H(k, 2) * ((y1 - y0) * 0.55)); if (cx > 262 && cy < 52) continue; for (let i = -16; i <= 16; i++) if (H(i, k) > 0.35) R.pset(cx + i, cy + Math.round(i * 0.12), cols[Math.min(cols.length - 1, cols.length - 2 + (i & 1))]); } };
// agua quieta tramada (y0–y1) con brillos; vetas que corren encima (vivas)
const aguaFija = (y0, y1, x0 = 0, x1 = 319, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = (y - y0) / Math.max(1, y1 - y0); R.pset(x, y, grad(x, y, K.agua, 0.1 + f * 0.85)); }
  for (let n = 0; n < (x1 - x0) * (y1 - y0) / 60; n++) { const x = x0 + Math.floor(H(n, 3, k) * (x1 - x0)), y = y0 + 1 + Math.floor(H(n, 4, k) * (y1 - y0 - 1)), L = 2 + Math.floor(H(n, 5, k) * (2 + (y - y0) * 0.08)); R.linea(x, y, Math.min(x1, x + L), y, H(n, 6, k) < 0.5 ? K.aguaS : K.agua[1]); } };
const vetas = (t, x0, y0, x1, y1, n, v = 6, k = 0) => { for (let i = 0; i < n; i++) { const y = y0 + Math.floor(H(i, 9, k) * (y1 - y0)), f = (y - y0) / Math.max(1, y1 - y0), L = 2 + Math.round(f * 6), x = x0 + ((H(i, 8, k) * (x1 - x0) + t * v * (0.6 + f)) % (x1 - x0)); R.linea(Math.round(x), y, Math.min(x1, Math.round(x + L)), y, i % 3 ? K.aguaL : K.espuma); } };
// muro de ladrillo con llagas (hiladas de 3 px, ladrillos de 6)
const ladrillos = (x0, y0, x1, y1, k = 0, c = K.ladrillo, cS = K.ladrilloS, cL = K.ladrilloL, m = K.mortero) => {
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / 3), off = (fila & 1) * 3;
    for (let x = x0; x <= x1; x++) { let col; if ((y - y0) % 3 === 2) col = m; else if ((x - x0 + off) % 6 === 5) col = m; else { const b = H(Math.floor((x - x0 + off) / 6), fila, k); col = b < 0.2 ? cS : b > 0.86 ? cL : c; } R.pset(x, y, col); } } };
// ventana: marco claro, cristales emplomados (o de guillotina), contraventanas; o.luz la enciende
const ventana = (x, y, w, h, o = {}) => { R.rect(x - 1, y - 1, x + w, y + h, K.k);
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) R.pset(x + i, y + j, o.luz ? ((i + j) % 4 === 0 ? K.luzL : K.luz) : (i + j < 3 ? K.vidrioL : K.vidrio));
  const mc = o.marco ?? K.blanco; R.linea(x, y + (h >> 1), x + w - 1, y + (h >> 1), mc); if (w > 5) R.linea(x + (w >> 1), y, x + (w >> 1), y + h - 1, mc);
  if (!o.luz) R.pset(x + 1, y + 1, K.blanco);
  if (o.contra) { const c = o.contra, cS = mez(c, K.k, 0.35); for (const d of [-1, 1]) { const xa = d < 0 ? x - 1 - Math.ceil(w / 2) : x + w + 1; R.rect(xa - 1, y - 1, xa + Math.ceil(w / 2), y + h, K.k); for (let j = 0; j < h; j++) for (let i = 0; i < Math.ceil(w / 2); i++) R.pset(xa + i, y + j, j % 3 === 2 ? cS : c); } }
  R.linea(x - 1, y + h + 1, x + w, y + h + 1, K.piedraL); };
// casa holandesa de gablete escalonado: x0–x1, base, alero (donde empieza el gablete), cima; o.puerta, o.k semilla, o.anyo
const casaHol = (x0, x1, base, alero, cima, o = {}) => { const w = x1 - x0, pasos = o.pasos ?? 5, k = o.k ?? 0;
  R.rect(x0 - 1, alero, x1 + 1, base, K.k); ladrillos(x0, alero + 1, x1, base, k, o.c, o.cS, o.cL);
  for (let p = 0; p < pasos; p++) { const yA = alero - Math.round((alero - cima) * (p + 1) / pasos), yB = alero - Math.round((alero - cima) * p / pasos), m = Math.round((w / 2 - 4) * p / pasos);
    R.rect(x0 + m - 1, yA - 1, x1 - m + 1, yB, K.k); ladrillos(x0 + m, yA, x1 - m, yB, k + 3, o.c, o.cS, o.cL);
    R.rect(x0 + m - 1, yA - 2, x0 + m + 2, yA - 1, K.piedraL); R.rect(x1 - m - 2, yA - 2, x1 - m + 1, yA - 1, K.piedraL); R.pset(x0 + m - 1, yA - 1, K.piedraS); R.pset(x1 - m + 1, yA - 1, K.piedraS); }
  const cx = (x0 + x1) >> 1; R.rect(cx - 1, cima - 6, cx + 1, cima - 1, K.hierro); R.pset(cx, cima - 7, K.hierro); R.linea(cx - 3, cima - 4, cx + 3, cima - 4, K.hierro);
  // anclas de hierro y la viga de izar
  for (let y = alero + 6; y < base - 14; y += 14) { R.rect(x0 + 3, y, x0 + 4, y + 3, K.hierro); R.rect(x1 - 4, y, x1 - 3, y + 3, K.hierro); }
  R.rect(cx - 1, cima + 4, cx + 1, cima + 6, K.madera); R.linea(cx, cima + 7, cx, cima + 12, K.k); };
// adoquines en perspectiva (filas que crecen hacia abajo)
const adoquines = (x0, y0, x1, y1, k = 0, c = K.piedra, cS = K.piedraS, cL = K.piedraL, m = K.k) => { let y = y0, fila = 0;
  while (y <= y1) { const hR = Math.max(2, Math.round(2 + (y - y0) / Math.max(1, y1 - y0) * 4)), wR = hR * 2, off = (fila & 1) * hR;
    for (let j = 0; j < hR && y + j <= y1; j++) for (let x = x0; x <= x1; x++) { const ci = Math.floor((x - x0 + off) / wR), ix = (x - x0 + off) % wR, b = H(ci, fila, k);
      let col = b < 0.25 ? cS : b > 0.8 ? cL : c; if (j === hR - 1 || ix === wR - 1) col = mez(col, m, 0.55); else if (j === 0 && ix < wR - 2) col = mez(col, K.blanco, 0.15); R.pset(x, y + j, col); }
    y += hR; fila++; } };
// destello de cuatro puntas (u 0–1)
const destello = (x, y, u, c = K.oroL) => { if (u <= 0 || u >= 1) return; const l = Math.round(1 + Math.sin(u * Math.PI) * 4); R.linea(x - l, y, x + l, y, c); R.linea(x, y - l, x, y + l, c); R.pset(x, y, K.blanco); };
// figurita de fondo (3 × 7 px) que anda: c ropa, s sombrero
const fig = (x, y, t, c, k = 0, anda = true, s = null) => { x = Math.round(x); y = Math.round(y); const p = anda ? Math.floor(t * 6 + k) % 2 : 0;
  R.rect(x, y - 6, x + 1, y - 5, K.piel); if (s != null) R.rect(x - 1, y - 7, x + 2, y - 7, s); R.rect(x - 1, y - 4, x + 2, y - 2, c); R.pset(x - 1 + (p ? 0 : 1), y - 1, K.k); R.pset(x + 2 - (p ? 1 : 0), y - 1, K.k); R.pset(x, y, K.k); R.pset(x + 1, y, K.k); };
// bandera de tela que ondea: tipo 'holandesa' (naranja, blanca, azul), 'inglesa' (cruz roja), 'blanca'; (x, y) = el asta arriba
const banderaTela = (x, y, t, tipo, w = 14, a = 9, dir = 1) => { for (let i = 0; i <= w; i++) { const dy = Math.round(Math.sin(t * 6 - i * 0.55) * (i / w) * 1.6), xx = x + dir * i;
  for (let j = -1; j <= a; j++) { const yy = y + j + dy; let c;
    if (j === -1 || j === a || i === w) c = K.k;
    else if (tipo === 'holandesa') c = j < a / 3 ? K.naranja : j < a * 2 / 3 ? K.blanco : K.azulB;
    else if (tipo === 'inglesa') c = Math.abs(j - (a - 1) / 2) < Math.max(1, a / 7) || Math.abs(i - w / 2) < Math.max(1, w / 9) ? K.rojo : K.blanco;
    else c = K.blanco;
    if (c !== K.k && Math.sin(t * 6 - i * 0.55) > 0.6) c = mez(c, K.k, 0.18); R.pset(xx, yy, c); } } };
// el navío de guerra inglés de 1664 (x, y = la línea de flotación en el centro; s 1 = 100 px de eslora): casco con dos
// filas de portas (o.portas 0–1 las abre y asoman las bocas de los cañones), castillo de popa con ventanas y faroles, tres
// palos con velas cuadras hinchadas (o.recogidas: aferradas en las vergas), bauprés, jarcia, la bandera de San Jorge en la
// popa y gallardetes rojos que ondean; se mece y deja reflejo. o.dir −1: la proa a la izquierda.
const nave = (x0, y0, s, t, o = {}) => { const dir = o.dir ?? -1, L = 100 * s, Hh = 15 * s, half = L / 2, fase = x0 * 0.013 + s * 5;
  const cab = Math.sin(t * 1.2 + fase) * 0.9 * s, y = y0 + Math.round(Math.sin(t * 1.05 + fase) * Math.max(0.6, s));
  const top = (u) => { let yt = y - Hh; const sp = -half + 0.24 * L; if (u < sp) yt -= 7 * s; else if (u < sp + 0.06 * L) yt -= 7 * s * (1 - (u - sp) / (0.06 * L)); if (u > half - 0.16 * L) yt -= 3 * s; return Math.round(yt + cab * (u / half)); };
  const bot = (u) => { let yb = y + 3 * s; if (u > half - 0.22 * L) yb -= (u - (half - 0.22 * L)) * 0.6; if (u < -half + 0.05 * L) yb -= (-half + 0.05 * L - u) * 0.9; return Math.round(yb + cab * (u / half)); };
  const SX = (u) => Math.round(x0 + dir * u), casco = hex(o.casco ?? '#4a2c1c'), cascoL = mez(casco, K.blanco, 0.22), cascoS = mez(casco, K.k, 0.4), franja = hex('#c8a040'), cuerda = hex('#4a3a2a');
  const yd = (u) => top(u), mastU = [-0.26 * L, 0.0, 0.27 * L], mastH = [60 * s, 74 * s, 56 * s];
  // reflejo en el agua
  for (let u = -half; u <= half; u++) for (let j = 1; j <= Math.round(7 * s); j++) if (um(SX(u), y0 + 3 * s + j) < 0.45 - j / (16 * s)) R.pset(SX(u), Math.round(y0 + 3 * s + j), K.aguaS);
  // jarcia de atrás (de los topes a la popa y a la proa)
  for (let m = 0; m < 3; m++) { const u = mastU[m], ytop = yd(u) - mastH[m]; R.linea(SX(u), ytop, SX(-half + 4 * s), top(-half + 4 * s), cuerda); R.linea(SX(u), ytop, SX(half), top(half) - 2, cuerda); }
  // palos
  for (let m = 0; m < 3; m++) { const u = mastU[m], ytop = yd(u) - mastH[m], wM = Math.max(1, Math.round(1.6 * s)); for (let i = 0; i < wM; i++) R.linea(SX(u) + i * dir, yd(u), SX(u) + i * dir, ytop, i === 0 ? K.maderaS : K.madera); R.linea(SX(u) - 2, Math.round(ytop + mastH[m] * 0.5), SX(u) + 2, Math.round(ytop + mastH[m] * 0.5), K.k); }
  // casco
  for (let u = -half; u <= half; u++) { const yt = top(u), yb = bot(u), xx = SX(u); if (yb <= yt) continue;
    for (let yy = yt; yy <= yb; yy++) { let c; const rel = yy - yt;
      if (yy === yt || yy === yb || u === -half || u >= half - 0.5) c = K.k;
      else if (rel === 1) c = cascoL;
      else if (Math.abs(yy - Math.round(y - Hh * 0.42)) <= Math.max(0, Math.round(s * 0.6))) c = franja;
      else if (yy > y - 1) c = cascoS;
      else if ((yy - yt) % 3 === 0) c = cascoS;
      else c = casco;
      if (u < -half + 0.24 * L && rel > 1 && rel < 7 * s && Math.round(u) % Math.max(3, Math.round(5 * s)) === 0) c = franja;
      R.pset(xx, yy, c); } }
  // portas y cañones (dos filas)
  const pw = Math.max(2, Math.round(3 * s)), pa = o.portas ?? 0;
  for (const fy of [0.66, 0.25]) { let n = 0; const tot = Math.floor((0.62 * L) / (8 * s));
    for (let u = -half + 0.26 * L; u < half - 0.14 * L; u += 8 * s, n++) { const xx = SX(u), yy = Math.round(y - Hh * fy + cab * (u / half)) - (pw >> 1), abre = pa > n / tot;
      R.rect(xx - 1, yy - 1, xx + pw, yy + pw, K.k);
      if (abre) { R.rect(xx, yy, xx + pw - 1, yy + pw - 1, hex('#8a1e1a')); const r = Math.max(1, Math.round(pw / 2 - 0.4)); R.disco(xx + (pw >> 1), yy + (pw >> 1), r, hex('#20202a')); R.pset(xx + (pw >> 1) - 1, yy + (pw >> 1) - 1, K.hierroL); R.rect(xx, yy - pw - 1, xx + pw - 1, yy - 2, cascoL); R.linea(xx - 1, yy - pw - 2, xx + pw, yy - pw - 2, K.k); }
      else R.rect(xx, yy, xx + pw - 1, yy + pw - 1, cascoS); } }
  // ventanas y faroles de popa
  for (let u = -half + 3 * s; u < -half + 0.2 * L; u += 4 * s) R.rect(SX(u), top(u) + Math.round(2 * s), SX(u) + Math.max(1, Math.round(s * 1.5)) - 1, top(u) + Math.round(3.5 * s), (Math.sin(t * 3 + u) > -0.6) ? K.luz : K.luzS);
  { const xf = SX(-half + 2 * s), yf = top(-half + 2 * s) - Math.round(4 * s); R.rect(xf - 1, yf - 1, xf + Math.max(1, Math.round(s * 1.6)), yf + Math.max(2, Math.round(3 * s)), K.k); R.rect(xf, yf, xf + Math.max(0, Math.round(s * 1.6) - 1), yf + Math.max(1, Math.round(3 * s) - 1), K.luz); }
  // bauprés
  { const bx = SX(half), by = top(half), ex = SX(half + 22 * s), ey = Math.round(by - 12 * s); R.linea(bx, by, ex, ey, K.maderaS); R.linea(bx, by - 1, ex, ey - 1, K.madera); R.linea(ex, ey, SX(0.27 * L), yd(0.27 * L) - mastH[2], cuerda); }
  // velas
  for (let m = 0; m < 3; m++) { const u = mastU[m], h = mastH[m], base = yd(u), ws = (m === 1 ? 0.36 : 0.3) * L;
    for (const [a, b, wf] of [[0.55, 0.16, 1], [0.93, 0.6, 0.76]]) { const yT = Math.round(base - h * a), yB = Math.round(base - h * b), ww = ws * wf;
      R.linea(SX(u - ww / 2) - dir, yT, SX(u + ww / 2) + dir, yT, K.k); R.linea(SX(u - ww / 2), yT + 1, SX(u + ww / 2), yT + 1, K.maderaS);
      if (o.recogidas) { R.linea(SX(u - ww / 2), yT + 2, SX(u + ww / 2), yT + 2, K.papelS); R.linea(SX(u - ww / 2), yT + 3, SX(u + ww / 2), yT + 3, K.k); continue; }
      const hh = yB - yT, bel = (o.viento ?? 0.7) * 4 * s + Math.sin(t * 2 + fase + m) * 0.6;
      for (let j = 2; j <= hh; j++) { const v = j / hh, ex = Math.sin(v * Math.PI) * bel, x1 = u - ww / 2 * (1 + v * 0.08), x2 = u + ww / 2 * (1 + v * 0.08);
        for (let q = x1; q <= x2; q++) { const xx = Math.round(SX(q) + dir * ex), e = (q - x1) / Math.max(1, x2 - x1);
          let c = j === hh || q <= x1 + 0.5 || q >= x2 - 0.5 ? K.k : e < 0.2 ? K.papelS : e > 0.75 ? K.papelL : K.papel; if (c !== K.k && Math.round(q - x1) % Math.max(3, Math.round(4 * s)) === 0) c = K.papelS; if (c !== K.k && v > 0.82) c = mez(c, K.papelS, 0.5); R.pset(xx, yT + j, c); } } } }
  // gallardetes en los topes y la bandera de San Jorge en la popa
  for (let m = 0; m < 3; m++) { const u = mastU[m], ytop = yd(u) - mastH[m], ln = Math.round(14 * s); for (let i = 0; i < ln; i++) { const yy = ytop + Math.round(Math.sin(t * 6 - i * 0.5) * (i / ln) * 2), hgt = Math.max(1, Math.round((1 - i / ln) * 2.4 * s)); R.linea(SX(u) - dir * i, yy, SX(u) - dir * i, yy + hgt - 1, i % 4 === 0 ? K.rojoS : K.rojo); } }
  { const xa = SX(-half - 1), ya = top(-half) - Math.round(14 * s); R.linea(xa, top(-half), xa, ya, K.maderaS); banderaTela(xa, ya, t, 'inglesa', Math.max(6, Math.round(12 * s)), Math.max(4, Math.round(8 * s)), -dir); }
  // la espuma de la línea de flotación
  for (let u = -half + 1; u < half; u += 1) if (H(Math.round(u), Math.floor(t * 4)) < 0.35) R.pset(SX(u), y0 + Math.round(3 * s), K.espuma);
  return { proa: [SX(half), top(half)], popa: [SX(-half), top(-half)], cubierta: y - Hh };
};
'''

E['ny-muro'] = ('El muro', '''// NY-MURO (frase 13), 1653 → 1699 → hoy. Tres planos:
// 1. (nuevaAmsterdam 'calle', o.muro 0 → 0,8) 1653: un mensajero entra corriendo por la calle con un bocadillo de la
//    bandera inglesa y «!» («fearing an English attack»); Stuyvesant y la vecina se asustan; en «build» Stuyvesant da la
//    orden con el dedo, dos colonos cruzan cargando un tronco y al fondo de la calle se levanta el muro tronco a tronco;
// 2. (fondo local) el muro visto desde el norte, de orilla a orilla: el pueblo al fondo, los ríos a los lados, los
//    campos delante; los últimos troncos se clavan en «across the island» y el colono lo señala; en «long gone» pasan
//    los días (el sol corre, se hace de noche dos veces) y los troncos se caen uno a uno; en «the street that ran beside
//    it» se dibuja la calle junto a donde estaba el muro y salen casitas; un inglés de 1699 la señala;
// 3. (nuevaAmsterdam 'calle', o.hoy 0 → 1) la calle vieja se disuelve en la calle de hoy; el colono que pasea se vuelve
//    un neoyorquino; en «Wall Street» brilla el letrero con el pictograma del muro y una vecina lo señala y le hace una
//    foto.''', AYUDA + r'''
const m = (f) => en('muro', f);
const P2 = m(0.431), P3 = m(0.794);
const ATTACK = m(0.193), BUILD = m(0.329), WALL = m(0.370), ISLAND = m(0.482), GONE = m(0.577), LONGO = m(0.609), BUT = m(0.704), STREET = m(0.726), BESIDE = m(0.794), STILL = m(0.871), WALLST = m(0.922);
const colono2 = { ...EL.colono, pal: { ...EL.colono.pal, C: hex('#5a3a2a'), H: hex('#5a3418'), h: hex('#7a4a24') } };
// Stuyvesant con su pierna de madera (la derecha), sin burla: el mismo sprite con la pierna de palo
const PATA = (c) => c.map((f, j) => (j >= 9 && j <= 11 ? f.slice(0, 8) + 'kBk' + f.slice(11) : j === 12 ? f.slice(0, 8) + '.k.' + f.slice(11) : f));
const stuy = { ...EL.stuyvesant, cuerpo: PATA(EL.stuyvesant.cuerpo) };
// el bocadillo con la bandera inglesa y «!»
const bocaBandera = (x, y, u) => { if (u <= 0) return; const sy = Math.round((1 - Math.min(1, u * 4)) * 3); y += sy;
  R.rect(x - 11, y - 12, x + 11, y + 1, K.k); R.rect(x - 10, y - 11, x + 10, y, K.blanco); R.pset(x - 2, y + 2, K.k); R.pset(x - 1, y + 2, K.k); R.pset(x - 2, y + 3, K.k); R.pset(x - 1, y + 1, K.blanco);
  R.rect(x - 9, y - 10, x + 3, y - 2, K.k); R.rect(x - 8, y - 9, x + 2, y - 3, K.blanco); R.rect(x - 8, y - 7, x + 2, y - 5, K.rojo); R.rect(x - 4, y - 9, x - 2, y - 3, K.rojo);
  R.rect(x + 6, y - 10, x + 7, y - 5, K.rojo); R.rect(x + 6, y - 3, x + 7, y - 2, K.rojo); };
// el tronco que cargan dos colonos (de la mano a a la mano b)
const tronco = (a, b) => { const [ax, ay] = a, [bx, by] = b, n = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay)));
  for (let i = -4; i <= n + 4; i++) { const x = Math.round(ax + (bx - ax) * i / n), y = Math.round(ay + (by - ay) * i / n); R.pset(x, y - 3, K.k); R.pset(x, y - 2, K.troncoL); R.pset(x, y - 1, H(i, 1) < 0.3 ? K.troncoS : K.tronco); R.pset(x, y, K.tronco); R.pset(x, y + 1, K.troncoS); R.pset(x, y + 2, K.k); }
  for (const [x, y] of [[ax + (ax < bx ? -5 : 5), ay], [bx + (bx > ax ? 5 : -5), by]]) { R.rect(x - 1, y - 3, x + 1, y + 2, K.k); R.rect(x, y - 2, x, y + 1, K.troncoL); } };

// 1 · la calle (nuevaAmsterdam 'calle'): el aviso, la orden y el muro que crece al fondo
const p1 = (t) => {
  T.nuevaAmsterdam(R, t, { encuadre: 'calle', muro: 0.82 * tramo(t, BUILD - 0.5, P2 + 0.3) });
  // los dos colonos con el tronco cruzan por detrás (suelo 150), hacia el fondo
  const cu = tramo(t, BUILD - 0.6, P2 + 0.4), cx = Math.round(lerp(338, 186, cu));
  const a = R.actor(EL.colono, cx, 150, t, { dir: -1, anda: cu > 0 && cu < 1, sostiene: [cx - 2, 135] }).mano;
  const b = R.actor(colono2, cx + 40, 150, t, { dir: -1, anda: cu > 0 && cu < 1, sostiene: [cx + 38, 135] }).mano;
  if (cu > 0) tronco(a, b);
  // el mensajero llega corriendo desde la derecha
  const mu = tramo(t, 0.2, ATTACK - 0.6), mx = Math.round(lerp(334, 150, mu));
  R.actor(EL.marinero2, mx, 158, t, { dir: -1, anda: mu > 0 && mu < 1, salto: mu > 0 && mu < 1 ? Math.round(Math.abs(Math.sin(t * 9)) * 2) : 0, habla: t > ATTACK - 0.6 && t < BUILD && Math.sin(t * 9) > 0, brazos: t > ATTACK - 0.2 && t < ATTACK + 0.6 });
  bocaBandera(mx + 7, 122, tramo(t, ATTACK - 1.2, ATTACK - 0.9) * (t < BUILD + 0.4 ? 1 : 0));
  // Stuyvesant y la vecina: se asustan y él da la orden
  const orden = t > BUILD - 0.1 && t < P2 - 0.2;
  R.actor(stuy, 66, 158, t, { dir: 1, sorpresa: t > ATTACK - 0.1 && t < BUILD - 0.1, enfado: orden, dedo: orden, habla: orden && Math.sin(t * 8) > 0 });
  R.actor(EL.colona, 90, 158, t, { dir: t < 1.0 ? -1 : 1, habla: t < 1.0 && Math.sin(t * 7) > 0, sorpresa: t > ATTACK - 0.1 && t < BUILD + 0.3, triste: t > BUILD + 0.3 });
  // el martillo al fondo: chispas de astilla donde crece el muro
  const mf = 0.82 * tramo(t, BUILD - 0.5, P2 + 0.3); if (mf > 0.02 && mf < 0.8) { const xm = Math.round(138 + mf * 54); if (Math.floor(t * 6) % 2 === 0) { R.pset(xm, 106, K.blanco); R.pset(xm + 1, 105, K.oroL); } }
};

// 2 · (fondo local) el muro de orilla a orilla, visto desde los campos del norte
const XL = (y) => Math.round(70 - (y - 50) * 0.42), XR = (y) => Math.round(250 + (y - 50) * 0.42);
const NL = 76, X0 = XL(104) + 1, X1 = XR(104) - 1, LW = (X1 - X0) / NL;
const fondoN = () => fijo('norte', () => {
  cieloFijo(0, 48);
  // las colinas lejanas de Staten Island y de Jersey, la bahía detrás de la punta
  for (let x = 0; x < 320; x++) { const h1 = Math.round(5 + Math.sin(x * 0.045) * 3 + Math.sin(x * 0.13) * 1.5); for (let y = 46 - h1; y <= 48; y++) R.pset(x, y, y === 46 - h1 ? K.lejosL : um(x, y) < 0.3 ? K.lejosS : K.lejos); }
  aguaFija(48, 179, 0, 319, 2);
  // la isla: de la punta (y 50) se ensancha hacia nosotros
  for (let y = 50; y < 180; y++) { const l = XL(y) + (y < 56 ? Math.round((56 - y) ** 2 * 0.5) : 0), r = XR(y) - (y < 56 ? Math.round((56 - y) ** 2 * 0.5) : 0);
    for (let x = l; x <= r; x++) { let c; if (x <= l + 1 || x >= r - 1) c = K.arenaL ?? K.caminoL; else c = y < 104 ? (H(x >> 1, y >> 1, 4) < 0.5 ? K.hierba : K.hierbaS) : (H(x >> 1, y, 5) < 0.15 ? K.hierbaL : H(x >> 1, y, 6) < 0.6 ? K.hierba : K.hierbaS);
      if (y >= 104 && (x === l + 2 || x === r - 2)) c = K.caminoS; R.pset(x, y, c); } }
  // el pueblo detrás del muro: el fuerte con su bandera, la iglesia, filas de casitas de gablete
  R.poligono([[144, 62], [150, 55], [170, 55], [176, 62], [170, 68], [150, 68]], K.k); R.poligono([[145, 62], [151, 56], [169, 56], [175, 62], [169, 67], [151, 67]], K.tierraL);
  R.rect(152, 58, 168, 65, K.tierra); R.rect(156, 56, 164, 61, K.piedraL); R.poligono([[155, 56], [160, 51], [165, 56]], K.tejaS);
  for (const [fx, fy, n] of [[84, 74, 9], [70, 82, 12], [60, 90, 15], [90, 66, 4]]) for (let i = 0; i < n; i++) { const x = fx + i * 11 + Math.round(H(i, fy) * 3); if (x > XR(fy) - 10 || (x > 140 && x < 180 && fy < 70)) continue;
    const alto = 7 + Math.round(H(i, fy, 1) * 4), teja = H(i, fy, 2) < 0.35; R.rect(x - 1, fy - alto - 1, x + 8, fy, K.k);
    if (teja) { R.rect(x, fy - alto + 3, x + 7, fy - 1, K.piedraL); R.poligono([[x - 1, fy - alto + 3], [x + 3, fy - alto - 2], [x + 4, fy - alto - 2], [x + 8, fy - alto + 3]], K.teja); }
    else { R.rect(x, fy - alto, x + 7, fy - 1, K.ladrillo); for (let p = 0; p < 3; p++) { R.pset(x + p, fy - alto - 1 + 0, K.k); R.pset(x + 7 - p, fy - alto - 1 + 0, K.k); } R.rect(x + 2, fy - alto - 2, x + 5, fy - alto, K.ladrilloL); R.pset(x + 3, fy - alto - 3, K.k); R.pset(x + 4, fy - alto - 3, K.k); }
    R.pset(x + 2, fy - 4, K.vidrio); R.pset(x + 5, fy - 4, K.vidrio); R.rect(x + 3, fy - 3, x + 4, fy - 1, K.maderaS); }
  // barquitos en los ríos
  for (const [x, y] of [[26, 70], [300, 84], [18, 130]]) { R.rect(x - 5, y, x + 5, y + 1, K.k); R.rect(x - 4, y, x + 4, y, K.maderaS); R.linea(x, y - 1, x, y - 9, K.k); R.poligono([[x + 1, y - 9], [x + 6, y - 2], [x + 1, y - 2]], K.papel); }
  // los campos del norte: surcos, la granja, los árboles, la cerca y el camino del muro (Broadway) que baja
  for (let y = 112; y < 180; y++) for (let x = XL(y) + 3; x <= XR(y) - 3; x++) { const zona = Math.floor((x - 40) / 70 + (y - 112) / 40) % 3;
    if (zona === 1 && (y + Math.floor(x / 3)) % 4 === 0) R.pset(x, y, K.tierraS); else if (zona === 1) R.pset(x, y, (x + y) % 5 ? K.tierra : K.tierraL); else if (zona === 2 && (x * 3 + y * 7) % 23 === 0) R.pset(x, y, K.seca); }
  for (let y = 106; y < 180; y++) { const cx = 155 - Math.round((y - 106) * 0.25), w = 3 + Math.round((y - 106) * 0.16); for (let x = cx - w; x <= cx + w; x++) R.pset(x, y, x === cx - w || x === cx + w ? K.caminoS : H(x, y, 7) < 0.2 ? K.caminoL : K.camino); }
  for (let x = 30; x < 300; x += 7) { const y = 150 + Math.round((x - 160) * (x - 160) * 0.0004); if (x > 132 && x < 170) continue; R.linea(x, y - 6, x, y, K.maderaS); R.pset(x, y - 6, K.maderaL); if (x + 7 < 300 && !(x + 7 > 132 && x + 7 < 170)) { R.linea(x, y - 4, x + 7, y - 4 + Math.round(((x + 7 - 160) ** 2 - (x - 160) ** 2) * 0.0004), K.madera); } }
  // la granja a la derecha
  R.rect(229, 120, 271, 142, K.k); ladrillos(230, 126, 270, 141, 7); R.poligono([[226, 127], [250, 112], [274, 127]], K.k); R.poligono([[229, 126], [250, 114], [271, 126]], K.seca); for (let x = 232; x < 270; x += 3) R.linea(x, 126, 250 + Math.round((x - 250) * 0.4), 117, K.secaS);
  R.rect(246, 132, 253, 141, K.maderaS); ventana(234, 130, 6, 5, { contra: K.verde }); ventana(259, 130, 6, 5, { contra: K.verde });
  // almiar, tocones y árboles
  R.poligono([[196, 140], [204, 124], [212, 140]], K.k); R.poligono([[198, 139], [204, 126], [210, 139]], K.seca); for (let j = 128; j < 139; j += 2) R.linea(204 - (j - 126) * 0.4, j, 204 + (j - 126) * 0.4, j, K.secaS);
  for (const [x, y, r] of [[58, 128, 9], [84, 120, 7], [282, 150, 11], [40, 160, 12]]) { R.rect(x - 1, y, x + 1, y + r, K.troncoS); R.disco(x, y - 2, r + 1, K.k); for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { if (i * i + j * j > r * r) continue; const l = (-i - j) / (r * 1.4) + (H(x + i >> 1, y + j >> 1) - 0.5) * 0.9; R.pset(x + i, y - 2 + j, l > 0.4 ? K.hierbaL : l > 0 ? K.hierba : l > -0.4 ? K.hierbaS : K.hierbaSS); } }
  for (let k = 0; k < 40; k++) { const y = 112 + Math.floor(H(k, 1, 9) * 66), x = XL(y) + 6 + Math.floor(H(k, 2, 9) * (XR(y) - XL(y) - 12)); R.pset(x, y, K.hierbaSS); R.pset(x - 1, y - 1, K.hierbaL); R.pset(x + 1, y - 2, K.hierbaL); }
});
// los troncos del muro: i de 0 a NL−1; u construido (0–1), d derribado (0–1)
const muroN = (t, u, d) => { for (let i = 0; i < NL; i++) { if (i / NL >= u) break; const x = Math.round(X0 + i * LW), cae = H(i, 3, 1); let alto = 12 + Math.round(H(i, 4) * 2);
  if (d > 0 && cae < d) { // caído: un tronco gris tumbado entre la hierba que crece
    if (cae > d - 0.12) { R.linea(x - 2, 104, x + 3, 103, K.troncoGS); R.linea(x - 2, 103, x + 3, 102, K.troncoG); } else if (H(i, 5) < 0.5) { R.pset(x, 103, K.hierbaL); R.pset(x + 1, 102, K.hierba); } continue; }
  const gris = d > 0 && cae < d + 0.15, c = gris ? K.troncoG : K.tronco, cS = gris ? K.troncoGS : K.troncoS;
  const ultimo = i / NL > u - 1 / NL; if (ultimo) alto = Math.round(alto * Math.min(1, (u * NL - i) * 1.2 + 0.4));
  for (let j = 0; j < alto; j++) { const y = 104 - j; R.pset(x - 1, y, K.k); R.pset(x, y, j > alto - 3 ? cS : c); R.pset(x + 1, y, j % 4 === 1 ? cS : c); R.pset(x + 2, y, cS); }
  R.pset(x, 104 - alto, K.k); R.pset(x + 1, 104 - alto - 1, K.k); R.pset(x + 1, 104 - alto, gris ? K.troncoG : K.troncoL); R.pset(x + 2, 104 - alto, K.k); }
  // el travesaño de atrás y la puerta de tierra (Broadway)
  const xa = X0, xb = X0 + Math.round(u * (X1 - X0)); if (d < 0.6) for (let x = xa; x < xb; x++) if (H(Math.floor(x / 3), 7) < 1 - d * 1.6) R.pset(x, 97, K.troncoS);
  if (u > 0.5 && d < 0.5) { R.rect(150, 88, 151, 104, K.k); R.rect(161, 88, 162, 104, K.k); R.rect(150, 86, 162, 87, K.maderaS); R.rect(152, 92, 160, 104, K.maderaS); for (let x = 153; x < 160; x += 2) R.linea(x, 92, x, 104, K.madera); } };
const p2 = (t) => {
  fondoN();
  nubes(t, [[20, 26, 30, 1.2], [120, 22, 40, 2.0], [200, 34, 26, 3.0], [70, 40, 20, 4.0]]);
  gaviotas(t, [[60, 30, 9, 0], [190, 38, 12, 3]]);
  vetas(t, 0, 50, 70, 179, 18, 5, 1); vetas(t, 252, 50, 319, 179, 18, 5, 2);
  // el molino del pueblo y el humo de las chimeneas
  T.molino(R, 112, 80, t, { s: 0.45, vel: 1.4 });
  for (const [x, y, k] of [[96, 64, 0], [130, 72, 1], [200, 74, 2]]) for (let q = 0; q < 4; q++) { const u = (t * 0.5 + q / 4 + k * 0.3) % 1; R.pset(Math.round(x + Math.sin(u * 5 + k) * 2 + u * 6), Math.round(y - u * 16), u < 0.5 ? K.humo : K.humoS); }
  banderaTela(160, 44, t, t < BUT ? 'holandesa' : 'inglesa', 9, 6);
  R.linea(160, 44, 160, 54, K.k);
  // la calle que nace junto al muro, con casitas que salen de izquierda a derecha
  const su = tramo(t, BUT - 0.15, BESIDE - 0.1);
  if (su > 0) { const xs = X0 + Math.round(su * (X1 - X0)); for (let x = X0; x < xs; x++) { R.pset(x, 98, K.caminoS); R.pset(x, 99, K.camino); R.pset(x, 100, H(x, 3) < 0.3 ? K.caminoL : K.camino); R.pset(x, 101, K.caminoS); }
    for (let i = 0; i < 18; i++) { const x = X0 + 4 + i * 13; if (x + 8 > xs) break; const al = 6 + (i % 3) * 2; R.rect(x - 1, 96 - al, x + 8, 97, K.k); R.rect(x, 97 - al, x + 7, 96, i % 2 ? K.ladrillo : K.piedraL); R.rect(x + 1, 95 - al, x + 6, 96 - al, i % 2 ? K.ladrilloL : K.teja); R.pset(x + 2, 93, K.vidrio); R.pset(x + 5, 93, K.vidrio); }
    for (let k = 0; k < 4; k++) fig(X0 + ((k * 61 + t * 14) % (xs - X0 + 1)), 101, t, [K.rojo, K.azulB, K.verde, K.madera][k], k, true, K.k); }
  // el muro: los últimos troncos en «across the island»; en «long gone» se caen
  const u = lerp(0.55, 1, tramo(t, P2, ISLAND + 0.25)), d = tramo(t, GONE, BUT - 0.05);
  muroN(t, u, d);
  if (u < 1) { const xm = Math.round(X0 + u * (X1 - X0)); fig(xm + 4, 104, t, K.verde, 1, false, K.k); if (Math.floor(t * 5) % 2 === 0) { R.pset(xm + 2, 92, K.blanco); R.pset(xm + 3, 91, K.oroL); } }
  // las vacas que pastan
  for (const [x0, y, k] of [[96, 138, 0], [212, 160, 1]]) { const x = Math.round(x0 + Math.sin(t * 0.3 + k) * 4), cab = Math.sin(t * 1.5 + k) > 0 ? 1 : 0;
    R.rect(x - 1, y - 6, x + 10, y - 1, K.k); R.rect(x, y - 5, x + 9, y - 2, K.vaca); R.rect(x + 2, y - 5, x + 4, y - 4, K.vacaS); R.rect(x + 7, y - 3, x + 8, y - 2, K.vacaS);
    R.rect(x + 9, y - 6 + cab, x + 12, y - 3 + cab, K.k); R.rect(x + 10, y - 5 + cab, x + 11, y - 4 + cab, K.vaca); for (const lx of [x + 1, x + 3, x + 6, x + 8]) R.linea(lx, y, lx, y + 1, K.k); }
  // el colono señala el muro acabado y luego se va; en 1699 llegan un oficial inglés y una vecina por el camino
  const va = tramo(t, GONE + 0.1, BUT - 0.2), cx = Math.round(lerp(122, 340, va));
  R.actor(EL.colono, cx, 172, t, { dir: 1, anda: va > 0 && va < 1, dedo: t > ISLAND - 0.3 && t < GONE, sostiene: t < ISLAND - 0.3, sonrisa: t > ISLAND && t < GONE + 0.2 });
  const ll = tramo(t, GONE + 0.6, BESIDE - 0.3), ix = Math.round(lerp(-30, 172, ll));
  R.actor(EL.colona, ix - 20, 174, t, { dir: 1, anda: ll > 0 && ll < 1, sonrisa: ll >= 1 });
  R.actor(EL.ingles, ix, 174, t, { dir: 1, anda: ll > 0 && ll < 1, dedo: ll >= 1 && t < P3 - 0.1, habla: ll >= 1 && Math.sin(t * 7) > 0 });
  // pasan los días: el sol corre y anochece dos veces
  if (d > 0 && d < 1) { const a = Math.sin(d * Math.PI * 2) ** 2 * 0.5; T.tinte(R, 0, 179, [18, 22, 58], a); const sx = Math.round(40 + ((d * 2) % 1) * 210); if (((d * 2) % 1) > 0.05 && ((d * 2) % 1) < 0.95) { R.disco(sx, 30, 5, K.oroL); R.disco(sx, 30, 4, K.luzL); } }
};

// 3 · la misma calle se disuelve en la de hoy: el letrero del muro brilla en «Wall Street»
const p3 = (t) => {
  const hu = tramo(t, P3 + 0.65, STILL + 0.6);
  T.nuevaAmsterdam(R, t, { encuadre: 'calle', hoy: hu });
  const nuevo = hu > 0.5;
  // el paseante: de colono a neoyorquino, sin dejar de andar
  const pu = tramo(t, P3, P3 + 4.0), px = Math.round(lerp(112, 236, pu));
  R.actor(nuevo ? EL.neoyorquino : EL.colono, px, 158, t, { dir: 1, anda: pu > 0 && pu < 1, sonrisa: pu >= 1 });
  // la vecina: de colona a neoyorquina; señala el letrero en «Wall Street» y le hace una foto
  const foto = t > WALLST + 1.0 && t < WALLST + 2.6;
  const vm = R.actor(nuevo ? EL.neoyorquina : EL.colona, 64, 158, t, { dir: 1, dedo: t > WALLST - 0.15 && t < WALLST + 1.0, sorpresa: t > WALLST - 0.15 && t < WALLST + 0.5, sonrisa: t > WALLST + 0.5, sostiene: foto ? [82, 136] : false }).mano;
  if (foto) { R.rect(vm[0] - 1, vm[1] - 6, vm[0] + 4, vm[1] + 1, K.k); R.rect(vm[0], vm[1] - 5, vm[0] + 3, vm[1], hex('#5a8ab8')); if (t > WALLST + 1.6 && t < WALLST + 1.8) { destello(vm[0] + 2, vm[1] - 3, 0.5, K.blanco); R.disco(vm[0] + 2, vm[1] - 3, 2, K.blanco); } }
  // un vecino con su café cruza por delante
  const cu = tramo(t, STILL + 1.0, E.duracion), cx = Math.round(lerp(330, 150, cu));
  if (nuevo) { const cm = R.actor(EL.neoyorquino2, cx, 166, t, { dir: -1, anda: cu > 0 && cu < 1, sostiene: true }).mano; R.rect(cm[0] - 2, cm[1] - 5, cm[0] + 1, cm[1], K.k); R.rect(cm[0] - 1, cm[1] - 4, cm[0], cm[1] - 1, K.blanco); R.pset(cm[0] - 1, cm[1] - 6 - Math.floor(t * 4) % 2, K.humo); }
  // el letrero de la calle (el pictograma del muro) brilla cuando la voz dice «Wall Street»
  const g = tramo(t, WALLST - 0.1, WALLST + 0.25) * (1 - tramo(t, WALLST + 1.6, WALLST + 2.2));
  if (g > 0 && hu > 0.6) { const c = Math.sin(t * 12) > 0 ? K.oroL : K.oro; R.linea(89, 87, 121, 87, c); R.linea(89, 101, 121, 101, c); R.linea(89, 87, 89, 101, c); R.linea(121, 87, 121, 101, c); destello(122, 86, (t - WALLST) / 0.9); destello(88, 102, (t - WALLST - 0.4) / 0.9); }
};

const año = (t) => (t < GONE ? 1653 : t < P3 ? Math.round(lerp(1653, 1699, tramo(t, GONE, BUT - 0.05))) : t < P3 + 0.6 ? 1699 : 2026);
const efectos = [[ATTACK - 0.9, 'aviso'], [BUILD + 0.2, 'toc'], [WALL + 0.25, 'toc'], [ISLAND - 0.2, 'toc'], [ISLAND + 0.1, 'brillo'], [GONE + 0.1, 'whoosh'], [STREET, 'pop'], [WALLST, 'brillo'], [WALLST + 1.65, 'flash']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')

E['ny-ingleses'] = ('Los ingleses', '''// NY-INGLESES (frases 14–15), 1664, cartela «1664». Cuatro planos:
// 1. (fondo local) a ras de agua en el puerto: tres navíos de guerra ingleses entran a vela por la derecha; en
//    «warships» abren las portas y asoman los cañones; un pescador holandés los ve («by sea») y se aleja remando; al
//    fondo, la punta de la isla con el fuerte, la bandera holandesa y el molino;
// 2. (fondo local) lo alto del bastión: Stuyvesant (pierna de madera, trato serio) mira los barcos con el catalejo en
//    «the governor», lo baja en «Peter Stuyvesant» y en «wants to fight» señala los barcos, enfadado; el artillero
//    deja una bala junto al cañón;
// 3. (fondo local) la casa del gobernador: los vecinos le suben la petición firmada y le ruegan («beg him to
//    surrender»); en «He gives up» Stuyvesant la coge y baja la cabeza; detrás, en el fuerte, baja la bandera holandesa y
//    sube la blanca, sin un disparo («without a shot fired»); los vecinos respiran;
// 4. (nuevaAmsterdam 'fuerte') entran los casacas rojas; en «renamed in honor of the Duke of York» baja la bandera
//    blanca y sube la inglesa; el oficial se quita el sombrero ante Stuyvesant; en «New York» un soldado da la vuelta al
//    letrero del cuartel: de la tricolor holandesa a la cruz de San Jorge.''', AYUDA + r'''
const b = (f) => en('barcos', f), r = (f) => en('rinde', f);
const P2 = b(0.48), P3 = b(0.815), P4 = r(0.25);
const SEA = b(0.065), WARSHIPS = b(0.331), HARBOR = b(0.428), GOVERNOR = b(0.518), PETER = b(0.596), WANTS = b(0.719), FIGHT = b(0.751), BEG = b(0.891), SURR = b(0.934);
const GIVES = r(0), WITHOUT = r(0.053), SHOT = r(0.098), RENAMED = r(0.368), DUKE = r(0.532), YORK1 = r(0.585), KINGS = r(0.728), NEWYORK = r(0.907);
const PATA = (c) => c.map((f, j) => (j >= 9 && j <= 11 ? f.slice(0, 8) + 'kBk' + f.slice(11) : j === 12 ? f.slice(0, 8) + '.k.' + f.slice(11) : f));
const stuy = { ...EL.stuyvesant, cuerpo: PATA(EL.stuyvesant.cuerpo) };
const colono2 = { ...EL.colono, pal: { ...EL.colono.pal, C: hex('#5a3a2a'), H: hex('#5a3418'), h: hex('#7a4a24') } };
const colona2 = { ...EL.colona, pal: { ...EL.colona.pal, C: hex('#6a3a3a'), c: hex('#4a2a2a'), H: hex('#7a4a24'), h: hex('#9a6434') } };
const roja2 = { ...EL.casacaRoja, pal: { ...EL.casacaRoja.pal, H: hex('#2c2232'), h: hex('#54466a') } };

// 1 · (fondo local) el puerto a ras de agua: entran los navíos ingleses
const fondoPuerto = () => fijo('puerto64', () => {
  cieloFijo(0, 86);
  // Brooklyn a la derecha, colinas con bosque
  for (let x = 150; x < 320; x++) { const h = Math.round(10 + Math.sin(x * 0.03) * 4 + Math.sin(x * 0.11) * 2); for (let y = 88 - h; y <= 90; y++) R.pset(x, y, y === 88 - h ? K.lejosL : um(x, y) < 0.35 ? K.lejosVS : K.lejosV); }
  aguaFija(88, 179, 0, 319, 3);
  // la punta de Manhattan a la izquierda: la orilla, el fuerte de tierra, la iglesia y las casas
  for (let x = 0; x < 150; x++) { const yb = 90 - Math.round(Math.max(0, (150 - x) * 0.05)); for (let y = yb - 3; y <= 90; y++) R.pset(x, y, y === yb - 3 ? K.hierbaL : y > 88 ? K.caminoS : K.hierba); }
  R.poligono([[20, 86], [28, 76], [62, 76], [70, 86]], K.k); R.poligono([[21, 86], [29, 77], [61, 77], [69, 86]], K.tierraL); for (let x = 30; x < 61; x += 3) R.pset(x, 77, K.tierraS);
  R.rect(36, 66, 54, 77, K.k); R.rect(37, 67, 53, 76, K.piedraL); R.poligono([[35, 67], [45, 59], [55, 67]], K.tejaS); R.rect(43, 52, 47, 60, K.k); R.rect(44, 53, 46, 59, K.piedra);
  for (let i = 0; i < 6; i++) { const x = 74 + i * 11, al = 8 + (i % 3) * 3; R.rect(x - 1, 88 - al - 1, x + 9, 88, K.k); R.rect(x, 88 - al, x + 8, 87, i % 2 ? K.ladrillo : K.ladrilloL); for (let p = 0; p < 3; p++) R.rect(x + p, 88 - al - 1 - p, x + 8 - p, 88 - al - p, K.ladrilloS); R.pset(x + 2, 88 - al + 3, K.vidrio); R.pset(x + 6, 88 - al + 3, K.vidrio); R.rect(x + 3, 84, x + 5, 87, K.maderaS); }
  // el muelle de tablas del pueblo
  R.rect(60, 89, 140, 92, K.k); R.rect(60, 89, 140, 90, K.maderaL); for (let x = 62; x < 140; x += 6) R.rect(x, 91, x + 1, 96, K.maderaS);
});
const bote = (x, y, t, rema) => { const a = rema ? Math.sin(t * 7) : 0;
  R.linea(x - 4, y - 4, Math.round(x - 14 - a * 4), Math.round(y + 3 + a * 2), K.maderaS); R.linea(x + 4, y - 4, Math.round(x + 14 - a * 4), Math.round(y + 3 - a * 2), K.maderaS);
  R.poligono([[x - 17, y - 6], [x + 17, y - 6], [x + 13, y + 1], [x - 13, y + 1]], K.k); R.poligono([[x - 16, y - 5], [x + 16, y - 5], [x + 12, y], [x - 12, y]], K.madera); R.linea(x - 15, y - 5, x + 15, y - 5, K.maderaL); R.linea(x - 13, y - 2, x + 13, y - 2, K.maderaS);
  if (rema && Math.sin(t * 7) > 0.85) { R.pset(Math.round(x - 16), y + 3, K.espuma); R.pset(Math.round(x + 12), y + 3, K.espuma); R.pset(Math.round(x - 17), y + 2, K.blanco); } };
const p1 = (t) => {
  fondoPuerto();
  nubes(t, [[10, 30, 34, 1.4], [110, 24, 46, 2.2], [190, 46, 28, 3.2], [60, 58, 22, 4.4]]);
  T.molino(R, 128, 80, t, { s: 0.42, vel: 1.1 });
  R.linea(45, 40, 45, 52, K.k); banderaTela(46, 40, t, 'holandesa', 10, 6);
  vetas(t, 0, 92, 319, 179, 70, 7, 3);
  // las gaviotas se espantan cuando abren las portas
  const esp = tramo(t, WARSHIPS, WARSHIPS + 2.5); gaviotas(t, [[80, 60 - esp * 20, 10 + esp * 30, 0], [140, 66 - esp * 24, 8 + esp * 34, 2], [30, 72, 6, 4]]);
  // los navíos: entran despacio, de la derecha
  const u = tramo(t, 0.9, HARBOR + 0.6), pa = tramo(t, WARSHIPS - 0.15, HARBOR + 0.2);
  nave(Math.round(lerp(560, 262, u)), 104, 0.36, t, { portas: pa, viento: 0.6 });
  nave(Math.round(lerp(470, 96, u)), 118, 0.55, t, { portas: pa, viento: 0.7 });
  nave(Math.round(lerp(440, 200, u)), 154, 1.0, t, { portas: pa, viento: 0.8 });
  // el pescador holandés los ve y se aleja remando
  const vu = tramo(t, SEA + 0.6, P2 + 0.3), bx = Math.round(lerp(70, -40, vu)), by = 172 + Math.round(Math.sin(t * 1.6) * 1);
  R.actor(colono2, bx - 7, by - 4, t, { dir: vu > 0 ? -1 : 1, sorpresa: t > SEA - 0.1 && t < SEA + 1.4, sostiene: vu > 0 ? [bx - 12, by - 6] : false, tocado: 'boina' });
  bote(bx, by, t, vu > 0 && vu < 1);
};

// 2 · (fondo local) lo alto del bastión: Stuyvesant y el catalejo
const fondoBastion = () => fijo('bastion', () => {
  cieloFijo(0, 70);
  for (let x = 0; x < 320; x++) { const h = Math.round(8 + Math.sin(x * 0.025 + 1) * 4 + Math.sin(x * 0.09) * 2); for (let y = 72 - h; y <= 74; y++) R.pset(x, y, y === 72 - h ? K.lejosL : um(x, y) < 0.35 ? K.lejosVS : K.lejosV); }
  aguaFija(74, 124, 0, 319, 4);
});
const parapeto = () => capa('parapeto', () => {
  // el parapeto de tierra con césped y cestones; la tronera en x 186–208
  for (let x = 0; x < 320; x++) { const tr = x >= 188 && x <= 206, yt = tr ? 120 : 106 + Math.round(Math.sin(x * 0.07) * 1.2); for (let y = yt; y <= 136; y++) { let c = y === yt ? K.k : y < yt + 3 ? K.hierbaL : y < 124 ? (H(x >> 1, y, 2) < 0.5 ? K.hierba : K.hierbaS) : (H(x, y >> 1, 3) < 0.3 ? K.tierraS : K.tierra); if (tr && y > 120 && y < 124) c = K.tierraL; R.pset(x, y, c); } }
  for (const x of [8, 30, 52, 74, 96, 118, 140, 162, 214, 236, 258, 300]) { R.rect(x - 1, 96, x + 15, 109, K.k); for (let y = 97; y < 109; y++) for (let i = 0; i < 15; i++) R.pset(x + i, y, (y + (i >> 1)) % 3 === 0 ? K.secaS : (i + y) % 4 === 0 ? K.maderaS : K.seca); R.rect(x, 96, x + 14, 97, K.tierra); for (let i = 1; i < 14; i += 3) R.pset(x + i, 95, K.hierbaL); }
  // el adarve de tierra apisonada y tablones
  for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { let c = H(x >> 1, y >> 1, 6) < 0.25 ? K.tierraS : H(x, y, 7) < 0.1 ? K.tierraL : K.tierra; if (y > 150 && y < 172 && x > 120 && x < 230) c = (x - 120) % 12 === 0 ? K.maderaSS : (y - 150) % 7 === 0 ? K.maderaS : (H(Math.floor((x - 120) / 12), y, 8) < 0.5 ? K.madera : K.maderaL); R.pset(x, y, c); }
  R.linea(0, 136, 319, 136, K.tierraS);
  // el asta de la bandera, las balas, los barriles de pólvora, el atacador y el cubo
  R.rect(22, 30, 24, 150, K.k); R.linea(23, 30, 23, 150, K.maderaL); R.rect(18, 146, 28, 152, K.k); R.rect(19, 147, 27, 151, K.maderaS);
  for (const [x, y] of [[246, 160], [252, 160], [258, 160], [264, 160], [249, 155], [255, 155], [261, 155], [252, 150], [258, 150], [255, 145]]) { R.disco(x, y, 3, K.k); R.disco(x, y, 2, K.hierro); R.pset(x - 1, y - 1, K.hierroL); }
  for (const x of [280, 298]) { R.rect(x - 1, 140, x + 13, 164, K.k); for (let y = 141; y < 164; y++) for (let i = 0; i < 13; i++) R.pset(x + i, y, y === 146 || y === 158 ? K.hierro : i < 3 ? K.maderaL : i > 9 ? K.maderaS : K.madera); }
  R.linea(110, 128, 132, 170, K.k); R.linea(111, 128, 133, 170, K.maderaL); R.rect(106, 124, 114, 129, K.k); R.rect(107, 125, 113, 128, hex('#3a2a20'));
  R.rect(56, 162, 68, 174, K.k); R.rect(57, 163, 67, 173, K.madera); R.linea(57, 166, 67, 166, K.hierro); R.linea(58, 160, 66, 160, K.hierro); R.pset(57, 161, K.hierro); R.pset(67, 161, K.hierro);
});
// el cañón de bronce en su cureña, apuntando por la tronera
const canon = (t) => { R.poligono([[160, 128], [210, 115], [212, 121], [162, 136]], K.k); for (let i = 0; i < 50; i++) { const x = 162 + i, y0 = Math.round(129 - i * 0.26); for (let j = 0; j < 6 - Math.floor(i / 20); j++) R.pset(x, y0 + j, j === 0 ? K.oroL : j < 2 ? K.oro : K.oroS); } R.disco(161, 132, 4, K.k); R.disco(161, 132, 3, K.oroS); R.disco(212, 118, 2, K.k);
  R.rect(158, 132, 194, 142, K.k); R.rect(159, 133, 193, 141, K.madera); R.linea(159, 133, 193, 133, K.maderaL); for (const x of [166, 188]) { R.disco(x, 144, 6, K.k); R.disco(x, 144, 5, K.maderaS); for (let a = 0; a < 6; a++) R.linea(x, 144, Math.round(x + Math.cos(a + t * 0) * 4), Math.round(144 + Math.sin(a) * 4), K.madera); R.disco(x, 144, 1, K.hierro); } };
const p2 = (t) => {
  fondoBastion();
  nubes(t, [[30, 28, 36, 1.5], [150, 22, 44, 2.4], [220, 48, 26, 3.4]]);
  gaviotas(t, [[100, 50, 9, 1], [200, 60, 11, 3]]);
  vetas(t, 0, 76, 319, 122, 40, 6, 4);
  nave(150, 98, 0.3, t, { portas: 1, recogidas: true, dir: -1 }); nave(300, 92, 0.24, t, { portas: 1, recogidas: true, dir: -1 }); nave(236, 110, 0.44, t, { portas: 1, recogidas: true, dir: -1 });
  parapeto();
  banderaTela(25, 31, t, 'holandesa', 18, 11);
  canon(t);
  // el artillero trae una bala y la deja junto al cañón en «wants to fight»
  const au = tramo(t, PETER - 0.4, FIGHT), ax = Math.round(lerp(238, 204, au)), lleva = t < FIGHT + 0.1;
  const am = R.actor(colono2, ax, 166, t, { dir: -1, anda: au > 0 && au < 1, sostiene: lleva, sorpresa: t > FIGHT + 0.2 && t < FIGHT + 0.9, tocado: 'boina' }).mano;
  if (lleva) { R.disco(am[0] - 1, am[1] + 2, 3, K.k); R.disco(am[0] - 1, am[1] + 2, 2, K.hierro); R.pset(am[0] - 2, am[1] + 1, K.hierroL); } else { R.disco(198, 163, 3, K.k); R.disco(198, 163, 2, K.hierro); R.pset(197, 162, K.hierroL); }
  // Stuyvesant: mira con el catalejo, lo baja y señala los barcos, enfadado
  const mira = t < PETER + 0.3, señala = t > WANTS - 0.1;
  const sm = R.actor(stuy, 74, 162, t, { dir: 1, sostiene: !señala ? (mira ? [96, 140] : true) : false, dedo: señala, enfado: t > WANTS - 0.1, habla: señala && t < FIGHT + 0.6 && Math.sin(t * 9) > 0, sorpresa: t > GOVERNOR - 0.2 && t < GOVERNOR + 0.4 }).mano;
  if (!señala) { const [hx, hy] = sm; if (mira) { R.linea(hx - 6, hy - 3, hx + 9, hy - 5, K.k); R.linea(hx - 6, hy - 2, hx + 9, hy - 4, K.k); R.linea(hx - 5, hy - 3, hx + 8, hy - 4, K.oro); R.pset(hx + 2, hy - 4, K.oroS); R.pset(hx - 2, hy - 3, K.oroS); R.pset(hx + 9, hy - 5, K.oroL); if (t > GOVERNOR && t < GOVERNOR + 0.4) destello(hx + 10, hy - 6, (t - GOVERNOR) / 0.4); }
    else { R.linea(hx, hy - 6, hx, hy + 4, K.k); R.linea(hx + 1, hy - 6, hx + 1, hy + 4, K.oro); } }
  // un soldado holandés con la pica, que se vuelve al oír la orden
  R.actor(EL.colono, 128, 166, t, { dir: t > FIGHT - 0.2 ? -1 : 1, sorpresa: t > FIGHT - 0.2 && t < FIGHT + 0.6, sostiene: true, tocado: 'boina' });
  R.linea(141, 150, 141, 120, K.k); R.linea(142, 150, 142, 120, K.maderaL); R.poligono([[140, 120], [142, 112], [144, 120]], K.hierroL);
};

// 3 · (fondo local) la casa del gobernador: la petición y la bandera blanca
const fondoCasa = () => fijo('casaGob', () => {
  cieloFijo(0, 96);
  // la muralla de tierra del fuerte, al fondo a la derecha
  for (let x = 148; x < 320; x++) { const yt = 82 + Math.round(Math.sin(x * 0.05) * 1.5); for (let y = yt; y <= 112; y++) R.pset(x, y, y === yt ? K.k : y < yt + 3 ? K.hierbaL : H(x >> 1, y, 2) < 0.5 ? K.hierba : K.hierbaS); }
  for (let x = 152; x < 320; x += 12) { R.rect(x, 76, x + 8, 83, K.k); for (let y = 77; y < 83; y++) for (let i = 1; i < 8; i++) R.pset(x + i, y, (y + i) % 3 ? K.seca : K.secaS); }
  // la casa del gobernador: ladrillo, gablete escalonado, «1658» en anclas de hierro, la puerta holandesa
  casaHol(34, 152, 146, 72, 22, { k: 3, pasos: 6 });
  R.numero('1658', 72, 66, { fina: true, color: K.hierro, sombra: false });
  for (const [x, y] of [[44, 82], [70, 82], [108, 82], [132, 82], [44, 110], [70, 110], [116, 110], [134, 110]]) ventana(x, y, 9, 12, { contra: K.verde });
  ventana(88, 52, 7, 8, {}); ventana(100, 52, 7, 8, {});
  R.rect(85, 118, 105, 146, K.k); R.rect(86, 119, 104, 145, K.verdeS); R.rect(86, 119, 104, 121, K.piedraL); R.linea(86, 132, 104, 132, K.k); for (let x = 89; x < 104; x += 4) R.linea(x, 122, x, 145, K.verde); R.pset(101, 136, K.oro); R.rect(88, 114, 102, 117, K.k); R.rect(89, 115, 101, 116, K.luz);
  // la escalinata (stoep) con sus bancos
  for (let k = 0; k < 4; k++) { const y0 = 146 + k * 6, x0 = 80 - k * 3, x1 = 110 + k * 3; R.rect(x0 - 1, y0, x1 + 1, y0 + 6, K.k); R.rect(x0, y0 + 1, x1, y0 + 5, K.piedra); R.linea(x0, y0 + 1, x1, y0 + 1, K.piedraL); for (let x = x0 + 5; x < x1; x += 9) R.pset(x, y0 + 3, K.piedraS); }
  for (const x of [60, 116]) { R.rect(x, 138, x + 14, 141, K.k); R.rect(x + 1, 139, x + 13, 140, K.maderaL); R.rect(x + 1, 142, x + 2, 146, K.maderaS); R.rect(x + 12, 142, x + 13, 146, K.maderaS); }
  // la casa de la derecha (tejado de tejas) y el empedrado
  R.rect(212, 70, 314, 146, K.k); ladrillos(213, 96, 313, 146, 8, K.piedraL, K.piedra, K.blanco, K.piedraS); R.poligono([[208, 97], [263, 58], [318, 97]], K.k); R.poligono([[212, 96], [263, 61], [314, 96]], K.teja);
  for (let y = 66; y < 96; y += 4) R.linea(263 - (y - 60) * 1.38, y, 263 + (y - 60) * 1.38, y, K.tejaS); R.rect(282, 62, 290, 76, K.k); R.rect(283, 63, 289, 76, K.ladrillo);
  for (const x of [222, 246, 290]) ventana(x, 106, 10, 13, { contra: K.rojoS }); R.rect(266, 118, 280, 146, K.k); R.rect(267, 119, 279, 145, K.maderaS); for (let y = 122; y < 145; y += 4) R.linea(267, y, 279, y, K.madera);
  R.rect(0, 70, 33, 146, K.k); ladrillos(0, 92, 32, 146, 9); R.poligono([[0, 92], [0, 66], [30, 92]], K.tejaS); ventana(8, 106, 9, 12, { contra: K.verde });
  adoquines(0, 147, 319, 179, 2, K.piedra, K.piedraS, K.piedraL);
  // la bomba de agua, el barril y la carretilla
  R.rect(184, 128, 190, 166, K.k); R.rect(185, 129, 189, 165, K.verdeS); R.linea(185, 129, 185, 165, K.verdeL); R.linea(190, 134, 198, 130, K.k); R.rect(178, 162, 196, 168, K.k); R.rect(179, 163, 195, 167, K.piedraS);
  R.rect(298, 150, 312, 170, K.k); for (let y = 151; y < 170; y++) for (let i = 0; i < 13; i++) R.pset(299 + i, y, y === 156 || y === 164 ? K.hierro : i < 3 ? K.maderaL : K.madera);
});
const peticion = (x, y, larga) => { const h = larga ? 16 : 10; R.rect(x - 5, y - 1, x + 5, y + h, K.k); R.rect(x - 4, y, x + 4, y + h - 1, K.papel); R.rect(x - 5, y - 2, x + 5, y - 1, K.papelS);
  for (let j = 2; j < h - 1; j += 2) R.linea(x - 3, y + j, x - 3 + 2 + Math.round(H(j, x) * 4), y + j, K.tinta); R.disco(x + 2, y + h - 3, 1, K.rojo); R.pset(x + 2, y + h - 1, K.rojoS); };
const p3 = (t) => {
  fondoCasa();
  nubes(t, [[20, 30, 34, 1.3], [150, 26, 40, 2.1], [228, 50, 24, 3.1]]);
  gaviotas(t, [[40, 40, 8, 1]]);
  // el asta del fuerte: baja la holandesa y sube la blanca, sin un disparo
  R.rect(190, 26, 191, 84, K.k); R.pset(190, 24, K.oro); R.pset(191, 24, K.oro);
  const baja = tramo(t, GIVES, WITHOUT + 0.35), sube = tramo(t, WITHOUT + 0.4, SHOT + 0.7);
  if (sube <= 0) banderaTela(192, Math.round(27 + baja * 48), t, 'holandesa', 18, 11); else banderaTela(192, Math.round(75 - sube * 48), t, 'blanca', 18, 11);
  R.linea(193, 26, 193, 84, hex('#d8d0c0'));
  // la gallina del patio
  const gx = Math.round(240 + Math.sin(t * 0.7) * 16), gp = Math.sin(t * 5) > 0.6 ? 1 : 0; R.rect(gx - 1, 166 + gp, gx + 6, 172, K.k); R.rect(gx, 167 + gp, gx + 5, 171, K.blanco); R.rect(gx + 5, 165 + gp, gx + 7, 167 + gp, K.k); R.pset(gx + 6, 166 + gp, K.blanco); R.pset(gx + 8, 167 + gp, K.oro); R.pset(gx + 6, 164 + gp, K.rojo);
  // Stuyvesant en lo alto de la escalinata: quiere luchar; en «He gives up» coge la petición y baja la cabeza
  const tiene = t > GIVES - 0.25, rinde = t > GIVES;
  const sm = R.actor(stuy, 88, 146, t, { dir: 1, enfado: !rinde, dedo: !tiene && t < BEG, habla: t < BEG && Math.sin(t * 8) > 0, triste: rinde && t < SHOT + 0.8, sostiene: tiene }).mano;
  if (tiene) peticion(sm[0] + 2, sm[1] - 2, true);
  // el vecino sube los escalones con la petición y vuelve a bajar
  const su = tramo(t, SURR - 0.4, GIVES - 0.3), bj = tramo(t, GIVES + 0.2, WITHOUT + 1.2), k = su - bj;
  const vx = Math.round(lerp(128, 108, k)), vs = Math.round(lerp(174, 158, k));
  const vm = R.actor(EL.colono, vx, vs, t, { dir: -1, anda: (su > 0 && su < 1) || (bj > 0 && bj < 1), sostiene: !tiene ? [vx - 3, vs - 20] : false, triste: t < GIVES, sonrisa: t > SHOT + 0.6, brazos: t > SHOT + 0.8 && t < SHOT + 1.6 }).mano;
  if (!tiene) peticion(vm[0] - 2, vm[1] - 4, true);
  // los vecinos al pie: ruegan con los brazos y luego respiran
  const ruega = t > BEG - 0.1 && t < GIVES;
  R.actor(EL.colona, 148, 176, t, { dir: -1, brazos: ruega && Math.floor(t * 3) % 2 === 0, triste: t < SHOT + 0.4, sonrisa: t > SHOT + 0.4 });
  R.actor(colona2, 170, 176, t, { dir: -1, habla: ruega && Math.sin(t * 8) > 0, triste: t < SHOT + 0.4, sonrisa: t > SHOT + 0.4, dedo: t > SHOT && t < SHOT + 1.2 });
  R.actor(colono2, 192, 177, t, { dir: -1, brazos: ruega && Math.floor(t * 3 + 1) % 2 === 0, triste: t < SHOT + 0.4, sonrisa: t > SHOT + 0.6 });
  R.actor(EL.vecina ?? EL.colona, 214, 178, t, { dir: -1, sorpresa: t > WITHOUT && t < SHOT + 0.5, pal: { C: hex('#3a5a6a'), c: hex('#2a4250') } });
};

// 4 · el fuerte (nuevaAmsterdam 'fuerte'): llegan los ingleses; cambia la bandera y el letrero
const letrero = (t, giro) => { const x0 = 274, y0 = 140; R.rect(285, 140, 286, 176, K.k); R.linea(285, 141, 285, 176, K.maderaL);
  const w = Math.max(1, Math.round(11 * Math.abs(Math.cos(giro * Math.PI)))), ing = giro > 0.5;
  R.rect(285 - w - 1, y0 - 1, 286 + w, y0 + 12, K.k);
  for (let j = 0; j < 12; j++) for (let i = -w; i <= w; i++) { let c; if (ing) c = Math.abs(j - 5.5) < 1.5 || Math.abs(i) < 1.5 ? K.rojo : K.blanco; else c = j < 4 ? K.naranja : j < 8 ? K.blanco : K.azulB; R.pset(285 + i, y0 + j, c); } };
const p4 = (t) => {
  const cu = tramo(t, RENAMED - 0.1, YORK1 + 0.3);
  T.nuevaAmsterdam(R, t, { encuadre: 'fuerte', bandera: 'blanca', cambio: cu, nueva: 'inglesa', ingleses: 1 });
  // el letrero del cuartel: en «New York» el soldado le da la vuelta
  const gi = tramo(t, NEWYORK - 0.05, NEWYORK + 0.45);
  letrero(t, gi);
  // los holandeses miran: Stuyvesant, serio, delante de su casa; una vecina junto al pozo
  const quita = t > DUKE - 0.2 && t < KINGS;
  R.actor(stuy, 52, 162, t, { dir: 1, triste: t < DUKE, sonrisa: false, sorpresa: false });
  R.actor(EL.colona, 118, 164, t, { dir: 1, triste: true, dedo: t > NEWYORK + 0.3 });
  // el oficial inglés entra y se quita el sombrero ante Stuyvesant
  const ou = tramo(t, P4, P4 + 2.4), ox = Math.round(lerp(330, 150, ou));
  R.actor(EL.ingles, ox, 164, t, { dir: -1, anda: ou > 0 && ou < 1, tocado: quita ? false : undefined, habla: t > DUKE && t < KINGS && Math.sin(t * 8) > 0 });
  if (quita) { const sx = ox - 3, sy = 146; R.rect(sx - 4, sy - 1, sx + 4, sy + 2, K.k); R.rect(sx - 3, sy, sx + 3, sy + 1, hex('#2a2430')); }
  // un casaca roja iza la bandera tirando de la driza
  const ru = tramo(t, P4 + 0.3, RENAMED - 0.2), rx = Math.round(lerp(350, 198, ru)), iza = cu > 0 && cu < 1;
  R.actor(EL.casacaRoja, rx, 162, t, { dir: 1, anda: ru > 0 && ru < 1, sostiene: iza ? [214, Math.round(130 + Math.sin(t * 7) * 4)] : false, sonrisa: cu >= 1 });
  // el otro soldado va al letrero y le da la vuelta en «New York»
  const su = tramo(t, KINGS - 1.2, NEWYORK - 0.15), sx2 = Math.round(lerp(352, 292, su));
  R.actor(roja2, sx2, 170, t, { dir: -1, anda: su > 0 && su < 1, sostiene: gi > 0 && gi < 1 ? [288, 146] : false, sonrisa: gi >= 1 });
};

const año = 1664;
const efectos = [[1.6, 'ola'], [SEA + 0.7, 'chof'], [WARSHIPS + 0.2, 'cerrojo'], [GOVERNOR + 0.1, 'brillo'], [FIGHT + 0.15, 'golpecito'],
  [BEG, 'papel'], [GIVES - 0.2, 'papel'], [WITHOUT + 0.5, 'viento'], [P4 + 0.5, 'toc'], [RENAMED + 0.2, 'viento'], [DUKE, 'brillo'], [NEWYORK + 0.2, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1664', efectos, año });
''')

E['ny-timbre'] = ('La Ley del Timbre', '''// NY-TIMBRE (frases 16–17), 1765, cartela «1765». Cinco planos:
// 1. (colonial 'wallStreet', 1765) el puerto británico, bullicioso: un estibador rueda un barril, un carro cruza al
//    fondo, la vendedora pregona, el perro ladra en «noisy» y un casaca roja pasa en «British»;
// 2. (fondo local) la mesa de una imprenta: el periódico con «1765», un contrato con lacre y una baraja; en «tax» una
//    mano con manga roja estampa el sello de la corona en el periódico y en «paper» en el contrato; detrás, la prensa y
//    los pliegos que se secan; un ratón asoma;
// 3. (colonial 'taberna') el gag de los naipes: un jugador levanta un castillo de naipes; el lector del periódico lo
//    baja enfadado en «newspapers»; el recaudador señala en «contracts»; en «even playing cards» el jugador pega un sello
//    en cada carta y el castillo se le viene abajo;
// 4. (colonial 'salon' 'congreso') «That October»: entran los delegados y se ponen tras la mesa; en «nine» se cuentan
//    (sale un 9); en «City Hall» el presidente da un golpe; en «protest» uno se levanta, otros alzan los brazos y uno firma;
// 5. (fondo local) una calle de noche: los Hijos de la Libertad desfilan con faroles y una pancarta con el sello tachado;
//    en «Sons of Liberty» alzan los brazos; en «against the British» el jefe clava el cartel en el poste y un casaca roja
//    se da la vuelta; los vecinos se asoman a las ventanas.''', AYUDA + r'''
const i = (f) => en('impuesto', f), c = (f) => en('congreso', f);
const P2 = i(0.343), P3 = i(0.707), P4 = c(0), P5 = c(0.5);
const BUSY = i(0.158), NOISY = i(0.232), BRITISH = i(0.262), Y1765 = i(0.376), LONDON = i(0.518), TAX = i(0.582), PAPER = i(0.656), NEWS = i(0.752), CONTRACTS = i(0.799), EVEN = i(0.898), CARDS = i(0.938);
const DELEG = c(0.109), NINE = c(0.173), MEET = c(0.251), HALL = c(0.371), PROTEST = c(0.414), SONS = c(0.739), CAMPAIGNS = c(0.823), AGAINST = c(0.886), BRIT2 = c(0.95);
const lib3 = { ...EL.libertad, pal: { ...EL.libertad.pal, C: hex('#4a4a5a'), c: hex('#34343f'), H: hex('#1c1424'), h: hex('#3a3046') } };
const lib4 = { ...EL.libertad2, pal: { ...EL.libertad2.pal, C: hex('#7a3a2a'), c: hex('#5a2a1e'), H: hex('#5a3418'), h: hex('#8a5428') } };
const del3 = { ...EL.delegado2, pal: { ...EL.delegado2.pal, C: hex('#2a4a3a'), c: hex('#d8ccaa') } };
const del4 = { ...EL.delegado, pal: { ...EL.delegado.pal, C: hex('#6a2a3a'), c: hex('#e8dcc0') } };
const del5 = { ...EL.delegado2, pal: { ...EL.delegado2.pal, C: hex('#3a3a4a'), c: hex('#c8b890') } };
// el sello del impuesto: un círculo rojo con la corona (s escala)
const marcaSello = (x, y, a = 1) => { if (a <= 0) return; R.anillo(x, y, 8, K.rojo); R.anillo(x, y, 7, K.rojoL); R.anillo(x, y, 6, K.rojo); R.icono('corona', x - 5, y - 4, K.rojo, K.rojoL, 2); for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; R.pset(Math.round(x + Math.cos(an) * 10), Math.round(y + Math.sin(an) * 10), K.rojoS); } };

// 1 · Wall Street en 1765: el puerto bullicioso
const barril = (x, y, t, rueda) => { R.disco(x, y - 6, 7, K.k); R.disco(x, y - 6, 6, K.madera); const a = rueda ? t * 6 : 0; for (let k = 0; k < 3; k++) { const an = a + k * Math.PI / 3; R.linea(Math.round(x - Math.cos(an) * 5), Math.round(y - 6 - Math.sin(an) * 5), Math.round(x + Math.cos(an) * 5), Math.round(y - 6 + Math.sin(an) * 5), k ? K.maderaS : K.hierro); } R.disco(x, y - 6, 2, K.maderaL); };
const perro = (x, y, t, ladra) => { const b = ladra && Math.sin(t * 14) > 0 ? 1 : 0; R.rect(x - 1, y - 7, x + 10, y - 2, K.k); R.rect(x, y - 6, x + 9, y - 3, K.tierraL); R.rect(x + 8, y - 10, x + 14, y - 5 + b, K.k); R.rect(x + 9, y - 9, x + 13, y - 6, K.tierraL); R.pset(x + 12, y - 8, K.k); R.pset(x + 9, y - 10, K.tierraS); R.rect(x + 13, y - 6, x + 14, y - 5 + b, K.k);
  R.linea(x - 1, y - 6, x - 3, y - 9 + Math.round(Math.sin(t * 12)), K.k); for (const lx of [x + 1, x + 3, x + 7, x + 9]) R.linea(lx, y - 2, lx, y, K.k); if (ladra && b) { R.pset(x + 16, y - 9, K.blanco); R.pset(x + 17, y - 11, K.blanco); R.pset(x + 17, y - 7, K.blanco); } };
const p1 = (t) => {
  T.colonial(R, t, { encuadre: 'wallStreet', anyo: 1765, carro: true });
  T.colonialDelante(R, t, { encuadre: 'wallStreet', anyo: 1765 });
  // la vendedora de ostras pregona con su cesta
  const vm = R.actor(EL.colona, 238, 166, t, { dir: -1, habla: Math.sin(t * 6) > 0.1 && t < BRITISH, sostiene: true, sonrisa: t > BRITISH + 0.4, pal: { C: hex('#7a5a3a'), c: hex('#5a4028') } }).mano;
  R.rect(vm[0] - 6, vm[1] - 1, vm[0] + 3, vm[1] + 4, K.k); R.rect(vm[0] - 5, vm[1], vm[0] + 2, vm[1] + 3, K.seca); for (let k = 0; k < 3; k++) R.pset(vm[0] - 4 + k * 2, vm[1] - 1, K.piedraL);
  // el estibador rueda el barril por la calle
  const eu = tramo(t, 1.3, NOISY + 0.4), ex = Math.round(lerp(6, 150, eu));
  R.actor(EL.estibador, ex, 172, t, { dir: 1, anda: eu > 0 && eu < 1, sostiene: [ex + 20, 166], sonrisa: eu >= 1, tocado: 'tricornio' });
  barril(ex + 26, 174, t, eu > 0 && eu < 1);
  // el perro ladra al barril en «noisy»
  perro(196, 174, t, t > NOISY - 0.15 && t < NOISY + 0.9);
  // un caballero con su peluca y el casaca roja que patrulla en «British»
  R.actor(EL.delegado2, 92, 162, t, { dir: 1, habla: t > BUSY && t < NOISY && Math.sin(t * 8) > 0, sorpresa: t > NOISY && t < NOISY + 0.5 });
  const ru = tramo(t, BRITISH - 1.0, P2 + 0.3), rx = Math.round(lerp(334, 262, ru));
  R.actor(EL.casacaRoja, rx, 176, t, { dir: -1, anda: ru > 0 && ru < 1 });
};

// 2 · (fondo local) la mesa de la imprenta: el sello cae en «tax» y en «paper»
const fondoImprenta = () => fijo('imprenta', () => {
  // la pared de tablas con la ventana y la luz
  for (let y = 0; y < 74; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(x / 14); let c = (x % 14 === 0) ? K.maderaSS : H(tabla, Math.floor(y / 5), 3) < 0.3 ? K.maderaS : K.madera; if ((y * 3 + x) % 37 === 0) c = K.maderaS; R.pset(x, y, c); }
  R.rect(12, 10, 60, 56, K.k); for (let y = 11; y < 56; y++) for (let x = 13; x < 60; x++) R.pset(x, y, grad(x, y, K.cielo, (y - 11) / 45 * 0.7 + 0.3)); for (let x = 13; x < 60; x += 8) R.linea(x, 11, x, 55, K.maderaS); R.linea(13, 33, 59, 33, K.maderaS);
  for (let x = 13; x < 60; x++) { const yh = 46 + Math.round(Math.sin(x * 0.2) * 2); for (let y = yh; y < 56; y++) R.pset(x, y, y === yh ? K.ladrilloL : K.ladrillo); }
  // la caja de tipos (estante con casillas)
  R.rect(74, 14, 136, 54, K.k); for (let y = 15; y < 54; y++) for (let x = 75; x < 136; x++) R.pset(x, y, (x - 75) % 7 === 0 || (y - 15) % 6 === 0 ? K.maderaS : H(x >> 1, y >> 1, 5) < 0.4 ? K.hierroL : K.maderaSS);
  // la prensa de madera
  R.rect(198, 4, 206, 74, K.k); R.rect(244, 4, 252, 74, K.k); R.rect(199, 5, 205, 74, K.madera); R.rect(245, 5, 251, 74, K.madera); R.linea(199, 5, 199, 74, K.maderaL); R.linea(245, 5, 245, 74, K.maderaL);
  R.rect(196, 14, 254, 22, K.k); R.rect(197, 15, 253, 21, K.maderaL); R.rect(196, 40, 254, 46, K.k); R.rect(197, 41, 253, 45, K.madera); R.rect(222, 22, 228, 40, K.k); R.rect(223, 23, 227, 39, K.hierroL);
  R.rect(206, 52, 244, 60, K.k); R.rect(207, 53, 243, 59, K.hierro); R.linea(228, 30, 268, 26, K.k); R.disco(268, 26, 2, K.k);
  // el canto de la mesa de roble (desde y 74) con sus vetas
  for (let y = 74; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.11) * 2 + y * 0.02); let c = v > 0.75 ? K.maderaL : v < -0.7 ? K.maderaS : K.madera; if (y < 77) c = y === 74 ? K.k : K.maderaL; R.pset(x, y, c); }
  // el periódico (con la cabecera y el «1765»), el contrato con lacre y la baraja
  R.rect(28, 100, 132, 168, K.k); R.rect(29, 101, 131, 167, K.papel); R.linea(29, 101, 131, 101, K.papelL); R.rect(32, 104, 128, 113, K.tinta); R.linea(32, 114, 128, 114, K.tinta);
  for (const col of [32, 66, 100]) for (let y = 118; y < 164; y += 3) R.linea(col, y, col + 26 - ((y * 7 + col) % 5), y, K.tintaL);
  R.rect(66, 120, 92, 140, K.k); R.rect(67, 121, 91, 139, K.papelS); R.poligono([[70, 135], [88, 135], [85, 138], [73, 138]], K.tinta); R.linea(79, 122, 79, 135, K.tinta); R.poligono([[80, 124], [87, 133], [80, 133]], K.papel); R.poligono([[78, 124], [72, 133], [78, 133]], K.papel);
  R.rect(150, 104, 218, 170, K.k); R.rect(151, 105, 217, 169, K.papelL); for (let y = 108; y < 156; y += 4) R.linea(156, y, 210 - ((y * 5) % 9), y, K.tintaL);
  for (let x = 170; x < 206; x++) R.pset(x, 162 + Math.round(Math.sin(x * 0.6) * 2), K.tinta); R.disco(162, 162, 4, K.rojoS); R.disco(162, 162, 3, K.rojo); R.pset(161, 161, K.rojoL);
  // la baraja abierta en abanico: el as de corazones delante
  for (let k = 0; k < 4; k++) { const x = 236 + k * 10, y = 124 - k * 2; R.rect(x - 1, y - 1, x + 22, y + 32, K.k); R.rect(x, y, x + 21, y + 31, K.blanco); R.linea(x, y + 31, x + 21, y + 31, K.papelS); R.pset(x + 3, y + 3, k % 2 ? K.k : K.rojo); }
  { const x = 266, y = 118; R.disco(x + 8, y + 13, 4, K.rojo); R.disco(x + 14, y + 13, 4, K.rojo); R.poligono([[x + 4, y + 14], [x + 18, y + 14], [x + 11, y + 23]], K.rojo); R.pset(x + 7, y + 11, K.rojoL); }
  // el tintero y la pluma, la vela, las gafas y las monedas
  R.rect(8, 132, 20, 146, K.k); R.rect(9, 133, 19, 145, K.hierro); R.rect(10, 133, 18, 135, K.hierroL); R.linea(16, 132, 26, 104, K.k); R.linea(17, 132, 27, 104, K.papelL); R.poligono([[22, 112], [30, 100], [28, 116]], K.papelL);
  R.rect(292, 96, 306, 100, K.k); R.rect(296, 76, 302, 96, K.k); R.rect(297, 77, 301, 95, K.papelL);
  R.anillo(170, 88, 4, K.hierro); R.anillo(181, 88, 4, K.hierro); R.linea(174, 88, 177, 88, K.hierro);
  for (const [x, y] of [[226, 96], [232, 92], [229, 99]]) { R.disco(x, y, 3, K.k); R.disco(x, y, 2, K.oro); R.pset(x - 1, y - 1, K.oroL); }
  R.numero('1765', 34, 111, { fina: true, color: K.papel, sombra: false });
});
const p2 = (t) => {
  fondoImprenta();
  // la luz de la ventana (motas que flotan) y los pliegos que se secan en la cuerda
  for (let k = 0; k < 10; k++) { const x = Math.round(20 + ((k * 31 + t * 5) % 90)), y = Math.round(60 + ((k * 17 + t * 3) % 30)); R.pset(x, y, K.papelL); }
  R.linea(64, 4, 190, 8, K.k);
  for (let k = 0; k < 5; k++) { const x = 70 + k * 24, y = 5 + Math.round(k * 0.14 * 4), sw = Math.round(Math.sin(t * 2 + k) * 2); R.poligono([[x, y], [x + 18, y + 1], [x + 18 + sw, y + 18], [x + sw, y + 17]], K.k); R.poligono([[x + 1, y + 1], [x + 17, y + 2], [x + 17 + sw, y + 17], [x + 1 + sw, y + 16]], K.papelL); for (let j = 4; j < 16; j += 3) R.linea(x + 3 + sw * j / 16, y + j, x + 14 + sw * j / 16, y + j, K.tintaL); R.rect(x + 7, y - 1, x + 9, y + 2, K.maderaL); }
  // la llama de la vela
  { const f = Math.sin(t * 13) > 0 ? 1 : 0; R.rect(299, 70 - f, 299, 75, K.k); R.disco(299, 71 - f, 2, K.luz); R.pset(299, 70 - f, K.luzL); R.pset(299, 68 - f, K.oro); }
  // el «1765» de la cabecera brilla cuando se dice
  if (t > Y1765 - 0.1 && t < Y1765 + 0.8) { destello(70, 105, (t - Y1765 + 0.1) / 0.9); R.numero('1765', 34, 111, { fina: true, color: K.oroL, sombra: false }); }
  // el ratón asoma junto al tintero
  const ra = Math.max(0, Math.sin(Math.max(0, t - P2 - 0.6) * 1.4)); if (t < LONDON + 0.2) { const rx = 22 + Math.round(ra * 6); R.rect(rx - 1, 140, rx + 6, 145, K.k); R.rect(rx, 141, rx + 5, 144, K.tintaL); R.pset(rx + 5, 141, K.k); R.pset(rx + 1, 139, K.tintaL); R.pset(rx + 6, 143, K.rojoL); }
  else if (t < LONDON + 0.6) { const rx = 24 - Math.round((t - LONDON - 0.2) * 40); R.rect(rx - 1, 140, rx + 6, 145, K.k); R.rect(rx, 141, rx + 5, 144, K.tintaL); }
  // las marcas del sello que ya han caído
  if (t > TAX + 0.04) marcaSello(104, 146); if (t > PAPER + 0.04) marcaSello(196, 134);
  // la mano del recaudador con el sello: entra por abajo, estampa en «tax» (periódico) y en «paper» (contrato)
  const golpe = (t0) => { const d = t - t0; return d > -0.18 && d < 0 ? (d + 0.18) / 0.18 : d >= 0 && d < 0.25 ? 1 - d / 0.25 * 0.0 - (d > 0.12 ? (d - 0.12) / 0.13 : 0) : 0; };
  const entra = tramo(t, LONDON - 0.2, LONDON + 0.4), sale = tramo(t, PAPER + 0.5, P3);
  const mueve = tramo(t, TAX + 0.25, PAPER - 0.25), tx = Math.round(lerp(104, 196, mueve)), ty0 = Math.round(lerp(146, 134, mueve));
  const g = Math.max(golpe(TAX), golpe(PAPER)), alt = Math.round(lerp(22, 0, g));
  const hy = Math.round(ty0 - 12 - alt + (1 - entra) * 90 + sale * 90), hx = tx;
  if (entra > 0 && sale < 1) {
    // el sello: base con la goma roja, el mango de madera que sale por arriba del puño
    R.rect(hx - 9, hy + 6, hx + 9, hy + 11, K.k); R.rect(hx - 8, hy + 7, hx + 8, hy + 9, K.maderaL); R.rect(hx - 8, hy + 10, hx + 8, hy + 10, K.rojo);
    R.rect(hx - 3, hy - 10, hx + 3, hy + 6, K.k); R.rect(hx - 2, hy - 9, hx + 2, hy + 6, K.madera); R.disco(hx, hy - 12, 4, K.k); R.disco(hx, hy - 12, 3, K.maderaL); R.pset(hx - 1, hy - 13, K.blanco);
    T.brazo(R, hx + 44, hy + 46, hx + 8, hy + 1, '#b8302a', -1, { codo: [hx + 30, hy + 20], puno: '#f2eee2' });
    if (g > 0.95) for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3; R.pset(Math.round(hx + Math.cos(an) * 13), Math.round(hy + 12 + Math.sin(an) * 4), K.blanco); }
  }
};

// 3 · la taberna: el gag de los naipes
// el castillo: 3 pisos; cada carta [x0, y0, x1, y1] (de abajo a arriba); las inclinadas van de a dos y las planas encima
const CARTAS = [];
for (let p = 0; p < 3; p++) { const n = 3 - p, x0 = 150 + p * 6, yb = 139 - p * 12;
  for (let k = 0; k < n; k++) { const xa = x0 + k * 12; CARTAS.push([xa, yb, xa + 5, yb - 10]); CARTAS.push([xa + 10, yb, xa + 5, yb - 10]); }
  if (p < 2) for (let k = 0; k < n - 1; k++) { const xa = x0 + 5 + k * 12; CARTAS.push([xa, yb - 11, xa + 12, yb - 11]); } }
const carta = (x0, y0, x1, y1, sello) => { const n = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0)));
  for (let i = 0; i <= n; i++) { const x = Math.round(x0 + (x1 - x0) * i / n), y = Math.round(y0 + (y1 - y0) * i / n); R.pset(x - 1, y, K.k); R.pset(x + 1, y, K.k); R.pset(x, y - 1, K.k); R.pset(x, y + 1, K.k); }
  for (let i = 0; i <= n; i++) { const x = Math.round(x0 + (x1 - x0) * i / n), y = Math.round(y0 + (y1 - y0) * i / n); R.pset(x, y, i === Math.round(n / 2) ? K.rojo : K.blanco); }
  if (sello) { const x = Math.round((x0 + x1) / 2), y = Math.round((y0 + y1) / 2) - 1; R.rect(x - 1, y - 1, x + 1, y + 1, K.rojoS); R.pset(x, y, K.rojoL); } };
const p3 = (t) => {
  T.colonial(R, t, { encuadre: 'taberna' });
  // el tabernero limpia una jarra detrás del mostrador
  const tm = R.actor(EL.libertad2, 262, 126, t, { dir: -1, sostiene: [256, Math.round(112 + Math.sin(t * 6) * 2)], sonrisa: t > CARDS + 0.8 }).mano;
  R.rect(tm[0] - 3, tm[1] - 4, tm[0] + 1, tm[1] + 2, K.k); R.rect(tm[0] - 2, tm[1] - 3, tm[0], tm[1] + 1, K.hierroL);
  // el jugador, detrás de la mesa: levanta el castillo, pega los sellos y se le cae
  const nVisibles = Math.min(CARTAS.length, 9 + Math.floor(tramo(t, P3, EVEN - 0.2) * (CARTAS.length - 9) + 0.001)), sellos = Math.floor(tramo(t, EVEN, CARDS + 0.25) * CARTAS.length + 0.001);
  const cae = tramo(t, CARDS + 0.3, CARDS + 0.85), tiembla = t > CARDS && t < CARDS + 0.3;
  const objetivo = cae > 0 ? null : CARTAS[Math.min(CARTAS.length - 1, sellos > 0 ? sellos - 1 : nVisibles - 1)];
  R.actor(lib4, 126, 140, t, { dir: 1, sostiene: objetivo ? [Math.min(146, Math.round((objetivo[0] + objetivo[2]) / 2)), Math.round((objetivo[1] + objetivo[3]) / 2)] : false, sorpresa: cae > 0 && cae < 1, triste: cae >= 1, sonrisa: cae <= 0 && t < EVEN });
  T.colonialDelante(R, t, { encuadre: 'taberna' });
  // las cartas (encima del tablero)
  CARTAS.forEach(([x0, y0, x1, y1], k) => { if (k >= nVisibles) return; const s = k < sellos;
    if (cae <= 0) { const j = tiembla ? Math.round(Math.sin(t * 40 + k) * (k / CARTAS.length) * 1.5) : 0; carta(x0 + j, y0, x1 + j, y1, s); return; }
    const fx = 116 + Math.round(H(k, 2) * 96), fuera = H(k, 3) < 0.3, fy = fuera ? 160 + Math.round(H(k, 4) * 14) : 137 + Math.round(H(k, 5) * 3), ang = (H(k, 6) - 0.5) * 0.5;
    const u = Math.max(0, Math.min(1, cae * 1.2 - H(k, 7) * 0.2)), arco = Math.sin(u * Math.PI) * 10;
    const cx = lerp((x0 + x1) / 2, fx, u), cy = lerp((y0 + y1) / 2, fy, u) - arco, a = lerp(Math.atan2(y1 - y0, x1 - x0), ang, u);
    carta(Math.round(cx - Math.cos(a) * 5), Math.round(cy - Math.sin(a) * 5), Math.round(cx + Math.cos(a) * 5), Math.round(cy + Math.sin(a) * 5), s); });
  // el lector del periódico, delante a la izquierda: baja el periódico sellado en «newspapers»
  const baja = t > NEWS - 0.1 && t < CONTRACTS + 0.8;
  const lm = R.actor(EL.delegado2, 44, 174, t, { dir: 1, sostiene: baja ? [62, 158] : [60, 150], enfado: baja, habla: baja && Math.sin(t * 8) > 0, sonrisa: cae >= 1 }).mano;
  R.rect(lm[0] - 1, lm[1] - 12, lm[0] + 13, lm[1] + 4, K.k); R.rect(lm[0], lm[1] - 11, lm[0] + 12, lm[1] + 3, K.papel); for (let y = lm[1] - 8; y < lm[1] + 3; y += 2) R.linea(lm[0] + 1, y, lm[0] + 6, y, K.tintaL); R.rect(lm[0] + 1, lm[1] - 11, lm[0] + 11, lm[1] - 10, K.tinta);
  R.disco(lm[0] + 9, lm[1] - 3, 2, K.rojo); R.pset(lm[0] + 9, lm[1] - 3, K.rojoL);
  // el recaudador con el pliego de sellos: señala en «contracts» y se encoge de hombros cuando se cae el castillo
  const rm = R.actor(EL.ingles, 236, 174, t, { dir: -1, sostiene: t < CARDS + 0.9 ? true : false, dedo: t > CONTRACTS - 0.1 && t < EVEN - 0.1, brazos: t > CARDS + 0.95 && t < CARDS + 1.8, habla: t > CONTRACTS - 0.1 && t < EVEN && Math.sin(t * 8) > 0, sorpresa: cae > 0 && cae < 1 }).mano;
  if (t < CARDS + 0.9) { R.rect(rm[0] - 9, rm[1] - 5, rm[0] + 1, rm[1] + 4, K.k); R.rect(rm[0] - 8, rm[1] - 4, rm[0], rm[1] + 3, K.papelL); for (let y = rm[1] - 3; y < rm[1] + 3; y += 2) for (let x = rm[0] - 7; x < rm[0]; x += 2) R.pset(x, y, K.rojo); }
};

// 4 · el ayuntamiento: el congreso de los nueve
const XD = [76, 94, 112, 130, 148, 166, 184, 202, 220];
const DEFS = [EL.delegado2, del3, EL.delegado, del4, del5, EL.delegado2, del3, del4, EL.delegado];
const p4 = (t) => {
  T.colonial(R, t, { encuadre: 'salon', sala: 'congreso' });
  // el presidente en el estrado: levanta el dedo en «meet» y da el golpe de mazo en «City Hall»
  const golpe = t > HALL - 0.1 && t < HALL + 0.2;
  const pm = R.actor(EL.delegado, 153, 128, t, { dir: 1, dedo: t > MEET - 0.1 && t < HALL - 0.2, sostiene: !(t > MEET - 0.1 && t < HALL - 0.2) ? [170, golpe ? 122 : 114] : false, habla: t > MEET && t < HALL && Math.sin(t * 8) > 0, tocado: false });
  if (!(t > MEET - 0.1 && t < HALL - 0.2)) { R.linea(pm[0], pm[1], pm[0] + 2, pm[1] - 6, K.maderaS); R.rect(pm[0], pm[1] - 9, pm[0] + 5, pm[1] - 6, K.k); R.rect(pm[0] + 1, pm[1] - 8, pm[0] + 4, pm[1] - 7, K.madera); }
  // el escribano en su pupitre
  const em = R.actor(del5, 30, 146, t, { dir: 1, sostiene: [50, 132 + Math.round(Math.sin(t * 9))] }).mano; R.linea(em[0], em[1], em[0] + 4, em[1] - 7, K.blanco); R.pset(em[0] + 4, em[1] - 7, K.papelS);
  // los nueve delegados entran por los dos lados y se ponen tras la mesa; en «nine» se cuentan
  const firma = t > PROTEST && t < P5;
  XD.forEach((xf, k) => { const izq = k < 4, a = P4 + 0.1 + (izq ? (3 - k) : (k - 4)) * 0.22, u = tramo(t, a, a + 1.5), x = Math.round(lerp(izq ? -20 : 340, xf, u));
    const cuenta = t > NINE + k * 0.08 && t < NINE + k * 0.08 + 0.14, pro = t > PROTEST - 0.1;
    const o = { dir: u < 1 ? (izq ? 1 : -1) : (k < 4 ? 1 : -1), anda: u > 0 && u < 1, salto: cuenta ? 2 : (k === 3 && pro && t < PROTEST + 1.4 ? 3 : 0), habla: t > MEET && t < PROTEST && Math.sin(t * 7 + k * 2) > 0.3 };
    if (pro) { if (k === 3) { o.enfado = true; o.dedo = true; o.habla = Math.sin(t * 9) > 0; } else if (k === 1 || k === 7) o.brazos = Math.floor(t * 3 + k) % 2 === 0; else if (k === 5) o.sostiene = firma ? [x + 4, 140] : false; else o.enfado = k % 2 === 0; }
    const r = R.actor(DEFS[k], x, 146, t, o); if (k === 5 && firma) DEFS.manoFirma = r.mano; });
  T.colonialDelante(R, t, { encuadre: 'salon', sala: 'congreso' });
  // la pluma del que firma, encima de la mesa
  if (firma && DEFS.manoFirma) { const [fx, fy] = DEFS.manoFirma, w = Math.round(Math.sin(t * 16) * 2); R.linea(fx + w, fy + 1, fx + 4 + w, fy - 7, K.blanco); R.linea(fx + 1 + w, fy, fx + 5 + w, fy - 6, K.papelS); R.pset(fx + w, fy + 2, K.k); }
  // el 9 que cuenta los delegados
  const nu = tramo(t, NINE - 0.05, NINE + 0.3) * (1 - tramo(t, HALL - 0.3, HALL + 0.2));
  if (nu > 0) { const y = Math.round(84 - nu * 6); R.numero('9', 160, y, { tam: 16, centro: true }); if (nu > 0.6) destello(176, y - 16, ((t - NINE) % 0.8) / 0.8); }
};

// 5 · (fondo local) la calle de noche: los Hijos de la Libertad
const fondoNoche = () => fijo('noche65', () => {
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) R.pset(x, y, grad(x, y, K.noche, y / 100));
  // tejados y chimeneas lejanos con mástiles del puerto
  for (let x = 0; x < 320; x++) { const h = 6 + Math.round(H(Math.floor(x / 14), 1) * 10); for (let y = 92 - h; y < 100; y++) R.pset(x, y, y === 92 - h ? K.noche[4] : K.noche[3]); }
  for (const x of [26, 70, 214]) { R.linea(x, 50, x, 84, K.noche[4]); R.linea(x - 5, 58, x + 5, 58, K.noche[4]); }
  // las casas georgianas: ladrillo, cornisa, ventanas de guillotina (algunas encendidas), puertas con montante
  const casa = (x0, x1, top, k) => { R.rect(x0 - 1, top - 1, x1 + 1, 140, K.k); ladrillos(x0, top, x1, 139, k, hex('#6a3a34'), hex('#4a2a28'), hex('#86504a'), hex('#5a4a4a'));
    R.rect(x0 - 2, top - 4, x1 + 2, top - 1, K.k); R.rect(x0 - 1, top - 3, x1 + 1, top - 2, hex('#8a8494')); for (let x = x0; x < x1; x += 3) R.pset(x, top - 1, hex('#5a5466'));
    R.rect(x0 + 4, top - 12, x0 + 9, top - 4, K.k); R.rect(x0 + 5, top - 11, x0 + 8, top - 4, hex('#5a3430'));
    for (let fy = top + 8; fy < 112; fy += 26) for (let fx = x0 + 6; fx < x1 - 10; fx += 17) { const lit = H(fx, fy, k) < 0.45; R.rect(fx - 1, fy - 1, fx + 9, fy + 15, K.k); for (let j = 0; j < 15; j++) for (let i2 = 0; i2 < 9; i2++) R.pset(fx + i2, fy + j, lit ? ((i2 + j) % 5 ? K.luz : K.luzL) : (i2 + j < 3 ? hex('#3a4a6a') : hex('#1a2238'))); R.linea(fx, fy + 7, fx + 8, fy + 7, hex('#d8d0c0')); R.linea(fx + 4, fy, fx + 4, fy + 14, hex('#d8d0c0')); R.linea(fx - 1, fy + 16, fx + 9, fy + 16, hex('#a8a0a0')); } };
  casa(-4, 96, 40, 1); casa(100, 196, 52, 2); casa(200, 330, 46, 3);
  for (const [dx] of [[40], [140], [262]]) { R.rect(dx - 1, 112, dx + 13, 140, K.k); R.rect(dx, 113, dx + 12, 139, hex('#1e2a3a')); R.disco(dx + 6, 113, 6, K.k); R.disco(dx + 6, 113, 5, K.luzS); R.rect(dx, 113, dx + 12, 116, K.k); R.rect(dx + 1, 114, dx + 11, 139, hex('#22303e')); R.pset(dx + 9, 126, K.oro); for (let k = 0; k < 3; k++) R.rect(dx - 3 - k, 140 + k * 2, dx + 15 + k, 141 + k * 2, k % 2 ? K.piedraS : K.piedra); }
  // el empedrado mojado con el reflejo de las ventanas
  adoquines(0, 146, 319, 179, 4, hex('#4a4a5a'), hex('#34343f'), hex('#6a6a7c'), K.k); R.rect(0, 140, 319, 145, K.k); R.rect(0, 141, 319, 144, hex('#5a5a6a'));
  // el poste de la libertad (a la derecha) y el farol de aceite de la esquina
  R.rect(244, 54, 247, 172, K.k); R.linea(245, 54, 245, 172, K.maderaL); R.linea(246, 54, 246, 172, K.madera); R.rect(240, 168, 251, 174, K.k); R.rect(241, 169, 250, 173, K.piedraS);
  R.rect(28, 96, 30, 168, K.k); R.rect(23, 86, 35, 98, K.k); R.rect(24, 87, 34, 97, K.luz);
});
const farol = (x, y, t, k = 0) => { const f = Math.sin(t * 9 + k * 3) > 0.3 ? 1 : 0; for (let j = -10; j <= 10; j++) for (let i2 = -10; i2 <= 10; i2++) { const d = Math.hypot(i2, j); if (d < 10 && um(x + i2, y + j) < (1 - d / 10) * 0.35) R.pset(x + i2, y + j, K.luzS); }
  R.rect(x - 3, y - 4, x + 3, y + 4, K.k); R.rect(x - 2, y - 3, x + 2, y + 3, f ? K.luzL : K.luz); R.linea(x - 2, y, x + 2, y, K.k); R.pset(x, y - 5, K.k); };
const pancarta = (x, y, t) => { const w = 34, h = 18, sw = Math.round(Math.sin(t * 3) * 1); R.rect(x - 1, y - 1, x + w + 1, y + h + 1, K.k);
  for (let j = 0; j < h; j++) for (let i2 = 0; i2 <= w; i2++) R.pset(x + i2, y + j + (i2 > w / 2 ? sw : 0) * 0, (i2 + j) % 9 === 0 ? K.papelS : K.papel);
  const cx = x + 17, cy = y + 9; R.anillo(cx, cy, 6, K.rojo); R.icono('corona', cx - 2, cy - 2, K.rojo, K.rojoL, 1); R.linea(cx - 8, cy - 7, cx + 8, cy + 7, K.k); R.linea(cx - 8, cy + 7, cx + 8, cy - 7, K.k); R.linea(cx - 7, cy - 7, cx + 9, cy + 7, K.k); R.linea(cx - 7, cy + 7, cx + 9, cy - 7, K.k); };
const p5 = (t) => {
  fondoNoche();
  // estrellas que titilan, la luna con su halo y nubes oscuras
  for (let k = 0; k < 40; k++) { const x = Math.floor(H(k, 1, 11) * 320), y = Math.floor(H(k, 2, 11) * 70); if ((x > 270 && y < 48) || (x > 16 && x < 174 && y < 16)) continue; R.pset(x, y, Math.sin(t * 3 + k) > 0.4 ? K.blanco : K.noche[5]); }
  for (let r = 12; r > 7; r--) R.anillo(214, 30, r, mez(K.noche[2], K.papelL, (12 - r) * 0.05)); R.disco(214, 30, 7, K.papelL); R.disco(216, 28, 1, K.papelS); R.disco(211, 33, 2, K.papelS);
  for (const [x0, y, w, v] of [[30, 30, 26, 1.0], [120, 22, 32, 1.6], [180, 46, 22, 2.3]]) { const x = Math.round(x0 + t * v); for (let i2 = -w / 2; i2 <= w / 2; i2++) { const hh = Math.round(Math.sqrt(Math.max(0, 1 - (2 * i2 / w) ** 2)) * w * 0.18); for (let j = -hh; j <= 0; j++) R.pset(x + i2, y + j, j > -2 ? K.noche[2] : K.noche[3]); R.pset(x + i2, y - hh, K.noche[4]); } }
  // los vecinos se asoman cuando pasa el desfile
  for (const [x, y, t0] of [[24, 74, SONS - 0.4], [124, 86, SONS + 0.2], [226, 80, CAMPAIGNS]]) if (t > t0) { R.disco(x + 4, y + 6, 3, K.k); R.disco(x + 4, y + 6, 2, K.piel); R.rect(x + 2, y + 2, x + 6, y + 3, K.maderaS); R.rect(x + 1, y + 10, x + 7, y + 14, hex('#5a4a6a')); }
  // el gato negro cruza la calle
  const gu = tramo(t, P5 + 1.0, P5 + 2.4); if (gu > 0 && gu < 1) { const gx = Math.round(lerp(340, -10, gu)), gp = Math.floor(t * 10) % 2; R.rect(gx, 150, gx + 7, 153, K.k); R.rect(gx - 2, 148, gx, 151, K.k); R.pset(gx - 2, 147, K.k); R.pset(gx, 147, K.k); R.linea(gx + 7, 150, gx + 10, 146, K.k); R.pset(gx + 1 + gp, 154, K.k); R.pset(gx + 5 - gp, 154, K.k); R.pset(gx - 1, 149, K.luz); }
  // el desfile: entran por la izquierda con faroles y la pancarta
  const du = tramo(t, P5, SONS - 0.3), dx = Math.round(lerp(-120, 92, du)), anda = du > 0 && du < 1, viva = t > SONS - 0.1 && t < CAMPAIGNS - 0.2;
  const m1 = R.actor(lib3, dx - 30, 172, t, { dir: 1, anda, sostiene: true, brazos: viva && Math.floor(t * 3) % 2 === 0, sonrisa: viva });
  const m2 = R.actor(EL.libertad2, dx - 8, 172, t, { dir: 1, anda, sostiene: true, habla: viva && Math.sin(t * 8) > 0 });
  const m3 = R.actor(EL.marinero83, dx + 22, 172, t, { dir: 1, anda, sostiene: true, sonrisa: viva });
  R.linea(m2.mano[0], m2.mano[1], m2.mano[0], m2.mano[1] - 30, K.maderaS); R.linea(m3.mano[0], m3.mano[1], m3.mano[0], m3.mano[1] - 30, K.maderaS); pancarta(m2.mano[0], m2.mano[1] - 30, t);
  R.linea(m1.mano[0], m1.mano[1], m1.mano[0] + 6, m1.mano[1] - 20, K.maderaS); farol(m1.mano[0] + 6, m1.mano[1] - 16, t, 1);
  // el jefe, con el farol y el cartel: en «against the British» lo clava en el poste
  const ju = tramo(t, CAMPAIGNS - 0.4, AGAINST - 0.15), jx = Math.round(lerp(dx + 52, 226, Math.max(ju, 0))), clava = t > AGAINST - 0.15;
  const jm = R.actor(EL.libertad, jx, 172, t, { dir: 1, anda: (anda && ju <= 0) || (ju > 0 && ju < 1), sostiene: clava ? [244, 136 + (Math.sin(t * 14) > 0 ? -3 : 0)] : true, brazos: viva && Math.floor(t * 3 + 1) % 2 === 0, enfado: clava, sonrisa: t > BRIT2 });
  if (!clava) { R.linea(jm.mano[0], jm.mano[1], jm.mano[0] + 4, jm.mano[1] - 22, K.maderaS); farol(jm.mano[0] + 4, jm.mano[1] - 18, t, 2); }
  // el cartel (el sello tachado) en el poste
  if (clava) { const x = 248, y = 124; R.rect(x - 1, y - 1, x + 15, y + 15, K.k); R.rect(x, y, x + 14, y + 14, K.papel); R.anillo(x + 7, y + 7, 5, K.rojo); R.linea(x + 1, y + 1, x + 13, y + 13, K.k); R.linea(x + 1, y + 13, x + 13, y + 1, K.k); R.pset(x + 7, y + 1, K.hierroL); }
  // un casaca roja de ronda los ve desde la esquina y se da la vuelta
  const ru = tramo(t, SONS - 0.2, SONS + 1.4), vuelve = tramo(t, AGAINST + 0.2, E.duracion - 0.1);
  const rx = Math.round(lerp(lerp(336, 288, ru), 340, vuelve));
  R.actor(EL.casacaRoja, rx, 176, t, { dir: vuelve > 0 ? 1 : -1, anda: (ru > 0 && ru < 1) || (vuelve > 0 && vuelve < 1), sorpresa: t > CAMPAIGNS && t < AGAINST + 0.4 });
};

const año = 1765;
const efectos = [[1.6, 'aldea'], [NOISY, 'guau'], [BRITISH + 0.3, 'toc'], [Y1765, 'brillo'], [TAX, 'sello'], [PAPER, 'sello'],
  [P3 + 0.3, 'papel'], [NEWS, 'papel'], [EVEN + 0.1, 'sello'], [CARDS + 0.35, 'whoosh'], [NINE, 'pop'], [HALL, 'toc'], [PROTEST + 0.15, 'firma'],
  [P5 + 0.3, 'publico'], [P5 + 1.4, 'miau'], [SONS, 'palmada'], [AGAINST, 'golpecito'], [AGAINST + 0.45, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '1765', efectos, año });
''')
