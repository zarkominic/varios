# Borrador de las escenas du-florence y du-carta (grupo S2), ya con el movimiento.
# COMUN: utilidades que comparten las dos escenas (búfer de fondo fijo, ruido, papel).
COMUN = r'''
const PD = T.PIEZAS_DU, K = T.C.k, { rect, pset, linea, disco, poligono } = R;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const ease = (u) => u * u * (3 - 2 * u);
const B4 = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
// un fondo fijo se pinta una vez en su búfer y luego se copia (sin romper los fundidos)
const FIJOS = {};
const fijo = (k, f) => { if (!FIJOS[k]) { FIJOS[k] = R.nuevo(); const prev = R.usar(FIJOS[k]); f(); R.usar(prev); } R.copiar(FIJOS[k]); };
const PAPEL = hex('#efe6d0'), PAPELS = hex('#cfc4a8'), GRIS = hex('#8a8a96'), ROJO = hex('#c8303a'), MAD = hex('#8a5a34'), MADL = hex('#a8763f'), MADS = hex('#6a4024'), MADK = hex('#4a2c18'), LATON = hex('#d8a838'), LATONL = hex('#f6dc88');
const AR = T.C.arena, ARS = T.C.arenaS, ARL = T.C.arenaL;
// una hoja de papel con sus renglones (rayas, sin letras)
const hoja = (x, y, w, a, o = {}) => { rect(x - 1, y - 1, x + w, y + a, K); rect(x, y, x + w - 1, y + a - 1, o.c ?? PAPEL); rect(x + w - 1, y + 1, x + w - 1, y + a - 1, PAPELS); rect(x, y + a - 1, x + w - 1, y + a - 1, PAPELS);
  for (let j = o.y0 ?? 4; j < a - 3; j += 3) rect(x + 3, y + j, x + w - 4 - ((j * 7 + x) % 5), y + j, o.tinta ?? GRIS); };
// madera con vetas en [x0, y0, x1, y1]
const madera = (x0, y0, x1, y1, c, cs, k = 0) => { rect(x0, y0, x1, y1, c); const n = Math.round((x1 - x0) * (y1 - y0) / 90); for (let i = 0; i < n; i++) { const x = Math.round(x0 + hh(i, 1, k) * (x1 - x0)), y = Math.round(y0 + hh(i, 2, k) * (y1 - y0)), L = 5 + Math.round(hh(i, 3, k) * 16); rect(x, y, Math.min(x1, x + L), y, cs); } };
'''

E = {}

E['du-florence'] = ('Florence', '''// DU-FLORENCE (frases 4–5), 1957, cartela «1957». Siete planos:
// 1. la mesa de Herbert desde arriba: la máquina escribe sola y una mano deja la tarjeta de sus 36 años (corta en «for newspapers»);
// 2. inserto en alzado (fondo local): periódicos y revistas en su listón, el corcho de las facturas y la sumadora cuya
//    cinta no para (sobre la mesa de la cocina, con su hule de cuadros); una mano clava otra factura y saltan los «!» (corta en «That year»);
// 3. Florence: Herbert llega con su libreta y toma notas; una vecina barre la arena de la calle (corta en «where»);
// 4. las dunas de 1957, sin hierba: el viento arranca velos de la cresta, la lengua de arena cruza la carretera y sube por
//    la casa; a Herbert se le vuela una hoja y el hombre de la pala se rinde (corta en «The wind»);
// 5. el mapa de la costa: flechas de viento desde el mar y la franja de arena que avanza y tapa una carretera, un bosque y
//    una casa, cada uno en su palabra (corta en «the Department»);
// 6. inserto en corte (fondo local): dos manos plantan matas de hierba de playa; en «roots» bajan las raíces y en «held»
//    la arena que volaba se para (corta en «Herbert chartered»);
// 7. las dunas desde el aire: la avioneta, su sombra que corre por la arena y los destellos de la cámara.''', COMUN + r'''
const ha = (s) => en('herbert', (s - 1.5) / 15.304), da = (s) => en('dunas', (s - 18.686) / 15.309);   // segundos de la voz inglesa → fracción de su frase
const P2 = ha(5.12), P3 = ha(9.14), P4 = ha(14.16), P5 = da(20.08), P6 = da(25.08), P7 = da(31.44), FIN = da(35.8);
const MANGA = '#b9a988', MANGAF = '#6a7a4a';
const SA = ['#76809a', '#9aa0ac', '#c2bfb0', '#ddd5ba', '#eee7cd', '#fbf7e6'].map(hex);   // la arena fría de Oregón (la del decorado)
const porTramos = (t, pts) => { if (t <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (t <= pts[i][0]) return lerp(pts[i - 1][1], pts[i][1], (t - pts[i - 1][0]) / (pts[i][0] - pts[i - 1][0])); return pts[pts.length - 1][1]; };

// ── 1 · la mesa ──
const tarjeta = (cx, cy, t) => { rect(cx - 30, cy - 17, cx + 30, cy + 17, K); rect(cx - 29, cy - 16, cx + 29, cy + 16, PAPEL); rect(cx - 29, cy + 14, cx + 29, cy + 16, PAPELS); rect(cx - 27, cy - 14, cx + 27, cy - 14, hex('#e8a0b0')); rect(cx - 27, cy + 12, cx + 27, cy + 12, hex('#e8a0b0'));
  rect(cx - 25, cy + 1, cx - 9, cy + 10, K); rect(cx - 24, cy + 2, cx - 10, cy + 9, hex('#f0a0b0')); rect(cx - 24, cy + 2, cx - 10, cy + 3, hex('#fff4f0')); rect(cx - 24, cy + 6, cx - 10, cy + 6, hex('#c86a80'));
  for (const dx of [-21, -17, -13]) { rect(cx + dx, cy - 5, cx + dx, cy, ROJO); pset(cx + dx, cy - 7 + (Math.sin(t * 9 + dx) > 0 ? 0 : 1), hex('#ffc040')); }
  R.numero('36', cx + 9, cy + 9, { centro: true, tam: 16 }); };
const p1 = (t) => {
  T.casa(R, t, { camara: 'mesa', epoca: 1957, escribe: lerp(0.12, 0.98, tramo(t, 1.3, P2 + 0.3)), teclea: true });
  const u = ease(tramo(t, ha(2.7), ha(3.6))), v = ease(tramo(t, ha(4.0), ha(4.9)));
  const cx = Math.round(lerp(226, 170, u)), cy = Math.round(lerp(214, 146, u));
  if (u > 0) tarjeta(cx, cy, t);
  const mx = cx + 41 + Math.round(v * 30), my = cy + 4 + Math.round(v * 46);
  if (u > 0 && v < 1) T.brazo(R, mx + 24, my + 44, mx, my, MANGA, -1, { codo: [mx + 19, my + 16] });
};

// ── 2 · las facturas (alzado) ──
const periodico = (x, y, w, a) => { hoja(x, y, w, a, { y0: 99 }); rect(x + 3, y + 3, x + w - 4, y + 5, hex('#2a2a3a')); rect(x + 3, y + 8, x + w - 10, y + 9, hex('#4a4a5a'));
  rect(x + 3, y + 12, x + Math.round(w / 2) - 1, y + 24, hex('#9aa0a8')); poligono([[x + 3, y + 24], [x + 9, y + 17], [x + Math.round(w / 2) - 1, y + 24]], hex('#6a7078')); disco(x + Math.round(w / 2) - 4, y + 15, 1, PAPEL);
  for (let j = 12; j < a - 3; j += 2) { rect(x + Math.round(w / 2) + 2, y + j, x + w - 4 - (j % 3), y + j, GRIS); if (j > 26) rect(x + 3, y + j, x + Math.round(w / 2) - 1 - (j % 4), y + j, GRIS); }
  rect(x, y + a - 2, x + w - 1, y + a - 1, PAPELS); };
const revista = (x, y, w, a, c, cl, n) => { rect(x - 1, y - 1, x + w, y + a, K); rect(x, y, x + w - 1, y + a - 1, c); rect(x, y, x + w - 1, y + 6, cl); rect(x + 3, y + 2, x + w - 12, y + 4, K);
  disco(x + Math.round(w / 2), y + 20, 7, cl); disco(x + Math.round(w / 2) + 2, y + 18, 5, c); for (let j = 0; j < 3; j++) rect(x + 3, y + a - 12 + j * 3, x + w - 4 - j * 5, y + a - 12 + j * 3, cl);
  rect(x, y, x, y + a - 1, hex('#f6f2e6')); };
const pinza = (x, y) => { rect(x - 2, y - 4, x + 2, y + 3, K); rect(x - 1, y - 3, x + 1, y + 2, hex('#c8a060')); pset(x, y - 1, hex('#8c90a4')); };
const factura = (x, y, n, chin = true) => { hoja(x, y, 30, 36, { y0: 9 }); rect(x + 3, y + 3, x + 16, y + 5, hex('#3a5a8a')); rect(x + 2, y + 22, x + 27, y + 34, PAPEL); rect(x + 3, y + 22, x + 26, y + 22, K); R.numero(n, x + 15, y + 33, { centro: true });
  if (chin) { disco(x + 13, y + 1, 2, K); disco(x + 13, y + 1, 1, ROJO); } };
const fondoFact = () => {
  const W1 = hex('#d6cdb0'), W2 = hex('#cbc2a2'), W3 = hex('#b6ab88');
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 17 ? W3 : !(x > 266 && y < 52) && x % 14 < 2 ? W2 : W1);
  for (let j = 0; j < 8; j++) for (let i = 0; i < 23; i++) { const x = 7 + i * 14, y = 24 + j * 12 + (i % 2) * 6; if (x > 262 && y < 54) continue; pset(x, y, W3); pset(x - 1, y + 1, W3); pset(x + 1, y + 1, W3); pset(x, y + 2, W3); }
  rect(0, 17, 319, 18, hex('#8a6a44')); rect(0, 19, 319, 19, hex('#5a4028'));
  for (let y = 20; y < 30; y++) for (let x = 0; x < 320; x++) if (B4[y & 3][x & 3] < (30 - y) * 1.2 && !(x > 266)) pset(x, y, W2);
  madera(0, 108, 319, 116, MAD, MADS, 3); rect(0, 107, 319, 107, MADK); rect(0, 108, 319, 108, MADL);
  // la mesa de la cocina contra la pared: debajo, el friso de tablas, el rodapié y el linóleo; encima, el hule de cuadros
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 164 ? (x % 16 === 0 ? hex('#6f8270') : x % 16 === 1 ? hex('#a3b39c') : (x * 5 + y * 3) % 23 === 0 ? hex('#839682') : hex('#8fa08a')) : y < 171 ? (y === 164 ? K : y === 165 ? MADL : MAD) : y === 171 ? K : ((x + (y - 172) * 2) >> 4) % 2 ? hex('#d8cfae') : hex('#5a8a84'));
  for (let y = 128; y < 164; y++) for (let x = 0; x < 320; x++) if (B4[y & 3][x & 3] < (164 - y) * 0.5 - 4) pset(x, y, hex('#5f7262'));
  for (const x of [12, 300]) { rect(x, 128, x + 8, 174, K); madera(x + 1, 128, x + 7, 173, MADL, MAD, 7 + x); rect(x + 1, 128, x + 2, 173, hex('#c89858')); }
  { const HB = hex('#f4efe2'), HBs = hex('#ddd6c4'), HR = hex('#c8463e'), HRs = hex('#e6a39a');
    rect(0, 117, 319, 117, K);
    for (let y = 118; y <= 152; y++) for (let x = 0; x < 320; x++) { const caida = y > 127, hem = 147 + Math.round(3 * Math.sin(x * 0.21)); if (caida && y > hem) { if (y < hem + 5 && B4[y & 3][x & 3] < 9) pset(x, y, hex('#4f6252')); continue; }
      const a = (x >> 3) % 2, b = ((caida ? y - 128 : (y - 118) * 2 + 4) >> 3) % 2, pliegue = caida && (x % 46 < 3); pset(x, y, y === 128 ? hex('#b8b0a0') : caida && y === hem ? K : a && b ? (pliegue ? hex('#a03830') : HR) : a || b ? (pliegue ? hex('#c88880') : HRs) : pliegue ? HBs : HB); } }
  // el listón de la prensa con sus pinzas y un periódico
  rect(12, 25, 132, 30, K); madera(13, 26, 131, 29, MADL, MAD, 31); for (const x of [18, 126]) { disco(x, 27, 1, K); }
  periodico(18, 33, 34, 62); pinza(35, 31);
  // el corcho con tres facturas
  rect(146, 24, 276, 106, K); madera(147, 25, 275, 105, MAD, MADS, 33); rect(150, 28, 272, 102, K);
  for (let y = 29; y <= 101; y++) for (let x = 151; x <= 271; x++) { const v = hh(x, y, 9); pset(x, y, v < 0.14 ? hex('#a87e4a') : v > 0.9 ? hex('#dcb880') : hex('#c49a62')); }
  factura(154, 32, '$40'); factura(184, 62, '$65'); factura(212, 31, '$90');
  // un calendario de pared (solo la rejilla) junto al corcho
  rect(286, 60, 312, 98, K); rect(287, 61, 311, 97, PAPEL); rect(287, 61, 311, 68, ROJO); for (const x of [292, 306]) { rect(x, 58, x, 62, hex('#8c90a4')); } for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) pset(290 + i * 4, 73 + j * 5, i === 5 ? ROJO : GRIS), pset(291 + i * 4, 73 + j * 5, i === 5 ? ROJO : GRIS); rect(297, 82, 300, 84, K); rect(287, 96, 311, 97, PAPELS);
  // sobre el tablero: el fardo de periódicos, el pincho, la sumadora, el tarro y los sobres
  for (let j = 0; j < 6; j++) { rect(11 + (j % 2), 121 - j * 4 - 3, 58 - (j % 3), 121 - j * 4, K); rect(12 + (j % 2), 121 - j * 4 - 2, 57 - (j % 3), 121 - j * 4 - 1, j % 2 ? PAPEL : PAPELS); rect(14, 121 - j * 4 - 2, 30, 121 - j * 4 - 2, GRIS); }
  rect(33, 97, 34, 121, hex('#a8543a')); rect(12, 108, 57, 108, hex('#a8543a'));
  rect(72, 119, 92, 122, K); rect(73, 120, 91, 121, hex('#8c90a4')); rect(82, 84, 82, 119, hex('#c8ccd8')); pset(82, 83, K);
  for (let j = 0; j < 5; j++) { const dx = [0, 3, -2, 2, -3][j]; rect(71 + dx, 113 - j * 5, 93 + dx, 117 - j * 5, K); rect(72 + dx, 114 - j * 5, 92 + dx, 116 - j * 5, j === 2 ? hex('#f4d8d0') : PAPEL); rect(75 + dx, 115 - j * 5, 86 + dx, 115 - j * 5, j === 2 ? ROJO : GRIS); }
  // la sumadora
  rect(106, 100, 160, 122, K); rect(107, 101, 159, 121, hex('#5a7a70')); rect(107, 101, 159, 102, hex('#86a89c')); rect(107, 118, 159, 121, hex('#3e5a52')); rect(110, 96, 146, 100, K); rect(111, 97, 145, 99, hex('#3e5a52'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) { rect(111 + i * 6, 105 + j * 4, 114 + i * 6, 107 + j * 4, K); rect(111 + i * 6, 105 + j * 4, 113 + i * 6, 106 + j * 4, i === 5 ? ROJO : hex('#f2ead8')); }
  rect(149, 105, 156, 117, K); rect(150, 106, 155, 116, hex('#2a3a36'));
  // el tarro de las monedas, casi vacío
  rect(176, 100, 196, 122, K); rect(177, 101, 195, 121, hex('#b8d4d8')); rect(178, 102, 180, 119, hex('#e6f4f8')); rect(177, 98, 195, 100, K); rect(178, 99, 194, 99, hex('#c8ccd8'));
  for (const [x, y] of [[183, 119], [189, 120], [186, 116]]) { disco(x, y, 2, K); disco(x, y, 1, LATON); }
  // los sobres con ventana y su franja roja
  for (let j = 0; j < 4; j++) { const x = 258 + [0, 4, -2, 3][j], y = 118 - j * 5; rect(x, y - 4, x + 44, y + 3, K); rect(x + 1, y - 3, x + 43, y + 2, j === 3 ? hex('#f6e0d8') : PAPEL); rect(x + 5, y - 1, x + 20, y + 1, hex('#b8d4d8')); rect(x + 34, y - 2, x + 40, y + 1, j === 3 ? ROJO : hex('#3a5a8a')); }
};
const p2 = (t) => {
  fijo('fact', fondoFact);
  const cae = (t0) => { const d = t - t0; return d < 0 ? null : d < 0.12 ? Math.round(-9 * (1 - d / 0.12)) : Math.round(3 * Math.sin((d - 0.12) * 16) * Math.exp(-(d - 0.12) * 6)); };
  const d1 = cae(ha(5.42)), d2 = cae(ha(6.3)), d3 = cae(ha(6.62));
  if (d1 != null) { periodico(57, 34 + d1, 32, 54); pinza(73, 31); }
  if (d2 != null) { revista(94, 34 + d2, 26, 40, hex('#2e7a7a'), hex('#f0c868'), '25'); pinza(107, 31); }
  if (d3 != null) { revista(113, 37 + d3, 22, 34, hex('#a83a3a'), hex('#f2e2c0'), '35'); pinza(124, 31); }
  // la cinta de la sumadora sube y se riza; la palanca baja en cada suma
  { const L = 78 * tramo(t, P2 - 0.4, P3 + 0.3), yb = Math.round(98 + L), BL = hex('#f8f4e8');
    rect(95, 91, 120, 96, K); rect(96, 92, 119, 95, BL); rect(95, 93, 107, yb, K); rect(96, 94, 106, yb - 1, BL); rect(106, 96, 106, yb - 1, PAPELS);
    for (let y = yb - 3; y > 96; y--) { const q = yb - y; if (q % 3 === 0) rect(98, y, 104 - (q * 5) % 4, y, q % 12 === 0 ? ROJO : GRIS); }
    rect(94, yb, 104, yb + 1, K); rect(95, yb, 103, yb, BL);
    const pal = (t * 1.6) % 1 < 0.3 ? 5 : 0; linea(160, 112, 167, 100 + pal, K); linea(161, 112, 168, 100 + pal, hex('#c8ccd8')); disco(168, 99 + pal, 2, K); disco(168, 99 + pal, 1, ROJO); }
  // una mano clava la cuarta factura
  const u = ease(tramo(t, ha(6.9), ha(7.5))), v = ease(tramo(t, ha(7.8), ha(8.5)));
  const fx = Math.round(lerp(330, 241, u)), fy = Math.round(lerp(72, 60, u));
  if (u > 0) factura(fx, fy, '$75', u >= 1 && v > 0);
  if (u > 0 && v < 1) { const mx = fx + 39 + Math.round(v * 44), my = fy + 14 + Math.round(v * 16); T.brazo(R, mx + 44, my + 22, mx, my, MANGA, -1, { codo: [mx + 24, my + 8], sombra: false }); }
  // los «!» saltan de factura en factura; el tarro pierde una moneda y de la hucha solo sale una polilla
  [[164, 39], [194, 69], [222, 38], [251, 67]].forEach(([x, y], k) => { const d = t - (ha(7.92) + k * 0.2); if (d > 0) R.icono('!', x, y - Math.round(Math.max(0, 3 * Math.sin(d * 10) * Math.exp(-d * 4))), ROJO, K, 2); });
  { const d = t - ha(8.05); if (d > 0 && d < 1.4) { const x = Math.round(190 + d * 60), y = Math.round(100 - 46 * d + 90 * d * d); if (y < 121) { disco(x, y, 2, K); disco(x, y, 1, Math.floor(t * 12) % 2 ? LATON : LATONL); } else { const xr = x; disco(xr, 121, 2, K); disco(xr, 121, 1, LATON); } } }
  const tb = t > ha(7.3) ? Math.round(1.5 * Math.sin(t * 22) * Math.max(0, 1 - Math.abs(t - ha(7.75)) * 2)) : 0;
  PD.hucha(R, 226 + tb, 122, { s: 2 });
  { const d = t - ha(8.0); if (d > 0) { const x = Math.round(226 - d * 16 + Math.sin(d * 9) * 6), y = Math.round(84 - d * 26 + Math.cos(d * 7) * 4), al = Math.floor(t * 14) % 2; if (y > 22) { rect(x, y, x + 1, y + 2, hex('#5a4a3a')); for (const sx of [-1, 1]) { const bx = sx < 0 ? x - 1 : x + 2; rect(Math.min(bx, bx + sx * 2), y - 2 * al, Math.max(bx, bx + sx * 2), y + 1 - al, hex('#e8e0d0')); pset(bx + sx * 3, y - 3 * al, hex('#b8b0a0')); } } } }
  for (let k = 0; k < 4; k++) { const x = [35, 73, 107, 124][k]; if (Math.sin(t * 3 + k) > 0.8) pset(x, 29, LATONL); }
};

// ── 3 · Florence ──
const p3 = (t) => {
  const o = { encuadre: 'pueblo' }; T.oregon(R, t, o);
  // un vecino por la acera de tablones, que saluda al forastero
  { const u = tramo(t, P3 + 0.2, ha(12.2)), x = Math.round(lerp(184, 126, u)); R.actor(EL.lector1DU, x, 128, t, { dir: -1, anda: u < 1, dedo: u >= 1 && t < ha(13.4), sonrisa: u >= 1 }); }
  // la vecina barre la arena que entra en la calle
  { const bx = 172 + Math.round(3 * Math.sin(t * 4.2)), a = R.actor(EL.lector2DU, 170, 152, t, { dir: 1, sostiene: [194, 143] }), [mx, my] = a.mano;
    linea(mx - 2, my - 9, bx + 28, 150, K); linea(mx - 1, my - 9, bx + 29, 150, hex('#c8a060')); rect(bx + 26, 149, bx + 34, 152, K); rect(bx + 27, 150, bx + 33, 152, hex('#e0b860'));
    for (let k = 0; k < 6; k++) { const ph = (t * 1.4 + k / 6) % 1; pset(Math.round(bx + 36 + ph * 16), Math.round(151 - Math.sin(ph * 3.1) * (3 + k % 3)), k % 2 ? ARL : AR); } }
  // Herbert llega con la libreta y apunta
  { const u = tramo(t, P3 - 0.3, ha(11.5)), x = Math.round(lerp(-18, 78, u)), nota = u >= 1 && t > ha(11.9), apunta = t > ha(13.5);
    const a = R.actor(EL.herbert57, x, 158, t, { dir: 1, anda: u < 1, sostiene: apunta ? null : [x + 21, nota ? 143 + (Math.sin(t * 16) > 0 ? 1 : 0) : 146], dedo: apunta, sonrisa: apunta });
    if (!apunta) { const [mx, my] = a.mano; rect(mx - 1, my - 6, mx + 6, my + 1, K); rect(mx, my - 5, mx + 5, my, PAPEL); rect(mx + 1, my - 3, mx + 4, my - 3, GRIS); rect(mx, my - 5, mx + 5, my - 5, ROJO); } }
  T.viento(R, t, { y0: 150, y1: 176, fuerza: 0.7, color: ARL });
  T.oregonDelante(R, t, o);
};

// ── 4 · las dunas de 1957 ──
const p4 = (t) => {
  const o = { hierba: 0 }; T.oregon(R, t, o);
  const av = ease(tramo(t, P4 - 0.3, da(19.9)));
  // la lengua de arena avanza sobre la carretera y sube por la pared de la casa
  { const x0 = 144, x1 = Math.round(lerp(166, 264, av));
    for (let x = x0; x <= x1 + 4; x++) { const f = Math.max(0, (x1 - x) / (x1 - x0)), g = Math.min(1, Math.sqrt(f * 7)), yc = 127 - 2 * f + Math.sin(x * 0.19), th = 8 * g + 4 * f, y0 = Math.round(yc - th - 2 * Math.sin(x * 0.11 + 1)), y1 = Math.round(yc + th * 0.8);
      if (x > x1) { pset(x, Math.round(yc + 3), SA[1]); pset(x, Math.round(yc + 4), SA[1]); continue; }
      for (let y = y0; y <= y1; y++) pset(x, y, y <= y0 + 1 ? SA[5] : y >= y1 - 1 ? SA[2] : (y + Math.round(2.5 * Math.sin(x * 0.16 + y * 0.5))) % 5 === 0 ? SA[3] : (x * 7 + y * 3) % 17 === 0 ? SA[5] : SA[4]);
      pset(x, y1 + 1, SA[1]); }
    const hc = lerp(0, 11, av); for (let x = 262; x <= 308; x++) { const y0 = Math.round(109 - hc * (1 - (x - 262) / 80) - Math.sin(x * 0.4)); for (let y = y0; y <= 113; y++) pset(x, y, y === y0 ? SA[5] : (x + y * 2) % 6 === 0 ? SA[3] : SA[4]); } }
  // los velos de arena que el viento arranca de la cresta y deja caer por la cara de sombra
  for (let k = 0; k < 170; k++) { const ph = (t * (0.5 + hh(k, 1) * 0.7) + hh(k, 2)) % 1, x = Math.round(146 + hh(k, 5) * 32 + ph * (36 + hh(k, 3) * 64)), base = x < 178 ? 59 - (x - 146) * 0.28 : 50 + (x - 178) * 0.7 * ph;
    const y = Math.round(base - 2 - Math.sin(ph * 3.14) * (2 + hh(k, 4) * 9) + ph * ph * 30 * hh(k, 6)), c = y < 50 || x < 178 ? (k % 2 ? SA[2] : SA[5]) : k % 3 ? SA[5] : SA[4];
    if (y > 22 && !(x > 268 && y < 48)) { pset(x, y, c); if (k % 3 === 0) pset(x + 1, y, c); } }
  for (let k = 0; k < 7; k++) { const ph = (t * 0.6 + k / 7) % 1, x0 = Math.round(164 + ph * 60), y = Math.round(46 + (k % 4) * 2 + ph * ph * 30); linea(x0, y, x0 + 9 + (k % 3) * 3, y + 1 + Math.round(ph * 3), k % 2 ? SA[5] : SA[2]); }
  // el hombre de la pala, junto a la carretera: palea… y se rinde
  { const rinde = t > da(19.2), pa = Math.sin(t * 5.2), x = 224; const a = R.actor(EL.lector3DU, x, 148, t, { dir: -1, sostiene: rinde ? [x - 5, 142] : [x - 5, 138 + Math.round(pa * 3)], triste: rinde }), [mx, my] = a.mano;
    linea(mx + 3, my - 7, mx - 6, my + 6, K); linea(mx + 2, my - 7, mx - 7, my + 6, hex('#c8a060')); rect(mx - 10, my + 5, mx - 5, my + 10, K); rect(mx - 9, my + 6, mx - 6, my + 9, hex('#aeb4c0'));
    if (!rinde && pa > 0.4) for (let k = 0; k < 6; k++) pset(mx - 10 - k * 2, my + 2 - k + Math.round(pa * 2), SA[5]); }
  // Herbert, contra el viento; se le vuela una hoja de la libreta
  { const u = tramo(t, P4 - 0.3, ha(16.2)), x = Math.round(lerp(186, 104, u)), vuela = ha(16.3), mira = t > vuela + 0.15;
    const a = R.actor(EL.herbert57, x, 157, t, { dir: mira ? 1 : -1, anda: u < 1, sostiene: mira ? null : [x - 6, 144], sorpresa: mira && t < vuela + 1.6, dedo: mira && t > da(18.8) }), [mx, my] = a.mano;
    if (!mira) { rect(mx - 5, my - 6, mx + 2, my + 1, K); rect(mx - 4, my - 5, mx + 1, my, PAPEL); rect(mx - 3, my - 3, mx, my - 3, GRIS); }
    const d = t - vuela; if (d > 0 && d < 3) { const hx = Math.round(102 + d * 86), hy = Math.round(140 - 34 * Math.sin(d * 1.5) + 5 * Math.sin(d * 9)), g = Math.floor(t * 8) % 2; rect(hx - 1, hy - 1, hx + 7 - g, hy + 5 + g, K); rect(hx, hy, hx + 6 - g, hy + 4 + g, PAPEL); rect(hx + 1, hy + 1 + g, hx + 4, hy + 1 + g, GRIS); rect(hx + 1, hy + 3 + g, hx + 3, hy + 3 + g, GRIS); } }
  T.viento(R, t, { y0: 112, y1: 156, fuerza: 1.5 + av * 0.5, color: SA[5] });
  T.oregonDelante(R, t, o);
};

// ── 5 · el mapa de la costa ──
let COSTA = null;
const pinoM = (x, y) => { poligono([[x, y - 13], [x + 6, y - 2], [x - 6, y - 2]], K); poligono([[x, y - 11], [x + 4, y - 3], [x - 4, y - 3]], hex('#3a6a44')); linea(x - 1, y - 8, x - 3, y - 4, hex('#5a8a54')); rect(x - 1, y - 2, x + 1, y, K); pset(x, y - 1, MAD); };
const casaM = (x, y) => { rect(x - 7, y - 8, x + 7, y, K); rect(x - 6, y - 7, x + 6, y - 1, hex('#e8dcc0')); poligono([[x - 9, y - 8], [x, y - 16], [x + 9, y - 8]], K); poligono([[x - 6, y - 9], [x, y - 14], [x + 6, y - 9]], hex('#b8503a')); rect(x - 1, y - 5, x + 1, y - 1, hex('#6a4024')); rect(x + 3, y - 6, x + 4, y - 4, hex('#6fa8c8')); rect(x - 5, y - 6, x - 4, y - 4, hex('#6fa8c8')); };
const p5 = (t) => {
  const P = T.mapa(R, t, { zoom: 9, centro: [-122.9, 44.1], rosa: false });
  if (!COSTA) { const c0 = []; for (let y = 0; y < 180; y++) { let x = 22; for (; x < 298; x++) { let tierra = true; for (let i = 0; i < 10 && tierra; i++) { const c = R.pget(x + i, y); if ((c & 255) <= ((c >>> 16) & 255)) tierra = false; } if (tierra) break; } c0[y] = x; } COSTA = c0.map((_, y) => { const v = []; for (let j = -7; j <= 7; j++) v.push(c0[Math.max(18, Math.min(166, y + j))]); v.sort((a, b) => a - b); return v[7]; }); }
  const [fx0, fy0] = P([-124.1, 43.98]), fy = Math.round(fy0), fx = COSTA[fy] + 3;
  R.recorte([21, 15, 299, 169]);
  const D = porTramos(t, [[P5, 7], [da(21.4), 13], [da(21.96), 30], [da(22.6), 50], [da(23.24), 70], [P6 + 0.4, 80]]);
  const ancho = (y) => D * (0.82 + 0.2 * Math.sin(y * 0.08 + 1) + 0.1 * Math.sin(y * 0.23));
  // el río, con su puente, que baja al mar junto al pueblo
  { let px = fx - 2, py = fy + 4; for (let i = 0; i <= 60; i++) { const x = fx - 2 + i * 4.6, y = fy + 4 + 7 * Math.sin(i * 0.33) - i * 0.25; linea(Math.round(px), Math.round(py), Math.round(x), Math.round(y), hex('#3f7290')); linea(Math.round(px), Math.round(py) + 1, Math.round(x), Math.round(y) + 1, hex('#84b0c0')); px = x; py = y; } }
  // lo que la arena va a tapar: una carretera, un bosque y una casa
  const cr = COSTA[46] + 24, bx = COSTA[112] + 42, cxh = COSTA[146] + 64;
  for (let y = 22; y <= 72; y++) { const x = Math.round(COSTA[y] + 24 + 2 * Math.sin(y * 0.2)); linea(x - 4, y, x + 4, y, K); linea(x - 3, y, x + 3, y, hex('#8a8a96')); pset(x - 3, y, hex('#c8ccd8')); pset(x + 3, y, hex('#5a5a66')); if (y % 6 < 3) pset(x, y, hex('#f6f2e6')); }
  { const y = 28 + Math.round(((t * 9) % 38)), x = Math.round(COSTA[y] + 24 + 2 * Math.sin(y * 0.2)); if (D < 22) { rect(x - 2, y - 3, x + 2, y + 3, K); rect(x - 1, y - 2, x + 1, y + 2, ROJO); pset(x, y - 1, hex('#a8d0e8')); } }
  for (const [dx, dy] of [[-9, -4], [5, -7], [-2, 5], [12, 4]]) pinoM(bx + dx, 112 + dy);
  casaM(cxh, 150);
  // la franja de dunas, que crece tierra adentro
  for (let y = 15; y <= 169; y++) { const c = COSTA[y], w = Math.round(ancho(y)); for (let x = c - 1; x <= c + w; x++) { const q = x - c; pset(x, y, q >= w - 1 ? SA[1] : q >= w - 3 ? SA[2] : q < 2 ? SA[5] : (q + Math.round(3 * Math.sin(y * 0.35))) % 9 === 0 ? SA[3] : (q + Math.round(3 * Math.sin(y * 0.35))) % 9 === 1 ? SA[5] : SA[4]); } pset(c + w + 1, y, K); }
  // lo que asoma de lo enterrado, con su «X»
  const tapa = (y, d0, f) => { const u = tramo(D, d0, d0 + 14); if (u >= 1) f(); return u; };
  if (D > 34) { R.icono('X', cr - 4, 42 + Math.round(Math.max(0, 3 * Math.sin((t - da(21.96)) * 9) * Math.exp(-(t - da(21.96)) * 3))), ROJO, K, 2); }
  if (D > 56) { for (const [dx, dy] of [[-9, -4], [5, -7]]) { poligono([[bx + dx, 112 + dy - 13], [bx + dx + 3, 112 + dy - 8], [bx + dx - 3, 112 + dy - 8]], hex('#3a6a44')); } R.icono('X', bx - 3, 108, ROJO, K, 2); }
  if (D > 76) { poligono([[cxh - 5, 142], [cxh, 135], [cxh + 5, 142]], hex('#b8503a')); linea(cxh - 5, 142, cxh, 135, K); linea(cxh, 135, cxh + 5, 142, K); R.icono('X', cxh - 4, 146, ROJO, K, 2); }
  // granos que saltan del frente
  for (let k = 0; k < 40; k++) { const y = 16 + Math.round(hh(k, 1, 60) * 152), ph = (t * 1.3 + hh(k, 2, 60)) % 1, x = Math.round(COSTA[y] + ancho(y) + ph * 12); pset(x, y - Math.round(Math.sin(ph * 3.1) * 3), SA[2]); }
  // las flechas del viento, del mar hacia tierra
  for (let k = 0; k < 5; k++) { const y = 28 + k * 30, x1 = COSTA[y] - 8 + Math.round(3 * Math.sin(t * 5 + k)), x0 = Math.max(24, x1 - 58 - (k % 2) * 14), BL = hex('#f4f8fa');
    rect(x0 - 1, y - 2, x1 - 4, y + 2, K); poligono([[x1 - 6, y - 7], [x1 + 3, y], [x1 - 6, y + 7]], K); rect(x0, y - 1, x1 - 5, y + 1, BL); poligono([[x1 - 5, y - 4], [x1, y], [x1 - 5, y + 4]], BL);
    for (let x = x0; x < x1 - 6; x++) if (((x - Math.floor(t * 40)) % 12 + 12) % 12 < 4) { pset(x, y - 1, hex('#9ac4dc')); pset(x, y, hex('#9ac4dc')); pset(x, y + 1, hex('#9ac4dc')); }
    for (let i = 0; i < 3; i++) { const xx = x0 - 6 + i * 2 - (Math.floor(t * 6 + k) % 3) * 2; pset(xx, y - 4 - i, BL); pset(xx, y + 4 + i, BL); } }
  // Florence: tres tejados junto al río y su chincheta
  for (const [dx, dy] of [[7, -6], [15, -3], [10, 12]]) { rect(fx + dx - 3, fy + dy - 3, fx + dx + 3, fy + dy + 2, K); rect(fx + dx - 2, fy + dy - 2, fx + dx + 2, fy + dy + 1, hex('#b8503a')); rect(fx + dx - 2, fy + dy - 2, fx + dx + 2, fy + dy - 2, hex('#e0907a')); }
  T.chincheta(R, fx + 2, fy, t, ROJO, { baja: tramo(t, P5 - 0.2, P5 + 0.3) });
  R.recorte(null);
};

// ── 6 · la siembra, en corte ──
const ys = (x) => Math.round(102 + 3 * Math.sin(x * 0.021 + 1) + 1.5 * Math.sin(x * 0.083));
const MATAS = [46, 104, 160, 214, 274];
const VERDES = ['#2a4438', '#3a5f3e', '#547e44', '#769c50', '#c4d688'].map(hex);
// una mata de hierba de playa: briznas largas que el viento dobla hacia tierra
const mata = (x, y, t, k = 0) => { for (const pasada of [0, 1]) for (let b = 0; b < 13; b++) { const a0 = (b - 6) * 0.17 + (hh(b, k, 50) - 0.5) * 0.12, L = 24 + hh(b, k, 51) * 16, vi = 0.3 + 0.22 * Math.sin(t * 2.6 + b * 0.7 + k), atras = b % 3 === 1;
    for (let i = 0; i <= L; i++) { const u = i / L, px = Math.round(x + (b - 6) * 1.4 + Math.sin(a0) * i + vi * u * u * 18), py = Math.round(y - Math.cos(a0) * i * (1 - 0.3 * u * vi));
      if (pasada === 0) { pset(px - 1, py, VERDES[0]); pset(px + 1, py, VERDES[0]); pset(px, py - 1, VERDES[0]); } else { pset(px, py, u > 0.86 ? VERDES[4] : atras ? VERDES[1] : u > 0.5 ? VERDES[3] : VERDES[2]); if (!atras && u < 0.45) pset(px + 1, py, VERDES[1]); } } }
  rect(x - 9, y - 1, x + 9, y, VERDES[0]); rect(x - 7, y - 2, x + 7, y - 2, VERDES[1]); };
const fondoSiembra = () => {
  const CI = ['#6a94b6', '#86acc8', '#a4c2d6', '#c2d6de'].map(hex), MARC = ['#34506c', '#476a86', '#62869c', '#bccfd4'].map(hex);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, CI[Math.max(0, Math.min(3, Math.round(y / 60 * 3 + (B4[y & 3][x & 3] / 16 - 0.5) * 1.1)))]);
  for (let y = 60; y < 78; y++) for (let x = 0; x < 320; x++) pset(x, y, hh(x >> 2, y, 3) < 0.08 + (y > 71 ? 0.14 : 0) ? MARC[3] : (y + (x >> 3)) % 3 === 0 ? MARC[1] : y < 64 ? MARC[2] : MARC[1]);
  // el cabo lejano con su faro y la duna de atrás
  for (let x = 0; x < 78; x++) { const y0 = 60 - Math.round(8 * Math.exp(-(((x - 20) / 28) ** 2))); for (let y = y0; y < 61; y++) pset(x, y, (x + y) % 5 ? hex('#6f8494') : hex('#8a9cac')); } rect(21, 45, 22, 52, hex('#e8f0ee')); rect(20, 44, 23, 44, K); pset(21, 43, ROJO);
  for (let x = 0; x < 320; x++) { const yd = Math.round(76 - 15 * Math.exp(-(((x - 238) / 66) ** 2)) - 7 * Math.exp(-(((x - 72) / 46) ** 2)) + Math.sin(x * 0.11)); for (let y = yd; y < ys(x); y++) { const lee = x > 238 && x < 238 + (y - yd) * 1.7 + 6 && y < 94; pset(x, y, y === yd ? SA[5] : lee ? ((x + y) % 2 ? SA[1] : SA[2]) : (y + Math.round(4 * Math.sin(x * 0.07 + y * 0.3))) % 6 === 0 ? SA[3] : (x + y * 3) % 13 === 0 ? SA[5] : SA[4]); } }
  for (let k = 0; k < 9; k++) { const x = 20 + k * 34 + (k % 2) * 9, y = ys(x) - 9 - (k % 3) * 3; for (let i = 0; i < 4; i++) linea(x + i * 2, y, x + i * 2 + 2 + i, y - 4 - (i % 2), i % 2 ? hex('#5c7048') : hex('#8a9a5a')); }
  // el corte de la arena: la seca de arriba, capas, guijarros, conchas, un tronco enterrado y la arena húmeda del fondo
  const HUM = hex('#a39c88'), HUMS = hex('#857e6e'), AG = hex('#6f9aa8'), OS = hex('#5a5448');
  for (let x = 0; x < 320; x++) { const s = ys(x); for (let y = s; y < 180; y++) { const d = y - s, w = d + 3 * Math.sin(x * 0.045 + d * 0.05), v = hh(x, y, 4);
    pset(x, y, d < 1 ? OS : d < 2 ? SA[2] : w > 64 ? (v < 0.1 ? AG : v > 0.85 ? HUMS : HUM) : w > 54 ? (B4[y & 3][x & 3] < (w - 54) * 1.6 ? HUM : SA[2]) : Math.abs(w % 17 - 8) < 0.8 ? SA[2] : w > 30 ? (v < 0.08 ? SA[2] : (B4[y & 3][x & 3] < 6 ? SA[3] : SA[4])) : v < 0.05 ? SA[2] : v > 0.93 ? SA[5] : w < 12 ? (B4[y & 3][x & 3] < 6 ? SA[5] : SA[4]) : SA[4]); } }
  for (let k = 0; k < 30; k++) { const x = Math.round(8 + hh(k, 1, 12) * 304), y = Math.round(ys(x) + 10 + hh(k, 2, 12) * 62), r = hh(k, 3, 12) < 0.35 ? 2 : 1; disco(x, y, r, OS); if (r === 2) { disco(x, y, 1, k % 3 ? hex('#9a9aa4') : hex('#c8c0b0')); pset(x - 1, y - 1, SA[5]); } else pset(x, y, hex('#c8c0b0')); }
  for (const [x, dy] of [[86, 30], [140, 50], [190, 24], [296, 44]]) { const y = ys(x) + dy; disco(x, y, 3, OS); disco(x, y, 2, hex('#f2e2d0')); pset(x, y, hex('#d8a890')); pset(x + 1, y - 1, hex('#d8a890')); pset(x - 1, y + 1, OS); }
  rect(232, 158, 290, 164, OS); madera(233, 159, 289, 163, hex('#9a8a78'), hex('#6a5c4e'), 41); rect(233, 159, 289, 159, hex('#c0b2a0')); disco(246, 161, 1, OS);
  // la madriguera del cangrejo
  { let px = 16, py = ys(16); for (let i = 0; i <= 40; i++) { const x = 16 + 14 * Math.sin(i * 0.06), y = ys(16) + i; disco(Math.round(x), Math.round(y), 1, hex('#8a8474')); pset(Math.round(x), Math.round(y), hex('#6a6456')); } for (let i = -9; i <= 9; i++) for (let j = -5; j <= 5; j++) if ((i / 9) ** 2 + (j / 5) ** 2 <= 1) pset(26 + i, ys(16) + 44 + j, (i / 9) ** 2 + (j / 5) ** 2 > 0.7 ? OS : hex('#3a362e')); }
  // la estaca con la etiqueta del barco (la hierba vino de Europa) y el cajón de plantones
  { const x = 240, s = ys(x); rect(x - 1, s - 32, x + 1, s + 6, K); rect(x, s - 31, x, s + 5, hex('#c8a060')); rect(x + 2, s - 32, x + 17, s - 18, K); rect(x + 3, s - 31, x + 16, s - 19, PAPEL); R.icono('barco', x + 6, s - 30, hex('#3a5a8a'), PAPEL); }
  { const x = 136, s = ys(x) - 1; rect(x - 14, s - 12, x + 14, s, K); madera(x - 13, s - 11, x + 13, s - 1, hex('#b89058'), MAD, 43); rect(x - 13, s - 6, x + 13, s - 6, MADS); rect(x - 13, s - 11, x + 13, s - 11, hex('#d8b47a')); for (let i = -11; i <= 11; i += 4) { linea(x + i, s - 12, x + i - 1, s - 19, VERDES[1]); linea(x + i + 1, s - 12, x + i + 3, s - 18, VERDES[3]); } }
};
const raices = (x, u, k) => { const s = ys(x), RA = hex('#fbf7e6'), RS = hex('#6a604c'); if (u <= 0) return;
  for (let r = 0; r < 7; r++) { const ang = (r - 3) * 0.2 + (hh(r, k, 20) - 0.5) * 0.12, L = (38 + hh(r, k, 21) * 30) * u;
    for (let i = 0; i < L; i++) { const nx = x + (r - 3) * 2 + Math.sin(ang) * i * 1.1 + 2.2 * Math.sin(i * 0.23 + r + k), ny = s + 1 + i; if (ny > 178) break; pset(Math.round(nx) + 1, Math.round(ny), RS); pset(Math.round(nx), Math.round(ny), RA); if (i > 10 && i % 9 === (r * 2) % 9) { const sd = (i + r) % 2 ? 1 : -1; for (let j = 1; j < 6 && i + j < L; j++) { pset(Math.round(nx + sd * j), Math.round(ny + j * 0.6) + 1, RS); pset(Math.round(nx + sd * j), Math.round(ny + j * 0.6), RA); } } } } };
const p6 = (t) => {
  fijo('siembra', fondoSiembra);
  // nubes de tres tonos a tres velocidades (bajas: la esquina de Atom y la barra del año quedan tranquilas) y gaviotas
  for (let k = 0; k < 7; k++) { const v = [4, 8, 13][k % 3], w = 30 + Math.round(hh(k, 3, 30) * 30), x = Math.round(((hh(k, 1, 30) * 440 + t * v) % 440) - 70), y = 30 + (k % 3) * 9 + Math.round(hh(k, 2, 30) * 5), c = [hex('#dbe4e2'), hex('#c2d6de'), hex('#eef2ee')][k % 3], cs = hex('#a4c2d6');
    if (x + w > 258 && y < 50) continue; rect(x + 4, y - 4, x + w - 10, y - 3, c); rect(x + 9, y - 6, x + Math.round(w / 2), y - 5, c); rect(x, y - 2, x + w, y + 1, c); rect(x + 3, y + 2, x + w - 5, y + 2, cs); rect(x + 8, y + 3, x + w - 12, y + 3, cs); }
  T.bandada(R, t, { tipo: 'gaviota', n: 3, y: 54, v: 30, cada: 5 });
  const planta = (k) => k === 0 ? da(26.78) : k === 4 ? da(27.9) : -1, firme = tramo(t, da(29.72), da(30.7));
  // las raíces bajan en «roots»
  MATAS.forEach((x, k) => { if (t >= planta(k)) raices(x, 0.14 + 0.86 * ease(tramo(t, da(29.05) + [0.2, 0, 0.08, 0.16, 0.28][k], da(30.5))), k); });
  // el cangrejo se asoma a su madriguera
  { const a = Math.max(0, Math.sin(t * 1.3)), x = Math.round(27 - a * 5), y = ys(16) + 45, p = Math.floor(t * 6) % 2; rect(x - 3, y - 2, x + 3, y + 1, K); rect(x - 2, y - 1, x + 2, y, hex('#e07a4a')); pset(x - 2, y - 3, K); pset(x + 2, y - 3, K); pset(x - 4, y - 1 - p, hex('#e07a4a')); pset(x + 4, y - 2 + p, hex('#e07a4a')); pset(x - 3, y + 2, K); pset(x + 3, y + 2, K); }
  // las matas (las de los extremos las traen las manos)
  const mano = (k, x, dir) => { const t0 = k === 0 ? P6 - 0.2 : da(26.6), tp = planta(k), u = ease(tramo(t, t0, tp)), palm = t > tp && t < tp + 0.9 ? Math.round(2 * Math.abs(Math.sin((t - tp) * 9))) : 0, v = ease(tramo(t, tp + 0.9, tp + 1.6));
    const px = Math.round(lerp(x - dir * 78, x, u)), py = ys(x) + 1 - Math.round((1 - u) * 26 * Math.sin(Math.min(1, u * 1.2) * 1.4 + 0.3)), puesta = t >= tp;
    mata(puesta ? x : px, puesta ? ys(x) + 1 : py, t, k);
    if (!puesta) { const bx = px, by = py; for (let i = 0; i < 5; i++) linea(bx + (i - 2) * 2, by, bx + (i - 2) * 3, by + 5 + (i % 2) * 2, hex('#fbf7e6')); }
    if (v < 1) { const wx = (puesta ? x : px) - dir * (9 + Math.round(v * 70)), wy = puesta ? ys(x) - 7 - palm - Math.round(v * 20) : py - 8; T.brazo(R, wx - dir * 62, wy - 36, wx, wy, MANGAF, dir, { codo: [wx - dir * 26, wy - 8], sombra: false }); } };
  [1, 2, 3].forEach((k) => mata(MATAS[k], ys(MATAS[k]) + 1, t + k * 0.4, k));
  mano(0, MATAS[0], 1); mano(4, MATAS[4], -1);
  // la arena que el viento se lleva… hasta que las raíces la sujetan
  for (let k = 0; k < 110; k++) { const v = (110 + hh(k, 1, 31) * 90) * (1 - firme), x = Math.round(((hh(k, 2, 31) * 360 + t * v + firme * hh(k, 5, 31) * 40) % 360) - 20), s = ys(Math.max(0, Math.min(319, x))), alto = (1 + hh(k, 3, 31) ** 2 * 34) * (1 - firme), y = Math.round(s - 1 - alto - (1 - firme) * 2 * Math.sin(t * 6 + k)), L = Math.round((3 + hh(k, 4, 31) * 8) * (1 - firme));
    if (firme < 1) { rect(x, y, x + L, y, k % 3 ? hex('#fffdf2') : SA[2]); } }
  // montoncitos que la hierba retiene
  if (firme > 0) MATAS.forEach((x, k) => { const hgt = Math.round(firme * 6), s = ys(x); for (let i = -14; i <= 6; i++) { const yy = s - Math.round(hgt * Math.max(0, 1 - Math.abs(i + 4) / 10)); if (yy < s) { rect(x + i, yy, x + i, s - 1, (i + k) % 4 ? SA[4] : SA[3]); pset(x + i, yy, SA[5]); } } });
  // el brillo de los granos que se quedan en su sitio
  if (firme > 0.5) MATAS.forEach((x, k) => { for (let i = 0; i < 5; i++) if (Math.sin(t * 5 + i * 1.7 + k) > 0.6) { const gx = x - 12 + i * 6, gy = ys(x) + 8 + ((i * 7 + k * 3) % 34); pset(gx, gy, hex('#ffffff')); pset(gx + 1, gy, SA[5]); pset(gx, gy + 1, SA[5]); } });
};

// ── 7 · desde el aire ──
const p7 = (t) => {
  const u = tramo(t, P7 - 0.4, FIN), o = { camara: 'aire', sombra: [Math.round(lerp(58, 172, u)), Math.round(lerp(150, 100, u))] };
  const g = T.oregon(R, t, o), [ax, ay0] = g.avioneta ?? [o.sombra[0] + 44, o.sombra[1] - 30], ay = ay0 + Math.round(1.5 * Math.sin(t * 2.3));
  // el visor de la cámara sobre las dunas y su destello
  for (const tf of [da(32.98), da(33.9)]) { const d = t - tf; if (d > -0.5 && d < 0.5) { const cx = ax - 8, cy = ay + 46, c = d > 0 && d < 0.12 ? hex('#ffffff') : K, w = 22, a = 15;
    for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { rect(cx + sx * w - (sx > 0 ? 6 : 0), cy + sy * a, cx + sx * w + (sx < 0 ? 6 : 0), cy + sy * a, c); rect(cx + sx * w, cy + sy * a - (sy > 0 ? 5 : 0), cx + sx * w, cy + sy * a + (sy < 0 ? 5 : 0), c); }
    if (d > 0 && d < 0.12) for (let y = cy - a + 1; y < cy + a; y++) for (let x = cx - w + 1; x < cx + w; x++) if ((x + y) % 2) pset(x, y, hex('#ffffff')); } }
  PD.avioneta(R, ax, ay, { helice: true, t });
  for (const tf of [da(32.98), da(33.9)]) { const d = t - tf; if (d > 0 && d < 0.16) { const x = ax + 4, y = ay - 9; disco(x, y, 3, hex('#ffffff')); linea(x - 6, y, x + 6, y, hex('#fff8c0')); linea(x, y - 6, x, y + 6, hex('#fff8c0')); } }
  T.oregonDelante(R, t, o);
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { cartela: '1957', año: 1957,
  efectos: [[1.5, 'tecleo'], [ha(3.6), 'papel'], [P2 + 0.2, 'maquina'], [ha(5.54), 'golpecito'], [ha(6.42), 'golpecito'], [ha(7.5), 'toc'], [ha(8.05), 'tic'],
    [ha(12.0), 'lapiz'], [P4 + 0.1, 'viento'], [ha(16.3), 'papel'], [da(18.8), 'rafaga'], [P5 + 0.2, 'whoosh'],
    [da(26.78), 'golpecito'], [da(27.9), 'golpecito'], [da(29.72), 'brillo'], [P7 + 0.1, 'motor'], [da(32.98), 'flash'], [da(33.9), 'flash']] });
''')

E['du-carta'] = ('La carta', '''// DU-CARTA (frase 6), 1957. Cuatro planos:
// 1. la entrada de casa: Herbert, en el porche, vuelca un zapato y sale un chorro de arena que no se acaba (gag 2); el
//    montón crece junto a los escalones y Beverly se asoma a la puerta (corta en «sand dunes»);
// 2. inserto (fondo local): la mano escribe la carta al agente y, en el globo de idea que llena la pantalla, una duna
//    avanza y se traga una ciudad de juguete, un lago, un río y una carretera, cada uno en su palabra (corta en «The article»);
// 3. inserto en alzado (fondo local): la mano mete el reportaje en el cajón de la mesa y lo cierra en «published»; sale un
//    hilo de arena por la esquina del cajón mientras las hojas de notas caen sobre el tablero (corta en «and far too much»);
// 4. el cuarto de 1957: Herbert teclea, las hojas vuelan a las pilas (bajas: la torre es el gag 3, de du-planeta) y el suelo se llena de papeles;
//    se vuelve hacia la pila, se asombra y sonríe.''', COMUN + r'''
const c = (s) => en('carta', (s - 0.5) / 15.154);   // segundos de la voz inglesa → fracción de su frase
const P2 = c(3.65), P3 = c(8.49), P4 = c(13.26), FIN = c(17.6);
const MANGA = '#b9a988';
const porTramos = (t, pts) => { if (t <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (t <= pts[i][0]) return lerp(pts[i - 1][1], pts[i][1], (t - pts[i - 1][0]) / (pts[i][0] - pts[i - 1][0])); return pts[pts.length - 1][1]; };

// ── 1 · el zapato (gag 2) ──
const p1 = (t) => {
  const o = { encuadre: 'entrada', puerta: 0.9 * ease(tramo(t, c(1.5), c(2.0))) }; T.casa(R, t, o);
  if (t > c(1.85)) R.actor(EL.beverly, 109, 123, t, { dir: 1, sorpresa: t > c(2.3) });
  const vuelca = tramo(t, c(0.55), c(0.95)), cae = tramo(t, c(0.95), c(1.25)), mont = 0.85 * tramo(t, c(1.1), P2 + 0.3), sy = 152;
  const a = R.actor(EL.herbert57, 125, 123, t, { dir: 1, sostiene: [148, 109 - Math.round(2 * vuelca)], sorpresa: t > c(2.2) }), [mx, my] = a.mano;
  if (cae > 0.5) PD.montonArena(R, mx + 3, sy + 1, { alto: 0.02 + mont });
  if (vuelca < 1) PD.zapato(R, mx + 4, my + 5, {});
  else { const L = Math.max(4, Math.round(lerp(4, sy - 3 - 16 * mont - my - 10, cae))); PD.zapato(R, mx + 7, my + 10 + L, { arena: L, t });
    for (let k = 0; k < 8; k++) { const ph = (t * 2.2 + k / 8) % 1, dir = k % 2 ? 1 : -1; pset(mx + 3 + dir * Math.round(ph * (6 + 14 * mont)), Math.round(sy - 16 * mont - 3 * Math.sin(ph * 3.1) + ph * 16 * mont), T.C.arenaL); } }
  T.casaDelante(R, t, o);
};

// ── 2 · la carta al agente y lo que Herbert imagina ──
const NUBE = (() => { const m = new Uint8Array(320 * 180), cx = 142, cy = 70, rx = 110, ry = 34;
  const dentro = (x, y) => { if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1) return true; for (let k = 0; k < 18; k++) { const a = k / 18 * Math.PI * 2 + 0.17, bx = cx + Math.cos(a) * rx, by = cy + Math.sin(a) * ry, r = 12 + (k % 3) * 2; if ((x - bx) ** 2 + (y - by) ** 2 <= r * r) return true; } return false; };
  for (let y = 1; y < 179; y++) for (let x = 1; x < 319; x++) if (dentro(x, y)) m[y * 320 + x] = 1;
  const b = m.slice(); for (let y = 1; y < 179; y++) for (let x = 1; x < 319; x++) { const i = y * 320 + x; if (b[i] && !(b[i - 1] && b[i + 1] && b[i - 320] && b[i + 320])) m[i] = 2; }
  return m; })();
const SUELO2 = 94;
const fondoCarta = () => {
  // la pared del cuarto, de noche, y el tablero de la mesa
  const W1 = hex('#33495a'), W2 = hex('#2c4050'), W3 = hex('#3d5666');
  for (let y = 0; y < 122; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 17 ? W2 : !(x > 266 && y < 52) && (x + (y >> 4) * 7) % 14 < 1 ? W2 : W1);
  for (let j = 0; j < 9; j++) for (let i = 0; i < 23; i++) { const x = 7 + i * 14, y = 22 + j * 12 + (i % 2) * 6; if (x > 262 && y < 54) continue; pset(x, y, W3); pset(x - 1, y + 1, W3); pset(x + 1, y + 1, W3); pset(x, y + 2, W3); }
  for (let y = 60; y < 122; y++) for (let x = 250; x < 320; x++) { const d = Math.hypot(x - 320, (y - 124) * 1.2); if (d < 70 && B4[y & 3][x & 3] / 16 > d / 70) pset(x, y, hex('#5a6a5a')); }
  rect(0, 116, 319, 121, MADK); rect(0, 116, 319, 116, MADS);
  rect(0, 122, 319, 122, K); madera(0, 123, 319, 179, MADL, MAD, 5); rect(0, 123, 319, 123, hex('#c89858')); for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) if (B4[y & 3][x & 3] < (y - 150) * 0.2) pset(x, y, MAD);
  for (let y = 124; y < 180; y++) for (let x = 190; x < 320; x++) { const d = Math.hypot(x - 300, (y - 136) * 1.6); if (d < 90 && B4[y & 3][x & 3] / 16 > d / 90 + 0.2) pset(x, y, hex('#d8a860')); }
  // dos fotos de las dunas, el tintero y el secante
  for (const [x, y, k] of [[12, 128, 0], [38, 136, 1]]) { rect(x - 1, y - 1, x + 30, y + 22, K); rect(x, y, x + 29, y + 21, PAPEL); rect(x + 2, y + 2, x + 27, y + 17, hex('#a4c2d6')); poligono([[x + 2, y + 17], [x + 12 + k * 6, y + 7], [x + 20 + k * 6, y + 12], [x + 27, y + 9], [x + 27, y + 17]], hex('#ddd5ba')); poligono([[x + 12 + k * 6, y + 7], [x + 20 + k * 6, y + 12], [x + 16 + k * 6, y + 17], [x + 10 + k * 6, y + 17]], hex('#9aa0ac')); }
  disco(36, 170, 8, K); disco(36, 170, 7, hex('#2a3a5a')); disco(36, 170, 4, hex('#101828')); pset(33, 166, hex('#8ab0e0')); pset(34, 165, hex('#8ab0e0')); rect(31, 160, 41, 162, K); rect(32, 161, 40, 161, LATON);
  // la carta
  poligono([[88, 136], [218, 136], [232, 179], [78, 179]], hex('#5a3a20')); poligono([[85, 133], [215, 133], [227, 179], [73, 179]], K); poligono([[86, 134], [214, 134], [226, 179], [74, 179]], PAPEL);
  rect(92, 137, 120, 139, hex('#3a5a8a')); rect(176, 137, 208, 137, GRIS); rect(184, 139, 208, 139, GRIS);
  PD.carta(R, 272, 174, { s: 3 });
  disco(303, 146, 9, K); disco(303, 146, 8, hex('#f2ead8')); disco(303, 146, 6, hex('#5a3a20')); disco(302, 145, 4, hex('#6a4628')); rect(311, 143, 316, 149, K); rect(311, 145, 314, 147, MADL);
  // el globo de idea y su maqueta: una ciudad de juguete, un lago, un río y una carretera
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const m = NUBE[y * 320 + x]; if (!m) continue; pset(x, y, m === 2 ? K : y >= SUELO2 ? ((x + y * 2) % 7 === 0 ? hex('#9ab862') : hex('#b9cf8e')) : B4[y & 3][x & 3] < (y - 40) * 0.2 ? hex('#dfe9ee') : hex('#f2f6f6')); }
  for (const [x, y, r] of [[156, 124, 4], [163, 131, 2]]) { disco(x, y, r + 1, K); disco(x, y, r, hex('#f2f6f6')); }
  const en2 = (x, y, col) => { if (NUBE[y * 320 + x] === 1) pset(x, y, col); }, r2 = (x0, y0, x1, y1, col) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) en2(x, y, col); };
  for (let x = 24; x < 262; x += 23) { r2(x, 96, x + 1, 100, hex('#6a4024')); for (let j = 0; j < 5; j++) r2(x - j, 96 - (5 - j) * 2, x + 1 + j, 97 - (5 - j) * 2, j % 2 ? hex('#5a8a54') : hex('#3a6a44')); }
  for (const [x, w, a, col, cl] of [[38, 11, 30, '#c86a5a', '#e89a8a'], [51, 13, 42, '#5a7ab8', '#8aa6dc'], [66, 10, 24, '#e0b850', '#f6dc88'], [77, 12, 34, '#6aa090', '#9cc8b8']]) { r2(x - 1, SUELO2 - a - 1, x + w, SUELO2, K); r2(x, SUELO2 - a, x + w - 1, SUELO2, hex(col)); r2(x, SUELO2 - a, x + 1, SUELO2, hex(cl)); for (let j = 3; j < a - 3; j += 5) for (let i = 3; i < w - 2; i += 4) r2(x + i, SUELO2 - a + j, x + i + 1, SUELO2 - a + j + 1, hex('#fff4c0')); r2(x - 1, SUELO2 - a - 2, x + w, SUELO2 - a - 2, K); }
  r2(57, SUELO2 - 51, 57, SUELO2 - 43, K); r2(58, SUELO2 - 51, 63, SUELO2 - 48, ROJO);
  for (let i = -19; i <= 19; i++) for (let j = -5; j <= 5; j++) if ((i / 19) ** 2 + (j / 5) ** 2 <= 1) en2(118 + i, SUELO2 + 5 + j, (i / 19) ** 2 + (j / 5) ** 2 > 0.75 ? hex('#2e5a78') : j < -1 && (i + 40) % 9 < 4 ? hex('#c0dce0') : hex('#5a9ac8'));
  r2(118, SUELO2 - 4, 118, SUELO2 + 4, K); for (let j = 0; j < 7; j++) r2(119, SUELO2 - 4 + j, 119 + Math.round((7 - j) * 0.7), SUELO2 - 4 + j, hex('#f6f2e6')); r2(113, SUELO2 + 4, 124, SUELO2 + 5, hex('#a8543a'));
  for (let y = SUELO2 - 26; y <= 122; y++) { const xc = Math.round(168 + 7 * Math.sin(y * 0.16) - (y - 72) * 0.12), w = 2 + Math.round((y - SUELO2 + 26) / 10); r2(xc - w - 1, y, xc + w + 1, y, hex('#2e5a78')); r2(xc - w, y, xc + w, y, (y + xc) % 5 === 0 ? hex('#c0dce0') : hex('#5a9ac8')); }
  r2(156, SUELO2 - 2, 182, SUELO2 - 1, K); r2(156, SUELO2 - 4, 157, SUELO2 + 1, K); r2(181, SUELO2 - 4, 182, SUELO2 + 1, K); r2(157, SUELO2 - 2, 181, SUELO2 - 2, hex('#c8c0b0'));
  r2(192, SUELO2 + 2, 262, SUELO2 + 9, hex('#4a4a56')); r2(192, SUELO2 + 3, 262, SUELO2 + 8, hex('#7a7a86')); for (let x = 194; x < 262; x += 9) r2(x, SUELO2 + 5, x + 4, SUELO2 + 5, hex('#f6f2e6'));
  r2(246, SUELO2 - 14, 246, SUELO2 + 1, K); r2(241, SUELO2 - 20, 251, SUELO2 - 13, K); r2(242, SUELO2 - 19, 250, SUELO2 - 14, hex('#f0c040'));
};
const p2 = (t) => {
  fijo('carta', fondoCarta);
  const en2 = (x, y, col) => { if (x > 0 && x < 320 && y > 0 && y < 180 && NUBE[y * 320 + x] === 1) pset(x, y, col); }, r2 = (x0, y0, x1, y1, col) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) en2(x, y, col); };
  // el cochecito de la carretera, que huye de la duna
  const xc = porTramos(t, [[P2 - 0.4, -24], [c(4.6), -24], [c(4.89), 16], [c(5.61), 64], [c(6.33), 116], [c(6.93), 164], [c(7.51), 214], [c(8.3), 258], [P3 + 0.4, 268]]);
  { const x = Math.round(Math.max(200 + 22 * (0.5 + 0.5 * Math.sin(t * 2.2)), Math.min(300, xc + 26 + (xc > 170 ? (xc - 170) * 0.7 : 0)))), y = SUELO2 + 7; r2(x - 7, y - 4, x + 7, y, K); r2(x - 6, y - 3, x + 6, y - 1, ROJO); r2(x - 4, y - 8, x + 3, y - 4, K); r2(x - 3, y - 7, x + 2, y - 5, hex('#a8d0e8')); r2(x - 5, y, x - 3, y + 1, K); r2(x + 3, y, x + 5, y + 1, K); en2(x + 6, y - 2, hex('#fff4c0')); }
  // la duna que avanza: barlovento largo, cresta y cara de caída
  const A = T.C.arena, AS = T.C.arenaS, AL = T.C.arenaL, HD = 46;
  for (let x = 12; x <= Math.min(272, Math.round(xc) + 20); x++) { const d = xc - x, top = d >= 0 ? SUELO2 + 6 - (HD + 6) * Math.max(0.72, 1 - d / 190) ** 0.75 + 1.5 * Math.sin(x * 0.2 + t * 2) * (d < 30 ? d / 30 : 1) : SUELO2 + 6 - (HD + 6) * (1 + d / 20);
    const y0 = Math.round(top); for (let y = y0; y <= 122; y++) en2(x, y, d < 0 ? ((x + y) % 3 === 0 ? hex('#8a5a2c') : AS) : y === y0 ? AL : y === y0 - 0 && d < 3 ? AL : (y - y0 + Math.round(3 * Math.sin(x * 0.11))) % 7 === 0 ? AS : (x * 3 + y * 5) % 19 === 0 ? AL : A); en2(x, y0 - 1, K); }
  for (let k = 0; k < 26; k++) { const ph = (t * 1.5 + hh(k, 1, 70)) % 1; en2(Math.round(xc + ph * 26), Math.round(SUELO2 - HD - 2 + ph * ph * 30 - Math.sin(ph * 3.1) * (3 + hh(k, 2, 70) * 6)), k % 2 ? AL : A); }
  // lo que asoma cuando se lo traga: la bandera de la torre, la vela, el cartel
  // los renglones de la carta y la mano que escribe
  const n = 9 * tramo(t, P2 - 0.3, P3 + 0.2), yl = (i) => 143 + i * 4, xl = (y) => 86 - (y - 134) * 0.27 + 8, xr = (y) => 214 + (y - 134) * 0.27 - 9;
  for (let i = 0; i < Math.ceil(n); i++) { const y = yl(i), u = i < Math.floor(n) ? 1 : n - Math.floor(n), x0 = Math.round(xl(y)) + (i === 0 ? 10 : 0), x1 = Math.round(x0 + (xr(y) - x0 - ((i * 13) % 17)) * u); rect(x0, y, x1, y, hex('#3a3a5a')); for (let x = x0 + 5 + (i * 3) % 4; x < x1; x += 7 + (i + x) % 4) pset(x, y, PAPEL); }
  { const i = Math.min(8, Math.floor(n)), y = yl(i), u = n - Math.floor(n), x0 = xl(y) + (i === 0 ? 10 : 0), wx = Math.round(n >= 9 ? xr(y) - 20 : x0 + (xr(y) - x0 - ((i * 13) % 17)) * u), wy = y - 1 + (Math.sin(t * 22) > 0 ? 0 : -1);
    T.brazo(R, wx + 52, wy + 42, wx + 17, wy + 3, MANGA, -1, { codo: [wx + 44, wy + 16] });
    linea(wx, wy, wx + 13, wy - 14, K); linea(wx + 1, wy, wx + 14, wy - 14, hex('#2a3a5a')); linea(wx + 2, wy, wx + 15, wy - 14, K); pset(wx, wy + 1, LATON); pset(wx + 1, wy, LATON); }
  // el vapor del café
  for (let k = 0; k < 3; k++) { const ph = (t * 0.5 + k / 3) % 1; pset(Math.round(303 + Math.sin(ph * 6 + k) * 2), Math.round(138 - ph * 14), hex('#8a9aa6')); }
};

// ── 3 · el reportaje, al cajón ──
const fondoCajon = () => {
  const W1 = hex('#a9b49a'), W2 = hex('#9fab90'), W3 = hex('#8a977c');
  for (let y = 0; y < 66; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 17 ? W3 : !(x > 266 && y < 52) && x % 12 < 2 ? W2 : W1);
  for (let y = 17; y < 26; y++) for (let x = 0; x < 320; x++) if (B4[y & 3][x & 3] < (26 - y) * 1.4) pset(x, y, W2);
  // el mapa de la costa enmarcado y las fotos de las dunas colgadas de un cordel
  rect(150, 22, 196, 60, K); madera(151, 23, 195, 59, MAD, MADS, 3); rect(154, 26, 192, 56, K); rect(155, 27, 191, 55, hex('#ddd5ba')); for (let y = 27; y <= 55; y++) { const xc = Math.round(168 + 3 * Math.sin(y * 0.3)); rect(155, y, xc, y, (y + xc) % 4 ? hex('#62869c') : hex('#88a6b6')); rect(xc + 1, y, xc + 3, y, hex('#fbf7e6')); rect(xc + 9, y, 191, y, (y * 3 + xc) % 5 ? hex('#547e44') : hex('#3a5f3e')); } disco(172, 42, 1, ROJO);
  for (let x = 204; x <= 262; x++) pset(x, 24 + Math.round(4 * Math.sin((x - 204) / 58 * 3.14)), K);
  for (const [x, k] of [[206, 0], [226, 1], [246, 2]]) { const y = 28 + (k === 1 ? 2 : 0); rect(x - 1, y - 1, x + 16, y + 14, K); rect(x, y, x + 15, y + 13, PAPEL); rect(x + 1, y + 1, x + 14, y + 10, hex('#a4c2d6')); poligono([[x + 1, y + 10], [x + 5 + k * 3, y + 4], [x + 10 + k * 2, y + 7], [x + 14, y + 5], [x + 14, y + 10]], hex('#ddd5ba')); poligono([[x + 5 + k * 3, y + 4], [x + 10 + k * 2, y + 7], [x + 8 + k * 2, y + 10], [x + 4 + k * 3, y + 10]], hex('#9aa0ac')); rect(x + 7, y - 3, x + 8, y, hex('#c8a060')); }
  // el tablero y el frente de la mesa
  rect(0, 66, 319, 66, K); madera(0, 67, 319, 78, MADL, MAD, 5); rect(0, 67, 319, 67, hex('#c89858')); rect(0, 79, 319, 83, MADS); rect(0, 79, 319, 79, K); rect(0, 84, 319, 84, K);
  madera(0, 85, 319, 173, MAD, MADS, 7); rect(0, 174, 319, 179, hex('#5a2a30')); for (let x = 0; x < 320; x += 6) { pset(x, 176, hex('#7a3a3c')); pset(x + 3, 178, hex('#7a3a3c')); } rect(0, 174, 319, 174, K);
  const cajon = (x0, y0, x1, y1, k) => { rect(x0, y0, x1, y1, K); madera(x0 + 1, y0 + 1, x1 - 1, y1 - 1, MADL, MAD, 11 + k); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#c89858')); rect(x0 + 1, y1 - 2, x1 - 1, y1 - 1, MADS); rect(x0 + 5, y0 + 5, x1 - 5, y1 - 5, MADS); madera(x0 + 6, y0 + 6, x1 - 6, y1 - 6, MAD, MADS, 21 + k); const cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1; rect(cx - 9, cy - 2, cx + 9, cy + 2, K); rect(cx - 8, cy - 1, cx + 8, cy + 1, LATON); rect(cx - 8, cy - 1, cx + 8, cy - 1, LATONL); };
  cajon(12, 90, 148, 128, 0); cajon(12, 132, 148, 170, 1); cajon(192, 132, 306, 170, 2);
  // el hueco de las piernas con la papelera
  rect(150, 85, 189, 173, K); rect(152, 85, 187, 173, hex('#241812')); for (let y = 150; y < 174; y++) for (let x = 152; x < 188; x++) if (B4[y & 3][x & 3] < (y - 150) * 0.6) pset(x, y, hex('#3a2a20'));
  for (const [x, y] of [[162, 139], [171, 136], [178, 140]]) { disco(x, y, 5, K); disco(x, y, 4, PAPEL); pset(x - 1, y, PAPELS); pset(x + 2, y - 2, PAPELS); linea(x - 2, y + 2, x + 1, y + 1, GRIS); }
  for (let x = 157; x <= 183; x += 3) linea(x, 142, 159 + Math.round((x - 157) * 0.85), 172, hex('#8c90a4')); rect(156, 141, 184, 142, hex('#c8ccd8')); rect(158, 157, 182, 157, hex('#8c90a4')); rect(159, 172, 181, 172, hex('#c8ccd8'));
  // la cavidad del cajón de arriba (el cajón lo pinta el plano)
  rect(192, 88, 306, 130, K); rect(194, 90, 304, 128, hex('#241812'));
  // sobre el tablero: la máquina, el bote de lápices y la taza
  PD.maquina(R, 112, 77, { s: 2 });
  rect(158, 62, 168, 77, K); rect(159, 63, 167, 76, hex('#5a7a70')); rect(159, 63, 160, 76, hex('#86a89c')); for (const [dx, hgt, col] of [[1, 9, '#f0c040'], [4, 12, '#c8303a'], [7, 7, '#3a5a8a']]) { rect(159 + dx, 62 - hgt, 160 + dx, 62, hex(col)); pset(159 + dx, 61 - hgt, K); }
  rect(174, 68, 185, 77, K); rect(175, 69, 184, 76, hex('#f2ead8')); rect(175, 69, 184, 70, hex('#5a3a20')); rect(186, 70, 188, 74, K);
};
const informe = (x, y) => { hoja(x, y, 28, 36, { y0: 20 }); rect(x + 3, y + 3, x + 24, y + 16, hex('#a4c2d6')); poligono([[x + 3, y + 16], [x + 11, y + 7], [x + 17, y + 11], [x + 24, y + 8], [x + 24, y + 16]], hex('#ddd5ba')); poligono([[x + 11, y + 7], [x + 17, y + 11], [x + 14, y + 16], [x + 9, y + 16]], hex('#9aa0ac')); rect(x + 12, y - 3, x + 15, y + 4, hex('#8c90a4')); rect(x + 13, y - 2, x + 14, y + 3, PAPEL); };
const p3 = (t) => {
  fijo('cajon', fondoCajon);
  const abre = 1 - ease(tramo(t, c(9.6), c(10.08))), yf = Math.round(lerp(90, 112, abre)), ex = Math.round(4 * abre);
  // la pila de notas crece junto a la máquina
  const cuanto = tramo(t, c(10.6), FIN - 4);
  PD.pilaNotas(R, 46, 77, { s: 2, alto: lerp(0.08, 0.3, tramo(t, c(10.5), P4 + 0.4)) });
  // el interior del cajón abierto, con sus carpetas
  if (abre > 0.03) { poligono([[196, 91], [302, 91], [306 + ex, yf], [192 - ex, yf]], hex('#3a2416')); for (let k = 0; k < 4; k++) { const y = 93 + Math.round(k * (yf - 93) / 4.4); if (y < yf - 2) { rect(200 - k, y, 298 + k, y + 1, k % 2 ? hex('#c8a060') : hex('#d8c08a')); rect(210 + k * 20, y - 2, 224 + k * 20, y, k % 2 ? hex('#c8a060') : hex('#d8c08a')); } } }
  // el reportaje baja en la mano y entra en el cajón
  const ua = ease(tramo(t, P3 - 0.3, c(9.05))), ub = ease(tramo(t, c(9.05), c(9.5))), dentro = ub >= 1;
  const sx = Math.round(lerp(330, 236, ua)), sy = Math.round(lerp(40, 50, ua) + ub * 66);
  if (!dentro) informe(sx, sy);
  // el frente del cajón (tapa lo que ya ha entrado)
  { const x0 = 190 - ex, x1 = 308 + ex, y1 = yf + 38 + ex; rect(x0, yf, x1, y1, K); madera(x0 + 1, yf + 1, x1 - 1, y1 - 1, MADL, MAD, 13); rect(x0 + 1, yf + 1, x1 - 1, yf + 2, hex('#d8a868')); rect(x0 + 1, y1 - 2, x1 - 1, y1 - 1, MADS); rect(x0 + 6, yf + 6, x1 - 6, y1 - 6, MADS); madera(x0 + 7, yf + 7, x1 - 7, y1 - 7, MAD, MADS, 23);
    const cx = 249, cy = (yf + y1) >> 1; rect(cx - 10, cy - 2, cx + 10, cy + 2, K); rect(cx - 9, cy - 1, cx + 9, cy + 1, LATON); rect(cx - 9, cy - 1, cx + 9, cy - 1, LATONL); disco(cx, cy + 9, 2, K); pset(cx, cy + 9, LATON);
    if (abre > 0.03) { rect(x0, y1 + 1, x1, y1 + 3, hex('#2a1a10')); } }
  // la mano: lleva la hoja, la suelta, empuja el cajón y se va
  { const uc = tramo(t, c(9.5), c(9.62)), ud = ease(tramo(t, c(10.15), c(10.9)));
    let wx = sx + 40, wy = sy + 8; if (ub > 0.6) { const k = ease(tramo(ub, 0.6, 1)); wy = Math.round(lerp(sy + 8, 118, k)); wx = Math.round(lerp(sx + 40, 292, k)); }
    if (dentro) { wx = 292 + Math.round(ud * 50); wy = yf + 8 + Math.round(ud * 10); }
    if (ud < 1) T.brazo(R, wx + 44, wy - 22, wx, wy, MANGA, -1, { codo: [wx + 24, wy - 4], sombra: false }); }
  // un hilo de arena se escapa por la esquina del cajón cerrado
  { const d = t - c(10.3); if (d > 0) { const m = Math.min(1, d / 2.6); for (let y = 131; y < 173 - Math.round(m * 5); y++) if ((y + Math.floor(t * 30)) % 3) pset(197 + ((y * 7 + Math.floor(t * 12)) % 5 === 0 ? 1 : 0), y, (y + Math.floor(t * 30)) % 2 ? T.C.arenaL : T.C.arena); PD.montonArena(R, 198, 174, { alto: 0.02 + 0.3 * m }); } }
  // las hojas de notas caen una tras otra sobre el tablero
  for (let k = 0; k < 7; k++) { const t0 = c(10.55) + k * 0.36, d = t - t0; if (d < 0) continue; const x = 206 + (k * 37) % 62, yd = 75 - k * 3, u = Math.min(1, d / 0.45), y = Math.round(lerp(-12, yd, u * u)), gira = u < 1 && Math.floor(d * 14) % 2;
    if (gira) { rect(x + 3, y - 12, x + 25, y + 1, K); rect(x + 4, y - 11, x + 24, y, PAPEL); for (let j = -9; j < 0; j += 3) rect(x + 7, y + j, x + 20 - (j + 9), y + j, GRIS); } else { rect(x - 1, y - 3, x + 31, y + 1, K); rect(x, y - 2, x + 30, y, k % 3 === 2 ? PAPELS : PAPEL); rect(x + 4, y - 1, x + 22, y - 1, GRIS); } }
};

// ── 4 · el cuarto: las notas desbordan ──
const p4 = (t) => {
  const o = { epoca: 1957 }; T.casa(R, t, o);
  const u = tramo(t, P4 - 0.35, FIN), gira = t > c(15.2), idea = t > c(16.3);
  // papeles por el suelo
  for (let k = 0; k < Math.floor(3 + u * 15); k++) { const x = k % 2 ? 18 + Math.round(hh(k, 1, 80) * 62) : 224 + Math.round(hh(k, 1, 80) * 30), y = 154 + Math.round(hh(k, 2, 80) * 20); rect(x - 1, y - 1, x + 9, y + 4, K); rect(x, y, x + 8, y + 3, k % 3 ? PAPEL : PAPELS); rect(x + 2, y + 1, x + 6, y + 1, GRIS); }
  const a1 = lerp(0.15, 0.4, u), a2 = lerp(0.1, 0.33, u);
  PD.pilaNotas(R, 70, 151, { alto: a1 }); PD.pilaNotas(R, 240, 151, { alto: a2 }); if (u > 0.35) PD.pilaNotas(R, 34, 152, { alto: lerp(0, 0.22, tramo(u, 0.35, 1)) });
  // Herbert, a la máquina; luego mira la pila, se asombra y sonríe
  const h = R.actor(EL.herbert57, 139, 150, t, { dir: gira ? -1 : 1, sorpresa: gira && !idea, sonrisa: idea, dedo: idea });
  if (idea) R.bocadillo(h.cabeza[0] + 2, h.cabeza[1] - 6 - Math.round(Math.max(0, 3 * Math.sin((t - c(16.3)) * 10) * Math.exp(-(t - c(16.3)) * 4))));
  T.casaDelante(R, t, o);
  // las hojas vuelan de la máquina a las pilas
  if (t < c(16.0)) for (let k = 0; k < 2; k++) { const ph = ((t - P4) * 1.9 + k * 0.5) % 1, n = Math.floor((t - P4) * 1.9 + k * 0.5), izq = (n + k) % 3 !== 0, x1 = izq ? 70 : 240, y1 = 151 - Math.round(6 + 36 * (izq ? a1 : a2)); if (ph < 0 || t < P4 - 0.2) continue;
    const x = Math.round(lerp(180, x1, ph)), y = Math.round(lerp(120, y1, ph) - 34 * Math.sin(ph * 3.14)), g = Math.floor(t * 10 + k) % 2; rect(x - 1, y - 1, x + 8 - g * 2, y + 4 + g * 2, K); rect(x, y, x + 7 - g * 2, y + 3 + g * 2, PAPEL); rect(x + 1, y + 1 + g, x + 5 - g * 2, y + 1 + g, GRIS); }
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { año: 1957,
  efectos: [[c(0.95), 'vapor'], [c(1.5), 'puerta'], [P2 + 0.1, 'lapiz'], [c(4.89), 'viento'], [c(5.65), 'pop'], [c(6.35), 'burbujas'], [c(7.55), 'claxon'],
    [P3 + 0.1, 'papel'], [c(10.08), 'toc'], [c(11.3), 'papel'], [P4 + 0.2, 'tecleo'], [c(14.6), 'papel'], [c(16.3), 'brillo']] });
''')
