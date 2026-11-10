# Borrador de escenas del ep30, grupo S6: gz-ele, gz-diez, gz-expertos (con el movimiento hecho).
E = {}

# ayudas comunes de las tres escenas: ruido, trama ordenada, búferes de fondo fijo, cielo con nubes de tres tonos que
# respeta la esquina de Atom y la barra del año
COMUN = r'''
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const tono = (P, v, x, y) => P[Math.max(0, Math.min(P.length - 1, Math.floor(v + (BY[(y & 3) * 4 + (x & 3)] + 0.5) / 16)))];
const rampa = (...c) => c.map((s) => hex(s));
const K = hex('#16121e');
const lin = (t, a, b) => Math.max(0, Math.min(1, (t - a) / Math.max(1e-6, b - a)));
const capas = new Map();
// un fondo fijo se pinta una vez en su búfer y luego se copia (R.usar(prev), nunca R.usar() a secas)
const capa = (k, f) => { if (!capas.has(k)) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); capas.set(k, b); } R.copiar(capas.get(k)); };
// la esquina de Atom y la barra del año: ahí no entran nubes, pájaros ni nada que se mueva
const tranquilo = (x, y) => (x >= 272 && y <= 48) || (x >= 16 && x <= 174 && y <= 16);
const CIELO = rampa('#3a74c4', '#4a84d0', '#5c96dc', '#70a8e6', '#88baee', '#a2ccf2', '#c0dcf6');
const NUBE = rampa('#9eb0cc', '#d6e2f0', '#ffffff');
const pintaCielo = (x0, y0, x1, y1, hor, dentro) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (dentro(x, y)) R.pset(x, y, tono(CIELO, 6.4 * (y - y0) / Math.max(1, hor - y0), x, y)); };
// nubes de tres tonos a tres velocidades y pájaros, dentro de dentro(x, y)
const nubes = (t, x0, y0, x1, hor, dentro, o = {}) => {
  const lista = o.nubes ?? [[0.1, 0.35, 22, 3], [0.55, 0.6, 30, 5], [0.85, 0.3, 16, 8]];
  for (const [fx, fy, w, v] of lista) {
    const W = x1 - x0 + 2 * w + 20, cx = x0 - w - 10 + ((fx * W + t * v) % W), cy = y0 + fy * (hor - y0);
    for (const [dx, dy, r] of [[-w * 0.45, 2, w * 0.32], [0, -2, w * 0.42], [w * 0.42, 1, w * 0.3], [w * 0.15, 3, w * 0.36]]) {
      const ax = cx + dx, ay = cy + dy;
      for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { if (i * i + j * j > r * r) continue; const x = Math.round(ax + i), y = Math.round(ay + j * 0.55);
        if (x < x0 || x > x1 || y < y0 || y > hor || !dentro(x, y) || tranquilo(x, y)) continue;
        R.pset(x, y, y > cy + 3 ? NUBE[0] : (j < -r * 0.35 && i < r * 0.3) ? NUBE[2] : tono(NUBE, 1.6 - (y - cy + 4) * 0.08, x, y)); } }
  }
  for (let k = 0; k < (o.aves ?? 3); k++) { const x = Math.round(x0 + ((t * (9 + k * 3) + k * 61) % (x1 - x0 + 30)) - 15), y = Math.round(y0 + 18 + k * 7 + Math.sin(t * 1.3 + k) * 3), a = Math.sin(t * 10 + k * 2) > 0 ? 1 : 0;
    for (const [i, j] of [[-2, -a], [-1, 0], [0, 1], [1, 0], [2, -a]]) if (dentro(x + i, y + j) && !tranquilo(x + i, y + j) && x + i >= x0 && x + i <= x1) R.pset(x + i, y + j, hex('#2a3048')); }
};
const ARE = rampa('#8a6a3e', '#a8834e', '#c49c62', '#d8b276', '#e8c88c', '#f2d8a4', '#faeac2');
const CAL = rampa('#5e4a32', '#7a6244', '#9a7e58', '#b89a70', '#d0b488', '#e2c89e', '#f0dcb6');
// la pirámide lejana (Keops) con sus hiladas, vértice (ax, ay) hasta la base by, la cara de sombra a la derecha
const piramideLejos = (ax, ay, by, pend, dentro = () => true) => {
  for (let y = ay; y <= by; y++) { const hw = (y - ay) * pend; for (let x = Math.round(ax - hw); x <= ax + hw; x++) { if (!dentro(x, y)) continue;
    const sombra = x > ax + (y - ay) * 0.12, hil = Math.floor((y - ay) / 2);
    let v = (sombra ? 2.4 : 4.4) + (h(x >> 1, hil, 3) - 0.5) * 0.8 - (by - y) * 0.004 + 0.6;
    if ((y - ay) % 2 === 1) v -= 0.7;
    R.pset(x, y, tono(CAL, v, x, y)); } }
};
'''

E['gz-ele'] = ('La ele', '''// GZ-ELE (frase 17), 2024. Cuatro planos, en lo comprobado (estilo de siempre):
// 1. LOCAL el carrito de cerca ante una mastaba: entran el investigador japonés empujando el georradar y la
//    investigadora egipcia con la pértiga del GPS; en «Japan» y «Egypt» saltan las banderitas del carrito; en «scanned»
//    pita la pantallita y el suelo late bajo la antena; se paran y ella le habla. Corta en «next».
// 2. A giza/cementerio: Keops detrás («next to Khufu»); el carrito cruza la cuadrícula dejando rodadas; en «electrical
//    measurements» la chispa corre por los electrodos; la pantalla de la mesa va pintando el corte (o.ele) y en «L» la
//    egipcia señala la pantalla, sorprendida. Corta en «feature».
// 3. A giza/cementerio/pantalla: la L clara en el radargrama; la mano dibuja la L en el cuaderno y apunta «2» en
//    «two meters»; en «filled with sand» cae arena dentro de la L; en «something else» late la mancha y sale el «?».
//    Corta en «They».
// 4. LOCAL la zanja en corte (pocos metros, regla 0–6): la L de muros rellena de arena a 2 m y, debajo, una mancha
//    borrosa con «?»; los dos hablan en la superficie, en «deeper» ella señala abajo (flecha a trazos) y en «dug up» él
//    clava la pala dos veces y salta la arena; al final, sonríen.''', COMUN + r'''
const w = (s) => en('ele', (s - 0.5) / 20.023);   // un instante de la voz inglesa (s desde el inicio de la escena)
const P2 = w(4.62), P3 = w(9.58), P4 = w(14.92);
const team = w(1.86), japon = w(2.38), egipto = w(3.08), escanea = w(3.48), radar = w(6.22), electr = w(7.1), medidas = w(7.56), ele = w(9.08);
const enterrada = w(10.12), dos = w(10.8), metros = w(11.12), arena = w(12.24), algo = w(13.4), debajo = w(13.92);
const ellos = w(14.92), entrada = w(16.58), honda = w(17.5), cavar = w(19.2), saber = w(19.82);
const MANGA_EG = '#4a8a8a';

// banderitas de Japón y Egipto en un mástil (x, y = la punta del mástil); ondean; aparecen con un saltito
const banderitas = (t, x, y, a1, a2) => {
  R.linea(x, y, x, y + 16, K); R.pset(x, y - 1, hex('#e8c040'));
  for (const [t0, dy, tipo] of [[a1, 0, 'jp'], [a2, 7, 'eg']]) { if (t < t0) continue;
    const s = Math.min(1, (t - t0) / 0.18), wv = (i) => Math.round(Math.sin(t * 7 + i * 0.9) * 0.6 * (i / 8));
    for (let i = 0; i < Math.round(9 * s); i++) for (let j = 0; j < 6; j++) { let c;
      if (tipo === 'jp') c = Math.hypot(i - 4, j - 2.5) < 1.9 ? hex('#d02a2a') : hex('#f4f2ee');
      else c = j < 2 ? hex('#d02a2a') : j < 4 ? (i === 4 && j === 2 ? hex('#c8a040') : hex('#f4f2ee')) : hex('#1a1a1a');
      R.pset(x + 1 + i, y + dy + j + wv(i), c); }
    R.linea(x + 1, y + dy + 6, x + 9, y + dy + 6 + wv(8), hex('#6a6a70')); }
};

// ── 1 · LOCAL: el carrito de cerca ante una mastaba ──
// dos mastabas llenan el fondo: la de la izquierda (cima 58) y la de la derecha (cima 50), en talud, con una calle de
// arena entre las dos por la que se ven otras mastabas lejos
const PIE = 134, HOR1 = 104;
const enMI = (x, y) => y >= 58 && y <= PIE && x <= 142 + (y - 58) * 0.14;
const enMD = (x, y) => y >= 50 && y <= PIE && x >= 180 - (y - 50) * 0.14;
const mastabaDentro = (x, y) => enMI(x, y) || enMD(x, y);
const cieloP1 = (x, y) => y < HOR1 && !mastabaDentro(x, y);
const sillares = (dentro, top, sem) => { for (let y = top; y <= PIE; y++) for (let x = 0; x < 320; x++) { if (!dentro(x, y)) continue;
  const fila = Math.floor((y - top) / 9), ancho = 18 + ((fila + sem) % 3) * 4, off = (fila * 11 + sem * 5) % ancho, col = Math.floor((x + off) / ancho);
  const jh = (y - top) % 9 === 8, jv = (x + off) % ancho === 0;
  let v = 4.1 + (h(col, fila, 11 + sem) - 0.5) * 1.1 + (h(x >> 1, y >> 1, 12) - 0.5) * 0.7 - (y - top) * 0.006 - sem * 0.5;
  if ((y - top) % 9 === 0) v += 0.8;                                   // la arista de luz de cada hilada
  if (h(x, y, 13) < 0.03) v -= 1.6;                                    // picaduras
  R.pset(x, y, jh || jv ? CAL[1] : tono(CAL, v, x, y)); } };
// la puerta falsa: tres marcos que se rebajan, el tambor y la ranura oscura
const puertaFalsa = (x0, x1, y0) => {
  for (const [a, b, yy, c] of [[x0, x1, y0, 3.0], [x0 + 8, x1 - 8, y0 + 8, 2.3], [x0 + 15, x1 - 15, y0 + 20, 1.5]]) {
    for (let y = yy; y <= PIE; y++) for (let x = a; x <= b; x++) R.pset(x, y, tono(CAL, c + (h(x >> 1, y >> 1, 14) - 0.5) * 0.6 - (x < a + 2 ? 0.8 : 0), x, y));
    R.linea(a, yy, b, yy, CAL[1]); R.linea(b, yy, b, PIE, CAL[5]); }
  const cx = (x0 + x1) >> 1; R.rect(cx - 8, y0 + 14, cx + 8, y0 + 18, CAL[2]); R.linea(cx - 8, y0 + 14, cx + 8, y0 + 14, CAL[5]); R.rect(cx - 2, y0 + 26, cx + 2, PIE, CAL[0]);
};
const fijo1 = () => {
  pintaCielo(0, 0, 319, HOR1, HOR1, () => true);
  // el sol con su halo, lejos de la barra del año y de la esquina de Atom
  for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i, j); if (d < 12) R.pset(236 + i, 24 + j, d < 5 ? hex('#fff8dc') : d < 7 ? hex('#ffeeb0') : tono(CIELO, 6.2 - (d - 7) * 0.3, 236 + i, 24 + j)); }
  // la arena: de lejos a cerca, con ondas, piedrecitas y huellas
  for (let y = HOR1; y < 180; y++) for (let x = 0; x < 320; x++) {
    let v = 3.6 + (y - HOR1) * 0.012 + (h(x >> 1, y, 9) - 0.5) * 0.9;
    if (Math.sin(x * 0.08 + y * 0.9 + Math.sin(x * 0.02) * 3) > 0.86) v -= 1.1;
    R.pset(x, y, tono(ARE, v, x, y)); }
  // por la calle entre las dos, otras mastabas lejos
  for (let k = 0; k < 4; k++) { const x0 = 140 + k * 12, w = 9, hh = 6 + (k % 2) * 3; R.rect(x0, HOR1 - hh, x0 + w, HOR1, CAL[4]); R.rect(x0 + w - 2, HOR1 - hh, x0 + w, HOR1, CAL[2]); R.linea(x0, HOR1 - hh, x0 + w, HOR1 - hh, CAL[6]); }
  for (let k = 0; k < 70; k++) { const x = Math.floor(h(k, 3, 10) * 320), y = 136 + Math.floor(h(k, 4, 10) * 42), s = y > 150 ? 1 : 0;
    R.rect(x, y, x + s, y, ARE[1]); R.pset(x, y - 1, ARE[5]); }
  for (let k = 0; k < 9; k++) { const x = 20 + k * 17, y = 168 + (k % 2) * 4; R.rect(x, y, x + 2, y + 1, ARE[1]); R.pset(x + 1, y + 2, ARE[2]); }
  // las dos mastabas de cerca: muros en talud de grandes sillares, con sus puertas falsas
  sillares(enMI, 58, 1); sillares(enMD, 50, 0);
  for (let y = 58; y <= PIE; y++) { const x = Math.floor(142 + (y - 58) * 0.14); R.pset(x, y, CAL[1]); R.pset(x - 1, y, CAL[3]); }
  for (let y = 50; y <= PIE; y++) { const x = Math.ceil(180 - (y - 50) * 0.14); R.pset(x, y, CAL[1]); R.pset(x + 1, y, CAL[6]); }
  R.linea(0, 58, 142, 58, CAL[6]); R.linea(0, 57, 142, 57, CAL[2]); R.linea(180, 50, 319, 50, CAL[6]); R.linea(180, 49, 319, 49, CAL[2]);
  puertaFalsa(22, 58, 74); puertaFalsa(88, 120, 78); puertaFalsa(226, 270, 66);
  // la sombra que la mastaba de la derecha echa en la calle
  for (let y = 104; y <= PIE; y++) for (let x = 160; x < Math.ceil(180 - (y - 50) * 0.14); x++) if ((x + y) % 2 === 0) R.pset(x, y, ARE[1]);
  // grieta en la esquina y un sillar caído delante, con su sombra
  R.linea(296, 60, 300, 78, CAL[0]); R.linea(300, 78, 297, 92, CAL[0]); R.linea(298, 92, 303, 104, CAL[1]);
  R.rect(286, 140, 312, 152, CAL[1]); R.rect(287, 141, 311, 150, CAL[4]); R.linea(287, 141, 311, 141, CAL[6]); R.rect(282, 153, 316, 155, ARE[1]);
  // arena acumulada al pie, más clara arriba
  for (let x = 0; x < 320; x++) { const a = 128 + Math.round(Math.sin(x * 0.05) * 3); for (let y = a; y <= 136; y++) R.pset(x, y, tono(ARE, 4.6 - (y - a) * 0.2, x, y)); R.pset(x, a, ARE[6]); }
  // la cuadrícula de cuerdas con estacas
  for (const y of [138, 148]) { R.linea(0, y, 184, y + 4, hex('#e8e0d0')); for (let x = 8; x < 184; x += 44) { R.rect(x, y - 6 + Math.round(x * 4 / 184), x + 1, y + 2 + Math.round(x * 4 / 184), hex('#6a4a2a')); R.pset(x, y - 7 + Math.round(x * 4 / 184), hex('#8a6a4a')); } }
  // rodadas viejas de otras pasadas y filas de huellas en el primer término
  for (const y of [167, 171, 175]) for (let x = 0; x < 320; x++) if ((x + y) % 3 !== 0) R.pset(x, y + Math.round(Math.sin(x * 0.03 + y) * 1.5), ARE[2]);
  for (let k = 0; k < 16; k++) { const x = 4 + k * 13, y = 150 + (k % 2) * 3; R.rect(x, y, x + 2, y + 1, ARE[1]); R.pset(x + 1, y + 2, ARE[2]); }
  // la cinta métrica amarilla desenrollada en diagonal, con sus marcas
  for (let x = 0; x < 170; x++) { const y = Math.round(178 - x * 0.05); R.pset(x, y, hex('#e8c030')); R.pset(x, y - 1, hex('#f6e070')); if (x % 6 === 0) R.pset(x, y - 1, K); }
  R.rect(168, 166, 178, 174, K); R.rect(169, 167, 177, 173, hex('#e8c030')); R.disco(173, 170, 2, hex('#8a6a20')); R.pset(173, 170, K);
  // el equipo en el suelo, delante de la mastaba: la caja de madera con el termo, la bobina de cable naranja y la mochila
  R.rect(224, 156, 262, 176, K); for (let y = 157; y < 176; y++) for (let x = 225; x < 262; x++) R.pset(x, y, tono(rampa('#6a4424', '#8a5a32', '#a87444', '#c08a54'), 2 + Math.sin(x * 0.9 + y * 0.05) * 0.3 + (y % 6 === 0 ? -1.2 : 0), x, y));
  R.rect(225, 157, 261, 158, hex('#c89a64')); R.rect(229, 162, 233, 166, hex('#3a3a42')); R.rect(253, 162, 257, 166, hex('#3a3a42'));
  R.rect(234, 146, 241, 156, K); R.rect(235, 147, 240, 155, hex('#2a7a5a')); R.rect(235, 147, 240, 148, hex('#c8c8d2')); R.pset(236, 150, hex('#5aaa8a'));
  R.disco(278, 168, 9, K); R.disco(278, 168, 8, hex('#d06a2a')); for (let a = 0; a < 3; a++) R.disco(278, 168, 7 - a * 2, a % 2 ? hex('#a84a1a') : hex('#e88a3a')); R.disco(278, 168, 2, hex('#5a5a62')); R.disco(278, 168, 1, K);
  for (let x = 262; x < 270; x++) R.pset(x, 174 - Math.round((x - 262) * 0.3), hex('#d06a2a'));
  R.rect(292, 154, 314, 176, K); R.rect(293, 155, 313, 175, hex('#3a5a7a')); R.rect(293, 155, 313, 158, hex('#5a7a9a')); R.rect(299, 164, 307, 167, hex('#e8d070')); R.linea(296, 154, 300, 148, K); R.linea(310, 154, 306, 148, K); R.linea(300, 148, 306, 148, K);
};
const p1 = (t) => {
  capa('ele1', fijo1);
  nubes(t, 0, 0, 319, 92, cieloP1, { nubes: [[0.2, 0.45, 20, 3], [0.6, 0.75, 26, 5], [0.9, 0.35, 14, 8]], aves: 2 });
  T.halcon(R, t, 132, 46, 16);
  // la estación total en su trípode, a media distancia, con su piloto que parpadea
  R.linea(58, 136, 52, 150, K); R.linea(58, 136, 64, 150, K); R.linea(58, 136, 58, 150, hex('#5a5a62')); R.rect(54, 128, 62, 135, K); R.rect(55, 129, 61, 134, hex('#e8c030')); R.rect(57, 130, 60, 132, hex('#3a3a46')); if (Math.floor(t * 2) % 2) R.pset(61, 129, hex('#e83a3a'));
  // un trabajador con su carretilla por el horizonte y el polvo que levanta el viento
  { const x = Math.round(176 - ((t * 7) % 40)), y = 110; if (x > 146) { R.rect(x, y - 6, x + 1, y - 1, hex('#e8e0d0')); R.pset(x, y - 7, hex('#7a5038')); R.rect(x - 6, y - 3, x - 2, y - 1, hex('#5a5a62')); R.pset(x - 7, y, K); R.pset(x + (Math.sin(t * 8) > 0 ? 1 : 0), y, K); } }
  for (let k = 0; k < 6; k++) { const u = (t * 0.5 + k / 6) % 1, x = Math.round(-10 + u * 340), y = Math.round(150 + k * 4 + Math.sin(u * 9 + k) * 3); if (!tranquilo(x, y)) R.pset(x, y, ARE[6]); }
  // el carrito entra empujado; la egipcia va delante con la pértiga del GPS; se paran en «scanned»
  const u = tramo(t, 0.2, escanea - 0.1), cx = Math.round(lerp(-18, 118, u)), cy = 160, anda = u > 0 && u < 1;
  // las rodadas que deja detrás
  for (let x = -20; x < cx - 4; x++) for (const dx of [-4, 11]) { if (x + dx < cx - 4) { R.pset(x + dx, cy - 1, ARE[1]); R.pset(x + dx, cy, ARE[2]); } }
  // el suelo late bajo la antena al escanear
  if (t > escanea) for (let k = 0; k < 2; k++) { const s = ((t - escanea) * 1.6 + k * 0.5) % 1, rx = 6 + s * 22; for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2, x = Math.round(cx + 4 + Math.cos(an) * rx), y = Math.round(cy + 2 + Math.sin(an) * rx * 0.22); if (y >= cy && s < 0.9) R.pset(x, y, ARE[6]); } }
  const ex = Math.round(cx + 30 + (u >= 1 ? 4 : 0)), giraEg = t > escanea + 0.05;
  const eg = R.actor(EL.egipcia2024, ex, cy, t, { dir: giraEg ? -1 : 1, anda, sostiene: giraEg ? undefined : [ex + 16, cy - 15], habla: giraEg && t < P2 - 0.2 && Math.sin(t * 9) > -0.3, dedo: giraEg && t > escanea + 0.5 && t < escanea + 1.0 });
  if (!giraEg) { const [mx, my] = eg.mano; R.linea(mx, my - 24, mx, my + 6, hex('#3a3a42')); R.linea(mx + 1, my - 24, mx + 1, my + 6, hex('#8a8a96')); R.rect(mx - 2, my - 27, mx + 3, my - 25, K); R.rect(mx - 1, my - 27, mx + 2, my - 26, hex('#f2f2f6')); }
  else { const px = ex - 4; R.linea(px, cy - 30, px, cy, hex('#3a3a42')); R.linea(px + 1, cy - 30, px + 1, cy, hex('#8a8a96')); R.rect(px - 2, cy - 33, px + 3, cy - 31, K); R.rect(px - 1, cy - 33, px + 2, cy - 32, hex('#f2f2f6')); if (Math.floor(t * 3) % 2) R.pset(px + 1, cy - 34, hex('#3af06a')); }
  R.actor(EL.japones2024, cx - 33, cy, t, { dir: 1, anda, sostiene: [cx - 15, cy - 21], sonrisa: t > escanea + 0.3 });
  T.PIEZAS_GZ.carritoRadar(R, cx, cy + 1, { t: anda ? t : 0 });
  banderitas(t, cx + 9, cy - 34, japon, egipto);
  if (t > escanea && t < escanea + 0.5 && Math.floor(t * 12) % 2 === 0) { R.rect(cx - 9, cy - 19, cx - 3, cy - 16, hex('#9af0a0')); }
};

// ── 2 · A giza/cementerio: el barrido junto a Keops ──
const O2 = (t) => ({ encuadre: 'cementerio', ele: 0.7 * tramo(t, radar, ele) + 0.13 * tramo(t, ele, P3) });
const ELECTRODOS = [26, 50, 74, 98, 122, 146, 170, 194];
const p2 = (t) => {
  const o = O2(t); T.giza(R, t, o);
  // los electrodos clavados en fila con su cable; en «electrical measurements» la corriente corre por ellos
  for (let x = ELECTRODOS[0]; x <= ELECTRODOS[7]; x++) R.pset(x, 171 + Math.round(Math.sin((x - 26) / 24 * Math.PI) * 1.2), K);
  const chispa = lin(t, electr, medidas + 0.6);
  ELECTRODOS.forEach((x, k) => { const viva = chispa > 0 && chispa < 1 && Math.abs(chispa * 7 - k) < 0.6;
    R.rect(x, 164, x + 1, 171, hex('#8a8a96')); R.pset(x, 164, hex('#d8d8e2')); R.rect(x - 1, 163, x + 2, 164, viva ? hex('#fff6a0') : hex('#e0a030'));
    if (viva) for (const [i, j] of [[-2, -2], [3, -2], [-2, 1], [3, 1], [0, -4]]) R.pset(x + i, 163 + j, hex('#fff6a0')); });
  if (chispa > 0 && chispa < 1) { const x = Math.round(lerp(26, 194, chispa)); R.disco(x, 171, 1, hex('#fff6a0')); }
  // el carrito cruza la cuadrícula dejando rodadas
  const u = tramo(t, P2 + 0.1, ele - 0.4), cx = Math.round(lerp(70, 172, u)), cy = 162, anda = u > 0 && u < 1;
  for (let x = 52; x < cx - 4; x++) { R.pset(x - 4, cy, hex('#a8834e')); R.pset(x + 11, cy, hex('#a8834e')); }
  R.actor(EL.japones2024, cx - 33, cy, t, { dir: 1, anda, sostiene: [cx - 15, cy - 21], sonrisa: t > ele + 0.2 });
  T.PIEZAS_GZ.carritoRadar(R, cx, cy + 1, { t: anda ? t : 0 });
  banderitas(t, cx + 9, cy - 34, -1, -1);
  // la egipcia, junto a la mesa, mira la pantalla; dicta cifras y en «L» la señala, sorprendida
  R.actor(EL.egipcia2024, 222, 162, t, { dir: 1, habla: t > radar && t < electr + 0.6 && Math.sin(t * 9) > -0.3, dedo: t > ele - 0.05, sorpresa: t > ele && t < ele + 0.9 });
  T.gizaDelante(R, t, o);
};

// ── 3 · A giza/cementerio/pantalla: la L de cerca ──
const O3 = (t) => ({ encuadre: 'cementerio', camara: 'pantalla', ele: 0.62 + 0.22 * lin(t, P3, algo - 0.1) + 0.16 * lin(t, algo - 0.1, algo + 0.1) });
const L3 = [[104, 50, 180, 58], [104, 50, 116, 78]];   // la L en el cristal (los dos brazos)
const p3 = (t) => {
  const o = O3(t); T.giza(R, t, o);
  R.recorte([36, 30, 276, 126]);
  // «two meters»: la cota 2 se enciende y una raya a trazos va de la regla a la L
  const d2 = lin(t, dos, dos + 0.4);
  if (d2 > 0) { const xe = Math.round(lerp(50, 104, d2)); R.linea(50, 70, xe, 70, hex('#ffe070'), 2); if (Math.floor(t * 4) % 2 === 0 || t > metros + 0.6) for (let a = 0; a < 24; a++) { const an = a / 24 * Math.PI * 2; R.pset(Math.round(43 + Math.cos(an) * 7), Math.round(70 + Math.sin(an) * 6), hex('#ffe070')); } }
  // «filled with sand»: la arena cae dentro de la L y la va llenando
  const ar = lin(t, arena - 0.1, debajo);
  if (ar > 0) { for (let k = 0; k < 26; k++) { const x = 106 + Math.floor(h(k, 1, 30) * 72), s = ((t * 1.3 + h(k, 2, 30)) % 1), y = Math.round(32 + s * 22); if (ar < 1 && x < 180) R.pset(x, y, hex('#f0d080')); }
    for (const [x0, y0, x1, y1] of L3) for (let y = y1; y >= y0; y--) { if ((y1 - y) / (y1 - y0 + 1) > ar * 1.1) continue; for (let x = x0 + 1; x < x1; x++) if ((x + y * 3) % 4 === 0 || h(x, y, 31) < 0.25) R.pset(x, y, hex('#f6dc8c')); } }
  // «something else beneath it»: la mancha late con su anillo
  if (t > algo) { const s = ((t - algo) * 1.4) % 1; for (let a = 0; a < 30; a++) { const an = a / 30 * Math.PI * 2; R.pset(Math.round(208 + Math.cos(an) * (6 + s * 12)), Math.round(101 + Math.sin(an) * (3 + s * 6)), s < 0.7 ? hex('#ffb070') : hex('#a86a40')); } }
  R.recorte(null);
  // la mano dibuja la L en el cuaderno y apunta el 2 (y luego el «?»)
  const s1 = lin(t, enterrada, dos), s2 = lin(t, dos, metros + 0.2), sq = lin(t, algo, algo + 0.5);
  if (s1 > 0) R.linea(28, 156, Math.round(28 + 20 * s1), 156, hex('#2a2a3a'));
  if (s2 > 0) R.linea(28, 156, 28, Math.round(156 + 12 * s2), hex('#2a2a3a'));
  if (t > metros + 0.2) R.numero('2', 54, 166, { color: hex('#2a2a3a'), sombra: false });
  if (sq > 0.5) R.icono('?', 40, 170, hex('#c03a3a'), hex('#e8e0d0'));
  let tx = 28, ty = 156;
  if (s1 > 0 && s1 < 1) tx = 28 + 20 * s1; else if (s1 >= 1) { tx = 28; ty = 156 + 12 * s2; }
  if (t > metros + 0.1) { tx = 56; ty = 162; } if (t > arena) { tx = 70; ty = 172; } if (sq > 0 && sq < 1) { tx = 42; ty = 170; }
  const vx = Math.round(tx + Math.sin(t * 20) * 0.6), vy = Math.round(ty);
  T.brazo(R, -10, 198, vx - 12, vy + 8, MANGA_EG, 1, { codo: [vx - 34, vy + 22] });
  R.linea(vx - 4, vy + 6, vx, vy, hex('#e8b030')); R.linea(vx - 5, vy + 5, vx - 1, vy - 1, hex('#c88a20')); R.pset(vx, vy, K);
};

// ── 4 · LOCAL: la zanja en corte (pocos metros) ──
const SUP = 60, M1 = 18;   // la superficie y los píxeles por metro
const ARENA4 = rampa('#a8834e', '#bc9660', '#cca870', '#dcbc84', '#e8cc96', '#f2dcae');
const RELLENO = rampa('#8a6a40', '#9e7c4c', '#b08c5a', '#c29e6a');
const ROCA = rampa('#5a4a3a', '#6a5844', '#7c6850', '#8e7a5e', '#a08c6e');
const LMUROS = [[70, 96, 196, 118], [70, 96, 92, 150]];
const enL = (x, y) => LMUROS.some(([a, b, c, d]) => x >= a && x <= c && y >= b && y <= d);
const cieloP4 = (x, y) => y < SUP - 8 && !(x >= 198 && x <= 262 && y >= 42);
const fijo4 = () => {
  pintaCielo(0, 0, 319, SUP, SUP, () => true);
  for (let k = 0; k < 12; k++) { const x0 = 4 + k * 16 + Math.floor(h(k, 1, 39) * 5), w = 9 + Math.floor(h(k, 2, 39) * 4), hh = 4 + (k % 3) * 2; R.rect(x0, SUP - hh, x0 + w, SUP, CAL[4]); R.rect(x0 + w - 2, SUP - hh, x0 + w, SUP, CAL[2]); R.linea(x0, SUP - hh, x0 + w, SUP - hh, CAL[6]); }
  for (let y = SUP - 6; y < SUP; y++) for (let x = 0; x < 320; x++) if (h(x, y, 40) < (y - SUP + 6) / 8) R.pset(x, y, hex('#e4d6b8'));
  // la mastaba en la superficie, de lado, con su puerta falsa
  for (let y = 42; y < SUP; y++) for (let x = 198 + Math.round((SUP - y) * 0.15); x <= 262 - Math.round((SUP - y) * 0.15); x++) { const fila = Math.floor((y - 42) / 5), jh = (y - 42) % 5 === 4, jv = (x + fila * 7) % 14 === 0;
    R.pset(x, y, jh || jv ? CAL[1] : tono(CAL, 4 + (h(x >> 2, fila, 41) - 0.5) - (x > 250 ? 1.2 : 0), x, y)); }
  R.rect(226, 48, 234, SUP - 1, CAL[2]); R.rect(229, 51, 231, SUP - 1, CAL[0]); R.linea(198, 42, 262, 42, CAL[6]);
  // el suelo en corte: arena suelta, relleno de grava con piedras y la roca madre en estratos con numulites
  for (let y = SUP; y < 180; y++) for (let x = 0; x < 320; x++) {
    const d = y - SUP + Math.sin(x * 0.07) * 2 + Math.sin(x * 0.019) * 4;
    let c;
    if (d < 8) c = tono(ARENA4, 4.2 - d * 0.15 + (h(x, y, 42) - 0.5), x, y);
    else if (d < 70) { c = tono(RELLENO, 2 + (h(x >> 1, y >> 1, 43) - 0.5) * 1.6 - (d - 8) * 0.012, x, y); if (Math.sin(y * 0.6 + x * 0.05) > 0.93) c = RELLENO[0]; }
    else { const est = Math.floor((d - 70) / 9); c = tono(ROCA, 2.6 - est * 0.25 + (h(x >> 2, est, 44) - 0.5) * 0.9, x, y); if ((d - 70) % 9 === 0) c = ROCA[0]; }
    R.pset(x, y, c); }
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 45) * 320), y = SUP + 10 + Math.floor(h(k, 2, 45) * 58), r = 1 + Math.floor(h(k, 3, 45) * 2); if (enL(x, y)) continue; R.disco(x, y, r, RELLENO[0]); R.pset(x - 1, y - 1, RELLENO[3]); }
  for (let k = 0; k < 18; k++) { const x = Math.floor(h(k, 4, 46) * 320), y = 136 + Math.floor(h(k, 5, 46) * 40); R.disco(x, y, 2, ROCA[4]); R.pset(x, y, ROCA[1]); R.pset(x + 1, y, ROCA[1]); }
  // los cimientos de la mastaba bajo la superficie, tiestos de vasijas y vetas de grava
  for (let y = SUP + 1; y < SUP + 13; y++) for (let x = 200; x <= 260; x++) { const f = Math.floor((y - SUP - 1) / 4), j = (y - SUP - 1) % 4 === 3 || (x + f * 5) % 12 === 0; R.pset(x, y, j ? CAL[0] : tono(CAL, 2.6 + (h(x >> 2, f, 49) - 0.5), x, y)); }
  for (const [x, y, c] of [[226, 92, '#a8583a'], [262, 104, '#b86a44'], [292, 84, '#a8583a'], [40, 100, '#b86a44'], [214, 120, '#9a4a30']]) { R.poligono([[x, y], [x + 7, y - 2], [x + 9, y + 2], [x + 2, y + 4]], hex(c)); R.linea(x, y, x + 7, y - 2, hex('#e0a070')); }
  for (const [y0, x0, x1] of [[86, 200, 316], [112, 214, 300], [80, 110, 190], [118, 0, 60]]) for (let x = x0; x < x1; x++) { const y = y0 + Math.round(Math.sin(x * 0.08) * 2); if (h(x, y0, 51) < 0.7) { R.pset(x, y, RELLENO[0]); if (x % 3 === 0) R.pset(x, y + 1, RELLENO[3]); } }
  R.disco(292, 150, 4, ROCA[4]); for (let a = 0; a < 3; a++) R.pset(290 + a * 2, 149 + (a % 2), ROCA[0]); R.pset(292, 147, ROCA[0]);
  R.linea(250, 132, 262, 160, ROCA[0]); R.linea(262, 160, 258, 178, ROCA[0]); R.linea(30, 140, 22, 170, ROCA[0]);
  R.linea(0, SUP, 319, SUP, ARENA4[5]);
  // la L: muros de bloques que encierran un relleno de arena más clara
  for (const [x0, y0, x1, y1] of LMUROS) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const borde = x < x0 + 4 || x > x1 - 4 || y < y0 + 4 || y > y1 - 4;
    if (borde) { const j = ((y - y0) % 4 === 0) || ((x + Math.floor((y - y0) / 4) * 3) % 8 === 0); R.pset(x, y, j ? CAL[1] : tono(CAL, 3.6 + (h(x >> 1, y >> 1, 47) - 0.5), x, y)); }
    else R.pset(x, y, tono(ARENA4, 4.6 + (h(x, y, 48) - 0.5) * 1.2 + ((x + y) % 6 === 0 ? -1 : 0), x, y)); }
  // vuelve a pintar el relleno interior encima de las juntas que se cruzan donde se unen los dos brazos
  for (let y = 100; y <= 114; y++) for (let x = 74; x <= 88; x++) R.pset(x, y, tono(ARENA4, 4.6 + (h(x, y, 48) - 0.5) * 1.2, x, y));
  // la regla de metros, a la izquierda
  R.rect(310, SUP, 317, 178, K); R.rect(311, SUP, 316, 178, hex('#f2eee2'));
  for (let m = 0; m <= 6; m++) { const y = SUP + m * M1; R.rect(311, y, 316, y, K); if (m < 6) R.rect(314, y + 9, 316, y + 9, K); for (let y2 = y + 1; y2 < Math.min(178, y + 9); y2++) if (m % 2) R.rect(311, y2, 316, y2, hex('#d84a3a')); }
};
const p4 = (t) => {
  capa('ele4', fijo4);
  nubes(t, 0, 0, 319, SUP - 6, cieloP4, { nubes: [[0.15, 0.55, 18, 3], [0.6, 0.75, 24, 5], [0.85, 0.4, 14, 7]], aves: 2 });
  // los números de la regla
  for (const m of [2, 4, 6]) R.numero(String(m), 300, SUP + m * M1 + 4, { color: hex('#f2eee2') });
  // la mancha de abajo, borrosa, que late; en «deeper» se aviva y una flecha a trazos baja de la L
  const vivo = 0.5 + 0.5 * lin(t, entrada, honda) , lat = 0.75 + 0.25 * Math.sin(t * 4);
  for (let y = 150; y < 178; y++) for (let x = 100; x < 210; x++) { const d = Math.hypot((x - 154) / 46, (y - 165) / 11); if (d > 1) continue;
    if (h(x, y, 50 + (Math.floor(t * 6) & 3)) < (1 - d) * vivo * lat) R.pset(x, y, d < 0.45 ? hex('#2a1e18') : hex('#4a3a2c')); }
  if (t > entrada) { const a = lin(t, entrada, honda), y1 = Math.round(121 + 24 * a); for (let y = 121; y <= y1; y++) if ((y >> 1) % 2 === 0) { R.rect(149, y, 151, y, hex('#fff2c0')); R.pset(152, y, K); }
    if (a >= 1) for (let i = 0; i < 4; i++) { R.rect(150 - i - 1, 150 - i, 150 + i + 1, 150 - i, hex('#fff2c0')); } }
  R.icono('?', 168, 159, Math.floor(t * 2) % 2 && t > entrada ? hex('#ffe070') : hex('#f2eee2'), K, 2);
  // el agujero de la pala crece en la superficie
  const hoyo = Math.round(6 * lin(t, cavar, saber + 0.4));
  if (hoyo > 0) for (let y = SUP; y < SUP + hoyo; y++) for (let x = 170 - (SUP + hoyo - y); x <= 182 + (SUP + hoyo - y) - 4; x++) R.pset(x, y, y === SUP + hoyo - 1 ? ARENA4[1] : hex('#7a5a36'));
  // el carrito aparcado, con sus banderitas
  T.PIEZAS_GZ.carritoRadar(R, 34, SUP + 1, { t: 0 }); banderitas(t, 43, SUP - 34, -1, -1);
  // un lagarto que corretea por la superficie y un escarabajo que empuja su bola
  { const x = Math.round(330 - ((t * 22) % 360)), y = SUP - 1; if (x < 320 && !(x > 196 && x < 264)) { R.rect(x, y - 1, x + 6, y, hex('#8a7a4a')); R.pset(x - 1, y - 1, hex('#5a4a2a')); R.linea(x + 7, y, x + 11, y - (Math.sin(t * 20) > 0 ? 1 : 0), hex('#8a7a4a')); R.pset(x + 1, y + (Math.sin(t * 24) > 0 ? 1 : 0), hex('#5a4a2a')); R.pset(x + 5, y + (Math.sin(t * 24) > 0 ? 0 : 1), hex('#5a4a2a')); } }
  { const x = Math.round(276 + Math.sin(t * 0.4) * 8), y = SUP - 1; R.disco(x + 4, y - 1, 2, hex('#8a6a3e')); R.rect(x, y - 2, x + 2, y, hex('#1a1a22')); R.pset(x + 1, y - 3, hex('#3a3a4a')); }
  // en la superficie: «They themselves say»: hablan; en «deeper» ella señala abajo; en «dug up» él cava dos veces
  const cav = t > cavar - 0.5 && t < saber + 0.5, golpe = (t > cavar && t < cavar + 0.25) || (t > saber && t < saber + 0.25);
  R.actor(EL.egipcia2024, 100, SUP, t, { dir: 1, habla: t > ellos && t < entrada - 0.1 && Math.sin(t * 9) > -0.3, dedo: t > entrada && t < cavar - 0.4, sonrisa: t > saber + 0.4 });
  const jx = 150, jp = R.actor(EL.japones2024, jx, SUP, t, { dir: 1, sostiene: [jx + 18, golpe ? SUP - 8 : cav ? SUP - 20 : SUP - 13], habla: t > entrada + 0.2 && t < honda + 0.6 && Math.sin(t * 9) > -0.3, sonrisa: t > saber + 0.4, sorpresa: t > ellos + 0.3 && t < ellos + 0.9 });
  // la pala en su mano: el mango baja hacia la hoja
  { const [mx, my] = jp.mano, bx = mx + 5, by = my + (golpe ? 12 : 10); R.linea(mx, my - 3, bx, by, hex('#7a5030')); R.linea(mx + 1, my - 3, bx + 1, by, hex('#a87848')); R.rect(bx - 1, by, bx + 3, by + 4, hex('#8a8a96')); R.linea(bx - 1, by, bx + 3, by, hex('#c8c8d2')); R.rect(mx - 1, my - 4, mx + 2, my - 3, K); }
  // la arena que salta en cada palada
  for (const t0 of [cavar, saber]) { const s = (t - t0) / 0.7; if (s <= 0 || s >= 1) continue; for (let k = 0; k < 7; k++) { const vx = (k - 3) * 9, x = Math.round(176 + vx * s), y = Math.round(SUP - 2 - 22 * s + 30 * s * s - k % 2); R.rect(x, y, x + 1, y, ARENA4[4]); R.pset(x, y + 1, ARENA4[1]); } }
};
const efectos = [[w(0.3), 'carro'], [japon, 'pop'], [egipto, 'pop'], [escanea, 'bip'], [w(5.0), 'carro'], [electr, 'zumbido'], [ele, 'bip'],
  [enterrada, 'lapiz'], [algo, 'bip'], [entrada, 'brillo'], [cavar + 0.05, 'golpecito'], [saber + 0.05, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2024 });
''')

E['gz-diez'] = ('Diez metros', '''// GZ-DIEZ (frase 18), 2025. Cinco planos:
// 1. B italia/prensa/mesa: el anuncio de 2025 (el plano azul en la pantalla); Malanga habla; en «experts» suben del
//    público tres manos con su «?»; en «2025» Biondi señala la pantalla y en «announcement» Mei levanta la lámina azul.
//    Corta en «First».
// 2. F hoy/suelo: el corte del suelo; la onda del radar entra en la arena y se para (o.radar) en «barely gets into the
//    ground»; el técnico se encoge de hombros; en «European Space Agency» baja la señal de un satélite y se enciende la
//    cota con un «10» grande. Corta en «puts».
// 3. B italia/video: Biondi graba en su estudio; en «10» su monitor enseña el satélite y el «10» y él lo señala; en
//    «admits» levanta las manos, tranquilo. El gato cruza y se sienta. Corta tras «admits it».
// 4. F hoy/orbita/rebote (gag 6): en «going straight through» la onda baja como una pelota, choca con la roca en
//    «rock», salta el polvo y vuelve al satélite, que recula; en «impossible», una «X» roja sobre la roca. Corta en
//    «depends».
// 5. LOCAL la mesa de análisis: la traza de vibraciones corre en el monitor; en «depends» entra por la derecha la
//    lectura de los pozos en plano azul y a la izquierda la de roca maciza; la mano repasa la traza impresa y rodea un
//    pico en «vibrations»; en «interpreted» la balanza oscila entre las dos y parpadea el «?».''', COMUN + r'''
const w = (s) => en('diez', (s - 0.9) / 21.124);
const P2 = w(4.70), P3 = w(9.66), P4 = w(14.66), P5 = w(18.98);
const expertos = w(1.48), anio = w(2.74), anuncio = w(3.28), satelite = w(5.3), apenas = w(6.38), suelo = w(7.38), esa = w(8.28);
const diez = w(10.68), admite = w(13.37), recto = w(15.07), roca = w(16.6), imposible = w(17.53), vibra = w(20.28), interpreta = w(21.26);
const AZUL = { fondo: T.C.planoFondo, rej: T.C.planoRejilla, lin: T.C.planoLinea, bri: T.C.planoBrillo };

// ── 1 · B italia/prensa/mesa: el anuncio ──
const O1 = { encuadre: 'prensa', camara: 'mesa', pantalla: 'plano' };
const p1 = (t) => {
  const o = { ...O1, habla: t < anio - 0.1 ? 0 : t < anuncio ? 1 : 2 }; T.italia(R, t, o);
  R.actor(EL.malanga, 83, 145, t, { dir: 1, habla: t < anio - 0.1 && Math.sin(t * 9) > -0.3 });
  R.actor(EL.biondi, 143, 145, t, { dir: 1, dedo: t > anio && t < anuncio + 0.4, habla: t > anio && t < anuncio && Math.sin(t * 9) > -0.3 });
  const lam = t > anuncio, me = R.actor(EL.mei, 203, 145, t, { dir: -1, sostiene: lam ? [196, 118] : undefined, sonrisa: lam });
  if (lam) { const [mx, my] = me.mano, x0 = mx - 9, y0 = my - 15; R.rect(x0 - 1, y0 - 1, x0 + 13, y0 + 10, K); R.rect(x0, y0, x0 + 12, y0 + 9, AZUL.fondo);
    for (let x = x0; x <= x0 + 12; x += 3) R.linea(x, y0, x, y0 + 9, AZUL.rej); R.linea(x0 + 2, y0 + 4, x0 + 6, y0 + 1, AZUL.lin); R.linea(x0 + 6, y0 + 1, x0 + 10, y0 + 4, AZUL.lin);
    for (const x of [x0 + 4, x0 + 6, x0 + 8]) R.linea(x, y0 + 4, x, y0 + 8, Math.floor(t * 6) % 2 ? AZUL.bri : AZUL.lin); }
  T.italiaDelante(R, t, o);
  // en «experts» suben del público tres manos, cada una con su «?»
  [[34, 0], [118, 0.35], [268, 0.7]].forEach(([x, d], k) => { const u = tramo(t, expertos + d, expertos + d + 0.4); if (u <= 0) return;
    const y = Math.round(lerp(196, 150, u) + Math.sin(t * 3 + k) * 1.5);
    T.brazo(R, x - 6, 206, x, y + 8, ['#5a6a8a', '#8a4a3a', '#4a6a4a'][k], 1, { codo: [x - 8, y + 26] });
    if (u >= 1) { const qy = y - 30; R.rect(x + 4, qy + 17, x + 5, y + 4, hex('#8a6a3a')); R.rect(x - 3, qy - 3, x + 13, qy + 18, K); R.rect(x - 2, qy - 2, x + 12, qy + 17, hex('#f2eee2')); R.icono('?', x, qy, hex('#d83a3a'), hex('#e0d8c8'), 2); } });
};

// ── 2 · F hoy/suelo: la onda entra diez metros ──
const p2 = (t) => {
  const o = { encuadre: 'suelo', radar: tramo(t, satelite, suelo + 0.2) }; T.hoy(R, t, o);
  // el técnico en la superficie mira la onda; en «barely» se encoge de hombros; en «ESA» señala la cota
  R.actor(EL.tecnicoEgipcio, 58, 64, t, { dir: 1, brazos: t > apenas && t < suelo + 0.5, sorpresa: t > suelo && t < suelo + 0.8, dedo: t > esa + 0.3, habla: t > esa + 0.3 && Math.sin(t * 9) > 0 });
  // la señal de un satélite que baja y la cota de 10 m que se enciende con su «10» grande
  if (t > esa) { const a = lin(t, esa, esa + 0.5), sx = 104, sy = 26;
    R.icono('satelite', sx - 3, sy - 3, hex('#e8e8f2'), K); for (let y = sy + 5; y < Math.round(lerp(sy + 5, 63, a)); y += 3) R.pset(sx, y, hex('#9ae8f8'));
    if (a >= 1) { const on = Math.floor(t * 4) % 2 === 0;
      R.rect(12, 64, 13, 86, hex('#ffe070')); R.rect(12, 64, 18, 64, hex('#ffe070')); R.rect(12, 86, 18, 86, hex('#ffe070'));
      for (let x = 20; x < 300; x += 3) R.pset(x, 86, on ? hex('#ffe070') : hex('#c8a040'));
      R.numero('10', 22, 82, { tam: 16 }); } }
};

// ── 3 · B italia/video: Biondi lo admite ──
const p3 = (t) => {
  const o = { encuadre: 'video' }; T.italia(R, t, o);
  // el monitor del escritorio: la gráfica que tiembla y, en «10», el satélite con su «10»
  R.recorte([272, 88, 308, 108]);
  for (let y = 88; y <= 108; y++) R.linea(272, y, 308, y, hex('#10182a'));
  if (t < diez) { for (let x = 272; x < 308; x++) R.pset(x, Math.round(98 + Math.sin(x * 0.6 + t * 8) * 3 * Math.sin(x * 0.13)), hex('#5ae08a')); }
  else { R.icono('satelite', 274, 92, hex('#e8e8f2'), K); for (let y = 99; y < 107; y += 2) R.pset(277, y, hex('#9ae8f8')); R.numero('10', 286, 104, { color: Math.floor(t * 3) % 2 ? hex('#ffe070') : hex('#fff6c0') }); }
  R.recorte(null);
  // Biondi habla a la cámara; en «10» señala el monitor; en «admits» levanta las manos, tranquilo
  R.actor(EL.biondi, 128, 152, t, { dir: 1, habla: (t < admite - 0.1 || t > admite + 0.7) && Math.sin(t * 9) > -0.3, dedo: t > diez - 0.1 && t < diez + 1.4, brazos: t > admite - 0.1 && t < admite + 1.0 });
  // el gato cruza despacio por delante, de la estantería al trípode
  { const u = lin(t, P3 + 0.2, P4), x = Math.round(lerp(20, 186, u)), pa = Math.floor(t * 6) % 2, G = hex('#3a3a46');
    R.rect(x, 152, x + 8, 156, G); R.rect(x + 7, 149, x + 11, 153, G); R.pset(x + 8, 148, G); R.pset(x + 11, 148, G); R.pset(x + 10, 151, hex('#e8d040'));
    R.linea(x, 153, x - 4, 149 + pa, G); for (const i of [1, 7]) R.rect(x + i + pa, 157, x + i + pa, 159, G); }
  T.italiaDelante(R, t, o);
};

// ── 4 · F hoy/orbita/rebote: gag 6 ──
const rebote = (t) => lin(t, w(14.86), w(18.34));
const p4 = (t) => {
  T.hoy(R, t, { encuadre: 'orbita', camara: 'rebote', rebote: rebote(t) });
  if (t > imposible) { const s = Math.min(1, (t - imposible) / 0.15); R.icono('X', 104 - Math.round(s * 2), 128, hex('#e83a3a'), K, 2 + Math.round(s)); }
};

// ── 5 · LOCAL: la mesa de análisis con la gráfica de vibraciones ──
const MAD = rampa('#4a2c18', '#5e3a20', '#744a2a', '#8a5c36', '#a07044');
const PARED = rampa('#2a3040', '#323a4c', '#3a4458', '#465066');
const traza = (x, t, k = 0) => Math.sin(x * 0.31 + t * k) * 3 * Math.sin(x * 0.07 + 1) + Math.sin(x * 0.9 + t * k * 1.7) * 1.4 + (((x + 12) % 37) < 3 ? -5 : 0);
const fijo5 = () => {
  // la pared del laboratorio con paneles y la balda de archivadores
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) { let v = 1.6 + (h(x >> 2, y >> 2, 60) - 0.5) * 0.5 + (y > 100 ? -0.4 : 0); if (x % 64 === 0 || y === 100) v = 0.2; R.pset(x, y, tono(PARED, v, x, y)); }
  R.rect(0, 100, 319, 101, hex('#1e2230'));
  R.rect(0, 30, 46, 33, MAD[1]); R.rect(0, 33, 46, 34, MAD[0]);
  for (let k = 0; k < 7; k++) { const x = 2 + k * 6, c = ['#c84a3a', '#3a7ac8', '#e8c040', '#4a9a5a', '#e8e8f0', '#8a4ac8', '#c8743a'][k]; R.rect(x, 14, x + 4, 29, K); R.rect(x + 1, 15, x + 3, 29, hex(c)); R.rect(x + 1, 19, x + 3, 20, hex('#f2eee2')); }
  // el reloj de pared y una lámina con un sismograma clavada
  R.disco(24, 62, 9, K); R.disco(24, 62, 8, hex('#e8e4d8')); for (let a = 0; a < 12; a++) R.pset(Math.round(24 + Math.cos(a * Math.PI / 6) * 6), Math.round(62 + Math.sin(a * Math.PI / 6) * 6), K);
  R.rect(270, 56, 310, 92, K); R.rect(271, 57, 309, 91, hex('#f2eee2')); for (let x = 273; x < 308; x++) R.pset(x, Math.round(74 + traza(x, 0) * 1.2), hex('#2a2a3a')); R.disco(290, 57, 1, hex('#d83a3a'));
  // el monitor grande con su pie
  R.rect(50, 16, 262, 116, K); R.rect(51, 17, 261, 115, hex('#2a2e3a')); R.rect(150, 116, 162, 124, hex('#3a3e4a')); R.rect(130, 124, 182, 127, hex('#2a2e3a'));
  // la mesa de madera con vetas
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 2.6 + Math.sin(x * 0.08 + Math.sin(y * 0.3) * 2) * 0.5 + (h(x >> 3, y, 61) - 0.5) * 0.5 - (y - 124) * 0.01; R.pset(x, y, tono(MAD, v, x, y)); }
  R.linea(0, 124, 319, 124, MAD[4]);
  // el teclado, la caja del sismómetro, la pirámide de maqueta y los papeles
  R.rect(110, 134, 196, 146, K); R.rect(111, 135, 195, 145, hex('#3a3e4a')); for (let j = 0; j < 3; j++) for (let i = 0; i < 20; i++) R.rect(113 + i * 4, 137 + j * 3, 114 + i * 4, 138 + j * 3, hex('#8a8e9a'));
  R.rect(206, 130, 246, 150, K); R.rect(207, 131, 245, 149, hex('#5a6a5a')); R.rect(207, 131, 245, 133, hex('#7a8a7a')); R.disco(216, 141, 4, K); R.disco(216, 141, 3, hex('#c8c8d2')); R.rect(226, 137, 242, 145, hex('#1a2a1a'));
  for (let y = 124; y >= 108; y--) { const hw = (124 - y) * 0.9; for (let x = Math.round(290 - hw); x <= 290 + hw; x++) R.pset(x, y, x > 290 ? CAL[2] : CAL[4]); }
  for (let y = 108; y <= 124; y += 3) R.linea(Math.round(290 - (124 - y) * 0.9), y, Math.round(290 + (124 - y) * 0.9), y, CAL[1]);
  R.rect(8, 144, 100, 176, K); R.rect(9, 145, 99, 175, hex('#f2eee2')); R.rect(4, 150, 30, 172, hex('#e2ddd0')); R.linea(4, 150, 30, 150, hex('#c8c2b4'));
  for (let x = 12; x < 98; x++) R.pset(x, Math.round(160 + traza(x, 0) * 1.4), hex('#3a3a5a'));
  for (let y = 147; y < 175; y += 4) R.linea(10, y, 98, y, hex('#e0dccc'));
};
const p5 = (t) => {
  capa('diez5', fijo5);
  // la pantalla: a la izquierda la traza real (verde) que corre sobre roca maciza; a la derecha entra la lectura de
  // los pozos en el código del plano azul
  const gx0 = 56, gy0 = 22, gx1 = 256, gy1 = 110, mitad = 156, ent = tramo(t, P5 + 0.05, P5 + 0.8), corte = Math.round(lerp(gx1 + 1, mitad, ent)), vb = lin(t, vibra - 0.2, vibra + 0.8);
  for (let y = gy0; y <= gy1; y++) for (let x = gx0; x <= gx1; x++) {
    let c;
    if (x >= corte) { c = ((x - gx0) % 12 === 0 || (y - gy0) % 12 === 0) ? AZUL.rej : AZUL.fondo; }
    else { c = ((x - gx0) % 10 === 0 || (y - gy0) % 10 === 0) ? hex('#123a24') : hex('#0a1e14');
      if (y > 64 && vb > 0) { const est = Math.floor((y - 64 + Math.sin(x * 0.1) * 2) / 8); if ((y - 64) / 46 < vb) c = tono(ROCA4, 1.4 + (est % 2) * 0.8 + (h(x >> 1, y >> 1, 62) - 0.5) * 0.6, x, y); } }
    R.pset(x, y, c); }
  // la traza: corre de derecha a izquierda; en la mitad azul, cian con brillo
  for (let x = gx0; x <= gx1; x++) { const y = Math.round(48 + traza(x + Math.floor(t * 30), 0)), y2 = Math.round(48 + traza(x + 1 + Math.floor(t * 30), 0));
    const az = x >= corte; R.linea(x, y, x + (x < gx1 ? 1 : 0), y2, az ? AZUL.lin : hex('#5ae08a')); if (az && Math.floor(t * 8 + x * 0.1) % 9 === 0) R.pset(x, y - 1, AZUL.bri); }
  // en «vibrations» los pozos azules se trazan desde la traza hacia abajo, con su rosca
  if (vb > 0) for (const x of [176, 196, 216, 236]) { if (x < corte + 2) continue; const yb = Math.round(lerp(56, 108, vb));
    for (let y = 56; y <= yb; y++) { R.pset(x - 3, y, AZUL.lin); R.pset(x + 3, y, AZUL.lin); if ((y + Math.floor(t * 10)) % 6 === 0) R.linea(x - 3, y, x + 3, y + 2, AZUL.bri); } }
  // el barrido de holograma y el corte entre las dos lecturas
  if (corte <= gx1) { const yb = gy1 - Math.floor((t * 40) % (gy1 - gy0)); R.linea(Math.max(corte, gx0), yb, gx1, yb, AZUL.bri); R.linea(corte - 1, gy0, corte - 1, gy1, hex('#e8e8f2')); }
  // la balanza y el «?» en «interpreted»
  if (t > interpreta - 0.4) { const a = Math.sin((t - interpreta) * 5) * 3; R.rect(mitad - 12, 24, mitad + 12, 40, K); R.rect(mitad - 11, 25, mitad + 11, 39, hex('#2a2e3a'));
    R.linea(mitad, 28, mitad, 37, hex('#e8c040')); R.linea(mitad - 8, Math.round(30 - a), mitad + 8, Math.round(30 + a), hex('#e8c040')); R.rect(mitad - 4, 37, mitad + 4, 38, hex('#e8c040'));
    R.rect(mitad - 10, Math.round(32 - a), mitad - 6, Math.round(33 - a), hex('#5ae08a')); R.rect(mitad + 6, Math.round(32 + a), mitad + 10, Math.round(33 + a), AZUL.lin);
    if (t > interpreta && Math.floor(t * 3) % 2 === 0) R.icono('?', mitad - 4, 84, hex('#ffe070'), K, 2); }
  // el reflejo del cristal
  for (let k = 0; k < 30; k++) R.pset(gx0 + 6 + k, gy0 + 2 + k, hex('#3a4a5a'));
  // las agujas del reloj, el piloto del sismómetro, el vapor de la taza
  { const a = t * Math.PI / 30 - Math.PI / 2, b = t * 0.05; R.linea(24, 62, Math.round(24 + Math.cos(a) * 6), Math.round(62 + Math.sin(a) * 6), hex('#d83a3a')); R.linea(24, 62, Math.round(24 + Math.cos(b) * 4), Math.round(62 + Math.sin(b) * 4), K); }
  if (Math.floor(t * 2) % 2) R.pset(244, 134, hex('#3af06a'));
  for (let x = 227; x < 242; x++) R.pset(x, Math.round(141 + traza(x + Math.floor(t * 20), 0) * 0.6), hex('#5ae08a'));
  R.rect(262, 134, 276, 152, K); R.rect(263, 135, 275, 151, hex('#e8e4d8')); R.rect(276, 139, 279, 146, K); R.rect(264, 136, 274, 138, hex('#5a3a20'));
  for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1; R.pset(Math.round(268 + Math.sin(u * 7 + k) * 2), Math.round(132 - u * 16), hex('#d8dce4')); }
  // la mano repasa la traza impresa y rodea un pico en «vibrations»
  const r0 = lin(t, P5 + 0.3, vibra), cerc = lin(t, vibra, vibra + 0.7);
  let tx = Math.round(lerp(14, 60, r0)), ty = Math.round(160 + traza(tx, 0) * 1.4);
  if (cerc > 0) { const an = cerc * Math.PI * 2; tx = Math.round(61 + Math.cos(an) * 6); ty = Math.round(154 + Math.sin(an) * 4); for (let a = 0; a < cerc * 30; a++) { const b = a / 30 * Math.PI * 2; R.pset(Math.round(61 + Math.cos(b) * 6), Math.round(154 + Math.sin(b) * 4), hex('#d83a3a')); } }
  if (t > vibra + 0.7) { for (let a = 0; a < 30; a++) { const b = a / 30 * Math.PI * 2; R.pset(Math.round(61 + Math.cos(b) * 6), Math.round(154 + Math.sin(b) * 4), hex('#d83a3a')); } tx = 76; ty = 168; }
  T.brazo(R, 6, 206, tx - 12, ty + 8, '#5a6a8a', 1, { codo: [tx - 22, ty + 30] });
  R.linea(tx - 4, ty + 6, tx, ty, hex('#d83a3a')); R.linea(tx - 5, ty + 5, tx - 1, ty - 1, hex('#a82a2a')); R.pset(tx, ty, K);
};
const ROCA4 = rampa('#3a2e24', '#5a4838', '#7a6450', '#9a8068');
const efectos = [[w(1.0), 'flash'], [expertos + 0.1, 'pop'], [anuncio + 0.05, 'papel'], [satelite, 'whoosh'], [suelo, 'bip'], [esa + 0.5, 'brillo'],
  [diez, 'bip'], [w(14.9), 'whoosh'], [roca, 'boing'], [imposible, 'golpecito'], [P5 + 0.1, 'whoosh'], [vibra, 'lapiz'], [interpreta, 'tic']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2025 });
''')
E['gz-expertos'] = ('Los expertos', '''// GZ-EXPERTOS (frase 19), 2025. Cinco planos (Conyers y Parcak, con respeto: explican, no se burlan):
// 1. F hoy/suelo/campo: el campo de pruebas en Estados Unidos; Conyers empuja su georradar por la cuadrícula; en
//    «expert» pita la pantallita; en «Denver» se para y mira la lectura. Un perrito de las praderas asoma. Corta en «called».
// 2. LOCAL la mesa de campo de Conyers: su portátil con un radargrama corto y real; a su lado, la lámina impresa del
//    plano azul; en «huge» la lámina se desenrolla y cae por el borde de la mesa hasta fuera del cuadro; en
//    «exaggeration» su mano señala la lectura corta del portátil; el viento agita la lámina. Corta en «Parcak».
// 3. LOCAL el despacho de Parcak: el muro de pantallas de satélite; en «ruins» se encienden una a una las ruinas
//    enterradas; en «can't see through rock» la pantalla grande enseña la onda que se para en la roca y una «X»; ella
//    señala y niega con la cabeza. El satélite de maqueta gira colgado del techo. Corta en «And».
// 4. LOCAL Giza y el Nilo en corte regional: la meseta con las tres pirámides, el pueblo, el Nilo con una falúa; en
//    «awkward detail» el aldeano saca del pozo un cubo lleno de agua; en «Under Giza» el agua del subsuelo brilla y corre
//    del Nilo hasta debajo de las pirámides; en «few dozen meters» una cota a trazos baja hasta ella. Corta en «down».
// 5. C plano/corte (gag 7): el agua sube y los cubos del plano azul se llenan como una pecera, con burbujas y su pez;
//    en «underwater» la superficie ondula por encima de todo. Sin los italianos en la tarima.''', COMUN + r'''
const w = (s) => en('expertos', (s - 0.5) / 23.139);
const P2 = w(5.0), P3 = w(9.0), P4 = w(14.28), P5 = w(20.0);
const experto = w(2.68), denver = w(4.46), enorme = w(5.76), exagera = w(6.12), arqueo = w(8.12), ruinas = w(10.34), satelites = w(11.02);
const dijo = w(11.88), noVe = w(12.36), roca = w(13.28), otros = w(14.38), detalle = w(15.84), bajoGiza = w(16.84), freatica = w(17.8), pocas = w(19.26);
const pozos = w(21.07), bajoAgua = w(22.93);
const AZUL = { fondo: T.C.planoFondo, rej: T.C.planoRejilla, lin: T.C.planoLinea, bri: T.C.planoBrillo };
const MANGA_C = '#7a8a5a';

// ── 1 · F hoy/suelo/campo: Conyers con su georradar ──
const p1 = (t) => {
  const o = { encuadre: 'suelo', camara: 'campo' }; T.hoy(R, t, o);
  T.halcon(R, t, 150, 40, 18);
  // un perrito de las praderas asoma de su madriguera, mira y se esconde
  { const u = (t * 0.5) % 1, sube = u < 0.15 ? u / 0.15 : u < 0.6 ? 1 : u < 0.7 ? 1 - (u - 0.6) / 0.1 : 0, y = Math.round(166 - sube * 6), x = 206;
    R.rect(x - 4, 166, x + 6, 168, hex('#6a4a2a')); R.rect(x - 3, 166, x + 5, 166, hex('#3a2a1a'));
    if (sube > 0) { R.rect(x, y, x + 3, 166, hex('#b0885a')); R.rect(x, y, x + 3, y + 1, hex('#c8a070')); R.pset(x + 2, y + 1, K); R.pset(x + 3, y + 2, hex('#5a3a2a')); } }
  const u = tramo(t, 0.2, denver), cx = Math.round(lerp(96, 186, u)), cy = 160, anda = u > 0 && u < 1;
  for (let x = 80; x < cx - 4; x++) { R.pset(x - 4, cy, hex('#5a7a3a')); R.pset(x + 11, cy, hex('#5a7a3a')); }
  R.actor(EL.conyers, cx - 33, cy, t, { dir: 1, anda, sostiene: [cx - 15, cy - 21], sonrisa: t > denver + 0.2 });
  T.PIEZAS_GZ.carritoRadar(R, cx, cy + 1, { t: anda ? t : 0 });
  if (t > experto && t < experto + 0.5 && Math.floor(t * 12) % 2 === 0) R.rect(cx - 9, cy - 19, cx - 3, cy - 16, hex('#9af0a0'));
  T.hoyDelante(R, t, o);
};

// ── 2 · LOCAL: la mesa de campo de Conyers ──
const MONTE = rampa('#4a5a7a', '#5a6a8a', '#6a7a9a', '#8a9ab4');
const HIERBA = rampa('#3a5a2a', '#4a6e32', '#5a823a', '#6e9646', '#86aa58');
const MESA = rampa('#8a8e96', '#a2a6ae', '#babec6', '#d2d6dc');
const cieloP2 = (x, y) => y < 60;
const fijo2 = () => {
  pintaCielo(0, 0, 319, 60, 70, () => true);
  // las Rocosas con nieve, el bosque y la valla
  for (let x = 0; x < 320; x++) { const top = Math.round(44 + Math.sin(x * 0.045) * 8 + Math.sin(x * 0.13 + 1) * 4 + (x > 270 ? 6 : 0)); for (let y = top; y < 72; y++) R.pset(x, y, y < top + 4 && top < 44 ? hex('#f2f4f8') : tono(MONTE, 2.4 - (y - top) * 0.04 + (x % 7 === 0 ? -0.6 : 0), x, y)); }
  for (let x = 0; x < 320; x++) { const top = 66 + Math.round(h(x >> 1, 0, 70) * 4); for (let y = top; y < 78; y++) R.pset(x, y, tono(rampa('#1e3a24', '#2a4a2e', '#3a5a3a'), 1 + (h(x, y, 71) - 0.5), x, y)); }
  // la pradera con la cuadrícula de cuerdas, banderitas y la camioneta a lo lejos
  for (let y = 78; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(HIERBA, 2.2 + (y - 78) * 0.012 + (h(x, y >> 1, 72) - 0.5) * 1.1, x, y));
  for (const y of [86, 96]) R.linea(0, y, 319, y + 2, hex('#e8e0d0'));
  R.rect(236, 74, 300, 92, K); R.rect(237, 75, 299, 91, hex('#a83a2a')); R.rect(244, 76, 262, 84, hex('#8ab0d0')); R.rect(237, 85, 299, 86, hex('#7a2a1a')); R.disco(250, 92, 4, K); R.disco(288, 92, 4, K); R.disco(250, 92, 1, hex('#8a8a96')); R.disco(288, 92, 1, hex('#8a8a96'));
  // la mesa plegable: el tablero gris con su canto, las patas
  for (let y = 120; y < 150; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(MESA, 2.2 + (y - 120) * 0.03 + (h(x >> 2, y >> 2, 73) - 0.5) * 0.4, x, y));
  R.rect(0, 150, 319, 155, K); R.rect(0, 150, 319, 151, MESA[3]); R.rect(0, 152, 319, 154, MESA[0]);
  for (const x of [20, 296]) { R.rect(x, 155, x + 4, 180, K); R.rect(x + 1, 155, x + 3, 180, MESA[1]); }
  // el portátil de Conyers (el teclado; la pantalla va en cada fotograma)
  R.rect(28, 124, 132, 146, K); R.rect(29, 125, 131, 145, hex('#3a3e46')); for (let j = 0; j < 4; j++) for (let i = 0; i < 22; i++) R.rect(33 + i * 4 + j, 127 + j * 4, 34 + i * 4 + j, 128 + j * 4, hex('#7a7e88')); R.rect(66, 140, 92, 144, hex('#5a5e66'));
  R.rect(32, 56, 128, 124, K); R.rect(33, 57, 127, 123, hex('#2a2e36'));
  // el termo, el sombrero de repuesto, la libreta y la antena del GPS
  R.rect(140, 104, 150, 140, K); R.rect(141, 105, 149, 139, hex('#3a7a5a')); R.rect(141, 105, 149, 109, hex('#c8c8d2')); R.rect(141, 120, 149, 122, hex('#2a5a3a'));
  R.rect(268, 132, 312, 140, K); R.rect(270, 133, 310, 139, hex('#8a6a4a')); R.rect(278, 122, 302, 133, K); R.rect(279, 123, 301, 132, hex('#9a7a58')); R.rect(279, 128, 301, 129, hex('#5a3a2a'));
  R.rect(264, 142, 300, 149, K); R.rect(265, 143, 299, 148, hex('#e8d890')); R.linea(268, 145, 296, 145, hex('#b8a860'));
};
const p2 = (t) => {
  capa('exp2', fijo2);
  nubes(t, 0, 0, 319, 48, cieloP2, { nubes: [[0.2, 0.5, 18, 3], [0.6, 0.7, 24, 5]], aves: 2 });
  // la hierba que se mece delante de la mesa
  for (let k = 0; k < 40; k++) { const x = k * 8 + 3, a = Math.round(Math.sin(t * 2 + k) * 1.5); R.linea(x, 180, x + a, 172, HIERBA[k % 2 ? 3 : 1]); R.linea(x + 2, 180, x + 2 + a, 175, HIERBA[2]); }
  // la pantalla del portátil: su radargrama real, corto (las capas grises y una hipérbola cerca de la superficie)
  for (let y = 59; y <= 121; y++) for (let x = 35; x <= 125; x++) { const d = y - 59; let v = (d < 22 ? 2 : 1.2 - (d - 22) * 0.02) + Math.sin(d * 0.9 + Math.sin(x * 0.07) * 1.5) * (d < 22 ? 1.2 : 0.2) + (h(x, y, 74 + (Math.floor(t * 8) & 1)) - 0.5) * (d < 22 ? 0.4 : 0.7);
    if (d < 22) { const hy = 14 + Math.abs(x - 80) * Math.abs(x - 80) * 0.02; if (Math.abs(d - hy) < 1) v = 3.6; }
    R.pset(x, y, tono(rampa('#1a1a1e', '#4a4a52', '#8a8a92', '#c8c8ce', '#f2f2f6'), v, x, y)); }
  for (let y = 59; y <= 121; y += 10) R.rect(35, y, 37, y, hex('#ffe070'));
  { const yc = 59 + Math.floor((t * 14) % 22); R.linea(38, yc, 125, yc, hex('#5ae08a')); }
  // en «exaggeration» el tramo que sí se lee se recuadra en amarillo
  if (t > exagera) { const on = Math.floor(t * 4) % 2 === 0 || t > exagera + 1.2; if (on) { R.linea(36, 58, 126, 58, hex('#ffe070')); R.linea(36, 81, 126, 81, hex('#ffe070')); R.linea(36, 58, 36, 81, hex('#ffe070')); R.linea(126, 58, 126, 81, hex('#ffe070')); } }
  // la lámina del plano azul (lo que dicen los italianos): sobre la mesa y, en «huge», se desenrolla por el borde
  const largo = Math.round(lerp(0, 60, tramo(t, enorme - 0.2, enorme + 0.9))), ola = t > arqueo ? Math.sin(t * 9) * 2 : 0;
  const lx0 = 166, lx1 = 248;
  for (let y = 124; y <= 148 + largo; y++) { const dx = y > 150 ? Math.round(ola * (y - 150) / 30) : 0;
    for (let x = lx0 + dx; x <= lx1 + dx; x++) { const yy = y; if (yy > 179) continue; R.pset(x, yy, ((x - lx0 - dx) % 8 === 0 || (y - 124) % 8 === 0) ? AZUL.rej : AZUL.fondo); }
    R.pset(lx0 + dx - 1, y, K); R.pset(lx1 + dx + 1, y, K);
    // los pozos que bajan y bajan por la lámina
    for (const px of [184, 200, 216, 232]) { R.pset(px + dx, y, AZUL.lin); if ((y + px) % 6 === 0) R.pset(px + dx + 1, y, AZUL.bri); } }
  R.poligono([[196, 128], [207, 124], [218, 128]], AZUL.fondo); R.linea(196, 128, 207, 124, AZUL.lin); R.linea(207, 124, 218, 128, AZUL.lin); R.linea(176, 129, 240, 129, AZUL.lin);
  if (largo < 56) { const ry = 148 + largo; R.rect(lx0 - 2, ry, lx1 + 2, ry + 5, K); R.rect(lx0 - 1, ry + 1, lx1 + 1, ry + 4, AZUL.rej); R.linea(lx0 - 1, ry + 1, lx1 + 1, ry + 1, AZUL.lin); }
  { const yb = 124 + Math.floor((t * 30) % (24 + largo)); if (yb < 180) R.linea(lx0, yb, lx1, yb, AZUL.bri); }
  // la mano de Conyers: en «exaggeration» señala el radargrama corto del portátil
  const sen = tramo(t, exagera - 0.1, exagera + 0.4) - tramo(t, arqueo + 0.2, arqueo + 0.6);
  const hx = Math.round(lerp(132, 112, sen)), hy = Math.round(lerp(162, 128, sen));
  T.brazo(R, 150, 214, hx + 12, hy + 6, MANGA_C, -1, { codo: [hx + 30, hy + 30] });
};

// ── 3 · LOCAL: el despacho de Parcak ──
const PAR = rampa('#8a8274', '#9c9484', '#aea696', '#c0b8a8', '#d2cab8');
const PANT = [[100, 30, 154, 66], [160, 30, 214, 66], [220, 30, 270, 66], [100, 72, 154, 108], [160, 72, 214, 108], [220, 72, 270, 108]];
const fijo3 = () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(PAR, 2.6 + (h(x >> 2, y >> 2, 80) - 0.5) * 0.5 - (y < 14 ? 1 : 0), x, y));
  R.rect(0, 14, 319, 15, PAR[0]);
  // el suelo de tarima y el zócalo
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(MAD5, 2 + Math.sin(x * 0.4 + Math.floor(y / 5) * 2) * 0.3 + ((x + Math.floor(y / 5) * 23) % 40 === 0 ? -1.5 : 0) + (y % 5 === 0 ? -1 : 0), x, y));
  R.rect(0, 146, 319, 149, hex('#5a4a3a')); R.linea(0, 146, 319, 146, hex('#7a6a58'));
  // la alfombra de lana bajo sus pies y la silla de oficina
  for (let y = 156; y < 172; y++) for (let x = 36; x < 120; x++) { const b = y === 156 || y === 171 || x === 36 || x === 119, r = ((x >> 2) + (y >> 2)) % 3; R.pset(x, y, b ? hex('#5a2a24') : r === 0 ? hex('#a84a36') : r === 1 ? hex('#c8743a') : hex('#3a5a7a')); if (!b && (x - 36) % 12 === 6 && (y - 156) % 8 === 4) R.pset(x, y, hex('#e8d8a8')); }
  for (const x of [36, 119]) for (let y = 157; y < 171; y += 2) R.pset(x + (x < 60 ? -1 : 1), y, hex('#e8d8a8'));
  R.rect(212, 138, 236, 142, K); R.rect(213, 139, 235, 141, hex('#3a3e4a')); R.rect(230, 120, 236, 140, K); R.rect(231, 121, 235, 139, hex('#4a4e5a'));
  R.rect(223, 142, 225, 156, hex('#5a5e66')); R.linea(214, 158, 234, 158, hex('#5a5e66')); for (const x of [214, 224, 234]) R.disco(x, 159, 1, K);
  // el mapa del mundo en la pared con chinchetas de yacimientos
  R.rect(8, 26, 88, 74, K); R.rect(9, 27, 87, 73, hex('#9ac0d8'));
  for (const [cx, cy, rx, ry] of [[24, 40, 10, 8], [22, 58, 5, 10], [46, 38, 8, 6], [52, 54, 7, 11], [70, 42, 12, 8], [78, 62, 5, 4]]) for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 < 1 - h(cx + i, cy + j, 81) * 0.25) R.pset(cx + i, cy + j, tono(rampa('#5a8a4a', '#8aa860', '#c8b078'), 1 + (cy + j > 50 ? 0.7 : 0), cx + i, cy + j));
  for (const [x, y] of [[50, 50], [56, 46], [44, 34], [74, 44]]) { R.disco(x, y, 1, hex('#d83a3a')); R.pset(x, y - 1, hex('#ff9a8a')); }
  // la estantería baja con libros, cajas y una planta
  R.rect(4, 96, 64, 146, K); R.rect(5, 97, 63, 145, hex('#6a4a30'));
  for (const y of [112, 128]) R.rect(5, y, 63, y + 1, hex('#4a3020'));
  for (let k = 0; k < 18; k++) { const x = 7 + (k % 9) * 6, y = k < 9 ? 98 : 114, c = ['#c84a3a', '#3a6aa8', '#e8c040', '#4a8a5a', '#e8e4d8', '#7a4aa8', '#c8743a', '#3a3a46', '#a8a07a'][(k * 4) % 9]; R.rect(x, y + 2 + (k % 3), x + 4, y + 13, hex(c)); R.rect(x, y + 5, x + 4, y + 5, hex('#f2eee2')); }
  R.rect(8, 132, 30, 144, hex('#c8b890')); R.rect(36, 132, 60, 144, hex('#a8987a')); R.linea(8, 138, 30, 138, hex('#8a7a5a'));
  // la mesa de trabajo delante del muro de pantallas
  R.rect(110, 126, 300, 132, K); R.rect(111, 127, 299, 131, hex('#d0d4da')); R.linea(111, 127, 299, 127, hex('#f2f4f6'));
  for (const x of [118, 290]) R.rect(x, 132, x + 3, 160, hex('#5a5e66'));
  R.rect(176, 118, 230, 126, K); R.rect(177, 119, 229, 125, hex('#3a3e46')); for (let i = 0; i < 12; i++) R.rect(179 + i * 4, 121, 180 + i * 4, 123, hex('#8a8e98'));
  R.disco(268, 116, 8, K); R.disco(268, 116, 7, hex('#3a7ac8')); R.poligono([[264, 112], [270, 110], [272, 116], [266, 119]], hex('#5aa85a')); R.rect(267, 124, 269, 126, hex('#8a6a3a'));
  R.rect(136, 116, 146, 126, K); R.rect(137, 117, 145, 125, hex('#e8e4d8')); R.rect(146, 119, 148, 123, K);
  // el muro de pantallas (marcos)
  for (const [x0, y0, x1, y1] of PANT) { R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, K); R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, hex('#2a2e36')); }
};
const MAD5 = rampa('#5a3a22', '#704a2c', '#865a36', '#9c6c42');
const satImg = (x0, y0, x1, y1, t, k, rev) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let v = 2.4 + Math.sin(x * 0.12 + k + Math.sin(y * 0.1 + k) * 2) * 0.6 + (h(x >> 1, y >> 1, 82 + k) - 0.5) * 0.9;
    if (k === 1 && Math.abs(x - (x0 + 20 + Math.sin(y * 0.15) * 6)) < 3) v = -1;   // el Nilo
    R.pset(x, y, v < 0 ? (Math.abs(x - (x0 + 20 + Math.sin(y * 0.15) * 6)) < 1.5 ? hex('#2a5a8a') : hex('#3a7a3a')) : tono(rampa('#8a6a40', '#a88454', '#c49c66', '#dab47a', '#ecca94'), v, x, y)); }
  // las ruinas enterradas: el contorno de muros que se enciende en amarillo
  if (rev > 0) { const cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1, c = rev >= 1 && Math.floor(t * 3 + k) % 3 === 0 ? hex('#fff6a0') : hex('#ffd040');
    const muros = [[cx - 14, cy - 8, cx + 10, cy - 8], [cx - 14, cy - 8, cx - 14, cy + 9], [cx - 14, cy + 9, cx + 10, cy + 9], [cx + 10, cy - 8, cx + 10, cy + 9], [cx - 4, cy - 8, cx - 4, cy + 9], [cx - 14, cy, cx - 4, cy], [cx + 2, cy + 2, cx + 18, cy + 2]];
    muros.slice(0, Math.ceil(rev * muros.length)).forEach(([a, b, c2, d]) => R.linea(a + k, b, c2 + k, d, c)); }
};
const p3 = (t) => {
  capa('exp3', fijo3);
  // las cinco pantallas de satélite y la grande del corte
  PANT.slice(0, 5).forEach(([x0, y0, x1, y1], k) => { satImg(x0, y0, x1, y1, t, k, k === 1 ? 0 : tramo(t, ruinas + [0, 0, 0.3, 0.6, 0.9][k] - 0.3, ruinas + [0, 0, 0.3, 0.6, 0.9][k] + 0.3));
    const ys = y0 + Math.floor((t * 12 + k * 7) % (y1 - y0)); R.linea(x0, ys, x1, ys, hex('#f2f2f6')); });
  // la pantalla de abajo a la derecha: la onda del radar baja y se para en la roca; en «rock», la «X»
  { const [x0, y0, x1, y1] = PANT[5]; R.recorte([x0, y0, x1, y1]);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y < y0 + 10 ? hex('#7ab0e0') : y < y0 + 16 ? tono(ARE, 4 + (h(x, y, 83) - 0.5), x, y) : tono(rampa('#5a4a3a', '#7a6650', '#9a8468'), 1.2 + ((y - y0) % 6 === 0 ? -1 : 0) + (h(x >> 1, y, 84) - 0.5), x, y));
    if (t > dijo - 0.6) { const u = lin(t, dijo - 0.6, noVe + 0.4); for (let k = 0; k < 3; k++) { const yy = Math.round(y0 + 2 + ((u * 16 + k * 5) % 16)); R.linea(x0 + 14 + k * 2, yy, x1 - 14 - k * 2, yy, hex('#5ae0f0')); } }
    if (t > roca) R.icono('X', ((x0 + x1) >> 1) - 5, y0 + 18, hex('#e83a3a'), K, 2);
    R.recorte(null); }
  // el satélite de maqueta que gira colgado del techo
  { const a = Math.sin(t * 0.8), cx = 196, cy = 22; R.linea(cx, 15, cx, cy - 2, hex('#3a3a46')); const wv = Math.round(10 * Math.abs(a)) + 2;
    R.rect(cx - 2, cy - 2, cx + 2, cy + 2, hex('#e8c040')); R.rect(cx - 2 - wv, cy - 1, cx - 3, cy + 1, hex('#3a5aa8')); R.rect(cx + 3, cy - 1, cx + 2 + wv, cy + 1, hex('#3a5aa8')); R.pset(cx, cy - 3, hex('#e83a3a')); }
  // el vapor de la taza
  for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; R.pset(Math.round(141 + Math.sin(u * 7 + k) * 2), Math.round(113 - u * 12), hex('#f2f2f6')); }
  // Parcak: presenta las pantallas («hunts for ruins with satellites»), luego niega con la cabeza y señala la «X»
  const niega = t > noVe && t < roca - 0.1, dirP = niega ? (Math.floor((t - noVe) * 2.6) % 2 ? -1 : 1) : 1;
  R.actor(EL.parcak, 72, 162, t, { dir: dirP, habla: ((t > P3 + 0.3 && t < satelites + 0.5) || (t > dijo && t < roca + 0.4)) && Math.sin(t * 9) > -0.3, dedo: (t > ruinas - 0.3 && t < satelites + 0.4) || t > roca, sonrisa: t > ruinas + 0.3 && t < satelites + 0.6 });
};

// ── 4 · LOCAL: Giza y el Nilo en corte regional ──
const MESETA = 58, VALLE = 80, FREAT = 104;
const sueloSup = (x) => x < 166 ? MESETA : x < 214 ? Math.round(lerp(MESETA, VALLE, (x - 166) / 48)) : VALLE;
const CALIZA = rampa('#7a6448', '#94795a', '#ae926e', '#c6aa84', '#dcc29c');
const LIMO = rampa('#3a2a1e', '#4a3826', '#5e4630', '#72583a');
const AGUA_S = rampa('#1e3a5a', '#2a4e74', '#3a6690', '#4e80aa');
const cieloP4 = (x, y) => y < sueloSup(x) && !(x > 250 && x < 300 && y >= VALLE - 1);
const piramideP = (ax, ay, by, pend) => { for (let y = ay; y <= by; y++) { const hw = (y - ay) * pend; for (let x = Math.round(ax - hw); x <= ax + hw; x++) R.pset(x, y, x > ax + (y - ay) * 0.15 ? CAL[2] : tono(CAL, 4.6 + ((y - ay) % 2 ? -0.6 : 0), x, y)); } };
const fijo4 = () => {
  pintaCielo(0, 0, 319, VALLE, VALLE, () => true);
  piramideP(34, 38, MESETA, 1.0); piramideP(88, 26, MESETA, 1.0); piramideP(136, 44, MESETA, 1.0);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const s = sueloSup(x); if (y < s) continue;
    let c; const d = y - s;
    if (x >= 214 && y < 98 + Math.round(Math.sin(x * 0.1) * 2)) c = tono(LIMO, 2 + (h(x >> 1, y >> 1, 90) - 0.5) - d * 0.03, x, y);
    else { const est = Math.floor((y + Math.sin(x * 0.03) * 3) / 7); c = tono(CALIZA, 3.2 - est * 0.06 + (est % 2) * 0.5 + (h(x >> 2, est, 91) - 0.5) * 0.8, x, y); if ((y + Math.round(Math.sin(x * 0.03) * 3)) % 7 === 0) c = CALIZA[1]; }
    if (d < 2) c = x < 166 ? ARE[5] : hex('#6a8a3a');
    R.pset(x, y, c); }
  // el cauce del Nilo
  for (let y = VALLE; y < 96; y++) for (let x = 250; x < 300; x++) { const b = Math.abs(x - 275) < 25 - (y - VALLE) * 1.5; if (b) R.pset(x, y, tono(AGUA_S, 2.6 - (y - VALLE) * 0.12, x, y)); }
  // el pueblo: casas de adobe con azotea y palmeras
  for (const [x, w, hh] of [[184, 12, 10], [198, 10, 8], [236, 12, 9]]) { const b = sueloSup(x + w) ; R.rect(x, b - hh, x + w, b, hex('#b88a5a')); R.rect(x, b - hh, x + w, b - hh, hex('#d8aa7a')); R.rect(x + 3, b - hh + 3, x + 5, b - hh + 5, K); R.rect(x + w - 4, b - 5, x + w - 2, b, hex('#5a3a2a')); }
  // el pozo del pueblo: el brocal y el hueco que baja en corte hasta el agua
  for (let y = VALLE; y < FREAT + 6; y++) { R.rect(224, y, 230, y, hex('#1a1612')); R.pset(223, y, CALIZA[0]); R.pset(231, y, CALIZA[0]); }
  R.rect(221, VALLE - 4, 233, VALLE - 1, hex('#a88a6a')); R.linea(221, VALLE - 4, 233, VALLE - 4, hex('#c8aa8a'));
  // fósiles y grietas en la caliza
  for (let k = 0; k < 26; k++) { const x = Math.floor(h(k, 1, 92) * 210), y = 66 + Math.floor(h(k, 2, 92) * 110); if (y < sueloSup(x) + 4) continue; R.pset(x, y, CALIZA[4]); R.pset(x + 1, y, CALIZA[0]); R.pset(x, y + 1, CALIZA[0]); }
  R.linea(60, 70, 66, 96, CALIZA[0]); R.linea(66, 96, 62, 120, CALIZA[0]); R.linea(150, 90, 146, 130, CALIZA[0]);
};
const p4 = (t) => {
  capa('exp4', fijo4);
  nubes(t, 0, 0, 319, 50, cieloP4, { nubes: [[0.25, 0.4, 18, 3], [0.65, 0.65, 22, 5], [0.9, 0.3, 12, 7]], aves: 3 });
  // el agua del subsuelo: la capa empapada bajo la meseta y el valle; en «Under Giza» corre un brillo del Nilo hacia
  // las pirámides y en «groundwater» late
  const corre = lin(t, bajoGiza, freatica + 0.4), late = t > freatica ? 0.5 + 0.5 * Math.sin((t - freatica) * 5) : 0;
  // (la roca empapada: los mismos estratos, teñidos de azul, más oscuros hacia abajo; el techo del agua, una raya clara)
  const fx = corre > 0 && corre < 1 ? lerp(300, 0, corre) : -99;
  for (let y = FREAT - 2; y < 180; y++) for (let x = 0; x < 320; x++) { const borde = FREAT + Math.round(Math.sin(x * 0.05 + t * 0.6) * 1.2);
    if (y < borde) continue; const est = Math.floor((y + Math.sin(x * 0.03) * 3) / 7), br = Math.abs(x - fx) < 18 ? 1.2 : 0;
    let c = tono(AGUA_S, 2.2 - (y - FREAT) * 0.018 + (est % 2) * 0.4 + br + late * 0.4 + (h(x >> 2, est, 94) - 0.5) * 0.6, x, y);
    if ((y + Math.round(Math.sin(x * 0.03) * 3)) % 7 === 0) c = AGUA_S[0];
    if (y === borde || y === borde + 1) c = br || late > 0.6 ? hex('#c8f0ff') : hex('#7ab8e8');
    R.pset(x, y, c); }
  for (let k = 0; k < 14; k++) { const x = Math.floor(h(k, 7, 95) * 320), y = FREAT + 6 + Math.floor(((t * 4 + h(k, 8, 95) * 70) % 70)); R.pset(x, 180 - (y - FREAT), hex('#9ad8ff')); }
  // la falúa en el Nilo con su vela
  { const x = Math.round(256 + ((t * 3) % 34)), y = VALLE - 1; R.rect(x, y - 1, x + 10, y, hex('#6a4a2a')); R.linea(x + 5, y - 2, x + 5, y - 14, K); R.poligono([[x + 6, y - 14], [x + 13, y - 3], [x + 6, y - 3]], hex('#f2eee2')); R.linea(x + 6, y - 14, x + 13, y - 3, hex('#c8c2b4')); }
  // las palmeras que se mecen
  for (const [x, s] of [[178, 0], [212, 1], [246, 2], [304, 1]]) { const b = sueloSup(x), a = Math.round(Math.sin(t * 1.5 + s) * 1.5); R.linea(x, b, x + a, b - 16, hex('#6a4a2a')); R.linea(x + 1, b, x + 1 + a, b - 16, hex('#8a6a3a'));
    for (const [dx, dy] of [[-7, 3], [7, 3], [-5, -2], [5, -2], [0, -4]]) R.linea(x + a, b - 16, x + a + dx + Math.round(Math.sin(t * 2 + dx) * 0.6), b - 16 + dy, hex('#3a7a3a')); }
  // un camello cruza la meseta
  { const x = Math.round(150 - ((t * 5) % 170)), y = MESETA - 1; R.rect(x, y - 7, x + 8, y - 4, hex('#a07440')); R.rect(x - 1, y - 10, x, y - 6, hex('#a07440')); R.pset(x - 2, y - 10, hex('#a07440')); R.rect(x + 3, y - 9, x + 5, y - 8, hex('#a07440')); for (const i of [1, 7]) R.linea(x + i, y - 3, x + i + (Math.sin(t * 6 + i) > 0 ? 1 : 0), y, hex('#7a5430')); }
  // el aldeano saca agua del pozo: la cuerda baja, en «awkward detail» el cubo toca el agua y sube lleno
  const baja = tramo(t, P4 + 0.2, detalle - 0.1), sube = tramo(t, detalle + 0.4, bajoGiza + 0.8), cy = Math.round(lerp(VALLE - 8, FREAT + 2, baja) - (FREAT + 10 - VALLE) * sube);
  R.linea(227, VALLE - 10, 227, cy, hex('#c8a870'));
  R.rect(225, cy, 229, cy + 4, K); R.rect(226, cy + 1, 228, cy + 3, sube > 0 || t > detalle ? hex('#4e80aa') : hex('#8a8a96'));
  if (sube > 0) for (let k = 0; k < 2; k++) { const yy = cy + 5 + ((Math.floor(t * 12) + k * 3) % 6); R.pset(227, yy, hex('#9ad8ff')); }
  if (t > detalle - 0.1 && t < detalle + 0.6) for (let k = 0; k < 6; k++) { const s = (t - detalle + 0.1) / 0.7; R.pset(Math.round(227 + (k - 2.5) * 2 * s * 3), Math.round(FREAT + 1 - 6 * s + 8 * s * s), hex('#9ad8ff')); }
  R.rect(218, VALLE - 12, 236, VALLE - 11, hex('#6a4a2a')); R.rect(218, VALLE - 12, 219, VALLE - 1, hex('#6a4a2a')); R.rect(235, VALLE - 12, 236, VALLE - 1, hex('#6a4a2a'));
  R.actor(EL.camellero, 200, VALLE, t, { dir: 1, sostiene: [221, VALLE - 9 + Math.round(Math.sin(t * 6) * (baja > 0 && baja < 1 || sube > 0 && sube < 1 ? 1.5 : 0))], sorpresa: t > detalle && t < detalle + 0.8, sonrisa: t > bajoGiza + 0.9 });
  // en «a few dozen meters» la cota a trazos baja de la meseta hasta el agua
  const cota = lin(t, pocas - 0.5, pocas + 0.3);
  if (cota > 0) { const y1 = Math.round(lerp(MESETA + 2, FREAT, cota)); for (let y = MESETA + 2; y <= y1; y++) if ((y >> 1) % 2 === 0) R.rect(110, y, 111, y, hex('#fff2c0'));
    R.rect(106, MESETA + 1, 115, MESETA + 1, hex('#fff2c0')); if (cota >= 1) { R.rect(106, FREAT, 115, FREAT, hex('#fff2c0')); R.icono('gota', 117, FREAT - 9, hex('#9ad8ff'), K); } }
};

// ── 5 · C plano/corte: gag 7, los cubos se llenan como una pecera ──
const p5 = (t) => {
  const o = { encuadre: 'corte', agua: tramo(t, P5 + 0.1, bajoAgua) }; T.plano(R, t, o);
  // las burbujas de los cubos que suben más deprisa al llenarse
  if (o.agua > 0.1) for (const cx of [124, 196]) for (let k = 0; k < 4; k++) { const u = (t * 0.9 + k / 4 + cx) % 1, y = Math.round(152 - u * 16); if (y > 136) { R.pset(cx + Math.round(Math.sin(u * 9 + k) * 3), y, T.C.planoBrillo); } }
  // la lupa del holograma sobre el cubo de la derecha: el cubo de alambre se llena como una pecera, con su pez
  const ab = tramo(t, P5 + 0.2, P5 + 0.7), nivel = lin(t, P5 + 0.6, bajoAgua), lx = 262, ly = 102, rr = Math.round(34 * ab);
  if (rr > 2) {
    for (let k = 0; k <= 12; k++) { const u = k / 12; if (u <= ab) R.pset(Math.round(lerp(204, lx - 24, u)), Math.round(lerp(140, ly + 24, u)), AZUL.lin); }
    for (let y = -rr; y <= rr; y++) for (let x = -rr; x <= rr; x++) { const d = Math.hypot(x, y); if (d > rr) continue; const X = lx + x, Y = ly + y;
      R.pset(X, Y, d > rr - 1.5 ? AZUL.bri : d > rr - 3 ? AZUL.lin : ((X % 8 === 0 || Y % 8 === 0) ? AZUL.rej : AZUL.fondo)); }
    if (ab >= 1) {
      const c0 = [246, 92], c1 = [272, 118], dp = 8;   // el cubo en perspectiva: cara delantera y trasera desplazada
      const agua = Math.round(lerp(c1[1], c0[1] + 1, nivel));
      for (let y = agua; y <= c1[1]; y++) for (let x = c0[0]; x <= c1[0] + dp; x++) { const enC = (x <= c1[0] && y >= c0[1]) || (x > c1[0] && y >= c0[1] - (x - c1[0]) && y <= c1[1] - (x - c1[0])); if (enC && (x + y) % 2 === 0) R.pset(x, y, hex('#2a6ab8')); }
      if (nivel > 0 && nivel < 1) for (let x = c0[0]; x <= c1[0]; x++) R.pset(x, agua + Math.round(Math.sin(x * 0.5 + t * 6)), AZUL.bri);
      for (const [a, b, c, d] of [[c0[0], c0[1], c1[0], c0[1]], [c0[0], c1[1], c1[0], c1[1]], [c0[0], c0[1], c0[0], c1[1]], [c1[0], c0[1], c1[0], c1[1]],
        [c0[0], c0[1], c0[0] + dp, c0[1] - dp], [c1[0], c0[1], c1[0] + dp, c0[1] - dp], [c1[0], c1[1], c1[0] + dp, c1[1] - dp], [c0[0] + dp, c0[1] - dp, c1[0] + dp, c0[1] - dp], [c1[0] + dp, c0[1] - dp, c1[0] + dp, c1[1] - dp]])
        R.linea(a, b, c, d, AZUL.lin);
      // el pez nada de lado a lado cuando hay agua, y las burbujas suben
      if (nivel > 0.35) { const fx = Math.round(259 + Math.sin(t * 1.6) * 8), fy = Math.round(Math.max(agua + 4, 108) + Math.sin(t * 3) * 2), d = Math.cos(t * 1.6) > 0 ? 1 : -1;
        R.poligono([[fx - 4 * d, fy], [fx, fy - 2], [fx + 3 * d, fy], [fx, fy + 2]], hex('#ffb040')); R.poligono([[fx - 4 * d, fy], [fx - 7 * d, fy - 2], [fx - 7 * d, fy + 2]], hex('#ff8a20')); R.pset(fx + 1 * d, fy - 1, K); }
      for (let k = 0; k < 4; k++) { const u = (t * 0.8 + k / 4) % 1, y = Math.round(c1[1] - 2 - u * (c1[1] - agua - 2)); if (y > agua + 1) R.pset(250 + k * 6 + Math.round(Math.sin(u * 8) * 1.5), y, AZUL.bri); }
      if (nivel >= 1 && Math.floor(t * 3) % 2 === 0) R.icono('!', lx + 22, ly - 34, AZUL.bri, K, 2);
    }
  }
  T.planoDelante(R, t, o);
};
const efectos = [[w(0.4), 'carro'], [experto, 'bip'], [enorme, 'papel'], [exagera + 0.2, 'golpecito'], [ruinas, 'brillo'], [roca, 'golpecito'],
  [detalle, 'chof'], [freatica, 'burbujas'], [pocas, 'lapiz'], [P5 + 0.4, 'burbujas'], [bajoAgua, 'ola']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2025 });
''')
