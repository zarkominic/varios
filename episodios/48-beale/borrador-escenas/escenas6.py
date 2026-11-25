# Borrador de escenas del ep48 (grupo S6): bl-hart, bl-friedman y bl-casi, con el movimiento ya hecho.
# Los instantes salen de las palabras de la voz inglesa (atomo/build/largo/ep48/linea.json), escritos como en('marca', f).
# bl-casi es la PAUSA «fíjate» (la técnica de ms-suenos del 47): congela planos de bl-friedman con las MISMAS funciones
# (COMPARTIDO), con los instantes de bl-friedman escritos como números (en bl-casi, M es el de la pausa).
# Fondos locales (pintados en la escena, con su búfer): H5 la bola de cristal, H7 las raíces, H8 el valle de noche;
# F2 la fachada de Washington, F3 el laboratorio de 1940, F4 el estudio de noche, F5 la carta, F6 la papelera, F8 el
# calendario de pared, F9 el taco del escritorio, F10 el tapete, F11 la oficina de 1970, F12 la lectora de fichas.
E = {}

MARCAS = {'medium': (1.5, 37.488), 'friedman': (1.5, 36.622), 'hammer': (37.022, 68.819), 'fijate3': (0.2, 31.151)}

# las palabras que mandan en bl-hart (corte de plano o acción), en segundos de la escena
TH = {
    'COPIES': 1.94, 'SURVIVED': 2.74, 'FEVER': 4.62, 'DAY': 5.98, 'AND1': 6.74, 'TWO': 6.94, 'BROTHERS': 8.82, 'CLAYTON': 9.16,
    'GEORGE': 9.96, 'HART': 10.24, 'WHO': 11.04, 'Y1898': 11.34, 'DESPERATE': 13.12, 'SPOT': 14.16, 'TURNED': 15.06,
    'HYPNOTIZED': 15.64, 'MEDIUM': 16.42, 'WHERE': 17.62, 'DIG': 17.96, 'CORTE5': 18.70, 'PICTURE': 19.46, 'SCENE': 20.22,
    'NIGHT': 22.18, 'WITH': 22.92, 'LANTERNS': 23.12, 'SHOVELS': 23.92, 'GOOSE': 24.58, 'MONTVALE': 25.34, 'MAN': 26.58,
    'TRANCE': 27.10, 'POINTING': 27.38, 'HOLLOW': 28.12, 'GROUND': 28.70, 'ROOTS': 29.80, 'OAK': 30.32, 'AND_WEEK': 31.08,
    'WEEK': 31.36, 'CLAYTON2': 31.94, 'CANT': 33.00, 'GO': 33.64, 'GOING': 34.30, 'SAME': 35.14, 'ALONE': 35.90, 'DYNAMITE': 36.68,
}
# las de bl-friedman
TF = {
    'EVEN': 1.50, 'CRACKED': 2.34, 'REAL': 2.64, 'LIVING': 3.86, 'FELL': 4.08, 'TRAP': 4.84, 'BECAUSE': 5.94, 'FRIEDMAN': 6.86,
    'MAN': 8.02, 'ARMY': 9.32, 'SERVICE': 10.26, 'N1930': 11.34, 'AND_WHOSE': 12.84, 'BROKE': 13.66, 'JAPAN': 14.22,
    'CIPHER': 15.72, 'BEFORE': 17.00, 'ENTERED': 17.82, 'WAR': 18.56, 'SPENT': 19.84, 'YEARS': 20.12, 'FREE': 20.98,
    'SHEETS': 22.46, 'AND_WHEN': 23.92, 'ADMITTED': 25.26, 'WRITING': 26.16, 'BEST': 27.60, 'COULD': 28.20, 'HAD': 29.22,
    'CONFESS': 29.60, 'BEATEN': 30.48, 'INSTEAD': 31.56, 'FORGETTING': 32.14, 'HE_PUT': 33.32, 'TRAINING': 34.36,
    'STUDENTS': 35.82, 'FRIEDMAN2': 37.02, 'JOKED': 38.38, 'MONDAYS': 39.14, 'WEDNESDAYS': 40.22, 'FRIDAYS': 40.96,
    'REAL2': 42.20, 'AND_TUE': 42.98, 'TUESDAYS': 43.30, 'THURSDAYS': 44.62, 'SATURDAYS': 45.28, 'HOAX': 46.70,
    'LIKE': 47.54, 'DECIDE': 49.34, 'WHICH': 49.82, 'BET': 50.64, 'AND_YET': 52.38, 'N1970': 53.54, 'CARL': 55.04,
    'COMPUTER': 56.22, 'SPERRY': 57.36, 'FED': 58.70, 'POWERFUL': 60.18, 'DAY': 61.72, 'AND_ANN': 62.42, 'ANNOUNCED': 62.66,
    'SHEETS2': 63.28, 'ONE': 63.66, 'THREE': 64.38, 'NOT': 64.96, 'DOODLES': 65.70, 'MESSAGE': 67.46, 'INSIDE': 67.90,
    'FIN': 69.03,
}
# las de bl-casi
TS = {
    'NOTICE': 0.30, 'BECAUSE': 1.10, 'NOBODY': 2.16, 'DIGGING': 2.98, 'IN': 5.12, 'N2009': 5.64, 'CAMBRIDGE': 8.00,
    'WATCHED': 8.40, 'BRAINS': 9.22, 'VOLUNTEERS': 9.82, 'PLAYING': 10.44, 'SLOT': 11.36, 'AND_SAW': 12.70, 'CLOSE': 14.36,
    'WITHOUT': 15.28, 'WINNING2': 15.58, 'BRAIN': 16.72, 'LIT': 17.42, 'MUCH': 17.82, 'REAL': 19.04, 'PRIZE': 19.28,
    'AND_AFTER': 20.32, 'KEEP': 21.96, 'MORE': 22.90, 'ONE': 24.32, 'CRACKED': 25.06, 'THREE': 25.80, 'EXACTLY': 26.36,
    'NEAR': 27.58, 'AND_A': 28.56, 'PUSHES': 29.16, 'HARDER': 30.00, 'NO': 30.74,
}


def marca_f(s):
    return 'friedman' if s < MARCAS['hammer'][0] - 0.2 else 'hammer'


def frac(k, s):
    a, b = MARCAS[k]
    return (s - a) / (b - a)


def th_en():
    return 'const TH = { ' + ', '.join(f"{n}: en('medium', {frac('medium', s):.4f})" for n, s in TH.items()) + ' };\n'


def tf_en():
    """const TF = {...}: cada instante como en('marca', fracción) (para bl-friedman)"""
    return 'const TF = { ' + ', '.join(f"{n}: en('{marca_f(s)}', {frac(marca_f(s), s):.4f})" for n, s in TF.items()) + ' };\n'


def tf_num():
    """los mismos instantes de bl-friedman como números (para bl-casi, que tiene otro M)"""
    return 'const TF = { ' + ', '.join(f"{n}: {s}" for n, s in TF.items()) + ' };\n'


def ts_en():
    return 'const TS = { ' + ', '.join(f"{n}: en('fijate3', {frac('fijate3', s):.4f})" for n, s in TS.items()) + ' };\n'


COMUN = r'''
const AT = T.AT, BL = T.BL, C = T.C, K = C.k, ri = Math.round, H = (s) => hex(s);
const B4M = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4M[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const ns = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h2(xi, yi), b = h2(xi + 1, yi), c = h2(xi, yi + 1), d = h2(xi + 1, yi + 1); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const pal = (a) => a.map((c) => hex(c));
// rampa de oscuro a claro: el valor v (0..n-1) se trama entre dos tonos
const rmp = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return ramp[Math.max(0, Math.min(ramp.length - 1, l))]; };
// aparece con un rebote (0 antes de a; 1 al final)
const pop = (t, a, d = 0.3) => { const u = Math.max(0, Math.min(1, (t - a) / d)); return u <= 0 ? 0 : u < 1 ? 1 - Math.pow(1 - u, 3) * Math.cos(u * 7) : 1; };
const ps = (x, y, c) => R.pset(ri(x), ri(y), c);
const rr = (x0, y0, x1, y1, c) => R.rect(ri(Math.min(x0, x1)), ri(Math.min(y0, y1)), ri(Math.max(x0, x1)), ri(Math.max(y0, y1)), c);
const tine = (x, y, c, a) => { x = ri(x); y = ri(y); if (x < 0 || y < 0 || x > 319 || y > 179) return; const B = R.buf, i = y * 320 + x; B[i] = mez(B[i], c, a); };
// un resplandor tramado (luz de vela, de farol, del fogonazo)
const luz = (cx, cy, r, c, a) => { for (let y = Math.max(0, ri(cy - r)); y <= Math.min(179, ri(cy + r)); y++) for (let x = Math.max(0, ri(cx - r)); x <= Math.min(319, ri(cx + r)); x++) {
  const d = Math.hypot(x - cx, y - cy) / r; if (d < 1) { const k = (1 - d) * (1 - d) * a; if (k > 0.02) tine(x, y, c, Math.min(0.85, k)); } } };
const sombraS = (cx, cy, w, a = 0.35) => { for (let i = -w; i <= w; i++) { const k = 1 - (i / (w + 1)) ** 2; tine(cx + i, cy, K, a * k); if (Math.abs(i) < w * 0.7) tine(cx + i, cy + 1, K, a * 0.6 * k); } };
const destello = (x, y, r, c = H('#fff8d0')) => { x = ri(x); y = ri(y); for (let k = 1; k <= r; k++) { ps(x + k, y, c); ps(x - k, y, c); ps(x, y + k, c); ps(x, y - k, c); } ps(x, y, H('#ffffff')); };
const elipse = (cx, cy, rx, ry, c) => { for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 <= 1) ps(cx + i, cy + j, c); };
// un fondo fijo: se pinta una vez en su búfer y se copia en cada fotograma
const FIJ = new Map();
const fijo = (clave, f) => { let b = FIJ.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); FIJ.set(clave, b); } R.copiar(b); };
// cifras de 3 × 5 (las de tiza, las de los calendarios y las de las fichas)
const DG = { 0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['##.', '..#', '.#.', '#..', '###'], 3: ['##.', '..#', '.#.', '..#', '##.'],
  4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '##.', '..#', '##.'], 6: ['.##', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'],
  8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '##.'] };
const cifras = (s, x, y, c, esc = 1) => { for (const ch of String(s)) { const g = DG[ch]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j][i] === '#') rr(x + i * esc, y + j * esc, x + i * esc + esc - 1, y + j * esc + esc - 1, c); x += 4 * esc; } };
// un dibujo de caracteres a escala s (k contorno; el resto, de la paleta P)
const dib = (m, x, y, s, P) => { for (let j = 0; j < m.length; j++) for (let i = 0; i < m[j].length; i++) { const ch = m[j][i]; if (ch === '.') continue; const c = ch === 'k' ? K : P[ch]; if (c != null) rr(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); } };
// madera con vetas: tablas de «tab» px con juntas, nudos y poros (vert: tablas de pie)
const vetas = (x0, y0, x1, y1, ramp, k = 0, tab = 12, vert = false) => { const n = ramp.length - 1;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = vert ? y : x, b = vert ? x - x0 : y - y0, f = Math.floor(b / tab), j = b % tab, A = a + h2(f, k, 7) * 400, junta = 40 + ri(h2(f, k, 8) * 50);
    let v = n * 0.55 + Math.sin(A * 0.09 + Math.sin(A * 0.021 + f * 1.7) * 2.6 + j * 0.45) * 0.55 + (ns(A * 0.06, b * 0.4 + k) - 0.5) * 1.3;
    if (j === 0) v = 0.25; else if (j === 1) v += 0.5; else if (j === tab - 1) v -= 0.45;
    if (!vert && Math.floor(A) % junta === 0) v = 0.3;
    if (h2(x, y, k + 3) > 0.988) v -= 1.2;
    ps(x, y, rmp(ramp, v, x, y)); } };
// yeso o piedra: grano grande y fino, sin una sola zona lisa
const yeso = (x0, y0, x1, y1, ramp, k = 0) => { const n = ramp.length - 1;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = n * 0.55 + (ns(x * 0.07 + k, y * 0.07) - 0.5) * 1.6 + (ns(x * 0.25, y * 0.25 + k) - 0.5) * 0.7 + (h2(x, y, k) - 0.5) * 0.35; ps(x, y, rmp(ramp, v, x, y)); } };
// nube de tres tonos (sombra, cuerpo y luz); m(x, y): solo donde se ve el cielo
const nube = (cx, cy, w, c3, m) => { const B = [[0, 0, 0.32], [-0.32, 0.06, 0.24], [0.3, 0.05, 0.26], [-0.1, -0.12, 0.26], [0.14, -0.08, 0.22]];
  for (let q = 0; q < 3; q++) for (const [dx, dy, r0] of B) { const r = w * r0 * (q === 2 ? 0.72 : 1), X = cx + dx * w - (q === 2 ? 1 : 0), Y = cy + dy * w + (q === 0 ? 1 : q === 2 ? -2 : 0);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) { const px = ri(X + i), py = ri(Y + j); if (!m || m(px, py)) ps(px, py, c3[q]); } } };
// la pala: el mango de (hx, hy) a (bx, by) y la hoja de hierro más allá
const pala = (hx, hy, bx, by) => { const L = Math.hypot(bx - hx, by - hy) || 1, ux = (bx - hx) / L, uy = (by - hy) / L;
  R.linea(ri(hx + 1), ri(hy), ri(bx + 1), ri(by), K); R.linea(ri(hx - 1), ri(hy), ri(bx - 1), ri(by), K); R.linea(ri(hx), ri(hy), ri(bx), ri(by), H('#a87a48'));
  for (let q = 0; q < 7; q++) { const cx = bx + ux * q, cy = by + uy * q, w = q < 1 ? 1 : 2.5; for (let s = -w; s <= w; s += 0.5) { const px = cx - uy * s, py = cy + ux * s; ps(px, py, Math.abs(s) > w - 0.6 ? K : s < 0 ? H('#9aa2ae') : H('#6a727e')); } } };
// el cofre del tesoro (la «verdad») y el cofre tachado (el «engaño»): base en (x, y), centrado
const COFRE = ['..kkkkkkkk..', '.kMMMMMMMMk.', 'kMLMMMMMMmMk', 'kOOOOOOOOOOk', 'kMMMMOOMMMMk', 'kMMMMOkMMMMk', 'kmMMMOOMMMmk', 'kOOOOOOOOOOk', 'kkkkkkkkkkkk'];
const cofre = (x, y, s, o = {}) => { const P = { M: H('#8a5a2a'), m: H('#5a3818'), L: H('#b07a40'), O: H('#f0c040') };
  if (o.abierto) { for (let i = 0; i < 4; i++) { R.disco(ri(x - 3 * s + i * 2 * s), ri(y - 9 * s), ri(1.4 * s), K); R.disco(ri(x - 3 * s + i * 2 * s), ri(y - 9 * s), ri(s), H('#f0c040')); } }
  dib(COFRE, ri(x - 6 * s), ri(y - 9 * s), s, P);
  if (o.brillo) destello(x + 3 * s, y - 8 * s, 2 + s, H('#fff8d0'));
  if (o.tacha) { for (let q = 0; q < 12 * s; q++) for (let w = -s; w <= s; w++) { const a = q / (12 * s); ps(x - 7 * s + a * 14 * s + w, y - 10 * s + a * 11 * s, H('#e83a2a')); ps(x + 7 * s - a * 14 * s + w, y - 10 * s + a * 11 * s, H('#e83a2a')); } } };
// el cerebro de dibujo (se enciende con o.luz), centrado en (cx, cy)
const cerebro = (cx, cy, s, t, o = {}) => { const enc = o.luz ?? 0;
  if (enc > 0) { luz(cx, cy, 16 * s, H('#ffe070'), 0.5 * enc); for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2 + t * 0.6, r0 = 10 * s, r1 = (12 + 3 * Math.sin(t * 9 + k)) * s; R.linea(ri(cx + Math.cos(an) * r0), ri(cy + Math.sin(an) * r0 * 0.8), ri(cx + Math.cos(an) * r1), ri(cy + Math.sin(an) * r1 * 0.8), H('#ffe070')); } }
  for (let j = -7 * s; j <= 6 * s; j++) for (let i = -9 * s; i <= 9 * s; i++) { const e = (i / (9 * s)) ** 2 + (j / (7 * s)) ** 2; if (e > 1.12) continue;
    const I = i / s, J = j / s, surco = Math.sin(I * 1.3 + Math.cos(J * 0.9) * 2) > 0.75 || Math.sin(J * 1.6 + I * 0.4) > 0.86 || Math.abs(I) < 0.5;
    ps(cx + i, cy + j, e > 1 ? K : surco ? H('#c86a80') : enc > 0 && h2(i, j + ri(t * 6), 9) < enc * 0.7 ? H('#ffd0e0') : I < -2 && J < -2 ? H('#f8b8c8') : H('#e890a8')); }
  rr(cx - 2 * s, cy + 7 * s, cx + 2 * s, cy + 9 * s, H('#c86a80')); };
const parp = (t, f = 7) => Math.sin(t * f) > -0.2;
'''

HART = r'''
// ════ BL-HART ════
const NOCHE = pal(['#080c1c', '#0e1428', '#161e38', '#202a4a', '#2c385c', '#3a4870']);
const NUBN = pal(['#1a2038', '#2a3352', '#46507a']);
// ── H1 · el mapa: de la ceniza de Lynchburg salen unos pocos folletos y, donde caen, brota la fiebre (palas y anillos rojos)
const CIU = [[-77.44, 37.54], [-77.04, 38.90], [-76.61, 39.29], [-75.16, 39.95], [-80.0, 40.44], [-78.64, 35.78], [-81.63, 38.35], [-79.94, 37.27], [-78.48, 38.03]];
const H1 = (t) => {
  const P = T.mapa(R, t, { zoom: 2.7, centro: [-79.2, 38.3] });
  const [lx, ly] = P([-79.14, 37.41]).map(ri);
  R.recorte([22, 16, 298, 168]);
  // la ceniza del incendio: un montón gris con brasas y un hilo de humo; encima, tres folletos que se salvaron
  for (let k = 0; k < 18; k++) { const a = h2(k, 1, 31) * 6.28, r = h2(k, 2, 31) * 7; ps(lx + Math.cos(a) * r, ly + 3 + Math.sin(a) * r * 0.4, k % 3 ? H('#6a6a70') : H('#3a3a40')); }
  for (let k = 0; k < 3; k++) if (Math.sin(t * 5 + k * 2) > 0.3) ps(lx - 3 + k * 3, ly + 3, H('#e86a2a'));
  for (let k = 0; k < 6; k++) { const u = (t * 0.5 + k / 6) % 1; tine(lx + Math.sin(u * 6 + k) * 3, ly - u * 18, H('#c8c8d0'), 0.5 * (1 - u)); }
  const N = CIU.length;
  for (let k = 0; k < N; k++) {
    const sale = TH.SURVIVED - 0.1 + k * 0.17, u = tramo(t, sale, sale + 0.9), [cx, cy] = P(CIU[k]).map(ri);
    if (u <= 0) { if (k < 3) T.d_folleto(R, lx - 4 + k * 4, ly - 2 - k, { escala: 0.5, t }); continue; }
    if (u < 1) { const e = ease(u), x = lerp(lx, cx, e), y = lerp(ly, cy, e) - Math.sin(e * Math.PI) * 26;
      for (let q = 1; q < 8; q++) { const e2 = ease(Math.max(0, u - q * 0.04)); if (q % 2) ps(lerp(lx, cx, e2), lerp(ly, cy, e2) - Math.sin(e2 * Math.PI) * 26, H('#c8a040')); }
      T.d_folleto(R, ri(x), ri(y), { escala: 0.5, t }); continue; }
    // ha caído: la fiebre (un anillo rojo que late y se ensancha) y una pala clavada junto a su montón de tierra
    const f = t - sale - 0.9, r0 = 3 + ((f * 0.9 + k * 0.3) % 1) * (10 + 6 * cl((t - TH.FEVER) * 2));
    for (let a = 0; a < 6.28; a += 0.25) if ((a * 8 | 0) % 2 === 0) ps(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0 * 0.6, H('#e83a3a'));
    const p = pop(t, sale + 0.95, 0.35);
    if (p > 0) { const by = ri(cy + 2 - 4 * (1 - Math.min(1, p))); elipse(cx + 3, by + 1, 4, 2, H('#5a3a1e')); elipse(cx + 3, by, 3, 1, H('#8a5a2e')); pala(cx - 4, by - 10, cx - 1, by - 2); }
  }
  R.recorte(null);
  // el termómetro de la fiebre, sobre el mapa: sube en «fever»
  const tx = 44, ty0 = 92, ty1 = 150, sube = ease(tramo(t, TH.FEVER - 0.3, TH.DAY + 0.4));
  for (let y = ty0; y <= ty1; y++) tine(tx + 3, y + 2, K, 0.3);
  rr(tx - 3, ty0 - 1, tx + 3, ty1, K); rr(tx - 2, ty0, tx + 2, ty1, H('#e8f0f4')); rr(tx - 2, ty0, tx - 2, ty1, H('#ffffff'));
  R.disco(tx, ty1 + 5, 6, K); R.disco(tx, ty1 + 5, 5, H('#d82a2a')); ps(tx - 2, ty1 + 3, H('#ff8a7a'));
  const top = ri(lerp(ty1 - 8, ty0 + 4, sube)); rr(tx - 1, top, tx + 1, ty1 + 1, H('#d82a2a')); rr(tx - 1, top, tx - 1, ty1, H('#ff6a5a'));
  for (let y = ty0 + 4; y < ty1; y += 6) rr(tx + 2, y, tx + 3, y, H('#6a6a7a'));
  if (sube > 0.9) for (let k = 0; k < 3; k++) { const u = (t * 1.2 + k / 3) % 1; ps(tx + 6 + k * 3, ty0 + 2 - u * 8, H('#e83a3a')); }
};

// los colores del día en Bedford (cielo, nubes, campo de otoño)
const SKYH = pal(['#4a7cc8', '#6492d6', '#80aae2', '#a0c2ec', '#c4daf4']), NUBH = pal(['#a8b8d0', '#d8e2ee', '#ffffff']);
const ROB0 = pal(['#5a3c1e', '#7a5428', '#9a6e36']);
const ROB = pal(['#5a3c1e', '#7a5428', '#9a6e36', '#b88a48', '#d4a860']);
const PRADO = pal(['#3e4a1e', '#52602a', '#687434', '#7e8a3e', '#96a04a', '#b0b45a']);
const OTONO = pal(['#5a2a14', '#8a3a1a', '#b85a22', '#d88a2a', '#e8b040', '#6a6a2a']);
// los picos de Otter de día y las lomas con el bosque de otoño (hasta la línea SKY que se devuelve)
const picosDia = (SKY, yb) => { for (let x = 0; x < 320; x++) { const y = ri(yb - 34 * Math.exp(-(((x - 120) / 28) ** 2)) - 24 * Math.exp(-(((x - 196) / 32) ** 2)) - 6 * Math.sin(x * 0.05)); SKY[x] = y;
    for (let j = y; j < yb + 14; j++) ps(x, j, j === y ? H('#a8b4d0') : rmp(pal(['#5a6a98', '#6e7eac', '#8492bc']), 2 - (j - y) / 12 - (x > 120 && x < 150 ? 0.6 : 0), x, j)); }
  for (let x = 0; x < 320; x++) { const y = ri(yb + 6 - 5 * Math.sin(x * 0.04 + 2) - (h2(x >> 2, 0, 60) > 0.5 ? 2 : 0)); for (let j = y; j < yb + 22; j++) ps(x, j, rmp(OTONO, (ns(x * 0.18, j * 0.25) * 5.5) + (j - y) / 30, x, j)); } };

// ── H2 · el porche de los Hart, en 1898 (fondo local): Clayton lee el folleto y lo alza en «Clayton»; George llega por
// el patio con la pala y la levanta en «George»; en «Hart» los dos miran a los picos ──
const SKY2H = new Array(320).fill(80);
const CLAP = pal(['#7a7468', '#9a9486', '#bab4a4', '#d6d0c0', '#ece8dc']);
const H2 = (t) => {
  fijo('h2', () => {
    for (let y = 0; y < 120; y++) for (let x = 200; x < 320; x++) ps(x, y, rmp(SKYH, 0.4 + y / 22 + (ns(x * 0.04, y * 0.08) - 0.5) * 0.6, x, y));
    picosDia(SKY2H, 96);
    // el granero rojo con su tejado y la puerta en aspa
    for (let y = 74; y < 116; y++) for (let x = 250; x < 302; x++) ps(x, y, (x - 250) % 4 === 0 ? H('#5a1a14') : rmp(pal(['#6a1e16', '#8a2a1e', '#a83a28']), 1.6 + (h2(x, y, 61) - 0.5) * 0.8, x, y));
    for (let j = 0; j < 14; j++) rr(250 - 4 + j, 74 - j, 302 + 4 - j, 74 - j, j === 13 ? K : H('#4a4a52')); for (let x = 248; x < 305; x += 3) ps(x, 74, H('#6a6a74'));
    rr(266, 92, 286, 116, H('#e8e0d0')); rr(268, 94, 284, 114, H('#7a2418')); R.linea(268, 94, 284, 114, H('#e8e0d0')); R.linea(284, 94, 268, 114, H('#e8e0d0'));
    rr(232, 98, 238, 116, H('#c8b878')); R.disco(235, 98, 4, H('#d8c888'));
    for (let y = 112; y < 180; y++) for (let x = 200; x < 320; x++) ps(x, y, rmp(PRADO, 2.6 + (ns(x * 0.2, y * 0.3) - 0.5) * 1.6 + (y - 112) / 40, x, y));
    for (let x = 200; x < 320; x++) { const y = 124 + ((x / 14) % 2 < 1 ? (x % 14) * 0.4 : 5.6 - (x % 14) * 0.4); ps(x, ri(y), H('#6a5a40')); ps(x, ri(y) + 4, H('#6a5a40')); }
    // la casa de tablas encaladas, que se pelan; el porche con su tejadillo, postes, puerta mosquitera y ventana
    for (let y = 0; y < 142; y++) for (let x = 0; x < 214; x++) { const tb = (y + 2) % 6, pela = ns(x * 0.2, y * 0.35) > 0.8 && y > 30;
      ps(x, y, pela ? rmp(ROB0, 1.5 + (tb === 0 ? -1 : 0), x, y) : rmp(CLAP, 3 + (tb === 0 ? -2 : tb === 1 ? 0.6 : 0) - (y < 22 ? 2.2 : y < 34 ? 1.2 : 0) + (h2(x, y, 62) - 0.5) * 0.4, x, y)); }
    for (let y = 0; y < 22; y++) for (let x = 0; x < 214; x++) if (y > 17) ps(x, y, H('#4a463e'));
    for (let y = 22; y < 30; y++) for (let x = 0; x < 218; x++) ps(x, y, y === 29 ? K : (x + y) % 4 === 0 ? H('#3a3a42') : rmp(pal(['#4a4a52', '#5e5e68', '#72727c']), 1.4 + (y - 22) * 0.15, x, y));
    for (const px of [10, 108, 206]) { rr(px - 3, 30, px + 3, 142, K); rr(px - 2, 30, px + 2, 142, CLAP[4]); rr(px + 1, 30, px + 2, 142, CLAP[2]); }
    rr(118, 66, 148, 142, K); rr(119, 67, 147, 141, H('#5a3a22')); for (let y = 70; y < 138; y++) for (let x = 122; x < 145; x++) if ((x + y) % 2 === 0) ps(x, y, H('#3a2a1e')); rr(119, 102, 147, 104, H('#5a3a22')); R.disco(143, 106, 1, H('#e8c040'));
    rr(132, 56, 144, 62, H('#8a8a94')); for (let a = 0; a < 3.1; a += 0.2) ps(138 + Math.cos(a) * 6, 60 - Math.sin(a) * 5, H('#9aa2ae'));
    rr(32, 60, 92, 104, K); for (let y = 61; y < 104; y++) for (let x = 33; x < 92; x++) ps(x, y, rmp(pal(['#2a3a4a', '#3a5068', '#5a7a98']), 1 + (x - 33 + y - 61) / 40, x, y)); rr(61, 61, 63, 104, CLAP[4]); rr(33, 81, 91, 83, CLAP[4]);
    for (let y = 61; y < 100; y++) { const w = ri(10 - (y - 61) * 0.12); rr(33, y, 33 + w, y, H('#d8c8a8')); rr(91 - w, y, 91, y, H('#d8c8a8')); }
    rr(30, 104, 94, 112, K); rr(31, 105, 93, 111, H('#6a4a2a')); for (let x = 34; x < 92; x += 5) { R.disco(x, 103, 2, x % 10 ? H('#e84a5a') : H('#f0d040')); ps(x + 1, 101, H('#4a8a3a')); }
    // el suelo del porche, los escalones y el patio de tierra
    vetas(0, 142, 214, 150, ROB, 63, 4); rr(0, 150, 214, 151, K);
    for (let s2 = 0; s2 < 3; s2++) { const y = 151 + s2 * 6; vetas(150, y, 196, y + 5, ROB, 64 + s2, 5); rr(150, y + 5, 196, y + 5, K); }
    for (let y = 151; y < 180; y++) for (let x = 0; x < 200; x++) if (x < 150 || y > 168) ps(x, y, rmp(pal(['#5a4630', '#6e5838', '#846a44', '#9a7e52']), 1.8 + (ns(x * 0.2, y * 0.2) - 0.5) * 1.6, x, y));
    for (let k = 0; k < 24; k++) { const x = ri(h2(k, 1, 65) * 320), y = 154 + ri(h2(k, 2, 65) * 24); for (let q = 0; q < 3; q++) R.linea(x + q, y, x + q - 1 + q, y - 3 - (q % 2), H('#6a7a34')); }
    rr(186, 128, 204, 142, K); rr(187, 129, 203, 141, H('#9aa2ae')); rr(187, 129, 203, 130, H('#c8ccd4'));
    for (const [px, py] of [[296, 120]]) { rr(px - 1, py, px + 1, 150, H('#5a4a3a')); rr(px - 6, py - 7, px + 6, py, K); rr(px - 5, py - 6, px + 5, py - 1, H('#5a6a7a')); rr(px + 5, py - 9, px + 6, py - 4, H('#c83a3a')); }
  });
  const m = (x, y) => x > 200 && x < 320 && y < SKY2H[x] - 1 && y > 4;
  for (const [k, v, y, w] of [[0, 2, 24, 30], [1, 3.4, 44, 22], [2, 5.2, 60, 16]]) nube(200 + (((k * 70 + t * v) % 170)) - 20, y, w, NUBH, m);
  for (let k = 0; k < 3; k++) { const x = 330 - ((t * 12 + k * 7) % 140), y = 56 + k * 2 + Math.sin(t * 2 + k) * 2, a = Math.sin(t * 11 + k) > 0; if (m(ri(x), ri(y))) { ps(x, y, K); ps(x - 1, y - (a ? 1 : 0), K); ps(x + 1, y - (a ? 1 : 0), K); } }
  // la mecedora que se mece sola con el viento, el farol que oscila, las gallinas del patio
  const mc = Math.sin(t * 1.6) * 2; for (let q = 0; q < 4; q++) R.linea(ri(44 + q * 4 + mc), 112, ri(46 + q * 4 - mc * 0.3), 140, H('#5a3a1e')); rr(ri(42 + mc), 112, ri(60 + mc), 114, H('#6a4a2a')); rr(40, 126, 62, 128, H('#6a4a2a')); for (let i = 0; i < 26; i++) ps(38 + i, 141 + ri(((i - 13) / 13) ** 2 * 2 - mc * (i - 13) / 26), H('#4a2e18'));
  const fl = Math.sin(t * 2.2) * 2; R.linea(108, 34, ri(108 + fl), 44, K); rr(ri(105 + fl), 44, ri(111 + fl), 52, K); rr(ri(106 + fl), 45, ri(110 + fl), 51, H('#c8b070'));
  for (const [gx, k] of [[30, 0], [232, 1], [258, 2]]) { const pk = Math.sin(t * 4 + k * 2) > 0.4 ? 2 : 0, x = gx + ri(Math.sin(t * 0.5 + k) * 6); rr(x, 166, x + 5, 170, H('#f0ece4')); rr(x + 5, 163 + pk, x + 7, 166 + pk, H('#f0ece4')); ps(x + 7, 164 + pk, H('#e8a040')); ps(x + 6, 162 + pk, H('#d83a2a')); ps(x + 1, 167, H('#c8c0b0')); }
  // CLAYTON en el porche con el folleto; GEORGE llega por el patio con la pala
  const alza = t > TH.CLAYTON - 0.1, mira = t > TH.HART + 0.1;
  const c = R.actor(BL.claytonBL, 82, 142, t, { dir: mira ? 1 : 1, sostiene: alza && !mira ? [100, 104] : true, dedo: mira, habla: !mira && parp(t, 9) && t > TH.BROTHERS - 0.3, sonrisa: alza && !mira });
  if (!mira) { T.d_folleto(R, c.mano[0] + 1, c.mano[1] - 6, { escala: 0.5, t }); if (alza) destello(c.mano[0] + 5, c.mano[1] - 13, 2); }
  const ug = ease(tramo(t, TH.AND1 + 0.2, TH.GEORGE - 0.15)), xg = ri(lerp(334, 214, ug));
  const g = R.actor(BL.georgeBL, xg, 170, t, { dir: mira ? 1 : -1, anda: ug > 0 && ug < 1, sostiene: t > TH.GEORGE - 0.1 && t < TH.WHO ? [xg - 1, 134] : true, sonrisa: t > TH.GEORGE });
  if (t > TH.GEORGE - 0.1 && t < TH.WHO) pala(g.mano[0], g.mano[1], g.mano[0] + 3, g.mano[1] - 16); else pala(g.mano[0], g.mano[1] + 1, g.mano[0] + 12, g.mano[1] - 13);
  // el perro que mueve la cola junto a Clayton
  const co = Math.sin(t * 9) > 0 ? 1 : -1; elipse(58, 139, 7, 3, K); elipse(58, 139, 6, 2, H('#8a5a2a')); R.disco(51, 135, 3, K); R.disco(51, 135, 2, H('#8a5a2a')); ps(49, 133, H('#5a3a1a')); R.linea(65, 138, 68, 135 + co, H('#8a5a2a')); rr(54, 141, 55, 142, K); rr(61, 141, 62, 142, K);
  if (mira) { const p = pop(t, TH.HART + 0.1, 0.3); if (p > 0) { R.icono('?', 86, ri(96 - 3 * Math.min(1, p)), H('#fff0a0'), K, 2); R.icono('?', xg + 4, ri(126 - 3 * Math.min(1, p)), H('#fff0a0'), K, 2); } }
};

// ── H3 · la ladera de los hoyos, en 1898 (fondo local): un prado de otoño a los pies de los picos lleno de hoyos; George
// cava y en «desperate» tira la pala; en «spot» Clayton duda con el folleto ──
const SKY3H = new Array(320).fill(80);
const hoyo = (x, y, w) => { elipse(x + w + 4, y, ri(w * 0.7), Math.max(1, ri(w * 0.3)), H('#4a3018')); elipse(x + w + 4, y - 1, ri(w * 0.55), Math.max(1, ri(w * 0.2)), H('#7a5430')); ps(x + w + 2, y - 3, H('#9a7044'));
  elipse(x, y, w, Math.max(1, ri(w * 0.38)), H('#3a2414')); elipse(x, y + 1, Math.max(1, w - 2), Math.max(1, ri(w * 0.25)), H('#160c06')); for (let i = -w + 1; i < w; i += 2) ps(x + i, y - ri(w * 0.38), H('#8a6438')); };
const HOYOS = [[40, 116, 3], [92, 118, 3], [150, 115, 3], [206, 119, 3], [262, 117, 3], [70, 128, 5], [128, 131, 5], [238, 129, 5], [296, 133, 5], [30, 146, 8], [200, 146, 8], [272, 156, 9], [104, 170, 10]];
const H3 = (t) => {
  fijo('h3', () => {
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(SKYH, 0.4 + y / 18 + (ns(x * 0.04, y * 0.08) - 0.5) * 0.6, x, y));
    picosDia(SKY3H, 86);
    for (let y = 106; y < 180; y++) for (let x = 0; x < 320; x++) { const surco = Math.sin(y * 1.1 + Math.sin(x * 0.03) * 2) > 0.7; ps(x, y, rmp(PRADO, 2.4 + (ns(x * 0.12, y * 0.25) - 0.5) * 1.8 + (y - 106) / 50 - (surco ? 0.7 : 0), x, y)); }
    for (let x = 0; x < 320; x++) { const y = 110 + ((x / 16) % 2 < 1 ? (x % 16) * 0.35 : 5.6 - (x % 16) * 0.35); ps(x, ri(y), H('#5a4a34')); ps(x, ri(y) + 3, H('#5a4a34')); if (x % 16 === 0) rr(x, ri(y) - 2, x, ri(y) + 5, H('#4a3a28')); }
    for (const [hx, hy, w] of HOYOS) hoyo(hx, hy, w);
    for (let k = 0; k < 50; k++) { const x = ri(h2(k, 1, 66) * 320), y = 120 + ri(h2(k, 2, 66) * 58), c = OTONO[1 + (k % 4)]; ps(x, y, c); ps(x + 1, y, c); }
    // el carro de los Hart, parado a la derecha con su caballo de tiro
    rr(286, 128, 318, 140, K); vetas(287, 129, 317, 139, ROB, 67, 4); for (const wx of [292, 312]) { R.disco(wx, 143, 5, K); R.disco(wx, 143, 4, H('#6a4a2a')); R.disco(wx, 143, 1, K); }
    R.linea(286, 136, 270, 140, K);
  });
  const m = (x, y) => x >= 0 && x < 320 && y < SKY3H[x] - 1 && !(x > 274 && y < 46);
  for (const [k, v, y, w] of [[0, 2.2, 22, 40], [1, 3.6, 44, 30], [2, 5.6, 62, 22]]) nube(((k * 120 + t * v) % 400) - 40, y, w, NUBH, m);
  for (let k = 0; k < 5; k++) { const x = ((t * 16 + k * 8) % 380) - 30, y = 40 + Math.abs(k - 2) * 3 + Math.sin(t * 2) * 2, a = Math.sin(t * 12 + k) > 0; if (m(ri(x), ri(y))) { ps(x, y, K); ps(x - 1, y - (a ? 1 : 0), K); ps(x + 1, y - (a ? 1 : 0), K); } }
  for (let k = 0; k < 6; k++) { const u = (t * 0.25 + k / 6) % 1, x = (k * 61 + Math.sin(t + k) * 12 + u * 40) % 320, y = 90 + u * 90; ps(x, y, OTONO[2 + (k % 3)]); ps(x + 1, y + (Math.sin(t * 6 + k) > 0 ? 1 : 0), OTONO[3]); }
  R.caballo(256, 146, t, { dir: -1, color: H('#8a5a34') }); if (Math.sin(t * 0.8) > 0.6) ps(257, 132, K);
  // un cuervo que salta de montón en montón
  { const u = (t * 0.5) % 2, cx = 200 + ri(u < 1 ? 0 : 16), cy = 144 - ri(Math.max(0, Math.sin(u * Math.PI)) * 6); rr(cx, cy - 3, cx + 4, cy, K); ps(cx + 5, cy - 3, K); ps(cx + 6, cy - 3, H('#5a5a5a')); ps(cx + 1, cy + 1, K); }
  hoyo(140, 162, 11);
  const tira = t > TH.DESPERATE, gx = 160;
  const fase = ((t - TH.WHO) / 0.85) % 1, sube = Math.sin(fase * Math.PI * 2);
  const g = R.actor(BL.georgeBL, gx, 162, t, { dir: -1, sostiene: tira ? null : [gx - 1, ri(134 + 5 * sube)], brazos: tira && t < TH.SPOT, enfado: tira, triste: t > TH.SPOT + 0.3 });
  if (!tira) { const [hx, hy] = g.mano; pala(hx, hy, hx - 12, ri(hy + 20 + 2 * sube));
    if (fase > 0.55 && fase < 0.95) { const u = (fase - 0.55) / 0.4; for (let k = 0; k < 3; k++) ps(lerp(hx - 14, 122, u) + k, hy + 18 - Math.sin(u * Math.PI) * 14 + k, H('#6a4424')); } }
  else { const u = tramo(t, TH.DESPERATE, TH.DESPERATE + 0.35); pala(lerp(gx, 186, u), lerp(132, 168, u), lerp(gx - 10, 204, u), lerp(152, 172, u)); }
  const c = R.actor(BL.claytonBL, 70, 160, t, { dir: t > TH.SPOT + 0.2 && t < TH.SPOT + 0.6 ? -1 : 1, sostiene: true, sorpresa: t > TH.SPOT - 0.1 });
  T.d_folleto(R, c.mano[0] + 1, c.mano[1] - 6, { escala: 0.5, t });
  if (t > TH.SPOT - 0.1) { const p = pop(t, TH.SPOT - 0.1, 0.3); R.icono('?', 74, ri(120 - 3 * Math.min(1, p)), H('#fff0a0'), K, 2); }
  if (tira && t < TH.DESPERATE + 0.6) R.icono('!', gx + 6, 114, H('#ff6a5a'), K, 2);
};

// ── H4 · la sesión: el médium entra en trance en «hypnotized»; en «where» alza los brazos y de la bola sube un roble ──
const H4 = (t) => {
  const o = { encuadre: 'sesion', empanada: 0.6 * tramo(t, TH.DIG, TH.CORTE5) };
  T.buscadores(R, t, o);
  const tr = t > TH.HYPNOTIZED - 0.2, sw = tr ? ri(Math.sin(t * 2.2) * 1.3) : 0, alza = t > TH.WHERE - 0.15;
  R.actor(BL.mediumBL, 184 + sw, 146, t, { dir: -1, brazos: alza, dedo: !alza && Math.sin(t * 4) > 0, quieto: tr });
  // el trance: tres puntitos lilas que giran sobre la cabeza
  if (tr) for (let k = 0; k < 3; k++) { const a = t * 3 + k * 2.09; ps(191 + sw + Math.cos(a) * 7, 108 + Math.sin(a) * 2, H('#d8b0ff')); }
  const ve = t > TH.MEDIUM - 0.1;
  const c = R.actor(BL.claytonBL, 56, 152, t, { dir: 1, sostiene: true, sorpresa: ve && t < TH.WHERE + 0.3, sonrisa: t > TH.WHERE + 0.3 });
  T.d_folleto(R, c.mano[0] + 1, c.mano[1] - 6, { escala: 0.5, t });
  R.actor(BL.georgeBL, 86, 156, t, { dir: 1, dedo: t > TH.WHERE + 0.1, sorpresa: ve });
  const BD = T.buscadoresDelante(R, t, o) || {}, [bx, by] = BD.bola || [148, 132];
  luz(bx, by, 22 + (ve ? 6 : 0), H('#c8a0ff'), 0.25 + 0.12 * Math.sin(t * 3) + (alza ? 0.2 : 0));
  // en «where»: de la bola sube la imagen de un roble con su hoyo
  const u = tramo(t, TH.WHERE, TH.WHERE + 0.6); if (u > 0) { const y = ri(by - 14 - u * 16);
    luz(bx, y, 12, H('#e8d8ff'), 0.4); rr(bx - 1, y, bx + 1, y + 7, H('#5a3a24')); R.disco(bx, y - 2, 6, K); R.disco(bx, y - 2, 5, H('#3a7a3a')); ps(bx - 2, y - 5, H('#6aa85a')); elipse(bx + 6, y + 8, 3, 1, H('#1a1010')); }
};

// ── H5 · la bola de cerca (fondo local): se empaña; Atom llega por el mantel y la limpia con el brazo; dentro, la noche con faroles ──
const BX = 160, BY = 80, BR = 32;
const DAM = pal(['#160810', '#22101a', '#301622', '#40202e', '#562a3c']);
const MANT = pal(['#28080e', '#3c0e18', '#561826', '#7a2836', '#9a3a4a']);
const LAT = pal(['#4a3010', '#7a5420', '#b08030', '#e0b850', '#fff0a0']);
const H5 = (t) => {
  fijo('h5', () => {
    for (let y = 0; y < 116; y++) for (let x = 0; x < 320; x++) { const mx = ((x + 12) % 24) - 12, my = ((y + (Math.floor((x + 12) / 24) % 2) * 16) % 32) - 16;
      const flor = Math.abs(mx) * 0.9 + Math.abs(my) * 0.55 + Math.sin(my * 0.5) * 2 < 7 ? 0.9 : 0, v = 1.6 + flor - Math.hypot(x - 160, y - 70) / 150 + (h2(x, y, 3) - 0.5) * 0.4;
      ps(x, y, rmp(DAM, v, x, y)); }
    // el retrato en óvalo dorado (un caballero de patillas, en sombra)
    for (let j = -26; j <= 26; j++) for (let i = -19; i <= 19; i++) { const e = (i / 19) ** 2 + (j / 26) ** 2; if (e > 1) continue; ps(46 + i, 46 + j, e > 0.78 ? rmp(LAT, 2 + (j < 0 ? 1 : -0.5) + (h2(i, j, 4) - 0.5), i, j) : e > 0.7 ? K : rmp(pal(['#0e140e', '#18221a', '#243026']), 1 + (j / 26) * -0.8, i, j)); }
    R.disco(46, 38, 7, H('#2a221c')); R.disco(46, 37, 6, H('#5a4434')); rr(36, 50, 56, 66, H('#1a1418')); rr(44, 48, 48, 52, H('#e8e0d0'));
    // la cortina de terciopelo a la derecha (desde y 50, bajo la zona de Atom)
    for (let y = 50; y < 116; y++) for (let x = 282; x < 320; x++) ps(x, y, rmp(pal(['#0e1a12', '#16281c', '#203a28', '#2e5038']), 1.6 + Math.sin(x * 0.55) * 1.1 + (h2(x, y, 5) - 0.5) * 0.3, x, y));
    for (let x = 282; x < 320; x++) ps(x, 50, H('#c8a040'));
    // el mantel granate con sus pliegues, el borde de pasamanería y el tapete de ganchillo bajo la bola
    for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 2 + Math.sin(x * 0.11 + Math.sin(y * 0.05) * 2) * 0.7 - Math.abs(x - 160) / 260 + (y - 112) / 120 + (h2(x, y, 6) - 0.5) * 0.3; ps(x, y, rmp(MANT, v, x, y)); }
    for (let x = 0; x < 320; x++) { ps(x, 112, H('#b08030')); ps(x, 113, (x >> 1) % 2 ? H('#7a5420') : H('#e0b850')); }
    for (let a = 0; a < 6.28; a += 0.02) for (const [rx, ry] of [[46, 10], [40, 8.5], [34, 7]]) if (Math.floor(a * 40) % 3 !== 0) ps(BX + Math.cos(a) * rx, 122 + Math.sin(a) * ry, H('#e8e0d0'));
    // las cartas en abanico (estrella, luna, sol) y la campanilla
    for (let k = 0; k < 3; k++) { const x = 34 + k * 14, y = 132 - k * 2; rr(x - 1, y - 1, x + 13, y + 20, K); rr(x, y, x + 12, y + 19, H('#e8dcc0')); rr(x + 1, y + 1, x + 11, y + 18, H('#2a3a6a'));
      if (k === 0) { R.icono('X', x + 4, y + 7, H('#f0c040'), K, 1); } else if (k === 1) { R.disco(x + 6, y + 9, 3, H('#e8e0d0')); R.disco(x + 7, y + 8, 3, H('#2a3a6a')); } else { R.disco(x + 6, y + 9, 3, H('#f0c040')); for (let q = 0; q < 8; q++) ps(x + 6 + Math.cos(q * 0.78) * 5, y + 9 + Math.sin(q * 0.78) * 5, H('#f0c040')); } }
    for (let j = 0; j < 10; j++) { const w = 2 + ri(j * 0.5); rr(100 - w, 124 + j, 100 + w, 124 + j, j === 9 ? K : rmp(LAT, 2.5 - j * 0.1, j, 1)); } ps(100, 122, K); ps(100, 123, LAT[3]); ps(98, 126, LAT[4]);
    // el candelabro de latón de tres brazos
    rr(244, 130, 266, 133, K); rr(245, 130, 265, 132, LAT[2]); rr(253, 82, 257, 130, K); rr(254, 82, 256, 129, LAT[3]); ps(254, 90, LAT[4]);
    for (const [cx, cy] of [[238, 80], [255, 72], [272, 80]]) { rr(cx - 4, cy, cx + 4, cy + 3, K); rr(cx - 3, cy + 1, cx + 3, cy + 2, LAT[2]); rr(cx - 2, cy - 12, cx + 2, cy, K); rr(cx - 1, cy - 11, cx + 1, cy - 1, H('#f0ead8')); ps(cx - 1, cy - 9, H('#ffffff')); }
    R.linea(238, 84, 255, 92, K); R.linea(272, 84, 255, 92, K); R.linea(238, 83, 255, 91, LAT[3]); R.linea(272, 83, 255, 91, LAT[3]);
    // el pie de la bola: tres garras de latón
    for (let j = 0; j < 10; j++) { const w = 12 + j; rr(BX - w, 110 + j, BX + w, 110 + j, j === 9 ? K : rmp(LAT, 2.4 - j * 0.12 + (j < 2 ? 1 : 0), j, j)); }
    for (const dx of [-18, 0, 18]) { R.disco(BX + dx, 121, 3, K); R.disco(BX + dx, 120, 2, LAT[3]); }
    // la taza de té en su platillo, el reloj de bolsillo con su cadena y el pebetero
    elipse(124, 156, 13, 3, K); elipse(124, 155, 12, 2, H('#e8e0d0')); rr(116, 140, 132, 154, K); rr(117, 141, 131, 153, H('#f4f0e8')); rr(117, 141, 131, 143, H('#5a2e1a')); rr(119, 147, 129, 148, H('#3a6ab0')); rr(132, 144, 136, 150, K); rr(133, 145, 135, 149, H('#f4f0e8')); ps(118, 145, H('#ffffff'));
    R.disco(92, 160, 7, K); R.disco(92, 160, 6, LAT[3]); R.disco(92, 160, 4, H('#f4f0e4')); R.linea(92, 160, 92, 157, K); R.linea(92, 160, 94, 160, K); for (let q = 0; q < 16; q++) ps(99 + q, 160 + Math.sin(q * 0.5) * 3, q % 2 ? LAT[4] : LAT[2]);
    rr(282, 136, 300, 146, K); rr(283, 137, 299, 145, LAT[2]); rr(283, 137, 299, 138, LAT[4]); for (let x = 285; x < 298; x += 3) ps(x, 141, K); rr(288, 132, 294, 136, K); rr(289, 133, 293, 135, LAT[3]);
  });
  for (let k = 0; k < 6; k++) { const u = (t * 0.3 + k / 6) % 1; tine(291 + Math.sin(u * 7 + k) * (2 + u * 5), 130 - u * 70, H('#c8b8d8'), 0.45 * (1 - u)); }
  // la sombra del médium en la pared, que se mece con las velas
  const sw = Math.sin(t * 1.3) * 3; for (let y = 22; y < 112; y++) for (let x = 70; x < 130; x++) { const d1 = Math.hypot(x - 100 - sw, y - 46) / 20, d2 = ((x - 100 - sw) / 34) ** 2 + ((y - 100) / 30) ** 2; if (d1 < 1 || (d2 < 1 && y > 72)) tine(x, y, K, 0.45); }
  // las velas: llamas que tiemblan y su luz
  for (const [cx, cy] of [[238, 68], [255, 60], [272, 68]]) { const f = Math.sin(t * 13 + cx) > 0 ? 1 : 0; luz(cx, cy - 2, 34, H('#ffd890'), 0.18); rr(cx - 1, cy - 5 - f, cx + 1, cy - 1, H('#ffd890')); ps(cx, cy - 6 - f, H('#fff4c0')); ps(cx, cy - 2, H('#ffffff')); }
  // LA BOLA: vidrio con la refracción del mantel, el reflejo de las velas, el vaho y lo que se ve al limpiarla
  const emp = tramo(t, TH.CORTE5 + 0.05, TH.CORTE5 + 0.6), lim = ease(tramo(t, TH.CORTE5 + 1.0, TH.SCENE + 0.3)), vis = tramo(t, TH.SCENE - 0.2, TH.SCENE + 0.8);
  for (let j = -BR; j <= BR; j++) for (let i = -BR; i <= BR; i++) { const d = Math.hypot(i, j) / BR; if (d > 1.02) continue; const x = BX + i, y = BY + j;
    if (d > 0.97) { ps(x, y, K); continue; }
    let c = rmp(pal(['#0e0a20', '#1a1434', '#2a2250', '#3c3470', '#544a90']), 2.2 - j / BR * 1.2 - d * 0.8 + (h2(x, y, 2) - 0.5) * 0.3, x, y);
    if (j > BR * 0.45) c = mez(c, MANT[2], 0.5);
    const lc = Math.hypot(i - 8, j - 10), limpio = lc < lim * BR * 1.5 + Math.sin(Math.atan2(j - 10, i - 8) * 5 + 1) * 3;
    if (vis > 0 && limpio) { // la visión: el claro de noche con el roble y dos faroles
      let v = j < 6 ? mez(H('#101838'), H('#283a6a'), (j + BR) / (BR + 6)) : H('#0e140e');
      if (Math.hypot(i + 12, j + 14) < 4) v = H('#e8ecd8');
      if (Math.hypot(i - 6, j + 4) < 10 && j < 6) v = h2(i, j, 8) > 0.5 ? H('#1c3a22') : H('#122a18');
      if (Math.abs(i - 6) <= 1 && j >= 4 && j < 14) v = H('#2a1e14');
      if (j >= 13 && j <= 15 && Math.abs(i - 10) < 6) v = H('#050404');
      for (const [fx, fy, k] of [[-8, 13, 0], [18, 12, 1]]) if (Math.hypot(i - fx, j - fy) < 2.2) v = Math.sin(t * 9 + k * 3) > 0 ? H('#ffd890') : H('#ffb850');
      c = mez(c, v, Math.min(1, vis * 1.2)); }
    if (emp > 0 && !limpio) c = mez(c, (B4M[((y & 3) << 2) | (x & 3)] + 0.5) / 16 < 0.6 ? H('#d8d0e4') : H('#b8b0c8'), 0.75 * emp);
    if (Math.hypot(i + 13, j + 13) < 7 && Math.hypot(i + 10, j + 10) > 6) c = mez(c, H('#ffffff'), 0.75);
    ps(x, y, c); }
  for (const [rx, ry] of [[18, -18], [22, -12], [25, -16]]) ps(BX + rx, BY + ry, H('#ffd890'));
  if (emp > 0) for (let k = 0; k < 7; k++) { const gx = BX - 20 + ri(h2(k, 1, 12) * 40), gy = BY - 10 + ri(h2(k, 2, 12) * 30) + ri(((t * 4 + k) % 3)); if (Math.hypot(gx - BX - 8, gy - BY - 10) > lim * BR * 1.5) { ps(gx, gy, H('#ffffff')); ps(gx, gy + 1, H('#a8a0c0')); } }
  // ATOM: entra por el mantel, frota el cristal con el brazo y luego se aparta y lo enseña
  const ent = ease(tramo(t, TH.CORTE5 + 0.15, TH.CORTE5 + 0.95)), frota = t > TH.CORTE5 + 0.95 && t < TH.SCENE + 0.3, sale = ease(tramo(t, TH.SCENE + 0.3, TH.SCENE + 0.9));
  const ax = lerp(lerp(370, 212, ent), 214, sale) + (frota ? Math.sin(t * 16) * 2.5 : 0), ay = 138 + (frota ? ri(Math.sin(t * 16 + 1) * 1.5) : 0);
  AT.atom(R, ax, ay, t, { s: 3, dir: -1, pose: ent < 1 ? 'camina' : frota ? 'sostiene' : sale > 0 && sale < 1 ? 'camina' : 'senala', cara: frota ? 'normal' : t > TH.SCENE + 0.9 ? 'sonrisa' : 'normal' });
  if (frota && Math.sin(t * 16) > 0.6) for (let k = 0; k < 2; k++) ps(ax - 34 - k * 3, ay - 30 + k * 4, H('#ffffff'));
  if (t > TH.SCENE + 0.3) { const p = pop(t, TH.SCENE + 0.3, 0.3); if (p > 0) destello(BX - 16, BY - 18, ri(3 * Math.min(1, p)) + 1); }
};

// ── H6 · el claro de Goose Creek de noche: faroles y palas; George cava, Clayton alumbra; el médium llega en trance ──
const farolMano = (x, y, t) => { const f = Math.sin(t * 11 + x) > 0 ? 1 : 0; luz(x, y + 5, 26, H('#ffd890'), 0.28 + 0.04 * f);
  R.linea(x, y, x, y + 2, K); rr(x - 3, y + 2, x + 3, y + 3, K); rr(x - 3, y + 4, x + 3, y + 11, K); rr(x - 2, y + 4, x + 2, y + 10, H('#ffd890')); rr(x - 1, y + 6 - f, x + 1, y + 9, H('#fff4c0')); rr(x - 3, y + 11, x + 3, y + 12, H('#3a3a42')); ps(x - 2, y + 5, H('#ffffff')); };
const H6 = (t) => {
  const cava = tramo(t, TH.SHOVELS - 0.2, TH.POINTING), o = { encuadre: 'claro', hoyo: lerp(0.18, 0.7, cava), faroles: true };
  T.bedford(R, t, o);
  const fase = ((t - TH.WITH) / 0.8) % 1, sube = Math.sin(fase * Math.PI * 2), cv = t > TH.SHOVELS - 0.2;
  const g = R.actor(BL.georgeBL, 160, 150, t, { dir: 1, sostiene: cv ? [176, ri(128 + 5 * sube)] : [174, 132] });
  pala(g.mano[0], g.mano[1], g.mano[0] + 11, ri(g.mano[1] + 19 + (cv ? 2 * sube : 0)));
  if (cv && fase > 0.55 && fase < 0.95) { const u = (fase - 0.55) / 0.4; for (let k = 0; k < 3; k++) ps(lerp(190, 172, u) + k, 150 - Math.sin(u * Math.PI) * 16 + k, H('#5a3a1e')); }
  const c = R.actor(BL.claytonBL, 124, 150, t, { dir: 1, sostiene: [141, ri(118 + Math.sin(t * 2) * 1.5)], sonrisa: t > TH.MONTVALE });
  farolMano(c.mano[0] + 1, c.mano[1] + 1, t);
  // el médium: llega despacio desde la izquierda, como sonámbulo, y en «trance» levanta el dedo
  const um = ease(tramo(t, TH.GOOSE, TH.MAN + 0.2)), xm = ri(lerp(-22, 68, um));
  R.actor(BL.mediumBL, xm, 150, t, { dir: 1, anda: um > 0 && um < 1, dedo: t > TH.TRANCE - 0.1 || (um > 0 && um < 1), quieto: um >= 1 && t < TH.TRANCE - 0.1 });
  if (um > 0) for (let k = 0; k < 3; k++) { const a = t * 3 + k * 2.09; ps(xm + 7 + Math.cos(a) * 7, 116 + Math.sin(a) * 2, H('#d8b0ff')); }
  T.bedfordDelante(R, t, o);
};

// ── H7 · las raíces de cerca (fondo local): el brazo del médium señala el hoyo en «hollow» y las raíces en «roots»;
// la pala de George se clava en «ground»; en «oak» cae una bellota al hoyo ──
const TIER = pal(['#140c08', '#24180e', '#382614', '#4e361e', '#6a4a2a', '#8a6440']);
const CORT = pal(['#1a120c', '#2a1e14', '#3e2c1e', '#58402a', '#74583a']);
const RAICES = [[[214, 132], [190, 136], [166, 130], [140, 134]], [[222, 140], [200, 146], [176, 150], [150, 147], [126, 152]], [[236, 146], [214, 154], [196, 160], [170, 162]], [[248, 150], [262, 162], [268, 176]]];
const polil = (pts, w, c, cL) => { for (let s = 0; s < pts.length - 1; s++) { const [x0, y0] = pts[s], [x1, y1] = pts[s + 1], n = ri(Math.hypot(x1 - x0, y1 - y0)), ww = w * (1 - (s / pts.length) * 0.5);
  for (let q = 0; q <= n; q++) { const x = lerp(x0, x1, q / n), y = lerp(y0, y1, q / n); for (let j = -ww - 1; j <= ww; j++) ps(x, y + j, j < -ww + 0.5 ? K : j < -ww + 1.5 ? cL : j >= ww - 0.5 ? K : c); } } };
const H7 = (t) => {
  fijo('h7', () => {
    for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(NOCHE, 0.6 + y / 40 + (ns(x * 0.05, y * 0.05) - 0.5) * 0.6, x, y));
    for (let k = 0; k < 30; k++) { const x = ri(h2(k, 1, 40) * 270), y = ri(h2(k, 2, 40) * 40); ps(x, y, k % 4 ? H('#8a94c0') : H('#e8ecf8')); }
    for (let k = 0; k < 18; k++) { const x = ri(h2(k, 3, 41) * 330) - 5, w = 3 + ri(h2(k, 4, 41) * 6), far = k % 2, y0 = 6 + ri(h2(k, 5, 41) * 20); for (let y = y0; y < 96; y++) for (let i = 0; i < w; i++) ps(x + i, y, i === 0 && !far ? H('#2e3c5e') : far ? (i === 0 ? H('#24304c') : H('#18203a')) : (h2(x + i, y >> 2, 6) > 0.8 ? H('#141a2a') : H('#0a0e1a')));
      if (!far) for (let q = 0; q < 2; q++) { const by = y0 + 14 + q * 18, dx = q % 2 ? 1 : -1; for (let i = 0; i < 12; i++) ps(x + (dx > 0 ? w + i : -i), by - ri(i * 0.5), H('#0e1424')); } }
    for (let y = 70; y < 98; y++) for (let x = 0; x < 320; x++) if (ns(x * 0.08, y * 0.2) > 0.55 - (y - 70) / 60) ps(x, y, H('#0e1a18'));
    for (let y = 92; y < 100; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(pal(['#0e1628', '#1a2640', '#2a3a5a']), 1 + Math.sin(x * 0.3 + y) * 0.6, x, y));
    for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 1.2 + (y - 100) / 50 + (ns(x * 0.12, y * 0.12) - 0.5) * 1.6 + (h2(x, y, 9) > 0.93 ? 1 : 0); ps(x, y, rmp(TIER, v, x, y)); }
    for (let k = 0; k < 60; k++) { const x = ri(h2(k, 1, 42) * 320), y = 104 + ri(h2(k, 2, 42) * 74); const c = [H('#6a3a1a'), H('#8a5a22'), H('#5a4a1e'), H('#3a2a14')][k % 4]; ps(x, y, c); ps(x + 1, y, c); ps(x, y - 1, mez(c, H('#ffffff'), 0.2)); }
    // el hoyo al pie del roble
    for (let j = -16; j <= 16; j++) for (let i = -48; i <= 48; i++) { const e = (i / 48) ** 2 + (j / 16) ** 2; if (e > 1) continue; ps(150 + i, 142 + j, e > 0.86 ? (j < 0 ? TIER[4] : TIER[1]) : rmp(pal(['#050302', '#0e0805', '#1a100a', '#2a1a10']), 1.2 + j / 16 * 1.5 + (1 - e) * 0.5 - (j < -6 ? 0.8 : 0), i, j)); }
    // el montón de tierra con el pico clavado, a la izquierda
    for (let j = 0; j < 22; j++) { const w = ri(30 * Math.sqrt(1 - (j / 22) ** 2)); for (let i = -w; i <= w; i++) ps(78 + i, 140 - j, rmp(TIER, 2.4 + (i < 0 ? 0.8 : -0.4) + (h2(i, j, 43) - 0.5) * 1.2, i, j)); }
    R.linea(82, 118, 98, 92, K); R.linea(81, 118, 97, 92, H('#8a6238')); for (let i = -9; i <= 9; i++) ps(97 + i, 92 + Math.abs(i) * 0.3, i === 0 ? K : H('#7a8290'));
    // el tronco del roble: corteza de surcos hondos, ensanchado abajo (deja libre la esquina de Atom)
    for (let y = 0; y < 158; y++) { const ancho = 34 + Math.max(0, (y - 90)) * 0.5, x0 = ri(236 - ancho), x1 = ri(236 + ancho * 0.55);
      for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), v = 1.4 + u * 2 - (u > 0.85 ? 1.5 : 0) + (ns(x * 0.35, y * 0.04) > 0.62 ? -1.3 : 0) + (h2(x, y, 44) - 0.5) * 0.4; ps(x, y, x === x0 || x === x1 ? K : rmp(CORT, v, x, y)); } }
    for (const r of RAICES) polil(r, 3.2, CORT[3], CORT[4]);
    R.disco(140, 134, 4, K); R.disco(140, 134, 3, H('#c8a070')); ps(139, 133, H('#e8c898'));
  });
  // el farol en el suelo, a la izquierda: su luz cálida que tiembla
  const f = Math.sin(t * 11) > 0 ? 1 : 0; luz(46, 148, 120, H('#ffc870'), 0.32 + 0.04 * f);
  rr(40, 140, 52, 160, K); rr(41, 141, 51, 158, H('#ffd890')); rr(44, 145 - f, 48, 155, H('#fff4c0')); rr(39, 138, 53, 140, H('#2a2a30')); rr(39, 159, 53, 161, H('#2a2a30')); R.linea(46, 132, 46, 138, K); ps(42, 143, H('#ffffff'));
  for (let k = 0; k < 3; k++) { const a = t * (4 + k) + k * 2; ps(46 + Math.cos(a) * (10 + k * 4), 140 + Math.sin(a * 1.3) * 8, H('#e8e0c8')); }
  for (let k = 0; k < 6; k++) { const x = (k * 53 + t * 6 * (k % 2 ? 1 : -1) + 320) % 320, y = 40 + ((k * 23) % 50) + Math.sin(t * 2 + k) * 4; if (Math.sin(t * 3 + k * 1.7) > 0.2 && x < 200) ps(x, y, H('#d8ff70')); }
  for (let k = 0; k < 5; k++) if (Math.sin(t * 2.5 + k * 1.9) > 0.6) ps(20 + k * 60 + ri(Math.sin(t + k) * 6), 95, H('#8aa0d0'));
  // tierra que se desmorona dentro del hoyo
  for (let k = 0; k < 3; k++) { const u = (t * 0.8 + k / 3) % 1; ps(120 + k * 22, 128 + u * 18, TIER[4]); }
  // en «roots»: las raíces se encienden un momento; en «oak»: la bellota cae y bota en el hoyo
  const rz = tramo(t, TH.ROOTS - 0.1, TH.ROOTS + 0.2) * (1 - tramo(t, TH.ROOTS + 1, TH.ROOTS + 1.6));
  if (rz > 0) for (const r of RAICES) for (let s = 0; s < r.length - 1; s++) { const [x0, y0] = r[s], [x1, y1] = r[s + 1], n = ri(Math.hypot(x1 - x0, y1 - y0)); for (let q = 0; q <= n; q += 2) tine(lerp(x0, x1, q / n), lerp(y0, y1, q / n) - 4, H('#ffe080'), 0.8 * rz); }
  const bu = tramo(t, TH.OAK - 0.4, TH.OAK + 0.3); if (bu > 0) { const by = bu < 1 ? lerp(-4, 146, bu * bu) : 146 - Math.abs(Math.sin((t - TH.OAK - 0.3) * 9)) * 6 * Math.max(0, 1 - (t - TH.OAK - 0.3) * 1.5), bx = lerp(200, 168, bu);
    R.disco(ri(bx), ri(by), 3, K); R.disco(ri(bx), ri(by), 2, H('#a86a2a')); rr(bx - 2, by - 3, bx + 2, by - 2, H('#5a3a1a')); ps(bx - 1, by - 1, H('#e8a050')); }
  // la pala de George se clava en «ground»
  const cl2 = tramo(t, TH.GROUND - 0.25, TH.GROUND), bx2 = lerp(196, 182, cl2), by2 = lerp(92, 128, cl2);
  pala(bx2 + 40, -10, bx2, by2);
  if (t > TH.GROUND) { const u = tramo(t, TH.GROUND, TH.GROUND + 0.6); if (u < 1) for (let k = 0; k < 6; k++) ps(bx2 + (k - 3) * 4 * u, by2 + 4 - Math.sin(u * Math.PI) * (8 + k * 2), TIER[4]); }
  // el brazo del médium (manga de frac y puño blanco) entra en «hollow» y señala el hoyo; en «roots», las raíces
  const ent = ease(tramo(t, TH.HOLLOW - 0.5, TH.HOLLOW)), apunta = ease(tramo(t, TH.ROOTS - 0.3, TH.ROOTS + 0.1));
  const wx = ri(lerp(-24, lerp(38, 44, apunta), ent)), wy = ri(lerp(lerp(104, 98, apunta), 104, 0)) + ri(Math.sin(t * 2) * 1);
  if (ent > 0) T.brazo(R, wx - 40, wy - 22, wx, wy, '#1c1a24', 1, { codo: [wx - 20, wy - 6], puno: '#f2eee2' });
};

// ── H8 · una semana después, el valle de noche (fondo local): Clayton llega solo con la caja del detonador, la deja,
// en «alone» aprieta y en «dynamite» salta la tierra junto al roble lejano, sin nadie cerca ──
const SKY8 = new Array(320).fill(96);
const H8 = (t) => {
  fijo('h8', () => {
    for (let y = 0; y < 110; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(NOCHE, 0.3 + y / 22 + (ns(x * 0.03, y * 0.06) - 0.5) * 0.7, x, y));
    for (let k = 0; k < 70; k++) { const x = ri(h2(k, 1, 50) * 320), y = ri(h2(k, 2, 50) * 70); if (x > 272 && y < 48) continue; ps(x, y, k % 5 ? H('#6a74a0') : H('#dce2f4')); }
    // la luna menguante, baja a la izquierda
    R.disco(60, 34, 7, H('#e8ecd8')); R.disco(64, 31, 7, rmp(NOCHE, 0.3 + 31 / 22, 64, 31)); luz(58, 36, 18, H('#c8d0e8'), 0.15);
    // los picos de Otter, lejos
    for (let x = 0; x < 320; x++) { const y = ri(96 - 30 * Math.exp(-(((x - 112) / 26) ** 2)) - 22 * Math.exp(-(((x - 186) / 30) ** 2)) - 6 * Math.sin(x * 0.05)); SKY8[x] = y;
      for (let j = y; j < 110; j++) ps(x, j, j === y ? H('#4a5680') : rmp(pal(['#141c34', '#1c2644', '#26325a']), 2 - (j - y) / 14 + (x < 112 ? 0.4 : 0), x, j)); }
    // las lomas con la línea de árboles y la loma lejana del roble
    for (let x = 0; x < 320; x++) { const y = ri(108 - 6 * Math.sin(x * 0.03 + 1) - 10 * Math.exp(-(((x - 222) / 40) ** 2)) - (h2(x >> 2, 0, 51) > 0.5 ? 2 : 0));
      for (let j = y; j < 132; j++) ps(x, j, rmp(pal(['#0a1210', '#101c18', '#182820']), 1.6 - (j - y) / 20 + (h2(x, j, 52) - 0.5) * 0.5, x, j)); }
    R.linea(222, 98, 222, 92, H('#0a0c0a')); R.disco(222, 89, 6, H('#0a0e0c')); R.disco(218, 91, 4, H('#0a0e0c')); R.disco(226, 91, 4, H('#0a0e0c')); for (let i = -6; i <= 6; i++) ps(222 + i, 83 + Math.abs(i) * 0.4, H('#2a3a3a'));
    // la granja lejana con su ventana
    rr(118, 100, 132, 108, H('#0e1414')); for (let i = 0; i < 9; i++) rr(118 + i * 0.8, 100 - i, 132 - i * 0.8, 100 - i, H('#121818'));
    // el arroyo que serpentea por el fondo del valle
    for (let x = 0; x < 320; x++) { const y = ri(118 + Math.sin(x * 0.035) * 4); rr(x, y, x, y + 1, H('#2a3a5a')); }
    // la loma de delante: hierba oscura con matas, piedras y un trozo de cerca de troncos
    for (let y = 126; y < 180; y++) for (let x = 0; x < 320; x++) { const borde = 130 + ri(Math.sin(x * 0.04) * 3); if (y < borde) continue; ps(x, y, rmp(pal(['#060a08', '#0c1410', '#142018', '#1e2e22']), 1.2 + (ns(x * 0.1, y * 0.15) - 0.5) * 1.8 + (y - 130) / 60, x, y)); }
    for (let k = 0; k < 40; k++) { const x = ri(h2(k, 1, 53) * 320), y = 134 + ri(h2(k, 2, 53) * 44); for (let q = 0; q < 4; q++) R.linea(x + q - 2, y, x + q - 3 + (q % 2) * 2, y - 4 - (q % 2) * 2, H('#1e3424')); }
    for (const [x, y, w] of [[240, 164, 9], [280, 150, 6], [30, 170, 7]]) { elipse(x, y, w, ri(w * 0.6), K); elipse(x, y, w - 1, ri(w * 0.6) - 1, H('#2a3038')); elipse(x - 2, y - 2, ri(w * 0.5), 1, H('#4a5260')); }
    for (const x of [6, 42]) { rr(x - 2, 118, x + 2, 156, K); rr(x - 1, 119, x + 1, 155, H('#3a2e22')); }
    for (const y of [126, 140]) { R.linea(0, y, 50, y + 3, K); R.linea(0, y + 1, 50, y + 4, H('#4a3a2a')); R.linea(0, y + 2, 50, y + 5, K); }
    // el cable del detonador, de la caja hasta el roble lejano (entre la hierba)
    let px = 126, py = 160; for (let q = 1; q <= 60; q++) { const u = q / 60, x = lerp(126, 222, u) + Math.sin(u * 9) * 6 * (1 - u), y = lerp(160, 101, Math.pow(u, 0.7)); if (q % 2) R.linea(ri(px), ri(py), ri(x), ri(y), H('#3a2a1e')); px = x; py = y; }
  });
  // las nubes de noche (tres tonos, tres velocidades), solo en el cielo
  const m = (x, y) => x >= 0 && x < 320 && y < SKY8[x] - 1 && !(x > 274 && y < 46);
  for (const [k, v, y, w] of [[0, 2.2, 22, 46], [1, 3.6, 52, 36], [2, 5.4, 70, 30]]) nube(((k * 120 + t * v) % 400) - 40, y, w, NUBN, m);
  for (let k = 0; k < 12; k++) if (Math.sin(t * 4 + k * 3.1) > 0.85) { const x = ri(h2(k, 1, 50) * 260), y = ri(h2(k, 2, 50) * 60); ps(x, y, H('#ffffff')); }
  if (Math.sin(t * 0.7) > -0.3) rr(124, 103, 126, 105, H('#ffd890'));
  for (let x = 0; x < 320; x += 7) if (Math.sin(t * 3 + x) > 0.8) ps(x, ri(118 + Math.sin(x * 0.035) * 4), H('#8aa0d0'));
  for (let k = 0; k < 7; k++) { const x = (k * 47 + Math.sin(t * 0.7 + k) * 10 + 320) % 320, y = 140 + (k * 17) % 34 + Math.sin(t * 1.3 + k) * 3; if (Math.sin(t * 2.4 + k * 2) > 0.1) { ps(x, y, H('#d8ff70')); tine(x + 1, y, H('#d8ff70'), 0.4); } }
  // EL FOGONAZO lejano, junto al roble: resplandor, tierra y piedras en parábola, humo; los pájaros huyen
  const bo = t - TH.DYNAMITE - 0.05;
  if (bo > 0) { const g = Math.max(0, 1 - bo / 0.8); luz(222, 98, 130, H('#ffb860'), 0.5 * g + 0.05); luz(222, 98, 60, H('#fff4c0'), 1.0 * g + 0.15); if (bo < 0.15) R.disco(222, 98, 6, H('#ffffff'));
    for (let k = 0; k < 40; k++) { const a = -Math.PI / 2 + (h2(k, 1, 54) - 0.5) * 1.8, v = 34 + h2(k, 2, 54) * 46, x = 222 + Math.cos(a) * v * bo, y = 98 + Math.sin(a) * v * bo + 70 * bo * bo; if (y < 104) rr(x, y, x + 1, y + 1, k % 3 ? H('#5a3a20') : H('#ffd890')); }
    for (let k = 0; k < 10; k++) { const u = Math.min(1, bo * 0.8) * (0.4 + k / 16), r = 3 + k * 0.6 * Math.min(1, bo); R.disco(ri(222 + Math.sin(k * 1.7 + t) * 4 * u), ri(96 - u * 60), ri(r * 1.4), mez(H('#3a3440'), H('#8a8090'), k / 10)); }
    for (let k = 0; k < 3; k++) { const x = 222 + bo * (30 + k * 14), y = 84 - bo * (10 + k * 5), a = Math.sin(t * 14 + k) > 0; ps(x, y, K); ps(x - 1, y - (a ? 1 : 0), K); ps(x + 1, y - (a ? 1 : 0), K); } }
  // el búho en el poste de la cerca: parpadea y en el fogonazo vuelve la cabeza
  { const vb = bo > 0.05; elipse(42, 112, 4, 5, K); elipse(42, 112, 3, 4, H('#5a4a3a')); elipse(42, 113, 2, 2, H('#8a7a5a')); ps(40, 107, K); ps(44, 107, K);
    if ((t % 3.1) > 0.15) { ps(vb ? 42 : 41, 110, H('#ffd040')); ps(vb ? 44 : 43, 110, H('#ffd040')); } }
  // CLAYTON, solo: llega con la caja del detonador, la deja, la conecta y aprieta
  const ul = ease(tramo(t, TH.AND_WEEK + 0.1, TH.CANT - 0.1)), x = ri(lerp(-22, 102, ul)), deja = t > TH.CANT - 0.05, empuja = t > TH.ALONE - 0.1;
  const baja = tramo(t, TH.DYNAMITE - 0.35, TH.DYNAMITE - 0.05);
  const a = R.actor(BL.claytonBL, x, 162, t, { dir: 1, anda: ul > 0 && ul < 1, sostiene: !deja ? true : empuja ? [116, ri(146 + baja * 5)] : t > TH.GOING ? null : null, dedo: deja && !empuja && t > TH.GOING - 0.1, enfado: deja && t < TH.GO + 0.3, brazos: bo > 0.2, sorpresa: bo > 0.1 });
  const caja = (cx, cy, pl) => { rr(cx - 7, cy - 8, cx + 7, cy, K); rr(cx - 6, cy - 7, cx + 6, cy - 1, H('#7a5232')); rr(cx - 6, cy - 7, cx + 6, cy - 7, H('#9a6c44')); for (let i = 0; i < 3; i++) rr(cx - 4 + i * 3, cy - 5, cx - 3 + i * 3, cy - 2, H('#d83a2a'));
    rr(cx - 1, cy - 8 - pl, cx + 1, cy - 8, K); ps(cx, cy - 9 - pl + 1, H('#9aa2ae')); rr(cx - 5, cy - 10 - pl, cx + 5, cy - 9 - pl, K); rr(cx - 4, cy - 10 - pl, cx + 4, cy - 10 - pl, H('#9aa2ae')); };
  if (!deja) caja(a.mano[0] + 2, a.mano[1] + 6, 6); else caja(120, 161, ri(6 - baja * 5));
  if (deja && t > TH.GOING && t < TH.ALONE) R.linea(120, 160, 126, 160, H('#c8a040'));
};

const año = 1898;
const efectos = [[TH.SURVIVED, 'papel'], [TH.FEVER, 'pop'], [TH.AND1 + 0.3, 'pasos'], [TH.CLAYTON, 'papel'], [TH.WHO + 0.6, 'golpecito'], [TH.DESPERATE + 0.3, 'toc'],
  [TH.HYPNOTIZED, 'zumbido'], [TH.WHERE, 'brillo'], [TH.CORTE5 + 0.1, 'vapor'], [TH.SCENE, 'brillo'], [TH.SHOVELS + 0.2, 'golpecito'], [TH.GOOSE + 0.2, 'pasos'],
  [TH.GROUND, 'golpecito'], [TH.OAK + 0.3, 'toc'], [TH.AND_WEEK + 0.2, 'pasos'], [TH.CANT, 'golpecito'], [TH.DYNAMITE + 0.05, 'boom']];
T.rodar(E, R, [[0, H1], [TH.AND1, H2], [TH.WHO, H3], [TH.TURNED, H4], [TH.CORTE5, H5], [TH.WITH, H6], [TH.POINTING, H7], [TH.AND_WEEK, H8]], { cartela: '1898', efectos, año });
'''

CAB_HART = r'''// bl-hart (frase 19, cartela 1898). Ocho planos cortados en la voz inglesa:
// 1 · El mapa (T.mapa, zoom 2,7 sobre Virginia): de la ceniza de Lynchburg salen unos pocos folletos en «survived»;
//   donde caen brotan anillos rojos y palas, y el termómetro sube en «fever». Corta en «and two».
// 2 · La taberna de Buford (bedford taberna): llegan los hermanos Hart; Clayton alza el folleto en «Clayton», George la
//   pala en «George»; en «Hart» miran a los picos y sale la «?». Corta en «who».
// 3 · El bosque de día (bedford bosque): hoyos por todas partes; George cava y en «desperate» tira la pala; en «spot»
//   Clayton duda con el folleto. Corta en «turned».
// 4 · La sesión (buscadores sesion): los hermanos a la izquierda; el médium entra en trance en «hypnotized»; en «where»
//   alza los brazos y de la bola sube un roble. Corta tras «dig».
// 5 · La bola de cerca (fondo local): se empaña; GAG: Atom llega por el mantel y la limpia con el brazo; en «scene»
//   aparece dentro la noche con el roble y los faroles. Corta en «with lanterns».
// 6 · El claro de Goose Creek (bedford claro): George cava en «shovels», Clayton alumbra con el farol; el médium llega
//   en trance y levanta el dedo en «trance». Corta en «pointing».
// 7 · Las raíces de cerca (fondo local): el brazo del médium señala el hoyo en «hollow» y las raíces en «roots»; la
//   pala se clava en «ground»; una bellota cae en «oak». Corta en «and a week later».
// 8 · El valle de noche (fondo local): Clayton llega solo con la caja del detonador, la deja en «can't», aprieta en
//   «alone» y en «dynamite» salta la tierra junto al roble lejano, sin nadie cerca.'''

COMPARTIDO = r'''
// ════ BL-FRIEDMAN (y lo que congela bl-casi) ════
const GRIS = '#8a8a92', MARRON70 = '#6a4a30';
const SKYD = pal(['#4a7cc8', '#6492d6', '#80aae2', '#a0c2ec', '#c4daf4']), NUBD = pal(['#a8b8d0', '#d8e2ee', '#ffffff']);
const PIED = pal(['#6a6050', '#8a7e6a', '#a89c86', '#c4b8a0', '#dcd2bc', '#eee6d4']);
const VY = pal(['#566652', '#6a7c66', '#82947c', '#9aac92', '#b2c2a8']);
const WAL = pal(['#24160c', '#382214', '#50321c', '#6a4426', '#865a32']);
const ROB = pal(['#5a3c1e', '#7a5428', '#9a6e36', '#b88a48', '#d4a860']);
const OLIVA = pal(['#2a2818', '#363220', '#433e2a', '#504a34', '#5e5840']);
const FELT = pal(['#0a2a1a', '#103a24', '#164a2e', '#1e5c3a', '#287048']);
const BEIGE = pal(['#7a7262', '#948c7a', '#aea692', '#c6bea8', '#dcd4be']);
// el lápiz amarillo en la mano canónica: la punta en (x, y), el cuerpo hacia arriba a la derecha
const lapiz = (x, y) => { for (let i = 0; i < 13; i++) { const px = x + i, py = y - Math.round(i * 0.5); ps(px, py, i < 2 ? H('#3a3a3a') : i < 3 ? H('#e8c898') : i < 11 ? H('#e8c040') : H('#e88aa0')); ps(px, py + 1, i < 2 ? H('#3a3a3a') : i < 3 ? H('#c8a070') : i < 11 ? H('#a88020') : H('#c86a80')); } };
// la estilográfica: el plumín en (x, y), el cuerpo negro con su anillo dorado hacia arriba a la derecha
const pluma = (x, y) => { for (let i = 0; i < 14; i++) { const px = x + i * 0.75, py = y - i * 0.75; ps(px, py, i < 2 ? H('#e8c040') : i === 7 ? H('#e8c040') : H('#1a1a22')); ps(px + 1, py, i < 2 ? H('#a88020') : i === 7 ? H('#a88020') : H('#3a3a4a')); } };
// un coche negro de los años treinta (dir −1: mira a la izquierda), con las ruedas que giran
const coche30 = (x, suelo, t, dir = -1) => { const X = (dx) => ri(x + (dir < 0 ? dx : -dx)), x0 = (a, b) => Math.min(X(a), X(b)), x1 = (a, b) => Math.max(X(a), X(b));
  const N = H('#16161e'), NL = H('#3a3a4c'), CR = H('#c8ccd4');
  for (let i = -30; i <= 30; i++) tine(x + i, suelo + 1, K, 0.35 * (1 - (i / 31) ** 2));
  rr(x0(-26, 24), suelo - 15, x1(-26, 24), suelo - 6, K); rr(x0(-25, 23), suelo - 14, x1(-25, 23), suelo - 7, N); rr(x0(-25, 23), suelo - 14, x1(-25, 23), suelo - 13, NL);
  rr(x0(-8, 18), suelo - 26, x1(-8, 18), suelo - 14, K); rr(x0(-7, 17), suelo - 25, x1(-7, 17), suelo - 14, N); rr(x0(-7, 17), suelo - 25, x1(-7, 17), suelo - 24, NL);
  rr(x0(-5, 4), suelo - 23, x1(-5, 4), suelo - 17, H('#8ab0c8')); rr(x0(6, 15), suelo - 23, x1(6, 15), suelo - 17, H('#8ab0c8')); ps(X(-4), suelo - 22, H('#ffffff')); ps(X(7), suelo - 22, H('#ffffff'));
  rr(x0(-27, -25), suelo - 15, x1(-27, -25), suelo - 7, CR); for (let j = suelo - 14; j < suelo - 7; j += 2) ps(X(-26), j, K);
  R.disco(X(-23), suelo - 16, 2, K); ps(X(-23), suelo - 16, H('#fff4c0')); rr(x0(-26, 24), suelo - 6, x1(-26, 24), suelo - 6, CR);
  for (const dx of [-15, 13]) { const cx = X(dx), cy = suelo - 5; R.disco(cx, cy - 1, 7, K); R.disco(cx, cy - 2, 6, N); R.disco(cx, cy, 5, K); R.disco(cx, cy, 4, H('#2a2a30')); R.disco(cx, cy, 3, H('#e8e8e0')); R.disco(cx, cy, 2, H('#2a2a30'));
    const a = t * 12; ps(cx + ri(Math.cos(a) * 2), cy + ri(Math.sin(a) * 2), CR); ps(cx, cy, CR); } };

// ── F1 · el escritorio del jefe de cerca (buscadores sis mesa): un telegrama de verdad descifrado (✓ en «cracked»); la mano
// va a por la hojita de Beale que hace de cebo en una ratonera y, en «trap», ¡zas!: el cepo atrapa el lápiz ──
const F1 = (t) => {
  const o = { encuadre: 'sis', camara: 'mesa' }; T.buscadores(R, t, o);
  const sx = 52, sy = 134;
  for (let j = 0; j < 28; j++) tine(sx + 52, sy + 3 + j, K, 0.3); for (let i = 0; i < 50; i++) tine(sx + 3 + i, sy + 29, K, 0.3);
  rr(sx - 1, sy - 1, sx + 50, sy + 28, K); rr(sx, sy, sx + 49, sy + 27, H('#f2e8c8')); rr(sx, sy, sx + 49, sy + 3, H('#e8c070')); rr(sx + 2, sy + 1, sx + 12, sy + 2, H('#a87820'));
  const filas = ['4721 9035', '1187 6620', '3094 5571'], des = tramo(t, TF.EVEN, TF.CRACKED);
  for (let f = 0; f < 3; f++) { cifras(filas[f], sx + 4, sy + 6 + f * 7, H('#2a2a3a')); const u = cl(des * 3 - f); if (u > 0) rr(sx + 3, sy + 12 + f * 7, sx + 3 + ri(38 * u), sy + 12 + f * 7, H('#3a9a4a')); }
  const ok = pop(t, TF.CRACKED, 0.3); if (ok > 0) { luz(sx + 42, sy + 14, 14, H('#a0ff90'), 0.3 * Math.min(1, ok)); T.visto(R, sx + 34, sy + 6 + ri(3 * (1 - Math.min(1, ok))), 2); }
  // la ratonera, grande y clara sobre el cartapacio
  const mx = 196, my = 158, snap = t > TF.TRAP - 0.06, sv = snap && t < TF.TRAP + 0.5 ? ri(Math.sin((t - TF.TRAP) * 50) * 1) : 0;
  for (let i = -36; i <= 40; i++) { tine(mx + i + 3, my + 2, K, 0.4); tine(mx + i + 3, my + 3, K, 0.2); }
  rr(mx - 37, my - 13 + sv, mx + 37, my + sv, K); for (let y = my - 12; y < my; y++) for (let x = mx - 36; x <= mx + 36; x++) ps(x, y + sv, rmp(ROB, 3 + Math.sin(x * 0.45 + y * 0.3) * 0.5 + (y === my - 12 ? 1.4 : 0) + (y > my - 4 ? -1.2 : 0), x, y));
  for (const dx of [-28, -6, 28]) { rr(mx + dx, my - 12 + sv, mx + dx + 2, my - 12 + sv, H('#c8ccd4')); }
  R.disco(mx - 6, my - 13 + sv, 4, K); R.disco(mx - 6, my - 13 + sv, 3, H('#c8ccd4')); R.disco(mx - 6, my - 13 + sv, 1, H('#6a7080')); ps(mx - 7, my - 15 + sv, H('#ffffff'));
  rr(mx + 10, my - 15 + sv, mx + 26, my - 13 + sv, K); rr(mx + 11, my - 15 + sv, mx + 25, my - 14 + sv, H('#e0c040'));
  // el cebo: la hojita de Beale
  if (!snap) T.d_hoja(R, mx + 18, my - 23, { escala: 0.5, n: 1, t });
  const bar = (x0, y0, x1, y1) => { R.linea(ri(x0), ri(y0) + 1, ri(x1), ri(y1) + 1, K); R.linea(ri(x0), ri(y0), ri(x1), ri(y1), H('#f4f6fa')); };
  if (!snap) { bar(mx - 6, my - 15, mx + 32, my - 15); bar(mx - 6, my - 10, mx + 32, my - 10); R.linea(mx + 32, my - 15, mx + 32, my - 10, H('#f4f6fa')); }
  // la mano: escribe en el telegrama, va a por la hojita y en «trap» se escapa; el lápiz se queda atrapado
  let wx, wy;
  const va = ease(tramo(t, TF.REAL + 0.6, TF.FELL + 0.3)), huye = ease(tramo(t, TF.TRAP - 0.02, TF.TRAP + 0.25));
  if (va <= 0) { const w = tramo(t, 0.3, TF.CRACKED); wx = sx + 20 + ri(w * 22) + ri(Math.sin(t * 17) * 2); wy = sy + 22 + ri(Math.sin(t * 6) * 3); }
  else { wx = lerp(sx + 42, mx + 34, va); wy = lerp(sy + 22, my - 16, va) + (t > TF.FELL + 0.3 && !snap ? ri(Math.sin(t * 9) * 1) : 0); }
  if (huye > 0) { wx = lerp(mx + 34, mx + 70, huye); wy = lerp(my - 16, my + 30, huye); }
  if (snap) { lapiz(mx - 16, my - 11); bar(mx - 6, my - 15, mx - 34, my - 15); bar(mx - 6, my - 10, mx - 34, my - 10); R.linea(mx - 34, my - 15, mx - 34, my - 10, H('#f4f6fa'));
    T.d_hoja(R, mx + 30 + ri(huye * 14), my - 26 - ri(Math.sin(huye * 3) * 10), { escala: 0.5, n: 1, t }); }
  else lapiz(ri(wx) - 16, ri(wy) + 3);
  T.brazo(R, ri(wx) + 30, 214, ri(wx), ri(wy), GRIS, -1, { codo: [ri(wx) + 44, ri(wy) + 30] });
  if (snap && t < TF.TRAP + 0.9) { const p = pop(t, TF.TRAP, 0.25); R.icono('!', mx - 18, ri(my - 46 - 4 * Math.min(1, p)), H('#ff5a4a'), K, 3); for (let k = 0; k < 8; k++) { const a = k * 0.785; R.linea(ri(mx - 20 + Math.cos(a) * 16), ri(my - 14 + Math.sin(a) * 7), ri(mx - 20 + Math.cos(a) * 24), ri(my - 14 + Math.sin(a) * 11), H('#fff0a0')); } }
};

// ── F2 · Washington, años treinta (fondo local): el edificio del ejército; Friedman llega con su cartera y sube la
// escalinata; el centinela saluda en «Army»; un coche negro pasa por delante; la bandera ondea ──
const SKY2 = new Array(320).fill(50);
const F2 = (t) => {
  fijo('f2', () => {
    for (let y = 0; y < 60; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(SKYD, 0.4 + y / 13 + (ns(x * 0.04, y * 0.08) - 0.5) * 0.6, x, y));
    // la fachada de piedra: sillares con sus juntas, cornisa y antepecho
    for (let y = 50; y < 136; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 50) / 6), j = (y - 50) % 6, junta = j === 5 || ((x + (fila % 2) * 9) % 18 === 0);
      ps(x, y, rmp(PIED, 3.2 + (ns(x * 0.1, y * 0.1) - 0.5) * 0.8 + (h2(x, y, 3) - 0.5) * 0.5 - (junta ? 1.2 : 0) + (y < 58 ? 0.8 : 0), x, y)); }
    for (let x = 0; x < 320; x++) { ps(x, 50, K); ps(x, 51, PIED[5]); ps(x, 57, PIED[1]); ps(x, 58, PIED[0]); if (x % 5 === 0) for (let j = 53; j < 56; j++) ps(x, j, PIED[1]); }
    // las ventanas de tres pisos (con su dintel y alféizar), menos en el pórtico
    for (const fy of [64, 88, 112]) for (let wx = 6; wx < 316; wx += 17) { if (wx > 96 && wx < 214) continue;
      rr(wx - 1, fy - 2, wx + 10, fy - 1, PIED[5]); rr(wx, fy, wx + 9, fy + 15, K);
      for (let j = 1; j < 15; j++) for (let i = 1; i < 9; i++) ps(wx + i, fy + j, i + j < 7 ? H('#7a9ac0') : j < 7 ? H('#3a5478') : H('#2a3a58'));
      rr(wx + 1, fy + 7, wx + 8, fy + 7, PIED[4]); rr(wx + 4, fy + 1, wx + 5, fy + 14, PIED[4]); if (h2(wx, fy, 4) > 0.6) rr(wx + 1, fy + 1, wx + 8, fy + 5, H('#d8d0b8'));
      rr(wx - 1, fy + 16, wx + 10, fy + 17, PIED[5]); rr(wx - 1, fy + 18, wx + 10, fy + 18, PIED[1]); }
    // el pórtico: frontón, entablamento y seis columnas estriadas; detrás, la puerta de bronce
    for (let y = 36; y < 50; y++) { const w = ri((y - 36) / 14 * 56); for (let x = 160 - w; x <= 160 + w; x++) ps(x, y, x === 160 - w || x === 160 + w || y === 49 ? K : rmp(PIED, 3.4 - (y - 36) / 20 + (h2(x, y) - 0.5) * 0.5, x, y)); }
    for (let x = 108; x <= 212; x++) for (let y = 58; y < 66; y++) ps(x, y, y === 58 || y === 65 ? K : y === 62 && x % 4 === 0 ? PIED[1] : PIED[4]);
    rr(110, 66, 210, 134, H('#6a6252')); for (let y = 66; y < 134; y++) for (let x = 110; x <= 210; x++) if (h2(x, y, 7) > 0.8) ps(x, y, H('#5a5244'));
    rr(148, 98, 172, 134, K); rr(149, 99, 171, 134, H('#5a4024')); rr(149, 99, 171, 108, H('#3a5478')); for (let x = 152; x < 170; x += 4) rr(x, 100, x, 107, H('#c8a040')); rr(160, 110, 160, 134, K); ps(157, 120, H('#e8c040')); ps(163, 120, H('#e8c040'));
    for (let k = 0; k < 6; k++) { const cx = 114 + k * 19 + (k > 2 ? 2 : 0); rr(cx - 1, 66, cx + 9, 69, K); rr(cx, 66, cx + 8, 68, PIED[5]);
      for (let y = 69; y < 130; y++) for (let i = 0; i <= 8; i++) ps(cx + i, y, i === 0 || i === 8 ? K : i % 2 ? PIED[i < 4 ? 5 : i < 7 ? 3 : 1] : PIED[i < 4 ? 4 : i < 7 ? 2 : 1]);
      rr(cx - 1, 130, cx + 9, 133, K); rr(cx, 130, cx + 8, 132, PIED[4]); }
    // la escalinata
    for (let s = 0; s < 6; s++) { const y = 134 + s * 3, w = 54 + s * 4; rr(160 - w, y, 160 + w, y + 2, PIED[4]); rr(160 - w, y, 160 + w, y, PIED[5]); rr(160 - w, y + 2, 160 + w, y + 2, PIED[1]); }
    // los olmos de los lados (la copa derecha empieza bajo la zona de Atom)
    for (const [cx, cy, r] of [[24, 84, 32], [298, 88, 28]]) { rr(cx - 3, cy, cx + 3, 150, K); rr(cx - 2, cy, cx + 2, 150, H('#4a3a2a')); rr(cx - 2, cy, cx - 1, 150, H('#6a543a'));
      for (let j = -r; j <= r; j++) for (let i = -r - 6; i <= r + 6; i++) { const d = Math.hypot(i / 1.15, j) / r + (ns((cx + i) * 0.2, (cy + j) * 0.2) - 0.5) * 0.4; if (d < 1 && cy + j > 52) ps(cx + i, cy + j, rmp(pal(['#1a3a1a', '#24502a', '#30683a', '#46844a', '#64a05a']), 3.2 - (j + r) / (2 * r) * 2.2 - (i > 0 ? 0.5 : 0) + (h2(cx + i, cy + j) - 0.5) * 1.2, cx + i, cy + j)); } }
    for (let x = 0; x < 320; x++) { let y = 50; if (x > 104 && x < 216) y = Math.min(50, 36 + ri(Math.abs(x - 160) / 56 * 14)); if (x < 62) y = Math.min(y, 54); if (x > 266) y = Math.min(y, 62); SKY2[x] = y; }
    // la acera, el bordillo y la calle con los raíles del tranvía
    for (let y = 150; y < 160; y++) for (let x = 0; x < 320; x++) ps(x, y, (x % 24 === 0 || y === 150) ? H('#8a8678') : rmp(pal(['#9a968a', '#b0ac9e', '#c4c0b2']), 1.4 + (h2(x, y, 9) - 0.5) * 1.2, x, y));
    rr(0, 160, 319, 161, H('#d8d4c8')); rr(0, 162, 319, 162, H('#5a5850'));
    for (let y = 163; y < 180; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(pal(['#2a2a30', '#36363e', '#44444c']), 1.2 + (h2(x, y, 10) - 0.5) * 1.4, x, y));
    for (const y of [169, 176]) { rr(0, y, 319, y, H('#8a8a94')); rr(0, y + 1, 319, y + 1, H('#1a1a20')); }
    // la farola y el mástil
    rr(90, 110, 92, 150, K); rr(91, 110, 91, 150, H('#2a3a2a')); rr(87, 147, 95, 150, H('#1a2a1a')); R.disco(91, 106, 5, K); R.disco(91, 106, 4, H('#f0ecd8')); ps(90, 104, H('#ffffff'));
    rr(237, 38, 238, 150, K); ps(238, 38, H('#c8ccd4')); R.disco(238, 36, 2, H('#e8c040')); rr(234, 147, 241, 150, H('#5a5850'));
  });
  const m = (x, y) => x >= 0 && x < 320 && y < SKY2[x] - 1;
  for (const [k, v, y, w] of [[0, 2, 12, 40], [1, 3.5, 26, 30], [2, 5.5, 38, 22]]) nube(((k * 140 + t * v) % 420) - 50, y, w, NUBD, m);
  for (let k = 0; k < 3; k++) { const x = ((t * 14 + k * 9) % 380) - 30, y = 24 + k * 3 + Math.sin(t * 2 + k) * 2, a = Math.sin(t * 12 + k) > 0; if (m(ri(x), ri(y))) { ps(x, y, K); ps(x - 1, y - (a ? 1 : 0), K); ps(x + 1, y - (a ? 1 : 0), K); } }
  // la bandera de 48 estrellas que ondea
  for (let i = 0; i < 24; i++) { const off = Math.sin(t * 6 - i * 0.45) * 1.6 * (i / 23); for (let j = 0; j < 14; j++) { const cant = i < 10 && j < 8;
    ps(239 + i, 40 + j + off, cant ? (i % 3 === 1 && j % 3 === 1 ? H('#ffffff') : H('#2a3a7a')) : (Math.floor(j / 2) % 2 ? H('#f0ece4') : H('#c8323a'))); } }
  // dos palomas en la escalinata
  for (const [px, py, k] of [[122, 143, 0], [198, 140, 1]]) { const b = Math.sin(t * 5 + k * 2) > 0.3 ? 1 : 0; rr(px, py - 2, px + 3, py, H('#7a7a88')); ps(px + 4, py - 3 + b, H('#5a5a68')); ps(px + 5, py - 3 + b, H('#e8a040')); ps(px + 1, py + 1, H('#e88a5a')); }
  // un transeúnte que cruza la acera
  const up = tramo(t, TF.BECAUSE, TF.AND_WHOSE); R.actor(BL.wardBL, ri(lerp(334, -24, up)), 160, t, { dir: -1, anda: up > 0 && up < 1, pal: { C: H('#4a5262'), c: H('#363c48') } });
  // el centinela en lo alto y FRIEDMAN que llega y sube
  R.actor(BL.alumnoBL, 182, 134, t, { dir: -1, dedo: t > TF.ARMY - 0.1 && t < TF.SERVICE + 0.6 });
  const uw = ease(tramo(t, TF.BECAUSE + 0.05, TF.MAN + 0.5)), us = tramo(t, TF.MAN + 0.5, TF.SERVICE - 0.1);
  const fx = ri(lerp(lerp(-18, 140, uw), 150, us)), fs = 156 - Math.floor(us * 8) * 3;
  const f = R.actor(BL.friedmanBL, fx, fs, t, { dir: t > TF.SERVICE && t < TF.N1930 + 0.4 ? 1 : t > TF.N1930 + 0.4 ? -1 : 1, anda: (uw > 0 && uw < 1) || (us > 0 && us < 1), sostiene: true, sonrisa: t > TF.SERVICE, dedo: t > TF.N1930 && t < TF.N1930 + 0.8 });
  rr(f.mano[0] - 4, f.mano[1] + 1, f.mano[0] + 4, f.mano[1] + 6, K); rr(f.mano[0] - 3, f.mano[1] + 2, f.mano[0] + 3, f.mano[1] + 5, H('#6a3e20')); ps(f.mano[0] - 2, f.mano[1] + 2, H('#8a5a30')); ps(f.mano[0], f.mano[1] + 3, H('#e8c040'));
  // el coche pasa por delante
  const uc = tramo(t, TF.SERVICE + 0.3, TF.AND_WHOSE - 0.1); if (uc > 0 && uc < 1) coche30(ri(lerp(370, -60, uc)), 177, t, -1);
};

// ── F3 · el laboratorio de 1940 (fondo local): el equipo ante su máquina de conmutadores; en «broke» las luces se ponen
// verdes, el candado se abre en «Japan» y el equipo salta; la máquina escribe el texto en claro ──
const F3 = (t) => {
  fijo('f3', () => {
    yeso(0, 0, 319, 116, VY, 3);
    vetas(0, 116, 319, 122, WAL, 2, 7);
    for (let y = 123; y < 180; y++) for (let x = 0; x < 320; x++) { const a = Math.floor((x + (y - 123) * 0.6) / 18), b = Math.floor((y - 123) / 9), cl0 = (a + b) % 2;
      ps(x, y, rmp(cl0 ? pal(['#2a3a2e', '#364a3a', '#425a46']) : pal(['#a8a088', '#bcb49c', '#ccc4ac']), 1.2 + (h2(x, y, 11) - 0.5) * 1.1 - (y - 123) / 90, x, y)); }
    // la pizarra con columnas de cifras de tiza
    rr(16, 22, 106, 86, K); vetas(17, 23, 105, 85, ROB, 4, 5); for (let y = 26; y < 82; y++) for (let x = 20; x < 103; x++) ps(x, y, rmp(pal(['#1e2a24', '#26342c', '#2e4034']), 1 + (ns(x * 0.1, y * 0.1) - 0.5) * 1.4, x, y));
    for (let c = 0; c < 5; c++) for (let f = 0; f < 6; f++) cifras(String(10 + ri(h2(c, f, 12) * 980)), 23 + c * 16, 29 + f * 8, H('#c8d0c4'));
    rr(18, 86, 104, 88, ROB[1]); rr(30, 84, 36, 85, H('#f0f0e8')); rr(80, 84, 90, 86, H('#4a3a2a'));
    // el almanaque de 1940
    rr(114, 26, 142, 64, K); rr(115, 27, 141, 63, H('#ece4cc')); rr(115, 27, 141, 34, H('#b83a32')); cifras('1940', 120, 28, H('#ffffff'));
    for (let f = 0; f < 4; f++) for (let c = 0; c < 6; c++) rr(118 + c * 4, 38 + f * 6, 120 + c * 4, 41 + f * 6, H('#a89c80'));
    // la radio de capilla en su repisa, la ventana con estor y el reloj
    rr(214, 46, 262, 48, ROB[1]); rr(222, 30, 240, 46, K); for (let y = 31; y < 46; y++) for (let x = 223; x < 240; x++) ps(x, y, Math.hypot(x - 231, y - 40) < 6 ? (y % 2 ? H('#c8a060') : H('#7a5a30')) : rmp(ROB, 2.5 + (y < 34 ? 1 : 0), x, y));
    rr(246, 38, 258, 46, H('#3a3a46')); rr(247, 39, 257, 45, H('#c8b898'));
    rr(268, 52, 314, 112, K); for (let y = 53; y < 112; y++) for (let x = 269; x < 314; x++) ps(x, y, y < 76 ? (y % 3 === 0 ? H('#b8a888') : H('#d8ccae')) : rmp(SKYD, 1 + (y - 76) / 14, x, y));
    for (let x = 270; x < 314; x++) if (Math.sin(x * 0.3) > 0.2) for (let y = 96; y < 112; y++) if (y > 104 - Math.sin(x * 0.2) * 6) ps(x, y, H('#3a6a3a'));
    rr(290, 53, 291, 112, H('#e8e4d4')); rr(268, 82, 314, 83, H('#e8e4d4'));
    // la mesa larga y la máquina de conmutadores con sus dos teletipos
    vetas(114, 102, 270, 108, ROB, 6, 3); rr(114, 108, 270, 109, K); for (const lx of [118, 264]) { rr(lx - 2, 109, lx + 2, 136, K); rr(lx - 1, 109, lx + 1, 135, ROB[1]); }
    rr(150, 112, 200, 130, H('#5a4a34')); rr(152, 114, 172, 128, H('#8a7656')); rr(176, 116, 198, 128, H('#7a6a4e'));
    rr(148, 52, 232, 102, K); for (let y = 53; y < 102; y++) for (let x = 149; x < 232; x++) ps(x, y, rmp(pal(['#2e3440', '#3e4654', '#505a6a', '#66728a', '#8a96aa']), 2.4 + (x < 152 ? 1.2 : 0) + (x > 228 ? -1 : 0) + (y > 98 ? -1 : 0) + (h2(x, y, 13) - 0.5) * 0.4, x, y));
    rr(152, 56, 228, 64, H('#1e222a')); for (let k = 0; k < 3; k++) rr(152, 68 + k * 10, 228, 76 + k * 10, H('#353c48'));
    for (const [x0, x1] of [[120, 146], [236, 262]]) { rr(x0, 90, x1, 102, K); rr(x0 + 1, 91, x1 - 1, 101, H('#22222a')); for (let r = 0; r < 3; r++) for (let x = x0 + 3; x < x1 - 2; x += 3) ps(x + (r % 2), 94 + r * 2, H('#c8c8d0')); rr(x0 + 2, 86, x1 - 2, 89, H('#3a3a44')); }
    for (const [ax, ay, bx, c] of [[150, 96, 136, '#c83a3a'], [150, 92, 140, '#3a6ac8'], [230, 96, 246, '#e8c040'], [230, 92, 250, '#3a9a4a']]) for (let q = 0; q <= 20; q++) { const u = q / 20; ps(lerp(ax, bx, u), ay + Math.sin(u * Math.PI) * 8, H(c)); }
  });
  // la lámpara del techo y su cono de luz
  R.linea(190, 0, 190, 16, K); for (let j = 0; j < 7; j++) rr(184 - j, 16 + j, 196 + j, 16 + j, j === 6 ? K : H(j < 2 ? '#4a7a4a' : '#2e5a34')); for (let y = 23; y < 110; y++) { const w = (y - 23) * 0.6; for (let x = ri(190 - w); x <= ri(190 + w); x++) if (((x + y) & 3) === 0) tine(x, y, H('#fff4c0'), 0.18); }
  const roto = t > TF.BROKE - 0.05;
  for (let k = 0; k < 12; k++) { const on = roto ? true : Math.sin(t * (5 + k) + k * 1.7) > 0.2, c = roto ? (Math.sin(t * 8 + k) > -0.6 ? H('#6aff6a') : H('#3ac83a')) : on ? (k % 3 ? H('#ffb040') : H('#ff5a4a')) : H('#4a3a2a'); rr(155 + k * 6, 58, 157 + k * 6, 61, c); }
  for (let rw = 0; rw < 3; rw++) for (let k = 0; k < 6; k++) { const cx = 160 + k * 12, cy = 72 + rw * 10, a = Math.floor(t * (roto ? 2 : 6) + k * 1.3 + rw) * 0.8; R.disco(cx, cy, 3, K); R.disco(cx, cy, 2, H('#9aa2ae')); R.linea(cx, cy, ri(cx + Math.cos(a) * 3), ri(cy + Math.sin(a) * 3), H('#e8c040')); }
  // el papel que sale del teletipo de la derecha, con el texto en claro (rayitas)
  const pap = roto ? tramo(t, TF.BROKE, TF.WAR) : 0, py0 = ri(86 - pap * 24);
  rr(240, py0, 258, 87, H('#f4efe0')); rr(240, py0, 240, 87, K); rr(258, py0, 258, 87, K); for (let y = py0 + 2; y < 86; y += 3) for (let x = 242; x < 256; x++) if (h2(x >> 1, y, 14) > 0.3) ps(x, y, H('#3a3a4a'));
  // el candado del cifrado: aparece cerrado y se abre en «broke»
  const pc = pop(t, TF.AND_WHOSE + 0.2, 0.3), fuera = tramo(t, TF.CIPHER + 0.6, TF.CIPHER + 1.0);
  if (pc > 0 && fuera < 1) { const cx = 190, cy = ri(36 - 4 * (1 - Math.min(1, pc)) - fuera * 8), ab = ease(tramo(t, TF.BROKE - 0.05, TF.BROKE + 0.25));
    if (ab > 0) luz(cx, cy, 24, H('#a0ff90'), 0.4 * ab);
    for (let a = 0; a <= 20; a++) { const p = Math.PI * a / 20, sx = cx + Math.cos(p) * 6 + ab * 6, sy = cy - 4 - Math.sin(p) * 7 - ab * 5; rr(sx - 1, sy - 1, sx + 1, sy + 1, K); ps(sx, sy, H('#c8ccd4')); }
    rr(cx - 9, cy - 4, cx + 9, cy + 9, K); rr(cx - 8, cy - 3, cx + 8, cy + 8, H('#e0b040')); rr(cx - 8, cy - 3, cx + 8, cy - 2, H('#fff0a0')); rr(cx - 1, cy + 1, cx + 1, cy + 5, K); }
  // el equipo: el alumno teclea, la alumna vigila el papel y Friedman mira; en «broke» lo celebran
  const fiesta = roto && t < TF.BROKE + 1.1;
  const al = R.actor(BL.alumnoBL, 102, 150, t, { dir: 1, sostiene: fiesta ? null : [124, ri(98 + (Math.sin(t * 14) > 0 ? 1 : 0))], brazos: fiesta, salto: fiesta ? ri(Math.abs(Math.sin((t - TF.BROKE) * 8)) * 3) : 0, sonrisa: roto });
  R.actor(BL.friedmanBL, 70, 152, t, { dir: 1, dedo: t > TF.CIPHER - 0.1 && t < TF.CIPHER + 1.2, sonrisa: roto, habla: !roto && parp(t, 8) });
  const lee = t > TF.CIPHER + 0.4;
  R.actor(BL.alumna2BL, 268, 150, t, { dir: -1, brazos: fiesta, sostiene: lee ? [252, ri(py0 + 4)] : null, sonrisa: roto, sorpresa: t > TF.BEFORE && t < TF.BEFORE + 0.6 });
};

// ── F4 · el estudio de su casa, de noche (fondo local): Friedman con las hojas de Beale en sus ratos libres; el reloj gira
// y vuelan las hojas del almanaque en «years»; se estira en «free time»; en «sheets» alza una hoja, ceñudo ──
const F4 = (t) => {
  fijo('f4', () => {
    for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const r = (x % 12) < 6, mot = Math.abs(((x + 3) % 12) - 6) + Math.abs(((y + (Math.floor(x / 12) % 2) * 8) % 16) - 8) < 3;
      ps(x, y, rmp(OLIVA, 2 + (r ? 0.5 : -0.2) + (mot ? 1.1 : 0) - Math.hypot(x - 150, y - 80) / 180 + (h2(x, y, 15) - 0.5) * 0.3, x, y)); }
    vetas(0, 18, 319, 21, WAL, 3, 4);
    for (let x = 0; x < 320; x += 40) vetas(x, 104, x + 39, 128, WAL, 4 + x, 25, true); for (let x = 0; x < 320; x += 40) rr(x, 104, x, 128, K); rr(0, 103, 319, 104, WAL[4]);
    vetas(0, 129, 319, 179, ROB, 5, 6);
    for (let y = 146; y < 180; y++) for (let x = 40; x < 290; x++) { const b = x < 46 || x > 283 || y < 152, med = Math.hypot((x - 165) / 2.4, y - 166) < 12; ps(x, y, b ? ((x + y) % 4 < 2 ? H('#c8a040') : H('#6a1a1a')) : med ? (h2(x >> 1, y >> 1, 16) > 0.5 ? H('#2a3a6a') : H('#c8a040')) : rmp(pal(['#4a1014', '#6a1a1e', '#8a2a2a']), 1 + Math.sin(x * 0.4) * Math.cos(y * 0.5) + (h2(x, y) - 0.5) * 0.4, x, y)); }
    // la librería
    rr(4, 24, 64, 130, K); vetas(5, 25, 63, 129, WAL, 6, 30, true);
    for (const sy of [44, 66, 88, 110]) { rr(8, sy - 18, 60, sy, H('#1a120a')); let x = 9; while (x < 58) { const w = 2 + ri(h2(x, sy, 17) * 3), hh = 12 + ri(h2(x, sy, 18) * 5), c = pal(['#6a1a1a', '#1a3a5a', '#2a4a2a', '#7a5a1a', '#4a2a4a', '#8a6a3a'])[ri(h2(x, sy, 19) * 5)]; rr(x, sy - hh, x + w - 1, sy - 1, c); ps(x, sy - hh + 3, mez(c, H('#ffffff'), 0.4)); rr(x, sy - hh + 6, x + w - 1, sy - hh + 6, H('#c8a040')); x += w + (h2(x, sy, 20) > 0.85 ? 3 : 0); } rr(6, sy, 62, sy + 2, WAL[3]); }
    // la ventana con cortinas: la noche de Washington con la cúpula del Capitolio
    for (let y = 26; y < 94; y++) for (let x = 214; x < 264; x++) ps(x, y, rmp(NOCHE2, 0.4 + (y - 26) / 16, x, y));
    for (let k = 0; k < 10; k++) ps(216 + ri(h2(k, 1, 21) * 46), 28 + ri(h2(k, 2, 21) * 30), H('#c8d0f0'));
    rr(234, 74, 254, 86, H('#1a2034')); R.disco(244, 73, 7, H('#1a2034')); rr(243, 62, 245, 66, H('#1a2034')); for (let x = 214; x < 264; x++) for (let y = 84; y < 94; y++) ps(x, y, h2(x >> 1, y, 22) > 0.85 ? H('#ffd890') : H('#141a2c'));
    rr(212, 24, 265, 25, K); rr(212, 94, 265, 96, WAL[3]); rr(238, 26, 239, 93, H('#d8d0c0')); rr(214, 59, 263, 60, H('#d8d0c0')); rr(212, 26, 213, 93, H('#d8d0c0')); rr(264, 26, 265, 93, H('#d8d0c0'));
    for (const [x0, x1] of [[204, 214], [264, 274]]) for (let y = 20; y < 104; y++) for (let x = x0; x < x1; x++) ps(x, y, rmp(pal(['#3a0e14', '#5a1a20', '#7a2a30', '#9a3a40']), 1.6 + Math.sin(x * 1.1) * 1.1, x, y));
    // la lámpara de pie y el sillón con su cojín
    R.linea(84, 54, 84, 128, K); R.linea(85, 54, 85, 128, H('#c8a040')); elipse(84, 128, 7, 2, K); elipse(84, 127, 6, 1, H('#c8a040'));
    for (let j = 0; j < 12; j++) rr(76 - ri(j * 0.4), 42 + j, 92 + ri(j * 0.4), 42 + j, j === 11 ? K : rmp(pal(['#a88a5a', '#c8aa78', '#e8d0a0']), 2 - j * 0.1 + (j < 2 ? -1 : 0), j, 0));
    for (let y = 92; y < 140; y++) for (let x = 276; x < 320; x++) { const asiento = y > 116, brazo = x < 284; ps(x, y, rmp(pal(['#14281c', '#1e3a28', '#2a4e36', '#3a6648']), (brazo ? 2.6 : asiento ? 2.2 : 1.6) + (h2(x >> 2, y >> 2, 23) > 0.7 ? -0.6 : 0) + (x === 276 || y === 92 ? -2 : 0), x, y)); }
    // el reloj de pared y el taco del almanaque (sus hojas van vivas)
    R.disco(176, 40, 11, K); R.disco(176, 40, 10, WAL[3]); R.disco(176, 40, 8, H('#ece4cc')); for (let k = 0; k < 12; k++) ps(176 + ri(Math.cos(k * 0.52) * 7), 40 + ri(Math.sin(k * 0.52) * 7), H('#3a3a3a'));
    rr(118, 28, 140, 60, K); rr(119, 29, 139, 59, WAL[2]);
  });
  // la luz de la lámpara de pie y la de la ventana; la ciudad que titila
  luz(84, 56, 70, H('#ffd890'), 0.18);
  for (let k = 0; k < 6; k++) if (Math.sin(t * 2 + k * 2.3) > 0.5) ps(216 + ri(h2(k, 3, 22) * 46), 85 + (k % 4) * 2, H('#fff4c0'));
  // el reloj: las agujas vuelan en «years»
  const gira = ease(tramo(t, TF.YEARS - 0.2, TF.SHEETS - 0.3)) * 40, am = t * 0.05 + gira, ah = am / 12;
  R.linea(176, 40, ri(176 + Math.sin(am) * 7), ri(40 - Math.cos(am) * 7), H('#1a1a1a')); R.linea(176, 40, ri(176 + Math.sin(ah) * 4), ri(40 - Math.cos(ah) * 4), H('#1a1a1a')); ps(176, 40, H('#c8a040'));
  // el almanaque: el año sube de 1941 a 1946 y las hojas salen volando
  const ua = tramo(t, TF.YEARS - 0.2, TF.SHEETS - 0.4), an = 1941 + Math.floor(ua * 5.99);
  rr(120, 30, 138, 58, H('#ece4cc')); rr(120, 30, 138, 36, H('#b83a32')); cifras(String(an), 121, 31, H('#ffffff')); for (let f = 0; f < 3; f++) for (let c = 0; c < 4; c++) rr(122 + c * 4, 40 + f * 5, 124 + c * 4, 42 + f * 5, H('#a89c80'));
  if (ua > 0 && ua < 1) for (let k = 0; k < 5; k++) { const u = ((ua * 5.99) % 1 + k * 0.2) % 1, x = 140 + u * 60, y = 34 + Math.sin(u * 3 + k) * 8 + u * u * 50; rr(x, y, x + 5, y + 3, H('#ece4cc')); ps(x, y, H('#b83a32')); }
  // el gato en el sillón: respira y mueve la cola
  const gb = Math.sin(t * 1.6) > 0 ? 1 : 0; elipse(298, 112 - gb, 10, 5, K); elipse(298, 112 - gb, 9, 4, H('#1e1a20')); R.disco(288, 108 - gb, 4, H('#1e1a20')); ps(285, 104 - gb, H('#1e1a20')); ps(290, 104 - gb, H('#1e1a20'));
  if ((t % 3) > 0.15) { ps(287, 108 - gb, H('#e8c040')); } const ca = Math.sin(t * 2.5) * 3; R.linea(307, 114, 313, ri(110 + ca), H('#1e1a20'));
  // FRIEDMAN detrás de la mesa
  const est = t > TF.FREE - 0.1 && t < TF.FREE + 0.9, alza = t > TF.SHEETS - 0.25;
  const f = R.actor(BL.friedmanBL, 158, 141, t, { dir: 1, sostiene: est ? null : alza ? [176, 102] : [178, ri(129 + Math.sin(t * 9))], brazos: est, sorpresa: est, enfado: alza });
  // la mesa por delante: tablero, cajones, la lámpara verde de banquero, las hojas, la pipa y la taza
  vetas(100, 132, 240, 137, WAL, 7, 3); rr(100, 132, 240, 132, WAL[4]); rr(100, 137, 240, 137, K);
  for (let x = 102; x < 238; x += 34) { vetas(x, 138, x + 32, 172, WAL, 8 + x, 9); rr(x, 138, x + 32, 138, K); rr(x + 14, 152, x + 18, 154, H('#c8a040')); }
  rr(116, 116, 132, 124, K); for (let j = 0; j < 7; j++) rr(117 + ri(j * 0.3), 117 + j, 131 - ri(j * 0.3), 117 + j, j < 2 ? H('#4aa05a') : H('#1e6a34')); rr(123, 124, 125, 131, H('#c8a040')); rr(119, 130, 129, 131, H('#a88020'));
  luz(124, 128, 40, H('#ffe8a0'), 0.35); rr(118, 125, 130, 125, H('#fff4c0'));
  for (let k = 0; k < 3; k++) { const x = 188 + k * 12; rr(x, 127, x + 9, 131, K); rr(x + 1, 127, x + 8, 130, H('#ece2c8')); for (let i = 0; i < 3; i++) rr(x + 2, 128 + i, x + 6 - (i % 2), 128 + i, H('#3a3a4a')); }
  if (!est) { if (alza) T.d_hoja(R, f.mano[0] + 2, f.mano[1] - 5, { escala: 0.5, n: 1, t }); else lapiz(f.mano[0] - 2, f.mano[1] + 2); }
  elipse(226, 130, 5, 2, K); elipse(226, 129, 4, 1, H('#5a4a3a')); R.linea(222, 127, 230, 129, H('#3a2414')); rr(220, 124, 223, 127, H('#3a2414'));
  for (let k = 0; k < 6; k++) { const u = (t * 0.35 + k / 6) % 1; tine(221 + Math.sin(u * 8 + k) * 3, 122 - u * 40, H('#d8d8e0'), 0.45 * (1 - u)); }
  rr(206, 125, 212, 131, K); rr(207, 126, 211, 130, H('#f0ece4')); rr(212, 127, 213, 129, K);
};
const NOCHE2 = pal(['#0a0e22', '#12183a', '#1c2650', '#28346a']);

// ── F5 · la carta (fondo local, desde arriba): la estilográfica escribe la confesión renglón a renglón y la firma en
// «could»; al lado, las tres hojas, el tintero, las gafas y la pipa ──
const F5 = (t) => {
  fijo('f5', () => {
    vetas(0, 0, 319, 179, WAL, 9, 16);
    for (let y = 24; y < 176; y++) for (let x = 54; x < 268; x++) ps(x, y, rmp(pal(['#143222', '#1c4430', '#24563c', '#2e6a4a']), 1.8 + (ns(x * 0.15, y * 0.15) - 0.5) * 1.2 + (h2(x, y, 24) - 0.5) * 0.4, x, y));
    for (const [cx, cy, sx, sy] of [[54, 24, 1, 1], [267, 24, -1, 1], [54, 175, 1, -1], [267, 175, -1, -1]]) for (let i = 0; i < 16; i++) for (let j = 0; j < 16 - i; j++) ps(cx + sx * i, cy + sy * j, j === 15 - i ? K : rmp(pal(['#2a160a', '#4a2a14', '#6a3e20']), 1.5 + (h2(i, j, 25) - 0.5), i, j));
    for (let y = 73; y < 180; y++) for (let x = 117; x < 219; x++) tine(x + 3, y + 3, K, 0.35);
    for (let y = 70; y < 180; y++) for (let x = 114; x < 216; x++) ps(x, y, rmp(pal(['#d8ceb0', '#e8e0c6', '#f4eedc']), 1.6 + (x - 114) / 200 + (h2(x, y, 26) - 0.5) * 0.4, x, y));
    rr(124, 77, 206, 77, H('#8a7a5a')); rr(124, 79, 206, 79, H('#8a7a5a')); rr(114, 70, 216, 70, H('#a89c80'));
    // el tintero de cristal y las gafas
    rr(242, 52, 262, 72, K); rr(243, 53, 261, 71, H('#a8c0c8')); R.disco(252, 62, 7, K); R.disco(252, 62, 6, H('#1a1a3a')); ps(250, 60, H('#5a6ab0')); rr(243, 53, 261, 54, H('#e0f0f4'));
    for (const cx of [250, 268]) { R.disco(cx, 146, 7, K); R.disco(cx, 146, 6, H('#c8d8e0')); R.disco(cx, 146, 5, H('#9ab0bc')); ps(cx - 3, 143, H('#ffffff')); } R.linea(256, 145, 262, 145, K); R.linea(275, 144, 290, 138, K);
    // el cenicero con la pipa (abajo a la izquierda, lejos del año)
    R.disco(34, 158, 13, K); R.disco(34, 158, 12, H('#8a8a94')); R.disco(34, 158, 9, H('#4a4a54')); R.disco(32, 160, 3, H('#2a2a30'));
    R.linea(22, 152, 46, 160, K); rr(40, 155, 48, 163, K); rr(41, 156, 47, 162, H('#5a3018')); R.disco(44, 159, 2, H('#2a1408'));
  });
  luz(70, 40, 160, H('#ffe8b0'), 0.14);
  for (let k = 0; k < 8; k++) { const u = (t * 0.3 + k / 8) % 1; tine(44 + Math.sin(u * 7 + k) * 4 + u * 10, 152 - u * 60, H('#e0e0e8'), 0.5 * (1 - u)); }
  T.d_hoja(R, 80, 72, { n: 1, t }); T.d_hoja(R, 84, 104, { n: 2, t, descifrada: 1 }); T.d_hoja(R, 78, 136, { n: 3, t });
  // la escritura: nueve renglones y la firma
  const w = tramo(t, TF.AND_WHEN + 0.2, TF.COULD + 0.1), fi = tramo(t, TF.COULD + 0.15, TF.HAD - 0.15), TINTA = H('#1c2a5a');
  let cx = 124, cy = 130;
  for (let i = 0; i < 8; i++) { const y = 86 + i * 11, largo = i === 7 ? 44 : 80 - ri(h2(i, 1, 27) * 8), u = i < 4 ? 1 : cl(w * 4 - (i - 4)); if (u <= 0) break; const xe = 124 + ri(largo * u);
    for (let x = 124; x < xe; x++) { if ((x + i * 5) % 14 < 2) continue; const hh = h2(x, i, 28); if (hh > 0.18) ps(x, y + (hh > 0.8 ? -1 : hh < 0.3 ? 1 : 0), TINTA); if (hh > 0.9) ps(x, y - 2, TINTA); }
    if (i >= 4) { cx = xe; cy = y; } }
  if (fi > 0) { const n = ri(fi * 50); for (let q = 0; q < n; q++) { const x = 160 + q * 0.9, y = 172 + Math.sin(q * 0.55) * 3 * (q < 40 ? 1 : 0.3) - (q > 44 ? (q - 44) * 0.6 : 0); ps(x, y, TINTA); ps(x + 1, y, TINTA); } cx = 160 + n * 0.9; cy = 172 + Math.sin(n * 0.55) * 3; }
  if (t > TF.HAD - 0.15) { cx = 206; cy = 168; }
  const wx = ri(cx + 17), wy = ri(cy + 1);
  pluma(cx, cy);
  T.brazo(R, wx + 34, 206, wx, wy, GRIS, -1, { codo: [wx + 38, wy + 26] });
};

// ── F6 · la papelera (fondo local): una bola de papel cae dentro; en «beaten» baja la mano con las tres hojas sobre la
// papelera… y en «instead of forgetting them» se las vuelve a llevar; el perro duerme junto al radiador ──
const F6 = (t) => {
  fijo('f6', () => {
    yeso(0, 0, 319, 66, pal(['#8a8070', '#a89e8a', '#c0b6a0', '#d4ccb6', '#e6dfcc']), 29);
    vetas(0, 66, 319, 71, WAL, 10, 6); for (let x = 0; x < 320; x += 46) { vetas(x, 72, x + 45, 122, WAL, 11 + x, 23, true); rr(x, 72, x, 122, K); rr(x + 5, 77, x + 40, 117, WAL[1]); rr(x + 6, 78, x + 39, 116, WAL[3]); vetas(x + 7, 79, x + 38, 115, WAL, 12 + x, 37, true); }
    vetas(0, 122, 319, 179, ROB, 13, 7); rr(0, 122, 319, 122, K);
    // el costado del escritorio a la izquierda (con su moldura y la pata)
    rr(0, 30, 92, 152, K); vetas(0, 31, 91, 151, WAL, 14, 40, true); rr(6, 40, 84, 140, WAL[1]); vetas(8, 42, 82, 138, WAL, 15, 32, true); rr(0, 28, 96, 33, WAL[4]); rr(0, 33, 96, 34, K);
    // el radiador de hierro con su llave
    for (let x = 226; x < 304; x++) { const fin = (x - 226) % 6; for (let y = 84; y < 124; y++) ps(x, y, fin === 0 ? K : rmp(pal(['#4a4e58', '#6a7080', '#8a92a2', '#aab2c0']), (fin === 1 ? 3 : fin < 4 ? 2 : 1) + (y < 87 ? 1 : 0), x, y)); }
    rr(226, 122, 304, 124, K); rr(300, 80, 306, 86, K); rr(301, 81, 305, 85, H('#c8a040'));
    // la luz de la ventana en el suelo y en la pared
    for (let y = 40; y < 180; y++) for (let x = 0; x < 320; x++) { const u = x - 150 - (y - 40) * 0.7; if (u > 0 && u < 60 && (x + y) % 3 === 0) tine(x, y, H('#fff4c0'), 0.18); }
  });
  for (let k = 0; k < 5; k++) { const u = (t * 0.25 + k / 5) % 1; tine(303 + Math.sin(u * 6 + k) * 3, 80 - u * 34, H('#f0f0f4'), 0.5 * (1 - u)); }
  for (let k = 0; k < 8; k++) { const x = 160 + ((k * 37 + t * 4) % 70), y = 60 + ((k * 23 + t * 3) % 100); if (Math.sin(t * 2 + k) > 0) ps(x + (y - 60) * 0.7, y, H('#fff8d0')); }
  // el perro dormido: respira, mueve una oreja y la cola
  const res = Math.sin(t * 1.8) > 0 ? 1 : 0; elipse(258, 164 - res, 22, 8, K); elipse(258, 164 - res, 21, 7, H('#a86a3a')); elipse(254, 160 - res, 14, 3, H('#c88a52'));
  R.disco(236, 162, 7, K); R.disco(236, 162, 6, H('#a86a3a')); rr(229, 164, 233, 167, H('#c88a52')); ps(229, 164, K); ps(235, 160, K);
  const oj = (t % 2.3) < 0.2 ? -2 : 0; rr(239, 156 + oj, 243, 163, H('#6a3a1a')); const co = ri(Math.sin(t * 3) * 3); R.linea(279, 164, 286, 160 + co, H('#a86a3a')); R.linea(279, 165, 286, 161 + co, K);
  // la papelera de mimbre con bolas de papel
  for (let y = 112; y < 172; y++) { const w = ri(30 - (y - 112) * 0.12); for (let x = 160 - w; x <= 160 + w; x++) ps(x, y, x === 160 - w || x === 160 + w || y === 171 ? K : ((x + (Math.floor(y / 3) % 2) * 3) % 6 < 3 ? H('#c89a5a') : H('#9a6e3a'))); }
  for (let x = 129; x <= 191; x++) { ps(x, 111, K); ps(x, 112, H('#e0b878')); ps(x, 113, H('#7a5428')); }
  for (const [bx, by] of [[150, 108], [168, 107], [160, 104]]) { R.disco(bx, by, 6, K); R.disco(bx, by, 5, H('#ece6d4')); ps(bx - 2, by - 1, H('#c8c0a8')); ps(bx + 1, by + 1, H('#c8c0a8')); }
  // la bola de papel que entra (un intento más que no sirve)
  const ub = tramo(t, TF.HAD + 0.05, TF.CONFESS + 0.5); if (ub > 0 && ub < 1) { const x = lerp(-6, 176, ub), y = 30 + 80 * ub * ub - Math.sin(ub * Math.PI) * 30; R.disco(ri(x), ri(y), 4, K); R.disco(ri(x), ri(y), 3, H('#ece6d4')); }
  // la mano con las tres hojas: baja sobre la papelera, duda y se las lleva
  const baja = ease(tramo(t, TF.HAD + 0.3, TF.BEATEN)), duda = t > TF.BEATEN && t < TF.INSTEAD ? ri(Math.sin(t * 10) * 1.5) : 0, va = ease(tramo(t, TF.INSTEAD - 0.1, TF.FORGETTING + 0.5));
  const wx = ri(lerp(174, 290, va)) + duda, wy = ri(lerp(lerp(-30, 46, baja), -40, va));
  for (const [dx, dy, n] of [[-12, 3, 3], [-8, 1, 2], [-4, 0, 1]]) T.d_hoja(R, wx + dx, wy + 17 + dy, { n, t });
  T.brazo(R, wx + 22, wy - 46, wx, wy, GRIS, -1, { codo: [wx + 28, wy - 20] });
};

// ── F7 · el aula del servicio (buscadores sis): Friedman reparte las hojas a sus alumnos en «training» y «students» ──
const F7 = (t) => {
  const o = { encuadre: 'sis' }; T.buscadores(R, t, o);
  const u1 = ease(tramo(t, TF.HE_PUT, TF.TRAINING - 0.15)), u2 = ease(tramo(t, TF.TRAINING + 0.35, TF.STUDENTS - 0.15));
  const fx = ri(u2 > 0 ? lerp(112, 188, u2) : lerp(150, 112, u1)), da1 = t > TF.TRAINING - 0.15 && t < TF.TRAINING + 0.35, da2 = t > TF.STUDENTS - 0.15;
  const f = R.actor(BL.friedmanBL, fx, 150, t, { dir: u2 > 0 ? 1 : -1, anda: (u1 > 0 && u1 < 1) || (u2 > 0 && u2 < 1), sostiene: da1 ? [fx - 4, 134] : da2 ? [fx + 19, 134] : true, sonrisa: true, habla: !da1 && parp(t, 8) });
  const r1 = t > TF.TRAINING, r2 = t > TF.STUDENTS;
  R.actor(BL.alumnoBL, 74, 146, t, { dir: 1, sorpresa: r1 && t < TF.TRAINING + 0.7, dedo: r1 && t > TF.TRAINING + 0.7 });
  R.actor(BL.alumna2BL, 266, 146, t, { dir: -1, sorpresa: r2, sostiene: r2 ? [258, 130] : null });
  T.buscadoresDelante(R, t, o);
  if (!r2) T.d_hoja(R, f.mano[0] + (u2 > 0 ? 2 : -2), f.mano[1] - 5, { escala: 0.5, n: 1, t });
  if (r1) { T.d_hoja(R, 92, 133, { escala: 0.5, n: 1, t }); const p = pop(t, TF.TRAINING + 0.7, 0.3); if (p > 0) R.icono('?', 76, ri(104 - 3 * Math.min(1, p)), H('#fff0a0'), K, 2); }
  if (r2) { T.d_hoja(R, 254, 126, { escala: 0.5, n: 3, t }); const p = pop(t, TF.STUDENTS + 0.3, 0.3); if (p > 0) R.icono('!', 271, ri(104 - 3 * Math.min(1, p)), H('#ff8a5a'), K, 2); }
};

// ── F8 · el calendario de pared (fondo local): en «Mondays», «Wednesdays» y «Fridays» la mano estampa un cofre del tesoro
// en su columna (la «verdad»); en «real» brillan los tres ──
const F8 = (t) => {
  fijo('f8', () => {
    yeso(0, 0, 319, 179, VY, 31); vetas(0, 154, 319, 179, ROB, 16, 8); rr(0, 153, 319, 154, K);
    rr(14, 60, 30, 64, K); rr(15, 61, 29, 63, H('#c8a040')); for (let j = 0; j < 22; j++) { const w = 6 + (j > 8 ? 2 : 0); rr(22 - w, 64 + j, 22 + w, 64 + j, j === 21 ? K : rmp(pal(['#2a2a30', '#3a3a46', '#4a4a5a']), 1.4 + Math.sin(j) * 0.4, j, 0)); }
    rr(12, 64, 32, 66, H('#5a4a3a')); rr(10, 61, 34, 64, H('#6a5a48'));
    rr(256, 96, 266, 112, K); rr(257, 97, 265, 111, H('#e8e0cc')); rr(260, 101, 262, 106, H('#8a8a8a'));
    rr(262, 60, 306, 96, K); vetas(263, 61, 305, 95, ROB, 17, 4); rr(267, 65, 301, 91, H('#c8d8e0')); for (let x = 267; x < 302; x++) { const y = 80 + ri(Math.sin(x * 0.2) * 3); rr(x, y, x, 91, H('#4a6a8a')); } rr(281, 69, 287, 79, H('#f0ece4'));
    // el calendario colgado de un clavo: una lámina con un velero y tres semanas de seis días
    R.disco(160, 24, 2, H('#8a8a94')); R.linea(160, 24, 80, 38, H('#5a4a3a')); R.linea(160, 24, 240, 38, H('#5a4a3a'));
    for (let y = 43; y < 158; y++) for (let x = 69; x < 257; x++) tine(x + 3, y + 2, K, 0.3);
    rr(66, 38, 254, 156, K); rr(67, 39, 253, 155, H('#f0e8d4'));
    for (let y = 42; y < 66; y++) for (let x = 70; x < 251; x++) ps(x, y, y < 56 ? rmp(SKYD, 1 + (y - 42) / 5, x, y) : rmp(pal(['#1a3a6a', '#2a5a8a', '#4a7aaa']), 1 + Math.sin(x * 0.4 + y) * 0.8, x, y));
    for (let j = 0; j < 10; j++) { const w = ri(j * 0.8); rr(160 - w, 44 + j, 160 + w, 44 + j, H('#f4f0e4')); } rr(160, 43, 160, 58, K); rr(148, 56, 174, 59, H('#5a3a1a')); rr(70, 66, 250, 66, K);
    for (let c = 0; c < 6; c++) { const x = 70 + c * 30; rr(x, 68, x + 28, 77, c % 2 ? H('#4a5a7a') : H('#5a6a8a')); cifras(String(c + 1), x + 13, 70, H('#ffffff'));
      for (let f = 0; f < 3; f++) { const y = 79 + f * 25; rr(x, y, x + 28, y + 23, f === 1 ? H('#f8f0c8') : H('#e8e0c8')); rr(x, y, x + 28, y, H('#c8bc9c')); rr(x, y, x, y + 23, H('#c8bc9c')); cifras(String(1 + f * 7 + c), x + 2, y + 2, H('#8a8070')); } }
  });
  // la sombra de las hojas de un árbol que se mueve en la pared (por la ventana de la izquierda)
  for (let k = 0; k < 7; k++) { const cx = 36 + k * 9 + Math.sin(t * 1.2 + k) * 4, cy = 110 + (k % 3) * 14; for (let j = -4; j <= 4; j++) for (let i = -6; i <= 6; i++) if (i * i / 36 + j * j / 16 < 1 && ((cx + i + cy + j) & 1)) tine(cx + i, cy + j, K, 0.12); }
  // una mosca que da vueltas
  { const a = t * 3.1, fx = 60 + Math.cos(a) * 22 + Math.sin(a * 2.3) * 8, fy = 30 + Math.sin(a * 1.4) * 10; ps(fx, fy, K); if (Math.sin(t * 40) > 0) { ps(fx - 1, fy - 1, H('#c8d0e0')); ps(fx + 1, fy - 1, H('#c8d0e0')); } }
  // los tres cofres estampados (fila de esta semana) y la mano con el sello
  const SELLOS = [[0, TF.MONDAYS], [2, TF.WEDNESDAYS], [4, TF.FRIDAYS]], brilla = t > TF.REAL2 - 0.1;
  for (const [c, ts] of SELLOS) { const p = pop(t, ts, 0.25); if (p <= 0) continue; const x = 84 + c * 30, y = 124; if (brilla) luz(x, y - 9, 20, H('#ffe070'), 0.45 + 0.2 * Math.sin(t * 8 + c)); cofre(x, y - ri(3 * (1 - Math.min(1, p))), 2, { brillo: brilla && Math.sin(t * 6 + c * 2) > 0 }); }
  let obj = null; for (const [c, ts] of SELLOS) if (t < ts + 0.3) { obj = [c, ts]; break; }
  let wx, wy;
  if (obj) { const [c, ts] = obj, prev = SELLOS.findIndex((s) => s[0] === c) - 1, t0 = prev >= 0 ? SELLOS[prev][1] + 0.3 : TF.FRIEDMAN2, x0 = prev >= 0 ? 84 + SELLOS[prev][0] * 30 : 250, y0 = prev >= 0 ? 106 : 170;
    const u = ease(tramo(t, t0, ts - 0.15)), aprieta = t > ts - 0.12 && t < ts + 0.12 ? 4 : 0; wx = lerp(x0, 84 + c * 30, u) + 14; wy = lerp(y0, 106, u) + aprieta; }
  else { const u = ease(tramo(t, TF.FRIDAYS + 0.3, TF.FRIDAYS + 1.0)); wx = lerp(218, 270, u); wy = lerp(106, 176, u); }
  wx = ri(wx); wy = ri(wy);
  rr(wx - 26, wy + 4, wx - 2, wy + 12, K); rr(wx - 25, wy + 5, wx - 3, wy + 11, H('#7a4a24')); rr(wx - 25, wy + 5, wx - 3, wy + 5, H('#a86a3a')); rr(wx - 25, wy + 10, wx - 3, wy + 11, H('#2a2a30')); rr(wx - 17, wy - 2, wx - 11, wy + 4, K); rr(wx - 16, wy - 1, wx - 12, wy + 3, H('#a86a3a'));
  T.brazo(R, wx + 34, 200, wx, wy, GRIS, -1, { codo: [wx + 42, wy + 30] });
};

// ── F9 · el taco del escritorio (fondo local), de noche y con lluvia: martes, jueves y sábado sale el cofre tachado (el
// «engaño»); la mano arranca las hojas; en «hoax» la cruz roja salta ──
const PAG = [[2, 1], [3, 0], [4, 1], [5, 0], [6, 1], [7, 0], [8, 1]];
const F9 = (t) => {
  fijo('f9', () => {
    for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) { const r = (x % 10) < 5; ps(x, y, rmp(pal(['#1a1a2a', '#22223a', '#2c2c48', '#363658']), 1.6 + (r ? 0.4 : -0.2) - Math.hypot(x - 160, y - 70) / 200 + (h2(x, y, 32) - 0.5) * 0.3, x, y)); }
    rr(16, 22, 104, 112, K); for (let y = 23; y < 112; y++) for (let x = 17; x < 104; x++) ps(x, y, rmp(NOCHE2, 0.6 + (y - 23) / 30, x, y));
    for (let k = 0; k < 30; k++) { const x = 18 + ri(h2(k, 1, 33) * 84), y = 70 + ri(h2(k, 2, 33) * 40); rr(x, y, x + 1, y + 1, k % 3 ? H('#ffd890') : H('#8ab0e0')); }
    for (let x = 17; x < 104; x++) { const y = 60 + ri(Math.abs(Math.sin(x * 0.13)) * 10 + (h2(x >> 3, 0, 34) > 0.5 ? 8 : 0)); rr(x, y, x, 72, H('#0e1222')); }
    rr(59, 23, 61, 111, WAL[3]); rr(17, 66, 103, 68, WAL[3]); rr(14, 112, 106, 116, WAL[4]);
    rr(232, 46, 320, 124, K); vetas(233, 47, 319, 123, WAL, 18, 40, true);
    for (const sy of [66, 90, 114]) { rr(236, sy - 18, 319, sy, H('#140c06')); let x = 237; while (x < 318) { const w = 2 + ri(h2(x, sy, 35) * 3), hh = 12 + ri(h2(x, sy, 36) * 5), c = pal(['#5a1a1a', '#1a3a5a', '#2a4a2a', '#6a5a1a', '#3a2a4a'])[ri(h2(x, sy, 37) * 4)]; rr(x, sy - hh, x + w - 1, sy - 1, c); ps(x, sy - hh + 2, mez(c, H('#ffffff'), 0.4)); x += w; } rr(234, sy, 319, sy + 2, WAL[3]); }
    vetas(0, 124, 319, 179, WAL, 19, 13); rr(0, 124, 319, 124, WAL[4]);
    rr(112, 116, 208, 126, K); vetas(113, 117, 207, 125, ROB, 20, 4); rr(116, 30, 204, 118, K); rr(117, 31, 203, 117, H('#8a8478'));
  });
  // la lluvia por la ventana
  for (let k = 0; k < 26; k++) { const x = 18 + ((k * 31 + t * 30) % 84), y = 24 + ((k * 47 + t * 110) % 86); R.linea(ri(x), ri(y), ri(x - 2), ri(y + 5), H('#5a6a9a')); }
  // la taza que humea, las gafas y la pila de hojas
  rr(36, 140, 52, 158, K); rr(37, 141, 51, 157, H('#f0ece4')); rr(37, 141, 51, 143, H('#5a3a1a')); rr(52, 145, 56, 152, K); for (let k = 0; k < 4; k++) { const u = (t * 0.4 + k / 4) % 1; tine(44 + Math.sin(u * 6 + k) * 3, 138 - u * 26, H('#e0e0e8'), 0.5 * (1 - u)); }
  T.d_hoja(R, 254, 150, { n: 1, t }); T.d_hoja(R, 272, 152, { n: 3, t });
  // la hoja de hoy: el número del día en puntos, y el cofre (o el cofre tachado)
  const sal = [TF.AND_TUE + 0.7, TF.THURSDAYS - 0.25, TF.THURSDAYS + 0.05, TF.SATURDAYS - 0.2, TF.HOAX + 0.4, TF.HOAX + 0.6];
  let k = 0; while (k < sal.length && t > sal[k]) k++;
  const pagina = (kk, x0, y0, w) => { const [d, x] = PAG[kk]; rr(x0, y0, x0 + w, y0 + 86, K); rr(x0 + 1, y0 + 1, x0 + w - 1, y0 + 85, H('#f4f0e4')); rr(x0 + 1, y0 + 1, x0 + w - 1, y0 + 14, x ? H('#3a3a4a') : H('#b83a32'));
    for (let q = 0; q < d; q++) R.disco(x0 + 10 + q * 10, y0 + 8, 2, H('#ffffff')); for (let i = x0 + 4; i < x0 + w - 4; i += 6) ps(i, y0 + 2, H('#8a8478'));
    cofre(x0 + w / 2, y0 + 72, 4, { tacha: !!x, brillo: !x && Math.sin(t * 6) > 0 }); };
  pagina(Math.min(k, PAG.length - 1), 117, 31, 86);
  if (k > 0 && t - sal[k - 1] < 0.45) { const u = (t - sal[k - 1]) / 0.45; pagina(k - 1, ri(117 + u * 150), ri(31 - u * 20 + u * u * 120), 86); }
  if (PAG[Math.min(k, PAG.length - 1)][1] && t > TF.HOAX - 0.05 && t < TF.HOAX + 0.9) { const p = pop(t, TF.HOAX - 0.05, 0.25); luz(160, 95, 40, H('#ff6a5a'), 0.3 * Math.min(1, p)); R.icono('X', 146, ri(46 - 4 * Math.min(1, p)), H('#ff4a3a'), K, 4); }
  // la mano que arranca la hoja por la esquina de arriba a la derecha en cada cambio
  let near = 9; for (const s of sal) near = Math.min(near, Math.abs(t - s));
  const ag = cl(1 - near / 0.35), wx = ri(lerp(230, 210, ag)), wy = ri(lerp(10, 40, ag));
  T.brazo(R, 246, -16, wx, wy, GRIS, -1, { codo: [250, ri(lerp(-4, 14, ag))] });
};

// ── F10 · el tapete verde (fondo local): las fichas van del cofre al cofre tachado y vuelven, cada vez más rápido; en «bet»
// la mano se queda en medio, las fichas se caen y una moneda se queda girando sobre la raya ──
const F10 = (t) => {
  fijo('f10', () => {
    for (let y = 0; y < 158; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(FELT, 3 - Math.hypot(x - 160, y - 86) / 90 + (ns(x * 0.25, y * 0.25) - 0.5) * 0.7 + (h2(x, y, 38) - 0.5) * 0.4, x, y));
    for (const [x0, x1] of [[54, 136], [184, 266]]) { for (let x = x0; x <= x1; x++) { ps(x, 44, H('#d8b848')); ps(x, 120, H('#d8b848')); } for (let y = 44; y <= 120; y++) { ps(x0, y, H('#d8b848')); ps(x1, y, H('#d8b848')); } }
    for (let y = 30; y < 140; y += 3) ps(160, y, H('#d8b848'));
    for (let k = 0; k < 4; k++) { const x = 20 + ri(h2(k, 1, 39) * 280), y = 20 + ri(h2(k, 2, 39) * 120); elipse(x, y, 2, 1, H('#2a1a0a')); }
    for (let y = 156; y < 180; y++) for (let x = 0; x < 320; x++) ps(x, y, y === 156 ? K : rmp(pal(['#2a0e08', '#4a1a10', '#6a2a1a', '#8a3a24']), 1.4 + (y < 162 ? 1.6 - (y - 157) * 0.3 : 0) + (h2(x, y, 40) - 0.5) * 0.4, x, y));
    for (let x = 8; x < 320; x += 16) { R.disco(x, 166, 1, H('#e8c040')); ps(x, 165, H('#fff0a0')); }
    // la fila de los seis días, pintada en el tapete
    for (let c = 0; c < 6; c++) { const x = 58 + c * 34; for (let i = 0; i < 32; i++) { ps(x + i, 128, H('#d8b848')); ps(x + i, 148, H('#d8b848')); } for (let y = 128; y <= 148; y++) { ps(x, y, H('#d8b848')); ps(x + 32, y, H('#d8b848')); } cifras(String(c + 1), x + 13, 133, c % 2 ? H('#e86a5a') : H('#f0d060'), 2); }
    // las fichas de los otros jugadores, el vaso con hielo y el cenicero
    for (const [bx, by, n, c] of [[26, 84, 5, '#2a4ac8'], [36, 96, 3, '#e8e8e0'], [292, 132, 6, '#c83a3a']]) for (let k = 0; k < n; k++) { elipse(bx, by - k * 3, 8, 3, K); elipse(bx, by - k * 3 - 1, 7, 2, H(c)); ps(bx - 6, by - k * 3 - 1, H('#ffffff')); ps(bx + 6, by - k * 3 - 1, H('#ffffff')); }
    rr(280, 58, 302, 86, K); for (let y = 59; y < 86; y++) for (let x = 281; x < 302; x++) ps(x, y, y < 68 ? H('#a8c8d0') : rmp(pal(['#8a4a14', '#b0702a', '#d89a48']), 1.5 + (x < 284 ? 1 : 0) - (y - 68) / 20, x, y)); rr(285, 66, 291, 72, H('#e8f4f8')); rr(292, 70, 297, 75, H('#d8ecf0')); rr(281, 59, 282, 85, H('#e8f4f8'));
    R.disco(28, 136, 11, K); R.disco(28, 136, 10, H('#7a7a84')); R.disco(28, 136, 7, H('#3a3a40')); rr(30, 132, 46, 135, K); rr(31, 133, 45, 134, H('#6a3a1a')); rr(44, 133, 45, 134, H('#ff8a3a'));
  });
  for (let k = 0; k < 6; k++) { const u = (t * 0.3 + k / 6) % 1; tine(46 + Math.sin(u * 7 + k) * 4 + u * 8, 132 - u * 60, H('#e0e0e8'), 0.45 * (1 - u)); }
  cofre(95, 98, 3, { brillo: Math.sin(t * 5) > 0.6 }); cofre(225, 98, 3, { tacha: true });
  luz(160, 70, 150, H('#fff0c0'), 0.12);
  for (let k = 0; k < 5; k++) { const u = (t * 0.12 + k / 5) % 1; for (let i = 0; i < 26; i++) tine(u * 380 - 30 + i * 2, 20 + k * 6 + Math.sin(i * 0.4 + t + k) * 4, H('#c8c8d0'), 0.12); }
  // la mano y sus fichas: a un lado y a otro, cada vez más deprisa
  const t0 = TF.LIKE + 0.2, sec = [[t0, 160, 146], [t0 + 0.6, 95, 116], [t0 + 1.3, 225, 116], [t0 + 1.85, 95, 116], [t0 + 2.3, 225, 116], [t0 + 2.62, 95, 116], [t0 + 2.9, 225, 116], [t0 + 3.12, 95, 116], [TF.BET - 0.1, 160, 118]];
  let cx = 160, cy = 146; for (let i = 1; i < sec.length; i++) { const [ta, xa, ya] = sec[i - 1], [tb, xb, yb] = sec[i]; if (t >= ta) { const u = ease(tramo(t, ta, tb)); cx = lerp(xa, xb, u); cy = lerp(ya, yb, u); } }
  const cae = t > TF.BET, sale = ease(tramo(t, TF.BET + 0.5, TF.BET + 1.2));
  if (!cae) for (let k = 0; k < 6; k++) { const y = ri(cy + 6 - k * 3); elipse(ri(cx) - 4, y, 9, 3, K); elipse(ri(cx) - 4, y - 1, 8, 2, k % 2 ? H('#c83a3a') : H('#2a4ac8')); ps(ri(cx) - 10, y - 1, H('#ffffff')); ps(ri(cx) + 2, y - 1, H('#ffffff')); ps(ri(cx) - 4, y - 2, H('#ffffff')); }
  else for (let k = 0; k < 6; k++) { const u = tramo(t, TF.BET, TF.BET + 0.4), x = ri(156 + (k - 2.5) * 9 * u + k), y = ri(120 + Math.sin(u * Math.PI) * -8 + (k % 2) * 3); elipse(x, y, 8, 3, K); elipse(x, y - 1, 7, 2, k % 2 ? H('#c83a3a') : H('#2a4ac8')); ps(x - 5, y - 1, H('#ffffff')); }
  if (t > TF.BET + 0.3) { const w = Math.abs(Math.cos(t * 11)) * 8, cara = Math.cos(t * 11) > 0; luz(160, 82, 16, H('#fff0a0'), 0.3); for (let j = -8; j <= 8; j++) for (let i = -ri(w) - 1; i <= ri(w) + 1; i++) if ((i / (w + 1.5)) ** 2 + (j / 8.5) ** 2 <= 1) ps(160 + i, 82 + j, Math.abs(i) >= ri(w) ? K : cara ? (i < 0 ? H('#fff0a0') : H('#f0c040')) : H('#c8ccd4')); elipse(161, 92, 6, 1, H('#0a2a1a')); }
  const wx = ri(lerp(cx + 10, 220, sale)), wy = ri(lerp(cy + 2, 210, sale)) + (t > TF.DECIDE && !cae ? ri(Math.sin(t * 20)) : 0);
  if (sale < 1) T.brazo(R, wx + 24, 214, wx, wy, GRIS, -1, { codo: [wx + 36, wy + 36] });
};

// ── F11 · una oficina de Sperry en 1970 (fondo local): Hammer perfora las fichas en la perforadora; en «computer
// expert» alza una ficha; un compañero cruza con una caja de fichas; burbujas en la fuente de agua ──
const F11 = (t) => {
  fijo('f11', () => {
    for (let y = 0; y < 20; y++) for (let x = 0; x < 320; x++) ps(x, y, (x % 40 === 0 || y === 19) ? H('#a8a498') : rmp(pal(['#c4c0b4', '#d4d0c4', '#e0dcd0']), 1.4 + (h2(x, y, 41) > 0.85 ? -1 : 0), x, y));
    rr(40, 6, 100, 10, H('#e8e8f0')); rr(40, 11, 100, 12, H('#a8a8b0'));
    yeso(0, 20, 319, 84, BEIGE, 42); rr(0, 20, 319, 20, H('#8a8274'));
    for (let x = 0; x < 320; x += 32) { vetas(x, 84, x + 31, 124, WAL, 21 + x, 32, true); rr(x, 84, x, 124, K); } rr(0, 83, 319, 84, WAL[4]);
    for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(pal(['#4a2a10', '#6a3e18', '#8a5422', '#a86a2e']), 1.8 + (ns(x * 0.3, y * 0.3) - 0.5) * 1.6 + (h2(x, y, 43) - 0.5) * 0.8 - (y - 124) / 80, x, y));
    // la ventana con persiana veneciana: la ciudad al anochecer
    rr(22, 30, 106, 98, K); for (let y = 31; y < 98; y++) for (let x = 23; x < 106; x++) ps(x, y, rmp(pal(['#3a2a5a', '#6a3a6a', '#b85a5a', '#e88a4a']), (y - 31) / 18, x, y));
    for (const [bx, bw, bh] of [[28, 12, 40], [44, 10, 54], [58, 16, 34], [78, 9, 60], [90, 13, 44]]) { rr(bx, 98 - bh, bx + bw, 97, H('#1e1a2a')); for (let y = 98 - bh + 3; y < 96; y += 4) for (let x = bx + 2; x < bx + bw - 1; x += 3) if (h2(x, y, 44) > 0.45) ps(x, y, H('#ffd890')); }
    for (let y = 32; y < 98; y += 4) rr(23, y, 105, y + 1, H('#d8d0bc')); rr(23, 32, 23, 98, H('#8a8274'));
    rr(20, 98, 108, 101, H('#d8d0bc'));
    // el cuadro de círculos naranjas y el reloj
    rr(196, 34, 252, 76, K); rr(197, 35, 251, 75, H('#e8dcc0')); for (const [cx, cy, r, c] of [[212, 50, 10, '#e87a2a'], [230, 58, 12, '#c8502a'], [240, 44, 7, '#e8b040'], [208, 66, 6, '#8a4a2a']]) { R.disco(cx, cy, r, H(c)); R.disco(cx - 1, cy - 1, ri(r * 0.5), mez(H(c), H('#ffffff'), 0.25)); }
    R.disco(156, 38, 10, K); R.disco(156, 38, 9, H('#f0ece4')); for (let k = 0; k < 12; k++) ps(156 + ri(Math.cos(k * 0.52) * 7), 38 + ri(Math.sin(k * 0.52) * 7), K);
    // la fuente de agua
    rr(272, 98, 300, 150, K); rr(273, 99, 299, 149, H('#d8d4c8')); rr(273, 99, 275, 149, H('#ece8dc')); rr(280, 112, 292, 114, H('#4a4a54')); rr(284, 114, 286, 118, H('#8a8a94'));
    for (let y = 64; y < 98; y++) { const w = y < 70 ? 6 : 12; rr(286 - w, y, 286 + w, y, y === 64 ? K : H('#7ab8e0')); ps(286 - w, y, K); ps(286 + w, y, K); ps(286 - w + 2, y, H('#c8e8f8')); }
    // la perforadora de fichas sobre su mesa
    rr(110, 118, 216, 124, K); rr(111, 119, 215, 123, H('#c8c0a8')); rr(116, 124, 120, 152, K); rr(206, 124, 210, 152, K); rr(117, 124, 119, 151, H('#8a8478')); rr(207, 124, 209, 151, H('#8a8478'));
    rr(118, 88, 208, 118, K); for (let y = 89; y < 118; y++) for (let x = 119; x < 208; x++) ps(x, y, rmp(pal(['#4a5a6a', '#6a7a8a', '#8a9aaa', '#aab8c4']), 2.2 + (y < 92 ? 1 : 0) + (x > 204 ? -1.2 : 0) + (h2(x, y, 45) - 0.5) * 0.3, x, y));
    rr(122, 92, 204, 98, H('#c8c0a8')); rr(150, 102, 176, 114, H('#2a2a34')); for (let r = 0; r < 3; r++) for (let x = 152; x < 175; x += 3) rr(x, 104 + r * 3, x + 1, 105 + r * 3, H('#e8e4d8'));
    rr(182, 78, 206, 92, K); rr(183, 79, 205, 91, H('#8a9aaa')); rr(122, 82, 146, 92, K); rr(123, 83, 145, 91, H('#8a9aaa'));
  });
  // el fluorescente que tiembla y la ciudad que titila
  if (Math.sin(t * 23) > 0.92) rr(40, 6, 100, 10, H('#c8c8d0'));
  for (let k = 0; k < 5; k++) if (Math.sin(t * 1.5 + k * 1.9) > 0.6) ps(30 + k * 15, 70 + (k % 3) * 8, H('#fff4c0'));
  { const a = (t * 12) % 120; if (Math.sin(t * 8) > 0) ps(24 + a * 0.7, 40, H('#ff5a4a')); }
  // las fichas: el taco que baja en la tolva, la ficha que viaja y el montón que crece
  const tecla = t > TF.AND_YET + 0.3 && t < TF.COMPUTER - 0.1, n = tecla ? Math.floor((t - TF.AND_YET - 0.3) / 0.55) : t >= TF.COMPUTER ? 7 : 0;
  for (let k = 0; k < Math.max(2, 12 - n); k++) rr(185, 90 - k, 203, 90 - k, k % 2 ? H('#e8dcb8') : H('#c8b890'));
  for (let k = 0; k < Math.min(10, 2 + n); k++) rr(125, 90 - k, 143, 90 - k, k % 2 ? H('#e8dcb8') : H('#c8b890'));
  if (tecla) { const u = ((t - TF.AND_YET - 0.3) / 0.55) % 1, x = ri(lerp(188, 126, u)); rr(x, 93, x + 16, 97, K); rr(x + 1, 94, x + 15, 96, H('#f0e4c0')); for (let i = 0; i < 5; i++) if (h2(i, n, 46) > 0.4) ps(x + 3 + i * 3, 95, K); }
  for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1; if (t > TF.SPERRY + 0.5 && t < TF.SPERRY + 2) ps(286 + Math.sin(u * 9 + k) * 3, 96 - u * 26, H('#ffffff')); }
  // un compañero cruza al fondo con una caja de fichas
  const uk = tramo(t, TF.CARL - 0.2, TF.FED); if (uk > 0 && uk < 1) { const x = ri(lerp(334, 224, uk)); const c = R.actor(BL.buscadorBL, x, 140, t, { dir: -1, anda: true, sostiene: true, pal: { C: H('#c87a3a'), c: H('#9a5a2a') } }); rr(c.mano[0] - 6, c.mano[1] - 3, c.mano[0] + 2, c.mano[1] + 3, K); rr(c.mano[0] - 5, c.mano[1] - 2, c.mano[0] + 1, c.mano[1] + 2, H('#c8b890')); }
  // HAMMER: teclea; en «computer expert» saca una ficha del montón y la alza
  const alza = t > TF.COMPUTER - 0.1, quien = t > TF.CARL - 0.1;
  const h = R.actor(BL.hammerBL, 90, 152, t, { dir: 1, sostiene: alza ? [108, 108] : [150, ri(103 + (Math.sin(t * 16) > 0 ? 1 : 0))], sonrisa: quien, dedo: false });
  if (alza) { const [mx, my] = h.mano; luz(mx + 4, my - 4, 14, H('#fff4c0'), 0.3); rr(mx - 2, my - 9, mx + 14, my - 1, K); rr(mx - 1, my - 8, mx + 13, my - 2, H('#f0e4c0')); rr(mx - 1, my - 8, mx + 13, my - 8, H('#c8b890'));
    for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) if (h2(i, j, 47) > 0.35) ps(mx + 1 + i * 2, my - 6 + j * 2, K); }
};

// ── F12 · la lectora de fichas de cerca (fondo local): la mano mete el taco en «fed»; las fichas pasan zumbando, las
// cifras de Beale suben por el cable hacia las cintas; en «powerful» se encienden todas las luces ──
const F12 = (t) => {
  fijo('f12', () => {
    for (let y = 0; y < 64; y++) for (let x = 0; x < 320; x++) ps(x, y, (x % 54 === 0) ? H('#2a3040') : rmp(pal(['#3a4252', '#4a5466', '#5a667a']), 1.4 + (h2(x, y, 48) - 0.5) * 0.5 - y / 120, x, y));
    for (const x0 of [10, 64, 118]) { rr(x0, 18, x0 + 46, 64, K); rr(x0 + 1, 19, x0 + 45, 63, H('#b8b4a4')); rr(x0 + 4, 22, x0 + 42, 50, H('#2a2e38')); }
    for (let y = 64; y < 180; y++) for (let x = 0; x < 320; x++) ps(x, y, rmp(BEIGE, 2.6 + (y < 70 ? 1.2 : 0) + (x < 4 || x > 315 ? -1.5 : 0) + (h2(x, y, 49) - 0.5) * 0.3 - (y - 64) / 140, x, y));
    rr(0, 64, 319, 64, K); rr(0, 74, 319, 82, H('#3a4a6a')); rr(0, 74, 319, 74, H('#5a6a8a'));
    rr(20, 124, 300, 146, K); rr(21, 125, 299, 145, H('#2a2a32'));
    rr(40, 40, 128, 74, K); rr(41, 41, 127, 73, H('#8a9aaa')); rr(44, 44, 124, 72, H('#5a6a7a'));
    rr(190, 30, 276, 74, K); rr(191, 31, 275, 73, H('#8a9aaa')); rr(194, 34, 272, 72, H('#5a6a7a'));
    rr(128, 66, 190, 72, K); rr(129, 67, 189, 71, H('#1a1a20'));
    for (const x of [106, 214]) { rr(x, 82, x, 180, BEIGE[0]); rr(x + 1, 82, x + 1, 180, BEIGE[4]); }
    for (const [x, y] of [[8, 88], [98, 88], [222, 88], [310, 88], [8, 172], [310, 172]]) { R.disco(x, y, 2, BEIGE[0]); ps(x - 1, y - 1, BEIGE[4]); }
    rr(136, 88, 184, 118, K); rr(137, 89, 183, 117, H('#1a1e26')); rr(18, 92, 90, 100, H('#3a4a6a')); for (let x = 22; x < 88; x += 6) rr(x, 94, x + 3, 98, H('#c8a040'));
    for (let y = 152; y < 176; y += 3) rr(14, y, 92, y + 1, BEIGE[0]); rr(12, 150, 94, 177, BEIGE[0]); for (let y = 152; y < 176; y += 3) rr(14, y, 92, y, H('#2a2620'));
    for (const cx of [126, 160]) { R.disco(cx, 164, 11, K); R.disco(cx, 164, 10, H('#e8e4d4')); for (let k = 0; k < 9; k++) { const a = Math.PI * (0.75 + k * 0.1875); ps(cx + Math.cos(a) * 8, 164 + Math.sin(a) * 8, K); } rr(cx - 10, 175, cx + 10, 176, BEIGE[0]); }
    rr(186, 152, 306, 176, K); rr(187, 153, 305, 175, H('#4a5262'));
  });
  for (const [cx, k] of [[126, 0], [160, 1]]) { const a = Math.PI * (1 + 0.5 + Math.sin(t * (1.3 + k) + k) * 0.35 + (t > TF.POWERFUL ? 0.3 : 0)); R.linea(cx, 164, ri(cx + Math.cos(a) * 8), ri(164 + Math.sin(a) * 8), H('#c83a2a')); R.disco(cx, 164, 1, K); }
  for (let k = 0; k < 12; k++) { const x = 192 + k * 10, arriba = (k % 3 !== 1) !== (Math.sin(t * 0.9 + k * 2.1) > 0.85); rr(x, 158, x + 5, 170, H('#2a2e38')); R.disco(x + 2, 164, 2, H('#8a8e9a')); rr(x + 2, arriba ? 157 : 165, x + 3, arriba ? 163 : 171, H('#e8ecf0')); ps(x + 2, arriba ? 157 : 171, H('#ffffff')); rr(x, 172, x + 5, 173, [H('#c83a3a'), H('#3a9a4a'), H('#e8c040')][k % 3]); }
  { const g = t * (t > TF.FED + 0.35 ? 14 : 1); for (const cy of [96, 110]) for (let x = 140; x < 182; x++) ps(x, cy + (Math.floor(x / 3 + g) % 2), H('#8a8e9a')); for (const rx of [148, 172]) { R.disco(rx, 103, 5, K); R.disco(rx, 103, 4, H('#6a6e7a')); R.linea(rx, 103, ri(rx + Math.cos(g) * 4), ri(103 + Math.sin(g) * 4), H('#e8ecf0')); } }
  // las cintas del fondo: las bobinas giran a saltos
  for (const x0 of [10, 64, 118]) for (const dx of [12, 32]) { const cx = x0 + dx, cy = 36, a = Math.floor(t * 4 + x0) * 0.6; R.disco(cx, cy, 9, K); R.disco(cx, cy, 8, H('#4a4e5a')); R.disco(cx, cy, 3, H('#c8ccd4')); for (let q = 0; q < 3; q++) { const b = a + q * 2.09; R.linea(cx, cy, ri(cx + Math.cos(b) * 7), ri(cy + Math.sin(b) * 7), H('#8a8e9a')); } }
  // el taco que llega en la mano y baja en la tolva; las fichas que pasan y el montón que crece
  const mete = ease(tramo(t, TF.FED - 0.5, TF.FED + 0.3)), lee = t > TF.FED + 0.35, n = lee ? Math.min(22, Math.floor((t - TF.FED - 0.35) * 7)) : 0;
  const dx = ri(lerp(110, 0, mete));
  for (let k = 0; k < 24 - n; k++) rr(200 + dx, 70 - k, 266 + dx, 70 - k, k % 2 ? H('#e8dcb8') : H('#c8b890'));
  if (lee) { for (let k = 0; k < 3; k++) { const u = ((t * 7) + k / 3) % 1, x = ri(lerp(188, 128, u)); rr(x - 30, 66, x + 30, 69, mez(H('#f0e4c0'), H('#1a1a20'), 0.4)); } }
  for (let k = 0; k < 2 + n; k++) rr(48, 70 - k, 120, 70 - k, k % 2 ? H('#e8dcb8') : H('#c8b890'));
  if (mete < 1) T.brazo(R, 330, 120, ri(276 + dx), 60, MARRON70, -1, { codo: [314, 96] });
  else if (t < TF.FED + 1.0) { const u = ease(tramo(t, TF.FED + 0.3, TF.FED + 1.0)); T.brazo(R, 330, 120, ri(lerp(276, 340, u)), ri(lerp(60, 90, u)), MARRON70, -1, { codo: [314, 96] }); }
  // las luces del panel: se encienden todas en «powerful»
  const todas = t > TF.POWERFUL - 0.05;
  for (let k = 0; k < 18; k++) { const on = todas || Math.sin(t * (4 + k * 0.7) + k) > 0.1, x = 26 + k * 15; rr(x, 130, x + 9, 140, K); rr(x + 1, 131, x + 8, 139, on ? (k % 3 === 0 ? H('#ffb040') : k % 3 === 1 ? H('#6aff6a') : H('#ff5a4a')) : H('#3a3030')); if (on) ps(x + 2, 132, H('#ffffff')); }
  if (todas && t < TF.POWERFUL + 0.8) luz(160, 135, 140, H('#fff0c0'), 0.25 * (1 - tramo(t, TF.POWERFUL, TF.POWERFUL + 0.8)));
  // las cifras de Beale suben por el cable hacia las cintas
  const CIF = ['71', '194', '38', '1701', '89', '76', '11', '83', '1629', '48'];
  if (lee) for (let k = 0; k < 6; k++) { const u = ((t - TF.FED) * 0.7 + k / 6) % 1, x = lerp(150, 60 + (k % 3) * 50, u), y = lerp(64, 50, u) - Math.sin(u * Math.PI) * 10; cifras(CIF[(k + Math.floor((t - TF.FED) * 0.7)) % CIF.length], ri(x), ri(y), mez(H('#fff0a0'), H('#ffffff'), 0.3)); }
};

// ── F13 · la sala del ordenador (buscadores univac): sale la tira; Hammer la coge y la alza; «1» y «3» con su visto en «one»
// y «three»; el garabato tachado en «doodles»; el sobre con su «!» en «message». Lo congela bl-casi ──
const F13 = (t) => {
  const o = { encuadre: 'univac', tira: tramo(t, TF.AND_ANN + 0.05, TF.SHEETS2 + 0.5) }; const r = T.buscadores(R, t, o) || {};
  const coge = t > TF.SHEETS2 + 0.3, [tx, ty] = r.tira || [240, 138], ux = ease(tramo(t, TF.AND_ANN + 0.1, TF.SHEETS2 + 0.2));
  const hx = ri(lerp(176, 228, ux));
  R.actor(BL.hammerBL, hx, 150, t, { dir: 1, anda: ux > 0 && ux < 1, sostiene: coge ? [ri(tx), ri(ty)] : null, sorpresa: t > TF.NOT - 0.1 && t < TF.MESSAGE - 0.2, sonrisa: t > TF.MESSAGE - 0.2, habla: !coge && parp(t, 8) });
  T.buscadoresDelante(R, t, o);
  const marca = (txt, x, ta) => { const p = pop(t, ta, 0.3); if (p <= 0) return; const y = ri(70 - 6 * Math.min(1, p)); luz(x, y - 8, 22, H('#fff4c0'), 0.25); R.numero(txt, x, y, { tam: 16, centro: true }); if (t > ta + 0.25) T.visto(R, x + 10, y - 16, 2); };
  marca('1', 84, TF.ONE); marca('3', 134, TF.THREE);
  const g = pop(t, TF.NOT - 0.05, 0.3); if (g > 0) { const gx = 186, gy = ri(58 - 4 * Math.min(1, g)); for (let q = 0; q < 40; q++) { const x = gx - 14 + q * 0.7, y = gy + Math.sin(q * 0.9) * 5 + Math.cos(q * 0.37) * 3; ps(x, y, H('#e8e4d8')); ps(x, y + 1, K); }
    if (t > TF.DOODLES - 0.05) { const u = tramo(t, TF.DOODLES - 0.05, TF.DOODLES + 0.2); for (let q = 0; q < 20 * u; q++) for (let w = -1; w <= 1; w++) { ps(gx - 14 + q * 1.4 + w, gy - 10 + q + w * 0, H('#ff4a3a')); ps(gx + 14 - q * 1.4 + w, gy - 10 + q, H('#ff4a3a')); } } }
  const s = pop(t, TF.MESSAGE - 0.1, 0.3); if (s > 0) { const sy = ri(104 - 6 * Math.min(1, s)); luz(134, sy, 30, H('#fff0a0'), 0.35 + 0.1 * Math.sin(t * 6)); R.icono('sobre', 123, sy - 9, H('#f4f0e4'), K, 3); R.icono('!', 154, sy - 14, H('#ff6a3a'), K, 2); }
};
'''

FRIEDMAN = r'''
const año = (t) => t < TF.AND_WHOSE ? 1930 : t < TF.SPENT ? 1940 : t < TF.AND_WHEN ? 1941 + Math.floor(5.99 * tramo(t, TF.YEARS - 0.2, TF.SHEETS - 0.4)) : t < TF.AND_YET ? 1946 : 1970;
const efectos = [[TF.EVEN + 0.2, 'lapiz'], [TF.CRACKED, 'brillo'], [TF.TRAP, 'toc'], [TF.BECAUSE + 0.2, 'pasos'], [TF.SERVICE + 0.4, 'coche'],
  [TF.AND_WHOSE + 0.2, 'tecleo'], [TF.BROKE, 'cerrojo'], [TF.YEARS, 'tic'], [TF.SHEETS, 'papel'], [TF.AND_WHEN + 0.3, 'lapiz'], [TF.COULD + 0.2, 'firma'],
  [TF.HAD + 0.2, 'papel'], [TF.TRAINING, 'papel'], [TF.STUDENTS, 'papel'], [TF.MONDAYS, 'sello'], [TF.WEDNESDAYS, 'sello'], [TF.FRIDAYS, 'sello'], [TF.REAL2, 'brillo'],
  [TF.AND_TUE + 0.7, 'papel'], [TF.THURSDAYS - 0.25, 'papel'], [TF.SATURDAYS - 0.2, 'papel'], [TF.HOAX, 'boing'], [TF.LIKE + 0.8, 'golpecito'], [TF.BET, 'golpecito'],
  [TF.AND_YET + 0.4, 'tecleo'], [TF.FED, 'maquina'], [TF.POWERFUL, 'brillo'], [TF.AND_ANN + 0.2, 'maquina'], [TF.ONE, 'pop'], [TF.THREE, 'pop'], [TF.DOODLES, 'boing'], [TF.MESSAGE, 'brillo']];
T.rodar(E, R, [[0, F1], [TF.BECAUSE, F2], [TF.AND_WHOSE, F3], [TF.SPENT, F4], [TF.AND_WHEN, F5], [TF.HAD, F6], [TF.HE_PUT, F7], [TF.FRIEDMAN2, F8],
  [TF.AND_TUE, F9], [TF.LIKE, F10], [TF.AND_YET, F11], [TF.FED, F12], [TF.AND_ANN, F13]], { cartela: '1930', efectos, año });
'''

CAB_FRIEDMAN = r'''// bl-friedman (frases 20–21, cartela 1930; la barra del año: 1930 → 1940 en el laboratorio → 1941–1946 en casa → 1970).
// 1 · El escritorio del jefe (buscadores sis mesa): la mano descifra un telegrama de verdad (✓ en «cracked») y va a por
//   la hojita de Beale que hace de cebo en una ratonera: en «trap» el cepo atrapa el lápiz. Corta en «Because».
// 2 · Washington (fondo local): Friedman llega con su cartera y sube la escalinata del edificio del ejército; el centinela
//   saluda en «Army»; pasa un coche negro por delante; la bandera ondea. Corta en «and whose team».
// 3 · El laboratorio de 1940 (fondo local): el equipo ante la máquina de conmutadores; el candado aparece y se abre en
//   «broke», las luces se ponen verdes, lo celebran; sale el texto en claro. Corta en «spent».
// 4 · El estudio de su casa de noche (fondo local): con las hojas en sus ratos libres; vuelan las agujas y el almanaque
//   (1941 → 1946) en «years»; se estira en «free time»; alza una hoja en «sheets». Corta en «And when».
// 5 · La carta (fondo local, desde arriba): la estilográfica escribe la confesión y firma en «could». Corta en «had to».
// 6 · La papelera (fondo local): cae una bola de papel; en «beaten» las tres hojas bajan sobre la papelera… y en
//   «instead of forgetting them» se las lleva; el perro duerme junto al radiador. Corta en «he put».
// 7 · El aula (buscadores sis): Friedman reparte las hojas al alumno en «training» y a la alumna en «students».
// 8 · El calendario de pared (fondo local): la mano estampa un cofre en lunes, miércoles y viernes; brillan en «real».
// 9 · El taco del escritorio (fondo local, de noche y con lluvia): martes, jueves y sábado sale el cofre tachado; la
//   mano arranca las hojas; en «hoax» salta la cruz. Corta en «like a man».
// 10 · El tapete verde (fondo local): las fichas van y vienen entre el cofre y el cofre tachado, cada vez más rápido; en
//   «bet» se caen y queda una moneda girando. Corta en «And yet».
// 11 · Una oficina de 1970 (fondo local): Hammer perfora las fichas; alza una en «computer expert»; un compañero cruza
//   con una caja. Corta en «fed».
// 12 · La lectora de fichas (fondo local): la mano mete el taco en «fed»; las cifras suben hacia las cintas; todas las
//   luces en «powerful». Corta en «and announced».
// 13 · La sala del ordenador (buscadores univac): sale la tira; Hammer la coge; «1» y «3» con visto; el garabato tachado en
//   «doodles»; el sobre con «!» en «message». Su último instante lo congela bl-casi.'''

CASI = r'''
// ── la PAUSA «fíjate»: el mundo de bl-friedman congelado (los mismos planos, con las mismas funciones) en gris azulado, y
// Atom al doble y a color ──
const VOZ = [[0.2, 3.3], [5.1, 12.1], [12.7, 15.9], [16.7, 19.7], [20.3, 23.2], [24.3, 27.0], [27.5, 31.1]];
const habla = (t) => VOZ.some(([a, b]) => t > a && t < b) && parp(t, 8) ? 1 : 0;
// un voluntario de 2009 a color, con su cerebrito encima
const voluntario = (def, x, t, ta, tb, o = {}) => { const p = pop(t, ta, 0.3); if (p <= 0) return; R.actor(def, x, 176, t, { dir: o.dir ?? 1, salto: p < 1 ? 2 : 0, sonrisa: o.sonrisa, pal: o.pal });
  const q = pop(t, tb, 0.3); if (q > 0) cerebro(x + 7, ri(140 - 4 * Math.min(1, q)), 1, t, { luz: o.luz ?? 0 }); };
// ── C1 · la sala del ordenador congelada (el último instante de bl-friedman): Atom entra, rodea la tira de Hammer y en
// «digging» se pone a cavar con una palita ──
const C1 = (t) => {
  F13(TF.FIN); AT.pausa(R, tramo(t, 0, 0.3));
  if (t > TS.BECAUSE - 0.1) AT.anillo(R, 238, 132, 22, 16, t, tramo(t, TS.BECAUSE - 0.1, TS.BECAUSE + 0.5));
  const u = ease(tramo(t, 0.15, 1.4)), x = lerp(-30, 92, u), cava = t > TS.DIGGING - 0.15;
  const a = AT.atom(R, x, 178, t, { s: 2, dir: 1, pose: u < 1 ? 'camina' : cava ? 'sostiene' : t > TS.BECAUSE ? 'senala' : 'quieto', cara: cava ? 'sonrisa' : t > TS.NOBODY ? 'sorpresa' : 'normal', habla: habla(t) });
  if (cava) { const f = Math.sin((t - TS.DIGGING) * 8), [mx, my] = a.mano; pala(mx, my, mx + 9, ri(my + 18 + f * 2));
    const fs = ((t - TS.DIGGING) * 8 / (Math.PI * 2)) % 1; if (fs > 0.5) for (let k = 0; k < 4; k++) ps(mx + 14 + k * 3, my + 20 - Math.sin((fs - 0.5) * 2 * Math.PI) * 10 + k, H('#8a5a2e'));
    elipse(mx + 16, 178, 8, 2, H('#6a4424')); elipse(mx + 16, 177, 6, 1, H('#9a6e3a')); }
};
// ── C2 · la lectora congelada: «2009» en «2009»; tres voluntarios en «watched» y sus cerebros en «brains» ──
const C2 = (t) => {
  F12(61.6); AT.pausa(R, 1);
  const p = pop(t, TS.N2009 - 0.05, 0.35); if (p > 0) { luz(150, 46, 40, H('#fff4c0'), 0.35); R.numero('2009', 150, ri(56 - 6 * Math.min(1, p)), { tam: 16, centro: true }); }
  if (t > TS.CAMBRIDGE - 0.1) AT.anillo(R, 150, 50, 44, 16, t, tramo(t, TS.CAMBRIDGE - 0.1, TS.CAMBRIDGE + 0.5));
  voluntario(BL.alumna2BL, 100, t, TS.WATCHED - 0.1, TS.BRAINS - 0.05, { pal: { C: H('#c83a5a'), c: H('#9a2a44') } });
  voluntario(BL.buscadorBL, 140, t, TS.WATCHED + 0.1, TS.BRAINS + 0.15, { pal: { C: H('#3a8ac8'), c: H('#2a6a9a') } });
  voluntario(BL.alumnoBL, 180, t, TS.WATCHED + 0.3, TS.BRAINS + 0.35, { dir: -1, pal: { C: H('#e8a040'), c: H('#b87a2a') } });
  AT.atom(R, 262, 178, t, { s: 2, dir: -1, pose: t > TS.WATCHED ? 'senala' : 'brazos', cara: t > TS.BRAINS ? 'sonrisa' : 'normal', habla: habla(t) });
};
// ── C3 · el tapete congelado: Atom saca la tragaperras; en «slot machine» baja la palanca, ruedan, se paran cereza, cereza…
// y la tercera se pasa por uno en «without winning» ──
const C3 = (t) => {
  F10(50.0); AT.pausa(R, 1);
  const s = pop(t, TS.PLAYING, 0.35), g = 0.92 * tramo(t, TS.SLOT, TS.WINNING2);
  if (s > 0) { const y = ri(166 + 10 * (1 - Math.min(1, s))); luz(170, y - 46, 70, H('#fff4c0'), 0.25); T.pausa(R, 160, y, t, { cual: 'tragaperras', giro: g, numero: false }); }
  AT.atom(R, 66, 178, t, { s: 2, dir: 1, pose: t > TS.CLOSE ? 'brazos' : t > TS.SLOT - 0.2 ? 'senala' : 'sostiene', cara: t > TS.WINNING2 - 0.1 ? 'sorpresa' : t > TS.CLOSE ? 'sonrisa' : 'normal', habla: habla(t) });
};
// ── C4 · el taco congelado: el cerebro de la tragaperras se enciende en «lit up»; a la derecha, un premio de verdad (las
// monedas y la copa) con su cerebro, que se enciende igual en «prize»; entre los dos, «=» ──
const C4 = (t) => {
  F9(46.9); AT.pausa(R, 1);
  T.pausa(R, 112, 166, t, { cual: 'tragaperras', giro: 1, numero: false });
  const e = pop(t, TS.MUCH, 0.3); if (e > 0) { const y = ri(124 - 3 * Math.min(1, e)); rr(206, y, 222, y + 2, K); rr(207, y, 221, y + 1, H('#fff0a0')); rr(206, y + 6, 222, y + 8, K); rr(207, y + 6, 221, y + 7, H('#fff0a0')); }
  const pr = pop(t, TS.REAL - 0.2, 0.35); if (pr > 0) { const by = ri(170 + 8 * (1 - Math.min(1, pr))); luz(262, by - 20, 40, H('#ffe070'), 0.3);
    for (let k = 0; k < 9; k++) { const x = 246 + (k % 4) * 9 + (k > 3 ? 4 : 0) + (k > 7 ? 4 : 0), y = by - (k > 3 ? 5 : 0) - (k > 7 ? 5 : 0); elipse(x, y, 5, 2, K); elipse(x, y - 1, 4, 1, H('#f0c040')); ps(x - 2, y - 1, H('#fff0a0')); }
    const cx = 262, cy = by - 30; for (let j = 0; j < 20; j++) { const w = ri(14 - j * 0.3 - (j > 14 ? (j - 14) * 1.6 : 0)); rr(cx - w - 1, cy - 20 + j, cx + w + 1, cy - 20 + j, K); rr(cx - w, cy - 20 + j, cx + w, cy - 20 + j, j < 2 ? H('#fff0a0') : H('#f0c040')); rr(cx - w, cy - 20 + j, cx - w + 2, cy - 20 + j, H('#fff0a0')); rr(cx + w - 2, cy - 20 + j, cx + w, cy - 20 + j, H('#c89a30')); }
    rr(cx - 3, cy, cx + 3, cy + 8, K); rr(cx - 2, cy, cx + 2, cy + 8, H('#c89a30')); rr(cx - 10, cy + 8, cx + 10, cy + 13, K); rr(cx - 9, cy + 9, cx + 9, cy + 12, H('#a87820')); rr(cx - 9, cy + 9, cx + 9, cy + 9, H('#e8c040'));
    for (const sx of [-1, 1]) for (let q = 0; q < 2; q++) { R.linea(cx + sx * 15, cy - 17 + q, cx + sx * 21, cy - 12 + q, K); R.linea(cx + sx * 21, cy - 12 + q, cx + sx * 14, cy - 5 + q, K); } destello(cx - 6, cy - 14, 3);
    cerebro(cx, ri(by - 78), 2, t, { luz: t > TS.PRIZE ? 0.6 + 0.4 * Math.sin(t * 9) : 0 }); }
  AT.atom(R, 34, 178, t, { s: 2, dir: 1, pose: t > TS.MUCH ? 'senala' : 'brazos', cara: 'sorpresa', habla: habla(t) });
};
// ── C5 · el estudio congelado: Atom tira de la palanca una y otra vez; en «keep playing» echa más fichas; «!» en «more» ──
const C5 = (t) => {
  F4(22.9); AT.pausa(R, 1);
  const ciclo = (t - TS.AND_AFTER) / 1.1, g = ciclo < 0 ? 0 : (ciclo % 1) * 0.6;
  const m = T.pausa(R, 196, 166, t, { cual: 'tragaperras', giro: g, numero: false }) || {};
  for (let k = 0; k < 3; k++) { const u = (((t - TS.AND_AFTER) * 1.6) + k / 3) % 1; if (t > TS.KEEP - 0.4) { const x = lerp(96, 176, u), y = 128 - Math.sin(u * Math.PI) * 22; R.disco(ri(x), ri(y), 3, K); R.disco(ri(x), ri(y), 2, H('#f0c040')); ps(ri(x) - 1, ri(y) - 1, H('#fff0a0')); } }
  if (t > TS.MORE - 0.1) for (let k = 0; k < 2; k++) { const p = pop(t, TS.MORE - 0.1 + k * 0.2, 0.25); if (p > 0) R.icono('!', 92 + k * 18, ri(112 - 4 * Math.min(1, p)), H('#ffd040'), K, 3); }
  AT.atom(R, 72, 178, t, { s: 2, dir: 1, pose: t > TS.KEEP - 0.3 ? 'brazos' : 'sostiene', cara: 'sonrisa', habla: habla(t) });
};
// ── C6 · el escritorio congelado (el de la ratonera): las tres hojas a color; la del medio se descifra en «cracked» y las
// otras dos se quedan en «?»; en «near miss» las enmarca la ventana de una tragaperras; en «pushes» Atom coge la pala y
// se va a cavar; en «no» vuelve el color ──
const C6 = (t) => {
  F1(5.6);
  const vuelve = tramo(t, TS.NO, TS.NO + 0.6); AT.pausa(R, 1 - vuelve);
  const HX = [112, 162, 214], HY = [98, 92, 100];
  for (let k = 0; k < 3; k++) { const p = pop(t, TS.ONE + k * 0.15, 0.3); if (p <= 0) continue; const y = ri(HY[k] + 8 * (1 - Math.min(1, p)));
    if (k === 1 && t > TS.CRACKED) luz(162, 92, 40, H('#ffe070'), 0.3 + 0.1 * Math.sin(t * 6));
    T.d_hoja(R, HX[k], y, { n: k + 1, escala: 2, t, descifrada: k === 1 ? tramo(t, TS.CRACKED - 0.1, TS.CRACKED + 0.5) : 0 }); }
  if (t > TS.CRACKED + 0.3) T.visto(R, 176, 50, 2);
  for (const k of [0, 2]) { const p = pop(t, TS.THREE + (k ? 0.15 : 0), 0.3); if (p > 0) R.icono('?', HX[k] - 6, ri(48 - 3 * Math.min(1, p)), H('#fff0a0'), K, 2); }
  // la ventana de la tragaperras, en «near miss»
  const vm = pop(t, TS.NEAR - 0.1, 0.35); if (vm > 0) { const d = ri(-30 * (1 - Math.min(1, vm))); const x0 = 86, x1 = 240, y0 = 58 + d, y1 = 134 + d, CR = H('#c8ccd4');
    for (let x = x0; x <= x1; x++) { ps(x, y0, K); ps(x, y0 + 1, CR); ps(x, y0 + 2, H('#8a8e9a')); ps(x, y1, K); ps(x, y1 - 1, CR); ps(x, y1 - 2, H('#8a8e9a')); }
    for (let y = y0; y <= y1; y++) for (const x of [x0, x1, 136, 187]) { ps(x, y, K); ps(x + 1, y, CR); }
    for (let x = x0 + 2; x < x1 - 1; x += 2) ps(x, 96 + d, H('#ff4a3a')); }
  // Atom: señala, y en «pushes» lo empuja el «casi»: coge la pala y se va a cavar
  const va = ease(tramo(t, TS.PUSHES, TS.NO + 0.4)), x = lerp(40, 360, va);
  const a = AT.atom(R, x, 178, t, { s: 2, dir: 1, pose: va > 0 ? 'sostiene' : t > TS.NEAR - 0.1 ? 'brazos' : 'senala', cara: va > 0 ? 'sonrisa' : t > TS.NEAR ? 'guino' : 'normal', habla: habla(t) });
  if (va > 0) { const [mx, my] = a.mano; pala(mx, my, mx - 12, my - 16); for (let k = 0; k < 3; k++) { const u = ((t * 2) + k / 3) % 1; tine(x - 26 - u * 20, 176 - u * 6, H('#e8e0d0'), 0.5 * (1 - u)); } }
};
T.rodar(E, R, [[0, C1], [TS.IN, C2], [TS.PLAYING, C3], [TS.BRAIN, C4], [TS.AND_AFTER, C5], [TS.ONE, C6]], {
  efectos: [[0.1, 'tapestop'], [TS.BECAUSE, 'brillo'], [TS.DIGGING, 'golpecito'], [TS.N2009, 'pop'], [TS.WATCHED, 'pop'], [TS.BRAINS, 'brillo'], [TS.PLAYING, 'whoosh'],
    [TS.SLOT, 'interruptor'], [TS.SLOT + 0.3, 'maquina'], [TS.WINNING2, 'boing'], [TS.LIT, 'brillo'], [TS.PRIZE, 'campana'], [TS.KEEP, 'interruptor'], [TS.MORE, 'pop'],
    [TS.ONE, 'papel'], [TS.CRACKED, 'brillo'], [TS.NEAR, 'boing'], [TS.PUSHES, 'whoosh'], [TS.NO, 'tapestop']],
  año: 1970 });
'''

CAB_CASI = r'''// bl-casi (frase 22, PAUSA «fíjate»): el mundo de bl-friedman congelado en gris azulado (los mismos planos y funciones)
// y Atom al doble, a color.
// 1 · La sala del ordenador congelada (el último instante de bl-friedman): Atom entra, rodea la tira en «because» y en
//   «digging» se pone a cavar con una palita. Corta en «In 2009».
// 2 · La lectora congelada: «2009»; la órbita en «Cambridge»; tres voluntarios en «watched» y sus cerebros en «brains».
// 3 · El tapete congelado: la tragaperras; la palanca baja en «slot machine»; cereza, cereza… y la tercera se pasa por
//   uno en «without winning» (el cerebro se enciende). Corta en «brain areas».
// 4 · El taco congelado: el cerebro encendido de la tragaperras «=» el de un premio de verdad (monedas y copa), que se
//   enciende en «prize». Corta en «and that afterwards».
// 5 · El estudio congelado: Atom tira de la palanca una y otra vez y echa más monedas en «keep playing»; «!» en «more».
// 6 · El escritorio de la ratonera congelado: las tres hojas a color; la del medio se descifra en «cracked», las otras con
//   «?»; en «near miss» las enmarca la ventana de una tragaperras; en «pushes» Atom coge la pala y se va a cavar; en «no»
//   vuelve el color.'''

E['bl-hart'] = ('La fiebre', CAB_HART, th_en() + COMUN + HART)
E['bl-friedman'] = ('Friedman y Hammer', CAB_FRIEDMAN, tf_en() + COMUN + 'const NOCHE = pal([\'#080c1c\', \'#0e1428\', \'#161e38\', \'#202a4a\', \'#2c385c\', \'#3a4870\']);\n' + COMPARTIDO + FRIEDMAN)
E['bl-casi'] = ('Fíjate: el casi', CAB_CASI, tf_num() + ts_en() + COMUN + 'const NOCHE = pal([\'#080c1c\', \'#0e1428\', \'#161e38\', \'#202a4a\', \'#2c385c\', \'#3a4870\']);\n' + COMPARTIDO + CASI)
