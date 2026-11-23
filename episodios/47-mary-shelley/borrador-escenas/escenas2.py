# Borrador de escenas del ep47 (grupo S2): ms-lapida, con el movimiento ya hecho.
# Los instantes salen de las palabras de la voz inglesa (atomo/build/largo/ep47/linea.json), escritos como en('marca', f).
E = {}

# las marcas de la voz (marcas-ep47.json): [inicio, fin] de cada frase, en segundos de su escena
MARCAS = {'nace': (1.5, 26.381), 'tumba': (26.781, 46.792), 'casa': (47.192, 72.77), 'percy': (73.17, 101.493)}


def momentos(tabla):
    """const TG = {...}: cada instante (en s de la escena) como en('marca', fracción)"""
    out = []
    for nombre, (k, t) in tabla.items():
        a, b = MARCAS[k]
        out.append(f"{nombre}: en('{k}', {(t - a) / (b - a):.4f})")
    return 'const TG = { ' + ', '.join(out) + ' };\n'


# ── las palabras de ms-lapida que mandan (corte de plano o acción) ──
G = {
    'BORN': ('nace', 1.92), 'LONDON': ('nace', 2.32), 'Y1797': ('nace', 3.02), 'P2': ('nace', 4.92), 'ELEVEN': ('nace', 4.92),
    'DIES': ('nace', 6.50), 'HER': ('nace', 8.52), 'WOLL': ('nace', 9.86), 'P3': ('nace', 11.50), 'WRITE': ('nace', 13.00),
    'GIRLS': ('nace', 13.44), 'SAME': ('nace', 14.60), 'BOYS': ('nace', 15.80), 'P4': ('nace', 16.72), 'GROWS': ('nace', 17.44),
    'NAME': ('nace', 18.74), 'PORTRAIT': ('nace', 20.08), 'WALL': ('nace', 21.04), 'P5': ('nace', 21.84), 'FEELING': ('nace', 22.24),
    'WORLD': ('nace', 23.84), 'EXCHANGE': ('nace', 24.46), 'ANOTHER': ('nace', 25.50), 'LIFE': ('nace', 25.76),
    'P6': ('tumba', 26.781), 'SITTING': ('tumba', 27.84), 'CHURCH': ('tumba', 28.80), 'PANCRAS': ('tumba', 30.02),
    'BESIDE': ('tumba', 30.52), 'P7': ('tumba', 31.78), 'BOOK': ('tumba', 32.78), 'KNEES': ('tumba', 33.36), 'SAID': ('tumba', 35.00),
    'P8': ('tumba', 36.76), 'LETTERS': ('tumba', 37.28), 'FINGER': ('tumba', 38.64), 'LEARNED': ('tumba', 39.78), 'NAMEB': ('tumba', 40.66),
    'P9': ('tumba', 41.30), 'MOTHERS': ('tumba', 42.30), 'AMONG': ('tumba', 43.54), 'FELT': ('tumba', 45.46), 'ALONE': ('tumba', 46.12),
    'P10': ('casa', 47.192), 'HOME': ('casa', 47.31), 'WAY': ('casa', 49.73), 'FATHER': ('casa', 50.95), 'P11': ('casa', 51.83),
    'GODWIN': ('casa', 53.25), 'REMARRIES': ('casa', 54.49), 'WOMAN': ('casa', 55.11), 'NEVER': ('casa', 55.73), 'ALONG': ('casa', 56.85),
    'P12': ('casa', 57.95), 'BOOKS': ('casa', 59.17), 'VISITORS': ('casa', 59.77), 'GIRL3': ('casa', 61.47), 'SITTINGC': ('casa', 62.45),
    'CORNER': ('casa', 63.09), 'P13': ('casa', 63.99), 'LISTENING': ('casa', 65.01), 'TALK': ('casa', 66.19), 'SCIENCE': ('casa', 66.79),
    'POLITICS': ('casa', 67.87), 'P14': ('casa', 68.37), 'POETRY': ('casa', 68.75), 'ASIF': ('casa', 69.77), 'NOONE': ('casa', 70.57),
    'NOTICE': ('casa', 71.27), 'THERE': ('casa', 72.29),
    'P15': ('percy', 73.17), 'VISITORS2': ('percy', 74.63), 'YOUNG': ('percy', 75.53), 'REBEL': ('percy', 76.29), 'APPEARS': ('percy', 77.07),
    'ADMIRES': ('percy', 77.89), 'FATHER2': ('percy', 78.57), 'P16': ('percy', 79.47), 'T21': ('percy', 80.87), 'WIFE': ('percy', 81.99),
    'T16': ('percy', 83.37), 'P17': ('percy', 85.35), 'COMES': ('percy', 87.31), 'GRAVE2': ('percy', 89.11), 'PLACE': ('percy', 90.27),
    'HERSELF': ('percy', 91.61), 'P18': ('percy', 92.53), 'DAWN': ('percy', 93.81), 'JULY': ('percy', 95.03), 'P19': ('percy', 96.93),
    'LEAVES': ('percy', 97.15), 'FIT': ('percy', 98.67), 'RUN': ('percy', 99.37), 'HIM': ('percy', 100.37), 'FRANCE': ('percy', 100.71),
    'FIN': ('percy', 101.74),
}

COMUN = r'''
const AT = T.AT, MS = T.MS, K = T.C.k, ri = Math.round, H = (s) => hex(s);
const B4M = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4M[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const ns = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h2(xi, yi), b = h2(xi + 1, yi), c = h2(xi, yi + 1), d = h2(xi + 1, yi + 1); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };
// rampa de oscuro (0) a claro: el valor v se trama entre dos tonos
const rmp = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return ramp[Math.max(0, Math.min(ramp.length - 1, l))]; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const pal = (a) => a.map((c) => hex(c));
const ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const FIJOS = {};
// lo fijo de un fondo propio, pintado una vez en su búfer (R.usar(prev), nunca R.usar() a secas)
const horno = (k, f) => { if (!FIJOS[k]) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); FIJOS[k] = b; } return FIJOS[k]; };
const fijo = (k, f) => R.copiar(horno(k, f));
const dentro = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180;
const ps = (x, y, c) => { x = ri(x); y = ri(y); if (dentro(x, y)) R.pset(x, y, c); };
const sombrea = (x, y, a) => { x = ri(x); y = ri(y); if (dentro(x, y)) R.pset(x, y, mez(R.pget(x, y), K, a)); };
const aclara = (x, y, c, a) => { x = ri(x); y = ri(y); if (dentro(x, y)) R.pset(x, y, mez(R.pget(x, y), c, a)); };
const caja = (x0, y0, x1, y1, f) => { for (let y = Math.max(0, ri(y0)); y <= Math.min(179, ri(y1)); y++) for (let x = Math.max(0, ri(x0)); x <= Math.min(319, ri(x1)); x++) f(x, y); };
const relleno = (x0, y0, x1, y1, ramp, vf) => caja(x0, y0, x1, y1, (x, y) => R.pset(x, y, rmp(ramp, vf(x, y), x, y)));
// luz tramada que se suma (vela, farol, sol): no tapa, aclara
const luz = (cx, cy, r, c, a = 0.5) => caja(cx - r, cy - r, cx + r, cy + r, (x, y) => { const g = 1 - Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r; if (g > 0) { const v = g * g * a; if (v > b4(x, y) * 0.35) aclara(x, y, c, Math.min(0.85, v)); } });
const tranquilo = (x, y) => (x >= 274 && y <= 48) || (x >= 16 && x <= 174 && y <= 21);
const parp = (t, f = 8) => Math.sin(t * f) > 0;

// ── PALETAS de la Regencia ──
const CAOBA = pal(['#2a140c', '#3e1e12', '#56301c', '#6e4026', '#885232', '#a4683e']);
const ROBLE = pal(['#3a2614', '#523620', '#6a4a2a', '#826036', '#9a7644', '#b28c58']);
const VERDE = pal(['#1c2c24', '#26392e', '#30483a', '#3c5846', '#4a6a54', '#5c7e64']);
const ROSA = pal(['#4a2a2c', '#5e3536', '#744444', '#8a5652', '#a06a62', '#b88276']);
const OCRE = pal(['#4a3a1c', '#5e4a24', '#74602e', '#8a743a', '#a08a4c', '#b8a264']);
const YESO = pal(['#4a4640', '#5e5850', '#746c62', '#8a8274', '#a09888', '#b8ae9c', '#ccc2ae']);
const LADR = pal(['#2a1812', '#3c221a', '#522e22', '#683c2c', '#7e4c38', '#925c44']);
const PIEDRA = pal(['#3a3a36', '#4c4c46', '#605e56', '#76746a', '#8c8a7e', '#a4a294', '#bcbaac']);
const HIERBA = pal(['#1e3218', '#28401e', '#324e24', '#3e5e2c', '#4c6e34', '#5c803e', '#70924a']);
const ORO = pal(['#5a3c10', '#8a6418', '#b8902c', '#dcb84a', '#f4dc84']);
const MARMOL = pal(['#8a8680', '#a8a49c', '#c4c0b6', '#dcd8ce', '#eeeae0']);
const TELA_R = pal(['#3a1018', '#561824', '#722232', '#8e3040', '#a84252']);
const TELA_V = pal(['#14261e', '#1e362a', '#2a4836', '#385a44', '#4a6e54']);
const TELA_A = pal(['#141c34', '#1e2a48', '#2a385e', '#384a74', '#4c5e8a']);
const BLANCO = H('#f4eee0'), CREMA = H('#e8dcc0'), NEGRO = H('#14121a');
const LLAMA = pal(['#8a1e0e', '#c83c14', '#ec6e1c', '#f8a830', '#ffd860', '#fff4b0']);
const LIBROS = pal(['#6a1c1c', '#1c3a5a', '#2a4a24', '#5a3a1a', '#7a5a2a', '#3a1c3a', '#8a4a1c', '#1c1c2a', '#5a2a1c', '#2a3a3a']);

// ── PIEZAS DE INTERIOR ──
// papel pintado de damasco: rayas finas y una flor en rombo, más oscuro junto al techo y a los rincones
const papel = (x0, y0, x1, y1, ramp, k = 0, o = {}) => relleno(x0, y0, x1, y1, ramp, (x, y) => {
  const c = Math.floor((x - x0) / 14), gx = (x - x0) % 14, gy = ((y - y0) + (c % 2) * 9) % 18, dx = Math.abs(gx - 7), dy = Math.abs(gy - 9);
  let v = (o.base ?? 2.4) + (ns(x * 0.05 + k, y * 0.06) - 0.5) * 0.6;
  const d = dx + dy * 0.7; if (d < 4 && d > 2.2) v += 0.9; else if (d < 1.2) v += 0.7;
  if (dx === 0 && dy > 4 && dy < 8) v += 0.5;
  if (gx === 0) v -= 0.7; if (gx === 13) v += 0.3;
  v -= Math.max(0, 1 - (y - y0) / 26) * 1.0;
  if (o.apaga) v -= o.apaga(x, y);
  return v; });
// el friso de madera con sus paneles en relieve (luz arriba a la izquierda) y el zócalo
const friso = (x0, x1, y0, y1, ramp, paso = 30, k = 0) => {
  relleno(x0, y0, x1, y1, ramp, (x, y) => 2.4 + (ns(x * 0.25 + k, y * 0.05) - 0.5) * 1.0 + (Math.sin(x * 0.9 + ns(x * 0.1, y * 0.2) * 4) > 0.85 ? -0.6 : 0));
  for (let x = x0; x <= x1; x++) { ps(x, y0, ramp[0]); ps(x, y0 + 1, ramp[5]); ps(x, y0 + 2, ramp[4]); ps(x, y1, ramp[0]); ps(x, y1 - 1, ramp[1]); ps(x, y1 - 2, ramp[1]); }
  for (let px = x0 + 4; px + paso - 8 <= x1; px += paso) { const a = px, b = px + paso - 8, c0 = y0 + 6, c1 = y1 - 7;
    for (let x = a; x <= b; x++) { ps(x, c0, ramp[0]); ps(x, c0 + 1, ramp[5]); ps(x, c1, ramp[5]); ps(x, c1 + 1, ramp[4]); }
    for (let y = c0; y <= c1; y++) { ps(a, y, ramp[0]); ps(a + 1, y, ramp[5]); ps(b, y, ramp[5]); ps(b + 1, y, ramp[4]); }
    caja(a + 2, c0 + 2, b - 1, c1 - 1, (x, y) => sombrea(x, y, 0.12)); }
};
// la tarima: tablas de 5 px con sus juntas, vetas y clavos; más oscura hacia el fondo
const tarima = (y0, ramp, k = 0, x0 = 0, x1 = 319, y1 = 179) => relleno(x0, y0, x1, y1, ramp, (x, y) => {
  const fila = Math.floor((y - y0) / 5), off = h2(fila, 1, k) * 50, xx = (x + off) % 52;
  let v = 2.3 + (ns(x * 0.03 + fila * 3.1, y * 0.5) - 0.5) * 1.3 + (h2(fila, 2, k) - 0.5) * 0.8 + Math.sin(x * 0.4 + ns(x * 0.05, fila) * 9) * 0.25;
  if ((y - y0) % 5 === 0) v = 0.4; if (xx < 1) v = 0.6; if (xx === 3 && (y - y0) % 5 === 2) v = 0.2;
  return v + (y - y0) / Math.max(1, y1 - y0) * 0.8 - 0.3; });
// suelo de losas blancas y negras en rombo (el recibidor georgiano)
const ajedrez = (y0, y1, k = 0) => caja(0, y0, 319, y1, (x, y) => { const u = (x + (y - y0) * 1.6) / 14, v2 = (x - (y - y0) * 1.6) / 14, n = (Math.floor(u) + Math.floor(v2)) & 1;
  const fu = u - Math.floor(u), fv = v2 - Math.floor(v2), junta = fu < 0.06 || fv < 0.06;
  const base = n ? 3.2 + (ns(x * 0.2, y * 0.3) - 0.5) * 0.9 : 0.6 + (ns(x * 0.15 + 5, y * 0.2) - 0.5) * 0.6;
  R.pset(x, y, junta ? MARMOL[0] : n ? rmp(MARMOL, base + (y - y0) / (y1 - y0) * 0.6, x, y) : rmp(pal(['#1a1a20', '#26262e', '#34343c', '#44444c']), base + 0.6, x, y)); });
// la alfombra turca: borde con dientes, campo rojo con un medallón, flecos
const alfombra = (x0, y0, x1, y1, k = 0, cols = ['#7a1e22', '#a83a2e', '#2a3a6a', '#d8b060', '#e8dcc0']) => {
  const C5 = pal(cols), w = x1 - x0, h = y1 - y0;
  caja(x0, y0, x1, y1, (x, y) => { const i = x - x0, j = y - y0, bo = Math.min(i, j, x1 - x, y1 - y);
    let c = C5[0];
    if (bo < 2) c = C5[2]; else if (bo < 4) c = ((i + j) % 4 < 2) ? C5[3] : C5[2]; else if (bo < 5) c = C5[4];
    else { const cx = Math.abs(i - w / 2) / (w / 2), cy = Math.abs(j - h / 2) / (h / 2), d = cx + cy;
      c = d < 0.35 ? C5[2] : d < 0.42 ? C5[3] : d < 0.7 ? C5[1] : C5[0]; if (((i * 3 + j * 5) % 11 === 0) && d > 0.45) c = C5[3]; if (d < 0.18) c = C5[3]; }
    if (h2(x, y, k) > 0.93) c = mez(c, K, 0.25); R.pset(x, y, c); });
  for (let x = x0; x <= x1; x += 2) { ps(x, y1 + 1, C5[4]); if (x % 4 === 0) ps(x, y1 + 2, C5[4]); }
};
// una vela en su candelero (x, base): la llama tiembla; o.alta: altura de la vela; devuelve la punta de la llama
const vela = (x, base, t, o = {}) => {
  const alta = o.alta ?? 6, k = o.k ?? x;
  if (!o.sinPie) { R.rect(x - 2, base - 1, x + 2, base, ORO[1]); R.rect(x - 1, base - 1, x + 1, base - 1, ORO[3]); R.rect(x - 1, base - 3, x + 1, base - 2, ORO[2]); }
  R.rect(x - 1, base - 3 - alta, x + 1, base - 4, CREMA); ps(x - 1, base - 3 - alta, BLANCO); ps(x + 1, base - 4, H('#c8b898'));
  if (o.apagada) { const f = ((t * 0.7) % 1); for (let i = 0; i < 6; i++) aclara(x + Math.sin(t * 3 + i) * (i * 0.4), base - 5 - alta - i * 2 - f * 2, H('#8a8a90'), 0.5 * (1 - i / 6)); return [x, base - 4 - alta]; }
  const tm = Math.sin(t * 13 + k) * 0.5 + Math.sin(t * 7.3 + k * 2) * 0.5, fy = base - 4 - alta;
  if (!o.sinHalo) luz(x, fy - 2, o.halo ?? 14, H('#ffd890'), o.fuerza ?? 0.45);
  ps(x, fy, H('#3a2a1a')); ps(x, fy - 1, LLAMA[3]); ps(x, fy - 2, LLAMA[4]); ps(x + (tm > 0.4 ? 1 : tm < -0.4 ? -1 : 0), fy - 3, LLAMA[5]); if (tm > -0.2) ps(x, fy - 4, LLAMA[4]);
  return [x, fy - 3];
};
// fuego en la boca de una chimenea (x0–x1, base): llamas que suben con ruido y chispas
const fuego = (x0, x1, base, t, alto = 12, k = 0) => {
  for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), env = Math.sin(u * Math.PI);
    const hgt = env * alto * (0.55 + 0.45 * ns(x * 0.35 + k, t * 5)) + 1;
    for (let j = 0; j < hgt; j++) { const v = 5.6 - (j / hgt) * 5.2 + (ns(x * 0.5, j * 0.4 - t * 7) - 0.5) * 1.6; if (v > 0.2) ps(x, base - j, rmp(LLAMA, v, x, base - j)); } }
  R.rect(x0 + 1, base - 1, x1 - 1, base + 1, H('#2a1a14')); for (let x = x0 + 2; x < x1 - 1; x += 3) { ps(x, base, LLAMA[(x + ri(t * 6)) % 3 + 1]); }
  for (let i = 0; i < 4; i++) { const f = (t * 0.8 + h2(i, 1, k)) % 1; ps(x0 + h2(i, 2, k) * (x1 - x0) + Math.sin(t * 4 + i) * 2, base - alto - f * 14, f < 0.6 ? LLAMA[4] : LLAMA[2]); }
};
// una librería de caoba hasta (x0, y0)–(x1, y1) con baldas cada 'paso' y libros de lomos variados con su filete de oro
const libreria = (x0, y0, x1, y1, k = 0, paso = 20) => {
  relleno(x0, y0, x1, y1, CAOBA, (x, y) => 1.2 + (ns(x * 0.2, y * 0.05 + k) - 0.5) * 0.6);
  for (let y = y0 + 4; y + paso <= y1; y += paso) {
    const by = y + paso - 3; let x = x0 + 3, n = 0;
    while (x < x1 - 4) { n++; const w = 2 + Math.floor(h2(n, y, k) * 3), hh = paso - 6 - Math.floor(h2(n, y + 1, k) * 6), c = LIBROS[Math.floor(h2(n, y + 2, k) * LIBROS.length)];
      if (h2(n, y + 3, k) > 0.93) { x += 3; continue; }
      if (h2(n, y + 4, k) > 0.95 && x + 8 < x1 - 4) { for (let j = 0; j < hh - 2; j++) { R.rect(x + Math.floor(j * 0.5), by - j, x + Math.floor(j * 0.5) + 2, by - j, c); } x += 9; continue; }
      R.rect(x, by - hh, x + w - 1, by, c); for (let j = by - hh; j <= by; j++) ps(x, j, mez(c, H('#ffffff'), 0.18)); ps(x + w - 1, by - hh, mez(c, K, 0.4));
      if (w > 2) { ps(x + 1, by - hh + 2, ORO[3]); ps(x + 1, by - 3, ORO[2]); if (hh > 10) ps(x + 1, by - hh + 5, ORO[2]); }
      x += w + (h2(n, y + 5, k) > 0.8 ? 1 : 0); }
    R.rect(x0, by + 1, x1, by + 3, CAOBA[4]); for (let x = x0; x <= x1; x++) { ps(x, by + 1, CAOBA[5]); ps(x, by + 3, CAOBA[1]); }
  }
  R.rect(x0, y0, x0 + 2, y1, CAOBA[3]); R.rect(x1 - 2, y0, x1, y1, CAOBA[2]); R.rect(x0, y0, x1, y0 + 3, CAOBA[4]); for (let x = x0; x <= x1; x++) ps(x, y0, CAOBA[5]);
};
// un cuadro con marco dorado; f(x0, y0, x1, y1) pinta la tela por dentro
const cuadro = (x0, y0, x1, y1, f) => { R.rect(x0, y0, x1, y1, ORO[1]); for (let x = x0; x <= x1; x++) { ps(x, y0, ORO[4]); ps(x, y1, ORO[0]); } for (let y = y0; y <= y1; y++) { ps(x0, y, ORO[3]); ps(x1, y, ORO[0]); }
  for (let x = x0 + 1; x < x1; x += 2) { ps(x, y0 + 1, ORO[3]); ps(x, y1 - 1, ORO[2]); }
  f(x0 + 2, y0 + 2, x1 - 2, y1 - 2); for (let x = x0 + 2; x <= x1 - 2; x++) sombrea(x, y0 + 2, 0.35); };
// paisaje al óleo para un cuadro: cielo, colinas, un árbol y un río
const paisaje = (x0, y0, x1, y1, k = 0) => caja(x0, y0, x1, y1, (x, y) => { const u = (x - x0) / (x1 - x0), v = (y - y0) / (y1 - y0), col = 0.55 + Math.sin(u * 5 + k) * 0.08;
  R.pset(x, y, v < col ? rmp(pal(['#6a7a8a', '#8a98a4', '#b0b8b4', '#d8ccaa']), 1 + v * 3 + (ns(x * 0.3, y * 0.3) - 0.5), x, y) : rmp(pal(['#2a3a1c', '#3e5228', '#566a34', '#7a8442']), 2.4 - (v - col) * 3 + (ns(x * 0.4 + k, y * 0.4) - 0.5) * 1.2, x, y)); });
// el retrato de la madre en pequeño (un medallón ovalado): pelo castaño, pañuelo blanco, vestido azul
const retratoOval = (cx, cy, rx, ry) => {
  caja(cx - rx - 2, cy - ry - 2, cx + rx + 2, cy + ry + 2, (x, y) => { const d = ((x + 0.5 - cx) / (rx + 2)) ** 2 + ((y + 0.5 - cy) / (ry + 2)) ** 2, di = ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2;
    if (d > 1) return; if (di > 1) { R.pset(x, y, rmp(ORO, 2.2 + (y < cy ? 1 : -0.8) + (x < cx ? 0.5 : -0.3), x, y)); return; }
    const fx = (x - cx) / rx, fy = (y - cy) / ry; let c = rmp(pal(['#1e1a16', '#2e2820', '#3e3428']), 1 + fy, x, y);
    const cabeza = (fx * fx) / 0.16 + ((fy + 0.25) ** 2) / 0.2 < 1, pelo = (fx * fx) / 0.26 + ((fy + 0.35) ** 2) / 0.24 < 1 && !(cabeza && fy > -0.45);
    if (fy > 0.25) c = Math.abs(fx) < 0.3 - (fy - 0.25) * 0.2 && fy < 0.55 ? BLANCO : rmp(TELA_A, 2.5 - fy, x, y);
    if (pelo) c = rmp(pal(['#3a2214', '#5a3420', '#7a4a2c']), 1.4 - fy, x, y); if (cabeza) c = rmp(pal(['#c88a6a', '#e0a882', '#f0c49c']), 1.6 - fx, x, y);
    R.pset(x, y, c); });
  ps(cx - 1, cy - 1, K); ps(cx + 1, cy - 1, K); ps(cx, cy + 1, H('#a85a4a'));
  R.linea(cx, cy - ry - 2, cx - 4, cy - ry - 7, ORO[1]); R.linea(cx, cy - ry - 2, cx + 4, cy - ry - 7, ORO[1]); ps(cx, cy - ry - 3, ORO[4]);
};
// ventana de guillotina con cuarterones (x0–x1, y0–y1); fuera(t, x0, y0, x1, y1) pinta lo de fuera, ya recortado al hueco
const ventana = (x0, y0, x1, y1, fuera, t, o = {}) => {
  R.recorte([x0 + 2, y0 + 2, x1 - 2, y1 - 2]); fuera(t, x0 + 2, y0 + 2, x1 - 2, y1 - 2); R.recorte(null);
  const marco = o.marco ?? BLANCO, sm = mez(marco, K, 0.35), cols = o.cols ?? 3, filas = o.filas ?? 4;
  for (let x = x0; x <= x1; x++) { ps(x, y0, sm); ps(x, y0 + 1, marco); ps(x, y1, sm); ps(x, y1 - 1, marco); }
  for (let y = y0; y <= y1; y++) { ps(x0, y, marco); ps(x0 + 1, y, marco); ps(x1, y, sm); ps(x1 - 1, y, marco); }
  const ym = ri((y0 + y1) / 2); for (let x = x0; x <= x1; x++) { ps(x, ym, marco); ps(x, ym + 1, sm); }
  for (let i = 1; i < cols; i++) { const x = ri(x0 + (x1 - x0) * i / cols); for (let y = y0; y <= y1; y++) ps(x, y, marco); }
  for (let j = 1; j < filas; j++) { if (j * 2 === filas) continue; const y = ri(y0 + (y1 - y0) * j / filas); for (let x = x0; x <= x1; x++) ps(x, y, marco); }
  for (let i = 0; i < (x1 - x0) * 0.6; i++) { const x = x0 + 4 + i, y = y1 - 4 - i; if (y > y0 + 2 && x < x1 - 2 && (i % 9) < 3) aclara(x, y, H('#ffffff'), 0.22); }
  if (o.repisa !== false) { R.rect(x0 - 3, y1 + 1, x1 + 3, y1 + 3, marco); for (let x = x0 - 3; x <= x1 + 3; x++) { ps(x, y1 + 3, sm); ps(x, y1 + 4, mez(R.pget(x, y1 + 4), K, 0.35)); } }
};
// cortina de terciopelo con pliegues que se mecen un poco, recogida con un alzapaño
const cortina = (x0, x1, y0, y1, ramp, t, lado = 1, k = 0) => {
  for (let y = y0; y <= y1; y++) { const recog = y > y0 + (y1 - y0) * 0.55 && y < y0 + (y1 - y0) * 0.7 ? 0.65 : 1, w = (x1 - x0) * (y < y0 + (y1 - y0) * 0.62 ? 1 : recog + (1 - recog) * cl((y - y0 - (y1 - y0) * 0.62) / 30));
    const xa = lado > 0 ? x0 : x1 - w, xb = lado > 0 ? x0 + w : x1, mec = Math.sin(t * 1.2 + y * 0.05 + k) * 0.6;
    for (let x = ri(xa); x <= ri(xb); x++) { const pl = Math.sin((x - x0) * 0.9 + mec + y * 0.01) ; ps(x, y, rmp(ramp, 2.2 + pl * 1.4 - (y - y0) / (y1 - y0) * 0.4, x, y)); }
    ps(ri(lado > 0 ? xb : xa), y, ramp[0]); }
  R.rect(x0 - 2, y0 - 3, x1 + 2, y0 - 1, ORO[2]); for (let x = x0 - 2; x <= x1 + 2; x++) ps(x, y0 - 3, ORO[4]);
  const ya = ri(y0 + (y1 - y0) * 0.6); R.rect(lado > 0 ? x0 : x1 - 6, ya, lado > 0 ? x0 + 6 : x1, ya + 1, ORO[3]);
};
// reloj de pie con su péndulo que oscila (x centro, base): esfera con agujas que andan
const relojPie = (x, base, t, alto = 70) => {
  const top = base - alto; relleno(x - 7, top + 8, x + 7, base, CAOBA, (xx, y) => 2.2 + (ns(xx * 0.4, y * 0.08) - 0.5) * 1.2 + (xx === x - 7 ? 1.5 : xx === x + 7 ? -1.5 : 0));
  R.rect(x - 9, top + 2, x + 9, top + 22, CAOBA[3]); R.rect(x - 9, top, x + 9, top + 2, CAOBA[5]); ps(x - 9, top - 1, ORO[3]); ps(x + 9, top - 1, ORO[3]); ps(x, top - 2, ORO[4]); ps(x, top - 1, ORO[3]);
  R.disco(x, top + 12, 6.5, ORO[2]); R.disco(x, top + 12, 5.5, CREMA); for (let a = 0; a < 12; a++) ps(x + Math.cos(a / 12 * 6.283) * 4.5, top + 12 + Math.sin(a / 12 * 6.283) * 4.5, K);
  const am = t * 0.8, ah = t * 0.07; R.linea(x, top + 12, ri(x + Math.cos(am) * 4), ri(top + 12 + Math.sin(am) * 4), K); R.linea(x, top + 12, ri(x + Math.cos(ah) * 3), ri(top + 12 + Math.sin(ah) * 3), K);
  R.rect(x - 4, top + 28, x + 4, base - 14, H('#1a0e08')); const sw = Math.sin(t * 3.1) * 3; R.linea(x, top + 29, ri(x + sw), base - 22, ORO[2]); R.disco(ri(x + sw), base - 20, 2.5, ORO[3]); ps(ri(x + sw) - 1, base - 21, ORO[4]);
  R.rect(x - 4, top + 28, x + 4, top + 28, CAOBA[5]); R.rect(x - 9, base - 4, x + 9, base, CAOBA[2]); for (let xx = x - 9; xx <= x + 9; xx++) ps(xx, base - 4, CAOBA[4]);
};
// una silla de la Regencia de perfil (x, suelo), respaldo a un lado (lado 1: respaldo a la izquierda)
const silla = (x, suelo, lado = 1, ramp = CAOBA, tela = TELA_R) => {
  const bx = lado > 0 ? x - 6 : x + 6; R.rect(Math.min(x - 6, x + 6), suelo - 12, Math.max(x - 6, x + 6), suelo - 10, tela[3]); for (let xx = x - 6; xx <= x + 6; xx++) ps(xx, suelo - 12, tela[4]);
  R.rect(x - 6, suelo - 9, x + 6, suelo - 9, ramp[3]); R.rect(x - 6, suelo - 9, x - 5, suelo, ramp[2]); R.rect(x + 5, suelo - 9, x + 6, suelo, ramp[2]);
  R.rect(bx - 1, suelo - 28, bx, suelo - 10, ramp[3]); R.rect(bx - 1 + (lado > 0 ? 0 : -3), suelo - 28, bx + (lado > 0 ? 3 : 0), suelo - 26, ramp[4]); R.rect(bx - 1, suelo - 22, bx + lado * 3, suelo - 21, ramp[2]);
};
// gato (dormido o que anda) pequeño, de perfil: x, suelo, dir
const gatito = (x, suelo, t, o = {}) => { const c = o.c ?? H('#3a3436'), cl2 = mez(c, H('#ffffff'), 0.25), dir = o.dir ?? 1, X = (i) => ri(x + i * dir);
  if (o.duerme) { R.rect(X(-4) < X(4) ? X(-4) : X(4), suelo - 3, X(-4) < X(4) ? X(4) : X(-4), suelo, c); ps(X(4), suelo - 4, c); ps(X(5), suelo - 4, c); ps(X(5), suelo - 5, c); ps(X(-5), suelo - 1, c); ps(X(-6), suelo - 1, c); ps(X(0), suelo - 3, cl2); if (Math.sin(t * 2) > 0) ps(X(1), suelo - 4, cl2); return; }
  const pa = o.anda ? Math.floor(t * 8) % 2 : 0; R.rect(Math.min(X(-4), X(3)), suelo - 5, Math.max(X(-4), X(3)), suelo - 3, c);
  ps(X(-4), suelo - 2, c); ps(X(-4 + pa), suelo - 1, c); ps(X(2), suelo - 2, c); ps(X(2 - pa), suelo - 1, c);
  R.rect(Math.min(X(3), X(6)), suelo - 8, Math.max(X(3), X(6)), suelo - 5, c); ps(X(3), suelo - 9, c); ps(X(6), suelo - 9, c); ps(X(5), suelo - 7, H('#e8d040'));
  const cola = Math.sin(t * 3) > 0 ? 1 : 0; ps(X(-5), suelo - 6, c); ps(X(-6), suelo - 7 - cola, c); ps(X(-6), suelo - 8 - cola, c);
};
// el libro que lleva un personaje, en su mano (mx, my)
const librito = (mx, my, c = H('#6a1c1c'), abierto = false) => { if (abierto) { R.rect(mx - 4, my - 3, mx + 4, my + 1, K); R.rect(mx - 3, my - 2, mx - 1, my, CREMA); R.rect(mx + 1, my - 2, mx + 3, my, BLANCO); ps(mx, my - 2, H('#8a7a5a')); return; }
  R.rect(mx - 2, my - 4, mx + 2, my + 1, K); R.rect(mx - 1, my - 3, mx + 2, my, c); ps(mx - 1, my - 3, mez(c, H('#ffffff'), 0.3)); ps(mx + 2, my - 2, CREMA); };
// bocadillo con un icono propio (f pinta dentro, en un hueco de 9×9 con la esquina en (x, y))
const globo = (x, y, f, a = 1) => { if (a <= 0) return; const s = ri(-3 + 3 * ease(cl(a))); R.rect(x - 1, y - 1 + s, x + 11, y + 11 + s, K); R.rect(x, y + s, x + 10, y + 10 + s, BLANCO); ps(x + 2, y + 12 + s, K); ps(x + 3, y + 12 + s, K); ps(x + 2, y + 11 + s, BLANCO); ps(x + 1, y + 13 + s, K); f(x + 1, y + 1 + s); };
// el mismo globo al doble (para que se lea a 640 px): se pinta a escala 1 en un recuadro libre y se pega al doble
const globo2 = (x, y, f, a = 1) => { if (a <= 0) return; const s = ri(-4 + 4 * ease(cl(a))); AT.escalado(R, () => globo(1, 1, f, 1), 14, 16, x, y + s, 2); };
const icMatraz = (x, y) => { R.rect(x + 3, y, x + 5, y + 3, H('#8ab8d8')); for (let j = 0; j < 5; j++) R.rect(x + 3 - j, y + 3 + j, x + 5 + j, y + 3 + j, j > 1 ? H('#5ac87a') : H('#8ab8d8')); R.rect(x + 2, y, x + 6, y, K); ps(x + 4, y + 5, BLANCO); };
const icPluma = (x, y) => { for (let i = 0; i < 8; i++) { ps(x + 1 + i, y + 8 - i, K); ps(x + 2 + i, y + 8 - i, i > 2 ? H('#c8c0e8') : K); if (i > 2) ps(x + 2 + i, y + 7 - i, H('#e8e4f8')); } };
const icCorazon = (x, y, c = H('#d84a5a')) => { for (const [i, j] of [[1, 1], [2, 1], [5, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [2, 5], [3, 5], [4, 5], [5, 5], [3, 6], [4, 6]]) ps(x + i, y + j, c); ps(x + 1, y + 2, H('#ffb8c0')); };
const icNube = (x, y) => { R.rect(x + 1, y + 2, x + 7, y + 4, H('#5a5a6a')); R.rect(x + 2, y + 1, x + 4, y + 1, H('#5a5a6a')); R.rect(x + 5, y + 1, x + 6, y + 1, H('#5a5a6a')); ps(x + 3, y + 6, H('#e8c040')); ps(x + 4, y + 5, H('#e8c040')); ps(x + 2, y + 7, H('#e8c040')); };

// ── PIEZAS DE EXTERIOR ──
// cielo tramado con nubes de tres tonos a tres velocidades (cfg: rampa del cielo, colores de nube, alturas) y pájaros
const cielo = (t, y1, ramp, nubes, k = 1, o = {}) => {
  relleno(0, 0, 319, y1, ramp, (x, y) => (y / y1) * (ramp.length - 1.2) + (ns(x * 0.03 + k, y * 0.08) - 0.5) * 0.7 + (o.sol ? Math.max(0, 1.4 - Math.hypot(x - o.sol[0], (y - o.sol[1]) * 1.4) / 40) * 1.6 : 0));
  nubes.forEach(([vel, c, cL, yc, fr], i) => { for (let y = yc - 9; y <= yc + 9; y++) for (let x = 0; x < 320; x++) { if (y < 0 || y > y1) continue;
    const xx = x + t * vel * 3 + i * 97 + k * 31, v = ns(xx * fr, y * fr * 2.4 + i * 9) - 0.56 - Math.abs(y - yc) / 22;
    if (v > 0 && v * 7 > b4(x, y)) { if (tranquilo(x, y) && v < 0.12) continue; R.pset(x, y, v > 0.1 && ns(xx * fr * 2, (y - 2) * fr * 3) > 0.45 ? cL : c); } } });
};
const pajaros = (t, n, x0, x1, y0, y1, k = 0, c = H('#2a2a30')) => { for (let i = 0; i < n; i++) { const vel = 10 + h2(i, 1, k) * 12, x = x0 + ((h2(i, 2, k) * (x1 - x0) + t * vel) % (x1 - x0)), y = y0 + h2(i, 3, k) * (y1 - y0) + Math.sin(t * 2 + i) * 2, a = Math.sin(t * 10 + i * 2) > 0;
  if (tranquilo(ri(x), ri(y))) continue; ps(x, y, c); ps(x - 1, y - (a ? 1 : 0), c); ps(x + 1, y - (a ? 1 : 0), c); ps(x - 2, y - (a ? 1 : -1), c); ps(x + 2, y - (a ? 1 : -1), c); } };
// hierba tramada con matas, tréboles y margaritas; las briznas altas se mecen
const cesped = (x0, y0, x1, y1, t, k = 0, o = {}) => {
  relleno(x0, y0, x1, y1, o.ramp ?? HIERBA, (x, y) => 2.6 + (y - y0) / Math.max(1, y1 - y0) * 1.6 + (ns(x * 0.12 + k, y * 0.3) - 0.5) * 1.8 + (h2(x, y, k) > 0.9 ? 1 : 0) + (o.luz ? o.luz(x, y) : 0));
  if (o.vivo === false) return;
};
const briznas = (x0, x1, yb, t, n, k = 0, ramp = HIERBA, alto = 6) => { for (let i = 0; i < n; i++) { const x = x0 + h2(i, 1, k) * (x1 - x0), y = yb + h2(i, 2, k) * 8, hh = 3 + h2(i, 3, k) * alto, s = Math.sin(t * 2.2 + x * 0.1) * 1.3;
  for (let j = 0; j < hh; j++) ps(x + s * (j / hh) ** 2, y - j, ramp[Math.min(ramp.length - 1, 3 + Math.floor(j / 2))]);
  if (h2(i, 4, k) > 0.85) { const fx = ri(x + s), fy = ri(y - hh); ps(fx, fy, BLANCO); ps(fx - 1, fy, BLANCO); ps(fx + 1, fy, BLANCO); ps(fx, fy - 1, BLANCO); ps(fx, fy + 1, BLANCO); ps(fx, fy, H('#e8c040')); } } };
// lápida (x centro, base, ancho, alto): arco, moldura, rayitas de letras, musgo y líquenes; incl: inclinación en px
const lapidaP = (x, base, w, hh, k = 0, o = {}) => {
  const ramp = o.ramp ?? PIEDRA, incl = o.incl ?? 0, tipo = o.tipo ?? 0, x0 = x - w / 2, x1 = x + w / 2, top = base - hh;
  caja(x0 - 1 + Math.min(0, incl), top - w / 2, x1 + 1 + Math.max(0, incl), base, (xx, y) => {
    const u = (base - y) / hh, xs = xx - incl * u, dx = (xs - x) / (w / 2);
    let dentroP = Math.abs(dx) <= 1 && y >= top; if (tipo === 0 && y < top + w / 2) dentroP = Math.hypot(xs - x, (y - top - w / 2) * 1.0) <= w / 2;
    if (tipo === 2 && y < top + 3) dentroP = Math.abs(dx) <= 1 - (top + 3 - y) * 0.12; if (tipo === 1 && y < top + w * 0.35) dentroP = Math.abs(dx) <= 0.35 || (y > top + w * 0.12 && y < top + w * 0.24 && Math.abs(dx) <= 1);
    if (!dentroP) return; const borde = Math.abs(dx) > 0.84;
    let v = 3.2 - dx * 0.9 + (ns(xs * 0.3 + k, y * 0.3) - 0.5) * 1.4 - (borde && dx > 0 ? 1.2 : 0) + (borde && dx < 0 ? 0.6 : 0) - (u < 0.12 ? 0.8 : 0);
    let c = rmp(ramp, v, xx, y);
    if (ns(xs * 0.4 + k * 3, y * 0.4) > 0.72 && u < 0.5) c = rmp(pal(['#3a4a24', '#4a5e2c', '#5e7034']), 1 + ns(xs, y), xx, y);
    if (h2(ri(xs), y, k + 9) > 0.96) c = H('#c8b86a');
    R.pset(xx, y, c); });
  if (o.letras !== false && w > 9) for (let j = 0; j < Math.min(5, Math.floor(hh / 6)); j++) { const yy = top + (tipo === 0 ? w / 2 : 4) + j * 4 + 2; if (yy > base - 4) break; const a = 0.32 - (j === 0 ? 0 : 0.06); for (let xx = ri(x - w * a); xx <= ri(x + w * a); xx++) if (h2(xx, yy, k) > 0.3) { const ux = (base - yy) / hh; ps(xx + incl * ux, yy, ramp[1]); } }
  for (let xx = ri(x0 - 2); xx <= ri(x1 + 3); xx++) sombrea(xx, base + 1, 0.4);
};
// árbol de otoño: tronco con corteza y copa de bolas de tres tonos; hojas que caen
const arbolP = (x, base, alto, r, t, k = 0, o = {}) => {
  const tronco = pal(['#2a1e16', '#3a2a1e', '#4e3828', '#624834']), copa = o.copa ?? pal(['#5a2a10', '#8a4418', '#b86420', '#d88a30', '#ecb050']);
  for (let y = base - alto; y <= base; y++) { const w = 3 + (base - y < 6 ? (6 - (base - y)) * 0.7 : 0); for (let xx = ri(x - w); xx <= ri(x + w); xx++) ps(xx, y, rmp(tronco, 2 - (xx - x) / w * 1.2 + (h2(xx, y >> 1, k) > 0.7 ? -0.8 : 0), xx, y)); }
  R.linea(x, base - alto * 0.6, x - r * 0.6, base - alto - r * 0.1, tronco[1]); R.linea(x, base - alto * 0.7, x + r * 0.5, base - alto - r * 0.2, tronco[1]);
  const cy = base - alto - r * 0.3, mec = Math.sin(t * 1.3 + k) * 1;
  for (let i = 0; i < 9; i++) { const a = h2(i, 1, k) * 6.283, d = h2(i, 2, k) * r * 0.6, bx = x + Math.cos(a) * d + mec, by = cy + Math.sin(a) * d * 0.7, br = r * (0.35 + h2(i, 3, k) * 0.25);
    caja(bx - br, by - br, bx + br, by + br, (xx, y) => { const dd = Math.hypot(xx - bx, y - by) / br; if (dd > 1 || tranquilo(xx, y)) return; if (dd > 0.82 && h2(xx, y, k) > 0.5) return;
      R.pset(xx, y, rmp(copa, 3.2 - (y - by) / br * 1.4 - (xx - bx) / br * 0.4 - dd * 0.8 + (ns(xx * 0.4, y * 0.4) - 0.5) * 1.4, xx, y)); }); }
  for (let i = 0; i < (o.hojas ?? 5); i++) { const f = (t * (0.12 + h2(i, 5, k) * 0.08) + h2(i, 6, k)) % 1, hx = x + (h2(i, 7, k) - 0.5) * r * 2 + Math.sin(t * 2 + i) * 6 + f * 20, hy = cy + f * (base - cy + 10);
    if (!tranquilo(ri(hx), ri(hy))) { ps(hx, hy, copa[3]); ps(hx + 1, hy, copa[2]); } }
};
// fachada de ladrillo georgiana (x0–x1, de y0 a y1) con juntas, hollín y hiladas
const ladrillo = (x0, y0, x1, y1, k = 0, ramp = LADR) => relleno(x0, y0, x1, y1, ramp, (x, y) => { const fila = Math.floor(y / 3), off = (fila % 2) * 4, bx = (x + off) % 8;
  if (y % 3 === 2 || bx === 7) return 0.9 + (ns(x * 0.1, y * 0.1 + k) - 0.5) * 0.6; return 3 + (h2((x + off) >> 3, fila, k) - 0.5) * 1.4 + (ns(x * 0.05 + k, y * 0.05) - 0.5) * 1.2 - Math.max(0, (y0 + 20 - y) / 20) * 0.8; });
// ventana georgiana de fachada (seis sobre seis) con su dintel de piedra; enc 0–1: luz cálida dentro
const ventanaF = (x0, y0, w, hh, enc = 0, o = {}) => {
  R.rect(x0 - 2, y0 - 3, x0 + w + 1, y0 - 1, PIEDRA[5]); for (let x = x0 - 2; x <= x0 + w + 1; x++) ps(x, y0 - 3, PIEDRA[6]);
  caja(x0, y0, x0 + w - 1, y0 + hh - 1, (x, y) => { const v = (y - y0) / hh; R.pset(x, y, enc > 0.05 ? rmp(pal(['#4a2a1a', '#8a5a2a', '#d8a050', '#f4d080']), 1 + enc * 2.4 - v * 0.8 + (ns(x * 0.3, y * 0.2) - 0.5) * 0.6, x, y) : rmp(pal(['#141a2a', '#1e2638', '#2e3a4e', '#4a5a6e']), 1.2 + (o.reflejo ?? 0.6) - v + (x - x0 > w * 0.6 ? 0.6 : 0), x, y)); });
  for (let x = x0; x < x0 + w; x++) { ps(x, y0 + ri(hh / 2), BLANCO); } for (const fx of [1 / 3, 2 / 3]) { const xx = ri(x0 + w * fx); for (let y = y0; y < y0 + hh; y++) ps(xx, y, BLANCO); }
  for (const fy of [1 / 4, 3 / 4]) { const yy = ri(y0 + hh * fy); for (let x = x0; x < x0 + w; x++) ps(x, yy, BLANCO); }
  for (let y = y0; y < y0 + hh; y++) { ps(x0 - 1, y, BLANCO); ps(x0 + w, y, mez(BLANCO, K, 0.3)); } R.rect(x0 - 2, y0 + hh, x0 + w + 1, y0 + hh + 1, PIEDRA[5]);
  if (enc > 0.05) luz(x0 + w / 2, y0 + hh / 2, w * 1.1, H('#ffd890'), enc * 0.3);
};
// adoquines mojados (y0–y1): piedras redondeadas, juntas y brillos
const adoquines = (y0, y1, k = 0, ramp = pal(['#1e1e24', '#2e2e36', '#3e3e46', '#525258', '#6a6a70'])) => caja(0, y0, 319, y1, (x, y) => { const fila = Math.floor((y - y0) / 4), off = (fila % 2) * 4, bx = (x + off) % 8, by = (y - y0) % 4;
  let v = 2.2 + (h2((x + off) >> 3, fila, k) - 0.5) * 1.4 + (by === 0 ? 0.8 : 0) - (bx === 7 || by === 3 ? 1.6 : 0) + (y - y0) / (y1 - y0) * 0.6; if (h2(x, y, k) > 0.96) v += 1.5; R.pset(x, y, rmp(ramp, v, x, y)); });
// una farola de aceite (x, base) con su llama que tiembla y su charco de luz
const farola = (x, base, t, enc = 1) => { R.rect(x - 1, base - 44, x + 1, base, H('#1a1a20')); R.rect(x - 2, base - 3, x + 2, base, H('#1a1a20')); R.rect(x - 4, base - 46, x + 4, base - 45, H('#1a1a20'));
  R.rect(x - 3, base - 55, x + 3, base - 47, H('#1a1a20')); R.rect(x - 2, base - 54, x + 2, base - 48, enc > 0 ? H('#f4d080') : H('#5a6070')); ps(x, base - 56, H('#1a1a20'));
  if (enc > 0) { const tm = 0.85 + Math.sin(t * 11) * 0.08 + Math.sin(t * 5.7) * 0.07; luz(x, base - 51, 18, H('#ffd890'), 0.5 * enc * tm); ps(x, base - 51, H('#fff8d0')); } };
'''

# ══════════════════════════════ LOS FONDOS LOCALES ══════════════════════════════
LOCALES = r'''
// ── A · LA CASA DE LOS GODWIN POR FUERA (The Polygon, Somers Town): de noche (P1) o de día (P15) ──
// Casas georgianas de tres alturas (x 40–320), la puerta con su abanico de cristal (x 150–166, y 110–141), tres
// escalones hasta la acera (y 150), verja de hierro del sótano; a la izquierda, la calle que se abre a los campos y la
// cúpula de San Pablo a lo lejos. La ventana del cuarto de arriba (x 196–212, y 64–82) se enciende al nacer Mary.
const PUERTA_A = [150, 166, 111, 141];
const casaFuera = (t, dia, o = {}) => {
  fijo('casaFuera' + dia, () => {
    // el cielo de noche o de día (nubes después, vivas)
    relleno(0, 0, 319, 100, dia ? pal(['#7a8aa4', '#8e9cb2', '#a4b0c0', '#bcc4cc', '#d0d4d4']) : pal(['#0a0e22', '#10162e', '#18203c', '#222c4a', '#2e3a58']), (x, y) => (dia ? 0.6 : 0.2) + y / 100 * 4 + (ns(x * 0.03, y * 0.08) - 0.5) * 0.8);
    if (!dia) for (let i = 0; i < 90; i++) { const x = ri(h2(i, 1, 4) * 319), y = ri(h2(i, 2, 4) * 70); if (!tranquilo(x, y)) ps(x, y, h2(i, 3, 4) > 0.8 ? BLANCO : H('#8a90b8')); }
    // Londres a lo lejos: tejados, chimeneas y la cúpula de San Pablo, en la bruma
    const lej = dia ? pal(['#6a7488', '#7a8498', '#8a94a6']) : pal(['#1a2038', '#222a44', '#2a3450']);
    for (let x = 0; x < 150; x++) { const hgt = 78 + Math.floor(h2(x >> 3, 1, 2) * 8) + (x % 8 < 2 ? -3 : 0); for (let y = hgt; y <= 104; y++) ps(x, y, rmp(lej, 1 + (ns(x * 0.2, y * 0.2) - 0.5), x, y)); }
    R.disco(58, 66, 10, lej[1]); R.rect(48, 66, 68, 82, lej[1]); R.rect(56, 50, 60, 56, lej[2]); ps(58, 48, lej[2]); ps(58, 47, lej[2]); R.rect(44, 76, 72, 82, lej[0]);
    for (let y = 58; y < 82; y += 4) for (let x = 50; x < 68; x += 3) ps(x, y, lej[0]);
    for (const [ax, ah] of [[22, 60], [104, 64], [128, 70]]) { R.rect(ax - 1, ah, ax + 1, 90, lej[2]); ps(ax, ah - 3, lej[2]); ps(ax, ah - 2, lej[2]); ps(ax, ah - 1, lej[2]); }
    // los campos de Somers Town a la izquierda, con setos y un camino
    relleno(0, 100, 60, 150, dia ? pal(['#3a4a2a', '#4a5a32', '#5a6c3c', '#6e7e48']) : pal(['#141a1c', '#1a2224', '#222c2c', '#2a3634']), (x, y) => 1.4 + (ns(x * 0.1, y * 0.2) - 0.5) * 1.6 + (y - 100) / 50 * 1.2 + (Math.sin(x * 0.4 + y * 0.9) > 0.8 ? 0.6 : 0));
    // la hilera de casas: ladrillo con hollín, cornisa, pretil y chimeneas
    ladrillo(40, 44, 319, 141, 3, dia ? LADR : pal(['#140c0c', '#1e1210', '#2a1814', '#36201a', '#422820', '#4e3026']));
    R.rect(40, 40, 319, 44, dia ? PIEDRA[4] : PIEDRA[1]); for (let x = 40; x < 320; x++) { ps(x, 40, dia ? PIEDRA[6] : PIEDRA[2]); ps(x, 45, dia ? LADR[0] : K); }
    for (const cx of [70, 132, 196, 250]) { if (cx > 268) continue; ladrillo(cx - 8, 28, cx + 8, 40, cx, dia ? LADR : pal(['#140c0c', '#1e1210', '#2a1814', '#36201a', '#422820', '#4e3026'])); R.rect(cx - 9, 27, cx + 9, 28, dia ? PIEDRA[3] : PIEDRA[1]); for (const px of [-5, 0, 5]) { R.rect(cx + px - 1, 22, cx + px + 1, 26, dia ? H('#8a5a3a') : H('#3a2418')); } }
    R.rect(40, 44, 41, 141, dia ? PIEDRA[3] : PIEDRA[0]); for (let y = 44; y <= 141; y++) ps(42, y, K);
    // planta baja estucada
    relleno(40, 108, 319, 141, dia ? pal(['#8a8478', '#a09a8c', '#b8b2a2', '#ccc6b4']) : pal(['#2a2a2e', '#34343a', '#3e3e46', '#4a4a50']), (x, y) => 2 + (ns(x * 0.1, y * 0.2) - 0.5) * 0.8 - (y % 6 === 0 ? 1.2 : 0));
    // ventanas de los pisos
    for (const wx of [56, 96, 136, 196, 236, 276]) { ventanaF(wx, 64, 16, 20, 0, { reflejo: dia ? 1.6 : 0.3 }); if (wx < 270) ventanaF(wx, 50 - 0, 16, 0.1, 0); }
    for (const wx of [56, 96, 136, 196, 236, 276]) ventanaF(wx, 88, 16, 14, 0, { reflejo: dia ? 1.6 : 0.3 });
    for (const wx of [60, 100, 196, 236, 280]) ventanaF(wx, 114, 14, 20, 0, { reflejo: dia ? 1.6 : 0.3 });
    // la puerta de la casa con su abanico de cristal, el montante y las columnillas
    const [px0, px1, py0, py1] = PUERTA_A; R.rect(px0 - 5, py0 - 10, px1 + 5, py1, dia ? PIEDRA[5] : PIEDRA[2]);
    R.disco((px0 + px1) / 2, py0, 8.5, dia ? PIEDRA[5] : PIEDRA[2]); R.disco((px0 + px1) / 2, py0, 7, dia ? H('#2a3040') : H('#0e1018')); for (let a = 0; a < 5; a++) R.linea((px0 + px1) / 2, py0, ri((px0 + px1) / 2 + Math.cos(Math.PI + a / 4 * Math.PI) * 7), ri(py0 + Math.sin(Math.PI + a / 4 * Math.PI) * 7), BLANCO);
    R.rect(px0 - 6, py0, px0 - 4, py1, BLANCO); R.rect(px1 + 4, py0, px1 + 6, py1, BLANCO);
    // escalones y la verja del sótano
    for (let i = 0; i < 3; i++) { R.rect(px0 - 6 - i * 3, py1 + 1 + i * 3, px1 + 6 + i * 3, py1 + 3 + i * 3, dia ? PIEDRA[4 - (i % 2)] : PIEDRA[1 + (i % 2)]); for (let x = px0 - 6 - i * 3; x <= px1 + 6 + i * 3; x++) ps(x, py1 + 1 + i * 3, dia ? PIEDRA[6] : PIEDRA[3]); }
    for (const [a, b] of [[44, 136], [180, 319]]) { R.rect(a, 136, b, 137, K); for (let x = a; x <= b; x += 3) { R.rect(x, 136, x, 150, K); ps(x, 135, K); ps(x, 134, dia ? H('#8a8a90') : H('#3a3a44')); } R.rect(a, 148, b, 149, K); }
    // la acera y la calle
    relleno(0, 150, 319, 157, dia ? PIEDRA : pal(['#1e1e24', '#2a2a30', '#36363e', '#42424a']), (x, y) => 3 - (y - 150) * 0.2 + (x % 20 === 0 ? -1.5 : 0) + (ns(x * 0.2, y) - 0.5));
    for (let x = 0; x < 320; x++) { ps(x, 157, dia ? PIEDRA[1] : K); ps(x, 158, dia ? PIEDRA[5] : PIEDRA[1]); }
    adoquines(159, 179, 2, dia ? pal(['#3a3a40', '#4e4e54', '#626268', '#7a7a80', '#929298']) : undefined);
  });
  // la vida: nubes que corren, pájaros o murciélagos, humo de chimeneas, farola, ventanas que se encienden
  if (dia) { cielo(t, 38, pal(['#7a8aa4', '#8e9cb2', '#a4b0c0']), [], 1); }
  const nb = dia ? [[0.6, H('#c8ccd0'), H('#eceef0'), 14, 0.04], [1.2, H('#a8b0bc'), H('#d8dce2'), 26, 0.05], [2.0, H('#8e98a8'), H('#b8c0cc'), 36, 0.06]]
    : [[0.5, H('#1a2240'), H('#2a3456'), 18, 0.04], [1.0, H('#222a4a'), H('#36406a'), 30, 0.05], [1.7, H('#2a3456'), H('#465078'), 42, 0.06]];
  nb.forEach(([vel, c, cL, yc, fr], i) => { for (let y = yc - 7; y <= yc + 7; y++) for (let x = 0; x < 320; x++) { const xx = x + t * vel * 3 + i * 97, v = ns(xx * fr, y * fr * 2.4 + i * 9) - 0.58 - Math.abs(y - yc) / 20;
    if (v > 0 && v * 7 > b4(x, y)) { const cur = R.pget(x, y); if (y > 40 && x > 40) continue; if (tranquilo(x, y)) continue; R.pset(x, y, v > 0.1 ? cL : c); } } });
  if (!dia) { R.disco(232, 30, 6, H('#e8e4cc')); R.disco(234, 29, 5, H('#f4f0dc')); ps(230, 31, H('#c8c2a8')); }
  for (const cx of [70, 132, 196, 250]) for (let i = 0; i < 6; i++) { const f = (t * 0.25 + i / 6 + cx * 0.01) % 1, x = cx + f * 14 + Math.sin(t + i) * 2, y = 20 - f * 18; if (!tranquilo(ri(x), ri(y))) aclara(x, y, dia ? H('#d8d8dc') : H('#5a6078'), 0.55 * (1 - f)); }
  pajaros(t, dia ? 3 : 2, 0, 270, 22, 46, dia ? 2 : 5, dia ? H('#3a3a40') : H('#0a0c18'));
  farola(110, 150, t, dia ? 0 : 1); farola(290, 150, t, dia ? 0 : 1);
  return PUERTA_A;
};
// la ventana del cuarto donde nace (x 196–212, y 64–84) se enciende; con una silueta que pasa y alza los brazos
const ventanaNace = (t, u) => { if (u <= 0) return; ventanaF(196, 64, 16, 20, u, {}); const sx = 200 + Math.sin(t * 1.5) * 3; if (u > 0.6) { R.rect(ri(sx), 70, ri(sx) + 4, 84, H('#3a2414')); R.disco(ri(sx) + 2, 69, 2.2, H('#3a2414')); } };
// la puerta: abre (0–1) hacia dentro; dentro, el recibidor con luz
const puertaA = (t, ab, luzDentro = 1) => { const [px0, px1, py0, py1] = PUERTA_A, w = ri((px1 - px0) * (1 - ab * 0.8));
  R.rect(px0, py0, px1, py1, luzDentro ? H('#d8a050') : H('#2a1e18')); if (luzDentro) for (let y = py0; y <= py1; y++) for (let x = px0; x <= px1; x++) if (h2(x, y, 5) > 0.7) ps(x, y, H('#c08a40'));
  relleno(px0, py0, px0 + w, py1, pal(['#0e1a14', '#16261e', '#1e3428', '#284234']), (x, y) => 2 + (x === px0 + w ? -1.5 : 0) + ((y - py0) % 10 === 0 || (x - px0) % 8 === 0 ? -0.8 : 0));
  ps(px0 + w - 2, ri((py0 + py1) / 2), ORO[3]); ps(px0 + ri(w / 2), py0 + 6, ORO[2]);
  if (luzDentro && ab > 0) for (let i = 0; i < 26; i++) for (let j = 0; j <= 10 + i * 0.6; j++) aclara(px0 + w + 2 + j * 0.25 - i * 0.2, py1 + 1 + i, H('#ffd890'), 0.25 * (1 - i / 26)); };

// ── A2 · LA LIBRERÍA DE LOS GODWIN EN SKINNER STREET (1812, de día): tres fachadas estrechas; la de los Godwin con la
// tienda abajo: el rótulo verde con un libro dorado (sin letras), el escaparate curvo lleno de libros y estampas, la
// puerta acristalada (x 170–192, y 108–150) y el escaparate de los cuentos con un caballito de madera; el cartel
// colgante que se mece. A la izquierda, la frutería con sus cestas; a la derecha, casas más bajas. Suelo y 152. ──
const PUERTA_T = [170, 192, 110, 150];
const tiendaSkinner = (t, ab) => {
  fijo('tiendaSkinner', () => {
    relleno(0, 0, 319, 60, pal(['#6e82a4', '#8094b2', '#96a8c2', '#aebcd0', '#c4ced8']), (x, y) => 0.6 + y / 60 * 3.6 + (ns(x * 0.03, y * 0.08) - 0.5) * 0.7);
    // la fachada de estuco gris de la izquierda (frutería abajo)
    relleno(0, 26, 96, 150, pal(['#6a6a66', '#7e7e78', '#94948c', '#aaa9a0', '#bebcb2']), (x, y) => 2.6 + (ns(x * 0.1, y * 0.1) - 0.5) * 0.8 - (y % 9 === 0 ? 0.9 : 0) - Math.max(0, (40 - y) / 14));
    R.rect(0, 22, 96, 26, PIEDRA[5]); for (let x = 0; x <= 96; x++) ps(x, 22, PIEDRA[6]);
    for (const wx of [12, 40, 68]) { ventanaF(wx, 36, 14, 18, 0, { reflejo: 1.6 }); ventanaF(wx, 64, 14, 18, 0, { reflejo: 1.6 }); }
    R.rect(0, 94, 96, 100, H('#3a5a2a')); for (let x = 0; x <= 96; x++) { ps(x, 94, H('#5a7a3a')); ps(x, 100, K); }
    caja(6, 104, 60, 140, (x, y) => R.pset(x, y, rmp(pal(['#1a2030', '#2a3446', '#3e4a5e']), 1 + (y - 104) / 36 + (x > 40 ? 0.6 : 0), x, y))); for (let x = 6; x <= 60; x += 9) R.rect(x, 104, x, 140, BLANCO); R.rect(6, 122, 60, 122, BLANCO);
    R.rect(68, 104, 88, 150, H('#2a3a24')); R.rect(70, 106, 86, 124, H('#3a4a6a')); ps(84, 132, ORO[3]);
    // las cestas de fruta en la acera
    for (const [cx, c] of [[12, '#c83a2a'], [30, '#e8a030'], [48, '#7aa83a']]) { R.rect(cx - 7, 140, cx + 7, 150, H('#8a6a3a')); for (let x = cx - 7; x <= cx + 7; x += 2) R.rect(x, 140, x, 150, H('#6a4a2a')); for (let i = 0; i < 7; i++) R.disco(cx - 5 + i * 1.7, 139 - (i % 2), 2, H(c)); ps(cx - 3, 137, BLANCO); }
    // la casa de los Godwin: ladrillo, cornisa, ventanas de tres pisos
    ladrillo(96, 30, 236, 150, 7); R.rect(94, 26, 238, 30, PIEDRA[4]); for (let x = 94; x <= 238; x++) { ps(x, 26, PIEDRA[6]); ps(x, 31, LADR[0]); }
    for (const cx of [122, 208]) { ladrillo(cx - 8, 14, cx + 8, 26, cx); R.rect(cx - 9, 13, cx + 9, 14, PIEDRA[3]); for (const px of [-4, 2]) R.rect(cx + px - 1, 8, cx + px + 1, 12, H('#8a5a3a')); }
    for (const wx of [110, 144, 178, 212]) { ventanaF(wx, 40, 14, 20, 0, { reflejo: 1.6 }); ventanaF(wx, 70, 14, 16, 0, { reflejo: 1.6 }); }
    for (const wx of [110, 144, 178, 212]) { R.rect(wx - 1, 61, wx + 14, 63, H('#5a3a24')); for (let i = 0; i < 5; i++) R.disco(wx + 1 + i * 3, 60, 1.6, [H('#e85a6a'), H('#f8e8f0'), H('#e8c040'), H('#5a8a3a')][i % 4]); }
    // la tienda: pilastras, el rótulo verde con su filete dorado y el libro dorado en medio
    R.rect(98, 96, 234, 108, H('#1e3a2a')); for (let x = 98; x <= 234; x++) { ps(x, 96, ORO[3]); ps(x, 97, H('#2e5a3e')); ps(x, 108, K); } for (let x = 102; x <= 230; x++) { ps(x, 99, ORO[2]); ps(x, 105, ORO[2]); }
    R.rect(156, 99, 176, 105, ORO[3]); R.linea(166, 99, 166, 105, ORO[1]); for (let y = 100; y <= 104; y++) { ps(158, y, ORO[4]); ps(174, y, ORO[4]); } ps(166, 98, ORO[4]);
    for (const px of [98, 164, 230]) { R.rect(px, 108, px + 4, 150, H('#2a4a36')); R.rect(px, 108, px, 150, H('#4a7a5a')); R.rect(px - 1, 146, px + 5, 150, H('#1a2a20')); }
    // el escaparate curvo con libros en tres baldas, estampas y un globo
    caja(103, 110, 163, 146, (x, y) => R.pset(x, y, rmp(pal(['#2a1a10', '#3e2818', '#523620']), 1.2 + (y - 110) / 40, x, y)));
    for (let k = 0; k < 3; k++) { const by = 120 + k * 10; R.rect(104, by + 1, 162, by + 2, CAOBA[4]); let x = 105, n = 0; while (x < 160) { n++; const w = 2 + Math.floor(h2(n, k, 3) * 2), hh = 5 + Math.floor(h2(n, k, 4) * 4); R.rect(x, by - hh + 1, x + w - 1, by, LIBROS[(n * 3 + k) % 10]); ps(x, by - hh + 1, mez(LIBROS[(n * 3 + k) % 10], H('#ffffff'), 0.3)); x += w + (h2(n, k) > 0.85 ? 3 : 0); } }
    for (const [ex, ey] of [[110, 111], [138, 111]]) { R.rect(ex, ey, ex + 10, ey + 6, CREMA); R.rect(ex + 1, ey + 1, ex + 9, ey + 4, H('#7a9a6a')); }
    R.disco(156, 114, 3, H('#c8b47a')); ps(155, 113, H('#8a9a5a'));
    for (let x = 103; x <= 163; x += 6) for (let y = 110; y <= 146; y++) ps(x, y, BLANCO); for (const y of [110, 128, 146]) for (let x = 103; x <= 163; x++) ps(x, y, BLANCO);
    for (let i = 0; i < 22; i++) aclara(108 + i * 2, 142 - i * 1.4, H('#ffffff'), 0.3);
    R.rect(101, 147, 165, 150, H('#2a4a36'));
    // el escaparate de los cuentos (a la derecha de la puerta): un caballito de madera, una peonza y libritos de colores
    caja(196, 112, 228, 146, (x, y) => R.pset(x, y, rmp(pal(['#2a1a10', '#3e2818', '#523620']), 1.4 + (y - 112) / 40, x, y)));
    R.rect(200, 138, 214, 139, H('#8a4a2a')); R.poligono([[199, 140], [207, 143], [215, 140]], H('#8a4a2a')); R.rect(202, 128, 212, 134, H('#e8d8c0')); R.rect(210, 122, 214, 130, H('#e8d8c0')); ps(213, 124, K); R.rect(204, 134, 205, 138, H('#e8d8c0')); R.rect(209, 134, 210, 138, H('#e8d8c0')); ps(201, 129, H('#c83a2a')); R.rect(210, 121, 212, 122, H('#c83a2a'));
    R.poligono([[220, 130], [226, 130], [223, 138]], H('#3a6ac8')); ps(223, 128, K);
    for (let i = 0; i < 5; i++) R.rect(198 + i * 6, 116, 202 + i * 6, 122, LIBROS[(i * 3 + 1) % 10]);
    for (let x = 196; x <= 228; x += 8) for (let y = 112; y <= 146; y++) ps(x, y, BLANCO); for (const y of [112, 129, 146]) for (let x = 196; x <= 228; x++) ps(x, y, BLANCO);
    // la puerta (lo que se abre va encima) y su montante
    R.rect(168, 108, 194, 110, H('#2a4a36'));
    // la casa baja de la derecha, para dejar tranquila la esquina de Atom
    ladrillo(236, 52, 319, 150, 11, pal(['#2a1c18', '#3a2620', '#4c3228', '#5e3e32', '#70503e', '#84604a']));
    R.rect(236, 48, 319, 52, PIEDRA[4]); for (let x = 236; x <= 319; x++) ps(x, 48, PIEDRA[6]);
    for (const wx of [248, 280]) { ventanaF(wx, 62, 14, 18, 0, { reflejo: 1.6 }); ventanaF(wx, 90, 14, 18, 0, { reflejo: 1.6 }); }
    R.rect(262, 116, 282, 150, H('#5a1a1a')); R.rect(264, 118, 280, 132, H('#6a2424')); R.rect(264, 134, 280, 148, H('#6a2424')); ps(278, 136, ORO[3]); R.disco(272, 113, 8, PIEDRA[5]); R.disco(272, 113, 6, H('#2a3040')); R.rect(260, 113, 284, 116, PIEDRA[5]);
    // la acera, el bordillo y los adoquines
    relleno(0, 150, 319, 158, PIEDRA, (x, y) => 3.6 - (y - 150) * 0.2 + ((x + (y > 154 ? 10 : 0)) % 22 === 0 ? -1.6 : 0) + (ns(x * 0.2, y) - 0.5));
    for (let x = 0; x < 320; x++) { ps(x, 158, PIEDRA[1]); ps(x, 159, PIEDRA[5]); }
    adoquines(160, 179, 2, pal(['#3a3a40', '#4e4e54', '#626268', '#7a7a80', '#929298']));
    for (const [cx, cy] of [[60, 170], [230, 176]]) caja(cx - 14, cy - 2, cx + 14, cy + 2, (x, y) => { if (((x - cx) / 14) ** 2 + ((y - cy) / 2.5) ** 2 < 1) R.pset(x, y, rmp(pal(['#6e82a4', '#96a8c2', '#c4ced8']), 1 + (x % 5 === 0 ? 1 : 0), x, y)); });
  });
  // nubes que corren (fuera de la esquina de Atom), humo, palomas en la cornisa y el cartel colgante que se mece
  [[0.5, H('#c4ccd8'), H('#eef0f4'), 10, 0.04], [1.1, H('#a8b4c6'), H('#dce2ea'), 20, 0.05]].forEach(([vel, c, cL, yc, fr], i) => { for (let y = yc - 7; y <= yc + 7; y++) for (let x = 0; x < 320; x++) { const xx = x + t * vel * 3 + i * 97, v = ns(xx * fr, y * fr * 2.4 + i * 9) - 0.56 - Math.abs(y - yc) / 18; if (v > 0 && v * 7 > b4(x, y) && !tranquilo(x, y)) { const cur = R.pget(x, y); if (y > 22 && x < 238) continue; if (y > 46) continue; R.pset(x, y, v > 0.1 ? cL : c); } } });
  for (const cx of [122, 208]) for (let i = 0; i < 5; i++) { const f = (t * 0.3 + i / 5 + cx * 0.01) % 1, x = cx - 1 + f * 12 + Math.sin(t + i) * 2, y = 7 - f * 8; aclara(x, y, H('#e8e8ec'), 0.5 * (1 - f)); }
  for (let i = 0; i < 3; i++) { const x = 140 + i * 18 + (Math.floor(t * 0.7 + i) % 3), y = 25, a = Math.sin(t * 3 + i) > 0.6; R.rect(x - 2, y - 2, x + 1, y, H('#6a6a78')); ps(x + (i % 2 ? 2 : -3), y - 3 - (a ? 1 : 0), H('#4a4a58')); ps(x + (i % 2 ? 2 : -3), y - 2, H('#4a4a58')); }
  { const sw = Math.sin(t * 1.6) * 2; R.rect(198, 90, 214, 91, K); R.linea(201, 91, ri(201 + sw * 0.5), 94, K); R.linea(211, 91, ri(211 + sw * 0.5), 94, K); const sx = ri(199 + sw * 0.5); R.rect(sx, 94, sx + 14, 104, H('#1e3a2a')); R.rect(sx + 1, 95, sx + 13, 103, ORO[2]); R.rect(sx + 2, 96, sx + 12, 102, H('#1e3a2a')); R.rect(sx + 4, 97, sx + 10, 101, CREMA); R.linea(sx + 7, 97, sx + 7, 101, H('#8a7a5a')); }
  // la puerta: abre hacia dentro (ab 0–1); dentro, la tienda en penumbra cálida
  { const [p0, p1, q0, q1] = PUERTA_T; R.rect(p0, q0, p1, q1, H('#4a2e18')); caja(p0, q0, p1, q1, (x, y) => { if ((y - q0) % 6 === 0 && x % 3 === 0) ps(x, y, LIBROS[(x + y) % 10]); });
    const w = ri((p1 - p0) * (1 - ab * 0.8)); relleno(p0, q0, p0 + w, q1, pal(['#14281e', '#1e3a2a', '#2a4a36', '#3a5e46']), (x, y) => 2.2 + (x === p0 + w ? -1.6 : 0) + ((y - q0) % 20 === 0 ? -1 : 0));
    if (w > 6) { caja(p0 + 2, q0 + 2, p0 + w - 2, q0 + 18, (x, y) => R.pset(x, y, rmp(pal(['#3e4a5e', '#6a7a90', '#a0b0c4']), 1 + (x - y) % 7 / 7 * 2, x, y))); ps(p0 + w - 3, 132, ORO[3]); } }
  return PUERTA_T;
};

// ── B · EL ESCRITORIO DE LA MADRE (inserto): la tapa de caoba de cerca con la hoja, el tintero, la vela y los libros ──
const escritorioB = (t) => {
  fijo('escritorioB', () => {
    papel(0, 0, 319, 58, VERDE, 3, { base: 2.0, apaga: (x, y) => (x > 260 ? 0.7 : 0) });
    // la ventana a la izquierda, con el gris de Londres
    ventana(186, 20, 236, 56, (tt, x0, y0, x1, y1) => { relleno(x0, y0, x1, y1, pal(['#8a94a4', '#a0aab4', '#b8bec4']), (x, y) => 1 + (y - y0) / (y1 - y0) * 1.6 + (ns(x * 0.1, y * 0.1) - 0.5)); for (let x = x0; x <= x1; x++) { const hh = 40 + Math.floor(h2(x >> 2, 3) * 8); for (let y = hh; y <= y1; y++) ps(x, y, H('#5a5e6a')); } }, 0, { repisa: false });
    cortina(174, 186, 18, 58, TELA_V, 0, 1, 1); cortina(236, 248, 18, 58, TELA_V, 0, -1, 2);
    cuadro(44, 24, 100, 54, (a, b, c, d) => paisaje(a, b, c, d, 2)); cuadro(112, 30, 132, 54, (a, b, c, d) => relleno(a, b, c, d, pal(['#2a2018', '#4a3a28']), (x, y) => 0.6 + (Math.hypot(x - (a + c) / 2, y - (b + d) / 2 + 2) < 5 ? 1 : 0)));
    for (let x = 0; x < 320; x++) { ps(x, 16, CAOBA[3]); ps(x, 17, CAOBA[5]); }
    // el canto de la tapa y la tapa de caoba con vetas
    R.rect(0, 58, 319, 62, CAOBA[1]); for (let x = 0; x < 320; x++) { ps(x, 58, CAOBA[4]); ps(x, 59, CAOBA[5]); }
    relleno(0, 63, 319, 179, CAOBA, (x, y) => 2.4 + Math.sin(x * 0.05 + ns(x * 0.02, y * 0.08) * 6) * 0.9 + (ns(x * 0.3, y * 0.02) - 0.5) * 0.8 + (y - 63) / 116 * 0.8);
    // un tapete de cuero verde con su filete de oro
    caja(80, 72, 240, 170, (x, y) => { const bo = Math.min(x - 80, y - 72, 240 - x, 170 - y); R.pset(x, y, bo === 2 ? ORO[3] : rmp(TELA_V, 2.4 + (ns(x * 0.1, y * 0.1) - 0.5) * 1.2 + (bo < 2 ? 0.8 : 0), x, y)); });
    // la hoja grande de papel, con su sombra
    for (let y = 80; y <= 160; y++) for (let x = 102; x <= 220; x++) sombrea(x + 3, y + 3, 0.3);
    relleno(100, 78, 218, 158, pal(['#c8b890', '#dccca4', '#ece0c0', '#f6eed8']), (x, y) => 2.4 + (ns(x * 0.15, y * 0.15) - 0.5) * 0.8 - (x > 210 ? 0.6 : 0));
    // los renglones ya escritos de arriba (rayitas, sin letras)
    for (let j = 0; j < 4; j++) { const y = 86 + j * 6; let x = 108; while (x < 206 - (j === 3 ? 40 : 0)) { const w = 3 + Math.floor(h2(x, j, 7) * 9); for (let i = 0; i < w; i++) ps(x + i, y + (h2(x + i, j) > 0.7 ? -1 : 0), H('#3a2e2a')); x += w + 3; } }
    // los libros apilados, el tintero, el salvadera, las gafas, el lacre y la carta
    for (let i = 0; i < 4; i++) { const y = 150 - i * 9, w = 54 - i * 4, x = 12 + i * 2, c = LIBROS[i * 2 + 1]; R.rect(x, y - 8, x + w, y, c); R.rect(x + 2, y - 7, x + w, y - 1, CREMA); for (let xx = x + 3; xx < x + w; xx += 2) ps(xx, y - 4, H('#c8b890')); R.rect(x, y - 8, x + 3, y, c); for (let xx = x; xx <= x + w; xx++) { ps(xx, y - 8, mez(c, H('#ffffff'), 0.3)); ps(xx, y, mez(c, K, 0.4)); } ps(x + 1, y - 5, ORO[3]); }
    R.disco(256, 96, 9, H('#1a1a24')); R.disco(256, 94, 8, H('#2a2a3a')); R.disco(256, 92, 5, H('#0a0a10')); R.disco(254, 91, 1.5, H('#6a6a8a')); for (let x = 248; x <= 264; x++) sombrea(x, 104, 0.4);
    R.rect(270, 120, 280, 136, H('#8a7a5a')); R.rect(270, 118, 280, 120, ORO[2]); for (let x = 271; x < 280; x += 2) ps(x, 119, K);
    R.disco(54, 172, 4, H('#8a8aa0')); R.disco(64, 172, 4, H('#8a8aa0')); R.disco(54, 172, 3, H('#c8d0d8')); R.disco(64, 172, 3, H('#c8d0d8')); R.linea(58, 171, 60, 171, H('#5a5a6a'));
    R.rect(250, 150, 282, 156, H('#a82a2a')); for (let x = 250; x <= 282; x++) ps(x, 150, H('#d84a4a'));
    R.poligono([[236, 160], [286, 164], [282, 178], [232, 176]], H('#e8dcc0')); R.disco(258, 170, 3, H('#a82a2a')); ps(257, 169, H('#e85a5a'));
    // el florero con una rosa
    R.rect(284, 80, 292, 96, H('#5a7a9a')); R.rect(285, 81, 286, 95, H('#8ab0d0')); R.linea(288, 80, 290, 68, H('#3a5a2a')); R.disco(290, 66, 3, H('#c83a4a')); ps(289, 65, H('#f86a7a'));
  });
  // la vela del rincón (arriba a la izquierda de la mesa) y su luz que baila sobre la hoja
  const [vx, vy] = vela(84, 70, t, { alta: 10, halo: 38, fuerza: 0.35 });
  // una polilla que ronda la llama
  const mx = vx + Math.cos(t * 4) * 9, my = vy - 4 + Math.sin(t * 6) * 5; ps(mx, my, H('#d8c8a0')); ps(mx + (parp(t, 30) ? 1 : -1), my, H('#b0a080'));
};

// ── C · EL RECIBIDOR (world 400 px; cámara ox): losas en rombo, la puerta de la calle con su abanico, la jamba con las
// marcas de altura, el medallón de la madre, el reloj de pie y la escalera que sube a la derecha ──
// Puerta de la calle wx 16–56; jamba de las marcas wx 132–138 (marcas en wx 129–131); medallón wx 100, y 56; reloj wx 176;
// escalera de wx 220 (abajo, y 150) a wx 380 (descansillo, y 70); suelo y 150.
const JAMBA = 131, ESC = (wx) => 150 - Math.max(0, Math.min(80, (wx - 236) * 0.56));
const recibidor = (t, ox, dia) => {
  fijo('recibidor' + ox + dia, () => {
    R.rect(0, 0, 319, 179, K);
    const X = (wx) => wx - ox, osc = dia ? 0 : 0.6;
    papel(0, 0, 319, 112, ROSA, 5, { base: dia ? 2.6 : 2.1, apaga: (x, y) => (x + ox > 300 && y < 50 ? 0.5 : 0) });
    friso(0, 319, 112, 141, ROBLE, 34, 2);
    R.rect(0, 141, 319, 143, ROBLE[1]); for (let x = 0; x < 320; x++) ps(x, 141, ROBLE[4]);
    ajedrez(144, 179, 1);
    // moldura del techo
    R.rect(0, 0, 319, 4, YESO[5]); for (let x = 0; x < 320; x++) { ps(x, 4, YESO[3]); ps(x, 5, mez(R.pget(x, 5), K, 0.3)); if (x % 6 < 2) ps(x, 2, YESO[6]); }
    // la puerta de la calle con montante en abanico y montantes laterales
    const dx0 = X(16), dx1 = X(56); if (dx1 > -10) { R.rect(dx0 - 8, 40, dx1 + 8, 143, YESO[5]); R.disco((dx0 + dx1) / 2, 62, 20, YESO[5]); R.disco((dx0 + dx1) / 2, 62, 17, dia ? H('#e8eef4') : H('#3a4258'));
      for (let a = 0; a <= 8; a++) R.linea(ri((dx0 + dx1) / 2), 62, ri((dx0 + dx1) / 2 + Math.cos(Math.PI + a / 8 * Math.PI) * 17), ri(62 + Math.sin(Math.PI + a / 8 * Math.PI) * 17), YESO[6]);
      R.rect(dx0 - 4, 62, dx1 + 4, 64, YESO[6]); relleno(dx0, 65, dx1, 143, pal(['#0e1a14', '#16261e', '#1e3428', '#284234', '#345040']), (x, y) => 2.6 + ((x - dx0) % 20 < 2 ? 1 : 0) + ((y - 65) % 26 < 2 ? -1 : 0) + (ns(x * 0.3, y * 0.1) - 0.5) * 0.8);
      for (const yy of [90, 116]) for (const xx of [dx0 + 4, dx0 + 24]) { R.rect(xx, yy - 20, xx + 12, yy, pal(['#16261e'])[0]); for (let x = xx; x <= xx + 12; x++) { ps(x, yy - 20, H('#3e5a48')); ps(x, yy, H('#0a1410')); } }
      R.disco(dx1 - 5, 104, 2, ORO[3]); R.disco((dx0 + dx1) / 2, 84, 3, ORO[2]); ps((dx0 + dx1) / 2, 84, ORO[4]); }
    // el perchero con sombreros y un paraguas, junto a la puerta
    if (X(74) > -6 && X(74) < 326) { const x = X(74); R.rect(x - 1, 74, x + 1, 143, CAOBA[3]); R.rect(x - 8, 74, x + 8, 76, CAOBA[4]); R.rect(x - 6, 140, x + 6, 143, CAOBA[2]);
      R.rect(x - 9, 70, x - 2, 74, K); R.rect(x - 7, 64, x - 4, 70, K); R.rect(x + 2, 76, x + 7, 98, TELA_A[2]); for (let y = 76; y < 98; y++) ps(x + 2, y, TELA_A[3]); R.linea(x + 4, 110, x + 8, 140, K); R.poligono([[x + 2, 110], [x + 10, 110], [x + 8, 132]], H('#2a2a3a')); }
    // el medallón de la madre en su clavo
    if (X(100) > -12 && X(100) < 332) retratoOval(X(100), 58, 9, 12);
    // la jamba de la puerta de la biblioteca (con las marcas de altura) y la puerta abierta que deja ver la biblioteca
    const j0 = X(132), j1 = X(160);
    if (j1 > 0 && j0 < 320) { R.rect(j0, 34, j1 + 6, 143, ROBLE[4]); R.rect(j0 + 6, 40, j1, 141, K);
      relleno(j0 + 6, 40, j1, 141, CAOBA, (x, y) => 0.6 + (ns(x * 0.2, y * 0.05) - 0.5) * 0.6); for (let y = 46; y < 138; y += 14) R.rect(j0 + 8, y, j1 - 2, y + 1, CAOBA[3]); for (let y = 46; y < 138; y += 14) for (let x = j0 + 8; x < j1 - 1; x += 2) ps(x, y - 4 - (x % 3), LIBROS[(x + y) % 10]);
      for (let y = 34; y <= 143; y++) { ps(j0, y, ROBLE[5]); ps(j0 + 1, y, ROBLE[5]); ps(j0 + 5, y, ROBLE[1]); ps(j1 + 6, y, ROBLE[1]); }
      R.rect(j0 - 2, 30, j1 + 8, 34, ROBLE[5]); for (let x = j0 - 2; x <= j1 + 8; x++) ps(x, 30, YESO[6]); }
    // el reloj de pie (lo vivo va encima)
    // la consola con un jarrón (de día, con flores) entre la jamba y la escalera
    if (X(204) > -20 && X(204) < 340) { const x = X(204); R.rect(x - 14, 116, x + 14, 119, CAOBA[4]); for (let xx = x - 14; xx <= x + 14; xx++) ps(xx, 116, CAOBA[5]); R.rect(x - 12, 120, x - 11, 143, CAOBA[2]); R.rect(x + 11, 120, x + 12, 143, CAOBA[2]); R.rect(x - 12, 128, x + 12, 129, CAOBA[3]);
      R.rect(x - 4, 102, x + 4, 115, H('#2a4a7a')); R.rect(x - 3, 103, x - 2, 114, H('#5a8ac0')); R.rect(x - 5, 101, x + 5, 102, H('#e8e0d0'));
      if (dia) for (let i = 0; i < 9; i++) { const fx = x - 8 + h2(i, 1) * 16, fy = 88 + h2(i, 2) * 12; R.linea(x, 101, ri(fx), ri(fy), H('#3a5a2a')); R.disco(ri(fx), ri(fy), 1.6, [H('#e85a6a'), H('#f8e8f0'), H('#e8c040')][i % 3]); }
      cuadro(x - 18, 56, x + 18, 86, (a, b, c, d) => paisaje(a, b, c, d, 5)); }
    // la escalera que sube a la derecha: peldaños, zanca, barandilla con balaustres y pasamanos de caoba
    for (let wx = 236; wx <= 400; wx++) { const x = X(wx); if (x < 0 || x > 319) continue; const top = ESC(wx), step = Math.floor((wx - 236) / 9);
      for (let y = ri(top); y <= 150; y++) { const enPeld = (wx - 236) % 9; ps(x, y, y < top + 2 ? ROBLE[5] : y < top + 4 ? ROBLE[3] : rmp(ROSA, 1.2 + (ns(x * 0.1, y * 0.1) - 0.5), x, y)); }
      if ((wx - 236) % 9 === 0) for (let y = ri(top); y <= ri(top) + 5; y++) ps(x, y, ROBLE[1]); }
    // el bajo de la escalera: el armarito con su puerta
    for (let wx = 240; wx <= 330; wx++) { const x = X(wx); if (x < 0 || x > 319) continue; for (let y = ri(ESC(wx)) + 6; y <= 143; y++) ps(x, y, rmp(ROBLE, 2.2 + (ns(x * 0.2, y * 0.08) - 0.5) + ((wx - 240) % 30 < 2 ? -1.2 : 0), x, y)); }
    for (let wx = 236; wx <= 400; wx += 5) { const x = X(wx); if (x < 0 || x > 319) continue; const top = ESC(wx); R.rect(x, ri(top - 22), x, ri(top), CAOBA[4]); ps(x, ri(top - 12), CAOBA[5]); ps(x + 1, ri(top - 22), CAOBA[2]); }
    for (let wx = 230; wx <= 400; wx++) { const x = X(wx); if (x < 0 || x > 319) continue; const top = ESC(wx) - 24; ps(x, ri(top), CAOBA[5]); ps(x, ri(top) + 1, CAOBA[3]); ps(x, ri(top) + 2, CAOBA[1]); }
    if (X(232) > -4 && X(232) < 324) { const x = X(232); R.rect(x - 2, 118, x + 2, 150, CAOBA[3]); R.disco(x, 117, 3, CAOBA[4]); ps(x - 1, 116, CAOBA[5]); }
    // la alfombra larga del pasillo
    for (let y = 152; y <= 166; y++) for (let x = 0; x < 320; x++) { const wx = x + ox; if (wx > 226) continue; const bo = Math.min(y - 152, 166 - y); R.pset(x, y, bo < 1 ? H('#d8b060') : bo < 3 ? TELA_R[1] : ((wx + y * 2) % 12 < 2 ? H('#d8b060') : TELA_R[3])); }
    // la luz que entra por el abanico (de día) o la penumbra (de noche)
    if (dia) for (let i = 0; i < 60; i++) for (let j = 0; j < 30; j++) { const x = X(36) + i * 1.2 + j * 0.3, y = 62 + i * 1.4; if (j < 10 + i * 0.3) aclara(x + j * 0.6, y, H('#fff0c8'), 0.12 * (1 - i / 60)); }
    if (!dia) caja(0, 0, 319, 179, (x, y) => sombrea(x, y, 0.18));
  });
  const X = (wx) => wx - ox;
  if (X(176) > -12 && X(176) < 332) relojPie(X(176), 143, t, 76);
  // apliques con vela a los lados del medallón
  for (const wx of [84, 116]) if (X(wx) > 0 && X(wx) < 318) { R.rect(X(wx) - 2, 74, X(wx) + 2, 75, ORO[2]); vela(X(wx), 74, t, { alta: 5, sinPie: true, halo: 12, fuerza: dia ? 0.15 : 0.4 }); }
  return { X, suelo: 150 };
};
// las marcas de altura en la jamba: n marcas a alturas ys, con su numerito (edad)
const marcasJamba = (X, ys, edades, u = 1) => { ys.forEach((y, i) => { const a = cl(u * ys.length - i); if (a <= 0) return; const x = X(JAMBA) - 4; for (let k = 0; k < ri(9 * a); k++) { ps(x + k, y, H('#1a1210')); ps(x + k, y + 1, H('#5a4030')); } if (a >= 1 && edades) R.numero(String(edades[i]), x + 17, y + 3, { centro: true, color: H('#f4e8c8') }); }); };

// ── D · EL CUARTO DE LA BUHARDILLA (world 400 px; cámara ox): techo en pendiente con vigas, yeso con grietas, la cama
// de la niña con su colcha de retales (wx 96–176), la buhardilla con su ventana y el asiento (wx 196–262, asiento y 120),
// el lavamanos con jarra (wx 280–312), la cómoda con el calendario (wx 330–380); suelo y 150. Noche o madrugada. ──
const ASIENTO_D = 120;
const buhardilla = (t, ox, luzC) => {
  // luzC: 0 noche, 1 madrugada (el cielo clarea)
  const clave = 'buhardilla' + ox + (luzC > 0.5 ? 'm' : 'n');
  fijo(clave, () => {
    const X = (wx) => wx - ox;
    // el yeso: manchas de humedad, desconchones con el enlistonado y el ladrillo a la vista
    relleno(0, 0, 319, 143, YESO, (x, y) => { const wx = x + ox; let v = 3.4 + (ns(wx * 0.05, y * 0.07) - 0.5) * 1.2 + (h2(wx >> 1, y >> 1, 3) > 0.94 ? -0.8 : 0); if (ns(wx * 0.03 + 4, y * 0.05) > 0.7) v -= 0.8; if (ns(wx * 0.02 + 9, y * 0.03) > 0.74) v -= 0.6; return v; });
    for (const [wx, wy, w, hh] of [[64, 96, 26, 14], [232, 128, 20, 10], [370, 40, 22, 16]]) { const x = X(wx); if (x < -30 || x > 330) continue;
      caja(x, wy, x + w, wy + hh, (xx, y) => { const d = ((xx - x - w / 2) / (w / 2)) ** 2 + ((y - wy - hh / 2) / (hh / 2)) ** 2; if (d > 1 + (h2(xx, y, 2) - 0.5) * 0.5) return; R.pset(xx, y, (y - wy) % 3 === 0 ? YESO[0] : (xx + y) % 9 < 5 ? ROBLE[2] : LADR[3]); }); }
    for (const [wx, wy] of [[40, 90], [180, 56], [300, 108], [360, 76]]) { const x = X(wx); if (x < -20 || x > 340) continue; R.linea(x, wy, x + 6, wy + 5, YESO[0]); R.linea(x + 6, wy + 5, x + 4, wy + 11, YESO[0]); R.linea(x + 6, wy + 5, x + 11, wy + 7, YESO[0]); }
    // el techo en pendiente a los dos lados (buhardilla) y las vigas
    for (let x = 0; x < 320; x++) { const wx = x + ox, yb = Math.max(0, 66 - wx * 0.6, 66 - (420 - wx) * 0.6); for (let y = 0; y <= yb; y++) ps(x, y, rmp(YESO, 1.8 + (ns(wx * 0.1, y * 0.1) - 0.5) - y * 0.01, x, y)); if (yb > 0) { ps(x, ri(yb), YESO[0]); ps(x, ri(yb) + 1, YESO[1]); } }
    for (let wx = 20; wx < 420; wx += 50) { const x = X(wx); if (x < -8 || x > 328) continue; const yb = Math.max(0, 66 - wx * 0.6, 66 - (420 - wx) * 0.6); R.rect(x - 3, 0, x + 3, ri(yb) + 3, ROBLE[2]); R.rect(x - 3, 0, x - 2, ri(yb) + 3, ROBLE[3]); R.rect(x - 4, ri(yb) + 2, x + 4, ri(yb) + 4, ROBLE[1]); }
    R.rect(0, 0, 319, 5, ROBLE[2]); for (let x = 0; x < 320; x++) { ps(x, 5, ROBLE[0]); ps(x, 1, ROBLE[3]); if ((x + ox) % 23 === 0) ps(x, 3, K); }
    // el rodapié y el suelo de tablas viejas
    R.rect(0, 141, 319, 144, ROBLE[1]); for (let x = 0; x < 320; x++) ps(x, 141, ROBLE[3]);
    tarima(145, ROBLE, 4);
    // la alfombrilla de trapo trenzada
    caja(X(170), 156, X(250), 172, (x, y) => { const d = ((x - X(210)) / 40) ** 2 + ((y - 164) / 8) ** 2; if (d > 1) return; const an = Math.floor(Math.sqrt(d) * 6); R.pset(x, y, [TELA_R[2], H('#8a7a5a'), TELA_A[2], H('#a89a72'), TELA_R[3], H('#6a5a3a')][an % 6]); });
    // la balda con libros, una muñeca de trapo y una caja de costura
    { const x = X(56); if (x > -50 && x < 330) { R.rect(x, 78, x + 44, 80, ROBLE[4]); for (let xx = x; xx <= x + 44; xx++) { ps(xx, 78, ROBLE[5]); ps(xx, 81, mez(R.pget(xx, 81), K, 0.4)); } R.linea(x + 4, 81, x + 8, 86, ROBLE[2]); R.linea(x + 40, 81, x + 36, 86, ROBLE[2]);
      for (let i = 0; i < 5; i++) { const c = LIBROS[i * 2], hh = 9 + (i % 3); R.rect(x + 3 + i * 4, 77 - hh, x + 5 + i * 4, 77, c); ps(x + 4 + i * 4, 77 - hh + 2, ORO[3]); }
      R.disco(x + 30, 70, 2.5, H('#e8c8a8')); R.rect(x + 28, 72, x + 32, 77, H('#c84a5a')); ps(x + 29, 70, K); ps(x + 31, 70, K); R.rect(x + 28, 67, x + 32, 68, H('#8a5a30'));
      R.rect(x + 35, 72, x + 43, 77, H('#6a4a2a')); R.rect(x + 35, 72, x + 43, 73, H('#8a6a3a')); ps(x + 39, 71, H('#c8c8d0')); } }
    // el dechado bordado en su marco (flores y una casita, sin letras) y una silueta recortada
    { const x = X(128); if (x > -30 && x < 330) { R.rect(x, 56, x + 22, 78, ROBLE[3]); R.rect(x + 2, 58, x + 20, 76, H('#e8dcc0')); for (let i = 0; i < 4; i++) { R.disco(x + 5 + i * 4, 62, 1.2, [H('#c83a4a'), H('#3a6a3a'), H('#3a4a8a'), H('#c88a2a')][i]); }
      R.rect(x + 7, 67, x + 15, 74, H('#a84a3a')); R.poligono([[x + 6, 67], [x + 11, 63], [x + 16, 67]], H('#5a3a2a')); R.rect(x + 10, 70, x + 12, 74, H('#3a2a1a')); for (let xx = x + 3; xx < x + 20; xx += 2) ps(xx, 75, H('#3a6a3a')); } }
    { const x = X(176); if (x > -20 && x < 330) { R.disco(x, 66, 7, ORO[1]); R.disco(x, 66, 6, H('#f0e8d4')); R.disco(x + 1, 63, 2.5, K); R.rect(x - 2, 66, x + 3, 71, K); ps(x + 3, 63, K); } }
    // los colgadores con el chal y la cofia
    { const x = X(312); if (x > -30 && x < 340) { R.rect(x - 2, 60, x + 26, 62, ROBLE[3]); for (const dx of [2, 12, 22]) { ps(x + dx, 63, ORO[2]); ps(x + dx, 64, ORO[2]); }
      R.poligono([[x, 64], [x + 6, 64], [x + 8, 92], [x + 3, 96], [x - 2, 90]], (xx, y) => rmp(TELA_R, 2 + Math.sin(xx * 1.2 + y * 0.2) * 0.8 + ((xx + y) % 5 === 0 ? 1 : 0), xx, y));
      R.disco(x + 12, 70, 4, H('#e8e0d0')); R.rect(x + 8, 70, x + 16, 73, H('#e8e0d0')); R.linea(x + 9, 73, x + 7, 80, H('#c8c0b0')); R.disco(x + 22, 74, 3, H('#6a4a2a')); R.rect(x + 19, 74, x + 25, 76, H('#6a4a2a')); } }
    // la cama con cabecero de hierro y colcha de retales; el baúl a sus pies
    { const x0 = X(96), x1 = X(176); if (x1 > 0 && x0 < 320) { R.rect(x0, 92, x0 + 2, 150, H('#2a2a30')); R.rect(x0, 92, x0 + 18, 93, H('#2a2a30')); for (let x = x0 + 4; x < x0 + 18; x += 4) R.rect(x, 93, x, 116, H('#3a3a44')); R.disco(x0 + 1, 91, 2, ORO[2]);
      R.rect(x0 + 2, 112, x1, 124, BLANCO); R.rect(x0 + 4, 108, x0 + 22, 116, H('#f4f0e8')); for (let x = x0 + 4; x <= x0 + 22; x++) ps(x, 116, H('#c8c0b0'));
      caja(x0 + 20, 114, x1, 134, (x, y) => { const c = Math.floor((x - x0) / 9) + Math.floor((y - 114) / 7) * 3; R.pset(x, y, rmp([TELA_R, TELA_A, OCRE, TELA_V][c % 4], 2.6 + ((x - x0) % 9 === 0 || (y - 114) % 7 === 0 ? -1.4 : 0) + (h2(c, 1) - 0.5) + (y > 130 ? -0.8 : 0), x, y)); });
      R.rect(x1 - 2, 104, x1, 150, H('#2a2a30')); R.disco(x1 - 1, 103, 2, ORO[2]); R.rect(x0 + 4, 134, x1 - 2, 136, H('#2a2a30'));
      relleno(x1 + 2, 132, x1 + 22, 150, ROBLE, (x, y) => 2.4 + ((y - 132) % 6 === 0 ? -1.4 : 0)); R.rect(x1 + 2, 138, x1 + 22, 139, H('#3a3a44')); ps(x1 + 12, 141, ORO[3]); } }
    // la buhardilla: el hueco con su ventana y el asiento con cojín
    { const x0 = X(196), x1 = X(262); if (x1 > 0 && x0 < 320) {
      relleno(x0 - 6, 30, x1 + 6, 124, YESO, (x, y) => 2.2 + (ns(x * 0.1, y * 0.1) - 0.5) - (x < x0 ? 0.8 : x > x1 ? 0.8 : 0)); R.poligono([[x0 - 8, 30], [(x0 + x1) / 2, 16], [x1 + 8, 30]], YESO[2]);
      R.rect(x0 - 4, ASIENTO_D, x1 + 4, ASIENTO_D + 4, ROBLE[4]); for (let x = x0 - 4; x <= x1 + 4; x++) ps(x, ASIENTO_D, ROBLE[5]); relleno(x0 - 4, ASIENTO_D + 5, x1 + 4, 143, ROBLE, (x, y) => 2 + ((x - x0) % 16 < 2 ? -1 : 0) + ((y - ASIENTO_D) % 8 === 0 ? -0.8 : 0));
      R.rect(x0, ASIENTO_D - 4, x1, ASIENTO_D - 1, TELA_A[3]); for (let x = x0; x <= x1; x++) ps(x, ASIENTO_D - 4, TELA_A[4]); for (let x = x0 + 4; x < x1; x += 8) ps(x, ASIENTO_D - 2, TELA_A[1]); } }
    // el lavamanos con la palangana y la jarra, y un espejito
    { const x = X(296); if (x > -20 && x < 340) { R.rect(x - 16, 114, x + 16, 117, ROBLE[4]); R.rect(x - 15, 118, x - 14, 150, ROBLE[2]); R.rect(x + 14, 118, x + 15, 150, ROBLE[2]); R.rect(x - 15, 136, x + 15, 137, ROBLE[3]);
      R.disco(x - 4, 112, 7, BLANCO); R.rect(x - 11, 112, x + 3, 114, BLANCO); R.disco(x - 4, 112, 5, H('#b8c8d0')); R.rect(x + 6, 100, x + 11, 113, BLANCO); R.rect(x + 7, 98, x + 10, 100, BLANCO); ps(x + 12, 103, BLANCO); ps(x + 12, 106, BLANCO); R.rect(x + 7, 104, x + 10, 105, H('#5a8ac0'));
      R.rect(x - 8, 82, x + 6, 98, ORO[1]); R.rect(x - 7, 83, x + 5, 97, H('#5a6070')); R.linea(x - 5, 95, x + 3, 85, H('#8a90a0')); R.rect(x - 12, 142, x - 4, 148, H('#c8c0b0')); } }
    // la cómoda (lo de encima lo pone el plano)
    { const x0 = X(330), x1 = X(384); if (x1 > 0 && x0 < 320) { relleno(x0, 110, x1, 148, CAOBA, (x, y) => 2.4 + (ns(x * 0.3, y * 0.05) - 0.5) + ((y - 110) % 12 < 1 ? -1.4 : 0)); for (let y = 116; y < 148; y += 12) { ps((x0 + x1) / 2 - 6, y, ORO[3]); ps((x0 + x1) / 2 + 6, y, ORO[3]); } R.rect(x0 - 2, 108, x1 + 2, 110, CAOBA[5]);
      R.rect(x0 + 6, 96, x0 + 14, 108, H('#6a1c1c')); R.rect(x0 + 16, 100, x0 + 26, 108, H('#1c3a5a')); R.disco(x0 + 40, 102, 5, H('#d8c8a8')); R.disco(x0 + 40, 101, 3, H('#e8a080')); } }
    // la puerta del cuarto a la izquierda
    { const x0 = X(10), x1 = X(52); if (x1 > 0 && x0 < 320) { R.rect(x0 - 3, 56, x1 + 3, 143, ROBLE[4]); relleno(x0, 60, x1, 143, ROBLE, (x, y) => 2 + ((x - x0) % 14 < 1 ? -1.2 : 0) + (ns(x * 0.3, y * 0.05) - 0.5) + ((y - 60) % 40 < 1 ? -1 : 0)); R.disco(x1 - 5, 104, 2, ORO[2]); R.rect(x1 - 7, 108, x1 - 4, 112, ORO[1]); } }
    // la noche: todo en penumbra azul (la luz de la vela y de la ventana la pone el plano)
    caja(0, 0, 319, 179, (x, y) => R.pset(x, y, mez(R.pget(x, y), luzC > 0.5 ? H('#2a2440') : H('#0a0c22'), luzC > 0.5 ? 0.42 : 0.55)));
  });
  const X = (wx) => wx - ox;
  // lo de fuera de la ventana: el cielo de noche con estrellas (o la madrugada que clarea) y los tejados de Londres
  { const x0 = X(204), x1 = X(254), y0 = 40, y1 = 112;
    if (x1 > 0 && x0 < 320) ventana(x0, y0, x1, y1, (tt, a, b, c, d) => {
      relleno(a, b, c, d, luzC > 0.5 ? pal(['#1e2648', '#3a3a68', '#6a5478', '#b87a6a', '#e8a870']) : pal(['#060818', '#0a0e24', '#101630', '#18203e']), (x, y) => (y - b) / (d - b) * (luzC > 0.5 ? 4.2 : 3) + (ns(x * 0.1, y * 0.1) - 0.5) * 0.5);
      if (luzC < 0.5) for (let i = 0; i < 26; i++) { const x = a + h2(i, 1, 9) * (c - a), y = b + h2(i, 2, 9) * (d - b) * 0.6, on = Math.sin(t * (2 + h2(i, 3, 9) * 3) + i) > -0.3; ps(x, y, on ? BLANCO : H('#6a70a0')); }
      for (let x = a; x <= c; x++) { const hh = d - 16 - Math.floor(h2((x + ox) >> 3, 2, 3) * 10); for (let y = hh; y <= d; y++) ps(x, y, luzC > 0.5 ? H('#2a2434') : H('#0a0a12')); if (h2((x + ox) >> 3, 4) > 0.6 && (x + ox) % 8 === 3) R.rect(x, hh - 5, x + 1, hh, luzC > 0.5 ? H('#2a2434') : H('#0a0a12')); }
      for (let i = 0; i < 3; i++) { const wx2 = a + 8 + i * 14, wy = d - 8; if (h2(i, 5) > 0.4 || luzC > 0.5) ps(wx2, wy, H('#e8b860')); }
      if (luzC < 0.5) { R.disco(c - 12, b + 12, 5, H('#e8e4cc')); R.disco(c - 10, b + 11, 4, H('#06081a')); }
      for (let i = 0; i < 5; i++) { const f = (t * 0.2 + i / 5) % 1; aclara(a + 10 + i * 8 + f * 6, d - 20 - f * 16, luzC > 0.5 ? H('#8a7a8a') : H('#2a2e48'), 0.5 * (1 - f)); }
    }, t, { cols: 2, filas: 4, marco: luzC > 0.5 ? YESO[4] : YESO[2] });
    // el haz de luna (o el primer gris) sobre el suelo
    const a2 = luzC > 0.5 ? 0.12 : 0.2; for (let y = 145; y < 179; y++) for (let x = x0 - 10; x < x1 - 4; x++) { const xx = x - (y - 145) * 0.9; if (((xx - x0 + 10) % 26) < 23) aclara(xx, y, luzC > 0.5 ? H('#e8b090') : H('#a8b8e8'), a2); }
    // la cortina rala que se mueve con la corriente
    for (let y = y0; y < y1; y++) for (let i = 0; i < 8; i++) { const x = x1 - 2 - i + Math.sin(t * 1.4 + y * 0.08) * 1.5 * (y - y0) / (y1 - y0); aclara(x, y, H('#e8e0d0'), 0.3); }
  }
  // un ratón que asoma por el rodapié y se esconde
  { const x = X(288), f = (t * 0.5) % 4; if (x > 0 && x < 320 && f < 1.5) { const s = ri(Math.sin(Math.min(1, f) * Math.PI) * 4); R.rect(x - s, 147, x - s + 3, 149, H('#6a6070')); ps(x - s - 1, 148, H('#6a6070')); ps(x - s, 146, H('#8a8090')); ps(x - s - 1, 147, K); } }
  return { X };
};

// ── F · EL LIBRO SOBRE LAS RODILLAS (inserto): la falda de muselina, la hierba, la sombra de la lápida ──
const FALDA = pal(['#2a3256', '#36406a', '#46527e', '#5a6892', '#7080a8', '#8a98bc']);
const rodillas = (t, hoja) => {
  fijo('rodillas', () => {
    // la hierba de alrededor, con margaritas y tréboles, a la sombra de la lápida arriba a la izquierda
    cesped(0, 0, 319, 179, 0, 7, { luz: (x, y) => -Math.max(0, (110 - x - y * 0.9) / 80) * 1.8 });
    for (let i = 0; i < 90; i++) { const x = ri(h2(i, 1, 2) * 319), y = ri(h2(i, 2, 2) * 179); if (tranquilo(x, y)) continue; if (h2(i, 3) > 0.55) { ps(x, y, BLANCO); ps(x - 1, y, BLANCO); ps(x + 1, y, BLANCO); ps(x, y - 1, BLANCO); ps(x, y + 1, BLANCO); ps(x, y, H('#e8c040')); } else { ps(x, y, HIERBA[6]); ps(x + 1, y, HIERBA[5]); ps(x, y + 1, HIERBA[5]); ps(x - 1, y, HIERBA[4]); } }
    // el pie de la lápida asoma arriba a la izquierda, con musgo
    relleno(0, 0, 70, 22, PIEDRA, (x, y) => 3 + (ns(x * 0.2, y * 0.3) - 0.5) * 1.4 - (y > 19 ? 1.6 : 0) + (ns(x * 0.4 + 3, y * 0.4) > 0.72 ? -1.2 : 0)); for (let x = 0; x <= 70; x++) sombrea(x, 23, 0.4);
    for (let i = 0; i < 8; i++) { const x = 6 + i * 8; R.linea(x, 22, x + 1, 16, HIERBA[5]); if (i % 3 === 0) { ps(x + 1, 15, H('#e85a6a')); ps(x, 15, H('#f89aa8')); } }
    // la falda azul que cubre las rodillas, con sus pliegues que salen del regazo
    // dos rodillas redondas arriba, el hueco del regazo entre ellas y la falda que se abre hacia abajo
    const arriba = (x) => 64 - 20 * Math.exp(-(((x - 100) / 46) ** 2)) - 20 * Math.exp(-(((x - 220) / 46) ** 2));
    const lado = (y) => 40 - (y - 50) * 0.16;
    caja(0, 30, 319, 179, (x, y) => { const top = arriba(x), l = lado(y); if (y < top || x < l || x > 320 - l) return;
      const bo = Math.min(y - top, x - l, 320 - l - x), k1 = Math.hypot(x - 100, (y - 50) * 1.3), k2 = Math.hypot(x - 220, (y - 50) * 1.3), luzK = Math.max(0, 1 - Math.min(k1, k2) / 60);
      const pl = Math.sin((x - 160) * 0.14 + Math.sign(x - 160) * (y - 50) * 0.04);
      let v = 2.2 + luzK * 2 + pl * 0.8 - (bo < 3 ? 1.4 : 0) + (ns(x * 0.1, y * 0.1) - 0.5) * 0.4; let c = rmp(FALDA, v, x, y); if ((x * 5 + y * 9) % 41 === 0) c = H('#e8e0d0');
      R.pset(x, y, bo < 1 ? FALDA[0] : c); });
    for (let x = 30; x < 290; x++) sombrea(x, ri(arriba(x)) - 1, 0.3);
  });
  // el libro abierto: dos páginas con un grabado (un pájaro en una rama) y renglones de rayitas
  const bx0 = 76, bx1 = 244, by0 = 64, by1 = 156, mid = 160;
  for (let y = by0 + 2; y <= by1 + 3; y++) for (let x = bx0 + 2; x <= bx1 + 4; x++) sombrea(x + 3, y + 3, 0.22);
  R.rect(bx0 - 3, by0 - 2, bx1 + 3, by1 + 3, H('#5a1c1c')); for (let x = bx0 - 3; x <= bx1 + 3; x++) { ps(x, by1 + 3, H('#3a0e0e')); ps(x, by0 - 2, H('#7a2a2a')); } for (let y = by0; y <= by1; y += 3) { ps(bx0 - 2, y, H('#e0d4b4')); ps(bx1 + 2, y, H('#e0d4b4')); }
  caja(bx0, by0, bx1, by1, (x, y) => { const d = Math.abs(x - mid); R.pset(x, y, rmp(pal(['#a89878', '#c8b896', '#e0d4b4', '#f0e8d0']), 3.2 - Math.max(0, 1 - d / 12) * 1.8 + (ns(x * 0.2, y * 0.2) - 0.5) * 0.4, x, y)); });
  for (let y = by0; y <= by1; y++) ps(mid, y, H('#8a7a5a'));
  { const ox = 86, oy = 72, ink = H('#3a2e22'); R.linea(ox + 4, oy + 50, ox + 62, oy + 30, ink); R.linea(ox + 4, oy + 51, ox + 62, oy + 31, ink); R.linea(ox + 36, oy + 40, ox + 48, oy + 22, ink); for (let i = 0; i < 7; i++) { R.disco(ox + 12 + i * 7, oy + 46 - i * 2.5 + (i % 2) * 5, 2.4, ink); }
    R.disco(ox + 30, oy + 30, 7, ink); R.disco(ox + 30, oy + 30, 6, H('#e0d4b4')); R.disco(ox + 37, oy + 24, 4, ink); R.disco(ox + 37, oy + 24, 3, H('#e0d4b4')); ps(ox + 38, oy + 23, ink); R.linea(ox + 41, oy + 24, ox + 44, oy + 25, ink); R.linea(ox + 22, oy + 33, ox + 14, oy + 38, ink); R.linea(ox + 22, oy + 32, ox + 14, oy + 37, ink); for (let i = 0; i < 4; i++) ps(ox + 26 + i * 2, oy + 29 + (i % 2), ink);
    for (let y = oy + 60; y < by1 - 4; y += 5) for (let x = ox + 2; x < mid - 6; x++) if (h2(x >> 1, y, 3) > 0.35) ps(x, y, H('#5a4e40')); }
  { R.rect(168, 72, 186, 90, H('#8a2a2a')); R.rect(170, 74, 184, 88, H('#e0d4b4')); R.disco(177, 81, 4, H('#8a2a2a')); ps(177, 81, ORO[3]); ps(176, 80, ORO[4]);
    for (let y = 74; y < by1 - 4; y += 5) for (let x = y < 92 ? 190 : 168; x < bx1 - 6; x++) if (h2(x >> 1, y, 4) > 0.3) ps(x, y, H('#5a4e40')); }
  // la página que pasa (hoja 0–1): se levanta de la derecha, cruza y cae a la izquierda
  if (hoja > 0 && hoja < 1) { const a = hoja * Math.PI, ex = mid + Math.cos(a) * (bx1 - mid), lift = Math.sin(a) * 18;
    R.poligono([[mid, by0], [ex, by0 - lift], [ex, by1 - lift * 0.6], [mid, by1]], (x, y) => rmp(pal(['#a89878', '#d8ccac', '#f4ecd8']), 1.4 + Math.cos(a) * 0.6 + (x === ri(ex) ? -1 : 0), x, y)); R.linea(mid, by0, ri(ex), ri(by0 - lift), H('#8a7a5a')); }
  return { bx0, bx1, by0, by1, mid };
};

// ── G · ENTRE LAS LÁPIDAS (otro sitio del cementerio, cámara baja): lápidas grandes delante a los dos lados, filas que
// se alejan, el muro del fondo con la cancela, el árbol de otoño; el sol que se abre paso ──
const SUELO_G = 150;
const entreLapidas = (t, sol) => {
  fijo('entreLapidas', () => {
    relleno(0, 0, 319, 96, pal(['#5a6070', '#6e7484', '#868c98', '#9ea2aa', '#b4b6b8']), (x, y) => 0.8 + y / 96 * 3.4 + (ns(x * 0.03, y * 0.08) - 0.5) * 0.8);
    // tejados de Londres a lo lejos en la bruma
    for (let x = 0; x < 320; x++) { const hh = 74 + Math.floor(h2(x >> 3, 1, 6) * 8) + (x % 8 < 2 ? -3 : 0); for (let y = hh; y < 96; y++) ps(x, y, rmp(pal(['#6e727e', '#7a7e88', '#868a92']), 1 + (ns(x * 0.2, y * 0.2) - 0.5), x, y)); }
    // el muro de ladrillo del fondo con albardilla y la cancela
    ladrillo(0, 92, 319, 108, 4); R.rect(0, 90, 319, 92, PIEDRA[4]); for (let x = 0; x < 320; x++) ps(x, 90, PIEDRA[6]);
    R.rect(196, 84, 198, 108, K); R.rect(226, 84, 228, 108, K); for (let x = 199; x < 226; x += 3) R.rect(x, 88 + Math.abs(x - 212) * 0.2, x, 108, H('#2a2a30')); R.disco(197, 83, 2, K); R.disco(227, 83, 2, K);
    cesped(0, 108, 319, 179, 0, 3);
    // filas de lápidas que se alejan (las del fondo, pequeñas y claras; las de delante, grandes y con musgo)
    for (let i = 0; i < 12; i++) { const x = 10 + i * 27 + h2(i, 1, 4) * 10; if (x > 186 && x < 238) continue; lapidaP(x, 116, 7 + h2(i, 2) * 3, 9 + h2(i, 3) * 4, i, { tipo: i % 3, incl: (h2(i, 4) - 0.5) * 3, ramp: pal(['#6a6a66', '#7a7a74', '#8a8a84', '#9a9a92', '#aaa9a0', '#b8b6ac', '#c4c2b8']) }); }
    for (let i = 0; i < 8; i++) { const x = 20 + i * 42 + h2(i, 5, 4) * 12; if (x > 120 && x < 196) continue; lapidaP(x, 132, 12 + h2(i, 6) * 4, 16 + h2(i, 7) * 6, i + 20, { tipo: (i + 1) % 3, incl: (h2(i, 8) - 0.5) * 5 }); }
    // la tumba de cajón en el centro (detrás de la cual está la niña)
    // el árbol de otoño (lo vivo, la copa, va encima)
    // las grandes de delante a los lados
    lapidaP(30, 182, 44, 100, 51, { tipo: 0, incl: -4 }); lapidaP(292, 182, 40, 92, 52, { tipo: 2, incl: 5 });
  });
  arbolP(84, 134, 54, 28, t, 3, { hojas: 6 });
  // las nubes que corren y, en «least alone», el sol que se abre paso con rayos
  const nb = [[0.5, H('#4e5464'), H('#7a8090'), 18, 0.035], [1.0, H('#646a78'), H('#a4a8b2'), 36, 0.045], [1.7, H('#7a8090'), H('#d0d2d6'), 56, 0.055]];
  nb.forEach(([vel, c, cL, yc, fr], i) => { for (let y = yc - 8; y <= yc + 8; y++) for (let x = 0; x < 320; x++) { if (y > 72) continue; const xx = x + t * vel * 3 + i * 97, v = ns(xx * fr, y * fr * 2.4 + i * 9) - 0.56 - Math.abs(y - yc) / 20 + sol * (Math.hypot(x - 250, y - 30) < 30 ? -0.5 : 0);
    if (v > 0 && v * 7 > b4(x, y) && !tranquilo(x, y)) R.pset(x, y, v > 0.1 ? cL : c); } });
  if (sol > 0) { caja(0, 0, 319, 179, (x, y) => { if (((x + y) & 1) === 0) aclara(x, y, H('#ffd890'), 0.14 * sol); }); R.disco(250, 30, 6 * sol, H('#fff8e0')); luz(250, 30, 40, H('#fff0c0'), 0.8 * sol); for (let r = 0; r < 6; r++) { const a = 1.9 + r * 0.16; for (let d = 18; d < 170; d++) { const x = 250 + Math.cos(a) * d, y = 30 + Math.sin(a) * d; if ((d + r * 7) % 3 === 0 && !tranquilo(ri(x), ri(y))) aclara(x, y, H('#fff0c0'), 0.18 * sol * (1 - d / 170)); } } }
  pajaros(t, 3, 0, 260, 24, 60, 8);
};
const entreLapidasDelante = (t) => {
  // un murete de piedra caído en primer término (x 120–196, y 166–180)
  relleno(96, 170, 214, 182, PIEDRA, (x, y) => 3 + (ns(x * 0.2, y * 0.3) - 0.5) * 1.2 - (y > 153 ? 1.4 : 0) + (x < 123 ? 1 : x > 193 ? -1.2 : 0) + (ns(x * 0.4 + 7, y * 0.4) > 0.72 ? -1 : 0) + ((x - 120) % 25 === 0 ? -1.4 : 0));
  for (let x = 96; x <= 214; x++) { ps(x, 169, PIEDRA[6]); if (ns(x * 0.3, 3) > 0.6) ps(x, 170, H('#4a5e2c')); }
  briznas(0, 320, 168, t, 50, 6, HIERBA, 9);
};

// ── H · EL COMEDOR (P10): papel ocre a rayas, el aparador con la vajilla, la mesa larga puesta, la ventana a la
// izquierda, la puerta del estudio a la derecha (x 262–300, entreabierta, con luz) ──
const comedor = (t) => {
  fijo('comedor', () => {
    papel(0, 0, 319, 106, OCRE, 8, { base: 2.6, apaga: (x, y) => (x > 270 && y < 50 ? 0.5 : 0) });
    friso(0, 319, 106, 138, CAOBA, 30, 3); R.rect(0, 138, 319, 141, CAOBA[1]);
    tarima(142, ROBLE, 6); alfombra(60, 150, 250, 172, 2, ['#2a3a5a', '#3e5276', '#7a1e22', '#d8b060', '#e8dcc0']);
    R.rect(0, 0, 319, 4, YESO[5]); for (let x = 0; x < 320; x++) ps(x, 4, YESO[3]);
    // la ventana con cortinas verdes
    ventana(22, 30, 70, 104, (tt, a, b, c, d) => { relleno(a, b, c, d, pal(['#8a94a4', '#a0aab4', '#b8bec4']), (x, y) => 1 + (y - b) / (d - b) * 1.6); for (let x = a; x <= c; x++) { const hh = 70 + Math.floor(h2(x >> 3, 3) * 14); for (let y = hh; y <= d; y++) ps(x, y, rmp(LADR, 2 + (y % 3 === 0 ? -1 : 0), x, y)); } }, 0);
    // el aparador con platos de pie y una sopera
    relleno(96, 98, 176, 138, CAOBA, (x, y) => 2.4 + (ns(x * 0.3, y * 0.05) - 0.5) + ((x - 96) % 26 < 1 ? -1.4 : 0)); R.rect(94, 96, 178, 98, CAOBA[5]); for (const x of [109, 135, 161]) ps(x, 118, ORO[3]);
    for (let i = 0; i < 4; i++) { const x = 104 + i * 18; R.disco(x, 86, 8, BLANCO); R.disco(x, 86, 6, H('#e8eef4')); R.disco(x, 86, 3, H('#4a6aa0')); R.rect(x - 1, 94, x + 1, 95, CAOBA[3]); }
    R.disco(168, 90, 5, BLANCO); R.rect(162, 90, 174, 95, BLANCO); ps(168, 84, BLANCO);
    cuadro(196, 30, 246, 70, (a, b, c, d) => paisaje(a, b, c, d, 4));
    // la puerta del estudio, entreabierta, con luz de vela dentro
    R.rect(258, 30, 304, 141, CAOBA[4]); R.rect(262, 36, 300, 141, H('#d8a860')); caja(262, 36, 300, 141, (x, y) => { if (h2(x, y, 3) > 0.75) ps(x, y, H('#b88440')); });
    relleno(262, 36, 286, 141, CAOBA, (x, y) => 2.2 + ((y - 36) % 24 < 1 ? -1.2 : 0) + (x === 286 ? -1.6 : 0));
    for (let x = 258; x <= 304; x++) ps(x, 30, CAOBA[5]);
  });
  // la mesa larga puesta: mantel, platos, copas y el candelabro de tres brazos (por delante va la silla)
  R.rect(84, 124, 236, 128, BLANCO); for (let x = 84; x <= 236; x++) { ps(x, 124, H('#ffffff')); ps(x, 129, H('#c8c0b0')); } R.rect(84, 129, 236, 136, H('#e8e2d4')); for (let x = 86; x < 236; x += 6) { ps(x, 136, H('#c8c0b0')); ps(x + 1, 137, H('#c8c0b0')); }
  R.rect(88, 137, 90, 150, CAOBA[2]); R.rect(230, 137, 232, 150, CAOBA[2]); R.rect(120, 137, 122, 148, CAOBA[1]); R.rect(198, 137, 200, 148, CAOBA[1]);
  for (const x of [112, 160, 208]) { R.rect(x - 5, 108, x + 5, 123, CAOBA[3]); R.rect(x - 3, 110, x + 3, 121, TELA_R[3]); for (let xx = x - 5; xx <= x + 5; xx++) ps(xx, 108, CAOBA[5]); }
  for (const x of [100, 126, 194, 220]) { R.rect(x - 4, 123, x + 4, 123, BLANCO); ps(x + 6, 121, H('#c8d8e8')); ps(x + 6, 122, H('#c8d8e8')); ps(x + 6, 123, H('#a8b8c8')); }
  R.rect(158, 116, 162, 123, ORO[2]); R.rect(150, 114, 170, 115, ORO[2]); for (const x of [150, 160, 170]) vela(x, 114, t, { alta: 5, sinPie: true, halo: 16, fuerza: 0.3 });
  // un reloj de pared que anda
  R.disco(222, 16, 7, CAOBA[3]); R.disco(222, 16, 5, CREMA); R.linea(222, 16, ri(222 + Math.cos(t) * 4), ri(16 + Math.sin(t) * 4), K); R.linea(222, 16, 222, 13, K);
};

// ── I · EL ESTUDIO DE GODWIN (P11): librerías hasta el techo, el escritorio grande con papeles, el globo, el busto,
// la ventana con cortinas y la puerta a la derecha (x 270–306) por la que entra la madrastra ──
const PUERTA_I = [272, 304, 50, 141];
const estudioG = (t, ab) => {
  fijo('estudioG', () => {
    papel(0, 0, 319, 140, VERDE, 11, { base: 2.0 });
    libreria(0, 8, 92, 141, 3, 22); libreria(96, 8, 176, 141, 7, 22);
    R.rect(0, 4, 180, 8, CAOBA[5]); for (let x = 0; x <= 180; x++) ps(x, 4, CAOBA[3]);
    // el busto de yeso y un búho disecado arriba (sin parecido a nadie)
    R.disco(136, 0, 0, K);
    tarima(142, ROBLE, 9); alfombra(20, 154, 230, 174, 4);
    // la ventana con cortinas rojas
    ventana(196, 26, 244, 108, (tt, a, b, c, d) => { relleno(a, b, c, d, pal(['#8a94a4', '#a0aab4', '#b8bec4', '#ccd0d4']), (x, y) => 1.2 + (y - b) / (d - b) * 2 + (ns(x * 0.08, y * 0.1) - 0.5)); for (let x = a; x <= c; x++) { const hh = 74 + Math.floor(h2(x >> 2, 8) * 16); for (let y = hh; y <= d; y++) ps(x, y, rmp(pal(['#4a4e5a', '#5a5e6a']), 1, x, y)); } }, 0);
    cortina(184, 196, 22, 112, TELA_R, 0, 1, 4); cortina(244, 256, 22, 112, TELA_R, 0, -1, 5);
    // el globo terráqueo en su pie
    R.disco(226, 128, 9, H('#c8b47a')); caja(217, 119, 235, 137, (x, y) => { if (Math.hypot(x - 226, y - 128) > 8) return; if (ns(x * 0.25, y * 0.25) > 0.55) ps(x, y, H('#8a9a5a')); else ps(x, y, H('#d8c890')); }); R.linea(214, 128, 226, 116, ORO[2]); R.linea(226, 140, 226, 148, CAOBA[2]); R.rect(220, 148, 232, 149, CAOBA[2]);
    // la puerta (cerrada en el búfer; la que se abre va encima)
    const [p0, p1, q0, q1] = PUERTA_I; R.rect(p0 - 4, q0 - 6, p1 + 4, q1, ROBLE[4]); for (let x = p0 - 4; x <= p1 + 4; x++) ps(x, q0 - 6, ROBLE[5]);
  });
  // la puerta que se abre (ab 0–1): dentro, el pasillo con luz
  const [p0, p1, q0, q1] = PUERTA_I; R.rect(p0, q0, p1, q1, H('#c89a5a')); caja(p0, q0, p1, q1, (x, y) => { if (h2(x, y, 6) > 0.7) ps(x, y, H('#a87a40')); });
  const w = ri((p1 - p0) * (1 - ab * 0.75)); relleno(p1 - w, q0, p1, q1, CAOBA, (x, y) => 2.4 + ((y - q0) % 30 < 1 ? -1.4 : 0) + ((x - p1 + w) % 14 < 1 ? -1 : 0) + (x === p1 - w ? -1.6 : 0)); ps(p1 - w + 3, 98, ORO[3]);
  // el reloj de repisa del estante y la vela
};
// el escritorio de Godwin (va DELANTE del actor): tablero con papeles, tintero, pluma y una vela
const escritorioG = (t) => {
  relleno(40, 120, 150, 150, CAOBA, (x, y) => 2.4 + (ns(x * 0.25, y * 0.06) - 0.5) + ((x - 40) % 28 < 1 ? -1.4 : 0) + (y > 147 ? -1 : 0)); R.rect(36, 116, 154, 120, CAOBA[4]); for (let x = 36; x <= 154; x++) { ps(x, 116, CAOBA[5]); ps(x, 121, CAOBA[1]); }
  for (const x of [54, 82, 110, 138]) { ps(x - 2, 132, ORO[3]); ps(x + 2, 132, ORO[3]); }
  for (let i = 0; i < 4; i++) { const x = 44 + i * 9 + h2(i, 1) * 4, y = 114 - i; R.rect(x, y, x + 10, y + 1, i % 2 ? BLANCO : CREMA); }
  R.rect(124, 110, 140, 115, LIBROS[1]); R.rect(126, 106, 138, 110, LIBROS[0]); R.disco(88, 114, 2, H('#1a1a24')); R.linea(89, 113, 92, 107, BLANCO); ps(93, 106, BLANCO);
  vela(146, 115, t, { alta: 7, halo: 20, fuerza: 0.35 });
};

// ── J · EL SALÓN DE ATRÁS (P13): los mayores junto a la chimenea de mármol con el espejo, la araña de velas, el
// biombo de la izquierda (donde se esconde la niña), el piano, el arpa en el rincón y las ventanas altas ──
const salonJ = (t) => {
  fijo('salonJ', () => {
    papel(0, 0, 319, 110, pal(['#2a2444', '#342e54', '#403864', '#4e4674', '#5e5684', '#6e6694']), 13, { base: 2.3, apaga: (x, y) => (x > 268 && y < 52 ? 0.6 : 0) });
    friso(0, 319, 110, 140, pal(['#8a8478', '#a09a8c', '#b4ae9e', '#c8c2b0', '#dad4c2', '#ece6d4']), 32, 5); R.rect(0, 140, 319, 142, YESO[3]);
    tarima(143, ROBLE, 11); alfombra(40, 152, 300, 176, 6, ['#5a1a2a', '#8a2a3a', '#1e3a3a', '#d8b060', '#e8dcc0']);
    R.rect(0, 0, 319, 5, YESO[6]); for (let x = 0; x < 320; x++) { ps(x, 5, YESO[3]); if (x % 8 < 3) ps(x, 3, YESO[4]); }
    // la chimenea de mármol con el espejo dorado encima
    relleno(126, 92, 214, 142, MARMOL, (x, y) => 3 + (ns(x * 0.3, y * 0.3) - 0.5) * 1.4 + (Math.sin(x * 0.3 + y * 0.6 + ns(x * 0.1, y * 0.1) * 6) > 0.9 ? -1.4 : 0)); R.rect(122, 88, 218, 92, MARMOL[4]); for (let x = 122; x <= 218; x++) ps(x, 93, MARMOL[1]);
    R.rect(142, 104, 198, 142, H('#140c0a')); R.rect(146, 134, 194, 136, H('#3a3a40'));
    cuadro(134, 34, 206, 84, (a, b, c, d) => { relleno(a, b, c, d, pal(['#2a2440', '#3a3454', '#4e4868', '#6a6680']), (x, y) => 1.6 + (ns(x * 0.1, y * 0.1) - 0.5) * 0.6 - (y > d - 12 ? 0.8 : 0));
      // en el espejo: la pared de enfrente con una ventana, la araña y dos cuadros, apagados
      R.rect(a + 6, b + 10, a + 22, d - 10, H('#26305a')); for (let x = a + 6; x <= a + 22; x += 8) R.rect(x, b + 10, x, d - 10, H('#8a8698')); R.rect(a + 6, b + 24, a + 22, b + 24, H('#8a8698'));
      R.rect(c - 24, b + 12, c - 8, b + 26, ORO[1]); R.rect(c - 22, b + 14, c - 10, b + 24, H('#4a5a3a')); for (const dx of [-8, 0, 8]) { ps((a + c) / 2 + dx, b + 6, H('#ffe0a0')); ps((a + c) / 2 + dx, b + 7, H('#c8b080')); }
      for (let i = 0; i < 28; i++) { const x = a + 4 + i * 2, y = b + 4 + i; if (y < d) aclara(x, y, H('#ffffff'), 0.25); } });
    // dos ventanas altas con cortinas de seda dorada
    for (const [a, c] of [[20, 64], [252, 296]]) { ventana(a, 26, c, 106, (tt, x0, y0, x1, y1) => { relleno(x0, y0, x1, y1, pal(['#1a2240', '#26305a', '#3a4472', '#56608a']), (x, y) => 0.6 + (y - y0) / (y1 - y0) * 2.6); for (let x = x0; x <= x1; x++) { const hh = 82 + Math.floor(h2(x >> 3, 1, a) * 12); for (let y = hh; y <= y1; y++) ps(x, y, H('#10121e')); if (h2(x >> 2, 3, a) > 0.85) ps(x, hh + 4, H('#e8c060')); } }, 0); cortina(a - 12, a, 22, 110, OCRE, 0, 1, a); cortina(c, c + 12, 22, 110, OCRE, 0, -1, c); }
    // el piano de mesa a la derecha y el arpa
    relleno(232, 118, 300, 132, CAOBA, (x, y) => 2.6 + (ns(x * 0.2, y * 0.1) - 0.5)); R.rect(236, 132, 238, 150, CAOBA[2]); R.rect(294, 132, 296, 150, CAOBA[2]); for (let x = 240; x < 280; x += 2) { R.rect(x, 116, x, 118, BLANCO); if (x % 6 === 0) ps(x, 116, K); }
    for (let i = 0; i < 26; i++) { ps(302 + i * 0.3, 96 + i * 2, ORO[2]); } R.linea(302, 96, 316, 88, ORO[3]); R.linea(316, 88, 316, 150, ORO[2]); for (let x = 304; x < 316; x += 2) R.linea(x, 96 + (x - 302) * -0.5 + 2, x, 148, H('#d8d0c0'));
  });
  // el fuego, la araña de velas que se mece y las velas del espejo
  fuego(146, 194, 133, t, 16, 2);
  const sw = Math.sin(t * 0.8) * 1.5; R.linea(170, 0, ri(170 + sw * 0.3), 20, ORO[1]); R.rect(ri(152 + sw), 22, ri(188 + sw), 23, ORO[2]);
  for (const dx of [-18, -9, 0, 9, 18]) { R.linea(ri(170 + sw * 0.6), 20, ri(170 + dx + sw), 22, ORO[2]); vela(ri(170 + dx + sw), 22, t, { alta: 4, sinPie: true, halo: 14, fuerza: 0.25, k: dx }); }
};
// el biombo de la izquierda (va DELANTE de la niña: tres hojas con pájaros pintados)
const biombo = (t) => { for (let i = 0; i < 3; i++) { const x0 = i * 21 - 6, x1 = x0 + 20;
  relleno(x0, 84, x1, 152, pal(['#1a0e0a', '#2a1610', '#3a2018', '#4e2c20', '#663a28']), (x, y) => 2.4 + (i % 2 ? -0.5 : 0.2) + (ns(x * 0.2, y * 0.1) - 0.5) * 0.6 + (x === x0 || x === x1 ? -1.8 : x === x0 + 1 ? 1.2 : 0) + (y === 96 || y === 140 ? -1.4 : 0));
  // la laca: una rama de cerezo en flor que cruza las tres hojas, un pájaro y unas montañas en oro
  R.linea(x0 + 2, 132 - i * 6, x1 - 2, 124 - i * 6, H('#c8a050')); R.linea(x0 + 8, 128 - i * 6, x0 + 12, 116 - i * 6, H('#c8a050'));
  for (let k = 0; k < 5; k++) { const fx = x0 + 3 + h2(i, k, 4) * 15, fy = 112 - i * 6 + h2(k, i, 5) * 18; ps(fx, fy, H('#f0b8c8')); ps(fx + 1, fy, H('#e88aa0')); ps(fx, fy + 1, H('#e88aa0')); }
  if (i === 1) { R.disco(x0 + 10, 104, 2.4, H('#e8e0d0')); ps(x0 + 12, 103, K); R.linea(x0 + 7, 104, x0 + 4, 106, H('#e8e0d0')); }
  R.linea(x0 + 2, 100, x0 + 8, 92, H('#8a7040')); R.linea(x0 + 8, 92, x1 - 2, 98, H('#8a7040'));
  R.rect(x0, 82, x1, 84, ORO[2]); for (let x = x0; x <= x1; x++) ps(x, 82, ORO[4]); R.rect(x0 + 1, 150, x0 + 2, 154, CAOBA[1]); R.rect(x1 - 2, 150, x1 - 1, 154, CAOBA[1]); } };

// ── K · DEBAJO DE LA MESA DEL TÉ (P14): la mesa redonda con mantel de encaje (tablero y 96, el mantel cae hasta y 118);
// debajo, la niña; a los lados, los mayores con sus tazas; el poeta de pie recita ──
const mesaTe = (t) => {
  fijo('mesaTe', () => {
    papel(0, 0, 319, 112, pal(['#3a2a22', '#4a362c', '#5a4436', '#6c5442', '#7e6450', '#92765e']), 17, { base: 2.4, apaga: (x, y) => (x > 268 && y < 50 ? 0.5 : 0) });
    friso(0, 319, 112, 140, CAOBA, 36, 7); R.rect(0, 140, 319, 142, CAOBA[1]);
    tarima(143, ROBLE, 13); alfombra(24, 154, 296, 176, 9, ['#2a1e3a', '#3e2e56', '#7a1e22', '#d8b060', '#e8dcc0']);
    R.rect(0, 0, 319, 5, YESO[6]); for (let x = 0; x < 320; x++) ps(x, 5, YESO[3]);
    cuadro(40, 24, 96, 66, (a, b, c, d) => paisaje(a, b, c, d, 7)); cuadro(212, 22, 252, 70, (a, b, c, d) => { relleno(a, b, c, d, pal(['#2a2018', '#4a3a28', '#6a5438']), (x, y) => 1 + (ns(x * 0.2, y * 0.2) - 0.5)); R.disco((a + c) / 2, (b + d) / 2 - 4, 6, H('#d8a882')); R.rect((a + c) / 2 - 8, (b + d) / 2 + 4, (a + c) / 2 + 8, d, H('#2a2a3a')); R.disco((a + c) / 2, (b + d) / 2 - 7, 6, H('#e8e0d0')); });
    // un aparador con la tetera de plata al fondo y un velador con flores
    relleno(118, 96, 196, 118, CAOBA, (x, y) => 2.2 + (ns(x * 0.3, y * 0.1) - 0.5)); R.rect(116, 94, 198, 96, CAOBA[5]);
  });
};
// la mesa del té: tablero, mantel de encaje que cae, la tetera, las tazas y el pastel (va DELANTE de la niña salvo lo de abajo)
const mesaTeDelante = (t) => {
  R.rect(66, 92, 254, 96, CAOBA[4]); for (let x = 66; x <= 254; x++) ps(x, 92, CAOBA[5]);
  caja(60, 96, 260, 123, (x, y) => { const d = Math.abs(x - 160) / 100, borde = 122 - Math.sin((x - 60) * 0.5) * 1.2; if (y > borde) return; let v = 3.2 - d * 1.4 + Math.sin(x * 0.3) * 0.5; if (y > borde - 4) v = ((x + y) % 3 === 0) ? 0.6 : 3.6; R.pset(x, y, rmp(pal(['#a8a090', '#c8c0b0', '#dcd6c8', '#ece8dc', '#faf6ee']), v, x, y)); });
  // la tetera, las tazas, el pastel en su soporte
  R.disco(130, 84, 6, H('#c8ccd4')); R.rect(124, 84, 136, 91, H('#c8ccd4')); R.rect(136, 82, 141, 83, H('#a8acb4')); ps(142, 81, H('#a8acb4')); R.rect(128, 77, 132, 78, H('#a8acb4')); ps(127, 83, BLANCO); ps(126, 85, BLANCO);
  for (let i = 0; i < 3; i++) { const f = (t * 0.4 + i / 3) % 1; aclara(142 + f * 3 + Math.sin(t * 3 + i) * 1.5, 79 - f * 10, H('#ffffff'), 0.5 * (1 - f)); }
  for (const x of [104, 196, 218]) { R.rect(x - 4, 90, x + 4, 91, BLANCO); R.rect(x - 2, 86, x + 2, 89, BLANCO); ps(x + 3, 87, BLANCO); ps(x - 1, 86, H('#4a6aa0')); }
  R.rect(166, 88, 186, 89, ORO[2]); R.rect(175, 82, 177, 88, ORO[2]); R.rect(168, 78, 184, 81, H('#e8c8a0')); R.rect(168, 76, 184, 77, H('#f8f0f0')); ps(176, 75, H('#c83a4a'));
};
const mesaTePatas = () => { for (const x of [78, 242]) { R.rect(x - 2, 121, x + 2, 150, CAOBA[2]); R.rect(x - 1, 121, x - 1, 150, CAOBA[4]); R.rect(x - 5, 148, x + 5, 150, CAOBA[1]); } R.rect(78, 140, 242, 141, CAOBA[3]); for (let x = 78; x <= 242; x++) ps(x, 142, mez(R.pget(x, 142), K, 0.3)); caja(70, 122, 250, 150, (x, y) => { if (((x + y) & 3) === 0) sombrea(x, y, 0.25); }); };

// ── L · EL CEMENTERIO AL ATARDECER (P17): el cielo naranja, el sol bajo tras los campos, la iglesia vieja a contraluz a
// la izquierda, la lápida de la madre de tres cuartos (x 112–150) con flores, el sauce y sombras largas ──
const atardecer = (t) => {
  fijo('atardecer', () => {
    relleno(0, 0, 319, 110, pal(['#3a2a4a', '#5a3a5a', '#8a4a5a', '#c0645a', '#e08a5a', '#f0b070', '#f8d890']), (x, y) => 0.4 + y / 110 * 5.6 + Math.max(0, 1.6 - Math.hypot(x - 236, (y - 96) * 1.3) / 50) * 1.4 + (ns(x * 0.03, y * 0.08) - 0.5) * 0.6);
    // los campos lejanos y los setos a contraluz
    for (let x = 0; x < 320; x++) { const hh = 96 + Math.sin(x * 0.04) * 3 + h2(x >> 2, 1) * 2; for (let y = ri(hh); y < 118; y++) ps(x, y, rmp(pal(['#3a2a3a', '#4e3446', '#6a4250']), 1.4 + (ns(x * 0.2, y * 0.2) - 0.5) + (y - hh) * 0.04, x, y)); }
    // la iglesia vieja a contraluz, con la torre, la veleta y una ventana con luz
    const sil = H('#2a1a2a'); R.rect(10, 62, 34, 118, sil); R.rect(8, 58, 36, 62, sil); R.rect(14, 46, 30, 58, sil); R.poligono([[12, 46], [22, 34], [32, 46]], sil); R.rect(21, 26, 23, 34, sil); R.rect(18, 28, 26, 28, sil);
    R.rect(34, 78, 104, 118, sil); R.poligono([[32, 78], [68, 58], [106, 78]], sil); for (const x of [46, 62, 78, 94]) { R.rect(x, 90, x + 4, 102, H('#e8a050')); R.disco(x + 2, 90, 2, H('#e8a050')); }
    cesped(0, 116, 319, 179, 0, 9, { luz: (x, y) => -0.8 + Math.max(0, 1 - Math.hypot(x - 236, y - 116) / 140) * 1.2, ramp: pal(['#1a2414', '#24301a', '#2e3c1e', '#3a4a24', '#4c5a2a', '#62682e', '#7a7432']) });
    // lápidas a contraluz con sombras largas hacia la izquierda
    for (let i = 0; i < 9; i++) { const x = 150 + i * 20 + h2(i, 1, 12) * 10, b = 124 + h2(i, 2, 12) * 16; if (x > 300) continue; lapidaP(x, b, 8 + h2(i, 3) * 4, 12 + h2(i, 4) * 6, i + 40, { tipo: i % 3, incl: (h2(i, 5) - 0.5) * 4, ramp: pal(['#2a2028', '#382a32', '#4a3840', '#5e4a4e', '#7a605e', '#9a7a6e', '#c09a7a']) }); for (let d = 0; d < 30; d++) for (let w = -2; w <= 2; w++) sombrea(x - 6 - d, b + 1 + w * 0.5 + d * 0.06, 0.25); }
    // la lápida de la madre, de tres cuartos, más grande, con su guirnalda y flores al pie
    lapidaP(130, 150, 30, 46, 77, { tipo: 0, ramp: pal(['#4a3a40', '#5e4a4c', '#76605c', '#90786c', '#ac927e', '#c8ac90', '#e0c4a0']) });
    R.rect(146, 112, 150, 150, pal(['#3a2c32'])[0]); for (let y = 112; y <= 150; y++) ps(146, y, H('#5a4448'));
    for (let d = 0; d < 46; d++) for (let w = -6; w <= 6; w++) sombrea(110 - d, 151 + w * 0.4 + d * 0.08, 0.3);
    for (let i = 0; i < 9; i++) { const x = 120 + i * 3, y = 148 - (i % 3); R.linea(x, 151, x, y, H('#3a5a2a')); ps(x, y - 1, [H('#e85a6a'), H('#f8e8f0'), H('#e8c040')][i % 3]); }
  });
  // el sol que baja, nubes de ocaso a tres velocidades y los vencejos
  luz(236, 96, 30, H('#fff0c0'), 0.8); R.disco(236, 100, 7, H('#fff4d0'));
  [[0.4, H('#a04a5a'), H('#e08a70'), 30, 0.04], [0.9, H('#c0645a'), H('#f0a878'), 52, 0.05], [1.5, H('#d8806a'), H('#f8c890'), 74, 0.06]].forEach(([vel, c, cL, yc, fr], i) => { for (let y = yc - 6; y <= yc + 6; y++) for (let x = 0; x < 320; x++) { const xx = x + t * vel * 3 + i * 97, v = ns(xx * fr, y * fr * 2.4 + i * 9) - 0.58 - Math.abs(y - yc) / 18; if (v > 0 && v * 7 > b4(x, y) && !tranquilo(x, y) && R.pget(x, y) !== H('#2a1a2a')) R.pset(x, y, v > 0.08 ? cL : c); } });
  pajaros(t, 5, 40, 270, 40, 80, 11, H('#2a1a2a'));
  // el sauce a la izquierda delante de la iglesia, con las ramas que cuelgan y se mecen
  const tr = pal(['#1a1410', '#2a2018', '#3a2c20']); for (let y = 72; y <= 150; y++) { const w = 3 + (150 - y < 6 ? 2 : 0); for (let x = 58 - w; x <= 58 + w; x++) ps(x, y, rmp(tr, 1.6 - (x - 58) / w, x, y)); }
  for (let i = 0; i < 30; i++) { const x0 = 30 + h2(i, 1, 21) * 60, y0 = 54 + h2(i, 2, 21) * 26, len = 26 + h2(i, 3, 21) * 34; for (let j = 0; j < len; j++) { const x = x0 + Math.sin(t * 1.2 + i + j * 0.08) * (j / len) * 3, y = y0 + j; ps(x, y, rmp(pal(['#1e2a14', '#2e3c1a', '#4a5224', '#7a7030', '#a8903a']), 1.6 + (j % 5 === 0 ? 1 : 0) + h2(i, 4) * 1.2 - (j / len) * 0.6, ri(x), ri(y))); } }
  for (let i = 0; i < 40; i++) { const x = 30 + h2(i, 5, 21) * 60, y = 50 + h2(i, 6, 21) * 22; R.disco(x, y, 3 + h2(i, 7) * 3, rmp(pal(['#1e2a14', '#2e3c1a', '#4a5224', '#6a6a2a']), 1.4 + h2(i, 8), ri(x), ri(y))); }
};
'''

# ══════════════════════════════ LOS PLANOS ══════════════════════════════
PLANOS = r'''
const MANGA_NINA = '#5a6892', MANGA_MADRE = '#34406a';
// Atom dibujado cabeza abajo: lo pinta en un recuadro libre de 48×40 y lo pega volteado con la esquina en (X, Y)
const atomAlReves = (X, Y, t, o, s = 2, reves = true) => { const B = R.buf, copia = B.slice(), MK = 0xff00ff01 >>> 0, W = 48, Hh = 40;
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) B[y * 320 + x] = MK; AT.atom(R, 24, 37, t, o);
  const px = []; for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) { const c = B[y * 320 + x]; if (c !== MK) px.push([x, y, c]); }
  B.set(copia); for (const [x, y, c] of px) { const yy = reves ? Hh - 1 - y : y; for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) ps(X + x * s + a, Y + yy * s + b, c); } };

// ── P1 · La casa de noche (1797): la comadrona llega con su farol, la puerta se abre; en «born» se enciende la
// ventana de arriba y alguien alza los brazos; pasa el sereno con su farol ──
const p1 = (t) => {
  casaFuera(t, false);
  const ab = ease(tramo(t, TG.BORN - 0.6, TG.BORN - 0.1)) * (1 - ease(tramo(t, TG.Y1797 + 0.3, TG.P2 - 0.4)));
  ventanaNace(t, ease(tramo(t, TG.BORN + 0.1, TG.BORN + 0.6)));
  puertaA(t, ab, 1);
  // la comadrona (con cofia) sube y entra
  const u = tramo(t, 0, TG.BORN - 0.2); const cx = lerp(76, 156, ease(u)), dentroC = t > TG.BORN + 0.4;
  if (!dentroC) { const r = R.actor(MS.damaMS, ri(cx), u < 0.8 ? 152 : ri(lerp(152, 141, (u - 0.8) / 0.2)), t, { dir: 1, anda: u > 0 && u < 1, sostiene: true });
    const [mx, my] = r.mano; R.rect(mx - 1, my, mx + 1, my + 4, H('#2a2a30')); R.rect(mx - 2, my + 1, mx + 2, my + 4, H('#f4d080')); luz(mx, my + 3, 14, H('#ffd890'), 0.5); }
  // una estrella brilla sobre el tejado al nacer
  const s = tramo(t, TG.BORN + 0.2, TG.BORN + 1.4); if (s > 0 && s < 1) { const a = Math.sin(s * Math.PI); for (let i = -4; i <= 4; i++) { aclara(204 + i, 52, H('#fff4c0'), a * (1 - Math.abs(i) / 5)); aclara(204, 52 + i, H('#fff4c0'), a * (1 - Math.abs(i) / 5)); } }
  // el sereno con su farol cruza la calle por delante, de derecha a izquierda
  const v = tramo(t, TG.LONDON, TG.P2 + 0.2), sx = lerp(330, 196, v);
  const rs = R.actor(MS.caballeroMS, ri(sx), 172, t, { dir: -1, anda: v > 0 && v < 1, sostiene: true }); { const [mx, my] = rs.mano; R.rect(mx - 1, my, mx + 1, my + 5, K); R.rect(mx - 2, my + 1, mx + 2, my + 4, H('#f4c060')); luz(mx, my + 3, 16, H('#ffd890'), 0.5); }
  // el gato en la verja
  gatito(262, 136, t, { duerme: false, dir: -1, c: H('#1a1a20') });
};

// ── P2 · La biblioteca con la cuna (1797): Godwin mece la cuna; «11» en «eleven days»; en «dies» se apaga una vela del
// aplique y Godwin baja la cabeza; en «Wollstonecraft» una luz cálida se posa en el retrato y él lo mira ──
const p2 = (t) => {
  const oo = { cuna: true, visitas: false }; T.londres(R, t, oo);
  const u = tramo(t, TG.P2 + 0.2, TG.ELEVEN + 0.8);
  R.actor(MS.godwinMS, ri(lerp(70, 102, ease(u))), 150, t, { dir: t > TG.WOLL - 0.2 ? 1 : -1, anda: u > 0 && u < 1, triste: t > TG.DIES, sostiene: t > TG.ELEVEN + 0.8 && t < TG.DIES - 0.3 ? [96, 132] : false, dedo: t > TG.WOLL + 0.3 && t < TG.WOLL + 1.5 });
  // «eleven days»: once rayitas que se tachan en una hoja de calendario sobre el escritorio
  const d = tramo(t, TG.ELEVEN, TG.DIES - 0.2);
  if (d > 0 && t < TG.HER + 0.5) { R.linea(72, 60, 66, 64, H('#5a5a60')); R.linea(72, 60, 78, 64, H('#5a5a60')); R.rect(60, 64, 84, 90, K); R.rect(61, 65, 83, 89, BLANCO); R.rect(61, 65, 83, 69, H('#a82a2a')); R.numero('11', 72, 86, { centro: true }); for (let i = 0; i < ri(d * 11); i++) ps(62 + i * 2, 71, K);
    const f = tramo(t, TG.ELEVEN, TG.ELEVEN + 0.5); if (f > 0 && f < 1) { R.rect(61, ri(69 + f * 30), 83, ri(75 + f * 30), BLANCO); } }
  // la vela del aplique de la derecha se apaga en «dies»
  if (t > TG.DIES) vela(165, 54, t, { apagada: true, sinPie: true, alta: 4 });
  // «Wollstonecraft»: la luz se posa en el retrato
  const w = tramo(t, TG.WOLL - 0.3, TG.WOLL + 0.6) * (1 - tramo(t, TG.P3 - 0.6, TG.P3)); if (w > 0) { luz(137, 54, 40, H('#fff0c0'), 0.45 * w); for (let x = 112; x <= 162; x += 2) { ps(x, 21, ORO[4]); ps(x + 1, 87, ORO[4]); } }
  T.londresDelante(R, t, oo);
};

// ── P3 · El escritorio de la madre (recuerdo): la mano con la pluma escribe; en «girls» dibuja una niña, en «same» un
// «=», en «boys» un niño; los dos con un librito encima ──
const trazo = (pts, u, c) => { const n = ri(u * pts.length); pts.slice(0, n).forEach(([a, b], i) => { if (i > 0 && !pts[i - 1].salta) { R.linea(ri(pts[i - 1][0]), ri(pts[i - 1][1]), ri(a), ri(b), c); R.linea(ri(pts[i - 1][0]) + 1, ri(pts[i - 1][1]), ri(a) + 1, ri(b), c); } }); };
const cabezaPts = (x, y, r) => { const p = []; for (let a = 0; a <= 14; a++) p.push([x + Math.cos(a / 14 * 6.283) * r, y + Math.sin(a / 14 * 6.283) * r]); p[p.length - 1].salta = true; return p; };
// la niña: cabeza, vestido en triángulo y dos piernas; el niño: cabeza, chaqueta y pantalón (28 px de alto)
const figNina = (x, y, u, c = H('#3a2e2a')) => { const p = cabezaPts(x, y, 4.5); const q = [[x, y + 5], [x - 9, y + 22], [x + 9, y + 22], [x, y + 5]]; q[3].salta = true; trazo([...p, ...q, [x - 3, y + 22], [x - 3, y + 29], [x + 3, y + 22], [x + 3, y + 29]].map((v, i, a) => { if (i === a.length - 3) v.salta = true; return v; }), u, c); };
const figNino = (x, y, u, c = H('#3a2e2a')) => { const p = cabezaPts(x, y, 4.5); const q = [[x, y + 5], [x - 6, y + 6], [x - 6, y + 18], [x + 6, y + 18], [x + 6, y + 6], [x, y + 5]]; q[5].salta = true; trazo([...p, ...q, [x - 3, y + 18], [x - 3, y + 29], [x + 3, y + 18], [x + 3, y + 29]].map((v, i, a) => { if (i === a.length - 3) v.salta = true; return v; }), u, c); };
const p3 = (t) => {
  escritorioB(t);
  const g = tramo(t, TG.GIRLS - 0.2, TG.GIRLS + 0.6), q = tramo(t, TG.SAME - 0.1, TG.SAME + 0.3), b = tramo(t, TG.BOYS - 0.2, TG.BOYS + 0.6);
  figNina(128, 112, g); if (q > 0) { R.rect(150, 124, ri(150 + q * 14), 126, H('#3a2e2a')); R.rect(150, 131, ri(150 + q * 14), 133, H('#3a2e2a')); } figNino(190, 112, b);
  // un librito encima de cada figura cuando las dos están (la misma educación)
  const l = tramo(t, TG.BOYS + 0.7, TG.BOYS + 1.0); if (l > 0) for (const x of [128, 190]) { const yy = ri(104 - (1 - l) * 6); R.rect(x - 6, yy - 1, x + 6, yy + 4, H('#3a2e2a')); R.rect(x - 5, yy, x - 1, yy + 3, H('#f0e4c4')); R.rect(x + 1, yy, x + 5, yy + 3, H('#f0e4c4')); ps(x, yy, H('#3a2e2a')); }
  // la punta de la pluma: sigue lo que se está dibujando; entre trazos, descansa a un lado o moja en el tintero
  let px = 210, py = 140;
  if (t < TG.GIRLS - 0.2) { const k = tramo(t, TG.P3, TG.GIRLS - 0.3); px = lerp(214, 252, Math.sin(k * Math.PI)); py = lerp(130, 94, Math.sin(k * Math.PI)); }
  else if (g < 1) { px = 128 + Math.cos(g * 14) * 7; py = 110 + g * 30; }
  else if (b <= 0 && q <= 0) { px = 146; py = 130; }
  else if (b <= 0) { px = 150 + q * 14; py = 129; }
  else if (b < 1) { px = 190 + Math.cos(b * 14) * 6; py = 110 + b * 30; }
  else { const k = tramo(t, TG.BOYS + 0.6, TG.P4); px = lerp(190, 214, k); py = lerp(136, 150, k); }
  // la pluma de ave (de la punta a la mano y la barba de la pluma hacia arriba a la derecha)
  const hx = px + 9, hy = py + 2;
  T.brazo(R, hx + 34, 196, hx + 6, hy + 6, MANGA_MADRE, -1);
  R.linea(ri(px), ri(py), ri(px + 20), ri(py - 22), H('#3a3430')); for (let i = 6; i < 24; i++) { const x = px + i * 0.9, y = py - i; R.linea(ri(x), ri(y), ri(x + 3), ri(y + 1), i % 3 ? H('#f4f0e8') : H('#d8d0c8')); R.linea(ri(x), ri(y), ri(x - 1), ri(y - 2), H('#e8e4dc')); }
  ps(px, py, K);
  sepiaSuave(0.22);
};
// el recuerdo: un tinte cálido suave y una viñeta en los bordes
const sepiaSuave = (a) => { const B = R.buf; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, c = B[i], r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255, l = 0.3 * r + 0.59 * g + 0.11 * b;
  const v = Math.hypot((x - 160) / 200, (y - 90) / 120), o = 1 - Math.min(0.35, Math.max(0, v - 0.8) * 0.9), rr = (l * 1.05 + 26) * o, gg = (l * 0.9 + 12) * o, bb = l * 0.7 * o;
  B[i] = (0xff000000 | (Math.min(255, Math.round(b + (bb - b) * a)) << 16) | (Math.min(255, Math.round(g + (gg - g) * a)) << 8) | Math.min(255, Math.round(r + (rr - r) * a))) >>> 0; } };

// ── P4 · El recibidor: la niña entra corriendo y se pega a la jamba; Godwin marca su altura (las marcas suben, 2, 3, 4)
// y en «grows up» ella da un saltito; en «portrait» se vuelve y señala el medallón de su madre, que brilla ──
const p4 = (t) => {
  const { X } = recibidor(t, 0, true);
  const m = tramo(t, TG.GROWS - 0.3, TG.NAME + 0.4);
  const u = tramo(t, TG.P4 - 0.1, TG.GROWS - 0.3); const nx = lerp(40, 117, ease(u));
  const salto = t > TG.GROWS && t < TG.GROWS + 0.5 ? ri(Math.sin((t - TG.GROWS) / 0.5 * Math.PI) * 5) : 0;
  const mira = t > TG.PORTRAIT - 0.3;
  R.actor(MS.godwinMS, 146, 150, t, { dir: -1, sostiene: m > 0 && m < 1 ? [X(JAMBA) + 2, ri(131 - m * 20)] : false, sonrisa: t > TG.NAME });
  if (m > 0 && m < 1) { R.linea(X(JAMBA) + 2, ri(131 - m * 20), X(JAMBA) - 2, ri(129 - m * 20), H('#3a3a40')); }
  marcasJamba(X, [131, 121, 111], [2, 3, 4], m);
  R.actor(MS.maryNinaMS, ri(nx), 150, t, { dir: mira ? -1 : (u < 1 ? 1 : -1), anda: u > 0 && u < 1, salto, sonrisa: t > TG.GROWS && !mira, dedo: mira && t < TG.WALL + 0.6, sorpresa: t > TG.PORTRAIT && t < TG.PORTRAIT + 0.4 });
  const b = tramo(t, TG.PORTRAIT - 0.1, TG.PORTRAIT + 0.5) * (1 - tramo(t, TG.P5 - 0.6, TG.P5)); if (b > 0) { luz(X(100), 58, 22, H('#fff0c0'), 0.5 * b); for (let i = -3; i <= 3; i++) { aclara(X(100) + 9 + i, 46, H('#ffffff'), b * (1 - Math.abs(i) / 4)); aclara(X(100) + 9, 46 + i, H('#ffffff'), b * (1 - Math.abs(i) / 4)); } }
  // el gato baja la escalera
  const g = tramo(t, TG.P4 + 1, TG.P5 - 0.2); if (g > 0 && g < 1) { const wx = lerp(372, 250, g); gatito(X(wx), ri(ESC(wx)), t, { anda: true, dir: -1 }); }
};

// ── P5 · La buhardilla de noche: la niña de rodillas en el asiento de la ventana mira las estrellas; en «another life»
// una estrella grande se apaga despacio y otra pequeña, a su lado, se enciende ──
const p5 = (t) => {
  const { X } = buhardilla(t, 100, 0);
  // las dos estrellas, dentro del cristal
  const e = tramo(t, TG.EXCHANGE - 0.2, TG.LIFE + 0.4); R.recorte([X(206), 42, X(252), 110]);
  const a1 = 1 - e * 0.85, a2 = 0.15 + e * 0.85; for (const [sx, sy, a, r] of [[X(222), 60, a1, 4], [X(232), 66, a2, 3]]) { luz(sx, sy, 8, H('#fff4c0'), a * 0.8); for (let i = -r; i <= r; i++) { aclara(sx + i, sy, H('#ffffff'), a * (1 - Math.abs(i) / (r + 1))); aclara(sx, sy + i, H('#ffffff'), a * (1 - Math.abs(i) / (r + 1))); } }
  R.recorte(null);
  // la vela del alféizar
  vela(X(250), ASIENTO_D - 1, t, { alta: 6, halo: 30, fuerza: 0.4 });
  const sube = tramo(t, TG.P5 - 0.1, TG.FEELING + 0.5);
  R.actor(MS.maryNinaMS, ri(X(lerp(190, 222, ease(sube)))), sube < 1 ? ri(lerp(150, ASIENTO_D - 2, ease(cl(sube * 1.6 - 0.6)))) : ASIENTO_D - 2, t, { dir: 1, anda: sube > 0 && sube < 1, triste: t > TG.WORLD && t < TG.ANOTHER + 0.4, sonrisa: t > TG.LIFE + 0.2, dedo: t > TG.ANOTHER + 0.2 && t < TG.LIFE + 0.8 });
  // el gato dormido en la colcha que levanta la cabeza
  gatito(X(150), 116, t, { duerme: t < TG.EXCHANGE, dir: 1, c: H('#8a6a4a') });
};

// ── P6 · El cementerio de St Pancras: la niña entra por el camino con su libro y se sienta en el banco junto a la lápida;
// la veleta y la campana en «St Pancras»; un grajo se posa ──
const p6 = (t) => {
  const oo = { encuadre: 'cementerio' }; T.londres(R, t, oo);
  // la campana de la torre que se mueve en «Pancras»
  const c = tramo(t, TG.PANCRAS - 0.1, TG.PANCRAS + 1.4); if (c > 0 && c < 1) { const s = Math.sin(c * Math.PI * 4) * (1 - c) * 2; R.rect(ri(72 + s), 26, ri(75 + s), 29, ORO[2]); for (let i = 0; i < 3; i++) { aclara(64 - i * 3, 22 - i * 2, H('#ffffff'), 0.6 * (1 - c)); aclara(83 + i * 3, 22 - i * 2, H('#ffffff'), 0.6 * (1 - c)); } }
  const u = tramo(t, TG.P6, TG.BESIDE - 0.3); const path = [[96, 182], [100, 160], [112, 152], [150, 152], [200, 150]];
  const seg = u * (path.length - 1), i = Math.min(path.length - 2, Math.floor(seg)), f = seg - i, nx = lerp(path[i][0], path[i + 1][0], f), ny = lerp(path[i][1], path[i + 1][1], f);
  const r = R.actor(MS.maryNinaMS, ri(nx), ri(ny), t, { dir: u < 1 ? 1 : -1, anda: u > 0 && u < 1, sostiene: true, sonrisa: t > TG.BESIDE });
  librito(r.mano[0], r.mano[1] + 2, H('#6a1c1c'), t > TG.BOOK - 0.2);
  // un grajo baja a la tapa de la tumba de cajón
  const g = tramo(t, TG.BOOK - 0.6, TG.BOOK + 0.4), gx = lerp(300, 248, g), gy = lerp(60, 137, ease(g)); if (g > 0) { const al = g < 1 && parp(t, 18); R.rect(ri(gx) - 2, ri(gy) - 2, ri(gx) + 2, ri(gy), K); ps(ri(gx) - 3, ri(gy) - 3, K); ps(ri(gx) + 1, ri(gy) - 4 - (al ? 2 : 0), K); ps(ri(gx) + 3, ri(gy) - 4 - (al ? 2 : 0), K); ps(ri(gx) - 4, ri(gy) - 2, H('#4a4a50')); }
  T.londresDelante(R, t, oo);
};

// ── P7 · El libro sobre las rodillas (inserto): las manos de la niña sujetan el libro; en «knees» pasa la página; una
// hoja de otoño cae y se posa en la página; una mariquita sube por el canto ──
const p7 = (t) => {
  const hoja = tramo(t, TG.KNEES - 0.2, TG.KNEES + 0.5);
  const { bx0, bx1, by0, by1, mid } = rodillas(t, hoja);
  // la hoja que cae y se posa en la página de la izquierda
  const f = tramo(t, TG.KNEES + 0.6, TG.SAID + 0.2); if (f > 0) { const hx = lerp(40, 128, f) + Math.sin(f * 9) * 10 * (1 - f), hy = lerp(-6, 118, ease(f)); for (let j = -3; j <= 3; j++) for (let i = -4; i <= 4; i++) { if (Math.abs(i) / 4.5 + Math.abs(j) / 3.5 > 1) continue; ps(hx + i, hy + j, j === 0 ? H('#8a4418') : i < 0 ? H('#ecb050') : H('#d88a30')); } ps(hx + 5, hy + 1, H('#6a3410')); ps(hx + 6, hy + 2, H('#6a3410')); }
  // la mariquita sube por el canto derecho del libro
  const m = (t * 6) % 90; const my = by1 - m; if (my > by0) { R.disco(bx1 + 3, my, 1.6, H('#c82a2a')); ps(bx1 + 3, my - 2, K); ps(bx1 + 2, my, K); }
  // las manos: la izquierda sujeta la esquina de abajo; la derecha levanta la esquina de la página en «knees» (la
  // página sigue sola) y vuelve a sujetar
  T.brazo(R, bx0 - 22, 198, bx0 + 4, by1 + 2, MANGA_NINA, 1);
  const lev = Math.sin(Math.PI * tramo(t, TG.KNEES - 0.5, TG.KNEES + 0.4)), hx = bx1 - 6 - lev * 14, hy = by1 + 2 - lev * 16;
  T.brazo(R, bx1 + 26, 198, ri(hx), ri(hy), MANGA_NINA, -1);
};

// ── P8 · La lápida de cerca: la mano de la niña sigue el renglón con el dedo (de «tracing» a «name»); el renglón se
// dora en «name». EL GAG: Atom, colgado cabeza abajo del borde de la piedra, intenta leerla al revés; cuando le llega el
// dedo, da la vuelta («!») ──
const p8 = (t) => {
  const oo = { encuadre: 'cementerio', camara: 'lapida' }; const g = T.londres(R, t, oo) || {};
  const rg = (g.renglones && g.renglones[5]) || [106, 208, 140];
  const u = tramo(t, TG.LETTERS - 0.1, TG.NAMEB - 0.1), fx = lerp(rg[0], rg[1], u), fy = rg[2] - 3 + Math.sin(u * 40) * 0.6;
  // el renglón se va dorando por donde pasa el dedo y brilla entero en «name»
  const dor = tramo(t, TG.NAMEB - 0.1, TG.NAMEB + 0.3);
  for (let x = rg[0]; x <= (dor > 0 ? rg[1] : fx); x++) for (let y = rg[2] - 8; y <= rg[2]; y++) { const c = R.pget(x, y); if (((c >> 16) & 255) < 120) aclara(x, y, H('#e8b040'), dor > 0 ? 0.6 + 0.3 * Math.sin(t * 8) : 0.45); }
  if (dor > 0) luz((rg[0] + rg[1]) / 2, rg[2] - 4, 60, H('#fff0c0'), 0.3 * dor);
  // EL GAG: Atom (al doble) flota cabeza abajo junto al canto derecho de la piedra y mira las rayas; «?»; cuando el dedo
  // llega al final del renglón, da la vuelta y lo celebra («!»)
  const ga = tramo(t, TG.P8 + 0.2, TG.P8 + 0.9), vuelta = tramo(t, TG.LEARNED - 0.1, TG.LEARNED + 0.4);
  const ay = ri(lerp(190, 64, ease(ga)) + Math.sin(t * 2.2) * 2);
  if (vuelta < 0.5) { atomAlReves(228, ay, t, { cara: t > TG.FINGER ? 'sorpresa' : 'normal', dir: -1, pose: 'piensa' }, 2);
    if (ga >= 1 && t > TG.LETTERS + 0.3) { const q = ri(Math.sin(t * 6) * 1); R.icono('?', 300, 64 + q, H('#e8c040'), K, 2); } }
  else { atomAlReves(228, ay, t, { cara: 'sonrisa', dir: -1, pose: vuelta < 1 ? 'brazos' : 'senala' }, 2, false); if (t < TG.NAMEB + 0.7) R.icono('!', 302, 60, H('#e8c040'), K, 2); }
  // el brazo de la niña entra en diagonal desde abajo a la izquierda y el dedo sigue el último renglón
  if (t > TG.P8) { const ent = ease(tramo(t, TG.P8, TG.LETTERS - 0.1)), sal = ease(tramo(t, TG.NAMEB + 0.4, TG.P9)); const wx = lerp(60, fx - 10, ent) - sal * 30, wy = lerp(200, fy + 4, ent) + sal * 50;
    T.brazo(R, ri(wx - 26), 200, ri(wx), ri(wy), MANGA_NINA, 1); }
  T.londresDelante(R, t, oo);
};

// ── P9 · Entre las lápidas (otro sitio del cementerio): la niña lee detrás de la tumba de cajón; un petirrojo salta por
// la piedra hasta su lado; en «least alone» el sol se abre paso y ella sonríe y lo mira ──
const p9 = (t) => {
  const sol = ease(tramo(t, TG.FELT - 0.4, TG.ALONE + 0.4));
  entreLapidas(t, sol);
  const pag = Math.floor((t - TG.P9) / 1.6) % 2;
  lapidaP(170, 152, 24, 40, 61, { tipo: 0, incl: 1 });
  const r = R.actor(MS.maryNinaMS, 150, 154, t, { dir: t > TG.AMONG + 0.6 ? 1 : -1, sostiene: true, sonrisa: t > TG.FELT, sorpresa: t > TG.AMONG + 0.4 && t < TG.AMONG + 0.9 });
  librito(r.mano[0], r.mano[1] + 2, H('#6a1c1c'), true);
  entreLapidasDelante(t);
  // el petirrojo salta por la tumba hacia ella
  const p = tramo(t, TG.MOTHERS, TG.AMONG + 0.5), px = lerp(204, 176, p), py = (p < 0.5 ? 140 : 100) - Math.abs(Math.sin(p * Math.PI * 4)) * 5 - (p > 0.45 && p < 0.55 ? 20 : 0);
  { const X = ri(px), Y = ri(py) + 12; R.rect(X - 3, Y - 5, X + 3, Y, K); R.rect(X - 2, Y - 4, X + 3, Y - 1, H('#7a5a3a')); R.rect(X - 2, Y - 3, X, Y - 1, H('#ec6a2a')); R.rect(X - 4, Y - 6, X - 1, Y - 3, K); R.rect(X - 3, Y - 5, X - 1, Y - 4, H('#7a5a3a')); ps(X - 3, Y - 5, H('#ec6a2a')); ps(X - 2, Y - 5, K); ps(X - 5, Y - 4, ORO[2]); R.rect(X + 4, Y - 4, X + 5, Y - 2, H('#4a3420')); ps(X - 1, Y + 1, K); ps(X + 1, Y + 1, K); }
  if (t > TG.ALONE) { const h = tramo(t, TG.ALONE, TG.ALONE + 0.6); if (h < 1) icCorazon(172, ri(114 - h * 8), H('#e85a6a')); }
};

// ── P10 · El comedor: la criada pasa deprisa con la bandeja; la niña, en medio, da un salto y se aparta a la pared en
// «in the way»; la madrastra la señala; en «father» la niña mira la puerta del estudio ──
const p10 = (t) => {
  comedor(t);
  const cu = tramo(t, TG.HOME, TG.FATHER + 0.4), cx = lerp(300, -20, cu);
  const aparta = tramo(t, TG.WAY - 0.5, TG.WAY + 0.1); const nx = lerp(170, 236, ease(aparta));
  const salto = t > TG.WAY - 0.6 && t < TG.WAY - 0.1 ? ri(Math.sin((t - TG.WAY + 0.6) / 0.5 * Math.PI) * 5) : 0;
  R.actor(MS.madrastraMS, 60, 150, t, { dir: 1, dedo: t > TG.WAY - 0.2 && t < TG.FATHER - 0.4, enfado: t > TG.WAY - 0.2, habla: t > TG.WAY && t < TG.FATHER && parp(t, 9) });
  R.actor(MS.maryNinaMS, ri(nx), 150, t, { dir: t > TG.FATHER ? 1 : -1, anda: aparta > 0 && aparta < 1, salto, sorpresa: t > TG.WAY - 0.6 && t < TG.WAY + 0.3, triste: t > TG.WAY + 0.4 });
  if (cu > 0 && cu < 1) { const r = R.actor(MS.damaMS, ri(cx), 156, t, { dir: -1, anda: true, sostiene: true }); const [mx, my] = r.mano; R.rect(mx - 8, my, mx + 6, my + 1, H('#c8ccd4')); for (const dx of [-5, -1, 3]) { R.rect(mx + dx, my - 3, mx + dx + 2, my - 1, BLANCO); } }
  // la sombra de Godwin pasa por la rendija de luz del estudio en «father»
  const s = tramo(t, TG.FATHER - 0.3, TG.P11); if (s > 0 && s < 1) { const sx = lerp(290, 298, s); caja(sx - 3, 70, sx + 3, 140, (x, y) => { if (x > 286 && x < 300) sombrea(x, y, 0.45); }); R.disco(sx, 66, 4, mez(H('#d8a860'), K, 0.45)); }
  silla(70, 156, 1); silla(250, 156, -1);
};

// ── P11 · El estudio de Godwin: él escribe en su escritorio; en «remarries» se abre la puerta y entra la madrastra, él
// sale a recibirla y le da la mano (un corazón); la niña asoma por la puerta; en «never manages to get along» la
// madrastra la mira de frente y la niña frunce el ceño: una nubecita de tormenta entre las dos ──
const p11 = (t) => {
  const ab = ease(tramo(t, TG.REMARRIES - 0.5, TG.REMARRIES));
  estudioG(t, ab);
  const ug = tramo(t, TG.REMARRIES, TG.WOMAN + 0.2), gx = ug <= 0 ? 96 : ug < 0.3 ? lerp(96, 160, ug / 0.3) : lerp(160, 206, (ug - 0.3) / 0.7);
  const um = tramo(t, TG.REMARRIES + 0.1, TG.WOMAN + 0.2), mx = lerp(300, 230, ease(um));
  const ni = tramo(t, TG.WOMAN, TG.NEVER - 0.1), nx = lerp(330, 268, ease(ni));
  if (ni > 0) R.actor(MS.maryNinaMS, ri(nx), 150, t, { dir: -1, anda: ni > 0 && ni < 1, enfado: t > TG.NEVER + 0.3, sorpresa: t > TG.WOMAN + 0.2 && t < TG.NEVER });
  if (ab > 0.4) R.actor(MS.madrastraMS, ri(mx), 150, t, { dir: t > TG.NEVER ? 1 : -1, anda: um > 0 && um < 1, sonrisa: t > TG.WOMAN && t < TG.NEVER, enfado: t > TG.NEVER + 0.2, dedo: t > TG.ALONG - 0.3 && t < TG.ALONG + 0.6 });
  R.actor(MS.godwinMS, ri(gx), ug > 0 ? ri(lerp(127, 150, cl(ug * 3))) : 127, t, { dir: 1, anda: ug > 0 && ug < 1, sostiene: ug <= 0 ? [ri(gx) + 16, 113] : false, sonrisa: t > TG.WOMAN, brazos: t > TG.WOMAN + 0.2 && t < TG.WOMAN + 0.7 });
  if (ug <= 0) { R.linea(ri(gx) + 16, 113, ri(gx) + 20, 105 + (parp(t, 10) ? 1 : 0), BLANCO); }
  escritorioG(t);
  const h = tramo(t, TG.WOMAN + 0.2, TG.WOMAN + 1.2); if (h > 0 && h < 1) icCorazon(212, ri(116 - h * 12));
  const n = tramo(t, TG.NEVER + 0.3, TG.ALONG + 0.3); if (n > 0) { globo2(236, 72, icNube, n); }
};

// ── P12 · La biblioteca llena de visitas: por la puerta del salón entran caballeros; uno cruza por delante y saluda con
// la chistera en «famous visitors»; la niña corre a su taburete del rincón y se queda allí en «corner» ──
const p12 = (t) => {
  const oo = { cuna: false, visitas: true }; T.londres(R, t, oo);
  const v = tramo(t, TG.P12 + 0.1, TG.VISITORS + 0.6), vx = lerp(214, 92, ease(v));
  R.actor(MS.damaMS, 196, 150, t, { dir: -1, habla: parp(t, 7) && t < TG.GIRL3, sonrisa: t > TG.VISITORS });
  R.actor(MS.caballeroMS, ri(vx), 150, t, { dir: v < 1 ? -1 : 1, anda: v > 0 && v < 1, brazos: t > TG.VISITORS && t < TG.VISITORS + 0.7, sonrisa: true });
  R.actor(MS.godwinMS, 128, 150, t, { dir: 1, habla: t > TG.VISITORS + 0.6 && parp(t, 8), sonrisa: true, dedo: t > TG.BOOKS - 0.2 && t < TG.BOOKS + 0.6 });
  const n = tramo(t, TG.GIRL3 - 0.4, TG.SITTINGC + 0.2), nx = lerp(40, 268, ease(n));
  R.actor(MS.maryNinaMS, ri(nx), n >= 1 ? 147 : 150, t, { dir: n < 1 ? 1 : -1, anda: n > 0 && n < 1, triste: n >= 1 });
  T.londresDelante(R, t, oo);
};

// ── P13 · El salón de atrás: los mayores hablan junto a la chimenea (globos: un matraz en «science», la balanza en
// «politics»); la niña asoma por detrás del biombo, se lleva el dedo a los labios en «quiet» y escucha ──
const p13 = (t) => {
  salonJ(t);
  const asoma = ease(tramo(t, TG.P13, TG.P13 + 0.6)), nx = lerp(36, 52, asoma);
  R.actor(MS.maryNinaMS, ri(nx), 150, t, { dir: 1, dedo: t > TG.P13 + 0.3 && t < TG.LISTENING + 0.2, sonrisa: t > TG.SCIENCE, sorpresa: t > TG.POLITICS && t < TG.POLITICS + 0.4 });
  biombo(t);
  R.actor(MS.ancianoMS, 112, 150, t, { dir: 1, habla: t > TG.TALK && t < TG.SCIENCE + 0.8 && parp(t, 8), dedo: t > TG.SCIENCE - 0.1 && t < TG.SCIENCE + 0.8 });
  R.actor(MS.godwinMS, 222, 150, t, { dir: -1, habla: t > TG.POLITICS - 0.1 && parp(t, 9), brazos: t > TG.POLITICS && t < TG.POLITICS + 0.5 });
  R.actor(MS.damaMS, 196, 152, t, { dir: -1, sonrisa: true, sostiene: [188, 134] }); R.rect(185, 133, 190, 134, BLANCO); R.rect(186, 130, 189, 132, BLANCO);
  R.actor(MS.caballeroMS, 150, 154, t, { dir: 1, tocado: false, sorpresa: t > TG.SCIENCE + 0.2 && t < TG.SCIENCE + 0.7, habla: t < TG.TALK && parp(t, 7) });
  globo2(100, 86, icMatraz, tramo(t, TG.SCIENCE - 0.1, TG.SCIENCE + 0.2));
  const bl = tramo(t, TG.POLITICS - 0.1, TG.POLITICS + 0.2); if (bl > 0) globo2(212, 86, (x, y) => R.icono('balanza', x + 1, y + 1, H('#8a6418'), BLANCO), bl);
};

// ── P14 · Debajo de la mesa del té: el poeta recita con la mano en alto; en «poetry» se le escapa una hoja de versos
// que planea y se cuela bajo la mesa; la niña la coge y sonríe; en «notice» una señora mira abajo y ella se queda
// quieta; el gato se mete con ella ──
const p14 = (t) => {
  mesaTe(t);
  R.actor(MS.damaMS, 30, 150, t, { dir: 1, sostiene: [46, 128], habla: t > TG.ASIF && t < TG.NOONE && parp(t, 7), sorpresa: t > TG.NOTICE - 0.1 && t < TG.NOTICE + 0.5 }); R.rect(43, 127, 49, 128, BLANCO); R.rect(44, 124, 48, 126, BLANCO);
  R.actor(MS.caballeroMS, 278, 150, t, { dir: -1, tocado: false, dedo: t < TG.ASIF, habla: t < TG.ASIF && parp(t, 9), brazos: t > TG.POETRY - 0.1 && t < TG.POETRY + 0.5 });
  mesaTePatas();
  const cg = tramo(t, TG.ASIF + 0.2, TG.ASIF + 0.6); const quieta = t > TG.NOTICE - 0.1 && t < TG.NOTICE + 0.6;
  const r = R.actor(MS.maryNinaMS, 156, 150, t, { dir: 1, sostiene: cg > 0 ? true : false, sonrisa: t > TG.ASIF + 0.6 && !quieta, quieto: quieta, sorpresa: quieta });
  // la hoja de versos: sale de la mano del poeta, planea en zigzag y entra bajo el mantel hasta la niña
  const f = tramo(t, TG.POETRY, TG.ASIF + 0.4); if (f > 0 && cg < 1) { const hx = lerp(272, r.mano[0], f) + Math.sin(f * 12) * 8 * (1 - f), hy = lerp(118, r.mano[1], ease(f)) - Math.sin(f * Math.PI) * 24 * (1 - f) + (f > 0.7 ? 0 : 0);
    R.rect(ri(hx) - 3, ri(hy) - 2, ri(hx) + 3, ri(hy) + 2, BLANCO); for (let j = -1; j <= 1; j++) R.rect(ri(hx) - 2, ri(hy) + j, ri(hx) + 1, ri(hy) + j, H('#8a8a9a')); }
  if (cg > 0) { const [mx, my] = r.mano; R.rect(mx - 3, my - 3, mx + 3, my + 1, BLANCO); for (let j = -2; j <= 0; j++) R.rect(mx - 2, my + j, mx + 1, my + j, H('#8a8a9a')); }
  // el gato se mete bajo la mesa en «no one»
  const g = tramo(t, TG.NOONE - 0.4, TG.NOTICE); gatito(ri(lerp(-10, 132, g)), 150, t, { anda: g > 0 && g < 1, dir: 1, c: H('#8a6a4a') });
  mesaTeDelante(t);
  globo2(262, 76, icPluma, tramo(t, TG.POETRY - 0.2, TG.POETRY + 0.1) * (1 - tramo(t, TG.NOONE, TG.NOONE + 0.3)));
};

// ── P15 · La librería de los Godwin en Skinner Street (1812, de día): Percy llega a zancadas por la acera con un libro
// bajo el brazo; en «rebellious» lanza el sombrero al aire y lo coge; llama a la puerta en «appears»; la puerta se abre y
// sale Godwin; en «admires» Percy le hace una reverencia con los brazos abiertos. Pasan una señora y el carro de la leche ──
const p15 = (t) => {
  const ab = ease(tramo(t, TG.ADMIRES - 0.7, TG.ADMIRES - 0.2));
  tiendaSkinner(t, ab);
  if (ab > 0.3) R.actor(MS.godwinMS, 174, 151, t, { dir: -1, sorpresa: t < TG.ADMIRES + 0.2, sonrisa: t > TG.ADMIRES + 0.3, habla: t > TG.FATHER2 && parp(t, 8) });
  // una señora pasa por la acera de derecha a izquierda
  const s2 = tramo(t, TG.P15, TG.APPEARS + 0.6), sx = lerp(330, 210, s2); if (s2 < 1) R.actor(MS.damaMS, ri(sx), 154, t, { dir: -1, anda: s2 > 0 && s2 < 1, sostiene: true });
  const u = tramo(t, TG.P15 + 0.1, TG.APPEARS - 0.3), px = lerp(-14, 150, ease(u));
  const lanza = tramo(t, TG.REBEL - 0.1, TG.REBEL + 0.8);
  const r = R.actor(MS.percyMS, ri(px), 154, t, { dir: 1, anda: u > 0 && u < 1, sostiene: lanza > 0 && lanza < 1 ? true : false, dedo: t > TG.APPEARS - 0.2 && t < TG.APPEARS + 0.3, brazos: t > TG.ADMIRES && t < TG.ADMIRES + 0.8, sonrisa: true });
  if (lanza > 0 && lanza < 1) { const hy = r.mano[1] - Math.sin(lanza * Math.PI) * 28, hx = r.mano[0] + lanza * 4; R.rect(ri(hx) - 3, ri(hy) - 5, ri(hx) + 3, ri(hy), K); R.rect(ri(hx) - 2, ri(hy) - 4, ri(hx) + 2, ri(hy) - 1, H('#2a2a3a')); R.rect(ri(hx) - 5, ri(hy), ri(hx) + 5, ri(hy) + 1, K); }
  // el carro de la leche cruza por delante (por la calzada)
  const c = tramo(t, TG.P15 + 0.6, TG.P16 + 0.4), cx = lerp(340, -70, c);
  if (c > 0 && c < 1) { const X = ri(cx); R.rect(X + 14, 158, X + 40, 170, H('#6a4a2a')); for (let x = X + 14; x <= X + 40; x++) ps(x, 158, H('#8a6a3a')); for (const dx of [18, 24, 30, 36]) { R.rect(X + dx, 152, X + dx + 3, 158, H('#c8ccd4')); ps(X + dx, 152, BLANCO); }
    for (const wx of [20, 36]) { R.disco(X + wx, 173, 5, K); R.disco(X + wx, 173, 3, H('#8a6a3a')); const a = t * 6; R.linea(X + wx, 173, ri(X + wx + Math.cos(a) * 3), ri(173 + Math.sin(a) * 3), K); }
    R.linea(X + 14, 164, X + 2, 162, H('#4a3420')); R.actor(MS.felixMS, X + 42, 178, t, { dir: -1, anda: true }); }
  // un perro olisquea las cestas de la frutería
  gatito(ri(lerp(70, 46, tramo(t, TG.P15, TG.ADMIRES))), 156, t, { anda: t < TG.ADMIRES, dir: -1, c: H('#b08a5a') });
};

// ── P16 · El recibidor en 1814 (de día, con flores): Mary, ya de dieciséis, baja la escalera; Percy espera junto a la
// jamba con las marcas de cuando era niña; «21» sobre él y un anillito en «has a wife»; «16» sobre ella; se miran ──
const p16 = (t) => {
  const { X } = recibidor(t, 96, true);
  marcasJamba(X, [128, 124, 120, 116, 112, 106], null, 1);
  const b = tramo(t, TG.P16, TG.T16 - 0.4), wx = lerp(392, 250, ease(b)), my = ri(ESC(wx));
  R.actor(MS.maryMS, ri(X(wx)), my, t, { dir: -1, anda: b > 0 && b < 1, sonrisa: t > TG.T16 + 0.3, sorpresa: t > TG.T21 && t < TG.T21 + 0.5 });
  R.actor(MS.percyMS, ri(X(150)), 150, t, { dir: 1, sonrisa: true, habla: t > TG.T16 + 0.6 && parp(t, 8), dedo: t > TG.T21 - 0.2 && t < TG.T21 + 0.6, sostiene: t > TG.T16 + 0.2 ? [X(150) + 16, 126] : false });
  if (t > TG.T16 + 0.2) librito(X(150) + 16, 128, H('#1c3a5a'));
  const n1 = tramo(t, TG.T21 - 0.1, TG.T21 + 0.2); if (n1 > 0) R.numero('21', X(150) + 8, ri(116 - n1 * 6), { tam: 8, centro: true });
  const an = tramo(t, TG.WIFE - 0.1, TG.WIFE + 0.2) * (1 - tramo(t, TG.T16 - 0.2, TG.T16)); if (an > 0) { const ax = X(150) + 24, ay = 100; R.disco(ax, ay, 3.5, ORO[3]); R.disco(ax, ay, 2, H('#e8dcc0')); ps(ax, ay - 4, H('#c8e8ff')); ps(ax - 1, ay - 4, H('#ffffff')); }
  const n2 = tramo(t, TG.T16 - 0.1, TG.T16 + 0.2); if (n2 > 0) R.numero('16', ri(X(wx)) + 8, ri(my - 34 - n2 * 6), { tam: 8, centro: true });
};

// ── P17 · El cementerio al atardecer: Mary lee junto a la lápida de su madre; Percy llega entre las tumbas y se para; en
// «mother's grave» ella levanta la vista; en «feels like herself» los dos sonríen y los vencejos pasan ──
const p17 = (t) => {
  atardecer(t);
  const r = R.actor(MS.maryMS, 168, 150, t, { dir: t > TG.GRAVE2 - 0.3 ? 1 : -1, sostiene: t < TG.HERSELF + 0.4, sonrisa: t > TG.PLACE, sorpresa: t > TG.GRAVE2 - 0.3 && t < TG.GRAVE2 + 0.3 });
  if (t < TG.HERSELF + 0.4) librito(r.mano[0], r.mano[1] + 2, H('#1c3a5a'), true);
  const u = tramo(t, TG.COMES - 0.6, TG.GRAVE2 + 0.2), px = lerp(336, 206, ease(u));
  R.actor(MS.percyMS, ri(px), 152, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: t > TG.PLACE, dedo: t > TG.HERSELF && t < TG.HERSELF + 0.8 });
  // las sombras largas de los dos
  for (const [x0, y0] of [[168, 151], [ri(px), 153]]) for (let d = 0; d < 34; d++) for (let w = 2; w <= 12; w++) sombrea(x0 + w - 2 - d, y0 + d * 0.08, 0.18);
  const h = tramo(t, TG.HERSELF, TG.HERSELF + 1.0); if (h > 0 && h < 1) icCorazon(186, ri(112 - h * 10), H('#f87a7a'));
};

// ── P18 · La buhardilla antes del alba (1814): Mary, de dieciséis, mete un libro en la bolsa de viaje; en «dawn» la
// ventana empieza a clarear; en «July» pasa la hoja del calendario de la cómoda («7»); apaga la vela y se va ──
const p18 = (t) => {
  const { X } = buhardilla(t, 0, 1);
  // la bolsa de viaje en la cama
  const bx = X(140); R.rect(bx - 10, 104, bx + 10, 116, H('#5a3a24')); R.rect(bx - 10, 104, bx + 10, 106, H('#7a5434')); R.linea(bx - 6, 104, bx - 4, 98, H('#3a2414')); R.linea(bx + 6, 104, bx + 4, 98, H('#3a2414')); R.linea(bx - 4, 98, bx + 4, 98, H('#3a2414')); ps(bx, 108, ORO[3]);
  const mete = tramo(t, TG.P18 + 0.3, TG.DAWN), sale = tramo(t, TG.JULY + 0.9, TG.P19 - 0.1);
  const mx = lerp(lerp(160, 154, mete), 28, ease(sale));
  const r = R.actor(MS.maryMS, ri(X(mx)), 150, t, { dir: sale > 0 ? -1 : -1, anda: (sale > 0 && sale < 1), sostiene: mete < 1 ? [bx + 4, lerp(122, 106, mete)] : false, dedo: t > TG.JULY - 0.2 && t < TG.JULY + 0.4, sorpresa: t > TG.DAWN && t < TG.DAWN + 0.4 });
  if (mete < 1) librito(bx + 4, ri(lerp(124, 108, mete)), H('#6a1c1c'));
  // la vela sobre la mesilla: se apaga cuando se va
  vela(X(190), 128, t, { alta: 5, halo: 28, fuerza: 0.4, apagada: t > TG.JULY + 0.8 }); R.rect(X(184), 128, X(196), 130, ROBLE[4]); R.rect(X(189), 131, X(191), 150, ROBLE[2]);
  // el calendario: en «July» cae la hoja y aparece el «7»
  const cx0 = 236, cy0 = 76, fl = tramo(t, TG.JULY - 0.2, TG.JULY + 0.3);
  R.rect(cx0, cy0, cx0 + 22, cy0 + 26, K); R.rect(cx0 + 1, cy0 + 1, cx0 + 21, cy0 + 25, BLANCO); R.rect(cx0 + 1, cy0 + 1, cx0 + 21, cy0 + 6, H('#a82a2a')); R.numero(fl > 0.5 ? '7' : '6', cx0 + 11, cy0 + 21, { centro: true });
  if (fl > 0 && fl < 1) { const fy = cy0 + 6 + fl * 40, fx = cx0 + 4 + Math.sin(fl * 8) * 6; R.rect(ri(fx), ri(fy), ri(fx) + 14, ri(fy) + 10, BLANCO); R.rect(ri(fx), ri(fy), ri(fx) + 14, ri(fy) + 1, H('#c8c0b0')); }
  R.linea(cx0 + 11, cy0 - 4, cx0 + 4, cy0, H('#5a5a60')); R.linea(cx0 + 11, cy0 - 4, cx0 + 18, cy0, H('#5a5a60'));
  // la madrugada que entra: un tinte azul rosado que crece
  const a = tramo(t, TG.DAWN - 0.3, TG.P19); if (a > 0) luz(X(229), 76, 70, H('#e8b0a0'), 0.25 * a);
};

// ── P19 · La calle de madrugada (julio de 1814): sale Mary con su bolsa por la puerta y corre al carruaje donde
// espera Percy; suben los dos en «run away» y el carruaje se va hacia la izquierda («to France») ──
const p19 = (t) => {
  const va = tramo(t, TG.HIM - 0.2, TG.FIN + 0.2), X0 = lerp(108, -150, ease(va) * 0.7 + va * 0.3);
  const oo = { encuadre: 'calle', clarea: lerp(0.3, 0.55, tramo(t, TG.P19, TG.FIN)), carruaje: ri(X0), marcha: va > 0 };
  T.londres(R, t, oo);
  const u = tramo(t, TG.LEAVES - 0.1, TG.RUN - 0.3), mx = lerp(214, 178, ease(u)), my = u < 0.3 ? lerp(137, 150, u / 0.3) : 150;
  const sube = t > TG.RUN - 0.1;
  if (!sube) { const r = R.actor(MS.maryMS, ri(mx), ri(my), t, { dir: -1, anda: u > 0 && u < 1, sostiene: true, sorpresa: t < TG.LEAVES + 0.3 });
    const [hx, hy] = r.mano; R.rect(hx - 4, hy, hx + 3, hy + 6, H('#5a3a24')); R.rect(hx - 4, hy, hx + 3, hy + 1, H('#7a5434')); R.linea(hx - 2, hy, hx, hy - 3, H('#3a2414')); }
  if (t < TG.RUN + 0.3) R.actor(MS.percyMS, ri(X0 + 64), 150, t, { dir: 1, brazos: t > TG.FIT && t < TG.RUN - 0.2, sonrisa: true, dedo: t > TG.LEAVES + 0.4 && t < TG.FIT });
  T.londresDelante(R, t, oo);
};
'''

CUERPO = r'''
const año = (t) => t < TG.P4 ? 1797 : t < TG.P5 ? ri(lerp(1797, 1800, tramo(t, TG.P4, TG.P5))) : t < TG.P10 ? 1800 : t < TG.P12 ? 1801 : t < TG.P15 ? 1806 : t < TG.P16 ? 1812 : 1814;
const efectos = [[TG.BORN - 0.4, 'puerta'], [TG.BORN + 0.3, 'brillo'], [TG.LONDON + 0.2, 'pasos'],
  [TG.DIES, 'campana'], [TG.WOLL, 'brillo'],
  [TG.GIRLS - 0.1, 'lapiz'], [TG.BOYS - 0.1, 'lapiz'],
  [TG.P4 + 0.1, 'pasos'], [TG.GROWS, 'lapiz'], [TG.PORTRAIT, 'brillo'],
  [TG.ANOTHER, 'brillo'],
  [TG.P6 + 0.2, 'pasos'], [TG.PANCRAS, 'campana'], [TG.BOOK - 0.5, 'pajaros'],
  [TG.KNEES - 0.1, 'papel'],
  [TG.P8 + 0.3, 'whoosh'], [TG.LETTERS, 'golpecito'], [TG.LEARNED + 0.1, 'boing'], [TG.NAMEB, 'brillo'],
  [TG.MOTHERS, 'pajaros'], [TG.FELT, 'brillo'],
  [TG.HOME + 0.2, 'pasos'], [TG.WAY - 0.6, 'boing'],
  [TG.REMARRIES - 0.5, 'puerta'], [TG.WOMAN + 0.2, 'pop'], [TG.NEVER + 0.3, 'trueno'],
  [TG.VISITORS - 0.4, 'pasos'], [TG.CORNER, 'pop'],
  [TG.SCIENCE - 0.1, 'pop'], [TG.POLITICS - 0.1, 'pop'],
  [TG.POETRY, 'papel'], [TG.NOONE - 0.2, 'miau'],
  [TG.P15 + 0.3, 'pasos'], [TG.P15 + 0.8, 'carro'], [TG.APPEARS - 0.1, 'toc'], [TG.ADMIRES - 0.7, 'puerta'],
  [TG.T21, 'pop'], [TG.WIFE, 'brillo'], [TG.T16, 'pop'],
  [TG.COMES - 0.5, 'pasos'], [TG.HERSELF, 'pajaros'],
  [TG.DAWN, 'papel'], [TG.JULY, 'papel'],
  [TG.LEAVES - 0.2, 'puerta'], [TG.RUN - 0.2, 'pasos'], [TG.HIM - 0.2, 'carro']];
T.rodar(E, R, [[0, p1], [TG.P2, p2], [TG.P3, p3], [TG.P4, p4], [TG.P5, p5], [TG.P6, p6], [TG.P7, p7], [TG.P8, p8], [TG.P9, p9],
  [TG.P10, p10], [TG.P11, p11], [TG.P12, p12], [TG.P13, p13], [TG.P14, p14], [TG.P15, p15], [TG.P16, p16], [TG.P17, p17],
  [TG.P18, p18], [TG.P19, p19]], { efectos, cartela: '1797', año });
'''

CABECERA = '''// MS-LAPIDA (frases 5–8), 1797–1814: la infancia de Mary. Diecinueve planos, cortados en la palabra:
// 1. la casa de los Godwin de noche: llega la comadrona con su farol; en «born» se enciende la ventana de arriba; pasa
//    el sereno;  (corta en «and eleven days»)
// 2. la biblioteca con la cuna: Godwin mece la cuna; «11» en «eleven days»; en «dies» se apaga una vela; en
//    «Wollstonecraft» la luz se posa en el retrato;  (corta en «one of the first»)
// 3. recuerdo: el escritorio de la madre; la mano dibuja una niña en «girls», un «=» en «same» y un niño en «boys»;
//    (corta en «and her daughter»)
// 4. el recibidor: Godwin marca la altura de la niña en la jamba (2, 3, 4); salta en «grows up»; señala el medallón
//    de su madre en «portrait»;  (corta en «and with the feeling»)
// 5. la buhardilla de noche: la niña en la ventana; en «another life» una estrella se apaga y otra se enciende;
//    (corta en «Picture»)
// 6. el cementerio de St Pancras: la niña llega con su libro y se queda junto a la lápida; la campana en «Pancras»;
//    (corta en «grave»)
// 7. inserto: el libro sobre sus rodillas; pasa la página en «knees»; cae una hoja;  (corta en «tracing»)
// 8. la lápida de cerca: el dedo sigue el renglón, que se dora en «name». GAG: Atom, cabeza abajo, intenta leerla al
//    revés y da la vuelta;  (corta en «which was also»)
// 9. entre las lápidas: la niña lee; un petirrojo salta hasta ella; en «least alone» sale el sol;  (corta en «At home»)
// 10. el comedor: la criada pasa con la bandeja y la niña se aparta de un salto en «in the way»;  (corta en «the philosopher»)
// 11. el estudio de Godwin: en «remarries» entra la madrastra; un corazón; en «never manages» ella y la niña se
//    miran con el ceño fruncido;  (corta en «and in that house»)
// 12. la biblioteca con visitas: un caballero saluda en «famous visitors»; la niña corre a su rincón;  (corta en «quiet»)
// 13. el salón de atrás: los mayores hablan (matraz en «science», balanza en «politics»); la niña asoma tras el biombo
//    con el dedo en los labios;  (corta en «and poetry»)
// 14. debajo de la mesa del té: la hoja de versos del poeta cae hasta la niña; el gato se mete con ella;  (corta en «And one day»)
// 15. la casa de día (1812): Percy llega, lanza el sombrero en «rebellious», llama y saluda a Godwin;  (corta en «Percy»)
// 16. el recibidor en 1814: Mary baja la escalera; «21» sobre Percy, un anillo en «wife», «16» sobre ella;  (corta en «Imagine»)
// 17. el cementerio al atardecer: Percy la encuentra junto a la tumba; sonríen en «herself»;  (corta en «and when»)
// 18. la buhardilla antes del alba: Mary hace la bolsa; el calendario pasa a «7» en «July»; apaga la vela;  (corta en «she leaves»)
// 19. la calle de madrugada: sale con la bolsa, sube al carruaje con Percy y se van («to France»).'''

E['ms-lapida'] = ('La lápida', CABECERA, momentos(G) + COMUN + LOCALES + PLANOS + CUERPO)
