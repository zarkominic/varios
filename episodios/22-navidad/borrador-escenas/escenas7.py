# Borrador de escenas del ep22, grupo 7: nv-krampus, nv-islandia, nv-posadas (con el movimiento hecho).
# Los instantes se escriben @(s) en segundos de la escena y se pasan a en('marca', fracción) con la marca de cada una.
import re

E = {}

def _en(marca, a, b, cuerpo):
    return re.sub(r'@\(([-\d.]+)\)', lambda m: f"en('{marca}', {(float(m.group(1)) - a) / (b - a):.4f})", cuerpo)

LIB = r'''const d_BAYER7 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const d_umbral7 = (x, y) => d_BAYER7[((y & 3) << 2) | (x & 3)];

function d_mezcla7(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// mezcla un color sobre el píxel que ya hay (para halos, resplandores y tintes)
const d_tinta7 = (R, x, y, c, a) => { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, d_mezcla7(R.pget(x, y), c, a)); };

// capas fijas: se pintan una vez por lienzo y clave en un búfer de R.nuevo() (las transparentes, rellenas de VACIO)
const d_VACIO7 = 0x01020304;

const d_CAPAS7 = new WeakMap();

function d_capa7(R, clave, dibuja, vacio = true) {
  let m = d_CAPAS7.get(R); if (!m) d_CAPAS7.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(); if (vacio) b.fill(d_VACIO7); const prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  return m[clave];
}

// pega una capa transparente sobre lo que hay (un recorrido de la pantalla, o solo de las filas y0–y1)
function d_pegar7(R, b, y0 = 0, y1 = 179) { const B = R.buf; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const c = b[i]; if (c !== d_VACIO7) B[i] = c; } }

// la zona de Atom y la barra del año: ahí solo cosas tranquilas
const d_quieto7 = (x, y) => (x > 272 && y < 48) || (y < 15 && x > 16 && x < 174);

// degradado vertical tramado de [fracción, color] entre y0 e y1
function d_degradado7(R, y0, y1, P) {
  const B = R.buf, tr = 3, lim = P.map(([f]) => Math.round(y0 + f * (y1 - y0)));
  for (let y = y0; y <= y1; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = d_umbral7(x, y) < p ? b : a;
  }
}

// estrellas que titilan (n, hasta la altura hor), con alguna en cruz
function d_estrellas7(R, t, n, hor, sem, c0, c1) {
  for (let k = 0; k < n; k++) { const x = Math.round(h7(k, 1, sem) * 319), y = Math.round(h7(k, 2, sem) ** 1.3 * (hor - 4)); if (d_quieto7(x, y)) continue;
    const tw = Math.sin(t * (1.3 + h7(k, 3, sem) * 2.4) + k * 1.7); if (tw < -0.55) continue; R.pset(x, y, tw > 0.5 ? c1 : c0);
    if (k % 13 === 0 && tw > 0.7) { R.pset(x - 1, y, c0); R.pset(x + 1, y, c0); R.pset(x, y - 1, c0); R.pset(x, y + 1, c0); } }
}

// la luna llena con sus mares y su halo tramado (va en la capa del cielo)
function d_luna7(R, x, y, r, c, cS, halo) {
  for (let j = -r - 7; j <= r + 7; j++) for (let i = -r - 7; i <= r + 7; i++) { const d = Math.hypot(i, j), xx = x + i, yy = y + j; if (xx < 0 || xx > 319 || yy < 0 || yy > 179) continue;
    if (d <= r) { const mar = h7((i + 40) >> 1, (j + 40) >> 1, 77) < 0.3 && d < r - 1.5; R.pset(xx, yy, d > r - 1 ? cS : mar || (i > r * 0.35 && d > r * 0.7) ? cS : c); }
    else if (d < r + 7 && d_umbral7(xx, yy) < (r + 7 - d) / 12) R.pset(xx, yy, d_mezcla7(R.pget(xx, yy), halo, 0.35)); }
}

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; sem cambia la forma; c = [sombra, cuerpo, luz]
function d_nube7(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h7(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h7(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

// las nubes que pasan: velos lejanos casi quietos y cúmulos a tres velocidades (los cercanos, grandes y rápidos);
// la esquina de Atom queda libre (las nubes se recortan por debajo de ella)
function d_nubes7(R, t, hor, c, n = 5, v = 1, sem = 0) {
  for (let k = 0; k < 3; k++) { const w = 30 + Math.round(h7(k, 5, 302 + sem) * 40), x0 = ((h7(k, 6, 302 + sem) * 440 + t * (0.6 + k * 0.3) * v) % 470) - 80, y = Math.max(18, Math.round(hor * (0.2 + k * 0.12)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || d_quieto7(x, y) || h7(i >> 2, k, 303 + sem) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      R.pset(x, y, e > 0.35 ? c[1] : c[0]); if (e > 0.6 && i % 4) R.pset(x + 3, y - 1, c[2]); if (e > 0.5 && i % 5 === 0) R.pset(x - 4, y + 1, c[0]); } }
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 28 + k * 10 : 13 + ((k * 7) % 9), vel = (cerca ? 3.4 + k * 1.3 : 1.2 + k * 0.35) * v,
      y = Math.round(cerca ? Math.max(34, hor * 0.34) + k * hor * 0.13 : Math.max(26, hor * (0.42 + (k - 2) * 0.1))), x = ((h7(k, 7, 302 + sem) * 470 + t * vel) % 500) - 90;
    if (x > 230 && y < 60) continue;   // ninguna nube grande cruza por detrás de Atom
    d_nube7(R, Math.round(x), y, w, k + sem, c); }
}

// pájaros que cruzan (dos píxeles de ala que baten)
function d_aves7(R, t, n, y, c, v = 14, sem = 0) {
  for (let k = 0; k < n; k++) { const x = Math.round(((h7(k, 1, 91 + sem) * 400 + t * v * (0.8 + h7(k, 2, 91) * 0.5)) % 420) - 50), yy = Math.round(y + h7(k, 3, 91) * 24 + Math.sin(t * 0.8 + k) * 2); if (d_quieto7(x, yy)) continue;
    const b = Math.floor(t * 6 + k * 3) % 2; R.pset(x, yy, c); R.pset(x - 1, yy - b, c); R.pset(x + 1, yy - b, c); R.pset(x - 2, yy - 1 + b, c); R.pset(x + 2, yy - 1 + b, c); }
}

// la aurora: cortinas de rayos verticales que ondulan; base en y0 (se apaga hacia arriba), colores [base, cuerpo, alto]
// y fuerza 0–1; se funde con lo que hay detrás y respeta la esquina de Atom
function d_aurora7(R, t, y0, alto, cols, fuerza = 1, x0 = 0, x1 = 319, sem = 0) {
  for (let x = x0; x <= x1; x++) {
    const yb = y0 + Math.sin(x * 0.021 + t * 0.35 + sem) * 9 + Math.sin(x * 0.057 - t * 0.6 + sem * 2) * 4, ray = 0.55 + 0.45 * Math.sin(x * 0.31 + t * 1.3 + Math.sin(x * 0.07 + t * 0.4) * 3);
    const len = alto * (0.6 + 0.4 * Math.sin(x * 0.013 + t * 0.2 + sem)), bord = Math.min(1, (x - x0) / 30, (x1 - x) / 30);
    for (let j = 0; j < len; j++) { const y = Math.round(yb - j); if (y < 0 || y > 179) continue; let a = (1 - j / len) * ray * fuerza * bord * (j < 3 ? j / 3 : 1);
      if (d_quieto7(x, y)) a *= 0.25; if (a <= 0.05 || d_umbral7(x, y) > a * 1.3) continue;
      const c = j < len * 0.18 ? cols[0] : j < len * 0.65 ? cols[1] : cols[2]; d_tinta7(R, x, y, c, Math.min(0.85, a)); }
  }
}

// copos de nieve que caen con algo de viento (los cercanos, de 2 píxeles y más rápidos)
function d_nieve7(R, t, n, c, cL, v = 1, viento = 6, y1 = 179) {
  for (let k = 0; k < n; k++) { const cerca = k % 5 === 0, vel = (cerca ? 26 : 12 + h7(k, 2, 81) * 8) * v, y = ((h7(k, 1, 81) * 200 + t * vel) % 200) - 10;
    if (y > y1) continue; const x = Math.round(((h7(k, 3, 81) * 340 + t * viento + Math.sin(t * 1.3 + k) * 3) % 340 + 340) % 340) - 10, yy = Math.round(y);
    if (d_quieto7(x, yy)) continue; R.pset(x, yy, cerca ? cL : c); if (cerca) { R.pset(x + 1, yy, c); R.pset(x, yy + 1, c); } }
}

// humo de chimenea: bocanadas que suben, se ensanchan, derivan y se deshacen
function d_humo7(R, x, y, t, c, cS, n = 7, deriva = 0.4) {
  for (let k = 0; k < n; k++) { const u = ((t * 0.35 + k / n) % 1), yy = Math.round(y - u * 30), xx = Math.round(x + u * u * 18 * deriva + Math.sin(t * 1.5 + k) * 1.5), r = 1 + u * 3.2;
    if (d_quieto7(xx, yy)) continue;
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && d_umbral7(xx + i, yy + j) < 0.75 - u * 0.6) R.pset(xx + i, yy + j, j > 0 ? cS : c); }
}

// halo tramado alrededor de una luz (se funde con lo que hay)
function d_halo7(R, cx, cy, r, c, a = 0.5) {
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d >= 1) continue; const x = cx + i, y = cy + j; if (d_umbral7(x, y) < (1 - d) * 1.1) d_tinta7(R, x, y, c, a * (1 - d * 0.6)); }
}

// una cresta de montes: devuelve la y de cada columna (suma de senos con la semilla sem)
function d_cresta7(y0, amp, sem, pico = null) {
  const cr = new Int16Array(320);
  for (let x = 0; x < 320; x++) { let y = y0 - amp * (0.55 + 0.3 * Math.sin(x * 0.019 + sem) + 0.14 * Math.sin(x * 0.051 + sem * 2.3) + 0.08 * Math.sin(x * 0.13 + sem * 4.1));
    if (pico) for (const [px, py, an] of pico) y = Math.min(y, py + Math.abs(x - px) * an + Math.sin(x * 0.4) * 1.2); cr[x] = Math.round(y); }
  return cr;
}

// montes nevados con relieve: la ladera que mira a la luz, clara; la otra, en sombra; la nieve hasta la cota de nieve,
// con canales de roca; y abajo se funde con la bruma. P = { roca, rocaS, nieve, nieveS, nieveL, bruma }
function d_montes7(R, cr, yb, P, cota = 18, sem = 0) {
  const B = R.buf;
  for (let x = 0; x < 320; x++) { const pend = cr[Math.min(319, x + 2)] - cr[Math.max(0, x - 2)];
    for (let y = Math.max(0, cr[x]); y <= yb; y++) { const d = y - cr[x], canal = h7(x >> 1, (y + x * 0.6) >> 2, 61 + sem) < 0.18 + d / 90, luz = pend > 0 ? 1 : pend < -1 ? -1 : 0;
      let c = d < cota + Math.sin(x * 0.2 + sem) * 4 && !canal ? (luz > 0 ? (d < 2 ? P.nieveL : P.nieve) : luz < 0 ? P.nieveS : P.nieve) : (luz < 0 ? P.rocaS : P.roca);
      const p = (y - yb + 8) / 9; if (p > 0 && d_umbral7(x, y) < p) c = P.bruma; B[y * 320 + x] = c; } }
}

// un abeto: pisos triangulares de ramas con nieve encima (cols = [oscuro, medio, nieve])
function d_abeto7(R, x, base, alto, cols, nieve = true) {
  const pisos = Math.max(3, Math.round(alto / 5));
  R.rect(x, base - 2, x, base, cols[0]);
  for (let p = 0; p < pisos; p++) { const yt = base - 2 - alto + p * (alto / pisos), hh = alto / pisos + 2, w0 = 1 + p * (alto * 0.28 / pisos) + 1;
    for (let j = 0; j <= hh; j++) { const w = Math.round(w0 * j / hh), y = Math.round(yt + j); R.rect(x - w, y, x + w, y, j < 2 && nieve ? cols[2] : cols[(x + j) % 3 === 0 ? 0 : 1]); if (w > 1) R.pset(x + w, y, cols[0]); }
    if (nieve) { const y = Math.round(yt + hh * 0.35), w = Math.round(w0 * 0.35); R.rect(x - w, y, x + w - 1, y, cols[2]); } }
}

// tablas de madera (verticales u horizontales) con su junta, vetas y nudos, y la luz en un canto
function d_tablas7(R, x0, y0, x1, y1, c, cS, cL, ancho = 4, vertical = true, sem = 0) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = vertical ? x - x0 : y - y0, b = vertical ? y : x, k = Math.floor(a / ancho), m = a % ancho;
    let col = m === ancho - 1 ? cS : m === 0 ? cL : c; const v = h7(k, b >> 2, 51 + sem);
    if (m > 0 && m < ancho - 1 && v < 0.12) col = cS; if (h7(k, b, 52 + sem) < 0.012) col = cS;
    R.pset(x, y, col); }
}

// muro de sillares o mampostería: piedras de tamaño variable con junta, luz arriba y sombra abajo (cols = [base, sombra, luz, junta])
function d_piedras7(R, x0, y0, x1, y1, cols, alto = 6, largo = 11, sem = 0) {
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / alto), dy = (y - y0) % alto;
    for (let x = x0; x <= x1; x++) { const off = Math.floor(h7(fila, 0, 41 + sem) * largo), xx = x - x0 + off, pieza = Math.floor(xx / largo), dx = xx % largo, v = h7(pieza, fila, 42 + sem);
      let c = dy === alto - 1 || dx === largo - 1 ? cols[3] : dy === 0 ? cols[2] : dy === alto - 2 ? cols[1] : v < 0.33 ? cols[1] : cols[0];
      if (h7(x, y, 43 + sem) < 0.05) c = cols[1]; R.pset(x, y, c); } }
}

// enlucido con su textura: manchas suaves, poros y algún desconchón (cols = [base, sombra, luz])
function d_estuco7(R, x0, y0, x1, y1, cols, sem = 0) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const m = h7(x >> 3, y >> 3, 31 + sem) * 0.6 + h7(x >> 1, y >> 1, 32 + sem) * 0.4;
    R.pset(x, y, m > 0.8 ? cols[2] : m < 0.16 || h7(x, y, 33 + sem) < 0.02 ? cols[1] : cols[0]); }
}

// una ventana iluminada: marco, interior cálido en degradado con el resplandor de una lámpara, cruz, alféizar (con nieve)
// o = { marco, marcoS, luz, luzS, cruz, nieve, cortina, adviento (candelabro de siete velas), estrella (de papel) }
function d_ventana7(R, x0, y0, x1, y1, o = {}) {
  const { rect, pset } = R, w = x1 - x0, hh = y1 - y0;
  rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, o.marcoS ?? T.C.k); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, o.marco ?? hex('#f2ece0'));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const g = Math.hypot((x - x0 - w * 0.5) / w, (y - y1 + 2) / hh); pset(x, y, g < 0.45 ? (o.luzL ?? o.luz) : g < 0.75 ? o.luz : o.luzS); }
  if (o.cortina != null) for (let y = y0; y <= y1; y++) { const a = Math.round(2 + (y - y0) * 0.25); for (let i = 0; i < a && i < w / 3; i++) { pset(x0 + i, y, (i + y) % 3 ? o.cortina : o.cortinaS ?? o.cortina); pset(x1 - i, y, (i + y) % 3 ? o.cortina : o.cortinaS ?? o.cortina); } }
  if (o.adviento) { const cx = Math.round((x0 + x1) / 2), yb = y1 - 1; for (let k = -3; k <= 3; k++) { const yy = yb - 4 + Math.abs(k); rect(cx + k * 2, yy, cx + k * 2, yb, hex('#f4ecd8')); pset(cx + k * 2, yy - 1, hex('#fff6b0')); } rect(cx - 7, yb, cx + 7, yb, hex('#6a4a2a')); }
  if (o.estrella) { const cx = Math.round((x0 + x1) / 2), cy = y0 + 4; for (let k = 0; k < 4; k++) { const a = k * Math.PI / 4; for (let d = 0; d <= 3; d++) { pset(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), hex('#fff0c0')); pset(Math.round(cx - Math.cos(a) * d), Math.round(cy - Math.sin(a) * d), hex('#fff0c0')); } } pset(cx, cy, hex('#ffffff')); rect(cx, y0, cx, cy - 3, hex('#8a7a5a')); }
  if (o.cruz !== false) { const mx = Math.round((x0 + x1) / 2), my = Math.round((y0 + y1) / 2); rect(mx, y0, mx, y1, o.marco ?? hex('#f2ece0')); rect(x0, my, x1, my, o.marco ?? hex('#f2ece0')); }
  rect(x0 - 3, y1 + 2, x1 + 3, y1 + 3, o.marcoS ?? T.C.k); rect(x0 - 3, y1 + 2, x1 + 3, y1 + 2, o.marco ?? hex('#f2ece0'));
  if (o.nieve) { rect(x0 - 3, y1 + 1, x1 + 3, y1 + 1, o.nieve); for (let x = x0 - 3; x <= x1 + 3; x++) if (h7(x, y1, 21) < 0.4) pset(x, y1, o.nieve); }
}

// una persona pequeña de fondo (6–10 px): cabeza, gorro, cuerpo, piernas que andan; o = { c, cS, piel, gorro, dir, anda, alto }
function d_gente7(R, x, suelo, t, o = {}) {
  const { pset } = R, al = o.alto ?? 9, paso = o.anda ? Math.floor(t * 6 + x) % 2 : 0, c = o.c ?? hex('#3a4a6a'), cS = o.cS ?? d_mezcla7(c, T.C.k, 0.35), dir = o.dir ?? 1;
  pset(x - 1 + paso, suelo, T.C.k); pset(x + 1 - paso, suelo, T.C.k); pset(x - 1 + paso, suelo - 1, o.pierna ?? hex('#2a2a3a')); pset(x + 1 - paso, suelo - 1, o.pierna ?? hex('#2a2a3a'));
  const tb = suelo - 2, tt = suelo - al + 3; for (let y = tt; y <= tb; y++) for (let i = -1; i <= 1; i++) pset(x + i, y, i === dir ? cS : c);
  pset(x - 2, tt + 1, cS); pset(x + 2, tt + 1, cS);
  pset(x, tt - 1, o.piel ?? hex('#e8b890')); pset(x + dir, tt - 1, o.piel ?? hex('#e8b890')); pset(x - dir, tt - 1, o.pelo ?? hex('#3a2a1a'));
  if (o.gorro) { pset(x - 1, tt - 2, o.gorro); pset(x, tt - 2, o.gorro); pset(x + 1, tt - 2, o.gorro); pset(x, tt - 3, o.gorroL ?? o.gorro); } else { pset(x, tt - 2, o.pelo ?? hex('#3a2a1a')); pset(x - 1, tt - 2, o.pelo ?? hex('#3a2a1a')); }
}

// guirnalda de bombillas colgada entre dos puntos (con su comba), que titilan con t; cols = colores de las bombillas
function d_guirnalda7(R, x0, y0, x1, y1, comba, t, cols, paso = 6, cable = null, sem = 0) {
  const n = Math.max(2, Math.round(Math.abs(x1 - x0) / 1.5)), pt = (u) => [x0 + (x1 - x0) * u, y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * comba];
  if (cable != null) for (let i = 0; i <= n; i++) { const [x, y] = pt(i / n); if (!d_quieto7(Math.round(x), Math.round(y))) R.pset(Math.round(x), Math.round(y), cable); }
  const m = Math.max(1, Math.round(Math.abs(x1 - x0) / paso));
  for (let k = 0; k <= m; k++) { const [x, y] = pt(k / m), xx = Math.round(x), yy = Math.round(y) + 1; if (d_quieto7(xx, yy)) continue; const on = Math.sin(t * 2.2 + k * 1.9 + sem) > -0.3, c = cols[(k + sem) % cols.length];
    R.pset(xx, yy, on ? c : d_mezcla7(c, T.C.k, 0.55)); if (on && k % 2 === 0) d_tinta7(R, xx, yy + 1, c, 0.35); }
}

// ── utilidades propias del grupo 7 (krampus, islandia, posadas) ──
const h7 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const PZ = T.PIEZAS_NV;
// un fondo fijo pintado una vez en su búfer y copiado en cada fotograma (un recorrido de pantalla)
const fondo7 = (clave, dibuja) => R.copiar(d_capa7(R, clave, dibuja, false));
// recorrido por fotogramas clave [t, x, suelo]: dónde está, si anda y hacia dónde va
const ruta7 = (t, kf) => {
  if (t <= kf[0][0]) return { x: kf[0][1], s: kf[0][2], mv: false, d: 0 };
  for (let i = 0; i + 1 < kf.length; i++) if (t < kf[i + 1][0]) { const [t0, x0, s0] = kf[i], [t1, x1, s1] = kf[i + 1], u = (t - t0) / (t1 - t0);
    return { x: Math.round(lerp(x0, x1, u)), s: Math.round(lerp(s0, s1, u)), mv: x1 !== x0 || s1 !== s0, d: Math.sign(x1 - x0) }; }
  const l = kf[kf.length - 1]; return { x: l[1], s: l[2], mv: false, d: 0 };
};
// un número que salta y se queda (como el «29» del 11), entre t0 y t1
const cifra7 = (txt, x, y, t, t0, t1) => { if (t < t0 || t > t1) return; const e = tramo(t, t0, t0 + 0.3), b = Math.sin(Math.min(1, e) * Math.PI) * 4; R.numero(txt, x, Math.round(lerp(y + 8, y, e) - b), { tam: 16, centro: true }); };
// chispitas de brillo alrededor de un punto (para lo nuevo o lo que se descubre)
const chispas7 = (x, y, t, t0, t1, c = hex('#fff2a0')) => { if (t < t0 || t > t1) return; const u = (t - t0) / (t1 - t0);
  for (let k = 0; k < 6; k++) { const a = k * 1.047 + t * 2, r = 8 + u * 8 + (k % 2) * 3, px = Math.round(x + Math.cos(a) * r), py = Math.round(y + Math.sin(a) * r * 0.8); if (Math.sin(t * 14 + k * 2) < -0.2) continue; R.pset(px, py, c); R.pset(px - 1, py, c); R.pset(px + 1, py, c); R.pset(px, py - 1, c); R.pset(px, py + 1, c); } };
// una antorcha de mano o de pared: el palo y la llama que baila (con su halo)
const llama7 = (x, y, t, halo = true) => {
  const f = Math.sin(t * 13 + x) > 0, g = Math.sin(t * 9 + x * 0.7) > 0.3;
  if (halo) d_halo7(R, x, y - 4, 12, hex('#ff9a3a'), 0.32);
  R.rect(x - 1, y - 3, x + 1, y, hex('#e8501a')); R.rect(x - 1 + (f ? 1 : 0), y - 6, x + (f ? 1 : 0), y - 3, hex('#ffb02a')); R.pset(x + (g ? 1 : 0), y - 7, hex('#fff0a0')); R.pset(x, y - 2, hex('#fff0a0'));
};
const antorcha7 = (x, y, t) => { R.rect(x - 1, y, x, y + 9, T.C.k); R.pset(x, y + 1, hex('#8a5a2a')); R.rect(x - 2, y - 1, x + 1, y, hex('#3a2a1a')); llama7(x, y - 1, t); };
// pega una capa (opaca o transparente) solo dentro de la caja [x0, y0, x1, y1]
const caja7 = (b, [x0, y0, x1, y1]) => { const B = R.buf; for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let i = y * 320 + Math.max(0, x0), n = y * 320 + Math.min(319, x1); i <= n; i++) { const c = b[i]; if (c !== d_VACIO7) B[i] = c; } };
'''

E['nv-krampus'] = ('El Krampus', '''// NV-KRAMPUS (frase 21), hoy (2026). Tres planos:
// 1. la plaza nevada de Austria la noche del 5 («5»): San Nicolás entra con su monaguillo del farol y bendice a los niños
//    que saltan y señalan (corta en «but»);
// 2. la puerta tallada: Nicolás deja dulces en la bota; con él salta el Krampus del cencerro y levanta las garras; la
//    galleta se mete en la bota y asoma los ojos (gag 5); la niña de la ventana se esconde; Nicolás le riñe (corta en «who»);
// 3. el desfile (fondo local): dos filas de Krampus con antorchas, antorchas que bajan por el monte y por el callejón;
//    un niño tira una bola de nieve, el Krampus salta hacia él y se agacha tras la valla; el público vitorea.''', LIB + _en('krampus', 0.5, 18.734, r'''
const P2 = @(7.1), P3 = @(13.4);
const DIC5 = @(2.15), NICO = @(3.1), AUSTRIA = @(5.38), WITH = @(9.08), KRAMPUS = @(9.72), HORNED = @(10.64), MASK = @(12.94);
const SCARES = @(13.68), CHILDREN = @(14.26), MISB = @(14.86), PARADES = @(17.04), HUNDREDS = @(17.86);

// 1 · la plaza de Austria la noche del 5: San Nicolás entra con su monaguillo del farol y bendice a los niños
const p1 = (t) => {
  T.mundo(R, t, { encuadre: 'austria', camara: 'general' });
  // vecinos lejanos que cruzan la plaza al pie de las casas, y uno que quita nieve con la pala
  for (const [k, v, y, c] of [[0, 9, 136, '#6a2a2a'], [1, -7, 138, '#2a4a6a'], [2, 6, 134, '#4a5a2a']]) { const x = Math.round(((k * 113 + t * v) % 360 + 360) % 360) - 20; if (x > 140 && x < 180) continue; d_gente7(R, x, y, t, { anda: true, dir: v > 0 ? 1 : -1, c: hex(c), gorro: hex('#d8d0c0'), alto: 9 }); }
  { const x = 286, y = 150, a = Math.sin(t * 3) > 0; d_gente7(R, x, y, t, { dir: -1, c: hex('#3a5a3a'), gorro: hex('#b8302a') }); R.linea(x - 2, y - 4, x - (a ? 8 : 6), y - (a ? 1 : 3), hex('#6a4a2a')); R.rect(x - (a ? 11 : 9), y - (a ? 1 : 3), x - (a ? 8 : 6), y - (a ? 0 : 2), hex('#9aa0a8')); if (a) R.pset(x - 12, y - 4 - Math.round((t * 3) % 2), T.C.nieve); }
  // San Nicolás y su monaguillo con el farol
  const n = ruta7(t, [[0.9, -24, 166], [AUSTRIA - 0.1, 122, 166]]), m = ruta7(t, [[0.9, -46, 170], [AUSTRIA - 0.1, 98, 170]]);
  const llega = t > AUSTRIA - 0.1;
  const am = R.actor(EL.aprendiz2 ?? EL.aprendiz, m.x, m.s, t, { dir: 1, anda: m.mv, sostiene: [m.x + 15, m.s - 22], sonrisa: llega });
  R.linea(am.mano[0], am.mano[1], am.mano[0] + 4, am.mano[1] - 8, hex('#5a3a1a')); { const lx = am.mano[0] + 4, ly = am.mano[1] - 8 + Math.round(Math.sin(t * 4) * 1); R.rect(lx - 2, ly, lx + 2, ly + 6, T.C.k); R.rect(lx - 1, ly + 1, lx + 1, ly + 5, hex('#ffd060')); R.pset(lx, ly + 3, hex('#fff6c0')); d_halo7(R, lx, ly + 3, 10, hex('#ffc860'), 0.35); }
  R.actor(EL.nicolasAlpino, n.x, n.s, t, { dir: 1, anda: n.mv, dedo: llega && t < AUSTRIA + 1.4, sonrisa: llega });
  // los niños que esperan: saltan y señalan cuando llega; la madre con la cesta
  const sal = (k) => (llega && t < AUSTRIA + 1.3 ? Math.round(Math.abs(Math.sin((t - AUSTRIA) * 9 + k)) * 4) : 0);
  R.actor(EL.vecina, 236, 166, t, { dir: -1, sonrisa: t > NICO, habla: t > AUSTRIA + 0.6 && Math.sin(t * 8) > 0 });
  R.actor(EL.ninaCatalana, 196, 168, t, { dir: -1, salto: sal(0), sonrisa: t > NICO, sorpresa: t > NICO - 0.4 && t < NICO + 0.2, dedo: t > NICO && t < NICO + 1.2 });
  R.actor(EL.ninoCatalan, 214, 172, t, { dir: -1, salto: sal(1.5), sonrisa: llega });
  cifra7('5', 62, 40, t, DIC5, DIC5 + 1.7);
  // el muñeco de nieve con su bufanda al viento y un niño que cruza delante tirando de un trineo
  { const x = 30, y = 178, w = Math.round(Math.sin(t * 3) * 1.5); R.disco(x, y - 8, 9, T.C.k); R.disco(x, y - 8, 8, T.C.nieve); R.disco(x - 2, y - 10, 4, hex('#ffffff')); R.disco(x, y - 21, 6, T.C.k); R.disco(x, y - 21, 5, T.C.nieve);
    R.pset(x - 2, y - 22, T.C.k); R.pset(x + 2, y - 22, T.C.k); R.rect(x + 1, y - 20, x + 5, y - 20, hex('#e87a2a')); R.rect(x - 5, y - 16, x + 5, y - 15, hex('#c8202a')); R.rect(x + 3 + w, y - 15, x + 9 + w, y - 14, hex('#c8202a')); R.rect(x - 4, y - 30, x + 4, y - 27, T.C.k); R.rect(x - 6, y - 27, x + 6, y - 27, T.C.k);
    for (const yy of [y - 12, y - 7]) R.pset(x, yy, T.C.k); R.linea(x - 8, y - 10, x - 15, y - 15 + w, hex('#5a3a1a')); R.linea(x + 8, y - 10, x + 14, y - 13, hex('#5a3a1a')); }
  { const u = tramo(t, 0.2, 4.6); if (u > 0 && u < 1) { const x = Math.round(lerp(350, -40, u)); const a = R.actor(EL.ninoCatalan, x, 178, t, { dir: -1, anda: true, sostiene: [x + 14, 168], sonrisa: true }); R.linea(a.mano[0], a.mano[1], x + 22, 174, hex('#5a3a1a')); R.rect(x + 20, 172, x + 34, 175, T.C.k); R.rect(x + 21, 172, x + 33, 173, hex('#b8302a')); R.rect(x + 20, 176, x + 35, 176, hex('#8a8a96')); R.rect(x + 24, 167, x + 30, 171, hex('#3a7a4a')); R.rect(x + 26, 166, x + 28, 171, hex('#f0c040')); } }
  d_nieve7(R, t, 50, T.C.nieveS, T.C.nieve, 1, 5);
};

// 2 · la puerta tallada: Nicolás deja dulces en la bota; con él llega el Krampus y la galleta se mete en la bota (gag 5)
const p2 = (t) => {
  T.mundo(R, t, { encuadre: 'austria', camara: 'portal' });
  // un petirrojo salta por el banco y sale volando cuando llega el Krampus
  { const vu = tramo(t, KRAMPUS, KRAMPUS + 1.2), x = Math.round(lerp(26 + ((t * 7) % 30), 120, vu)), y = Math.round(127 - Math.abs(Math.sin(t * 5)) * (vu > 0 ? 0 : 2) - vu * 70), a = vu > 0 && Math.sin(t * 30) > 0;
    if (vu < 1) { R.rect(x, y - 3, x + 3, y - 1, hex('#6a4a2a')); R.rect(x + 2, y - 2, x + 3, y - 1, hex('#d8502a')); R.pset(x + 4, y - 2, hex('#e8b030')); R.pset(x + 3, y - 3, T.C.k); R.pset(x + 1, y - (a ? 5 : 4), hex('#4a321e')); if (vu === 0) { R.pset(x + 1, y, T.C.k); R.pset(x + 2, y, T.C.k); } } }
  // la niña de la ventana, recortada a su hueco: mira, se esconde del Krampus y vuelve a asomar
  { const baja = tramo(t, KRAMPUS + 0.1, KRAMPUS + 0.5) - tramo(t, MASK - 0.6, MASK + 0.1); R.recorte([237, 63, 283, 110]);
    R.actor(EL.ninaVictoriana, 252, Math.round(122 + baja * 22), t, { dir: -1, sorpresa: t > KRAMPUS && t < KRAMPUS + 0.6, sonrisa: t > MASK }); R.recorte(null); }
  // San Nicolás llega por la izquierda y deja la bolsa de dulces en la bota
  const n = ruta7(t, [[P2, -24, 176], [P2 + 1.2, 150, 176]]), deja = t > P2 + 1.25 && t < WITH + 0.1;
  const an = R.actor(EL.nicolasAlpino, n.x, n.s, t, { dir: 1, anda: n.mv, sostiene: deja ? [172, 140] : false, sonrisa: t > P2 + 1.2, dedo: t > MASK - 0.1 && t < P3 });
  if (deja) PZ.dulces(R, an.mano[0] + 2, an.mano[1] + 4, {});
  // el Krampus salta desde la derecha (con su cencerro), levanta las garras y Nicolás le riñe
  const k = ruta7(t, [[KRAMPUS - 0.45, 350, 174], [KRAMPUS + 0.15, 224, 174]]), ku = tramo(t, KRAMPUS - 0.45, KRAMPUS + 0.15);
  if (t > KRAMPUS - 0.45) { const asusta = t > HORNED && t < MASK - 0.2, tiembla = asusta ? (Math.sin(t * 30) > 0 ? 1 : 0) : 0;
    d_halo7(R, k.x + 8, k.s - 14, 20, hex('#ff9040'), 0.18); R.actor(EL.krampus, k.x + tiembla, k.s, t, { dir: t > MASK + 0.1 ? 1 : -1, anda: k.mv, salto: Math.round(Math.sin(ku * Math.PI) * 14), brazos: asusta });
    if (asusta) for (const s of [-1, 1]) { const f = Math.sin(t * 30) > 0 ? 1 : 0; R.pset(k.x + 8 + s * (13 + f), k.s - 22, hex('#f0e0a0')); R.pset(k.x + 8 + s * (15 + f), k.s - 24, hex('#f0e0a0')); } }
  // la galleta: corre por el escalón, se asusta, salta dentro de la bota y asoma los ojos
  const g0 = tramo(t, P2 + 0.3, P2 + 1.6), gs = tramo(t, KRAMPUS + 0.25, KRAMPUS + 0.7);
  if (gs === 0) T.galleta(R, Math.round(lerp(112, 160, g0)), 158, t, { corre: g0 > 0 && g0 < 1, cara: t > KRAMPUS ? 'susto' : g0 >= 1 ? 'feliz' : 'normal', dir: 1 });
  else { const gx = Math.round(lerp(160, 179, gs)), gy = Math.round(lerp(158, 151, gs) - Math.sin(gs * Math.PI) * 22); const asoma = gs >= 1 ? (t > HORNED + 0.2 && t < MASK - 0.3 ? 154 : 147) : gy;
    R.recorte([0, 0, 319, 139]); T.galleta(R, gx, asoma, t, { cara: gs < 1 || t < MASK ? 'susto' : 'normal' }); R.recorte(null); }
  if (t > KRAMPUS + 0.05 && t < KRAMPUS + 0.9) R.icono('!', 158, 128, hex('#ffffff'), T.C.k, 2);
  d_nieve7(R, t, 40, T.C.nieveS, T.C.nieve, 1, 4);
};

// 3 · el desfile (fondo local): cientos de Krampus con antorchas; un niño tira una bola de nieve y el Krampus le da un susto
const fondoDesfile = () => {
  const { rect, pset, linea, poligono } = R;
  d_degradado7(R, 0, 112, [[0, hex('#0a0e2a')], [0.45, hex('#141a44')], [0.8, hex('#22285a')], [1, hex('#302e66')]]);
  d_luna7(R, 230, 34, 7, hex('#f4f0dc'), hex('#c8c4b0'), hex('#8a90c8'));
  const cr = d_cresta7(84, 28, 2.1, [[96, 52, 0.8], [204, 60, 0.7]]);
  d_montes7(R, cr, 106, { roca: hex('#3e4066'), rocaS: hex('#2c2c4c'), nieve: hex('#b8c2e0'), nieveS: hex('#7a84ac'), nieveL: hex('#dce4f4'), bruma: hex('#2a2a58') }, 16, 3);
  for (let k = 0; k < 46; k++) { const x = Math.round(h7(k, 1, 701) * 319); d_abeto7(R, x, 106 + Math.round(h7(k, 3, 701) * 3), 8 + Math.round(h7(k, 2, 701) * 7), [hex('#121c36'), hex('#1c2a46'), hex('#8a98c0')]); }
  // la calle que se va al fondo entre las casas (callejón x 140–176)
  for (let y = 92; y <= 140; y++) { const w = Math.round(6 + (y - 92) * 0.38); rect(158 - w, y, 158 + w, y, y % 3 ? hex('#3a3a5a') : hex('#4a4a6a')); }
  for (const [x0, x1, top, c] of [[140, 150, 84, '#5a4a5a'], [166, 176, 80, '#4a5a6a']]) { rect(x0, top, x1, 132, hex(c)); for (let y = top + 6; y < 128; y += 9) for (let x = x0 + 2; x < x1 - 2; x += 5) { rect(x, y, x + 1, y + 2, hex('#ffc860')); } poligono([[x0 - 1, top], [(x0 + x1) / 2, top - 7], [x1 + 1, top]], hex('#d8e0f0')); }
  // las casas de la plaza: estuco de colores, tejado de dos aguas con nieve, entramado, ventanas encendidas, contraventanas, balcón
  const casas = [[-6, 50, '#c8a46a', 66, 1], [50, 100, '#b86a5a', 60, 0], [100, 140, '#d8c8a0', 72, 2], [176, 224, '#8aa890', 64, 0], [224, 274, '#c88a6a', 70, 1], [274, 326, '#a8a0c8', 84, 2]];
  const noche = hex('#141838');
  for (const [x0, x1, col, al, tipo] of casas) {
    const c0 = d_mezcla7(hex(col), noche, 0.42), cS = d_mezcla7(hex(col), noche, 0.62), cL = d_mezcla7(hex(col), noche, 0.28);
    d_estuco7(R, x0, al, x1, 140, [c0, cS, cL], x0 + 9);
    const cx = (x0 + x1) / 2, pk = Math.round(al - (x1 - x0) * 0.5);
    poligono([[x0 - 5, al + 1], [cx, pk], [x1 + 5, al + 1]], (x, y) => ((y - pk) % 4 === 0 ? hex('#3a2a2a') : (x + (Math.floor((y - pk) / 4) % 2) * 3) % 6 === 0 ? hex('#4a3030') : hex('#5a3a34')));
    poligono([[x0 - 5, al + 1], [cx, pk], [x1 + 5, al + 1], [x1 + 5, al - 2], [cx, pk + 3], [x0 - 5, al - 2]], hex('#e4ecf8'));
    for (let x = x0 - 5; x <= x1 + 5; x++) { if (h7(x, 3, 702) < 0.5) pset(x, al + 2, hex('#c8d4ec')); if (h7(x, 4, 702) < 0.25) pset(x, al + 3, hex('#a8b8d8')); }
    if (tipo === 1) { for (let x = x0 + 4; x < x1; x += 13) rect(x, al, x + 1, 140, hex('#3a2418')); for (const y of [al + 22, al + 44]) rect(x0, y, x1, y + 1, hex('#3a2418')); for (let x = x0 + 4; x < x1 - 13; x += 13) linea(x + 1, al + 22, x + 13, al + 44, hex('#3a2418')); }
    // ventanas: dos filas, con contraventanas y macetero con ramas de abeto
    const n = Math.max(2, Math.floor((x1 - x0) / 20));
    for (let i = 0; i < n; i++) for (const [fy, alta] of [[al + 10, 9], [al + 34, 10]]) { if (fy + alta > 128) continue; const wx = Math.round(x0 + (i + 0.5) * (x1 - x0) / n) - 4; if (wx < 2 || wx > 312) continue;
      const on = h7(i, fy, x0) < 0.75; d_ventana7(R, wx, fy, wx + 7, fy + alta, { luz: on ? hex('#ffc860') : hex('#3a3a5a'), luzS: on ? hex('#e8903a') : hex('#2a2a44'), luzL: on ? hex('#fff0b0') : hex('#4a4a6a'), marco: hex('#e8e0d0'), marcoS: T.C.k, nieve: hex('#e4ecf8'), cortina: on && i % 2 ? hex('#b8302a') : null });
      rect(wx - 5, fy, wx - 3, fy + alta, hex('#2a5a3a')); rect(wx + 10, fy, wx + 12, fy + alta, hex('#2a5a3a')); for (let y = fy + 1; y < fy + alta; y += 2) { pset(wx - 4, y, hex('#1a3a24')); pset(wx + 11, y, hex('#1a3a24')); }
      if (fy > al + 20) { rect(wx - 2, fy + alta + 4, wx + 9, fy + alta + 6, hex('#5a3a1a')); for (let x = wx - 2; x <= wx + 9; x += 2) pset(x, fy + alta + 3, hex('#2a6a3a')); } }
    if (tipo === 2) { const y = al + 30; rect(x0 + 6, y, x1 - 6, y + 2, hex('#4a2e1c')); for (let x = x0 + 7; x < x1 - 6; x += 3) rect(x, y - 7, x, y, hex('#6a442a')); rect(x0 + 6, y - 8, x1 - 6, y - 8, hex('#6a442a')); rect(x0 + 6, y - 9, x1 - 6, y - 9, hex('#e4ecf8')); }
    // puerta con su farolillo
    const dx = Math.round(cx) - 5; rect(dx - 1, 124, dx + 10, 140, T.C.k); rect(dx, 125, dx + 9, 140, hex('#4a2a1a')); rect(dx + 4, 125, dx + 4, 140, hex('#2a1a10')); pset(dx + 7, 133, hex('#e8c040')); poligono([[dx - 3, 124], [dx + 4, 119], [dx + 12, 124]], hex('#3a2a2a'));
  }
  // la acera y el adoquinado con nieve pisada y rodadas
  rect(0, 140, 319, 145, hex('#5a5a74')); rect(0, 140, 319, 140, hex('#8a8aa8'));
  d_piedras7(R, 0, 146, 319, 179, [hex('#4a4866'), hex('#36344e'), hex('#64627e'), hex('#26243a')], 5, 9, 7);
  for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h7(x >> 2, y >> 1, 703); if (n < 0.28 + Math.sin(x * 0.05) * 0.1) pset(x, y, n < 0.12 ? hex('#e4ecf8') : hex('#b8c4dc')); }
};
// la valla de madera por delante del público (capa transparente)
const vallaDesfile = () => { const { rect, pset } = R;
  for (let x = 0; x < 320; x += 18) { rect(x, 128, x + 2, 147, T.C.k); rect(x, 129, x + 1, 147, hex('#6a4a2e')); rect(x - 1, 127, x + 3, 128, hex('#e4ecf8')); }
  for (const y of [132, 140]) { rect(0, y, 319, y + 3, T.C.k); rect(0, y + 1, 319, y + 2, hex('#7a5636')); for (let x = 0; x < 320; x += 3) if (h7(x, y, 704) < 0.3) pset(x, y + 1, hex('#5a3e24')); rect(0, y, 319, y, hex('#d8e0f0')); }
};
const PUBLICO = [[8, EL.vigilante], [26, EL.vecina], [44, EL.adultoCatalan], [62, EL.ninaCatalana], [82, EL.vecino], [100, EL.obreraEscocesa], [120, EL.ninoCatalan], [186, EL.dama1857 ?? EL.vecina], [204, EL.senor1857 ?? EL.vecino], [268, EL.obreroEscoces], [286, EL.vecinoPastel ?? EL.vecino], [304, EL.ninaVictoriana]];
const p3 = (t) => {
  const lanza = SCARES - 0.25;
  fondoDesfile && fondo7('kr-desfile', fondoDesfile);
  d_estrellas7(R, t, 50, 70, 705, hex('#8a90c8'), hex('#f4f0ff'));
  d_nubes7(R, t, 60, [hex('#262a58'), hex('#343a6c'), hex('#4c5288')], 3, 0.6, 5);
  // guirnaldas de bombillas entre las casas
  for (const [x0, y0, x1, y1] of [[0, 96, 100, 100], [100, 100, 224, 98], [224, 98, 319, 104]]) d_guirnalda7(R, x0, y0, x1, y1, 8, t, [hex('#ff4a3a'), hex('#ffd04a'), hex('#4ad06a'), hex('#4a9aff')], 6, hex('#1a1a2a'), x0);
  // cientos más: una fila de antorchas que baja por el monte y la columna del callejón (más cuando lo dice la voz)
  const mas = 1 + tramo(t, PARADES, HUNDREDS + 0.4) * 1.6;
  for (let k = 0; k < Math.round(18 * mas); k++) { const u = ((k / (18 * mas)) + t * 0.025) % 1, x = Math.round(4 + u * 132), y = Math.round(100 + Math.sin(u * 9) * 3 + u * 4); if (Math.sin(t * 11 + k) > -0.6) R.pset(x, y, hex('#ffb040')); if (k % 3 === 0) R.pset(x, y - 1, hex('#ffe080')); }
  R.recorte([141, 90, 175, 131]);
  for (let k = 0; k < Math.round(7 * mas); k++) { const u = ((k / (7 * mas)) + t * 0.09) % 1, y = Math.round(94 + u * 36), x = Math.round(158 + Math.sin(k * 2.3) * (2 + u * 9)), al = Math.round(3 + u * 6);
    R.rect(x - 1, y - al, x + 1, y, hex('#1a1424')); R.pset(x - 1, y - al - 1, hex('#e8dcc0')); R.pset(x + 1, y - al - 1, hex('#e8dcc0')); if (k % 2 === 0) llama7(x + 2, y - al, t, false); }
  R.recorte(null);
  for (const x of [58, 118, 198, 262]) antorcha7(x, 108, t);
  // el público detrás de la valla: aplauden y vitorean cuando llega el desfile grande
  const vitorea = t > PARADES;
  for (const [x, d] of PUBLICO) R.actor(d, x, 146, t, { dir: x < 160 ? 1 : -1, sonrisa: vitorea || x % 3 === 0, brazos: vitorea && Math.sin(t * 7 + x) > 0.3, habla: !vitorea && Math.sin(t * 5 + x) > 0.6 });
  d_pegar7(R, d_capa7(R, 'kr-valla', vallaDesfile, true), 126, 148);
  // el desfile: dos filas de Krampus (algunos con antorcha) de izquierda a derecha
  const linea7 = (suelo, v, sep, fase, n, salta) => { for (let k = 0; k < n; k++) { const x = Math.round(((k * sep + fase + t * v) % (n * sep)) - 30); if (x < -30 || x > 340 || (salta && t < MISB + 1.2 && x > 110 && x < 330)) continue;
    const def = (k + fase) % 3 ? EL.krampus : EL.krampus2, ant = (k + fase) % 2 === 0, a = R.actor(def, x, suelo, t, { dir: 1, anda: true, sostiene: ant ? [x + 15, suelo - 24] : false });
    if (ant) { R.linea(a.mano[0], a.mano[1] + 2, a.mano[0] + 1, a.mano[1] - 6, hex('#5a3a1a')); llama7(a.mano[0] + 1, a.mano[1] - 6, t); } } };
  // el Krampus del susto (fila de atrás): le da la bola, se vuelve, salta hacia el niño y sigue su camino
  const KX = ruta7(t, [[P3, 128, 176], [SCARES + 0.1, 212, 176], [CHILDREN - 0.05, 212, 176], [CHILDREN + 0.3, 236, 174], [MISB + 0.6, 236, 174], [E.duracion, 340, 176]]);
  linea7(160, 16, 44, 7, 9, false);
  { const salto = t > CHILDREN - 0.05 && t < CHILDREN + 0.35 ? Math.round(Math.sin(tramo(t, CHILDREN - 0.05, CHILDREN + 0.35) * Math.PI) * 12) : 0, asusta = t > CHILDREN && t < MISB + 0.6;
    R.actor(EL.krampus, KX.x + (asusta && Math.sin(t * 28) > 0 ? 1 : 0), KX.s, t, { dir: 1, anda: KX.mv, brazos: asusta, salto }); }
  // la bola de nieve en el aire y su golpe en blanco
  { const u = tramo(t, lanza, SCARES + 0.1); if (u > 0 && u < 1) { const x = Math.round(lerp(256, 226, u)), y = Math.round(lerp(156, 150, u) - Math.sin(u * Math.PI) * 12); R.disco(x, y, 2, T.C.k); R.disco(x, y, 1, T.C.nieve); }
    if (t > SCARES + 0.1 && t < SCARES + 0.5) for (let k = 0; k < 6; k++) { const a = k * 1.05, r = 2 + (t - SCARES - 0.1) * 14; R.pset(Math.round(226 + Math.cos(a) * r), Math.round(150 + Math.sin(a) * r), T.C.nieve); } }
  linea7(176, 20, 40, 3, 10, true);
  // en primer término, el niño travieso y su madre: tira la bola, el Krampus salta hacia él y se esconde detrás de ella
  const huye = tramo(t, CHILDREN + 0.05, CHILDREN + 0.45);
  const an = R.actor(EL.ninoVictoriano, Math.round(lerp(266, 302, huye)), 179, t, { dir: huye > 0 && huye < 1 ? 1 : -1, anda: huye > 0 && huye < 1, sostiene: t < lanza ? [254, 158 - Math.round(tramo(t, P3, lanza) * 4)] : false, sorpresa: t > CHILDREN && t < MISB + 0.8, sonrisa: t < lanza + 0.3 || t > MISB + 1.2 });
  if (t < lanza) { R.disco(an.mano[0], an.mano[1] - 1, 2, T.C.k); R.disco(an.mano[0], an.mano[1] - 1, 1, T.C.nieve); }
  R.actor(EL.vecina, 288, 179, t, { dir: -1, dedo: t > MISB + 0.2 && t < MISB + 1.6, sonrisa: t > MISB + 0.2, sorpresa: t > CHILDREN && t < CHILDREN + 0.3 });
  if (t > CHILDREN - 0.1 && t < CHILDREN + 0.9) R.icono('!', an.cabeza[0] - 4, an.cabeza[1] - 26, hex('#ffd040'), T.C.k, 2);
  d_nieve7(R, t, 45, hex('#b8c4e0'), hex('#f4f8ff'), 1, 6);
};
const efectos = [[DIC5, 'campana'], [WITH, 'golpecito'], [KRAMPUS, 'campana'], [KRAMPUS + 0.3, 'whoosh'], [SCARES, 'whoosh'], [CHILDREN, 'boing'], [PARADES, 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
'''))

E['nv-islandia'] = ('Islandia', '''// NV-ISLANDIA (frase 22), hoy (2026). Tres planos:
// 1. inserto (fondo local): la ventana de la granja por dentro; una mano deja el zapato en el alféizar («arriving»), el
//    11 del calendario pasa a 12 y se marca, el gato negro levanta la cabeza; por la ventana, bajo la aurora, los primeros
//    muchachos bajan del monte (corta en «but»);
// 2. la granja por fuera: los trece muchachos llegan uno a uno y la cuenta sube hasta 13; uno deja un dulce en el zapato
//    de la ventana y llama a la puerta roja, otro da un salto; al final miran atrás: dos ojos amarillos (corta en «because»);
// 3. la ladera: el gato de Yule asoma enorme tras la colina («Yule cat»), el muchacho del jersey viejo huye a la granja y
//    el del jersey nuevo abre los brazos con chispas; el gato se vuelve a esconder.''', LIB + _en('islandia', 0.5, 19.154, r'''
const P2 = @(6.05), P3 = @(13.0);
const VISIT = @(2.18), ARRIV = @(2.86), DIC12 = @(3.86), SANTA = @(5.32), TRECE = @(6.2), MISCH = @(8.28), ONEBY = @(11.28), ALONE = @(12.46);
const CAT = @(14.02), GOES = @(15.94), NEW = @(17.42), CLOTHES = @(17.72);

// 1 · inserto (fondo local): la ventana de la granja por dentro, el 11 pasa a 12 en el calendario, una mano pone el zapato
//     en el alféizar y, por la ventana, los primeros muchachos bajan del monte bajo la aurora
const VEN = [128, 30, 222, 110];   // el cristal
const fondoCasa = () => {
  const { rect, pset, linea, poligono, disco } = R;
  // la pared de tablas horizontales de la baðstofa, con la esquina de Atom en sombra tranquila
  d_tablas7(R, 0, 0, 319, 128, hex('#7a5434'), hex('#4e3420'), hex('#94683e'), 7, false, 1);
  for (let y = 0; y < 60; y++) for (let x = 250; x < 320; x++) { const a = Math.min(1, (x - 250) / 40) * Math.min(1, (60 - y) / 30); if (d_umbral7(x, y) < a * 0.9) pset(x, y, x > 270 && y < 48 ? hex('#3a2818') : d_mezcla7(R.pget(x, y), hex('#2a1c10'), 0.5)); }
  rect(0, 0, 250, 5, hex('#3a2616')); for (let x = 0; x < 250; x += 40) { rect(x, 0, x + 6, 9, hex('#4a3020')); rect(x, 9, x + 6, 9, hex('#2a1a0e')); }
  // el hueco de la ventana en el muro grueso de tepe: derrame de yeso blanco, con luz de un lado
  poligono([[VEN[0] - 16, VEN[1] - 12], [VEN[2] + 16, VEN[1] - 12], [VEN[2] + 2, VEN[1] - 2], [VEN[0] - 2, VEN[1] - 2]], hex('#cfc4ae'));
  poligono([[VEN[0] - 16, VEN[1] - 12], [VEN[0] - 2, VEN[1] - 2], [VEN[0] - 2, VEN[3] + 2], [VEN[0] - 16, VEN[3] + 10]], hex('#e4dac4'));
  poligono([[VEN[2] + 16, VEN[1] - 12], [VEN[2] + 2, VEN[1] - 2], [VEN[2] + 2, VEN[3] + 2], [VEN[2] + 16, VEN[3] + 10]], hex('#a89a80'));
  for (let k = 0; k < 160; k++) { const x = Math.round(VEN[0] - 15 + h7(k, 1, 720) * (VEN[2] - VEN[0] + 30)), y = Math.round(VEN[1] - 11 + h7(k, 2, 720) * (VEN[3] - VEN[1] + 20)); if (x > VEN[0] - 2 && x < VEN[2] + 2 && y > VEN[1] - 2) continue; pset(x, y, hex('#b8ac94')); }
  linea(VEN[0] - 16, VEN[1] - 12, VEN[2] + 16, VEN[1] - 12, hex('#2a1a0e'));
  // el alféizar de madera
  rect(VEN[0] - 22, VEN[3] + 8, VEN[2] + 22, VEN[3] + 15, T.C.k); rect(VEN[0] - 21, VEN[3] + 9, VEN[2] + 21, VEN[3] + 14, hex('#8a5e36')); rect(VEN[0] - 21, VEN[3] + 9, VEN[2] + 21, VEN[3] + 9, hex('#b48452')); rect(VEN[0] - 21, VEN[3] + 14, VEN[2] + 21, VEN[3] + 14, hex('#5a3a20'));
  rect(VEN[0] - 16, VEN[3] + 2, VEN[2] + 16, VEN[3] + 7, hex('#d8ccb4'));
  // el calendario colgado de un clavo, y un jersey de lana con su dibujo (lopapeysa) en una percha
  rect(60, 52, 61, 54, T.C.k);
  { const x0 = 14, y0 = 70; linea(x0 + 8, y0 - 6, x0 + 14, y0 - 10, hex('#3a2a1a')); linea(x0 + 20, y0 - 6, x0 + 14, y0 - 10, hex('#3a2a1a')); rect(x0 + 13, y0 - 12, x0 + 15, y0 - 10, T.C.k);
    poligono([[x0, y0 - 4], [x0 + 28, y0 - 4], [x0 + 34, y0 + 14], [x0 + 29, y0 + 16], [x0 + 26, y0 + 6], [x0 + 26, y0 + 40], [x0 + 2, y0 + 40], [x0 + 2, y0 + 6], [x0 - 1, y0 + 16], [x0 - 6, y0 + 14]], hex('#e8e0cc'));
    for (let x = x0 - 5; x <= x0 + 33; x++) for (let y = y0 - 3; y <= y0 + 39; y++) { const c = R.pget(x, y); if (c !== hex('#e8e0cc')) continue; const yy = y - y0;
      if (yy < 10) { const r = Math.abs(((x - x0 + 100) % 6) - 3); pset(x, y, yy > 2 + r && yy < 8 - r ? hex('#3a4a7a') : yy === 9 ? hex('#8a3a2a') : (x + y) % 5 ? hex('#e8e0cc') : hex('#c8c0ac')); }
      else if (yy > 34) pset(x, y, yy % 2 ? hex('#3a4a7a') : hex('#e8e0cc')); else if ((x + y) % 7 === 0) pset(x, y, hex('#c8c0ac')); }
    linea(x0 - 6, y0 + 14, x0, y0 - 4, T.C.k); linea(x0 + 34, y0 + 14, x0 + 28, y0 - 4, T.C.k); rect(x0 + 2, y0 + 40, x0 + 26, y0 + 40, T.C.k); }
  // la repisa de la derecha: cuencos de madera, la cuchara larga, un tarro, un candil
  { const y = 100; rect(244, y, 318, y + 3, T.C.k); rect(245, y, 318, y + 2, hex('#9a6a3e')); rect(245, y, 318, y, hex('#c08a52')); for (const x of [252, 306]) { rect(x, y + 3, x + 2, y + 12, hex('#5a3a20')); linea(x, y + 12, x + 8, y + 3, hex('#5a3a20')); }
    for (const [x, w] of [[254, 12], [270, 9]]) { rect(x, y - 5, x + w, y - 1, T.C.k); rect(x + 1, y - 5, x + w - 1, y - 2, hex('#a8743e')); rect(x + 1, y - 5, x + w - 1, y - 5, hex('#d8a060')); }
    linea(282, y - 1, 290, y - 12, hex('#c8a060')); disco(290, y - 13, 2, hex('#c8a060')); rect(296, y - 10, 304, y - 1, T.C.k); rect(297, y - 9, 303, y - 2, hex('#6a8a9a')); rect(297, y - 9, 298, y - 2, hex('#9abaca')); rect(296, y - 12, 304, y - 10, hex('#8a6a4a')); }
  // la cama de la baðstofa bajo la ventana: costado de madera tallada y la manta de lana tejida
  rect(0, 129, 319, 179, hex('#4a3020')); d_tablas7(R, 0, 152, 319, 179, hex('#6a4428'), hex('#40281a'), hex('#8a5e36'), 6, true, 4);
  for (let x = 6; x < 320; x += 26) { for (let k = 0; k < 6; k++) { const a = k * 1.047; pset(Math.round(x + 7 + Math.cos(a) * 5), Math.round(165 + Math.sin(a) * 5), hex('#a87a4a')); } pset(x + 7, 165, hex('#a87a4a')); }
  rect(0, 152, 319, 153, hex('#2a1a0e'));
  for (let y = 128; y < 152; y++) for (let x = 0; x < 320; x++) { const yy = y - 128, b = Math.floor(yy / 6), d = Math.abs(((x + b * 3) % 12) - 6);
    const c = yy % 6 === 0 ? hex('#e8e0cc') : b % 2 ? (d < yy % 6 ? hex('#a83a2a') : hex('#e8e0cc')) : (d > 6 - (yy % 6) ? hex('#2a4a6a') : hex('#d8c8a4')); pset(x, y, c); }
  for (let x = 0; x < 320; x++) pset(x, 128 + (x % 9 === 0 ? 1 : 0), hex('#f2ece0'));
};
// lo de fuera, con su propio recorte: el cielo, el monte con el sendero y los muchachos que bajan
const fueraCasa = () => {
  const { rect, pset } = R;
  d_degradado7(R, 0, 179, [[0, hex('#06081c')], [0.3, hex('#0e1834')], [0.55, hex('#162a44')], [1, hex('#1e3a50')]]);
  for (let k = 0; k < 40; k++) pset(VEN[0] + Math.round(h7(k, 1, 721) * 94), VEN[1] + Math.round(h7(k, 2, 721) * 40), k % 4 ? hex('#8aa0c0') : hex('#f0f4ff'));
};
const monteCasa = () => {
  const cr = new Int16Array(320); for (let x = 0; x < 320; x++) cr[x] = Math.round(90 - 24 * Math.exp(-((x - 158) ** 2) / 900) - 8 * Math.exp(-((x - 205) ** 2) / 500) + Math.sin(x * 0.3) * 1.2);
  d_montes7(R, cr, 112, { roca: hex('#3a4a5e'), rocaS: hex('#26323e'), nieve: hex('#c8d8ea'), nieveS: hex('#8a9ab8'), nieveL: hex('#eef4fa'), bruma: hex('#2a3a4e') }, 30, 5);
  for (let x = 128; x <= 222; x++) for (let y = 100; y <= 110; y++) if (y > 104 + Math.sin(x * 0.2) * 2) R.pset(x, y, y % 2 ? hex('#dfe8f2') : hex('#c8d4e2'));
  for (let i = 0; i < 6; i++) { const [x0, y0] = SEND[i], [x1, y1] = SEND[i + 1]; R.linea(x0, y0, x1, y1, hex('#7a8aa0')); }
};
const SEND = [[158, 68], [170, 75], [150, 82], [176, 90], [148, 98], [180, 104], [166, 110]];
const enSendero = (u) => { const f = Math.max(0, Math.min(0.999, u)) * (SEND.length - 1), i = Math.floor(f), w = f - i; return [Math.round(lerp(SEND[i][0], SEND[i + 1][0], w)), Math.round(lerp(SEND[i][1], SEND[i + 1][1], w))]; };
const p1 = (t) => {
  fondo7('is-casa', fondoCasa);
  // por la ventana: cielo, aurora que ondula, el monte nevado con el sendero y los muchachos diminutos que bajan
  R.recorte(VEN); caja7(d_capa7(R, 'is-fuera', fueraCasa, false), VEN);
  d_aurora7(R, t, 60, 28, [hex('#2ad08a'), hex('#4af0a0'), hex('#a060d0')], 0.9, VEN[0], VEN[2], 2);
  caja7(d_capa7(R, 'is-monte', monteCasa, true), VEN);
  for (const [k, t0] of [[0, VISIT - 0.4], [1, SANTA - 0.3], [2, SANTA + 0.2]]) { if (t < t0) continue; const [x, y] = enSendero((t - t0) / 9);
    const c = [hex('#c83a2a'), hex('#2a6aa8'), hex('#3a8a4a')][k], f = Math.floor(t * 4) % 2; R.rect(x - 2, y - 7, x + 2, y - 2, T.C.k); R.rect(x - 1, y - 6, x + 1, y - 3, c); R.rect(x - 1, y - 9, x + 1, y - 7, hex('#e8b890')); R.rect(x - 1, y - 10, x + 1, y - 10, hex('#d83a2a')); R.pset(x, y - 11, hex('#f2f2f2')); R.pset(x - 1 + f, y - 1, T.C.k); R.pset(x + 1 - f, y - 1, T.C.k); R.pset(x + 3, y - 5, hex('#ffd060')); d_halo7(R, x + 3, y - 5, 4, hex('#ffc060'), 0.4); }
  d_nieve7(R, t, 14, hex('#9ab0c8'), hex('#eef4fa'), 0.6, 4);
  R.recorte(null);
  // el marco blanco de la ventana con su cruz y la escarcha en las esquinas
  { const [x0, y0, x1, y1] = VEN, mx = Math.round((x0 + x1) / 2), my = Math.round((y0 + y1) / 2);
    for (const [a, b, c, d] of [[x0 - 2, y0 - 2, x1 + 2, y0], [x0 - 2, y1, x1 + 2, y1 + 2], [x0 - 2, y0, x0, y1], [x1, y0, x1 + 2, y1], [mx - 1, y0, mx + 1, y1], [x0, my - 1, x1, my + 1]]) { R.rect(a, b, c, d, hex('#f2ece0')); }
    R.rect(x0 - 3, y0 - 3, x1 + 3, y0 - 3, T.C.k); R.rect(x0 - 3, y1 + 3, x1 + 3, y1 + 3, hex('#a89a80'));
    for (let k = 0; k < 40; k++) { const c = k % 4, ex = c % 2 ? x1 - 1 : x0 + 1, ey = c > 1 ? y1 - 1 : y0 + 1, r = h7(k, 5, 722) * 7; R.pset(Math.round(ex + (c % 2 ? -1 : 1) * r * h7(k, 6, 722)), Math.round(ey + (c > 1 ? -1 : 1) * r * h7(k, 7, 722)), hex('#e8f4ff')); } }
  // la vela del alféizar y su luz
  PZ.vela(R, 140, VEN[3] + 8, { t, s: 2, color: 'roja' }); d_halo7(R, 140, VEN[3] - 8, 18, hex('#ffd080'), 0.28);
  // el calendario: el 11 se levanta y debajo aparece el 12, que se marca con un círculo rojo
  const pasa = tramo(t, DIC12 - 0.45, DIC12);
  PZ.calendario(R, 61, 104, { s: 2, dia: pasa < 1 ? 11 : 12 });
  if (pasa > 0 && pasa < 1) { const top = Math.round(lerp(64, 30, pasa)); R.poligono([[42, 64], [80, 64], [80, Math.round(lerp(102, 70, pasa))], [42, Math.round(lerp(102, 66, pasa))]], hex('#f2eee2')); R.linea(42, 64, 80, 64, T.C.k); R.rect(42, top, 80, top, hex('#c8c0b0')); }
  { const m = tramo(t, DIC12 + 0.15, DIC12 + 0.7); if (m > 0) for (let k = 0; k < Math.round(m * 40); k++) { const a = k / 40 * Math.PI * 2 - 1.2; R.pset(Math.round(61 + Math.cos(a) * 15), Math.round(86 + Math.sin(a) * 11), hex('#c8202a')); R.pset(Math.round(61 + Math.cos(a) * 16), Math.round(86 + Math.sin(a) * 12), hex('#c8202a')); } }
  // el gato negro que duerme en la manta y respira (levanta la cabeza cuando llega el primero)
  { const x = 52, y = 132, r = Math.sin(t * 2.4) > 0 ? 1 : 0, mira = t > SANTA - 0.2 && t < SANTA + 0.8;
    R.rect(x - 9, y - 6 - r, x + 6, y, T.C.k); R.rect(x - 8, y - 7 - r, x + 5, y - 1, hex('#1e1a22')); R.rect(x - 7, y - 7 - r, x + 3, y - 7 - r, hex('#3a3442'));
    const hy = mira ? y - 11 : y - 7; R.rect(x + 4, hy, x + 11, y - 1, hex('#1e1a22')); R.pset(x + 5, hy - 1, hex('#1e1a22')); R.pset(x + 10, hy - 1, hex('#1e1a22')); if (mira) { R.pset(x + 6, hy + 2, hex('#f0d040')); R.pset(x + 9, hy + 2, hex('#f0d040')); } else { R.pset(x + 6, hy + 3, hex('#4a4250')); R.pset(x + 9, hy + 3, hex('#4a4250')); }
    R.linea(x - 9, y - 1, x - 14, y - 3 + Math.round(Math.sin(t * 2) * 1), hex('#1e1a22')); }
  // la niña sube a la cama con su zapato, lo deja en el alféizar y luego señala a los que bajan del monte
  const zx = 200, zy = VEN[3] + 8, deja = t >= ARRIV;
  const n = ruta7(t, [[0.2, 340, 132], [VISIT, 234, 132], [ARRIV + 0.4, 234, 132], [ARRIV + 1.2, 250, 132]]);
  const an = R.actor({ ...EL.ninaCatalana, pal: { ...(EL.ninaCatalana.pal || {}), C: hex('#e8e0cc'), c: hex('#b8b0a0') } }, n.x, n.s, t, { dir: -1, anda: n.mv, sostiene: !deja ? [Math.min(n.x - 2, 222), deja ? zy : t > VISIT ? 108 : 116] : undefined, dedo: t > SANTA - 0.4, sonrisa: t > ARRIV, sorpresa: t > SANTA - 0.5 && t < SANTA - 0.1 });
  if (!deja) PZ.zapato(R, an.mano[0] - 4, an.mano[1] + 5, { dir: -1 });
  else PZ.zapato(R, zx + 8, zy, { dir: -1 });
  chispas7(zx + 8, zy - 5, t, ARRIV, ARRIV + 0.9);
  for (let x = 236; x < 266; x++) if (h7(x, 1, 723) < 0.5) R.pset(x, 133, hex('#a83a2a'));
};

// 2 · la granja por fuera: los trece muchachos llegan uno a uno (la cuenta sube hasta 13), uno deja un dulce en el zapato
//     y llama a la puerta roja; al final miran atrás: dos ojos amarillos en lo oscuro
const LLEGA = (i) => TRECE - 0.05 + i * ((ONEBY - TRECE + 0.1) / 12);
const MUCH = [EL.muchachoYule, EL.muchachoYule2, EL.muchachoYule3];
const JERSEY = [null, ['#2a5a8a', '#1e4064'], ['#3a7a4a', '#285a34'], ['#c8a040', '#8a6a24'], ['#7a3a7a', '#552855'], ['#d8d0c0', '#a8a090']];
const p2 = (t) => {
  T.mundo(R, t, { encuadre: 'islandia', camara: 'granja' });
  // el humo de la chimenea de tepe
  d_humo7(R, 300, 52, t, hex('#8a94a8'), hex('#5a6478'), 6, 0.5);
  // la cuenta: un muchacho más cada vez
  let n = 0; for (let i = 0; i < 13; i++) if (t >= LLEGA(i)) n = i + 1;
  if (n > 0) { const b = Math.round(Math.max(0, 1 - (t - LLEGA(n - 1)) * 5) * 3); R.numero(String(n), 52, 46 - b, { tam: 16, centro: true }); }
  // los ojos del gato de Yule en lo oscuro, al final
  if (t > ALONE && Math.sin(t * 3) > -0.8) for (const x of [8, 15]) { R.rect(x, 156, x + 2, 157, hex('#f0d040')); R.pset(x + 1, 156, T.C.k); }
  // el primero: corre a la ventana, deja un dulce en el zapato, va a la puerta roja y llama
  const a = ruta7(t, [[TRECE, -14, 174], [MISCH, 140, 174], [MISCH + 1.1, 140, 174], [MISCH + 1.9, 228, 174], [MISCH + 2.9, 228, 174], [P3, 330, 174]]);
  const enVent = t > MISCH && t < MISCH + 1.1, llama = t > MISCH + 1.9 && t < MISCH + 2.9;
  const ma = R.actor(EL.muchachoYule, a.x, a.s, t, { dir: a.d || 1, anda: a.mv, salto: a.mv ? Math.round(Math.abs(Math.sin(t * 9)) * 2) : 0, sostiene: enVent ? [150, 120] : llama ? [236 + (Math.sin(t * 16) > 0 ? 1 : 0), 140] : false, sonrisa: true });
  if (enVent && t < MISCH + 0.7) PZ.dulces(R, ma.mano[0], ma.mano[1] + 2, {});
  if (t > MISCH + 0.7) PZ.dulces(R, 150, 125, {});
  // los otros doce: entran por la izquierda, trotan con saltitos y alguno hace el pino o salta; al final miran atrás
  for (let i = 1; i < 13; i++) { const t0 = LLEGA(i); if (t < t0) continue; const s = i % 2 ? 170 : 177, x = Math.round(-14 + (t - t0) * (30 + (i % 3) * 4)); if (x > 340) continue;
    const mira = t > ALONE + 0.2, j = JERSEY[i % JERSEY.length], pal = j ? { C: hex(j[0]), c: hex(j[1]) } : undefined, trav = i === 2 && t > MISCH - 0.3 && t < MISCH + 0.6;
    R.actor(MUCH[i % 3], x, s, t, { dir: mira ? -1 : 1, anda: !mira, pal, salto: trav ? Math.round(Math.sin(tramo(t, MISCH - 0.3, MISCH + 0.6) * Math.PI) * 14) : Math.round(Math.abs(Math.sin(t * 8 + i)) * 2), brazos: trav, sorpresa: mira && i % 2 === 0, sonrisa: !mira }); }
  d_nieve7(R, t, 30, hex('#b8c8dc'), hex('#eef4fa'), 0.8, 5);
};

// 3 · la ladera con la granja: el gato de Yule asoma enorme tras la colina; el muchacho del jersey viejo y remendado
//     huye a la granja; el del jersey nuevo se queda tan tranquilo (chispas) y el gato se vuelve a esconder
const p3 = (t) => {
  T.mundo(R, t, { encuadre: 'islandia', camara: 'general' });
  // dos muchachos lejos, bajando por lo alto del sendero
  for (const [k, t0] of [[0, P3 - 3], [1, P3 + 0.5], [2, P3 + 3]]) { const u = Math.min(1, (t - t0) / 12), x = Math.round(lerp(34, 170, u)), y = Math.round(lerp(62, 100, u)); d_gente7(R, x, y, t, { anda: u < 1, dir: 1, c: [hex('#2a5a8a'), hex('#3a7a4a'), hex('#c8a040')][k], gorro: hex('#d83a2a'), alto: 8 }); }
  // el gato: sube tras la colina cuando lo nombran, sigue al que huye y se esconde al ver el jersey nuevo
  const sube = tramo(t, CAT - 0.3, CAT + 0.25) - tramo(t, CLOTHES + 0.6, E.duracion - 0.3), gx = Math.round(lerp(112, 146, tramo(t, GOES - 0.2, GOES + 1.3)));
  if (sube > 0) { R.recorte([0, 0, 319, 150]); PZ.gatoYule(R, gx, Math.round(lerp(158, 128, sube)), { s: 2, t, dir: t > NEW ? 1 : -1 }); R.recorte(null); }
  T.mundoDelante(R, t, { encuadre: 'islandia', camara: 'general', colinaDelante: true });
  // el del jersey viejo (gris, con remiendos): baja por el sendero, ve al gato y corre a la puerta de la granja
  const v = ruta7(t, [[P3, 186, 110], [CAT + 0.4, 206, 120], [GOES - 0.1, 206, 120], [GOES + 0.4, 222, 132], [GOES + 0.8, 236, 146], [GOES + 1.4, 218, 150]]);
  if (t < GOES + 1.45) { const susto = t > CAT + 0.4; R.actor(EL.muchachoYule3, v.x, v.s, t, { dir: susto && !v.mv ? -1 : v.d || 1, anda: v.mv, sorpresa: susto, pal: { C: hex('#6a6a6e'), c: hex('#4a4a50') } });
    if (true) { R.rect(v.x + 6, v.s - 12, v.x + 8, v.s - 10, hex('#8a6a3a')); R.pset(v.x + 10, v.s - 8, hex('#5a4a2a')); R.pset(v.x + 5, v.s - 7, hex('#8a6a3a')); } }
  // el del jersey nuevo delante de la granja: saluda y luego, orgulloso, abre los brazos
  R.actor(EL.muchachoYule2, 290, 162, t, { dir: -1, dedo: t > GOES && t < NEW - 0.1, brazos: t > NEW && t < CLOTHES + 1.2, sonrisa: true, pal: { C: hex('#d8283a'), c: hex('#a01828') } });
  chispas7(296, 146, t, NEW, CLOTHES + 1.3);
  d_nieve7(R, t, 30, hex('#b8c8dc'), hex('#eef4fa'), 0.8, 5);
};
const efectos = [[ARRIV, 'golpecito'], [DIC12, 'papel'], [MISCH + 0.6, 'golpecito'], [MISCH + 2.0, 'toc'], [CAT + 0.1, 'miau'], [GOES, 'whoosh'], [NEW, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
'''))

E['nv-posadas'] = ('Las posadas', '''// NV-POSADAS (frase 23), hoy (2026), el mundo mexica (1500) y 1828. Cuatro planos:
// 1. la calle de noche: la procesión con velas (José y María delante) camina hacia la posada; «16»; se encienden uno a
//    uno los nueve farolillos («nine nights», «9»); el del ponche remueve su olla (corta en «that»);
// 2. la puerta de la posada: José llama dos veces («searching for shelter»), la puerta se abre, la señora sale con una
//    flor de Nochebuena («flower», chispas) y los peregrinos entran (corta en «The Aztecs»);
// 3. fondo local: jardín mexica junto al lago, con el Templo Mayor y los volcanes; el jardinero corta una flor roja
//    («called it»), la levanta («cuetlaxochitl») y se la da a una niña («Poinsettia»); pasa una canoa (corta en «Joel»);
// 4. fondo local: el muelle de Veracruz al atardecer; Poinsett llega con su maceta, un marinero baja por la plancha, se
//    la lleva al barco de la bandera americana («sent it home») y el barco zarpa; «1828».''', LIB + _en('posadas', 0.5, 23.181, r'''
const P2 = @(6.4), P3 = @(12.0), P4 = @(17.35);
const DIC16 = @(1.06), NINE = @(4.48), SEARCH = @(8.16), SHELTER = @(8.92), FLOWER = @(10.38), THERE = @(11.38);
const AZTECS = @(12.16), CALLED = @(12.74), CUETLA = @(13.18), ENGLISH = @(15.1), POINSETTIA = @(15.84);
const JOEL = @(17.42), ENVOY = @(19.54), MEXICO = @(20.2), SENT = @(21.12), HOME = @(21.52), Y1828 = @(22.04);

// 1 · la calle de noche: la procesión con velas camina hacia la posada; «16»; se encienden uno a uno nueve farolillos («9»)
const MEX2 = { ...EL.mexicana, pal: { ...(EL.mexicana.pal || {}), C: hex('#b83a5a'), c: hex('#8a2440') } };
const MEX3 = { ...EL.mexicano, pal: { ...(EL.mexicano.pal || {}), C: hex('#3a5a8a'), c: hex('#28406a') } };
const farolillo = (x, y, on, t) => { if (on) d_halo7(R, x, y - 6, 13, hex('#ffc060'), 0.35 + Math.sin(t * 9 + x) * 0.05); R.rect(x - 5, y - 11, x + 5, y, T.C.k); R.rect(x - 4, y - 10, x + 4, y - 1, on ? hex('#ffd070') : hex('#b89a70')); R.rect(x - 4, y - 10, x + 4, y - 9, on ? hex('#fff0b0') : hex('#d0b890')); R.rect(x - 4, y - 2, x + 4, y - 1, on ? hex('#e8a040') : hex('#8a7050'));
  for (const [i, j] of [[0, -6], [-2, -5], [2, -5], [0, -4], [-1, -7], [1, -7]]) R.pset(x + i, y + j, on ? hex('#fff6d0') : hex('#7a6040')); };
const p1 = (t) => {
  T.mundo(R, t, { encuadre: 'mexico', camara: 'general', pinata: true });
  // el del ponche junto a su olla humeante (remueve)
  { const x = 128, s = 154; R.actor(MEX3, x, s, t, { dir: 1, sostiene: [x + 15 + Math.round(Math.sin(t * 4) * 2), s - 10], sonrisa: true }); R.rect(x + 12, s - 9, x + 26, s, T.C.k); R.rect(x + 13, s - 8, x + 25, s - 1, hex('#a8582a')); R.rect(x + 13, s - 8, x + 25, s - 8, hex('#6a2a10')); R.rect(x + 14, s - 9, x + 24, s - 9, hex('#c8702a')); d_humo7(R, x + 19, s - 11, t, hex('#e8e0d8'), hex('#b8b0a8'), 5, 0.2); }
  // los nueve farolillos de papel a lo largo de las fachadas: se encienden uno a uno cuando dice «nine nights»
  // la procesión: José y María delante, con las velas de los vecinos detrás
  const g = [[EL.jose, 0, 166], [EL.maria, -16, 162], [EL.mexicana, -36, 168], [MEX3, -54, 162], [MEX2, -72, 168], [EL.mexicano, -92, 164], [EL.mexicana, -110, 168]];
  const avance = Math.round(lerp(40, 232, tramo(t, 0, P2 - 0.2)));
  for (const [d, dx, s] of g.slice().reverse()) { const x = avance + dx; if (x < -20) continue; const lleva = d === EL.jose || d === EL.maria;
    const a = R.actor(d, x, s, t, { dir: 1, anda: t < P2 - 0.2, sonrisa: true, sostiene: lleva ? [x + 15, s - 13] : undefined });
    if (lleva) { PZ.vela(R, a.mano[0], a.mano[1] + 3, { t }); d_halo7(R, a.mano[0], a.mano[1] - 5, 8, hex('#ffd080'), 0.28); } }
  for (let k = 0; k < 9; k++) farolillo(40 + k * 30, 179, t > NINE + k * 0.11, t);
  cifra7('16', 58, 44, t, DIC16 + 0.1, DIC16 + 1.9);
  cifra7('9', 58, 44, t, NINE, NINE + 1.6);
  T.mundoDelante(R, t, { encuadre: 'mexico', camara: 'general' });
};

// 2 · la puerta de la posada: José llama, se abre la puerta, la señora sale con una flor de Nochebuena y los deja pasar
const HUECO = [211, 47, 251, 159];
const p2 = (t) => {
  T.mundo(R, t, { encuadre: 'mexico', camara: 'puerta' });
  // dentro, por la ventana con rejas, pasa una vecina con una vela
  { const u = ((t - P2) / 5) % 1, x = Math.round(lerp(30, 112, u)); R.recorte([41, 51, 99, 115]); R.actor(MEX2, x, 128, t, { dir: 1, anda: true }); R.recorte(null); }
  // la hoja derecha se abre hacia dentro: luz cálida, el nacimiento al fondo y la señora en el umbral
  const ab = tramo(t, SHELTER + 0.35, SHELTER + 0.95);
  if (ab > 0) { const [x0, y0, x1, y1] = HUECO, w = Math.round(lerp(40, 7, ab));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1 - w; x++) { const g = Math.hypot((x - 222) / 30, (y - 120) / 70); R.pset(x, y, g < 0.5 ? hex('#ffe0a0') : g < 0.9 ? hex('#f0b060') : hex('#c87a3a')); }
    R.rect(x0, 140, x1 - w, 159, hex('#a8603a')); for (let x = x0; x <= x1 - w; x += 6) R.rect(x, 140, x, 159, hex('#8a4a2a'));
    if (x1 - w > x0 + 12) { R.rect(x0 + 3, 128, x0 + 11, 136, T.C.k); R.rect(x0 + 4, 129, x0 + 10, 135, hex('#d8a060')); R.pset(x0 + 7, 130, hex('#fff6c0')); }
    R.rect(x1 - w, y0, x1, y1, T.C.k); d_tablas7(R, x1 - w + 1, y0 + 1, x1 - 1, y1 - 1, hex('#5a3418'), hex('#3a200e'), hex('#7a4a24'), 3, true, 9);
    R.recorte([x0, y0, x1 - w, y1]); const s = ruta7(t, [[SHELTER + 0.6, 248, 160], [SHELTER + 1.2, 232, 160]]);
    const ms = R.actor(EL.mexicana, s.x, 160, t, { dir: -1, anda: s.mv, sonrisa: true, sostiene: t > FLOWER - 0.6 ? [s.x - 12, 140] : undefined });
    if (t > FLOWER - 0.6) PZ.flor(R, ms.mano[0], ms.mano[1] + 6, {});
    R.recorte(null);
    // la luz que sale por el suelo
    for (let y = 160; y < 180; y++) for (let x = x0 - (y - 160); x <= x1 - w + (y - 160) * 0.4; x++) if (d_umbral7(x, y) < ab * 0.45 * (1 - (y - 160) / 22)) d_tinta7(R, x, y, hex('#ffd080'), 0.35); }
  // José llama (dos golpes), María espera con su vela; luego entran
  const j = ruta7(t, [[P2, -20, 172], [P2 + 1.4, 156, 172], [THERE - 0.6, 156, 172], [THERE + 0.5, 216, 162]]), m = ruta7(t, [[P2, -40, 172], [P2 + 1.5, 134, 172], [THERE - 0.4, 134, 172], [THERE + 0.6, 198, 162], [P3 + 0.5, 210, 162]]);
  const golpe = t > SEARCH - 0.1 && t < SHELTER + 0.2, toc = golpe && Math.sin((t - SEARCH) * 12) > 0;
  const entran = t > THERE - 0.6;
  if (entran) R.recorte([0, 0, HUECO[2] - 6, 179]);
  const am = R.actor(EL.maria, m.x, m.s, t, { dir: 1, anda: m.mv, sonrisa: t > SHELTER + 0.6, sostiene: [m.x + 15, m.s - 13] }); PZ.vela(R, am.mano[0], am.mano[1] + 3, { t }); d_halo7(R, am.mano[0], am.mano[1] - 5, 8, hex('#ffd080'), 0.28);
  R.actor(EL.jose, j.x, j.s, t, { dir: 1, anda: j.mv, sostiene: golpe ? [toc ? 170 : 167, 146] : undefined, sonrisa: t > SHELTER + 0.6, sorpresa: t > SHELTER + 0.4 && t < SHELTER + 0.8 });
  if (entran) R.recorte(null);
  // los vecinos de la procesión, detrás, con sus velas; uno señala la flor
  for (const [d, x, s] of [[MEX3, 70, 174], [EL.mexicana, 96, 176]]) { const p = ruta7(t, [[P2, x - 110, s], [P2 + 1.8, x, s]]); const a = R.actor(d, p.x, p.s, t, { dir: 1, anda: p.mv, dedo: d === MEX3 && t > FLOWER - 0.2 && t < THERE, sonrisa: t > SHELTER + 0.6 }); }
  chispas7(229, 132, t, FLOWER - 0.1, THERE);
  T.mundoDelante(R, t, { encuadre: 'mexico', camara: 'puerta' });
};

// 3 · fondo local: un jardín mexica junto al lago, con el templo, los volcanes y las chinampas; el jardinero corta una flor
//     roja (cuetlaxóchitl), la levanta y se la da a una niña; un colibrí; pasa una canoa
const fondoMexica = () => {
  const { rect, pset, linea, poligono, disco } = R;
  d_degradado7(R, 0, 96, [[0, hex('#2a64b8')], [0.4, hex('#4a86cc')], [0.75, hex('#86b6e0')], [1, hex('#cfe2ea')]]);
  // los volcanes: el Popocatépetl (cono) y el Iztaccíhuatl (la mujer dormida), con nieve
  const cr = new Int16Array(320);
  for (let x = 0; x < 320; x++) { const pop = 40 + Math.abs(x - 76) * 0.72, izt = 60 + Math.abs(x - 196) * 0.18 + Math.sin((x - 150) * 0.09) * 3, cola = 84 - Math.sin(x * 0.03) * 3; cr[x] = Math.round(Math.min(pop, x > 130 && x < 270 ? izt : 99, cola)); }
  d_montes7(R, cr, 96, { roca: hex('#6a7a9a'), rocaS: hex('#4e5a78'), nieve: hex('#eef2f8'), nieveS: hex('#b8c4d8'), nieveL: hex('#ffffff'), bruma: hex('#a8c0d4') }, 13, 7);
  // colinas verdes con bosque al pie de los volcanes
  for (let x = 0; x < 320; x++) { const y0 = Math.round(90 + Math.sin(x * 0.04) * 3 + Math.sin(x * 0.11) * 1.5); for (let y = y0; y <= 100; y++) pset(x, y, (x + y) % 5 && h7(x >> 1, y, 730) > 0.3 ? hex('#4a7a4a') : hex('#3a6040')); if (h7(x, 1, 731) < 0.3) pset(x, y0 - 1, hex('#3a6040')); }
  // el lago con sus ondas y reflejos
  for (let y = 100; y <= 128; y++) for (let x = 0; x < 320; x++) { const o = Math.sin(x * 0.3 + y * 1.7) + Math.sin(x * 0.11 - y * 0.9); pset(x, y, o > 1.3 ? hex('#a8d4ea') : o > 0.6 ? hex('#5aa0c8') : y < 108 ? hex('#4a8cb8') : hex('#3a7cac')); }
  // Tenochtitlan en su isla: casas blancas de azotea y el Templo Mayor con sus dos santuarios (rojo y azul)
  rect(150, 101, 318, 106, hex('#c8b890'));
  for (let k = 0; k < 22; k++) { const x = 150 + Math.round(h7(k, 1, 732) * 160), w = 6 + Math.round(h7(k, 2, 732) * 8), al = 4 + Math.round(h7(k, 3, 732) * 5); rect(x, 101 - al, x + w, 101, hex('#f0e8d8')); rect(x + w - 1, 101 - al, x + w, 101, hex('#c8bca8')); rect(x + 2, 99 - Math.round(al / 2), x + 3, 100, hex('#6a5a4a')); }
  { const cx = 232, base = 101; for (let p = 0; p < 4; p++) { const w = 26 - p * 5, y = base - p * 6; rect(cx - w, y - 6, cx + w, y, hex('#e8dcc4')); rect(cx - w, y, cx + w, y, hex('#a89880')); rect(cx - w, y - 6, cx - w + 1, y, hex('#c8bca4')); }
    rect(cx - 7, base - 24, cx + 7, base, hex('#d0c4ac')); for (let y = base - 24; y < base; y += 2) rect(cx - 6, y, cx + 6, y, hex('#b8ac94')); rect(cx - 8, base - 24, cx - 8, base, hex('#b8302a')); rect(cx, base - 24, cx, base, hex('#b8302a')); rect(cx + 8, base - 24, cx + 8, base, hex('#3a6ab8'));
    for (const [sx, c, cS] of [[cx - 12, '#c8302a', '#8a1a14'], [cx + 12, '#3a72c8', '#24508a']]) { rect(sx - 7, base - 34, sx + 7, base - 24, hex('#f0e8d8')); rect(sx - 4, base - 30, sx + 4, base - 24, T.C.k); poligono([[sx - 8, base - 34], [sx, base - 41], [sx + 8, base - 34]], hex(c)); for (let x = sx - 6; x <= sx + 6; x += 2) pset(x, base - 35, hex(cS)); } }
  // la calzada al lago y canoas quietas a lo lejos
  rect(0, 108, 150, 110, hex('#c8b890')); rect(0, 111, 150, 111, hex('#8a7a5a'));
  // las chinampas: parcelas verdes con surcos y sus ahuejotes, separadas por canales
  for (const [x0, x1, y0, y1, c] of [[-4, 96, 120, 134, '#5a8a3a'], [104, 210, 118, 132, '#6a9a3a'], [218, 324, 120, 134, '#4e7e34'], [-4, 120, 140, 150, '#6a9a44'], [128, 250, 138, 150, '#5a8e3a']]) {
    rect(x0, y0, x1, y1, hex('#5a4026')); rect(x0 + 1, y0, x1 - 1, y1 - 2, hex(c)); for (let y = y0 + 2; y < y1 - 2; y += 3) for (let x = x0 + 2; x < x1 - 2; x++) if ((x + y) % 4) pset(x, y, d_mezcla7(hex(c), hex('#2a5020'), 0.35)); else if (h7(x, y, 733) < 0.08) pset(x, y - 1, hex('#e8c040'));
    for (let x = x0 + 4; x < x1; x += 18) { const al = 16 + Math.round(h7(x, y0, 734) * 8); rect(x, y0 - al, x + 1, y0, hex('#4a3a24')); for (let j = 0; j < al - 2; j++) { const w = Math.round(1 + Math.sin(j / al * Math.PI) * 3); rect(x - w + 1, y0 - al + j, x + w, y0 - al + j, (j + x) % 3 ? hex('#2e5a2a') : hex('#4a7a3a')); } } }
  // los canales entre las chinampas
  rect(0, 134, 319, 137, hex('#3a7cac')); for (let x = 0; x < 320; x += 5) pset(x + ((x / 5) % 2), 135, hex('#8ac4e0'));
  rect(0, 150, 319, 152, hex('#3a7cac')); for (let x = 2; x < 320; x += 6) pset(x, 151, hex('#8ac4e0'));
  // el primer término: la tierra del jardín con piedras y los matorrales de cuetlaxóchitl
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h7(x >> 1, y >> 1, 735); pset(x, y, n < 0.15 ? hex('#6a4426') : n > 0.85 ? hex('#b07a48') : hex('#94643a')); }
  for (let k = 0; k < 18; k++) { const x = Math.round(h7(k, 1, 736) * 319), y = 158 + Math.round(h7(k, 2, 736) * 20); disco(x, y, 2, hex('#7a6a5a')); pset(x - 1, y - 1, hex('#a89a88')); }
  for (const [cx, cy, r] of [[34, 150, 24], [292, 152, 26], [156, 160, 12]]) { for (let k = 0; k < 60; k++) { const a = h7(k, 1, cx) * 6.28, d = Math.sqrt(h7(k, 2, cx)) * r; disco(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d * 0.7), 3, k % 3 ? hex('#2e6a2a') : hex('#3e8a34')); }
    for (let k = 0; k < Math.round(r / 2); k++) { const a = h7(k, 3, cx) * 6.28, d = Math.sqrt(h7(k, 4, cx)) * r * 0.85, x = Math.round(cx + Math.cos(a) * d), y = Math.round(cy - 4 + Math.sin(a) * d * 0.6);
      for (let i = 0; i < 6; i++) { const b = i * 1.047; linea(x, y, Math.round(x + Math.cos(b) * 4), Math.round(y + Math.sin(b) * 3), hex('#d8202a')); pset(Math.round(x + Math.cos(b) * 4), Math.round(y + Math.sin(b) * 3), hex('#a01020')); } pset(x, y, hex('#f0d040')); } }
};
const MEXICA = { ...EL.wampanoag, tocado: undefined, pal: { ...(EL.wampanoag.pal || {}), C: hex('#f2eee2'), c: hex('#c8c0b0') } };
const NINA = { ...EL.wampanoaga, pal: { ...(EL.wampanoaga.pal || {}), C: hex('#f2eee2'), c: hex('#c8c0b0') } };
const p3 = (t) => {
  fondo7('po-mexica', fondoMexica);
  d_nubes7(R, t, 70, [hex('#b8cce0'), hex('#e4eef6'), hex('#ffffff')], 5, 0.8, 2);
  d_aves7(R, t, 4, 30, hex('#2a3a5a'), 12, 3);
  d_humo7(R, 76, 38, t, hex('#e8ecf0'), hex('#b8c0cc'), 7, 1.2);
  // la canoa que pasa por el canal con su remero
  { const x = Math.round(((t - P3) * 16 + 20) % 380) - 40, y = 136; R.rect(x - 12, y - 2, x + 12, y, hex('#5a3a1e')); R.rect(x - 10, y - 3, x + 10, y - 3, hex('#7a5230')); R.pset(x - 13, y - 3, hex('#5a3a1e')); R.pset(x + 13, y - 3, hex('#5a3a1e'));
    for (let k = 0; k < 3; k++) { const fx = x - 6 + k * 5; R.rect(fx, y - 7, fx + 2, y - 4, hex('#c8a040')); R.pset(fx + 1, y - 8, hex('#d8202a')); }
    R.rect(x + 7, y - 11, x + 9, y - 4, hex('#f2eee2')); R.rect(x + 7, y - 13, x + 9, y - 12, hex('#a8703c')); R.pset(x + 8, y - 14, T.C.k); const p = Math.sin(t * 2) * 3; R.linea(x + 10, y - 12, Math.round(x + 4 + p), y + 3, hex('#6a4a2a')); }
  // el jardinero llega, corta la flor roja, la levanta y se la da a la niña
  const j = ruta7(t, [[P3, 340, 172], [CALLED - 0.1, 218, 172], [ENGLISH, 218, 172], [POINSETTIA - 0.1, 196, 172]]);
  const corta = t > CALLED, levanta = t > CUETLA && t < ENGLISH, da = t > POINSETTIA - 0.1;
  const nj = ruta7(t, [[ENGLISH - 0.9, -20, 174], [POINSETTIA - 0.2, 170, 174]]), tieneNina = t > POINSETTIA + 0.1;
  const aj = R.actor(MEXICA, j.x, j.s, t, { dir: -1, anda: j.mv, sostiene: corta && !tieneNina ? (levanta ? [j.x - 4, j.s - 30] : [j.x - 6, j.s - 16]) : undefined, sonrisa: corta });
  const flor = (x, y) => { for (let i = 0; i < 6; i++) { const b = i * 1.047 + 0.3; R.linea(x, y, Math.round(x + Math.cos(b) * 4), Math.round(y + Math.sin(b) * 4), hex('#e0202a')); R.pset(Math.round(x + Math.cos(b) * 4), Math.round(y + Math.sin(b) * 4), hex('#a01020')); } R.pset(x, y, hex('#f0d040')); R.pset(x + 1, y, hex('#f0d040')); R.linea(x, y + 2, x, y + 6, hex('#2e6a2a')); };
  if (corta && !tieneNina) flor(aj.mano[0], aj.mano[1] - 3);
  if (t > ENGLISH - 0.9) { const an = R.actor(NINA, nj.x, nj.s, t, { dir: 1, anda: nj.mv, sostiene: tieneNina ? [nj.x + 15, nj.s - 16] : undefined, sonrisa: true }); if (tieneNina) flor(an.mano[0], an.mano[1] - 3); }
  if (levanta) chispas7(aj.mano[0], aj.mano[1] - 4, t, CUETLA, ENGLISH, hex('#fff6c0'));
  // el colibrí que liba en las flores de la derecha
  { const x = Math.round(282 + Math.sin(t * 1.3) * 14), y = Math.round(136 + Math.sin(t * 2.1) * 6), a = Math.sin(t * 40) > 0; R.rect(x, y, x + 3, y + 1, hex('#2a8a5a')); R.pset(x + 4, y, hex('#2a2a2a')); R.pset(x + 5, y, hex('#2a2a2a')); R.pset(x + 1, y + (a ? -2 : 2), hex('#6ab08a')); R.pset(x + 2, y + (a ? -1 : 1), hex('#6ab08a')); R.pset(x - 1, y + 1, hex('#c8302a')); }
};

// 4 · fondo local: el muelle de Veracruz al atardecer de 1828; Joel Poinsett, de levita, llega con su maceta, un marinero
//     baja la plancha, se la lleva al barco de la bandera americana y el barco suelta amarras
const fondoPuerto = () => {
  const { rect, pset, linea, poligono, disco } = R;
  d_degradado7(R, 0, 96, [[0, hex('#3a2e6a')], [0.35, hex('#7a4a8a')], [0.62, hex('#d8708a')], [0.85, hex('#f4a868')], [1, hex('#ffd890')]]);
  disco(58, 90, 13, hex('#ffe8a0')); disco(58, 90, 10, hex('#fff6d0'));
  // el mar con el camino del sol
  for (let y = 96; y <= 150; y++) for (let x = 0; x < 320; x++) { const o = Math.sin(x * 0.25 + y * 1.3) + Math.sin(x * 0.07 - y * 0.6), sol = Math.abs(x - 58) < 6 + (y - 96) * 0.5 && o > 0.4;
    pset(x, y, sol ? hex('#ffe0a0') : o > 1.2 ? hex('#c88aa8') : o > 0.3 ? hex('#5a6aa8') : y < 112 ? hex('#4a5a98') : hex('#3a4a88')); }
  // San Juan de Ulúa en su islote: murallas bajas, el baluarte y la torre del faro
  rect(98, 86, 168, 96, hex('#5a4a5a')); rect(98, 86, 168, 86, hex('#8a6a7a')); for (let x = 100; x < 168; x += 4) rect(x, 84, x + 1, 85, hex('#5a4a5a')); rect(112, 74, 120, 86, hex('#4a3a4a')); rect(113, 72, 119, 73, hex('#4a3a4a')); pset(116, 71, hex('#ffe080'));
  for (let x = 96; x < 172; x++) pset(x, 97, hex('#2a2a5a'));
  // el muelle de tablas (primer término) con su canto y los pilotes
  d_tablas7(R, 0, 152, 319, 179, hex('#8a6a4a'), hex('#5a4228'), hex('#b08a5e'), 5, true, 12);
  rect(0, 150, 319, 152, hex('#4a3420')); rect(0, 150, 319, 150, hex('#c8a070'));
  for (let x = 6; x < 320; x += 30) rect(x, 152, x + 1, 179, hex('#3a2818'));
};
const muellePuerto = () => {
  // carga en el muelle: cajas, barriles, sacos, rollo de cabo, bolardos, un farol (capa transparente)
  const { rect, pset, disco } = R;
  const caja = (x, y, w, hh) => { rect(x, y - hh, x + w, y, T.C.k); rect(x + 1, y - hh + 1, x + w - 1, y - 1, hex('#b08850')); rect(x + 1, y - hh + 1, x + w - 1, y - hh + 1, hex('#d0a868')); R.linea(x + 1, y - hh + 1, x + w - 1, y - 1, hex('#7a5a30')); rect(x + 1, y - Math.round(hh / 2), x + w - 1, y - Math.round(hh / 2), hex('#7a5a30')); };
  const barril = (x, y) => { rect(x, y - 12, x + 9, y, T.C.k); rect(x + 1, y - 11, x + 8, y - 1, hex('#8a5a30')); rect(x + 2, y - 11, x + 3, y - 1, hex('#b07a44')); for (const yy of [y - 9, y - 3]) rect(x + 1, yy, x + 8, yy, hex('#4a4a4a')); };
  caja(8, 168, 18, 14); caja(12, 154, 12, 10); barril(28, 168); barril(38, 170); caja(270, 172, 20, 15); caja(292, 172, 16, 12); barril(296, 160);
  for (const x of [120, 250]) { rect(x, 156, x + 5, 164, T.C.k); rect(x + 1, 157, x + 4, 163, hex('#4a4a52')); rect(x + 1, 157, x + 4, 157, hex('#7a7a84')); }
  for (let k = 0; k < 3; k++) { R.anillo(60, 172, 6 - k * 2, hex('#c8a870')); } disco(60, 172, 1, hex('#8a6a4a'));
  for (let k = 0; k < 3; k++) { const x = 78 + k * 8; rect(x, 166, x + 7, 173, T.C.k); rect(x + 1, 167, x + 6, 172, hex('#d8c8a0')); pset(x + 3, 166, hex('#8a6a4a')); }
};
const p4 = (t) => {
  fondo7('po-puerto', fondoPuerto);
  d_nubes7(R, t, 80, [hex('#a85a7a'), hex('#e88a8a'), hex('#ffc8a0')], 4, 0.6, 9);
  d_aves7(R, t, 5, 40, hex('#3a2a4a'), 14, 4);
  // el barco: suelta amarras y se aleja cuando lo dice la voz; con la bandera americana de 1828
  const zarpa = tramo(t, HOME + 0.6, E.duracion + 3), bx = Math.round(206 + zarpa * 70);
  R.barco(bx, 148, t, { tipo: 'guerra', esc: 1, dir: 1, bandera: null, cabeceo: 0.6 });
  { const fx = bx - 26, fy = 64, o = (k) => Math.round(Math.sin(t * 6 - k * 0.6) * 1); R.rect(fx, fy - 1, fx, fy + 12, T.C.k);
    for (let i = 0; i < 12; i++) for (let jj = 0; jj < 8; jj++) R.pset(fx + 1 + i, fy + jj + o(i), i < 5 && jj < 4 ? (((i + jj) % 2) ? hex('#f2f2f2') : hex('#2a3a8a')) : jj % 2 ? hex('#f2f2f2') : hex('#c8202a')); }
  // la plancha del barco al muelle (la quitan antes de zarpar)
  const plancha = t < HOME + 0.5;
  if (plancha) { R.linea(bx + 8, 136, 236, 156, T.C.k); R.linea(bx + 8, 137, 236, 157, hex('#a87a4a')); R.linea(bx + 8, 138, 236, 158, T.C.k); }
  // las amarras del barco a los bolardos (se sueltan al zarpar)
  if (zarpa === 0) { R.linea(bx - 40, 132, 122, 157, hex('#6a4a2a')); R.linea(bx + 40, 134, 252, 157, hex('#6a4a2a')); }
  d_pegar7(R, d_capa7(R, 'po-muelle', muellePuerto, true), 140, 179);
  // un pelícano en el bolardo y un gato que se lava encima de las cajas
  { const b = Math.sin(t * 1.7) > 0.6 ? 1 : 0; R.rect(252, 149 - b, 257, 155, hex('#d8d0c0')); R.rect(253, 146 - b, 256, 149 - b, hex('#e8e0d0')); R.rect(257, 147 - b, 263, 148 - b, hex('#e8a040')); R.pset(255, 147 - b, T.C.k); R.rect(251, 151, 253, 154, hex('#8a8070')); }
  // el estibador que rueda un barril por el muelle
  { const x = Math.round(lerp(330, 150, tramo(t, P4, E.duracion))); R.actor(EL.estibador ?? EL.marinero83, x, 176, t, { dir: -1, anda: x > 150, sostiene: [x - 2, 168] }); const r = Math.floor(t * 8) % 2; R.rect(x - 13, 164, x - 4, 175, T.C.k); R.rect(x - 12, 165, x - 5, 174, hex('#8a5a30')); R.rect(x - 12, 166 + r * 3, x - 5, 166 + r * 3, hex('#4a4a4a')); R.rect(x - 12, 171 - r * 3, x - 5, 171 - r * 3, hex('#4a4a4a')); }
  // el marinero: baja por la plancha, recoge la maceta y sube con ella
  const mk = ruta7(t, [[ENVOY - 0.5, 214, 138], [MEXICO + 0.2, 236, 158], [SENT - 0.3, 196, 170], [SENT + 0.2, 196, 170], [HOME + 0.1, 236, 158], [HOME + 0.5, 214, 138]]);
  const conMaceta = t > SENT;
  if (t > ENVOY - 0.5 && t < HOME + 0.55) { const am = R.actor(EL.marinero83, mk.x, mk.s, t, { dir: mk.d || -1, anda: mk.mv, sostiene: conMaceta ? [mk.x + (mk.d < 0 ? 0 : 14), mk.s - 14] : undefined, sonrisa: true }); if (conMaceta) PZ.flor(R, am.mano[0], am.mano[1] + 6, {}); }
  // Joel Poinsett, de levita: llega con su maceta, la entrega y despide al barco
  const p = ruta7(t, [[P4, -20, 172], [ENVOY - 0.2, 174, 172]]);
  if (!conMaceta) R.actor(EL.poinsettMaceta, p.x, p.s, t, { dir: 1, anda: p.mv, sonrisa: true });
  else R.actor(EL.poinsett, p.x, p.s, t, { dir: 1, dedo: t > Y1828 - 0.1 && t < Y1828 + 1.4, brazos: t > Y1828 + 1.4, sonrisa: true });
  cifra7('1828', 64, 44, t, Y1828, E.duracion);
};
const efectos = [[DIC16, 'campana'], [NINE, 'brillo'], [SEARCH, 'toc'], [SHELTER + 0.35, 'puerta'], [FLOWER, 'brillo'], [CALLED, 'golpecito'], [POINSETTIA, 'brillo'], [JOEL, 'ola'], [SENT, 'golpecito'], [Y1828, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P3 ? 2026 : t < P4 ? 1500 : 1828) });
'''))
