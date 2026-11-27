# Borrador de escenas del ep33 (Dune), grupo S7: du-dibujos, du-alien y du-scott. Formato del 11: E[id] = (título,
# comentario de cabecera, cuerpo). COMUN son las utilidades que comparten los insertos pintados por la escena.
COMUN = r'''
const K = T.C.k, PZ = T.PIEZAS_DU;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const CAPAS = {};
// un fondo fijo se pinta una vez en su búfer y luego se copia
const capa = (k, f) => { if (!CAPAS[k]) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); CAPAS[k] = b; } R.copiar(CAPAS[k]); };
const ease = (u) => u * u * (3 - 2 * u), sale = (u) => 1 - (1 - u) * (1 - u);
const velo = (x, y, c, a) => R.pset(x, y, mez(R.pget(x, y), c, a));
// una caja con contorno, luz arriba y sombra abajo
const caja = (x0, y0, x1, y1, c, l, s) => { R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); if (l != null) R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, l); if (s != null) R.rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, s); };
// madera con vetas, nudos y juntas (k: semilla)
const madera = (x0, y0, x1, y1, c, v, l, k = 0, junta = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const w = y + Math.round(Math.sin(x * 0.045 + (y >> 3) * 1.7 + k) * 1.6), r = hh(x >> 4, w, 900 + k);
  R.pset(x, y, junta && (y - y0) % junta === 0 ? v : r < 0.2 && (x + w * 5) % 23 < 15 ? v : r > 0.9 && (x + w * 3) % 19 < 9 ? l : c); } };
// la barra del año y la esquina de Atom, tranquilas: un tono con un moteado muy suave
const calma = (c, c2 = c) => { for (const [x0, y0, x1, y1, col] of [[18, 0, 172, 21, c], [274, 0, 319, 48, c2]]) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, hh(x >> 1, y >> 1, 990) < 0.08 ? mez(col, K, 0.07) : col); };
// un destello de cuatro puntas
const destello = (x, y, r, c) => { for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } if (r > 1) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y + 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); } };
// la lámina que sostiene un dibujante: color (Moebius) u oscura (Giger)
const hoja = (x, y, osc) => { R.rect(x - 6, y - 14, x + 6, y, K); R.rect(x - 5, y - 13, x + 5, y - 1, osc ? hex('#c8ccd4') : hex('#f4ecd8')); if (osc) { R.rect(x - 4, y - 6, x + 4, y - 2, hex('#2a2e3a')); R.poligono([[x - 3, y - 6], [x - 1, y - 11], [x + 1, y - 6]], hex('#2a2e3a')); R.poligono([[x + 1, y - 6], [x + 3, y - 10], [x + 4, y - 6]], hex('#3a3e4e')); R.pset(x, y - 4, hex('#c8ccd4')); } else { R.rect(x - 4, y - 12, x + 4, y - 2, hex('#bfe0f0')); R.poligono([[x, y - 11], [x + 2, y - 7], [x + 2, y - 3], [x - 2, y - 3], [x - 2, y - 7]], hex('#d83a3a')); R.pset(x, y - 7, hex('#f4ecd8')); R.pset(x - 3, y - 3, hex('#e8a030')); R.pset(x + 3, y - 3, hex('#e8a030')); } };
'''

E = {}

E['du-scott'] = ('De mano en mano', '''// DU-SCOTT (frase 23), 1976–1981. Tres planos:
// 1. la oficina de Hollywood: el productor francés trae el contrato, que cruza el escritorio hasta Dino De Laurentiis
//    (lo sella encantado); entra Ridley Scott con su claqueta, trabaja unos meses (hablan, da la claqueta) y se da la vuelta;
// 2. inserto (fondo local): una habitación de noche ante un ventanal con lluvia y neones de símbolos; la mano de Scott
//    mete la gorra en la maleta, la tapa se cierra y la maleta se va; en la cama se quedan el contrato y la claqueta;
// 3. inserto (fondo local): un escritorio visto desde arriba, 1981: una mano empuja el contrato, que cruza la mesa hasta
//    la mano de un director joven (manga blanca), que lo firma; luego le llega la claqueta y da la claqueta.''', COMUN + r'''
const s = (f) => en('scott', f);
const P2 = s(0.435), P3 = s(0.73);
const O = { encuadre: 'plato', camara: 'oficina', lugar: 'hollywood' };
const p1 = (t) => {
  T.cine(R, t, O);
  const llega = tramo(t, 0.15, s(0.03)), pasa = tramo(t, s(0.03), s(0.1)), sella = s(0.19), vuelve = tramo(t, s(0.14), s(0.33));
  const sc = tramo(t, s(0.22), s(0.3)), seva = tramo(t, s(0.405), P2 + 0.5), clac = s(0.345);
  // De Laurentiis, detrás de su escritorio
  R.actor(EL.deLaurentiis, 150, 147, t, { dir: pasa < 1 || sc === 0 ? -1 : 1, sonrisa: pasa > 0.5, brazos: pasa >= 1 && t < sella, dedo: t >= sella && t < sella + 0.5, habla: sc >= 1 && seva === 0 && Math.sin(t * 9) > 0.3 && t > clac + 0.3 });
  T.cineDelante(R, t, O);
  // el contrato: en la mano del francés, luego cruza el tablero y se queda delante de De Laurentiis
  const fx = Math.round(vuelve > 0 ? lerp(74, -20, vuelve) : lerp(-18, 74, sale(llega)));
  const fr = R.actor(EL.productorFrances, fx, 158, t, { dir: vuelve > 0 ? -1 : 1, anda: (llega > 0 && llega < 1) || (vuelve > 0 && vuelve < 1), sostiene: pasa === 0, dedo: pasa > 0 && pasa < 1, sonrisa: pasa > 0 });
  if (pasa === 0) PZ.contrato(R, fr.mano[0] + 4, fr.mano[1] + 6, {});
  else { const e = sale(pasa), cx = Math.round(lerp(96, 178, e)), cy = Math.round(lerp(140, 147, e) - Math.sin(e * Math.PI) * 14); PZ.contrato(R, cx, cy, {});
    if (t >= sella && t < sella + 0.5) { R.disco(182, 141, 4, hex('#c8343a')); R.disco(182, 141, 2, hex('#e86a5a')); destello(182, 141, 6, hex('#fff4c8')); }
    if (t >= sella) { R.disco(182, 142, 2, hex('#c8343a')); R.pset(181, 141, hex('#f08a7a')); } }
  // Scott entra por la derecha con la claqueta, da la claqueta y se vuelve para irse
  if (sc > 0) { const x = Math.round(seva > 0 ? lerp(232, 300, seva) : lerp(324, 232, sale(sc)));
    const a = R.actor(EL.scottDU, x, 158, t, { dir: seva > 0 ? 1 : -1, anda: (sc < 1) || seva > 0, sostiene: true, habla: sc >= 1 && seva === 0 && Math.sin(t * 9) < -0.2 });
    PZ.claqueta(R, a.mano[0] + (seva > 0 ? 6 : -6), a.mano[1] + 8, { abierta: sc >= 1 && t < clac, dir: seva > 0 ? 1 : -1 });
    if (t >= clac && t < clac + 0.35) destello(a.mano[0] - 6, a.mano[1] - 14, 4, hex('#fff4c8')); }
};

// ── plano 2: la maleta ante el ventanal con lluvia y neones ──
const NEON = [[52, 44, 0, '#ff5aa8'], [86, 66, 1, '#4ae8f0'], [140, 42, 2, '#ffd84a'], [176, 62, 3, '#6af07a']];
const habitacion = () => {
  const { rect, pset, linea, disco } = R, pa = hex('#2c2748'), paS = hex('#231f3c'), paL = hex('#3a3462');
  // la pared empapelada: listas, rombos y una greca bajo el techo
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const lista = x % 16 < 8, rx = (x + 4) % 16 - 8, ry = (y + (((x + 4) >> 4) % 2) * 8) % 16 - 8; pset(x, y, Math.abs(rx) + Math.abs(ry) === 3 ? paL : Math.abs(rx) + Math.abs(ry) < 2 && !lista ? paL : lista ? pa : paS); }
  // el ventanal: marco de madera oscura, alféizar y el cielo de la ciudad
  rect(26, 20, 216, 119, K); rect(27, 21, 215, 118, hex('#4a3040')); rect(27, 21, 215, 21, hex('#6a4a58')); rect(34, 27, 208, 113, K);
  for (let y = 28; y <= 112; y++) for (let x = 35; x <= 207; x++) { const f = (y - 28) / 84 + (hh(x, y, 3) - 0.5) * 0.22; pset(x, y, f < 0.3 ? hex('#15122e') : f < 0.58 ? hex('#211a44') : f < 0.82 ? hex('#3a2256') : hex('#5c2c5e')); }
  // tres términos de edificios con ventanas encendidas, depósitos y antenas
  for (let x = 35; x <= 207; x++) { const top = 58 + Math.round(hh((x + 3) / 9 | 0, 1, 7) * 26); for (let y = top; y <= 112; y++) pset(x, y, hex('#2a2150')); if ((x % 9) === 4 && hh(x, 2, 7) < 0.4) for (let y = top - 5; y < top; y++) pset(x, y, hex('#2a2150')); }
  for (let x = 36; x <= 206; x += 3) for (let y = 62; y <= 110; y += 4) { const top = 58 + Math.round(hh((x + 3) / 9 | 0, 1, 7) * 26); if (y > top + 2 && hh(x, y, 8) < 0.3) pset(x, y, hh(x, y, 9) < 0.5 ? hex('#e8b858') : hex('#7ad0e0')); }
  for (let x = 35; x <= 207; x++) { const b = (x + 11) / 21 | 0, top = 80 + Math.round(hh(b, 4, 7) * 18); for (let y = top; y <= 112; y++) pset(x, y, hex('#151230')); if (hh(b, 5, 7) < 0.5 && (x + 11) % 21 > 6 && (x + 11) % 21 < 13) for (let y = top - 6; y < top; y++) pset(x, y, (x + 11) % 21 === 7 || (x + 11) % 21 === 12 || y === top - 6 ? hex('#0e0c22') : hex('#1c1838')); }
  for (let x = 37; x <= 205; x += 4) for (let y = 84; y <= 110; y += 5) { const b = (x + 11) / 21 | 0, top = 80 + Math.round(hh(b, 4, 7) * 18); if (y > top + 2 && hh(x, y, 10) < 0.36) { pset(x, y, hex('#f0c868')); pset(x + 1, y, hex('#c89840')); } }
  // las cortinas recogidas, con pliegues y alzapaños
  for (const [x0, d] of [[14, 1], [228, -1]]) for (let y = 18; y <= 132; y++) { const w = y < 84 ? 20 - Math.round((y - 18) / 7) : 11 + Math.round((y - 84) / 6); for (let i = 0; i <= w; i++) { const x = x0 + d * i, f = (i + (y >> 4)) % 5; pset(x, y, i === w ? K : f === 0 ? hex('#3a1626') : f === 2 ? hex('#8a3450') : hex('#62243c')); } if (y === 84 || y === 85) for (let i = 0; i <= 12; i++) pset(x0 + d * i, y, hex('#c8a040')); }
  rect(22, 119, 220, 124, K); rect(23, 120, 219, 122, hex('#6a4a58')); rect(23, 120, 219, 120, hex('#8a6878')); rect(23, 123, 219, 123, hex('#3a2434'));
  // el aplique de la pared (bajo la esquina de Atom) y su charco de luz
  for (let y = 48; y < 116; y++) for (let x = 236; x < 300; x++) { const d = Math.hypot(x - 262, (y - 70) * 0.8); if (d < 30 && hh(x, y, 11) > d / 30) pset(x, y, mez(R.pget(x, y), hex('#f0b860'), 0.3)); }
  rect(258, 74, 266, 77, K); rect(259, 75, 265, 76, hex('#a88430')); rect(261, 77, 263, 82, hex('#a88430')); R.poligono([[255, 73], [269, 73], [266, 60], [258, 60]], K); R.poligono([[256, 72], [268, 72], [265, 61], [259, 61]], hex('#f4d890')); rect(259, 62, 264, 64, hex('#fff4c8'));
  // un cuadro pequeño (formas abstractas) a la derecha
  caja(284, 70, 310, 100, hex('#3a2a4a'), hex('#c8a040'), hex('#8a6a20')); rect(287, 73, 307, 97, hex('#e8dcc0')); disco(293, 82, 4, hex('#d8703a')); rect(298, 86, 305, 95, hex('#3a6a8a')); linea(288, 96, 306, 76, hex('#2a2a3a'));
  // la cama: la colcha de cuadros, el embozo y el frente con su fleco
  for (let y = 138; y < 180; y++) for (let x = 0; x < 320; x++) { const sup = y < 152, cx = (x + (sup ? (y - 138) : 0)) % 24, cy = y % 14; let c = sup ? hex('#7a5868') : hex('#5c3e52'); if (cx < 3) c = sup ? hex('#9a7484') : hex('#74506a'); else if (cy < 2 && !sup) c = hex('#74506a'); else if (cx > 11 && cx < 14) c = sup ? hex('#684a5c') : hex('#4a3044'); if (hh(x, y, 12) < 0.06) c = mez(c, K, 0.25); pset(x, y, c); }
  rect(0, 137, 319, 137, K); rect(0, 138, 319, 138, hex('#b08a98')); rect(0, 152, 319, 152, hex('#3a2434')); for (let x = 0; x < 320; x += 3) { pset(x, 176, hex('#c8a040')); pset(x, 177, hex('#c8a040')); pset(x + 1, 178, hex('#8a6a20')); }
  // la almohada y una manta doblada a la izquierda
  R.poligono([[2, 150], [4, 126], [44, 122], [52, 150]], K); R.poligono([[4, 149], [6, 127], [43, 124], [50, 149]], hex('#e8e0ee')); for (let y = 128; y < 149; y += 4) linea(8, y + 2, 46, y, hex('#b8b0cc')); linea(6, 148, 49, 148, hex('#8a84a8'));
  calma(hex('#2a2544'));
};
const neon = (x, y, tipo, c, on) => {
  const { linea, pset } = R, col = on ? hex(c) : mez(hex(c), hex('#151230'), 0.72), b = mez(hex(c), hex('#151230'), 0.55);
  for (let i = 0; i <= 20; i++) { pset(x + i, y, b); pset(x + i, y + 20, b); pset(x, y + i, b); pset(x + 20, y + i, b); } for (let j = 1; j < 20; j++) for (let i = 1; i < 20; i++) pset(x + i, y + j, hex('#0e0c22'));
  const cx = x + 10, cy = y + 10;
  if (tipo === 0) { linea(cx, cy - 6, cx - 6, cy + 5, col); linea(cx, cy - 6, cx + 6, cy + 5, col); linea(cx - 6, cy + 5, cx + 6, cy + 5, col); linea(cx, cy - 5, cx - 5, cy + 4, col); linea(cx, cy - 5, cx + 5, cy + 4, col); }
  else if (tipo === 1) { for (let a = 0; a < 40; a++) { const an = a / 40 * 6.283; pset(Math.round(cx + Math.cos(an) * 6), Math.round(cy + Math.sin(an) * 6), col); pset(Math.round(cx + Math.cos(an) * 5), Math.round(cy + Math.sin(an) * 5), col); } pset(cx, cy, col); pset(cx + 1, cy, col); }
  else if (tipo === 2) { for (let d = 0; d < 2; d++) { linea(cx + d, cy - 7, cx + d, cy + 6, col); linea(cx - 5, cy + 1 + d, cx, cy + 6 + d, col); linea(cx + 5 + d, cy + 1, cx + d, cy + 6, col); } }
  else for (let k = 0; k < 4; k++) for (let j = 0; j < 3 + k * 3; j++) { pset(x + 4 + k * 4, y + 16 - j, col); pset(x + 5 + k * 4, y + 16 - j, col); }
  if (on) for (let k = 0; k < 26; k++) { const an = k / 26 * 6.283, r = 13 + (k % 3) * 2; velo(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r), hex(c), 0.35); }
};
const gorra = (x, y) => { R.rect(x - 8, y - 9, x + 6, y, K); R.rect(x - 7, y - 8, x + 5, y - 1, hex('#3a62b0')); R.rect(x - 6, y - 8, x + 2, y - 7, hex('#6a94dc')); R.rect(x - 7, y - 2, x + 5, y - 1, hex('#284886')); R.rect(x + 5, y - 3, x + 13, y, K); R.rect(x + 6, y - 2, x + 12, y - 1, hex('#284886')); R.pset(x - 1, y - 9, hex('#6a94dc')); };
// la maleta de cuero: ab 1 abierta (la tapa levantada, con la ropa dentro) → 0 cerrada
const maleta = (x0, yb, ab, t, flash) => {
  const { rect, pset } = R, cu = hex('#96602e'), cuL = hex('#b87e42'), cuS = hex('#6e4220'), la = hex('#e0b040'), W = 104;
  if (ab > 0.06) { const H = Math.round(40 * ab);   // la tapa levantada, con su forro de cuadros y la cinta
    rect(x0 + 2, yb - 19 - H, x0 + W - 2, yb - 17, K); rect(x0 + 3, yb - 18 - H, x0 + W - 3, yb - 18, cuS);
    for (let y = yb - 16 - H; y <= yb - 19; y++) for (let x = x0 + 6; x <= x0 + W - 6; x++) pset(x, y, (x - x0) % 10 < 2 || (yb - y) % 9 < 2 ? hex('#c8b490') : hex('#e8dcc0'));
    if (H > 14) { rect(x0 + 6, yb - 24 - (H >> 1), x0 + W - 6, yb - 23 - (H >> 1), hex('#8a3a3a')); rect(x0 + 44, yb - 27 - (H >> 1), x0 + 58, yb - 20 - (H >> 1), hex('#3a3a4a')); rect(x0 + 45, yb - 26 - (H >> 1), x0 + 57, yb - 21 - (H >> 1), hex('#c8ccd8')); }
    // la ropa doblada que asoma: la cazadora verde oliva, camisas y una lata de película
    rect(x0 + 6, yb - 24, x0 + 38, yb - 17, K); rect(x0 + 7, yb - 23, x0 + 37, yb - 18, hex('#6a7a3a')); rect(x0 + 7, yb - 23, x0 + 37, yb - 23, hex('#8a9a52')); rect(x0 + 20, yb - 22, x0 + 21, yb - 18, hex('#4a5a26'));
    rect(x0 + 40, yb - 22, x0 + 64, yb - 17, K); rect(x0 + 41, yb - 21, x0 + 63, yb - 18, hex('#e8e4d8')); rect(x0 + 41, yb - 19, x0 + 63, yb - 19, hex('#b8b4a8'));
    rect(x0 + 66, yb - 21, x0 + 78, yb - 17, K); rect(x0 + 67, yb - 20, x0 + 77, yb - 18, hex('#9aa0b0')); rect(x0 + 67, yb - 20, x0 + 77, yb - 20, hex('#d8dce8')); }
  rect(x0, yb - 17, x0 + W, yb, K); rect(x0 + 1, yb - 16, x0 + W - 1, yb - 1, cu); rect(x0 + 1, yb - 16, x0 + W - 1, yb - 15, cuL); rect(x0 + 1, yb - 3, x0 + W - 1, yb - 1, cuS);
  if (ab <= 0.06) { rect(x0, yb - 31, x0 + W, yb - 17, K); rect(x0 + 1, yb - 30, x0 + W - 1, yb - 18, cu); rect(x0 + 1, yb - 30, x0 + W - 1, yb - 29, cuL); rect(x0 + 1, yb - 18, x0 + W - 1, yb - 17, cuS);
    for (const lx of [x0 + 24, x0 + 76]) { rect(lx, yb - 20, lx + 7, yb - 14, K); rect(lx + 1, yb - 19, lx + 6, yb - 15, flash ? hex('#fff4c8') : la); pset(lx + 3, yb - 17, K); pset(lx + 4, yb - 17, K); }
    // las pegatinas de viaje (formas, sin letras)
    R.disco(x0 + 46, yb - 24, 4, hex('#d83a3a')); R.disco(x0 + 46, yb - 24, 2, hex('#f4ecd8')); rect(x0 + 86, yb - 28, x0 + 98, yb - 21, hex('#f4ecd8')); rect(x0 + 87, yb - 27, x0 + 97, yb - 25, hex('#3a8ac8')); rect(x0 + 87, yb - 24, x0 + 97, yb - 22, hex('#e8a030')); }
  for (let y = yb - 16; y < yb; y++) for (let x = x0 + 1; x < x0 + W; x++) if (hh(x >> 1, y, 21) < 0.07) pset(x, y, cuS);
  for (const sx of [x0 + 12, x0 + 88]) { rect(sx, yb - (ab <= 0.06 ? 30 : 16), sx + 5, yb - 1, hex('#4a2a14')); rect(sx + 1, yb - (ab <= 0.06 ? 30 : 16), sx + 1, yb - 1, hex('#7a4a24')); pset(sx + 3, yb - 9, la); }
  for (const [ax, ay] of [[x0 + 1, yb - 4], [x0 + W - 4, yb - 4]]) { rect(ax, ay, ax + 3, ay + 3, la); pset(ax + 1, ay + 1, hex('#fff0a0')); }
  rect(x0 + 22, yb - 9, x0 + 30, yb - 4, hex('#f4ecd8')); rect(x0 + 23, yb - 8, x0 + 29, yb - 7, hex('#d83a3a')); R.disco(x0 + 60, yb - 8, 4, hex('#2a6a5a')); R.pset(x0 + 60, yb - 8, hex('#f4ecd8')); R.pset(x0 + 59, yb - 9, hex('#f4ecd8'));
  // el asa, en el costado derecho
  rect(x0 + W + 1, yb - 14, x0 + W + 7, yb - 4, K); rect(x0 + W + 1, yb - 12, x0 + W + 4, yb - 6, cu); rect(x0 + W + 5, yb - 13, x0 + W + 6, yb - 5, hex('#4a2a14')); R.rect(x0 + W + 1, yb - 11, x0 + W + 3, yb - 7, R.pget(x0 + W + 9, yb - 9));
};
const p2 = (t) => {
  const { pset, linea } = R;
  capa('hab', habitacion);
  // por el ventanal: un tren elevado de ventanillas, el haz de un foco, los neones, la lluvia y las gotas del cristal
  R.recorte([35, 28, 207, 112]);
  { const a = 0.5 + Math.sin(t * 0.5) * 0.35; for (let r = 4; r < 70; r += 1) for (let w = -r * 0.07; w <= r * 0.07; w += 0.7) { const x = Math.round(120 + Math.cos(-1.57 + a) * r + w), y = Math.round(112 - r - Math.abs(w) * 0.2); if ((x + y) % 2 === 0) velo(x, y, hex('#b0a8e8'), 0.16); } }
  { const u = (t * 0.16) % 1; for (let i = 0; i < 9; i++) { const x = Math.round(20 + u * 230 - i * 5); pset(x, 78, hex('#f0d890')); pset(x + 1, 78, hex('#f0d890')); pset(x, 77, hex('#3a3464')); pset(x + 2, 78, hex('#3a3464')); } for (let x = 35; x <= 207; x += 1) if (R.pget(x, 79) !== hex('#151230')) pset(x, 79, hex('#0e0c22')); }
  NEON.forEach(([x, y, k, c], i) => neon(x, y, k, c, i === 1 ? Math.sin(t * 11) > -0.75 && Math.floor(t * 0.9) % 5 !== 4 : Math.floor(t * (1.1 + i * 0.37) + i) % (3 + i) !== 0));
  for (let k = 0; k < 90; k++) { const v = 150 + hh(k, 1, 30) * 90, x = Math.round(30 + ((hh(k, 2, 30) * 200 + t * 26) % 190)), y = Math.round(22 + ((hh(k, 3, 30) * 96 + t * v) % 96)); const c = hex(k % 3 ? '#8a94d0' : '#c8d0f4'); velo(x, y, c, 0.5); velo(x - 1, y + 2, c, 0.5); velo(x - 1, y + 3, c, 0.35); if (k % 4 === 0) velo(x - 2, y + 5, c, 0.3); }
  for (let k = 0; k < 14; k++) { const x = 40 + Math.round(hh(k, 4, 30) * 164), u = (hh(k, 5, 30) + t * (0.08 + hh(k, 6, 30) * 0.16)) % 1, y = 30 + Math.round(u * u * 80); pset(x, y, hex('#e8ecff')); pset(x, y - 1, hex('#a8b0e0')); velo(x, y - 2, hex('#a8b0e0'), 0.5); velo(x + (k % 2), y - 4, hex('#a8b0e0'), 0.3); }
  for (let i = 0; i < 30; i++) { velo(60 + i, 34 + i * 2, hex('#ffffff'), 0.1); velo(66 + i, 34 + i * 2, hex('#ffffff'), 0.07); velo(150 + i, 30 + i * 2, hex('#ffffff'), 0.08); }
  R.recorte(null);
  // los parteluces, el reflejo de los neones en el alféizar y la luz del aplique que tiembla
  R.rect(120, 28, 122, 112, K); R.rect(121, 28, 121, 112, hex('#5a3a4a')); R.rect(35, 68, 207, 69, K); for (let x = 35; x <= 207; x++) if (x < 120 || x > 122) pset(x, 68, hex('#5a3a4a'));
  NEON.forEach(([x, , , c], i) => { if (Math.floor(t * (1.1 + i * 0.37) + i) % (3 + i) !== 0) for (let j = 0; j < 14; j++) velo(x + 3 + j, 121, hex(c), 0.55 - Math.abs(j - 7) * 0.05); });
  if (Math.sin(t * 23) > 0.86) { pset(261, 66, hex('#ffffff')); pset(262, 67, hex('#ffffff')); }
  // lo que se queda en la cama: el contrato y la claqueta del encargo
  PZ.contrato(R, 84, 150, { s: 2 }); PZ.claqueta(R, 132, 152, { s: 2 });
  const mete = tramo(t, P2 + 0.1, s(0.475)), cierra = tramo(t, s(0.49), s(0.545)), coge = tramo(t, s(0.56), s(0.6)), va = ease(tramo(t, s(0.61), P3 - 0.15));
  const x0 = 180 + Math.round(va * 170), yb = 150 - Math.round(Math.sin(Math.min(1, va * 4) * Math.PI / 2) * 3);
  maleta(x0, yb, 1 - ease(cierra), t, cierra >= 1 && t < s(0.545) + 0.3);
  if (mete < 1) gorra(Math.round(lerp(304, 268, sale(mete))), Math.round(lerp(96, 128, mete * mete)));
  if (cierra >= 1 && t < s(0.545) + 0.3) { destello(x0 + 28, yb - 17, 4, hex('#fff4c8')); destello(x0 + 80, yb - 17, 4, hex('#fff4c8')); }
  // la mano de Scott (manga verde oliva) entra por la derecha: deja la gorra, baja la tapa y tira del asa
  let wx, wy;
  if (mete < 1) { wx = lerp(318, 284, sale(mete)); wy = lerp(92, 120, mete * mete); }
  else if (cierra < 1) { const H = 40 * (1 - ease(cierra)); wx = 292; wy = lerp(120, 150 - 22 - H, Math.min(1, cierra * 3)); if (cierra > 0.33) wy = 150 - 22 - H; }
  else if (coge < 1) { wx = lerp(292, x0 + 116, ease(coge)); wy = lerp(128, yb - 9, ease(coge)); }
  else { wx = x0 + 116; wy = yb - 9; }
  if (wx < 326) T.brazo(R, 330, wy - 16 + (coge >= 1 ? 6 : 0), Math.round(wx), Math.round(wy), '#6a7a3a', -1, { codo: [Math.min(336, Math.round(wx) + 22), Math.round(wy) - 4 + (mete < 1 ? -8 : 2)] });
  // cuando la maleta se va, los neones alumbran lo que se queda
  if (va > 0.45 && Math.floor(t * 5) % 2) { for (const [a, b, c, d] of [[66, 106, 102, 153], [106, 110, 158, 156]]) { for (let x = a; x <= c; x += 2) { pset(x, b, hex('#ffd84a')); pset(x, d, hex('#ffd84a')); } for (let y = b; y <= d; y += 2) { pset(a, y, hex('#ffd84a')); pset(c, y, hex('#ffd84a')); } } }
};

// ── plano 3: el escritorio desde arriba, 1981 ──
const escritorio = () => {
  const { rect, pset, linea, disco } = R;
  madera(0, 0, 319, 179, hex('#7c4a2a'), hex('#5e3620'), hex('#96603a'), 3, 60);
  // el vade de cuero verde con su filete de oro y sus cantoneras
  rect(62, 26, 274, 176, K); for (let y = 27; y <= 175; y++) for (let x = 63; x <= 273; x++) pset(x, y, hh(x >> 1, y >> 1, 40) < 0.12 ? hex('#245240') : hh(x, y, 41) < 0.05 ? hex('#3a7a60') : hex('#2c6450'));
  for (const d of [4, 6]) { for (let x = 63 + d; x <= 273 - d; x++) { pset(x, 27 + d, d === 4 ? hex('#c8a040') : hex('#1c4634')); pset(x, 175 - d, d === 4 ? hex('#c8a040') : hex('#1c4634')); } for (let y = 27 + d; y <= 175 - d; y++) { pset(63 + d, y, d === 4 ? hex('#c8a040') : hex('#1c4634')); pset(273 - d, y, d === 4 ? hex('#c8a040') : hex('#1c4634')); } }
  for (const [cx, cy, sx, sy] of [[63, 27, 1, 1], [273, 27, -1, 1], [63, 175, 1, -1], [273, 175, -1, -1]]) for (let i = 0; i < 14; i++) for (let j = 0; j < 14 - i; j++) pset(cx + sx * i, cy + sy * j, i + j === 13 ? K : (i + j) % 4 === 0 ? hex('#a87a30') : hex('#6a3c20'));
  // la luz de la lámpara: un charco cálido arriba a la izquierda
  for (let y = 22; y < 150; y++) for (let x = 40; x < 230; x++) { const d = Math.hypot((x - 120) / 1.5, y - 74); if (d < 62 && hh(x, y, 42) > d / 62 + 0.1) pset(x, y, mez(R.pget(x, y), hex('#ffe8a0'), 0.22)); }
  // el teléfono de teclas, con su auricular y el cable rizado
  caja(6, 30, 52, 92, hex('#d8ceb4'), hex('#f0e8d4'), hex('#a89c80')); caja(9, 33, 22, 89, hex('#c0b498'), hex('#e8dec4'), hex('#8a7e64')); rect(8, 32, 23, 40, K); rect(9, 33, 22, 39, hex('#b0a488')); rect(8, 82, 23, 90, K); rect(9, 83, 22, 89, hex('#b0a488'));
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { rect(27 + j * 8, 44 + i * 10, 32 + j * 8, 50 + i * 10, K); rect(28 + j * 8, 45 + i * 10, 31 + j * 8, 49 + i * 10, hex('#f4f0e4')); pset(29 + j * 8, 47 + i * 10, hex('#8a7e64')); }
  rect(27, 34, 48, 40, K); rect(28, 35, 47, 39, hex('#2a3a2a'));
  for (let i = 0; i < 22; i++) { const x = 14 + Math.round(Math.sin(i * 0.9) * 3 + i * 0.25), y = 93 + i; pset(x, y, K); pset(x + 1, y, hex('#b0a488')); }
  // el taco de calendario (la cifra la pone la escena), el bote de lápices y un clip
  caja(8, 140, 54, 178, hex('#f4ecd8'), hex('#ffffff'), hex('#c8bea4')); rect(9, 141, 53, 149, hex('#c8343a')); rect(9, 141, 53, 141, hex('#e86a5a')); for (const x of [18, 44]) { rect(x, 138, x + 2, 144, K); pset(x + 1, 139, hex('#c8ccd8')); } for (let i = 0; i < 7; i++) for (let j = 0; j < 2; j++) pset(13 + i * 6, 169 + j * 4, hex('#b0a488'));
  // la lata de película y el plato del café, a la derecha (bajo la esquina de Atom, madera tranquila)
  disco(296, 88, 21, K); disco(296, 88, 20, hex('#9aa0b0')); disco(296, 88, 17, hex('#c8ccd8')); disco(296, 88, 15, hex('#aab0c0')); for (let a = 0; a < 60; a++) { const an = a / 60 * 6.283; pset(Math.round(296 + Math.cos(an) * 18), Math.round(88 + Math.sin(an) * 18), hex('#70768a')); }
  disco(296, 150, 15, K); disco(296, 150, 14, hex('#f4ecd8')); disco(296, 150, 11, hex('#d8ceb4')); disco(296, 150, 9, K); disco(296, 150, 8, hex('#f8f4ec')); disco(296, 150, 6, hex('#5a3418')); rect(304, 149, 312, 151, K); rect(304, 150, 311, 150, hex('#f8f4ec'));
  // sobre el vade: una tira de película, la hoja del guion gráfico (dunas y lunas NUESTRAS), un sobre, un lápiz y clips
  for (let i = 0; i <= 96; i++) { const x = 84 + i, y = 40 + Math.round(i * 0.2 + Math.sin(i * 0.07) * 3); rect(x, y, x, y + 8, hex('#1e1e28')); if (i % 4 < 2) { pset(x, y + 1, hex('#d8d4c8')); pset(x, y + 7, hex('#d8d4c8')); } if (i % 12 > 1) for (let j = 3; j <= 5; j++) pset(x, y + j, hex(['#f4c078', '#e09848', '#b06a2c'][j - 3])); }
  rect(79, 105, 141, 169, hex('#1c4634')); caja(76, 102, 138, 166, hex('#f4ecd8'), hex('#ffffff'), hex('#c8bea4'));
  for (let k = 0; k < 6; k++) { const x = 80 + (k % 2) * 28, y = 106 + (k >> 1) * 20; rect(x, y, x + 25, y + 16, K); for (let j = 1; j < 16; j++) for (let i = 1; i < 25; i++) { const du = 9 + Math.round(Math.sin(i * 0.3 + k * 2) * 2); pset(x + i, y + j, j > du + 3 ? hex('#b06a2c') : j > du ? hex('#e09848') : k % 3 === 2 ? hex('#2a2a5a') : hex('#f4c078')); } disco(x + 6 + k * 2, y + 5, 2, hex('#fff4d0')); if (k % 2) pset(x + 18, y + 4, hex('#f0e0c0')); }
  rect(151, 123, 199, 153, hex('#1c4634')); caja(148, 120, 196, 150, hex('#e8dcc0'), hex('#f8f0dc'), hex('#b8ac90')); linea(149, 121, 172, 136, hex('#b8ac90')); linea(195, 121, 172, 136, hex('#b8ac90')); rect(184, 124, 191, 132, hex('#c8343a')); rect(185, 125, 190, 131, hex('#f4ecd8')); disco(187.5, 128, 2, hex('#3a6a8a'));
  linea(150, 162, 182, 158, K); linea(150, 161, 182, 157, hex('#e8c040')); linea(150, 160, 182, 156, K); pset(184, 157, hex('#e8d0a0')); pset(185, 157, K);
  for (const [x, y] of [[214, 150], [226, 158], [100, 84]]) { linea(x, y, x + 5, y + 2, hex('#c8ccd8')); linea(x + 5, y + 2, x + 1, y + 4, hex('#c8ccd8')); linea(x + 1, y + 4, x + 7, y + 6, hex('#8a90a4')); }
  for (let k = 0; k < 30; k++) { const an = k / 30 * 6.283; pset(Math.round(232 + Math.cos(an) * 9), Math.round(140 + Math.sin(an) * 8), hex('#245240')); }
  calma(hex('#7c4a2a'));
};
const p3 = (t) => {
  const { rect, pset, linea, disco } = R;
  capa('mesa', escritorio);
  // la cifra del taco, la bobina que gira en la lata abierta y el vapor del café
  R.numero('1981', 31, 163, { centro: true, color: hex('#1c2450'), sombra: false });
  { const g = t * (t > s(1) + 1 ? 5 : 1.6); for (let b = 0; b < 3; b++) { const an = g + b * 2.094; for (let r = 5; r < 14; r++) for (const w of [-0.16, 0, 0.16]) pset(Math.round(296 + Math.cos(an + w) * r), Math.round(88 + Math.sin(an + w) * r), hex('#3a3e4e')); } disco(296, 88, 3, K); pset(296, 88, hex('#e0b040')); }
  for (let k = 0; k < 5; k++) { const u = (t * 0.4 + k / 5) % 1, x = 296 + Math.round(Math.sin(t * 1.4 + k * 2 + u * 5) * 3), y = 148 - Math.round(u * 18); if (u < 0.9) { velo(x, y, hex('#fff8e8'), 0.6 - u * 0.5); velo(x + 1, y, hex('#fff8e8'), 0.3 - u * 0.2); } }
  // los tiempos: el contrato llega en la mano izquierda, cruza y lo para la mano de Lynch; firma; luego la claqueta
  const entra = tramo(t, P3, s(0.77)), cruza = tramo(t, s(0.77), s(0.835)), firma = tramo(t, s(0.89), s(0.99)), cl1 = tramo(t, s(0.99) + 0.1, s(1) + 0.7), cl2 = tramo(t, s(1) + 0.7, s(1) + 1.2), clac = s(1) + 1.45;
  const cxC = Math.round(cruza > 0 ? lerp(96, 250, sale(cruza)) : lerp(30, 96, sale(entra))), cyC = Math.round(cruza > 0 ? lerp(132, 96, sale(cruza)) : 132);
  // la sombra del contrato y el contrato
  for (let y = cyC - 56; y <= cyC + 3; y++) for (let x = cxC - 20; x <= cxC + 26; x++) if ((x + y) % 2 === 0) velo(x, y, K, 0.3);
  PZ.contrato(R, cxC, cyC, { s: 3 });
  if (firma > 0) { const n = Math.round(firma * 22); for (let i = 0; i < n; i++) { const x = cxC - 16 + i, y = cyC - 9 + Math.round(Math.sin(i * 1.1) * 2.4 - i * 0.08); pset(x, y, hex('#1c2450')); pset(x, y + 1, hex('#1c2450')); } }
  // la claqueta: la empuja la mano izquierda, cruza y se queda bajo el contrato; al final, la mano de Lynch la cierra
  const cxK = Math.round(cl2 > 0 ? lerp(104, 246, sale(cl2)) : lerp(-40, 104, sale(cl1))), cyK = 172;
  if (cl1 > 0) { for (let y = cyK - 50; y <= cyK + 3; y++) for (let x = cxK - 30; x <= cxK + 37; x++) if ((x + y) % 2 === 0) velo(x, y, K, 0.3); PZ.claqueta(R, cxK, cyK, { s: 3, abierta: t < clac }); }
  if (t >= clac && t < clac + 0.5) for (const [dx, dy, r] of [[-30, -66, 5], [8, -72, 4], [40, -62, 5], [-8, -78, 3]]) destello(cxK + dx, cyK + dy - Math.round((t - clac) * 14), r, hex('#fff4c8'));
  // la mano izquierda (traje azul gris de De Laurentiis): empuja el contrato y se retira; vuelve con la claqueta
  { let wx, y = 112;
    if (cl1 > 0) { wx = cl2 > 0 ? lerp(59, -30, tramo(t, s(1) + 0.7, s(1) + 1.1)) : Math.min(59, cxK - 45); y = 124; }
    else wx = cruza > 0 ? lerp(62, -30, tramo(t, s(0.77), s(0.83))) : cxC - 34;
    wx = Math.round(wx); if (wx > -26) T.brazo(R, wx - 42, y + 22, wx, y, '#5a6a8a', 1, { codo: [wx - 20, y + 15] }); }
  // la mano derecha (camisa blanca de Lynch): para el contrato, firma con la pluma y cierra la claqueta
  { const llega = tramo(t, s(0.8), s(0.835)), baja = tramo(t, s(1) + 1.0, s(1) + 1.4); let wx, wy;
    if (baja > 0) { wx = lerp(278, 290, ease(baja)); wy = lerp(88, t >= clac ? 110 : 96, ease(baja)); if (t >= clac) wy = 112; }
    else if (firma > 0 && firma < 1) { wx = cxC + 4 + firma * 22; wy = cyC - 3 + Math.sin(firma * 24) * 2; }
    else if (firma >= 1) { wx = 278; wy = 88; }
    else { wx = lerp(334, 280, sale(llega)); wy = lerp(70, 80, llega); }
    if (llega > 0) { wx = Math.round(wx); wy = Math.round(wy);
      if (firma > 0 && firma < 1) { linea(wx - 2, wy + 3, wx - 9, wy + 10, K); linea(wx - 1, wy + 3, wx - 8, wy + 10, hex('#3a3a5a')); pset(wx - 9, wy + 11, hex('#e0b040')); }
      T.brazo(R, 332, wy + 34, wx, wy, '#ece8dc', -1, { codo: [Math.min(332, wx + 26), wy + 24], puno: '#ffffff' }); } }
};
const año = (t) => t < s(0.22) ? 1976 : t < P2 ? 1979 : t < s(0.625) ? 1980 : 1981;
const efectos = [[s(0.03), 'papel'], [s(0.19), 'sello'], [s(0.345), 'toc'], [P2 + 0.1, 'lluvia'], [s(0.545), 'cerrojo'], [s(0.63), 'whoosh'], [s(0.775), 'papel'], [s(0.835), 'golpecito'], [s(0.9), 'firma'], [s(1) + 0.75, 'papel'], [s(1) + 1.45, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')

E['du-alien'] = ('La huella', '''// DU-ALIEN (frase 22), 1976 → 1979. Tres planos:
// 1. otro plató, unos años después: Dan O'Bannon entra con su guion bajo el brazo, prueba un efecto (humo y destellos)
//    y levanta el guion de «otra película del espacio» (un cohete NUESTRO); Moebius y Giger, con el libro de dibujos;
// 2. inserto (fondo local): el banco del taller de decorados, con el libro de dibujos abierto; del libro salen chispas
//    hacia tres claquetas colgadas, que se cierran; Giger y luego Moebius se asoman tras el banco con una lámina;
// 3. inserto (fondo local): el archivo de latas de película; la lata fantasma (en trazos, con una duna) se deshace en
//    arena y su rastro enciende tres latas, que quedan con la marca de la duna y echan a girar.''', COMUN + r'''
const a = (f) => en('alien', f);
const P2 = a(0.405), P3 = a(0.699);
const O = { encuadre: 'plato', camara: 'general' };
// un cohete nuestro, de colores (símbolo de «película del espacio»)
const cohete = (x, y, t) => { const { rect, pset } = R; R.poligono([[x, y - 24], [x + 8, y - 10], [x + 8, y + 8], [x - 8, y + 8], [x - 8, y - 10]], K); R.poligono([[x, y - 22], [x + 7, y - 10], [x + 7, y + 7], [x - 7, y + 7], [x - 7, y - 10]], hex('#f4ecd8')); R.poligono([[x, y - 22], [x + 5, y - 13], [x - 5, y - 13]], hex('#d83a3a')); rect(x - 7, y - 1, x + 7, y + 2, hex('#d83a3a')); R.disco(x, y - 8, 3.4, K); R.disco(x, y - 8, 2.4, hex('#3a8ac8')); pset(x - 1, y - 9, hex('#bfe0f0'));
  R.poligono([[x - 8, y - 2], [x - 16, y + 12], [x - 8, y + 8]], K); R.poligono([[x - 8, y + 1], [x - 14, y + 10], [x - 8, y + 7]], hex('#e8a030')); R.poligono([[x + 8, y - 2], [x + 16, y + 12], [x + 8, y + 8]], K); R.poligono([[x + 8, y + 1], [x + 14, y + 10], [x + 8, y + 7]], hex('#e8a030'));
  for (let k = 0; k < 11; k++) { const f = (t * 7 + k * 1.7) % 1; rect(x - 5 + k, y + 9 + Math.round(f * 9), x - 5 + k, y + 10 + Math.round(f * 9), f < 0.5 ? hex('#ffe890') : hex('#f08a3a')); } };
const p1 = (t) => {
  const { rect, pset } = R, g = T.cine(R, t, O);
  const entra = tramo(t, a(0.1), a(0.26)), efecto = a(0.3), alza = tramo(t, a(0.339), a(0.37)), acercan = tramo(t, a(0.345), P2 + 0.4);
  // el cajón con el libro de dibujos, entre los dos dibujantes
  caja(196, 142, 226, 156, hex('#b08a54'), hex('#d0a870'), hex('#7a5a30')); for (const x of [203, 211, 219]) rect(x, 144, x, 154, hex('#8a6a3c')); PZ.libroDibujos(R, 211, 142, {});
  // el efecto de prueba: una columna de humo y destellos en la tarima
  if (t > efecto) { const e = t - efecto; for (let k = 0; k < 26; k++) { const u = (hh(k, 1, 60) + e * (0.5 + hh(k, 2, 60) * 0.5)) % 1; if (e < 2.6 - hh(k, 3, 60)) { const x = Math.round(160 + (hh(k, 4, 60) - 0.5) * (8 + u * 26) + Math.sin(e * 2 + k) * 2), y = Math.round(126 - u * 44), r = 1 + Math.round(u * 3); for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && (i + j + k) % 2 === 0) velo(x + i, y + j, hex('#f0f0f8'), 0.5 - u * 0.4); } }
    if (e < 0.5) for (let k = 0; k < 7; k++) destello(Math.round(160 + Math.cos(k * 0.9) * (6 + e * 40)), Math.round(120 - Math.abs(Math.sin(k * 0.9)) * (4 + e * 36)), 2, k % 2 ? hex('#fff4a0') : hex('#ffb040')); }
  // Moebius y Giger: miran el libro, saludan y se acercan
  const mx = Math.round(lerp(232, 222, acercan));
  R.actor(EL.moebius, 176, 156, t, { dir: entra > 0.2 ? -1 : 1, sonrisa: true, dedo: entra > 0.3 && entra < 0.9, habla: t < a(0.1) && Math.sin(t * 8) > 0.2, sorpresa: t > efecto && t < efecto + 0.7 });
  R.actor(EL.giger, mx, 156, t, { dir: -1, anda: acercan > 0 && acercan < 1, habla: t < a(0.1) && Math.sin(t * 8) < -0.2, sorpresa: t > efecto && t < efecto + 0.7 });
  // O'Bannon: entra por el portón con el guion, pulsa el efecto y levanta el guion
  const ox = Math.round(lerp(44, 118, sale(entra)));
  const ob = R.actor(EL.obannon, ox, 156, t, { dir: 1, anda: entra > 0 && entra < 1, sostiene: alza > 0 ? [ox + 24, 128] : true, dedo: false, sonrisa: t > efecto, habla: alza >= 1 && Math.sin(t * 9) > 0 });
  PZ.manuscrito(R, ob.mano[0] + (alza > 0 ? 9 : 4), ob.mano[1] + (alza > 0 ? 4 : 6), {});
  if (alza > 0.5) { const y = Math.round(lerp(112, 84, sale(tramo(t, a(0.355), a(0.4))))); cohete(ox + 34, y, t); destello(ox + 16, y - 12, 3, hex('#fff4a0')); destello(ox + 52, y - 2, 3, hex('#fff4a0')); destello(ox + 46, y - 22, 2, hex('#fff4a0')); }
  T.cineDelante(R, t, O);
};

// ── plano 2: el banco del taller con el libro abierto y tres claquetas ──
const CLQ = [[160, 84], [84, 84], [244, 84]];
const taller = () => {
  const { rect, pset, linea, disco } = R;
  // el tablero perforado, con sus juntas, y la viga de arriba
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 80 === 0 ? hex('#8a7048') : (x % 6 === 3 && y % 6 === 3) ? hex('#6a5434') : (x % 6 === 3 && y % 6 === 4) ? hex('#d8bc88') : hh(x >> 2, y >> 1, 70) < 0.1 ? hex('#b8996a') : hex('#c4a474'));
  madera(0, 0, 319, 21, hex('#5a3e28'), hex('#463020'), hex('#6e4e32'), 5); rect(0, 22, 319, 22, K); rect(0, 23, 319, 23, hex('#8a7048'));
  // herramientas colgadas: serrucho, martillo, alicates, rollos de cinta, un rollo de cable, pinceles y la escuadra
  R.poligono([[18, 36], [50, 40], [50, 46], [18, 50]], K); R.poligono([[19, 38], [49, 41], [49, 45], [19, 48]], hex('#c8ccd8')); for (let x = 20; x < 49; x += 3) pset(x, 47, K); caja(8, 34, 20, 52, hex('#b8742a'), hex('#d89848'), hex('#8a5218')); rect(12, 40, 16, 46, hex('#c4a474'));
  rect(110, 34, 124, 42, K); rect(111, 35, 123, 41, hex('#8a90a4')); rect(111, 35, 123, 35, hex('#c8ccd8')); rect(115, 42, 119, 64, K); rect(116, 42, 118, 63, hex('#b8742a')); pset(117, 32, hex('#3a3a44'));
  linea(132, 34, 126, 56, K); linea(133, 34, 127, 56, hex('#d83a3a')); linea(132, 34, 138, 56, K); linea(133, 34, 139, 56, hex('#d83a3a')); rect(130, 30, 135, 36, hex('#8a90a4'));
  for (const [x, y, c] of [[196, 40, '#e8a030'], [210, 40, '#3a8ac8'], [196, 104, '#2a2a34']]) { disco(x, y, 6, K); disco(x, y, 5, hex(c)); disco(x, y, 2, hex('#c4a474')); pset(x - 3, y - 3, hex('#ffffff')); }
  for (let k = 0; k < 44; k++) { const an = k / 44 * 6.283; for (const r of [8, 9, 11]) pset(Math.round(118 + Math.cos(an) * r), Math.round(100 + Math.sin(an) * r * 1.1), r === 9 ? hex('#3a3a44') : K); } rect(117, 88, 119, 92, hex('#8a90a4'));
  for (let k = 0; k < 5; k++) { const x = 26 + k * 6; rect(x, 62, x + 2, 84, K); rect(x + 1, 63, x + 1, 83, hex(['#d83a3a', '#e8a030', '#3a8ac8', '#4a9a5a', '#8a5ac8'][k])); rect(x, 56, x + 2, 62, hex('#e8dcc0')); pset(x + 1, 55, hex('#6a5434')); }
  R.poligono([[204, 58], [222, 58], [222, 62], [208, 62], [208, 80], [204, 80]], K); rect(205, 59, 221, 60, hex('#e8d8a0')); rect(205, 59, 206, 79, hex('#e8d8a0'));
  // una balda con botes de pintura y aerosoles (bajo la esquina de Atom) y otra a la izquierda con tarros
  for (const [x0, x1, y] of [[262, 316, 78], [10, 60, 116]]) { rect(x0, y, x1, y + 3, K); rect(x0 + 1, y + 1, x1 - 1, y + 2, hex('#8a6a3c')); rect(x0 + 1, y + 1, x1 - 1, y + 1, hex('#b08a54')); pset(x0 + 3, y + 4, K); pset(x1 - 3, y + 4, K); }
  [['#d83a3a', 266], ['#e8c040', 279], ['#3a8ac8', 292], ['#f4ecd8', 305]].forEach(([c, x], k) => { caja(x, 64 - (k % 2) * 3, x + 9, 77, hex(c), mez(hex(c), hex('#ffffff'), 0.5), mez(hex(c), K, 0.4)); rect(x + 1, 67 - (k % 2) * 3, x + 8, 68 - (k % 2) * 3, hex('#c8ccd8')); if (k % 2) for (let j = 0; j < 4; j++) pset(x + 2, 70 + j, hex(c)); });
  for (let k = 0; k < 4; k++) { const x = 14 + k * 11; caja(x, 104 + (k % 2) * 2, x + 8, 115, hex(['#9ac8d8', '#e8dcc0', '#c8a040', '#9ac8d8'][k]), hex('#ffffff'), null); rect(x, 103 + (k % 2) * 2, x + 8, 104 + (k % 2) * 2, hex('#6a5434')); }
  // láminas clavadas (formas nuestras) y los ganchos de las claquetas
  for (const [x, y, c1, c2] of [[92, 100, '#f4c078', '#b06a2c'], [222, 100, '#bfe0f0', '#d83a3a'], [276, 96, '#f8d8a0', '#8a5ac8']]) { rect(x, y, x + 20, y + 24, K); rect(x + 1, y + 1, x + 19, y + 23, hex('#f4ecd8')); rect(x + 3, y + 4, x + 17, y + 20, hex(c1)); disco(x + 10, y + 13, 4, hex(c2)); rect(x + 3, y + 17, x + 17, y + 20, hex(c2)); pset(x + 10, y + 2, hex('#d83a3a')); }
  for (const [x, y] of CLQ) { rect(x - 1, y - 60, x + 1, y - 56, hex('#8a90a4')); linea(x, y - 56, x - 12, y - 47, hex('#3a3a44')); linea(x, y - 56, x + 12, y - 47, hex('#3a3a44')); }
  // el banco: el tablero con sus marcas y el frente con cajones y el tornillo de banco
  madera(0, 150, 319, 158, hex('#c89858'), hex('#a87a3c'), hex('#e0b878'), 7); rect(0, 149, 319, 149, K); rect(0, 150, 319, 150, hex('#e8c890')); rect(0, 159, 319, 159, K);
  madera(0, 160, 319, 179, hex('#8a6238'), hex('#6e4a26'), hex('#a07848'), 8);
  for (const x of [40, 124, 208]) { caja(x, 163, x + 72, 178, hex('#96703f'), hex('#b08a54'), hex('#6e4a26')); rect(x + 30, 169, x + 42, 171, K); rect(x + 31, 169, x + 41, 169, hex('#c8a040')); }
  caja(4, 138, 30, 149, hex('#5a6a8a'), hex('#8a9ab8'), hex('#3a4a6a')); rect(12, 132, 22, 138, K); rect(13, 133, 21, 137, hex('#8a90a4')); rect(0, 142, 6, 144, hex('#8a90a4')); rect(8, 150, 26, 166, K); rect(9, 150, 25, 165, hex('#4a5a7a'));
  // sobre el banco: botes con pinceles, un cohete de maqueta (nuestro), cinta, una taza y el soldador
  caja(38, 136, 50, 149, hex('#d8d0bc'), hex('#f4f0e4'), hex('#a8a08c')); for (let k = 0; k < 4; k++) { linea(40 + k * 3, 136, 38 + k * 4, 122 + (k % 2) * 3, hex('#b08a54')); rect(37 + k * 4, 119 + (k % 2) * 3, 38 + k * 4, 122 + (k % 2) * 3, hex(['#d83a3a', '#3a8ac8', '#e8c040', '#2a2a34'][k])); }
  caja(266, 141, 280, 149, hex('#e8e4d8'), hex('#ffffff'), hex('#b8b4a8')); rect(280, 143, 284, 147, K); rect(281, 144, 283, 146, hex('#c4a474')); disco(298, 145, 5, K); disco(298, 145, 4, hex('#e8a030')); disco(298, 145, 2, hex('#c89858'));
  calma(hex('#5a3e28'), hex('#c4a474')); for (let y = 0; y < 22; y++) for (let x = 274; x < 320; x++) pset(x, y, hex('#5a3e28')); rect(274, 22, 319, 22, K); rect(274, 23, 319, 23, hex('#8a7048'));
};
const p2 = (t) => {
  const { rect, pset, linea } = R;
  capa('taller', taller);
  const sal = [a(0.42), a(0.5), a(0.615)], lle = sal.map((x) => x + 0.42), gi = tramo(t, a(0.455), a(0.5)), mo = tramo(t, a(0.57), a(0.615));
  // la bombilla que cuelga y se mece, con su cono de luz sobre el libro
  { const bx = 160 + Math.round(Math.sin(t * 1.1) * 3); linea(160, 23, bx, 30, K); R.poligono([[bx - 5, 34], [bx + 5, 34], [bx + 2, 29], [bx - 2, 29]], hex('#3a5a4a')); rect(bx - 1, 35, bx + 1, 36, hex('#fff4c8'));
    for (let y = 37; y < 150; y += 1) { const w = 4 + (y - 37) * 0.42; for (let x = Math.round(bx - w); x <= bx + w; x++) if ((x + y) % 2 === 0 && hh(x, y, 71) < 0.5) velo(x, y, hex('#fff0b0'), 0.16); } }
  // las tres claquetas colgadas: abiertas hasta que les llega la chispa; luego se cierran y quedan encendidas
  CLQ.forEach(([x, y], k) => { const on = t >= lle[k], bal = Math.round(Math.sin(t * 1.6 + k * 2) * 1.2 + (on ? Math.sin((t - lle[k]) * 14) * Math.max(0, 3 - (t - lle[k]) * 5) : 0));
    if (on) { const p = 0.5 + 0.5 * Math.sin(t * 5 + k); for (let j = -26; j <= 4; j++) for (let i = -26; i <= 26; i++) { const d = Math.max(Math.abs(i) / 26, Math.abs(j + 11) / 15); if (d > 0.82 && d <= 1 && (i + j) % 2 === 0) velo(x + i + bal, y + j - 14, hex('#ffd84a'), 0.5 + p * 0.3); } }
    PZ.claqueta(R, x + bal, y, { s: 2, abierta: !on });
    if (on && t < lle[k] + 0.45) for (let q = 0; q < 6; q++) destello(Math.round(x + Math.cos(q * 1.05) * (16 + (t - lle[k]) * 40)), Math.round(y - 22 + Math.sin(q * 1.05) * (12 + (t - lle[k]) * 30)), 2, hex('#fff4a0')); });
  // Giger (izquierda) y Moebius (derecha) se asoman tras el banco, cada uno con su lámina
  if (gi > 0) { const x = Math.round(lerp(-18, 60, sale(gi))), g = R.actor(EL.giger, x, 154, t, { dir: 1, anda: gi < 1, sostiene: gi >= 1 ? [x + 20, 122] : true, sonrisa: t > lle[1] }); hoja(g.mano[0] + 2, g.mano[1] + 2, true); }
  if (mo > 0) { const x = Math.round(lerp(324, 242, sale(mo))), g = R.actor(EL.moebius, x, 154, t, { dir: -1, anda: mo < 1, sostiene: mo >= 1 ? [x - 6, 122] : true, sonrisa: t > lle[2] }); hoja(g.mano[0] - 2, g.mano[1] + 2, false); }
  // el tablero del banco tapa de cintura para abajo
  { const b = CAPAS.taller; for (let y = 149; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, b[y * 320 + x]); }
  // el libro de dibujos, abierto, con su sombra; las páginas laten cuando sale una chispa
  for (let x = 96; x <= 226; x++) for (let y = 151; y <= 155; y++) if ((x + y) % 2 === 0) velo(x, y, K, 0.35);
  PZ.libroDibujos(R, 160, 153, { s: 3, abierto: true });
  sal.forEach((t0, k) => { const u = (t - t0) / 0.42; if (u < 0 || u > 1) return; const [x1, y1] = CLQ[k], x0 = 160 + (k === 1 ? -30 : k === 2 ? 30 : 0), y0 = 116, e = ease(u);
    for (let q = 0; q < 7; q++) { const v = Math.max(0, e - q * 0.05), x = Math.round(lerp(x0, x1, v)), y = Math.round(lerp(y0, y1 - 20, v) - Math.sin(v * Math.PI) * 26); if (q === 0) destello(x, y, 4, hex('#fff4a0')); else destello(x, y, q < 3 ? 2 : 1, hex(['#ff8a5a', '#ffd84a', '#7ae0e8'][q % 3])); }
    for (let q = 0; q < 8; q++) pset(x0 - 16 + q * 4 + Math.round(Math.sin(t * 20 + q) * 2), y0 - 4 - Math.round(u * 8) - (q % 3), hex('#fff4a0')); });
  // motas de polvo en la luz
  for (let k = 0; k < 12; k++) { const u = (hh(k, 1, 72) + t * (0.03 + hh(k, 2, 72) * 0.04)) % 1, x = Math.round(140 + hh(k, 3, 72) * 40 + Math.sin(t * 0.8 + k) * 5), y = Math.round(40 + u * 70); if (Math.sin(t * 2.3 + k * 1.7) > 0.2) velo(x, y, hex('#fffbe0'), 0.7); }
};

// ── plano 3: el archivo de latas ──
const LATAS = [[92, 73], [188, 111], [258, 149]], FANT = [42, 35];
const lataFrente = (x, y, r, c, cL, cS) => { R.disco(x, y, r + 1, K); R.disco(x, y, r, c); R.disco(x, y, r - 3, cS); R.disco(x, y, r - 4, c); for (let k = 0; k < 20; k++) { const an = -2.6 + k / 20 * 1.6; R.pset(Math.round(x + Math.cos(an) * (r - 1)), Math.round(y + Math.sin(an) * (r - 1)), cL); } R.disco(x, y, 2, cS); };
const archivo = () => {
  const { rect, pset, linea, disco } = R;
  // la pared del fondo: ladrillo oscuro con manchas, tuberías y el zócalo
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const f = (y / 7 | 0), bx = (x + (f % 2) * 9) % 18; pset(x, y, y % 7 === 0 || bx === 0 ? hex('#1e1a28') : hh((x + (f % 2) * 9) / 18 | 0, f, 80) < 0.25 ? hex('#3a3040') : hh(x >> 1, y >> 1, 81) < 0.08 ? hex('#262030') : hex('#302838')); }
  // la estantería metálica: montantes perforados y cuatro baldas
  const BAL = [50, 88, 126, 164];
  for (const x of [4, 110, 216, 312]) { rect(x, 16, x + 4, 179, K); rect(x + 1, 16, x + 3, 179, hex('#5a6078')); rect(x + 1, 16, x + 1, 179, hex('#7a8098')); for (let y = 20; y < 179; y += 6) pset(x + 2, y, K); }
  for (const y of BAL) { rect(0, y, 319, y + 4, K); rect(0, y + 1, 319, y + 3, hex('#5a6078')); rect(0, y + 1, 319, y + 1, hex('#8a90a8')); for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0) pset(x, y + 5, hex('#16121e')); }
  // las latas: pilas de canto (cada una con su tira de color, sin letras) y algunas de frente, apoyadas
  const TIRAS = ['#d83a3a', '#e8a030', '#3a8ac8', '#4a9a5a', '#8a5ac8', '#f4ecd8', '#e86a8a'], MET = [['#8a90a4', '#b8bcd0', '#5a6074'], ['#7a7a8a', '#a8a8b8', '#4e4e5e'], ['#9a8870', '#c0ae90', '#6a5a48'], ['#6a7a8a', '#94a4b4', '#465662']];
  BAL.forEach((yb, f) => { for (let k = 0; k < 9; k++) { const x0 = 10 + k * 34 + (k > 2 ? 4 : 0) + (k > 5 ? 4 : 0); if (x0 > 300) continue; const n = f === 0 && x0 > 250 ? 0 : 1 + Math.floor(hh(k, f, 82) * 4.4);
      if (n === 0 || (f === 0 && k === 0)) continue; if (LATAS.some(([lx, ly]) => Math.abs(lx - (x0 + 14)) < 30 && Math.abs(ly - (yb - 14)) < 10)) continue;
      if (hh(k, f, 83) < 0.14) { const m = MET[(k + f) % 4]; lataFrente(x0 + 14, yb - 13, 12, hex(m[0]), hex(m[1]), hex(m[2])); rect(x0 + 9, yb - 15, x0 + 19, yb - 11, hex('#f4ecd8')); rect(x0 + 10, yb - 14, x0 + 18, yb - 13, hex(TIRAS[(k * 3 + f) % 7])); continue; }
      for (let j = 0; j < n; j++) { const y = yb - 1 - j * 7, dx = Math.round((hh(k, f * 7 + j, 84) - 0.5) * 4), m = MET[(k + f + j) % 4], xa = x0 + dx, xb = x0 + 28 + dx; rect(xa, y - 6, xb, y, K); rect(xa + 1, y - 5, xb - 1, y - 1, hex(m[0])); rect(xa + 1, y - 5, xb - 1, y - 5, hex(m[1])); rect(xa + 1, y - 2, xb - 1, y - 1, hex(m[2])); rect(xa + 9, y - 4, xa + 19, y - 2, hex('#f4ecd8')); rect(xa + 10, y - 3, xa + 14 + ((k + j) % 3) * 2, y - 3, hex(TIRAS[(k * 2 + f + j * 3) % 7])); pset(xa + 3, y - 3, hex(m[1])); } } });
  // una escalera de mano apoyada a la derecha, una caja de cartón y telarañas en las esquinas
  for (const x of [286, 302]) { rect(x, 58, x + 2, 179, K); rect(x + 1, 58, x + 1, 179, hex('#b08a54')); } for (let y = 68; y < 178; y += 12) { rect(288, y, 302, y + 1, hex('#8a6a3c')); rect(288, y + 2, 302, y + 2, K); }
  for (let i = 0; i < 16; i++) { pset(i, 16 + (i >> 1), hex('#5a5870')); pset(i >> 1, 16 + i, hex('#5a5870')); pset(i, 16 + i, hex('#5a5870')); pset(Math.round(i * 0.8), 28 - Math.round(i * 0.4), hex('#4a4860')); }
  // el hueco de la lata fantasma: su cerco de polvo en la balda
  for (let x = FANT[0] - 13; x <= FANT[0] + 13; x++) if (x % 2) pset(x, 51, hex('#b8a888'));
  calma(hex('#302838'));
};
const p3 = (t) => {
  const { rect, pset, linea, disco } = R;
  capa('archivo', archivo);
  // la bombilla que cuelga y se mece: su luz recorre las baldas
  const bx = 204 + Math.round(Math.sin(t * 0.9) * 10);
  { linea(204, 0, bx, 20, hex('#16121e')); rect(bx - 2, 21, bx + 2, 24, hex('#fff4c8')); pset(bx, 25, hex('#ffffff')); for (let y = 18; y < 180; y += 1) for (let x = (y % 2); x < 320; x += 2) { const d = Math.hypot(x - bx, (y - 22) * 0.9); if (d < 96 && hh(x, y, 85) > d / 96) velo(x, y, hex('#ffe8a0'), 0.2); } }
  // los tiempos: la lata fantasma se deshace y su rastro enciende tres latas
  const T0 = P3 + 0.5, lle = [a(0.79), a(0.864), a(0.925)], fin = a(1);
  // la lata fantasma: en trazos, con la duna; se deshace en arena que cae
  { const des = tramo(t, a(0.74), fin), [fx, fy] = FANT; for (let k = 0; k < 44; k++) { if (k % 2 === Math.floor(t * 3) % 2 || hh(k, 1, 86) < des * 0.9) continue; const an = k / 44 * 6.283; for (const r of [13, 14]) pset(Math.round(fx + Math.cos(an) * r), Math.round(fy + Math.sin(an) * r), hex('#ffe8a0')); pset(Math.round(fx + Math.cos(an) * 9), Math.round(fy + Math.sin(an) * 9), hex('#f4c078')); }
    if (des < 0.6) for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) if (i * i + j * j < 150 && (i + j) % 2 === 0) velo(fx + i, fy + j, hex('#f4c078'), 0.22 * (1 - des));
    if (des < 0.8) R.icono('duna', fx - 6, fy - 7, mez(hex('#ffe8a0'), hex('#302838'), des), hex('#16121e'), 2);
    for (let k = 0; k < 40; k++) { const u = ((t - a(0.74)) * (0.5 + hh(k, 2, 86) * 0.5) - hh(k, 3, 86) * 2); if (u < 0 || t < a(0.74)) continue; const y = fy + 10 + Math.round((u % 1.4) * 100), x = fx - 8 + Math.round(hh(k, 4, 86) * 16 + Math.sin(u * 6 + k) * 1.5); if (y < 176 && !(y > 50 && y < 55) && !(y > 88 && y < 93) && !(y > 126 && y < 131) && !(y > 164 && y < 169)) pset(x, y, k % 3 ? hex('#e09848') : hex('#f4c078')); }
    const pila = Math.min(1, Math.max(0, (t - a(0.74) - 1) / 4)); for (let i = -12; i <= 12; i++) { const hgt = Math.round((1 - Math.abs(i) / 12) * 7 * pila); for (let j = 0; j < hgt; j++) pset(fx + i, 163 - j, (i + j) % 3 ? hex('#e09848') : hex('#f4c078')); } }
  // el rastro de chispas: de la fantasma a la primera lata y de lata en lata
  const PTS = [FANT, ...LATAS];
  for (let k = 0; k < 3; k++) { const t1 = lle[k], t0 = k === 0 ? T0 + 0.5 : lle[k - 1] + 0.15, u = (t - t0) / (t1 - t0); if (u < 0 || u > 1.25) continue; const [x0, y0] = PTS[k], [x1, y1] = PTS[k + 1];
    for (let q = 0; q < 16; q++) { const v = Math.min(1, ease(Math.min(1, u))) - q * 0.035; if (v < 0 || (u > 1 && q < (u - 1) * 64)) continue; const x = Math.round(lerp(x0, x1, v) + Math.sin(v * 9 + q) * 2), y = Math.round(lerp(y0, y1, v) - Math.sin(v * Math.PI) * 16); if (q === 0 && u <= 1) destello(x, y, 4, hex('#fff4c8')); else if (q % 2 === 0) destello(x, y, 1, hex(q % 4 ? '#f4c078' : '#ffe8a0')); else pset(x, y, hex('#e09848')); } }
  // las tres latas: grises hasta que llega el rastro; luego doradas, con la marca de la duna, y la bobina echa a girar
  LATAS.forEach(([x, y], k) => { const on = t >= lle[k], e = t - lle[k];
    if (!on) { lataFrente(x, y, 13, hex('#7a7a8a'), hex('#a8a8b8'), hex('#4e4e5e')); rect(x - 6, y - 3, x + 6, y + 3, hex('#d8d0bc')); rect(x - 4, y - 1, x + 3, y, hex('#a8a08c')); return; }
    const p = 0.5 + 0.5 * Math.sin(t * 4 + k * 2); for (let q = 0; q < 28; q++) { const an = q / 28 * 6.283 + t * 0.6, r = 17 + (q % 2) * 3 + p * 2; velo(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r), hex('#ffd84a'), 0.75); if (q % 4 === 0) velo(Math.round(x + Math.cos(an) * (r + 4)), Math.round(y + Math.sin(an) * (r + 4)), hex('#ffd84a'), 0.4); }
    lataFrente(x, y, 13, hex('#e8b840'), hex('#fff0a0'), hex('#a87820'));
    for (let b = 0; b < 3; b++) { const an = e * Math.min(6, 1 + e * 2) * 0.9 + b * 2.094; pset(Math.round(x + Math.cos(an) * 11), Math.round(y + Math.sin(an) * 11), hex('#fff8d0')); pset(Math.round(x + Math.cos(an + 0.15) * 11), Math.round(y + Math.sin(an + 0.15) * 11), hex('#fff8d0')); }
    const cae = Math.min(1, e / 0.18); R.disco(x, y, 8, hex('#f4ecd8')); R.icono('duna', x - 6, y - 7 - Math.round((1 - cae) * 10), hex('#b06a2c'), hex('#f4ecd8'), 2);
    if (e < 0.5) for (let q = 0; q < 6; q++) destello(Math.round(x + Math.cos(q * 1.05 + 0.4) * (15 + e * 36)), Math.round(y + Math.sin(q * 1.05 + 0.4) * (15 + e * 36)), 2, hex('#fff4a0'));
    // de cada lata encendida suben chispas pequeñas
    for (let q = 0; q < 4; q++) { const u = (e * 0.5 + q / 4) % 1; pset(x - 9 + q * 6 + Math.round(Math.sin(e * 3 + q) * 2), y - 16 - Math.round(u * 16), u < 0.6 ? hex('#fff4a0') : hex('#e09848')); } });
  // un ratón que corre por la balda de abajo y se para a mirar
  { const u = tramo(t, P3 + 0.3, a(0.9)), x = Math.round(lerp(330, 132, u)), y = 163, pas = Math.floor(t * 10) % 2 && u < 1; rect(x, y - 4, x + 7, y - 1, hex('#8a8494')); rect(x - 2, y - 3, x, y - 1, hex('#8a8494')); pset(x - 3, y - 2, hex('#e86a8a')); pset(x - 1, y - 5, hex('#b8b0c4')); pset(x, y - 5, hex('#b8b0c4')); pset(x - 1, y - 3, K); for (let i = 0; i < 6; i++) pset(x + 8 + i, y - 2 - Math.round(Math.sin(t * 8 + i) * 1), hex('#c89aa4')); pset(x + 1 + (pas ? 1 : 0), y, K); pset(x + 5 + (pas ? 0 : 1), y, K); }
  // motas de polvo en la luz de la bombilla
  for (let k = 0; k < 16; k++) { const u = (hh(k, 1, 87) + t * (0.02 + hh(k, 2, 87) * 0.03)) % 1, x = Math.round(bx - 40 + hh(k, 3, 87) * 80 + Math.sin(t * 0.7 + k) * 4), y = Math.round(30 + u * 120); if (Math.sin(t * 2 + k * 1.9) > 0.3) velo(x, y, hex('#fffbe0'), 0.6); }
};
const año = (t) => Math.round(lerp(1976, 1979, tramo(t, a(0.12), a(0.18))));
const efectos = [[a(0.1), 'puerta'], [a(0.3), 'vapor'], [a(0.37), 'brillo'], [a(0.42), 'whoosh'], [a(0.42) + 0.42, 'palmada'], [a(0.5) + 0.42, 'palmada'], [a(0.615) + 0.42, 'palmada'], [a(0.74), 'viento'], [a(0.79), 'sello'], [a(0.864), 'sello'], [a(0.925), 'sello'], [a(1) + 0.3, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')

E['du-dibujos'] = ('Tres mil dibujos', '''// DU-DIBUJOS (frases 20–21), 1975 → 2021. Siete planos:
// 1. el estudio de París con la pared llena: Jodorowsky abre los brazos y llama a su equipo; entran Moebius (con una
//    lámina) y Giger; O'Bannon dibuja al fondo;
// 2. inserto (fondo local): el tablero de dibujo de cerca; la mano de Moebius dibuja, las láminas (naves y castillos
//    NUESTROS) llenan el tablero y se apilan, el contador llega a 3000; la mano de Giger (manga negra) clava dos oscuras;
// 3. inserto (fondo local): la mesa del estudio de cerca; la película sale de la bobina sin parar, el reloj da vueltas
//    («10» horas) y el guion cae como una guía de teléfonos: todo da un bote (gag 7);
// 4. la oficina de Hollywood: Jodorowsky sacude la hucha (sale una polilla), el productor niega y los tres carteles
//    quedan tachados; se van;
// 5. inserto (fondo local): el almacén; una sábana cae sobre la cámara, la claqueta cría telarañas; una puerta se abre
//    y su luz encuentra el libro enorme de dibujos;
// 6. la sala de subastas de París, 2021: el libro en su vitrina, las paletas suben y la cifra crece;
// 7. inserto (fondo local): la tribuna de cerca; la cifra pasa de 2 500 000 y el mazo cae.''', COMUN + r'''
const d = (f) => en('dibujos', f), l = (f) => en('libro', f);
const P2 = d(0.257), P3 = d(0.578), P4 = d(1) + 0.4, P5 = l(0.186), P6 = l(0.554), P7 = l(0.817);
const OP = { encuadre: 'paris', camara: 'general', dibujos: 1, mesa: 'llena' };
const p1 = (t) => {
  T.cine(R, t, OP);
  const mo = tramo(t, d(0.04), d(0.16)), gi = tramo(t, d(0.12), d(0.235));
  // O'Bannon, al fondo, dibuja en la mesa inclinada
  const ob = R.actor(EL.obannon, 238, 138, t, { dir: -1, sostiene: [232 + Math.round(Math.sin(t * 5) * 2), 121 + Math.round(Math.cos(t * 7))] }); R.linea(ob.mano[0], ob.mano[1], ob.mano[0] - 3, ob.mano[1] + 4, hex('#e8c040'));
  // Jodorowsky abre los brazos, llama a los suyos y mira la lámina de Moebius
  R.actor(EL.jodorowsky, 150, 148, t, { dir: mo >= 1 && gi < 0.6 ? -1 : 1, brazos: t > 0.45 && t < d(0.07), dedo: (mo > 0.2 && mo < 1) || (gi > 0.3 && gi < 1), habla: Math.sin(t * 9) > 0.1 && t < d(0.2), sonrisa: true });
  // Moebius entra por la izquierda con una lámina y la enseña; Giger, por la derecha
  { const x = Math.round(lerp(-18, 68, sale(mo))), m = R.actor(EL.moebius, x, 148, t, { dir: 1, anda: mo > 0 && mo < 1, sostiene: mo >= 1 ? [x + 20, 118] : true, sonrisa: mo >= 1 }); if (mo > 0) hoja(m.mano[0] + 2, m.mano[1] + 2, false);
    if (mo >= 1 && t < d(0.16) + 0.5) { destello(m.mano[0] + 9, m.mano[1] - 14, 2, hex('#fff4a0')); destello(m.mano[0] - 6, m.mano[1] - 10, 2, hex('#fff4a0')); } }
  if (gi > 0) { const x = Math.round(lerp(324, 206, sale(gi))), g = R.actor(EL.giger, x, 148, t, { dir: -1, anda: gi < 1, sostiene: true }); hoja(g.mano[0] - 2, g.mano[1] + 6, true); }
  T.cineDelante(R, t, OP);
};

// ── plano 2: el tablero de dibujo, de cerca ──
const lamina = (x, y, tipo) => {
  const { rect, pset, linea, disco, poligono } = R, W = 56, H = 50, osc = tipo >= 6, P = (pts) => pts.map(([i, j]) => [x + i, y + j]);
  rect(x, y, x + W, y + H, K); rect(x + 1, y + 1, x + W - 1, y + H - 1, osc ? hex('#d0d2d8') : hex('#f4ecd8'));
  const fondo = (c1, c2) => { for (let j = 7; j <= 45; j++) for (let i = 4; i <= 52; i++) pset(x + i, y + j, (j - 7) / 38 + (hh(i, j, tipo) - 0.5) * 0.3 > 0.5 ? hex(c2) : hex(c1)); };
  if (tipo === 0) { fondo('#bfe0f0', '#e0f0f4'); poligono(P([[28, 9], [36, 22], [36, 36], [20, 36], [20, 22]]), K); poligono(P([[28, 11], [35, 22], [35, 35], [21, 35], [21, 22]]), hex('#f4ecd8')); poligono(P([[28, 11], [33, 19], [23, 19]]), hex('#d83a3a')); rect(x + 21, y + 27, x + 35, y + 30, hex('#d83a3a')); disco(x + 28, y + 23, 3, K); disco(x + 28, y + 23, 2, hex('#3a8ac8')); poligono(P([[20, 28], [12, 41], [20, 37]]), hex('#e8a030')); poligono(P([[36, 28], [44, 41], [36, 37]]), hex('#e8a030')); poligono(P([[23, 37], [33, 37], [28, 45]]), hex('#f08a3a')); poligono(P([[26, 37], [30, 37], [28, 42]]), hex('#ffe890')); for (const [i, j] of [[9, 12], [46, 15], [42, 9], [10, 30], [47, 30]]) destello(x + i, y + j, 1, hex('#f0c040')); }
  else if (tipo === 1) { fondo('#f8d8a0', '#f4c078'); poligono(P([[8, 35], [48, 35], [38, 45], [18, 45]]), hex('#8a5a3a')); poligono(P([[8, 35], [48, 35], [44, 38], [12, 38]]), hex('#6a9a4a')); rect(x + 13, y + 20, x + 20, y + 35, hex('#8a5ac8')); rect(x + 24, y + 14, x + 32, y + 35, hex('#3aa8a0')); rect(x + 36, y + 22, x + 43, y + 35, hex('#e86a8a')); disco(x + 16.5, y + 19, 4, hex('#e8a030')); disco(x + 28, y + 13, 5, hex('#d83a3a')); disco(x + 39.5, y + 21, 4, hex('#f0c040')); for (const [i, j] of [[16, 26], [28, 20], [28, 28], [39, 28]]) rect(x + i, y + j, x + i + 1, y + j + 2, hex('#2a2a3a')); linea(x + 28, y + 8, x + 28, y + 4, K); rect(x + 29, y + 4, x + 32, y + 5, hex('#3a8ac8')); disco(x + 46, y + 12, 3, hex('#fff4d0')); }
  else if (tipo === 2) { fondo('#f4c078', '#f8dca0'); disco(x + 16, y + 16, 5, hex('#fff4d0')); disco(x + 32, y + 12, 3, hex('#f0e0c0')); for (let i = 4; i <= 52; i++) { const y1 = 30 + Math.round(Math.sin(i * 0.16) * 4), y2 = 37 + Math.round(Math.sin(i * 0.11 + 2) * 3); for (let j = y1; j <= 45; j++) pset(x + i, y + j, j >= y2 ? hex('#b06a2c') : hex('#e09848')); pset(x + i, y + y1, hex('#f4c078')); } }
  else if (tipo === 3) { fondo('#1c2450', '#2a2a6a'); for (let j = -7; j <= 7; j++) for (let i = -16; i <= 16; i++) if ((i / 16) ** 2 + (j / 7) ** 2 <= 1) pset(x + 28 + i, y + 26 + j, hex(['#f0c040', '#e86a3a', '#4ac8a8'][((i + 16) / 6 | 0) % 3])); poligono(P([[12, 26], [5, 18], [5, 34]]), hex('#8a5ac8')); disco(x + 38, y + 24, 2, hex('#bfe0f0')); disco(x + 32, y + 24, 2, hex('#bfe0f0')); for (const [i, j] of [[10, 11], [44, 12], [48, 38], [20, 40], [36, 10]]) pset(x + i, y + j, hex('#fff4d0')); poligono(P([[45, 26], [50, 23], [50, 29]]), hex('#ffe890')); }
  else if (tipo === 4) { fondo('#1c2450', '#3a2a6a'); disco(x + 28, y + 26, 10, hex('#e86a8a')); for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) if (i * i + j * j <= 100 && (j + 12) % 6 < 2) pset(x + 28 + i, y + 26 + j, hex('#f4a0b0')); for (let k = 0; k < 60; k++) { const an = k / 60 * 6.283, i = Math.round(Math.cos(an) * 18), j = Math.round(Math.sin(an) * 5 - Math.cos(an) * 3); if (j > 0 || Math.abs(i) > 10) { pset(x + 28 + i, y + 26 + j, hex('#f0c040')); pset(x + 28 + i, y + 27 + j, hex('#c89030')); } } disco(x + 46, y + 12, 2, hex('#bfe0f0')); for (const [i, j] of [[8, 10], [12, 40], [47, 40], [40, 9]]) pset(x + i, y + j, hex('#fff4d0')); }
  else if (tipo === 5) { fondo('#d8f0d0', '#bfe0f0'); rect(x + 23, y + 12, x + 33, y + 45, K); rect(x + 24, y + 13, x + 32, y + 45, hex('#8a6ac8')); for (let j = 13; j < 45; j++) pset(x + 24 + (j % 9), y + j, hex('#f0c040')); poligono(P([[20, 13], [36, 13], [28, 5]]), hex('#d83a3a')); rect(x + 18, y + 28, x + 38, y + 30, hex('#e8a030')); disco(x + 44, y + 13, 4, hex('#f0c040')); rect(x + 27, y + 36, x + 29, y + 41, hex('#2a2a3a')); for (let i = 4; i <= 52; i++) pset(x + i, y + 45 - (hh(i, 1, 5) < 0.4 ? 1 : 0), hex('#6a9a4a')); }
  else if (tipo === 6) { fondo('#b8bcc8', '#d0d2d8'); for (const i of [8, 22, 36]) { rect(x + i, y + 22, x + i + 12, y + 45, hex('#2a2e3a')); disco(x + i + 6, y + 30, 4, hex('#8a90a0')); rect(x + i + 2, y + 30, x + i + 10, y + 45, hex('#8a90a0')); rect(x + i + 5, y + 34, x + i + 7, y + 45, hex('#5a6070')); } poligono(P([[8, 22], [14, 9], [20, 22]]), hex('#2a2e3a')); poligono(P([[36, 22], [42, 11], [48, 22]]), hex('#2a2e3a')); poligono(P([[22, 22], [28, 15], [34, 22]]), hex('#3a3e4e')); disco(x + 28, y + 11, 3, hex('#f4f4f8')); }
  else { fondo('#c8ccd4', '#b0b4c0'); for (let k = 0; k < 5; k++) { rect(x + 10 + k * 4, y + 40 - k * 6, x + 46 - k * 4, y + 45 - k * 6, hex(k % 2 ? '#3a3e4e' : '#2a2e3a')); rect(x + 10 + k * 4, y + 40 - k * 6, x + 46 - k * 4, y + 40 - k * 6, hex('#6a7080')); } rect(x + 26, y + 38, x + 30, y + 45, hex('#8a90a0')); disco(x + 28, y + 10, 4, hex('#2a2e3a')); disco(x + 28, y + 10, 2, hex('#8a90a0')); }
  disco(x + W / 2, y + 3, 2, K); disco(x + W / 2, y + 3, 1, osc ? hex('#8a90a0') : hex('#d83a3a'));
};
const SLX = (c) => 22 + c * 62, SLY = (r) => 32 + r * 58;
const tablero = () => {
  const { rect, pset, linea, disco } = R;
  // la pared: papel de listas con motas y la moldura
  for (let y = 0; y < 157; y++) for (let x = 0; x < 320; x++) pset(x, y, hh(x >> 1, y >> 1, 100) < 0.07 ? hex('#c4b48e') : x % 14 < 7 ? hex('#d8c8a4') : hex('#d0c09a'));
  rect(0, 21, 319, 21, hex('#a89870')); rect(0, 22, 319, 22, hex('#ebe0c4'));
  // el tablero inclinado: marco de pino, la superficie con su cuadrícula a lápiz, cinta y manchas
  rect(10, 24, 272, 150, K); madera(11, 25, 271, 149, hex('#b08a54'), hex('#96703f'), hex('#c8a26a'), 11);
  for (let y = 28; y <= 146; y++) for (let x = 14; x <= 268; x++) pset(x, y, (x - 14) % 10 === 0 || (y - 28) % 10 === 0 ? hex('#dccaa4') : hh(x >> 1, y >> 1, 101) < 0.06 ? hex('#dccca8') : hex('#e6d6b4'));
  rect(13, 27, 269, 27, hex('#7a5a30')); rect(13, 27, 13, 147, hex('#7a5a30'));
  for (const [x, y] of [[80, 86], [142, 30], [204, 86], [266, 60]]) { rect(x - 3, y - 1, x + 3, y + 1, hex('#f0e8c8')); pset(x - 3, y, hex('#d8d0b0')); }
  for (let k = 0; k < 30; k++) { const an = k / 30 * 6.283; pset(Math.round(180 + Math.cos(an) * 7), Math.round(118 + Math.sin(an) * 6), hex('#c8a878')); }
  // la repisa del tablero con lápices, goma y sacapuntas
  rect(8, 150, 274, 156, K); madera(9, 151, 273, 155, hex('#96703f'), hex('#7a5a30'), hex('#b08a54'), 12); rect(9, 151, 273, 151, hex('#c8a26a'));
  [['#d83a3a', 16], ['#3a8ac8', 40], ['#e8c040', 96], ['#4a9a5a', 214], ['#2a2a34', 240]].forEach(([c, x]) => { rect(x, 152, x + 18, 153, hex(c)); rect(x + 19, 152, x + 21, 153, hex('#e8d0a0')); pset(x + 22, 152, K); rect(x, 154, x + 21, 154, K); });
  caja(70, 150, 82, 155, hex('#e86a8a'), hex('#f4a0b0'), null); caja(200, 149, 208, 155, hex('#8a90a4'), hex('#c8ccd8'), null);
  // la mesa de abajo: tinteros, el contador de mano, la caja de acuarelas y un bote de pinceles
  madera(0, 157, 319, 179, hex('#6e4a2a'), hex('#553820'), hex('#86603a'), 13); rect(0, 157, 319, 157, K); rect(0, 158, 319, 158, hex('#96703f'));
  [['#1c2450', 18], ['#8a2a2a', 40], ['#2a2a34', 62]].forEach(([c, x], k) => { caja(x, 164, x + 14, 178, hex(c), mez(hex(c), hex('#ffffff'), 0.35), null); rect(x + 4, 160, x + 10, 164, K); rect(x + 5, 161, x + 9, 163, hex('#c8a040')); rect(x + 3, 169, x + 11, 174, hex('#f4ecd8')); disco(x + 7, 171.5, 1.5, hex(c)); });
  caja(124, 159, 196, 178, hex('#4a5068'), hex('#7a8098'), hex('#2a3044')); rect(130, 162, 182, 175, K); rect(131, 163, 181, 174, hex('#f4f0e4')); rect(131, 163, 181, 164, hex('#c8c4b4')); for (const x of [143, 156, 169]) rect(x, 163, x, 174, hex('#c8c4b4')); rect(186, 163, 192, 174, K); rect(187, 164, 191, 168, hex('#d83a3a'));
  caja(206, 162, 268, 178, hex('#3a3a44'), hex('#5a5a66'), null); ['#d83a3a', '#e8a030', '#f0c040', '#4a9a5a', '#3a8ac8', '#8a5ac8', '#e86a8a', '#8a5a3a'].forEach((c, k) => { const x = 209 + (k % 4) * 9, y = 164 + (k >> 2) * 7; rect(x, y, x + 7, y + 5, hex(c)); pset(x + 1, y + 1, hex('#ffffff')); }); rect(246, 164, 265, 176, hex('#e8e4d8')); disco(252, 170, 2, hex('#bfe0f0')); disco(259, 172, 2, hex('#f4c078'));
  caja(284, 150, 300, 178, hex('#9ac8d8'), hex('#d8f0f4'), hex('#6a98a8')); for (let k = 0; k < 5; k++) { linea(287 + k * 3, 150, 284 + k * 4, 124 + (k % 2) * 5, hex('#b08a54')); rect(283 + k * 4, 120 + (k % 2) * 5, 284 + k * 4, 124 + (k % 2) * 5, hex(['#2a2a34', '#d83a3a', '#3a8ac8', '#e8c040', '#2a2a34'][k])); }
  // en la pared de la derecha (bajo la esquina de Atom): la regla en T colgada y una balda con frascos
  rect(296, 54, 298, 112, K); rect(297, 55, 297, 111, hex('#e8d8a0')); rect(286, 52, 308, 56, K); rect(287, 53, 307, 55, hex('#c8a26a')); pset(297, 51, hex('#6a5434'));
  rect(280, 114, 316, 116, K); rect(281, 114, 315, 114, hex('#b08a54'));
  calma(hex('#d4c49f')); rect(18, 21, 172, 21, hex('#a89870'));
};
const p2 = (t) => {
  const { rect, pset, linea } = R;
  capa('tablero', tablero);
  const ORD = [[1, 0, 0], [2, 0, 1], [0, 0, 2], [1, 1, 3], [2, 1, 4]], pila = Math.round(4 * tramo(t, d(0.3), d(0.4)));
  const una = (c, r, tipo, dy = 0) => { const x = SLX(c), y = SLY(r) + dy; for (let k = pila; k > 0; k--) { rect(x + k, y - k, x + 56 + k, y + 50 - k, K); rect(x + k + 1, y - k + 1, x + 56 + k - 1, y + 50 - k - 1, k % 2 ? hex('#e8e0c8') : hex('#f4ecd8')); } lamina(x, y, tipo); };
  // la lámina que dibuja Moebius (abajo a la izquierda) está desde el principio; las demás llegan una tras otra
  una(0, 1, 5); { const n = Math.round(30 * tramo(t, P2, d(0.4))); for (let i = 0; i < n; i++) { pset(SLX(0) + 9 + i, SLY(1) + 43 - Math.round(Math.sin(i * 0.5) * 2), hex('#2a2a3a')); } }
  ORD.forEach(([c, r, tipo], k) => { const t0 = P2 + 0.35 + k * 0.22; if (t < t0) return; const e = Math.min(1, (t - t0) / 0.14); una(c, r, tipo, -Math.round((1 - e) * 14)); });
  // hojas sueltas que caen por delante del tablero mientras el contador corre
  R.recorte([14, 28, 268, 146]);
  for (let k = 0; k < 7; k++) { const u = (t - d(0.28) - k * 0.13) / 0.9; if (u < 0 || u > 1) continue; const x = Math.round(30 + k * 36 + Math.sin(u * 7 + k) * 8), y = Math.round(20 + u * 132), w = 5 + Math.round(Math.abs(Math.sin(u * 9 + k)) * 5); R.poligono([[x, y], [x + w, y - 2], [x + w + 2, y + 7], [x + 2, y + 9]], K); R.poligono([[x + 1, y + 1], [x + w, y - 1], [x + w + 1, y + 6], [x + 3, y + 8]], hex('#f4ecd8')); pset(x + 3, y + 3, hex(['#d83a3a', '#3a8ac8', '#e8a030'][k % 3])); pset(x + 4, y + 4, hex(['#d83a3a', '#3a8ac8', '#e8a030'][k % 3])); }
  R.recorte(null);
  // el contador de mano: sube hasta 3000
  { const n = Math.round(3000 * ease(tramo(t, d(0.275), d(0.356))) / 10) * 10; R.numero(String(n).padStart(4, '0'), 157, 173, { centro: true, color: hex('#1c2450'), sombra: false }); if (n > 0 && n < 3000 && Math.floor(t * 12) % 2) rect(187, 166, 191, 170, hex('#ff8a7a')); if (n >= 3000 && t < d(0.356) + 0.5) { destello(124, 160, 3, hex('#fff4a0')); destello(196, 160, 3, hex('#fff4a0')); } }
  // la mano de Giger (manga negra) trae dos láminas oscuras a la columna de la derecha
  const g1 = tramo(t, d(0.426), d(0.468)), r1 = tramo(t, d(0.475), d(0.5)), g2 = tramo(t, d(0.503), d(0.535)), r2 = tramo(t, d(0.56), P3 + 0.3);
  if (g1 >= 1) una(3, 1, 6); if (g2 >= 1) una(3, 0, 7);
  { const viaje = (g, ret, y0, y1, c, r, tipo) => { const m = Math.min(1, g / 0.6), wx = Math.round(lerp(lerp(340, 286, sale(m)), 344, ease(ret))), wy = Math.round(lerp(y0, y1, sale(m)));
      if (g < 1) { const v = ease(Math.max(0, (g - 0.6) / 0.4)); lamina(Math.round(lerp(wx - 46, SLX(c), v)), Math.round(lerp(wy - 24, SLY(r), v)), tipo); }
      if (wx < 332) T.brazo(R, 338, wy + 26, wx, wy, '#2e2e3a', -1, { codo: [Math.min(336, wx + 26), wy + 20] }); };
    if (g2 > 0) viaje(g2, r2, 96, 56, 3, 0, 7); else if (g1 > 0) viaje(g1, r1, 140, 114, 3, 1, 6); }
  // la mano de Moebius (manga azul) dibuja con su lápiz y se retira cuando llega Giger
  { const fuera = ease(tramo(t, d(0.4), d(0.44))), n = 30 * tramo(t, P2, d(0.4)), wx = Math.round(lerp(SLX(0) + 2 + n + Math.sin(t * 9) * 1.5, -34, fuera)), wy = Math.round(lerp(SLY(1) + 50 + Math.cos(t * 7) * 1.5, 150, fuera));
    if (wx > -30) { linea(wx + 8, wy - 2, wx + 5, wy - 9, K); linea(wx + 9, wy - 2, wx + 6, wy - 9, hex('#e8c040')); pset(wx + 5, wy - 10, hex('#2a2a3a')); T.brazo(R, wx - 46, wy + 34, wx, wy, '#3a5a9a', 1, { codo: [wx - 26, wy + 26] }); } }
};

// ── plano 3: la mesa del estudio, de cerca (gag 7) ──
const mesaCerca = () => {
  const { rect, pset, linea, disco } = R;
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) pset(x, y, hh(x >> 1, y >> 1, 110) < 0.06 ? hex('#d2c29c') : x % 20 < 10 ? hex('#e4d4b2') : hex('#dccca8'));
  rect(0, 96, 319, 96, K); rect(0, 97, 319, 98, hex('#b08a54')); madera(0, 99, 319, 117, hex('#96703f'), hex('#7a5a30'), hex('#b08a54'), 14); for (let x = 20; x < 320; x += 50) { rect(x, 101, x + 40, 115, hex('#86603a')); rect(x, 101, x + 40, 101, hex('#6a4a26')); rect(x, 101, x, 115, hex('#6a4a26')); rect(x + 1, 115, x + 40, 115, hex('#a88048')); }
  // el visillo del balcón, a la izquierda, y tres láminas clavadas
  for (let y = 0; y < 118; y++) { const w = 20 + Math.round(Math.sin(y * 0.07) * 3 + y / 30); for (let i = 0; i < w; i++) pset(i, y, i === w - 1 ? hex('#b8b4a8') : (i + (y >> 3)) % 4 === 0 ? hex('#d8d4c8') : hex('#f4f0e8')); }
  rect(0, 23, 319, 23, hex('#a89870')); rect(0, 24, 319, 24, hex('#f0e6cc'));
  // el guion gráfico clavado en tira: ocho viñetas (dunas, lunas, un cohete nuestro)
  rect(98, 72, 214, 92, K); rect(99, 73, 213, 91, hex('#f4ecd8')); for (let k = 0; k < 8; k++) { const x = 101 + k * 14; rect(x, 75, x + 11, 86, K); for (let j = 1; j < 11; j++) for (let i = 1; i < 11; i++) { const du = 5 + Math.round(Math.sin(i * 0.5 + k * 1.3) * 2); pset(x + i, 75 + j, j > du + 2 ? hex('#b06a2c') : j > du ? hex('#e09848') : k % 3 === 1 ? hex('#2a2a5a') : k % 3 === 2 ? hex('#bfe0f0') : hex('#f4c078')); } pset(x + 3 + (k % 4), 77, hex('#fff4d0')); rect(x + 1, 88, x + 9, 88, hex('#c8c0a8')); } for (const x of [104, 156, 208]) pset(x, 73, hex('#d83a3a'));
  for (const [x, y, c1, c2] of [[40, 30, '#f4c078', '#b06a2c'], [72, 42, '#bfe0f0', '#d83a3a'], [94, 28, '#1c2450', '#f0c040']]) { rect(x, y, x + 24, y + 22, K); rect(x + 1, y + 1, x + 23, y + 21, hex('#f4ecd8')); rect(x + 3, y + 4, x + 21, y + 18, hex(c1)); disco(x + 12, y + 11, 4, hex(c2)); rect(x + 3, y + 15, x + 21, y + 18, hex(c2)); pset(x + 12, y + 2, hex('#d83a3a')); }
  // el reloj de pared (las agujas, en la escena) y la balda con libros
  disco(236, 60, 19, K); disco(236, 60, 18, hex('#8a5a3a')); disco(236, 60, 15, hex('#f4ecd8')); for (let k = 0; k < 12; k++) { const an = k / 12 * 6.283; rect(Math.round(236 + Math.cos(an) * 13), Math.round(60 + Math.sin(an) * 13), Math.round(236 + Math.cos(an) * 13) + (k % 3 === 0 ? 1 : 0), Math.round(60 + Math.sin(an) * 13) + (k % 3 === 0 ? 1 : 0), K); }
  rect(268, 84, 319, 87, K); rect(269, 85, 319, 86, hex('#b08a54')); ['#8a2a2a', '#2a5a8a', '#c8a040', '#3a6a4a', '#5a3a6a', '#d8d0bc'].forEach((c, k) => { const x = 272 + k * 8, hgt = 20 + (k * 7) % 9; rect(x, 84 - hgt, x + 6, 84, K); rect(x + 1, 85 - hgt, x + 5, 83, hex(c)); rect(x + 1, 88 - hgt, x + 5, 89 - hgt, hex('#f0d880')); });
  // el tablero de la mesa: madera clara, hojas sueltas, cercos de taza y manchas de tinta
  madera(0, 118, 319, 179, hex('#c89858'), hex('#a87a3c'), hex('#dcb070'), 15); rect(0, 118, 319, 118, K); rect(0, 119, 319, 120, hex('#ecc888'));
  for (const [x, y, w] of [[8, 162, 34], [270, 166, 40], [196, 124, 26]]) { R.poligono([[x, y], [x + w, y - 3], [x + w + 6, y + 9], [x + 5, y + 12]], hex('#a87a3c')); R.poligono([[x - 1, y - 1], [x + w - 1, y - 4], [x + w + 5, y + 8], [x + 4, y + 11]], hex('#f4ecd8')); for (let k = 0; k < 3; k++) linea(x + 5 + k, y + 1 + k * 3, x + w - 2 + k, y - 1 + k * 3, hex('#c8c0a8')); }
  for (let k = 0; k < 26; k++) { const an = k / 26 * 6.283; pset(Math.round(250 + Math.cos(an) * 8), Math.round(170 + Math.sin(an) * 4), hex('#9a6c34')); } for (const [x, y] of [[112, 166], [116, 169], [108, 171], [82, 164]]) { pset(x, y, hex('#1c2450')); pset(x + 1, y, hex('#1c2450')); }
  calma(hex('#e0d0ad'));
  // el charco de luz del flexo
  for (let y = 122; y < 176; y++) for (let x = 20; x < 150; x++) { const dd = Math.hypot((x - 78) / 1.8, y - 150); if (dd < 30 && hh(x, y, 111) > dd / 30) pset(x, y, mez(R.pget(x, y), hex('#fff0b0'), 0.3)); }
};
const p3 = (t) => {
  const { rect, pset, linea, disco } = R;
  capa('mesaCerca', mesaCerca);
  const cae = tramo(t, d(0.869), d(0.95)), golpe = d(0.95), e = t - golpe, bote = (k, amp) => e < 0 ? 0 : -Math.round(amp * Math.abs(Math.sin(e * 8 + k * 0.7)) * Math.max(0, 1 - e / (0.7 + k * 0.08)));
  // el reloj: las agujas dan vueltas a toda prisa mientras dice «diez horas»
  { const v = tramo(t, d(0.62), d(0.78)), am = -1.57 + t * 0.6 + ease(v) * 6.283 * 10, ah = -0.5 + ease(v) * 6.283 * 10 / 12; linea(236, 60, Math.round(236 + Math.cos(am) * 12), Math.round(60 + Math.sin(am) * 12), K); linea(236, 60, Math.round(236 + Math.cos(ah) * 7), Math.round(60 + Math.sin(ah) * 7), K); linea(237, 60, Math.round(237 + Math.cos(ah) * 7), Math.round(60 + Math.sin(ah) * 7), K); disco(236, 60, 1.5, hex('#d83a3a'));
    if (v > 0 && v < 1) for (let k = 0; k < 6; k++) { const an = am - 0.3 - k * 0.25; velo(Math.round(236 + Math.cos(an) * 12), Math.round(60 + Math.sin(an) * 12), K, 0.4 - k * 0.06); } }
  const diez = d(0.749); if (t >= diez && cae < 0.5) { const s2 = Math.min(1, (t - diez) / 0.25), yy = 62 - Math.round(Math.sin(s2 * Math.PI) * 4); R.icono('reloj', 134, yy - 15, hex('#3a2418'), hex('#f8f0d8'), 2); R.numero('10', 176, yy, { tam: 16, centro: true }); }
  // la película que sale de la bobina y cruza la mesa sin acabarse nunca
  { const len = Math.round(210 * tramo(t, P3 + 0.15, d(0.8))), y0 = 139 + bote(2, 5); for (let i = 0; i < len; i++) { const x = 126 + i, y = y0 + Math.round(Math.sin(i * 0.07 + t * 3) * 3 + (i > 150 ? (i - 150) * 0.12 : 0)); if (x > 319) break; rect(x, y - 3, x, y + 3, K); pset(x, y - 2, (i + Math.floor(t * 40)) % 4 < 2 ? hex('#f4ecd8') : hex('#2a2a34')); pset(x, y + 2, (i + Math.floor(t * 40)) % 4 < 2 ? hex('#f4ecd8') : hex('#2a2a34')); const f = (i + Math.floor(t * 40)) % 10; if (f > 1) { pset(x, y - 1, hex(f < 6 ? '#f4c078' : '#e09848')); pset(x, y, hex('#e09848')); pset(x, y + 1, hex('#b06a2c')); } } }
  // la bobina, que gira
  { const dy = bote(1, 6), cx = 112, cy = 130 + dy; disco(cx, cy, 16, K); disco(cx, cy, 15, hex('#8a90a4')); disco(cx, cy, 11, hex('#2a2a34')); for (let b = 0; b < 3; b++) { const an = t * 5 + b * 2.094; disco(Math.round(cx + Math.cos(an) * 8), Math.round(cy + Math.sin(an) * 8), 3, hex('#c89858')); } disco(cx, cy, 2, hex('#c8ccd8')); rect(cx - 6, cy + 15, cx + 6, cy + 17, K); rect(cx - 1, cy + 12, cx + 1, cy + 16, hex('#5a6074')); }
  // el flexo, el tarro de pinceles y el tintero
  { const dy = bote(0, 4); rect(16, 143 + dy, 44, 149 + dy, K); rect(17, 144 + dy, 43, 148 + dy, hex('#3a6a4a')); rect(17, 144 + dy, 43, 144 + dy, hex('#6a9a7a')); linea(30, 143 + dy, 22, 102 + dy, K); linea(31, 143 + dy, 23, 102 + dy, hex('#8a90a4')); linea(22, 102 + dy, 54, 84 + dy, K); linea(22, 103 + dy, 54, 85 + dy, hex('#8a90a4')); disco(22, 102 + dy, 2, hex('#c8a040')); R.poligono([[50, 78 + dy], [62, 84 + dy], [72, 104 + dy], [48, 98 + dy]], K); R.poligono([[52, 81 + dy], [61, 86 + dy], [69, 102 + dy], [50, 97 + dy]], hex('#3a6a4a')); linea(51, 98 + dy, 70, 103 + dy, hex('#fff4c8')); }
  { const dy = bote(3, 7); caja(64, 128 + dy, 80, 152 + dy, hex('#9ac8d8'), hex('#d8f0f4'), hex('#6a98a8')); for (let k = 0; k < 5; k++) { linea(67 + k * 3, 128 + dy, 62 + k * 5, 104 + dy + (k % 2) * 4 + (e > 0 ? bote(k, 3) : 0), hex('#b08a54')); rect(61 + k * 5, 99 + dy + (k % 2) * 4, 63 + k * 5, 104 + dy + (k % 2) * 4, hex(['#d83a3a', '#2a2a34', '#3a8ac8', '#e8c040', '#4a9a5a'][k])); } }
  { const dy = bote(4, 9); caja(90, 142 + dy, 104, 158 + dy, hex('#1c2450'), hex('#3a4a8a'), null); rect(93, 138 + dy, 101, 142 + dy, K); rect(94, 139 + dy, 100, 141 + dy, hex('#c8a040')); rect(93, 147 + dy, 101, 153 + dy, hex('#f4ecd8'));
    if (e > 0 && e < 0.9) for (let k = 0; k < 7; k++) { const vx = (k - 3) * 9, x = Math.round(97 + vx * e), y = Math.round(138 - (60 + k * 6) * e + 130 * e * e); if (y < 160) { pset(x, y, hex('#1c2450')); pset(x + 1, y, hex('#1c2450')); pset(x, y + 1, hex('#3a4a8a')); } } }
  // la taza (se derrama una gota) y el teléfono de disco, cuyo auricular salta
  { const dy = bote(5, 8); caja(222, 138 + dy, 240, 154 + dy, hex('#f4f0e8'), hex('#ffffff'), hex('#c8c4b8')); rect(240, 142 + dy, 245, 150 + dy, K); rect(241, 144 + dy, 243, 148 + dy, hex('#c89858')); rect(223, 143 + dy, 239, 144 + dy, hex('#d83a3a')); rect(224, 139 + dy, 238, 140 + dy, hex('#5a3418'));
    for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1; velo(231 + Math.round(Math.sin(t * 1.5 + k * 2 + u * 5) * 2), 136 - Math.round(u * 14), hex('#ffffff'), 0.6 - u * 0.5); } }
  { const dy = bote(6, 6), au = bote(7, 12); R.poligono([[258, 158 + dy], [262, 138 + dy], [300, 138 + dy], [306, 158 + dy]], K); R.poligono([[260, 157 + dy], [263, 139 + dy], [299, 139 + dy], [304, 157 + dy]], hex('#7a8a6a')); linea(264, 140 + dy, 298, 140 + dy, hex('#a8b898')); disco(281, 148 + dy, 7, K); disco(281, 148 + dy, 6, hex('#f4ecd8')); for (let k = 0; k < 8; k++) { const an = k / 8 * 6.283 + (e > 0 && e < 0.8 ? e * 8 : 0); pset(Math.round(281 + Math.cos(an) * 4), Math.round(148 + dy + Math.sin(an) * 4), K); } disco(281, 148 + dy, 1, hex('#7a8a6a'));
    rect(254, 129 + dy + au, 308, 136 + dy + au, K); rect(255, 130 + dy + au, 307, 135 + dy + au, hex('#5a6a4a')); rect(255, 130 + dy + au, 307, 130 + dy + au, hex('#8a9a7a')); rect(254, 129 + dy + au, 264, 140 + dy + au, K); rect(255, 130 + dy + au, 263, 139 + dy + au, hex('#5a6a4a')); rect(298, 129 + dy + au, 308, 140 + dy + au, K); rect(299, 130 + dy + au, 307, 139 + dy + au, hex('#5a6a4a')); }
  // un lápiz que rueda con el golpe
  { const rx = e > 0 ? Math.round(Math.min(40, e * 50)) : 0; rect(150 + rx, 171, 176 + rx, 173, K); rect(151 + rx, 172, 172 + rx, 172, hex('#e8c040')); pset(175 + rx, 172, hex('#e8d0a0')); }
  // el guion: la sombra crece, cae como una guía de teléfonos y todo da un bote
  if (cae > 0) { const rxs = Math.round(10 + cae * 34); for (let j = -5; j <= 5; j++) for (let i = -rxs; i <= rxs; i++) if ((i / rxs) ** 2 + (j / 5) ** 2 <= 1 && (i + j) % 2 === 0) velo(164 + i, 170 + j, K, 0.2 + cae * 0.25);
    const y = cae < 1 ? Math.round(lerp(-30, 170, cae * cae)) : 170 + bote(9, 5) + (e < 0.08 ? 2 : 0); PZ.listin(R, 164, y, { s: 3 });
    if (e > 0 && e < 0.6) { for (const sgn of [-1, 1]) for (let k = 0; k < 9; k++) { const x = Math.round(164 + sgn * (42 + e * (30 + k * 9))), yy = Math.round(168 - Math.sin(Math.min(1, e * 2) * Math.PI) * (4 + k * 2)); velo(x, yy, hex('#f4ecd8'), 0.8 - e); velo(x + sgn, yy - 1, hex('#f4ecd8'), 0.6 - e * 0.8); velo(x, yy - 2, hex('#f4ecd8'), 0.4 - e * 0.6); }
      for (let k = 0; k < 8; k++) { const an = -0.3 - k * 0.37; linea(Math.round(164 + Math.cos(an) * (48 + e * 20)), Math.round(150 + Math.sin(an) * (26 + e * 20)), Math.round(164 + Math.cos(an) * (56 + e * 30)), Math.round(150 + Math.sin(an) * (32 + e * 30)), hex('#fff4a0')); } }
    // dos hojas que saltan por los aires y vuelven a caer
    if (e > 0 && e < 1.1) for (let k = 0; k < 3; k++) { const x = Math.round([70, 216, 250][k] + (k - 1) * e * 14), y = Math.round(132 - (70 + k * 14) * e + 80 * e * e), w = 8 + Math.round(Math.abs(Math.sin(e * 10 + k)) * 8); if (y < 150) { R.poligono([[x, y], [x + w, y - 3], [x + w + 3, y + 9], [x + 3, y + 12]], K); R.poligono([[x + 1, y + 1], [x + w, y - 2], [x + w + 2, y + 8], [x + 4, y + 11]], hex('#f4ecd8')); } } }
};

// ── plano 4: la oficina de Hollywood; no hay dinero ──
const OF = { encuadre: 'plato', camara: 'oficina', lugar: 'hollywood' };
const p4 = (t) => {
  const { rect, pset } = R;
  T.cine(R, t, OF);
  const sac = tramo(t, P4 + 0.15, l(0.06)), no = l(0.074), seva = tramo(t, l(0.135), P5 + 0.5);
  // los tres carteles, tachados uno tras otro: ningún estudio pone el resto
  [[110, 32], [148, 32], [186, 32]].forEach(([x, y], k) => { const t0 = no + k * 0.28; if (t < t0) return; for (let j = y; j <= y + 52; j++) for (let i = x; i <= x + 29; i++) if ((i + j) % 2 === 0) velo(i, j, K, 0.55); const s2 = t < t0 + 0.12 ? 4 : 3; R.icono('X', x + 15 - Math.round(3.5 * s2), y + 26 - Math.round(3.5 * s2), hex('#ff4a3a'), K, s2); });
  R.actor(EL.productorHollywood, 150, 147, t, { dir: t > no && t < no + 1 ? (Math.floor((t - no) * 6) % 2 ? 1 : -1) : -1, enfado: t > no, habla: t > no && Math.sin(t * 10) > 0, dedo: t > l(0.13) });
  T.cineDelante(R, t, OF);
  // el productor francés (se encoge) y Jodorowsky, que sacude la hucha: no cae nada, solo una polilla
  const fx = Math.round(lerp(36, -20, tramo(t, l(0.11), P5 + 0.2))); R.actor(EL.productorFrances, fx, 158, t, { dir: fx < 36 ? -1 : 1, anda: fx < 36, triste: t > no, sorpresa: t > no && t < no + 0.4 });
  const jx = Math.round(lerp(62, 4, seva)), jo = R.actor(EL.jodorowsky, jx, 158, t, { dir: seva > 0 ? -1 : 1, anda: seva > 0 && seva < 1, sostiene: sac < 1 ? [jx + 21, 136] : false, triste: sac >= 1, brazos: false });
  if (sac < 1) { const sx = Math.round(Math.sin(t * 22) * 2), sy = Math.round(Math.abs(Math.sin(t * 11)) * 3); PZ.hucha(R, jo.mano[0] + 8 + sx, jo.mano[1] + 6 + sy, {}); if (sac > 0.25) { const u = (sac - 0.25) / 0.75, mx = jo.mano[0] + 10 + Math.round(u * 30 + Math.sin(t * 9) * 4), my = jo.mano[1] + 8 - Math.round(u * 34 + Math.cos(t * 13) * 3), al = Math.floor(t * 16) % 2; pset(mx, my, hex('#8a8494')); pset(mx - 1, my - (al ? 1 : 0), hex('#c8c4d0')); pset(mx + 1, my - (al ? 1 : 0), hex('#c8c4d0')); pset(mx - 2, my - (al ? 2 : 0), hex('#c8c4d0')); pset(mx + 2, my - (al ? 2 : 0), hex('#c8c4d0')); } }
  else { PZ.hucha(R, 100, 160, { vacia: true }); R.icono('bolsa', 88, 124, hex('#f0c860'), K, 1); R.numero('0', 102, 132, { color: hex('#ff6a5a') }); }
  T.tinte(R, 0, 179, [36, 44, 96], 0.2);
};

// ── plano 5: el almacén: la cámara tapada y el libro que quedó ──
const almacen = () => {
  const { rect, pset, linea, disco } = R;
  // la pared de ladrillo con un tramo enlucido, la tubería y el cuadro eléctrico
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const f = (y / 8 | 0), bx = (x + (f % 2) * 10) % 20, yeso = hh(x / 26 | 0, y / 22 | 0, 120) < 0.3 && x < 270; pset(x, y, yeso ? (hh(x >> 1, y >> 1, 121) < 0.1 ? hex('#5a5462') : hex('#646070')) : y % 8 === 0 || bx === 0 ? hex('#2e2630') : hh((x + (f % 2) * 10) / 20 | 0, f, 122) < 0.3 ? hex('#5e4444') : hh(x >> 1, y >> 1, 123) < 0.07 ? hex('#463438') : hex('#523c3e')); }
  rect(0, 24, 262, 27, K); rect(0, 25, 262, 26, hex('#6a7088')); rect(0, 25, 262, 25, hex('#8a90a8')); rect(258, 24, 262, 150, K); rect(259, 27, 261, 150, hex('#6a7088'));
  caja(18, 40, 40, 70, hex('#6a7088'), hex('#8a90a8'), hex('#4a5068')); rect(22, 44, 36, 52, hex('#3a3e4e')); for (let k = 0; k < 3; k++) rect(23 + k * 5, 56, 25 + k * 5, 64, hex('#2a2a34')); linea(29, 70, 29, 150, hex('#2a2a34'));
  // el ventanuco alto con barrotes y su luz fría
  rect(170, 30, 214, 62, K); for (let y = 32; y <= 60; y++) for (let x = 172; x <= 212; x++) pset(x, y, (y - 32) / 28 + (hh(x, y, 124) - 0.5) * 0.3 > 0.5 ? hex('#8ab0d0') : hex('#a8c8e0')); for (const x of [182, 192, 202]) rect(x, 31, x + 1, 61, K); rect(168, 62, 216, 64, hex('#646070'));
  for (let y = 64; y < 176; y++) for (let x = 60; x < 230; x++) { const cx = 192 - (y - 62) * 0.55, w = 20 + (y - 62) * 0.22; if (Math.abs(x - cx) < w && (x + y) % 2 === 0 && hh(x, y, 125) < 0.55) pset(x, y, mez(R.pget(x, y), hex('#b8d0e8'), 0.22)); }
  // el suelo de cemento: juntas, manchas y un charco de luz
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 150 ? K : (x + (y - 150) * 2) % 64 === 0 || y === 166 ? hex('#3a3640') : hh(x >> 2, y >> 1, 126) < 0.12 ? hex('#4e4a56') : hh(x, y, 127) < 0.05 ? hex('#6a6672') : hex('#565260'));
  for (let y = 152; y < 178; y++) for (let x = 60; x < 180; x++) { const cx = 192 - (y - 62) * 0.55; if (Math.abs(x - cx) < 44 && (x + y) % 2 === 0) pset(x, y, mez(R.pget(x, y), hex('#b8d0e8'), 0.25)); }
  // un decorado enrollado y una escalera apoyados a la izquierda
  for (const [x0, c] of [[6, '#b06a2c'], [14, '#3a6a8a']]) { R.poligono([[x0, 160], [x0 + 8, 160], [x0 + 20, 62], [x0 + 12, 62]], K); R.poligono([[x0 + 1, 159], [x0 + 7, 159], [x0 + 19, 63], [x0 + 13, 63]], hex(c)); for (let k = 0; k < 6; k++) linea(x0 + 2 + k * 2, 150 - k * 15, x0 + 8 + k * 2, 146 - k * 15, mez(hex(c), K, 0.35)); }
  // cajones: el de la claqueta, el del libro y uno al fondo, con sus tablas y sus clavos
  const cajon = (x0, y0, x1, y1, k) => { rect(x0, y0, x1, y1, K); madera(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#96703f'), hex('#7a5a30'), hex('#b08a54'), 16 + k); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 3, hex('#b89058')); rect(x0 + 1, y1 - 3, x1 - 1, y1 - 1, hex('#6e4e28')); for (let x = x0 + 12; x < x1 - 4; x += 12) rect(x, y0 + 4, x, y1 - 4, hex('#5e4220')); linea(x0 + 2, y0 + 4, x1 - 2, y1 - 4, hex('#6e4e28')); for (const [x, y] of [[x0 + 3, y0 + 2], [x1 - 3, y0 + 2], [x0 + 3, y1 - 2], [x1 - 3, y1 - 2]]) pset(x, y, hex('#c8ccd8')); };
  cajon(126, 132, 180, 168, 0); cajon(208, 136, 300, 172, 1); cajon(228, 108, 262, 136, 2);
  // un foco apagado en su trípode, al fondo, y cables por el suelo
  linea(112, 150, 118, 112, K); linea(124, 150, 118, 112, K); rect(110, 100, 126, 112, K); rect(111, 101, 125, 111, hex('#3a3e4e')); rect(111, 101, 125, 102, hex('#5a6074')); disco(118, 106, 3, hex('#6a7088'));
  for (let i = 0; i < 120; i++) { const x = 40 + i, y = 174 + Math.round(Math.sin(i * 0.09) * 3); pset(x, y, K); }
  calma(hex('#523c3e'));
  // telarañas en el rincón
  for (let i = 0; i < 22; i++) { pset(i, 28 + (i >> 1), hex('#8a8898')); pset(i >> 1, 28 + i, hex('#8a8898')); pset(i, 28 + i, hex('#8a8898')); if (i % 6 === 5) linea(i, 28 + (i >> 1), i >> 1, 28 + i, hex('#6a6878')); }
};
const p5 = (t) => {
  const { rect, pset, linea } = R;
  capa('almacen', almacen);
  const cae = tramo(t, P5 - 0.2, l(0.25)), baja = tramo(t, l(0.23), l(0.34)), abre = ease(tramo(t, l(0.35), l(0.44))), brilla = l(0.487);
  // la luz cálida de una puerta que se abre a la derecha: una cuña que crece hasta el libro
  if (abre > 0) { const x0 = Math.round(lerp(319, 196, abre)); for (let y = 60; y < 180; y++) { const xa = Math.round(x0 + (y < 150 ? (150 - y) * 0.5 : -(y - 150) * 1.2)); for (let x = Math.max(0, xa); x < 320; x++) if ((x + y) % 2 === 0 && !(x >= 278 && y < 46)) velo(x, y, hex('#ffd890'), 0.34); } }
  // la cámara de cine y la sábana que le cae encima
  PZ.camaraCine(R, 78, 170, { s: 2 });
  { const dy = Math.round(lerp(-70, 0, cae * cae)), on = cae >= 1 ? Math.sin((t - l(0.25)) * 9) * Math.max(0, 1 - (t - l(0.25)) * 1.6) * 3 : 0, x = 78, yb = 170 + dy;
    const pts = [[x - 42, yb - 6], [x - 38, yb - 58 - on], [x - 24, yb - 84], [x + 2, yb - 91 + on], [x + 26, yb - 82], [x + 38, yb - 52 + on], [x + 44, yb - 5], [x + 30, yb - 10], [x + 15, yb - 4], [x, yb - 11], [x - 15, yb - 5], [x - 28, yb - 11]];
    R.poligono(pts, hex('#e8e4d8')); for (let k = 0; k < pts.length; k++) { const [ax, ay] = pts[k], [bx2, by2] = pts[(k + 1) % pts.length]; linea(Math.round(ax), Math.round(ay), Math.round(bx2), Math.round(by2), K); }
    for (const [ax, ay, bx2, by2] of [[-24, -80, -30, -12], [-6, -86, -10, -14], [10, -86, 14, -10], [26, -78, 32, -12], [-36, -50, -40, -10]]) linea(x + ax, yb + ay, x + bx2, yb + by2, hex('#b8b4a8'));
    for (const [ax, ay, bx2, by2] of [[-22, -80, -28, -14], [-4, -86, -8, -16]]) linea(x + ax + 1, yb + ay, x + bx2 + 1, yb + by2, hex('#ffffff'));
    if (cae >= 1 && t < l(0.25) + 0.5) for (let k = 0; k < 8; k++) { const u = (t - l(0.25)) * 2; velo(Math.round(x - 44 - u * 14 + k * 2), yb - 2 - (k % 3) - Math.round(u * 4), hex('#d8d4c8'), 0.7 - u * 0.6); velo(Math.round(x + 46 + u * 14 - k * 2), yb - 2 - (k % 3) - Math.round(u * 4), hex('#d8d4c8'), 0.7 - u * 0.6); } }
  // la claqueta con su telaraña sobre el cajón, y la araña que baja por su hilo
  PZ.claqueta(R, 153, 132, { s: 2, telarana: true });
  { const y = Math.round(lerp(28, 84, ease(baja)) + Math.sin(t * 2.4) * 2); linea(160, 27, 160, y, hex('#a8a8b8')); R.disco(160, y + 2, 2, K); for (const sgn of [-1, 1]) for (let k = 0; k < 3; k++) { const m = Math.round(Math.sin(t * 10 + k) * 1); pset(160 + sgn * 3, y + k + m, K); pset(160 + sgn * 4, y + 1 + k + m, K); } pset(159, y + 2, hex('#d83a3a')); }
  // el libro enorme de dibujos, sobre su cajón: en penumbra hasta que la luz lo encuentra
  PZ.libroDibujos(R, 254, 136, { s: 2 });
  if (abre < 1) for (let y = 88; y <= 136; y++) for (let x = 216; x <= 292; x++) if ((x + y) % 2 === 0) velo(x, y, hex('#1e1a28'), 0.6 * (1 - abre));
  if (t >= brilla) { const e = t - brilla; for (const [dx, dy, r] of [[-36, -44, 4], [30, -50, 5], [40, -14, 3], [-20, -8, 3], [4, -56, 4]]) if (Math.sin(e * 6 + dx) > -0.3) destello(254 + dx, 136 + dy - Math.round(Math.sin(e * 3 + dy) * 2), r, hex('#fff4a0'));
    for (let k = 0; k < 3; k++) { const u = ((e * 0.5 + k / 3) % 1), x = Math.round(240 + k * 14 + Math.sin(e * 3 + k) * 5), y = Math.round(92 - u * 30); if (!(x >= 276 && y < 46)) { rect(x, y, x + 5, y + 6, K); rect(x + 1, y + 1, x + 4, y + 5, hex('#f4ecd8')); rect(x + 2, y + 2, x + 3, y + 4, hex(['#d83a3a', '#3a8ac8', '#e8a030'][k])); } } }
  // motas de polvo en la luz del ventanuco
  for (let k = 0; k < 18; k++) { const u = (hh(k, 1, 128) + t * (0.02 + hh(k, 2, 128) * 0.03)) % 1, y = Math.round(66 + u * 100), x = Math.round(192 - (y - 62) * 0.55 + (hh(k, 3, 128) - 0.5) * 40 + Math.sin(t * 0.7 + k) * 3); if (Math.sin(t * 2 + k * 1.9) > 0.2) velo(x, y, hex('#f0f8ff'), 0.7); }
};

// ── plano 6: la subasta de París, 2021 ──
const p6 = (t) => {
  const u = tramo(t, P6 + 0.3, P7), o = { encuadre: 'subasta', camara: 'general', cifra: Math.round(lerp(300000, 1900000, u) / 50000) * 50000, puja: 0.1 + u * 0.6, paletas: 0.2 + u * 0.7, lleno: 0.9 };
  const g = T.salas(R, t, o);
  PZ.libroDibujos(R, g.pedestal[0], g.pedestal[1], {});
  if (Math.sin(t * 5) > 0.5) destello(g.pedestal[0] + 14, g.pedestal[1] - 22, 2, hex('#fff4a0'));
  R.actor(EL.subastadorDU, g.tribuna[0], g.tribuna[1], t, { dir: -1, habla: Math.sin(t * 9) > 0, dedo: Math.floor(t * 1.4) % 2 === 0 });
  T.salasDelante(R, t, o);
};

// ── plano 7: la tribuna de cerca; la cifra y el mazo ──
const tribuna = () => {
  const { rect, pset, linea, disco } = R;
  // la boiserie clara con sus molduras y casetones
  for (let y = 0; y < 122; y++) for (let x = 0; x < 320; x++) pset(x, y, hh(x >> 1, y >> 2, 130) < 0.06 ? hex('#ddd4bc') : hex('#e8e0cc'));
  for (const x0 of [6, 112, 218]) { for (const [dd, c] of [[0, '#b8ae94'], [1, '#f8f4e6'], [5, '#cfc6ac'], [6, '#f8f4e6']]) { for (let x = x0 + dd; x <= x0 + 96 - dd; x++) { pset(x, 24 + dd, hex(c)); pset(x, 116 - dd, hex(c)); } for (let y = 24 + dd; y <= 116 - dd; y++) { pset(x0 + dd, y, hex(c)); pset(x0 + 96 - dd, y, hex(c)); } } }
  calma(hex('#e8e0cc'));
  // la pantalla de la sala: marco negro y puntos apagados
  rect(52, 28, 244, 82, K); rect(54, 30, 242, 80, hex('#141a28')); for (let y = 32; y < 80; y += 2) for (let x = 56; x < 242; x += 2) if (hh(x, y, 131) < 0.4) pset(x, y, hex('#1c2436')); rect(54, 30, 242, 30, hex('#3a4458')); rect(138, 82, 158, 86, hex('#2a3044'));
  // un aplique de pared a la izquierda y el cordón de terciopelo
  rect(26, 58, 30, 70, hex('#a88430')); R.poligono([[20, 58], [36, 58], [33, 44], [23, 44]], hex('#f4e8c0')); rect(22, 57, 34, 58, hex('#c8a040')); for (let y = 36; y < 80; y++) for (let x = 8; x < 50; x++) { const dd = Math.hypot(x - 28, y - 50); if (dd < 20 && hh(x, y, 132) > dd / 20 + 0.2) pset(x, y, hex('#f6ecc8')); }
  // el tablero de la tribuna y su frente de casetones
  rect(0, 120, 319, 121, K); madera(0, 122, 319, 129, hex('#a87a44'), hex('#8a5e30'), hex('#c89a5c'), 17); rect(0, 122, 319, 122, hex('#dab478')); rect(0, 130, 319, 130, K);
  madera(0, 131, 319, 179, hex('#6a4526'), hex('#543418'), hex('#7e5630'), 18);
  for (const x0 of [10, 114, 218]) { rect(x0, 136, x0 + 92, 176, hex('#7e5630')); rect(x0, 136, x0 + 92, 136, hex('#4a2e18')); rect(x0, 136, x0, 176, hex('#4a2e18')); rect(x0 + 1, 176, x0 + 92, 176, hex('#9a6e40')); rect(x0 + 92, 137, x0 + 92, 176, hex('#9a6e40')); disco(x0 + 46, 156, 9, hex('#4a2e18')); disco(x0 + 46, 156, 8, hex('#c8a040')); disco(x0 + 46, 156, 5, hex('#7e5630')); rect(x0 + 42, 156, x0 + 50, 156, hex('#f0d880')); rect(x0 + 46, 152, x0 + 46, 160, hex('#f0d880')); }
  // sobre la tribuna: el atril del libro, el flexo de latón, el vaso de agua y el taco redondo
  R.poligono([[22, 120], [112, 120], [104, 112], [30, 112]], K); R.poligono([[24, 119], [110, 119], [103, 113], [31, 113]], hex('#8a2a3a')); rect(30, 112, 104, 112, hex('#b84a5a'));
  rect(146, 100, 148, 120, hex('#a88430')); rect(132, 98, 148, 100, hex('#a88430')); R.poligono([[124, 100], [140, 100], [137, 107], [127, 107]], hex('#2a5a3a')); rect(128, 108, 136, 108, hex('#fff4c0')); rect(140, 118, 154, 120, hex('#c8a040'));
  for (let y = 109; y < 120; y++) for (let x = 120; x < 146; x++) if ((x + y) % 2 === 0 && Math.abs(x - 132) < (y - 104) * 0.9) pset(x, y, mez(R.pget(x, y), hex('#fff0b0'), 0.4));
  caja(170, 106, 180, 120, hex('#d8ecf4'), hex('#ffffff'), null); rect(171, 111, 179, 119, hex('#a8d0e4'));
  rect(222, 116, 270, 120, K); rect(223, 117, 269, 119, hex('#8e6a3c')); rect(223, 117, 269, 117, hex('#c89a5c')); R.poligono([[192, 120], [214, 120], [210, 114], [196, 114]], K); rect(197, 115, 209, 119, hex('#e8dcc0')); rect(197, 115, 209, 115, hex('#c8343a'));
};
// el mazo de cerca: el mango sale de la muñeca (wx, wy) con ángulo b (0 = tumbado hacia la izquierda; > 0, levantado)
const mazoCerca = (wx, wy, b) => {
  const ux = -Math.cos(b), uy = -Math.sin(b), nx = -uy, ny = ux, ex = wx + ux * 44, ey = wy + uy * 44, rot = (i, j) => [Math.round(ex + ux * i + nx * j), Math.round(ey + uy * i + ny * j)];
  for (let w = -2; w <= 2; w++) R.linea(Math.round(wx + nx * w + ux * 4), Math.round(wy + ny * w + uy * 4), Math.round(ex + nx * w), Math.round(ey + ny * w), Math.abs(w) === 2 ? K : w < 0 ? hex('#c89a5c') : hex('#8e6a3c'));
  R.poligono([rot(-9, -16), rot(9, -16), rot(9, 16), rot(-9, 16)], K); R.poligono([rot(-8, -15), rot(8, -15), rot(8, 15), rot(-8, 15)], hex('#a87a44')); R.poligono([rot(-8, -15), rot(-3, -15), rot(-3, 15), rot(-8, 15)], hex('#c89a5c')); R.poligono([rot(5, -15), rot(8, -15), rot(8, 15), rot(5, 15)], hex('#7e5630'));
  for (const j of [-11, 11]) R.poligono([rot(-8, j - 1), rot(8, j - 1), rot(8, j + 1), rot(-8, j + 1)], hex('#e0b040'));
};
const p7 = (t) => {
  const { rect, pset, linea, disco } = R;
  capa('tribuna', tribuna);
  const golpe = l(0.985), e = t - golpe;
  // la pantalla: el icono de la bolsa, la cifra que sube, la barra y el piloto
  { const n = t < l(0.922) ? lerp(1900000, 2500000, ease(tramo(t, P7 + 0.2, l(0.922)))) : lerp(2500000, 2660000, tramo(t, l(0.922), l(0.975))), s2 = String(Math.round(n / 10000) * 10000).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    R.icono('bolsa', 58, 34, hex('#f0c860'), hex('#10141e'), 2); R.numero(s2, 158, 62, { tam: 16, centro: true });
    const w = Math.round(176 * Math.min(1, (n - 1900000) / 760000)); rect(64, 70, 242, 76, hex('#222a3a')); rect(65, 71, 65 + w, 75, hex('#3ae06a')); rect(65, 71, 65 + w, 71, hex('#9af0b0')); if (Math.sin(t * 8) > 0 && e < 0) rect(65 + w, 71, 66 + w, 75, hex('#ffffff'));
    if (e >= 0) { disco(234, 39, 5, hex('#ff4a3a')); disco(232, 37, 2, hex('#ffb0a0')); if (e < 0.6) for (let k = 0; k < 8; k++) destello(Math.round(234 + Math.cos(k * 0.785) * (9 + e * 26)), Math.round(39 + Math.sin(k * 0.785) * (9 + e * 26)), 2, hex('#ffd0c0')); } else pset(238, 34, Math.floor(t * 3) % 2 ? hex('#ff4a4a') : hex('#5a2030')); }
  // el libro de dibujos en su atril, bajo el aplique; brilla cuando cae el mazo
  PZ.libroDibujos(R, 67, 114, { s: 2 });
  for (let k = 0; k < 3; k++) if (Math.sin(t * 4 + k * 2) > (e >= 0 ? -0.4 : 0.6)) destello(40 + k * 26, 74 + (k % 2) * 22, e >= 0 ? 4 : 2, hex('#fff4a0'));
  // el mazo en la mano del subastador (manga gris azulada): se levanta y cae
  { const sube = tramo(t, P7 + 0.3, l(0.9)), b = e >= 0 ? Math.max(0, 0.22 * Math.sin(e * 10) * Math.max(0, 1 - e * 2.5)) : t > golpe - 0.14 ? lerp(1.05, 0, (t - golpe + 0.14) / 0.14) : lerp(0.25, 1.05, ease(sube)) + Math.sin(t * 5) * 0.04;
    const wx = 292, wy = Math.round(100 - Math.sin(b) * 6);
    mazoCerca(wx, wy, b);
    T.brazo(R, 336, wy + 34, wx, wy, '#6a7a94', -1, { codo: [318, wy + 24] });
    if (e >= 0 && e < 0.45) { for (let k = 0; k < 7; k++) { const an = -Math.PI * (0.08 + k * 0.14); linea(Math.round(246 + Math.cos(an) * (26 + e * 30)), Math.round(116 + Math.sin(an) * (14 + e * 26)), Math.round(246 + Math.cos(an) * (32 + e * 44)), Math.round(116 + Math.sin(an) * (18 + e * 36)), hex('#fff4a0')); } } }
  // las paletas del público, en primer término: se van rindiendo y queda una
  [[34, 3, 0.25], [98, 7, 9], [160, 5, 0.5], [222, 2, 0.72], [276, 8, 0.4]].forEach(([x, n, f], k) => { const cae = f > 1 ? 0 : tramo(t, lerp(P7 + 0.3, l(0.93), f), lerp(P7 + 0.3, l(0.93), f) + 0.35), y = 160 + Math.round(Math.sin(t * 2.2 + k * 1.7) * 3 + cae * 40) - (f > 1 && e >= 0 && e < 0.8 ? Math.round(Math.abs(Math.sin(e * 12)) * 6) : 0), bx = x + Math.round(Math.sin(t * 1.3 + k) * 2);
    if (y > 196) return; rect(bx - 1, y + 10, bx + 1, 179, K); rect(bx, y + 10, bx, 179, hex('#8e6a3c')); disco(bx, y, 12, K); disco(bx, y, 11, hex('#f8f4e8')); disco(bx, y, 11, hex('#f8f4e8')); for (let q = 0; q < 30; q++) { const an = q / 30 * 6.283; pset(Math.round(bx + Math.cos(an) * 9), Math.round(y + Math.sin(an) * 9), hex('#c8c0a8')); } R.numero(String(n), bx + 1, y + 4, { color: hex('#1c2a5a'), centro: true, sombra: false }); });
};
const año = (t) => t < P4 ? 1975 : t < P6 ? 1976 : 2021;
const efectos = [[P2 + 0.2, 'lapiz'], [d(0.29), 'papel'], [d(0.356), 'tic'], [d(0.468), 'golpecito'], [d(0.535), 'golpecito'], [P3 + 0.2, 'maquina'], [d(0.749), 'pop'], [d(0.87), 'whoosh'], [d(0.95), 'boom'], [P4 + 0.3, 'tic'], [l(0.06), 'toc'], [l(0.074), 'aviso'], [P5 + 0.2, 'rafaga'], [l(0.25), 'papel'], [l(0.36), 'puerta'], [l(0.487), 'brillo'], [P6 + 0.2, 'publico'], [P7 + 0.3, 'tecleo'], [l(0.985), 'toc'], [l(0.985) + 0.5, 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')
