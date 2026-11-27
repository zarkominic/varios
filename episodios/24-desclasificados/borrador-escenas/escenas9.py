E = {}

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['dc-patricia'] = ('El lago Patricia', '''// DC-PATRICIA (frase 21), 1943, cartela «1943». Cinco planos:
// 1. el mapa de papel del oeste: una mano trae el barquito de hielo desde el borde («prototype», «built»), la chincheta
//    cae en el lago Patricia («Patricia Lake») y un lápiz rojo rodea las Rocosas («Rockies») (corta en «and it worked»);
// 2. la cabaña de troncos de la orilla: por la ventana, el prototipo flota; el ingeniero de los prismáticos salta de
//    alegría con «worked» y en el barquito se iza la bandera; el otro baja el plano enrollable del barco de verdad,
//    gigante («full-sized ship»), y con «mountain of steel and money» caen vigas de acero y sacos de dinero que se
//    amontonan en el rincón; los dos se quedan de piedra (corta en «planes»);
// 3. el mapa del Atlántico del despacho de Londres: un avión de largo alcance cruza la zona sin aviones («planes could
//    already fly farther») y los círculos de alcance la cierran; con «cancelled» un sello pone la X roja sobre el
//    portaaviones dibujado (corta tras «year»);
// 4. el lago Patricia en tres veranos: verano, otoño, invierno… el prototipo se hunde y se deshace; los ingenieros se
//    despiden en el embarcadero, un alce cruza el lago helado, y en el último verano el gato espía pesca en la barca
//    (corta en «still lie»);
// 5. bajo el agua: los restos en el fondo con la trucha y la perca; el anzuelo del gato baja hasta el motor, la trucha
//    pica y el sedal da un tirón («bottom of the lake»).''', r'''
const a = (f) => en('patricia', f);
const P2 = a(0.2796), P3 = a(0.5272), P4 = a(0.7408), P5 = a(0.9239);
const proto = a(0.0886), built = a(0.1378), patri = a(0.1634), rock = a(0.2441);
const worked = a(0.2973), full = a(0.348), ship = a(0.3746), mont = a(0.4317), steel = a(0.4622), money = a(0.4957);
const fly = a(0.5705), lejos = a(0.5872), proyecto = a(0.634), cancel = a(0.6679), year = a(0.7201);
const tres = a(0.8028), veranos = a(0.8186), melt = a(0.8471), fondo = a(0.9515), lago = a(0.98);
const k = T.C.k;
const hh = (i, s = 0) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], dith = (x, y) => (B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const mez = (c1, c2, u) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * u) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * u) << 8) | Math.round(r1 + ((c2 & 255) - r1) * u)) >>> 0; };
const suave = (u) => u * u * (3 - 2 * u);
const destello = (x, y, r, c = hex('#fff6d0')) => { for (let i = 1; i <= r; i++) { R.pset(x + i, y, c); R.pset(x - i, y, c); R.pset(x, y + i, c); R.pset(x, y - i, c); if (i < r) { R.pset(x + i, y + i, c); R.pset(x - i, y - i, c); R.pset(x + i, y - i, c); R.pset(x - i, y + i, c); } } R.pset(x, y, hex('#ffffff')); };
const HIELO = hex('#c8ecf8'), HIELOL = hex('#ffffff'), HIELOS = hex('#7ab4d4'), MAD = hex('#a8743c'), MADS = hex('#6a4422'), MADL = hex('#d8a868');
// el barquito de hielo con su caseta de madera (centro abajo en x, y; s 1 o 2)
const barquito = (x, y, s = 1, ban = 0, tt = 0) => {
  const r = (dx0, dy0, dx1, dy1, c) => R.rect(x + dx0 * s, y + dy0 * s, x + dx1 * s + s - 1, y + dy1 * s + s - 1, c);
  r(-9, -4, 8, -1, k); r(-8, -3, 7, -2, HIELO); r(-8, -3, 7, -3, HIELOL); r(-7, -1, 6, 0, k); r(-6, -1, 5, -1, HIELOS);
  r(-4, -9, 3, -5, k); r(-3, -8, 2, -5, MAD); r(-3, -8, 2, -8, MADL); r(-5, -10, 4, -10, MADS); r(-1, -7, 0, -6, hex('#f0d878'));
  r(4, -12, 4, -9, k);
  if (ban > 0) { r(-6, -9 - Math.round(6 * ban), -6, -5, k); const f = Math.floor(tt * 6) % 2; r(-5, -9 - Math.round(6 * ban), -2 + f, -8 - Math.round(6 * ban), hex('#c8282a')); }
};

// 1 · el mapa del oeste: el barquito, la chincheta en el lago y el círculo de las Rocosas
const LAGO = [-118.09, 52.90];
const p1 = (t) => {
  const P = T.mapa(R, t, { zoom: 2.3, centro: [-117, 50.2] });
  const [lx, ly] = P(LAGO).map(Math.round);
  // Canadá grabado a buril encima del papel: la cordillera de las Rocosas en sepia, bosques, lagos y el ferrocarril
  const SEP = hex('#6a5034'), SEPL = hex('#b89a6a');
  for (let i = 0; i < 26; i++) { const lo = -121.5 + i * 0.42 + hh(i, 1) * 0.3, la = 55.5 - i * 0.32 + hh(i, 2) * 0.6, [mx, my] = P([lo, la]).map(Math.round), hm = 5 + Math.round(hh(i, 3) * 4);
    if (my < 16 || my > 120) continue; R.linea(mx - hm, my, mx, my - hm, SEP); R.linea(mx, my - hm, mx + hm, my, SEP); for (let j = 1; j < hm; j += 2) R.linea(mx + j, my - hm + j, mx + j, my, SEPL); R.pset(mx, my - hm, hex('#f4f0e4')); }
  for (let i = 0; i < 70; i++) { const lo = -126 + hh(i, 4) * 22, la = 49.6 + hh(i, 5) * 6, [tx, ty] = P([lo, la]).map(Math.round); if (ty < 16 || tx < 4 || tx > 316) continue; R.pset(tx, ty, hex('#5a7a3a')); R.pset(tx, ty - 1, hex('#6a8a4a')); R.pset(tx, ty + 1, SEP); }
  for (const [lo, la, r] of [[-115.2, 51.4, 3], [-110.5, 53.4, 4], [-106.5, 52.2, 3], [-121.8, 53.9, 3]]) { const [cx, cy] = P([lo, la]).map(Math.round); R.disco(cx, cy, r, hex('#7aa8c0')); R.linea(cx - r, cy + 1, cx + r - 1, cy + 1, hex('#5a88a8')); }
  { let prev = null; for (let i = 0; i <= 30; i++) { const lo = -104 - i * 0.48, la = 50.4 + Math.sin(i * 0.4) * 0.5 + (i > 20 ? (i - 20) * 0.22 : 0), q = P([lo, la]).map(Math.round); if (prev && q[1] > 16) { R.linea(prev[0], prev[1], q[0], q[1], SEP); if (i % 2) R.pset(q[0], q[1] - 1, SEP); } prev = q; } }
  // el tren de vapor que sube por el ferrocarril hacia las Rocosas
  { const u = (t * 0.05) % 1, i = u * 30, lo = -104 - i * 0.48, la = 50.4 + Math.sin(i * 0.4) * 0.5 + (i > 20 ? (i - 20) * 0.22 : 0), [qx, qy] = P([lo, la]).map(Math.round);
    R.rect(qx - 3, qy - 4, qx + 3, qy, k); R.rect(qx - 2, qy - 3, qx + 2, qy - 1, hex('#3a3a44')); R.rect(qx + 4, qy - 3, qx + 9, qy, k); for (let j = 0; j < 4; j++) { const f = (t * 1.5 + j / 4) % 1; R.pset(Math.round(qx - 2 + f * 6), Math.round(qy - 6 - f * 8), hex('#f4f0e4')); } }
  // el círculo rojo de rotulador que rodea las Rocosas, con «Rockies» (se traza solo, como en las rutas del mapa)
  const uc = tramo(t, rock - 0.35, rock + 0.45), [rx, ry] = P([-117, 51.3]);
  if (uc > 0) { const n = Math.round(uc * 90); for (let i = 0; i < n; i++) { const an = -Math.PI * 0.6 + i / 90 * Math.PI * 2.08, rr = 1 + Math.sin(i * 0.3) * 0.03; const x = Math.round(rx + Math.cos(an) * 44 * rr), y = Math.round(ry + Math.sin(an) * 30 * rr); R.pset(x, y, hex('#c8282a')); R.pset(x, y + 1, hex('#8a1e26')); }
    if (uc < 1) { const an = -Math.PI * 0.6 + n / 90 * Math.PI * 2.08; R.disco(Math.round(rx + Math.cos(an) * 44), Math.round(ry + Math.sin(an) * 30), 2, hex('#e85a5a')); } }
  // el barquito de hielo cae del cielo del mapa y se posa en el lago con «built»
  const ue = tramo(t, proto - 0.2, built);
  const bx = lx + 3, by = Math.round(lerp(-30, ly + 2, ue * ue) - (t > built && t < built + 0.2 ? 3 : 0));
  if (ue > 0) { const sh = Math.round(4 + 6 * ue); R.disco(lx + 3, ly + 3, sh, mez(R.pget(lx + 3, ly + 3), k, 0.3)); barquito(bx, by, 2, 0, t); }
  if (t > built && t < built + 0.4) for (let i = 0; i < 8; i++) { const an = i / 8 * Math.PI * 2, r = 12 + (t - built) * 40; R.pset(Math.round(bx + Math.cos(an) * r), Math.round(by + Math.sin(an) * r * 0.5), hex('#3a6ad8')); }
  // la chincheta cae en el lago con «Patricia Lake» (y su latido)
  T.chincheta(R, lx - 16, ly - 10, t, hex('#c8282a'), { baja: tramo(t, patri - 0.3, patri) });
  if (t > patri && t < patri + 1.2) { const r = Math.round((t - patri) * 22) % 14 + 3; for (let i = 0; i < 24; i++) { const an = i / 24 * Math.PI * 2; R.pset(Math.round(lx - 16 + Math.cos(an) * r), Math.round(ly - 10 + Math.sin(an) * r * 0.6), hex('#c8282a')); } }
};

// 2 · la cabaña de troncos de la orilla
const WX0 = 176, WY0 = 46, WX1 = 262, WY1 = 128;
let fCab = null;
const fijoCabana = () => {
  if (fCab) { R.copiar(fCab); return; }
  fCab = R.nuevo(); const prev = R.usar(fCab);
  const LOG = [hex('#3a2414'), hex('#b8844a'), hex('#a0703e'), hex('#8e6036'), hex('#7a5030'), hex('#6a4426'), hex('#5a3a20'), hex('#4a2e18'), hex('#d8c49a')];
  for (let y = 0; y < 142; y++) { const fila = Math.floor((y + 3) / 9), v = (y + 3) % 9; for (let x = 0; x < 320; x++) {
    let c = LOG[v]; const g = hh(Math.floor((x + fila * 13) / 6) + fila * 31, v);
    if (v > 1 && v < 8 && g < 0.1) c = LOG[Math.min(7, v + 2)]; if (v > 1 && v < 7 && dith(x, y) < 0.06) c = LOG[1];
    const kn = hh(Math.floor(x / 23) + fila * 7, 5); if (kn < 0.18 && v >= 3 && v <= 5 && Math.abs((x % 23) - 11) < 2) c = LOG[7];
    R.pset(x, y, c); } }
  // el techo: la viga y las tablas (tranquilo detrás del año y de Atom)
  R.rect(0, 0, 319, 5, hex('#2a1a0e')); R.rect(0, 5, 319, 6, hex('#5a3a20'));
  // los cabos de los troncos en la esquina y el poste
  R.rect(0, 0, 5, 141, hex('#4a2e18')); R.rect(1, 0, 4, 141, hex('#6a4426')); for (let y = 8; y < 141; y += 9) { R.disco(3, y, 3, hex('#3a2414')); R.disco(3, y, 2, hex('#c89a62')); R.pset(3, y, hex('#8a5a32')); }
  // la ventana: marco grueso, alféizar con el termómetro y una lata
  R.rect(WX0 - 5, WY0 - 5, WX1 + 5, WY1 + 4, k); R.rect(WX0 - 4, WY0 - 4, WX1 + 4, WY1 + 3, hex('#c89a62')); R.rect(WX0 - 4, WY0 - 4, WX1 + 4, WY0 - 4, hex('#e8c08a'));
  R.rect(WX0 - 8, WY1 + 2, WX1 + 8, WY1 + 6, k); R.rect(WX0 - 7, WY1 + 3, WX1 + 7, WY1 + 5, hex('#d8a868')); R.rect(WX0 - 7, WY1 + 3, WX1 + 7, WY1 + 3, hex('#f0d0a0'));
  R.rect(WX1 - 14, WY1 - 6, WX1 - 6, WY1 + 2, k); R.rect(WX1 - 13, WY1 - 5, WX1 - 7, WY1 + 2, hex('#8a949e')); R.rect(WX1 - 13, WY1 - 5, WX1 - 7, WY1 - 4, hex('#c8d0d8'));
  // la caja del plano enrollable (el plano se pinta al bajar)
  R.rect(18, 26, 122, 33, k); R.rect(19, 27, 121, 32, hex('#5a6a52')); R.rect(19, 27, 121, 27, hex('#8a9a7a')); R.disco(18, 29, 3, k); R.disco(122, 29, 3, k); R.disco(18, 29, 2, hex('#c8a040')); R.disco(122, 29, 2, hex('#c8a040'));
  // las raquetas de nieve cruzadas y el clavo del farol
  for (const [cx, an] of [[140, -0.35], [156, 0.35]]) { for (let i = 0; i < 40; i++) { const u = i / 39, yy = 38 + u * 44, ww = Math.sin(u * Math.PI) * 7 + 1; for (let s = -1; s <= 1; s += 2) R.pset(Math.round(cx + an * (yy - 60) + s * ww), Math.round(yy), k); }
    for (let i = 0; i < 6; i++) { const yy = 46 + i * 6, ww = Math.sin((yy - 38) / 44 * Math.PI) * 7; R.linea(Math.round(cx + an * (yy - 60) - ww + 1), yy, Math.round(cx + an * (yy - 60) + ww - 1), yy, hex('#d8c49a')); }
    R.linea(Math.round(cx + an * 22), 82, Math.round(cx + an * 30), 90, hex('#8a5a32')); }
  R.rect(147, 92, 149, 94, k);
  // la estantería de la derecha con latas, tarros y una radio
  R.rect(266, 84, 319, 87, k); R.rect(266, 84, 319, 85, hex('#c89a62')); for (const x of [272, 314]) { R.linea(x, 87, x - 4, 92, k); }
  R.rect(270, 70, 279, 83, k); R.rect(271, 71, 278, 83, hex('#c8282a')); R.rect(271, 74, 278, 77, hex('#f0e0b0'));
  R.rect(282, 74, 289, 83, k); R.rect(283, 75, 288, 83, hex('#7ab0c8')); R.rect(283, 75, 288, 76, hex('#c8e0ec')); R.rect(283, 79, 288, 83, hex('#e8c040'));
  R.rect(292, 66, 316, 83, k); R.rect(293, 67, 315, 83, hex('#6a4426')); R.rect(294, 68, 306, 80, hex('#c8a46a')); for (let y = 69; y < 80; y += 2) R.linea(295, y, 305, y, hex('#8a6a3a')); R.disco(311, 74, 2, hex('#d8d0c0'));
  // el suelo de tablas con vetas, la alfombra de trapo
  for (let y = 142; y < 180; y++) { const tab = Math.floor((y - 142) / 6), lin = (y - 142) % 6 === 5; for (let x = 0; x < 320; x++) {
    const j = (x + tab * 37) % 64 === 0; let c = lin || j ? hex('#3a2414') : ((Math.sin(x * 0.07 + tab * 2 + Math.sin(x * 0.02 + tab) * 3)) > 0.75 ? hex('#7a5030') : hex('#9a6a3e'));
    if (!lin && !j && dith(x, y) < 0.05) c = hex('#b8844a'); R.pset(x, y, c); } }
  R.rect(0, 140, 319, 142, k); R.rect(0, 140, 319, 140, hex('#5a3a20'));
  for (let y = 158; y < 178; y++) for (let x = 168; x < 252; x++) { const e = ((x - 210) / 42) ** 2 + ((y - 168) / 10) ** 2; if (e < 1) { const anillo = Math.floor(Math.sqrt(e) * 5); R.pset(x, y, [hex('#c8504a'), hex('#e8c060'), hex('#4a7ab0'), hex('#c8504a'), hex('#5a8a4a')][anillo] ); if (dith(x, y) < 0.1) R.pset(x, y, hex('#f0e0c0')); } }
  // la estufa de hierro a la izquierda, con su tubo hasta el techo
  R.rect(8, 6, 13, 118, k); R.rect(9, 6, 12, 118, hex('#3a3a44')); R.rect(9, 6, 9, 118, hex('#6a6a74')); for (const y of [40, 80]) R.rect(7, y, 14, y + 1, hex('#2a2a32'));
  R.rect(2, 118, 22, 170, k); R.rect(3, 119, 21, 169, hex('#3a3a44')); R.rect(3, 119, 4, 169, hex('#6a6a74')); R.rect(1, 116, 23, 119, k); R.rect(2, 117, 22, 118, hex('#5a5a64'));
  R.rect(6, 132, 18, 146, k); for (const x of [4, 18]) R.rect(x, 168, x + 2, 174, k);
  // el saco de serrín y el cubo, delante a la derecha (bajo el montón no: a la izquierda de la alfombra)
  R.rect(150, 160, 166, 176, k); R.rect(151, 161, 165, 176, hex('#c8a46a')); R.rect(151, 161, 165, 162, hex('#e8c88a')); for (let i = 0; i < 6; i++) R.pset(153 + i * 2, 168 + (i & 1) * 3, hex('#8a6a3a'));
  R.usar(prev); R.copiar(fCab);
};
// lo que se ve por la ventana: cielo tramado, nubes, montes nevados, el bosque, el lago, el prototipo y una canoa
const PIC = [[176, 96], [192, 70], [204, 82], [222, 58], [240, 80], [252, 66], [262, 84], [262, 128], [176, 128]];
const porVentana = (t) => {
  R.recorte([WX0, WY0, WX1, WY1]);
  for (let y = WY0; y <= 100; y++) { const u = (y - WY0) / 54; for (let x = WX0; x <= WX1; x++) R.pset(x, y, dith(x, y) < u ? (dith(x + 1, y) < u * 0.6 ? hex('#d8ecf4') : hex('#a8d0ea')) : hex('#78b0e0')); }
  for (let i = 0; i < 4; i++) { const sp = [3, 5, 8, 4][i], cx = WX0 + ((i * 37 + t * sp) % 120) - 16, cy = WY0 + 8 + i * 6; R.disco(cx, cy, 5, hex('#c8d8e8')); R.disco(cx + 6, cy - 2, 6, hex('#e8f0f6')); R.disco(cx + 12, cy, 4, hex('#ffffff')); R.linea(cx - 4, cy + 4, cx + 15, cy + 4, hex('#a8bcd0')); }
  R.poligono(PIC, hex('#7a6a78')); R.poligono([[192, 70], [198, 78], [188, 80]], hex('#f4f8fc')); R.poligono([[222, 58], [230, 70], [214, 70]], hex('#f4f8fc')); R.poligono([[252, 66], [258, 74], [246, 74]], hex('#f4f8fc'));
  for (let x = WX0; x <= WX1; x += 2) R.linea(x, 84 + Math.round(Math.sin(x * 0.4) * 2), x, 86, hex('#5a5068'));
  for (let x = WX0; x <= WX1; x += 3) { const hgt = 6 + Math.round(hh(x, 3) * 5); R.poligono([[x, 100 - hgt], [x + 3, 101], [x - 3, 101]], hex('#2e5a3a')); }
  R.rect(WX0, 101, WX1, WY1, hex('#3a8a8a'));
  for (let y = 102; y <= WY1; y++) for (let x = WX0; x <= WX1; x++) if (((x + Math.round(Math.sin(y * 0.8 + t * 2) * 3)) % 11) === 0) R.pset(x, y, hex('#6ab8b0'));
  for (let i = 0; i < 6; i++) { const x = WX0 + Math.round(hh(i, 4) * 86), y = 104 + Math.round(hh(i, 5) * 20); if (Math.sin(t * 4 + i * 2) > 0.6) R.pset(x, y, hex('#ffffff')); }
  // la canoa que cruza
  const cx = WX0 + ((t * 7 + 20) % 110) - 10; R.linea(cx - 5, 104, cx + 5, 104, k); R.linea(cx - 4, 105, cx + 4, 105, hex('#c8504a')); R.pset(cx, 102, k); R.pset(cx, 103, hex('#4a6a9a'));
  // el prototipo flotando, que se mece; la bandera con «worked»
  const mece = Math.round(Math.sin(t * 1.6)); barquito(220, 117 + mece, 2, tramo(t, worked - 0.4, worked + 0.1), t);
  for (let i = 0; i < 5; i++) { const f = (t * 0.5 + i / 5) % 1; R.pset(Math.round(229 + f * 6 + Math.sin(f * 7) * 2), Math.round(94 + mece - f * 18), mez(hex('#c8ccd0'), hex('#e8f0f4'), f)); }
  R.linea(200, 119 + mece, 240, 119 + mece, hex('#9ad8d0'));
  R.recorte(null);
  R.rect(218, WY0, 219, WY1, k); R.rect(WX0, 86, WX1, 87, k);
};
// el plano del barco de verdad, en la persiana enrollable: v 0–1 (lo bajado)
const plano = (v, t) => {
  const y1 = Math.round(34 + v * 86);
  if (y1 > 34) {
    R.rect(20, 33, 120, y1, hex('#24508a')); for (let y = 36; y < y1; y += 6) R.linea(20, y, 120, y, hex('#3a68a8')); for (let x = 24; x < 120; x += 6) R.linea(x, 33, x, y1, hex('#3a68a8'));
    R.recorte([20, 33, 120, y1]);
    // el portaaviones gigante de perfil: casco, cubierta, la isla y los aviones
    const W = hex('#e8f0f8'), Wd = hex('#a8c0e0');
    R.linea(26, 86, 114, 86, W); R.linea(26, 86, 32, 100, W); R.linea(114, 86, 106, 100, W); R.linea(32, 100, 106, 100, W); R.linea(27, 88, 113, 88, Wd);
    R.linea(30, 94, 108, 94, Wd); for (let x = 36; x < 106; x += 8) R.linea(x, 89, x, 99, Wd);
    R.rect(84, 76, 94, 85, W); R.rect(86, 78, 92, 84, hex('#24508a')); R.linea(89, 70, 89, 76, W); R.linea(86, 72, 92, 72, W);
    for (const x of [38, 52, 66]) { R.linea(x, 83, x + 8, 83, W); R.linea(x + 3, 81, x + 3, 85, W); R.pset(x + 8, 82, W); }
    // la flecha de la eslora con sus topes y, abajo, el prototipo diminuto (para comparar)
    R.linea(26, 106, 114, 106, W); R.linea(26, 104, 26, 108, W); R.linea(114, 104, 114, 108, W); R.linea(27, 105, 29, 105, W); R.linea(111, 107, 113, 107, W);
    R.rect(30, 113, 34, 114, W); R.rect(31, 111, 33, 112, Wd); R.linea(36, 114, 40, 114, Wd);
    R.recorte(null);
    // la barra de abajo con la anilla y el cordón
    R.rect(18, y1, 122, y1 + 2, k); R.rect(19, y1, 121, y1 + 1, hex('#c8a040'));
  }
  return [70, y1 + 2];
};
// la viga de acero (I) y el saco de dinero
const viga = (x, y, w = 30) => { R.rect(x, y - 6, x + w, y, k); R.rect(x + 1, y - 5, x + w - 1, y - 1, hex('#6a7480')); R.rect(x + 1, y - 5, x + w - 1, y - 5, hex('#c8d0dc')); R.rect(x + 1, y - 3, x + w - 1, y - 3, hex('#4a525e')); R.rect(x + 1, y - 1, x + w - 1, y - 1, hex('#8a949e')); for (let i = x + 4; i < x + w - 2; i += 7) R.pset(i, y - 4, hex('#3a3e48')); };
const saco = (x, y) => { R.disco(x + 7, y - 6, 7, k); R.disco(x + 7, y - 6, 6, hex('#c8a04a')); R.disco(x + 5, y - 8, 3, hex('#e8c86a')); R.rect(x + 5, y - 15, x + 9, y - 12, k); R.rect(x + 6, y - 14, x + 8, y - 13, hex('#c8a04a')); R.rect(x + 3, y - 12, x + 11, y - 12, hex('#6a4422'));
  R.linea(x + 7, y - 10, x + 7, y - 2, hex('#6a4a1a')); R.linea(x + 5, y - 8, x + 9, y - 8, hex('#6a4a1a')); R.linea(x + 5, y - 6, x + 9, y - 4, hex('#6a4a1a')); R.linea(x + 5, y - 3, x + 9, y - 3, hex('#6a4a1a')); };
const MONTON = [[0, 'v', 266, 177, 50], [0.18, 'v', 270, 171, 46], [0.36, 'v', 274, 165, 40], [0.56, 'v', 280, 159, 32], [1.0, 's', 268, 158], [1.12, 's', 298, 158], [1.26, 's', 284, 153], [1.4, 's', 270, 146], [1.52, 's', 296, 146], [1.66, 's', 283, 139]];
const p2 = (t) => {
  fijoCabana();
  porVentana(t);
  // el farol del clavo, que se mece y alumbra
  const sw = Math.sin(t * 1.4) * 1.5, fx = Math.round(148 + sw);
  R.linea(148, 94, fx, 100, k); R.rect(fx - 3, 100, fx + 3, 110, k); R.rect(fx - 2, 101, fx + 2, 109, hex('#f8d870')); R.rect(fx - 1, 103 + (Math.floor(t * 9) % 2), fx + 1, 107, hex('#ff9a3a')); R.rect(fx - 4, 110, fx + 4, 111, hex('#3a3a44'));
  for (let y = 92; y < 120; y++) for (let x = fx - 14; x < fx + 14; x++) if (((x - fx) ** 2 + (y - 105) ** 2) < 170 && dith(x, y) < 0.18) R.pset(x, y, mez(R.pget(x, y), hex('#ffd890'), 0.35));
  // la estufa: la portezuela que brilla y el humo del tubo
  const fl = 0.6 + 0.4 * Math.sin(t * 9) * Math.sin(t * 5.3); R.rect(7, 133, 17, 145, mez(hex('#c8501a'), hex('#ffd040'), fl)); for (let x = 8; x < 17; x += 2) R.linea(x, 133, x, 145, k);
  // el plano baja con «full-sized ship»
  const v = suave(tramo(t, full - 0.15, ship + 0.7)), [cx, cy] = plano(v, t);
  // el ingeniero del plano: tira del cordón y se queda mirando el montón
  const tira = t > full - 0.35 && t < ship + 0.8, mira = t > mont - 0.2;
  const c2 = R.actor(EL.ingenieroCA2, 60, 146, t, { dir: mira ? 1 : 1, sostiene: tira ? [cx + 1, Math.min(124, Math.max(cy + 4, 118 + Math.round(Math.sin(t * 9))))] : undefined, sorpresa: t > mont && t < money, triste: t > money + 0.2, sonrisa: t > worked && t < full - 0.3, brazos: t > worked + 0.05 && t < worked + 0.6, habla: t > ship + 0.8 && t < mont - 0.1 && Math.sin(t * 7) > 0 });
  if (tira) R.linea(cx, cy, c2.mano[0], c2.mano[1], hex('#e8e0c8'));
  else if (v > 0) R.linea(cx, cy, cx, cy + 5, hex('#e8e0c8'));
  // el de los prismáticos junto a la ventana: mira el prototipo, salta con «worked» y luego mira el montón
  const prism = t < worked - 0.1;
  const c1 = R.actor(EL.ingenieroCA, 152, 146, t, { dir: t > ship + 0.6 && t < mont - 0.3 ? -1 : 1, sostiene: prism ? [166, 124] : undefined, salto: t > worked && t < worked + 0.5 ? Math.round(Math.sin((t - worked) * Math.PI * 2) * 4) : 0, brazos: t > worked && t < worked + 0.9, sonrisa: t > worked && t < mont - 0.2, sorpresa: t > mont && t < money + 0.3, triste: t > money + 0.6 });
  if (prism) { const [hx, hy] = c1.mano; R.rect(hx - 1, hy - 3, hx + 4, hy + 1, k); R.rect(hx, hy - 2, hx + 3, hy - 2, hex('#3a3a44')); R.rect(hx, hy, hx + 3, hy, hex('#3a3a44')); R.pset(hx + 4, hy - 2, hex('#a8d8f0')); R.pset(hx + 4, hy, hex('#a8d8f0')); }
  // la mesa de delante con el quinqué, la taza que humea, el mapa del lago y el cuaderno
  R.poligono([[34, 150], [146, 150], [152, 160], [28, 160]], k); R.poligono([[35, 151], [145, 151], [150, 159], [30, 159]], (x, y) => y === 151 ? hex('#d8a868') : (Math.sin(x * 0.1 + y * 0.9) > 0.8 ? hex('#8a5a32') : hex('#a8743c')));
  R.rect(28, 160, 152, 166, k); R.rect(29, 160, 151, 165, hex('#6a4426')); for (const x of [32, 144]) { R.rect(x, 166, x + 4, 179, k); R.rect(x + 1, 166, x + 3, 179, hex('#8a5a32')); }
  R.poligono([[52, 152], [84, 152], [86, 158], [50, 158]], hex('#e8dcb8')); R.disco(66, 155, 3, hex('#7ab0c8')); R.linea(56, 153, 80, 157, hex('#b8a47a')); R.pset(66, 155, hex('#c8282a'));
  R.rect(96, 146, 101, 153, k); R.rect(97, 147, 100, 152, hex('#f0ece0')); R.rect(101, 148, 102, 150, k);
  for (let i = 0; i < 4; i++) { const f = (t * 0.7 + i / 4) % 1; R.pset(Math.round(98 + Math.sin(f * 8 + t) * 1.5), Math.round(144 - f * 14), mez(hex('#d8d8d8'), hex('#a87a5a'), f)); }
  R.rect(126, 138, 134, 153, k); R.rect(127, 146, 133, 152, hex('#c8a040')); R.rect(128, 138, 132, 145, hex('#e8f0f0')); R.rect(129, 141 + (Math.floor(t * 8) % 2), 131, 144, hex('#ffb040'));
  // el montón de acero y dinero que cae en el rincón con «mountain of steel and money»
  for (const [dt, tipo, x, y, w] of MONTON) {
    const t0 = (tipo === 'v' ? mont : money - 0.9) + dt * 0.55; if (t < t0 - 0.35) continue;
    const u = tramo(t, t0 - 0.35, t0), yy = Math.round(lerp(-20, y, u * u)), bo = t > t0 && t < t0 + 0.15 ? -2 : 0;
    if (tipo === 'v') viga(x, yy + bo, w); else saco(x, yy + bo);
    if (t > t0 && t < t0 + 0.2) for (let i = 0; i < 4; i++) R.pset(x + 4 + i * 8, y + 1 - Math.round((t - t0) * 30) % 4, hex('#e8e0c0'));
  }
};

// 3 · el mapa del Atlántico: el avión de largo alcance cierra el hueco; con «cancelled», la X
const MAPA = { encuadre: 'londres42', camara: 'mapa' };
const p3 = (t) => {
  const g = T.hielo(R, t, { ...MAPA, dibuja: 1 });
  const [hx0, hy0] = g.halifax, [lx0, ly0] = g.liverpool;
  // los círculos de alcance que crecen desde las dos costas con «farther»
  const uc = suave(tramo(t, lejos - 0.4, lejos + 0.9));
  if (uc > 0) for (const [cx, cy, r0] of [[hx0, hy0, 46], [lx0, ly0, 46]]) { const r = r0 + uc * 52; for (let i = 0; i < 160; i++) { if (i % 4 > 1) continue; const an = i / 160 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r * 0.8), hex('#2a6ad8')); } }
  // el avión de cuatro motores que cruza de Terranova a Inglaterra
  const ua = tramo(t, P3 + 0.1, proyecto - 0.1);
  if (ua > 0 && ua < 1) { const x = Math.round(lerp(hx0, lx0, ua)), y = Math.round(lerp(hy0, ly0, ua) - Math.sin(ua * Math.PI) * 26);
    for (let i = 1; i < 14; i++) { const u2 = Math.max(0, ua - i * 0.012); if (i % 2) R.pset(Math.round(lerp(hx0, lx0, u2)), Math.round(lerp(hy0, ly0, u2) - Math.sin(u2 * Math.PI) * 26), hex('#3a3e48')); }
    R.rect(x - 7, y - 1, x + 7, y + 1, k); R.rect(x - 6, y, x + 6, y, hex('#5a6a7a')); R.rect(x - 1, y - 9, x + 1, y + 9, k); R.rect(x, y - 8, x, y + 8, hex('#7a8a9a'));
    for (const d of [-6, -3, 3, 6]) R.pset(x + 1, y + d, hex('#c8d0dc')); R.rect(x - 7, y - 3, x - 6, y + 3, k); R.pset(x + 7, y, hex('#a8d8f0')); }
  // con «cancelled», la mano con el sello pone la X roja encima del portaaviones
  const [ix, iy] = g.iceberg, us = tramo(t, cancel - 0.55, cancel), uv = tramo(t, cancel + 0.25, cancel + 0.8);
  if (t > cancel) { const c = hex('#c8282a'); for (let d = -2; d <= 2; d++) { R.linea(ix - 30 + d, iy - 18, ix + 30 + d, iy + 18, c); R.linea(ix + 30 + d, iy - 18, ix - 30 + d, iy + 18, c); }
    if (t < cancel + 0.3) for (let i = 0; i < 8; i++) { const an = i / 8 * Math.PI * 2, r = 20 + (t - cancel) * 60; R.pset(Math.round(ix + Math.cos(an) * r), Math.round(iy + Math.sin(an) * r * 0.6), hex('#c8282a')); } }
  if (us > 0 && uv < 1) { const sx = Math.round(lerp(300, ix, suave(us)) + uv * 150), sy = Math.round(lerp(10, t > cancel && uv === 0 ? iy + 6 : iy - 4, suave(us)) - uv * 40);
    T.PIEZAS_DC.sello(R, sx, sy, { s: 2 }); T.brazo(R, 360, sy - 60, sx + 14, sy - 24, '#4a4e5a', -1, { codo: [330, sy - 26] }); }
};

// 4 · el lago Patricia en tres veranos: el prototipo se hunde
const EST = ['verano', 'otono', 'invierno', 'verano', 'otono', 'invierno', 'verano'], CORTES = [0, 0.24, 0.38, 0.52, 0.64, 0.74, 0.84, 1];
const estIdx = (u) => { for (let i = 0; i < 7; i++) if (u < CORTES[i + 1]) return i; return 6; };
const p4 = (t) => {
  const u = tramo(t, P4, P5 - 0.05), i = estIdx(u), estacion = EST[i];
  const hundido = Math.min(1, u < 0.24 ? u * 0.4 : 0.1 + (u - 0.24) * 1.12);
  const LG = { encuadre: 'patricia', estacion, hundido };
  T.hielo(R, t, LG);
  // el primer verano: los dos ingenieros en el embarcadero; uno dice adiós con la mano y se van
  if (i === 0) { const ui = tramo(t, P4 + 0.5, P4 + 0.95);
    R.actor(EL.ingenieroCA, Math.round(lerp(64, 30, ui)), 142, t, { dir: ui > 0 ? -1 : 1, anda: ui > 0 && ui < 1, triste: true });
    R.actor(EL.ingenieroCA2, Math.round(lerp(80, 46, ui)), 142, t, { dir: ui > 0 ? -1 : 1, anda: ui > 0 && ui < 1, brazos: ui === 0 && Math.sin(t * 10) > 0 }); }
  // los inviernos: un alce cruza el lago helado
  if (estacion === 'invierno') { const u0 = i === 2 ? CORTES[2] : CORTES[5], u1 = CORTES[i + 1], ua = (u - u0) / (u1 - u0), x = Math.round(lerp(i === 2 ? 236 : 96, i === 2 ? 268 : 128, ua)), y = 132, p = Math.floor(t * 8) % 2;
    R.rect(x, y - 8, x + 11, y - 3, k); R.rect(x + 1, y - 7, x + 10, y - 4, hex('#6a4a2a')); R.rect(x + 10, y - 11, x + 14, y - 6, k); R.rect(x + 11, y - 10, x + 13, y - 7, hex('#5a3a1e')); R.linea(x + 9, y - 14, x + 15, y - 13, hex('#c8a46a')); R.linea(x + 10, y - 15, x + 10, y - 12, hex('#c8a46a'));
    for (const [d, q] of [[1, 0], [4, 1], [7, 0], [10, 1]]) R.rect(x + d, y - 3, x + d, y - (q === p ? 1 : 0), k); }
  // el último verano: el gato espía en la barca con su caña, que tira el sedal hacia el sitio del barco
  if (i === 6) { const cg = tramo(t, P4 + (P5 - P4) * 0.86, P5 - 0.2);
    T.gatoEspia(R, 108, 145, t, { cara: 'travieso' }); R.linea(114, 132, 130, 118, k); R.linea(115, 132, 131, 118, hex('#a8743c'));
    const ex = Math.round(lerp(132, 168, cg)), ey = Math.round(lerp(122, 126, cg) - Math.sin(cg * Math.PI) * 14); R.linea(131, 118, ex, ey, hex('#e8e8e8')); if (cg >= 1) { R.disco(168, 126, 1, hex('#c8282a')); const r = 2 + Math.floor(t * 4) % 4; R.linea(168 - r, 127, 168 + r, 127, hex('#e8f8fc')); } }
  T.hieloDelante(R, t, LG);
};

// 5 · bajo el agua: los restos en el fondo, la trucha y el anzuelo del gato
const p5 = (t) => {
  T.hielo(R, t, { encuadre: 'patricia', camara: 'fondo' });
  const ub = tramo(t, P5 + 0.1, fondo + 0.2), pica = fondo + 0.9, sube = tramo(t, pica + 0.25, pica + 1.0);
  const lx = 214 + Math.round(Math.sin(t * 1.3) * 2), ly = Math.round(lerp(-2, 124, suave(ub)) - sube * 140);
  R.linea(214, 0, lx, ly, hex('#e8eef0')); R.linea(lx, ly, lx, ly + 3, hex('#c8ccd0')); R.linea(lx, ly + 3, lx + 2, ly + 2, hex('#c8ccd0'));
  if (t < pica + 0.25) { R.rect(lx - 1, ly + 3, lx + 1, ly + 5, hex('#c86a7a')); R.pset(lx + 1, ly + 6, hex('#e88a9a')); }
  // la trucha que se acerca al anzuelo, pica y sale arrastrada
  const ut = tramo(t, fondo - 0.4, pica), tx = Math.round(lerp(290, lx + 8, suave(ut))), ty = Math.round(lerp(96, ly + 6, ut) + Math.sin(t * 5) * (ut < 1 ? 1 : 0));
  const fx = sube > 0 ? lx + 6 : tx, fy = sube > 0 ? ly + 8 : ty;
  R.poligono([[fx - 8, fy], [fx, fy - 4], [fx + 10, fy - 2], [fx + 14, fy - 5], [fx + 14, fy + 4], [fx + 10, fy + 1], [fx, fy + 4]], k);
  R.poligono([[fx - 7, fy], [fx, fy - 3], [fx + 10, fy - 1], [fx + 13, fy - 4], [fx + 13, fy + 3], [fx + 10, fy + 1], [fx, fy + 3]], hex('#7a9a6a'));
  R.linea(fx - 6, fy + 1, fx + 9, fy + 1, hex('#e88a8a')); R.linea(fx - 5, fy - 1, fx + 8, fy - 1, hex('#a8c890')); R.pset(fx - 5, fy - 1, k); for (let i = 0; i < 4; i++) R.pset(fx - 2 + i * 3, fy - 2, k);
  if (t > pica && t < pica + 0.4) destello(lx, ly + 4, 4, hex('#e8f8ff'));
  if (sube > 0) for (let i = 0; i < 8; i++) { const f = ((t - pica) * 1.4 + i / 8) % 1; R.disco(Math.round(lx + Math.sin(i * 3 + t * 4) * 5), Math.round(ly + 20 - f * 40 + 40), 1, hex('#d8f4fc')); }
};

const efectos = [[built, 'golpecito'], [patri, 'pop'], [rock - 0.2, 'lapiz'], [worked, 'palmada'], [full, 'papel'], [mont + 0.05, 'toc'], [money - 0.85, 'golpecito'], [fly, 'jet'], [cancel, 'sello'], [P4 + 0.3, 'whoosh'], [melt, 'burbujas'], [P5 + 0.3, 'chof'], [fondo + 0.9, 'boing']];
const año = (t) => t < P4 ? 1943 : t < P5 ? 1943 + Math.min(3, Math.floor(tramo(t, P4, P5 - 0.05) * 3.4)) : 2026;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, cartela: '1943', año });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['dc-pauta'] = ('La pauta', '''// DC-PAUTA (frase 22), hoy. Cinco planos:
// 1. el escritorio de Atom: caen las seis carpetas una al lado de otra («side by side»); con «a pattern appears» una
//    mano pasa el sello por todas y en cada una queda la cara sonrojada; el gato espía se acerca al micrófono (corta en
//    «Most»);
// 2. el corcho de la conspiración (Fort Meade): con «weren't hiding a conspiracy» saltan las chinchetas y los hilos rojos
//    caen; con «embarrassment» el sello grande deja la cara sonrojada en el centro (corta en «A bomb»);
// 3. tres cuadros en la pared del archivo, que se encienden con su palabra: la Luna en el observatorio, con el cohete
//    de tiza y el destello dibujado («a bomb for the moon»); el gato del taller que se va de su cesta («wandered off»);
//    las gallinas dentro de la mina («chickens inside a mine») (corta en «Governments»);
// 4. la caja de archivo: entra una carpeta («keep secrets»), la tapa se cierra con el candado («good reasons»); con «but
//    sometimes» la tapa se levanta un poco y asoma una gallina (corta en «the idea»);
// 5. la sala de reuniones con el retroproyector: la diapositiva del portaaviones de hielo brilla y los mandos aplauden
//    («sounded better in a meeting»); con «than in the real world» la diapositiva cambia al barco derretido en un charco y
//    se les cae la cara; el gato cruza el retroproyector y su sombra pasa por la pantalla.''', r'''
const a = (f) => en('pauta', f);
const P2 = a(0.218), P3 = a(0.4278), P4 = a(0.6239), P5 = a(0.8302);
const files = a(0.0526), lado = a(0.0769), lado2 = a(0.1139), patron = a(0.1518);
const weren = a(0.2472), consp = a(0.2823), they = a(0.3299), emb = a(0.3718);
const bomba = a(0.4316), luna = a(0.4579), gato = a(0.4862), wander = a(0.5066), gall = a(0.5348), mina = a(0.5874);
const secretos = a(0.657), buenas = a(0.6923), pero = a(0.7397), razon = a(0.7814);
const suena = a(0.8516), mejor = a(0.874), reunion = a(0.911), than = a(0.9256), real = a(0.9606);
const k = T.C.k;
const hh = (i, s = 0) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], dith = (x, y) => (B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const mez = (c1, c2, u) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * u) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * u) << 8) | Math.round(r1 + ((c2 & 255) - r1) * u)) >>> 0; };
const suave = (u) => u * u * (3 - 2 * u);
const destello = (x, y, r, c = hex('#fff6d0')) => { for (let i = 1; i <= r; i++) { R.pset(x + i, y, c); R.pset(x - i, y, c); R.pset(x, y + i, c); R.pset(x, y - i, c); if (i < r) { R.pset(x + i, y + i, c); R.pset(x - i, y - i, c); R.pset(x + i, y - i, c); R.pset(x - i, y + i, c); } } R.pset(x, y, hex('#ffffff')); };

// 1 · el escritorio: las seis carpetas, una al lado de otra, y el sello de la cara sonrojada
const DIB = ['luna', 'gato', 'gallina', 'ojo', 'tanque', 'hielo'], XC = DIB.map((_, i) => 72 + i * 35);
const p1 = (t) => {
  T.hoy(R, t, { encuadre: 'archivo', camara: 'mesa', carpetas: [], sello: false });
  // el gato espía se acerca al micrófono de Atom, con cara de travieso
  const ug = tramo(t, 0.6, 2.2);
  T.gatoEspia(R, Math.round(lerp(96, 54, ug)), 175, t, { anda: ug > 0 && ug < 1, dir: -1, cara: 'travieso' });
  // las carpetas caen una a una sobre el cartapacio
  for (let i = 0; i < 6; i++) {
    const t0 = files - 0.4 + i * ((lado2 - files + 0.3) / 5), u = tramo(t, t0 - 0.35, t0); if (u <= 0) continue;
    const y = Math.round(lerp(-30, 150, u * u) - (t > t0 && t < t0 + 0.18 ? 3 : 0)), ts = patron - 0.15 + i * 0.17;
    R.rect(XC[i] - 18, 150, XC[i] + 18, 151, mez(R.pget(XC[i], 151), k, 0.4));
    T.PIEZAS_DC.carpeta(R, XC[i], y, { dibujo: DIB[i], s: 2, sello: t > ts ? 'sonrojado' : undefined });
    if (t > ts && t < ts + 0.22) destello(XC[i] + 2, 128, 4, hex('#f08aa0'));
  }
  // la mano con el sello recorre la fila de derecha a izquierda con «a pattern appears»
  const ue = tramo(t, patron - 0.7, patron - 0.15), uf = tramo(t, patron + 0.9, patron + 1.4);
  if (ue > 0 && uf < 1) {
    const f = Math.max(0, Math.min(5, (t - (patron - 0.15)) / 0.17)), i = Math.min(5, Math.floor(f)), fr = f - i;
    let sx = ue < 1 ? Math.round(lerp(330, XC[5] + 2, suave(ue))) : Math.round(lerp(XC[5 - i] + 2, XC[Math.max(0, 4 - i)] + 2, Math.max(0, (fr - 0.5) * 2))), sy = ue < 1 ? Math.round(lerp(40, 108, ue)) : Math.round(122 - Math.abs(Math.sin(fr * Math.PI)) * 14);
    if (t > patron + 0.85) { sx = Math.round(lerp(XC[0] + 2, -40, uf)); sy = Math.round(lerp(108, 40, uf)); }
    // la fila se sella al revés: de la última a la primera
    T.PIEZAS_DC.sello(R, sx, sy, { s: 2 }); T.brazo(R, sx + 40, sy - 60, sx + 12, sy - 24, '#5a4e6a', -1, { codo: [sx + 36, sy - 26] });
  }
};

// 2 · el corcho de la conspiración: los hilos caen; el sello grande de la cara sonrojada
const PIN = [[46, 46], [118, 34], [236, 44], [290, 92], [52, 140], [204, 150], [262, 154], [96, 98]], CEN = [160, 92];
const p2 = (t) => {
  T.psiquicos(R, t, { encuadre: 'fortmeade', camara: 'pared', gato: true });
  // los hilos rojos tensos de cada chincheta al centro; con «weren't» saltan y caen
  PIN.forEach(([px, py], i) => {
    const tc = weren + i * 0.09, u = tramo(t, tc, tc + 0.7);
    if (u <= 0) { R.linea(CEN[0], CEN[1], px, py, hex('#c8282a')); R.linea(CEN[0] + 1, CEN[1], px + 1, py, hex('#8a1e26')); }
    else if (u < 1) { const ex = Math.round(lerp(px, CEN[0] + (px - CEN[0]) * 0.3, u)), ey = Math.round(lerp(py, 200, u * u)), cy = Math.round(lerp(CEN[1], 200, Math.max(0, u - 0.45) / 0.55)); let x0 = CEN[0], y0 = cy;
      for (let s = 1; s <= 12; s++) { const q = s / 12, x1 = Math.round(lerp(CEN[0], ex, q)), y1 = Math.round(lerp(cy, ey, q) + Math.sin(q * Math.PI) * 10 * u); R.linea(x0, y0, x1, y1, hex('#c8282a')); x0 = x1; y0 = y1; }
      const pu = Math.min(1, u * 2.5); if (pu < 1) { R.disco(Math.round(px + pu * 10), Math.round(py - Math.sin(pu * Math.PI) * 8 + pu * pu * 20), 2, hex('#e8c040')); } }
    if (u <= 0) { R.disco(px, py, 2, k); R.disco(px, py, 1, hex('#e8c040')); }
  });
  R.disco(CEN[0], CEN[1], 3, k); R.disco(CEN[0], CEN[1], 2, hex('#3a6ad8')); R.pset(CEN[0] - 1, CEN[1] - 1, hex('#c8e0ff'));
  // el sello grande baja con «embarrassment» y deja la cara sonrojada
  const us = tramo(t, emb - 0.55, emb), uv = tramo(t, emb + 0.3, emb + 0.85);
  if (t > emb) { T.PIEZAS_DC.sello(R, 160, 118, { tipo: 'marca', cara: 'sonrojada', s: 5 }); if (t < emb + 0.35) for (let i = 0; i < 10; i++) { const an = i / 10 * Math.PI * 2, r = 24 + (t - emb) * 50; R.pset(Math.round(160 + Math.cos(an) * r), Math.round(100 + Math.sin(an) * r), hex('#f08aa0')); } }
  if (us > 0 && uv < 1) { const sx = Math.round(lerp(330, 160, suave(us)) + uv * 190), sy = Math.round(lerp(150, t > emb && uv === 0 ? 124 : 118, suave(us)) + uv * 40);
    T.PIEZAS_DC.sello(R, sx, sy, { s: 4 }); T.brazo(R, 360, sy + 10, sx + 22, sy - 48, '#5a4e6a', -1, { codo: [sx + 60, sy - 10] }); }
};

// 3 · tres cuadros en la pared del archivo (recortes de los decorados), que se encienden con su palabra
const MARCO = [[12, 48], [114, 48], [216, 48]], PW = 92, PH = 100;
const SRC = [[114, 0], [196, 70], [102, 50]];
const bufs = [null, null, null], vivo = [false, false, false];
let fPared = null;
const pared = () => {
  if (fPared) { R.copiar(fPared); return; }
  fPared = R.nuevo(); const prev = R.usar(fPared);
  // papel pintado verde oscuro de damasco, la moldura y el friso de madera
  for (let y = 0; y < 156; y++) for (let x = 0; x < 320; x++) { const mx = (x % 24) - 12, my = (y % 28) - 14, rombo = Math.abs(mx) / 12 + Math.abs(my) / 14;
    let c = rombo < 0.45 ? hex('#2e4a3a') : rombo > 0.92 && rombo < 1.02 ? hex('#3e5e48') : hex('#24392e'); if (dith(x, y) < 0.05) c = hex('#3e5e48'); if (y < 24 && dith(x, y) < 0.5) c = mez(c, hex('#141a18'), 0.3); R.pset(x, y, c); }
  R.rect(0, 30, 319, 33, hex('#5a3a20')); R.rect(0, 30, 319, 30, hex('#a87a4a'));
  for (let y = 156; y < 180; y++) for (let x = 0; x < 320; x++) { const pn = x % 53, c = pn < 2 ? hex('#3a2414') : y === 156 ? hex('#b8844a') : (Math.sin(x * 0.2 + y * 0.05) > 0.85 ? hex('#5a3a20') : hex('#6e4628')); R.pset(x, y, c); }
  R.rect(0, 154, 319, 157, hex('#3a2414')); R.rect(0, 154, 319, 154, hex('#c89a62'));
  // los marcos dorados con su paspartú y la placa de latón (sin letras)
  for (const [x, y] of MARCO) { R.rect(x - 6, y - 6, x + PW + 5, y + PH + 5, k); R.rect(x - 5, y - 5, x + PW + 4, y + PH + 4, hex('#a8802a')); R.rect(x - 5, y - 5, x + PW + 4, y - 4, hex('#f0d070')); R.rect(x - 5, y - 5, x - 4, y + PH + 4, hex('#d8b050'));
    for (let i = x - 3; i < x + PW + 3; i += 4) { R.pset(i, y - 3, hex('#6a4a1a')); R.pset(i, y + PH + 2, hex('#6a4a1a')); }
    R.rect(x - 2, y - 2, x + PW + 1, y + PH + 1, hex('#e8e0c8')); R.rect(x + PW / 2 - 9, y + PH + 7, x + PW / 2 + 9, y + PH + 11, k); R.rect(x + PW / 2 - 8, y + PH + 8, x + PW / 2 + 8, y + PH + 10, hex('#d8b050'));
    // la lámpara de cuadro, de latón, encima
    R.rect(x + PW / 2 - 14, y - 16, x + PW / 2 + 14, y - 12, k); R.rect(x + PW / 2 - 13, y - 15, x + PW / 2 + 13, y - 13, hex('#c8a040')); R.rect(x + PW / 2 - 1, y - 12, x + PW / 2 + 1, y - 7, hex('#8a6a2a')); }
  R.usar(prev); R.copiar(fPared);
};
const cuadro = (i, t) => {
  if (!bufs[i]) bufs[i] = R.nuevo();
  const prev = R.usar(bufs[i]);
  if (i === 0) { T.carrera(R, t, { encuadre: 'observatorio' }); T.carreraDelante(R, t, { encuadre: 'observatorio' }); }
  else if (i === 1) { T.animales(R, t, { encuadre: 'tallerCIA' }); T.animalesDelante(R, t, { encuadre: 'tallerCIA' });
    const ug = tramo(t, wander - 0.15, wander + 1.1); if (ug < 1) T.gatoEspia(R, Math.round(lerp(267, 196, ug)), 146 + (ug > 0 ? 2 : 0), t, { anda: ug > 0, dir: -1 }); }
  else { T.animales(R, t, { encuadre: 'campoNieve', camara: 'plano', trazo: 1 }); }
  R.usar(prev);
};
const lucesEn = [bomba - 0.15, gato - 0.15, gall - 0.15];
const p3 = (t) => {
  pared();
  for (let i = 0; i < 3; i++) {
    const enc = t > lucesEn[i];
    if (!bufs[i] || enc) cuadro(i, t);
    const b = bufs[i], [mx, my] = MARCO[i], [sx, sy] = SRC[i], osc = enc ? 0 : 0.62;
    for (let y = 0; y < PH; y++) for (let x = 0; x < PW; x++) { let c = b[(sy + y) * 320 + sx + x]; if (osc) c = mez(c, hex('#101418'), osc); R.pset(mx + x, my + y, c); }
    // el haz de la lámpara del cuadro, con motas
    if (enc) { const u = Math.min(1, (t - lucesEn[i]) * 5); R.rect(mx + PW / 2 - 12, my - 12, mx + PW / 2 + 12, my - 12, hex('#fff2c0'));
      for (let y = my - 11; y < my + 30; y++) for (let x = mx; x < mx + PW; x++) if (dith(x, y) < 0.22 * u * (1 - (y - my + 11) / 41)) R.pset(x, y, mez(R.pget(x, y), hex('#fff2c0'), 0.4));
      for (let j = 0; j < 5; j++) { const x = Math.round(mx + 10 + hh(j, i) * 70 + Math.sin(t + j) * 4), y = Math.round(my - 6 + ((t * 6 + hh(j, i + 3) * 30) % 30)); R.pset(x, y, hex('#fff8e0')); } }
  }
  // cuadro 1: el cohete de tiza va hacia la Luna y sale el destello dibujado (sin explosión)
  const [m0x, m0y] = MARCO[0], lx = m0x + 46, ly = m0y + 48, ur = tramo(t, bomba - 0.1, luna);
  R.recorte([m0x, m0y, m0x + PW - 1, m0y + PH - 1]);
  if (ur > 0) { const n = Math.round(ur * 30); for (let s = 0; s < n; s += 2) { const q = s / 30, x = Math.round(lerp(m0x + 8, lx, q)), y = Math.round(lerp(m0y + 96, ly + 10, q) - Math.sin(q * Math.PI) * 18); R.pset(x, y, hex('#f4f0e0')); }
    if (ur < 1) { const q = ur, x = Math.round(lerp(m0x + 8, lx, q)), y = Math.round(lerp(m0y + 96, ly + 10, q) - Math.sin(q * Math.PI) * 18); R.disco(x, y, 2, hex('#f4f0e0')); R.pset(x - 2, y + 2, hex('#e8783a')); } }
  if (t > luna && t < luna + 1.6) { const r = Math.min(10, Math.round((t - luna) * 30)); for (let j = 0; j < 8; j++) { const an = j / 8 * Math.PI * 2 + 0.2, rr = j % 2 ? r * 0.55 : r; R.linea(lx, ly + 8, Math.round(lx + Math.cos(an) * rr), Math.round(ly + 8 + Math.sin(an) * rr), hex('#f8e060')); } R.disco(lx, ly + 8, 2, hex('#fffbe8')); }
  // cuadro 3: las gallinas de verdad asoman y cacarean dentro de la mina con «chickens»
  const [m2x, m2y] = MARCO[2];
  R.recorte(null);
  if (t > gall - 0.1) [[18, 58], [46, 60], [72, 58]].forEach(([dx, dy], j) => { const sal = t > gall + j * 0.18 && t < gall + j * 0.18 + 0.25 ? 2 : 0; T.PIEZAS_DC.gallina(R, m2x + dx, m2y + dy - sal, { t, picotea: true, color: j === 1 ? 'parda' : undefined }); });
};

// 4 · la caja de archivo: la carpeta entra, la tapa se cierra con candado; asoma una gallina
const CAJA = { encuadre: 'archivos2004', camara: 'caja' };
const p4 = (t) => {
  const cierra = tramo(t, secretos - 0.3, secretos + 0.15), asoma = tramo(t, pero - 0.1, pero + 0.25), baja = tramo(t, razon + 0.5, razon + 0.8);
  const abre = t < secretos + 0.15 ? lerp(0.75, 0, suave(cierra)) : Math.max(0, 0.3 * asoma - 0.3 * baja);
  T.animales(R, t, { ...CAJA, abre });
  // la mano deja caer una carpeta con un mapa y una flecha (un secreto de los de verdad)
  const ue = tramo(t, P4 + 0.05, P4 + 0.55), uc = tramo(t, P4 + 0.55, secretos - 0.35);
  if (uc < 1) { const fx = 170, fy = Math.round(lerp(lerp(-10, 70, suave(ue)), 96, uc * uc));
    R.rect(fx - 20, fy - 26, fx + 20, fy, k); R.rect(fx - 19, fy - 25, fx + 19, fy - 1, hex('#d8c8a0')); R.rect(fx - 19, fy - 25, fx + 19, fy - 24, hex('#f0e4c0'));
    R.rect(fx - 14, fy - 21, fx + 6, fy - 6, hex('#7ab0c8')); R.poligono([[fx - 12, fy - 8], [fx - 4, fy - 20], [fx + 4, fy - 14], [fx + 4, fy - 7]], hex('#c8b47a')); R.linea(fx - 12, fy - 14, fx, fy - 12, hex('#c8282a')); R.linea(fx - 1, fy - 13, fx + 1, fy - 11, hex('#c8282a')); R.disco(fx + 12, fy - 13, 3, hex('#c8282a'));
  }
  // el candado del frente con «good reasons»
  const uk = tramo(t, buenas - 0.3, buenas);
  if (uk > 0) { const kx = 164, ky = Math.round(lerp(60, 128, suave(uk)));
    R.rect(kx - 3, ky - 14, kx + 3, ky - 13, k); R.rect(kx - 4, ky - 13, kx - 3, ky - 8, k); R.rect(kx + 3, ky - 13, kx + 4, ky - 8, k); R.pset(kx - 3, ky - 13, hex('#c8ccd8'));
    R.rect(kx - 7, ky - 8, kx + 7, ky + 4, k); R.rect(kx - 6, ky - 7, kx + 6, ky + 3, hex('#d8a830')); R.rect(kx - 6, ky - 7, kx + 6, ky - 6, hex('#f8e070')); R.disco(kx, ky - 2, 1, k); R.rect(kx, ky - 1, kx, ky + 1, k); }
  // la gallina asoma por la rendija con «but sometimes», mira a un lado y a otro, y se esconde
  if (asoma > 0 && baja < 1) { const yb = Math.round(lerp(92, 66, asoma) + baja * 26); T.PIEZAS_DC.gallina(R, 176, yb, { s: 2, t, dir: Math.sin((t - pero) * 3) > 0 ? 1 : -1 });
    const top = Math.round(83 - Math.sin(abre * Math.PI * 0.62) * 52); R.poligono([[96, 94], [232, 94], [242, top + 2], [108, top + 2]], hex('#6a7480')); R.linea(108, top + 2, 242, top + 2, hex('#8a949e')); }
};

// 5 · la sala de reuniones: la diapositiva del barco de hielo… y la del mundo real
const SALA = { encuadre: 'revision', cruces: 0 };
const diapo = (t, real) => {
  R.recorte([101, 28, 195, 89]);
  R.poligono([[101, 28], [195, 28], [195, 89], [101, 89]], hex('#f4f2ec'));
  for (let y = 30; y < 88; y++) for (let x = 102; x < 195; x++) if (((x + y) & 1) === 0 && dith(x, y) < 0.3) R.pset(x, y, hex('#fffbe0'));
  if (!real) {
    // el portaaviones de hielo, flamante: el mar, el casco con brillo, la isla y tres aviones
    R.poligono([[101, 70], [195, 70], [195, 89], [101, 89]], hex('#7ab0d8')); for (let x = 104; x < 194; x += 6) R.linea(x, 76 + (x % 12 ? 0 : 4), x + 3, 76 + (x % 12 ? 0 : 4), hex('#c8e4f4'));
    R.poligono([[112, 60], [186, 60], [178, 72], [118, 72]], k); R.poligono([[113, 61], [185, 61], [177, 71], [119, 71]], hex('#d8f2fc')); R.linea(113, 61, 185, 61, hex('#ffffff')); R.linea(120, 69, 176, 69, hex('#8ac4dc'));
    R.poligono([[160, 50], [170, 50], [170, 60], [160, 60]], k); R.poligono([[161, 51], [169, 51], [169, 59], [161, 59]], hex('#b8e4f4'));
    for (const [x, y] of [[124, 56], [138, 54], [148, 57]]) { R.linea(x, y, x + 7, y, hex('#3a4a6a')); R.linea(x + 2, y - 2, x + 2, y + 2, hex('#3a4a6a')); }
    for (let j = 0; j < 4; j++) { const p = (Math.sin(t * 5 + j * 1.7) + 1) / 2; if (p > 0.4) destello([118, 182, 140, 176][j], [44, 40, 36, 52][j], 2 + Math.round(p * 2), hex('#f8e060')); }
  } else {
    // el mundo real: el barco derretido en un charco que gotea, con la bandera caída
    R.poligono([[101, 74], [195, 74], [195, 89], [101, 89]], hex('#c8b890'));
    for (let y = 72; y < 88; y++) for (let x = 108; x < 190; x++) if (((x - 148) / 40) ** 2 + ((y - 80) / 7) ** 2 < 1) R.pset(x, y, ((x + y) % 7 === 0) ? hex('#e8f8fc') : hex('#8ac8e8'));
    R.poligono([[126, 76], [140, 66], [158, 64], [172, 72], [170, 78], [128, 80]], k); R.poligono([[128, 76], [141, 67], [157, 65], [170, 72], [168, 77], [130, 79]], hex('#b8e0ee'));
    for (let j = 0; j < 4; j++) { const f = (t * 1.5 + j / 4) % 1; R.pset(134 + j * 9, Math.round(70 + f * 10), hex('#5aa8d8')); }
    R.linea(160, 64, 166, 58, k); R.poligono([[166, 58], [172, 62], [166, 63]], hex('#c8282a'));
    R.rect(144, 40, 150, 42, k); R.rect(146, 34, 148, 46, k); R.pset(150, 36, k);
  }
  R.recorte(null);
};
const p5 = (t) => {
  const g = T.psiquicos(R, t, SALA);
  const realista = t > than;
  diapo(t, realista);
  // los mandos sentados: aplauden con «better» y se les cae la cara con «real world»
  const aplaude = t > mejor - 0.1 && t < reunion + 0.2, caida = t > real - 0.1;
  R.actor(EL.generalAF, 58, 150, t, { dir: 1, brazos: aplaude && Math.sin(t * 14) > 0, sonrisa: t < than, sorpresa: caida && t < real + 0.8, triste: t > real + 0.8 });
  R.actor(EL.oficialAliado, 84, 150, t, { dir: 1, sonrisa: t < than, habla: t > suena && t < mejor && Math.sin(t * 8) > 0, sorpresa: caida && t < real + 1.0, triste: t > real + 1.0 });
  R.actor(EL.generalAF2, 228, 150, t, { dir: -1, brazos: aplaude && Math.sin(t * 13 + 1) > 0, sonrisa: t < than, sorpresa: caida, enfado: t > real + 1.4 });
  R.actor(EL.oficialAliado2, 252, 150, t, { dir: -1, sonrisa: t < than, sorpresa: caida && t < real + 0.6, triste: t > real + 0.6 });
  // el que presenta, de pie junto a la pantalla: señala la diapositiva y cambia la transparencia con «than»
  const cambia = t > than - 0.35 && t < than + 0.2;
  const pr = R.actor(EL.portavoz, 202, 150, t, { dir: -1, dedo: t < than - 0.4, habla: t < than - 0.4 && Math.sin(t * 7) > 0, sostiene: cambia ? [186, 136] : undefined, sorpresa: t > real && t < real + 0.9, triste: t > real + 0.9 });
  if (cambia) { const [hx, hy] = pr.mano; R.rect(hx - 6, hy - 1, hx, hy + 3, k); R.rect(hx - 5, hy, hx - 1, hy + 2, hex('#d8eef8')); }
  T.psiquicosDelante(R, t, SALA);
  // el gato espía cruza por encima del retroproyector… y su sombra pasa enorme por la pantalla
  const ug = tramo(t, real + 0.5, P5 + 4.9);
  if (ug > 0 && ug < 1) { const gx = Math.round(lerp(122, 178, ug)); T.gatoEspia(R, gx, 141, t, { anda: true, dir: 1 });
    if (gx > 136 && gx < 166) { const sx = Math.round(lerp(196, 100, (gx - 136) / 30)), sy = 74, c = hex('#3a3a44'), p = Math.floor(t * 6) % 2;
      R.recorte([101, 28, 195, 89]); R.disco(sx, sy, 9, c); R.disco(sx + 10, sy, 8, c); R.disco(sx + 18, sy - 7, 6, c); R.poligono([[sx + 14, sy - 12], [sx + 16, sy - 20], [sx + 19, sy - 12]], c); R.poligono([[sx + 19, sy - 12], [sx + 23, sy - 20], [sx + 24, sy - 10]], c);
      for (const d of [-6, 0, 8, 14]) R.linea(sx + d, sy + 6, sx + d + ((d / 2 + p) % 2 ? 2 : -2), sy + 16, c); R.linea(sx - 8, sy - 2, sx - 14, sy - 14, c); R.linea(sx - 9, sy - 2, sx - 15, sy - 14, c); R.linea(sx + 18, sy - 14, sx + 22, sy - 26, c); R.recorte(null); } }
};

const efectos = [[files - 0.4, 'papel'], [lado2, 'papel'], [patron - 0.15, 'sello'], [weren, 'pop'], [emb, 'sello'], [bomba, 'whoosh'], [luna, 'brillo'], [wander, 'miau'], [gall, 'pop'], [secretos + 0.1, 'cerrojo'], [buenas, 'toc'], [pero + 0.1, 'pop'], [mejor, 'palmada'], [than, 'papel'], [real, 'aviso'], [real + 1.3, 'miau']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2026 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['dc-cierre'] = ('Cierre', '''// DC-CIERRE (frase 23), hoy. Dos planos:
// 1. el archivo de Atom a oscuras: el círculo de la linterna recorre las estanterías y baja al escritorio («comments»,
//    «which of these files»); con «fake?» salen tres «?» sobre las carpetas; la linterna va al sitio del micrófono y no
//    está: solo el cable cortado y un «!»; bajo el escritorio brillan dos ojos (corta en «Meanwhile»);
// 2. bajo el escritorio, a ras de suelo (gag 8): el gato espía está sentado con el micrófono de Atom en la boca; la
//    linterna lo encuentra con «the cat», se queda helado y con «ran off» sale corriendo con el micrófono y el cable
//    detrás; la luz lo persigue y solo encuentra el cable que se escurre; con «again» el gato asoma por encima de las
//    cajas, travieso, y se va.''', r'''
const a = (f) => en('cierre', f);
const P2 = a(0.4612);
const coment = a(0.0934), which = a(0.1378), files = a(0.2265), fake = a(0.3667);
const find = a(0.6247), gato = a(0.6831), ran = a(0.7391), off = a(0.7695), micro = a(0.8489), otra = a(0.9143);
const k = T.C.k;
const hh = (i, s = 0) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], dith = (x, y) => (B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const mez = (c1, c2, u) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * u) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * u) << 8) | Math.round(r1 + ((c2 & 255) - r1) * u)) >>> 0; };
const suave = (u) => u * u * (3 - 2 * u);
// un recorrido por puntos clave [t, x, y]
const ruta = (t, K) => { if (t <= K[0][0]) return [K[0][1], K[0][2]]; for (let i = 0; i < K.length - 1; i++) if (t < K[i + 1][0]) { const u = suave((t - K[i][0]) / (K[i + 1][0] - K[i][0])); return [Math.round(lerp(K[i][1], K[i + 1][1], u)), Math.round(lerp(K[i][2], K[i + 1][2], u))]; } const l = K[K.length - 1]; return [l[1], l[2]]; };

// 1 · el archivo a oscuras: la linterna busca y el micrófono no está
const LIN1 = [[0, 40, 60], [0.9, 70, 96], [coment, 130, 128], [which, 150, 134], [files, 196, 134], [fake - 0.3, 172, 134], [fake + 0.1, 172, 134], [fake + 0.35, 226, 136]];
const p1 = (t) => {
  const AR = { encuadre: 'archivo', luz: 0, microfono: false, linterna: ruta(t, LIN1), radio: t > files - 0.3 && t < fake + 0.2 ? 30 : 24 };
  T.hoy(R, t, AR);
  // el cable del micrófono, que cuelga cortado del borde del escritorio
  R.linea(230, 141, 233, 147, k); R.linea(233, 147, 232, 156, k); R.pset(232, 157, hex('#c8a040'));
  T.hoyDelante(R, t, AR);
  // con «fake?», tres «?» sobre las carpetas
  if (t > files) [[150, 116], [174, 112], [196, 118]].forEach(([x, y], i) => { if (t > files + i * ((fake - files) / 2)) { const b = Math.round(Math.sin((t - fake) * 6 + i) * 1.5); R.icono('?', x, y + b, hex('#f8e070'), k, 2); } });
  // el sitio del micrófono, vacío: el cerco sin polvo y un «!»
  if (t > fake + 0.3) { R.linea(221, 141, 231, 141, hex('#e8d8b0')); R.pset(220, 140, hex('#e8d8b0')); R.pset(232, 140, hex('#e8d8b0')); if (t > fake + 0.4) R.icono('!', 225, 112 + Math.round(Math.sin(t * 8)), hex('#ff6a5a'), k, 2); }
  // los dos ojos del gato bajo el escritorio
  if (t > files && Math.floor(t * 1.7) % 3 !== 2) { R.rect(196, 163, 197, 163, hex('#e8d040')); R.rect(201, 163, 202, 163, hex('#e8d040')); }
};

// 2 · a ras de suelo, bajo el escritorio: el gato con el micrófono
let f2 = null;
const fijo2 = () => {
  if (f2) { R.copiar(f2); return; }
  f2 = R.nuevo(); const prev = R.usar(f2);
  // la pared del fondo con el zócalo y el papel de rayas
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { let c = (x % 12) < 6 ? hex('#5a3e3a') : hex('#4e3632'); if (x % 12 === 0) c = hex('#6a4a44'); if (dith(x, y) < 0.04) c = hex('#7a5a50'); R.pset(x, y, c); }
  R.rect(0, 100, 319, 112, hex('#3a2414')); R.rect(0, 100, 319, 101, hex('#8a5a32'));
  // el parqué en perspectiva hacia el fondo
  for (let y = 112; y < 180; y++) { const d = (y - 112) / 68; for (let x = 0; x < 320; x++) { const xx = (x - 160) / (0.4 + d), tab = Math.floor(xx / 14), lin = Math.abs(xx - tab * 14) < 0.6 / (0.4 + d);
    const fila = Math.floor((y - 112) * (1 + d) / 6), j = ((tab + fila * 3) % 5 + 5) % 5 === 0 && ((y - 112) * (1 + d)) % 6 < 1;
    let c = lin || j ? hex('#3a2414') : (tab & 1 ? hex('#8a5a32') : hex('#9a6a3e')); if (!lin && dith(x, y) < 0.05) c = hex('#b8844a'); R.pset(x, y, c); } }
  // el lateral del escritorio, con los cajones y los tiradores (izquierda)
  R.rect(0, 0, 70, 170, k); R.rect(0, 0, 68, 168, hex('#5a3420')); for (let y = 6; y < 166; y += 40) { R.rect(6, y, 62, y + 34, k); R.rect(7, y + 1, 61, y + 33, hex('#6e4228')); R.rect(7, y + 1, 61, y + 1, hex('#9a6a42')); R.rect(28, y + 15, 40, y + 18, hex('#c8a040')); R.rect(28, y + 15, 40, y + 15, hex('#f0d070')); }
  for (let y = 0; y < 168; y++) if (hh(y, 9) < 0.2) R.linea(2, y, 4, y, hex('#4a2818'));
  // las cajas de archivo apiladas (derecha)
  for (const [x, y, w, hgt] of [[226, 118, 46, 40], [272, 112, 48, 46], [236, 80, 40, 38], [280, 70, 40, 42]]) { R.rect(x, y, x + w, y + hgt, k); R.rect(x + 1, y + 1, x + w - 1, y + hgt - 1, hex('#b89a6a')); R.rect(x + 1, y + 1, x + w - 1, y + 3, hex('#d8bc8a')); R.rect(x + w - 6, y + 4, x + w - 1, y + hgt - 1, hex('#8a7048')); R.rect(x + 8, y + 12, x + 24, y + 22, hex('#f0ead8')); R.linea(x + 10, y + 15, x + 22, y + 15, hex('#b8b0a0')); R.linea(x + 10, y + 18, x + 20, y + 18, hex('#b8b0a0')); R.rect(x + w / 2 - 5, y + hgt - 10, x + w / 2 + 3, y + hgt - 7, k); }
  // la papelera de rejilla y una carpeta caída con hojas
  R.rect(84, 128, 108, 162, k); for (let x = 85; x < 108; x += 3) R.linea(x, 129, x, 161, hex('#6a6e78')); for (let y = 132; y < 160; y += 5) R.linea(85, y, 107, y, hex('#4a4e58')); R.rect(83, 126, 109, 128, hex('#8a8e98'));
  R.poligono([[150, 164], [184, 160], [192, 170], [156, 176]], k); R.poligono([[151, 165], [183, 161], [190, 169], [157, 175]], hex('#d8c8a0')); R.poligono([[170, 166], [198, 166], [200, 174], [172, 176]], hex('#f4f0e4')); for (let i = 0; i < 3; i++) R.linea(174, 168 + i * 2, 196, 168 + i * 2, hex('#b8b0a0'));
  R.disco(180, 166, 3, hex('#c8303a'));
  R.usar(prev); R.copiar(f2);
};
const LIN2 = [[P2, 30, 140], [P2 + 0.6, 110, 150], [find - 0.2, 120, 130], [gato, 160, 142], [ran + 0.1, 160, 142], [micro + 0.5, 300, 146], [otra + 0.15, 280, 120], [otra + 0.4, 286, 92]];
const p2 = (t) => {
  fijo2();
  // el haz de luna por la ventana (que no se ve): una franja de luz en el suelo con motas
  for (let y = 112; y < 180; y++) { const x0 = Math.round(110 + (y - 112) * 0.5); for (let x = x0; x < x0 + 70; x++) if (dith(x, y) < 0.25) R.pset(x, y, mez(R.pget(x, y), hex('#c8d8f0'), 0.35)); }
  for (let i = 0; i < 8; i++) { const x = Math.round(130 + hh(i, 1) * 60 + Math.sin(t * 0.7 + i) * 4), y = Math.round(170 - ((t * 5 + hh(i, 2) * 60) % 60)); R.pset(x, y, hex('#e8f0ff')); }
  // el cable del micrófono, desde el borde del escritorio hasta la boca del gato
  const corre = tramo(t, ran - 0.05, micro + 0.6), sentado = t < ran - 0.05;
  const gx = sentado ? 152 : Math.round(lerp(150, 340, corre)), gy = 158;
  const bx = sentado ? gx + 26 : gx + 38, by = gy - 12;
  { let x0 = 66, y0 = 40; for (let s = 1; s <= 16; s++) { const q = s / 16, x1 = Math.round(lerp(66, bx, q)), y1 = Math.round(lerp(40, by, q) + Math.sin(q * Math.PI) * (sentado ? 30 : 10) + (sentado ? 0 : Math.sin(q * 9 - t * 30) * 2)); R.linea(x0, y0, x1, y1, hex('#1a1a22')); x0 = x1; y0 = y1; } }
  // el gato espía con el micrófono en la boca (a escala 2)
  const helado = t > gato - 0.05 && t < ran - 0.05;
  if (sentado) T.gatoEspia(R, gx + 10, gy, t, { s: 2, microfono: true, cara: helado ? 'normal' : 'travieso' });
  else if (gx < 340) T.gatoEspia(R, gx + 14, gy, t, { s: 2, microfono: true, anda: true, dir: 1 });
  if (helado) R.icono('!', gx + 12, gy - 52 + Math.round(Math.sin(t * 9)), hex('#ff6a5a'), k, 2);
  // con «again», asoma por encima de las cajas, travieso, y se va
  const ua = tramo(t, otra + 0.1, otra + 0.45), ub = tramo(t, otra + 1.3, otra + 1.7);
  if (ua > 0 && ub < 1) { const yy = Math.round(lerp(82, 66, ua) + ub * 18); R.recorte([0, 0, 319, 79]); T.gatoEspia(R, 292, yy, t, { cara: 'travieso', microfono: true, dir: -1 }); R.recorte(null); R.rect(278, 70, 319, 80, k); R.rect(281, 71, 319, 73, hex('#d8bc8a')); R.rect(281, 74, 319, 80, hex('#b89a6a')); }
  // la oscuridad con el círculo de la linterna (lo de la linterna es de Atom, fuera de cuadro)
  const persigue = t > ran && t < micro + 0.5, ga = Math.round(lerp(150, 340, tramo(t - 0.18, ran - 0.05, micro + 0.6)));
  const [lx, ly] = persigue ? [Math.min(300, ga + 28), 146] : ruta(t, LIN2), rad = 30;
  const oscuro = hex('#0a0c1a');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d2 = (x - lx) ** 2 + (y - ly) ** 2; if (d2 > rad * rad) { const borde = d2 < (rad + 4) ** 2 ? 0.4 : 0.62; R.pset(x, y, mez(R.pget(x, y), oscuro, borde)); } else if (d2 > (rad - 3) ** 2 && dith(x, y) < 0.3) R.pset(x, y, mez(R.pget(x, y), hex('#fff6d0'), 0.25)); }
  // los ojos del gato brillan aunque esté a oscuras
  if (sentado && !helado) { const e = gx + 10; R.rect(e + 6, gy - 20, e + 7, gy - 20, hex('#e8d040')); R.rect(e + 13, gy - 20, e + 14, gy - 20, hex('#e8d040')); }
};

const efectos = [[0.2, 'interruptor'], [files, 'pop'], [fake + 0.4, 'golpecito'], [gato, 'aviso'], [ran, 'whoosh'], [micro - 0.2, 'carro'], [otra + 0.3, 'miau']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 2026 });
''')
