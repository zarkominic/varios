# Borrador de escenas del ep48 (grupo S8): bl-nickell y bl-detalles, con el movimiento ya hecho.
# Los instantes salen de las palabras de la voz inglesa (atomo/build/largo/ep48/linea.json), escritos como en('marca', f).
# bl-detalles es la PAUSA: congela planos de bl-nickell con las MISMAS funciones (COMPARTIDO), con los instantes de
# bl-nickell escritos como números (en bl-detalles, M es el de la pausa).
E = {}

MARCAS = {'stampede': (1.5, 35.899), 'registros': (36.299, 67.697), 'fijate5': (0.2, 39.924)}

# las palabras que mandan en bl-nickell (corte de plano o acción), en segundos de su escena
TB = {
    'IN82': 2.62, 'Y1982': 2.70, 'P2': 5.02, 'READ': 5.92, 'WAY': 7.18, 'SUSPECT': 7.96, 'AND1': 9.00, 'WORDS': 9.98,
    'ENGLISH': 11.74, 'Y1822': 12.76, 'LIKE': 14.50, 'STAMPEDE': 14.78, 'PRINT': 16.92, 'Y1830': 18.50, 'AND2': 20.52,
    'COMPARED': 21.48, 'WRITING': 22.92, 'REST': 23.70, 'PAMPH1': 24.20, 'WITH': 25.12, 'LONG': 25.46, 'HABITS': 27.36,
    'TWO': 28.42, 'SEEMED': 29.06, 'ONE': 30.22, 'SAME': 31.10, 'THAT': 31.52, 'WARD': 32.18, 'MAN': 33.16, 'PUT': 33.86,
    'NAME': 34.32, 'PAMPH2': 35.10,
    'ADD': 36.30, 'GOLPE': 38.30, 'RECORDS': 38.44, 'MORRIS': 39.48, 'SHOWUP': 40.20, 'WASH': 41.28, 'UNTIL': 42.28,
    'Y1823': 42.98, 'EARLIEST': 44.52, 'PAMPH3': 45.86, 'BEALE': 46.88, 'STAYING': 48.26, 'Y1820': 49.22, 'AND3': 50.56,
    'FOUND': 51.64, 'NO': 52.04, 'BEALE2': 53.40, 'VIRGINIA': 54.28, 'AGE': 55.52, 'FOR': 56.04, 'STORY': 56.40,
    'SO': 58.04, 'LITTLE': 59.26, 'BOX': 60.46, 'INNK': 61.72, 'AND4': 62.54, 'NAMELESS': 63.22, 'CHAR': 64.86,
    'VERY': 66.26, 'TALE': 67.16,
}
# las de bl-detalles
TS = {
    'NOTICE': 0.32, 'TRAP': 1.82, 'FALL': 3.10, 'IN': 5.22, 'PSYCH': 7.14, 'AMOS': 7.78, 'DANIEL': 9.44, 'SHOWED': 10.52,
    'MORE': 12.14, 'DETAILS': 12.34, 'SEEMS': 12.82, 'LIKELY': 13.82, 'EVEN': 15.02, 'EVERY': 15.42, 'ADDED': 15.74,
    'DETAIL': 16.02, 'LESS': 17.54, 'AND': 18.60, 'PAMPH': 18.94, 'EXACT': 20.04, 'N1014': 21.62, 'SIX': 24.58,
    'FOUR': 26.20, 'EACH': 29.12, 'OF': 29.64, 'DETAILS2': 29.98, 'MAKES': 30.48, 'STORY': 31.18, 'REAL': 32.34,
    'EVEN2': 33.58, 'ONE': 34.26, 'TRUE': 36.50, 'THOSE': 37.66, 'PERFECT': 38.66,
}


def marca_de(s):
    return 'stampede' if s < 36.1 else 'registros'


def frac(k, s):
    a, b = MARCAS[k]
    return (s - a) / (b - a)


def tb_en():
    """const TB = {...}: cada instante como en('marca', fracción) (para bl-nickell)"""
    return 'const TB = { ' + ', '.join(f"{n}: en('{marca_de(s)}', {frac(marca_de(s), s):.4f})" for n, s in TB.items()) + ' };\n'


def tb_num():
    """los mismos instantes de bl-nickell como números (para bl-detalles, que tiene otro M)"""
    return 'const TB = { ' + ', '.join(f"{n}: {s}" for n, s in TB.items()) + ' };\n'


def ts_en():
    return 'const TS = { ' + ', '.join(f"{n}: en('fijate5', {frac('fijate5', s):.4f})" for n, s in TS.items()) + ' };\n'


COMUN = r'''
const AT = T.AT, BL = T.BL, K = T.C.k, ri = Math.round, H = (s) => hex(s);
const B4M = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4M[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const pop = (t, a, d = 0.3) => { const u = cl((t - a) / d); return u <= 0 ? 0 : u < 1 ? 1 - Math.pow(1 - u, 3) * Math.cos(u * 7) : 1; };
const parp = (t, f = 7) => Math.sin(t * f) > 0;
const pal = (a) => a.map((c) => hex(c));
// rampa de oscuro (0) a claro: el valor v se trama entre dos tonos
const rmp = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return ramp[Math.max(0, Math.min(ramp.length - 1, l))]; };
const ps = (x, y, c) => { x = ri(x); y = ri(y); if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, c); };
const tine = (x, y, c, a) => { x = ri(x); y = ri(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; const p = R.pget(x, y); if (p) R.pset(x, y, mez(p, c, a)); };
const tineR = (x0, y0, x1, y1, c, a) => { for (let y = ri(y0); y <= y1; y++) for (let x = ri(x0); x <= x1; x++) tine(x, y, c, a); };
// lo fijo de cada plano va en un búfer (se pinta una vez y luego se copia)
const CAPAS = {};
const capa = (k, pinta) => { let b = CAPAS[k]; if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); CAPAS[k] = b; } R.copiar(b); };
// cifras propias de 3 × 5 (para fechas pequeñas en papeles y lomos)
const D3 = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];
const cifras = (s, x, y, c, sombra = null, e = 1) => {
  const pinta = (dx, dy, col) => { let cx = x; for (const ch of String(s)) { const d = D3[ch.charCodeAt(0) - 48]; if (d) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (d[j * 3 + i] === '1') for (let a = 0; a < e; a++) for (let b = 0; b < e; b++) ps(cx + i * e + a + dx, y + j * e + b + dy, col); cx += 4 * e; } };
  if (sombra) pinta(1, 1, sombra); pinta(0, 0, c); return String(s).length * 4 * e - e; };
const PAP = pal(['#7a6a4a', '#a8966c', '#cbb98e', '#e2d4ac', '#f2e8cc']);
const MAD = pal(['#2e1c12', '#4a2e1c', '#643f26', '#7e5232', '#9a6a42']);
const TIN = H('#2a2236'), ROJ = H('#c8302a'), ROJL = H('#f06048'), AMA = H('#f0d040'), BLA = H('#f8f4e8'), LUZ = H('#ffe8a0');
const TWEED = '#6e5a40';
// tablas de madera con vetas (al: alto de cada tabla)
const madera = (x0, y0, x1, y1, M, al = 9, k = 0) => {
  for (let y = y0; y <= y1; y++) { const tb = Math.floor((y - y0) / al), fy = (y - y0) % al, of = h2(tb, k, 3) * 400;
    for (let x = x0; x <= x1; x++) { let v = 2.2 + Math.sin((x + of) * 0.05 + Math.sin((x + of) * 0.011 + tb * 1.7) * 2.6 + fy * 0.6) * 0.55 + (h2(x >> 2, y, k + 5) - 0.5) * 0.5;
      if (fy === 0) v = 0.3; else if (fy === 1) v += 0.7; if ((x + ri(of)) % 53 === 0) v = 0.8;
      R.pset(x, y, rmp(M, v, x, y)); } } };
// papel envejecido: mellas en el canto, motas, manchas de humedad y el borde más oscuro
const papel = (x0, y0, x1, y1, k, P = PAP) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const e = Math.min(x - x0, y - y0, x1 - x, y1 - y);
    if (e === 0 && h2(x, y, k) < 0.15) continue;
    let v = 3.3 + (h2(x >> 1, y >> 1, k + 1) - 0.5) * 0.6 - (e < 2 ? 0.7 : 0);
    const m = h2(x >> 3, y >> 3, k + 2); if (m > 0.86) v -= (m - 0.86) * 5;
    R.pset(x, y, rmp(P, v, x, y)); } };
// la sombra que cae a la derecha y abajo de un rectángulo
const sombraR = (x0, y0, x1, y1, d = 2, a = 0.35) => { for (let y = y0 + d; y <= y1 + d; y++) for (let x = x0 + d; x <= x1 + d; x++) if (x > x1 || y > y1) tine(x, y, K, a); };
// un renglón manuscrito: palabras de trazo ondulado; devuelve las palabras [[x0, x1, y]…]
const renglon = (x0, y, x1, c, k) => { const out = []; let x = x0, i = 0;
  while (x < x1 - 3) { const w = 4 + Math.floor(h2(i, k, 7) * 11), xe = Math.min(x1, x + w);
    for (let xx = x; xx < xe; xx++) { const yy = y + Math.round(Math.sin(xx * 1.4 + k + i) * 0.7); ps(xx, yy, c); if (h2(xx, k, 11) > 0.72) ps(xx, yy - 1, c); if (h2(xx, k, 12) > 0.9) ps(xx, yy + 1, c); }
    out.push([x, xe - 1, y]); x = xe + 2 + Math.floor(h2(i, k, 8) * 2); i++; }
  return out; };
// la carta de Beale: papel, la fecha «1822» arriba a la derecha, renglones a pluma y el lacre rojo; devuelve los renglones
const carta = (x0, y0, w, hh, k, o = {}) => {
  const x1 = x0 + w - 1, y1 = y0 + hh - 1;
  if (o.sombra !== false) sombraR(x0, y0, x1, y1, 2, 0.3);
  papel(x0, y0, x1, y1, k);
  const fil = [], paso = o.paso ?? 6, conFecha = o.fecha !== false;
  if (conFecha) cifras('1822', x1 - 20, y0 + 4, TIN);
  for (let j = 0, y = y0 + (conFecha ? 14 : 7); y < y1 - (o.lacre === false ? 4 : 11); j++, y += paso) fil.push(renglon(x0 + 4 + (j === 0 ? 6 : 0), y, x1 - 4 - (j % 4 === 3 ? 12 : 0), TIN, k * 13 + j));
  if (o.lacre !== false) { const cx = x1 - 8, cy = y1 - 6; R.disco(cx, cy, 4, H('#5a0e12')); R.disco(cx, cy, 3, H('#a8222a')); ps(cx - 1, cy - 1, H('#e0606a')); ps(cx + 1, cy + 1, H('#6a1016')); }
  return { fil, fecha: [x1 - 20, y0 + 4], caja: [x0, y0, x1, y1] }; };
// la página del folleto: papel amarillento, cabecera de barras y dos columnas de renglones impresos (rectos)
const paginaFolleto = (x0, y0, w, hh, k) => {
  const x1 = x0 + w - 1, y1 = y0 + hh - 1, P = pal(['#8a7440', '#b09858', '#ccb470', '#e0cc8a', '#eee0a8']);
  sombraR(x0, y0, x1, y1, 2, 0.3); papel(x0, y0, x1, y1, k, P);
  for (let i = 0; i < 3; i++) R.rect(x0 + 6 + i * 2, y0 + 5 + i * 4, x1 - 6 - i * 4, y0 + 6 + i * 4, TIN);
  const fil = [], mid = ri((x0 + x1) / 2);
  for (let y = y0 + 20, j = 0; y < y1 - 4; y += 4, j++) { const a = []; for (const [c0, c1] of [[x0 + 4, mid - 2], [mid + 2, x1 - 4]]) { let x = c0, i = 0; while (x < c1 - 2) { const ww = 3 + Math.floor(h2(i, j, k) * 7), xe = Math.min(c1, x + ww); R.rect(x, y, xe - 1, y, H('#4a3e2e')); a.push([x, xe - 1, y]); x = xe + 2; i++; } } fil.push(a); }
  return { fil, caja: [x0, y0, x1, y1] }; };
// un bocadillo de papel con un icono grande (e: escala del icono)
const globo = (x, y, icono, u = 1, col = K, e = 2) => { if (u <= 0) return; const w = ri(9 * e * Math.min(1, u)), hh = ri(9 * e * Math.min(1, u)), x0 = ri(x - w / 2), y0 = ri(y - hh);
  R.rect(x0 - 1, y0 - 1, x0 + w + 1, y0 + hh + 1, K); R.rect(x0, y0, x0 + w, y0 + hh, BLA); R.rect(x0, y0 + hh, x0 + w, y0 + hh, H('#c8c0b0'));
  for (let i = 0; i < 3; i++) R.rect(ri(x) - 2 + i, y0 + hh + 1 + i, ri(x) + 1 - i, y0 + hh + 1 + i, i === 2 ? K : BLA); ps(x - 3, y0 + hh + 1, K); ps(x + 2, y0 + hh + 1, K);
  if (u >= 0.7) R.icono(icono, ri(x - (icono === '!' ? 1.5 : 2.5) * e), y0 + 2, col, H('#c8c0b0'), e); };
// destello de cuatro puntas
const destello = (x, y, r, c = BLA) => { ps(x, y, c); for (let i = 1; i <= r; i++) { const cc = i === r ? mez(c, AMA, 0.5) : c; ps(x + i, y, cc); ps(x - i, y, cc); ps(x, y + i, cc); ps(x, y - i, cc); } };
// motas de polvo que flotan en un haz
const motas = (x0, y0, x1, y1, t, n = 14, c = LUZ) => { for (let k = 0; k < n; k++) { const x = x0 + ((h2(k, 1, 90) * (x1 - x0) + t * (2 + h2(k, 2, 90) * 3)) % (x1 - x0)), y = y0 + ((h2(k, 3, 90) * (y1 - y0) - t * (1 + h2(k, 4, 90) * 2)) % (y1 - y0) + (y1 - y0)) % (y1 - y0); if (Math.sin(t * 2 + k) > -0.3) tine(x, y, c, 0.6); } };
// la silueta de una persona de perfil (pies en (x, y)): piernas, tronco con hombros, cuello, cabeza con nariz y sombrero
const SIL = (lx, ly, x, y, gorro) => { const dx = lx - x, dy = ly - y, ax = Math.abs(dx); if (dy < -26 || dy > 0) return false;
  if (dy > -4) return ax < 4.5; if (dy > -11) return ax < 5.6 - (dy < -9 ? (-9 - dy) * 0.9 : 0); if (dy > -13) return ax < 1.6;
  if (Math.hypot(dx - 0.6, dy + 16) < 3.5 || (dy > -16 && dy < -14 && dx > 2 && dx < 4.6)) return true;
  if (gorro === 'copa') return (dy >= -26 && dy < -19 && ax < 3) || (dy === -19 && ax < 5.5);
  return (dy >= -22 && dy < -19 && ax < 3.6 - (dy < -21 ? 1 : 0)) || (dy === -19 && ax < 5.2); };
// un búfalo pequeño corriendo hacia la derecha (13 × 9), con dos posturas de patas
const BUF = ['.....kk......', '....kHHk.w...', '.kkkHHHHHkw..', 'kMMMMHHHHHHk.', 'kMMMMMHHHHHHk', 'kMMMMMMHHHoHk', '.kMMMMMMkHHHk', '.k.k...k.k.k.', 'k...k.k...k..'];
const BUF2 = ['.k.k...k.k.k.', '..k.k...k.k..'];
const bufalo = (x, y, t, k, s = 2) => { const f = Math.floor(t * 12 + k) % 2, P = { k: H('#1c120c'), H: H('#3e2618'), M: H('#7e5636'), w: H('#f0e6cc'), o: H('#ffe8a0') }, F = f ? BUF.slice(0, 7).concat(BUF2) : BUF, X = ri(x), Y = ri(y);
  F.forEach((fila, j) => { for (let i = 0; i < fila.length; i++) { const c = P[fila[i]]; if (c == null) continue; R.rect(X + i * s, Y + j * s, X + i * s + s - 1, Y + j * s + s - 1, c); } });
  if (s > 1) { R.rect(X + 2 * s, Y + 3 * s, X + 4 * s, Y + 3 * s, H('#a07a52')); R.rect(X + 5 * s, Y + 1 * s, X + 7 * s, Y + 1 * s, H('#6a4a30')); } };
'''

# ── los planos de bl-nickell (los usa también la pausa) ────────────────────────────────────────────────────────────────
COMPARTIDO = r'''
// ── P1 · el campus de noche en 1982: se enciende la ventana de Nickell; pasa un coche y una corredora ──
const NOCHE = pal(['#10142c', '#161c3a', '#1e2448', '#282c56', '#363464', '#4a3e6e', '#5e4a74']);
const LAD = pal(['#2a1618', '#40221e', '#562e26', '#6c3a2c', '#804634']);
const PIED = pal(['#3e3c52', '#56546c', '#6e6c84', '#8a88a0', '#a6a4b8']);
const ventana1 = (x0, y0, w, hh, enc, k) => {
  const x1 = x0 + w, y1 = y0 + hh;
  R.rect(x0 - 2, y0 - 4, x1 + 2, y0 - 1, PIED[3]); R.rect(x0 - 2, y0 - 4, x1 + 2, y0 - 4, PIED[4]);   // dintel
  R.rect(x0 - 2, y1 + 1, x1 + 2, y1 + 2, PIED[3]); R.rect(x0 - 3, y1 + 3, x1 + 3, y1 + 3, PIED[1]);     // alféizar
  R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, H('#1a1418'));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let c;
    if (enc) { const v = 3.2 - (y - y0) / hh * 1.6 + (h2(x >> 2, y >> 2, k) - 0.5) * 0.4; c = rmp(pal(['#6a3a1a', '#a8622a', '#d8923a', '#f0bc5a', '#ffe08a']), v, x, y); if (x < x0 + 3) c = H('#8a3a2a'); }
    else { c = rmp(pal(['#141a34', '#1e2a4a', '#2c3a5e', '#4a5a7e']), 1.2 + ((x - x0) - (y - y0) * 0.6 > w * 0.4 && (x - x0) - (y - y0) * 0.6 < w * 0.4 + 3 ? 1.6 : 0), x, y); }
    R.pset(x, y, c); }
  const mx = x0 + (w >> 1), my = y0 + (hh >> 1); R.rect(mx, y0, mx, y1, H('#2a2024')); R.rect(x0, my, x1, my, H('#2a2024'));
};
const P1 = (t) => {
  capa('p1', () => {
    for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(NOCHE, y / 118 * 6.2, x, y));
    for (let k = 0; k < 80; k++) { const x = ri(h2(k, 1, 20) * 319), y = ri(h2(k, 2, 20) * 80); if (x > 270 && y < 48) continue; R.pset(x, y, h2(k, 3, 20) > 0.7 ? H('#e8e8ff') : H('#7a7aa8')); }
    // la luna con sus mares y su halo
    R.halo(232, 30, 15, pal(['#2a2c5a', '#3a3a6c']), 1.1); R.disco(232, 30, 7, H('#e8e4c8')); R.disco(230, 28, 2, H('#c8c4a8')); R.disco(235, 33, 1.5, H('#c8c4a8')); ps(234, 26, H('#fffff0'));
    // lejos: tejados, una torre de agua y copas de árboles azuladas con alguna ventanita encendida
    for (let x = 0; x < 320; x++) { const hh = 102 + ri(Math.sin(x * 0.05) * 4 + h2(x >> 3, 0, 21) * 8); for (let y = hh; y < 152; y++) R.pset(x, y, y === hh ? H('#30365e') : rmp(pal(['#1a1e3c', '#22284a']), 1 - (y - hh) / 20, x, y)); }
    R.rect(286, 82, 304, 92, H('#262c50')); R.rect(288, 92, 289, 108, H('#262c50')); R.rect(301, 92, 302, 108, H('#262c50')); R.rect(286, 82, 304, 82, H('#3a4068'));
    for (let k = 0; k < 14; k++) { const x = ri(h2(k, 5, 22) * 316), y = 108 + ri(h2(k, 6, 22) * 10); if (x < 66 || x > 256) R.pset(x, y, H('#e8b860')); }
    // el edificio de la facultad: frontón con óculo, cornisa con dentículos y fachada de ladrillo
    R.poligono([[124, 54], [162, 33], [200, 54]], PIED[2]); R.linea(124, 54, 162, 33, PIED[4]); R.linea(162, 33, 200, 54, PIED[1]); R.disco(162, 46, 4, PIED[0]); R.disco(162, 46, 3, H('#1c2040'));
    R.rect(68, 52, 256, 58, PIED[2]); R.rect(68, 52, 256, 52, PIED[4]); R.rect(68, 57, 256, 58, PIED[1]); for (let x = 70; x < 256; x += 4) R.rect(x, 59, x + 1, 60, PIED[1]);
    for (let y = 61; y < 148; y++) { const r = Math.floor((y - 61) / 4), off = r % 2 ? 4 : 0;
      for (let x = 72; x <= 252; x++) { const mort = (y - 61) % 4 === 3 || (x + off) % 9 === 8; let v = mort ? 0.5 : 2.4 + (h2(((x + off) / 9) | 0, r, 23) - 0.5) * 1.2 - (148 - y) / 200; R.pset(x, y, rmp(LAD, v, x, y)); } }
    R.rect(72, 61, 75, 147, PIED[2]); R.rect(249, 61, 252, 147, PIED[1]); R.rect(72, 96, 252, 98, PIED[2]); R.rect(72, 96, 252, 96, PIED[3]);
    for (const x of [84, 118, 192, 226]) { ventana1(x, 66, 18, 22, (x === 118 || x === 226), x); ventana1(x, 104, 18, 24, (x === 84 || x === 192), x + 1); }
    // la puerta con su montante encendido, los escalones y dos faroles
    R.rect(148, 108, 176, 148, PIED[2]); R.disco(162, 112, 12, PIED[2]); R.disco(162, 112, 10, H('#e8a848')); R.rect(150, 112, 174, 148, H('#3a2018'));
    R.rect(152, 116, 160, 146, H('#5a3020')); R.rect(164, 116, 172, 146, H('#5a3020')); R.rect(152, 116, 152, 146, H('#7a4a2a')); R.rect(164, 116, 164, 146, H('#7a4a2a')); ps(161, 132, AMA); ps(163, 132, AMA);
    for (let i = 0; i < 3; i++) R.rect(144 - i * 3, 148 + i * 2, 180 + i * 3, 149 + i * 2, i % 2 ? PIED[2] : PIED[3]);
    for (const x of [142, 182]) { R.rect(x - 2, 114, x + 2, 120, H('#1a1418')); R.rect(x - 1, 115, x + 1, 119, H('#ffd890')); }
    // el seto delante de la fachada y la hierba
    for (let x = 60; x < 262; x++) { if (x > 138 && x < 186) continue; const hh = 136 + ri(Math.sin(x * 0.4) * 2 + h2(x, 1, 24) * 3); for (let y = hh; y < 152; y++) R.pset(x, y, rmp(pal(['#0e2018', '#16301e', '#204228', '#2e5634']), 2.6 - (y - hh) / 6 + (h2(x, y, 25) - 0.5), x, y)); }
    // la acera de losas, el bordillo y la calle de asfalto con la raya amarilla y una alcantarilla
    for (let y = 152; y < 162; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 22 === 0 || y === 152) ? H('#3a3a48') : rmp(pal(['#4a4a5a', '#5a5a6a', '#6a6a7a']), 1.4 + (h2(x >> 1, y, 26) - 0.5) * 0.8 + (y - 152) / 14, x, y));
    R.rect(0, 162, 319, 163, H('#7a7a88')); R.rect(0, 164, 319, 164, H('#2a2a32'));
    for (let y = 165; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#1e1e28', '#26262e', '#2e2e38']), 1 + (h2(x, y, 27) - 0.5) * 1.4, x, y));
    for (let x = 4; x < 320; x += 26) R.rect(x, 172, x + 12, 172, H('#a88a2a'));
    R.rect(200, 176, 212, 177, H('#3a3a44')); R.rect(202, 176, 210, 176, H('#16161c'));
    // la bicicleta apoyada en la barandilla de los escalones y la farola (el poste)
    R.disco(198, 147, 3, K); R.disco(198, 147, 2, H('#30365e')); R.disco(210, 147, 3, K); R.disco(210, 147, 2, H('#30365e')); R.linea(198, 147, 204, 141, H('#a83a2a')); R.linea(204, 141, 210, 147, H('#a83a2a')); R.linea(203, 141, 207, 141, H('#a83a2a')); R.linea(204, 141, 202, 138, K);
    R.rect(275, 86, 277, 160, H('#1a1c28')); R.rect(275, 86, 275, 160, H('#3a3e52')); R.rect(272, 158, 280, 161, H('#1a1c28'));
    // el tronco del roble
    R.rect(26, 92, 34, 152, H('#20160e')); R.rect(27, 92, 28, 152, H('#3a2a1a')); R.linea(30, 100, 14, 82, H('#20160e')); R.linea(32, 98, 50, 80, H('#20160e'));
  });
  // nubes de tres tonos a tres velocidades (por detrás del edificio: no entran en el frontón ni en la fachada)
  const tras = (x, y) => !(y >= 52 && x >= 66 && x <= 258) && !(y >= 33 && Math.abs(x - 162) < (y - 33) * 1.85 + 1) && !(x > 270 && y < 46);
  for (const [x0, y, w, v, k] of [[20, 36, 46, 2.2, 1], [180, 24, 34, 3.4, 2], [300, 44, 56, 1.4, 3]]) { const cx = ((x0 + t * v) % 380) - 30;
    for (const [dx, dy, r, c] of [[0, 1, w * 0.22, '#262a54'], [-w * 0.25, 0, w * 0.17, '#323664'], [w * 0.2, -1, w * 0.18, '#323664'], [-w * 0.05, -3, w * 0.16, '#454878'], [w * 0.18, -3, w * 0.1, '#5a5c88']])
      for (let yy = ri(y + dy - r); yy <= y + 3; yy++) for (let xx = ri(cx + dx - r); xx <= cx + dx + r; xx++) if (Math.hypot(xx - cx - dx, (yy - y - dy) * 1.6) <= r && tras(xx, yy)) ps(xx, yy, H(c)); }
  // estrellas que titilan
  for (let k = 0; k < 6; k++) { const x = ri(h2(k, 7, 28) * 250 + 10), y = ri(h2(k, 8, 28) * 30 + 4); if (Math.sin(t * 3 + k * 2) > 0.5) { ps(x, y, BLA); ps(x - 1, y, H('#8a8ab8')); ps(x + 1, y, H('#8a8ab8')); } }
  // la copa del roble que se mece
  for (let k = 0; k < 16; k++) { const cx = 4 + h2(k, 1, 29) * 62 + Math.sin(t * 1.3 + k) * 1.2, cy = 60 + h2(k, 2, 29) * 40, r = 8 + h2(k, 3, 29) * 7;
    for (let yy = ri(cy - r); yy <= cy + r; yy++) for (let xx = ri(cx - r); xx <= cx + r; xx++) { const d = Math.hypot(xx - cx, yy - cy) / r; if (d < 1) ps(xx, yy, rmp(pal(['#0a1810', '#102418', '#1a3222', '#24402a']), 2.6 - d * 1.4 - (yy - cy) / r * 0.8 + (h2(xx, yy, k) - 0.5) * 0.8, xx, yy)); } }
  // la ventana de Nickell (en el centro, arriba): a oscuras hasta «1982»; luego se enciende el flexo y se le ve trabajar
  const on = t > TB.IN82 + (Math.sin(t * 60) > 0 && t < TB.IN82 + 0.25 ? 0.3 : 0);
  ventana1(153, 66, 18, 22, on, 9);
  if (on) { R.halo(162, 77, 22, pal(['#5a3a2a', '#7a4a2a']), 0.55); ventana1(153, 66, 18, 22, true, 9);
    const by = ri(Math.sin(t * 2.2) * 0.6); R.disco(159, 79 + by, 3, H('#3a2016')); R.rect(155, 83 + by, 163, 88, H('#3a2016'));
    R.rect(166, 80, 170, 81, H('#2a1810')); R.linea(168, 81, 168, 86, H('#2a1810')); R.rect(165, 86, 171, 88, H('#5a3a20'));
    for (let x = 152; x < 174; x++) tine(x, 91, LUZ, 0.35); }
  // la tele azul de una ventana de abajo y el resplandor de la farola con sus polillas
  { const f = 0.25 + 0.2 * Math.sin(t * 9) * Math.sin(t * 3.1); tineR(193, 105, 209, 127, H('#7ab0ff'), f); }
  R.rect(270, 78, 282, 80, H('#1a1c28')); R.rect(271, 81, 281, 87, H('#ffe8a0')); R.rect(270, 88, 282, 88, H('#1a1c28'));
  for (let y = 88; y < 162; y++) { const w = (y - 88) * 0.42; for (let x = ri(276 - w); x <= 276 + w; x++) tine(x, y, H('#ffe0a0'), 0.16); }
  for (let k = 0; k < 3; k++) { const a = t * (4 + k) + k * 2; ps(276 + Math.cos(a) * (8 + k * 3), 86 + Math.sin(a * 1.3) * 5, BLA); }
  // la corredora con su cinta en el pelo (por la acera, hacia la izquierda)
  R.actor(EL.joven, ri(lerp(306, 196, t / TB.P2)), 160, t, { dir: -1, anda: true });
  // el coche de 1982 que pasa por la calle (delante de todo), con los faros encendidos
  const cx = lerp(-70, 360, ease(tramo(t, 0.3, 3.9)));
  if (cx > -70 && cx < 360) { const x = ri(cx), y = 168;
    for (let yy = y - 4; yy < y + 4; yy++) for (let xx = x + 56; xx < x + 96; xx++) if (Math.abs(yy - y) < (xx - x - 56) * 0.18 + 1) tine(xx, yy, H('#fff4c0'), 0.22);
    R.rect(x - 1, y - 11, x + 57, y + 3, K); R.rect(x, y - 10, x + 56, y + 2, H('#7a2228')); R.rect(x, y - 10, x + 56, y - 9, H('#a83a3a')); R.rect(x, y - 2, x + 56, y + 2, H('#4a1418'));
    R.rect(x + 12, y - 19, x + 42, y - 11, K); R.rect(x + 14, y - 18, x + 40, y - 11, H('#7a2228')); R.rect(x + 16, y - 17, x + 26, y - 12, H('#2a3456')); R.rect(x + 29, y - 17, x + 38, y - 12, H('#2a3456')); ps(x + 18, y - 16, H('#8a9ac8')); ps(x + 31, y - 16, H('#8a9ac8'));
    R.rect(x + 54, y - 7, x + 56, y - 5, H('#fff4c0')); R.rect(x, y - 7, x + 1, y - 5, H('#ff4030')); R.rect(x + 2, y - 4, x + 54, y - 4, H('#c8c8d0'));
    for (const wx of [x + 12, x + 44]) { R.disco(wx, y + 3, 4, K); R.disco(wx, y + 3, 2, H('#8a8a94')); ps(wx + ri(Math.cos(t * 20) * 1.5), y + 3 + ri(Math.sin(t * 20) * 1.5), K); } }
};

// ── P2 · la sala de interrogatorios (gag): Nickell interroga a la carta, que suda en la silla ──
const CEM = pal(['#323c38', '#43504a', '#55625a', '#67766c', '#7a8a7e']);
const P2 = (t) => {
  capa('p2', () => {
    for (let y = 0; y < 122; y++) for (let x = 0; x < 320; x++) { const r = Math.floor(y / 9), off = r % 2 ? 9 : 0, mort = y % 9 === 8 || (x + off) % 18 === 17;
      let v = mort ? 0.7 : 2.4 + (h2(((x + off) / 18) | 0, r, 31) - 0.5) * 0.8 + (h2(x, y, 32) - 0.5) * 0.5; v -= Math.max(0, (46 - y) / 46) * 1.2; if (!mort && h2(x >> 2, y >> 2, 33) > 0.94) v -= 0.6; R.pset(x, y, rmp(CEM, v, x, y)); }
    R.rect(0, 114, 319, 121, H('#2a302c')); R.rect(0, 114, 319, 114, H('#4a544e'));
    for (let y = 122; y < 180; y++) for (let x = 0; x < 320; x++) { const tile = ((Math.floor(x / 20) + Math.floor((y - 122) / 10)) & 1); R.pset(x, y, rmp(pal(['#2a2a30', '#3a3a42', '#4a4a54', '#5a5a64']), 1.4 + tile * 0.9 + (h2(x >> 1, y, 34) - 0.5) * 0.5 + (y - 122) / 80, x, y)); }
    R.disco(150, 168, 4, H('#2a2a30')); for (let i = -3; i <= 3; i += 2) R.linea(150 + i, 165, 150 + i, 171, H('#5a5a64'));
    for (let k = 0; k < 9; k++) { const x = 20 + h2(k, 1, 35) * 280, y = 136 + h2(k, 2, 35) * 40; R.linea(ri(x), ri(y), ri(x + 6 + h2(k, 3, 35) * 8), ri(y + 1), H('#24242a')); }
    R.rect(236, 140, 252, 160, K); R.rect(237, 141, 251, 160, H('#5a6066')); for (let x = 239; x < 251; x += 3) R.rect(x, 142, x, 159, H('#3a4046')); R.rect(238, 138, 242, 140, BLA); R.rect(244, 137, 248, 140, H('#e8e0c8'));
    // la regla de estaturas detrás de la silla (rayas y pies: 4, 5, 6)
    R.rect(40, 34, 92, 112, H('#9aa8a0')); for (let y = 36; y < 112; y += 4) R.rect(40, y, (y - 36) % 16 === 0 ? 92 : 56, y, H('#5a6a62')); for (const [n, y] of [['6', 44], ['5', 76], ['4', 108]]) cifras(n, 84, y - 6, H('#2a302c'));
    // la puerta de chapa con su ventanuco de alambre
    R.rect(4, 40, 34, 121, H('#1e2420')); R.rect(6, 42, 32, 121, H('#4a5a62')); R.rect(6, 42, 6, 121, H('#6a7a82')); R.rect(12, 52, 26, 66, H('#1e2420')); R.rect(13, 53, 25, 65, H('#6a8a96'));
    for (let i = 13; i < 26; i += 3) { R.linea(i, 53, i, 65, H('#4a5a62')); } R.rect(28, 84, 30, 88, H('#c8b048'));
    // el espejo espía, con su marco y reflejos
    R.rect(214, 46, 300, 112, H('#1a1c1e')); for (let y = 48; y < 111; y++) for (let x = 216; x < 299; x++) { const d = (x - 216) - (y - 48) * 0.5; R.pset(x, y, (d > 20 && d < 26) || (d > 34 && d < 36) ? H('#3e4a52') : rmp(pal(['#161c22', '#1e262e', '#28323c']), 1 + (y - 48) / 70, x, y)); }
    R.rect(214, 112, 300, 114, H('#5a6460'));
    // la rejilla de ventilación y el reloj de pared
    R.rect(110, 24, 134, 34, H('#2a302c')); for (let y = 26; y < 34; y += 2) R.rect(112, y, 132, y, H('#6a7470'));
    R.disco(184, 36, 8, K); R.disco(184, 36, 7, BLA); R.disco(184, 36, 1, K);
    // la silla de metal
    R.rect(62, 98, 66, 156, H('#2a2c30')); R.rect(60, 130, 92, 134, H('#2a2c30')); R.rect(61, 130, 91, 131, H('#5a5e66')); R.rect(88, 134, 91, 156, H('#2a2c30')); R.rect(62, 98, 66, 98, H('#5a5e66'));
    // la mesa de acero: tablero, faldón y patas (con una taza que humea, el cenicero y el bloc)
    R.rect(98, 124, 208, 131, H('#2a2c30')); R.rect(99, 124, 207, 125, H('#8a9098')); R.rect(99, 126, 207, 129, H('#5a6068')); R.rect(102, 131, 105, 164, H('#2a2c30')); R.rect(201, 131, 204, 164, H('#2a2c30'));
    for (let x = 99; x < 208; x++) tine(x, 165, K, 0.3);
    R.rect(184, 114, 192, 123, K); R.rect(185, 115, 191, 123, BLA); R.rect(185, 115, 191, 116, H('#5a3a20')); R.rect(192, 117, 194, 120, K);
    R.rect(120, 121, 132, 123, H('#3a3c40')); R.rect(121, 121, 131, 121, H('#7a7e86')); R.rect(140, 121, 160, 123, H('#e8e0c8')); R.rect(140, 121, 160, 121, BLA); R.linea(142, 122, 158, 122, H('#6a7aa0'));
  });
  // la lámpara colgada que se mece y su cono de luz sobre la mesa
  const a = Math.sin(t * 1.6) * 0.09, lx = 160 + Math.sin(a) * 58, ly = 58;
  R.linea(160, 0, ri(lx), ly - 6, K);
  for (let y = ly; y < 126; y++) { const w = 9 + (y - ly) * 0.62, cx = lx + (y - ly) * Math.sin(a) * 0.8; for (let x = ri(cx - w); x <= cx + w; x++) tine(x, y, H('#fff0b0'), 0.13 + (1 - (y - ly) / 70) * 0.06); }
  for (let x = 100; x < 208; x++) tine(x, 124, H('#ffffff'), 0.5);
  R.poligono([[ri(lx - 4), ly - 6], [ri(lx + 4), ly - 6], [ri(lx + 10), ly], [ri(lx - 10), ly]], H('#2a3a30')); R.linea(ri(lx - 4), ly - 6, ri(lx + 4), ly - 6, H('#5a7a62')); R.rect(ri(lx - 3), ly + 1, ri(lx + 3), ly + 2, H('#fff8d0'));
  // la mosca que ronda la lámpara
  ps(lx + Math.cos(t * 7) * 14, ly + 8 + Math.sin(t * 9) * 6, K);
  // el humo del cenicero y el vapor de la taza
  for (let k = 0; k < 6; k++) { const u = ((t * 0.5 + k / 6) % 1); tine(126 + Math.sin(u * 8 + k) * 2, 120 - u * 22, H('#c8c8d0'), 0.5 * (1 - u)); tine(188 + Math.sin(u * 7 + k) * 2, 112 - u * 18, BLA, 0.5 * (1 - u)); }
  // el policía apoyado junto a la puerta, con su café
  const pol = R.actor(EL.guardia ?? EL.guarda, 38, 150, t, { dir: 1, sostiene: [52, 128 + (Math.sin(t * 0.9) > 0.6 ? -4 : 0)], sonrisa: t > TB.SUSPECT + 0.3 });
  if (pol && pol.mano) { const [mx, my] = pol.mano; R.rect(mx - 1, my - 5, mx + 3, my, K); R.rect(mx, my - 4, mx + 2, my - 1, BLA); }
  // la carta, sospechosa, en la silla: tiembla, mira a Nickell y suda
  const miedo = t > TB.SUSPECT ? 1 : t > TB.READ ? 0.4 : 0, tb = miedo ? ri(Math.sin(t * 40) * miedo) : 0, sal = ri(pop(t, TB.SUSPECT, 0.4) > 0 && t < TB.SUSPECT + 0.4 ? -3 * Math.sin((t - TB.SUSPECT) / 0.4 * Math.PI) : 0);
  const cx0 = 66 + tb, cy0 = 99 + sal;
  sombraR(cx0, cy0, cx0 + 22, cy0 + 30, 1, 0.35); papel(cx0, cy0, cx0 + 22, cy0 + 30, 5);
  for (let j = 0; j < 5; j++) renglon(cx0 + 2, cy0 + 13 + j * 3, cx0 + 20 - (j === 4 ? 6 : 0), TIN, 40 + j);
  R.disco(cx0 + 17, cy0 + 26, 2.5, H('#5a0e12')); R.disco(cx0 + 17, cy0 + 26, 2, H('#a8222a'));
  const mira = t > TB.P2 + 0.6 ? 1 : 0, parpa = (t % 2.3) < 0.12;
  for (const ex of [cx0 + 7, cx0 + 14]) { R.rect(ex - 1, cy0 + 4, ex + 1, cy0 + 8, K); if (!parpa) { R.rect(ex - 1 + 0, cy0 + 5, ex, cy0 + 7, BLA); ps(ex + mira - (mira ? 0 : 1), cy0 + 6, K); } }
  if (t > TB.SUSPECT) { R.linea(cx0 + 5, cy0 + 2, cx0 + 9, cy0 + 3, K); R.linea(cx0 + 17, cy0 + 2, cx0 + 13, cy0 + 3, K); R.rect(cx0 + 9, cy0 + 10, cx0 + 12, cy0 + 10, K); }
  for (let k = 0; k < 3; k++) { const u = ((t - TB.WAY - k * 0.45) % 1.35) / 1.35; if (t > TB.WAY + k * 0.45 && u < 1) { const gx = cx0 + 23 + k, gy = cy0 + 2 + u * 26; ps(gx, gy, H('#8ad0ff')); ps(gx, gy + 1, H('#4a90d0')); ps(gx, gy - 1, BLA); } }
  // Nickell entra por la derecha, se planta y en «suspect» da un manotazo en la mesa y señala a la carta
  const u = tramo(t, TB.P2 + 0.05, TB.READ - 0.1), nx = ri(lerp(258, 208, ease(u)));
  R.actor(BL.nickellBL, nx, 156, t, { dir: -1, anda: u > 0 && u < 1, habla: u >= 1 && t < TB.SUSPECT - 0.2 && parp(t, 8), dedo: t > TB.SUSPECT - 0.05, enfado: t > TB.SUSPECT - 0.05, sorpresa: false });
  if (t > TB.SUSPECT && t < TB.SUSPECT + 0.5) { globo(cx0 + 11, cy0 - 3, '!', pop(t, TB.SUSPECT, 0.15), ROJ, 2); for (let k = 0; k < 5; k++) ps(196 + k * 3, 121 - (k % 2) * 2, BLA); }
};

// ── P3 · el escritorio de la consulta (cámara de cerca): el lápiz rojo rodea tres palabras y sale la fecha «1822» ──
const O3 = { encuadre: 'consulta', camara: 'escritorio' };
const P3 = (t) => {
  capa('p3', () => {
    // el escritorio desde arriba: nogal, el secante verde con sus cantoneras, gafas, cenicero, taza, bloc y lápices
    madera(0, 0, 319, 179, MAD, 22, 31);
    R.rect(92, 24, 232, 179, K); for (let y = 25; y < 180; y++) for (let x = 93; x < 232; x++) R.pset(x, y, rmp(pal(['#1e3a2a', '#28483a', '#325646', '#3e6452']), 1.8 + (h2(x >> 1, y >> 1, 32) - 0.5) * 0.6 + (h2(x >> 4, y >> 4, 33) - 0.5) * 0.5, x, y));
    for (const [x, y, sx, sy] of [[93, 25, 1, 1], [231, 25, -1, 1]]) for (let i = 0; i < 12; i++) R.linea(x, y + i * sy, x + (11 - i) * sx, y + i * sy, i < 2 ? MAD[4] : MAD[1]);
    R.disco(46, 62, 9, K); R.disco(46, 62, 8, H('#8aa0b0')); R.disco(46, 62, 6, H('#b8c8d0')); R.disco(68, 62, 9, K); R.disco(68, 62, 8, H('#8aa0b0')); R.disco(68, 62, 6, H('#b8c8d0')); R.rect(55, 61, 59, 62, K); R.linea(37, 60, 20, 52, K); R.linea(77, 60, 90, 50, K); ps(43, 59, BLA); ps(65, 59, BLA);
    R.disco(52, 140, 14, K); R.disco(52, 140, 13, H('#6a6e76')); R.disco(52, 140, 9, H('#3a3c42')); R.rect(52, 138, 72, 140, H('#f0ece0')); R.rect(70, 138, 72, 140, H('#c87a3a'));
    R.rect(250, 96, 300, 160, K); R.rect(251, 97, 299, 160, H('#f4ec9a')); for (let y = 104; y < 160; y += 6) R.rect(251, y, 299, y, H('#a8c0d8')); R.rect(258, 97, 258, 160, H('#e08080')); for (let x = 256; x < 300; x += 8) R.disco(x, 96, 2, H('#8a8a94'));
    R.linea(244, 168, 296, 176, H('#e8c040')); R.linea(244, 169, 296, 177, H('#b89020')); R.rect(294, 175, 300, 178, H('#e890a0'));
  });
  // el humo del cigarrillo, la taza de café que humea y la luz del flexo
  for (let k = 0; k < 7; k++) { const u = ((t * 0.35 + k / 7) % 1); tine(72 + Math.sin(u * 9 + k) * 4 + u * 10, 138 - u * 40, H('#d8d8e0'), 0.55 * (1 - u)); }
  R.disco(262, 52, 13, K); R.disco(262, 52, 12, BLA); R.disco(262, 52, 9, H('#4a2a14')); ps(258, 49, H('#8a5a34')); R.rect(274, 48, 278, 56, K); R.rect(275, 49, 277, 55, BLA);
  for (let k = 0; k < 5; k++) { const u = ((t * 0.45 + k / 5) % 1); tine(262 + Math.sin(u * 7 + k) * 3, 50 - u * 20, BLA, 0.5 * (1 - u)); }
  for (let y = 0; y < 180; y++) for (let x = 60; x < 260; x++) { const d = Math.hypot((x - 160) / 110, (y - 100) / 90); if (d < 1) tine(x, y, H('#ffe0a0'), 0.16 * (1 - d)); }
  const C = carta(114, 46, 92, 112, 3);
  const objs = [[C.fil[7][1], TB.WORDS], [C.fil[10][2], TB.WORDS + 0.92], [C.fil[13][0], TB.ENGLISH]];
  let tip = [214, 166];
  objs.forEach(([[x0, x1, y], a], i) => { const cx = (x0 + x1) / 2, rx = (x1 - x0) / 2 + 3, u = tramo(t, a, a + 0.55);
    if (u > 0) { tineR(x0 - 1, y - 2, x1 + 1, y + 2, H('#ffe060'), 0.22); for (let k = 0; k < 90 * u; k++) { const p = k / 90 * Math.PI * 2.15 - 0.6; ps(cx + Math.cos(p) * rx, y + Math.sin(p) * 4, ROJ); ps(cx + Math.cos(p) * rx, y + 1 + Math.sin(p) * 4, k % 3 ? ROJ : ROJL); } }
    if (u > 0 && u < 1) { const p = u * Math.PI * 2.15 - 0.6; tip = [cx + Math.cos(p) * rx, y + Math.sin(p) * 4]; }
    else if (u >= 1 && (i === 2 || t < objs[i + 1][1])) { const nxt = i < 2 ? objs[i + 1][0] : null, v = nxt ? tramo(t, a + 0.55, objs[i + 1][1]) : tramo(t, a + 0.55, a + 1.2);
      const [qx, qy] = nxt ? [(nxt[0] + nxt[1]) / 2 + (nxt[1] - nxt[0]) / 2 + 3, nxt[2]] : [204, 168]; tip = [lerp(cx + rx * 0.8, qx, ease(v)), lerp(y - 2, qy, ease(v)) - Math.sin(v * Math.PI) * 6]; } });
  if (t < objs[0][1]) { const v = tramo(t, TB.AND1, objs[0][1]); const [x0, x1, y] = objs[0][0]; tip = [lerp(214, (x0 + x1) / 2 + (x1 - x0) / 2 + 3, ease(v)), lerp(166, y, ease(v))]; }
  // la fecha de la carta se enciende en «1822»
  const f = pop(t, TB.Y1822, 0.35);
  if (f > 0) { const [fx, fy] = C.fecha; R.halo(fx + 7, fy + 2, 14, pal(['#c8a040', '#f0d060']), 0.5 * f); papel(fx - 2, fy - 2, fx + 16, fy + 6, 3); cifras('1822', fx, fy, ROJ, null); R.rect(fx - 1, fy + 7, fx + 15, fy + 7, ROJ); if (f >= 1) { destello(fx + 18, fy - 2, 2 + ri(Math.sin(t * 8)), BLA); } }
  // el lápiz rojo en la mano canónica (el brazo entra de abajo a la derecha)
  const [px, py] = tip, wx = px + 15, wy = py + 9;
  R.linea(ri(px), ri(py), ri(px + 13), ri(py + 8), H('#8a1a14')); R.linea(ri(px + 1), ri(py), ri(px + 14), ri(py + 8), ROJ); ps(px, py, H('#2a1a1a')); ps(px + 1, py + 1, H('#e8c898'));
  T.brazo(R, wx + 26, 200, wx, wy, TWEED, -1, { codo: [wx + 24, wy + 22] });
};

// ── P4 · el escritorio a ras de tablero: de la palabra rodeada sale una estampida de búfalos que cruza la mesa ──
const P4 = (t) => {
  capa('p4', () => {
    // la pared: papel pintado de rayas verde oscuro con un mapa enmarcado y la estantería al fondo
    for (let y = 0; y < 106; y++) for (let x = 0; x < 320; x++) { const st = (x % 12) < 6; R.pset(x, y, rmp(pal(['#1a2a22', '#22362c', '#2c4436', '#365240']), 1.6 + (st ? 0.5 : 0) + (h2(x >> 2, y >> 2, 41) - 0.5) * 0.6 - Math.abs(x - 140) / 260, x, y)); if (st && (y % 10) === 3 && (x % 12) === 3) R.pset(x, y, H('#4a6a54')); }
    R.rect(150, 24, 214, 70, H('#3a2418')); R.rect(152, 26, 212, 68, H('#6a4a2a')); R.rect(155, 29, 209, 65, H('#c8b890'));
    for (let y = 30; y < 65; y++) for (let x = 156; x < 209; x++) if (Math.sin(x * 0.12) * 6 + Math.cos(y * 0.2) * 5 + (x - 182) * 0.1 > 2) R.pset(x, y, H('#a8b880')); R.linea(160, 50, 200, 40, H('#4a6aa0')); R.linea(170, 32, 176, 62, H('#8a5a3a'));
    for (let b = 0; b < 3; b++) { const y = 44 + b * 30; R.rect(0, y + 26, 110, y + 29, H('#3a2416')); R.rect(0, y + 26, 110, y + 26, H('#6a4a2a'));
      for (let x = 2; x < 108;) { const w = 4 + ri(h2(x, b, 42) * 4), hh = 18 + ri(h2(x, b, 43) * 7), c = pal(['#5a1e1e', '#1e3a5a', '#3a4a1e', '#6a4a1a', '#2a2a3a'])[ri(h2(x, b, 44) * 4)];
        R.rect(x, y + 26 - hh, x + w - 1, y + 25, c); R.rect(x, y + 26 - hh, x, y + 25, mez(c, BLA, 0.25)); R.rect(x, y + 29 - hh, x + w - 1, y + 30 - hh, mez(c, AMA, 0.4)); x += w + 1; } }
    // el tablero de nogal (de lejos a cerca) y el canto
    for (let y = 106; y < 150; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(MAD, 2.2 + (y - 106) / 44 * 1.4 + Math.sin(x * 0.045 + Math.sin(x * 0.013 + y * 0.3) * 2.4) * 0.45 + (h2(x >> 2, y, 45) - 0.5) * 0.4, x, y));
    R.rect(0, 150, 319, 153, MAD[4]); R.rect(0, 150, 319, 150, H('#c89a62')); madera(0, 154, 319, 179, MAD, 12, 46); R.rect(130, 162, 190, 166, MAD[0]); R.rect(156, 163, 164, 164, H('#c8a048'));
    // el atril con la carta de pie
    R.linea(30, 132, 46, 84, MAD[0]); R.linea(31, 132, 47, 84, MAD[3]); R.rect(24, 120, 92, 124, MAD[1]); R.rect(24, 120, 92, 120, MAD[4]);
    // el cubilete de lápices
    R.rect(206, 106, 220, 132, K); R.rect(207, 107, 219, 132, H('#2a4a6a')); R.rect(207, 107, 208, 132, H('#4a6a8a'));
  });
  // la luz del flexo (fuera de cuadro, arriba) en un óvalo sobre el tablero
  for (let y = 106; y < 150; y++) for (let x = 40; x < 300; x++) { const d = Math.hypot((x - 168) / 130, (y - 130) / 26); if (d < 1) tine(x, y, H('#ffd890'), 0.28 * (1 - d)); }
  // la carta en el atril con la palabra rodeada en rojo
  const C = carta(34, 54, 54, 66, 7, { paso: 5 }); const [w0, w1, wy] = C.fil[4][1];
  const ox = (w0 + w1) / 2, br = pop(t, TB.STAMPEDE, 0.3);
  for (let k = 0; k < 60; k++) { const p = k / 60 * Math.PI * 2; ps(ox + Math.cos(p) * ((w1 - w0) / 2 + 3), wy + Math.sin(p) * 3.5, ROJ); }
  if (br > 0) { R.halo(ox, wy, 10 + 3 * Math.sin(t * 9), pal(['#e8a040', '#ffe080']), 0.6 * Math.min(1, br) * (t < TB.STAMPEDE + 2.2 ? 1 : 0.3)); }
  // la taza de café que tiembla con la estampida (y salpica) y el calendario de mesa con su anilla
  const temb = t > TB.STAMPEDE + 1.0 && t < TB.STAMPEDE + 3.4 ? ri(Math.sin(t * 50)) : 0;
  R.rect(170 + temb, 112, 188 + temb, 134, K); R.rect(171 + temb, 113, 187 + temb, 134, BLA); R.rect(171 + temb, 113, 187 + temb, 115, H('#4a2a14')); R.rect(171 + temb, 116, 173 + temb, 133, H('#d8d4c8')); R.rect(188 + temb, 118, 192 + temb, 128, K); R.rect(189 + temb, 119, 190 + temb, 127, BLA);
  for (let k = 0; k < 5; k++) { const u = ((t * 0.4 + k / 5) % 1); tine(178 + Math.sin(u * 7 + k) * 3, 110 - u * 26, BLA, 0.55 * (1 - u)); }
  if (t > TB.STAMPEDE + 1.6) for (let k = 0; k < 4; k++) { const u = cl((t - TB.STAMPEDE - 1.6 - k * 0.15) / 0.5); if (u < 1) { ps(176 + k * 3 + u * 8 * (k % 2 ? 1 : -1), 112 - Math.sin(u * Math.PI) * 10, H('#6a3a1a')); } else tine(170 + k * 5, 136, H('#4a2a14'), 0.6); }
  for (let k = 0; k < 4; k++) { const lean = t > TB.STAMPEDE + 2.1 ? Math.min(6, (t - TB.STAMPEDE - 2.1) * 30) : 0; R.linea(209 + k * 3, 106, ri(208 + k * 3 + lean * (k % 2 ? 1 : 0.4)), 92 + (k % 2) * 3, pal(['#e8c040', '#c83a2a', '#3a8a4a', '#e8c040'])[k]); }
  // el calendario de mesa: «1822»; los búfalos lo sacuden y la hoja salta a «1830»
  const vuelta = tramo(t, TB.Y1830 - 0.35, TB.Y1830 + 0.05), sac = t > TB.Y1830 - 0.9 && t < TB.Y1830 ? ri(Math.sin(t * 60) * 1.4) : 0;
  const kx = 236 + sac; R.poligono([[kx, 136], [kx + 62, 136], [kx + 54, 116], [kx + 8, 116]], H('#3a2a20')); R.rect(kx + 4, 68, kx + 58, 120, K); R.rect(kx + 5, 69, kx + 57, 119, BLA); R.rect(kx + 5, 69, kx + 57, 80, ROJ); R.rect(kx + 5, 69, kx + 57, 70, ROJL);
  for (let i = 0; i < 6; i++) { R.rect(kx + 9 + i * 9, 64, kx + 11 + i * 9, 72, H('#8a8a94')); ps(kx + 10 + i * 9, 64, BLA); }
  for (let i = 0; i < 4; i++) R.rect(kx + 9, 106 + i * 3, kx + 53, 106 + i * 3, H('#d8d0c0'));
  if (vuelta < 1) R.numero('1822', kx + 31, 102, { tam: 16, centro: true });
  if (vuelta > 0) { R.numero('1830', kx + 31, 102, { tam: 16, centro: true }); if (vuelta < 1) { const hh = ri(40 * (1 - vuelta)); R.rect(kx + 5, 80, kx + 57, 80 + hh, BLA); R.rect(kx + 5, 80 + hh, kx + 57, 81 + hh, H('#b8b0a0')); } else if (t < TB.Y1830 + 0.8) destello(kx + 60, 84, 3, AMA); }
  // la estampida: los búfalos saltan de la palabra, caen al tablero y corren por tres carriles, levantando polvo
  for (let k = 0; k < 8; k++) { const t0 = TB.STAMPEDE + 0.05 + k * 0.24, u = t - t0; if (u < 0) continue;
    const lane = 130 + (k % 3) * 8, jx = Math.min(1, u / 0.45), x = jx < 1 ? lerp(ox - 6, 96, jx) : 96 + (u - 0.45) * (64 + (k % 3) * 8), y = jx < 1 ? lerp(wy - 4, lane, jx) - Math.sin(jx * Math.PI) * 14 : lane + (Math.floor(t * 12 + k) % 2);
    if (x > 330) continue;
    if (jx >= 1) for (let d = 1; d < 5; d++) { const dx = x - d * 7, r = 2.5 + d * 1.2; tineR(dx - r, lane + 4 - r, dx + r, lane + 5, H('#e8d0a0'), 0.4 / d); }
    bufalo(x - 4, y - 18, t, k); }
};

// ── P5 · el corcho de cerca: la carta y la página del folleto; la mano tiende hilos rojos entre sus frases gemelas ──
const P5 = (t) => {
  capa('p5', () => {
    for (let y = 0; y < 180; y++) for (let x = 266; x < 320; x++) R.pset(x, y, rmp(pal(['#b8a888', '#c8b898', '#d4c6a8']), 1.2 + ((x - 266) % 10 < 5 ? 0.4 : 0) + (h2(x >> 1, y >> 1, 51) - 0.5) * 0.3, x, y));
    R.rect(290, 96, 302, 112, H('#d8d0c0')); R.rect(290, 96, 302, 96, BLA); R.rect(294, 100, 298, 108, H('#a89880')); R.rect(295, 102, 297, 106, BLA);
    R.rect(4, 16, 268, 176, H('#3a2416')); madera(4, 16, 268, 20, MAD, 5, 52); madera(4, 172, 268, 176, MAD, 5, 53); R.rect(4, 16, 8, 176, MAD[3]); R.rect(264, 16, 268, 176, MAD[2]);
    for (let y = 21; y < 172; y++) for (let x = 9; x < 264; x++) { const v = 2 + (h2(x, y, 54) - 0.5) * 1.6 + (h2(x >> 3, y >> 3, 55) - 0.5) * 0.6; R.pset(x, y, rmp(pal(['#6a4422', '#8a5a2e', '#a8743c', '#c08a4a', '#d4a060']), v, x, y)); }
    // fotos, fichas con años, un recorte de mapa y notas pegadas
    const foto = (x0, y0, dib) => { sombraR(x0, y0, x0 + 30, y0 + 34, 2, 0.35); R.rect(x0, y0, x0 + 30, y0 + 34, H('#f0ece0')); R.rect(x0 + 3, y0 + 3, x0 + 27, y0 + 25, H('#3a4a5a')); dib(x0 + 3, y0 + 3); };
    foto(98, 26, (x, y) => { R.rect(x, y + 14, x + 24, y + 22, H('#5a6a3a')); R.rect(x + 5, y + 6, x + 19, y + 16, H('#8a5a40')); R.poligono([[x + 3, y + 7], [x + 12, y + 1], [x + 21, y + 7]], H('#5a3a30')); for (let i = 0; i < 3; i++) R.rect(x + 7 + i * 4, y + 9, x + 8 + i * 4, y + 11, AMA); });
    foto(228, 128, (x, y) => { R.rect(x, y, x + 24, y + 22, H('#8ab0d0')); R.poligono([[x, y + 22], [x + 9, y + 6], [x + 15, y + 14], [x + 20, y + 8], [x + 24, y + 22]], H('#5a6a8a')); R.rect(x, y + 18, x + 24, y + 22, H('#4a6a3a')); });
    const ficha = (x0, y0, n, c) => { sombraR(x0, y0, x0 + 36, y0 + 20, 2, 0.3); R.rect(x0, y0, x0 + 36, y0 + 20, H('#f4f0e4')); R.rect(x0, y0 + 4, x0 + 36, y0 + 4, H('#e08080')); for (let i = 0; i < 3; i++) R.rect(x0, y0 + 9 + i * 4, x0 + 36, y0 + 9 + i * 4, H('#a8c0d8')); cifras(n, x0 + 6, y0 + 8, c, null, 2); };
    ficha(98, 98, '1822', H('#2a3a8a')); ficha(222, 30, '1885', H('#2a3a8a'));
    R.rect(102, 70, 120, 88, H('#f0e070')); R.rect(102, 70, 120, 71, H('#d8c850')); R.icono('?', 108, 74, ROJ, H('#d8c850'), 1);
    R.rect(130, 140, 150, 158, H('#a0e0a0')); cifras('3', 137, 146, H('#2a4a2a'), null, 1);
    R.rect(236, 70, 258, 92, H('#e8dcc0')); for (let i = 0; i < 4; i++) R.linea(238, 72 + i * 5, 256, 74 + i * 5, H('#6a8ab0'));
  });
  // la carta de Beale (izquierda) y la página del folleto (derecha), clavadas con chinchetas
  const C = carta(20, 58, 66, 106, 11, { paso: 7 }), F = paginaFolleto(152, 64, 66, 102, 12);
  const pin = (x, y, c) => { R.disco(x + 1, y + 2, 2, H('#3a2414')); R.disco(x, y, 2, c); ps(x - 1, y - 1, BLA); };
  pin(53, 60, ROJ); pin(185, 66, H('#3a6ac8'));
  // las frases gemelas y los hilos rojos que la mano tiende entre ellas (dos hilos: «compared» y «the rest of the pamphlet»)
  const pares = [[C.fil[8][1], F.fil[12][1], TB.COMPARED - 0.5, TB.COMPARED + 0.9], [C.fil[10][2], F.fil[17][2], TB.REST - 0.6, TB.PAMPH1 + 0.4]];
  let mano = [140, 196], lleva = false;
  pares.forEach(([a, b, t0, t1], i) => { const A = [(a[0] + a[1]) / 2, a[2]], B = [(b[0] + b[1]) / 2, b[2]], u = tramo(t, t0, t1);
    if (u <= 0) { if (i === 0 || t > pares[i - 1][3] + 0.1) mano = i === 0 ? [lerp(140, A[0], ease(tramo(t, TB.AND2, t0))), lerp(196, A[1], ease(tramo(t, TB.AND2, t0)))] : [lerp(pares[0][1][0], A[0], ease(tramo(t, pares[0][3], t0))), lerp(pares[0][1][2] + 30, A[1], ease(tramo(t, pares[0][3], t0)))]; return; }
    const P = [lerp(A[0], B[0], ease(u)), lerp(A[1], B[1], ease(u)) - Math.sin(u * Math.PI) * 6];
    if (u < 1) { mano = P; lleva = true; }
    else if (i === 1 || t < pares[1][2]) mano = [B[0] + 4, B[1] + 4 + (t - t1) * 20];
    for (const [w, c] of [[a, a], [b, b]]) if (u >= (w === a ? 0 : 1)) tineR(w[0][0] ?? w[0], w[2] - 2, w[1], w[2] + 1, H('#ffe040'), 0.45);
    // el hilo: una catenaria de A a P que cuelga un poco, con su sombra en el corcho
    const n = 60; for (let k = 0; k <= n; k++) { const s = k / n, x = lerp(A[0], P[0], s), y = lerp(A[1], P[1], s) + Math.sin(s * Math.PI) * (u < 1 ? 7 : 4); tine(x + 1, y + 3, K, 0.35); ps(x, y, k % 4 ? ROJ : ROJL); ps(x, y + 1, H('#7a1414')); }
    pin(ri(A[0]), A[1] - 1, H('#e8c040')); if (u >= 1) { pin(ri(B[0]), B[1] - 1, H('#e8c040')); if (t < t1 + 0.5) destello(ri(B[0]) + 5, B[1] - 5, 2, AMA); } });
  // la mosca de la luz que pasea por el corcho y la nota que tiembla con el aire
  ps(60 + ((t * 9) % 180), 160 - Math.abs(Math.sin(t * 0.7)) * 12, K);
  const nt = Math.sin(t * 5) > 0.7 ? 1 : 0; R.rect(228, 98 - nt, 252, 116, H('#f4b0c8')); R.rect(228, 98 - nt, 252, 99 - nt, H('#d890a8')); cifras('1820', 232, 105, H('#6a2a3a'));
  // la mano canónica con el brazo desde abajo (lleva el cabo del hilo)
  const [mx, my] = mano; if (my < 190) T.brazo(R, mx + 14, 200, mx - 3, my + 3, TWEED, -1, { codo: [mx + 20, my + 24] });
};

// ── P6 · la pared a la luz de la vela: dos recortables con sus bocadillos de garabatos; la mano los junta en una sola sombra ──
const P6 = (t) => {
  capa('p6', () => {
    for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { const st = (x % 16) < 2; let v = 1.6 + (st ? -0.4 : 0) + (h2(x >> 2, y >> 2, 61) - 0.5) * 0.4; if ((x % 16) === 8 && (y % 14) === 6) v += 0.8; R.pset(x, y, rmp(pal(['#3a2a22', '#5a4030', '#74543c', '#8e6a4a']), v, x, y)); }
    R.rect(0, 20, 319, 22, MAD[1]); R.rect(0, 20, 319, 20, MAD[3]);
    R.rect(14, 34, 48, 60, H('#6a4a1a')); R.rect(16, 36, 46, 58, H('#e8e0c8')); R.disco(31, 51, 3, ROJ); for (let i = 0; i < 3; i++) R.rect(20, 40 + i * 3, 42, 40 + i * 3, H('#8a8070'));
    R.rect(258, 56, 286, 80, H('#5a3a1a')); R.rect(260, 58, 284, 78, H('#8ab0c8')); R.rect(260, 72, 284, 78, H('#3a6a8a')); R.poligono([[270, 70], [272, 60], [278, 70]], BLA); R.linea(272, 60, 272, 71, H('#3a2a1a')); R.rect(266, 71, 280, 72, H('#6a3a1a'));
    R.rect(0, 88, 319, 90, MAD[2]); R.rect(0, 88, 319, 88, MAD[4]); for (let x = 0; x < 320; x++) for (let y = 91; y < 120; y++) R.pset(x, y, rmp(MAD, 1.6 + ((x % 30) < 1 ? -0.8 : (x % 30) === 1 ? 0.8 : 0) + (h2(x >> 2, y, 63) - 0.5) * 0.5, x, y));
    // el tablero del escritorio, el canto y el frente con su cajón
    for (let y = 120; y < 150; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(MAD, 2 + (y - 120) / 30 + Math.sin(x * 0.04 + Math.sin(x * 0.01 + y * 0.2) * 2) * 0.5, x, y));
    R.rect(0, 150, 319, 152, MAD[4]); madera(0, 153, 319, 179, MAD, 13, 62); R.rect(120, 160, 200, 175, MAD[0]); R.rect(121, 161, 199, 174, MAD[2]); R.rect(152, 166, 168, 168, H('#c8a048'));
    // libros apilados y el tintero
    for (let i = 0; i < 4; i++) { const c = pal(['#5a1e1e', '#1e3a5a', '#3a4a1e', '#6a4a1a'])[i]; R.rect(8 + i, 128 - i * 6, 46 - i * 2, 133 - i * 6, c); R.rect(8 + i, 128 - i * 6, 46 - i * 2, 128 - i * 6, mez(c, BLA, 0.3)); }
    R.rect(262, 124, 274, 136, K); R.rect(263, 125, 273, 136, H('#2a3a5a')); R.linea(268, 124, 282, 104, H('#e8e0d0'));
  });
  const fl = Math.sin(t * 13) * 0.6 + Math.sin(t * 7.3) * 0.4, L = [160 + fl * 0.6, 160], m = 2.0 + fl * 0.03, ES = 1.5;
  // la luz cálida de la vela sobre la pared
  for (let y = 0; y < 150; y += 1) for (let x = 0; x < 320; x += 1) { const d = Math.hypot(x - L[0], (y - L[1]) * 0.8); if (d < 170) tine(x, y, H('#ffcc80'), 0.22 * (1 - d / 170)); }
  // los dos recortables: Beale (con su chistera) a la izquierda y la voz del folleto (con bombín) a la derecha
  const u = tramo(t, TB.TWO, TB.ONE), xa = lerp(112, 160, ease(u)), xb = lerp(214, 172, ease(u)), hecho = t > TB.ONE;
  const forma = (lx, ly, x, y, gorro) => { const dx = lx - x, dy = ly - y, ax = Math.abs(dx); if (dy < -26 || dy > 0) return false;
    if (dy > -4) return ax < 4.5;                                          // el pie de las piernas
    if (dy > -11) return ax < 5.6 - (dy < -9 ? (-9 - dy) * 0.9 : 0);         // el tronco con los hombros redondos
    if (dy > -13) return ax < 1.6;                                         // el cuello
    if (Math.hypot(dx - 0.6, dy + 16) < 3.5 || (dy > -16 && dy < -14 && dx > 2 && dx < 4.6)) return true;   // la cabeza con su nariz
    if (gorro === 'copa') return (dy >= -26 && dy < -19 && ax < 3) || (dy === -19 && ax < 5.5);
    return (dy >= -22 && dy < -19 && ax < 3.6 - (dy < -21 ? 1 : 0)) || (dy === -19 && ax < 5.2); };
  const rec = hecho ? [[166, 'bombin']] : [[xa, 'copa'], [xb, 'bombin']];
  // las sombras en la pared, agrandadas desde la vela (las dos se juntan en una sola, la de Ward)
  for (let y = 4; y < 122; y++) for (let x = 0; x < 320; x++) { const lx = L[0] + (x - L[0]) / m, ly = L[1] + (y - L[1]) / m;
    if (rec.some(([cx, g]) => forma(cx + (lx - cx) / ES, 136 + (ly - 136) / ES, cx, 136, g))) tine(x, y, H('#1a0e0a'), hecho ? 0.78 : 0.62); }
  // los bocadillos de garabatos: renglones largos y la misma manía (un rasgo rojo) en los dos
  const boc = (bx, by, w, k, rojo, lado) => { R.rect(bx - 1, by - 1, bx + w + 1, by + 31, K); R.rect(bx, by, bx + w, by + 30, H('#f4ecd8')); R.rect(bx, by + 30, bx + w, by + 30, H('#c8bc9c'));
    const qx = lado < 0 ? bx - 1 : bx + w + 1; for (let i = 0; i < 6; i++) { const xx = qx + lado * i, h0 = by + 18 + ri(i * 0.9), h1 = by + 25 - ri(i * 0.4); if (h1 >= h0) { R.rect(xx, h0, xx, h1, H('#f4ecd8')); ps(xx, h0 - 1, K); ps(xx, h1 + 1, K); } else ps(xx, h0, K); }
    for (let j = 0; j < 4; j++) renglon(bx + 3, by + 5 + j * 6, bx + w - 3 - (j === 3 ? 10 : 0), TIN, k + j);
    if (rojo) { const s = Math.sin(t * 8) > 0 ? ROJL : ROJ; for (let j = 0; j < 4; j += 2) { const yy = by + 5 + j * 6, xx = bx + w - 9; R.linea(xx, yy + 1, xx + 2, yy - 2, s); R.linea(xx + 2, yy - 2, xx + 4, yy + 1, s); R.linea(xx + 4, yy + 1, xx + 6, yy - 2, s); } } };
  const rojo = t > TB.HABITS - 0.1, ent = pop(t, TB.WITH + 0.1, 0.4);
  if (!hecho && ent > 0) { const sep = ease(tramo(t, TB.TWO + 0.4, TB.ONE)), y = ri(44 - (1 - Math.min(1, ent)) * 6); boc(ri(lerp(90, 108, sep)), y, 60, 70, rojo, -1); boc(ri(lerp(170, 150, sep)), y, 60, 76, rojo, 1); }
  if (hecho) { const g = pop(t, TB.ONE, 0.35); boc(196, 40, ri(48 + 26 * g), 70, true, -1); if (t < TB.ONE + 0.6) for (let k = 0; k < 6; k++) destello(ri(172 + Math.cos(k) * 40 * g), ri(66 + Math.sin(k) * 24 * g), 2, AMA); if (t > TB.SAME) globo(140, 52, '!', pop(t, TB.SAME, 0.25), ROJ, 2); }
  // los recortables de cartulina negra en sus pies de madera (sobre el tablero), con la mano que empuja el de Beale
  const fo = (x, y, cx, g) => forma(cx + (x - cx) / ES, 136 + (y - 136) / ES, cx, 136, g);
  for (const [cx, g] of rec) { const X = ri(cx); R.rect(X - 9, 136, X + 9, 139, MAD[0]); R.rect(X - 9, 136, X + 9, 136, MAD[4]);
    for (let y = 94; y < 137; y++) for (let x = X - 10; x <= X + 10; x++) if (fo(x, y, cx, g)) R.pset(x, y, fo(x - 1, y, cx, g) ? H('#1e1a1c') : H('#5a5458')); }
  // la vela en primer término (llama que tiembla) y la polilla que da vueltas (con su sombra grande en la pared)
  const mx = 160 + Math.cos(t * 2.3) * 26, my = 118 + Math.sin(t * 3.1) * 10; ps(mx, my, H('#c8b8a0')); ps(mx - 1, my - Math.sign(Math.sin(t * 30)), H('#a89880')); ps(mx + 1, my - Math.sign(Math.sin(t * 30)), H('#a89880'));
  tineR(L[0] + (mx - L[0]) * m - 3, L[1] + (my - L[1]) * m - 2, L[0] + (mx - L[0]) * m + 3, L[1] + (my - L[1]) * m + 1, H('#1a0e0a'), 0.4);
  R.rect(155, 162, 165, 180, H('#f0e8d0')); R.rect(155, 162, 156, 180, BLA); R.rect(164, 162, 165, 180, H('#c8c0a8')); R.rect(150, 176, 170, 179, H('#c8a048'));
  R.halo(160, 156, 9, pal(['#e8a040', '#ffd070', '#fff0b0']), 0.9); R.rect(159, 153 + ri(fl), 161, 160, H('#ffd070')); ps(160, 152 + ri(fl), BLA); ps(160, 161, K);
  // la mano canónica entra por la izquierda y empuja el recortable de Beale hasta juntarlo con el otro
  if (u > 0 && t < TB.ONE + 0.7) { const back = t > TB.ONE ? ease(tramo(t, TB.ONE, TB.ONE + 0.7)) : 0, hx = lerp(xa - 24, -24, back), hy = 128; T.brazo(R, hx - 34, 150, hx, hy, TWEED, 1, { codo: [hx - 18, hy + 10] }); }
  else if (t < TB.TWO) { const v = ease(tramo(t, TB.TWO - 0.8, TB.TWO)), hx = lerp(-24, 88, v); if (v > 0) T.brazo(R, hx - 34, 150, hx, 128, TWEED, 1, { codo: [hx - 18, 138] }); }
};

// ── P7 · la mesa del estudio de Atom: la silueta única se vuelve Ward, que firma la cubierta del folleto ──
const O7 = { camara: 'mesa' };
const P7 = (t) => {
  T.estudio(R, t, O7);
  const fx = 190, f = T.d_folleto(R, fx, 116, { escala: 3, t, brillo: t > TB.NAME + 0.6 ? 0.5 + 0.5 * Math.sin(t * 4) : 0 });
  // la firma de Ward: un rasgo de tinta que crece en la cubierta, abajo (sin letras)
  const fu = tramo(t, TB.PUT, TB.NAME + 0.5), sx0 = fx - 18, sy = 140;
  if (fu > 0) { const n = ri(36 * fu); for (let i = 0; i < n; i++) { const yy = sy + Math.round(Math.sin(i * 0.9) * 2 + (i % 7 === 3 ? -2 : 0)); ps(sx0 + i, yy, TIN); ps(sx0 + i, yy + 1, mez(TIN, H('#e8c860'), 0.4)); } if (fu >= 1) { R.linea(sx0, sy + 4, sx0 + 34, sy + 4, TIN); } }
  // la peana redonda y la figurita: primero la silueta negra de cartulina; en «Ward» gira y sale Ward a color
  const bx = 132; R.rect(bx - 10, 148, bx + 10, 151, MAD[0]); R.rect(bx - 10, 148, bx + 10, 148, MAD[4]); R.rect(bx - 9, 149, bx + 9, 150, MAD[2]);
  const giro = tramo(t, TB.WARD - 0.25, TB.WARD + 0.2), anda = tramo(t, TB.MAN, TB.PUT - 0.05), wx = ri(lerp(bx - 7, 150, ease(anda)));
  if (giro < 0.5) { const sc = 1 - giro * 2; for (let y = 120; y < 148; y++) for (let x = bx - 8; x <= bx + 8; x++) { const dx = (x - bx) / Math.max(0.08, sc), dy = 148 - y;
      if ((dy < 14 && Math.abs(dx) < 4 + (14 - dy) * 0.25) || Math.hypot(dx, dy - 17) < 4 || (dy >= 21 && dy < 25 && Math.abs(dx) < 3.4) || (dy === 21 && Math.abs(dx) < 5.5)) R.pset(x, y, Math.abs(dx) > 3 ? H('#3a3438') : H('#1a1618')); } }
  else { const a = R.actor(BL.wardBL, wx, 148, t, { dir: 1, anda: anda > 0 && anda < 1, sostiene: t > TB.PUT - 0.1 && t < TB.PAMPH2 ? [sx0 + ri(36 * fu), sy - 1] : undefined, sonrisa: t > TB.PAMPH2 - 0.2, brazos: t > TB.PAMPH2 + 0.3 && t < TB.PAMPH2 + 1.0 });
    if (a && a.mano && t > TB.PUT - 0.1 && t < TB.PAMPH2) { const [mx, my] = a.mano; R.linea(mx, my, mx - 3, my - 9, H('#f0f0e8')); R.linea(mx - 1, my - 1, mx - 4, my - 8, H('#c8c0b0')); ps(mx + 1, my + 1, TIN); } }
  if (giro > 0 && giro < 1) { R.halo(bx, 134, 16, pal(['#e8a040', '#ffe080', '#fff8d0']), 1 - Math.abs(giro - 0.5) * 2); }
  if (t > TB.WARD && t < TB.WARD + 0.8) for (let k = 0; k < 5; k++) destello(ri(bx + Math.cos(k * 1.3 + t * 3) * 16), ri(132 + Math.sin(k * 1.3 + t * 3) * 14), 2, AMA);
};

// ── P8 · el archivo del condado (1982): Nickell trae un libro de registros y lo deja caer en la mesa (golpe) ──
const P8 = (t) => {
  capa('p8', () => {
    for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#4a4a44', '#5e5e56', '#72726a', '#868678']), 1.8 + (h2(x >> 2, y >> 2, 71) - 0.5) * 0.5 - y / 260, x, y));
    R.rect(0, 0, 319, 7, H('#3a3a36')); for (const x0 of [30, 186]) { R.rect(x0, 7, x0 + 80, 10, H('#a8a89c')); R.rect(x0 + 2, 8, x0 + 78, 9, H('#f4f4ec')); }
    // tres cuerpos de estanterías llenas de libros de registro con su tejuelo y su cifra
    for (const [x0, x1] of [[0, 98], [108, 210], [220, 319]]) { R.rect(x0, 14, x1, 118, H('#2a1a10'));
      for (let b = 0; b < 5; b++) { const y = 18 + b * 20; R.rect(x0, y + 17, x1, y + 19, MAD[3]); R.rect(x0, y + 17, x1, y + 17, MAD[4]);
        for (let x = x0 + 3; x < x1 - 4;) { const w = 6 + ri(h2(x, b, 72) * 3), hh = 13 + ri(h2(x, b, 73) * 3), c = pal(['#5a2a1e', '#3a2a1a', '#2a3a2a', '#4a3220', '#2a2a3a', '#6a4a2a'])[ri(h2(x, b, 74) * 5)];
          R.rect(x, y + 17 - hh, x + w - 1, y + 16, c); R.rect(x, y + 17 - hh, x, y + 16, mez(c, BLA, 0.2)); R.rect(x + w - 1, y + 17 - hh, x + w - 1, y + 16, mez(c, K, 0.4));
          R.rect(x + 1, y + 20 - hh, x + w - 2, y + 23 - hh, H('#d8c8a0')); ps(x + 2, y + 21 - hh, H('#4a3a2a')); ps(x + w - 3, y + 22 - hh, H('#4a3a2a'));
          R.rect(x + 1, y + 13, x + w - 2, y + 13, H('#c8a048')); x += w + (h2(x, b, 75) > 0.85 ? 4 : 1); } } }
    // la escalera de biblioteca apoyada en su barra
    R.rect(0, 12, 319, 13, H('#8a8a80')); R.linea(196, 12, 208, 118, H('#5a3a1e')); R.linea(206, 12, 218, 118, H('#5a3a1e')); for (let y = 22; y < 118; y += 12) R.linea(197 + (y - 12) * 0.113, y, 207 + (y - 12) * 0.113, y, H('#7a5a32'));
    // el suelo de linóleo con brillos
    for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#4a3a2a', '#5e4a36', '#725a42', '#866c50']), 1.4 + ((Math.floor(x / 24) + Math.floor((y - 118) / 12)) & 1) * 0.5 + (y - 118) / 90 + (h2(x >> 1, y, 76) - 0.5) * 0.4, x, y));
    R.rect(0, 118, 319, 119, H('#2a1e14'));
    R.rect(24, 150, 40, 168, K); R.rect(25, 151, 39, 168, H('#4a5a4a')); for (let x = 27; x < 39; x += 3) R.rect(x, 152, x, 167, H('#6a7a6a')); R.rect(27, 147, 33, 151, H('#e8e0c8'));
    R.rect(232, 112, 300, 150, K); R.rect(233, 113, 299, 150, MAD[2]); R.rect(233, 113, 299, 114, MAD[4]);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) { const x = 236 + i * 11, y = 117 + j * 8; R.rect(x, y, x + 8, y + 6, MAD[3]); R.rect(x, y, x + 8, y, MAD[4]); R.rect(x + 3, y + 3, x + 5, y + 4, H('#c8a048')); R.rect(x + 2, y + 1, x + 6, y + 2, H('#e8dcc0')); }
  });
  // un fluorescente que parpadea y las motas de polvo
  if (Math.sin(t * 23) * Math.sin(t * 3.7) > 0.6) R.rect(188, 8, 264, 9, H('#8a8a80'));
  motas(20, 20, 300, 150, t, 18, H('#f0e8c8'));
  // el archivero pasa al fondo empujando el carro de libros
  const ax = ri(lerp(-30, 340, tramo(t, TB.ADD, TB.WASH + 0.3)));
  R.actor(EL.archivista ?? EL.oficinista, ax, 128, t, { dir: 1, anda: true }); R.rect(ax + 16, 112, ax + 40, 124, H('#5a5a62')); for (let i = 0; i < 5; i++) R.rect(ax + 17 + i * 5, 104, ax + 20 + i * 5, 112, pal(['#5a2a1e', '#2a3a2a', '#4a3220', '#2a2a3a', '#6a4a2a'])[i]); R.disco(ax + 19, 126, 2, K); R.disco(ax + 37, 126, 2, K);
  // los respaldos de las sillas que asoman tras la mesa
  for (const x of [92, 132]) { R.rect(x, 112, x + 14, 130, K); R.rect(x + 1, 113, x + 13, 115, MAD[3]); for (let i = 0; i < 3; i++) R.rect(x + 2 + i * 4, 116, x + 3 + i * 4, 130, MAD[2]); }
  // la mesa de lectura con la lámpara verde
  R.rect(56, 130, 204, 136, K); madera(57, 130, 203, 135, MAD, 6, 77); R.rect(57, 130, 203, 130, MAD[4]); R.rect(60, 136, 64, 172, MAD[0]); R.rect(196, 136, 200, 172, MAD[0]); R.rect(56, 137, 204, 141, MAD[1]);
  for (let x = 56; x < 205; x++) tine(x, 173, K, 0.3);
  R.rect(74, 126, 82, 129, H('#c8a048')); R.rect(77, 112, 79, 126, H('#c8a048')); R.poligono([[66, 112], [90, 112], [86, 104], [70, 104]], H('#1e5a3a')); R.linea(70, 104, 86, 104, H('#4a9a6a'));
  for (let y = 113; y < 130; y++) { const w = 12 + (y - 113) * 0.9; for (let x = ri(78 - w); x <= 78 + w; x++) tine(x, y, H('#fff0b0'), 0.12); }
  // el libro: Nickell lo trae, lo suelta en la mesa en el golpe y se abre
  const u = tramo(t, TB.ADD + 0.1, TB.GOLPE - 0.6), nx = ri(lerp(300, 208, ease(u))), cae = t >= TB.GOLPE - 0.05, abre = tramo(t, TB.GOLPE + 0.3, TB.GOLPE + 0.8);
  const n = R.actor(BL.nickellBL, nx, 156, t, { dir: -1, anda: u > 0 && u < 1, sostiene: cae ? undefined : [nx - 6, 128 - ri(Math.max(0, tramo(t, TB.GOLPE - 0.6, TB.GOLPE - 0.15)) * 8)], dedo: t > TB.MORRIS && t < TB.SHOWUP + 0.4, habla: t > TB.MORRIS && parp(t, 7), sorpresa: t > TB.SHOWUP });
  const libro = (x, y, ab) => { if (ab <= 0) { R.rect(x - 16, y - 7, x + 16, y, K); R.rect(x - 15, y - 6, x + 15, y - 1, H('#6a2a1e')); R.rect(x - 15, y - 6, x + 15, y - 6, H('#9a4a32')); R.rect(x - 15, y - 2, x + 15, y - 1, H('#e8dcc0')); R.rect(x - 15, y - 6, x - 12, y - 4, H('#c8a048')); R.rect(x + 12, y - 6, x + 15, y - 4, H('#c8a048')); cifras('1823', x - 7, y - 6, H('#e8c860')); return; }
    R.rect(x - 30, y - 4, x + 30, y, K); R.rect(x - 29, y - 4, x - 1, y - 1, H('#ece2c8')); R.rect(x + 1, y - 4, x + 29, y - 1, H('#e2d6b8')); R.rect(x - 29, y, x + 29, y, H('#6a2a1e'));
    for (let i = 0; i < 4; i++) { R.rect(x - 27, y - 3 + (i % 2), x - 3, y - 3 + (i % 2), H('#8a7a60')); } for (let i = 0; i < 2; i++) R.rect(x + 3, y - 3 + i, x + 27, y - 3 + i, H('#8a7a60')); };
  if (!cae && n && n.mano) libro(n.mano[0] - 8, n.mano[1] + 2, 0);
  if (cae) { libro(156, 130, abre); if (t < TB.GOLPE + 0.9) { const p = tramo(t, TB.GOLPE, TB.GOLPE + 0.9); for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI - Math.PI, r = 6 + p * 22; tineR(156 + Math.cos(a) * r - 2, 126 + Math.sin(a) * r * 0.5 - 2, 156 + Math.cos(a) * r + 2, 126 + Math.sin(a) * r * 0.5 + 1, H('#d8ccb0'), 0.5 * (1 - p)); } } }
  if (t > TB.SHOWUP) globo(nx + 8, 120, '?', pop(t, TB.SHOWUP, 0.3), ROJ, 2);
};

// ── P9 · el lector de microfilm (cámara de cerca): las filas del registro corren y se paran en 1823, la de Morriss ──
const P9 = (t) => {
  capa('p9', () => {
    for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#5a6a5a', '#6e7e6c', '#82927e', '#96a690']), 1.8 + (h2(x >> 2, y >> 2, 81) - 0.5) * 0.4 + ((x % 40) < 2 ? -0.6 : 0), x, y));
    R.rect(272, 52, 312, 104, H('#c8b8a0')); R.rect(274, 54, 310, 102, H('#e8dcc8')); for (let i = 0; i < 6; i++) R.rect(278, 60 + i * 7, 306 - (i % 3) * 6, 61 + i * 7, H('#7a8aa0'));
    for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#6a5a48', '#82705a', '#9a866c', '#b09a7e']), 2 + (y - 140) / 40 + (h2(x >> 3, y, 82) - 0.5) * 0.3, x, y));
    R.rect(0, 140, 319, 141, H('#c8b498'));
    // el cuerpo beige de la máquina, la capucha de la pantalla, la bandeja del rollo y los mandos
    R.rect(48, 22, 262, 152, K); R.rect(50, 24, 260, 150, H('#c8bca0')); R.rect(50, 24, 260, 26, H('#e4dac0')); R.rect(258, 26, 260, 150, H('#9a8e74'));
    R.rect(66, 30, 244, 124, H('#3a3630')); R.rect(70, 34, 240, 120, H('#1a1a1c'));
    R.rect(60, 128, 250, 146, H('#a89c82')); R.rect(60, 128, 250, 128, H('#d8ccb0'));
    for (const x of [72, 88]) { R.disco(x, 137, 4, K); R.disco(x, 137, 3, H('#4a4a4a')); ps(x - 1, 135, H('#9a9a9a')); }
    R.rect(110, 133, 200, 141, H('#4a463e')); R.rect(112, 135, 198, 139, H('#2a2622'));
    R.rect(214, 134, 222, 140, H('#3a8a3a')); ps(216, 136, H('#8af08a'));
    // el café en su vaso de papel y el bloc
    R.rect(276, 126, 290, 146, K); R.rect(277, 127, 289, 146, H('#f0ece0')); R.rect(277, 132, 289, 136, H('#c84a3a')); R.rect(18, 150, 44, 170, H('#f0e070')); for (let i = 0; i < 4; i++) R.rect(20, 154 + i * 4, 42, 154 + i * 4, H('#a8a050'));
  });
  // la pantalla: la hoja del registro (filas con su año y su nombre a pluma) que sube hasta dejar 1823 en el centro
  const sc = ease(tramo(t, TB.WASH + 0.05, TB.Y1823)), off = lerp(0, 60, sc) + (t < TB.Y1823 ? Math.sin(t * 40) * 0.3 : 0);
  R.recorte([71, 35, 239, 119]);
  for (let y = 35; y < 120; y++) for (let x = 71; x < 240; x++) ps(x, y, rmp(pal(['#202a28', '#2e3a36', '#3e4c46']), 1.2 + (h2(x >> 1, (y + ri(off)) >> 1, 83) - 0.5) * 0.4 + (1 - Math.abs(x - 155) / 90) * 0.6, x, y));
  for (let i = 0; i < 12; i++) { const yr = 1815 + i, y = 30 + i * 12 - ri(off), mor = yr >= 1823;
    if (y < 26 || y > 124) continue;
    R.linea(76, y + 9, 234, y + 9, H('#5a6a62')); cifras(String(yr), 80, y + 2, H('#d8e8d0'));
    renglon(102, y + 5, 150 + (i % 3) * 14, mor ? H('#f0f8e8') : H('#a8b8a8'), 100 + i * 3);
    if (mor) { R.icono('llave', 210, y + 1, H('#f0d060'), H('#202a28'), 1); } }
  const hi = pop(t, TB.Y1823, 0.3);
  if (hi > 0) { const y = 30 + 8 * 12 - 60; R.rect(74, y - 1, 236, y - 1, H('#f0d060')); R.rect(74, y + 11, 236, y + 11, H('#f0d060')); R.linea(74, y - 1, 74, y + 11, H('#f0d060')); R.linea(236, y - 1, 236, y + 11, H('#f0d060')); tineR(75, y, 235, y + 10, H('#f0d060'), 0.18 * hi);
    if (t > TB.EARLIEST) { for (let k = 0; k < 3; k++) { const yy = y - 12 - k * 12; R.linea(78, yy + 5, 232, yy + 5, ROJ); } } }
  R.recorte(null);
  // reflejo y brillo del cristal
  for (let k = 0; k < 40; k++) tine(150 + k, 36 + k * 0.4, BLA, 0.08); R.halo(155, 78, 90, pal(['#2a3a30', '#3e5446']), 0.15);
  // los dos carretes que giran al pasar la película
  for (const x of [126, 184]) { const a = t * (t < TB.Y1823 ? 14 : 0.4); R.disco(x, 137, 6, K); R.disco(x, 137, 5, H('#5a5a60')); R.disco(x, 137, 2, H('#2a2a2e')); for (let k = 0; k < 3; k++) { const b = a + k * 2.09; R.linea(x, 137, ri(x + Math.cos(b) * 4), ri(137 + Math.sin(b) * 4), H('#9a9aa4')); } }
  R.linea(132, 137, 178, 137, H('#3a3226'));
  // la mano canónica en la manivela de la derecha (da vueltas mientras corre la película)
  const g = t < TB.Y1823 ? t * 9 : TB.Y1823 * 9, hx = 270 + Math.cos(g) * 4, hy = 120 + Math.sin(g) * 4;
  R.rect(260, 116, 268, 124, K); R.rect(261, 117, 267, 123, H('#6a6a6a')); R.linea(264, 120, ri(hx), ri(hy), H('#3a3a3a'));
  T.brazo(R, hx + 24, 200, hx + 2, hy + 3, TWEED, -1, { codo: [hx + 30, hy + 36] });
};

// ── P10 · el mostrador del hotel Washington (cámara 'mostrador', 1820): el dedo baja por las filas y no encuentra a Beale ──
const O10 = { encuadre: 'posada', camara: 'mostrador', registro: 1 };
const P10 = (t) => {
  T.lynchburg(R, t, O10);
  // el dedo recorre las filas 1818, 1819, 1819 y se para en el hueco de 1820 (vacío, latiendo)
  const filas = [111, 119, 127, 135], tt = [TB.PAMPH3 + 0.3, TB.BEALE, TB.STAYING - 0.3, TB.Y1820 - 0.2];
  let fy = 196, fxp = 70; for (let i = 0; i < 4; i++) { const u = ease(tramo(t, tt[i] - 0.45, tt[i])); if (u > 0) { fy = i === 0 ? lerp(196, filas[0], u) : lerp(filas[i - 1], filas[i], u); fxp = i === 0 ? lerp(70, 104, u) : 104; } }
  const toque = t > TB.Y1820 && t < TB.Y1820 + 0.25 ? 1 : 0;
  T.lynchburgDelante(R, t, O10);
  if (fy < 190) T.brazo(R, fxp - 34, 206, fxp - 4 + toque, fy + 3, TWEED, 1, { codo: [fxp - 36, fy + 38] });
  if (t > TB.Y1820) { globo(150, 112, '?', pop(t, TB.Y1820, 0.3), ROJ, 2); }
};

// ── P11 · la galería de retratos de la sociedad histórica: no hay ningún Beale; su retrato se vuelve una silueta de papel ──
const PORT = [[52, 'senor1857', '64'], [120, 'profesor', '12'], [188, 'bealeBL', '?'], [256, 'estudioso', '81']];
const P11 = (t) => {
  capa('p11', () => {
    for (let y = 0; y < 104; y++) for (let x = 0; x < 320; x++) { const px = x % 16, py = y % 20, d = Math.abs(px - 8) + Math.abs(py - 10) * 0.8; R.pset(x, y, rmp(pal(['#3a1012', '#521a1c', '#6a2424', '#7e3030']), 1.6 + (d < 5 ? 0.7 : d < 6 ? -0.3 : 0) + (h2(x >> 2, y >> 2, 91) - 0.5) * 0.3 - (y < 30 ? (30 - y) / 40 : 0), x, y)); }
    R.rect(0, 26, 319, 28, H('#c8a048')); R.rect(0, 26, 319, 26, H('#f0d888'));
    madera(0, 104, 319, 132, MAD, 28, 92); for (let x = 6; x < 320; x += 40) { R.rect(x, 108, x + 32, 128, MAD[1]); R.rect(x + 1, 109, x + 31, 127, MAD[2]); R.rect(x + 1, 109, x + 31, 109, MAD[0]); R.rect(x + 1, 127, x + 31, 127, MAD[4]); }
    R.rect(0, 104, 319, 105, MAD[4]); R.rect(0, 131, 319, 132, MAD[0]);
    for (let y = 133; y < 180; y++) for (let x = 0; x < 320; x++) { const a = Math.floor((x + (y - 133) * 0.5) / 10), b = Math.floor((x - (y - 133) * 0.5) / 10); R.pset(x, y, rmp(MAD, 2 + ((a + b) & 1) * 0.8 + (y - 133) / 60 + (h2(a, b, 93) - 0.5) * 0.5, x, y)); }
  });
  // los cuatro retratos: marco dorado, fondo oscuro, la figura de cuerpo entero y la placa con su edad
  const sil = tramo(t, TB.BEALE2, TB.BEALE2 + 0.6), cuelga = ease(tramo(t, TB.VIRGINIA, TB.VIRGINIA + 0.5)) * (1 + 0.15 * Math.sin((t - TB.VIRGINIA) * 6) * Math.exp(-(t - TB.VIRGINIA) * 1.5));
  PORT.forEach(([cx, quien, edad], i) => { const x0 = cx - 18, y0 = 48, x1 = cx + 18, y1 = 100;
    R.halo(cx, y0 - 2, 22, pal(['#7e3030', '#9a4a3a']), 0.5); R.rect(cx - 8, y0 - 6, cx + 8, y0 - 4, H('#c8a048'));
    R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K); R.rect(x0, y0, x1, y1, H('#b08830')); R.rect(x0, y0, x1, y0 + 1, H('#f0d070')); R.rect(x0, y0, x0 + 1, y1, H('#e0b850')); R.rect(x0 + 1, y1 - 1, x1, y1, H('#7a5a1a'));
    const ix0 = x0 + 4, iy0 = y0 + 4, ix1 = x1 - 4, iy1 = y1 - 4;
    for (let y = iy0; y <= iy1; y++) for (let x = ix0; x <= ix1; x++) R.pset(x, y, rmp(pal(['#1a1a14', '#2a2a1e', '#3a3a28']), 1.2 + (1 - Math.hypot(x - cx, y - iy0 - 16) / 30) * 1.4, x, y));
    const def = BL[quien] ?? EL[quien] ?? EL.profesor;
    if (i === 2 && sil > 0) {
      // el retrato se vuelve una silueta de cartulina negra sobre crema (de perfil, con chistera), cortada de arriba abajo
      R.actor(def, cx - 7, iy1 - 1, t, { dir: 1, quieto: true });
      const corte = iy0 + (iy1 - iy0 + 6) * sil, lev = ri(2 * Math.min(1, cuelga)), ES2 = 1.45, base = iy1 - 1;
      const fs = (x, y) => SIL(cx + (x - cx) / ES2, base + (y - base) / ES2, cx, base, 'copa');
      for (let y = iy0; y <= Math.min(iy1, corte); y++) for (let x = ix0; x <= ix1; x++) R.pset(x, y, rmp(pal(['#c8b890', '#dccca4', '#ece0bc']), 1.4 + (h2(x, y, 95) - 0.5) * 0.7, x, y));
      for (let y = iy0; y <= Math.min(iy1, corte); y++) for (let x = ix0; x <= ix1; x++) if (fs(x, y)) { if (lev) tine(x + 1, y + 1, H('#5a4a30'), 0.6); }
      for (let y = iy0; y <= Math.min(iy1, corte); y++) for (let x = ix0; x <= ix1; x++) if (fs(x, y)) ps(x - lev, y - lev, fs(x - 1, y) && fs(x, y - 1) ? H('#141012') : H('#4a4448'));
      if (sil < 1) { const ty = ri(corte); R.linea(ix0, ty, ix1, ty, BLA); R.linea(ix1 - 3, ty - 2, ix1 + 1, ty + 2, H('#c8c8d0')); R.linea(ix1 - 3, ty + 2, ix1 + 1, ty - 2, H('#c8c8d0')); R.disco(ix1 - 3, ty - 2, 1, H('#c8c8d0')); R.disco(ix1 - 3, ty + 2, 1, H('#c8c8d0')); }
      if (cuelga > 0) { R.disco(cx, iy0 + 4, 1.5, ROJ); ps(cx - 1, iy0 + 3, ROJL); }
    } else R.actor(def, cx - 7, iy1 - 1, t, { dir: i < 2 ? 1 : -1, quieto: true });
    R.rect(cx - 9, y1 + 4, cx + 9, y1 + 10, H('#7a5a1a')); R.rect(cx - 8, y1 + 5, cx + 8, y1 + 9, H('#d8b048'));
    if (edad === '?') R.icono('?', cx - 2, y1 + 4, H('#3a2a10'), H('#e8c868'), 1); else cifras(edad, cx - (edad.length * 2) + 1, y1 + 5, H('#3a2a10'));
    // las cruces rojas de Nickell
    const xt = [TB.FOUND, TB.NO, null, TB.NO + 0.4][i]; if (xt && t > xt) { const p = pop(t, xt, 0.25); R.icono('X', cx + 10, y1 + 2, ROJ, K, p >= 0.6 ? 2 : 1); }
  });
  // el vigilante dormita en su silla (cabecea) y el cordón de terciopelo por delante
  R.rect(292, 140, 310, 144, MAD[1]); R.rect(306, 120, 310, 144, MAD[1]);
  R.actor(EL.guarda ?? EL.guardia, 293, 150 + (Math.sin(t * 1.3) > 0.7 ? 1 : 0), t, { dir: -1, habla: Math.sin(t * 0.8) > 0.9 });
  // Nickell recorre la galería con la lupa
  const ru = tramo(t, TB.AND3, TB.BEALE2 - 0.3), nx = ri(lerp(-14, 168, ease(ru))), mira = t > TB.BEALE2 - 0.3;
  const a = R.actor(BL.nickellBL, nx, 160, t, { dir: 1, anda: ru > 0 && ru < 1, sostiene: [nx + 18, 136], sorpresa: t > TB.BEALE2 && t < TB.VIRGINIA + 0.6, triste: t > TB.VIRGINIA + 0.6 });
  if (a && a.mano) AT.lupa(R, a.mano[0], a.mano[1], 1, 1);
  for (const x of [20, 110, 200, 290]) { R.rect(x - 2, 136, x + 2, 168, H('#8a6a1a')); R.rect(x - 1, 136, x - 1, 168, H('#e0c060')); R.disco(x, 135, 3, H('#c8a048')); R.rect(x - 4, 168, x + 4, 170, H('#6a4a10')); }
  for (let x = 20; x < 290; x++) { if ([110, 200].includes(x)) continue; const s = ((x - 20) % 90) / 90; const y = 140 + Math.sin(s * Math.PI) * 6; ps(x, y, H('#8a1a24')); ps(x, y + 1, H('#5a0e16')); ps(x, y - 1, H('#c83a44')); }
};

// ── P12 · el estudio de Nickell (1982): sobre el escritorio, un teatrillo; Nickell abre el telón y salen los títeres ──
const O12 = { encuadre: 'estudio82' };
const P12 = (t) => {
  T.buscadores(R, t, O12);
  const tel = ease(tramo(t, TB.SO, TB.SO + 1.1));
  R.actor(BL.nickellBL, 180, 146, t, { dir: 1, sostiene: t > TB.SO - 0.2 && t < TB.SO + 1.2 ? [202, 100 + ri(tel * 8)] : undefined, dedo: (t > TB.BOX - 0.1 && t < TB.BOX + 0.7) || (t > TB.INNK - 0.1 && t < TB.INNK + 0.7), sonrisa: t > TB.SO + 1.2, habla: t > TB.LITTLE && t < TB.AND4 && parp(t, 6) });
  T.buscadoresDelante(R, t, O12);
  const g = T.pausa(R, 236, 140, t, { cual: 'teatrillo', s: 1, telon: tel, numero: false });
  if (t > TB.SO - 0.2 && t < TB.SO + 1.2) R.linea(203, 100 + ri(tel * 8), 207, 90, H('#c8a048'));
  // el foco sobre cada títere cuando la voz lo nombra
  for (const [a, dx] of [[TB.BOX, -11], [TB.INNK, 0]]) { const p = pop(t, a, 0.3); if (p > 0 && t < a + 1.4) { R.halo(236 + dx, 112, 9, pal(['#e8c060', '#fff0a0']), 0.6 * Math.min(1, p)); R.icono('!', 236 + dx - 1, 84 - ri(Math.min(1, p) * 3), ROJ, K, 1); } }
  // la ayudante entra con su taza de café y se queda mirando la función
  const u = tramo(t, TB.FOR + 0.1, TB.SO - 0.2), ax = ri(lerp(-16, 76, ease(u)));
  const a = R.actor(BL.alumna2BL, ax, 150, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [ax + 15, 134], sorpresa: t > TB.SO + 0.6 && t < TB.BOX, sonrisa: t > TB.BOX });
  if (a && a.mano) { const [mx, my] = a.mano; R.rect(mx - 1, my - 5, mx + 3, my, K); R.rect(mx, my - 4, mx + 2, my - 1, BLA); R.rect(mx, my - 4, mx + 2, my - 4, H('#5a3a20')); tine(mx + 1 + Math.sin(t * 3), my - 7 - (t * 4) % 4, BLA, 0.5); }
};

// ── P13 · el teatrillo de cerca sobre el escritorio: el amigo sin nombre, el público de papel y el aplauso del final ──
const P13 = (t) => {
  T.estudio(R, t, O3);
  const g = T.pausa(R, 160, 164, t, { cual: 'teatrillo', s: 2, telon: 1, numero: false });
  const p = pop(t, TB.NAMELESS, 0.3);
  if (p > 0) { R.halo(182, 120, 14, pal(['#e8c060', '#fff0a0']), 0.55 * Math.min(1, p)); globo(182, ri(100 - Math.min(1, p) * 4), '?', p, ROJ, 2); }
  if (t > TB.CHAR) for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + t * 1.5; if (Math.sin(t * 6 + k) > 0) destello(ri(160 + Math.cos(a) * 64), ri(110 + Math.sin(a) * 50), 2, AMA); }
  // el público: siluetas de cartulina con su pie de madera, en primer término; en «tale» aplauden
  const apl = t > TB.TALE - 0.15;
  for (let k = 0; k < 7; k++) { const x = 96 + k * 22 + (k % 2) * 3, b = 180 - (k % 2) * 2, sal = ri(Math.max(0, Math.sin(t * 3 + k * 1.7)) * 1.2) + (apl ? ri(Math.abs(Math.sin(t * 12 + k)) * 2) : 0), c = k % 2 ? H('#1e1a1c') : H('#2a2428');
    R.disco(x, b - 14 - sal, 5, c); R.rect(x - 7, b - 9 - sal, x + 7, b, c); if (k === 3) { R.rect(x - 4, b - 22 - sal, x + 4, b - 19 - sal, c); }
    R.linea(x - 5, b - 18 - sal, x - 3, b - 19 - sal, H('#5a5058'));
    if (apl) { const f = Math.floor(t * 10 + k) % 2; R.linea(x - 6, b - 8 - sal, x - 3 + f, b - 15 - sal, c); R.linea(x + 6, b - 8 - sal, x + 3 - f, b - 15 - sal, c); } }
  if (apl) for (let k = 0; k < 4; k++) { const u = ((t - TB.TALE) * 1.2 + k / 4) % 1; R.icono('!', ri(110 + k * 30), ri(150 - u * 18), AMA, K, 1); }
};
'''

NICKELL = r'''
T.rodar(E, R, [[0, P1], [TB.P2, P2], [TB.AND1, P3], [TB.LIKE, P4], [TB.AND2, P5], [TB.WITH, P6], [TB.THAT, P7], [TB.ADD, P8],
  [TB.WASH, P9], [TB.PAMPH3, P10], [TB.AND3, P11], [TB.FOR, P12], [TB.AND4, P13]], {
  cartela: '1982',
  efectos: [[0.8, 'coche'], [TB.Y1982, 'interruptor'], [TB.SUSPECT, 'golpecito'], [TB.WORDS, 'lapiz'], [TB.WORDS + 0.92, 'lapiz'], [TB.ENGLISH, 'lapiz'], [TB.Y1822, 'brillo'],
    [TB.STAMPEDE, 'avalancha'], [TB.Y1830, 'papel'], [TB.COMPARED + 0.9, 'toc'], [TB.PAMPH1 + 0.4, 'toc'], [TB.TWO, 'papel'], [TB.ONE, 'brillo'],
    [TB.WARD, 'brillo'], [TB.PUT, 'firma'], [TB.ADD + 0.2, 'pasos'], [TB.GOLPE, 'golpecito'], [TB.GOLPE + 0.35, 'papel'], [TB.WASH + 0.1, 'maquina'], [TB.Y1823, 'brillo'],
    [TB.Y1820, 'golpecito'], [TB.AND3 + 0.1, 'pasos'], [TB.BEALE2, 'papel'], [TB.SO, 'whoosh'], [TB.NAMELESS, 'pop'], [TB.TALE, 'palmada']],
  año: (t) => (t >= TB.THAT && t < TB.ADD ? 1885 : t >= TB.PAMPH3 && t < TB.AND3 ? 1820 : 1982) });
'''

DETALLES = r'''
// ── la PAUSA: planos de bl-nickell congelados (las mismas funciones) y Atom al doble con la torre de detalles ──
const TF = { P13: 67.9, P12: 62.45, P11: 55.98, P5: 25.06, P4: 20.46, P8: 41.22, P10: 50.5 };
const VOZ = [[TS.NOTICE - 0.12, TS.FALL + 0.35], [TS.IN, TS.SHOWED + 0.5], [TS.SHOWED + 0.5, TS.LIKELY + 0.6], [TS.EVEN, TS.LESS + 0.5], [TS.AND, TS.FOUR + 1.3], [TS.EACH, TS.REAL + 0.6], [TS.EVEN2, TS.TRUE + 0.4], [TS.THOSE, TS.PERFECT + 1.0]];
const habla = (t) => VOZ.some(([a, b]) => t > a && t < b) ? 1 : 0;
const TX = 196, TY = 160;            // la torre (centro de la base)
const altoT = (t) => (ease(tramo(t, TS.N1014 - 0.25, TS.N1014 + 0.15)) + ease(tramo(t, TS.SIX - 0.25, TS.SIX + 0.15)) + ease(tramo(t, TS.FOUR - 0.25, TS.FOUR + 0.15))
  + ease(tramo(t, TS.OF - 0.2, TS.OF + 0.15)) + ease(tramo(t, TS.DETAILS2 - 0.2, TS.DETAILS2 + 0.15)) + ease(tramo(t, TS.MAKES - 0.2, TS.MAKES + 0.15)) + ease(tramo(t, TS.STORY - 0.2, TS.STORY + 0.15))) / 7;
const torre = (t) => { const a = altoT(t); if (a <= 0) return null; return T.pausa(R, TX, TY, t, { cual: 'torre', alto: a, tiembla: ease(tramo(t, TS.ONE, TS.ONE + 1.0)) * (t > TS.TRUE ? 1 : 0.6), numero: t > TS.ONE + 0.2 ? true : false }); };
// los dos termómetros: «parece» (verde, sube con cada detalle) y «de verdad» (rojo, baja)
const termo = (x, nivel, col, colS, texto, u) => { if (u <= 0) return; const y1 = 158, y0 = ri(lerp(158, 64, Math.min(1, u)));
  R.rect(x - 7, y0 - 1, x + 7, y1 + 1, K); R.rect(x - 6, y0, x + 6, y1, H('#e8eef0')); R.rect(x - 6, y0, x - 5, y1, BLA);
  const top = ri(lerp(y1 - 2, y0 + 3, nivel)); R.rect(x - 4, top, x + 4, y1 - 2, col); R.rect(x - 4, top, x - 3, y1 - 2, mez(col, BLA, 0.4)); R.rect(x + 3, top, x + 4, y1 - 2, colS);
  for (let y = y0 + 6; y < y1; y += 8) R.rect(x + 3, y, x + 6, y, H('#8a9aa0'));
  R.disco(x, y1 + 6, 8, K); R.disco(x, y1 + 6, 7, col); ps(x - 3, y1 + 3, mez(col, BLA, 0.5));
  if (u >= 1) R.numero(texto, x, top - 6, { centro: true, color: col }); };
const S1 = (t) => {
  P13(TF.P13); AT.pausa(R, tramo(t, 0, 0.3));
  const u = tramo(t, 0.25, 1.7), x = lerp(-40, 48, ease(u)), anda = u > 0 && u < 1;
  if (t > TS.TRAP) AT.anillo(R, 160, 112, 70, 56, t, tramo(t, TS.TRAP, TS.TRAP + 0.6));
  AT.atom(R, x, 178, t, { s: 2, dir: 1, pose: anda ? 'camina' : t > TS.TRAP - 0.2 && t < TS.FALL + 0.6 ? 'senala' : 'quieto', cara: t > TS.FALL ? 'sorpresa' : 'normal', habla: habla(t) });
};
// ── S2 · 1983, la consulta (a color): un psicólogo reparte un cuestionario; el voluntario lo lee y duda ──
const O2 = { encuadre: 'consulta' };
const S2 = (t) => {
  const g = T.estudio(R, t, O2);
  const [dx, dy] = g.divan;
  R.actor(EL.estudiante ?? EL.alumno, dx - 4, dy, t, { dir: 1, sostiene: t > TS.AMOS + 0.2 ? [dx + 14, dy - 14] : undefined, sorpresa: t > TS.DANIEL && t < TS.DANIEL + 0.6, habla: false, dedo: t > TS.DANIEL + 0.7 });
  R.actor(EL.profesor, 252, g.detras ?? 134, t, { dir: -1, habla: t > TS.IN + 0.3 && t < TS.PSYCH && parp(t, 7), sonrisa: t > TS.DANIEL + 0.7 });
  T.estudioDelante(R, t, O2);
  const u = tramo(t, TS.IN + 0.1, TS.AMOS - 0.3), bx = ri(lerp(190, dx + 26, ease(u))), back = tramo(t, TS.AMOS + 0.4, TS.SHOWED);
  const b = R.actor(EL.cientifica, ri(lerp(bx, 150, ease(back))), 160, t, { dir: back > 0 ? 1 : -1, anda: (u > 0 && u < 1) || (back > 0 && back < 1), sostiene: t < TS.AMOS + 0.2 ? [bx - 6, 136] : undefined, sonrisa: t > TS.AMOS });
  if (b && b.mano && t < TS.AMOS + 0.2) { const [mx, my] = b.mano; for (let i = 0; i < 3; i++) { R.rect(mx - 6, my - 4 - i * 2, mx + 4, my - i * 2, K); R.rect(mx - 5, my - 3 - i * 2, mx + 3, my - 1 - i * 2, BLA); } }
  if (t > TS.AMOS + 0.2) { const hx = dx + 14, hy = dy - 18; R.rect(hx - 5, hy - 7, hx + 5, hy + 6, K); R.rect(hx - 4, hy - 6, hx + 4, hy + 5, BLA); for (let i = 0; i < 4; i++) R.rect(hx - 3, hy - 4 + i * 3, hx + 3 - (i % 2) * 2, hy - 4 + i * 3, H('#8a8aa0'));
    if (t > TS.DANIEL + 0.7) { R.linea(hx - 2, hy + 1, hx, hy + 3, H('#2a8a3a')); R.linea(hx, hy + 3, hx + 3, hy - 2, H('#2a8a3a')); } }
  if (t > TS.DANIEL && t < TS.DANIEL + 0.9) globo(dx + 2, dy - 30, '?', pop(t, TS.DANIEL, 0.25), ROJ, 1);
  AT.atom(R, 150, 180, t, { s: 2, dir: -1, pose: t > TS.PSYCH && t < TS.DANIEL ? 'senala' : 'brazos', cara: 'normal', habla: habla(t) });
};
// ── S3 · el estudio de Nickell congelado: Atom saca a color el termómetro de «parece»: sube con cada detalle ──
const ICD = (x, y, k) => { // las pegatinas de detalle: un lingote, una pala, un «6» y un «4»
  if (k === 0) { R.poligono([[x - 5, y + 2], [x + 5, y + 2], [x + 3, y - 2], [x - 3, y - 2]], H('#f0c040')); R.linea(x - 3, y - 2, x + 3, y - 2, H('#fff0a0')); R.linea(x - 5, y + 2, x + 5, y + 2, H('#a87820')); }
  else if (k === 1) { R.linea(x - 4, y + 4, x + 3, y - 3, H('#7a5232')); R.disco(x + 3, y - 3, 2, H('#8a8a94')); }
  else R.numero(k === 2 ? '6' : '4', x, y + 4, { centro: true, color: H('#f0c040') }); };
const S3 = (t) => {
  P12(TF.P12); AT.pausa(R, 1);
  const k = [TS.MORE, TS.DETAILS, TS.SEEMS, TS.LIKELY], n = k.filter((a) => t > a).length, lvl = 0.3 + 0.15 * n + 0.07 * Math.sin(t * 3) * (n === 4 ? 0.3 : 0);
  const u = pop(t, TS.SHOWED + 0.1, 0.4);
  termo(150, lvl, H('#3ac85a'), H('#1a7a32'), ri(lvl * 100) + '%', u);
  const a = AT.atom(R, 66, 176, t, { s: 2, dir: 1, pose: t > TS.SHOWED + 0.3 ? 'sostiene' : 'senala', cara: n >= 3 ? 'sonrisa' : 'normal', habla: habla(t) });
  if (t > TS.SHOWED + 0.3 && a.mano) T.d_folleto(R, a.mano[0] + 6, a.mano[1] - 4, { escala: 1, t });
  k.forEach((a0, i) => { const v = tramo(t, a0 - 0.45, a0); if (v > 0 && v < 1) { const sx = lerp(a.mano[0] + 8, 150, ease(v)), sy = lerp(a.mano[1] - 10, 100 - i * 6, ease(v)) - Math.sin(v * Math.PI) * 20; ICD(ri(sx), ri(sy), i); } });
  if (n > 0) for (let i = 0; i < n; i++) ICD(172, 150 - i * 16, i);
};
// ── S4 · la galería congelada: aparece el termómetro rojo, «de verdad», que baja con cada detalle añadido ──
const S4 = (t) => {
  P11(TF.P11); AT.pausa(R, 1);
  termo(214, 0.9, H('#3ac85a'), H('#1a7a32'), '90%', 1);
  const k = [TS.EVERY, TS.ADDED, TS.DETAIL, TS.LESS], n = k.filter((a) => t > a).length, fr = ['1/2', '1/4', '1/8', '1/16', '1/32'][n], lvl = 0.5 / Math.pow(2, n);
  termo(254, lvl, H('#e83a2a'), H('#8a1a14'), fr, pop(t, TS.EVEN, 0.4));
  for (let i = 0; i < 4; i++) ICD(234, 150 - i * 16, i);
  AT.atom(R, 66, 176, t, { s: 2, dir: 1, pose: t > TS.EVERY && t < TS.LESS + 0.6 ? 'senala' : 'quieto', cara: t > TS.LESS ? 'sorpresa' : 'normal', habla: habla(t) });
};
// ── S5 · el corcho congelado: Atom abre el folleto y de su página sale el primer bloque de la torre, «1014» ──
const S5 = (t) => {
  P5(TF.P5); AT.pausa(R, 1);
  const a = AT.atom(R, 66, 176, t, { s: 2, dir: 1, pose: t < TS.N1014 + 0.4 ? 'sostiene' : 'senala', cara: t > TS.EXACT ? 'sonrisa' : 'normal', habla: habla(t) });
  const ab = ease(tramo(t, TS.PAMPH - 0.2, TS.PAMPH + 0.6)), f = T.d_folleto(R, a.mano[0] + 42, a.mano[1] - 22, { escala: 2, abierto: ab, t, brillo: t > TS.EXACT && t < TS.N1014 ? 0.6 : 0 });
  if (t > TS.EXACT && t < TS.N1014) for (let k = 0; k < 3; k++) destello(ri(a.mano[0] + 50 + k * 9), ri(a.mano[1] - 46 - Math.sin(t * 5 + k) * 3), 2, AMA);
  const v = tramo(t, TS.N1014 - 0.6, TS.N1014 - 0.2); if (v > 0 && v < 1) { const x = lerp(a.mano[0] + 60, TX, ease(v)), y = lerp(a.mano[1] - 30, TY - 30, ease(v)) - Math.sin(v * Math.PI) * 24; R.rect(ri(x) - 13, ri(y) - 3, ri(x) + 13, ri(y) + 3, K); R.rect(ri(x) - 12, ri(y) - 2, ri(x) + 12, ri(y) + 2, H('#c89a5a')); }
  torre(t);
  if (t > TS.N1014) R.numero('1014', TX + 46, 92, { centro: true, tam: 16 });
};
// ── S6 · el escritorio de la estampida congelado: «six feet» y «four miles»: dos bloques más ──
const S6 = (t) => {
  P4(TF.P4); AT.pausa(R, 1);
  torre(t);
  const ul = t > TS.FOUR ? '4' : t > TS.SIX ? '6' : null;
  if (ul) R.numero(ul, 136, 80 - ri(pop(t, ul === '4' ? TS.FOUR : TS.SIX, 0.3) * 4), { centro: true, tam: 16 });
  AT.atom(R, 66, 176, t, { s: 2, dir: 1, pose: (t > TS.SIX - 0.3 && t < TS.SIX + 0.5) || (t > TS.FOUR - 0.3 && t < TS.FOUR + 0.5) ? 'senala' : 'sostiene', cara: 'normal', habla: habla(t) });
};
// ── S7 · el archivo congelado: la torre sube hasta arriba y brilla firme («more real») ──
const S7 = (t) => {
  P8(TF.P8); AT.pausa(R, 1);
  const r = torre(t);
  if (t > TS.REAL && r) for (let k = 0; k < 4; k++) if (Math.sin(t * 5 + k * 1.7) > 0.2) destello(TX - 22 + k * 15, ri(r.arriba[1] + 10 + k * 16), 2, AMA);
  AT.atom(R, 66, 176, t, { s: 2, dir: 1, pose: t > TS.REAL - 0.3 ? 'brazos' : 'senala', cara: t > TS.REAL - 0.3 ? 'sonrisa' : 'normal', habla: habla(t) });
};
// ── S8 · el mostrador congelado (el hueco de 1820): la torre se tambalea, sale el «1983» y Atom la sujeta ──
const S8 = (t) => {
  P10(TF.P10); AT.pausa(R, 1);
  torre(t);
  const suj = t > TS.THOSE - 0.3;
  AT.atom(R, suj ? lerp(66, 152, ease(tramo(t, TS.THOSE - 0.3, TS.THOSE + 0.5))) : 66, 176, t, { s: 2, dir: 1, pose: suj ? 'sostiene' : t > TS.ONE ? 'senala' : 'quieto', cara: t > TS.PERFECT ? 'triste' : t > TS.ONE + 0.3 ? 'sorpresa' : 'normal', habla: habla(t) });
};

T.rodar(E, R, [[0, S1], [TS.IN, S2], [TS.SHOWED, S3], [TS.EVEN, S4], [TS.AND, S5], [TS.SIX, S6], [TS.EACH, S7], [TS.EVEN2, S8]], {
  efectos: [[TS.TRAP, 'brillo'], [TS.AMOS, 'papel'], [TS.DETAILS, 'pop'], [TS.LIKELY, 'pop'], [TS.EVERY, 'tic'], [TS.LESS, 'tic'], [TS.PAMPH, 'papel'],
    [TS.N1014, 'toc'], [TS.SIX, 'toc'], [TS.FOUR, 'toc'], [TS.MAKES, 'toc'], [TS.REAL, 'brillo'], [TS.ONE + 0.1, 'boing'], [TS.TRUE, 'boing']],
  año: (t) => (t < TS.IN ? 1982 : 1983) });
'''

CAB_NICKELL = r'''// bl-nickell (frases 26–27, cartela 1982): Joe Nickell lee las cartas de Beale como la declaración de un sospechoso.
// 1 · El campus de noche (fondo local): pasa un coche; en «1982» se enciende la ventana de Nickell. Corta en «Joe».
// 2 · La sala de interrogatorios (fondo local, gag): Nickell entra; la carta, en la silla, suda; en «suspect» manotazo
//   y «!». Corta en «and noticed».
// 3 · El escritorio desde arriba (fondo local): el lápiz rojo rodea tres palabras («words», «English»)
//   y en «1822» se enciende la fecha. Corta en «like».
// 4 · El escritorio a ras de tablero (fondo local): en «stampede» salen búfalos de la palabra y cruzan la mesa; la taza
//   salpica y el calendario salta de 1822 a 1830 en «1830s». Corta en «And when».
// 5 · El corcho de cerca (fondo local): la mano tiende dos hilos rojos entre las frases gemelas de la carta y del folleto
//   («compared», «the rest of the pamphlet»). Corta en «with its long».
// 6 · La pared a la luz de la vela (fondo local): dos recortables con bocadillos de renglones largos y la misma manía
//   roja («habits»); en «two voices» la mano los junta y en «one» queda una sola sombra. Corta en «that of Ward».
// 7 · La mesa del estudio de Atom (estudio 'mesa', 1885): la silueta gira y sale Ward, que firma la cubierta del folleto
//   en «put his name». Corta en «Add to that».
// 8 · El archivo (fondo local): Nickell trae el libro de registros y lo deja caer en la mesa (golpe, registros+2); en
//   «Morriss» lo señala y en «doesn't show up», «?». Corta en «Washington».
// 9 · El lector de microfilm (fondo local): las filas corren y se paran en 1823 (la llave de Morriss); en «at the
//   earliest» se tachan las de antes. Corta en «pamphlet says».
// 10 · El mostrador del hotel (lynchburg 'posada' · 'mostrador', registro, 1820): el dedo baja por las filas y en «1820»
//   toca el hueco vacío, «?». Corta en «and that Nickell».
// 11 · La galería de retratos (fondo local): Nickell con la lupa; cruces rojas en «found» y «no»; en «Beale» su retrato se
//   recorta en silueta de papel y en «Virginia» cuelga de una chincheta. Corta en «for the story».
// 12 · El estudio de Nickell (buscadores 'estudio82'): el teatrillo sobre el escritorio; en «So» abre el telón; focos en
//   «iron box» e «innkeeper»; entra la ayudante con su café. Corta en «and the nameless».
// 13 · El teatrillo de cerca (estudio 'consulta' · 'escritorio'): «?» sobre el amigo sin nombre; el público de papel aplaude
//   en «tale». Lo congela bl-detalles.'''

CAB_DETALLES = r'''// bl-detalles (frase 28, PAUSA «fíjate»): planos de bl-nickell congelados en gris azulado y Atom al doble.
// 1 · El teatrillo congelado (P13): Atom entra y lo rodea con su órbita en «trap». Corta en «In 1983».
// 2 · 1983, la consulta (estudio 'consulta' a color): una psicóloga reparte el cuestionario; el voluntario duda y marca.
//   Corta en «showed».
// 3 · El estudio de Nickell congelado (P12): Atom saca el termómetro verde de «parece»; cuatro pegatinas de detalle
//   vuelan del folleto y lo suben. Corta en «even though».
// 4 · La galería congelada (P11): el termómetro rojo «de verdad» baja 1/2, 1/4, 1/8, 1/16. Corta en «and the pamphlet».
// 5 · El corcho congelado (P5): Atom abre el folleto y cae el primer bloque, «1014». Corta en «six feet».
// 6 · La estampida congelada (P4): bloques «6» y «4». Corta en «Each of those».
// 7 · El archivo congelado (P8): la torre sube hasta arriba y brilla firme en «real». Corta en «even though».
// 8 · El mostrador congelado (P10): la torre se tambalea, sale «1983» y Atom corre a sujetarla.'''

E['bl-nickell'] = ('Nickell', CAB_NICKELL, tb_en() + COMUN + COMPARTIDO + NICKELL)
E['bl-detalles'] = ('Los detalles', CAB_DETALLES, tb_num() + ts_en() + COMUN + COMPARTIDO + DETALLES)
