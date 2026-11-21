# Borrador de escenas del ep45, grupo S6: vd-rey y vd-malo (formato del 11: E[id] = (título, cabecera, cuerpo)).
# Los instantes se escriben en el cuerpo como @T(s) (segundos desde el inicio de la escena, de las palabras inglesas de
# atomo/build/largo/ep45/linea.json) y se traducen aquí a en('marca', fracción) con las marcas reales de la voz.
import json
import os
import re

_RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
_MARCAS = json.load(open(os.path.join(_RAIZ, 'atomo/plato/escenas/marcas-ep45.json')))


def _en(id_, cuerpo):
    fr = _MARCAS[id_]['frases']
    nombres = [k for k in _MARCAS[id_]['marcas'] if not k.endswith('_fin')]

    def una(m):
        s = float(m.group(1))
        k = 0
        for i, (a, b) in enumerate(fr):
            if s >= a - 0.45:
                k = i
        a, b = fr[k]
        return "en('%s', %.4f)" % (nombres[k], (s - a) / (b - a))
    return re.sub(r'@T\(([\d.]+)\)', una, cuerpo)


E = {}

# ── lo común a las dos escenas: utilidades, texturas, piezas y el último plano de vd-rey (Doom de espaldas en el
# ventanal del trono), que vd-malo congela ───────────────────────────────────────────────────────────────────────
COMUN = r'''
const K = hex('#1a1424'), H = (s) => hex(s), ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const hh = (x, y, k = 0) => { const v = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return v - Math.floor(v); };
const rgb = (c) => [c & 255, (c >> 8) & 255, (c >> 16) & 255];
const mez = (a, b, u) => { const A = rgb(a), B = rgb(b); return (0xff000000 | (Math.round(A[2] + (B[2] - A[2]) * u) << 16) | (Math.round(A[1] + (B[1] - A[1]) * u) << 8) | Math.round(A[0] + (B[0] - A[0]) * u)) >>> 0; };
const voz = (t) => E.energia(t);
const CACHE = new Map();
const horno = (k, f) => { if (!CACHE.has(k)) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); CACHE.set(k, b); } return CACHE.get(k); };
const ps = (x, y, c) => R.pset(Math.round(x), Math.round(y), c);
// degradado vertical con trama de Bayer
const rampa = (x0, y0, x1, y1, cs) => { const n = cs.length - 1; for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), u = f - i; for (let x = x0; x <= x1; x++) R.pset(x, y, u > bay(x, y) ? cs[i + 1] : cs[i]); } };
// una luz (o una sombra) que se funde con lo que hay debajo
const luz = (cx, cy, rx, ry, col, a) => { for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, cx + rx); x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d >= 1) continue; const g = (1 - d) * a; if (g > bay(x, y) * 0.35) R.pset(x, y, mez(R.pget(x, y), col, Math.min(1, g))); } };
// pared de bloques pintados (con juntas, tono de cada bloque y poros)
const bloques = (x0, y0, x1, y1, [cL, c, cS], k = 0, w = 16, h = 8) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / h), off = fila % 2 ? w / 2 : 0, jy = (y - y0) % h;
  for (let x = x0; x <= x1; x++) { const bx = Math.floor((x - x0 + off) / w), jx = (x - x0 + off) % w; let col;
    if (jy === h - 1 || jx === w - 1) col = cS; else if (jy === 0 || jx === 0) col = cL; else { col = c; const q = hh(bx, fila, k); if (q > 0.72) col = mez(c, cS, 0.22); else if (q < 0.18) col = mez(c, cL, 0.2); if (hh(x, y, k + 3) > 0.94) col = mez(col, cS, 0.45); }
    R.pset(x, y, col); } } };
// tablas de madera con vetas, juntas y nudos (horizontales)
const tablas = (x0, y0, x1, y1, [cL, c, cS], h = 9, k = 0) => { for (let y = y0; y <= y1; y++) { const j = Math.floor((y - y0) / h), jy = (y - y0) % h;
  for (let x = x0; x <= x1; x++) { let col = c; const g = Math.sin(x * 0.06 + j * 3.1 + Math.sin(x * 0.011 + j * 1.7) * 4 + jy * 0.8);
    if (jy === 0) col = cS; else if (jy === 1) col = mez(c, cL, 0.35); else if (g > 0.84) col = mez(c, cS, 0.42); else if (g < -0.88) col = mez(c, cL, 0.3);
    if ((x + j * 61) % 113 === 0) col = cS; const nk = hh(Math.floor(x / 29), j, k); if (nk > 0.9 && Math.hypot((x % 29) - 14, jy - h / 2) < 2) col = mez(c, cS, 0.6);
    R.pset(x, y, col); } } };
// tablas verticales (pared de una casa de madera)
const tablasV = (x0, y0, x1, y1, [cL, c, cS], w = 10, k = 0) => { for (let x = x0; x <= x1; x++) { const j = Math.floor((x - x0) / w), jx = (x - x0) % w;
  for (let y = y0; y <= y1; y++) { let col = c; const g = Math.sin(y * 0.07 + j * 2.3 + Math.sin(y * 0.013 + j) * 3 + jx * 0.7);
    if (jx === 0) col = cS; else if (jx === 1) col = mez(c, cL, 0.3); else if (g > 0.86) col = mez(c, cS, 0.4); else if (g < -0.9) col = mez(c, cL, 0.28);
    if (hh(j, Math.floor(y / 23), k) > 0.92 && Math.hypot(jx - w / 2, (y % 23) - 11) < 1.6) col = mez(c, cS, 0.6); R.pset(x, y, col); } } };
// nube de tres tonos (con recorte opcional [x0, y0, x1, y1])
const NUB = [H('#f4f2ee'), H('#d2d6de'), H('#a8b0c0')];
const nube = (x, y, w, tono = NUB, clip) => { x = Math.round(x); y = Math.round(y); const n = Math.max(3, Math.round(w / 9));
  const d = (cx, cy, r, c) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r + r) { const X = cx + i, Y = cy + j; if (!clip || (X >= clip[0] && X <= clip[2] && Y >= clip[1] && Y <= clip[3])) R.pset(X, Y, c); } };
  for (let k = 0; k < n; k++) d(x + Math.round((k + 0.5) * w / n), y + 2, Math.round(w / n * (0.62 + 0.3 * Math.sin(k * 2.3 + w))), tono[2]);
  for (let k = 0; k < n; k++) d(x + Math.round((k + 0.5) * w / n) - 1, y, Math.round(w / n * (0.55 + 0.3 * Math.sin(k * 2.3 + w))), tono[1]);
  for (let k = 1; k < n - 1; k++) d(x + Math.round((k + 0.3) * w / n) - 1, y - 2, Math.max(1, Math.round(w / n * (0.42 + 0.3 * Math.sin(k * 1.7 + w)))), tono[0]); };
// nubes que pasan en bucle: [x0, y, ancho, velocidad]
const pasan = (t, lista, tono, clip) => { for (const [x0, y, w, v] of lista) nube((((x0 + t * v) % 400) + 400) % 400 - 50, y, w, tono, clip); };
const pajaro = (x, y, t, col) => { x = Math.round(x); y = Math.round(y); const a = Math.floor(t * 9 + x) % 2; R.pset(x, y, col); R.pset(x + 1, y, col); R.pset(x + 2, y - 1 + a * 2, col); R.pset(x - 1, y - 1 + a * 2, col); R.pset(x + 3, y - 2 + a * 3, col); R.pset(x - 2, y - 2 + a * 3, col); };
// humo en bolitas que suben y crecen
const humito = (x, y, t, sem, alto = 18, c0 = H('#b8bcc8'), c1 = H('#e8eaf0'), r0 = 0.8) => { for (let k = 0; k < 5; k++) { const f = (t * 0.4 + k / 5 + sem) % 1, r = r0 + f * 2.4; if (f > bay(k, Math.floor(t * 8)) * 1.6) continue; R.disco(x + Math.sin(f * 5 + sem * 9) * 2, y - f * alto, r, mez(c0, c1, f)); } };
// el perfil de una sierra y la sierra pintada (luz a la izquierda, nieve en las cumbres)
const perfil = (x, sem, base, amp) => base - amp * (0.55 * Math.abs(Math.sin(x * 0.021 + sem)) + 0.3 * Math.abs(Math.sin(x * 0.053 + sem * 2.1)) + 0.15 * (0.5 + 0.5 * Math.sin(x * 0.13 + sem * 3.7)));
const sierra = (sem, base, amp, [cL, c, cS], nieve, y1 = 179) => { for (let x = 0; x < 320; x++) { const top = Math.round(perfil(x, sem, base, amp)), dl = perfil(x + 1, sem, base, amp) - perfil(x - 1, sem, base, amp);
  for (let y = Math.max(0, top); y <= y1; y++) { let col = dl > 0.25 ? cS : dl < -0.25 ? cL : c; if (nieve && y - top < 4 + hh(x, 1, sem) * 5 && top < base - amp * 0.5) col = dl > 0.25 ? nieve[1] : nieve[0];
    else if (nieve && hh(x >> 1, y >> 1, sem) > 0.9 && y - top < 22) col = nieve[1]; if (hh(x, y, sem + 1) > 0.95) col = mez(col, cS, 0.4); R.pset(x, y, col); } } };
// un pino por pisos (nevado si nieve), de base (x, base) y alto h
const pino = (x, base, h, [c, cS], nieve, k = 0) => { const n = Math.max(3, Math.round(h / 11)); R.rect(x - 1, base - Math.round(h * 0.22), x + 1, base, H('#4a2e1a')); R.pset(x - 1, base - 3, H('#6a4428'));
  for (let i = 0; i < n; i++) { const top = base - h + Math.round(i * h * 0.78 / n), alto = Math.round(h * 0.3), w0 = Math.round(h * 0.1 + i * h * 0.3 / n);
    for (let j = 0; j < alto; j++) { const w = Math.round(w0 * (j + 1) / alto), y = top + j; for (let dx = -w; dx <= w; dx++) { let col = dx > w * 0.25 ? cS : c;
      if (j === alto - 1 && (dx + i + k) % 3 === 0) continue; if (j === alto - 1) col = cS;
      const capa = j < 2 + Math.round(1.5 * Math.sin(dx * 0.9 + i)) ;
      if (nieve && capa && dx < w * 0.7) col = dx > 0 ? nieve[1] : nieve[0]; else if (nieve && hh(x + dx, y, k) > 0.93) col = nieve[1]; R.pset(x + dx, y, col); } } } };
// la llama de una vela o una antorcha (s: tamaño)
const llama = (x, y, t, s = 1, sem = 0) => { const f = Math.sin(t * 17 + sem) * 0.5 + Math.sin(t * 7.3 + sem * 2) * 0.5, hg = Math.max(2, Math.round((3.2 + f) * s));
  for (let j = 0; j <= hg; j++) { const w = Math.max(0, Math.round((1 - j / hg) * 1.3 * s)), dx = Math.round(Math.sin(t * 9 + j + sem) * 0.5 * j / hg * s);
    for (let i = -w; i <= w; i++) R.pset(x + i + dx, y - j, j < hg * 0.45 && Math.abs(i) < Math.max(1, w) ? H('#fff4c0') : j > hg * 0.7 ? H('#e86a2a') : H('#f8b840')); } };
// una antorcha de pared: soporte de hierro, la tea y su luz
const antorcha = (x, y, t, sem = 0, col = H('#f0a050')) => { luz(x, y - 4, 22, 20, col, 0.32 + Math.sin(t * 11 + sem) * 0.04); R.rect(x - 1, y, x + 1, y + 9, H('#3a2a1e')); R.rect(x - 3, y + 6, x + 3, y + 7, H('#2a2a32')); R.rect(x - 2, y - 1, x + 2, y + 1, H('#5a3a24')); llama(x, y - 2, t, 2, sem); };
// una velita con su palmatoria
const vela = (x, y, t, sem = 0, alto = 7) => { R.rect(x - 2, y - alto, x + 1, y, H('#f0e8d0')); R.rect(x + 1, y - alto, x + 1, y, H('#c8bca0')); R.rect(x - 4, y + 1, x + 3, y + 2, H('#8a6a3a')); R.pset(x - 4, y + 1, H('#c8a060')); R.pset(x, y - alto - 1, K); llama(x, y - alto - 2, t, 1, sem); };
// un corazón de 7 × 6 (no hay icono en el kit)
const corazon = (x, y, c = H('#e84a5a')) => { for (const [i, j] of [[1, 0], [2, 0], [4, 0], [5, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [2, 4], [3, 4], [4, 4], [3, 5]]) R.pset(x + i, y + j, c); R.pset(x + 1, y + 1, H('#ffd0d8')); };
// Doom de espaldas (17 × 27): la capucha verde, las hombreras de hierro, la capa y las botas
const DOOM_ESP = [
  '......kkkkk......',
  '.....kVVVVVk.....',
  '....kVVVVVVvk....',
  '....kVVVVVVvk....',
  '...kVVVVVVVVvk...',
  '...kVVVVVVVVvk...',
  '...kVVVVVVVVvk...',
  '....kVVVVVVvk....',
  '..kkkkVVVVvkkkk..',
  '.kZZZzkvvvkZZzzk.',
  '.kZZzzkCCCkZzzzk.',
  'kCkkkkCCCCCkkkkck',
  'kCCCCCCCcCCCCCCck',
  'kCCCCCCCcCCCCCcck',
  'kCCCcCCCcCCCcCcck',
  'kCCCcCCCcCCCcCcck',
  'kCCCcCCCcCCCcCcck',
  'kCCCcCCCCcCCcCcck',
  'kCCCcCCCCcCCcCcck',
  'kCCcCCCCCcCCCcCck',
  'kCCcCCCCCcCCCcCck',
  'kCCcCCCCCcCCCcCck',
  '.kCcCCCCCcCCCcck.',
  '.kkkkkkkkkkkkkkk.',
  '...kbbbk.kbbbk...',
  '...kbbbk.kbbbk...',
  '...kkkkk.kkkkk...'];
const PAL_ESP = { k: K, V: H('#2e7a3e'), v: H('#1e5a2a'), Z: H('#a8acbc'), z: H('#6a6e80'), C: H('#2a6a38'), c: H('#1a4a26'), b: H('#4a4e5e') };
const doomEspaldas = (x, suelo, t, o = {}) => { x = Math.round(x); const y0 = Math.round(suelo - 27 + (o.baja ?? 0) * 0), resp = Math.sin(t * 2.2) > 0.8 ? 1 : 0;
  R.dibujo(DOOM_ESP.slice(0, 11), x, y0 + resp + (o.baja ? 1 : 0), 1, PAL_ESP); R.dibujo(DOOM_ESP.slice(11), x, y0 + 11, 1, PAL_ESP);
  // el bajo de la capa ondea
  for (let i = 1; i < 16; i++) { const w = Math.sin(t * 3 + i * 0.7) * (o.viento ?? 0.6); if (w > 0.3) R.pset(x + i, y0 + 23, PAL_ESP.c); if (w > 0.7) R.pset(x + i, y0 + 24, K); } };

// ── el último plano de vd-rey: el ventanal de la sala del trono, de noche. Doom de espaldas mira por el ventanal; a lo
// lejos, en la colina, una luz verde que se apaga; el trono vacío a la izquierda. TT: instantes (s) de vd-rey
const ventanalFondo = () => horno('ventanal', () => {
  // la pared de sillares oscuros, con la luz fría de la luna
  bloques(0, 0, 319, 159, [H('#4a4a5a'), H('#363644'), H('#22222e')], 41, 18, 9);
  // pilastras con fuste y capitel
  for (const px of [96, 224]) { for (let y = 8; y < 160; y++) for (let x = px - 7; x <= px + 7; x++) R.pset(x, y, x === px - 7 || x === px + 7 ? H('#1a1a24') : x < px - 3 ? H('#5a5a6a') : x > px + 3 ? H('#2a2a36') : (y % 22 === 0 ? H('#2a2a36') : H('#44444f')));
    R.rect(px - 9, 6, px + 9, 10, H('#1a1a24')); R.rect(px - 8, 7, px + 8, 8, H('#6a6a7a')); R.rect(px - 9, 150, px + 9, 159, H('#1a1a24')); R.rect(px - 8, 151, px + 8, 153, H('#5a5a6a')); }
  // el hueco del ventanal (arco apuntado) con su derrame de piedra
  const dentro = (x, y, m = 0) => { if (x < 116 - m || x > 204 + m || y > 136 + m) return false; if (y >= 58) return true; const r = 50 + m, dx = Math.abs(x - 160); return Math.hypot(dx + 6, y - 58) < r && y >= 18 - m; };
  for (let y = 10; y < 146; y++) for (let x = 106; x < 214; x++) if (dentro(x, y, 7) && !dentro(x, y)) R.pset(x, y, (x + y) % 9 === 0 ? H('#2a2a36') : x < 160 ? H('#5a5a6a') : H('#3a3a48'));
  // el alféizar
  R.rect(104, 137, 216, 143, K); R.rect(105, 137, 215, 139, H('#7a7a8a')); R.rect(105, 140, 215, 142, H('#4a4a58'));
  // el suelo de losas en perspectiva
  for (let y = 160; y < 180; y++) { const f = (y - 160) / 20, fila = Math.floor((y - 160) / (3 + f * 4)); for (let x = 0; x < 320; x++) { const dx = ((x - 160) / (1 + f) + fila * 9 + 640) % 22; let c = dx < 1 || (y - 160) % Math.round(3 + f * 4) === 0 ? H('#1a1a24') : hh(Math.floor(((x - 160) / (1 + f) + fila * 9) / 22), fila, 9) > 0.5 ? H('#30303c') : H('#2a2a34'); R.pset(x, y, c); } }
  R.rect(0, 159, 319, 160, H('#14141c'));
  // dos estandartes verdes con el aro de cuatro puntas (sin letras)
  for (const bx of [128 - 66, 192 + 50]) { for (let y = 20; y < 92; y++) for (let x = bx; x < bx + 18; x++) { const pico = y > 84 && Math.abs(x - bx - 8.5) < (y - 84) * 1.2; if (pico) continue; R.pset(x, y, x === bx || x === bx + 17 ? H('#123a1e') : (x - bx) % 6 === 0 ? H('#1e5a2a') : H('#2e7a3e')); }
    R.rect(bx - 2, 18, bx + 19, 20, H('#c8a040')); R.disco(bx + 9, 50, 5, H('#e8c050')); R.disco(bx + 9, 50, 3, H('#2e7a3e')); for (const [dx, dy] of [[0, -7], [0, 7], [-7, 0], [7, 0]]) R.pset(bx + 9 + dx, 50 + dy, H('#e8c050')); }
  // el trono vacío a la izquierda (de lado): respaldo alto de hierro con puntas, el cojín verde, el brazo
  for (let y = 40; y < 160; y++) for (let x = 14; x < 30; x++) R.pset(x, y, x === 14 || x === 29 ? K : x < 18 ? H('#7a7e8e') : x > 25 ? H('#3a3e4a') : H('#5a5e6c'));
  for (let k = 0; k < 3; k++) { const px = 16 + k * 5; R.linea(px, 40, px + 1, 30 - k % 2 * 4, K); R.pset(px + 1, 31 - k % 2 * 4, H('#a8acbc')); }
  R.rect(30, 118, 66, 126, K); R.rect(31, 119, 65, 124, H('#2e7a3e')); R.rect(31, 119, 65, 119, H('#4a9a5a'));
  R.rect(30, 126, 64, 158, K); R.rect(31, 127, 63, 157, H('#4a4e5c')); for (let y = 130; y < 156; y += 6) R.rect(32, y, 62, y, H('#3a3e4a')); R.rect(31, 127, 63, 128, H('#7a7e8e'));
  R.rect(40, 104, 64, 108, K); R.rect(41, 105, 63, 107, H('#6a6e7c')); R.rect(60, 108, 64, 126, K); R.rect(61, 108, 63, 125, H('#5a5e6c'));
  R.disco(22, 80, 5, H('#c8a040')); R.disco(22, 80, 3, H('#2e7a3e'));
  // los braseros de pie (cuenco y trípode)
  for (const bx of [86, 236]) { R.linea(bx - 6, 158, bx, 138, K); R.linea(bx + 6, 158, bx, 138, K); R.linea(bx, 158, bx, 138, H('#3a3a44')); R.rect(bx - 9, 132, bx + 9, 138, K); R.rect(bx - 8, 133, bx + 8, 137, H('#5a4a3a')); R.rect(bx - 8, 133, bx + 8, 133, H('#8a7a5a')); }
  // la alfombra verde hasta el ventanal
  for (let y = 161; y < 180; y++) { const w = 22 + (y - 161) * 1.6; for (let x = Math.round(160 - w); x <= 160 + w; x++) R.pset(x, y, Math.abs(Math.abs(x - 160) - w) < 1.5 ? H('#c8a040') : (x + y) % 7 === 0 ? H('#246a32') : H('#2e7a3e')); }
});
const ventanalFinal = (t, TT) => {
  R.copiar(ventanalFondo());
  const dentro = (x, y) => { if (x < 116 || x > 204 || y > 136) return false; if (y >= 58) return true; return Math.hypot(Math.abs(x - 160) + 6, y - 58) < 50 && y >= 18; };
  // lo que se ve por el ventanal: cielo de noche, estrellas, luna, nubes, montes y la colina con la luz verde
  for (let y = 12; y < 137; y++) for (let x = 116; x <= 204; x++) { if (!dentro(x, y)) continue; let c = mez(H('#141a3e'), H('#3a3a6a'), (y - 12) / 125); if (hh(x, y, 3) > 0.985) c = Math.sin(t * 3 + x) > 0 ? H('#f0f0ff') : H('#8a8ab0');
    const m1 = perfil(x * 2, 2.2, 112, 26), m2 = 122 - 10 * Math.exp(-(((x - 180) / 14) ** 2)) - 3 * Math.sin(x * 0.08);
    if (y > m1) c = y - m1 < 3 ? H('#c8cce0') : H('#2a2e4a'); if (y > m2) c = (x + y) % 5 === 0 ? H('#1a1c30') : H('#20243a');
    R.pset(x, y, c); }
  R.disco(140, 40, 6, H('#e8e8f0')); R.disco(142, 39, 5, H('#f8f8ff')); R.pset(138, 42, H('#c8c8d8')); R.pset(141, 37, H('#d8d8e8'));
  for (const [x0, y, w, v] of [[0, 52, 24, 1.2], [60, 34, 30, 0.7], [140, 72, 20, 1.6]]) nube((((x0 + t * v) % 140) + 140) % 140 + 90, y, w, [H('#6a6a90'), H('#4a4a72'), H('#34345a')], [116, 18, 204, 136]);
  // la luz verde lejana, en la colina, que se apaga en «loved him»
  const verde = 1 - tramo(t, TT.apaga - 1.2, TT.apaga + 0.4);
  if (verde > 0) { for (let y = 70; y < 113; y++) { const g = (1 - (113 - y) / 43) * verde; if (g > bay(180, y) * 0.9) { R.pset(180, y, mez(R.pget(180, y), H('#a8ffc8'), g)); if (g > 0.4) R.pset(181, y, mez(R.pget(181, y), H('#6ae890'), g * 0.6)); } }
    R.disco(180, 112, 1.5 + verde, mez(H('#20243a'), H('#c8ffd8'), verde)); }
  // el haz de luna que entra y cae sobre el suelo
  for (let y = 143; y < 180; y++) for (let x = 110; x < 212; x++) { const k = (y - 143) / 37, xa = 116 + k * 22, xb = 204 + k * 30; if (x < xa || x > xb) continue; if (0.18 > bay(x, y) * 0.9) R.pset(x, y, mez(R.pget(x, y), H('#a8b8e8'), 0.22)); }
  // los braseros encendidos
  for (const [bx, s] of [[86, 1], [236, 2]]) { luz(bx, 124, 30, 26, H('#f0a050'), 0.3); for (let k = -2; k <= 2; k++) llama(bx + k * 3, 132, t, 1.6, s * 3 + k); }
  // Doom de espaldas mira por el ventanal; en «paying» baja la cabeza
  doomEspaldas(152, 170, t, { baja: t > TT.paga ? 1 : 0, viento: 0.5 + 0.4 * Math.sin(t * 0.7) });
  // motas de polvo en el haz de luna
  for (let k = 0; k < 10; k++) { const u = (t * 0.05 + k * 0.1) % 1; ps(124 + hh(k, 1, 7) * 80 + Math.sin(t + k) * 3, 150 - u * 80, H('#c8d0f0')); }
};
'''

# instantes del último plano de vd-rey (s): la luz verde se apaga en «loved him» (79,62) y Doom baja la cabeza en «paying» (78,36)
TT15 = '{ apaga: 79.62, paga: 78.36 }'

E['vd-rey'] = ('El rey', '''// VD-REY (frases 19–20), sin cartela; sin año hasta «1962», «2003» desde «one day». Quince planos, cortados en la palabra:
// 1. el puerto de montaña al alba: Doom, con la armadura nueva, cruza el filo; en «Latveria» señala el valle y se
//    encienden las ventanas del castillo;
// 2. la sala del trono: en «overthrows» cae el estandarte azul del ciervo, el viejo rey huye y pierde la corona; Doom
//    sube y se sienta en «throne»; Atom, incómodo, en «uncomfortable»;
// 3. la plaza de día: la panadera da un pan a la niña en «hunger»; el chico devuelve la bolsa al señor en «crime»;
// 4. la casa romaní, caliente: la mesa llena, la abuela pone una flor bajo el retrato de la máscara en «love him» y Boris
//    brinda en «promise»;
// 5. el pino del padre al anochecer: Doom deja un farol sobre el mojón en «treat»; la luz crece en «father»;
// 6. Doomstadt de noche: un vecino alza un cartel con una «X» en «disagree»; el foco verde del castillo lo encuentra;
// 7. la plaza al atardecer (GAG): Atom saluda y los ocho robots de las ventanas se giran a la vez hacia él;
// 8. un salón de 1962: la tele con los cuatro de azul y el «4»; en «1962» entra la figura verde y el niño da un salto;
// 9. la azotea de Nueva York: los cuatro; Doom baja con sus propulsores en «enemy» y señala en «plans»;
// 10. el muro de los planes: Doom clava la foto de Reed en «Reed Richards»; en «right» sale el «✓» junto al 0.8;
// 11. la cripta: Doom cruza la raya del círculo en «crosses» y la reja cae detrás en «no coming back»;
// 12. el laboratorio del castillo (2003): la aguja sube a tope en «power»; en «science» saltan los fusibles; la luz
//    verde del libro en «to get it»;
// 13. la colina de lejos, de noche: en «sacrifices Valeria» la columna de luz verde y la figura del chal que se deshace
//     en motas; en «nobody» se apaga la vela de la ventana;
// 14. la mesa de los pergaminos: Atom piensa en «think»; el sello rojo de la mano late en «deal with a demon»;
// 15. el ventanal del trono: Doom de espaldas; la luz verde lejana se apaga en «loved him» (vd-malo lo congela).''', _en('vd-rey', COMUN + r'''
const TT = ''' + TT15 + r''';
const P2 = @T(5.80), P3 = @T(11.50), P4 = @T(17.22), P5 = @T(22.88), P6 = @T(28.42), P7 = @T(32.30), P8 = @T(37.16), P9 = @T(43.96),
  P10 = @T(49.60), P11 = @T(53.88), P12 = @T(58.20), P13 = @T(63.34), P14 = @T(69.82), P15 = @T(75.56);

// ── 1 · el puerto de montaña al alba ─────────────────────────────────────────────────────────────────────────────
const CASAS1 = Array.from({ length: 44 }, (_, k) => [196 + Math.round(hh(k, 1, 31) * 106), 112 + Math.round(hh(k, 2, 31) * 22), 5 + Math.round(hh(k, 3, 31) * 4)]).sort((a, b) => a[1] - b[1]);
const fondoPuerto = () => horno('puerto', () => {
  rampa(0, 0, 319, 104, [H('#2e3a76'), H('#4e5294'), H('#94689a'), H('#e08a7a'), H('#f6c48a')]);
  luz(250, 92, 54, 34, H('#fff0c0'), 0.55); R.disco(250, 95, 9, H('#ffe8a8')); R.disco(250, 95, 7, H('#fff6d8'));
  sierra(1.3, 82, 36, [H('#c09ab8'), H('#9480aa'), H('#6e5c8c')], [H('#fbe8f0'), H('#dcc0d8')], 130);
  sierra(4.1, 104, 26, [H('#7e7ea4'), H('#5e5e88'), H('#46466c')], [H('#ecE8f6'), H('#bcb8d4')], 140);
  // el valle nevado con el río
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < perfil(x, 4.1, 104, 26) + 8) continue;
    let c = (y - 100) / 80 > bay(x, y) * 1.4 ? H('#b4bed6') : H('#ccd4e6'); if (hh(x >> 2, y >> 1, 19) > 0.88) c = H('#a4aec8');
    const rx = 140 + Math.sin((y - 100) * 0.08) * 24 + (y - 100) * 0.5, rw = 1.2 + (y - 100) * 0.05; if (Math.abs(x - rx) < rw) c = Math.abs(x - rx) < rw * 0.45 ? H('#e8f0fa') : H('#7a9ac0');
    R.pset(x, y, c); }
  // los bosques: pinitos en manchas (más pequeños al fondo)
  for (let k = 0; k < 230; k++) { const g = k % 6, gx = [30, 80, 120, 175, 205, 300][g], gy = [112, 124, 108, 118, 132, 138][g], y = Math.round(gy + (hh(k, 1, 21) - 0.5) * 16), x = Math.round(gx + (hh(k, 2, 21) - 0.5) * 44), s = 2 + Math.round((y - 100) / 22);
    if (y < perfil(x, 4.1, 104, 26) + 10) continue; const rx = 140 + Math.sin((y - 100) * 0.08) * 24 + (y - 100) * 0.5; if (Math.abs(x - rx) < 5) continue;
    for (let j = 0; j < s * 2 + 1; j++) { const w = Math.floor(j / 2); for (let i = -w; i <= w; i++) R.pset(x + i, y - s * 2 + j, i > 0 ? H('#1a3024') : (j < 2 ? H('#e8eef8') : H('#2a4a36'))); } }
  // la peña y el castillo de piedra con sus torres de tejado verde
  R.poligono([[210, 128], [222, 108], [236, 99], [258, 97], [272, 104], [284, 128]], H('#5a5868')); R.poligono([[222, 128], [231, 110], [243, 103], [250, 128]], H('#74728a'));
  for (let k = 0; k < 14; k++) R.pset(220 + Math.round(hh(k, 1, 33) * 60), 104 + Math.round(hh(k, 2, 33) * 22), H('#e8ecf4'));
  R.rect(230, 86, 266, 104, H('#6a6a7c')); R.rect(230, 86, 266, 87, H('#9a9aac')); for (let x = 230; x <= 266; x += 3) R.rect(x, 84, x + 1, 85, H('#6a6a7c'));
  for (let y = 90; y < 104; y += 4) for (let x = 231; x < 266; x++) if ((x + y) % 7 === 0) R.pset(x, y, H('#5a5a6c'));
  for (const [x0, x1, top] of [[225, 233, 70], [262, 270, 74], [242, 254, 60]]) { R.rect(x0, top, x1, 104, H('#5e5e70')); R.rect(x0, top, x0 + 1, 104, H('#8a8a9c')); R.rect(x1, top, x1, 104, H('#44445a'));
    R.poligono([[x0 - 1, top], [Math.round((x0 + x1) / 2), top - 10], [x1 + 1, top]], H('#2e7a3e')); R.linea(x0 - 1, top, Math.round((x0 + x1) / 2), top - 10, H('#5aaa6a')); R.pset(Math.round((x0 + x1) / 2), top - 10, H('#f0f4fa')); }
  R.rect(247, 42, 248, 50, K); R.rect(249, 42, 255, 45, H('#2e7a3e')); R.pset(252, 43, H('#e8c050'));
  R.rect(244, 95, 252, 104, K); R.rect(245, 96, 251, 104, H('#2a2230'));
  // la ciudad al pie: casitas de tejado rojo con nieve, y humo (las de delante tapan la peña)
  for (const [x, y, w] of CASAS1) { R.rect(x, y - 5, x + w, y, H('#e0d0b0')); R.rect(x + w, y - 5, x + w, y, H('#a89878')); for (let j = 0; j < 3; j++) R.rect(x - 1 + j, y - 6 - j, x + w + 1 - j, y - 6 - j, j === 2 ? H('#f0f0f8') : j === 1 ? H('#c8584a') : H('#a8382a')); R.pset(x + 2, y - 3, H('#4a3a2a')); if (w > 5) R.pset(x + w - 2, y - 3, H('#4a3a2a')); }
  // el filo de roca del primer término: nieve pisada con huellas, piedras, matas secas y la cara del cortado
  for (let x = 0; x < 320; x++) { const top = x < 206 ? 146 + Math.round(Math.sin(x * 0.11) * 1.5 + hh(x >> 2, 0, 4) * 2) : 146 + (x - 206) * 2.4; for (let y = Math.max(0, Math.round(top)); y < 180; y++) {
    const d = y - top; let c = d < 3 ? H('#f4f6fc') : d < 6 ? H('#d4dcec') : (d < 14 && hh(x >> 1, y, 5) > 0.35) ? H('#c4cce0') : hh(x >> 2, y >> 1, 6) > 0.5 ? H('#5e5c6c') : H('#4a4858');
    if (d >= 14 && (x * 3 + y * 5) % 37 === 0) c = H('#2e2c3a'); if (d >= 14 && hh(x, y, 8) > 0.93) c = H('#7a7888');
    if (x > 200 && x - 206 > (y - 146) / 2.4 - 3) c = x - 206 > (y - 146) / 2.4 - 1 ? H('#2a2836') : H('#3a3846'); R.pset(x, y, c); } }
  for (let x = 4; x < 200; x += 9) { R.pset(x, 150 + (x % 2), H('#a8b2cc')); R.pset(x + 3, 152 - (x % 2), H('#a8b2cc')); }
  for (let k = 0; k < 11; k++) { const x = 12 + k * 19 + Math.round(hh(k, 9, 2) * 8), y = 162 + Math.round(hh(k, 8, 2) * 14); R.disco(x, y, 2 + (k % 3), K); R.disco(x, y, 1 + (k % 3), H('#6a6878')); R.pset(x - 1, y - 2 - (k % 3), H('#ffffff')); R.pset(x, y - 2 - (k % 3), H('#e8ecf4')); }
  for (let k = 0; k < 7; k++) { const x = 8 + k * 30, y = 158 + (k % 3) * 6; for (let i = -2; i <= 2; i++) R.linea(x, y, x + i * 2, y - 4 - Math.abs(i % 2), H('#8a6a3a')); }
  // el mojón de piedras junto al camino, con el aro de cuatro puntas tallado
  for (const [x, y, r] of [[192, 144, 6], [190, 136, 5], [193, 129, 4], [191, 123, 3]]) { R.disco(x, y, r + 1, K); R.disco(x, y, r, H('#7a7888')); R.disco(x - 1, y - 1, r - 1, H('#9a98a8')); R.pset(x - r + 1, y - 1, H('#f0f2f8')); R.pset(x - r + 2, y - r + 1, H('#f0f2f8')); }
  R.disco(191, 136, 2, H('#2e7a3e')); R.pset(191, 133, H('#2e7a3e')); R.pset(191, 139, H('#2e7a3e'));
  // el pino de la izquierda, grande y nevado, y otro pequeño
  pino(30, 152, 104, [H('#24402e'), H('#142a1e')], [H('#f4f6fc'), H('#c8d0e4')], 3);
  pino(60, 150, 40, [H('#24402e'), H('#142a1e')], [H('#f4f6fc'), H('#c8d0e4')], 5);
});
const p1 = (t) => {
  R.copiar(fondoPuerto());
  const nombre = @T(3.10), latveria = @T(4.56);
  pasan(t, [[20, 26, 40, 2.2], [150, 44, 28, 3.4], [240, 18, 34, 1.4], [90, 60, 22, 4.2]], [H('#fbe4e4'), H('#e8b8c0'), H('#b88aa8')], [0, 0, 268, 76]);
  // el águila que gira sobre el valle
  pajaro(150 + Math.cos(t * 0.6) * 34, 78 + Math.sin(t * 0.6) * 8, t, H('#2a2232'));
  // humo de las chimeneas de la ciudad
  for (let k = 0; k < 5; k++) { const [x, y] = CASAS1[k * 8]; humito(x + 2, y - 7, t, k * 0.21, 10, H('#a8a0b8'), H('#e8e0f0'), 0.4); }
  // las ventanas del castillo, que se encienden en verde en «Latveria»
  const on = tramo(t, latveria - 0.1, latveria + 0.5);
  for (const [x, y] of [[228, 76], [228, 86], [245, 66], [251, 66], [248, 76], [266, 80], [266, 90], [236, 94], [258, 94], [240, 90]]) { R.pset(x, y, on > hh(x, y, 2) * 0.8 ? H('#b8ffc8') : H('#2a2a38')); if (on > 0.5) luz(x, y, 4, 4, H('#8ae8a0'), 0.4 * on); }
  // el cuervo de la rama se va cuando pasa Doom
  const vu = cl((t - 1.7) / 2.4); if (vu <= 0) { R.rect(44, 98, 47, 101, K); R.pset(48, 99, H('#5a4a3a')); R.pset(45, 99, H('#e8e0d0')); } else pajaro(46 + vu * 160, 100 - vu * 60 - Math.sin(vu * 6) * 4, t * 1.6, K);
  // Doom cruza el filo, se para en «Doom» y señala el valle en «Latveria»
  const u = tramo(t, 0, nombre), x = Math.round(lerp(-18, 128, u));
  if (t > nombre - 0.2 && t < nombre + 0.9) luz(x + 7, 136, 18, 16, H('#8ae8a0'), 0.4 * Math.sin(cl((t - nombre + 0.2) / 1.1) * Math.PI));
  R.actor(EL.doom, x, 150, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > latveria - 0.3 });
  // la nieve que arrastra el viento
  for (let k = 0; k < 26; k++) { const v = (t * (0.25 + hh(k, 1, 3) * 0.2) + hh(k, 2, 3)) % 1; ps(v * 340 - 10, 60 + hh(k, 3, 3) * 118 + Math.sin(t * 2 + k) * 3, k % 3 ? H('#f4f6fc') : H('#c8d0e4')); }
};

// ── 2 · la sala del trono: cae el estandarte del ciervo, el rey huye, Doom se sienta ─────────────────────────────────
const p2 = (t) => {
  const o = { encuadre: 'trono' }; T.latveria(R, t, o);
  const rey = @T(6.56), trono = @T(7.60), incomodo = @T(9.38), bien = @T(11.30);
  // el estandarte azul del ciervo del viejo rey tapa el grande; en «king» cae
  const cae = cl((t - rey) / 0.7), dy = Math.round(cae * cae * 90);
  if (cae < 1) { R.recorte([0, 0, 319, 118]); for (let y = 18; y < 52; y++) for (let x = 145; x <= 173; x++) { const Y = y + dy, pico = y > 46 && Math.abs(x - 159) < (y - 46) * 2.4; if (pico) continue;
      R.pset(x, Y, x === 145 || x === 173 ? H('#1a2a5a') : (x - 145) % 7 === 0 ? H('#2a4a8a') : H('#3a5aa8')); }
    for (const [i, j] of [[0, 0], [0, 1], [0, 2], [1, 3], [2, 3], [3, 3], [4, 2], [4, 1], [4, 0], [2, 4], [2, 5], [2, 6], [1, 7], [3, 7], [-1, 1], [5, 1]]) { R.pset(157 + i, 26 + j + dy, H('#e8e0c8')); }
    R.rect(143, 16 + dy, 175, 18 + dy, H('#c8a040')); R.recorte(null); }
  // el viejo rey, sentado, se levanta en «king» y huye por la derecha; la corona se le cae y rueda por los escalones
  const hu = tramo(t, rey - 0.1, trono - 0.2), rx = lerp(153, 300, hu), ry = rx < 200 ? lerp(124, 150, cl((rx - 153) / 40)) : 150;
  if (hu < 1) { const r = R.actor(T.VD.baronVD, Math.round(rx), Math.round(ry), t, { dir: hu > 0 ? 1 : -1, anda: hu > 0 && hu < 1, sorpresa: hu > 0 });
    if (t < rey + 0.3) { const [cx, cy] = r.cabeza; R.rect(cx - 4, cy - 3, cx + 3, cy, K); R.rect(cx - 3, cy - 2, cx + 2, cy - 1, H('#f0c040')); R.pset(cx - 3, cy - 3, H('#f0c040')); R.pset(cx, cy - 3, H('#f0c040')); R.pset(cx + 2, cy - 3, H('#f0c040')); R.pset(cx - 1, cy - 1, H('#e84a4a')); } }
  if (t >= rey + 0.3) { const cu = cl((t - rey - 0.3) / 1.1), cx = lerp(160, 196, cu), cy = cu < 0.5 ? lerp(112, 146, cu * 2) - Math.sin(cu * 2 * Math.PI) * 6 : 148 - Math.abs(Math.sin(cu * 9)) * 2 * (1 - cu);
    const g = Math.floor(cu * 12) % 2; R.rect(cx - 4, cy - 3, cx + 3, cy, K); R.rect(cx - 3, cy - 2, cx + 2, cy - 1, H('#f0c040')); R.pset(cx - 3 + g, cy - 3, H('#f0c040')); R.pset(cx + 2 - g, cy - 3, H('#f0c040')); R.pset(cx - 1, cy - 1, H('#e84a4a')); }
  // Doom entra por la alfombra y sube al trono; se sienta en «throne»
  const du = tramo(t, P2, trono - 0.7), su = tramo(t, trono - 0.7, trono), dx = du < 1 ? lerp(44, 140, du) : lerp(140, 153, su), dyD = du < 1 ? 160 : lerp(150, 124, su);
  R.actor(EL.doom, Math.round(dx), Math.round(du < 1 ? lerp(166, 150, du) : dyD), t, { dir: t > trono ? -1 : 1, anda: (du > 0 && du < 1) || (su > 0 && su < 1), dedo: t > incomodo + 0.6 && t < bien });
  if (t > trono && t < trono + 0.25) for (let k = 0; k < 6; k++) ps(160 + Math.cos(k) * (t - trono) * 60, 124 + Math.sin(k) * (t - trono) * 20, H('#c8ccd8'));
  // Atom entra por abajo y se pone incómodo en «uncomfortable»: se tira del cuello, gota de sudor
  const au = tramo(t, @T(8.42), incomodo - 0.2), ax = lerp(-10, 84, au);
  if (t > @T(8.3)) { T.AT.atom(R, ax, 174, t, { dir: 1, pose: au < 1 ? 'camina' : t > incomodo ? 'piensa' : 'quieto', cara: t > incomodo ? 'sorpresa' : 'normal', habla: voz(t) * 0.5 });
    if (t > incomodo) { const gy = 150 + ((t - incomodo) * 14) % 8; ps(ax + 8, gy, H('#a8d8ff')); ps(ax + 8, gy + 1, H('#6ab0f0')); }
    if (t > incomodo + 0.1 && t < incomodo + 1.6) R.bocadillo(ax + 10, 140, { icono: '?' }); }
  T.latveriaDelante(R, t, o);
};

// ── 3 · la plaza de día: pan para la niña, la bolsa que vuelve ────────────────────────────────────────────────────
const pan = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 4, y - 2, x + 4, y + 1, K); R.rect(x - 3, y - 1, x + 3, y, H('#c8883a')); R.rect(x - 3, y - 2, x + 2, y - 2, H('#e0a858')); R.pset(x - 1, y - 1, H('#f0c878')); R.pset(x + 1, y - 1, H('#f0c878')); };
const bolsa = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 3, y - 3, x + 3, y + 1, K); R.rect(x - 2, y - 2, x + 2, y, H('#8a4a2a')); R.pset(x, y - 4, K); R.pset(x - 1, y - 2, H('#c87a4a')); R.pset(x + 1, y - 1, H('#f0c040')); };
const p3 = (t) => {
  const o = { encuadre: 'doomstadt', camara: 'plaza', robots: 0 }; T.latveria(R, t, o);
  const hambre = @T(15.28), crimen = @T(16.10), cae = @T(14.20);
  // la panadera con su cesta de panes, a la izquierda; la niña llega, recibe un pan en «hunger» y se va saltando
  const r1 = R.actor(T.VD.romaniMujerVD, 58, 168, t, { dir: 1, sostiene: t < hambre ? [74, 156] : [78, 152], sonrisa: t > hambre - 0.4, habla: t > hambre - 0.6 && t < hambre });
  { const [mx, my] = r1.mano; R.rect(mx - 6, my, mx + 6, my + 5, K); R.rect(mx - 5, my + 1, mx + 5, my + 4, H('#b08048')); for (let i = -5; i <= 5; i += 2) R.pset(mx + i, my + 2, H('#7a5428')); pan(mx - 2, my - 1); pan(mx + 3, my - 1); }
  const nu = tramo(t, P3 + 0.1, P3 + 2.0), vu = tramo(t, crimen + 0.1, P4), nx = t < crimen ? lerp(150, 86, nu) : lerp(86, 140, vu);
  const r2 = R.actor(EL.nina, Math.round(nx), 168, t, { dir: t < crimen ? -1 : 1, anda: (nu > 0 && nu < 1) || (vu > 0 && vu < 1), sostiene: t > hambre ? true : undefined, sonrisa: t > hambre, salto: t > hambre && t < hambre + 0.3 ? 2 : 0 });
  if (t > hambre - 0.3 && t < hambre) { const u = (t - hambre + 0.3) / 0.3; pan(lerp(r1.mano[0] + 3, nx + 4, u), lerp(r1.mano[1] - 2, 150, u) - Math.sin(u * Math.PI) * 4); }
  if (t >= hambre) pan(r2.mano[0], r2.mano[1] - 1);
  if (t > hambre && t < hambre + 1.2) corazon(nx + 4, 132 - Math.round((t - hambre) * 6));
  // el señor pierde la bolsa; el chico la recoge y se la devuelve en «crime»
  const su = tramo(t, P3, cae), sx = lerp(276, 214, su), vuelto = t > crimen;
  const r3 = R.actor(T.VD.romaniVD, Math.round(sx), 170, t, { dir: vuelto ? 1 : -1, anda: su > 0 && su < 1, sonrisa: vuelto, sostiene: vuelto ? true : undefined });
  const cu = tramo(t, cae + 0.4, crimen - 0.6), chx = lerp(300, 236, cu), coge = t > crimen - 0.6;
  const r4 = R.actor(EL.chico, Math.round(chx), 172, t, { dir: -1, anda: cu > 0 && cu < 1, sostiene: coge && !vuelto ? [chx - 4, 156] : undefined, sonrisa: vuelto });
  if (t > cae && !coge) { const u = cl((t - cae) / 0.35); bolsa(sx + 4 - u * 8, lerp(156, 168, u * u)); } else if (coge && !vuelto) bolsa(r4.mano[0], r4.mano[1]); else if (vuelto) bolsa(r3.mano[0], r3.mano[1]);
  if (vuelto && t < crimen + 0.6) for (let k = 0; k < 5; k++) ps(r3.mano[0] + Math.cos(k * 1.3) * (t - crimen) * 30, r3.mano[1] - 4 + Math.sin(k * 1.3) * (t - crimen) * 20, H('#fff0a0'));
  T.latveriaDelante(R, t, o);
};

// ── 4 · la casa romaní, caliente: la mesa llena y el retrato de la máscara ───────────────────────────────────────
const fondoCasa = () => horno('casa', () => {
  tablasV(0, 0, 319, 130, [H('#a8784a'), H('#8a5a34'), H('#5e3a1e')], 12, 3);
  // el friso pintado (flores de colores) y las vigas
  for (let x = 0; x < 320; x++) for (let y = 112; y < 122; y++) R.pset(x, y, y === 112 || y === 121 ? H('#4a2a16') : H('#2e5a6a'));
  for (let x = 6; x < 320; x += 16) { R.disco(x, 117, 2, H('#e85a4a')); R.pset(x, 117, H('#f0d060')); R.pset(x + 5, 116, H('#6ab05a')); R.pset(x + 6, 118, H('#6ab05a')); R.pset(x + 9, 117, H('#f0e0c0')); }
  for (let y = 0; y < 9; y++) R.rect(0, y, 319, y, y === 8 ? K : y < 2 ? H('#6a4024') : H('#4a2a16')); for (const vx of [70, 200, 246]) { R.rect(vx, 0, vx + 8, 14, K); R.rect(vx + 1, 0, vx + 7, 13, H('#5a3820')); }
  // ristras de ajos y pimientos y un manojo de hierbas colgados de las vigas
  for (const [x, n, c] of [[80, 6, '#f0ecdc'], [210, 5, '#d83a2a']]) { R.linea(x, 9, x, 9 + n * 4, H('#c8a060')); for (let k = 0; k < n; k++) { R.disco(x + (k % 2 ? 2 : -2), 12 + k * 4, 2, H(c)); R.pset(x + (k % 2 ? 2 : -2), 11 + k * 4, H('#c8c0a8')); } }
  for (let k = 0; k < 7; k++) R.linea(250 + k, 9, 248 + k * 2, 24 + (k % 3) * 2, k % 2 ? H('#6a8a3a') : H('#4a6a2a'));
  // el vasar con platos pintados y una jarra
  R.rect(8, 52, 66, 55, K); R.rect(9, 52, 65, 53, H('#a87a4a')); for (const lx of [12, 60]) R.rect(lx, 55, lx + 2, 60, H('#5a3820'));
  for (const [x, c] of [[10, '#e85a4a'], [24, '#3a7ab8'], [38, '#f0c040']]) { R.disco(x + 4, 44, 6, K); R.disco(x + 4, 44, 5, H('#f0ecdc')); R.disco(x + 4, 44, 3, H(c)); R.pset(x + 4, 44, H('#f0ecdc')); }
  R.rect(52, 40, 60, 51, K); R.rect(53, 41, 59, 51, H('#c86a3a')); R.rect(53, 41, 54, 51, H('#e08a5a')); R.rect(59, 43, 62, 47, K);
  // el paño bordado colgado
  R.rect(92, 28, 124, 72, K); for (let y = 29; y < 72; y++) for (let x = 93; x < 124; x++) { const a = (x + y) % 8, b = (x - y + 800) % 8; R.pset(x, y, a === 0 || b === 0 ? H('#c83a3a') : (Math.abs(x - 108) + Math.abs(y - 50)) < 8 ? H('#2e5a9a') : H('#f0ecdc')); } R.rect(90, 26, 126, 28, H('#5a3820'));
  // la ventana de cuarterones (fuera nieva: se pinta en cada fotograma) con cortinas bordadas
  R.rect(144, 28, 192, 80, K); R.rect(145, 29, 191, 79, H('#5a3820'));
  for (const cx of [138, 188]) { for (let y = 24; y < 88; y++) for (let x = cx; x < cx + 10; x++) R.pset(x, y, (x - cx) % 3 === 0 ? H('#b84a3a') : H('#d85a4a')); for (let y = 28; y < 86; y += 8) R.pset(cx + 5, y, H('#f0d060')); }
  R.rect(134, 22, 202, 24, H('#3a2414')); R.rect(140, 82, 196, 86, K); R.rect(141, 82, 195, 84, H('#a87a4a'));
  R.rect(150, 74, 156, 81, K); R.rect(151, 75, 155, 81, H('#b85a3a')); R.disco(153, 71, 3, H('#4a8a3a')); R.pset(152, 69, H('#e85a4a')); R.pset(155, 70, H('#f0d060'));
  // el retrato de la máscara de hierro (marco dorado), sobre el arcón pintado
  R.rect(8, 76, 46, 128, K); R.rect(9, 77, 45, 127, H('#c8982e')); R.rect(11, 79, 43, 125, H('#8a6a1e')); R.rect(13, 81, 41, 123, H('#1e4a2a'));
  for (let y = 83; y < 123; y++) for (let x = 14; x < 41; x++) if (hh(x, y, 4) > 0.9) R.pset(x, y, H('#2a5a36'));
  R.disco(27, 96, 9, H('#2e7a3e')); R.rect(18, 96, 36, 123, H('#2e7a3e')); R.rect(20, 92, 34, 112, H('#8c90a4')); R.rect(20, 92, 21, 112, H('#b8bcc8')); R.rect(33, 92, 34, 112, H('#6a6e80'));
  R.rect(22, 98, 25, 99, K); R.rect(29, 98, 32, 99, K); R.rect(23, 105, 31, 105, H('#4a4e5e')); R.rect(24, 108, 30, 108, H('#4a4e5e')); R.rect(18, 114, 36, 123, H('#246a32'));
  R.pset(10, 78, H('#fff0a0')); R.pset(11, 78, H('#fff0a0'));
  R.rect(2, 146, 54, 174, K); R.rect(3, 147, 53, 173, H('#2e5a9a')); R.rect(3, 147, 53, 150, H('#4a7ab8')); R.rect(3, 151, 53, 151, K);
  for (const [fx, c] of [[12, '#e85a4a'], [28, '#f0d060'], [44, '#e85a4a']]) { R.disco(fx, 161, 3, H(c)); R.pset(fx, 161, H('#f0ecdc')); R.pset(fx - 4, 163, H('#6ab05a')); R.pset(fx + 4, 159, H('#6ab05a')); }
  R.rect(24, 152, 32, 156, K); R.rect(25, 153, 31, 155, H('#c8a040'));
  // la estufa de azulejos con su puerta de hierro (el fuego, en cada fotograma)
  R.rect(258, 68, 300, 130, K); for (let y = 69; y < 130; y++) for (let x = 259; x < 300; x++) { const j = (x - 259) % 8, i = (y - 69) % 8; R.pset(x, y, j === 0 || i === 0 ? H('#c8b8a0') : (i + j) % 5 === 0 ? H('#3a6ab8') : H('#f0e8d8')); }
  R.rect(256, 64, 302, 68, H('#8a6a4a')); R.rect(270, 50, 276, 64, H('#3a3a44')); R.rect(271, 50, 272, 64, H('#5a5a64'));
  R.rect(270, 100, 288, 120, K); R.rect(271, 101, 287, 119, H('#2a2a32'));
  R.rect(304, 104, 306, 130, H('#5a3820')); R.rect(302, 104, 308, 106, H('#3a2414')); for (let k = 0; k < 4; k++) R.rect(303 + (k % 2) * 3, 108 + k * 5, 305 + (k % 2) * 3, 110 + k * 5, H('#8a5a34'));
  // el suelo de tablas y la alfombra de retales
  tablas(0, 130, 319, 179, [H('#a8784a'), H('#7a4e2a'), H('#4e2e16')], 7, 5);
  R.rect(0, 130, 319, 131, H('#3a2010'));
  for (let y = 158; y < 180; y++) for (let x = 70; x < 280; x++) { const e = Math.abs(x - 175) / 105 + Math.abs(y - 170) / 12; if (e > 1.3) continue; const b = Math.floor((x - 70) / 12) + Math.floor((y - 158) / 5);
    R.pset(x, y, e > 1.22 ? H('#3a2010') : [H('#c84a3a'), H('#e8b040'), H('#3a7ab8'), H('#6aa84a'), H('#e8e0c8')][b % 5]); }
});
const mesaCasa = (t) => {
  // la mesa con su mantel bordado y la comida (pan, olla de sopa que humea, manzanas, queso y jarras)
  R.rect(116, 136, 250, 139, K); R.rect(117, 136, 249, 138, H('#f0ecdc'));
  for (let y = 139; y < 158; y++) for (let x = 118; x < 249; x++) R.pset(x, y, y === 157 ? H('#b84a3a') : (y > 151 && (x + y) % 6 < 2) ? H('#d85a4a') : (x - 118) % 14 === 7 && y < 151 ? H('#d8d0bc') : H('#f0ecdc'));
  for (let x = 120; x < 248; x += 6) R.pset(x, 154, H('#2e5a6a'));
  R.rect(124, 158, 127, 168, H('#4e2e16')); R.rect(240, 158, 243, 168, H('#4e2e16'));
  pan(132, 134); pan(142, 134); R.rect(196, 125, 214, 135, K); R.rect(197, 126, 213, 134, H('#3a3a44')); R.rect(197, 126, 213, 127, H('#6a6a74')); R.rect(195, 124, 215, 125, H('#2a2a30'));
  humito(202, 121, t, 0.1, 18, H('#d8d0c8'), H('#f8f4f0'), 0.6); humito(208, 121, t, 0.6, 18, H('#d8d0c8'), H('#f8f4f0'), 0.6);
  for (const [x, y] of [[222, 133], [226, 132], [229, 134], [224, 130]]) { R.disco(x, y, 2, H('#c82a2a')); R.pset(x - 1, y - 1, H('#f07a6a')); }
  R.rect(232, 130, 242, 135, K); R.rect(233, 131, 241, 134, H('#f0c848')); R.pset(234, 132, H('#c8a030'));
  for (const jx of [154, 184]) { R.rect(jx, 128, jx + 5, 135, K); R.rect(jx + 1, 129, jx + 4, 134, H('#c86a3a')); R.rect(jx + 1, 129, jx + 4, 129, H('#f0e8d0')); }
};
const p4 = (t) => {
  R.copiar(fondoCasa());
  const ama = @T(18.60), promesa = @T(20.64), nieve = @T(22.06);
  // fuera nieva: noche azul, copos y el tejado de enfrente con su ventanita
  for (let y = 30; y < 79; y++) for (let x = 146; x < 191; x++) { let c = mez(H('#1e2a5a'), H('#3a4a7a'), (y - 30) / 49); if (y > 64 - Math.round((x - 146) * 0.3)) c = y > 70 ? H('#e8ecf4') : H('#5a3a2a'); R.pset(x, y, c); }
  R.rect(174, 68, 178, 72, H('#f0c060'));
  for (let k = 0; k < 18; k++) { const v = (t * (0.18 + hh(k, 1, 9) * 0.1) + hh(k, 2, 9)) % 1, x = 146 + ((hh(k, 3, 9) * 45 + Math.sin(t + k) * 3) % 45 + 45) % 45, y = 30 + v * 48; ps(x, y, H('#ffffff')); }
  R.rect(167, 29, 169, 79, H('#5a3820')); R.rect(145, 53, 191, 55, H('#5a3820'));
  // el fuego de la estufa y su luz
  for (let k = 0; k < 4; k++) llama(274 + k * 4, 118, t, 1.6, k * 2); luz(279, 110, 40, 30, H('#f0a050'), 0.22);
  // la vela del arcón, bajo el retrato; en «promise» se aviva
  const aviva = t > promesa ? 1 + 0.6 * Math.sin(cl((t - promesa) / 1.2) * Math.PI) : 1; vela(14, 146, t, 1, 6); luz(14, 136, 18 * aviva, 16 * aviva, H('#f8c060'), 0.32);
  // el tarro de flores del arcón: la flor nueva llega en «love him»
  R.rect(38, 138, 45, 146, K); R.rect(39, 139, 44, 146, H('#6a8ab8')); R.pset(39, 140, H('#a8c8e8'));
  for (const [fx, fy, c] of [[37, 131, '#e85a4a'], [43, 130, '#f0d060']]) { R.linea(fx + 1, fy + 2, 41, 138, H('#4a8a3a')); R.disco(fx + 1, fy, 1.5, H(c)); }
  // Boris, detrás de la mesa, come; en «promise» alza la jarra hacia el retrato
  const brinda = t > promesa - 0.2 && t < nieve + 0.8;
  const rb = R.actor(T.VD.borisVD, 168, 146, t, { dir: -1, habla: voz(t) > 0.3 && !brinda && Math.sin(t * 2) > 0, sonrisa: true, sostiene: brinda ? [158, 118] : [160, 132] });
  { const [mx, my] = rb.mano; R.rect(mx - 2, my - 5, mx + 3, my + 1, K); R.rect(mx - 1, my - 4, mx + 2, my, H('#c86a3a')); R.rect(mx - 1, my - 4, mx + 2, my - 4, H('#f0e8d0')); }
  mesaCasa(t);
  // la abuela cruza con una flor y la pone en el tarro en «love him»
  const au = tramo(t, P4, ama - 0.3), ax = lerp(118, 50, au), puesta = t > ama;
  const ra = R.actor(T.VD.romaniMujerVD, Math.round(ax), 166, t, { dir: -1, anda: au > 0 && au < 1, sostiene: !puesta ? (au < 1 ? true : [44, 140]) : undefined, sonrisa: puesta, habla: puesta && t < ama + 1 });
  if (!puesta) { const [mx, my] = ra.mano; R.linea(mx, my, mx - 1, my - 7, H('#4a8a3a')); R.disco(mx - 1, my - 8, 1.6, H('#e8a0d0')); R.pset(mx - 1, my - 8, H('#fff0f8')); }
  else { R.linea(41, 138, 41, 128, H('#4a8a3a')); R.disco(41, 127, 1.6, H('#e8a0d0')); R.pset(41, 127, H('#fff0f8')); }
  if (puesta && t < ama + 1.4) corazon(58, 116 - Math.round((t - ama) * 8));
  // el gato que duerme junto a la estufa y mueve la cola
  { const x = 262, y = 166, c = Math.round(Math.sin(t * 2.4) * 2); R.rect(x, y - 5, x + 12, y, K); R.rect(x + 1, y - 4, x + 11, y - 1, H('#5a5a64')); R.rect(x + 9, y - 7, x + 14, y - 2, K); R.rect(x + 10, y - 6, x + 13, y - 3, H('#5a5a64')); R.pset(x + 10, y - 8, K); R.pset(x + 13, y - 8, K);
    R.linea(x, y - 2, x - 5, y - 4 + c, K); R.pset(x + 11, y - 5, H('#3a3a44')); R.pset(x + 5, y - 4 + (Math.sin(t * 2) > 0 ? 1 : 0), H('#7a7a84')); }
};

// ── 5 · el pino del padre, al anochecer: el farol sobre el mojón ────────────────────────────────────────────────
const fondoPino = () => horno('pinoPadre', () => {
  rampa(0, 0, 319, 110, [H('#1a1e4a'), H('#2e2e64'), H('#5a3e74'), H('#a85a6a'), H('#e8946a')]);
  for (let k = 0; k < 40; k++) { const x = Math.round(hh(k, 1, 51) * 320), y = Math.round(hh(k, 2, 51) * 50); if ((x > 270 && y < 46) || (x > 18 && x < 172 && y < 22)) continue; R.pset(x, y, H('#c8c8e8')); }
  sierra(7.7, 92, 30, [H('#9a88b0'), H('#76668e'), H('#56486e')], [H('#f0e0f0'), H('#c8b0d0')], 130);
  // la ladera nevada con su sombra azul y las huellas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const top = 120 - x * 0.08 + Math.sin(x * 0.03) * 4; if (y < top) continue; const d = y - top;
    let c = d < 2 ? H('#f8f8ff') : (d / 60) > bay(x, y) * 1.2 ? H('#b8c0dc') : H('#dce2f0'); if (hh(x >> 2, y >> 1, 52) > 0.92) c = H('#a0aacc'); R.pset(x, y, c); }
  // el pueblo romaní lejano a la derecha: carromatos y casitas con ventanas
  for (let k = 0; k < 7; k++) { const x = 230 + k * 12, y = 112 - k * 0.6; R.rect(x, y - 6, x + 8, y, H('#4a3a5a')); R.poligono([[x - 1, y - 6], [x + 4, y - 10], [x + 9, y - 6]], H('#3a2a4a')); R.pset(x + 2, y - 9, H('#f0f0ff')); R.pset(x + 3, y - 10, H('#f0f0ff')); }
  // el pino enorme con sus ramas nevadas y las rocas a su pie
  pino(96, 150, 118, [H('#1e3a2a'), H('#122a1c')], [H('#f4f6fc'), H('#c8d0e4')], 2);
  for (const [x, y, r] of [[60, 150, 12], [130, 152, 9], [44, 156, 8]]) { R.disco(x, y, r + 1, K); R.disco(x, y, r, H('#6a6a80')); R.disco(x - 2, y - 2, r - 2, H('#8a8aa0')); for (let i = -r + 1; i < r - 1; i++) R.pset(x + i, y - r + Math.round(Math.abs(i) * 0.3), H('#f4f6fc')); }
  // el mojón de piedras con la cruz de madera atada
  for (const [x, y, r] of [[150, 152, 6], [149, 145, 5], [151, 139, 4]]) { R.disco(x, y, r + 1, K); R.disco(x, y, r, H('#7a7890')); R.disco(x - 1, y - 1, r - 2, H('#9a98b0')); R.pset(x - r + 2, y - r + 2, H('#f4f6fc')); }
  R.rect(150, 118, 152, 136, K); R.rect(151, 118, 151, 135, H('#8a6a4a')); R.rect(144, 123, 158, 125, K); R.rect(145, 124, 157, 124, H('#8a6a4a'));
  // pinos pequeños a media distancia, matas que asoman, piedras y la sombra azul del pino
  for (const [x, h] of [[178, 26], [196, 20], [214, 30], [16, 34]]) pino(x, 128 - Math.round(x * 0.08) + (x < 30 ? 14 : 0), h, [H('#2a4a3a'), H('#1a3a2a')], [H('#f4f6fc'), H('#c8d0e4')], x);
  for (let y = 152; y < 166; y++) for (let x = 60; x < 170; x++) if (Math.abs(x - 112) / 56 + Math.abs(y - 158) / 7 < 1 && bay(x, y) < 0.5) R.pset(x, y, H('#a8b0d0'));
  for (let k = 0; k < 16; k++) { const x = 20 + k * 19 + Math.round(hh(k, 1, 53) * 8), y = 150 + Math.round(hh(k, 2, 53) * 26); if (x > 250) continue; for (let i = -2; i <= 2; i++) R.linea(x, y, x + i, y - 3 - (i & 1), H('#7a6a5a')); }
  for (let k = 0; k < 6; k++) { const x = 180 + k * 14, y = 166 + (k % 2) * 5; R.disco(x, y, 2, H('#6a6a80')); R.pset(x - 1, y - 2, H('#ffffff')); }
  // el arbusto seco y la valla rota de la derecha (primer término)
  for (let k = 0; k < 5; k++) { const x = 262 + k * 12; R.rect(x, 150 - (k % 2) * 4, x + 2, 172, K); R.rect(x + 1, 151 - (k % 2) * 4, x + 1, 171, H('#6a4a2a')); R.pset(x + 1, 149 - (k % 2) * 4, H('#f4f6fc')); }
  R.linea(262, 158, 312, 156, H('#4a3018')); R.linea(262, 166, 312, 164, H('#4a3018'));
  for (let k = 0; k < 8; k++) { const x = 70 + k * 26, y = 168 + (k % 3) * 3; R.rect(x, y, x + 2, y + 1, H('#a0aacc')); R.rect(x + 6, y - 3, x + 8, y - 2, H('#a0aacc')); }
});
const p5 = (t) => {
  R.copiar(fondoPino());
  const deja = @T(24.76), padre = @T(27.36);
  pasan(t, [[30, 30, 34, 1.4], [170, 48, 26, 2.2], [260, 62, 30, 3.0]], [H('#d8a8c0'), H('#9a78a8'), H('#5e4a7e')], [0, 0, 270, 96]);
  // las ventanas del pueblo se encienden una a una
  for (let k = 0; k < 7; k++) { const x = 233 + k * 12, y = 108 - k * 0.6; if (t > P5 + 0.6 * k) { R.pset(x, Math.round(y), H('#f8c060')); R.pset(x + 1, Math.round(y), H('#f8c060')); } }
  // el búho del pino parpadea y gira la cabeza
  { const x = 108, y = 86, g = Math.sin(t * 0.8) > 0 ? 1 : 0; R.rect(x - 3, y - 4, x + 3, y + 4, K); R.rect(x - 2, y - 3, x + 2, y + 3, H('#8a6a4a')); const ojo = (t % 3.4) < 0.15 ? H('#8a6a4a') : H('#f0d060'); R.pset(x - 1 + g, y - 2, ojo); R.pset(x + 1 + g, y - 2, ojo); R.pset(x + g, y - 1, H('#e8a040')); R.pset(x - 2, y - 5, K); R.pset(x + 2, y - 5, K); }
  // Doom sube por la ladera con el farol y lo deja sobre el mojón en «treat»
  const u = tramo(t, P5, deja - 0.4), x = Math.round(lerp(300, 160, u)), suelo = 120 - (x + 7) * 0.08 + Math.sin((x + 7) * 0.03) * 4 + 34;
  const dejado = t > deja;
  // las huellas que deja en la nieve
  for (let hx = x + 16; hx < 300; hx += 7) { const hy = Math.round(Math.min(160, 120 - (hx) * 0.08 + Math.sin(hx * 0.03) * 4 + 34 + 6)); R.pset(hx, hy + ((hx >> 3) & 1) * 2, H('#9aa4c4')); R.pset(hx + 1, hy + ((hx >> 3) & 1) * 2, H('#9aa4c4')); }
  const r = R.actor(EL.doom, x, Math.round(Math.min(160, suelo + 6)), t, { dir: -1, anda: u > 0 && u < 1, sostiene: dejado ? undefined : (u < 1 ? true : [156, 134]) });
  const fx = dejado ? 154 : r.mano[0], fy = dejado ? 135 : r.mano[1] + 2;
  const brillo = dejado ? 1 + 0.8 * tramo(t, padre - 0.3, padre + 0.6) : 0.7;
  luz(fx, fy - 2, 18 * brillo, 14 * brillo, H('#f8c060'), 0.34);
  R.rect(fx - 2, fy - 7, fx + 2, fy - 6, K); R.pset(fx, fy - 8, K); R.rect(fx - 2, fy - 5, fx + 2, fy, K); R.rect(fx - 1, fy - 5, fx + 1, fy - 1, H('#fff0b0')); R.pset(fx, fy - 3, H('#f8a040'));
  // la nieve empieza a caer despacio
  const ne = tramo(t, P5 + 1, padre);
  for (let k = 0; k < 30; k++) { if (hh(k, 4, 2) > ne) continue; const v = (t * (0.1 + hh(k, 1, 2) * 0.07) + hh(k, 2, 2)) % 1; ps(hh(k, 3, 2) * 320 + Math.sin(t * 1.3 + k) * 4, v * 180, H('#ffffff')); }
};

// ── 6 · Doomstadt de noche: el cartel de la «X» y el foco verde ──────────────────────────────────────────────────
const p6 = (t) => {
  const o = { encuadre: 'doomstadt' }; T.latveria(R, t, o);
  const discrepa = @T(30.78), el = @T(31.44);
  // el foco verde sale del ventanal del balcón y barre la ciudad hasta dar con el vecino
  const vx = 66 + Math.round(tramo(t, P6, discrepa) * 40), sx = t < discrepa ? 40 + ((t - P6) * 50) % 180 : lerp(40 + ((discrepa - P6) * 50) % 180, vx + 7, tramo(t, discrepa, el));
  for (let y = 60; y < 180; y++) { const k = (y - 60) / 112, cx = lerp(160, sx, k), w = 2 + k * 13; for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) { const g = 0.5 * (1 - Math.abs(x - cx) / (w + 1)); if (g > bay(x, y) * 0.45) R.pset(x, y, mez(R.pget(x, y), H('#a8ffc0'), g)); } }
  luz(sx, 170, 22, 8, H('#d8ffe0'), 0.6); luz(160, 58, 10, 8, H('#d8ffe0'), 0.6);
  // el vecino con su cartel: lo alza en «disagree»; el foco lo encuentra en «with him» y lo esconde
  const u = tramo(t, P6, discrepa - 0.4), alto = t > discrepa - 0.2 && t < el + 0.1, pillado = t > el;
  const r = R.actor(T.VD.romaniVD, vx, 172, t, { dir: pillado ? -1 : 1, anda: u > 0 && u < 1, sostiene: pillado ? undefined : alto ? [vx + 16, 146] : [vx + 15, 160], sorpresa: pillado });
  if (!pillado) { const [mx, my] = r.mano, y0 = my - 15; R.rect(mx - 1, y0 + 6, mx, my + 2, H('#6a4a2a')); R.rect(mx - 7, y0 - 4, mx + 7, y0 + 7, K); R.rect(mx - 6, y0 - 3, mx + 6, y0 + 6, H('#f0e8d0'));
    R.linea(mx - 4, y0 - 1, mx + 3, y0 + 4, H('#d83a3a')); R.linea(mx - 3, y0 - 1, mx + 4, y0 + 4, H('#d83a3a')); R.linea(mx + 3, y0 - 1, mx - 4, y0 + 4, H('#d83a3a')); R.linea(mx + 4, y0 - 1, mx - 3, y0 + 4, H('#d83a3a')); }
  else { R.rect(vx + 14, 150, vx + 15, 168, H('#6a4a2a')); if (t < el + 1.2) R.bocadillo(vx + 7, 136, { icono: '!' }); }
  // dos vecinos con farol que se paran a mirar y se van deprisa
  for (const [x0, d, k] of [[230, -1, 0], [270, -1, 1]]) { const v = pillado ? tramo(t, el + 0.2 + k * 0.2, el + 1.6) : 0, xx = Math.round(x0 + (pillado ? v * 60 : -Math.min(1, (t - P6) / 2.5) * 20));
    const rr = R.actor(k ? EL.chico : T.VD.romaniMujerVD, xx, 172, t, { dir: pillado ? 1 : d, anda: (!pillado && t - P6 < 2.5) || (v > 0 && v < 1), sostiene: true, sorpresa: pillado && v < 0.3 });
    const [mx, my] = rr.mano; R.rect(mx - 1, my + 1, mx + 1, my + 4, K); R.pset(mx, my + 2, H('#f8c060')); luz(mx, my + 2, 8, 8, H('#f8c060'), 0.3); }
  T.latveriaDelante(R, t, o);
};

// ── 7 · la plaza al atardecer: GAG de los robots ─────────────────────────────────────────────────────────────────
const p7 = (t) => {
  const saluda = @T(33.60), giro = @T(34.08), calle = @T(35.76);
  const ua = tramo(t, P7, saluda - 0.1), back = tramo(t, giro + 0.6, P8), ax = ua < 1 ? lerp(-8, 150, ua) : lerp(150, 96, back);
  const o = { encuadre: 'doomstadt', camara: 'plaza', robots: tramo(t, giro, giro + 0.15), mira: ax };
  const gp = T.latveria(R, t, o);
  T.tinte(R, 0, 179, [255, 150, 90], 0.2);
  const asustado = t > giro + 0.15;
  T.AT.atom(R, ax, 176, t, { s: 2, dir: 1, pose: ua < 1 || (back > 0 && back < 1) ? 'camina' : t > saluda && t < giro + 0.2 ? 'saluda' : asustado ? 'brazos' : 'quieto', cara: asustado ? 'sorpresa' : t > saluda ? 'sonrisa' : 'normal', habla: voz(t) * 0.4, salto: asustado && t < giro + 0.4 ? 3 : 0 });
  if (asustado && t < giro + 1.4) R.bocadillo(ax + 14, 112, { icono: '!' });
  // los ojos de los robots brillan al girarse, con un trazo de giro
  const ug = tramo(t, giro, giro + 0.15);
  if (ug > 0) for (const [rx, ry] of gp.robots ?? []) { luz(rx, ry, 9, 8, H('#8affa0'), (t > calle ? 0.6 : 0.45) * ug); if (t < giro + 0.6) { R.linea(rx - 7, ry - 5, rx - 9, ry - 7, H('#ffffff')); R.linea(rx + 7, ry - 5, rx + 9, ry - 7, H('#ffffff')); } }
  // las palomas levantan el vuelo cuando se giran los robots
  if (t > giro) for (let k = 0; k < 5; k++) { const v = t - giro; pajaro(84 + k * 30 + v * (k % 2 ? 30 : -30), 140 - v * 40 - k * 3, t, H('#8a8e9c')); }
  T.latveriaDelante(R, t, o);
};

// ── 8 · el salón de 1962: la tele con los cuatro de azul ─────────────────────────────────────────────────────────
const fondoSalon = () => horno('salon', () => {
  // papel pintado de rombos mostaza y verde agua, moldura y zócalo
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const a = (x + y * 1.6) % 18, b = (x - y * 1.6 + 1800) % 18; let c = H('#e8d8a8'); if (a < 1.2 || b < 1.2) c = H('#c8b888'); if (((x >> 3) + (y >> 3)) % 4 === 0 && a > 7 && a < 11 && b > 7 && b < 11) c = H('#5aa89a'); R.pset(x, y, c); }
  R.rect(0, 0, 319, 6, H('#f0ecdc')); R.rect(0, 6, 319, 7, H('#a89868'));
  R.rect(0, 120, 319, 128, K); R.rect(0, 121, 319, 127, H('#7a4e2a')); R.rect(0, 121, 319, 121, H('#a8784a'));
  // la ventana con la calle de enfrente (se pinta en cada fotograma) y sus cortinas
  R.rect(18, 36, 82, 100, K); R.rect(19, 37, 81, 99, H('#f0ecdc'));
  for (const cx of [10, 80]) for (let y = 30; y < 108; y++) for (let x = cx; x < cx + 10; x++) R.pset(x, y, (x - cx) % 3 === 0 ? H('#c86a5a') : ((y >> 2) % 2 ? H('#e88a6a') : H('#f0a080')));
  R.rect(6, 28, 94, 30, H('#8a6a3a')); R.rect(16, 100, 84, 104, K); R.rect(17, 100, 83, 102, H('#f0ecdc'));
  // el calendario con el año y el reloj de pared
  R.rect(104, 30, 134, 66, K); R.rect(105, 31, 133, 65, H('#f8f4ec')); R.rect(105, 31, 133, 40, H('#c83a3a'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) R.rect(108 + i * 4, 52 + j * 3, 109 + i * 4, 52 + j * 3, H('#8a8a94'));
  R.disco(152, 40, 8, K); R.disco(152, 40, 7, H('#f0e0a0')); R.disco(152, 40, 6, H('#f8f4ec')); for (let k = 0; k < 12; k++) R.pset(Math.round(152 + Math.cos(k * 0.52) * 5), Math.round(40 + Math.sin(k * 0.52) * 5), H('#3a3a44'));
  // la lámpara de pie de los sesenta, a la izquierda de la tele
  R.rect(150, 72, 151, 140, H('#3a3a3a')); R.poligono([[140, 72], [161, 72], [156, 58], [145, 58]], H('#f0d890')); R.rect(145, 58, 156, 59, H('#c8a860')); R.rect(146, 140, 155, 142, H('#3a3a3a'));
  // el mueble de la tele: madera, patas abiertas, rejilla del altavoz y mandos
  R.rect(166, 78, 254, 138, K); tablas(167, 79, 253, 137, [H('#a8784a'), H('#8a5a34'), H('#5e3a1e')], 10, 8);
  R.rect(176, 84, 238, 128, K); R.rect(177, 85, 237, 127, H('#2a2a30'));
  for (let y = 88; y < 126; y += 2) R.rect(242, y, 250, y, H('#5e3a1e')); R.disco(246, 120, 2, H('#c8c0a8')); R.disco(246, 128, 2, H('#c8c0a8'));
  for (const lx of [172, 246]) { R.linea(lx, 138, lx + (lx < 200 ? -4 : 4), 150, K); R.linea(lx + 1, 138, lx + (lx < 200 ? -3 : 5), 150, H('#5e3a1e')); }
  // la antena de cuernos
  R.rect(204, 74, 214, 78, K); R.rect(205, 75, 213, 77, H('#3a3a44')); R.linea(206, 74, 190, 48, H('#a8acbc')); R.linea(212, 74, 232, 50, H('#a8acbc')); R.disco(190, 48, 1, H('#d8dce8')); R.disco(232, 50, 1, H('#d8dce8'));
  // la moqueta y la alfombra redonda; el sofá a la derecha
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x, y, 61) > 0.8 ? H('#7a8a5a') : H('#8a9a6a'));
  for (let y = 146; y < 178; y++) for (let x = 40; x < 220; x++) { const e = Math.hypot((x - 130) / 88, (y - 162) / 15); if (e > 1) continue; R.pset(x, y, e > 0.92 ? H('#5a3a2a') : Math.floor(e * 6) % 2 ? H('#e8b040') : H('#c85a3a')); }
  R.rect(262, 104, 319, 150, K); R.rect(263, 105, 319, 149, H('#3a8a8a')); R.rect(263, 105, 319, 116, H('#4aa0a0')); R.rect(263, 128, 319, 130, H('#2a6a6a')); R.rect(268, 150, 271, 156, H('#3a2a1a'));
  R.rect(278, 96, 300, 112, K); R.rect(279, 97, 299, 111, H('#f0c040')); for (let k = 0; k < 4; k++) R.pset(282 + k * 5, 104, H('#c85a3a'));
});
const p8 = (t) => {
  R.copiar(fondoSalon());
  const enciende = P8 + 0.3, el = @T(41.40), anio = @T(42.06);
  // la calle por la ventana: cielo, la casa de enfrente, un árbol y un coche que pasa
  R.recorte([19, 37, 81, 99]);
  for (let y = 37; y < 100; y++) for (let x = 19; x < 82; x++) { let c = mez(H('#7ab0e8'), H('#c8e0f8'), (y - 37) / 50); if (y > 66) c = (x + y) % 11 === 0 ? H('#e8e0d0') : H('#f0e8d8'); if (y > 66 && y < 70) c = H('#c84a3a'); if (y > 88) c = y > 93 ? H('#5a5e66') : H('#6aa84a'); R.pset(x, y, c); }
  for (const wx of [30, 58]) { R.rect(wx, 74, wx + 8, 82, H('#3a5a8a')); R.rect(wx + 4, 74, wx + 4, 82, H('#f0e8d8')); }
  nube((t * 3) % 90 + 4, 46, 18); R.disco(74, 72, 7, H('#3a7a3a')); R.disco(72, 70, 5, H('#5aa85a'));
  { const cx = ((t - P8) * 22) % 110 - 20; R.rect(cx, 90, cx + 18, 95, H('#e86a5a')); R.rect(cx + 4, 87, cx + 13, 90, H('#f0a090')); R.disco(cx + 4, 96, 1.5, K); R.disco(cx + 14, 96, 1.5, K); }
  R.recorte(null);
  R.rect(49, 37, 50, 99, H('#f0ecdc')); R.rect(19, 67, 81, 68, H('#f0ecdc'));
  // el año del calendario
  R.numero('1962', 119, 39, { centro: true });
  if (t > anio) T.AT.anillo(R, 119, 36, 18, 8, t, tramo(t, anio, anio + 0.5));
  // el segundero del reloj
  { const a = t * 1.05 - 1.57; R.linea(152, 40, Math.round(152 + Math.cos(a) * 5), Math.round(40 + Math.sin(a) * 5), H('#c83a3a')); R.linea(152, 40, 152, 36, K); }
  // la tele: se enciende (un punto que se abre) y salen los cuatro de azul; en «him» entra la figura verde
  const on = tramo(t, enciende, enciende + 0.5);
  R.recorte([177, 85, 237, 127]);
  if (on > 0) { const h = Math.max(1, Math.round(21 * on)); for (let y = 106 - h; y <= 106 + h; y++) for (let x = 177; x < 238; x++) { let c = mez(H('#3a5a8a'), H('#8ab0d8'), (y - 85) / 42); if ((y + Math.floor(t * 20)) % 3 === 0) c = mez(c, K, 0.25); R.pset(x, y, c); }
    if (on >= 1) { const gira = t > el + 0.3 ? 1 : 0;
      for (let k = 0; k < 4; k++) { const x = 186 + k * 11 - (t > el ? Math.round(tramo(t, el, el + 0.6) * 6) : 0), w = k === 3 ? 5 : 3, y = 122;
        R.rect(x - w, y - 14, x + w, y, H('#1e3a8a')); R.disco(x, y - 18, 3, H('#1e3a8a')); R.rect(x - w + 1, y - 13, x + w - 1, y - 1, H('#2e5ac8'));
        R.pset(x - 1, y - 11, H('#ffffff')); R.pset(x - 1, y - 10, H('#ffffff')); R.pset(x, y - 10, H('#ffffff')); R.pset(x + 1, y - 11, H('#ffffff')); R.pset(x + 1, y - 10, H('#ffffff')); R.pset(x + 1, y - 9, H('#ffffff'));
        if (gira) R.pset(x + 2, y - 19, H('#ffffff')); }
      if (t > el) { const dx = Math.round(lerp(250, 226, tramo(t, el, el + 0.6)));
        R.rect(dx - 4, 104, dx + 4, 122, H('#1e5a2a')); R.disco(dx, 100, 4, H('#2e7a3e')); R.rect(dx - 2, 98, dx + 2, 103, H('#a8acbc')); R.pset(dx - 1, 100, K); R.pset(dx + 1, 100, K); R.rect(dx - 3, 108, dx + 3, 118, H('#8c90a4')); }
      if (t > anio) R.numero('1962', 207, 96, { centro: true }); } }
  R.recorte(null);
  if (on > 0) luz(207, 132, 60, 18, H('#8ab0e8'), 0.18 * on);
  // el niño en la alfombra con el cuenco de palomitas; en «1962» da un salto y las palomitas saltan
  const salta = t > anio && t < anio + 0.35;
  const r = R.actor(EL.nino62, 118, 164, t, { dir: 1, sostiene: true, sorpresa: t > el, sonrisa: t > anio + 0.35, salto: salta ? 3 : 0 });
  { const [mx, my] = r.mano; R.rect(mx - 5, my, mx + 5, my + 4, K); R.rect(mx - 4, my + 1, mx + 4, my + 3, H('#e84a3a')); R.rect(mx - 4, my + 1, mx + 4, my + 1, H('#f07a6a')); for (let i = -3; i <= 3; i += 2) R.pset(mx + i, my - 1, H('#fff4d0'));
    if (t > anio) for (let k = 0; k < 6; k++) { const v = t - anio; if (v > 1) break; ps(mx + (k - 2.5) * 4 * v * 3, my - 2 - v * 30 + v * v * 40, H('#fff4d0')); } }
  // el perrito que mueve la cola en la alfombra
  { const x = 70, y = 168, c = Math.sin(t * 12) > 0 ? 1 : 0, mira = t > anio ? 1 : 0; R.rect(x, y - 6, x + 12, y - 2, K); R.rect(x + 1, y - 5, x + 11, y - 3, H('#c89a5a')); R.rect(x + 10, y - 10 - mira, x + 16, y - 4, K); R.rect(x + 11, y - 9 - mira, x + 15, y - 5, H('#c89a5a')); R.pset(x + 14, y - 8 - mira, K); R.pset(x + 16, y - 6, K); R.rect(x + 10, y - 9 - mira, x + 11, y - 6, H('#8a5a2a'));
    for (const lx of [x + 1, x + 4, x + 8, x + 11]) R.rect(lx, y - 2, lx, y, K); R.linea(x, y - 5, x - 4, y - 8 - c * 3, K); }
};

// ── 9 · la azotea de Nueva York: los cuatro y Doom que baja ──────────────────────────────────────────────────────
const TORRES = [[0, 30, 62], [32, 22, 48], [56, 30, 70], [90, 18, 40], [112, 26, 56], [142, 20, 36], [166, 34, 60], [204, 30, 26], [238, 24, 66], [266, 28, 90], [298, 22, 70]];
const fondoAzotea = () => horno('azotea', () => {
  rampa(0, 0, 319, 130, [H('#3a4a8a'), H('#6a6aa8'), H('#c87a8a'), H('#f0a070'), H('#f8d090')]);
  luz(80, 112, 50, 30, H('#fff0c0'), 0.5); R.disco(80, 116, 10, H('#ffe8a8'));
  // tres capas de rascacielos con ventanas (las de lejos, moradas)
  for (const [x, w, h] of TORRES) { const top = 130 - h - 10; for (let y = top; y < 140; y++) for (let xx = x; xx < x + w; xx++) R.pset(xx, y, (xx - x) % 4 === 1 && (y - top) % 5 === 2 && hh(xx, y, 71) > 0.45 ? H('#f8d890') : xx === x ? H('#4a4a7a') : H('#3a3a62')); }
  // la torre de los cuatro, con el «4» arriba (nuestra)
  for (let y = 24; y < 140; y++) for (let x = 204; x < 234; x++) R.pset(x, y, x < 210 ? H('#a8b4d0') : x > 228 ? H('#5a6488') : (y - 24) % 6 === 0 ? H('#6a7498') : (x - 204) % 5 === 2 ? H('#c8e0f8') : H('#8a98c0'));
  R.rect(200, 20, 238, 24, H('#3a4468')); R.linea(219, 4 + 14, 219, 20, H('#c8ccd8'));
  R.disco(219, 34, 7, K); R.disco(219, 34, 6, H('#2e5ac8')); R.numero('4', 220, 38, { centro: true });
  // la azotea: el pretil de ladrillo, la grava, los respiraderos y el depósito de agua de madera
  bloques(0, 138, 319, 148, [H('#c86a4a'), H('#a84a3a'), H('#6a2a20')], 5, 8, 4);
  R.rect(0, 136, 319, 138, H('#8a8a94')); R.rect(0, 136, 319, 136, H('#c8c8d0'));
  for (let y = 149; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x, y, 72) > 0.7 ? H('#5a5a64') : hh(x >> 1, y, 73) > 0.5 ? H('#4a4a54') : H('#52525c'));
  for (const [x, y, w] of [[150, 170, 30], [250, 176, 24]]) for (let i = 0; i < w; i++) R.pset(x + i, y + Math.round(Math.sin(i) * 0.6), H('#7a8aa8'));
  // el depósito de agua (izquierda) sobre sus patas
  for (const lx of [18, 30, 42]) R.rect(lx, 108, lx + 1, 136, K);
  R.rect(12, 70, 50, 108, K); for (let y = 71; y < 108; y++) for (let x = 13; x < 50; x++) R.pset(x, y, (x - 13) % 5 === 0 ? H('#5a3a20') : x < 20 ? H('#a87a4a') : H('#8a5a34'));
  for (const by of [80, 96]) R.rect(12, by, 50, by + 1, H('#3a3a44')); R.poligono([[10, 70], [31, 56], [52, 70]], H('#5a3a20')); R.linea(10, 70, 31, 56, H('#a87a4a'));
  // respiraderos y una antena
  R.rect(256, 126, 276, 148, K); R.rect(257, 127, 275, 147, H('#8a8e9c')); for (let y = 130; y < 146; y += 3) R.rect(259, y, 273, y, H('#5a5e6c'));
  R.rect(296, 116, 298, 148, K); R.linea(292, 116, 302, 116, K); R.linea(293, 122, 301, 122, K);
});
const p9 = (t) => {
  R.copiar(fondoAzotea());
  const aterriza = @T(45.62), planes = @T(47.82);
  pasan(t, [[30, 30, 36, 1.6], [150, 50, 26, 2.6], [240, 70, 30, 3.4]], [H('#fbe4d8'), H('#e8b0a8'), H('#b07a98')], [0, 0, 270, 100]);
  for (let k = 0; k < 4; k++) pajaro((t * (12 + k * 3) + k * 70) % 340 - 10, 40 + k * 9 + Math.sin(t + k) * 3, t, H('#4a3a5a'));
  // las ventanas de la torre parpadean
  for (let k = 0; k < 6; k++) if (Math.sin(t * 1.3 + k * 2) > 0.6) R.pset(212 + k * 3, 60 + k * 11, H('#ffffff'));
  // los cuatro, a la izquierda: Reed, Sue, Johnny y la Mole (la Mole se cruje los nudillos)
  const listo = t > aterriza;
  R.actor(EL.reed, 64, 168, t, { dir: 1, enfado: listo, dedo: t > planes + 0.4 });
  R.actor(EL.sue, 86, 168, t, { dir: 1, sorpresa: t > aterriza && t < aterriza + 0.6 });
  if (listo) luz(115, 152, 14, 14, H('#f8a040'), 0.35 + 0.1 * Math.sin(t * 9));
  R.actor(EL.johnny, 108, 168, t, { dir: 1, salto: listo && t < aterriza + 0.3 ? 2 : 0 });
  R.actor(T.VD.moleVD, 134, 170, t, { dir: 1, brazos: t > aterriza + 0.2 && t < aterriza + 1.0, sonrisa: t > aterriza + 1.0 });
  // Doom baja del cielo con los propulsores y aterriza en «enemy»; señala en «plans»
  const u = tramo(t, P9 + 0.2, aterriza), dy = Math.round(lerp(40, 168, u)), dx = Math.round(lerp(250, 218, u));
  if (u < 1) for (let k = 0; k < 6; k++) { const f = (t * 8 + k / 6) % 1; ps(dx + 5 + (k % 2) * 4 + Math.sin(t * 30 + k), dy + 1 + f * 8, f < 0.4 ? H('#fff0a0') : H('#f08a3a')); }
  R.actor(EL.doom, dx, dy, t, { dir: -1, dedo: t > planes - 0.3 });
  if (t > aterriza && t < aterriza + 0.5) { const v = (t - aterriza) / 0.5; for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI; ps(dx + 7 + Math.cos(a) * v * 20, 168 - Math.sin(a) * v * 5, H('#c8c8d0')); } }
  // palomas del pretil que se espantan
  for (let k = 0; k < 3; k++) { const x0 = 170 + k * 14; if (t < aterriza - 0.3) { R.rect(x0, 133, x0 + 3, 135, H('#8a8e9c')); R.pset(x0 + 4, 133, H('#5a7a7a')); } else { const v = t - aterriza + 0.3; pajaro(x0 + v * 40 * (k % 2 ? 1 : -0.6), 133 - v * 50, t, H('#8a8e9c')); } }
};

// ── 10 · el muro de los planes: la foto de Reed ──────────────────────────────────────────────────────────────────
const NOTAS = [[66, 34, 34, 26, 'azul'], [104, 30, 28, 22, 'mapa'], [190, 30, 30, 24, 'azul'], [226, 36, 28, 30, 'mapa'], [70, 70, 26, 30, 'mapa'], [100, 64, 30, 24, 'azul'], [200, 64, 26, 26, 'azul'], [232, 74, 22, 22, 'nota'], [72, 108, 28, 24, 'azul'], [206, 100, 26, 26, 'nota'], [234, 104, 22, 30, 'mapa'], [174, 120, 22, 22, 'cuenta']];
const fondoMuro = () => horno('muro', () => {
  bloques(0, 0, 319, 160, [H('#5a5248'), H('#443e36'), H('#2a2620')], 81, 20, 10);
  // el tablero de corcho con su marco de roble
  R.rect(58, 22, 262, 150, K); R.rect(59, 23, 261, 149, H('#6a4024')); R.rect(59, 23, 261, 24, H('#a87a4a'));
  for (let y = 27; y < 147; y++) for (let x = 63; x < 258; x++) R.pset(x, y, hh(x, y, 82) > 0.6 ? H('#b08458') : hh(x, y, 83) > 0.85 ? H('#8a6038') : H('#c09468'));
  // los planos: hojas azules con engranajes y robots, mapas con costas, notas con cuentas y números
  for (const [x, y, w, h, tipo] of NOTAS) { R.rect(x - 1, y - 1, x + w, y + h, K);
    if (tipo === 'azul') { R.rect(x, y, x + w - 1, y + h - 1, H('#2e5a9a')); for (let i = x + 2; i < x + w - 1; i += 5) R.rect(i, y + 1, i, y + h - 2, H('#3a6aaa')); R.disco(x + w / 2, y + h / 2, Math.min(w, h) / 4, H('#c8e0f8')); R.disco(x + w / 2, y + h / 2, Math.min(w, h) / 4 - 2, H('#2e5a9a')); for (let k = 0; k < 8; k++) R.pset(Math.round(x + w / 2 + Math.cos(k * 0.79) * (Math.min(w, h) / 4 + 1)), Math.round(y + h / 2 + Math.sin(k * 0.79) * (Math.min(w, h) / 4 + 1)), H('#c8e0f8')); R.rect(x + 2, y + h - 4, x + w - 3, y + h - 4, H('#c8e0f8')); }
    else if (tipo === 'mapa') { R.rect(x, y, x + w - 1, y + h - 1, H('#e8d8a8')); for (let j = 0; j < h; j++) { const cx = x + w * 0.5 + Math.sin(j * 0.4 + x) * w * 0.25; for (let i = x; i < cx; i++) R.pset(i, y + j, H('#d8c088')); R.pset(Math.round(cx), y + j, H('#8a6a3a')); } R.disco(x + w * 0.7, y + h * 0.4, 1.5, H('#d83a3a')); }
    else { R.rect(x, y, x + w - 1, y + h - 1, H('#f4ecd8')); for (let j = y + 4; j < y + h - 2; j += 4) R.rect(x + 2, j, x + w - 4 - ((j * 7) % 6), j, H('#8a8a9a')); }
    R.disco(x + Math.round(w / 2), y + 1, 1.5, H('#d83a3a')); }
  // la cuenta vieja de la universidad: el 0.8 con su círculo rojo
  R.numero('0.8', 185, 132, { centro: true, rampa: [H('#3a3a4a'), H('#3a3a4a'), H('#3a3a4a')] });
  for (let a = 0; a < 40; a++) R.pset(Math.round(185 + Math.cos(a / 40 * 6.28) * 10), Math.round(129 + Math.sin(a / 40 * 6.28) * 5), H('#d83a3a'));
  // la mesa con el candelabro, el tintero, libros y la percha del cuervo
  tablas(0, 152, 319, 179, [H('#6a4a30'), H('#4a3020'), H('#2a1a10')], 6, 6); R.rect(0, 152, 319, 153, K);
  for (const [x, w, c] of [[264, 10, '#7a2a2a'], [276, 8, '#2a4a6a'], [286, 12, '#4a6a2a']]) { R.rect(x, 140, x + w, 152, K); R.rect(x + 1, 141, x + w - 1, 152, H(c)); R.rect(x + 1, 143, x + w - 1, 143, H('#e8c060')); }
  R.rect(28, 144, 36, 152, K); R.rect(29, 145, 35, 151, H('#1a1a2a')); R.linea(33, 145, 40, 128, H('#f0ecdc')); R.linea(34, 145, 41, 128, H('#c8c0a8'));
  R.rect(296, 70, 298, 152, H('#3a2a1a')); R.rect(286, 70, 308, 72, H('#5a3a24'));
});
const p10 = (t) => {
  R.copiar(fondoMuro());
  const reed = @T(50.46), razon = @T(52.50), puesta = t > reed, OBJ = [150, 140];
  // dónde queda la foto: la mano de Doom en el escalón, en el instante de clavarla
  horno('manoReed', () => { CACHE.set('mr', R.actor(EL.doom, 132, 165, reed, { dir: 1, sostiene: OBJ }).mano); });
  const [fx, fy] = CACHE.get('mr');
  // los hilos rojos de cada plano a la foto de Reed (se mecen un poco)
  for (const [x, y, w, h] of NOTAS) { const x0 = x + w / 2, y0 = y + 1, n = 24; let px = x0, py = y0; for (let i = 1; i <= n; i++) { const u = i / n, X = lerp(x0, fx, u), Y = lerp(y0, puesta ? fy - 16 : 124, u) + Math.sin(u * Math.PI) * (4 + Math.sin(t * 1.6 + x) * 1.5); R.linea(Math.round(px), Math.round(py), Math.round(X), Math.round(Y), H('#c82a2a')); px = X; py = Y; } }
  // el candelabro: tres velas
  for (let k = 0; k < 3; k++) vela(50 + k * 7, 140 - (k === 1 ? 4 : 0), t, k * 2, 6); R.rect(48, 146, 66, 148, H('#c8a040')); R.rect(56, 146, 58, 152, H('#c8a040')); luz(57, 128, 30, 24, H('#f8c060'), 0.22);
  // el cuervo en su percha gira la cabeza
  { const x = 297, y = 64, g = Math.sin(t * 1.1) > 0.3 ? 1 : -1; R.rect(x - 4, y - 6, x + 3, y + 5, K); R.rect(x - 3, y - 5, x + 2, y + 4, H('#2a2a3a')); R.rect(x + (g > 0 ? 2 : -6), y - 8, x + (g > 0 ? 6 : -2), y - 4, K); R.pset(x + (g > 0 ? 5 : -5), y - 7, H('#e8e0a0')); R.pset(x + (g > 0 ? 7 : -7), y - 6, H('#5a5a6a')); }
  // el escalón de piedra bajo el tablero
  R.rect(112, 165, 164, 172, K); R.rect(113, 166, 163, 171, H('#6a6a74')); R.rect(113, 166, 163, 166, H('#9a9aa4')); for (let x = 122; x < 162; x += 13) R.pset(x, 169, H('#4a4a54'));
  // Doom llega con la foto, sube al escalón y la clava en «Reed Richards»; en «right» aprieta los puños
  const u = tramo(t, P10, reed - 0.4), dx = Math.round(lerp(10, 132, u)), sube = u > 0.85;
  const r = R.actor(EL.doom, dx, sube ? 165 : 176, t, { dir: 1, anda: u > 0 && u < 1, sostiene: puesta ? undefined : (u < 1 ? true : OBJ), enfado: t > razon - 0.3, salto: u > 0.8 && u < 0.9 ? 2 : 0 });
  const [mx, my] = puesta ? [fx, fy] : r.mano;
  const foto = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 7, y - 18, x + 7, y, K); R.rect(x - 6, y - 17, x + 6, y - 1, H('#f4f0e4')); R.rect(x - 5, y - 16, x + 5, y - 4, H('#a8c0d8'));
    R.disco(x, y - 11, 3, H('#f0c8a0')); R.rect(x - 3, y - 15, x + 3, y - 13, H('#6a4a2a')); R.pset(x - 3, y - 12, H('#a8a8b0')); R.pset(x + 3, y - 12, H('#a8a8b0')); R.pset(x - 1, y - 11, K); R.pset(x + 1, y - 11, K); R.pset(x, y - 9, H('#c86a5a'));
    R.rect(x - 4, y - 7, x + 4, y - 4, H('#2e5ac8')); R.pset(x, y - 6, H('#ffffff')); if (puesta) R.disco(x, y - 18, 1.5, H('#d83a3a')); };
  foto(mx, my);
  if (t > reed && t < reed + 0.3) for (let k = 0; k < 6; k++) ps(fx + Math.cos(k) * (t - reed) * 40, fy - 18 + Math.sin(k) * (t - reed) * 30, H('#ffffff'));
  // en «the boy who was right» sale la marca verde junto al 0.8
  if (t > razon - 0.6) { const v = tramo(t, razon - 0.6, razon); R.recorte([196, 116, 196 + Math.round(16 * v), 140]); T.visto(R, 198, 122, 2); R.recorte(null); }
};

// ── 11 · la cripta: la raya del círculo y la reja que cae ─────────────────────────────────────────────────────────
const fondoCripta = () => horno('cripta', () => {
  bloques(0, 0, 319, 128, [H('#4a5258'), H('#343c42'), H('#1e2428')], 91, 18, 9);
  // la bóveda: arcos de medio punto con dovelas
  for (const ax of [60, 160, 260]) for (let a = 0; a <= 60; a++) { const p = Math.PI * a / 60, x = Math.round(ax - Math.cos(p) * 46), y = Math.round(58 - Math.sin(p) * 40); R.rect(x - 2, y - 2, x + 2, y + 2, a % 6 === 0 ? K : H('#5a6268')); }
  for (const px of [14, 110, 210, 306]) { R.rect(px - 6, 58, px + 6, 128, K); R.rect(px - 5, 58, px + 5, 128, H('#4a5258')); R.rect(px - 5, 58, px - 3, 128, H('#6a7278')); R.rect(px + 3, 58, px + 5, 128, H('#2a3034')); R.rect(px - 7, 56, px + 7, 60, H('#2a3034')); }
  // la escalera que baja por la izquierda y la reja levantada sobre ella
  for (let k = 0; k < 8; k++) { const y = 80 + k * 7, x1 = 18 + k * 8; R.rect(0, y, x1, y + 7, K); R.rect(0, y + 1, x1 - 1, y + 6, H('#5a6268')); R.rect(0, y + 1, x1 - 1, y + 1, H('#7a8288')); }
  // el suelo de losas en perspectiva
  for (let y = 128; y < 180; y++) { const f = (y - 128) / 52, fila = Math.floor((y - 128) / (4 + f * 6)); for (let x = 0; x < 320; x++) { const dx = ((x - 190) / (1 + f * 1.3) + fila * 11 + 640) % 24; let c = dx < 1 || (y - 128) % Math.round(4 + f * 6) === 0 ? H('#161a1e') : hh(Math.floor(((x - 190) / (1 + f * 1.3) + fila * 11) / 24), fila, 92) > 0.5 ? H('#30383e') : H('#2a3036'); if (hh(x, y, 93) > 0.97) c = H('#40484e'); R.pset(x, y, c); } }
  // arcones de piedra con flejes y un ánfora
  for (const [x, w] of [[226, 30], [262, 34]]) { R.rect(x, 110, x + w, 128, K); R.rect(x + 1, 111, x + w - 1, 127, H('#5a5248')); R.rect(x + 1, 111, x + w - 1, 113, H('#7a7268')); R.rect(x + 5, 111, x + 7, 127, H('#3a3e4a')); R.rect(x + w - 7, 111, x + w - 5, 127, H('#3a3e4a')); R.disco(x + w / 2, 119, 2, H('#8a8e9c')); }
  R.disco(306, 120, 6, K); R.disco(306, 120, 5, H('#8a5a3a')); R.rect(304, 110, 308, 115, K); R.rect(305, 111, 307, 115, H('#8a5a3a')); R.pset(304, 118, H('#c88a5a'));
  // cadenas que cuelgan
  for (const cx of [130, 236]) for (let y = 10; y < 70; y += 3) { R.rect(cx - 1, y, cx + 1, y + 1, H('#5a5a64')); R.pset(cx, y + 2, H('#3a3a44')); }
});
const p11 = (t) => {
  R.copiar(fondoCripta());
  const cruza = @T(55.40), vuelta = @T(56.70);
  for (const [x, s] of [[110, 1], [210, 2]]) antorcha(x, 72, t, s, H('#f0a050'));
  // el círculo de signos del suelo: tenue; en «crosses» la raya destella y los signos se encienden en corro
  const fl = tramo(t, cruza - 0.05, cruza + 0.3), on = t > cruza ? 1 : 0.25, CX = 196, CY = 154, RX = 84, RY = 18;
  for (let a = 0; a < 260; a++) { const p = a / 260 * 6.283, x = Math.round(CX + Math.cos(p) * RX), y = Math.round(CY + Math.sin(p) * RY); const g = t > cruza ? (((p - (t - cruza) * 5) % 6.283) + 6.283) % 6.283 < 1.5 ? 1 : 0.6 : 0.3;
    R.pset(x, y, mez(H('#1e3a2a'), H('#a8ffc0'), g)); R.pset(x, y + 1, mez(H('#1a2a20'), H('#4ac870'), g * 0.7)); }
  for (let a = 0; a < 180; a++) { const p = a / 180 * 6.283; R.pset(Math.round(CX + Math.cos(p) * RX * 0.72), Math.round(CY + Math.sin(p) * RY * 0.72), mez(H('#1e3a2a'), H('#6ae890'), on * 0.8)); }
  for (let k = 0; k < 12; k++) { const p = k / 12 * 6.283, x = Math.round(CX + Math.cos(p) * RX * 0.86), y = Math.round(CY + Math.sin(p) * RY * 0.86), c = mez(H('#2a4a34'), H('#d8ffe0'), on * (0.6 + 0.4 * Math.sin(t * 4 + k)));
    if (k % 3 === 0) { R.linea(x - 2, y, x + 2, y, c); R.linea(x, y - 1, x, y + 1, c); } else if (k % 3 === 1) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x, y, c); R.pset(x, y + 1, c); } else { R.linea(x - 2, y + 1, x, y - 1, c); R.linea(x, y - 1, x + 2, y + 1, c); } }
  if (fl > 0 && fl < 1) luz(CX, CY, RX + 10, RY + 26, H('#a8ffc0'), 0.5 * Math.sin(fl * Math.PI));
  if (t > cruza) luz(CX, CY - 6, 60, 30, H('#6ae890'), 0.18);
  // Doom baja la escalera y cruza la raya en «crosses»
  const u = tramo(t, P11, cruza + 0.6), dx = Math.round(lerp(30, 178, u)), dy = dx < 76 ? 80 + (dx - 4) * 0.875 + 7 : 156;
  R.actor(EL.doom, dx, Math.round(Math.min(156, dy)), t, { dir: 1, anda: u > 0 && u < 1 });
  // la reja cae detrás de él en «no coming back»
  const rc = cl((t - vuelta + 0.25) / 0.25), ry = Math.round(lerp(60, 128, rc * rc));
  for (let x = 64; x <= 96; x += 6) { const y0 = Math.max(46, ry - 70); R.linea(x, y0, x, ry, K); R.linea(x + 1, y0, x + 1, ry, H('#6a6e7c')); R.rect(x, ry + 1, x + 1, ry + 3, K); }
  for (let y = ry - 66; y < ry; y += 12) if (y >= 46) R.rect(62, y, 98, y + 1, H('#3a3e4a'));
  if (t > vuelta && t < vuelta + 0.6) for (let k = 0; k < 10; k++) { const v = (t - vuelta) / 0.6; ps(80 + (k - 5) * 5 * v * 2, 128 - Math.sin(k) * v * 10 - v * 6, H('#8a8e9c')); }
  // el murciélago que cruza y las gotas que caen
  { const v = (t * 0.2) % 1; pajaro(320 - v * 360, 30 + Math.sin(t * 3) * 6, t * 2, K); }
  for (let k = 0; k < 3; k++) { const f = (t * 0.7 + k * 0.33) % 1; ps(150 + k * 50, 40 + f * 90, H('#6a8aa8')); }
};

// ── 12 · el laboratorio del castillo (2003): la aguja a tope y el libro verde ────────────────────────────────────
const fondoLab = () => horno('labCastillo', () => {
  // paneles de metal remachados
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const jx = x % 40, jy = y % 30; let c = jx === 0 || jy === 0 ? H('#1a1e24') : jx === 1 || jy === 1 ? H('#5a626e') : x < 160 ? H('#3a4250') : H('#343c48'); if ((jx === 4 || jx === 36) && (jy === 4 || jy === 26)) c = H('#8a929e'); R.pset(x, y, c); }
  // tuberías
  for (const [y, c] of [[26, '#6a4a3a'], [33, '#4a6a5a']]) { R.rect(0, y, 319, y + 4, K); R.rect(0, y + 1, 319, y + 3, H(c)); R.rect(0, y + 1, 319, y + 1, H('#a8a8b0')); for (let x = 20; x < 320; x += 60) R.rect(x, y - 1, x + 3, y + 5, H('#2a2a30')); }
  // la batería de máquinas de la izquierda con diales y lucecitas
  R.rect(8, 40, 100, 132, K); R.rect(9, 41, 99, 131, H('#5a6270')); R.rect(9, 41, 99, 43, H('#8a929e'));
  for (let k = 0; k < 3; k++) { const cx = 26 + k * 28; R.disco(cx, 60, 9, K); R.disco(cx, 60, 8, H('#e8e4d8')); for (let a = 0; a < 7; a++) R.pset(Math.round(cx + Math.cos(Math.PI + a * 0.52) * 6), Math.round(60 + Math.sin(Math.PI + a * 0.52) * 6), K); }
  for (let j = 0; j < 4; j++) for (let i = 0; i < 9; i++) { R.rect(14 + i * 9, 80 + j * 9, 19 + i * 9, 84 + j * 9, K); R.rect(15 + i * 9, 81 + j * 9, 18 + i * 9, 83 + j * 9, H('#2a2e36')); }
  // el gran dial del centro (escala con la zona roja)
  R.rect(110, 28, 210, 92, K); R.rect(111, 29, 209, 91, H('#4a5260')); R.rect(111, 29, 209, 30, H('#7a828e'));
  for (let r = 0; r < 34; r++) for (let a = 0; a <= 120; a++) { const p = Math.PI + a / 120 * Math.PI, x = Math.round(160 + Math.cos(p) * r), y = Math.round(84 + Math.sin(p) * r); R.pset(x, y, r > 32 ? K : r > 26 && a > 92 ? H('#d83a3a') : r > 26 ? H('#e8c040') : H('#f0ecdc')); }
  for (let k = 0; k <= 10; k++) { const p = Math.PI + k / 10 * Math.PI; R.linea(Math.round(160 + Math.cos(p) * 20), Math.round(84 + Math.sin(p) * 20), Math.round(160 + Math.cos(p) * 25), Math.round(84 + Math.sin(p) * 25), K); }
  R.numero('0', 132, 90, { rampa: [K, K, K] }); R.numero('100', 182, 90, { rampa: [K, K, K] });
  // dos pantallas de ondas (a la derecha del dial) y la bobina de Tesla
  for (const [x, y] of [[218, 40], [218, 72]]) { R.rect(x, y, x + 40, y + 26, K); R.rect(x + 1, y + 1, x + 39, y + 25, H('#0e1a14')); }
  R.rect(276, 118, 300, 132, K); R.rect(277, 119, 299, 131, H('#5a4a3a')); R.rect(284, 64, 292, 118, K); for (let y = 65; y < 118; y += 2) R.rect(285, y, 291, y, (y >> 1) % 2 ? H('#c8783a') : H('#a85a2a')); R.disco(288, 58, 8, K); R.disco(288, 58, 7, H('#a8acbc')); R.disco(286, 56, 3, H('#d8dce8'));
  // el suelo de rejilla
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 6 === 0 || y % 6 === 0) ? H('#1a1e24') : (y - 132) / 48 > bay(x, y) ? H('#2a3038') : H('#3a424c'));
  // el atril con el libro viejo a la derecha
  R.rect(244, 128, 250, 162, K); R.rect(245, 128, 249, 162, H('#5a3a24')); R.rect(236, 162, 258, 165, K); R.poligono([[232, 128], [262, 128], [258, 120], [236, 120]], H('#6a4024'));
  R.rect(236, 116, 258, 121, K); R.rect(237, 117, 246, 120, H('#e8dcc0')); R.rect(248, 117, 257, 120, H('#d8ccb0')); R.rect(247, 116, 247, 121, H('#6a2a2a'));
});
const consolaLab = (t, apagon) => {
  R.rect(90, 146, 230, 172, K); R.rect(91, 147, 229, 171, H('#4a5260')); R.rect(91, 147, 229, 149, H('#8a929e')); R.rect(91, 164, 229, 171, H('#343a46'));
  for (let i = 0; i < 12; i++) { const on = !apagon && Math.sin(t * 5 + i * 1.7) > 0; R.rect(96 + i * 11, 152, 101 + i * 11, 156, K); R.rect(97 + i * 11, 153, 100 + i * 11, 155, on ? [H('#e84a4a'), H('#4ae86a'), H('#e8c040')][i % 3] : H('#2a2e36')); }
  R.rect(150, 158, 170, 162, K); R.rect(151, 159, 169, 161, H('#c83a3a'));
};
const p12 = (t) => {
  R.copiar(fondoLab());
  const poder = @T(60.48), ciencia = @T(61.12), conseguir = @T(62.94);
  const apagon = t > ciencia + 0.1;
  // la aguja sube a tope en «power» y tiembla en el rojo; en «science» saltan los fusibles
  const nu = tramo(t, P12 + 0.2, poder), p = Math.PI + Math.min(1, nu * 1.02 + (t > poder ? 0.02 * Math.sin(t * 40) : 0)) * Math.PI * (apagon ? 1 - tramo(t, ciencia + 0.2, ciencia + 1.2) : 1);
  R.linea(160, 84, Math.round(160 + Math.cos(p) * 24), Math.round(84 + Math.sin(p) * 24), H('#c82a2a')); R.disco(160, 84, 2, K);
  // las pantallas de ondas (se apagan con el apagón)
  for (const [x, y, k] of [[218, 40, 0], [218, 72, 1]]) { R.recorte([x + 1, y + 1, x + 39, y + 25]); if (!apagon) for (let i = 0; i < 38; i++) { const yy = y + 13 + Math.round(Math.sin(i * 0.4 + t * 6 + k * 2) * (4 + nu * 7)); R.pset(x + 1 + i, yy, H('#4ae86a')); } R.recorte(null); }
  // los diales pequeños bailan
  for (let k = 0; k < 3; k++) { const cx = 26 + k * 28, a = Math.PI + (apagon ? 0.2 : 0.4 + 0.5 * nu + 0.15 * Math.sin(t * 3 + k)) * Math.PI; R.linea(cx, 60, Math.round(cx + Math.cos(a) * 6), Math.round(60 + Math.sin(a) * 6), H('#c82a2a')); }
  // la bobina chisporrotea mientras hay corriente
  if (!apagon) for (let k = 0; k < 2; k++) { let x = 288, y = 58; const a = t * 13 + k * 3; for (let i = 0; i < 6; i++) { const nx = x + (k ? 3 : -3) + Math.round(Math.cos(a + i) * 1.5), ny = y + Math.round(Math.sin(a * 1.7 + i) * 3); R.linea(x, y, nx, ny, H('#c8e8ff')); x = nx; y = ny; } }
  if (t > ciencia && t < ciencia + 0.4) { luz(60, 90, 60, 50, H('#ffffff'), 0.6 * (1 - (t - ciencia) / 0.4)); for (let k = 0; k < 14; k++) { const v = (t - ciencia) / 0.4; ps(60 + Math.cos(k * 2.1) * v * 50, 90 + Math.sin(k * 2.1) * v * 30 + v * v * 20, H('#fff0a0')); } }
  if (apagon) { humito(40, 40, t, 0.1, 30, H('#5a5a64'), H('#9a9aa4'), 1.5); humito(80, 42, t, 0.5, 26, H('#5a5a64'), H('#9a9aa4'), 1.2); T.tinte(R, 0, 179, [20, 30, 60], 0.35); }
  // la luz verde del libro en «to get it»
  const lv = tramo(t, conseguir - 0.3, conseguir + 0.4);
  if (lv > 0) { luz(247, 112, 34 * lv, 30 * lv, H('#6ae890'), 0.5); for (let k = 0; k < 8; k++) { const f = (t * 0.6 + k / 8) % 1; ps(240 + hh(k, 1, 4) * 16, 114 - f * 30 * lv, H('#c8ffd8')); } }
  // Doom tras la consola: mira el dial, golpea en «science» y se vuelve hacia el libro en «to get it»
  R.actor(EL.doom, 152, 154, t, { dir: t > conseguir ? 1 : -1, enfado: t > ciencia, brazos: t > ciencia && t < ciencia + 0.5, dedo: t > poder - 0.5 && t < ciencia });
  consolaLab(t, apagon);
};

// ── 13 · la colina de lejos, de noche: la luz verde y la figura del chal ─────────────────────────────────────────
const fondoColina = () => horno('colina', () => {
  rampa(0, 0, 319, 120, [H('#0e1230'), H('#161c44'), H('#242c5a'), H('#363c6a')]);
  for (let k = 0; k < 60; k++) { const x = Math.round(hh(k, 1, 131) * 320), y = Math.round(hh(k, 2, 131) * 80); if ((x > 270 && y < 46) || (x > 18 && x < 172 && y < 22)) continue; R.pset(x, y, hh(k, 3, 131) > 0.6 ? H('#ffffff') : H('#8a8ab8')); }
  sierra(3.3, 104, 30, [H('#4a4e78'), H('#3a3e66'), H('#2a2e52')], [H('#c8cce0'), H('#9aa0c0')], 140);
  // la colina con las piedras de pie arriba
  for (let x = 0; x < 320; x++) { const top = 118 - 34 * Math.exp(-(((x - 218) / 46) ** 2)); for (let y = Math.round(top); y < 180; y++) R.pset(x, y, y - top < 2 ? H('#c8d0e8') : hh(x >> 1, y >> 1, 132) > 0.85 ? H('#2a3050') : H('#323a5e')); }
  for (const [x, h] of [[200, 8], [208, 10], [230, 9], [238, 7]]) { R.rect(x, 86 - h, x + 2, 86, H('#1a1e36')); R.pset(x, 86 - h, H('#5a6088')); }
  R.rect(212, 78, 226, 79, H('#1a1e36'));
  // la casa del pueblo en primer término (izquierda): pared de troncos, la ventana con la vela, el alero con nieve
  for (let y = 60; y < 180; y++) for (let x = 0; x < 104; x++) { const j = (y - 60) % 8; R.pset(x, y, j === 0 ? H('#1a1210') : j < 3 ? H('#5a3a24') : (x + y * 3) % 23 === 0 ? H('#2a1a10') : H('#4a2e1a')); }
  R.poligono([[0, 48], [112, 60], [112, 64], [0, 54]], H('#2a1a10')); for (let x = 0; x < 112; x++) R.pset(x, Math.round(48 + x * 0.107) - 1, H('#e8ecf8'));
  R.rect(40, 86, 80, 122, K); R.rect(42, 88, 78, 120, H('#2a1a14')); R.rect(59, 88, 60, 120, K); R.rect(42, 103, 78, 104, K);
  R.rect(36, 122, 84, 126, K); R.rect(37, 122, 83, 124, H('#6a4a2a')); R.rect(37, 122, 83, 122, H('#e8ecf8'));
  // la valla y la nieve del primer término
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const top = 156 + Math.sin(x * 0.05) * 3; if (y < top) continue; R.pset(x, y, y - top < 2 ? H('#f0f2fa') : (y - top) / 24 > bay(x, y) ? H('#9aa4c8') : H('#c0c8e0')); }
  for (let k = 0; k < 9; k++) { const x = 120 + k * 22; R.rect(x, 140, x + 2, 162, K); R.rect(x + 1, 141, x + 1, 161, H('#5a4028')); R.pset(x + 1, 139, H('#f0f2fa')); }
  R.linea(120, 146, 310, 146, H('#3a2818')); R.linea(120, 154, 310, 154, H('#3a2818'));
  for (let x = 112; x < 320; x += 11) { const y = 166 + Math.round(Math.sin(x) * 3); R.pset(x, y, H('#8a94b8')); R.pset(x + 4, y + 3, H('#8a94b8')); }
  for (let k = 0; k < 10; k++) { const x = 10 + k * 31, y = 172 + (k % 3) * 2; for (let i = -2; i <= 2; i++) R.linea(x, y, x + i, y - 4 - (i & 1), H('#6a5a48')); }
  R.rect(0, 150, 30, 160, K); for (let y = 151; y < 160; y += 3) R.rect(1, y, 29, y + 1, H('#6a4a2a'));
});
const p13 = (t) => {
  R.copiar(fondoColina());
  const sacrifica = @T(63.44), valeria = @T(64.18), nadie = @T(68.08);
  pasan(t, [[40, 24, 34, 1.0], [180, 44, 26, 1.6], [300, 60, 30, 2.2]], [H('#6a6e9a'), H('#4a4e7a'), H('#363a62')], [0, 0, 270, 96]);
  R.disco(150, 30, 7, H('#e8e8f0')); R.disco(152, 29, 6, H('#f8f8ff')); R.pset(148, 32, H('#c8c8d8'));
  // dos figuras pequeñas en la cima: Doom (capucha verde) y Valeria (chal morado); ella se deshace en luz verde
  { const x = 212, y = 86; R.rect(x - 2, y - 8, x + 2, y, H('#1e4a2a')); R.rect(x - 1, y - 10, x + 1, y - 8, H('#2e7a3e')); R.pset(x, y - 9, H('#a8acbc')); }
  const se = tramo(t, valeria, valeria + 2.4), col = tramo(t, sacrifica - 0.1, sacrifica + 0.5) * (1 - tramo(t, valeria + 2.0, valeria + 3.6));
  if (col > 0) { for (let y = 0; y < 86; y++) { const g = col * (0.25 + 0.75 * (y / 86)); for (let dx = -3; dx <= 3; dx++) { const gg = g * (1 - Math.abs(dx) / 4); if (gg > bay(222 + dx, y) * 0.8) R.pset(222 + dx, y, mez(R.pget(222 + dx, y), H('#a8ffc8'), gg)); } } luz(222, 84, 30, 14, H('#6ae890'), 0.5 * col); }
  if (se < 1) { const x = 222, y = 86; for (let j = 0; j < 10; j++) for (let i = -2; i <= 2; i++) { if (hh(i, j, 7) < se * 1.1) continue; R.pset(x + i, y - j, j > 7 ? H('#e8c098') : j > 5 ? H('#6a2a6a') : H('#8a3a8a')); } }
  if (t > valeria) for (let k = 0; k < 16; k++) { const f = ((t - valeria) * 0.35 + k / 16) % 1; if (t - valeria < f / 0.35) continue; const a = 1 - tramo(t, nadie - 1, nadie + 1); if (hh(k, 5, 1) > a) continue; ps(222 + Math.sin(f * 6 + k) * 6, 84 - f * 60, k % 2 ? H('#c8ffd8') : H('#6ae890')); }
  // la ventana de la casa: la vela y la maceta; en «nobody» la vela se apaga y sale un hilo de humo
  const apagada = t > nadie;
  R.recorte([42, 88, 78, 120]);
  luz(60, 110, apagada ? 6 : 24, apagada ? 6 : 18, H('#f8c060'), apagada ? 0 : 0.6);
  R.recorte(null);
  R.rect(59, 88, 60, 120, K); R.rect(42, 103, 78, 104, K);
  R.rect(52, 114, 55, 121, H('#f0e8d0')); if (!apagada) llama(53, 113, t, 1.2); else if (t < nadie + 1.6) humito(53, 112, t, 0.3, 10, H('#8a8a94'), H('#c8c8d0'), 0.4);
  R.rect(66, 115, 73, 121, K); R.rect(67, 116, 72, 121, H('#b85a3a')); R.disco(69, 111, 2.5, H('#4a8a3a')); R.pset(68, 109, H('#e8a0d0')); R.pset(70, 110, H('#e8a0d0'));
  if (!apagada) luz(60, 126, 30, 10, H('#f8c060'), 0.25);
  // nieve fina
  for (let k = 0; k < 24; k++) { const v = (t * (0.08 + hh(k, 1, 6) * 0.05) + hh(k, 2, 6)) % 1; ps(hh(k, 3, 6) * 320 + Math.sin(t + k) * 3, v * 180, H('#e8ecf8')); }
};

// ── 14 · la mesa de los pergaminos: Atom piensa ──────────────────────────────────────────────────────────────────
const fondoPergaminos = () => horno('pergaminos', () => {
  bloques(0, 0, 319, 92, [H('#5a5040'), H('#463e32'), H('#2a241c')], 141, 20, 10);
  // el tapiz verde con el aro y el ventanuco con la luna
  for (let y = 14; y < 84; y++) for (let x = 112; x < 196; x++) { const pico = y > 76 && ((x - 112) % 12) < (y - 76) * 1.5; if (pico) continue; R.pset(x, y, x === 112 || x === 195 ? H('#123a1e') : (x + y) % 5 === 0 ? H('#246a32') : H('#2e7a3e')); }
  for (let x = 112; x < 196; x++) { R.pset(x, 18, H('#c8a040')); R.pset(x, 72, H('#c8a040')); }
  R.rect(108, 12, 200, 14, H('#5a3a24'));
  R.disco(154, 44, 14, H('#e8c050')); R.disco(154, 44, 11, H('#2e7a3e')); for (const [dx, dy] of [[0, -18], [0, 18], [-18, 0], [18, 0]]) { R.disco(154 + dx * 0.9, 44 + dy * 0.9, 3, H('#e8c050')); }
  R.rect(232, 26, 248, 70, K); R.rect(234, 28, 246, 68, H('#1a2048')); R.disco(240, 38, 3, H('#e8e8f0')); R.pset(236, 56, H('#ffffff')); R.pset(243, 48, H('#c8c8e8'));
  // la mesa de roble en perspectiva
  for (let y = 92; y < 180; y++) for (let x = 0; x < 320; x++) { const f = (y - 92) / 88, xx = (x - 160) / (0.6 + f * 0.8) + 160, j = Math.floor(xx / 26); let c = (xx % 26 + 26) % 26 < 1 ? H('#2a1a10') : H('#6a4428'); const g = Math.sin(xx * 0.3 + j * 5 + y * 0.05); if (g > 0.9) c = H('#5a3820'); else if (g < -0.92) c = H('#7e5432'); R.pset(x, y, c); }
  R.rect(0, 92, 319, 94, K); R.rect(0, 95, 319, 96, H('#8a6038'));
  // el libro viejo abierto, el tintero con la pluma y el reloj de arena
  R.poligono([[18, 128], [72, 124], [78, 150], [22, 156]], K); R.poligono([[20, 128], [46, 126], [48, 152], [23, 154]], H('#e8dcc0')); R.poligono([[47, 126], [72, 125], [76, 149], [49, 151]], H('#d8ccb0'));
  for (let k = 0; k < 5; k++) { R.linea(25, 133 + k * 4, 43, 131 + k * 4, H('#8a7a5a')); R.linea(52, 131 + k * 4, 70, 130 + k * 4, H('#8a7a5a')); }
  R.rect(262, 120, 272, 132, K); R.rect(263, 121, 271, 131, H('#1a1a2a')); R.linea(268, 121, 282, 98, H('#f0ecdc')); R.linea(269, 121, 284, 99, H('#c8c0a8'));
  R.rect(284, 108, 300, 110, H('#8a6038')); R.rect(284, 140, 300, 142, H('#8a6038')); R.rect(285, 110, 286, 140, H('#5a3820')); R.rect(298, 110, 299, 140, H('#5a3820'));
});
const p14 = (t) => {
  R.copiar(fondoPergaminos());
  const piensa = @T(69.90), chico = @T(72.00), madre = @T(73.64), demonio = @T(74.32);
  // el candelabro
  for (let k = 0; k < 3; k++) vela(212 + k * 8, 116 - (k === 1 ? 4 : 0), t, k * 3, 8); R.rect(210, 118, 230, 120, H('#c8a040')); luz(220, 100, 40, 30, H('#f8c060'), 0.22);
  // el reloj de arena que cae
  { const a = ((t - P14) * 0.12) % 1; for (let j = 0; j < 14; j++) { const w = Math.round(Math.abs(j - 7) * 0.7) + 1; for (let i = -w; i <= w; i++) R.pset(292 + i, 111 + j + (j > 6 ? 1 : 0), j < 7 ? (j / 7 > a ? H('#e8c070') : H('#c8e0f0')) : ((14 - j) / 7 < a ? H('#e8c070') : H('#c8e0f0'))); } R.pset(292, 118 + Math.floor(t * 8) % 7, H('#e8c070')); }
  // el pergamino del trato de su madre, con el sello rojo de la mano
  R.rect(96, 112, 196, 164, K); R.rect(97, 113, 195, 163, H('#e8dcb8')); R.rect(92, 110, 200, 115, K); R.rect(93, 111, 199, 114, H('#c8b890')); R.rect(92, 162, 200, 167, K); R.rect(93, 163, 199, 166, H('#c8b890'));
  for (let k = 0; k < 7; k++) { let px = 104; for (let x = 104; x < 186 - (k === 6 ? 40 : 0); x += 3) { const y = 120 + k * 5 + Math.round(Math.sin(x * 0.7 + k) * 0.8); R.linea(px, y, x, y, H('#6a5a4a')); px = x; } }
  const late = t > demonio ? 0.5 + 0.5 * Math.sin((t - demonio) * 9) : 0;
  if (late > 0) luz(176, 152, 26, 16, H('#ff4a3a'), 0.5 * late + 0.2);
  R.disco(176, 152, 7, K); R.disco(176, 152, 6, mez(H('#a8202a'), H('#ff5a4a'), late)); for (const [dx, dy] of [[-3, -5], [-1, -6], [1, -6], [3, -5], [5, -2]]) { R.pset(176 + dx, 152 + dy, H('#ff8a7a')); R.pset(176 + dx, 152 + dy + 1, H('#ff8a7a')); } R.disco(176, 153, 2.5, H('#ff8a7a'));
  // el medallón de su madre, que se abre en «mother»
  { const x = 74, y = 166, ab = tramo(t, madre - 0.2, madre + 0.3); R.linea(x, y, x + 24, y + 6, H('#c8a040')); R.disco(x, y, 6, K); R.disco(x, y, 5, H('#e8c050'));
    if (ab > 0) { R.disco(x - 9 * ab, y - 2, 5, K); R.disco(x - 9 * ab, y - 2, 4, H('#c8a040')); R.disco(x, y, 4, H('#3a2a4a')); R.disco(x, y - 1, 2, H('#e8c098')); R.rect(x - 2, y - 4, x + 2, y - 2, H('#1c1424')); R.rect(x - 2, y + 2, x + 2, y + 3, H('#6a3a8a')); } }
  // el niño que juró, en un recuerdo azul sobre el libro (en «the boy who swore»)
  if (t > chico - 0.2 && t < madre + 0.6) { const a = tramo(t, chico - 0.2, chico + 0.3) * (1 - tramo(t, madre, madre + 0.6)); R.actor(T.VD.victorChicoVD, 40, 124, t, { dir: 1, brazos: t > chico + 0.4, pal: { C: H('#6a8ac8'), c: H('#4a6aa8') } }); for (let k = 0; k < 6; k++) ps(36 + hh(k, 1, 3) * 24, 100 + ((t * 10 + k * 5) % 24), H('#c8e0ff')); }
  // Atom llega por la mesa, piensa en «think» y se sorprende con el sello en «demon»
  const u = tramo(t, P14 - 0.2, piensa + 0.8), ax = lerp(330, 222, u);
  T.AT.atom(R, ax, 150, t, { dir: -1, pose: u < 1 ? 'camina' : t < demonio ? 'piensa' : 'senala', cara: t > demonio ? 'sorpresa' : 'normal', habla: voz(t) * 0.6 });
  if (t > piensa + 0.9 && t < chico) R.bocadillo(ax - 6, 120, { icono: '?' });
  // en «ends up» asoma un segundo pergamino, nuevo, por la derecha
  const nu = tramo(t, P15 - 0.6, P15); if (nu > 0) { const x = Math.round(320 - nu * 26); R.rect(x, 100, x + 30, 106, K); R.rect(x + 1, 101, x + 30, 105, H('#f0ead0')); }
};

// ── 15 · el ventanal del trono: Doom de espaldas ─────────────────────────────────────────────────────────────────
const p15 = (t) => ventanalFinal(t, TT);

const efectos = [[0.3, 'viento'], [@T(4.56), 'brillo'], [@T(5.95), 'pasos'], [@T(6.60), 'whoosh'], [@T(6.95), 'golpecito'], [@T(7.60), 'toc'], [@T(9.50), 'pop'],
  [@T(11.70), 'aldea'], [@T(14.25), 'golpecito'], [@T(15.28), 'pop'], [@T(16.10), 'brillo'],
  [@T(17.40), 'pasos'], [@T(18.60), 'pop'], [@T(20.70), 'golpecito'],
  [@T(23.00), 'pasos'], [@T(24.76), 'golpecito'], [@T(27.30), 'viento'],
  [@T(30.80), 'whoosh'], [@T(31.44), 'zumbido'],
  [@T(33.60), 'pop'], [@T(34.08), 'zumbido'], [@T(34.25), 'boing'],
  [@T(37.50), 'interruptor'], [@T(42.06), 'pop'],
  [@T(44.20), 'jet'], [@T(45.62), 'golpecito'], [@T(45.80), 'pajaros'],
  [@T(50.46), 'toc'], [@T(52.20), 'lapiz'],
  [@T(54.00), 'pasos'], [@T(55.40), 'brillo'], [@T(56.70), 'cerrojo'],
  [@T(58.60), 'zumbido'], [@T(61.12), 'chof'], [@T(62.70), 'brillo'],
  [@T(63.44), 'brillo'], [@T(68.08), 'vapor'],
  [@T(70.00), 'pasos'], [@T(73.64), 'tic'], [@T(74.32), 'golpecito'],
  [@T(77.00), 'viento']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11], [P12, p12], [P13, p13], [P14, p14], [P15, p15]],
  { efectos, año: (t) => t < P8 ? null : t < P11 ? 1962 : 2003 });
'''))

E['vd-malo'] = ('Fíjate: el malo', '''// VD-MALO (frase 21), LA PAUSA «fíjate» de Baumeister, sin año. Seis planos:
// 1. el ventanal de vd-rey CONGELADO en gris azulado; Atom al doble entra, señala a Doom en «notice this» y en «key»
//    saca a color una llave dorada;
// 2. la mesa del estudio: en «spent years» los cuadernos de historias se apilan uno tras otro; en «real harm» Atom abre
//    el de arriba: el jarrón roto;
// 3. el teatrillo de títeres: el malo del sombrero se señala a sí mismo («?») y niega; en «bad guy» señala al héroe y el
//    héroe lo señala a él;
// 4. la pizarra del estudio: Atom dibuja a uno con su bocadillo y su razón (el corazón); en «justifies» el «✓» enorme;
// 5. el espejo de cerca sobre el mundo congelado: dentro, a color, Doom con capa roja de héroe; en «only one» alza los
//    brazos y el sol se abre detrás;
// 6. el ventanal congelado otra vez: Atom le pone delante el espejo pequeño; en «dangerous», «!»; vuelve el color.
// Sonido: un golpe seco al congelarse y un clic al salir; un pop por cada cuaderno.''', _en('vd-malo', COMUN + r'''
const TT = ''' + TT15 + r''';
const P2 = @T(4.66), P3 = @T(11.76), P4 = @T(16.50), P5 = @T(22.52), P6 = @T(27.86);
// el plano congelado: el último instante de vd-rey (80,40 s)
const congelado = () => horno('congelado', () => ventanalFinal(80.40, TT));
const pausa = (t, a, b) => T.AT.pausa(R, tramo(t, a, a + 0.3) * (1 - tramo(t, b - 0.3, b)));
// la llave dorada (16 × 8) y el espejo de mano (10 × 16)
const llave = (g) => () => { R.disco(4, 4, 3.6, K); R.disco(4, 4, 2.6, H('#f0c040')); R.disco(4, 4, 1, K); R.rect(7, 3, 15, 5, K); R.rect(8, 4, 14, 4, H('#f0c040')); R.rect(11, 5, 12, 7, K); R.rect(14, 5, 15, 7, K); R.pset(11, 6, H('#e8b030')); R.pset(3, 2, H('#fff0a0')); if (g) R.pset(10, 3, H('#ffffff')); };
const espejito = (rojo) => () => { R.disco(5, 5, 5, K); R.disco(5, 5, 4, H('#e8c050')); R.disco(5, 5, 3, rojo ? H('#c83a3a') : H('#a8d0f0')); R.pset(4, 3, H('#ffffff')); R.rect(4, 10, 6, 15, K); R.rect(5, 10, 5, 14, H('#a87a28')); };

// ── 1 · la pausa: Atom y la llave ────────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  R.copiar(congelado()); pausa(t, 0, P2 - 0.05);
  const fijate = @T(0.30), clave = @T(1.80);
  const anda = tramo(t, 0, 1.0), x = lerp(350, 246, anda);
  T.AT.atom(R, x, 176, t, { s: 2, pose: anda < 1 ? 'camina' : t > clave - 0.3 ? 'sostiene' : t > fijate + 0.4 ? 'senala' : 'quieto', dir: -1, cara: t > clave ? 'guino' : 'normal', habla: voz(t) });
  if (t > fijate + 0.4 && t < clave) T.AT.anillo(R, 160, 146, 16, 20, t, tramo(t, fijate + 0.4, fijate + 1.0));
  const ul = tramo(t, clave - 0.2, clave + 0.2);
  if (ul > 0) { const y = 62 + Math.round((1 - ul) * 24) + Math.round(Math.sin(t * 2.4) * 1.5); T.AT.escalado(R, llave(Math.floor(t * 3) % 2), 16, 8, 196, y, 3); if (t > clave + 0.2) T.AT.anillo(R, 220, y + 12, 34, 20, t, tramo(t, clave + 0.2, clave + 0.7)); }
};

// ── 2 · la mesa del estudio: los cuadernos de historias ─────────────────────────────────────────────────────────
const CUAD = ['#c83a3a', '#3a6ac8', '#e8b040', '#4a9a5a', '#8a4ac8', '#e87a3a'];
const p2 = (t) => {
  const o = { encuadre: 'estudio', camara: 'mesa' }; const g = T.estudio(R, t, o);
  const anios = @T(6.36), dano = @T(10.60);
  const m = g.mesa ?? [60, 60, 260, 150], base = m[3] ?? 150;
  // la pila de cuadernos crece en «spent years studying the stories»
  const n = Math.min(6, Math.floor(cl((t - anios) / 2.3) * 6.99));
  for (let k = 0; k < n; k++) { const y = base - 4 - k * 6, x = 92 + (k % 2) * 2; R.rect(x - 1, y - 1, x + 41, y + 5, K); R.rect(x, y, x + 40, y + 4, H(CUAD[k])); R.rect(x + 36, y, x + 40, y + 4, H('#f0ecdc')); R.rect(x, y, x + 40, y, mez(H(CUAD[k]), H('#ffffff'), 0.35)); for (let i = x + 37; i < x + 40; i++) R.pset(i, y + 2, H('#c8c0a8')); }
  // en «real harm» Atom abre el de arriba: el dibujo de un jarrón roto
  const ab = tramo(t, dano - 0.2, dano + 0.3);
  if (ab > 0) { const x = 156, y = base - 30; R.rect(x - 1, y - 1, x + 60, y + 30, K); R.rect(x, y, x + 29, y + 29, H('#f8f4ec')); R.rect(x + 30, y, x + 59, y + 29, H('#f0ecdc')); R.rect(x + 29, y, x + 30, y + 29, H('#c8c0a8'));
    for (let j = y + 5; j < y + 27; j += 4) R.rect(x + 33, j, x + 55, j, H('#a8a8b8'));
    // el jarrón de barro partido en dos, con su flor caída y los trocitos
    const vx = x + 14, vy = y + 25, TC = H('#d8743a'), TS = H('#a84a22');
    for (let j = 0; j < 17; j++) { const w = Math.round(3 + Math.sin((j / 16) * Math.PI) * 4 - (j < 3 ? 0 : 0)), gap = j > 2 ? 2 : 0; for (let i = -w; i <= w; i++) { if (Math.abs(i) < gap) continue; const dx = i < 0 ? -1 : 1; R.pset(vx + i + dx, vy - j, i < -w + 2 || i > w - 2 ? K : i > 0 ? TS : TC); } }
    R.rect(vx - 4, vy - 19, vx + 4, vy - 17, K); R.rect(vx - 3, vy - 18, vx + 3, vy - 18, TC); R.linea(vx - 1, vy - 16, vx + 1, vy - 12, K); R.linea(vx + 1, vy - 12, vx - 1, vy - 6, K);
    for (const [dx, dy] of [[-11, 1], [10, 0], [12, 2]]) { R.rect(vx + dx, vy + dy - 1, vx + dx + 2, vy + dy, TS); R.pset(vx + dx, vy + dy - 1, K); }
    R.linea(vx + 6, vy - 20, vx + 12, vy - 24, H('#4a8a3a')); R.disco(vx + 13, vy - 25, 2, H('#e85a8a')); R.pset(vx + 13, vy - 25, H('#f0d060'));
    for (let i = -12; i <= 12; i++) R.pset(vx + i, vy + 2, H('#a8a8b8'));
  }
  // Atom, de pie en la mesa, cuenta los cuadernos y abre el de arriba
  T.AT.atom(R, 236, base, t, { s: 2, pose: t > dano - 0.3 ? 'senala' : t > anios ? 'brazos' : 'quieto', dir: -1, cara: t > dano ? 'triste' : t > anios ? 'sonrisa' : 'normal', habla: voz(t) });
  T.estudioDelante(R, t, o);
};

// ── 3 · el teatrillo de títeres: ¿quién es el malo? ─────────────────────────────────────────────────────────────
const fondoTeatro = () => horno('teatro', () => {
  // la pared de la sala, papel pintado de rayas granate y una guirnalda de bombillas
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 12) < 6 ? H('#5a2a34') : H('#4a2230'));
  for (let x = 0; x < 320; x++) R.pset(x, 140 + Math.round(Math.sin(x * 0.05) * 0), H('#3a1a20'));
  R.rect(0, 140, 319, 150, H('#3a1a20')); R.rect(0, 140, 319, 141, H('#6a3a30'));
  // cuadros con marco dorado (un barco y un faro, sin letras) y apliques con su luz
  for (const [x, y, k] of [[18, 56, 0], [254, 60, 1]]) { R.rect(x, y, x + 46, y + 34, K); R.rect(x + 1, y + 1, x + 45, y + 33, H('#c8982e')); R.rect(x + 4, y + 4, x + 42, y + 30, H('#7ab0d8')); R.rect(x + 4, y + 22, x + 42, y + 30, H('#2e5a9a'));
    if (k === 0) { R.poligono([[x + 12, y + 22], [x + 34, y + 22], [x + 30, y + 26], [x + 16, y + 26]], H('#6a3a20')); R.poligono([[x + 22, y + 8], [x + 22, y + 21], [x + 31, y + 21]], H('#f0ecdc')); }
    else { R.rect(x + 28, y + 8, x + 32, y + 22, H('#f0ecdc')); R.rect(x + 28, y + 12, x + 32, y + 13, H('#d83a3a')); R.rect(x + 28, y + 17, x + 32, y + 18, H('#d83a3a')); R.rect(x + 27, y + 6, x + 33, y + 8, H('#3a3a44')); R.poligono([[x + 4, y + 22], [x + 20, y + 16], [x + 36, y + 22]], H('#4a6a3a')); } }
  for (const x of [50, 272]) { R.rect(x - 1, 108, x + 1, 120, H('#c8982e')); R.poligono([[x - 6, 108], [x + 6, 108], [x + 3, 100], [x - 3, 100]], H('#f0d890')); luz(x, 104, 20, 18, H('#f8c060'), 0.3); }
  for (let x = 0; x < 320; x++) { R.pset(x, 128, H('#6a3a30')); R.pset(x, 129, H('#2a1218')); }
  // el teatrillo: marco tallado rojo y oro, el telón de fondo (un bosque pintado), el proscenio y el cuerpo con rombos
  R.rect(84, 26, 236, 152, K); R.rect(85, 27, 235, 151, H('#a8302a'));
  for (let x = 85; x < 236; x++) { R.pset(x, 28, H('#e8c050')); R.pset(x, 48, H('#e8c050')); } R.poligono([[120, 26], [160, 8], [200, 26]], K); R.poligono([[124, 25], [160, 10], [196, 25]], H('#c83a3a')); R.disco(160, 18, 4, H('#e8c050'));
  for (let y = 50; y < 112; y++) for (let x = 104; x < 216; x++) { let c = mez(H('#7ab0d8'), H('#c8e0f0'), (y - 50) / 40); if (y > 90) c = H('#6aa84a'); if (y > 72 && y <= 90 && ((x * 7) % 19 < 9) && y > 90 - (Math.sin(x * 0.5) + 1) * 9) c = H('#3a7a3a'); R.pset(x, y, c); }
  R.disco(196, 60, 5, H('#f8e080'));
  R.poligono([[128, 90], [136, 70], [144, 90]], H('#8a8a9a')); R.rect(132, 78, 140, 90, H('#a8a8b8')); R.rect(134, 72, 136, 76, H('#d83a3a'));
  // el telón recogido a los lados, con pliegues y borlas, y la bambalina
  for (const [x0, d] of [[86, 1], [216, -1]]) for (let y = 48; y < 116; y++) { const w = 18 - Math.round((y - 48) / 68 * 8); for (let i = 0; i < w; i++) { const x = d > 0 ? x0 + i : x0 + 18 - i; R.pset(x, y, i % 4 === 0 ? H('#6a1018') : i % 4 === 1 ? H('#c82a3a') : H('#a8202e')); } }
  for (const x of [98, 222]) { R.rect(x - 1, 96, x + 1, 104, H('#e8c050')); R.rect(x - 2, 104, x + 2, 108, H('#e8c050')); }
  for (let x = 86; x < 234; x++) for (let y = 48; y < 56; y++) R.pset(x, y, y === 55 && (x % 8) < 4 ? H('#e8c050') : (x % 10) < 5 ? H('#c82a3a') : H('#a8202e'));
  R.rect(98, 112, 222, 118, K); R.rect(99, 112, 221, 116, H('#8a5a32')); R.rect(99, 112, 221, 112, H('#c8945a'));
  for (let y = 119; y < 152; y++) for (let x = 86; x < 235; x++) { const a = (x + y * 2) % 16, b = (x - y * 2 + 1600) % 16; R.pset(x, y, a < 2 || b < 2 ? H('#e8c050') : (Math.floor((x + y * 2) / 16) + Math.floor((x - y * 2 + 1600) / 16)) % 2 ? H('#2e5a9a') : H('#c83a3a')); }
  // el suelo de tablas
  tablas(0, 150, 319, 179, [H('#8a5a34'), H('#6a4024'), H('#3a2010')], 6, 11);
});
const titere = (x, y, tipo, t, o = {}) => { x = Math.round(x); y = Math.round(y);
  const ropa = tipo === 'malo' ? [H('#3a2a4a'), H('#2a1a36')] : [H('#3a6ac8'), H('#2a4a98')];
  R.recorte([0, 0, 319, 112]);
  R.rect(x - 7, y - 14, x + 7, y + 20, K); R.rect(x - 6, y - 13, x + 6, y + 20, ropa[0]); R.rect(x + 3, y - 13, x + 6, y + 20, ropa[1]);
  if (tipo === 'bueno') { R.rect(x - 8, y - 12, x - 7, y + 14, H('#f0c040')); R.pset(x, y - 6, H('#f0c040')); R.pset(x - 1, y - 5, H('#f0c040')); R.pset(x + 1, y - 5, H('#f0c040')); }
  R.disco(x, y - 20, 7, K); R.disco(x, y - 20, 6, H('#f0c8a0')); R.pset(x - 2 * (o.dir ?? 1), y - 21, K); R.pset(x + 2 * (o.dir ?? 1), y - 21, K); R.pset(x - 3, y - 18, H('#e8a088')); R.pset(x + 3, y - 18, H('#e8a088'));
  if (tipo === 'malo') { R.rect(x - 7, y - 30, x + 7, y - 27, K); R.rect(x - 4, y - 36, x + 4, y - 27, K); R.rect(x - 3, y - 35, x + 3, y - 29, H('#2a2a3a')); R.rect(x - 3, y - 30, x + 3, y - 30, H('#c83a3a'));
    R.linea(x - 4, y - 16, x - 1, y - 17, K); R.linea(x + 1, y - 17, x + 4, y - 16, K); R.pset(x - 4, y - 15, K); R.pset(x + 4, y - 15, K); }
  else { R.rect(x - 6, y - 27, x + 6, y - 25, H('#e8b040')); R.pset(x - 1, y - 16, K); R.pset(x, y - 15, K); R.pset(x + 1, y - 16, K); }
  // el brazo que señala (un muñón de tela con la manita)
  if (o.senala) { const d = o.senala, bx = x + d * 7; R.rect(Math.min(bx, bx + d * 7), y - 6, Math.max(bx, bx + d * 7), y - 3, K); R.rect(Math.min(bx, bx + d * 6), y - 5, Math.max(bx, bx + d * 6), y - 4, ropa[0]); R.disco(bx + d * 8, y - 5, 2, H('#f0c8a0')); R.pset(bx + d * 11, y - 6, H('#f0c8a0')); R.pset(bx + d * 10, y - 6, H('#f0c8a0')); }
  R.recorte(null); };
const p3 = (t) => {
  R.copiar(fondoTeatro());
  const nadie = @T(12.98), malo = @T(14.60), cuento = @T(15.62);
  // la guirnalda de bombillas que titilan
  for (let k = 0; k < 22; k++) { const x = k * 15 + 4, y = 8 + Math.round(Math.abs(Math.sin(k * 0.6)) * 8); if (x > 270 && y < 46) continue; if (x > 18 && x < 172 && y < 22) continue; R.pset(x, y - 2, K); R.disco(x, y, 1.5, Math.sin(t * 3 + k) > 0 ? H('#f8e080') : H('#c8a040')); }
  // los títeres: el malo entra, se señala a sí mismo («?»), niega; en «bad guy» señala al héroe y el héroe lo señala a él
  const e = tramo(t, P3, P3 + 0.7), mx = lerp(96, 136, e), my = 104 + Math.round(Math.abs(Math.sin(t * 6)) * (e < 1 ? 2 : 0)), niega = t > nadie && t < malo - 0.2 ? Math.round(Math.sin(t * 14) * 2) : 0;
  const hx = 184, hy = 104 + Math.round(Math.sin(t * 2) * 1);
  titere(hx, hy, 'bueno', t, { dir: -1, senala: t > cuento - 0.4 ? -1 : 0 });
  titere(mx + niega, my, 'malo', t, { dir: t > malo - 0.2 ? 1 : -1, senala: t > malo - 0.2 ? 1 : 0 });
  if (t > nadie - 0.6 && t < malo - 0.2) R.bocadillo(Math.round(mx), 58, { icono: '?' });
  if (t > malo && t < malo + 1.2) R.bocadillo(Math.round(mx) + 4, 58, { icono: '!' });
  if (t > cuento && t < cuento + 1.2) R.bocadillo(hx - 4, 58, { icono: '!' });
  // el público: cabecitas a contraluz que se giran de uno a otro; Atom entre ellos, en la fila de delante
  for (let k = 0; k < 8; k++) { if (k === 5) continue; const x = 20 + k * 38, y = 172 + (k % 2) * 3, b = Math.round(Math.sin(t * 2 + k) * 0.6); R.disco(x, y - 8 + b, 7, H('#1a1014')); R.rect(x - 10, y - 2 + b, x + 10, y + 12, H('#1a1014')); if (k % 3 === 0) { R.disco(x - 5, y - 13 + b, 3, H('#1a1014')); R.disco(x + 5, y - 13 + b, 3, H('#1a1014')); } }
  T.AT.atom(R, 212, 178, t, { dir: -1, pose: t > malo ? 'brazos' : 'quieto', cara: t > malo ? 'sorpresa' : 'sonrisa', habla: voz(t) * 0.5 });
};

// ── 4 · la pizarra: cada uno con su razón ────────────────────────────────────────────────────────────────────────
const p4 = (t) => {
  const razon = @T(18.20), justifica = @T(20.24);
  const tiza = H('#e8ecf0'), tizaA = H('#f0d060'), tizaR = H('#f08a9a');
  const L2 = (a, b, c, d, col) => { R.linea(a, b, c, d, col); R.linea(a + 1, b, c + 1, d, col); };
  const o = { encuadre: 'estudio', pizarra: (R, t, r) => { const [x0, y0, x1, y1] = r, cx = x0 + 22, cy = y1 - 10;
    const f = tramo(t, P4 + 0.2, P4 + 1.4);
    // el monigote, grande, se dibuja de arriba abajo
    if (f > 0) { for (let a = 0; a < 44 * Math.min(1, f * 3); a++) { const p = a / 44 * 6.28; R.pset(Math.round(cx + Math.cos(p) * 7), Math.round(cy - 32 + Math.sin(p) * 7), tiza); R.pset(Math.round(cx + Math.cos(p) * 6), Math.round(cy - 32 + Math.sin(p) * 6), tiza); }
      if (f > 0.35) L2(cx, cy - 25, cx, cy - 25 + Math.round(16 * cl((f - 0.35) * 3)), tiza);
      if (f > 0.6) { L2(cx, cy - 20, cx - 9, cy - 13, tiza); L2(cx, cy - 20, cx + 9, cy - 13, tiza); }
      if (f > 0.8) { L2(cx, cy - 9, cx - 7, cy + 2, tiza); L2(cx, cy - 9, cx + 7, cy + 2, tiza); }
      if (f >= 1) { R.pset(cx - 2, cy - 33, tiza); R.pset(cx + 2, cy - 33, tiza); R.linea(cx - 2, cy - 29, cx + 2, cy - 29, tiza); } }
    // su bocadillo con su razón: un corazón grande
    const b = tramo(t, razon - 0.3, razon + 0.4), bx = cx + 30, by = y0 + 18;
    if (b > 0) { for (let a = 0; a < 70 * b; a++) { const p = a / 70 * 6.28; R.pset(Math.round(bx + Math.cos(p) * 19), Math.round(by + Math.sin(p) * 12), tiza); R.pset(Math.round(bx + Math.cos(p) * 18), Math.round(by + Math.sin(p) * 11), tiza); }
      R.disco(cx + 10, cy - 42, 1.5, tiza); R.disco(cx + 15, by + 15, 2, tiza);
      if (b >= 1) for (const [i, j] of [[-4, -3], [-3, -4], [-2, -4], [-1, -3], [0, -2], [1, -3], [2, -4], [3, -4], [4, -3], [4, -2], [3, 0], [2, 1], [1, 2], [0, 3], [-1, 2], [-2, 1], [-3, 0], [-4, -2]]) R.disco(bx + i * 1.6, by + j * 1.6, 1, tizaR); }
    // en «justifies it» la marca enorme de visto bueno, amarilla
    const v = tramo(t, justifica - 0.3, justifica + 0.4);
    if (v > 0) { const sx = x0 + 56, sy = y1 - 30, n = Math.round(44 * v); for (let i = 0; i < n; i++) { const [X, Y] = i < 12 ? [sx + i, sy + i] : [sx + 12 + (i - 12) * 0.8, sy + 12 - (i - 12) * 1.3]; R.disco(Math.round(X), Math.round(Y), 2, tizaA); } } } };
  T.estudio(R, t, o);
  // Atom, al doble, junto a la pizarra: señala el monigote, el corazón y la marca
  T.AT.atom(R, 240, 170, t, { s: 2, dir: -1, pose: t > justifica ? 'brazos' : t > razon ? 'senala' : t > P4 + 0.4 ? 'sostiene' : 'quieto', cara: t > justifica ? 'guino' : 'normal', habla: voz(t) });
  T.estudioDelante(R, t, o);
};

// ── 5 · el espejo de cerca: Doom con capa de héroe ───────────────────────────────────────────────────────────────
const p5 = (t) => {
  R.copiar(congelado()); T.AT.pausa(R, 1, false);
  // el mundo congelado se oscurece alrededor del espejo
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 170, (y - 92) / 110); if (d > 0.55 && (d - 0.55) * 1.6 > bay(x, y)) R.pset(x, y, mez(R.pget(x, y), H('#0e1018'), 0.45)); }
  const villano = @T(24.14), solo = @T(26.54);
  const CX = 160, CY = 88, RX = 46, RY = 64, rev = tramo(t, P5 + 0.1, P5 + 0.9);
  // dentro del espejo: el cielo a color con el sol que se abre y sus rayos, una colina y la gente que aclama
  const sol = 0.6 + 0.4 * tramo(t, solo - 0.2, solo + 0.6);
  for (let y = CY - RY; y <= CY + RY; y++) for (let x = CX - RX; x <= CX + RX; x++) { const e = ((x - CX) / RX) ** 2 + ((y - CY) / RY) ** 2; if (e > 1) continue; if ((y - (CY - RY)) / (2 * RY) > rev) continue;
    const a = Math.atan2(y - 70, x - CX), rayo = Math.sin(a * 10 + t * 0.8) > 0.4; let c = mez(H('#4a8ad8'), H('#f8e0a0'), cl(1 - Math.hypot(x - CX, y - 70) / 70)); if (rayo && Math.hypot(x - CX, y - 70) < 70 * sol) c = mez(c, H('#fff4c0'), 0.35);
    if (y > CY + 30 - Math.sin(x * 0.08) * 3) c = (x + y) % 7 === 0 ? H('#4a9a4a') : H('#5ab05a'); R.pset(x, y, c); }
  if (rev >= 1) { luz(CX, 70, 24 * sol, 24 * sol, H('#fff8d0'), 0.6); for (let k = 0; k < 9; k++) { const x = CX - 36 + k * 9, y = CY + 44 + (k % 2) * 3, b = t > solo ? Math.round(Math.abs(Math.sin(t * 8 + k)) * 2) : 0; R.disco(x, y - b, 3, H('#3a2a4a')); R.rect(x - 3, y + 2 - b, x + 3, y + 10, H('#3a2a4a')); if (t > solo) { R.linea(x - 3, y - b, x - 5, y - 6 - b, H('#3a2a4a')); R.linea(x + 3, y - b, x + 5, y - 6 - b, H('#3a2a4a')); } }
    // Doom con capa roja de héroe, a escala doble; destella en «villain»; en «only one» alza los brazos
    T.AT.escalado(R, () => R.actor(EL.doom, 8, 30, t, { dir: 1, brazos: t > solo, pal: { Q: H('#d83a3a'), q: H('#9a2028') } }), 32, 32, CX - 30, CY - 34, 2);
    if (t > villano && t < villano + 0.6) { const v = (t - villano) / 0.6; for (const [dx, dy] of [[-22, -30], [24, -20], [-18, 10]]) { const s = Math.round(3 * Math.sin(v * Math.PI)); R.linea(CX + dx - s, CY + dy, CX + dx + s, CY + dy, H('#ffffff')); R.linea(CX + dx, CY + dy - s, CX + dx, CY + dy + s, H('#ffffff')); } } }
  // el brillo del cristal y el marco dorado tallado
  for (let k = 0; k < 6; k++) ps(CX - 30 + k * 2, CY - 40 + k * 3, H('#ffffff'));
  for (let a = 0; a < 420; a++) { const p = a / 420 * 6.283; for (let w = 0; w < 6; w++) { const x = Math.round(CX + Math.cos(p) * (RX + 1 + w)), y = Math.round(CY + Math.sin(p) * (RY + 1 + w)); R.pset(x, y, w === 0 || w === 5 ? K : w === 1 ? H('#fff0a0') : (a + w) % 9 === 0 ? H('#a87a28') : Math.cos(p - 2.4) > 0.3 ? H('#f0c850') : H('#c8982e')); } }
  for (const [dx, dy] of [[0, -RY - 9], [0, RY + 9], [-RX - 9, 0], [RX + 9, 0]]) { R.disco(CX + dx, CY + dy, 5, K); R.disco(CX + dx, CY + dy, 4, H('#f0c850')); R.disco(CX + dx, CY + dy, 2, H('#2e7a3e')); }
  R.rect(CX - 3, CY + RY + 12, CX + 3, 176, K); R.rect(CX - 2, CY + RY + 12, CX + 2, 176, H('#c8982e')); R.rect(CX - 20, 174, CX + 20, 179, K); R.rect(CX - 19, 175, CX + 19, 178, H('#c8982e'));
  // Atom, a color al doble, junto al espejo: lo señala y mira
  T.AT.atom(R, 262, 176, t, { s: 2, dir: -1, pose: t > solo ? 'brazos' : 'senala', cara: t > solo ? 'sorpresa' : 'normal', habla: voz(t) });
};

// ── 6 · la pausa otra vez: el espejo pequeño ante Doom ───────────────────────────────────────────────────────────
const p6 = (t) => {
  R.copiar(congelado()); pausa(t, P6, E.duracion);
  const peligro = @T(31.62), hacer = @T(28.10);
  const a = T.AT.atom(R, 222, 176, t, { s: 2, pose: t > peligro ? 'brazos' : t > hacer ? 'sostiene' : 'senala', dir: -1, cara: t > peligro ? 'sorpresa' : 'normal', habla: voz(t) });
  if (t > hacer && t < peligro) { const [mx, my] = a.mano; T.AT.escalado(R, espejito(Math.floor(t * 2) % 2), 11, 16, mx - 12, my - 40, 3); }
  if (t <= hacer) T.AT.anillo(R, 160, 146, 16, 20, t, tramo(t, P6, P6 + 0.6));
  if (t > peligro && t < peligro + 1.4) R.bocadillo(222, 112, { icono: '!' });
};

const efectos = [[0.05, 'tapestop'], [@T(1.80), 'pop'], [@T(6.50), 'pop'], [@T(7.60), 'pop'], [@T(8.60), 'pop'], [@T(10.60), 'papel'],
  [@T(11.90), 'pasos'], [@T(14.60), 'boing'], [@T(15.62), 'boing'], [@T(17.00), 'lapiz'], [@T(18.20), 'lapiz'], [@T(20.24), 'lapiz'],
  [@T(22.70), 'brillo'], [@T(26.54), 'publico'], [@T(28.10), 'pop'], [@T(31.62), 'golpecito'], [E.duracion - 0.3, 'interruptor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: null });
'''))
