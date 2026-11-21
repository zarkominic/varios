E = {}

# ayudas comunes a las tres escenas (cada escena es un .html suelto: se copian en cada cuerpo)
AY = r'''
const K = T.C.k, BL = hex('#ffffff');
const hh = (x, y, s) => { let n = (x * 374761393 + y * 668265263 + s * 982451653) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const mez = (p, q, u) => { let r = 0; for (const s of [0, 8, 16]) { const ca = (p >>> s) & 255, cb = (q >>> s) & 255; r += Math.round(ca + (cb - ca) * u) * (1 << s); } return (0xff000000 + r) >>> 0; };
// resplandor: mezcla un disco con un color, en escalones (pixel art), más fuerte en el centro
const luz = (cx, cy, r, col, a) => { cx = Math.round(cx); cy = Math.round(cy);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d >= 1) continue; const x = cx + i, y = cy + j; if (x < 0 || y < 0 || x > 319 || y > 179) continue;
    const k = Math.round(a * (1 - d) * 5) / 5; if (k <= 0) continue; R.pset(x, y, mez(R.pget(x, y), col, Math.min(0.85, k))); } };
// el bocadillo redondeado con su rabito (x, y: la punta del rabito); devuelve el centro
const bocadillo = (x, y, w = 10, h = 18) => { x = Math.round(x); y = Math.round(y); const x0 = x - w, x1 = x + w, y1 = y - 4, y0 = y1 - h;
  R.rect(x0 + 1, y0, x1 - 1, y1, K); R.rect(x0, y0 + 1, x1, y1 - 1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, BL); R.rect(x0 + 2, y1 - 1, x1 - 1, y1 - 1, hex('#d0d0dc'));
  for (let k = 0; k < 4; k++) { R.pset(x - 1 + (k >> 1), y1 + k, K); R.pset(x + (k >> 1), y1 + k, k < 3 ? BL : K); R.pset(x + 1 + (k >> 1), y1 + k, K); }
  return [x, Math.round((y0 + y1) / 2)]; };
const globo = (x, y, ic, col = K) => { const [cx, cy] = bocadillo(x, y); R.icono(ic, cx - 5, cy - 7, col, hex('#c8c8d0'), 2); };
// anillo de chispas que se abre (u 0–1)
const destello = (x, y, u, r0 = 4, r1 = 18, c = hex('#fff2b0')) => { if (u <= 0 || u >= 1) return; const r = r0 + (r1 - r0) * u;
  for (let k = 0; k < 16; k++) { if ((k + Math.floor(u * 5)) % 3 === 0) continue; const a = k / 16 * Math.PI * 2; R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r * 0.85), u < 0.6 ? c : hex('#e8c060')); } };
// una estrellita de brillo (cruz de 5 px)
const chispa = (x, y, c = hex('#fff6c8')) => { x = Math.round(x); y = Math.round(y); R.pset(x, y, BL); for (const [i, j] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(x + i, y + j, c); R.pset(x + 2, y, hex('#e8c060')); R.pset(x - 2, y, hex('#e8c060')); R.pset(x, y - 2, hex('#e8c060')); R.pset(x, y + 2, hex('#e8c060')); };
// el farol de mano (x, y: la mano que lo coge por el asa), con su resplandor
const farol = (x, y, t, r = 22) => { x = Math.round(x); y = Math.round(y); luz(x, y + 7, r, hex('#ffd890'), 0.5);
  R.pset(x, y, K); R.pset(x, y + 1, K); R.rect(x - 3, y + 2, x + 3, y + 3, K); R.rect(x - 2, y + 2, x + 2, y + 2, hex('#8a6a3a'));
  R.rect(x - 3, y + 4, x + 3, y + 11, K); R.rect(x - 2, y + 4, x + 2, y + 10, hex('#f8d870')); R.rect(x - 2, y + 4, x - 2, y + 10, hex('#fff2c0'));
  const f = Math.sin(t * 17) > 0; R.pset(x, y + 6, f ? BL : hex('#ffe8a0')); R.pset(x, y + 7, hex('#f0a030')); R.pset(x, y + 8, hex('#e07020'));
  R.rect(x - 3, y + 11, x + 3, y + 12, hex('#3a3430')); R.rect(x - 1, y + 4, x + 1, y + 4, hex('#3a3430')); };
// la pala (x, y: la mano); arriba: con la hoja en alto, al hombro
const pala = (x, y, arriba = false) => { x = Math.round(x); y = Math.round(y); const s = arriba ? -1 : 1;
  R.linea(x, y - 6 * s, x, y + 9 * s, hex('#5a3418')); R.linea(x + 1, y - 6 * s, x + 1, y + 9 * s, hex('#a8743c')); R.rect(x - 1, y - 7 * s, x + 2, y - 7 * s, hex('#5a3418'));
  const yb = y + 10 * s; R.rect(x - 2, Math.min(yb, yb + 5 * s), x + 3, Math.max(yb, yb + 5 * s), K); R.rect(x - 1, Math.min(yb, yb + 4 * s), x + 2, Math.max(yb, yb + 4 * s), hex('#9aa4b4')); R.pset(x - 1, yb + 2 * s, hex('#d8dee8')); };
// el casco amarillo de obra sobre la cabeza (cab: lo que devuelve R.actor en .cabeza)
const casco = (cab, dir = 1) => { const x = cab[0], y = cab[1] + 1;
  R.rect(x - 5, y - 4, x + 5, y - 1, K); R.rect(x - 6, y - 3, x + 6, y - 1, K); R.rect(x - 4, y - 3, x + 4, y - 1, hex('#f0c030')); R.rect(x - 5, y - 2, x + 5, y - 1, hex('#f0c030'));
  R.rect(x - 3, y - 3, x - 1, y - 3, hex('#fff0a0')); R.rect(x - 7, y, x + 7, y + 1, K); R.rect(x - 6, y, x + 6, y, hex('#d8a020')); R.pset(x + 7 * dir, y, hex('#d8a020')); R.rect(x, y - 4, x, y - 1, hex('#c88a18')); };
'''

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['te-corbu'] = ('El hotel de la torre', '''// TE-CORBU (frases 40–41), 1956 → 1967. Cuatro planos:
// 1. (fondo local: la recepción del hotel en la villa, 1956) un huésped entra con su maleta por la puerta de cristal y en
//    «hotel» toca el timbre del mostrador; el dueño, Noël Corbu, le da la llave y en «villa» señala la torre por la ventana;
// 2. (villa, general, con el hotel; corte en «Noel») Corbu habla con los periodistas, que apuntan; en «reporters» el
//    fotógrafo dispara el flash; en «found a treasure» Corbu abre los brazos y le sale un cofre que brilla; en «tourists»
//    llega el autobús por la carretera, pita, y dos turistas entran por la derecha con su cámara;
// 3. (despacho, mesa; corte tras «coming») 1967: una mano con pincel escribe trazos en un pergamino; en «secret messages»
//    se encienden puntos dorados escondidos; en «which» moja el pincel en el té y en «forged» mancha los pergaminos;
// 4. (fondo local: la sala de la sociedad inventada; corte en «and an invented») un hombre echa una túnica vacía sobre
//    una silla; las velas se avivan; en «Priory» sella el pergamino y el emblema dorado brilla en el estandarte; en «Sion»
//    la capucha vacía de una túnica asiente sola («?»).''', AY + r'''
const h = (f) => en('hotel', f), g = (f) => en('pergaminos', f);
const P2 = h(0.407), P3 = h(1.006), P4 = g(0.6);

// ── 1 · la recepción del hotel (1956) ──
const TIMBRE = h(0.222), LLAVE = h(0.3), VILLA = h(0.352);
let B1 = null;
const fondo1 = () => { if (B1) return B1; B1 = R.nuevo(); const prev = R.usar(B1);
  // el papel pintado de los cincuenta: rayas verdes y ramitos
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const r = x % 14, c = r < 2 ? hex('#a9b88e') : r === 7 ? hex('#c2cfa6') : hex('#d4ddb8'); R.pset(x, y, hh(x >> 1, y >> 1, 3) < 0.06 ? mez(c, hex('#8a9a70'), 0.5) : c); }
  for (let y = 6; y < 128; y += 12) for (let x = 4 + ((y / 12) % 2) * 7; x < 320; x += 14) { R.pset(x, y, hex('#c8705e')); R.pset(x + 1, y, hex('#e0907a')); R.pset(x, y + 1, hex('#6a8a50')); R.pset(x - 1, y + 2, hex('#6a8a50')); }
  // la moldura de arriba y el friso
  R.rect(0, 18, 319, 20, hex('#7a4a2a')); R.rect(0, 18, 319, 18, hex('#a8703a')); R.rect(0, 21, 319, 21, hex('#5a3418'));
  // el zócalo de madera con sus cuarterones
  R.rect(0, 112, 319, 156, hex('#6a3e22')); R.rect(0, 112, 319, 113, hex('#a8703a'));
  for (let x = 0; x < 320; x += 32) { R.rect(x + 3, 117, x + 28, 151, hex('#5a3218')); R.rect(x + 4, 118, x + 27, 150, hex('#7a4a2a')); R.rect(x + 4, 118, x + 27, 118, hex('#9a6238'));
    for (let k = 0; k < 6; k++) { const yy = 120 + Math.floor(hh(x, k, 7) * 28); R.linea(x + 6, yy, x + 25, yy + (k % 2), hex('#6e4024')); } }
  // el suelo de baldosas en damero, con su perspectiva y el brillo
  for (let y = 156; y < 180; y++) { const fila = Math.floor((y - 156) / (4 + (y - 156) / 8)); const w = 10 + (y - 156) / 3;
    for (let x = 0; x < 320; x++) { const col = Math.floor((x - 160) / w + 100); const osc = (col + fila) % 2;
      let c = osc ? hex('#e8e0cc') : hex('#9a3a32'); if (hh(x >> 2, y >> 1, 11) < 0.08) c = mez(c, K, 0.12); R.pset(x, y, c); } }
  for (let x = 0; x < 320; x++) R.pset(x, 156, hex('#3a2418'));
  // la alfombra delante del mostrador
  R.rect(84, 164, 236, 177, hex('#5a1a1e')); R.rect(86, 165, 234, 176, hex('#a8303a')); R.rect(90, 167, 230, 174, hex('#c8a040')); R.rect(91, 168, 229, 173, hex('#8a2228'));
  for (let x = 94; x < 228; x += 6) { R.pset(x, 170, hex('#e8c060')); R.pset(x + 1, 171, hex('#e8c060')); R.pset(x + 2, 170, hex('#e8c060')); }
  for (let x = 86; x <= 234; x += 3) { R.pset(x, 178, hex('#e8d8b0')); R.pset(x, 163, hex('#e8d8b0')); }
  // la ventana con la torre Magdala (lo de fuera se pinta recortado al hueco)
  R.rect(14, 30, 80, 106, hex('#4a2a14')); R.rect(16, 32, 78, 104, hex('#e8e0cc'));
  R.recorte([18, 34, 76, 102]);
  for (let y = 34; y <= 102; y++) for (let x = 18; x <= 76; x++) { const u = (y - 34) / 50; R.pset(x, y, R.b4(x, y) < u ? hex('#a8d0f0') : hex('#6aa8e0')); }
  R.poligono([[18, 82], [30, 66], [42, 74], [56, 60], [70, 72], [76, 68], [76, 86], [18, 86]], hex('#8a8ab8')); R.poligono([[28, 68], [30, 66], [33, 69]], BL); R.poligono([[53, 63], [56, 60], [59, 63]], BL);
  R.poligono([[18, 88], [40, 82], [76, 86], [76, 102], [18, 102]], hex('#6a9a4a'));
  for (let k = 0; k < 40; k++) R.pset(18 + Math.floor(hh(k, 1, 5) * 58), 88 + Math.floor(hh(k, 2, 5) * 14), hex('#4a7a3a'));
  // la torre: piedra, almenas, la torrecilla y su ventana
  R.poligono([[42, 96], [42, 58], [60, 58], [60, 96]], hex('#c8b088')); for (let y = 60; y < 96; y += 4) for (let x = 42 + ((y / 4) % 2) * 3; x < 60; x += 6) R.pset(x, y, hex('#9a8460'));
  for (let x = 42; x < 60; x += 4) R.poligono([[x, 58], [x, 54], [x + 2, 54], [x + 2, 58]], hex('#c8b088'));
  R.poligono([[56, 60], [56, 46], [62, 46], [62, 60]], hex('#b8a078')); R.poligono([[55, 46], [59, 40], [63, 46]], hex('#8a6a4a'));
  R.poligono([[49, 66], [49, 72], [53, 72], [53, 66]], hex('#2a1e18')); R.linea(42, 96, 60, 96, hex('#9a8460')); R.linea(60, 58, 60, 96, hex('#9a8460'));
  R.recorte(null);
  // el marco en cruz y el alféizar
  R.rect(46, 32, 48, 104, hex('#e8e0cc')); R.rect(16, 66, 78, 68, hex('#e8e0cc')); R.rect(10, 104, 84, 108, hex('#e8e0cc')); R.rect(10, 108, 84, 109, hex('#a8a08c'));
  // las cortinas de terciopelo con pliegues y la galería
  for (const [x0, x1] of [[4, 18], [76, 90]]) for (let x = x0; x <= x1; x++) for (let y = 26; y < 116; y++) { const f = (x - x0) % 5; R.pset(x, y, f === 0 ? hex('#5a141a') : f === 1 ? hex('#a8303a') : f === 2 ? hex('#c84a50') : hex('#8a2228')); }
  R.rect(2, 22, 92, 27, hex('#5a141a')); R.rect(2, 22, 92, 25, hex('#a8303a')); for (let x = 3; x < 92; x += 4) R.pset(x, 27, hex('#e8c060'));
  R.rect(4, 70, 18, 72, hex('#e8c060')); R.rect(76, 70, 90, 72, hex('#e8c060'));
  // el casillero de cartas y el tablero de llaves, detrás del mostrador
  R.rect(102, 40, 146, 96, hex('#4a2a14')); for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { const x = 104 + i * 10, y = 42 + j * 13; R.rect(x, y, x + 8, y + 11, hex('#2a1608')); R.rect(x, y + 11, x + 8, y + 11, hex('#8a5a30'));
    if (hh(i, j, 21) < 0.55) { R.rect(x + 1, y + 5, x + 7, y + 10, hex('#f2eee2')); R.linea(x + 1, y + 5, x + 4, y + 8, hex('#b8b0a0')); R.linea(x + 7, y + 5, x + 4, y + 8, hex('#b8b0a0')); if (hh(i, j, 22) < 0.3) R.pset(x + 4, y + 9, hex('#c83a3a')); } }
  R.rect(150, 36, 232, 98, hex('#4a2a14')); R.rect(152, 38, 230, 96, hex('#8a5a30')); for (let k = 0; k < 14; k++) R.linea(152, 40 + Math.floor(hh(k, 3, 9) * 54), 230, 40 + Math.floor(hh(k, 3, 9) * 54) + (k % 2), hex('#7a4a26'));
  const fobs = [hex('#c83a3a'), hex('#3a6ac8'), hex('#3a9a5a'), hex('#c8a040')];
  for (let j = 0; j < 3; j++) for (let i = 0; i < 7; i++) { const x = 158 + i * 11, y = 44 + j * 18; R.rect(x - 1, y, x + 1, y + 1, hex('#e8c060')); R.pset(x, y + 2, hex('#a8843a'));
    if (!(i === 3 && j === 1) && hh(i, j, 31) < 0.8) { R.linea(x, y + 2, x, y + 7, hex('#c8a040')); R.pset(x + 1, y + 6, hex('#c8a040')); const c = fobs[(i + j) % 4]; R.rect(x - 2, y + 8, x + 2, y + 13, K); R.rect(x - 1, y + 9, x + 1, y + 12, c); R.pset(x - 1, y + 9, mez(c, BL, 0.5)); } }
  // el cuadro de la villa y la planta
  R.rect(242, 50, 270, 72, hex('#c8a040')); R.rect(244, 52, 268, 70, hex('#6aa8e0')); R.rect(244, 62, 268, 70, hex('#6a9a4a')); R.rect(250, 56, 262, 66, hex('#e8dcc0')); R.poligono([[249, 57], [256, 52], [263, 57]], hex('#c86a3a')); R.rect(254, 62, 257, 66, hex('#5a3418'));
  // la puerta de cristal al jardín: el marco (la hoja se pinta en cada fotograma)
  R.rect(276, 56, 316, 157, hex('#4a2a14')); R.rect(278, 58, 314, 156, hex('#f2e8c8'));
  for (let y = 58; y <= 156; y++) for (let x = 278; x <= 314; x++) { const u = (y - 58) / 98; R.pset(x, y, y > 120 ? (hh(x >> 1, y >> 1, 4) < 0.5 ? hex('#d8c8a0') : hex('#c8b890')) : y > 108 ? hex('#7aa84a') : R.b4(x, y) < u * 1.6 ? hex('#cfe4f4') : hex('#a8d0f0')); }
  for (let x = 280; x < 314; x += 8) { R.rect(x, 96, x + 5, 99, x % 16 ? hex('#c83a3a') : hex('#f2eee2')); } R.rect(296, 99, 297, 120, hex('#6a6a6a'));
  // la percha con el sombrero y el paraguas
  R.rect(262, 92, 263, 156, hex('#4a2a14')); R.rect(256, 92, 269, 93, hex('#4a2a14')); R.rect(257, 86, 266, 91, K); R.rect(258, 87, 265, 90, hex('#6a5a4a')); R.rect(255, 90, 268, 91, hex('#3a2a20'));
  R.linea(268, 100, 272, 150, hex('#2a2a40')); R.poligono([[266, 104], [270, 102], [274, 140], [270, 142]], hex('#3a3a5a'));
  R.rect(256, 152, 269, 156, hex('#3a2418'));
  // la palmera en su macetero junto a la ventana
  R.rect(90, 140, 102, 156, K); R.rect(91, 141, 101, 156, hex('#b8683a')); R.rect(91, 141, 101, 142, hex('#d8884a'));
  R.usar(prev); return B1; };
const mostrador = (t) => {   // el mostrador va por delante de Corbu
  R.rect(104, 130, 236, 157, K); R.rect(105, 134, 235, 156, hex('#6a3e22')); R.rect(104, 130, 236, 134, hex('#e8e0cc')); R.rect(104, 130, 236, 130, BL); R.rect(104, 134, 236, 134, hex('#a8a08c'));
  for (let x = 108; x < 232; x += 32) { R.rect(x, 138, x + 26, 152, hex('#5a3218')); R.rect(x + 1, 139, x + 25, 151, hex('#7a4a2a')); R.rect(x + 1, 139, x + 25, 139, hex('#9a6238')); R.rect(x + 12, 144, x + 14, 146, hex('#c8a040')); }
  R.rect(105, 154, 235, 156, hex('#c8a040'));
  // encima: la lámpara verde, el libro de registro, el teléfono, el jarrón
  R.rect(112, 128, 120, 129, hex('#c8a040')); R.rect(115, 118, 116, 127, hex('#c8a040')); R.rect(110, 114, 122, 118, K); R.rect(111, 115, 121, 117, hex('#2a7a4a')); R.rect(112, 115, 120, 115, hex('#5aba7a')); luz(116, 124, 10, hex('#fff2c0'), 0.4);
  R.rect(128, 126, 150, 129, K); R.rect(129, 126, 138, 128, hex('#f2eee2')); R.rect(140, 126, 149, 128, hex('#f2eee2')); R.rect(139, 125, 139, 129, hex('#8a2228')); for (let k = 0; k < 3; k++) { R.linea(130, 127 - 0 + 0, 136, 127, hex('#8a8aa0')); R.linea(141, 127, 147, 127, hex('#8a8aa0')); }
  R.rect(218, 124, 228, 129, K); R.rect(219, 125, 227, 128, hex('#2a2a2a')); R.rect(217, 121, 229, 123, K); R.pset(223, 126, hex('#c8c8c8'));
  R.rect(232, 120, 236, 129, hex('#3a6ac8')); R.pset(233, 121, hex('#8ab0f0')); for (let k = 0; k < 5; k++) R.pset(231 + k, 116 - (k % 2) * 2 + Math.round(Math.sin(t * 2 + k)), [hex('#e84a6a'), hex('#f0d040'), hex('#f2eee2')][k % 3]);
  R.linea(234, 119, 233, 116, hex('#3a7a3a')); };
const timbre = (x, y, golpe) => { R.rect(x - 4, y - 1, x + 4, y, K); R.rect(x - 3, y - 1, x + 3, y - 1, hex('#5a3418')); R.disco(x, y - 4, 3.5, K); R.disco(x, y - 4, 2.6, hex('#e8c060')); R.pset(x - 1, y - 5, hex('#fff2b0')); R.rect(x, y - 9 + (golpe ? 1 : 0), x, y - 8 + (golpe ? 1 : 0), K);
  if (golpe) { for (const [i, j] of [[-6, -6], [-7, -3], [6, -6], [7, -3], [0, -12]]) R.pset(x + i, y + j, hex('#e8c060')); } };
const llave = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 1, y - 1, x + 1, y + 1, hex('#e8c060')); R.pset(x, y, K); R.rect(x + 2, y, x + 6, y, hex('#e8c060')); R.pset(x + 5, y + 1, hex('#e8c060')); R.rect(x - 4, y + 2, x - 1, y + 6, K); R.rect(x - 3, y + 3, x - 2, y + 5, hex('#3a6ac8')); };
const maletaH = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 2, y - 1, x + 2, y, K); R.rect(x - 7, y + 1, x + 7, y + 10, K); R.rect(x - 6, y + 2, x + 6, y + 9, hex('#a8743c')); R.rect(x - 6, y + 2, x + 6, y + 2, hex('#c8944c')); R.rect(x - 3, y + 2, x - 2, y + 9, hex('#6a4022')); R.rect(x + 2, y + 2, x + 3, y + 9, hex('#6a4022')); R.pset(x - 5, y + 6, hex('#e8c060')); };
const p1 = (t) => {
  R.copiar(fondo1());
  // nubes que pasan por la ventana (recortadas) y un pájaro
  R.recorte([18, 34, 76, 64]);
  for (let k = 0; k < 3; k++) { const x = 18 + ((t * (3 + k * 2) + k * 40) % 90) - 20, y = 40 + k * 7; R.disco(x, y, 4, hex('#f2f6fa')); R.disco(x + 5, y - 1, 5, BL); R.disco(x + 10, y, 3.5, hex('#dfe8f0')); R.linea(x - 3, y + 3, x + 13, y + 3, hex('#c8d4e0')); }
  { const bx = 18 + ((t * 9) % 70), by = 46 + Math.round(Math.sin(t * 2) * 3); R.pset(bx, by, K); R.pset(bx - 1, by - (Math.floor(t * 6) % 2), K); R.pset(bx + 1, by - (Math.floor(t * 6) % 2), K); }
  R.recorte(null);
  // las hojas de la palmera que se mecen
  for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.42 + Math.sin(t * 1.3 + k) * 0.05; for (let i = 0; i < 18; i++) { const r = i * (1 - Math.abs(k - 3) * 0.08); R.pset(Math.round(96 + Math.cos(a) * r), Math.round(140 + Math.sin(a) * r + (i * i) / 60), i % 4 === 0 ? hex('#2a6a2a') : hex('#4a9a3a')); } }
  // el reloj con su péndulo
  { const cx = 252, cy = 36; R.disco(cx, cy, 9, K); R.disco(cx, cy, 8, hex('#7a4a2a')); R.disco(cx, cy, 6, hex('#f2eee2')); R.linea(cx, cy, cx, cy - 4, K); R.linea(cx, cy, cx + 3, cy + 1, K); for (let k = 0; k < 12; k++) R.pset(Math.round(cx + Math.cos(k * 0.52) * 5), Math.round(cy + Math.sin(k * 0.52) * 5), hex('#8a8a8a'));
    R.rect(cx - 4, cy + 9, cx + 4, cy + 26, K); R.rect(cx - 3, cy + 10, cx + 3, cy + 25, hex('#4a2a14')); const pa = Math.sin(t * 3.2) * 0.35, px = Math.round(cx + Math.sin(pa) * 12), py = Math.round(cy + 10 + Math.cos(pa) * 12); R.linea(cx, cy + 10, px, py, hex('#c8a040')); R.disco(px, py, 1.5, hex('#e8c060')); }
  // la puerta de cristal: se abre para que entre el huésped y se cierra
  { const ab = tramo(t, 0.15, 0.6) - tramo(t, 1.7, 2.2), w = Math.round(36 * (1 - ab * 0.8));
    R.rect(278, 58, 278 + w, 156, K); R.rect(279, 59, 277 + w, 155, hex('#c8a040'));
    for (let y = 61; y < 154; y++) for (let x = 281; x < 275 + w; x++) R.pset(x, y, mez(R.pget(x, y), hex('#e8f4ff'), 0.22));
    R.rect(279, 104, 277 + w, 106, hex('#c8a040')); if (w > 8) { R.linea(283, 64, 283 + Math.min(10, w - 6), 74, BL); } R.rect(275 + w, 100, 276 + w, 112, hex('#e8c060')); }
  // Corbu detrás del mostrador: da la llave y señala la torre por la ventana
  const da = t > LLAVE && t < LLAVE + 0.8, se = t > VILLA;
  const mc = R.actor(EL.corbu, 160, 139, t, { dir: se ? -1 : 1, sonrisa: true, habla: t > 0.8 && t < TIMBRE && Math.sin(t * 8) > 0, sostiene: da ? [181, 126] : undefined, dedo: se && t < P2 - 0.1 }).mano;
  // el gato dormido en la alfombra, con la cola que se mueve
  T.gato(R, 104, 172, t, {});
  // el huésped entra con su maleta, la deja, toca el timbre y coge la llave
  const u = tramo(t, 0.5, 2.2), gx = Math.round(lerp(300, 210, u)), deja = t > 2.3, toca = t > TIMBRE - 0.25 && t < TIMBRE + 0.35, coge = t > LLAVE + 0.55;
  mostrador(t);
  timbre(196, 129, t > TIMBRE && t < TIMBRE + 0.4 && Math.floor(t * 20) % 2 === 0);
  if (da && t < LLAVE + 0.55) llave(mc[0], mc[1]);
  const og = { dir: -1, anda: u > 0 && u < 1, sonrisa: coge };
  if (!deja) og.sostiene = [gx - 2, 150 + (og.anda && Math.floor(t * 5) % 2 ? 1 : 0)]; else if (toca) og.sostiene = [197, 124]; else if (coge) og.sostiene = [gx - 1, 146];
  const mg = R.actor(EL.vecino, gx, 168, t, og).mano;
  if (!deja) maletaH(mg[0], mg[1]); else maletaH(gx + 22, 157);
  if (coge) llave(mg[0], mg[1] - 2);
};

// ── 2 · la villa hecha hotel: Corbu y los periodistas; llega el autobús ──
const REPORT = h(0.586), TESORO = h(0.668), COFRE = h(0.778), TURIS = h(0.878), PITA = h(0.95);
const libreta = (m, t, k) => { const [x, y] = m; R.rect(x - 3, y - 3, x + 3, y + 3, K); R.rect(x - 2, y - 2, x + 2, y + 2, hex('#f2eee2')); R.pset(x - 1, y - 1, hex('#8a8aa0')); R.pset(x + 1, y, hex('#8a8aa0'));
  const lp = Math.round(Math.sin(t * 14 + k) * 1.5); R.linea(x + 1 + lp, y - 1, x + 3 + lp, y - 5, hex('#c8a040')); R.pset(x + 1 + lp, y - 1, K); };
const camaraFoto = (m, dir, flash) => { const [x, y] = m; R.rect(x - 4, y - 3, x + 4, y + 3, K); R.rect(x - 3, y - 2, x + 3, y + 2, hex('#3a3a46')); R.disco(x + 4 * dir, y, 2, K); R.pset(x + 4 * dir, y, hex('#8ab0f0'));
  R.rect(x - 2 * dir - 1, y - 9, x - 2 * dir + 1, y - 4, hex('#8a8a8a')); R.disco(x - 2 * dir, y - 10, 3, hex('#c8c8d0')); R.disco(x - 2 * dir, y - 10, 2, flash ? BL : hex('#e8e8f0'));
  if (flash) { luz(x - 2 * dir, y - 10, 40, BL, 0.8); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; R.linea(x - 2 * dir + Math.round(Math.cos(a) * 5), y - 10 + Math.round(Math.sin(a) * 5), x - 2 * dir + Math.round(Math.cos(a) * 11), y - 10 + Math.round(Math.sin(a) * 11), BL); } } };
const PER2 = { pal: { C: '#5a6a7a', c: '#46525e', F: '#3a3a4a', H: '#2a2a34', h: '#4a4a5a' } }, FOT = { pal: { C: '#7a5a3a', c: '#5a4028', F: '#3a3028' }, tocado: 'gorra' };
const p2 = (t) => {
  const d = T.rennes(R, t, { encuadre: 'villa', hotel: true, bus: tramo(t, TURIS - 0.7, PITA - 0.15) });
  const s = d.suelo;
  // los periodistas apuntan; al pitar el autobús se vuelven
  const vuelve = t > PITA + 0.2;
  const m1 = R.actor(EL.periodista, 150, s, t, { dir: vuelve ? 1 : -1, sorpresa: t > COFRE && t < COFRE + 0.8, sostiene: vuelve ? undefined : [148, s - 13] }).mano; if (!vuelve) libreta(m1, t, 0);
  const m2 = R.actor(EL.periodista, 170, s + 2, t, { ...PER2, dir: -1, sostiene: [168, s - 11], sonrisa: t > COFRE + 0.4 }).mano; libreta(m2, t, 2);
  const fl = (t > REPORT && t < REPORT + 0.14) || (t > COFRE + 0.1 && t < COFRE + 0.24);
  const m3 = R.actor(EL.periodista, 196, s, t, { ...FOT, dir: -1, sostiene: [194, s - 15] }).mano; camaraFoto(m3, -1, fl);
  // Corbu cuenta la historia; en «treasure» abre los brazos y le sale el cofre que brilla
  const brazos = t > TESORO + 0.3 && t < COFRE + 0.9;
  R.actor(EL.corbu, 114, s, t, { dir: 1, habla: !brazos && t > P2 + 0.2 && t < TURIS && Math.sin(t * 9) > -0.2, brazos, sonrisa: true, dedo: t > TURIS && t < TURIS + 1 });
  if (t > TESORO + 0.2 && t < TURIS) { const [cx, cy] = bocadillo(122, s - 30, 19, 32); const a = tramo(t, TESORO + 0.3, TESORO + 0.8); T.cofre(R, cx, cy + 13, t, { abre: a, brillo: a, s: 1.4, k: 3 }); if (t > COFRE) destello(cx, cy + 2, tramo(t, COFRE, COFRE + 0.7), 6, 20); }
  // los turistas entran por la derecha, uno con la cámara colgada que hace una foto a la torre
  { const u = tramo(t, TURIS - 0.1, P3 - 0.4), x1 = Math.round(lerp(334, 268, u)), x2 = Math.round(lerp(352, 290, u));
    const ma = R.actor(EL.senora30, x2, s + 4, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: true });
    const mb = R.actor(EL.senor30, x1, s + 6, t, { dir: u >= 1 ? 1 : -1, anda: u > 0 && u < 1, sostiene: u >= 1 ? [x1 + 16, s - 14] : undefined, sorpresa: u >= 1 }).mano;
    if (u >= 1) camaraFoto(mb, 1, t > P3 - 0.3 && t < P3 - 0.2); }
};

// ── 3 · la mesa: los pergaminos, los puntos escondidos y el té (1967) ──
const ESCRIBE = g(0.071), SECRETO = g(0.162), MOJA = g(0.333), MANCHA = g(0.433), FALSO = g(0.527);
const MANGA3 = '#4a4a5a';
const p3 = (t) => {
  const d = T.rennes(R, t, { encuadre: 'despacho', camara: 'mesa', manchas: tramo(t, MANCHA, P4 - 0.3) });
  // los trazos de tinta nuevos en el pergamino de abajo
  const e = tramo(t, ESCRIBE - 0.3, SECRETO + 0.4);
  for (let r = 0; r < 4; r++) { const y = 112 + r * 10, n = Math.round(Math.max(0, Math.min(1, e * 4 - r)) * 56); for (let i = 0; i < n; i++) { const x = 130 + i; R.pset(x, y + Math.round(Math.sin(i * 0.9 + r) * 1.5), hex('#2a1e3a')); if (i % 7 === 3) R.pset(x, y - 2, hex('#2a1e3a')); } }
  // los puntos dorados del mensaje secreto, escondidos entre los renglones
  if (t > SECRETO) { const pts = [[76, 46], [98, 62], [84, 88], [112, 70], [188, 54], [214, 78], [236, 98], [200, 108], [146, 124], [172, 140]];
    pts.forEach(([x, y], k) => { const u = tramo(t, SECRETO + k * 0.08, SECRETO + 0.3 + k * 0.08); if (u <= 0) return; R.disco(x, y, 1.5, hex('#e8a020')); if (Math.sin(t * 6 + k) > 0.3 || u < 1) chispa(x, y - 0); });
    if (t > SECRETO + 0.4 && t < MOJA) { R.icono('?', 150, 20, hex('#e8c060'), K, 3); } }
  // la mano con el pincel: escribe, lo moja en el té y mancha los pergaminos
  // (tx, ty): la punta del pincel; la muñeca va 22 px a la derecha y 24 px abajo, así el brazo asoma poco desde abajo
  let tx, ty;
  if (t < MOJA - 0.4) { const u = tramo(t, P3, ESCRIBE); tx = lerp(240, 130 + (e * 4 % 1) * 56 + Math.sin(t * 9) * 2, u); ty = lerp(200, 112 + Math.min(3, Math.floor(e * 4)) * 10, u); }
  else if (t < MANCHA) { const u = tramo(t, MOJA - 0.4, MOJA + 0.2); tx = lerp(180, 278, u); ty = lerp(140, 106 + (t > MOJA + 0.2 ? Math.sin(t * 10) * 2 : 0), u); }
  else { const u = tramo(t, MANCHA, MANCHA + 0.4), k = Math.floor((t - MANCHA) * 2.2) % 4, pos = [[214, 104], [192, 114], [236, 110], [150, 128]][k]; const dab = Math.abs(Math.sin(t * 9)) * 3; tx = lerp(278, pos[0], u); ty = lerp(106, pos[1] - dab, u); }
  if (t > MOJA && t < MOJA + 0.7) { for (let k = 0; k < 3; k++) { const u = (t * 2 + k / 3) % 1; R.pset(274 + k * 3, 100 - Math.round(u * 6), hex('#e8d0a0')); } }
  tx = Math.round(tx); ty = Math.round(ty); const wx = tx + 22, wy = ty + 24;
  // el pincel: mango de madera y la punta, de tinta o de té
  const tea = t > MOJA; R.linea(wx - 5, wy - 6, wx - 19, wy - 21, hex('#5a3418')); R.linea(wx - 4, wy - 6, wx - 18, wy - 21, hex('#a8743c')); R.rect(wx - 21, wy - 24, wx - 19, wy - 21, tea ? hex('#8a5a2a') : hex('#2a1e3a')); R.pset(tx, ty, tea ? hex('#6a3a1a') : K);
  if (tea && t > MANCHA && Math.sin(t * 9) > 0.6) { R.pset(tx - 1, ty + 3, hex('#a8743c')); }
  T.brazo(R, wx + 26, 206, wx, wy, MANGA3, -1, { codo: [wx + 18, Math.round((wy + 206) / 2) + 4] });
  if (t > FALSO && t < FALSO + 1.0) globo(wx - 30, wy - 12, '!', hex('#c8303a'));
};

// ── 4 · la sala de la sociedad inventada: túnicas vacías, velas y el sello ──
const INVENTA = g(0.66), SOCIEDAD = g(0.697), PRIORATO = g(0.87), SION = g(0.935);
let B4 = null;
const fondo4 = () => { if (B4) return B4; B4 = R.nuevo(); const prev = R.usar(B4);
  // la pared de sillares con su llaga, grietas y el desgaste
  for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 10), off = (f % 2) * 11, b = Math.floor((x + off) / 22), jx = (x + off) % 22, jy = y % 10;
    let c = jx === 0 || jy === 0 ? hex('#2a2430') : mez(hex('#5a5260'), hex('#6e6474'), hh(b, f, 41)); if (jy === 1 && jx > 0) c = mez(c, hex('#8a8090'), 0.4); if (jx === 21 || jy === 9) c = mez(c, K, 0.25); if (hh(x >> 1, y >> 1, 42) < 0.05) c = mez(c, K, 0.3);
    c = mez(c, hex('#140e1a'), Math.max(0, Math.min(0.6, Math.abs(x - 160) / 300 + (y < 30 ? (30 - y) / 60 : 0)))); R.pset(x, y, c); }
  for (let k = 0; k < 4; k++) { let x = 30 + k * 80, y = 30 + k * 13; for (let i = 0; i < 14; i++) { R.pset(x, y, K); x += hh(k, i, 43) < 0.5 ? 1 : 0; y += 1; } }
  // el suelo de tablas
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 140) / 6), jy = (y - 140) % 6, off = Math.floor(hh(fila, 0, 44) * 40), jx = (x + off) % 46;
    let c = mez(hex('#4a2c1a'), hex('#6a4024'), hh(Math.floor((x + off) / 46), fila, 45)); if (jy === 0 || jx === 0) c = hex('#2a1810'); else if (hh(x >> 2, y, 46) < 0.15) c = mez(c, hex('#3a2014'), 0.5); R.pset(x, y, c); }
  // la alfombra redonda
  for (let j = -14; j <= 14; j++) for (let i = -90; i <= 90; i++) { const e = (i / 90) ** 2 + (j / 14) ** 2; if (e > 1) continue; R.pset(160 + i, 160 + j, e > 0.82 ? hex('#c8a040') : e > 0.7 ? hex('#5a141a') : (Math.floor(i / 6) + Math.floor(j / 3)) % 2 ? hex('#7a1e24') : hex('#8a2a2e')); }
  // la estantería de legajos
  R.rect(8, 36, 72, 140, K); R.rect(10, 38, 70, 138, hex('#3a2014'));
  for (let j = 0; j < 4; j++) { const y = 40 + j * 25; R.rect(10, y + 22, 70, y + 24, hex('#6a4024')); let x = 12;
    while (x < 66) { const w = 3 + Math.floor(hh(x, j, 47) * 4), hgt = 14 + Math.floor(hh(x, j, 48) * 8), c = [hex('#6a2a2a'), hex('#2a4a6a'), hex('#5a5a3a'), hex('#c8b088'), hex('#3a3a3a')][Math.floor(hh(x, j, 49) * 5)];
      R.rect(x, y + 22 - hgt, x + w - 1, y + 21, c); R.rect(x, y + 22 - hgt, x, y + 21, mez(c, BL, 0.25)); R.rect(x + 1, y + 16, x + w - 2, y + 17, hex('#e8dcc0')); x += w + (hh(x, j, 50) < 0.15 ? 3 : 0); } }
  // el estandarte de terciopelo con su fleco (el emblema se pinta encima)
  R.rect(116, 18, 204, 20, hex('#c8a040')); R.disco(116, 19, 2, hex('#e8c060')); R.disco(204, 19, 2, hex('#e8c060'));
  for (let y = 21; y < 104; y++) for (let x = 122; x <= 198; x++) { const pl = (x - 122) % 12; let c = pl < 2 ? hex('#141a3a') : pl < 7 ? hex('#22306a') : hex('#1a2452'); if (x === 122 || x === 198) c = hex('#c8a040'); R.pset(x, y, c); }
  for (let x = 122; x <= 198; x++) { const yb = 104 + (x % 8 < 4 ? 0 : 3) - Math.abs(((x - 122) % 8) - 4) + 4; R.linea(x, 104, x, Math.min(yb, 108), (x % 2) ? hex('#c8a040') : hex('#8a6a20')); }
  // el escritorio con la máquina de escribir y el flexo
  R.rect(236, 120, 312, 124, K); R.rect(237, 120, 311, 122, hex('#6a4024')); R.rect(240, 124, 244, 150, hex('#3a2014')); R.rect(304, 124, 308, 150, hex('#3a2014')); R.rect(244, 125, 304, 132, hex('#4a2c1a'));
  R.rect(252, 108, 280, 119, K); R.rect(253, 109, 279, 118, hex('#2a2a2a')); R.rect(253, 109, 279, 110, hex('#5a5a5a')); for (let i = 255; i < 278; i += 3) { R.pset(i, 113, hex('#c8c8c8')); R.pset(i + 1, 116, hex('#c8c8c8')); }
  R.rect(258, 96, 274, 108, hex('#f2eee2')); R.rect(258, 96, 274, 96, BL); for (let y = 99; y < 107; y += 2) R.linea(260, y, 260 + Math.floor(hh(y, 1, 51) * 12), y, hex('#8a8aa0')); R.rect(250, 107, 282, 108, hex('#3a3a3a'));
  R.rect(290, 112, 304, 119, hex('#e8dcc0')); R.rect(291, 110, 303, 111, hex('#d8ccb0')); R.rect(296, 86, 297, 118, hex('#3a3a3a')); R.poligono([[288, 86], [306, 86], [302, 78], [292, 78]], hex('#2a6a3a'));
  // la ventanita con la luna (lo de fuera recortado)
  R.rect(212, 28, 246, 64, K); R.rect(214, 30, 244, 62, hex('#0a1028')); R.recorte([214, 30, 244, 62]); for (let k = 0; k < 14; k++) R.pset(214 + Math.floor(hh(k, 1, 52) * 30), 30 + Math.floor(hh(k, 2, 52) * 32), hex('#c8d0f0'));
  R.disco(236, 40, 5, hex('#f2eecf')); R.disco(238, 39, 4, hex('#0a1028')); R.poligono([[214, 62], [222, 54], [232, 58], [244, 50], [244, 62]], hex('#1a2040')); R.recorte(null);
  R.rect(228, 30, 229, 62, hex('#3a3a3a')); R.rect(214, 46, 244, 47, hex('#3a3a3a')); R.rect(210, 64, 248, 66, hex('#6a6070'));
  R.usar(prev); return B4; };
// una túnica con capucha colgada de una silla de respaldo alto (x: centro; n: la capucha que se mueve)
const silla4 = (x, y) => { R.rect(x - 9, y - 40, x + 9, y + 2, K); R.rect(x - 8, y - 39, x + 8, y + 2, hex('#4a2a14')); R.rect(x - 6, y - 37, x + 6, y - 4, hex('#6a3e22')); R.poligono([[x - 9, y - 40], [x, y - 47], [x + 9, y - 40]], hex('#4a2a14')); R.disco(x, y - 43, 1.5, hex('#c8a040')); };
const tunica = (x, y, t, a = 0, col = hex('#e8e0d0')) => { x = Math.round(x); y = Math.round(y); const ds = mez(col, K, 0.35);
  R.poligono([[x - 9, y], [x - 6, y - 26], [x + 6, y - 26], [x + 9, y]], K); R.poligono([[x - 8, y - 1], [x - 5, y - 25], [x + 5, y - 25], [x + 8, y - 1]], col);
  for (const i of [-4, 0, 4]) R.linea(x + i, y - 22, x + i * 1.6, y - 2, ds); R.rect(x - 1, y - 24, x + 1, y - 12, hex('#c83a3a')); R.rect(x - 4, y - 19, x + 4, y - 17, hex('#c83a3a'));
  const hx = x + Math.round(Math.sin(a) * 3), hy = y - 30 + Math.round(Math.abs(Math.sin(a)) * 2);
  R.disco(hx, hy, 7, K); R.disco(hx, hy, 6, col); R.disco(hx + Math.round(Math.sin(a) * 2), hy + 1, 4, hex('#0a0810')); R.pset(hx - 3, hy - 4, mez(col, BL, 0.5)); };
const emblema = (x, y, c) => { R.rect(x - 1, y - 9, x + 1, y + 8, c); R.disco(x, y - 9, 2, c); R.poligono([[x - 1, y - 2], [x - 8, y - 8], [x - 9, y - 1], [x - 4, y + 2]], c); R.poligono([[x + 1, y - 2], [x + 8, y - 8], [x + 9, y - 1], [x + 4, y + 2]], c); R.rect(x - 6, y + 2, x + 6, y + 4, c); R.poligono([[x - 3, y + 4], [x + 3, y + 4], [x, y + 10]], c); };
const p4 = (t) => {
  R.copiar(fondo4());
  // el emblema dorado del estandarte se enciende en «Priory»
  const em = tramo(t, PRIORATO, PRIORATO + 0.5); emblema(160, 58, mez(hex('#5a4a2a'), hex('#f0c848'), em)); if (em > 0) { luz(160, 58, 24, hex('#ffe8a0'), 0.35 * em); emblema(160, 58, mez(hex('#5a4a2a'), hex('#f0c848'), em)); destello(160, 58, tramo(t, PRIORATO, PRIORATO + 0.8), 6, 26); }
  // las sillas de respaldo alto con sus túnicas vacías, detrás de la mesa
  silla4(118, 140); silla4(202, 140);
  const asiente = t > SION ? Math.sin((t - SION) * 7) * 0.5 * (1 - tramo(t, SION + 1.2, SION + 1.8)) : 0;
  tunica(118, 138, t, 0); tunica(202, 138, t, asiente, hex('#d8c8b0'));
  // la mesa redonda con su mantel, el candelabro y el pergamino
  for (let j = -6; j <= 6; j++) for (let i = -50; i <= 50; i++) { const e = (i / 50) ** 2 + (j / 6) ** 2; if (e <= 1) R.pset(160 + i, 138 + j, e > 0.85 ? hex('#3a1e10') : hex('#5a3418')); }
  R.rect(112, 138, 208, 158, K); R.rect(113, 138, 207, 157, hex('#3a1e10')); for (let x = 116; x < 206; x += 9) R.rect(x, 140, x + 4, 157, hex('#4a2a18'));
  for (let j = -6; j <= 4; j++) for (let i = -48; i <= 48; i++) { const e = (i / 48) ** 2 + (j / 5) ** 2; if (e <= 1) R.pset(160 + i, 137 + j, e > 0.8 ? hex('#c8b088') : hex('#e8dcc0')); }
  R.rect(140, 133, 160, 140, hex('#e8d8a8')); R.rect(140, 133, 160, 133, hex('#f8ecc8')); for (let y = 135; y < 140; y += 2) R.linea(142, y, 156, y, hex('#8a7a5a'));
  const se = t > PRIORATO + 0.15; if (se) { R.disco(150, 137, 2.5, hex('#a8303a')); R.pset(149, 136, hex('#d85a5a')); }
  // el candelabro de tres brazos y las velas que se avivan en «secret society»
  { const cx = 176, cy = 134, av = tramo(t, SOCIEDAD, SOCIEDAD + 0.3) - tramo(t, SOCIEDAD + 1.1, SOCIEDAD + 1.6); R.rect(cx - 1, cy - 12, cx + 1, cy, hex('#c8a040')); R.rect(cx - 4, cy - 1, cx + 4, cy, hex('#c8a040')); R.rect(cx - 8, cy - 12, cx + 8, cy - 11, hex('#c8a040'));
    for (const i of [-8, 0, 8]) { R.rect(cx + i - 1, cy - 20, cx + i + 1, cy - 12, hex('#f2eee2')); const fy = cy - 23 - Math.round(av * 3), ww = Math.sin(t * 13 + i) > 0 ? 1 : 0; luz(cx + i, fy, 14 + Math.round(av * 10), hex('#ffd890'), 0.3 + av * 0.25);
      R.rect(cx + i - 1, fy - Math.round(av * 2), cx + i + ww, fy + 2, hex('#f0a030')); R.pset(cx + i, fy, hex('#fff2c0')); R.pset(cx + i, fy + 1, BL); } }
  // el hombre de gris: echa la túnica sobre la silla de la izquierda y luego sella el pergamino
  const lanza = tramo(t, INVENTA - 0.1, INVENTA + 0.4), va = tramo(t, SOCIEDAD + 0.4, PRIORATO - 0.1), x = Math.round(lerp(64, 128, va));
  const o = { dir: 1, anda: va > 0 && va < 1, sonrisa: t > SION };
  if (lanza < 1) o.sostiene = [x + 15, 128 - Math.round(lanza * 10)];
  else if (t > PRIORATO - 0.3 && t < PRIORATO + 0.6) o.sostiene = [150, PRIORATO - t > 0 ? 124 : 132];
  const mh = R.actor(EL.oficinista, x, 160, t, o).mano;
  if (lanza < 1) { silla4(92, 158); const tx = lerp(mh[0] + 10, 92, lanza), ty = lerp(mh[1] + 26, 156, lanza) - Math.sin(lanza * Math.PI) * 18; tunica(tx, ty, t, lanza * 2, hex('#b8b0c8')); }
  else { silla4(92, 158); tunica(92, 156, t, 0, hex('#b8b0c8')); }
  if (o.sostiene && t > PRIORATO - 0.3) { const [sx, sy] = mh; R.rect(sx - 2, sy - 7, sx + 2, sy - 1, K); R.rect(sx - 1, sy - 6, sx + 1, sy - 1, hex('#8a5a30')); R.disco(sx, sy - 9, 3, K); R.disco(sx, sy - 9, 2, hex('#a8703a')); R.rect(sx - 4, sy, sx + 4, sy + 2, K); R.rect(sx - 3, sy, sx + 3, sy + 1, hex('#e8c060')); }
  if (t > SION + 0.3) globo(208, 98, '?');
  // motas de polvo en la luz del candelabro
  for (let k = 0; k < 8; k++) { const u = (t * 0.15 + k / 8) % 1; R.pset(150 + Math.round(Math.sin(k * 3 + t) * 30), Math.round(130 - u * 60), hex('#d8c8a0')); }
};
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  efectos: [[0.3, 'puerta'], [TIMBRE, 'timbre'], [REPORT, 'flash'], [COFRE, 'brillo'], [PITA, 'claxon'], [ESCRIBE, 'lapiz'], [MOJA, 'burbujas'], [INVENTA, 'whoosh'], [PRIORATO + 0.15, 'sello']],
  año: (t) => (t < P3 ? 1956 : 1967) });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['te-queso'] = ('El pueblo queso', '''// TE-QUESO (frases 42–43), 1982 → 2003 → 1965. Tres planos:
// 1. (librería, general) los clientes cogen el libro del cáliz de la montaña; en «books» uno lo lleva a la caja y el
//    contador sube hasta 1,000,000 en «millions»; en «Da Vinci code» un repartidor entra con la carretilla de libros nuevos;
// 2. (librería, cine; corte en «in 2003») 2003, de noche: la cola espera ante el cine y un coche pasa por el asfalto mojado;
//    en «treasure hunters» salen del cine tres buscadores con palas y en «shovels» las levantan («!»);
// 3. (colina, 1965, con agujeros; corte en «1965») gag 6: el pueblo como un queso; el buscador sale del hoyo con el casco y
//    la pala; en «village council» un concejal clava el cartel de la pala tachada junto al hoyo; en «ban digging» el
//    cartel se cae y le da en la cabeza al buscador, que se queda viendo estrellas.''', AY + r'''
const l = (f) => en('libros', f), p = (f) => en('prohibido', f);
const P2 = l(0.748), P3 = p(0.419);

// ── 1 · la librería ──
const LIBROS = l(0.08), MILLONES = l(0.277), DAVINCI = l(0.521);
const libro = (x, y, c = hex('#8a2228')) => { x = Math.round(x); y = Math.round(y); R.rect(x - 3, y - 4, x + 3, y + 3, K); R.rect(x - 2, y - 3, x + 2, y + 2, c); R.rect(x + 2, y - 3, x + 2, y + 2, hex('#f2eee2')); R.pset(x - 1, y - 1, hex('#e8c060')); R.pset(x, y - 1, hex('#e8c060')); };
const p1 = (t) => {
  const d = T.rennes(R, t, { encuadre: 'libreria' }), s = d.suelo;
  // la alfombra, el expositor de cartón con libros y la butaca de leer
  R.rect(84, 168, 232, 179, hex('#2a3a5a')); R.rect(86, 169, 230, 178, hex('#4a6a9a')); for (let x = 88; x < 230; x += 4) { R.pset(x, 171, hex('#c8a040')); R.pset(x + 2, 176, hex('#c8a040')); } R.rect(90, 173, 226, 174, hex('#3a5a8a'));
  R.rect(258, 146, 292, 170, K); R.rect(259, 147, 291, 169, hex('#c89a5a')); R.rect(259, 147, 291, 149, hex('#e8bc7a')); R.rect(259, 160, 291, 161, hex('#a87a3a'));
  for (let k = 0; k < 6; k++) { const x = 261 + k * 5; R.rect(x, 138 + (k % 2) * 2, x + 4, 147, K); R.rect(x + 1, 139 + (k % 2) * 2, x + 3, 147, k % 2 ? hex('#8a2228') : hex('#2a4a8a')); R.pset(x + 2, 142 + (k % 2) * 2, hex('#e8c060')); }
  R.rect(298, 136, 319, 170, K); R.rect(299, 137, 319, 152, hex('#7a3a2a')); R.rect(296, 150, 319, 166, K); R.rect(297, 151, 319, 165, hex('#9a4a32')); R.rect(299, 137, 302, 165, hex('#6a2e22')); R.rect(300, 166, 302, 170, hex('#3a2014'));
  // el contador de ventas sobre la montaña de libros
  { const u = tramo(t, LIBROS + 0.2, MILLONES + 0.3), n = Math.round((u * u) * 1000) * 1000; R.rect(120, 22, 210, 38, K); R.rect(121, 23, 209, 37, hex('#1a1a2a')); R.rect(121, 23, 209, 23, hex('#3a3a5a'));
    R.numero(n.toLocaleString('en-US'), 165, 35, { centro: true }); if (u >= 1) destello(165, 30, tramo(t, MILLONES + 0.3, MILLONES + 1.0), 6, 30); }
  // la librera en la caja, que cobra y sonríe
  R.actor(EL.vecina, 74, s, t, { dir: 1, sonrisa: t > MILLONES, habla: t > 1.3 && t < 1.9 && Math.sin(t * 9) > 0, dedo: t > DAVINCI && t < P2 });
  // un cliente coge un libro de la montaña y lo lleva a la caja
  { const u = tramo(t, LIBROS + 0.3, MILLONES), x = Math.round(lerp(150, 94, u)); const o = { dir: u > 0 ? -1 : 1, anda: u > 0 && u < 1, sonrisa: true };
    o.sostiene = t > LIBROS ? [u > 0 ? x : x + 15, s - 13] : [x + 15, s - 18 + Math.round(tramo(t, 0.3, LIBROS) * 4)]; const m = R.actor(EL.joven, x, s, t, o).mano; if (t > LIBROS - 0.2) libro(m[0], m[1]); }
  // otra clienta hojea un libro junto a la mesa y se sorprende con la carretilla
  { const m = R.actor(EL.senora30, 200, s, t, { dir: t > DAVINCI + 0.3 ? 1 : -1, sostiene: [t > DAVINCI + 0.3 ? 215 : 198, s - 14], sorpresa: t > DAVINCI + 0.3 && t < DAVINCI + 1.1 }).mano; libro(m[0], m[1], hex('#2a4a8a')); }
  // el repartidor empuja la carretilla con la pila de libros nuevos
  { const u = tramo(t, DAVINCI - 0.5, P2 - 0.3), x = Math.round(lerp(330, 236, u)); if (u > 0) {
    const m = R.actor(EL.obrero, x, s, t, { dir: -1, anda: u < 1, sostiene: [x - 2, s - 12], sonrisa: u >= 1 }).mano;
    const cx = x - 22; R.linea(m[0], m[1], cx + 12, s - 20, hex('#5a5a6a')); R.rect(cx - 6, s - 3, cx + 12, s - 1, hex('#4a4a5a')); R.disco(cx - 2, s - 1, 2.5, K); R.disco(cx + 8, s - 1, 2.5, K);
    for (let k = 0; k < 6; k++) { const y = s - 6 - k * 4; R.rect(cx - 5, y - 3, cx + 9, y, K); R.rect(cx - 4, y - 2, cx + 8, y - 1, k % 2 ? hex('#a81e24') : hex('#8a1a1e')); R.rect(cx + 8, y - 2, cx + 8, y - 1, hex('#f2eee2')); R.pset(cx + 1, y - 2, hex('#e8c060')); } } }
};

// ── 2 · el cine de noche (2003): salen los buscadores con palas ──
const ANYO = l(0.78), CAZAS = p(0.079), PALAS = p(0.289);
const coche = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x, y - 9, x + 44, y - 2, K); R.poligono([[x + 8, y - 9], [x + 14, y - 16], [x + 32, y - 16], [x + 38, y - 9]], K);
  R.rect(x + 1, y - 8, x + 43, y - 3, hex('#3a6ac8')); R.poligono([[x + 10, y - 9], [x + 15, y - 15], [x + 31, y - 15], [x + 36, y - 9]], hex('#3a6ac8')); R.poligono([[x + 12, y - 10], [x + 16, y - 14], [x + 22, y - 14], [x + 22, y - 10]], hex('#9ac8e8')); R.poligono([[x + 24, y - 10], [x + 24, y - 14], [x + 30, y - 14], [x + 34, y - 10]], hex('#9ac8e8'));
  R.rect(x + 1, y - 8, x + 43, y - 8, hex('#6a9ae8')); R.rect(x + 42, y - 7, x + 43, y - 5, hex('#fff2b0')); R.rect(x + 1, y - 7, x + 2, y - 5, hex('#e83a3a'));
  R.disco(x + 10, y - 1, 4, K); R.disco(x + 10, y - 1, 2, hex('#8a8a9a')); R.disco(x + 34, y - 1, 4, K); R.disco(x + 34, y - 1, 2, hex('#8a8a9a'));
  for (let i = 0; i < 18; i++) R.pset(x + 46 + i, y - 6 + (i % 3 === 0 ? 1 : 0), mez(hex('#fff2b0'), hex('#2a2a3a'), i / 18)); for (let i = 0; i < 40; i += 2) R.pset(x + 2 + i, y + 5 + (i % 4 === 0 ? 1 : 0), hex('#3a5a9a')); };
const p2 = (t) => {
  const d = T.rennes(R, t, { encuadre: 'libreria', camara: 'cine' }), s = d.suelo;
  // la cola ante el cine: respiran, hablan, uno señala la marquesina
  const cola = [[EL.neoyorquina, 34], [EL.joven2, 52], [EL.turista, 70], [EL.neoyorquino, 88], [EL.chica, 106]];
  cola.forEach(([def, x], k) => R.actor(def, x, s, t, { dir: 1, habla: k === 1 && Math.sin(t * 7) > 0.2, dedo: k === 3 && t > ANYO && t < ANYO + 1.2, sonrisa: k % 2 === 0 }));
  // salen del cine los buscadores con palas, hacia la derecha; en «shovels» las levantan
  const sal = [[EL.buscador, 0], [EL.cavador, 0.35], [EL.cavador2, 0.7]];
  sal.forEach(([def, dl], k) => { const u = tramo(t, CAZAS - 0.2 + dl, P3 - 0.3 + dl * 0.3), x = Math.round(lerp(152, 214 + k * 26, u)); if (u <= 0) return;
    const arriba = t > PALAS && t < PALAS + 1.0, m = R.actor(def, x, s + (k === 1 ? 2 : 0), t, { dir: 1, anda: u < 1 && !arriba, sonrisa: true, sostiene: arriba ? [x + 13, s - 26] : [x + 14, s - 12] }).mano; pala(m[0], m[1], arriba); });
  if (t > PALAS + 0.1 && t < PALAS + 1.1) globo(244, s - 34, '!', hex('#c8303a'));
  // el coche que pasa por delante sobre el asfalto mojado
  { const u = tramo(t, ANYO + 0.1, ANYO + 2.0); if (u > 0 && u < 1) coche(lerp(-60, 330, u), 178); }
};

// ── 3 · el pueblo queso (1965): el cartel cae en la cabeza (gag 6) ──
const CONSEJO = p(0.624), PROHIBE = p(0.728), CAE = p(0.817), VILLAGE = p(0.921);
const p3 = (t) => {
  const d = T.rennes(R, t, { anyo: 1905, agujeros: 1, cartel: false }), s = d.suelo, [hx, hy, hw] = d.hoyo || [160, 170, 26];
  // el concejal llega con el cartel y lo clava junto al hoyo
  const u = tramo(t, P3 + 0.4, CONSEJO + 0.4), cx = Math.round(lerp(330, 198, u)), clava = t > CONSEJO + 0.4;
  const ang = t < CAE ? (clava ? Math.sin(Math.max(0, t - PROHIBE) * 9) * 0.06 * tramo(t, PROHIBE, PROHIBE + 0.2) : 0) : -0.77 * Math.min(1, ((t - CAE) / 0.3) ** 2) + (t > CAE + 0.3 ? Math.sin((t - CAE - 0.3) * 18) * 0.06 * Math.max(0, 1 - (t - CAE - 0.3) * 2) : 0);
  // el buscador sale del hoyo con el casco y la pala
  const sube = tramo(t, P3 + 0.1, P3 + 0.9), by = Math.round(lerp(hy + 26, hy + 4, sube)), bx = hx - 8, golpe = t > CAE + 0.3;
  const ob = { dir: 1, tocado: false, sonrisa: !golpe && sube >= 1, sorpresa: golpe && t < CAE + 0.9, triste: golpe && t > CAE + 0.9, sostiene: !golpe ? [bx + 15, by - 14 - (Math.sin(t * 5) > 0.6 && t < CONSEJO ? 4 : 0)] : undefined };
  R.recorte([0, 0, 319, hy + 1]); const ab = R.actor(EL.buscador, bx, by, t, ob); casco(ab.cabeza, 1); if (!golpe) pala(ab.mano[0], ab.mano[1], true); R.recorte(null);
  T.d_bordeHoyo(R, hx, hy, hw);
  if (golpe) { pala(hx + 22, s + 4, false); }
  // tierra que salta cuando sale
  if (sube > 0 && sube < 1) for (let k = 0; k < 8; k++) { const v = (t * 3 + k / 8) % 1; R.pset(hx - 10 + k * 3, hy - Math.round(Math.sin(v * Math.PI) * 10), hex('#8a6a44')); }
  if (u > 0) { const oc = { dir: -1, anda: u < 1, sorpresa: t > CAE && t < CAE + 1.2, sostiene: clava ? undefined : [cx - 1, s - 14] };
    const mc = R.actor(EL.funcionario, cx, s + 2, t, oc).mano; if (!clava) T.d_cartelPala(R, mc[0] - 2, s - 2, { ang: -0.15, alto: 40 }); }
  if (clava) T.d_cartelPala(R, 191, s, { ang, alto: 40 });
  // las estrellitas que giran sobre la cabeza
  if (golpe) for (let k = 0; k < 4; k++) { const a = t * 6 + k * Math.PI / 2; chispa(ab.cabeza[0] + Math.cos(a) * 10, ab.cabeza[1] - 10 + Math.sin(a) * 3, hex('#f0d040')); }
  if (t > CAE + 0.3 && t < CAE + 1.1) globo(ab.cabeza[0] - 14, ab.cabeza[1] - 16, '!', hex('#c8303a'));
};
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], {
  efectos: [[LIBROS, 'papel'], [MILLONES + 0.3, 'brillo'], [DAVINCI, 'golpecito'], [ANYO + 0.1, 'coche'], [PALAS, 'whoosh'], [P3 + 0.2, 'chof'], [CONSEJO + 0.4, 'toc'], [CAE + 0.3, 'boing']],
  año: (t) => (t < P2 ? (t < DAVINCI ? 1982 : 2003) : t < P3 ? 2003 : 1965) });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['te-qumran'] = ('El rollo de cobre', '''// TE-QUMRAN (frases 44–46), 1952 → 1956, cartela «1952». Cinco planos:
// 1. (qumran, general) al atardecer, tras la cartela, dos arqueólogos con farol y pico van por la cornisa hacia la cueva 3;
//    en «its map is real» a ella le sale el bocadillo del mapa con la X; en «1952» llegan a la boca y él la señala;
// 2. (qumran, cueva; corte en «Archaeologists») entran por la boca con los faroles y alumbran la roca; en «Dead Sea» el mar
//    destella fuera; en «find» la luz cae sobre el rollo y ella se sorprende; en «broken in two» sale el «2» y él señala;
// 3. (fondo local: la mesa de trabajo en la tienda de la excavación, 1952; corte tras «two») el rollo de cerca; en «2,000
//    years» el reloj de arena y el «2000»; en «corroded» se ve el cardenillo; la mano lo roza y en «breaking» se desprende
//    un trocito que cae y rebota;
// 4. (taller, general; corte en «So between») Manchester, 1955 → 1956: llueve; el ingeniero entra con el rollo y en
//    «Manchester» lo pone en la sierra; un operario trabaja en el torno; el gato junto a la tetera;
// 5. (taller, sierra; corte en «An engineer») el disco fino gira y en «cuts» entra en el rollo; en «23 strips» la tira cae
//    en la bandeja y la cuenta llega a 23.''', AY + r'''
const c = (f) => en('cueva', f), o = (f) => en('oxidado', f), s = (f) => en('sierra', f);
const P2 = c(0.442), P3 = c(1.013), P4 = o(1.065), P5 = s(0.556);

// ── 1 · los acantilados de Qumrán al atardecer ──
const MAPA = c(0.197), ANYO = c(0.336);
const pico = (x, y) => { x = Math.round(x); y = Math.round(y); R.linea(x, y - 2, x, y + 10, hex('#5a3418')); R.linea(x + 1, y - 2, x + 1, y + 10, hex('#a8743c')); R.poligono([[x - 6, y - 3], [x + 7, y - 4], [x + 8, y - 2], [x - 6, y - 1]], hex('#5a5a6a')); R.pset(x - 5, y - 2, hex('#c8c8d8')); };
const cabras = (t) => { for (let k = 0; k < 5; k++) { const x = Math.round(250 + ((t * 2 + k * 9) % 60) - 30 + k * 4), y = 150 + (k % 2) * 3; R.rect(x, y, x + 4, y + 2, k % 2 ? hex('#3a2a20') : hex('#e8dcc0')); R.pset(x + 5, y - 1, k % 2 ? hex('#3a2a20') : hex('#e8dcc0')); R.pset(x + (Math.floor(t * 4 + k) % 2), y + 3, K); R.pset(x + 3, y + 3, K); } };
const p1 = (t) => {
  const d = T.desierto(R, t, {}), sl = d.suelo;
  cabras(t);
  // el pastorcillo con su vara detrás de las cabras
  { const x = Math.round(300 - ((t * 2) % 60) * 0.3); R.actor(EL.chico, x, 158, t, { dir: -1, sostiene: [x - 2, 140] }); R.linea(x - 2, 136, x - 3, 158, hex('#5a3418')); }
  // los dos arqueólogos van por la cornisa hacia la cueva 3
  const u = tramo(t, 0.4, ANYO), xa = Math.round(lerp(196, 72, u)), xb = Math.round(lerp(222, 96, u)), llegan = u >= 1;
  const ma = R.actor(EL.arqueologa, xa, sl, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: t > MAPA && t < ANYO, sostiene: [xa - 2, sl - 18] }).mano; farol(ma[0], ma[1], t, 18);
  const ob = { dir: -1, anda: u > 0 && u < 1, dedo: llegan && t < P2 - 0.2, sorpresa: llegan && t > ANYO + 0.2 && t < ANYO + 0.8 };
  if (!ob.dedo) ob.sostiene = [xb - 1, sl - 15]; const mb = R.actor(EL.arqueologo, xb, sl, t, ob).mano; if (!ob.dedo) pico(mb[0], mb[1]);
  // el bocadillo del mapa con su X: el mapa es de verdad
  if (t > MAPA && t < ANYO) { const [cx, cy] = bocadillo(xa + 8, sl - 30, 11, 18); R.rect(cx - 7, cy - 6, cx + 7, cy + 6, hex('#c8a870')); R.rect(cx - 6, cy - 5, cx + 6, cy + 5, hex('#e8d8a8')); R.linea(cx - 5, cy + 3, cx - 1, cy - 1, hex('#8a6a3a')); R.linea(cx - 1, cy - 1, cx + 2, cy + 2, hex('#8a6a3a'));
    const xu = tramo(t, MAPA + 0.2, MAPA + 0.5); if (xu > 0) { R.linea(cx + 1, cy - 4, cx + 1 + Math.round(4 * xu), cy - 4 + Math.round(4 * xu), hex('#c8303a')); R.linea(cx + 5, cy - 4, cx + 5 - Math.round(4 * xu), cy - 4 + Math.round(4 * xu), hex('#c8303a')); } }
};

// ── 2 · dentro de la cueva 3: el rollo partido en dos ──
const EXPLORA = c(0.534), MAR = c(0.768), HALLA = c(0.84), DOS = c(0.91);
const caja = (x, y) => { R.rect(x, y - 14, x + 22, y, K); R.rect(x + 1, y - 13, x + 21, y - 1, hex('#8a6a3a')); R.rect(x + 1, y - 13, x + 21, y - 12, hex('#b08a50')); R.rect(x + 1, y - 7, x + 21, y - 7, hex('#5a3a1a')); R.rect(x + 3, y - 18, x + 4, y - 14, hex('#5a3418')); R.rect(x + 8, y - 19, x + 12, y - 14, hex('#9aa4b4')); R.rect(x + 14, y - 17, x + 19, y - 14, hex('#c8b088')); };
const p2 = (t) => {
  const d = T.desierto(R, t, { camara: 'cueva' }), sl = d.suelo;
  // la escalera de cuerda, la caja de herramientas y la criba que trajeron
  for (let y = 40; y < sl; y += 1) { R.pset(30 + Math.round(Math.sin(y * 0.1 + t) * 0.6), y, hex('#a8844a')); R.pset(42 + Math.round(Math.sin(y * 0.1 + t) * 0.6), y, hex('#a8844a')); } for (let y = 46; y < sl; y += 9) R.linea(30, y, 42, y, hex('#7a5a30'));
  caja(54, sl); R.disco(96, sl - 4, 8, K); R.disco(96, sl - 4, 7, hex('#8a6a3a')); for (let i = -5; i <= 5; i += 2) R.linea(96 + i, sl - 9, 96 + i, sl + 1, hex('#5a4a30'));
  // la luz sobre el rollo cuando lo encuentran
  const hal = tramo(t, HALLA, HALLA + 0.4); if (hal > 0) { luz(160, 156, 26, hex('#ffe8a0'), 0.45 * hal); }
  // los arqueólogos entran por la boca con sus faroles
  const u = tramo(t, P2 + 0.1, EXPLORA + 0.6), xa = Math.round(lerp(300, 196, u)), xb = Math.round(lerp(326, 222, u));
  // la luz del farol que barre la roca mientras exploran
  { const b = tramo(t, EXPLORA - 0.2, EXPLORA + 0.4) - tramo(t, HALLA - 0.4, HALLA); if (b > 0) { const lx = 150 - Math.sin((t - EXPLORA) * 0.9) * 80, ly = 80 + Math.sin((t - EXPLORA) * 1.7) * 22; luz(lx, ly, 34, hex('#ffd890'), 0.42 * b); } }
  const sube = t > EXPLORA && t < MAR, baja = t > HALLA;
  const ya = baja ? sl - 10 : sube ? sl - 26 - Math.round(Math.sin(t * 2) * 2) : sl - 18, xha = baja ? xa - 2 : sube ? xa - 4 + Math.round(Math.sin(t * 1.5) * 3) : xa - 2;
  const ma = R.actor(EL.arqueologa, xa, sl, t, { dir: -1, anda: u > 0 && u < 1, sorpresa: baja && t < DOS + 0.6, sonrisa: t > DOS + 0.6, sostiene: [xha, ya] }).mano; farol(ma[0], ma[1], t, sube ? 30 : 22);
  const ob = { dir: -1, anda: u > 0 && u < 1, dedo: t > DOS && t < P3 }; if (!ob.dedo) ob.sostiene = [xb - 2, sl - 17];
  const mb = R.actor(EL.arqueologo, xb, sl, t, ob).mano; if (!ob.dedo) farol(mb[0], mb[1], t, 18);
  if (t > HALLA + 0.1 && t < DOS) globo(xa + 6, sl - 30, '!', hex('#c8303a'));
  // el «2»: partido en dos
  if (t > DOS) { const e = tramo(t, DOS, DOS + 0.3); R.numero('2', 160, Math.round(lerp(150, 138, e)), { tam: 16, centro: true }); destello(160, 140, tramo(t, DOS, DOS + 0.7), 6, 20);
    R.linea(146, 151, 146, 146, hex('#f0d040')); R.linea(174, 151, 174, 146, hex('#f0d040')); }
};

// ── 3 · la mesa de trabajo en la tienda (1952): el rollo de cerca ──
const ANOS = o(0.219), CORROE = o(0.57), TOCA = o(0.693), ROMPE = o(0.877);
let B3 = null;
const fondo3 = () => { if (B3) return B3; B3 = R.nuevo(); const prev = R.usar(B3);
  // la lona de la tienda con sus costuras y la luz de la tarde
  for (let y = 0; y < 86; y++) for (let x = 0; x < 320; x++) { const p = (x + Math.round(Math.sin(y * 0.08) * 3)) % 40, cost = p === 0 || p === 1; let c = mez(hex('#d8c498'), hex('#b8a070'), Math.min(1, Math.abs(p - 20) / 26 + y / 200));
    if (cost) c = hex('#8a7448'); else if (p === 2) c = mez(c, BL, 0.2); if (hh(x >> 1, y >> 1, 61) < 0.07) c = mez(c, hex('#8a7448'), 0.3); R.pset(x, y, c); }
  for (let x = 0; x < 320; x += 3) R.pset(x, 2 + (x % 2), hex('#6a5430'));
  // la abertura de la tienda con el desierto al atardecer (recortado)
  R.rect(228, 20, 300, 86, hex('#6a5430')); R.recorte([231, 22, 297, 86]);
  for (let y = 22; y <= 86; y++) for (let x = 231; x <= 297; x++) { const u = (y - 22) / 50; R.pset(x, y, u < 0.35 ? (R.b4(x, y) < u * 2.8 ? hex('#f0a060') : hex('#8a5a9a')) : u < 0.7 ? (R.b4(x, y) < (u - 0.35) * 2.8 ? hex('#f8d090') : hex('#f0a060')) : hex('#f8d090')); }
  R.disco(270, 64, 6, hex('#fff2c0')); R.poligono([[231, 70], [250, 60], [268, 66], [297, 56], [297, 86], [231, 86]], hex('#c88a6a')); R.poligono([[231, 78], [262, 74], [297, 80], [297, 86], [231, 86]], hex('#d8b080'));
  R.recorte(null); R.linea(228, 20, 264, 10, hex('#8a7448')); R.linea(300, 20, 264, 10, hex('#8a7448'));
  // el palo de la tienda y las cajas apiladas con tinajas
  R.rect(14, 0, 18, 86, hex('#5a3418')); R.rect(15, 0, 15, 86, hex('#8a5a30'));
  R.rect(26, 52, 70, 86, K); R.rect(27, 53, 69, 86, hex('#8a6a3a')); R.rect(27, 69, 69, 70, hex('#5a3a1a')); for (let x = 30; x < 68; x += 8) R.rect(x, 54, x, 85, hex('#6a4a24'));
  for (const [x, hgt] of [[38, 18], [58, 14]]) { R.poligono([[x - 5, 52], [x - 7, 52 - hgt / 2], [x - 3, 52 - hgt], [x + 3, 52 - hgt], [x + 7, 52 - hgt / 2], [x + 5, 52]], hex('#b86a3a')); R.linea(x - 6, 52 - hgt / 2, x + 6, 52 - hgt / 2, hex('#8a4a24')); R.rect(x - 3, 52 - hgt - 2, x + 3, 52 - hgt, hex('#8a4a24')); }
  // la mesa de tablas con el paño
  for (let y = 86; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor((y - 86) / 16), jy = (y - 86) % 16; let c = mez(hex('#8a6038'), hex('#a8784a'), hh(tb, 0, 62)); if (jy === 0) c = hex('#3a2414'); else if (jy === 1) c = mez(c, BL, 0.15);
    if (hh(Math.floor(x / 9), y, 63 + tb) < 0.18) c = mez(c, hex('#5a3a20'), 0.35); R.pset(x, y, c); }
  for (let j = 0; j < 4; j++) { const y = 92 + j * 16; R.disco(20 + j * 70, y + 8, 1, hex('#3a2414')); }
  for (let y = 100; y < 170; y++) for (let x = 60; x < 262; x++) { const bord = x < 63 || x > 258 || y < 103 || y > 166; R.pset(x, y, bord ? hex('#2a3a2a') : (hh(x >> 1, y >> 1, 64) < 0.1 ? hex('#3a5a3a') : hex('#466a46'))); }
  // la libreta con trazos, el lápiz, la regla, los pinceles y la lupa
  R.rect(8, 104, 52, 150, K); R.rect(9, 105, 51, 149, hex('#f2eee2')); R.rect(30, 105, 30, 149, hex('#c8c4bc')); for (let y = 110; y < 146; y += 5) { R.linea(12, y, 12 + Math.floor(hh(y, 2, 65) * 15), y, hex('#5a5a7a')); R.linea(33, y, 33 + Math.floor(hh(y, 3, 65) * 15), y, hex('#5a5a7a')); }
  R.rect(14, 140, 26, 146, hex('#c8303a')); R.linea(40, 154, 58, 146, hex('#e8c040')); R.pset(58, 146, K);
  R.rect(270, 150, 314, 156, K); R.rect(271, 151, 313, 155, hex('#e8d8a0')); for (let x = 273; x < 313; x += 3) R.rect(x, 151, x, x % 9 ? 152 : 153, hex('#3a2a1a'));
  for (let k = 0; k < 3; k++) { const x = 272 + k * 12; R.linea(x, 104, x + 6, 140, hex('#5a3418')); R.rect(x + 5, 140, x + 8, 145, K); R.rect(x + 6, 141, x + 7, 145, hex('#c8a870')); R.rect(x + 5, 138, x + 8, 139, hex('#c8c8d0')); }
  R.disco(24, 168, 9, K); R.disco(24, 168, 8, hex('#c8a040')); R.disco(24, 168, 6, hex('#a8d0f0')); R.pset(21, 165, BL); R.linea(31, 174, 44, 180, hex('#3a2414')); R.linea(32, 174, 45, 180, hex('#5a3418'));
  // el plano de las cuevas clavado en la lona y el salacot colgado del palo
  R.rect(190, 22, 222, 62, hex('#8a7448')); R.rect(191, 23, 221, 61, hex('#efe2c0')); R.linea(194, 56, 202, 40, hex('#8a6a4a')); R.linea(202, 40, 212, 46, hex('#8a6a4a')); R.linea(212, 46, 218, 30, hex('#8a6a4a'));
  for (const [x, y] of [[200, 44], [208, 50], [215, 36], [196, 52]]) { R.disco(x, y, 1.5, hex('#3a2a1a')); } R.linea(205, 33, 209, 37, hex('#c8303a')); R.linea(209, 33, 205, 37, hex('#c8303a')); R.disco(206, 23, 1.5, hex('#c8303a'));
  R.rect(16, 30, 22, 31, hex('#3a2414')); R.disco(24, 36, 7, K); R.disco(24, 36, 6, hex('#c8b078')); R.rect(15, 38, 33, 40, K); R.rect(16, 38, 32, 39, hex('#a8905a')); R.rect(19, 34, 29, 35, hex('#7a5a3a'));
  R.usar(prev); return B3; };
const p3 = (t) => {
  R.copiar(fondo3());
  // la tela de la tienda que ondea un poco en la abertura
  for (let y = 22; y < 86; y++) { const w = Math.round(2 + Math.sin(t * 2.2 + y * 0.12) * 2); R.rect(228, y, 230 + w, y, hex('#b8a070')); }
  // el farol de petróleo de la mesa
  { const x = 290, y = 108; R.rect(x - 6, y + 14, x + 6, y + 18, K); R.rect(x - 5, y + 15, x + 5, y + 17, hex('#5a5a6a')); R.poligono([[x - 5, y + 14], [x - 3, y], [x + 3, y], [x + 5, y + 14]], hex('#f8f0d8')); luz(x, y + 7, 26, hex('#ffd890'), 0.4);
    R.rect(x - 1, y + 5 - (Math.sin(t * 15) > 0 ? 1 : 0), x + 1, y + 9, hex('#f0a030')); R.pset(x, y + 7, BL); R.rect(x - 3, y - 2, x + 3, y, K); }
  // el rollo de cobre, grande, partido en dos; en «corroded» relumbra el cardenillo
  const rr = T.rollo(R, 160, 140, t, { s: 3.2, trocito: tramo(t, ROMPE, ROMPE + 0.7) });
  if (t > CORROE && t < TOCA + 0.2) for (let k = 0; k < 6; k++) { const x = 104 + Math.floor(hh(k, 1, 66) * 112), y = 120 + Math.floor(hh(k, 2, 66) * 18); if (Math.sin(t * 7 + k * 2) > 0.2) chispa(x, y, hex('#9ae8c0')); }
  // el reloj de arena y el «2000»
  { const x = 238, y = 112, ar = tramo(t, P3, ROMPE); R.rect(x - 7, y - 16, x + 7, y - 15, hex('#5a3418')); R.rect(x - 7, y + 15, x + 7, y + 16, hex('#5a3418')); R.rect(x - 6, y - 15, x - 6, y + 15, hex('#8a5a30')); R.rect(x + 6, y - 15, x + 6, y + 15, hex('#8a5a30'));
    R.poligono([[x - 5, y - 14], [x + 5, y - 14], [x, y], ], hex('#d8eef8')); R.poligono([[x - 5, y + 14], [x + 5, y + 14], [x, y]], hex('#d8eef8'));
    const a = Math.round(10 * (1 - ar)); if (a > 0) R.poligono([[x - Math.round(a / 2), y - a], [x + Math.round(a / 2), y - a], [x, y]], hex('#e8c060')); const b = Math.round(10 * ar); R.poligono([[x - Math.round(b / 2) - 1, y + 14], [x + Math.round(b / 2) + 1, y + 14], [x, y + 14 - b]], hex('#e8c060')); R.linea(x, y, x, y + 13, hex('#f0d080'));
    if (t > ANOS) { const e = tramo(t, ANOS, ANOS + 0.3); R.rect(104, 30, 188, 50, K); R.rect(105, 31, 187, 49, hex('#1a1a2a')); R.numero('2000', 146, Math.round(lerp(52, 46, e)), { tam: 16, centro: true }); if (e < 1) destello(146, 40, e, 8, 40); } }
  // la mano que lo roza y se aparta cuando se rompe
  { const ve = tramo(t, CORROE - 0.4, TOCA), aparta = tramo(t, ROMPE + 0.1, ROMPE + 0.5); const wx = Math.round(lerp(40, 96, ve) - aparta * 26), wy = Math.round(lerp(190, 136, ve) + aparta * 18 + (t > TOCA && t < ROMPE ? Math.sin(t * 12) : 0));
    if (ve > 0) T.brazo(R, -14, 200, wx, wy, '#c8b078', 1, { codo: [Math.round((wx - 14) / 2) - 6, Math.round((wy + 200) / 2) + 10] }); }
  if (t > ROMPE + 0.2 && t < ROMPE + 1.0) globo(rr.trocito ? rr.trocito[0] : 110, 112, '!', hex('#c8303a'));
};

// ── 4 · el taller de Manchester (1955 → 1956) ──
const ANYO56 = s(0.202), MANCH = s(0.447);
const p4 = (t) => {
  const d = T.desierto(R, t, { encuadre: 'taller', cortes: 0 }), sl = d.suelo;
  T.gato(R, 98, sl, t, {});
  // el operario en el torno: mueve la palanca
  { const m = R.actor(EL.operario, 60, sl, t, { dir: -1, sostiene: [52 + Math.round(Math.sin(t * 2.4) * 2), sl - 22], habla: t > ANYO56 + 0.6 && t < ANYO56 + 1.4 && Math.sin(t * 9) > 0 }).mano; }
  // el ingeniero entra con el rollo y lo monta en la sierra
  const u = tramo(t, P4 + 0.3, MANCH - 0.2), x = Math.round(lerp(-20, 146, u)), pone = t > MANCH;
  const oi = { dir: 1, anda: u > 0 && u < 1, sonrisa: pone && t > MANCH + 0.5 };
  if (!pone) oi.sostiene = u >= 1 ? [166, 126] : [x + 14, sl - 14];
  else if (t < MANCH + 0.4) oi.sostiene = [168, 128];
  const mi = R.actor(EL.ingeniero, x, sl, t, oi).mano;
  if (!pone) T.rollo(R, mi[0] + 2, mi[1] + 3, t, { uno: true, s: 0.8 }); else { T.rollo(R, 172, 129, t, { uno: true, s: 0.8 }); if (t < MANCH + 0.8) destello(172, 124, tramo(t, MANCH, MANCH + 0.8), 4, 14); }
};

// ── 5 · la sierra fina: corta el rollo en 23 tiras ──
const CORTA = s(0.616), TIRAS = s(0.862), VEINTI = s(0.925);
const p5 = (t) => {
  const d = T.desierto(R, t, { encuadre: 'taller', camara: 'sierra', corte: tramo(t, CORTA, TIRAS), gira: true });
  // la mano del ingeniero gira la manivela del carro, despacito
  { const a = (t - P5) * 1.6, cx = 64, cy = 160; R.disco(cx, cy, 9, K); R.disco(cx, cy, 8, hex('#5a5a6a')); R.disco(cx, cy, 3, hex('#c8a040')); const hx = Math.round(cx + Math.cos(a) * 7), hy = Math.round(cy + Math.sin(a) * 7); R.linea(cx, cy, hx, hy, hex('#c8c8d0'));
    T.brazo(R, -10, 196, hx - 4, hy + 2, '#8a8e9a', 1, { codo: [Math.round(hx / 2) - 8, 188] }); }
  // la tira cortada que se desliza a la bandeja y la cuenta hasta 23
  if (t > TIRAS - 0.3) { const u = tramo(t, TIRAS - 0.3, TIRAS + 0.3), x = Math.round(lerp(200, 262, u)), y = Math.round(lerp(132, 160, u)); R.rect(x, y, x + 14, y + 3, K); R.rect(x + 1, y + 1, x + 13, y + 2, hex('#5aa88a')); R.pset(x + 3, y + 1, hex('#c8784a')); }
  { const n = Math.round(lerp(1, 23, tramo(t, CORTA + 0.4, VEINTI))); if (t > CORTA + 0.3) { R.rect(204, 146, 252, 170, K); R.rect(205, 147, 251, 169, hex('#1a1a2a')); R.rect(205, 147, 251, 147, hex('#3a3a5a')); R.numero(String(n), 228, 166, { tam: 16, centro: true }); if (t > VEINTI) destello(228, 158, tramo(t, VEINTI, VEINTI + 0.8), 8, 34); } }
};
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], {
  cartela: '1952',
  efectos: [[MAPA, 'pop'], [P2 + 0.3, 'viento'], [HALLA, 'brillo'], [DOS, 'pop'], [ANOS, 'tic'], [ROMPE, 'golpecito'], [P4 + 0.1, 'lluvia'], [MANCH, 'golpecito'], [CORTA, 'maquina'], [VEINTI, 'brillo']],
  año: (t) => (t < P4 ? 1952 : t < ANYO56 ? 1955 : 1956) });
''')
