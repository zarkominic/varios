# Borrador de escenas del ep48 (grupo S2): bl-posada y bl-carta, con el movimiento ya hecho.
# Los instantes salen de las palabras de la voz inglesa (atomo/build/largo/ep48/linea.json), escritos como en('marca', f).
E = {}

MARCAS = {'beale': (1.5, 29.656), 'caja': (30.056, 57.516), 'carta': (0.2, 29.307), 'abre': (29.707, 53.913)}


def momentos(tabla):
    """const TG = {...}: cada instante (en s de la escena) como en('marca', fracción)"""
    out = []
    for nombre, (k, t) in tabla.items():
        a, b = MARCAS[k]
        out.append(f"{nombre}: en('{k}', {(t - a) / (b - a):.4f})")
    return 'const TG = { ' + ', '.join(out) + ' };\n'


# ── COMÚN a las dos escenas: utilidades, paletas y piezas pequeñas (madera, papel pintado, ventanas, velas…) ──
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

# ── las palabras de bl-posada que mandan (corte de plano o acción) ──
GP = {
    'LYN': ('beale', 1.72), 'TOWN': ('beale', 5.54), 'TOB': ('beale', 5.90), 'JAMES': ('beale', 7.40), 'P2': ('beale', 8.06),
    'INN': ('beale', 8.92), 'TALL': ('beale', 9.60), 'WELL': ('beale', 11.42), 'STAYS': ('beale', 12.32), 'WINTER': ('beale', 13.18),
    'P3': ('beale', 14.12), 'NEVER': ('beale', 15.04), 'FAMILY': ('beale', 16.86), 'WHERE': ('beale', 17.78), 'FROM': ('beale', 18.36),
    'P4': ('beale', 19.90), 'PAMPH': ('beale', 20.90), 'NAME': ('beale', 21.94), 'THOMAS': ('beale', 22.36), 'BEALE': ('beale', 23.44),
    'P5': ('beale', 24.50), 'MORRIS': ('beale', 25.62), 'SAY': ('beale', 26.80), 'HANDS': ('beale', 27.58), 'EVER': ('beale', 28.84), 'SEEN': ('beale', 29.12),
    'P6': ('caja', 30.06), 'Y1822': ('caja', 30.18), 'BACK': ('caja', 31.64), 'INN2': ('caja', 32.96), 'LEAVING': ('caja', 34.16),
    'P7': ('caja', 35.14), 'HANDS2': ('caja', 35.22), 'LOCKED': ('caja', 36.40), 'BOX': ('caja', 36.96), 'REQUEST': ('caja', 38.08), 'STRANGE': ('caja', 39.64),
    'P8': ('caja', 40.78), 'SAFE': ('caja', 41.18), 'TEN': ('caja', 42.50), 'NEITHER': ('caja', 43.26), 'COMP': ('caja', 44.74), 'COMES': ('caja', 45.20), 'OPEN': ('caja', 46.74),
    'P9': ('caja', 47.00), 'MORRIS2': ('caja', 48.48), 'WORD': ('caja', 49.96), 'PUTS': ('caja', 50.70), 'OFFICE': ('caja', 51.44),
    'P10': ('caja', 52.30), 'STAYS2': ('caja', 53.00), 'STILL': ('caja', 53.86), 'SILENT': ('caja', 54.36), 'GUEST': ('caja', 55.54), 'NEVER2': ('caja', 56.06), 'BILL': ('caja', 57.14),
}

LOCALES_P = r'''
// ── la habitación de Beale en la posada (fondo local, dos cámaras: 'puerta' de noche y 'espejo' de mañana) ──
const PARED_H = CREMA, RAYA_H = SALVIA;
function habPuertaFondo() {
  papelPintado(0, 0, 319, 104, PARED_H, RAYA_H, { per: 11, w: 3 });
  // la cornisa del techo
  caja(0, 0, 319, 5, (x, y) => R.pset(x, y, rmp(NOGAL, y < 3 ? 1 : 2.6, x, y)));
  caja(0, 6, 319, 7, (x, y) => R.pset(x, y, y === 6 ? CREMA[1] : CREMA[3]));
  friso(0, 104, 319, 136, PINO, { panel: 28 });
  tarima(0, 137, 319, 179, ROBLE, { h0: 2, hmax: 8 });
  // la puerta (x 22–56) con su marco y el pasillo oscuro detrás
  caja(16, 60, 62, 136, (x, y) => { const e = Math.min(x - 16, 62 - x, y - 60); if (e < 4) R.pset(x, y, rmp(PINO, e === 0 ? 0.6 : e === 1 ? 4.2 : 2.8, x, y)); });
  relleno(20, 64, 58, 136, NOGAL, (x, y) => 0.7 + (y - 64) / 72 * 0.6 + (h2(x >> 2, y >> 3, 3) - 0.5) * 0.4);
  // en el pasillo: la barandilla de la escalera y un aplique lejano
  for (let i = 0; i < 6; i++) lin(24 + i * 6, 104 - i * 4, 24 + i * 6, 116 - i * 4, NOGAL[3]);
  lin(22, 104, 58, 80, NOGAL[4]); ps(46, 76, VELA); ps(46, 77, CALIDA); ps(45, 78, LATON[2]); ps(47, 78, LATON[2]);
  // el perchero junto a la puerta
  lin(66, 70, 98, 70, PINO[4]); lin(66, 71, 98, 71, PINO[1]); for (const px of [70, 82, 94]) { ps(px, 72, LATON[3]); ps(px, 73, LATON[1]); }
  // la ventana con la nieve de noche
  cortina(96, 28, 104, 102, BURDEOS); cortina(150, 28, 158, 102, BURDEOS);
  ventana(104, 30, 150, 96, (a, b, c, d) => paisaje(a, b, c, d, { noche: true }), {});
  // el calendario
  // el cuadro sobre la cama
  cuadro(218, 40, 254, 64, 'rio');
  // la cama: cabecero a la derecha, pie a la izquierda, colcha de retales
  relleno(282, 84, 296, 150, NOGAL, (x, y) => 2.6 + (x === 282 || x === 296 ? -1.6 : 0) + Math.sin(y * 0.4) * 0.3 + (y < 88 ? 1.2 : 0));
  caja(280, 82, 298, 85, (x, y) => R.pset(x, y, NOGAL[y === 82 ? 5 : 3])); ps(289, 80, NOGAL[4]); ps(289, 81, NOGAL[3]);
  relleno(196, 106, 204, 150, NOGAL, (x, y) => 2.4 + (x === 196 || x === 204 ? -1.4 : 0) + (y < 110 ? 1.2 : 0));
  // el colchón y la colcha
  caja(204, 116, 282, 140, (x, y) => { let c;
    if (y < 120) c = rmp(BLANCO, 4 - (y - 116) * 0.4 + (h2(x, y, 2) - 0.5) * 0.4, x, y);
    else { const pi = Math.floor((x - 204) / 9), pj = Math.floor((y - 120) / 7), q = (pi + pj * 3) % 4, R4 = [BURDEOS, SALVIA, CREMA, pal(['#2a3450', '#34406a', '#405080', '#5064a0', '#6478b4', '#7a8cc4'])][q];
      const bx = (x - 204) % 9, by = (y - 120) % 7; c = rmp(R4, 3 - (y - 120) * 0.05 + ((bx + by) % 4 === 0 ? 0.6 : 0), x, y); if (bx === 0 || by === 0) c = mez(c, K, 0.3); }
    R.pset(x, y, c); });
  caja(204, 141, 282, 143, (x, y) => R.pset(x, y, BURDEOS[1 + ((x >> 2) & 1)]));
  // las almohadas
  for (const [ax, ay] of [[262, 108], [248, 110]]) relleno(ax, ay, ax + 18, ay + 8, BLANCO, (x, y) => 4.5 - Math.abs(y - ay - 4) * 0.4 + (x === ax || x === ax + 18 ? -1.5 : 0));
  // las patas y la sombra bajo la cama
  sombraCaja(204, 144, 282, 152, 0.5); for (const px of [198, 202, 284, 294]) lin(px, 150, px, 153, NOGAL[1]);
  // la mesilla con su vela
  relleno(166, 118, 188, 150, NOGAL, (x, y) => (y < 121 ? 4.2 : y < 123 ? 1 : 2.6 + (x === 166 || x === 188 ? -1.2 : 0) + (Math.abs(y - 134) < 1 ? -1.4 : 0)));
  ps(177, 128, LATON[3]); ps(177, 138, LATON[3]);
  relleno(170, 114, 182, 117, BURDEOS, (x, y) => (y === 114 ? 4 : 2.4));   // un libro
  // el baúl de viaje bajo la ventana
  relleno(104, 124, 142, 150, BURDEOS, (x, y) => 1.8 + (y < 127 ? 2.2 : y < 129 ? -0.8 : 0) + ((x - 104) % 12 === 0 ? -1.2 : 0) + (h2(x >> 1, y, 4) - 0.5) * 0.4);
  marco(103, 123, 143, 150, K); sombraCaja(100, 150, 146, 153, 0.5);
  for (const bx of [108, 138]) caja(bx, 124, bx + 1, 150, (x, y) => R.pset(x, y, HIERRO[2 + (y & 1)]));
  ps(123, 132, LATON[3]); ps(124, 132, LATON[2]); ps(123, 133, LATON[1]);
  // la alfombra trenzada
  alfombra(140, 162, 52, 11, [BURDEOS[3], SALVIA[3], CREMA[3], BURDEOS[2], SALVIA[2]]);
  // la luz de la luna en el suelo
  caja(96, 140, 170, 179, (x, y) => { const d = x - 104 - (y - 140) * 0.55; if (d > 0 && d < 46 && b4(x, y) < 0.35) aclara(x, y, NIEVE[3], 0.22); });
}
// devuelve la geometría; o.puerta 0–1 (cerrada → abierta), o.mes, o.flip (0–1 la hoja del calendario)
function habPuerta(t, o = {}) {
  fijo('habP', habPuertaFondo);
  // la nieve que cae al otro lado de la ventana y la que se acumula en el alféizar de fuera
  copos(106, 32, 148, 94, t, 26, 1 + (o.ventisca ?? 0) * 2);
  const ac = ri((o.monton ?? 0) * 6); for (let k = 0; k < ac; k++) lin(106, 94 - k, 148, 94 - k, NIEVE[3 + (k & 1)]);
  // el calendario de la pared
  calendario(164, 40, o.mes ?? 1, 1820, o.flip ?? 0);
  // la puerta que gira hacia la pared (su hoja se estrecha)
  const u = ease(cl(o.puerta ?? 1)), w = ri(36 * (1 - u * 0.78));
  relleno(21, 64, 21 + w, 136, PINO, (x, y) => 2.5 + (x === 21 + w ? -1.6 : 0) + (Math.abs(y - 100) < 1 ? -1.2 : 0) + ((x - 21) % Math.max(4, ri(w / 2)) === 0 ? -0.8 : 0) + (h2(x, y >> 2, 1) - 0.5) * 0.3);
  if (w > 6) { ps(21 + w - 3, 102, LATON[3]); ps(21 + w - 3, 103, LATON[1]); }
  // la vela de la mesilla
  vela(177, 113, t, { r: 26, a: 0.42 });
  return { suelo: 156, puerta: [40, 156] };
}
function habPuertaDelante(t) {
  // el respaldo de una silla en la esquina de abajo a la derecha
  relleno(300, 128, 319, 179, NOGAL, (x, y) => 2.4 + ((x - 300) % 6 === 0 ? -1.4 : 0) + (y < 132 ? 1.4 : 0));
  for (let y = 150; y < 180; y++) for (let x = 296; x < 300; x++) sombrea(x, y, 0.25);
}

// la otra pared de la habitación, de mañana: ventana con sol, el lavamanos con el espejo, el armario y la puerta
function habEspejoFondo() {
  papelPintado(0, 0, 319, 104, PARED_H, RAYA_H, { per: 11, w: 3 });
  caja(0, 0, 319, 5, (x, y) => R.pset(x, y, rmp(NOGAL, y < 3 ? 1 : 2.6, x, y)));
  caja(0, 6, 319, 7, (x, y) => R.pset(x, y, y === 6 ? CREMA[1] : CREMA[3]));
  friso(0, 104, 319, 136, PINO, { panel: 28 });
  tarima(0, 137, 319, 179, ROBLE, { h0: 2, hmax: 8 });
  cortina(16, 26, 24, 104, BURDEOS); cortina(78, 26, 86, 104, BURDEOS);
  ventana(24, 28, 78, 98, (a, b, c, d) => { paisaje(a, b, c, d, { alba: true }); }, {});
  // el sol de la mañana que entra y cae en el suelo
  caja(20, 98, 200, 179, (x, y) => { const d = x - 28 - (y - 98) * 0.9; if (d > 0 && d < 54 - (y - 98) * 0.1 && b4(x, y) < 0.42) aclara(x, y, hex('#fff0c8'), 0.24); });
  // el lavamanos: mesita con jofaina y jarra, toallero
  relleno(112, 112, 160, 150, NOGAL, (x, y) => (y < 115 ? 4.3 : y < 117 ? 1 : 2.5 + (x === 112 || x === 160 ? -1.3 : 0) + (Math.abs(y - 128) < 1 ? -1.4 : 0)));
  ps(136, 122, LATON[3]); sombraCaja(114, 150, 160, 154, 0.4);
  caja(118, 106, 140, 112, (x, y) => { const d = Math.hypot((x - 129) / 11, (y - 112) / 6); if (d < 1) R.pset(x, y, rmp(BLANCO, 4.4 - d * 2 + (y === 106 ? 0.6 : 0), x, y)); });
  for (let y = 98; y <= 111; y++) { const w = y < 101 ? 2 : y < 104 ? 3 + (y - 101) : 5 - Math.max(0, y - 108); lin(150 - w, y, 150 + w, y, rmp(BLANCO, 4 - (y - 98) * 0.1, 150, y)); ps(150 + w, y, BLANCO[1]); }
  lin(155, 101, 157, 104, BLANCO[2]); lin(157, 104, 155, 108, BLANCO[2]);
  // la toalla
  relleno(162, 106, 168, 132, BLANCO, (x, y) => 4 + (y % 5 === 0 ? -1 : 0) + (x === 168 ? -1.5 : 0));
  lin(160, 105, 170, 105, NOGAL[3]);
  // el espejo ovalado (lo de dentro se pinta en cada fotograma)
  caja(112, 52, 152, 98, (x, y) => { const d = Math.hypot((x - 132) / 20, (y - 75) / 23); if (d > 0.88 && d <= 1) R.pset(x, y, rmp(LATON, 2.4 + (x < 132 ? 0.8 : -0.4) - (d > 0.97 ? 1.6 : 0), x, y)); });
  ps(132, 50, LATON[3]); lin(132, 46, 126, 52, LATON[1]); lin(132, 46, 138, 52, LATON[1]);
  // el armario ropero
  relleno(196, 46, 262, 136, NOGAL, (x, y) => { let v = 2.4 + Math.sin(y * 0.3 + x * 0.05) * 0.3 + (h2(x >> 1, y >> 2, 6) - 0.5) * 0.4;
    if (y < 52) v = y < 48 ? 4.2 : 1.2; if (x === 196 || x === 262) v = 0.6; if (x === 229) v = 0.5; if (x === 230) v = 3.6;
    const px = x < 229 ? x - 196 : x - 230, py = y - 58; if (py >= 0 && py < 70 && px > 4 && px < 28 && (px === 5 || py === 0)) v = 1; if (py >= 0 && py < 70 && px > 4 && px < 28 && (px === 27 || py === 69)) v = 3.8; return v; });
  for (const kx of [225, 234]) { ps(kx, 94, LATON[3]); ps(kx, 95, LATON[1]); }
  relleno(200, 30, 222, 45, CREMA, (x, y) => 3.4 + (y === 30 ? 1 : 0) + (x === 200 || x === 222 ? -1.4 : 0));   // la sombrerera encima
  lin(200, 37, 222, 37, BURDEOS[3]);
  // la puerta del pasillo a la derecha (se abre en cada fotograma)
  caja(278, 60, 316, 136, (x, y) => { const e = Math.min(x - 278, 316 - x, y - 60); if (e < 4) R.pset(x, y, rmp(PINO, e === 0 ? 0.6 : e === 1 ? 4.2 : 2.8, x, y)); });
  relleno(282, 64, 312, 136, NOGAL, (x, y) => 0.8 + (h2(x >> 2, y >> 3, 3) - 0.5) * 0.4);
  ps(298, 80, VELA); ps(298, 81, CALIDA);
  // la silla con el gato
  relleno(170, 128, 186, 131, NOGAL, (x, y) => (y === 128 ? 4 : 2.2)); for (const px of [171, 185]) lin(px, 131, px, 150, NOGAL[2]);
  for (const px of [171, 175, 179, 183]) lin(px, 106, px, 128, NOGAL[3]); lin(170, 106, 186, 106, NOGAL[4]);
  alfombra(206, 160, 60, 10, [SALVIA[3], CREMA[3], BURDEOS[3], SALVIA[2], CREMA[4]]);
}
function habEspejo(t, o = {}) {
  fijo('habE', habEspejoFondo);
  copos(26, 30, 76, 96, t, 12, 0.4);
  // la puerta del pasillo, que gira hacia dentro
  const u = ease(cl(o.puerta ?? 0)), w = ri(30 * (1 - u * 0.8));
  relleno(312 - w, 64, 312, 136, PINO, (x, y) => 2.6 + (x === 312 - w ? -1.6 : 0) + (Math.abs(y - 100) < 1 ? -1.2 : 0) + (h2(x, y >> 2, 1) - 0.5) * 0.3);
  if (w > 6) { ps(312 - w + 3, 102, LATON[3]); ps(312 - w + 3, 103, LATON[1]); }
  // el gato de la silla: levanta la cabeza cuando o.gato
  const gx = 172, gy = 127, alza = o.gato ? 2 : 0;
  caja(gx, gy - 5, gx + 12, gy, (x, y) => { const d = Math.hypot((x - gx - 6) / 6, (y - gy + 2) / 3); if (d < 1) R.pset(x, y, d > 0.8 ? K : rmp(pal(['#3a2a20', '#5a4030', '#7a5a40', '#9a7854']), 2.4 - (y - gy + 5) * 0.3, x, y)); });
  T.gato(R, gx + 12, gy - 3 - alza, t, { dir: 1 });
  return { suelo: 152 };
}
// lo que se ve en el espejo (recortado a su óvalo): la pared de enfrente y el que se mira
function espejoDentro(t, f) {
  R.recorte([114, 54, 150, 96]);
  caja(114, 54, 150, 96, (x, y) => { const d = Math.hypot((x - 132) / 18, (y - 75) / 20.5); if (d < 1) R.pset(x, y, rmp(pal(['#5e5a4c', '#76705e', '#8e8872', '#a8a28a', '#c0baa2']), 2.8 - (y - 54) / 42 * 1 + (h2(x >> 1, y >> 1, 2) - 0.5) * 0.4, x, y)); });
  f();
  caja(114, 54, 150, 96, (x, y) => { const d = Math.hypot((x - 132) / 18, (y - 75) / 20.5); const r = (x - 114) + (y - 54) * 0.5; if (d < 1 && ((r % 19) > 3 && (r % 19) < 6)) aclara(x, y, 0xffffffff, 0.18); });
  R.recorte(null);
  caja(112, 52, 152, 98, (x, y) => { const d = Math.hypot((x - 132) / 20, (y - 75) / 23); if (d > 0.88 && d <= 1) R.pset(x, y, rmp(LATON, 2.4 + (x < 132 ? 0.8 : -0.4) - (d > 0.97 ? 1.6 : 0), x, y)); });
}

// ── la cuadra de la posada en 1822 (fondo local): la trasera de ladrillo, el establo, el patio de barro ──
function cuadraFondo() {
  // cielo tramado
  caja(0, 0, 319, 96, (x, y) => R.pset(x, y, rmp(CIELO, 4.8 - y / 96 * 2.6 + (h2(x >> 1, y >> 1, 4) - 0.5) * 0.4, x, y)));
  // colinas lejanas con su arboleda y el río
  for (let x = 0; x < 320; x++) { const a = 70 + Math.sin(x * 0.03 + 1) * 6 + Math.sin(x * 0.11) * 2, b = 86 + Math.sin(x * 0.05) * 3;
    for (let y = ri(a); y < 100; y++) R.pset(x, y, rmp(pal(['#4a5a5a', '#5a6c64', '#6c7e70', '#80927c']), 2.4 - (y - a) * 0.05 + (h2(x >> 1, y, 2) - 0.5) * 0.6, x, y));
    for (let y = ri(b); y < 100; y++) R.pset(x, y, rmp(PRADO, 2.6 + (h2(x, y, 7) > 0.8 ? 1 : 0) + Math.sin(x * 0.3 + y) * 0.3, x, y)); }
  for (const [tx, th] of [[132, 34], [176, 40], [150, 28]]) { lin(tx, 104, tx, 104 - th * 0.5, NOGAL[2]); lin(tx + 1, 104, tx + 1, 104 - th * 0.5, NOGAL[1]);
    for (let k = 0; k < 26; k++) { const a = h2(k, tx, 3) * Math.PI * 2, r = h2(k, tx, 4) * th * 0.42, bx = tx + Math.cos(a) * r, by = 104 - th * 0.6 + Math.sin(a) * r * 0.8; R.disco(ri(bx), ri(by), 3, PRADO[1 + (k % 3)]); ps(bx - 1, by - 2, PRADO[4 + (k % 2)]); } }
  for (let k = 0; k < 16; k++) { const tx = 110 + k * 6 + h2(k, 1, 5) * 4, ty = 88 + h2(k, 2, 5) * 4; R.disco(ri(tx), ri(ty), 2 + (k % 2), PRADO[1 + (k % 3)]); ps(tx - 1, ty - 1, PRADO[4]); }
  caja(120, 96, 200, 99, (x, y) => R.pset(x, y, rmp(pal(['#3a5a6a', '#5a7c88', '#8aaab0']), 1.2 + (h2(x >> 2, y, 3) > 0.6 ? 1 : 0) + (y === 96 ? 0.8 : 0), x, y)));
  // la trasera de la posada (ladrillo) a la izquierda
  caja(0, 30, 118, 142, (x, y) => { const fila = Math.floor((y - 30) / 4), off = fila % 2 ? 4 : 0, jx = (x + off) % 9 === 0, jy = (y - 30) % 4 === 0;
    let v = 2.8 + (h2(Math.floor((x + off) / 9), fila, 3) - 0.5) * 1.4 + (x > 112 ? -1 : 0); if (jx || jy) v = 0.7 + (h2(x, y, 1) > 0.7 ? 0.8 : 0); R.pset(x, y, rmp(LADR, v, x, y)); });
  caja(0, 30, 122, 35, (x, y) => R.pset(x, y, rmp(PIEDRA, y < 32 ? 1.4 : 3.6, x, y)));   // la cornisa
  // el tejado de pizarra que asoma (por debajo de la barra del año)
  caja(0, 22, 126, 29, (x, y) => { const f = Math.floor((y - 8) / 3), off = f % 2 ? 4 : 0; R.pset(x, y, rmp(pal(['#2a2e38', '#3a404c', '#4c5262', '#606878']), 2 - (y - 8) * 0.06 + ((x + off) % 8 === 0 || (y - 8) % 3 === 0 ? -1 : 0) + (h2(x >> 2, f, 2) - 0.5) * 0.7, x, y)); });
  // la chimenea de la cocina
  caja(2, 10, 14, 22, (x, y) => R.pset(x, y, rmp(LADR, 2.6 + ((x - 2) % 5 === 0 || y % 3 === 0 ? -1.6 : 0), x, y))); caja(1, 9, 15, 10, (x, y) => R.pset(x, y, PIEDRA[4]));
  // la puerta trasera (x 40–66) y la ventana de la cocina con su luz
  caja(38, 86, 68, 142, (x, y) => { const e = Math.min(x - 38, 68 - x, y - 86); if (e < 3) R.pset(x, y, rmp(PINO, e === 0 ? 0.6 : 3.6, x, y)); });
  relleno(41, 89, 65, 142, PINO, (x, y) => 2.2 + ((x - 41) % 6 === 0 ? -1.3 : 0) + (h2(x, y >> 2, 1) - 0.5) * 0.4 + (Math.abs(y - 100) < 1 || Math.abs(y - 128) < 1 ? 1.2 : 0));
  ps(61, 116, LATON[3]); ps(61, 117, LATON[1]);
  ventana(80, 56, 104, 84, (a, b, c, d) => relleno(a, b, c, d, pal(['#3a2a1a', '#5a3e22', '#8a5e30', '#c08a44']), (x, y) => 1.4 + (y - b) / (d - b) * 1.6 + (h2(x >> 1, y >> 1, 2) - 0.5) * 0.6), { filas: 2 });
  // el barril de agua de lluvia y la leña
  relleno(70, 118, 84, 142, ROBLE, (x, y) => 2.5 + Math.cos((x - 77) / 7 * 1.5) * 1.2 - 1 + ((y - 118) % 8 === 0 ? -1.4 : 0));
  for (const yy of [122, 132, 140]) lin(70, yy, 84, yy, HIERRO[2]);
  for (let k = 0; k < 14; k++) { const lx = 4 + (k % 7) * 4.6, ly = 140 - Math.floor(k / 7) * 5; R.disco(ri(lx + 2), ri(ly - 2), 2, PINO[2 + (k % 2)]); ps(lx + 2, ly - 2, PINO[5]); ps(lx + 1, ly - 3, PINO[4]); }
  // la valla del fondo entre la posada y el establo
  for (let x = 122; x < 200; x += 5) { lin(x, 104, x, 124, PINO[3]); ps(x, 103, PINO[4]); lin(x + 1, 105, x + 1, 124, PINO[1]); }
  lin(122, 109, 200, 109, PINO[2]); lin(122, 118, 200, 118, PINO[2]);
  // el establo de tablas a la derecha
  caja(198, 52, 319, 142, (x, y) => { const tb = Math.floor((x - 198) / 6), u = (x - 198) % 6; let v = 2.4 + (h2(tb, 1, 9) - 0.5) * 1 + Math.sin(y * 0.2 + tb) * 0.2 + (h2(x, y >> 2, 2) - 0.5) * 0.4; if (u === 0) v = 0.6; if (u === 1) v += 0.8; R.pset(x, y, rmp(PINO, v, x, y)); });
  // su tejado a dos aguas (se queda por debajo de y 46 en la esquina de Atom)
  for (let y = 46; y <= 56; y++) for (let x = 192; x < 320; x++) { const f = Math.floor((y - 46) / 3); R.pset(x, y, rmp(pal(['#3a2a1e', '#523a26', '#6a4c30', '#82603c']), 2.6 - (y - 46) * 0.08 + ((x + (f % 2) * 4) % 8 === 0 || (y - 46) % 3 === 0 ? -1.2 : 0), x, y)); }
  lin(192, 57, 319, 57, K); for (let x = 194; x < 320; x++) sombrea(x, 58, 0.4);
  // el pajar con su heno
  relleno(236, 62, 268, 86, NOGAL, (x, y) => 0.8 + (h2(x >> 1, y >> 1, 3) - 0.5) * 0.4);
  marco(234, 60, 270, 88, PINO[4]);
  for (let k = 0; k < 60; k++) { const hx = 238 + h2(k, 1, 4) * 28, hy = 72 + h2(k, 2, 4) * 14; lin(hx, hy, hx + 3 - h2(k, 3, 4) * 6, hy + 3, k % 3 ? hex('#d8b850') : hex('#a88a30')); }
  lin(252, 58, 252, 52, HIERRO[3]); lin(248, 52, 256, 52, HIERRO[3]); ps(252, 51, HIERRO[4]);   // la polea
  // las dos cuadras con su media puerta
  for (const [x0, x1] of [[206, 242], [262, 298]]) {
    relleno(x0, 98, x1, 142, NOGAL, (x, y) => 0.6 + (h2(x >> 2, y >> 2, 4) - 0.5) * 0.4);
    caja(x0, 120, x1, 142, (x, y) => { const tb = (x - x0) % 7; R.pset(x, y, rmp(PINO, tb === 0 ? 0.6 : 2.6 + (h2(Math.floor((x - x0) / 7), 3, 2) - 0.5) + (y === 120 ? 1.6 : 0), x, y)); });
    lin(x0, 122, x1, 140, PINO[1]); lin(x0, 140, x1, 122, PINO[1]);
    marco(x0 - 1, 96, x1 + 1, 142, PINO[4]); }
  // arreos colgados y un farol
  R.disco(253, 112, 4, NOGAL[3]); R.disco(253, 112, 2, PINO[2]); lin(253, 106, 253, 108, HIERRO[3]);
  // el patio de barro con paja, rodadas y charcos
  caja(0, 142, 319, 179, (x, y) => { let v = 2.6 + (y - 142) / 38 * 1 + (h2(x >> 1, y >> 1, 8) - 0.5) * 0.8 + Math.sin(x * 0.07 + y * 0.3) * 0.2;
    if (Math.abs(y - 160 - Math.sin(x * 0.02) * 3) < 1.2 || Math.abs(y - 170 - Math.sin(x * 0.02 + 1) * 3) < 1.2) v -= 1.2; R.pset(x, y, rmp(BARRO, v, x, y)); });
  for (const [cx, cy, rx] of [[96, 166, 16], [236, 172, 22], [30, 158, 10]]) caja(cx - rx, cy - 4, cx + rx, cy + 4, (x, y) => { const d = Math.hypot((x - cx) / rx, (y - cy) / 3.6); if (d < 1) R.pset(x, y, rmp(CIELO, d > 0.8 ? 1 : 2.6 + (h2(x, y, 3) > 0.8 ? 1.5 : 0), x, y)); });
  for (let k = 0; k < 70; k++) { const px = h2(k, 5, 8) * 320, py = 145 + h2(k, 6, 8) * 34; lin(px, py, px + 2 - h2(k, 7, 8) * 4, py + 1, k % 2 ? hex('#c8a848') : hex('#9a7e34')); }
  // la sombra del establo y la de la posada
  caja(198, 142, 319, 148, (x, y) => { if (b4(x, y) < 0.6) sombrea(x, y, 0.3); });
  // el abrevadero y el poste de atar
  relleno(150, 136, 186, 148, ROBLE, (x, y) => 2.4 + (y === 136 ? 1.6 : 0) + ((x - 150) % 9 === 0 ? -1.2 : 0));
  lin(151, 137, 185, 137, pal(['#5a7c88'])[0]);
  relleno(134, 112, 137, 150, PINO, (x, y) => 2.4 + (x === 134 ? -1.2 : 0) + (y === 112 ? 1.6 : 0));
}
function cuadra(t, o = {}) {
  fijo('cuadra', cuadraFondo);
  // nubes de tres tonos a tres velocidades y pájaros
  nubes(t, [[0, 22, 40, 1.2], [1, 34, 30, 2.0], [2, 44, 24, 3.2], [3, 28, 46, 1.6], [4, 40, 20, 2.6]], 46);
  for (let k = 0; k < 3; k++) { const bx = ((t * (14 + k * 3) + k * 70) % 240) + 40, by = 30 + k * 7 + Math.sin(t * 2 + k) * 2, a = Math.sin(t * 12 + k) > 0; if (tranq(bx, by)) continue; ps(bx, by, K); ps(bx - 1, by - (a ? 1 : 0), K); ps(bx + 1, by - (a ? 1 : 0), K); ps(bx - 2, by - (a ? 0 : 1), K); ps(bx + 2, by - (a ? 0 : 1), K); }
  // el humo de la chimenea de la cocina
  for (let k = 0; k < 7; k++) { const u = ((t * 0.35 + k / 7) % 1), sx = 8 - u * 10 + Math.sin(t + k) * 2, sy = 7 - u * 12; R.disco(ri(sx), ri(sy), 2 + u * 2, mez(NIEVE[3], CIELO[3], u)); }
  // el caballo del establo que asoma por la media puerta y cabecea
  const cab = Math.sin(t * 1.6) * 1.5;
  caja(270, 104 + cab, 286, 120, (x, y) => { const d = Math.hypot((x - 278) / 7, (y - 112 - cab) / 8); if (d < 1) R.pset(x, y, d > 0.86 ? K : rmp(pal(['#3a2418', '#5a3a24', '#7a5032', '#946444']), 2.4 - (x - 270) * 0.06, x, y)); });
  caja(272, 112 + cab, 278, 122 + cab, (x, y) => R.pset(x, y, rmp(pal(['#3a2418', '#5a3a24', '#7a5032']), 1.6, x, y)));
  ps(275, 109 + cab, K); ps(270, 103 + cab, K); ps(284, 103 + cab, K); ps(273, 120 + cab, K);
  // gallinas que picotean en el patio
  for (const [gx0, k] of [[196, 0], [214, 1], [112, 2]]) { const gx = gx0 + Math.sin(t * 0.5 + k * 2) * 8, gy = 164 + k * 3, pica = Math.sin(t * 5 + k * 1.7) > 0.4, dir = Math.cos(t * 0.5 + k * 2) > 0 ? 1 : -1;
    R.disco(ri(gx), ri(gy - 3), 3, BLANCO[4]); ps(gx - 3 * dir, gy - 4, BLANCO[3]); ps(gx - 3 * dir, gy - 5, BLANCO[4]);
    const hx = gx + 3 * dir, hy = gy - (pica ? 2 : 6); R.disco(ri(hx), ri(hy), 1, BLANCO[5]); ps(hx, hy - 2, ROJO); ps(hx + 2 * dir, hy, DORADO); ps(hx + dir, hy - 1, K);
    lin(gx - 1, gy, gx - 1, gy + 2, DORADO); lin(gx + 1, gy, gx + 1, gy + 2, DORADO); }
  return { suelo: 156 };
}

// ── los insertos de bl-posada ──
// la mesa del comedor de cerca, con lo de Beale (sombrero de copa, guantes) y la jarra; detrás, la pared encalada
function mesaComedorFondo() {
  caja(0, 0, 319, 70, (x, y) => R.pset(x, y, rmp(YESO, 3.6 - (1 - y / 70) * 1 + (h2(x >> 2, y >> 2, 3) - 0.5) * 0.7 + (h2(x, y, 9) > 0.96 ? -1 : 0), x, y)));
  caja(0, 0, 319, 9, (x, y) => R.pset(x, y, rmp(NOGAL, 1.6 + (y === 9 ? -1 : 0) + Math.sin(x * 0.2) * 0.3, x, y)));   // la viga
  // el friso de tablas al fondo
  caja(0, 52, 319, 70, (x, y) => R.pset(x, y, rmp(PINO, y < 54 ? 4 : 2.2 + ((x % 14) === 0 ? -1.2 : 0) + (h2(x >> 1, y, 2) - 0.5) * 0.4, x, y)));
  // la balda con platos de peltre y jarras, la ventana nevada y los manojos de tabaco colgados de la viga
  relleno(22, 40, 150, 43, PINO, (x, y) => (y === 40 ? 4.4 : y === 41 ? 3 : 1.2)); for (const bx of [30, 142]) { lin(bx, 44, bx + 4, 44, PINO[1]); lin(bx + 4, 44, bx + 4, 48, PINO[1]); }
  for (let k = 0; k < 5; k++) { const px = 34 + k * 22; R.disco(px, 31, 8, PIEDRA[1]); R.disco(px, 31, 7, PIEDRA[4]); R.disco(px, 31, 4, PIEDRA[3]); ps(px - 3, 27, PIEDRA[6]); ps(px - 4, 28, PIEDRA[5]); }
  for (const mx of [45, 89, 133]) { relleno(mx - 3, 32, mx + 3, 39, PIEDRA, (x, y) => 3.2 + (x === mx - 3 ? 1.4 : x === mx + 3 ? -1.4 : 0) + (y === 32 ? 1.6 : 0)); lin(mx + 4, 34, mx + 5, 37, PIEDRA[2]); }
  cortina(178, 12, 184, 50, BURDEOS); cortina(236, 12, 242, 50, BURDEOS);
  ventana(184, 14, 236, 48, (a, b, c, d) => paisaje(a, b, c, d, { noche: true }), { filas: 2 });
  for (let k = 0; k < 3; k++) { const tx = 250 + k * 8; lin(tx, 9, tx, 13, hex('#6a5030')); for (let j = 0; j < 13; j++) { const w = Math.min(3, j / 3); lin(tx - w, 13 + j, tx + w, 13 + j, rmp(pal(['#4a3018', '#6e4a24', '#8e6430', '#a87a3c']), 1.6 + (j % 3 === 0 ? 1 : 0), tx, 13 + j)); } }
  mesaCerca(70, 168, ROBLE, { canto: 10 });
  // el sombrero de copa de Beale (x 236–268) y sus guantes
  caja(238, 96, 266, 128, (x, y) => { let c; const j = y - 96;
    if (j < 26) { const v = 1.2 + (x < 246 ? 0.6 : 0) + (x === 244 ? 1.6 : 0) + (j === 0 ? 1.4 : 0); c = rmp(pal(['#0e0c12', '#1a1820', '#2a2832', '#3c3a46']), v, x, y); if (j > 18 && j < 22) c = BURDEOS[2]; if (x === 238 || x === 266) c = K; }
    else c = rmp(pal(['#0e0c12', '#1a1820', '#2a2832']), 1, x, y);
    R.pset(x, y, c); });
  caja(232, 122, 272, 128, (x, y) => { const d = Math.hypot((x - 252) / 20, (y - 125) / 3.4); if (d < 1) R.pset(x, y, rmp(pal(['#0e0c12', '#1a1820', '#2a2832', '#3c3a46']), 1.4 + (y < 125 ? 1 : 0) - (d > 0.85 ? 1 : 0), x, y)); });
  sombraCaja(234, 129, 278, 133, 0.45);
  for (const [gx, gy] of [[272, 140], [280, 146]]) relleno(gx, gy, gx + 16, gy + 6, pal(['#6a4a2a', '#8a6438', '#a87e4a', '#c49a60']), (x, y) => 2 + (y === gy ? 1 : 0) + ((x - gx) % 4 === 0 && y > gy + 3 ? -1 : 0));
  // la jarra de peltre y el plato con pan
  caja(26, 92, 46, 124, (x, y) => { const w = 8 + (y > 100 ? 2 : 0); if (Math.abs(x - 36) <= w) R.pset(x, y, rmp(PIEDRA, 3 + (x - 36) / w * -1.6 + (Math.abs(x - 32) < 1 ? 2 : 0), x, y)); });
  lin(46, 98, 50, 104, PIEDRA[3]); lin(50, 104, 46, 116, PIEDRA[3]); lin(47, 98, 51, 104, PIEDRA[1]);
  caja(52, 124, 100, 140, (x, y) => { const d = Math.hypot((x - 76) / 24, (y - 132) / 8); if (d < 1) R.pset(x, y, rmp(PIEDRA, d > 0.82 ? 4.6 : 3.4 + (h2(x, y, 2) - 0.5) * 0.3, x, y)); });
  caja(64, 120, 90, 134, (x, y) => { const d = Math.hypot((x - 77) / 13, (y - 128) / 6); if (d < 1) R.pset(x, y, rmp(pal(['#6a3e1a', '#8a5426', '#aa6e34', '#c88c4a', '#e0ac68']), 3 - (y - 122) * 0.15 + (Math.abs(x - 73) < 1 || Math.abs(x - 81) < 1 ? -1.2 : 0), x, y)); });
  sombraCaja(24, 125, 50, 129, 0.4);
}
// el escritorio de Morriss de cerca, en 1822 (para la caja que deja Beale): pared de paneles, el libro de cuentas,
// el tintero, monedas, las gafas y un candelero
function escritorioFondo() {
  caja(0, 0, 319, 58, (x, y) => { const pw = 40, px = x % pw; let v = 2.2 + (h2(x >> 1, y >> 2, 3) - 0.5) * 0.5 + (1 - y / 58) * -0.6; if (px < 2) v = px ? 3.8 : 0.8; if (y % 30 < 2) v = 0.8 + (y % 30) * 2.8; R.pset(x, y, rmp(NOGAL, v + 1, x, y)); });
  caja(0, 54, 319, 58, (x, y) => R.pset(x, y, rmp(NOGAL, y === 54 ? 5 : 1.4, x, y)));
  // los casilleros con cartas y legajos a la izquierda (x 6–84)
  relleno(6, 22, 84, 53, NOGAL, (x, y) => 0.6 + (h2(x >> 1, y >> 1, 2) - 0.5) * 0.4);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { const cx = 8 + i * 19, cy = 24 + j * 15; marco(cx - 1, cy - 1, cx + 17, cy + 13, NOGAL[4]);
    for (let k = 0; k < 3 + ((i + j) % 2); k++) relleno(cx + 1 + k * 4, cy + 3 + (k % 2), cx + 3 + k * 4, cy + 12, PAPEL, (x, y) => 3.6 - k * 0.3 + (y === cy + 3 ? 1 : 0));
    if ((i + j) % 3 === 0) { lin(cx + 2, cy + 8, cx + 14, cy + 8, ROJO); } }
  // el reloj de pared redondo (x 112) y el mapa de Virginia enmarcado sin letras
  R.disco(112, 32, 13, NOGAL[1]); R.disco(112, 32, 11, NOGAL[4]); R.disco(112, 32, 9, BLANCO[4]); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; ps(112 + Math.cos(a) * 7.5, 32 + Math.sin(a) * 7.5, K); }
  lin(112, 32, 112, 26, K); lin(112, 32, 116, 33, K); ps(112, 32, ROJO); lin(112, 45, 112, 52, LATON[2]); R.disco(112, 52, 2, LATON[3]);
  caja(140, 22, 196, 50, (x, y) => { const e = Math.min(x - 140, 196 - x, y - 22, 50 - y); if (e < 3) { R.pset(x, y, rmp(LATON, e === 0 ? 0.4 : 2.4, x, y)); return; }
    const tierra = Math.sin(x * 0.12) * 4 + 36 - (x - 140) * 0.15 > y - 0 || x < 176; R.pset(x, y, tierra ? rmp(PAPEL, 3.4 + (h2(x >> 1, y >> 1, 5) - 0.5) * 0.6, x, y) : rmp(pal(['#5a7a8a', '#7a9aa8', '#9abac4']), 1.4 + (h2(x, y, 3) > 0.7 ? 1 : 0), x, y)); });
  for (let x = 145; x < 176; x++) ps(x, 36 + Math.sin(x * 0.3) * 2 + (x - 145) * 0.1, pal(['#3a6a9a'])[0]);
  R.disco(160, 37, 1, ROJO);
  mesaCerca(59, 168, PINO, { canto: 10 });
  // el libro de cuentas abierto a la izquierda
  caja(14, 116, 96, 158, (x, y) => { const lomo = Math.abs(x - 55) < 1; R.pset(x, y, lomo ? PAPEL[1] : rmp(PAPEL, 4 - Math.abs(x - 55) * -0.01 + (h2(x >> 1, y, 4) - 0.5) * 0.3, x, y)); });
  marco(14, 116, 96, 158, BURDEOS[2]); lin(14, 159, 96, 159, BURDEOS[1]);
  for (let r = 0; r < 8; r++) { const yy = 121 + r * 4.6; for (let x = 18; x < 52; x++) if (h2(x, r, 3) > 0.25) ps(x, yy, TINTA); for (let x = 59; x < 92; x++) if (h2(x, r, 6) > 0.25) ps(x, yy, x > 84 ? ROJO : TINTA); }
  tintero(108, 146);
  // un montón de cartas atadas, la pipa de barro y una bolsita de monedas
  for (let k = 0; k < 3; k++) relleno(124 + k, 100 - k * 3, 160 + k, 112 - k * 3, PAPEL, (x, y) => 3.8 - k * 0.3 + (y === 100 - k * 3 ? 1 : 0) + (x === 124 + k ? -1 : 0));
  lin(142, 92, 142, 112, ROJO); lin(125, 104, 161, 104, ROJO); sombraCaja(124, 113, 162, 115, 0.4);
  lin(30, 96, 54, 92, BLANCO[4]); lin(30, 97, 54, 93, BLANCO[2]); R.disco(56, 92, 3, BLANCO[4]); R.disco(56, 91, 2, NOGAL[1]);
  caja(66, 92, 82, 106, (x, y) => { const d = Math.hypot((x - 74) / 8, (y - 100) / 7); if (d < 1) R.pset(x, y, rmp(pal(['#4a3420', '#6a4c2e', '#8a6640', '#a88052']), 2.6 - (y - 92) * 0.1 + (x < 72 ? 0.6 : 0), x, y)); });
  lin(70, 93, 78, 93, K); lin(74, 90, 74, 93, BURDEOS[3]);
  // monedas y las gafas
  for (let k = 0; k < 5; k++) { R.disco(258 + k * 2, 152 - k * 2, 4, LATON[2]); R.disco(258 + k * 2, 152 - k * 2 - 1, 3, LATON[3]); ps(257 + k * 2, 149 - k * 2, LATON[4]); }
  for (const gx of [276, 290]) { R.disco(gx, 132, 5, LATON[1]); R.disco(gx, 132, 4, mez(PINO[3], 0xffffffff, 0.3)); ps(gx - 2, 130, 0xffffffff); }
  lin(281, 131, 285, 131, LATON[1]);
}
// el interior del armario de Morriss (para el gag de la horquilla): fondo de tablas, baldas con ropa, libros y cartas
function armarioFondo() {
  caja(0, 0, 319, 179, (x, y) => { const tb = Math.floor(x / 14), u = x % 14; let v = 1.6 + (h2(tb, 1, 6) - 0.5) * 0.7 + Math.sin(y * 0.15 + tb * 2) * 0.25 + (h2(x, y >> 2, 3) - 0.5) * 0.3; if (u === 0) v = 0.3; if (u === 1) v += 0.6; R.pset(x, y, rmp(NOGAL, v, x, y)); });
  // los cantos de las puertas abiertas a los lados, con sus bisagras
  for (const [a, b] of [[0, 20], [300, 319]]) relleno(a, 0, b, 179, ROBLE, (x, y) => 2.6 + (x === a || x === b ? -1.8 : 0) + Math.sin(y * 0.2) * 0.2);
  for (const by of [30, 140]) { caja(18, by, 22, by + 8, (x, y) => R.pset(x, y, LATON[2 + ((x + y) & 1)])); caja(298, by, 302, by + 8, (x, y) => R.pset(x, y, LATON[1 + ((x + y) & 1)])); }
  // la balda de arriba con la ropa doblada y una sombrerera
  relleno(20, 48, 300, 54, ROBLE, (x, y) => (y === 48 ? 4.4 : y < 51 ? 3 : 1.6));
  for (let k = 0; k < 4; k++) { const fy = 47 - k * 5, M = [BLANCO, SALVIA, BLANCO, BURDEOS][k]; relleno(34 - k, fy - 4, 86 + k, fy, M, (x, y) => 3.4 + (y === fy - 4 ? 1 : 0) + (x % 9 === 0 ? -0.8 : 0)); }
  relleno(214, 22, 252, 47, CREMA, (x, y) => 3.2 + (y < 25 ? 1.2 : 0) + (x === 214 || x === 252 ? -1.5 : 0)); lin(214, 36, 252, 36, BURDEOS[3]);
  // la balda principal (y 140) con su canto
  relleno(20, 140, 300, 150, ROBLE, (x, y) => (y === 140 ? 4.6 : y < 144 ? 3.2 : 1.8 + (h2(x >> 2, y, 3) - 0.5) * 0.5));
  for (let x = 20; x < 300; x++) sombrea(x, 151, 0.5);
  // debajo, el cajón con sus tiradores
  relleno(20, 152, 300, 179, NOGAL, (x, y) => 2 + (y === 152 ? -1 : 0) + Math.sin(x * 0.1) * 0.2 + (Math.abs(y - 166) < 1 ? 1 : 0));
  for (const kx of [100, 220]) { R.disco(kx, 165, 2, LATON[2]); ps(kx - 1, 164, LATON[4]); }
  // en la balda: el atado de cartas con su cinta, libros de pie y una palmatoria apagada
  for (let k = 0; k < 4; k++) relleno(40, 128 - k * 3, 78, 131 - k * 3, PAPEL, (x, y) => 3.8 - k * 0.2 + (x === 40 || x === 78 ? -1 : 0));
  lin(58, 116, 58, 131, ROJO); lin(40, 124, 78, 124, ROJO); ps(57, 115, ROJOL); ps(59, 115, ROJOL);
  for (let k = 0; k < 7; k++) { const bx = 236 + k * 8, bh = 30 + (k % 3) * 4, M = [BURDEOS, SALVIA, NOGAL, pal(['#2a3450', '#34406a', '#405080', '#5064a0'])][k % 4];
    relleno(bx, 140 - bh, bx + 6, 139, M, (x, y) => 2.4 + (x === bx ? 1.2 : x === bx + 6 ? -1.2 : 0) + (Math.abs(y - (140 - bh + 5)) < 1 || Math.abs(y - 134) < 1 ? 1.6 : 0)); }
  vela(212, 139, 0, { apagada: true, luz: false, alto: 8 });
  // la barra con un abrigo colgado a la izquierda y una bufanda
  lin(20, 62, 120, 62, LATON[2]); lin(20, 63, 120, 63, LATON[0]);
  relleno(26, 64, 46, 134, pal(['#141a24', '#1e2634', '#283244', '#34405a']), (x, y) => 1.8 + Math.sin(x * 0.9) * 0.6 + (x === 26 || x === 46 ? -1 : 0) + (y < 70 ? 1 : 0));
  for (let y = 66; y < 130; y += 6) { ps(36, y, LATON[3]); }
  relleno(96, 64, 104, 120, BURDEOS, (x, y) => 3 + ((y >> 2) & 1 ? 0.8 : -0.4) + (x === 96 ? -1 : 0)); for (let x = 96; x <= 104; x += 2) lin(x, 121, x, 124, BURDEOS[4]);
  // la telaraña de la esquina de arriba a la izquierda
  for (let k = 0; k < 5; k++) lin(20, 54 + k * 5, 20 + k * 6, 54, mez(NOGAL[2], 0xffffffff, 0.25));
}
'''

PLANOS_P = r'''
// 1. LA CALLE DE LYNCHBURG en enero de 1820, con nieve: un mozo rueda un barril de tabaco hasta el almacén («tobacco
//    warehouses»), la barca baja por el James («James River») y Beale, con su maleta, sube los escalones de la posada.
const barril = (x, y, t, giro) => {
  R.disco(ri(x), ri(y), 6, K); R.disco(ri(x), ri(y), 5, PINO[3]);
  for (let k = 0; k < 4; k++) { const a = giro + k * Math.PI / 4, c = Math.cos(a), s = Math.sin(a); lin(x - c * 5, y - s * 5, x + c * 5, y + s * 5, PINO[1]); }
  R.disco(ri(x), ri(y), 2, HIERRO[2]); ps(x - 2, y - 3, PINO[5]);
};
const maleta = (x, y) => { relleno(x - 5, y, x + 5, y + 7, pal(['#3a2414', '#5a3820', '#7a502e', '#986a40']), (xx, yy) => 2 + (yy === y ? 1 : 0) + (xx === x - 5 || xx === x + 5 ? -1 : 0)); lin(x - 2, y - 1, x + 2, y - 1, K); ps(x, y + 3, LATON[3]); };
function p1(t) {
  const g = T.lynchburg(R, t, { encuadre: 'calle', nieve: true });
  // el mozo rueda el barril hacia el portón del almacén (x 14–48) y lo empuja dentro
  const u = tramo(t, 1.2, TG.TOB + 0.4), bx = lerp(150, 40, u), entra = t > TG.TOB + 0.4;
  if (!entra || t < TG.TOB + 1.3) barril(entra ? 40 - (t - TG.TOB - 0.4) * 12 : bx, 144, t, -bx / 5);
  const mx = entra ? 52 + Math.min(6, (t - TG.TOB - 0.4) * 8) : bx + 8;
  R.actor(EL.obreroEscoces, ri(mx), 150, t, { dir: -1, anda: (u > 0 && u < 1), sonrisa: entra && t > TG.TOB + 1.4, dedo: entra && t > TG.JAMES - 0.3 && t < TG.JAMES + 0.8 });
  // una vecina con su cesta que pasa por delante del callejón
  const vx = lerp(200, 108, tramo(t, 0, 7.5)); R.actor(EL.vecina, ri(vx), 152, t, { dir: -1, anda: vx > 108 });
  // la puerta de la posada se abre con su luz cuando él llega
  const pu = tramo(t, TG.P2 - 1.4, TG.P2 - 0.9); if (pu > 0) { caja(211, 109, 211 + ri(20 * pu), 141, (x, y) => R.pset(x, y, rmp(pal(['#8a5a2a', '#c08a44', '#f0c070', '#ffe0a0']), 1.6 + (h2(x >> 1, y >> 1, 2) - 0.5) + (y - 109) / 32, x, y))); luz(221, 140, 20, CALIDA, 0.4 * pu); }
  // Beale, alto y con su maleta, cruza hasta la posada y sube los escalones
  const w = tramo(t, 2.6, TG.P2 - 0.6), bxB = lerp(70, 214, w), sube = tramo(t, TG.P2 - 0.9, TG.P2 - 0.3);
  if (t < TG.P2 - 0.15) { const s = R.actor(EL.bealeBL, ri(bxB), ri(150 - sube * 4), t, { dir: 1, anda: w > 0 && w < 1 || (sube > 0 && sube < 1), sostiene: [ri(bxB) + 13, ri(150 - sube * 4) - 9] }); maleta(s.mano[0], s.mano[1] + 1); }
  T.lynchburgDelante(R, t, { encuadre: 'calle', nieve: true });
}

// 2. LA HABITACIÓN DE BEALE, de noche: Morriss abre la puerta con la vela; entra el forastero alto, deja la maleta en el
//    baúl y saluda con una inclinación («well-mannered»); en «stays the whole winter» el calendario pasa de 1 a 3 y la
//    nieve se amontona en la ventana.
function p2(t) {
  const L = TG.P2, fl = tramo(t, TG.STAYS + 0.1, TG.WINTER + 0.5), mes = fl < 0.33 ? 1 : fl < 0.66 ? 2 : 3, fu = (fl * 3) % 1;
  habPuerta(t, { puerta: tramo(t, L + 0.1, L + 0.7), mes, flip: fl > 0 && fl < 1 ? fu : 0, monton: tramo(t, TG.STAYS, TG.P3), ventisca: tramo(t, TG.STAYS, TG.WINTER) });
  // Morriss con la vela entra primero y se aparta a la izquierda del baúl
  const mU = tramo(t, L + 0.4, L + 1.6), mx = lerp(30, 70, mU);
  const sm = R.actor(EL.morrissBL, ri(mx), 156, t, { dir: t > L + 2.2 ? 1 : 1, anda: mU > 0 && mU < 1, sostiene: [ri(mx) + 14, 140], sonrisa: t > TG.WELL - 0.2, habla: t > TG.TALL && t < TG.WELL - 0.3 && parp(t, 7) });
  vela(sm.mano[0], sm.mano[1] + 1, t, { alto: 4, r: 22, a: 0.4 });
  // Beale entra con la maleta, la deja sobre el baúl y se vuelve a saludar a Morriss
  const bU = tramo(t, L + 1.0, TG.TALL + 0.9), bx = lerp(24, 128, bU), deja = t > TG.TALL + 1.2;
  const inclina = t > TG.WELL - 0.1 && t < TG.WELL + 0.9;
  const sb = R.actor(EL.bealeBL, ri(bx), ri(156 + (inclina ? 1 : 0)), t, { dir: t > TG.WELL - 0.4 && t < TG.STAYS + 0.2 ? -1 : 1, anda: bU > 0 && bU < 1, sostiene: deja ? false : [ri(bx) + 13, 147], sonrisa: inclina || t > TG.WINTER, habla: t > TG.STAYS + 0.3 && t < TG.WINTER + 0.4 && parp(t, 7) });
  if (!deja) maleta(sb.mano[0], sb.mano[1] + 1); else maleta(123, 117);
  if (inclina) { brillo(ri(bx) + 2, 128, t, 0.6, DORL); }
  // Beale se asoma a la ventana nevada al final
  habPuertaDelante(t);
}

// 3. EL COMEDOR: Beale encanta a todos (habla con el dedo, los huéspedes ríen); en «family» la dama le pregunta «?», en
//    «where he comes from» el caballero también; él sonríe, niega con la cabeza y levanta la jarra. Morriss, detrás del
//    mostrador, le mira mientras seca una jarra.
function p3(t) {
  const g = T.lynchburg(R, t, { encuadre: 'posada' });
  const ri2 = t > TG.P3 + 0.4 && t < TG.NEVER;
  R.actor(EL.caballeroMS, 104, 150, t, { dir: 1, sonrisa: ri2 || t > TG.FROM + 0.4, habla: t > TG.WHERE - 0.1 && t < TG.FROM + 0.2 && parp(t, 7) });
  R.actor(EL.damaMS, 176, 150, t, { dir: -1, sonrisa: ri2, habla: t > TG.FAMILY - 0.4 && t < TG.FAMILY + 0.4 && parp(t, 7) });
  // Beale entra un paso desde el fuego y se queda en el centro
  const u = tramo(t, TG.P3, TG.P3 + 0.9), bx = lerp(118, 140, u);
  const niega = t > TG.FAMILY + 0.5 && t < TG.WHERE - 0.2, dirB = niega ? (Math.floor(t * 5) % 2 ? 1 : -1) : t > TG.WHERE ? 1 : t < TG.NEVER ? 1 : -1;
  const sb = R.actor(EL.bealeBL, ri(bx), 150, t, { dir: dirB, anda: u > 0 && u < 1, habla: t < TG.NEVER + 0.6 && parp(t, 7), dedo: t > TG.P3 + 0.9 && t < TG.NEVER + 0.4, sonrisa: t > TG.NEVER + 0.6, sostiene: t > TG.FROM ? [ri(bx) + (dirB > 0 ? 13 : 1), 132] : false });
  if (t > TG.FROM) { const jx = sb.mano[0], jy = sb.mano[1]; relleno(jx - 2, jy - 5, jx + 2, jy, PIEDRA, (x, y) => 3.4 + (y === jy - 5 ? 1.4 : 0)); ps(jx + 3, jy - 3, PIEDRA[3]); }
  bocad(116, 124, '?', tramo(t, TG.WHERE - 0.1, TG.WHERE + 0.2) * (t < TG.P4 ? 1 : 0));
  bocad(184, 124, '?', tramo(t, TG.FAMILY - 0.2, TG.FAMILY + 0.1));
  // Morriss tras el mostrador seca una jarra y mira a Beale (asoma por encima del tablero)
  const seca = Math.sin(t * 6) * 2;
  const sm = R.actor(EL.morrissBL, 236, 134, t, { dir: -1, sostiene: [ri(240 + seca), 120], sonrisa: t > TG.NEVER, habla: false });
  relleno(sm.mano[0] - 3, sm.mano[1] - 5, sm.mano[0] + 1, sm.mano[1], PIEDRA, (x, y) => 3.2 + (y === sm.mano[1] - 5 ? 1.4 : 0));
  T.lynchburgDelante(R, t, { encuadre: 'posada' });
}

// 4. INSERTO, LA MESA DEL COMEDOR: Atom pasa por la mesa de Beale (su sombrero de copa, los guantes) y abre el folleto de
//    1885 («According to the pamphlet»); en «his name was» señala el renglón, que se dora; en «Beale» se vuelve al
//    sombrero, que destella.
function p4(t) {
  fijo('mesaCom', mesaComedorFondo);
  // la luz de la vela del aplique de la izquierda y las motas
  copos(186, 16, 234, 46, t, 14, 0.8);
  vela(150, 52, t, { r: 30, a: 0.35, alto: 7 });
  for (let k = 0; k < 8; k++) { const u = (t * 0.06 + k / 8) % 1; if (Math.sin(t * 3 + k) > 0) ps(120 + k * 9 + Math.sin(t + k) * 4, 70 + u * 40, VELAL); }
  const ab = tramo(t, TG.PAMPH - 0.3, TG.PAMPH + 0.5);
  const F = T.d_folleto(R, 150, 120, { escala: 3, abierto: ab, t, brillo: tramo(t, TG.BEALE - 0.6, TG.BEALE) * 0.4 });
  // el renglón del nombre se dora en «his name was»
  const dor = tramo(t, TG.NAME - 0.2, TG.NAME + 0.4);
  if (dor > 0 && F.izquierda) { const [x0, y0, x1] = F.izquierda, yy = y0 + 34; for (let x = x0 + 8; x < x0 + 8 + (x1 - x0 - 16) * dor; x++) { ps(x, yy, DORADO); ps(x, yy + 1, LATON[2]); if (b4(x, yy) < 0.5) aclara(x, yy - 1, DORL, 0.5); } }
  // Atom entra por la derecha caminando sobre la mesa, abre el folleto y señala
  const aU = tramo(t, TG.P4, TG.PAMPH - 0.4), ax = lerp(300, 218, aU), mira = t > TG.BEALE - 0.3;
  AT.atom(R, ri(ax), 150, t, { dir: mira ? 1 : -1, pose: aU > 0 && aU < 1 ? 'camina' : t > TG.NAME - 0.3 && t < TG.BEALE - 0.4 ? 'senala' : mira ? 'saluda' : 'sostiene', cara: mira ? 'sorpresa' : 'sonrisa', habla: t > TG.NAME && t < TG.BEALE ? 0.8 : 0 });
  brillo(244, 100, t, tramo(t, TG.BEALE - 0.1, TG.BEALE + 0.3) * (t < TG.P5 - 0.3 ? 1 : 0), DORL);
}

// 5. LA HABITACIÓN DE BEALE, de mañana (la otra pared): Beale se peina ante el espejo; en «Robert Morriss» entra Morriss
//    con el agua caliente; en «handsomest» destella Beale (y su reflejo), Morriss se queda con la boca abierta, el gato
//    levanta la cabeza, y en «ever seen» Beale se vuelve y sonríe.
function p5(t) {
  habEspejo(t, { puerta: tramo(t, TG.P5 + 0.1, TG.MORRIS - 0.2), gato: t > TG.HANDS - 0.1 });
  const vuelve = t > TG.EVER - 0.3, peina = !vuelve && Math.sin(t * 7) > 0;
  espejoDentro(t, () => { R.actor(EL.bealeBL, 128, 108, t, { dir: -1, sonrisa: t > TG.HANDS, sostiene: vuelve ? false : [128 - 1, 85 + (peina ? 0 : 2)] }); });
  const sb = R.actor(EL.bealeBL, 90, 152, t, { dir: vuelve ? -1 : 1, sonrisa: t > TG.HANDS, sostiene: vuelve ? false : [104, 129 + (peina ? 0 : 2)] });
  if (!vuelve) { lin(sb.mano[0], sb.mano[1] - 1, sb.mano[0] + 3, sb.mano[1] - 3, NOGAL[4]); for (let k = 0; k < 3; k++) ps(sb.mano[0] + k, sb.mano[1] - 2 - k + 1, K); }
  const dest = tramo(t, TG.HANDS - 0.1, TG.HANDS + 0.2) * (t < TG.EVER + 0.6 ? 1 : 0);
  brillo(100, 128, t, dest, DORL); brillo(134, 80, t + 0.3, dest * 0.8, DORL);
  // Morriss entra con la jarra de agua caliente (vapor) y se queda pasmado
  const mU = tramo(t, TG.MORRIS - 0.4, TG.SAY - 0.2), mx = lerp(300, 214, mU);
  const sm = R.actor(EL.morrissBL, ri(mx), 152, t, { dir: -1, anda: mU > 0 && mU < 1, sorpresa: t > TG.HANDS && t < TG.EVER, sonrisa: t > TG.EVER, sostiene: [ri(mx) - 1, 133] });
  const jx = sm.mano[0], jy = sm.mano[1];
  relleno(jx - 3, jy - 6, jx + 3, jy + 1, BLANCO, (x, y) => 3.6 + (x === jx - 3 ? 1 : 0) + (y === jy - 6 ? 1 : 0)); ps(jx - 4, jy - 5, BLANCO[3]);
  for (let k = 0; k < 4; k++) { const u = (t * 0.8 + k / 4) % 1; ps(jx + Math.sin(t * 3 + k) * 2, jy - 8 - u * 10, mez(BLANCO[5], YESO[3], u)); }
  bocad(ri(mx) + 8, 124, '!', tramo(t, TG.HANDS + 0.2, TG.HANDS + 0.5) * (t < TG.EVER ? 1 : 0));
}

// 6. EL MAPA, 1822: la ruta punteada vuelve del oeste (Santa Fe, San Luis) a Lynchburg («comes back»); la chincheta cae
//    en «the inn»; en «before leaving again» la ruta de vuelta al oeste empieza a dibujarse.
const SF = [-105.94, 35.69], STL = [-90.2, 38.63], LYN = [-79.14, 37.41], KNX = [-83.92, 35.96];
function p6(t) {
  const P = T.mapa(R, t, { zoom: 1.75, centro: [-92.5, 37.3], rosa: [270, 150] });
  const pts = [SF, [-99, 37.6], [-94.6, 38.9], STL, [-86.8, 38.4], [-82.5, 37.6], LYN].map(P);
  const u = tramo(t, TG.Y1822 + 0.2, TG.INN2 - 0.1);
  R.ruta(pts, u, hex('#8a2a20'));
  // el jinete (un punto que avanza con su polvo)
  if (u > 0 && u < 1) { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
    let q = tot * u, i = 0; while (i < L.length - 1 && q > L[i]) { q -= L[i]; i++; } const f = Math.min(1, q / L[i]), x = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, y = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f;
    R.disco(ri(x), ri(y), 3, K); R.disco(ri(x), ri(y), 2, hex('#2a2a32')); ps(x, y - 4, K); ps(x - 1, y - 4, K); ps(x + 1, y - 4, K); for (let k = 1; k < 4; k++) ps(x - k * 2, y + (k & 1), mez(PAPEL[2], 0xffffffff, 0.3)); }
  for (const [p, c] of [[SF, ROJO], [STL, hex('#3a5a8a')]]) { const [x, y] = P(p); R.disco(ri(x), ri(y), 2, K); ps(x, y, c); }
  const [lx, ly] = P(LYN);
  T.chincheta(R, ri(lx), ri(ly), t, T.C.rojo, { baja: tramo(t, TG.INN2 - 0.3, TG.INN2 + 0.1) });
  if (t > TG.INN2) R.numero('1822', ri(lx) + 4, ri(ly) - 8, { tam: 8 });
  // la vuelta al oeste
  const v = tramo(t, TG.LEAVING - 0.2, TG.P7); if (v > 0) R.ruta(pts.slice().reverse().slice(0, 3), v * 0.6, hex('#5a4a3a'));
}

// 7. LA CUADRA DE LA POSADA, 1822: Beale, junto a su caballo negro, saca la caja de hierro de la alforja y se la da a
//    Morriss («hands Morriss a locked iron box»); Morriss se dobla con el peso; en «request» Beale le explica con el dedo
//    y en «strange» a Morriss le sale una «?». Las gallinas picotean y el caballo del establo cabecea.
function p7(t) {
  cuadra(t);
  // el caballo de Beale, ensillado, junto al abrevadero
  T.b_mula(R, 168, 158, t, { dir: -1, mula: false, carga: false, color: 'bayo' });
  // Beale lleva la caja hasta Morriss
  const u = tramo(t, TG.P7, TG.HANDS2 + 0.5), bx = lerp(140, 104, u), da = t > TG.LOCKED - 0.1;
  const sb = R.actor(EL.bealeBL, ri(bx), 156, t, { dir: -1, anda: u > 0 && u < 1, sostiene: da ? false : [ri(bx), 140], dedo: t > TG.REQUEST - 0.1 && t < TG.STRANGE - 0.2, habla: t > TG.REQUEST - 0.1 && t < TG.STRANGE + 0.3 && parp(t, 7), sonrisa: t > TG.STRANGE + 0.3 });
  // Morriss ha salido por la puerta de atrás y recibe la caja
  const pesa = da && t < TG.LOCKED + 0.5;
  const sm = R.actor(EL.morrissBL, 76, ri(156 + (pesa ? 1 : 0)), t, { dir: 1, sostiene: da ? [90, ri(141 + (pesa ? 2 : 0))] : false, sorpresa: pesa || (t > TG.STRANGE - 0.2), habla: t > TG.P7 && t < TG.HANDS2 && parp(t, 7) });
  const [cx, cy] = da ? sm.mano : sb.mano;
  T.d_caja(R, cx + (da ? 2 : -4), cy + 6, { escala: 1, t });
  bocad(84, 126, '?', tramo(t, TG.STRANGE - 0.1, TG.STRANGE + 0.2));
  if (t > TG.LOCKED - 0.1 && t < TG.LOCKED + 0.4) { brillo(cx, cy - 2, t, 0.8, DORL); }
}

// 8. INSERTO, EL ESCRITORIO DE MORRISS: la caja de hierro sobre la mesa; la mano de Beale da dos palmadas en la tapa
//    («Keep it safe»); sale un «10» en «ten years»; en «companions» aparecen sus treinta compañeros (siluetas con
//    sombrero) que se apagan en «comes back»; en «open it» el índice toca el candado y sale la llave.
function p8(t) {
  fijo('escritorio', escritorioFondo);
  vela(214, 100, t, { r: 34, a: 0.35, alto: 9 });
  const D = T.d_caja(R, 236, 152, { escala: 4, t });
  const cx = D.candado ? D.candado[0] : 236, cy = D.candado ? D.candado[1] : 130, top = D.arriba[1];
  // la mano de Beale (manga negra de la levita) entra por la derecha y palmea la tapa; en «open it» baja al candado
  const llega = tramo(t, TG.P8, TG.SAFE - 0.1), pal1 = t > TG.SAFE - 0.1 && t < TG.SAFE + 0.7 ? Math.abs(Math.sin((t - TG.SAFE) * 9)) * 3 : 0;
  const al = 0, abre = tramo(t, TG.OPEN - 0.3, TG.OPEN), vete = tramo(t, TG.P9 - 0.25, TG.P9);
  const hx = lerp(lerp(340, 280, llega), 264, al) + vete * 40, hy = lerp(lerp(top - 20, top + 6, llega), cy - 8, al) - pal1;
  T.brazo(R, 334, ri(hy - 26), ri(hx), ri(hy), '#24222a', -1, { codo: [314, ri(hy - 6)] });
  if (abre > 0) { R.icono('llave', cx - 6, ri(cy - 30 - abre * 6), DORADO, K, 2); brillo(cx, cy - 4, t, 0.7 * (t < TG.P9 - 0.2 ? 1 : 0), DORL); }
  // el «10» sobre el reloj
  const d10 = tramo(t, TG.TEN - 0.15, TG.TEN + 0.2); if (d10 > 0) { R.numero('10', 112, ri(80 - d10 * 4), { tam: 16, centro: true }); brillo(130, 64, t, d10 * (t < TG.TEN + 0.6 ? 1 : 0), DORL); }
  // sus compañeros: diez siluetas con sombrero que aparecen en fila sobre la mesa y se apagan
  for (let k = 0; k < 10; k++) { const a = tramo(t, TG.NEITHER + k * 0.12, TG.NEITHER + k * 0.12 + 0.2), apaga = tramo(t, TG.COMES + k * 0.06, TG.COMES + 0.6 + k * 0.06);
    if (a <= 0) continue; const x = 30 + k * 15, y = 108 - ri((1 - a) * 4); siluetaG(x, y, apaga); }
  if (t > TG.COMES + 0.9) bocad(102, 76, '?', tramo(t, TG.COMES + 0.9, TG.COMES + 1.2) * (t < TG.OPEN - 0.3 ? 1 : 0));
}
// un compañero de Beale (silueta de 11 × 22 con sombrero de ala ancha); se apaga en un contorno punteado
function siluetaG(x, y, apaga) {
  const c = mez(hex('#2e2a36'), PINO[3], apaga * 0.85), FIG = ['...###...', '.#######.', '...###...', '...###...', '..#####..', '.#######.', '.#######.', '.#######.', '.#######.', '..#####..', '..##.##..', '..##.##..', '..##.##..', '.###.###.'];
  FIG.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') { const X = x - 4 + i, Y = y - FIG.length * 2 + j * 2; if (apaga > 0.5 && ((i + j) & 1)) continue; ps(X, Y, c); ps(X, Y + 1, c); } });
  if (apaga < 0.5) for (let j = 0; j < 4; j++) sombrea(x - 3 + j * 2, y + 1, 0.3);
}

// 9. EL DESPACHO DE MORRISS: Morriss entra con la caja en brazos («a man of his word»), abre las puertas del armario,
//    la guarda en la balda («puts it away in his office») y las cierra.
function p9(t) {
  const ab = tramo(t, TG.WORD - 0.2, TG.WORD + 0.4), ci = tramo(t, TG.OFFICE + 0.1, TG.P10 - 0.1), guard = t > TG.PUTS + 0.2;
  const g = T.lynchburg(R, t, { encuadre: 'despacho', caja: guard ? 'armario' : false, puertas: ab * (1 - ci), anyo: 1822 });
  const u = tramo(t, TG.P9, TG.WORD - 0.3), mx = lerp(40, 214, u);
  const sm = R.actor(EL.morrissBL, ri(mx), 150, t, { dir: 1, anda: u > 0 && u < 1, sostiene: guard ? false : [ri(mx) + 15, 136], sonrisa: t > TG.MORRIS2 && t < TG.WORD + 0.4, dedo: guard && t > TG.OFFICE + 0.3 && t < TG.P10 - 0.3 });
  if (!guard) T.d_caja(R, sm.mano[0] + 2, sm.mano[1] + 6, { escala: 1, t });
  T.lynchburgDelante(R, t, { encuadre: 'despacho' });
}

// 10. INSERTO, DENTRO DEL ARMARIO (GAG): la caja quieta en la balda; Atom llega con una horquilla, hurga en el candado
//     («still and silent») y la horquilla se le dobla en forma de interrogación; baja una araña; en «never asks for the
//     bill» Atom se encoge de hombros junto a la caja, que sigue sin decir nada.
function p10(t) {
  fijo('armario', armarioFondo);
  // la rendija de luz de la puerta entornada con sus motas
  caja(20, 0, 300, 179, (x, y) => { const d = x - 60 - y * 0.35; if (d > 0 && d < 70 && b4(x, y) < 0.3) aclara(x, y, hex('#ffe8b8'), 0.2); });
  for (let k = 0; k < 10; k++) { const u = (t * 0.04 + k / 10) % 1; if (Math.sin(t * 2 + k) > 0) ps(80 + k * 8 + Math.sin(t * 0.7 + k) * 5, 20 + u * 110, hex('#fff0c8')); }
  const D = T.d_caja(R, 168, 140, { escala: 3, t });
  const cx = D.candado ? D.candado[0] : 168, cy = D.candado ? D.candado[1] : 120;
  // Atom llega por la balda con la horquilla en la mano
  const u = tramo(t, TG.P10, TG.STILL - 0.4), ax = lerp(30, cx - 18, u), dobla = tramo(t, TG.SILENT + 0.3, TG.SILENT + 0.8), hurga = t > TG.STILL - 0.3 && dobla <= 0;
  const triste = t > TG.NEVER2 - 0.2;
  const A = AT.atom(R, ri(ax), 140, t, { dir: 1, pose: u > 0 && u < 1 ? 'camina' : dobla > 0 ? 'sostiene' : 'senala', cara: triste ? 'triste' : dobla > 0 ? 'sorpresa' : 'normal' });
  const [mx, my] = A.mano;
  if (dobla <= 0) { // recta: la lleva o hurga en el ojo de la cerradura
    const j = hurga ? Math.sin(t * 22) * 1.2 : 0, ex = hurga ? cx - 1 + j : mx + 8, ey = hurga ? cy + 1 : my - 3;
    lin(mx, my - 1, ex, ey - 1, K); lin(mx, my, ex, ey, BLANCO[5]); lin(mx, my + 1, ex, ey + 1, K); if (hurga && Math.sin(t * 22) > 0.8) brillo(cx, cy, t, 0.3, 0xffffffff); }
  else { // doblada en «?»: la levanta para mirarla
    const Q = ['.####.', '##..##', '....##', '...##.', '..##..', '..##..', '......', '..##..'], yq = my - 22 - ri(ease(dobla) * 10);
    lin(mx, my, mx + 2, yq + 16, BLANCO[5]);
    Q.forEach((f, j2) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') { for (const [dx, dy] of [[-1, 0], [2, 0], [0, -1], [0, 2], [1, -1], [1, 2], [-1, 1], [2, 1]]) ps(mx - 4 + i * 2 + dx, yq + j2 * 2 + dy, K); } }); }
  if (dobla > 0) { const Q = ['.####.', '##..##', '....##', '...##.', '..##..', '..##..', '......', '..##..'], yq = my - 22 - ri(ease(dobla) * 10);
    Q.forEach((f, j2) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') { ps(mx - 4 + i * 2, yq + j2 * 2, BLANCO[5]); ps(mx - 3 + i * 2, yq + j2 * 2, BLANCO[4]); ps(mx - 4 + i * 2, yq + j2 * 2 + 1, BLANCO[3]); ps(mx - 3 + i * 2, yq + j2 * 2 + 1, BLANCO[2]); } }); }
  // en «never asks for the bill», la cuenta (un papelito con su «$») sigue sin tocar sobre la caja, con polvo
  const cu = tramo(t, TG.NEVER2 - 0.4, TG.NEVER2);
  if (cu > 0) { const bx = 196, by = ri(D.arriba[1] - 2 - (1 - cu) * 10); relleno(bx - 7, by - 9, bx + 7, by, PAPEL, (x, y) => 4 + (y === by - 9 ? 1 : 0)); marco(bx - 7, by - 9, bx + 7, by, PAPEL[1]); R.numero('$0', bx, by - 1, { tam: 8, centro: true, color: TINTA, sombra: false, fina: true }); }
  // la araña que baja de la balda de arriba por su hilo
  const ar = tramo(t, TG.SILENT, TG.GUEST + 0.4), sy = lerp(54, 96, ar) + Math.sin(t * 3) * 1.5; lin(230, 54, 230, sy, mez(NOGAL[3], 0xffffffff, 0.4));
  R.disco(230, ri(sy), 1, K); for (const s of [-1, 1]) { ps(230 + 2 * s, sy - 1, K); ps(230 + 2 * s, sy + 1, K); }
}
'''

CUERPO_P = r'''
const año = (t) => t < TG.P6 ? 1820 : 1822;
const efectos = [[3.0, 'pasos'], [TG.TOB + 0.4, 'golpecito'], [TG.JAMES, 'ola'], [TG.P2 - 1.3, 'puerta'],
  [TG.P2 + 0.2, 'puerta'], [TG.P2 + 1.2, 'pasos'], [TG.TALL + 1.2, 'golpecito'], [TG.WELL, 'brillo'], [TG.STAYS + 0.2, 'papel'], [TG.WINTER, 'viento'],
  [TG.P3 + 0.3, 'publico'], [TG.FAMILY - 0.1, 'pop'], [TG.WHERE, 'pop'], [TG.FROM + 0.2, 'golpecito'],
  [TG.PAMPH - 0.2, 'papel'], [TG.NAME, 'brillo'], [TG.BEALE, 'pop'],
  [TG.MORRIS - 0.4, 'puerta'], [TG.HANDS, 'brillo'], [TG.HANDS + 0.3, 'pop'], [TG.EVER, 'miau'],
  [TG.Y1822 + 0.3, 'carro'], [TG.INN2 - 0.1, 'pop'], [TG.LEAVING, 'whoosh'],
  [TG.P7 + 0.2, 'pasos'], [TG.LOCKED, 'cerrojo'], [TG.REQUEST, 'oca'], [TG.STRANGE, 'pop'],
  [TG.SAFE, 'golpecito'], [TG.TEN, 'pop'], [TG.NEITHER + 0.3, 'whoosh'], [TG.COMES + 0.2, 'tic'], [TG.OPEN, 'cerrojo'],
  [TG.P9 + 0.2, 'pasos'], [TG.WORD, 'puerta'], [TG.PUTS + 0.2, 'golpecito'], [TG.OFFICE + 0.3, 'cerrojo'],
  [TG.P10 + 0.3, 'pasos'], [TG.STILL, 'tic'], [TG.SILENT + 0.7, 'boing'], [TG.GUEST, 'tic']];
T.rodar(E, R, [[0, p1], [TG.P2, p2], [TG.P3, p3], [TG.P4, p4], [TG.P5, p5], [TG.P6, p6], [TG.P7, p7], [TG.P8, p8], [TG.P9, p9], [TG.P10, p10]],
  { efectos, cartela: '1820', año });
'''

CABECERA_P = '''// BL-POSADA (frases 5–6), 1820–1822: el forastero de la posada y la caja de hierro. Diez planos, cortados en la palabra:
// 1. la calle de Lynchburg nevada (enero de 1820): un mozo rueda un barril de tabaco al almacén («tobacco warehouses»),
//    la barca baja por el James y Beale sube con su maleta los escalones de la posada;  (corta en «and an inn»)
// 2. la habitación de Beale de noche: Morriss abre con la vela, entra Beale, deja la maleta y saluda («well-mannered»);
//    el calendario pasa de 1 a 3 y la nieve se amontona («the whole winter»);  (corta en «charming»)
// 3. el comedor: Beale encanta a todos; la dama («family») y el caballero («where») le preguntan «?»; él niega y sonríe;
//    Morriss seca jarras tras el mostrador;  (corta en «According»)
// 4. inserto, la mesa del comedor: Atom abre el folleto de 1885, el renglón del nombre se dora («his name was») y el
//    sombrero de copa de Beale destella («Beale»);  (corta en «and the innkeeper»)
// 5. la habitación de mañana: Beale se peina ante el espejo; entra Morriss con el agua; destello en «handsomest» y
//    Morriss boquiabierto; el gato levanta la cabeza;  (corta en «In 1822»)
// 6. el mapa: la ruta vuelve del oeste a Lynchburg y la chincheta cae en «the inn»; la vuelta empieza en «leaving»;
//    (corta en «he hands»)
// 7. la cuadra (1822): Beale saca la caja de la alforja y se la da a Morriss («locked iron box»); «?» en «strange»;
//    (corta en «Keep it safe»)
// 8. inserto, el escritorio: la mano de Beale palmea la caja; «10» en «ten years»; los compañeros aparecen y se
//    apagan; el índice toca el candado en «open it»;  (corta en «Morriss, a man of his word»)
// 9. el despacho: Morriss lleva la caja al armario, la guarda y cierra («puts it away in his office»);  (corta en «and there»)
// 10. inserto, dentro del armario (GAG): Atom hurga el candado con una horquilla que se dobla en «?»; baja una araña.'''

E['bl-posada'] = ('La posada', CABECERA_P, momentos(GP) + COMUN + LOCALES_P + PLANOS_P + CUERPO_P)


# ── las palabras de bl-carta que mandan ──
GC = {
    'LETTER': ('carta', 1.30), 'ARRIVES': ('carta', 2.10), 'DATED': ('carta', 3.34), 'Y1822': ('carta', 3.82),
    'P2': ('carta', 5.58), 'BOX': ('carta', 6.58), 'PAPERS': ('carta', 7.16), 'NOONE': ('carta', 7.68), 'UNDER': ('carta', 8.64), 'WITHOUT': ('carta', 9.40), 'KEY': ('carta', 10.02),
    'P3': ('carta', 10.68), 'FRIEND': ('carta', 11.12), 'KEY2': ('carta', 12.22), 'SEALED': ('carta', 12.78), 'ENVEL': ('carta', 13.18), 'ORDERS': ('carta', 14.52), 'MAIL': ('carta', 15.10), 'JUNE': ('carta', 16.14),
    'P4': ('carta', 16.46), 'BUT': ('carta', 19.16), 'JUNE2': ('carta', 19.74), 'Y1832': ('carta', 20.04), 'COMES': ('carta', 21.20), 'GOES': ('carta', 22.02),
    'P5': ('carta', 22.90), 'WAITING': ('carta', 24.00), 'ENVEL2': ('carta', 24.72), 'NEVER': ('carta', 25.62), 'JUST': ('carta', 27.00), 'BEALE': ('carta', 27.36), 'AGAIN': ('carta', 28.80),
    'P6': ('abre', 29.71), 'WAITS': ('abre', 30.53), 'Y13': ('abre', 30.91), 'YEARS': ('abre', 31.69), 'CASE': ('abre', 32.67),
    'P7': ('abre', 33.89), 'BREAK': ('abre', 34.15), 'LOCK': ('abre', 34.79), 'BETRAY': ('abre', 35.63), 'FRIEND2': ('abre', 36.27), 'UNTIL': ('abre', 37.07), 'Y1845': ('abre', 37.57),
    'P8': ('abre', 38.60), 'FINALLY': ('abre', 39.41), 'MIND': ('abre', 40.45), 'OPEN': ('abre', 40.99),
    'P9': ('abre', 42.77), 'TWO': ('abre', 43.93), 'LETTERS': ('abre', 44.21), 'PLAIN': ('abre', 45.09), 'THREE': ('abre', 46.29), 'SHEETS': ('abre', 46.61), 'NUMBERS': ('abre', 47.75),
    'P10': ('abre', 48.71), 'FIRST': ('abre', 49.13), 'Y23': ('abre', 50.17), 'SOMEONE': ('abre', 51.11), 'READS': ('abre', 51.51), 'BEALE2': ('abre', 52.41), 'SAY': ('abre', 53.41),
}

LOCALES_C = r'''
// ── la oficina de correos de Lynchburg en mayo de 1822 (fondo local): el mostrador, los casilleros, la estufa ──
function correosFondo() {
  // pared de tablas encaladas
  caja(0, 0, 319, 118, (x, y) => { const tb = Math.floor(y / 7), u = y % 7; let v = 3.6 + (h2(tb, Math.floor((x + tb * 13) / 40), 3) - 0.5) * 0.7 + (h2(x >> 1, y, 5) - 0.5) * 0.4 - (1 - y / 118) * 0.7; if (u === 0) v = 1.6; if (tranq(x, y)) v = 3.2 + (u === 0 ? -0.6 : 0); R.pset(x, y, rmp(YESO, v, x, y)); });
  caja(0, 0, 319, 4, (x, y) => R.pset(x, y, rmp(NOGAL, 1.4, x, y)));
  friso(0, 118, 319, 136, NOGAL, { panel: 30 });
  tarima(0, 137, 319, 179, PINO, { h0: 2, hmax: 8 });
  // la puerta de la calle a la izquierda (abierta, con la calle de mayo) y la ventana
  caja(8, 62, 44, 136, (x, y) => { const e = Math.min(x - 8, 44 - x, y - 62); if (e < 3) R.pset(x, y, rmp(NOGAL, e === 0 ? 0.5 : 3.4, x, y)); });
  R.recorte([11, 65, 41, 136]); paisaje(11, 65, 41, 136, { nieve: false }); caja(11, 120, 41, 136, (x, y) => R.pset(x, y, rmp(BARRO, 3 + (h2(x, y, 2) - 0.5), x, y))); R.recorte(null);
  ventana(56, 40, 96, 96, (a, b, c, d) => paisaje(a, b, c, d, { nieve: false }), { filas: 2 });
  // los carteles clavados (sin letras: renglones y cifras)
  for (const [px, py, w, hh] of [[104, 44, 22, 28], [108, 78, 16, 20]]) { hojaPapel(px, py, px + w, py + hh, { n: 5, k: px }); ps(px + w / 2, py + 1, ROJO); }
  R.numero('2¢', 116, 94, { tam: 8, centro: true, color: TINTA, sombra: false });
  // los casilleros de la correspondencia (x 156–268, y 24–112), llenos de cartas
  relleno(152, 20, 272, 114, NOGAL, (x, y) => (y < 24 ? 4 : 2.6 + (x === 152 || x === 272 ? -1.6 : 0)));
  for (let i = 0; i < 7; i++) for (let j = 0; j < 6; j++) { const cx = 156 + i * 16, cy = 26 + j * 14;
    relleno(cx, cy, cx + 13, cy + 11, NOGAL, (x, y) => 0.5 + (y - cy) * 0.08); marco(cx - 1, cy - 1, cx + 14, cy + 12, NOGAL[4]);
    const n = Math.floor(h2(i, j, 9) * 4); for (let k = 0; k < n; k++) { const ly = cy + 3 + k * 2; relleno(cx + 1, ly, cx + 12 - k, ly + 7 - k, PAPEL, (x, y) => 3.4 + (y === ly ? 1.2 : 0) - k * 0.3); if (h2(i * 7 + k, j, 4) > 0.75) ps(cx + 6, ly + 4, ROJO); } }
  // el reloj de la oficina y la balanza de cartas
  R.disco(296, 74, 10, NOGAL[1]); R.disco(296, 74, 8, BLANCO[4]); lin(296, 74, 296, 69, K); lin(296, 74, 300, 76, K); for (let k = 0; k < 4; k++) ps(296 + [0, 6, 0, -6][k], 74 + [-6, 0, 6, 0][k], K);
  relleno(290, 84, 302, 104, NOGAL, (x, y) => 2.4 + (x === 290 ? 1 : 0)); R.disco(296, 96, 3, LATON[3]);
  // la estufa de hierro (fría en mayo) con su tubo
  caja(66, 104, 92, 136, (x, y) => { const d = Math.hypot((x - 79) / 13, (y - 120) / 16); if (d < 1) R.pset(x, y, rmp(HIERRO, 2.6 - (x - 79) * 0.08 - (d > 0.85 ? 1.5 : 0), x, y)); });
  lin(79, 104, 79, 60, HIERRO[2]); lin(80, 104, 80, 60, HIERRO[1]); lin(78, 104, 78, 60, HIERRO[3]); lin(79, 60, 96, 60, HIERRO[2]);
  for (const px of [70, 88]) { lin(px, 132, px - 3, 138, HIERRO[1]); lin(px + 1, 132, px - 2, 138, HIERRO[3]); }
  relleno(74, 116, 84, 124, HIERRO, (x, y) => 1 + (x === 74 || y === 116 ? 2 : 0)); ps(82, 120, LATON[3]);
  relleno(64, 100, 94, 104, HIERRO, (x, y) => (y === 100 ? 4 : 2));
  caja(84, 90, 96, 100, (x, y) => { const d = Math.hypot((x - 90) / 6, (y - 96) / 5); if (d < 1) R.pset(x, y, rmp(pal(['#2a2a2a', '#4a3a2a', '#6a5034', '#8a6a44', '#a88454']), 2.6 - (x - 90) * 0.2 + (y < 93 ? 0.8 : 0), x, y)); }); lin(95, 93, 99, 90, pal(['#6a5034'])[0]);
  // las sacas del correo en el suelo
  for (const [sx, sy] of [[104, 150], [118, 152]]) caja(sx - 8, sy - 14, sx + 8, sy, (x, y) => { const d = Math.hypot((x - sx) / 8, (y - sy + 6) / 9); if (d < 1) R.pset(x, y, rmp(pal(['#4a3a24', '#6a5434', '#8a7046', '#a68a5a']), 2.4 - (x - sx) * 0.1 - (d > 0.85 ? 1.4 : 0), x, y)); });
  // la luz de la ventana en el suelo
  caja(40, 137, 160, 179, (x, y) => { const d = x - 56 - (y - 137) * 0.8; if (d > 0 && d < 42 && b4(x, y) < 0.35) aclara(x, y, hex('#fff0c8'), 0.22); });
}
// el mostrador de delante (lo que está detrás asoma cabeza y hombros)
function correosDelante() {
  relleno(140, 122, 310, 127, ROBLE, (x, y) => (y === 122 ? 4.6 : y < 125 ? 3.4 : 1.2));
  relleno(142, 128, 308, 156, ROBLE, (x, y) => { const px = (x - 142) % 34; let v = 2.3 + (h2(x >> 1, y >> 2, 3) - 0.5) * 0.4; if (px === 0) v = 0.8; if (px > 3 && px < 31 && y > 131 && y < 152) { v = 2.8; if (px === 4 || y === 132) v = 1.3; if (px === 30 || y === 151) v = 4; } return v; });
  for (let x = 142; x < 310; x++) sombrea(x, 157, 0.45);
  // sobre el mostrador: el tampón, la balanza pequeña y un tintero
  relleno(280, 116, 292, 121, HIERRO, (x, y) => 2.6 + (y === 116 ? 1 : 0)); relleno(284, 110, 288, 115, NOGAL, (x, y) => 3);
  tintero(160, 121);
}

// ── la salita de Morriss (fondo local, tres cámaras): 'ventana' (1832), 'hogar' (1832–1845) y 'mesa' (1845, de noche) ──
const PARED_S = pal(['#4a2e22', '#5e3a2a', '#744834', '#8a5840', '#a06a4c', '#b47e5c']), RAYA_S = pal(['#3e2418', '#4e3022', '#623c2c', '#764a36', '#8a5a42', '#9c6a50']);
function salitaBase(noche) {
  papelPintado(0, 0, 319, 110, PARED_S, RAYA_S, { per: 13, w: 5, flor: DORADO, centro: BURDEOS[4] });
  caja(0, 0, 319, 6, (x, y) => R.pset(x, y, rmp(BLANCO, y < 3 ? 2 : 4, x, y)));
  friso(0, 110, 319, 136, NOGAL, { panel: 32 });
  tarima(0, 137, 319, 179, NOGAL, { h0: 2, hmax: 8 });
  alfombra(160, 162, 110, 12, [BURDEOS[3], pal(['#3a4a6a'])[0], CREMA[3], BURDEOS[2], DORADO]);
  if (noche) caja(0, 0, 319, 179, (x, y) => { if (b4(x, y) < 0.5) sombrea(x, y, 0.45); });
}
function salitaVentanaFondo() {
  salitaBase(false);
  cortina(92, 22, 102, 112, pal(['#1a2a40', '#24385a', '#30486e', '#405c84', '#58749a'])); cortina(206, 22, 216, 112, pal(['#1a2a40', '#24385a', '#30486e', '#405c84', '#58749a']));
  // la ventana grande: el camino del río en otoño (lo de fuera se pinta en cada fotograma por el jinete)
  // el sillón de orejas a la izquierda
  sillon(26, 152);
  // la librería de la derecha con libros y un busto
  relleno(234, 46, 292, 150, NOGAL, (x, y) => 2.2 + (x === 234 || x === 292 ? -1.4 : 0) + (y < 50 ? 1.6 : 0));
  for (let j = 0; j < 4; j++) { const by = 56 + j * 24; relleno(238, by + 18, 288, by + 20, NOGAL, (x, y) => (y === by + 18 ? 4.2 : 1.2));
    for (let k = 0; k < 9; k++) { const bx = 239 + k * 5 + (h2(j, k, 3) > 0.7 ? 1 : 0), hh = 12 + ri(h2(j, k, 5) * 5), M = [BURDEOS, SALVIA, NOGAL, ROBLE, pal(['#2a3450', '#34406a', '#405080', '#5064a0'])][(j + k) % 5];
      relleno(bx, by + 18 - hh, bx + 3, by + 17, M, (x, y) => 2.6 + (x === bx ? 1 : 0) + (y === by + 20 - hh ? 1.4 : 0)); } }
  // el velador con la lámpara apagada y un jarrón
  relleno(222, 120, 232, 150, NOGAL, (x, y) => (y < 122 ? 4 : 2)); 
  cuadro(130, 116, 176, 132, 'rio');
}
function salitaHogarFondo() {
  salitaBase(false);
  // la chimenea de mármol (x 112–208) con su repisa, el fuego se pinta en cada fotograma
  relleno(108, 62, 212, 136, BLANCO, (x, y) => { let v = 3.6 + (h2(x >> 1, y >> 1, 7) - 0.5) * 0.7 + Math.sin(x * 0.2 + y * 0.1) * 0.3; if (y < 66) v = y < 63 ? 5 : 2; if (x < 112 || x > 208) v -= 0.6; return v; });
  relleno(130, 88, 190, 136, NOGAL, (x, y) => 0.4 + (y - 88) / 48 * 0.4);
  relleno(126, 84, 194, 87, BLANCO, (x, y) => 4);
  for (let x = 130; x <= 190; x++) for (let y = 130; y <= 136; y++) R.pset(x, y, rmp(PIEDRA, 1.4 + (x % 4 === 0 ? -1 : 0), x, y));
  // los morillos y el guardafuegos
  for (const px of [140, 180]) { lin(px, 124, px, 136, HIERRO[2]); R.disco(px, 123, 2, LATON[3]); }
  for (let x = 124; x <= 196; x += 3) lin(x, 138, x, 146, LATON[1]); lin(124, 138, 196, 138, LATON[3]);
  // sobre la repisa: dos candeleros, el reloj de repisa y un retrato de silueta
  relleno(150, 40, 170, 61, NOGAL, (x, y) => 2.6 + (x === 150 || x === 170 ? -1.2 : 0)); R.disco(160, 50, 6, BLANCO[4]); ps(160, 46, K); ps(160, 50, K);
  // el sillón de orejas (para el viejo) y la cesta de leña
  sillon(50, 150);
  for (let k = 0; k < 8; k++) { R.disco(226 + (k % 4) * 5, 146 - Math.floor(k / 4) * 5, 2, PINO[2 + (k % 2)]); ps(226 + (k % 4) * 5, 146 - Math.floor(k / 4) * 5, PINO[5]); }
  relleno(220, 146, 246, 152, NOGAL, (x, y) => 2.4 + ((x - 220) % 4 === 0 ? -1 : 0));
  // la ventanita de la derecha (lo de fuera cambia de estación en cada fotograma)
  cortina(252, 50, 258, 112, BURDEOS); cortina(296, 50, 302, 112, BURDEOS);
  cuadro(28, 40, 68, 70, 'barco');
}
function salitaMesaFondo() {
  salitaBase(true);
  // la ventana de noche a la izquierda, con luna
  cortina(20, 26, 28, 112, BURDEOS); cortina(84, 26, 92, 112, BURDEOS);
  ventana(28, 28, 84, 104, (a, b, c, d) => { paisaje(a, b, c, d, { noche: true, nieve: false }); R.disco(70, 44, 5, NIEVE[4]); R.disco(72, 43, 4, NIEVE[1]); }, {});
  // la mesa redonda con su tapete (x 120–230, tablero y 124)
  caja(116, 118, 236, 130, (x, y) => { const d = Math.hypot((x - 176) / 60, (y - 124) / 6); if (d < 1) R.pset(x, y, rmp(NOGAL, d > 0.85 ? 1.2 : 3 + (y < 123 ? 0.8 : 0), x, y)); });
  caja(132, 120, 220, 128, (x, y) => { const d = Math.hypot((x - 176) / 44, (y - 124) / 4); if (d < 1 && ((x + y) % 3)) R.pset(x, y, BLANCO[4 + ((x >> 1) & 1)]); });
  relleno(172, 130, 180, 150, NOGAL, (x, y) => 2 + (x === 172 ? 1 : 0)); lin(160, 150, 192, 150, NOGAL[2]); lin(162, 151, 190, 151, NOGAL[1]);
  // el reloj de pie de la derecha y un cuadro
  relleno(262, 46, 286, 146, NOGAL, (x, y) => 2.2 + (x === 262 || x === 286 ? -1.4 : 0) + (y < 50 ? 1.6 : 0)); R.disco(274, 62, 8, LATON[1]); R.disco(274, 62, 7, BLANCO[3]); lin(274, 62, 274, 57, K); lin(274, 62, 277, 64, K);
  relleno(268, 78, 280, 136, NOGAL, (x, y) => 0.8);
}
function salitaVentana(t, o = {}) {
  fijo('salV', salitaVentanaFondo);
  ventana(102, 26, 206, 108, (a, b, c, d) => {
    if (!FIJOS.salVfuera) horno('salVfuera', () => { R.recorte([a, b, c, d]); paisaje(a, b, c, d, { nieve: false }); caja(a, d - 18, c, d, (x, y) => ps(x, y, rmp(BARRO, 3 + (h2(x >> 1, y, 2) - 0.5) * 0.8 + (Math.abs(y - d + 9) < 2 ? 0.8 : 0), x, y))); R.recorte(null); });
    const B = FIJOS.salVfuera; for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) R.pset(x, y, B[y * 320 + x]);
    // árboles de otoño que pierden las hojas
    for (const [tx, ty] of [[118, 92], [190, 90]]) { lin(tx, ty, tx, ty - 22, NOGAL[1]); for (let k = 0; k < 30; k++) { const an = h2(k, tx, 2) * 6.28, r = h2(k, tx, 3) * 10; R.disco(ri(tx + Math.cos(an) * r), ri(ty - 26 + Math.sin(an) * r * 0.8), 2, [hex('#c86a24'), hex('#e09a30'), hex('#a84a1e')][k % 3]); } }
    for (let k = 0; k < 10; k++) { const u = (t * 0.25 + k / 10) % 1; ps(a + (h2(k, 1, 6) * (c - a) + Math.sin(t * 2 + k) * 6 + u * 20) % (c - a), b + u * (d - b), [hex('#e09a30'), hex('#c86a24')][k % 2]); }
    // el jinete que pasa por el camino sin pararse
    if (o.jinete != null && o.jinete > 0 && o.jinete < 1) { const jx = lerp(a - 20, c + 20, o.jinete); R.actor(EL.vecino, ri(jx) - 2, d - 16, t, { dir: 1, quieto: true }); T.b_mula(R, ri(jx), d - 4, t, { dir: 1, mula: false, carga: false, color: 'tordo', anda: true });
      for (let k = 1; k < 5; k++) ps(jx - 14 - k * 3, d - 5 - (k & 1), mez(BARRO[4], 0xffffffff, 0.3)); }
  }, { cols: 3 });
  return { suelo: 156 };
}
function salitaHogar(t, o = {}) {
  fijo('salH', salitaHogarFondo);
  // el fuego y su luz
  for (let k = 0; k < 14; k++) { const fx = 146 + (k % 7) * 5 + Math.sin(t * 9 + k) * 1.5, fh = 6 + Math.abs(Math.sin(t * 7 + k * 1.3)) * 10; for (let j = 0; j < fh; j++) ps(fx + Math.sin(t * 11 + j + k) * 0.7, 128 - j, j < fh * 0.4 ? VELAL : j < fh * 0.7 ? VELA : CALIDA); }
  relleno(140, 128, 182, 131, PINO, (x, y) => 1.4 + (x % 6 === 0 ? -1 : 0));
  luz(160, 120, 70, CALIDA, 0.35);
  // la ventanita: las estaciones que pasan (o.anos 0–1)
  const est = o.anos ?? 0, fase = Math.floor(est * 52) % 4, CI = [NIEVE, PRADO, PRADO, pal(['#6a3a1a', '#8a4a1e', '#b06a24', '#d08a30', '#e0a040', '#f0c060'])][fase];
  ventana(258, 52, 296, 108, (a, b, c, d) => { caja(a, b, c, d, (x, y) => ps(x, y, y < b + (d - b) * 0.55 ? rmp(CIELO, 4 - (y - b) * 0.08, x, y) : rmp(CI, 3 + (h2(x >> 1, y >> 1, 4) - 0.5), x, y))); if (fase === 0) copos(a, b, c, d, t, 10); }, { filas: 2 });
  // el calendario grande sobre la chimenea con el año que corre
  calendario(170, 88 - 26 - 8, o.mes ?? 6, o.anyo ?? 1832, o.flip ?? 0, { w: 28, h: 26 });
  // los candeleros de la repisa: las velas se consumen con los años
  const alto = ri(lerp(8, 2, est)); vela(120, 61, t, { alto, r: 16, a: 0.3 }); vela(200, 61, t, { alto, r: 16, a: 0.3 });
  return { suelo: 156 };
}
function salitaMesa(t, o = {}) {
  fijo('salM', salitaMesaFondo);
  // el péndulo del reloj
  const p = Math.sin(t * Math.PI) * 0.35, px = 274 + Math.sin(p) * 16, py = 84 + Math.cos(p) * 16; R.recorte([268, 78, 280, 136]); R.linea(274, 80, ri(px), ri(py), LATON[2]); R.disco(ri(px), ri(py), 3, LATON[3]); R.recorte(null);
  // el quinqué sobre la mesa y su luz cálida
  const lx = 208, ly = 118; relleno(lx - 4, ly - 2, lx + 4, ly + 2, LATON, (x, y) => 2.6 + (x < lx ? 0.8 : 0)); caja(lx - 3, ly - 12, lx + 3, ly - 3, (x, y) => { const d = Math.hypot((x - lx) / 3.5, (y - ly + 7) / 5); if (d < 1) R.pset(x, y, mez(VELAL, 0xffffffff, 0.3 - d * 0.3)); });
  ps(lx, ly - 8, VELA); ps(lx, ly - 7, CALIDA); luz(lx, ly - 7, 64, VELA, 0.55);
  // la polilla alrededor de la lámpara
  const ma = t * 3.3; ps(lx + Math.cos(ma) * 9, ly - 14 + Math.sin(ma * 1.7) * 5, PAPEL[3]);
  return { suelo: 156 };
}

// el quinqué de cerca (base en x, y): pie de latón, depósito, tubo de cristal y su luz
function quinque(x, y, t) {
  caja(x - 9, y - 6, x + 9, y, (xx, yy) => { const d = Math.hypot((xx - x) / 9, (yy - y + 3) / 3.5); if (d < 1) R.pset(xx, yy, rmp(LATON, 2.6 + (xx < x ? 1 : -0.6) - (d > 0.85 ? 1.4 : 0), xx, yy)); });
  relleno(x - 2, y - 16, x + 2, y - 6, LATON, (xx, yy) => 2.6 + (xx < x ? 1 : 0));
  caja(x - 8, y - 30, x + 8, y - 16, (xx, yy) => { const d = Math.hypot((xx - x) / 8, (yy - y + 23) / 7); if (d < 1) R.pset(xx, yy, rmp(pal(['#4a5a3a', '#6a7e4a', '#8aa05a', '#b0c47a']), 2.4 + (xx < x - 2 ? 1 : 0), xx, yy)); });
  caja(x - 4, y - 50, x + 4, y - 30, (xx, yy) => { const w = yy < y - 44 ? 3 : 4; if (Math.abs(xx - x) <= w) R.pset(xx, yy, mez(VELAL, 0xffffffff, Math.abs(xx - x) === w ? 0.5 : 0.1)); });
  const f = Math.sin(t * 9) > 0 ? 1 : 0; for (let j = 0; j < 7; j++) ps(x, y - 33 - j - f, j < 3 ? 0xffffffff : VELA);
  luz(x, y - 38, 76, VELA, 0.5);
}

// ── los insertos de bl-carta ──
// la mesa de pino de la posada con el desayuno: la carta de Beale se despliega (lacre roto, renglones, el dibujo de la caja)
function mesaCartaFondo() {
  caja(0, 0, 319, 54, (x, y) => R.pset(x, y, rmp(YESO, 3.8 - (1 - y / 54) * 0.8 + (h2(x >> 2, y >> 2, 3) - 0.5) * 0.7, x, y)));
  caja(0, 44, 319, 54, (x, y) => R.pset(x, y, rmp(PINO, y < 46 ? 4 : 2.2 + ((x % 16) === 0 ? -1.2 : 0), x, y)));
  ventana(196, 12, 250, 42, (a, b, c, d) => paisaje(a, b, c, d, { nieve: false }), { filas: 1 });
  relleno(24, 40, 170, 43, PINO, (x, y) => (y === 40 ? 4.4 : y === 41 ? 3 : 1.2));
  for (let k = 0; k < 6; k++) { const px = 32 + k * 23, hh = 10 + (k % 3) * 3, M = [PIEDRA, pal(['#3a5a3a', '#4a7a4a', '#6a9a5a', '#8aba7a']), BLANCO, pal(['#6a3a1a', '#8a5426', '#aa6e34', '#c88c4a'])][k % 4];
    relleno(px, 40 - hh, px + 12, 39, M, (x, y) => 2.4 + (x < px + 3 ? 1 : x > px + 10 ? -1 : 0) + (y === 40 - hh ? 1 : 0)); relleno(px + 2, 38 - hh, px + 10, 40 - hh, NOGAL, (x, y) => 2.6); }

  mesaCerca(55, 168, PINO, { canto: 10 });
  // el desayuno: la taza, el plato con pan, las gafas y el sobre abierto con el lacre roto
  caja(30, 120, 62, 140, (x, y) => { const d = Math.hypot((x - 46) / 16, (y - 130) / 7); if (d < 1) R.pset(x, y, rmp(BLANCO, d > 0.82 ? 4.6 : 3.6, x, y)); });
  relleno(38, 108, 54, 128, BLANCO, (x, y) => 4 + (x < 42 ? 0.6 : x > 50 ? -1 : 0) + (y === 108 ? 0.8 : 0)); lin(55, 112, 58, 116, BLANCO[2]); lin(58, 116, 55, 122, BLANCO[2]);
  caja(39, 109, 53, 111, (x, y) => R.pset(x, y, pal(['#3a2010'])[0]));
  relleno(236, 120, 300, 156, PAPEL, (x, y) => 3.6 + (y > 138 ? -0.4 : 0) + (Math.abs((x - 236) - (y - 120) * 1.8) < 1 ? -1 : 0) + (Math.abs((300 - x) - (y - 120) * 1.8) < 1 ? -1 : 0));
  marco(236, 120, 300, 156, PAPEL[1]); R.disco(268, 138, 4, hex('#8a1a14')); R.disco(268, 138, 3, ROJO); lin(265, 136, 270, 141, hex('#5a0e0a'));
  R.numero('5·1822', 268, 152, { tam: 8, centro: true, color: TINTA, sombra: false, fina: true });
  sombraCaja(236, 157, 302, 159, 0.4);
}
// el escritorio del amigo de noche (para el sobre lacrado): nogal oscuro, vela, barra de lacre, sello y arenillero
function mesaSobreFondo() {
  caja(0, 0, 319, 60, (x, y) => R.pset(x, y, rmp(pal(['#141018', '#1c1622', '#261e2c', '#322836', '#3e3240']), 1.6 + (h2(x >> 1, y >> 2, 2) - 0.5) * 0.6 + ((x % 22) === 0 ? -0.8 : 0), x, y)));
  // una estantería de libros en penumbra arriba a la izquierda (fuera de la barra del año: desde y 24)
  for (let k = 0; k < 18; k++) { const bx = 8 + k * 7, M = [BURDEOS, SALVIA, NOGAL, ROBLE][k % 4]; relleno(bx, 26 + (k % 3) * 2, bx + 5, 52, M, (x, y) => 1.2 + (x === bx ? 0.8 : 0)); }
  relleno(4, 53, 136, 56, NOGAL, (x, y) => (y === 53 ? 3 : 1));
  cortina(176, 10, 182, 56, BURDEOS); cortina(240, 10, 246, 56, BURDEOS);
  ventana(182, 12, 240, 54, (a, b, c, d) => { paisaje(a, b, c, d, { noche: true, nieve: false }); R.disco(226, 22, 4, NIEVE[4]); }, { filas: 2 });
  mesaCerca(61, 168, NOGAL, { canto: 10 });
  // la barra de lacre, el sello de latón, el arenillero y el reloj de bolsillo
  relleno(40, 132, 84, 137, pal(['#5a0e0a', '#8a1a14', '#b83228', '#e05a3c']), (x, y) => 2 + (y === 132 ? 1 : 0)); ps(84, 134, K);
  relleno(98, 120, 104, 140, NOGAL, (x, y) => 3 + (x === 98 ? 1 : 0)); R.disco(101, 142, 4, LATON[2]); R.disco(101, 118, 3, NOGAL[4]);
  relleno(250, 110, 262, 128, LATON, (x, y) => 2.4 + (x < 254 ? 1 : 0) + (y === 110 ? 1 : 0)); for (let k = 0; k < 4; k++) ps(253 + k * 2, 111, K);
  R.disco(278, 146, 9, LATON[1]); R.disco(278, 146, 7, BLANCO[4]); lin(278, 146, 278, 141, K); lin(278, 146, 281, 147, K); lin(278, 137, 286, 120, LATON[2]);
}
// el escritorio de Morriss en 1845 de noche (para el martillo): la caja cerrada, el candado, el martillo en la mano
function mesaMartilloFondo() {
  caja(0, 0, 319, 64, (x, y) => R.pset(x, y, rmp(pal(['#1a2018', '#222a20', '#2c3628', '#384432', '#44523e']), 1.6 + (((x % 10) < 3) ? 0.6 : 0) + (h2(x >> 1, y >> 2, 2) - 0.5) * 0.5 - (tranq(x, y) ? 0.4 : 0), x, y)));
  caja(0, 58, 319, 64, (x, y) => R.pset(x, y, rmp(NOGAL, y === 58 ? 4 : 1.4, x, y)));
  // en la pared: la librería baja con legajos, un retrato de silueta y el mapa del James
  relleno(8, 24, 120, 57, NOGAL, (x, y) => 0.8 + (h2(x >> 1, y >> 1, 2) - 0.5) * 0.4); lin(8, 40, 120, 40, NOGAL[4]);
  for (let k = 0; k < 26; k++) { const bx = 10 + k * 4.2, M = [BURDEOS, SALVIA, NOGAL, ROBLE, PAPEL][k % 5]; relleno(ri(bx), k % 2 ? 28 : 30, ri(bx) + 3, 39, M, (x, y) => 2 + (x === ri(bx) ? 1 : 0)); relleno(ri(bx), k % 3 ? 43 : 45, ri(bx) + 3, 56, M, (x, y) => 1.8 + (x === ri(bx) ? 1 : 0)); }
  // el tablero de las llaves de la posada, con sus números
  relleno(132, 24, 172, 56, ROBLE, (x, y) => 2.4 + (x === 132 || x === 172 || y === 24 || y === 56 ? -1.4 : 0) + (h2(x >> 1, y >> 2, 3) - 0.5) * 0.4);
  for (let k = 0; k < 6; k++) { const kx = 140 + (k % 3) * 12, ky = 30 + Math.floor(k / 3) * 14; ps(kx, ky, LATON[4]); lin(kx, ky + 1, kx, ky + 7, LATON[2]); R.disco(kx, ky + 9, 1, LATON[3]); R.numero(String(k + 1), kx + 5, ky + 6, { tam: 8, color: PAPEL[4], sombra: false, fina: true }); }
  caja(182, 26, 254, 54, (x, y) => { const e = Math.min(x - 182, 254 - x, y - 26, 54 - y); if (e < 3) { R.pset(x, y, rmp(LATON, e === 0 ? 0.4 : 2.2, x, y)); return; } R.pset(x, y, rmp(PAPEL, 2.6 + (h2(x >> 1, y >> 1, 5) - 0.5) * 0.6, x, y)); });
  for (let x = 186; x < 250; x++) ps(x, 40 + Math.sin(x * 0.15) * 4 + (x - 186) * 0.05, pal(['#3a5a7a'])[0]); R.disco(214, 41, 1, ROJO);
  mesaCerca(65, 168, pal(['#2a1e12', '#3a2a1a', '#4c3824', '#604830', '#76583c', '#8c6a48']), { canto: 10 });
  // el calendario de mesa con «1845» y unas cartas viejas atadas
  relleno(30, 92, 66, 124, PAPEL, (x, y) => 3.4 - (y - 92) * 0.02); marco(30, 92, 66, 124, PAPEL[0]); caja(31, 93, 65, 100, (x, y) => R.pset(x, y, ROJO));
  R.numero('1845', 48, 120, { tam: 8, centro: true, color: TINTA, sombra: false });
  for (const px of [36, 60]) { ps(px, 91, LATON[3]); ps(px, 90, K); }
  for (let k = 0; k < 3; k++) relleno(256 + k, 138 - k * 3, 300 + k, 152 - k * 3, PAPEL, (x, y) => 3 - k * 0.4 + (y === 138 - k * 3 ? 1 : 0));
  lin(278, 128, 278, 152, BURDEOS[3]);
}
// la mesa de la salita con el tapete (para la lectura): las tres hojas extendidas y las dos cartas
function mesaLecturaFondo() {
  caja(0, 0, 319, 60, (x, y) => R.pset(x, y, rmp(PARED_S, 1.6 + (((x % 13) < 5) ? -0.5 : 0) + (h2(x >> 1, y >> 2, 2) - 0.5) * 0.5 - (tranq(x, y) ? 0.3 : 0), x, y)));
  caja(0, 54, 319, 60, (x, y) => R.pset(x, y, rmp(NOGAL, y === 54 ? 4 : 1.4, x, y)));
  // en la pared: un retrato de silueta ovalado y un aplique
  cuadro(196, 24, 240, 50, 'barco');
  cuadro(60, 26, 110, 50, 'rio');
  mesaCerca(61, 168, NOGAL, { canto: 10 });
  // el tapete de ganchillo
  caja(40, 90, 280, 166, (x, y) => { const d = Math.hypot((x - 160) / 120, (y - 128) / 38); if (d < 1 && (((x >> 1) + (y >> 1)) % 3 || d < 0.9)) R.pset(x, y, rmp(BLANCO, 3.6 + (((x >> 2) + (y >> 2)) & 1 ? 0.6 : -0.3) - (d > 0.95 ? 1.2 : 0), x, y)); });
  // las gafas y el candado roto a un lado
  for (const gx of [272, 286]) { R.disco(gx, 152, 5, LATON[1]); R.disco(gx, 152, 4, mez(NOGAL[3], 0xffffffff, 0.3)); ps(gx - 2, 150, 0xffffffff); } lin(277, 151, 281, 151, LATON[1]);
}
'''

PLANOS_C = r'''
// 1. LA OFICINA DE CORREOS (mayo de 1822): Morriss entra; el cartero saca una carta del casillero, la sella en «dated»
//    (sale el «5·1822») y se la da por encima del mostrador; Morriss ve el lacre y se sorprende.
function c1(t) {
  fijo('correos', correosFondo);
  // el cartero tras el mostrador: coge la carta del casillero, la sella y la entrega
  const coge = tramo(t, 0.3, 1.2), vuelve = tramo(t, 1.4, TG.ARRIVES), da = tramo(t, TG.Y1822 + 0.3, TG.Y1822 + 0.9);
  const cx = lerp(lerp(230, 196, coge), 176, vuelve);
  const sc = R.actor(EL.carteroBL, ri(cx), 134, t, { dir: vuelve > 0.5 ? -1 : 1, anda: (coge > 0 && coge < 1) || (vuelve > 0 && vuelve < 1), sostiene: coge > 0.6 && da < 1 ? (t > TG.DATED - 0.2 && t < TG.DATED + 0.4 ? [ri(cx) - 2, 118 - (t < TG.DATED ? 4 : 0)] : [ri(lerp(cx - 1, 156, da)), ri(lerp(116, 112, da))]) : false, sonrisa: da > 0.5, habla: t > TG.ARRIVES && t < TG.DATED && parp(t, 7) });
  // Morriss entra por la puerta y llega al mostrador
  const mu = tramo(t, 0.2, 1.8), mx = lerp(16, 130, mu), tiene = da >= 1;
  const sm = R.actor(EL.morrissBL, ri(mx), 156, t, { dir: 1, anda: mu > 0 && mu < 1, sostiene: tiene ? [ri(mx) + 13, 136] : false, sorpresa: tiene && t < TG.P2 - 0.6, sonrisa: tiene && t > TG.P2 - 0.6 });
  correosDelante();
  // la carta: en la mano del cartero o en la de Morriss
  const [lx, ly] = tiene ? sm.mano : sc.mano;
  if (coge > 0.6) { relleno(lx - 4, ly - 3, lx + 4, ly + 2, PAPEL, (x, y) => 4.2 + (y === ly - 3 ? 0.8 : 0)); marco(lx - 4, ly - 3, lx + 4, ly + 2, PAPEL[1]); ps(lx, ly, ROJO); ps(lx + 1, ly, hex('#8a1a14')); }
  // el golpe del tampón y el matasellos que sube
  const st = tramo(t, TG.DATED - 0.05, TG.DATED + 0.3);
  if (st > 0 && t < TG.P2 - 0.4) { const yy = ri(104 - st * 6); R.numero('5·1822', 196, yy, { tam: 8, centro: true }); if (st < 1) brillo(178, 114, t, 0.7, DORL); }
  // la mosca que ronda la ventana
  ps(76 + Math.sin(t * 4) * 8, 60 + Math.sin(t * 6.3) * 5, K);
}

// 2. INSERTO, LA CARTA ABIERTA sobre la mesa del desayuno: las manos de Morriss la despliegan; en «the box» aparece el
//    dibujito de la caja, en «papers» tres hojitas de números, en «no one can understand» una «?», y en «key» una
//    llave tachada.
function c2(t) {
  fijo('mesaCarta', mesaCartaFondo);
  copos(198, 14, 248, 40, t, 0, 0);
  const ab = tramo(t, TG.P2, TG.P2 + 0.8), x0 = 96, x1 = 216, yb = 166, y0 = ri(lerp(150, 62, ease(ab)));
  hojaPapel(x0, y0, x1, yb, { n: 12, ver: tramo(t, TG.P2 + 0.3, TG.KEY), k: 11 });
  // los dibujos que va haciendo la carta
  const top = y0 + 6;
  const dB = tramo(t, TG.BOX - 0.2, TG.BOX + 0.1); if (dB > 0) { T.d_caja(R, 132, top + 30, { escala: 1, t }); }
  const dP = tramo(t, TG.PAPERS - 0.2, TG.PAPERS + 0.2); if (dP > 0) for (let k = 0; k < 3; k++) T.d_hoja(R, 162 + k * 14, top + 26, { n: k + 1, escala: 0.5, t, ver: dP });
  const dQ = tramo(t, TG.NOONE - 0.1, TG.NOONE + 0.2); if (dQ > 0) R.icono('?', 190, top + 38 - ri(dQ * 3), ROJO, K, 2);
  const dK = tramo(t, TG.KEY - 0.4, TG.KEY); if (dK > 0) { R.icono('llave', 140, top + 58, DORADO, K, 2); if (dK > 0.6) R.icono('X', 142, top + 58, ROJO, K, 2); }
  // las manos que la sujetan por los lados (camisa blanca de Morriss)
  T.mano(R, x0 - 2, ri(y0 + 40 + Math.sin(t * 1.5)), 1, '#f2eee2', { sinManga: true });
  T.mano(R, x1 + 2, ri(y0 + 44 + Math.sin(t * 1.5 + 1)), -1, '#f2eee2', { sinManga: true });
  // vapor de la taza
  for (let k = 0; k < 4; k++) { const u = (t * 0.7 + k / 4) % 1; ps(46 + Math.sin(t * 2 + k) * 2, 106 - u * 14, mez(BLANCO[5], YESO[3], u)); }
}

// 3. INSERTO, EL ESCRITORIO DEL AMIGO (de noche): la mano mete la hoja de la clave (con su llave dibujada) en un sobre,
//    lo cierra y le pone el lacre en «sealed envelope»; luego escribe «6·1832» en «June 1832».
function c3(t) {
  fijo('mesaSobre', mesaSobreFondo);
  vela(226, 120, t, { r: 60, a: 0.5, alto: 12 });
  const ex0 = 110, ey0 = 100, ex1 = 206, ey1 = 150;
  // el sobre abierto (solapa arriba) y la hoja que entra
  relleno(ex0, ey0, ex1, ey1, PAPEL, (x, y) => 3.4 + (Math.abs((x - ex0) - (y - ey0) * 0.96) < 1 || Math.abs((ex1 - x) - (y - ey0) * 0.96) < 1 ? -1 : 0));
  marco(ex0, ey0, ex1, ey1, PAPEL[1]);
  const entra = tramo(t, TG.P3, TG.KEY2 + 0.2), hy = ri(lerp(46, 104, entra));
  if (entra < 1) { hojaPapel(ex0 + 14, hy, ex1 - 14, hy + 40, { n: 4, k: 3 }); R.icono('llave', 150, hy + 22, DORADO, K, 2); }
  const cierra = tramo(t, TG.KEY2 + 0.2, TG.SEALED - 0.1);
  if (cierra < 1) R.poligono([[ex0, ey0], [ex1, ey0], [ri((ex0 + ex1) / 2), ri(lerp(ey0 - 40, ey0, cierra))]], PAPEL[3]);
  else { R.poligono([[ex0, ey0], [ex1, ey0], [ri((ex0 + ex1) / 2), ey0 + 38]], PAPEL[4]); lin(ex0, ey0, (ex0 + ex1) / 2, ey0 + 38, PAPEL[1]); lin(ex1, ey0, (ex0 + ex1) / 2, ey0 + 38, PAPEL[1]); }
  // el lacre y el sello que se aprieta
  const se = tramo(t, TG.SEALED - 0.1, TG.ENVEL);
  if (se > 0) { R.disco(158, ey0 + 38, 7, hex('#8a1a14')); R.disco(158, ey0 + 38, 6, ROJO); R.icono('llave', 155, ey0 + 35, hex('#5a0e0a'), hex('#e05a3c'), 1); if (se < 1) brillo(158, ey0 + 38, t, 0.8, DORL); }
  // la mano: primero mete la hoja, luego aprieta el sello y luego escribe con la pluma
  const escribe = tramo(t, TG.JUNE - 0.6, TG.JUNE + 0.3);
  let hx = 230, hy2 = 80;
  if (t < TG.KEY2 + 0.2) { hx = 250; hy2 = 132; } else if (t < TG.ENVEL + 0.4) { hx = 166; hy2 = ri(ey0 + 30 - (se > 0 && se < 1 ? (1 - se) * 6 : 0)); } else if (escribe > 0) { hx = ri(132 + escribe * 46); hy2 = ey1 - 10 + ri(Math.sin(t * 30) * 0.7); } else { hx = 250; hy2 = 96; }
  T.brazo(R, hx + 46, 196, hx + 8, hy2 + 4, '#5a5a62', -1, { codo: [hx + 40, ri(hy2 + 30)] });
  if (escribe > 0) { lin(hx - 2, hy2 + 2, hx + 8, hy2 - 12, BLANCO[5]); R.numero('6·1832', 156, ey1 - 4, { tam: 8, centro: true, color: TINTA, sombra: false, n: Math.floor(escribe * 6) }); }
  if (t > TG.JUNE + 0.3) R.numero('6·1832', 156, ey1 - 4, { tam: 8, centro: true, color: TINTA, sombra: false });
}

// 4. EL PORCHE DE LA POSADA (GAG): Atom vigila el buzón; las hojas del calendario vuelan de 1822 a 1832 entre nieve,
//    flores y hojas secas; en «June 1832» abre el buzón: vacío (sale una polilla); en «comes and goes» el cartero pasa
//    por delante sin pararse.
const anyoBuzon = (t) => ri(lerp(1822, 1832, tramo(t, TG.P4 + 0.2, TG.JUNE2 - 0.1)));
function c4(t) {
  const ab = tramo(t, TG.Y1832 + 0.1, TG.Y1832 + 0.5) * (1 - tramo(t, TG.GOES, TG.P5 - 0.1));
  const g = T.lynchburg(R, t, { encuadre: 'calle', camara: 'puerta', buzon: ab, nieve: false });
  // el calendario colgado junto a la puerta, con las hojas que vuelan
  const vuela = t > TG.P4 + 0.2 && t < TG.JUNE2 - 0.1, an = anyoBuzon(t), fl = vuela ? (t * 4) % 1 : 0;
  calendario(196, 72, 6, an, fl, { w: 26, h: 26 });
  for (let k = 0; k < 8; k++) { const u = ((t - TG.P4) * 0.6 + k / 8) % 1; if (t < TG.P4 + 0.2 || t > TG.JUNE2 + 0.6) continue; const x = 208 + u * 80 + Math.sin(t * 3 + k) * 6, y = 80 + u * 70 + Math.sin(t * 5 + k) * 4; R.poligono([[ri(x), ri(y)], [ri(x + 5), ri(y - 2)], [ri(x + 6), ri(y + 4)], [ri(x + 1), ri(y + 5)]], PAPEL[4]); ps(x + 2, y + 1, ROJO); }
  // las estaciones que pasan por delante (nieve, pétalos, hojas secas)
  if (vuela) { const fase = Math.floor((t - TG.P4) * 2.4) % 4, C4 = [NIEVE[5], hex('#f0b0c8'), hex('#e09a30'), hex('#c86a24')][fase]; for (let k = 0; k < 24; k++) { const x = (h2(k, 1, 8) * 340 + t * 20) % 340 - 10, y = (h2(k, 2, 8) * 180 + t * (20 + k % 4 * 6)) % 180; ps(x, y, C4); ps(x + 1, y, C4); } }
  // Atom espera junto al buzón, da golpecitos con el pie; abre, mira dentro y se queda triste
  const triste = t > TG.COMES - 0.2, mira = ab > 0.5;
  AT.atom(R, 216, 150, t, { dir: 1, pose: mira && !triste ? 'senala' : triste ? 'quieto' : 'piensa', cara: triste ? 'triste' : mira ? 'sorpresa' : 'normal' });
  if (vuela && Math.floor(t * 4) % 2) { ps(220, 149, K); }
  // la polilla que sale del buzón vacío
  if (ab > 0.6) { const u = tramo(t, TG.Y1832 + 0.4, TG.COMES + 0.4), mx = 238 + u * 30 + Math.sin(t * 9) * 3, my = 122 - u * 40; ps(mx, my, PAPEL[3]); ps(mx - 1, my - (Math.sin(t * 30) > 0 ? 1 : 0), PAPEL[2]); ps(mx + 1, my - (Math.sin(t * 30) > 0 ? 1 : 0), PAPEL[2]); }
  // el cartero pasa con su saca, sin mirar el buzón
  const cu = tramo(t, TG.COMES - 0.4, TG.P5), cx = lerp(40, 330, cu);
  if (cu > 0 && cu < 1) { const s = R.actor(EL.carteroBL, ri(cx), 156, t, { dir: 1, anda: true, sostiene: [ri(cx) + 13, 140] }); caja(s.mano[0] - 3, s.mano[1], s.mano[0] + 5, s.mano[1] + 9, (x, y) => R.pset(x, y, rmp(pal(['#4a3a24', '#6a5434', '#8a7046']), 1.6 + (x < s.mano[0] ? 0.6 : 0), x, y))); }
  T.lynchburgDelante(R, t, { encuadre: 'calle', camara: 'puerta', nieve: false });
}

// 5. LA SALITA, LA VENTANA (otoño de 1832): Morriss espera junto a la ventana («left waiting»), mira el camino; un
//    jinete pasa de largo en «Beale never shows up again» y Morriss baja la cabeza.
function c5(t) {
  const jin = tramo(t, TG.JUST - 0.4, TG.AGAIN + 0.2);
  salitaVentana(t, { jinete: jin });
  const vuelve = t > TG.AGAIN - 0.2, asoma = t > TG.BEALE - 0.6 && t < TG.AGAIN - 0.2;
  // el velador junto a la ventana con la bandeja de las cartas, vacía
  relleno(80, 128, 104, 131, NOGAL, (x, y) => (y === 128 ? 4.2 : 2)); lin(92, 131, 92, 154, NOGAL[2]); lin(86, 154, 98, 154, NOGAL[1]);
  relleno(84, 124, 100, 127, LATON, (x, y) => (y === 124 ? 3.6 : 2)); 
  const sm = R.actor(EL.morrissBL, ri(lerp(118, 132, tramo(t, TG.P5, TG.P5 + 0.8))), 156, t, { dir: vuelve ? -1 : 1, anda: t < TG.P5 + 0.8, salto: asoma && jin > 0.2 && jin < 0.5 ? 1 : 0, sorpresa: asoma && jin < 0.55, triste: (t > TG.NEVER && t < TG.BEALE - 0.6) || jin >= 0.55, sostiene: t < TG.NEVER ? [96, 134] : false });
  // el reloj de bolsillo que mira mientras espera
  if (t < TG.NEVER) { R.disco(sm.mano[0], sm.mano[1] - 1, 2, LATON[3]); ps(sm.mano[0], sm.mano[1] - 1, BLANCO[5]); lin(sm.mano[0], sm.mano[1] - 3, sm.mano[0] - 3, sm.mano[1] - 7, LATON[2]); }
  // el gato que duerme en el sillón
  T.gato(R, 52, 102, t, { dir: -1 });
  bocad(92, 116, '?', tramo(t, TG.ENVEL2 - 0.2, TG.ENVEL2 + 0.1) * (t < TG.NEVER + 0.6 ? 1 : 0));
}

// 6. LA SALITA, LA CHIMENEA (1832 → 1845): «Morriss waits thirteen more years»: el calendario de la repisa vuela de
//    1832 a 1845, las velas se consumen, por la ventanita pasan las estaciones y Morriss encanece junto al fuego; en
//    «just in case» mira hacia el despacho.
const anyoHogar = (t) => ri(lerp(1832, 1845, tramo(t, TG.WAITS - 0.2, TG.CASE - 0.2)));
function c6(t) {
  const u = tramo(t, TG.WAITS - 0.2, TG.CASE - 0.2), an = anyoHogar(t), fl = u > 0 && u < 1 ? (t * 5) % 1 : 0;
  salitaHogar(t, { anos: u, anyo: an, mes: an === 1845 ? 1 : 6, flip: fl });
  const viejo = u > 0.5, cambio = Math.abs(u - 0.5) < 0.06;
  R.actor(viejo ? EL.morrissViejoBL : EL.morrissBL, 96, 156, t, { dir: t > TG.CASE - 0.1 ? -1 : 1, triste: t > TG.Y13 && t < TG.CASE - 0.1, dedo: t > TG.CASE && t < TG.P7 - 0.3 });
  if (cambio) for (let k = 0; k < 8; k++) { const a = k / 8 * 6.28; ps(104 + Math.cos(a) * 10, 136 + Math.sin(a) * 10, BLANCO[5]); }
  if (t > TG.Y13 - 0.1 && t < TG.CASE - 0.4) R.numero('13', 104, 112, { tam: 16, centro: true });
  bocad(100, 126, '!', tramo(t, TG.CASE, TG.CASE + 0.3));
  // el gato del felpudo duerme (y respira)
  T.gato(R, 240, 160, t, { dir: -1 });
}

// 7. INSERTO, EL ESCRITORIO DE NOCHE (1845): la mano vieja de Morriss levanta el martillo sobre el candado («breaking
//    that lock»), duda y lo baja («betraying a friend»); en «1845» el calendario de mesa brilla.
function c7(t) {
  fijo('mesaMart', mesaMartilloFondo);
  vela(300, 116, t, { r: 80, a: 0.5, alto: 7 });
  const D = T.d_caja(R, 228, 156, { escala: 4, t });
  const cx = D.candado ? D.candado[0] : 228, cy = D.candado ? D.candado[1] : 132;
  const sube = tramo(t, TG.P7, TG.LOCK), duda = t > TG.LOCK && t < TG.FRIEND2 ? Math.sin(t * 9) * 1.5 : 0, baja = tramo(t, TG.FRIEND2 - 0.3, TG.UNTIL + 0.2);
  const hx = ri(cx + 44 + baja * 14), hy = ri(lerp(lerp(160, cy - 26, sube), 168, baja) + duda);
  // el martillo: mango y cabeza (en la mano)
  lin(hx - 2, hy, hx - 22, hy - 4, ROBLE[4]); lin(hx - 2, hy + 1, hx - 22, hy - 3, ROBLE[2]);
  caja(hx - 32, hy - 14, hx - 18, hy + 6, (x, y) => { const d = Math.abs((x - (hx - 25)) * 1.0 + (y - (hy - 4)) * 0.25); if (d < 5 && Math.abs(y - (hy - 4)) < 9) R.pset(x, y, d > 4 || Math.abs(y - (hy - 4)) > 8 ? K : rmp(pal(['#2a2a32', '#4a4a54', '#6e6e7a', '#9a9aa6', '#c8c8d0']), 3.2 - (x - (hx - 25)) * 0.35 - (y > hy ? 1 : 0), x, y)); });
  T.brazo(R, 336, ri(hy + 30), hx + 6, hy + 2, '#5a2a32', -1, { codo: [314, ri(hy + 20)], puno: '#f2eee2' });
  const c45 = tramo(t, TG.Y1845 - 0.2, TG.Y1845 + 0.2); if (c45 > 0) brillo(48, 100, t, c45 * (t < TG.P8 - 0.3 ? 1 : 0), DORL);
  bocad(cx - 2, cy - 44, '?', tramo(t, TG.BETRAY - 0.2, TG.BETRAY + 0.1) * (t < TG.UNTIL ? 1 : 0));
}

// 8. LA SALITA DE NOCHE, LA MESA (1845): Morriss, ya viejo, junto a la mesa con la caja bajo el quinqué; levanta el
//    martillo en «finally makes up his mind» y en «open» rompe el candado (chispas, el candado cae).
function c8(t) {
  salitaMesa(t);
  const golpe = TG.OPEN, roto = t > golpe;
  T.d_caja(R, 178, 122, { escala: 2, t, roto, abierta: tramo(t, golpe + 0.4, golpe + 1.2) * 0.35 });
  const arriba = t > TG.MIND - 0.2 && t < golpe, sube = tramo(t, TG.FINALLY, TG.MIND);
  const sm = R.actor(EL.morrissViejoBL, 130, 156, t, { dir: 1, sostiene: [ri(lerp(146, 152, sube)), ri(arriba ? 106 : roto ? 116 : lerp(134, 110, sube))], sorpresa: roto && t < golpe + 1, enfado: arriba, sonrisa: t > golpe + 1.2 });
  const [mx, my] = sm.mano;
  lin(mx, my, mx + 7, my - 9, ROBLE[4]); lin(mx + 1, my, mx + 8, my - 9, ROBLE[2]); caja(mx + 3, my - 14, mx + 12, my - 9, (x, y) => R.pset(x, y, x === mx + 3 || x === mx + 12 || y === my - 14 || y === my - 9 ? K : y < my - 12 ? NIEVE[2] : HIERRO[3]));
  if (t > golpe && t < golpe + 0.6) { for (let k = 0; k < 14; k++) { const a = k / 14 * 6.28, r = (t - golpe) * 60; ps(178 + Math.cos(a) * r, 112 + Math.sin(a) * r * 0.7, k % 2 ? DORL : DORADO); ps(178 + Math.cos(a) * r * 0.7, 112 + Math.sin(a) * r * 0.5, 0xffffffff); } brillo(178, 112, t, 1, DORL); }
  bocad(138, 124, '!', tramo(t, golpe + 0.1, golpe + 0.3) * (t < golpe + 1.4 ? 1 : 0));
}

// 9. INSERTO, LA CAJA ABIERTA (despacho, de noche, 1845): la tapa se levanta; en «two letters» se iluminan las dos
//    cartas con su lacre; en «three sheets» suben las tres hojas de números; Atom asoma con su lupa en «numbers».
function c9(t) {
  const ab = tramo(t, TG.P9 - 0.1, TG.TWO);
  const g = T.lynchburg(R, t, { encuadre: 'despacho', camara: 'caja', abierta: ab, roto: true });
  if (g.hojas && t > TG.THREE - 0.1) g.hojas.forEach(([hx, hy], k) => { const a = tramo(t, TG.THREE - 0.1 + k * 0.15, TG.THREE + 0.2 + k * 0.15); if (a > 0) brillo(hx + 6, hy - 14, t + k, a * (t < TG.NUMBERS + 0.6 ? 0.7 : 0), DORL); });
  if (t > TG.TWO - 0.1 && t < TG.PLAIN + 0.4) { brillo(126, 98, t, 0.6, DORL); brillo(206, 98, t + 0.5, 0.6, DORL); }
  // Atom asoma por la derecha (zona libre x 220–300) con la lupa
  const au = tramo(t, TG.SHEETS - 0.4, TG.NUMBERS - 0.2), ax = lerp(330, 252, au);
  if (au > 0) { const A = AT.atom(R, ri(ax), 108, t, { dir: -1, pose: au < 1 ? 'camina' : 'sostiene', cara: 'sorpresa', s: 1 }); if (au >= 1) AT.lupa(R, A.mano[0], A.mano[1], 1, -1); }
}

// 10. INSERTO, LA LECTURA (la mesa de la salita): las manos viejas sostienen la primera carta bajo el quinqué; a su lado
//     las tres hojas de números; «23» en «twenty-three years»; los renglones se encienden uno a uno («reads what Beale
//     wanted to say»).
function c10(t) {
  fijo('mesaLect', mesaLecturaFondo);
  quinque(44, 112, t);
  for (let k = 0; k < 3; k++) T.d_hoja(R, 228 + k * 26, 126 + (k % 2) * 6, { n: k + 1, escala: 1, t, ver: 1 });
  const lee = tramo(t, TG.READS - 0.2, TG.SAY);
  const y0 = 66, x0 = 92, x1 = 192;
  hojaPapel(x0, y0, x1, 160, { n: 11, ver: 1, k: 27 });
  for (let k = 0; k < Math.floor(lee * 11); k++) { const yy = ri(y0 + 5 + k * ((160 - y0 - 8) / 11)); for (let x = x0 + 4; x < x1 - 6; x++) { aclara(x, yy - 1, DORL, 0.45); aclara(x, yy + 1, DORL, 0.3); if (R.pget(x, yy) === TINTA) ps(x, yy, hex('#8a5a10')); } }
  T.mano(R, x0 - 2, ri(118 + Math.sin(t * 1.2)), 1, '#5a2a32', { sinManga: true });
  T.mano(R, x1 + 2, ri(122 + Math.sin(t * 1.2 + 1)), -1, '#5a2a32', { sinManga: true });
  const d23 = tramo(t, TG.Y23 - 0.15, TG.Y23 + 0.2); if (d23 > 0 && t < TG.READS) { R.numero('23', 142, ri(50 - d23 * 4), { tam: 16, centro: true }); }
  if (t > TG.BEALE2 - 0.2) brillo(140, 100, t, tramo(t, TG.BEALE2 - 0.2, TG.BEALE2 + 0.2), DORL);
}
'''

CUERPO_C = r'''
const año = (t) => t < TG.P4 ? 1822 : t < TG.P5 ? anyoBuzon(t) : t < TG.P6 ? 1832 : t < TG.P7 ? anyoHogar(t) : 1845;
const efectos = [[0.3, 'puerta'], [0.8, 'pasos'], [1.2, 'papel'], [TG.DATED, 'sello'], [TG.Y1822 + 0.6, 'papel'],
  [TG.P2 + 0.2, 'papel'], [TG.BOX - 0.1, 'pop'], [TG.PAPERS, 'papel'], [TG.NOONE, 'pop'], [TG.KEY - 0.1, 'tic'],
  [TG.P3 + 0.3, 'papel'], [TG.KEY2 + 0.4, 'papel'], [TG.SEALED, 'sello'], [TG.JUNE - 0.5, 'lapiz'],
  [TG.P4 + 0.3, 'whoosh'], [TG.P4 + 1.4, 'papel'], [TG.P4 + 2.4, 'viento'], [TG.Y1832 + 0.1, 'cerrojo'], [TG.Y1832 + 0.6, 'tic'], [TG.COMES, 'pasos'],
  [TG.P5 + 0.2, 'pasos'], [TG.WAITING, 'tic'], [TG.JUST, 'carro'], [TG.AGAIN, 'viento'],
  [TG.WAITS, 'whoosh'], [TG.Y13, 'pop'], [TG.CASE, 'pop'],
  [TG.BREAK, 'whoosh'], [TG.BETRAY, 'pop'], [TG.Y1845, 'brillo'],
  [TG.MIND - 0.2, 'whoosh'], [TG.OPEN, 'boom'], [TG.OPEN + 0.25, 'cerrojo'],
  [TG.P9, 'puerta'], [TG.TWO, 'brillo'], [TG.THREE, 'papel'], [TG.NUMBERS, 'brillo'],
  [TG.P10 + 0.2, 'papel'], [TG.Y23, 'pop'], [TG.READS, 'brillo']];
T.rodar(E, R, [[0, c1], [TG.P2, c2], [TG.P3, c3], [TG.P4, c4], [TG.P5, c5], [TG.P6, c6], [TG.P7, c7], [TG.P8, c8], [TG.P9, c9], [TG.P10, c10]],
  { efectos, año });
'''

CABECERA_C = '''// BL-CARTA (frases 7–8), 1822–1845: la carta, la clave que no llega y el candado roto. Diez planos, cortados en la palabra:
// 1. la oficina de correos (mayo de 1822): el cartero sella la carta («dated May 1822») y se la da a Morriss;  (corta en «explaining»)
// 2. inserto, la carta abierta en la mesa del desayuno: la caja, las tres hojitas, «?» y la llave tachada («key»);  (corta en «and that a friend»)
// 3. inserto, el escritorio del amigo de noche: la hoja de la clave entra en el sobre, lacre en «sealed», «6·1832»;  (corta tras «June 1832»)
// 4. el porche (GAG): Atom vigila el buzón mientras el calendario vuela de 1822 a 1832; abre en «June 1832»: vacío;
//    el cartero pasa de largo en «comes and goes»;  (corta en «and Morriss»)
// 5. la salita, la ventana (1832): Morriss espera con el reloj de bolsillo; un jinete pasa de largo («Beale never
//    shows up again»);  (corta en «And still»)
// 6. la salita, la chimenea: el calendario vuela de 1832 a 1845, «13», Morriss encanece;  (corta en «because»)
// 7. inserto, el escritorio de noche: la mano vieja levanta el martillo sobre el candado, duda y lo baja;  (corta antes de «he finally»)
// 8. la salita de noche: Morriss viejo rompe el candado en «open» (golpe, chispas);  (corta en «Inside»)
// 9. inserto, la caja abierta: dos cartas y tres hojas de números; Atom con la lupa en «numbers»;  (corta en «and for the first time»)
// 10. inserto, la lectura bajo el quinqué: «23»; los renglones se encienden («reads what Beale wanted to say»).'''

E['bl-carta'] = ('La carta', CABECERA_C, momentos(GC) + COMUN + LOCALES_C + PLANOS_C + CUERPO_C)
