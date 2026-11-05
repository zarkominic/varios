# Borrador de escenas del ep22, grupo 6: nv-xmas, nv-filipinas, nv-gavle (con el movimiento hecho).
# Los instantes se escriben @(s) en segundos de la escena y se pasan a en('marca', fracción) con la marca de cada una.
import re

E = {}

def _en(marca, a, b, cuerpo):
    return re.sub(r'@\(([-\d.]+)\)', lambda m: f"en('{marca}', {(float(m.group(1)) - a) / (b - a):.4f})", cuerpo)

# auxiliares comunes del grupo (prefijo s6_, sin exportar)
LIB = r'''
const s6_h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const s6_BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const s6_u = (x, y) => s6_BY[((y & 3) << 2) | (x & 3)];
function s6_mez(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}
const s6_tin = (x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179 || a <= 0) return; R.pset(x, y, s6_mez(R.pget(x, y), c, Math.min(1, a))); };
// un fondo fijo: se pinta una vez en un búfer y se copia en cada fotograma
const s6_CAP = {};
const s6_fondo = (clave, dibuja) => { if (!s6_CAP[clave]) { const b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); s6_CAP[clave] = b; } R.copiar(s6_CAP[clave]); };
// degradado tramado entre paradas [[f, color], …] de y0 a y1 (de x0 a x1)
const s6_degr = (y0, y1, x0, x1, st) => { for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0); let k = 0; while (k < st.length - 2 && f > st[k + 1][0]) k++;
  const [f0, c0] = st[k], [f1, c1] = st[k + 1], u = Math.max(0, Math.min(1, (f - f0) / Math.max(1e-6, f1 - f0))); for (let x = x0; x <= x1; x++) R.pset(x, y, u > s6_u(x, y) ? c1 : c0); } };
// halo: tiñe un disco con caída suave
const s6_halo = (cx, cy, r, c, a) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d < 1) { const v = a * (1 - d) * (1 - d); if (v > s6_u(cx + i, cy + j) * 0.5) s6_tin(cx + i, cy + j, c, v); } } };
// copos que caen (n), con viento; dentro de [x0, y0, x1, y1]
const s6_nieve = (t, n, c, cL, caja = [0, 0, 319, 179], v = 14, k = 0) => { const [x0, y0, x1, y1] = caja, W = x1 - x0 + 1, H = y1 - y0 + 1;
  for (let i = 0; i < n; i++) { const sp = v * (0.6 + s6_h(i, 1, k) * 0.8), y = y0 + ((s6_h(i, 2, k) * H + t * sp) % H), x = x0 + (((s6_h(i, 3, k) * W + Math.sin(t * 1.3 + i) * 3 + t * 4) % W) + W) % W;
    R.pset(Math.round(x), Math.round(y), i % 3 ? c : cL); if (i % 5 === 0) R.pset(Math.round(x) + 1, Math.round(y), c); } };
// recorrido por tramos [[t, x, y], …]: { x, y, mv (se mueve), dir }
const s6_ruta = (t, P) => { if (t <= P[0][0]) return { x: P[0][1], y: P[0][2], mv: false, dir: Math.sign(P[1][1] - P[0][1]) || 1 };
  for (let i = 0; i < P.length - 1; i++) { const [ta, xa, ya] = P[i], [tb, xb, yb] = P[i + 1]; if (t <= tb) { const u = (t - ta) / Math.max(1e-6, tb - ta); return { x: Math.round(lerp(xa, xb, u)), y: Math.round(lerp(ya, yb, u)), mv: xa !== xb || ya !== yb, dir: Math.sign(xb - xa) || 1 }; } }
  const L = P[P.length - 1]; return { x: L[1], y: L[2], mv: false, dir: 1 }; };
// una nota musical de 5 × 7 (símbolo, no letra)
const s6_nota = (x, y, c) => { x = Math.round(x); y = Math.round(y); const K = T.C.k; R.rect(x + 3, y - 6, x + 4, y - 1, K); R.rect(x + 3, y - 6, x + 3, y - 1, c); R.rect(x + 4, y - 6, x + 6, y - 5, K); R.rect(x + 4, y - 6, x + 5, y - 6, c);
  R.rect(x, y - 2, x + 4, y + 1, K); R.rect(x + 1, y - 1, x + 3, y, c); };
// la estrella de destello (4 puntas)
const s6_destello = (x, y, r, c) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } if (r > 2) { R.pset(x + 1, y + 1, c); R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); } };
const s6_sube = (t, a, b) => tramo(t, a, b) - 0;
'''

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['nv-xmas'] = ('Xmas', '''// NV-XMAS (frase 18), sin cartela; barra 2026 → 1100. Tres planos:
// 1. las postales de hoy (fondo local, la mesa vista desde arriba): un gato saca la zarpa y empuja una bola de Navidad
//    que rueda por la mesa; la mano con el rotulador entra («single letter») y escribe una X roja grande en la postal
//    («Writing Xmas»); el móvil se enciende («modern»); la mano se va y la X se vuelve de oro y brilla («Christ out of
//    Christmas»): no quita nada (corta en «The X»);
// 2. la página del códice: la mano del copista traza la gran ji dorada («The X is the Greek letter chi»), la ji brilla y
//    sale un «1» de oro encima («the first letter»), latido de la ji a «Christ»; la barra baja de 2026 a 1100 (corta en «and»);
// 3. el scriptorium: un copista escribe en su pupitre; otro entra con un códice y lo levanta abierto con la X de oro
//    («scribes were already using it»); el del pupitre se vuelve, sonríe y señala; el monje de la ventana asiente y
//    brotan tres X de oro sobre los libros («almost a thousand years ago»).''', LIB + _en('xmas', 0.5, 14.977, r'''
const P2 = @(7.08), P3 = @(11.40);
const LETRA = @(2.0), ESCRIBE = @(2.95), ISNT = @(3.9), MODERNO = @(4.4), CRISTO = @(5.5), NAVIDAD = @(6.43);
const JI = @(7.43), CHI = @(8.61), PRIMERA = @(9.37), CRISTO2 = @(10.19), ESCRIBAS = @(11.49), USANDO = @(12.61), MIL = @(13.82);

// ── 1 · la mesa de las postales, vista desde arriba (fondo local) ──
const MADERA = [hex('#7a4a2a'), hex('#8a5834'), hex('#6a3e22'), hex('#9a6a40'), hex('#5a321a')];
const fondoMesa = () => {
  const { rect, pset, linea, disco, poligono } = R;
  // tablones horizontales de nogal con vetas, nudos y juntas (más tranquilos en la esquina de Atom y bajo la barra)
  for (let y = 0; y < 180; y++) { const tab = Math.floor((y + 6) / 24), y0 = tab * 24 - 6; for (let x = 0; x < 320; x++) {
    const calma = (x > 270 && y < 50) || (y < 16 && x < 180) ? 0.35 : 1, v = Math.sin(x * 0.045 + tab * 2.1 + Math.sin(x * 0.013 + tab) * 3 + (y - y0) * 0.35);
    let c = tab % 2 ? MADERA[0] : MADERA[1]; if (v > 0.82 && calma > 0.5) c = MADERA[2]; else if (v < -0.9) c = MADERA[3]; if (s6_h(x >> 2, y, tab) < 0.05 * calma) c = MADERA[2];
    if (y === y0 || y === y0 + 1) c = y === y0 ? MADERA[4] : MADERA[2]; pset(x, y, c); } }
  for (const [x, y] of [[58, 166], [236, 30], [140, 112]]) { disco(x, y, 3, MADERA[2]); disco(x, y, 1, MADERA[4]); pset(x - 2, y - 1, MADERA[3]); }
  // el vade de fieltro verde bajo la postal
  rect(148, 46, 280, 156, hex('#1a2a1e')); for (let y = 47; y < 156; y++) for (let x = 149; x < 280; x++) pset(x, y, s6_h(x, y, 7) < 0.18 ? hex('#22402c') : s6_h(x, y, 8) < 0.1 ? hex('#163020') : hex('#1e3826'));
  rect(149, 47, 279, 48, hex('#3a5a3e')); rect(149, 154, 279, 155, hex('#0e1a12'));
  // la pila de sobres (tres, desplazados), con sello de árbol y matasellos de rayas
  for (const [x0, y0, c, k] of [[20, 58, '#c8a878', 0], [26, 64, '#e8dcc0', 1], [34, 72, '#f4ecdc', 2]]) {
    rect(x0 + 3, y0 + 3, x0 + 77, y0 + 47, hex('#3a2010')); rect(x0, y0, x0 + 74, y0 + 44, T.C.k); rect(x0 + 1, y0 + 1, x0 + 73, y0 + 43, hex(c));
    if (k === 2) { linea(x0 + 1, y0 + 1, x0 + 37, y0 + 24, hex('#c8b898')); linea(x0 + 73, y0 + 1, x0 + 37, y0 + 24, hex('#c8b898'));
      rect(x0 + 58, y0 + 5, x0 + 69, y0 + 18, T.C.k); rect(x0 + 59, y0 + 6, x0 + 68, y0 + 17, hex('#c8303a')); for (let i = x0 + 59; i <= x0 + 68; i += 2) { pset(i, y0 + 5, hex('#f4ecdc')); pset(i, y0 + 18, hex('#f4ecdc')); }
      poligono([[x0 + 63, y0 + 8], [x0 + 60, y0 + 15], [x0 + 67, y0 + 15]], hex('#2a8a4a')); pset(x0 + 63, y0 + 7, hex('#f0c040'));
      for (let j = 0; j < 4; j++) for (let i = 0; i < 16; i++) pset(x0 + 40 + i, y0 + 8 + j * 3 + Math.round(Math.sin(i * 0.8) * 1), hex('#5a4a8a'));
      for (const [yy, w] of [[28, 30], [32, 24], [36, 28]]) rect(x0 + 24, y0 + yy, x0 + 24 + w, y0 + yy, hex('#4a4a5a')); } }
  // la hoja de sellos con trepado
  rect(22, 124, 74, 156, T.C.k); rect(23, 125, 73, 155, hex('#f4ecdc'));
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) { const x = 25 + i * 12, y = 127 + j * 9, c = ['#c8303a', '#2a7a4a', '#3a6ac8', '#e8a020'][(i + j) % 4]; rect(x, y, x + 9, y + 6, hex(c)); rect(x + 1, y + 1, x + 8, y + 1, s6_mez(hex(c), hex('#ffffff'), 0.4));
    if ((i + j) % 2) poligono([[x + 4, y + 1], [x + 2, y + 5], [x + 7, y + 5]], hex('#f4ecdc')); else disco(x + 4, y + 3, 1, hex('#f4ecdc')); }
  // el bote de los lápices (visto desde arriba) y las tijeras con el carrete de cinta
  disco(122, 32, 11, T.C.k); disco(122, 32, 10, hex('#3a3a5a')); disco(122, 32, 8, hex('#22223a'));
  for (const [dx, dy, c] of [[-4, -3, '#c8303a'], [2, -5, '#2a8a4a'], [5, 1, '#f0c040'], [-2, 4, '#3a6ac8'], [-6, 2, '#e8e8e8']]) { disco(122 + dx, 32 + dy, 2, T.C.k); disco(122 + dx, 32 + dy, 1, hex(c)); }
  disco(182, 170, 10, T.C.k); disco(182, 170, 9, hex('#c8303a')); disco(182, 170, 4, hex('#e8dcc0')); disco(182, 170, 2, hex('#7a4a2a')); for (let a = 0; a < 6; a++) pset(182 + Math.round(Math.cos(a) * 7), 170 + Math.round(Math.sin(a) * 7), hex('#e86a6a'));
  linea(192, 172, 230, 178, hex('#c8303a')); linea(192, 173, 230, 179, hex('#a02028'));
  for (const s of [-1, 1]) { linea(206, 160, 226 + s * 2, 152 + s * 6, T.C.k); linea(207, 160, 227 + s * 2, 152 + s * 6, hex('#c8ccd8')); disco(200, 160 + s * 4, 4, T.C.k); disco(200, 160 + s * 4, 3, hex('#3a6ac8')); disco(200, 160 + s * 4, 1, MADERA[1]); }
  // el plato de galletas en estrella (sin la galleta del gag: aquí son de mesa)
  disco(292, 86, 22, hex('#3a2010')); disco(290, 84, 22, T.C.k); disco(290, 84, 21, hex('#e8eef4')); disco(290, 84, 16, hex('#d0dae4')); disco(290, 84, 15, hex('#e8eef4'));
  for (const [cx, cy] of [[282, 76], [298, 80], [288, 94]]) { const P = []; for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5 - Math.PI / 2, r = k % 2 ? 3.5 : 7.5; P.push([Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r)]); }
    poligono(P.map(([x, y]) => [x + 1, y + 1]), hex('#5a3010')); poligono(P, hex('#b8743a')); disco(cx, cy, 2, hex('#c8844a')); pset(cx, cy, hex('#f8f4ec')); pset(cx - 3, cy - 2, hex('#f8f4ec')); pset(cx + 3, cy - 2, hex('#f8f4ec')); }
  // la rama de abeto con dos bolas y una piña (abajo a la izquierda)
  for (let k = 0; k < 7; k++) { const x0 = -4 + k * 7, y0 = 178 - k * 4; linea(x0, y0, x0 + 9, y0 - 3, hex('#3a2a1a')); for (let i = -6; i <= 6; i++) { linea(x0 + 4, y0 - 2, x0 + 4 + i, y0 - 2 + (i % 2 ? -6 : 6), i % 3 ? hex('#1e5a32') : hex('#2a7a42')); } }
  for (const [x, y, c] of [[14, 160, '#c8303a'], [38, 150, '#f0c040']]) { disco(x, y, 5, T.C.k); disco(x, y, 4, hex(c)); pset(x - 2, y - 2, hex('#ffffff')); pset(x - 1, y - 2, s6_mez(hex(c), hex('#ffffff'), 0.5)); rect(x - 1, y - 7, x + 1, y - 5, hex('#c8a040')); }
  // la postal: papel crema con doble filete rojo, el acebo en la esquina y un arbolito dibujado abajo
  rect(171, 60, 263, 142, hex('#2a1608')); rect(168, 57, 260, 139, T.C.k); rect(169, 58, 259, 138, hex('#f6efdc'));
  for (let y = 59; y < 138; y++) for (let x = 170; x < 259; x++) if (s6_h(x, y, 31) < 0.04) pset(x, y, hex('#e8dcc0'));
  for (const d of [3, 5]) { rect(169 + d, 58 + d, 259 - d, 58 + d, hex('#c8303a')); rect(169 + d, 138 - d, 259 - d, 138 - d, hex('#c8303a')); rect(169 + d, 58 + d, 169 + d, 138 - d, hex('#c8303a')); rect(259 - d, 58 + d, 259 - d, 138 - d, hex('#c8303a')); }
  for (const [x, y, s] of [[178, 68, 1], [186, 66, -1]]) { poligono([[x, y], [x + 4 * s, y - 4], [x + 9 * s, y - 2], [x + 7 * s, y + 3], [x + 2 * s, y + 4]], hex('#1e6a3a')); linea(x, y, x + 7 * s, y - 1, hex('#0f4024')); }
  for (const [x, y] of [[182, 70], [184, 72], [180, 72]]) { disco(x, y, 1, hex('#c8202a')); }
  poligono([[244, 116], [236, 132], [252, 132]], hex('#2a7a42')); poligono([[244, 110], [238, 122], [250, 122]], hex('#2a8a4a')); rect(243, 132, 245, 135, hex('#6a3a1a')); pset(244, 109, hex('#f0c040')); pset(241, 126, hex('#c8303a')); pset(247, 120, hex('#f0c040'));
  for (const [x, y] of [[226, 70], [250, 74], [236, 64], [178, 120], [186, 130]]) { pset(x, y, hex('#9ab8d8')); pset(x + 1, y, hex('#9ab8d8')); pset(x, y + 1, hex('#9ab8d8')); }
  // el móvil, boca arriba (pantalla apagada)
  rect(268, 136, 302, 178, T.C.k); rect(270, 138, 300, 177, hex('#2a2a34')); rect(272, 142, 298, 174, hex('#14141c')); rect(282, 139, 288, 139, hex('#4a4a5a'));
  // la taza de chocolate, con nubes de malvavisco
  disco(108, 152, 16, hex('#3a2010')); disco(106, 150, 16, T.C.k); disco(106, 150, 15, hex('#e8e4dc')); disco(106, 150, 12, hex('#c8c0b4')); disco(106, 150, 11, hex('#5a3018')); disco(104, 148, 6, hex('#6a3a20'));
  for (const [dx, dy] of [[-4, -3], [3, -5], [5, 3], [-2, 5]]) { rect(106 + dx - 1, 150 + dy - 1, 106 + dx + 2, 150 + dy + 1, hex('#f8f4ec')); pset(106 + dx + 2, 150 + dy + 1, hex('#d8d0c4')); }
  rect(122, 147, 128, 153, T.C.k); rect(123, 148, 127, 152, hex('#e8e4dc')); rect(124, 149, 126, 151, MADERA[0]);
};
const BOMBILLAS = [[6, 26], [24, 30], [42, 33], [60, 35], [78, 36], [96, 36], [114, 46], [140, 52], [146, 70], [144, 96], [146, 120]];
const COLB = ['#f03a3a', '#f8d020', '#3ad070', '#3a8af0', '#f05ab0'];
const p1 = (t) => {
  s6_fondo('xm-mesa', fondoMesa);
  // el cable de las luces y las bombillas que titilan
  for (let i = 0; i < BOMBILLAS.length - 1; i++) { const [xa, ya] = BOMBILLAS[i], [xb, yb] = BOMBILLAS[i + 1]; R.linea(xa, ya, xb, yb, hex('#1a2a1a')); R.linea(xa, ya + 1, xb, yb + 1, hex('#0a140a')); }
  BOMBILLAS.forEach(([x, y], i) => { const on = Math.sin(t * 3 + i * 1.7) > -0.3, c = hex(COLB[i % 5]); R.rect(x - 1, y - 1, x + 1, y + 2, T.C.k); R.rect(x, y, x, y + 1, on ? c : s6_mez(c, T.C.k, 0.5)); if (on) { s6_halo(x, y + 1, 5, c, 0.35); R.pset(x, y, hex('#ffffff')); } });
  // el vapor de la taza
  for (let k = 0; k < 3; k++) for (let i = 0; i < 9; i++) { const u = ((t * 0.5 + k / 3) % 1), y = 146 - u * 22 - i * 0.8, x = 104 + k * 4 + Math.sin(t * 2 + i * 0.6 + k) * 2.5; if (i < 9 * (1 - u)) s6_tin(x, y, hex('#f4f4f4'), 0.45 * (1 - u)); }
  // el gato saca la zarpa por la izquierda y empuja la bola, que rueda por la mesa hasta la taza
  const z = tramo(t, 0.25, 0.75) - tramo(t, 1.1, 1.6), zx = Math.round(lerp(-12, 10, z));
  if (z > 0) { R.disco(zx, 118, 7, T.C.k); R.disco(zx, 118, 6, hex('#8a8a96')); R.disco(zx + 1, 117, 4, hex('#a8a8b4')); for (const dy of [-4, 0, 4]) { R.disco(zx + 6, 118 + dy, 2, T.C.k); R.pset(zx + 6, 118 + dy, hex('#e8a0a8')); } R.rect(zx - 12, 112, zx - 6, 124, hex('#8a8a96')); }
  const rb = tramo(t, 0.7, 2.6), bx = Math.round(lerp(18, 82, 1 - (1 - rb) ** 2)), by = 120 + Math.round(rb * 6), ang = rb * 9;
  R.disco(bx + 1, by + 2, 6, hex('#3a2010')); R.disco(bx, by, 6, T.C.k); R.disco(bx, by, 5, hex('#2a6ac8')); R.disco(bx - 2, by - 2, 2, hex('#6a9ae8')); R.pset(bx - 2, by - 3, hex('#ffffff'));
  R.pset(bx + Math.round(Math.cos(ang) * 4), by + Math.round(Math.sin(ang) * 4), hex('#f0c040')); R.pset(bx + Math.round(Math.cos(ang + 3.1) * 4), by + Math.round(Math.sin(ang + 3.1) * 4), hex('#f0c040'));
  { const cx = bx + Math.round(Math.cos(ang - 1.6) * 6), cy = by + Math.round(Math.sin(ang - 1.6) * 6); R.rect(cx - 1, cy - 1, cx + 1, cy + 1, hex('#c8a040')); }
  // la X: dos trazos de rotulador rojo; luego se vuelve de oro y brilla
  const s1 = tramo(t, ESCRIBE, ESCRIBE + 0.4), s2 = tramo(t, ESCRIBE + 0.55, ESCRIBE + 0.95), oro = tramo(t, CRISTO, NAVIDAD + 0.2);
  const T1 = [192, 76, 236, 120], T2 = [236, 76, 192, 120];
  const traza = ([x0, y0, x1, y1], u) => { if (u <= 0) return; const xe = lerp(x0, x1, u), ye = lerp(y0, y1, u);
    const cR = s6_mez(hex('#c8202a'), hex('#e8b030'), oro), cL = s6_mez(hex('#e8505a'), hex('#fff0a0'), oro), cK = s6_mez(hex('#5a0810'), hex('#7a5010'), oro);
    for (let d = -3; d <= 3; d++) R.linea(Math.round(x0 + d * 0.7), Math.round(y0 - d * 0.7), Math.round(xe + d * 0.7), Math.round(ye - d * 0.7), Math.abs(d) === 3 ? cK : d === -1 || d === -2 ? cL : cR); };
  if (oro > 0) s6_halo(214, 98, 40, hex('#ffd060'), 0.55 * oro);
  traza(T1, s1); traza(T2, s2);
  if (oro > 0.6) for (let k = 0; k < 6; k++) { const a = t * 1.5 + k * 1.05, r = 30 + Math.sin(t * 3 + k) * 6; if (Math.sin(t * 7 + k * 2) > 0) s6_destello(214 + Math.cos(a) * r, 98 + Math.sin(a) * r * 0.8, 2, hex('#fff6c0')); }
  // el móvil se enciende un momento a «modern»
  const mv = tramo(t, MODERNO, MODERNO + 0.2) - tramo(t, MODERNO + 1.6, MODERNO + 1.9);
  if (mv > 0) { const c = s6_mez(hex('#14141c'), hex('#3a7ad8'), mv); R.rect(272, 142, 298, 174, c); R.rect(274, 146, 296, 154, s6_mez(c, hex('#e8eef8'), mv * 0.8)); R.disco(279, 150, 2, s6_mez(c, hex('#f0c040'), mv)); R.rect(283, 149, 294, 149, s6_mez(c, hex('#3a3a4a'), mv)); R.rect(283, 151, 290, 151, s6_mez(c, hex('#3a3a4a'), mv)); s6_halo(285, 158, 22, hex('#6a9ae8'), 0.25 * mv); }
  // la mano con el rotulador: entra, escribe los dos trazos y se va (brazo canónico desde abajo a la derecha)
  const ent = tramo(t, LETRA - 1.3, LETRA + 0.3), sal = tramo(t, ISNT + 0.2, ISNT + 1.1);
  if (ent > 0 && sal < 1) {
    let px, py, alza = 0;
    if (t < ESCRIBE) { px = lerp(330, 192, ent); py = lerp(170, 72, ent); alza = 4; }
    else if (s1 < 1) { px = lerp(T1[0], T1[2], s1); py = lerp(T1[1], T1[3], s1); }
    else if (t < ESCRIBE + 0.55) { const u = tramo(t, ESCRIBE + 0.4, ESCRIBE + 0.55); px = lerp(236, 236, u); py = lerp(120, 76, u); alza = 4; }
    else if (s2 < 1) { px = lerp(T2[0], T2[2], s2); py = lerp(T2[1], T2[3], s2); }
    else { px = lerp(192, 340, sal); py = lerp(120, 190, sal); alza = 4; }
    px = Math.round(px); py = Math.round(py - alza);
    const wx = px + 16, wy = py + 2;
    // el rotulador: cuerpo rojo con capuchón negro, la punta en (px, py)
    R.linea(px, py, px + 3, py - 2, T.C.k); for (let d = -1; d <= 1; d++) R.linea(px + 3, py - 2 + d, px + 20, py - 13 + d, d === -1 ? hex('#e8505a') : d === 1 ? hex('#7a1018') : hex('#c8202a')); R.linea(px + 2, py - 4, px + 21, py - 15, T.C.k); R.linea(px + 4, py, px + 21, py - 11, T.C.k);
    T.brazo(R, wx + 70, wy + 80, wx, wy, '#2a6a4a', -1, { codo: [wx + 34, wy + 46], puno: '#e8dcc0' });
    for (let d = -1; d <= 1; d++) R.linea(px + 17, py - 11 + d, px + 22, py - 14 + d, hex('#1a1a22'));
  }
};

// ── 2 · la página del códice: la gran ji dorada ──
const p2 = (t) => {
  const ji = tramo(t, JI, CHI + 0.15);
  const g = T.epoca(R, t, { encuadre: 'copista', camara: 'pagina', ji });
  // motas de polvo en el haz de la vela
  for (let k = 0; k < 14; k++) { const u = (t * 0.06 + s6_h(k, 1, 61)) % 1, x = 250 + Math.sin(t * 0.7 + k) * 20 + s6_h(k, 2, 61) * 40, y = 60 + u * 100; if (Math.sin(t * 2 + k) > 0) s6_tin(x, y, hex('#fff0c0'), 0.7); }
  // una polilla que ronda la vela
  { const a = t * 2.2, x = Math.round(299 + Math.cos(a) * 12), y = Math.round(96 + Math.sin(a * 1.3) * 8), al = Math.sin(t * 40) > 0; R.pset(x, y, hex('#d8c8a0')); R.pset(x + 1, y, hex('#a89870')); R.pset(x - 1, y - (al ? 1 : 0), hex('#e8dcc0')); R.pset(x + 2, y - (al ? 1 : 0), hex('#e8dcc0')); }
  // el «1» de oro de «la primera letra»
  const uno = tramo(t, PRIMERA, PRIMERA + 0.35);
  if (uno > 0) { const yb = Math.round(56 - (1 - uno) * 6 + Math.sin(t * 3) * 1); R.numero('1', 214, yb, { tam: 16, centro: true }); if (Math.sin(t * 6) > 0.3) s6_destello(226, yb - 12, 2, hex('#fff6c0')); }
  // el latido de la ji a «Christ»
  const lat = tramo(t, CRISTO2, CRISTO2 + 0.3) - tramo(t, CRISTO2 + 0.6, CRISTO2 + 1.2);
  if (lat > 0) { s6_halo(214, 98, 46, hex('#ffe080'), 0.45 * lat); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + t, r = 34 + lat * 8; s6_destello(214 + Math.cos(a) * r, 98 + Math.sin(a) * r, 2, hex('#fff6c0')); } }
  // la mano del copista con la pluma: llega a la punta, sigue el trazo y se retira
  const ent = tramo(t, P2 + 0.05, JI - 0.05), sal = tramo(t, CHI + 0.3, CHI + 1.1);
  if (sal < 1) {
    let [px, py] = g.punta ?? [240, 124];
    if (t < JI) { px = lerp(320, 188, ent); py = lerp(170, 70, ent); }
    if (sal > 0) { px = lerp(240, 330, sal); py = lerp(124, 190, sal); }
    px = Math.round(px); py = Math.round(py);
    // la pluma de ave: cañón y barbas blancas
    R.linea(px, py, px + 22, py - 20, T.C.k); R.linea(px + 1, py, px + 23, py - 20, hex('#e8e0c8'));
    for (let i = 8; i < 24; i++) { const x = px + i, y = py - Math.round(i * 0.9); R.linea(x, y, x - 3, y - 4, i % 3 ? hex('#f4ecdc') : hex('#c8bca0')); R.linea(x, y, x + 3, y + 2, hex('#d8ccb0')); }
    T.brazo(R, px + 96, py + 90, px + 16, py + 3, '#5a4028', -1, { codo: [px + 52, py + 50], puno: '#7a5a3a' });
  }
};

// ── 3 · el scriptorium: los escribas ya la usaban ──
const p3 = (t) => {
  const g = T.roma(R, t, { encuadre: 'scriptorium' });
  const S = g.suelo ?? 158;
  // el monje junto a la ventana, con su vela, lee y asiente al final
  R.actor(EL.monje, 46, S, t, { dir: 1, sonrisa: t > MIL, habla: t > MIL + 0.2 && t < MIL + 0.9 && Math.sin(t * 9) > 0 });
  // el copista en el pupitre escribe (la mano baila sobre la hoja) y se vuelve al ver el códice
  const vuelve = t > USANDO + 0.15;
  const ac = R.actor(EL.copista, 162, S, t, { dir: vuelve ? 1 : -1, sostiene: vuelve ? false : [146 + Math.round(Math.sin(t * 9) * 2), 140 + Math.round(Math.abs(Math.sin(t * 5)) * 2)], sonrisa: vuelve, dedo: t > USANDO + 0.5 && t < MIL + 0.4 });
  // la X pequeña que el copista dibuja en su hoja
  const xs = tramo(t, ESCRIBAS + 0.3, ESCRIBAS + 1.1); if (xs > 0) { const c = hex('#d8a020'); R.linea(130, 136, Math.round(lerp(130, 138, Math.min(1, xs * 2))), Math.round(lerp(136, 143, Math.min(1, xs * 2))), c); if (xs > 0.5) R.linea(138, 136, Math.round(lerp(138, 130, xs * 2 - 1)), Math.round(lerp(136, 143, xs * 2 - 1)), c); }
  // el otro escriba entra por la derecha con un códice abierto y lo levanta: la gran X de oro
  const r = s6_ruta(t, [[P3 + 0.1, 334, S], [ESCRIBAS + 0.8, 212, S]]), alza = t > USANDO - 0.25;
  const ab = R.actor(EL.copista, r.x, S, t, { dir: -1, anda: r.mv, sostiene: alza ? [r.x - 6, S - 34] : [r.x - 2, S - 16], sonrisa: alza, pal: { H: hex('#c8b090'), h: hex('#e0d0b0'), C: hex('#3a4a6a'), c: hex('#2a3450') } });
  { const [mx, my] = ab.mano, a = tramo(t, USANDO - 0.25, USANDO + 0.1), w = Math.round(lerp(10, 26, a)), x0 = mx - Math.round(w / 2), y0 = my - Math.round(lerp(8, 20, a));
    if (a > 0.6) s6_halo(mx, my - 10, 22, hex('#ffd060'), 0.45 * (0.6 + 0.4 * Math.sin(t * 5)));
    R.rect(x0 - 1, y0 - 1, x0 + w + 1, my + 1, T.C.k); R.rect(x0, y0, x0 + w, my, hex('#7a2a1a'));
    if (a > 0.3) { R.rect(x0 + 1, y0 + 1, x0 + w - 1, my - 1, hex('#f2e6c8')); R.rect(mx, y0 + 1, mx, my - 1, hex('#c8b890'));
      const cx = Math.round(x0 + w * 0.75), cy = Math.round((y0 + my) / 2), rr = Math.round(lerp(1, 5, a)); for (let d = -1; d <= 1; d++) { R.linea(cx - rr + d, cy - rr, cx + rr + d, cy + rr, hex('#e8b030')); R.linea(cx + rr + d, cy - rr, cx - rr + d, cy + rr, hex('#e8b030')); }
      R.linea(cx - rr, cy - rr, cx + rr, cy + rr, hex('#fff0a0'));
      for (let y = y0 + 3; y < my - 1; y += 2) R.rect(x0 + 2, y, mx - 2, y, hex('#9a8a6a')); } }
  // tres X de oro que brotan sobre los libros del armario, una tras otra («almost a thousand years»)
  [[124, 40], [160, 32], [196, 40]].forEach(([x, y], k) => { const u = tramo(t, MIL - 0.4 + k * 0.3, MIL - 0.1 + k * 0.3); if (u <= 0) return; const yy = Math.round(y + (1 - u) * 6 + Math.sin(t * 3 + k) * 1);
    s6_halo(x + 5, yy + 5, 10, hex('#ffd060'), 0.5 * u); R.icono('X', x, yy, hex('#f0c040'), T.C.k, 2); });
  T.romaDelante(R, t, { encuadre: 'scriptorium' });
};
const año = (t) => (t < P2 ? 2026 : t < P2 + 0.9 ? Math.round(lerp(2026, 1100, tramo(t, P2, P2 + 0.9))) : 1100);
const efectos = [[0.8, 'golpecito'], [ESCRIBE + 0.05, 'lapiz'], [ESCRIBE + 0.6, 'lapiz'], [MODERNO, 'bip'], [CRISTO + 0.4, 'brillo'], [P2 + 0.1, 'whoosh'], [JI + 0.05, 'lapiz'], [CHI, 'brillo'], [PRIMERA, 'pop'], [ESCRIBAS + 0.9, 'papel'], [USANDO, 'brillo'], [MIL - 0.3, 'tic']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
'''))

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['nv-filipinas'] = ('Filipinas', '''// NV-FILIPINAS (frase 19), hoy (2026), sin cartela. Tres planos:
// 1. el mapa del mundo en la pared del estudio (fondo local): un niño con su palo señala; una ruta de puntos salta de
//    chincheta en chincheta por los países de la vuelta («travel around the world»); el calendario grande de al lado
//    pasa las hojas de enero a agosto («following the calendar»); reloj de péndulo y globo que gira (corta en «because»);
// 2. una calle de Filipinas al atardecer: llega el coro por la izquierda; en la tienda sari-sari, la tendera arranca la
//    hoja del 8 del calendario y sale el 9 («September»); al 9 se encienden los parol de la calle (corta en «with»);
// 3. el parol grande de cerca: el coro canta («carols») y salen notas; el parol se enciende punta a punta («star-shaped
//    lanterns»); en la ventana aparecen las hojas 9, 10, 11, 12 y 1, una tras otra («the longest Christmas on Earth»).''', LIB + _en('calendario', 0.9, 16.496, r'''
import { equirect, pintar } from '/atomo/plato/escenas/ov-mapas.js';
import { TIERRA } from '/atomo/plato/escenas/geo-ov.js';
const P2 = @(5.42), P3 = @(11.03);
const DEJA = @(1.5), VIAJA = @(2.84), MUNDO = @(3.80), SIGUE = @(4.10), CALEND = @(4.92);
const NAVID = @(5.90), MISMO = @(7.46), FILIP = @(9.29), SEPT = @(10.69);
const VILLAN = @(11.53), ESTRELLA = @(12.27), FAROLES = @(12.83), LARGA = @(14.77), TIERRA_ = @(15.97);

// ── 1 · el estudio: el mapa del mundo y el calendario (fondo local) ──
const MAPA = [16, 30, 200, 128], VISTA = [-165, 195, -58, 80];
const PM = equirect(MAPA, VISTA);
const SITIOS = [[121.0, 14.6], [17.1, 60.7], [13.0, 47.5], [-21.9, 64.1], [-99.1, 19.4], [2.2, 41.4], [139.7, 35.7], [151.2, -33.9], [12.5, 41.9]];
const fondoEstudio = () => {
  const { rect, pset, linea, disco } = R;
  // papel pintado azul noche con rombos y flores de lis pequeñas; zócalo de cuarterones; suelo de tablas
  for (let y = 0; y < 136; y++) for (let x = 0; x < 320; x++) { const calma = (x > 272 && y < 48) || (y < 16 && x < 176), d = ((x + y) % 16 === 0 || (x - y + 320) % 16 === 0) && !calma;
    pset(x, y, d ? hex('#2e4a5e') : (x % 16 === 8 && y % 16 === 8 && !calma) ? hex('#c8a860') : s6_h(x >> 1, y >> 1, 3) < 0.06 ? hex('#22384a') : hex('#284052')); }
  rect(0, 136, 319, 139, hex('#5a3a22')); rect(0, 136, 319, 136, hex('#8a6040'));
  for (let y = 140; y < 160; y++) for (let x = 0; x < 320; x++) pset(x, y, hex('#6a4428'));
  for (let x = 4; x < 320; x += 40) { rect(x, 143, x + 33, 156, hex('#4a2e18')); rect(x + 1, 144, x + 32, 155, hex('#7a5232')); rect(x + 1, 144, x + 32, 144, hex('#9a7048')); rect(x + 1, 155, x + 32, 155, hex('#4a2e18')); }
  rect(0, 160, 319, 161, hex('#3a2010'));
  for (let y = 162; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor(y / 6); const c = (x + tab * 37) % 64 === 0 ? hex('#3a2414') : y % 6 === 0 ? hex('#4a2e18') : s6_h(x >> 3, y, tab) < 0.2 ? hex('#8a5a34') : hex('#7a4e2c'); pset(x, y, c); }
  // la alfombra
  rect(40, 168, 250, 179, hex('#6a1a22')); rect(42, 170, 248, 179, hex('#8a2a2a')); for (let x = 44; x < 248; x += 6) { pset(x, 172, hex('#d8a040')); pset(x + 3, 175, hex('#d8a040')); }
  // el marco de madera dorada y el papel del mapa
  rect(MAPA[0] - 6, MAPA[1] - 6, MAPA[2] + 6, MAPA[3] + 6, T.C.k); rect(MAPA[0] - 5, MAPA[1] - 5, MAPA[2] + 5, MAPA[3] + 5, hex('#a8782a')); rect(MAPA[0] - 5, MAPA[1] - 5, MAPA[2] + 5, MAPA[1] - 4, hex('#e8c060')); rect(MAPA[0] - 2, MAPA[1] - 2, MAPA[2] + 2, MAPA[3] + 2, hex('#6a4818'));
  R.recorte(MAPA);
  for (let y = MAPA[1]; y <= MAPA[3]; y++) for (let x = MAPA[0]; x <= MAPA[2]; x++) pset(x, y, s6_h(x >> 2, y, 150) < 0.1 ? hex('#7898b0') : hex('#86a6bc'));
  for (let lon = -150; lon <= 180; lon += 30) for (let lat = -55; lat <= 78; lat += 1) { const [x, y] = PM([lon, lat]); if (lat % 3 === 0) pset(Math.round(x), Math.round(y), hex('#6c8aa2')); }
  for (let lat = -45; lat <= 75; lat += 30) for (let lon = -165; lon <= 195; lon += 1) { const [x, y] = PM([lon, lat]); if (lon % 3 === 0) pset(Math.round(x), Math.round(y), hex('#6c8aa2')); }
  pintar(R, PM, TIERRA, (x, y) => (s6_h(x >> 1, y, 77) < 0.08 ? hex('#d8c8a4') : (y > 100 ? hex('#d8c89c') : hex('#e8dcbc'))), { somera: hex('#a4c0d0'), borde: hex('#4a3e34') });
  R.recorte(null);
  // un gancho y el cordel del cuadro
  linea(MAPA[0] + 40, MAPA[1] - 6, 108, 20, hex('#c8a040')); linea(MAPA[2] - 40, MAPA[1] - 6, 108, 20, hex('#c8a040')); disco(108, 19, 2, hex('#e8c060'));
  // el calendario: el clavo y la cartulina
  rect(214, 34, 272, 128, T.C.k); rect(215, 35, 271, 127, hex('#f2ecdc')); rect(215, 35, 271, 52, hex('#b8202a')); rect(215, 52, 271, 53, hex('#701018')); for (const x of [226, 243, 260]) { rect(x - 1, 31, x + 1, 38, T.C.k); rect(x, 32, x, 37, hex('#c8ccd8')); }
  rect(266, 128, 272, 130, hex('#1a1410'));
  // el reloj de péndulo (caja)
  rect(282, 54, 314, 136, T.C.k); rect(283, 55, 313, 135, hex('#5a3418')); rect(285, 57, 311, 83, hex('#3a2010')); disco(298, 70, 11, T.C.k); disco(298, 70, 10, hex('#f2ecdc')); for (let k = 0; k < 12; k++) pset(298 + Math.round(Math.cos(k * 0.5236) * 8), 70 + Math.round(Math.sin(k * 0.5236) * 8), T.C.k);
  rect(287, 88, 309, 130, hex('#2a1608')); rect(288, 89, 308, 129, hex('#3a2414')); rect(282, 54, 314, 54, hex('#8a5a30'));
  // la mesita con el globo y la maleta de viaje
  rect(206, 132, 276, 136, T.C.k); rect(207, 133, 275, 135, hex('#8a5a30')); rect(212, 136, 215, 160, hex('#5a3418')); rect(267, 136, 270, 160, hex('#5a3418'));
  rect(150, 146, 196, 160, T.C.k); rect(151, 147, 195, 159, hex('#8a4a2a')); rect(151, 147, 195, 148, hex('#aa6a3a')); rect(166, 142, 180, 146, T.C.k); rect(167, 143, 179, 145, hex('#3a2010'));
  for (const [x, y, c] of [[156, 151, '#f0c040'], [170, 153, '#3a8af0'], [184, 150, '#3ad070'], [188, 155, '#f03a3a']]) { rect(x, y, x + 5, y + 3, T.C.k); rect(x + 1, y + 1, x + 4, y + 2, hex(c)); }
};
const p1 = (t) => {
  s6_fondo('fi-estudio', fondoEstudio);
  // la ruta de puntos de chincheta en chincheta (dentro del mapa)
  const n = SITIOS.length, ru = tramo(t, VIAJA - 0.2, SIGUE + 0.4) * (n - 1);
  R.recorte(MAPA);
  for (let i = 0; i < n - 1; i++) { const u = Math.max(0, Math.min(1, ru - i)); if (u <= 0) break; const [xa, ya] = PM(SITIOS[i]), [xb, yb] = PM(SITIOS[i + 1]), L = Math.hypot(xb - xa, yb - ya), m = Math.round(L * u);
    for (let s = 0; s < m; s += 3) { const v = s / L, x = Math.round(lerp(xa, xb, v)), y = Math.round(lerp(ya, yb, v) - Math.sin(v * Math.PI) * L * 0.12); R.pset(x, y, hex('#c8202a')); R.pset(x, y + 1, hex('#701018')); } }
  R.recorte(null);
  SITIOS.forEach((s, i) => { const [x, y] = PM(s), b = Math.max(0, Math.min(1, (ru - i + 1) * 1.6)); if (i === 0) { T.chincheta(R, Math.round(x), Math.round(y), t, i === 0 ? hex('#f0c040') : T.C.rojo, { baja: tramo(t, DEJA, DEJA + 0.4) }); return; }
    if (b > 0) T.chincheta(R, Math.round(x), Math.round(y), t, T.C.rojo, { baja: b }); });
  { const [x, y] = PM(SITIOS[0]); if (t > DEJA + 0.4 && Math.sin(t * 6) > 0) s6_halo(Math.round(x), Math.round(y), 9, hex('#ffe060'), 0.6); }
  // el calendario pasa las hojas: 1 → 8 (la hoja que se va se levanta y se dobla hacia arriba)
  const fl = tramo(t, SIGUE, P2 - 0.15) * 7, mes = 1 + Math.floor(fl), fr = fl - Math.floor(fl);
  const hoja = (m, y0, y1) => { R.rect(216, y0, 270, y1, hex('#f2ecdc')); for (let f = 0; f < 4; f++) for (let c = 0; c < 7; c++) { const x = 220 + c * 7, y = 92 + f * 8; if (y + 4 < y1 && y > y0) R.rect(x, y, x + 4, y + 4, (m === 9 && f === 0 && c === 0) ? hex('#c8202a') : c === 6 ? hex('#e8a8a8') : hex('#c8c0ac')); }
    if (y0 < 60 && y1 > 86) R.numero(String(m), 243, 84, { tam: 16, centro: true, color: hex('#2a2430') }); };
  hoja(Math.min(8, mes + (fr > 0 && mes < 8 ? 1 : 0)), 54, 126);
  if (fr > 0 && mes < 8) { const y1 = Math.round(lerp(126, 54, fr)); hoja(mes, 54, y1); R.rect(216, y1 - 3, 270, y1, hex('#d8d0bc')); R.rect(216, y1 - 3, 270, y1 - 3, hex('#a89c88')); }
  // el péndulo
  { const a = Math.sin(t * 3.2) * 0.35, x = Math.round(298 + Math.sin(a) * 24), y = Math.round(92 + Math.cos(a) * 24); R.linea(298, 92, x, y, hex('#c8a040')); R.disco(x, y, 4, T.C.k); R.disco(x, y, 3, hex('#e8c060')); R.pset(x - 1, y - 1, hex('#fff0b0')); }
  { const a = t * 0.5; R.linea(298, 70, 298 + Math.round(Math.cos(a) * 6), 70 + Math.round(Math.sin(a) * 6), T.C.k); R.linea(298, 70, 298 + Math.round(Math.cos(a * 0.08 - 1) * 4), 70 + Math.round(Math.sin(a * 0.08 - 1) * 4), T.C.k); }
  // el globo que gira sobre la mesita
  { const cx = 241, cy = 116, r = 13; R.rect(cx - 1, cy + r, cx + 1, 131, hex('#c8a040')); R.rect(cx - 7, 130, cx + 7, 131, hex('#5a3418')); R.disco(cx, cy, r + 1, T.C.k);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { if (i * i + j * j > r * r) continue; const lat = Math.asin(j / r), lon = (Math.asin(Math.max(-1, Math.min(1, i / (r * Math.cos(lat) + 0.01)))) + t * 0.8) * 2;
      const tierra = Math.sin(lon * 1.3) * Math.cos(lat * 3) + Math.sin(lon * 2.7 + 1) * 0.5 > 0.35; R.pset(cx + i, cy + j, tierra ? (i < -4 ? hex('#5a8a3a') : hex('#7aaa4a')) : (i < -4 ? hex('#2a5a9a') : hex('#3a7ac8'))); }
    R.pset(cx - 5, cy - 6, hex('#ffffff')); R.linea(cx - r - 2, cy - 3, cx + r + 2, cy + 3, hex('#c8a040')); }
  // el niño entra, señala el mapa con su palo y luego se vuelve al calendario y salta
  const r = s6_ruta(t, [[0.2, -20, 172], [VIAJA - 0.3, 120, 172]]), al = t > CALEND;
  R.actor(EL.ninoCatalan, r.x, 172, t, { dir: al ? 1 : -1, anda: r.mv, dedo: t > VIAJA && t < CALEND, sonrisa: t > VIAJA, salto: al ? Math.round(Math.abs(Math.sin((t - CALEND) * 7)) * 5 * (t < P2 ? 1 : 0)) : 0 });
  // un perrito duerme en la alfombra y mueve la cola
  { const x = 70, y = 176, c = Math.sin(t * 8) > 0 ? 1 : 0; R.rect(x, y - 6, x + 16, y, T.C.k); R.rect(x + 1, y - 5, x + 15, y - 1, hex('#c8a070')); R.rect(x + 12, y - 8, x + 19, y - 2, T.C.k); R.rect(x + 13, y - 7, x + 18, y - 3, hex('#c8a070')); R.pset(x + 16, y - 5, T.C.k); R.rect(x + 12, y - 7, x + 13, y - 4, hex('#8a6040'));
    R.linea(x, y - 4, x - 4, y - 6 - c * 2, hex('#8a6040')); }
};

// ── 2 · la calle de Filipinas: la tendera arranca la hoja y sale septiembre ──
const p2 = (t) => {
  const enc = tramo(t, SEPT + 0.1, SEPT + 0.5);
  const g = T.mundo(R, t, { encuadre: 'filipinas', encendido: enc });
  const S = g.suelo ?? 160;
  // el calendario colgado en el poste de la tienda: el 8; la tendera arranca la hoja y sale el 9
  const cx = 78, cy = 128, ar = tramo(t, SEPT - 0.25, SEPT + 0.05);
  PZ.calendario(R, cx, cy, { s: 2, dia: ar > 0 ? 9 : 8 });
  if (ar > 0 && ar < 1) { const y0 = 84 + 12; R.rect(cx - 19, y0, cx + 19, Math.round(lerp(cy - 4, y0, ar)), hex('#f6f0e0')); }
  { const v = tramo(t, SEPT + 0.05, SEPT + 1.3); if (v > 0 && v < 1) { const x = Math.round(cx + 10 + v * 40), y = Math.round(100 + v * 50 - Math.sin(v * 3) * 20), w = Math.round(8 + Math.cos(v * 12) * 6); R.rect(x - w, y - 7, x + w, y + 7, T.C.k); R.rect(x - w + 1, y - 6, x + w - 1, y + 6, hex('#f2ecdc')); if (w > 4) R.numero('8', x, y + 4, { color: hex('#2a2430') }); } }
  if (enc > 0 && enc < 1) s6_halo(cx, cy - 22, 30, hex('#ffe060'), 0.5 * (1 - enc));
  // la tendera junto al calendario: lo señala, arranca la hoja y celebra
  R.actor(EL.filipina, 100, S - 2, t, { dir: -1, dedo: t > FILIP - 0.2 && t < SEPT - 0.3, sostiene: t > SEPT - 0.3 && t < SEPT + 0.4 ? [cx + 8, cy - 30] : false, sonrisa: t > SEPT, brazos: t > SEPT + 0.5 && t < SEPT + 1.0, habla: t > MISMO && t < FILIP && Math.sin(t * 8) > 0 });
  // el coro llega por la izquierda y se coloca; uno lleva un parol en un palo
  const coro = [[EL.filipino, 120, 0], [EL.ninaCatalana, 138, 0.25], [EL.filipina, 154, 0.5], [EL.ninoCatalan, 172, 0.75]];
  coro.forEach(([d, x1, dl], k) => { const r = s6_ruta(t, [[P2 + 0.2 + dl, -24 - k * 18, 0], [NAVID + 1.6 + dl, x1, 0]]), y = S + 4 + (k % 2) * 3;
    const a = R.actor(d, r.x, y, t, { dir: r.mv ? 1 : -1, anda: r.mv, sonrisa: t > SEPT, habla: t > SEPT + 0.2 && Math.sin(t * 7 + k) > 0, sostiene: k === 0 ? [r.x + 12, y - 30] : false, salto: t > SEPT && t < SEPT + 0.6 ? Math.round(Math.abs(Math.sin((t - SEPT) * 10 + k)) * 3) : 0 });
    if (k === 0) { const [mx, my] = a.mano; R.linea(mx, my, mx + 2, my - 14, hex('#6a4a2a')); PZ.parol(R, mx + 2, my - 12, { t, color: 'amarillo' }); if (enc > 0.5) s6_halo(mx + 2, my - 22, 12, hex('#ffe060'), 0.35); } });
  // notas cuando empieza septiembre
  if (t > SEPT + 0.2) for (let k = 0; k < 4; k++) { const u = ((t - SEPT) * 0.6 + k / 4) % 1, x = 132 + k * 14 + Math.sin(t * 3 + k) * 3, y = 130 - u * 40; if (u < 0.9) s6_nota(x, y, hex(['#f8d020', '#f03a3a', '#3ad070', '#f05ab0'][k])); }
  T.mundoDelante(R, t, { encuadre: 'filipinas' });
};

// ── 3 · el parol grande: villancicos y el farol de estrella que se enciende ──
const p3 = (t) => {
  const enc = tramo(t, ESTRELLA - 0.1, FAROLES + 0.3);
  const g = T.mundo(R, t, { encuadre: 'filipinas', camara: 'parol', encendido: enc });
  const S = g.suelo ?? 170;
  // el coro canta en la acera (filipina, filipino, niños) y un señor con la guitarra
  const canta = t > VILLAN - 0.1;
  const coro = [[EL.filipina, 128], [EL.ninaCatalana, 150], [EL.filipino, 172], [EL.ninoCatalan, 194], [EL.filipina, 216]];
  coro.forEach(([d, x], k) => R.actor(d, x, S + (k % 2) * 4, t, { dir: -1, habla: canta && Math.sin(t * 6 + k * 1.3) > -0.2, sonrisa: !canta || Math.sin(t * 6 + k * 1.3) <= -0.2, salto: canta && Math.sin(t * 3 + k) > 0.85 ? 1 : 0, brazos: t > LARGA && t < LARGA + 0.8 && k % 2 === 0 }));
  { const x = 244, a = R.actor(EL.filipino, x, S + 2, t, { dir: -1, sostiene: [x + 2, S - 12], sonrisa: true, pal: { C: hex('#e8dcc0'), c: hex('#c8b890'), H: hex('#3a2a20') } }); const [mx, my] = a.mano, rasga = canta && Math.sin(t * 14) > 0 ? 1 : 0;
    R.disco(mx - 3, my + 1, 5, T.C.k); R.disco(mx - 3, my + 1, 4, hex('#c8843a')); R.disco(mx - 3, my + 1, 1, T.C.k); R.linea(mx - 3, my - 2, mx - 14, my - 9, T.C.k); R.linea(mx - 3, my - 3, mx - 14, my - 10, hex('#6a3a1a')); R.rect(mx - 16, my - 12, mx - 13, my - 9, hex('#3a2010')); if (rasga) R.pset(mx - 1, my, hex('#fff0b0')); }
  // las notas que suben del coro
  if (canta) for (let k = 0; k < 6; k++) { const u = ((t - VILLAN) * 0.5 + k / 6) % 1, x = 136 + k * 22 + Math.sin(t * 2 + k) * 4, y = S - 34 - u * 50; if (u < 0.85 && y > 50) s6_nota(x, y, hex(['#f8d020', '#f03a3a', '#3ad070', '#f05ab0', '#3a8af0', '#ffffff'][k])); }
  // «la Navidad más larga»: las hojas 9, 10, 11, 12 y 1 aparecen en fila en la pared
  ['9', '10', '11', '12', '1'].forEach((m, k) => { const u = tramo(t, LARGA - 0.9 + k * 0.32, LARGA - 0.7 + k * 0.32); if (u <= 0) return; const x = 136 + k * 30, y = 112 + Math.round((1 - u) * 8);
    R.rect(x - 12, y - 18, x + 12, y + 10, T.C.k); R.rect(x - 11, y - 17, x + 11, y + 9, hex('#f2ecdc')); R.rect(x - 11, y - 17, x + 11, y - 12, hex('#b8202a')); R.rect(x - 7, y - 20, x - 6, y - 15, T.C.k); R.rect(x + 6, y - 20, x + 7, y - 15, T.C.k);
    R.numero(m, x, y + 6, { color: hex('#2a2430'), centro: true }); if (k < 4 && u >= 1) PZ.parol(R, x + 15, y - 14, { t, color: ['rojo', 'azul', 'verde', 'amarillo'][k] }); });
  { const u = tramo(t, TIERRA_ - 0.6, TIERRA_); if (u > 0) { R.linea(124, 128, Math.round(lerp(124, 268, u)), 128, hex('#f0c040')); R.linea(124, 129, Math.round(lerp(124, 268, u)), 129, hex('#a87a18')); } }
  T.mundoDelante(R, t, { encuadre: 'filipinas', camara: 'parol' });
};
const PZ = T.PIEZAS_NV;
const efectos = [[DEJA + 0.35, 'tic'], [VIAJA, 'whoosh'], [SIGUE + 0.1, 'papel'], [CALEND + 0.2, 'papel'], [P2 + 1.0, 'aldea', { k: 2 }], [SEPT - 0.2, 'papel'], [SEPT + 0.15, 'brillo'], [VILLAN, 'campana'], [ESTRELLA + 0.1, 'brillo'], [LARGA - 0.85, 'pop'], [LARGA + 0.4, 'pop'], [TIERRA_ - 0.2, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
'''))

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['nv-gavle'] = ('La cabra de Gävle', '''// NV-GAVLE (frase 20), sin cartela; barra 2026, 1966 → 2026 (las veces), 2016 y otra vez 2026. Tres planos:
// 1. la cabra de paja de cerca, de noche: un obrero sube por la escalera y le ata el gran lazo rojo al cuello («giant
//    straw goat»); otro sujeta la escalera; los vecinos señalan y aplauden; la bandera sueca ondea (corta en «and»);
// 2. la caseta del vigilante por dentro (fondo local): toma café del termo frente a los monitores; a «burn» un monitor
//    se pone naranja (el resplandor, sin nadie), salta, coge la radio y sale corriendo por la puerta; en la pared, la
//    tabla de las cabras se llena de X rojas y sale el «40» («more than 40 times») mientras la barra cuenta 1966 → 2026;
// 3. la plaza: 2016, se corta la cinta y la gente aplaude; a «flames» el resplandor naranja detrás de la cabra (sin nadie
//    quemándola), la gente se echa atrás y el vigilante sale de la caseta; a «every year» el resplandor se va, sube el
//    andamio y los obreros vuelven a levantarla con haces de paja; la gente aplaude.''', LIB + _en('gavle', 0.5, 18.509, r'''
const P2 = @(5.51), P3 = @(12.30);
const SUECIA = @(1.58), CIUDAD = @(2.81), CONSTR = @(3.59), GIGANTE = @(4.15), CABRA = @(4.87);
const ALGUIEN = @(6.55), QUEMAR = @(7.47), DESTR = @(9.01), MAS = @(10.41), CUARENTA = @(11.01);
const LLAMAS = @(13.77), DIA = @(14.93), INAUG = @(15.49), OTRA = @(16.61), CONSTR2 = @(17.61), DENUEVO = @(18.05);
const PZ = T.PIEZAS_NV;
// la bandera sueca que ondea (azul con la cruz amarilla, sin letras)
const bandera = (x, y, t) => { R.rect(x - 1, y - 2, x, y + 46, T.C.k); R.rect(x, y - 1, x, y + 46, hex('#c8ccd8')); R.disco(x, y - 3, 1, hex('#e8c060'));
  for (let i = 0; i < 26; i++) { const dy = Math.round(Math.sin(t * 5 - i * 0.35) * (i / 26) * 3); for (let j = 0; j < 16; j++) { const cruz = (i >= 7 && i <= 10) || (j >= 6 && j <= 9); R.pset(x + 1 + i, y + j + dy, cruz ? (j === 6 || i === 7 ? hex('#f8e060') : hex('#f0c820')) : (j < 2 ? hex('#3a6ac8') : hex('#2a58b0'))); } R.pset(x + 1 + i, y + 16 + dy, T.C.k); } };

// ── 1 · la cabra de cerca: el lazo rojo ──
const p1 = (t) => {
  const g = T.mundo(R, t, { encuadre: 'gavle', camara: 'cabra' });
  const S = g.suelo ?? 172;
  bandera(26, 62, t);
  // la escalera apoyada en el cuello de la cabra
  const ex0 = 104, ex1 = 132, ey0 = S - 2, ey1 = 92;
  for (const d of [0, 8]) { R.linea(ex0 + d, ey0, ex1 + d, ey1, T.C.k); R.linea(ex0 + d + 1, ey0, ex1 + d + 1, ey1, hex('#c8ccd8')); }
  for (let k = 1; k < 9; k++) { const u = k / 9, x = Math.round(lerp(ex0, ex1, u)), y = Math.round(lerp(ey0, ey1, u)); R.linea(x, y, x + 8, y, hex('#9aa2b0')); }
  // el obrero sube por la escalera, ata el lazo y saluda
  const su = tramo(t, 0.6, CONSTR + 0.2), ox = Math.round(lerp(ex0 - 4, ex1 - 10, su)), oy = Math.round(lerp(ey0, ey1 + 18, su));
  const ata = t > CONSTR + 0.2 && t < CABRA + 0.1;
  R.actor(EL.obreroSueco, ox, oy, t, { dir: 1, anda: su > 0 && su < 1, sostiene: ata ? [140 + Math.round(Math.sin(t * 12) * 2), 92] : false, sonrisa: t > CABRA, brazos: t > CABRA + 0.3 && t < P2 - 0.2 });
  // el gran lazo rojo del cuello: se va haciendo y a «goat» queda hecho
  const lz = tramo(t, CONSTR + 0.3, CABRA), lx = 148, ly = 96;
  if (lz > 0) { const w = Math.round(lerp(2, 9, lz)); R.poligono([[lx, ly], [lx - w, ly - 5], [lx - w, ly + 5]], T.C.k); R.poligono([[lx, ly], [lx + w, ly - 5], [lx + w, ly + 5]], T.C.k);
    R.poligono([[lx, ly], [lx - w + 1, ly - 4], [lx - w + 1, ly + 4]], hex('#c8202a')); R.poligono([[lx, ly], [lx + w - 1, ly - 4], [lx + w - 1, ly + 4]], hex('#c8202a')); R.pset(lx - w + 2, ly - 2, hex('#f0606a')); R.pset(lx + w - 2, ly - 2, hex('#f0606a'));
    R.rect(lx - 2, ly - 2, lx + 2, ly + 2, T.C.k); R.rect(lx - 1, ly - 1, lx + 1, ly + 1, hex('#e8303a'));
    if (lz >= 1) { R.linea(lx - 1, ly + 2, lx - 4, ly + 12, hex('#a01820')); R.linea(lx + 1, ly + 2, lx + 5, ly + 11, hex('#a01820')); } }
  if (t > CABRA && t < CABRA + 0.8) for (let k = 0; k < 5; k++) s6_destello(lx + Math.cos(k * 1.26 + t * 3) * 14, ly + Math.sin(k * 1.26 + t * 3) * 10, 2, hex('#fff6c0'));
  // el compañero sujeta la escalera
  R.actor(EL.obreroSueco, ex0 - 18, S, t, { dir: 1, sostiene: [ex0 + 2, S - 22], habla: t > CIUDAD && t < CONSTR && Math.sin(t * 8) > 0, sonrisa: t > CABRA, pal: { C: hex('#e8c02a'), c: hex('#b8901a') } });
  // los vecinos miran: la niña señala la cabra gigante, todos aplauden al lazo
  R.actor(EL.muchachoYule, 22, S, t, { dir: 1, sonrisa: t > CABRA, habla: t > SUECIA && t < CIUDAD && Math.sin(t * 7) > 0, brazos: t > CABRA + 0.1 && t < CABRA + 0.5 });
  R.actor(EL.ninaCatalana, 44, S + 3, t, { dir: 1, dedo: t > GIGANTE - 0.1 && t < CABRA + 0.2, sorpresa: t > GIGANTE && t < GIGANTE + 0.5, sonrisa: t > CABRA, salto: t > CABRA && t < CABRA + 0.6 ? Math.round(Math.abs(Math.sin((t - CABRA) * 10)) * 4) : 0 });
  R.actor(EL.adultoCatalan, 64, S + 1, t, { dir: 1, sonrisa: true, brazos: t > CABRA + 0.2 && t < CABRA + 0.6 });
  // un niño cruza delante tirando de su trineo
  { const u = tramo(t, 1.0, P2 - 0.3); if (u > 0 && u < 1) { const x = Math.round(lerp(250, 340, u)); const a = R.actor(EL.ninoCatalan, x, 179, t, { dir: 1, anda: true, sonrisa: true }); R.linea(x + 2, 168, x - 10, 176, hex('#5a3a1a'));
    R.rect(x - 26, 172, x - 8, 176, T.C.k); R.rect(x - 25, 173, x - 9, 175, hex('#b8302a')); R.linea(x - 27, 178, x - 6, 178, hex('#c8ccd8')); } }
};

// ── 2 · la caseta del vigilante (fondo local): los monitores, el resplandor y la tabla de las 40 ──
const PUERTA = [10, 44, 46, 140], VENT = [58, 40, 118, 98], MON = [[128, 48, 176, 84], [182, 48, 230, 84], [154, 88, 202, 118]], TABLA = [240, 54, 312, 124];
const cabrita = (cx, base, s, c, cS) => { // una cabra de paja de silueta (para los monitores y la ventana)
  R.rect(cx - 6 * s, base - 6 * s, cx + 5 * s, base - 3 * s, c); R.rect(cx - 6 * s, base - 3 * s, cx + 5 * s, base - 3 * s, cS);
  for (const dx of [-5, -2, 2, 4]) R.rect(cx + dx * s, base - 3 * s, cx + dx * s + Math.max(0, s - 1), base, c);
  R.rect(cx - 8 * s, base - 9 * s, cx - 5 * s, base - 5 * s, c); R.rect(cx - 10 * s, base - 8 * s, cx - 8 * s, base - 6 * s, c); R.pset(cx - 6 * s, base - 10 * s, cS); R.pset(cx - 5 * s, base - 11 * s, cS);
  R.rect(cx + 5 * s, base - 6 * s, cx + 6 * s, base - 5 * s, c); };
const fondoCaseta = () => {
  const { rect, pset, linea, disco } = R;
  // pared de tablas de pino (tranquila arriba a la derecha y bajo la barra)
  for (let y = 0; y < 142; y++) for (let x = 0; x < 320; x++) { const b = Math.floor(x / 14), calma = (x > 272 && y < 48) || (y < 16 && x < 176);
    let c = b % 2 ? hex('#a8784a') : hex('#b8885a'); if (x % 14 === 0) c = hex('#5a3a22'); else if (x % 14 === 1) c = hex('#c89a6a'); else if (!calma && Math.sin(y * 0.09 + b * 3 + Math.sin(y * 0.03 + b) * 2) > 0.9) c = hex('#946640'); else if (!calma && s6_h(x, y >> 2, b) < 0.03) c = hex('#8a5a34'); pset(x, y, c); }
  rect(0, 140, 319, 143, hex('#4a2e18')); rect(0, 140, 319, 140, hex('#7a5232'));
  // suelo de linóleo a cuadros
  for (let y = 144; y < 180; y++) for (let x = 0; x < 320; x++) { const q = (Math.floor((x + (y - 144) * 0.5) / 12) + Math.floor((y - 144) / 6)) % 2; pset(x, y, q ? hex('#5a6270') : hex('#7a8290')); }
  // la puerta (con su ventanita) y el abrigo colgado
  rect(PUERTA[0] - 3, PUERTA[1] - 3, PUERTA[2] + 3, PUERTA[3], hex('#3a2414')); rect(PUERTA[0], PUERTA[1], PUERTA[2], PUERTA[3], hex('#2a4a6a'));
  rect(PUERTA[0] + 4, PUERTA[1] + 4, PUERTA[2] - 4, PUERTA[1] + 40, hex('#1a3048')); rect(PUERTA[0] + 4, PUERTA[1] + 50, PUERTA[2] - 4, PUERTA[3] - 6, hex('#22405e')); rect(PUERTA[2] - 6, 92, PUERTA[2] - 3, 95, hex('#e8c060'));
  // la ventana a la plaza (el interior se pinta cada fotograma)
  rect(VENT[0] - 4, VENT[1] - 4, VENT[2] + 4, VENT[3] + 6, T.C.k); rect(VENT[0] - 3, VENT[1] - 3, VENT[2] + 3, VENT[3] + 3, hex('#f2eee2')); rect(VENT[0] - 5, VENT[3] + 3, VENT[2] + 5, VENT[3] + 7, hex('#e8e4d8')); rect(VENT[0] - 5, VENT[3] + 7, VENT[2] + 5, VENT[3] + 7, hex('#8a8478'));
  // la mesa larga con su cajonera
  rect(120, 120, 236, 126, T.C.k); rect(121, 121, 235, 124, hex('#6a4a32')); rect(121, 121, 235, 121, hex('#8a6a4a')); rect(124, 126, 128, 160, hex('#3a2418')); rect(212, 126, 234, 160, hex('#4a3020')); for (const y of [132, 144]) { rect(214, y, 232, y + 9, hex('#5a3a28')); rect(221, y + 4, 225, y + 5, hex('#c8a060')); }
  // los monitores (marcos; la imagen va en cada fotograma)
  for (const [x0, y0, x1, y1] of MON) { rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, T.C.k); rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, hex('#3a3a44')); rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, hex('#5a5a66')); }
  rect(152, 85, 158, 87, hex('#2a2a34')); rect(204, 85, 210, 87, hex('#2a2a34'));
  // el teclado, papeles, la taza y la lámpara de flexo
  rect(140, 116, 186, 120, T.C.k); rect(141, 117, 185, 119, hex('#4a4a54')); for (let x = 143; x < 184; x += 3) pset(x, 118, hex('#8a8a96'));
  rect(190, 114, 206, 120, hex('#f2eee2')); rect(192, 115, 204, 115, hex('#9a9aa8')); rect(192, 117, 202, 117, hex('#9a9aa8'));
  // el radiador
  rect(250, 130, 300, 156, T.C.k); for (let x = 252; x < 300; x += 6) { rect(x, 132, x + 4, 155, hex('#c8ccd4')); rect(x, 132, x, 155, hex('#e8eef4')); rect(x + 4, 132, x + 4, 155, hex('#8a909a')); }
  // la tabla de las cabras: 40 casillas (8 × 5) con una cabrita cada una
  rect(TABLA[0] - 2, TABLA[1] - 2, TABLA[2] + 2, TABLA[3] + 2, T.C.k); rect(TABLA[0] - 1, TABLA[1] - 1, TABLA[2] + 1, TABLA[3] + 1, hex('#f4f0e4')); rect(TABLA[0] - 1, TABLA[1] - 1, TABLA[2] + 1, TABLA[1] + 4, hex('#2a58b0')); rect(TABLA[0] + 22, TABLA[1] - 1, TABLA[0] + 26, TABLA[1] + 4, hex('#f0c820'));
  for (const x of [TABLA[0] + 6, TABLA[2] - 6]) { disco(x, TABLA[1] - 3, 1, hex('#c8202a')); }
  for (let j = 0; j < 5; j++) for (let i = 0; i < 8; i++) { const x = TABLA[0] + 3 + i * 9, y = TABLA[1] + 8 + j * 12; rect(x, y, x + 7, y + 10, hex('#e0dccc')); cabrita(x + 4, y + 9, 0.5 < 1 ? 1 : 1, hex('#d8a040'), hex('#8a5a20')); }
};
const p2 = (t) => {
  s6_fondo('gv-caseta', fondoCaseta);
  const res = tramo(t, QUEMAR - 0.1, QUEMAR + 0.5) * (1 - 0.6 * tramo(t, DESTR + 0.5, P3));
  // por la ventana: la plaza de noche, la cabra lejos, nieve; el resplandor detrás de ella (recortado al hueco)
  R.recorte(VENT);
  s6_degr(VENT[1], VENT[3], VENT[0], VENT[2], [[0, hex('#0e1430')], [0.6, hex('#1e2a5a')], [1, hex('#2a3a6a')]]);
  for (let k = 0; k < 10; k++) R.pset(VENT[0] + Math.round(s6_h(k, 1, 9) * 60), VENT[1] + Math.round(s6_h(k, 2, 9) * 30), Math.sin(t * 2 + k) > 0 ? hex('#e8e8ff') : hex('#8a8ac0'));
  for (let x = VENT[0]; x <= VENT[2]; x++) { const top = 74 + Math.round(Math.abs(Math.sin(x * 0.3)) * 4) + (x % 9 < 4 ? -6 : 0); R.linea(x, top, x, 88, hex('#2a2440')); if (x % 5 === 2 && (x * 7) % 3) R.pset(x, top + 4, hex('#ffd080')); }
  if (res > 0) s6_halo(92, 78, 26, hex('#ff7a2a'), 0.75 * res);
  R.linea(VENT[0], 89, VENT[2], 89, hex('#c8d0e8')); R.rect(VENT[0], 90, VENT[2], VENT[3], hex('#dce4f4'));
  cabrita(92, 88, 2, hex('#d8a040'), hex('#8a5a20'));
  s6_nieve(t, 30, hex('#dce4f4'), hex('#ffffff'), VENT, 10, 3);
  R.recorte(null);
  R.rect(VENT[0] + 29, VENT[1], VENT[0] + 30, VENT[3], hex('#f2eee2')); R.rect(VENT[0], VENT[1] + 28, VENT[2], VENT[1] + 29, hex('#f2eee2'));
  // los monitores: la cabra desde tres cámaras, con líneas de barrido; a «burn» uno se pone naranja y parpadea
  MON.forEach(([x0, y0, x1, y1], k) => { R.recorte([x0, y0, x1, y1]); const alarma = res > 0 && (k === 1 || res > 0.6);
    s6_degr(y0, y1, x0, x1, [[0, hex('#0a1a2a')], [1, hex('#1a3a3a')]]); if (alarma) s6_halo(Math.round((x0 + x1) / 2), y0 + 18, 26, hex('#ff8a3a'), 0.8 * res * (0.8 + 0.2 * Math.sin(t * 20)));
    R.rect(x0, y1 - 8, x1, y1, hex('#3a5a5a')); cabrita(Math.round((x0 + x1) / 2) + (k - 1) * 6, y1 - 6, 2, alarma ? hex('#ffd080') : hex('#a8d0a0'), hex('#4a7a5a'));
    for (let y = y0 + ((Math.floor(t * 30) + k) % 3); y <= y1; y += 3) for (let x = x0; x <= x1; x++) s6_tin(x, y, hex('#000000'), 0.25);
    if (Math.floor(t * 2 + k) % 2) R.disco(x1 - 4, y0 + 4, 1, hex('#ff3a3a')); R.recorte(null);
    for (let x = x0; x <= x1; x += 2) R.pset(x, y0, hex('#6a8a8a')); });
  if (res > 0 && Math.sin(t * 16) > 0) R.icono('!', 203, 30, hex('#ffd040'), T.C.k, 2);
  // el vigilante: bebe del termo, salta a «burn», coge la radio y sale corriendo por la puerta (que se abre y se cierra)
  const sale = s6_ruta(t, [[QUEMAR + 0.7, 104, 166], [QUEMAR + 1.5, 26, 166]]), fuera = t > QUEMAR + 1.5;
  const ab = tramo(t, QUEMAR + 0.9, QUEMAR + 1.3) - tramo(t, QUEMAR + 1.6, QUEMAR + 2.1);
  if (ab > 0) { const w = Math.round((PUERTA[2] - PUERTA[0]) * ab); R.rect(PUERTA[0], PUERTA[1], PUERTA[0] + w, PUERTA[3], hex('#0e1430')); R.recorte([PUERTA[0], PUERTA[1], PUERTA[0] + w, PUERTA[3]]); for (let k = 0; k < 12; k++) R.pset(PUERTA[0] + Math.round(s6_h(k, 4, 2) * w), PUERTA[1] + Math.round(((s6_h(k, 5, 2) * 90 + t * 20) % 96)), hex('#dce4f4')); R.recorte(null);
    R.rect(PUERTA[0] + w, PUERTA[1], PUERTA[0] + w + 3, PUERTA[3], hex('#3a5a7a')); }
  if (!fuera) { const salta = t > QUEMAR && t < QUEMAR + 0.6, bebe = t > ALGUIEN - 1 && t < QUEMAR - 0.1 && Math.sin(t * 2) > 0;
    R.actor(EL.vigilante, sale.x, 166, t, { dir: sale.mv ? -1 : 1, anda: sale.mv, sorpresa: t > QUEMAR - 0.05 && t < QUEMAR + 0.9, salto: salta ? Math.round(Math.sin((t - QUEMAR) / 0.6 * Math.PI) * 9) : 0, sostiene: bebe ? [sale.x + 10, 132] : false, habla: t > QUEMAR + 0.4 && t < QUEMAR + 0.9 });
    if (t > QUEMAR - 0.05 && t < QUEMAR + 0.7) R.icono('!', sale.x + 4, 120, hex('#ffffff'), T.C.k, 2); }
  // el termo que queda en la mesa echando vapor (después de que salga)
  if (t > QUEMAR + 0.6) { PZ.termo(R, 138, 120, { s: 2 }); for (let i = 0; i < 6; i++) s6_tin(138 + Math.sin(t * 3 + i) * 2, 102 - i * 2 - ((t * 8) % 4), hex('#ffffff'), 0.4); }
  // el abrigo de la percha se mece cuando se abre la puerta
  { const a = Math.round(Math.sin(t * 6) * 2 * Math.max(0, ab)); R.rect(54, 104, 58, 106, hex('#c8a060')); R.poligono([[52 + a, 106], [60 + a, 106], [64 + a, 132], [48 + a, 132]], T.C.k); R.poligono([[53 + a, 107], [59 + a, 107], [63 + a, 131], [49 + a, 131]], hex('#8a2a2a')); R.rect(55 + a, 108, 56 + a, 130, hex('#6a1a1a')); }
  // la tabla: las cabras se tachan con una X roja una tras otra y sale el «40»
  const nx = Math.floor(tramo(t, DESTR, CUARENTA) * 40);
  for (let k = 0; k < nx; k++) { const i = k % 8, j = Math.floor(k / 8), x = TABLA[0] + 3 + i * 9, y = TABLA[1] + 8 + j * 12; R.linea(x, y + 1, x + 7, y + 9, hex('#c8202a')); R.linea(x + 7, y + 1, x, y + 9, hex('#c8202a')); R.linea(x + 1, y + 1, x + 7, y + 8, hex('#e8404a')); }
  const c40 = tramo(t, CUARENTA, CUARENTA + 0.3); if (c40 > 0) { const s = Math.round(lerp(10, 0, c40)); s6_halo(276, 92, 34, hex('#ffffff'), 0.35 * c40); R.numero('40', 276, 102 - s, { tam: 16, centro: true }); }
  // el radiador vibra de calor y la luz roja de la radio de la pared parpadea
  for (let i = 0; i < 8; i++) { const u = ((t * 0.7 + i / 8) % 1); s6_tin(254 + i * 6 + Math.sin(t * 4 + i) * 1.5, 128 - u * 14, hex('#ffffff'), 0.25 * (1 - u)); }
};

// ── 3 · la plaza: 2016, el mismo día; y cada año la vuelven a levantar ──
const p3 = (t) => {
  const res = tramo(t, LLAMAS - 0.2, LLAMAS + 0.6) * (1 - tramo(t, OTRA - 0.6, OTRA + 0.4)), obra = tramo(t, OTRA + 0.1, CONSTR2 + 0.2);
  const g = T.mundo(R, t, { encuadre: 'gavle', resplandor: res, obra, vallaDelante: true });
  const S = g.suelo ?? 166;
  // los obreros vuelven con haces de paja: uno sube por el andamio, otro trae la paja (dentro de la valla, pies en 150)
  if (t > OTRA) { const a = s6_ruta(t, [[OTRA + 0.1, 330, 150], [CONSTR2, 262, 150]]);
    const o1 = R.actor(EL.obreroSueco, a.x, 150, t, { dir: -1, anda: a.mv, sostiene: [a.x - 4, 132], sonrisa: !a.mv });
    { const [mx, my] = o1.mano; R.rect(mx - 9, my - 6, mx + 3, my + 2, T.C.k); R.rect(mx - 8, my - 5, mx + 2, my + 1, hex('#d8a040')); for (let x = mx - 8; x <= mx + 2; x += 2) R.rect(x, my - 5, x, my + 1, hex('#a87a20')); R.rect(mx - 3, my - 5, mx - 2, my + 1, hex('#c8202a')); }
    const sb = tramo(t, CONSTR2 - 0.4, DENUEVO + 0.3); R.actor(EL.obreroSueco, 168, Math.round(lerp(150, 106, sb)), t, { dir: 1, anda: sb > 0 && sb < 1, brazos: t > DENUEVO + 0.3, sonrisa: true, pal: { C: hex('#e8c02a'), c: hex('#b8901a') } }); }
  // la cinta de la inauguración, delante de la valla; la alcaldesa la corta en 2016 y quedan los trozos en la nieve
  const corta = @(12.85);
  T.mundoDelante(R, t, { encuadre: 'gavle', vallaDelante: true });
  if (t < corta) { R.linea(146, 146, 288, 146, hex('#c8202a')); R.linea(146, 147, 288, 147, hex('#801018')); R.rect(214, 142, 222, 150, hex('#c8202a')); }
  else { const c = tramo(t, corta, corta + 0.6); R.linea(146, 146, Math.round(lerp(216, 150, c)), Math.round(lerp(146, 160, c)), hex('#c8202a')); R.linea(288, 146, Math.round(lerp(220, 284, c)), Math.round(lerp(146, 160, c)), hex('#c8202a')); }
  // la gente de la plaza (delante): aplaude la inauguración, se echa atrás con el resplandor, aplaude al final
  const susto = t > LLAMAS && t < OTRA, atras = Math.round(tramo(t, LLAMAS, LLAMAS + 0.8) * 8 * (1 - tramo(t, OTRA, OTRA + 1)));
  const gente = [[EL.adultoCatalan, 196, 170], [EL.muchachoYule2, 236, 174], [EL.ninaCatalana, 222, 176], [EL.muchachoYule3, 260, 170], [EL.ninoCatalan, 176, 176], [EL.muchachoYule, 150, 172]];
  gente.forEach(([d, x, y], k) => R.actor(d, x, y + atras, t, { dir: k === 0 ? -1 : -1, sorpresa: susto && t < LLAMAS + 1.2, triste: susto && t > LLAMAS + 1.2, sonrisa: !susto, brazos: (t > corta && t < corta + 0.7) || (t > DENUEVO && t < DENUEVO + 0.8 && k % 2 === 0), dedo: k === 2 && t > LLAMAS + 0.2 && t < LLAMAS + 1.0,
    sostiene: k === 0 && t < corta + 0.4 ? [x - 4, y - 18] : false, salto: (t > DENUEVO && Math.sin(t * 9 + k) > 0.6) ? 2 : 0 }));
  { const [x, y] = [196 - 5, 170 - 18 + atras]; if (t < corta + 0.4) { R.linea(x, y, x - 4, y - 4, hex('#c8ccd8')); R.linea(x, y, x - 5, y - 1, hex('#c8ccd8')); R.disco(x + 1, y + 1, 1, hex('#3a3a44')); } }
  // los flashes de los móviles a la inauguración
  if (t > corta && t < corta + 1.0) for (const [x, y, f] of [[244, 150, 0], [268, 148, 0.3], [160, 152, 0.6]]) if (((t - corta) * 3 + f) % 1 < 0.2) { s6_destello(x, y, 3, hex('#ffffff')); s6_halo(x, y, 8, hex('#ffffff'), 0.5); }
  // el vigilante sale de su caseta y corre hacia la cabra con la radio
  { const r = s6_ruta(t, [[LLAMAS + 0.4, 98, 158], [LLAMAS + 1.6, 140, 160]]); if (t > LLAMAS + 0.3 && t < OTRA + 0.5) { R.actor(EL.vigilante, r.x, r.y, t, { dir: 1, anda: r.mv, habla: !r.mv && Math.sin(t * 8) > 0, sorpresa: r.mv }); } }
  // al final, los nuevos lazos brillan
  if (t > DENUEVO) for (let k = 0; k < 4; k++) if (Math.sin(t * 8 + k * 2) > 0.5) s6_destello(176 + k * 22, 70 + (k % 2) * 30, 2, hex('#fff6c0'));
};
const año = (t) => (t < DESTR - 0.3 ? 2026 : t < DESTR ? Math.round(lerp(2026, 1966, tramo(t, DESTR - 0.3, DESTR))) : t < P3 ? Math.round(lerp(1966, 2026, tramo(t, DESTR, CUARENTA))) : t < OTRA ? 2016 : Math.round(lerp(2016, 2026, tramo(t, OTRA, OTRA + 0.9))));
const efectos = [[0.7, 'toc'], [1.5, 'toc'], [CABRA, 'pop'], [CABRA + 0.25, 'palmada'], [ALGUIEN - 0.6, 'burbujas'], [QUEMAR, 'aviso'], [QUEMAR + 1.0, 'puerta'], [DESTR + 0.2, 'tic'], [MAS, 'tic'], [CUARENTA, 'sello'], [@(12.85), 'palmada'], [LLAMAS, 'rafaga'], [OTRA + 0.5, 'toc'], [CONSTR2, 'toc'], [DENUEVO + 0.1, 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
'''))
