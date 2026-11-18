"""Borrador de escenas del ep39 (grupo S3): rk-virginia, rk-senal y rk-armada, ya con el movimiento.
El kit local (KIT) es una copia del de escenas2.py (grupo S2), para que los fondos locales casen.
Los instantes se escriben como @marca:segundos@ (segundos desde el principio de la escena, sacados de linea.json) y se
convierten aquí en en('marca', fracción) con las marcas reales de marcas-ep39.json."""
import json, os, re

_RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
_MARCAS = json.load(open(os.path.join(_RAIZ, 'atomo/plato/escenas/marcas-ep39.json')))


def _en(id_, cuerpo):
    m = _MARCAS[id_]['marcas']

    def sub(mo):
        k, s = mo.group(1), float(mo.group(2))
        a, b = m[k], m[k + '_fin']
        return f"en('{k}', {(s - a) / (b - a):.4f})"
    return re.sub(r'@(\w+):([\d.]+)@', sub, cuerpo)


# ── el kit local (cielo tramado, nubes de tres tonos, agua, pinos, robles, casas de esteras, casitas inglesas, fuego,
# barquitos, gallinas, figuritas): lo usan los fondos locales de las dos escenas ─────────────────────────────────────
KIT = r'''
import { tone } from '/atomo/plato/kits/pixel-retro.js';
const C = T.C, W = 320, ri = Math.round;
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const lin = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const parpadeo = (t, v = 7) => Math.sin(t * v) > 0;
// capa fija en un búfer (se pinta una vez) y su copia con transparencia (0 = hueco)
const capas = {};
const capa = (k, dib) => { if (!capas[k]) { const b = R.nuevo(), prev = R.usar(b); dib(); R.usar(prev); capas[k] = b; } return capas[k]; };
const pon = (b, y0 = 0, y1 = 179) => { const B = R.buf; for (let i = y0 * W, n = (y1 + 1) * W; i < n; i++) if (b[i]) B[i] = b[i]; };
// la zona de Atom y la barra del año quedan tranquilas: lo que se mueve no entra ahí
const tranquilo = (x, y) => (x >= 272 && y <= 48) || (x >= 16 && x <= 176 && y <= 21);
const ps = (x, y, c) => { if (!tranquilo(x, y)) R.pset(ri(x), ri(y), c); };
const mezcla = (a, b, u) => { const ch = (s) => ri(((a >> s) & 255) * (1 - u) + ((b >> s) & 255) * u); return (0xff000000 | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };
// solo donde hay cielo o mar (azulado): lo de lejos que pasa por detrás de los barcos del decorado
const azul = (x, y) => { const p = R.pget(x, y), r = p & 255, g = (p >> 8) & 255, b = (p >> 16) & 255; return b > r + 18 && b >= g - 30; };
const psAzul = (x, y, c) => { x = ri(x); y = ri(y); if (azul(x, y) && !tranquilo(x, y)) R.pset(x, y, c); };

// cielo tramado de ramp (arriba → horizonte) hasta y1, con un velo de cirros
const cieloL = (ramp, y1) => {
  for (let y = 0; y <= y1; y++) for (let x = 0; x < W; x++) {
    let v = (ramp.length - 1) * Math.pow(y / y1, 0.85);
    const ci = Math.sin(x * 0.045 + y * 0.6) * Math.sin(x * 0.013 - y * 0.21);
    if (y > 24 && y < y1 - 8 && !tranquilo(x, y) && ci > 0.55) v += 0.6;
    R.pset(x, y, tone(ramp, Math.min(ramp.length - 1, v), x, y));
  }
};
const sol = (x, y, r, c0, c1) => { for (let k = 3; k >= 1; k--) for (let j = -r - 4 * k; j <= r + 4 * k; j++) for (let i = -r - 4 * k; i <= r + 4 * k; i++) { const d = Math.hypot(i, j); if (d < r + 3 * k && (i + j + k) % (k + 1) === 0) ps(x + i, y + j, c1); } R.disco(x, y, r, c0); R.disco(x - 1, y - 1, r - 2, mezcla(c0, 0xffffffff, 0.5)); };
// nube de tres tonos (sombra, cuerpo y luz) con la base plana
const NB = [[0, 0, 0.34], [-0.36, 0.08, 0.24], [0.34, 0.07, 0.26], [-0.12, -0.14, 0.27], [0.16, -0.1, 0.22], [0.58, 0.16, 0.14], [-0.58, 0.16, 0.15]];
const nubeL = (cx, cy, w, cols) => {
  const capaN = (k, dy0, enc) => { for (const [dx, dy, r] of NB) { const rr = w * r * enc, X = cx + dx * w - (k === 2 ? 1.5 : 0), Y = cy + dy * w + dy0; for (let y = Math.floor(Y - rr); y <= Y + rr; y++) for (let x = Math.floor(X - rr * 1.2); x <= X + rr * 1.2; x++) { if (((x - X) / (rr * 1.2)) ** 2 + ((y - Y) / rr) ** 2 > 1) continue; if (k > 0 && y > cy + w * 0.17) continue; ps(x, y, cols[k]); } } };
  capaN(0, 1.6, 1); capaN(1, 0, 1); capaN(2, -1.4, 0.7);
  for (let x = Math.round(cx - w * 0.72); x <= cx + w * 0.72; x++) if ((x + ri(cy)) % 3) ps(x, ri(cy + w * 0.22), cols[0]);
};
const nubes = (t, lista, cols) => { for (const [x0, y, w, v] of lista) nubeL(x0 + t * v, y, w, cols); };
// agua: el degradado y las vetas van en la capa; los brillos que corren, cada fotograma
const aguaL = (y0, y1, ramp) => { for (let y = y0; y <= y1; y++) for (let x = 0; x < W; x++) { let v = (ramp.length - 1) * (y - y0) / Math.max(1, y1 - y0); if (Math.sin(x * 0.09 + y * 1.7 + Math.sin(y * 0.5) * 3) > 0.86) v -= 0.8; R.pset(x, y, tone(ramp, Math.max(0, v), x, y)); } };
const brillos = (t, y0, y1, n, col, v = 6, x0 = 0, x1 = 319) => { for (let k = 0; k < n; k++) { const y = ri(y0 + h(k, 3) * (y1 - y0)), L = 1 + ri(h(k, 4) * 3 * (0.4 + (y - y0) / (y1 - y0 + 1))), x = x0 + ((h(k, 1) * (x1 - x0) + t * v * (0.5 + h(k, 2))) % (x1 - x0)); if (Math.sin(t * (2 + h(k, 5) * 3) + k) < -0.2) continue; for (let i = 0; i < L; i++) ps(x + i, y, col); } };
// pino de pisos (sombra a la izquierda, luz a la derecha) y roble de copa redonda con musgo
const pino = (x, base, alto, cols = [C.pinoS, C.pino, hex('#4a7a50')]) => {
  R.rect(x - 1, ri(base - alto * 0.35), x + 1, base, C.troncoS); R.pset(x + 1, ri(base - alto * 0.2), C.tronco);
  const n = Math.max(3, Math.floor(alto / 7)), paso = alto * 0.78 / n;
  for (let i = 0; i < n; i++) { const yb = base - alto * 0.22 - i * paso, top = yb - paso * 1.5, w = (n - i) / n * alto * 0.3 + 2; for (let y = ri(top); y <= ri(yb); y++) { const half = w * (y - top) / (yb - top); for (let xx = ri(x - half); xx <= ri(x + half); xx++) { const u = (xx - x) / (half + 0.01); let c = u < -0.35 ? cols[0] : u > 0.4 ? cols[2] : cols[1]; if (h(xx, y, 7) > 0.82) c = cols[0]; if (y === ri(yb) && (xx + i) % 2) c = cols[0]; R.pset(xx, y, c); } } }
  R.pset(x, ri(base - alto), cols[1]);
};
const roble = (x, base, r, cols = [hex('#3a5a2a'), hex('#5a7a34'), hex('#7a9a44')]) => {
  R.rect(x - 2, base - r, x + 2, base, C.troncoS); R.rect(x - 1, base - r, x, base, C.tronco); R.linea(x, base - r, x - r * 0.6, base - r * 1.4, C.troncoS); R.linea(x, base - r, x + r * 0.5, base - r * 1.5, C.troncoS);
  const B = [[0, -1.5, 0.75], [-0.7, -1.2, 0.55], [0.7, -1.25, 0.6], [-0.3, -2.0, 0.55], [0.35, -1.95, 0.5]];
  for (const [k, dx0, dy0, e] of [[0, 1, 1, 1], [1, 0, 0, 0.92], [2, 1.2, -1.2, 0.55]]) for (const [dx, dy, rr] of B) { const X = x + dx * r + dx0, Y = base + dy * r + dy0, R0 = rr * r * e; for (let y = ri(Y - R0); y <= Y + R0; y++) for (let xx = ri(X - R0); xx <= X + R0; xx++) { if (Math.hypot(xx - X, y - Y) > R0 + (h(xx, y) - 0.5) * 2) continue; R.pset(xx, y, h(xx, y, 3) > 0.9 ? cols[0] : cols[k]); } }
  for (let k = 0; k < 4; k++) { const mx = ri(x - r * 0.6 + k * r * 0.4), my = ri(base - r * 0.95); for (let j = 0; j < 3 + k % 2; j++) R.pset(mx + (j % 2), my + j, C.musgo); }
};
// textura de suelo: base con motas de dos tonos y piedrecitas
const textura = (x0, y0, x1, y1, base, cols, dens = 0.22) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const q = h(x, y, 11); R.pset(x, y, q < dens ? cols[0] : q > 1 - dens * 0.6 ? cols[1] : base); } };
// prado o arena con manchas suaves, briznas, matojos, flores y piedras (cols: oscuro, base, claro)
const prado = (x0, y0, x1, y1, cols, o = {}) => {
  const s = o.sem ?? 1;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const big = Math.sin(x * 0.061 + s) * Math.sin(y * 0.17 + x * 0.023 + s * 2) + Math.sin(x * 0.17 - y * 0.05 + s) * 0.3, q = h(x, y, s + 1), v = big + (q - 0.5) * 0.7;
    let c = v > 0.42 ? cols[2] : v < -0.42 ? cols[0] : cols[1];
    if (h(x, y >> 1, s + 2) > 0.94) c = cols[0]; else if (q < 0.04) c = cols[2];
    R.pset(x, y, c);
  }
  for (let k = 0; k < (o.matas ?? 30); k++) { const x = ri(x0 + h(k, 1, s) * (x1 - x0)), y = ri(y0 + 5 + h(k, 2, s) * (y1 - y0 - 5)), a = 3 + ri(h(k, 3, s) * 4 * (0.5 + (y - y0) / (y1 - y0 + 1))); for (let b = -3; b <= 3; b++) R.linea(x + b, y, x + ri(b * 1.5), y - a + Math.abs(b), b % 2 ? cols[0] : (o.brizna ?? cols[2])); }
  const fl = [hex('#f8f4e8'), hex('#f0d040'), hex('#e890b0'), hex('#a8b0f0')];
  for (let k = 0; k < (o.flores ?? 0); k++) { const x = ri(x0 + h(k, 4, s) * (x1 - x0)), y = ri(y0 + 3 + h(k, 5, s) * (y1 - y0 - 3)), c = fl[k % 4]; for (let j = 0; j < 4; j++) { const fx = x + ri((h(k, j + 6, s) - 0.5) * 8), fy = y + ri((h(k, j + 9, s) - 0.5) * 4); R.pset(fx, fy + 1, cols[0]); R.pset(fx, fy, c); } }
  for (let k = 0; k < (o.piedras ?? 0); k++) { const x = ri(x0 + h(k, 12, s) * (x1 - x0)), y = ri(y0 + 4 + h(k, 13, s) * (y1 - y0 - 4)), w = 2 + ri(h(k, 14, s) * 3); R.rect(x - w, y + 1, x + w, y + 1, mezcla(cols[0], C.k, 0.4)); R.rect(x - w + 1, y - 1, x + w - 1, y, hex('#8a8a84')); R.rect(x - w, y, x + w, y, hex('#9a9a92')); R.pset(x - w + 1, y - 1, hex('#c8c8be')); }
};
const mata = (x, y, t, col, alto = 5, col2) => { for (let k = -2; k <= 2; k++) { const sw = Math.sin(t * 2.2 + x * 0.3 + k) * (alto / 5); R.linea(x + k, y, ri(x + k * 1.6 + sw), y - alto + Math.abs(k), k % 2 ? (col2 ?? col) : col); } };
// la casa algonquina de las acuarelas de White: alargada, de esteras sobre arcos de varas, con las esteras de abajo
// recogidas (se ve el interior en sombra y los postes)
const casaEsteras = (x0, x1, base, alto) => {
  const r = Math.min(alto * 0.9, (x1 - x0) / 2), ext = hex('#5a4228'), osc = hex('#3a2a1a');
  for (let x = x0; x <= x1; x++) {
    const d = Math.min(x - x0, x1 - x), top = d < r ? base - alto + r - Math.sqrt(Math.max(0, r * r - (r - d) ** 2)) : base - alto;
    for (let y = ri(top); y <= base; y++) {
      const fila = Math.floor((y - top) / 4); let c = fila % 2 ? C.estera : C.esteraS;
      if ((y - ri(top)) % 4 === 0 || (x * 2 + fila * 5) % 9 === 0) c = mezcla(c, ext, 0.45);
      if (h(x, y, 2) > 0.93) c = mezcla(c, hex('#d8bc8a'), 0.6);
      if (y > base - 7) c = (x - x0) % 9 === 3 ? C.troncoS : y === base - 7 ? hex('#c8aa78') : osc;
      if (y === ri(top) || x === x0 || x === x1) c = ext;
      R.pset(x, y, c);
    }
  }
  for (let x = x0 + 5; x < x1 - 3; x += 7) R.linea(x, base - 8, x, ri(base - alto + 1), mezcla(C.esteraS, ext, 0.5));
  R.rect(x0, base + 1, x1, base + 1, mezcla(osc, C.arenaS, 0.5));
};
// la casita inglesa de 1587: tablas, techo de juncos (a: hueco [x0, y0, x1, y1] y cuánto se ha tapado, 0–1)
const casita = (x0, x1, base, altoP, altoT, o = {}) => {
  const yP = base - altoP, yR = yP - altoT;
  for (let x = x0; x <= x1; x++) for (let y = yP; y <= base; y++) { const tabla = Math.floor((x - x0) / 4); let c = tabla % 2 ? C.tronco : C.troncoL; if ((x - x0) % 4 === 0) c = C.troncoS; if (h(x, y, 5) > 0.9) c = C.troncoS; if (y === base) c = C.troncoS; R.pset(x, y, c); }
  for (let x = x0 + 2; x <= x1; x += 4) { R.pset(x, yP + 3, C.k); R.pset(x, base - 3, C.k); }
  if (o.puerta) { const [px, pw] = o.puerta; R.rect(px - 1, base - 16, px + pw + 1, base, C.k); for (let x = px; x <= px + pw; x++) for (let y = base - 15; y <= base; y++) R.pset(x, y, (x - px) % 3 === 0 ? C.cascoKS : C.cascoK); R.rect(px + 1, base - 12, px + pw - 1, base - 12, C.k); R.rect(px + 1, base - 5, px + pw - 1, base - 5, C.k); R.pset(px + pw - 1, base - 8, hex('#c8a040')); }
  if (o.ventana) { const [vx, vy] = o.ventana; R.rect(vx - 1, vy - 1, vx + 9, vy + 8, C.k); R.rect(vx, vy, vx + 8, vy + 7, hex('#2a2018')); R.rect(vx + 1, vy + 1, vx + 7, vy + 6, hex('#e8c060')); R.rect(vx + 4, vy, vx + 4, vy + 7, C.k); R.rect(vx, vy + 3, vx + 8, vy + 3, C.k); R.rect(vx + 10, vy - 1, vx + 15, vy + 8, C.k); R.rect(vx + 11, vy, vx + 14, vy + 7, C.troncoL); R.rect(vx + 11, vy + 3, vx + 14, vy + 3, C.troncoS); }
  // el techo de juncos: trapecio con hiladas, flecos en el alero y caballete
  for (let y = yR; y <= yP + 2; y++) { const f = (y - yR) / (altoT + 2), xa = ri(x0 + 8 - f * 14), xb = ri(x1 - 8 + f * 14); for (let x = xa; x <= xb; x++) { const fila = Math.floor((y - yR) / 3); let c = (x + fila * 2) % 5 === 0 || h(x, y, 9) > 0.8 ? C.juncoS : C.junco; if ((y - yR) % 3 === 2 && (x + fila) % 2) c = C.juncoS; if (h(x, y, 4) > 0.95) c = hex('#e0c880'); if (y >= yP + 1) c = (x % 2) ? C.juncoS : hex('#7a6230'); if (x === xa || x === xb) c = hex('#7a6230'); R.pset(x, y, c); } }
  R.rect(x0 + 6, yR - 2, x1 - 6, yR, hex('#7a6230')); for (let x = x0 + 6; x <= x1 - 6; x += 3) R.pset(x, yR - 2, C.junco);
  for (let x = x0 - 6; x <= x1 + 6; x++) if (h(x, 1) > 0.4) R.pset(x, yP + 3, hex('#5a4a20'));
  for (let x = x0; x <= x1; x++) R.pset(x, yP + 4, mezcla(C.troncoS, C.k, 0.4));
};
// el hueco del techo, con los pares a la vista, que se tapa con haces de juncos (u 0–1)
const hueco = (ax0, ay0, ax1, ay1, u) => {
  for (let y = ay0; y <= ay1; y++) for (let x = ax0; x <= ax1; x++) { const e = ((x - ax0) / (ax1 - ax0) - 0.5) ** 2 + ((y - ay0) / (ay1 - ay0) - 0.5) ** 2; if (e > 0.25) continue; R.pset(x, y, (x - ax0) % 6 < 2 ? C.troncoS : hex('#2a1e14')); }
  const n = 4; for (let k = 0; k < n; k++) { if (u < (k + 1) / n) break; const bx = ax0 + 1 + k * (ax1 - ax0) / n; for (let y = ay0 - 1; y <= ay1 + 1; y++) for (let x = ri(bx); x <= ri(bx + (ax1 - ax0) / n); x++) R.pset(x, y, (x + y) % 3 ? hex('#e0c470') : C.juncoS); R.rect(ri(bx), ri((ay0 + ay1) / 2), ri(bx + (ax1 - ax0) / n), ri((ay0 + ay1) / 2), C.juncoS); }
};
// fuego con troncos cruzados y el humo que sube y se va con el viento
const fuego = (x, y, t, alto = 7, humo = 30) => {
  R.linea(x - 5, y, x + 4, y - 2, C.troncoS); R.linea(x - 4, y - 2, x + 5, y, C.tronco); for (let k = -6; k <= 6; k += 3) R.pset(x + k, y + 1, hex('#8a8478'));
  for (let i = -3; i <= 3; i++) { const a = alto * (1 - Math.abs(i) / 4) * (0.7 + 0.3 * Math.sin(t * 11 + i * 1.7)); for (let j = 0; j < a; j++) R.pset(x + i, y - 2 - j, j > a * 0.7 ? hex('#f8e070') : j > a * 0.35 ? hex('#f0902a') : hex('#d03a1c')); }
  for (let k = 0; k < 6; k++) { const p = (t * 0.35 + k / 6) % 1, sx = x + p * 10 + Math.sin(p * 6 + k) * 2, sy = y - alto - 2 - p * humo, r = 1 + p * 3; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && (ri(sx + i) + ri(sy + j)) % (p > 0.6 ? 3 : 2) === 0) ps(sx + i, sy + j, p > 0.6 ? hex('#c8c4bc') : hex('#a8a29a')); }
};
// barquito lejano (canon: casco pardo, castillo de popa, tres palos, la cruz de San Jorge); velas 0 aferradas – 1 izadas
const nave = (x, y, t, o = {}) => {
  const d = o.dir ?? 1, s = o.s ?? 1, cb = Math.sin(t * 1.7 + x * 0.1) * 0.8, X = (i) => ri(x + d * i * s), Y = (j) => ri(y + j * s + cb), put = o.azul ? psAzul : ps;
  const casco = (i0, i1, j0, j1, c) => { for (let i = Math.min(i0, i1); i <= Math.max(i0, i1); i++) for (let j = j0; j <= j1; j++) put(X(i), Y(j), c); };
  casco(-12, 11, -3, 0, C.cascoK); casco(-9, 9, 1, 1, C.cascoKS); casco(-13, -8, -7, -4, C.cascoK); casco(7, 10, -5, -4, C.cascoK); casco(-12, 11, -2, -2, C.cascoKL); casco(-12, -9, -6, -6, C.sanJorge);
  for (const [i, alto] of [[-4, 20], [3, 23], [9, 14]]) { for (let j = -4; j > -4 - alto; j--) put(X(i), Y(j), C.cascoKS); const v = o.velas ?? 0; if (v > 0.05) { const vh = ri(alto * 0.55 * v); for (let j = 0; j < vh; j++) for (let k = -3; k <= 3; k++) put(X(i + k), Y(-alto + 1 + j), j === 0 ? C.lonaKS : C.lonaK); if (i === 3 && vh > 4) { for (let j = 1; j < vh; j++) put(X(i), Y(-alto + 1 + j), C.sanJorge); for (let k = -3; k <= 3; k++) put(X(i + k), Y(-alto + 1 + ri(vh / 2)), C.sanJorge); } } else for (let k = -3; k <= 3; k++) put(X(i + k), Y(-alto + 3), C.lonaKS); }
  const fl = Math.sin(t * 6 + x) > 0; put(X(3), Y(-28), C.lonaK); put(X(4), Y(-28 + (fl ? 1 : 0)), C.sanJorge); put(X(5), Y(-28), C.lonaK);
};
// bote de remos con figuritas (cascos que brillan o gorras), y carga
const bote = (x, y, t, o = {}) => {
  const n = o.n ?? 3, cb = Math.sin(t * 2.4 + x * 0.2) * 0.7, Y = (j) => ri(y + j + cb);
  for (let i = -8; i <= 8; i++) { ps(x + i, Y(0), C.cascoK); ps(x + i, Y(1), Math.abs(i) < 7 ? C.cascoKS : C.cascoK); }
  ps(x - 9, Y(-1), C.cascoK); ps(x + 9, Y(-1), C.cascoK); for (let i = -8; i <= 8; i++) ps(x + i, Y(-1), C.cascoKL);
  for (let k = 0; k < n; k++) { const fx = x - 5 + k * 4; ps(fx, Y(-2), o.ropa ?? hex('#8a2a2a')); ps(fx, Y(-3), o.ropa ?? hex('#8a2a2a')); ps(fx, Y(-4), hex('#f0c090')); ps(fx, Y(-5), o.casco ? (parpadeo(t + k, 3) ? C.hierroL : C.hierro) : hex('#3a2a20')); const r = Math.sin(t * 5 + k) > 0; ps(fx + (r ? 2 : 1), Y(-1), C.troncoL); ps(fx + (r ? 3 : 1), Y(r ? 0 : 1), C.troncoL); }
  if (o.carga) { ps(x + 6, Y(-2), C.tronco); ps(x + 7, Y(-2), C.troncoS); ps(x + 6, Y(-3), C.troncoL); ps(x + 7, Y(-3), C.tronco); }
  for (let i = 1; i < 6; i++) if ((ri(t * 8) + i) % 2) ps(x + (o.dir ?? -1) * -(9 + i * 2), Y(1), C.espuma);
};
// gallina blanca y parda que picotea o corre
const gallina = (x, y, d, t, o = {}) => {
  const P = (i, j, c) => R.pset(ri(x + d * i), ri(y + j), c), pic = o.picotea && Math.sin(t * 5 + x) > 0.3, cor = o.corre ? (Math.floor(t * 10) % 2) : 0, bl = o.color ?? hex('#f4eee2'), bs = hex('#c8bca8');
  for (let i = -3; i <= 2; i++) for (let j = -5; j <= -2; j++) P(i, j, j === -2 || i === -3 ? bs : bl);
  P(-4, -6, bs); P(-4, -7, bl); P(-5, -7, bs); P(-1, -4, bs); P(0, -3, bs);
  const hy = pic ? -3 : -7; P(3, hy, bl); P(3, hy + 1, bl); P(4, hy, bl); P(3, hy - 1, hex('#d83030')); P(4, hy - 1, hex('#d83030')); P(5, hy + 1, hex('#e8b030')); P(4, hy, C.k);
  P(-1, -1, hex('#e8b030')); P(1, -1, hex('#e8b030')); P(cor ? -2 : -1, 0, hex('#e8b030')); P(cor ? 2 : 1, 0, hex('#e8b030'));
  if (o.corre && Math.floor(t * 14) % 2) { P(-2, -6, bl); P(-1, -7, bl); }
};
// figurita lejana (8 px): cabeza, casco o gorra, ropa y piernas que andan
const figurita = (x, y, t, o = {}) => {
  const p = o.anda ? Math.floor(t * 6 + x * 0.3) % 2 : 0, ropa = o.ropa ?? hex('#8a2a2a');
  ps(x, y, C.k); ps(x + 2, y, C.k); ps(x, y - 1 + (p ? 1 : 0), hex('#4a3a2a')); ps(x + 2, y - 1 + (p ? 0 : 1), hex('#4a3a2a'));
  for (let j = 2; j <= 4; j++) for (let i = 0; i <= 2; i++) ps(x + i, y - j, ropa);
  ps(x + 1, y - 5, hex('#f0c090')); ps(x + 1, y - 6, hex('#f0c090')); ps(x, y - 6, hex('#f0c090')); ps(x + 2, y - 6, hex('#f0c090'));
  if (o.casco) { for (let i = -1; i <= 3; i++) ps(x + i, y - 7, i === 3 && o.brilla ? hex('#ffffff') : C.hierro); ps(x + 1, y - 8, o.brilla ? C.hierroL : C.hierro); }
  else ps(x + 1, y - 7, o.pelo ?? hex('#2a1a12'));
  if (o.lleva) { ps(x + 3, y - 4, o.lleva); ps(x + 3, y - 5, o.lleva); ps(x + 4, y - 5, o.lleva); }
};
// la acuarela de White: el pueblo de esteras, el maíz, el agua y la garza; se revela con el pincel (u 0–1)
const acuarela = (x0, y0, w, hh, u = 1, garza = 0) => {
  const lim = u * (w + hh * 0.6);
  for (let y = 0; y < hh; y++) for (let x = 0; x < w; x++) {
    const X = x0 + x, Y = y0 + y; if (x === 0 || y === 0 || x === w - 1 || y === hh - 1) { R.pset(X, Y, C.papelS); continue; }
    let c = C.papel; if (x + y * 0.6 < lim) {
      const f = y / hh;
      if (f < 0.4) c = (h(X, Y) > 0.7 ? mezcla(C.acuarela, C.papel, 0.55) : mezcla(C.acuarela, C.papel, 0.25));
      else if (f < 0.5) c = h(X, Y, 1) > 0.4 ? hex('#5a8a5a') : hex('#7aa06a');
      else if (f < 0.72) c = h(X, Y, 2) > 0.5 ? hex('#c8b47a') : hex('#d8c490');
      else c = (x + y) % 4 ? mezcla(C.acuarela, hex('#4a7a8a'), 0.4) : C.acuarela;
      const ar = (cx, r) => { const dx = x - cx, dy = y - hh * 0.62; return dy <= 0 && dx * dx / (r * r) + dy * dy / (r * r * 0.35) < 1; };
      if (ar(w * 0.3, w * 0.13) || ar(w * 0.62, w * 0.12)) c = (y % 2) ? C.esteraS : C.estera;
      if (Math.abs(x - w * 0.84) < 2 && y > hh * 0.3 && y < hh * 0.68 && (x + y) % 2) c = C.maizV;
      if (Math.abs(x - w * 0.88) < 1 && y > hh * 0.34 && y < hh * 0.66) c = C.maizV;
      if (garza > 0 && Math.abs(x - w * 0.48) < 4 && Math.abs(y - hh * 0.25) < 1.2 && x + y * 0.6 < lim) c = hex('#6a7480');
    }
    R.pset(X, Y, c);
  }
};
// la caja de pinturas de White (abierta: tapa levantada y las pastillas de color)
const cajaPinturas = (x, y, abre = 1) => {
  R.rect(x - 1, y - 6, x + 15, y, C.k); R.rect(x, y - 5, x + 14, y - 1, C.cascoK); R.rect(x, y - 1, x + 14, y - 1, C.cascoKS);
  if (abre > 0.5) { R.rect(x - 1, y - 16, x + 15, y - 6, C.k); R.rect(x, y - 15, x + 14, y - 7, C.cascoKL); R.rect(x + 1, y - 14, x + 13, y - 8, C.papel); const cols = ['#c8303a', '#3a6ac8', '#e8c040', '#3a8a4a', '#8a4a2a', '#2a2a3a']; cols.forEach((c, i) => { R.rect(x + 1 + i * 2 + (i > 2 ? 1 : 0), y - 5, x + 2 + i * 2 + (i > 2 ? 1 : 0), y - 4, hex(c)); }); }
  else { R.rect(x, y - 5, x + 14, y - 5, C.cascoKL); R.rect(x + 6, y - 4, x + 8, y - 3, hex('#c8a040')); }
};
'''

E = {}

# ── piezas comunes de las tres escenas ─────────────────────────────────────────────────────────────────────────────
PIEZAS3 = r'''
const ease = (u) => u * u * (3 - 2 * u);
// el barquito de los bocadillos y el bocadillo grande (pico −1: abajo a la izquierda; 1: a la derecha)
const barcoMini = (x, y, c = C.cascoK) => { R.rect(x - 6, y, x + 6, y + 2, C.k); R.rect(x - 5, y + 1, x + 5, y + 1, c); R.linea(x - 1, y - 1, x - 1, y - 9, C.k); R.linea(x + 3, y - 1, x + 3, y - 7, C.k); R.rect(x - 4, y - 8, x + 1, y - 3, C.lonaK); R.rect(x + 2, y - 6, x + 5, y - 3, C.lonaK); R.pset(x - 2, y - 6, C.sanJorge); R.pset(x - 1, y - 6, C.sanJorge); R.pset(x - 1, y - 7, C.sanJorge); R.pset(x - 1, y - 5, C.sanJorge); };
// el mismo barquito al doble (cada píxel, 2 × 2), para los bocadillos grandes
const barcoG = (x, y) => { const Q = (i, j, c) => R.rect(x + i * 2, y + j * 2, x + i * 2 + 1, y + j * 2 + 1, c);
  for (let i = -6; i <= 6; i++) { Q(i, 0, C.k); Q(i, 1, Math.abs(i) < 6 ? C.cascoK : C.k); } for (let i = -5; i <= 5; i++) Q(i, 2, C.k); Q(-7, -1, C.k); Q(7, -1, C.k); for (let i = -6; i <= 6; i++) Q(i, -1, C.cascoKL);
  for (let j = -9; j <= -2; j++) Q(0, j, C.k); for (let j = -8; j <= -3; j++) for (let i = -4; i <= 3; i++) if (i !== 0) Q(i, j, C.lonaK); Q(-1, -6, C.sanJorge); Q(1, -6, C.sanJorge); Q(0, -6, C.sanJorge); for (let j = -8; j <= -3; j++) Q(0, j, j === -6 ? C.sanJorge : C.lonaK); Q(0, -10, C.sanJorge); Q(1, -10, C.sanJorge); };
// un galeón de costado (x el centro, wl la flotación, s la escala, o.dir 1 la proa a la derecha); o.velas 0 aferradas – 1 llenas
const galeon = (x, wl, s, t, o = {}) => {
  const d = o.dir ?? 1, cb = Math.sin(t * 1.3 + x * 0.1) * 0.8, P = (i, j) => [ri(x + d * i * s), ri(wl + j * s + cb)];
  const pol = (pts, c) => R.poligono(pts.map(([i, j]) => P(i, j)), c), L = (i0, j0, i1, j1, c) => { const a = P(i0, j0), b = P(i1, j1); R.linea(a[0], a[1], b[0], b[1], c); };
  const v = o.velas ?? 0;
  L(34, -14, 50, -24, C.cascoKS); L(50, -24, 2, -50, hex('#8a7a5a')); L(-16, -40, -36, -16, hex('#8a7a5a'));
  for (const [i, alto] of [[-16, 30], [2, 40], [18, 28]]) {
    L(i, -12, i, -12 - alto, C.cascoKS); L(i + 0.6, -12, i + 0.6, -12 - alto, C.cascoK);
    const yv = -12 - alto + 5; L(i - 9, yv, i + 9, yv, C.cascoKS);
    if (v < 0.05) pol([[i - 8, yv + 1], [i + 8, yv + 1], [i + 8, yv + 2.5], [i - 8, yv + 2.5]], C.lonaKS);
    else { const hh = (alto - 12) * v; pol([[i - 8, yv + 1], [i + 8, yv + 1], [i + 9.5, yv + 1 + hh * 0.5], [i + 8, yv + 1 + hh], [i - 8, yv + 1 + hh], [i - 6.5, yv + 1 + hh * 0.5]], C.lonaK); L(i + 8, yv + 1, i + 9.5, yv + 1 + hh * 0.5, C.lonaKS);
      if (i === 2 && hh > 8) { pol([[i - 1, yv + 2], [i + 1, yv + 2], [i + 1, yv + hh], [i - 1, yv + hh]], C.sanJorge); pol([[i - 7, yv + hh * 0.42], [i + 8, yv + hh * 0.42], [i + 8, yv + hh * 0.42 + 2], [i - 7, yv + hh * 0.42 + 2]], C.sanJorge); } }
  }
  { const fl = Math.sin(t * 6 + x) > 0 ? 1 : 0, [fx, fy] = P(2, -52); R.rect(fx, fy - 3, fx + 6, fy + 1, hex('#f4f0e8')); R.rect(fx, fy - 1, fx + 6, fy - 1, C.sanJorge); R.rect(fx + 2, fy - 3, fx + 3, fy + 1, C.sanJorge); if (fl) R.pset(fx + 7, fy - 2, hex('#f4f0e8')); }
  pol([[-36, -24], [-22, -24], [-22, -14], [-36, -16]], C.k); pol([[-35, -23], [-23, -23], [-23, -14], [-35, -15]], C.cascoK); L(-35, -20, -23, -20, C.cascoKL); for (const i of [-32, -27]) { const [wx, wy] = P(i, -18); R.rect(wx, wy, wx + 1, wy + 1, hex('#e8c060')); }
  pol([[24, -20], [34, -20], [34, -14], [24, -14]], C.k); pol([[25, -19], [33, -19], [33, -14], [25, -14]], C.cascoK); L(25, -17, 33, -17, C.cascoKL);
  pol([[-36, -16], [-22, -14], [24, -14], [38, -18], [31, -3], [22, 2], [-26, 2], [-33, -5]], C.k);
  pol([[-35, -15], [-22, -13], [24, -13], [37, -17], [30, -3], [22, 1], [-25, 1], [-32, -5]], C.cascoK);
  L(-34, -10, 33, -11, C.cascoKL); L(-33, -6, 31, -7, C.cascoKS); L(-35, -15, 37, -17, hex('#c89a3a'));
  for (let i = -24; i <= 20; i += 8) { const [px, py] = P(i, -9); R.rect(px, py, px + 1, py + 1, C.k); }
  { const [lx, ly] = P(-35, -26); R.rect(lx - 1, ly - 3, lx + 1, ly, hex('#f8d870')); }
};
const globo = (x, y, w, hh, pico = -1) => { R.rect(x - w, y - hh, x + w, y + hh, C.k); R.rect(x - w + 1, y - hh + 1, x + w - 1, y + hh - 1, hex('#f8f4e8')); for (let i = 0; i < 4; i++) R.pset(x + pico * (w - 4 + i), y + hh + 1 + i, C.k); };
// un dibujo de letras (dir −1: volteado); pal: letra → color
const spr = (g, x, y, d, pal) => { const w = g[0].length; g.forEach((f, j) => [...f].forEach((ch, i) => { if (ch !== '.' && pal[ch] != null) R.pset(ri(d > 0 ? x + i : x + w - 1 - i), ri(y + j), pal[ch]); })); };
// la niña envuelta en su mantita (9 × 6), dormida; x, y: el centro
const BEBE = ['..kkkkk..', '.kRRRRRk.', 'kRSSSWWWk', 'kSkSSWWWk', '.kSSWWWk.', '..kkkkk..'];
const bebe = (x, y, d = 1) => spr(BEBE, x - 4, y - 3, d, { k: C.k, R: hex('#e8a0b0'), S: hex('#f6c8a0'), W: hex('#f2eee2') });
// el gato atigrado gris (13 × 11) sentado; d −1 mira a la izquierda; pata: la de delante estirada (0–1)
const GATO = ['.k...k.......', 'kMk.kMk......', 'kMMMMMk......', 'kMeMeMk......', 'kMMpMMk......', '.kMMMk....k..', '.kBMMMkkkkMk.', 'kBBMmMMmMk.k.', 'kBBMMmMMmMk..', 'kBMMmMMmMMk..', '.kkkkkkkkkk..'];
const PALG = { k: hex('#2a2630'), M: hex('#8a8a98'), m: hex('#5a5a68'), B: hex('#e8e4dc'), e: hex('#e8c040'), p: hex('#e89aa8') };
const gatoG = (x, suelo, d, t, o = {}) => {
  const y = suelo - 11, X = (i) => (d > 0 ? x + 12 - i : x + i);
  spr(GATO, x, y + (o.agacha ? 1 : 0), -d, PALG);
  // la cola que se mueve
  const c = Math.sin(t * 3) > 0 ? 0 : 1; R.pset(X(11), y + 4 + c, PALG.M); R.pset(X(12), y + 3 + c, PALG.M); R.pset(X(12), y + 2 + c, PALG.k);
  if ((t * 0.7 + x) % 3 < 0.12) { R.pset(X(2), y + 3, PALG.M); R.pset(X(4), y + 3, PALG.M); }   // parpadea
  const p = o.pata ?? 0; if (p > 0) { const L = ri(1 + p * 4); for (let i = 0; i <= L; i++) { R.pset(X(-i), y + 7, PALG.k); R.pset(X(-i), y + 8, PALG.M); R.pset(X(-i), y + 9, PALG.k); } R.pset(X(-L - 1), y + 8, PALG.k); R.pset(X(-L), y + 8, PALG.B); }
};
'''

E['rk-virginia'] = ('Virginia', '''// RK-VIRGINIA (frases 11–12), 1587, sin cartela. Seis planos, todos con acción y vida de fondo:
// 1. dentro de la casita de los Dare: Eleanor mece a la niña en brazos («gave birth to a baby girl»); White, detrás de
//    la mesa, escribe y sonríe; la cuna vacía empieza a mecerse sola («Eleanor Dare»): Eleanor se aparta («?») y se ve
//    que es el gato, que la empuja con la pata (gag, «miau»), y se ríe («a baby girl»);
// 2. el mapa de la costa: un barquito llega por la ruta de puntos, el guante de Atom clava la chincheta en Roanoke
//    («first») y sale el bocadillo con la cuna y el «1»; la chincheta late en «the Americas»;
// 3. (fondo local, inserto) el diario de White sobre la mesa: pasa la hoja («Her grandfather»), y la mano con la pluma
//    dibuja la carita de la niña y escribe «18» y «1587» («wrote it down in his journal»); una polilla ronda la vela;
// 4. el huerto seco: la colona saca del granero un saco casi vacío y lo sacude («things were tight»); el colono cava la
//    tierra seca y siembra tarde («too late to plant»); Wanchese mira desde el bosque, se cruza de enfado y se va
//    («didn't trust them»);
// 5. (fondo local) dentro del almacén: Ananias vuelca un saco vacío (caen tres granos y un ratón se lleva uno); por la
//    puerta caen las hojas y luego los primeros copos («the winter»); la colona destapa el barril y está casi vacío;
//    Ananias mira al mar y piensa en un barco («England for help»);
// 6. el fuerte de 1587: los colonos rodean a White y le piden que vaya («asked White to go»): él niega, triste
//    («himself»); Ananias levanta los brazos, todos le señalan («influence») y al final White asiente: bocadillo con un barco.''', KIT + PIEZAS3 + r'''
const P1 = 0, P2 = @virginia:5.66@, P3 = @virginia:10.38@, P4 = @justas:14.08@, P5 = @justas:19.32@, P6 = @justas:23.65@;

// ── 1 · la casita de los Dare: la niña y el gato que mece la cuna ───────────────────────────────────────────────
const p1 = (t) => {
  const nina = @virginia:4.66@, mece0 = @virginia:3.3@, mira = @virginia:3.8@;
  const mece = lin(t, mece0, mece0 + 0.3);
  const g = T.roanoke(R, t, { encuadre: 'fuerte', camara: 'casa', epoca: 1587, mece });
  // el gato, sentado junto a la cuna (dir 1, en x 183): Eleanor lo tapa hasta que se aparta
  const pata = t > mece0 ? 0.5 + 0.5 * Math.sin(t * 3.2) : 0;
  gatoG(176, 160, 1, t, { pata });
  // White, detrás de la mesa: escribe, levanta la vista y sonríe con la niña
  const escribe = t < nina - 0.8;
  R.actor(EL.whiteRK, 95, 152, t, { dir: 1, sostiene: escribe ? [104 + ri(Math.sin(t * 9) * 2), 143] : false, sonrisa: t > 2.2, habla: t > 3.1 && t < 4.0 && parpadeo(t), sorpresa: t > mira + 0.15 && t < mira + 0.6 });
  // Eleanor con la niña en brazos: la mece; al mecerse la cuna se aparta a la derecha, mira y se ríe
  const aparta = ease(lin(t, mira - 0.2, mira + 0.4)), ex = ri(lerp(176, 157, aparta));
  const e = R.actor(EL.eleanorRK, ex, 160, t, { dir: 1, anda: aparta > 0 && aparta < 1, sostiene: true, sonrisa: t < mira || t > mira + 0.7, sorpresa: t > mira && t < mira + 0.7 });
  bebe(e.mano[0] + 1, e.mano[1] - 1 + ri(Math.sin(t * 2.4)), 1);
  T.roanokeDelante(R, t, { encuadre: 'fuerte', camara: 'casa', epoca: 1587 });
  if (t > mira && t < mira + 0.8) R.bocadillo(e.cabeza[0], e.cabeza[1] - 4, { icono: '?' });
};

// ── 2 · el mapa: la primera niña inglesa nacida en América ──────────────────────────────────────────────────────
const GUANTE = '#5a8ad0';
const cunita = (x, y) => { R.rect(x - 6, y - 3, x + 6, y + 2, C.k); R.rect(x - 5, y - 2, x + 5, y + 1, hex('#b8402a')); R.rect(x - 5, y - 2, x - 2, y + 1, hex('#8a2a1c')); R.rect(x - 1, y - 2, x + 3, y - 1, hex('#f2eee2')); R.pset(x, y - 2, hex('#f6c8a0')); R.linea(x - 6, y + 3, x + 6, y + 3, C.k); R.pset(x - 7, y + 2, C.k); R.pset(x + 7, y + 2, C.k); };
const p2 = (t) => {
  const llega = @virginia:6.0@, clava = @virginia:7.68@, cuna = @virginia:8.3@, america = @virginia:9.4@;
  const P = T.mapa(R, t, { zoom: 6, centro: [-76.6, 36.0] });
  const [rx, ry] = P([-75.67, 35.9]);
  // la ruta de puntos desde Inglaterra (por la derecha) y el barquito que llega
  const u = ease(lin(t, P2, llega + 1.2));
  R.recorte([0, 0, 319, 179]);
  for (let k = 0; k <= 40; k++) { const f = k / 40; if (f > u) break; const x = lerp(330, rx + 6, f), y = lerp(ry - 30, ry, f) - Math.sin(f * Math.PI) * 18; if (k % 2 === 0) R.pset(ri(x), ri(y), hex('#5a2a1e')); }
  { const x = lerp(330, rx + 8, u), y = lerp(ry - 30, ry, u) - Math.sin(u * Math.PI) * 18 + Math.sin(t * 3); R.rect(ri(x) - 5, ri(y) - 1, ri(x) + 5, ri(y) + 1, C.k); R.rect(ri(x) - 4, ri(y), ri(x) + 4, ri(y), C.cascoK); R.linea(ri(x), ri(y) - 1, ri(x), ri(y) - 9, C.k); R.rect(ri(x) - 3, ri(y) - 8, ri(x) + 3, ri(y) - 3, C.k); R.rect(ri(x) - 2, ri(y) - 7, ri(x) + 2, ri(y) - 4, C.lonaK); R.pset(ri(x), ri(y) - 6, C.sanJorge); R.pset(ri(x), ri(y) - 5, C.sanJorge); R.pset(ri(x) - 1, ri(y) - 6, C.sanJorge); R.pset(ri(x) + 1, ri(y) - 6, C.sanJorge); }
  // el guante de Atom baja con la chincheta y la clava en Roanoke
  const baja = ease(lin(t, clava - 0.5, clava)), sube = ease(lin(t, clava + 0.3, clava + 0.8));
  T.chincheta(R, rx, ry, t, hex('#c8302a'), { baja: t < clava - 0.5 ? 0 : baja, pulso: t > america });
  if (t > clava - 0.6 && sube < 1) T.mano(R, rx + 6 + ri(sube * 30), ry - 10 - ri((1 - baja) * 26) - ri(sube * 50), -1, GUANTE, { sinManga: true });
  // el bocadillo con la cuna y el «1»: la primera
  if (t > cuna) { const s = lin(t, cuna, cuna + 0.2), bx = rx - 52, by = ry - 40, hh = ri(16 * s);
    globo(bx, by, ri(30 * s), hh, 1);
    if (s >= 1) {       R.rect(bx - 22, by + 1, bx + 4, by + 9, C.k); R.rect(bx - 21, by + 2, bx + 3, by + 8, hex('#b8402a')); R.rect(bx - 21, by + 2, bx - 15, by + 8, hex('#8a2a1c')); R.rect(bx - 14, by + 2, bx + 1, by + 4, hex('#f2eee2')); R.rect(bx - 11, by + 1, bx - 8, by + 3, hex('#f6c8a0')); R.pset(bx - 10, by + 2, C.k);
      R.linea(bx - 22, by + 11, bx + 4, by + 11, C.k); R.linea(bx - 22, by + 10, bx - 18, by + 12, C.k); R.linea(bx + 4, by + 10, bx, by + 12, C.k);
      R.numero('1', bx + 17, by + 10, { tam: 16, centro: true }); }
  }
  R.recorte(null);
};

// ── 3 · el diario del gobernador ────────────────────────────────────────────────────────────────────────────────
const MESA3 = () => {
  // la pared de entramado y barro al fondo, con la viga y un estante
  for (let y = 0; y < 72; y++) for (let x = 0; x < W; x++) { const q = h(x, y, 31); let c = q < 0.18 ? hex('#8a7458') : q > 0.9 ? hex('#c8b08a') : hex('#a88e6a'); if (Math.sin(x * 0.07 + y * 0.11) * Math.sin(y * 0.05 - x * 0.02) > 0.55) c = hex('#b89c76'); R.pset(x, y, c); }
  for (const vx of [36, 150, 262]) { R.rect(vx, 0, vx + 9, 71, hex('#4a3020')); R.rect(vx + 1, 0, vx + 2, 71, hex('#6a4a30')); for (let y = 3; y < 70; y += 7) R.pset(vx + 5 + (y % 3), y, hex('#3a2418')); }
  R.rect(0, 22, 35, 27, hex('#4a3020')); R.rect(46, 30, 149, 34, hex('#4a3020')); R.rect(46, 30, 149, 30, hex('#6a4a30'));
  // en el estante: tarros, un libro, un cuenco
  [[56, '#7a8a6a'], [66, '#a86a3a'], [76, '#c8b890']].forEach(([x, c]) => { R.rect(x, 20, x + 6, 29, C.k); R.rect(x + 1, 21, x + 5, 29, hex(c)); R.rect(x + 1, 21, x + 2, 28, mezcla(hex(c), 0xffffffff, 0.3)); R.rect(x, 19, x + 6, 20, hex('#6a5a4a')); });
  R.rect(92, 16, 100, 29, C.k); R.rect(93, 17, 99, 29, hex('#6a2a2a')); R.rect(101, 18, 108, 29, C.k); R.rect(102, 19, 107, 29, hex('#3a4a6a')); R.rect(118, 24, 136, 29, C.k); R.rect(119, 25, 135, 28, hex('#8a8a84'));
  // hierbas colgadas de la viga de la derecha
  for (let k = 0; k < 4; k++) { const x = 180 + k * 14; R.linea(x, 0, x, 8, hex('#6a5a3a')); for (let j = 0; j < 9; j++) R.pset(x - 2 + (j % 5), 9 + j, j % 2 ? hex('#5a7a3a') : hex('#7a9a4a')); }
  // la capa y el sombrero de White en las perchas, un farol colgado y una ventanita con el bosque
  R.rect(196, 34, 199, 37, hex('#3a2418')); R.poligono([[190, 37], [206, 37], [210, 68], [186, 68]], C.k); R.poligono([[191, 38], [205, 38], [208, 67], [188, 67]], hex('#2a2a36')); R.linea(198, 39, 197, 66, hex('#3a3a48')); R.linea(203, 40, 206, 66, hex('#1a1a24'));
  R.rect(226, 40, 229, 43, hex('#3a2418')); R.rect(220, 44, 236, 46, C.k); R.rect(222, 36, 234, 44, C.k); R.rect(223, 37, 233, 44, hex('#2a2430')); R.rect(220, 45, 236, 45, hex('#3a3440'));
  R.linea(120, 22, 120, 38, hex('#3a2418')); R.rect(117, 21, 123, 22, hex('#3a2418')); R.rect(115, 38, 125, 54, C.k); R.rect(116, 40, 124, 52, hex('#f8d870')); R.rect(119, 40, 121, 52, hex('#fff4c0')); R.rect(114, 38, 126, 39, hex('#4a4a52')); R.rect(114, 53, 126, 54, hex('#4a4a52'));
  for (let y = 40; y < 60; y++) for (let x = 104; x < 136; x++) if (((x - 120) ** 2 + (y - 46) ** 2) < 180 && (x + y) % 3 === 0) R.pset(x, y, mezcla(R.pget(x, y), hex('#ffe8a0'), 0.25));
  R.rect(56, 40, 92, 66, hex('#2a1a10')); R.rect(58, 42, 90, 64, hex('#4a6a7a'));
  for (let x = 58; x <= 90; x++) for (let y = 50 + ri(Math.sin(x * 0.5) * 2); y <= 64; y++) R.pset(x, y, h(x, y, 37) > 0.4 ? hex('#2a4a32') : hex('#3a5a3a'));
  R.rect(73, 42, 74, 64, hex('#2a1a10')); R.rect(58, 52, 90, 53, hex('#2a1a10')); R.rect(54, 66, 94, 68, hex('#6a4a30'));
  // la mesa de tablas, de cerca
  for (let y = 72; y < 180; y++) for (let x = 0; x < W; x++) { const tabla = Math.floor((y - 72) / 18), vet = Math.sin(x * 0.08 + tabla * 3 + Math.sin(x * 0.02 + tabla) * 2) * Math.sin(y * 0.9); let c = tabla % 2 ? hex('#8a5a34') : hex('#94643a'); if (vet > 0.7) c = hex('#6e4426'); if (h(x, y, 33) > 0.97) c = hex('#a87448'); if ((y - 72) % 18 === 0) c = hex('#3a2416'); if ((y - 72) % 18 === 1) c = hex('#b07a4a'); R.pset(x, y, c); }
  for (let y = 72; y < 180; y++) R.pset(ri(160 + (y - 72) * 0.1), y, hex('#5a3a22'));
  R.rect(0, 70, 319, 72, hex('#2a1a10'));
  // el diario abierto, grande: tapas de cuero, dos páginas con renglones
  R.rect(70, 82, 252, 168, hex('#2a1810')); R.rect(72, 84, 250, 166, hex('#6a3a20'));
  for (let y = 86; y <= 162; y++) for (let x = 76; x <= 246; x++) { const c = x < 160 ? hex('#f0e6cc') : hex('#f4ecd6'); R.pset(x, y, h(x, y, 35) > 0.96 ? hex('#e0d2b0') : c); }
  for (let y = 86; y <= 162; y++) { R.pset(160, y, hex('#b8a888')); R.pset(161, y, hex('#d8caa8')); R.pset(76, y, hex('#d8caa8')); R.pset(246, y, hex('#d8caa8')); }
  // renglones ya escritos en la página de la izquierda (rayas onduladas, sin letras)
  for (let r = 0; r < 9; r++) { const y = 92 + r * 8; let x = 82; while (x < 154) { const L = 4 + ri(h(r, x, 36) * 10); if (x + L > 154) break; for (let i = 0; i < L; i++) R.pset(x + i, y + (i % 3 === 1 ? -1 : 0), hex('#3a2a20')); x += L + 3; } }
  // la cinta de marcar
  R.rect(158, 160, 159, 174, hex('#a82a2a')); R.pset(158, 175, hex('#a82a2a'));
  // la zona de Atom y la barra del año: barro liso, tranquilo
  for (let y = 0; y < 50; y++) for (let x = 0; x < W; x++) if (tranquilo(x, y)) R.pset(x, y, h(x, y, 39) < 0.12 ? hex('#9e8462') : hex('#a88e6a'));
};
const vela3 = (x, y, t) => {
  for (let k = 3; k >= 1; k--) for (let j = -9 * k; j <= 9 * k; j++) for (let i = -9 * k; i <= 9 * k; i++) if (i * i + j * j < 81 * k * k && (i + j + k) % (k + 1) === 0) { const c = R.pget(x + i, y - 16 + j); R.pset(x + i, y - 16 + j, mezcla(c, hex('#ffe8a0'), 0.18 / k)); }
  R.rect(x - 7, y - 1, x + 7, y + 1, C.k); R.rect(x - 6, y - 1, x + 6, y, hex('#8a8a8a')); R.rect(x - 3, y - 14, x + 3, y - 2, C.k); R.rect(x - 2, y - 14, x + 2, y - 2, hex('#f2eee2')); R.rect(x - 2, y - 14, x - 1, y - 2, hex('#ffffff'));
  const f = Math.sin(t * 13) > 0 ? 1 : 0; R.pset(x, y - 15, C.k); R.rect(x - 1, y - 18, x + 1, y - 16, hex('#f0902a')); R.rect(x, y - 20 - f, x, y - 17, hex('#f8e070')); R.pset(x, y - 21 - f, hex('#fff8c0'));
};
const p3 = (t) => {
  const hoja = @virginia:10.5@, dibuja = @virginia:11.3@, escribe = @virginia:12.08@, fin = @virginia:13.3@;
  pon(capa('mesa3', MESA3));
  // la página derecha: la carita de la niña (trazo a trazo) y la fecha
  const d = lin(t, dibuja, escribe);
  const cx = 188, cy = 134;
  if (d > 0) { for (let a = 0; a < d * 6.3; a += 0.06) R.pset(ri(cx + Math.cos(a) * 11), ri(cy + Math.sin(a) * 9), hex('#2a1e18'));
    if (d > 0.5) { R.pset(cx - 4, cy - 1, hex('#2a1e18')); R.pset(cx + 4, cy - 1, hex('#2a1e18')); }
    if (d > 0.7) for (let i = -3; i <= 3; i++) R.pset(cx + i, cy + 4 + (Math.abs(i) < 2 ? 1 : 0), hex('#2a1e18'));
    if (d > 0.85) for (let i = -12; i <= 12; i++) R.pset(cx + i, ri(cy - 11 - Math.sqrt(Math.max(0, 144 - i * i)) * 0.2), hex('#2a1e18')); }
  const e = lin(t, escribe, fin);
  if (e > 0) { R.numero('18', 214, 142, { tam: 8, n: ri(e * 30), rampa: [hex('#2a1e18'), hex('#2a1e18'), hex('#2a1e18')], sombra: false });
    R.numero('1587', 170, 159, { tam: 8, n: ri(Math.max(0, e - 0.3) * 50), rampa: [hex('#2a1e18'), hex('#2a1e18'), hex('#2a1e18')], sombra: false }); }
  // la hoja que se pasa
  if (t > hoja - 0.3 && t < hoja + 0.3) { const u = lin(t, hoja - 0.3, hoja + 0.3), xe = ri(lerp(246, 76, u)), al = ri(Math.sin(u * Math.PI) * 14); R.poligono([[160, 86], [xe, 86 - al], [xe, 162 - al], [160, 162]], hex('#f8f2e0')); R.linea(xe, 86 - al, xe, 162 - al, hex('#c8b898')); }
  // el tintero, la vela y una hogaza
  R.rect(262, 138, 276, 152, C.k); R.rect(263, 139, 275, 151, hex('#2a2a36')); R.rect(264, 140, 266, 150, hex('#4a4a5a')); R.rect(266, 136, 272, 138, C.k);
  vela3(40, 128, t);
  R.disco(40, 160, 12, C.k); R.disco(40, 159, 11, hex('#b07a3a')); R.disco(37, 156, 6, hex('#c8924a')); for (let k = 0; k < 4; k++) R.linea(32 + k * 5, 154, 35 + k * 5, 150, hex('#8a5a2a'));
  // la polilla que ronda la vela
  { const a = t * 4.2, mx = 40 + Math.cos(a) * 14, my = 104 + Math.sin(a * 1.3) * 7, ala = Math.sin(t * 30) > 0; ps(mx, my, hex('#d8ccb0')); ps(mx - 1, my - (ala ? 1 : 0), hex('#b8ac90')); ps(mx + 1, my - (ala ? 1 : 0), hex('#b8ac90')); }
  // la mano de White con la pluma: entra por la derecha, dibuja y escribe
  const en_ = ease(lin(t, P3 - 0.1, dibuja - 0.2)), sale = ease(lin(t, fin + 0.2, P4));
  if (en_ > 0 && sale < 1) {
    let px = cx + 11, py = cy; if (d > 0 && d < 1) { px = cx + Math.cos(d * 6.3) * 11; py = cy + Math.sin(d * 6.3) * 9; } else if (e > 0 && e < 1) { px = e < 0.35 ? 214 + e * 40 : 170 + (e - 0.35) * 70; py = e < 0.35 ? 140 : 157; } else if (e >= 1) { px = 206; py = 156; }
    px = lerp(330, px, en_) + sale * 60; py += Math.sin(t * 20) * (d > 0 && d < 1 || e > 0 && e < 1 ? 1 : 0);
    // la pluma (cálamo blanco) y la mano canónica que la sujeta
    R.linea(ri(px), ri(py), ri(px + 10), ri(py - 22), hex('#d8d0c0')); R.linea(ri(px + 1), ri(py), ri(px + 11), ri(py - 22), hex('#f6f2ea')); R.linea(ri(px + 6), ri(py - 12), ri(px + 14), ri(py - 26), hex('#f6f2ea')); R.pset(ri(px), ri(py), C.k);
    T.brazo(R, ri(px + 24), 198, ri(px + 6), ri(py - 4), '#2a2a34', -1, { puno: '#f2eee2' });
  }
};

// ── 4 · el huerto seco: tarde para sembrar, y los vecinos desconfían ─────────────────────────────────────────────
const p4 = (t) => {
  const prieto = @justas:14.4@, siembra = @justas:16.12@, vecinos = @justas:17.38@, notrust = @justas:18.5@;
  const g = T.roanoke(R, t, { encuadre: 'huerto', epoca: 1587, seco: 1 });
  // Wanchese, en el borde del bosque: mira, se enfada y se va
  const va = lin(t, notrust + 0.2, P5), wx = ri(lerp(46, -20, va));
  R.actor(EL.wancheseRK, wx, 150, t, { dir: va > 0 ? -1 : 1, anda: va > 0 && va < 1, enfado: t > notrust - 0.3, habla: false });
  // el colono cava la tierra seca y siembra
  const azada = Math.sin(t * 6) > 0, cava = t < siembra;
  const c = R.actor(EL.colonoRK, 112, 158, t, { dir: t > vecinos && t < notrust + 0.6 ? -1 : 1, sostiene: cava ? [130, azada ? 138 : 148] : t < siembra + 0.6 ? [128, 152] : false, dedo: t > vecinos && t < notrust - 0.1, triste: t > notrust + 0.2, sonrisa: t > vecinos && t < notrust - 0.2 });
  if (cava) { const [hx, hy] = c.mano; R.linea(hx, hy, hx + 8, hy + 12, C.troncoS); R.rect(hx + 6, hy + 11, hx + 11, hy + 13, C.hierro); if (!azada) for (let k = 0; k < 4; k++) ps(hx + 10 + k * 2, 158 - k - ri(Math.sin(t * 20 + k) * 2), hex('#c8a878')); }
  else if (t < siembra + 0.6) { const u = lin(t, siembra, siembra + 0.5); for (let k = 0; k < 3; k++) ps(c.mano[0] + k, c.mano[1] + 2 + u * 6, hex('#e8c040')); }
  if (!cava) { R.linea(132, 157, 140, 145, C.troncoS); R.rect(130, 155, 134, 157, C.hierro); }
  // la colona sale del granero con el saco casi vacío y lo sacude
  const sale = lin(t, P4 + 0.1, prieto), ax = ri(lerp(232, 208, sale));
  const a = R.actor(EL.colonaRK, ax, 158, t, { dir: -1, anda: sale > 0 && sale < 1, sostiene: true, triste: t > prieto + 0.4, habla: t > prieto && t < prieto + 0.8 && parpadeo(t) });
  { const [hx, hy] = a.mano, sx = ri(Math.sin(t * 14) * (t > prieto && t < prieto + 0.9 ? 1 : 0)); R.rect(hx - 4 + sx, hy - 2, hx + 3 + sx, hy + 7, C.k); R.rect(hx - 3 + sx, hy - 1, hx + 2 + sx, hy + 6, hex('#c8b490')); R.rect(hx - 3 + sx, hy + 4, hx + 2 + sx, hy + 6, hex('#a8946a')); R.rect(hx - 2 + sx, hy - 3, hx + 1 + sx, hy - 2, hex('#8a7450'));
    if (t > prieto + 0.3) { const u = lin(t, prieto + 0.3, prieto + 0.8); R.rect(hx - 1, ri(hy + 8 + u * 12), hx, ri(hy + 9 + u * 12), hex('#e8c040')); } }
  T.roanokeDelante(R, t, { encuadre: 'huerto', epoca: 1587, seco: 1 });
};

// ── 5 · el almacén: no llega para el invierno ───────────────────────────────────────────────────────────────────
const ALMACEN = () => {
  // tablas verticales con rendijas de luz, travesaño y vigas
  for (let y = 0; y < 150; y++) for (let x = 0; x < W; x++) { const tb = Math.floor(x / 11); let c = tb % 2 ? hex('#6a4a2e') : hex('#5e4228'); const v = Math.sin(y * 0.15 + tb * 2 + Math.sin(y * 0.03) * 3); if (v > 0.8) c = hex('#4e3620'); if (h(x, y, 41) > 0.97) c = hex('#7a5a38'); if (x % 11 === 0) c = hex('#2a1a10'); if (x % 11 === 1 && h(tb, y >> 3, 42) > 0.6) c = hex('#e8d8a0'); R.pset(x, y, c); }
  for (const vy of [26, 92]) { R.rect(0, vy, 319, vy + 5, hex('#3a2616')); R.rect(0, vy, 319, vy + 1, hex('#7a5634')); for (let x = 6; x < 320; x += 40) { R.pset(x, vy + 3, C.k); R.pset(x + 1, vy + 3, hex('#8a8a8a')); } }
  // el suelo de tierra apisonada con paja
  for (let y = 150; y < 180; y++) for (let x = 0; x < W; x++) { const q = h(x, y, 43); R.pset(x, y, q < 0.2 ? hex('#5a4630') : q > 0.93 ? hex('#c8a860') : hex('#6e5838')); }
  for (let k = 0; k < 60; k++) { const x = ri(h(k, 1, 44) * 319), y = 152 + ri(h(k, 2, 44) * 26); R.linea(x, y, x + 3, y - 1, hex('#c8a860')); }
  R.rect(0, 148, 319, 150, hex('#2a1a10'));
  // la puerta abierta a la derecha (hueco x 238–286, y 54–147), con su hoja de tablas abierta hacia dentro
  R.rect(234, 50, 290, 149, hex('#2a1a10'));
  R.rect(290, 52, 314, 149, hex('#4a3420')); for (let x = 292; x < 314; x += 5) R.rect(x, 52, x, 149, hex('#3a2616')); R.rect(290, 70, 314, 72, hex('#2a1a10')); R.rect(290, 124, 314, 126, hex('#2a1a10'));
  // estantería a la izquierda con tarros casi todos vacíos
  R.rect(8, 40, 10, 148, hex('#3a2616')); R.rect(96, 40, 98, 148, hex('#3a2616'));
  for (const sy of [60, 92, 124]) { R.rect(8, sy, 98, sy + 3, hex('#6a4a2e')); R.rect(8, sy, 98, sy, hex('#8a6440')); }
  [[16, 60, 0], [30, 60, 1], [62, 60, 0], [20, 92, 0], [74, 92, 1], [44, 124, 0]].forEach(([x, y, lleno]) => { R.rect(x, y - 12, x + 9, y - 1, C.k); R.rect(x + 1, y - 11, x + 8, y - 1, hex('#a8b8b0')); if (lleno) R.rect(x + 1, y - 4, x + 8, y - 1, hex('#e8c040')); R.rect(x + 1, y - 11, x + 2, y - 2, hex('#d8e8e0')); R.rect(x, y - 13, x + 9, y - 12, hex('#8a6440')); });
  // sacos vacíos colgados del travesaño y una ristra de maíz casi pelada
  for (const sx of [120, 146]) { R.linea(sx + 5, 32, sx + 5, 38, hex('#8a7450')); R.rect(sx, 38, sx + 10, 60, C.k); R.rect(sx + 1, 39, sx + 9, 59, hex('#b8a47c')); R.rect(sx + 1, 54, sx + 9, 59, hex('#9a8660')); R.linea(sx + 3, 42, sx + 3, 56, hex('#a8946c')); }
  R.linea(200, 32, 200, 44, hex('#8a7450')); for (let k = 0; k < 2; k++) { R.rect(197 + k * 4, 44, 199 + k * 4, 52, hex('#e8b030')); R.rect(197 + k * 4, 44, 197 + k * 4, 52, hex('#c88a20')); }
  // herramientas colgadas (hoz, azada) y un rollo de cuerda
  R.linea(108, 100, 108, 140, hex('#6a4a2e')); R.rect(104, 100, 112, 102, C.hierro); R.linea(220, 98, 222, 128, hex('#6a4a2e')); for (let a = 0; a < 2.4; a += 0.1) R.pset(ri(222 + Math.cos(a) * 7), ri(96 + Math.sin(a) * 7), C.hierroL);
  for (let r = 7; r > 2; r -= 2) R.anillo(178, 112, r, hex('#a8946c'));
  // la zona de Atom y la barra del año: tablas oscuras, sin rendijas
  for (let y = 0; y < 50; y++) for (let x = 0; x < W; x++) if (tranquilo(x, y)) R.pset(x, y, x % 11 === 0 ? hex('#4a3220') : hex('#5a4028'));
  // una escalera apoyada, cestos apilados, cajas y un farol apagado
  R.linea(112, 148, 128, 46, hex('#6a4a2e')); R.linea(124, 148, 140, 46, hex('#6a4a2e')); for (let k = 0; k < 9; k++) { const y = 140 - k * 11, x = 113 + (148 - y) * 0.157; R.linea(ri(x), y, ri(x) + 12, y, hex('#8a6440')); }
  for (const [x, y, w] of [[18, 148, 16], [36, 148, 16], [26, 132, 14]]) { R.rect(x, y - 14, x + w, y, C.k); for (let j = y - 13; j < y; j++) for (let i = x + 1; i < x + w; i++) R.pset(i, j, (i + j) % 3 ? hex('#c8a060') : hex('#9a7840')); R.rect(x, y - 15, x + w, y - 14, hex('#7a5a30')); }
  R.rect(60, 128, 92, 148, C.k); R.rect(61, 129, 91, 147, hex('#8a6a40')); R.rect(61, 137, 91, 138, hex('#5a4028')); R.rect(75, 129, 76, 147, hex('#5a4028'));
  R.linea(166, 32, 166, 70, hex('#3a2416')); R.rect(161, 70, 171, 84, C.k); R.rect(162, 72, 170, 82, hex('#5a5a64')); R.rect(165, 72, 167, 82, hex('#7a7a84'));
};
const barril = (x, base, abierto) => {
  R.rect(x - 11, base - 26, x + 11, base, C.k); for (let y = base - 25; y < base; y++) { const w = 10 - Math.abs(y - (base - 13)) * 0.08; for (let i = -10; i <= 10; i++) if (Math.abs(i) <= w) R.pset(x + i, y, i < -5 ? hex('#8a5a30') : i > 5 ? hex('#5a3a20') : hex('#7a4e2a')); }
  for (const yy of [base - 22, base - 5]) R.rect(x - 10, yy, x + 10, yy + 1, C.hierro);
  if (abierto) { R.rect(x - 9, base - 27, x + 9, base - 26, hex('#2a1a10')); } else R.rect(x - 10, base - 28, x + 10, base - 26, hex('#9a6a3a'));
};
const p5 = (t) => {
  const invierno = @justas:20.66@, alguien = @justas:21.59@, england = @justas:22.79@, vacio = @justas:19.58@;
  pon(capa('almacen', ALMACEN));
  // por la puerta: el claro, el cielo que se nubla y lo que cae (hojas, luego copos)
  R.recorte([238, 54, 286, 147]);
  const nb = lin(t, invierno - 0.5, invierno + 0.6);
  for (let y = 54; y <= 147; y++) for (let x = 238; x <= 286; x += 1) { const cie = y < 100; R.pset(x, y, cie ? mezcla(hex('#9ab8d0'), hex('#b8bcc4'), nb) : mezcla(hex('#a89a5a'), hex('#c8c4bc'), nb * 0.6)); }
  for (let x = 238; x <= 286; x++) { const yy = 96 + ri(Math.sin(x * 0.3) * 3); for (let y = yy - 14; y < yy; y++) if (h(x, y, 45) > 0.25) R.pset(x, y, mezcla(hex('#3a5a3a'), hex('#5a6a5a'), nb)); }
  for (let k = 0; k < 14; k++) { const p = (t * 0.25 + h(k, 1, 46)) % 1, x = 240 + h(k, 2, 46) * 46 + Math.sin(t * 2 + k) * 3, y = 54 + p * 92; const copo = t > invierno && h(k, 3, 46) < lin(t, invierno, invierno + 1.5); R.pset(ri(x), ri(y), copo ? hex('#f8f8ff') : k % 2 ? hex('#c8702a') : hex('#d8a030')); R.pset(ri(x) + 1, ri(y), copo ? hex('#e8ecf8') : hex('#a8501a')); if (copo) R.pset(ri(x), ri(y) + 1, hex('#e8ecf8')); }
  { const n = lin(t, invierno + 0.3, P6); for (let x = 238; x <= 286; x++) { const a = ri(n * (3 + Math.sin(x * 0.7) * 1.5)); for (let y = 147 - a; y <= 147; y++) R.pset(x, y, hex('#f4f6ff')); } }
  R.recorte(null);
  // el barril que la colona destapa: casi vacío
  barril(176, 160, t > vacio);
  // el ratón que pasa con un grano
  { const u = lin(t, @justas:20.2@, @justas:22.2@), mx = ri(lerp(70, 250, u)); if (u > 0 && u < 1) { R.rect(mx, 168, mx + 4, 170, hex('#7a7a80')); R.pset(mx + 5, 169, hex('#7a7a80')); R.pset(mx + 4, 167, hex('#e89aa8')); R.pset(mx + 6, 169, C.k); R.linea(mx - 4, 169 + (Math.floor(t * 12) % 2), mx - 1, 170, hex('#c89aa0')); R.pset(mx + 7, 170, hex('#e8c040')); } }
  // la colona destapa el barril y mira dentro
  const k = R.actor(EL.colonaRK, 150, 166, t, { dir: 1, sostiene: t > vacio - 0.4 && t < vacio + 0.6 ? [172, 136] : false, triste: t > vacio + 0.3, sorpresa: t > vacio && t < vacio + 0.3 });
  if (t > vacio && t < vacio + 0.6) { R.rect(k.mano[0] - 1, k.mano[1] - 6, k.mano[0] + 1, k.mano[1] + 2, hex('#9a6a3a')); }
  // Ananias vuelca el saco vacío (caen tres granos), mira a la puerta y piensa en un barco
  const vuelca = t > P5 + 0.3 && t < vacio + 1.0;
  const a = R.actor(EL.ananiasRK, 214, 166, t, { dir: t > alguien ? 1 : -1, sostiene: vuelca ? [204, 132] : false, triste: t > invierno, habla: t > alguien && t < england && parpadeo(t), sorpresa: false });
  if (!vuelca && t > vacio + 1.0) { R.rect(196, 163, 208, 166, C.k); R.rect(197, 164, 207, 165, hex('#b8a47c')); R.pset(203, 162, hex('#b8a47c')); }
  if (vuelca) { const [hx, hy] = a.mano; R.rect(hx - 3, hy - 1, hx + 4, hy + 12, C.k); R.rect(hx - 2, hy, hx + 3, hy + 11, hex('#c8b490')); R.rect(hx - 2, hy + 9, hx + 3, hy + 11, hex('#a8946a')); for (let n = 0; n < 3; n++) { const u = ((t - P5 - 0.4) * 1.2 + n * 0.3) % 1; R.rect(hx, ri(hy + 13 + u * 20), hx + 1, ri(hy + 14 + u * 20), hex('#e8c040')); } }
  if (t > england - 0.2) { const s = lin(t, england - 0.2, england + 0.1); globo(a.cabeza[0] - 18, a.cabeza[1] - 22, ri(18 * s), ri(14 * s), 1); if (s >= 1) barcoG(a.cabeza[0] - 18, a.cabeza[1] - 18); }
};

// ── 6 · el fuerte: le piden a White que vaya ─────────────────────────────────────────────────────────────────────
const p6 = (t) => {
  const pide = @justas:24.79@, himself = @justas:25.61@, porque = @justas:26.05@, influ = @justas:27.63@, si = @justas:28.2@;
  T.roanoke(R, t, { encuadre: 'fuerte', epoca: 1587 });
  // White sale hacia el centro del claro
  const w0 = ease(lin(t, P6, P6 + 0.9)), wx = ri(lerp(128, 152, w0));
  const w = R.actor(EL.whiteRK, wx, 162, t, { dir: t > si ? 1 : -1, anda: w0 > 0 && w0 < 1, triste: t > himself && t < influ + 0.2, sonrisa: t > si, habla: t > si + 0.2 && t < si + 1.0 && parpadeo(t), sorpresa: t > pide && t < pide + 0.4 });
  // los colonos llegan de los dos lados y se lo piden
  const l = ease(lin(t, P6 + 0.2, pide - 0.1));
  R.actor(EL.colonoRK, ri(lerp(70, 116, l)), 164, t, { dir: 1, anda: l > 0 && l < 1, dedo: t > pide && t < influ + 0.6, habla: t > pide && t < himself + 0.4 && parpadeo(t) });
  R.actor(EL.ananiasRK, ri(lerp(240, 186, l)), 166, t, { dir: -1, anda: l > 0 && l < 1, brazos: t > influ - 0.1 && t < influ + 0.7, habla: t > porque && t < influ && parpadeo(t), sonrisa: t > si });
  R.actor(EL.colonaRK, ri(lerp(30, 92, l)), 168, t, { dir: 1, anda: l > 0 && l < 1, habla: t > himself && t < porque + 0.6 && !parpadeo(t), dedo: t > influ && t < si + 0.5, sonrisa: t > si });
  const el = R.actor(EL.eleanorRK, 210, 160, t, { dir: -1, sostiene: true, triste: t < si, sonrisa: t > si });
  bebe(el.mano[0] - 1, el.mano[1] - 1 + ri(Math.sin(t * 2.4)), -1);
  T.roanokeDelante(R, t, { encuadre: 'fuerte', epoca: 1587 });
  if (t > pide && t < himself) { globo(w.cabeza[0] - 6, w.cabeza[1] - 22, 18, 14, 1); barcoG(w.cabeza[0] - 6, w.cabeza[1] - 18); }
  if (t > himself && t < influ) R.bocadillo(w.cabeza[0], w.cabeza[1] - 4, { icono: 'X' });
  if (t > si + 0.3) { globo(w.cabeza[0] + 8, w.cabeza[1] - 22, 18, 14, -1); barcoG(w.cabeza[0] + 8, w.cabeza[1] - 18); }
};

const efectos = [[@virginia:4.3@, 'miau'], [@virginia:7.7@, 'pop'], [@virginia:8.3@, 'brillo'], [@virginia:10.5@, 'papel'], [@virginia:12.1@, 'lapiz'],
  [@justas:14.6@, 'golpecito'], [@justas:15.6@, 'golpecito'], [@justas:20.8@, 'rafaga'], [@justas:22.8@, 'brillo'], [@justas:28.5@, 'pop']];
T.rodar(E, R, [[P1, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 1587 });
''')

E['rk-senal'] = ('La señal', '''// RK-SENAL (frases 13–14), 1587 (el plano de la maqueta, 2026), sin cartela. Cinco planos, todos con acción y vida:
// 1. (fondo local) el claro junto al roble grande: White habla con los colonos, que asienten («agreed on a signal»);
//    señala hacia el interior («If they moved») y talla con la navaja unas rayas en el tronco («carve the name»), con
//    virutas; una ardilla sube por el tronco, gallinas, pájaros y el humo del fuerte;
// 2. la maqueta de Atom: el guante talla las rayas del nombre en el postecito («a tree or a post») y, en «cross», la
//    cruz: le sale torcida, la raspa, otra vez torcida… y a la tercera bien, con un brillo (gag);
// 3. (fondo local, inserto) un mapa dibujado con un palo en la arena de la playa: la isla, la costa y el río; el palo
//    traza la línea de puntos tierra adentro («moving… inland») y escribe «50» («fifty miles»); un cangrejo pasa y
//    alrededor se ven los zapatos de los colonos que miran;
// 4. el embarcadero: White habla con Eleanor, que tiene a la niña en brazos («said goodbye to his daughter»), se
//    inclina a verla (un corazón, «granddaughter») y se va a la pinaza, donde le espera un marinero a los remos;
// 5. (fondo local) el barco de lado, de día: White en el alcázar de popa mira atrás a la isla que se aleja y saluda
//    («set sail»); piensa en volver pronto: bocadillo con tres lunas («a few months»).''', KIT + PIEZAS3 + r'''
const P1 = 0, P2 = @senal:7.11@, P3 = @senal:13.0@, P4 = @despedida:16.76@, P5 = @despedida:22.36@;
const GUANTE = '#5a8ad0';

// ── 1 · el claro: White pacta la señal con los colonos ──────────────────────────────────────────────────────────
const CIELO1 = () => cieloL([hex('#5a8ad0'), hex('#7aa6dc'), hex('#a8c8e8'), hex('#d8e6f0')], 74);
const CLARO = () => {
  R.buf.fill(0);
  // la otra orilla y el agua del estrecho
  aguaL(70, 80, [hex('#8ab8d0'), hex('#6a98b8'), hex('#5a88a8')]);
  for (let x = 0; x < W; x++) { const y = 68 + ri(Math.sin(x * 0.05) * 1.5); R.rect(x, y, x, 70, hex('#7a9a8a')); }
  // el bosque de detrás, en dos términos
  for (let k = 0; k < 26; k++) pino(ri(h(k, 1, 51) * 330) - 5, 98, 22 + ri(h(k, 2, 51) * 10), [hex('#3a5a4a'), hex('#4a6a58'), hex('#5a7a66')]);
  for (let k = 0; k < 18; k++) pino(ri(h(k, 3, 51) * 330) - 5, 104, 26 + ri(h(k, 4, 51) * 14));
  // el prado
  prado(0, 100, 319, 179, [hex('#5a8a3a'), hex('#6e9e44'), hex('#88b450')], { matas: 40, flores: 26, piedras: 8, sem: 3 });
  // el camino de arena que va al fuerte (izquierda)
  for (let y = 104; y < 180; y++) { const c = 70 - (y - 104) * 0.55, w = 4 + (y - 104) * 0.22; for (let x = ri(c - w); x <= ri(c + w); x++) R.pset(x, y, h(x, y, 52) > 0.8 ? hex('#c8b088') : hex('#d8c49a')); }
  // la empalizada del fuerte, lejos a la izquierda, con dos tejados de juncos
  for (let x = 0; x < 112; x += 3) { const top = 84 + (x % 6 ? 1 : 0); R.rect(x, top, x + 1, 104, hex('#7a5a3a')); R.pset(x, top, hex('#a88a5a')); R.pset(x + 1, top + 1, hex('#5a3a22')); }
  for (const [x0, w] of [[18, 26], [62, 30]]) for (let y = 74; y < 86; y++) { const f = (y - 74) / 12; for (let x = ri(x0 + w / 2 - f * w / 2); x <= ri(x0 + w / 2 + f * w / 2); x++) R.pset(x, y, (x + y) % 3 ? C.junco : C.juncoS); }
  // el poste de la señal, a la izquierda: tronco descortezado clavado junto al camino
  R.rect(28, 108, 37, 168, C.k); for (let y = 109; y < 168; y++) for (let x = 29; x <= 36; x++) R.pset(x, y, x < 31 ? hex('#d8b880') : x > 34 ? hex('#8a6a40') : hex('#b89460'));
  for (let y = 112; y < 166; y += 5) R.pset(32 + (y % 3), y, hex('#7a5a34')); R.rect(27, 106, 38, 108, C.k); R.rect(28, 106, 37, 107, hex('#e8cc98')); for (let i = 0; i < 3; i++) R.pset(30 + i * 3, 107, hex('#a8844a'));
  for (let y = 140; y < 168; y++) { R.pset(27, y, hex('#5a4028')); R.pset(38, y, hex('#3a2a18')); }
  // el roble grande de la derecha: tronco ancho con corteza y raíces, y la copa en tres tonos
  for (let y = 56; y <= 166; y++) { const w = 12 + Math.max(0, (y - 150)) * 0.9; for (let x = ri(240 - w); x <= ri(240 + w); x++) { const u = (x - 240) / w, s = Math.sin(y * 0.4 + x * 0.9) > 0.6; let c = u < -0.55 ? hex('#4a3826') : u > 0.5 ? hex('#2e2218') : hex('#5e4834'); if (s) c = hex('#3a2c1e'); if (h(x, y, 53) > 0.94) c = C.musgo; R.pset(x, y, c); } R.pset(ri(240 - w) - 1, y, C.k); R.pset(ri(240 + w) + 1, y, C.k); }
  for (let k = 0; k < 4; k++) { const d = k < 2 ? -1 : 1, x0 = 240 + d * (8 + k % 2 * 4); R.linea(x0, 162, x0 + d * (14 + k * 3), 170, hex('#3a2c1e')); R.linea(x0, 163, x0 + d * (14 + k * 3), 171, hex('#5e4834')); }
  for (const [cx, cy, r] of [[206, 76, 24], [240, 56, 26], [272, 74, 22], [226, 92, 18], [262, 94, 16], [190, 92, 14]]) for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r - 4; x <= cx + r + 4; x++) { if (((x - cx) / (r + 4)) ** 2 + ((y - cy) / r) ** 2 > 1 + (h(x, y, 54) - 0.5) * 0.25) continue; if (x >= 272 && y <= 48) continue; const l = (x - cx) * -0.5 + (y - cy) * 0.8; R.pset(x, y, l > r * 0.4 ? hex('#3a5a2a') : l < -r * 0.45 ? hex('#8aaa4a') : h(x, y, 55) > 0.85 ? hex('#4a6a30') : hex('#5e8a38')); }
};
const p1 = (t) => {
  const pacta = @senal:1.86@, senal = @senal:2.4@, moved = @senal:3.47@, carve = @senal:4.73@, arbol = @senal:6.77@;
  pon(capa('cielo1', CIELO1));
  nubes(t, [[20, 22, 34, 1.2], [150, 34, 26, 0.8], [230, 54, 20, 0.5]], [hex('#b8c8d8'), hex('#e8eef4'), hex('#ffffff')]);
  pon(capa('claro', CLARO));
  brillos(t, 71, 79, 14, hex('#e8f4ff'), 5);
  fuego(46, 82, t, 0, 22); fuego(78, 80, t, 0, 18);
  for (let k = 0; k < 3; k++) { const x = (t * (8 + k * 3) + k * 90) % 360 - 20, y = 40 + k * 9 + Math.sin(t * 2 + k) * 2, a = Math.sin(t * 9 + k) > 0; ps(x, y, C.k); ps(x - 1, y - (a ? 1 : 0), C.k); ps(x + 1, y - (a ? 1 : 0), C.k); ps(x - 2, y - (a ? 2 : 0), C.k); ps(x + 2, y - (a ? 2 : 0), C.k); }
  for (const [x, y] of [[150, 176], [184, 150], [110, 146], [290, 176], [8, 172]]) mata(x, y, t, hex('#4a7a2a'), 6, hex('#7aa040'));
  gallina(ri(176 + Math.sin(t * 0.7) * 6), 154, Math.cos(t * 0.7) > 0 ? 1 : -1, t, { picotea: true });
  gallina(286, 172, -1, t, { picotea: true, color: hex('#c88a4a') });
  // la ardilla que sube y baja por el tronco
  { const u = (Math.sin(t * 0.9) + 1) / 2, ay = ri(150 - u * 70), ax = 252; R.rect(ax, ay - 2, ax + 2, ay + 2, hex('#a85a2a')); R.pset(ax + 1, ay - 3, hex('#a85a2a')); R.pset(ax + 3, ay + 2, hex('#c87a3a')); R.pset(ax + 3, ay + 3, hex('#c87a3a')); R.pset(ax + 4, ay + 4, hex('#c87a3a')); R.pset(ax, ay - 1, C.k); }
  // las rayas que White talla en el tronco (aparecen una a una) y las virutas que saltan
  const talla = lin(t, carve + 0.4, arbol - 0.2), n = ri(talla * 5);
  for (let i = 0; i < n; i++) { R.rect(232 + i * 3, 118, 233 + i * 3, 130, hex('#2a1e14')); R.rect(232 + i * 3, 118, 232 + i * 3, 130, hex('#e8d0a0')); }
  if (talla > 0 && talla < 1) for (let k = 0; k < 4; k++) { const p = (t * 3 + k * 0.25) % 1; ps(230 - p * 10 - k, 124 - Math.sin(p * 3) * 8 + p * 12, hex('#e8d0a0')); }
  // los colonos escuchan y asienten
  const habla = (a, b) => t > a && t < b && parpadeo(t);
  R.actor(EL.colonaRK, 76, 168, t, { dir: 1, sonrisa: t > senal, habla: habla(moved + 0.4, carve) });
  R.actor(EL.colonoRK, 104, 166, t, { dir: 1, sonrisa: t > senal, dedo: t > moved + 0.3 && t < carve - 0.2, habla: habla(senal, moved - 0.1) });
  R.actor(EL.ananiasRK, 132, 168, t, { dir: 1, sonrisa: t > senal + 0.3, brazos: t > senal && t < senal + 0.5 });
  // White: habla, señala tierra adentro y se va al roble a tallar
  const va = ease(lin(t, carve - 0.5, carve + 0.3)), wx = ri(lerp(176, 212, va));
  const talla_ = t > carve + 0.3 && t < arbol - 0.1;
  const w = R.actor(EL.whiteRK, wx, 166, t, { dir: t < moved || t > carve - 0.5 ? (t > carve - 0.5 ? 1 : -1) : -1, anda: va > 0 && va < 1, habla: habla(0.9, moved + 0.8) || habla(arbol, 9), dedo: (t > moved && t < carve - 0.6) || t > arbol, sostiene: talla_ ? [229, ri(124 + Math.sin(t * 16) * 4)] : false });
  if (talla_) { const [hx, hy] = w.mano; R.linea(hx, hy, hx + 4, hy - 1, hex('#d8d8e0')); R.pset(hx + 5, hy - 1, hex('#ffffff')); R.rect(hx - 3, hy, hx - 1, hy + 1, hex('#5a3a22')); }
  if (t > pacta && t < pacta + 1.2) R.bocadillo(w.cabeza[0], w.cabeza[1] - 4, { icono: '!' });
};

// ── 2 · la maqueta: el nombre y la cruz torcida ────────────────────────────────────────────────────────────────
const p2 = (t) => {
  const poste = @senal:7.21@, cross = @senal:10.82@, c2 = @senal:11.5@, c3 = @senal:12.1@;
  const talla = lin(t, poste, poste + 1.4), cruz = t < cross + 0.25 ? 0 : t < c2 + 0.25 ? 1 : t < c3 + 0.25 ? 2 : 3;
  T.hoy(R, t, { encuadre: 'estudio', camara: 'maqueta', talla, cruz, navaja: false });
  // el guante con la navaja: talla renglón a renglón, espera, y luego la cruz (tres intentos)
  let hx = 198, hy = 132, tallando = false;
  if (t < poste) { const u = ease(lin(t, P2, poste)); hx = lerp(330, 196, u); hy = lerp(176, 140, u); }
  else if (talla < 1) { hx = 192; hy = 140 - talla * 22 + Math.sin(t * 18) * 1.5; tallando = true; }
  else if (t < cross) { const u = lin(t, poste + 1.4, cross); hx = 200 + Math.sin(u * Math.PI) * 10; hy = 126 - Math.sin(u * Math.PI) * 8 + Math.sin(t * 3) * 1; }
  else { const intento = (a) => t >= a && t < a + 0.3, enCruz = intento(cross) || intento(c2) || intento(c3);
    // talla en la cruz y se aparta: así se ven los intentos torcidos y la cruz buena
    const ult = t >= c3 ? c3 : t >= c2 ? c2 : cross, fuera = ease(lin(t, ult + 0.3, ult + 0.45));
    hx = enCruz ? 190 : lerp(190, t >= c3 ? 216 : 206, fuera); hy = enCruz ? 114 + Math.sin(t * 22) * 1.5 : lerp(114, t >= c3 ? 132 : 126, fuera); tallando = enCruz; }
  hx = ri(hx); hy = ri(hy);
  // la navaja: hoja de acero hacia el poste y el mango de madera en el puño
  R.linea(hx - 14, hy + 1, hx - 4, hy + 1, hex('#c8ccd8')); R.linea(hx - 14, hy, hx - 5, hy, hex('#f0f2f8')); R.pset(hx - 15, hy + 1, hex('#8a8e98'));
  R.rect(hx - 4, hy - 1, hx + 4, hy + 2, C.k); R.rect(hx - 3, hy, hx + 3, hy + 1, hex('#8a5a30'));
  T.mano(R, hx + 4, hy, -1, GUANTE, { sinManga: true });
  if (tallando) for (let k = 0; k < 3; k++) { const p = (t * 4 + k / 3) % 1; ps(hx - 16 + p * 6, hy + 4 + p * 14, hex('#e8d0a0')); }
  // la cruz buena: un brillo
  if (t > c3 + 0.3 && t < c3 + 0.9) { const r = ri(2 + lin(t, c3 + 0.3, c3 + 0.9) * 5); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.linea(178 + dx * 2, 116 + dy * 2, 178 + dx * r, 116 + dy * r, hex('#fff8c0')); }
};

// ── 3 · el mapa en la arena: cincuenta millas tierra adentro ───────────────────────────────────────────────────
const ARENA = () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < W; x++) { const q = h(x, y, 61), r = Math.sin(x * 0.11 + Math.sin(y * 0.05) * 3 + y * 0.03); let c = r > 0.75 ? hex('#d8c08e') : hex('#e6d0a2'); if (q < 0.12) c = hex('#c8ae7c'); if (q > 0.96) c = hex('#f4e4bc'); R.pset(x, y, c); }
  // conchas, piedrecitas y algas sueltas
  for (let k = 0; k < 22; k++) { const x = ri(h(k, 1, 62) * 312) + 4, y = ri(h(k, 2, 62) * 170) + 5; if ((x >= 272 && y <= 48) || (x <= 176 && y <= 21)) continue; if (k % 3 === 0) { R.disco(x, y, 2, hex('#f4ece0')); R.pset(x, y, hex('#d8a890')); R.pset(x - 1, y + 1, hex('#c8a890')); } else if (k % 3 === 1) { R.rect(x, y, x + 2, y + 1, hex('#8a8478')); R.pset(x, y, hex('#b8b0a0')); } else { R.linea(x, y, x + 5, y + 2, hex('#4a6a3a')); R.linea(x + 1, y, x + 6, y + 1, hex('#6a8a4a')); } }
  // las huellas de pies que cruzan
  for (let k = 0; k < 7; k++) { const x = 270 - k * 16, y = 168 - k * 3 + (k % 2) * 6; R.rect(x, y, x + 3, y + 5, hex('#c0a474')); R.rect(x + 1, y + 1, x + 2, y + 4, hex('#b09464')); }
  // el mapa: la costa (la tierra a la izquierda, rayada), el estrecho, la isla y el río
  const SURCO = hex('#7a5c34'), SURCOS = hex('#9a7a4c'), LUZ = hex('#f8ead0');
  // el mar del mapa (a la derecha de la costa), rayado con olitas trazadas con el palo
  for (let y = 26; y < 150; y++) { const cx = 230 + Math.sin(y * 0.09) * 8 + Math.sin(y * 0.23) * 3; for (let x = ri(cx) + 4; x < 300; x++) if ((x + ri(Math.sin(y * 0.5) * 2)) % 9 === 0 && y % 6 < 2) R.pset(x, y, SURCOS);
    R.rect(ri(cx) - 1, y, ri(cx), y, SURCO); R.pset(ri(cx) + 1, y, LUZ); for (let x = 60; x < cx - 3; x += 7) if ((x + y * 3) % 23 === 0) R.pset(x, y, hex('#b89a6a')); }
  for (let a = 0; a < 6.3; a += 0.03) { const x = ri(264 + Math.cos(a) * 9), y = ri(92 + Math.sin(a) * 18); R.rect(x - 1, y, x, y, SURCO); R.pset(x + 1, y, LUZ); }
  for (let y = 78; y < 107; y += 3) for (let x = 258; x < 271; x += 2) if (((x - 264) / 7) ** 2 + ((y - 92) / 15) ** 2 < 1) R.pset(x, y, SURCOS);
  for (let x = 120; x < 228; x++) { const y = ri(108 + Math.sin(x * 0.07) * 6 + (228 - x) * 0.06); R.rect(x, y, x, y + 1, SURCO); R.pset(x, y + 2, LUZ); }
  // un tronco de deriva y una pluma de gaviota
  R.rect(14, 74, 50, 80, C.k); R.rect(15, 75, 49, 79, hex('#b8a888')); R.rect(15, 75, 49, 76, hex('#d8ccb0')); for (let x = 18; x < 48; x += 6) R.linea(x, 77, x + 3, 78, hex('#8a7a60')); R.disco(50, 77, 3, hex('#8a7a60'));
  R.linea(296, 64, 308, 58, hex('#f8f8f4')); R.linea(297, 65, 309, 59, hex('#c8c8c4')); R.linea(300, 62, 300, 64, hex('#f8f8f4'));
  for (let k = 0; k < 9; k++) { const x = 70 + k * 14 + (k % 2) * 5, y = 50 + (k % 3) * 22; R.linea(x, y, x - 2, y + 4, hex('#9a7e54')); R.linea(x, y, x + 2, y + 4, hex('#9a7e54')); R.linea(x - 2, y + 4, x + 2, y + 4, hex('#9a7e54')); }
  // el mar arriba a la derecha (olas que llegan, en la capa solo la espuma seca)
  for (let x = 280; x < 320; x++) for (let y = 120; y < 180; y++) if (y > 150 - (x - 280) * 0.6) R.pset(x, y, (x + y) % 5 ? hex('#d0b884') : hex('#c4ac78'));
};
// las puntas de los zapatos de quien mira (desde el borde de abajo), con la media y la hebilla
const zapatos = (x, y, c, media = hex('#e8e0cc')) => { R.rect(x + 2, y - 2, x + 9, 180, C.k); R.rect(x + 3, y - 1, x + 8, 180, media); R.rect(x - 1, y, x + 12, y + 8, C.k); R.rect(x, y + 1, x + 11, y + 7, c); R.rect(x, y + 1, x + 4, y + 2, mezcla(c, 0xffffffff, 0.3)); R.rect(x + 5, y + 1, x + 7, y + 2, hex('#e8c040')); R.rect(x + 1, y + 8, x + 12, y + 9, mezcla(C.k, hex('#c8ae7c'), 0.5)); };
const p3 = (t) => {
  const inland = @despedida:15.79@, fifty = @despedida:15.16@, moving = @despedida:14.59@;
  pon(capa('arena', ARENA));
  // la ola que sube y baja por la esquina de abajo a la derecha
  { const o = (Math.sin(t * 1.3) + 1) / 2; for (let x = 268; x < 320; x++) { const y0 = ri(180 - (x - 268) * 0.9 * (0.6 + o * 0.5)); for (let y = y0; y < 180; y++) R.pset(x, y, y - y0 < 2 ? hex('#f8f8f0') : (x + y + ri(t * 6)) % 7 ? hex('#5a9ab0') : hex('#7ab8c8')); } }
  // los zapatos de los colonos que miran (abajo y a la izquierda)
  // el sombrero de paja de un colono y una cesta con conchas, dejados en la arena
  { const x = 30, y = 150; R.disco(x + 2, y + 3, 15, hex('#c8ae7c')); R.disco(x, y, 15, C.k); R.disco(x, y, 14, hex('#e8c878')); for (let a = 0; a < 6.3; a += 0.4) R.pset(ri(x + Math.cos(a) * 11), ri(y + Math.sin(a) * 11), hex('#c8a858')); R.disco(x, y, 7, C.k); R.disco(x, y, 6, hex('#d8b868')); R.rect(x - 7, y - 1, x + 7, y + 1, hex('#8a3a2a')); }
  { const x = 206, y = 164; R.rect(x - 13, y - 9, x + 13, y + 8, C.k); for (let j = -8; j <= 7; j++) for (let i = -12; i <= 12; i++) R.pset(x + i, y + j, (i + j * 2) % 4 === 0 ? hex('#9a7840') : hex('#c8a060')); R.rect(x - 12, y - 8, x + 12, y - 7, hex('#7a5a30'));
    for (const [i, c] of [[-8, '#f4ece0'], [-2, '#e8c8b0'], [4, '#f8f0e0'], [9, '#d8b8a0']]) { R.disco(x + i, y - 10, 3, hex(c)); R.pset(x + i, y - 10, hex('#c8a890')); } }
  // la línea de puntos tierra adentro y el punto de llegada
  const u = ease(lin(t, moving - 0.4, inland + 0.2));
  const ruta = (f) => [lerp(252, 92, f), 96 + Math.sin(f * 3) * 10 - f * 10];
  for (let k = 0; k <= 30; k++) { const f = k / 30; if (f > u) break; const [x, y] = ruta(f); if (k % 2 === 0) { R.rect(ri(x), ri(y), ri(x) + 1, ri(y) + 1, hex('#6a5030')); } }
  if (u >= 1) { R.disco(92, 86, 5, hex('#6a5030')); R.disco(92, 86, 3, hex('#e6d0a2')); R.pset(92, 86, hex('#6a5030')); }
  if (t > fifty) R.numero('50', 160, 140, { tam: 16, centro: true, n: ri(lin(t, fifty, fifty + 0.5) * 40), rampa: [hex('#6a5030'), hex('#7a6040'), hex('#8a7050')], sombra: false });
  // el cangrejo que cruza de lado
  { const cx = ri(300 - ((t - P3) * 14) % 120), cy = 60 + ri(Math.sin(t) * 2), p = Math.floor(t * 10) % 2; R.rect(cx - 3, cy - 1, cx + 3, cy + 1, hex('#c8502a')); R.pset(cx - 1, cy - 2, C.k); R.pset(cx + 1, cy - 2, C.k); for (const d of [-1, 1]) { R.pset(cx + d * 4, cy - 2, hex('#c8502a')); R.pset(cx + d * 5, cy - 3, hex('#c8502a')); for (let l = 0; l < 3; l++) R.pset(cx + d * (2 + l), cy + 2 + ((l + p) % 2), hex('#a83a1a')); } }
  // el palo y la mano que lo lleva (entra por abajo)
  let [tx, ty] = u > 0 && u < 1 ? ruta(u) : u >= 1 ? [92, 90] : [252, 96];
  if (t > fifty && t < fifty + 0.6) { const v = lin(t, fifty, fifty + 0.6); tx = 146 + v * 30; ty = 128 + Math.sin(v * 20) * 4; }
  tx = ri(tx); ty = ri(ty);
  R.linea(tx, ty, tx + 20, ty + 46, hex('#5a3a22')); R.linea(tx + 1, ty, tx + 21, ty + 46, hex('#8a6a40')); R.disco(tx + 1, ty + 1, 2, hex('#c8ae7c'));
  T.brazo(R, tx + 34, 198, tx + 21, ty + 50, '#6a5a3a', 1, {});
};

// ── 4 · el embarcadero: White se despide ────────────────────────────────────────────────────────────────────────
const corazon = (x, y) => { for (const [i, j] of [[-2, 0], [-1, -1], [1, -1], [2, 0], [-2, 1], [2, 1], [-1, 2], [1, 2], [0, 3], [0, 1], [-1, 0], [1, 0], [0, 2], [-1, 1], [1, 1]]) R.pset(x + i, y + j, hex('#e83a5a')); R.pset(x - 1, y, hex('#ffb0c0')); };
const p4 = (t) => {
  const adios = @despedida:18.52@, hija = @despedida:19.36@, nieta = @despedida:20.1@, semana = @despedida:21.18@, embarca = @despedida:21.6@;
  const zarpa = lin(t, embarca + 0.5, P5 + 0.4) * 0.06;
  const g = T.roanoke(R, t, { encuadre: 'huerto', camara: 'embarcadero', epoca: 1587, zarpa });
  const [pxp, pyp] = g.pinaza;
  // el marinero en la pinaza, a los remos
  // la regala de la pinaza (y = flotación − 9, más el cabeceo): lo de debajo queda dentro del casco
  const regala = pyp - 9 + ri(Math.sin(t * 1.6)), aBordo = (f) => { R.recorte([0, 0, 319, regala]); f(); R.recorte(null); };
  aBordo(() => R.actor(EL.marineroRK, pxp + 10, pyp - 1, t, { dir: -1, sonrisa: t > embarca + 0.3 }));
  // Ananias y Eleanor con la niña
  R.actor(EL.ananiasRK, 96, 164, t, { dir: 1, triste: t > adios && t < embarca, brazos: t > embarca + 0.4, sonrisa: t > embarca + 0.4 });
  const e = R.actor(EL.eleanorRK, 128, 164, t, { dir: 1, sostiene: true, sonrisa: t > nieta, triste: t > adios && t < nieta, habla: t > hija + 0.2 && t < nieta && parpadeo(t) });
  bebe(e.mano[0] + 1, e.mano[1] - 1 + ri(Math.sin(t * 2.4)), 1);
  // White: habla, se inclina hacia la niña y se va a la pinaza
  const va = ease(lin(t, semana, embarca + 0.3)), wx = ri(lerp(154, 238, va)), dentro = t > embarca + 0.3;
  const wy = dentro ? pyp - 1 : 164, xx = dentro ? pxp - 14 : wx;
  const opW = { dir: dentro ? -1 : va > 0 ? 1 : -1, anda: va > 0 && va < 1, habla: t > adios - 0.1 && t < hija + 0.5 && parpadeo(t), sonrisa: t > nieta, salto: t > nieta && t < nieta + 0.6 ? 1 : 0, dedo: dentro && t > embarca + 0.6 };
  if (dentro) aBordo(() => R.actor(EL.whiteRK, xx, wy, t, opW)); else R.actor(EL.whiteRK, xx, wy, t, opW);
  T.roanokeDelante(R, t, { encuadre: 'huerto', camara: 'embarcadero', epoca: 1587, zarpa });
  if (t > nieta && t < semana + 0.2) { const u = lin(t, nieta, nieta + 1.2); corazon(e.mano[0] + 3, ri(e.mano[1] - 10 - u * 8)); }
};

// ── 5 · el barco se aleja: White mira la isla ──────────────────────────────────────────────────────────────────
const MAR5 = () => {
  cieloL([hex('#4a7ac8'), hex('#6a9ad8'), hex('#9ac0e8'), hex('#cce0f0')], 92);
  aguaL(92, 179, [hex('#7aaac8'), hex('#4a7aa8'), hex('#2e5a8a'), hex('#24486e')]);
};
const p5 = (t) => {
  const sail = @despedida:22.68@, vuelve = @despedida:24.15@, meses = @despedida:24.73@;
  pon(capa('mar5', MAR5));
  nubes(t, [[10, 30, 30, 1.6], [120, 52, 22, 1.1], [200, 70, 16, 0.6]], [hex('#b8c8d8'), hex('#e8eef4'), hex('#ffffff')]);
  // la isla que se aleja por la izquierda (se encoge y baja hacia el horizonte)
  const u = lin(t, P5, P5 + 4), iw = ri(lerp(70, 40, u)), ix = ri(lerp(70, 50, u));
  for (let x = ix - iw; x <= ix + iw; x++) { const hgt = ri((1 - ((x - ix) / iw) ** 2) * lerp(8, 4, u)); for (let y = 92 - hgt; y < 93; y++) ps(x, y, y < 92 - hgt + 2 ? hex('#4a6a3a') : hex('#3a5a32')); if ((x + 3) % 5 === 0 && hgt > 3) { ps(x, 92 - hgt - 1, hex('#2e4a2a')); ps(x, 92 - hgt - 2, hex('#2e4a2a')); } }
  R.rect(ix - iw + 2, 93, ix + iw - 2, 93, hex('#e8dcb0'));
  brillos(t, 96, 178, 40, hex('#d8ecf8'), 7);
  // las gaviotas que siguen al barco
  for (let k = 0; k < 3; k++) { const x = 120 + k * 22 + Math.sin(t * 0.8 + k) * 10, y = 46 + k * 7 + Math.sin(t * 1.3 + k * 2) * 4, a = Math.sin(t * 8 + k) > 0; for (const d of [-1, 1]) { ps(x + d, y - (a ? 1 : 0), C.blanco); ps(x + d * 2, y - (a ? 2 : 0), C.blanco); } ps(x, y, hex('#c8c8c8')); }
  // el barco de lado, con la popa a la izquierda: casco, alcázar, palo de mesana y la estela
  const cb = Math.sin(t * 1.4) * 1.2, B = (y) => ri(y + cb);
  for (let k = 0; k < 18; k++) { const p = (t * 0.6 + k / 18) % 1, x = 150 - p * 150, y = 152 + Math.sin(p * 9 + k) * 3 + p * 6; ps(x, y, hex('#f4f8ff')); ps(x - 1, y + 1, hex('#c8e0f0')); }
  R.poligono([[150, B(110)], [320, B(110)], [320, B(166)], [176, B(166)], [156, B(140)]], C.k);
  R.poligono([[152, B(112)], [320, B(112)], [320, B(164)], [178, B(164)], [158, B(140)]], hex('#6a4224'));
  for (let y = 116; y < 164; y += 6) R.linea(158 + Math.max(0, (y - 140) * 0.8), B(y), 319, B(y), hex('#4a2c16'));
  R.rect(154, B(112), 319, B(115), hex('#c89a3a')); R.rect(154, B(112), 319, B(112), hex('#e8c060'));
  for (const wx of [170, 190]) { R.rect(wx, B(122), wx + 9, B(130), C.k); R.rect(wx + 1, B(123), wx + 8, B(129), hex('#e8c060')); R.rect(wx + 4, B(123), wx + 4, B(129), C.k); }
  R.rect(176, B(158), 320, B(166), hex('#2a3a3a'));
  for (let x = 176; x < 320; x++) ps(x, B(166) + (x % 4 === 0 ? 1 : 0), hex('#f4f8ff'));
  // el palo de mesana con su vela latina y la bandera de San Jorge (por debajo de la zona de Atom)
  R.rect(232, B(48), 234, B(111), hex('#4a2c16'));
  R.poligono([[234, B(52)], [276, B(100)], [234, B(100)]], hex('#e8e0c8')); R.linea(234, B(52), 276, B(100), hex('#c8c0a8'));
  for (let y = 60; y < 100; y += 8) R.linea(234, B(y), 234 + (y - 52) * 0.87, B(y), hex('#d8d0b8'));
  { const fl = Math.sin(t * 7) > 0 ? 1 : 0; R.rect(214, B(52), 231, B(62), hex('#f4f0e8')); R.rect(214, B(56), 231, B(57), hex('#c8302a')); R.rect(221, B(52), 222, B(62), hex('#c8302a')); if (fl) R.rect(212, B(53), 213, B(61), hex('#f4f0e8')); }
  // el farol de popa
  R.rect(158, B(96), 164, B(108), C.k); R.rect(159, B(97), 163, B(107), hex('#f8d870')); R.linea(161, B(108), 161, B(111), C.k);
  // White en el alcázar: mira atrás, saluda y piensa en volver pronto
  const w = R.actor(EL.whiteRK, 182, B(111), t, { dir: -1, brazos: t > P5 + 0.2 && t < sail + 0.6, dedo: t > sail + 0.7 && t < vuelve, sonrisa: t > vuelve, triste: t < P5 + 0.2 });
  // la regala con sus balaustres por delante de las piernas
  R.rect(152, B(103), 319, B(105), C.k); R.rect(153, B(103), 319, B(104), hex('#8a5a30'));
  for (let x = 156; x < 320; x += 5) R.rect(x, B(105), x + 1, B(111), hex('#5a3a20'));
  if (t > meses - 0.2) { const s = lin(t, meses - 0.2, meses); const bx = 120, by = 54;
    R.rect(bx - 32, by - 14, bx + 32, by + 13, C.k); R.rect(bx - 31, by - 13, bx + 31, by + 12, hex('#f8f4e8')); R.rect(bx - 29, by - 11, bx + 29, by + 10, hex('#2a3460'));
    for (let k = 0; k < 9; k++) R.pset(bx - 26 + ri(h(k, 1, 81) * 52), by - 9 + ri(h(k, 2, 81) * 18), hex('#c8d0f0'));
    for (let i = 0; i < 4; i++) { R.rect(bx + 32 + i * 4, by + 14 + i * 3, bx + 33 + i * 4, by + 15 + i * 3, C.k); }
    const n = s >= 1 ? 3 : ri(s * 3); for (let k = 0; k < n; k++) { const mx = bx - 18 + k * 18, my = by; R.disco(mx, my, 6, hex('#f8d860')); R.disco(mx + 3, my - 2, 5, hex('#2a3460')); R.pset(mx - 4, my - 2, hex('#fff4b0')); } }
  // dos delfines que saltan junto a la estela
  for (let k = 0; k < 2; k++) { const p = ((t - P5) * 0.55 + k * 0.5) % 1; if (p < 0.45) { const u = p / 0.45, x = 40 + k * 46 + u * 26, y = 150 - Math.sin(u * Math.PI) * 14; for (let i = -4; i <= 4; i++) { const yy = y + i * i * 0.18 * (u < 0.5 ? 1 : 1); ps(x + i, yy, hex('#5a6a7a')); ps(x + i, yy + 1, hex('#8a9aaa')); } ps(x + 1, y - 2, hex('#5a6a7a')); ps(x - 5, y + 2, hex('#5a6a7a')); ps(x - 6, y + 1, hex('#5a6a7a')); } }
};

const efectos = [[@senal:1.86@, 'pop'], [@senal:5.2@, 'golpecito'], [@senal:7.4@, 'lapiz'], [@senal:10.9@, 'lapiz'], [@senal:11.5@, 'golpecito'], [@senal:12.4@, 'brillo'],
  [@despedida:14.6@, 'lapiz'], [@despedida:15.2@, 'lapiz'], [@despedida:20.1@, 'pop'], [@despedida:21.7@, 'toc'], [@despedida:22.7@, 'ola'], [@despedida:24.75@, 'brillo']];
T.rodar(E, R, [[P1, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => (t >= P2 && t < P3 ? 2026 : 1587) });
''')

E['rk-armada'] = ('La Armada', '''// RK-ARMADA (frases 15–16), 1587–1590, sin cartela. Seis planos, todos con acción y vida (la Armada y los piratas, de
// lejos y sin violencia):
// 1. Plymouth: los barcos con las velas aferradas; tres soldados hacen la instrucción con sus picas al son del tambor
//    de un muchacho y el sargento les grita («on the brink of war»);
// 2. el acantilado: el vigía ve la media luna de la Armada en el horizonte («Spain»), corre con la antorcha y enciende
//    la almenara en «the Armada»; las ovejas pastan;
// 3. el puerto artillado: llega un mensajero con la orden de la reina (sello rojo) y se la enseña al capitán («banned
//    large ships»): bocadillo con el barco tachado; los artilleros cargan el cañón («needed for defense»);
// 4. el muelle (1588): White llega con su bocadillo de dos barquitos («two small ships»), sube por la pasarela a la
//    pinaza y la vela de la pinaza baja de su verga y se hincha («set out anyway»); el barco grande no se mueve;
// 5. el mar: el barco francés llega por la izquierda («French pirates»), un bote se lleva los barriles («took their
//    cargo») y el francés se va; una flecha de puntos en el agua: dan media vuelta («turn back»);
// 6. (fondo local) el muelle de cerca: White espera junto al noray mientras pasan las estaciones: en verano, la Armada
//    se va deshecha por el horizonte; otoño (hojas), invierno (nieve, tirita) y primavera (flores); al final llega un
//    barco con las velas llenas y White levanta los brazos («found ships again»). La barra del año: 1588 → 1590.''', KIT + PIEZAS3 + r'''
const P1 = 0, P2 = @armada:3.6@, P3 = @armada:7.43@, P4 = @piratas:12.5@, P5 = @piratas:16.9@, P6 = @piratas:21.89@;

// ── 1 · Plymouth: la instrucción ────────────────────────────────────────────────────────────────────────────────
const pica = (x, y) => { R.linea(x, y + 6, x, y - 24, hex('#6a4a2a')); R.linea(x + 1, y + 6, x + 1, y - 24, hex('#8a6a40')); R.poligono([[x - 1, y - 24], [x + 1, y - 31], [x + 2, y - 24]], C.hierroL); R.pset(x, y - 25, C.hierro); };
const tambor = (x, y, t, toca) => { R.rect(x - 4, y - 3, x + 4, y + 5, C.k); R.rect(x - 3, y - 2, x + 3, y + 4, hex('#b8302a')); R.rect(x - 3, y - 2, x + 3, y - 2, hex('#f2eee2')); for (let i = -3; i <= 3; i += 2) R.pset(x + i, y + 1 + (i % 4 ? 1 : 0), hex('#e8c060')); const g = toca && Math.sin(t * 14) > 0; R.linea(x - 2, y - 3 - (g ? 0 : 4), x - 6, y - 8, hex('#d8b880')); R.linea(x + 2, y - 3 - (g ? 4 : 0), x + 6, y - 8, hex('#d8b880')); };
const p1 = (t) => {
  const brink = @armada:2.3@, guerra = @armada:2.64@;
  const g = T.inglaterra(R, t, { encuadre: 'plymouth', zarpa: 0 });
  // el muchacho del tambor
  const tb = R.actor(EL.ninoColonoRK, 44, 166, t, { dir: 1, sostiene: true, sonrisa: true });
  tambor(tb.mano[0] + 1, tb.mano[1] + 2, t, true);
  // tres soldados marchan en fila con las picas al hombro y se paran en «war»
  const u = lin(t, 0, guerra), anda = u < 1;
  for (let k = 0; k < 3; k++) { const x = ri(lerp(70 + k * 26, 110 + k * 26, u)); const s = R.actor(EL.soldadoRK, x, 162 + (k % 2) * 2, t + k * 0.1, { dir: 1, anda, sostiene: true, sorpresa: t > guerra && t < guerra + 0.4 }); pica(s.mano[0], s.mano[1]); }
  // el sargento les grita, con el dedo arriba
  const sg = R.actor(EL.soldadoRK, 202, 162, t, { dir: -1, dedo: t > brink - 0.6, enfado: t > brink - 0.3, habla: t > 0.4 && parpadeo(t, 9) });
  if (t > guerra && t < guerra + 0.9) R.bocadillo(sg.cabeza[0], sg.cabeza[1] - 4, { icono: '!' });
  T.inglaterraDelante(R, t, { encuadre: 'plymouth', zarpa: 0 });
};

// ── 2 · el acantilado: la Armada en el horizonte; el vigía enciende la almenara ─────────────────────────────────
const p2 = (t) => {
  const spain = @armada:3.7@, armada = @armada:6.17@;
  const g = T.inglaterra(R, t, { encuadre: 'armada', camara: 'horizonte', avance: 0.08 + 0.45 * lin(t, P2, P3) });
  // el fuego de la almenara: prende en «the Armada» y echa humo
  const f = lin(t, armada, armada + 0.6);
  if (f > 0) { const fx = 192, fy = 116; for (let i = -4; i <= 4; i++) { const a = (6 + f * 10) * (1 - Math.abs(i) / 5) * (0.7 + 0.3 * Math.sin(t * 12 + i * 1.9)); for (let j = 0; j < a; j++) R.pset(fx + i, fy - j, j > a * 0.7 ? hex('#f8e070') : j > a * 0.35 ? hex('#f0902a') : hex('#d03a1c')); }
    for (let k = 0; k < 10; k++) { const p = (t * 0.4 + k / 10) % 1; if (p > f * 1.2) continue; const sx = fx - p * 24 + Math.sin(p * 7 + k) * 3, sy = fy - 14 - p * 60, r = 1 + p * 4; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && (ri(sx + i) + ri(sy + j)) % 2 === 0) ps(sx + i, sy + j, p > 0.5 ? hex('#a8a29a') : hex('#6a645c')); }
    for (let k = 3; k >= 1; k--) for (let j = -10 * k; j <= 10 * k; j++) for (let i = -10 * k; i <= 10 * k; i++) if (i * i + j * j < 100 * k * k && (i + j + k) % (k + 2) === 0) { const c = R.pget(fx + i, fy - 6 + j); ps(fx + i, fy - 6 + j, mezcla(c, hex('#ffd080'), 0.16 / k)); } }
  // el vigía: ve la flota, se asusta, coge la antorcha y corre a la almenara
  const corre = ease(lin(t, spain + 0.9, armada - 0.3)), vx = ri(lerp(62, 176, corre));
  const v = R.actor(EL.soldadoRK, vx, 170, t, { dir: 1, anda: corre > 0 && corre < 1, sorpresa: t > spain && t < spain + 0.9, dedo: t > spain + 0.2 && t < spain + 0.9, sostiene: t > spain + 0.9 && t < armada + 0.3 ? (t > armada - 0.3 ? [188, 120] : true) : false, brazos: t > armada + 0.7 && t < armada + 1.3, sonrisa: t > armada + 0.6 });
  if (t > spain + 0.9 && t < armada + 0.3) { const [hx, hy] = v.mano; R.linea(hx, hy + 3, hx + 1, hy - 4, hex('#6a4a2a')); for (let j = 0; j < 4; j++) R.pset(hx + 1 + (j % 2), hy - 5 - j - (Math.sin(t * 15) > 0 ? 1 : 0), j < 2 ? hex('#f0902a') : hex('#f8e070')); }
  if (t > spain && t < spain + 0.9) R.bocadillo(v.cabeza[0], v.cabeza[1] - 4, { icono: '!' });
  T.inglaterraDelante(R, t, { encuadre: 'armada', camara: 'horizonte' });
};

// ── 3 · el puerto artillado: la orden de la reina ───────────────────────────────────────────────────────────────
const p3 = (t) => {
  const banned = @armada:7.61@, grandes = @armada:8.31@, defensa = @armada:10.61@;
  const g = T.inglaterra(R, t, { encuadre: 'armada', estacion: 0.04 });
  // el artillero carga el cañón de la derecha con una bala («defense»)
  const carga = lin(t, defensa - 0.6, defensa + 0.3);
  const ar = R.actor(EL.soldadoRK, 226, 162, t, { dir: -1, sostiene: t < defensa + 0.3 ? [ri(lerp(232, 216, carga)), ri(lerp(150, 146, carga))] : false, sonrisa: t > defensa + 0.4 });
  if (t < defensa + 0.3) R.disco(ar.mano[0] - 2, ar.mano[1] - 1, 2, hex('#3a3a42'));
  // el capitán ve la orden y se lleva un disgusto
  const cap = R.actor(EL.marineroRK, 158, 164, t, { dir: -1, sorpresa: t > banned && t < banned + 0.5, triste: t > banned + 0.5, dedo: t > grandes && t < grandes + 1.0 });
  // el mensajero llega con la orden de la reina (sello rojo) y la levanta
  const llega = ease(lin(t, P3, banned - 0.1)), mx = ri(lerp(10, 118, llega));
  const m = R.actor(EL.soldadoRK, mx, 164, t, { dir: 1, anda: llega > 0 && llega < 1, sostiene: llega >= 1 ? [134, 132] : true, habla: t > banned && t < grandes + 0.6 && parpadeo(t) });
  { const [hx, hy] = m.mano, abierta = llega >= 1; if (abierta) { R.rect(hx - 2, hy - 12, hx + 10, hy + 2, C.k); R.rect(hx - 1, hy - 11, hx + 9, hy + 1, hex('#f2e8cc')); for (let r = 0; r < 3; r++) R.linea(hx + 1, hy - 8 + r * 3, hx + 7, hy - 8 + r * 3, hex('#8a7a5a')); R.disco(hx + 4, hy, 2, hex('#c8302a')); R.pset(hx + 4, hy, hex('#e86050')); } else { R.rect(hx - 1, hy - 6, hx + 2, hy + 2, C.k); R.rect(hx, hy - 5, hx + 1, hy + 1, hex('#f2e8cc')); R.pset(hx + 2, hy - 1, hex('#c8302a')); } }
  // el bocadillo del capitán: el barco grande, tachado
  if (t > grandes - 0.2 && t < defensa) { const bx = cap.cabeza[0] - 6, by = cap.cabeza[1] - 24; globo(bx, by, 18, 14, 1); barcoG(bx, by + 4); const s = lin(t, grandes, grandes + 0.3); if (s > 0) { const L = ri(s * 22); for (let i = 0; i <= L; i++) for (let w = 0; w < 2; w++) { R.pset(bx - 11 + i, by - 11 + i + w, hex('#d02a2a')); R.pset(bx + 11 - i, by - 11 + i + w, hex('#d02a2a')); } } }
  T.inglaterraDelante(R, t, { encuadre: 'armada', estacion: 0.04 });
};

// ── 4 · el muelle: dos barquitos y White se embarca ─────────────────────────────────────────────────────────────
const p4 = (t) => {
  const dos = @piratas:14.92@, sube = @piratas:15.5@, sale = @piratas:15.97@;
  const velas = lin(t, sale, sale + 0.9);
  const g = T.inglaterra(R, t, { encuadre: 'plymouth', camara: 'muelle', velas: 0 });
  // la vela de la pinaza baja de la verga y se hincha («set out»)
  if (velas > 0) { const bob = Math.sin(t * 1.6 + 2) * 2.3, vy = ri(122 + bob), hh = ri(velas * 20); for (let y = vy + 1; y <= vy + hh; y++) { const comba = Math.sin((y - vy) / Math.max(1, hh) * Math.PI) * 3; for (let x = 258; x <= ri(293 + comba); x++) R.pset(x, y, x > 290 ? C.lonaKS : (x + y) % 7 === 0 ? C.lonaKS : C.lonaK); } if (hh > 10) { R.rect(274, vy + 3, 276, vy + hh - 2, C.sanJorge); R.rect(262, vy + ri(hh / 2) - 1, 290, vy + ri(hh / 2), C.sanJorge); } }
  const [x0p, y0p, x1p, y1p] = g.pasarela, [cx0, cx1, cy] = g.cubierta;
  // un marinero en la cubierta de la pinaza tira de la driza
  R.actor(EL.marineroRK, cx1 - 18, cy, t, { dir: -1, sostiene: [cx1 - 22, ri(cy - 22 + Math.sin(t * 6) * 3 * (velas > 0 && velas < 1 ? 1 : 0))], sonrisa: t > sale });
  // White llega por el muelle, piensa en los dos barquitos, sube por la pasarela y saluda desde la cubierta
  const a = ease(lin(t, P4, dos - 0.2)), b = lin(t, sube, sube + 0.7);
  let x, y; if (b <= 0) { x = lerp(-16, x0p - 8, a); y = 166; } else if (b < 1) { x = lerp(x0p - 8, x1p - 6, b); y = lerp(y0p, y1p, b); } else { x = cx0 + 8; y = cy; }
  const w = R.actor(EL.whiteRK, ri(x), ri(y), t, { dir: 1, anda: (a > 0 && a < 1) || (b > 0 && b < 1), sonrisa: t > dos, brazos: t > sale + 0.3 });
  T.inglaterraDelante(R, t, { encuadre: 'plymouth', camara: 'muelle', velas: 0 });
  if (t > dos - 0.1 && t < sube + 0.2) { globo(w.cabeza[0] + 22, w.cabeza[1] - 22, 32, 14, -1); barcoG(w.cabeza[0] + 8, w.cabeza[1] - 18); barcoG(w.cabeza[0] + 36, w.cabeza[1] - 18); }
};

// ── 5 · el mar: los piratas franceses se llevan la carga ────────────────────────────────────────────────────────
const p5 = (t) => {
  const french = @piratas:17.3@, took = @piratas:18.8@, vuelta = @piratas:20.5@;
  const piratas = lin(t, P5, french + 0.4) * (1 - lin(t, vuelta - 0.3, @piratas:21.4@));
  const g = T.mar(R, t, { encuadre: 'travesia', barcos: 2, piratas: Math.max(0.001, piratas) });
  // el bote con los barriles va del barco de White al francés
  const u = lin(t, took - 0.2, vuelta - 0.4);
  if (u > 0 && u < 1) { const bx = ri(lerp(150, 70, u)), by = ri(lerp(170, 154, u) + Math.sin(t * 2.4) * 1);
    for (let k = 0; k < 5; k++) ps(bx + 20 + k * 3, by + 3 + (k % 2), hex('#f4f8ff'));
    R.poligono([[bx - 18, by - 3], [bx + 18, by - 3], [bx + 14, by + 3], [bx - 14, by + 3]], C.k); R.poligono([[bx - 17, by - 2], [bx + 17, by - 2], [bx + 13, by + 2], [bx - 13, by + 2]], hex('#3a2a20')); R.rect(bx - 16, by - 2, bx + 16, by - 2, hex('#6a4a30'));
    for (const i of [-10, -4]) { R.rect(bx + i - 3, by - 10, bx + i + 3, by - 3, C.k); R.rect(bx + i - 2, by - 9, bx + i + 2, by - 3, hex('#8a5a30')); R.rect(bx + i - 2, by - 7, bx + i + 2, by - 7, C.hierro); R.rect(bx + i - 2, by - 4, bx + i + 2, by - 4, C.hierro); }
    for (const i of [4, 12]) { const r = Math.sin(t * 5 + i) > 0; R.rect(bx + i - 1, by - 8, bx + i + 1, by - 3, hex('#2a2a4a')); R.rect(bx + i - 1, by - 11, bx + i + 1, by - 9, hex('#f0c090')); R.rect(bx + i - 1, by - 12, bx + i + 1, by - 12, hex('#5a2a2a')); R.linea(bx + i, by - 5, bx + i + (r ? 6 : 3), by + (r ? 4 : 5), hex('#c8a070')); } }
  // los barriles que quedaban en la cubierta, uno a uno, desaparecen
  // la flecha de puntos en el agua: media vuelta hacia Inglaterra (a la derecha)
  const v = lin(t, vuelta, vuelta + 0.9);
  if (v > 0) { const n = ri(v * 40); for (let k = 0; k < n; k++) { const f = k / 40, a = f * Math.PI * 1.15, x = 252 + Math.sin(a) * 26 - (f > 0.87 ? (f - 0.87) * 120 : 0), y = 166 - Math.cos(a) * 9; if (k % 3 !== 2) { R.rect(ri(x), ri(y), ri(x) + 2, ri(y) + 1, C.k); R.rect(ri(x), ri(y), ri(x) + 1, ri(y), hex('#f8f4e8')); } }
    if (n >= 40) { R.poligono([[228, 168], [236, 162], [236, 174]], C.k); R.poligono([[230, 168], [235, 164], [235, 172]], hex('#f8f4e8')); } }
};

// ── 6 · el muelle de cerca: pasan las estaciones ────────────────────────────────────────────────────────────────
const est = (t) => lin(t, @piratas:23.4@, @piratas:27.6@);   // 0 verano → 1/3 otoño → 2/3 invierno → 1 primavera
const MUELLE6 = () => {
  // el muro del muelle: sillares con juntas y verdín (y 140–180)
  for (let y = 138; y < 180; y++) for (let x = 0; x < W; x++) { const fila = Math.floor((y - 138) / 7), off = fila % 2 ? 9 : 0; let c = h(Math.floor((x + off) / 18), fila, 71) > 0.5 ? hex('#8a8478') : hex('#7a7468'); if ((y - 138) % 7 === 0 || (x + off) % 18 === 0) c = hex('#4a463e'); if (h(x, y, 72) > 0.95) c = hex('#a8a294'); if (y > 172 && h(x, y, 73) > 0.6) c = hex('#4a6a3a'); R.pset(x, y, c); }
  R.rect(0, 136, 319, 139, hex('#9a9488')); R.rect(0, 136, 319, 136, hex('#c8c2b4'));
  // argollas de hierro, regueros de óxido y verdín, una escalerilla de hierro y un farol en su poste
  for (const x of [52, 196, 300]) { R.anillo(x, 150, 3, C.k); R.anillo(x, 150, 2, hex('#6a6a72')); for (let y = 154; y < 176; y++) if (h(x, y, 78) > 0.3) R.pset(x + (y % 2), y, hex('#8a5a3a')); }
  for (let k = 0; k < 14; k++) { const x = ri(h(k, 1, 79) * 316), L = 6 + ri(h(k, 2, 79) * 14); for (let y = 140; y < 140 + L; y++) if (h(x, y, 80) > 0.35) R.pset(x, y, hex('#5a7a4a')); }
  R.rect(232, 140, 233, 179, hex('#3a3a42')); R.rect(244, 140, 245, 179, hex('#3a3a42')); for (let y = 144; y < 180; y += 6) R.rect(232, y, 245, y, hex('#4a4a52'));
  R.rect(296, 96, 297, 136, hex('#2a2a30')); R.rect(292, 88, 301, 96, C.k); R.rect(293, 89, 300, 95, hex('#f8d870')); R.rect(291, 87, 302, 87, hex('#3a3a42'));
};
const p6 = (t) => {
  const e = est(t), armada = @piratas:21.53@, found = @piratas:25.37@;
  const llega = lin(t, found + 0.4, P6 + 6.6);
  // el cielo de cada estación
  const sk = e < 0.25 ? [hex('#4a7ac8'), hex('#9ac0e8')] : e < 0.5 ? [hex('#8a7a8a'), hex('#e8b880')] : e < 0.8 ? [hex('#7a8494'), hex('#c8ccd4')] : [hex('#6a9ad8'), hex('#c8e0f0')];
  cieloL([sk[0], mezcla(sk[0], sk[1], 0.5), sk[1]], 96);
  nubes(t, [[30, 30, 28, 1.4], [170, 50, 22, 0.9], [250, 74, 16, 0.5]], e > 0.4 && e < 0.8 ? [hex('#8a8e98'), hex('#b8bcc4'), hex('#d8dce4')] : [hex('#b8c8d8'), hex('#e8eef4'), hex('#ffffff')]);
  // la costa del fondo, con la ciudad (tejados y la torre de la iglesia)
  for (let x = 0; x < W; x++) { const y = 88 + ri(Math.sin(x * 0.03) * 3); R.rect(x, y, x, 96, e > 0.5 && e < 0.8 ? hex('#c8ccd0') : hex('#5a7a4a')); }
  for (let k = 0; k < 9; k++) { const x = 130 + k * 13, y = 86 - (k % 3) * 2; R.rect(x, y, x + 9, 95, hex('#e8dcc0')); R.poligono([[x - 1, y], [x + 4, y - 5], [x + 10, y]], hex('#8a3a2a')); R.pset(x + 3, y + 3, hex('#3a3040')); }
  R.rect(178, 66, 184, 86, hex('#a8a090')); R.poligono([[177, 66], [181, 58], [185, 66]], hex('#6a6a70'));
  aguaL(97, 136, [hex('#6a9ab8'), hex('#4a7aa0'), hex('#3a6488')]);
  brillos(t, 99, 134, 22, hex('#d8ecf8'), 5);
  // en verano, la Armada deshecha se va por el horizonte
  if (t < @piratas:23.6@) { for (let k = 0; k < 6; k++) { const x = ri(116 + k * 13 - (t - P6) * 10 + Math.sin(k) * 3), y = 100 - (k % 2); if (x < 58) continue; R.rect(x - 3, y, x + 3, y + 1, hex('#3a2a20')); R.linea(x, y - 1, x, y - 7, hex('#3a2a20')); R.rect(x - 2, y - 6, x + 2, y - 2, hex('#e8e0c8')); R.linea(x - 2, y - 6, x + 2, y - 2, hex('#b83a2a')); R.linea(x + 2, y - 6, x - 2, y - 2, hex('#b83a2a')); }
    nubeL(ri(140 - (t - P6) * 8), 74, 22, [hex('#4a4e58'), hex('#6a6e78'), hex('#8a8e98')]); }
  // el barco amarrado (velas aferradas) y, al final, el que llega con las velas llenas
  if (llega > 0) galeon(ri(lerp(360, 276, ease(llega))), 106, 0.75, t, { velas: 1, dir: -1 });
  galeon(232, 132, 1.25, t, { velas: 0, dir: -1 });
  // un bote amarrado que cabecea
  { const cb = ri(Math.sin(t * 2) * 1); R.rect(66, 128 + cb, 100, 133 + cb, C.k); R.rect(67, 129 + cb, 99, 132 + cb, hex('#6a8a5a')); R.rect(67, 129 + cb, 99, 129 + cb, hex('#8aaa6a')); R.linea(80, 131 + cb, 70, 124 + cb, hex('#c8a870')); R.linea(66, 130, 56, 137, hex('#c8b080')); for (let i = 0; i < 6; i++) if ((ri(t * 4) + i) % 2) R.pset(64 + i * 7, 134 + cb, hex('#d8ecf8')); }
  // el árbol del muelle (izquierda), según la estación
  R.rect(22, 70, 28, 140, C.k); R.rect(23, 70, 27, 140, hex('#5a4030')); R.linea(25, 90, 10, 70, hex('#5a4030')); R.linea(25, 84, 42, 64, hex('#5a4030'));
  const copa = e < 0.25 ? [hex('#3a6a2a'), hex('#5a8a3a')] : e < 0.5 ? [hex('#a8501a'), hex('#d8902a')] : e < 0.8 ? null : [hex('#e8a0b8'), hex('#f8d0dc')];
  if (copa) for (const [cx, cy, r] of [[14, 64, 14], [36, 58, 15], [26, 48, 13]]) for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { if (((x - cx) ** 2 + (y - cy) ** 2) > r * r * (0.85 + h(x, y, 74) * 0.3)) continue; if (y <= 21 && x >= 16) continue; R.pset(x, y, h(x, y, 75) > 0.6 ? copa[1] : copa[0]); }
  else { R.linea(10, 70, 4, 56, hex('#5a4030')); R.linea(42, 64, 50, 52, hex('#5a4030')); R.linea(28, 70, 30, 50, hex('#5a4030')); for (const [x, y] of [[4, 56], [50, 52], [30, 50], [10, 70], [42, 64]]) R.rect(x - 2, y - 1, x + 2, y, hex('#f8f8ff')); }
  // el muelle (capa), con la nieve encima en invierno
  pon(capa('muelle6', MUELLE6), 136, 179);
  if (e > 0.5 && e < 0.8) for (let x = 0; x < W; x++) { R.pset(x, 135, hex('#f4f6ff')); R.pset(x, 136, hex('#e8ecf8')); if (h(x, 1, 76) > 0.5) R.pset(x, 134, hex('#f4f6ff')); }
  // el noray con el cabo del barco, una caja y un rollo de cuerda
  R.rect(150, 122, 160, 136, C.k); R.rect(151, 123, 159, 136, hex('#3a3a42')); R.rect(149, 121, 161, 123, C.k); R.rect(150, 122, 160, 122, hex('#5a5a64'));
  R.linea(160, 128, 208, 132, hex('#c8b080')); R.linea(160, 129, 208, 133, hex('#8a7450'));
  R.rect(260, 120, 282, 136, C.k); R.rect(261, 121, 281, 136, hex('#8a6a40')); R.rect(261, 121, 281, 123, hex('#a88a58')); R.rect(270, 121, 271, 136, hex('#5a4028'));
  for (let r = 7; r > 1; r -= 2) R.anillo(232, 132, r, hex('#c8b080'));
  // lo que cae: hojas en otoño, copos en invierno, pétalos en primavera
  const cae = e > 0.25 && e < 0.5 ? [hex('#d8902a'), hex('#a8501a')] : e >= 0.5 && e < 0.8 ? [hex('#ffffff'), hex('#e0e8f8')] : e >= 0.8 ? [hex('#f8c0d0'), hex('#ffffff')] : null;
  if (cae) for (let k = 0; k < 40; k++) { const p = (t * (0.2 + h(k, 1, 77) * 0.15) + h(k, 2, 77)) % 1, x = h(k, 3, 77) * 330 + Math.sin(t * 2 + k) * 6 - p * 20, y = 22 + p * 156; ps(x, y, cae[k % 2]); if (k % 3 === 0) ps(x + 1, y, cae[k % 2]); }
  // gaviotas
  for (let k = 0; k < 2; k++) { const x = (t * 10 + k * 140) % 340 - 10, y = 60 + k * 14 + Math.sin(t * 1.5 + k) * 3, a = Math.sin(t * 8 + k) > 0; for (const d of [-1, 1]) { ps(x + d, y - (a ? 1 : 0), C.blanco); ps(x + d * 2, y - (a ? 2 : 0), C.blanco); } }
  // White espera junto al noray: mira la Armada que se va, se quita una hoja, tirita y al final ve el barco
  const vio = t > found + 1.6;
  R.actor(EL.whiteRK, 128, 138, t, { dir: vio ? 1 : (t < @piratas:23.0@ ? 1 : -1), sonrisa: t < @piratas:23.0@ || vio, triste: !vio && t > @piratas:23.0@, dedo: (t > armada && t < armada + 1.0) || (e > 0.3 && e < 0.42), salto: e > 0.55 && e < 0.78 && Math.sin(t * 20) > 0 ? 1 : 0, brazos: vio && t > found + 2.0, sorpresa: t > found + 1.5 && t < found + 2.0 });
};

const efectos = [[@armada:1.0@, 'toc'], [@armada:2.64@, 'toc'], [@armada:6.2@, 'whoosh'], [@armada:7.7@, 'papel'], [@armada:8.4@, 'pop'], [@armada:10.9@, 'golpecito'],
  [@piratas:14.95@, 'pop'], [@piratas:16.0@, 'rafaga'], [@piratas:17.4@, 'whoosh'], [@piratas:19.2@, 'chof'], [@piratas:24.0@, 'viento'], [@piratas:27.6@, 'campana']];
T.rodar(E, R, [[P1, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: (t) => (t < P2 ? 1587 : t < @piratas:24.4@ ? 1588 : t < @piratas:26.6@ ? 1589 : 1590) });
''')

# @@ESCENAS@@

for _k in list(E):
    _t, _c, _b = E[_k]
    E[_k] = (_t, _c, _en(_k, _b))
