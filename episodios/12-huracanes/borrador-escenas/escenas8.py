# Episodio 12, acto 6 (2026): hu-silencio, hu-isaias y hu-josephine. Formato del 11 (generar-escenas.py):
# E[id] = (título, comentario de cabecera, cuerpo). Los instantes salen de las marcas reales de la voz inglesa y de los
# tiempos de cada palabra (atomo/build/largo/ep12/linea.json), escritos como en('marca', fracción de la frase).

# ── piezas comunes a las tres escenas (se copian en cada cuerpo) ───────────────────────────────────────────────────
COMUNES = r'''
const C = T.C;
const lin = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const entre = (t, a, b) => t >= a && t < b;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const bay = (x, y) => BAY[((y & 3) << 2) | (x & 3)];
// ruido suave (interpolado) para agua, espuma y nubes
const vruido = (x, y, k = 0) => { const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy), a = hh(x0, y0, k), b = hh(x0 + 1, y0, k), c = hh(x0, y0 + 1, k), d = hh(x0 + 1, y0 + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };
// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a
const mezcla = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const esMar = (c) => { const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255; return b > r + 22 && b >= g - 4; };
// el símbolo de huracán (lleno) o de tormenta tropical (hueco) de 9 × 9, con su contorno; x, y: el centro
const SIMB = ['.....##..', '......##.', '...###...', '..#####..', '..##o##..', '..#####..', '...###...', '.##......', '..##.....'];
const simbolo = (x, y, col, lleno = true, contorno = C.k) => {
  const en9 = (i, j) => i >= 0 && j >= 0 && i < 9 && j < 9 && SIMB[j][i] !== '.' && (lleno || SIMB[j][i] !== 'o');
  for (let j = -1; j < 10; j++) for (let i = -1; i < 10; i++) { if (en9(i, j)) continue; if (en9(i - 1, j) || en9(i + 1, j) || en9(i, j - 1) || en9(i, j + 1)) R.pset(x - 4 + i, y - 4 + j, contorno); }
  for (let j = 0; j < 9; j++) for (let i = 0; i < 9; i++) if (en9(i, j)) R.pset(x - 4 + i, y - 4 + j, col);
};
// cifras pequeñas de 3 × 5 (los días del calendario)
const DIG = { 0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['###', '..#', '###', '#..', '###'], 3: ['###', '..#', '.##', '..#', '###'], 4: ['#.#', '#.#', '###', '..#', '..#'],
  5: ['###', '#..', '###', '..#', '###'], 6: ['###', '#..', '###', '#.#', '###'], 7: ['###', '..#', '..#', '.#.', '.#.'], 8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '###'] };
const cifras = (s, x, y, c) => { let cx = x; for (const ch of String(s)) { const g = DIG[ch]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j][i] === '#') R.pset(cx + i, y + j, c); cx += 4; } };
// una taza pequeña con su asa (x, y: arriba a la izquierda), con vapor si humea
const taza = (x, y, t, humea = true, col = C.blanco) => { R.rect(x, y, x + 3, y + 4, C.k); R.rect(x + 1, y + 1, x + 2, y + 3, col); R.pset(x + 1, y + 1, hex('#5a3418')); R.pset(x + 4, y + 1, C.k); R.pset(x + 5, y + 2, C.k); R.pset(x + 4, y + 3, C.k);
  if (humea) for (let k = 0; k < 2; k++) { const u = (t * 0.8 + k * 0.5) % 1; R.pset(Math.round(x + 1 + k + Math.sin(u * 6 + k) * 1.2), Math.round(y - 1 - u * 6), u < 0.6 ? hex('#e8ecf0') : hex('#c4ccd4')); } };
// dónde lleva algo en la mano un personaje que no levanta el brazo (x, suelo, dir)
const enMano = (x, suelo, dir) => [dir > 0 ? x + 12 : x - 1, suelo - 10];
// la mano canónica (T.mano, 14 px) con la manga que llega hasta el borde del cuadro, para que el brazo no acabe en el aire
const manoBorde = (x, y, dir, manga) => { const m = hex(manga), e = dir > 0 ? x - 43 : x + 43; if (dir > 0 ? e > 0 : e < 319) { const a = dir > 0 ? 0 : e, b = dir > 0 ? e : 319;
  R.rect(a, Math.round(y) - 2, b, Math.round(y) + 2, m); R.rect(a, Math.round(y) - 3, b, Math.round(y) - 3, C.k); R.rect(a, Math.round(y) + 3, b, Math.round(y) + 3, C.k); for (let i = a; i <= b; i += 9) R.pset(i, Math.round(y) + 1, mezcla(m, C.k, 0.3)); }
  T.mano(R, Math.round(x), Math.round(y), dir, manga); };
'''

# ── el inserto de la oficina del centro, de cerca, con el calendario de pared (hu-silencio y hu-josephine) ───────────
OFICINA = r'''
// La oficina del centro de huracanes, de cerca (inserto que pinta los 320 × 180): la pared de paneles de tela con su
// trama, las juntas y la luz de la cornisa; el calendario de pared grande con sus anillas, la foto del mes (que se
// mueve), la cabecera con el mes y el año y la cuadrícula de días con sus cifras; la ventana con el cielo de Miami, nubes,
// los edificios, la palmera que se mece y un pelícano (todo recortado al hueco), la persiana y su cordón; el corcho con el
// mapa de la temporada, notas y la tarjeta del recuento de huracanes; el reloj con su segundero; abajo, el canto de la
// mesa con la taza que humea, papeles, lápices, el ventilador que gira y una planta que se mece con su aire.
// o.lado: 'izq' (ventana a la izquierda y corcho a la derecha) o 'der' (al revés). Devuelve dónde está cada cosa.
const OF_CAL = { x: 108, y: 24, w: 105, h: 124 };
const OF = {};
const ofGeo = (lado) => lado === 'izq'
  ? { ven: [16, 40, 86, 112], marco: [12, 36, 90, 116], corcho: [228, 54, 302, 124], reloj: [246, 31], tarjeta: [276, 88], mapa: [234, 60], ventilador: [36, 150], planta: [300, 150], tazaX: 240, papeles: [190, 214], lapices: 262 }
  : { ven: [234, 60, 304, 124], marco: [230, 56, 308, 128], corcho: [16, 34, 90, 104], reloj: [96, 27], tarjeta: [64, 70], mapa: [22, 40], ventilador: [284, 150], planta: [20, 150], tazaX: 74, papeles: [226, 250], lapices: 96 };
const ofFijo = (lado) => {
  if (OF[lado]) return OF[lado];
  const b = R.nuevo(), prev = R.usar(b), g = ofGeo(lado), { rect, pset, disco, linea } = R;
  // la pared de paneles de tela: trama fina, juntas cada 80 px y la luz cálida de la cornisa que baja
  for (let y = 0; y < 152; y++) for (let x = 0; x < 320; x++) {
    const luz = Math.max(0, 1 - (y - 8) / 70), n = hh(x >> 1, y >> 1, 801), m = hh(x >> 3, y >> 2, 802);
    let c = n < 0.1 ? hex('#8e96a2') : n > 0.93 ? hex('#c6ccd4') : m < 0.3 ? hex('#a2aab4') : hex('#aab2bc');
    if (luz > 0 && bay(x, y) < luz * 0.55) c = mezcla(c, hex('#f0e2c4'), 0.35);
    if (y > 120 && bay(x, y) < (y - 120) / 60) c = mezcla(c, hex('#6a7280'), 0.35);
    pset(x, y, c);
  }
  for (let x = 79; x < 320; x += 80) { rect(x, 8, x, 151, hex('#7a828e')); rect(x + 1, 8, x + 1, 151, hex('#c2c8d0')); }
  rect(0, 0, 319, 5, hex('#e6e2d8')); rect(0, 6, 319, 6, hex('#fff6dc')); rect(0, 7, 319, 7, hex('#8a8478'));
  for (let x = 6; x < 320; x += 40) rect(x, 2, x + 18, 3, hex('#fffbe8'));
  // la ventana: el marco de aluminio, el parteluz, el alféizar con una maceta de cactus
  const [vx0, vy0, vx1, vy1] = g.marco;
  rect(vx0 - 1, vy0 - 1, vx1 + 1, vy1 + 1, C.k); rect(vx0, vy0, vx1, vy1, hex('#d8dce2')); rect(vx0, vy0, vx1, vy0, hex('#f4f6f8')); rect(vx0, vy1, vx1, vy1, hex('#a8aeb8'));
  rect(vx0 - 4, vy1 + 2, vx1 + 4, vy1 + 5, C.k); rect(vx0 - 3, vy1 + 2, vx1 + 3, vy1 + 3, hex('#eef0f2')); rect(vx0 - 3, vy1 + 4, vx1 + 3, vy1 + 4, hex('#b8bec8'));
  { const mx = lado === 'izq' ? vx0 + 6 : vx1 - 14; rect(mx, vy1 - 6, mx + 8, vy1 + 1, C.k); rect(mx + 1, vy1 - 5, mx + 7, vy1, hex('#c8643a')); rect(mx + 1, vy1 - 5, mx + 7, vy1 - 5, hex('#e08454'));
    rect(mx + 3, vy1 - 14, mx + 5, vy1 - 6, C.k); rect(mx + 4, vy1 - 13, mx + 4, vy1 - 7, hex('#5a9a4a')); rect(mx + 1, vy1 - 11, mx + 2, vy1 - 10, hex('#5a9a4a')); rect(mx + 6, vy1 - 10, mx + 7, vy1 - 9, hex('#5a9a4a')); pset(mx + 4, vy1 - 15, hex('#e86a8a')); }
  // el corcho con su marco de madera, la trama, el mapa de la temporada, notas de colores y chinchetas
  const [cx0, cy0, cx1, cy1] = g.corcho;
  rect(cx0 - 1, cy0 - 1, cx1 + 1, cy1 + 1, C.k); rect(cx0, cy0, cx1, cy1, C.maderaL); rect(cx0 + 1, cy0 + 1, cx1 - 1, cy1 - 1, C.madera);
  for (let y = cy0 + 3; y <= cy1 - 3; y++) for (let x = cx0 + 3; x <= cx1 - 3; x++) { const n = hh(x, y, 803); pset(x, y, n < 0.18 ? hex('#a8784a') : n > 0.9 ? hex('#e0b882') : hex('#c8985e')); }
  { const [mx, my] = g.mapa; rect(mx + 2, my + 2, mx + 41, my + 27, hex('#6a4a2a')); rect(mx, my, mx + 39, my + 25, C.k); rect(mx + 1, my + 1, mx + 38, my + 24, hex('#bcd8e8'));
    // las costas: América a la izquierda, África a la derecha, el golfo y Cuba
    for (let y = my + 1; y <= my + 24; y++) { const a = Math.round(mx + 6 + Math.sin((y - my) * 0.35) * 2 + (y - my > 14 ? (y - my - 14) * 0.6 : 0)); rect(mx + 1, y, a, y, hex('#e8dcb4')); const b2 = Math.round(mx + 33 + Math.sin((y - my) * 0.3) * 1.5 - (y - my > 12 ? 3 : 0)); rect(b2, y, mx + 38, y, hex('#e8dcb4')); }
    rect(mx + 7, my + 12, mx + 11, my + 13, hex('#e8dcb4'));
    // los caminos de las tormentas de la temporada, punteados, que se quedaron en tormenta (huecos)
    for (const [ax, ay, bx2, by2] of [[30, 20, 18, 9], [26, 16, 15, 4], [34, 13, 26, 3], [22, 22, 12, 15]]) { linea(mx + ax, my + ay, mx + bx2, my + by2, hex('#3a6ac8'), 2); simbolo(mx + bx2, my + by2, hex('#3a8ad8'), false, hex('#1e3a6a')); }
    disco(mx + 20, my, 2, C.k); disco(mx + 20, my, 1, C.rojo); }
  for (const [nx, ny, c, k] of lado === 'izq' ? [[276, 60, '#f4e07a', 0], [252, 92, '#f0a8c0', 1], [232, 96, '#a8e0c0', 2]] : [[66, 40, '#f4e07a', 0], [24, 74, '#f0a8c0', 1], [42, 84, '#a8e0c0', 2]]) {
    rect(nx, ny, nx + 15, ny + 15, C.k); rect(nx + 1, ny + 1, nx + 14, ny + 14, hex(c)); rect(nx + 1, ny + 12, nx + 14, ny + 14, mezcla(hex(c), C.k, 0.12));
    for (let j = 0; j < 3; j++) rect(nx + 3, ny + 4 + j * 3, nx + 3 + 6 + ((k + j) % 3) * 2, ny + 4 + j * 3, hex('#5a5a6a'));
    disco(nx + 8, ny + 1, 1, [C.rojo, C.azulL, C.verdeL][k]); }
  // el reloj de pared: esfera, marcas y el aro
  { const [rx, ry] = g.reloj; disco(rx + 1, ry + 1, 10, hex('#6a7280')); disco(rx, ry, 10, C.k); disco(rx, ry, 9, hex('#2a3448')); disco(rx, ry, 8, C.blanco);
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(rx + Math.cos(a) * 7), Math.round(ry + Math.sin(a) * 7), k % 3 ? C.grisL : C.k); } }
  // la mesa: el tablero con la luz y la veta, el canto de delante
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) {
    const veta = Math.sin(x * 0.045 + Math.sin(y * 0.3 + x * 0.01) * 2 + y * 0.9) > 0.86;
    let c = y < 158 ? (y === 152 ? hex('#d8a874') : veta ? hex('#a87648') : hex('#c08c58')) : y === 158 ? C.k : (veta ? hex('#6a4426') : hex('#835530'));
    if (y > 158 && bay(x, y) < (y - 158) / 40) c = mezcla(c, C.k, 0.25);
    pset(x, y, c);
  }
  // la sombra del calendario en la pared
  { const { x, y, w, h } = OF_CAL; for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (bay(x + 3 + i, y + 3 + j) < 0.6) pset(x + 3 + i, y + 3 + j, mezcla(R.pget(x + 3 + i, y + 3 + j), hex('#3a4252'), 0.45)); }
  rect(158, 18, 161, 21, C.k); pset(159, 19, C.metalL);   // el clavo
  if (lado === 'izq') { R.disco(52, 26, 11, C.k); R.disco(52, 26, 10, hex('#c8a040')); T.h_logoNoaa(R, 52, 26, 8); }   // el logotipo de la NOAA en su placa
  R.usar(prev); OF[lado] = b; return b;
};
// la ventana viva, recortada a su hueco: el cielo tramado, nubes que pasan, los edificios de Miami, la palmera que se
// mece, un pelícano y la persiana con su cordón
const ofVentana = (t, g, lado) => {
  const [x0, y0, x1, y1] = g.ven, { pset } = R, dentro = (x, y) => x >= x0 && x <= x1 && y >= y0 && y <= y1;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = (y - y0) / (y1 - y0) * 2.6 + (bay(x, y) - 0.5) * 0.9; pset(x, y, v < 0.8 ? hex('#4a9ae0') : v < 1.6 ? hex('#6ab4ec') : v < 2.3 ? hex('#94cef4') : hex('#c4e4f6')); }
  // nubes de tres tonos que pasan despacio
  for (let k = 0; k < 3; k++) { const w = 16 + k * 5, cx = x0 + ((k * 37 + t * (2.2 + k * 0.8)) % (x1 - x0 + w * 2)) - w, cy = y0 + 18 + k * 13;
    for (const [dx, dy, r] of [[0, 0, w * 0.3], [-w * 0.3, 2, w * 0.22], [w * 0.3, 2, w * 0.24], [-w * 0.05, -3, w * 0.22]]) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) {
      if (i * i + j * j > r * r) continue; const X = Math.round(cx + dx + i), Y = Math.round(cy + dy + j); if (!dentro(X, Y)) continue; pset(X, Y, j > r * 0.45 ? hex('#c8d4e2') : j < -r * 0.3 ? C.blanco : hex('#eef2f6')); } }
  // los edificios del centro de Miami, azulados por la distancia, con ventanas
  for (let k = 0; k < 7; k++) { const bw = 7 + (k * 5) % 6, bx = x0 + 2 + k * 10, bh = 12 + ((k * 13) % 17); for (let y = y1 - bh; y <= y1; y++) for (let x = bx; x < bx + bw; x++) { if (!dentro(x, y)) continue; pset(x, y, (x - bx) % 3 === 1 && (y - y1 + bh) % 3 === 1 ? hex('#c8dcec') : x === bx ? hex('#9ab4cc') : hex('#86a2bc')); } }
  // la palmera: el tronco curvo y las hojas que se mecen
  { const px = lado === 'izq' ? x1 - 12 : x0 + 12, base = y1, top = y0 + 24, m = Math.sin(t * 1.3) * 2;
    for (let y = base; y >= top; y--) { const u = (base - y) / (base - top), x = Math.round(px + Math.sin(u * 1.6) * 4 + m * u * u); if (dentro(x, y)) { pset(x, y, hex('#7a5a3a')); if (dentro(x + 1, y)) pset(x + 1, y, (y % 3) ? hex('#9a7448') : hex('#5a4028')); } }
    const tx = Math.round(px + Math.sin(1.6) * 4 + m), ty = top;
    for (let k = 0; k < 7; k++) { const a = -Math.PI + k * Math.PI / 6 + Math.sin(t * 1.7 + k) * 0.08, L = 13 + (k % 2) * 3;
      for (let i = 0; i <= L; i++) { const x = Math.round(tx + Math.cos(a) * i), y = Math.round(ty + Math.sin(a) * i * 0.6 + (i * i) * 0.035); if (dentro(x, y)) pset(x, y, i % 3 ? hex('#3a7a3a') : hex('#5aa04a')); if (dentro(x, y + 1) && i > 3) pset(x, y + 1, hex('#2a5a2e')); } }
    if (dentro(tx, ty + 1)) { pset(tx, ty + 1, hex('#7a5a2a')); pset(tx + 1, ty + 2, hex('#7a5a2a')); } }
  // un pelícano que cruza cada 9 s
  { const u = (t % 9) / 4; if (u < 1) { const x = Math.round(x0 - 6 + u * (x1 - x0 + 12)), y = Math.round(y0 + 30 + Math.sin(u * 5) * 2), a = Math.sin(t * 7) > 0;
    for (const [dx, dy, c] of [[0, 0, hex('#8a7a6a')], [1, 0, hex('#8a7a6a')], [2, 0, hex('#e8d8b0')], [3, 1, hex('#e8a83a')], [-1, a ? -2 : 1, hex('#6a5a4a')], [-2, a ? -3 : 1, hex('#6a5a4a')], [0, a ? -2 : 1, hex('#6a5a4a')]]) if (dentro(x + dx, y + dy)) pset(x + dx, y + dy, c); } }
  // el reflejo del cristal, dos rayas tramadas
  for (let k = 0; k < 2; k++) for (let i = 0; i < 40; i++) { const x = x0 + 8 + k * 26 + i, y = y0 + 40 - i; if (dentro(x, y) && bay(x, y) < 0.3) pset(x, y, mezcla(R.pget(x, y), C.blanco, 0.45)); }
  // la persiana subida (lamas arriba) y el cordón que se balancea
  for (let y = y0; y < y0 + 12; y++) for (let x = x0; x <= x1; x++) pset(x, y, (y - y0) % 3 === 2 ? hex('#a8aeb6') : (y - y0) % 3 === 0 ? hex('#f2f4f6') : hex('#dde0e4'));
  R.rect(x0, y0 + 12, x1, y0 + 12, hex('#8a909a'));
  { const cx = lado === 'izq' ? x1 - 4 : x0 + 4, s = Math.sin(t * 1.1) * 1.5; for (let j = 0; j < 22; j++) pset(Math.round(cx + s * j / 22), y0 + 12 + j, hex('#e8e8ee')); R.rect(Math.round(cx + s) - 1, y0 + 34, Math.round(cx + s) + 1, y0 + 36, hex('#c8ccd4')); }
  R.rect(Math.round((x0 + x1) / 2), y0, Math.round((x0 + x1) / 2) + 1, y1, hex('#c8ccd2'));   // el parteluz
};
// la foto de cada mes (la parte de arriba de la hoja), viva: m = el mes; x, y, w, h, el hueco
const ofFoto = (m, x, y, w, h, t) => {
  const { rect, pset, disco } = R, x1 = x + w - 1, y1 = y + h - 1, cielo = (c0, c1, c2, hz) => { for (let j = y; j <= y1; j++) for (let i = x; i <= x1; i++) { const v = (j - y) / hz * 2 + (bay(i, j) - 0.5) * 0.8; pset(i, j, v < 0.7 ? hex(c0) : v < 1.4 ? hex(c1) : hex(c2)); } };
  const bien = (i, j) => i >= x && i <= x1 && j >= y && j <= y1;
  if (m === 6) {   // junio: la playa, con el sol, la sombrilla y un velero
    cielo('#4aa0e8', '#7cc0f0', '#b4dcf6', h * 0.55); disco(x + w - 16, y + 10, 6, hex('#fff0a0')); disco(x + w - 16, y + 10, 4, hex('#fff8d8'));
    rect(x, y + 26, x1, y + 33, hex('#2a9ab8')); rect(x, y + 34, x1, y + 37, hex('#5ad0c8')); for (let i = x; i <= x1; i++) if (Math.sin(i * 0.5 - t * 3) > 0.6) pset(i, y + 34, C.blanco);
    rect(x, y + 38, x1, y1, hex('#f0dcaa')); for (let k = 0; k < 14; k++) pset(x + (k * 23) % w, y + 40 + (k * 7) % (h - 41), hex('#d8c08a'));
    const vx = Math.round(x + ((t * 4) % (w + 10)) - 5); for (let j = 0; j < 6; j++) for (let i = 0; i <= j; i++) if (bien(vx + i, y + 20 + j)) pset(vx + i, y + 20 + j, C.blanco); if (bien(vx, y + 26)) rect(Math.max(x, vx - 2), y + 26, Math.min(x1, vx + 6), y + 26, hex('#c83a3a'));
    const sx = x + 22; rect(sx, y + 22, sx, y + 42, hex('#5a4a3a')); for (let i = -9; i <= 9; i++) { const jj = Math.round(Math.abs(i) * 0.45); rect(sx + i, y + 18 + jj, sx + i, y + 22, (Math.floor((i + 9) / 3) % 2) ? C.blanco : hex('#d83a3a')); }
    rect(sx + 6, y + 41, sx + 18, y + 43, hex('#3a8ad8'));
  } else if (m === 7) {   // julio: los fuegos artificiales sobre la ciudad
    cielo('#141c40', '#1e2a58', '#2c3a6e', h * 0.9); for (let k = 0; k < 16; k++) if (Math.sin(t * 2 + k) > 0) pset(x + (k * 29) % w, y + (k * 11) % (h - 14), C.blanco);
    for (let k = 0; k < 3; k++) { const u = ((t * 0.7 + k * 0.34) % 1), bx = x + 16 + k * 30, by = y + 12 + (k % 2) * 6, r = 2 + u * 11, col = [hex('#f04a5a'), hex('#f0d040'), hex('#5ad0f0')][k];
      if (u < 0.85) for (let a = 0; a < 12; a++) { const g = a * Math.PI / 6, px = Math.round(bx + Math.cos(g) * r), py = Math.round(by + Math.sin(g) * r + u * u * 4); if (bien(px, py)) pset(px, py, u > 0.6 && a % 2 ? hex('#8a6a5a') : col); } }
    for (let k = 0; k < 9; k++) { const bw = 8 + (k * 3) % 5, bx = x + k * 11, bh = 6 + (k * 7) % 9; rect(bx, y1 - bh, Math.min(x1, bx + bw), y1, hex('#0e1430')); for (let j = y1 - bh + 2; j < y1; j += 3) for (let i = bx + 2; i < Math.min(x1, bx + bw); i += 3) if (hh(i, j, 811) < 0.5) pset(i, j, hex('#f0d080')); }
  } else if (m === 8) {   // agosto: la sandía sobre el mantel de cuadros
    for (let j = y; j <= y1; j++) for (let i = x; i <= x1; i++) pset(i, j, ((Math.floor((i - x) / 6) + Math.floor((j - y) / 6)) % 2) ? hex('#e84a4a') : hex('#f6eee8'));
    const cx = x + 40, cy = y + 34; for (let j = -22; j <= 0; j++) for (let i = -30; i <= 30; i++) { const d = Math.hypot(i / 30, j / 22); if (d > 1) continue; pset(cx + i, cy + j, d > 0.9 ? hex('#2a7a3a') : d > 0.82 ? hex('#a8d88a') : hex('#e83a4a')); }
    rect(cx - 30, cy, cx + 30, cy + 1, hex('#1e5a2a')); for (let k = 0; k < 9; k++) { const a = Math.PI + 0.3 + k * 0.3, r = 8 + (k % 3) * 5; pset(Math.round(cx + Math.cos(a) * r * 1.3), Math.round(cy + Math.sin(a) * r * 0.9), hex('#2a1a1a')); }
    rect(x + 76, y + 14, x + 86, y + 36, C.k); rect(x + 77, y + 15, x + 85, y + 35, hex('#f6e88a')); rect(x + 77, y + 15, x + 85, y + 18, hex('#fff8d0')); pset(x + 80, y + 25 + Math.round(Math.sin(t * 3)), C.blanco); rect(x + 84, y + 8, x + 85, y + 15, hex('#e84a8a'));
  } else if (m === 9) {   // septiembre: el autobús escolar amarillo por la carretera
    cielo('#5aa8e8', '#8ac6f0', '#bce0f6', h * 0.6); for (let k = 0; k < 5; k++) { const tx = x + 6 + k * 20; disco(tx, y + 24, 6, hex('#3a7a3a')); disco(tx - 2, y + 22, 3, hex('#5a9a4a')); rect(tx, y + 28, tx, y + 33, hex('#5a3a2a')); }
    rect(x, y + 33, x1, y1, hex('#5a5a66')); rect(x, y + 33, x1, y + 33, hex('#8a8a96')); for (let i = x; i <= x1; i += 8) rect(i, y + 40, i + 3, y + 40, hex('#f0e070'));
    const bx = Math.round(x + 18 + Math.sin(t * 0.8) * 3); rect(bx, y + 18, bx + 52, y + 36, C.k); rect(bx + 1, y + 19, bx + 51, y + 35, hex('#f0b81c')); rect(bx + 1, y + 28, bx + 51, y + 28, C.k); rect(bx + 1, y + 31, bx + 51, y + 31, C.k);
    for (let k = 0; k < 7; k++) rect(bx + 3 + k * 6, y + 21, bx + 7 + k * 6, y + 26, hex('#a8d8f0')); rect(bx + 46, y + 22, bx + 51, y + 27, hex('#a8d8f0'));
    for (const wx of [bx + 10, bx + 42]) { disco(wx, y + 37, 4, C.k); disco(wx, y + 37, 2, hex('#8a8a96')); }
  } else if (m === 10) {   // octubre: la calabaza tallada sobre la paja, con hojas
    cielo('#e8804a', '#f0a05a', '#f8c87a', h * 0.8); for (let k = 0; k < 2; k++) { const u = (t * 0.25 + k * 0.5) % 1, bx = Math.round(x + 10 + u * (w - 20)), by = y + 8 + k * 6, a = Math.sin(t * 9 + k) > 0; pset(bx, by, C.k); pset(bx - 1, by - (a ? 1 : 0), C.k); pset(bx + 1, by - (a ? 1 : 0), C.k); pset(bx - 2, by - (a ? 2 : -1), C.k); pset(bx + 2, by - (a ? 2 : -1), C.k); }
    rect(x, y + 34, x1, y1, hex('#d8b45a')); for (let k = 0; k < 30; k++) pset(x + (k * 17) % w, y + 35 + (k * 5) % (h - 36), hex('#a8843a'));
    const cx = x + 48, cy = y + 30; for (let j = -10; j <= 10; j++) for (let i = -15; i <= 15; i++) { if ((i / 15) ** 2 + (j / 10) ** 2 > 1) continue; pset(cx + i, cy + j, Math.abs(i) % 6 < 1 ? hex('#b85a1a') : hex('#e8802a')); }
    rect(cx - 1, cy - 14, cx + 1, cy - 10, hex('#5a7a2a')); const l = Math.sin(t * 8) > -0.3 ? hex('#fff070') : hex('#f0c040');
    for (const [i, j] of [[-6, -3], [-5, -3], [6, -3], [5, -3], [0, 0], [-7, 4], [-4, 5], [-1, 4], [2, 5], [5, 4], [7, 3]]) pset(cx + i, cy + j, l);
  } else {   // noviembre: el árbol de otoño con las hojas que caen
    cielo('#8ab0d8', '#b0c8e0', '#d8e0e8', h * 0.7); rect(x, y + 38, x1, y1, hex('#c8a060')); rect(x + 44, y + 16, x + 47, y + 38, hex('#5a3a24'));
    for (let k = 0; k < 26; k++) { const a = hh(k, 1, 812) * 6.28, r = hh(k, 2, 812) * 15; disco(Math.round(x + 46 + Math.cos(a) * r * 1.4), Math.round(y + 14 + Math.sin(a) * r * 0.7), 3, [hex('#e8803a'), hex('#c83a2a'), hex('#e8b83a')][k % 3]); }
    for (let k = 0; k < 6; k++) { const u = (t * 0.3 + k / 6) % 1, lx = Math.round(x + 30 + k * 7 + Math.sin(t * 2 + k) * 4 + u * 12), ly = Math.round(y + 20 + u * 22); if (bien(lx, ly)) { pset(lx, ly, [hex('#e8803a'), hex('#c83a2a')][k % 2]); if (bien(lx + 1, ly)) pset(lx + 1, ly, hex('#e8b83a')); } }
  }
};
// una hoja del calendario (el mes m de 2026) en OF_CAL: la foto, la cabecera y la cuadrícula. o.marcas: [[día, tipo,
// aparece], …] (tipo 'ts' tormenta tropical, que se apaga a o.apaga; 'hu' huracán, rojo); o.circulo: [día, 0–1]
const ofHoja = (t, m, o = {}) => {
  const { x, y, w, h } = OF_CAL, { rect, pset } = R;
  rect(x, y, x + w - 1, y + h - 1, C.k); rect(x + 1, y + 1, x + w - 2, y + h - 2, hex('#f6f2e8'));
  for (let j = y + 2; j < y + h - 2; j++) if (bay(x + w - 3, j) < 0.5) pset(x + w - 3, j, hex('#ddd6c6'));
  rect(x + 4, y + 6, x + w - 5, y + 52, C.k); ofFoto(m, x + 5, y + 7, w - 10, 45, t);
  rect(x + 4, y + 54, x + w - 5, y + 69, hex('#1e365c')); rect(x + 4, y + 54, x + w - 5, y + 54, hex('#4a6aa0'));
  R.numero(String(m), x + 9, y + 68, { tam: 16 }); R.numero('2026', x + w - 37, y + 65, { tam: 8 });
  const d0 = new Date(2026, m - 1, 1).getDay(), dias = new Date(2026, m, 0).getDate(), filas = Math.ceil((d0 + dias) / 7), ch = 8, cw = 13, gx = x + 7, gy = y + 73;
  for (let k = 0; k < 7; k++) { R.rect(gx + k * cw + 5, y + 71, gx + k * cw + 7, y + 71, k === 0 ? hex('#c83a3a') : hex('#7a8296')); }
  for (let r = 0; r <= filas; r++) rect(gx, gy + r * ch, gx + 7 * cw, gy + r * ch, hex('#c8c0b0'));
  for (let c = 0; c <= 7; c++) rect(gx + c * cw, gy, gx + c * cw, gy + filas * ch, hex('#c8c0b0'));
  const celda = (d) => { const i = d0 + d - 1; return [gx + (i % 7) * cw, gy + Math.floor(i / 7) * ch]; };
  for (let d = 1; d <= dias; d++) { const [cx, cy] = celda(d), dom = (d0 + d - 1) % 7 === 0; if (dom) rect(cx + 1, cy + 1, cx + cw - 1, cy + ch - 1, hex('#f2e6dc')); cifras(d, cx + 2, cy + 2, dom ? hex('#b83a3a') : hex('#4a4a5a')); }
  for (const [d, tipo, ap] of o.marcas ?? []) { if (t < ap) continue; const [cx, cy] = celda(d), u = lin(t, ap, ap + 0.18), sx = cx + 9, sy = cy + ch - 4;
    if (tipo === 'hu') simbolo(sx, sy, hex('#e03a3a'), true);
    else { const apaga = lin(t, o.apaga ?? 99, (o.apaga ?? 99) + 0.6); if (u < 1 && Math.floor(t * 20) % 2) continue; simbolo(sx, sy, apaga > 0 ? mezcla(hex('#3a8ad8'), hex('#b8bcc8'), apaga) : hex('#3a8ad8'), false, apaga > 0.7 ? hex('#8a8e9a') : hex('#1e3a6a')); } }
  if (o.circulo) { const [d, u] = o.circulo, [cx, cy] = celda(d), mx = cx + cw / 2, my = cy + ch / 2, n = Math.round(48 * u);
    for (let k = 0; k <= n; k++) { const a = -Math.PI / 2 + k / 48 * Math.PI * 2.15, px = Math.round(mx + Math.cos(a) * 9), py = Math.round(my + Math.sin(a) * 7); pset(px, py, hex('#d8202a')); pset(px + 1, py, hex('#d8202a')); } }
  // el centro de la celda de un día, para las manos
  return { centro: (d) => { const [cx, cy] = celda(d); return [cx + cw / 2, cy + ch / 2]; } };
};
const OF_TMP = R.nuevo();
// el calendario entero: la hoja del mes m y, si pasa (0–1), la del mes anterior levantándose por abajo; las anillas
const ofCalendario = (t, m, o = {}) => {
  const { x, y, w, h } = OF_CAL, res = ofHoja(t, m, o);
  let corte = null;
  if (o.vieja != null && o.pasa > 0 && o.pasa < 1) {
    const prev = R.usar(OF_TMP); ofHoja(t, o.vieja, o.marcasVieja ?? {}); R.usar(prev);
    corte = Math.round(y + 6 + (h - 6) * (1 - o.pasa)); const D = R.buf;
    for (let j = y; j < corte; j++) for (let i = x; i < x + w; i++) D[j * 320 + i] = OF_TMP[j * 320 + i];
    // la sombra que hace la hoja levantada y su borde, que se curva
    for (let i = x; i < x + w; i++) { R.pset(i, corte, hex('#e4ddd0')); R.pset(i, corte + 1, mezcla(R.pget(i, corte + 1), C.k, 0.35)); if (bay(i, corte + 2) < 0.5) R.pset(i, corte + 2, mezcla(R.pget(i, corte + 2), C.k, 0.25)); }
    R.poligono([[x + w - 1, corte], [x + w - 12, corte], [x + w - 1, corte - 8]], hex('#d8d0c0')); R.linea(x + w - 12, corte, x + w - 1, corte - 8, hex('#a8a090'));
  }
  // las anillas de alambre
  for (let k = 0; k < 12; k++) { const ax = x + 6 + k * 8.4; R.rect(Math.round(ax), y - 3, Math.round(ax) + 1, y + 3, C.k); R.pset(Math.round(ax), y - 2, C.metalL); R.pset(Math.round(ax), y + 4, hex('#3a3a46')); }
  return { ...res, corte };
};
// todo el inserto: o.lado, o.mes, o.vieja / o.pasa (la hoja que se levanta), o.marcas, o.apaga, o.circulo, o.recuento
// (0–1: la tarjeta del recuento late), o.cuenta (los huracanes de la temporada: «0» antes de Isaías, «1» después), o.dia (el reloj, en minutos)
const oficina = (t, o = {}) => {
  const lado = o.lado ?? 'izq', g = ofGeo(lado);
  R.copiar(ofFijo(lado));
  ofVentana(t, g, lado);
  const cal = ofCalendario(t, o.mes, o);
  // la tarjeta del recuento de huracanes de la temporada: el símbolo rojo y un «0» grande
  { const [tx, ty] = g.tarjeta, p = o.recuento ?? 0, s = p > 0 && p < 1 ? Math.round(Math.sin(p * Math.PI) * 2) : 0;
    R.rect(tx - s, ty - s, tx + 21 + s, ty + 30 + s, C.k); R.rect(tx + 1 - s, ty + 1 - s, tx + 20 + s, ty + 29 + s, C.blanco); R.rect(tx + 1 - s, ty + 1 - s, tx + 20 + s, ty + 4, hex('#e03a3a'));
    simbolo(tx + 11, ty + 11, hex('#e03a3a'), true); R.numero(o.cuenta ?? '0', tx + 11, ty + 29, { tam: 8, centro: true, color: p > 0 && Math.floor(p * 8) % 2 ? hex('#e03a3a') : C.k, sombra: false });
    R.disco(tx + 11, ty, 2, C.k); R.disco(tx + 11, ty, 1, C.azulL); }
  // el reloj: las agujas y el segundero que salta
  { const [rx, ry] = g.reloj, min = o.dia ?? 10 * 60 + 12, ag = (a, l, c) => R.linea(rx, ry, Math.round(rx + Math.sin(a) * l), Math.round(ry - Math.cos(a) * l), c);
    ag((min / 60) * Math.PI / 6, 4, C.k); ag((min % 60) / 30 * Math.PI, 6, C.k); ag(Math.floor(t) * Math.PI / 30, 7, C.rojo); R.pset(rx, ry, C.rojo); }
  // en la mesa: papeles, el bote de lápices, la taza que humea, la planta y el ventilador que gira y oscila
  { const [p0, p1] = g.papeles; for (let k = 0; k < 3; k++) { R.rect(p0 + k * 2, 146 - k * 2, p1 + k, 153 - k * 2, C.k); R.rect(p0 + 1 + k * 2, 147 - k * 2, p1 - 1 + k, 152 - k * 2, k === 2 ? hex('#f6f6f0') : hex('#e0ddd2')); }
    for (let j = 0; j < 3; j++) R.rect(p0 + 7, 143 + j * 2, p1 - 6, 143 + j * 2, hex('#8a8a9a'));
    const lx = g.lapices; R.rect(lx, 140, lx + 7, 153, C.k); R.rect(lx + 1, 141, lx + 6, 152, hex('#3a5a8a')); for (const [dx, c] of [[1, '#e8c040'], [3, '#d83a3a'], [5, '#3a3a46']]) { R.rect(lx + dx, 133 + dx, lx + dx, 140, hex(c)); }
    { const qx = g.tazaX; R.rect(qx, 142, qx + 7, 152, C.k); R.rect(qx + 1, 143, qx + 6, 151, hex('#f2f0ea')); R.rect(qx + 1, 146, qx + 6, 147, hex('#2a4a7a')); R.rect(qx + 1, 143, qx + 6, 143, hex('#5a3418')); R.rect(qx + 8, 145, qx + 9, 149, C.k); R.pset(qx + 7, 145, C.k); R.pset(qx + 7, 149, C.k);
      for (let k = 0; k < 3; k++) { const u = (t * 0.7 + k * 0.33) % 1; R.pset(Math.round(qx + 2 + k + Math.sin(u * 6 + k) * 1.5), Math.round(140 - u * 12), u < 0.5 ? hex('#ffffff') : hex('#d0d6dc')); } }
    const [pl, pb] = g.planta; R.rect(pl - 7, pb - 9, pl + 7, pb + 2, C.k); R.rect(pl - 6, pb - 8, pl + 6, pb + 1, hex('#c86a3a'));
    for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.36 + Math.sin(t * 3.1 + k) * 0.09 * (lado === 'izq' ? -1 : 1), L = 12 + (k % 3) * 4; for (let i = 0; i <= L; i++) R.pset(Math.round(pl + Math.cos(a) * i), Math.round(pb - 9 + Math.sin(a) * i), i < L - 2 ? hex('#3a8a4a') : hex('#6ab85a')); }
    const [fx, fb] = g.ventilador, osc = Math.sin(t * 0.6) * 0.5, cx = fx, cy = fb - 22;
    R.rect(fx - 8, fb - 3, fx + 8, fb + 1, C.k); R.rect(fx - 7, fb - 2, fx + 7, fb, hex('#e8e8ec')); R.rect(fx - 1, fb - 12, fx + 1, fb - 3, hex('#c8ccd4'));
    R.disco(cx, cy, 11, C.k); R.disco(cx, cy, 10, hex('#5a6270'));
    for (let k = 0; k < 4; k++) { const a = t * 18 + k * Math.PI / 2; R.poligono([[cx, cy], [Math.round(cx + Math.cos(a) * 9 * (1 - Math.abs(osc) * 0.3)), Math.round(cy + Math.sin(a) * 9)], [Math.round(cx + Math.cos(a + 0.6) * 9 * (1 - Math.abs(osc) * 0.3)), Math.round(cy + Math.sin(a + 0.6) * 9)]], hex('#a8c8e8')); }
    for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; R.linea(cx, cy, Math.round(cx + Math.cos(a) * 10), Math.round(cy + Math.sin(a) * 10), (k % 2) ? hex('#d8dce4') : null); }
    R.disco(cx, cy, 2, C.k); R.pset(cx, cy, C.metalL); for (let a = 0; a < 6.28; a += 0.1) R.pset(Math.round(cx + Math.cos(a) * 10), Math.round(cy + Math.sin(a) * 10), hex('#e8ecf0')); }
  return cal;
};
'''

E = {}

# ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-silencio'] = ('El año del silencio', '''// HU-SILENCIO (frases 26–27), 2026, cartela «2026». Cinco planos:
// 1. la NC-12 de los Outer Banks un día de verano: un vecino lleva un tablero de contrachapado al montón que tiene
//    preparado por si llega un huracán, lo deja, mira el cielo limpio y en «strangest seasons» le sale un «?»; en «on
//    record» se encoge de hombros; una vecina corre por el arcén, pasan coches, vuela una cometa y cruzan gaviotas; corta
//    en «because»;
// 2. la Tierra desde el espacio, girando del Pacífico al Atlántico: en «El Niño» nace junto a Perú la lengua de agua
//    caliente que se estira hacia el oeste por el ecuador (en rojo) y sube el termómetro («warmed the Pacific»); en
//    «changes the winds» salen las flechas de los vientos de altura, que cruzan Centroamérica y el Caribe hasta el
//    Atlántico («high above the Atlantic»); corta en «Those»;
// 3. la playa de Destin: la pronosticadora suelta un globo sonda («Those winds»); abajo el viento lo lleva despacio a la
//    izquierda y, cuando llega arriba («up high»), lo arrastra deprisa a la derecha («blow differently»); el compañero
//    mira la tableta, se sorprende, y ella señala el viento de abajo («near the sea»); corta en «and they tilt»;
// 4. la tormenta joven en el mar: el viento de arriba le tuerce la cima («tilt»), se la arranca en jirones («tear
//    apart») y la deja en cúmulos rotos («young storms»); en «build their engine» le salen tres piezas de motor que el
//    viento se lleva y caen al mar con un chof (gag); desde la lancha, el pronosticador la señala y la tripulante se ríe;
// 5. la oficina del centro, el calendario de pared: la mano arranca junio, julio y agosto («for months»); en cada hoja
//    salen tormentas tropicales que se apagan sin hacerse huracán («never became hurricanes»); la mano da un golpecito a
//    la tarjeta del recuento de huracanes, que marca «0».''', COMUNES + OFICINA + r'''
const n = (f) => en('nino', f), z = (f) => en('cizalla', f);
const P2 = n(0.452), P3 = n(0.985), P4 = z(0.287), P5 = z(0.624);
// las palabras (fracciones sacadas de linea.json)
const raro = n(0.281), record = n(0.378), nino = n(0.521), calienta = n(0.600), pacifico = n(0.642), cambia = n(0.746), alto = n(0.853), atlantico = n(0.891);
const esos = z(0.0), arriba = z(0.045), distinto = z(0.109), cerca = z(0.203), tuercen = z(0.314), rompen = z(0.365), jovenes = z(0.41), motor = z(0.533);
const meses = z(0.637), atl = z(0.707), nunca = z(0.845), huracanes = z(0.896);

// ── 1 · la NC-12 en verano: el vecino y sus tableros de contrachapado ──────────────────────────────────────────
// un tablero de contrachapado de pie (x: el borde izquierdo, y: el suelo), con la veta y dos nudos
const tablero = (x, y, k = 0, inclina = 0) => { for (let j = 0; j <= 15; j++) { const dx = Math.round(inclina * (15 - j) / 15); R.rect(x + dx, y - j, x + dx + 9, y - j, j === 0 || j === 15 ? C.k : hex('#d8b47a')); R.pset(x + dx, y - j, C.k); R.pset(x + dx + 9, y - j, C.k); if (j % 4 === (k % 2) + 1) R.rect(x + dx + 2, y - j, x + dx + 7, y - j, hex('#b8925a')); }
  R.pset(x + 3 + Math.round(inclina * 0.5), y - 8, hex('#8a6a3a')); R.pset(x + 6 + Math.round(inclina * 0.2), y - 4, hex('#8a6a3a')); };
const deja = 3.9, vecinoX = (t) => Math.round(lerp(108, 178, lin(t, 1.5, deja - 0.25)));
const p1 = (t) => {
  T.carreteraOuterBanks(R, t, { cielo: 'claro' });
  // el montón de tableros preparado junto al buzón
  tablero(196, 156, 0, 3); tablero(200, 156, 1, 3); if (t > deja) tablero(204, 156, 2, 3);
  // una vecina corre por el arcén hacia la izquierda
  { const u = lin(t, 1.4, 5.4), x = Math.round(lerp(300, 30, u)); if (u > 0 && u < 1) R.actor(EL.chica, x, 152, t, { dir: -1, anda: true, sonrisa: true }); }
  // el vecino lleva su tablero, lo deja, mira el cielo, se extraña y se encoge de hombros
  const x = vecinoX(t), anda = t > 1.5 && t < deja - 0.25, mira = t > 4.3;
  const r = R.actor(EL.sudadera, x, 155, t, { dir: mira ? -1 : 1, anda, brazos: entre(t, record - 0.1, record + 0.7), sorpresa: entre(t, raro - 0.15, raro + 0.5), habla: entre(t, raro + 0.6, record - 0.2) && Math.sin(t * 9) > 0 });
  if (t < deja) tablero(x + 11, 152, 2, 0);
  if (entre(t, raro - 0.05, record + 0.9)) R.bocadillo(x + 8, 155 - 30, { icono: '?' });
  // una cometa que vuela sobre la playa, detrás de la duna, con su cola que ondea
  { const kx = 150 + Math.round(Math.sin(t * 0.9) * 5), ky = 38 + Math.round(Math.sin(t * 1.3) * 3); R.linea(kx, ky + 5, 128, 98, hex('#e8e8ee'), 2);
    R.poligono([[kx, ky - 6], [kx + 5, ky], [kx, ky + 6], [kx - 5, ky]], C.k); R.poligono([[kx, ky - 5], [kx + 4, ky], [kx, ky + 5], [kx - 4, ky]], hex('#e83a4a')); R.poligono([[kx, ky - 5], [kx + 4, ky], [kx, ky]], hex('#f0c040')); R.linea(kx, ky - 5, kx, ky + 5, C.k);
    for (let i = 0; i < 12; i++) R.pset(kx + Math.round(Math.sin(t * 6 + i * 0.7) * 2), ky + 6 + i, i % 4 < 2 ? hex('#3a8ad8') : hex('#f0c040')); }
  // gaviotas que cruzan alto
  for (let k = 0; k < 2; k++) { const gx = Math.round(((k * 160 + t * (9 + k * 4)) % 380) - 30), gy = 30 + k * 14 + Math.round(Math.sin(t + k) * 2); if (gx > 0 && gx < 270) R.gaviota(gx, gy, t, k); }
  T.i_carreteraDelante(R, t, { cielo: 'claro' });
};

// ── 2 · la Tierra: El Niño calienta el Pacífico y cambian los vientos de altura sobre el Atlántico ──────────────
const ROJO3 = hex('#b81e2a'), ROJO2 = hex('#e0402a'), NAR = hex('#f07a32'), NARL = hex('#f6b05a');
const lengua = (P, t, g) => {
  const lonW = -80 - 102 * g;
  for (let lat = -10; lat <= 8; lat += 0.4) for (let lon = -80.5; lon >= -183; lon -= 0.4) {
    if (lon < lonW) break;
    const base = lon > -98 ? 0.72 + (lon + 98) * -0.004 : lon > -132 ? 1 : 1 - (-132 - lon) / 52 * 0.5;
    const w = 2.8 + 4.2 * Math.exp(-(((lon + 112) / 24) ** 2)), borde = Math.min(1, (lon - lonW) / 14);
    const I = base * borde * Math.exp(-(((lat + 1) / w) ** 2)) * (0.9 + 0.1 * Math.sin(t * 2.4 + lon * 0.21 + lat * 0.8));
    if (I < 0.16) continue;
    const [x, y, vis] = P([lat, lon]); if (!vis) continue;
    const c = R.pget(x, y); if (!esMar(c)) continue;
    const v = I + (bay(x, y) - 0.5) * 0.2;
    R.pset(x, y, v > 0.8 ? ROJO3 : v > 0.58 ? ROJO2 : v > 0.38 ? NAR : mezcla(c, NARL, 0.7));
  }
  // el calor que sube del agua: «^» naranjas que suben y se apagan
  for (let k = 0; k < 9; k++) { const u = (t * 0.7 + k * 0.37) % 1, lon = -88 - hh(k, 3, 821) * 70 * g, lat = -2 + hh(k, 4, 821) * 4; if (lon < lonW + 6) continue;
    const [x, y, vis] = P([lat, lon]); if (!vis) continue; const yy = Math.round(y - 2 - u * 7), c = u < 0.6 ? hex('#ffd070') : NAR; R.pset(x, yy, c); R.pset(x - 1, yy + 1, c); R.pset(x + 1, yy + 1, c); }
};
// el termómetro que sube junto al planeta (u 0–1)
const termometro = (x, y, t, u) => {
  R.rect(x - 3, y - 1, x + 3, y + 44, C.k); R.rect(x - 2, y, x + 2, y + 43, hex('#e8eef4')); R.disco(x, y + 48, 6, C.k); R.disco(x, y + 48, 5, ROJO2); R.pset(x - 2, y + 46, hex('#f8a0a0'));
  const alto = Math.round(8 + 32 * u); R.rect(x - 1, y + 44 - alto, x + 1, y + 44, ROJO2); R.rect(x - 1, y + 44 - alto, x - 1, y + 44, hex('#f07070'));
  for (let k = 0; k < 9; k++) R.rect(x + 3, y + 4 + k * 5, x + (k % 2 ? 4 : 6), y + 4 + k * 5, C.k);
  R.pset(x - 2, y + 4, C.blanco); R.pset(x - 2, y + 5, C.blanco);
  if (u > 0.05 && u < 1) for (let k = 0; k < 3; k++) { const a = t * 6 + k * 2.1; R.pset(Math.round(x + Math.cos(a) * 8), Math.round(y + 44 - alto + Math.sin(a) * 3), hex('#ffd070')); }
  if (u >= 1) { const b = Math.sin(t * 6) > 0; for (const [dx, dy] of [[0, -6], [-1, -5], [1, -5], [0, -4], [0, -3]]) R.pset(x + 12 + dx, y + 8 + dy + (b ? 1 : 0), ROJO2); R.rect(x + 12, y + 6 + (b ? 1 : 0), x + 12, y + 12 + (b ? 1 : 0), ROJO2); }
};
// los vientos de altura: tres corrientes de trazos blancos con su punta que cruzan de Centroamérica al Atlántico
const corriente = (d) => [[9 + d, -116], [12 + d, -103], [15 + d, -90], [17 + d, -77], [18.5 + d, -63], [19.5 + d, -49], [20.5 + d, -35], [21.5 + d, -24]];
const vientosAltos = (P, t, w, fuerte) => {
  const borde = hex('#1e3a6a'), sombra = hex('#0a1430');
  for (const [k, d] of [[0, -3.5], [1, 3.5]]) {
    const L = corriente(d), pts = [];
    for (let i = 1; i < L.length; i++) for (let s2 = 0; s2 < 1; s2 += 0.05) { const lat = lerp(L[i - 1][0], L[i][0], s2), lon = lerp(L[i - 1][1], L[i][1], s2), [x, y, v] = P([lat, lon]); pts.push([x, y, v]); }
    const n = Math.floor(pts.length * Math.min(1, w * 1.12 - k * 0.1)), vel = 16 + fuerte * 18; if (n < 6) continue;
    // la cinta ancha que corre, con su sombra (va por encima de las nubes), el borde oscuro y franjas claras que avanzan
    for (const capa of [0, 1, 2]) for (let i = 2; i < n; i++) {
      const [x, y, v] = pts[i]; if (!v) continue; const [px, py] = pts[i - 2], a = Math.atan2(y - py, x - px), nx = -Math.sin(a), ny = Math.cos(a);
      const hw = (1.4 + fuerte * 0.7) * Math.min(1, i / 14);
      for (let o = -hw - 1; o <= hw + 1; o += 0.5) { const X = Math.round(x + nx * o), Y = Math.round(y + ny * o);
        if (capa === 0) { if (bay(X, Y) < 0.6) R.pset(X + 1, Y + 3, mezcla(R.pget(X + 1, Y + 3), sombra, 0.5)); }
        else if (capa === 1) { if (Math.abs(o) > hw) R.pset(X, Y, borde); }
        else if (Math.abs(o) <= hw) R.pset(X, Y, ((i * 0.8 - t * vel + k * 5) % 9 + 9) % 9 < 2.5 ? hex('#ffffff') : hex('#cfe6fb')); }
    }
    // la punta de flecha
    const [hx, hy] = pts[n - 1], [qx, qy] = pts[n - 4], a = Math.atan2(hy - qy, hx - qx), c = Math.cos(a), s3 = Math.sin(a), tri = (e) => [[hx + c * (6 + e), hy + s3 * (6 + e)], [hx - s3 * (5 + e) - c * e, hy + c * (5 + e) - s3 * e], [hx + s3 * (5 + e) - c * e, hy - c * (5 + e) - s3 * e]].map(([X, Y]) => [Math.round(X), Math.round(Y)]);
    if (pts[n - 1][2]) { R.poligono(tri(1.2), borde); R.poligono(tri(0), hex('#ffffff')); }
  }
};
const p2 = (t) => {
  const lon = lerp(-120, -80, tramo(t, P2 - 0.3, P3 + 0.3));
  const { P } = T.orbita(R, t, { lat: 2, lon, tiros: false });
  const g = lin(t, nino - 0.25, pacifico + 0.5); if (g > 0) lengua(P, t, g);
  termometro(226, 74, t, lin(t, calienta - 0.2, pacifico + 0.4));
  const w = lin(t, cambia - 0.1, atlantico + 0.2); if (w > 0) vientosAltos(P, t, w, lin(t, alto, atlantico + 0.6));
};

// ── 3 · la playa de Destin: el globo sonda y los dos vientos ────────────────────────────────────────────────────
const suelta = esos - 0.08;
// rachas de viento: trazos tramados que corren hacia dir, entre y0 e y1, con su velocidad y su fuerza (0–1)
const rachas = (t, y0, y1, dir, vel, f, n = 12) => {
  for (let k = 0; k < Math.round(n * f); k++) { const L = 6 + Math.round(hh(k, 1, 831) * 12), y = Math.round(y0 + hh(k, 2, 831) * (y1 - y0)), x0 = ((hh(k, 3, 831) * 400 + t * vel) % 400) - 40, x = dir > 0 ? x0 : 320 - x0;
    for (let i = 0; i < L; i++) { const px = Math.round(x - dir * i); if (px < 0 || px > 319 || (px > 274 && y < 46)) continue; if (i < L - 2 || bay(px, y) < 0.5) R.pset(px, y, mezcla(R.pget(px, y), C.blanco, i < 2 ? 0.85 : 0.55)); }
    const hx = Math.round(x); if (hx > 2 && hx < 318 && !(hx > 274 && y < 46)) { R.pset(hx - dir, y - 1, C.blanco); R.pset(hx - dir, y + 1, C.blanco); } }
};
const globo = (t) => {
  const s = t - suelta;
  if (s < 0) return [170, 118];
  const y = Math.max(54, 118 - 30 * s - 9 * s * s) + Math.sin(t * 3) * (s > 1.4 ? 1 : 0);
  const x = s < 1.05 ? 170 - 6 * s : 163.7 + 160 * Math.pow(s - 1.05, 1.6);
  return [Math.round(x), Math.round(y)];
};
const p3 = (t) => {
  T.costa(R, t, { encuadre: 'playa' });
  rachas(t, 92, 132, -1, 16, lin(t, P3, esos + 0.6), 10);
  rachas(t, 48, 72, 1, 95, lin(t, arriba - 0.3, distinto), 14);
  // los dos pronosticadores: él con la tableta, ella suelta el globo, lo sigue con el dedo y señala el viento de abajo
  const tab = R.actor(EL.pronosticador, 112, 166, t, { dir: 1, sorpresa: entre(t, distinto + 0.1, distinto + 0.8), sonrisa: t > cerca + 0.3, habla: entre(t, P3 + 0.3, suelta - 0.2) && Math.sin(t * 8) > 0 });
  { const [hx, hy] = enMano(112, 166, 1); R.rect(hx - 1, hy - 7, hx + 6, hy - 1, C.k); R.rect(hx, hy - 6, hx + 5, hy - 2, hex('#1a2a44'));
    if (t > distinto) { R.linea(hx + 1, hy - 3, hx + 4, hy - 3, hex('#5ad0f0')); R.pset(hx + 4, hy - 4, hex('#5ad0f0')); R.linea(hx + 1, hy - 5, hx + 4, hy - 5, hex('#f0a040')); R.pset(hx + 1, hy - 6, hex('#f0a040')); } else if (Math.sin(t * 5) > 0) R.pset(hx + 2, hy - 4, hex('#5ad0f0')); }
  const abajo = t > cerca - 0.15 && t < cerca + 0.9;
  const ella = R.actor(EL.pronosticadora, 150, 164, t, { dir: abajo ? -1 : 1, dedo: t < suelta + 0.25 || entre(t, arriba, distinto + 0.7) || abajo, sonrisa: t > suelta + 0.3 && !abajo, habla: abajo && Math.sin(t * 8) > 0 });
  // el globo con su cordel y la sonda colgando, que se queda atrás en el movimiento
  const [gx, gy] = globo(t), s = t - suelta, rr = s > 1.3 ? 5 : 6, vx = s > 1.05 ? 3 : 0;
  if (s < 0) { const [mx, my] = ella.mano; R.linea(mx + 1, my + 1, gx, gy + rr, hex('#e8e8ee')); }
  else { R.linea(gx, gy + rr, gx - vx, gy + rr + 7, hex('#e8e8ee')); R.rect(gx - vx - 1, gy + rr + 7, gx - vx + 1, gy + rr + 10, C.k); R.pset(gx - vx, gy + rr + 8, hex('#f08a3a')); }
  R.disco(gx, gy, rr + 1, C.k); R.disco(gx, gy, rr, hex('#f2f2f6')); R.disco(gx + 1, gy + 1, rr - 2, hex('#d8dce6')); R.disco(gx - 2, gy - 2, 1, C.blanco); R.pset(gx, gy + rr + 1, C.k);
};

// ── 4 · la tormenta joven que el viento de arriba tuerce y deshace; las piezas del motor caen al mar ────────────
const piezas = motor - 0.1, chof = motor + 0.75;
const engranaje = (x, y, a) => { for (let k = 0; k < 8; k++) { const g = a + k * Math.PI / 4; R.disco(Math.round(x + Math.cos(g) * 6), Math.round(y + Math.sin(g) * 6), 1, C.k); } R.disco(x, y, 6, C.k); R.disco(x, y, 5, hex('#9aa4b4')); for (let k = 0; k < 8; k++) { const g = a + k * Math.PI / 4; R.pset(Math.round(x + Math.cos(g) * 6), Math.round(y + Math.sin(g) * 6), hex('#c8d0dc')); } R.disco(x - 1, y - 1, 3, hex('#c8d0dc')); R.disco(x, y, 2, C.k); R.pset(x, y, hex('#6c7688')); };
const piston = (x, y, a) => { const c = Math.cos(a), s = Math.sin(a); for (let i = -4; i <= 4; i++) for (let j = -3; j <= 3; j++) R.pset(Math.round(x + i * c - j * s), Math.round(y + i * s + j * c), Math.abs(j) === 3 || Math.abs(i) === 4 ? C.k : i < -2 ? hex('#c8d0dc') : (i === 0 || i === 2) ? hex('#6c7688') : hex('#9aa4b4')); R.linea(Math.round(x + 4 * c), Math.round(y + 4 * s), Math.round(x + 10 * c), Math.round(y + 10 * s), C.k); R.disco(Math.round(x + 10 * c), Math.round(y + 10 * s), 1, hex('#6c7688')); };
const p4 = (t) => {
  const ciz = 0.03 + 0.37 * tramo(t, P4 + 0.15, tuercen + 0.5) + 0.42 * tramo(t, rompen - 0.05, jovenes + 0.2) + 0.18 * tramo(t, jovenes + 0.2, motor - 0.1);
  T.maquinaCalor(R, t, { cizalla: ciz });
  // tres piezas del motor que la tormenta no llegó a montar: asoman de la nube rota y el viento se las lleva al mar
  if (t > piezas && t < chof + 0.05) {
    const u = lin(t, piezas, chof);
    [[0, 112, 'e'], [1, 124, 'p'], [2, 104, 'e']].forEach(([k, x0, tipo]) => {
      const uu = Math.max(0, Math.min(1, (u - k * 0.06) / 0.94)); if (uu <= 0) return;
      const x = Math.round(x0 + uu * (58 + k * 14)), y = Math.round(96 - Math.sin(Math.min(1, uu * 2.2) * Math.PI / 2) * 10 + uu * uu * (56 + k * 4)), a = t * 9 + k;
      if (tipo === 'e') engranaje(x, y, a); else piston(x, y, a);
    });
  }
  if (t > chof - 0.05 && t < chof + 0.8) { const v = lin(t, chof - 0.05, chof + 0.8); [[0, 170, 142], [1, 196, 146], [2, 190, 150]].forEach(([k, x, y0]) => { const vv = Math.max(0, Math.min(1, v * 1.2 - k * 0.1)); if (vv <= 0 || vv >= 1) return;
    const alto = Math.sin(vv * Math.PI) * 9; for (let i = -3; i <= 3; i++) { const h2 = Math.round(alto * (1 - Math.abs(i) / 4)); R.rect(x + i, y0 - h2, x + i, y0, Math.abs(i) < 2 ? C.blanco : hex('#bfe8f8')); }
    for (let i = 0; i < 8; i++) { const a = -Math.PI / 2 + (i - 3.5) * 0.42, r = 2 + vv * 9; R.pset(Math.round(x + Math.cos(a) * r * 1.3), Math.round(y0 - alto * 0.6 + Math.sin(a) * r + vv * vv * 10), i % 2 ? C.blanco : hex('#bfe8f8')); }
    R.rect(x - 5 - Math.round(vv * 4), y0 + 1, x + 5 + Math.round(vv * 4), y0 + 1, hex('#e8f6ff')); }); }
  const y = T.c_cubiertaY(t);
  R.actor(EL.pronosticador, 224, y, t, { dir: -1, dedo: entre(t, tuercen - 0.3, rompen + 0.5), sorpresa: entre(t, rompen + 0.1, jovenes + 0.7) || entre(t, piezas + 0.1, chof), sonrisa: t > chof + 0.1 });
  R.actor(EL.tripulanta, 242, y, t, { dir: -1, brazos: entre(t, chof + 0.05, chof + 0.6), sonrisa: t > chof, habla: entre(t, P4 + 0.3, tuercen - 0.3) && Math.sin(t * 7) > 0 });
};

// ── 5 · el calendario de pared: los meses pasan y ninguna tormenta llega a huracán ──────────────────────────────
// las tormentas de cada mes (días, y cuándo salen): 8 tormentas con nombre antes de Isaías
const MARCAS = { 6: [[19, 0]], 7: [[4, 0], [22, 0.15]], 8: [[9, 0], [17, 0.15], [28, 0.3]], 9: [[6, 0], [24, 0.15]] };
const pasa = [[P5 + 0.35, 6, 7], [atl - 0.1, 7, 8], [atl + 0.85, 8, 9]].map(([a, v, m]) => ({ a, b: a + 0.45, v, m }));
const golpe = huracanes + 0.25;
const p5 = (t) => {
  let mes = 6, vieja = null, u = 0, desde = P5 - 0.3;
  for (const q of pasa) { if (t >= q.a) { mes = q.m; vieja = q.v; u = lin(t, q.a, q.b); desde = q.b - 0.1; } }
  const marcas = (m, d0) => (MARCAS[m] ?? []).map(([d, dt]) => [d, 'ts', d0 + 0.15 + dt]);
  const apaga = mes === 9 ? nunca : desde + 0.55;
  const cal = oficina(t, { lado: 'izq', mes, vieja: u < 1 ? vieja : null, pasa: u, marcas: marcas(mes, desde), marcasVieja: { marcas: marcas(vieja, -9), apaga: -9 }, apaga, recuento: lin(t, golpe, golpe + 0.9) });
  // la mano: entra a la esquina de abajo, levanta cada hoja hasta arriba, vuelve a bajar a por la siguiente y, al final,
  // va a la tarjeta del recuento y le da un golpecito
  const manga = '#2a4a7a', bx = OF_CAL.x + OF_CAL.w + 2, by = OF_CAL.y + OF_CAL.h - 4, arribaY = 56;   // la mano suelta la hoja antes de llegar arriba (y ≥ 50: la zona de Atom queda libre)
  let mx = null, my = null;
  const q0 = pasa[0], qn = pasa[pasa.length - 1];
  if (t > q0.a - 0.4 && t < q0.a) { const v = tramo(t, q0.a - 0.4, q0.a); mx = lerp(336, bx, v); my = lerp(172, by, v); }
  else if (t >= q0.a && t < qn.b + 0.45) {
    mx = bx; my = by;
    for (let i = 0; i < pasa.length; i++) { const q = pasa[i], sig = pasa[i + 1];
      if (t >= q.a && t < q.b) my = Math.max(arribaY, cal.corte ?? lerp(by, arribaY, lin(t, q.a, q.b)));
      else if (t >= q.b && (!sig || t < sig.a)) { if (sig) my = lerp(arribaY, by, tramo(t, q.b, q.b + 0.3)); else { const v = tramo(t, q.b, q.b + 0.45); mx = lerp(bx, 336, v); my = lerp(arribaY, 120, v); } } }
  }
  else if (t > huracanes - 0.6 && t < golpe + 1.2) { const v = tramo(t, huracanes - 0.6, golpe - 0.1), w = tramo(t, golpe + 0.5, golpe + 1.2); mx = lerp(lerp(336, 300, v), 336, w); my = lerp(lerp(150, 104, v), 140, w); if (entre(t, golpe - 0.1, golpe + 0.1)) mx -= 2; }
  if (mx != null) manoBorde(mx, my, -1, manga);
};
const efectos = [[1.6, 'ola'], [deja, 'golpecito'], [raro, 'pop'], [record + 0.1, 'boing'],
  [nino, 'brillo'], [calienta, 'burbujas', { dur: 1.6 }], [cambia + 0.1, 'whoosh'], [alto, 'rafaga'],
  [P3 + 0.1, 'ola'], [suelta, 'whoosh'], [arriba + 0.2, 'rafaga'], [distinto + 0.2, 'bip'], [cerca, 'ola'],
  [P4 + 0.1, 'rafaga'], [tuercen, 'whoosh'], [rompen + 0.1, 'rafaga'], [piezas, 'pop'], [chof, 'chof'],
  ...pasa.map((q) => [q.a, 'papel']), [pasa[2].b + 0.3, 'pop'], [nunca + 0.1, 'tic'], [golpe, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '2026', efectos, año: 2026 });
''')

# ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-isaias'] = ('Isaías', '''// HU-ISAIAS (frases 28–29), 2026; golpe de música en «destin» (frase 29). Seis planos:
// 1. el centro de huracanes de noche: la pronosticadora trae dos cafés y le da uno al compañero; en la pantalla grande,
//    Isaías es todavía una tormenta deshilachada; en «October» el calendario pasa al «7» y en «7th» la tormenta se hace
//    huracán con su ojo y sale el cono: él señala y ella se sorprende; detrás, los del turno teclean;
// 2. dos vitrinas de museo, con sus placas y el cordón de terciopelo: 2026 (la pantalla con Isaías y una pronosticadora)
//    está encendida; en «the record» parpadea y se enciende la de 1905, la azotea del Weather Bureau en sepia, y sale el
//    «=»; en «latest first hurricane» el meteorólogo de 1905 iza las dos banderas rojas de aviso de huracán (lo único en
//    color de la foto vieja) y ella señala la pantalla; en «1905» se enciende su placa; corta en el golpe («It grew»);
// 3. desde el espacio, sobre el golfo: Isaías avanza hacia el norte por su trayectoria y se organiza hasta tener ojo; en
//    «category 3» sale el «3»; en «warm waters» el agua del golfo se calienta y tiembla; la línea prevista va a Destin;
// 4. la playa de Destin de noche: llegan rompientes grandes y la última pareja se va con su linterna; en «came ashore»
//    cae un rayo, el mar sube por la playa lleno de espuma y revienta contra el muelle; el viento se lleva una sombrilla
//    que rueda y una silla que vuelca (sin víctimas); en «category 2» sale el «2»;
// 5. el mapa de EE. UU.: la trayectoria de Isaías llega a Destin y la mano clava la chincheta roja («hit»); en «United
//    States» se clava su foto de la noche del huracán con el «2026»; en «since Milton» el mapa se acerca al golfo, se dibuja
//    la trayectoria gris de Milton y cae su chincheta en Siesta Key con su foto vieja y el «2024»;
// 6. la costa de Destin de noche con el huracán: las luces se apagan barrio a barrio, de la playa hacia dentro
//    («homes and businesses», «Florida and Alabama»), salta un transformador y el contador sube a «700,000»; al final
//    («without power») solo quedan las luces rojas de las torres y alguna linterna.''', COMUNES + r'''
const a = (f) => en('isaias', f), b = (f) => en('destin', f);
const P2 = a(0.569), P3 = b(0), P4 = b(0.186), P5 = b(0.46), P6 = b(0.688);
const temporada = a(0.137), fuerza = a(0.289), octubre = a(0.458), siete = a(0.482), record = a(0.622), tardio = a(0.706), ano1905 = a(0.906);
const tres = b(0.046), calidas = b(0.099), golfo = b(0.148), noche = b(0.202), tierra = b(0.284), destin = b(0.314), dos = b(0.411);
const golpea = b(0.524), eeuu = b(0.541), milton = b(0.591), ano2024 = b(0.627), deja = b(0.697), miles = b(0.735), hogares = b(0.797), florida = b(0.881), sinLuz = b(0.931);

// ── 1 · el centro de huracanes, la noche del 7 de octubre ─────────────────────────────────────────────────────
const da = temporada + 0.7;
const p1 = (t) => {
  const crece = 0.2 + 0.14 * lin(t, 0.3, siete - 0.3) + 0.66 * tramo(t, siete, siete + 0.6);
  T.centroHuracanes(R, t, { pantalla: 'isaias', crece, cono: tramo(t, siete + 0.4, P2 - 0.1), dia: t < octubre ? 6 : 7, cat: 1, hora: 22 * 60 + 46 + (t > 4 ? 1 : 0) });
  // ella llega desde la derecha con dos cafés y le da uno; él lo bebe; cuando la tormenta se hace huracán, señala
  const u = lin(t, 0.2, da - 0.3), sx = Math.round(lerp(246, 152, u)), ellaAnda = u > 0 && u < 1;
  const yo = R.actor(EL.pronosticador, 126, 162, t, { dir: 1, dedo: entre(t, siete + 0.05, P2), habla: entre(t, 0.4, 1.6) && Math.sin(t * 8) > 0, sonrisa: entre(t, da, fuerza), sorpresa: entre(t, siete - 0.1, siete + 0.3) });
  const ella = R.actor(EL.pronosticadora, sx, 164, t, { dir: -1, anda: ellaAnda, sorpresa: entre(t, siete + 0.1, P2), sonrisa: entre(t, da - 0.3, octubre) });
  // las tazas
  const [ex, ey] = enMano(sx, 164, -1); taza(ex - 3, ey - 1, t, true, hex('#e8e4dc'));
  if (t < da) taza(ex - 7, ey, t, true, hex('#3a6ac8'));
  else { const [hx, hy] = enMano(126, 162, 1), bebe = entre(t, fuerza - 0.2, fuerza + 0.6); if (!entre(t, siete + 0.05, P2)) taza(hx - 1, bebe ? hy - 6 : hy - 1, t, true, hex('#3a6ac8')); }
  if (entre(t, siete + 0.15, P2)) R.bocadillo(sx + 8, 164 - 30, {});
};

// ── 2 · las dos vitrinas: 1905 = 2026 ───────────────────────────────────────────────────────────────────────────
const VA = R.nuevo(), VB = R.nuevo();
const iza = tardio - 0.1;
const sepia = (c, k) => { const r = c & 255, g = (c >>> 8) & 255, b2 = (c >>> 16) & 255, l = r * 0.3 + g * 0.55 + b2 * 0.15;
  const sr = Math.min(255, l * 1.06 + 22), sg = Math.min(255, l * 0.88 + 8), sb = Math.min(255, l * 0.62);
  return (0xff000000 | (Math.round((sb * 0.86 + b2 * 0.14) * k) << 16) | (Math.round((sg * 0.86 + g * 0.14) * k) << 8) | Math.round((sr * 0.86 + r * 0.14) * k)) >>> 0; };
// copia un trozo (sx, sy, w × h) de un búfer a la pantalla en (dx, dy); f: lo que se le hace a cada color
const pega = (src, sx, sy, w, h, dx, dy, f) => { const D = R.buf; for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const X = dx + i, Y = dy + j; if (X < 0 || X > 319 || Y < 0 || Y > 179) continue; const c = src[(sy + j) * 320 + sx + i]; D[Y * 320 + X] = f ? f(c, X, Y) : c; } };
const vitrina = (x0, y0, x1, y1, luz) => {
  const { rect } = R, marco = (a, b, c, d, col) => { rect(a, b, c, b, col); rect(a, d, c, d, col); rect(a, b, a, d, col); rect(c, b, c, d, col); };
  marco(x0 - 4, y0 - 4, x1 + 4, y1 + 4, C.k); for (let k = 1; k <= 2; k++) marco(x0 - 4 + k, y0 - 4 + k, x1 + 4 - k, y1 + 4 - k, k === 1 ? hex('#a8824a') : hex('#7a5a30'));
  rect(x0 - 3, y0 - 3, x1 + 3, y0 - 3, hex('#d8b070')); rect(x0 - 3, y1 + 3, x1 + 3, y1 + 3, hex('#5a4024')); marco(x0 - 1, y0 - 1, x1 + 1, y1 + 1, C.k);
  for (const [cx, cy] of [[x0 - 2, y0 - 2], [x1 + 2, y0 - 2], [x0 - 2, y1 + 2], [x1 + 2, y1 + 2]]) R.pset(cx, cy, hex('#f0d080'));
  if (luz > 0) for (let i = 0; i < 40; i++) { const x = x0 + 6 + i, y = y0 + 34 - Math.round(i * 0.8); if (x < x1 && y > y0 && bay(x, y) < 0.25 * luz) R.pset(x, y, mezcla(R.pget(x, y), C.blanco, 0.4)); }
};
const placa = (x, y, texto, luz) => { R.rect(x - 40, y - 13, x + 40, y + 7, C.k); R.rect(x - 39, y - 12, x + 39, y + 6, luz > 0.5 ? hex('#3a2a1a') : hex('#241a12')); R.rect(x - 39, y - 12, x + 39, y - 12, luz > 0.5 ? hex('#c8a040') : hex('#5a4428')); R.rect(x - 39, y + 6, x + 39, y + 6, luz > 0.5 ? hex('#8a6a30') : hex('#3a2a1a'));
  for (const dx of [-36, 36]) { R.pset(x + dx, y - 3, luz > 0.5 ? hex('#f0d080') : hex('#6a5228')); } R.numero(texto, x, y + 3, { tam: 16, centro: true, rampa: luz > 0.5 ? undefined : [hex('#3a2a18'), hex('#4a3820'), hex('#5a4428'), hex('#5a4428')] }); };
const lampara = (x, t, luz) => { R.rect(x - 6, 15, x + 6, 19, C.k); R.rect(x - 5, 16, x + 5, 18, hex('#3a3a46')); R.rect(x - 1, 14, x + 1, 15, C.k); if (luz > 0) { R.rect(x - 4, 19, x + 4, 19, hex('#fff0b0'));
  for (let y = 20; y < 152; y++) { const w = 6 + (y - 20) * 0.42; for (let i = -w; i <= w; i++) { const X = Math.round(x + i); if (X < 0 || X > 319 || (X > 277 && y < 45)) continue; if (bay(X, y) < 0.38 * luz * (1 - (y - 20) / 170)) R.pset(X, y, mezcla(R.pget(X, y), hex('#fff0c8'), 0.3)); } } } };
// los postes de latón con el cordón de terciopelo, delante de las vitrinas
const cordon = (t) => { for (const px of [16, 160, 304]) { R.rect(px - 1, 140, px + 1, 166, C.k); R.rect(px, 141, px, 165, hex('#e8c060')); R.disco(px, 139, 2, C.k); R.disco(px, 139, 1, hex('#f8e090')); R.rect(px - 4, 166, px + 4, 168, C.k); R.rect(px - 3, 166, px + 3, 167, hex('#c8a040')); }
  for (const [a0, a1] of [[16, 160], [160, 304]]) for (let x = a0 + 2; x <= a1 - 2; x++) { const u = (x - a0) / (a1 - a0), y = Math.round(143 + Math.sin(u * Math.PI) * 9 + Math.sin(t * 1.5 + u * 3) * 0.6); R.pset(x, y - 1, C.k); R.pset(x, y, hex('#a8203a')); R.pset(x, y + 1, hex('#6a1024')); R.pset(x, y + 2, C.k); } };
const p2 = (t) => {
  // dentro de las vitrinas: 1905 (la azotea del Weather Bureau con su mástil) y 2026 (la pantalla del centro)
  let prev = R.usar(VA);
  const b1905 = 0.93 * tramo(t, iza, iza + 1.1);
  T.galveston(R, t, { encuadre: 'tejado', bandera: b1905, banderas: 2, cielo: 'gris' });
  const tira = entre(t, iza - 0.2, iza + 1.2);
  R.actor(EL.vecino, 214, 150, t, { dir: 1, dedo: tira && Math.floor(t * 5) % 2 === 0, brazos: entre(t, ano1905, ano1905 + 0.7), sonrisa: t > iza + 1.2 });
  if (R.delante) { R.delante(); R.delante = null; }
  R.usar(VB);
  T.centroHuracanes(R, t, { pantalla: 'isaias', crece: 1, cono: 1, dia: 7, cat: 1 });
  R.actor(EL.pronosticadora, 168, 139, t, { dir: -1, dedo: entre(t, tardio, tardio + 1.4), sonrisa: t > tardio + 1.4 });
  if (R.delante) { R.delante(); R.delante = null; }
  R.usar(prev);
  // la sala oscura: la pared de paneles con su trama y el zócalo
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = hh(x >> 1, y >> 1, 841); R.pset(x, y, y > 152 ? (y === 153 ? hex('#3a3046') : n < 0.15 ? hex('#16121e') : hex('#1e1a28')) : (x % 40 === 0 ? hex('#0c1020') : n < 0.12 ? hex('#121a30') : n > 0.94 ? hex('#22304e') : hex('#18213a'))); }
  const enciende = record - 0.02, luzA = t < enciende ? 0 : t < enciende + 0.35 ? (Math.floor((t - enciende) * 18) % 2) : 1;
  lampara(98, t, luzA); lampara(222, t, 1);
  const LA = [47, 27, 149, 147], LB = [171, 27, 273, 147];
  pega(VA, 182, 30, 103, 121, LA[0], LA[1], (c, X, Y) => { const r0 = c & 255, g0 = (c >>> 8) & 255, b0 = (c >>> 16) & 255; let s = r0 > 140 && r0 > g0 * 2 && b0 >= g0 - 2 ? mezcla(c, C.k, 0.82 - 0.82 * luzA) : sepia(c, 0.18 + 0.82 * luzA); if (luzA > 0 && hh(X, Y, Math.floor(t * 12)) < 0.012) s = mezcla(s, hex('#fff4d8'), 0.6); return s; });
  pega(VB, 110, 20, 103, 121, LB[0], LB[1]);
  // las rayas de la película vieja
  if (luzA > 0) { const k = Math.floor(t * 6); for (let r = 0; r < 2; r++) { const x = LA[0] + Math.floor(hh(k, r, 842) * 100); if (hh(k, r + 5, 842) < 0.6) for (let y = LA[1]; y <= LA[3]; y++) if (bay(x, y) < 0.5) R.pset(x, y, hex('#f4e8c8')); } }
  vitrina(...LA, luzA); vitrina(...LB, 1);
  cordon(t);
  placa(98, 166, '1905', lin(t, ano1905, ano1905 + 0.1)); placa(222, 166, '2026', 1);
  if (t > record + 0.35) { const u = lin(t, record + 0.35, record + 0.6), y = 92 - Math.round((1 - u) * 6); R.numero('=', 161, y, { tam: 16, centro: true }); }
};

// ── 3 · Isaías sobre el golfo, desde el espacio: categoría 3 sobre el agua caliente ─────────────────────────────
const RASTRO = [[19.6, -94.6], [20.6, -94.0], [21.6, -93.2], [22.6, -92.2], [23.6, -91.0], [24.6, -89.8], [25.6, -89.0], [26.6, -88.4], [27.6, -87.9], [28.6, -87.4], [29.5, -86.9], [30.4, -86.5]];
const enRastro = (u) => { const f = u * (RASTRO.length - 1), i = Math.min(RASTRO.length - 2, Math.floor(f)), s = f - i; return [lerp(RASTRO[i][0], RASTRO[i + 1][0], s), lerp(RASTRO[i][1], RASTRO[i + 1][1], s)]; };
const p3 = (t) => {
  const u = lerp(0.45, 0.66, lin(t, P3, P4)), [elat, elon] = enRastro(u);
  const esp = 0.5 + 0.5 * tramo(t, P3 + 0.1, tres + 0.25);
  const { P } = T.orbita(R, t, { encuadre: 'cerca', mira: [22, -88.5], espiral: esp, espiralEn: [elat, elon], tiros: false });
  // el agua caliente del golfo: se enciende en naranja y tiembla
  const cal = lin(t, calidas - 0.1, golfo);
  const golfoEn = (x, y) => { const [gx, gy] = GC; return ((x - gx) / 92) ** 2 + ((y - gy) / 40) ** 2 < 1; }, GC = P([24.5, -90.5]);
  const marClaro = (c) => esMar(c) && ((c & 255) + ((c >>> 8) & 255) + ((c >>> 16) & 255)) > 150;
  if (cal > 0) { const D = R.buf; for (let y = 84; y < 180; y++) for (let x = 0; x < 320; x++) { const c = D[y * 320 + x]; if (!marClaro(c) || !golfoEn(x, y)) continue; const w = 0.5 + 0.5 * Math.sin(x * 0.11 + y * 0.23 - t * 3), d2 = ((x - GC[0]) / 92) ** 2 + ((y - GC[1]) / 40) ** 2; if (bay(x, y) < cal * (0.42 + 0.25 * w) * (1 - d2)) D[y * 320 + x] = mezcla(c, hex('#f09048'), 0.5); }
    for (let k = 0; k < 14; k++) { const v = (t * 0.8 + k * 0.29) % 1, x = Math.round(GC[0] - 80 + hh(k, 1, 851) * 160), y = Math.round(GC[1] - 26 + hh(k, 2, 851) * 50 - v * 8); if (!golfoEn(x, y) || !marClaro(R.pget(x, y + 8))) continue; for (let i = 0; i < 5; i++) R.pset(x + i, y + Math.round(Math.sin(i * 1.5 + t * 6)), v < 0.5 ? hex('#ffc070') : hex('#f08a4a')); } }
  // la trayectoria: lo recorrido en puntos blancos y lo previsto, en trazos, hasta Destin
  for (let k = 0; k <= 60; k++) { const v = k / 60; const [lat, lon] = enRastro(v), [x, y, vis] = P([lat, lon]); if (!vis) continue;
    if (v < u - 0.02) { if (k % 3 === 0) { R.disco(x, y, 1, C.k); R.pset(x, y, C.blanco); } }
    else if (v > u + 0.03 && (k % 2) === 0 && t > P3 + 0.4) R.pset(x, y, hex('#f6f2ea')); }
  { const [x, y, vis] = P([30.4, -86.5]); if (vis) { const r = 3 + Math.round(((t * 1.5) % 1) * 4); for (let a = 0; a < 6.28; a += 0.4) R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r * 0.7), hex('#f04a4a')); R.disco(x, y, 1, hex('#f04a4a')); } }
  // el «3», unido a la tormenta por una raya fina
  if (t > tres) { const [sx, sy] = P([elat, elon]), v = lin(t, tres, tres + 0.2), lx = 214, ly = 62;
    R.linea(sx + 8, sy - 8, lx - 12, ly + 6, hex('#f6f2ea'), 2);
    R.rect(lx - 16, ly - 14, lx + 22, ly + 8, C.k); R.rect(lx - 15, ly - 13, lx + 21, ly + 7, hex('#1a2238')); simbolo(lx - 6, ly - 3, hex('#e03a3a'));
    R.numero('3', lx + 10, ly + 5 - Math.round((1 - v) * 4), { tam: 16, centro: true }); }
};

// ── 4 · la playa de Destin de noche: la última pareja se va y el huracán toca tierra ──────────────────────────
const RAYO = (k) => k * 4.3 + hh(k, 1, 941) * 2.6;
// la sombrilla roja y blanca que el viento se lleva dando vueltas por la arena (x, y: el centro, a: el giro)
const sombrilla = (x, y, a) => { const c = Math.cos(a), s2 = Math.sin(a);
  for (let i = -9; i <= 9; i++) for (let j = 0; j <= 4; j++) { if (j > 4 - Math.abs(i) * 0.3) continue; const X = Math.round(x + i * c - (-j) * s2), Y = Math.round(y + i * s2 + (-j) * c); R.pset(X, Y, (Math.floor((i + 9) / 3) % 2) ? hex('#d8d8e0') : hex('#b83040')); }
  R.linea(Math.round(x), Math.round(y), Math.round(x + 9 * s2), Math.round(y + 9 * c), hex('#6a6070')); };
// la silla de plástico blanca que resbala y vuelca
const silla = (x, y, a) => { const c = Math.cos(a), s2 = Math.sin(a), P = (i, j) => [Math.round(x + i * c - j * s2), Math.round(y + i * s2 + j * c)];
  for (const [i0, j0, i1, j1] of [[-4, 0, 4, 0], [-4, 0, -4, 6], [4, 0, 4, 6], [4, 0, 4, -7], [-1, -1, 3, -6]]) { const [ax, ay] = P(i0, j0), [bx, by] = P(i1, j1); R.linea(ax, ay, bx, by, hex('#c8ccd8')); } };
const p4 = (t) => {
  const hur = 0.5 + 0.5 * tramo(t, noche, tierra + 0.3), o = { encuadre: 'playa', noche: 1, huracan: hur };
  T.costa(R, t, o);
  const D = R.buf;
  // las rompientes grandes que llegan del golfo: crestas de espuma rotas que avanzan hacia la playa y revientan
  for (let k = 0; k < 3; k++) { const u = (((t - P4) * 0.55 + k / 3) % 1), y0 = 90 + Math.pow(u, 1.5) * 50, f = 0.3 + 0.6 * u;
    for (let x = 0; x < 320; x++) { const n = vruido(x * 0.06 + k * 17 + t * 0.4, k * 3 + u * 2, 871); if (n < 0.5 - u * 0.3) continue;
      const yb = Math.round(y0 + Math.sin(x * 0.05 + k * 2) * (1 + u * 2) + (n - 0.5) * 3), grosor = 1 + Math.round((n - 0.3) * 4 * u);
      for (let j = 0; j < grosor; j++) { const y = yb - j; if (y < 85 || y > 179) continue; if (bay(x, y) < f - j * 0.12) D[y * 320 + x] = mezcla(D[y * 320 + x], j === 0 ? hex('#dfe8f2') : hex('#a4b6cc'), 0.8); }
      if (u > 0.8 && hh(x, Math.floor(t * 8), 872) < 0.25 * n) R.pset(x, yb - 2 - Math.round(hh(x, 3, 872) * 6 * Math.sin((u - 0.8) / 0.2 * Math.PI)), hex('#e8f0f8')); } }
  // la pareja que se va de la playa con la linterna (antes de que llegue)
  const u = lin(t, P4 + 0.1, tierra - 0.2), x = Math.round(lerp(236, -34, u));
  if (u < 1) { R.actor(EL.senor30, x, 166, t, { dir: -1, anda: true }); R.actor(EL.senora30, x + 16, 167, t, { dir: -1, anda: true, sorpresa: true });
    const lx = x - 1, ly = 155, sw = Math.sin(t * 9) * 3; for (let i = 0; i < 26; i++) for (let j = -Math.round(i * 0.35); j <= Math.round(i * 0.35); j++) { const X = lx - i, Y = Math.round(ly + i * 0.45 + j + sw * i / 26); if (X >= 0 && bay(X, Y) < 0.45 - i / 70) R.pset(X, Y, mezcla(R.pget(X, Y), hex('#fff0a0'), 0.5)); } R.rect(lx - 1, ly - 1, lx + 1, ly + 1, hex('#fff8c8')); }
  // al tocar tierra: el mar sube por la playa (agua con vetas de espuma) y revienta contra los pilotes del muelle
  if (t > tierra - 0.15) { const v = tramo(t, tierra - 0.15, tierra + 0.7), w = tramo(t, tierra + 1.0, P5), frente = Math.round(140 + v * 26 - w * 14);
    for (let y = 136; y <= Math.min(179, frente + 3); y++) for (let x = 0; x < 320; x++) { const yb = frente + Math.round((vruido(x * 0.07 + t * 0.6, 5, 873) - 0.5) * 6); if (y > yb) continue; const i = y * 320 + x;
      if (y >= yb - 1) { if (bay(x, y) < 0.75) D[i] = hex('#e8f0f8'); continue; }
      const fo = vruido(x * 0.055 - t * 1.2, y * 0.6 + t * 0.8, 874); D[i] = fo > 0.66 ? mezcla(D[i], hex('#d0dcea'), 0.7) : fo > 0.56 && bay(x, y) < 0.5 ? mezcla(D[i], hex('#9fb0c6'), 0.6) : mezcla(D[i], hex('#33425e'), 0.6); }
    const sp = lin(t, tierra - 0.1, tierra + 0.9); if (sp > 0 && sp < 1) for (let k = 0; k < 7; k++) { const px = Math.round(lerp(312, 226, k / 6)), py = Math.round(lerp(116, 90, k / 6)); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (hh(i, k, 863) - 0.5) * 1.6, r = sp * (8 + hh(i, k + 3, 863) * 14); R.pset(Math.round(px + Math.cos(a) * r), Math.round(py + Math.sin(a) * r + sp * sp * 12), i % 3 ? hex('#e8f0f8') : hex('#a8c0d8')); } } }
  // lo que se lleva el viento por la arena: la sombrilla que rueda y la silla que vuelca
  if (entre(t, destin - 0.3, P5)) { const v = lin(t, destin - 0.3, destin + 1.9), bx = Math.round(lerp(345, -30, v)), by = Math.round(152 - Math.abs(Math.sin(v * 9)) * 7); sombrilla(bx, by, -t * 9); }
  if (entre(t, destin + 0.4, P5)) { const v = lin(t, destin + 0.4, destin + 2.4), cx = Math.round(lerp(330, 60, v)), cy = 160 - Math.round(Math.abs(Math.sin(v * 6)) * 4); silla(cx, cy, -v * 7); }
  // hojas de palmera y arena que vuelan
  for (let k = 0; k < 6; k++) { const v = (t * 0.9 + k * 0.17) % 1, fx = Math.round(330 - v * 360), fy = Math.round(60 + k * 12 + Math.sin(v * 12 + k) * 6); for (let i = 0; i < 6; i++) R.pset(fx + i, fy + Math.round(Math.sin(i + t * 8) * 1), i < 3 ? hex('#3a5a3a') : hex('#2a4a2e')); }
  // el relámpago grande al tocar tierra: todo se aclara un instante y el rayo cae sobre el mar
  if (entre(t, tierra, tierra + 0.22)) { const f = entre(t, tierra + 0.06, tierra + 0.11) ? 0.2 : 0.5; for (let i = 0; i < 320 * 180; i++) D[i] = mezcla(D[i], hex('#dfe6ff'), f);
    let bx = 196; for (let y = 22; y < 88; y++) { bx += (hh(y, 1, 864) - 0.5) * 4; R.pset(Math.round(bx), y, C.blanco); R.pset(Math.round(bx) + 1, y, hex('#c8d4ff')); if (y % 17 === 0) for (let i = 0; i < 9; i++) R.pset(Math.round(bx) - i, y + i, hex('#c8d4ff')); } }
  // «category 2»
  if (t > dos) { const v = lin(t, dos, dos + 0.2); R.rect(118, 32, 164, 56, C.k); R.rect(119, 33, 163, 55, hex('#1a2238')); simbolo(131, 44, hex('#e03a3a')); R.numero('2', 152, 53 - Math.round((1 - v) * 4), { tam: 16, centro: true }); }
  T.i_costaDelante(R, t, o);
};

// ── 5 · el mapa: el primer huracán que golpea EE. UU. desde Milton, en 2024 ──────────────────────────────────
const MILTON = [[-95.0, 22.3], [-93.4, 22.6], [-91.6, 22.4], [-89.8, 22.0], [-88.3, 22.4], [-86.8, 23.3], [-85.4, 24.6], [-84.0, 26.0], [-82.56, 27.27]];
const ISAIAS = RASTRO.map(([la, lo]) => [lo, la]);
const traza = (P, L, u, col, rayas) => { const n = Math.round((L.length - 1) * 20 * u); let last = null;
  for (let k = 0; k <= n; k++) { const f = k / 20, i = Math.min(L.length - 2, Math.floor(f)), s = f - i, [x, y] = P([lerp(L[i][0], L[i + 1][0], s), lerp(L[i][1], L[i + 1][1], s)]); if (k % rayas < rayas - 1) { R.pset(x, y + 1, C.k); R.pset(x, y, col); R.pset(x + 1, y, col); } last = [x, y]; } return last; };
// la foto clavada en el mapa (x, y: arriba a la izquierda), con su año: la noche del huracán en la costa (gris = 2024)
const foto = (x, y, ano, gris, v, t) => { if (v <= 0) return; const dy = Math.round((1 - v) * -8), X = x, Y = y + dy, tono = (c) => gris ? mezcla(hex(c), hex('#9a9aa4'), 0.75) : hex(c);
  R.rect(X + 2, Y + 2, X + 36, Y + 38, hex('#6a5a44')); R.rect(X, Y, X + 34, Y + 36, C.k); R.rect(X + 1, Y + 1, X + 33, Y + 35, hex('#f6f2ea'));
  for (let j = 0; j < 22; j++) for (let i = 0; i < 29; i++) { const px = X + 3 + i, py = Y + 3 + j; R.pset(px, py, j < 12 ? (bay(px, py) < j / 14 ? tono('#3a4a6a') : tono('#1e2640')) : j < 15 ? tono('#2a3a5a') : tono('#4a5a7a')); }
  for (let k = 0; k < 9; k++) { const u = (t * 2.2 + k * 0.17) % 1, lx = X + 4 + (k * 7) % 27, ly = Y + 3 + Math.round(u * 18); R.pset(lx, ly, tono('#a8b8d0')); R.pset(lx - 1, ly + 1, tono('#a8b8d0')); }
  for (let i = 0; i < 29; i++) if (Math.sin(i * 0.7 + t * 4) > 0.3) R.pset(X + 3 + i, Y + 15, tono('#e8f0f8'));
  { const px = X + 22, m = Math.sin(t * 5) * 1.5; for (let j = 0; j < 12; j++) R.pset(Math.round(px + j * j * 0.03 * (1 + m * 0.2)), Y + 21 - j, tono('#2a2018')); for (let k = 0; k < 5; k++) for (let i = 0; i < 7; i++) R.pset(Math.round(px + 4 + i * 0.9 + m), Y + 9 + Math.round(k * 0.8 + i * (k - 2) * 0.25), tono('#2a4a2a')); }
  R.numero(ano, X + 17, Y + 34, { tam: 8, centro: true, color: gris ? hex('#6a6a7a') : hex('#c83a3a'), sombra: false });
  R.disco(X + 17, Y, 2, C.k); R.disco(X + 17, Y, 1, gris ? hex('#9a9aa8') : hex('#e03a3a')); };
const clava = golpea - 0.1;
const p5 = (t) => {
  const zoom = tramo(t, milton - 0.35, milton + 0.55);
  const P = T.mapa(R, t, { desde: 'eeuu', zona: 'golfo', u: zoom });
  // Milton, 2024: su trayectoria gris y su chincheta en Siesta Key
  const um = lin(t, milton + 0.1, ano2024 - 0.05); if (um > 0) { const f = traza(P, MILTON, um, hex('#4a4a5c'), 3); if (f && um < 1) simbolo(f[0], f[1], hex('#8a8a9a'), true, hex('#3a3a46')); }
  const [kx, ky] = P([-82.56, 27.27]); if (t > ano2024 - 0.3) { T.chincheta(R, kx, ky, t, hex('#8a8a9a'), { baja: lin(t, ano2024 - 0.3, ano2024) }); foto(kx + 10, ky - 34, '2024', true, lin(t, ano2024, ano2024 + 0.25), t); }
  // Isaías, 2026: su trayectoria roja, el huracán que avanza y la chincheta que clava la mano en Destin
  const ui = lin(t, P5 + 0.05, clava - 0.2), fin = traza(P, ISAIAS, ui, hex('#e03a3a'), 4);
  if (fin && ui < 1) simbolo(fin[0], fin[1], hex('#e03a3a'));
  const [dx, dy] = P([-86.5, 30.39]);
  const baja = lin(t, clava - 0.45, clava), mano = entre(t, clava - 0.5, clava + 0.55);
  if (t > clava - 0.45) T.chincheta(R, dx, dy, t, hex('#e03a3a'), { baja: Math.max(baja, 0.001), pulso: t > clava + 0.6 });
  foto(dx - 50, dy - 44, '2026', false, lin(t, eeuu, eeuu + 0.25), t);
  if (mano) { const v = tramo(t, clava - 0.5, clava - 0.05), w = tramo(t, clava + 0.15, clava + 0.55); manoBorde(dx + 12 + (1 - v) * 60 + w * 90, dy - 8 - (1 - baja) * 18, -1, '#2a4a7a'); }
};

// ── 6 · el apagón: las luces de la costa se apagan barrio a barrio y el contador llega a 700,000 ───────────────
const salta = hogares + 0.1;
const p6 = (t) => {
  const ap = 0.34 * tramo(t, deja + 0.1, miles + 0.6) + 0.33 * tramo(t, hogares - 0.1, florida - 0.2) + 0.33 * tramo(t, florida - 0.1, sinLuz + 0.2);
  const o = { noche: 1, huracan: 0.72, apagon: ap };
  T.costa(R, t, o);
  // el transformador que salta en la US-98: un fogonazo azul verdoso
  if (entre(t, salta, salta + 0.35)) { const v = lin(t, salta, salta + 0.35), r = Math.round(2 + v * 14); for (let y = 66 - r; y <= 66 + r; y++) for (let x = 142 - r; x <= 142 + r; x++) { const d = Math.hypot(x - 142, y - 66); if (d < r && bay(x, y) < (1 - d / r) * (1 - v)) R.pset(x, y, d < r * 0.4 ? C.blanco : hex('#8af0e8')); } }
  T.i_costaDelante(R, t, o);
  // el contador: casas sin luz (la casita con la bombilla tachada) y la cifra que sube
  const n = Math.round(700000 * tramo(t, miles - 0.05, hogares + 0.1) / 1000) * 1000, s = n.toLocaleString('en-US');
  const sube = Math.round((1 - tramo(t, miles - 0.45, miles - 0.1)) * 34); if (sube >= 34) return;
  R.rect(66, 148 + sube, 254, 176 + sube, C.k); R.rect(67, 149 + sube, 253, 175 + sube, hex('#141a2c')); R.rect(67, 149 + sube, 253, 149 + sube, hex('#3a4a6a'));
  { const hx = 72, hy = 154 + sube, bomb = n > 0 ? hex('#6a6a5a') : hex('#f0d040'); R.poligono([[hx, hy + 6], [hx + 7, hy], [hx + 14, hy + 6]], hex('#c8ccd8')); R.rect(hx + 2, hy + 6, hx + 12, hy + 15, hex('#c8ccd8')); R.rect(hx + 6, hy + 10, hx + 8, hy + 15, hex('#141a2c'));
    R.disco(hx + 21, hy + 7, 4, bomb); R.rect(hx + 20, hy + 11, hx + 22, hy + 14, hex('#8a8a96')); if (n > 0) { R.linea(hx + 16, hy + 2, hx + 26, hy + 13, hex('#e03a3a')); R.linea(hx + 16, hy + 3, hx + 26, hy + 14, hex('#e03a3a')); } }
  R.numero(s, 178, 171 + sube, { tam: 16, centro: true });
};
// los efectos: el trueno de cada relámpago de la costa, sincronizado con el destello del decorado
const truenos = (t0, t1, base) => { const L = []; for (let k = Math.floor(t0 / 4.3) - 1; k < t1 / 4.3 + 1; k++) { const tr = RAYO(k) + 0.25; if (tr > t0 && tr < t1) L.push([tr, 'trueno']); } return L; };
const efectos = [[0.4, 'tecleo'], [da, 'golpecito'], [fuerza, 'gluglu'], [octubre, 'papel'], [siete + 0.05, 'aviso'],
  [record - 0.02, 'interruptor'], [record + 0.35, 'pop'], [iza, 'tic'], [iza + 0.5, 'tic'], [iza + 1.0, 'rafaga'], [ano1905, 'sello'],
  [P3 + 0.15, 'rafaga'], [tres, 'brillo'], [calidas, 'burbujas', { dur: 1.5 }],
  [P4 + 0.05, 'lluvia'], [P4 + 0.6, 'rafaga'], [tierra - 0.05, 'ola'], [tierra + 0.05, 'trueno'], [destin, 'rafaga'], [destin + 0.5, 'golpecito'], [dos, 'pop'], ...truenos(P4 + 0.3, P5 - 0.1),
  [P5 + 0.1, 'lapiz'], [clava, 'golpecito'], [milton - 0.3, 'whoosh'], [milton + 0.15, 'lapiz'], [ano2024, 'golpecito'],
  [P6 + 0.05, 'lluvia'], [deja + 0.3, 'interruptor'], [salta, 'boom'], [hogares + 0.4, 'interruptor'], [florida, 'interruptor'], [sinLuz + 0.2, 'rafaga'], ...truenos(P6 + 0.5, 33.6)];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 2026 });
''')

# ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-josephine'] = ('Josephine', '''// HU-JOSEPHINE (frase 30), 2026. Cuatro planos:
// 1. el mapa: de Destin (la chincheta de Isaías, ya gris) sube a la costa de Carolina del Norte; el taco de calendario
//    pasa los días del 9 al 19 («less than two weeks later»); en «a different kind of storm» sale frente a la costa una
//    borrasca con sus frentes, el frío con triángulos azules y el cálido con semicírculos rojos; en «would become
//    Josephine» se aleja hacia el noreste, los frentes se apagan y en su centro aparece el símbolo de tormenta; las olas
//    se echan sobre los Outer Banks y cae la chincheta en Rodanthe;
// 2. la NC-12 inundada, gris y con viento: el mar salta la duna y cubre la carretera («flooded the coastal highway»);
//    un todoterreno llega, la operaria de carreteras le pita y le hace parar a tiempo; da marcha atrás, media vuelta y se
//    va («North Carolina's Outer Banks»); ella planta un cono;
// 3. el centro de huracanes, de día y tranquilo: en la pantalla, el Atlántico en calma, el «7» y las siete casillas
//    que se van comprobando («sees nothing new on the horizon»); la pronosticadora la señala y se estira, el compañero
//    se toma el café con una sonrisa;
// 4. el calendario de pared de la oficina: la mano arranca octubre (con Isaías en rojo) y en noviembre, con un
//    rotulador rojo, rodea el «30» («until November 30th»), que salta en grande en su chapa; en el corcho, la tarjeta
//    del recuento de huracanes de la temporada ya marca «1».''', COMUNES + OFICINA + r'''
const j = (f) => en('josephine', f);
const P2 = j(0.277), P3 = j(0.57), P4 = j(0.788);
const semanas = j(0.031), distinta = j(0.093), tormenta = j(0.121), sera = j(0.195), josephine = j(0.211), inunda = j(0.282), carretera = j(0.322), carolina = j(0.383), bancos = j(0.422);
const centro = j(0.577), ve = j(0.655), nada = j(0.679), horizonte = j(0.738), oficial = j(0.85), acaba = j(0.868), noviembre = j(0.927), treinta = j(0.945);

// ── 1 · el mapa: la borrasca frente a Carolina del Norte que acabará llamándose Josephine ──────────────────────
// el taco de calendario sobre el mapa (x, y: arriba a la izquierda), con el día d
const taco = (x, y, d, pasa) => { R.rect(x + 2, y + 2, x + 28, y + 30, hex('#4a3a2a')); R.rect(x, y, x + 26, y + 28, C.k); R.rect(x + 1, y + 1, x + 25, y + 27, hex('#f6f2ea')); R.rect(x + 1, y + 1, x + 25, y + 7, hex('#d83a3a'));
  for (let k = 0; k < 4; k++) R.rect(x + 4 + k * 6, y - 2, x + 5 + k * 6, y + 2, C.k);
  R.numero(String(d), x + 13, y + 24, { tam: 16, centro: true, color: hex('#2a2a36'), sombra: false });
  if (pasa > 0 && pasa < 1) { const h = Math.round(20 * (1 - pasa)); R.rect(x + 1, y + 8, x + 25, y + 8 + h, hex('#f6f2ea')); R.rect(x + 1, y + 8 + h, x + 25, y + 8 + h, hex('#c8c0b0')); } };
// la borrasca: la nube en coma que gira, los frentes (frío y cálido) y, al convertirse, el símbolo de tormenta
const borrasca = (x, y, t, f, conv) => {
  const r = 20;
  for (let jy = -r - 4; jy <= r + 4; jy++) for (let ix = -r - 8; ix <= r + 8; ix++) { const d = Math.hypot(ix * 0.85, jy), a = Math.atan2(jy, ix); const brazo = Math.cos(a - Math.log(d + 1) * 1.8 + t * 0.9);
    const v = (d < 5 ? 1 : brazo > 0.2 ? 1 - d / (r + 6) : 0) * f; if (v <= 0.05 || bay(x + ix, y + jy) > v * 1.6) continue; R.pset(x + ix, y + jy, v > 0.55 ? hex('#f4f6f8') : hex('#c4ccd8')); }
  const fr = f * (1 - conv);
  if (fr > 0.05) {
    // el frente frío hacia el suroeste, con triángulos azules; el cálido hacia el sureste, con semicírculos rojos
    const n1 = Math.round(34 * fr); for (let k = 0; k < n1; k++) { const px = Math.round(x - 4 - k * 0.9), py = Math.round(y + 6 + k * 0.9 + Math.sin(k * 0.2) * 2); R.pset(px, py, hex('#2a5ad8')); R.pset(px, py + 1, hex('#2a5ad8')); if (k % 7 === 3) R.poligono([[px - 3, py + 3], [px + 1, py + 6], [px + 3, py]].map(([a2, b2]) => [Math.round(a2), Math.round(b2)]), hex('#2a5ad8')); }
    const n2 = Math.round(26 * fr); for (let k = 0; k < n2; k++) { const px = Math.round(x + 4 + k), py = Math.round(y + 6 + k * 0.45); R.pset(px, py, hex('#d83a3a')); R.pset(px, py + 1, hex('#d83a3a')); if (k % 7 === 3) { R.disco(px - 1, py - 2, 2, hex('#d83a3a')); } }
  }
  if (conv > 0) simbolo(x, y, mezcla(hex('#e8f0f8'), hex('#3ac8c8'), conv), false, hex('#1e3a6a'));
};
const OLAS = [[-75.5, 35.9], [-75.47, 35.59], [-75.52, 35.25], [-75.75, 35.2]];
const p1 = (t) => {
  const P = T.mapa(R, t, { desde: 'sureste', zona: 'carolina', u: tramo(t, 0.25, distinta - 0.1) });
  // la chincheta gris de Isaías en Destin (se ve al principio, antes de subir)
  const [ix, iy] = P([-86.5, 30.39]); if (ix > 0) T.chincheta(R, ix, iy, t, hex('#8a8a9a'));
  // la borrasca frente a la costa, que se convierte en Josephine y se aleja hacia el noreste
  const f = tramo(t, distinta - 0.1, tormenta + 0.3), conv = tramo(t, sera, josephine + 0.5), mv = tramo(t, sera - 0.2, P2 + 0.3);
  if (f > 0) { const [bx, by] = P([lerp(-74.0, -72.2, mv), lerp(34.2, 36.4, mv)]); borrasca(bx, by, t, f, conv); }
  // las olas que se echan sobre los Outer Banks y la chincheta en Rodanthe
  const ola = lin(t, tormenta, josephine);
  if (ola > 0) for (const [lon, lat] of OLAS) { const [x, y] = P([lon, lat]); for (let k = 0; k < 2; k++) { const dx = Math.round(10 - ((t * 9 + k * 5) % 10)); if (bay(x, y) < ola) { R.pset(x + dx + 2, y - 1 + k * 3, hex('#2a6ab8')); R.pset(x + dx + 3, y - 2 + k * 3, hex('#2a6ab8')); R.pset(x + dx + 4, y - 1 + k * 3, hex('#2a6ab8')); } } }
  const [rx, ry] = P([-75.47, 35.59]); if (t > josephine) T.chincheta(R, rx, ry, t, hex('#e03a3a'), { baja: lin(t, josephine, josephine + 0.35), pulso: t > josephine + 0.6 });
  // el taco de calendario: del 9 al 19
  const d = 9 + Math.min(10, Math.floor(lin(t, 0.4, semanas + 0.9) * 10.99)), pasa = (lin(t, 0.4, semanas + 0.9) * 10.99) % 1;
  taco(22, 24, d, d < 19 ? pasa : 0);
};

// ── 2 · la NC-12 cubierta por el mar: el coche se para a tiempo y da la vuelta ────────────────────────────────
const cono = (x, y) => { R.poligono([[x - 4, y], [x, y - 11], [x + 4, y]], C.k); R.poligono([[x - 3, y - 1], [x, y - 10], [x + 3, y - 1]], hex('#f07a2a')); R.rect(x - 2, y - 6, x + 2, y - 5, C.blanco); R.rect(x - 5, y, x + 5, y + 1, C.k); };
const pita = carretera + 0.35, planta = bancos + 0.5;
const p2 = (t) => {
  const o = { cielo: 'gris', agua: 0.6 + 0.4 * tramo(t, inunda - 0.1, carretera + 0.3), coche: lin(t, carretera - 0.25, P3 - 0.15) };
  T.carreteraOuterBanks(R, t, o);
  // la operaria de carreteras (chaleco naranja): pita al coche, le hace parar, le señala el agua y planta un cono
  const pal = { C: hex('#f07a2a'), c: hex('#c85a1a'), W: hex('#f07a2a') };
  const anda = entre(t, planta - 0.7, planta - 0.1), x = Math.round(t < planta - 0.7 ? 118 : lerp(118, 132, lin(t, planta - 0.7, planta - 0.1)));
  R.actor(EL.tecnica, x, 155, t, { dir: -1, pal, anda, brazos: entre(t, pita - 0.1, carolina + 0.6), dedo: entre(t, carolina + 0.7, planta - 0.8), sonrisa: t > planta, habla: entre(t, P2 + 0.2, pita - 0.2) && Math.sin(t * 8) > 0 });
  if (entre(t, pita - 0.1, pita + 0.4)) { R.rect(x - 2, 136, x, 137, C.metalL); for (let k = 0; k < 3; k++) R.pset(x - 4 - k * 2, 134 - k, C.blanco); }
  if (t > planta) cono(x - 4, 156); else if (anda) cono(x - 2, 149);
  // un vecino mira desde su porche con un paraguas que el viento le dobla
  const vx = 262; R.actor(EL.senor30, vx, 155, t, { dir: -1, sorpresa: entre(t, inunda, carretera + 0.4) });
  { const g = Math.sin(t * 3) * 2; R.linea(vx + 3, 141, vx + 3, 126, C.k); R.poligono([[vx - 7 + g, 128], [vx + 3, 120 + Math.round(g * 0.5)], [vx + 13 + g, 128]], hex('#3a5a9a')); R.linea(vx - 7 + Math.round(g), 128, vx + 13 + Math.round(g), 128, C.k); }
  T.i_carreteraDelante(R, t, o);
};

// ── 3 · el centro de huracanes, de día: nada nuevo en el horizonte ──────────────────────────────────────────────
const p3 = (t) => {
  T.centroHuracanes(R, t, { pantalla: 'nada' });
  R.actor(EL.pronosticadora, 120, 163, t, { dir: 1, dedo: entre(t, nada - 0.2, horizonte - 0.1), brazos: entre(t, horizonte, P4 + 0.2), sonrisa: t > ve });
  const bebe = entre(t, ve, ve + 0.8) || entre(t, horizonte + 0.2, horizonte + 0.8);
  R.actor(EL.pronosticador, 176, 162, t, { dir: -1, sonrisa: t > centro + 0.5, habla: entre(t, P3 + 0.2, centro + 0.4) && Math.sin(t * 8) > 0 });
  const [hx, hy] = enMano(176, 162, -1); taza(hx - 3, bebe ? hy - 6 : hy - 1, t, true, hex('#e03a3a'));
};

// ── 4 · el calendario: la temporada no acaba hasta el 30 de noviembre ─────────────────────────────────────────
const arranca = oficial - 0.25, rodea = treinta;
const p4 = (t) => {
  const u = lin(t, arranca, arranca + 0.5), mes = t < arranca ? 10 : 11;
  const marcas10 = { marcas: [[7, 'hu', -9], [8, 'hu', -9], [9, 'hu', -9], [21, 'ts', -9]], apaga: 99 };
  const cal = oficina(t, { lado: 'der', mes, vieja: u > 0 && u < 1 ? 10 : null, pasa: u, ...(mes === 10 ? marcas10 : {}), marcasVieja: marcas10, circulo: t > rodea ? [30, lin(t, rodea, rodea + 0.8)] : null, cuenta: '1', dia: 10 * 60 + 18 });
  // la mano: levanta octubre y luego rodea el 30 con el rotulador rojo
  const manga = '#2a4a7a', bx = OF_CAL.x + OF_CAL.w + 2, by = OF_CAL.y + OF_CAL.h - 4;
  if (t > arranca - 0.35 && t < arranca + 0.8) { const v = lin(t, arranca - 0.35, arranca), w = lin(t, arranca + 0.5, arranca + 0.8);
    const mx = t < arranca ? lerp(240, bx, v) : t < arranca + 0.5 ? bx : lerp(bx, 240, w), my = t < arranca ? lerp(176, by, v) : t < arranca + 0.5 ? Math.max(56, cal.corte ?? by) : lerp(56, 176, w); manoBorde(mx, my, -1, manga); }
  // el «30» rodeado, en grande, en una chapa unida a su casilla
  const [cx, cy] = cal.centro(30);
  if (t > rodea + 0.75) { const v = lin(t, rodea + 0.75, rodea + 0.95), bx2 = 60, by2 = 128 - Math.round((1 - v) * 5);
    R.linea(cx - 9, cy, bx2 + 15, by2, hex('#d8202a'), 2); R.disco(bx2 + 1, by2 + 1, 17, hex('#5a6270')); R.disco(bx2, by2, 17, C.k); R.disco(bx2, by2, 16, hex('#d8202a')); R.disco(bx2, by2, 13, C.blanco);
    R.numero('30', bx2 + 1, by2 + 8, { tam: 16, centro: true }); }
  // la mano con el rotulador rojo: llega a la casilla del 30 y la rodea
  if (t > noviembre - 0.3 && t < rodea + 1.5) {
    const v = lin(t, rodea, rodea + 0.8), a = -Math.PI / 2 + v * Math.PI * 2.15, llega = tramo(t, noviembre - 0.3, rodea), sale = tramo(t, rodea + 0.9, rodea + 1.5);
    const px = t < rodea ? lerp(330, cx + 13, llega) : cx + 13 + Math.cos(a) * 9, py = t < rodea ? lerp(176, cy - 7, llega) : cy + Math.sin(a) * 7;
    const mx = Math.round(px + sale * 90), my = Math.round(py + sale * 20);
    R.rect(mx - 13, my - 1, mx - 3, my + 1, C.k); R.rect(mx - 12, my, mx - 4, my, hex('#d8202a')); R.pset(mx - 14, my, hex('#d8202a'));
    manoBorde(mx, my, -1, manga);
  }
};
const efectos = [[0.3, 'papel'], [semanas, 'tic'], [distinta, 'rafaga'], [sera + 0.1, 'whoosh'], [josephine + 0.3, 'golpecito'],
  [P2 + 0.05, 'lluvia'], [inunda, 'ola'], [carretera - 0.2, 'motor', { dur: 2.4 }], [pita, 'silbato'], [bancos + 0.1, 'motor', { dur: 2.2 }], [planta, 'golpecito'],
  [P3 + 0.1, 'tecleo'], [ve, 'gluglu'], [nada + 0.1, 'bip'], [horizonte, 'bip'],
  [arranca, 'papel'], [rodea, 'lapiz'], [rodea + 0.85, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
''')
