E = {}

AYUDAS = r'''
const K = hex('#1a1424'), ri = Math.round, ease = (u) => u * u * (3 - 2 * u), voz = (t) => E.energia?.(t) ?? 0;
const hh = (a, b, c = 0) => { let n = (a * 374761393 + b * 668265263 + c * 1442695041) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const BAY = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const tono = (cols, v, x, y) => { const n = cols.length - 1; v = Math.max(0, Math.min(n, v)); let l = Math.floor(v); if (v - l > BAY[y & 3][x & 3] / 16) l++; return cols[Math.min(n, l)]; };
const pal = (...a) => a.map(hex);
const cl = (v) => Math.max(0, Math.min(1, v));
const ORO = pal('#7a4a10', '#c8901c', '#f0c040', '#fff0a0');
const capas = {};
const capa = (k, f) => { if (!capas[k]) { const b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); capas[k] = b; } return capas[k]; };
const ps = (x, y, c) => { x = ri(x); y = ri(y); if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, c); };
const tine = (x, y, c, a) => { x = ri(x); y = ri(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, a)); };
const halo = (cx, cy, r, c, a) => { cx = ri(cx); cy = ri(cy);
  for (let y = Math.max(0, cy - r); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, cx - r); x <= Math.min(319, cx + r); x++) {
    const d = Math.hypot(x - cx, y - cy) / r; if (d >= 1) continue; const q = Math.floor(((1 - d) * (1 - d)) * 4 + BAY[y & 3][x & 3] / 16) / 4; if (q > 0) R.pset(x, y, mez(R.pget(x, y), c, Math.min(0.9, q * a))); } };
const nube = (cx, cy, w, cols, k) => { const n = Math.max(3, Math.round(w / 7)), X = (i) => ri(cx - w / 2 + (i + 0.5) * w / n), al = (i) => Math.sin(Math.PI * (i + 0.5) / n),
    r = (i) => 3 + hh(k, i, 3) * 2.5 + al(i) * Math.min(7, w * 0.09), Y = (i) => ri(cy - al(i) * w * 0.07 - hh(k, i, 4) * 2);
  for (let i = 0; i < n; i++) R.disco(X(i), Y(i) + 1, ri(r(i)), cols[0]);
  for (let i = 0; i < n; i++) R.disco(X(i), Y(i), ri(r(i) - 1), cols[1]);
  for (let i = 0; i < n; i++) R.disco(X(i) - 1, Y(i) - 2, Math.max(1, ri(r(i) - 3)), cols[2]); };
const ave = (x, y, t, c, f = 0) => { const a = Math.sin(t * 12 + f) > 0; ps(x, y, c); ps(x - 1, y - (a ? 1 : 0), c); ps(x + 1, y - (a ? 1 : 0), c); ps(x - 2, y - (a ? 2 : 0), c); ps(x + 2, y - (a ? 2 : 0), c); };
const chispas = (x, y, t, n, r, c, sem = 0) => { for (let k = 0; k < n; k++) { const a = hh(k, 3, sem) * 6.28 + t * 0.8, d = r * (0.4 + hh(k, 4, sem) * 0.6), on = Math.sin(t * 9 + k * 2.3) > 0.2;
  if (!on) continue; const X = ri(x + Math.cos(a) * d), Y = ri(y + Math.sin(a) * d * 0.8); ps(X, Y, hex('#ffffff')); tine(X - 1, Y, c, 0.8); tine(X + 1, Y, c, 0.8); tine(X, Y - 1, c, 0.8); tine(X, Y + 1, c, 0.8); } };
// tablas de madera con vetas, juntas y clavos (C: D, S, M, L)
const tablas = (x0, y0, x1, y1, C, w, sem, vert = true, clavos = true) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = vert ? x - x0 : y - y0, b = vert ? y : x, k = Math.floor(a / w), i = a % w;
    if (i === 0) { R.pset(x, y, C[0]); continue; }
    const veta = Math.sin(b * 0.23 + k * 3.1 + Math.sin(b * 0.05 + k) * 2.4) > 0.8;
    R.pset(x, y, tono(C, 1.6 + (hh(k, 1, sem) - 0.5) * 1.1 + (i === 1 ? 0.9 : i === w - 1 ? -0.8 : 0) + (veta ? -0.9 : 0) + hh(x >> 1, y >> 1, sem) * 0.45, x, y)); }
  if (clavos) for (let k = 0; (vert ? x0 : y0) + k * w < (vert ? x1 : y1); k++) for (const f of [0.15, 0.85]) { const p = (vert ? x0 : y0) + k * w + ri(w / 2), q = ri(vert ? y0 + (y1 - y0) * f : x0 + (x1 - x0) * f);
    if (vert) { R.pset(p, q, C[0]); R.pset(p - 1, q - 1, C[3]); } else { R.pset(q, p, C[0]); R.pset(q - 1, p - 1, C[3]); } } };
// ladrillos con juntas (C: junta, S, M, L)
const ladrillos = (x0, y0, x1, y1, C, sem, h = 5, w = 11) => {
  for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / h), j = (y - y0) % h, off = f % 2 ? ri(w / 2) : 0;
    for (let x = x0; x <= x1; x++) { const k = Math.floor((x - x0 + off) / w), i = (x - x0 + off) % w;
      if (j === h - 1 || i === w - 1) { R.pset(x, y, C[0]); continue; }
      R.pset(x, y, tono(C, 1.5 + (hh(k, f, sem) - 0.5) * 1.4 + (j === 0 ? 0.6 : j === h - 2 ? -0.5 : 0) + hh(x, y, sem) * 0.35, x, y)); } } };
// copa redonda en racimos de tres tonos que se mece (cols D, S, M, L)
const copa = (cx, cy, w, h, t, cols, sem, v = 1) => {
  for (let k = 0; k < 9; k++) { const x = cx + (hh(k, 1, sem) - 0.5) * w, y = cy + (hh(k, 2, sem) - 0.5) * h, m = ri(Math.sin(t * 1.6 + k) * v * 0.8), r = ri(w * 0.2 + hh(k, 3, sem) * w * 0.08);
    R.disco(ri(x) + m, ri(y) + 1, r, cols[0]); R.disco(ri(x) + m - 1, ri(y) - 1, r - 1, cols[1]); R.disco(ri(x) + m - 2, ri(y) - 3, Math.max(1, ri(r * 0.5)), cols[2]); }
  for (let k = 0; k < w * 2; k++) { const x = cx + (hh(k, 4, sem) - 0.5) * w * 1.1, y = cy + (hh(k, 5, sem) - 0.5) * h * 1.1, m = ri(Math.sin(t * 1.6 + k) * v);
    if (Math.hypot((x - cx) / (w * 0.55), (y - cy) / (h * 0.55)) < 1) ps(ri(x) + m, ri(y), y < cy - h * 0.15 && x < cx ? cols[3] : k % 3 ? cols[2] : cols[0]); } };
// lo que se ve por un hueco: f dibuja en un búfer aparte y se pega solo dentro de [x0, y0, x1, y1]
const TMP = R.nuevo(), TMP2 = R.nuevo();
const porHueco = (x0, y0, x1, y1, f) => { TMP.fill(0); const prev = R.usar(TMP); f(); R.usar(prev); const D = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const i = y * 320 + x, v = TMP[i]; if (v) D[i] = v; } };
// pinta f aparte y lo pega como silueta de color c (solo dentro de [x0, y0, x1, y1])
const silueta = (x0, y0, x1, y1, c, f, borde = null) => { TMP2.fill(0); const prev = R.usar(TMP2); const r = f(); R.usar(prev); const D = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const i = y * 320 + x; if (!TMP2[i]) continue;
    D[i] = borde && (!TMP2[i - 1] || !TMP2[i - 320]) ? borde : c; } return r; };
// cifras de 3 × 5 (para lo escrito a mano)
const DIG = { 0: '###,#.#,#.#,#.#,###', 1: '.#.,##.,.#.,.#.,###', 2: '##.,..#,.#.,#..,###', 3: '##.,..#,.#.,..#,##.', 4: '#.#,#.#,###,..#,..#', 5: '###,#..,##.,..#,##.', 6: '.##,#..,###,#.#,###', 7: '###,..#,.#.,.#.,.#.', 8: '###,#.#,###,#.#,###', 9: '###,#.#,###,..#,##.' };
const cifras = (s, x, y, c, n = 99, e = 1) => { let k = 0; for (const ch of String(s)) { if (k >= n) break; if (ch !== ' ') { const g = DIG[ch]; if (g) g.split(',').forEach((f, j) => [...f].forEach((q, i) => { if (q === '#') for (let a = 0; a < e; a++) for (let b = 0; b < e; b++) ps(x + i * e + a, y + j * e + b, c); })); } x += 4 * e; k++; } };
// una herradura oxidada (centro x, y)
const herradura = (x, y, c = pal('#3a2418', '#7a4428', '#a86a3a')) => { for (let a = 0.2; a < Math.PI * 1.8; a += 0.08) { const X = ri(x + Math.sin(a) * 6), Y = ri(y - Math.cos(a) * 6); ps(X, Y, c[1]); ps(X + 1, Y, c[0]); ps(X, Y - 1, a < 2 ? c[2] : c[1]); }
  ps(x - 4, y - 3, c[0]); ps(x + 4, y - 3, c[0]); ps(x - 5, y + 1, c[0]); ps(x + 5, y + 1, c[0]); };
// el farol de mano (asa en x, y)
const farol = (x, y, t, a = 1) => { x = ri(x); y = ri(y); const fl = 0.9 + Math.sin(t * 11) * 0.06 + Math.sin(t * 17) * 0.04;
  halo(x, y + 6, 30, hex('#ffc870'), 0.42 * a * fl);
  R.linea(x - 2, y - 1, x + 2, y - 1, K); ps(x - 3, y, K); ps(x + 3, y, K);
  R.rect(x - 3, y + 1, x + 3, y + 2, hex('#2a1e14')); R.rect(x - 3, y + 3, x + 3, y + 9, hex('#2a1e14')); R.rect(x - 2, y + 3, x + 2, y + 9, hex('#ffe6a0')); R.rect(x - 1, y + 4, x + 1, y + 8, hex('#fff8e0'));
  ps(x, y + 6 + (Math.sin(t * 13) > 0 ? 0 : 1), hex('#ff9a30')); R.rect(x - 4, y + 10, x + 4, y + 11, hex('#2a1e14')); };
// una llave dorada (anilla a la izquierda)
const llave = (x, y, s = 1) => { const O = ORO; x = ri(x); y = ri(y);
  for (let j = -3 * s; j <= 3 * s; j++) for (let i = -3 * s; i <= 3 * s; i++) { const r = Math.hypot(i, j) / s; if (r > 3.4 || r < 1.4) continue; ps(x + i, y + j, r > 2.9 ? O[0] : j < 0 ? O[3] : O[2]); }
  R.rect(x + 3 * s, y - s, x + 13 * s, y + s, O[1]); R.rect(x + 3 * s, y - s, x + 13 * s, y - s, O[3]); R.rect(x + 3 * s, y + s, x + 13 * s, y + s, O[0]);
  R.rect(x + 9 * s, y + s, x + 10 * s, y + 3 * s, O[1]); R.rect(x + 12 * s, y + s, x + 13 * s, y + 4 * s, O[1]); };
// corazón pequeño
const corazon = (x, y, c = hex('#e8506a')) => { x = ri(x); y = ri(y); ['.kk.kk.', 'kcckcck', 'kcccccl', 'kcccccl', '.kcccl.', '..kcl..', '...k...'].forEach((f, j) => [...f].forEach((ch, i) => { if (ch !== '.') ps(x + i, y + j, ch === 'k' ? K : ch === 'l' ? mez(c, K, 0.35) : c); })); ps(x + 1, y + 1, mez(c, hex('#ffffff'), 0.6)); };
// el detector de metales: vara desde la mano (mx, my) hasta el plato (dx, dy) en el suelo; pita: la luz y las ondas
const detector = (mx, my, dx, dy, pita, t) => { for (const d of [-1, 0, 1]) R.linea(ri(mx) + d, ri(my), ri(dx) + d, ri(dy - 3), d ? K : hex('#b8c0c8'));
  const bx = ri(lerp(mx, dx, 0.25)), by = ri(lerp(my, dy, 0.25)); R.rect(bx - 4, by - 3, bx + 4, by + 2, K); R.rect(bx - 3, by - 2, bx + 3, by + 1, hex('#3a3a44')); R.rect(bx - 1, by - 1, bx + 1, by, pita && Math.floor(t * 12) % 2 ? hex('#ff3a2a') : hex('#5a1a14'));
  for (let j = -2; j <= 1; j++) for (let i = -8; i <= 8; i++) { const e = (i / 8) ** 2 + (j / 2.5) ** 2; if (e <= 1) ps(dx + i, dy + j, e > 0.6 ? K : j < 0 ? hex('#e8c020') : hex('#2a2a30')); }
  if (pita) for (let k = 0; k < 3; k++) { const r = 6 + ((t * 14 + k * 4) % 12); for (let a = -2.5; a < -0.6; a += 0.1) tine(dx + Math.cos(a) * r, dy - 4 + Math.sin(a) * r, hex('#fff070'), 0.9); } };
// el cielo de día tramado (en una capa)
const cieloDia = (y1) => { const C = pal('#4a7ac8', '#6a96d8', '#8eb4e6', '#b8d2f0', '#dce8f6'); for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(C, (y / y1) * 3.6 + hh(x >> 3, y >> 2, 3) * 0.5, x, y)); };
const NUBES = [pal('#9aaccc', '#d8e2f0', '#ffffff'), pal('#a8b8d4', '#e2eaf4', '#ffffff'), pal('#b8c6dc', '#eef2f8', '#ffffff')];
const nubes3 = (t, y0, xmax = 320) => { for (let k = 0; k < 3; k++) for (let n = 0; n < 2; n++) { const v = [1.5, 3, 5.5][k], w = [70, 44, 24][k] - n * 8, sp = 420;
  const x = ((hh(k, n, 9) * sp + t * v) % sp) - 60; if (x - w / 2 > xmax) continue; nube(x, y0 + k * 9 + n * 5 + hh(k, n, 2) * 6, w, NUBES[k], k * 5 + n); } };
'''

CAB = '''// BL-CIERRE (frases 29–31). Catorce planos cortados en la voz inglesa:
// 1. (0) el corte del terreno de Bedford de día (fondo local): arriba el bosque de otoño, abajo raíces, piedras, un topo y
//    una herradura; Atom luciérnaga baja a la tierra en «nothing»; en «underground» se dibuja en oro la cámara soñada con
//    sus ollas, que se deshace en «Nobody has proven»; en «completely» Atom se encoge con un «?»;
// 2. («There are still people») la mesa de un aficionado de hoy de noche (fondo local): en el portátil dos avatares se
//    discuten a bocadillos; la mano canónica recorre la tira de Gillogly en «alphabet run»; en «clue» brilla una llave
//    dorada con «!» y en «trap» salta la ratonera sobre la punta de la tira, con su «X»;
// 3. («and people who still spend») el bosque de Bedford hoy, de día: el aficionado con gorra barre el sendero con el
//    detector y su perro detrás; en «detector» pita; cava y en «Montvale» saca una herradura vieja; Atom, junto al tronco,
//    lo mira con el folleto en la mano y se ríe;
// 4. («But if you ask me») el tablero de corcho de Atom (fondo local): las tres hojas, la caja, el mapa, la bola de
//    cristal, la pala y «1822» unidos con hilos rojos; en «everything we've seen» una luz los recorre uno a uno con Atom
//    luciérnaga detrás; en «most likely answer» todos los hilos tiran hacia el folleto del centro, que se enciende;
// 5. («Beale's treasure») el suelo del bosque de cerca (fondo local): Atom a escala 2 señala los hoyos viejos, que se
//    tachan en «forest»; en «inside» saca el folleto, se abre en «50» y en «pamphlet» sale de él la luz del oro; lo
//    cierra y se lo guarda;
// 6. («Now go back», 1885) Lynchburg de noche: el sereno con su farol cruza la acera y se para bajo la ventana encendida;
//    en «who» sale una gran «?» sobre la ventana y en «numbers» salen volando 71, 194 y 38; una pareja sale de la posada;
// 7. («Most likely someone») la ventana encendida de cerca (fondo local): dentro, la silueta sin cara escribe números con
//    la pluma mirando el pergamino; las cifras aparecen en su palabra; en «gold» brilla una moneda en la mesa;
// 8. («an iron box») el escritorio a la vela de cerca (fondo local): la mano canónica deja la caja de hierro en «iron
//    box» y las dos hojas sin resolver en «two unsolved pages» («?»); en «can't leave alone» entreabre la tapa y sale luz;
// 9. («and that 140 years later») el mapa de Virginia: la chincheta de Lynchburg; el «140» cuenta y la barra pasa de 1885
//    a 2026; en «someone, somewhere in Virginia» se encienden faroles con su pala por todo el estado;
// 10. («pick up a shovel», 2026) un cobertizo al amanecer (fondo local): una vecina descuelga la pala en «pick», se la
//    echa al hombro y sale por la puerta abierta hacia la camioneta; el perro se despierta y la sigue;
// 11. («but the urge to search») el bosque de noche del primer plano, ya sin la hoja: faroles de buscadores entre los
//    árboles; Atom luciérnaga flota donde estaba la hoja; en «inside us» le late un corazón y se dibuja el contorno de la
//    hoja, que se apaga;
// 12. («And you») la mesa del espectador desde arriba (fondo local): dos manos suben las hojas 1 y 3; «?» en
//    «unsolved»; tiemblan en «hands»;
// 13. («counting the words») el estudio de Atom con la pizarra: el pergamino de tiza que se cuenta palabra a palabra
//    1, 2, 3…; en «trap» salta la ratonera de tiza; Atom señala uno y otra y se vuelve a cámara;
// 14. («Tell me in the comments») la mesa del estudio de cerca: Atom a escala 2 cierra el folleto en «Tell», mira a
//    cámara, en «comments» señala abajo a la derecha, sale el bocadillo y guiña en «curious».'''

CUERPO = r'''
// ── 1 · el corte del terreno de día ──────────────────────────────────────────────────────────────────────────────
const SUP = 78;
const corte = () => capa('corte', () => {
  cieloDia(70);
  // los picos de Otter lejos
  for (let x = 0; x < 320; x++) { const a = Math.max(0, 30 - Math.abs(x - 118) * 0.62, 20 - Math.abs(x - 196) * 0.3, 8 - Math.abs(x - 40) * 0.12) + Math.sin(x * 0.4) * 0.8;
    for (let y = ri(66 - a); y <= 66; y++) R.pset(x, y, tono(pal('#4a5a7a', '#5e6e8e', '#7888a4', '#98a6bc'), (x < 118 ? 2.2 : 1.4) + hh(x >> 1, y >> 1, 4) * 0.8 - (y - (66 - a)) * 0.02, x, y)); }
  // la línea de árboles de otoño
  for (let k = 0; k < 64; k++) { const x = k * 5 + hh(k, 1) * 4, y = 70 + hh(k, 2) * 3, r = 4 + ri(hh(k, 3) * 3), c = [pal('#5a3a1e', '#8a4a20', '#c86a28'), pal('#3a4a24', '#4e6a2e', '#7a8a3a'), pal('#6a2a1e', '#a83a24', '#d8603a')][k % 3];
    R.disco(ri(x), ri(y), r, c[0]); R.disco(ri(x) - 1, ri(y) - 1, r - 1, c[1]); R.disco(ri(x) - 2, ri(y) - 2, Math.max(1, r - 3), c[2]); }
  // el suelo: hierba y hojarasca en la superficie
  for (let x = 0; x < 320; x++) for (let y = 72; y < SUP + 2; y++) { const v = hh(x, y, 7); R.pset(x, y, y < SUP - 2 ? (v > 0.6 ? hex('#6a8a3a') : v > 0.3 ? hex('#4e6e2e') : hex('#8a6a30')) : v > 0.7 ? hex('#c86a28') : v > 0.4 ? hex('#a8501e') : hex('#7a3a18')); }
  for (let k = 0; k < 90; k++) { const x = ri(hh(k, 5) * 320), h = 2 + ri(hh(k, 6) * 4); R.linea(x, 74, x + (k % 2 ? 1 : -1), 74 - h, hh(k, 7) > 0.5 ? hex('#7a9a3e') : hex('#5a7a30')); }
  // las capas: humus, arcilla, grava y la roca madre, con el borde ondulado
  const L = [[SUP + 2, pal('#24160e', '#3a2618', '#4e3220', '#64422a')], [104, pal('#5a3218', '#7a4a28', '#9a6034', '#b87a44')], [134, pal('#4a4036', '#62584a', '#7a6e5e', '#968a76')], [160, pal('#3a3a42', '#4a4a52', '#5e5e66', '#76767e')]];
  for (let x = 0; x < 320; x++) { const b = [SUP + 2, 104 + ri(Math.sin(x * 0.05) * 3 + Math.sin(x * 0.17) * 1.5), 134 + ri(Math.sin(x * 0.04 + 1) * 4), 160 + ri(Math.sin(x * 0.06 + 2) * 3 + hh(x >> 2, 1) * 2)];
    for (let y = SUP + 2; y < 180; y++) { let k = 0; for (let i = 0; i < 4; i++) if (y >= b[i]) k = i; const C = L[k][1], edge = y === b[k] && k > 0;
      R.pset(x, y, edge ? C[0] : tono(C, 1.3 + hh(x >> 1, y >> 1, k) * 1.3 + (k === 3 && Math.sin(x * 0.3 + y * 0.9) > 0.92 ? -1.2 : 0), x, y)); } }
  // piedras en la grava y en la arcilla
  for (let k = 0; k < 46; k++) { const x = ri(hh(k, 11) * 320), y = ri(108 + hh(k, 12) * 50), w = 2 + ri(hh(k, 13) * 4), h = 1 + ri(hh(k, 14) * 2);
    for (let j = -h; j <= h; j++) for (let i = -w; i <= w; i++) { const e = (i / w) ** 2 + (j / h) ** 2; if (e > 1) continue; R.pset(x + i, y + j, e > 0.6 ? hex('#3a3430') : j < 0 ? hex('#b8aa96') : hex('#8a7e6e')); } }
  // grietas en la roca y una concha fósil
  for (let k = 0; k < 6; k++) { let x = 20 + k * 52, y = 163; for (let s = 0; s < 8; s++) { const nx = x + 3 + ri(hh(k, s) * 4), ny = y + ri((hh(s, k) - 0.4) * 5); R.linea(x, y, nx, Math.min(179, ny), hex('#26262e')); x = nx; y = Math.min(178, ny); } }
  for (let a = 0; a < 12; a += 0.25) ps(268 + Math.cos(a) * a * 0.5, 170 + Math.sin(a) * a * 0.5, hex('#a8a29a'));
  // los troncos con sus raíces que bajan por la tierra
  for (const [tx, w] of [[54, 7], [238, 6]]) {
    for (let y = 40; y < SUP + 2; y++) for (let i = -w; i <= w; i++) { const bark = Math.sin(y * 0.7 + i * 1.3) > 0.6; R.pset(tx + i, y, i < -w + 2 ? hex('#7a5a3e') : i > w - 2 ? hex('#2a1c12') : bark ? hex('#3a2a1c') : hex('#5a4230')); }
    for (let r = 0; r < 7; r++) { let x = tx + (r - 3) * 2, y = SUP + 1; const dir = (r - 3) * 0.5 + (hh(r, tx) - 0.5); for (let s = 0; s < 26 - Math.abs(r - 3) * 3; s++) { const nx = x + dir + (hh(s, r, tx) - 0.5) * 2, ny = y + 1.2; R.linea(ri(x), ri(y), ri(nx), ri(ny), hex('#2a1a10')); ps(nx - 1, ny, hex('#5a3a22')); x = nx; y = ny; if (s % 7 === 6) R.linea(ri(x), ri(y), ri(x + dir * 4 + 3), ri(y + 3), hex('#3a2416')); } } }
  // lo que de verdad hay bajo tierra: una herradura, una chapa, una lata vieja y un botón
  herradura(112, 118); R.disco(176, 94, 2, hex('#8a8a92')); ps(175, 93, hex('#d8d8e0')); ps(176, 94, hex('#c83a2a'));
  R.rect(198, 140, 208, 148, hex('#4a3a32')); R.rect(199, 141, 207, 147, hex('#7a5a46')); R.linea(199, 141, 207, 141, hex('#a87a5a')); ps(203, 144, hex('#3a2a22'));
  R.disco(136, 150, 1, hex('#c8b890')); ps(136, 150, K);
});
const p1 = (t) => {
  R.copiar(corte());
  nubes3(t, 22, 250);
  for (let k = 0; k < 3; k++) ave(ri(((t * 9 + k * 30) % 360) - 20), 34 + k * 4 + ri(Math.sin(t + k) * 2), t, hex('#2a3040'), k);
  copa(54, 40, 50, 24, t, pal('#5a2a14', '#a84a20', '#e07a30', '#f8b048'), 3); copa(238, 42, 46, 22, t, pal('#4a3a14', '#8a6a20', '#c8a030', '#f0d060'), 5);
  // hojas que caen de las copas hasta la superficie
  for (let k = 0; k < 6; k++) { const u = (t * 0.16 + k / 6) % 1, x0 = k % 2 ? 54 : 238, x = x0 + Math.sin(u * 9 + k) * 10 + (k - 3) * 6, y = 46 + u * (SUP - 46); ps(x, y, k % 3 ? hex('#e07a30') : hex('#f0c040')); ps(x + 1, y, hex('#a84a20')); }
  // el topo que hace su túnel por el humus
  const mx = ri(10 + ((t * 9) % 140)); for (let x = 0; x < mx; x++) ps(x, 92 + ri(Math.sin(x * 0.08) * 2), hex('#1a0e08'));
  R.disco(mx, 92 + ri(Math.sin(mx * 0.08) * 2), 3, hex('#2a2a30')); R.disco(mx + 1, 91 + ri(Math.sin(mx * 0.08) * 2), 2, hex('#3e3e46')); ps(mx + 4, 92 + ri(Math.sin(mx * 0.08) * 2), hex('#e88aa0'));
  // la lombriz que se retuerce
  for (let i = 0; i < 9; i++) ps(260 + i, 96 + ri(Math.sin(t * 4 + i * 0.8) * 1.5), i === 8 ? hex('#f0a0a8') : hex('#c8707a'));
  // la cámara soñada: aparece dorada en «underground» y se deshace desde «Nobody»
  const sueno = tramo(t, W.UNDER - 0.1, W.UNDER + 0.4) * (1 - tramo(t, W.NOBODY, W.COMPLETELY));
  if (sueno > 0) { const cx0 = 150, cy0 = 138, cx1 = 236, cy1 = 172;
    for (let x = cx0; x <= cx1; x++) for (const y of [cy0, cy1]) if ((x >> 1) % 2 && hh(x, y, 3) < sueno) ps(x, y, ORO[2]);
    for (let y = cy0; y <= cy1; y++) for (const x of [cx0, cx1]) if ((y >> 1) % 2 && hh(x, y, 3) < sueno) ps(x, y, ORO[2]);
    for (const ox of [168, 193, 218]) for (let a = 0; a < 6.28; a += 0.2) if (hh(ox, a * 10) < sueno) ps(ox + Math.cos(a) * 8, 162 + Math.sin(a) * 7, ORO[3]);
    if (sueno > 0.5) chispas(193, 156, t, 6, 30, ORO[3], 2); }
  // Atom luciérnaga: baja a la tierra en «nothing» y busca
  const u1 = ease(tramo(t, W.NOTHING - 0.3, W.UNDER + 0.3)), u2 = ease(tramo(t, W.BEDFORD, W.PROVEN));
  let ax = lerp(lerp(70, 128, u1), 196, u2), ay = lerp(lerp(52, 120, u1), 128, u2) + Math.sin(t * 3) * 2;
  if (t > W.PROVEN) ax += Math.sin((t - W.PROVEN) * 2.2) * 14;
  halo(ax, ay, 26, hex('#ffe890'), t > W.NOTHING ? 0.35 : 0.2);
  T.AT.luciernaga(R, ri(ax), ri(ay), t, { dir: t > W.PROVEN && Math.cos((t - W.PROVEN) * 2.2) < 0 ? -1 : 1, brillo: 1, cara: t > W.COMPLETELY - 0.1 ? 'triste' : t > W.UNDER ? 'sorpresa' : 'normal' });
  if (t > W.COMPLETELY - 0.1) { const u = tramo(t, W.COMPLETELY - 0.1, W.COMPLETELY + 0.25); R.icono('?', ri(ax) - 7, ri(ay - 30 - u * 4), hex('#fff0a0'), K, 3); }
};

// ── 2 · la mesa del aficionado de hoy, de noche ───────────────────────────────────────────────────────────────────
const MESA2 = 112, TX = 40, TY = 126, TIRA = 'abfdefghiijklmmnohpp';
const mesa2 = () => capa('mesa2', () => {
  // la pared de yeso azul de noche, con su trama, el zócalo y un enchufe
  for (let y = 0; y < MESA2; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#1e2232', '#262c40', '#30384e', '#3a4460'), 1.2 + hh(x >> 2, y >> 3, 2) * 0.7 + (Math.sin(x * 0.9 + y * 0.03) > 0.97 ? 0.6 : 0) - (x > 270 && y < 50 ? 0.4 : 0), x, y));
  // el póster de un mapa del condado, sin letras
  R.rect(24, 26, 74, 70, hex('#14121a')); R.rect(26, 28, 72, 68, hex('#d8ccaa')); for (let y = 30; y < 67; y++) for (let x = 28; x < 71; x++) if (Math.sin(x * 0.12 + y * 0.08) + Math.sin(y * 0.2) * 0.6 > 0.4) R.pset(x, y, tono(pal('#6a8a5a', '#8aa06a', '#a8b880'), 1 + hh(x, y) * 1.2, x, y));
  R.linea(28, 56, 70, 40, hex('#5a7ab8')); R.linea(28, 57, 70, 41, hex('#7a9ad0')); for (const [x, y] of [[40, 48], [52, 44], [61, 58]]) { R.disco(x, y, 1, hex('#d83a2a')); } R.icono('X', 47, 52, hex('#d83a2a'), K, 1);
  // la ventana de noche (el cielo lo pinta cada fotograma)
  R.rect(90, 16, 152, 86, hex('#14121a')); R.rect(92, 18, 150, 84, hex('#c8c0b0')); R.rect(94, 20, 148, 82, hex('#0e1424'));
  R.rect(88, 86, 154, 90, hex('#b8b0a0')); R.linea(88, 86, 154, 86, hex('#e8e0d0'));
  // la estantería con libros, una pala de juguete y la caja del detector
  R.rect(162, 52, 268, 55, hex('#6a4a2a')); R.linea(162, 52, 268, 52, hex('#9a7a4a')); R.rect(162, 56, 268, 57, hex('#1a1420'));
  let bx = 166; for (let k = 0; k < 14; k++) { const w = 3 + ri(hh(k, 1) * 3), h = 12 + ri(hh(k, 2) * 9), c = pal('#8a2a2a', '#2a4a7a', '#3a6a3a', '#a8782a', '#5a3a6a')[k % 5];
    R.rect(bx, 51 - h, bx + w - 1, 51, c); R.linea(bx, 51 - h, bx, 51, mez(c, hex('#ffffff'), 0.25)); R.linea(bx, 47 - h + 6, bx + w - 1, 47 - h + 6, ORO[1]); bx += w + (k === 6 ? 14 : 0); }
  R.rect(205, 38, 214, 51, hex('#2a2a34')); R.rect(206, 39, 213, 50, hex('#c84a2a')); R.disco(209, 44, 2, hex('#f0c040'));
  // el canto de la mesa y su tablero de nogal
  tablas(0, MESA2, 319, 162, pal('#3a2414', '#5a3a22', '#7a5230', '#9a6c40'), 9, 4, false, false);
  R.rect(0, 163, 319, 167, hex('#2a1a10')); R.linea(0, 163, 319, 163, hex('#b08050')); tablas(0, 168, 319, 179, pal('#24160c', '#3a2414', '#4e321c', '#6a4628'), 30, 6, true, false);
  for (const x of [80, 240]) { R.rect(x - 6, 172, x + 6, 174, hex('#8a6a3a')); R.linea(x - 6, 172, x + 6, 172, hex('#d8b070')); }
  // la lámpara de flexo a la izquierda (su cono lo pinta cada fotograma), libreta y bolígrafo
  R.rect(10, 121, 32, 125, hex('#1e1e24')); R.linea(11, 121, 31, 121, hex('#6a6a74'));
  for (const [a, b, c, d] of [[20, 121, 24, 94], [24, 94, 38, 86]]) { R.linea(a, b, c, d, hex('#2a2a32')); R.linea(a + 1, b, c + 1, d, hex('#7a7a84')); }
  R.disco(24, 94, 2, hex('#3a3a44')); ps(23, 93, hex('#9a9aa4'));
  R.poligono([[34, 82], [50, 87], [47, 98], [31, 92]], hex('#1e4a34')); R.poligono([[35, 83], [49, 88], [46, 95], [33, 90]], hex('#2a6a4a')); R.linea(35, 83, 49, 88, hex('#5aaa7a'));
  // la foto del roble enmarcada, el calendario de 2026 y la guirnalda de lucecitas sobre la estantería
  R.rect(54, 76, 86, 104, hex('#14121a')); R.rect(56, 78, 84, 102, hex('#e8e2d0')); R.rect(58, 80, 82, 96, hex('#8ab8e0')); R.rect(58, 90, 82, 96, hex('#5a8a3a'));
  R.rect(69, 84, 71, 94, hex('#4a3020')); R.disco(70, 84, 6, hex('#3a6a2a')); R.disco(68, 82, 3, hex('#5a8a3a'));
  R.rect(160, 62, 192, 104, hex('#14121a')); R.rect(161, 63, 191, 103, hex('#f2ecdc')); R.rect(161, 63, 191, 70, hex('#c83a2a')); cifras('2026', 168, 64, hex('#ffffff'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) { R.rect(164 + i * 4, 74 + j * 7, 166 + i * 4, 76 + j * 7, hex('#b8b0a0')); } R.icono('X', 183, 93, hex('#d83a2a'), null, 1);
  R.rect(158, 108, 166, 112, hex('#e8e0d0')); ps(161, 110, K); ps(163, 110, K);
  R.rect(244, 148, 280, 160, hex('#e8e2d0')); for (let y = 151; y < 159; y += 3) R.linea(247, y, 276, y, hex('#a8b8d0')); R.linea(250, 146, 270, 158, hex('#2a4aa8'));
  // el portátil (la pantalla la pinta cada fotograma)
  R.poligono([[196, 124], [292, 124], [302, 136], [186, 136]], hex('#4a4e5a')); R.linea(196, 124, 292, 124, hex('#8a8e9a'));
  for (let j = 0; j < 3; j++) for (let i = 0; i < 12; i++) R.rect(198 + i * 8 + j * 2, 127 + j * 3, 203 + i * 8 + j * 2, 128 + j * 3, hex('#2a2e38'));
  R.rect(200, 70, 288, 124, hex('#2a2e38')); R.rect(202, 72, 286, 121, hex('#101420'));
});
const avatar = (x, y, c) => { R.disco(x, y, 5, c); R.disco(x, y - 1, 2, hex('#f0d0b0')); R.rect(x - 3, y + 2, x + 3, y + 4, mez(c, K, 0.3)); };
const bocadillo = (x, y, u, f) => { if (u <= 0) return; const w = ri(30 * u), h = 12; R.rect(x - 1, y - 1, x + w + 1, y + h + 1, hex('#6a7aa0')); R.rect(x, y, x + w, y + h, hex('#e8eef8')); ps(x - 2, y + 8, hex('#e8eef8')); ps(x - 3, y + 9, hex('#6a7aa0')); if (u > 0.9) f(x + 4, y + 2); };
const ratonera = (x, y, cierra, t) => { R.rect(x, y, x + 36, y + 6, hex('#3a2414')); R.rect(x, y, x + 36, y + 4, hex('#c89a5a')); R.linea(x, y, x + 36, y, hex('#e8c080')); for (let i = 4; i < 34; i += 7) ps(x + i, y + 2, hex('#a87a40'));
  R.disco(x + 26, y + 1, 3, hex('#f0c020')); ps(x + 25, y, hex('#fff070')); R.linea(x + 12, y + 1, x + 22, y + 1, hex('#8a8a92'));
  const a = cierra < 1 ? lerp(Math.PI * 0.95, 0.05, ease(cierra)) : 0.05 + (Math.sin(t * 40) * 0.05 * Math.max(0, 1 - (t - W.TRAP) * 2));
  const hx = x + 18, L = 16, ex = hx + Math.cos(a) * L, ey = y - Math.sin(a) * L * 0.6; R.linea(hx, y, ri(ex), ri(ey), hex('#c8ccd4')); R.linea(hx, y - 1, ri(ex), ri(ey) - 1, hex('#6a6e78'));
  R.linea(hx, y, hx - 4, y - 2, hex('#c8ccd4')); };
const p2 = (t) => {
  R.copiar(mesa2());
  // por la ventana: la luna, nubes y la rama que se mece (recortado al hueco)
  porHueco(94, 20, 148, 82, () => { for (let y = 20; y <= 82; y++) for (let x = 94; x <= 148; x++) R.pset(x, y, tono(pal('#0a0e1c', '#141c30', '#1e2842'), (y - 20) / 30 + hh(x >> 2, y >> 2) * 0.5, x, y));
    for (let k = 0; k < 9; k++) ps(96 + hh(k, 1) * 50, 22 + hh(k, 2) * 30, Math.sin(t * 3 + k) > 0 ? hex('#ffffff') : hex('#8a92b0'));
    R.disco(132, 34, 6, hex('#e8ecd8')); R.disco(130, 33, 2, hex('#c8ccb8'));
    nube(((t * 3) % 90) + 80, 44, 30, pal('#1a2234', '#2a3448', '#3a4660'), 2);
    for (let y = 60; y <= 82; y++) for (let x = 94; x <= 148; x++) if (y > 76 - Math.sin(x * 0.2) * 3 - (x > 120 ? 6 : 0)) R.pset(x, y, hex('#0a0c14'));
    const m = Math.sin(t * 1.3) * 2; R.linea(94, 50, 118, 58 + m, hex('#0c0a10')); for (let k = 0; k < 8; k++) R.disco(ri(100 + k * 3), ri(54 + m * k / 8 + hh(k, 3) * 4), 2, hex('#0e1018')); });
  R.rect(120, 18, 122, 84, hex('#c8c0b0')); R.rect(92, 50, 150, 52, hex('#c8c0b0'));
  // el cono de la lámpara y la luz en la mesa
  const fl = 0.95 + Math.sin(t * 13) * 0.03; halo(46, 118, 64, hex('#ffe0a0'), 0.38 * fl); R.disco(40, 96, 2, hex('#fff8d0'));
  for (let k = 0; k < 12; k++) { const x = 166 + k * 9, y = 22 + ri(Math.sin(k * 0.9) * 2 + 3); if (k) R.linea(x - 9, 22 + ri(Math.sin((k - 1) * 0.9) * 2 + 3), x, y, hex('#3a3a2a')); const on = Math.sin(t * 2.5 + k * 1.7) > -0.2; R.disco(x, y + 2, 1, on ? pal('#ffd060', '#ff7a6a', '#7ad0ff')[k % 3] : hex('#5a5040')); if (on) tine(x, y + 4, hex('#ffe0a0'), 0.4); }
  // la pantalla: dos avatares que discuten a bocadillos
  for (let y = 72; y <= 121; y++) for (let x = 202; x <= 286; x++) if ((y & 3) === 0) R.pset(x, y, hex('#141a2a'));
  avatar(212, 84, hex('#3a8a5a')); avatar(212, 106, hex('#c84a3a'));
  bocadillo(222, 78, tramo(t, W.ARGUE - 0.1, W.ARGUE + 0.2), (x, y) => llave(x + 2, y + 4, 1));
  bocadillo(222, 100, tramo(t, W.GILL - 0.1, W.GILL + 0.2), (x, y) => R.icono('X', x + 8, y + 1, hex('#e84a3a'), K, 1));
  if (t > W.CLUE) { R.icono('!', 258, 80, hex('#58d88a'), K, 1); } if (t > W.TRAP) R.icono('!', 258, 102, hex('#e86a5a'), K, 1);
  if (Math.floor(t * 2) % 2) R.rect(276, 114, 279, 116, hex('#8ab8e8'));
  halo(244, 100, 40, hex('#6a8ac8'), 0.12);
  // la taza que humea
  R.rect(60, 128, 72, 142, hex('#2a2a34')); R.rect(61, 129, 71, 141, hex('#c84a3a')); R.linea(61, 129, 61, 141, hex('#e87a6a')); R.rect(62, 129, 70, 130, hex('#3a2010'));
  R.linea(73, 132, 76, 134, hex('#2a2a34')); R.linea(76, 134, 73, 138, hex('#2a2a34'));
  for (let k = 0; k < 6; k++) { const u = (t * 0.6 + k / 6) % 1; tine(66 + Math.sin(u * 7 + k) * 3, 126 - u * 20, hex('#e8e8f0'), 0.5 * (1 - u)); }
  // la tira de Gillogly sobre la mesa, la ratonera en su punta y la llave
  const ti = T.d_tira(R, TX, TY, TIRA, { escala: 1, n: 20, t, marca: t > W.ALPHA + 0.8 });
  ratonera(198, 140, tramo(t, W.TRAP - 0.08, W.TRAP + 0.06), t);
  if (t > W.TRAP) { const u = tramo(t, W.TRAP, W.TRAP + 0.25); R.icono('X', 207, ri(118 - u * 4), hex('#e84a3a'), K, 3); for (let k = 0; k < 5; k++) tine(216 + k * 3 - 6, 138 - u * 8, hex('#f8f0d0'), 0.6 * (1 - u)); }
  if (t > W.CLUE - 0.05) { const u = tramo(t, W.CLUE - 0.05, W.CLUE + 0.3), y = ri(112 - u * 6); halo(76, y, 22, hex('#ffe070'), 0.5 * u); llave(68, y, 2); chispas(80, y, t, 6, 16, ORO[3], 3); R.icono('!', 100, y - 14, hex('#fff0a0'), K, 2); }
  // la mano canónica recorre las letras en «alphabet run»
  const L = ti && ti.letras ? ti.letras : null, ent = tramo(t, W.GILL - 0.4, W.ALPHA - 0.1), sal = tramo(t, W.CLUE - 0.2, W.CLUE + 0.4);
  if (ent > 0 && sal < 1 && L) { const k = Math.min(10, Math.floor(tramo(t, W.ALPHA - 0.1, W.CLUE - 0.2) * 11)), [lx, ly] = L[k], f = ease(ent) * (1 - ease(sal));
    const hx = ri(lerp(-20, lx - 12, f)), hy = ri(lerp(200, ly + 10, f));
    T.brazo(R, hx - 30, hy + 44, hx, hy, '#4a5a7a', 1, { codo: [hx - 26, hy + 18] }); }
};

// ── 3 · el bosque de Bedford hoy: el aficionado con su detector ──────────────────────────────────────────────────────
const p3 = (t) => {
  const o = { encuadre: 'bosque', hoy: true }; T.bedford(R, t, o);
  const va = ease(tramo(t, W.AND1 + 0.1, W.DETECTOR - 0.1)), x = ri(lerp(30, 112, va)), anda = va > 0 && va < 1;
  const pita = t > W.DETECTOR && t < W.TREES, cava = t > W.TREES - 0.1 && t < W.MONT, saca = t > W.MONT - 0.05, sigue = tramo(t, W.MONT + 1.0, W.BUT + 0.5);
  const xb = x + ri(ease(sigue) * 60);
  // el perro que le sigue y olfatea
  R.perro(xb - 20 + ri(Math.sin(t * 2) * 2), 150, t, { dir: 1, anda: anda || (sigue > 0 && sigue < 1) });
  const barre = anda || (sigue > 0 && sigue < 1) ? Math.sin(t * 4) * 7 : pita ? Math.sin(t * 9) * 2 : 0;
  const a = R.actor(T.BL.buscadorBL, xb, 150, t, { dir: 1, anda: anda || (sigue > 0 && sigue < 1), sostiene: saca && t < W.MONT + 1.0 ? [xb + 12, 122] : cava ? [xb + 15, 141] : [xb + 14, 136], sorpresa: pita, triste: saca && t < W.MONT + 1.0 });
  if (a && a.mano) { const [mx, my] = a.mano;
    if (cava) { const d = Math.sin(t * 14) * 2; R.linea(ri(mx), ri(my), ri(mx + 4), ri(my + 7 + d), hex('#8a8a92')); R.rect(ri(mx + 3), ri(my + 7 + d), ri(mx + 6), ri(my + 10 + d), hex('#b8bcc4'));
      for (let k = 0; k < 4; k++) { const u = (t * 3 + k / 4) % 1; ps(mx + 8 + u * 8, my + 8 - Math.sin(u * 3.1) * 6, hex('#5a3a22')); } R.disco(ri(xb + 26), 150, 3, hex('#3a2416')); }
    else if (saca && t < W.MONT + 1.0) { herradura(mx + 1, my - 6); chispas(mx + 1, my - 6, t, 5, 9, ORO[3], 6); }
    if (!cava) detector(mx, my, ri(xb + 34 + barre), 148, pita, t);
    else detector(xb + 30, 140, xb + 36, 149, false, t); }
  if (pita) { const u = tramo(t, W.DETECTOR, W.DETECTOR + 0.2); R.icono('!', xb + 4, ri(112 - u * 3), hex('#fff070'), K, 2); }
  if (saca && t < W.MONT + 1.2) R.icono('?', xb + 4, 110, hex('#fff0a0'), K, 2);
  // Atom junto al tronco caído, con el folleto en la mano
  const r = T.AT.atom(R, 236, 150, t, { dir: -1, pose: 'sostiene', cara: t > W.MONT + 0.3 ? 'sonrisa' : pita ? 'sorpresa' : 'normal', habla: 0 });
  if (r && r.mano) T.d_folleto(R, ri(r.mano[0]) - 2, ri(r.mano[1]) - 5, { escala: 0.5, t });
  T.bedfordDelante(R, t, o);
};

// ── 4 · el tablero de corcho de Atom ──────────────────────────────────────────────────────────────────────────────
const CX = 158, CY = 50;   // la chincheta del folleto
const PIEZAS = [[52, 46], [80, 50], [108, 46], [60, 104], [140, 100], [214, 44], [246, 104], [196, 122]];
const corcho = () => capa('corcho', () => {
  tablas(0, 0, 319, 150, pal('#2a1c14', '#3e2a1c', '#523824', '#664830'), 16, 8, true, false);
  for (let x = 0; x < 320; x++) { R.pset(x, 18, hex('#1e140e')); R.pset(x, 17, hex('#7a5a3a')); }
  R.rect(22, 24, 270, 146, hex('#1e140e')); R.rect(23, 25, 269, 145, hex('#8a6038')); R.rect(24, 26, 268, 144, hex('#5a3a20')); R.linea(23, 25, 269, 25, hex('#b88a50'));
  for (let y = 28; y <= 142; y++) for (let x = 26; x <= 266; x++) { const v = hh(x, y, 5); R.pset(x, y, v > 0.93 ? hex('#7a4e26') : v < 0.05 ? hex('#e8c08a') : tono(pal('#a8743e', '#bc8848', '#cc9a58', '#d8aa68'), 1.4 + hh(x >> 2, y >> 2, 6) * 1.2, x, y)); }
  // la mesa de delante
  tablas(0, 150, 319, 179, pal('#2a180c', '#4a2e18', '#664024', '#845630'), 8, 9, false, false); R.linea(0, 150, 319, 150, hex('#a87a48'));
  // la caja de chinchetas, la lupa y unos libros
  R.rect(30, 156, 52, 166, hex('#2a2a34')); R.rect(31, 157, 51, 165, hex('#c8c8d0')); for (let k = 0; k < 6; k++) R.disco(34 + k * 3, 161, 1, pal('#d83a2a', '#2a6ad8', '#f0c040')[k % 3]);
  R.disco(96, 164, 7, hex('#2a2a30')); R.disco(96, 164, 5, hex('#a8c8e0')); ps(94, 162, hex('#ffffff')); R.linea(102, 168, 114, 174, hex('#5a3a20')); R.linea(102, 169, 114, 175, hex('#8a5a30'));
  for (let k = 0; k < 3; k++) { const c = pal('#7a2a2a', '#2a4a6a', '#3a5a3a')[k]; R.rect(186, 166 - k * 5, 226, 170 - k * 5, c); R.linea(186, 166 - k * 5, 226, 166 - k * 5, mez(c, hex('#ffffff'), 0.3)); R.rect(188, 167 - k * 5, 224, 169 - k * 5, mez(c, hex('#e8dcc0'), 0.6)); }
});
const tarjeta = (x0, y0, x1, y1, c = hex('#f2ecd8')) => { R.rect(x0 + 1, y0 + 1, x1 + 1, y1 + 1, hex('#6a4420')); R.rect(x0, y0, x1, y1, c); R.linea(x0, y0, x1, y0, hex('#ffffff')); };
const chin = (x, y, c) => { R.disco(x, y, 2, K); R.disco(x, y, 1, c); ps(x - 1, y - 1, hex('#ffffff')); };
const p4 = (t) => {
  R.copiar(corcho());
  const enc = (k) => tramo(t, W.EVERY - 0.3 + k * 0.28, W.EVERY + k * 0.28), todo = tramo(t, W.ANSWER - 0.2, W.ANSWER + 0.2);
  // los hilos rojos (con su comba), que se tensan en «answer»
  PIEZAS.forEach(([x, y], k) => { const cb = lerp(8, 1, todo), mx = (x + CX) / 2, my = (y + CY) / 2 + cb, c = enc(k) > 0.5 && enc(k) < 1 ? hex('#ff8a6a') : todo > 0 ? hex('#ff5a3a') : hex('#b82a2a');
    R.linea(x, y, ri(mx), ri(my), c); R.linea(ri(mx), ri(my), CX, CY, c); R.linea(x, y + 1, ri(mx), ri(my) + 1, hex('#6a1a14'));
    if (todo > 0 && todo < 1) { const u = todo; ps(lerp(x, CX, u), lerp(y, CY, u) + (1 - u) * cb, hex('#fff0a0')); } });
  // las piezas: las tres hojas, la caja, el mapa, la bola, la pala y el año
  [1, 2, 3].forEach((n, k) => { T.d_hoja(R, PIEZAS[k][0], PIEZAS[k][1] + 16, { n, escala: 1, t: t + k }); chin(PIEZAS[k][0], PIEZAS[k][1], hex('#d83a2a')); });
  tarjeta(42, 100, 80, 134); T.d_caja(R, 62, 130, { escala: 1, t }); chin(60, 104, hex('#2a6ad8'));
  tarjeta(118, 100, 162, 134, hex('#e8dcb8')); for (let y = 104; y < 132; y++) for (let x = 121; x < 160; x++) if (Math.sin(x * 0.15 + y * 0.1) + Math.sin(y * 0.3) * 0.4 > 0.2) R.pset(x, y, tono(pal('#6a8a5a', '#8aa06a', '#a8b880'), 1 + hh(x, y) * 1.3, x, y));
  R.linea(121, 124, 159, 110, hex('#4a6ab0')); R.disco(146, 118, 2, hex('#d83a2a')); chin(140, 100, hex('#f0c040'));
  tarjeta(198, 46, 232, 78); R.disco(215, 60, 10, hex('#3a2a5a')); R.disco(215, 60, 8, hex('#7a5ab8')); R.disco(212, 57, 3, hex('#c8b0f0')); R.rect(207, 70, 223, 74, hex('#6a4a2a')); chin(214, 44, hex('#3ac85a'));
  tarjeta(234, 104, 260, 140); R.linea(247, 110, 247, 128, hex('#6a4a2a')); R.linea(248, 110, 248, 128, hex('#9a6a3a')); R.poligono([[242, 128], [253, 128], [251, 137], [244, 137]], hex('#8a8e98')); R.linea(242, 128, 253, 128, hex('#c8ccd4')); chin(246, 104, hex('#d83a2a'));
  tarjeta(178, 120, 216, 138); R.numero('1822', 197, 133, { centro: true, color: hex('#2a2030'), sombra: false }); chin(196, 122, hex('#2a6ad8'));
  // la luz que recorre las piezas
  PIEZAS.forEach(([x, y], k) => { const e = enc(k); if (e > 0 && e < 1) halo(x, y + 12, 20, hex('#fff0a0'), 0.5 * Math.sin(e * Math.PI)); });
  // el folleto del centro, que se enciende en «answer»
  if (todo > 0) halo(CX, CY + 18, 40, hex('#ffe070'), 0.55 * todo);
  T.d_folleto(R, CX, CY + 18, { escala: 1, t, brillo: todo }); chin(CX, CY, hex('#f0c040'));
  if (todo > 0.5) chispas(CX, CY + 18, t, 8, 26, ORO[3], 7);
  // Atom luciérnaga sigue la luz de pieza en pieza y acaba junto al folleto
  const seg = tramo(t, W.EVERY - 0.3, W.EVERY + 2.0) * 7.99, k0 = Math.floor(seg), f = ease(seg - k0), A = PIEZAS[Math.min(7, k0)], B = PIEZAS[Math.min(7, k0 + 1)];
  let ax = t < W.EVERY - 0.3 ? lerp(300, 60, ease(tramo(t, W.BUT, W.EVERY - 0.3))) : lerp(A[0], B[0], f), ay = t < W.EVERY - 0.3 ? lerp(120, 60, ease(tramo(t, W.BUT, W.EVERY - 0.3))) : lerp(A[1], B[1], f) - 10;
  const fin = ease(tramo(t, W.MOST - 0.2, W.ANSWER)); ax = lerp(ax, CX + 26, fin); ay = lerp(ay, CY + 14, fin);
  T.AT.luciernaga(R, ri(ax), ri(ay + Math.sin(t * 3) * 2), t, { dir: fin > 0.5 ? -1 : 1, brillo: 0.9, cara: todo > 0.5 ? 'sonrisa' : t > W.EVERY ? 'sorpresa' : 'normal' });
  // la lámpara de la mesa
  R.rect(286, 168, 306, 172, hex('#3a3020')); R.linea(296, 168, 300, 118, hex('#c8a040')); R.poligono([[286, 104], [312, 104], [306, 118], [292, 118]], hex('#2a5a3a')); halo(298, 130, 46, hex('#ffe0a0'), 0.3 + Math.sin(t * 11) * 0.02);
  R.rect(256, 158, 266, 170, hex('#e8e2d0')); R.rect(257, 159, 265, 160, hex('#3a2010')); for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1; tine(261 + Math.sin(u * 7 + k) * 2, 155 - u * 14, hex('#f0f0f0'), 0.5 * (1 - u)); }
};

// ── 5 · el suelo del bosque de cerca: Atom a escala 2 y el folleto ────────────────────────────────────────────────────────
const HOYOS = [[62, 152], [228, 160]];
const hojita = (x, y, a, c) => { for (let i = -2; i <= 2; i++) for (let j = -1; j <= 1; j++) { if (Math.abs(i) === 2 && j) continue; ps(x + Math.cos(a) * i - Math.sin(a) * j, y + Math.sin(a) * i + Math.cos(a) * j, j === 0 ? mez(c, K, 0.35) : j < 0 ? mez(c, hex('#ffffff'), 0.2) : c); } };
const TRONCOS5 = [[30, 11], [112, 8], [196, 9], [262, 12]];
const suelo5 = () => capa('suelo5', () => {
  // la luz dorada de la tarde entre los árboles: más clara junto al suelo del fondo
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#24321e', '#34482a', '#4e6236', '#7a8a4e', '#b8b878', '#e8dca0'), 4.6 - Math.abs(y - 112) / 26 - Math.abs(x - 160) / 260 + hh(x >> 2, y >> 2, 2) * 0.5, x, y));
  // árboles lejanos azulados con sus copitas, y una segunda fila más cerca
  for (let k = 0; k < 16; k++) { const x = ri(6 + k * 20 + hh(k, 1) * 10), w = 1 + ri(hh(k, 2) * 2), top = 40 + ri(hh(k, 3) * 20);
    for (let y = 0; y < 124; y++) for (let i = -w; i <= w; i++) R.pset(x + i, y, mez(mez(hex('#8a9a7a'), hex('#b8c098'), i < 0 ? 0.6 : 0.1), hex('#d8d8a8'), cl((y - 60) / 80))); }
  for (let k = 0; k < 10; k++) { const x = ri(16 + k * 33 + hh(k, 4) * 12), w = 2 + ri(hh(k, 5) * 2);
    for (let y = 0; y < 128; y++) for (let i = -w; i <= w; i++) R.pset(x + i, y, i < 0 ? hex('#5a5a40') : hex('#46482e')); }
  // la cúpula de hojas: oscura y tranquila arriba (barra del año y esquina de Atom), con racimos de otoño debajo
  for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) if (y < 16 + Math.sin(x * 0.09) * 4 + hh(x >> 2, 9) * 3) R.pset(x, y, tono(pal('#1a2414', '#22301a', '#2c3c20'), 1 + hh(x >> 2, y >> 2, 7) * 0.8, x, y));
  for (let k = 0; k < 7; k++) { const x = 20 + k * 40 + hh(k, 11) * 10, c = [pal('#4a1e10', '#8a3a1a', '#c8622a', '#f0a050'), pal('#4a3a10', '#8a6a1a', '#c8a030', '#f0d060'), pal('#26341a', '#3e5226', '#5e7432', '#8a9a48')][k % 3];
    if (x > 262) continue; copa(x, 34 + hh(k, 12) * 6, 46, 16, 0, c, k + 3, 0); }
  // los troncos grandes: corteza con grietas, nudos y musgo, y sus raíces
  for (const [x, w] of TRONCOS5) { for (let y = 14; y < 134; y++) for (let i = -w; i <= w; i++) { const gr = Math.sin(i * 1.7 + Math.sin(y * 0.15 + x) * 1.5) > 0.7, mus = i < -w + 5 && y > 96 && hh(i, y >> 1, x) > 0.35;
      R.pset(x + i, y, mus ? (hh(i, y) > 0.5 ? hex('#5a7a2a') : hex('#3e5a1e')) : i <= -w + 1 ? hex('#9a7a56') : i >= w - 2 ? hex('#1e140c') : gr ? hex('#2a1c12') : tono(pal('#3e2c1e', '#523a28', '#6a4e34', '#82603e'), 1.4 + (i < 0 ? 0.8 : -0.2) + hh(i >> 1, y >> 2, x) * 0.6, x + i, y)); }
    R.disco(x + 2, 70 + (x % 20), 2, hex('#1e140c')); R.linea(x - 1, 68 + (x % 20), x + 4, 68 + (x % 20), hex('#8a6a46'));
    for (const d of [-1, 1]) { R.poligono([[x + d * (w - 2), 122], [x + d * (w + 12), 138], [x + d * (w + 4), 138], [x + d * w * 0.2, 134]], hex('#3e2c1e')); R.linea(x + d * (w - 2), 122, x + d * (w + 12), 138, d < 0 ? hex('#7a5a3e') : hex('#24180e')); } }
  // el suelo: tierra oscura y, encima, hojas sueltas de tres colores, ramitas, bellotas y piedras con musgo
  for (let y = 126; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#24160c', '#36220f', '#4a3018', '#5e3e20'), 1.2 + (y - 126) / 60 + hh(x >> 1, y >> 1, 9) * 1.1, x, y));
  for (let x = 0; x < 320; x++) for (let y = 124; y < 130; y++) if (hh(x, y, 4) > 0.55) R.pset(x, y, hex('#5a6a2a'));
  for (let k = 0; k < 420; k++) { const y = 128 + Math.pow(hh(k, 22), 0.8) * 52, x = hh(k, 21) * 320, c = [hex('#e07a30'), hex('#c8502a'), hex('#e8b038'), hex('#a8682a'), hex('#7a3a1e')][k % 5]; hojita(x, y, hh(k, 23) * 6.28, c); }
  for (let k = 0; k < 14; k++) { const x = hh(k, 31) * 320, y = 134 + hh(k, 32) * 40, a = hh(k, 33) * 3; R.linea(ri(x), ri(y), ri(x + Math.cos(a) * 9), ri(y + Math.sin(a) * 3), hex('#2a1a0e')); ps(x + Math.cos(a) * 4, y + Math.sin(a) * 1.5 - 1, hex('#6a4a2a')); }
  for (const [x, y] of [[96, 168], [140, 176], [300, 170], [16, 150]]) { R.disco(x, y, 2, hex('#6a4220')); R.rect(x - 2, y - 3, x + 2, y - 2, hex('#4a3a1e')); ps(x - 1, y - 1, hex('#a86a3a')); }
  for (const [x, y, r] of [[176, 140, 7], [10, 172, 9]]) { for (let j = -r; j <= 0; j++) for (let i = -r - 3; i <= r + 3; i++) if ((i / (r + 3)) ** 2 + (j / r) ** 2 <= 1) R.pset(x + i, y + j, j < -r * 0.5 ? (hh(i, j) > 0.4 ? hex('#5a8a2a') : hex('#3e6a1e')) : tono(pal('#4a4a4e', '#6a6a6e', '#8a8a8e'), 1.2 - j / r + hh(i, j) * 0.5, x + i, y + j)); }
  // los hoyos viejos con su montón de tierra, la pala oxidada clavada y setas
  for (const [x, y] of HOYOS) { for (let j = -5; j <= 5; j++) for (let i = -16; i <= 16; i++) { const e = (i / 16) ** 2 + (j / 5) ** 2; if (e <= 1) R.pset(x + i, y + j, e > 0.7 ? hex('#3a2414') : j < 0 ? hex('#140c06') : hex('#22160c')); }
    for (let j = -6; j <= 0; j++) for (let i = -10; i <= 10; i++) if ((i / 10) ** 2 + (j / 6) ** 2 <= 1) R.pset(x + 22 + i, y - 2 + j, hh(i, j, x) > 0.5 ? hex('#6a4426') : hex('#4e3018')); }
  R.linea(256, 132, 250, 158, hex('#5a3a22')); R.linea(257, 132, 251, 158, hex('#8a5a32')); R.rect(252, 130, 261, 132, hex('#3a2416')); R.poligono([[245, 156], [256, 158], [254, 168], [244, 166]], hex('#7a4a2a')); R.linea(245, 156, 256, 158, hex('#a86a3a')); ps(249, 162, hex('#4a2a16'));
  for (const [x, y] of [[180, 172], [186, 175], [40, 168], [122, 136]]) { R.rect(x, y - 3, x + 1, y, hex('#e8dcc0')); R.rect(x - 3, y - 6, x + 4, y - 4, hex('#c83a2a')); R.linea(x - 2, y - 7, x + 3, y - 7, hex('#c83a2a')); ps(x - 1, y - 6, hex('#ffffff')); ps(x + 2, y - 5, hex('#ffffff')); }
});
const p5 = (t) => {
  R.copiar(suelo5());
  // los rayos de sol que entran sesgados, con motas
  for (let k = 0; k < 3; k++) { const x0 = 60 + k * 90 + Math.sin(t * 0.3 + k) * 4; for (let y = 0; y < 150; y += 1) for (let i = 0; i < 10; i++) if (((y + i) & 1) === 0) tine(x0 + i + y * 0.45, y, hex('#fff0b0'), 0.12); }
  for (let k = 0; k < 12; k++) { const u = (t * 0.05 + hh(k, 1)) % 1; ps(80 + hh(k, 2) * 200 + Math.sin(t + k) * 4, 20 + u * 120, hex('#fff8d0')); }
  for (let k = 0; k < 7; k++) { const u = (t * 0.12 + k / 7) % 1, x = hh(k, 5) * 300 + Math.sin(u * 10 + k) * 12, y = 24 + u * 150; hojita(x, y, t * 3 + k, [hex('#e07a30'), hex('#e8b038'), hex('#c8502a')][k % 3]); }
  // la ardilla que sube y baja por el tronco del medio
  { const u = (Math.sin(t * 0.9) + 1) / 2, y = ri(60 + u * 50), x = 112 + 8; R.rect(x, y, x + 3, y + 6, hex('#a8582a')); ps(x + 1, y - 1, hex('#a8582a')); ps(x + 2, y + 1, K); for (let j = 0; j < 6; j++) ps(x + 4 + (j > 2 ? 1 : 0), y + 4 + j, hex('#c8703a')); }
  { const x = ((t * 30) % 420) - 50, y = 54 + Math.sin(t * 2) * 6; ave(x, y, t, hex('#2a2018'), 1); }
  // helechos que se mecen delante, en las esquinas
  for (const [x, d] of [[0, 1], [320, -1]]) for (let k = 0; k < 5; k++) { const a = -1.2 + k * 0.25 + Math.sin(t * 1.4 + k) * 0.05; let px = x, py = 180; for (let s = 0; s < 18; s++) { const nx = px + d * Math.cos(a + s * 0.04) * 2, ny = py + Math.sin(a + s * 0.04) * 2; R.linea(ri(px), ri(py), ri(nx), ri(ny), hex('#3a6a2a')); ps(nx + d * 2, ny + 2, hex('#5a8a3a')); ps(nx - d, ny + 2, hex('#2a4a1e')); px = nx; py = ny; } }
  // las X de los hoyos en «forest»
  HOYOS.forEach(([x, y], k) => { const u = tramo(t, W.FOREST - 0.2 + k * 0.25, W.FOREST + 0.1 + k * 0.25); if (u > 0) R.icono('X', x - 7, ri(y - 22 - u * 3), hex('#e84a3a'), K, 3); });
  const saca = t > W.INSIDE - 0.2, abre = tramo(t, W.N50 - 0.1, W.N50 + 0.35), oro = tramo(t, W.PAMPH - 0.1, W.PAMPH + 0.3), guarda = tramo(t, W.PAMPH + 0.5, W.PAMPH + 0.9);
  const senala = t > W.TREASURE - 0.2 && t < W.INSIDE - 0.2;
  const dir = senala ? (t < W.ALL ? -1 : 1) : 1;
  const r = T.AT.atom(R, 152, 170, t, { s: 2, dir, pose: senala ? 'senala' : saca && guarda < 1 ? 'sostiene' : 'quieto', cara: oro > 0.3 ? 'sonrisa' : t > W.ALL - 0.2 && t < W.INSIDE ? 'triste' : 'normal', habla: voz(t) });
  if (saca && guarda < 1 && r && r.mano) { const [mx, my] = r.mano.map(ri), ab = abre * (1 - tramo(t, W.PAMPH + 0.35, W.PAMPH + 0.5));
    const fx = ri(lerp(mx + 12, mx - 4, guarda)), fy = ri(lerp(my - 14, my + 6, guarda));
    if (oro > 0 && ab > 0.5) { halo(fx, fy - 8, 46, hex('#ffd860'), 0.6 * oro); for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.22, L = 16 + oro * 30 + Math.sin(t * 9 + k) * 3; R.linea(fx, fy - 10, ri(fx + Math.cos(a) * L), ri(fy - 10 + Math.sin(a) * L), k % 2 ? ORO[3] : ORO[2]); } }
    T.d_folleto(R, fx, fy, { escala: guarda > 0 ? 1 - guarda * 0.5 : 1, abierto: ab, t, brillo: oro });
    if (abre > 0.6 && t < W.PAMPH + 0.4) R.numero('50', fx, fy - 22 - ri(abre * 4), { centro: true, rampa: ORO });
    if (oro > 0.2 && ab > 0.5) for (let k = 0; k < 5; k++) { const u = ((t - W.PAMPH) * 0.9 + k / 5) % 1; const x = fx - 14 + k * 7 + Math.sin(u * 6 + k) * 3, y = fy - 14 - u * 34; R.disco(ri(x), ri(y), 2, ORO[1]); ps(ri(x) - 1, ri(y) - 1, ORO[3]); } }
  if (guarda >= 1 && t < W.PAMPH + 1.3) chispas(152 + 10, 148, t, 4, 10, ORO[3], 9);
};

// ── 6 · Lynchburg de noche, 1885: la ventana encendida ───────────────────────────────────────────────────────────
const p6 = (t) => {
  const o = { encuadre: 'calle', noche: true }; const g = T.lynchburg(R, t, o) || {}; const [wx, wy] = g.ventana || [251, 75];
  // la pareja que sale de la posada y se va por la derecha (por detrás del sereno)
  const sale = tramo(t, W.NUMBERS + 0.3, W.MOST2 + 0.2);
  if (sale > 0) { for (const [d, def] of [[0, EL.vecino], [9, EL.vecina]]) R.actor(def, ri(lerp(214, 300, sale)) - d, 150, t, { dir: 1, anda: sale < 1, habla: d === 0 && Math.sin(t * 3) > 0 }); }
  // el sereno con su farol: cruza la acera y se para bajo la ventana
  const va = ease(tramo(t, W.NOW, W.WHO - 0.3)), x = ri(lerp(36, 176, va)), anda = va > 0 && va < 1;
  const a = R.actor(EL.carteroBL, x, 150, t, { dir: t > W.WROTE + 0.6 ? -1 : 1, anda, sostiene: [x + (t > W.WROTE + 0.6 ? -2 : 16), 132], sorpresa: t > W.NUMBERS && t < W.NUMBERS + 1.2 });
  if (a && a.mano) farol(a.mano[0], a.mano[1] - 1, t);
  // la «?» sobre la ventana en «who» y los números que salen volando en «numbers»
  if (t > W.WHO - 0.1) { const u = tramo(t, W.WHO - 0.1, W.WHO + 0.25); halo(wx, wy, 26, hex('#ffd890'), 0.3 * u); R.icono('?', wx - 7, ri(wy - 44 - u * 4), hex('#fff0a0'), K, 3); }
  [['71', 0, -70, 0], ['194', 0.25, -40, 16], ['38', 0.5, -96, 30]].forEach(([s, d, dx, dy], k) => { const u = cl((t - W.NUMBERS - d) / 1.4); if (u <= 0) return; const e = ease(u);
    R.numero(s, ri(wx + dx * e), ri(wy - 2 - 26 * e + dy * e + Math.sin(t * 2 + k) * 2), { centro: true, rampa: ORO }); });
  T.lynchburgDelante(R, t, o);
};

// ── 7 · la ventana encendida de cerca: la silueta escribe ────────────────────────────────────────────────────────
const VX0 = 100, VY0 = 34, VX1 = 216, VY1 = 132, MX = 158, MY = 84;
const fachada = () => capa('fachada', () => {
  ladrillos(0, 0, 319, 179, pal('#2a1418', '#4a2422', '#5e2e28', '#723a30'), 3);
  // la penumbra de la noche arriba a la derecha (la esquina de Atom, tranquila) y abajo
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.max(0, (x - 230) / 90) * Math.max(0, (60 - y) / 60) + Math.max(0, (y - 150) / 40) * 0.5; if (d > 0) R.pset(x, y, mez(R.pget(x, y), hex('#0e0a14'), Math.min(0.7, d))); }
  // dintel de piedra y alféizar
  R.rect(VX0 - 12, VY0 - 12, VX1 + 12, VY0 - 4, hex('#8a8478')); R.linea(VX0 - 12, VY0 - 12, VX1 + 12, VY0 - 12, hex('#b8b2a4')); R.linea(VX0 - 12, VY0 - 4, VX1 + 12, VY0 - 4, hex('#4a463e'));
  R.rect(MX - 4, VY0 - 14, MX + 4, VY0 - 3, hex('#a8a294'));
  R.rect(VX0 - 14, VY1 + 4, VX1 + 14, VY1 + 10, hex('#9a9488')); R.linea(VX0 - 14, VY1 + 4, VX1 + 14, VY1 + 4, hex('#c8c2b4')); R.linea(VX0 - 14, VY1 + 10, VX1 + 14, VY1 + 10, hex('#3a362e'));
  // las contraventanas verdes de lamas
  for (const [x0, x1] of [[VX0 - 34, VX0 - 8], [VX1 + 8, VX1 + 34]]) { R.rect(x0, VY0 - 2, x1, VY1 + 2, hex('#14201a')); R.rect(x0 + 1, VY0 - 1, x1 - 1, VY1 + 1, hex('#2e4a3a'));
    for (let y = VY0 + 2; y < VY1; y += 4) { R.linea(x0 + 3, y, x1 - 3, y, hex('#4a6a54')); R.linea(x0 + 3, y + 1, x1 - 3, y + 1, hex('#1a2a22')); } R.rect(ri((x0 + x1) / 2) - 1, VY0 + 40, ri((x0 + x1) / 2) + 1, VY0 + 44, hex('#8a8a92')); }
  // el marco blanco
  R.rect(VX0 - 6, VY0 - 3, VX1 + 6, VY1 + 3, hex('#d8d0c0')); R.rect(VX0 - 6, VY0 - 3, VX1 + 6, VY0 - 2, hex('#f0ead8')); R.rect(VX0 - 2, VY0 - 1, VX1 + 2, VY1 + 1, hex('#8a8274'));
  // la maceta de geranios del alféizar
  R.poligono([[188, VY1 + 4], [206, VY1 + 4], [204, VY1 - 8], [190, VY1 - 8]], hex('#a8502a')); R.linea(190, VY1 - 8, 204, VY1 - 8, hex('#d8784a'));
  // el farol de la calle a la izquierda
  R.rect(24, 60, 28, 179, hex('#1a1a20')); R.linea(25, 60, 25, 179, hex('#4a4a52')); R.rect(18, 46, 34, 60, hex('#1a1a20')); R.rect(20, 48, 32, 58, hex('#ffe0a0')); R.poligono([[16, 46], [36, 46], [26, 38]], hex('#1a1a20'));
  // la hiedra que trepa por la derecha y matas abajo
  for (let k = 0; k < 120; k++) { const y = 180 - k * 1.2, x = 262 + Math.sin(k * 0.15) * 10 + hh(k, 1) * 6; if (y < 30) break; ps(x, y, hex('#1e3a1e')); if (k % 2 === 0) { R.disco(ri(x + (k % 4 ? 3 : -3)), ri(y), 2, hex('#2e5a2a')); ps(ri(x + (k % 4 ? 3 : -3)) - 1, ri(y) - 1, hex('#4a7a3a')); } }
  for (let k = 0; k < 40; k++) { const x = hh(k, 31) * 320, r = 5 + hh(k, 32) * 6; R.disco(ri(x), ri(178 - hh(k, 33) * 6), ri(r), hex('#121e14')); R.disco(ri(x) - 1, ri(176 - hh(k, 33) * 6), ri(r - 2), hex('#1e301e')); }
});
const NUM7 = [['71 194 38', 'SOMEONE'], ['1701 89 76', 'LYNCH'], ['10 26 33', 'UNDERST']];
const p7 = (t) => {
  R.copiar(fachada());
  const fl = 0.9 + Math.sin(t * 11) * 0.05 + Math.sin(t * 17) * 0.04;
  // la luz cálida del cuarto que sale y cae en el alféizar y la pared
  halo(MX, MY + 10, 96, hex('#ffc070'), 0.25 * fl);
  halo(26, 54, 40, hex('#ffd890'), 0.4 * fl);
  // dentro (recortado al vidrio): papel pintado, estante, el pergamino, la mesa con la vela, la silueta que escribe
  porHueco(VX0, VY0, VX1, VY1, () => {
    for (let y = VY0; y <= VY1; y++) for (let x = VX0; x <= VX1; x++) R.pset(x, y, tono(pal('#6a3a22', '#8a5230', '#a86a3a', '#c8884a'), 1.6 + (x % 8 < 2 ? 0.6 : 0) + hh(x >> 1, y >> 1, 3) * 0.4 - Math.hypot(x - 124, y - 98) / 90, x, y));
    R.rect(104, 56, 136, 58, hex('#4a2a16')); for (let k = 0; k < 7; k++) R.rect(106 + k * 4, 46 - (k % 3), 108 + k * 4, 55, pal('#5a1e1e', '#2a3a5a', '#3a4a2a')[k % 3]);
    // el pergamino clavado: la Declaración, renglones de rayitas
    R.rect(170, 42, 206, 82, hex('#8a6a3a')); R.rect(171, 43, 205, 81, hex('#ecdcb0')); R.rect(174, 46, 202, 49, hex('#5a4630'));
    for (let y = 53; y < 79; y += 3) for (let x = 174; x < 203; x++) if (hh(x >> 1, y, 2) > 0.3) ps(x, y, hex('#7a6a50'));
    // la mesa y su atril con la hoja
    R.rect(VX0, 112, VX1, 132, hex('#3a2212')); R.rect(VX0, 110, VX1, 113, hex('#6a4224')); R.linea(VX0, 110, VX1, 110, hex('#9a6a3a'));
  });
  // la cifras que van saliendo en la hoja del atril (cifras de 3 × 5, se leen)
  let pluma = [152, 94];
  NUM7.forEach(([s, k], j) => { const t0 = W[k], n = ri(tramo(t, t0, t0 + 0.9) * s.length); if (t > t0 + 0.95 || n > 0) { if (t < t0 + 0.95) pluma = [151 + n * 4, 94 + j * 7]; } });
  // la silueta sin cara de pie tras la mesa, con la pluma en la mano (el brazo canónico de R.actor)
  silueta(VX0, VY0, VX1, 109, hex('#1a0e0a'), () => R.actor(EL.vecino, 118, 116, t, { dir: 1, sostiene: [pluma[0] - 4, pluma[1] - 1] }), hex('#b06a3a'));
  // la mesa, el atril con la hoja, la vela y la moneda (delante de la silueta)
  R.rect(VX0, 110, VX1, VY1, hex('#3a2212')); R.rect(VX0, 109, VX1, 112, hex('#6a4224')); R.linea(VX0, 109, VX1, 109, hex('#9a6a3a')); for (let x = VX0 + 6; x < VX1; x += 22) R.rect(x, 116, x + 16, 128, hex('#2e1a0e'));
  R.poligono([[140, 110], [194, 110], [188, 84], [146, 84]], hex('#5a3a1e')); R.poligono([[144, 108], [190, 108], [185, 86], [149, 86]], hex('#f2e8cc'));
  NUM7.forEach(([s, k], j) => { const t0 = W[k], n = ri(tramo(t, t0, t0 + 0.9) * s.length); if (n > 0) cifras(s, 151, 90 + j * 7, hex('#2a1a14'), n); });
  R.rect(108, 96, 112, 110, hex('#f0e8d8')); R.linea(108, 96, 108, 110, hex('#ffffff')); R.rect(105, 108, 115, 110, hex('#c8a040')); ps(110, 94 + (Math.sin(t * 13) > 0 ? 0 : 1), hex('#ffe070')); ps(110, 93, hex('#fff8d0')); ps(110, 95, hex('#ff9a30'));
  halo(110, 94, 30, hex('#ffe0a0'), 0.45 * fl);
  R.disco(200, 107, 3, ORO[0]); R.disco(200, 106, 2, ORO[2]); ps(199, 105, ORO[3]);
  // la pluma en la mano de la silueta (su canto de luz)
  { const m = Math.sin(t * 17) * 0.7; R.linea(pluma[0] - 3, ri(pluma[1] - 1 + m), pluma[0] + 3, ri(pluma[1] - 13 + m), hex('#f4f0e6')); R.linea(pluma[0] - 2, ri(pluma[1] - 1 + m), pluma[0] + 4, ri(pluma[1] - 12 + m), hex('#c8c0b0')); ps(pluma[0] - 3, ri(pluma[1] + m), K); }
  if (t > W.GOLD - 0.1 && t < W.GOLD + 1.2) { halo(200, 106, 18, hex('#ffe070'), 0.7 * tramo(t, W.GOLD - 0.1, W.GOLD + 0.2)); chispas(200, 106, t, 6, 10, ORO[3], 4); }
  // el vidrio: brillos de luna en diagonal y los parteluces
  for (let k = 0; k < 3; k++) for (let i = 0; i < 18; i++) tine(VX0 + 10 + k * 40 + i, VY0 + 6 + i * 1.5, hex('#c8d8f0'), 0.18);
  R.rect(MX - 1, VY0, MX + 1, MY, hex('#d8d0c0')); R.rect(VX0, MY - 2, VX1, MY + 1, hex('#d8d0c0')); R.linea(MX + 1, VY0, MX + 1, MY - 2, hex('#8a8274')); R.linea(VX0, MY + 1, VX1, MY + 1, hex('#8a8274'));
  // los geranios y las polillas alrededor de la luz
  for (let k = 0; k < 6; k++) { const x = 190 + (k % 3) * 6, y = VY1 - 12 - (k > 2 ? 5 : 0) + ri(Math.sin(t * 2 + k) * 0.6); R.disco(x, y, 2, hex('#d83a3a')); ps(x - 1, y - 1, hex('#ff8a7a')); }
  for (let k = 0; k < 4; k++) R.disco(186 + k * 5, VY1 - 6, 2, hex('#2e5a2a'));
  for (let k = 0; k < 3; k++) { const a = t * (2 + k * 0.5) + k * 2; const x = (k === 2 ? 26 : MX) + Math.cos(a) * (k === 2 ? 12 : 50 + k * 10), y = (k === 2 ? 54 : MY) + Math.sin(a * 1.3) * (k === 2 ? 10 : 30); ps(x, y, hex('#e8dcc0')); ps(x + (Math.sin(t * 30) > 0 ? 1 : -1), y, hex('#a89a80')); }
};

// ── 8 · el escritorio a la vela de cerca: la caja y las dos hojas ──────────────────────────────────────────────────
const MESA8 = 120;
const escr = () => capa('escr', () => {
  for (let y = 0; y < MESA8; y++) for (let x = 0; x < 320; x++) { const st = (x % 14), c = st < 2 ? 2.4 : st === 7 ? 1.9 : 1.2; R.pset(x, y, tono(pal('#142218', '#1e3022', '#2a402c', '#3a5236', '#8a7a3a'), c + hh(x >> 1, y >> 2, 3) * 0.5 - (x > 268 && y < 50 ? 0.5 : 0), x, y)); }
  R.rect(0, MESA8 - 10, 319, MESA8 - 1, hex('#3a2414')); R.linea(0, MESA8 - 10, 319, MESA8 - 10, hex('#7a5230'));
  // el pergamino clavado: la Declaración
  R.rect(190, 20, 262, 100, hex('#7a5a30')); R.rect(191, 21, 261, 99, hex('#ecdcb0')); for (let y = 22; y < 99; y++) for (let x = 192; x < 261; x++) if (hh(x, y, 8) > 0.9) ps(x, y, hex('#d8c490'));
  R.rect(198, 26, 254, 31, hex('#4a3a26')); for (let y = 36; y < 90; y += 4) for (let x = 196; x < 257; x++) if (hh(x >> 1, y, 3) > 0.28) ps(x, y, hex('#6a5a40'));
  for (let k = 0; k < 5; k++) R.linea(200 + k * 11, 94, 207 + k * 11, 92, hex('#3a2a1a'));
  for (const [x, y] of [[192, 22], [260, 22]]) R.disco(x, y, 1, hex('#c8a040'));
  // un paisaje enmarcado y el almanaque de 1885
  R.rect(58, 30, 104, 66, hex('#4a3010')); R.rect(60, 32, 102, 64, hex('#c8a040')); R.rect(62, 34, 100, 62, hex('#9ab8d0'));
  for (let x = 62; x <= 100; x++) { const a = 50 - Math.max(0, 12 - Math.abs(x - 78) * 0.8); for (let y = ri(a); y <= 62; y++) R.pset(x, y, y > 56 ? hex('#5a7a3a') : hex('#6a7a9a')); }
  R.rect(126, 34, 160, 80, hex('#2a2018')); R.rect(127, 35, 159, 79, hex('#f2ead6')); R.rect(127, 35, 159, 44, hex('#8a2a2a')); cifras('1885', 135, 37, hex('#ffe8c0'));
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) R.rect(130 + i * 4, 48 + j * 6, 131 + i * 4, 49 + j * 6, hex('#8a8070'));
  R.disco(143, 32, 1, hex('#c8a040'));
  // el tablero
  tablas(0, MESA8, 319, 179, pal('#2a1a0e', '#4a2e18', '#6a4426', '#885a32'), 10, 12, false, false);
  // el tintero con su pluma, papeles apilados y lacre
  R.rect(276, 126, 290, 138, hex('#14121a')); R.rect(277, 127, 289, 137, hex('#2a2a3a')); R.linea(277, 127, 289, 127, hex('#6a6a8a')); R.linea(283, 126, 296, 104, hex('#f4f0e6')); R.linea(284, 126, 297, 104, hex('#c8c0b0'));
  for (let k = 0; k < 5; k++) { R.rect(10 + k, 150 - k * 3, 66 + k, 156 - k * 3, hex('#d8ccaa')); R.linea(10 + k, 150 - k * 3, 66 + k, 150 - k * 3, hex('#f2ead0')); R.linea(10 + k, 156 - k * 3, 66 + k, 156 - k * 3, hex('#8a7e60')); }
  for (let k = 0; k < 4; k++) R.linea(16, 140 + k * 3, 56, 140 + k * 3, hex('#9a8e70'));
  R.rect(80, 166, 90, 170, hex('#a82a2a')); R.linea(80, 166, 90, 166, hex('#d85a4a'));
});
const p8 = (t) => {
  R.copiar(escr());
  const fl = 0.9 + Math.sin(t * 11) * 0.05 + Math.sin(t * 17) * 0.04;
  // la vela en su palmatoria
  R.rect(30, 132, 52, 136, hex('#8a6a2a')); R.linea(30, 132, 52, 132, hex('#e8c060')); R.rect(37, 96, 45, 132, hex('#f0e8d8')); R.linea(37, 96, 37, 132, hex('#ffffff'));
  const fy = 92 + (Math.sin(t * 13) > 0.6 ? -1 : 0); R.disco(41, fy, 2, hex('#ffb040')); ps(41, fy - 2, hex('#fff8d0')); ps(41, fy - 3, hex('#ffe070')); ps(41, fy, hex('#fff8d0'));
  halo(41, 92, 120, hex('#ffd890'), 0.28 * fl);
  // la caja de hierro: la mano la trae en «iron box»
  const trae = ease(tramo(t, W.AN - 0.2, W.BOX)), abre = tramo(t, W.SIMPLY - 0.1, W.ALONE + 0.2) * 0.3;
  const bxx = ri(lerp(300, 118, trae)), byy = ri(lerp(118, 158, trae) - Math.sin(trae * Math.PI) * 10);
  const cj = T.d_caja(R, bxx, byy, { escala: 2, t, abierta: abre }) || {};
  if (abre > 0.05) { halo(bxx, byy - 26, 34, hex('#ffe070'), abre * 2); chispas(bxx, byy - 26, t, 6, 18, ORO[3], 5); }
  // las dos hojas sin resolver: la mano las desliza en «two unsolved pages»
  const h1 = ease(tramo(t, W.TWO - 0.3, W.UNSOLVED + 0.1)), h3 = ease(tramo(t, W.UNSOLVED - 0.1, W.PAGES + 0.3));
  if (h1 > 0) T.d_hoja(R, ri(lerp(330, 190, h1)), 146, { n: 1, escala: 2, t });
  if (h3 > 0) T.d_hoja(R, ri(lerp(340, 244, h3)), 148, { n: 3, escala: 2, t: t + 1 });
  if (t > W.UNSOLVED) for (const [x, k] of [[190, 0], [244, 1]]) { const u = tramo(t, W.UNSOLVED + k * 0.3, W.UNSOLVED + 0.25 + k * 0.3); if (u > 0) R.icono('?', x - 7, ri(104 - u * 4), hex('#fff0a0'), K, 3); }
  // la mano canónica (manga oscura) que trae la caja, empuja las hojas y entreabre la tapa
  let hx = 340, hy = 200;
  if (t < W.BOX + 0.3) { hx = bxx + 30; hy = byy - 14; }
  else if (t < W.PAGES + 0.5) { const u = t < W.UNSOLVED ? h1 : h3; hx = ri(lerp(340, t < W.UNSOLVED ? 212 : 266, u)); hy = t < W.UNSOLVED ? 160 : 162; }
  else if (t > W.SOMETHING - 0.3) { const u = ease(tramo(t, W.SOMETHING - 0.3, W.SIMPLY - 0.1)); hx = ri(lerp(340, bxx + 30, u)); hy = ri(lerp(200, byy - 30, u)); if (t > W.ALONE + 0.3) { const v = ease(tramo(t, W.ALONE + 0.3, W.ALONE + 0.8)); hx = ri(lerp(hx, 340, v)); hy = ri(lerp(hy, 200, v)); } }
  if (hx < 330) T.brazo(R, hx + 22, 198, hx, hy, '#2a2a36', -1, { codo: [hx + 30, ri((hy + 198) / 2)] });
};

// ── 9 · el mapa de Virginia: 140 años y los faroles de los buscadores ────────────────────────────────────────────
const SITIOS = [[-79.73, 37.38], [-77.43, 37.54], [-79.94, 37.27], [-78.48, 38.03], [-76.29, 36.85], [-77.46, 38.30], [-79.39, 36.59], [-78.16, 39.18], [-80.41, 37.23], [-79.07, 38.15], [-78.87, 38.45], [-81.2, 36.75]];
const p9 = (t) => {
  const P = T.mapa(R, t, { zoom: 4.6, centro: [-79.0, 37.75], rosa: [44, 150] }), Q = (p) => P(p).map(ri);
  const [lx, ly] = Q([-79.14, 37.41]);
  T.chincheta(R, lx, ly, t, hex('#d83a2a'), { baja: tramo(t, W.ANDTHAT - 0.3, W.ANDTHAT + 0.1) });
  // el «140» que cuenta
  const c = tramo(t, W.N140 - 0.1, W.LATER); if (c > 0) { const n = ri(140 * ease(c)); R.numero(String(n), 214, 50, { centro: true, tam: 16, rampa: ORO }); if (c >= 1) T.AT.anillo(R, 214, 42, 30, 12, t, tramo(t, W.LATER, W.LATER + 0.6)); }
  // los faroles con su pala que se encienden por todo el estado
  SITIOS.forEach((s, k) => { const t0 = lerp(W.STILL, W.VIRGINIA, k / (SITIOS.length - 1)) + (k === 0 ? 1.0 : 0), u = tramo(t, t0 - 0.1, t0 + 0.2); if (u <= 0) return; const [x, y] = Q(s);
    const late = k === 0 ? 1 + Math.sin(t * 6) * 0.3 : 1; halo(x, y, ri(15 * late), hex('#ffc040'), 0.7 * u);
    R.disco(x, y, 3, hex('#2a1e14')); R.disco(x, y, 2, hex('#ffd860')); ps(x, y - 1, hex('#ffffff')); R.icono('pala', x - 7, ri(y - 22 - u * 3 + Math.sin(t * 4 + k) * 1), hex('#f4ecd8'), K, 2); });
  if (t > W.VIRGINIA) { const [bx, by] = Q(SITIOS[0]); T.AT.anillo(R, bx, by, 18, 8, t, tramo(t, W.VIRGINIA, W.VIRGINIA + 0.6)); }
};

// ── 10 · un cobertizo de hoy al amanecer: la pala ────────────────────────────────────────────────────────────────
const PX = 116, PY = 106;   // donde está apoyada la pala (arriba del mango)
const cober = () => capa('cober', () => {
  tablas(0, 0, 319, 150, pal('#2a1c12', '#3e2a1a', '#523822', '#684a2e'), 12, 13, true, true);
  // vigas del techo y el suelo de cemento
  R.rect(0, 8, 319, 13, hex('#2a1a10')); R.linea(0, 8, 319, 8, hex('#7a5a3a'));
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#4a4a4e', '#5e5e62', '#727276', '#88888a'), 1.5 + hh(x >> 1, y >> 1, 5) * 0.8 + (y === 150 ? -1 : 0), x, y));
  for (const [x, y, r] of [[60, 166, 7], [150, 172, 5]]) for (let j = -3; j <= 3; j++) for (let i = -r; i <= r; i++) if ((i / r) ** 2 + (j / 3) ** 2 < 1) R.pset(x + i, y + j, mez(R.pget(x + i, y + j), hex('#1a1a22'), 0.5));
  // el tablero perforado con sus herramientas y la silueta pintada de la pala
  R.rect(16, 30, 128, 110, hex('#5a4a36')); R.rect(18, 32, 126, 108, hex('#b8a07a')); for (let y = 36; y < 106; y += 5) for (let x = 22; x < 124; x += 5) ps(x, y, hex('#6a5a40'));
  R.linea(92, 44, 92, 96, hex('#8a5a30')); R.rect(88, 42, 96, 45, hex('#2a2a30')); for (let i = -4; i <= 4; i += 2) R.linea(92 + i, 96, 92 + i, 104, hex('#6a6a72')); R.linea(86, 96, 98, 96, hex('#6a6a72'));   // la horca
  R.rect(28, 40, 30, 62, hex('#8a5a30')); R.rect(24, 40, 34, 44, hex('#6a6a72'));   // martillo
  R.poligono([[42, 44], [66, 44], [66, 52], [42, 58]], hex('#a8acb4')); R.rect(36, 42, 44, 56, hex('#a8402a'));   // serrucho
  R.linea(110, 36, 110, 100, hex('#8a5a30')); for (let i = -6; i <= 6; i += 2) R.linea(110 + i, 100, 110 + i, 106, hex('#6a6a72')); R.linea(104, 100, 116, 100, hex('#6a6a72'));   // rastrillo
  for (let k = 0; k < 4; k++) { R.rect(30 + k * 10, 74, 33 + k * 10, 92, hex('#7a7a82')); R.rect(29 + k * 10, 92, 34 + k * 10, 96, hex('#c8402a')); }   // destornilladores
  R.disco(60, 100, 5, hex('#2a6a3a')); R.disco(60, 100, 2, hex('#b8a07a'));   // rollo de cuerda
  // el banco de trabajo con tornillo, frascos, la radio, el termo y el folleto amarillo
  R.rect(132, 108, 196, 112, hex('#7a5230')); R.linea(132, 108, 196, 108, hex('#b08050')); R.rect(134, 113, 138, 150, hex('#4a3020')); R.rect(190, 113, 194, 150, hex('#4a3020')); R.rect(134, 132, 194, 134, hex('#4a3020'));
  for (let k = 0; k < 3; k++) { R.rect(140 + k * 8, 98, 145 + k * 8, 107, hex('#a8c8d0')); R.rect(140 + k * 8, 96, 145 + k * 8, 98, hex('#c8402a')); for (let j = 0; j < 4; j++) ps(141 + k * 8 + (j % 3), 102 + j, hex('#6a6a72')); }
  R.rect(166, 96, 184, 107, hex('#3a3a42')); R.rect(167, 97, 175, 106, hex('#8a8a92')); R.disco(179, 101, 3, hex('#2a2a30')); R.linea(182, 96, 188, 84, hex('#c8c8d0'));
  R.rect(186, 94, 192, 107, hex('#2a5a8a')); R.rect(186, 92, 192, 94, hex('#c8c8d0'));
  R.rect(140, 120, 170, 131, hex('#2a2a2a')); R.rect(141, 121, 169, 130, hex('#3a2e24'));   // caja de herramientas en la balda
  R.rect(144, 140, 186, 148, hex('#5a5a5e'));   // saco de cemento
  // la bombilla y su cable
  R.linea(120, 13, 120, 30, K);
  // el hueco de la puerta abierta (el exterior lo pinta cada fotograma)
  R.rect(210, 28, 290, 150, hex('#1a1008')); R.rect(206, 24, 294, 28, hex('#4a3020'));
});
const p10 = (t) => {
  R.copiar(cober());
  // fuera, al amanecer: el cielo rosado, las lomas, la valla, el buzón y la camioneta (recortado al hueco)
  porHueco(212, 29, 288, 149, () => { for (let y = 29; y <= 149; y++) for (let x = 212; x <= 288; x++) R.pset(x, y, tono(pal('#4a5a9a', '#8a6aa0', '#e88a7a', '#f8b878', '#ffe0a0'), (y - 29) / 22 + hh(x >> 2, y >> 2) * 0.4, x, y));
    nube(212 + ((t * 4) % 100), 46, 30, pal('#a86a8a', '#e89a9a', '#ffd0b0'), 3); nube(250 + ((t * 2) % 80), 60, 22, pal('#b87a8a', '#f0aaa0', '#ffe0c0'), 5);
    R.disco(260, 128, 12, hex('#fff0b0'));
    for (let x = 212; x <= 288; x++) { const a = 116 + Math.sin(x * 0.06) * 5; for (let y = ri(a); y <= 149; y++) R.pset(x, y, tono(pal('#2a4a2a', '#3a5a32', '#5a7a3e'), 1 + (y - a) / 20 + hh(x, y) * 0.5, x, y)); }
    for (let x = 214; x <= 288; x += 8) { R.rect(x, 128, x + 1, 140, hex('#e8e0d0')); } R.rect(212, 131, 288, 132, hex('#e8e0d0'));
    R.rect(232, 130, 280, 144, hex('#1a1a20')); R.rect(233, 131, 279, 142, hex('#8a2a2a')); R.rect(234, 122, 256, 131, hex('#1a1a20')); R.rect(236, 124, 254, 130, hex('#8ab0d0')); R.linea(233, 131, 279, 131, hex('#c84a4a'));
    for (const x of [240, 272]) { R.disco(x, 144, 4, hex('#1a1a1e')); R.disco(x, 144, 2, hex('#8a8a92')); }
    for (let k = 0; k < 3; k++) ave(220 + ((t * 10 + k * 25) % 70), 40 + k * 5, t, hex('#3a2a3a'), k); });
  // el haz de luz que entra por la puerta, con motas
  for (let y = 150; y < 180; y++) for (let x = 200 - (y - 150) * 1.5; x < 290 - (y - 150) * 0.5; x++) if ((x + y) % 2 === 0) tine(x, y, hex('#ffd8a0'), 0.25);
  for (let k = 0; k < 10; k++) { const u = (t * 0.08 + hh(k, 1)) % 1; ps(214 + hh(k, 2) * 60 - u * 30, 40 + u * 100, hex('#fff0c0')); }
  // la bombilla que se mece
  const bx = ri(120 + Math.sin(t * 1.5) * 2); R.linea(120, 30, bx, 34, K); R.disco(bx, 37, 3, hex('#fff0b0')); halo(bx, 37, 40, hex('#ffe0a0'), 0.3);
  // la pala en el tablero hasta que la descuelga
  const coge = t > W.PICK - 0.05, va = ease(tramo(t, W.SOMETIMES, W.GOLD2 + 0.6)), x = ri(lerp(92, 336, va)), anda = va > 0 && va < 1;
  if (!coge) { R.linea(PX, PY, PX - 6, PY + 32, hex('#8a5a30')); R.linea(PX + 1, PY, PX - 5, PY + 32, hex('#b07a40')); R.rect(PX - 2, PY - 2, PX + 3, PY, hex('#2a2a30')); R.poligono([[PX - 12, PY + 31], [PX - 1, PY + 33], [PX - 2, PY + 46], [PX - 12, PY + 44]], hex('#9a9ea8')); R.linea(PX - 12, PY + 31, PX - 1, PY + 33, hex('#d8dce4')); R.linea(PX - 12, PY + 44, PX - 2, PY + 46, hex('#4a4a52')); }
  // el perro se despierta en «Sometimes» y la sigue
  const pva = ease(tramo(t, W.SOMETIMES + 0.6, W.GOLD2 + 1.2)), pxp = ri(lerp(160, 340, pva));
  R.perro(pxp, 160, t, { dir: 1, anda: pva > 0 && pva < 1 });
  if (t > W.SOMETIMES && t < W.SOMETIMES + 0.6) R.icono('!', 158, 140, hex('#fff070'), K, 1);
  const sube = ease(tramo(t, W.PICK - 0.4, W.PICK)), al = t > W.SHOVEL;
  const a = R.actor(EL.vecinaLF, x, 152, t, { dir: 1, anda, sostiene: !coge ? [ri(lerp(x + 14, PX - 3, sube)), ri(lerp(132, PY + 14, sube))] : al ? [x + 12, 126] : [x + 2, 118], sonrisa: al });
  if (coge && a && a.mano) { const [mx, my] = a.mano.map(ri);
    if (al) { R.linea(mx - 14, my - 14, mx + 10, my + 10, hex('#8a5a30')); R.linea(mx - 13, my - 14, mx + 11, my + 10, hex('#b07a40')); R.poligono([[mx + 8, my + 8], [mx + 17, my + 12], [mx + 15, my + 22], [mx + 6, my + 17]], hex('#9a9ea8')); }
    else { R.linea(mx, my - 22, mx, my + 14, hex('#8a5a30')); R.linea(mx + 1, my - 22, mx + 1, my + 14, hex('#b07a40')); R.poligono([[mx - 6, my + 14], [mx + 6, my + 14], [mx + 5, my + 28], [mx - 5, my + 28]], hex('#9a9ea8')); } }
};

// ── 11 · el bosque de noche del primer plano, ya sin la hoja ───────────────────────────────────────────────────────
const p11 = (t) => {
  const o = { encuadre: 'bosque', noche: true }; T.bedford(R, t, o);
  // los faroles de los buscadores que se mueven entre los árboles del fondo
  for (let k = 0; k < 3; k++) { const d = k % 2 ? -1 : 1, x = ri(d > 0 ? 30 + ((t * (4 + k) + k * 70) % 230) : 260 - ((t * (4 + k) + k * 70) % 230)), y = 128 + k * 3, b = (t > W.URGE ? 1 : 0.55) * (0.85 + Math.sin(t * 9 + k) * 0.15), p = Math.floor(t * 4 + k) % 2;
    halo(x + d * 4, y - 6, ri(10 + b * 8), hex('#ffc870'), 0.6 * b);
    R.rect(x - 1, y - 12, x + 1, y - 4, hex('#0a0c14')); R.disco(x, y - 14, 2, hex('#0a0c14')); R.linea(x - 1, y - 4, x - 1 - p, y, hex('#0a0c14')); R.linea(x + 1, y - 4, x + 1 + p, y, hex('#0a0c14'));
    if (k === 1) { R.linea(x - d * 2, y - 10, x - d * 8, y - 2, hex('#0a0c14')); R.linea(x - d * 8, y - 2, x - d * 6, y, hex('#0a0c14')); }
    R.linea(x + d, y - 9, x + d * 4, y - 7, hex('#0a0c14')); R.rect(x + d * 4 - 1, y - 7, x + d * 4 + 1, y - 4, hex('#ffe0a0')); ps(x + d * 4, y - 6, hex('#ffffff')); }
  // Atom luciérnaga flota hasta donde estaba la hoja
  const u = ease(tramo(t, W.BUT2, W.SEARCH)), ax = lerp(300, 170, u), ay = lerp(70, 140, u) - Math.sin(u * Math.PI) * 10 + Math.sin(t * 3) * 2;
  const late = t > W.INSIDE2 - 0.1 ? 0.5 + 0.5 * Math.abs(Math.sin((t - W.INSIDE2) * 5)) : 0;
  if (late > 0) halo(ax, ay, ri(22 + late * 14), hex('#ffb0a0'), 0.4 * late);
  // el contorno de la hoja que estaba ahí, que se dibuja en «us» y se apaga
  const h = tramo(t, W.US - 0.1, W.US + 0.4) * (1 - tramo(t, W.US + 0.8, W.ANDYOU)); if (h > 0) { for (let i = -22; i <= 22; i++) for (const j of [-13, 13]) if ((i & 1) && hh(i, j) < h) ps(170 + i, 163 + j * 0.5, ORO[2]); for (let j = -6; j <= 6; j++) for (const i of [-22, 22]) if ((j & 1) && hh(i, j) < h) ps(170 + i, 163 + j, ORO[2]); halo(170, 163, 30, hex('#ffd860'), 0.3 * h); }
  T.AT.luciernaga(R, ri(ax), ri(ay), t, { dir: -1, brillo: 1, cara: t > W.INSIDE2 ? 'sonrisa' : 'normal' });
  if (late > 0) corazon(ri(ax) - 3, ri(ay - 24 - late * 2), hex('#e8506a'));
  T.bedfordDelante(R, t, o);
};

// ── 12 · la mesa del espectador desde arriba: las dos hojas en las manos ──────────────────────────────────────────
const pov = () => capa('pov', () => {
  tablas(0, 0, 319, 179, pal('#3a2416', '#523420', '#6a462a', '#845a36'), 14, 15, false, false);
  // el portátil arriba a la izquierda, la libreta, el lápiz, la goma y una bola de papel
  R.rect(22, 22, 104, 70, hex('#3a3e48')); R.rect(24, 24, 102, 68, hex('#5a5e6a')); for (let j = 0; j < 4; j++) for (let i = 0; i < 12; i++) R.rect(28 + i * 6, 30 + j * 6, 31 + i * 6, 33 + j * 6, hex('#2a2e38')); R.rect(48, 56, 78, 64, hex('#4a4e58'));
  R.rect(22, 70, 104, 76, hex('#14161c')); R.linea(22, 76, 104, 76, hex('#6a8ac8'));
  R.rect(232, 100, 300, 150, hex('#e8e2d0')); for (let y = 106; y < 148; y += 5) R.linea(236, y, 296, y, hex('#a8b8d0')); R.linea(244, 100, 244, 150, hex('#e8a0a0'));
  R.linea(250, 158, 290, 168, hex('#e8c030')); R.linea(250, 159, 290, 169, hex('#a88a20')); R.linea(286, 167, 290, 168, hex('#2a2a2a')); R.rect(300, 160, 310, 166, hex('#e88aa0'));
  R.disco(290, 86, 6, hex('#d8d2c0')); R.disco(289, 85, 4, hex('#f2ecdc')); ps(287, 84, hex('#b8b2a0')); ps(292, 87, hex('#b8b2a0'));
});
const p12 = (t) => {
  R.copiar(pov());
  // el móvil que se enciende con un aviso
  const av = t > W.TWO2 && t < W.TWO2 + 1.6; R.rect(20, 110, 44, 152, hex('#14141a')); R.rect(22, 113, 42, 149, av ? hex('#4a6ac8') : hex('#1a1e2a')); if (av) { R.rect(25, 118, 39, 124, hex('#e8eef8')); R.disco(28, 121, 1, hex('#3ac85a')); }
  // la taza vista desde arriba con su vapor
  R.disco(262, 52, 13, hex('#2a2a34')); R.disco(262, 52, 12, hex('#e8e2d0')); R.disco(262, 52, 9, hex('#3a2010')); ps(259, 49, hex('#6a4a30')); R.rect(274, 49, 279, 55, hex('#e8e2d0'));
  for (let k = 0; k < 5; k++) { const u = (t * 0.5 + k / 5) % 1; tine(262 + Math.sin(u * 6 + k) * 4, 48 - u * 16, hex('#f0f0f0'), 0.45 * (1 - u)); }
  halo(300, 20, 90, hex('#ffe0a0'), 0.18);
  // las dos hojas suben en «And you», las dos manos las sujetan
  const s = ease(tramo(t, W.ANDYOU - 0.1, W.HAD)), dy = ri((1 - s) * 70), tb = t > W.HANDS - 0.1 && t < W.HANDS + 0.9 ? ri(Math.sin(t * 30) * 0.8) : 0;
  const L = [112, 102 + dy], Rr = [206, 102 + dy + tb];
  T.d_hoja(R, L[0], L[1], { n: 1, escala: 2, t }); T.d_hoja(R, Rr[0], Rr[1], { n: 3, escala: 2, t: t + 2 });
  if (t > W.SHEETS - 0.1) { const g = tramo(t, W.SHEETS - 0.1, W.SHEETS + 0.3) * (1 - tramo(t, W.HANDS + 0.4, W.COUNTING)); halo(L[0], L[1], 34, hex('#fff0b0'), 0.25 * g); halo(Rr[0], Rr[1], 34, hex('#fff0b0'), 0.25 * g); }
  T.brazo(R, 48, 214, L[0] - 24, L[1] + 32, '#3a5a8a', 1, { codo: [54, L[1] + 58] });
  T.brazo(R, 270, 214, Rr[0] + 24, Rr[1] + 32, '#3a5a8a', -1, { codo: [264, Rr[1] + 58] });
  [L, Rr].forEach(([x, y], k) => { const u = tramo(t, W.UNSOLVED2 + k * 0.25, W.UNSOLVED2 + 0.25 + k * 0.25); if (u > 0) R.icono('?', x - 7, ri(y - 50 - u * 4), hex('#fff0a0'), K, 3); });
};

// ── 13 · el estudio: contar palabras o la trampa ───────────────────────────────────────────────────────────────
let PZ = null, CUENTA = [0, 0];
const pizarra13 = (R2, t, [x0, y0, x1, y1]) => { PZ = [x0, y0, x1, y1]; const tiza = hex('#eef2e8'), tz2 = hex('#b8c4b0'), w = x1 - x0, h = y1 - y0, xm = ri(x0 + w * 0.56);
  // el pergamino de tiza con sus palabras-bloque
  const px0 = x0 + 6, px1 = xm - 8, py0 = y0 + 8, py1 = y1 - 8;
  R.linea(px0, py0, px1, py0, tiza); R.linea(px0, py1, px1, py1, tiza); R.linea(px0, py0, px0, py1, tz2); R.linea(px1, py0, px1, py1, tz2);
  for (const yy of [py0, py1]) { R.disco(px0 - 1, yy, 2, tz2); R.disco(px1 + 1, yy, 2, tz2); }
  R.linea(px0 + 4, py0 + 4, px1 - 4, py0 + 4, tiza);
  let n = 0; const cuenta = ri(tramo(t, W.COUNTING - 0.2, W.DECL + 0.8) * 12);
  for (let fila = 0; fila < 4; fila++) { let x = px0 + 4; const y = py0 + 12 + fila * 9; while (x < px1 - 8) { const ww = 4 + ri(hh(x, fila, 7) * 6); if (x + ww > px1 - 4) break; n++;
    const on = n <= cuenta; R.linea(x, y, x + ww, y, on ? hex('#f8e070') : tz2); if (on && n <= 12) cifras(n, x, y - 7, hex('#f8e070')); if (n === Math.max(1, cuenta)) CUENTA = [x + ww / 2, y]; x += ww + 3; } }
  // la ratonera de tiza con la hojita de cebo; salta en «trap»
  const rx = xm + 4, ry = y1 - 14, c = tramo(t, W.TRAP2 - 0.08, W.TRAP2 + 0.06);
  R.linea(rx, ry, x1 - 8, ry, tiza); R.linea(rx, ry + 5, x1 - 8, ry + 5, tiza); R.linea(rx, ry, rx, ry + 5, tiza); R.linea(x1 - 8, ry, x1 - 8, ry + 5, tiza);
  R.linea(x1 - 22, ry - 8, x1 - 14, ry - 8, tiza); R.linea(x1 - 22, ry - 1, x1 - 14, ry - 1, tiza); R.linea(x1 - 22, ry - 8, x1 - 22, ry - 1, tiza); R.linea(x1 - 14, ry - 8, x1 - 14, ry - 1, tiza);
  const hx = ri((rx + x1 - 8) / 2), a = lerp(Math.PI * 0.92, 0.08, ease(c)), L = 18; R.linea(hx, ry, ri(hx - Math.cos(a) * L), ri(ry - Math.sin(a) * L), hex('#f8e070'));
  if (c >= 1 && t < W.TRAP2 + 0.6) for (let k = 0; k < 4; k++) R.linea(hx - 12 + k * 6, ry - 12, hx - 14 + k * 6, ry - 18, tz2);
  if (t > W.TRAP2) R.icono('X', hx - 7, ry - 34, hex('#f87060'), hex('#2a3a2e'), 2);
  // la raya del medio: o… o…
  for (let y = y0 + 10; y < y1 - 6; y += 3) ps(xm, y, tz2);
};
const p13 = (t) => {
  const o = { pizarra: pizarra13 }; T.estudio(R, t, o);
  // Atom luciérnaga va tocando cada palabra que se cuenta; en «or» vuela a la ratonera, que salta en «trap»; luego mira a cámara
  const [x0, y0, x1, y1] = PZ || [110, 38, 205, 108], [cx, cy] = CUENTA[0] ? CUENTA : [x0 + 20, y0 + 20];
  const ir = ease(tramo(t, W.COUNTING - 0.4, W.COUNTING + 0.1)), vb = ease(tramo(t, W.OR - 0.3, W.TRAP2 - 0.3)), salta = t > W.TRAP2 ? Math.max(0, 1 - (t - W.TRAP2) * 2) : 0, sal = ease(tramo(t, W.TRAP2 + 0.6, W.TELL - 0.2));
  let ax = lerp(lerp(60, cx + 4, ir), x1 - 30, vb), ay = lerp(lerp(140, cy - 8, ir), y1 - 30, vb) - salta * 10;
  ax = lerp(ax, 160, sal); ay = lerp(ay, 124, sal);
  if (vb < 0.05 && ir >= 1) halo(cx, cy, 10, hex('#fff0a0'), 0.5);
  T.AT.luciernaga(R, ri(ax), ri(ay + Math.sin(t * 4) * 1.5), t, { dir: vb > 0 && sal < 0.5 ? 1 : -1, brillo: 1, cara: salta > 0 ? 'sorpresa' : sal > 0.5 ? 'sonrisa' : 'normal' });
  if (salta > 0) R.icono('!', ri(ax) - 3, ri(ay) - 26, hex('#fff070'), K, 2);
  T.estudioDelante(R, t, o);
};

// ── 14 · la mesa del estudio de cerca: cierra el folleto y señala los comentarios ────────────────────────────────
const p14 = (t) => {
  const o = { camara: 'mesa' }; const g = T.estudio(R, t, o) || {}; const m = g.mesa || [100, 120, 220, 170];
  const fx = ri((m[0] + m[2]) / 2) + 34, fy = m[3] - 22, cierra = tramo(t, W.TELL - 0.15, W.TELL + 0.35);
  T.d_folleto(R, fx, fy, { escala: 2, abierto: 1 - cierra, t, brillo: cierra > 0.9 ? tramo(t, W.TELL + 0.35, W.TELL + 0.8) * (1 - tramo(t, W.TELL + 0.8, W.COMMENTS)) : 0 });
  const senala = t > W.COMMENTS - 0.2;
  T.AT.atom(R, fx - 62, m[3] - 4, t, { s: 2, dir: 1, pose: senala ? 'senala' : t < W.TELL + 0.3 ? 'sostiene' : 'quieto', cara: t > W.CURIOUS - 0.1 ? 'guino' : t > W.TELL + 0.4 ? 'sonrisa' : 'normal', habla: voz(t) });
  // el bocadillo de los comentarios, abajo a la derecha
  const b = tramo(t, W.COMMENTS - 0.15, W.COMMENTS + 0.2); if (b > 0) { const bx = 250, by = ri(140 + (1 - b) * 8), w = ri(50 * b), h = ri(24 * b);
    R.rect(bx - 1, by - 1, bx + w + 1, by + h + 1, K); R.rect(bx, by, bx + w, by + h, hex('#ffffff')); R.poligono([[bx + 8, by + h], [bx + 2, by + h + 8], [bx + 16, by + h]], hex('#ffffff')); R.linea(bx + 8, by + h + 1, bx + 2, by + h + 8, K);
    if (b >= 1) for (let k = 0; k < 3; k++) { const on = Math.floor(t * 4) % 3 >= k; R.disco(bx + 14 + k * 11, by + 12, 2, on ? hex('#3a6ad8') : hex('#b8c8e8')); } }
};

const efectos = [[W.NOTHING - 0.1, 'whoosh'], [W.UNDER, 'brillo'], [W.COMPLETELY, 'pop'],
  [W.ARGUE, 'tecleo'], [W.ALPHA, 'papel'], [W.CLUE, 'brillo'], [W.TRAP, 'toc'],
  [W.AND1 + 0.3, 'pasos'], [W.DETECTOR, 'bip'], [W.DETECTOR + 0.6, 'bip'], [W.MONT, 'brillo'],
  [W.EVERY - 0.2, 'whoosh'], [W.ANSWER, 'brillo'],
  [W.FOREST, 'pop'], [W.N50, 'papel'], [W.PAMPH, 'brillo'], [W.PAMPH + 0.6, 'papel'],
  [W.NOW + 0.3, 'pasos'], [W.WHO, 'pop'], [W.NUMBERS, 'brillo'], [W.NUMBERS + 0.3, 'puerta'],
  [W.SOMEONE, 'lapiz'], [W.UNDERST, 'lapiz'], [W.GOLD, 'brillo'],
  [W.BOX, 'golpecito'], [W.PAGES, 'papel'], [W.SIMPLY, 'cerrojo'], [W.ALONE, 'brillo'],
  [W.ANDTHAT, 'toc'], [W.N140, 'tic'], [W.SOMEONE2, 'pop'], [W.VIRGINIA, 'brillo'],
  [W.PICK, 'golpecito'], [W.SOMETIMES + 0.3, 'pasos'], [W.SOMETIMES + 0.7, 'guau'], [W.TREASURE2, 'pajaros'],
  [W.URGE, 'viento'], [W.US, 'brillo'],
  [W.ANDYOU, 'papel'], [W.UNSOLVED2, 'pop'],
  [W.COUNTING, 'lapiz'], [W.TRAP2, 'toc'],
  [W.TELL, 'papel'], [W.COMMENTS, 'pop']];
const año = (t) => t < W.NOW ? 2026 : t < W.ANDTHAT ? 1885 : t < W.N140 ? 1885 : t < W.LATER ? 1885 + ri(141 * ease(tramo(t, W.N140 - 0.1, W.LATER))) : 2026;
T.rodar(E, R, [[0, p1], [W.THERE, p2], [W.AND1, p3], [W.BUT, p4], [W.BEALES, p5], [W.NOW, p6], [W.MOST2, p7], [W.AN, p8], [W.ANDTHAT, p9], [W.PICK, p10], [W.BUT2, p11], [W.ANDYOU, p12], [W.COUNTING, p13], [W.TELL, p14]], { efectos, año });
'''

# los instantes de cada palabra de la voz inglesa (de atomo/build/largo/ep48/linea.json)
WTXT = r'''const W = { NOTHING: en('bedford', 0.0340), UNDER: en('bedford', 0.0432), BEDFORD: en('bedford', 0.0743), NOBODY: en('bedford', 0.1075), PROVEN: en('bedford', 0.1330), COMPLETELY: en('bedford', 0.1528), THERE: en('bedford', 0.1967), PEOPLE: en('bedford', 0.2229), ARGUE: en('bedford', 0.2484), GILL: en('bedford', 0.2703), ALPHA: en('bedford', 0.2929), CLUE: en('bedford', 0.3403), TRAP: en('bedford', 0.3842), AND1: en('bedford', 0.4104), WEEKENDS: en('bedford', 0.4606), METAL: en('bedford', 0.5052), DETECTOR: en('bedford', 0.5165), TREES: en('bedford', 0.5675), MONT: en('bedford', 0.5866), BUT: en('bedford', 0.6503), ASK: en('bedford', 0.6701), EVERY: en('bedford', 0.7076), SEEN: en('bedford', 0.7316), MOST: en('bedford', 0.7635), ANSWER: en('bedford', 0.7833), BEALES: en('bedford', 0.8194), TREASURE: en('bedford', 0.8349), BURIED: en('bedford', 0.8646), FOREST: en('bedford', 0.8922), ALL: en('bedford', 0.9142), INSIDE: en('bedford', 0.9425), N50: en('bedford', 0.9580), PAMPH: en('bedford', 0.9771), NOW: en('quien', 0.0000), QUESTION: en('quien', 0.0360), HOLD: en('quien', 0.0845), WHO: en('quien', 0.1330), WROTE: en('quien', 0.1556), NUMBERS: en('quien', 0.1782), MOST2: en('quien', 0.2593), SOMEONE: en('quien', 0.2986), LYNCH: en('quien', 0.3321), UNDERST: en('quien', 0.3731), MYSTERY: en('quien', 0.4115), GOLD: en('quien', 0.4400), AN: en('quien', 0.4785), IRON: en('quien', 0.4860), BOX: en('quien', 0.4985), TWO: en('quien', 0.5420), UNSOLVED: en('quien', 0.5512), PAGES: en('quien', 0.5688), SOMETHING: en('quien', 0.6014), ALONE: en('quien', 0.6801), ANDTHAT: en('quien', 0.7169), N140: en('quien', 0.7319), YEARS: en('quien', 0.7520), LATER: en('quien', 0.7813), STILL: en('quien', 0.8214), SOMEONE2: en('quien', 0.8423), SOMEWHERE: en('quien', 0.8766), VIRGINIA: en('quien', 0.9109), PICK: en('quien', 0.9536), SHOVEL: en('quien', 0.9728), SOMETIMES: en('quien', 1.0167), VALUABLE: en('pregunta', 0.0416), TREASURE2: en('pregunta', 0.0916), GOLD2: en('pregunta', 0.1471), BUT2: en('pregunta', 0.1906), URGE: en('pregunta', 0.2110), SEARCH: en('pregunta', 0.2406), INSIDE2: en('pregunta', 0.2961), US: en('pregunta', 0.3165), ANDYOU: en('pregunta', 0.3822), HAD: en('pregunta', 0.4247), TWO2: en('pregunta', 0.4414), SHEETS: en('pregunta', 0.4821), HANDS: en('pregunta', 0.5210), COUNTING: en('pregunta', 0.5876), WORDS: en('pregunta', 0.6200), DECL: en('pregunta', 0.6440), OR: en('pregunta', 0.7014), TRAP2: en('pregunta', 0.7504), TELL: en('pregunta', 0.8217), COMMENTS: en('pregunta', 0.8606), CURIOUS: en('pregunta', 0.9355), DO: en('pregunta', 0.9855), SIMPLY: en('quien', 0.6307), UNSOLVED2: en('pregunta', 0.4534) };'''

E['bl-cierre'] = ('El cierre', CAB, AYUDAS + WTXT + "\n" + CUERPO)
