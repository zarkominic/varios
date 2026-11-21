# Borrador de escenas del ep45, grupo S10: vd-nina y vd-redencion (formato del 11: E[id] = (título, cabecera, cuerpo)).
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


# lo común a las dos escenas: utilidades, la alcoba de la niña y el último plano de vd-nina, que vd-redencion congela
COMUN = r'''
const VD = T.VD, K = hex('#160f1c'), H = (s) => hex(s), ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const hh = (x, y, k = 0) => { const v = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return v - Math.floor(v); };
const rgb = (c) => [c & 255, (c >> 8) & 255, (c >> 16) & 255];
const mez = (a, b, u) => { u = cl(u); const A = rgb(a), B = rgb(b); return (0xff000000 | (Math.round(A[2] + (B[2] - A[2]) * u) << 16) | (Math.round(A[1] + (B[1] - A[1]) * u) << 8) | Math.round(A[0] + (B[0] - A[0]) * u)) >>> 0; };
const lum = (c) => 0.3 * (c & 255) + 0.59 * ((c >> 8) & 255) + 0.11 * ((c >> 16) & 255);
const voz = (t) => E.energia(t);
const CACHE = new Map(), MK = 0xff00ff01 >>> 0;
const horno = (k, f) => { if (!CACHE.has(k)) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); CACHE.set(k, b); } return CACHE.get(k); };
// una capa con huecos (lo que no se pinta queda transparente) y su pegado
const hornoM = (k, f) => { if (!CACHE.has(k)) { const b = R.nuevo(); b.fill(MK); const prev = R.usar(b); f(); R.usar(prev); CACHE.set(k, b); } return CACHE.get(k); };
const capa = (b) => { const B = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c !== MK) B[i] = c; } };
const ps = (x, y, c) => R.pset(Math.round(x), Math.round(y), c);
const TMP = R.nuevo();
const aparte = (f) => { TMP.fill(MK); const prev = R.usar(TMP); const r = f(); R.usar(prev); return r; };
// degradado vertical con trama de Bayer
const rampa = (x0, y0, x1, y1, cs) => { const n = cs.length - 1; for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), u = f - i; for (let x = x0; x <= x1; x++) R.pset(x, y, u > bay(x, y) ? cs[i + 1] : cs[i]); } };
// una luz (o sombra) que se funde con lo que hay debajo
const luz = (cx, cy, rx, ry, col, a) => { const B = R.buf; for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, Math.ceil(cy + ry)); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, Math.ceil(cx + rx)); x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d < 1) { const i = y * 320 + x; B[i] = mez(B[i], col, (1 - d) * (1 - d) * a + (bay(x, y) - 0.5) * 0.05); } } };
// un cono de luz que baja desde (cx, y0) y se abre hasta w en y1
const cono = (cx, y0, y1, w0, w1, col, a) => { const B = R.buf; for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const u = (y - y0) / Math.max(1, y1 - y0), w = w0 + (w1 - w0) * u; for (let x = Math.max(0, Math.round(cx - w)); x <= Math.min(319, Math.round(cx + w)); x++) { const d = Math.abs(x - cx) / w, g = (1 - d * d) * a * (1 - u * 0.5); if (g > 0) { const i = y * 320 + x; B[i] = mez(B[i], col, g + (bay(x, y) - 0.5) * 0.05); } } } };
// tablas de madera con vetas, juntas y nudos (horizontales, de alto h)
const tablas = (x0, y0, x1, y1, [cL, c, cS], h = 9, k = 0) => { for (let y = y0; y <= y1; y++) { const j = Math.floor((y - y0) / h), jy = (y - y0) % h;
  for (let x = x0; x <= x1; x++) { let col = c; const g = Math.sin(x * 0.06 + j * 3.1 + Math.sin(x * 0.011 + j * 1.7) * 4 + jy * 0.8);
    if (jy === 0) col = cS; else if (jy === 1) col = mez(c, cL, 0.35); else if (g > 0.84) col = mez(c, cS, 0.42); else if (g < -0.88) col = mez(c, cL, 0.3);
    if ((x + j * 61) % 113 === 0) col = cS; if (hh(x >> 1, y, k) > 0.985) col = mez(col, cS, 0.6); R.pset(x, y, col); } } };
// sillares o ladrillos (juntas, tono de cada pieza y poros)
const bloques = (x0, y0, x1, y1, [cL, c, cS], k = 0, w = 16, h = 8) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / h), off = fila % 2 ? w / 2 : 0, jy = (y - y0) % h;
  for (let x = x0; x <= x1; x++) { const bx = Math.floor((x - x0 + off) / w), jx = (x - x0 + off) % w; let col;
    if (jy === h - 1 || jx === w - 1) col = cS; else if (jy === 0 || jx === 0) col = mez(c, cL, 0.5); else { col = c; const q = hh(bx, fila, k); if (q > 0.72) col = mez(c, cS, 0.22); else if (q < 0.18) col = mez(c, cL, 0.2); if (hh(x, y, k + 3) > 0.94) col = mez(col, cS, 0.4); }
    R.pset(x, y, col); } } };
// papel pintado: rayas suaves y un motivo pequeño (rombo) de poco contraste
const papel = (x0, y0, x1, y1, c, c2, c3, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const r = x % 14; let col = r < 2 ? c2 : c;
  const mx = (x + (Math.floor(y / 14) % 2) * 7) % 14 - 7, my = y % 14 - 7; if (Math.abs(mx) + Math.abs(my) === 2) col = c3; if (hh(x >> 2, y >> 2, k) > 0.96 && bay(x, y) < 0.3) col = mez(col, c2, 0.5); R.pset(x, y, col); } };
const filo = (pts, col) => { for (let i = 0; i < pts.length - 1; i++) R.linea(Math.round(pts[i][0]), Math.round(pts[i][1]), Math.round(pts[i + 1][0]), Math.round(pts[i + 1][1]), col); };
// nube de tres tonos (con recorte opcional [x0, y0, x1, y1])
const nube = (x, y, w, tono, clip) => { x = Math.round(x); y = Math.round(y); const n = Math.max(3, Math.round(w / 9));
  const d = (cx, cy, r, c) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r + r) { const X = cx + i, Y = cy + j; if (X >= 0 && X < 320 && Y >= 0 && Y < 180 && (!clip || (X >= clip[0] && X <= clip[2] && Y >= clip[1] && Y <= clip[3]))) R.pset(X, Y, c); } };
  for (let k = 0; k < n; k++) d(x + Math.round((k + 0.5) * w / n), y + 2, Math.round(w / n * (0.62 + 0.3 * Math.sin(k * 2.3 + w))), tono[2]);
  for (let k = 0; k < n; k++) d(x + Math.round((k + 0.5) * w / n) - 1, y, Math.round(w / n * (0.55 + 0.3 * Math.sin(k * 2.3 + w))), tono[1]);
  for (let k = 1; k < n - 1; k++) d(x + Math.round((k + 0.3) * w / n) - 1, y - 2, Math.max(1, Math.round(w / n * (0.42 + 0.3 * Math.sin(k * 1.7 + w)))), tono[0]); };
const pajaro = (x, y, t, col, k = 0) => { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 11 + k) > 0 ? 1 : 0;
  ps(x, y, col); ps(x - 1, y - a, col); ps(x - 2, y - 2 * a, col); ps(x + 1, y - a, col); ps(x + 2, y - 2 * a, col); };
// estrellas que titilan dentro de [x0, y0, x1, y1] (fuera de la barra del año y de la esquina de Atom)
const estrellas = (n, x0, y0, x1, y1, t, sem, cols = [H('#ffffff'), H('#c8d4ff'), H('#ffe8b0')]) => { for (let k = 0; k < n; k++) { const x = Math.round(x0 + hh(k, 1, sem) * (x1 - x0)), y = Math.round(y0 + hh(k, 2, sem) * (y1 - y0));
  if ((x >= 18 && x <= 172 && y <= 21) || (x >= 276 && y <= 46)) continue; const b = Math.sin(t * (1.5 + hh(k, 3, sem) * 3) + k) ; if (b < -0.6) continue; ps(x, y, cols[k % cols.length]); if (b > 0.9 && k % 4 === 0) { ps(x - 1, y, mez(cols[0], K, 0.5)); ps(x + 1, y, mez(cols[0], K, 0.5)); } } };
// un corazón pequeño (r: 3–6)
const corazon = (cx, cy, r, col) => { R.disco(cx - r * 0.5, cy - r * 0.25, r * 0.62 + 0.8, K); R.disco(cx + r * 0.5, cy - r * 0.25, r * 0.62 + 0.8, K); R.poligono([[cx - r * 1.18, cy - 0.2], [cx + r * 1.18, cy - 0.2], [cx, cy + r * 1.25]], K);
  R.disco(cx - r * 0.5, cy - r * 0.25, r * 0.62, col); R.disco(cx + r * 0.5, cy - r * 0.25, r * 0.62, col); R.poligono([[cx - r * 1.05, cy - 0.2 + 0.4], [cx + r * 1.05, cy - 0.2 + 0.4], [cx, cy + r * 1.05]], col); ps(cx - r * 0.6, cy - r * 0.5, H('#ffffff')); };
// un personaje que se arrodilla: se pinta aparte y se pega con las piernas dobladas (la espinilla en el suelo hacia
// atrás). o.u 0–1: se deshace en polvo de luz (cada píxel se apaga a su turno y se aclara hacia el oro)
const arrodillado = (def, x, S, t, o = {}) => { const dir = o.dir ?? 1, back = -dir, B = R.buf, u = o.u ?? 0, oro = H('#ffe8a0');
  aparte(() => R.actor(def, x, S, t, { dir, ...(o.act || {}) }));
  const put = (X, Y, c) => { if (X < 0 || X > 319 || Y < 0 || Y > 179) return; if (u > 0) { const q = hh(X, Y, 9) * 0.85 + (S - Y) / 60 * 0.15; if (q < u * 1.15 - 0.1) return; c = mez(c, oro, u * 0.9); } B[Y * 320 + X] = c; };
  for (let y = Math.max(0, S - 50); y <= S; y++) for (let X = x - 14; X <= x + 29; X++) { if (X < 0 || X > 319) continue; const c = TMP[y * 320 + X]; if (c === MK) continue;
    if (y <= S - 6) put(X, y + 5, c); else if (y === S - 4) put(X, S, c); else if (y === S) { put(X + back * 4, S, c); put(X + back * 6, S, c); } }
  for (let X = x - 2; X <= x + 17; X++) if (u < 0.7) { const i = (S + 1) * 320 + X; if (S + 1 < 180 && X >= 0 && X < 320) B[i] = mez(B[i], K, 0.3 * (1 - u)); } };
// la niña dormida en su cama: x es el borde izquierdo de la almohada, y la cara de arriba del colchón; abre 0–1
const nenaCama = (x, y, t, abre = 0, manta = '#3a5ac8') => {
  const resp = Math.sin(t * 1.7) > 0.2 ? 1 : 0, M = H(manta), ML = mez(M, H('#ffffff'), 0.3), MS = mez(M, K, 0.35);
  R.rect(x - 1, y - 7, x + 14, y, K); R.rect(x, y - 6, x + 13, y - 1, H('#f4f0e8')); R.rect(x, y - 2, x + 13, y - 1, H('#d8d0c4')); R.pset(x + 2, y - 5, H('#ffffff'));
  const hx = x + 7, hy = y - 7 - Math.round(abre * 3);
  R.disco(hx, hy, 5.4, K); R.disco(hx, hy, 4.6, H('#f6c8a0'));
  for (let j = -5; j <= 5; j++) for (let i = -6; i <= 6; i++) if (i * i + j * j <= 26 && (j < -1 || i < -2)) ps(hx + i, hy + j, (i * 3 + j) % 4 === 0 ? H('#f8e8b0') : (i + j) % 5 === 0 ? H('#d8b050') : H('#f0d070'));
  R.rect(hx - 7, hy - 1, hx - 5, hy + 5, H('#e8c060')); R.rect(hx - 8, hy + 1, hx - 7, hy + 4, H('#d8b050')); ps(hx - 6, hy + 6, H('#f0d070'));
  if (abre < 0.5) { ps(hx + 1, hy + 1, K); ps(hx + 2, hy + 1, K); ps(hx + 4, hy + 1, K); ps(hx + 5, hy + 1, K); } else { ps(hx + 1, hy, K); ps(hx + 1, hy + 1, K); ps(hx + 4, hy, K); ps(hx + 4, hy + 1, K); ps(hx + 2, hy, H('#ffffff')); }
  ps(hx + 3, hy + 3, H('#f09a88')); ps(hx + 5, hy + 3, H('#f09a88')); if (abre > 0.5) ps(hx + 3, hy + 4, H('#a84a3a'));
  const my = y - 9 - resp; R.rect(x + 11, my, x + 44, y + 3, K); R.rect(x + 12, my + 1, x + 43, y + 2, M);
  R.rect(x + 12, my + 1, x + 43, my + 2, ML); R.rect(x + 12, my + 1, x + 15, y + 2, H('#f2eee2')); R.rect(x + 13, my + 1, x + 13, y + 2, H('#d8d0c4'));
  for (const fx of [22, 31, 38]) R.linea(x + fx, my + 3, x + fx + 2, y + 1, MS);
  for (const [i, j] of [[19, 4], [27, 6], [35, 4], [41, 7]]) { ps(x + i, my + j, H('#f0d070')); }
  R.rect(x + 12, y + 1, x + 43, y + 2, MS);
};

// ── LA ALCOBA DE LA NIÑA (vd-nina 6 de noche y 11 al alba; vd-redencion la congela) ─────────────────────────────────
// pared de papel lila, friso blanco, suelo de tablas con alfombra; la puerta (x 40–70), la estantería de juguetes (x 4–
// 34), la cama (x 104–176, colchón y 132) con su cabecero, la mesilla con la lámpara (x 182–200), la ventana con la
// ciudad (x 208–260, y 34–98), el reloj, el dibujo del sol, el caballito de balancín (x 270–306)
const VENT = [212, 38, 256, 94];
const alcoba = (alba) => horno('alcoba' + alba, () => {
  const W0 = alba ? H('#b89ab8') : H('#6a5a8a'), W1 = mez(W0, K, 0.12), W2 = mez(W0, H('#ffffff'), 0.1);
  papel(0, 0, 319, 104, W0, W1, W2, 3);
  for (let x = 0; x < 320; x++) for (let y = 0; y < 8; y++) R.pset(x, y, mez(R.pget(x, y), K, (8 - y) * 0.04));
  // el friso de madera pintada
  R.rect(0, 103, 319, 104, mez(W0, K, 0.4)); for (let y = 105; y <= 125; y++) for (let x = 0; x < 320; x++) { const r = x % 22; R.pset(x, y, y === 105 ? H('#f8f4ec') : r === 0 ? H('#b8b0a8') : r === 1 || r === 20 ? H('#ece6de') : y === 124 || y === 125 ? H('#b8b0a8') : H('#ddd6cc')); }
  if (!alba) for (let y = 105; y <= 125; y++) for (let x = 0; x < 320; x++) R.pset(x, y, mez(R.pget(x, y), H('#3a3060'), 0.35));
  // el suelo de tablas y la alfombra redonda
  tablas(0, 126, 319, 179, alba ? [H('#d8a878'), H('#b88458'), H('#7a5236')] : [H('#9a7458'), H('#7a5640'), H('#4a3226')], 7, 5);
  for (let y = 150; y < 180; y++) for (let x = 60; x < 260; x++) { const d = Math.hypot((x - 160) / 100, (y - 168) / 16); if (d >= 1) continue; const anillo = Math.floor(d * 6);
    const c = [H('#e8a8b8'), H('#f4d8a0'), H('#a8c8e8'), H('#e8a8b8'), H('#c8e0b0'), H('#d88898')][anillo]; R.pset(x, y, d > 0.95 ? mez(c, K, 0.4) : (x + y) % 3 === 0 ? mez(c, K, 0.12) : c); }
  // la ventana: la ciudad de noche o al alba
  const [vx0, vy0, vx1, vy1] = VENT;
  R.rect(vx0 - 4, vy0 - 4, vx1 + 4, vy1 + 6, K); R.rect(vx0 - 3, vy0 - 3, vx1 + 3, vy1 + 5, H('#f4f0ea')); R.rect(vx0 - 3, vy1 + 3, vx1 + 3, vy1 + 5, H('#c8c0b8'));
  rampa(vx0, vy0, vx1, vy1, alba ? [H('#5a6aa8'), H('#c88aa8'), H('#f8b888'), H('#ffe0a0')] : [H('#0e1030'), H('#1e2450'), H('#3a3466')]);
  if (!alba) { R.disco(246, 48, 5, H('#f8f0d0')); R.disco(248, 47, 4.4, H('#2a2e58')); }
  for (let x = vx0; x <= vx1; x++) { const h = vy1 - 8 - Math.round(16 * hh(Math.floor(x / 6), 1, 7)) - (Math.floor(x / 6) % 3 === 0 ? 10 : 0);
    for (let y = h; y <= vy1; y++) R.pset(x, y, alba ? mez(H('#5a4a78'), H('#8a6a8a'), (y - h) / 30) : (x % 6 === 0 ? H('#141428') : H('#1c1c38'))); }
  for (let x = vx0 + 1; x < vx1; x += 2) for (let y = vy1 - 30; y < vy1; y += 3) { const h = vy1 - 8 - Math.round(16 * hh(Math.floor(x / 6), 1, 7)) - (Math.floor(x / 6) % 3 === 0 ? 10 : 0); if (y > h + 1 && hh(x, y, 4) > 0.6) R.pset(x, y, alba ? H('#c8a088') : H('#f8d878')); }
  R.rect(233, vy0, 234, vy1, H('#f4f0ea')); R.rect(vx0, 65, vx1, 66, H('#f4f0ea')); R.rect(vx0, vy0, vx1, vy0, H('#c8c0b8'));
  // el alféizar con una planta y un peluche
  R.rect(vx0 - 6, vy1 + 6, vx1 + 6, vy1 + 9, K); R.rect(vx0 - 5, vy1 + 6, vx1 + 5, vy1 + 8, H('#ece6de'));
  R.rect(218, vy1 - 2, 226, vy1 + 5, K); R.rect(219, vy1 - 1, 225, vy1 + 5, H('#c86a4a')); for (const [i, j] of [[-3, -5], [0, -8], [3, -6], [-1, -3], [2, -2]]) R.disco(222 + i, vy1 - 2 + j, 2, H('#4a9a5a'));
  // la barra de las cortinas
  R.rect(vx0 - 14, vy0 - 10, vx1 + 14, vy0 - 8, H('#a88050')); R.disco(vx0 - 15, vy0 - 9, 2, H('#d8b060')); R.disco(vx1 + 15, vy0 - 9, 2, H('#d8b060'));
  // la puerta del cuarto (cerrada; la abierta se pinta en vivo)
  R.rect(38, 60, 72, 126, K); R.rect(39, 61, 71, 125, H('#f4f0ea')); R.rect(42, 64, 68, 125, H('#e8e0d4'));
  for (const [a, b] of [[67, 90], [94, 121]]) { R.rect(45, a, 65, b, H('#d8d0c4')); R.rect(46, a + 1, 64, b - 1, H('#ece6dc')); }
  R.disco(64, 96, 1.6, H('#d8b060'));
  // la estantería con libros y juguetes
  R.rect(2, 46, 36, 126, K); R.rect(3, 47, 35, 125, H('#c89a6a')); for (const y of [66, 86, 106]) R.rect(3, y, 35, y + 2, H('#8a6440'));
  const LB = ['#c84a4a', '#3a6ab8', '#e8b840', '#4a9a5a', '#8a5ab0', '#e87a3a'].map(H);
  for (const [y0, y1] of [[48, 65], [68, 85], [88, 105]]) { let x = 5; let k = y0; while (x < 33) { const w = 2 + Math.floor(hh(x, k, 2) * 3), h = 10 + Math.floor(hh(x, k, 3) * 6); if (x + w > 33) break;
    R.rect(x, y1 - h, x + w - 1, y1, LB[Math.floor(hh(x, k) * 6)]); R.rect(x, y1 - h, x, y1, mez(LB[Math.floor(hh(x, k) * 6)], H('#ffffff'), 0.3)); x += w + (hh(x, k, 8) > 0.8 ? 3 : 0); } }
  // el osito en la balda de abajo y la pelota
  R.disco(14, 117, 5, K); R.disco(14, 117, 4, H('#b87a4a')); R.disco(14, 110, 4, K); R.disco(14, 110, 3.2, H('#c88a5a')); R.disco(11, 107, 1.6, H('#b87a4a')); R.disco(17, 107, 1.6, H('#b87a4a')); ps(13, 110, K); ps(15, 110, K); ps(14, 112, H('#5a3a2a'));
  R.disco(28, 120, 4, K); R.disco(28, 120, 3.2, H('#e85a5a')); R.rect(25, 119, 31, 119, H('#f8f0e0')); ps(27, 118, H('#ffffff'));
  // la guirnalda de banderitas de papel que cuelga sobre la cama
  for (let x = 86; x <= 196; x++) { const y = Math.round(26 + 8 * Math.sin((x - 86) / 110 * Math.PI)); R.pset(x, y, H('#f4f0ea')); if ((x - 86) % 10 === 0 && x < 194) { const c = [H('#f8a0b0'), H('#a8d0f0'), H('#f8e098'), H('#b8e8b0')][((x - 86) / 10) % 4]; R.poligono([[x, y + 1], [x + 7, y + 1], [x + 3.5, y + 8]], c); } }
  R.disco(86, 26, 1.5, H('#d8b060')); R.disco(196, 26, 1.5, H('#d8b060'));
  // el dibujo del sol pegado con cinta y el reloj de pared
  R.rect(118, 52, 142, 72, K); R.rect(119, 53, 141, 71, H('#f8f6f0')); R.disco(127, 59, 3, H('#f0c040')); for (let a = 0; a < 8; a++) ps(127 + Math.cos(a * 0.785) * 5, 59 + Math.sin(a * 0.785) * 5, H('#f0c040'));
  R.rect(129, 64, 138, 70, H('#d86a4a')); R.poligono([[128, 64], [133, 59], [139, 64]], H('#8a4a8a')); R.rect(132, 66, 134, 70, H('#6a3a2a')); R.rect(119, 69, 141, 71, H('#7ac06a'));
  R.rect(126, 50, 134, 52, H('#e8e0b0'));
  R.disco(160, 40, 9, K); R.disco(160, 40, 8, H('#f0c8d8')); R.disco(160, 40, 6.4, H('#fcfaf4')); for (let a = 0; a < 12; a++) ps(160 + Math.cos(a * 0.5236) * 5.4, 40 + Math.sin(a * 0.5236) * 5.4, H('#8a7a8a'));
  // la cama: cabecero de madera redondeado, el pie y las patas
  R.rect(102, 104, 112, 152, K); R.rect(103, 105, 111, 151, H('#e8d8c0')); R.disco(107, 105, 5, K); R.disco(107, 105, 4, H('#e8d8c0')); R.rect(103, 105, 104, 151, H('#fcf4e8')); for (const y of [112, 118, 124]) R.rect(105, y, 109, y, H('#c8b8a0'));
  R.rect(170, 118, 178, 152, K); R.rect(171, 119, 177, 151, H('#e8d8c0')); R.disco(174, 119, 4, K); R.disco(174, 119, 3, H('#e8d8c0')); R.rect(171, 119, 172, 151, H('#fcf4e8'));
  R.rect(112, 132, 170, 144, K); R.rect(112, 133, 170, 139, H('#f4f0e8')); R.rect(112, 140, 170, 143, H('#d8c8b0')); R.rect(112, 144, 170, 147, H('#b89a78')); R.rect(112, 147, 170, 147, K);
  R.rect(113, 148, 116, 152, K); R.rect(166, 148, 169, 152, K);
  // la mesilla con la lámpara y un vaso de agua
  R.rect(182, 118, 202, 152, K); R.rect(183, 119, 201, 151, H('#e8c8a8')); R.rect(183, 119, 201, 121, H('#f8e8d0')); R.rect(185, 125, 199, 136, H('#d8b090')); R.disco(192, 130, 1.2, H('#a87a40')); R.rect(185, 140, 199, 150, H('#d8b090'));
  R.rect(189, 110, 195, 118, K); R.rect(190, 111, 194, 117, H('#f0e0c0')); R.rect(191, 98, 193, 110, H('#c8a060'));
  R.rect(197, 110, 200, 117, K); R.rect(198, 111, 199, 116, H('#c8e0f0'));
  // el caballito de balancín se pinta en vivo; la caja de juguetes
  R.rect(232, 132, 262, 152, K); R.rect(233, 133, 261, 151, H('#4a8ac8')); R.rect(233, 133, 261, 135, H('#7ab0e0')); for (const [i, c] of [[238, '#f0c040'], [248, '#e85a5a'], [256, '#5ab86a']]) { R.rect(i, 140, i + 3, 146, H(c)); }
  R.rect(236, 128, 240, 132, H('#e85a5a')); R.rect(243, 126, 249, 132, H('#f0c040')); R.numero('4', 246, 132, { color: H('#3a5ac8'), sombra: false });
  // la sombra bajo la cama y la mesilla
  for (let x = 100; x < 204; x++) for (let y = 152; y < 156; y++) R.pset(x, y, mez(R.pget(x, y), K, 0.35 - (y - 152) * 0.08));
});
// las cortinas, que ondean (en vivo)
const cortinas = (t, alba) => { const C0 = alba ? H('#f0a8b8') : H('#b87a98'), C1 = mez(C0, K, 0.25), C2 = mez(C0, H('#ffffff'), 0.25);
  for (const [xa, dir] of [[VENT[0] - 12, 1], [VENT[2] + 3, -1]]) for (let y = VENT[1] - 8; y <= VENT[3] + 12; y++) { const u = (y - VENT[1] + 8) / 70, sw = Math.round(Math.sin(t * 1.3 + y * 0.08) * 2 * u);
    const w = 10 + Math.round(u * 3); for (let i = 0; i < w; i++) { const x = xa + (dir > 0 ? i : 9 - i) + sw - (dir > 0 ? 0 : Math.round(u * 3)); const f = (i + Math.round(y * 0.05)) % 4; R.pset(x, y, i === 0 || i === w - 1 ? K : f === 0 ? C1 : f === 2 ? C2 : C0); } } };
// la puerta abierta (u 0–1): la hoja gira hacia dentro y se ve el pasillo con luz cálida
const puertaAbierta = (u, alba) => { if (u <= 0) return; R.rect(39, 61, 71, 125, H('#3a2a2a')); rampa(40, 62, 70, 125, [H('#f8d898'), H('#d8a868'), H('#8a6040')]); R.rect(40, 118, 70, 125, H('#a87a50'));
  const w = Math.round(30 * (1 - u * 0.8)); R.rect(39, 61, 39 + w, 125, K); R.rect(40, 62, 38 + w, 124, H('#ece6dc')); R.rect(40, 62, 41, 124, H('#ffffff')); };
// el caballito de balancín
const caballito = (x, y, t, k = 1) => { const a = Math.sin(t * 2.2) * 0.12 * k; const P = (i, j) => [x + i * Math.cos(a) - j * Math.sin(a), y + i * Math.sin(a) + j * Math.cos(a)];
  const pol = (pts, c) => R.poligono(pts.map(([i, j]) => P(i, j)), c);
  pol([[-17, -1], [17, -1], [14, 2], [-14, 2]], K); pol([[-16, 0], [16, 0], [13, 1], [-13, 1]], H('#c84a3a'));
  for (const s of [-1, 1]) pol([[s * 8 - 1, -12], [s * 8 + 1, -12], [s * 10 + 1, -1], [s * 10 - 1, -1]], H('#8a5a3a'));
  pol([[-11, -19], [9, -19], [10, -12], [-11, -12]], K); pol([[-10, -18], [8, -18], [9, -13], [-10, -13]], H('#f4ecdc'));
  pol([[6, -19], [10, -29], [16, -27], [14, -22], [10, -18]], K); pol([[7, -19], [11, -28], [15, -26], [13, -22], [9, -18]], H('#f4ecdc'));
  pol([[5, -20], [9, -29], [8, -30], [4, -21]], H('#a85a3a')); pol([[-11, -18], [-15, -13], [-13, -12]], H('#a85a3a'));
  const [ox, oy] = P(13, -25); ps(ox, oy, K); const [sx, sy] = P(-2, -17); R.disco(sx, sy, 2, H('#3a6ab8')); };

// el último plano de vd-nina: la alcoba al alba con la familia abrazada y las dos luces que suben por la ventana
// TT: { luces, abrazo, mira } en segundos de vd-nina (vd-redencion los escribe a mano: congela su último instante)
const alcobaFinal = (t, P, TT) => {
  R.copiar(alcoba(1));
  R.recorte([VENT[0], VENT[1], VENT[2], VENT[3]]);
  // el sol que asoma entre los edificios y las dos luces (verde, la de él; blanca, la de su madre) que suben juntas
  R.disco(244, 84 - Math.round(tramo(t, P, P + 4) * 3), 7, H('#fff0c0')); R.disco(244, 84 - Math.round(tramo(t, P, P + 4) * 3), 5, H('#ffffff'));
  const ul = tramo(t, TT.luces - 0.6, TT.luces + 3.2);
  if (ul > 0) for (const [dx, c, c2, f] of [[-4, H('#5aff9a'), H('#2ac86a'), 0], [4, H('#ffffff'), H('#c8e0ff'), 1.3]]) {
    const y = Math.round(92 - ease(ul) * 50), x = Math.round(228 + dx + Math.sin(t * 2 + f) * 3);
    for (let k = 1; k < 7; k++) ps(x + Math.sin(t * 3 + k + f) * 1, y + k * 2, mez(c2, H('#f8b888'), k / 7));
    R.disco(x, y, 2.6, c2); R.disco(x, y, 1.6, c); }
  R.recorte(null);
  cortinas(t, 1); caballito(288, 151, t, 0.6);
  // la luz del alba que entra por la ventana y cae sobre la cama y la alfombra
  luz(232, 100, 90, 70, H('#ffd8a0'), 0.35); cono(224, 98, 179, 22, 70, H('#ffe8c0'), 0.18);
  // la niña (de pie, despierta) entre Reed y Sue, que llegan y la abrazan
  const ab = ease(tramo(t, TT.abrazo - 0.7, TT.abrazo + 0.2));
  const xr = Math.round(lerp(76, 117, ab)), xs = Math.round(lerp(214, 152, ab)), anda = (t > TT.abrazo - 0.7 && t < TT.abrazo + 0.2);
  R.actor(VD.valeriaNinaVD, 136, 164, t, { dir: t > TT.mira ? 1 : -1, sonrisa: true, brazos: ab > 0.9 && t < TT.abrazo + 1.2 });
  R.actor(EL.reed, xr, 166, t, { dir: 1, anda, sostiene: ab > 0.95 ? [xr + 18, 150] : undefined, sonrisa: ab > 0.5 });
  R.actor(EL.sue, xs, 166, t, { dir: -1, anda, sostiene: ab > 0.95 ? [xs - 3, 150] : undefined, sonrisa: ab > 0.5, triste: ab < 0.2 && t < TT.abrazo - 0.7 });
  if (t > TT.abrazo + 0.4 && t < TT.abrazo + 2.2) corazon(142, 128 - Math.round(tramo(t, TT.abrazo + 0.4, TT.abrazo + 2.2) * 8), 4, H('#f05a7a'));
};
'''

# vd-nina
NINA = r'''
const P2 = @T(7.12), P3 = @T(13.98), P4 = @T(20.02), P5 = @T(24.94), P6 = @T(31.30), P7 = @T(36.48), P8 = @T(40.74), P9 = @T(44.60), P10 = @T(48.48), P11 = @T(52.52);

// ── 1 · la sala del mundo: el globo y las banderas verdes ──────────────────────────────────────────────────────────
const p1 = (t) => {
  const anio = @T(0.60), decl = @T(4.04), emp = @T(4.88), mundo = @T(6.18), une = @T(2.30);
  const o = { encuadre: 'tribunal', camara: 'globo', banderas: ease(tramo(t, emp, emp + 1.8)) };
  T.battleworld(R, t, o);
  // el globo se tiñe de verde mientras caen las banderas
  const verde = tramo(t, emp, emp + 0.6) * (1 - tramo(t, emp + 1.6, P2)); if (verde > 0) luz(160, 86, 52, 52, H('#5aff8a'), 0.28 * verde);
  // la placa del pie con el año, que se enciende en «2025»
  const pl = tramo(t, anio - 0.1, anio + 0.4);
  R.rect(143, 136, 177, 147, K); R.rect(144, 137, 176, 146, H('#3a2a14')); R.rect(144, 137, 176, 137, H('#c8a040')); R.rect(144, 146, 176, 146, H('#2a1a0a'));
  R.numero('2025', 161, 145, { centro: true, color: mez(H('#8a6a2a'), H('#ffe890'), pl), sombra: false });
  if (pl > 0 && pl < 1) luz(160, 141, 22, 10, H('#fff0a0'), 0.5 * (1 - pl));
  // Doom entra por la derecha, señala el globo en «declares himself» y alza los brazos en «whole world»
  const a = tramo(t, 0.3, 2.6), xd = Math.round(lerp(300, 216, ease(a)));
  R.actor(EL.doom, xd, 152, t, { dir: -1, anda: a > 0 && a < 1, dedo: t > decl && t < mundo, brazos: t > mundo && t < mundo + 0.9 });
  // Atom entra por la izquierda, señala el globo en «One World» y se sorprende cuando caen las banderas
  const b = tramo(t, 0.2, 1.8), xa = Math.round(lerp(14, 70, ease(b)));
  T.AT.atom(R, xa, 152, t, { pose: b < 1 ? 'camina' : t > une && t < decl ? 'senala' : t > emp + 0.4 ? 'piensa' : 'quieto', dir: 1, cara: t > emp && t < emp + 1.6 ? 'sorpresa' : 'normal' });
  if (t > emp + 0.2 && t < emp + 1.8) R.bocadillo(xa, 118, { icono: '!' });
  T.battleworldDelante(R, t, o);
};

// ── 2 · la plaza del pueblo en 2025 ────────────────────────────────────────────────────────────────────────────────
const plazaCielo = () => horno('plazaCielo', () => {
  rampa(0, 0, 319, 112, [H('#5a92d8'), H('#7aaee6'), H('#a8cdf0'), H('#d8e8f4')]);
  // las colinas del fondo con el castillo de Doom pequeño y su bandera verde
  for (let x = 0; x < 320; x++) { const h1 = Math.round(92 - 10 * Math.abs(Math.sin(x * 0.018 + 1)) - 5 * Math.sin(x * 0.05)), h2 = Math.round(104 - 6 * Math.abs(Math.sin(x * 0.03 + 2)));
    for (let y = h1; y < 132; y++) R.pset(x, y, y < h2 ? (hh(x >> 1, y >> 1, 3) > 0.8 ? H('#7a9ab0') : H('#8aa8bc')) : (hh(x >> 1, y >> 1, 4) > 0.75 ? H('#5a8a5a') : H('#6a9a62'))); }
  R.rect(150, 66, 172, 92, H('#6a7488')); R.rect(150, 66, 152, 92, H('#8a94a8')); R.rect(146, 60, 154, 92, H('#5a6478')); R.rect(168, 60, 176, 92, H('#5a6478'));
  for (const x of [146, 149, 152, 168, 171, 174]) R.rect(x, 58, x + 1, 60, H('#5a6478')); R.rect(158, 52, 164, 66, H('#5a6478')); R.poligono([[157, 52], [161, 44], [165, 52]], H('#3a6a4a'));
  R.rect(161, 36, 161, 44, H('#3a3a44')); R.rect(162, 36, 167, 39, H('#2a9a4a'));
  for (const [x, y] of [[160, 72], [156, 80], [166, 80]]) R.rect(x, y, x + 1, y + 2, H('#f8e098'));
  // la calle del fondo con casas de tejado rojo y árboles
  for (let k = 0; k < 7; k++) { const x = 112 + k * 14, h = 12 + Math.round(hh(k, 2) * 8), y = 128 - h;
    R.rect(x, y, x + 12, 128, K); R.rect(x + 1, y + 1, x + 11, 128, [H('#e8dcc8'), H('#d8c8a8'), H('#f0e8d8')][k % 3]); R.poligono([[x - 2, y + 1], [x + 6, y - 7], [x + 14, y + 1]], H('#a84a3a')); R.linea(x - 2, y + 1, x + 6, y - 7, K);
    R.rect(x + 3, y + 4, x + 5, y + 7, H('#5a7aa8')); R.rect(x + 8, y + 4, x + 9, y + 7, H('#5a7aa8')); }
  for (const x of [118, 150, 184, 204]) { R.rect(x, 116, x + 1, 128, H('#5a3a24')); R.disco(x, 112, 6, H('#3a7a3a')); R.disco(x - 1, 110, 4, H('#5a9a4a')); ps(x - 2, 108, H('#8ac06a')); }
});
const plazaFrente = () => hornoM('plazaFrente', () => {
  // la escuela de ladrillo, con el tejado de pizarra y la espadaña de la campana
  R.poligono([[-2, 54], [56, 38], [114, 54]], K); R.poligono([[0, 53], [56, 40], [112, 53]], (x, y) => (y + (x >> 2)) % 4 === 0 ? H('#4a5468') : hh(x >> 2, y >> 1, 8) > 0.8 ? H('#6a7488') : H('#5a6478'));
  R.rect(48, 26, 64, 42, K); R.rect(49, 27, 63, 42, H('#c8a888')); R.rect(52, 30, 60, 40, H('#2a2026')); R.poligono([[46, 27], [56, 20], [66, 27]], H('#5a6478')); R.linea(46, 27, 56, 20, K); R.linea(56, 20, 66, 27, K);
  bloques(2, 54, 110, 132, [H('#d88a6a'), H('#b85a40'), H('#7a3424')], 2, 8, 4);
  R.rect(0, 54, 112, 56, H('#e8dcc8')); R.rect(0, 57, 112, 57, K); R.rect(0, 128, 112, 132, H('#a89888'));
  for (const x0 of [10, 82]) { R.rect(x0 - 1, 63, x0 + 21, 94, K); R.rect(x0, 64, x0 + 20, 93, H('#f2eee2')); R.rect(x0 + 2, 66, x0 + 18, 91, H('#7aaad8')); R.rect(x0 + 2, 66, x0 + 18, 70, H('#a8c8e8'));
    R.rect(x0 + 10, 66, x0 + 10, 91, H('#f2eee2')); R.rect(x0 + 2, 78, x0 + 18, 78, H('#f2eee2')); R.linea(x0 + 4, 89, x0 + 9, 80, H('#c8e0f4'));
    R.rect(x0 + 4, 84, x0 + 7, 90, H('#f0c040')); R.rect(x0 + 13, 82, x0 + 16, 90, H('#e85a5a')); R.rect(x0 - 2, 94, x0 + 22, 96, H('#e8dcc8')); }
  // la puerta de la escuela (dos hojas en arco; la abierta se pinta en vivo)
  R.rect(44, 98, 68, 132, K); R.disco(56, 100, 12, K); R.disco(56, 100, 11, H('#e8dcc8')); R.rect(45, 100, 67, 132, H('#e8dcc8'));
  R.rect(47, 102, 65, 132, H('#5a7a4a')); R.disco(56, 102, 9, H('#5a7a4a')); R.rect(56, 96, 56, 132, K); for (const y of [108, 118]) { R.rect(48, y, 54, y + 7, H('#4a6a3a')); R.rect(58, y, 64, y + 7, H('#4a6a3a')); }
  R.rect(40, 132, 72, 135, H('#b8a898')); R.rect(40, 135, 72, 136, K);
  // las macetas
  for (const x of [34, 76]) { R.rect(x - 4, 124, x + 4, 132, K); R.rect(x - 3, 125, x + 3, 132, H('#c86a4a')); R.disco(x, 121, 4, H('#3a8a3a')); ps(x - 2, 119, H('#f05a7a')); ps(x + 2, 120, H('#f0c040')); }
  // la clínica de yeso blanco con su cartel verde
  R.rect(206, 56, 319, 62, K); R.rect(207, 57, 319, 61, H('#d8d4cc'));
  for (let y = 62; y <= 132; y++) for (let x = 208; x <= 319; x++) R.pset(x, y, hh(x >> 1, y >> 1, 6) > 0.86 ? H('#e0dcd2') : (y - 62) % 18 === 0 ? H('#e4e0d6') : H('#f2eee6'));
  R.rect(206, 62, 207, 132, K); R.rect(208, 62, 210, 132, H('#d8d4cc'));
  R.disco(262, 76, 11, K); R.disco(262, 76, 10, H('#2a9a5a')); R.disco(262, 76, 8, H('#3ab86a')); R.rect(260, 70, 264, 82, H('#ffffff')); R.rect(256, 74, 268, 78, H('#ffffff'));
  for (const x0 of [216, 280]) { R.rect(x0 - 1, 85, x0 + 27, 112, K); R.rect(x0, 86, x0 + 26, 111, H('#a8c8d8'));
    for (let y = 87; y < 106; y += 2) R.rect(x0 + 1, y, x0 + 25, y, H('#e8ecf0')); R.rect(x0 + 1, 106, x0 + 25, 110, H('#7a9aa8')); R.rect(x0 - 2, 112, x0 + 28, 114, H('#d8d4cc')); }
  R.rect(252, 100, 272, 132, K); R.rect(253, 101, 271, 132, H('#c8c4bc'));
  R.rect(246, 132, 278, 135, H('#c8c4bc')); R.rect(246, 135, 278, 136, K);
  // el banco y la papelera de la clínica
  R.rect(282, 124, 312, 126, K); R.rect(283, 124, 311, 125, H('#8a5a3a')); R.rect(284, 126, 285, 132, K); R.rect(309, 126, 310, 132, K);
  // el suelo empedrado
  for (let y = 133; y < 180; y++) { const fila = Math.floor((y - 133) / 5), jy = (y - 133) % 5, off = (fila % 2) * 5;
    for (let x = 0; x < 320; x++) { const jx = (x + off) % 10, q = hh(Math.floor((x + off) / 10), fila, 2); let c = q > 0.66 ? H('#a8a098') : q > 0.33 ? H('#b8b0a4') : H('#c4bcb0');
      if (jy === 4 || jx === 9) c = H('#7a7268'); else if (jy === 0 || jx === 0) c = mez(c, H('#ffffff'), 0.2); R.pset(x, y, c); } }
  // la fuente del centro: el pilón, la columna y la taza
  for (let y = 136; y <= 152; y++) for (let x = 128; x <= 192; x++) { const d = Math.hypot((x - 160) / 32, (y - 146) / 8); if (d < 1) R.pset(x, y, d > 0.85 ? (y < 146 ? H('#e8e0d4') : H('#a89888')) : H('#4a8ab8')); }
  R.rect(128, 146, 192, 154, K); R.rect(129, 146, 191, 153, H('#c8c0b4')); R.rect(129, 152, 191, 153, H('#a89888')); for (let x = 132; x < 190; x += 8) R.rect(x, 147, x, 152, H('#a89888'));
  R.rect(156, 122, 164, 142, K); R.rect(157, 123, 163, 142, H('#d8d0c4')); R.rect(157, 123, 158, 142, H('#f0e8dc'));
  R.poligono([[146, 120], [174, 120], [168, 126], [152, 126]], K); R.poligono([[147, 120], [173, 120], [167, 125], [153, 125]], H('#d8d0c4'));
});
const p2 = (t) => {
  const guerra = @T(7.62), medicos = @T(9.22), escuela = @T(10.32), no = @T(11.50), regalo = @T(12.64);
  R.copiar(plazaCielo());
  // nubes de tres tonos a tres velocidades y pájaros (fuera de la esquina de Atom)
  const NUB = [H('#ffffff'), H('#e8eef6'), H('#c4d2e2')];
  for (const [y, w, v, s] of [[30, 40, 3, 20], [48, 30, 5, 180], [66, 52, 2, 90], [40, 24, 7, 260]]) nube(((s + t * v) % 380) - 50, y, w, NUB, [0, 22, 319, 120]);
  for (let k = 0; k < 3; k++) pajaro(((t * 14 + k * 40) % 200) + 90, 56 + k * 5 + Math.sin(t * 2 + k) * 2, t, H('#3a4a5a'), k);
  capa(plazaFrente());
  // la campana que tañe en «schooling» y la bandera verde de la escuela
  const camp = t > escuela - 0.1 && t < escuela + 1.6 ? Math.sin((t - escuela) * 14) * (1 - tramo(t, escuela, escuela + 1.6)) : 0;
  R.linea(56, 31, 56 + Math.round(camp * 3), 33, H('#3a3a44')); R.disco(56 + Math.round(camp * 4), 36, 3, K); R.disco(56 + Math.round(camp * 4), 36, 2.2, H('#e8c040')); ps(55 + Math.round(camp * 4), 35, H('#fff0a0'));
  if (camp) for (let k = 0; k < 3; k++) { const r = 6 + k * 3 + ((t * 8) % 3); ps(56 - r, 34 - k, H('#ffffff')); ps(56 + r, 34 - k, H('#ffffff')); }
  for (const [x0, k] of [[30, 0], [76, 1.4]]) { R.rect(x0, 58, x0, 100, H('#5a4a3a')); for (let i = 0; i < 12; i++) { const w = Math.round(Math.sin(t * 5 + i * 0.6 + k) * 1.4); R.rect(x0 + 1 + i, 60 + w, x0 + 1 + i, 74 + w, i === 11 ? H('#1e6a3a') : H('#2a9a4a')); }
    R.disco(x0 + 7, 67 + Math.round(Math.sin(t * 5 + 3.6 + k) * 1.4), 3, H('#e8c040')); R.disco(x0 + 7, 67 + Math.round(Math.sin(t * 5 + 3.6 + k) * 1.4), 1.6, H('#2a9a4a')); }
  // la puerta de la escuela se abre al sonar la campana y la de la clínica en «doctors»
  const pe = tramo(t, escuela - 0.2, escuela + 0.4) * (1 - tramo(t, P3 - 1.2, P3 - 0.6));
  if (pe > 0) { R.rect(47, 102, 65, 132, H('#3a2a20')); R.disco(56, 102, 9, H('#3a2a20')); rampa(48, 104, 64, 131, [H('#c89860'), H('#8a6040')]); const w = Math.round(9 * (1 - pe)); R.rect(47, 102, 47 + w, 132, H('#5a7a4a')); R.rect(65 - w, 102, 65, 132, H('#5a7a4a')); }
  const pc = tramo(t, medicos - 0.3, medicos + 0.2) * (1 - tramo(t, @T(11.0), @T(11.4)));
  rampa(253, 101, 271, 131, [H('#e8f4f0'), H('#c8e0d8')]); R.rect(253, 101, 253 + Math.round(9 * (1 - pc)), 131, H('#a8c8d8')); R.rect(271 - Math.round(9 * (1 - pc)), 101, 271, 131, H('#a8c8d8'));
  R.rect(262, 101, 262, 131, pc > 0.5 ? H('#e8f4f0') : K);
  // la enfermera asoma en la puerta abierta y saluda
  if (pc > 0.5) R.actor(EL.enfermera, 254, 133, t, { dir: -1, dedo: t < @T(10.6), sonrisa: true });
  // el surtidor de la fuente
  for (let k = 0; k < 10; k++) { const f = ((t * 1.4 + k / 10) % 1), s = k % 2 ? 1 : -1; ps(160 + s * f * 16, 118 + f * f * 26 - f * 14, f > 0.8 ? H('#a8d0f0') : H('#e8f4ff')); }
  for (let k = 0; k < 4; k++) { const f = ((t * 2 + k / 4) % 1); ps(160 + Math.sin(k) * 2, 118 - f * 6, H('#ffffff')); }
  for (let k = 0; k < 3; k++) { const r = ((t * 6 + k * 7) % 20); for (let a = 0; a < 6; a++) ps(160 + Math.cos(a + k) * r, 145 + Math.sin(a + k) * r * 0.22, H('#7ab0d8')); }
  // el cajón de la «X» delante de la fuente
  const cx = 110, cy = 144; R.rect(cx - 1, cy - 1, cx + 19, cy + 15, K); R.rect(cx, cy, cx + 18, cy + 14, H('#a87a4a')); for (const y of [cy + 4, cy + 9]) R.rect(cx, y, cx + 18, y, H('#7a5232'));
  R.linea(cx + 4, cy + 2, cx + 14, cy + 12, H('#c83a3a')); R.linea(cx + 5, cy + 2, cx + 15, cy + 12, H('#c83a3a')); R.linea(cx + 14, cy + 2, cx + 4, cy + 12, H('#c83a3a')); R.linea(cx + 15, cy + 2, cx + 5, cy + 12, H('#c83a3a'));
  // los actores, de atrás adelante
  // la madre y su hijo cruzan hacia la clínica
  const m = tramo(t, medicos + 0.1, @T(10.9)); if (m < 1) { const xm = Math.round(lerp(330, 258, m)), sm = Math.round(lerp(162, 136, m * m));
    R.actor(EL.vecina, xm, sm, t, { dir: -1, anda: m > 0 && m < 1 }); R.actor(EL.nino62, xm + 12, sm + 2, t, { dir: -1, anda: m > 0 && m < 1, sonrisa: true }); }
  // el soldado tira la lanza al cajón en «outlaws war» y se queda tan ancho
  const tira = tramo(t, guerra - 0.15, guerra + 0.25);
  const rs = R.actor(VD.soldadoVD, 88, 160, t, { dir: 1, sostiene: tira === 0 ? [104, 142] : undefined, dedo: t > guerra + 1.2 && t < guerra + 2.2, sonrisa: t > guerra + 0.4 });
  const lanza = (x, y, a) => { const L = 30, dx = Math.sin(a) * L, dy = -Math.cos(a) * L; R.linea(Math.round(x), Math.round(y + 6), Math.round(x + dx), Math.round(y + 6 + dy), K); R.linea(Math.round(x + 1), Math.round(y + 6), Math.round(x + 1 + dx), Math.round(y + 6 + dy), H('#8a6a44'));
    R.poligono([[x + dx - 2, y + 6 + dy], [x + dx + 2, y + 6 + dy], [x + dx * 1.12, y + 6 + dy * 1.12]], H('#c8ccd4')); };
  if (tira === 0) lanza(rs.mano[0], rs.mano[1] - 4, 0.05);
  else if (tira < 1) lanza(lerp(104, 116, tira), lerp(136, 128, Math.sin(tira * Math.PI)) - 4 * Math.sin(tira * 3), lerp(0.05, 0.9, tira));
  else { R.recorte([0, 0, 319, cy + 2]); lanza(117, cy - 8, 0.55); R.recorte(null); }
  // los niños juegan junto a la fuente y corren a la escuela con la campana
  const NI = [[EL.ninoCampo, 138, 166, 0], [EL.ninaCampo, 156, 162, 0.25], [EL.nina, 174, 170, 0.5]];
  for (const [def, x0, s0, d] of NI) { const u = tramo(t, escuela + 0.1 + d, escuela + 2.4 + d); if (u >= 1) continue;
    const x = Math.round(u < 0.6 ? lerp(x0, 72, u / 0.6) : lerp(72, 56, (u - 0.6) / 0.4)), s = Math.round(u < 0.6 ? s0 : lerp(s0, 134, (u - 0.6) / 0.4));
    const juega = u === 0 ? Math.max(0, Math.round(Math.sin(t * 7 + d * 9) * 3)) : 0; R.actor(def, x, s, t, { dir: u > 0 ? -1 : (Math.sin(t * 1.3 + d * 5) > 0 ? 1 : -1), anda: u > 0, salto: juega, sonrisa: true }); }
  // Doom tiende la caja de regalo verde al vecino, que no la quiere y se va enfadado
  const da = tramo(t, @T(11.20), @T(11.55)), va = tramo(t, @T(12.10), P3 - 0.2);
  const xv = Math.round(lerp(250, 336, va));
  R.actor(EL.senor30, xv, 170, t, { dir: t > no + 0.3 ? 1 : -1, anda: va > 0 && va < 1, enfado: t > no, habla: t < no && Math.sin(t * 8) > 0.3 });
  const rd = R.actor(EL.doom, 220, 170, t, { dir: 1, sostiene: da > 0 && t < regalo + 0.6 ? [238, 152 + Math.round((1 - da) * 6)] : undefined, habla: t < @T(11.2) && Math.sin(t * 6) > 0 });
  const caja = (x, y) => { R.rect(x - 5, y - 4, x + 5, y + 5, K); R.rect(x - 4, y - 3, x + 4, y + 4, H('#2a9a4a')); R.rect(x - 4, y - 3, x + 4, y - 2, H('#4ac86a')); R.rect(x, y - 3, x, y + 4, H('#f0c840')); R.rect(x - 4, y, x + 4, y, H('#f0c840')); ps(x - 1, y - 5, H('#f0c840')); ps(x + 1, y - 5, H('#f0c840')); };
  if (da > 0 && t < regalo + 0.6) caja(rd.mano[0] + 2, rd.mano[1] - 3); else if (t >= regalo + 0.6) caja(242, 165);
  if (t > no + 0.2 && t < no + 1.4) R.bocadillo(xv + 8, 140, { icono: 'X' });
};

// ── 3 · la batalla, de lejos, al atardecer ─────────────────────────────────────────────────────────────────────────
const llanura = () => horno('llanura', () => {
  rampa(0, 0, 319, 104, [H('#2a2a5a'), H('#5a3a6a'), H('#a8506a'), H('#e88a5a'), H('#f8c070')]);
  // la ciudad lejana de torres y las montañas
  for (let x = 0; x < 320; x++) { const m = Math.round(86 - 18 * Math.abs(Math.sin(x * 0.012 + 0.4)) - 6 * Math.sin(x * 0.04)); for (let y = m; y < 104; y++) R.pset(x, y, mez(H('#7a4a6a'), H('#c87a6a'), (y - m) / 30)); }
  for (let k = 0; k < 16; k++) { const x = 176 + k * 7 + Math.round(hh(k, 1) * 3), h = 6 + Math.round(hh(k, 2) * 14); R.rect(x, 104 - h, x + 4, 104, H('#5a3a5a')); if (hh(k, 3) > 0.5) ps(x + 2, 104 - h + 3, H('#f8d878')); }
  // la llanura con sembrados en franjas, caminos y cercas
  for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((x + (y - 104) * (x - 160) * 0.02) / 22), q = hh(f, Math.floor((y - 104) / 6), 5);
    let c = q > 0.66 ? H('#8a7a4a') : q > 0.33 ? H('#6a7a4a') : H('#9a8a5a'); if ((y - 104) % 6 === 0) c = mez(c, K, 0.2); c = mez(c, H('#f8a870'), 0.25 * (1 - (y - 104) / 36)); R.pset(x, y, c); }
  R.linea(0, 128, 320, 112, H('#c8a878')); R.linea(0, 129, 320, 113, H('#a88a5a'));
  // la loma de delante con hierba, piedras y la cerca rota
  for (let x = 0; x < 320; x++) { const h = Math.round(140 + 8 * Math.sin(x * 0.02 + 1) + 4 * Math.sin(x * 0.07)); for (let y = h; y < 180; y++) { const q = hh(x >> 1, y >> 1, 9); R.pset(x, y, y === h ? H('#8aa85a') : q > 0.85 ? H('#4a6a3a') : q < 0.15 ? H('#7a9a4a') : H('#5a7a3e')); } }
  for (const [x, y, r] of [[30, 166, 6], [52, 172, 4], [262, 160, 7], [290, 170, 5], [230, 174, 4]]) { R.disco(x, y, r + 1, K); R.disco(x, y, r, H('#8a8478')); R.disco(x - 1, y - 1, r * 0.6, H('#a8a294')); }
  for (let k = 0; k < 6; k++) { const x = 120 + k * 18, y = 150 + Math.round(4 * Math.sin(k)); R.rect(x, y - 12 + (k === 3 ? 4 : 0), x + 1, y, H('#5a3a24')); if (k < 5 && k !== 2) R.linea(x, y - 8, x + 18, y - 8 + Math.round(4 * Math.sin(k + 1) - 4 * Math.sin(k)), H('#7a5236')); }
});
const p3 = (t) => {
  const batallas = @T(15.18), el = @T(17.40), boom = @T(18.04);
  R.copiar(llanura());
  // el sol bajo tras la bruma y las nubes de tres tonos
  R.disco(84, 98, 10, H('#fff0b0')); R.disco(84, 98, 8, H('#ffffff')); luz(84, 98, 60, 30, H('#ffd890'), 0.35);
  const NUB = [H('#f8c8a8'), H('#c88a8a'), H('#7a5a7a')];
  for (const [y, w, v, s] of [[34, 50, 2, 10], [56, 36, 4, 150], [74, 60, 1.5, 230], [26, 30, 5, 90]]) nube(((s + t * v) % 380) - 50, y, w, NUB, [0, 22, 319, 100]);
  // los dos frentes (los robots verdes de Doom y los de azul), figuritas que avanzan y retroceden con sus estandartes
  const fig = (x, y, c, c2, k) => { x = Math.round(x); y = Math.round(y); const p = Math.floor(t * 5 + k) % 2; R.rect(x - 1, y - 6, x + 1, y, K); R.rect(x, y - 5, x, y - 1, c); ps(x, y - 6, c2); ps(x - 1 + p, y, K); };
  for (let k = 0; k < 22; k++) { const lado = k % 2, x = (lado ? 232 : 176) + (lado ? 1 : -1) * (hh(k, 1) * 34) + Math.sin(t * 1.4 + k) * 5 * (lado ? -1 : 1), y = 114 + hh(k, 2) * 12;
    fig(x, y, lado ? H('#2a8a4a') : H('#3a5ac8'), lado ? H('#8a94a8') : H('#f0d070'), k); }
  for (const [x0, c, d] of [[150, H('#3a5ac8'), -1], [256, H('#2a9a4a'), 1]]) { const x = Math.round(x0 + Math.sin(t * 1.4) * 5 * d); R.rect(x, 100, x, 120, K); for (let i = 0; i < 7; i++) { const w = Math.round(Math.sin(t * 5 + i * 0.7)); R.rect(x + 1 + i * d * -1 + (d < 0 ? 0 : 0), 100 + w, x + 1 + i * (d < 0 ? 1 : -1), 105 + w, c); } }
  for (let k = 0; k < 5; k++) { const f = (t * 1.7 + k * 0.37) % 1; if (f < 0.18 && t > batallas - 0.5) { const x = 186 + hh(k, Math.floor(t * 1.7 + k * 0.37), 3) * 44, y = 108 + hh(k, Math.floor(t * 1.7), 5) * 12; R.disco(x, y, 2, H('#fff0a0')); ps(x, y, H('#ffffff')); for (const [i, j] of [[-3, 0], [3, 0], [0, -3], [0, 3]]) ps(x + i, y + j, H('#fff0a0')); } }
  // columnas de humo lejanas
  for (const [x0, s] of [[150, 0], [262, 2]]) for (let k = 0; k < 7; k++) { const f = (t * 0.25 + k / 7 + s) % 1; R.disco(x0 + f * 10 + Math.sin(f * 5 + s) * 2, 112 - f * 36, 1 + f * 4, mez(H('#6a5a6a'), H('#a88a8a'), f)); }
  // la figura de capa verde se ilumina en «he himself» y el destello verde en «blows up his own armor» (lejos)
  const XB = 206, YB = 110;
  if (t > el - 0.2 && t < boom) { const g = tramo(t, el - 0.2, boom); R.rect(XB, YB - 3, XB + 1, YB, H('#2a6a3a')); ps(XB, YB - 4, H('#3a3a44')); luz(XB, YB - 2, 6 + g * 6, 6 + g * 6, H('#8affb0'), 0.6 * g); }
  const fl = tramo(t, boom, boom + 2.2);
  if (fl > 0 && fl < 1) { const r = 3 + ease(fl) * 70; luz(XB, YB, r * 1.6, r, H('#c8ffd8'), 0.9 * (1 - fl));
    for (let a = 0; a < 90; a++) { const p = a / 90 * Math.PI * 2; ps(XB + Math.cos(p) * r, YB + Math.sin(p) * r * 0.45, mez(H('#7affa0'), H('#2ac86a'), fl)); }
    if (fl < 0.25) { R.disco(XB, YB, 6 * (1 - fl * 2), H('#ffffff')); luz(160, 90, 200, 120, H('#e8fff0'), 0.35 * (1 - fl * 4)); } }
  if (t > boom + 0.3) luz(XB, YB - 10, 40, 30, H('#8affb0'), 0.3 * (1 - tramo(t, boom + 0.3, P4))); if (t > boom + 0.3) for (let k = 0; k < 14; k++) { const f = ((t - boom) * 0.22 + k / 14) % 1, sube = Math.min(1, (t - boom) * 0.5); R.disco(XB + Math.sin(f * 6 + k) * 6 + f * 10, YB - f * 44 * sube, 2 + f * 8, mez(H('#5a8a6a'), H('#9aa89a'), f)); }
  // los pájaros que huyen del destello
  for (let k = 0; k < 6; k++) { const f = tramo(t, boom + 0.1 + k * 0.05, boom + 3); if (f <= 0 || f >= 1) continue; pajaro(200 - f * 180 - k * 6, 96 - f * 40 + Math.sin(k * 2) * 6, t, H('#2a1a2a'), k); }
  // la hierba de delante, que se mece, y la bandera verde rota en su asta
  for (let k = 0; k < 40; k++) { const x = Math.round(hh(k, 7) * 320), y = Math.round(150 + 8 * Math.sin(x * 0.02 + 1) + hh(k, 8) * 22), w = Math.round(Math.sin(t * 2.2 + x * 0.1) * 1.5);
    R.linea(x, y, x + w, y - 4, H('#8ab05a')); R.linea(x + 2, y, x + 2 + w, y - 3, H('#6a903e')); }
  R.rect(292, 112, 293, 160, K); R.rect(294, 112, 294, 160, H('#8a6a44'));
  for (let i = 0; i < 16; i++) { const w = Math.round(Math.sin(t * 4 + i * 0.5) * 2 * (i / 16)); R.rect(294 + i, 114 + w + (i > 12 ? i - 12 : 0), 294 + i, 126 + w - (i > 10 ? i - 10 : 0), i % 5 === 4 ? H('#1e5a32') : H('#2a8a4a')); }
  // Atom luciérnaga en la loma: mira la batalla y se tapa con la sorpresa al destello
  T.AT.luciernaga(R, 64 + Math.sin(t * 1.2) * 3, 132 + Math.sin(t * 2) * 2, t, { dir: 1, brillo: 0.7, cara: t > boom && t < boom + 1.5 ? 'sorpresa' : t > boom + 1.5 ? 'triste' : 'normal' });
};

// ── 4 · la repisa con el retrato de la familia ─────────────────────────────────────────────────────────────────────
const salon = () => horno('salon', () => {
  papel(0, 0, 319, 118, H('#2a3a5a'), H('#24324e'), H('#34466a'), 5);
  // la ventana de la izquierda con la noche y la llanura
  R.rect(6, 26, 62, 108, K); R.rect(7, 27, 61, 107, H('#e8dcc8')); rampa(10, 30, 58, 104, [H('#141a3a'), H('#2a2a5a'), H('#4a3a6a')]);
  for (let x = 10; x <= 58; x++) { const h = Math.round(90 + 5 * Math.sin(x * 0.2)); for (let y = h; y <= 104; y++) R.pset(x, y, H('#1a1a30')); }
  R.rect(33, 30, 34, 104, H('#e8dcc8')); R.rect(10, 66, 58, 67, H('#e8dcc8')); R.rect(4, 108, 64, 111, H('#d8ccb8'));
  // la chimenea de ladrillo con su repisa de madera
  bloques(70, 120, 250, 179, [H('#c87a5a'), H('#a85a40'), H('#6a3424')], 4, 12, 6);
  R.rect(110, 140, 210, 179, K); R.disco(160, 142, 50, K); rampa(114, 144, 206, 179, [H('#2a1a14'), H('#1a1210')]);
  R.rect(64, 116, 256, 126, K); R.rect(65, 117, 255, 125, H('#8a5a34')); R.rect(65, 117, 255, 118, H('#b8865a')); R.rect(65, 124, 255, 125, H('#5a3a20'));
  for (let x = 66; x < 255; x += 9) ps(x, 121, H('#6a4428'));
  // el suelo de tablas a los lados de la chimenea
  tablas(0, 152, 69, 179, [H('#8a6448'), H('#6a4a34'), H('#3a2820')], 7, 2); tablas(251, 152, 319, 179, [H('#8a6448'), H('#6a4a34'), H('#3a2820')], 7, 3);
  for (const [a, b] of [[0, 69], [251, 319]]) { R.rect(a, 112, b, 151, H('#34446a')); R.rect(a, 112, b, 113, H('#5a6a8a')); R.rect(a, 150, b, 151, H('#24304e'));
    for (let x = a + 3; x < b - 8; x += 22) { R.rect(x, 117, x + 17, 146, H('#24304e')); R.rect(x + 1, 118, x + 17, 146, H('#3e4e74')); R.rect(x + 1, 118, x + 16, 118, H('#5a6a8a')); R.rect(x + 17, 118, x + 17, 146, H('#24304e')); } }
  // el cesto de leña y el tren de madera
  R.rect(276, 148, 306, 166, K); R.rect(277, 149, 305, 165, H('#a8804a')); for (let x = 279; x < 305; x += 4) R.rect(x, 149, x + 1, 165, H('#8a6438')); for (const [x, y] of [[282, 146], [290, 144], [298, 146], [286, 140]]) { R.disco(x, y, 3.4, K); R.disco(x, y, 2.6, H('#8a5a34')); ps(x, y, H('#c8a070')); }
  for (const [x, c] of [[78, '#c83a3a'], [92, '#3a6ab8'], [104, '#e8b840']]) { R.rect(x, 168, x + 11, 175, K); R.rect(x + 1, 169, x + 10, 174, H(c)); R.disco(x + 3, 176, 2, K); R.disco(x + 9, 176, 2, K); } R.rect(80, 162, 84, 168, H('#c83a3a')); R.rect(78, 171, 115, 171, K);
  // el marco dorado y el retrato (fondo de estudio)
  R.rect(102, 30, 218, 116, K); R.rect(103, 31, 217, 115, H('#c8982a')); R.rect(103, 31, 217, 32, H('#f8d870')); R.rect(103, 31, 104, 115, H('#f0c850')); R.rect(216, 31, 217, 115, H('#8a6418')); R.rect(103, 114, 217, 115, H('#8a6418'));
  for (let x = 106; x < 214; x += 6) { ps(x, 33, H('#fff0a0')); ps(x + 3, 113, H('#a87a20')); }
  R.rect(108, 36, 212, 110, K); rampa(109, 37, 211, 96, [H('#8ab0d8'), H('#a8c8e8'), H('#c8dcf0')]);
  for (let y = 96; y <= 109; y++) for (let x = 109; x <= 211; x++) R.pset(x, y, (x + y) % 5 === 0 ? H('#b8a890') : H('#c8b8a0'));
  // en el retrato, la familia: Reed, la niña y Sue, sonrientes
  R.recorte([109, 37, 211, 109]);
  R.actor(EL.reed, 124, 104, 0, { dir: 1, quieto: true, sonrisa: true });
  R.actor(VD.valeriaNinaVD, 152, 104, 0, { dir: 1, quieto: true, sonrisa: true });
  R.actor(EL.sue, 178, 104, 0, { dir: -1, quieto: true, sonrisa: true });
  R.recorte(null);
  // los objetos de la repisa: el reloj, los libros, el jarrón con flores y el cohete de juguete
  R.rect(72, 92, 94, 116, K); R.rect(73, 93, 93, 116, H('#6a3a20')); R.disco(83, 102, 7, K); R.disco(83, 102, 6, H('#f8f0dc')); R.rect(73, 93, 93, 94, H('#8a5a30'));
  for (const [x, c] of [[226, '#a83a3a'], [230, '#3a6a9a'], [234, '#c8a040'], [237, '#4a8a5a']]) { R.rect(x, 98, x + 3, 116, K); R.rect(x, 99, x + 2, 116, H(c)); }
  R.rect(242, 104, 252, 116, K); R.rect(243, 105, 251, 116, H('#5ab0c8')); R.rect(244, 105, 245, 116, H('#8ad0e0'));
  for (const [i, j, c] of [[-3, -8, '#f05a7a'], [2, -11, '#f0c040'], [5, -6, '#f8f0f0'], [-1, -14, '#f05a7a']]) { R.linea(247, 104, 247 + i, 104 + j, H('#3a7a3a')); R.disco(247 + i, 104 + j, 2, H(c)); }
});
const p4 = (t) => {
  const golpe = @T(20.32), nina = @T(20.82), valeria = @T(21.84), reed = @T(23.26), sue = @T(23.70);
  R.copiar(salon());
  // por la ventana: el cielo de noche y el destello verde lejano que se abre
  R.recorte([10, 30, 58, 104]);
  estrellas(12, 10, 30, 58, 86, t, 4);
  const fl = tramo(t, golpe - 0.3, golpe + 1.2); if (fl > 0 && fl < 1) { const r = 2 + ease(fl) * 20; R.disco(40, 88, r * 0.5 * (1 - fl), H('#e8fff0')); for (let a = 0; a < 40; a++) { const p = a / 40 * Math.PI * 2; ps(40 + Math.cos(p) * r, 88 + Math.sin(p) * r * 0.5, H('#5aff8a')); } }
  R.recorte(null);
  // el fuego de la chimenea
  for (let k = 0; k < 14; k++) { const x = 130 + k * 4.5, f = (t * 2.2 + hh(k, 1) * 3) % 1, h = 10 + hh(k, 2) * 14; for (let j = 0; j < h * (1 - f * 0.5); j++) { const u = j / h; ps(x + Math.sin(t * 7 + k + j * 0.4) * (1 + u * 2), 176 - j, u < 0.3 ? H('#fff0a0') : u < 0.6 ? H('#f8a040') : H('#d84a2a')); } }
  R.rect(126, 174, 196, 179, H('#3a2418')); for (const x of [134, 150, 168, 184]) R.rect(x, 172, x + 10, 175, H('#5a3424'));
  luz(160, 168, 90, 30, H('#f8a050'), 0.25 + Math.sin(t * 9) * 0.03);
  // la vela de la repisa, que se apaga cuando entra la luz verde (sube un hilo de humo)
  R.rect(97, 104, 100, 116, K); R.rect(98, 105, 99, 116, H('#f8f0dc'));
  if (t < golpe + 0.1) { const fy = Math.round(Math.sin(t * 13) * 0.6); R.disco(98.5, 101 + fy, 2, H('#f8c040')); ps(98, 100 + fy, H('#ffffff')); luz(98, 100, 20, 16, H('#ffd890'), 0.35); }
  else for (let k = 0; k < 6; k++) { const f = ((t - golpe) * 0.8 + k / 6) % 1; ps(98 + Math.sin(f * 7 + k) * 2, 102 - f * 18, mez(H('#c8c8d0'), H('#3a4a6a'), f)); }
  // la luz verde que barre la pared de izquierda a derecha y envuelve a la niña del retrato (sin herirla: se queda dorada)
  const b = tramo(t, golpe, nina + 0.4); if (b > 0 && b < 1) luz(lerp(40, 200, b), 70, 46, 60, H('#7affa0'), 0.45 * Math.sin(b * Math.PI));
  if (t > nina) luz(158, 88, 16, 22, H('#ffe8a0'), 0.45 + Math.sin(t * 3) * 0.08);
  // las órbitas de Atom: la niña en «Valeria», Reed y Sue en sus nombres
  if (t > valeria) T.AT.anillo(R, 159, 88, 13, 20, t, tramo(t, valeria, valeria + 0.5));
  if (t > reed && t < P5 - 0.3) T.AT.anillo(R, 131, 86, 11, 19, t, tramo(t, reed, reed + 0.4));
  if (t > sue && t < P5 - 0.3) T.AT.anillo(R, 185, 86, 11, 19, t, tramo(t, sue, sue + 0.4));
  // Atom en la repisa: se asusta con la luz y señala el retrato
  const xa = Math.round(lerp(270, 224, ease(tramo(t, P4 + 0.1, P4 + 1.2))));
  T.AT.atom(R, xa, 116, t, { pose: t < P4 + 1.2 ? 'camina' : t > valeria - 0.2 ? 'senala' : 'quieto', dir: -1, cara: t > golpe && t < valeria ? 'sorpresa' : t > sue + 0.5 ? 'triste' : 'normal', habla: voz(t) * 0.5 });
  // el gato dormido en la alfombra (la cola se mueve) y se despierta con el destello
  const gx = 40, gy = 166; R.disco(gx, gy, 7, K); R.disco(gx, gy, 6, H('#6a6a74')); R.disco(gx + 6, gy - 3, 4.4, K); R.disco(gx + 6, gy - 3, 3.6, H('#7a7a84'));
  R.poligono([[gx + 3, gy - 6], [gx + 4, gy - 10], [gx + 6, gy - 6]], H('#5a5a64')); R.poligono([[gx + 7, gy - 6], [gx + 9, gy - 10], [gx + 10, gy - 6]], H('#5a5a64'));
  const des = t > golpe && t < golpe + 1.6; ps(gx + 5, gy - 3, des ? H('#c8e040') : K); ps(gx + 8, gy - 3, des ? H('#c8e040') : K);
  for (let i = 0; i < 9; i++) ps(gx - 6 - i, gy + 4 - Math.round(Math.sin(t * 2.4 + i * 0.4) * (i / 4)), H('#5a5a64'));
  for (let x = 26; x < 52; x++) ps(x, gy + 7, mez(H('#3a2820'), K, 0.3));
};

// ── 5 · el recuerdo en sepia: el cuarto del bebé (2002) ────────────────────────────────────────────────────────────
const cuna = () => horno('cuna', () => {
  papel(0, 0, 319, 120, H('#d8c0a0'), H('#c8b090'), H('#e8d4b8'), 6);
  for (let k = 0; k < 18; k++) { const x = 10 + (k * 37) % 300, y = 20 + (k * 23) % 80; if (x > 270 && y < 48) continue; ps(x, y, H('#f0e0a0')); ps(x - 1, y, H('#e8d098')); ps(x + 1, y, H('#e8d098')); ps(x, y - 1, H('#e8d098')); ps(x, y + 1, H('#e8d098')); }
  R.rect(0, 118, 319, 121, H('#a88a6a')); tablas(0, 122, 319, 179, [H('#c89868'), H('#a87a50'), H('#6a4a30')], 8, 7);
  // la ventana con la nieve de noche
  R.rect(20, 30, 78, 106, K); R.rect(21, 31, 77, 105, H('#f0e8d8')); rampa(25, 35, 73, 101, [H('#1a2240'), H('#2a3462'), H('#3a4a7a')]);
  for (let x = 25; x <= 73; x++) { const h = Math.round(92 + 4 * Math.sin(x * 0.15)); for (let y = h; y <= 101; y++) R.pset(x, y, H('#e8ecf4')); }
  R.rect(48, 35, 49, 101, H('#f0e8d8')); R.rect(25, 66, 73, 67, H('#f0e8d8')); R.rect(16, 106, 82, 109, H('#e8dcc8'));
  // la cuna de barrotes
  R.rect(160, 108, 230, 152, K); R.rect(161, 109, 229, 151, H('#f0e4d0'));
  R.rect(161, 109, 164, 151, H('#e0c8a8')); R.rect(226, 109, 229, 151, H('#e0c8a8')); R.rect(165, 126, 225, 136, H('#f8f4ec')); R.rect(165, 136, 225, 140, H('#e8b8c8'));
  for (let x = 168; x < 224; x += 5) R.rect(x, 110, x + 1, 126, H('#e0c8a8')); R.rect(161, 109, 229, 111, H('#f8ecd8')); R.rect(165, 140, 225, 142, H('#c8a888'));
  for (const x of [162, 226]) R.rect(x, 152, x + 2, 156, K);
  // la mecedora y la cómoda con la lamparita
  R.rect(256, 92, 300, 140, K); R.rect(257, 93, 299, 139, H('#c8a070')); for (let y = 98; y < 136; y += 8) R.rect(258, y, 298, y + 1, H('#a87a50')); R.disco(270, 116, 1.4, H('#e8c060')); R.disco(286, 116, 1.4, H('#e8c060'));
  R.rect(270, 76, 276, 92, K); R.rect(271, 77, 275, 92, H('#e8d8b8')); R.poligono([[264, 78], [282, 78], [278, 66], [268, 66]], H('#f0d898'));
  R.rect(102, 102, 132, 152, K); R.rect(103, 103, 131, 151, H('#c8a070')); R.rect(103, 103, 131, 105, H('#e8c898')); for (const y of [112, 126, 140]) { R.rect(105, y, 129, y + 10, H('#b88a5a')); R.disco(117, y + 5, 1.2, H('#e8c060')); }
  R.disco(110, 96, 5, H('#e8b0b8')); R.disco(110, 90, 4, H('#e8b0b8')); ps(109, 90, K); ps(111, 90, K);
  // la guirnalda de banderitas, los cuadros de la cigüeña y la luna, y la balda con peluches
  for (let x = 92; x <= 252; x++) { const y = Math.round(24 + 10 * Math.sin((x - 92) / 160 * Math.PI)); ps(x, y, H('#8a6a4a')); if ((x - 92) % 12 === 0 && x < 250) { const c = [H('#e8a0b0'), H('#a8c8e8'), H('#f0d890'), H('#b8e0b0')][((x - 92) / 12) % 4]; R.poligono([[x, y + 1], [x + 8, y + 1], [x + 4, y + 9]], c); R.linea(x, y + 1, x + 4, y + 9, H('#8a6a4a')); } }
  R.rect(134, 50, 156, 72, K); R.rect(135, 51, 155, 71, H('#a8865a')); R.rect(137, 53, 153, 69, H('#e8f0f8')); R.disco(145, 61, 4, H('#f8f8f8')); R.linea(141, 60, 149, 58, H('#e8a050')); R.rect(143, 64, 147, 67, H('#f0c8d0'));
  R.rect(236, 50, 256, 70, K); R.rect(237, 51, 255, 69, H('#a8865a')); R.rect(239, 53, 253, 67, H('#2a3462')); R.disco(246, 60, 4, H('#f8e8a0')); R.disco(248, 59, 3.4, H('#2a3462')); ps(242, 56, H('#ffffff'));
  R.rect(196, 84, 232, 86, K); R.rect(197, 84, 231, 85, H('#a8865a')); R.disco(204, 79, 4, H('#e8c0a0')); R.disco(204, 74, 3, H('#e8c0a0')); R.disco(222, 80, 4, H('#a8d0b0')); R.disco(222, 75, 3, H('#a8d0b0')); R.rect(212, 76, 216, 84, H('#e8a0a0'));
  // la puerta entreabierta de la derecha
  R.rect(286, 60, 319, 152, K); R.rect(287, 61, 319, 151, H('#e8d4b0')); R.rect(300, 62, 319, 150, H('#f8e8c8'));
});
const sepia = () => { const B = R.buf; for (let i = 0; i < 57600; i++) { const c = B[i], l = lum(c) / 255; B[i] = mez(mez(H('#3a2414'), H('#fcecc8'), l), c, 0.32); } };
const p5 = (t) => {
  const parto = @T(26.22), salvo = @T(27.84), nombre = @T(28.98), amor = @T(30.00);
  R.copiar(cuna());
  // el móvil que gira sobre la cuna
  R.rect(195, 40, 195, 66, H('#8a6a4a')); for (let k = 0; k < 4; k++) { const a = t * 1.1 + k * Math.PI / 2, x = 195 + Math.cos(a) * 14, y = 72 + Math.sin(a) * 3; R.linea(195, 66, Math.round(x), Math.round(y) - 4, H('#a88a6a'));
    if (k % 2) { R.disco(x, y, 3, K); R.disco(x, y, 2.2, H('#f8e098')); } else { R.disco(x, y, 3, K); R.disco(x, y, 2.4, H('#a8c8e8')); R.disco(x + 1, y - 1, 2, H('#d8c0a0')); } }
  // la nieve que cae por la ventana
  R.recorte([25, 35, 73, 101]); for (let k = 0; k < 20; k++) { const f = (t * 0.25 + hh(k, 1)) % 1; ps(25 + hh(k, 2) * 48 + Math.sin(t + k) * 2, 35 + f * 60, H('#ffffff')); } R.recorte(null);
  // el bebé en la cuna: llora (débil) hasta que Doom lo salva
  const sana = tramo(t, salvo - 0.4, salvo + 0.8);
  R.rect(184, 126, 206, 134, K); R.rect(185, 127, 205, 133, H('#f8f0f4')); R.disco(190, 128, 4.2, K); R.disco(190, 128, 3.4, H('#f6c8a0')); ps(189, 128, K); ps(192, 128, K); ps(188, 125, H('#f0d070')); ps(190, 124, H('#f0d070'));
  if (sana < 1 && Math.sin(t * 9) > 0) ps(190, 130, K);
  // Doom junto a la cuna alarga la mano sobre el bebé en «had saved»
  const alarga = t > salvo - 0.6 && t < amor + 0.2, mira = t > nombre + 0.2;
  const rd = R.actor(EL.doom, 142, 156, t, { dir: mira ? -1 : 1, sostiene: alarga && !mira ? [182, 112] : undefined });
  // Reed asoma en la puerta y sonríe al ver al bebé a salvo
  if (t > salvo + 0.6) R.actor(EL.reed, 292, 152, t, { dir: -1, sonrisa: true });
  sepia();
  // (a color) las chispas verdes que caen sobre la cuna y el brillo cálido del bebé
  if (alarga && !mira) { luz(rd.mano[0], rd.mano[1] + 10, 14, 14, H('#8affb0'), 0.35); for (let k = 0; k < 16; k++) { const f = (t * 0.9 + k / 16) % 1; R.disco(rd.mano[0] + Math.sin(k * 2 + t) * 8, rd.mano[1] + 2 + f * 20, f < 0.5 ? 1.2 : 0.8, f < 0.5 ? H('#8affb0') : H('#3ad870')); } }
  luz(191, 129, 22, 14, H('#ffe8a0'), 0.2 + 0.4 * sana); if (sana < 1 && Math.sin(t * 6) > 0) { ps(197, 122, H('#ffffff')); ps(199, 120, H('#ffffff')); ps(195, 120, H('#ffffff')); }
  // (a color) en «first love», la figura de luz verde con chal en la ventana
  const fig = tramo(t, nombre, amor) * (1 - tramo(t, amor + 0.8, P6 - 0.2));
  if (fig > 0) { R.recorte([25, 35, 73, 101]); aparte(() => R.actor(VD.valeriaVD, 42, 96, t, { dir: 1, sonrisa: true }));
    const B = R.buf; for (let y = 60; y <= 100; y++) for (let x = 36; x <= 62; x++) { const c = TMP[y * 320 + x]; if (c === MK) continue; if (bay(x, y) > fig) continue; B[y * 320 + x] = mez(H('#2ac86a'), H('#c8ffd8'), lum(c) / 255); }
    R.recorte(null); luz(48, 80, 26, 30, H('#8affb0'), 0.3 * fig); if (t > amor) corazon(64, 52 - Math.round(tramo(t, amor, amor + 1.4) * 6), 3, H('#5aff8a')); }
};

// ── 6 · la alcoba de la niña, de noche, con la luz cálida ──────────────────────────────────────────────────────────
const p6 = (t) => {
  const delante = @T(32.40), algo = @T(34.36), nadie = @T(34.78), mano = @T(35.60);
  R.copiar(alcoba(0));
  R.recorte([VENT[0], VENT[1], VENT[2], VENT[3]]); estrellas(14, VENT[0], VENT[1], VENT[2], 70, t, 8);
  for (let k = 0; k < 6; k++) { const x = VENT[0] + 2 + ((k * 9) % 42), y = 82 + (k * 5) % 10; if (Math.sin(t * 0.7 + k * 2) > 0.3) ps(x, y, H('#ffe890')); }
  R.recorte(null);
  cortinas(t, 0); caballito(288, 151, t, 0.4);
  // el reloj de pared con su aguja
  const ag = t * 0.5; R.linea(160, 40, Math.round(160 + Math.cos(ag) * 4), Math.round(40 + Math.sin(ag) * 4), K); R.linea(160, 40, 160, 36, K);
  // la puerta se abre y Doom entra hasta la cama
  const pu = tramo(t, P6 + 0.1, P6 + 0.7); puertaAbierta(pu, 0);
  const a = tramo(t, P6 + 0.5, delante + 0.4), xd = Math.round(lerp(48, 86, ease(a))), sd = Math.round(lerp(126, 150, ease(a)));
  if (a > 0) R.actor(EL.doom, xd, sd, t, { dir: 1, anda: a > 0 && a < 1, sostiene: t > mano ? [112, 138] : undefined });
  // la noche en todo el cuarto y la luz cálida de la lámpara sobre la niña dormida
  T.tinte(R, 0, 179, [26, 22, 64], 0.38);
  R.rect(185, 100, 199, 110, K); R.poligono([[186, 109], [198, 109], [196, 100], [188, 100]], H('#f8e0a8'));
  luz(176, 124, 84, 48, H('#ffd890'), 0.5 + Math.sin(t * 2) * 0.02); cono(160, 112, 140, 10, 46, H('#ffe8b0'), 0.25);
  if (pu > 0) cono(56, 90, 170, 14, 40, H('#f8d898'), 0.2 * pu);
  nenaCama(114, 133, t, 0);
  // Atom luciérnaga junto a la lámpara: «!» en «no one expected»
  T.AT.luciernaga(R, 214 + Math.sin(t * 1.3) * 2, 112 + Math.sin(t * 2.1) * 2, t, { dir: -1, brillo: 0.7, cara: t > nadie ? 'sorpresa' : 'normal' });
  if (t > nadie && t < nadie + 1.4) R.bocadillo(214, 94, { icono: '!' });
};

// ── 7 · el espacio del juez: Doom se arrodilla ────────────────────────────────────────────────────────────────────
const p7 = (t) => {
  const tribunal = @T(37.72), juez = @T(39.14);
  const o = { encuadre: 'tribunal', camara: 'general' };
  T.battleworld(R, t, o);
  // las tres caras se encienden en «the judge of the universe»
  const ca = tramo(t, juez - 0.2, juez + 0.8); if (ca > 0) { luz(160, 50, 40, 28, H('#fff0b0'), 0.55 * ca); luz(139, 52, 14, 14, H('#e8eeff'), 0.4 * ca); }
  const a = tramo(t, P7 + 0.1, tribunal - 0.1), x = Math.round(lerp(8, 98, ease(a)));
  if (t < tribunal) R.actor(EL.doom, x, 152, t, { dir: 1, anda: a > 0 && a < 1 });
  else { luz(106, 140, 18, 18, H('#c8ffd8'), 0.3); arrodillado(EL.doom, 98, 152, t, { dir: 1 }); }
  T.AT.luciernaga(R, 246 + Math.sin(t * 1.2) * 3, 116 + Math.sin(t * 2) * 2, t, { dir: -1, brillo: 0.7, cara: t > juez ? 'sorpresa' : 'normal' });
  T.battleworldDelante(R, t, o);
};

// ── 8 · la ofrenda: la llama verde sube al juez y la luz cálida baja a la niña ──────────────────────────────────────
const vacio = () => horno('vacio', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = Math.sin(x * 0.02 + Math.sin(y * 0.03) * 2) + Math.sin(y * 0.025 + x * 0.007) * 0.8, u = (n + 2) / 4;
    R.pset(x, y, u > 0.62 + (bay(x, y) - 0.5) * 0.15 ? H('#3a2a6a') : u > 0.45 + (bay(x, y) - 0.5) * 0.15 ? H('#241c4a') : u > 0.3 ? H('#181434') : H('#100c24')); }
  for (let k = 0; k < 120; k++) { const x = Math.round(hh(k, 1, 2) * 319), y = Math.round(hh(k, 2, 2) * 179); if ((x >= 18 && x <= 172 && y <= 21) || (x >= 276 && y <= 46)) continue; ps(x, y, k % 5 ? H('#8a8ab0') : H('#ffffff')); }
  // las dos rocas de luz: la de Doom (izquierda) y la de la camilla (derecha)
  for (const [cx, cy, w] of [[86, 160, 46], [244, 152, 40]]) { R.poligono([[cx - w, cy], [cx + w, cy], [cx + w * 0.6, cy + 14], [cx, cy + 22], [cx - w * 0.6, cy + 14]], (x, y) => (y - cy) < 2 ? H('#f8e8b0') : hh(x >> 1, y >> 1, 3) > 0.7 ? H('#8a7aa8') : H('#6a5a8a'));
    R.linea(cx - w, cy, cx + w, cy, H('#fff4c8')); for (let i = -w; i < w; i += 6) ps(cx + i, cy + 4 + Math.abs(i) % 5, H('#c8b8e8')); }
});
const p8 = (t) => {
  const vida = @T(41.36), suya = @T(42.96);
  R.copiar(vacio());
  estrellas(30, 0, 0, 319, 179, t, 11);
  // las tres caras del juez, arriba: la dorada, la plateada y la de sombra, con rayos que giran
  for (let k = 0; k < 16; k++) { const a = t * 0.15 + k * Math.PI / 8, r0 = 26, r1 = 52 + (k % 2) * 12; R.linea(Math.round(160 + Math.cos(a) * r0), Math.round(56 + Math.sin(a) * r0 * 0.7), Math.round(160 + Math.cos(a) * r1), Math.round(56 + Math.sin(a) * r1 * 0.7), k % 2 ? H('#5a4a8a') : H('#8a7ab0')); }
  for (const [x, y, r, c, c2] of [[122, 62, 14, H('#c8d0e8'), H('#8a94b8')], [198, 62, 14, H('#3a3458'), H('#241e3a')], [160, 54, 20, H('#ffe8a0'), H('#e8b850')]]) {
    R.disco(x, y, r + 1.5, K); R.disco(x, y, r, c2); R.disco(x - 2, y - 2, r * 0.8, c);
    ps(x - r * 0.35, y - 1, K); ps(x + r * 0.35, y - 1, K); R.linea(Math.round(x - r * 0.25), Math.round(y + r * 0.4), Math.round(x + r * 0.25), Math.round(y + r * 0.4), mez(c2, K, 0.5)); }
  luz(160, 54, 44, 30, H('#fff0b0'), 0.3 + Math.sin(t * 2) * 0.05);
  // Doom arrodillado en su roca, y la camilla con la niña en la otra
  arrodillado(EL.doom, 78, 160, t, { dir: 1 });
  R.rect(226, 142, 264, 146, K); R.rect(227, 142, 263, 145, H('#fff4d0')); for (let k = 0; k < 4; k++) ps(230 + k * 10, 148 + Math.sin(t * 2 + k) * 1, H('#f8e8b0'));
  nenaCama(230, 142, t, 0, '#3a5ac8');
  // la llama verde sale del pecho de Doom en «his own life» y sube a la cara dorada
  const sube = tramo(t, vida - 0.3, suya - 0.2), baja = tramo(t, suya - 0.2, suya + 1.0);
  const curva = (u, a, b, c) => [(1 - u) * (1 - u) * a[0] + 2 * u * (1 - u) * b[0] + u * u * c[0], (1 - u) * (1 - u) * a[1] + 2 * u * (1 - u) * b[1] + u * u * c[1]];
  if (t > vida - 0.6 && sube < 1) { const g = tramo(t, vida - 0.6, vida - 0.3); luz(86, 146, 10, 10, H('#8affb0'), 0.6 * g); }
  if (sube > 0) { const u = ease(sube); for (let k = 0; k < 8; k++) { const v = Math.max(0, u - k * 0.03), [x, y] = curva(v, [86, 146], [100, 70], [160, 58]); R.disco(x, y, 2.6 - k * 0.3, k < 2 ? H('#c8ffd8') : H('#3ad870')); }
    const [x, y] = curva(u, [86, 146], [100, 70], [160, 58]); luz(x, y, 12, 12, H('#8affb0'), 0.5); }
  if (sube >= 1) luz(160, 54, 26, 20, H('#8affb0'), 0.3 * (1 - baja));
  // la luz cálida baja de la cara dorada a la niña en «for hers»
  if (baja > 0) { const u = ease(baja); for (let k = 0; k < 8; k++) { const v = Math.max(0, u - k * 0.03), [x, y] = curva(v, [160, 58], [230, 70], [240, 132]); R.disco(x, y, 2.6 - k * 0.3, k < 2 ? H('#ffffff') : H('#ffd870')); }
    const [x, y] = curva(u, [160, 58], [230, 70], [240, 132]); luz(x, y, 12, 12, H('#ffe8a0'), 0.5); }
  if (baja >= 1) luz(244, 136, 28, 14, H('#ffe8a0'), 0.4 + Math.sin(t * 3) * 0.06);
  // el polvo de luz que cae
  for (let k = 0; k < 16; k++) { const f = (t * 0.12 + hh(k, 5)) % 1; ps(20 + hh(k, 6) * 280, 30 + f * 140, f > 0.5 ? H('#c8b8e8') : H('#fff0c0')); }
};

// ── 9 · el juez con luz de alba: la niña despierta y Doom se deshace en luz ──────────────────────────────────────────
const p9 = (t) => {
  const abre = @T(45.36), ojos = @T(46.02), se = @T(47.22);
  const o = { encuadre: 'tribunal', camara: 'general', despierta: ease(tramo(t, abre, ojos + 0.3)), desvanece: tramo(t, se - 0.3, P10 - 0.2) };
  T.battleworld(R, t, o);
  T.tinte(R, 0, 179, [255, 200, 140], 0.3); luz(150, 130, 150, 70, H('#fff0c0'), 0.3 * o.despierta);
  arrodillado(EL.doom, 98, 152, t, { dir: 1, u: o.desvanece });
  if (o.despierta > 0.8) luz(147, 132, 14, 10, H('#ffe8b0'), 0.4);
  if (t > abre) T.AT.anillo(R, 150, 134, 16, 9, t, tramo(t, abre, abre + 0.5));
  T.AT.luciernaga(R, 236 + Math.sin(t * 1.2) * 3, 112 + Math.sin(t * 2) * 2, t, { dir: t > se ? -1 : -1, brillo: 0.8, cara: t > se ? 'triste' : t > ojos ? 'sonrisa' : 'normal' });
  T.battleworldDelante(R, t, o);
};

// ── 10 · GAG: el testamento ───────────────────────────────────────────────────────────────────────────────────────
const despacho = () => horno('despacho', () => {
  bloques(0, 0, 319, 130, [H('#7a8478'), H('#5a6458'), H('#3a4238')], 9, 20, 10);
  // el ventanal de la izquierda: Latveria de día, con el castillo y los tejados
  R.rect(14, 30, 76, 118, K); R.disco(45, 30, 31, K); R.rect(17, 30, 73, 118, H('#c8b898')); R.disco(45, 30, 28, H('#c8b898'));
  const dentro = (x, y) => x >= 20 && x <= 70 && y <= 114 && (y >= 30 || Math.hypot(x - 45, y - 30) <= 25);
  const CI = [H('#6a9ad8'), H('#8ab4e4'), H('#a8c8ec'), H('#d8e4f0')];
  for (let y = 5; y <= 114; y++) for (let x = 20; x <= 70; x++) { if (!dentro(x, y)) continue; const f = (y - 5) / 110 * 3, i = Math.min(2, Math.floor(f)); let c = f - i > bay(x, y) ? CI[i + 1] : CI[i];
    const h = Math.round(84 + 6 * Math.sin(x * 0.15)); if (y >= h) c = (x + y) % 7 === 0 ? H('#9a5a4a') : H('#b86a50');
    if (x >= 33 && x <= 57 && y >= 52 && y <= 84 && !(x > 39 && x < 51 && y < 56)) c = x < 36 || (x > 38 && x < 52 && false) ? H('#5a6478') : H('#6a7488');
    R.pset(x, y, c); }
  R.poligono([[32, 52], [36, 44], [40, 52]], H('#3a6a4a')); R.poligono([[50, 52], [54, 44], [58, 52]], H('#3a6a4a')); for (const [x, y] of [[44, 64], [40, 72], [50, 72]]) R.rect(x, y, x + 1, y + 2, H('#f8e098'));
  R.rect(44, 6, 46, 118, H('#c8b898')); R.rect(17, 64, 73, 66, H('#c8b898')); R.rect(10, 118, 80, 122, H('#a89878'));
  // el tapiz verde con el aro de cuatro puntas
  R.rect(106, 20, 154, 92, K); R.rect(107, 21, 153, 91, H('#2a6a3e')); for (let y = 22; y < 91; y += 3) for (let x = 108; x < 153; x += 2) ps(x + (y % 2), y, H('#24603a'));
  R.rect(107, 21, 153, 23, H('#c8a040')); R.rect(107, 89, 153, 91, H('#c8a040')); for (let x = 108; x < 153; x += 4) R.rect(x, 92, x + 1, 96, H('#c8a040'));
  R.disco(130, 56, 12, H('#c8a040')); R.disco(130, 56, 9, H('#2a6a3e')); for (const [i, j] of [[0, -16], [16, 0], [0, 16], [-16, 0]]) R.poligono([[130 + i * 0.6 - j * 0.15, 56 + j * 0.6 + i * 0.15], [130 + i, 56 + j], [130 + i * 0.6 + j * 0.15, 56 + j * 0.6 - i * 0.15]], H('#c8a040'));
  R.rect(104, 18, 156, 19, H('#8a6a3a'));
  // la estantería de la derecha con libros y un globo pequeño
  R.rect(200, 40, 274, 130, K); R.rect(201, 41, 273, 129, H('#5a3a24')); for (const y of [62, 86, 110]) R.rect(201, y, 273, y + 2, H('#3a2414'));
  const LB = ['#7a2a2a', '#2a4a6a', '#6a5a2a', '#2a5a3a', '#4a2a5a', '#8a6a3a'].map(H);
  for (const [y0, y1] of [[43, 61], [64, 85], [88, 109]]) { let x = 204; while (x < 270) { const w = 3 + Math.floor(hh(x, y0, 2) * 3), h = 12 + Math.floor(hh(x, y0, 3) * 7); if (x + w > 271) break; const c = LB[Math.floor(hh(x, y0) * 6)];
    R.rect(x, y1 - h, x + w - 1, y1, c); R.rect(x, y1 - h, x, y1, mez(c, H('#ffffff'), 0.25)); R.rect(x, y1 - h + 3, x + w - 1, y1 - h + 3, H('#c8a040')); x += w + (hh(x, y0, 8) > 0.8 ? 4 : 0); } }
  R.disco(236, 120, 7, K); R.disco(236, 120, 6, H('#4a7ab8')); R.disco(234, 118, 3, H('#5a9a4a')); R.rect(232, 127, 240, 129, H('#c8a040'));
  // el suelo de losas y la alfombra
  for (let y = 131; y < 180; y++) for (let x = 0; x < 320; x++) { const jx = (x + Math.floor((y - 131) / 12) * 14) % 28, jy = (y - 131) % 12, q = hh(Math.floor(x / 28), Math.floor(y / 12), 6);
    R.pset(x, y, jx === 0 || jy === 0 ? H('#3a3a36') : q > 0.5 ? H('#6a6a62') : H('#5e5e56')); }
  R.rect(0, 130, 319, 131, K);
  // la mesa grande: tablero de cuero verde y frente de nogal con cajones
  R.rect(56, 104, 252, 110, K); R.rect(57, 105, 251, 109, H('#6a4428')); R.rect(70, 104, 238, 106, H('#2a6a3a'));
  R.rect(60, 110, 248, 154, K); R.rect(61, 111, 247, 153, H('#7a4e2e')); R.rect(61, 111, 247, 113, H('#9a6a40'));
  for (const x0 of [66, 190]) { R.rect(x0, 118, x0 + 52, 148, H('#6a4226')); R.rect(x0 + 1, 119, x0 + 51, 147, H('#7e5232')); R.disco(x0 + 26, 133, 2, H('#d8b060')); }
  R.rect(122, 118, 186, 148, H('#5a3820')); for (let y = 120; y < 147; y += 3) R.rect(124, y, 184, y, H('#6a4428'));
  // sobre la mesa: el tintero con la pluma, el sello de lacre, el reloj de arena y la máscara en su soporte
  R.rect(78, 96, 88, 104, K); R.rect(79, 97, 87, 104, H('#2a2a3a')); R.linea(86, 96, 96, 80, K); R.linea(87, 96, 97, 80, H('#f0f0f0')); R.linea(88, 95, 98, 81, H('#d8d8d8'));
  R.rect(100, 98, 104, 104, K); R.rect(101, 99, 103, 104, H('#b8862a')); R.disco(102, 97, 2.6, H('#a82a2a'));
  R.rect(226, 102, 236, 104, H('#a87a40')); R.rect(226, 84, 236, 86, H('#a87a40')); R.rect(226, 86, 236, 102, H('#d8ecf4')); R.poligono([[228, 87], [234, 87], [231, 93]], H('#e8b850')); R.poligono([[231, 96], [228, 101], [234, 101]], H('#e8b850'));
  R.rect(212, 88, 214, 104, H('#6a4428')); R.rect(206, 102, 220, 104, H('#6a4428'));
  T.c_mascara(R, 213, 80, 0, 1, 0);
});
const p10 = (t) => {
  const sello = @T(48.86), todo = @T(49.56), ella = @T(50.24);
  R.copiar(despacho());
  // la vela de la mesa, la luz del ventanal con motas, la paloma del alféizar
  R.rect(184, 92, 188, 104, K); R.rect(185, 93, 187, 104, H('#f8f0dc')); R.rect(181, 103, 191, 104, H('#b8862a'));
  const fy = Math.round(Math.sin(t * 11) * 0.6); R.disco(186, 89 + fy, 2, H('#f8c040')); ps(186, 88 + fy, H('#ffffff')); luz(186, 90, 18, 14, H('#ffd890'), 0.3);
  cono(46, 60, 179, 20, 60, H('#fff4d0'), 0.12);
  for (let k = 0; k < 10; k++) { const f = (t * 0.08 + hh(k, 2)) % 1; ps(30 + hh(k, 3) * 40 + f * 30, 70 + f * 90 + Math.sin(t + k) * 2, H('#fff8e0')); }
  const pico = Math.sin(t * 3) > 0.6 ? 1 : 0; R.disco(64, 114, 3, K); R.disco(64, 114, 2.4, H('#d8d8e0')); R.disco(67, 111 + pico, 2, K); R.disco(67, 111 + pico, 1.4, H('#e8e8f0')); ps(69, 111 + pico, H('#e8a040')); ps(67, 110 + pico, K);
  // Atom en la mesa con el testamento: rompe el sello y el pergamino se desenrolla, cae al suelo y rueda
  const u = tramo(t, todo - 0.2, ella + 1.6);
  const r = T.AT.atom(R, 150, 105, t, { pose: 'sostiene', dir: 1, cara: u > 0.55 ? 'sorpresa' : t > sello ? 'sonrisa' : 'normal', habla: u < 0.4 ? voz(t) * 0.5 : 0 });
  const [mx, my] = [Math.round(r.mano[0]), Math.round(r.mano[1])];
  const largo = Math.round(ease(u) * 160), x0 = mx - 9, x1 = mx + 9;
  // la hoja: baja por delante de la mesa hasta el suelo y luego corre por el suelo hacia la derecha
  const bajo = Math.min(largo, 176 - my), corre = Math.max(0, largo - (176 - my));
  const hoja = (x, y) => (y % 4 === 0 && (x - x0) % 18 > 2 && (x - x0) % 18 < 16) ? H('#a89070') : H('#f0e4c4');
  if (largo > 0) { R.rect(x0 - 1, my, x1 + 1, my + bajo, K); R.poligono([[x0, my], [x1 + 1, my], [x1 + 1, my + bajo], [x0, my + bajo]], (x, y) => x === x1 ? H('#d8c8a0') : hoja(x, y));
    // lo que dice: el castillo → la niña, y el sello verde
    if (bajo > 30) { const yy = my + 8; R.rect(x0 + 2, yy, x0 + 6, yy + 6, H('#5a6478')); ps(x0 + 2, yy - 1, H('#5a6478')); ps(x0 + 6, yy - 1, H('#5a6478')); R.linea(x0 + 8, yy + 3, x0 + 11, yy + 3, H('#3a2a1a')); ps(x0 + 10, yy + 2, H('#3a2a1a')); ps(x0 + 10, yy + 4, H('#3a2a1a'));
      R.disco(x0 + 15, yy + 1, 1.6, H('#f0d070')); R.rect(x0 + 14, yy + 3, x0 + 16, yy + 6, H('#3a5ac8')); }
    if (bajo > 60) { R.disco(mx, my + 54, 3, K); R.disco(mx, my + 54, 2.4, H('#2a9a4a')); ps(mx - 1, my + 53, H('#8affb0')); }
    if (corre > 0) { R.rect(x0 - 1, 168, x0 + 18 + corre, 177, K); R.poligono([[x0, 169], [x1 + corre, 169], [x1 + corre, 176], [x0, 176]], (x, y) => (x % 6 === 0 && y > 170 && y < 175) ? H('#a89070') : H('#f0e4c4')); }
    const rx = corre > 0 ? x1 + corre + 3 : mx, ry = corre > 0 ? 172 : my + bajo + 2, giro = t * 9;
    R.disco(rx, ry, 4.4, K); R.disco(rx, ry, 3.6, H('#e8d8b0')); ps(rx + Math.cos(giro) * 2, ry + Math.sin(giro) * 2, H('#a89070')); ps(rx - Math.cos(giro) * 2, ry - Math.sin(giro) * 2, H('#a89070')); }
  // el rollo y el sello en las manos (el lacre rojo salta en «will»)
  R.rect(mx - 11, my - 3, mx + 11, my + 1, K); R.rect(mx - 10, my - 2, mx + 10, my, H('#e8d8b0')); R.rect(mx - 10, my - 2, mx + 10, my - 2, H('#f8f0d8'));
  const ls = tramo(t, sello, sello + 0.6); if (ls === 0) { R.disco(mx, my - 1, 2.6, H('#a82a2a')); } else if (ls < 1) { R.disco(mx + ls * 10, my - 1 - Math.sin(ls * Math.PI) * 12, 2, H('#a82a2a')); }
  if (u > 0.6 && u < 1) R.bocadillo(mx - 18, my - 26, { icono: '!' });
};

// ── 11 · la alcoba al alba: la familia junta y las dos luces que suben ─────────────────────────────────────────────
const TT11 = { luces: @T(53.14), abrazo: @T(54.20), mira: @T(55.46) };
const p11 = (t) => alcobaFinal(t, P11, TT11);

const efectos = [[@T(0.6), 'brillo'], [@T(4.95), 'whoosh'], [@T(7.70), 'golpecito'], [@T(9.20), 'puerta'], [@T(10.32), 'campana'], [@T(12.0), 'pasos'],
  [@T(15.2), 'viento', { dur: 2.5 }], [@T(18.04), 'boom'], [@T(18.3), 'pajaros'], [@T(20.32), 'flash'], [@T(21.84), 'pop'], [@T(27.7), 'brillo'], [@T(29.2), 'campana'],
  [@T(31.45), 'puerta'], [@T(34.78), 'golpecito'], [@T(37.7), 'zumbido'], [@T(39.14), 'brillo'], [@T(41.3), 'whoosh'], [@T(42.9), 'brillo'], [@T(45.5), 'brillo'], [@T(47.0), 'rafaga'],
  [@T(48.86), 'pop'], [@T(49.5), 'papel'], [@T(51.4), 'golpecito'], [@T(53.2), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11]],
  { efectos, año: (t) => (t >= P5 && t < P6 ? 2002 : 2025) });
'''

# vd-redencion
REDENCION = r'''
const P2 = @T(4.50), P3 = @T(8.62), P4 = @T(12.66), P5 = @T(16.94), P6 = @T(22.02), P7 = @T(26.26);
// el plano congelado: el último instante de vd-nina (57,20 s), con sus instantes escritos a mano
const congelado = () => horno('congelado', () => alcobaFinal(57.20, 52.52, { luces: 53.14, abrazo: 54.20, mira: 55.46 }));
const pausa = (t, a, b) => T.AT.pausa(R, tramo(t, a, a + 0.3) * (1 - tramo(t, b - 0.3, b)));
// el libro abierto (44 × 30 a escala 1): tapas granates, dos páginas con renglones; la línea de la vida que baja (bajo
// 0–1) hasta la máscara pequeña y sube (sube 0–1) hasta la estrella; nueva 0–1: la página de la derecha se enciende
const libro = (bajo, sube, nueva, t) => () => {
  R.rect(0, 2, 43, 29, K); R.rect(1, 3, 42, 28, H('#7a2a2a')); R.rect(1, 27, 42, 28, H('#5a1a1a'));
  R.rect(2, 1, 21, 26, K); R.rect(22, 1, 41, 26, K); R.rect(3, 2, 21, 25, H('#f8f2e2')); R.rect(22, 2, 40, 25, mez(H('#f0e8d4'), H('#fff4b0'), nueva)); R.rect(21, 2, 22, 25, H('#c8b898'));
  for (let y = 5; y < 24; y += 3) { R.rect(5, y, 19, y, H('#d8d0c0')); if (nueva < 0.5) R.rect(24, y, 38, y, H('#d8d0c0')); }
  // la línea: de (5, 6) baja a (20, 21) y sube a (37, 5)
  const A = [5, 6], B = [20, 21], C = [37, 5];
  if (bajo > 0) { const x = A[0] + (B[0] - A[0]) * bajo, y = A[1] + (B[1] - A[1]) * bajo; R.linea(A[0], A[1], Math.round(x), Math.round(y), H('#2a3a7a')); R.linea(A[0], A[1] + 1, Math.round(x), Math.round(y) + 1, H('#5a6aa8')); }
  if (bajo >= 1) { R.rect(18, 22, 22, 25, H('#6a6a74')); ps(19, 23, K); ps(21, 23, K); }
  if (sube > 0) { const x = B[0] + (C[0] - B[0]) * sube, y = B[1] + (C[1] - B[1]) * sube; R.linea(B[0], B[1], Math.round(x), Math.round(y), H('#c88a1a')); R.linea(B[0], B[1] + 1, Math.round(x), Math.round(y) + 1, H('#f0c040')); }
  if (sube >= 1) { const s = 1 + (Math.sin(t * 5) > 0 ? 1 : 0); R.rect(37 - s, 5, 37 + s, 5, H('#f8d040')); R.rect(37, 5 - s, 37, 5 + s, H('#f8d040')); ps(37, 5, H('#ffffff')); }
  if (nueva > 0.5) { R.disco(31, 15, 4, H('#ffe890')); ps(31, 15, H('#ffffff')); for (let a = 0; a < 6; a++) ps(31 + Math.cos(a + t) * 7, 15 + Math.sin(a + t) * 7, H('#f8c040')); }
};

// ── 1 · la pausa: Atom saca el libro ────────────────────────────────────────────────────────────────────────────
const q1 = (t) => {
  R.copiar(congelado()); pausa(t, 0, 999);
  const fijate = @T(0.30), psico = @T(2.46), mca = @T(3.60);
  const anda = tramo(t, 0, 1.1), x = lerp(350, 262, ease(anda));
  const a = T.AT.atom(R, x, 176, t, { s: 2, pose: anda < 1 ? 'camina' : t > psico - 0.2 ? 'sostiene' : t > fijate + 0.2 ? 'senala' : 'quieto', dir: -1, cara: t > mca ? 'sonrisa' : t > psico ? 'sorpresa' : 'normal', habla: voz(t) });
  if (t > fijate + 0.2 && t < psico) T.AT.anillo(R, 230, 46, 14, 10, t, tramo(t, fijate + 0.2, fijate + 0.8));
  const ul = tramo(t, psico - 0.1, psico + 0.4);
  if (ul > 0) { const y = 44 + Math.round((1 - ease(ul)) * 30) + Math.round(Math.sin(t * 2.4) * 1.5); luz(70, y + 30, 50, 34, H('#fff0c0'), 0.35 * ul); T.AT.escalado(R, libro(0, 0, 0, t), 44, 30, 26, y, 2);
    if (t > mca) T.AT.anillo(R, 70, y + 30, 54, 38, t, tramo(t, mca, mca + 0.6)); }
};

// ── 2 · el despacho de las entrevistas ─────────────────────────────────────────────────────────────────────────
const oficina = () => horno('oficina', () => {
  papel(0, 0, 319, 120, H('#d8c8a0'), H('#c8b890'), H('#e4d6b0'), 12);
  R.rect(0, 118, 319, 122, H('#8a6a4a')); tablas(0, 123, 319, 179, [H('#a88058'), H('#8a6440'), H('#5a3e28')], 8, 12);
  // la ventana con los árboles y la calle
  R.rect(16, 28, 80, 96, K); R.rect(17, 29, 79, 95, H('#f0e8d8')); rampa(20, 32, 76, 92, [H('#7ab0e0'), H('#a8d0f0'), H('#d0e4f4')]);
  for (const [x, y, r] of [[30, 76, 12], [62, 72, 14], [46, 82, 9]]) { R.disco(x, y, r, H('#3a7a3a')); R.disco(x - 2, y - 3, r * 0.7, H('#5a9a4a')); }
  R.rect(20, 86, 76, 92, H('#9a9a94')); R.rect(47, 32, 48, 92, H('#f0e8d8')); R.rect(20, 61, 76, 62, H('#f0e8d8')); R.rect(12, 96, 84, 99, H('#d8ccb8'));
  // la estantería de cintas de casete
  R.rect(198, 34, 300, 108, K); R.rect(199, 35, 299, 107, H('#8a5a34')); for (const y of [52, 70, 88]) R.rect(199, y, 299, y + 2, H('#5a3a20'));
  // el corcho con fichas y el diploma
  R.rect(104, 30, 160, 70, K); R.rect(105, 31, 159, 69, H('#c89a60')); for (let y = 32; y < 69; y++) for (let x = 106; x < 159; x++) if (hh(x, y, 2) > 0.8) R.pset(x, y, H('#b08450'));
  for (const [x, y, c] of [[110, 36, '#f8f4ec'], [128, 40, '#f8e890'], [144, 34, '#c8e8f8'], [116, 52, '#f8d8e0'], [138, 54, '#f8f4ec']]) { R.rect(x, y, x + 12, y + 10, H(c)); for (let j = y + 3; j < y + 9; j += 2) R.rect(x + 2, j, x + 9, j, H('#a8a090')); R.disco(x + 6, y + 1, 1.2, H('#c83a3a')); }
  // el escritorio
  R.rect(92, 124, 196, 130, K); R.rect(93, 125, 195, 129, H('#6a4428')); R.rect(93, 125, 195, 125, H('#9a6a40'));
  R.rect(96, 130, 192, 160, K); R.rect(97, 131, 191, 159, H('#7a4e2e')); for (const y of [136, 148]) { R.rect(160, y, 188, y + 9, H('#6a4226')); R.disco(174, y + 4, 1.2, H('#d8b060')); }
  // el banco de la espera y el perchero
  R.rect(222, 146, 306, 150, K); R.rect(223, 146, 305, 149, H('#8a5a3a')); R.rect(223, 146, 305, 146, H('#b8865a')); for (const x of [226, 300]) R.rect(x, 150, x + 2, 162, K);
  R.rect(312, 60, 314, 150, H('#5a3a24')); R.rect(306, 60, 319, 62, H('#5a3a24'));
});
const q2 = (t) => {
  const decadas = @T(5.02), vidas = @T(6.86);
  R.copiar(oficina());
  // las cintas que se van llenando: décadas de entrevistas
  const n = Math.floor(12 + ease(tramo(t, decadas - 0.3, vidas)) * 44); const CC = ['#e8e4dc', '#d84a3a', '#3a6ab8', '#f0c040', '#2a2a30'].map(H);
  for (let k = 0; k < n; k++) { const fila = Math.floor(k / 14), x = 202 + (k % 14) * 7, y = [37, 55, 73, 91][fila]; if (fila > 3) break; R.rect(x, y, x + 5, y + 13, K); R.rect(x + 1, y + 1, x + 4, y + 12, CC[k % 5]); R.rect(x + 1, y + 4, x + 4, y + 5, H('#f8f4ec')); }
  // el calendario de pared con el año (1985 → 2001 en «decades»)
  const anio = Math.round(1985 + ease(tramo(t, decadas - 0.2, decadas + 1.6)) * 16);
  R.rect(164, 36, 196, 66, K); R.rect(165, 37, 195, 65, H('#f8f4ec')); R.rect(165, 37, 195, 44, H('#c83a3a')); R.rect(173, 34, 174, 39, H('#8a8a9a')); R.rect(186, 34, 187, 39, H('#8a8a9a'));
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) R.rect(172 + i * 5, 48 + j * 5, 174 + i * 5, 50 + j * 5, H('#c8c0b0'));
  R.numero(String(anio), 180, 64, { centro: true, color: H('#2a2a3a'), sombra: false });
  if (t > decadas && t < decadas + 1.6 && Math.floor(t * 12) % 2) R.rect(165, 45, 195, 52, H('#e8e4d8'));
  // la grabadora del escritorio con las bobinas que giran y su lucecita
  R.rect(132, 114, 166, 125, K); R.rect(133, 115, 165, 124, H('#3a3a44')); R.rect(133, 115, 165, 116, H('#6a6a74'));
  for (const cx of [142, 156]) { R.disco(cx, 119, 3.6, H('#c8c8d0')); const a = t * 6; ps(cx + Math.cos(a) * 2, 119 + Math.sin(a) * 2, K); ps(cx - Math.cos(a) * 2, 119 - Math.sin(a) * 2, K); ps(cx, 119, K); }
  if (Math.sin(t * 5) > 0) ps(162, 117, H('#ff3a3a'));
  R.rect(120, 112, 122, 124, K); R.disco(121, 110, 2.4, H('#3a3a44'));
  // el investigador tras la mesa (escribe) y la mujer que cuenta su vida
  R.actor(EL.profesor, 172, 136, t, { dir: -1, sostiene: [168, 124 + Math.round(Math.sin(t * 9) * 1)], sonrisa: t > vidas });
  R.rect(178, 120, 190, 124, H('#f8f4ec')); R.rect(178, 124, 190, 124, H('#c8c0b0'));
  const r = R.actor(EL.abuela, 70, 160, t, { dir: 1, habla: Math.sin(t * 7) > -0.2, dedo: t > vidas && t < vidas + 1.2, sonrisa: t > vidas + 1.2 });
  // el bocadillo con los dibujos de su vida, que cambian (casa, corazón, nube, sol)
  const fase = Math.floor((t - P2) / 0.9) % 4; R.rect(64, 104, 96, 126, K); R.rect(65, 105, 95, 125, H('#ffffff')); R.poligono([[72, 126], [78, 126], [74, 132]], K); R.poligono([[73, 125], [77, 125], [74, 130]], H('#ffffff'));
  if (fase === 0) { R.rect(74, 114, 86, 122, H('#d86a4a')); R.poligono([[72, 114], [80, 107], [88, 114]], H('#8a4a8a')); R.rect(78, 117, 81, 122, H('#5a3a2a')); }
  else if (fase === 1) corazon(80, 115, 5, H('#f05a7a'));
  else if (fase === 2) { nube(70, 113, 20, [H('#c8c8d0'), H('#8a8a9a'), H('#6a6a7a')]); for (let k = 0; k < 4; k++) R.linea(72 + k * 5, 118, 71 + k * 5, 122, H('#4a7ab8')); }
  else { R.disco(80, 115, 5, H('#f8c040')); for (let a = 0; a < 8; a++) ps(80 + Math.cos(a * 0.785) * 8, 115 + Math.sin(a * 0.785) * 7, H('#f8c040')); }
  // los que esperan su turno en el banco: un chico que lee, una vecina y Atom, que balancea los pies
  R.actor(EL.chicoHoy, 232, 158, t, { dir: -1, sostiene: [228, 142] }); R.rect(220, 138, 230, 146, H('#f8f4ec')); R.rect(225, 138, 225, 146, H('#c8c0b0'));
  R.actor(EL.vecina, 258, 158, t, { dir: -1, sonrisa: t > vidas });
  T.AT.atom(R, 288, 148 - (Math.sin(t * 4) > 0 ? 1 : 0), t, { pose: t > vidas ? 'senala' : 'quieto', dir: -1, cara: t > vidas ? 'sonrisa' : 'normal' });
};

// ── 3 · la mesa de las fichas: la línea que baja y sube ──────────────────────────────────────────────────────────
const mesaFichas = () => horno('mesaFichas', () => {
  tablas(0, 0, 319, 179, [H('#b88a5a'), H('#9a6a40'), H('#6a4428')], 14, 21);
  // la lámpara de flexo (su base) arriba a la izquierda y su luz
  R.disco(54, 34, 14, K); R.disco(54, 34, 12, H('#3a6a4a')); R.disco(52, 32, 7, H('#5a8a6a'));
  // la taza de café, las gafas, los lápices, la goma y una casete
  R.disco(268, 132, 13, K); R.disco(268, 132, 11, H('#f4f0e8')); R.disco(268, 132, 8, H('#5a3420')); R.disco(266, 130, 3, H('#7a4a30')); R.rect(280, 128, 286, 136, K); R.rect(281, 129, 285, 135, H('#f4f0e8'));
  for (const [x, c] of [[24, '#f0c040'], [32, '#3a6ab8']]) { R.linea(x, 120, x + 34, 150, K); R.linea(x + 1, 120, x + 35, 150, H(c)); R.linea(x + 1, 119, x + 35, 149, mez(H(c), H('#ffffff'), 0.3)); ps(x + 35, 151, H('#3a3a3a')); }
  R.rect(232, 48, 270, 72, K); R.rect(233, 49, 269, 71, H('#2a2a30')); R.rect(237, 53, 265, 63, H('#e8e4dc')); R.disco(244, 58, 3, H('#3a3a44')); R.disco(258, 58, 3, H('#3a3a44')); R.rect(240, 66, 262, 70, H('#4a4a54'));
  R.disco(40, 74, 7, K); R.disco(40, 74, 6, H('#c8d8e8')); R.disco(58, 74, 7, K); R.disco(58, 74, 6, H('#c8d8e8')); R.rect(46, 73, 52, 74, K);
  R.rect(270, 92, 290, 102, K); R.rect(271, 93, 289, 101, H('#f08aa0'));
});
const ficha = (x, y, w, h, linea, k) => { R.rect(x + 2, y + 2, x + w + 2, y + h + 2, mez(H('#6a4428'), K, 0.4)); R.rect(x, y, x + w, y + h, K); R.rect(x + 1, y + 1, x + w - 1, y + h - 1, H('#fbf8ee'));
  R.rect(x + 1, y + 1, x + w - 1, y + 3, H('#e86a5a')); for (let j = y + 7; j < y + h - 2; j += 3) R.rect(x + 3, j, x + w - 3, j, H('#c8d8e8'));
  if (linea) { const a = [x + 4, y + 7], b = [x + w * 0.45, y + h - 4], c = [x + w - 4, y + 6 + (k % 3)]; R.linea(Math.round(a[0]), a[1], Math.round(b[0]), Math.round(b[1]), H('#2a3a7a')); R.linea(Math.round(b[0]), Math.round(b[1]), Math.round(c[0]), Math.round(c[1]), H('#c88a1a')); } };
const q3 = (t) => {
  const muchas = @T(9.72), dibuja = @T(10.40), red = @T(11.22), hist = @T(11.60);
  R.copiar(mesaFichas());
  luz(70, 60, 140, 100, H('#fff0c0'), 0.18);
  // la taza humea
  for (let k = 0; k < 5; k++) { const f = (t * 0.5 + k / 5) % 1; ps(266 + Math.sin(f * 6 + k) * 3, 124 - f * 22, mez(H('#f8f4ec'), H('#b88a5a'), f)); }
  // las fichas que llegan en «many of them» (cada una ya con su línea que baja y sube)
  const F = [[16, 18, 1], [92, 6, 1], [190, 14, 0], [24, 92, 1], [210, 100, 1], [120, 136, 0], [196, 140, 1]];
  F.forEach(([x, y, l], k) => { const u = k < 2 ? 1 : ease(tramo(t, muchas - 0.3 + k * 0.12, muchas + 0.2 + k * 0.12)); if (u <= 0) return; const dx = x < 160 ? -80 : 80; ficha(Math.round(x + dx * (1 - u)), y, 46, 32, l, k); });
  // la ficha grande del centro y la línea que dibuja la mano: baja y sube en «redemption stories»
  const X0 = 104, Y0 = 44; ficha(X0, Y0, 112, 76, false, 0);
  const A = [X0 + 10, Y0 + 14], B = [X0 + 52, Y0 + 66], C = [X0 + 102, Y0 + 12];
  const u = tramo(t, dibuja, hist + 0.3), w = ease(u) * 2;
  const pt = w <= 1 ? [A[0] + (B[0] - A[0]) * w, A[1] + (B[1] - A[1]) * w] : [B[0] + (C[0] - B[0]) * (w - 1), B[1] + (C[1] - B[1]) * (w - 1)];
  if (w > 0) { const e = Math.min(1, w); for (const d of [0, 1]) R.linea(A[0], A[1] + d, Math.round(A[0] + (B[0] - A[0]) * e), Math.round(A[1] + (B[1] - A[1]) * e) + d, H('#2a3a7a')); }
  if (w > 1) for (const d of [0, 1]) R.linea(B[0], B[1] + d, Math.round(pt[0]), Math.round(pt[1]) + d, H('#c88a1a'));
  if (w >= 2) { const s = Math.sin(t * 5) > 0 ? 2 : 1; R.rect(C[0] - s, C[1], C[0] + s, C[1], H('#f8d040')); R.rect(C[0], C[1] - s, C[0], C[1] + s, H('#f8d040')); luz(C[0], C[1], 12, 10, H('#fff0a0'), 0.4); }
  if (t > red) luz(B[0], B[1] - 10, 60, 40, H('#ffe8a0'), 0.15 * tramo(t, red, red + 0.6));
  // Atom recorre la ficha con un lápiz grande y dibuja la línea (antes, espera en la esquina de la ficha)
  const [px, py] = u > 0 ? pt : [X0 + 14, Y0 + 74];
  const ra = T.AT.atom(R, Math.round(px - 12), Math.round(py + 14), t, { pose: u > 0 && u < 1 ? 'sostiene' : t > hist + 0.3 ? 'brazos' : 'sostiene', dir: 1, cara: t > red ? 'sonrisa' : 'normal' });
  if (!(t > hist + 0.3)) { const [hx, hy] = ra.mano; R.linea(Math.round(hx), Math.round(hy) - 8, Math.round(px), Math.round(py), K); R.linea(Math.round(hx) + 1, Math.round(hy) - 8, Math.round(px) + 1, Math.round(py), H('#f0c040')); R.rect(Math.round(hx) - 1, Math.round(hy) - 11, Math.round(hx) + 2, Math.round(hy) - 8, H('#f08aa0')); ps(px, py, H('#2a2a30')); }
};

// ── 4 · el valle: la línea hecha camino ──────────────────────────────────────────────────────────────────────────
const camino = (x) => 128 - 34 * Math.exp(-((x - 20) ** 2) / 4000) + 30 * Math.exp(-((x - 150) ** 2) / 2400) - 46 * Math.exp(-((x - 300) ** 2) / 5200);
const valle = () => horno('valle', () => {
  rampa(0, 0, 319, 120, [H('#5a92d8'), H('#8ab8e8'), H('#c8e0f4')]);
  for (let x = 0; x < 320; x++) { const m = Math.round(92 - 14 * Math.abs(Math.sin(x * 0.015 + 0.6))); for (let y = m; y < 180; y++) R.pset(x, y, hh(x >> 1, y >> 1, 4) > 0.8 ? H('#8aa8c0') : H('#9ab4c8')); }
  for (let x = 0; x < 320; x++) { const c = Math.round(camino(x)) + 6; for (let y = c - 20; y < 180; y++) { if (y < c - 6) continue; const q = hh(x >> 1, y >> 1, 7), hondo = Math.exp(-((x - 150) ** 2) / 2400);
    let col = q > 0.85 ? H('#4a7a3a') : q < 0.12 ? H('#8ab85a') : H('#6a9a4a'); col = mez(col, H('#3a4a4a'), hondo * 0.45); R.pset(x, y, col); } }
  // el camino de tierra que baja y sube
  for (let x = 0; x < 320; x++) { const c = Math.round(camino(x)); for (let d = 0; d < 5; d++) R.pset(x, c + 3 + d, d === 0 ? H('#e8d4a8') : (x + d) % 5 === 0 ? H('#a8865a') : H('#c8a878')); }
  // charcos y piedras en el fondo del valle; la casa y el árbol en la loma de la derecha
  for (const [x, w] of [[132, 10], [160, 8], [176, 6]]) { const c = Math.round(camino(x)) + 14; R.rect(x - w, c, x + w, c + 2, H('#5a7a9a')); R.rect(x - w + 2, c, x + w - 3, c, H('#8ab0d0')); }
  for (const [x, dy, r] of [[110, 20, 4], [196, 18, 5], [146, 30, 3]]) { const c = Math.round(camino(x)) + dy; R.disco(x, c, r + 1, K); R.disco(x, c, r, H('#8a8478')); }
  const yc = Math.round(camino(286)); R.rect(274, yc - 20, 300, yc + 2, K); R.rect(275, yc - 19, 299, yc + 2, H('#f0e4c8')); R.poligono([[270, yc - 19], [287, yc - 32], [304, yc - 19]], H('#c84a3a')); R.linea(270, yc - 19, 287, yc - 32, K); R.linea(287, yc - 32, 304, yc - 19, K);
  R.rect(284, yc - 10, 289, yc + 2, H('#6a4428')); R.rect(277, yc - 14, 281, yc - 10, H('#7ab0e0')); R.rect(293, yc - 14, 297, yc - 10, H('#7ab0e0'));
  R.rect(252, yc - 22, 254, yc + 4, H('#5a3a24')); R.disco(253, yc - 28, 10, H('#3a7a3a')); R.disco(250, yc - 31, 7, H('#5a9a4a'));
  R.rect(18, Math.round(camino(18)) - 20, 20, Math.round(camino(18)) + 4, H('#5a3a24')); R.disco(19, Math.round(camino(18)) - 26, 9, H('#3a7a3a'));
});
const q4 = (t) => {
  const peor = @T(13.02), bueno = @T(15.50);
  R.copiar(valle());
  // el sol que sale en «something good»
  const sol = tramo(t, bueno - 0.4, bueno + 0.8); if (sol > 0) { const y = Math.round(64 - sol * 20); R.disco(250, y, 9, H('#fff0a0')); R.disco(250, y, 7, H('#ffffff')); for (let k = 0; k < 10; k++) { const a = k * 0.628 + t * 0.4; R.linea(Math.round(250 + Math.cos(a) * 12), Math.round(y + Math.sin(a) * 12), Math.round(250 + Math.cos(a) * 18), Math.round(y + Math.sin(a) * 18), H('#ffe890')); } luz(250, y, 80, 60, H('#fff4c0'), 0.3 * sol); }
  const NUB = [H('#ffffff'), H('#e8eef6'), H('#c4d2e2')];
  for (const [y, w, v, s] of [[28, 40, 3, 20], [50, 30, 5, 180], [40, 50, 2, 100]]) nube(((s + t * v) % 380) - 50, y, w, NUB, [0, 22, 319, 120]);
  // la nube de lluvia sobre el valle en «worst thing» (se va con el sol)
  const ll = tramo(t, peor - 0.4, peor + 0.3) * (1 - tramo(t, bueno - 0.6, bueno + 0.2));
  if (ll > 0) { const NO = [H('#8a8a9a'), H('#5a5a6a'), H('#3a3a4a')]; nube(120, 54 - (1 - ll) * 30, 64, NO); nube(146, 48 - (1 - ll) * 30, 40, NO);
    for (let k = 0; k < 40; k++) { const f = (t * 1.6 + hh(k, 1)) % 1, x = 116 + hh(k, 2) * 64, y = 62 + f * 70; if (y < camino(x) + 6 && bay(k, 1) < ll) R.linea(Math.round(x), Math.round(y), Math.round(x - 1), Math.round(y + 3), H('#7aa0d0')); }
    luz(150, 110, 70, 40, H('#2a3a5a'), 0.3 * ll); }
  // las matas que florecen en la loma de la derecha
  const fl = tramo(t, bueno, bueno + 1.2); for (let k = 0; k < 14; k++) { const x = 214 + k * 7 + Math.round(hh(k, 3) * 4), y = Math.round(camino(x)) + 10 + Math.round(hh(k, 4) * 10); R.linea(x, y, x, y - 3, H('#3a7a3a'));
    if (bay(k, 2) < fl) { R.disco(x, y - 4, 1.6, [H('#f05a7a'), H('#f8e050'), H('#ffffff'), H('#c86ae0')][k % 4]); ps(x, y - 4, H('#f8c040')); } }
  // los pájaros
  for (let k = 0; k < 3; k++) pajaro(((t * 16 + k * 50) % 260) + 20, 70 + k * 6 + Math.sin(t * 2 + k) * 2, t, H('#3a4a5a'), k);
  // la chica: baja al valle con la cabeza gacha bajo la lluvia y sube a la loma, contenta
  const u = tramo(t, P4 + 0.2, @T(16.70)), x = Math.round(lerp(20, 262, u)), s = Math.round(camino(x + 7)) + 4;
  const enLluvia = ll > 0.5 && x > 100 && x < 200;
  R.actor(EL.chicaHoy, x, s, t, { dir: 1, anda: u > 0 && u < 1, triste: enLluvia, sonrisa: t > bueno, brazos: t > bueno + 0.4 && t < bueno + 1.0 });
  if (enLluvia) { R.linea(x + 7, s - 22, x + 7, s - 30, K); R.poligono([[x - 3, s - 30], [x + 17, s - 30], [x + 7, s - 37]], H('#e85a5a')); R.linea(x - 3, s - 30, x + 17, s - 30, K); }
  // Atom luciérnaga la acompaña por encima
  T.AT.luciernaga(R, x + 10 + Math.sin(t * 1.5) * 4, s - 44 + Math.sin(t * 2.3) * 2, t, { dir: 1, brillo: 0.7, cara: enLluvia ? 'triste' : t > bueno ? 'sonrisa' : 'normal' });
};

// ── 5 · el salón de la abuela: la foto de la tormenta y la del sol ────────────────────────────────────────────────
const salaAbuela = () => horno('salaAbuela', () => {
  papel(0, 0, 319, 112, H('#e8c8a0'), H('#d8b890'), H('#f0d8b4'), 15);
  R.rect(0, 110, 319, 114, H('#8a5a34')); tablas(0, 115, 319, 179, [H('#b8885a'), H('#9a6a40'), H('#6a4428')], 8, 15);
  for (let y = 140; y < 180; y++) for (let x = 20; x < 200; x++) { const d = Math.hypot((x - 110) / 90, (y - 162) / 18); if (d >= 1) continue; const c = [H('#a83a3a'), H('#c86a3a'), H('#e8b860'), H('#a83a3a')][Math.floor(d * 4)]; R.pset(x, y, (x + y * 2) % 5 === 0 ? mez(c, K, 0.2) : c); }
  // las dos fotos grandes (la tormenta y el sol) y otras pequeñas
  const marco = (x0, y0, w, h, f) => { R.rect(x0 - 3, y0 - 3, x0 + w + 3, y0 + h + 3, K); R.rect(x0 - 2, y0 - 2, x0 + w + 2, y0 + h + 2, H('#8a5a2a')); R.rect(x0 - 2, y0 - 2, x0 + w + 2, y0 - 2, H('#b8864a')); R.recorte([x0, y0, x0 + w, y0 + h]); f(x0, y0, w, h); R.recorte(null); };
  marco(96, 30, 44, 34, (x0, y0, w, h) => { rampa(x0, y0, x0 + w, y0 + h, [H('#3a3a4a'), H('#5a5a6a')]); nube(x0 + 2, y0 + 8, 36, [H('#8a8a9a'), H('#6a6a7a'), H('#4a4a5a')]); for (let k = 0; k < 10; k++) R.linea(x0 + 4 + k * 4, y0 + 14, x0 + 2 + k * 4, y0 + 22, H('#7a9ac0'));
    R.rect(x0, y0 + h - 6, x0 + w, y0 + h, H('#3a4a3a')); R.rect(x0 + 18, y0 + h - 14, x0 + 21, y0 + h - 6, H('#c83a3a')); R.disco(x0 + 19.5, y0 + h - 16, 2, H('#f6c8a0')); R.linea(x0 + 24, y0 + 10, x0 + 21, y0 + 16, H('#f8f0a0')); R.linea(x0 + 21, y0 + 16, x0 + 25, y0 + 18, H('#f8f0a0')); });
  marco(152, 30, 44, 34, (x0, y0, w, h) => { rampa(x0, y0, x0 + w, y0 + h, [H('#6aaae8'), H('#b8dcf4')]); R.disco(x0 + 34, y0 + 9, 5, H('#f8d040')); R.rect(x0, y0 + h - 8, x0 + w, y0 + h, H('#6ab04a'));
    for (let k = 0; k < 8; k++) R.disco(x0 + 3 + k * 5, y0 + h - 7, 1, [H('#f05a7a'), H('#f8e050'), H('#ffffff')][k % 3]); R.rect(x0 + 18, y0 + h - 16, x0 + 21, y0 + h - 8, H('#c83a3a')); R.disco(x0 + 19.5, y0 + h - 18, 2, H('#f6c8a0')); R.rect(x0 + 15, y0 + h - 18, x0 + 16, y0 + h - 14, H('#f6c8a0')); R.rect(x0 + 23, y0 + h - 18, x0 + 24, y0 + h - 14, H('#f6c8a0')); });
  for (const [x, y, c] of [[208, 40, '#a8c8a0'], [208, 62, '#e8c8d8'], [74, 40, '#c8c8e8'], [74, 62, '#e8d8a8']]) marco(x, y, 12, 14, (x0, y0, w, h) => { R.rect(x0, y0, x0 + w, y0 + h, H(c)); R.disco(x0 + 6, y0 + 6, 2.4, H('#f6c8a0')); R.rect(x0 + 3, y0 + 9, x0 + 9, y0 + h, H('#5a6a9a')); });
  // la ventana al jardín, el sillón con el gato, la lámpara de pie y la estantería
  R.rect(236, 26, 300, 98, K); R.rect(237, 27, 299, 97, H('#f4ece0')); rampa(241, 31, 295, 93, [H('#8ac0e8'), H('#c8e4f4')]); R.rect(241, 76, 295, 93, H('#6aa84a'));
  for (const [x, r] of [[252, 10], [284, 12]]) { R.disco(x, 70, r, H('#3a7a3a')); R.disco(x - 2, 67, r * 0.6, H('#5a9a4a')); } for (let k = 0; k < 8; k++) R.disco(244 + k * 7, 86, 1.6, [H('#f05a7a'), H('#f8e050')][k % 2]);
  R.rect(267, 31, 268, 93, H('#f4ece0')); R.rect(241, 61, 295, 62, H('#f4ece0')); R.rect(232, 97, 304, 100, H('#d8c8b0'));
  R.rect(228, 112, 296, 152, K); R.rect(229, 113, 295, 151, H('#4a7a6a')); R.rect(233, 118, 291, 136, H('#5a8a7a')); R.rect(229, 113, 238, 151, H('#3a6a5a')); R.rect(286, 113, 295, 151, H('#3a6a5a')); for (const x of [232, 290]) R.rect(x, 152, x + 2, 158, K);
  R.rect(8, 40, 46, 152, K); R.rect(9, 41, 45, 151, H('#9a6a40')); for (const y of [66, 92, 118]) R.rect(9, y, 45, y + 2, H('#6a4428'));
  const LB = ['#a83a3a', '#3a6a9a', '#c8a040', '#4a8a5a', '#7a4a8a'].map(H); for (const [y0, y1] of [[43, 65], [69, 91], [95, 117]]) { let x = 11; while (x < 42) { const w = 2 + Math.floor(hh(x, y0, 2) * 3), h = 12 + Math.floor(hh(x, y0, 3) * 8); if (x + w > 43) break; R.rect(x, y1 - h, x + w - 1, y1, LB[Math.floor(hh(x, y0) * 5)]); x += w + 1; } }
  R.rect(56, 60, 58, 150, H('#3a3a3a')); R.poligono([[48, 60], [66, 60], [62, 46], [52, 46]], H('#f0d8a0')); R.rect(52, 150, 62, 152, H('#3a3a3a'));
});
const q5 = (t) => {
  const asi = @T(18.02), via = @T(19.20), satis = @T(21.38);
  R.copiar(salaAbuela());
  luz(57, 62, 40, 30, H('#ffe8a0'), 0.3); cono(268, 98, 179, 26, 60, H('#fff4d0'), 0.12);
  // el gato del sillón: respira y mueve la cola
  const gy = 112 + (Math.sin(t * 1.8) > 0 ? 1 : 0); R.disco(262, gy, 7, K); R.disco(262, gy, 6, H('#e8904a')); R.disco(270, gy - 3, 4.4, K); R.disco(270, gy - 3, 3.6, H('#f0a05a'));
  R.poligono([[267, gy - 6], [268, gy - 10], [270, gy - 6]], H('#d8803a')); R.poligono([[271, gy - 6], [273, gy - 10], [274, gy - 6]], H('#d8803a')); ps(269, gy - 3, K); ps(272, gy - 3, K);
  for (let i = 0; i < 9; i++) ps(254 - i, gy + 3 - Math.round(Math.sin(t * 2 + i * 0.4) * (i / 4)), H('#d8803a'));
  // la abuela cuenta: señala la tormenta en «that way»… y luego el sol; en «satisfied» se vuelve sonriente a sus nietos
  const vuelve = t > satis - 0.4;
  R.actor(EL.abuela, 136, 158, t, { dir: vuelve ? -1 : t > asi - 0.3 ? 1 : -1, dedo: t > asi - 0.3 && t < satis - 0.4, sonrisa: t > via || t < asi, habla: Math.sin(t * 7) > -0.2 && !vuelve });
  if (t > asi && t < via + 0.2) T.AT.anillo(R, 118, 47, 26, 21, t, tramo(t, asi, asi + 0.5));
  if (t > via && t < satis) T.AT.anillo(R, 174, 47, 26, 21, t, tramo(t, via, via + 0.5));
  if (t > via) luz(174, 47, 30, 24, H('#fff0a0'), 0.25);
  // los nietos escuchan en la alfombra: miran las fotos y luego a la abuela
  R.actor(EL.ninoCampo, 74, 164, t, { dir: 1, sonrisa: t > via, sorpresa: t > asi && t < via, salto: t > satis && t < satis + 0.5 ? 2 : 0 });
  R.actor(EL.ninaCampo, 96, 166, t, { dir: 1, sonrisa: t > via, habla: t < asi && Math.sin(t * 5) > 0.5 });
  if (t > satis) corazon(144, 120 - Math.round(tramo(t, satis, satis + 1.4) * 10), 4, H('#f05a7a'));
  // Atom en la estantería, sentado, asiente
  T.AT.atom(R, 26, 92, t, { pose: t > satis ? 'brazos' : 'quieto', dir: 1, cara: t > via ? 'sonrisa' : 'normal' });
};

// ── 6 · el huerto del barrio: cuidar de los demás ───────────────────────────────────────────────────────────────
const huerto = () => horno('huerto', () => {
  rampa(0, 0, 319, 100, [H('#6aa0e0'), H('#9ac4ec'), H('#d0e4f4')]);
  // las casas del barrio al fondo
  for (let k = 0; k < 8; k++) { const x = k * 42 - 6, h = 30 + Math.round(hh(k, 2) * 18), y = 102 - h, c = [H('#e8d4b8'), H('#c8a888'), H('#d8c8e0'), H('#b8c8a8')][k % 4];
    R.rect(x, y, x + 36, 102, K); R.rect(x + 1, y + 1, x + 35, 102, c); R.poligono([[x - 3, y + 1], [x + 18, y - 12], [x + 39, y + 1]], [H('#a84a3a'), H('#5a6478')][k % 2]); R.linea(x - 3, y + 1, x + 18, y - 12, K);
    for (const i of [6, 22]) { R.rect(x + i, y + 8, x + i + 7, y + 16, K); R.rect(x + i + 1, y + 9, x + i + 6, y + 15, H('#8ab0d8')); } }
  // la valla de madera
  R.rect(0, 100, 319, 118, H('#c8a878')); for (let x = 0; x < 320; x += 8) { R.rect(x, 98, x + 6, 118, K); R.rect(x + 1, 98, x + 5, 118, H('#d8b888')); R.rect(x + 1, 98, x + 1, 118, H('#e8d0a8')); } R.rect(0, 104, 319, 106, H('#a88658'));
  // la tierra, los bancales con lechugas, tomateras con su caña y la caseta de herramientas
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const q = hh(x >> 1, y >> 1, 18); R.pset(x, y, q > 0.8 ? H('#6a4a30') : q < 0.15 ? H('#9a7450') : H('#82603e')); }
  for (const [x0, y0, w] of [[10, 128, 90], [200, 132, 108]]) { R.rect(x0 - 2, y0 - 2, x0 + w + 2, y0 + 14, K); R.rect(x0 - 1, y0 - 1, x0 + w + 1, y0 + 13, H('#a87a4a')); R.rect(x0, y0, x0 + w, y0 + 6, H('#5a3a24'));
    for (let x = x0 + 5; x < x0 + w; x += 10) { R.disco(x, y0 + 1, 4, H('#4a9a3a')); R.disco(x - 1, y0, 2.6, H('#7ac85a')); } }
  for (const x of [130, 150, 170]) { R.rect(x, 108, x, 134, H('#8a6a44')); for (let k = 0; k < 5; k++) { R.disco(x + (k % 2 ? 3 : -3), 112 + k * 5, 2.4, H('#3a8a3a')); if (k % 2) R.disco(x + (k % 2 ? 4 : -4), 115 + k * 5, 1.8, H('#e8483a')); } }
  R.rect(262, 56, 316, 110, K); R.rect(263, 57, 315, 110, H('#6a8aa8')); for (let x = 264; x < 315; x += 5) R.rect(x, 57, x, 110, H('#5a7a98')); R.poligono([[258, 58], [289, 46], [320, 58]], H('#a84a3a'));
  R.rect(282, 76, 296, 110, H('#4a6a88')); R.rect(284, 64, 286, 74, H('#8a6a44')); R.rect(282, 62, 288, 64, H('#a8a8b0'));
  // delante: el sendero de losas, la carretilla con tierra, las calabazas, los girasoles y la manguera
  for (let k = 0; k < 9; k++) { const x = 12 + k * 34, y = 172 + (k % 2) * 3; R.disco(x, y, 9, K); R.disco(x, y, 8, H('#b8b0a0')); R.disco(x - 2, y - 2, 5, H('#c8c0b0')); }
  R.rect(236, 150, 270, 162, K); R.rect(237, 151, 269, 161, H('#5a7a9a')); R.rect(239, 149, 267, 152, H('#5a3a24')); R.disco(232, 164, 5, K); R.disco(232, 164, 4, H('#3a3a44')); R.linea(270, 154, 288, 166, K); R.linea(270, 155, 288, 167, H('#8a6a44'));
  for (const [x, y] of [[24, 152], [40, 156], [300, 150]]) { R.disco(x, y, 6, K); R.disco(x, y, 5, H('#e8883a')); R.rect(x - 1, y - 2, x - 1, y + 4, H('#c8682a')); R.rect(x + 2, y - 2, x + 2, y + 4, H('#c8682a')); R.rect(x, y - 8, x + 1, y - 5, H('#4a7a3a')); }
  for (const x of [112, 124]) { R.rect(x, 128, x + 1, 158, H('#4a7a3a')); R.disco(x, 124, 6, H('#8a5a2a')); for (let a = 0; a < 10; a++) R.disco(x + Math.cos(a * 0.63) * 6, 124 + Math.sin(a * 0.63) * 6, 2, H('#f8c830')); R.disco(x, 124, 3, H('#6a3a1a')); }
  for (let x = 140; x < 230; x++) ps(x, 164 + Math.round(Math.sin(x * 0.12) * 2), H('#3a8a4a'));
  R.rect(0, 0, 319, 0, H('#5a90d8'));
});
const q6 = (t) => {
  const ganas = @T(23.88), cuidar = @T(24.50);
  R.copiar(huerto());
  const NUB = [H('#ffffff'), H('#e8eef6'), H('#c4d2e2')];
  for (const [y, w, v, s] of [[30, 44, 3, 40], [50, 28, 5, 200], [40, 34, 2.4, 120]]) nube(((s + t * v) % 380) - 50, y, w, NUB, [0, 22, 319, 44]);
  for (let k = 0; k < 3; k++) pajaro(((t * 15 + k * 60) % 260) + 20, 60 + k * 6 + Math.sin(t * 2 + k) * 2, t, H('#3a4a5a'), k);
  // la abuela le da la regadera al niño en «more eager»; luego le lleva la cesta de tomates al vecino en «care for others»
  const da = t > ganas - 0.4, lleva = tramo(t, cuidar - 0.6, cuidar + 0.6), xa = Math.round(lerp(120, 186, ease(lleva)));
  const ra = R.actor(EL.abuela, xa, 160, t, { dir: 1, anda: lleva > 0 && lleva < 1, sostiene: !da ? [xa + 18, 146] : lleva > 0 ? [xa + 18, 146] : undefined, sonrisa: true, habla: Math.sin(t * 6) > 0.4 });
  const regadera = (x, y, inclina) => { R.rect(x - 5, y - 4, x + 4, y + 4, K); R.rect(x - 4, y - 3, x + 3, y + 3, H('#5aa0c8')); R.linea(x + 4, y - 1, x + 9, y - 5 + inclina * 4, K); R.linea(x + 4, y, x + 9, y - 4 + inclina * 4, H('#5aa0c8')); R.rect(x - 2, y - 7, x + 1, y - 4, K); };
  if (!da) regadera(ra.mano[0] + 3, ra.mano[1], 0);
  if (lleva > 0) { const [mx, my] = ra.mano; R.rect(mx - 6, my - 2, mx + 6, my + 6, K); R.rect(mx - 5, my - 1, mx + 5, my + 5, H('#c8a060')); for (let i = -4; i <= 4; i += 3) R.rect(mx + i, my - 1, mx + i, my + 5, H('#a8804a')); for (const i of [-3, 0, 3]) R.disco(mx + i, my - 2, 2, H('#e8483a')); }
  // el niño riega el bancal con la regadera (el agua cae)
  const rn = R.actor(EL.ninoCampo, 70, 156, t, { dir: 1, sostiene: da ? [86, 136] : undefined, sonrisa: da });
  if (da) { regadera(rn.mano[0] + 3, rn.mano[1], 1); for (let k = 0; k < 8; k++) { const f = (t * 2 + k / 8) % 1; ps(rn.mano[0] + 12 + f * 2, rn.mano[1] + f * 14, H('#a8d8f8')); } }
  // el vecino mayor, con bastón, recibe la cesta y sonríe
  R.actor(EL.vecino, 214, 160, t, { dir: -1, sonrisa: t > cuidar + 0.3, sostiene: t > cuidar + 0.6 ? [204, 146] : undefined });
  if (t > cuidar + 0.4 && t < cuidar + 1.8) corazon(222, 126 - Math.round(tramo(t, cuidar + 0.4, cuidar + 1.8) * 8), 3, H('#f05a7a'));
  // el perro que va y viene moviendo la cola
  const px = Math.round(150 + Math.sin(t * 0.8) * 40), pd = Math.cos(t * 0.8) > 0 ? 1 : -1, py = 170;
  R.rect(px - 8, py - 7, px + 8, py - 1, K); R.rect(px - 7, py - 6, px + 7, py - 2, H('#c8904a')); R.disco(px + pd * 8, py - 9, 4, K); R.disco(px + pd * 8, py - 9, 3.2, H('#d8a05a')); ps(px + pd * 10, py - 10, K); R.rect(px + pd * 6, py - 12, px + pd * 7, py - 10, H('#8a5a2a'));
  for (const i of [-6, -2, 3, 6]) R.rect(px + i, py - 1, px + i + 1, py + 1 + (Math.floor(t * 8) % 2 && i % 2 ? -1 : 0), H('#a8783a'));
  const cola = Math.sin(t * 12) > 0 ? 1 : -1; R.linea(px - pd * 8, py - 6, px - pd * 11, py - 10 + cola, H('#a8783a'));
  // Atom en la valla, balanceando los pies
  T.AT.atom(R, 248, 98, t, { pose: t > cuidar ? 'brazos' : 'quieto', dir: -1, cara: t > cuidar ? 'sonrisa' : 'normal' });
};

// ── 7 · la pausa otra vez: la línea del libro baja y sube ──────────────────────────────────────────────────────────
const q7 = (t) => {
  R.copiar(congelado()); pausa(t, 0, E.duracion);
  const ultimo = @T(27.30), exacto = @T(28.00), cap = @T(29.26), falta = @T(30.38);
  const bajo = ease(tramo(t, ultimo - 0.5, ultimo + 0.5)), sube = ease(tramo(t, exacto - 0.2, exacto + 0.8)), nueva = tramo(t, cap, cap + 0.5);
  const a = T.AT.atom(R, 262, 176, t, { s: 2, pose: t > falta ? 'brazos' : t > cap ? 'senala' : 'sostiene', dir: -1, cara: t > exacto ? 'sonrisa' : 'normal', habla: voz(t) });
  const y = 44 + Math.round(Math.sin(t * 2.4) * 1.5); luz(70, y + 30, 50, 34, H('#fff0c0'), 0.35 + 0.15 * nueva); T.AT.escalado(R, libro(bajo, sube, nueva, t), 44, 30, 26, y, 2);
  if (t > cap) T.AT.anillo(R, 88, y + 28, 20, 26, t, tramo(t, cap, cap + 0.5));
};

const efectos = [[0.05, 'tapestop'], [@T(2.46), 'pop'], [@T(4.70), 'interruptor'], [@T(5.10), 'papel'], [@T(9.80), 'papel'], [@T(10.50), 'lapiz'],
  [@T(13.00), 'lluvia', { dur: 2.4 }], [@T(15.50), 'pajaros'], [@T(18.10), 'golpecito'], [@T(21.40), 'pop'], [@T(24.60), 'guau'], [@T(26.90), 'lapiz'], [@T(29.30), 'papel'], [E.duracion - 0.3, 'interruptor']];
T.rodar(E, R, [[0, q1], [P2, q2], [P3, q3], [P4, q4], [P5, q5], [P6, q6], [P7, q7]],
  { efectos, año: (t) => (t >= P2 && t < P3 ? Math.round(1985 + ease(tramo(t, @T(4.82), @T(6.62))) * 16) : t >= P3 && t < P7 ? 2001 : 2025) });
'''

E = {}
E['vd-nina'] = ('La niña', '''// VD-NINA (frases 34–35), sin cartela; 2025 en la barra (2002 en el recuerdo del parto). Once planos, cortados en la palabra:
// 1. la sala del mundo de noche: Doom entra y señala el globo en «declares himself»; en «Emperor» caen las banderitas
//    verdes; Atom, a la izquierda, se sorprende; la placa del pie dice 2025;
// 2. (corta en «outlaws») la plaza de un pueblo en 2025: el soldado tira la lanza al cajón de la «X»; en «doctors» se
//    abre la clínica y entran una madre y su hijo; en «schooling» suena la campana y los niños corren a la escuela; en
//    «not everyone» Doom tiende una caja de regalo verde a un vecino, que se enfada y se va;
// 3. (corta en «And in one of the battles») la llanura de la batalla, de lejos, al atardecer: luces pequeñas; en «blows
//    up his own armor» un destello verde lejano y humo (sin heridas); Atom luciérnaga en la loma; los pájaros huyen;
// 4. (corta en «and it strikes») la repisa con el retrato de la familia: la luz verde entra por la ventana, la vela se
//    apaga; en «Valeria» la órbita rodea a la niña del retrato; en «Reed» y «Sue», a cada uno; Atom señala;
// 5. (corta en «the baby») el recuerdo, en sepia (2002): el cuarto del bebé; Doom alarga la mano sobre la cuna y caen
//    chispas verdes en «had saved»; en «first love» una figura de luz verde con chal se asoma a la ventana;
// 6. (corta en «And there») la alcoba de la niña, de noche: la niña dormida en la luz cálida de la lámpara; Doom entra
//    por la puerta y se para junto a la cama; en «no one expected» Atom «!»; Doom posa la mano en la manta;
// 7. (corta en «because») el espacio del juez: Doom entra y se arrodilla en «living tribunal»; en «judge of the
//    universe» se encienden las tres caras;
// 8. (corta en «and offers») la ofrenda: Doom arrodillado en su roca de luz; en «his own life» una llama verde le sale
//    del pecho y sube a las caras del juez; en «for hers» una luz cálida baja a la camilla de la niña;
// 9. (corta en «Valeria opens») el juez otra vez, con luz de alba: la niña abre los ojos y alza la cabeza; en «fades
//    away» Doom se deshace en polvo de luz;
// 10. (corta en «and in his will») el escritorio de Doom, con la máscara en su soporte: GAG, Atom rompe el sello del
//    testamento y el pergamino se desenrolla, cae de la mesa y rueda por el suelo; dentro, el castillo → la niña;
// 11. (corta en «trying») la alcoba al alba: Reed y Sue abrazan a la niña despierta; por la ventana suben una luz verde
//    y una blanca, juntas («save his mother»).''', _en('vd-nina', COMUN + NINA))

E['vd-redencion'] = ('Fíjate: la redención', '''// VD-REDENCION (frase 36), LA PAUSA «fíjate» de McAdams; 2025 en las pausas, 1985→2001 en la investigación. Siete planos:
// 1. la alcoba al alba de vd-nina CONGELADA en gris azulado; Atom al doble entra, señala en «notice this» la luz de la
//    ventana y en «psychologist» saca a color el libro abierto; la órbita lo rodea en «McAdams»;
// 2. (corta en «has spent») el despacho de las entrevistas: la grabadora gira; el calendario pasa de 1985 a 2001 en
//    «decades»; una mujer cuenta su vida (bocadillo con dibujos que cambian) y otros esperan en el banco;
// 3. (corta en «and he found») la mesa de las fichas, de cerca: llegan más fichas en «many»; la mano del investigador
//    dibuja en la ficha grande una línea que baja y sube en «redemption stories»;
// 4. (corta en «where the worst») el valle: la línea hecha camino; una chica baja al valle bajo la lluvia en «worst thing»
//    y sube a la loma en «something good», donde sale el sol y florecen las matas;
// 5. (corta en «and that people») el salón de la abuela: señala la foto de la tormenta y luego la del sol; en
//    «satisfied» sonríe a sus nietos y sale un corazón;
// 6. (corta en «with their lives») el huerto del barrio: la abuela le da la regadera a un niño y le lleva la cesta al
//    vecino en «care for others»; el perro;
// 7. (corta en «Maybe») la alcoba congelada otra vez: en el libro a color, en «last act» la línea baja hasta la
//    máscara y sube hasta la estrella en «exactly that»; en «chapter» la página nueva se enciende; vuelve el color.''',
                     _en('vd-redencion', COMUN + REDENCION))
