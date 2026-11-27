import re

# Grupo S5 del ep45: vd-mascara (frases 16–17) y vd-foco (frase 18, PAUSA que congela el último plano de vd-mascara).
# Las marcas reales de la voz (atomo/plato/escenas/marcas-ep45.json): «@s» en el cuerpo es un instante en segundos de
# escena; se escribe como en('marca', fracción) de la frase que suena.
_MARCAS = {
    'vd-mascara': [('tibet', 0.5, 18.039), ('ardiendo', 18.439, 49.05)],
    'vd-foco': [('fijate2', 0.2, 41.063)],
}


def _t(esc, cuerpo):
    marcas = _MARCAS[esc]

    def en(s):
        k, a, b = marcas[0]
        for m in marcas:
            if s >= m[1] - 0.05:
                k, a, b = m
        return "en('%s', %.4f)" % (k, (s - a) / (b - a))
    return re.sub(r'@(-?\d+(?:\.\d+)?)', lambda m: en(float(m.group(1))), cuerpo)


# ── utilidades comunes a las dos escenas (búferes fijos, tramas, piedra, madera, fuego, vapor, nieve, actor girado) ──
_UTIL = r'''
const K = hex('#140f1c'), BL = hex('#f4f0e6'), H = hex;
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const mez = (c1, c2, a) => { a = a < 0 ? 0 : a > 1 ? 1 : a; const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const ease = (u) => u * u * (3 - 2 * u);
const BUF = {};
const fijo = (k, f) => { let b = BUF[k]; if (!b) { b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); BUF[k] = b; } R.copiar(b); return b; };
const tine = (x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, a)); };
// un resplandor tramado hacia c (aplasta: alto / ancho)
const luz = (cx, cy, r, c, a, ap = 1) => { const ry = r * ap; for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, Math.ceil(cy + ry)); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(319, Math.ceil(cx + r)); x++) {
  const d = Math.hypot((x - cx) / r, (y - cy) / ry); if (d >= 1) continue; const g = (1 - d) * (1 - d) * a * (0.7 + 0.6 * bay(x, y)); if (g > 0.03) R.pset(x, y, mez(R.pget(x, y), c, g)); } };
// sillería: hiladas de alto a y piezas de largo l, cada piedra con su tono, su filo de luz y su junta
const sillar = (x0, y0, x1, y1, base, sem = 0, a = 8, l = 14) => { for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / a), jy = (y - y0) % a;
  for (let x = x0; x <= x1; x++) { const xs = x + (f % 2) * (l >> 1) + Math.floor(h2(f, sem) * 5), jx = ((xs % l) + l) % l, q = h2(Math.floor(xs / l), f, sem);
    let c = mez(base, q > 0.5 ? H('#fff4e0') : K, Math.abs(q - 0.5) * 0.36);
    if (jy === a - 1 || jx === 0) c = mez(base, K, 0.55); else if (jy === 0 || jx === 1) c = mez(c, H('#fff4e0'), 0.13);
    if (h2(x, y, sem + 7) > 0.93) c = mez(c, K, 0.2); else if (h2(x, y, sem + 8) > 0.96) c = mez(c, H('#ffffff'), 0.12);
    R.pset(x, y, c); } } };
// tablas de madera con vetas, nudos y juntas (vertical: tablas de pie)
const tablas = (x0, y0, x1, y1, base, sem = 0, ancho = 9, vertical = false) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
  const u = vertical ? x - x0 : y - y0, v = vertical ? y : x, k = Math.floor(u / ancho), ju = u % ancho, q = h2(k, 3, sem);
  let c = mez(base, q > 0.5 ? H('#ffe0b0') : K, Math.abs(q - 0.5) * 0.34);
  const veta = Math.sin(v * 0.23 + k * 3.1 + Math.sin(v * 0.05 + k) * 2.6 + ju * 0.6); if (veta > 0.84) c = mez(c, K, 0.24); else if (veta < -0.9) c = mez(c, H('#ffe8c0'), 0.1);
  const nx = Math.floor(h2(k, 9, sem) * 200) + x0, ny = vertical ? Math.floor(h2(k, 10, sem) * (y1 - y0)) + y0 : 0;
  if (!vertical && Math.abs(v - nx) < 3 && ju > 2 && ju < ancho - 2 && Math.hypot((v - nx) / 3, ju - ancho / 2) < 1.6) c = mez(c, K, 0.45);
  if (vertical && Math.abs(v - ny) < 3 && ju > 2 && ju < ancho - 2 && Math.hypot((v - ny) / 3, ju - ancho / 2) < 1.6) c = mez(c, K, 0.45);
  if (ju === ancho - 1) c = mez(base, K, 0.6); else if (ju === 0) c = mez(c, H('#ffe8c0'), 0.16);
  R.pset(x, y, c); } };
// una llama viva (base en (cx, y), medio ancho w, alto a)
const llama = (cx, y, w, a, t, sem = 0) => { for (let i = -w; i <= w; i++) { const f = 1 - Math.abs(i) / (w + 1), hh = a * f * (0.55 + 0.45 * Math.abs(Math.sin(t * 7.3 + i * 1.7 + sem) * Math.sin(t * 4.1 + i * 0.9)));
  for (let j = 0; j < hh; j++) { const u = j / hh, core = Math.abs(i) < w * 0.45 && u < 0.6; R.pset(cx + i, y - j, core ? (u < 0.35 ? H('#fff6c0') : H('#ffd060')) : u < 0.5 ? H('#ffa030') : u < 0.85 ? H('#f06a22') : H('#b02818')); } } };
// vaho que sube en bocanadas tramadas
const vaho = (x, y, t, n, alto, a = 1, sem = 0, ancho = 8) => { for (let k = 0; k < n; k++) { const u = (t * 0.45 + k / n + h2(k, sem) * 0.3) % 1, px = x + Math.sin(u * 5 + k * 2.1 + t * 0.7) * (1 + u * ancho) + (h2(k, sem + 1) - 0.5) * ancho, py = y - u * alto, r = 1 + u * 4;
  for (let j = -Math.ceil(r); j <= r; j++) for (let i = -Math.ceil(r); i <= r; i++) { const X = Math.round(px + i), Y = Math.round(py + j); if (i * i + j * j <= r * r && bay(X, Y) < (1 - u) * 0.75 * a) R.pset(X, Y, j < 0 ? H('#f4f2f4') : H('#c4c2cc')); } } };
// chispas que saltan de (x, y) desde t0
const chispas = (x, y, t, t0, n = 10, sem = 0, fuerza = 1) => { const u = t - t0; if (u < 0 || u > 0.8) return; for (let k = 0; k < n; k++) { const a = -Math.PI * (0.08 + 0.84 * h2(k, 5, sem)), v = (22 + h2(k, 6, sem) * 42) * fuerza, px = x + Math.cos(a) * v * u, py = y + Math.sin(a) * v * u + 70 * u * u;
  R.pset(px, py, u < 0.3 ? H('#fff4b0') : u < 0.6 ? H('#ffa040') : H('#c84a1a')); if (u < 0.45) R.pset(px - Math.cos(a) * 1.5, py - Math.sin(a) * 1.5, H('#f06a22')); } };
// copos que caen en una caja (vx, vy en px/s)
const copos = (t, n, sem, vx, vy, x0 = 0, y0 = 0, x1 = 319, y1 = 179, cols = [BL]) => { const w = x1 - x0, h = y1 - y0; for (let k = 0; k < n; k++) {
  const x = x0 + ((((h2(k, sem) * w + t * vx * (0.7 + h2(k, sem + 2) * 0.6) + Math.sin(t * 1.3 + k) * 3) % w) + w) % w), y = y0 + ((((h2(k, sem + 1) * h + t * vy * (0.7 + h2(k, sem + 3) * 0.6)) % h) + h) % h);
  R.pset(x, y, cols[k % cols.length]); if (k % 5 === 0) R.pset(x + 1, y, cols[k % cols.length]); } };
// el actor dibujado aparte y girado ang (rad, + cae a la derecha) alrededor de sus pies (px, py); o.capa(S) recibe el
// dibujo de 40 × 40 para retocarlo; devuelve el dibujo (Uint32Array 40 × 40, MARCA = vacío)
const MARCA = 0xff01fe03;
const actorAparte = (def, t, o = {}) => { const B = R.buf, copia = B.slice(); for (let y = 0; y < 40; y++) for (let x = 0; x < 40; x++) B[y * 320 + x] = MARCA;
  const r = R.actor(def, 12, 37, t, o); if (o.encima) o.encima(r); const S = new Uint32Array(1600); for (let y = 0; y < 40; y++) for (let x = 0; x < 40; x++) S[y * 40 + x] = B[y * 320 + x]; B.set(copia); return S; };
const girado = (def, ang, px, py, t, o = {}) => { const S = actorAparte(def, t, o), c = Math.cos(ang), s = Math.sin(ang), cx = 19.5, cy = 37;
  for (let dy = -40; dy <= 40; dy++) for (let dx = -40; dx <= 40; dx++) { const sx = Math.round(cx + c * dx + s * dy), sy = Math.round(cy - s * dx + c * dy); if (sx < 0 || sx > 39 || sy < 0 || sy > 39) continue; const v = S[sy * 40 + sx]; if (v !== MARCA) R.pset(px + dx, py + dy, v); }
  return S; };
// la máscara de hierro puesta en la cara de un actor (cab = r.cabeza; calor 0–1)
const mascaraPuesta = (cab, dir, calor, t, s = 0.72) => T.c_mascara(R, cab[0] + dir * 1, cab[1] + 7, calor, s, t);
'''

# ── el último plano de vd-mascara (la tina), común a las dos escenas: vd-foco lo congela ──
_TINA = r'''
// LA TINA DE TEMPLAR DE CERCA (fondo local): el muro de la forja con la luz del horno, que queda a la izquierda fuera del
// plano; la balda de tarros, las herramientas colgadas, el farol que se mece, el ventanuco con la nieve; delante, la tina
// de duelas con sus aros de hierro y el agua que refleja la máscara. Victor, detrás de la tina (de cintura para arriba),
// se mira; levanta el puño y golpea el agua en «imperfect»: el reflejo se rompe en ondas.
const tinaFija = () => fijo('tina', () => {
  sillar(0, 0, 319, 112, H('#5a4a44'), 41, 9, 17);
  // la luz del horno, que entra por la izquierda, y la sombra de la esquina de la derecha
  for (let y = 0; y < 113; y++) for (let x = 0; x < 320; x++) { const g = Math.max(0, 1 - Math.hypot((x + 30) / 260, (y - 90) / 150)); if (g > 0) R.pset(x, y, mez(R.pget(x, y), H('#f08a3a'), g * 0.5 * (0.8 + 0.4 * bay(x, y)))); if (x > 250 && bay(x, y) < (x - 250) / 140) R.pset(x, y, mez(R.pget(x, y), K, 0.3)); }
  // la viga del techo y sus canes
  R.rect(0, 0, 319, 7, H('#2a1a14')); tablas(0, 1, 319, 6, H('#4a3020'), 44, 6); for (const x of [56, 150, 244]) { R.rect(x, 7, x + 9, 13, H('#2a1a14')); R.rect(x + 1, 8, x + 8, 12, H('#5a3a24')); }
  // el ventanuco con la noche y la nieve (x 214–252, y 22–56), con su derrame de piedra y el alféizar nevado
  R.rect(210, 18, 256, 60, H('#2a2026')); R.rect(212, 20, 254, 58, H('#3e3236'));
  for (let y = 22; y <= 56; y++) for (let x = 214; x <= 252; x++) R.pset(x, y, mez(H('#14183a'), H('#2a3466'), (y - 22) / 34 + (bay(x, y) - 0.5) * 0.2));
  R.poligono([[214, 56], [226, 40], [236, 47], [246, 36], [252, 44], [252, 56]], H('#4a5478')); R.poligono([[226, 40], [229, 44], [223, 45]], H('#c8d0e8')); R.poligono([[246, 36], [249, 41], [243, 41]], H('#c8d0e8'));
  R.rect(233, 22, 233, 56, H('#2a1a14')); R.rect(214, 39, 252, 39, H('#2a1a14')); R.rect(210, 57, 256, 60, H('#e8ecf4')); R.rect(210, 60, 256, 61, H('#8a8a9a'));
  // la balda de tarros y cuencos (x 20–120, y 46)
  R.rect(18, 46, 124, 49, H('#2a1a14')); R.rect(19, 46, 123, 47, H('#7a5232')); for (const x of [26, 112]) { R.rect(x, 49, x + 2, 56, H('#2a1a14')); }
  [[24, 10, '#7a4a2a'], [38, 13, '#4a5a6a'], [52, 8, '#a8743c'], [64, 11, '#6a3a2a'], [80, 9, '#5a6a4a'], [94, 14, '#8a5a3a'], [108, 7, '#c8a060']].forEach(([x, a, c], k) => {
    R.rect(x - 1, 45 - a, x + 7, 45, K); R.rect(x, 46 - a, x + 6, 45, H(c)); R.rect(x, 46 - a, x + 1, 45, mez(H(c), H('#ffffff'), 0.25)); R.rect(x + 5, 46 - a, x + 6, 45, mez(H(c), K, 0.35));
    if (k % 2) { R.rect(x + 1, 44 - a, x + 5, 45 - a, H('#3a2a20')); } });
  // las herramientas colgadas (tenazas, un martillo, un cincel y un aro) en sus clavos, x 40–200, y 62–104
  R.rect(36, 62, 200, 64, H('#3a2418')); for (let x = 44; x < 200; x += 26) R.rect(x, 63, x + 1, 66, H('#8a8e9e'));
  R.linea(46, 66, 40, 102, H('#22222c')); R.linea(48, 66, 54, 102, H('#22222c')); R.linea(47, 66, 41, 102, H('#6a6e7c')); R.linea(49, 66, 55, 102, H('#6a6e7c'));
  R.rect(70, 66, 72, 96, H('#7a5232')); R.rect(64, 96, 78, 103, H('#22222c')); R.rect(65, 97, 77, 99, H('#8a8e9e'));
  R.rect(97, 66, 99, 90, H('#8a8e9e')); R.rect(96, 90, 100, 93, H('#22222c'));
  for (let a = 0; a < 6.28; a += 0.05) { R.pset(Math.round(125 + Math.cos(a) * 11), Math.round(82 + Math.sin(a) * 11), H('#22222c')); R.pset(Math.round(125 + Math.cos(a) * 10), Math.round(82 + Math.sin(a) * 10), H('#6a6e7c')); }
  R.linea(150, 66, 146, 100, H('#22222c')); R.linea(151, 66, 147, 100, H('#a8743c')); R.rect(142, 96, 152, 104, H('#22222c')); R.rect(143, 97, 151, 100, H('#6a6e7c'));
  R.rect(174, 66, 176, 86, H('#a8743c')); R.poligono([[168, 86], [182, 86], [178, 100], [172, 100]], H('#22222c')); R.poligono([[170, 87], [180, 87], [177, 98], [173, 98]], H('#5a5e6e'));
  // el suelo de losas, con la luz del horno y el hollín
  for (let y = 113; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 113) / (6 + (y - 113) * 0.12)), xs = x + fila * 13, j = (y - 113) % 9 === 0 || xs % 34 < 1;
    let c = mez(H('#4a3a34'), H('#2a1e1c'), (y - 113) / 90 + (h2(Math.floor(xs / 34), fila, 47) - 0.5) * 0.3); if (j) c = mez(c, K, 0.5); if (h2(x, y, 48) > 0.95) c = mez(c, K, 0.25);
    const g = Math.max(0, 1 - Math.hypot((x + 20) / 240, (y - 120) / 90)); R.pset(x, y, mez(c, H('#f08a3a'), g * 0.4)); }
  R.rect(0, 112, 319, 113, H('#2a1a14'));
  // un saco de carbón y unas barras de hierro apoyadas a la derecha; el cubo de agua a la izquierda
  R.poligono([[268, 150], [262, 112], [272, 100], [290, 104], [300, 150]], H('#2a2018')); R.poligono([[270, 148], [265, 113], [273, 103], [288, 106], [297, 148]], H('#5a4632'));
  for (let k = 0; k < 9; k++) R.pset(268 + h2(k, 51) * 26, 112 + h2(k, 52) * 34, H('#3a2c20'));
  for (let k = 0; k < 4; k++) R.linea(302 + k * 4, 152, 296 + k * 5, 70, k % 2 ? H('#6a6e7c') : H('#3a3c48'));
  // el yunque viejo en su tocón (x 54–92), el delantal de cuero colgado y chatarra por el suelo
  R.rect(62, 146, 84, 166, K); R.rect(63, 147, 83, 165, H('#6a4228')); for (let y = 149; y < 165; y += 4) R.linea(64, y, 82, y + 1, H('#4a2a18'));
  R.poligono([[52, 138], [96, 138], [90, 146], [58, 146]], K); R.poligono([[53, 139], [95, 139], [89, 145], [59, 145]], H('#5a5e6e')); R.rect(53, 139, 95, 139, H('#c8ccd8')); R.poligono([[96, 139], [106, 141], [96, 143]], H('#5a5e6e'));
  R.rect(236, 70, 238, 74, H('#8a8e9e')); R.poligono([[228, 74], [246, 74], [250, 110], [224, 110]], K); R.poligono([[229, 75], [245, 75], [248, 109], [226, 109]], H('#7a4a2a')); R.rect(229, 75, 245, 77, H('#5a3018')); R.rect(232, 92, 242, 100, H('#6a3a20'));
  for (let k = 0; k < 9; k++) { const x = 20 + h2(k, 46) * 280, y = 160 + h2(k, 45) * 18; if (x > 100 && x < 224) continue; R.rect(Math.round(x), Math.round(y), Math.round(x) + 4, Math.round(y), H('#5a5e6e')); R.pset(Math.round(x) + 1, Math.round(y) - 1, H('#9a9eae')); }
  R.rect(22, 136, 48, 160, K); R.rect(23, 137, 47, 159, H('#7a5232')); R.rect(23, 141, 47, 142, H('#3a3c48')); R.rect(23, 153, 47, 154, H('#3a3c48')); R.rect(24, 137, 46, 139, H('#2a4a5a'));
});
// la tina (delante de Victor): duelas, aros y el agua; ondas: amplitud de las ondas; refl: el reflejo (Uint32Array 40×40)
const TX = 162, TY = 147, TRX = 54, TRY = 7;
let RX0 = 130;
const tinaDelante = (t, ondas, refl, golpe) => {
  // el agua: elipse con el reflejo del horno y del muro
  for (let y = TY - TRY; y <= TY + TRY; y++) for (let x = TX - TRX; x <= TX + TRX; x++) { const d = Math.hypot((x - TX) / TRX, (y - TY) / TRY); if (d > 1) continue;
    const w = Math.sin(x * 0.35 + t * 3) * 0.5 + Math.sin(Math.hypot(x - TX, (y - TY) * 5) * 0.5 - t * 9) * ondas;
    let c = mez(H('#14262e'), H('#2a4a52'), (y - TY + TRY) / (2 * TRY) * 0.7 + w * 0.12); if (x < TX - 10 && bay(x, y) < (TX - x) / 160) c = mez(c, H('#f08a3a'), 0.35 + w * 0.1);
    if (((x + Math.round(w * 2)) % 11 === 0) && y % 3 === 0) c = mez(c, H('#8ab0b8'), 0.4); R.pset(x, y, c); }
  // el reflejo de Victor: su dibujo volteado, que tiembla con las ondas, recortado a la elipse del agua
  if (refl) for (let j = 0; j < 22; j++) for (let i = 0; i < 40; i++) { const v = refl[(37 - 22 + j) * 40 + i]; if (v === MARCA) continue;
    const ox = Math.round(Math.sin((j + t * 6) * 0.9) * (0.6 + ondas * 4)), X = RX0 + i + ox, Y = TY - TRY + 1 + Math.round((21 - j) * 0.62) + Math.round(ondas * Math.sin(i * 0.8 + t * 11));
    if (Math.hypot((X - TX) / TRX, (Y - TY) / TRY) < 0.95 && bay(X, Y) < 0.8 - ondas * 0.9) R.pset(X, Y, mez(v, H('#14262e'), 0.45)); }
  // las ondas que se abren desde el golpe
  if (golpe != null && t > golpe) for (let k = 0; k < 3; k++) { const u = (t - golpe) * 22 - k * 9; if (u < 2 || u > 70) continue;
    for (let a = 0; a < 6.28; a += 0.02) { const X = Math.round(TX + 6 + Math.cos(a) * u), Y = Math.round(TY + 1 + Math.sin(a) * u * TRY / TRX * 1.2); if (Math.hypot((X - TX) / TRX, (Y - TY) / TRY) < 0.97) R.pset(X, Y, mez(H('#cfe8f0'), H('#2a4a52'), u / 80)); } }
  // el borde de la tina y las duelas, con los aros de hierro y su remache
  for (let a = 0; a < 6.283; a += 0.01) { const X = Math.round(TX + Math.cos(a) * (TRX + 2)), Y = Math.round(TY + Math.sin(a) * (TRY + 2)); R.rect(X, Y - 1, X, Y + 1, H('#3a2414')); if (Math.sin(a) < 0) R.pset(X, Y - 1, H('#c89a5a')); }
  for (let y = TY; y <= 178; y++) { const w = TRX + 2 - Math.round((y - TY) * 0.08); for (let x = TX - w; x <= TX + w; x++) { if (y < TY + Math.sqrt(Math.max(0, 1 - ((x - TX) / (TRX + 2)) ** 2)) * (TRY + 2)) continue;
    const u = (x - (TX - w)) / (2 * w), dv = Math.floor(u * 14), ju = (u * 14) % 1; let c = mez(H('#8a5a32'), H('#3a2414'), Math.abs(u - 0.38) * 1.3 + (h2(dv, 1, 49) - 0.5) * 0.2);
    if (ju < 0.08) c = mez(c, K, 0.5); if (Math.sin(y * 0.4 + dv * 2) > 0.92) c = mez(c, K, 0.15); if (x < TX - 30 && bay(x, y) < 0.3) c = mez(c, H('#f08a3a'), 0.25); R.pset(x, y, c); } }
  for (const ay of [158, 170]) { const w = TRX + 2 - Math.round((ay - TY) * 0.08); for (let x = TX - w; x <= TX + w; x++) { const yy = ay + Math.round(Math.sqrt(Math.max(0, 1 - ((x - TX) / w) ** 2)) * 5); R.rect(x, yy, x, yy + 3, mez(H('#4a4c58'), K, Math.abs(x - TX + 20) / 120)); R.pset(x, yy, H('#9a9eae')); }
    for (const dx of [-40, 0, 40]) R.pset(TX + dx, ay + 4, H('#d8dce8')); }
};
// la tina entera en el instante t, con los tiempos T10 (ini, mira, puno, golpe, vuelve)
const tinaPlano = (t, T10) => {
  tinaFija();
  // el farol colgado que se mece, con su luz; las pavesas que vienen del horno; el vaho de la nieve en el ventanuco
  const fa = Math.sin(t * 1.4) * 0.12, fx = 262 + Math.round(Math.sin(fa) * 30), fy = 46 + Math.round(Math.cos(fa) * 30 - 30) + 30;
  R.linea(262, 14, fx, fy - 8, H('#22222c')); R.rect(fx - 4, fy - 8, fx + 4, fy + 4, K); R.rect(fx - 3, fy - 7, fx + 3, fy + 3, H('#f8c860')); R.rect(fx - 1, fy - 5, fx + 1, fy + 1, H('#fff4c0')); R.rect(fx - 4, fy - 9, fx + 4, fy - 8, H('#3a3c48'));
  luz(fx, fy, 26, H('#f8c860'), 0.35 + Math.sin(t * 9) * 0.04);
  copos(t, 14, 61, -6, 14, 214, 22, 252, 56, [BL, H('#a8b4d8')]);
  for (let k = 0; k < 7; k++) { const u = (t * 0.18 + k / 7) % 1; tine(8 + u * 300 + Math.sin(t + k * 2) * 6, 100 - u * 80 + Math.sin(u * 9 + k) * 6, H('#ffb050'), 0.9 - u * 0.6); }
  const golpe = T10.golpe, sube = tramo(t, T10.puno, T10.puno + 0.5), baja = tramo(t, golpe - 0.12, golpe), vuelve = t > T10.vuelve;
  const inclina = tramo(t, T10.mira, T10.mira + 0.6), dir = vuelve ? -1 : 1;
  // Victor, detrás de la tina: la máscara ya fría; el puño arriba y luego al agua
  const vx = 140 + Math.round(inclina * 3), suelo = 141 + Math.round(inclina * 1); RX0 = vx - 12;
  const puno = sube > 0 && !vuelve && t < golpe + 0.4 ? [vx + 17, Math.round(lerp(lerp(140, 116, ease(sube)), 145, baja))] : undefined;
  const o = { dir, sostiene: puno, enfado: sube > 0, triste: vuelve, encima: (r) => mascaraPuesta(r.cabeza, dir, 0.08, t) };
  const r = R.actor(EL.doomJovenDD, vx, suelo, t, o); mascaraPuesta(r.cabeza, dir, 0.08, t);
  // el reflejo (el mismo dibujo, aparte) y la tina por delante
  const refl = actorAparte(EL.doomJovenDD, t, o);
  const ondas = t > golpe ? Math.max(0.12, 1 - (t - golpe) * 0.5) * 0.8 : 0.05 + inclina * 0.05;
  tinaDelante(t, ondas, refl, golpe);
  // el puño que baja al agua (la mano canónica, sin manga: el brazo lo tapa el borde) y las gotas que saltan
  if (t > golpe && t < golpe + 1.2) for (let k = 0; k < 16; k++) { const u = (t - golpe) * (0.8 + h2(k, 3) * 0.6), a = -Math.PI * (0.15 + 0.7 * h2(k, 4)), v = 30 + h2(k, 5) * 40, X = TX + 6 + Math.cos(a) * v * u, Y = TY + Math.sin(a) * v * u + 90 * u * u; if (Y < TY + 4) { R.pset(X, Y, H('#cfe8f0')); R.pset(X, Y + 1, H('#6a9aa8')); } }
  // vaho del agua templada
  vaho(TX - 30, TY - 6, t, 5, 30, 0.45, 62, 10); vaho(TX + 34, TY - 6, t + 2, 4, 26, 0.4, 63, 10);
};
'''

E = {}
E['vd-mascara'] = ('La máscara', '''// VD-MASCARA (frases 16–17), sin año salvo el dibujo de 1962. Diez planos de 3,9–6,0 s, cortados en la palabra inglesa:
// 1 «Expelled and adrift» el mapa de papel del mundo: la «X» en la universidad; la ruta de pasos cruza el mar, Latveria y
//   Asia hasta el Tíbet; la chincheta cae en las montañas; Atom luciérnaga sigue la ruta;
// 2 «collapses» el Tíbet en ventisca: Victor (con capucha) llega tambaleándose y cae en la nieve en «snow»; la nieve lo
//   va cubriendo; suena la campana; dos monjes bajan del monasterio con una manta y lo levantan en «take him in»;
// 3 «and look after him» la sala de los textos del monasterio: el monje le da un cuenco humeante; el lama saca un rollo
//   de la balda y lo despliega en la mesa en «learns»; Victor deja el cuenco y se acerca;
// 4 «and with their help» la forja de noche: Victor martillea una pieza de la armadura (tres golpes en «forges a suit of
//   armor»), la deja en la mesa; el monje saca del horno la máscara al rojo y la pone en el yunque en «mask»;
// 5 «And here comes the saddest» el yunque de cerca: el martillo del monje da dos golpes a la máscara; Atom luciérnaga
//   la mira triste; el monje trae un cazo de agua para enfriarla en «most often»;
// 6 «wait for the metal to cool» la forja de lado: Victor rechaza el cazo, coge la máscara al rojo y se la pone en «puts
//   the mask on» (destello, vapor; su sombra en el muro); el monje suelta el cazo;
// 7 «and the scar becomes» el patio del monasterio de noche: Victor sale por la puerta con la máscara; los monjes bajan la
//   mirada en «almost no one»; se va y la puerta se cierra en «see again»;
// 8 «The curious thing» 1962: la mesa de dibujo: la mano dibuja la figura con capa y máscara; en «differently» dibuja al
//   margen una cabecita con una cicatriz mínima; la órbita de Atom la rodea;
// 9 «with a scar so small» GAG: en la mesa de la armadura, Atom encuentra una máscara de su tamaño, se la pone, solo ve
//   con un ojo y se choca con el casco en «notice it»;
// 10 «couldn't bear» la tina de templar: Victor se mira en el agua, levanta el puño y la golpea en «imperfect».''', _t('vd-mascara', "import { equirect, pintar, mapaPapel, PAPEL } from '/atomo/plato/escenas/ov-mapas.js';\nimport { TIERRA } from '/atomo/plato/escenas/geo-ov.js';\n" + _UTIL + _TINA + r'''
const P2 = @3.94, P3 = @8.96, P4 = @12.72, P5 = @18.44, P6 = @23.80, P7 = @29.08, P8 = @34.68, P9 = @40.66, P10 = @44.80;

// ── 1 · el mapa de papel del mundo: de la universidad al Tíbet ─────────────────────────────────────────────────
const PM = equirect([0, 0, 320, 180], [-82, 106, -14, 92]);
const RUTA1 = (() => { const W = [[-74, 41], [-60, 44], [-40, 47], [-20, 47], [-6, 44], [10, 45], [22, 46], [29, 41], [40, 39], [51, 36], [62, 34], [72, 33], [80, 31], [88, 30], [91, 30]].map((p) => PM(p));
  const out = []; for (let i = 0; i < W.length - 1; i++) for (let k = 0; k < 6; k++) { const u = k / 6; out.push([Math.round(lerp(W[i][0], W[i + 1][0], u)), Math.round(lerp(W[i][1], W[i + 1][1], u) + Math.sin((i * 6 + k) * 0.7) * 1.2)]); } out.push(W[W.length - 1].map(Math.round)); return out; })();
const enRuta1 = (u) => { const f = Math.max(0, Math.min(RUTA1.length - 1, u * (RUTA1.length - 1))), i = Math.floor(f), j = Math.min(RUTA1.length - 1, i + 1), g = f - i; return [lerp(RUTA1[i][0], RUTA1[j][0], g), lerp(RUTA1[i][1], RUTA1[j][1], g)]; };
const NY1 = PM([-74, 41]).map(Math.round), LV1 = PM([22, 46]).map(Math.round), TB1 = PM([91, 30]).map(Math.round);
let MARES1 = null;
const mapa1 = () => { const b = fijo('mapa1', () => { mapaPapel(R, 0, PM, { reticula: 15, rosa: [44, 150], mesa: 7 }); R.recorte([7, 7, 312, 172]);
    pintar(R, PM, TIERRA, (x, y) => (h2(x >> 1, y, 3) < 0.08 ? PAPEL.tierraS : PAPEL.tierra), { somera: PAPEL.somera });
    R.recorte(null);
    // las montañas de tinta: el Himalaya, el Cáucaso, los Alpes, los Cárpatos
    for (const [lon, lat, n, s] of [[78, 32, 9, 5], [86, 29, 8, 6], [44, 42, 3, 3], [10, 46.5, 3, 3], [25, 47, 2, 3]]) for (let k = 0; k < n; k++) { const [x, y] = PM([lon + (k - n / 2) * 1.6, lat + (k % 2) * 1.4]).map(Math.round), a = s + (k % 3 === 1 ? 2 : 0);
      R.poligono([[x - a, y + 2], [x, y + 2 - a * 1.4], [x + a, y + 2]], PAPEL.tierraS); R.linea(x - a, y + 2, x, y + 2 - a * 1.4, PAPEL.costa); R.linea(x, y + 2 - a * 1.4, x + a, y + 2, PAPEL.costa); R.linea(x, y + 2 - a * 1.4, x + 1, y + 1, H('#f4f0e6')); }
    // Latveria (la manchita verde y su castillito, como en la beca) y la universidad (columnas de tinta)
    for (let y = LV1[1] - 4; y <= LV1[1] + 3; y++) for (let x = LV1[0] - 6; x <= LV1[0] + 5; x++) if (Math.hypot((x - LV1[0]) / 6, (y - LV1[1]) / 4) < 1 && bay(x, y) < 0.6) R.pset(x, y, H('#8ab88a'));
    R.rect(LV1[0] - 2, LV1[1] - 11, LV1[0] + 2, LV1[1] - 7, H('#4a3e34')); R.rect(LV1[0] - 3, LV1[1] - 13, LV1[0] - 2, LV1[1] - 7, H('#4a3e34')); R.rect(LV1[0] + 2, LV1[1] - 13, LV1[0] + 3, LV1[1] - 7, H('#4a3e34'));
    { const x = NY1[0] - 6, y = NY1[1] - 22; R.rect(x - 1, y - 1, x + 15, y + 12, K); R.rect(x, y, x + 14, y + 11, PAPEL.tierra); R.poligono([[x + 1, y + 4], [x + 7, y], [x + 13, y + 4]], H('#4a3e34')); for (const cx of [x + 2, x + 6, x + 10]) R.rect(cx, y + 5, cx + 1, y + 9, H('#4a3e34')); R.rect(x + 1, y + 10, x + 13, y + 10, H('#4a3e34')); }
    // el papel viejo: cercos de taza, una mancha de humedad y un doblez
    for (let a = 0; a < 6.28; a += 0.07) R.pset(Math.round(150 + Math.cos(a) * 12), Math.round(140 + Math.sin(a) * 10), H('#a8987a'));
    for (let y = 8; y < 172; y++) if (bay(160, y) < 0.5) R.pset(160, y, mez(R.pget(160, y), K, 0.12));
  }); if (!MARES1) { MARES1 = []; for (let k = 0; k < 500 && MARES1.length < 30; k++) { const x = 12 + Math.floor(h2(k, 61) * 296), y = 12 + Math.floor(h2(k, 62) * 156); if (b[y * 320 + x] === PAPEL.mar && b[y * 320 + x + 6] === PAPEL.mar && !(x > 270 && y < 48) && !(x < 175 && y < 22)) MARES1.push([x, y]); } } };
const p1 = (t) => { mapa1();
  for (const [x, y] of MARES1) { const f = Math.floor(t * 2 + x) % 3; R.pset(x + f, y, H('#6c8aa2')); R.pset(x + f + 1, y - 1, H('#6c8aa2')); R.pset(x + f + 2, y, H('#6c8aa2')); }
  // un barquito que cruza el Atlántico y la mariquita del canto de la mesa
  R.icono('barco', Math.round(lerp(70, 40, t / 4)), 96, H('#4a3e34'), H('#a4c0d0'));
  const mq = Math.round(lerp(40, 280, (t / 7) % 1)); R.rect(mq, 174, mq + 3, 176, K); R.rect(mq + 1, 174, mq + 3, 175, H('#e8303a')); R.pset(mq + 2, 174, K);
  // «Expelled»: la «X» roja cae sobre la universidad
  const ex = tramo(t, @0.5, @0.75); if (ex > 0) { const s = Math.round(lerp(3, 2, ex)); R.icono('X', NY1[0] - 4, NY1[1] - 20 - Math.round((1 - ex) * 8), H('#c8302a'), H('#5a1410'), s); }
  // la ruta de pasos, del mar al Tíbet («wanders the world»), con el caminante encapuchado en la punta
  const u = ease(tramo(t, @1.0, @3.6)); if (u > 0) { R.ruta(RUTA1, u, H('#c8302a'));
    const [x, y] = enRuta1(u), X = Math.round(x), Y = Math.round(y), p = Math.floor(t * 6) % 2;
    if (u < 1) { R.rect(X - 2, Y - 9, X + 2, Y - 1, K); R.rect(X - 1, Y - 8, X + 1, Y - 2, H('#2a5a32')); R.pset(X, Y - 7, K); R.pset(X - 1 + p, Y, K); R.pset(X + 1 - p, Y, K); R.pset(X + 2, Y - 4, H('#6a5030')); R.linea(X + 3, Y - 6, X + 3, Y, H('#6a5030')); }
    // Atom, de luciérnaga, va detrás del caminante
    const [ax, ay] = enRuta1(Math.max(0, u - 0.08)); T.AT.luciernaga(R, ax - 4, ay - 18 + Math.sin(t * 3) * 2, t, { dir: 1, brillo: 0.7, cara: u >= 1 ? 'sorpresa' : 'normal' }); }
  // en el Tíbet: la chincheta y un copo de nieve que late
  T.chincheta(R, TB1[0], TB1[1], t, H('#2e7a3e'), { baja: tramo(t, @3.3, @3.7), pulso: t > @3.7 });
  if (t > @3.6) { const s = 1 + (Math.floor(t * 4) % 2), cx = TB1[0] - 14, cy = TB1[1] - 16; for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; R.linea(cx, cy, Math.round(cx + Math.cos(a) * (3 + s)), Math.round(cy + Math.sin(a) * (3 + s)), H('#ffffff')); } R.pset(cx, cy, H('#a8c0e8')); }
};

// ── 2 · el Tíbet en ventisca: cae en la nieve; los monjes lo encuentran ─────────────────────────────────────────
const p2 = (t) => {
  const vent = lerp(0.75, 0.3, tramo(t, @6.2, P3)), o = { encuadre: 'montana', nieve: 0.9, ventisca: vent };
  T.tibet(R, t, o);
  // la ventisca: el cielo se cierra en gris y la nieve cruza en rachas
  T.tinte(R, 0, 120, [196, 202, 214], 0.42 * vent);
  for (let k = 0; k < 70; k++) { const x = ((h2(k, 31) * 360 - t * (120 + h2(k, 32) * 80)) % 360 + 360) % 360 - 20, y = ((h2(k, 33) * 200 + t * (50 + h2(k, 34) * 30)) % 200) - 10; R.linea(Math.round(x), Math.round(y), Math.round(x + 4), Math.round(y - 2), k % 3 ? H('#ffffff') : H('#d8e0ec')); }
  // Victor llega tambaleándose y cae en «snow»; en «take him in» lo van levantando
  const llega = tramo(t, P2, @4.86), vx = Math.round(lerp(-18, 96, llega)) + Math.round(Math.sin(t * 7) * (llega < 1 ? 1 : 0));
  const cae = ease(tramo(t, @4.86, @5.3)), alza = ease(tramo(t, @8.45, P3 + 0.4)), ang = (cae * 1.47 - alza * 0.55) + (llega < 1 ? Math.sin(t * 5) * 0.12 : 0);
  const S = girado(EL.doomJovenDD, ang, vx + 7, 152 - Math.round(7 * Math.sin(Math.max(0, ang))), t, { anda: llega < 1, quieto: llega >= 1 });
  // la nieve que lo va cubriendo
  const cubre = tramo(t, @5.3, @8.4); if (cubre > 0 && alza < 0.5) for (let k = 0; k < 40 * cubre; k++) { const x = vx + 2 + Math.floor(h2(k, 71) * 30), y = 152 - 14 + Math.floor(h2(k, 72) * 6); if (R.pget(x, y + 2) !== R.pget(x, y)) R.pset(x, y, k % 3 ? BL : H('#c8d0e0')); }
  // los dos monjes bajan por el camino con la manta en «some monks»; se paran junto a él
  const m = tramo(t, @6.5, @8.3);
  if (m > 0) { const x1 = Math.round(lerp(214, 134, m)), x2 = Math.round(lerp(232, 150, m)), an = m < 1;
    const r1 = R.actor(EL.monjeDD, x1, 152, t, { dir: -1, anda: an, sostiene: t < @8.5 ? true : undefined, sorpresa: !an && t < @8.9 });
    if (t < @8.5 && r1.mano) { const [mx, my] = r1.mano; R.rect(mx - 6, my - 1, mx + 1, my + 9, K); R.rect(mx - 5, my, mx, my + 8, H('#8a2430')); R.rect(mx - 5, my + 2, mx, my + 2, H('#e8a030')); R.rect(mx - 5, my + 6, mx, my + 6, H('#e8a030')); }
    R.actor(EL.monjeDD, x2, 152, t, { dir: -1, anda: an, dedo: !an && t > @8.4, sostiene: an ? [x2 - 2, 136] : undefined, pal: { T: H('#6a1a24') } });
    if (an) { const lx = x2 - 2, ly = 137 + (Math.floor(t * 5) % 2); R.linea(lx, ly - 4, lx, ly, K); R.rect(lx - 2, ly, lx + 2, ly + 5, K); R.rect(lx - 1, ly + 1, lx + 1, ly + 4, H('#f8c860')); luz(lx, ly + 3, 9, H('#f8d880'), 0.4); } }
  // la manta sobre Victor
  if (t > @8.5) { const x0 = vx + 4, y0 = 140 - Math.round(alza * 6); R.poligono([[x0, y0 + 10], [x0 + 4, y0], [x0 + 24, y0 + 2], [x0 + 26, y0 + 12]], K); R.poligono([[x0 + 1, y0 + 9], [x0 + 5, y0 + 1], [x0 + 23, y0 + 3], [x0 + 25, y0 + 11]], H('#8a2430')); R.linea(x0 + 4, y0 + 5, x0 + 24, y0 + 7, H('#e8a030')); }
  // Atom, de luciérnaga, baja triste sobre él en «the snow again»
  const ua = tramo(t, @6.0, @6.8); if (ua > 0) T.AT.luciernaga(R, lerp(60, 96, ua) + Math.sin(t * 2) * 3, lerp(70, 116, ua) + Math.sin(t * 2.6) * 2, t, { dir: 1, brillo: 0.6, cara: t > @8.3 ? 'sorpresa' : 'triste' });
  T.tibetDelante(R, t, o);
};

// ── 3 · la sala de los textos: lo cuidan y aprende ──────────────────────────────────────────────────────────────
const sala3 = () => fijo('sala3', () => {
  // la pared de barro ocre, con sus manchas de humo y grietas
  for (let y = 18; y < 132; y++) for (let x = 0; x < 320; x++) { let c = mez(H('#b8783a'), H('#8a5228'), (y - 18) / 160 + (h2(x >> 3, y >> 3, 81) - 0.5) * 0.25); if (h2(x, y, 82) > 0.92) c = mez(c, K, 0.12); if (bay(x, y) < 0.18) c = mez(c, H('#d8a060'), 0.25); R.pset(x, y, c); }
  for (let k = 0; k < 5; k++) { let x = 20 + h2(k, 83) * 280, y = 30 + h2(k, 84) * 60; for (let i = 0; i < 14; i++) { R.pset(Math.round(x), Math.round(y), mez(H('#8a5228'), K, 0.4)); x += h2(i, k, 85) - 0.5; y += 1; } }
  // las vigas pintadas del techo (franjas azul, verde y roja con sus cabezas); la esquina de la derecha, en sombra lisa
  R.rect(0, 0, 319, 18, H('#2a1a14')); for (let x = 0; x < 320; x += 20) { R.rect(x + 1, 2, x + 17, 13, H('#5a3420')); R.rect(x + 1, 3, x + 17, 4, H('#3a6ab8')); R.rect(x + 1, 6, x + 17, 7, H('#3a9a5a')); R.rect(x + 1, 9, x + 17, 10, H('#c8302a')); R.rect(x + 7, 11, x + 11, 15, H('#e8a030')); R.pset(x + 9, 13, H('#c8302a')); }
  R.rect(0, 16, 319, 18, H('#e8a030')); R.rect(0, 18, 319, 18, K);
  for (let y = 4; y < 46; y++) for (let x = 276; x < 320; x++) if (y > 18) R.pset(x, y, mez(R.pget(x, y), H('#5a3420'), 0.55)); else R.pset(x, y, H('#2a1a14'));
  // las baldas de los textos (x 4–104, y 26–126): casillas rojas con los legajos envueltos en tela de colores
  R.rect(2, 24, 106, 128, K); R.rect(3, 25, 105, 127, H('#6a1a20'));
  for (let f = 0; f < 6; f++) for (let c = 0; c < 4; c++) { const x = 6 + c * 25, y = 28 + f * 16; R.rect(x, y, x + 22, y + 13, H('#2a1014'));
    const col = ['#e8a030', '#c8302a', '#d8b040', '#8a2430', '#e8c868', '#b85a2a'][Math.floor(h2(f, c, 86) * 6)];
    if (h2(f, c, 87) > 0.12) { R.rect(x + 1, y + 4, x + 21, y + 12, K); R.rect(x + 2, y + 5, x + 20, y + 11, H(col)); R.rect(x + 2, y + 5, x + 20, y + 6, mez(H(col), H('#ffffff'), 0.3)); R.rect(x + 2, y + 10, x + 20, y + 11, mez(H(col), K, 0.3));
      R.rect(x + 5, y + 5, x + 5, y + 11, mez(H(col), K, 0.4)); R.rect(x + 17, y + 5, x + 17, y + 11, mez(H(col), K, 0.4));
      const et = ['#3a6ab8', '#3a9a5a', '#f4f0e6'][Math.floor(h2(f, c, 88) * 3)]; R.rect(x + 9, y + 12, x + 12, y + 13, H(et)); } }
  R.rect(2, 24, 106, 25, H('#e8a030'));
  // la ventana del monte (x 122–196, y 28–92), con su marco pintado y la cortinilla de ondas
  R.rect(116, 22, 202, 98, K); R.rect(117, 23, 201, 97, H('#3a6ab8')); R.rect(119, 25, 199, 95, H('#c8302a')); R.rect(121, 27, 197, 93, K);
  R.rect(116, 22, 202, 30, H('#f4f0e6')); for (let x = 117; x < 202; x++) { const y = 30 + Math.round(Math.abs(Math.sin(x * 0.4)) * 3); R.rect(x, 30, x, y, H('#f4f0e6')); if ((x >> 2) % 2) R.pset(x, 27, H('#3a6ab8')); }
  R.rect(158, 31, 160, 93, H('#5a3420'));
  // el antepecho de piedra y la mesita baja con las lámparas (las llamas, en vivo)
  R.rect(110, 98, 208, 104, H('#5a3a24')); R.rect(110, 98, 208, 99, H('#a8743c'));
  // la colgadura de brocado con el círculo de símbolos (x 214–264, y 30–110): un mandala sin figuras
  R.rect(212, 28, 266, 112, K); R.rect(213, 29, 265, 111, H('#2a4a8a')); R.rect(216, 32, 262, 108, H('#c8302a')); R.rect(219, 35, 259, 105, H('#e8c868')); R.rect(221, 37, 257, 103, H('#3a2028'));
  for (let y = 38; y < 103; y++) for (let x = 222; x < 257; x++) { const d = Math.hypot(x - 239, y - 70); let c = null; if (d < 16 && d > 15) c = H('#e8c868'); else if (Math.abs(x - 239) < 11 && Math.abs(y - 70) < 11 && (Math.abs(x - 239) === 10 || Math.abs(y - 70) === 10)) c = H('#3a9a5a'); else if (d < 7 && d > 6) c = H('#c8302a'); else if (d < 3) c = H('#f4f0e6'); else if (d > 15 && d < 17.5 && ((Math.atan2(y - 70, x - 239) * 4) | 0) % 2) c = H('#3a6ab8'); if (c) R.pset(x, y, c); }
  for (const [x, y] of [[227, 44], [251, 44], [227, 96], [251, 96]]) { R.disco(x, y, 2, H('#e8a030')); R.pset(x, y, H('#c8302a')); }
  R.rect(210, 26, 268, 28, H('#5a3420')); R.rect(214, 112, 264, 114, H('#5a3420'));
  // la columna roja con su capitel (x 268–276)
  R.rect(268, 26, 276, 132, K); R.rect(269, 26, 275, 132, H('#a82a24')); R.rect(269, 26, 270, 132, H('#c84a3a')); R.rect(274, 26, 275, 132, H('#6a1a18')); R.rect(264, 19, 280, 26, H('#3a6ab8')); R.rect(264, 22, 280, 23, H('#e8a030'));
  // el suelo de tablas y la alfombra de lana (rombos), con su fleco
  tablas(0, 132, 319, 179, H('#7a4a2a'), 87, 7); R.rect(0, 131, 319, 132, K);
  for (let y = 146; y < 176; y++) for (let x = 40; x < 230; x++) { const u = Math.abs(((x - 135) / 8) % 2 - 1) + Math.abs(((y - 161) / 6) % 2 - 1); let c = y < 148 || y > 173 || x < 43 || x > 226 ? H('#2a4a8a') : u < 0.5 ? H('#e8a030') : u < 0.9 ? H('#c8302a') : H('#8a1a20'); if (bay(x, y) < 0.08) c = mez(c, K, 0.2); R.pset(x, y, c); }
  for (let x = 40; x < 230; x += 2) { R.pset(x, 176, H('#e8d8b0')); R.pset(x, 177, H('#c8b890')); }
  // la mesita baja (chogtse) a la izquierda, pintada, con el cuenco de manteca y la campanilla
  R.rect(44, 138, 106, 158, K); R.rect(45, 139, 105, 141, H('#c8302a')); R.rect(45, 142, 105, 157, H('#8a2a20')); for (const x of [52, 75, 98]) { R.disco(x, 150, 4, H('#e8a030')); R.disco(x, 150, 2, H('#3a9a5a')); }
  R.rect(82, 132, 92, 138, K); R.rect(83, 133, 91, 137, H('#c8a060')); R.rect(84, 133, 90, 134, H('#f4e8c0'));
  // el brasero de hierro a la derecha (x 226–258, y 140–166) y la leña
  R.poligono([[226, 142], [258, 142], [254, 160], [230, 160]], K); R.poligono([[228, 143], [256, 143], [252, 159], [232, 159]], H('#3a3c48')); R.rect(228, 143, 256, 144, H('#8a8e9e'));
  for (const x of [232, 252]) R.rect(x, 160, x + 2, 168, K);
  for (let k = 0; k < 4; k++) { R.rect(272 + k, 160 - k * 3, 314 - k, 162 - k * 3, K); R.rect(273 + k, 160 - k * 3, 313 - k, 161 - k * 3, H(k % 2 ? '#8a5a32' : '#6a4228')); }
});
const p3 = (t) => { sala3();
  // el cielo y el monte por la ventana (recortado al hueco), con nubes que pasan y una chova
  R.recorte([121, 31, 197, 93]);
  for (let y = 31; y < 94; y++) for (let x = 121; x < 198; x++) R.pset(x, y, mez(H('#3a6ac8'), H('#a8c8f0'), (y - 31) / 70 + (bay(x, y) - 0.5) * 0.12));
  for (let k = 0; k < 3; k++) { const cx = 121 + ((k * 40 + t * (3 + k * 2)) % 110) - 15, cy = 40 + k * 9; R.disco(Math.round(cx), cy, 5 - k, H('#e8ecf4')); R.disco(Math.round(cx + 5), cy + 1, 4 - k, H('#ffffff')); R.disco(Math.round(cx - 3), cy + 2, 3, H('#c8d0e0')); }
  R.poligono([[121, 94], [121, 70], [140, 50], [152, 62], [170, 46], [197, 74], [197, 94]], H('#8a98b8')); R.poligono([[140, 50], [146, 58], [136, 58]], BL); R.poligono([[170, 46], [178, 56], [163, 55]], BL);
  R.poligono([[121, 94], [121, 82], [150, 74], [197, 86], [197, 94]], H('#5a6a5a'));
  const cx = Math.round(121 + ((t * 18) % 100)), cy = 52 + Math.round(Math.sin(t * 2) * 3), ala = Math.sin(t * 10) > 0; R.pset(cx, cy, K); R.pset(cx - 1, cy - (ala ? 1 : 0), K); R.pset(cx + 1, cy - (ala ? 1 : 0), K); R.pset(cx + 1, cy, H('#e8a030'));
  R.recorte(null);
  // las lámparas de manteca en la mesita y el humo del incienso; las brasas del brasero
  for (const x of [58, 68]) { R.rect(x - 2, 132, x + 2, 137, K); R.rect(x - 1, 133, x + 1, 136, H('#e8c040')); llama(x, 131, 1, 4 + Math.round(Math.sin(t * 9 + x)), t, x); luz(x, 128, 14, H('#ffd070'), 0.3); }
  vaho(87, 130, t, 6, 50, 0.6, 91, 4);
  for (let k = 0; k < 10; k++) { const x = 232 + (k * 7) % 22, b = Math.sin(t * 6 + k * 1.7) > 0; R.pset(x, 141 - (k % 2), b ? H('#ffb040') : H('#c84a1a')); R.pset(x + 1, 141, H('#f06a22')); }
  luz(242, 138, 30, H('#f08a3a'), 0.35); for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; R.pset(240 + k * 3 + Math.round(Math.sin(u * 8) * 2), 136 - u * 30, H('#ffa040')); }
  // Victor, envuelto en la manta; el monje le trae el cuenco humeante en «look after him»; se lo da
  const m = tramo(t, P3, @9.6), mx = Math.round(lerp(330, 170, m)), da = t > @10.05;
  const lee = t > @11.0, va = tramo(t, @11.0, @11.9), vx = Math.round(lerp(130, 112, va));
  const rv = R.actor(EL.doomJovenDD, vx, 160, t, { dir: lee ? -1 : 1, anda: va > 0 && va < 1, sostiene: da && t < @12.0 ? true : undefined });
  // la manta granate sobre los hombros
  { const x = vx + 2, y = 160 - 16; R.poligono([[x, y + 9], [x + 2, y], [x + 11, y], [x + 13, y + 9]], K); R.poligono([[x + 1, y + 8], [x + 3, y + 1], [x + 10, y + 1], [x + 12, y + 8]], H('#8a2430')); R.linea(x + 2, y + 4, x + 11, y + 4, H('#e8a030')); }
  const rm = R.actor(EL.monjeDD, mx, 160, t, { dir: -1, anda: m > 0 && m < 1, sostiene: !da ? true : undefined, sonrisa: da });
  const cuenco = (x, y) => { R.rect(x - 4, y - 1, x + 4, y + 3, K); R.rect(x - 3, y, x + 3, y + 2, H('#c8a060')); R.rect(x - 3, y, x + 3, y, H('#8a5a32')); vaho(x, y - 2, t, 4, 16, 0.8, 92, 3); };
  if (!da && rm.mano) cuenco(rm.mano[0], rm.mano[1]); else if (da && t < @12.0 && rv.mano) cuenco(rv.mano[0], rv.mano[1]); else if (t >= @12.0) cuenco(100, 136);
  // el lama saca un rollo de la balda en «learns» y lo despliega sobre la mesita: círculos, estrellas, la luna
  const saca = tramo(t, @10.6, @11.1), abre = ease(tramo(t, @11.1, @11.8));
  const rl = R.actor(EL.monjeDD, 30, 160, t, { dir: 1, sostiene: saca > 0 && abre < 1 ? [36 + Math.round(saca * 6), Math.round(lerp(116, 128, saca))] : undefined, dedo: abre >= 1, habla: abre >= 1 && Math.sin(t * 8) > 0, pal: { T: H('#6a1a24'), A: H('#e8c040') } });
  if (saca > 0 && abre < 1 && rl.mano) { const [x, y] = rl.mano; R.rect(x - 1, y - 3, x + 9, y + 2, K); R.rect(x, y - 2, x + 8, y + 1, H('#e8a030')); }
  if (abre > 0) { const w = Math.round(abre * 40), x0 = 54, y0 = 128; R.rect(x0, y0, x0 + w, y0 + 9, K); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + 8, H('#f0e4c0'));
    R.rect(x0 - 1, y0 - 1, x0 + 2, y0 + 10, H('#8a5a32')); R.rect(x0 + w - 2, y0 - 1, x0 + w + 1, y0 + 10, H('#8a5a32'));
    R.recorte([x0 + 2, y0 + 1, x0 + w - 3, y0 + 8]);
    for (let a = 0; a < 6.28; a += 0.3) R.pset(Math.round(x0 + 9 + Math.cos(a) * 3), Math.round(y0 + 4.5 + Math.sin(a) * 3), H('#c8302a'));
    R.disco(x0 + 20, y0 + 4, 2, H('#3a6ab8')); R.disco(x0 + 21, y0 + 4, 2, H('#f0e4c0')); R.linea(x0 + 26, y0 + 7, x0 + 30, y0 + 2, H('#4a3e34')); R.linea(x0 + 30, y0 + 2, x0 + 34, y0 + 7, H('#4a3e34')); R.linea(x0 + 26, y0 + 7, x0 + 34, y0 + 7, H('#4a3e34')); R.recorte(null); }
  if (t > @11.7 && t < @12.5) T.AT.anillo(R, 74, 132, 26, 9, t, tramo(t, @11.7, @12.1));
};

// ── 4 · la forja: la armadura; el monje trae la máscara al rojo al yunque ───────────────────────────────────────
const golpes4 = [@13.62, @14.14, @14.52];
const p4 = (t) => {
  const puesta = @16.44, o = { encuadre: 'forja', mascara: 1, sinMascara: t < puesta };
  T.tibet(R, t, o);
  // la pieza de la armadura (una greba) en el yunque, al rojo, y Victor que la martillea
  const quita = tramo(t, @14.95, @15.35), deja = t > @15.35, vuelve = t > @15.8;
  const fase = golpes4.reduce((a, g) => (t > g - 0.35 && t < g + 0.15 ? Math.min(a, Math.abs(t - g)) : a), 9), arriba = fase < 9 ? Math.min(1, Math.max(0, (fase - 0.0) / 0.3)) : 1;
  const sost = quita > 0 && !deja ? [Math.round(lerp(150, 116, quita)), Math.round(lerp(132, 120, quita))] : t < @14.95 ? [148 + Math.round((1 - arriba) * 4), Math.round(lerp(126, 108, arriba))] : undefined;
  const rv = R.actor(EL.doomJovenDD, 126, 150, t, { dir: quita > 0 && !vuelve ? -1 : 1, sostiene: sost, dedo: t > @17.0 && t < @17.9 });
  const greba = (x, y, calor) => { R.poligono([[x, y + 4], [x + 3, y], [x + 22, y + 1], [x + 25, y + 5], [x + 22, y + 7], [x + 3, y + 7]], K); R.poligono([[x + 1, y + 4], [x + 4, y + 1], [x + 21, y + 2], [x + 23, y + 5], [x + 21, y + 6], [x + 4, y + 6]], mez(H('#8e92a4'), H('#f06a22'), calor)); R.linea(x + 5, y + 2, x + 20, y + 3, mez(H('#bcc0ce'), H('#ffd060'), calor)); };
  const calorG = 1 - tramo(t, P4, @16.5) * 0.7;
  if (quita === 0) greba(150, 129, calorG); else if (!deja && rv.mano) greba(rv.mano[0] - 12, rv.mano[1] - 3, calorG); else greba(96, 118, calorG * 0.8);
  if (t < @14.95 && rv.mano) { const [mx, my] = rv.mano, hx = mx + 6, hy = my - Math.round(arriba * 6); R.linea(mx, my, hx, hy - 1, H('#2a1a10')); R.linea(mx + 1, my, hx + 1, hy - 1, H('#a8743c')); R.rect(hx - 1, hy - 4, hx + 5, hy + 1, K); R.rect(hx, hy - 3, hx + 4, hy, H('#8a8e9e')); R.pset(hx, hy - 3, H('#c8ccd8')); }
  for (const g of golpes4) { chispas(156, 130, t, g, 12, g * 10); if (t > g && t < g + 0.12) luz(158, 130, 16, H('#fff0a0'), 0.6); }
  // el monje del horno: saca la máscara con las tenazas en «finally» y la lleva al yunque en «iron mask»
  const lleva = ease(tramo(t, @15.6, puesta)), mmx = Math.round(lerp(208, 186, lleva));
  const bx = lerp(250, 166, lleva), by = lerp(104, 128, lleva) - Math.sin(lleva * Math.PI) * 14;
  const rm = R.actor(EL.monjeDD, mmx, 150, t, { dir: t > @15.4 && t < puesta + 0.6 ? -1 : 1, sostiene: t < puesta + 0.5 ? [mmx + (t > @15.4 && t < puesta + 0.6 ? 0 : 14), 126] : undefined, sorpresa: t > puesta + 0.6 });
  if (t < puesta + 0.5 && rm.mano) { const [hx, hy] = rm.mano, ex = t < puesta ? bx : 166, ey = t < puesta ? by : 128; R.linea(hx, hy, ex, ey, H('#1c1a24')); R.linea(hx, hy - 1, ex, ey - 1, H('#6e7282')); R.linea(hx, hy + 2, ex, ey + 1, H('#1c1a24')); }
  if (t > @15.5 && t < puesta) { T.c_mascara(R, Math.round(bx) - 3, Math.round(by), 1, 1, t); luz(bx - 3, by, 18, H('#f8a040'), 0.5); }
  if (t > puesta && t < puesta + 0.4) luz(163, 129, 24, H('#fff0a0'), 0.5 * (1 - (t - puesta) / 0.4));
  T.tibetDelante(R, t, o);
};

// ── 5 · el yunque de cerca: los últimos golpes; el cazo de agua ──────────────────────────────────────────────────
const golpes5 = [@19.30, @20.50];
const p5 = (t) => {
  const o = { encuadre: 'forja', camara: 'mascara', mascara: 1 - tramo(t, P5, P6) * 0.08, mano: true, manga: '#2a5a32' };
  T.tibet(R, t, o);
  // el martillo del monje (su brazo granate entra por la derecha): sube y baja en «saddest» y «story»
  const fase = golpes5.reduce((a, g) => (t > g - 0.45 && t < g + 0.3 ? Math.min(a, Math.abs(t - g)) : a), 9), arriba = fase < 9 ? Math.min(1, fase / 0.4) : 1;
  const cazo = ease(tramo(t, @21.9, @23.0)), fuera = tramo(t, @21.2, @21.8);
  // la maza larga del monje: solo su mano en el borde de la derecha (la manga granate) y el mango hasta el yunque
  if (cazo === 0) { const ang = lerp(0.12, -0.42, arriba) , wx = 306 + Math.round(fuera * 40), wy = Math.round(lerp(98, 80, arriba)), L = 104;
    const kx = Math.round(lerp(188, 220, arriba) + fuera * 40), ky = Math.round(lerp(104, 48, arriba));
    R.linea(wx, wy, kx, ky, H('#2a1a10')); R.linea(wx, wy + 1, kx, ky + 1, H('#a8743c')); R.linea(wx, wy + 2, kx, ky + 2, H('#6a4228'));
    R.rect(kx - 7, ky - 7, kx + 3, ky + 8, K); R.rect(kx - 6, ky - 6, kx + 2, ky + 7, H('#6e7282')); R.rect(kx - 6, ky - 6, kx - 5, ky + 7, H('#a8acbc')); R.rect(kx + 1, ky - 6, kx + 2, ky + 7, H('#3a3c48'));
    T.mano(R, wx, wy + 1, -1, '#7a1e28', { sinManga: true }); R.rect(wx + 7, wy - 4, 319, wy + 5, K); R.rect(wx + 8, wy - 3, 319, wy + 4, H('#7a1e28')); R.rect(wx + 8, wy - 3, 319, wy - 2, H('#a83a3a')); }
  else { const wx = Math.round(lerp(330, 300, cazo)), wy = 66;
    // el cazo de cobre de mango largo, lleno de agua, a punto de verterla sobre la máscara
    const cx = 196, cy = 66 + Math.round((1 - cazo) * 0), ccx = Math.round(lerp(cx + 60, cx, cazo));
    R.linea(wx - 6, wy, ccx + 8, cy - 3, H('#2a1a10')); R.linea(wx - 6, wy + 1, ccx + 8, cy - 2, H('#c8783a'));
    R.disco(ccx, cy, 9, K); R.disco(ccx, cy, 8, H('#a85a2a')); R.rect(ccx - 9, cy - 9, ccx + 9, cy - 1, H('#140f1c')); R.rect(ccx - 7, cy - 2, ccx + 7, cy - 1, H('#5a9ab8')); R.rect(ccx - 6, cy - 2, ccx - 2, cy - 2, H('#cfe8f0')); R.pset(ccx - 7, cy + 2, H('#e8a060'));
    T.mano(R, wx, wy + 1, -1, '#7a1e28', { sinManga: true }); R.rect(wx + 7, wy - 4, 319, wy + 5, K); R.rect(wx + 8, wy - 3, 319, wy + 4, H('#7a1e28')); R.rect(wx + 8, wy - 3, 319, wy - 2, H('#a83a3a'));
    if (t > @23.2) { const u = ((t - @23.2) * 2.5) % 1; R.pset(ccx - 8, cy + Math.round(u * 20), H('#8ac0d8')); R.pset(ccx - 8, cy + 1 + Math.round(u * 20), H('#5a9ab8')); } }
  for (const g of golpes5) { chispas(180, 104, t, g, 16, g * 7, 1.2); if (t > g && t < g + 0.1) luz(182, 104, 22, H('#fff0a0'), 0.7); }
  // Atom, de luciérnaga, se acerca triste a mirarla en «saddest detail»
  const ua = tramo(t, @19.1, @20.0); if (ua > 0) T.AT.luciernaga(R, lerp(30, 92, ua) + Math.sin(t * 2) * 2, lerp(30, 56, ua) + Math.sin(t * 2.7) * 2, t, { dir: 1, brillo: 0.7, cara: t > @22.8 ? 'sorpresa' : 'triste' });
  T.tibetDelante(R, t, o);
};

// ── 6 · la forja de lado: no espera; se pone la máscara al rojo ────────────────────────────────────────────────
const forja6 = () => fijo('forja6', () => {
  sillar(0, 0, 319, 128, H('#4a3c38'), 51, 8, 15);
  // la luz del horno (a la derecha) que baña el muro, más fuerte cerca
  for (let y = 0; y < 129; y++) for (let x = 0; x < 320; x++) { const g = Math.max(0, 1 - Math.hypot((x - 300) / 290, (y - 96) / 160)); R.pset(x, y, mez(R.pget(x, y), H('#f07a2a'), g * 0.55 * (0.8 + 0.4 * bay(x, y)))); }
  // las vigas
  R.rect(0, 0, 319, 9, H('#22140e')); tablas(0, 1, 319, 8, H('#4a2e1e'), 52, 4);
  // la puerta abierta a la noche (x 20–66, y 44–128): el arco, la nieve y el monte a la luna (en vivo, recortado)
  R.rect(16, 40, 70, 128, H('#2a2024')); R.rect(18, 42, 68, 128, H('#5a4a44')); for (let x = 18; x <= 68; x += 7) R.rect(x, 42, x, 44, K);
  // la estantería de las herramientas (x 84–176, y 30–70) y las cadenas que cuelgan
  R.rect(84, 50, 176, 53, K); R.rect(85, 50, 175, 51, H('#7a5232'));
  [[90, 8, '#6a6e7c'], [104, 12, '#a8743c'], [118, 6, '#4a5a6a'], [132, 10, '#8a5a3a'], [150, 9, '#6a3a2a'], [164, 12, '#5a6a4a']].forEach(([x, a, c]) => { R.rect(x - 1, 49 - a, x + 7, 49, K); R.rect(x, 50 - a, x + 6, 49, H(c)); R.rect(x, 50 - a, x + 1, 49, mez(H(c), H('#ffffff'), 0.25)); });
  for (let k = 0; k < 3; k++) { const x = 100 + k * 34; for (let y = 10; y < 34 + k * 6; y += 3) { R.rect(x - 1, y, x + 1, y + 1, K); R.pset(x, y, H('#8a8e9e')); } R.rect(x - 2, 34 + k * 6, x + 2, 38 + k * 6, H('#5a5e6e')); }
  // el horno de ladrillo a la derecha (x 222–319): la boca en arco (x 246–306, y 70–118), la campana y la chimenea
  for (let y = 10; y < 150; y++) for (let x = 222; x < 320; x++) { const f = Math.floor(y / 5), xs = x + (f % 2) * 5, j = y % 5 === 0 || xs % 10 === 0; let c = mez(H('#8a4a30'), H('#5a2a1c'), (h2(Math.floor(xs / 10), f, 53) - 0.5) * 0.6 + 0.3); if (j) c = H('#3a1a14'); R.pset(x, y, mez(c, H('#f08a3a'), Math.max(0, 1 - Math.hypot(x - 276, y - 96) / 60) * 0.5)); }
  R.rect(222, 10, 223, 150, K); R.poligono([[216, 60], [319, 60], [319, 66], [216, 66]], H('#3a2a24')); R.rect(216, 60, 319, 61, H('#8a6a5a'));
  for (let y = 70; y <= 120; y++) for (let x = 244; x <= 308; x++) { const d = Math.hypot((x - 276) / 32, (y - 120) / 50); if (d < 1 && y <= 120) R.pset(x, y, d > 0.9 ? H('#2a1410') : H('#140808')); }
  R.rect(240, 120, 312, 126, H('#5a3a30')); R.rect(240, 120, 312, 121, H('#a87a5a'));
  // el suelo de tierra apisonada con losas, el hollín y la luz naranja
  for (let y = 129; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 129) / (5 + (y - 129) * 0.1)), xs = x + fila * 17, j = xs % 40 === 0; let c = mez(H('#4a3a30'), H('#2a201a'), (y - 129) / 70 + (h2(Math.floor(xs / 40), fila, 54) - 0.5) * 0.25); if (j) c = mez(c, K, 0.4); if (h2(x, y, 55) > 0.94) c = mez(c, K, 0.25); R.pset(x, y, mez(c, H('#f08a3a'), Math.max(0, 1 - Math.hypot((x - 290) / 220, (y - 130) / 60)) * 0.5)); }
  R.rect(0, 128, 319, 129, K);
  // el montón de carbón y la pala; el yunque pequeño al fondo
  for (let k = 0; k < 40; k++) { const x = 200 + h2(k, 56) * 30, y = 150 + h2(k, 57) * 8 - (1 - Math.abs(h2(k, 56) - 0.5) * 2) * 6; R.rect(Math.round(x), Math.round(y), Math.round(x) + 2, Math.round(y) + 1, k % 3 ? H('#1a1416') : H('#3a3238')); }
  // el fuelle grande colgado junto al horno (x 182–214) y el yunque pequeño en su tocón (x 140–162)
  R.poligono([[186, 72], [212, 72], [216, 104], [198, 114], [182, 104]], K); R.poligono([[188, 74], [210, 74], [213, 103], [198, 111], [185, 103]], H('#6a4228'));
  for (let k = 0; k < 4; k++) R.linea(187, 80 + k * 7, 212, 80 + k * 7, H('#4a2a18')); R.rect(196, 111, 200, 122, H('#3a3c48')); R.rect(188, 66, 210, 72, H('#8a5a32')); R.rect(198, 56, 200, 66, H('#22222c'));
  R.rect(144, 140, 158, 150, K); R.rect(145, 141, 157, 149, H('#6a4228')); R.poligono([[136, 134], [162, 134], [160, 140], [140, 140]], K); R.poligono([[137, 135], [161, 135], [159, 139], [141, 139]], H('#6e7282')); R.rect(137, 135, 161, 135, H('#c8ccd8'));
  for (let k = 0; k < 7; k++) { const x = 30 + h2(k, 58) * 160, y = 160 + h2(k, 59) * 16; R.rect(Math.round(x), Math.round(y), Math.round(x) + 3, Math.round(y), H('#5a5e6e')); R.pset(Math.round(x), Math.round(y) - 1, H('#8a8e9e')); }
  R.linea(186, 162, 214, 138, H('#2a1a10')); R.linea(187, 162, 215, 138, H('#8a5a32')); R.poligono([[182, 160], [190, 158], [192, 168], [182, 168]], H('#4a4c58'));
});
const p6 = (t) => { forja6();
  // la noche por la puerta: el cielo, el monte a la luna y la nieve (recortado)
  R.recorte([20, 46, 66, 127]); for (let y = 46; y < 128; y++) for (let x = 20; x < 67; x++) R.pset(x, y, mez(H('#10142e'), H('#2a3466'), (y - 46) / 90 + (bay(x, y) - 0.5) * 0.15));
  R.poligono([[20, 110], [34, 84], [44, 94], [56, 76], [66, 90], [66, 128], [20, 128]], H('#3a4468')); R.poligono([[56, 76], [61, 84], [51, 84]], H('#c8d0e8')); R.poligono([[34, 84], [38, 90], [30, 90]], H('#c8d0e8'));
  R.poligono([[20, 120], [66, 114], [66, 128], [20, 128]], H('#c8d0e8')); R.disco(30, 58, 4, H('#f4f0e0')); for (const [x, y] of [[48, 52], [60, 64], [26, 72]]) if (Math.sin(t * 3 + x) > -0.3) R.pset(x, y, BL);
  copos(t, 20, 64, -5, 16, 20, 46, 66, 127, [BL, H('#a8b4d8')]); R.recorte(null);
  // el fuego del horno, vivo, con su luz que tiembla y las chispas que suben por la campana
  for (let i = 0; i < 9; i++) llama(254 + i * 6, 119, 3, 22 + Math.round(Math.sin(t * 5 + i) * 6), t, i);
  luz(276, 104, 60, H('#ffb050'), 0.35 + Math.sin(t * 11) * 0.04);
  for (let k = 0; k < 8; k++) { const u = (t * 0.7 + k / 8) % 1; R.pset(260 + (k * 9) % 40 + Math.sin(u * 7 + k) * 3, 70 - u * 60, u < 0.5 ? H('#ffd060') : H('#c84a1a')); }
  // el segundo monje, en la puerta, se vuelve en «burning hot»
  R.actor(EL.monjeDD, 34, 140, t, { dir: 1, sorpresa: t > @26.7, triste: t > @27.9, pal: { T: H('#6a1a24') } });
  // Victor con las tenazas y la máscara al rojo; el monje le ofrece el cazo y Victor lo rechaza en «doesn't wait»
  const vx = 126, rechaza = t > P6 && t < @24.9, pone = ease(tramo(t, @25.96, @26.6)), puesta = pone >= 1;
  const calor = puesta ? 1 - tramo(t, @26.6, P7) * 0.45 : 1, temb = puesta && t < @28.6 ? Math.round(Math.sin(t * 40)) : 0;
  const o = { dir: 1, dedo: rechaza, sostiene: !rechaza && !puesta ? [vx + 18 - Math.round(pone * 6), Math.round(lerp(132, 124, pone))] : undefined, enfado: rechaza };
  // su sombra enorme en el muro, que el fuego proyecta a la izquierda (el perfil cambia al ponerse la máscara)
  { const S = actorAparte(EL.doomJovenDD, t, o), SX = 2.8, SY = 3.0, ox = vx - 44; for (let j = 0; j < 40; j++) for (let i = 0; i < 40; i++) { if (S[j * 40 + i] === MARCA) continue; const X0 = Math.round(ox + (i - 12) * SX), Y0 = Math.round(128 - (37 - j) * SY);
      for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) { const X = X0 + a, Y = Y0 + b; if (Y < 128 && Y > 9 && X > 70 && X < 222) R.pset(X, Y, mez(R.pget(X, Y), H('#1a0e10'), 0.62)); } }
    // con la máscara puesta, la sombra de la cabeza cambia: el borde recto de la máscara y el vapor que sube
    if (puesta) { const cx = ox + (19 - 12) * SX + 8, cy = 128 - (37 - 19) * SY; for (let y = -16; y <= 16; y++) for (let x = -12; x <= 12; x++) if (Math.abs(x) < 12 - Math.max(0, y - 8) * 0.8) { const X = Math.round(cx + x), Y = Math.round(cy + y); if (X > 70) R.pset(X, Y, mez(R.pget(X, Y), H('#1a0e10'), 0.7)); }
      for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1; for (let q = 0; q < 6; q++) tine(cx + Math.sin(u * 6 + k + q) * 6 + q, cy - 18 - u * 40, H('#1a0e10'), 0.25 * (1 - u)); } } }
  const rv = R.actor(EL.doomJovenDD, vx + temb, 150, t, o);
  const cab = [rv.cabeza[0], rv.cabeza[1]];
  if (!puesta && !rechaza && rv.mano) { const [mx, my] = rv.mano, ex = lerp(mx + 10, cab[0] + 1, pone), ey = lerp(my - 2, cab[1] + 7, pone);
    R.linea(mx, my, ex - 4, ey, H('#1c1a24')); R.linea(mx, my - 1, ex - 4, ey - 1, H('#6e7282')); T.c_mascara(R, Math.round(ex), Math.round(ey), 1, 0.72, t); luz(ex, ey, 16, H('#f8a040'), 0.5); }
  if (rechaza) T.c_mascara(R, vx + 22, 134, 1, 0.72, t);   // mientras rechaza el cazo, la máscara espera en las tenazas, apoyadas en el yunque pequeño
  if (puesta) { mascaraPuesta(cab, 1, calor, t); luz(cab[0], cab[1] + 7, 18, H('#f86a2a'), calor * 0.45); vaho(cab[0], cab[1], t, 8, 36, Math.min(1, (t - @26.6) * 2) * 0.9, 65, 6); }
  if (t > @26.55 && t < @26.95) luz(cab[0], cab[1] + 7, 60, H('#fff4d0'), 0.8 * (1 - (t - @26.55) / 0.4));
  // el monje del cazo: lo ofrece, retrocede en «doesn't wait» y lo suelta en «puts the mask on»
  const atras = tramo(t, @24.3, @24.9), mmx = Math.round(lerp(150, 168, atras)), suelta = t > @26.7;
  const rm = R.actor(EL.monjeDD, mmx, 152, t, { dir: -1, sostiene: !suelta ? [mmx - 2, 134] : undefined, sorpresa: t > @24.0 && t < @25.0 || suelta, brazos: suelta && t < @27.6 });
  if (!suelta && rm.mano) { const [x, y] = rm.mano; R.linea(x, y, x - 8, y - 1, H('#c8783a')); R.disco(x - 11, y, 4, K); R.disco(x - 11, y, 3, H('#a85a2a')); R.rect(x - 14, y - 3, x - 8, y - 1, H('#5a9ab8')); }
  else if (suelta) { const u = Math.min(1, (t - @26.7) * 3); const y = Math.round(lerp(134, 160, u * u)); R.disco(mmx - 9, y, 4, K); R.disco(mmx - 9, y, 3, H('#a85a2a'));
    if (u >= 1) for (let k = 0; k < 10; k++) { const v = Math.min(1, (t - @27.03) * 1.5); const a = Math.PI * (1 + h2(k, 66)), r = v * (6 + h2(k, 67) * 10); if (v < 1) R.pset(mmx - 9 + Math.cos(a) * r, 162 + Math.sin(a) * r * 0.5 - (1 - v) * 4, H('#8ac0d8')); }
    if (u >= 1) for (let x = -10; x <= 10; x++) R.pset(mmx - 9 + x, 163 + Math.round(Math.abs(x) * 0.1), H('#3a5a6a')); }
};

// ── 7 · el patio del monasterio de noche: sale con la máscara; los monjes bajan la mirada ────────────────────────
const p7 = (t) => {
  const abre = tramo(t, P7 + 0.1, @29.9) * (1 - tramo(t, @32.9, @33.6)), o = { encuadre: 'montana', camara: 'monasterio', puerta: abre };
  T.tibet(R, t, o);
  T.tinte(R, 0, 179, [14, 20, 56], 0.6);
  // la luz cálida de las lámparas que sale por la puerta y se tiende en las losas
  if (abre > 0) { luz(160, 120, 34 * abre + 8, H('#ffc860'), 0.55 * abre); for (let y = 141; y < 180; y++) { const w = (26 * abre) + (y - 141) * 0.9 * abre; for (let x = Math.round(160 - w); x <= 160 + w; x++) if (bay(x, y) < 0.45 * abre * (1 - (y - 141) / 50)) R.pset(x, y, mez(R.pget(x, y), H('#ffc860'), 0.5)); } }
  // la luna y la nieve fina
  copos(t, 40, 73, -4, 12, 0, 0, 319, 179, [H('#c8d0e8'), H('#8a98c0')]);
  // Victor sale con la máscara (casi fría, con un último rojo) y cruza el patio hacia la izquierda; se tapa con la capucha
  const sale = tramo(t, @29.9, @30.6), anda = tramo(t, @31.9, @34.2), vx = Math.round(lerp(152, -20, anda)), sy = Math.round(lerp(142, 150, sale));
  if (sale > 0) { const o2 = { dir: anda > 0 ? -1 : 1, anda: anda > 0 && anda < 1 }; const r = R.actor(EL.doomJovenDD, vx, sy, t, o2); mascaraPuesta(r.cabeza, o2.dir, 0.22 - sale * 0.12, t); }
  // los monjes: el de las ruedas de oración y el del incienso lo miran y bajan la mirada en «almost no one»
  const baja = t > @31.68;
  R.actor(EL.monjeDD, 62, 150, t, { dir: t > @30.4 ? 1 : -1, sorpresa: t > @30.4 && !baja, triste: baja, sostiene: t < @30.4 ? [50, 124 + Math.round(Math.sin(t * 6) * 2)] : undefined });
  R.actor(EL.monjeDD, 214, 152, t, { dir: -1, triste: baja, quieto: t > @30.4 && !baja, pal: { T: H('#6a1a24') } });
  // Atom, de luciérnaga, junto al quemador, triste
  T.AT.luciernaga(R, 250 + Math.sin(t * 1.5) * 4, 92 + Math.sin(t * 2.2) * 3, t, { dir: -1, brillo: 0.6, cara: 'triste' });
  T.tibetDelante(R, t, o);
};

// ── 8 · 1962: la mesa de dibujo; la cicatriz mínima al margen ───────────────────────────────────────────────────
const mesa8 = () => fijo('mesa8', () => {
  // la pared de papel pintado de rayas suaves, el corcho con bocetos y la ventana de la noche de 1962
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let c = (x >> 3) % 2 ? H('#c8b890') : H('#bcac84'); if (bay(x, y) < 0.12) c = mez(c, K, 0.08); c = mez(c, H('#3a2a20'), Math.max(0, (y - 120) / 200)); R.pset(x, y, c); }
  for (let y = 4; y < 46; y++) for (let x = 270; x < 320; x++) R.pset(x, y, mez(H('#c0b08a'), H('#b8a882'), bay(x, y) * 0.3));
  // la ventana (x 8–62, y 30–100) con su marco blanco
  R.rect(4, 26, 66, 104, H('#e8e0d0')); R.rect(6, 28, 64, 102, K); R.rect(34, 28, 36, 102, H('#e8e0d0')); R.rect(6, 64, 64, 66, H('#e8e0d0')); R.rect(2, 102, 68, 106, H('#d8d0c0'));
  // el corcho con los bocetos clavados (rectángulos con rayas de lápiz, sin letras)
  R.rect(272, 54, 316, 128, K); R.rect(273, 55, 315, 127, H('#a8743c')); for (let k = 0; k < 120; k++) R.pset(274 + h2(k, 91) * 40, 56 + h2(k, 92) * 70, H('#8a5a32'));
  [[276, 58, 16, 20, '#f4f0e6'], [296, 62, 14, 18, '#e8e4f0'], [278, 84, 18, 14, '#f0ecd8'], [298, 86, 13, 18, '#f4f0e6'], [280, 104, 26, 18, '#f4f0e6']].forEach(([x, y, w, h, c], k) => {
    R.rect(x, y, x + w, y + h, H(c)); R.rect(x + w, y + 1, x + w, y + h, H('#b8b0a0')); for (let j = 0; j < 3; j++) R.linea(x + 3, y + 4 + j * 5, x + w - 4 - (k + j) % 3 * 3, y + 3 + j * 5 + (j % 2), H('#5a5a6a'));
    R.disco(x + 3 + (k * 5) % 10, y + h - 5, 2, H('#7a7a8a')); R.pset(x + w / 2, y, H(['#c8302a', '#3a6ab8', '#e8c040'][k % 3])); });
  // la mesa de dibujo inclinada (x 70–236, y 30–168) y su canto
  R.poligono([[74, 34], [256, 34], [266, 166], [62, 166]], K); R.poligono([[76, 36], [254, 36], [263, 164], [65, 164]], H('#a87a4a'));
  for (let y = 37; y < 164; y++) for (let x = 66; x < 264; x++) if (R.pget(x, y) === H('#a87a4a') && Math.sin(x * 0.18 + Math.sin(y * 0.07) * 2) > 0.85) R.pset(x, y, H('#8a5a32'));
  // la hoja de cartulina (x 92–214, y 44–154) con su cuadrícula azul de dibujante y las cinchas
  R.poligono([[92, 44], [240, 44], [248, 156], [86, 156]], H('#f8f4ea')); for (let y = 50; y < 156; y += 8) for (let x = 88; x < 248; x += 2) if (R.pget(x, y) === H('#f8f4ea')) R.pset(x, y, H('#dce8f4'));
  for (let x = 96; x < 246; x += 8) for (let y = 46; y < 156; y += 2) if (R.pget(x, y) === H('#f8f4ea')) R.pset(x, y, H('#dce8f4'));
  for (const [x, y] of [[92, 44], [230, 44], [86, 148], [238, 148]]) { R.rect(x, y, x + 10, y + 6, H('#c8b878')); R.rect(x, y, x + 10, y, H('#e8d898')); }
  // la regla de la mesa, el canto y el tablero de abajo con sus cosas
  R.rect(60, 164, 242, 168, H('#5a3a22')); R.rect(60, 164, 242, 165, H('#c89a5a'));
  tablas(0, 168, 319, 179, H('#6a4228'), 93, 6);
  // el bote de pinceles, el tintero, la goma y la taza de café (a la derecha)
  R.rect(276, 150, 292, 176, K); R.rect(277, 151, 291, 175, H('#5a7a9a')); R.rect(277, 151, 279, 175, H('#7a9aba'));
  for (const [dx, h, c] of [[2, 16, '#c8302a'], [6, 20, '#e8c040'], [10, 14, '#3a3a4a'], [13, 18, '#a87a4a']]) { R.linea(277 + dx, 150, 277 + dx + (dx - 7) * 0.3, 150 - h, H(c)); R.pset(277 + dx + (dx - 7) * 0.3, 150 - h, K); }
  R.rect(298, 164, 312, 176, K); R.rect(299, 165, 311, 175, H('#2a2a3a')); R.rect(301, 160, 309, 165, K); R.rect(302, 161, 308, 164, H('#1a1a2a')); R.rect(300, 166, 303, 170, H('#5a5a7a'));
  R.rect(40, 170, 54, 175, K); R.rect(41, 171, 53, 174, H('#e87a8a')); R.rect(41, 171, 53, 171, H('#f8a8b8'));
  R.rect(14, 156, 34, 176, K); R.rect(15, 157, 33, 175, H('#e8e0d0')); R.rect(15, 157, 33, 160, H('#5a3a22')); R.rect(34, 161, 38, 170, K); R.rect(35, 162, 37, 169, H('#e8e0d0'));
});
const p8 = (t) => { mesa8();
  // la noche de 1962 por la ventana: casas de barrio, una farola, un árbol que se mece y los faros de un coche que pasa
  R.recorte([6, 28, 64, 102]);
  for (let y = 28; y < 103; y++) for (let x = 6; x < 65; x++) R.pset(x, y, mez(H('#121a3a'), H('#2a3a6a'), (y - 28) / 80));
  for (const [x, w, h, c] of [[6, 22, 26, '#2a2a3e'], [30, 26, 20, '#32324a'], [52, 16, 30, '#262638']]) { R.rect(x, 103 - h, x + w, 102, H(c)); R.poligono([[x - 2, 103 - h], [x + w / 2, 103 - h - 8], [x + w + 2, 103 - h]], H('#1c1c2c')); R.rect(x + 4, 103 - h + 6, x + 8, 103 - h + 10, Math.sin(t * 0.7 + x) > -0.5 ? H('#f8d880') : H('#2a2a3e')); }
  { const a = Math.sin(t * 1.3) * 2; R.disco(Math.round(46 + a), 54, 10, H('#1a2a1e')); R.disco(Math.round(42 + a), 50, 7, H('#22382a')); R.rect(45, 62, 47, 90, H('#1a1410')); }
  R.rect(20, 66, 21, 100, H('#3a3a4a')); R.rect(17, 64, 24, 66, H('#5a5a6a')); luz(20, 68, 10, H('#f8e0a0'), 0.6);
  const cx = Math.round(lerp(-30, 90, ((t - P8) / 4) % 1)); R.rect(cx, 96, cx + 16, 100, H('#3a4a7a')); R.rect(cx + 3, 93, cx + 12, 96, H('#2a3a5a')); R.pset(cx + 16, 98, H('#fff4c0')); luz(cx + 20, 98, 10, H('#fff4c0'), 0.4);
  R.recorte(null);
  // la lámpara de brazo sobre la mesa (arriba a la izquierda) y su luz sobre la hoja
  R.linea(70, 0, 92, 18, H('#3a3a4a')); R.linea(71, 0, 93, 18, H('#6a6a7a')); R.poligono([[84, 16], [102, 14], [100, 26], [88, 26]], K); R.poligono([[86, 17], [100, 15], [98, 25], [89, 25]], H('#3a8a6a')); R.rect(90, 25, 97, 27, H('#fff4c0'));
  luz(150, 96, 90, H('#fff4d8'), 0.25, 0.8);
  // la polilla que ronda la lámpara
  { const a = t * 5, x = Math.round(96 + Math.cos(a) * 9), y = Math.round(32 + Math.sin(a * 1.3) * 5), al = Math.sin(t * 30) > 0; R.pset(x, y, H('#8a7a6a')); R.pset(x - 1, y - (al ? 1 : 0), H('#c8b8a0')); R.pset(x + 1, y - (al ? 1 : 0), H('#c8b8a0')); }
  // el vaho del café
  vaho(24, 154, t, 5, 20, 0.6, 94, 3);
  // EL DIBUJO (ya hecho): la figura de la capucha, la máscara y la capa; la lámpara se enciende en «The curious thing»
  const TRAZOS = [[150, 62, 140, 70], [150, 62, 160, 70], [140, 70, 139, 82], [160, 70, 161, 82], [143, 72, 157, 72], [143, 72, 143, 84], [157, 72, 157, 84], [143, 84, 157, 84],
    [139, 82, 130, 92], [161, 82, 170, 92], [140, 86, 136, 120], [160, 86, 164, 120], [130, 92, 124, 132], [170, 92, 176, 132], [124, 132, 176, 132], [144, 100, 156, 100], [142, 120, 140, 140], [158, 120, 160, 140], [136, 140, 146, 140], [154, 140, 164, 140]];
  const DX = -16; for (const [a, b, c, d] of TRAZOS) R.linea(a + DX, b, c + DX, d, H('#2a2a3a'));
  R.poligono([[144 + DX, 73], [156 + DX, 73], [156 + DX, 83], [144 + DX, 83]], H('#a8acbc')); R.linea(145 + DX, 76, 148 + DX, 76, K); R.linea(152 + DX, 76, 155 + DX, 76, K); R.linea(147 + DX, 80, 153 + DX, 80, K);
  R.poligono([[131 + DX, 93], [140 + DX, 87], [140 + DX, 120], [126 + DX, 131]], H('#5a9a6a')); R.poligono([[169 + DX, 93], [160 + DX, 87], [160 + DX, 120], [174 + DX, 131]], H('#5a9a6a'));
  for (let k = 0; k < 6; k++) R.linea(128 + DX + k, 96 + k * 6, 132 + DX + k, 96 + k * 6, H('#3a6a4a'));
  // al margen, la cabecita con la cicatriz mínima: la mano la dibuja en «imagined it differently»
  const HX = 236, HY = 140, cab = tramo(t, @38.95, @39.65), cic = tramo(t, @40.0, @40.4);
  if (cab > 0) for (let a = 0; a < 6.28 * cab; a += 0.06) R.pset(Math.round(HX + Math.sin(a) * 10), Math.round(HY - Math.cos(a) * 12), H('#2a2a3a'));
  if (cab >= 1) { R.rect(HX - 4, HY - 3, HX - 3, HY - 2, H('#2a2a3a')); R.rect(HX + 3, HY - 3, HX + 4, HY - 2, H('#2a2a3a')); R.linea(HX - 3, HY + 5, HX + 3, HY + 5, H('#2a2a3a')); R.linea(HX - 1, HY + 1, HX, HY + 2, H('#2a2a3a')); for (let k = -6; k <= 6; k++) R.pset(HX + k, HY - 12 + Math.round(Math.abs(k) * 0.25), H('#5a4a3a')); }
  if (cic > 0) { R.linea(HX + 6, HY + 1, HX + 6 + Math.round(cic * 2), HY + 1 + Math.round(cic * 2), H('#c8302a')); }
  if (t > @40.1) T.AT.anillo(R, HX + 7, HY + 2, 8, 7, t, tramo(t, @40.1, @40.5));
  // la mano del dibujante entra con el lápiz por abajo a la derecha en «who drew him first» y dibuja la cabecita
  const ent = ease(tramo(t, @37.6, @38.6));
  if (ent > 0) { const [px, py] = cab > 0 && cab < 1 ? [HX + Math.sin(cab * 6.28) * 10, HY - Math.cos(cab * 6.28) * 12] : cic > 0 && cic < 1 ? [HX + 6 + cic * 2, HY + 1 + cic * 2] : t > @40.4 ? [HX + 14, HY + 12] : [HX + 2, HY - 12];
    const wx = Math.round(lerp(338, px + 12, ent)), wy = Math.round(lerp(196, py + 12, ent)); T.brazo(R, 330, 232, wx, wy, '#e8e0d0', -1, { codo: [296, 200] });
    R.linea(wx - 6, wy - 4, Math.round(lerp(wx - 12, px, ent)), Math.round(lerp(wy - 12, py, ent)), H('#e8c040')); R.pset(Math.round(px), Math.round(py), H('#2a2a3a')); }
  // la habitación a oscuras hasta que la lámpara se enciende
  const on = tramo(t, @35.05, @35.2);
  if (on < 1) for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (x > 6 && x < 65 && y > 28 && y < 103) continue; R.pset(x, y, mez(R.pget(x, y), H('#0c0a18'), 0.62 * (1 - on))); }
  if (on > 0) { R.rect(90, 25, 97, 27, H('#fffce8')); luz(93, 30, 14, H('#fff4c0'), 0.5 * on); }
  // Atom recorre el canto de la mesa, mira el dibujo en «Jack Kirby» y señala la cabecita en «differently»
  const aa = tramo(t, @35.5, @36.6), ax = Math.round(lerp(-12, 84, aa));
  T.AT.atom(R, ax, 166, t, { dir: 1, pose: aa > 0 && aa < 1 ? 'camina' : t > @39.4 ? 'senala' : 'quieto', cara: t > @40.0 ? 'sorpresa' : t > @36.3 ? 'sonrisa' : 'normal' });
};

// ── 9 · GAG: la máscara pequeña de Atom ─────────────────────────────────────────────────────────────────────────
const banco9 = () => fijo('banco9', () => {
  sillar(0, 0, 319, 116, H('#56463e'), 101, 9, 16);
  for (let y = 0; y < 117; y++) for (let x = 0; x < 320; x++) { const g = Math.max(0, 1 - Math.hypot((x - 330) / 300, (y - 100) / 160)); R.pset(x, y, mez(R.pget(x, y), H('#f08a3a'), g * 0.5)); }
  // el tablero de las herramientas (x 26–176, y 22–70)
  R.rect(24, 22, 178, 72, K); tablas(25, 23, 177, 71, H('#6a4228'), 102, 8, true);
  R.linea(36, 28, 32, 64, K); R.linea(38, 28, 44, 64, K); R.rect(56, 28, 58, 58, H('#a8743c')); R.rect(50, 58, 64, 66, K); R.rect(51, 59, 63, 61, H('#8a8e9e'));
  R.rect(80, 28, 82, 62, H('#8a8e9e')); R.rect(96, 28, 98, 50, H('#a8743c')); R.poligono([[90, 50], [104, 50], [100, 64], [94, 64]], H('#5a5e6e'));
  for (let a = 0; a < 6.28; a += 0.05) R.pset(Math.round(128 + Math.cos(a) * 10), Math.round(46 + Math.sin(a) * 10), H('#6a6e7c'));
  R.rect(150, 28, 152, 66, H('#a8743c')); R.rect(144, 26, 158, 30, K); R.rect(145, 27, 157, 29, H('#8a8e9e'));
  // el rollo de planos colgado con círculos de compás
  R.rect(196, 20, 252, 70, H('#e8dcbc')); R.rect(196, 20, 252, 22, H('#a8743c')); for (let a = 0; a < 6.28; a += 0.04) { R.pset(Math.round(214 + Math.cos(a) * 12), Math.round(46 + Math.sin(a) * 12), H('#3a5a8a')); R.pset(Math.round(238 + Math.cos(a) * 7), Math.round(40 + Math.sin(a) * 7), H('#3a5a8a')); }
  R.linea(202, 46, 226, 46, H('#3a5a8a')); R.linea(214, 34, 214, 58, H('#3a5a8a')); R.linea(232, 60, 248, 60, H('#3a5a8a'));
  // el tablero de la mesa (y 116–180): tablas gruesas con quemaduras y virutas
  tablas(0, 116, 319, 179, H('#7a4a2a'), 103, 10); R.rect(0, 116, 319, 117, H('#c89a5a'));
  for (let k = 0; k < 6; k++) { const x = 20 + h2(k, 104) * 280, y = 124 + h2(k, 105) * 50; R.disco(Math.round(x), Math.round(y), 2, H('#2a1a10')); }
  // las piezas de la armadura: el guantelete a la izquierda, el casco sin cara a la derecha (el obstáculo), el peto al fondo
  R.poligono([[18, 138], [24, 126], [44, 124], [52, 132], [48, 142], [22, 144]], K); R.poligono([[20, 137], [25, 127], [43, 126], [50, 132], [46, 141], [23, 142]], H('#8e92a4'));
  for (let k = 0; k < 4; k++) R.linea(28 + k * 5, 128, 30 + k * 5, 140, H('#5a5e70')); R.linea(25, 128, 43, 127, H('#c8ccd8'));
  R.poligono([[110, 118], [116, 96], [150, 96], [156, 118]], K); R.poligono([[112, 117], [117, 98], [149, 98], [154, 117]], H('#7a7e90')); R.linea(117, 99, 149, 99, H('#c8ccd8')); for (const x of [122, 133, 144]) R.pset(x, 108, H('#c8ccd8'));
  R.disco(232, 120, 22, K); R.disco(232, 120, 21, H('#8e92a4')); R.rect(209, 122, 255, 145, K); R.rect(210, 122, 254, 144, H('#8e92a4'));
  R.disco(226, 114, 13, H('#a8acbc')); R.disco(222, 110, 6, H('#d8dce8')); R.rect(210, 126, 254, 128, H('#5a5e70'));
  for (const x of [214, 232, 250]) { R.disco(x, 136, 1, H('#d8dce8')); }
  // la bandeja de los remaches y una vela en su palmatoria
  R.rect(64, 156, 96, 164, K); R.rect(65, 157, 95, 163, H('#4a4c58')); for (let k = 0; k < 14; k++) R.pset(67 + (k * 7) % 27, 158 + (k * 3) % 5, H('#c8ccd8'));
  R.rect(284, 150, 300, 154, K); R.rect(285, 151, 299, 153, H('#c89a3a')); R.rect(289, 128, 295, 151, H('#f4ecd8')); R.rect(289, 128, 290, 151, H('#ffffff')); R.rect(294, 132, 295, 151, H('#d8ccb0'));
});
const p9 = (t) => { banco9();
  llama(292, 127, 2, 7 + Math.round(Math.sin(t * 8)), t, 9); luz(292, 120, 30, H('#ffd070'), 0.35);
  for (let k = 0; k < 6; k++) { const u = (t * 0.2 + k / 6) % 1; tine(320 - u * 300, 90 - u * 70 + Math.sin(u * 9 + k) * 5, H('#ffb050'), 0.9 - u * 0.6); }
  // la máscara pequeña en la mesa (de su tamaño); Atom entra, la coge en «so small», se la pone y solo ve con un ojo
  const entra = tramo(t, P9, @41.3), coge = t > @41.6, puesta = t > @42.1, va = tramo(t, @42.3, @43.0), choca = @43.0, quita = t > @44.0;
  const rebote = t > choca && t < choca + 0.5 ? Math.sin((t - choca) / 0.5 * Math.PI) : 0;
  const ax = Math.round(lerp(-30, 124, entra) + lerp(0, 66, ease(va)) - rebote * 14), sal = Math.round(rebote * 10);
  const miniF = () => { R.rect(0, 0, 8, 10, K); R.rect(1, 1, 7, 9, H('#8e92a4')); R.rect(1, 1, 2, 9, H('#bcc0ce')); R.rect(7, 1, 7, 9, H('#5a5e70')); R.rect(2, 4, 3, 4, K); R.rect(5, 6, 6, 6, K); R.rect(3, 8, 5, 8, K); R.pset(4, 1, H('#d8dce8')); };
  const mini = (x, y) => T.AT.escalado(R, miniF, 9, 11, x - 9, y - 11, 2);
  if (!coge) mini(150, 168);
  const r = T.AT.atom(R, ax, 172 - sal, t, { s: 2, dir: 1, pose: entra < 1 ? 'camina' : !coge ? 'senala' : !puesta ? 'sostiene' : va > 0 && va < 1 ? 'camina' : quita ? 'brazos' : 'quieto', cara: quita ? 'sonrisa' : t > choca ? 'sorpresa' : 'normal' });
  if (coge && !puesta && r.mano) mini(Math.round(r.mano[0]) + 4, Math.round(r.mano[1]) + 2);
  // puesta: la máscara le tapa la cara entera y deja ver un solo ojo, por un agujero torcido
  if (puesta && !quita) { const [cx, cy] = r.centro.map(Math.round), f = () => { R.rect(0, 0, 12, 11, K); R.rect(1, 1, 11, 10, H('#8e92a4')); R.rect(1, 1, 2, 10, H('#bcc0ce')); R.rect(10, 1, 11, 10, H('#5a5e70')); R.rect(3, 4, 4, 4, K); R.rect(7, 3, 9, 5, K); R.pset(8, 4, H('#ffffff')); R.rect(4, 8, 8, 8, K); R.pset(6, 1, H('#d8dce8')); };
    T.AT.escalado(R, f, 13, 12, cx - 13, cy - 13, 2); }
  if (quita && r.mano) mini(Math.round(r.mano[0]) + 4, Math.round(r.mano[1]) - 6);
  if (t > choca && t < choca + 1.2) { R.bocadillo(ax + 2, 104 - sal, { icono: '!' }); for (let k = 0; k < 4; k++) { const a = t * 6 + k * 1.6; R.rect(Math.round(ax + Math.cos(a) * 16), Math.round(116 + Math.sin(a) * 4), Math.round(ax + Math.cos(a) * 16) + 1, Math.round(116 + Math.sin(a) * 4) + 1, H('#f8e060')); } }
  // el casco tiembla con el golpe
  if (t > choca && t < choca + 0.3) for (let k = 0; k < 3; k++) R.linea(205 - k * 3, 108 + k * 8, 200 - k * 3, 106 + k * 8, H('#ffffff'));
};

// ── 10 · la tina de templar: no se perdona ──────────────────────────────────────────────────────────────────────
const T10 = { mira: @45.18, puno: @46.6, golpe: @48.18, vuelve: @48.7 };
const p10 = (t) => tinaPlano(t, T10);

const efectos = [[@0.5, 'sello'], [@1.3, 'pasos'], [@3.5, 'pop'], [P2 + 0.1, 'viento'], [@5.0, 'golpecito'], [@7.62, 'campana'], [@9.6, 'pasos'], [@11.1, 'papel'],
  [@13.62, 'toc'], [@14.14, 'toc'], [@14.52, 'toc'], [@15.6, 'whoosh'], [@16.44, 'golpecito'], [@19.30, 'toc'], [@20.50, 'toc'], [@23.3, 'vapor'],
  [@24.0, 'golpecito'], [@26.55, 'flash'], [@26.65, 'vapor'], [@27.03, 'chof'], [P7 + 0.15, 'puerta'], [@32.0, 'pasos'], [@33.4, 'puerta'],
  [P8 + 0.3, 'lapiz'], [@38.9, 'lapiz'], [@39.8, 'brillo'], [@41.6, 'pop'], [@43.0, 'boing'], [@46.6, 'whoosh'], [@48.18, 'chof']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10]], { efectos, año: (t) => (t >= P8 && t < P9 ? 1962 : null) });
'''))

E['vd-foco'] = ('El foco', '''// VD-FOCO (frase 18), PAUSA «fíjate»: congela el último plano de vd-mascara (la tina) en gris azulado; año 2000 en
// el experimento. Siete planos de 4,0–7,0 s, cortados en la palabra inglesa:
// 1 «And notice this» la tina congelada: Atom al doble entra y señala; salen a color el «2000» y la torre de la
//   universidad en «Cornell»;
// 2 «asked students to walk» el pasillo de la facultad: la investigadora le da la camiseta; se la pone (rubor) y entra
//   por la puerta en «room»; por el cristal (recortados al hueco), los que esperan charlan y uno cruza buscando sitio;
//   taquillas con rejillas, candados y abolladuras; una chica coge un libro de su taquilla, la cierra y se va; otra
//   cruza al fondo con su carpeta; cartel, salida, extintor, papelera con papeles; un fluorescente parpadea;
// 3 «wearing a T-shirt» el aula: entra con la camiseta amarilla del pato y se planta delante; solo uno lo mira de reojo;
//   la investigadora le pregunta «?» en «how many». Aula con pintura de rodillo, zócalo de tablas, corcho, mapa,
//   reloj con segundero, persiana y baldosas con juntas y brillo; leen y pasan la hoja, uno se rasca, el que mira de
//   reojo deja ver su mirada (puntos) de «walk» a «how many»;
// 4 «They guessed about half» la tablilla en la mesa: la mano escribe «50%» (cinco de diez muñecos) en «half» y «23%»
//   en rojo (dos y pico de diez) en «one in four»;
// 5 «They called it the spotlight effect» el escenario: Atom enciende el foco en «spotlight»; el chico se encoge; el
//   pato brilla en «flaws»;
// 6 «When other people barely look» el patio de butacas: casi nadie mira (leen, charlan, comen palomitas); los dos que
//   miraban al escenario (fila de delante) se dan la vuelta en «barely look», con arcos de movimiento: uno pide
//   palomitas y la otra charla; butacas con capitoné, costuras, reposabrazos dorados y escalones con luces de pasillo;
// 7 «under that spotlight» la tina congelada otra vez: Atom apunta su foco a color a Victor; la máscara brilla en «face
//   forever»; los de alrededor salen en marcos a color con su globo hacia Victor en «something» y en «no one» se dan
//   la vuelta y el globo se recoge; se apaga el foco y vuelve el color.''', _t('vd-foco', _UTIL + _TINA + r'''
const voz = (t) => E.energia(t);
const P2 = @5.18, P3 = @9.92, P4 = @16.9, P5 = @22.02, P6 = @28.52, P7 = @34.5;
// la tina de vd-mascara en su último instante (49,25 s), con sus tiempos escritos en segundos
const T10F = { mira: 45.18, puno: 46.6, golpe: 48.18, vuelve: 48.7 }, FZ = 49.25;
const congelado = () => fijo('congelado', () => tinaPlano(FZ, T10F));
const pausa = (t, a, b) => T.AT.pausa(R, tramo(t, a, a + 0.3) * (1 - tramo(t, b - 0.3, b)));
const pop = (t, t0) => { const u = tramo(t, t0, t0 + 0.25); return u <= 0 ? 0 : u < 1 ? 1 + Math.sin(u * Math.PI) * 0.25 : 1; };
// la camiseta que da vergüenza: amarilla chillona con un pato rosa en el pecho
const CAM = { C: H('#f8d020'), c: H('#c8a010'), W: H('#f8d020') };
const pato = (x, y) => { R.rect(x, y + 1, x + 4, y + 3, H('#f05aa0')); R.rect(x + 3, y - 1, x + 4, y, H('#f05aa0')); R.pset(x + 5, y, H('#e87a1a')); R.pset(x + 4, y - 1, K); };
const chicoCam = (x, suelo, t, o = {}) => { const r = R.actor(EL.chico, x, suelo, t, { ...o, pal: CAM }); pato(x + 5, suelo - 10); if (o.rubor) { R.pset(r.cabeza[0] - 3, r.cabeza[1] + 8, H('#f08a9a')); R.pset(r.cabeza[0] + 3, r.cabeza[1] + 8, H('#f08a9a')); } return r; };

// ── 1 · la pausa: el «2000» y la universidad ──────────────────────────────────────────────────────────────────
const torre = () => { R.rect(0, 8, 23, 25, K); R.rect(1, 9, 22, 24, H('#e8dcc0')); R.rect(8, 0, 15, 9, K); R.rect(9, 1, 14, 8, H('#c8b898')); R.disco(11, 4, 2, H('#f8f4ea')); R.pset(11, 3, K); R.pset(12, 4, K);
  R.poligono([[0, 9], [11, 4], [23, 9]], H('#a84a3a')); for (const x of [3, 8, 14, 19]) R.rect(x, 12, x + 1, 22, H('#a89870')); R.rect(10, 17, 13, 24, H('#5a3a22')); R.rect(1, 24, 22, 24, H('#8a7a5a')); };
const tarjeta2000 = () => { R.rect(0, 0, 35, 15, K); R.rect(1, 1, 34, 14, H('#f8f4ec')); R.rect(1, 12, 34, 14, H('#e8dcc8')); R.numero('2000', 18, 11, { tam: 8, centro: true, color: H('#c8302a') }); };
const f1 = (t) => {
  congelado(); pausa(t, 0, P2 + 1);
  const anda = tramo(t, 0, 0.9), x = lerp(344, 268, ease(anda)), senala = t > @0.34 && t < @1.5;
  const r = T.AT.atom(R, x, 174, t, { s: 2, pose: anda < 1 ? 'camina' : senala || (t > @1.68 && t < @2.6) || (t > @4.02 && t < @4.8) ? 'senala' : 'quieto', dir: -1, cara: senala ? 'guino' : t > @4.0 ? 'sonrisa' : 'normal', habla: voz(t) });
  const u = tramo(t, @1.68, @1.95); if (u > 0) { const y = 44 + Math.round((1 - ease(u)) * 20) + Math.round(Math.sin(t * 2.2) * 1.5); T.AT.escalado(R, tarjeta2000, 36, 16, 30, y, 2); T.AT.anillo(R, 66, y + 16, 44, 24, t, tramo(t, @1.8, @2.4)); }
  const v = pop(t, @4.02); if (v > 0) { const y = 40 + Math.round(Math.sin(t * 2) * 1.5); T.AT.escalado(R, torre, 24, 26, 196, y, 2); T.AT.anillo(R, 220, y + 26, 32, 32, t, tramo(t, @4.1, @4.6)); }
};

// ── 2 · el pasillo de la facultad (2000) ────────────────────────────────────────────────────────────────────────
const pasillo2 = () => fijo('pasillo2', () => {
  // la pared de bloques pintados, el zócalo y el techo de placas con los fluorescentes (la esquina derecha, lisa)
  for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 8), xs = x + (f % 2) * 8, j = y % 8 === 7 || xs % 16 === 0; let c = mez(H('#d8dcc8'), H('#c8ccb4'), (h2(Math.floor(xs / 16), f, 21) - 0.5) * 0.6 + 0.4); if (j) c = mez(c, H('#9a9e88'), 0.6); else if (y % 8 === 0) c = mez(c, H('#ffffff'), 0.12); if (h2(x, y, 27) > 0.95) c = mez(c, K, 0.08); R.pset(x, y, c); }
  R.rect(0, 0, 319, 10, H('#e8ece4')); for (let x = 0; x < 320; x += 24) R.rect(x, 0, x, 10, H('#b8bcb0')); for (const x of [30, 130, 230]) { R.rect(x, 4, x + 36, 8, H('#8a8e84')); R.rect(x + 1, 5, x + 35, 7, H('#ffffff')); }
  R.rect(0, 10, 319, 12, H('#9a9e88')); R.rect(0, 112, 319, 140, H('#4a7a6a')); R.rect(0, 112, 319, 113, H('#6a9a8a')); R.rect(0, 139, 319, 140, H('#2a4a40'));
  for (let x = 0; x < 320; x++) if (h2(x, 5, 28) > 0.8) R.pset(x, 130 + Math.floor(h2(x, 6, 28) * 8), H('#3a6a5a'));
  // las taquillas azules (x 0–92) con sus rejillas, placas, tiradores, candados, abolladuras y rozaduras de zapato
  for (let k = 0; k < 6; k++) { const x = 2 + k * 15; R.rect(x, 40, x + 14, 139, K); R.rect(x + 1, 41, x + 13, 138, H('#3a6ab8')); R.rect(x + 1, 41, x + 2, 138, H('#5a8ad8')); R.rect(x + 12, 41, x + 13, 138, H('#2a5aa0'));
    for (let y = 46; y < 58; y += 3) { R.rect(x + 4, y, x + 10, y, H('#1a3a6a')); R.rect(x + 4, y + 1, x + 10, y + 1, H('#6a9ae0')); }
    R.rect(x + 5, 61, x + 9, 63, H('#c8ccd8')); R.pset(x + 5, 61, H('#ffffff'));
    R.rect(x + 11, 84, x + 12, 92, H('#c8ccd8')); R.pset(x + 11, 84, H('#ffffff'));
    if (k % 2) { R.rect(x + 10, 94, x + 13, 98, H('#e8c040')); R.rect(x + 11, 92, x + 12, 93, H('#9a9eaa')); R.pset(x + 11, 96, K); }
    else if (k !== 4) { R.rect(x + 10, 94, x + 13, 98, H('#8a8e9e')); R.rect(x + 11, 92, x + 12, 93, H('#c8ccd8')); R.pset(x + 10, 94, H('#c8ccd8')); }
    for (let y = 120; y < 130; y += 3) { R.rect(x + 4, y, x + 10, y, H('#1a3a6a')); R.rect(x + 4, y + 1, x + 10, y + 1, H('#6a9ae0')); }
    const ay = 66 + Math.floor(h2(k, 40) * 44), ax = x + 4 + Math.floor(h2(k, 41) * 4); R.rect(ax, ay, ax + 3, ay + 1, H('#2a5094')); R.pset(ax + 1, ay - 1, H('#7aa0e8')); R.pset(ax + 2, ay - 1, H('#7aa0e8'));
    if (h2(k, 42) > 0.35) { R.rect(x + 3, 133, x + 7, 134, H('#2a3a5a')); R.pset(x + 8, 134, H('#2a3a5a')); }
    if (k === 3) { R.rect(x + 4, 102, x + 9, 107, K); R.rect(x + 5, 103, x + 8, 106, H('#f05aa0')); R.pset(x + 6, 104, H('#ffffff')); }
    if (k === 1) { R.disco(x + 7, 74, 3, K); R.disco(x + 7, 74, 2, H('#e8c040')); R.pset(x + 6, 73, K); R.pset(x + 8, 73, K); R.pset(x + 7, 75, K); } }
  R.rect(0, 139, 92, 141, H('#1a2a3a'));
  // el tablón de corcho con papeles de colores (sin letras)
  R.rect(104, 36, 164, 86, H('#6a4a2a')); R.rect(106, 38, 162, 84, H('#c89a5a')); R.rect(106, 38, 162, 38, H('#e8c080')); for (let k = 0; k < 120; k++) R.pset(107 + h2(k, 22) * 54, 39 + h2(k, 23) * 44, H(k % 3 ? '#a87a40' : '#d8aa6a'));
  [[110, 42, 14, 18, '#f8f4ea'], [128, 40, 12, 14, '#f8a8c8'], [144, 44, 14, 16, '#a8d8f8'], [112, 64, 16, 14, '#f8e870'], [132, 60, 12, 18, '#f8f4ea'], [148, 64, 10, 14, '#b8f0a8']].forEach(([x, y, w, h, c], k) => { R.rect(x + 1, y + 1, x + w + 1, y + h + 1, H('#8a5a2a')); R.rect(x, y, x + w, y + h, H(c)); R.rect(x + w, y + 1, x + w, y + h, mez(H(c), K, 0.3)); for (let j = 0; j < 3; j++) R.rect(x + 2, y + 4 + j * 4, x + w - 3 - (k + j) % 3 * 2, y + 4 + j * 4, mez(H(c), K, 0.45)); R.pset(x + w / 2, y, H(['#c8302a', '#3a6ab8'][k % 2])); });
  // el cartel del club de montaña encima de la fuente (sol, montes y barras, sin letras)
  R.rect(167, 34, 197, 84, K); R.rect(168, 35, 196, 83, H('#f4f0e6')); for (let y = 36; y < 66; y++) for (let x = 169; x < 196; x++) R.pset(x, y, mez(H('#4a8ad8'), H('#a8d0f0'), (y - 36) / 30 + (bay(x, y) - 0.5) * 0.15));
  R.disco(188, 44, 4, H('#f8d040')); R.poligono([[169, 66], [178, 48], [184, 56], [189, 50], [196, 66]], H('#3a7a4a')); R.poligono([[176, 52], [178, 48], [180, 52]], H('#f4f0e6'));
  R.rect(171, 70, 193, 72, H('#c8302a')); R.rect(171, 75, 187, 75, H('#5a5e6e')); R.rect(171, 78, 190, 78, H('#5a5e6e')); R.pset(182, 34, H('#c8302a'));
  // la fuente de agua con su caño, su pila y el desagüe
  R.rect(172, 92, 190, 110, K); R.rect(173, 93, 189, 109, H('#c8ccd8')); R.rect(173, 93, 189, 95, H('#e8ecf4')); R.rect(175, 97, 187, 101, H('#8a8e9e')); R.rect(176, 98, 186, 100, H('#5a5e6e')); R.rect(180, 95, 182, 97, H('#e8ecf4')); R.pset(181, 99, K); R.rect(186, 103, 188, 105, H('#3a6ab8'));
  R.rect(178, 110, 184, 128, H('#8a8e9e')); R.rect(178, 110, 178, 128, H('#a8acb8'));
  // la puerta del aula (x 206–246, y 58–139) con su cristal; el marco va delante (se pinta en vivo); la salida de emergencia encima
  R.rect(202, 54, 250, 139, H('#5a3a22'));
  R.rect(214, 43, 238, 51, K); R.rect(215, 44, 237, 50, H('#2a9a4a')); R.pset(220, 45, H('#f4f4ec')); R.linea(220, 46, 219, 48, H('#f4f4ec')); R.linea(219, 48, 217, 49, H('#f4f4ec')); R.linea(219, 48, 221, 49, H('#f4f4ec')); R.linea(220, 46, 222, 47, H('#f4f4ec'));
  R.linea(226, 47, 233, 47, H('#f4f4ec')); R.linea(231, 45, 233, 47, H('#f4f4ec')); R.linea(231, 49, 233, 47, H('#f4f4ec'));
  // el reloj de pared, el extintor en su soporte y la papelera con papeles; la planta en la esquina de abajo
  R.disco(270, 64, 9, K); R.disco(270, 64, 8, H('#f8f4ea')); R.disco(271, 65, 7, H('#ece6d8')); R.disco(270, 64, 6, H('#f8f4ea')); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.pset(Math.round(270 + Math.sin(a) * 7), Math.round(64 - Math.cos(a) * 7), K); }
  R.rect(254, 96, 266, 116, H('#b8bca8')); R.rect(254, 96, 266, 96, H('#9a9e88')); R.rect(258, 92, 262, 93, H('#2a2a30')); R.rect(259, 89, 261, 91, H('#c8ccd8'));
  R.rect(256, 94, 264, 120, K); R.rect(257, 95, 263, 119, H('#c8302a')); R.rect(257, 95, 258, 119, H('#e85a4a')); R.rect(262, 95, 263, 119, H('#8a1a1a')); R.rect(257, 104, 263, 109, H('#f4f0e6')); R.rect(259, 105, 261, 108, H('#c8302a'));
  R.linea(262, 91, 266, 94, K); R.linea(266, 94, 266, 112, K); R.rect(265, 112, 267, 114, H('#2a2a30'));
  R.rect(258, 124, 272, 140, K); R.rect(259, 125, 271, 139, H('#5a5e6e')); R.rect(259, 125, 260, 139, H('#7a7e8e')); for (let x = 261; x < 271; x += 3) R.rect(x, 126, x, 138, H('#3a3c48'));
  for (const [x, y, r] of [[262, 123, 2], [267, 122, 3], [264, 120, 2]]) { R.disco(x, y, r, H('#e8e4d8')); R.pset(x - 1, y, H('#a8a498')); R.pset(x + 1, y - 1, H('#ffffff')); }
  R.rect(292, 122, 310, 140, K); R.rect(293, 123, 309, 139, H('#c86a3a')); R.rect(293, 123, 309, 125, H('#e88a5a')); for (let k = 0; k < 9; k++) { const a = -1.4 + k * 0.35; R.linea(301, 122, Math.round(301 + Math.cos(a) * 18), Math.round(122 + Math.sin(a) * 26 - 6), H(k % 2 ? '#3a8a4a' : '#2a6a3a')); }
  // el linóleo a cuadros con su brillo, rozaduras y una bola de papel
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const s = 10 + (y - 140) * 0.3, q = (Math.floor((x - 160) / s) + Math.floor((y - 140) / (s * 0.5))) & 1; let c = q ? H('#c8c4b0') : H('#9a9684'); if (bay(x, y) < 0.06) c = mez(c, K, 0.15); if (h2(x >> 2, y, 29) > 0.985) c = mez(c, K, 0.3); R.pset(x, y, c); }
  for (const x of [48, 148, 248]) for (let y = 142; y < 178; y++) if (bay(x, y) < 0.4) R.pset(x + Math.round((y - 140) * 0.2), y, H('#f4f4ec'));
  for (let x = 0; x < 320; x++) R.pset(x, 141, mez(R.pget(x, 141), K, 0.25));
  R.disco(282, 151, 2, H('#e8e4d8')); R.pset(281, 151, H('#a8a498')); R.pset(283, 150, H('#ffffff')); R.rect(280, 153, 285, 153, mez(H('#9a9684'), K, 0.3));
});
// el aula que se ve por el cristal o por la puerta abierta (recortada al hueco): pizarra, pared, pupitres y los que esperan
const aulaTras = (t, x0, y0, x1, y1, cristal) => {
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let c = y < 70 ? mez(H('#2a4a3a'), H('#3a5a4a'), bay(x, y) * 0.4) : y < 94 ? mez(H('#e0d4b4'), H('#c8bc9c'), bay(x, y) * 0.5 + (y - 70) / 60) : mez(H('#7a7666'), K, (y - 94) / 70); if (y === 70) c = H('#8a6a44'); R.pset(x, y, c); }
  for (let x = x0; x <= x1; x++) if (h2(x, 3, 50) > 0.6) R.pset(x, 62 + (x % 5), H('#c8d8c8'));
  // uno cruza al fondo buscando sitio; dos sentados hablan y se vuelven
  const u = tramo(t, P2 + 0.4, P2 + 3.8); R.actor(EL.oficinista, Math.round(lerp(196, 244, u)), 98, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true });
  R.actor(EL.chica, 205, 106, t, { dir: Math.sin(t * 0.9) > 0.2 ? 1 : -1, habla: Math.sin(t * 7) > 0.2 && Math.floor(t * 0.8) % 2 === 0, sonrisa: true });
  R.actor(EL.senor30, 224, 106, t, { dir: -1, habla: Math.sin(t * 7 + 2) > 0.2 && Math.floor(t * 0.8) % 2 === 1 });
  for (let y = 94; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (y <= 100) R.pset(x, y, y === 94 ? H('#e8c080') : y === 100 ? K : mez(H('#b8864a'), K, (x % 12 === 0) ? 0.3 : 0)); else if (x % 12 === 2 || x % 12 === 11) R.pset(x, y, H('#3a3c48')); }
  if (cristal) for (let k = 0; k < 44; k++) { tine(x0 + 2 + k, y0 + k, H('#ffffff'), 0.28); tine(x0 + 5 + k, y0 + k, H('#ffffff'), 0.14); tine(x0 + 14 + k, y0 + k, H('#ffffff'), 0.1); }
  R.recorte(null);
};
const f2 = (t) => { pasillo2();
  // el fluorescente del centro parpadea; el reloj con su segundero
  if (Math.sin(t * 31) > 0.2 && (t % 2.7) < 0.6) { R.rect(131, 5, 165, 7, H('#b8bcb0')); R.rect(150, 6, 160, 6, H('#e8ece4')); }
  const sg = t * Math.PI / 30 + 1.2; R.linea(270, 64, 268, 59, K); R.linea(270, 64, 274, 66, K); R.linea(270, 64, Math.round(270 + Math.sin(sg) * 7), Math.round(64 - Math.cos(sg) * 7), H('#c8302a')); R.pset(270, 64, K);
  // la puerta del aula: por el cristal, los que esperan; se abre en «room» y por el hueco se ve el aula
  const abre = tramo(t, @9.0, @9.4), w = Math.round(lerp(40, 6, abre));
  if (abre > 0) aulaTras(t, 207 + w, 58, 246, 138, false);
  R.rect(206, 58, 206 + w, 139, K); R.rect(207, 59, 205 + w, 138, H('#b8865a')); for (let x = 209; x < 205 + w; x += 5) R.rect(x, 60, x, 137, H('#a8764a')); R.rect(207, 59, 207, 138, H('#d8a67a'));
  if (w > 20) { const gx1 = 206 + w - 7; R.rect(211, 63, gx1 + 1, 101, K); aulaTras(t, 212, 64, gx1, 100, true); R.rect(208, 126, 204 + w, 135, H('#a8acb8')); R.rect(208, 126, 204 + w, 126, H('#d8dce4')); R.rect(202 + w, 108, 203 + w, 114, H('#c8ccd8')); R.pset(202 + w, 108, H('#ffffff')); }
  // al fondo: una compañera cruza con su carpeta; otra coge un libro de su taquilla, la cierra y se va a clase
  const bx = Math.round(-22 + (t - P2) * 30), rb = R.actor(EL.senora30, bx, 145, t, { dir: 1, anda: true, sostiene: true }); if (rb.mano) { const [mx, my] = rb.mano; R.rect(mx - 3, my - 5, mx + 2, my + 2, K); R.rect(mx - 2, my - 4, mx + 1, my + 1, H('#c8302a')); }
  const cierra = tramo(t, @8.2, @8.5), pw = Math.round(lerp(8, 0, cierra));
  if (pw > 0) { R.rect(63, 41, 75, 138, H('#1a2238')); R.rect(63, 41, 75, 44, H('#0e1424')); R.rect(63, 70, 75, 71, H('#5a6a8a')); R.rect(64, 60, 66, 69, H('#c8302a')); R.rect(67, 62, 69, 69, H('#e8c040')); if (t < @7.6) R.rect(70, 58, 72, 69, H('#3a8a4a')); R.rect(73, 63, 74, 69, H('#f4f0e6'));
    R.rect(66, 76, 72, 98, H('#8a4a2a')); R.rect(66, 76, 67, 98, H('#a86a3a')); R.rect(68, 74, 70, 76, H('#c8ccd8')); R.rect(64, 128, 74, 137, H('#3a3c48'));
    R.rect(62 - pw, 40, 62, 139, K); R.rect(63 - pw, 41, 61, 138, H('#2a5aa8')); R.rect(63 - pw, 41, 63 - pw, 138, H('#4a7ac8')); for (let y = 46; y < 58; y += 3) R.rect(64 - pw, y, 60, y, H('#1a3a6a')); }
  const gx = Math.round(lerp(78, 22, tramo(t, @8.6, P3)));
  const rg = R.actor(EL.chica, gx, 147, t, { dir: -1, anda: t > @8.6, sostiene: t < @7.6 ? [70 + Math.round(Math.sin(t * 6) * 2), 108 + Math.round(Math.cos(t * 5) * 3)] : true });
  if (t > @7.6 && rg.mano) { const [mx, my] = rg.mano; R.rect(mx - 3, my - 5, mx + 2, my + 2, K); R.rect(mx - 2, my - 4, mx + 1, my + 1, H('#3a8a4a')); R.rect(mx - 2, my - 4, mx - 2, my + 1, H('#f4f0e6')); }
  // la investigadora le da la camiseta y él se la pone (puf) en «students»; luego cruza hasta la puerta
  const da = t > @5.6, pone = @6.2, puesta = t > pone, va = tramo(t, @6.68, @9.0), entra = tramo(t, @9.4, P3);
  const cx = Math.round(lerp(84, 210, va) + entra * 16);
  const ri = R.actor(EL.tecnica, 126, 160, t, { dir: -1, sostiene: !da ? true : undefined, habla: t < @6.6 && Math.sin(t * 9) > 0, dedo: t > @6.7 && t < @8.0, sonrisa: puesta });
  if (!da && ri.mano) { const [x, y] = ri.mano; R.rect(x - 5, y - 2, x + 3, y + 3, K); R.rect(x - 4, y - 1, x + 2, y + 2, CAM.C); pato(x - 3, y); }
  if (da && !puesta) { R.rect(cx + 10, 144, cx + 18, 150, K); R.rect(cx + 11, 145, cx + 17, 149, CAM.C); }
  if (entra < 1) { const o = { dir: 1, anda: va > 0 && va < 1 || entra > 0, sorpresa: puesta && t < @7.4, rubor: puesta, sostiene: da && !puesta ? [cx + 14, 146] : undefined };
    if (puesta) chicoCam(cx, 160, t, o); else R.actor(EL.chico, cx, 160, t, o); }
  if (t > pone - 0.1 && t < pone + 0.4) { const u = (t - pone + 0.1) / 0.5; for (let k = 0; k < 8; k++) { const a = k * 0.785, r = 6 + u * 10; R.disco(Math.round(cx + 7 + Math.cos(a) * r), Math.round(146 + Math.sin(a) * r * 0.8), 2, H('#f4f4ec')); } }
  // el marco de la puerta por delante, y un compañero que pasa por delante con su mochila
  R.rect(202, 54, 205, 139, H('#5a3a22')); R.rect(247, 54, 250, 139, H('#5a3a22')); R.rect(202, 54, 250, 57, H('#5a3a22')); R.rect(203, 55, 204, 139, H('#7a5a3a')); R.rect(202, 54, 250, 54, H('#7a5a3a'));
  const pp = ((t - P2) / 6) % 1; R.actor(EL.sudadera, Math.round(lerp(330, -30, pp)), 168, t, { dir: -1, anda: true });
};

// ── 3 · el aula: casi nadie lo mira ─────────────────────────────────────────────────────────────────────────────
const aula3 = () => fijo('aula3', () => {
  // la pared de pintura plástica (manchas de rodillo, motas) con la luz de la ventana a la izquierda
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { let c = mez(H('#e8dcc0'), H('#d4c4a2'), y / 160); const n = h2(x >> 3, y >> 2, 31);
    c = mez(c, n > 0.5 ? H('#f6eedc') : H('#b8a888'), Math.abs(n - 0.5) * 0.24); if (x % 9 === 0 && h2(x, y >> 4, 32) > 0.6) c = mez(c, H('#b8a888'), 0.12);
    if (bay(x, y) < 0.08) c = mez(c, H('#c8b898'), 0.3); c = mez(c, H('#fff4d8'), Math.max(0, 1 - x / 170) * 0.2); R.pset(x, y, c); }
  R.rect(0, 0, 319, 6, H('#f4f0e8')); R.rect(0, 6, 319, 7, H('#b8ac94')); for (let x = 0; x < 320; x += 20) R.rect(x, 0, x, 5, H('#d8d0c0'));
  // el zócalo de madera (tablas de pie) con su moldura
  tablas(0, 100, 319, 123, H('#9a7448'), 5, 16, true); R.rect(0, 96, 319, 97, H('#c8a070')); R.rect(0, 98, 319, 99, H('#6a4a2a'));
  // la pizarra blanca con esquemas (flechas, círculos, una gráfica), su bandeja con rotuladores y el borrador
  R.rect(70, 22, 220, 82, H('#8a8e9e')); R.rect(72, 24, 218, 80, H('#f8f8f4')); R.rect(72, 80, 218, 83, H('#6a6e7c')); R.rect(70, 22, 220, 22, H('#b8bcc8'));
  for (let k = 0; k < 30; k++) { const x = 76 + Math.floor(h2(k, 60) * 138), y = 27 + Math.floor(h2(k, 61) * 50); R.linea(x, y, x + 6, y - 2, H('#e4e6ea')); }
  for (let a = 0; a < 6.28; a += 0.05) R.pset(Math.round(100 + Math.cos(a) * 12), Math.round(48 + Math.sin(a) * 12), H('#3a6ab8'));
  R.linea(116, 48, 140, 48, H('#3a6ab8')); R.linea(136, 45, 140, 48, H('#3a6ab8')); R.linea(136, 51, 140, 48, H('#3a6ab8'));
  R.linea(150, 72, 150, 32, H('#2a2a3a')); R.linea(150, 72, 206, 72, H('#2a2a3a')); [[156, 60], [166, 52], [176, 56], [186, 40], [196, 44]].forEach(([x, y], k, A) => { if (k) R.linea(A[k - 1][0], A[k - 1][1], x, y, H('#c8302a')); R.disco(x, y, 1, H('#c8302a')); });
  R.rect(90, 77, 96, 79, H('#c8302a')); R.rect(100, 77, 106, 79, H('#3a6ab8')); R.rect(196, 76, 208, 79, H('#2a2a3a')); R.rect(196, 76, 208, 76, H('#5a5e6e'));
  // el reloj (las agujas van en vivo)
  R.disco(248, 34, 8, K); R.disco(248, 34, 7, H('#f8f4ea')); R.disco(249, 35, 6, H('#ece6d8')); R.disco(248, 34, 5, H('#f8f4ea')); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.pset(Math.round(248 + Math.sin(a) * 6), Math.round(34 - Math.cos(a) * 6), H('#5a5e6e')); }
  // el corcho con avisos (sin letras) y el mapa enrollable
  R.rect(224, 46, 260, 70, H('#6a4a2a')); R.rect(225, 47, 259, 69, H('#c89a5a')); for (let k = 0; k < 70; k++) R.pset(226 + h2(k, 62) * 33, 48 + h2(k, 63) * 21, H(k % 3 ? '#a87a40' : '#d8aa6a'));
  [[228, 49, 9, 8, '#f8f4ea'], [239, 48, 8, 10, '#f8e870'], [250, 50, 7, 7, '#a8d8f8'], [229, 59, 9, 8, '#f8a8c8'], [241, 60, 7, 7, '#f8f4ea'], [251, 59, 6, 8, '#b8f0a8']].forEach(([x, y, w, h, c], k) => { R.rect(x + 1, y + 1, x + w + 1, y + h + 1, H('#8a5a2a')); R.rect(x, y, x + w, y + h, H(c)); for (let j = 0; j < 2; j++) R.rect(x + 2, y + 3 + j * 3, x + w - 2 - (k + j) % 2 * 2, y + 3 + j * 3, mez(H(c), K, 0.45)); R.pset(x + (w >> 1), y, H(['#c8302a', '#3a6ab8'][k % 2])); });
  R.rect(222, 73, 262, 75, H('#5a3a22')); R.rect(222, 73, 262, 73, H('#8a6a44')); R.rect(224, 76, 260, 94, H('#f4ecd8')); R.rect(225, 77, 259, 93, H('#7ab0d8'));
  for (let x = 229; x < 259; x += 6) for (let y = 77; y < 94; y += 2) R.pset(x, y, H('#9ac4e4')); for (let x = 225; x < 260; x += 2) R.pset(x, 85, H('#9ac4e4'));
  for (const [x, y, r, c] of [[231, 81, 4, '#c8b878'], [234, 88, 3, '#a8c070'], [246, 80, 5, '#c8b878'], [249, 86, 3, '#a8c070'], [254, 89, 2, '#c8b878'], [242, 90, 2, '#a8c070']]) { R.disco(x, y, r, H(c)); R.pset(x - 1, y - r + 1, H('#f4e8b8')); }
  R.rect(224, 94, 260, 95, H('#8a6a44')); R.pset(242, 96, H('#c8302a'));
  // la ventana del campus (x 6–58, y 20–96) con su alféizar
  R.rect(4, 18, 60, 98, H('#f4f0e8')); R.rect(6, 20, 58, 96, K); R.rect(31, 20, 33, 96, H('#f4f0e8')); R.rect(6, 57, 58, 59, H('#f4f0e8')); R.rect(2, 97, 62, 100, H('#e0dccc')); R.rect(2, 100, 62, 100, H('#a8a090'));
  // la estantería con libros a la derecha (x 266–318, y 48–128)
  R.rect(266, 48, 318, 128, H('#5a3a22')); R.rect(266, 48, 318, 49, H('#7a5232')); for (let f = 0; f < 4; f++) { const y = 52 + f * 19; R.rect(268, y + 16, 316, y + 18, H('#7a5232')); R.rect(268, y + 16, 316, y + 16, H('#9a7252'));
    let x = 269; while (x < 314) { const w = 2 + Math.floor(h2(x, f, 24) * 3), hh = 10 + Math.floor(h2(x, f, 25) * 6); R.rect(x, y + 16 - hh, x + w, y + 15, H(['#c8302a', '#3a6ab8', '#e8c040', '#3a8a4a', '#8a4ab8', '#f4f0e6'][Math.floor(h2(x, f, 26) * 6)])); R.pset(x, y + 16 - hh, mez(H('#ffffff'), K, 0.2)); R.rect(x + w, y + 16 - hh, x + w, y + 15, mez(H('#000000'), K, 0.5)); x += w + 1; } }
  // el suelo de baldosas de linóleo: juntas, bisel con luz, tono de cada pieza, marcas y el brillo de la cera
  R.rect(0, 124, 319, 128, H('#8a7e6a')); R.rect(0, 124, 319, 124, H('#a89a80'));
  for (let y = 128; y < 180; y++) { const fy = y - 128, row = Math.floor(fy / 13), jy = fy % 13; for (let x = 0; x < 320; x++) { const col = Math.floor(x / 26), jx = x % 26, q = h2(col, row, 33);
    let c = mez(q > 0.5 ? H('#bab6a4') : H('#a6a292'), H('#7a7666'), fy / 80); c = mez(c, q > 0.5 ? H('#ffffff') : K, Math.abs(q - 0.5) * 0.14);
    if (jy === 12 || jx === 0) c = mez(c, K, 0.34); else if (jy === 0 || jx === 1) c = mez(c, H('#ffffff'), 0.16);
    if (h2(x, y, 34) > 0.975) c = mez(c, K, 0.2); if (Math.abs(x - 170 - fy * 0.5) < 26 && bay(x, y) < 0.22) c = mez(c, H('#ffffff'), 0.2);
    R.pset(x, y, c); } }
  // la mancha de sol de la ventana en el suelo
  for (let y = 130; y < 168; y++) for (let x = 0; x < 120; x++) { const a = x - (y - 130) * 0.9; if (a > 6 && a < 58 && bay(x, y) < 0.35) R.pset(x, y, mez(R.pget(x, y), H('#fff4d0'), 0.4)); }
  // mochilas y una carpeta en el suelo; la papelera con papeles
  for (const [x, y, c] of [[44, 150, '#c8302a'], [128, 176, '#3a6ab8'], [210, 150, '#3a8a4a'], [292, 176, '#e8a030']]) { R.rect(x - 1, y - 11, x + 10, y, K); R.rect(x, y - 10, x + 9, y - 1, H(c)); R.rect(x + 2, y - 7, x + 7, y - 3, mez(H(c), K, 0.3)); R.rect(x, y - 10, x + 9, y - 10, mez(H(c), H('#ffffff'), 0.3)); R.rect(x + 3, y - 12, x + 6, y - 11, K); R.rect(x, y + 1, x + 10, y + 1, mez(H('#a09c8c'), K, 0.35)); }
  R.rect(300, 134, 314, 150, K); R.rect(301, 135, 313, 149, H('#5a5e6e')); R.rect(301, 135, 302, 149, H('#7a7e8e')); for (const [dx, dy] of [[3, -2], [7, -3], [10, -1]]) { R.disco(300 + dx, 135 + dy, 2, H('#f4f0e6')); R.pset(300 + dx, 135 + dy, H('#b8b4a8')); }
  R.rect(160, 172, 178, 175, H('#e8c040')); R.rect(162, 170, 176, 172, H('#f4f0e6'));
});
const pupitre = (x, y) => { R.rect(x, y, x + 30, y + 3, K); R.rect(x + 1, y + 1, x + 29, y + 2, H('#c89a5a')); R.rect(x + 1, y, x + 29, y, H('#e8c080')); for (let i = x + 3; i < x + 29; i += 7) R.pset(i, y + 2, H('#a87a40')); R.rect(x + 2, y + 4, x + 3, y + 18, H('#5a5e6e')); R.rect(x + 27, y + 4, x + 28, y + 18, H('#5a5e6e')); R.rect(x + 4, y + 4, x + 26, y + 9, H('#7a7e8e')); R.rect(x + 4, y + 4, x + 26, y + 4, H('#9a9eae')); };
// el libro abierto en la mano; cada tanto pasa la hoja
const libro = (mx, my, t, k) => { R.rect(mx - 4, my - 4, mx + 4, my + 2, K); R.rect(mx - 3, my - 3, mx + 3, my + 1, H('#f4f0e6')); R.rect(mx, my - 3, mx, my + 1, H('#3a6ab8')); R.pset(mx - 2, my - 2, H('#a8a498')); R.pset(mx + 2, my - 1, H('#a8a498'));
  const u = ((t + k * 0.7) % 1.8) / 0.35; if (u < 1) { const px = mx + Math.round(Math.cos(u * Math.PI) * 3); R.linea(px, my - 4, px, my + 1, H('#ffffff')); R.pset(px, my - 5, K); } };
const f3 = (t) => { aula3();
  // por la ventana, árboles del campus que se mecen y un ciclista que pasa; la persiana a medio bajar
  R.recorte([6, 20, 58, 96]); for (let y = 20; y < 97; y++) for (let x = 6; x < 59; x++) R.pset(x, y, mez(H('#7ab0e8'), H('#c8e0f8'), (y - 20) / 76));
  for (const [x, y, r] of [[18, 70, 12], [44, 64, 14]]) { const a = Math.round(Math.sin(t * 1.2 + x) * 1.5); R.disco(x + a, y, r, H('#3a8a4a')); R.disco(x + a - 3, y - 4, r - 5, H('#5aaa5a')); R.disco(x + a + 4, y + 4, r - 7, H('#2a6a3a')); R.rect(x - 1, y + r - 4, x + 1, 96, H('#5a3a22')); }
  R.rect(6, 88, 58, 96, H('#8a8e7a')); const bx = Math.round(lerp(-10, 70, ((t - P3) / 5) % 1)); R.disco(bx, 92, 2, K); R.disco(bx + 7, 92, 2, K); R.linea(bx, 92, bx + 4, 86, K); R.rect(bx + 2, 82, bx + 5, 86, H('#c8302a')); R.recorte(null);
  for (let y = 21; y < 42; y += 3) { R.rect(6, y, 58, y + 1, H('#f0ecdc')); R.rect(6, y + 2, 58, y + 2, H('#b8b0a0')); } R.rect(6, 42, 58, 43, H('#a8a090')); R.rect(31, 21, 33, 43, H('#f4f0e8'));
  const sw = Math.round(Math.sin(t * 1.6) * 1.5); R.linea(54, 43, 54 + sw, 62, H('#d8d0c0')); R.rect(53 + sw, 62, 55 + sw, 64, H('#c8b898'));
  // el reloj: agujas y segundero que corre
  const sg = t * Math.PI / 30 + 0.4; R.linea(248, 34, 248, 29, K); R.linea(248, 34, 252, 35, K); R.linea(248, 34, Math.round(248 + Math.sin(sg) * 6), Math.round(34 - Math.cos(sg) * 6), H('#c8302a')); R.pset(248, 34, K);
  // los estudiantes que esperan, tras sus pupitres: leen y pasan la hoja, escriben, charlan, uno se rasca la cabeza; solo uno lo mira de reojo
  const mira = t > @10.9 && t < @13.9;
  const FILAS = [[EL.chica, 66, 134, 1, 'lee'], [EL.oficinista, 104, 134, -1, 'rasca'], [EL.sudadera, 220, 134, 1, 'charla2'], [EL.senora30, 258, 134, -1, 'escribe'], [EL.estudiante ?? EL.senor30, 84, 160, 1, 'mira'], [EL.clienta, 236, 160, -1, 'lee']];
  FILAS.forEach(([d, x, y, dir, q], k) => { const o = { dir };
    if (q === 'charla2') { o.habla = Math.sin(t * 8) > 0 && Math.floor(t) % 2 === 1; o.sonrisa = true; }
    if (q === 'rasca') { const r = (t % 2.4) < 1.1; o.sostiene = r ? [x + 1 + Math.round(Math.sin(t * 18)), y - 22] : [x + 2, y - 10]; o.parpadea = r; }
    if (q === 'mira') { o.dir = mira ? 1 : -1; o.sorpresa = mira && t < @11.6; }
    if (q === 'lee' || q === 'escribe') o.sostiene = [x + (dir > 0 ? 12 : 2), y - 10];
    const r = R.actor(d, x, y, t, o);
    if (q === 'lee' && r.mano) libro(r.mano[0], r.mano[1], t, k);
    if (q === 'escribe' && r.mano) { R.rect(r.mano[0] - 5, y - 10, r.mano[0] + 3, y - 9, H('#f4f0e6')); R.linea(r.mano[0], r.mano[1], r.mano[0] - 3, r.mano[1] + 3 + Math.round(Math.sin(t * 14)), H('#e8c040')); }
    if (q === 'mira' && mira) { const [hx, hy] = r.cabeza; for (let j = 0; j < 4; j++) if (Math.sin(t * 10 - j) > -0.3) R.pset(hx + 8 + j * 4, hy + 6 - j, H('#f4f4ec')); R.pset(hx + 9, hy + 2, K); R.pset(hx + 10, hy + 1, K); }
    pupitre(x - 8, y - 9); });
  // él entra por la izquierda con la camiseta y se planta delante; la investigadora asoma y le pregunta en «how many»
  const va = tramo(t, P3 + 0.1, @11.4), cx = Math.round(lerp(-20, 146, va));
  const piensa = t > @14.2;
  chicoCam(cx, 172, t, { dir: va < 1 ? 1 : t > @13.8 ? -1 : 1, anda: va > 0 && va < 1, rubor: true, sorpresa: va >= 1 && t < @12.4, dedo: piensa });
  const iv = tramo(t, @12.8, @13.6), ix = Math.round(lerp(-24, 110, iv));
  if (iv > 0) { const ri = R.actor(EL.tecnica, ix, 174, t, { dir: 1, anda: iv < 1, sostiene: true, habla: iv >= 1 && t < @15.4 && Math.sin(t * 9) > 0 }); if (ri.mano) { const [x, y] = ri.mano; R.rect(x - 3, y - 6, x + 4, y + 3, K); R.rect(x - 2, y - 5, x + 3, y + 2, H('#f4f0e6')); R.rect(x - 1, y - 6, x + 2, y - 5, H('#8a8e9e')); } }
  if (t > @13.64 && t < @15.0) R.bocadillo(ix + 10, 136, { icono: '?' });
  if (piensa) { R.bocadillo(cx + 10, 134, { icono: '?' }); for (let k = 0; k < 2; k++) R.pset(cx + 6 - k * 2, 140 + k * 2, H('#f4f4ec')); }
};

// ── 4 · la tablilla: 50 % creían; 23 % fueron ─────────────────────────────────────────────────────────────────
const tabla4 = () => fijo('tabla4', () => {
  tablas(0, 0, 319, 179, H('#8a5a32'), 31, 12);
  // la tablilla con su pinza y la hoja (x 92–300, y 48–178)
  R.rect(90, 50, 302, 180, K); R.rect(91, 51, 301, 180, H('#a87a4a')); R.rect(91, 51, 301, 52, H('#c89a6a'));
  R.rect(100, 58, 294, 180, H('#d8d0c0')); R.rect(98, 56, 292, 180, H('#f8f6ee')); for (let y = 72; y < 180; y += 10) R.rect(104, y, 288, y, H('#d8e4f0')); R.rect(116, 56, 116, 179, H('#f0b8b8'));
  R.rect(168, 42, 224, 60, K); R.rect(169, 43, 223, 59, H('#a8acbc')); R.rect(169, 43, 223, 45, H('#e8ecf4')); R.rect(186, 36, 206, 44, K); R.rect(187, 37, 205, 43, H('#8a8e9e')); R.disco(196, 52, 3, H('#5a5e6e'));
  // las cosas de la mesa, a la izquierda: el lapicero, el disquete, la grapadora, la taza y una manzana
  R.rect(14, 30, 36, 60, K); R.rect(15, 31, 35, 59, H('#3a6ab8')); for (const [dx, c] of [[3, '#e8c040'], [8, '#c8302a'], [13, '#3a8a4a'], [17, '#2a2a3a']]) { R.linea(15 + dx, 31, 13 + dx, 12, H(c)); R.pset(13 + dx, 12, K); }
  R.rect(44, 40, 78, 74, K); R.rect(45, 41, 77, 73, H('#2a2a3a')); R.rect(52, 41, 70, 52, H('#a8acbc')); R.rect(63, 43, 67, 50, H('#2a2a3a')); R.rect(49, 58, 73, 72, H('#e8e8e0'));
  R.rect(12, 84, 50, 98, K); R.rect(13, 85, 49, 93, H('#c8302a')); R.rect(13, 94, 49, 97, H('#3a3c48'));
  R.disco(40, 134, 14, K); R.disco(40, 134, 13, H('#f4f0e6')); R.disco(40, 134, 10, H('#6a3a1a')); R.disco(38, 132, 4, H('#8a5a2a')); R.rect(53, 128, 59, 140, K); R.rect(54, 130, 57, 138, H('#f4f0e6'));
  R.disco(30, 166, 8, K); R.disco(30, 166, 7, H('#c8302a')); R.disco(27, 163, 2, H('#f88a8a')); R.rect(30, 156, 31, 159, H('#5a3a22'));
  for (let k = 0; k < 6; k++) R.rect(60 + k * 4, 104 + (k % 2) * 2, 62 + k * 4, 105 + (k % 2) * 2, H('#f4e8c8'));
});
const persona = (x, y, on, c) => { R.disco(x + 2, y + 1, 1, on ? c : H('#c8c4b8')); R.rect(x, y + 3, x + 4, y + 8, on ? c : H('#c8c4b8')); };
const f4 = (t) => { tabla4();
  // el vaho del café y una hormiga que cruza la mesa
  vaho(40, 124, t, 5, 22, 0.6, 33, 3);
  { const ax = Math.round(lerp(4, 86, ((t - P4) / 5) % 1)); R.rect(ax, 116, ax + 3, 117, K); R.pset(ax + 1, 118, K); R.pset(ax + 3, 115, K); }
  // fila 1 (la suposición): la cabeza con su bocadillo; diez muñecos, cinco se encienden en «half»; «50%»
  R.disco(130, 92, 6, H('#3a3a4a')); R.disco(130, 92, 5, H('#f0c8a0')); R.rect(138, 78, 150, 86, H('#3a3a4a')); R.rect(139, 79, 149, 85, H('#ffffff')); R.pset(137, 88, H('#3a3a4a')); R.pset(135, 90, H('#3a3a4a'));
  R.rect(142, 81, 143, 82, H('#3a3a4a')); R.rect(145, 81, 146, 82, H('#3a3a4a'));
  const u1 = tramo(t, @17.7, @18.3); for (let k = 0; k < 10; k++) persona(154 + k * 8, 86, k < Math.round(u1 * 5), H('#e8803a'));
  const n1 = tramo(t, @18.0, @18.8); if (n1 > 0) R.numero('50%', 264, 102, { tam: 16, centro: true, n: Math.round(n1 * 50), color: H('#2a2a3a') });
  // fila 2 (la realidad): el ojo; dos y un tercio se encienden en «one in four»; «23%» en rojo
  R.disco(130, 142, 6, H('#3a3a4a')); R.disco(130, 142, 5, H('#f8f8f4')); R.disco(130, 142, 2, H('#3a6ab8')); R.pset(130, 142, K);
  const u2 = tramo(t, @20.0, @21.0); for (let k = 0; k < 10; k++) persona(154 + k * 8, 136, k < Math.floor(u2 * 2.3) || (k === 2 && u2 >= 1 && bay(156 + k * 8, 138) < 0.3), H('#c8302a'));
  const n2 = tramo(t, @20.9, @21.6); if (n2 > 0) R.numero('23%', 264, 152, { tam: 16, centro: true, n: Math.round(n2 * 50), color: H('#c8302a') });
  R.linea(124, 118, 288, 118, H('#9a9aa8'));
  if (t > @21.3) T.AT.anillo(R, 262, 146, 26, 13, t, tramo(t, @21.3, @21.9));
  // la mano con el lápiz entra por el borde de la derecha (brazo canónico corto) y escribe siguiendo el número
  const fila2 = t > @19.6, n = fila2 ? n2 : n1, escribe = n > 0 && n < 1, tx = escribe ? 244 + n * 42 : 290, ty = (fila2 ? 146 : 96) + (escribe ? Math.round(Math.sin(t * 18) * 2) : 4);
  const wx = Math.round(tx + 12), wy = Math.round(ty + 12); T.brazo(R, 352, wy + 40, wx, wy, '#3a5a8a', -1, { codo: [334, wy + 20] });
  R.linea(wx - 4, wy - 4, Math.round(tx), Math.round(ty), fila2 ? H('#c8302a') : H('#e8c040')); R.linea(wx - 3, wy - 4, Math.round(tx) + 1, Math.round(ty), fila2 ? H('#8a1a14') : H('#a88a20')); R.pset(Math.round(tx), Math.round(ty), K);
};

// ── 5 · el escenario: Atom enciende el foco ─────────────────────────────────────────────────────────────────────
const escena5 = () => fijo('escena5', () => {
  // el fondo negro del teatro con el telón de fondo y las patas de terciopelo
  for (let y = 0; y < 130; y++) for (let x = 0; x < 320; x++) { let c = mez(H('#1a1420'), H('#2a1e2a'), Math.abs(Math.sin(x * 0.12)) * 0.6); if (bay(x, y) < 0.05) c = mez(c, K, 0.4); R.pset(x, y, c); }
  for (const [x0, x1] of [[0, 54], [266, 319]]) for (let y = 0; y < 166; y++) for (let x = x0; x <= x1; x++) { const f = Math.sin((x - x0) * 0.5) ; R.pset(x, y, mez(H('#8a1a24'), f > 0 ? H('#c83a3a') : H('#4a0a14'), Math.abs(f) * 0.6)); }
  // el telón de fondo pintado: noche azul con luna y colinas, y un árbol de cartón con su listón
  for (let y = 24; y < 130; y++) for (let x = 56; x < 266; x++) { let c = mez(H('#1a2448'), H('#2a3a6a'), (y - 24) / 110); if (Math.sin(x * 0.12) > 0.85) c = mez(c, K, 0.25); if (bay(x, y) < 0.04 && h2(x, y, 35) > 0.7) c = H('#c8d0f0'); R.pset(x, y, c); }
  R.disco(214, 62, 12, H('#e8e4c8')); R.disco(210, 59, 3, H('#c8c4a8')); R.disco(218, 66, 2, H('#c8c4a8'));
  for (let x = 56; x < 266; x++) { const h1 = 108 + Math.round(Math.sin(x * 0.035) * 10), h2_ = 118 + Math.round(Math.sin(x * 0.05 + 2) * 6); R.rect(x, h1, x, 129, H('#22305a')); R.rect(x, h2_, x, 129, H('#1a2444')); }
  R.rect(84, 80, 88, 130, H('#3a2a1a')); R.disco(86, 74, 14, H('#1a3a2a')); R.disco(80, 70, 8, H('#24503a')); R.disco(93, 68, 7, H('#24503a')); R.rect(86, 130, 98, 132, H('#5a4a30')); R.linea(88, 110, 98, 130, H('#5a4a30'));
  R.rect(236, 140, 250, 143, K); R.rect(237, 140, 249, 142, H('#8a5a32')); for (const x of [238, 247]) R.rect(x, 143, x + 1, 156, H('#5a3a22'));
  // la bambalina de arriba con su fleco dorado (bajo la barra del año, tranquila)
  for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) R.pset(x, y, mez(H('#7a1a24'), H('#4a0a14'), Math.abs(Math.sin(x * 0.25)) * 0.5));
  for (let x = 0; x < 320; x++) { R.pset(x, 18, H('#e8c040')); if (x % 3 === 0) R.rect(x, 19, x, 21, H('#c89a2a')); }
  // la vara de focos (x 90–240, y 30) con tres focos apagados, y la torre de luces de la izquierda donde está Atom
  R.rect(90, 30, 240, 31, H('#3a3c48')); for (const x of [120, 170, 214]) { R.linea(x, 31, x, 35, H('#22222c')); R.rect(x - 4, 35, x + 4, 43, K); R.rect(x - 3, 36, x + 3, 42, H('#2a2a34')); R.rect(x - 2, 43, x + 2, 44, H('#4a4c58')); }
  R.rect(40, 64, 76, 67, K); R.rect(41, 64, 75, 65, H('#6a6e7c')); for (const x of [44, 72]) R.rect(x, 67, x + 1, 130, H('#3a3c48')); for (let y = 72; y < 130; y += 8) R.linea(44, y, 72, y + 6, H('#3a3c48'));
  // el suelo del escenario (tablas en perspectiva) y el proscenio
  for (let y = 130; y < 166; y++) for (let x = 0; x < 320; x++) { const k = Math.floor((x - 160) / (8 + (y - 130) * 0.25)); let c = mez(H('#6a4228'), H('#4a2a18'), (h2(k, 3, 32) - 0.5) * 0.4 + 0.2); if (((x - 160) % Math.round(8 + (y - 130) * 0.25)) === 0) c = mez(c, K, 0.5); R.pset(x, y, c); }
  R.rect(0, 164, 319, 168, H('#2a1a10')); R.rect(0, 164, 319, 164, H('#a87a4a')); for (let x = 20; x < 320; x += 40) { R.rect(x, 162, x + 6, 164, H('#3a3c48')); R.pset(x + 3, 162, H('#f8e060')); }
  R.rect(0, 168, 319, 179, H('#0c0a10'));
});
const f5 = (t) => { escena5();
  const on = t > @22.84, foco = on ? Math.min(1, (t - @22.84) / 0.25) * (1 + (t > @26.4 && t < @28.3 ? 0.25 : 0)) : 0;
  // el haz: del foco de la torre (x 70, y 58) al círculo del suelo (x 160, y 150), con motas que brillan
  if (foco > 0) { const fx = 70, fy = 58, cx = 160, cy = 148, rx = 30; for (let y = fy; y < 166; y++) { const u = (y - fy) / (cy - fy), mx = lerp(fx, cx, u), w = lerp(3, rx, u); for (let x = Math.round(mx - w); x <= mx + w; x++) if (bay(x, y) < 0.32 * foco) R.pset(x, y, mez(R.pget(x, y), H('#fff4c8'), 0.45)); }
    for (let y = cy - 10; y < cy + 12; y++) for (let x = cx - 34; x <= cx + 34; x++) if (Math.hypot((x - cx) / 34, (y - cy) / 10) < 1 && y < 164) R.pset(x, y, mez(R.pget(x, y), H('#fff0c0'), 0.5 * Math.min(1, foco)));
    for (let k = 0; k < 14; k++) { const u = (t * 0.1 + k / 14) % 1, y = Math.round(fy + u * 90), x = Math.round(lerp(fx, cx, u) + Math.sin(k * 3 + t) * lerp(2, 20, u)); if (Math.sin(t * 3 + k) > 0) R.pset(x, y, H('#ffffff')); } }
  // el chico de la camiseta, solo en el centro: se encoge cuando se enciende el foco; el pato brilla en «flaws»
  const encoge = on && t > @24.5 && t < @26.4;
  chicoCam(152, 152, t, { dir: Math.floor(t * 0.8) % 2 ? 1 : -1, sorpresa: on && t < @24.5, rubor: true, brazos: encoge, triste: !on });
  if (t > @27.9 && t < @28.5) for (let k = 0; k < 4; k++) { const a = t * 5 + k * 1.57; R.pset(Math.round(159 + Math.cos(a) * 6), Math.round(141 + Math.sin(a) * 6), H('#fff4a0')); R.pset(Math.round(159 + Math.cos(a) * 7), Math.round(141 + Math.sin(a) * 7), H('#f8d020')); }
  // Atom en la torre de luces: gira el foco hacia el chico y le da en «spotlight»
  const ra = T.AT.atom(R, 56, 64, t, { dir: 1, pose: t > @22.5 && t < @23.4 ? 'senala' : 'sostiene', cara: on ? 'sonrisa' : 'normal', habla: voz(t) * 0.5 });
  { const x = 64, y = 54; R.rect(x - 1, y - 4, x + 9, y + 5, K); R.rect(x, y - 3, x + 8, y + 4, H('#3a3c48')); R.rect(x + 8, y - 4, x + 11, y + 5, K); R.rect(x + 9, y - 3, x + 10, y + 4, on ? H('#fff8d8') : H('#5a5e6e')); R.rect(x + 2, y + 5, x + 4, y + 10, H('#22222c')); if (on) luz(x + 10, y, 10, H('#fff4c8'), 0.6); }
  // las cabezas del público, de espaldas, en el primer término (abajo)
  for (let k = 0; k < 12; k++) { const x = 8 + k * 27 + (k % 2) * 6, y = 172 + (k % 3); R.disco(x, y, 7, H('#0a080e')); R.disco(x, y, 6, H(['#2a1e1a', '#3a2a20', '#1a1418', '#4a3020'][k % 4])); }
};

// ── 6 · el patio de butacas: casi nadie mira ──────────────────────────────────────────────────────────────────────
const sala6 = () => fijo('sala6', () => {
  // la pared del teatro: paneles de tela con su moldura dorada y la sombra de abajo
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let c = mez(H('#2a1a24'), H('#1a1018'), y / 180); if ((x >> 4) % 2 === 0 && y < 70) c = mez(c, H('#3a2430'), 0.4); if (y < 70 && x % 16 === 0) c = mez(c, K, 0.4); if (y < 70 && bay(x, y) < 0.08) c = mez(c, H('#5a3440'), 0.3);
    if (y > 163) { const d = ((x + (y >> 1) * 2) % 12 + 12) % 12; c = mez(H('#3a1a28'), H('#5a2a38'), d < 2 || (y % 6 === 0 && x % 4 === 0) ? 0.6 : 0.1); } R.pset(x, y, c); }
  R.rect(0, 12, 319, 13, H('#6a4a2a')); R.rect(0, 12, 319, 12, H('#a87a3a'));
  // el palco y los apliques de pared (sin letras), la salida con su lucecita verde
  for (const x of [40, 120, 200]) { R.rect(x - 2, 30, x + 2, 36, H('#c89a3a')); luz(x, 28, 12, H('#f8c870'), 0.5); R.disco(x, 27, 2, H('#fff0c0')); }
  R.rect(196, 22, 264, 46, H('#4a2a30')); R.rect(196, 46, 264, 50, H('#c89a3a')); R.rect(196, 46, 264, 46, H('#f8d070')); for (let x = 200; x < 264; x += 8) { R.rect(x, 34, x + 3, 46, H('#6a3a40')); R.pset(x, 34, H('#8a5a60')); } for (const x of [210, 236]) { R.disco(x, 30, 3, H('#e8b890')); R.rect(x - 2, 33, x + 2, 36, H('#3a3a5a')); }
  for (let y = 54; y < 70; y++) for (let x = 0; x < 320; x++) if ((x >> 3) % 3 === 0 && bay(x, y) < 0.3) R.pset(x, y, H('#4a2a34'));
  R.rect(4, 40, 24, 70, H('#1a1014')); R.rect(6, 42, 22, 70, H('#3a2a20')); R.rect(10, 36, 18, 39, H('#3ac85a')); R.rect(19, 56, 20, 58, H('#c89a3a'));
});
// una fila de butacas: respaldo redondeado con capitoné, costuras y brillo de la luz del escenario; reposabrazos con
// remate dorado; debajo, el escalón con su moqueta y las luces de pasillo
const fila6 = (y, n, x0, t, f) => {
  for (let k = 0; k < n; k++) { const x = x0 + k * 30;
    R.rect(x - 1, y + 1, x + 25, y + 16, K); R.rect(x + 1, y, x + 23, y, K); R.rect(x, y + 1, x + 24, y + 15, H('#9a1a24'));
    R.rect(x + 1, y + 1, x + 23, y + 4, H('#c83a3a')); R.rect(x + 2, y + 1, x + 22, y + 1, H('#e86a5a')); R.rect(x, y + 5, x + 24, y + 5, H('#6a0a14'));
    R.rect(x + 21, y + 2, x + 24, y + 15, H('#7a1018')); R.rect(x, y + 6, x + 1, y + 15, H('#b02a30'));
    for (const sx of [8, 16]) { R.rect(x + sx, y + 6, x + sx, y + 15, H('#6a0a14')); R.rect(x + sx + 1, y + 6, x + sx + 1, y + 15, H('#b0303a')); }
    for (const bx of [4, 12, 20]) { R.pset(x + bx, y + 10, H('#4a0610')); R.pset(x + bx, y + 9, H('#d8504a')); }
    R.rect(x + 25, y + 6, x + 29, y + 16, H('#3a1a12')); R.rect(x + 25, y + 5, x + 29, y + 6, H('#c89a3a')); R.rect(x + 25, y + 5, x + 29, y + 5, H('#f8d070')); R.disco(x + 27, y + 9, 1, H('#1a0a08')); }
  R.rect(0, y + 17, 319, y + 23, H('#2a1418')); R.rect(0, y + 17, 319, y + 17, H('#6a3a2a'));
  for (let x = 0; x < 320; x++) for (let yy = y + 18; yy <= y + 23; yy++) if (bay(x, yy) < 0.12) R.pset(x, yy, H('#4a2028'));
  for (let x = 14 + f * 20; x < 320; x += 60) { const on = 0.75 + 0.25 * Math.sin(t * 3 + x); R.pset(x, y + 18, mez(H('#f8b040'), H('#fff0c0'), on)); R.pset(x + 1, y + 18, H('#f8b040')); R.pset(x, y + 19, H('#8a5020')); R.pset(x - 1, y + 18, H('#6a3a20')); R.pset(x + 2, y + 18, H('#6a3a20')); }
  for (let k = 0; k < 4; k++) R.pset(Math.round(20 + h2(k, f, 70) * 280), y + 20 + (k % 3), H('#fff0b0'));
};
// una palomita que vuela del cubo a la boca
const palomita = (de, a, t, fase) => { const u = ((t + fase) % 1.3) / 0.5; if (u >= 1) return; R.pset(Math.round(lerp(de[0], a[0], u)), Math.round(lerp(de[1], a[1], u) - Math.sin(u * Math.PI) * 6), H('#fff8c0')); };
const f6 = (t) => { sala6();
  // la luz del escenario (detrás de la cámara) en las caras; se atenúa en «And Kirby's Victor»
  const baja = tramo(t, @32.58, @33.4);
  // tres filas: las de atrás primero; cada fila tapa a la de detrás de la cintura para abajo.
  // Los dos de delante que miraban al escenario se dan la vuelta en «barely look»: uno pide palomitas, la otra charla
  const giran = t > @30.06, vuelta = tramo(t, @30.06, @30.5);
  const GENTE = [
    [[EL.senor30, 52, 'lee'], [EL.chica, 112, 'charlaD'], [EL.oficinista, 142, 'charlaI'], [EL.clienta, 202, 'duerme'], [EL.sudadera, 262, 'lee'], [EL.tecnica, 292, 'come']],
    [[EL.senora30, 34, 'lee'], [EL.chico, 94, 'come'], [EL.tecnica, 154, 'come'], [EL.estudiante ?? EL.senor30, 214, 'charlaD'], [EL.chica, 244, 'charlaI']],
    [[EL.oficinista, 64, 'come'], [EL.sudadera, 124, 'miraI'], [EL.clienta, 184, 'miraD'], [EL.senor30, 214, 'charlaI'], [EL.senora30, 274, 'duerme'], [EL.chico, 304, 'lee']]];
  GENTE.forEach((fila, f) => { const suelo = 76 + f * 40;
    fila.forEach(([d, x, q], k) => { const o = { dir: 1 };
      if (q === 'miraI') { o.dir = giran ? -1 : 1; o.sorpresa = !giran; o.sostiene = giran && t > @30.7 ? [x - 6, suelo - 14 + Math.round(Math.sin(t * 6))] : undefined; o.sonrisa = giran; }
      if (q === 'miraD') { o.dir = giran ? 1 : -1; o.sorpresa = !giran; o.habla = giran && Math.sin(t * 9) > 0; }
      if (q === 'charlaD') { o.dir = 1; o.habla = Math.sin(t * 9 + x) > 0 && Math.floor(t * 0.7 + k) % 2 === 0; o.sonrisa = true; o.dedo = Math.floor(t * 0.7 + k) % 2 === 0 && Math.sin(t * 3) > 0.5; }
      if (q === 'charlaI') { o.dir = -1; o.habla = Math.sin(t * 9 + x + 2) > 0.3 && Math.floor(t * 0.7 + k) % 2 === 1; }
      if (q === 'duerme') o.triste = true;
      if (q === 'lee' || q === 'come') o.sostiene = [x + 11, suelo - 12];
      const r = R.actor(d, x, suelo, t, o);
      if (q === 'duerme' && Math.floor(t * 1.5) % 2) { R.pset(r.cabeza[0] + 8, r.cabeza[1] - 2, H('#c8c8e8')); R.pset(r.cabeza[0] + 10, r.cabeza[1] - 5, H('#c8c8e8')); R.pset(r.cabeza[0] + 11, r.cabeza[1] - 6, H('#c8c8e8')); }
      if (q === 'lee' && r.mano) libro(r.mano[0] - 1, r.mano[1] - 2, t, k + f * 3);
      if (q === 'come' && r.mano) { const [mx, my] = r.mano; R.rect(mx - 4, my - 3, mx + 3, my + 4, K); R.rect(mx - 3, my - 2, mx + 2, my + 3, H('#f4f0e6')); R.rect(mx - 1, my - 2, mx, my + 3, H('#c8302a')); for (let j = 0; j < 4; j++) R.pset(mx - 3 + j * 2, my - 3 - (j % 2), H('#fff8c0'));
        palomita([mx - 1, my - 4], [r.cabeza[0] + 3, r.cabeza[1] + 9], t, x * 0.13 + f); }
      // la vuelta se ve: dos arcos de movimiento junto a la cabeza
      if ((q === 'miraI' || q === 'miraD') && vuelta > 0 && vuelta < 1) { const [hx, hy] = r.cabeza, s = q === 'miraI' ? 1 : -1; for (let j = 0; j < 5; j++) { R.pset(hx + s * (9 + j), hy + 2 + j * 2, H('#f4f4ec')); R.pset(hx + s * (12 + j), hy + 1 + j * 2, H('#c8c8e8')); } }
      if (q === 'miraI' && giran && r.mano) { const [mx, my] = r.mano; for (let j = 0; j < 2; j++) R.pset(mx + j, my - 1, H('#fff8c0')); } });
    fila6(suelo - 8, 11, -6 + (f % 2) * 15, t, f); });
  // la luz del escenario en las caras
  luz(160, 230, 200, H('#ffd890'), 0.28 * (1 - baja));
  if (baja > 0) T.tinte(R, 0, 179, [10, 8, 20], 0.45 * baja);
};

// ── 7 · la tina congelada otra vez: el foco a color sobre Victor ────────────────────────────────────────────────
const lampara = (on) => () => { R.rect(3, 2, 16, 11, K); R.rect(4, 3, 15, 10, H('#3a3c48')); R.rect(4, 3, 15, 4, H('#6a6e7c')); R.rect(0, 0, 3, 13, K); R.rect(1, 1, 2, 12, on ? H('#fff8d8') : H('#6a6e7c')); R.rect(10, 11, 12, 14, H('#22222c')); R.rect(12, 6, 13, 7, H('#c8302a')); };
const f7 = (t) => {
  const C0 = congelado(); pausa(t, P7 - 0.3, E.duracion);
  const on = t > @35.04 && t < @40.6, foco = on ? Math.min(1, (t - @35.04) / 0.25) : 0;
  // el haz: dentro del cono, el mundo vuelve a su color (Victor iluminado), con un tinte cálido
  // Atom al doble sostiene el foco (la boca a la izquierda); al final lo deja y se encoge de hombros
  const deja = t > @40.0, r = T.AT.atom(R, 268, 176, t, { s: 2, dir: -1, pose: deja ? 'brazos' : 'sostiene', cara: t > @39.18 ? 'guino' : 'normal', habla: voz(t) });
  const ox = deja ? 196 : Math.round(r.mano[0]) - 32, oy = deja ? 152 : Math.round(r.mano[1]) - 16;
  T.AT.escalado(R, lampara(on && !deja), 17, 15, ox, oy, 2);
  const lx = ox + 1, ly = oy + 13, vx = 152, vy = 126;
  if (foco > 0) { for (let y = 90; y < 172; y++) for (let x = 96; x < lx; x++) { const dx = x - lx, dy = y - ly, ax = vx - lx, ay = vy - ly, L = Math.hypot(ax, ay), u = (dx * ax + dy * ay) / (L * L); if (u < 0 || u > 1.3) continue;
      const d = Math.abs(dx * ay - dy * ax) / L, w = lerp(5, 24, Math.min(1, u)); if (d > w) continue; R.pset(x, y, mez(C0[y * 320 + x], H('#fff4c8'), 0.12 + (d > w - 1.5 ? 0.3 : 0))); }
    for (let k = 0; k < 10; k++) { const u = (t * 0.2 + k / 10) % 1; if (Math.sin(t * 4 + k) > 0) R.pset(Math.round(lerp(lx, vx, u)), Math.round(lerp(ly, vy, u) + Math.sin(k * 2) * lerp(1, 10, u)), H('#ffffff')); } }
  // la máscara de Victor brilla a color en «face forever»
  if (t > @36.6 && t < @38.2) T.AT.anillo(R, 150, 124, 12, 12, t, tramo(t, @36.6, @37.2));
  // los de alrededor, en sus marcos a color (como iconos con su globo hacia Victor): salen en «something», y en
  // «no one» se dan la vuelta y el globo se recoge (nadie mira)
  const sale = tramo(t, @38.26, @38.6), otro = t > @39.18, recoge = tramo(t, @39.18, @39.5);
  if (sale > 0) [[EL.chica, 62, 72, '#f8e0b0'], [EL.senor30, 102, 52, '#c8e0f0'], [EL.clienta, 202, 52, '#f0c8d0'], [EL.sudadera, 240, 76, '#d0f0c0'], [EL.oficinista, 54, 116, '#f0e0c8']].forEach(([d, x, y, fondo], k) => {
    const s = Math.min(1, Math.max(0, sale * 1.4 - k * 0.08)); if (s <= 0) return; const hw = Math.round(11 * s), hh = Math.round(12 * s); if (hw < 3) return;
    const hacia = x < 152 ? 1 : -1;
    // el globo apunta a Victor mientras miran
    if (recoge < 1) { const ang = Math.atan2(118 - y, 152 - x), L = (hh + 7) * (1 - recoge), bx = x + Math.cos(ang) * (hh - 2), by = y + Math.sin(ang) * (hh - 2), nx = -Math.sin(ang) * 3, ny = Math.cos(ang) * 3;
      R.poligono([[bx + nx, by + ny], [bx - nx, by - ny], [x + Math.cos(ang) * (hh + L * 0.6), y + Math.sin(ang) * (hh + L * 0.6)]], K); }
    R.rect(x - hw - 1, y - hh - 1, x + hw + 1, y + hh + 1, K); R.rect(x - hw, y - hh, x + hw, y + hh, H('#f8f4ea')); R.rect(x - hw, y + hh, x + hw, y + hh, H('#c8c0b0'));
    R.recorte([x - hw + 1, y - hh + 1, x + hw - 1, y + hh - 1]);
    for (let yy = y - hh + 1; yy < y + hh; yy++) for (let xx = x - hw + 1; xx < x + hw; xx++) R.pset(xx, yy, mez(H(fondo), K, (yy - y + hh) / 60 + (bay(xx, yy) < 0.2 ? 0.06 : 0)));
    if (s >= 1) { const r = R.actor(d, x - 7, y + 20, t, { dir: otro ? -hacia : hacia, sorpresa: !otro && t > @38.6, habla: otro && Math.sin(t * 9 + k) > 0.3 }); }
    R.recorte(null);
    R.pset(x - hw + 1, y - hh + 1, H('#ffffff')); R.pset(x - hw + 2, y - hh + 1, H('#ffffff')); });
};

const efectos = [[0.05, 'tapestop'], [@1.68, 'pop'], [@4.02, 'pop'], [@6.2, 'whoosh'], [@9.0, 'puerta'], [@10.3, 'pasos'], [@13.64, 'pop'], [@18.0, 'lapiz'], [@20.9, 'lapiz'],
  [@22.84, 'interruptor'], [@27.9, 'brillo'], [@28.7, 'publico', { dur: 2.5 }], [@35.04, 'interruptor'], [@38.26, 'pop'], [@39.18, 'whoosh'], [@40.6, 'interruptor'], [E.duracion - 0.3, 'golpecito']];
T.rodar(E, R, [[0, f1], [P2, f2], [P3, f3], [P4, f4], [P5, f5], [P6, f6], [P7, f7]], { efectos, año: (t) => (t >= @1.68 && t < P7 ? 2000 : null) });
'''))
