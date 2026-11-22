# Borrador de escenas del ep46 (grupo S8): lt-cierre.
E = {}

# ayudas comunes (copiadas de escenas6.py para que este módulo no dependa de otro)
COMUN = r'''
const H = hex, K = H('#1a1424'), ri = Math.round, ease = (u) => u * u * (3 - 2 * u), cl = (v, a, b) => Math.max(a, Math.min(b, v));
const LT = T.LT, PA = T.PA, AT = T.AT;
const voz = (t) => E.energia?.(t) ?? 0;
const hh = (a, b, c = 0) => { let n = (a * 374761393 + b * 668265263 + c * 1442695041) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const BAY = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const tono = (cols, v, x, y) => { const n = cols.length - 1; v = Math.max(0, Math.min(n, v)); let l = Math.floor(v); if (v - l > BAY[y & 3][x & 3] / 16) l++; return cols[Math.min(n, l)]; };
const pal = (...a) => a.map(H);
const FIJOS = {};
const horno = (k, f) => { if (!FIJOS[k]) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); FIJOS[k] = b; } return FIJOS[k]; };
const flota = (t, k = 0) => Math.round(Math.sin(t * 2.4 + k) * 1.5);
const ps = (x, y, c) => R.pset(ri(x), ri(y), c);
const mezP = (x, y, c, a) => { x = ri(x); y = ri(y); if (x < 0 || y < 0 || x > 319 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, a)); };
const bola = (x, y, r, c, a) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r + 0.5) mezP(x + i, y + j, c, a); };
const libreAtom = (x, y) => !(x > 268 && y < 50) && !(x > 14 && x < 176 && y < 22);
const pajaro = (x, y, t, c = K, f = 0) => { x = ri(x); y = ri(y); if (!libreAtom(x, y)) return; const a = Math.sin(t * 14 + f) > 0;
  R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : 0), c); R.pset(x + 2, y - (a ? 2 : 0), c); };
// una paloma blanca que bate las alas
const paloma = (x, y, t, f = 0) => { x = ri(x); y = ri(y); if (!libreAtom(x, y)) return; const a = Math.sin(t * 16 + f) > 0, B = H('#f8f4ec'), S = H('#b8b4c8');
  R.pset(x, y, B); R.pset(x + 1, y, B); R.pset(x + 2, y - 1, B); R.pset(x - 1, y, S); R.pset(x + 3, y - 1, H('#e8a040'));
  if (a) { R.pset(x, y - 1, B); R.pset(x - 1, y - 2, B); R.pset(x + 1, y - 2, S); } else { R.pset(x, y + 1, B); R.pset(x - 1, y + 2, S); } };
const nube = (x, y, w, cols, k) => { const n = Math.max(3, ri(w / 6)); for (let i = 0; i < n; i++) { const cx = ri(x + i * w / n), r = 3 + ri(hh(k, i, 7) * 3); R.disco(cx, y + 1, r, cols[0]); }
  for (let i = 0; i < n; i++) { const cx = ri(x + i * w / n), r = 3 + ri(hh(k, i, 7) * 3); R.disco(cx, y, r - 1, cols[1]); R.disco(cx - 1, y - 1, Math.max(1, r - 2), cols[2]); } };
// nubes a tres velocidades (lista [x0, y, ancho, vel]); nunca en la esquina de Atom ni sobre el año
const nubes = (t, lista, cols, sem = 0) => lista.forEach(([x0, y, w, v], k) => { const x = (((x0 + t * v + sem * 37) % 420) + 420) % 420 - 60;
  if (x + w > 262 && y < 54) return; if (x < 178 && y < 28) return; nube(x, y, w, cols[k % cols.length], k + sem); });
const pintaCielo = (cols, y0, y1, sol, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) {
  let v = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1) + (hh(x >> 2, y >> 1, k) - 0.5) * 0.35 + Math.sin(x * 0.03 + y * 0.2 + k) * 0.15;
  if (sol) { const d = Math.hypot(x - sol[0], (y - sol[1]) * 1.3); if (d < sol[2]) { R.pset(x, y, d < sol[2] - 2 ? H('#fff6d0') : H('#ffe08a')); continue; } if (d < sol[2] * 5) v += (1 - d / (sol[2] * 5)) * 1.6; }
  R.pset(x, y, tono(cols, v, x, y)); } };
// una capa de terreno: cresta y(x); por debajo, luz según la pendiente, filo claro y textura
const crestaY = (c, X) => c.y + c.amp * (0.55 * Math.sin(X * c.f + c.ph) + 0.3 * Math.sin(X * c.f * 2.3 + c.ph * 1.7) - 0.25 * Math.abs(Math.sin(X * c.f * 0.6 + c.ph)));
const pintaCapa = (c, xo = 0, yfin = 180) => { for (let x = 0; x < 320; x++) { const X = x + xo, y0 = Math.ceil(crestaY(c, X)), sl = crestaY(c, X + 1.5) - crestaY(c, X - 1.5);
  for (let y = Math.max(0, y0); y < yfin; y++) { const d = y - y0; let v = c.v - sl * c.luz + (d < 1 ? 1.4 : d < 3 ? 0.5 : 0) - Math.min(d, 40) * (c.cae ?? 0.02);
    const rip = Math.sin(X * 0.31 + y * 1.75 + Math.sin(X * 0.045 + y * 0.12) * 4); if (d > 2 && rip > 0.84) v += 0.8; else if (d > 2 && rip < -0.9) v -= 0.6;
    if (c.copas) { const q = Math.sin(X * 0.9 + Math.floor(y / 4) * 2.1) * Math.cos(y * 0.75 + X * 0.13); v += q * 0.9; }
    v += (hh(X, y, c.k ?? 0) - 0.5) * 0.55; R.pset(x, y, tono(c.cols, v, X, y)); } } };
const roca = (cx, cy, rx, ry, cols, k = 0) => { for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) {
  const a = Math.atan2(j, i), rr = 1 + 0.18 * Math.sin(a * 3 + k) + 0.12 * Math.sin(a * 7 + k * 2), e = Math.hypot(i / rx, j / ry) / rr; if (e > 1 || j > ry * 0.7) continue;
  let v = 2.4 - j / ry * 1.2 - i / rx * 0.6 + (hh(cx + i, cy + j, k) - 0.5) * 0.8 + (e > 0.9 ? -1 : 0); const cc = (i + 400 + ri(Math.sin(j * 0.15 + k) * 2)) % 9; if (cc === 0) v -= 1.3; else if (cc === 1) v += 0.7; if ((j + 400) % 13 === 0 && hh(i >> 3, j, k) > 0.5) v -= 0.9;
  R.pset(cx + i, cy + j, tono(cols, v, cx + i, cy + j)); } };
const sombraSuelo = (cx, cy, rx, ry, a = 0.45) => { for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 <= 1 && ((i + j) & 1) === 0) mezP(cx + i, cy + j, H('#1a1420'), a); };
let TMP = null;
const fantasma = (def, x, suelo, t, o = {}, a = 0.6, tin = H('#9ad8ff'), mt = 0.55) => { x = ri(x); suelo = ri(suelo); if (!TMP) TMP = R.nuevo(); TMP.fill(0); const prev = R.usar(TMP); R.actor(def, x, suelo, t, o); R.usar(prev);
  for (let y = Math.max(0, suelo - 46); y < Math.min(180, suelo + 2); y++) for (let xx = Math.max(0, x - 12); xx < Math.min(320, x + 34); xx++) { const c = TMP[y * 320 + xx]; if (c) mezP(xx, y, mez(c, tin, mt), a * (0.85 + 0.15 * Math.sin(t * 5 + y * 0.6))); } };
// una copa de árbol sombreada (luz arriba a la izquierda)
const copa = (cx, cy, r, cols, k = 0) => { cx = ri(cx); cy = ri(cy); for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const e = Math.hypot(i, j) / (r * (1 + 0.12 * Math.sin(Math.atan2(j, i) * 5 + k))); if (e > 1) continue;
  let v = (cols.length - 1) * 0.55 - (i + j) / r * 1.1 + (hh(cx + i, cy + j, k) - 0.5) * 1.1 + (e > 0.86 ? -0.9 : 0); if (((i * 3 + j * 5 + k) & 7) === 0) v += 0.8; R.pset(cx + i, cy + j, tono(cols, v, cx + i, cy + j)); } };
const BOSQ = pal('#0e2418', '#16341e', '#1e4628', '#2a5a30', '#3a6e36', '#528640', '#70a04c', '#98bc62');
const BOSQF = pal('#3a5a5a', '#4a6a64', '#5a7a6a', '#6e8c74', '#86a080');
const TRONCO = H('#3a2618'), TRONCOL = H('#6a4a2e');
// un árbol de hoja (k: semilla; t: se mece)
const arbol = (x, y, h, k = 0, t = 0, cols = BOSQ) => { x = ri(x); y = ri(y); if (h < 3) return; const sw = Math.sin(t * 1.2 + k) * h * 0.025;
  R.rect(x, y - ri(h * 0.42), x + (h > 16 ? 1 : 0), y, TRONCO); if (h > 16) R.pset(x, y - ri(h * 0.3), TRONCOL);
  const n = h > 22 ? 5 : h > 12 ? 4 : 3;
  for (let i = 0; i < n; i++) { const u = i / (n - 1); copa(x + (hh(k, i, 1) - 0.5) * h * 0.45 + sw * u * 2, y - h * (0.45 + 0.42 * u), Math.max(2, h * (0.3 - 0.1 * u)), cols, k + i); } };
// un abeto (triángulos escalonados)
const abeto = (x, y, h, k = 0, cols = BOSQ) => { x = ri(x); y = ri(y); R.rect(x, y - 2, x, y, TRONCO); for (let j = 0; j < h; j++) { const w = ri((j / h) * h * 0.3 + (j % 4 === 3 ? -1 : 0)); for (let i = -w; i <= w; i++) R.pset(x + i, y - h + j, tono(cols, 3.2 - i / Math.max(1, w) * 1.2 - j / h * 1.4 + (hh(x + i, j, k) - 0.5), x + i, y - h + j)); } };
// el anillo del gusano (el emblema del imperio): un aro con un hueco
const emblema = (cx, cy, r, c, cl2) => { for (let a = 0; a < 64; a++) { const an = a / 64 * Math.PI * 2; if (an > 5.6) continue; R.pset(ri(cx + Math.cos(an) * r), ri(cy + Math.sin(an) * r), c); if (cl2 && an < 2.6) R.pset(ri(cx + Math.cos(an) * (r - 1)), ri(cy + Math.sin(an) * (r - 1)), cl2); } };
// un estandarte con el anillo que ondea (mástil en x, de y0 a y1)
const bandera = (x, y0, y1, t, w = 16, h = 10, k = 0) => { R.rect(x, y0, x + 1, y1, H('#4a3a30')); R.pset(x, y0 - 1, H('#e8c060'));
  for (let i = 0; i < w; i++) { const dy = ri(Math.sin(t * 4 + i * 0.45 + k) * 1.5 * i / w); for (let j = 0; j < h; j++) { const c = j < 2 || j >= h - 2 ? H('#1a1620') : H('#2a4a3a'); R.pset(x + 2 + i, y0 + 1 + j + dy, ((i + j) & 3) === 0 ? mez(c, H('#ffffff'), 0.12) : c); } }
  emblema(x + 2 + ri(w / 2), y0 + 1 + ri(h / 2) + ri(Math.sin(t * 4 + w * 0.22 + k) * 0.8), 2, H('#e8c060')); };
// una casa del imperio (todas iguales): muro de mampuesto encalado, tejado de tejas, puerta con el anillo y ventanas
const MURO = pal('#8a7a6a', '#a8987e', '#c4b496', '#d8caa8', '#ece0c0'), TEJA = pal('#4a1e1a', '#6e2c22', '#8e3c2a', '#ae5236', '#c86c44');
const casa = (x0, y1, w = 44, h = 26, k = 0, o = {}) => {
  const x1 = x0 + w, y0 = y1 - h;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let v = 2.6 + (hh(x >> 2, y >> 1, k) - 0.5) * 0.8 - (x - x0) / w * 0.5; if ((y - y0) % 5 === 0 && ((x + (Math.floor((y - y0) / 5) & 1) * 3) % 7) !== 0) v -= 0.4; if (x === x0 || x === x1) v -= 1; R.pset(x, y, tono(MURO, v, x, y)); }
  // tejado a dos aguas
  const ry = y0 - ri(w * 0.32); for (let y = ry; y < y0; y++) { const e = (y - ry) / (y0 - ry), a = ri(x0 - 3 + (1 - e) * (w / 2 + 3)), b = ri(x1 + 3 - (1 - e) * (w / 2 + 3)); for (let x = a; x <= b; x++) R.pset(x, y, tono(TEJA, 2.6 - e * 0.8 + ((y - ry) % 3 === 0 ? -1 : 0) + (((x + y) % 4) === 0 ? 0.6 : 0) + (x > (a + b) / 2 ? -0.5 : 0), x, y)); }
  R.linea(x0 - 3, y0, x1 + 3, y0, H('#3a1a16')); R.linea(x0 - 2, y0 + 1, x1 + 2, y0 + 1, H('#6a5a4a'));
  // chimenea
  R.rect(x1 - 10, ry + 2, x1 - 6, y0 - 4, H('#7a6a5a')); R.rect(x1 - 11, ry + 1, x1 - 5, ry + 2, H('#4a3a30'));
  // puerta (o.puerta false: la escena la pinta) y ventanas
  const px = x0 + ri(w * 0.42);
  if (o.puerta !== false) { R.rect(px - 1, y1 - 14, px + 9, y1, H('#2a1a14')); R.rect(px, y1 - 13, px + 8, y1, H('#5a3a24')); for (let j = y1 - 12; j <= y1; j += 3) R.linea(px, j, px + 8, j, H('#4a2e1c')); emblema(px + 4, y1 - 8, 2, H('#e8c060')); R.pset(px + 7, y1 - 6, H('#e8c060')); }
  for (const wx of [x0 + 5, x1 - 13]) { R.rect(wx - 1, y0 + 5, wx + 8, y0 + 13, H('#4a3a30')); R.rect(wx, y0 + 6, wx + 7, y0 + 12, o.luz ? H('#f0c060') : H('#3a5a6a')); R.linea(wx + 3, y0 + 6, wx + 3, y0 + 12, H('#4a3a30')); R.linea(wx, y0 + 9, wx + 7, y0 + 9, H('#4a3a30'));
    if (!o.luz) { R.pset(wx + 1, y0 + 7, H('#a8c8d8')); R.pset(wx + 5, y0 + 7, H('#a8c8d8')); } R.rect(wx - 1, y0 + 13, wx + 8, y0 + 14, H('#8a7a6a'));
    // jardinera con flores
    for (let i = 0; i < 8; i++) R.pset(wx + i, y0 + 15, i & 1 ? H('#d84a5a') : H('#3a6a2e')); }
  return { puerta: [px, y1 - 14, px + 9, y1], chimenea: [x1 - 8, ry], ventanas: [[x0 + 5, y0 + 6], [x1 - 13, y0 + 6]] };
};
// humo de chimenea en bolitas que suben y crecen
const humo = (x, y, t, k = 0, c = H('#c8ccd0')) => { for (let i = 0; i < 6; i++) { const f = (t * 0.35 + i / 6 + hh(k, i)) % 1; bola(x + Math.sin(f * 5 + k) * 3 + f * 8, y - f * 26, ri(1 + f * 2.5), c, 0.55 * (1 - f)); } };
// adoquines de calle mojada con charcos que reflejan
const adoquin = (y0, y1, cols, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - y0) / 4), xx = x + (fila & 1) * 4; let v = 2.2 + (hh(xx >> 3, fila, k) - 0.5) * 1.2 + (y - y0) / (y1 - y0 + 1) * 0.6; if ((y - y0) % 4 === 0 || xx % 8 === 0) v -= 1.2; else if ((y - y0) % 4 === 1 && xx % 8 === 1) v += 0.6; R.pset(x, y, tono(cols, v, x, y)); } };
const charco = (cx, cy, rx, ry, cols) => { for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 <= 1) R.pset(cx + i, cy + j, tono(cols, 1.5 + j / ry * 0.8 + (hh(cx + i, cy + j) - 0.5) * 0.6, cx + i, cy + j)); };
// ondas en un charco
const ondas = (cx, cy, t, k = 0, c = H('#d8e8f0')) => { for (let q = 0; q < 2; q++) { const f = (t * 0.7 + q * 0.5 + hh(k, q)) % 1, r = 1 + f * 5; for (let a = 0; a < 16; a++) mezP(cx + Math.cos(a / 16 * 6.28) * r, cy + Math.sin(a / 16 * 6.28) * r * 0.35, c, 0.6 * (1 - f)); } };
// lluvia fina en diagonal (n gotas, en un rectángulo)
const llovizna = (t, n, x0, y0, x1, y1, c = H('#c8d4e0'), a = 0.5, k = 0) => { for (let i = 0; i < n; i++) { const H2 = y1 - y0, f = (hh(i, 1, k) + t * (0.9 + hh(i, 2, k) * 0.5)) % 1, x = x0 + ((hh(i, 3, k) * (x1 - x0) - f * 18) % (x1 - x0) + (x1 - x0)) % (x1 - x0), y = y0 + f * H2; if (!libreAtom(x, y)) continue; mezP(x, y, c, a); mezP(x + 1, y - 2, c, a * 0.7); } };
// devoto pequeño (de pie o postrado), para las multitudes lejanas
const devoto = (x, y, c, kn = 0, cab = H('#e8c0a0')) => { x = ri(x); y = ri(y); if (kn > 0.5) { R.rect(x - 3, y - 3, x + 3, y, mez(c, K, 0.15)); R.rect(x - 2, y - 4, x + 2, y - 4, c); R.pset(x + 3, y - 2, cab); R.pset(x + 4, y - 2, cab); R.pset(x - 3, y - 3, mez(c, H('#ffffff'), 0.2)); }
  else { R.rect(x - 1, y - 7, x + 1, y, c); R.pset(x - 2, y - 5, mez(c, K, 0.3)); R.pset(x + 2, y - 5, mez(c, K, 0.3)); R.rect(x - 1, y - 10, x + 1, y - 8, cab); R.pset(x, y - 11, H('#3a2a20')); R.pset(x - 1, y, K); R.pset(x + 1, y, K); } };
// un cuenco con especia (naranja con brillo)
const cuenco = (x, y, w = 4, lleno = 1) => { x = ri(x); y = ri(y); R.rect(x - w, y - 1, x + w, y, H('#8a5a3a')); R.rect(x - w + 1, y + 1, x + w - 1, y + 1, H('#5a3a24')); R.linea(x - w, y - 2, x + w, y - 2, H('#c8905a'));
  if (lleno > 0) { R.rect(x - w + 1, y - 2 - ri(lleno * 2), x + w - 1, y - 2, H('#e88a3a')); R.pset(x - 1, y - 2 - ri(lleno * 2), H('#ffd080')); } };
// sudor (dos gotitas que caen de la frente)
const sudor = (x, y, t) => { for (let i = 0; i < 2; i++) { const f = (t * 1.2 + i * 0.5) % 1; R.pset(ri(x + i * 3), ri(y + f * 6), H('#a8d8ff')); if (f < 0.6) R.pset(ri(x + i * 3), ri(y + f * 6) - 1, H('#ffffff')); } };
'''


# ──────────────────────────────────────────── LT-CIERRE ────────────────────────────────────────────
CIERRE = r'''
const atom = (x, s, t, o = {}) => AT.atom(R, ri(x), ri(s), t, o);
// el instante de la voz inglesa: s es el segundo de la palabra en esta escena (linea.json), escrito con su marca
const w = (s) => s < 26.7 ? en('dispersion', (s - 0.5) / 26.028) : s < 42.67 ? en('recuerdas', (s - 26.928) / 15.542) : en('pregunta', (s - 42.87) / 12.28);
const P2 = w(4.70), P3 = w(9.60), P4 = w(15.20), P5 = w(20.34), P6 = w(26.90), P7 = w(31.85), P8 = w(36.62), P9 = w(42.82), P10 = w(46.90), P11 = w(50.78);
const DIES = w(2.42), APART = w(4.34), THOUS = w(5.10), PEARL = w(7.90), AWARE = w(8.50), TURN = w(10.04), DESERT = w(11.84), FREE = w(14.26);
const EVERY = w(16.90), PLACES = w(19.96), ENEMY = w(21.18), PROPHET = w(22.72), FIND = w(25.06), AGAIN = w(26.02);
const BRIDGE = w(27.53), RIVER = w(29.59), FELL = w(30.85), CHOSEN = w(32.23), MONSTER = w(33.33), NINE = w(33.91), WE = w(35.37);
const PATH = w(37.67), AFRAID = w(38.33), SON = w(39.51), AFRAID2 = w(40.47), WALKED = w(41.47);
const ASKING = w(43.43), SAVE = w(45.01), HUMANITY = w(45.79), EVERYONE = w(47.57), HATE = w(48.45), THOUS2 = w(49.13), YEARS = w(49.83);
const STOP = w(51.15), YOURSELF = w(51.71), WOULD = w(52.63), DOIT = w(52.91), READING = w(54.03), COMMENTS = w(54.49);
const tr = (t, a, b) => ease(tramo(t, a, b));

// ── piezas propias ──
// LA TRUCHA CON SU PERLA: una mancha blanda de tierra oscura con filo claro, que se estira y se encoge al reptar, y una
// perla de luz que late. Devuelve la perla [x, y].
const TRU = pal('#22160e', '#3e2a1c', '#5e422c', '#7e5c3c', '#a8804e', '#d4ae74');
const trucha = (x, y, ang, L, t, k, perla = 1, anillos = false) => {
  const est = 1 + 0.22 * Math.sin(t * 7 + k * 1.7), Le = L * est, Wd = 1.4 / Math.sqrt(est) + L * 0.1, ca = Math.cos(ang), sa = Math.sin(ang), nx = -sa, ny = ca;
  const corre = ((t * 1.3 + k * 0.37) % 2) - 1;
  for (let pass = 0; pass < 2; pass++) for (let i = -Le / 2; i <= Le / 2; i += 0.5) { const q = 2 * i / Le, wq = Wd * Math.sqrt(Math.max(0, 1 - q * q)) * (1 + 0.12 * Math.sin(i * 1.3 + t * 8 + k)) + (pass ? 0 : 0.9);
    for (let j = -wq; j <= wq; j += 0.5) { const px = ri(x + ca * i + nx * j), py = ri(y + sa * i * 0.6 + ny * j); if (px < 0 || py < 0 || px > 319 || py > 179) continue;
      if (!pass) { R.pset(px, py, TRU[0]); continue; }
      const up = ny * j < -wq * 0.35 || (ny * j < 0 && Math.abs(q) > 0.75); let v = up ? 4.4 : ny * j > wq * 0.45 ? 1.2 : 2.4; if (Math.abs(q - corre) < 0.14 && up) v = 5; if (((ri(i * 2) + k) % 5) === 0 && !up) v -= 0.6; if (anillos && ((i + Le / 2) % 4) < 1.1) v -= 2.4; if (anillos && up && ((i + Le / 2) % 4) > 2.4) v = 5; if (anillos && q > 0.8 && Math.abs(ny * j) < 0.6) v = 0;
      R.pset(px, py, tono(TRU, v, px, py)); } }
  const pxp = x + ca * L * 0.08 + nx * -Wd * 0.2, pyp = y + sa * L * 0.05 - Wd * 0.9;
  if (perla > 0) { const lat = 0.7 + 0.3 * Math.sin(t * 5 + k); bola(pxp, pyp, 2, H('#fff0a0'), 0.6 * perla * lat); ps(pxp, pyp, mez(H('#ffe070'), H('#ffffff'), lat)); }
  return [pxp, pyp];
};
// una garza que espera en el agua y levanta el vuelo (vuela 0–1)
const garza = (x, y, t, vuela) => { x = ri(x); y = ri(y); const G = H('#b8bcc8'), GS = H('#6a6e80'), Kk = H('#1e1c28');
  if (vuela <= 0) { R.linea(x, y, x - 1, y - 6, Kk); R.linea(x + 2, y, x + 2, y - 6, Kk);
    for (let j = 0; j < 4; j++) R.linea(x - 3 + j, y - 10 + j, x + 5, y - 9 + j, j < 2 ? G : GS); R.linea(x - 3, y - 10, x + 5, y - 10, Kk);
    const pico = Math.sin(t * 0.8) > 0.6 ? 1 : 0; R.linea(x + 4, y - 11, x + 5, y - 16, G); R.linea(x + 5, y - 16, x + 7, y - 17, G); R.pset(x + 7, y - 18, Kk); R.linea(x + 8, y - 17, x + 11, y - 16 + pico, H('#e8b840')); return; }
  const a = Math.sin(t * 16) > 0; R.linea(x - 4, y, x + 4, y, G); R.linea(x - 4, y + 1, x + 3, y + 1, GS); R.linea(x + 4, y, x + 8, y - 2, G); R.linea(x + 8, y - 2, x + 11, y - 2, H('#e8b840')); R.linea(x - 4, y + 1, x - 8, y + 2, Kk);
  if (a) { R.linea(x - 2, y, x - 6, y - 6, G); R.linea(x, y, x - 3, y - 7, GS); } else { R.linea(x - 2, y + 1, x - 6, y + 6, G); R.linea(x, y + 1, x - 3, y + 6, GS); } };
// juncos y espadañas de primer término que se mecen (en x0..x1, desde el suelo yb)
const juncos = (x0, x1, yb, t, k = 0, alto = 46) => { for (let i = 0; i < (x1 - x0) / 3; i++) { const x = x0 + i * 3 + ri(hh(i, 1, k) * 2), h = alto * (0.5 + hh(i, 2, k) * 0.5), sw = Math.sin(t * 1.6 + i * 0.7 + k) * 3;
  for (let j = 0; j < h; j++) { const u = j / h; ps(x + sw * u * u, yb - j, u > 0.8 ? H('#4a5a2a') : (i & 1) ? H('#1e2a16') : H('#2e3c1e')); }
  if (hh(i, 3, k) > 0.6) { const tx = x + sw, ty = yb - h; R.rect(ri(tx) - 1, ri(ty) - 1, ri(tx), ri(ty) + 4, H('#4a2a18')); ps(tx - 1, ty - 1, H('#7a4a28')); } } };
// luciérnagas
const luciernagas = (t, n, zona, k = 0) => { const [x0, y0, x1, y1] = zona; for (let i = 0; i < n; i++) { const x = x0 + (hh(i, 1, k) * (x1 - x0) + Math.sin(t * 0.7 + i) * 8), y = y0 + (hh(i, 2, k) * (y1 - y0) + Math.sin(t * 1.1 + i * 2) * 5), b = Math.sin(t * 3 + i * 1.9);
  if (b > 0.1 && libreAtom(x, y)) { mezP(x, y, H('#f0ff9a'), 0.9); if (b > 0.7) { mezP(x + 1, y, H('#c8ff6a'), 0.4); mezP(x - 1, y, H('#c8ff6a'), 0.4); mezP(x, y - 1, H('#c8ff6a'), 0.4); } } } };
const estrellas = (t, n, y1, k = 0, x0 = 0, x1 = 320) => { for (let i = 0; i < n; i++) { const x = ri(x0 + hh(i, 1, k) * (x1 - x0)), y = ri(hh(i, 2, k) * y1); if (!libreAtom(x, y)) continue;
  const b = 0.5 + 0.5 * Math.sin(t * (1.5 + hh(i, 3, k) * 3) + i); mezP(x, y, H('#fff8e0'), 0.3 + b * 0.6);
  if (hh(i, 4, k) > 0.88 && b > 0.75) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) mezP(x + dx, y + dy, H('#fff8e0'), 0.35); } };
const CIE_OC = pal('#16123a', '#221a48', '#38225a', '#5a2c64', '#843a66', '#b44e60', '#de6e58', '#f2985a', '#f8c070');
const NUB_OC = [pal('#3a2244', '#8a4458', '#e88a68'), pal('#2e1c3a', '#6e3650', '#c46a62'), pal('#4a2a4a', '#a45460', '#f4a874')];

// ══ 1 · fondo local 'la ribera desde lo alto, a la hora azul': en el centro del río sube una columna de motas de luz (lo
//    último de él) en «dies»; del agua salen las truchas con su perla y reptan ribera arriba, en abanico, hacia el bosque;
//    en «comes apart» la cierva del lindero levanta la cabeza y se mete en el bosque ══
const CIE1 = pal('#0e1430', '#141c3c', '#1c2648', '#263256', '#324064', '#465274', '#5e6684', '#7a7c92');
const AGU1 = pal('#0a1024', '#0e162e', '#141e3a', '#1c2846', '#263454', '#344464', '#4a5a7a', '#7a88a4');
const ARE1 = pal('#1e1a26', '#2a2430', '#3a323a', '#4c4246', '#605454', '#766a66', '#8e8278');
const BOS1 = pal('#081014', '#0c181a', '#102020', '#162a26', '#1e362e', '#2a4438', '#3a5444');
const fondo1 = () => horno('f1b', () => {
  pintaCielo(CIE1, 0, 58, null, 1);
  pintaCapa({ y: 40, amp: 6, f: 0.025, ph: 0.8, v: 1.6, luz: 0.8, k: 11, cols: pal('#141a34', '#1a2240', '#222a4a', '#2c3456', '#384060'), copas: true }, 0, 64);
  pintaCapa({ y: 54, amp: 5, f: 0.05, ph: 2.1, v: 2.2, luz: 1.2, k: 12, cols: BOS1, copas: true }, 0, 84);
  // la ribera de arena, de 84 a 128, con su pendiente hacia el agua
  for (let y = 78; y < 132; y++) for (let x = 0; x < 320; x++) { const top = 80 + Math.sin(x * 0.04 + 1) * 3 + Math.sin(x * 0.11) * 1.5, bot = 126 + Math.sin(x * 0.035) * 3 + Math.sin(x * 0.12 + 2) * 1.5;
    if (y < top || y > bot) continue; const d = (y - top) / (bot - top); let v = 4.4 - d * 2.2 + (hh(x, y, 15) - 0.5) * 0.9 + Math.sin(x * 0.25 + y * 1.3 + Math.sin(x * 0.04) * 3) * 0.4; if (y > bot - 3) v -= 1.2; if (y < top + 1) v -= 1.5;
    R.pset(x, y, tono(ARE1, v, x, y)); }
  // el río de abajo (y 124–180) con el reflejo de la luna en x 236
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { const bot = 126 + Math.sin(x * 0.035) * 3 + Math.sin(x * 0.12 + 2) * 1.5; if (y <= bot) continue; const d = (y - bot) / 56;
    let v = 3.2 - d * 1.6 + Math.sin(x * 0.07 + y * 0.8) * 0.5 + (hh(x >> 3, y, 13) - 0.5) * 0.6; const sx = Math.abs(x - 236 - Math.sin(y * 1.5) * (2 + d * 5)); if (sx < 3 + d * 9 && (y % 3) !== 0) v += 3.2 * (1 - sx / (3 + d * 9));
    if (y < bot + 2) v += 2; R.pset(x, y, tono(AGU1, v, x, y)); }
  // piedras, matas y un tronco caído en la ribera; cañas en el borde del agua
  const ROC = pal('#141218', '#24202a', '#36303a', '#4a424c', '#625a62');
  roca(40, 100, 9, 6, ROC, 2); roca(282, 96, 12, 7, ROC, 5); roca(196, 88, 6, 4, ROC, 7); roca(98, 116, 5, 3, ROC, 9);
  for (let x = 120; x <= 176; x++) { const yy = 88 + ri(Math.sin(x * 0.12)); for (let j = -2; j <= 2; j++) R.pset(x, yy + j, Math.abs(j) === 2 ? H('#0e0a0c') : tono(pal('#2a2026', '#3e3034', '#56443e', '#6e5a4c'), 2 - j * 0.6 + (x % 7 === 0 ? -1 : 0), x, yy + j)); }
  for (let k = 0; k < 70; k++) { const x = ri(hh(k, 1, 16) * 320), y = ri(86 + hh(k, 2, 16) * 38); const r = hh(k, 3, 16) > 0.75 ? 2 : 1; R.disco(x, y, r, H('#141218')); R.pset(x - (r > 1 ? 1 : 0), y - (r > 1 ? 1 : 0), H('#9a9098')); }
  for (let k = 0; k < 5; k++) { const x0 = 20 + k * 64 + ri(hh(k, 4, 16) * 20), y0 = 104 + ri(hh(k, 5, 16) * 16); R.linea(x0, y0, x0 + 9, y0 - 2, H('#1a1214')); R.linea(x0, y0 - 1, x0 + 9, y0 - 3, H('#7a6656')); }
  for (const [x, y] of [[20, 90], [70, 86], [250, 88], [306, 104], [150, 112], [230, 118], [12, 120], [190, 104]]) for (let i = -3; i <= 3; i++) R.linea(x + i, y, x + i * 2, y - 4 - (i & 1) * 2, i & 1 ? H('#1e2a22') : H('#34463a'));
});
const cierva = (x, y, t, alza, huye) => { x = ri(x); y = ri(y); const C1 = H('#8a6a4a'), C2 = H('#5a4430'), Kk = H('#140e0c');
  const p = huye > 0 ? Math.floor(t * 10) % 2 : 0; R.rect(x - 6, y - 7, x + 4, y - 4, Kk); R.rect(x - 5, y - 6, x + 3, y - 5, C1); R.linea(x - 5, y - 4, x + 3, y - 4, C2);
  for (const lx of [-5, -3, 1, 3]) R.linea(x + lx, y - 3, x + lx + (p && lx > 0 ? 1 : 0) - (p && lx < 0 ? 1 : 0), y, Kk);
  const cy = alza ? y - 13 : y - 6; R.linea(x + 3, y - 6, x + 5, cy + 2, C1); R.rect(x + 4, cy, x + 7, cy + 2, C1); R.pset(x + 8, cy + 1, Kk); R.pset(x + 5, cy - 1, C2); R.pset(x + 4, cy - 2, C2); R.pset(x - 6, y - 7, H('#e8dcc8')); };
const p1 = (t) => {
  R.copiar(fondo1());
  estrellas(t, 46, 40, 3);
  R.disco(64, 30, 7, H('#f0ecd8')); R.disco(66, 29, 2, H('#d8d0b8')); R.disco(61, 33, 1, H('#d8d0b8')); for (let r = 9; r < 18; r += 2) bola(64, 30, r, H('#a8b8e8'), 0.035);
  nubes(t, [[100, 26, 50, 1.2], [200, 44, 46, 2.2], [10, 50, 40, 0.8], [250, 58, 40, 3]], [pal('#1e2440', '#3a4466', '#6a7898'), pal('#1a2038', '#30385a', '#58668a'), pal('#222a48', '#44507a', '#7a88aa')], 1);
  for (let k = 0; k < 3; k++) pajaro(((240 - t * 10 - k * 14) % 380 + 380) % 380 - 30, 46 + k * 3 + Math.sin(t * 2 + k) * 1.5, t, H('#0e1222'), k);
  // ondas del río y el brillo de la luna
  for (let k = 0; k < 34; k++) { const f = (t * 0.2 + hh(k, 3, 21)) % 1, y = 132 + f * 46, x = (hh(k, 1, 21) * 340 + t * 4) % 340 - 10, L = 2 + ri(f * 8), a = Math.sin(f * Math.PI) * 0.6;
    for (let i = 0; i < L; i++) mezP(x + i, y, Math.abs(x - 236) < 16 ? H('#e8ecff') : H('#5a6a92'), a); }
  // donde se hundió: anillos y una columna de motas de luz que sube en «dies»
  const C = [150, 156], sub = tramo(t, DIES - 0.6, P2 + 0.4);
  for (let q = 0; q < 3; q++) { const f = (t * 0.5 + q / 3) % 1; for (let a = 0; a < 70; a++) { const an = a / 70 * 6.283; mezP(C[0] + Math.cos(an) * (6 + f * 46), C[1] + Math.sin(an) * (2 + f * 10), H('#c8d8ff'), 0.55 * (1 - f)); } }
  for (let k = 0; k < 60 * sub; k++) { const f = (t * 0.35 + hh(k, 1, 33)) % 1, x = C[0] + (hh(k, 2, 33) - 0.5) * 26 * (1 - f * 0.4) + Math.sin(t * 2 + k) * 2, y = C[1] - f * 120; if (!libreAtom(x, y)) continue;
    mezP(x, y, k % 3 ? H('#fff0a0') : H('#a8d8ff'), 0.9 * (1 - f)); if (k % 4 === 0) bola(x, y, 1, H('#fff6c8'), 0.3 * (1 - f)); }
  // la silueta oscura del gusano bajo el agua, con sus anillos, que se deshace en motas
  const se = 1 - tramo(t, DIES - 0.2, APART + 0.3);
  if (se > 0) for (let y = -7; y <= 7; y++) for (let x = -44; x <= 44; x++) { const e = (x / 44) ** 2 + (y / 7) ** 2; if (e > 1 || hh(x + 60, y + 20, 34) > se * 1.2) continue; const an = ((x + 60) % 9) < 2;
    mezP(C[0] + x, C[1] + y, an ? H('#3a4a6a') : H('#060a16'), (0.75 - e * 0.3) * se); if (!an && hh(x, y, 35) > 0.985) mezP(C[0] + x, C[1] + y, H('#ffe890'), se); }
  // la cierva del lindero levanta la cabeza y se mete en el bosque en «comes apart»
  const hv = tramo(t, APART - 0.3, P2 + 0.2); if (hv < 0.95) cierva(258 + hv * 50, 82 - hv * 6, t, t > DIES + 0.4, hv);
  // las truchas salen del agua y reptan ribera arriba en abanico, cada una con su perla
  for (let k = 0; k < 46; k++) { const ts = DIES - 0.2 + hh(k, 1, 31) * 1.7; if (t < ts) continue; const d = (t - ts) * (16 + hh(k, 2, 31) * 14), a = -Math.PI * (0.06 + 0.88 * hh(k, 3, 31));
    const x = C[0] + Math.cos(a) * (14 + d * 2.6), y = 128 + Math.sin(a) * d * 1.1; if (y < 82 || x < 2 || x > 317) continue; const esc = 1 - (128 - y) / 80;
    trucha(x, y, Math.atan2(Math.sin(a) * 0.95, Math.cos(a) * 3.2), 4 + esc * 5, t, k, tramo(t, ts, ts + 0.3)); }
  luciernagas(t, 10, [10, 70, 310, 124], 2);
  juncos(0, 24, 180, t, 3, 50); juncos(298, 320, 180, t, 4, 46);
};

// ══ 2 · inserto 'la arena de cerca': una trucha grande cruza con su perla (en «pearl» brilla y se le ven los ojos azules
//    de Leto: su conciencia); detrás, cientos de truchas pequeñas se van en todas direcciones; Atom llega y se asombra ══
const ARE2 = pal('#3a2430', '#5a3438', '#7a4a42', '#9a6250', '#b87c5e', '#d09870', '#e4b488', '#f2cca0');
const fondo2 = () => horno('f2', () => {
  pintaCielo(CIE_OC, 0, 60, [60, 58, 6], 4);
  pintaCapa({ y: 52, amp: 6, f: 0.022, ph: 0.4, v: 2.2, luz: 1.4, k: 21, cols: pal('#3a2034', '#5a2c3e', '#7a3c46', '#9a5050', '#b8685a') }, 0, 70);
  pintaCapa({ y: 64, amp: 4, f: 0.035, ph: 2, v: 3.4, luz: 1.6, k: 22, cols: ARE2, cae: -0.012 }, 0, 180);
  // los granos grandes de primer término (más grandes cuanto más cerca)
  for (let k = 0; k < 900; k++) { const y = 80 + ri(hh(k, 2, 23) ** 0.7 * 100), x = ri(hh(k, 1, 23) * 320), s = y > 150 ? 2 : y > 118 ? 1 : 0, c = hh(k, 3, 23);
    const col = c > 0.66 ? H('#f8e0b8') : c > 0.33 ? H('#6a3a36') : H('#c88a64'); if (s === 0) R.pset(x, y, col); else R.rect(x, y, x + s - 1, y + s - 1, col); if (s > 1 && c > 0.66) R.pset(x + 1, y + 1, H('#b47a5a')); }
  // guijarros, una ramita seca, una concha y una mata de hierba seca
  const ROC = pal('#2a1a1e', '#46303a', '#644a4c', '#866660', '#a88474', '#c8a48c');
  roca(36, 172, 14, 8, ROC, 2); roca(290, 166, 16, 9, ROC, 5); roca(208, 178, 9, 5, ROC, 7); roca(112, 124, 5, 3, ROC, 9); roca(250, 118, 4, 3, ROC, 4);
  for (let i = 0; i < 46; i++) { const x = 172 + i, y = ri(150 - i * 0.28 + Math.sin(i * 0.3) * 1.2); R.pset(x, y, H('#2a1a14')); R.pset(x, y - 1, H('#8a6044')); if (i % 11 === 5) { R.linea(x, y - 1, x + 3, y - 5, H('#6a4630')); R.pset(x + 3, y - 6, H('#a8805a')); } }
  for (let a = 0; a < 40; a++) { const an = a / 40 * 9, r = 0.6 * an; R.pset(ri(70 + Math.cos(an) * r), ri(150 + Math.sin(an) * r * 0.7), a % 3 ? H('#f4e8dc') : H('#b8a090')); }
});
const mata = (x, y, t, k = 0) => { for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * 0.2 + Math.sin(t * 2.2 + i * 0.5 + k) * 0.08, L = 14 + (i % 3) * 5;
  for (let j = 0; j < L; j++) ps(x + Math.cos(a) * j + (i - 4) * 0.5, y + Math.sin(a) * j, j > L - 3 ? H('#d8c890') : i & 1 ? H('#8a7a4a') : H('#a8945a')); } };
const p2 = (t) => {
  R.copiar(fondo2());
  estrellas(t, 26, 40, 5);
  nubes(t * 0.8, [[30, 30, 50, 1.4], [170, 46, 40, 2.6], [250, 54, 36, 1]], NUB_OC, 3);
  // cientos de truchas pequeñas que se alejan reptando desde el centro, en todas direcciones
  for (let k = 0; k < 44; k++) { const f = ((t - P2) * (0.06 + hh(k, 2, 41) * 0.05) + hh(k, 1, 41)) % 1, a = hh(k, 3, 41) * Math.PI * 2, x = 160 + Math.cos(a) * (8 + f * 180), y = 92 + Math.sin(a) * (3 + f * 24) + f * 6;
    if (y < 70 || y > 124) continue; for (let q = 1; q < 5; q++) { const f2 = Math.max(0, f - q * 0.025); mezP(160 + Math.cos(a) * (8 + f2 * 180), 92 + Math.sin(a) * (3 + f2 * 24) + f2 * 6, H('#4a2a24'), 0.35); }
    trucha(x, y, Math.atan2(Math.sin(a) * 0.4, Math.cos(a)), 5 + f * 4, t, k, 1); }
  // el viento arrastra granos a ras del suelo
  for (let k = 0; k < 40; k++) { const x = (hh(k, 1, 42) * 360 + t * (60 + hh(k, 2, 42) * 40)) % 360 - 20, y = 100 + hh(k, 3, 42) * 76 + Math.sin(t * 3 + k) * 2; mezP(x, y, H('#f8e0b8'), 0.6); mezP(x - 1, y, H('#f8e0b8'), 0.3); }
  mata(20, 140, t, 1); mata(306, 150, t, 2);
  // la trucha grande (al triple) cruza de izquierda a derecha
  const u = tramo(t, P2 + 0.1, P3 - 0.3), X = lerp(-10, 166, u) + Math.sin(t * 5) * 1, Y = 150 - Math.sin(u * 3) * 4, ang = -0.08 + Math.sin(t * 3) * 0.06;
  for (let x = -10; x < X - 30; x++) { const yy = Y + 3 + Math.sin(x * 0.08) * 1.5; mezP(x, yy, H('#5a3030'), 0.45); mezP(x, yy + 1, H('#5a3030'), 0.3); mezP(x, yy + 2, H('#f8d8b0'), 0.35); }
  const pl = AT.escalado(R, () => trucha(15, 10, ang, 22, t, 3, 0, true), 32, 20, ri(X - 45), ri(Y - 30), 3);
  const px = ri(X - 45 + pl[0] * 3 + 1), py = ri(Y - 30 + pl[1] * 3 + 1), luz = 0.5 + tramo(t, PEARL - 0.2, PEARL + 0.3) * 0.5;
  for (let r = 12; r > 0; r -= 2) bola(px, py, r, H('#fff0a0'), 0.07 * luz);
  for (let k = 0; k < 8; k++) { const an = k / 8 * 6.283 + t * 0.6, L2 = (6 + 5 * luz) * (k & 1 ? 0.6 : 1); for (let i = 5; i < L2 + 5; i++) mezP(px + Math.cos(an) * i, py + Math.sin(an) * i, H('#fff6c0'), 0.5 * luz * (1 - (i - 5) / L2)); }
  R.disco(px, py, 5, H('#3a2414')); R.disco(px, py, 4, H('#ffe070')); R.disco(px, py, 3, H('#fff6c8')); ps(px - 1, py - 2, H('#ffffff')); ps(px - 2, py - 1, H('#ffffff'));
  if (t > AWARE - 0.2) { const o = tramo(t, AWARE - 0.2, AWARE + 0.3); if (o > 0.4) { R.rect(px - 2, py, px - 1, py + 1, H('#2a6ad8')); R.rect(px + 1, py, px + 2, py + 1, H('#2a6ad8')); ps(px - 2, py, H('#a8d8ff')); ps(px + 1, py, H('#a8d8ff')); } }
  // Atom llega por la derecha, se agacha a mirar (sorpresa en «pearl», sonrisa en «awareness»)
  const va = tramo(t, P2 + 0.2, P2 + 1.4), ax = lerp(340, 252, ease(va));
  atom(ax, 174, t, { s: 2, dir: -1, pose: va > 0 && va < 1 ? 'camina' : t > PEARL - 0.2 && t < AWARE + 0.4 ? 'senala' : 'piensa', cara: t > AWARE ? 'sonrisa' : t > PEARL - 0.3 ? 'sorpresa' : 'normal' });
};

// ══ 3 · imperio 'dispersion/general': el bosque se vuelve desierto en ondas en «Arrakis back into a desert»; las perlas suben;
//    en el mirador, dos fremen lo señalan, se sorprenden y en «free» alzan los brazos y saltan ══
const p3 = (t) => {
  const d = Math.min(1, tr(t, TURN - 0.4, DESERT + 1.6) * 1.04);
  T.imperio(R, t, { encuadre: 'dispersion', desierto: d });
  const libre = t > FREE - 0.1, sal = libre ? ri(Math.abs(Math.sin((t - FREE) * 7)) * 4 * Math.max(0, 1 - (t - FREE) * 0.6)) : 0;
  R.actor(PA.fremen, 34, 150, t, { dir: 1, dedo: t < DESERT && t > P3 + 0.3, sorpresa: t > DESERT - 0.2 && t < FREE, brazos: libre, sonrisa: libre, salto: sal });
  R.actor(PA.fremenMujer, 60, 150, t, { dir: 1, habla: t > P3 + 0.6 && t < TURN + 0.6 && Math.sin(t * 9) > 0, sorpresa: t > DESERT - 0.2 && t < FREE, brazos: libre, sonrisa: libre, salto: libre ? ri(Math.abs(Math.sin((t - FREE) * 7 + 1)) * 3 * Math.max(0, 1 - (t - FREE) * 0.6)) : 0 });
  T.imperioDelante(R, t, { encuadre: 'dispersion', desierto: d });
};

// ══ 4 · imperio 'dispersion/estrellas': las naves diminutas salen en todas direcciones (naves 0→1 hasta «places»); en el
//    horizonte un vecino sube a su nave pequeña y despega en «every direction»; su vecina le dice adiós ══
const naveta = (x, y, t, fuego) => { x = ri(x); y = ri(y); const Bc = H('#c8ccd8'), Bs = H('#7a7e94'), Kk = H('#14141e');
  R.rect(x - 8, y - 5, x + 8, y, Kk); R.rect(x - 7, y - 4, x + 7, y - 1, Bc); R.rect(x - 7, y - 1, x + 7, y - 1, Bs); R.rect(x - 4, y - 8, x + 3, y - 5, Kk); R.rect(x - 3, y - 7, x + 2, y - 5, H('#6ac8e8')); ps(x - 2, y - 7, H('#ffffff'));
  R.rect(x - 10, y - 2, x - 8, y + 2, Kk); R.rect(x + 8, y - 2, x + 10, y + 2, Kk); ps(x - 5, y - 3, H('#e84a4a')); ps(x + 5, y - 3, H('#4ae86a'));
  if (fuego > 0) for (let i = 0; i < 6; i++) { const L = ri(3 + fuego * 6 + Math.sin(t * 40 + i) * 2); R.linea(x - 4 + i * 2 - 1, y + 1, x - 4 + i * 2 - 1, y + 1 + L, i & 1 ? H('#ffd060') : H('#ff8a3a')); } };
const p4 = (t) => {
  const n = tr(t, P4 + 0.1, PLACES + 0.3);
  T.imperio(R, t, { encuadre: 'dispersion', camara: 'estrellas', naves: n });
  // dos naves pasan cerca, cada una hacia un lado, con su estela; Atom luciérnaga las despide
  const SO = w(18.2);
  for (const [t0, x0, y0, x1, y1, k] of [[EVERY - 0.7, -30, 176, 350, 84, 0], [SO - 0.4, 350, 168, -30, 74, 1]]) { const u = tramo(t, t0, t0 + 2.2); if (u <= 0 || u >= 1) continue;
    const e = u * u * (3 - 2 * u) * 0.6 + u * 0.4, x = lerp(x0, x1, e), y = lerp(y0, y1, e) + Math.sin(u * 3) * 6, dx = x1 - x0, dy = y1 - y0, dl = Math.hypot(dx, dy);
    for (let i = 0; i < 60; i++) mezP(x - dx / dl * i * 1.4, y - dy / dl * i * 1.4 + (i & 1), H(k ? '#a8e0ff' : '#ffd8a0'), 0.7 * (1 - i / 60));
    AT.escalado(R, () => naveta(12, 10, t, 1), 24, 18, ri(x - 24), ri(y - 20), 2); }
  const af = tramo(t, P4 + 0.2, PLACES), axx = 150 + Math.sin(af * 5) * 50 + af * 20, ayy = 118 - af * 40 + Math.sin(t * 2.3) * 4, mira = Math.cos(af * 5) > 0 ? 1 : -1;
  AT.luciernaga(R, ri(axx), ri(ayy), t, { dir: mira, brillo: 0.9, cara: t > EVERY - 0.2 && t < EVERY + 0.5 ? 'sorpresa' : 'sonrisa' });
};
'''

CIERRE += r'''
// ══ 5 · inserto 'la carta de estrellas en la mesa': los puntos de luz se esparcen desde la estrella del centro hasta el
//    borde; en «enemy» entra una mano con una lupa y los puntos huyen de ella («?»); en «prophet», el dedo de otra mano
//    tampoco atrapa ninguno («?»); en «find all of it» la carta se llena de puntos y las manos se retiran ══
const MAD = pal('#1e100a', '#2e180e', '#422214', '#58301c', '#704026', '#8a5432', '#a86a40');
const PERG = pal('#6a4a2e', '#8a6844', '#a8865a', '#c4a272', '#dcbc8c', '#ecd2a4');
const CIEL5 = pal('#0a0e22', '#10162e', '#18203c', '#22304e', '#2e4062');
const LAT = pal('#4a3416', '#7a5a24', '#a88234', '#d0aa4a', '#f0d070');
const C5 = [160, 98], R5 = 58;
const fondo5 = () => horno('f5', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor(y / 26), yy = y % 26; let v = 3.2 + Math.sin(x * 0.045 + tb * 3.1 + Math.sin(y * 0.35 + tb) * 1.8) * 0.7 + (hh(x >> 2, y, 50) - 0.5) * 0.5;
    if (yy === 0) v = 0.2; else if (yy === 1) v += 0.8; const nudo = Math.hypot((x - 70 - tb * 53 % 260) * 0.5, yy - 13); if (nudo < 4) v -= 1.2 - nudo * 0.2;
    v += Math.max(0, 1 - Math.hypot(x - 46, y - 80) / 170) * 1.4 - Math.max(0, Math.hypot(x - 160, y - 90) / 190 - 0.4) * 1.6; R.pset(x, y, tono(MAD, v, x, y)); }
  // la sombra de la carta y el pergamino cuadrado con sus esquinas dobladas
  for (let y = 26; y < 178; y++) for (let x = 84; x < 244; x++) if (x > 88 && y > 30 && x < 244 && y < 178) mezP(x + 4, y + 2, H('#120806'), x > 238 || y > 172 ? 0.5 : 0);
  for (let y = 28; y <= 170; y++) for (let x = 88; x <= 232; x++) { const e = Math.min(x - 88, 232 - x, y - 28, 170 - y); let v = 3.4 + (hh(x >> 1, y >> 1, 51) - 0.5) * 0.8 + Math.sin(x * 0.11 + y * 0.07) * 0.3 - (e < 3 ? 1.2 : 0);
    if (Math.hypot(x - 110, y - 150) < 9) v -= 0.8; R.pset(x, y, e === 0 ? H('#3a2414') : tono(PERG, v, x, y)); }
  // el aro de latón con sus marcas y el cielo de la carta
  for (let y = -R5 - 4; y <= R5 + 4; y++) for (let x = -R5 - 4; x <= R5 + 4; x++) { const d = Math.hypot(x, y), px = C5[0] + x, py = C5[1] + y;
    if (d > R5 + 4) continue; if (d > R5) { const an = Math.atan2(y, x); R.pset(px, py, d > R5 + 3.4 ? H('#2a1a0a') : tono(LAT, 2.6 - (x + y) / R5 * 1.2 + (Math.abs(((an / Math.PI * 18) % 1)) < 0.12 ? -1.4 : 0), px, py)); continue; }
    let v = 1.4 + (hh(px >> 2, py >> 2, 52) - 0.5) * 0.8 + Math.sin(x * 0.07 + y * 0.05) * 0.5 - d / R5 * 0.6; R.pset(px, py, tono(CIEL5, v, px, py)); }
  for (const rr of [18, 36]) for (let a = 0; a < rr * 5; a++) if (a % 3 === 0) { const an = a / (rr * 5) * Math.PI * 2; mezP(C5[0] + Math.cos(an) * rr, C5[1] + Math.sin(an) * rr, H('#6a7aa8'), 0.7); }
  for (let k = 0; k < 4; k++) { const an = k * Math.PI / 4; R.linea(ri(C5[0] - Math.cos(an) * R5), ri(C5[1] - Math.sin(an) * R5), ri(C5[0] + Math.cos(an) * R5), ri(C5[1] + Math.sin(an) * R5), mez(CIEL5[2], H('#6a7aa8'), 0.35)); }
  for (let k = 0; k < 60; k++) { const an = hh(k, 1, 53) * 6.28, d = hh(k, 2, 53) * (R5 - 3); R.pset(ri(C5[0] + Math.cos(an) * d), ri(C5[1] + Math.sin(an) * d), H('#5a6a98')); }
  // la vela en su palmatoria (izquierda), el tintero con la pluma, rollos, el compás, el catalejo y unas monedas
  R.disco(46, 98, 13, H('#2a1a0a')); for (let x = -13; x <= 13; x++) for (let y = -4; y <= 4; y++) if ((x / 13) ** 2 + (y / 4) ** 2 <= 1) R.pset(46 + x, 98 + y, tono(LAT, 2.6 - x / 13 - y / 4, 46 + x, 98 + y));
  for (let y = 62; y <= 96; y++) for (let x = 41; x <= 51; x++) R.pset(x, y, x === 41 || x === 51 ? H('#8a7a5a') : tono(pal('#b8a07a', '#d8c4a0', '#f0e4c8', '#fff8ea'), 2.6 - (x - 46) * 0.3, x, y));
  for (const [x, y0, L] of [[43, 62, 9], [49, 62, 5], [46, 62, 3]]) R.linea(x, y0, x, y0 + L, H('#fff8ea'));
  R.rect(270, 132, 288, 154, H('#0e0c14')); R.rect(272, 134, 286, 152, H('#1e2a44')); R.rect(274, 136, 276, 150, H('#4a5a7a')); R.rect(274, 128, 284, 132, H('#0e0c14')); R.rect(275, 129, 283, 131, H('#3a3a4a'));
  for (let i = 0; i < 40; i++) { const x = 280 + i * 0.7, y = 130 - i * 1.1; R.pset(ri(x), ri(y), H('#e8e0d0')); if (i > 8) { R.pset(ri(x) - 1, ri(y) + 1, H('#c8c0b0')); R.pset(ri(x) + 2, ri(y) + (i & 1), H('#f8f4ec')); } }
  for (const [x, y] of [[18, 140], [26, 156]]) { for (let i = 0; i < 44; i++) for (let j = -4; j <= 4; j++) R.pset(x + i, y + j, Math.abs(j) === 4 ? H('#4a3218') : tono(PERG, 3.6 - Math.abs(j) * 0.4 + (j < -1 ? 0.8 : 0), x + i, y + j)); R.disco(x, y, 4, H('#4a3218')); R.disco(x, y, 3, H('#c4a272')); R.disco(x, y, 1, H('#6a4a2e')); R.linea(x + 20, y - 4, x + 20, y + 4, H('#a83a2a')); }
  R.linea(250, 62, 262, 104, H('#1a1410')); R.linea(251, 62, 263, 104, H('#c8ccd8')); R.linea(252, 62, 244, 104, H('#1a1410')); R.linea(253, 62, 245, 104, H('#a8acb8')); R.disco(252, 62, 2, H('#d0aa4a'));
  for (let i = 0; i < 64; i++) { const x = 92 + i, y = ri(176 - i * 0.12), r = i < 20 ? 3 : 2; for (let j = -r; j <= r; j++) R.pset(x, y + j, Math.abs(j) === r ? H('#1a1008') : tono(LAT, 3 - j * 0.6 + (i % 16 === 0 ? -1.5 : 0), x, y + j)); }
  for (const [x, y] of [[300, 168], [306, 172], [296, 174]]) { R.disco(x, y, 3, H('#5a3a10')); R.disco(x, y, 2, H('#e8b840')); R.pset(x - 1, y - 1, H('#fff0a0')); }
});
const P5D = Array.from({ length: 150 }, (_, k) => ({ a: hh(k, 1, 54) * 6.283, d: 6 + hh(k, 2, 54) ** 0.55 * (R5 - 8), v: 0.6 + hh(k, 3, 54) * 0.8, c: [H('#ffffff'), H('#fff0a0'), H('#a8e8ff'), H('#ffd0a0')][k % 4], k }));
const p5 = (t) => {
  R.copiar(fondo5());
  // la llama de la vela y su luz que tiembla
  const fl = Math.sin(t * 13) * 0.5 + Math.sin(t * 7.3) * 0.5; bola(46, 56, 9, H('#ffc860'), 0.12 + fl * 0.03);
  for (let j = 0; j < 7; j++) { const w2 = j < 2 ? 1 : j < 5 ? 2 : 1; for (let i = -w2; i <= w2; i++) ps(46 + i + (j > 4 ? ri(fl) : 0), 60 - j, j < 2 ? H('#ffffff') : j < 4 ? H('#ffe070') : H('#ff9a3a')); } ps(46, 61, H('#2a1a0a'));
  // las manos: el enemigo con su lupa (por la derecha) y el profeta con su dedo (por la izquierda)
  const e1 = tr(t, ENEMY - 0.4, ENEMY + 0.2) - tr(t, AGAIN - 0.6, AGAIN + 0.2), e2 = tr(t, PROPHET - 0.4, PROPHET + 0.2) - tr(t, AGAIN - 0.5, AGAIN + 0.3);
  const h1 = [lerp(300, 216 + Math.sin(t * 1.7) * 10, e1), lerp(220, 148 + Math.cos(t * 1.3) * 6, e1)], h2 = [lerp(40, 110 + Math.sin(t * 1.4 + 1) * 8, e2), lerp(220, 150 + Math.sin(t * 2.1) * 5, e2)];
  const lente = [h1[0] - 18, h1[1] - 18];
  // los puntos de luz: se esparcen desde el centro; huyen de la lupa y del dedo
  const g = tr(t, P5 + 0.05, AGAIN - 0.4), mas = tramo(t, FIND - 0.3, FIND + 0.6);
  for (const p of P5D) { if (p.k > 90 + mas * 60) continue; let r = p.d * (0.08 + 0.92 * Math.min(1, g * p.v * 1.4)), an = p.a + t * 0.02;
    let x = C5[0] + Math.cos(an) * r, y = C5[1] + Math.sin(an) * r;
    for (const [hx, hy, on] of [[lente[0], lente[1], e1], [h2[0] + 6, h2[1] - 4, e2]]) if (on > 0.5) { const dx = x - hx, dy = y - hy, d = Math.hypot(dx, dy); if (d < 16) { x += dx / (d + 0.1) * (16 - d); y += dy / (d + 0.1) * (16 - d); } }
    if (Math.hypot(x - C5[0], y - C5[1]) > R5 - 1) continue; const b = 0.6 + 0.4 * Math.sin(t * 4 + p.k);
    ps(x, y, mez(CIEL5[2], p.c, b)); if (p.k % 5 === 0) { mezP(x + 1, y, p.c, 0.4 * b); mezP(x - 1, y, p.c, 0.4 * b); mezP(x, y - 1, p.c, 0.4 * b); mezP(x, y + 1, p.c, 0.4 * b); } }
  // la estrella del centro (Arrakis) se apaga a medida que se van
  R.disco(C5[0], C5[1], 3, mez(H('#e88a3a'), CIEL5[2], g * 0.6)); ps(C5[0] - 1, C5[1] - 1, H('#fff0a0'));
  if (e1 > 0) { AT.lupa(R, h1[0] - 4, h1[1] - 2, 2, -1); T.brazo(R, 254, 196, h1[0], h1[1], '#5a1e24', -1, { codo: [240, 178] }); }
  if (e2 > 0) T.brazo(R, 74, 198, h2[0], h2[1], '#6a5030', 1, { codo: [88, 178] });
  if (t > ENEMY + 0.9 && e1 > 0.9) R.icono('?', ri(h1[0] - 8), ri(h1[1] - 52), H('#e84a4a'), H('#1a0a0a'), 2);
  if (t > PROPHET + 1.2 && e2 > 0.9) R.icono('?', ri(h2[0] + 2), ri(h2[1] - 30), H('#f0c050'), H('#1a0a0a'), 2);
};

// ══ 6 · puente 'rio/vacio': el puente vacío al atardecer; Leto niño llega a la orilla con una piedra, mira el agua y en
//    «fell» la tira: cae al río, salpica y se abren los anillos ══
const p6 = (t) => {
  T.puente(R, t, { encuadre: 'rio', camara: 'vacio' });
  const va = tramo(t, P6 + 0.1, BRIDGE + 0.6), x = lerp(104, 150, ease(va)), tira = tramo(t, FELL - 0.55, FELL);
  const r = R.actor(T.LT.letoNinoLT, x, 152, t, { dir: 1, anda: va > 0 && va < 1, sostiene: tira <= 0 ? true : undefined, dedo: tira > 0 && t < FELL + 0.5, triste: t > FELL + 0.6, habla: t > RIVER - 0.3 && t < RIVER + 0.5 && Math.sin(t * 9) > 0 });
  const piedra = (px, py) => { R.rect(ri(px) - 2, ri(py) - 1, ri(px) + 1, ri(py) + 1, H('#1e1a20')); R.rect(ri(px) - 1, ri(py) - 1, ri(px), ri(py), H('#8a8894')); ps(px - 1, py - 1, H('#c8c8d0')); };
  if (tira <= 0 && r?.mano) piedra(r.mano[0], r.mano[1] - 1);
  if (tira > 0 && tira < 1) { const sx = 160, sy = 126; piedra(lerp(sx, 204, tira), lerp(sy, 116, tira) - Math.sin(tira * Math.PI) * 34); }
  if (t > FELL) { const u = t - FELL;
    for (let q = 0; q < 3; q++) { const f = u * 0.7 - q * 0.25; if (f <= 0 || f > 1) continue; for (let a = 0; a < 80; a++) { const an = a / 80 * 6.283; mezP(204 + Math.cos(an) * (3 + f * 30), 116 + Math.sin(an) * (1 + f * 7), H('#ffe8c0'), 0.7 * (1 - f)); } }
    if (u < 0.7) for (let k = 0; k < 9; k++) { const vx = (k - 4) * 6, f = u / 0.7; ps(204 + vx * f, 116 - Math.sin(f * Math.PI) * (10 + (k % 3) * 4), H('#f8f0e0')); } }
  T.puenteDelante(R, t, { encuadre: 'rio', camara: 'vacio' });
};
'''

CIERRE += r'''
// ══ 7 · fondo local 'la peña al ocaso y la sombra larga': Leto niño sube a la peña; el sol bajo a la izquierda le estira
//    la sombra por el llano; en «monster» la sombra se vuelve un gusano; en «nine» un «9»; en «we» una caravana de
//    familias cruza el llano tranquila y él sonríe y la señala ══
const CIE7 = pal('#2a1e4a', '#4a2a5e', '#7a3a66', '#b04e66', '#e06a5a', '#f4945a', '#fac070', '#fde4a0');
const NUB7 = [pal('#5a2a4a', '#c45a5a', '#fcb07a'), pal('#4a2246', '#a04a5a', '#f09070'), pal('#6a3250', '#d06a62', '#ffd090')];
const ARE7 = pal('#4a2a30', '#6a3a38', '#8e5040', '#b06a4a', '#cc8656', '#e4a468', '#f4c484');
const ROC7 = pal('#2a1620', '#46242a', '#663634', '#884c3e', '#a8664a', '#c8845a', '#e0a46e');
const fondo7 = () => horno('f7', () => {
  pintaCielo(CIE7.slice().reverse().reverse(), 0, 104, [44, 100, 12], 7);
  pintaCapa({ y: 100, amp: 4, f: 0.03, ph: 0.6, v: 2.2, luz: 1, k: 71, cols: pal('#5a2a4a', '#7a3a52', '#9a4c5a', '#b86462') }, 0, 116);
  pintaCapa({ y: 112, amp: 5, f: 0.02, ph: 2.2, v: 2.6, luz: 1.2, k: 72, cols: pal('#6a3240', '#8a4448', '#aa5a50', '#c87458', '#e08e62') }, 0, 126);
  pintaCapa({ y: 124, amp: 2, f: 0.015, ph: 1.4, v: 3.4, luz: 1.4, k: 73, cols: ARE7, cae: -0.03 }, 0, 180);
  // la peña de la izquierda donde sube Leto
  roca(92, 140, 44, 26, ROC7, 3); roca(54, 156, 22, 16, ROC7, 6); roca(128, 154, 18, 12, ROC7, 8);
  for (let x = 54; x < 132; x++) { const y = ri(116 + Math.abs(x - 92) * 0.12 + Math.sin(x * 0.3) * 0.8); R.pset(x, y, H('#ffc890')); R.pset(x, y + 1, H('#d89068')); }
  // matojos secos y huesos de una cresta lejana
  for (const [x, y] of [[176, 170], [236, 152], [300, 174], [150, 136]]) for (let i = -3; i <= 3; i++) R.linea(x + i, y, x + i * 2, y - 4 - (i & 1) * 2, i & 1 ? H('#5a3a2a') : H('#8a6040'));
});
const sombraLarga = (t, m) => {
  const A = [104, 118], B = [298, 160], L = Math.hypot(B[0] - A[0], B[1] - A[1]), ux = (B[0] - A[0]) / L, uy = (B[1] - A[1]) / L, nx = -uy, ny = ux;
  for (let i = 0; i <= L; i += 0.5) { const s = i / L, nino = s < 0.84 ? 2.2 + (s < 0.5 ? 0.6 : 0) : 4 * Math.sqrt(Math.max(0, 1 - ((s - 0.92) / 0.08) ** 2));
    const anillo = ((s * 12 + t * 0.4) % 1) < 0.22 ? -2.5 : 0, gus = s < 0.86 ? 4 + 5 * s + anillo + Math.sin(s * 9 + t * 1.5) * 0.6 : 9 * Math.sqrt(Math.max(0, 1 - ((s - 0.92) / 0.09) ** 2));
    const hw = lerp(nino, gus, m);
    const gap = m > 0.5 && anillo < 0; for (let j = -hw; j <= hw; j += 0.5) mezP(A[0] + ux * i + nx * j, A[1] + uy * i + ny * j * 0.7, H('#2a0e2a'), gap ? 0.3 : Math.abs(j) > hw - 1 ? 0.75 : 0.6); }
  if (m > 0.6) { const hx = B[0] - ux * 9, hy = B[1] - uy * 9, a = (m - 0.6) / 0.4; for (const dx of [-3, 3]) { mezP(hx + dx, hy - 1, H('#6ab0ff'), 0.8 * a); mezP(hx + dx, hy, H('#6ab0ff'), 0.6 * a); } }
};
const p7 = (t) => {
  R.copiar(fondo7());
  nubes(t, [[10, 40, 70, 1.4], [130, 58, 60, 2.6], [220, 64, 64, 0.9], [60, 76, 44, 3.6], [180, 84, 50, 2], [270, 78, 56, 1.7], [330, 92, 40, 3]], NUB7, 7);
  for (let k = 0; k < 4; k++) pajaro(((300 - t * 9 - k * 15) % 380 + 380) % 380 - 30, 64 + (k % 2) * 5 + Math.sin(t * 2 + k) * 1.5, t, H('#3a1a30'), k);
  // el viento levanta arena de la cresta
  for (let k = 0; k < 24; k++) { const f = (t * 0.8 + hh(k, 1, 74)) % 1; mezP(130 + f * 120 + hh(k, 2, 74) * 20, 120 - f * 6 + hh(k, 3, 74) * 6, H('#fde0b0'), 0.5 * (1 - f)); }
  const m = tr(t, MONSTER - 0.4, MONSTER + 0.7); sombraLarga(t, m);
  // la caravana de familias que cruza el llano en «so that we wouldn't have to»
  for (let k = 0; k < 7; k++) { const x = 40 + (t - P7) * 20 - k * 16, y = 172 - (k % 2) * 3, bob = Math.floor(t * 6 + k) % 2;
    if (x < -6 || x > 330) continue; const cols = [H('#3a5a8a'), H('#8a3a3a'), H('#4a7a4a'), H('#8a6a3a')]; if (k === 3) { devoto(x, y - bob, H('#c87a3a'), 0, H('#f0c8a0')); continue; }
    devoto(x, y - bob, cols[k % 4], 0, H('#e8c0a0')); if (k % 3 === 0) { R.rect(ri(x) + 2, ri(y) - 9 - bob, ri(x) + 5, ri(y) - 5 - bob, H('#5a3a20')); R.pset(ri(x) + 3, ri(y) - 9 - bob, H('#a8804a')); } }
  // Leto sube a la peña, mira al sol en «chosen», a su sombra en «nine» y sonríe a la caravana en «we»
  const sb = tramo(t, P7 + 0.1, CHOSEN - 0.1), x = lerp(76, 98, ease(sb)), suelo = lerp(121, 117, sb);
  const mira = t > CHOSEN && t < NINE - 0.2 ? -1 : 1;
  R.actor(T.LT.letoNinoLT, x, suelo, t, { dir: mira, anda: sb > 0 && sb < 1, sonrisa: t > WE, dedo: t > WE + 0.2, triste: t > MONSTER && t < WE });
  if (t > NINE - 0.1) { const u = tramo(t, NINE - 0.1, NINE + 0.25); R.numero('9', 186, ri(82 - Math.sin(u * Math.PI) * 6), { tam: 24, centro: true, color: H('#fff0b0') }); }
};

// ══ 8 · fondo local 'el sendero dorado' de noche: Paul el ciego llega al principio del sendero, lo «ve» en «path», se asusta
//    en «afraid», retrocede y se va; llega su hijo, se asusta también en «afraid» y en «walked it anyway» echa a andar
//    por él hacia el horizonte ══
const CIE8 = pal('#06081a', '#0a0e24', '#10162e', '#161e3a', '#1e2848', '#283458', '#36446a');
const DUN8 = [pal('#141a34', '#1a2240', '#222c4c', '#2c3858'), pal('#0e1428', '#141c34', '#1c2640', '#26324e'), pal('#0a0e1e', '#10162a', '#161e36', '#1e2a44', '#283656')];
const SEN = [[40, 196], [112, 172], [186, 160], [204, 142], [164, 128], [194, 114], [236, 104], [256, 99]];
const senda = (s) => { const n = SEN.length - 1, f = s * n, i = Math.min(n - 1, Math.floor(f)), u = f - i, P = (k) => SEN[Math.max(0, Math.min(n, k))];
  const [p0, p1, p2, p3] = [P(i - 1), P(i), P(i + 1), P(i + 2)], cr = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (-a + 3 * b - 3 * c + d) * u * u * u);
  return [cr(p0[0], p1[0], p2[0], p3[0]), cr(p0[1], p1[1], p2[1], p3[1])]; };
const ORO = pal('#5a3a10', '#8a5a18', '#b88424', '#e0aa3a', '#f8d060', '#fff0a8');
const fondo8 = () => horno('f8', () => {
  pintaCielo(CIE8, 0, 110, null, 8);
  for (let k = 0; k < 500; k++) { const u = hh(k, 1, 81), x = ri(u * 320), y = ri(20 + u * 60 + (hh(k, 2, 81) - 0.5) * 30); if (y > 104 || !libreAtom(x, y)) continue; mezP(x, y, H('#8a96c8'), 0.25 + hh(k, 3, 81) * 0.3); }
  pintaCapa({ y: 100, amp: 5, f: 0.03, ph: 0.3, v: 1.8, luz: 1, k: 82, cols: DUN8[0] }, 0, 120);
  pintaCapa({ y: 116, amp: 8, f: 0.022, ph: 1.6, v: 2, luz: 1.2, k: 83, cols: DUN8[1] }, 0, 140);
  pintaCapa({ y: 142, amp: 6, f: 0.016, ph: 2.6, v: 2.6, luz: 1.4, k: 84, cols: DUN8[2], cae: -0.02 }, 0, 180);
  // el sendero: losas de oro con juntas, que se estrechan hacia el horizonte
  for (let s = 0; s <= 1; s += 0.0015) { const [x, y] = senda(s), wd = 16 * (1 - s) ** 1.1 + 1; for (let j = -wd; j <= wd; j += 0.5) { const px = ri(x + j), py = ri(y + j * 0.12); if (py < 0 || py > 179) continue;
    const fila = Math.floor(s * 60), junta = (Math.abs(s * 60 - fila) < 0.06) || (((j + 400 + (fila & 1) * 4) % 8) < 0.5 && wd > 6); let v = 3.2 - Math.abs(j) / wd * 1.4 + (hh(fila, ri(j / 4), 85) - 0.5) * 0.8;
    if (Math.abs(j) > wd - 1) v = 0.6; R.pset(px, py, junta ? ORO[1] : tono(ORO, v, px, py)); } }
  // el mojón de piedras al principio y unas piedras sueltas
  const ROC8 = pal('#0e1020', '#1a1e34', '#2a3048', '#3c4460', '#566080');
  for (let k = 0; k < 260; k++) { const x = ri(hh(k, 1, 87) * 320), y = ri(118 + hh(k, 2, 87) * 62), L = 3 + ri(hh(k, 3, 87) * 7); let lejos = false; for (let s = 0; s <= 0.5; s += 0.05) { const [sx, sy] = senda(s); if (Math.abs(sx - x) < 24 * (1 - s) + 6 && Math.abs(sy - y) < 8) lejos = true; } if (lejos) continue;
    for (let i = 0; i < L; i++) mezP(x + i, y - (i > L / 2 ? 1 : 0), H('#4a5a8a'), 0.45); }
  for (const [x, y] of [[30, 176], [292, 176], [140, 124], [286, 132], [12, 128]]) for (let i = -4; i <= 4; i++) { R.linea(x + i, y, x + i * 2, y - 5 - (i & 1) * 3, i & 1 ? H('#1a2030') : H('#2e3a50')); ps(x + i * 2, y - 6 - (i & 1) * 3, H('#5a6a8a')); }
  roca(64, 166, 9, 7, ROC8, 2); roca(66, 156, 6, 5, ROC8, 4); roca(65, 149, 4, 3, ROC8, 6); roca(260, 160, 14, 8, ROC8, 8); roca(14, 150, 10, 6, ROC8, 9);
});
const p8 = (t) => {
  R.copiar(fondo8());
  estrellas(t, 70, 104, 8);
  // la luna creciente y una estrella fugaz
  R.disco(232, 52, 7, H('#f4f0d8')); R.disco(235, 50, 6, CIE8[1]); for (let r = 9; r < 15; r += 2) bola(231, 53, r, H('#c8d0ff'), 0.04);
  const fz = (t * 0.22) % 1; if (fz < 0.12) { const u = fz / 0.12; for (let i = 0; i < 10; i++) mezP(60 + u * 110 - i * 2, 40 + u * 24 - i * 0.5, H('#ffffff'), 0.8 - i * 0.07); }
  // el brillo que corre por el sendero hacia el horizonte
  for (let q = 0; q < 4; q++) { const s = ((t * 0.12 + q / 4) % 1), [x, y] = senda(s), wd = 16 * (1 - s) ** 1.1 + 1, a = 0.35 + tramo(t, WALKED, WALKED + 0.5) * 0.3; for (let j = -wd; j <= wd; j++) mezP(x + j, y + j * 0.12, H('#fff6c0'), a * (1 - Math.abs(j) / wd)); }
  for (let k = 0; k < 18; k++) { const s = (hh(k, 1, 86) + t * 0.03) % 1, [x, y] = senda(s); const b = Math.sin(t * 4 + k * 2); if (b > 0.3) mezP(x + (hh(k, 2, 86) - 0.5) * 20 * (1 - s), y - 3 - b * 3, H('#ffe890'), 0.7 * b); }
  // un jerbo que salta por la duna de enfrente
  const jf = ((t - P8) * 0.3) % 1, jx = 300 - jf * 120, jy = 140 - Math.abs(Math.sin(jf * Math.PI * 6)) * 6; if (jf < 0.95) { R.rect(ri(jx), ri(jy) - 2, ri(jx) + 2, ri(jy), H('#c8a880')); ps(jx - 1, jy - 2, H('#e8d0a8')); R.linea(ri(jx) + 3, ri(jy) - 1, ri(jx) + 7, ri(jy) - 3, H('#a8885a')); ps(jx - 1, jy - 3, H('#1a1010')); }
  // Paul ciego: llega, «ve» el sendero, se asusta y se vuelve
  const ll = tramo(t, P8 + 0.1, PATH - 0.3), vu = tramo(t, AFRAID + 0.5, SON + 0.3);
  const px = vu > 0 ? lerp(104, -24, vu) : lerp(20, 104, ease(ll)) - tr(t, AFRAID, AFRAID + 0.3) * 10;
  if (px > -20) R.actor(PA.paulCiego, px, 170, t, { dir: vu > 0 ? -1 : 1, anda: (ll > 0 && ll < 1) || (vu > 0 && vu < 1), sorpresa: t > AFRAID - 0.1 && t < AFRAID + 0.8, triste: vu > 0 });
  // Leto niño: llega, se asusta también y echa a andar por el sendero en «walked it anyway»
  const ln = tramo(t, SON - 0.3, AFRAID2 - 0.3), an = tramo(t, WALKED - 0.1, P9 + 0.6);
  if (t > SON - 0.3) { const [sx, sy] = senda(lerp(0.1, 0.3, an)); const x = an > 0 ? sx : lerp(-20, senda(0.1)[0], ease(ln)), y = an > 0 ? sy + 1 : lerp(176, senda(0.1)[1] + 1, ease(ln));
    R.actor(T.LT.letoNinoLT, x, y, t, { dir: 1, anda: (ln > 0 && ln < 1) || an > 0, sorpresa: t > AFRAID2 - 0.1 && t < WALKED - 0.2, triste: t > WALKED - 0.2 && t < WALKED + 0.3 }); }
};

// ══ 9 · estudio 'estudio/general': Atom borra el puente de la pizarra con un borrador en un palo, de izquierda a derecha,
//    de «asking you» a «all of humanity»; luego se vuelve hacia nosotros ══
const puenteTiza = (R, x0, y0, ex, t) => {
  const tiza = H('#eef2e8'), azul = H('#a8d8f0'), L = (a, b, c, d, col = tiza) => { if (Math.max(a, c) < ex) return; if (Math.min(a, c) < ex) { const f = (ex - a) / (c - a); if (a < c) { a = ex; b = b + (d - b) * f; } else { c = ex; d = d + (b - d) * (1 - f); } } R.linea(ri(a), ri(b), ri(c), ri(d), col); };
  L(x0 + 6, y0 + 20, x0 + 82, y0 + 20); L(x0 + 6, y0 + 24, x0 + 82, y0 + 24); for (let x = x0 + 10; x < x0 + 82; x += 6) L(x, y0 + 20, x, y0 + 24);
  for (const cx of [x0 + 15, x0 + 34, x0 + 53, x0 + 72]) { for (let i = 0; i < 16; i++) { const a1 = Math.PI + i / 16 * Math.PI, a2 = Math.PI + (i + 1) / 16 * Math.PI; L(cx + Math.cos(a1) * 8, y0 + 40 + Math.sin(a1) * 12, cx + Math.cos(a2) * 8, y0 + 40 + Math.sin(a2) * 12); } L(cx - 8, y0 + 40, cx - 8, y0 + 50); L(cx + 8, y0 + 40, cx + 8, y0 + 50); }
  for (let k = 0; k < 6; k++) { const x = x0 + 6 + k * 13; L(x, y0 + 55, x + 3, y0 + 53, azul); L(x + 3, y0 + 53, x + 6, y0 + 55, azul); }
  L(x0 + 36, y0 + 18, x0 + 52, y0 + 18); L(x0 + 38, y0 + 18, x0 + 40, y0 + 13); L(x0 + 40, y0 + 13, x0 + 50, y0 + 12); L(x0 + 50, y0 + 12, x0 + 53, y0 + 8);
};
const p9 = (t) => {
  const bor = tr(t, ASKING - 0.1, HUMANITY + 0.1);
  let EX = 0;
  const pizarra = (R, t, [x0, y0, x1, y1]) => { EX = lerp(x0 - 2, x1 + 4, bor); puenteTiza(R, x0, y0, EX, t);
    if (bor > 0 && bor < 1) for (let y = y0 + 2; y < y1 - 2; y++) for (let x = Math.max(x0, ri(EX) - 16); x < EX; x++) if (hh(x, y, ri(t * 6)) > 0.55 + (EX - x) / 40) mezP(x, y, H('#5a7a66'), 0.5); };
  const o = { pizarra };
  T.estudio(R, t, o);
  // Atom con el borrador en un palo: frota arriba y abajo mientras avanza; al acabar se vuelve hacia nosotros
  const ax = lerp(104, 184, bor), ey = 62 + Math.sin(t * 14) * 22 * (bor > 0 && bor < 1 ? 1 : 0.2), vuelve = t > HUMANITY + 0.3;
  const r = atom(ax, 160, t, { s: 2, dir: vuelve ? -1 : 1, pose: bor > 0 && bor < 1 ? 'senala' : vuelve ? 'brazos' : 'sostiene', cara: vuelve ? 'sonrisa' : t > SAVE && bor < 1 ? 'normal' : 'normal', habla: voz(t) });
  if (!vuelve && r?.mano) { const [mx, my] = r.mano.map(ri), bx = ri(EX + 3), by = ri(ey); R.linea(mx, my, bx, by + 6, H('#1a1008')); R.linea(mx + 1, my, bx + 1, by + 6, H('#a8784a'));
    R.rect(bx - 4, by - 6, bx + 5, by + 6, H('#1a1008')); R.rect(bx - 3, by - 5, bx + 4, by + 2, H('#c89a5a')); R.rect(bx - 3, by + 3, bx + 4, by + 5, H('#3a3a4a')); ps(bx - 2, by - 4, H('#f0c890')); }
  // el polvo de tiza que cae
  if (bor > 0 && bor < 1) for (let k = 0; k < 8; k++) { const u = (t * 1.6 + k / 8) % 1; mezP(EX + (k % 4) - 2, ey + u * 50, H('#e8ece0'), 0.7 - u * 0.6); }
  T.estudioDelante(R, t, o);
};

// ══ 10 · estudio 'estudio/mesa': siete peones de madera en la mesa miran a Atom en «everyone»; en «hate» fruncen el ceño
//    y le dan la espalda uno tras otro; el reloj de arena corre y el contador sube a 3500 en «thousands of years» ══
const PEON = [['#c84a3a', '#8a2a22'], ['#3a6ac8', '#22408a'], ['#4a9a4a', '#2a6a2a'], ['#e0b040', '#a07a20'], ['#9a5ac8', '#62348a'], ['#e07a3a', '#a04a1e'], ['#3aa8a8', '#226a6a']];
const peon = (x, yb, k, est, hop) => { x = ri(x); yb = ri(yb - hop); const [c1, c2] = PEON[k].map(H), Kk = H('#1a1210'), CARA = H('#f4d0a8');
  R.rect(x - 5, yb - 2, x + 5, yb, Kk); R.rect(x - 4, yb - 1, x + 4, yb - 1, c2); R.linea(x - 4, yb - 2, x + 4, yb - 2, c1);
  for (let j = 0; j < 11; j++) { const wv = ri(2 + j * 0.25); R.linea(x - wv - 1, yb - 3 - (10 - j), x + wv + 1, yb - 3 - (10 - j), Kk); R.linea(x - wv, yb - 3 - (10 - j), x + wv, yb - 3 - (10 - j), c1); R.pset(x + wv, yb - 3 - (10 - j), c2); if (j < 3) R.pset(x - wv, yb - 3 - (10 - j), mez(c1, H('#ffffff'), 0.3)); }
  R.disco(x, yb - 17, 4, Kk); R.disco(x, yb - 17, 3, est === 2 ? CARA : CARA); ps(x - 1, yb - 19, H('#fff4e4'));
  if (est === 2) { R.disco(x, yb - 18, 3, H('#4a2a1a')); ps(x, yb - 21, H('#6a3a22')); ps(x + 1, yb - 19, H('#2a160e')); return; }
  ps(x - 1, yb - 17, Kk); ps(x + 2, yb - 17, Kk); if (est === 1) { R.linea(x - 2, yb - 19, x - 1, yb - 18, Kk); R.linea(x + 3, yb - 19, x + 2, yb - 18, Kk); ps(x, yb - 15, Kk); ps(x + 1, yb - 15, Kk); } else ps(x + 1, yb - 15, H('#c86a5a')); };
const p10 = (t) => {
  const ge = T.estudio(R, t, { camara: 'mesa', arena: ((t - P10) * 0.9) % 1, pizarra: (R, t, [x0, y0, x1, y1]) => { for (let k = 0; k < 3; k++) R.linea(x0 + 10 + k * 26, y1 - 6, x0 + 28 + k * 26, y1 - 8, H('#5a7a66')); } });
  for (let k = 0; k < 5; k++) { const x = 110 + k * 19, mira = t > EVERYONE - 0.1, fr = t > HATE + k * 0.15, da = t > HATE + 0.5 + k * 0.15;
    const hop = (mira && t < EVERYONE + 0.3) || (da && t < HATE + 0.75 + k * 0.15) ? 3 : 0;
    AT.escalado(R, () => peon(12, 27, k, da ? 2 : fr ? 1 : 0, 0), 24, 29, x - 24, 148 - 56 - hop, 2);
    if (fr && !da) R.icono('!', x - 3, 74, H('#e84a4a'), H('#1a0a0a'), 2); }
  const ax = 214, r = atom(ax, 150, t, { s: 2, dir: -1, pose: t > EVERYONE - 0.2 && t < HATE ? 'saluda' : t > HATE + 1.2 ? 'piensa' : 'quieto', cara: t > HATE + 0.4 ? 'triste' : t > HATE ? 'sorpresa' : 'sonrisa', habla: voz(t) });
  if (t > THOUS2 - 0.1) { const n = ri(3500 * tr(t, THOUS2 - 0.1, YEARS + 0.2) / 100) * 100; R.numero(String(n), 160, 80, { tam: 16, centro: true, color: H('#f8d870') }); }
};

// ══ 11 · fondo local 'pizarra' (2.ª vez, limpia): Atom dibuja un Atom de tiza; en «yourself» se vuelve un gusano con sus
//    ojos; en «do it?» un «?» enorme; en «reading the comments» una flecha hacia abajo y tres bocadillos, y Atom la señala ══
const PIZ = [18, 22, 266, 146];
const fondoPizarra = () => horno('pizarra', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 7), j = (y % 7 === 0) || ((x + (f % 2) * 8) % 16 === 0);
    R.pset(x, y, j ? H('#2a1a1a') : tono(pal('#4a2622', '#5e322a', '#7a4232', '#8e5238'), 1.4 + hh(Math.floor((x + (f % 2) * 8) / 16), f) * 1.4 + hh(x, y) * 0.4 - (x > 268 && y < 50 ? 0.4 : 0), x, y)); }
  const [x0, y0, x1, y1] = PIZ;
  for (let y = y0 - 6; y <= y1 + 6; y++) for (let x = x0 - 6; x <= x1 + 6; x++) { const borde = x < x0 || x > x1 || y < y0 || y > y1;
    if (borde) R.pset(x, y, (x === x0 - 6 || x === x1 + 6 || y === y0 - 6 || y === y1 + 6) ? K : tono(pal('#5a3418', '#7a4a22', '#9a6430', '#c08448'), 1.6 + Math.sin(x * 0.9 + y * 0.15) * 0.6 + (y < y0 ? 0.8 : 0) - (x > x1 ? 0.6 : 0), x, y));
    else { const borra = Math.sin(x * 0.07 + y * 0.03) * Math.sin(y * 0.11 - x * 0.02) > 0.45; R.pset(x, y, tono(pal('#1a3226', '#22402e', '#2c4e38', '#3a5e46'), 1.3 + (borra ? 0.9 : 0) + hh(x >> 1, y >> 1) * 0.5, x, y)); } }
  // el fantasma del puente recién borrado
  const fant = H('#3e5e4a'); for (let x = 50; x < 230; x += 2) { R.pset(x, 60, fant); if (x % 6 === 0) R.pset(x, 62, fant); } for (const cx of [70, 110, 150, 190]) for (let i = 0; i < 20; i += 2) { const a = Math.PI + i / 20 * Math.PI; R.pset(ri(cx + Math.cos(a) * 16), ri(84 + Math.sin(a) * 20), fant); }
  for (let y = y1 + 7; y <= y1 + 11; y++) for (let x = x0 - 10; x <= x1 + 10; x++) R.pset(x, y, y === y1 + 11 ? K : tono(pal('#5a3418', '#7a4a22', '#9a6430', '#c08448'), y === y1 + 7 ? 3 : 1.6, x, y));
  [[40, '#f4f4ee'], [52, '#f8d870'], [60, '#f0a0b8'], [70, '#a8d8f0']].forEach(([x, c]) => R.rect(x, y1 + 5, x + 7, y1 + 6, H(c)));
  R.rect(220, y1 + 2, 240, y1 + 6, K); R.rect(221, y1 + 3, 239, y1 + 4, H('#c8a878')); R.rect(221, y1 + 5, 239, y1 + 5, H('#3a3a46'));
  for (let k = 0; k < 30; k++) R.pset(30 + ri(hh(k, 1, 4) * 230), y1 + 6 - (k % 2), H('#d8dcd0'));
  // abajo, el zócalo de madera y el suelo
  for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 163 ? tono(pal('#3a2010', '#6a4020', '#8a5a30'), y === 160 ? 2.4 : 1, x, y) : tono(pal('#2a1810', '#3e2616', '#56361e', '#6e4628'), 1.6 + Math.sin(x * 0.2 + Math.floor((y - 163) / 4) * 2) * 0.5 + ((x + Math.floor((y - 163) / 4) * 37) % 40 === 0 ? -1.4 : 0), x, y));
});
const p11 = (t) => {
  R.copiar(fondoPizarra());
  const tiza = H('#eef2e8'), am = H('#f8d870'), C = [112, 74];
  R.recorte(PIZ);
  const dib = tramo(t, P11 + 0.05, STOP + 0.3), gus = tr(t, YOURSELF - 0.15, YOURSELF + 0.7);
  // el Atom de tiza: núcleo con cara y tres órbitas
  const nO = ri(dib * 3 * 60 * (1 - gus));
  for (let k = 0; k < 3; k++) { const rot = k * Math.PI / 3; for (let i = 0; i < 60; i++) { if (k * 60 + i > nO) break; if (gus > 0 && hh(k, i, 7) < gus) continue; const a = i / 60 * 6.283; R.pset(ri(C[0] + Math.cos(a) * 30 * Math.cos(rot) - Math.sin(a) * 10 * Math.sin(rot)), ri(C[1] + Math.cos(a) * 30 * Math.sin(rot) + Math.sin(a) * 10 * Math.cos(rot)), tiza); } }
  if (dib > 0.3) { for (let i = 0; i < 40; i++) { const a = i / 40 * 6.283; R.pset(ri(C[0] + Math.cos(a) * 10), ri(C[1] + Math.sin(a) * 10), tiza); }
    const ojo = gus > 0.6 ? H('#6ab0ff') : tiza; R.disco(C[0] - 3, C[1] - 2, 1, ojo); R.disco(C[0] + 4, C[1] - 2, 1, ojo); if (gus < 0.5) { R.linea(C[0] - 3, C[1] + 4, C[0] + 4, C[1] + 4, tiza); R.pset(C[0] - 4, C[1] + 3, tiza); R.pset(C[0] + 5, C[1] + 3, tiza); } }
  // se vuelve gusano: anillos de tiza que salen de la cabeza y bajan en curva
  if (gus > 0) for (let k = 0; k < 12 * gus; k++) { const s = k / 12, cx = C[0] - 12 - s * 70, cy = C[1] + 8 + Math.sin(s * 3.2) * 26 + s * 20, rr = 11 - s * 4;
    for (let i = 0; i < 30; i++) { const a = i / 30 * 6.283; if (Math.cos(a) > 0.6) continue; R.pset(ri(cx + Math.cos(a) * rr * 0.5), ri(cy + Math.sin(a) * rr), tiza); } }
  // el «?» enorme, la flecha hacia abajo y los bocadillos de los comentarios
  if (t > DOIT - 0.1) { const u = tramo(t, DOIT - 0.1, DOIT + 0.2); R.icono('?', 168, ri(40 - (1 - u) * 6), am, H('#2c4e38'), 6); }
  if (t > READING - 0.15) { const u = tramo(t, READING - 0.15, READING + 0.35), bote = t > READING + 0.35 ? ri(Math.abs(Math.sin(t * 6)) * 4) : 0, yb = 40 + u * 64 + bote;
    for (let w2 = 0; w2 < 3; w2++) R.linea(243 + w2, 40, 243 + w2, ri(yb), tiza); if (u >= 1) for (let i = 0; i < 9; i++) R.linea(244 - i, ri(yb) - i, 244 + i + 1, ri(yb) - i, tiza); }
  for (let k = 0; k < 3; k++) { if (t < COMMENTS + k * 0.15) continue; const bx = 150 + k * 46, by = 126 + (k % 2) * 4;
    for (let i = 0; i < 40; i++) { const a = i / 40 * 6.283; R.pset(ri(bx + Math.cos(a) * 16), ri(by + Math.sin(a) * 9), tiza); } R.linea(bx - 6, by + 8, bx - 10, by + 14, tiza); R.linea(bx - 10, by + 14, bx - 2, by + 9, tiza);
    for (let d = -1; d <= 1; d++) R.disco(bx + d * 6, by, 1, [am, H('#f0a0b8'), H('#a8d8f0')][k]); }
  R.recorte(null);
  // Atom dibuja (de espaldas a nosotros, hacia la pizarra), se vuelve en «would you do it?» y señala la flecha
  const vuelto = t > WOULD - 0.1, se = t > READING - 0.2;
  const r = atom(292, 170, t, { s: 2, dir: -1, pose: se ? 'senala' : vuelto ? 'brazos' : t < YOURSELF + 0.7 ? 'senala' : 'piensa', cara: t > COMMENTS + 0.3 ? 'guino' : vuelto ? 'normal' : t > YOURSELF ? 'sorpresa' : 'sonrisa', habla: voz(t) });
  if (r?.mano && !vuelto) { const [mx, my] = r.mano.map(ri); R.rect(mx - 3, my - 1, mx, my, H('#f4f4ee')); }
  if (!vuelto && t < YOURSELF + 0.7) { const cur = gus > 0 ? [C[0] - 12 - gus * 70, C[1] + 30] : [C[0] + 30, C[1]]; for (let k = 0; k < 4; k++) { const u = ((t * 2 + k / 4) % 1); mezP(cur[0] + (k % 3) - 1, cur[1] + u * 12, tiza, 0.6 - u * 0.5); } }
};

const efectos = [[0.2, 'ola'], [DIES, 'brillo'], [APART - 0.2, 'pasos'],
  [P2 + 0.3, 'pasos'], [PEARL, 'brillo'],
  [TURN - 0.2, 'viento'], [FREE, 'palmada'],
  [EVERY - 0.1, 'jet'], [PLACES - 1, 'whoosh'],
  [ENEMY - 0.3, 'papel'], [PROPHET - 0.3, 'papel'], [PROPHET + 1.2, 'pop'], [FIND, 'brillo'],
  [P6 + 0.2, 'pasos'], [FELL, 'chof'],
  [P7 + 0.2, 'viento'], [NINE, 'pop'], [WE, 'pasos'],
  [P8 + 0.2, 'pasos'], [AFRAID, 'tapestop'], [WALKED, 'brillo'],
  [ASKING, 'papel'], [SAVE, 'papel'],
  [EVERYONE, 'pop'], [HATE + 0.45, 'toc'], [THOUS2, 'tic'],
  [P11 + 0.1, 'lapiz'], [YOURSELF, 'lapiz'], [DOIT, 'lapiz'], [READING, 'lapiz'], [COMMENTS, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11]], { efectos });
'''

E['lt-cierre'] = ('El final', '''// LT-CIERRE (frases 28–30), sin año. Once planos:
// 1. la ribera desde lo alto a la hora azul (fondo local): en «dies» sube del río una columna de motas de luz; las truchas
//    salen del agua con su perla y reptan ribera arriba en abanico; la cierva se mete en el bosque en «apart»;
// 2. la arena de cerca (inserto): una trucha grande cruza; su perla brilla en «pearl» con los ojos azules de Leto; Atom
//    llega, se asombra; cientos de truchas pequeñas se van en todas direcciones;
// 3. dispersion/general: el bosque se vuelve desierto en «Arrakis back into a desert»; dos fremen saltan en «free»;
// 4. dispersion/estrellas: las naves salen en todas direcciones; un vecino despega en «every direction»;
// 5. la carta de estrellas (inserto): los puntos huyen de la lupa del enemigo y del dedo del profeta («?», «?»);
// 6. rio/vacio: el puente vacío; Leto niño en la orilla tira una piedra al agua en «fell»;
// 7. la peña al ocaso (fondo local): su sombra larga se vuelve gusano en «monster»; «9»; la caravana de familias en «we»;
// 8. el sendero dorado (fondo local): Paul se asusta y se va en «afraid»; su hijo se asusta y echa a andar en «walked»;
// 9. estudio/general: Atom borra el puente de la pizarra con un borrador en un palo;
// 10. estudio/mesa: siete peones le dan la espalda en «hate»; el contador sube a 3500 en «thousands of years»;
// 11. la pizarra de cerca (fondo local, 2.ª vez): el Atom de tiza se vuelve gusano en «yourself»; «?»; la flecha hacia
//    abajo y los bocadillos en «comments»; Atom la señala y guiña.''', COMUN + CIERRE)
