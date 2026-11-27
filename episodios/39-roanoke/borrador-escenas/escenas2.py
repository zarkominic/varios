"""Borrador de escenas del ep39 (grupo S2): rk-soldados y rk-familias, ya con el movimiento.
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

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['rk-soldados'] = ('Los soldados', '''// RK-SOLDADOS (frases 6–7), 1585–1586. Seis planos, todos con acción y vida de fondo:
// 1. (fondo local) 1585: cuatro soldados levantan el fuerte de tierra: uno cava y echa la tierra al terraplén, otro trae
//    una estaca al hombro y se la pasa al de arriba, que la clava a mazazos («1585», «real attempt»); el cuarto empuja la
//    carretilla; por la playa sube una fila de figuritas con casco desde los botes («more than a hundred men»: los
//    cascos brillan en «soldiers»); la bandera de San Jorge ondea en la tienda, humo del fuego, gaviotas y barcos;
// 2. (fondo local) White llega con su caja de pinturas («painter»), la abre y pinta en el caballete el pueblo de esteras
//    de la otra orilla; pasa una garza («everything they saw») y aparece también en la acuarela; detrás, la gente del
//    pueblo muele maíz, cuida el fuego y una canoa cruza;
// 3. museo sala: la conservadora trae la acuarela enmarcada y la pone en un atril («watercolors»), la mesa de luz se
//    enciende («still kept») y el flash de la cámara salta en «British Museum»; una visitante se acerca y se asombra;
// 4. huerto seco (1586): un soldado sacude un saco vacío del granero y sale una polilla («It went badly»), otro mira su
//    cuenco vacío («ran short of food»); un vecino de Roanoke les trae pescado y maíz («neighbors»), pero cuando le piden
//    más niega con la cabeza y se va con su cesta («fell apart»);
// 5. el mar: la flota de Drake asoma en el horizonte («1586», «Francis Drake») y un bote con barriles rema hacia la isla
//    («to help them»);
// 6. la tormenta: el cable se parte («carried off») y el barco se va a la deriva; los botes con los soldados reman hacia
//    el barco de Drake («sailing home with him»).''', KIT + r'''
const P2 = @pintor:7.0@, P3 = @pintor:11.5@, P4 = @mal:17.9@, P5 = @mal:24.3@, P6 = @mal:28.0@;
const SOLD = '#5e6a44';

// ── 1 · el fuerte de tierra, 1585 ───────────────────────────────────────────────────────────────────────────────────
const fondo1 = () => capa('f1', () => {
  cieloL([hex('#4a8ad0'), hex('#64a0dc'), hex('#82b6e6'), hex('#a4cbee'), hex('#c8e0f2')], 66);
  sol(222, 36, 6, hex('#fff2b0'), hex('#d8ecf8'));
  // la otra orilla: monte bajo de pinos
  for (let x = 0; x < W; x++) { const top = 60 + ri(Math.sin(x * 0.05) * 2 + h(x, 1) * 3); for (let y = top; y <= 70; y++) R.pset(x, y, y < top + 2 ? hex('#4a6a5a') : hex('#3a5a4a')); }
  for (let x = 4; x < W; x += 7 + ri(h(x, 2) * 5)) pino(x, 68, 8 + ri(h(x, 3) * 6), [hex('#2e4a3e'), hex('#3a5a4a'), hex('#4a6a58')]);
  aguaL(70, 97, [hex('#7ab0b0'), hex('#5a9a9a'), C.estrecho, C.estrechoS]);
  // la playa y la arena mojada
  for (let x = 0; x < W; x++) for (let y = 96; y <= 106; y++) R.pset(x, y, y < 98 ? hex('#a89a70') : h(x, y) > 0.8 ? C.arenaS : C.arena);
  // el bosque de la derecha (pinos y robles con musgo), con la tienda y la bandera
  for (const [x, a] of [[198, 40], [214, 50], [232, 44], [250, 52], [268, 46], [286, 54], [304, 48], [318, 50]]) pino(x, 116, a);
  roble(240, 118, 13); roble(300, 120, 12);
  // el suelo del claro: hierba seca y arena, con el camino pisado de la playa al fuerte
  prado(0, 106, 319, 179, [hex('#8a9050'), hex('#b8b074'), hex('#d4c896')], { sem: 3, matas: 46, flores: 8, piedras: 9, brizna: hex('#9aa858') });
  R.poligono([[0, 150], [40, 140], [70, 146], [110, 176], [150, 180], [100, 180], [60, 156], [30, 152], [0, 160]], hex('#c8b488'));
  for (let k = 0; k < 40; k++) R.pset(ri(20 + h(k, 1) * 100), ri(146 + h(k, 2) * 30), hex('#a89470'));
  // la tienda de lona con su mástil
  R.poligono([[262, 132], [280, 98], [298, 132]], C.lonaKS); R.poligono([[264, 131], [280, 100], [292, 131]], C.lonaK);
  for (let k = 0; k < 4; k++) R.linea(280, 100, 268 + k * 7, 131, C.lonaKS);
  R.poligono([[276, 131], [280, 118], [284, 131]], hex('#4a3a28')); R.rect(279, 72, 280, 99, C.troncoS);
  R.linea(262, 132, 254, 136, hex('#8a7a5a')); R.linea(298, 132, 306, 136, hex('#8a7a5a'));
  // el terraplén: tierra apisonada, con la zanja delante y la empalizada a medias
  for (let x = 50; x <= 252; x++) { const crest = 118 + ri(Math.sin(x * 0.07) * 1.5), ext = Math.min(x - 50, 252 - x), ini = ext < 10 ? crest + (10 - ext) : crest; for (let y = ini; y <= 146; y++) { const f = (y - crest) / 18; let c = y < crest + 2 ? hex('#8a9a50') : y < crest + 5 ? hex('#a08058') : y < 136 ? (h(x, y, 1) > 0.78 ? hex('#5a3e26') : h(x, y, 2) > 0.8 ? hex('#a08058') : (f < 0.5 ? hex('#8a6a44') : hex('#7a5a3a'))) : y < 140 ? hex('#3a2818') : (h(x, y, 3) > 0.7 ? hex('#5a3e26') : hex('#6a4a2e')); if (y > 126 && y < 136 && (x + y * 3) % 23 === 0) c = hex('#5a3e26'); if (y >= 136 && y < 140 && h(x, y, 4) > 0.8) c = hex('#4a6a7a'); R.pset(x, y, c); } }
  for (let k = 0; k < 30; k++) { const x = ri(54 + h(k, 7) * 194), y = ri(124 + h(k, 8) * 10); R.pset(x, y, hex('#5a3e26')); R.pset(x + 1, y, hex('#a08058')); }
  for (let x = 52; x <= 250; x += 2) if (h(x, 9) > 0.55) R.pset(x, 146, hex('#8a9a50'));
  for (let x = 56; x <= 246; x += 3) if (h(x, 4) > 0.4) mata(x, 119, 0, hex('#7a8a40'), 3);
  // las estacas ya clavadas (hasta x 162) y las que faltan
  for (let x = 58; x <= 162; x += 6) { const top = 92 + ri(h(x, 5) * 4); for (let y = top; y <= 121; y++) for (let i = 0; i < 4; i++) { let c = i === 0 ? C.troncoS : i === 3 ? C.troncoL : C.tronco; if (h(x + i, y, 6) > 0.85) c = C.troncoS; R.pset(x + i, y, c); } R.pset(x + 1, top - 1, C.tronco); R.pset(x + 2, top - 1, C.troncoL); R.pset(x + 1, top - 2, C.troncoS); R.linea(x, 110, x + 5, 110, hex('#5a4a30')); }
  // el montón de estacas, el tajo con el hacha y unos sacos
  for (let k = 0; k < 4; k++) { const y = 156 - k * 3, x0 = 248 + k * 2; R.rect(x0, y, x0 + 34 - k * 4, y + 2, C.troncoS); R.rect(x0, y, x0 + 34 - k * 4, y + 1, C.tronco); R.pset(x0 + 34 - k * 4, y, C.troncoL); R.pset(x0 + 35 - k * 4, y + 1, C.troncoL); }
  R.rect(300, 162, 312, 170, C.troncoS); R.rect(301, 162, 311, 163, C.troncoL); R.linea(304, 161, 309, 152, C.troncoL); R.rect(307, 151, 311, 154, C.hierro);
  for (const [x, y] of [[20, 140], [30, 142]]) { R.disco(x, y, 5, hex('#b8a478')); R.disco(x - 1, y - 1, 4, hex('#d0bc8c')); R.rect(x - 1, y - 6, x + 1, y - 5, hex('#8a7a50')); }
});
// la bandera de San Jorge que ondea en el mástil de la tienda
const bandera = (x, y, t) => { for (let i = 0; i < 14; i++) { const o = ri(Math.sin(t * 6 - i * 0.6) * 1.2 * (i / 14)); for (let j = 0; j < 9; j++) { const c = (i >= 5 && i <= 7) || (j >= 4 && j <= 5) ? C.sanJorge : i > 10 && (j + ri(t * 4)) % 3 === 0 ? C.lonaKS : C.lonaK; R.pset(x + i, y + j + o, c); } } };
// la estaca: un rollizo aguzado con su corteza; ang: 0 tumbada (al hombro), 1 de pie
const estaca = (x, y, de = 0) => { if (de) { for (let j = 0; j < 26; j++) for (let i = 0; i < 4; i++) R.pset(x + i, y + j, i === 0 ? C.troncoS : i === 3 ? C.troncoL : C.tronco); R.pset(x + 1, y - 1, C.tronco); R.pset(x + 2, y - 1, C.troncoL); R.pset(x + 1, y - 2, C.troncoS); return; }
  for (let i = 0; i < 24; i++) for (let j = 0; j < 3; j++) R.pset(x + i, y + j - ri(i * 0.12), j === 0 ? C.troncoL : j === 2 ? C.troncoS : C.tronco); R.pset(x + 24, y - 2, C.troncoL); R.pset(x + 25, y - 2, C.troncoS); };
const pala = (hx, hy, ang) => { const c = Math.cos(ang), s = Math.sin(ang), x1 = ri(hx + c * 9), y1 = ri(hy + s * 9), x0 = ri(hx - c * 5), y0 = ri(hy - s * 5); R.linea(x0, y0, x1, y1, C.troncoS); R.linea(x0 + 1, y0, x1 + 1, y1, C.troncoL); R.disco(x1, y1, 2, C.hierro); R.pset(x1 - 1, y1 - 1, C.hierroL); R.rect(x0 - 1, y0, x0 + 1, y0, C.troncoS); };
const mazo = (hx, hy, alto) => { R.linea(hx, hy, hx + 2, hy - 7 * alto - 2, C.troncoS); R.rect(hx - 1, ri(hy - 7 * alto - 6), hx + 5, ri(hy - 7 * alto - 2), C.k); R.rect(hx, ri(hy - 7 * alto - 5), hx + 4, ri(hy - 7 * alto - 3), C.tronco); R.pset(hx + 4, ri(hy - 7 * alto - 5), C.troncoL); };
const p1 = (t) => {
  R.copiar(fondo1());
  nubes(t, [[24, 36, 18, 1.4], [120, 46, 26, 0.9], [196, 30, 14, 1.8], [-30, 54, 20, 1.2]], [hex('#a8c4e0'), hex('#e8f0f8'), hex('#ffffff')]);
  brillos(t, 72, 95, 40, hex('#d8f0ec'), 4);
  for (const [x, y, k] of [[150, 52, 0], [178, 58, 2]]) R.gaviota(ri(x + t * 7) % 260, y + ri(Math.sin(t + k) * 2), t, k);
  // los barcos fondeados y los botes que traen a los hombres
  nave(40, 84, t, { velas: 0 }); nave(112, 80, t, { velas: 0, s: 0.8 });
  bote(ri(lerp(70, 26, lin(t, 0, 5))), 96, t, { n: 4, casco: true, dir: -1 }); bote(ri(lerp(130, 92, lin(t, 1, 7))), 90, t, { n: 3, casco: true, dir: -1 });
  bandera(281, 72, t);
  fuego(36, 166, t, 6, 34);
  // «more than a hundred men»: la fila de figuritas con casco que sube de la playa y entra detrás de la empalizada
  const hombres = @pintor:4.5@, soldados = @pintor:6.35@;
  for (let k = 0; k < 14; k++) { const x = ri(-8 + (t - hombres + 1.4) * 22 - k * 7); if (x < -6 || x > 170) continue; figurita(x, 104, t, { anda: true, casco: k % 4 !== 3, brilla: t > soldados + k * 0.04 && t < soldados + k * 0.04 + 0.25, ropa: k % 3 ? hex('#8a2a2a') : hex('#5e6a44') }); }
  // el de arriba clava estacas a mazazos (y recoge la nueva que le pasan)
  const pasa = @pintor:3.42@, planta = @pintor:3.9@;
  const golpes = [0.8, 1.6, 2.4, planta + 0.7, planta + 1.5, planta + 2.3], g = golpes.reduce((a, gt) => (t >= gt - 0.35 && t < gt + 0.15 ? 1 - Math.abs(t - gt + 0.1) / 0.25 : a), 0);
  const hunde = golpes.filter((gt) => t > gt).length;
  estaca(166, ri(92 + Math.min(3, hunde) * 0.7), 1);
  if (t > planta) estaca(172, ri(90 + Math.max(0, hunde - 3) * 0.8), 1);
  const s3 = R.actor(EL.soldadoRK, 150, 121, t, { dir: 1, sostiene: t > pasa && t < planta ? [170, 104] : [164, 111], sonrisa: t > planta + 2.6 });
  if (!(t > pasa && t < planta)) mazo(s3.mano[0], s3.mano[1], Math.max(0, 1 - g * 1.4));
  // el de la estaca: llega del montón con ella al hombro y se la pasa al de arriba
  const ida = lin(t, 0.3, 3.1), x2 = ri(lerp(300, 182, ida));
  const s2 = R.actor(EL.soldadoRK, x2, 150, t, { dir: -1, anda: ida > 0 && ida < 1, sostiene: t < planta ? (t > pasa - 0.2 ? [x2 - 4, 120] : true) : false, habla: t > pasa - 0.6 && t < pasa && parpadeo(t), sonrisa: t > planta });
  if (t < pasa) estaca(s2.mano[0] - 12, s2.mano[1] - 2, 0);
  else if (t < planta) { const hx = ri(lerp(s2.mano[0], s3.mano[0], lin(t, pasa, pasa + 0.3))), hy = ri(lerp(s2.mano[1], s3.mano[1], lin(t, pasa, pasa + 0.3))); estaca(hx - 1, hy - 18, 1); }
  // el que cava y echa la tierra al terraplén
  const fase = ((t + 0.3) % 1.3) / 1.3, baja = fase < 0.45, x1 = 92;
  const s1 = R.actor(EL.soldadoRK, x1, 170, t, { dir: 1, sostiene: baja ? [x1 + 18, 165] : [x1 + 16, 150 + ri((fase - 0.45) * 8)], sonrisa: t > 5.5 });
  pala(s1.mano[0], s1.mano[1], baja ? 1.1 : -0.3);
  if (fase > 0.7) { const u = (fase - 0.7) / 0.3; R.disco(ri(lerp(x1 + 24, 128, u)), ri(lerp(148, 136, u) - Math.sin(u * Math.PI) * 10), 1, hex('#6a4a2e')); }
  R.disco(114, 172, 4, hex('#4a3420')); R.rect(110, 172, 118, 174, hex('#4a3420'));
  for (let k = 0; k < 5; k++) R.pset(120 + k * 2, 170 - (k % 2), hex('#7a5a3a'));
  // el de la carretilla
  const v = lin(t, 0.6, 3.8), x4 = ri(lerp(-20, 44, v)), vuelca = lin(t, 4.1, 4.6) - lin(t, 5.6, 6.0);
  const s4 = R.actor(EL.soldadoRK, x4, 172, t, { dir: 1, anda: v > 0 && v < 1, sostiene: [x4 + 19, 163], habla: t > 5.0 && t < 5.8 && parpadeo(t) });
  const bx = x4 + 18, by = 168 - ri(vuelca * 3);
  R.linea(s4.mano[0], s4.mano[1], bx + 6, by - 1, C.troncoS); R.rect(bx + 4, by - 6, bx + 18, by + 1, C.k); R.rect(bx + 5, by - 5, bx + 17, by, C.tronco); R.rect(bx + 5, by - 5, bx + 17, by - 5, C.troncoL);
  if (vuelca < 0.5) for (let i = 6; i < 17; i++) R.pset(bx + i, by - 6 - (i % 3 === 0 ? 1 : 0), hex('#6a4a2e'));
  R.disco(bx + 18, 171, 3, C.k); R.disco(bx + 18, 171, 2, C.troncoS); R.pset(bx + 18 + ri(Math.cos(t * 6) * 2), 171 + ri(Math.sin(t * 6) * 2), C.troncoL);
  if (vuelca > 0.3) for (let k = 0; k < 6; k++) R.pset(bx + 20 + k, 170 + (k % 2), hex('#6a4a2e'));
  // por delante, matas del claro
  for (const x of [6, 14, 150, 158, 228, 236]) mata(x, 179, t, hex('#7a8a40'), 6, hex('#9aa858'));
};

// ── 2 · White pinta el pueblo de la otra orilla ──────────────────────────────────────────────────────────────────
const fondo2 = () => capa('f2', () => {
  cieloL([hex('#5a92d0'), hex('#78aade'), hex('#9cc2e8'), hex('#c4daee'), hex('#ece4cc')], 70);
  for (let x = 0; x < W; x++) { const top = 62 + ri(Math.sin(x * 0.04 + 1) * 3 + h(x, 7) * 2); for (let y = top; y <= 74; y++) R.pset(x, y, y < top + 2 ? hex('#5a7a5a') : hex('#4a6a4a')); }
  for (let x = 2; x < W; x += 6 + ri(h(x, 2) * 4)) pino(x, 72, 9 + ri(h(x, 3) * 7), [hex('#34503e'), hex('#44604a'), hex('#587458')]);
  // la loma del pueblo: tierra y hierba, el maíz en tres alturas, girasoles
  for (let x = 0; x < W; x++) for (let y = 74; y <= 101; y++) R.pset(x, y, h(x, y, 1) > 0.75 ? hex('#8a9a5a') : y < 78 ? hex('#7a9a5a') : hex('#a8a86a'));
  for (let x = 96; x <= 146; x += 3) { const a = 10 + ri(h(x, 4) * 5) + (x > 120 ? 4 : 0); R.linea(x, 98, x, 98 - a, C.maizV); R.pset(x - 1, 98 - a + 3, C.maizV); R.pset(x + 1, 98 - a + 5, hex('#7aaa4a')); if (h(x, 5) > 0.5) R.pset(x + 1, 98 - a + 7, C.maiz); }
  for (const x of [92, 150]) { R.linea(x, 98, x, 80, hex('#5a7a3a')); R.disco(x, 79, 2, hex('#e8b830')); R.pset(x, 79, hex('#6a4020')); }
  casaEsteras(156, 196, 96, 14); casaEsteras(208, 246, 98, 13); casaEsteras(256, 300, 95, 12);
  for (let x = 4; x < 90; x += 5) { const a = 6 + ri(h(x, 6) * 4); R.linea(x, 99, x, 99 - a, h(x, 8) > 0.5 ? C.maizV : hex('#7a9a4a')); }
  // el estrecho, con el cerco de cañas para pescar
  aguaL(101, 130, [hex('#8ab8b4'), hex('#6aa0a0'), C.estrecho, C.estrechoS]);
  for (let k = 0; k < 14; k++) { const x = 28 + k * 5, y = 106 + Math.abs(k - 7) * 1.4; R.linea(x, ri(y), x, ri(y) + 9, hex('#8a7a4a')); R.pset(x, ri(y) - 1, hex('#c8b87a')); }
  // la orilla de delante: arena, hierba de duna, conchas y un tronco de deriva
  prado(0, 126, 319, 179, [C.arenaS, C.arena, hex('#f4e6c0')], { sem: 7, matas: 0, piedras: 6 });
  for (let x = 0; x < W; x++) { const top = 128 + ri(Math.sin(x * 0.03) * 3); for (let y = 124; y < top + 2; y++) R.pset(x, y, y < top ? (y > top - 3 ? hex('#a8b4a8') : R.pget(x, y)) : hex('#b8a888')); }
  // la duna: barrones en matas grandes, juncos en la orilla, una línea de algas
  prado(0, 150, 319, 179, [hex('#8a9a50'), hex('#c8bc84'), hex('#e0d4a0')], { sem: 9, matas: 0 });
  for (let k = 0; k < 26; k++) { const x = ri(h(k, 1, 4) * 320), y = ri(146 + h(k, 2, 4) * 34), a = 6 + ri(h(k, 3, 4) * 8); for (let b = -4; b <= 4; b++) R.linea(x + b, y, x + ri(b * 2), y - a + Math.abs(b), b % 2 ? hex('#7a8a40') : hex('#a8b060')); }
  for (let x = 0; x < W; x += 2) if (h(x, 5, 4) > 0.4) R.pset(x, 132 + ri(Math.sin(x * 0.03) * 3), hex('#5a6a3a'));
  for (const x0 of [0, 280]) for (let k = 0; k < 9; k++) { const x = x0 + k * 4 + ri(h(k, x0) * 3); R.linea(x, 134, x + ri(h(k, 2) * 4 - 2), 114 + ri(h(k, 3) * 6), hex('#6a7a3a')); R.pset(x + 1, 116 + ri(h(k, 4) * 6), hex('#8a5a2a')); R.pset(x + 1, 117 + ri(h(k, 4) * 6), hex('#8a5a2a')); }
  R.rect(212, 168, 262, 172, C.troncoS); R.rect(212, 168, 262, 169, hex('#a89478')); R.rect(258, 164, 260, 168, hex('#a89478'));
  for (const [x, y] of [[180, 150], [240, 158], [130, 166], [292, 146]]) { R.pset(x, y, hex('#f0d8c8')); R.pset(x + 1, y, hex('#e0b8a0')); R.pset(x, y - 1, hex('#f8e8dc')); }
});
const caballete = (pinta, garza) => {
  R.linea(22, 168, 30, 112, C.troncoS); R.linea(52, 168, 44, 112, C.troncoS); R.linea(37, 170, 37, 112, C.tronco); R.linea(23, 168, 31, 112, C.troncoL);
  R.rect(18, 142, 56, 144, C.troncoS); R.rect(18, 142, 56, 142, C.troncoL);
  R.rect(19, 113, 55, 141, C.k); acuarela(20, 114, 35, 27, pinta, garza);
};
const p2 = (t) => {
  R.copiar(fondo2());
  nubes(t, [[30, 40, 20, 1.2], [140, 52, 24, 0.8], [210, 34, 16, 1.5]], [hex('#b8cce0'), hex('#f0f4f8'), hex('#ffffff')]);
  brillos(t, 102, 128, 34, hex('#e0f4f0'), 4);
  // la vida del pueblo: el fuego de la plaza, una que muele maíz, uno que pasa, otro entre el maíz
  fuego(230, 99, t, 4, 22);
  const mano = Math.sin(t * 7) > 0; figurita(200, 99, t, { ropa: C.esteraS, pelo: hex('#1c1424') }); R.rect(203, 96, 205, 99, C.troncoS); R.linea(204, mano ? 89 : 92, 204, 95, C.troncoL);
  const pa = (t * 6) % 120; figurita(ri(250 - pa * 0.5), 99, t, { anda: true, ropa: C.esteraS, pelo: hex('#1c1424'), lleva: C.maiz });
  figurita(120, 99, t, { ropa: hex('#8a6a40'), pelo: hex('#1c1424') });
  // la canoa que cruza con dos remeros
  const cx = ri(lerp(320, 150, lin(t, P2, P3 + 0.5))); for (let i = -10; i <= 10; i++) { ps(cx + i, 120, C.troncoS); ps(cx + i, 119, Math.abs(i) < 9 ? C.tronco : C.troncoS); } figurita(cx - 4, 118, t, { ropa: C.esteraS, pelo: hex('#1c1424') }); figurita(cx + 4, 118, t, { ropa: C.esteraS, pelo: hex('#1c1424') }); const rm = Math.sin(t * 5) > 0; ps(cx - (rm ? 1 : 0) + 7, 120, C.troncoL); ps(cx + 8, 121, C.troncoL);
  // la garza que cruza el agua («everything they saw»)
  const garzaT = @pintor:10.05@, gz = lin(t, garzaT - 0.3, garzaT + 1.4); if (gz > 0 && gz < 1) { const gx = ri(lerp(300, 110, gz)), gy = ri(108 - Math.sin(gz * Math.PI) * 22), al = Math.sin(t * 7) > 0; for (let i = -6; i <= 6; i++) { ps(gx + i, gy, hex('#7a8490')); ps(gx + i, gy + 1, hex('#9aa4b0')); } ps(gx - 7, gy - 1, hex('#8a94a0')); ps(gx - 8, gy - 2, hex('#8a94a0')); ps(gx - 9, gy - 2, hex('#2a2a30')); ps(gx - 10, gy - 2, hex('#e8c040')); ps(gx - 11, gy - 2, hex('#e8c040')); for (let i = 7; i <= 10; i++) ps(gx + i, gy + 2, hex('#5a6470')); for (let i = -5; i <= 5; i++) { const dy = al ? -Math.round(Math.abs(i) * 0.9) : Math.round(Math.abs(i) * 0.5); ps(gx + i, gy - 1 + dy, hex('#c8d0d8')); ps(gx + i, gy - 2 + dy, hex('#a8b0bc')); } }
  // White llega con la caja, la deja, la abre y pinta
  const llega = lin(t, P2 + 0.1, @pintor:8.3@), deja = @pintor:8.45@, pinta = lin(t, @pintor:9.3@, @pintor:11.2@);
  const wx = ri(lerp(150, 62, llega));
  caballete(pinta, t > garzaT + 0.9 ? 1 : 0);
  if (t > deja) cajaPinturas(84, 168, lin(t, deja, deja + 0.3));
  const pinc = 133 + ri(Math.sin(t * 9) * 3 * (pinta > 0 && pinta < 1 ? 1 : 0));
  const w = R.actor(EL.whiteRK, wx, 168, t, { dir: -1, anda: llega > 0 && llega < 1, sostiene: t < deja ? true : t > @pintor:8.9@ ? [52, pinc] : false, dedo: t > deja + 0.1 && t < @pintor:8.9@, sonrisa: t > @pintor:10.6@ });
  if (t < deja) { const [hx, hy] = w.mano; cajaPinturas(hx - 14, hy + 4, 0); }
  else if (t > @pintor:8.9@) { const [hx, hy] = w.mano; R.linea(hx, hy, hx - 5, hy - 1, C.troncoL); R.pset(hx - 6, hy - 1, [hex('#c8303a'), hex('#3a6ac8'), hex('#3a8a4a')][Math.floor(t * 2) % 3]); }
  // el vaso del agua de los pinceles, junto a la caja
  R.rect(102, 162, 106, 168, C.k); R.rect(103, 163, 105, 167, mezcla(C.acuarela, C.papel, 0.4));
  for (const x of [4, 12, 70, 120, 168, 200, 288, 300, 312]) mata(x, 179, t, hex('#8a9a50'), 7, hex('#b0b070'));
};

// ── 3 · las acuarelas en el Museo Británico ───────────────────────────────────────────────────────────────────────
const atril = (x, base) => { R.linea(x + 4, base, x + 10, base - 50, C.cascoKS); R.linea(x + 30, base, x + 24, base - 50, C.cascoKS); R.linea(x + 17, base + 1, x + 17, base - 52, C.cascoK); R.rect(x + 2, base - 28, x + 32, base - 26, C.cascoK); R.rect(x + 2, base - 28, x + 32, base - 28, C.cascoKL); };
const marco = (x, y, brillo = 0) => { R.rect(x - 1, y - 1, x + 33, y + 25, C.k); R.rect(x, y, x + 32, y + 24, hex('#c8a040')); R.rect(x + 1, y + 1, x + 31, y + 1, hex('#f0d070')); R.rect(x + 1, y + 23, x + 31, y + 23, hex('#8a6a20')); acuarela(x + 3, y + 3, 27, 19, 1, 1); if (brillo > 0) { R.linea(x + 6, y + 18, x + 12, y + 4, hex('#ffffff')); R.linea(x + 8, y + 18, x + 14, y + 4, hex('#ffffff')); } };
const p3 = (t) => {
  const luz = lin(t, @pintor:14.3@, @pintor:14.9@);
  T.museo(R, t, { encuadre: 'sala', luz: 0.12 + luz * 0.88 });
  const pone = @pintor:13.12@, flash = @pintor:15.1@;
  atril(60, 160);
  // la conservadora trae la acuarela enmarcada, la pone en el atril y la presenta
  const ven = lin(t, P3 + 0.1, pone - 0.2), cx = ri(lerp(262, 92, ven));
  const c = R.actor(EL.conservadoraRK, cx, 160, t, { dir: -1, anda: ven > 0 && ven < 1, sostiene: t < pone + 0.2 ? (t > pone - 0.3 ? [cx - 8, 128] : true) : false, dedo: t > pone + 0.6 && t < @pintor:14.2@, sonrisa: t > flash, habla: t > @pintor:14.3@ && t < @pintor:15.4@ && parpadeo(t) });
  if (t < pone + 0.2) { const [hx, hy] = c.mano, u = lin(t, pone - 0.2, pone + 0.2); marco(ri(lerp(hx - 30, 62, u)), ri(lerp(hy - 20, 104, u))); }
  else marco(62, 104, t > flash && t < flash + 0.4 ? 1 : 0);
  // la visitante se acerca, se asombra y señala
  const vis = lin(t, @pintor:13.6@, @pintor:15.0@), vx = ri(lerp(330, 244, vis));
  R.actor(EL.senora30, vx, 160, t, { dir: -1, anda: vis > 0 && vis < 1, sorpresa: t > flash && t < flash + 0.8, sonrisa: t > flash + 0.8, dedo: t > flash + 1.0 && t < flash + 2.2 });
  T.museoDelante(R, t, { encuadre: 'sala' });
  // el flash de la cámara del trípode
  if (t > flash && t < flash + 0.25) { R.disco(48, 96, 4, hex('#ffffff')); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; R.linea(48 + ri(Math.cos(a) * 6), 96 + ri(Math.sin(a) * 6), 48 + ri(Math.cos(a) * 10), 96 + ri(Math.sin(a) * 10), hex('#fff8d0')); } }
};

// ── 4 · el huerto seco: la despensa vacía y el vecino que se va ───────────────────────────────────────────────────
const cuenco = (x, y, lleno) => { R.rect(x - 4, y - 1, x + 4, y + 2, C.k); R.rect(x - 3, y, x + 3, y + 1, C.tronco); R.rect(x - 3, y, x + 3, y, C.troncoL); if (lleno) { R.rect(x - 2, y - 2, x + 2, y - 1, hex('#a8b4bc')); R.pset(x + 3, y - 2, hex('#8a94a0')); } };
const cesta = (x, y, n) => { R.rect(x - 5, y - 1, x + 5, y + 5, C.k); for (let i = -4; i <= 4; i++) for (let j = 0; j <= 4; j++) R.pset(x + i, y + j, (i + j) % 2 ? C.estera : C.esteraS); for (let k = 0; k < n; k++) { R.rect(x - 4 + k * 3, y - 3, x - 3 + k * 3, y - 1, k % 2 ? C.maiz : hex('#a8b4bc')); } };
const p4 = (t) => {
  const g = T.roanoke(R, t, { encuadre: 'huerto', epoca: 1587, seco: 0.8 });
  const mal = @mal:17.96@, corto = @mal:19.39@, vec = @mal:20.85@, da = @mal:21.6@, rompe = @mal:23.3@;
  // el del granero sale con el saco vacío y lo sacude: solo sale una polilla
  const sale = lin(t, P4 + 0.1, mal + 0.4), ax = ri(lerp(226, 200, sale)), sacude = t > mal + 0.4 && t < mal + 1.6;
  const a = R.actor(EL.soldadoRK, ax, 158, t, { dir: -1, anda: sale > 0 && sale < 1, sostiene: t < rompe - 1.4 ? [ax - 6, 140 + (sacude ? ri(Math.sin(t * 18) * 2) : 0)] : false, triste: t > mal + 1.6 && t < rompe - 1.4, dedo: t > rompe - 1.2 && t < rompe, habla: t > rompe - 1.2 && t < rompe && parpadeo(t), sorpresa: t > rompe + 0.3 });
  if (t < rompe - 1.4) { const [hx, hy] = a.mano; R.rect(hx - 3, hy, hx + 2, hy + 9, C.k); R.rect(hx - 2, hy + 1, hx + 1, hy + 8, hex('#c8b48a')); R.rect(hx - 2, hy + 4, hx + 1, hy + 4, hex('#a8946a')); }
  const pol = lin(t, mal + 0.6, mal + 3.2); if (pol > 0 && pol < 1) { const px = ri(ax - 8 + pol * 30 + Math.sin(t * 12) * 3), py = ri(142 - pol * 40); const al = Math.sin(t * 30) > 0; R.pset(px, py, hex('#e8e0d0')); R.pset(px - 1, py - (al ? 1 : 0), hex('#f8f4ec')); R.pset(px + 1, py - (al ? 1 : 0), hex('#f8f4ec')); }
  // el del cuenco: lo mira vacío, lo golpea; recibe un pescado y luego se queda sin vecino
  const lleno = t > da + 0.45;
  const b = R.actor(EL.soldadoRK, 112, 158, t, { dir: t > vec - 0.2 && t < rompe + 1.0 ? -1 : 1, sostiene: true, triste: (t > corto && t < da + 0.4) || t > rompe + 0.5, sonrisa: t > da + 0.5 && t < rompe, habla: t > da + 0.6 && t < da + 1.2 && parpadeo(t) });
  cuenco(b.mano[0], b.mano[1] + 1, lleno);
  if (t > corto + 0.3 && t < corto + 0.8) { R.pset(b.mano[0] - 6, b.mano[1] - 3, C.blanco); R.pset(b.mano[0] - 7, b.mano[1] - 4, C.blanco); }
  // el tercero, sentado en el tocón… de pie, con la olla boca abajo
  R.actor(EL.soldadoRK, 40, 160, t, { dir: 1, triste: t < da || t > rompe + 0.3, sonrisa: t > da + 0.4 && t < rompe });
  // el vecino de Roanoke llega con su cesta, da un pescado; cuando le piden más, niega y se va
  const llega = lin(t, vec - 0.6, da - 0.15), va = lin(t, rompe + 0.25, P5 - 0.05), nx = ri(lerp(-18, 84, llega) - va * 104);
  const niega = t > rompe - 0.5 && t < rompe + 0.25;
  const n = R.actor(EL.wancheseRK, nx, 158, t, { dir: niega ? (Math.floor(t * 6) % 2 ? 1 : -1) : va > 0 ? -1 : 1, anda: (llega > 0 && llega < 1) || (va > 0 && va < 1), sostiene: t < da || t > da + 0.5 ? true : [b.mano[0] - 4, b.mano[1] - 2], triste: t > rompe - 0.4, sonrisa: t > da - 0.2 && t < rompe - 1.0 });
  cesta(n.mano[0], n.mano[1] + 1, t > da + 0.45 ? 3 : 4);
  if (t > da && t < da + 0.45) { const u = lin(t, da, da + 0.45); R.rect(ri(lerp(n.mano[0], b.mano[0], u)) - 2, ri(lerp(n.mano[1], b.mano[1], u) - Math.sin(u * Math.PI) * 6) - 2, ri(lerp(n.mano[0], b.mano[0], u)) + 2, ri(lerp(n.mano[1], b.mano[1], u) - Math.sin(u * Math.PI) * 6) - 1, hex('#a8b4bc')); }
  T.roanokeDelante(R, t, { encuadre: 'huerto', epoca: 1587, seco: 0.8 });
};

// ── 5 · la flota de Drake ─────────────────────────────────────────────────────────────────────────────────────────
const p5 = (t) => {
  T.mar(R, t, { encuadre: 'travesia', barcos: 3 });
  // en el horizonte asoman más velas: la flota de Drake (por detrás de los barcos del decorado)
  const llega = lin(t, @mal:24.6@, @mal:26.3@);
  for (let k = 0; k < 9; k++) { const x = ri(330 - llega * (40 + k * 24) + h(k, 1) * 6), y = 90 + (k % 3); if (x > 318) continue; for (let j = 0; j < 4; j++) for (let i = -1; i <= 1; i++) psAzul(x + i, y - j, j === 3 ? C.lonaKS : C.lonaK); psAzul(x, y - 4, C.cascoKS); for (let i = -2; i <= 2; i++) psAzul(x + i, y + 1, C.cascoK); if (k % 2 === 0) psAzul(x, y - 2, C.sanJorge); }
  // el bote de Drake con barriles rema hacia la isla («to help them»); Drake, de capa, en la proa
  const ayuda = lin(t, @mal:25.9@, P6 + 0.3), bx = ri(lerp(214, 40, ayuda));
  if (ayuda > 0) { bote(bx, 160, t, { n: 3, ropa: hex('#4a5a7a'), carga: true, dir: -1 }); const dx = bx - 10, cb = ri(Math.sin(t * 2.4 + bx * 0.2) * 0.7) + 160; ps(dx, cb - 2, hex('#8a1a1a')); ps(dx, cb - 3, hex('#8a1a1a')); ps(dx + 1, cb - 3, hex('#b82a2a')); ps(dx, cb - 4, hex('#b82a2a')); ps(dx, cb - 5, hex('#f0c090')); ps(dx, cb - 6, hex('#8a4a24')); ps(dx - 1, cb - 4, hex('#8a1a1a')); ps(dx - 1, cb - 3, hex('#6a1010')); }
};

// ── 6 · la tormenta se lleva el barco; los soldados se van con Drake ───────────────────────────────────────────────
const p6 = (t) => {
  const cable = t < @mal:29.0@ ? lerp(0.25, 0.5, lin(t, P6, @mal:29.0@)) : lerp(0.5, 1, lin(t, @mal:29.0@, @mal:31.0@));
  const g = T.mar(R, t, { encuadre: 'tormenta', cable });
  // los botes con los soldados salen de la isla y reman hacia el barco de Drake
  const van = lin(t, P6 + 0.2, @mal:33.4@), [ox, oy] = g.isla ?? [70, 88];
  for (let k = 0; k < 2; k++) { const u = Math.max(0, Math.min(1, van * 1.15 - k * 0.15)); if (u <= 0) continue; const x = ri(lerp(100 - k * 26, 236 - k * 20, u)), y = ri(lerp(96 + k * 3, 124 + k * 5, u)); bote(x, y, t, { n: 4, casco: true, dir: 1 }); }
};

const año = (t) => (t < P3 ? 1585 : t < P4 ? 2026 : 1586);
const efectos = [[0.8, 'golpecito'], [2.4, 'golpecito'], [@pintor:3.9@ + 0.05, 'toc'], [@pintor:6.35@, 'brillo'],
  [@pintor:9.3@, 'lapiz'], [@pintor:10.1@, 'whoosh'], [@pintor:11.1@, 'brillo'],
  [@pintor:13.12@, 'golpecito'], [@pintor:14.35@, 'interruptor'], [@pintor:15.1@, 'flash'],
  [@mal:19.8@, 'toc'], [@mal:21.7@, 'pop'],
  [@mal:26.0@, 'campana'], [@mal:27.3@, 'ola'],
  [@mal:28.3@, 'trueno'], [@mal:29.0@, 'rafaga'], [@mal:31.6@, 'ola'], [@mal:33.4@, 'trueno']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año });
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['rk-familias'] = ('Las familias', '''// RK-FAMILIAS (frases 8–10), 1587, cartela «1587». Ocho planos, todos con acción y vida de fondo:
// 1. el estudio de Raleigh: tiene una idea («!»), tumba de un capirotazo el soldadito de juguete de la mesa («instead of
//    soldiers») y pone en su sitio una familia de juguete («families»); el lebrel, el papagayo y el globo viven;
// 2. Plymouth: un colono con su baúl, una colona con su cesta, «115» sobre el muelle («a hundred and fifteen»), los
//    barcos izan las velas («set sail») y un niño persigue una gallina («children»);
// 3. el borde del muelle: White cuenta con su libreta (113…), Eleanor sube por la pasarela («Eleanor»: 114) y saluda
//    desde la pinaza, Ananias sube detrás («Ananias Dare»: 115);
// 4. el mapa: el círculo en Roanoke («wasn't Roanoke»), luego en Chesapeake, y la ruta que sube al norte con el barquito
//    («farther north»); un ancla («better harbor») y una mata de maíz («better land»);
// 5. la cubierta: los colonos señalan la carta; Fernandes suelta el timón y se da la vuelta («refused»: X); una gaviota
//    se le posa en la gorra (gag) y los colonos se aguantan la risa;
// 6. (fondo local) la popa al atardecer: Fernandes señala los gansos que se van al sur («summer was almost over»); White
//    lo mira y piensa («suspected»): en el bocadillo, un galeón y monedas; un galeón español asoma en el horizonte;
// 7. (fondo local) los colonos tapan con haces de juncos el techo de la casita que dejaron los soldados («repaired»);
//    el barco se va por el estrecho («stayed»); una gallina sale del casco viejo de un soldado;
// 8. (fondo local) el arroyo entre las casitas inglesas y la casa de esteras de Croatoan: Manteo llega, se pone en el
//    puente de troncos («bridge») y pasa el caldero de unos y el maíz de otros; todos asienten.''', KIT + r'''
const P1 = 0, P2 = @familias:6.9@, P3 = @familias:13.0@, P4 = @familias:20.15@, P5 = @piloto:26.4@, P6 = @piloto:32.35@, P7 = @piloto:38.6@, P8 = @quedan:43.1@;

// ── 1 · Raleigh cambia los soldados por familias ─────────────────────────────────────────────────────────────────
// los juguetes de madera, al doble para que se lean (cada píxel del dibujo, 2 × 2)
const P2x = (x, y, i, j, c) => R.rect(x + i * 2, y + j * 2, x + i * 2 + 1, y + j * 2 + 1, c);
const SOLDADITO = ['..kkk..', '.kHHHk.', 'kHLHHHk', '.kSSSk.', '.kSSSk.', 'kRRRRRk', 'kRRGRRk', '.kRRRk.', '.kBkBk.', 'kWWWWWk'];
const dib2 = (filas, x, y, pal) => filas.forEach((f, j) => [...f].forEach((ch, i) => { if (ch !== '.') P2x(x, y, i, j, pal[ch]); }));
const PALJ = { k: C.k, H: C.hierro, L: C.hierroL, S: hex('#f0c090'), R: hex('#c8302a'), G: hex('#e8c040'), B: hex('#3a2a20'), W: hex('#a8844a') };
const soldadito = (x, y, tumbado = 0) => {
  if (tumbado > 0.5) { dib2(['.kkkkkkkkk.', 'kWkRRRSSHHk', 'kWkRGRSSLHk', '.kkkkkkkkk.'], x - 2, y - 8, PALJ); return; }
  dib2(SOLDADITO, x - 7, y - 20, PALJ);
};
const FAMILIA = ['.kk....kk.....', 'kPPk..kYYk....', 'kSSk..kSSk....', 'kSSk..kSSk..k.', 'kVVk.kMMMMk.kPk', 'kVVk.kMMMMkkSSk', 'kVVkkMMMMMMkkCk', 'kBBk.kMMMMk.kCk', 'kBBkkMMMMMMkkBk', 'WWWWWWWWWWWWWWW'];
const familia = (x, y) => dib2(FAMILIA, x - 2, y - 20, { ...PALJ, P: hex('#4a2a18'), Y: hex('#c89040'), V: hex('#5a6a3a'), M: hex('#8a3a6a'), C: hex('#3a6ac8') });
const p1 = (t) => {
  const idea = @familias:1.86@, quita = @familias:3.5@, pone = @familias:4.68@, bien = @familias:5.9@;
  T.inglaterra(R, t, { encuadre: 'raleigh', globo: 0.3 + 0.5 * lin(t, 1.3, 6.9) });
  // Raleigh detrás de la mesa: idea («!»), capirotazo al soldadito, coge la familia y la pone en su sitio
  const coge = t > pone - 0.9 && t < pone + 0.2, golpe = t > quita - 0.3 && t < quita + 0.25;
  const objetivo = golpe ? [171, 146] : coge ? [ri(lerp(158, 170, lin(t, pone - 0.6, pone))), ri(147 - Math.sin(lin(t, pone - 0.6, pone) * Math.PI) * 4)] : null;
  const r = R.actor(EL.raleighRK, 150, 154, t, { dir: 1, dedo: t > idea - 0.2 && t < idea + 0.9, sostiene: objetivo ?? false, sonrisa: t > pone, habla: t > bien && t < bien + 0.8 && parpadeo(t) });
  T.inglaterraDelante(R, t, { encuadre: 'raleigh' });
  if (t > idea && t < idea + 1.0) R.bocadillo(r.cabeza[0], r.cabeza[1] - 4, { icono: '!' });
  // el soldadito: en pie, cae del capirotazo y resbala hasta el candelabro
  const cae = lin(t, quita, quita + 0.5); soldadito(ri(176 + cae * 22), 154, cae);
  // la familia: en la mesa a la izquierda, luego en la mano y al final donde estaba el soldadito
  if (t < pone - 0.6) familia(128, 154); else if (t < pone) familia(ri(lerp(128, 164, lin(t, pone - 0.6, pone))), ri(154 - Math.sin(lin(t, pone - 0.6, pone) * Math.PI) * 6)); else familia(164, 154);
  if (t > pone && t < pone + 0.3) for (let k = 0; k < 5; k++) R.pset(162 + k * 7, 130 - (k % 2) * 3, hex('#fff8c0'));
};

// ── 2 · Plymouth: las familias embarcan ─────────────────────────────────────────────────────────────────────────
const baul = (x, y) => { R.rect(x - 1, y - 7, x + 11, y, C.k); R.rect(x, y - 6, x + 10, y - 1, hex('#6a4224')); R.rect(x, y - 6, x + 10, y - 5, hex('#8a5a30')); R.rect(x + 3, y - 6, x + 3, y - 1, hex('#3a2414')); R.rect(x + 7, y - 6, x + 7, y - 1, hex('#3a2414')); R.pset(x + 5, y - 3, hex('#e0b040')); };
const cestaFlores = (x, y) => { R.rect(x - 4, y - 1, x + 4, y + 4, C.k); for (let i = -3; i <= 3; i++) for (let j = 0; j <= 3; j++) R.pset(x + i, y + j, (i + j) % 2 ? C.estera : C.esteraS); R.rect(x - 4, y - 5, x + 4, y - 5, C.esteraS); R.pset(x - 4, y - 4, C.esteraS); R.pset(x + 4, y - 4, C.esteraS); R.pset(x - 2, y - 1, hex('#e8e0c8')); R.pset(x + 1, y - 1, hex('#c8a040')); R.pset(x, y - 2, hex('#e8e0c8')); };
const p2 = (t) => {
  const cuantos = @familias:8.7@, zarpa = lin(t, @familias:10.0@, @familias:11.4@) * 0.35, hombres = @familias:11.22@, mujeres = @familias:11.98@, ninos = @familias:12.42@;
  const g = T.inglaterra(R, t, { encuadre: 'plymouth', zarpa });
  // el colono con su baúl: cruza el muelle y lo deja junto a los otros («men»)
  const va = lin(t, P2 + 0.1, hombres - 0.1), cx = ri(lerp(-16, 126, va));
  const c = R.actor(EL.colonoRK, cx, 160, t, { dir: 1, anda: va > 0 && va < 1, sostiene: t < hombres ? true : false, sonrisa: t > hombres, brazos: t > hombres + 0.3 && t < hombres + 0.9 });
  if (t < hombres) baul(c.mano[0] - 2, c.mano[1] + 5); else baul(144, 160);
  // la colona con su cesta («women»)
  const vb = lin(t, P2 + 1.0, mujeres - 0.2), bx = ri(lerp(-18, 84, vb));
  const b = R.actor(EL.colonaRK, bx, 162, t, { dir: 1, anda: vb > 0 && vb < 1, sostiene: true, sonrisa: t > mujeres, habla: t > mujeres && t < mujeres + 0.7 && parpadeo(t) });
  cestaFlores(b.mano[0], b.mano[1] + 1);
  // «115»: cuántos se van
  if (t > cuantos && t < cuantos + 1.7) { const s = lin(t, cuantos, cuantos + 0.15); R.numero('115', 176, ri(118 - s * 4), { tam: 16, centro: true }); }
  // el niño persigue a la gallina que se ha escapado de la jaula («children»)
  const corre = lin(t, ninos - 0.9, P3 + 0.2);
  gallina(ri(lerp(198, 52, corre)), 158 - ri(Math.abs(Math.sin(t * 9)) * 2 * (corre > 0 && corre < 1)), -1, t, { corre: corre > 0 && corre < 1, picotea: corre === 0 || corre === 1 });
  gallina(206, 156, -1, t, { picotea: true, color: hex('#c88a4a') });
  R.actor(EL.ninoColonoRK, ri(lerp(226, 74, Math.max(0, corre - 0.08) / 0.92)), 166, t, { dir: -1, anda: corre > 0.08 && corre < 1, sorpresa: corre > 0 && corre < 0.4, sonrisa: corre >= 0.4 });
  T.inglaterraDelante(R, t, { encuadre: 'plymouth', zarpa });
};

// ── 3 · el muelle: White cuenta; Eleanor y Ananias suben a bordo ─────────────────────────────────────────────────
const p3 = (t) => {
  const gobierna = @familias:13.3@, eleanor = @familias:16.88@, ananias = @familias:19.2@;
  const g = T.inglaterra(R, t, { encuadre: 'plymouth', camara: 'muelle', velas: 0.4 + 0.4 * lin(t, P3, P4) });
  const [x0p, y0p, x1p, y1p] = g.pasarela, [cx0, cx1, cy] = g.cubierta;
  // quien anda por el muelle, sube por la pasarela y se queda a bordo
  const embarca = (def, ini, fin, sube, dentro, o = {}) => {
    const a = lin(t, ini, fin), b = lin(t, fin, sube);
    let x, y; if (b <= 0) { x = lerp(-16, x0p - 8, a); y = 166; } else if (b < 1) { x = lerp(x0p - 8, x1p - 6, b); y = lerp(y0p, y1p, b); } else { x = lerp(x1p - 6, cx0 + dentro, lin(t, sube, sube + 0.6)); y = cy; }
    return R.actor(def, ri(x), ri(y), t, { dir: 1, anda: (a > 0 && a < 1) || (b > 0 && b < 1) || (t > sube && t < sube + 0.6), ...o });
  };
  // White llega, saca la libreta y cuenta
  const lw = lin(t, P3 + 0.05, gobierna + 0.6), wx = ri(lerp(-16, 92, lw));
  const cuenta = (t > eleanor + 0.7 ? 1 : 0) + (t > ananias + 0.6 ? 1 : 0);
  const w = R.actor(EL.whiteRK, wx, 166, t, { dir: 1, anda: lw > 0 && lw < 1, sostiene: t > gobierna + 0.7, sonrisa: cuenta === 2, habla: t > @familias:14.0@ && t < @familias:14.9@ && parpadeo(t) });
  if (t > gobierna + 0.7) { const [hx, hy] = w.mano; R.rect(hx - 1, hy - 5, hx + 5, hy + 1, C.k); R.rect(hx, hy - 4, hx + 4, hy, C.papel); for (let k = 0; k < 1 + cuenta; k++) R.pset(hx + 1 + k, hy - 2, C.k); R.numero(String(113 + cuenta), w.cabeza[0], w.cabeza[1] - 6, { centro: true }); }
  embarca(EL.eleanorRK, @familias:15.3@, eleanor - 0.1, eleanor + 0.6, 8, { sonrisa: true, brazos: t > eleanor + 1.6 && t < eleanor + 2.4 });
  embarca(EL.ananiasRK, @familias:17.6@, ananias - 0.2, ananias + 0.5, 26, { sonrisa: t > ananias + 0.6 });
  T.inglaterraDelante(R, t, { encuadre: 'plymouth', camara: 'muelle', velas: 0.4 + 0.4 * lin(t, P3, P4) });
};

// ── 4 · el mapa: no a Roanoke, a Chesapeake ──────────────────────────────────────────────────────────────────────
const barquitoMapa = (x, y, t) => { const c = ri(Math.sin(t * 3) * 1); R.rect(x - 5, y + c - 1, x + 5, y + c + 1, C.k); R.rect(x - 4, y + c, x + 4, y + c, C.cascoK); R.linea(x, y + c - 1, x, y + c - 10, C.cascoKS); R.rect(x - 3, y + c - 9, x + 3, y + c - 3, C.k); R.rect(x - 2, y + c - 8, x + 2, y + c - 4, C.lonaK); R.rect(x, y + c - 8, x, y + c - 4, C.sanJorge); R.rect(x - 2, y + c - 6, x + 2, y + c - 6, C.sanJorge); };
const anclaGl = (x, y) => { R.rect(x, y - 6, x, y, C.k); R.rect(x - 2, y - 5, x + 2, y - 5, C.k); R.anillo ? R.anillo(x, y - 7, 1, C.k) : R.pset(x, y - 8, C.k); R.linea(x - 3, y - 2, x, y + 1, C.k); R.linea(x + 3, y - 2, x, y + 1, C.k); };
const p4 = (t) => {
  const roa = @piloto:21.58@, che = @piloto:22.22@, norte = @piloto:23.34@, puerto = @piloto:24.66@, tierra = @piloto:25.4@;
  const avance = lin(t, che + 0.2, norte + 0.7);
  const g = T.mar(R, t, { encuadre: 'bancos', camara: 'mapa', marca: t < che ? (t > roa ? 'roanoke' : undefined) : 'chesapeake', ruta: 'norte', avance: Math.max(0.001, avance) });
  const [rx, ry] = g.roanoke, [nx, ny] = g.chesapeake;
  barquitoMapa(ri(lerp(rx + 10, nx + 10, avance)), ri(lerp(ry, ny + 8, avance)), t);
  if (t > puerto) { const s = lin(t, puerto, puerto + 0.2); R.disco(nx + 22, ny + 4, ri(5 * s), C.papel); anclaGl(nx + 22, ny + 6); }
  if (t > tierra) { const s = lin(t, tierra, tierra + 0.2), mx = nx - 22, my = ny + 10; R.disco(mx, my - 3, ri(6 * s), C.papel); if (s > 0.8) { R.linea(mx, my, mx, my - 8, C.maizV); R.linea(mx, my - 3, mx - 3, my - 6, C.maizV); R.linea(mx, my - 5, mx + 3, my - 8, C.maizV); R.rect(mx + 1, my - 6, mx + 2, my - 4, C.maiz); } }
};

// ── 5 · la cubierta: Fernandes no quiere; la gaviota ──────────────────────────────────────────────────────────────
const gaviotaPosada = (x, y, d, t, picotea) => { const P = (i, j, c) => R.pset(ri(x + d * i), ri(y + j), c); const pc = picotea && Math.sin(t * 7) > 0.5 ? 1 : 0; for (let i = -3; i <= 2; i++) { P(i, -2, C.blanco); P(i, -3, C.blanco); } for (let i = -3; i <= 1; i++) P(i, -4, hex('#a8b0bc')); P(-4, -3, hex('#5a6470')); P(-4, -4, C.k); P(2, -4 + pc, C.blanco); P(3, -5 + pc, C.blanco); P(3, -4 + pc, C.blanco); P(4, -4 + pc, hex('#e8b030')); P(3, -5 + pc, C.k); P(-1, -1, hex('#e8a040')); P(1, -1, hex('#e8a040')); };
const p5 = (t) => {
  const roa = @piloto:27.88@, fer = @piloto:28.92@, niega = @piloto:30.44@, lejos = @piloto:31.4@;
  const suelta = t > niega;
  const timon = suelta ? Math.sin(t * 2.2) * 0.9 : Math.sin(t * 1.3) * 0.5;
  const g = T.mar(R, t, { encuadre: 'travesia', camara: 'cubierta', timon });
  // los colonos señalan la carta y se lo piden al piloto
  const a = R.actor(EL.ananiasRK, 146, 158, t, { dir: t > roa - 0.3 ? -1 : 1, dedo: (t > P5 + 0.3 && t < roa - 0.3) || (t > roa && t < niega - 0.2), habla: t > roa && t < niega && parpadeo(t), sorpresa: t > lejos && t < lejos + 0.5, sonrisa: t > lejos + 0.6 });
  R.actor(EL.colonaRK, 222, 158, t, { dir: -1, dedo: t > P5 + 0.8 && t < fer, habla: t > P5 + 0.5 && t < roa && !parpadeo(t), sorpresa: t > lejos && t < lejos + 0.5, sonrisa: t > lejos + 0.6, triste: t > niega && t < lejos });
  // Fernandes, al pinzote; en «refused» lo suelta, se da la vuelta y cruza la cara de enfado
  const f = R.actor(EL.fernandesRK, 72, 158, t, { dir: suelta ? -1 : 1, sostiene: suelta ? false : g.timon, enfado: t > fer + 0.4, habla: t > fer + 0.5 && t < niega + 0.5 && parpadeo(t, 6) });
  if (t > niega && t < niega + 1.2) R.bocadillo(f.cabeza[0], f.cabeza[1] - 6, { icono: 'X' });
  // la gaviota llega volando y se le posa en la gorra, y picotea
  const vuela = lin(t, lejos - 0.9, lejos), [gx, gy] = [f.cabeza[0], f.cabeza[1] - 1];
  if (vuela > 0 && vuela < 1) R.gaviota(ri(lerp(300, gx, vuela)), ri(lerp(60, gy - 4, vuela) - Math.sin(vuela * Math.PI) * 10), t, 1);
  else if (vuela >= 1) gaviotaPosada(gx, gy, -1, t, t > lejos + 0.6);
  T.marDelante(R, t, { encuadre: 'travesia', camara: 'cubierta' });
};

// ── 6 · la popa al atardecer: el verano se acaba; los barcos españoles ───────────────────────────────────────────────
const fondo6 = () => capa('f6', () => {
  cieloL([hex('#3a5a9a'), hex('#5a74a8'), hex('#8a8aa8'), hex('#c89a8a'), hex('#e8b07a'), hex('#f4d090')], 100);
  sol(204, 90, 9, hex('#fff0b0'), hex('#f4c890'));
  aguaL(101, 140, [hex('#d8a878'), hex('#9a8a8a'), hex('#5a6a8a'), hex('#3a4a6a')]);
  for (let y = 101; y < 140; y++) for (let x = 186; x < 222; x++) if ((x + y) % 3 === 0 && Math.abs(x - 204) < 3 + (y - 101) * 0.35 && h(x, y) > 0.4) R.pset(x, y, hex('#f8d890'));
  // la estela del barco: dos rastros de espuma que se abren hacia la popa
  for (let y = 104; y < 140; y++) { const a = (y - 104) * 1.6; for (const s of [-1, 1]) { const x = ri(150 + s * (4 + a)); if (h(x, y) > 0.25) R.pset(x, y, hex('#e8e0d0')); R.pset(x + s, y, hex('#b8b8c0')); if (h(x, y, 2) > 0.6) R.pset(x - s * 2, y, hex('#c8c0b8')); } }
  // la regala de la popa por detrás de ellos: tapa de regala, balaustres torneados y la barandilla de abajo
  R.rect(0, 132, 319, 136, C.k); R.rect(0, 133, 319, 135, C.cascoK); R.rect(0, 133, 319, 133, C.cascoKL);
  for (let x = 0; x < W; x += 10) { for (let y = 137; y <= 155; y++) { const w = y < 140 || y > 152 ? 2 : (y > 143 && y < 149 ? 3 : 2); for (let i = -w; i <= w; i++) R.pset(x + 5 + i, y, i === -w ? C.cascoKS : i >= w - 1 ? C.cascoKL : C.cascoK); } }
  R.rect(0, 156, 319, 159, C.k); R.rect(0, 157, 319, 158, C.cascoK); R.rect(0, 157, 319, 157, C.cascoKL);
  for (let x = 0; x < W; x += 30) { R.rect(x, 128, x + 5, 160, C.k); R.rect(x + 1, 129, x + 4, 159, C.cascoK); R.rect(x + 1, 129, x + 1, 159, C.cascoKL); R.rect(x, 127, x + 5, 128, hex('#c8a040')); }
  // la cubierta de la toldilla, tablas en perspectiva lavadas por la luz de la tarde
  for (let y = 160; y <= 179; y++) for (let x = 0; x < W; x++) { const k = ri((x - 160) / (8 + (y - 160) * 0.35)); let c = (x - 160) % ri(8 + (y - 160) * 0.35) === 0 ? hex('#6a4a2e') : (k % 2 ? hex('#a87e52') : hex('#b88c5c')); if (h(x, y) > 0.9) c = hex('#8a6440'); if ((y - 160) % 7 === 0 && (x + k * 13) % 37 < 2) c = hex('#5a3e24'); R.pset(x, y, c); }
  for (let x = 0; x < W; x++) if (h(x, 1) > 0.3) R.pset(x, 160, hex('#5a3e24'));
  // la aduja de cabo, el balde y la caja de banderas
  for (let r = 7; r > 0; r -= 2) { R.disco(36, 172, r, C.k); R.disco(36, 172, r - 1, hex('#c8b080')); } R.pset(36, 172, hex('#8a7a50'));
  R.rect(262, 164, 276, 179, C.k); R.rect(263, 165, 275, 178, hex('#7a5a3a')); R.rect(263, 168, 275, 168, C.hierro); R.rect(263, 175, 275, 175, C.hierro); R.rect(264, 165, 274, 166, hex('#4a6a8a'));
  R.rect(288, 166, 318, 179, C.k); R.rect(289, 167, 317, 178, C.cascoK); R.rect(289, 167, 317, 168, C.cascoKL); R.rect(302, 170, 304, 173, hex('#c8a040'));
});
const farol = (x, y, t) => { R.rect(x + 3, y + 24, x + 5, y + 40, C.cascoKS); R.poligono([[x, y + 6], [x + 4, y], [x + 8, y + 6]], hex('#c8a040')); R.rect(x - 1, y + 6, x + 9, y + 22, C.k); const l = Math.sin(t * 9) > 0 ? hex('#f8e070') : hex('#f0c040'); R.rect(x, y + 7, x + 8, y + 21, l); R.rect(x + 4, y + 7, x + 4, y + 21, hex('#8a6a20')); R.rect(x, y + 14, x + 8, y + 14, hex('#8a6a20')); R.rect(x + 2, y + 22, x + 6, y + 24, hex('#c8a040')); };
const banderaPopa = (x, y, t) => { R.rect(x, y, x + 1, y + 62, C.cascoKS); for (let i = 0; i < 18; i++) { const o = ri(Math.sin(t * 5 - i * 0.5) * 1.5 * (i / 18)); for (let j = 0; j < 11; j++) R.pset(x + 2 + i, y + 1 + j + o, (i >= 7 && i <= 9) || (j >= 5 && j <= 6) ? C.sanJorge : C.lonaK); } };
const galeonEsp = (x, y, t) => { const cb = ri(Math.sin(t * 1.5) * 0.6); for (let i = -8; i <= 8; i++) { R.pset(x + i, y + cb, hex('#3a2a20')); R.pset(x + i, y + cb - 1, hex('#5a3a24')); } R.rect(x + 5, y + cb - 4, x + 8, y + cb - 2, hex('#5a3a24')); for (const [i, a] of [[-4, 12], [1, 15], [5, 10]]) { R.linea(x + i, y + cb - 2, x + i, y + cb - a, hex('#3a2a20')); for (let j = 3; j < a - 2; j++) for (let k = -2; k <= 2; k++) R.pset(x + i + k, y + cb - j, C.lonaK); R.pset(x + i - 1, y + cb - a / 2 - 1, C.sanJorge); R.pset(x + i + 1, y + cb - a / 2 + 1, C.sanJorge); R.pset(x + i, y + cb - a / 2, C.sanJorge); R.pset(x + i + 1, y + cb - a / 2 - 1, C.sanJorge); R.pset(x + i - 1, y + cb - a / 2 + 1, C.sanJorge); } R.pset(x + 1, y + cb - 16, hex('#e8c040')); };
const pensamiento = (x, y, s, t, monedas) => {
  if (s <= 0) return; const r = ri(13 * s); R.disco(x - 14, y + 14, 2, C.k); R.disco(x - 14, y + 14, 1, C.blanco); R.disco(x - 9, y + 9, 3, C.k); R.disco(x - 9, y + 9, 2, C.blanco);
  for (const [dx, dy, rr] of [[0, 0, r], [-r * 0.7, 2, r * 0.6], [r * 0.7, 2, r * 0.6], [0, -r * 0.4, r * 0.75]]) R.disco(ri(x + dx), ri(y + dy), ri(rr) + 1, C.k);
  for (const [dx, dy, rr] of [[0, 0, r], [-r * 0.7, 2, r * 0.6], [r * 0.7, 2, r * 0.6], [0, -r * 0.4, r * 0.75]]) R.disco(ri(x + dx), ri(y + dy), ri(rr), C.blanco);
  if (s < 1) return;
  if (!monedas) { R.icono('?', x - 3, y - 6, C.k, C.blanco); return; }
  galeonEsp(x - 4, y + 4, t);
  for (const [dx, dy] of [[7, 2], [11, 0], [9, -3]]) { R.disco(x + dx, y + dy, 2, hex('#a87a10')); R.pset(x + dx, y + dy, hex('#f8d850')); R.pset(x + dx - 1, y + dy - 1, hex('#fff4b0')); }
  if (Math.sin(t * 8) > 0.6) { R.pset(x + 13, y - 5, C.blanco); R.pset(x + 12, y - 5, hex('#fff4b0')); }
};
const p6 = (t) => {
  const dice = @piloto:32.85@, sospecha = @piloto:34.29@, caza = @piloto:36.11@, esp = @piloto:36.65@;
  R.copiar(fondo6());
  nubes(t - P6, [[30, 62, 22, 1.4], [120, 50, 16, 1.9], [176, 72, 20, 1.0], [232, 84, 16, 0.8], [-20, 80, 18, 1.6]], [hex('#8a6a7a'), hex('#d89a7a'), hex('#f8d0a0')]);
  brillos(t, 102, 130, 40, hex('#f8e0a8'), 3);
  for (const [x, y, k] of [[60, 70, 0], [96, 64, 3]]) R.gaviota(ri(x + (t - P6) * 6), y + ri(Math.sin(t + k) * 2), t, k);
  // los gansos se van al sur en uve («the summer was almost over»)
  const gv = lin(t, dice - 0.8, dice + 2.8); if (gv > 0 && gv < 1) for (let k = 0; k < 9; k++) { const fila = Math.ceil(k / 2), lado = k % 2 ? 1 : -1, gx = ri(lerp(262, -40, gv) + fila * 7), gy = ri(58 + lado * fila * 3); const al = Math.sin(t * 8 + k) > 0; ps(gx, gy, hex('#3a3040')); ps(gx - 1, gy, hex('#3a3040')); ps(gx - 2, gy - 1, hex('#3a3040')); ps(gx + 1, gy, hex('#3a3040')); ps(gx + 1, gy + (al ? -2 : 1), hex('#5a5060')); ps(gx + 2, gy + (al ? -3 : 1), hex('#5a5060')); ps(gx - 1, gy + (al ? -2 : 1), hex('#5a5060')); }
  // el galeón español asoma en el horizonte
  const ga = lin(t, esp - 0.5, esp + 1.2); if (ga > 0) galeonEsp(ri(lerp(334, 286, ga)), 101, t);
  banderaPopa(14, 70, t);
  // Fernandes y White en la toldilla, de pie delante de la regala
  const f = R.actor(EL.fernandesRK, 176, 172, t, { dir: t > esp ? 1 : -1, dedo: (t > dice - 0.3 && t < dice + 1.3) || (t > esp + 0.3 && t < esp + 1.6), habla: t > P6 + 0.1 && t < @piloto:33.5@ && parpadeo(t), sonrisa: t > esp + 0.4 });
  const w = R.actor(EL.whiteRK, 112, 172, t, { dir: 1, enfado: t > sospecha + 0.2 && t < caza, sorpresa: t > esp + 0.2 && t < esp + 0.8, triste: t > esp + 0.8 });
  pensamiento(w.cabeza[0] - 6, w.cabeza[1] - 20, lin(t, sospecha + 0.1, sospecha + 0.4), t, t > caza);
  farol(238, 92, t);
};

// ── 7 · los colonos arreglan el techo de la casita ───────────────────────────────────────────────────────────────
const fondo7 = () => capa('f7', () => {
  cieloL([hex('#4a8ad0'), hex('#66a2dc'), hex('#8ab8e6'), hex('#b0d0ee'), hex('#d8e8f0')], 84);
  for (let x = 0; x < W; x++) { const top = 76 + ri(Math.sin(x * 0.06) * 2 + h(x, 3) * 2); for (let y = top; y <= 84; y++) R.pset(x, y, hex('#4a6a5a')); }
  aguaL(84, 100, [hex('#8abab4'), hex('#6aa09a'), C.estrecho]);
  prado(0, 100, 319, 179, [hex('#6a7a36'), hex('#86983f'), hex('#a4ae58')], { sem: 5, matas: 50, flores: 16, piedras: 7 });
  for (let x = 0; x < W; x++) { R.pset(x, 100, hex('#c8b890')); R.pset(x, 101, hex('#c8b890')); R.pset(x, 102, h(x, 2) > 0.5 ? hex('#9a9a5a') : hex('#b8a878')); }
  // el camino de tierra de la puerta hacia abajo, con sus roderas
  R.poligono([[90, 168], [104, 168], [140, 179], [70, 179]], hex('#b0986a')); for (let k = 0; k < 30; k++) R.pset(ri(80 + h(k, 3) * 50), ri(169 + h(k, 4) * 10), hex('#8a7650'));
  // la leña apilada contra la pared y un tocón con el hacha
  for (let k = 0; k < 3; k++) for (let i = 0; i < 4; i++) { const x = 16 + i * 5 + (k % 2) * 2, y = 165 - k * 4; R.disco(x, y, 2, C.troncoS); R.pset(x, y, C.troncoL); }
  R.rect(214, 170, 224, 176, C.troncoS); R.rect(214, 170, 224, 171, C.troncoL); R.linea(219, 169, 224, 162, C.troncoL); R.rect(222, 160, 226, 163, C.hierro);
  for (const [x, a] of [[8, 34], [22, 44], [300, 40], [314, 34]]) pino(x, 112, a);
  // las otras casitas, detrás, y un huerto cercado
  casita(232, 300, 132, 18, 14, { puerta: [258, 6] }); casita(150, 196, 116, 13, 10, {});
  for (let x = 200; x <= 228; x += 4) { R.rect(x, 112, x + 1, 124, C.troncoS); } R.rect(200, 116, 228, 116, C.tronco); R.rect(200, 121, 228, 121, C.tronco);
  for (let x = 202; x <= 226; x += 3) R.linea(x, 124, x, 119, C.maizV);
  // la casita grande: tablas, puerta, ventana y techo de juncos; la chimenea de barro
  casita(38, 150, 168, 32, 28, { puerta: [92, 9], ventana: [56, 144] });
  R.rect(134, 82, 148, 132, C.k); for (let y = 83; y <= 131; y++) for (let x = 135; x <= 147; x++) R.pset(x, y, (y % 6 === 0) ? hex('#6a4a2e') : h(x, y) > 0.8 ? hex('#7a5a3a') : hex('#9a7a54')); R.rect(133, 80, 149, 83, hex('#6a4a2e'));
  // el suelo de delante: el camino, la pila de haces de juncos, la escalera, el caballete con el tronco
  for (let x = 0; x < W; x++) for (let y = 168; y <= 179; y++) if (h(x, y, 4) > 0.6) R.pset(x, y, hex('#b8a478'));
  for (let k = 0; k < 5; k++) { const x = 236 + (k % 3) * 12, y = 170 - Math.floor(k / 3) * 5; R.rect(x, y - 4, x + 14, y, hex('#7a6230')); for (let i = 0; i < 14; i += 2) R.linea(x + i, y - 4, x + i + 1, y, C.junco); R.rect(x + 6, y - 4, x + 7, y, C.troncoS); }
  R.rect(270, 160, 272, 172, C.troncoS); R.rect(290, 160, 292, 172, C.troncoS); R.rect(266, 158, 296, 161, C.tronco); R.rect(266, 158, 296, 158, C.troncoL);
  // el poste de la cerca con el casco viejo de un soldado
  R.rect(198, 150, 201, 172, C.troncoS); R.rect(199, 150, 200, 172, C.tronco);
});
const casco = (x, y) => { R.rect(x - 5, y - 1, x + 5, y, C.k); R.rect(x - 4, y - 5, x + 4, y - 1, C.k); R.rect(x - 3, y - 4, x + 3, y - 1, C.hierro); R.rect(x - 2, y - 4, x, y - 3, C.hierroL); R.rect(x - 5, y - 1, x + 5, y - 1, C.hierro); R.pset(x, y - 6, C.k); R.pset(x + 2, y - 2, hex('#8a5a3a')); };
const haz = (x, y, de = 0) => { if (de) { R.rect(x - 2, y - 10, x + 2, y, hex('#7a6230')); for (let j = -10; j <= 0; j += 2) R.linea(x - 2, y + j, x + 2, y + j + 1, C.junco); R.rect(x - 2, y - 5, x + 2, y - 5, C.troncoS); return; } R.rect(x - 7, y - 2, x + 7, y + 2, hex('#7a6230')); for (let i = -7; i <= 7; i += 2) R.linea(x + i, y - 2, x + i + 1, y + 2, C.junco); R.rect(x, y - 2, x, y + 2, C.troncoS); };
const p7 = (t) => {
  const quedan = @quedan:39.17@, arreglan = @quedan:40.4@, dejaron = @quedan:41.82@;
  R.copiar(fondo7());
  nubes(t, [[20, 46, 22, 1.2], [150, 58, 26, 0.9], [216, 40, 16, 1.6]], [hex('#a8c4e0'), hex('#e8f0f8'), hex('#ffffff')]);
  brillos(t, 85, 99, 24, hex('#e0f4f0'), 4);
  // el barco de Fernandes se va por el estrecho («So they stayed»)
  nave(ri(lerp(170, 300, lin(t, P7, P8 + 1))), 90, t, { velas: 1, s: 0.8 });
  for (const [x, y, k] of [[60, 60, 0], [86, 54, 2]]) R.gaviota(ri(x + t * 9) % 250, y, t, k);
  // el humo de la chimenea
  for (let k = 0; k < 6; k++) { const p = (t * 0.3 + k / 6) % 1, sx = 141 + p * 16 + Math.sin(p * 5 + k) * 2, sy = 76 - p * 26, r = 1 + p * 3; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && (ri(sx + i) + ri(sy + j)) % 2 === 0) ps(sx + i, sy + j, hex('#c8c4bc')); }
  // el hueco del techo se tapa haz a haz
  const tapa = lin(t, arreglan - 0.1, arreglan + 1.9);
  hueco(76, 120, 108, 132, tapa);
  // la escalera apoyada en el alero
  for (const dx of [0, 7]) R.linea(176 + dx, 172, 150 + dx, 118, C.troncoS);
  for (let k = 1; k < 9; k++) { const y = 172 - k * 6; R.linea(ri(176 - k * 2.9), y, ri(183 - k * 2.9), y, C.tronco); }
  // el colono en el techo coge el haz y lo coloca; la colona se lo pasa desde la escalera
  const ciclo = Math.floor(Math.max(0, t - arreglan + 0.3) / 0.5), sube = (t - arreglan + 0.3) % 0.5 < 0.25 && t > arreglan - 0.3 && t < arreglan + 1.7;
  const arriba = R.actor(EL.colonoRK, 112, 127, t, { dir: -1, sostiene: t > arreglan - 0.4 && t < arreglan + 1.8 ? [ri(lerp(118, 100 - Math.min(3, ciclo) * 8, sube ? 0.2 : 1)), 124] : false, sonrisa: t > arreglan + 1.9, habla: t > quedan && t < quedan + 0.7 && parpadeo(t) });
  if (t > arreglan - 0.4 && t < arreglan + 1.8) haz(arriba.mano[0], arriba.mano[1], 0);
  const c = R.actor(EL.colonaRK, 160, 160, t, { dir: -1, sostiene: t < arreglan + 1.8 ? [154, 136] : false, sonrisa: t > arreglan + 1.6, brazos: t > quedan - 0.4 && t < quedan + 0.6 });
  if (t < arreglan + 1.8 && !(t > quedan - 0.4 && t < quedan + 0.6)) haz(c.mano[0], c.mano[1], 1);
  // el niño trae otro haz de la pila
  const n = lin(t, P7 + 0.5, arreglan + 0.8) - lin(t, dejaron, dejaron + 0.9) * 0, nx = ri(lerp(250, 196, n));
  const nn = R.actor(EL.ninoColonoRK, nx, 174, t, { dir: -1, anda: n > 0 && n < 1, sostiene: true, sonrisa: n >= 1 });
  haz(nn.mano[0] - 2, nn.mano[1] + 2, 0);
  // el martillo: dos golpes al clavar las varas del caballete del techo
  // el casco viejo de los soldados en el poste: una gallina se ha hecho el nido y asoma («the soldiers had left»)
  casco(200, 150);
  const asoma = lin(t, dejaron - 0.1, dejaron + 0.3); if (asoma > 0) { const y = 146 - ri(asoma * 3); R.pset(201, y, hex('#f4eee2')); R.pset(202, y, hex('#f4eee2')); R.pset(201, y - 1, hex('#f4eee2')); R.pset(201, y - 2, hex('#d83030')); R.pset(203, y, hex('#e8b030')); R.pset(202, y - 1, C.k); }
  gallina(226, 168, -1, t, { picotea: true }); gallina(250, 176, 1, t, { picotea: true, color: hex('#c88a4a') });
  for (const x of [6, 18, 300, 312]) mata(x, 179, t, hex('#6a8a3a'), 6, hex('#9aa858'));
};

// ── 8 · Manteo, el puente entre los dos pueblos ──────────────────────────────────────────────────────────────────
const fondo8 = () => capa('f8', () => {
  cieloL([hex('#4a86cc'), hex('#64a0da'), hex('#88b6e4'), hex('#acd0ec'), hex('#d4e6f0')], 78);
  // al fondo, el estrecho y, al sur, la isla de Croatoan con su humo
  aguaL(78, 104, [hex('#9ac4c0'), hex('#78acaa'), C.estrecho, C.estrechoS]);
  for (let x = 196; x < 300; x++) { const top = 74 + ri(Math.abs(x - 248) * 0.12 + h(x, 1) * 2); for (let y = top; y <= 79; y++) R.pset(x, y, y < top + 1 ? hex('#6a8a6a') : hex('#4a6a5a')); }
  for (let x = 202; x < 296; x += 5) pino(x, 78, 4 + ri(h(x, 2) * 4), [hex('#3a5a4a'), hex('#4a6a58'), hex('#5a7a68')]);
  // las dos orillas: hierba y arena
  prado(0, 104, 319, 179, [hex('#6a7a36'), hex('#86983f'), hex('#a4ae58')], { sem: 8, matas: 44, flores: 14, piedras: 6 });
  for (let x = 0; x < W; x++) for (let y = 104; y < 108; y++) R.pset(x, y, y < 106 ? hex('#c8b890') : (h(x, y) > 0.5 ? hex('#a8a070') : hex('#b8a878')));
  // los caminos de las dos orillas hasta el puente
  R.poligono([[60, 170], [134, 154], [134, 160], [70, 179], [40, 179]], hex('#b0986a')); R.poligono([[190, 154], [260, 170], [290, 179], [240, 179], [190, 160]], hex('#b0986a'));
  for (let k = 0; k < 50; k++) { const u = h(k, 5); R.pset(ri(u < 0.5 ? 60 + h(k, 6) * 70 : 196 + h(k, 6) * 70), ri(158 + h(k, 7) * 20), hex('#8a7650')); }
  // el arroyo que baja por el centro, ensanchándose
  for (let y = 104; y <= 179; y++) { const c0 = 160 + Math.sin(y * 0.09) * 4, half = 6 + (y - 104) * 0.32; for (let x = ri(c0 - half - 2); x <= ri(c0 + half + 2); x++) { const d = Math.abs(x - c0); R.pset(x, y, d > half ? hex('#b8a478') : d > half - 2 ? hex('#7ab0aa') : (h(x, y) > 0.85 ? hex('#5a9a96') : C.estrecho)); } }
  for (let k = 0; k < 16; k++) { const y = 112 + k * 4, c0 = 160 + Math.sin(y * 0.09) * 4, half = 6 + (y - 104) * 0.32, lado = k % 2 ? 1 : -1, x = ri(c0 + lado * (half + 2)); if (y > 150 && y < 162) continue; for (let b = -1; b <= 1; b++) R.linea(x + b, y, x + b * 2, y - 5 - (k % 3), hex('#5a7a3a')); R.pset(x, y - 6, hex('#7a5a2a')); }
  for (const [x, y] of [[156, 128], [166, 140], [150, 168], [172, 174]]) { R.rect(x - 2, y, x + 2, y + 1, hex('#7a7a74')); R.rect(x - 1, y - 1, x + 1, y - 1, hex('#a8a8a0')); }
  // la orilla inglesa: la esquina de una casita, la cerca y un barril
  casita(-30, 50, 150, 26, 22, { ventana: [18, 128] });
  for (let x = 54; x <= 110; x += 6) { R.rect(x, 136, x + 1, 150, C.troncoS); R.pset(x, 135, C.tronco); } R.rect(54, 140, 110, 140, C.tronco); R.rect(54, 146, 110, 146, C.tronco);
  R.rect(112, 146, 122, 158, C.k); R.rect(113, 147, 121, 157, C.cascoK); R.rect(113, 149, 121, 149, C.hierro); R.rect(113, 155, 121, 155, C.hierro);
  // la orilla de Croatoan: la casa de esteras, el maíz, la canoa varada y un secadero de pescado
  casaEsteras(232, 318, 140, 26);
  for (let x = 196; x <= 230; x += 3) { const a = 14 + ri(h(x, 4) * 6); R.linea(x, 132, x, 132 - a, C.maizV); R.pset(x + 1, 132 - a + 4, hex('#7aaa4a')); if (h(x, 5) > 0.5) R.pset(x - 1, 132 - a + 6, C.maiz); }
  for (let i = -16; i <= 16; i++) { R.pset(282 + i, 172, C.troncoS); R.pset(282 + i, 171, Math.abs(i) < 15 ? C.tronco : C.troncoS); R.pset(282 + i, 170, Math.abs(i) < 14 ? C.troncoL : C.troncoS); }
  R.rect(200, 146, 201, 160, C.troncoS); R.rect(226, 146, 227, 160, C.troncoS); R.rect(198, 147, 229, 147, C.tronco); for (let x = 203; x < 226; x += 5) { R.rect(x, 148, x + 1, 153, hex('#a8b4bc')); R.pset(x, 154, hex('#8a94a0')); }
  // el puente de troncos sobre el arroyo
  for (let k = 0; k < 3; k++) { const y = 152 + k * 2; R.rect(134, y, 190, y + 1, k === 0 ? C.troncoL : C.tronco); } R.rect(134, 157, 190, 157, C.troncoS); R.rect(136, 158, 138, 166, C.troncoS); R.rect(186, 158, 188, 166, C.troncoS);
});
const caldero = (x, y) => { R.rect(x - 4, y - 1, x + 4, y + 5, C.k); R.rect(x - 3, y, x + 3, y + 4, hex('#3a3a40')); R.rect(x - 3, y, x + 3, y, hex('#6a6a74')); R.pset(x - 2, y + 1, hex('#8a8a94')); R.linea(x - 4, y - 1, x, y - 4, C.k); R.linea(x + 4, y - 1, x, y - 4, C.k); };
const mazorcas = (x, y) => { R.rect(x - 5, y - 1, x + 5, y + 4, C.k); for (let i = -4; i <= 4; i++) for (let j = 0; j <= 3; j++) R.pset(x + i, y + j, (i + j) % 2 ? C.estera : C.esteraS); for (let k = 0; k < 3; k++) { R.rect(x - 4 + k * 3, y - 4, x - 3 + k * 3, y - 1, C.maiz); R.pset(x - 3 + k * 3, y - 4, hex('#f0d860')); } };
const p8 = (t) => {
  const manteo = @quedan:43.36@, actua = @quedan:45.74@, puente = @quedan:46.38@, suyos = @quedan:47.2@;
  R.copiar(fondo8());
  nubes(t, [[30, 44, 20, 1.1], [130, 56, 24, 0.8], [212, 38, 14, 1.5]], [hex('#a8c4e0'), hex('#e8f0f8'), hex('#ffffff')]);
  brillos(t, 80, 103, 28, hex('#e0f4f0'), 4);
  // el arroyo corre (brillos que bajan) y un pez salta
  for (let k = 0; k < 18; k++) { const y = 106 + ((h(k, 1) * 74 + t * 14) % 74), c0 = 160 + Math.sin(y * 0.09) * 4, half = 6 + (y - 104) * 0.32, x = ri(c0 + (h(k, 2) - 0.5) * half * 1.6); R.pset(x, ri(y), hex('#d8f0ec')); R.pset(x + 1, ri(y), hex('#d8f0ec')); }
  const pez = (t * 0.5) % 1; if (pez < 0.25) { const u = pez / 0.25, px = ri(150 + u * 14), py = ri(172 - Math.sin(u * Math.PI) * 8); R.pset(px, py, hex('#a8b4bc')); R.pset(px + 1, py, hex('#c8d4dc')); R.pset(px - 1, py + 1, hex('#8a94a0')); }
  fuego(256, 166, t, 5, 26);
  // la orilla inglesa: el colono con el caldero y la colona
  const da1 = @quedan:46.0@, da2 = @quedan:46.9@, vuelve = @quedan:47.6@, da3 = @quedan:48.3@;
  const col = R.actor(EL.colonoRK, 88, 166, t, { dir: 1, sostiene: t < da1 ? [104, 156] : t > da3 - 0.1 ? [106, 155] : false, sonrisa: t > da3, habla: t > actua && t < da1 && parpadeo(t) });
  if (t < da1) caldero(col.mano[0], col.mano[1] + 1);
  R.actor(EL.colonaRK, 62, 168, t, { dir: 1, sonrisa: t > da3, sorpresa: t > da2 && t < da2 + 0.4 });
  // la orilla de Croatoan: el hombre, la mujer con la cesta de maíz y el niño
  const cro = R.actor(EL.croatoanRK, 200, 166, t, { dir: -1, sostiene: t > da2 - 0.1 && t < da2 + 0.6 ? [190, 154] : false, sonrisa: t > da2 + 0.2, habla: t > puente && t < da2 && parpadeo(t) });
  const croa = R.actor(EL.croatoanaRK, 222, 168, t, { dir: -1, sostiene: t < vuelve - 0.1 ? [214, 156] : false, sonrisa: t > vuelve });
  R.actor(EL.ninoCroatoanRK, 244, 172, t, { dir: -1, sonrisa: true, salto: t > da3 && t < da3 + 0.4 ? 2 : 0 });
  // Manteo llega de la orilla inglesa, se planta en el puente y pasa las cosas de unos a otros
  const llega = lin(t, P8 + 0.1, manteo + 1.4), mx = ri(lerp(-18, 154, llega)), my = llega < 0.72 ? 166 : ri(lerp(166, 152, lin(llega, 0.72, 0.85)));
  const lleva = t > da1 && t < da2 ? 'caldero' : t > vuelve && t < da3 ? 'maiz' : null;
  const mira = t < actua ? 1 : t < da1 + 0.1 ? -1 : t < da2 + 0.1 ? 1 : t < vuelve + 0.1 ? 1 : t < da3 + 0.1 ? -1 : (Math.floor(t * 1.5) % 2 ? 1 : -1);
  const m = R.actor(EL.manteoRK, mx, my, t, { dir: mira, anda: llega > 0 && llega < 1, sostiene: lleva ? true : false, dedo: !lleva && t > actua - 0.3 && t < suyos + 0.6, habla: t > actua && t < da3 + 0.6 && parpadeo(t, 6), sonrisa: t > da3 });
  if (lleva === 'caldero') caldero(m.mano[0], m.mano[1] + 1); else if (lleva === 'maiz') mazorcas(m.mano[0], m.mano[1] + 1);
  if (t > da2 && t < da2 + 0.6) caldero(cro.mano[0], cro.mano[1] + 1); else if (t > da2 + 0.6) caldero(212, 167);
  if (t < vuelve) mazorcas(croa.mano[0], croa.mano[1] + 1);
  if (t > da3) mazorcas(col.mano[0], col.mano[1] + 1);
  for (const x of [4, 14, 300, 312, 124]) mata(x, 179, t, hex('#6a8a3a'), 6, hex('#9aa858'));
};

const efectos = [[@familias:1.9@, 'pop'], [@familias:3.5@, 'toc'], [@familias:4.7@, 'golpecito'],
  [@familias:8.7@, 'pop'], [@familias:10.05@, 'whoosh'], [@familias:11.25@, 'golpecito'], [@familias:12.3@, 'boing'],
  [@familias:14.2@, 'lapiz'], [@familias:17.6@, 'pop'], [@familias:19.8@, 'pop'],
  [@piloto:21.6@, 'lapiz'], [@piloto:22.4@, 'lapiz'], [@piloto:24.7@, 'pop'], [@piloto:25.45@, 'pop'],
  [@piloto:30.45@, 'toc'], [@piloto:31.4@, 'boing'],
  [@piloto:34.45@, 'pop'], [@piloto:36.15@, 'brillo'], [@piloto:36.7@, 'campana'],
  [@quedan:40.4@, 'golpecito'], [@quedan:40.9@, 'golpecito'], [@quedan:41.9@, 'pop'],
  [@quedan:46.0@, 'toc'], [@quedan:46.9@, 'golpecito'], [@quedan:48.3@, 'pop']];
T.rodar(E, R, [[P1, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { efectos, cartela: '1587', año: 1587 });
''')

for _k in list(E):
    _t, _c, _b = E[_k]
    E[_k] = (_t, _c, _en(_k, _b))
