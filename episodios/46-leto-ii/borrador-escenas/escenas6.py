E = {}

# ── tiempos (en s de cada escena, sacados de las palabras inglesas de linea.json) ──
MS = {'siglos': (0.5, 27.08), 'paz': (27.48, 53.11), 'diario': (53.51, 82.615)}
W = {   # lt-dios: nombre → (marca, instante)
    'THREE': ('siglos', 0.50), 'YEARS': ('siglos', 1.56), 'LITO': ('siglos', 3.30), 'BARELY': ('siglos', 3.86), 'HUMAN': ('siglos', 4.22), 'ANYMORE': ('siglos', 4.64),
    'P2': ('siglos', 5.68), 'ENORM': ('siglos', 5.98), 'WORM': ('siglos', 6.44), 'FACE': ('siglos', 8.18), 'HANDS': ('siglos', 8.64),
    'P3': ('siglos', 9.56), 'CART': ('siglos', 10.68), 'LIVES': ('siglos', 11.34), 'SPICE': ('siglos', 11.78),
    'P4': ('siglos', 14.16), 'CHANGED': ('siglos', 14.64), 'FORESTS': ('siglos', 16.26), 'RIVERS': ('siglos', 17.32), 'RAIN': ('siglos', 18.00), 'LEFT': ('siglos', 19.42),
    'P5': ('siglos', 20.66), 'PIECE': ('siglos', 21.14), 'KEEPS': ('siglos', 21.88), 'SAREER': ('siglos', 23.56), 'REMEMBER': ('siglos', 25.54), 'BE': ('siglos', 26.72),
    'P6': ('paz', 27.48), 'IMAGINE': ('paz', 27.66), 'PERSON': ('paz', 29.08), 'EMPIRE': ('paz', 30.00),
    'P7': ('paz', 32.02), 'WARS': ('paz', 32.66), 'ALLOW': ('paz', 34.56), 'TRAVEL': ('paz', 36.10),
    'P8': ('paz', 37.34), 'KEEPSALL': ('paz', 37.86), 'UNIVERSE': ('paz', 39.36), 'HANDSOUT': ('paz', 40.22), 'DROP': ('paz', 41.06), 'TIME': ('paz', 41.66),
    'P9': ('paz', 42.48), 'CORNER': ('paz', 43.00), 'WATCHED': ('paz', 43.98), 'ARMY': ('paz', 44.74), 'WOMEN': ('paz', 45.26), 'FISH': ('paz', 46.32),
    'P10': ('paz', 47.54), 'WORSHIP': ('paz', 47.80), 'GOD': ('paz', 48.88), 'PEACE': ('paz', 50.86), 'YET': ('paz', 51.74), 'BREATHE': ('paz', 52.72),
    'P11': ('diario', 53.51), 'SIDE': ('diario', 53.77), 'DUNCAN': ('diario', 54.81), 'FATHERS': ('diario', 56.47), 'FRIEND': ('diario', 57.15),
    'P12': ('diario', 57.93), 'BRINGS': ('diario', 58.25), 'LIFE': ('diario', 58.99), 'COPY': ('diario', 59.53), 'ANOTHER': ('diario', 60.17), 'BEAR': ('diario', 61.71),
    'REMEMBERS': ('diario', 63.27), 'FAMILY': ('diario', 63.99),
    'P13': ('diario', 64.80), 'NIGHT': ('diario', 66.39), 'DICTATES': ('diario', 66.81), 'MACHINES': ('diario', 67.59), 'ENORMJ': ('diario', 68.23), 'JOURNAL': ('diario', 68.63),
    'P14': ('diario', 70.23), 'THOUSAND': ('diario', 70.37), 'LATER': ('diario', 70.99), 'INIT': ('diario', 72.27), 'PROUD': ('diario', 73.13), 'TYRANT': ('diario', 73.37),
    'P15': ('diario', 74.47), 'ALONE': ('diario', 75.61), 'EVERYONE': ('diario', 77.47), 'HATES': ('diario', 77.79),
    'P16': ('diario', 78.85), 'RIGHT': ('diario', 79.65), 'NOONE': ('diario', 80.63), 'SHARE': ('diario', 81.17), 'WITH': ('diario', 82.15),
}
FIN_D = 82.865
WS = {   # lt-soledad (marca fijate4, 0.2–33.914)
    'NOTICE': 0.32, 'Y2015': 2.62, 'Q2': 4.06, 'JULIANNE': 4.68, 'TEAM': 6.78, 'PULLED': 7.12, 'DOZENS': 8.16, 'STUDIES': 8.96,
    'Q3': 9.34, 'MORE': 9.78, 'MILLION': 10.92, 'PEOPLE': 11.30, 'FOUND': 12.40, 'LONELY': 13.08, 'ISOLATION': 14.28,
    'Q4': 15.16, 'RISK': 16.06, 'DYING': 16.54, 'EARLY': 16.98, 'MUCH': 18.02, 'FACTORS': 19.34,
    'Q5': 19.92, 'WORRY': 20.48, 'FAR': 21.06, 'OBESITY': 22.56,
    'Q6': 24.20, 'LIVE': 25.18, 'COMPANY': 25.52, 'LETO': 26.66, 'POWER': 28.24, 'UNIV': 28.84,
    'Q7': 29.76, 'GONE': 29.94, 'Y3000': 30.24, 'NOONE': 32.10, 'UNDERSTAND': 33.06, 'FIN': 34.164,
}


def tw(absoluto):
    out = []
    for k, (m, v) in W.items():
        a, b = MS[m]
        out.append(f"{k}: {v}" if absoluto else f"{k}: en('{m}', {(v - a) / (b - a):.4f})")
    return 'const W = { ' + ', '.join(out) + f", FIN: {FIN_D} }};\n"


def tsol():
    a, b = 0.2, 33.914
    return 'const WS = { ' + ', '.join(f"{k}: en('fijate4', {(v - a) / (b - a):.4f})" if k != 'FIN' else f"FIN: {v}" for k, v in WS.items()) + ' };\n'


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


# ──────────────────────────────────────────── LT-DIOS ────────────────────────────────────────────
DIOS = r'''
const atom = (x, s, t, o = {}) => AT.atom(R, ri(x), ri(s), t, o);
// ══ 1 · LOS 3.500 AÑOS (fondo local 'el valle que reverdece'): el sol cruza deprisa, las dunas se vuelven bosque, río y
//    campos; el contador sube a 3500; Leto (la piel de arena) en la peña: en «barely human» un remolino y queda el gusano ══
const CIELO1 = pal('#5a8ac8', '#6c9ad0', '#80aad8', '#96bce0', '#acccea', '#c4dcef', '#dcebf2');
const NUBD = [pal('#8a9ab8', '#d0dcea', '#ffffff'), pal('#7a8aa8', '#c0ccdc', '#f2f6fa'), pal('#9aa8c0', '#dce4ee', '#ffffff')];
const ARE1 = [pal('#6a4a3e', '#8a6048', '#a87a52', '#c49462', '#dcb078'), pal('#7a4a30', '#9a6238', '#b87c44', '#d09a56', '#e4b46a', '#f2cc84'), pal('#6a3e28', '#8a5632', '#ac703e', '#c88c4c', '#e0aa60', '#f0c47a', '#fae0a8')];
const VER1 = [pal('#2e4a4a', '#3a5a52', '#4a6c5a', '#5e8064', '#76946e'), pal('#16341e', '#1e4628', '#2a5a30', '#3a6e36', '#528640', '#70a04c'), pal('#1e3a1a', '#2a4e20', '#3a6428', '#4e7a30', '#66923a', '#82aa48', '#a8c860')];
const CAP1 = [{ y: 92, amp: 4, f: 0.035, ph: 1, v: 2.2, luz: 1, k: 1 }, { y: 112, amp: 8, f: 0.024, ph: 2.6, v: 2.6, luz: 1.3, k: 2 }, { y: 140, amp: 7, f: 0.018, ph: 0.4, v: 2.9, luz: 1.5, k: 3 }];
const ROC1 = pal('#2e2226', '#4a3634', '#6a4e42', '#8a6a54', '#aa8664', '#c8a278', '#e0c098');
const rio1 = (s) => [168 - s * 200 + Math.sin(s * 5) * 26, 94 + s * 74];
const tierra1 = (verde) => horno('tierra1' + verde, () => {
  CAP1.forEach((c, i) => pintaCapa({ ...c, cols: verde ? VER1[i] : ARE1[i], copas: verde && i < 2 }));
  if (verde) {
    // terrazas de cultivo en la ladera del medio y el río que baja serpenteando
    for (let k = 0; k < 7; k++) { const y = 116 + k * 3; R.linea(214, y, 300, y - 6, H('#8aaa48')); R.linea(214, y + 1, 300, y - 5, H('#3a5a24')); }
    for (let s = 0; s < 1; s += 0.002) { const [x, y] = rio1(s), w = 1 + s * 6; for (let i = -w; i <= w; i++) R.pset(ri(x + i), ri(y), Math.abs(i) > w - 1 ? H('#a8c8a0') : i < -w * 0.3 ? H('#5a8ab0') : H('#3a6a94')); }
    for (let s = 0.05; s < 1; s += 0.05) { const [x, y] = rio1(s); R.pset(ri(x), ri(y), H('#d8ecf4')); }
    // casitas iguales en la loma
    for (let k = 0; k < 5; k++) { const x = 228 + k * 12, y = 100 - k; R.rect(x, y - 3, x + 6, y, H('#e8dcc0')); R.linea(x - 1, y - 4, x + 7, y - 4, H('#a84a32')); R.pset(x + 3, y - 5, H('#c86c44')); R.pset(x + 2, y - 1, H('#4a3a30')); }
  } else {
    // rizaduras y una osamenta de gusano medio enterrada (el desierto de antes)
    for (let k = 0; k < 9; k++) { const x = 30 + k * 14, y = 150 + ri(Math.sin(k) * 3); R.linea(x, y, x + 5, y - 6, H('#e8d8b8')); R.pset(x + 5, y - 7, H('#ffffff')); }
  }
  // la peña del medio, igual en los dos (Leto la pisa)
  roca(162, 156, 54, 30, ROC1, 3); roca(128, 160, 22, 16, ROC1, 5); roca(198, 162, 24, 14, ROC1, 8);
  for (let x = 120; x < 206; x++) { const y = 130 + ri(Math.abs(x - 162) * 0.1); R.pset(x, y, H('#e8c8a0')); R.pset(x, y + 1, H('#b89068')); }
  for (const [x0, y0] of [[140, 136], [176, 140], [158, 150]]) { let x = x0, y = y0; for (let j = 0; j < 10; j++) { R.pset(x, y, H('#2a1c1e')); x += hh(j, x0) > 0.5 ? 1 : -1; y += 1; } }
  if (verde) for (const [x, y] of [[124, 140], [204, 146], [150, 166], [182, 158]]) copa(x, y, 4, BOSQ, x);
});
let MASK1 = null;
const vn = (x, y, s, k) => { const fx = x / s, fy = y / s, ix = Math.floor(fx), iy = Math.floor(fy), ux = ease(fx - ix), uy = ease(fy - iy);
  return lerp(lerp(hh(ix, iy, k), hh(ix + 1, iy, k), ux), lerp(hh(ix, iy + 1, k), hh(ix + 1, iy + 1, k), ux), uy); };
const mask1 = () => { if (!MASK1) { MASK1 = new Float32Array(320 * 180); for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
  let dr = 99; for (let s = 0; s <= 1; s += 0.05) { const [rx, ry] = rio1(s); dr = Math.min(dr, Math.hypot(x - rx, (y - ry) * 1.6)); }
  MASK1[y * 320 + x] = 0.42 * vn(x, y, 22, 5) + 0.18 * vn(x, y, 7, 6) + 0.08 * hh(x >> 1, y >> 1, 7) + Math.min(1, dr / 120) * 0.32; } } return MASK1; };
const ARB1 = Array.from({ length: 44 }, (_, k) => { const y = 98 + ri(hh(k, 2, 31) * 80), x = ri(hh(k, 1, 31) * 320); return { x, y, h: 5 + (y - 98) / 80 * 20, u: 0.08 + hh(k, 3, 31) * 0.75, k }; })
  .filter((a) => !(a.x > 100 && a.x < 226 && a.y > 118) && libreAtom(a.x, a.y - a.h)).sort((a, b) => a.y - b.y);
const p1 = (t, o = {}) => {
  const g = ease(tramo(t, W.THREE, W.ANYMORE + 0.6));
  R.copiar(horno('cielo1', () => pintaCielo(CIELO1, 0, 100, null, 2)));
  // el sol cruza deprisa (los días pasan)
  const us = ((t * 0.55) % 1), sx = 26 + us * 256, sy = 62 - Math.sin(us * Math.PI) * 32;
  if (libreAtom(sx, sy - 6)) { R.halo(ri(sx), ri(sy), 16, [H('#c8dcef'), H('#fff0c0')], 0.6); R.disco(ri(sx), ri(sy), 5, H('#ffe890')); R.disco(ri(sx) - 1, ri(sy) - 1, 3, H('#fff8e0')); }
  nubes(t * 9, [[10, 40, 64, 3], [130, 32, 70, 1.6], [220, 60, 50, 5], [60, 70, 40, 7], [260, 76, 46, 2.4], [170, 52, 36, 4], [300, 44, 56, 2], [90, 58, 30, 6]], NUBD, 2);
  // la tierra: desierto que se vuelve verde por manchas
  const D = R.buf, A = tierra1(0), V = tierra1(1), Mk = mask1(), lim = g * 1.25 - 0.05;
  for (let i = 84 * 320; i < 57600; i++) { const c = Mk[i] < lim ? V[i] : A[i]; if (c) D[i] = c; }
  // los árboles crecen
  for (const a of ARB1) { const u = cl((g - a.u) / 0.22, 0, 1); if (u <= 0) continue; if (a.k % 3 === 0) abeto(a.x, a.y, ri(a.h * u * 1.1), a.k); else arbol(a.x, a.y, a.h * u, a.k, t); }
  // el agua del río brilla cuando ya está
  if (g > 0.5) for (let k = 0; k < 6; k++) { const s = (t * 0.08 + k / 6) % 1, [x, y] = rio1(s); mezP(x, y, H('#ffffff'), 0.8 * (g - 0.5) * 2); }
  // bandada que cruza
  for (let k = 0; k < 5; k++) pajaro(((t * 40 + k * 9) % 380) - 30, 66 + (k % 2) * 4 + Math.sin(t * 2 + k) * 2, t, H('#2a2a3a'), k);
  // Leto en la peña: el niño con la piel de arena; en «barely» el remolino; en «human» queda el gusano
  const cambio = tramo(t, W.HUMAN, W.HUMAN + 0.25), rem = Math.sin(Math.PI * tramo(t, W.BARELY - 0.2, W.ANYMORE + 0.6));
  if (cambio < 1) R.actor(LT.letoPielLT, 155, 130, t, { dir: 1, sorpresa: t > W.LITO, dedo: t > W.YEARS && t < W.LITO, sonrisa: t < W.YEARS });
  if (cambio > 0) T.letoGusano(R, 160, 131, t, { s: 0.5, mira: [60, 70], giro: 0 });
  if (rem > 0.01) for (let k = 0; k < 46; k++) { const an = t * 9 + k * 0.55, r = (4 + (k % 9) * 1.7) * rem, y = 130 - (k / 46) * 26 * rem;
    ps(162 + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 0.35, k % 3 ? H('#e8c088') : H('#fff0c8')); }
  // el contador de años
  if (!o.sinNum && t > W.THREE - 0.05) { const n = Math.round(3500 * ease(tramo(t, W.THREE, W.YEARS + 0.5)) / 50) * 50, b = ri(Math.sin(tramo(t, W.YEARS + 0.4, W.YEARS + 0.8) * Math.PI) * 2);
    R.rect(48, 34 - b, 132, 56 - b, K); R.rect(49, 35 - b, 131, 55 - b, H('#2a1a2e')); R.rect(49, 35 - b, 131, 35 - b, H('#c8963a')); R.rect(49, 55 - b, 131, 55 - b, H('#7a5a2a'));
    R.numero(String(n), 90, 53 - b, { tam: 16, centro: true }); R.icono('reloj', 52, 39 - b, H('#e8c060')); }
};

// ══ 2 · LA AUDIENCIA (imperio ciudadela/audiencia): el gusano enorme en su estrado; Atom entra y se queda boquiabierto en
//    «enormous»; en «face» le rodea la cara; en «hands», las manos ══
const p2 = (t, o = {}) => {
  const oo = { encuadre: 'ciudadela', camara: 'audiencia' }; const d = T.imperio(R, t, oo); const [cx, cy] = d.carro ?? [248, 140];
  const ua = tramo(t, W.P2 + 0.05, W.ENORM + 0.9), ax = lerp(30, 136, ease(ua));
  const lg = T.letoGusano(R, cx, cy, t, { s: 1, dir: -1, mira: t > W.ENORM + 0.3 ? [ax + 4, 132] : [120, 150], habla: t > W.HANDS + 0.5 && Math.sin(t * 9) > 0 });
  if (!o.sinAtom) atom(ax, 152, t, { s: 1.6, dir: 1, pose: ua > 0 && ua < 1 ? 'camina' : t > W.FACE - 0.3 ? 'senala' : 'quieto', cara: t > W.ENORM + 0.2 && t < W.FACE ? 'sorpresa' : t >= W.FACE ? 'sonrisa' : 'normal', habla: 0 });
  if (!o.sinAtom && t > W.ENORM + 0.2 && t < W.FACE - 0.2) R.icono('!', ri(ax) + 6, 108 + flota(t), H('#ffe060'), true, 2);
  T.imperioDelante(R, t, oo);
  if (!o.sinAtom) { const c = lg.cara ?? [cx - 41, cy - 49]; const u1 = tramo(t, W.FACE - 0.1, W.FACE + 0.6); if (u1 > 0) AT.anillo(R, c[0], c[1], 11, 12, t, u1);
    const m = lg.manos?.[0] ?? [cx - 45, cy - 18], u2 = tramo(t, W.HANDS - 0.1, W.HANDS + 0.6); if (u2 > 0) AT.anillo(R, m[0] - 3, m[1] - 2, 9, 7, t, u2); }
};

// ══ 3 · EL CAMINO DEL BOSQUE (fondo local): el carro rueda por la calzada mojada entre árboles, con dos Habladoras; en
//    «spice» la de delante se vuelve y le alza un cuenco de especia; él come ══
const CIELO3 = pal('#7a8aa0', '#8a9ab0', '#9eacc0', '#b2bece', '#c8d2dc', '#dce4ea');
const CALZ = pal('#3a3436', '#4a4446', '#5e5654', '#726a64', '#8a8076', '#a49a8a');
const fondo3 = () => horno('fondo3', () => {
  pintaCielo(CIELO3, 0, 84, null, 3);
  pintaCapa({ y: 62, amp: 6, f: 0.03, ph: 1.4, v: 2, luz: 0.8, cols: BOSQF, k: 4, copas: true });
  // una loma con la aldea lejana y una torre de vigía
  for (let k = 0; k < 6; k++) { const x = 206 + k * 10, y = 66 - ri(Math.sin(k * 0.6) * 3); R.rect(x, y - 3, x + 6, y, H('#c8bca8')); R.linea(x - 1, y - 4, x + 7, y - 4, H('#8a4a3a')); }
  R.rect(270, 50, 274, 66, H('#a89080')); R.rect(268, 48, 276, 50, H('#6a4a3a'));
  pintaCapa({ y: 82, amp: 8, f: 0.025, ph: 3, v: 2.2, luz: 1, cols: BOSQ.slice(0, 6), k: 5, copas: true, cae: 0.01 });
  // la pared de árboles del medio
  for (let k = 0; k < 22; k++) { const x = ri(k * 15 + hh(k, 1, 8) * 10) - 4, h = 34 + ri(hh(k, 2, 8) * 20); if (k % 4 === 1) abeto(x, 128, h, k); else arbol(x, 128, h, k); }
  for (let x = 0; x < 320; x++) for (let y = 116; y < 130; y++) if (hh(x, y, 9) > 0.55) R.pset(x, y, tono(BOSQ, 2 + hh(x, y, 10) * 2, x, y));
  // la calzada de losas con bordillo y la cuneta
  for (let y = 128; y < 132; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#4a3a2a', '#6a5a3a', '#8a7a4a'), 1 + hh(x, y, 11) * 1.6, x, y));
  adoquin(132, 158, CALZ, 3); R.linea(0, 132, 319, 132, H('#a49a8a')); R.linea(0, 158, 319, 158, H('#2a2426'));
  for (const [x, y, w] of [[36, 152, 12], [146, 140, 9], [236, 150, 14], [300, 137, 7]]) charco(x, y, w, 2, pal('#5a6a7a', '#8a9aaa', '#b8c8d4', '#dce8f0'));
  // el arcén: hierba, helechos, flores y un mojón con el anillo
  for (let y = 159; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 2.4 + (hh(x, y, 12) - 0.5) * 1.4 + Math.sin(x * 0.7 + y) * 0.5 - (y - 159) * 0.03; R.pset(x, y, tono(VER1[2], v, x, y)); }
  for (let k = 0; k < 26; k++) { const x = ri(hh(k, 3, 13) * 320), y = 164 + ri(hh(k, 4, 13) * 14); for (let i = -3; i <= 3; i++) R.linea(x, y, x + i * 2, y - 5 + Math.abs(i), H('#3a6a2e')); if (k % 3 === 0) R.pset(x, y - 6, k % 2 ? H('#f0e070') : H('#e86a8a')); }
  R.rect(52, 146, 59, 160, H('#6a6460')); R.rect(53, 145, 58, 159, H('#a8a098')); R.rect(53, 145, 54, 159, H('#c8c0b4')); emblema(56, 151, 2, H('#4a4440'));
  // el árbol de delante a la izquierda (tronco y copa grande)
  R.rect(8, 80, 15, 180, TRONCO); R.rect(8, 80, 9, 180, TRONCOL); for (let y = 90; y < 180; y += 9) R.pset(12, y, H('#2a1a10'));
  for (const [x, y, r] of [[14, 52, 18], [-2, 64, 14], [30, 68, 12], [6, 34, 12]]) copa(x, y, r, BOSQ, 7);
});
const p3 = (t, o = {}) => {
  R.copiar(fondo3());
  nubes(t, [[20, 36, 50, 2], [150, 28, 40, 1.2], [230, 60, 44, 3.5], [90, 56, 30, 5]], [pal('#7a8498', '#a8b2c2', '#d8e0e8'), pal('#6e7890', '#98a2b4', '#c8d0dc')], 3);
  for (let k = 0; k < 3; k++) pajaro(((t * 22 + k * 70) % 380) - 30, 44 + k * 6 + Math.sin(t + k) * 2, t, H('#2a3030'), k);
  // gotas que caen de las hojas a los charcos
  for (const [x, y] of [[146, 140], [236, 150], [36, 152]]) ondas(x, y, t, x);
  for (let k = 0; k < 8; k++) { const f = (t * 0.8 + hh(k, 5)) % 1, x = ri(20 + hh(k, 6) * 290); if (f < 0.7) mezP(x, 112 + f * 40, H('#d8e8f0'), 0.7); }
  // una ardilla sube y baja por el tronco de delante
  const ay = ri(130 - Math.abs(Math.sin(t * 0.9)) * 40); R.rect(16, ay, 18, ay + 3, H('#a8602a')); R.pset(19, ay - 1, H('#a8602a')); R.pset(15, ay + 4, H('#c87a3a')); R.pset(15, ay + 5, H('#c87a3a'));
  // el carro avanza y se para
  const ua = ease(tramo(t, W.P3 - 0.3, W.LIVES + 0.1)), cx = ri(lerp(96, 176, ua)), para = t > W.LIVES;
  // la Habladora de detrás
  R.actor(LT.habladoraLT, cx - 72, 154, t, { dir: 1, anda: !para });
  const vuelve = t > W.SPICE - 0.5, come = tramo(t, W.SPICE + 0.2, W.SPICE + 1.6);
  const lg = T.letoGusano(R, cx, 152, t, { s: 0.75, giro: cx / 5, mira: vuelve ? [cx + 50, 128] : [cx + 90, 140], habla: come > 0 && come < 1 && Math.sin(t * 14) > 0 });
  // la Habladora de delante: anda, y en «spice» se vuelve con el cuenco en alto
  const hx = cx + 46, hab = R.actor(LT.habladoraLT, hx, 154, t, { dir: vuelve ? -1 : 1, anda: !para, sostiene: vuelve ? [hx + 1, 124 - ri(tramo(t, W.SPICE - 0.4, W.SPICE) * 4)] : undefined });
  if (vuelve && hab?.mano) { R.halo(hab.mano[0], hab.mano[1] - 3, 12, [H('#7a8a90'), H('#ffb050')], 0.55); cuenco(hab.mano[0], hab.mano[1], 6, 1.5 - come * 0.9);
    for (let k = 0; k < 4; k++) { const s2 = Math.sin(t * 6 + k * 1.7); if (s2 > 0.5) R.pset(hab.mano[0] - 4 + k * 3, hab.mano[1] - 5 - (k & 1), H('#fff0b0')); }
    if (come > 0 && come < 1) for (let k = 0; k < 8; k++) { const f = (t * 2 + k / 8) % 1; mezP(lerp(hab.mano[0], (lg.cara?.[0] ?? cx + 30), f), lerp(hab.mano[1] - 3, (lg.cara?.[1] ?? 115) + 4, f) - Math.sin(f * 3) * 4, H('#ffb050'), 0.9); } }
  // la neblina baja entre los árboles
  for (let y = 108; y < 128; y += 2) for (let x = (ri(t * 6) + y) % 6; x < 320; x += 6) if (Math.sin(x * 0.03 + t * 0.4 + y * 0.2) > 0.3) mezP(x, y, H('#dce4ea'), 0.25);
};

// ══ 4 · ARRAKIS VERDE (imperio verde/general): Atom llega bajo el alero, señala el río en «rivers»; en «rain» le cae la
//    gota en la cabeza; da un respingo, mira al cielo y se ríe ══
const p4 = (t, o = {}) => {
  const oo = { encuadre: 'verde', gota: false, lluvia: 0.85 }; const d = T.imperio(R, t, oo); const [gx, gy] = d.gota ?? [66, 106];
  const golpe = W.RAIN, ua = tramo(t, W.P4 + 0.1, W.P4 + 1.6), ax = lerp(-12, gx - 4, ease(ua));
  const cae = tramo(t, golpe - 0.45, golpe), gordo = tramo(t, golpe - 1.6, golpe - 0.45), salto = t > golpe && t < golpe + 0.35 ? 3 : 0;
  const r = atom(ax, 151 - salto, t, { s: 1.6, dir: 1, pose:
 ua > 0 && ua < 1 ? 'camina' : t > W.RIVERS - 0.2 && t < golpe - 0.3 ? 'senala' : t > golpe && t < golpe + 1.2 ? 'brazos' : 'quieto',
    cara: t > golpe && t < golpe + 1.4 ? 'sorpresa' : t > golpe + 1.4 ? 'sonrisa' : 'normal', habla: 0 });
  const cabY = (r?.centro?.[1] ?? 128) - 9;
  // la gota: engorda en el alero y cae justo en «rain»
  if (!o.sinAtom && t < golpe) { const y = ri(lerp(gy, cabY, cae * cae)), s = 1 + ri(gordo * 1.4); R.disco(gx, y + s, s, H('#8ac8f0')); R.pset(gx, y - 1 + (cae > 0 ? 0 : 0), H('#8ac8f0')); R.pset(gx - 1, y + s - 1, H('#ffffff')); }
  if (t > golpe && t < golpe + 0.6) { const f = tramo(t, golpe, golpe + 0.6); for (let k = 0; k < 6; k++) { const an = -Math.PI * (0.15 + k / 7), rr = 2 + f * 9; ps(gx + Math.cos(an) * rr, cabY + Math.sin(an) * rr + f * f * 10, H('#a8dcff')); } }
  if (t > golpe + 0.1 && t < golpe + 1.6) R.icono('!', gx + 8, cabY - 16 + flota(t), H('#ffe060'));
  T.imperioDelante(R, t, oo);
};

// ══ 5 · EL SAREER (imperio verde/sareer): al ocaso, el gusano pequeño cruza la cresta; en «Sareer» se para y mira el sol;
//    en «remember» se le aparece al lado, de luz, el niño que fue, y se deshace ══
const p5 = (t, o = {}) => {
  const oo = { encuadre: 'verde', camara: 'sareer' }; const d = T.imperio(R, t, oo);
  const [lx, ly] = d.loma?.[2] ?? [196, 134], ua = ease(tramo(t, W.P5 - 0.3, W.SAREER)), cx = ri(lerp(lx + 30, lx - 6, ua));
  const rec = tramo(t, W.REMEMBER - 0.3, W.REMEMBER + 0.5), va = tramo(t, W.BE - 0.6, W.BE + 0.6);
  T.letoGusano(R, cx, ly, t, { s: 0.5, dir: -1, giro: cx / 4, mira: rec > 0 ? [cx - 40, ly - 12] : (d.sol ?? [118, 76]) });
  if (rec > 0 && !o.sinNino) fantasma(LT.letoNinoLT, cx - 52 - ri(va * 10), ly + 1, t, { dir: 1, sonrisa: true, anda: va > 0 }, 0.75 * rec * (1 - va), H('#ffd890'), 0.5);
  T.imperioDelante(R, t, oo);
};
'''
DIOS += r'''
// ══ 6 · LA CALLE DE LAS CASAS IGUALES (fondo local 'aldea'): cinco casas idénticas, la Ciudadela al fondo; en «imagine»
//    se abre la puerta del medio y sale el vecino, se estira, saluda a la vecina que barre y en «empire» mira el estandarte ══
const CIELO6 = pal('#6a9ad0', '#7eaad8', '#94bade', '#aacae6', '#c2d8ec', '#d8e6f0');
const fondo6 = () => horno('fondo6', () => {
  pintaCielo(CIELO6, 0, 96, null, 6);
  pintaCapa({ y: 70, amp: 7, f: 0.028, ph: 0.3, v: 2, luz: 0.8, cols: BOSQF, k: 6, copas: true });
  // la Ciudadela del dios en la colina: torres de piedra rosada
  for (const [x0, x1, y0] of [[186, 214, 46], [214, 226, 58], [196, 204, 34], [226, 240, 62]]) for (let y = y0; y < 82; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono(pal('#7a5a5e', '#9a7676', '#b8908a', '#d4aca0'), 2.4 - (x - x0) / (x1 - x0 + 1) * 1.4 + ((y - y0) % 6 === 0 ? -0.6 : 0), x, y));
  R.poligono([[194, 34], [200, 24], [206, 34]], H('#6a3a3e')); for (const [x, y] of [[200, 40], [200, 50], [220, 66], [190, 56], [208, 56], [232, 68], [196, 68]]) { R.rect(x, y, x + 1, y + 3, H('#3a2a30')); R.pset(x, y, H('#f0c070')); }
  for (const [x0, x1, y0] of [[186, 214, 46], [214, 226, 58], [226, 240, 62]]) for (let x = x0; x <= x1; x += 3) R.rect(x, y0 - 2, x + 1, y0 - 1, H('#9a7676'));
  R.rect(199, 14 + 10, 199, 24, H('#3a2a30')); for (let i = 0; i < 6; i++) R.pset(200 + i, 25 + (i & 1), H('#2a4a3a'));
  pintaCapa({ y: 92, amp: 6, f: 0.022, ph: 2, v: 2.4, luz: 1, cols: BOSQ.slice(1, 7), k: 7, copas: true, cae: 0.01 });
  // el camino de la loma (por donde pasa la patrulla)
  for (let x = 0; x < 320; x++) { const y = 98 + ri(Math.sin(x * 0.02) * 2); R.pset(x, y, H('#c8b48a')); R.pset(x, y + 1, H('#a8946a')); }
  // las cinco casas iguales, con sus tapias y jardincitos
  for (let k = 0; k < 5; k++) casa(4 + k * 64, 138, 48, 28, 0, { puerta: k !== 2 });
  for (let y = 132; y < 140; y++) for (let x = 0; x < 320; x++) { const m = (x % 64) > 52 || (x % 64) < 2; if (m) R.pset(x, y, tono(MURO, 2 + hh(x, y) - (y === 132 ? -1 : 0), x, y)); }
  for (let x = 0; x < 320; x += 64) for (let i = 0; i < 9; i++) copa(x + 56 + (i % 3) * 3, 128 - Math.floor(i / 3) * 3, 3, BOSQ, i);
  // la acera y la calle de adoquines mojados
  for (let y = 139; y < 145; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#6a6058', '#8a8072', '#a89c8a', '#c4b8a4'), 2 + (x % 12 === 0 ? -1.2 : 0) + (hh(x, y) - 0.5), x, y));
  adoquin(145, 179, CALZ, 6);
  for (const [x, y, w] of [[60, 160, 14], [214, 170, 16], [292, 154, 9]]) charco(x, y, w, 3, pal('#4a6a8a', '#7aa0c0', '#a8c8e0', '#d8ecf8'));
  // farolas iguales
  for (const x of [42, 170, 298]) { R.rect(x, 104, x + 1, 144, H('#2a2a30')); R.rect(x - 2, 100, x + 3, 104, H('#3a3a40')); R.rect(x - 1, 101, x + 2, 103, H('#f0e0a0')); }
});
const p6 = (t, o = {}) => {
  R.copiar(fondo6());
  nubes(t, [[10, 40, 64, 2], [140, 32, 70, 1], [240, 62, 50, 3.4], [80, 62, 40, 5], [300, 44, 54, 1.4], [190, 50, 36, 2.6]], NUBD, 6);
  for (let k = 0; k < 4; k++) pajaro(((t * 18 + k * 60) % 380) - 30, 60 + (k % 2) * 6, t, H('#2a2a3a'), k);
  for (let k = 0; k < 5; k++) humo(4 + k * 64 + 41, 120 - 14, t, k);
  for (const [x, y] of [[60, 160], [214, 170]]) ondas(x, y, t, x);
  // la patrulla de Habladoras por el camino de la loma
  for (let k = 0; k < 2; k++) T.d2_habladora(R, ri(((t * 6 + k * 14) % 360) - 20), 98, t, { alto: 9, dir: 1, anda: true, baston: k === 0, fase: k });
  // la puerta de la casa del medio se abre en «imagine»
  const px = 4 + 128 + ri(48 * 0.42), ab = tramo(t, W.IMAGINE - 0.2, W.IMAGINE + 0.3);
  R.rect(px - 1, 124, px + 9, 138, H('#2a1a14')); R.rect(px, 125, px + 8, 138, H('#1a1010'));
  const w = ri(8 * (1 - ab)); if (w > 0) { R.rect(px, 125, px + w, 138, H('#5a3a24')); emblema(px + ri(w / 2), 130, 2, H('#e8c060')); } else R.rect(px + 8, 125, px + 9, 138, H('#6a4a30'));
  // el vecino: sale, se estira, saluda y mira el estandarte
  const sale = tramo(t, W.IMAGINE + 0.2, W.PERSON - 0.2), vx = ri(lerp(px - 3, px + 26, ease(sale))), vy = ri(lerp(138, 160, ease(sale)));
  // la vecina barre su acera (al principio), saluda en «person»
  const bx = 64 + ri(Math.sin(t * 2.2) * 3);
  R.actor(LT.ciudadanaLT, bx, 158, t, { dir: 1, habla: t > W.PERSON && t < W.PERSON + 1.2, sonrisa: t > W.PERSON + 1.2, dedo: t > W.PERSON && t < W.PERSON + 1.0 });
  R.linea(bx + 13, 148, bx + 17 + ri(Math.sin(t * 4.4) * 3), 158, H('#8a6a3a')); for (let i = -2; i <= 2; i++) R.pset(bx + 17 + i + ri(Math.sin(t * 4.4) * 3), 158, H('#c8a050'));
  if (sale > 0) R.actor(LT.ciudadanoLT, vx, vy, t, { dir: t > W.EMPIRE - 0.2 ? 1 : -1, anda: sale < 1, brazos: t > W.PERSON - 0.2 && t < W.PERSON + 0.4, dedo: t > W.PERSON + 0.4 && t < W.EMPIRE - 0.2, sorpresa: t > W.EMPIRE && t < W.EMPIRE + 1.4, sonrisa: t < W.EMPIRE });
  // el estandarte del anillo, que se despliega en «empire»
  bandera(254, 92, 144, t, 18 + ri(tramo(t, W.EMPIRE - 0.3, W.EMPIRE + 0.3) * 6), 12, 1);
  // el gato en la tapia
  const gx = ri(118 + Math.sin(t * 0.5) * 3); R.rect(gx, 128, gx + 4, 131, H('#3a3030')); R.pset(gx + 5, 127, H('#3a3030')); R.pset(gx + 5, 126, H('#3a3030')); R.pset(gx - 1, 129 - ri(Math.sin(t * 3)), H('#3a3030'));
};

// ══ 7 · EL PUERTO CERRADO (fondo local): una nave varada cubierta de hiedra, un cañón con flores; en «wars» un pájaro se
//    posa en el cañón; el vecino llega con la maleta a la verja y en «travel» la Habladora cierra: «X» ══
const CIELO7 = pal('#4a7ac0', '#5a8ac8', '#70a0d4', '#88b4de', '#a2c6e6', '#bed8ee');
const NAVE = pal('#3a3430', '#5a4a3e', '#7a6250', '#987a60', '#b49474', '#ccae8a');
const fondo7 = () => horno('fondo7', () => {
  pintaCielo(CIELO7, 0, 92, null, 7);
  pintaCapa({ y: 82, amp: 5, f: 0.03, ph: 2.2, v: 2, luz: 0.8, cols: BOSQF, k: 8, copas: true });
  // la pista vieja (losas con hierba en las juntas)
  for (let y = 96; y < 180; y++) for (let x = 0; x < 320; x++) { const fy = Math.floor((y - 96) / (6 + (y - 96) * 0.12)), fx = Math.floor((x - 160) / (14 + (y - 96) * 0.4)); let v = 2.2 + (hh(fx, fy, 3) - 0.5) * 1 + (hh(x, y, 4) - 0.5) * 0.6;
    const junta = hh(x >> 1, y, 5) > 0.7 && ((y - 96) % (6 + Math.floor((y - 96) * 0.12)) === 0); R.pset(x, y, junta || hh(x >> 2, y >> 2, 6) > 0.86 ? tono(VER1[2], 2 + hh(x, y), x, y) : tono(pal('#5a5650', '#76706a', '#928a80', '#aca296'), v, x, y)); }
  // la nave varada: un casco de cohete tumbado (morro a la izquierda, toberas a la derecha), planchas con remaches y
  // óxido, la cabina con su cristal, aletas, ojos de buey, la rampa bajada; patas; hiedra
  const cx = 214, cy = 92, X0 = 136, X1 = 300;
  const radio = (x) => { const u = (x - X0) / (X1 - X0); return u < 0.25 ? 30 * Math.sqrt(u / 0.25) : u > 0.92 ? 30 - (u - 0.92) * 120 : 30; };
  for (let x = X0; x <= X1; x++) { const r = radio(x); for (let j = -r; j <= r; j++) { const y = ri(cy + j), e = Math.abs(j) / Math.max(1, r); if (!libreAtom(x, y)) continue;
    let v = 3.6 - j / r * 1.6 + (hh(x >> 1, y >> 1, 9) - 0.5) * 0.5 + (e > 0.88 ? -1.2 : 0); if ((x - X0) % 18 === 0) v -= 1; if ((x - X0) % 18 === 2 && (y % 6) === 0) v += 1; if (ri(j) === ri(r * 0.35)) v -= 0.7;
    const oxido = vn(x, y, 6, 12) > 0.66; R.pset(x, y, oxido ? tono(pal('#5a2a1a', '#8a4a2a', '#b06a3a', '#c88a4a'), v * 0.8, x, y) : tono(NAVE.map((c) => mez(c, H('#a8b0b8'), 0.35)), v, x, y)); } }
  // la cabina del morro
  for (let j = -10; j <= 0; j++) for (let i = 0; i < 22; i++) { const x = 150 + i, y = cy - 12 + j; if (Math.hypot((i - 11) / 11, j / 10) <= 1) R.pset(x, y, j < -6 && i < 10 ? H('#c8e8f4') : tono(pal('#1a2a3a', '#2a4a5a', '#4a7a8a'), 2 + j / 10, x, y)); }
  // aletas y toberas
  R.poligono([[266, cy - 28], [294, cy - 41], [299, cy - 41], [292, cy - 24]], H('#7a6a5e')); R.poligono([[268, cy + 28], [302, cy + 44], [306, cy + 42], [292, cy + 22]], H('#5a4a40'));
  for (const yy of [-14, 0, 14]) { R.disco(304, cy + yy, 6, H('#2a2420')); R.disco(304, cy + yy, 4, H('#141010')); }
  for (const px2 of [186, 210, 234, 258]) { R.disco(px2, cy - 6, 4, H('#2a2420')); R.disco(px2, cy - 6, 3, H('#1a2a3a')); R.pset(px2 - 1, cy - 7, H('#6a8aa0')); }
  // la franja pintada (descolorida) con el anillo y la rampa bajada con la escotilla
  for (let x = 176; x < 290; x++) { R.pset(x, cy + 8, H('#6a3a3a')); R.pset(x, cy + 9, H('#8a4a40')); } emblema(222, cy + 16, 5, H('#c8a060'));
  R.rect(238, cy + 4, 256, cy + 24, H('#141010')); R.poligono([[238, cy + 24], [256, cy + 24], [270, 136], [228, 136]], H('#6a5e54')); for (let y = cy + 28; y < 136; y += 3) R.linea(232, y, 266, y, H('#4a4038'));
  for (const [x0, x1] of [[160, 150], [196, 196], [274, 284]]) { R.linea(x0, 118, x1, 134, H('#2a2420')); R.linea(x0 + 1, 118, x1 + 1, 134, H('#6a5a4a')); R.rect(x1 - 3, 134, x1 + 4, 136, H('#3a3430')); }
  // hiedra que cuelga del casco y un arbolito que sale de la escotilla
  for (let k = 0; k < 18; k++) { const x = 146 + k * 8 + ri(hh(k, 1, 11) * 5), y0 = cy - ri(radio(x) * 0.9), L = 10 + ri(hh(k, 2, 11) * 34); for (let j = 0; j < L; j++) { const xx = x + ri(Math.sin(j * 0.4 + k) * 1.5); R.pset(xx, y0 + j, j % 3 ? H('#2a5a2a') : H('#4a8a3a')); if (j % 4 === 0) R.pset(xx + 1, y0 + j, H('#6aa44a')); } }
  R.rect(212, 52, 213, 64, TRONCO); copa(212, 48, 8, BOSQ, 3); copa(205, 52, 6, BOSQ, 4); copa(219, 53, 5, BOSQ, 5);
  // la verja del puerto (malla) con su puerta
  for (let x = 96; x < 320; x++) { R.pset(x, 112, H('#5a5a60')); R.pset(x, 113, H('#3a3a40')); } for (let x = 96; x < 320; x += 12) R.rect(x, 112, x + 1, 150, H('#4a4a50'));
  for (let y = 114; y < 150; y += 3) for (let x = 96; x < 320; x++) if (((x + y) % 6) === 0 && !(x > 140 && x < 168)) R.pset(x, y, H('#8a8a90'));
  for (let x = 96; x < 320; x++) { R.pset(x, 150, H('#3a3a40')); }
  // hierba alta delante y el cañón viejo con flores
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < 160 && hh(x, y, 12) < 0.5) continue; R.pset(x, y, tono(VER1[2], 2.4 + (hh(x, y, 13) - 0.5) * 1.6 + Math.sin(x * 0.8) * 0.4, x, y)); }
  for (let k = 0; k < 40; k++) { const x = ri(hh(k, 1, 14) * 320), y = 152 + ri(hh(k, 2, 14) * 26); R.linea(x, y, x + ri(hh(k, 3) * 4 - 2), y - 6, H('#5a9a3a')); if (k % 4 === 0) R.pset(x, y - 7, [H('#f0e070'), H('#e86a8a'), H('#ffffff')][k % 3]); }
  // el cañón: cureña, rueda y el tubo apuntando al cielo con flores dentro
  R.disco(44, 150, 9, H('#4a3424')); R.disco(44, 150, 7, H('#6a4a30')); for (let a = 0; a < 8; a++) R.linea(44, 150, 44 + ri(Math.cos(a * 0.785) * 7), 150 + ri(Math.sin(a * 0.785) * 7), H('#3a2414')); R.disco(44, 150, 2, H('#2a1a10'));
  R.poligono([[24, 154], [62, 152], [66, 156], [24, 158]], H('#5a3a24'));
  for (let i = 0; i < 46; i++) { const x = 38 + i * 0.85, y = 146 - i * 0.62; R.disco(ri(x), ri(y), 3, tono(pal('#2a2a2e', '#3e3c3e', '#565250', '#6e6a64'), 2 - (i % 9 === 0 ? 1 : 0) + hh(i, 1) * 0.6, ri(x), ri(y))); R.pset(ri(x) - 1, ri(y) - 2, H('#8a847a')); }
  for (let k = 0; k < 7; k++) { const x = 76 + ri(Math.sin(k * 1.7) * 3), y = 116 + ri(Math.cos(k * 2.1) * 2) - k % 3; R.pset(x, y, [H('#f05a6a'), H('#f0e070'), H('#ffffff'), H('#e870c0')][k % 4]); R.pset(x, y + 1, H('#3a7a2a')); }
});
const p7 = (t, o = {}) => {
  R.copiar(fondo7());
  nubes(t, [[20, 36, 46, 2.4], [150, 30, 40, 1.2], [70, 66, 30, 4]], NUBD, 7);
  // golondrinas que entran y salen de la nave
  for (let k = 0; k < 3; k++) { const a = t * 1.2 + k * 2.1; pajaro(214 + Math.cos(a) * (60 + k * 10), 52 + Math.sin(a * 1.4) * 14, t, H('#1a1a2a'), k); }
  // el pájaro que se posa en la boca del cañón en «wars»
  const po = tramo(t, W.WARS - 0.9, W.WARS), bx = lerp(4, 78, ease(po)), by = lerp(80, 114, ease(po)) - Math.sin(po * Math.PI) * 10;
  if (po < 1) pajaro(bx, by, t, H('#c84a2a')); else { R.rect(77, 112, 79, 114, H('#c84a2a')); R.pset(80, 112, H('#e8a040')); R.pset(77, 115, K); R.pset(79, 115, K); R.pset(78, 111 - (Math.sin(t * 6) > 0.6 ? 1 : 0), H('#c84a2a')); }
  // la puerta de la verja: abierta y se cierra en «travel»
  const ci = ease(tramo(t, W.TRAVEL - 0.35, W.TRAVEL + 0.05)), gx = ri(lerp(168, 141, ci));
  for (let y = 114; y < 150; y += 3) for (let x = gx; x < gx + 27; x++) if (((x + y) % 6) === 0) R.pset(x, y, H('#a8a8b0')); R.rect(gx, 113, gx + 1, 150, H('#5a5a60')); R.rect(gx + 26, 113, gx + 27, 150, H('#5a5a60')); R.rect(gx, 113, gx + 27, 114, H('#5a5a60'));
  // la Habladora que cierra, dentro
  R.actor(LT.habladoraLT, ri(lerp(190, 168, tramo(t, W.ALLOW, W.TRAVEL - 0.3))), 150, t, { dir: -1, anda: t > W.ALLOW && t < W.TRAVEL - 0.3, dedo: t > W.TRAVEL && t < W.TRAVEL + 1 });
  // el vecino con la maleta llega a la verja
  const ll = tramo(t, W.P7 - 0.2, W.TRAVEL - 0.6), vx = ri(lerp(70, 118, ease(ll)));
  const v = R.actor(LT.ciudadanoLT, vx, 160, t, { dir: 1, anda: ll > 0 && ll < 1, sostiene: t < W.TRAVEL + 0.6 ? true : undefined, sorpresa: t > W.TRAVEL && t < W.TRAVEL + 0.6, triste: t > W.TRAVEL + 0.6 });
  if (v?.mano && t < W.TRAVEL + 0.6) { const [mx, my] = v.mano; R.rect(mx - 4, my + 1, mx + 5, my + 8, H('#6a3a24')); R.rect(mx - 3, my + 2, mx + 4, my + 7, H('#9a5a34')); R.linea(mx - 1, my, mx + 2, my, H('#3a2414')); R.rect(mx - 3, my + 4, mx + 4, my + 4, H('#c8904a')); }
  else { R.rect(vx + 16, 153, vx + 25, 160, H('#6a3a24')); R.rect(vx + 17, 154, vx + 24, 159, H('#9a5a34')); R.rect(vx + 17, 156, vx + 24, 156, H('#c8904a')); }
  if (t > W.TRAVEL) { const s = tramo(t, W.TRAVEL, W.TRAVEL + 0.2); R.icono('X', 144, 118, H('#e83a3a'), true, s > 0.5 ? 3 : 2); }

};
'''
DIOS += r'''
// ══ 8 · EL ALMACÉN DE LA ESPECIA (fondo local): estantes llenos de tarros que brillan; en «keeps all the spice» la puerta
//    redonda de la cámara se cierra; tras el mostrador, una Habladora reparte con un cuentagotas: en «drop» cae UNA gota
//    en la taza del primero de la cola, que se queda mirándola ══
const PIEDR8 = pal('#2a1e22', '#3a2a2a', '#4e3a34', '#644a3e', '#7a5c4a', '#906e56');
const fondo8 = () => horno('fondo8', () => {
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 9), xx = x + (f & 1) * 11; let v = 2.6 + (hh(xx >> 4, f, 3) - 0.5) * 1 + (hh(x, y, 4) - 0.5) * 0.5 - Math.abs(x - 150) / 300;
    if (y % 9 === 0 || xx % 22 === 0) v -= 1.2; else if (y % 9 === 1) v += 0.5; R.pset(x, y, tono(PIEDR8, v, x, y)); }
  // los estantes con tarros de especia (naranja y azul) que brillan
  for (let fila = 0; fila < 4; fila++) { const y = 34 + fila * 22; R.rect(6, y, 200, y + 3, H('#5a3a24')); R.rect(6, y, 200, y, H('#8a5a34')); R.rect(6, y + 4, 200, y + 5, H('#1a1014'));
    for (let k = 0; k < 15; k++) { const x = 10 + k * 13, hgt = 8 + ri(hh(k, fila, 5) * 8), w = 3 + ri(hh(k, fila, 6) * 2), azul = hh(k, fila, 7) > 0.75;
      R.rect(x - w, y - hgt, x + w, y - 1, H('#2a2428')); R.rect(x - w + 1, y - hgt + 3, x + w - 1, y - 1, azul ? H('#3a6ac8') : H('#d8762a')); R.rect(x - w + 1, y - hgt + 3, x - w + 1, y - 2, azul ? H('#8ab0f0') : H('#ffb860'));
      R.rect(x - w + 1, y - hgt, x + w - 1, y - hgt + 1, H('#8a6a4a')); R.pset(x + w - 1, y - hgt + 4, H('#ffffff')); } }
  // la cámara: puerta redonda de bronce (la luz de dentro la pinta la escena)
  R.disco(244, 74, 36, H('#3a2a20')); R.disco(244, 74, 33, H('#1a1010'));
  // farolillos de pared
  for (const x of [214, 290]) { R.rect(x, 26, x + 4, 34, H('#3a2a20')); R.rect(x + 1, 27, x + 3, 32, H('#ffd070')); }
  // el suelo de losas
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const fy = Math.floor((y - 124) / (4 + (y - 124) * 0.1)), fx = Math.floor((x - 160) / (16 + (y - 124) * 0.5)); let v = 2 + (hh(fx, fy, 8) - 0.5) * 0.9 + (hh(x, y, 9) - 0.5) * 0.5;
    if ((x - 160) % (16 + Math.floor((y - 124) * 0.5)) === 0) v -= 1; R.pset(x, y, tono(pal('#2a2024', '#3e3030', '#56443e', '#6e5a4e', '#86705e'), v, x, y)); }
  R.linea(0, 124, 319, 124, H('#1a1014'));
  // sacos de especia apilados a la derecha y un barril
  for (const [x, y] of [[282, 150], [300, 152], [292, 140], [272, 158]]) { R.disco(x, y, 8, H('#8a6a4a')); R.disco(x - 1, y - 1, 6, H('#b48a5a')); R.rect(x - 2, y - 9, x + 2, y - 7, H('#5a3a24')); R.pset(x - 3, y - 3, H('#d8aa70')); }
  R.rect(14, 126, 34, 156, H('#4a2e1c')); for (let y = 128; y < 156; y += 6) R.rect(14, y, 34, y, H('#2a1a10')); R.rect(14, 126, 16, 156, H('#7a4e2e'));
});
// el mostrador de delante (tablero y frente con cuarterones)
const mostrador8 = (t) => { R.rect(128, 128, 264, 132, H('#3a2414')); R.rect(128, 128, 264, 128, H('#a87a4a')); R.rect(130, 133, 262, 172, H('#5a3a24'));
  for (let x = 136; x < 256; x += 30) { R.rect(x, 138, x + 22, 166, H('#4a2e1c')); R.rect(x + 1, 139, x + 21, 139, H('#7a5434')); R.rect(x + 1, 166, x + 21, 166, H('#2a1810')); emblema(x + 11, 152, 4, H('#c8963a')); }
  R.rect(130, 172, 262, 174, H('#2a1810'));
  // el gran tarro de especia sobre el mostrador
  R.rect(222, 98, 252, 128, H('#2a2428')); R.rect(223, 104, 251, 127, H('#c86a2a')); R.rect(223, 104, 251, 108, H('#f0a050')); R.rect(224, 99, 250, 103, H('#6a5a50'));
  for (let k = 0; k < 6; k++) { const s = Math.sin(t * 2 + k * 1.3); if (s > 0.6) R.pset(226 + k * 4, 110 + (k % 3) * 5, H('#fff0b0')); } R.rect(224, 105, 225, 126, H('#ffc888')); };
const p8 = (t, o = {}) => {
  R.copiar(fondo8());
  // la cámara: dentro, el monte de especia que brilla; la puerta redonda rueda desde la derecha y la cierra en «keeps all»
  const ci = ease(tramo(t, W.KEEPSALL - 0.5, W.KEEPSALL + 0.15));
  R.recorte([211, 41, 277, 107]);
  R.disco(244, 74, 33, H('#2a1408')); R.halo(244, 92, 34, [H('#3a1a0a'), H('#e88a3a')], 0.9);
  for (let x = 212; x < 277; x++) { const top = ri(96 - 22 * Math.exp(-(((x - 244) / 18) ** 2)) - Math.sin(x * 0.4) * 1.5); for (let y = top; y < 108; y++) if (Math.hypot(x - 244, y - 74) < 33) R.pset(x, y, tono(pal('#8a3a10', '#c05a1a', '#e07a2a', '#f8a040', '#ffd080'), 3.4 - (y - top) * 0.12 - (x - 244) / 40 + (hh(x, y, 3) - 0.5), x, y)); }
  for (let k = 0; k < 10; k++) { const f = (t * 0.6 + k / 10) % 1; R.pset(ri(222 + hh(k, 1) * 44), ri(96 - f * 40), H('#ffe0a0')); }
  const dx = ri((1 - ci) * 68); for (let j = -33; j <= 33; j++) { const w = ri(Math.sqrt(33 * 33 - j * j)); for (let i = -w; i <= w; i++) { const x = 244 + dx + i, y = 74 + j, rr = Math.hypot(i, j);
    R.pset(x, y, tono(pal('#4a2a14', '#7a5024', '#a8783a', '#d0a050', '#f0cc78'), 2.6 - (i + j) / 40 + (rr > 30 ? -1.4 : rr > 27 && rr < 29 ? 1 : 0) + (Math.abs(rr - 14) < 1 ? -1 : 0) + (hh(i >> 1, j >> 1, 4) - 0.5) * 0.4, x, y)); } }
  emblema(244 + dx, 74, 8, H('#ffe080'), H('#8a5a2a')); for (let a = 0; a < 8; a++) R.disco(244 + dx + ri(Math.cos(a * 0.785 + ci * 3) * 22), 74 + ri(Math.sin(a * 0.785 + ci * 3) * 22), 2, H('#ffe080'));
  R.recorte(null);
  // destellos que recorren los tarros en «universe»
  const br = tramo(t, W.UNIVERSE - 0.2, W.UNIVERSE + 1.2); if (br > 0 && br < 1) for (let fila = 0; fila < 4; fila++) { const x = ri(br * 210), y = 22 + fila * 22; R.halo(x, y, 6, [H('#6a4a3a'), H('#fff0b0')], 0.8); }
  // la cola: tres vecinos con su taza
  const avanza = tramo(t, W.TIME - 0.1, W.TIME + 0.8);
  const fila = [[LT.ciudadanaLT, 106], [LT.ciudadanoLT, 80], [LT.ciudadanaLT, 54]];
  let taza = null;
  fila.forEach(([def, x], k) => { const xx = ri(x + (k > 0 ? avanza * 4 : 0)); const r = R.actor(def, xx, 162, t, { dir: 1, sostiene: k === 0 ? [xx + 20, 132] : undefined, triste: k === 0 && t > W.DROP + 0.4, sorpresa: k === 0 && t > W.DROP && t < W.DROP + 0.4, habla: k === 1 && t > W.UNIVERSE && t < W.UNIVERSE + 1.2, sonrisa: k === 2 });
    if (k === 0) taza = r?.mano; });
  // la Habladora tras el mostrador, con el cuentagotas sobre la taza
  const hx = 140, h = R.actor(LT.habladoraLT, hx, 138, t, { dir: -1, sostiene: [ri(hx - 2), ri(110 + Math.sin(tramo(t, W.HANDSOUT - 0.3, W.DROP) * Math.PI * 3) * 1.5)] });
  mostrador8(t);
  if (taza) { const [mx, my] = taza; R.rect(mx - 3, my - 3, mx + 3, my + 1, H('#e8e0d0')); R.rect(mx - 2, my - 2, mx + 2, my, H('#fff8ec')); R.rect(mx - 2, my - 3, mx + 2, my - 3, H('#a89888')); R.pset(mx + 4, my - 2, H('#e8e0d0')); R.pset(mx + 4, my - 1, H('#e8e0d0'));
    if (t > W.DROP + 0.25) { R.pset(mx, my - 2, H('#e8762a')); R.pset(mx - 1, my - 2, H('#c85a1a')); } }
  if (h?.mano) { const [hx2, hy2] = h.mano, tx = (taza ?? [124, 130])[0];
    // el cuentagotas: bulbo, tubo de cristal y la gota
    R.rect(hx2 - 1, hy2 - 4, hx2 + 1, hy2 - 1, H('#c83a2a')); R.pset(hx2, hy2 - 5, H('#e85a4a')); R.linea(hx2, hy2, hx2, hy2 + 7, H('#d8eef8')); R.pset(hx2, hy2 + 6, H('#e8762a')); R.pset(hx2 + 1, hy2 + 2, H('#ffffff'));
    const g = tramo(t, W.DROP - 0.3, W.DROP + 0.25); if (g > 0 && g < 1) { const y = ri(lerp(hy2 + 8, (taza ?? [0, 130])[1] - 3, g * g)); R.disco(hx2, y, 1, H('#f08a3a')); R.pset(hx2, y - 1, H('#ffd090')); }
    void tx; }
  if (t > W.DROP - 0.1 && taza) { const u = tramo(t, W.DROP - 0.1, W.DROP + 0.3); R.halo(taza[0], taza[1] - 34, 12, [H('#3a2a2a'), H('#ffd080')], 0.5 * u); R.icono('gota', taza[0] - 7, taza[1] - 42 + flota(t), H('#f08a3a'), true, 2); }
  if (t > W.DROP + 0.6 && taza) R.icono('?', taza[0] + 9, taza[1] - 38 + flota(t, 1), H('#ffe080'), true, 1);

};

// ══ 9 · LA ESQUINA (fondo local, al atardecer): soportales, un callejón, un balcón; el vecino pasa con la cesta; en
//    «corner» sale una Habladora del callejón; en «watched» le sigue con la cabeza; en «army of women» asoman más en el
//    balcón y en los soportales; en «fish-speakers» todas alzan la vara ══
const CIELO9 = pal('#3a2a5a', '#5a3a6a', '#8a4a6a', '#b8606a', '#e08a6a', '#f0b07a');
const fondo9 = () => horno('fondo9', () => {
  pintaCielo(CIELO9, 0, 70, [128, 66, 6], 9);
  // edificios: a la izquierda los soportales, en medio el callejón, a la derecha la esquina con balcón
  const piedra = (x0, y0, x1, y1, k, sombra = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = Math.floor(y / 6), xx = x + (f & 1) * 6; let v = 2.6 + (hh(xx >> 3, f, k) - 0.5) * 0.9 + (hh(x, y, k + 1) - 0.5) * 0.5 - sombra;
    if (y % 6 === 0 || xx % 12 === 0) v -= 1; R.pset(x, y, tono(pal('#4a3038', '#6a4a4a', '#8a6460', '#a87e72', '#c89a86', '#e0b49a'), v, x, y)); } };
  piedra(0, 40, 140, 150, 1); piedra(186, 30, 319, 150, 3, 0.3); piedra(140, 56, 186, 150, 5, 1.4);
  // los soportales: arcos y columnas, oscuro dentro
  for (let k = 0; k < 4; k++) { const x0 = 6 + k * 34; for (let y = 96; y < 150; y++) for (let x = x0; x < x0 + 26; x++) { const ar = y < 108 ? Math.hypot(x - x0 - 13, (y - 108) * 1.1) < 13 : true; if (ar) R.pset(x, y, tono(pal('#1a1018', '#2a1a22', '#3a2a2e'), 1 + (y - 96) / 54 + hh(x, y) * 0.5, x, y)); }
    R.rect(x0 + 26, 96, x0 + 33, 150, H('#a87e72')); R.rect(x0 + 26, 96, x0 + 27, 150, H('#c89a86')); }
  // el callejón (más oscuro, con escalones al fondo y ropa tendida)
  for (let y = 70; y < 150; y++) for (let x = 146; x < 182; x++) R.pset(x, y, tono(pal('#140c14', '#22141e', '#34202a', '#4a2e36'), 0.6 + (y - 70) / 80 * 1.6 + hh(x, y, 7) * 0.6, x, y));
  for (let k = 0; k < 5; k++) R.rect(156 + k, 138 - k * 4, 176 - k, 141 - k * 4, H('#5a3a40'));
  // ventanas con contraventanas en la casa de la derecha y el balcón de hierro
  for (const [x, y] of [[198, 46], [232, 46], [198, 90], [232, 90], [266, 90]]) { R.rect(x, y, x + 14, y + 18, H('#2a1a20')); R.rect(x + 1, y + 1, x + 13, y + 17, H('#f0c070')); R.linea(x + 7, y + 1, x + 7, y + 17, H('#2a1a20')); R.rect(x - 4, y, x - 1, y + 18, H('#3a5a4a')); R.rect(x + 15, y, x + 18, y + 18, H('#3a5a4a')); }
  R.rect(190, 70, 300, 72, H('#2a2024')); for (let x = 192; x < 300; x += 4) R.rect(x, 62, x, 70, H('#2a2024')); R.rect(190, 62, 300, 62, H('#2a2024'));
  // el suelo de la plaza
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const fy = Math.floor((y - 150) / 5), xx = x + (fy & 1) * 5; let v = 2 + (hh(xx >> 3, fy, 10) - 0.5) + (y - 150) * 0.02; if ((y - 150) % 5 === 0 || xx % 10 === 0) v -= 1; R.pset(x, y, tono(pal('#3a2a30', '#5a4244', '#7a5c58', '#9a786c', '#b8907e'), v, x, y)); }
  // ventanas con macetas y un toldo en la casa de los soportales
  for (const x of [14, 48, 82, 116]) { R.rect(x, 52, x + 12, 70, H('#2a1a20')); R.rect(x + 1, 53, x + 11, 69, x === 48 ? H('#f0c070') : H('#3a2a3a')); R.linea(x + 6, 53, x + 6, 69, H('#2a1a20')); R.rect(x - 1, 70, x + 13, 72, H('#8a6460'));
    for (let i = 0; i < 12; i++) R.pset(x + i, 69 - (i % 3 === 0 ? 1 : 0), i % 2 ? H('#e84a5a') : H('#3a7a2e')); }
  for (let x = 4; x < 136; x++) { R.pset(x, 88, H('#5a2a2a')); R.pset(x, 89 + ((x >> 2) & 1), (x >> 3) & 1 ? H('#c84a3a') : H('#e8d8c0')); }
  // la fuente de la esquina
  R.rect(286, 136, 318, 152, H('#6a5258')); R.rect(286, 136, 318, 137, H('#b8908a')); R.rect(300, 118, 304, 136, H('#8a6a6a')); R.disco(302, 116, 4, H('#a88480'));
});
const p9 = (t, o = {}) => {
  R.copiar(fondo9());
  nubes(t, [[10, 34, 40, 2], [190, 24, 30, 1.2]], [pal('#6a3a5a', '#b86a7a', '#f0a890'), pal('#5a3058', '#a05a74', '#e09080')], 9);
  for (let k = 0; k < 3; k++) pajaro(((t * 14 + k * 50) % 260) + 30, 40 + k * 5, t, H('#2a1a2a'), k);
  // faroles que titilan y la ropa tendida en el callejón
  for (const [x, y] of [[40, 90], [140, 92], [210, 116]]) { R.rect(x, y - 6, x + 1, y - 4, H('#2a2024')); R.rect(x - 2, y - 4, x + 3, y + 3, H('#2a2024')); R.rect(x - 1, y - 3, x + 2, y + 2, Math.sin(t * 7 + x) > -0.7 ? H('#ffd070') : H('#e8a040')); R.halo(x, y, 9, [H('#5a3a3a'), H('#ffc060')], 0.45); }
  R.linea(146, 80, 182, 84, H('#8a7a70')); for (let k = 0; k < 4; k++) { const x = 150 + k * 8, sw = ri(Math.sin(t * 3 + k) * 1.5); R.rect(x + sw, 81 + k, x + 5 + sw, 87 + k, [H('#e8d8b8'), H('#8aa0c8'), H('#d87a6a'), H('#ffffff')][k]); }
  // el agua de la fuente
  for (let k = 0; k < 6; k++) { const f = (t * 1.5 + k / 6) % 1; ps(302 + (k - 3) * f * 3, 114 + f * f * 22 - f * 8, H('#a8d8f0')); }
  // palomas que picotean en la plaza y echan a volar cuando pasa el vecino
  for (let k = 0; k < 4; k++) { const x0 = 120 + k * 22, vuela = t > W.P9 + 1.2 + k * 0.15, f = tramo(t, W.P9 + 1.2 + k * 0.15, W.P9 + 3.2 + k * 0.15);
    if (!vuela) { const x = x0 + ri(Math.sin(t + k) * 2); R.rect(x, 173, x + 3, 175, H('#8a8a9a')); R.pset(x + 4, 172 + (Math.sin(t * 6 + k) > 0 ? 1 : 0), H('#6a6a7a')); R.pset(x + 1, 176, H('#e8a040')); }
    else paloma(x0 - f * 60, 172 - f * 90 + Math.sin(f * 9) * 3, t, k); }
  // las Habladoras del balcón y de los soportales: asoman en «army of women» y alzan la vara en «fish»
  const vara = t > W.FISH;
  [[206, 70, W.ARMY], [236, 70, W.ARMY + 0.25], [266, 70, W.WOMEN], [44, 150, W.WOMEN + 0.2], [112, 150, W.WOMEN + 0.4]].forEach(([x, y, t0], k) => { const u = tramo(t, t0 - 0.2, t0 + 0.2); if (u <= 0) return;
    T.d2_habladora(R, x, y + ri((1 - u) * (k < 3 ? 6 : 0)), t, { alto: k < 3 ? 12 : 15, dir: 0, baston: vara, fase: k }); });
  // el vecino con la cesta: cruza de derecha a izquierda; se asusta en «watched» y acelera
  const va = tramo(t, W.P9 - 0.2, W.P9 + 5.2), vx = ri(lerp(270, 40, va < 0.3 ? va * 0.8 : 0.24 + (va - 0.3) * 1.086));
  const v = R.actor(LT.ciudadanoLT, vx, 170, t, { dir: t > W.WATCHED && t < W.WATCHED + 0.7 ? 1 : -1, anda: true, sostiene: true, sorpresa: t > W.WATCHED && t < W.ARMY + 0.6 });
  if (v?.mano) { const [mx, my] = v.mano; R.rect(mx - 4, my, mx + 4, my + 5, H('#a8763a')); for (let i = -4; i <= 4; i += 2) R.pset(mx + i, my + 2, H('#6a4422')); R.pset(mx - 2, my - 1, H('#d84a3a')); R.pset(mx + 1, my - 1, H('#7ab04a')); R.pset(mx + 2, my - 2, H('#f0c040')); }
  if (t > W.WATCHED && t < W.ARMY + 0.8) sudor(vx + 3, 146, t);
  // la Habladora del callejón: sale en «corner» y gira la cabeza siguiéndole
  const sa = tramo(t, W.CORNER - 0.3, W.CORNER + 0.4); R.actor(LT.habladoraLT, ri(lerp(158, 166, sa)), ri(lerp(146, 158, sa)), t, { dir: vx > 166 ? 1 : -1, anda: sa > 0 && sa < 1, dedo: vara });
};

// ══ 10 · LA CIUDADELA (imperio ciudadela/general): el gusano en su carro con Duncan al lado; los peregrinos se postran en
//    «worship» y «god»; en «peace» entran palomas; el vecino de delante, en «breathe», se afloja el cuello y suda ══
const p10 = (t, o = {}) => {
  const oo = { encuadre: 'ciudadela', luz: 0.95 }; const d = T.imperio(R, t, oo); const [cx, cy] = d.carro ?? [160, 124];
  // los peregrinos en la alfombra, de pie y luego postrados
  for (let fila = 0; fila < 3; fila++) for (let k = 0; k < 6 - fila; k++) { const y = 140 + fila * 7, x = 132 + k * 11 + fila * 5 - (fila === 2 ? 2 : 0), t0 = W.WORSHIP + (fila * 6 + k) * 0.06;
    devoto(x, y, [H('#c8a878'), H('#8a6a9a'), H('#7a9a8a'), H('#c87a5a')][(k + fila) % 4], tramo(t, t0, t0 + 0.2) > 0.5 && !(t > W.PEACE && t < W.PEACE + 0.8 && (k + fila) % 3 === 0) ? 1 : 0); }
  T.letoGusano(R, cx, cy, t, { s: 1, dir: -1, mira: t > W.YET ? [150, 176] : [160, 150], habla: t > W.GOD - 0.2 && t < W.GOD + 0.8 && Math.sin(t * 9) > 0 });
  // Duncan a su lado, junto a la cara
  R.actor(LT.duncanLT, cx - 70, cy + 6, t, { dir: 1, habla: t > W.PEACE + 0.4 && t < W.PEACE + 1.2 });
  // palomas que entran por el ventanal en «peace»
  const pz = tramo(t, W.PEACE - 0.3, W.PEACE + 2.4); if (pz > 0 && pz < 1) for (let k = 0; k < 3; k++) paloma(lerp(40, 200 + k * 18, pz) + k * 7, lerp(60, 34, pz) + k * 5 + Math.sin(t * 3 + k) * 2, t, k);
  // el vecino delante, en la alfombra: mira, sonríe en «peace» y en «breathe» se ahoga
  const ah = t > W.YET + 0.2;
  const v = R.actor(LT.ciudadanoLT, 138, 178, t, { dir: 1, sonrisa: t > W.PEACE && !ah, triste: ah && t < W.BREATHE, sorpresa: t > W.BREATHE, dedo: t > W.BREATHE - 0.2 });
  if (t > W.BREATHE - 0.1) sudor(146, 150, t);
  T.imperioDelante(R, t, oo);
};

// ══ 11 · LA TERRAZA (fondo local, a la hora dorada): el carro mira al valle; Duncan llega y se queda a su lado en
//    «Duncan Idaho»; hablan; en «father's old friend», de luz, aparece a su lado Paul, el amigo de entonces, y se apaga ══
const CIELO11 = pal('#5a6aa0', '#7a7aa8', '#a08aa8', '#c89a9a', '#e8b08a', '#f8cc8a', '#fce4b0');
const fondo11 = () => horno('fondo11', () => {
  pintaCielo(CIELO11, 0, 100, [64, 84, 7], 11);
  pintaCapa({ y: 82, amp: 6, f: 0.028, ph: 0.8, v: 2, luz: 0.8, cols: pal('#5a5a7a', '#6e6a84', '#867c8c', '#a08e94'), k: 12, copas: true });
  pintaCapa({ y: 96, amp: 6, f: 0.02, ph: 2.2, v: 2.2, luz: 1, cols: pal('#2a3a2e', '#3a4e36', '#4e643e', '#6a7a48', '#8a9454'), k: 13, copas: true });
  // el río que brilla al sol, en el valle
  for (let x = 0; x < 320; x++) { const y = 104 + ri(Math.sin(x * 0.03 + 1) * 4 + x * 0.02); for (let j = 0; j < 3; j++) R.pset(x, y + j, j === 0 ? H('#f8d8a0') : H('#c89a7a')); }
  for (let k = 0; k < 6; k++) { const x = 30 + k * 46, y = 100 - (k % 2) * 4; R.rect(x, y - 2, x + 4, y, H('#e8d0b0')); R.pset(x + 2, y - 3, H('#a8503a')); }
  // la balaustrada de piedra rosada
  for (let y = 114; y < 140; y++) for (let x = 0; x < 320; x++) { let v; if (y < 118) v = 3 - (y - 114) * 0.4; else if (y > 135) v = 2.2; else { const b = (x % 12); v = b > 2 && b < 9 ? 2.6 - Math.abs(b - 5.5) * 0.35 + (Math.abs((y - 126) / 8) > 0.8 ? -0.6 : 0) : -9; }
    if (v > -9) R.pset(x, y, tono(pal('#5a3a40', '#7a5258', '#9a6e70', '#b88a88', '#d4a8a0', '#ecc8b8'), v + (hh(x, y, 14) - 0.5) * 0.5, x, y)); }
  // el suelo de la terraza (losas en perspectiva)
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const fy = Math.floor((y - 140) / (3 + (y - 140) * 0.12)), fx = Math.floor((x - 160) / (14 + (y - 140) * 0.6)); let v = 2.6 + ((fx + fy) & 1 ? -0.5 : 0) + (hh(x, y, 15) - 0.5) * 0.5; R.pset(x, y, tono(pal('#6a4a48', '#8a6660', '#a88278', '#c49e8e', '#dcbaa4'), v, x, y)); }
  // una alfombra larga con cenefa, un banco de piedra y pétalos
  for (let y = 162; y < 176; y++) for (let x = 40; x < 280; x++) { const b = y < 164 || y > 173 || x < 44 || x > 275; R.pset(x, y, b ? ((x + y) % 4 === 0 ? H('#e8c060') : H('#6a2a4a')) : tono(pal('#4a2a5a', '#5e3870', '#744a84'), 1.4 + hh(x >> 1, y, 3) + (((x - 40) % 16) < 2 ? 0.8 : 0), x, y)); }
  R.rect(52, 146, 92, 150, H('#a88a80')); R.rect(52, 146, 92, 146, H('#e0c8b8')); R.rect(56, 151, 60, 160, H('#7a6260')); R.rect(84, 151, 88, 160, H('#7a6260'));
  for (let k = 0; k < 30; k++) R.pset(ri(30 + hh(k, 1, 16) * 260), ri(142 + hh(k, 2, 16) * 36), k % 2 ? H('#f8c8d8') : H('#ffffff'));
  // macetones con limoneros a los lados
  for (const x of [22, 298]) { R.poligono([[x - 9, 140], [x + 9, 140], [x + 6, 158], [x - 6, 158]], H('#9a5a3a')); R.rect(x - 9, 140, x + 9, 141, H('#c87a4a')); copa(x, 128, 9, BOSQ, x); for (let k = 0; k < 4; k++) R.pset(x - 5 + k * 3, 124 + (k % 2) * 6, H('#f0d040')); }
});
const p11 = (t, o = {}) => {
  R.copiar(fondo11());
  nubes(t, [[20, 40, 70, 1.6], [150, 34, 60, 1], [210, 64, 44, 2.8], [90, 62, 40, 2.2], [300, 46, 56, 1.3], [250, 74, 34, 3.4]], [pal('#8a6a8a', '#d89a90', '#fcd8b0'), pal('#7a5a7a', '#c88a8a', '#f0c8a8'), pal('#6a5a80', '#b07a8a', '#e8b0a0')], 11);
  for (let k = 0; k < 4; k++) pajaro(((t * 12 + k * 70) % 380) - 30, 64 + Math.sin(t + k) * 4 + k * 3, t, H('#3a2a3a'), k);
  for (let k = 0; k < 5; k++) { const x = ri((t * 4 + k * 64) % 320); mezP(x, 105, H('#ffffff'), 0.8); }
  bandera(120, 70, 140, t, 16, 10, 2);
  // la Habladora de guardia al fondo, ronda por la terraza
  const gx = ri(250 + Math.sin(t * 0.4) * 20); R.actor(LT.habladoraLT, gx, 146, t, { dir: Math.cos(t * 0.4) > 0 ? 1 : -1, anda: true });
  // el carro, mirando al valle
  const cx = 214, cy = 160; T.letoGusano(R, cx, cy, t, { s: 1, dir: -1, mira: t > W.DUNCAN ? [130, 140] : [40, 100], habla: t > W.FRIEND && Math.sin(t * 9) > 0 });
  // Duncan llega y se queda a su lado
  const ll = tramo(t, W.P11 - 0.2, W.DUNCAN), dx = ri(lerp(-14, 132, ease(ll)));
  R.actor(LT.duncanLT, dx, 164, t, { dir: 1, anda: ll > 0 && ll < 1, habla: t > W.DUNCAN + 0.3 && t < W.FATHERS - 0.2, sonrisa: t > W.FATHERS });
  // el recuerdo: Paul, de luz, junto a Duncan
  const rec = tramo(t, W.FATHERS - 0.3, W.FATHERS + 0.4) * (1 - tramo(t, W.FRIEND + 0.4, W.FRIEND + 1.1)); if (rec > 0 && !o.sinPaul) { R.halo(116, 148, 22, [H('#8a6a7a'), H('#e8f4ff')], 0.6 * rec); fantasma(PA.paulCiego, 106, 166, t, { dir: 1, sonrisa: true }, 0.95 * rec, H('#d8ecff'), 0.62);
  for (let k = 0; k < 6; k++) { const f = (t * 0.7 + k / 6) % 1; mezP(104 + hh(k, 1) * 24, 166 - f * 34, H('#ffffff'), 0.8 * rec * (1 - f)); } }
};
'''
DIOS += r'''
// ══ 12 · LAS CUBAS (fondo local): una sala bajo tierra con tres cubas de cristal ámbar numeradas 17, 18 y 19; en «brings
//    back to life» se vacía la primera y sale Duncan; en «copy» y «another» brillan las otras dos con su silueta dentro; el
//    gusano mira desde la derecha; en «family» el Duncan nuevo mira el retrato de familia y sonríe ══
const fondo12 = () => horno('fondo12', () => {
  for (let y = 0; y < 136; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 8), xx = x + (f & 1) * 8; let v = 2.2 + (hh(xx >> 4, f, 12) - 0.5) * 0.8 + (hh(x, y, 13) - 0.5) * 0.4 - y / 300;
    if (y % 8 === 0 || xx % 16 === 0) v -= 1; R.pset(x, y, tono(pal('#141e22', '#1e2a2e', '#2a3a3c', '#3a4c4a', '#4e605a'), v, x, y)); }
  // tuberías por la pared y el techo
  for (const y of [14, 20]) { R.rect(0, y, 260, y + 3, H('#3a4a48')); R.rect(0, y, 260, y, H('#7a8a84')); for (let x = 10; x < 260; x += 40) R.rect(x, y - 1, x + 3, y + 4, H('#5a6a64')); }
  for (const x of [26, 96, 166]) { R.rect(x + 22, 20, x + 25, 46, H('#3a4a48')); R.rect(x + 22, 20, x + 22, 46, H('#7a8a84')); R.disco(x + 23, 30, 3, H('#a83a2a')); R.pset(x + 22, 29, H('#e86a5a')); }
  // el retrato de familia en la pared de la derecha (Paul, Jessica y Duncan joven)
  R.rect(226, 48, 300, 92, H('#5a3a1a')); R.rect(228, 50, 298, 90, H('#c8963a')); R.rect(231, 53, 295, 87, H('#4a5a6a')); for (let y = 53; y < 88; y++) for (let x = 231; x < 296; x++) if (hh(x, y, 14) > 0.7) R.pset(x, y, H('#5a6a78'));
  const cabezaR = (x, pelo, ropa) => { R.rect(x - 7, 74, x + 7, 87, ropa); R.rect(x - 7, 74, x - 6, 87, mez(ropa, H('#ffffff'), 0.2)); R.disco(x, 66, 6, H('#e8b890')); R.rect(x - 6, 59, x + 6, 63, pelo); R.pset(x - 6, 64, pelo); R.pset(x + 6, 64, pelo); R.pset(x - 2, 66, K); R.pset(x + 2, 66, K); R.pset(x - 1, 69, H('#a05a4a')); R.pset(x, 69, H('#a05a4a')); R.pset(x + 1, 69, H('#a05a4a')); };
  cabezaR(244, H('#2a1a14'), H('#2a4a3a')); cabezaR(263, H('#a8642a'), H('#5a3a6a')); cabezaR(282, H('#1a1418'), H('#3a3a5a')); R.rect(259, 56, 268, 58, H('#c87a3a'));
  // el suelo con rejillas
  for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 2 + (hh(x >> 2, y >> 2, 15) - 0.5) * 0.6 + (y - 136) * 0.015; if ((x % 12 === 0) || ((y - 136) % 6 === 0)) v -= 0.8; R.pset(x, y, tono(pal('#141c1e', '#222c2e', '#323e3e', '#465450'), v, x, y)); }
  // las peanas de las cubas
  for (const x of [26, 96, 166]) { R.rect(x - 4, 130, x + 48, 146, H('#2a3432')); R.rect(x - 4, 130, x + 48, 131, H('#6a7a74')); R.rect(x - 4, 146, x + 48, 147, H('#0e1416')); for (let k = 0; k < 4; k++) R.pset(x + 4 + k * 12, 138, H('#4ae0a0')); }
});
const cuba = (x, t, nivel, luz, sil, abre, k) => { // x: borde izquierdo; 44 px de ancho, de y 48 a 130
  for (let y = 50; y < 130; y++) for (let i = 2; i < 42; i++) { const lleno = y > 130 - nivel * 80; const c = lleno ? tono(pal('#4a2a14', '#7a4a1a', '#a8702a', '#d8a040', '#f8d070'), 1.6 + luz * 1.6 + Math.sin(y * 0.2 + t * 2) * 0.3 - Math.abs(i - 22) / 22, x + i, y) : tono(pal('#1a2a2e', '#2a3e44', '#3e5660'), 1 + (i < 8 ? 1 : 0), x + i, y); R.pset(x + i, y, c); }
  if (sil > 0) { const c = mez(H('#3a2414'), H('#7a4a1a'), 1 - sil); R.disco(x + 22, 72, 5, c); R.rect(x + 16, 78, x + 28, 104, c); R.rect(x + 17, 104, x + 20, 118, c); R.rect(x + 24, 104, x + 27, 118, c); }
  for (let b = 0; b < 6; b++) { const f = (t * 0.5 + hh(b, k)) % 1, y = 128 - f * 78; if (y > 130 - nivel * 80) R.pset(x + 6 + ri(hh(b, k, 2) * 32 + Math.sin(t * 3 + b) * 2), ri(y), H('#ffe0a0')); }
  // el cristal (reflejo) y los aros; la puerta se desliza hacia arriba con «abre»
  R.rect(x + 2, 50 - ri(abre * 70), x + 3, 128 - ri(abre * 70), mez(H('#ffffff'), H('#a8c8d0'), 0.5)); R.rect(x + 38, 50, x + 38, 128, H('#c8e0e4'));
  R.rect(x, 44, x + 44, 50, H('#4a5a58')); R.rect(x, 44, x + 44, 45, H('#8a9a94')); R.rect(x, 128, x + 44, 131, H('#4a5a58'));
  if (luz > 0.5) R.halo(x + 22, 88, 30, [H('#2a2a20'), H('#f0c060')], (luz - 0.5) * 0.8);
};
const p12 = (t, o = {}) => {
  R.copiar(fondo12());
  // la primera cuba se vacía en «brings back» y se abre en «life»; las otras se encienden en «copy» y «another»
  const vac = tramo(t, W.BRINGS - 0.3, W.LIFE - 0.1), ab = ease(tramo(t, W.LIFE - 0.3, W.LIFE + 0.2));
  cuba(26, t, 0.9 * (1 - vac), 0.6 + vac * 0.4, vac < 0.9 ? 1 - vac : 0, ab, 1);
  cuba(96, t, 0.9, 0.4 + 0.6 * tramo(t, W.COPY - 0.2, W.COPY + 0.2), tramo(t, W.COPY - 0.2, W.COPY + 0.3), 0, 2);
  cuba(166, t, 0.9, 0.4 + 0.6 * tramo(t, W.ANOTHER - 0.2, W.ANOTHER + 0.2), tramo(t, W.ANOTHER - 0.2, W.ANOTHER + 0.3), 0, 3);
  [['17', 48], ['18', 118], ['19', 188]].forEach(([n, x], k) => { R.rect(x - 9, 33, x + 9, 43, H('#1a2422')); R.numero(n, x, 42, { centro: true, color: k === 0 && t > W.LIFE ? H('#ffe080') : H('#7ad8a8'), sombra: false }); });
  // el vapor que sale al abrir
  if (ab > 0) for (let k = 0; k < 10; k++) { const f = (t * 0.6 + k / 10) % 1; bola(48 + Math.sin(f * 6 + k) * 10, 120 - f * 60, ri(2 + f * 3), H('#e8e0c8'), 0.4 * (1 - f) * Math.min(1, ab * 2)); }
  // el gusano mira desde la derecha
  const fam = t > W.REMEMBERS - 0.2;
  T.letoGusano(R, 282, 168, t, { s: 0.75, dir: -1, mira: fam ? [260, 70] : t > W.LIFE ? [60, 140] : [120, 100], habla: t > W.BEAR && t < W.REMEMBERS && Math.sin(t * 9) > 0 });
  // Duncan sale de la cuba, da unos pasos, se mira las manos y en «family» va hacia el retrato
  if (t > W.LIFE - 0.1) { const pa = tramo(t, W.LIFE + 0.2, W.ANOTHER), va = tramo(t, W.REMEMBERS - 0.8, W.FAMILY + 0.3), dx = ri(lerp(lerp(40, 66, ease(pa)), 196, ease(va))), dy = ri(lerp(130, 160, ease(pa)));
    R.actor(LT.duncanLT, dx, dy, t, { dir: va > 0 && va < 1 ? 1 : t > W.FAMILY ? 1 : -1, anda: (pa > 0 && pa < 1) || (va > 0 && va < 1), sorpresa: t > W.LIFE && t < W.COPY + 0.4, dedo: t > W.BEAR - 0.6 && t < W.REMEMBERS - 0.8, sonrisa: t > W.FAMILY }); }
  if (t > W.FAMILY - 0.2) R.halo(263, 72, 34, [H('#2a3a3c'), H('#ffe0a0')], 0.35 * tramo(t, W.FAMILY - 0.2, W.FAMILY + 0.4));
};

// ══ 13 · LA CÁMARA DEL DIARIO (imperio diario/general): de noche Leto dicta a la máquina; en «enormous journal» Atom
//    intenta levantar el diario: tira, lo despega un poco, y se le cae con polvo; Leto le mira ══
const p13 = (t, o = {}) => {
  const oo = { encuadre: 'diario', libro: false, dicta: t > W.DICTATES - 0.2 }; const d = T.imperio(R, t, oo); const [cx, cy] = d.carro ?? [95, 145];
  const coge = W.ENORMJ, cae = W.JOURNAL + 0.75, mira = t > cae - 0.1 && t < cae + 1.2;
  T.letoGusano(R, cx, cy, t, { s: 1, dir: 1, mira: mira ? [214, 130] : [166, 80], habla: t > W.DICTATES && !mira && voz(t) > 0.3 });
  // Atom llega por la derecha (delante de la mesa, en x 268–290) y tira del libro
  const ll = tramo(t, W.MACHINES - 1.0, coge - 0.1), ax = ri(lerp(334, 272, ease(ll)));
  const tira = tramo(t, coge, cae), lev = t > coge && t < cae ? Math.min(10, tira * 16) + Math.sin(t * 30) * 1.5 * (tira > 0.2 ? 1 : 0) : 0, golpe = t > cae && t < cae + 0.15 ? -1 : 0;
  if (!o.sinAtom) atom(ax, 158, t, { s: 2, dir: -1, pose: ll > 0 && ll < 1 ? 'camina' : t > coge && t < cae ? 'brazos' : t > cae + 0.8 ? 'piensa' : 'quieto', cara: t > coge + 0.3 && t < cae + 1.1 ? 'sorpresa' : 'normal', habla: 0 });
  T.imperioDelante(R, t, oo);
  const [lx, ly] = d.libro ?? [230, 131];
  T.d2_libro(R, lx, ly + 11 - ri(o.sinAtom ? 0 : lev) - golpe, { inclina: o.sinAtom ? 0 : (t > coge && t < cae ? 0.25 + Math.sin(t * 24) * 0.1 : 0) });
  if (!o.sinAtom && t > coge + 0.3 && t < cae) { sudor(ax + 6, 114, t); for (let k = 0; k < 3; k++) if (Math.sin(t * 20 + k) > 0) R.linea(lx + 28 + k * 2, ly - 14 + k * 5, lx + 31 + k * 2, ly - 15 + k * 5, H('#ffffff')); }

  if (!o.sinAtom && t > cae && t < cae + 1.3) R.icono('!', ax + 4, 106 + flota(t), H('#ffe060'), true, 2);

  if (!o.sinAtom && t > cae && t < cae + 0.9) { const f = tramo(t, cae, cae + 0.9); for (let k = 0; k < 12; k++) bola(lx - 26 + k * 4.5, ly + 9 - f * 6 - hh(k, 1) * 4, ri(1 + f * 2), H('#c8b8a8'), 0.6 * (1 - f)); }
};

// ══ 14 · MIL AÑOS DESPUÉS (fondo local): unas ruinas comidas por el bosque, un haz de sol; una exploradora con su farol
//    encuentra el diario en su pedestal; «1000»; en «in it» lo abre y sube la luz; en «proud tyrant» aparece la figura
//    de un gusano con corona... y en «tyrant» la tacha una «X» ══
const fondo14 = () => horno('fondo14', () => {
  // el bosque del fondo: luz verde dorada entre los árboles, dos capas de copas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 4.2 - y / 40 + (vn(x, y, 14, 21) - 0.5) * 1.2 + Math.max(0, 1 - Math.abs(x - 150) / 90) * 0.8; R.pset(x, y, tono(pal('#1e3a26', '#2e5232', '#46703e', '#6a8e4e', '#9ab468', '#d0d890'), v, x, y)); }
  for (let k = 0; k < 16; k++) { const x = k * 22 + ri(hh(k, 1, 22) * 10), h = 50 + ri(hh(k, 2, 22) * 40); if (k % 2) abeto(x, 150, h, k, BOSQF); else arbol(x, 150, h, k, 0, BOSQF); }
  for (let k = 0; k < 12; k++) { const x = k * 28 + ri(hh(k, 3, 22) * 12), h = 40 + ri(hh(k, 4, 22) * 22); arbol(x, 152, h, k + 30, 0, pal('#2e4a36', '#3e5e40', '#527448', '#6a8a52', '#88a460')); }

  // muros rotos de sillares con musgo (bordes de arriba mellados)
  const sillar = (x0, y0, x1, y1, k) => { for (let x = x0; x <= x1; x++) { const top = y0 + ri(vn(x, 0, 5, k) * 14 * (x - x0 > 3 && x1 - x > 3 ? 1 : 0.3)); for (let y = top; y <= y1; y++) { const f = Math.floor(y / 7), xx = x + (f & 1) * 7; let v = 2.6 + (hh(xx >> 3, f, k) - 0.5) * 0.9 - (x - x0) / (x1 - x0 + 1) * 0.7 + (y - top < 2 ? 0.9 : 0);
    if (y % 7 === 0 || xx % 14 === 0) v -= 1.1; const musgo = vn(x, y, 4, k + 5) > 0.68 - (y - top) * 0.002 || (y - top < 3 && hh(x, k) > 0.4); R.pset(x, y, musgo ? tono(BOSQ, 3.5 + hh(x, y) * 2, x, y) : tono(pal('#3a3436', '#5a504c', '#7a6c62', '#968676', '#b0a08a', '#cabaa0'), v, x, y)); } } };
  sillar(0, 26, 58, 152, 1); sillar(252, 60, 319, 152, 2);
  // el arco: medio arco que nace del muro izquierdo y se rompe en el aire, con dovelas
  for (let a = 0; a < 70; a++) { const an = Math.PI - a / 100 * Math.PI, cx = 150, cy = 100, r0 = 92, r1 = 104; for (let r = r0; r <= r1; r++) { const x = ri(cx + Math.cos(an) * r), y = ri(cy - Math.sin(an) * r * 0.75); if (!libreAtom(x, y)) continue;
    R.pset(x, y, tono(pal('#4a4040', '#6a5e56', '#8a7c6a', '#a89880', '#c4b49a'), 2.6 + (r - r0) / 12 - (a % 7 === 0 ? 1.5 : 0) + (hh(a, r) - 0.5) * 0.6, x, y)); } }
  // columnas rotas (fustes acanalados) y tambores caídos
  for (const [x, top] of [[96, 84], [222, 100]]) { for (let y = top; y < 152; y++) for (let i = -7; i <= 7; i++) { const tt = y === top + ri(Math.sin(i) * 2); R.pset(x + i, y, tono(pal('#4a4442', '#6e6460', '#948a7e', '#b8ac98', '#d4c8b0'), 3 - Math.abs(i + 2) / 4 + (i % 3 === 0 ? -0.8 : 0) + (tt ? 1 : 0) + (vn(x + i, y, 3, x) > 0.7 ? -1 : 0), x + i, y)); }
    R.rect(x - 9, 150, x + 9, 153, H('#6a6058')); }
  for (const [x, y] of [[120, 160], [246, 164], [62, 166]]) { for (let j = -6; j <= 6; j++) for (let i = -9; i <= 9; i++) if ((i / 9) ** 2 + (j / 6) ** 2 <= 1) R.pset(x + i, y + j, tono(pal('#4a4442', '#6e6460', '#948a7e', '#b8ac98'), 2.4 - j / 6 - i / 18 + (hh(i, j, x) - 0.5) * 0.5, x + i, y + j)); copa(x - 4, y - 6, 3, BOSQ, x); }
  // el haz de sol que entra por la bóveda rota
  R.poligono([[110, 0], [168, 0], [200, 152], [118, 152]], (x, y) => mez(R.pget(x, y), H('#fff4c0'), ((x + y) & 1) ? 0.24 : 0.12));
  // el suelo de losas rotas con hierba, helechos y raíces
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const fy = Math.floor((y - 152) / 5), fx = Math.floor((x + (fy & 1) * 9) / 18); let v = 2.2 + (hh(fx, fy, 22) - 0.5) * 1.1 + (hh(x, y) - 0.5) * 0.4; const junta = (y - 152) % 5 === 0 || (x + (fy & 1) * 9) % 18 === 0;
    const g = junta || vn(x, y, 6, 23) > 0.62; R.pset(x, y, g ? tono(VER1[2], 2.2 + hh(x, y, 24) * 2.4, x, y) : tono(pal('#4a4440', '#6a6058', '#8a7e70', '#a89a86'), v, x, y)); }
  for (let k = 0; k < 18; k++) { const x = ri(hh(k, 5, 25) * 320), y = 160 + ri(hh(k, 6, 25) * 18); for (let i = -4; i <= 4; i++) R.linea(x, y, x + i * 2, y - 6 + Math.abs(i), H('#4a8a3a')); }
  // el pedestal del diario
  for (let y = 126; y < 153; y++) for (let x = 148; x <= 176; x++) R.pset(x, y, tono(pal('#4a4442', '#6e6460', '#948a7e', '#b8ac98'), 2.6 - (x - 148) / 20 + (y < 128 ? 1 : 0) + (hh(x, y) - 0.5) * 0.4, x, y));
  R.rect(144, 122, 180, 126, H('#8a7e70')); R.rect(144, 122, 180, 122, H('#d0c4b0')); R.rect(144, 126, 180, 126, H('#4a4442'));
  // hiedra colgando del arco y del muro
  for (let k = 0; k < 12; k++) { const x = 6 + k * 22 + ri(hh(k, 1) * 8), y0 = k < 3 ? 40 : 34 + ri(hh(k, 3) * 20), L = 10 + ri(hh(k, 2) * 30); if (x > 250) continue; for (let j = 0; j < L; j++) if (libreAtom(x, y0 + j)) R.pset(x + ri(Math.sin(j * 0.5 + k)), y0 + j, j % 3 ? H('#2a5a2a') : H('#6aaa4a')); }
});
const p14 = (t, o = {}) => {
  R.copiar(fondo14());
  // motas de polvo en el haz
  for (let k = 0; k < 16; k++) { const f = (t * 0.05 + hh(k, 1)) % 1; mezP(130 + hh(k, 2) * 50 + f * 20 + Math.sin(t + k) * 3, 10 + f * 140, H('#fff8d0'), 0.6); }
  // un pájaro entra por la bóveda
  pajaro(((t * 20) % 220) + 60, 30 + Math.sin(t * 2) * 6, t, H('#1a1a1a'));
  const ab = tramo(t, W.INIT - 0.2, W.INIT + 0.4);
  // el diario en el pedestal, cerrado o abierto
  if (ab < 0.5) T.d2_libro(R, 162, 122, { s: 0.55 });
  else { R.rect(146, 114, 178, 122, H('#3a1a3a')); R.rect(147, 113, 161, 120, H('#f0e4c8')); R.rect(163, 113, 177, 120, H('#e8dcc0')); R.linea(162, 113, 162, 121, H('#8a7a6a')); for (let j = 115; j < 120; j += 2) { R.linea(149, j, 159, j, H('#b8a890')); R.linea(165, j, 175, j, H('#b8a890')); } }
  if (ab > 0.4) R.halo(162, 108, 30, [H('#2a3a2a'), H('#fff0b0')], 0.6 * ab);
  // la exploradora llega con su farol
  const ll = tramo(t, W.P14 - 0.2, W.INIT - 0.5), ex = ri(lerp(30, 124, ease(ll)));
  const e = R.actor(LT.ciudadanaLT, ex, 158, t, { dir: 1, anda: ll > 0 && ll < 1, sostiene: true, sorpresa: t > W.INIT && t < W.PROUD, triste: t > W.TYRANT + 0.3 });
  if (e?.mano) { const [mx, my] = e.mano; R.rect(mx - 2, my - 1, mx + 2, my + 5, H('#3a2a20')); R.rect(mx - 1, my, mx + 1, my + 4, Math.sin(t * 9) > -0.6 ? H('#ffd070') : H('#e8a040')); R.halo(mx, my + 2, 10, [H('#2a3a2a'), H('#ffd070')], 0.35); }
  // el «1000»: los años que han pasado
  if (t > W.THOUSAND - 0.1) { const b = ri(Math.sin(tramo(t, W.THOUSAND, W.THOUSAND + 0.4) * Math.PI) * 2); R.rect(204, 22 - b, 270, 42 - b, K); R.rect(205, 23 - b, 269, 41 - b, H('#2a1a2e')); R.numero('1000', 237, 39 - b, { tam: 16, centro: true }); }
  // la figura que sale del libro: un gusano con corona, y la «X»
  const fi = tramo(t, W.PROUD - 0.3, W.PROUD + 0.3); if (fi > 0) { const y0 = ri(88 - fi * 10);
    R.halo(162, y0 - 4, 26, [H('#2a3a2a'), H('#e8d8ff')], 0.4 * fi);
    for (let i = 0; i < 40; i++) { const x = 142 + i, r = i > 32 ? 7 : 4 + Math.sin(i * 0.25) * 1.5, y = y0 + ri(Math.sin(i * 0.22) * 4) - (i > 32 ? 4 : 0); for (let j = -r; j <= r; j++) mezP(x, y + j, i > 33 && Math.abs(j) < 3 ? H('#fff0d0') : (i % 5 === 0 ? H('#9a80d0') : H('#c8b0f8')), 0.85 * fi); }
    R.icono('corona', 170, y0 - 22, H('#ffd040'), true, 2); }
  if (t > W.TYRANT + 0.1) { const u = tramo(t, W.TYRANT + 0.1, W.TYRANT + 0.3); R.icono('X', 146, 70, H('#e83a3a'), true, u > 0.5 ? 4 : 3); }
};

// ══ 15 · LA CIUDAD AL ANOCHECER (fondo local): la torre rosada de la Ciudadela contra el ocaso, y en su balcón alto el
//    gusano asomado que mira la ciudad; abajo, tres vecinos le miran; en «everyone hates him» se dan la vuelta, uno
//    refunfuña y las contraventanas de las casas se cierran una a una ══
const CIELO15 = pal('#2a2050', '#46306a', '#6e3e74', '#a2506e', '#d8705e', '#f4a060', '#fcd080');
const fondo15 = () => horno('fondo15', () => {
  pintaCielo(CIELO15, 0, 104, [76, 98, 8], 15);
  for (let s = 0; s < 24; s++) { const x = ri(hh(s, 1, 15) * 319), y = ri(hh(s, 2, 15) * 30) + 20; if (libreAtom(x, y)) R.pset(x, y, H('#c8b8e8')); }
  pintaCapa({ y: 100, amp: 5, f: 0.03, ph: 1, v: 1.6, luz: 0.5, cols: pal('#2a1e34', '#3a2840', '#4e3448', '#644250'), k: 16, copas: true });
  // la torre de la Ciudadela, oscura, con su única ventana encendida (almenas, saeteras apagadas y un tejado cónico)
  R.poligono([[178, 32], [206, 8 + 14], [234, 32]], (x, y) => tono(pal('#1e1428', '#2e1e36', '#422a44'), 2 - (x - 178) / 40 + (y % 3 === 0 ? -0.5 : 0), x, y));
  for (let y = 30; y < 140; y++) for (let x = 176; x < 236; x++) { const w = y < 44 ? ri((y - 30) * 1.5) : 30; if (Math.abs(x - 206) > w) continue; const f = Math.floor(y / 6), xx = x + (f & 1) * 5;
    let v = 3.2 - (x - 176) / 60 * 2 + (hh(xx >> 2, f, 17) - 0.5) * 0.5; if (y % 6 === 0 || xx % 10 === 0) v -= 0.8; R.pset(x, y, tono(pal('#2a1a2a', '#4a2a38', '#6a3a46', '#8a5052', '#b06a62', '#d08a72'), v, x, y)); }
  for (let y = 136; y < 146; y++) for (let x = 150; x < 262; x++) R.pset(x, y, tono(pal('#1a1424', '#261c30', '#34263c'), 1.4 + hh(x, y) * 0.6, x, y));
  for (let x = 176; x < 236; x += 6) R.rect(x, 28, x + 3, 32, H('#34263c'));
  for (const [x, y] of [[186, 84], [222, 84], [204, 104], [186, 118], [222, 118]]) { R.rect(x, y, x + 2, y + 6, H('#0e0a14')); R.pset(x + 1, y - 1, H('#46324a')); }
  for (let y = 38; y < 136; y += 14) { R.rect(176, y, 236, y, H('#46324a')); }
  // los muros bajos de la Ciudadela a los lados de la torre, con almenas
  for (let x = 150; x < 262; x++) { if (x > 176 && x < 236) continue; for (let y = 112; y < 136; y++) R.pset(x, y, tono(pal('#1a1424', '#261c30', '#34263c', '#46324a'), 1.8 - Math.abs(x - 206) / 80 + (y % 6 === 0 ? -0.6 : 0) + (hh(x >> 2, y >> 1, 18) - 0.5) * 0.5, x, y)); if ((x >> 2) & 1) R.rect(x, 108, x, 111, H('#2a1e34')); }

  // las casas iguales del pueblo, de noche
  for (let k = 0; k < 6; k++) { const x0 = -10 + k * 56; if (x0 > 140 && x0 < 250) continue; casa(x0, 150, 44, 24, 0, { luz: true }); for (let y = 100; y <= 150; y++) for (let x = x0 - 3; x <= x0 + 47; x++) if (R.pget(x, y)) R.pset(x, y, mez(R.pget(x, y), H('#5a2a4a'), 0.3)); }
  // la calle
  adoquin(150, 179, pal('#2a1e2a', '#3a2a36', '#4e3a44', '#664c52', '#7e6062'), 15);

});
const p15 = (t, o = {}) => {
  R.copiar(fondo15());
  // la ventana de la torre y la carita del gusano dentro
  // el balcón alto de la torre: arco encendido y, asomado, el gusano (su capuchón y su cara) que mira la ciudad
  R.rect(194, 50, 218, 78, H('#120c18')); for (let y = 51; y < 78; y++) for (let x = 195; x < 218; x++) if (y > 58 || Math.hypot(x - 206, (y - 58) * 1.2) < 11) R.pset(x, y, H('#f0b060'));
  R.halo(206, 66, 24, [H('#2a1a2a'), H('#f0a050')], 0.35 + Math.sin(t * 3) * 0.05);
  const asoma = t > W.EVERYONE ? -1 : 0; R.disco(206, 68 - asoma, 7, H('#8a8478')); R.disco(205, 67 - asoma, 5, H('#b8b2a4')); R.disco(206, 69 - asoma, 3, H('#e0b890')); R.pset(205, 68 - asoma, H('#2a4a8a')); R.pset(207, 68 - asoma, H('#2a4a8a'));
  R.rect(192, 76, 220, 79, H('#6a4a46')); R.rect(192, 76, 220, 76, H('#b08070')); for (let x = 194; x < 220; x += 4) R.rect(x, 79, x + 1, 84, H('#4a3036'));
  // nubes de noche y murciélagos
  nubes(t, [[20, 56, 60, 2], [220, 70, 44, 1.2], [120, 40, 50, 1.6], [280, 60, 36, 2.6]], [pal('#4a2a5a', '#a0506a', '#f0a080'), pal('#3a2450', '#8a4466', '#e08a7a')], 15);
  for (let k = 0; k < 2; k++) pajaro(206 + Math.cos(t * 1.4 + k * 3) * 30, 34 + Math.sin(t * 2.1 + k) * 8, t, H('#000000'), k);
  // las ventanas de las casas se cierran una a una en «hates»
  const casas = [-10, 46, 102, 270];
  casas.forEach((x0, k) => [[x0 + 5, 150 - 24 + 6], [x0 + 44 - 13, 150 - 24 + 6]].forEach(([wx, wy], q) => { const tc = W.HATES + (k * 2 + q) * 0.12; if (t > tc) { R.rect(wx, wy, wx + 7, wy + 6, H('#2a3a3a')); R.linea(wx + 3, wy, wx + 3, wy + 6, H('#1a2424')); } }));
  // la patrulla con su farol cruza al fondo
  const px = ri(((t * 10) % 360) - 20); T.d2_habladora(R, px, 150, t, { alto: 12, dir: 1, anda: true, baston: true }); R.halo(px + 4, 140, 7, [H('#1a1424'), H('#ffc060')], 0.4);
  // los vecinos: miran la ventana; en «everyone hates him» se dan la vuelta
  const vuelta = (k) => t > W.EVERYONE + k * 0.2;
  R.actor(LT.ciudadanoLT, 104, 172, t, { dir: vuelta(0) ? -1 : 1, enfado: vuelta(0), dedo: t > W.HATES && t < W.HATES + 1, triste: !vuelta(0) && t > W.ALONE });
  R.actor(LT.ciudadanaLT, 132, 176, t, { dir: vuelta(1) ? -1 : 1, enfado: vuelta(1), sorpresa: !vuelta(1) && t > W.ALONE && t < W.ALONE + 0.8 });
  R.actor(LT.ciudadanoLT, 252, 174, t, { dir: vuelta(2) ? 1 : -1, anda: vuelta(2), enfado: vuelta(2) });
};

// ══ 16 · LA VENTANA (imperio diario/ventana): Leto solo, de cara al Arrakis verde de noche; en «right» asiente; en «no one»
//    se vuelve hacia la sala vacía; en «share» baja la mirada. La polilla del aplique se va ══
const p16 = (t, o = {}) => {
  const oo = { encuadre: 'diario', camara: 'ventana' }; const d = T.imperio(R, t, oo); const [cx, cy] = d.carro ?? [246, 148];
  const asiente = t > W.RIGHT && t < W.RIGHT + 0.6 ? 2 : 0;
  T.letoGusano(R, cx, cy, t, { s: 1, dir: d.carroDir ?? -1, mira: t > W.SHARE ? [200, 178] : t > W.NOONE ? [306, 120] : [112, 40 + asiente * 6], habla: t > W.RIGHT - 0.2 && t < W.RIGHT + 0.4 && Math.sin(t * 9) > 0 });
  T.imperioDelante(R, t, oo);
  // la polilla junto al aplique; en «no one» se va volando
  const va = tramo(t, W.NOONE, W.NOONE + 2), px = 296 + Math.cos(t * 5) * 5 * (1 - va) - va * 120, py = 70 + Math.sin(t * 7) * 4 - va * 10;
  if (!o.quieto && va < 1) { ps(px, py, H('#e8e0c8')); ps(px + (Math.sin(t * 30) > 0 ? 1 : -1), py - 1, H('#c8c0a8')); }
};

const efectosD = [[W.THREE, 'whoosh'], [W.BARELY, 'rafaga'], [W.HUMAN + 0.1, 'brillo'], [W.P2 + 0.2, 'pasos'], [W.FACE, 'pop'], [W.HANDS, 'pop'],
  [W.CART - 0.6, 'carro'], [W.SPICE + 0.3, 'masca'], [W.P4 + 0.1, 'lluvia'], [W.RAIN, 'chof'], [W.SAREER - 0.4, 'viento'], [W.REMEMBER, 'brillo'],
  [W.IMAGINE - 0.1, 'puerta'], [W.EMPIRE, 'pajaros'], [W.WARS - 0.1, 'pajaros'], [W.TRAVEL, 'cerrojo'], [W.KEEPSALL, 'cerrojo'], [W.DROP + 0.1, 'pop'],
  [W.CORNER, 'pasos'], [W.FISH, 'campana'], [W.GOD, 'campana'], [W.PEACE, 'pajaros'], [W.SIDE, 'pasos'], [W.FATHERS, 'brillo'],
  [W.BRINGS, 'burbujas'], [W.LIFE - 0.2, 'vapor'], [W.FAMILY, 'brillo'], [W.DICTATES, 'maquina'], [W.JOURNAL + 0.75, 'golpecito'],
  [W.THOUSAND, 'whoosh'], [W.INIT, 'papel'], [W.TYRANT + 0.1, 'pop'], [W.HATES + 0.1, 'puerta'], [W.NOONE, 'viento']];
'''

DIOS_ROD = r'''
T.rodar(E, R, [[0, p1], [W.P2, p2], [W.P3, p3], [W.P4, p4], [W.P5, p5], [W.P6, p6], [W.P7, p7], [W.P8, p8], [W.P9, p9], [W.P10, p10], [W.P11, p11], [W.P12, p12], [W.P13, p13], [W.P14, p14], [W.P15, p15], [W.P16, p16]],
  { efectos: efectosD, año: (t) => (t < W.YEARS ? 22 : 3521) });
'''

# ──────────────────────────────────────────── LT-SOLEDAD (pausa) ────────────────────────────────────────────
SOLEDAD = r'''
const atomG = (x, s, t, o = {}) => AT.atom(R, ri(x), ri(s), t, { s: 2, habla: voz(t), ...o });
// los congelados de lt-dios (su instante, fijo, pintado una vez)
const fz16 = () => horno('fz16', () => p16(W.FIN - 1 / 30, { quieto: true }));
const fz13 = () => horno('fz13', () => p13(W.MACHINES, { sinAtom: true }));
const fz12 = () => horno('fz12', () => p12(W.FAMILY + 0.5));
const fz9 = () => horno('fz9', () => p9(W.FISH + 0.3));
const fz6 = () => horno('fz6', () => p6(W.EMPIRE + 1.2));
const fz10 = () => horno('fz10', () => p10(W.PEACE + 0.2));
const fz5 = () => horno('fz5', () => p5(W.SAREER + 0.6, { sinNino: true }));
const congela = (b) => { R.copiar(b()); AT.pausa(R, 1); };
const mesa = (x, y, t, s = 2) => T.pausa(R, x, y, t, { cual: 'mesa', s });
const cartelNum = (txt, cx, y, t, t0, ancho) => { const b = ri(Math.sin(tramo(t, t0, t0 + 0.4) * Math.PI) * 3), w = ancho ?? txt.length * 8 + 10;
  R.halo(cx, y - 8 - b, w * 0.7, [H('#3a3a4a'), H('#ffe8a0')], 0.35); R.rect(cx - w, y - 22 - b, cx + w, y + 4 - b, K); R.rect(cx - w + 1, y - 21 - b, cx + w - 1, y + 3 - b, H('#2a1a2e'));
  R.rect(cx - w + 1, y - 21 - b, cx + w - 1, y - 21 - b, H('#c8963a')); R.rect(cx - w + 1, y + 3 - b, cx + w - 1, y + 3 - b, H('#7a5a2a')); R.numero(txt, cx, y - b, { tam: 16, centro: true }); };
// una hoja de estudio (sin letras: rayas y una gráfica)
const hoja = (x, y, k) => { x = ri(x); y = ri(y); R.rect(x, y, x + 13, y + 9, H('#5a5a6a')); R.rect(x + 1, y + 1, x + 12, y + 8, H('#fbf6e8')); R.linea(x + 2, y + 3, x + 10, y + 3, H('#a8a8b8')); R.linea(x + 2, y + 5, x + 8, y + 5, H('#a8a8b8'));
  R.rect(x + 9, y + 6 - (k % 3), x + 10, y + 7, [H('#d84a4a'), H('#3a8ad8'), H('#4ab06a')][k % 3]); };

// ── 1 · la ventana congelada: Atom (al doble) entra, señala en «notice»; en «2015» sale el año ──
const q1 = (t) => {
  R.copiar(fz16()); AT.pausa(R, tramo(t, 0, 0.35));
  const an = tramo(t, 0.2, 1.6), x = lerp(-30, 92, ease(an));
  atomG(x, 176, t, { dir: 1, pose: an < 1 ? 'camina' : t > WS.Y2015 - 0.3 ? 'senala' : 'quieto', cara: t > WS.Y2015 ? 'sonrisa' : 'normal' });
  if (t > WS.Y2015 - 0.1) { cartelNum('2015', 150, 66, t, WS.Y2015); AT.anillo(R, 150, 58, 46, 20, t, tramo(t, WS.Y2015, WS.Y2015 + 0.8)); }
};
// ── 2 · el diario congelado: vuelan hojas de estudios y se apilan; en «dozens», el «70» ──
const q2 = (t) => {
  congela(fz13);
  const n = 16;
  for (let k = 0; k < n; k++) { const t0 = WS.JULIANNE + k * 0.2, u = tramo(t, t0, t0 + 0.6); if (u <= 0) continue; const de = k % 2 ? [330, 30 + k * 4] : [-20, 50 + k * 3], a = [168 + (k % 3) - 1, 162 - k * 3];
    hoja(lerp(de[0], a[0], ease(u)), lerp(de[1], a[1], ease(u)) - Math.sin(u * Math.PI) * 20, k); }
  atomG(260, 178, t, { dir: -1, pose: t > WS.DOZENS - 0.3 ? 'senala' : 'brazos', cara: t > WS.DOZENS ? 'sonrisa' : 'sorpresa' });
  if (t > WS.DOZENS - 0.1) cartelNum('70', 176, 80, t, WS.DOZENS);
};
// ── 3 · las cubas congeladas: más de tres millones de personas (filas de gentecilla); en «loneliness» Atom saca la mesa ──
const q3 = (t) => {
  congela(fz12);
  const COL = pal('#d86a4a', '#4a8ad8', '#e8c040', '#5ab06a', '#b86ad8', '#e88aa0');
  // la gente: entra a oleadas y, en «loneliness», se aparta a los lados para dejar sitio a la mesa
  const ap = ease(tramo(t, WS.LONELY - 0.4, WS.LONELY + 0.5));
  for (let k = 0; k < 120; k++) { const fila = Math.floor(k / 20), col = k % 20, t0 = WS.MORE + (fila * 20 + col) * 0.012 + fila * 0.08; if (t < t0) continue;
    const x0 = 20 + col * 9 + (fila & 1) * 4, x = x0 + (col < 10 ? -1 : 1) * ap * (col < 10 ? 10 - col : col - 9) * 9; if (x < 2 || x > 318) continue; devoto(x, 84 + fila * 13 + flota(t, k) * 0.5, COL[(k * 7) % 6], 0, H('#f0c8a0')); }
  if (t > WS.MILLION - 0.1) cartelNum('3000000', 110, 66, t, WS.MILLION);
  const sa = tramo(t, WS.LONELY - 0.2, WS.LONELY + 0.5);
  if (sa > 0) { const m = mesa(112, ri(170 + (1 - ease(sa)) * 50), t, 1.6); const p = m?.punto ?? [70, 140]; AT.anillo(R, p[0], p[1], 14, 12, t, tramo(t, WS.ISOLATION - 0.2, WS.ISOLATION + 0.6)); }
  atomG(250, 180, t, { dir: -1, pose: sa > 0 && sa < 1 ? 'brazos' : t > WS.ISOLATION ? 'senala' : 'quieto', cara: t > WS.LONELY ? 'triste' : t > WS.MILLION ? 'sorpresa' : 'normal' });
};
// ── 4 · la esquina congelada: la mesa grande; en «risk» una flecha que sube junto a la silla sola; en «early», el reloj ──
const q4 = (t) => {
  congela(fz9);
  const m = mesa(128, 172, t, 2), [px, py] = m?.punto ?? [80, 140];
  const sube = tramo(t, WS.RISK - 0.2, WS.DYING); if (sube > 0) { const x = px - 18, y0 = py + 8, y1 = ri(y0 - 34 * ease(sube)); for (let y = y1; y <= y0; y++) { R.rect(x - 1, y, x + 1, y, H('#e83a3a')); } R.poligono([[x - 5, y1 + 1], [x, y1 - 6], [x + 5, y1 + 1]], H('#e83a3a')); R.pset(x - 1, y1, H('#ff8a7a')); }
  if (t > WS.EARLY - 0.1) { R.icono('reloj', px - 30, py - 44 + flota(t), H('#ffe080'), true, 2); }
  if (t > WS.DYING) R.icono('!', px + 6, py - 40 + flota(t, 1), H('#e83a3a'), true, 2);
  atomG(268, 178, t, { dir: -1, pose: t > WS.RISK && t < WS.MUCH ? 'senala' : 'piensa', cara: t > WS.RISK ? 'triste' : 'normal' });
};
// ── 5 · la calle congelada: la silla sola «=» la torre de dulces (lo que más nos preocupa); en «far more» el «!» crece ──
const q5 = (t) => {
  congela(fz6);
  const m = mesa(84, 170, t, 1.3), [px, py] = m?.punto ?? [50, 140];
  const ig = tramo(t, WS.Q5 + 0.2, WS.Q5 + 0.6); if (ig > 0) { const w = ri(14 * ease(ig)); R.halo(160, 138, 20, [H('#3a3a4a'), H('#ffe8a0')], 0.4); for (const y of [128, 142]) { R.rect(160 - w - 1, y - 1, 160 + w + 1, y + 5, K); R.rect(160 - w, y, 160 + w, y + 3, H('#ffe080')); R.rect(160 - w, y + 3, 160 + w, y + 3, H('#a88a3a')); R.rect(160 - w, y, 160 + w, y, H('#fff8d0')); } }

  const to = tramo(t, WS.OBESITY - 1.6, WS.OBESITY - 0.9); if (to > 0) { const x = 206, y = ri(170 - 0 + (1 - ease(to)) * 30);
    R.rect(x - 16, y - 2, x + 16, y, H('#e8e0d0')); R.rect(x - 14, y, x + 14, y + 1, H('#a89888'));
    for (let k = 0; k < 5; k++) { const yy = y - 4 - k * 6; R.rect(x - 11, yy - 4, x + 11, yy, [H('#c87a3a'), H('#f0c8d8'), H('#8a5a2a'), H('#f0d070'), H('#d86a8a')][k]); R.rect(x - 11, yy - 4, x + 11, yy - 4, H('#ffffff')); R.pset(x - 6 + k * 3, yy - 2, H('#ffffff')); }
    R.rect(x - 1, y - 38, x + 1, y - 32, H('#d84a4a')); R.pset(x, y - 39, H('#ffe060'));
    const g = 1 + tramo(t, WS.FAR - 0.2, WS.FAR + 0.3); R.icono('!', x + 20, y - 48 + flota(t), H('#ffe060'), true, ri(g)); }
  if (t > WS.WORRY) R.icono('!', px - 2, py - 36 + flota(t, 2), H('#ffe060'), true, 1);
  atomG(286, 178, t, { dir: -1, pose: t > WS.OBESITY ? 'senala' : 'piensa', cara: t > WS.OBESITY ? 'sorpresa' : 'normal' });
};
// ── 6 · la Ciudadela congelada: «made to live in company» (los amigos de la mesa ríen); en «Leto» el gusano recobra el
//    color; en «power» una corona y un halo de oro ──
const q6 = (t) => {
  congela(fz10);
  const sa = tramo(t, WS.Q6 + 0.1, WS.Q6 + 0.6); if (sa > 0) mesa(86, ri(178 + (1 - ease(sa)) * 30), t, 1.4);
  const co = tramo(t, WS.LETO - 0.2, WS.LETO + 0.5); if (co > 0) { if (t > WS.POWER - 0.1) R.halo(176, 92, 60, [H('#4a4a5a'), H('#ffd860')], 0.45 * tramo(t, WS.POWER - 0.1, WS.POWER + 0.5));
    const lg = T.letoGusano(R, 160, 124, t, { s: 1, dir: -1, mira: [280, 150] }); if (t > WS.POWER) { const c = lg?.cara ?? [119, 75]; R.icono('corona', c[0] - 3, c[1] - 30 + flota(t), H('#ffd040'), true, 2); } }
  atomG(274, 178, t, { dir: -1, pose: t > WS.LETO - 0.2 ? 'senala' : 'quieto', cara: t > WS.COMPANY && t < WS.LETO ? 'sonrisa' : 'normal' });
};
// ── 7 · el Sareer congelado: el gusano pequeño a color; «3000» años; en «no one» un aro vacío a su alrededor; Atom triste ──
const q7 = (t) => {
  congela(fz5);
  const co = tramo(t, WS.Q7, WS.Q7 + 0.5); if (co > 0) T.letoGusano(R, 190, 134, t, { s: 0.5, dir: -1, mira: [118, 76] });
  if (t > WS.Y3000 - 0.1) cartelNum('3000', 222, 72, t, WS.Y3000);
  const ua = tramo(t, WS.NOONE - 0.2, WS.NOONE + 0.9); if (ua > 0) AT.anillo(R, 192, 120, 46, 18, t, ua);
  if (t > WS.UNDERSTAND) R.icono('?', 214, 98 + flota(t), H('#ffe080'), true, 2);
  atomG(70, 178, t, { dir: 1, pose: t < WS.NOONE ? 'senala' : 'quieto', cara: t > WS.NOONE ? 'triste' : 'normal' });
};
const efectos = [[0.3, 'pasos'], [WS.Y2015, 'pop'], [WS.PULLED, 'papel'], [WS.DOZENS, 'pop'], [WS.MILLION, 'aldea', { k: 1 }], [WS.LONELY, 'pop'],
  [WS.RISK, 'aviso'], [WS.OBESITY - 1.2, 'pop'], [WS.COMPANY, 'palmada'], [WS.LETO, 'brillo'], [WS.Y3000, 'tic']];
T.rodar(E, R, [[0, q1], [WS.Q2, q2], [WS.Q3, q3], [WS.Q4, q4], [WS.Q5, q5], [WS.Q6, q6], [WS.Q7, q7]], { efectos });
'''

CAB_D = '''// LT-DIOS (frases 20–22: «siglos», «paz», «diario»), año 3521 (22 hasta «years»). Dieciséis planos, cortados en la voz inglesa:
// 1. (0) el valle que reverdece (fondo local): el sol cruza deprisa, el contador sube a 3500 en «years»; en «barely human»
//    un remolino de arena se lleva a Leto niño y queda el gusano en su carro;
// 2. («he's») la audiencia (ciudadela/audiencia): Atom entra, se asombra en «enormous»; aros en «face» y en «hands»;
// 3. («who gets around») el camino del bosque (fondo local): el carro rueda con dos Habladoras; en «spice» la de delante
//    le alza un cuenco y come;
// 4. («Arrakis has changed») Arrakis verde (verde/general): Atom señala el río en «rivers»; GAG: en «rain» la gota del
//    alero le cae en la cabeza, salta, «!»;
// 5. («is one piece») el Sareer (verde/sareer): el gusano pequeño cruza la cresta, se para en «Sareer»; en «remember» el
//    niño que fue, de luz, a su lado;
// 6. («Now imagine») la calle de casas iguales (fondo local): en «imagine» se abre la puerta y sale el vecino; saluda a la
//    vecina que barre; en «empire» el estandarte;
// 7. («There are no wars») el puerto cerrado (fondo local): un pájaro se posa en el cañón en «wars»; en «travel» la
//    Habladora cierra la verja: «X»;
// 8. («because he keeps») el almacén (fondo local): la cámara se cierra en «keeps all»; en «drop» cae UNA gota en la taza;
// 9. («and on every corner») la esquina (fondo local): sale una Habladora en «corner», asoman más en «army of women» y
//    alzan la vara en «fish-speakers»; el vecino suda y acelera;
// 10. («who worship him») la Ciudadela (ciudadela/general): los peregrinos se postran en «worship»; palomas en «peace»;
//     Duncan al lado; el vecino de delante se ahoga en «breathe»;
// 11. («At his side») la terraza (fondo local): Duncan llega a su lado en «Duncan Idaho»; en «father's old friend» Paul,
//     de luz, junto a él;
// 12. («whom he brings») las cubas 17, 18, 19 (fondo local): sale Duncan en «life»; brillan las otras en «copy» y
//     «another»; en «family» va al retrato de familia;
// 13. (silencio antes de «And at night») la cámara del diario (diario/general): dicta en «dictates»; GAG: en «enormous
//     journal» Atom tira del diario, no puede, se le cae con polvo;
// 14. («a thousand years») las ruinas mil años después (fondo local): «1000»; la exploradora abre el diario en «in it»;
//     el gusano con corona en «proud» y la «X» en «tyrant»;
// 15. («but someone») la ciudad al anochecer (fondo local): el gusano asomado al balcón alto de la torre; en «everyone
//     hates him» los vecinos se dan la vuelta y se cierran las contraventanas;

// 16. («knows that he's right») la ventana (diario/ventana): asiente en «right», se vuelve a la sala vacía en «no one»,
//     baja la mirada en «share». (lo congela lt-soledad)'''

CAB_SOL = '''// LT-SOLEDAD (frase 23), LA PAUSA «fíjate» de la soledad, sin año. Siete planos sobre los congelados de lt-dios:
// 1. la ventana congelada (p16): Atom al doble entra y señala; en «2015» el año;
// 2. el diario congelado (p13): vuelan hojas de estudios y se apilan; «70» en «dozens»;
// 3. las cubas congeladas (p12): filas de gente diminuta, «3000000» en «million»; en «loneliness» Atom saca la mesa;
// 4. la esquina congelada (p9): T.pausa 'mesa' grande; flecha roja que sube en «risk», reloj en «early», «!»;
// 5. la calle congelada (p6): la silla sola «=» la torre de dulces; el «!» crece en «far more»;
// 6. la Ciudadela congelada (p10): los amigos de la mesa ríen en «company»; el gusano recobra el color en «Leto»; corona
//    en «power»;
// 7. el Sareer congelado (p5): el gusano a color, «3000», un aro vacío en «no one», «?» en «understand».'''

E['lt-dios'] = ('El dios emperador', CAB_D, tw(False) + COMUN + DIOS + DIOS_ROD)
E['lt-soledad'] = ('La soledad', CAB_SOL, tw(True) + tsol() + COMUN + DIOS + SOLEDAD)
