# Borrador de escenas del ep48 (grupo S5): bl-mensaje y bl-folleto, con el movimiento ya hecho.
# Los instantes salen de las palabras de la voz inglesa (atomo/build/largo/ep48/linea.json), escritos como en('marca', f).
# Las utilidades COMUN y PROPIO son copia de las del grupo S2/S4 (escenas4.py), para que este módulo se genere solo.
E = {}

MARCAS = {'mensaje': (0.2, 39.363), 'ruina': (39.763, 69.929), 'folleto': (1.5, 23.919)}

# bl-mensaje: las palabras que mandan (corte de plano o acción), en segundos de la escena
TM = {
    'LETTER': 1.14, 'MESSAGE': 2.58, 'SECOND': 4.06,
    'P2': 5.32, 'DEPOSITED': 5.62, 'BEDFORD': 6.96, 'FOUR': 8.04, 'MILES': 8.38, 'BUFORDS': 9.02,
    'P3': 10.26, 'EXCAV': 10.52, 'VAULT': 11.62, 'SIX': 12.56, 'FEET': 12.80, 'BELOW': 13.14, 'GROUND': 14.42,
    'P4': 15.44, 'GOLD': 16.64, 'SILVER': 17.56, 'JEWELS': 18.72,
    'P5': 19.62, 'TRADED': 21.14, 'STL': 21.68, 'SOME': 22.96, 'SILVER2': 23.38,
    'P6': 23.92, 'LOAD': 24.40, 'VALUED': 25.36, 'N13': 26.22, 'IMAGINE': 28.68,
    'P7': 29.40, 'FEELS': 30.40, 'SMALL': 31.06, 'CANDLE': 32.46, 'NEARLY': 32.88, 'BURNED': 33.32,
    'P8': 34.46, 'LANGUAGE': 35.32, 'RISE': 35.76, 'NUMBERS': 36.58, 'SILENT': 37.74, 'DECADES': 38.48,
    'P9': 39.76, 'JOY': 39.98, 'LAST': 40.64, 'DECL': 41.92, 'OPENS': 42.36, 'FIRST': 43.68, 'THIRD': 44.66,
    'P10': 45.42, 'TWENTY': 47.18, 'YEARS': 47.44, 'TRYING': 47.96, 'EVERYTHING': 48.54,
    'P11': 50.38, 'ACCOUNT': 51.82, 'COMFORT': 52.96, 'REDUCED': 54.24, 'POVERTY': 55.34,
    'P12': 56.56, 'FAMILY': 57.38, 'DOWN': 57.86, 'Y1885': 59.48,
    'P13': 61.38, 'WORN': 61.98, 'DECIDES': 63.14, 'TELL': 63.76, 'STORY': 64.38,
    'P14': 65.10, 'THREE': 65.66, 'OTHERS': 67.12, 'SEARCHING': 67.86, 'NOLONGER': 68.78, 'CAN': 69.34,
}
# bl-folleto
TF = {
    'PAMPHLET': 1.96, 'BORN': 2.56, 'BEALE': 3.50, 'PAPERS': 3.80,
    'F2': 4.76, 'LYNCH': 5.26, 'AGENT': 6.48, 'WARD': 7.90, 'SOLD': 8.62, 'FIFTY': 9.14, 'CENTS': 9.46, 'SOON': 10.42,
    'F3': 11.90, 'WARD2': 12.48, 'ALMOST': 13.34, 'COPY': 14.08, 'LOST': 14.70, 'FIRE': 15.32, 'SHOP': 16.26,
    'F4': 17.86, 'NOBODY': 18.90, 'FOUND': 19.96, 'SINGLE': 20.44, 'LINE': 20.76, 'FIRE2': 22.02, 'NEWS': 22.66, 'TIME': 23.46,
}


def frac(k, s):
    a, b = MARCAS[k]
    return (s - a) / (b - a)


def tabla_en(nombre, tabla, marca):
    """const <nombre> = {...}: cada instante como en('marca', fracción)"""
    def m(s):
        return marca(s) if callable(marca) else marca
    return f'const {nombre} = {{ ' + ', '.join(f"{n}: en('{m(s)}', {frac(m(s), s):.4f})" for n, s in tabla.items()) + ' };\n'


TM_JS = tabla_en('W', TM, lambda s: 'mensaje' if s < 39.6 else 'ruina')
TF_JS = tabla_en('W', TF, 'folleto')

# ── COMÚN (copia de escenas4.py, grupo S2/S4) ──
COMUN = r'''
const AT = T.AT, K = T.C.k, ri = Math.round;
const B4M = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4M[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const pal = (a) => a.map((c) => hex(c));
const ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const rmp = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return ramp[Math.max(0, Math.min(ramp.length - 1, l))]; };
const FIJOS = {};
// lo fijo de un fondo propio, pintado una vez en su búfer (R.usar(prev), nunca R.usar() a secas)
const horno = (k, f) => { if (!FIJOS[k]) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); FIJOS[k] = b; } return FIJOS[k]; };
const fijo = (k, f) => R.copiar(horno(k, f));
const ps = (x, y, c) => { x = ri(x); y = ri(y); if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, c); };
const caja = (x0, y0, x1, y1, f) => { for (let y = Math.max(0, ri(y0)); y <= Math.min(179, ri(y1)); y++) for (let x = Math.max(0, ri(x0)); x <= Math.min(319, ri(x1)); x++) f(x, y); };
const relleno = (x0, y0, x1, y1, ramp, vf) => caja(x0, y0, x1, y1, (x, y) => R.pset(x, y, rmp(ramp, vf(x, y), x, y)));
const sombrea = (x, y, a) => { x = ri(x); y = ri(y); if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mez(R.pget(x, y), K, a)); };
const aclara = (x, y, c, a) => { x = ri(x); y = ri(y); if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mez(R.pget(x, y), c, a)); };
const sombraCaja = (x0, y0, x1, y1, a) => caja(x0, y0, x1, y1, (x, y) => { if (b4(x, y) < 0.75) sombrea(x, y, a); });
// luz tramada que se suma (vela, farol, sol): no tapa, aclara
const luz = (cx, cy, r, c, a = 0.5) => caja(cx - r, cy - r, cx + r, cy + r, (x, y) => { const g = 1 - Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r; if (g > 0) { const v = g * g * a; if (v > b4(x, y) * 0.35) aclara(x, y, c, Math.min(0.85, v)); } });
const lin = (x0, y0, x1, y1, c) => R.linea(ri(x0), ri(y0), ri(x1), ri(y1), c);
const marco = (x0, y0, x1, y1, c) => { lin(x0, y0, x1, y0, c); lin(x0, y1, x1, y1, c); lin(x0, y0, x0, y1, c); lin(x1, y0, x1, y1, c); };
const parp = (t, f = 8) => Math.sin(t * f) > 0;
const tranq = (x, y) => (x >= 274 && y <= 48) || (x >= 16 && x <= 174 && y <= 21);
const brillo = (x, y, t, a = 1, c = 0xffffffff) => { if (a <= 0) return; const r = ri(2 + 3 * a * (0.6 + 0.4 * Math.sin(t * 14))); for (let i = -r; i <= r; i++) { ps(x + i, y, c); ps(x, y + i, c); } ps(x - 1, y - 1, c); ps(x + 1, y + 1, c); ps(x + 1, y - 1, c); ps(x - 1, y + 1, c); };
const bocad = (x, y, ic, a = 1) => { if (a > 0) R.bocadillo(ri(x), ri(y - (1 - ease(cl(a))) * 4), { icono: ic }); };

// ── PALETAS ──
const PINO = pal(['#3a2414', '#54361e', '#6e4a28', '#8a6034', '#a67a44', '#c0945a']);
const NOGAL = pal(['#1e120c', '#2e1c12', '#40281a', '#563824', '#6c4a30', '#865e3e']);
const ROBLE = pal(['#2e2014', '#46321e', '#5e4628', '#785a34', '#927042', '#ac8854']);
const CREMA = pal(['#6e5e44', '#8a7856', '#a49270', '#bcaa86', '#d2c29c', '#e4d6b4']);
const SALVIA = pal(['#3e4a38', '#4e5c46', '#606e54', '#748464', '#889876', '#9cac88']);
const BURDEOS = pal(['#2e1014', '#46181c', '#5e2226', '#7a2e30', '#963c3a', '#b05248']);
const YESO = pal(['#4e463e', '#6a6054', '#867a6a', '#a09482', '#b8ae9a', '#d0c8b4', '#e2dccc']);
const LADR = pal(['#2a1812', '#3c221a', '#522e22', '#683c2c', '#7e4c38', '#925c44']);
const PIEDRA = pal(['#3a3a36', '#4c4c46', '#605e56', '#76746a', '#8c8a7e', '#a4a294', '#bcbaac']);
const BLANCO = pal(['#7e7a72', '#9a968c', '#b6b2a6', '#d0ccc0', '#e6e2d6', '#f6f2e8']);
const NIEVE = pal(['#7a86a4', '#98a4bc', '#b8c2d4', '#d6dce8', '#eef2f8', '#ffffff']);
const NOCHE = pal(['#0a0e1c', '#10162a', '#181f38', '#202a48', '#2c385a', '#3a486c']);
const CIELO = pal(['#5a7aa8', '#7090ba', '#88a6c8', '#a2bcd6', '#bcd0e2', '#d6e4ee']);
const PRADO = pal(['#2a3a1e', '#384c24', '#48602c', '#5a7434', '#6e883e', '#84a04c']);
const BARRO = pal(['#2e2218', '#3e2e20', '#503c2a', '#644c34', '#7a5e40', '#90724e']);
const LATON = pal(['#5a4018', '#8a6420', '#b88a30', '#e0b850', '#fff0a0']);
const HIERRO = pal(['#1a1a20', '#2a2a32', '#3e3e48', '#56565e', '#74747c']);
const PAPEL = pal(['#8a7a5a', '#a8987a', '#c4b494', '#dccca8', '#ece2c4', '#f8f2dc']);
const TINTA = hex('#2a2230'), ROJO = hex('#b83228'), ROJOL = hex('#e05a3c'), DORADO = hex('#f0c040'), DORL = hex('#fff0a0');
const VELA = hex('#ffd890'), VELAL = hex('#fff4c8'), CALIDA = hex('#ffc070');

// ── PIEZAS DE INTERIOR (a la escala de los chibis) ──
// papel pintado de rayas con florecitas; más oscuro arriba; liso en las zonas tranquilas (Atom y el año)
function papelPintado(x0, y0, x1, y1, A, Bc, o = {}) {
  const per = o.per ?? 10, w = o.w ?? 3, cx = w + Math.floor((per - w) / 2), FL = o.flor ?? BURDEOS[3], FC = o.centro ?? DORADO;
  caja(x0, y0, x1, y1, (x, y) => {
    const g = (y - y0) / Math.max(1, y1 - y0), q = tranq(x, y);
    const v = 3.1 - (1 - g) * 0.9 + (h2(x >> 1, y >> 1, 3) - 0.5) * 0.45 - (o.sombraIzq ? Math.max(0, 1 - (x - x0) / 40) * 0.8 : 0);
    const fx = ((x - x0) % per + per) % per, fy = ((y - y0 + (Math.floor((x - x0) / per) & 1) * 7) % 14 + 14) % 14;
    let c = rmp(!q && fx < w ? Bc : A, q ? v - 0.3 : v, x, y);
    if (!q && fx === cx && fy === 7) c = FC;
    else if (!q && ((fx === cx && (fy === 6 || fy === 8)) || (fy === 7 && Math.abs(fx - cx) === 1))) c = FL;
    R.pset(x, y, c);
  });
}
// friso de cuarterones con su moldura y el rodapié
function friso(x0, y0, x1, y1, M, o = {}) {
  const pw = o.panel ?? 26, H = y1 - y0;
  caja(x0, y0, x1, y1, (x, y) => {
    const j = y - y0; let v = 2.4 + (h2(x, y >> 2, 9) - 0.5) * 0.5 + Math.sin(x * 0.6 + (y >> 3) * 2) * 0.2;
    if (j < 2) v = j === 0 ? 4.6 : 3.8; else if (j < 4) v = 0.9;
    else if (j > H - 4) v = j === H - 3 ? 3.6 : 0.8;
    else { const px = ((x - x0) % pw + pw) % pw, py = j - 4, ph = H - 8;
      if (px === 0) v = 0.9; else if (px === 1) v = 3.6;
      else if (px > 3 && px < pw - 3 && py > 2 && py < ph - 2) { v = 2.9 + (h2(x >> 1, y, 4) - 0.5) * 0.4; if (px === 4 || py === 3) v = 1.3; if (px === pw - 4 || py === ph - 3) v = 4.3; } }
    R.pset(x, y, rmp(M, v, x, y));
  });
}
// tarima: bandas que se ensanchan hacia delante, juntas escalonadas, veta y nudos
function tarima(x0, y0, x1, y1, M, o = {}) {
  let y = y0, k = 0, hg = o.h0 ?? 2;
  while (y <= y1) { const a = y, b = Math.min(y1, y + hg - 1), L = 34 + (k * 13) % 26, off = (k * 37) % L, base = 2.3 + h2(k, 3, 5) * 1.3;
    for (let yy = a; yy <= b; yy++) for (let x = x0; x <= x1; x++) {
      const seg = Math.floor((x + off) / L); let v = base + (h2(seg, k, 7) - 0.5) * 0.9 + Math.sin((x + seg * 17) * 0.11 + yy * 0.9) * 0.3 + (h2(x >> 2, yy, k) - 0.5) * 0.35;
      if (yy === b) v = 0.5; else if (yy === a) v += 0.5; if ((x + off) % L === 0) v = 0.6;
      const nx = (x + off) % L - L / 2, ny = yy - (a + b) / 2; if (h2(seg, k, 8) > 0.7 && nx * nx / 4 + ny * ny < 2) v = 0.9;
      R.pset(x, yy, rmp(M, v - (1 - (yy - y0) / (y1 - y0 + 1)) * 0.7, x, yy));
    }
    y += hg; k++; hg = Math.min(o.hmax ?? 9, hg + (k % 2)); }
}
// alfombra trenzada oval
function alfombra(cx, cy, rx, ry, cols) {
  caja(cx - rx, cy - ry, cx + rx, cy + ry, (x, y) => { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d > 1) return;
    const anillo = Math.floor(d * 7), tr = ((x + y * 2 + anillo) & 3) === 0; let c = cols[anillo % cols.length]; if (tr) c = mez(c, K, 0.25); if (d > 0.93) c = mez(c, K, 0.45); R.pset(x, y, c); });
}
// una vela en su palmatoria con la base en (x, y); la llama tiembla
function vela(x, y, t, o = {}) {
  const alto = o.alto ?? 6, f = Math.sin(t * 13 + x) * 0.5 + Math.sin(t * 7.3) * 0.5;
  if (o.palmatoria !== false) { lin(x - 3, y, x + 3, y, LATON[1]); lin(x - 2, y - 1, x + 2, y - 1, LATON[3]); ps(x + 4, y - 1, LATON[2]); ps(x + 4, y - 2, LATON[2]); }
  for (let j = 1; j <= alto; j++) { ps(x - 1, y - 1 - j, BLANCO[5]); ps(x, y - 1 - j, BLANCO[4]); }
  ps(x - 1, y - 1 - alto, BLANCO[3]); ps(x, y - 2 - alto, K);
  if (o.apagada) return;
  const fy = y - 3 - alto, fx = x + (f > 0.6 ? 1 : f < -0.6 ? -1 : 0) * 0;
  ps(fx, fy, VELAL); ps(fx, fy - 1, VELA); ps(fx, fy - 2, f > 0 ? VELA : CALIDA); ps(fx - 1, fy, CALIDA); if (f > 0.3) ps(fx, fy - 3, CALIDA);
  if (o.luz !== false) luz(fx, fy, o.r ?? 18, VELA, o.a ?? 0.45);
}
// ventana de guillotina con su marco blanco, cristales con reflejo y el alféizar; fuera(x0, y0, x1, y1) pinta lo de
// fuera (recortado al hueco con R.recorte: solo pset, linea, poligono y disco)
function ventana(x0, y0, x1, y1, fuera, o = {}) {
  R.recorte([x0 + 2, y0 + 2, x1 - 2, y1 - 2]); fuera(x0 + 2, y0 + 2, x1 - 2, y1 - 2); R.recorte(null);
  const M = o.marco ?? BLANCO, cols = o.cols ?? 2, filas = o.filas ?? 3, mid = ri((y0 + y1) / 2);
  // los reflejos en diagonal
  caja(x0 + 2, y0 + 2, x1 - 2, y1 - 2, (x, y) => { const d = (x - x0) + (y - y0) * 0.6; if ((d % 23 > 2 && d % 23 < 5) || (d % 23 > 7 && d % 23 < 8)) aclara(x, y, 0xffffffff, 0.16); });
  for (let i = 0; i <= 1; i++) { marco(x0 + i, y0 + i, x1 - i, y1 - i, M[i === 0 ? 1 : 4]); }
  lin(x0 + 2, mid, x1 - 2, mid, M[4]); lin(x0 + 2, mid + 1, x1 - 2, mid + 1, M[2]);
  for (let c = 1; c < cols * 1; c++) { const xx = ri(x0 + (x1 - x0) * c / cols); lin(xx, y0 + 2, xx, y1 - 2, M[3]); }
  for (let f = 1; f < filas; f++) { const yy = ri(y0 + (mid - y0) * f / filas); lin(x0 + 2, yy, x1 - 2, yy, M[3]); const y2 = ri(mid + (y1 - mid) * f / filas); lin(x0 + 2, y2, x1 - 2, y2, M[3]); }
  // alféizar
  relleno(x0 - 3, y1 + 1, x1 + 3, y1 + 3, M, (x, y) => (y === y1 + 1 ? 4.6 : y === y1 + 2 ? 3.4 : 1.4));
  for (let x = x0 - 2; x <= x1 + 2; x++) sombrea(x, y1 + 4, 0.35);
}
// cortina recogida con pliegues (lado −1: cae a la izquierda del hueco; 1 a la derecha)
function cortina(x0, y0, x1, y1, M) {
  caja(x0, y0, x1, y1, (x, y) => { const g = (y - y0) / (y1 - y0), w = x1 - x0, cint = Math.abs(g - 0.62) < 0.03;
    const xx = (x - x0) / w; let v = 2.6 + Math.sin(xx * 13 + g * 2) * 1.1 + (h2(x, y >> 2, 2) - 0.5) * 0.3; if (cint) v = 4.4; if (x === x0 || x === x1) v = 0.6;
    R.pset(x, y, rmp(M, v, x, y)); });
  lin(x0 - 2, y0 - 1, x1 + 2, y0 - 1, LATON[2]); ps(x0 - 3, y0 - 1, LATON[3]); ps(x1 + 3, y0 - 1, LATON[3]);
}
// paisaje de invierno (o pradera) que se ve por una ventana: cielo tramado, colinas, casas, árboles desnudos
function paisaje(x0, y0, x1, y1, o = {}) {
  const H = y1 - y0, noche = !!o.noche, nieve = o.nieve !== false, C0 = noche ? NOCHE : o.alba ? pal(['#7a6a8a', '#9a7e92', '#c09a96', '#e0b8a0', '#f4d4b0', '#fff0d0']) : CIELO;
  caja(x0, y0, x1, y1, (x, y) => { const g = (y - y0) / H; ps(x, y, rmp(C0, (noche ? 0.6 + g * 3 : 4.6 - g * 3) + (h2(x >> 1, y >> 1, 4) - 0.5) * 0.5, x, y)); });
  if (noche) for (let k = 0; k < (x1 - x0) / 3; k++) { const sx = x0 + h2(k, 1, 77) * (x1 - x0), sy = y0 + h2(k, 2, 77) * H * 0.5; ps(sx, sy, h2(k, 3, 77) > 0.5 ? NIEVE[4] : NIEVE[2]); }
  const fondo = nieve ? NIEVE : PRADO, cerca = nieve ? NIEVE : PRADO;
  for (let x = x0; x <= x1; x++) {
    const a = y0 + H * 0.52 + Math.sin(x * 0.07 + 1) * 3 + Math.sin(x * 0.19) * 1.5, b = y0 + H * 0.72 + Math.sin(x * 0.05 + 3) * 2;
    for (let y = ri(a); y <= y1; y++) ps(x, y, rmp(fondo, (nieve ? 2.4 : 2.6) - (noche ? 1.6 : 0) + (h2(x, y, 5) - 0.5) * 0.6, x, y));
    for (let y = ri(b); y <= y1; y++) ps(x, y, rmp(cerca, (nieve ? 3.8 : 3.4) - (noche ? 1.8 : 0) + (h2(x >> 1, y, 6) - 0.5) * 0.6, x, y));
  }
  // casitas lejanas con su tejado y su ventana
  for (let k = 0; k < 4; k++) { const cx = x0 + 6 + k * (x1 - x0) / 4 + h2(k, 9, 3) * 6, by = y0 + H * 0.74, w = 7 + (k % 2) * 3;
    caja(cx, by - 6, cx + w, by, (x, y) => ps(x, y, noche ? LADR[1] : LADR[3 + ((x + y) & 1)]));
    R.poligono([[cx - 1, by - 6], [cx + w / 2, by - 10], [cx + w + 1, by - 6]], nieve ? (noche ? NIEVE[0] : NIEVE[4]) : PIEDRA[2]);
    ps(cx + 2, by - 3, noche ? VELA : K); ps(cx + 3, by - 3, noche ? CALIDA : K); }
  // árboles desnudos
  for (let k = 0; k < 3; k++) { const tx = x0 + 10 + k * (x1 - x0) / 3 + h2(k, 7, 3) * 8, ty = y0 + H * 0.8, c = noche ? NOGAL[0] : NOGAL[2];
    lin(tx, ty, tx, ty - 12, c); lin(tx, ty - 6, tx - 4, ty - 11, c); lin(tx, ty - 8, tx + 4, ty - 13, c); lin(tx - 4, ty - 11, tx - 5, ty - 14, c); lin(tx + 4, ty - 13, tx + 3, ty - 16, c); }
}
// copos que caen dentro de un rectángulo (recortados)
function copos(x0, y0, x1, y1, t, n = 30, vel = 1, c = NIEVE[5]) {
  R.recorte([x0, y0, x1, y1]);
  for (let k = 0; k < n; k++) { const W = x1 - x0, H = y1 - y0, sp = 6 + h2(k, 1, 31) * 10;
    const x = x0 + ((h2(k, 2, 31) * W + Math.sin(t * 1.3 + k) * 3 + t * 3 * vel) % W + W) % W, y = y0 + ((h2(k, 3, 31) * H + t * sp * vel) % H);
    ps(x, y, k % 3 ? c : NIEVE[3]); }
  R.recorte(null);
}
// nubes de tres tonos (cada una [k, y de la base, ancho, velocidad]) que no pisan las zonas tranquilas ni bajan de yMax
function nubes(t, lista, yMax = 60, C3 = [NIEVE[5], NIEVE[3], pal(['#8a9ab4'])[0]]) {
  for (const [k, y, w, v] of lista) { const x0 = ((k * 113 + t * v) % (360 + w)) - w;
    for (let b = 0; b < 4; b++) { const cx = x0 + w * (0.2 + b * 0.22), r = w * (b === 1 || b === 2 ? 0.2 : 0.14), cy = y - r * 0.6;
      caja(cx - r, cy - r, cx + r, y, (x, yy) => { if (tranq(x, yy) || yy > yMax) return; const d = Math.hypot(x - cx, (yy - cy) * 1.3); if (d > r) return;
        const luzN = (yy - cy) / r + (x - cx) / r * 0.3; R.pset(x, yy, luzN < -0.2 ? C3[0] : luzN < 0.45 ? (b4(x, yy) < 0.5 ? C3[0] : C3[1]) : (b4(x, yy) < 0.5 ? C3[1] : C3[2])); }); } }
}
// un cuadro con su marco dorado: paisaje con río o barco
function cuadro(x0, y0, x1, y1, tema = 'rio') {
  caja(x0, y0, x1, y1, (x, y) => { const e = Math.min(x - x0, x1 - x, y - y0, y1 - y); if (e < 3) { R.pset(x, y, e === 0 ? K : rmp(LATON, e === 1 ? 2.6 : 1.6 + (h2(x, y, 3) > 0.7 ? 1 : 0), x, y)); return; }
    const g = (y - y0) / (y1 - y0); let c = g < 0.5 ? rmp(CIELO, 4 - g * 4, x, y) : g < 0.62 ? rmp(PRADO, 2.5 + Math.sin(x * 0.4) * 0.6, x, y) : rmp(tema === 'barco' ? CIELO : pal(['#3a5a6a', '#4a6a78', '#5a7c88']), 1 + (h2(x, y, 4) > 0.6 ? 1 : 0), x, y);
    R.pset(x, y, c); });
  ps(x1 + 1, y0 + 2, K); for (let y = y0 + 1; y <= y1 + 1; y++) sombrea(x1 + 1, y, 0.3); for (let x = x0 + 1; x <= x1 + 1; x++) sombrea(x, y1 + 1, 0.3);
  lin(ri((x0 + x1) / 2), y0 - 4, x0 + 3, y0, LATON[1]); lin(ri((x0 + x1) / 2), y0 - 4, x1 - 3, y0, LATON[1]); ps(ri((x0 + x1) / 2), y0 - 5, LATON[3]);
}
// calendario de pared con el mes (grande) y el año (pequeño) en cifras; u 0–1 levanta la hoja de delante
function calendario(x, y, mes, anyo, u = 0, o = {}) {
  const w = o.w ?? 22, hgt = o.h ?? 26;
  relleno(x, y, x + w, y + hgt, PAPEL, (xx, yy) => 4.2 + (h2(xx, yy, 8) - 0.5) * 0.5 - (yy - y) / hgt * 0.4);
  marco(x, y, x + w, y + hgt, PAPEL[0]);
  caja(x + 1, y + 1, x + w - 1, y + 6, (xx, yy) => R.pset(xx, yy, yy === y + 6 ? hex('#7a1e1a') : ROJO));
  for (let k = 0; k < 4; k++) { ps(x + 4 + k * 5, y - 1, LATON[3]); ps(x + 4 + k * 5, y, K); }
  R.numero(String(anyo), x + w / 2 + 1, y + 6, { tam: 8, centro: true, color: hex('#fff0d0'), sombra: false, fina: true });
  R.numero(String(mes), x + w / 2 + 1, y + 18, { tam: 8, centro: true, color: TINTA, sombra: false });
  // la rejilla de los días
  for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) ps(x + 3 + i * 3, y + 21 + j * 2, PAPEL[1]);
  if (u > 0) { const yy = y + 7 - u * 30, ang = u * 1.2; R.poligono([[x + 1, yy], [x + w - 1 + ang * 6, yy - ang * 4], [x + w - 1 + ang * 10, yy + 18 - ang * 6], [x + 1 + ang * 4, yy + 18]], PAPEL[4]); }
}

// un sillón de orejas tapizado (x: borde izquierdo, suelo: las patas), de 40 × 46
function sillon(x, suelo) {
  const S = (i, j) => { // la silueta: respaldo alto con orejas, brazos enrollados, asiento y faldón
    if (j < 30 && i >= 6 && i <= 33) return j < 3 ? (i > 9 && i < 30) : true;
    if (j < 22 && (i < 6 || i > 33)) return j > 8 && (i >= 2 && i <= 37);
    if (j >= 22 && j < 40) return i >= 0 && i <= 39; return false; };
  for (let j = 0; j < 40; j++) for (let i = 0; i < 40; i++) { if (!S(i, j)) continue; const X = x + i, Y = suelo - 46 + j;
    let v = 2.6 + Math.sin(i * 0.9) * 0.25 + (h2(X, Y, 4) - 0.5) * 0.4; if (!S(i - 1, j) || !S(i, j - 1)) v = 4.2; if (!S(i + 1, j) || !S(i, j + 1)) v = 0.6;
    if (j >= 22 && j < 26 && i > 3 && i < 36) v = 3.6; if (j === 30 && i > 2 && i < 37) v = 1.2; if ((j > 31) && (i % 5 === 0)) v -= 0.8;
    R.pset(X, Y, rmp(BURDEOS, v, X, Y)); }
  for (const px of [x + 3, x + 36]) { lin(px, suelo - 6, px, suelo, NOGAL[1]); ps(px, suelo, NOGAL[3]); }
  for (let i = -2; i < 42; i++) sombrea(x + i, suelo + 1, 0.4);
}

// ── PIEZAS DE INSERTO (de cerca) ──
// el canto y el tablero de una mesa de cerca: tablas en perspectiva hacia el fondo, veta, nudos, arañazos
function mesaCerca(y0, y1, M, o = {}) {
  caja(0, y0, 319, y1, (x, y) => { const g = (y - y0) / (y1 - y0), cx = 160 + (x - 160) / (0.55 + g * 0.45), tab = Math.floor((cx + 400) / 46), u = ((cx + 400) % 46 + 46) % 46;
    let v = 2.2 + g * 1.6 + (h2(tab, 2, 9) - 0.5) * 0.8 + Math.sin(cx * 0.05 + y * 0.9 + tab) * 0.35 + (h2(ri(cx) >> 1, y, 3) - 0.5) * 0.35;
    if (u < 1.2) v = 0.7; if (h2(ri(cx / 3), y >> 1, 12) > 0.985) v -= 1.2;
    R.pset(x, y, rmp(M, v, x, y)); });
  if (o.canto !== false) { const yc = y1 + 1; caja(0, yc, 319, Math.min(179, yc + (o.canto ?? 8)), (x, y) => R.pset(x, y, rmp(M, y === yc ? 4.6 : y === yc + 1 ? 3.4 : 1.6 + (h2(x >> 2, y, 5) - 0.5) * 0.6, x, y))); }
}
// una hoja de papel con renglones de rayitas (o.n renglones; o.ver 0–1 los que se ven), doblada en tres
function hojaPapel(x0, y0, x1, y1, o = {}) {
  relleno(x0, y0, x1, y1, PAPEL, (x, y) => 4.3 + (h2(x >> 1, y >> 1, 21) - 0.5) * 0.4 + (Math.abs(y - (y0 + (y1 - y0) / 3)) < 1 || Math.abs(y - (y0 + 2 * (y1 - y0) / 3)) < 1 ? -0.9 : 0));
  marco(x0, y0, x1, y1, PAPEL[1]);
  for (let x = x0 + 2; x <= x1 + 2; x++) sombrea(x, y1 + 1, 0.4); for (let y = y0 + 2; y <= y1 + 1; y++) sombrea(x1 + 1, y, 0.4);
  const n = o.n ?? 8, ver = o.ver ?? 1, paso = (y1 - y0 - 8) / n;
  for (let k = 0; k < n; k++) { const yy = ri(y0 + 5 + k * paso), largo = (x1 - x0 - 8) * (k === n - 1 ? 0.5 : 0.85 + h2(k, 1, o.k ?? 5) * 0.15) * cl(ver * n - k);
    for (let x = x0 + 4; x < x0 + 4 + largo; x++) if (h2(x, yy, o.k ?? 5) > 0.22 && (x - x0) % 7 !== 0) ps(x, yy + (h2(x >> 2, k, 2) > 0.8 ? -1 : 0), TINTA); }
}
// tintero con su pluma
function tintero(x, y) {
  caja(x - 4, y - 6, x + 4, y, (xx, yy) => R.pset(xx, yy, rmp(HIERRO, 2 + (xx < x ? 0.8 : -0.6) + (yy === y - 6 ? 1.5 : 0), xx, yy)));
  lin(x - 2, y - 7, x + 2, y - 7, K); lin(x + 1, y - 8, x + 9, y - 22, BLANCO[4]); lin(x + 2, y - 8, x + 10, y - 21, BLANCO[2]); lin(x + 6, y - 15, x + 11, y - 24, BLANCO[5]);
  for (let i = -4; i <= 5; i++) sombrea(x + i, y + 1, 0.4);
}
'''

PROPIO = r'''
const pop = (t, a, d = 0.3) => { const u = cl((t - a) / d); return u <= 0 ? 0 : u < 1 ? 1 - Math.pow(1 - u, 3) * Math.cos(u * 7) : 1; };
const tri = (u) => (u < 0.5 ? u * 2 : 2 - u * 2);
const VERDE = pal(['#10201a', '#18302a', '#204036', '#2c5244', '#3a6452', '#4a7862']);
const ORO = pal(['#6a4a10', '#a07818', '#d0a830', '#f0d060', '#fff4b0']);
const GRISC = hex('#8a8a96'), GRISO = hex('#4a4a56'), AZULU = hex('#3a4a8a'), AZULL = hex('#6a7ac0');
const MANGA_M = '#e6e0d2', MANGA_A = '#5a5a62';     // la camisa de Morriss y la levita gris del amigo (para T.brazo)
// un corazón de 7 × 6 (s escala) con su contorno
function corazon(x, y, s = 1) {
  const F = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'];
  for (let j = -1; j <= 6; j++) for (let i = -1; i <= 7; i++) { const on = (a, b) => F[b]?.[a] === '#';
    const v = on(i, j) ? (j === 0 || (j === 1 && i < 3) ? ROJOL : ROJO) : (on(i - 1, j) || on(i + 1, j) || on(i, j - 1) || on(i, j + 1)) ? K : 0;
    if (v) R.rect(ri(x + i * s), ri(y + j * s), ri(x + i * s + s - 1), ri(y + j * s + s - 1), v); }
}
// la carta doblada con su lacre, en una mano (centro x, y)
function cartita(x, y) {
  relleno(x - 5, y - 4, x + 5, y + 3, PAPEL, (xx, yy) => 4.3 + (yy === y - 4 ? 0.8 : 0) - (xx > x + 2 ? 0.6 : 0));
  marco(x - 6, y - 5, x + 6, y + 4, K);
  for (let k = 0; k < 3; k++) lin(x - 4, y - 2 + k * 2, x + 2 - (k === 2 ? 3 : 0), y - 2 + k * 2, PAPEL[1]);
  ps(x + 3, y + 1, ROJO); ps(x + 4, y + 1, hex('#7a1a14')); ps(x + 3, y + 2, hex('#7a1a14'));
}
// estrellas que titilan en un recuadro
function estrellas(x0, y0, x1, y1, t, n, k0 = 0) {
  for (let k = 0; k < n; k++) { const x = x0 + h2(k, 1, 90 + k0) * (x1 - x0), y = y0 + h2(k, 2, 90 + k0) * (y1 - y0);
    if (tranq(ri(x), ri(y))) continue; const b = Math.sin(t * (1.5 + h2(k, 3, 90)) + k) > 0.2; ps(x, y, b ? NIEVE[5] : NIEVE[1]); if (b && k % 7 === 0) { ps(x + 1, y, NIEVE[2]); ps(x - 1, y, NIEVE[2]); } }
}
// polilla que ronda una luz
function polilla(cx, cy, t, r = 10, k = 0) { const a = t * 3.1 + k, x = cx + Math.cos(a) * r + Math.sin(t * 7 + k) * 2, y = cy + Math.sin(a * 1.3) * r * 0.6;
  const al = Math.sin(t * 30 + k) > 0; ps(x, y, hex('#d8ccb0')); ps(x - 1, y - (al ? 1 : 0), hex('#b0a488')); ps(x + 1, y - (al ? 1 : 0), hex('#b0a488')); }
// una bocanada de humo que sube y se deshace (u 0–1 de su vida)
function bocanada(x, y, u, r = 4, c = PIEDRA[5]) { if (u <= 0 || u >= 1) return; const rr = r * (0.6 + u); caja(x - rr, y - rr, x + rr, y + rr, (xx, yy) => { const d = Math.hypot(xx - x, yy - y) / rr; if (d < 1 && b4(xx, yy) < (1 - u) * (1 - d * 0.6)) aclara(xx, yy, c, 0.7); }); }
// tablas de madera vistas desde arriba (escritorio, mesa): vetas, juntas escalonadas, nudos y arañazos
function tablas(x0, y0, x1, y1, M, alto = 22, k0 = 0) {
  caja(x0, y0, x1, y1, (x, y) => { const f = Math.floor((y - y0) / alto), j = (y - y0) % alto, L = 70 + (f * 29) % 50, off = (f * 53 + k0) % L, seg = Math.floor((x + off) / L);
    let v = 2.6 + (h2(f, seg, 11 + k0) - 0.5) * 0.9 + Math.sin(x * 0.07 + Math.sin(x * 0.013 + f) * 3 + j * 0.5 + f) * 0.35 + (h2(x >> 1, y, 3 + k0) - 0.5) * 0.3;
    if (j === 0) v = 0.6; else if (j === 1) v += 0.7; if ((x + off) % L === 0) v = 0.7;
    const nx = (x + off) % L - L * 0.6, ny = j - alto / 2; if (h2(seg, f, 13 + k0) > 0.6 && nx * nx / 6 + ny * ny < 3) v = 1.0 + (nx * nx / 6 + ny * ny) * 0.3;
    if (h2(ri(x / 4), y, 17 + k0) > 0.992) v -= 1.1;
    R.pset(x, y, rmp(M, v, x, y)); });
}
// ladrillo con su llaga de mortero, ladrillos sueltos más oscuros y alguno desconchado
function ladrillos(x0, y0, x1, y1, o = {}) {
  const MO = o.mortero ?? PIEDRA;
  caja(x0, y0, x1, y1, (x, y) => { const f = Math.floor((y - y0) / 5), j = (y - y0) % 5, off = f % 2 ? 6 : 0, i = (x - x0 + off) % 12, n = Math.floor((x - x0 + off) / 12);
    if (j === 4 || i === 11) { R.pset(x, y, rmp(MO, 1.6 + (h2(x, y, 5) - 0.5) * 0.6 - (o.noche ? 1 : 0), x, y)); return; }
    let v = 2.8 + (h2(n, f, 7) - 0.5) * 1.6 + (h2(x, y, 8) - 0.5) * 0.5 + (j === 0 ? 0.5 : 0) - (o.noche ? 1.6 : 0);
    if (h2(n, f, 9) > 0.93 && h2(x >> 1, y, 2) > 0.4) v = 4.6 - (o.noche ? 1.8 : 0);
    R.pset(x, y, rmp(LADR, v, x, y)); });
}
// yeso viejo: tono que no es parejo, manchas de humedad y grietas
function yeso(x0, y0, x1, y1, M = YESO, base = 3.2, k0 = 0) {
  caja(x0, y0, x1, y1, (x, y) => { let v = base + (h2(x >> 3, y >> 3, 31 + k0) - 0.5) * 0.7 + (h2(x >> 1, y >> 1, 32 + k0) - 0.5) * 0.35;
    const m = Math.hypot((x - x0 - (x1 - x0) * 0.7) / 30, (y - y1 + 10) / 18); if (m < 1) v -= (1 - m) * 0.9;
    if (tranq(x, y)) v = base + (h2(x >> 3, y >> 3, 31) - 0.5) * 0.3;
    R.pset(x, y, rmp(M, v, x, y)); });
  for (let k = 0; k < 3; k++) { let x = x0 + 20 + h2(k, 1, 33 + k0) * (x1 - x0 - 40), y = y0 + 8 + h2(k, 2, 33 + k0) * (y1 - y0 - 30);
    if (tranq(ri(x), ri(y))) continue;
    for (let s = 0; s < 14; s++) { const nx = x + (h2(k, s, 34) - 0.5) * 3, ny = y + 1.5; lin(x, y, nx, ny, M[1]); x = nx; y = ny; } }
}
// la viñeta dorada que sale encima de una hoja: una tarjeta de papel con un dibujo a tinta y su halo (a 0–1: aparece)
function vineta(cx, cy, w, h, a, t, dib) {
  if (a <= 0) return; const s = Math.min(1, a), x0 = ri(cx - w / 2), y0 = ri(cy - h / 2 + (1 - s) * 8), x1 = x0 + w, y1 = y0 + h;
  R.halo(ri(cx), ri(cy), ri(w * 0.75), [ORO[2], ORO[3]], 0.5 * s);
  relleno(x0, y0, x1, y1, PAPEL, (x, y) => 4.4 + (h2(x >> 1, y >> 1, 41) - 0.5) * 0.5 - (y > y1 - 3 ? 0.8 : 0));
  marco(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K);
  for (let i = x0; i <= x1; i += 2) { ps(i, y0 + 1, ORO[2]); ps(i, y1 - 1, ORO[2]); } for (let j = y0; j <= y1; j += 2) { ps(x0 + 1, j, ORO[2]); ps(x1 - 1, j, ORO[2]); }
  for (let x = x0 + 1; x <= x1 + 2; x++) sombrea(x, y1 + 2, 0.4);
  if (a >= 0.35) dib(ri(cx), ri(cy + (1 - s) * 8), cl((a - 0.35) / 0.65));
  // un brillo que corre por el canto
  const b = ((t * 0.6) % 1.6); if (b < 1) { const bx = ri(x0 + b * w); ps(bx, y0 - 1, ORO[4]); ps(bx + 1, y0 - 1, ORO[3]); }
}
// los dibujos de las tres hojas (a 0–1: se van dibujando)
function dibMapa(cx, cy, a, t) {
  const T2 = TINTA;
  // colinas (los picos de Otter), el río, árboles y el camino punteado hasta la X roja
  for (let x = -20; x <= 20; x++) { const y = -2 - Math.max(0, 8 - Math.abs(x + 8) * 1.1) - Math.max(0, 6 - Math.abs(x - 6) * 0.9); if ((x + 20) / 40 < a * 1.4) ps(cx + x, cy + y, T2); }
  if (a > 0.3) for (let x = -20; x <= 20; x++) ps(cx + x, cy + 6 + Math.round(Math.sin(x * 0.4) * 1.2), hex('#3a6a9a'));
  if (a > 0.45) for (const [dx, dy] of [[-16, 2], [-12, 3], [12, 1], [16, 2], [3, 3]]) { ps(cx + dx, cy + dy - 2, hex('#2e5a30')); lin(cx + dx - 1, cy + dy - 1, cx + dx + 1, cy + dy - 1, hex('#2e5a30')); lin(cx + dx - 2, cy + dy, cx + dx + 2, cy + dy, hex('#2e5a30')); ps(cx + dx, cy + dy + 1, NOGAL[3]); }
  if (a > 0.6) for (let k = 0; k < 9; k++) { const u = k / 8; if (k % 2 === 0) ps(cx - 18 + u * 24, cy + 11 - u * 3 - Math.sin(u * 3) * 2, T2); }
  if (a > 0.8) { const x = cx + 8, y = cy + 9, p = parp(t, 6); lin(x - 2, y - 2, x + 2, y + 2, p ? ROJO : ROJOL); lin(x - 2, y + 2, x + 2, y - 2, p ? ROJO : ROJOL); lin(x - 1, y - 2, x + 3, y + 2, ROJO); }
}
function dibOlla(cx, cy, a, t) {
  if (a <= 0) return; const y = cy + 9;
  // la olla de hierro con sus asas y su sombra
  caja(cx - 11, y - 10, cx + 11, y, (x, yy) => { const d = Math.hypot((x - cx) / 11, (yy - y + 10) / 10.5); if (d < 1 && yy >= y - 10) R.pset(x, yy, rmp(HIERRO, 2.6 - (x - cx) / 6 + (h2(x, yy, 4) - 0.5) * 0.5 - d * 0.6, x, yy)); });
  lin(cx - 12, y - 10, cx + 12, y - 10, K); lin(cx - 11, y - 9, cx + 11, y - 9, HIERRO[3]); ps(cx - 13, y - 7, K); ps(cx + 13, y - 7, K); ps(cx - 13, y - 6, K); ps(cx + 13, y - 6, K);
  // el oro que sale por encima: monedas y lingotes que se amontonan (a)
  const n = Math.floor(a * 16);
  for (let k = 0; k < n; k++) { const dx = ri((h2(k, 1, 51) - 0.5) * 20 * (1 - k / 22)), dy = ri(-11 - (k / 16) * 7 - h2(k, 2, 51) * 2);
    if (k % 5 === 4) { R.rect(cx + dx - 3, y + dy - 1, cx + dx + 3, y + dy + 1, ORO[1]); lin(cx + dx - 2, y + dy - 1, cx + dx + 2, y + dy - 1, ORO[3]); }
    else { ps(cx + dx, y + dy, ORO[3]); ps(cx + dx + 1, y + dy, ORO[2]); ps(cx + dx, y + dy + 1, ORO[1]); ps(cx + dx + 1, y + dy + 1, ORO[1]); } }
  if (a > 0.9) for (let k = 0; k < 3; k++) { const ph = (t * 1.7 + k * 0.33) % 1; if (ph < 0.4) { const sx = cx - 8 + k * 8, sy = y - 16 - k * 2; ps(sx, sy, ORO[4]); ps(sx - 1, sy, ORO[3]); ps(sx + 1, sy, ORO[3]); ps(sx, sy - 1, ORO[3]); ps(sx, sy + 1, ORO[3]); } }
}
// treinta siluetas en tres filas de diez (n las que se ven) y, debajo, las familias (f las que se ven)
function dibSiluetas(cx, cy, n, f = 0) {
  for (let k = 0; k < n; k++) { const fi = Math.floor(k / 10), co = k % 10, x = cx - 20 + co * 4 + (fi % 2), y = cy - 12 + fi * 7;
    ps(x, y, TINTA); ps(x + 1, y, TINTA); ps(x, y + 1, TINTA); ps(x + 1, y + 1, TINTA); lin(x - 1, y + 2, x + 2, y + 2, TINTA); ps(x, y + 3, TINTA); ps(x + 1, y + 3, TINTA); ps(x - 1, y - 1, NOGAL[2]); lin(x - 1, y - 1, x + 2, y - 1, NOGAL[1]); }
  for (let k = 0; k < f; k++) { const x = cx - 21 + k * 3.6, y = cy + 10, chico = k % 3 === 2; const c = hex('#7a3a3a');
    if (chico) { ps(x, y + 1, c); ps(x, y + 2, c); ps(x - 1, y + 3, c); ps(x + 1, y + 3, c); } else { ps(x, y, c); ps(x, y + 1, c); lin(x - 1, y + 2, x + 1, y + 2, c); lin(x - 1, y + 3, x + 1, y + 3, c); } }
}
// la silueta del amigo sin nombre (sombrero de copa y levita) con la «?» en la cara
function siluetaAmigo(cx, cy, a) {
  if (a <= 0) return; const c = hex('#2a2430');
  R.rect(cx - 4, cy - 15, cx + 4, cy - 14, c); R.rect(cx - 3, cy - 21, cx + 3, cy - 15, c);   // el sombrero
  R.disco(cx, cy - 10, 4, c); R.rect(cx - 6, cy - 6, cx + 6, cy + 8, c); R.rect(cx - 7, cy - 3, cx - 5, cy + 5, c); R.rect(cx + 5, cy - 3, cx + 7, cy + 5, c);
  R.rect(cx - 4, cy + 8, cx - 1, cy + 12, c); R.rect(cx + 1, cy + 8, cx + 4, cy + 12, c);
  if (a > 0.5) R.icono('?', cx - 2, cy - 13, ORO[3], K);
}
// banderitas de batalla (sin armas): la azul y la gris cruzadas en sus astas, con humo que sube
function banderas(x, y, a, t, k, humo = true) {
  if (a <= 0) return; const s = Math.min(1, a), al = ri(9 * s);
  lin(x - 3, y, x + 1, y - al, NOGAL[1]); lin(x + 3, y, x - 1, y - al, NOGAL[1]);
  const ond = Math.sin(t * 6 + k) > 0 ? 1 : 0;
  if (s > 0.6) { R.rect(x - 6, y - al, x, y - al + 3 + ond, AZULU); ps(x - 6, y - al, AZULL); R.rect(x, y - al + ond, x + 6, y - al + 3, GRISO); ps(x + 6, y - al, GRISC); }
  if (humo) for (let q = 0; q < 3; q++) { const u = ((t * 0.5 + q / 3 + k * 0.17) % 1); bocanada(x + (q - 1) * 3 + u * 4, y - 4 - u * 12, u, 2.4, PIEDRA[6]); }
  ps(x, y + 1, K); ps(x - 1, y + 1, K); ps(x + 1, y + 1, K);
}
// el fogonazo de una batalla en el mapa (sin armas): una estrella roja y amarilla que late y su humo
function fogonazo(x, y, a, t, k) {
  for (let q = 0; q < 3; q++) { const u = ((t * 0.45 + q / 3 + k * 0.17) % 1); bocanada(x + (q - 1) * 4 + u * 6, y - 4 - u * 18, u, 3.5, PIEDRA[6]); }
  const r = ri((3 + Math.sin(t * 9 + k) * 0.8) * Math.min(1, a) + (a > 1 ? 0 : 0));
  for (let i = 0; i < 8; i++) { const ang = i / 8 * 6.283 + k, L = i % 2 ? r : r + 3; lin(x, y, ri(x + Math.cos(ang) * L), ri(y + Math.sin(ang) * L), i % 2 ? ORO[3] : ROJOL); }
  R.disco(x, y, 2, ORO[4]); ps(x, y, 0xffffffff); ps(x - 1, y + 5, K); ps(x, y + 5, K); ps(x + 1, y + 5, K);
}
// la cuenta de cifras que salen de la caja (las primeras de la hoja 1)
const CIFRAS = ['71', '194', '38', '1701', '89', '76'];
'''

# ── LO DEL GRUPO S5: piezas pequeñas de las dos escenas ──
MIO = r'''
const EB = T.BL, MARCA = 0x01020304 >>> 0;
const MANGA_AMIGO = '#5a5a62', MANGA_IMPR = '#d8d0c0', MANGA_VIEJO = '#4a4a54';
const CIFRAS2 = ['115', '73', '24', '807', '37', '52', '49', '17', '31', '62', '647', '22', '7', '15', '140', '47', '29', '107', '79', '84'];
// cifras de 3 × 5 (s escala) en el color c
const DG = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001010010010', 8: '111101111101111', 9: '111101111001111' };
function dig(txt, x, y, c, s = 1, sombra = null) { txt = String(txt); let X = ri(x);
  for (const ch of txt) { const g = DG[ch]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') { if (sombra != null) R.rect(X + i * s + 1, ri(y) + j * s + 1, X + i * s + s, ri(y) + j * s + s, sombra); R.rect(X + i * s, ri(y) + j * s, X + i * s + s - 1, ri(y) + j * s + s - 1, c); } X += 4 * s; }
  return X; }
const anchoDig = (txt, s = 1) => String(txt).length * 4 * s - s;
// ruido suave (interpolado) de celda s
function vn(x, y, s, k) { const gx = Math.floor(x / s), gy = Math.floor(y / s), fx = ease(x / s - gx), fy = ease(y / s - gy);
  return lerp(lerp(h2(gx, gy, k), h2(gx + 1, gy, k), fx), lerp(h2(gx, gy + 1, k), h2(gx + 1, gy + 1, k), fx), fy); }
// un punto de luz dorado (a 0–1 su fuerza; g 2 con halo)
function chispa(x, y, a, g = 1) { if (a <= 0.02) return; x = ri(x); y = ri(y);
  if (g >= 2) for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) { const d = Math.abs(i) + Math.abs(j); if (d <= 3 && b4(x + i, y + j) < a * (1 - d / 4)) aclara(x + i, y + j, DORADO, 0.6); }
  ps(x, y, a > 0.5 ? DORL : DORADO); if (g >= 2 && a > 0.4) { ps(x + 1, y, DORADO); ps(x, y + 1, ORO[2]); ps(x + 1, y + 1, ORO[2]); } }
// cuadraditos de luz que nacen en una franja entre t0 y t1 y suben (n: cuántos; alto: cuánto suben)
function chorro(t, t0, t1, x0, x1, y0, n, alto = 80, k0 = 0) {
  for (let k = 0; k < n; k++) { const nac = t0 + (t1 - t0) * h2(k, 1, 51 + k0), vida = 1.4 + h2(k, 2, 51 + k0), u = (t - nac) / vida; if (u <= 0 || u >= 1) continue;
    const x = x0 + (x1 - x0) * h2(k, 3, 51 + k0) + Math.sin(u * 6 + k) * 4, y = y0 - u * alto * (0.7 + h2(k, 4, 51 + k0) * 0.5);
    if (tranq(ri(x), ri(y))) continue; chispa(x, y, 1 - u * u, h2(k, 5, 51 + k0) > 0.55 ? 2 : 1); } }
// motas de polvo que brillan en un rayo de luz
function motasLuz(t, x0, y0, x1, y1, n, c = VELAL, k0 = 0) { for (let k = 0; k < n; k++) { const x = x0 + ((h2(k, 1, 71 + k0) * (x1 - x0) + t * (3 + h2(k, 2, 71 + k0) * 4)) % (x1 - x0)), y = y0 + ((h2(k, 3, 71 + k0) * (y1 - y0) + Math.sin(t * 0.8 + k) * 6 + t * 2) % (y1 - y0)); if (Math.sin(t * 3 + k * 1.7) > -0.2 && !tranq(ri(x), ri(y))) aclara(x, y, c, 0.55); } }
// pájaros en V que cruzan (k0 su semilla)
function pajaros(t, n, y0, vel = 18, k0 = 0, c = hex('#3a3040')) { for (let k = 0; k < n; k++) { const x = ((h2(k, 1, 81 + k0) * 360 + t * vel * (0.8 + h2(k, 2, 81 + k0) * 0.4)) % 380) - 30, y = y0 + h2(k, 3, 81 + k0) * 26 + Math.sin(t * 1.3 + k) * 2, a = Math.sin(t * 9 + k * 2) > 0 ? 1 : 0;
  if (tranq(ri(x), ri(y)) || tranq(ri(x) + 3, ri(y))) continue; ps(x - 2, y - a, c); ps(x - 1, y - 1 + a * 0, c); ps(x, y, c); ps(x + 1, y - 1, c); ps(x + 2, y - a, c); } }
// la sombra de un personaje (o lo que pinte f en la esquina 0,0) proyectada a escala s en la pared, con fuerza a
function sombraDe(f, w, h, X, Y, s, a) { const B = R.buf, copia = B.slice(); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) B[y * 320 + x] = MARCA;
  f(); const px = []; for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (B[y * 320 + x] !== MARCA) px.push([x, y]); B.set(copia);
  for (const [x, y] of px) caja(X + x * s, Y + y * s, X + x * s + s - 1, Y + y * s + s - 1, (xx, yy) => { if (!tranq(xx, yy)) sombrea(xx, yy, a); }); }
// una vela grande de cerca: palmatoria de latón con su base en (x, y), cuerpo de alto h (se consume), goterones y la llama
function velaGrande(x, y, h, t, o = {}) {
  const w = o.w ?? 8, f = Math.sin(t * 13 + x) * 0.5 + Math.sin(t * 7.3) * 0.5, chis = o.chisporrotea ? (Math.sin(t * 31) > 0.3 ? 1 : 0) : 0;
  // el plato y el asa de la palmatoria
  caja(x - 16, y - 3, x + 16, y + 2, (xx, yy) => { const d = Math.abs(xx - x) / 16; if (d > 1 - (yy - y + 3) * 0.04 + 0.05) return; R.pset(xx, yy, rmp(LATON, yy === y - 3 ? 4 : yy === y + 2 ? 0.5 : 2.4 - d * 1.4 + (xx < x ? 0.6 : 0), xx, yy)); });
  for (let i = -15; i <= 17; i++) sombrea(x + i, y + 3, 0.35);
  for (let a = -1; a <= 1; a += 0.08) { const xx = x + 18 + Math.cos(a * 1.6) * 4, yy = y - 4 + Math.sin(a * 1.6) * 4; ps(xx, yy, LATON[2]); ps(xx + 1, yy, LATON[1]); }
  caja(x - w / 2 - 2, y - 7, x + w / 2 + 2, y - 3, (xx, yy) => R.pset(xx, yy, rmp(LATON, yy === y - 7 ? 3.8 : 2 + (xx < x ? 0.8 : -0.4), xx, yy)));
  // el cuerpo de cera, con su luz de lado y los goterones
  const top = ri(y - 7 - h);
  if (h > 0) caja(x - w / 2, top, x + w / 2 - 1, y - 8, (xx, yy) => { const u = (xx - (x - w / 2)) / w; R.pset(xx, yy, rmp(BLANCO, 4.4 - Math.abs(u - 0.35) * 3 + (yy === top ? 0.8 : 0), xx, yy)); });
  for (let k = 0; k < 3; k++) { const gx = ri(x - w / 2 + 1 + k * 3), gl = 3 + ri(h2(k, 1, 7) * Math.min(14, h * 0.6)); if (h < 2) break; for (let j = 0; j < gl; j++) ps(gx, top + j, BLANCO[5]); ps(gx, top + gl, BLANCO[3]); }
  if (h <= 0) { caja(x - 5, y - 9, x + 5, y - 7, (xx, yy) => R.pset(xx, yy, BLANCO[3])); }
  // la mecha y la llama
  const fy = top - 2; ps(x, top - 1, K);
  if (o.apagada) return { llama: [x, fy] };
  const alto = (o.llama ?? 1) * (5 + f * 1.5) - chis * 2, fx = x + (f > 0.6 ? 1 : f < -0.6 ? -1 : 0) * (o.chisporrotea ? 1 : 0);
  if (o.luz !== false) luz(fx, fy - 3, o.r ?? 60, VELA, (o.a ?? 0.5) * (0.85 + f * 0.1) * (o.llama ?? 1));
  for (let j = 0; j < alto; j++) { const ww = j < alto * 0.45 ? 2 : j < alto * 0.75 ? 1 : 0; for (let i = -ww; i <= ww; i++) ps(fx + i + (j > alto * 0.6 ? (f > 0 ? 1 : 0) : 0), fy - j, j < 2 ? (Math.abs(i) < 1 ? hex('#6a8ae8') : CALIDA) : Math.abs(i) === ww && ww > 0 ? CALIDA : j > alto * 0.7 ? VELA : VELAL); }
  return { llama: [fx, fy - 3] };
}
// una olla de hierro de cerca (cx su centro, base y; w ancho, h alto) con lo que lleva dentro: lleno 0–1 y tipo
function ollaHierro(cx, base, w, h, t) {
  const y0 = base - h, rx = w / 2;
  caja(cx - rx - 2, y0, cx + rx + 2, base, (x, y) => { const v = (y - y0) / h, ancho = rx * (0.82 + Math.sin(v * Math.PI * 0.9 + 0.2) * 0.2); if (Math.abs(x - cx) > ancho) return;
    const u = (x - cx) / ancho; R.pset(x, y, rmp(HIERRO, 1.4 - u * 1.2 + (u < -0.4 && u > -0.7 ? 1.6 : 0) + (h2(x, y, 41) - 0.5) * 0.5 + (Math.abs(v - 0.3) < 0.03 ? -0.8 : 0), x, y)); });
  // el borde y las asas
  caja(cx - rx - 2, y0 - 2, cx + rx + 2, y0 + 1, (x, y) => R.pset(x, y, rmp(HIERRO, y === y0 - 2 ? 4 : y === y0 + 1 ? 0.2 : 2.6 - (x - cx) / rx, x, y)));
  for (const s of [-1, 1]) { const ax = cx + s * (rx + 2); for (let a = 0; a <= Math.PI; a += 0.15) { ps(ax + s * Math.sin(a) * 4, y0 + 2 + (1 - Math.cos(a)) * 3, HIERRO[3]); ps(ax + s * Math.sin(a) * 4, y0 + 3 + (1 - Math.cos(a)) * 3, HIERRO[0]); } }
  // las patas cortas y la sombra
  for (const s of [-0.6, 0, 0.6]) R.rect(ri(cx + s * rx) - 1, base, ri(cx + s * rx) + 1, base + 2, HIERRO[0]);
  for (let i = -rx - 4; i <= rx + 6; i++) for (let j = 3; j <= 5; j++) if (b4(cx + i, base + j) < 0.6) sombrea(cx + i, base + j, 0.4);
  return { boca: [cx, y0], rx };
}
// lo que hay dentro de una olla (tipo 'oro' | 'plata' | 'joyas'), con el montón que crece con u
function carga(cx, yBoca, rx, tipo, u, t, k0 = 0) {
  if (u <= 0) return; const alto = ri(u * 10), n = ri(u * 26);
  // el montón (una loma)
  for (let i = -rx + 2; i <= rx - 2; i++) { const hh = ri(alto * (1 - (i / rx) ** 2)); for (let j = 0; j <= hh; j++) { const x = cx + i, y = yBoca - j;
    const c = tipo === 'oro' ? rmp(ORO, 2.2 + (h2(x, y, 3 + k0) - 0.3) * 2 + (j === hh ? 1 : 0), x, y) : tipo === 'plata' ? rmp(BLANCO, 2 + (h2(x >> 1, y, 4 + k0) - 0.4) * 2.4 + (j === hh ? 1.2 : 0), x, y) : rmp(pal(['#3a1030', '#6a1a4a', '#2a4a8a', '#1a7a4a', '#c8203a', '#e8e0ff']), h2(x >> 1, y >> 1, 5 + k0) * 5.5, x, y);
    ps(x, y, c); } }
  // piezas sueltas encima (monedas, lingotes, gemas) que brillan
  for (let k = 0; k < n; k++) { const x = cx + (h2(k, 1, 9 + k0) - 0.5) * rx * 1.5, y = yBoca - 1 - h2(k, 2, 9 + k0) * alto * 0.9;
    if (tipo === 'oro') { R.disco(ri(x), ri(y), 2, ORO[1]); ps(x, y, ORO[3]); ps(x - 1, y - 1, ORO[4]); }
    else if (tipo === 'plata') { R.rect(ri(x) - 3, ri(y) - 1, ri(x) + 3, ri(y) + 1, BLANCO[2]); R.rect(ri(x) - 2, ri(y) - 1, ri(x) + 2, ri(y) - 1, BLANCO[5]); }
    else { const c = [hex('#e8203a'), hex('#2a8ae8'), hex('#2ac86a'), hex('#c84ae8')][k % 4]; ps(x, y - 1, c); ps(x - 1, y, c); ps(x + 1, y, c); ps(x, y + 1, c); ps(x, y, 0xffffffff); } }
  // destellos
  for (let k = 0; k < 3; k++) { const f = Math.sin(t * 4 + k * 2.1 + k0); if (f > 0.5) brillo(cx + (h2(k, 4, k0) - 0.5) * rx * 1.4, yBoca - alto * 0.6 - 2, t, (f - 0.5) * 0.7); }
}
// una pieza que cae (a una olla, a una mesa): dibuja su forma en (x, y)
function pieza(tipo, x, y) { if (tipo === 'oro') { R.disco(ri(x), ri(y), 2, ORO[1]); ps(x, y, ORO[4]); } else if (tipo === 'plata') { R.rect(ri(x) - 3, ri(y) - 1, ri(x) + 3, ri(y) + 1, BLANCO[2]); R.rect(ri(x) - 2, ri(y) - 1, ri(x) + 2, ri(y) - 1, BLANCO[5]); } else { const c = hex('#e8203a'); ps(x, y - 1, c); ps(x - 1, y, c); ps(x + 1, y, hex('#2a8ae8')); ps(x, y + 1, c); ps(x, y, 0xffffffff); } }
// un lingote de plata en perspectiva (para llevarlo en la mano o dejarlo en la mesa)
function lingote(x, y) { x = ri(x); y = ri(y); R.poligono([[x - 5, y + 1], [x + 5, y + 1], [x + 3, y - 2], [x - 3, y - 2]], BLANCO[2]); lin(x - 3, y - 2, x + 3, y - 2, BLANCO[5]); lin(x - 5, y + 1, x + 5, y + 1, BLANCO[0]); ps(x - 1, y - 1, 0xffffffff); }
// la bolsita de joyas (de cuero, atada, con una gema que asoma)
function bolsaJoyas(x, y, t) { x = ri(x); y = ri(y); R.disco(x, y, 4, hex('#5a3a20')); R.disco(x - 1, y - 1, 3, hex('#7a5030')); R.rect(x - 2, y - 6, x + 2, y - 4, hex('#5a3a20')); lin(x - 3, y - 4, x + 3, y - 4, hex('#c8a040')); ps(x + 1, y - 7, hex('#e8203a')); ps(x - 1, y - 7, hex('#2a8ae8')); if (Math.sin(t * 6) > 0.4) brillo(x + 2, y - 8, t, 0.4); }
// el folleto amarillo pequeño en una mano
const folletito = (m, t) => T.d_folleto(R, m[0] + 1, m[1] - 4, { escala: 0.5, t });
'''

CAB_MENSAJE = '''// BL-MENSAJE (frases 16–17), 1862 → 1821 (lo que cuenta la hoja) → 1862 → 1885. Catorce planos cortados en la voz inglesa:
// 1 · La hoja 2 de cerca a la vela (fondo local): el lápiz recorre los números y de cada uno sube un cuadradito de luz;
//   Atom, sobre la Declaración, señala en «second sheet». Corta en «I have».
// 2 · El bosque de Bedford (bedford·bosque, de día, en luz dorada de visión): Beale, un cazador y la mula llegan por el
//   sendero; el camino de luz de 4 millas y el «4» en «four»; Beale señala el sitio en «Buford's». Corta en «in an».
// 3 · El plano de luz (fondo local): sobre la hoja de números gigante y apagada, los cuadraditos dibujan el suelo, la
//   cámara de piedra piedra a piedra en «excavation or vault»; Atom baja la cinta y sale el «6» en «six feet». Corta en «followed».
// 4 · Dentro de la cámara (fondo local): tres ollas de hierro que se llenan: oro en «gold», plata en «silver», joyas en
//   «jewels»; Atom se asombra. Corta en «according».
// 5 · El mapa (St. Louis): la mula de luz llega por la ruta; chincheta en «St. Louis»; dos lingotes salen en «some of the
//   silver» y se vuelven una joya; Atom señala. Corta en «lighten».
// 6 · El muelle de St. Louis en 1821 (fondo local): Beale descarga los lingotes en «lighten the load», la balanza se
//   inclina en «valued» y sale «$13000» en «thirteen thousand»; se lleva la bolsita con la mula. Corta en «what that man».
// 7 · La vela y la sombra (fondo local): el amigo da un salto con los brazos arriba en «feels» y su sombra gigante en la
//   pared; el reloj gira, el cielo clarea y la vela se consume en «candle nearly burned down». Corta en «watching».
// 8 · La mesa de cerca (cuarto·mesa, letras): suben cifras de la hoja y se vuelven las formas de luz (bosque, cámara con
//   el 6, ollas); la vela casi gastada; el amigo emocionado; Atom aplaude en «decades». Corta en «But the joy».
// 9 · La pared de las hojas al alba (fondo local): el amigo prueba la Declaración en la hoja 1 («X» en «first») y en la 3
//   («X» en «third»); la 2 sigue encendida. Corta en «and the friend».
// 10 · La ventana de los años (fondo local): pasan las estaciones 1862 → 1882, crecen las pilas de papeles y los cabos
//   de vela, el amigo envejece en «twenty years». Corta en «until».
// 11 · La casa de empeños (fondo local): el amigo mayor deja el reloj y los candeleros en «comfortable», el prestamista le
//   da tres monedas en «reduced» («$3»); se va triste en «poverty». Corta en «dragging».
// 12 · El cuarto vacío de 1885 (cuarto·cuarto·vacio, familia): la mujer y el niño llegan a la puerta en «family»; él se
//   levanta en «In 1885». Corta en «broke».
// 13 · El manuscrito (fondo local, la mesa desnuda de día): la mano escribe y las páginas se apilan (1 → 23); Atom ata las
//   tres hojas con una cinta en «tell». Corta en «publish».
// 14 · El camino al atardecer (fondo local): el amigo alza el folleto en «three sheets»; pasan los buscadores con pala,
//   farol y mula hacia los picos en «others»; él se queda en «no longer can».'''

MENSAJE = r'''
// ── 1 · LA HOJA 2 DE CERCA A LA VELA ──
function p1Fondo() {
  papelPintado(0, 0, 319, 56, ROBLE, NOGAL, { flor: BURDEOS[2], centro: LATON[1] });
  for (let x = 0; x < 320; x++) { ps(x, 55, NOGAL[4]); ps(x, 56, NOGAL[0]); ps(x, 57, NOGAL[1]); }
  mesaCerca(58, 179, NOGAL, { canto: false });
  // la Declaración, desenrollada a la izquierda, con sus rodillos y sus renglones de rayitas
  hojaPapel(8, 80, 80, 150, { n: 16, k: 7 });
  for (const yy of [74, 152]) caja(6, yy, 82, yy + 6, (x, y) => R.pset(x, y, rmp(PAPEL, 1.6 + Math.sin((y - yy) / 6 * Math.PI) * 3 + (h2(x, y, 3) - 0.5) * 0.4, x, y)));
  for (let x = 8; x < 84; x++) sombrea(x, 159, 0.4);
  // gafas, plumas sueltas, un papel de cuentas con cifras y migas de lacre
  for (const gx of [226, 240]) { R.disco(gx, 128, 4, K); R.disco(gx, 128, 3, hex('#3a4458')); ps(gx - 1, 127, BLANCO[5]); } lin(230, 127, 236, 127, K); lin(244, 127, 254, 122, K);
  // la balda con libros, un cuadrito de los picos y el reloj de bolsillo colgado (la pared no se queda lisa)
  R.rect(186, 40, 272, 43, NOGAL[4]); lin(186, 44, 272, 44, NOGAL[0]); for (let x = 186; x <= 272; x++) sombrea(x, 45, 0.4);
  for (let k = 0; k < 14; k++) { const x = 190 + k * 6, hh = 12 + (k * 5) % 7; R.rect(x, 40 - hh, x + 4, 39, [BURDEOS[3], hex('#2a4a6a'), VERDE[3], NOGAL[3], hex('#6a5a2a')][k % 5]); lin(x, 40 - hh + 3, x + 4, 40 - hh + 3, LATON[2]); ps(x + 4, 40 - hh, K); }
  cuadro(100, 22, 140, 50, 'rio');
  for (let k = 0; k < 6; k++) { const x = 20 + k * 12; R.rect(x, 30, x + 8, 50, PAPEL[3]); for (let j = 33; j < 48; j += 3) lin(x + 2, j, x + 6, j, TINTA); R.disco(x + 4, 30, 1, LATON[3]); }
  tintero(268, 122);
  for (let k = 0; k < 5; k++) { const x = 100 + h2(k, 1, 4) * 200, y = 160 + h2(k, 2, 4) * 18; ps(x, y, ROJO); ps(x + 1, y, BURDEOS[2]); }
  // oscurece las esquinas (la luz es solo la de la vela)
  caja(0, 0, 319, 179, (x, y) => { const d = Math.hypot((x - 250) / 300, (y - 90) / 160); if (d > 0.45 && b4(x, y) < (d - 0.45) * 1.4) sombrea(x, y, 0.35); });
}
const p1 = (t) => {
  fijo('p1', p1Fondo);
  // la hoja 1 y la 3 (pequeñas) y la 2, grande en el centro, que se enciende
  T.d_hoja(R, 108, 160, { n: 1, escala: 2, t, oscura: 0.25 });
  T.d_hoja(R, 300, 70, { n: 3, escala: 1, t });
  const br = tramo(t, 0.3, W.LETTER + 0.2), H2 = T.d_hoja(R, 160, 100, { n: 2, escala: 3, t, brillo: 0.25 + br * 0.55 });
  const [x0, y0] = H2.primera;
  // el dedo de luz recorre los números, uno cada 0,42 s: el número se enciende y de él sube un cuadradito (la letra)
  const paso = 0.42, idx = Math.max(0, Math.floor((t - 0.5) / paso)), fr = cl(((t - 0.5) / paso) % 1);
  for (let k = 0; k <= Math.min(idx, 40); k++) { const tk = 0.5 + k * paso, u = (t - tk) / 1.8, f = Math.floor(k / 4), c = k % 4; if (u <= 0) continue;
    const sx = x0 + 4 + c * 15, sy = y0 + 2 + (f % 9) * 9; if (u < 0.25) { marco(sx - 3, sy - 2, sx + 10, sy + 6, u < 0.12 ? DORL : DORADO); }
    if (u < 1) chispa(sx + Math.sin(u * 7 + k) * 3, sy - u * 60, 1 - u, k % 3 ? 1 : 2); }
  chorro(t, W.MESSAGE, 5.4, 140, 196, 60, 26, 56, 3);
  // la vela grande a la derecha
  velaGrande(292, 150, 58 - t * 0.4, t, { r: 90, a: 0.42 });
  polilla(292, 70, t, 12, 1);
  // el papel de la cuenta, abajo: la mano del amigo apunta las letras (puntos de luz, nada legible), una por número
  hojaPapel(206, 150, 270, 186, { n: 0 });
  for (let k = 0; k <= Math.min(idx, 36); k++) { const xx = 212 + (k % 12) * 4.6, yy = 157 + Math.floor(k / 12) * 6; ps(xx, yy, ORO[1]); ps(xx + 1, yy, ORO[2]); ps(xx, yy - 1, k === idx ? DORL : ORO[3]); }
  const nx = 212 + (idx % 12) * 4.6 + ease(fr) * 3, ny = 157 + Math.floor(Math.min(idx, 36) / 12) * 6;
  T.brazo(R, 292, 214, nx + 12, ny + 7, MANGA_AMIGO, -1, { codo: [278, 196] });
  lin(nx + 4, ny + 5, nx - 1, ny - 1, hex('#c89030')); ps(nx - 2, ny - 2, K);
  // Atom, de pie sobre la Declaración, se asombra y señala la hoja en «second sheet»
  const se = t > W.SECOND - 0.15;
  AT.atom(R, 46, 146, t, { dir: 1, pose: se ? 'senala' : t > W.LETTER ? 'piensa' : 'quieto', cara: t > W.LETTER ? 'sorpresa' : 'normal' });
};

// ── 2 · EL BOSQUE DE BEDFORD, EN LA LUZ DORADA DE LO QUE CUENTA LA HOJA ──
const O2 = { encuadre: 'bosque' };
const p2 = (t) => {
  T.bedford(R, t, O2);
  // el camino de luz (4 millas desde lo de Buford) que se dibuja en «four», y el sitio que late
  const u = tramo(t, W.FOUR - 0.4, W.BUFORDS - 0.1), pts = [[18, 168], [60, 160], [104, 158], [142, 154], [178, 153]];
  const L = (s) => { let i = Math.min(pts.length - 2, Math.floor(s * (pts.length - 1))), f = s * (pts.length - 1) - i; return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; };
  for (let k = 0; k <= 40; k++) { const s = k / 40; if (s > u) break; const [x, y] = L(s); if (k % 2 === 0) chispa(x, y, 0.7 + 0.3 * Math.sin(t * 6 - k * 0.6), k % 4 ? 1 : 2); }
  // la partida: Beale delante, un cazador y la mula de carga detrás
  const a = tramo(t, W.P2 + 0.1, W.BUFORDS - 0.2), bx = lerp(-16, 140, ease(a)), anda = a > 0 && a < 1;
  T.b_mula(R, ri(bx - 78), 150, t, { dir: 1, anda, color: 'pardo' });
  R.actor(EB.cazadorBL, ri(bx - 44), 150, t, { dir: 1, anda, sonrisa: !anda, habla: !anda && Math.sin(t * 7) > 0.3 });
  const se = t > W.BUFORDS;
  R.actor(EB.bealeOesteBL, ri(bx), 150, t, { dir: 1, anda, dedo: se, sonrisa: se });
  T.bedfordDelante(R, t, O2);
  // el sitio: un anillo de luz en la hierba (sin hoyo) y las ollas que se intuyen
  const s = tramo(t, W.BUFORDS, W.BUFORDS + 0.5);
  if (s > 0) for (let k = 0; k < 18; k++) { const ag = k / 18 * Math.PI * 2 + t; chispa(186 + Math.cos(ag) * 12 * s, 156 + Math.sin(ag) * 3.5 * s, 0.9); }
  // la luz de visión: tinte dorado, viñeta y motas que flotan
  T.tinte(R, 22, 179, [255, 200, 110], 0.18);
  caja(0, 22, 319, 179, (x, y) => { const d = Math.max(Math.abs(x - 160) / 160, Math.abs(y - 100) / 90); if (d > 0.86 && b4(x, y) < (d - 0.86) * 5) aclara(x, y, DORL, 0.35); });
  chorro(t, W.P2, 10.4, 20, 300, 178, 30, 120, 11);
  // el «4» de las cuatro millas, sobre el camino
  const q = pop(t, W.FOUR, 0.35); if (q > 0) { const y = ri(132 - q * 6); dig('4', 92, y, K, 5); dig('4', 90, y - 2, DORADO, 5); dig('4', 90, y - 2 + 0, DORADO, 5); lin(90, y - 2, 100, y - 2, DORL); }
};

// ── 3 · EL PLANO DE LUZ: la cámara de piedra a seis pies ──
function p3Fondo() {
  caja(0, 0, 319, 179, (x, y) => R.pset(x, y, rmp(NOCHE, 1.0 + (h2(x >> 2, y >> 2, 61) - 0.5) * 0.7 + Math.sin(x * 0.02 + y * 0.035) * 0.35 + y / 179 * 0.8, x, y)));
  // la hoja 2 gigante y apagada: columnas de números de la hoja (fuera de las zonas tranquilas)
  for (let r = 0; r < 12; r++) for (let c = 0; c < 7; c++) { const v = CIFRAS2[(r * 7 + c * 3) % CIFRAS2.length], x = 8 + c * 45 + (r % 2) * 6, y = 24 + r * 13; if (tranq(x, y) || tranq(x + 14, y + 5) || (x > 270 && y < 50)) continue; dig(v, x, y, NOCHE[3], 2); }
  // las fibras del papel y una mancha
  for (let k = 0; k < 220; k++) { const x = h2(k, 1, 62) * 320, y = 22 + h2(k, 2, 62) * 158; ps(x, y, NOCHE[4]); }
}
const p3 = (t) => {
  fijo('p3', p3Fondo);
  const G = 76;           // la línea del suelo
  const u0 = tramo(t, W.P3 + 0.05, W.EXCAV + 0.5);
  // el suelo con sus matas y un árbol, en trazos de luz
  for (let x = 14; x <= 14 + 292 * u0; x += 2) chispa(x, G, 0.75, 1);
  for (let k = 0; k < 12; k++) { const x = 20 + k * 24; if (x > 14 + 292 * u0) break; for (let j = 1; j < 4; j++) { chispa(x - j, G - j * 1.3, 0.6); chispa(x + j, G - j * 1.3, 0.6); } }
  if (u0 > 0.2) { const a = cl((u0 - 0.2) * 2); for (let j = 0; j < 22 * a; j += 2) chispa(64, G - j, 0.8); for (let k = 0; k < 26 * a; k++) { const ag = k / 26 * Math.PI * 2; chispa(64 + Math.cos(ag) * 14, G - 30 + Math.sin(ag) * 10, 0.7); } }
  // la tierra rayada
  for (let k = 0; k < 30; k++) { const x = 16 + k * 10, y = G + 6 + (k % 3) * 10; if (u0 >= 1 && b4(x, y) < 0.7) { lin(x, y, x + 5, y + 5, NOCHE[5]); } }
  // la cámara de piedra, piedra a piedra (de abajo arriba) en «excavation or vault»
  const XV = 112, YV = 122, WV = 104, HV = 40, v = tramo(t, W.EXCAV, W.VAULT + 0.4), nP = Math.floor(v * 30);
  for (let k = 0; k < 30; k++) { const fila = Math.floor(k / 6), col = k % 6, x = XV + col * 17 + (fila % 2) * 8, y = YV + HV - 8 - fila * 8; if (k >= nP) break;
    const nuevo = k === nP - 1 ? 1 : 0.7; for (let i = 0; i <= 15; i += 2) { chispa(x + i, y, nuevo); chispa(x + i, y + 7, nuevo * 0.8); } chispa(x, y + 3, nuevo); chispa(x + 15, y + 3, nuevo); }
  if (v >= 1) { for (let i = 0; i <= WV; i += 2) chispa(XV + i, YV - 2, 0.9, 1); }
  // los cuadraditos que bajan de la hoja de números al trazo que se está haciendo
  for (let k = 0; k < 18; k++) { const f = ((t * 0.9 + h2(k, 1, 64)) % 1), sx = 20 + h2(k, 2, 64) * 280, sy = 30 + h2(k, 3, 64) * 30, tx = v > 0 && v < 1 ? XV + (nP % 6) * 17 : 14 + 292 * u0, ty = v > 0 && v < 1 ? YV + HV - 8 - Math.floor(nP / 6) * 8 : G;
    if (t < W.GROUND) chispa(lerp(sx, tx, f), lerp(sy, ty, f * f), 0.8 * (1 - f)); }
  // Atom en la superficie: baja la cinta de medir hasta la cámara y sale el «6»
  const cinta = tramo(t, W.SIX - 0.5, W.FEET + 0.1), yc = lerp(G, YV - 2, ease(cinta));
  const A = AT.atom(R, 244, G, t, { dir: -1, pose: t > W.GROUND ? 'senala' : cinta > 0 ? 'sostiene' : t > W.VAULT ? 'saluda' : 'quieto', cara: cinta > 0 && cinta < 1 ? 'sorpresa' : 'sonrisa' });
  if (cinta > 0) { const cx = 236; lin(cx, G - 2, cx, yc, DORADO); lin(cx + 1, G - 2, cx + 1, yc, ORO[1]); for (let y = G + 2; y < yc; y += 4) { ps(cx - 1, y, K); ps(cx + 2, y, K); } R.rect(cx - 2, ri(yc), cx + 3, ri(yc) + 1, LATON[3]);
    if (cinta >= 1) { for (const [yy, s] of [[G + 1, 1], [YV - 3, -1]]) { ps(cx - 2, yy + s * 2, DORL); ps(cx + 3, yy + s * 2, DORL); } } }
  const q = pop(t, W.SIX, 0.35); if (q > 0) { const y = ri((G + YV) / 2 - 10 - q * 3); dig('6', 254, y + 2, K, 5); dig('6', 252, y, DORL, 5); }
  // las ollas que se adivinan dentro en «ground»
  const o = tramo(t, W.GROUND - 0.2, W.GROUND + 0.5);
  if (o > 0) for (const cx of [138, 164, 190]) { for (let k = 0; k < 16; k++) { const ag = k / 16 * Math.PI * 2; if (Math.sin(ag) < -0.6) continue; chispa(cx + Math.cos(ag) * 8, YV + 24 + Math.sin(ag) * 7, o * 0.9); } for (let i = -6; i <= 6; i += 2) chispa(cx + i, YV + 17, o); }
};

// ── 4 · DENTRO DE LA CÁMARA: las tres ollas que se llenan ──
function p4Fondo() {
  // muros de piedra a hueso, con juntas de tierra
  caja(0, 0, 319, 146, (x, y) => { const f = Math.floor(y / 13), off = (f * 17) % 26, i = (x + off) % 26, j = y % 13, n = Math.floor((x + off) / 26);
    const borde = i === 0 || j === 0, v = borde ? 0.6 : 2.6 + (h2(n, f, 3) - 0.5) * 1.6 + (h2(x >> 1, y >> 1, 4) - 0.5) * 0.7 - (j === 12 ? 0.8 : 0) + (i === 1 || j === 1 ? 0.8 : 0);
    R.pset(x, y, rmp(PIEDRA, tranq(x, y) ? 2.3 + (v - 2.6) * 0.3 : v, x, y)); });
  // musgo y humedad en las juntas bajas
  for (let k = 0; k < 90; k++) { const x = h2(k, 1, 6) * 320, y = 100 + h2(k, 2, 6) * 46; ps(x, y, k % 3 ? hex('#4a5a2a') : hex('#3a4a22')); ps(x + 1, y, hex('#5a6a32')); }
  // el techo de tierra con raíces que cuelgan (fuera de la zona de Atom)
  caja(0, 0, 319, 18, (x, y) => R.pset(x, y, rmp(BARRO, 1.2 + (h2(x >> 1, y >> 1, 7) - 0.5) * 0.8, x, y)));
  for (let k = 0; k < 14; k++) { let x = 10 + k * 22 + h2(k, 1, 8) * 10, y = 18; if (x > 266) continue; const L = 10 + h2(k, 2, 8) * 24; for (let s = 0; s < L; s++) { ps(x, y, BARRO[3]); ps(x + 1, y, BARRO[1]); x += (h2(k, s, 9) - 0.5) * 1.4; y += 1; } }
  // el suelo de tierra apisonada con piedrecitas
  caja(0, 146, 319, 179, (x, y) => R.pset(x, y, rmp(BARRO, 2.2 + (y - 146) / 34 * 1.2 + (h2(x >> 1, y, 10) - 0.5) * 0.8, x, y)));
  for (let k = 0; k < 60; k++) { const x = h2(k, 1, 11) * 320, y = 150 + h2(k, 2, 11) * 28; ps(x, y, PIEDRA[4]); ps(x + 1, y + 1, PIEDRA[1]); }
  // una pala y un pico apoyados en el muro de la izquierda
  lin(24, 96, 34, 150, ROBLE[4]); lin(25, 96, 35, 150, ROBLE[2]); R.poligono([[30, 140], [42, 142], [40, 156], [30, 154]], HIERRO[3]);
  lin(292, 100, 300, 150, ROBLE[4]); R.poligono([[280, 98], [304, 96], [300, 100], [284, 101]], HIERRO[2]);
}
const p4 = (t) => {
  fijo('p4', p4Fondo);
  // el farol que cuelga del centro y la luz dorada
  const f = Math.sin(t * 9) * 0.5 + Math.sin(t * 5.7) * 0.5;
  lin(160, 18, 160, 34, HIERRO[1]); R.rect(155, 34, 165, 50, HIERRO[0]); R.rect(156, 36, 164, 48, VELA); R.rect(158, 38, 162, 46, VELAL); lin(155, 34, 165, 34, LATON[2]);
  luz(160, 46, 120, VELA, 0.38 + f * 0.04);
  const tipos = ['oro', 'plata', 'joyas'], X = [84, 160, 236], T0 = [W.GOLD, W.SILVER, W.JEWELS];
  for (let i = 0; i < 3; i++) { const g = ollaHierro(X[i], 156, 52, 38, t), u = tramo(t, T0[i] - 0.15, T0[i] + 0.7);
    carga(X[i], g.boca[1] - 1, 24, tipos[i], u, t, i * 7);
    // lo que cae dentro
    for (let k = 0; k < 10; k++) { const tk = T0[i] - 0.25 + k * 0.07, v = (t - tk) / 0.45; if (v <= 0 || v >= 1) continue; pieza(tipos[i], X[i] + (h2(k, 1, i) - 0.5) * 30, lerp(-6, g.boca[1] - 4, v * v)); }
    const q = pop(t, T0[i], 0.3); if (q > 0 && t < T0[i] + 1.2) chorro(t, T0[i], T0[i] + 0.8, X[i] - 20, X[i] + 20, 112, 8, 40, 20 + i);
  }
  motasLuz(t, 100, 40, 230, 140, 22, VELAL, 4);
  // Atom asomado por detrás de la olla de las joyas: se asombra en «jewels»
  const j = t > W.JEWELS - 0.1;
  AT.atom(R, 286, 160, t, { dir: -1, pose: j ? 'brazos' : t > W.SILVER ? 'senala' : 'quieto', cara: j ? 'sorpresa' : 'sonrisa' });
};

// ── 5 · EL MAPA: la ruta por St. Louis ──
const MAPA5 = { zoom: 3.2, centro: [-85.5, 38.4], rosa: [282, 150] };
function mulaMini(x, y, t, ligera, anda) { x = ri(x); y = ri(y - (anda && Math.sin(t * 14) > 0 ? 1 : 0) - (ligera ? 1 : 0)); const pa = anda && Math.sin(t * 14) > 0, P = hex('#8a6a50'), Pl = hex('#a88a6a');
  // de 2 px por píxel: el cuerpo, la cabeza con sus orejas largas, las patas que andan y la carga
  R.rect(x - 11, y - 7, x + 8, y, K); R.rect(x - 10, y - 6, x + 7, y - 1, P); lin(x - 10, y - 6, x + 7, y - 6, Pl);
  R.rect(x + 6, y - 12, x + 13, y - 5, K); R.rect(x + 7, y - 11, x + 12, y - 6, P); ps(x + 11, y - 9, K); R.rect(x + 11, y - 7, x + 13, y - 5, Pl);
  R.rect(x + 7, y - 17, x + 8, y - 11, K); R.rect(x + 9, y - 16, x + 10, y - 11, K); lin(x - 11, y - 6, x - 14, y - 1, K);
  for (const [px, d] of [[-9, 0], [-5, 1], [3, 0], [6, 1]]) { const dx = pa ? (d ? 1 : -1) : 0; R.rect(x + px + dx, y + 1, x + px + dx + 1, y + 4, K); }
  if (!ligera) { for (const sx of [-9, -3]) { R.rect(x + sx, y - 13, x + sx + 5, y - 7, K); R.rect(x + sx + 1, y - 12, x + sx + 4, y - 8, BLANCO[2]); lin(x + sx + 1, y - 12, x + sx + 4, y - 12, BLANCO[5]); } }
  else { R.disco(x - 4, y - 10, 4, K); R.disco(x - 4, y - 10, 3, hex('#7a5030')); ps(x - 5, y - 15, hex('#e8203a')); ps(x - 3, y - 15, hex('#2a8ae8')); if (Math.sin(t * 7) > 0.3) brillo(x - 4, y - 16, t, 0.5); } }
const p5 = (t) => {
  const P = T.mapa(R, t, MAPA5), Q = (p) => P(p).map(ri);
  const [sx, sy] = Q([-90.2, 38.63]), [bx, by] = Q([-79.5, 37.35]);
  const pts = [[18, 128], [46, 118], [72, 104], [sx, sy], [130, 100], [170, 104], [210, 102], [bx, by]];
  const ruta = (s) => { let tot = 0; const L = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; } let q = tot * s;
    for (let i = 0; i < L.length; i++) { if (q <= L[i]) return [lerp(pts[i][0], pts[i + 1][0], q / L[i]), lerp(pts[i][1], pts[i + 1][1], q / L[i])]; q -= L[i]; } return pts[pts.length - 1]; };
  // la posición de la mula en la ruta: llega a St. Louis en «St. Louis», espera el cambio y sigue
  const sStl = 0.38, s = t < W.STL ? lerp(0, sStl, tramo(t, W.P5, W.STL)) : t < W.SILVER2 + 0.3 ? sStl : lerp(sStl, 0.78, tramo(t, W.SILVER2 + 0.3, W.P6));
  R.recorte([14, 14, 306, 166]);
  for (let k = 0; k <= 120; k++) { const q = k / 120; if (q > s) break; const [x, y] = ruta(q); if (k % 3 !== 2) { R.disco(ri(x), ri(y) + 1, 1, hex('#5a2a18')); R.disco(ri(x), ri(y), 1, ROJO); } }
  for (let k = 0; k <= 60; k++) { const q = k / 60; if (q <= s) continue; const [x, y] = ruta(q); if (k % 4 === 0) ps(x, y, hex('#a08868')); }
  R.recorte(null);
  T.chincheta(R, sx, sy, t, ROJO, { baja: tramo(t, W.STL - 0.4, W.STL) });
  T.chincheta(R, bx, by, t, hex('#3a8a4a'));
  const [mx, my] = ruta(s), ligera = t > W.SILVER2 + 0.1;
  mulaMini(mx, my - 3, t, ligera, s > 0 && s < 1 && !(t > W.STL && t < W.SILVER2 + 0.3));
  // dos lingotes salen de la carga en «some of the silver» y se funden en una joya
  const c = tramo(t, W.SOME, W.SILVER2 + 0.1);
  if (c > 0 && c < 1) for (const d of [-1, 1]) { lingote(mx - 4 + d * 9 * c, my - 18 - c * 16); lingote(mx - 4 + d * 9 * c, my - 21 - c * 16); }
  if (t > W.SILVER2 && t < W.SILVER2 + 0.5) { const g = pop(t, W.SILVER2, 0.3); for (const d of [-6, 0, 6]) { const c2 = [hex('#e8203a'), hex('#2a8ae8'), hex('#2ac86a')][(d + 6) / 6]; R.poligono([[mx - 4 + d, my - 40 - g * 2], [mx - 1 + d, my - 36], [mx - 4 + d, my - 32], [mx - 7 + d, my - 36]], c2); ps(mx - 4 + d, my - 37, 0xffffffff); } brillo(mx - 4, my - 44, t, 1); }
  // Atom de pie en el mapa, señala St. Louis
  AT.atom(R, 44, 156, t, { dir: 1, pose: t > W.TRADED ? 'senala' : 'quieto', cara: t > W.SOME ? 'sorpresa' : 'normal' });
};

// ── 6 · EL MUELLE DE ST. LOUIS, 1821 ──
function p6Fondo() {
  // cielo tramado
  caja(0, 0, 319, 70, (x, y) => R.pset(x, y, rmp(CIELO, 4.8 - y / 70 * 3 + (h2(x >> 2, y >> 1, 21) - 0.5) * 0.5, x, y)));
  // la otra orilla: bosque de álamos y una cabaña
  for (let x = 0; x < 320; x++) { const yt = 62 - Math.round(Math.abs(Math.sin(x * 0.11)) * 5 + h2(x >> 2, 1, 22) * 4); for (let y = yt; y < 76; y++) R.pset(x, y, rmp(PRADO, 1.2 + (y - yt) * 0.08 + (h2(x >> 1, y >> 1, 23) - 0.5) * 0.9, x, y)); }
  R.rect(40, 66, 52, 74, ROBLE[2]); R.poligono([[38, 66], [46, 60], [54, 66]], ROBLE[0]); ps(46, 70, VELA);
  // el río ancho y pardo: más claro lejos, ondas, el reflejo del cielo y de la otra orilla
  caja(0, 76, 319, 121, (x, y) => { const g = (y - 76) / 45, ond = Math.sin(x * 0.11 + y * 1.7) + Math.sin(x * 0.037 - y * 0.9);
    let v = 3.8 - g * 1.6 + ond * 0.22 + (h2(x >> 2, y, 24) - 0.5) * 0.5; if (y < 80) v -= 1.2; R.pset(x, y, rmp(BARRO, v, x, y));
    if (Math.abs(ond) > 1.75 && y > 82) aclara(x, y, CIELO[4], 0.35); });
  for (let k = 0; k < 30; k++) { const x = h2(k, 1, 29) * 320, y = 84 + h2(k, 2, 29) * 34, L = 4 + h2(k, 3, 29) * 10; lin(x, y, x + L, y, BARRO[5]); }
  // el muelle: la cuesta empedrada (más clara arriba, juntas, charcos y adoquines sueltos)
  caja(0, 122, 319, 179, (x, y) => { const f = Math.floor((y - 122) / 5), off = (f % 2) * 4, i = (x + off) % 9, j = (y - 122) % 5, n = Math.floor((x + off) / 9);
    let v = i === 0 || j === 0 ? 1.4 : 3.6 - (y - 122) / 58 * 1.2 + (h2(n, f, 25) - 0.5) * 1.4 + (j === 1 ? 0.6 : 0) + (i === 1 ? 0.4 : 0);
    const ch = Math.hypot((x - 96) / 22, (y - 168) / 4), ch2 = Math.hypot((x - 250) / 16, (y - 150) / 3);
    if (ch < 1 || ch2 < 1) { R.pset(x, y, rmp(CIELO, 3.2 + (h2(x, y, 26) - 0.5), x, y)); return; }
    R.pset(x, y, rmp(PIEDRA, v, x, y)); });
  for (let x = 0; x < 320; x++) { ps(x, 121, PIEDRA[5]); ps(x, 122, BARRO[1]); }
  // los norays de hierro con su cabo hacia el agua
  for (const bx of [128, 300]) { R.rect(bx - 3, 124, bx + 3, 134, HIERRO[1]); R.rect(bx - 4, 122, bx + 4, 124, HIERRO[3]); lin(bx - 2, 126, bx - 2, 132, HIERRO[4]); for (let k = 0; k < 20; k++) ps(bx - 4 - k * 1.6, 126 - k * 0.4 + Math.sin(k * 0.5) * 1, ROBLE[4]); }
  // la farola de aceite
  lin(150, 84, 150, 150, HIERRO[1]); lin(151, 84, 151, 150, HIERRO[3]); R.rect(146, 76, 155, 84, HIERRO[1]); R.rect(148, 78, 153, 82, CREMA[4]);
  // los fardos de pieles y los barriles (izquierda) y las cajas (derecha)
  for (const [x, y] of [[6, 130], [24, 130], [14, 120]]) { caja(x, y, x + 16, y + 10, (xx, yy) => R.pset(xx, yy, rmp(ROBLE, 2.2 + (h2(xx, yy >> 1, 26) - 0.5) * 1.8 + (yy === y ? 1 : 0), xx, yy))); lin(x + 5, y, x + 5, y + 10, K); lin(x + 11, y, x + 11, y + 10, K); }
  for (const [x, y] of [[262, 124], [280, 124], [271, 112], [298, 126]]) { caja(x, y, x + 15, y + 13, (xx, yy) => R.pset(xx, yy, rmp(PINO, 2.6 + (xx - x === 0 || yy - y === 0 ? 1.4 : 0) + (h2(xx >> 1, yy, 27) - 0.5) * 0.6, xx, yy))); lin(x, y, x + 15, y + 13, PINO[1]); marco(x, y, x + 15, y + 13, PINO[0]); }
  // el puesto del comerciante: mesa con paño, toldo a rayas en dos postes
  for (const px of [168, 240]) { lin(px, 70, px, 150, ROBLE[1]); lin(px + 1, 70, px + 1, 150, ROBLE[3]); }
  caja(162, 64, 246, 76, (x, y) => R.pset(x, y, ((Math.floor((x - 162) / 7)) % 2 ? BLANCO[4] : ROJO)));
  for (let x = 162; x <= 246; x++) { ps(x, 77 + (Math.floor((x - 162) / 7) % 2), x % 7 === 3 ? ROJO : BLANCO[2]); sombrea(x, 78, 0.3); }
}
function p6Mesa(t) {
  // el tablero con su paño verde y su frente; encima la balanza y unas monedas
  caja(170, 124, 238, 150, (x, y) => R.pset(x, y, y < 128 ? rmp(VERDE, 3.6 - (y - 124) * 0.4, x, y) : rmp(VERDE, 2 + (h2(x >> 1, y, 28) - 0.5) * 0.8 + ((x - 170) % 12 === 0 ? -1 : 0), x, y)));
  for (let x = 170; x <= 238; x++) { ps(x, 128, LATON[2]); }
  for (let y = 151; y < 156; y++) for (let x = 172; x <= 240; x++) if (b4(x, y) < 0.5) sombrea(x, y, 0.4);
}
const p6 = (t) => {
  fijo('p6', p6Fondo);
  nubes(t, [[0, 22, 50, 5], [1, 34, 38, 8], [2, 16, 30, 3]], 50);
  pajaros(t, 5, 26, 12, 3);
  // el río: brillos que corren y el vapor de ruedas que pasa echando humo
  for (let k = 0; k < 40; k++) { const x = (h2(k, 1, 31) * 340 + t * 9) % 340 - 10, y = 80 + h2(k, 2, 31) * 34; if (Math.sin(t * 3 + k) > 0.2) { ps(x, y, BARRO[5]); ps(x + 1, y, BARRO[4]); } }
  const vx = ri(340 - ((t - W.P6) * 14 + 60) % 460);
  for (let i = 0; i < 60; i++) ps(vx + 58 + i, 101 + (i % 3 === 0 ? 1 : 0), BARRO[5]);            // la estela
  R.poligono([[vx - 4, 94], [vx + 58, 94], [vx + 54, 101], [vx + 2, 101]], BLANCO[3]); lin(vx + 2, 101, vx + 54, 101, K); lin(vx - 2, 98, vx + 56, 98, ROJO);
  R.rect(vx + 2, 86, vx + 50, 93, BLANCO[5]); lin(vx + 2, 86, vx + 50, 86, BLANCO[2]); for (let i = vx + 4; i < vx + 48; i += 4) { ps(i, 89, i % 8 ? NOGAL[2] : VELA); ps(i, 90, NOGAL[1]); }
  R.rect(vx + 12, 80, vx + 34, 85, BLANCO[4]); for (let i = vx + 14; i < vx + 32; i += 4) ps(i, 82, NOGAL[2]); R.rect(vx + 20, 75, vx + 28, 79, BLANCO[5]); ps(vx + 24, 77, NOGAL[1]);
  for (const cx of [vx + 14, vx + 30]) { R.rect(cx, 58, cx + 3, 80, K); R.rect(cx - 1, 56, cx + 4, 58, LATON[2]); ps(cx - 1, 55, LATON[3]); ps(cx + 4, 55, LATON[3]); }
  const rueda = vx + 42; R.disco(rueda, 92, 9, BLANCO[2]); R.disco(rueda, 92, 8, ROJO); for (let k = 0; k < 4; k++) { const a = t * 4 + k * Math.PI / 4; lin(rueda - Math.cos(a) * 8, 92 - Math.sin(a) * 8, rueda + Math.cos(a) * 8, 92 + Math.sin(a) * 8, BURDEOS[1]); } R.rect(rueda - 9, 92, rueda + 9, 94, BLANCO[3]);
  for (let k = 0; k < 6; k++) { const u = ((t * 0.5 + k / 6) % 1); bocanada(vx + 15 + u * 18, 52 - u * 30, u, 3, PIEDRA[5]); bocanada(vx + 31 + u * 18, 52 - u * 28, (u + 0.5) % 1, 3, PIEDRA[4]); }
  // la orilla: estela y una barcaza amarrada
  R.poligono([[60, 112], [118, 112], [112, 118], [66, 118]], ROBLE[1]); lin(60, 112, 118, 112, ROBLE[4]);
  // un estibador rueda un barril por el primer término (entra por la derecha y lo deja junto a las cajas)
  { const u = tramo(t, W.P6, W.N13 + 0.4), ex = ri(lerp(340, 252, u)); R.actor(EL.obrero, ex, 178, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: u >= 1 });
    const bx = ex - 8, ang = t * 6; R.disco(bx, 171, 7, K); R.disco(bx, 171, 6, ROBLE[3]); lin(bx - ri(Math.cos(ang) * 6), 171 - ri(Math.sin(ang) * 6), bx + ri(Math.cos(ang) * 6), 171 + ri(Math.sin(ang) * 6), HIERRO[1]); }
  // el comerciante detrás de su mesa
  const bal = tramo(t, W.VALUED - 0.1, W.VALUED + 0.5);
  R.actor(EL.comerciante, 198, 136, t, { dir: -1, habla: t > W.VALUED && t < W.N13 + 0.6 && Math.sin(t * 8) > 0, sonrisa: t > W.N13 });
  p6Mesa(t);
  // la balanza: los lingotes en un plato; se inclina en «valued»
  const inc = ri(ease(bal) * 4); lin(204, 104, 204, 124, LATON[1]); lin(194, 108 - inc, 214, 108 + inc, LATON[3]);
  for (const [px, d] of [[194, -inc], [214, inc]]) { lin(px, 108 + d, px - 4, 116 + d, LATON[1]); lin(px, 108 + d, px + 4, 116 + d, LATON[1]); lin(px - 5, 117 + d, px + 5, 117 + d, LATON[3]); }
  if (t > W.VALUED - 0.2) { lingote(214, 115 + inc); lingote(214, 112 + inc); }
  // Beale: coge los lingotes de la mula («lighten the load»), los lleva a la balanza, recibe la bolsita y se va con la mula
  const ida = tramo(t, W.LOAD + 0.1, W.VALUED - 0.25), vuelta = tramo(t, W.N13 + 0.9, W.IMAGINE + 0.6);
  const xb = t < W.N13 + 0.9 ? lerp(110, 156, ease(ida)) : lerp(156, -40, ease(vuelta));
  const muX = t < W.N13 + 0.9 ? 64 : lerp(64, -80, ease(vuelta)), anda = (ida > 0 && ida < 1) || (vuelta > 0 && vuelta < 1);
  T.b_mula(R, ri(muX), 160, t, { dir: vuelta > 0 ? -1 : 1, anda: vuelta > 0 && vuelta < 1, carga: t < W.LOAD });
  if (t > W.LOAD - 0.05 && t < W.LOAD + 0.35) for (let k = 0; k < 4; k++) ps(muX + 10 + k * 3, 146 - k % 2, PIEDRA[5]);
  const lleva = t > W.LOAD - 0.1 && t < W.VALUED - 0.2, bolsa = t > W.N13 + 0.3;
  const a = R.actor(EB.bealeOesteBL, ri(xb), 160, t, { dir: vuelta > 0 ? -1 : 1, anda, sostiene: lleva || bolsa ? true : undefined, sonrisa: t > W.N13, habla: t > W.VALUED + 0.2 && t < W.N13 && Math.sin(t * 9) > 0 });
  if (lleva) { lingote(a.mano[0] + 2, a.mano[1] - 1); lingote(a.mano[0] + 2, a.mano[1] - 4); }
  if (bolsa) bolsaJoyas(a.mano[0] + 1, a.mano[1] - 1, t);
  if (t > W.N13 - 0.5 && t < W.N13 + 0.3) bolsaJoyas(lerp(188, 160, tramo(t, W.N13 - 0.5, W.N13 + 0.3)), 122, t);
  // «$13000»
  const q = pop(t, W.N13, 0.35); if (q > 0 && t < W.IMAGINE + 0.3) { const y = ri(92 - q * 4); R.numero('$13000', 204, y, { tam: 16, centro: true }); }
};

// ── 7 · LA VELA Y LA SOMBRA ──
function p7Fondo() {
  papelPintado(0, 0, 319, 120, BURDEOS, NOGAL, { flor: LATON[1], centro: DORADO, per: 12, w: 4 });
  caja(0, 0, 319, 120, (x, y) => { if (b4(x, y) < 0.45) sombrea(x, y, 0.35); });          // es de noche: el papel, en penumbra
  // la balda con libros y un tintero de repuesto, y un retrato ovalado (sin cara: una silueta)
  R.rect(16, 46, 120, 49, NOGAL[4]); lin(16, 50, 120, 50, NOGAL[0]); for (let x = 16; x <= 120; x++) sombrea(x, 51, 0.4);
  for (let k = 0; k < 15; k++) { const x = 20 + k * 6, hh = 11 + (k * 7) % 6; R.rect(x, 46 - hh, x + 4, 45, [BURDEOS[4], hex('#2a4a6a'), VERDE[3], NOGAL[3], hex('#6a5a2a')][k % 5]); lin(x, 46 - hh + 3, x + 4, 46 - hh + 3, LATON[2]); }
  R.disco(150, 72, 12, LATON[1]); R.disco(150, 72, 10, CREMA[3]); R.disco(150, 68, 4, NOGAL[1]); R.poligono([[142, 82], [158, 82], [154, 74], [146, 74]], NOGAL[1]);
  friso(0, 120, 319, 146, NOGAL, { panel: 30 });
  tarima(0, 146, 319, 179, PINO);
  // la mesa a la derecha: tablero y faldón
  caja(150, 124, 319, 179, (x, y) => R.pset(x, y, y < 130 ? rmp(NOGAL, 4.2 - (y - 124) * 0.5, x, y) : rmp(NOGAL, 2 + (h2(x >> 2, y, 41) - 0.5) * 0.6 + ((x - 150) % 40 === 0 ? -1 : 0) + Math.sin(x * 0.2 + y * 0.6) * 0.2, x, y)));
  for (let x = 150; x <= 319; x++) { ps(x, 124, NOGAL[5]); ps(x, 131, NOGAL[0]); }
  // el faldón de la mesa: dos cajones con tirador, molduras y las patas torneadas; papeles caídos y una silla
  for (const [x0, x1] of [[164, 228], [244, 308]]) { marco(x0, 136, x1, 156, NOGAL[0]); lin(x0 + 1, 137, x1 - 1, 137, NOGAL[4]); R.disco(ri((x0 + x1) / 2), 146, 2, LATON[3]); ps(ri((x0 + x1) / 2) - 1, 145, LATON[4]); }
  for (const x of [154, 234, 312]) { R.rect(x, 158, x + 5, 179, NOGAL[1]); lin(x + 1, 158, x + 1, 179, NOGAL[3]); R.rect(x - 1, 166, x + 6, 168, NOGAL[2]); }
  caja(158, 160, 312, 179, (x, y) => { if (b4(x, y) < 0.5) sombrea(x, y, 0.3); });
  for (const [x, y] of [[60, 168], [96, 174], [130, 164]]) { R.poligono([[x, y], [x + 12, y - 2], [x + 14, y + 4], [x + 2, y + 6]], PAPEL[3]); lin(x + 3, y + 2, x + 11, y + 1, TINTA); }
  for (const x of [128, 146]) lin(x, 118, x, 176, NOGAL[2]); R.rect(124, 140, 150, 144, NOGAL[3]); lin(124, 140, 150, 140, NOGAL[5]); for (let y = 118; y < 140; y += 6) lin(128, y, 146, y, NOGAL[1]);
  // los papeles sobre la mesa
  for (const [x, y] of [[168, 117], [190, 119], [250, 118]]) { R.poligono([[x, y + 6], [x + 18, y + 6], [x + 16, y], [x + 2, y]], PAPEL[4]); lin(x + 4, y + 2, x + 13, y + 2, TINTA); lin(x + 4, y + 4, x + 11, y + 4, TINTA); }
}
const p7 = (t) => {
  fijo('p7', p7Fondo);
  const u = tramo(t, W.P7, W.P8);       // la madrugada que pasa
  // la ventana: del azul de noche al primer claro; las estrellas se apagan
  ventana(232, 50, 304, 108, (x0, y0, x1, y1) => {
    const C0 = u < 0.5 ? NOCHE : pal(['#1a2240', '#2a3258', '#4a4a70', '#7a6a88', '#b08a90', '#e0b0a0']);
    caja(x0, y0, x1, y1, (x, y) => ps(x, y, rmp(C0, 0.6 + (y - y0) / (y1 - y0) * (1.6 + u * 3.4) + (h2(x >> 1, y >> 1, 4) - 0.5) * 0.4, x, y)));
    if (u < 0.8) estrellas(x0, y0, x1, y0 + 30, t, 10, 3);
    for (let x = x0; x <= x1; x++) { const yt = y1 - 10 - (Math.floor(x / 12) % 3) * 4; for (let y = yt; y <= y1; y++) ps(x, y, hex('#141420')); if (x % 12 === 5 && (x * 7 + Math.floor(t * 0.5)) % 5 === 0) ps(x, yt + 4, VELA); }
  }, { marco: PINO });
  // el reloj de pared: las agujas giran deprisa (pasan las horas de la madrugada)
  const cx = 190, cy = 60; R.disco(cx, cy, 13, NOGAL[1]); R.disco(cx, cy, 11, CREMA[5]); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; ps(cx + Math.cos(a) * 9, cy + Math.sin(a) * 9, K); }
  const am = -Math.PI / 2 + u * Math.PI * 2 * 4, ah = -Math.PI / 2 + Math.PI * 2 * (2 + u * 3) / 12;
  lin(cx, cy, cx + Math.cos(am) * 9, cy + Math.sin(am) * 9, K); lin(cx, cy, cx + Math.cos(ah) * 6, cy + Math.sin(ah) * 6, K); ps(cx, cy, LATON[3]);
  lin(cx, cy + 13, cx + Math.sin(t * 3) * 5, cy + 26, LATON[1]); R.disco(ri(cx + Math.sin(t * 3) * 5), cy + 27, 2, LATON[3]);
  // el amigo: lee, salta de alegría en «feels», da vueltas y mira la vela en «candle»
  const salta = t > W.FEELS - 0.05 && t < W.FEELS + 0.8, va = tramo(t, W.SMALL - 0.2, W.CANDLE - 0.4);
  const ax = ri(110 + Math.sin(va * Math.PI) * -36), alto = salta ? ri(Math.abs(Math.sin((t - W.FEELS) * 8)) * 4) : 0;
  const oA = { dir: t > W.CANDLE - 0.3 || va <= 0 ? 1 : va < 0.5 ? -1 : 1, anda: va > 0 && va < 1, brazos: salta, salto: alto, sonrisa: t > W.FEELS - 0.1 && t < W.NEARLY, sorpresa: t > W.NEARLY, dedo: t < W.FEELS - 0.1 };
  // su sombra gigante en la pared (la vela está a la derecha: cae a la izquierda)
  sombraDe(() => R.actor(EB.amigoBL, 2, 28, t, oA), 20, 30, ri(ax - 44), 146 - 70 - alto * 2, 2.5, 0.5);
  R.actor(EB.amigoBL, ax, 160, t, oA);
  // la vela grande sobre la mesa, que se consume
  const h = lerp(30, 3, ease(tramo(t, W.P7 + 0.2, W.BURNED + 0.3)));
  velaGrande(214, 124, h, t, { r: 110, a: 0.48, w: 7, chisporrotea: t > W.NEARLY, llama: t > W.NEARLY ? 0.75 : 1 });
  polilla(214, 92 - (30 - h), t, 10, 3);
  for (let k = 0; k < 3; k++) { const v = ((t * 0.4 + k / 3) % 1); bocanada(214 + Math.sin(v * 6 + k) * 3, 88 - (30 - h) - v * 30, v, 2, PIEDRA[3]); }
};

// ── 8 · LA MESA DE CERCA: las formas de luz ──
const O8 = (t) => ({ camara: 'mesa', letras: tramo(t, W.P8 + 0.1, W.DECADES), vela: 0.93 });
const p8 = (t) => {
  const o = O8(t), g = T.cuarto(R, t, o);
  const [ax, ay] = g.amigo ?? [92, 104];
  R.actor(EB.amigoBL, ax, ay, t, { dir: 1, sorpresa: t < W.LANGUAGE, sonrisa: t >= W.LANGUAGE, brazos: t > W.RISE && t < W.RISE + 1.4, dedo: t > W.SILENT && t < W.DECADES, habla: t > W.NUMBERS && t < W.SILENT && Math.sin(t * 8) > 0 });
  T.cuartoDelante(R, t, o);
  // las cifras de la hoja suben y se deshacen en luz
  for (let k = 0; k < 9; k++) { const tk = W.NUMBERS - 0.8 + k * 0.28, v = (t - tk) / 1.6; if (v <= 0 || v >= 1) continue; const x = 160 + (h2(k, 1, 88) - 0.5) * 28, y = 128 - v * 50;
    if (v < 0.55) dig(CIFRAS2[k], x, y, v < 0.3 ? DORL : DORADO); else chispa(x + 3, y, 1 - v, 2); }
  // Atom, pequeño sobre los libros, aplaude en «decades»
  const ap = t > W.DECADES - 0.1;
  AT.atom(R, 300, 116, t, { dir: -1, pose: ap ? (Math.sin(t * 14) > 0 ? 'brazos' : 'sostiene') : 'piensa', cara: ap ? 'sonrisa' : 'sorpresa' });
};

// ── 9 · LA PARED DE LAS HOJAS AL ALBA ──
function p9Fondo() {
  papelPintado(0, 0, 319, 118, SALVIA, CREMA, { flor: BURDEOS[3], centro: DORADO });
  friso(0, 118, 319, 150, NOGAL, { panel: 28 });
  tarima(0, 150, 319, 179, PINO);
  // papeles arrugados en el suelo y una silla
  for (let k = 0; k < 7; k++) { const x = 20 + h2(k, 1, 91) * 280, y = 158 + h2(k, 2, 91) * 16; R.disco(ri(x), ri(y), 3, PAPEL[4]); ps(x - 1, y - 1, PAPEL[5]); ps(x + 1, y + 1, PAPEL[1]); lin(x - 2, y, x + 1, y - 1, PAPEL[2]); }
  for (const x of [18, 38]) lin(x, 130, x, 164, NOGAL[3]); R.rect(14, 128, 42, 132, NOGAL[4]); for (const x of [18, 38]) lin(x, 96, x, 128, NOGAL[2]); R.rect(16, 96, 40, 100, NOGAL[3]);
  // el abrigo colgado
  R.poligono([[52, 60], [64, 60], [68, 100], [48, 100]], hex('#42424a')); lin(58, 56, 58, 60, LATON[2]);
}
const p9 = (t) => {
  fijo('p9', p9Fondo);
  ventana(262, 54, 312, 114, (x0, y0, x1, y1) => paisaje(x0, y0, x1, y1, { alba: true, nieve: false }), { marco: BLANCO });
  // un rayo de luz del alba que entra en diagonal, con motas
  caja(150, 60, 262, 179, (x, y) => { const d = (262 - x) - (y - 60) * 0.8; if (d > 0 && d < 40 && b4(x, y) < 0.35) aclara(x, y, hex('#ffe0c0'), 0.25); });
  motasLuz(t, 170, 70, 260, 170, 14, hex('#fff0e0'), 9);
  // las tres hojas clavadas: la 2 descifrada y encendida; la 1 y la 3 se tachan
  const X1 = tramo(t, W.FIRST, W.FIRST + 0.3), X3 = tramo(t, W.THIRD, W.THIRD + 0.3);
  T.d_hoja(R, 84, 70, { n: 1, escala: 2, t, oscura: X1 * 0.4 });
  T.d_hoja(R, 160, 70, { n: 2, escala: 2, t, brillo: 0.6, descifrada: 1 });
  T.d_hoja(R, 236, 70, { n: 3, escala: 2, t, oscura: X3 * 0.4 });
  for (const x of [84, 160, 236]) { R.disco(x, 42, 2, LATON[2]); ps(x - 1, 41, LATON[4]); }
  // el amigo: alegre bajo la hoja 2, va a la 1 con la Declaración, «X»; va a la 3, «X»; se entristece
  const a1 = tramo(t, W.LAST, W.DECL - 0.2), a3 = tramo(t, W.FIRST + 0.4, W.THIRD - 0.25);
  const x = ri(a3 > 0 ? lerp(70, 226, ease(a3)) : lerp(150, 70, ease(a1))), anda = (a1 > 0 && a1 < 1) || (a3 > 0 && a3 < 1);
  const alza = (t > W.DECL - 0.1 && t < W.FIRST + 0.3) || (t > W.THIRD - 0.2 && t < W.THIRD + 0.4);
  const triste = (t > W.FIRST + 0.3 && t < W.FIRST + 0.5) || t > W.THIRD + 0.3;
  const a = R.actor(EB.amigoBL, x, 168, t, { dir: a3 > 0 && a3 < 1 ? 1 : a1 > 0 && a1 < 1 ? -1 : x < 100 ? 1 : -1, anda, sostiene: alza ? [x + (x < 100 ? 14 : 0), 128] : true, sonrisa: t < W.LAST, sorpresa: t > W.FIRST && t < W.FIRST + 0.3, triste });
  // la Declaración enrollada en la mano y su rayo de luz hacia la hoja
  const [mx, my] = a.mano; R.rect(mx - 4, my - 2, mx + 4, my + 1, PAPEL[4]); lin(mx - 4, my - 2, mx + 4, my - 2, PAPEL[5]); R.disco(mx - 4, my, 1, PAPEL[2]); R.disco(mx + 4, my, 1, PAPEL[2]);
  if (alza) { const hx = t < W.THIRD - 1 ? 84 : 236; for (let k = 0; k < 10; k++) { const f = ((t * 1.4 + k / 10) % 1); chispa(lerp(mx, hx, f), lerp(my - 3, 96, f), 0.8 * (1 - f)); } }
  // las «X»
  for (const [x0, u] of [[84, X1], [236, X3]]) if (u > 0) { const s = ri(2 + u * 1.5); R.icono('X', x0 - ri(5 * s / 2), 66 - ri(5 * s / 2), ROJO, K, s); }
};

// ── 10 · LA VENTANA DE LOS AÑOS (1862 → 1882) ──
function p10Fondo() {
  papelPintado(0, 0, 319, 128, PAPEL, CREMA, { flor: hex('#4a5a9a'), centro: hex('#c84a4a'), per: 14, w: 2 });
  friso(0, 128, 319, 146, ROBLE, { panel: 24 });
  tarima(0, 146, 319, 179, ROBLE);
  // el mapa de Virginia clavado (manchas de condados, sin letras) y una chincheta roja en Bedford
  R.rect(246, 104, 304, 126, PAPEL[3]); marco(246, 104, 304, 126, PAPEL[1]); for (let k = 0; k < 9; k++) { const x = 250 + (k % 3) * 18, y = 107 + Math.floor(k / 3) * 6; R.rect(x, y, x + 15, y + 4, [hex('#c8b890'), hex('#b8c8a0'), hex('#d8c0a0')][k % 3]); }
  lin(250, 120, 300, 110, hex('#4a6aa8')); R.disco(268, 114, 2, ROJO);
  // cuadro y repisa (abajo a la izquierda, fuera de la barra del año)
  cuadro(20, 50, 66, 84, 'rio');
  // el escritorio (lo de delante se pinta después del amigo)
}
function estacion(x0, y0, x1, y1, ph, t) {
  const e = Math.floor(ph) % 4, CI = [pal(['#6a7488', '#8a94a6', '#a8b0c0', '#c6ccd8', '#e0e4ea']), pal(['#7a9ac8', '#9ab4d8', '#b8cce4', '#d0dcee', '#e6eef8']), pal(['#4a7ac8', '#6a94d8', '#8aaee4', '#a8c6ee', '#c4daf6']), pal(['#8a7a8a', '#b09080', '#d0a880', '#e8c08a', '#f4d8a4'])][e];
  caja(x0, y0, x1, y1, (x, y) => ps(x, y, rmp(CI, 4.2 - (y - y0) / (y1 - y0) * 3 + (h2(x >> 1, y >> 1, 101) - 0.5) * 0.5, x, y)));
  // los tejados y el campanario de Lynchburg
  for (let x = x0; x <= x1; x++) { const yt = y1 - 26 + (Math.floor((x - x0) / 18) % 3) * 5; for (let y = yt; y <= y1; y++) ps(x, y, e === 0 && y < yt + 2 ? NIEVE[5] : rmp(LADR, 1.6 + (h2(x >> 1, y, 102) - 0.5), x, y)); }
  R.poligono([[x0 + 30, y1 - 26], [x0 + 36, y1 - 50], [x0 + 42, y1 - 26]], hex('#4a4050')); ps(x0 + 36, y1 - 52, LATON[3]);
  // el árbol del patio con el color de su estación
  const tx = x0 + 88; lin(tx, y1, tx, y1 - 34, ROBLE[1]); lin(tx + 1, y1, tx + 1, y1 - 34, ROBLE[2]); lin(tx, y1 - 24, tx - 10, y1 - 36, ROBLE[1]); lin(tx, y1 - 28, tx + 12, y1 - 40, ROBLE[1]);
  const CC = [null, [hex('#f0a0c0'), hex('#ffd0e0')], [hex('#3a8a3a'), hex('#5aa84a')], [hex('#d0602a'), hex('#f0a030')]][e];
  if (CC) for (let k = 0; k < 70; k++) { const a = h2(k, 1, 103) * Math.PI * 2, r = Math.sqrt(h2(k, 2, 103)) * 18; ps(tx + Math.cos(a) * r * 1.2, y1 - 40 + Math.sin(a) * r * 0.8, CC[k % 2]); }
  if (e === 0) copos(x0, y0, x1, y1, t, 24, 1.2); if (e === 3) for (let k = 0; k < 8; k++) { const f = (t * 0.7 + k / 8) % 1; ps(tx - 20 + k * 6 + Math.sin(f * 8) * 3, y1 - 40 + f * 40, CC[k % 2]); }
}
const p10 = (t) => {
  fijo('p10', p10Fondo);
  const u = tramo(t, W.P10 + 0.1, W.P11 - 0.2), ph = u * 20 * 4;      // 20 años, cuatro estaciones cada uno
  ventana(96, 28, 224, 118, (x0, y0, x1, y1) => estacion(x0, y0, x1, y1, ph, t), { cols: 2, filas: 3 });
  cortina(84, 24, 98, 122, BURDEOS); cortina(222, 24, 236, 122, BURDEOS);
  // el calendario de pared: las hojas vuelan, del 1862 al 1882
  const anyo = 1862 + Math.min(20, Math.floor(u * 20)); calendario(272, 66, (Math.floor(ph) % 12) + 1, anyo, (ph * 3) % 1);
  // el amigo a su escritorio: escribe, se asombra, niega; envejece en «twenty years»
  const viejo = t > W.YEARS + 0.2, def = viejo ? EB.amigoMayorBL : EB.amigoBL;
  R.actor(def, 152, 136, t, { dir: Math.sin(t * 5) > 0 && t > W.EVERYTHING ? -1 : 1, dedo: t < W.TRYING && Math.sin(t * 3) > 0, sorpresa: t > W.TRYING && t < W.EVERYTHING, triste: t > W.EVERYTHING, habla: t > W.TRYING && t < W.EVERYTHING && Math.sin(t * 8) > 0 });
  if (Math.abs(t - (W.YEARS + 0.2)) < 0.25) for (let k = 0; k < 10; k++) bocanada(158 + (h2(k, 1, 4) - 0.5) * 18, 118 + (h2(k, 2, 4) - 0.5) * 14, cl((t - W.YEARS + 0.05) / 0.5), 3, BLANCO[4]);
  // el escritorio por delante, con las pilas de papeles que crecen y los cabos de vela que se acumulan
  caja(70, 132, 250, 179, (x, y) => R.pset(x, y, y < 137 ? rmp(NOGAL, 4.4 - (y - 132) * 0.6, x, y) : rmp(NOGAL, 2 + (h2(x >> 2, y, 105) - 0.5) * 0.7 + ((x - 70) % 45 === 0 ? -1.2 : 0) + Math.sin(x * 0.15 + y * 0.5) * 0.25, x, y)));
  for (let x = 70; x <= 250; x++) ps(x, 132, NOGAL[5]); for (const dx of [96, 222]) { R.rect(dx - 6, 150, dx + 6, 158, NOGAL[1]); R.disco(dx, 154, 1, LATON[3]); }
  for (const [sx, k0] of [[86, 1], [196, 2]]) { const n = ri(u * 18); for (let k = 0; k < n; k++) { const y = 131 - k * 1.4, dx = ri((h2(k, k0, 106) - 0.5) * 3); lin(sx + dx, y, sx + 22 + dx, y, k % 2 ? PAPEL[4] : PAPEL[3]); lin(sx + dx, y - 0.7, sx + 22 + dx, y - 0.7, PAPEL[5]); } }
  for (let k = 0; k < Math.min(7, ri(u * 8)); k++) vela(120 + k * 9, 131, t, { alto: 2 + (k % 3), apagada: k < ri(u * 8) - 1, luz: false });
  vela(186, 131, t, { alto: 7, r: 26, a: 0.3 });
};

// ── 11 · LA CASA DE EMPEÑOS ──
function p11Fondo() {
  tablas(0, 0, 319, 150, pal(['#2a1e16', '#3a2a1e', '#4a3826', '#5a4630', '#6a543a', '#7a6244']), 18, 3);
  // la puerta con su cristal (a la calle) y la ventana con el cartel de las tres bolas fuera
  caja(12, 56, 50, 150, (x, y) => R.pset(x, y, rmp(ROBLE, 2.2 + ((x - 12) % 19 === 0 ? -1 : 0) + (h2(x >> 1, y >> 2, 111) - 0.5) * 0.5, x, y)));
  marco(12, 56, 50, 150, K); R.disco(44, 106, 2, LATON[3]);
  // estantes con lo empeñado
  for (const y of [52, 82, 112]) { R.rect(150, y, 318, y + 3, ROBLE[4]); lin(150, y + 3, 318, y + 3, ROBLE[1]); for (let x = 150; x <= 318; x++) sombrea(x, y + 4, 0.35); }
  // relojes, candeleros, un violín, botas, libros, una tetera, un banjo
  for (const [x, y] of [[160, 52], [250, 82]]) { R.rect(x, y - 16, x + 10, y - 1, NOGAL[2]); R.disco(x + 5, y - 11, 4, CREMA[5]); ps(x + 5, y - 11, K); lin(x + 5, y - 11, x + 5, y - 14, K); lin(x + 5, y - 11, x + 7, y - 11, K); }
  for (const [x, y] of [[180, 52], [188, 52], [296, 112]]) { lin(x, y - 1, x, y - 12, LATON[2]); lin(x - 2, y - 1, x + 2, y - 1, LATON[3]); R.rect(x - 1, y - 16, x + 1, y - 12, BLANCO[5]); }
  R.disco(212, 44, 6, ROBLE[3]); R.disco(212, 36, 4, ROBLE[3]); lin(212, 30, 212, 18, ROBLE[1]); lin(211, 18, 211, 50, K);
  for (let k = 0; k < 10; k++) R.rect(230 + k * 4, 40, 232 + k * 4, 51, [ROJO, BURDEOS[3], hex('#2a4a8a'), VERDE[3], NOGAL[3]][k % 5]);
  R.rect(278, 38, 290, 51, HIERRO[3]); R.disco(284, 40, 5, HIERRO[3]); lin(289, 42, 294, 38, HIERRO[2]);
  for (const x of [164, 176]) { R.rect(x, 98, x + 8, 111, NOGAL[1]); R.rect(x, 108, x + 11, 111, NOGAL[1]); }
  R.disco(204, 102, 8, CREMA[4]); R.disco(204, 102, 6, CREMA[2]); lin(204, 94, 204, 74, ROBLE[1]);
  for (let k = 0; k < 5; k++) R.rect(222 + k * 10, 96, 230 + k * 10, 111, [CREMA[4], PAPEL[3], BLANCO[4]][k % 3]);
  for (let k = 0; k < 6; k++) { const x = 160 + k * 18; R.rect(x, 62, x + 12, 81, [ROBLE[2], HIERRO[2], BURDEOS[2]][k % 3]); }
  // el reloj de pared grande (con su caja de péndulo) y el perchero con abrigos empeñados
  R.rect(70, 58, 92, 112, NOGAL[2]); marco(70, 58, 92, 112, NOGAL[0]); R.disco(81, 70, 8, CREMA[5]); R.disco(81, 70, 9, NOGAL[4]); R.disco(81, 70, 8, CREMA[5]); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; ps(81 + Math.cos(a) * 6, 70 + Math.sin(a) * 6, K); }
  R.rect(74, 82, 88, 108, NOGAL[0]);
  lin(112, 60, 112, 150, ROBLE[1]); lin(113, 60, 113, 150, ROBLE[3]); R.poligono([[100, 66], [112, 62], [114, 104], [102, 108]], hex('#3a4a5a')); R.poligono([[114, 64], [126, 68], [124, 100], [114, 98]], BURDEOS[2]); lin(106, 150, 120, 150, ROBLE[1]);
  // la lámpara de techo
  lin(100, 22, 100, 34, HIERRO[1]); R.poligono([[92, 40], [108, 40], [104, 34], [96, 34]], VERDE[3]); R.rect(98, 40, 102, 43, VELA);
  // las papeletas numeradas que cuelgan de un cordel
  lin(60, 40, 140, 44, PAPEL[1]); for (let k = 0; k < 5; k++) { const x = 66 + k * 15; R.rect(x, 44, x + 9, 54, PAPEL[4]); dig(String(12 + k * 7), x + 1, 47, TINTA); }
  // el mostrador
  caja(140, 118, 319, 150, (x, y) => R.pset(x, y, y < 124 ? rmp(ROBLE, 4.6 - (y - 118) * 0.5, x, y) : rmp(ROBLE, 2.4 + ((x - 140) % 30 < 2 ? -1.2 : ((x - 140) % 30 > 4 && (x - 140) % 30 < 26 && y > 128 && y < 146 ? 0.4 : 0)) + (h2(x >> 2, y, 112) - 0.5) * 0.6, x, y)));
  tarima(0, 150, 319, 179, ROBLE);
}
const p11 = (t) => {
  fijo('p11', p11Fondo);
  // lo que se ve por la puerta: la calle gris con alguien que pasa
  R.recorte([16, 62, 46, 100]); caja(16, 62, 46, 100, (x, y) => ps(x, y, rmp(NIEVE, 2.2 + (y - 62) / 40 + (h2(x >> 1, y >> 1, 113) - 0.5) * 0.5, x, y))); for (let x = 16; x <= 46; x++) for (let y = 90; y <= 100; y++) ps(x, y, PIEDRA[2]);
  const px = ri(((t * 9) % 60) + 6), pb = Math.sin(t * 10) > 0 ? 1 : 0; R.disco(px, 84 - pb, 2, hex('#3a3a46')); R.poligono([[px - 3, 87 - pb], [px + 3, 87 - pb], [px + 3, 99], [px - 3, 99]], hex('#3a3a46')); R.poligono([[px - 4, 83 - pb], [px + 4, 83 - pb], [px + 2, 79 - pb], [px - 2, 79 - pb]], hex('#2a2a34')); R.recorte(null);
  lin(16, 81, 46, 81, ROBLE[1]); lin(31, 62, 31, 100, ROBLE[1]);
  // el péndulo del reloj grande
  { const a = Math.sin(t * 3.4) * 0.35; lin(81, 84, 81 + Math.sin(a) * 18, 84 + Math.cos(a) * 18, LATON[1]); R.disco(ri(81 + Math.sin(a) * 20), ri(84 + Math.cos(a) * 20), 3, LATON[3]); for (const [dx, dy] of [[-1, -1]]) ps(ri(81 + Math.sin(a) * 20) + dx, ri(84 + Math.cos(a) * 20) + dy, LATON[4]); }
  luz(100, 44, 40, VELA, 0.3);
  // el rayo de luz de la puerta
  motasLuz(t, 50, 70, 140, 150, 14, hex('#f0f0e0'), 11);
  // el prestamista detrás del mostrador
  const watchOn = t > W.ACCOUNT + 0.2, cand = t > W.COMFORT + 0.25, coins = tramo(t, W.REDUCED - 0.3, W.REDUCED + 0.2);
  R.actor(EL.joyero, 226, 130, t, { dir: -1, dedo: t > W.REDUCED - 0.4 && t < W.POVERTY, habla: t > W.COMFORT + 0.4 && t < W.REDUCED && Math.sin(t * 8) > 0 });
  // el mostrador por delante (frente y tablero) y lo que hay encima
  caja(140, 118, 319, 124, (x, y) => R.pset(x, y, rmp(ROBLE, 4.6 - (y - 118) * 0.5, x, y)));
  for (let x = 140; x <= 319; x++) ps(x, 118, ROBLE[5]);
  caja(140, 125, 319, 150, (x, y) => R.pset(x, y, rmp(ROBLE, 2.4 + ((x - 140) % 30 < 2 ? -1.2 : ((x - 140) % 30 > 4 && (x - 140) % 30 < 26 && y > 128 && y < 146 ? 0.4 : 0)) + (h2(x >> 2, y, 112) - 0.5) * 0.6, x, y)));
  R.rect(290, 112, 300, 117, LATON[2]); R.disco(295, 111, 3, LATON[3]);                       // la campanilla
  R.rect(250, 114, 276, 117, BURDEOS[2]); lin(250, 114, 276, 114, BURDEOS[4]);              // el libro de cuentas
  if (watchOn) { R.disco(168, 114, 4, LATON[2]); R.disco(168, 114, 3, CREMA[5]); ps(168, 114, K); ps(168, 112, K); ps(169, 114, K); lin(168, 110, 172, 106, LATON[3]); }
  if (cand) for (const x of [184, 192]) { lin(x, 117, x, 106, LATON[2]); lin(x - 2, 117, x + 2, 117, LATON[3]); }
  if (coins > 0) for (let k = 0; k < 3; k++) { const x = lerp(226, 150 + k * 5, ease(coins)); R.disco(ri(x), 115, 2, ORO[2]); ps(ri(x) - 1, 114, ORO[4]); }
  const q = pop(t, W.REDUCED, 0.35); if (q > 0 && t < W.POVERTY + 0.6) R.numero('$3', 156, ri(100 - q * 4), { tam: 16, centro: true });
  // el amigo mayor: entra, deja el reloj y los candeleros, coge las monedas y se va
  const entra = tramo(t, W.P11 + 0.1, W.ACCOUNT - 0.2), sale = tramo(t, W.POVERTY + 0.3, W.P12 + 0.1);
  const x = ri(sale > 0 ? lerp(128, 14, ease(sale)) : lerp(10, 128, ease(entra))), anda = (entra > 0 && entra < 1) || (sale > 0 && sale < 1);
  const deja = (t > W.ACCOUNT - 0.3 && t < W.ACCOUNT + 0.25) || (t > W.COMFORT - 0.3 && t < W.COMFORT + 0.3);
  const a = R.actor(EB.amigoMayorBL, x, 160, t, { dir: sale > 0 ? -1 : 1, anda, sostiene: deja ? [x + 26, 116] : undefined, triste: t > W.REDUCED + 0.4, sorpresa: t > W.REDUCED - 0.1 && t < W.REDUCED + 0.4 });
  if (t > W.ACCOUNT - 0.3 && t < W.ACCOUNT + 0.2) { R.disco(a.mano[0] + 2, a.mano[1], 3, LATON[2]); ps(a.mano[0] + 2, a.mano[1], CREMA[5]); }
  if (t > W.COMFORT - 0.3 && t < W.COMFORT + 0.25) { lin(a.mano[0] + 2, a.mano[1] + 2, a.mano[0] + 2, a.mano[1] - 8, LATON[2]); }
};

// ── 12 · EL CUARTO VACÍO DE 1885 ──
const O12 = { vacio: true, familia: true };
const p12 = (t) => {
  T.cuarto(R, t, O12);
  // la mujer y el niño llegan al umbral en «family»
  const f = tramo(t, W.FAMILY - 0.7, W.FAMILY + 0.1);
  R.actor(EL.ninoVictoriano, ri(lerp(-14, 30, ease(f))), 121, t, { dir: 1, anda: f > 0 && f < 1, triste: t > W.DOWN });
  R.actor(EB.mujerAmigoBL, ri(lerp(-30, 14, ease(f))), 121, t, { dir: 1, anda: f > 0 && f < 1, triste: t > W.DOWN, habla: t > W.DOWN + 0.4 && t < W.Y1885 && Math.sin(t * 7) > 0.2 });
  // el amigo, mayor, a la mesa: la cabeza baja; se vuelve a la puerta y se levanta en «In 1885»
  const lev = tramo(t, W.Y1885, W.Y1885 + 0.5);
  R.actor(EB.amigoMayorBL, 143, ri(122 + lev * 4 - (lev > 0 ? 0 : 0)), t, { dir: t > W.FAMILY + 0.3 ? -1 : 1, triste: t < W.Y1885, dedo: lev >= 1, sorpresa: t > W.FAMILY && t < W.FAMILY + 0.6 });
  T.cuartoDelante(R, t, O12);
};

// ── 13 · EL MANUSCRITO ──
function p13Fondo() {
  tablas(0, 0, 319, 179, pal(['#4a443c', '#5e564c', '#726a5e', '#868072', '#9a9486', '#aea89a']), 26, 5);
  // la luz gris de la ventana en un rectángulo sesgado
  caja(0, 0, 319, 179, (x, y) => { const d = x - 60 + y * 0.5; if (d > 0 && d < 150 && b4(x, y) < 0.3) aclara(x, y, hex('#e8ecf0'), 0.2); });
  // el cabo de vela apagado y frío, la taza vacía, el tintero
  vela(44, 70, 0, { alto: 2, apagada: true, luz: false }); for (let k = 0; k < 4; k++) ps(40 + k * 2, 71, BLANCO[3]);
  R.disco(60, 150, 8, BLANCO[3]); R.disco(60, 150, 6, BLANCO[5]); R.disco(60, 150, 4, hex('#5a3a20')); R.disco(69, 150, 3, BLANCO[3]);
  tintero(96, 118);
  for (let k = 0; k < 4; k++) hojaPapel(14 + k * 6, 92 + k * 4, 70 + k * 6, 132 + k * 4, { n: 6, k: 30 + k });
  // la Declaración enrollada con su cinta, las gafas, un quinqué frío y tres libros apilados
  caja(140, 40, 220, 47, (x, y) => R.pset(x, y, rmp(PAPEL, 1.6 + Math.sin((y - 40) / 7 * Math.PI) * 3, x, y))); R.rect(176, 40, 179, 47, BURDEOS[3]);
  for (const gx of [232, 246]) { R.disco(gx, 60, 4, K); R.disco(gx, 60, 3, hex('#4a5468')); ps(gx - 1, 59, BLANCO[5]); } lin(236, 59, 242, 59, K);
  R.disco(292, 60, 9, LATON[1]); R.disco(292, 60, 7, LATON[3]); R.disco(292, 60, 4, hex('#c8d0d8')); ps(290, 58, 0xffffffff);
  for (let k = 0; k < 3; k++) { const y = 170 - k * 7; R.rect(214 + k * 2, y, 254 - k, y + 6, [BURDEOS[3], hex('#2a4a6a'), VERDE[3]][k]); lin(214 + k * 2, y, 254 - k, y, LATON[2]); lin(216 + k * 2, y + 6, 254 - k, y + 6, PAPEL[4]); }
}
const p13 = (t) => {
  fijo('p13', p13Fondo);
  // la pila del manuscrito, que crece; la página de arriba se va escribiendo (la mitad de arriba ya está escrita)
  const u = tramo(t, W.P13, W.STORY + 0.4), pag = 1 + Math.floor(u * 22), fr = (u * 22) % 1;
  for (let k = 0; k < Math.min(pag, 12); k++) { const y = 172 - k; lin(112, y, 188, y, k % 2 ? PAPEL[3] : PAPEL[2]); ps(188, y, PAPEL[1]); }
  const top = 172 - Math.min(pag, 12) - 72;
  hojaPapel(112, top, 188, top + 72, { n: 10, ver: 0.5 + fr * 0.5, k: pag });
  dig(String(pag), 178, top + 64, TINTA);
  // la mano escribe la página (el brazo sale de abajo, corto)
  const fila = 5 + Math.floor(fr * 5) % 5, px = 116 + ((fr * 5) % 1) * 62, py = top + 5 + fila * 6.4;
  T.brazo(R, 132, 232, px - 9, py + 6, MANGA_VIEJO, 1, { codo: [120, 202] });
  lin(px - 5, py + 4, px + 1, py - 5, BLANCO[5]); lin(px - 4, py + 4, px + 2, py - 5, BLANCO[3]); lin(px + 2, py - 5, px + 5, py - 9, BLANCO[5]); ps(px, py, K);
  // las tres hojas de Beale en abanico, que Atom ata con una cinta roja en «tell»
  T.d_hoja(R, 250, 104, { n: 1, escala: 2, t }); T.d_hoja(R, 262, 110, { n: 2, escala: 2, t }); T.d_hoja(R, 274, 116, { n: 3, escala: 2, t });
  const c = tramo(t, W.TELL - 0.2, W.STORY - 0.1);
  if (c > 0) { const L = ri(c * 66); for (let i = 0; i <= Math.min(L, 66); i++) { ps(252 + i * 0.6, 84 + i, ROJO); ps(253 + i * 0.6, 84 + i, ROJOL); } if (c > 0.5) for (let i = 0; i < (c - 0.5) * 2 * 50; i++) { ps(242 + i, 116 + i * 0.1, ROJO); ps(242 + i, 117 + i * 0.1, BURDEOS[3]); }
    if (c >= 1) { R.disco(266, 118, 3, ROJO); R.poligono([[266, 118], [258, 112], [258, 124]], ROJOL); R.poligono([[266, 118], [274, 112], [274, 124]], ROJOL); lin(266, 118, 262, 130, ROJO); lin(266, 118, 272, 130, ROJO); } }
  // Atom llega por la mesa y ata la cinta
  const ll = tramo(t, W.DECIDES - 0.6, W.TELL - 0.25);
  AT.atom(R, ri(lerp(330, 296, ease(ll))), 168, t, { dir: -1, pose: ll > 0 && ll < 1 ? 'camina' : c > 0 && c < 1 ? 'sostiene' : c >= 1 ? 'saluda' : 'quieto', cara: c >= 1 ? 'sonrisa' : 'normal' });
};

// ── 14 · EL CAMINO AL ATARDECER ──
function p14Fondo() {
  const CA = pal(['#3a2a5a', '#6a3a6a', '#a04a5a', '#d06a4a', '#f09a4a', '#ffc870', '#fff0b0']);
  caja(0, 0, 319, 112, (x, y) => R.pset(x, y, rmp(CA, 0.4 + y / 112 * 5.6 + (h2(x >> 2, y >> 1, 141) - 0.5) * 0.5 - (tranq(x, y) ? 0.2 : 0), x, y)));
  // el sol bajo detrás de los picos
  R.disco(232, 104, 12, hex('#ffe8a0')); R.disco(232, 104, 9, hex('#fff6d0'));
  // los picos de Otter y la Blue Ridge en dos capas
  for (let x = 0; x < 320; x++) { const y1 = 92 - Math.round(Math.max(0, 30 - Math.abs(x - 140) * 0.5) + Math.max(0, 20 - Math.abs(x - 200) * 0.45) + Math.sin(x * 0.05) * 3); for (let y = y1; y < 112; y++) R.pset(x, y, rmp(pal(['#3a2a4a', '#4a3a5a', '#5a4a6a']), 1 + (h2(x >> 1, y >> 1, 142) - 0.5) * 0.6, x, y)); }
  for (let x = 0; x < 320; x++) { const y1 = 104 - Math.round(Math.sin(x * 0.03 + 1) * 5 + Math.sin(x * 0.11) * 2); for (let y = y1; y < 118; y++) R.pset(x, y, rmp(pal(['#2a2a3a', '#34384a', '#3e4658']), 1 + (h2(x >> 1, y, 143) - 0.5) * 0.6, x, y)); }
  // los campos dorados con surcos y la cerca en zigzag
  caja(0, 118, 319, 179, (x, y) => R.pset(x, y, rmp(pal(['#3a3a1a', '#5a5222', '#7a6a2a', '#9a8434', '#b8a042', '#d0b85a']), 2.4 + (y - 118) / 61 * 1.6 + Math.sin(x * 0.4 + y * 1.3) * 0.3 + (h2(x >> 1, y, 144) - 0.5) * 0.6, x, y)));
  // el camino de tierra que va hacia los picos
  for (let y = 118; y < 180; y++) { const g = (y - 118) / 62, cx = 230 - g * 150, w = 3 + g * 30; for (let x = ri(cx - w); x <= ri(cx + w); x++) R.pset(x, y, rmp(BARRO, 3.4 + (h2(x >> 1, y, 145) - 0.5) * 1 + (Math.abs(x - cx) > w * 0.8 ? -0.8 : 0), x, y)); }
  for (let k = 0; k < 24; k++) { const x = 6 + k * 13, y = 150 - (k % 2) * 6; lin(x, y, x + 13, 150 - ((k + 1) % 2) * 6, ROBLE[1]); lin(x, y - 5, x + 13, 145 - ((k + 1) % 2) * 6, ROBLE[2]); if (k % 2 === 0) lin(x, y - 9, x, y + 2, ROBLE[0]); }
  // una granja lejana con su ventana encendida y un árbol
  R.rect(40, 104, 62, 116, BLANCO[2]); R.poligono([[36, 104], [51, 96], [66, 104]], BURDEOS[1]); R.rect(46, 108, 49, 111, VELA);
  for (let k = 0; k < 60; k++) { const a = h2(k, 1, 146) * Math.PI * 2, r = Math.sqrt(h2(k, 2, 146)) * 12; ps(96 + Math.cos(a) * r, 98 + Math.sin(a) * r * 0.8, k % 3 ? hex('#3a4a2a') : hex('#5a5a2a')); }
  lin(96, 106, 96, 118, ROBLE[0]);
  // almiares y gavillas en el campo, un mojón de piedra y flores silvestres en la cuneta
  for (const [x, y, r] of [[270, 134, 9], [296, 140, 11], [128, 128, 6]]) { caja(x - r, y - r * 1.4, x + r, y, (xx, yy) => { const d = Math.hypot((xx - x) / r, (yy - y) / (r * 1.4)); if (d < 1) R.pset(xx, yy, rmp(pal(['#5a4a1a', '#8a7228', '#b89a3a', '#d8bc5a']), 1.2 + (1 - d) * 2 + (xx < x ? 0.5 : -0.3) + (h2(xx, yy, 147) - 0.5) * 0.8, xx, yy)); }); lin(x, ri(y - r * 1.4) - 3, x, ri(y - r * 1.4), ROBLE[1]); }
  R.rect(188, 158, 196, 170, PIEDRA[3]); R.rect(188, 156, 196, 158, PIEDRA[5]); dig('4', 191, 161, K);
  for (let k = 0; k < 40; k++) { const x = h2(k, 1, 148) * 320, y = 172 + h2(k, 2, 148) * 8; ps(x, y, [hex('#e8d040'), hex('#f0f0f0'), hex('#c84a8a')][k % 3]); ps(x, y + 1, hex('#3a4a1a')); }
  // la cancela de la granja del amigo
  for (const x of [26, 64]) { R.rect(x, 136, x + 3, 172, ROBLE[1]); lin(x, 136, x + 3, 136, ROBLE[4]); }
  for (const y of [142, 152, 162]) { lin(30, y, 63, y + (y === 152 ? 0 : 0), ROBLE[3]); lin(30, y + 1, 63, y + 1, ROBLE[1]); } lin(30, 142, 63, 162, ROBLE[2]);
}
const p14 = (t) => {
  fijo('p14', p14Fondo);
  nubes(t, [[0, 30, 46, 4], [1, 46, 34, 6], [2, 22, 30, 2.5]], 70, [hex('#ffd0a0'), hex('#e08a7a'), hex('#8a5a7a')]);
  pajaros(t, 6, 40, 14, 5, hex('#2a1e2a'));
  // el brillo del sol que late
  luz(232, 104, 30, hex('#fff0c0'), 0.25 + Math.sin(t * 2) * 0.05);
  // los buscadores que se van por el camino hacia los picos: uno con pala, otro con farol, la mula
  const v = tramo(t, W.P14 + 0.2, W.CAN + 0.8), xb = (d) => ri(lerp(196 - d, 392 - d, v)), anda = v > 0 && v < 1;
  T.b_mula(R, xb(78), 170, t, { dir: 1, anda, carga: true, color: 'tordo' });
  const b1 = R.actor(EB.buscadorBL, xb(0), 170, t, { dir: 1, anda, sostiene: true });
  lin(b1.mano[0], b1.mano[1] + 4, b1.mano[0] + 4, b1.mano[1] - 14, ROBLE[2]); R.poligono([[b1.mano[0] + 3, b1.mano[1] - 14], [b1.mano[0] + 8, b1.mano[1] - 20], [b1.mano[0] + 6, b1.mano[1] - 12]], HIERRO[3]);
  const b2 = R.actor(EB.cazador2BL, xb(38), 170, t, { dir: 1, anda, sostiene: true });
  lin(b2.mano[0], b2.mano[1], b2.mano[0], b2.mano[1] + 3, HIERRO[1]); R.rect(b2.mano[0] - 2, b2.mano[1] + 3, b2.mano[0] + 2, b2.mano[1] + 8, VELA); marco(b2.mano[0] - 2, b2.mano[1] + 3, b2.mano[0] + 2, b2.mano[1] + 8, HIERRO[0]);
  folletito([b2.mano[0] - 10, b2.mano[1] + 4], t);
  // el amigo mayor junto a la cancela: alza el folleto en «three sheets», señala en «others» y se queda en «no longer can»
  const alza = t > W.THREE - 0.2 && t < W.OTHERS, se = t > W.OTHERS && t < W.NOLONGER;
  const a = R.actor(EB.amigoMayorBL, 70, 174, t, { dir: 1, sostiene: alza ? [92, 140] : undefined, dedo: se, triste: t > W.NOLONGER, sonrisa: se });
  if (alza) folletito(a.mano, t);
};

const efectosM = [
  [W.LETTER, 'lapiz'], [W.MESSAGE + 0.1, 'brillo'],
  [W.DEPOSITED, 'pasos'], [W.FOUR, 'brillo'], [W.BUFORDS + 0.05, 'pop'],
  [W.EXCAV + 0.1, 'whoosh'], [W.SIX, 'pop'], [W.GROUND, 'brillo'],
  [W.GOLD, 'golpecito'], [W.SILVER, 'golpecito'], [W.JEWELS, 'brillo'],
  [W.STL - 0.1, 'pop'], [W.SILVER2, 'brillo'],
  [W.LOAD, 'golpecito'], [W.N13, 'brillo'], [W.N13 + 1.2, 'pasos'],
  [W.FEELS, 'palmada'], [W.NEARLY + 0.2, 'viento'],
  [W.RISE, 'brillo'], [W.DECADES, 'palmada'],
  [W.DECL, 'brillo'], [W.FIRST, 'aviso'], [W.THIRD, 'aviso'],
  [W.P10 + 0.3, 'papel'], [W.YEARS + 0.2, 'whoosh'],
  [W.P11 + 0.1, 'puerta'], [W.ACCOUNT, 'golpecito'], [W.REDUCED, 'pop'], [W.POVERTY + 0.5, 'pasos'],
  [W.FAMILY - 0.5, 'pasos'],
  [W.P13 + 0.1, 'lapiz'], [W.TELL, 'papel'],
  [W.P14 + 0.6, 'pasos'], [W.THREE, 'papel'],
];
const anyoM = (t) => t < W.P2 ? 1862 : t < W.P7 ? 1821 : t < W.P10 ? 1862 : t < W.P11 ? 1862 + Math.min(20, Math.floor(tramo(t, W.P10 + 0.1, W.P11 - 0.2) * 20)) : t < W.Y1885 ? 1884 : 1885;
T.rodar(E, R, [[0, p1], [W.P2, p2], [W.P3, p3], [W.P4, p4], [W.P5, p5], [W.P6, p6], [W.P7, p7], [W.P8, p8], [W.P9, p9], [W.P10, p10], [W.P11, p11], [W.P12, p12], [W.P13, p13], [W.P14, p14]], { efectos: efectosM, año: anyoM });
'''

CAB_FOLLETO = '''// BL-FOLLETO (frase 18), 1885, cartela «1885». Cuatro planos cortados en la voz inglesa:
// 1 · La prensa de cerca (fondo local): la platina baja en «pamphlet» y deja impresa la cubierta amarilla, que brilla en
//   «born»; la mano del impresor la saca en «Beale Papers» y la pone en la pila. Corta en «printed».
// 2 · La fachada de la imprenta (fondo local, calle de Lynchburg): pasa un carro por delante; Ward, en la puerta, alza
//   un folleto en «Ward»; un vecino le paga la moneda en «fifty cents» («50») y se va leyendo. Corta en «according».
// 3 · La imprenta (cuarto·imprenta, humo): Ward lo cuenta en «according to Ward»; la prensa se para, sale humo de la
//   puerta de atrás en «fire» y los folletos colgados se ennegrecen y caen; el impresor y Ward salen con los fardos (sin
//   llamas grandes ni nadie en peligro). Corta en «The odd thing».
// 4 · El periódico de 1885 (cuarto·imprenta·periodico): Atom recorre las columnas con la lupa; se para bajo el hueco
//   vacío, que se marca en «a single line» con la «?»; se encoge de hombros en «fire».'''

FOLLETO = r'''
// ── 1 · LA PRENSA DE CERCA ──
function f1Fondo() {
  ladrillos(0, 0, 319, 120, {});
  // el encalado que se pela: manchas grandes de bordes rotos, con su sombra
  caja(0, 0, 319, 120, (x, y) => { if (tranq(x, y)) return; const n = vn(x, y, 22, 151) * 0.65 + vn(x, y, 9, 152) * 0.25 + h2(x >> 1, y >> 1, 153) * 0.1; if (n > 0.56) aclara(x, y, BLANCO[4], 0.72); else if (n > 0.53) sombrea(x, y, 0.3); });
  // la balda con las latas de tinta y los cajetines de tipos
  R.rect(0, 40, 104, 43, ROBLE[4]); lin(0, 44, 104, 44, ROBLE[0]); for (let k = 0; k < 7; k++) { const x = 4 + k * 14; R.rect(x, 30, x + 9, 39, HIERRO[2 + (k % 2)]); lin(x, 30, x + 9, 30, HIERRO[4]); R.rect(x + 2, 33, x + 7, 36, [ROJO, hex('#2a4a8a'), K][k % 3]); }
  caja(0, 58, 104, 124, (x, y) => R.pset(x, y, ((x % 13 === 0) || ((y - 58) % 9 === 0)) ? ROBLE[0] : rmp(ROBLE, 2.6 + (h2(x >> 1, y, 152) - 0.5) * 1.2, x, y)));
  for (let k = 0; k < 56; k++) { const x = 2 + (k % 8) * 13, y = 60 + Math.floor(k / 8) * 9; for (let q = 0; q < 4; q++) ps(x + 2 + h2(k, q, 154) * 8, y + 2 + h2(k, q, 155) * 5, q % 2 ? HIERRO[3] : HIERRO[4]); }
  // el suelo de tablas manchado de tinta
  caja(0, 124, 319, 179, (x, y) => R.pset(x, y, rmp(PINO, 2.2 + (y - 124) / 56 + Math.sin(x * 0.05 + y * 0.8) * 0.2 + (h2(x >> 1, y, 153) - 0.5) * 0.6 + ((y - 124) % 13 === 0 ? -1.2 : 0), x, y)));
  for (let k = 0; k < 16; k++) { const x = h2(k, 1, 156) * 120, y = 132 + h2(k, 2, 156) * 44; R.disco(ri(x), ri(y), 1 + (k % 2), K); }
  // la mesa de entintar con la losa y el bote
  caja(54, 126, 126, 179, (x, y) => R.pset(x, y, y < 131 ? rmp(PIEDRA, 4.4 - (y - 126) * 0.6, x, y) : rmp(ROBLE, 2 + ((x - 54) % 24 === 0 ? -1 : 0) + (h2(x >> 1, y >> 2, 157) - 0.5) * 0.6, x, y)));
  caja(58, 122, 120, 127, (x, y) => R.pset(x, y, rmp(HIERRO, 1.2 + (h2(x, y, 158) - 0.5) * 1.4, x, y)));
  R.rect(104, 112, 116, 124, HIERRO[2]); R.rect(104, 112, 116, 114, HIERRO[4]); R.rect(106, 115, 114, 118, K);
  // las columnas de hierro de la prensa, el travesaño con el tornillo y la cama de piedra
  for (const x0 of [126, 246]) { caja(x0, 14, x0 + 12, 179, (x, y) => R.pset(x, y, rmp(HIERRO, 1.4 + (x - x0 < 3 ? 1.8 : x - x0 > 9 ? -0.5 : 0.4) + (h2(x, y >> 2, 159) - 0.5) * 0.3, x, y))); for (let y = 30; y < 180; y += 20) { R.disco(x0 + 6, y, 2, HIERRO[4]); ps(x0 + 6, y, K); } }
  caja(120, 14, 264, 26, (x, y) => R.pset(x, y, rmp(HIERRO, 1.6 + (y < 17 ? 1.6 : 0) + (h2(x >> 2, y, 160) - 0.5) * 0.3, x, y)));
  R.disco(192, 20, 4, LATON[3]); R.disco(192, 20, 2, LATON[1]);
  caja(138, 116, 246, 179, (x, y) => R.pset(x, y, rmp(PIEDRA, y === 116 ? 5.2 : y < 119 ? 4 : 3 + (h2(x >> 1, y >> 1, 161) - 0.5) * 0.8 - (y > 172 ? 0.8 : 0), x, y)));
  // el banco de la derecha donde se apilan los folletos
  R.rect(258, 156, 319, 162, ROBLE[3]); lin(258, 156, 319, 156, ROBLE[5]); for (const x of [262, 312]) R.rect(x, 162, x + 4, 179, ROBLE[1]);
}
const f1 = (t) => {
  fijo('f1', f1Fondo);
  // el rodillo de tinta que va y viene sobre la losa
  const rx = ri(64 + Math.sin(t * 1.6) * 10); R.rect(rx, 116, rx + 34, 121, HIERRO[0]); R.rect(rx + 1, 117, rx + 33, 118, HIERRO[2]); lin(rx + 17, 116, rx + 22, 100, ROBLE[2]); lin(rx + 18, 116, rx + 23, 100, ROBLE[4]);
  // la pila de folletos amarillos (crece con cada uno)
  const sacar = tramo(t, W.BEALE, W.PAPERS + 0.8), n = 9; for (let k = 0; k < n; k++) { const y = 155 - k * 2.4; R.rect(266, ri(y) - 2, 314, ri(y), k % 2 ? hex('#e8c048') : hex('#d8a830')); lin(266, ri(y) - 2, 314, ri(y) - 2, hex('#f8e078')); ps(314, ri(y), hex('#8a6a20')); }
  // el folleto: papel en blanco antes del golpe; impreso después, brilla en «born»; la mano lo saca a la pila
  const fx = lerp(192, 290, ease(sacar)), fy = lerp(146, 124, ease(sacar));
  if (t < W.PAMPHLET) { caja(172, 118, 212, 174, (x, y) => R.pset(x, y, rmp(PAPEL, 4.2 + (h2(x >> 1, y >> 1, 162) - 0.5) * 0.4, x, y))); marco(172, 118, 212, 174, PAPEL[1]); }
  else T.d_folleto(R, ri(fx), ri(fy), { escala: 2, t, brillo: tramo(t, W.BORN - 0.1, W.BORN + 0.3) * (1 - tramo(t, W.BORN + 0.9, W.BEALE)) });
  // la platina que baja en «pamphlet» y sube
  const baja = tramo(t, W.PAMPHLET - 0.3, W.PAMPHLET), sube = tramo(t, W.PAMPHLET + 0.15, W.BORN - 0.05), d = ease(baja) * (1 - ease(sube)), py = ri(lerp(34, 122, d));
  lin(190, 26, 190, py, HIERRO[4]); lin(191, 26, 191, py, HIERRO[2]); lin(194, 26, 194, py, HIERRO[1]);
  caja(146, py, 238, py + 50, (x, y) => R.pset(x, y, rmp(HIERRO, 1.8 + (y === py ? 2 : 0) + (x < 150 ? 1.2 : x > 234 ? -0.6 : 0) + (h2(x >> 2, y >> 1, 163) - 0.5) * 0.4 - (y > py + 46 ? 0.8 : 0), x, y)));
  for (let x = 156; x < 236; x += 16) for (const yy of [py + 6, py + 44]) { R.disco(x, yy, 2, HIERRO[4]); ps(x, yy, K); }
  if (d > 0.95) for (let k = 0; k < 8; k++) { ps(142 - k * 2, py + 46 + (k % 2), PIEDRA[5]); ps(242 + k * 2, py + 46 + (k % 2), PIEDRA[5]); }
  // la barra de la prensa, que tira el impresor (baja con la platina)
  const ang = -0.9 + d * 0.8; lin(258, 40, 258 + Math.cos(ang) * 52, 40 + Math.sin(ang) * 52, HIERRO[2]); lin(258, 41, 258 + Math.cos(ang) * 52, 41 + Math.sin(ang) * 52, HIERRO[0]); R.disco(ri(258 + Math.cos(ang) * 52), ri(40 + Math.sin(ang) * 52), 3, ROBLE[3]); R.disco(258, 40, 4, HIERRO[3]);
  // la mano del impresor (por abajo, a la derecha) coge la esquina y lo lleva a la pila
  if (t > W.BEALE - 0.6) { const ll = tramo(t, W.BEALE - 0.6, W.BEALE), wx = sacar > 0 ? fx + 20 : lerp(320, 212, ease(ll)), wy = sacar > 0 ? fy + 26 : lerp(196, 172, ease(ll));
    T.brazo(R, wx + 34, 214, wx, wy, MANGA_IMPR, -1, { codo: [wx + 26, 196] }); }
  motasLuz(t, 30, 30, 300, 120, 16, BLANCO[5], 15);
};

// ── 2 · LA FACHADA DE LA IMPRENTA ──
function f2Fondo() {
  caja(0, 0, 319, 34, (x, y) => R.pset(x, y, rmp(CIELO, 4.6 - y / 34 * 1.8 + (h2(x >> 2, y >> 1, 161) - 0.5) * 0.5, x, y)));
  // la fachada de ladrillo con su cornisa
  ladrillos(0, 30, 319, 142, {});
  caja(0, 28, 319, 33, (x, y) => R.pset(x, y, rmp(PIEDRA, y === 28 ? 5 : 3 - (y - 28) * 0.4 + (x % 8 === 0 ? -1 : 0), x, y)));
  // el rótulo de madera (sin letras: el dibujo de una prensa y de un libro)
  caja(56, 36, 204, 52, (x, y) => R.pset(x, y, rmp(VERDE, 2.6 + (y === 36 || y === 52 ? 1.6 : 0) + (h2(x >> 2, y, 162) - 0.5) * 0.4, x, y))); marco(56, 36, 204, 52, LATON[2]);
  R.rect(118, 39, 132, 49, LATON[3]); R.rect(120, 41, 130, 43, VERDE[1]); lin(125, 43, 125, 49, VERDE[1]); R.rect(140, 40, 150, 49, LATON[3]); lin(145, 40, 145, 49, VERDE[1]);
  for (const x of [72, 188]) { R.disco(x, 44, 3, LATON[3]); ps(x, 44, VERDE[1]); }
  // el escaparate: marco, cristal y lo de dentro (los folletos amarillos en filas)
  caja(58, 62, 170, 130, (x, y) => R.pset(x, y, rmp(pal(['#1a1a22', '#24242e', '#30303a', '#3c3c48']), 1.4 + (y - 62) / 68 + (h2(x >> 2, y >> 2, 163) - 0.5) * 0.4, x, y)));
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { const x = 64 + c * 17, y = 70 + r * 20; R.rect(x, y, x + 11, y + 15, hex('#e8c048')); R.rect(x + 2, y + 2, x + 9, y + 3, hex('#7a5a18')); R.rect(x + 2, y + 6, x + 9, y + 6, hex('#7a5a18')); R.rect(x + 4, y + 9, x + 7, y + 12, hex('#a07a28')); lin(x, y + 15, x + 11, y + 15, K); }
  caja(58, 62, 170, 130, (x, y) => { const d = (x - 58) + (y - 62) * 0.6; if ((d % 31 > 3 && d % 31 < 7) || d % 31 === 10) aclara(x, y, 0xffffffff, 0.18); });
  marco(56, 60, 172, 132, NOGAL[1]); marco(57, 61, 171, 131, NOGAL[3]); lin(114, 62, 114, 130, NOGAL[2]);
  relleno(52, 132, 176, 135, PIEDRA, (x, y) => (y === 132 ? 4.6 : 2.4));
  // la puerta con su cristal y el escalón
  caja(184, 62, 216, 142, (x, y) => R.pset(x, y, rmp(NOGAL, 2.4 + ((x - 184) % 16 === 0 ? -1 : 0) + (h2(x >> 1, y >> 2, 164) - 0.5) * 0.5, x, y)));
  caja(188, 68, 212, 96, (x, y) => R.pset(x, y, rmp(pal(['#2a2a36', '#3a3a48', '#4a4a5a']), 1 + (h2(x >> 1, y >> 1, 165) - 0.5) * 0.8, x, y)));
  marco(184, 62, 216, 142, K); R.disco(210, 112, 2, LATON[3]); relleno(180, 142, 220, 146, PIEDRA, (x, y) => (y === 142 ? 4.6 : 2.6));
  // la casa de al lado: ventana con visillos recogidos, el interior en penumbra, macetas de geranios en el alféizar
  caja(232, 64, 300, 128, (x, y) => R.pset(x, y, rmp(pal(['#2a2a34', '#3a3842', '#4a4650']), 1 + (h2(x >> 2, y >> 2, 168) - 0.5) * 0.8 + (y - 64) / 64, x, y)));
  for (const [x0, s0] of [[232, 1], [300, -1]]) caja(Math.min(x0, x0 + s0 * 22), 64, Math.max(x0, x0 + s0 * 22), 128, (x, y) => { const d = Math.abs(x - x0); if (d < 22 - (y - 64) * 0.18) R.pset(x, y, rmp(CREMA, 3.8 + Math.sin(d * 1.1) * 0.6, x, y)); });
  lin(232, 64, 300, 64, BLANCO[1]); marco(230, 62, 302, 130, BLANCO[2]); lin(266, 64, 266, 128, BLANCO[2]); lin(232, 96, 300, 96, BLANCO[2]);
  relleno(226, 130, 306, 133, PIEDRA, (x, y) => (y === 130 ? 4.6 : 2.4));
  for (const x of [240, 262, 286]) { R.rect(x, 122, x + 10, 129, LADR[4]); lin(x, 122, x + 10, 122, LADR[5]); for (let k = 0; k < 14; k++) ps(x + 1 + h2(k, x, 169) * 8, 114 + h2(k, 1, x) * 8, k % 3 ? hex('#3a7a3a') : ROJOL); }
  // el poste de atar y el abrevadero en la calle
  lin(30, 146, 30, 168, ROBLE[1]); lin(31, 146, 31, 168, ROBLE[3]); R.disco(30, 146, 2, LATON[2]);
  // la acera de losas y la calle de tierra
  caja(0, 142, 319, 158, (x, y) => R.pset(x, y, rmp(PIEDRA, 3.2 + ((x + (y > 150 ? 12 : 0)) % 24 === 0 || y === 150 ? -1.4 : 0) + (h2(x >> 1, y, 166) - 0.5) * 0.6, x, y)));
  for (let x = 0; x < 320; x++) { ps(x, 158, PIEDRA[5]); ps(x, 159, PIEDRA[1]); }
  caja(0, 160, 319, 179, (x, y) => { const ch = Math.hypot((x - 120) / 18, (y - 174) / 3); if (ch < 1) { R.pset(x, y, rmp(CIELO, 3 + (h2(x, y, 170) - 0.5), x, y)); return; }
    R.pset(x, y, rmp(BARRO, 3 + (y - 160) / 20 + Math.sin(x * 0.05 + y) * 0.3 + (h2(x >> 1, y, 167) - 0.5) * 0.8 + (Math.abs(y - 166) < 1 || Math.abs(y - 175) < 1 ? -1.2 : 0), x, y)); });
  for (let k = 0; k < 30; k++) { const x = h2(k, 1, 171) * 320, y = 162 + h2(k, 2, 171) * 16; ps(x, y, PIEDRA[4]); ps(x + 1, y, PIEDRA[1]); }
  // la farola
  lin(224, 60, 224, 150, HIERRO[1]); lin(225, 60, 225, 150, HIERRO[3]); R.rect(219, 50, 230, 60, HIERRO[1]); R.rect(221, 52, 228, 58, CREMA[4]);
}
const f2 = (t) => {
  fijo('f2', f2Fondo);
  nubes(t, [[0, 18, 40, 5], [1, 26, 30, 8], [2, 12, 26, 3]], 32);
  pajaros(t, 3, 4, 10, 7);
  // el toldo a rayas que se mece
  const ond = Math.sin(t * 3) * 1.2; for (let x = 56; x <= 172; x++) { const y1 = ri(56 + ond * Math.sin(x * 0.3)); for (let y = 52; y <= y1; y++) ps(x, y, (Math.floor((x - 56) / 6) % 2) ? BLANCO[4] : VERDE[3]); if ((x - 56) % 6 === 3) ps(x, y1 + 1, VERDE[2]); }
  // el cartel del 50 ¢ en el cristal
  R.rect(126, 96, 162, 120, BLANCO[5]); marco(126, 96, 162, 120, ROJO); dig('50', 131, 101, ROJO, 3); R.disco(157, 112, 3, ROJO); R.disco(157, 112, 2, BLANCO[5]); lin(157, 106, 157, 118, ROJO);
  // una paloma en el rótulo
  const pv = Math.sin(t * 2) > 0.6; R.rect(98, 32, 102, 35, PIEDRA[4]); ps(103, pv ? 32 : 33, PIEDRA[2]); ps(104, pv ? 32 : 33, ROJO);
  // Ward en la puerta, con un folleto en alto en «Ward»; el vecino llega, paga y se va leyendo
  const alza = t > W.WARD - 0.2;
  const w = R.actor(EB.wardBL, 172, 152, t, { dir: -1, sostiene: true, habla: t > W.AGENT && t < W.SOLD && Math.sin(t * 8) > 0, sonrisa: t > W.SOLD });
  if (t < W.CENTS) folletito(alza ? [w.mano[0], w.mano[1] - 4] : w.mano, t);
  const ll = tramo(t, W.F2 + 0.3, W.SOLD), va = tramo(t, W.CENTS + 0.5, W.F3 + 0.4), cx = ri(va > 0 ? lerp(126, -30, ease(va)) : lerp(-20, 126, ease(ll))), anda = (ll > 0 && ll < 1) || (va > 0 && va < 1);
  const c = R.actor(EL.caballero, cx, 154, t, { dir: va > 0 ? -1 : 1, anda, sostiene: t > W.FIFTY - 0.4 ? true : undefined, sonrisa: t > W.CENTS });
  if (t > W.FIFTY - 0.4 && t < W.FIFTY + 0.2) { R.disco(c.mano[0] + 2, c.mano[1], 2, BLANCO[4]); ps(c.mano[0] + 1, c.mano[1] - 1, 0xffffffff); }
  if (t > W.CENTS) folletito(c.mano, t);
  const q = pop(t, W.FIFTY, 0.3); if (q > 0 && t < W.FIFTY + 1.4) { dig('50', 140, ri(120 - q * 6), K, 3); dig('50', 139, ri(119 - q * 6), DORADO, 3); }
  // el carro que pasa por delante (de derecha a izquierda)
  const k = tramo(t, W.F2 + 0.2, W.WARD + 0.2), kx = ri(lerp(360, -140, k));
  if (k > 0 && k < 1) { T.b_mula(R, kx, 178, t, { dir: -1, anda: true, carga: false, color: 'bayo' });
    const cx0 = kx + 40; caja(cx0, 152, cx0 + 50, 166, (x, y) => R.pset(x, y, rmp(ROBLE, 2.6 + ((x - cx0) % 10 === 0 ? -1 : 0) + (y === 152 ? 1.4 : 0), x, y))); lin(kx + 22, 160, cx0, 160, ROBLE[1]);
    for (const wx of [cx0 + 10, cx0 + 40]) { R.disco(wx, 170, 8, ROBLE[1]); R.disco(wx, 170, 6, BARRO[2]); for (let s = 0; s < 4; s++) { const a = -t * 6 + s * Math.PI / 4; lin(wx - Math.cos(a) * 6, 170 - Math.sin(a) * 6, wx + Math.cos(a) * 6, 170 + Math.sin(a) * 6, ROBLE[2]); } R.disco(wx, 170, 1, HIERRO[2]); }
    R.actor(EL.granjero, cx0 + 18, 156, t, { dir: -1, quieto: false }); }
};

// ── 3 · LA IMPRENTA CON HUMO ──
const O3 = (t) => ({ encuadre: 'imprenta', humo: tramo(t, W.ALMOST, W.SHOP), imprime: t < W.ALMOST });
const f3 = (t) => {
  const o = O3(t), g = T.cuarto(R, t, o);
  // el humo que sale por la rendija de la puerta de atrás, sube y se extiende bajo el techo (sin llamas)
  if (o.humo > 0) for (let k = 0; k < 14; k++) { const u = ((t * 0.35 + k / 14) % 1), x = 120 + Math.sin(u * 5 + k) * 6 + u * u * (k % 2 ? 90 : -60), y = 112 - u * 92; if (u < o.humo + 0.1) bocanada(x, y, u, 4 + u * 5, k % 3 ? PIEDRA[3] : PIEDRA[2]); }
  // los folletos de las cuerdas se ennegrecen y algunos caen
  const h = o.humo; if (h > 0) caja(20, 22, 270, 52, (x, y) => { if (b4(x, y) < h * 0.55) sombrea(x, y, 0.45); });
  if (t > W.LOST) for (let k = 0; k < 7; k++) { const tk = W.LOST + k * 0.3, v = (t - tk) / 1.4; if (v <= 0 || v >= 1) continue; const x = 40 + k * 32 + Math.sin(v * 9 + k) * 6, y = 40 + v * 108; R.rect(ri(x), ri(y), ri(x) + 4, ri(y) + 5, mez(hex('#e8c048'), K, 0.4 + v * 0.4)); }
  // Ward lo cuenta; el impresor deja la prensa, mira la puerta de atrás y los dos sacan los fardos por delante
  const sal = tramo(t, W.FIRE + 0.2, W.F4 - 0.1), anda = sal > 0 && sal < 1;
  const xi = ri(sal > 0 ? lerp(222, 330, ease(sal)) : 222), xw = ri(sal > 0 ? lerp(74, 300, ease(sal)) : 74);
  const imp = R.actor(EB.impresorBL, xi, 148, t, { dir: t > W.ALMOST && sal <= 0 ? -1 : 1, anda, sostiene: t < W.ALMOST ? g.palanca : t > W.FIRE ? true : undefined, sorpresa: t > W.ALMOST + 0.2 && t < W.FIRE + 0.4 });
  const wd = R.actor(EB.wardBL, xw, 150, t, { dir: sal > 0 ? 1 : 1, anda, habla: t < W.ALMOST && Math.sin(t * 8) > 0, dedo: t > W.WARD2 && t < W.LOST, sostiene: t > W.FIRE ? true : undefined });
  for (const m of t > W.FIRE ? [imp.mano, wd.mano] : []) { R.rect(m[0] - 4, m[1] - 3, m[0] + 6, m[1] + 3, hex('#d8a830')); lin(m[0] - 4, m[1], m[0] + 6, m[1], ROBLE[1]); lin(m[0] + 1, m[1] - 3, m[0] + 1, m[1] + 3, ROBLE[1]); }
  T.cuartoDelante(R, t, o);
};

// ── 4 · EL PERIÓDICO DE 1885 ──
const O4 = (t) => ({ encuadre: 'imprenta', camara: 'periodico', hueco: tramo(t, W.SINGLE - 0.2, W.LINE + 0.4) });
const f4 = (t) => {
  const o = O4(t), g = T.cuarto(R, t, o);
  // Atom recorre el periódico con la lupa, columna a columna, y se para debajo del hueco en «a single line»
  const [hx, hy] = g.hueco ?? [155, 83];
  const r1 = tramo(t, W.F4 + 0.1, W.NOBODY), r2 = tramo(t, W.NOBODY + 0.2, W.FOUND), r3 = tramo(t, W.FOUND + 0.1, W.SINGLE - 0.1);
  const ax = r3 > 0 ? lerp(96, hx + 6, ease(r3)) : r2 > 0 ? lerp(214, 96, ease(r2)) : lerp(250, 214, ease(r1)), ay = r3 > 0 ? lerp(150, hy + 30, ease(r3)) : r2 > 0 ? 150 : lerp(170, 150, ease(r1));
  const anda = (r1 > 0 && r1 < 1) || (r2 > 0 && r2 < 1) || (r3 > 0 && r3 < 1), enc = t > W.FIRE2 - 0.1;
  const A = AT.atom(R, ri(ax), ri(ay), t, { dir: r2 > 0 && r3 <= 0 ? -1 : r3 > 0 ? 1 : -1, pose: enc ? 'brazos' : anda ? 'camina' : 'sostiene', cara: enc ? 'triste' : t > W.SINGLE ? 'sorpresa' : 'normal' });
  if (!enc && !anda) AT.lupa(R, A.mano[0], A.mano[1], 1, r2 > 0 && r3 <= 0 ? -1 : 1);
};

const efectosF = [[W.PAMPHLET, 'sello'], [W.BORN, 'brillo'], [W.BEALE, 'papel'],
  [W.F2 + 0.4, 'carro'], [W.WARD, 'papel'], [W.FIFTY, 'pop'],
  [W.F3 + 0.2, 'maquina'], [W.FIRE, 'rafaga'], [W.SHOP, 'pasos'],
  [W.F4 + 0.2, 'papel'], [W.SINGLE, 'brillo'], [W.FIRE2 + 0.2, 'boing']];
T.rodar(E, R, [[0, f1], [W.LYNCH, f2], [W.F3, f3], [W.F4, f4]], { efectos: efectosF, cartela: '1885', año: 1885 });
'''


E['bl-mensaje'] = ('El mensaje', CAB_MENSAJE, TM_JS + COMUN + PROPIO + MIO + MENSAJE)
E['bl-folleto'] = ('El folleto', CAB_FOLLETO, TF_JS + COMUN + PROPIO + MIO + FOLLETO)
