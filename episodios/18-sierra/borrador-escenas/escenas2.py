E = {}

# ── comunes a las tres escenas (se pegan al principio de cada cuerpo) ─────────────────────────────────────────────────
COMUN = r'''
const K = T.C.k, BL = T.C.blanco;
const ease = (u) => u * u * (3 - 2 * u);
const nz = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// un fondo fijo en su búfer (se pinta una vez); devuelve una función que lo copia a la pantalla
const capa = (dibuja) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); } R.copiar(b); }; };
// la taza de café con su asa y su vapor
const taza = (x, y, t, col = hex('#d8783a')) => { R.rect(x - 3, y - 6, x + 3, y, K); R.rect(x - 2, y - 5, x + 2, y - 1, col); R.rect(x - 2, y - 5, x + 2, y - 5, hex('#3a2010')); R.pset(x + 4, y - 4, K); R.pset(x + 4, y - 2, K); R.pset(x + 5, y - 3, K);
  for (let k = 0; k < 2; k++) { const f = (t * 1.3 + k * 0.5) % 1; R.pset(x - 1 + k * 2 + Math.round(Math.sin(t * 5 + k) * 1), Math.round(y - 8 - f * 6), mez(hex('#e8e8f0'), hex('#3a3a4a'), f)); } };
'''

E['si-casa'] = ('1979: la cueva de texto', '''// SI-CASA (frases 8–10), cartela «1979». Cinco planos:
// 1. cocina general, de noche: Roberta entra con su taza, la deja junto al terminal y se pone a teclear; Ken, que lo
//    ha traído del trabajo, se lo explica y se asoma por encima de su hombro (corta en «the terminal»);
// 2. fondo local: la sala del ordenador del trabajo de Ken, de noche: cintas que giran, el panel de luces, la impresora
//    que saca papel; el operador llega con su café y, en «hooked up», el pulso entra por la línea de teléfono hasta el
//    acoplador: se encienden sus luces y una ola de luces recorre el ordenador grande (corta en «It's called»);
// 3. cocina, cámara 'pantalla': la pantalla verde de cerca; en «Cave» sale el dibujo de la cueva, en «no pictures» se
//    va (solo texto), las manos de Roberta teclean la orden y en «take lamp» sale la lámpara;
// 4. hoy cueva 'real' general (los setenta): el explorador con casco entra por la boca con la linterna, se para, saca
//    su cuaderno y dibuja el mapa; en «real caves» mira las estalactitas; el cable sale de la cueva con su pulso;
// 5. el mapa de EE. UU.: el juego salta de ordenador en ordenador (de Massachusetts a California y más), cada uno se
//    enciende al llegar (corta en «And it was passed»).''', COMUN + r'''
const A = (f) => en('terminal', f), Bq = (f) => en('cueva', f), Cw = (f) => en('crowther', f);
const P2 = A(0.512), P3 = Bq(0) - 0.14, P4 = Bq(0.982), P5 = Cw(0.616);

// 1 · la cocina: Roberta llega con su taza; Ken se lo explica y se asoma
const p1 = (t) => {
  T.casa(R, t, { encuadre: 'cocina' });
  const llega = tramo(t, 1.45, A(0.3)), rx = Math.round(lerp(-18, 151, ease(llega)));
  const deja = t > A(0.33);
  const kAs = tramo(t, A(0.36), A(0.46)), kx = Math.round(lerp(112, 132, ease(kAs)));
  R.actor(EL.ken, kx, 160, t, { dir: 1, anda: kAs > 0 && kAs < 1, habla: t < A(0.3) && Math.sin(t * 7) > 0, dedo: (t > A(0.12) && t < A(0.28)) || t > A(0.46), sonrisa: t > A(0.4) });
  const sentada = llega >= 1, r = R.actor(EL.roberta, rx, sentada ? 163 : 160, t, { dir: 1, anda: llega > 0 && llega < 1, sostiene: !deja, sonrisa: llega >= 1, dedo: t > A(0.39) && Math.floor(t * 3) % 2 === 0, habla: t > A(0.44) && Math.sin(t * 6) > 0.4 });
  if (!deja) taza(r.mano[0] + 2, r.mano[1] + 3, t); else taza(182, 135, t);
  // el asiento de su silla, por delante de la cadera: se lee sentada
  if (sentada) { R.rect(149, 146, 174, 151, K); R.rect(150, 147, 173, 149, hex('#d8783a')); R.rect(150, 147, 173, 147, hex('#f0a060')); R.rect(150, 150, 173, 150, hex('#9a4a1a'));
    for (const x of [151, 171]) R.rect(x, 151, x + 1, 164, K); }
};

// 2 · fondo local: la sala del ordenador del trabajo de Ken, de noche (1979)
const sala = capa(() => {
  const { rect, pset, linea, disco } = R;
  // el techo de placas acústicas con su punteado
  rect(0, 0, 319, 15, hex('#cfcabc')); for (let x = 0; x < 320; x += 20) rect(x, 0, x, 15, hex('#b0ab9e')); rect(0, 7, 319, 7, hex('#b8b3a6')); rect(0, 15, 319, 15, hex('#8a8678'));
  for (let i = 0; i < 260; i++) pset(Math.floor(nz(i, 1, 3) * 320), Math.floor(nz(i, 2, 3) * 15), hex('#b8b4a6'));
  // la pared verde de oficina con su textura, el zócalo y el rodapié
  for (let y = 16; y < 113; y++) for (let x = 0; x < 320; x++) { const n = nz(x >> 1, y >> 1, 4); R.buf[y * 320 + x] = y > 86 ? (n < 0.12 ? hex('#7e8a78') : hex('#8e9a86')) : n < 0.1 ? hex('#a4b09c') : n > 0.93 ? hex('#c8d4bc') : hex('#b6c2ac'); }
  rect(0, 85, 319, 86, hex('#6a7464')); rect(0, 84, 319, 84, hex('#d0dac6')); rect(0, 110, 319, 112, hex('#4a5048'));
  // la ventana (el aluminio, la persiana recogida arriba y el alféizar)
  rect(166, 22, 240, 72, hex('#5a5e66')); rect(167, 23, 239, 71, hex('#9aa0aa')); rect(203, 23, 204, 71, hex('#5a5e66'));
  rect(164, 72, 242, 75, hex('#c8ccd0')); rect(164, 75, 242, 75, hex('#6a6e74'));
  // las tres unidades de cinta: carcasa beis, franja azul, ventana oscura, botones y zócalo
  for (const x of [6, 44, 82]) {
    rect(x, 26, x + 34, 112, K); rect(x + 1, 27, x + 33, 111, hex('#d8d0bc')); rect(x + 1, 27, x + 33, 34, hex('#2a4a7a')); rect(x + 1, 27, x + 33, 27, hex('#4a6a9a'));
    rect(x + 32, 35, x + 33, 111, hex('#a8a08c')); rect(x + 4, 38, x + 30, 84, K); rect(x + 5, 39, x + 29, 83, hex('#1a2230'));
    for (let y = 40; y < 83; y += 7) linea(x + 6, y, x + 9, y - 3, hex('#2e3a4c'));
    for (let k = 0; k < 4; k++) { rect(x + 5 + k * 7, 90, x + 9 + k * 7, 94, K); rect(x + 6 + k * 7, 91, x + 8 + k * 7, 93, [hex('#e8e0c8'), hex('#c83a2a'), hex('#e8e0c8'), hex('#3a8a4a')][k]); }
    rect(x + 4, 98, x + 30, 100, hex('#b8b09c')); rect(x + 1, 104, x + 33, 111, hex('#3a3a40')); for (let k = 0; k < 6; k++) rect(x + 4 + k * 5, 106, x + 6 + k * 5, 109, hex('#2a2a30'));
  }
  // el ordenador central: panel azul de luces y fila de interruptores
  rect(120, 26, 160, 112, K); rect(121, 27, 159, 111, hex('#d8d0bc')); rect(123, 34, 157, 86, K); rect(124, 35, 156, 85, hex('#22385e'));
  rect(121, 27, 159, 32, hex('#2a4a7a')); for (let k = 0; k < 8; k++) { rect(125 + k * 4, 92, 126 + k * 4, 98, K); rect(125 + k * 4, 92, 126 + k * 4, 94, k % 3 ? BL : hex('#c83a2a')); }
  rect(121, 104, 159, 111, hex('#3a3a40'));
  // la consola: el tablero de fórmica y el frente
  rect(164, 99, 246, 128, K); rect(165, 100, 245, 104, hex('#d8d8d0')); rect(165, 100, 245, 100, BL); rect(165, 105, 245, 127, hex('#7a7a84')); for (let x = 170; x < 245; x += 12) rect(x, 106, x, 126, hex('#6a6a72'));
  rect(166, 128, 170, 140, K); rect(240, 128, 244, 140, K);
  // el terminal de la consola (carcasa beis y pantalla verde) y el acoplador acústico con el teléfono
  rect(174, 72, 208, 100, K); rect(175, 73, 207, 99, hex('#e0d8c0')); rect(205, 73, 207, 99, hex('#b0a88e')); rect(178, 76, 204, 92, K); rect(179, 77, 203, 91, hex('#0c1e12'));
  rect(176, 95, 206, 98, hex('#b8b09a'));
  rect(212, 88, 240, 100, K); rect(213, 89, 239, 99, hex('#8a8a92')); disco(218, 88, 4, K); disco(218, 88, 3, hex('#2a2a2e')); disco(234, 88, 4, K); disco(234, 88, 3, hex('#2a2a2e'));
  rect(214, 82, 238, 86, K); rect(215, 83, 237, 85, hex('#2a2a32')); rect(215, 83, 237, 83, hex('#4a4a56'));
  // el cable del teléfono que baja a la caja de la pared
  for (let x = 240; x <= 254; x++) pset(x, Math.round(96 + Math.sin((x - 240) / 14 * Math.PI) * 6 + (x - 240) * 0.55), hex('#1a1a1e'));
  rect(252, 102, 258, 108, K); rect(253, 103, 257, 107, hex('#e8e4d8')); pset(255, 105, K);
  // la impresora de líneas con su caja de papel continuo
  rect(256, 92, 308, 130, K); rect(257, 93, 307, 129, hex('#d8d0bc')); rect(257, 93, 307, 99, hex('#4a4a52')); rect(262, 104, 302, 112, hex('#b8b09c')); rect(262, 104, 302, 104, hex('#8a8270'));
  for (let k = 0; k < 4; k++) rect(266 + k * 8, 118, 270 + k * 8, 121, k === 0 ? hex('#3a8a4a') : hex('#e8e0c8'));
  rect(260, 130, 264, 146, K); rect(300, 130, 304, 146, K); rect(262, 136, 302, 146, K); rect(263, 137, 301, 145, hex('#e8e8e0')); for (let y = 138; y < 146; y += 2) rect(263, y, 301, y, hex('#a8d0a8'));
  // el reloj de pared
  disco(268, 62, 8, K); disco(268, 62, 7, hex('#f2eee2')); for (let k = 0; k < 12; k++) pset(Math.round(268 + Math.cos(k * 0.5236) * 6), Math.round(62 + Math.sin(k * 0.5236) * 6), K);
  // el suelo técnico: placas con juntas, unas perforadas, y el brillo de los tubos
  for (let y = 113; y < 180; y++) for (let x = 0; x < 320; x++) { const tx = Math.floor(x / 24), ty = Math.floor((y - 113) / 12), junta = x % 24 === 0 || (y - 113) % 12 === 0;
    const perf = (tx * 7 + ty * 3) % 5 === 0 && x % 3 === 1 && (y - 113) % 3 === 1, brillo = x > 150 + (y - 113) * 0.2 && x < 250 - (y - 113) * 0.1 && ((x + y) & 1) === 0 && y < 150;
    R.buf[y * 320 + x] = junta ? hex('#8a9098') : perf ? hex('#9aa0a8') : brillo ? hex('#dfe3e7') : nz(x >> 2, y >> 2, 5) < 0.08 ? hex('#b8bcc2') : hex('#c8ccd0'); }
  // la silla de la consola, la papelera y el carrito de cintas
  rect(222, 120, 236, 136, K); rect(223, 121, 235, 135, hex('#3a4a6a')); rect(220, 136, 238, 140, K); rect(221, 137, 237, 139, hex('#4a5a7a')); rect(228, 140, 230, 150, K); linea(220, 152, 238, 152, K); pset(220, 151, K); pset(238, 151, K);
  rect(146, 132, 158, 150, K); rect(147, 133, 157, 149, hex('#6a6a72')); for (let y = 135; y < 149; y += 3) rect(147, y, 157, y, hex('#5a5a62')); rect(148, 130, 156, 133, BL); linea(149, 130, 153, 128, BL);
  rect(10, 140, 46, 142, K); rect(10, 156, 46, 158, K); rect(12, 142, 13, 160, K); rect(43, 142, 44, 160, K); disco(13, 162, 2, K); disco(43, 162, 2, K);
  for (const [cx, cy] of [[20, 134], [34, 134], [20, 150], [34, 150]]) { disco(cx, cy, 6, K); disco(cx, cy, 5, hex('#3a3a44')); disco(cx, cy, 2, hex('#c8c8d0')); }
  // el reflejo de los armarios en el suelo encerado
  for (const x of [6, 44, 82, 120]) for (let y = 114; y < 132; y++) for (let i = x + 2; i < x + 32; i += 2) if (((i + y) & 1) === 0 && nz(i, y, 31) < 0.6 - (y - 114) / 30) pset(i, y, hex('#b4b8be'));
  // una placa del suelo levantada: el hueco con el mazo de cables de colores y la placa apoyada
  rect(72, 150, 96, 162, K); rect(73, 151, 95, 161, hex('#2a2a30'));
  for (let k = 0; k < 6; k++) { const c = [hex('#c83a2a'), hex('#3a6ac8'), hex('#e8c840'), hex('#5aa83a'), hex('#e8e4d8'), hex('#8a4ac8')][k]; for (let x = 73; x < 96; x++) pset(x, Math.round(153 + k * 1.4 + Math.sin(x * 0.3 + k) * 0.8), c); }
  linea(98, 162, 104, 140, K); linea(99, 162, 105, 140, K); linea(104, 140, 124, 144, K); linea(98, 162, 118, 166, K); linea(118, 166, 124, 144, K);
  for (let y = 142; y < 165; y++) for (let x = 99; x < 124; x++) { const a = (x - 99) / 25, top = 140 + (162 - 140) * (1 - a) - 0 + a * 4, bot = 162 + a * 4; if (y > top + 1 && y < bot) pset(x, y, (x + y) % 3 === 0 ? hex('#9aa0a8') : hex('#c8ccd0')); }
  // la caja de tarjetas perforadas y el papel continuo amontonado junto a la impresora
  rect(124, 162, 146, 174, K); rect(125, 163, 145, 173, hex('#d8c8a0')); rect(125, 163, 145, 165, hex('#e8dcb8')); for (let x = 127; x < 144; x += 2) rect(x, 160, x, 163, hex('#f0e8d0'));
  for (let k = 0; k < 6; k++) { const y = 172 - k * 3, x = 262 + (k % 2) * 3; rect(x, y, x + 40, y + 3, K); rect(x + 1, y + 1, x + 39, y + 2, k % 2 ? hex('#f2f2ea') : hex('#c8e8c8')); }
  // la fregona y su cubo, apoyados en la pared
  rect(54, 128, 66, 142, K); rect(55, 129, 65, 141, hex('#e8c040')); rect(55, 129, 65, 130, hex('#f8e070')); linea(62, 86, 58, 128, hex('#8a5a2a')); linea(63, 86, 59, 128, hex('#6a4020'));
});
const p2 = (t) => {
  const { rect, pset, linea, disco } = R;
  sala();
  const enganche = A(0.81), ordenador = A(0.871), rapido = tramo(t, ordenador, ordenador + 0.4);
  // la noche por la ventana: cielo tramado, estrellas, la luna, la ciudad con ventanas que se encienden y un avión
  R.recorte([167, 23, 239, 71]);
  for (let y = 23; y < 72; y++) for (let x = 167; x < 240; x++) { if (x === 203 || x === 204) continue; const u = (y - 23) / 48; pset(x, y, ((x + y) & 1) && u > 0.5 ? hex('#3a2a5a') : u > 0.75 ? hex('#4a3060') : hex('#141a3a')); }
  for (let k = 0; k < 14; k++) { const x = 168 + Math.floor(nz(k, 1, 6) * 70), y = 25 + Math.floor(nz(k, 2, 6) * 22); if (Math.sin(t * 3 + k * 1.7) > -0.4) pset(x, y, hex('#e8e8ff')); }
  disco(228, 33, 4, hex('#f2eecc')); disco(230, 32, 3, hex('#141a3a'));
  for (let k = 0; k < 9; k++) { const x0 = 167 + k * 8, h = 8 + Math.floor(nz(k, 3, 6) * 14); for (let y = 71 - h; y < 72; y++) for (let x = x0; x < x0 + 7; x++) { if (x === 203 || x === 204) continue; pset(x, y, ((x - x0) % 3 === 1 && (y - 71 + h) % 3 === 1 && nz(x, y + Math.floor(t * 0.5 + k), 7) < 0.55) ? hex('#f0d070') : hex('#0e1020')); } }
  { const ax = 166 + ((t * 9) % 80); pset(Math.round(ax), 30, Math.floor(t * 3) % 2 ? hex('#ff4a4a') : hex('#ffffff')); pset(Math.round(ax) - 1, 30, hex('#6a6a7a')); }
  R.recorte(null);
  for (let k = 0; k < 4; k++) rect(167, 23 + k * 2, 239, 23 + k * 2, hex('#e8e8e0'));
  // las cintas que giran (más deprisa cuando el ordenador recibe el juego)
  for (const [i, x] of [[0, 6], [1, 44], [2, 82]]) for (const [j, cy] of [[0, 50], [1, 72]]) {
    const cx = x + 17, a = t * (1.5 + i * 0.4 + rapido * 6) * (j ? -1 : 1) + i;
    disco(cx, cy, 10, hex('#5a5a66')); disco(cx, cy, 9, hex('#3a3a46')); disco(cx, cy, 7 - j, hex('#7a4a2a')); disco(cx, cy, 3, hex('#c8c8d0'));
    for (let k = 0; k < 3; k++) { const b = a + k * 2.094; linea(cx, cy, Math.round(cx + Math.cos(b) * 8), Math.round(cy + Math.sin(b) * 8), hex('#9a9aa8')); }
    disco(cx, cy, 1, K);
  }
  for (const x of [6, 44, 82]) linea(x + 9, 59, x + 25, 63, hex('#7a4a2a'));
  // el panel de luces: parpadeo normal y la ola cuando llega el juego
  for (let j = 0; j < 9; j++) for (let i = 0; i < 6; i++) { const ola = t > ordenador && t < ordenador + 1.4 && Math.abs((t - ordenador) * 14 - (i + j)) < 1.5;
    const on = ola || nz(i, j, Math.floor(t * (3 + rapido * 6))) > 0.55, x = 127 + i * 5, y = 38 + j * 5;
    rect(x, y, x + 2, y + 2, on ? (ola ? hex('#fff4a0') : (i + j) % 4 ? hex('#ffb040') : hex('#ff5a4a')) : hex('#3a2a20')); }
  // el terminal de la consola escribe renglones de trazos
  for (let k = 0; k < 5; k++) { const w = 4 + Math.floor(nz(k, Math.floor(t * 2), 8) * 18), n = Math.floor(t * 2) + k; rect(180, 78 + k * 3, 180 + (k === 4 ? Math.min(w, Math.floor((t * 20) % 22)) : w), 78 + k * 3, n % 7 === 0 ? hex('#a8ffb0') : hex('#4ad86a')); }
  // el pulso que llega por el cable del teléfono y las luces del acoplador
  if (t > enganche - 0.45 && t < enganche + 0.1) { const u = (t - enganche + 0.45) / 0.55; for (let k = 0; k < 3; k++) { const v = Math.min(1, u - k * 0.08); if (v < 0) continue; const x = Math.round(254 - v * 14); pset(x, Math.round(96 + Math.sin((x - 240) / 14 * Math.PI) * 6 + (x - 240) * 0.55), hex('#fff4a0')); } }
  for (let k = 0; k < 3; k++) { const on = t > enganche && Math.sin(t * 18 + k * 2) > -0.2; rect(216 + k * 6, 95, 218 + k * 6, 97, on ? [hex('#ff4a3a'), hex('#5ae86a'), hex('#ffd040')][k] : hex('#3a3a40')); }
  if (t > enganche && t < enganche + 0.4) { const r = Math.round((t - enganche) * 20); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1]]) pset(226 + dx * (r + 3), 86 + dy * (r + 2), hex('#fff4a0')); }
  // la impresora saca papel continuo (pliegue a pliegue)
  { const h = 6 + Math.floor((t * 5) % 16); rect(266, 92 - h, 298, 92, K); rect(267, 93 - h, 297, 92, hex('#f2f2ea')); for (let y = 93 - h; y < 92; y++) if (((y + Math.floor(t * 5)) % 6) < 3) rect(267, y, 297, y, hex('#c8e8c8')); rect(267, 93 - h, 297, 93 - h, hex('#a8a8a0')); }
  // el tubo del techo que parpadea y el segundero del reloj
  { const on = Math.sin(t * 23) > -0.85 || Math.floor(t * 2) % 5; rect(184, 9, 262, 13, K); rect(185, 10, 261, 12, on ? hex('#f4f8ff') : hex('#a8acb0')); }
  { const a = t * 1.05 - 1.57; linea(268, 62, Math.round(268 + Math.cos(a) * 6), Math.round(62 + Math.sin(a) * 6), hex('#c83a2a')); linea(268, 62, 268, 57, K); linea(268, 62, 272, 63, K); }
  // el operador de noche llega con su café; en «hooked up» se sorprende y señala el ordenador
  const u = tramo(t, P2 + 0.25, P2 + 2.2), ox = Math.round(lerp(326, 196, ease(u)));
  const o = R.actor(EL.tecnico, ox, 156, t, { dir: -1, anda: u > 0 && u < 1, sostiene: t < ordenador, sorpresa: t > enganche && t < ordenador + 0.3, dedo: t > ordenador + 0.2, sonrisa: t > ordenador + 0.6 });
  if (t < ordenador) taza(o.mano[0] - 1, o.mano[1] + 3, t, hex('#e8e4d8'));
  else taza(206, 99, t, hex('#e8e4d8'));
};

// 3 · la pantalla de cerca: la cueva, solo texto, «take lamp» y la lámpara
const p3 = (t) => {
  const icono = t > Bq(0.129) && t < Bq(0.368) ? 'cueva' : t > Bq(0.875) ? 'lampara' : null;
  T.casa(R, t, { encuadre: 'cocina', camara: 'pantalla', icono });
  const tec = (t > Bq(0.56) && t < Bq(0.87)) || (t > P3 + 0.3 && t < Bq(0.1)), ret = t > Bq(0.865) && t < Bq(0.9) ? 3 : 0;
  const a = tec ? Math.floor(t * 9) % 2 : 0, b = tec ? Math.floor(t * 9 + 1) % 2 : 0;
  T.brazo(R, 66, 200, 112, 163 + a * 2, '#9a6a9a', 1, { codo: [80, 182] });
  T.brazo(R, 256, 200, 206, 163 + b * 2 + ret, '#9a6a9a', -1, { codo: [242, 184] });
  if (t > Bq(0.129) && t < Bq(0.2) || t > Bq(0.875) && t < Bq(0.95)) { const r = Math.round(((t * 8) % 1) * 4); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(205 + dx * (24 + r), 69 + dy * (22 + r), hex('#a8ffb0')); }
};

// 4 · la cueva de verdad (los setenta): el explorador entra con su linterna, se para y dibuja el mapa
const p4 = (t) => {
  const u = tramo(t, P4 + 0.15, Cw(0.27)), x = Math.round(lerp(300, 166, ease(u))), para = u >= 1;
  const mira = t > Cw(0.4) && t < Cw(0.5);
  const o = { encuadre: 'cueva', estilo: 'real', linterna: [x + 3, 133 - (mira ? 4 : 0), -1], cable: tramo(t, Cw(0.5), Cw(0.62)), cableDe: [x + 4, 155] };
  T.hoy(R, t, o);
  { const B = R.buf, cx = x + 7, cy = 140; for (let y = cy - 26; y < 158; y++) for (let i = cx - 30; i < cx + 30; i++) { if (i < 0 || i > 319) continue; const d = Math.hypot(i - cx, (y - cy) * 1.3) / 30; if (d < 1 && nz(i, y, 41) < (1 - d) * 0.55) B[y * 320 + i] = mez(B[y * 320 + i], hex('#ffe0a0'), 0.25); } }
  const e = R.actor(EL.espeleologo, x, 156, t, { dir: -1, anda: u > 0 && u < 1, sostiene: para && !mira, sorpresa: mira, sonrisa: t > Cw(0.5), salto: 0 });
  if (para && !mira) { const [hx, hy] = e.mano; R.rect(hx - 7, hy - 2, hx + 1, hy + 4, K); R.rect(hx - 6, hy - 1, hx, hy + 3, hex('#e8dcb0')); R.linea(hx - 5, hy + 1, hx - 2, hy, hex('#5a4a3a'));
    const lx = hx - 3 + Math.round(Math.sin(t * 11) * 2); R.linea(lx, hy - 4, lx + 2, hy, hex('#e8c840')); R.pset(lx + 2, hy, K); }
  if (mira) R.icono('!', x + 5, 112, hex('#ffe070'), K, 1);
  T.j_hoyDelante(R, t, o);
};

// 5 · el mapa: el juego salta de ordenador en ordenador por todo el país
const NODOS = [[-71.1, 42.37], [-79.94, 40.44], [-88.23, 40.11], [-89.4, 43.07], [-105.27, 40.01], [-122.17, 37.43], [-111.89, 40.76], [-118.24, 34.05], [-97.74, 30.28]];
const p5 = (t) => {
  const P = T.mapa(R, t, { zona: 'eeuu' }), { rect, pset, disco, linea } = R;
  const pts = NODOS.map((n) => P(n).map(Math.round)), t0 = P5 + 0.25, paso = (Cw(0.98) - t0) / (pts.length - 1);
  const llega = (i) => i === 0 ? t0 - 0.3 : t0 + i * paso;
  R.recorte([20, 14, 300, 170]);
  for (let i = 1; i < pts.length; i++) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i], u = tramo(t, llega(i) - paso, llega(i)); if (u <= 0) continue;
    const mx = (ax + bx) / 2, my = (ay + by) / 2 - Math.hypot(bx - ax, by - ay) * 0.25, n = 40;
    for (let k = 0; k <= Math.floor(n * u); k++) { const s = k / n, x = (1 - s) ** 2 * ax + 2 * (1 - s) * s * mx + s * s * bx, y = (1 - s) ** 2 * ay + 2 * (1 - s) * s * my + s * s * by;
      if (k % 3 !== 2) { pset(Math.round(x), Math.round(y) + 1, hex('#5a3a1a')); pset(Math.round(x) + 1, Math.round(y) + 1, hex('#5a3a1a')); pset(Math.round(x), Math.round(y), u < 1 ? hex('#ffe070') : hex('#d8582a')); pset(Math.round(x) + 1, Math.round(y), u < 1 ? hex('#fff4a0') : hex('#e8783a')); } }
    if (u < 1) { const s = u, x = Math.round((1 - s) ** 2 * ax + 2 * (1 - s) * s * mx + s * s * bx), y = Math.round((1 - s) ** 2 * ay + 2 * (1 - s) * s * my + s * s * by);
      disco(x, y, 2, hex('#fff4a0')); for (const [dx, dy] of [[3, 0], [-3, 0], [0, 3], [0, -3]]) pset(x + dx, y + dy, Math.floor(t * 20) % 2 ? BL : hex('#ffd040')); } }
  R.recorte(null);
  pts.forEach(([x, y], i) => { const on = t >= llega(i), x0 = x - 5, y0 = y - 12;
    rect(x - 4, y + 1, x + 4, y + 1, hex('#8a7a5a'));
    rect(x0, y0, x0 + 10, y0 + 9, K); rect(x0 + 1, y0 + 1, x0 + 9, y0 + 8, hex('#e0d8c0')); rect(x0 + 2, y0 + 2, x0 + 8, y0 + 6, on ? hex('#0c2a14') : hex('#2a2e2a'));
    if (on) { rect(x0 + 3, y0 + 3, x0 + 3 + ((Math.floor(t * 4) + i) % 4), y0 + 3, hex('#5ae86a')); rect(x0 + 3, y0 + 5, x0 + 6, y0 + 5, hex('#5ae86a')); }
    rect(x - 1, y0 + 10, x + 1, y, K); rect(x - 3, y, x + 3, y + 1, K);
    const d = t - llega(i); if (d > 0 && d < 0.35 && i > 0) { const r = 6 + Math.round(d * 30); for (let a = 0; a < 8; a++) pset(Math.round(x + Math.cos(a * 0.785) * r), Math.round(y0 + 4 + Math.sin(a * 0.785) * r * 0.7), hex('#fff4a0')); } });
};

const efectos = [[A(0.33), 'toc'], [A(0.42), 'tecleo'], [A(0.81), 'bip'], [A(0.871), 'zumbido'], [Bq(0.129), 'brillo'], [Bq(0.6), 'tecleo'], [Bq(0.875), 'bip'], [Cw(0.3), 'lapiz'], [Cw(0.724), 'bip'], [Cw(0.86), 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '1979', efectos, año: (t) => t < P4 ? 1979 : t < P5 ? 1976 : 1977 });
''')

E['si-idea'] = ('Una aventura con dibujos', '''// SI-IDEA (frases 11–13), 1979–1980. Cuatro planos:
// 1. casa mesa general, de día: Roberta, enganchada, señala la pantalla de Ken; en «idea» se le enciende la bombilla,
//    da un saltito y aparta los platos; entra el papel cuadriculado; Ken se vuelve y sonríe (corta en «She writes»);
// 2. casa mesa, cámara 'monitor': la mano de Roberta dibuja en el papel; en «Ken programs» las manos de Ken teclean y
//    la casa vieja se traza en el monitor (corta en «In 1980»);
// 3. fondo local: la casa vieja del juego a toda pantalla, líneas blancas sobre negro (rayas de tubo): en «Mystery» el
//    relámpago; un muñequito de trazo sube por el camino, el gato negro cruza por la valla y en «house» se abre la
//    puerta (corta en «with about»);
// 4. fondo local: el corcho del cuarto de trabajo: los dibujos en blanco y negro se clavan uno tras otro y la cifra
//    sube hasta 70 en «seventy»; Roberta, subida a un taburete, clava el último; Ken llega con un disquete.''', COMUN + r'''
const I = (f) => en('idea', f), D = (f) => en('dibuja', f), Y = (f) => en('mystery', f);
const P2 = D(0), P3 = Y(0) - 0.05, P4 = Y(0.626);

// la bombilla de la idea (aparece con un pop y echa rayos)
const bombilla = (x, y, u, t) => { if (u <= 0) return; const s = u < 1 ? Math.round(u * 5) : 5 + (Math.sin(t * 8) > 0.6 ? 1 : 0);
  R.disco(x, y, s + 1, K); R.disco(x, y, s, hex('#fff070')); R.disco(x - 1, y - 1, Math.max(1, s - 3), hex('#ffffd0'));
  R.rect(x - 2, y + s, x + 2, y + s + 3, K); R.rect(x - 1, y + s + 1, x + 1, y + s + 2, hex('#a8a8b0'));
  if (u >= 1) for (let k = 0; k < 8; k++) { const a = k * 0.785 + 0.39, r0 = 8, r1 = 10 + (Math.floor(t * 6 + k) % 2) * 2; R.linea(Math.round(x + Math.cos(a) * r0), Math.round(y + Math.sin(a) * r0), Math.round(x + Math.cos(a) * r1), Math.round(y + Math.sin(a) * r1), hex('#ffd040')); } };

// 1 · la mesa: la idea, los platos fuera y el papel dentro
const p1 = (t) => {
  const ap = ease(tramo(t, I(0.5), I(0.86))), o = { encuadre: 'mesa', aparta: ap, dibujo: 0 };
  T.casa(R, t, o);
  const idea = I(0.362), kv = t > I(0.42);
  R.actor(EL.ken, 205, 146, t, { dir: kv ? -1 : 1, dedo: !kv && Math.floor(t * 4) % 2 === 0, sorpresa: t > I(0.42) && t < I(0.52), sonrisa: t > I(0.52), habla: t > I(0.88) && Math.sin(t * 6) > 0.3 });
  const empuja = ap > 0 && ap < 1;
  R.actor(EL.roberta, 77, 146, t, { dir: empuja ? -1 : 1, dedo: t < idea - 0.1 && Math.floor(t * 3) % 2 === 0, habla: t < idea - 0.3 && Math.sin(t * 7) > 0, sorpresa: t > idea && t < I(0.5), sonrisa: t > I(0.5), salto: t > idea && t < idea + 0.35 ? 3 : 0, sostiene: empuja ? [Math.round(lerp(70, 62, ap)), 134] : t > I(0.9) ? [96, 136] : false });
  T.a_casaDelante(R, t, o);
  bombilla(90, 104, tramo(t, idea - 0.05, idea + 0.15), t);
};

// 2 · el monitor de cerca: Roberta dibuja, Ken programa y la casa se traza
const p2 = (t) => {
  const dib = tramo(t, D(0.58), D(1.0));
  T.casa(R, t, { encuadre: 'mesa', camara: 'monitor', dibujo: dib });
  if (dib <= 0) { const n = Math.min(9, Math.floor(tramo(t, P2 + 0.2, D(0.55)) * 9) + 1);
    for (let k = 0; k < n; k++) { const y = 40 + k * 8; R.numero(String((k + 1) * 10), 108, y + 5, { color: hex('#c8d0d8') }); const w = 20 + Math.floor(nz(k, 1, 51) * 60); R.rect(130, y, 130 + (k === n - 1 ? Math.min(w, Math.floor((t * 40) % (w + 1))) : w), y + 1, hex('#e6ecf2')); }
    if (Math.floor(t * 3) % 2) R.rect(130, 40 + n * 8, 134, 41 + n * 8, hex('#e6ecf2')); }
  const tk = t > D(0.56) && t < D(1.04), a = tk ? Math.floor(t * 10) % 2 : 0, b = tk ? Math.floor(t * 10 + 1) % 2 : 0;
  T.brazo(R, 92, 200, 126, 160 + a * 2, '#4a6a9a', 1, { codo: [100, 182] });
  T.brazo(R, 216, 200, 190, 160 + b * 2, '#4a6a9a', -1, { codo: [210, 182] });
  const dr = t > D(0.15) && t < D(0.6), px = 286 + (dr ? Math.round(Math.cos(t * 9) * 6) : 6), py = 146 + (dr ? Math.round(Math.sin(t * 13) * 4) : 8);
  T.brazo(R, 334, 196, px, py, '#9a6a9a', -1, { codo: [322, 172] });
  R.linea(px - 12, py + 2, px - 17, py + 8, K); R.linea(px - 11, py + 2, px - 16, py + 8, hex('#e8c840')); R.pset(px - 17, py + 9, K);
};

// 3 · fondo local: la casa vieja del juego, en líneas blancas sobre negro
const NE = hex('#07080c'), WH = hex('#e6ecf2'), GR = hex('#7a828c');
const casaVieja = capa(() => {
  const { rect, pset, linea, disco } = R, L = (a, b, c, d, col = WH) => linea(a, b, c, d, col);
  R.llenar(NE);
  for (let k = 0; k < 40; k++) pset(Math.floor(nz(k, 1, 9) * 320), 16 + Math.floor(nz(k, 2, 9) * 60), nz(k, 3, 9) < 0.5 ? GR : WH);
  // la luna con sus cráteres
  for (let a = 0; a < 6.28; a += 0.08) pset(Math.round(252 + Math.cos(a) * 9), Math.round(50 + Math.sin(a) * 9), WH);
  for (const [dx, dy] of [[-3, -2], [2, 3], [4, -3], [-2, 4]]) pset(252 + dx, 50 + dy, GR);
  // las colinas y el suelo rayado
  for (let x = 0; x < 320; x++) pset(x, Math.round(132 + Math.sin(x * 0.03) * 2 + Math.sin(x * 0.11) * 1), WH);
  for (let k = 0; k < 220; k++) { const x = Math.floor(nz(k, 4, 9) * 320), y = 136 + Math.floor(nz(k, 5, 9) * 42); if (Math.abs(x - 148) < 14 + (y - 136) * 0.35) continue; L(x, y, x + 2, y - 1, k % 3 ? GR : WH); }
  // la casa: cuerpo con tablas, tejado de tejas, buhardilla, chimenea y torre
  linea(96, 72, 96, 130, WH); linea(196, 72, 196, 130, WH); linea(96, 130, 196, 130, WH);
  for (let y = 76; y < 130; y += 4) for (let x = 98; x < 195; x += 2) pset(x, y, GR);
  linea(88, 73, 146, 38, WH); linea(146, 38, 204, 73, WH); linea(88, 73, 204, 73, WH);
  for (let y = 44; y < 72; y += 4) { const w = (y - 38) / 35 * 58; for (let x = Math.round(146 - w) + 2; x < 146 + w - 1; x += 4) { pset(x, y, GR); pset(x + 1, y + 1, GR); } }
  for (let a = 0; a < 6.28; a += 0.2) pset(Math.round(146 + Math.cos(a) * 5), Math.round(58 + Math.sin(a) * 5), WH); linea(141, 58, 151, 58, WH); linea(146, 53, 146, 63, WH);
  linea(112, 64, 112, 48, WH); linea(120, 59, 120, 48, WH); linea(110, 48, 122, 48, WH); linea(110, 46, 122, 46, WH);
  linea(198, 56, 198, 130, WH); linea(222, 56, 222, 130, WH); linea(194, 57, 210, 26, WH); linea(210, 26, 226, 57, WH); linea(194, 57, 226, 57, WH); linea(210, 26, 210, 19, WH); linea(208, 21, 212, 21, WH);
  for (let y = 62; y < 130; y += 4) for (let x = 200; x < 221; x += 2) pset(x, y, GR);
  // ventanas con cruz y contraventanas
  const ventana = (x0, y0, w, h) => { rect(x0, y0, x0 + w, y0 + h, NE); linea(x0, y0, x0 + w, y0, WH); linea(x0, y0 + h, x0 + w, y0 + h, WH); linea(x0, y0, x0, y0 + h, WH); linea(x0 + w, y0, x0 + w, y0 + h, WH);
    linea(x0 + (w >> 1), y0, x0 + (w >> 1), y0 + h, WH); linea(x0, y0 + (h >> 1), x0 + w, y0 + (h >> 1), WH); for (let y = y0 + 1; y < y0 + h; y += 2) { pset(x0 - 3, y, GR); pset(x0 + w + 3, y, GR); } linea(x0 - 4, y0, x0 - 4, y0 + h, WH); linea(x0 + w + 4, y0, x0 + w + 4, y0 + h, WH); };
  ventana(106, 80, 14, 14); ventana(170, 80, 14, 14); ventana(106, 104, 14, 14); ventana(170, 104, 14, 14); ventana(204, 66, 12, 12); ventana(204, 92, 12, 12);
  // el porche, la puerta (se pinta aparte: se abre) y los escalones
  linea(132, 102, 162, 102, WH); linea(130, 100, 164, 100, WH); linea(134, 102, 134, 130, WH); linea(160, 102, 160, 130, WH);
  for (const y of [131, 134, 137]) linea(138 - (y - 131) / 2, y, 156 + (y - 131) / 2, y, WH);
  // el camino a la puerta
  linea(140, 138, 128, 179, GR); linea(156, 138, 168, 179, GR);
  // la valla de estacas con la cancela abierta
  for (let x = 2; x < 320; x += 7) { if (x > 124 && x < 172) continue; linea(x, 142, x, 158, WH); pset(x - 1, 143, WH); pset(x + 1, 143, WH); pset(x, 141, WH); }
  for (const y of [146, 154]) { linea(0, y, 124, y, WH); linea(172, y, 319, y, WH); }
  linea(124, 142, 112, 160, WH); linea(172, 142, 184, 160, WH);
  // el árbol pelado de la izquierda
  const rama = (x, y, a, l, d) => { const x1 = x + Math.cos(a) * l, y1 = y + Math.sin(a) * l; linea(Math.round(x), Math.round(y), Math.round(x1), Math.round(y1), d > 2 ? WH : GR); if (d > 0) { rama(x1, y1, a - 0.45 - nz(d, x, 11) * 0.3, l * 0.72, d - 1); rama(x1, y1, a + 0.4 + nz(d, y, 12) * 0.3, l * 0.68, d - 1); } };
  linea(38, 136, 42, 92, WH); linea(46, 136, 46, 92, WH); for (let y = 96; y < 134; y += 5) pset(42, y, GR);
  rama(44, 94, -1.57, 22, 5);
});
const p3 = (t) => {
  const { rect, pset, linea, disco } = R;
  casaVieja();
  // las nubes que pasan por delante de la luna (trazo blanco)
  for (let k = 0; k < 3; k++) { const cx = Math.round(((t * (5 + k * 3) + k * 140) % 420) - 60), cy = 34 + k * 12; for (let a = 3.3; a < 6.2; a += 0.12) { for (const [ox, r] of [[-10, 6], [0, 9], [11, 6]]) pset(Math.round(cx + ox + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.7), k === 1 ? WH : GR); } linea(cx - 16, cy, cx + 17, cy, GR); }
  // la ventana encendida (tiembla como una vela)
  { const n = Math.sin(t * 9) > 0.2 ? 0 : 1; for (let y = 81; y < 94; y++) for (let x = 127; x < 140; x++) if (x !== 133 && y !== 87 && ((x + y + n) % 2 === 0 || y % 3 === 0)) pset(x, y, WH); linea(126, 80, 140, 80, WH); linea(126, 94, 140, 94, WH); linea(126, 80, 126, 94, WH); linea(140, 80, 140, 94, WH); }
  // la puerta: cerrada hasta «house», luego se abre hacia dentro
  const abre = tramo(t, Y(0.5), Y(0.56)), dw = Math.round(14 * (1 - abre));
  rect(140, 106, 154, 130, NE); linea(140, 106, 154, 106, WH); linea(140, 106, 140, 130, WH); linea(154, 106, 154, 130, WH);
  if (dw > 1) { linea(140 + (14 - dw), 107, 140 + (14 - dw), 130, WH); for (let y = 110; y < 128; y += 6) linea(142 + (14 - dw), y, 152, y, GR); pset(150, 119, WH); } else for (let y = 107; y < 130; y++) for (let x = 141; x < 154; x++) if ((x + y) % 3 === 0) pset(x, y, GR);
  // el muñequito de trazo sube por el camino hasta la puerta (y entra)
  const m = tramo(t, P3 + 0.4, Y(0.52)); if (t < Y(0.58)) { const y = Math.round(lerp(178, 130, m)), s = lerp(1.4, 0.8, m), x = 148, an = Math.floor(t * 6) % 2;
    disco(x, Math.round(y - 15 * s), Math.round(2.2 * s), WH); pset(x, Math.round(y - 15 * s), NE); linea(x, Math.round(y - 12 * s), x, Math.round(y - 5 * s), WH);
    linea(x, Math.round(y - 10 * s), x - 3, Math.round(y - 7 * s + an), WH); linea(x, Math.round(y - 10 * s), x + 3, Math.round(y - 7 * s - an + 1), WH);
    linea(x, Math.round(y - 5 * s), x - 2 + an, y, WH); linea(x, Math.round(y - 5 * s), x + 2 - an, y, WH); }
  // el gato negro (con su filo blanco) cruza por el larguero de la valla
  const g = tramo(t, Y(0.33), Y(0.62)); if (g > 0 && g < 1) { const cx = Math.round(lerp(330, -24, g)), cy = 141 - (Math.floor(t * 8) % 2), p = Math.floor(t * 8) % 2;
    for (const [dx, dy, r] of [[0, 0, 4], [6, 0, 4], [-5, -3, 3]]) disco(cx + dx, cy + dy, r + 1, WH);
    for (const [dx, dy, r] of [[0, 0, 4], [6, 0, 4], [-5, -3, 3]]) disco(cx + dx, cy + dy, r, NE);
    linea(cx - 8, cy - 6, cx - 7, cy - 9, WH); linea(cx - 4, cy - 6, cx - 3, cy - 9, WH); pset(cx - 7, cy - 4, hex('#f0e070')); pset(cx - 4, cy - 4, hex('#f0e070'));
    linea(cx + 10, cy, cx + 13, cy - 6, WH); linea(cx + 13, cy - 6, cx + 11, cy - 9, WH);
    linea(cx - 2, cy + 3, cx - 3 + p, cy + 6, WH); linea(cx + 7, cy + 3, cx + 8 - p, cy + 6, WH); }
  // el relámpago en «Mystery»
  const rl = t - Y(0.192); if (rl > 0 && rl < 0.32) { const B = R.buf; if (rl < 0.18) for (let y = 14; y < 132; y++) for (let x = 0; x < 320; x++) if (B[y * 320 + x] === NE && ((x + y) & 1) === 0) B[y * 320 + x] = hex('#3a3e48');
    let x = 262, y = 14; for (let k = 0; k < 7; k++) { const nx = x + (k % 2 ? 6 : -9), ny = y + 12; linea(x, y, nx, ny, WH); linea(x + 1, y, nx + 1, ny, WH); x = nx; y = ny; } }
  // el tubo: rayas, esquinas oscuras y la franja de refresco que baja
  { const B = R.buf, fr = Math.floor((t * 50) % 220) - 20; for (let y = 0; y < 180; y++) { const raya = y % 2 === 1, banda = y > fr && y < fr + 5; for (let x = 0; x < 320; x++) { const dx = (x - 160) / 160, dy = (y - 90) / 90, v = dx * dx * dx * dx + dy * dy * dy * dy;
      let c = B[y * 320 + x]; if (raya) c = mez(c, NE, 0.35); if (banda) c = mez(c, hex('#5a6270'), 0.12); if (v > 0.55) c = mez(c, K, Math.min(0.8, (v - 0.55) * 1.6)); B[y * 320 + x] = c; } } }
};

// 4 · fondo local: el corcho con los setenta dibujos
const PICTOS = ['casa', 'puerta', 'escalera', 'ventana', 'llave', 'arbol', 'vela', 'cama', 'reloj', 'cuadro'];
const picto = (k, x, y) => { const L = (a, b, c, d) => R.linea(x + a, y + b, x + c, y + d, K), p = PICTOS[k % PICTOS.length];
  if (p === 'casa') { L(4, 9, 4, 5); L(13, 9, 13, 5); L(3, 5, 8, 1); L(8, 1, 14, 5); L(4, 9, 13, 9); R.pset(x + 7, y + 6, K); }
  else if (p === 'puerta') { L(6, 9, 6, 2); L(11, 9, 11, 2); L(6, 2, 11, 2); R.pset(x + 10, y + 6, K); L(3, 9, 14, 9); }
  else if (p === 'escalera') { L(3, 9, 6, 9); L(6, 9, 6, 7); L(6, 7, 9, 7); L(9, 7, 9, 5); L(9, 5, 12, 5); L(12, 5, 12, 3); L(12, 3, 15, 3); }
  else if (p === 'ventana') { L(5, 2, 12, 2); L(5, 9, 12, 9); L(5, 2, 5, 9); L(12, 2, 12, 9); L(8, 2, 8, 9); L(5, 5, 12, 5); }
  else if (p === 'llave') { R.disco(x + 5, y + 5, 2, K); R.pset(x + 5, y + 5, BL); L(7, 5, 14, 5); L(12, 5, 12, 7); L(14, 5, 14, 7); }
  else if (p === 'arbol') { L(8, 9, 8, 4); L(8, 5, 5, 2); L(8, 5, 12, 2); L(8, 4, 10, 1); L(4, 9, 13, 9); }
  else if (p === 'vela') { L(7, 9, 7, 4); L(10, 9, 10, 4); L(7, 4, 10, 4); R.pset(x + 8, y + 2, K); R.pset(x + 9, y + 1, K); L(5, 9, 12, 9); }
  else if (p === 'cama') { L(3, 7, 14, 7); L(3, 4, 3, 9); L(14, 6, 14, 9); L(4, 6, 6, 6); L(3, 9, 14, 9); }
  else if (p === 'reloj') { L(6, 1, 11, 1); L(6, 9, 11, 9); L(6, 1, 6, 9); L(11, 1, 11, 9); R.pset(x + 8, y + 4, K); L(8, 4, 9, 6); }
  else { L(4, 2, 13, 2); L(4, 9, 13, 9); L(4, 2, 4, 9); L(13, 2, 13, 9); L(5, 8, 8, 5); L(8, 5, 12, 8); } };
const corcho = capa(() => {
  const { rect, pset, linea, disco } = R;
  // la pared de tablas de pino con sus vetas y nudos
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor(x / 18), xx = x % 18, veta = Math.sin(y * 0.12 + tb * 2.1 + Math.sin(y * 0.05 + tb) * 2) > 0.85 && xx > 2 && xx < 15;
    R.buf[y * 320 + x] = xx === 0 ? hex('#6a4420') : xx === 1 ? hex('#d8a868') : veta ? hex('#a87440') : nz(x >> 1, y >> 2, tb) < 0.12 ? hex('#b88450') : hex('#c8945a'); }
  for (let k = 0; k < 6; k++) { const x = 9 + Math.floor(nz(k, 1, 13) * 17) * 18, y = 20 + Math.floor(nz(k, 2, 13) * 110); disco(x, y, 2, hex('#7a4a20')); pset(x, y, hex('#5a3410')); }
  // el rodapié y la moqueta naranja de pelo
  rect(0, 146, 319, 151, K); rect(0, 147, 319, 150, hex('#7a4a24')); rect(0, 147, 319, 147, hex('#a87040'));
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const n = nz(x, y, 14); R.buf[y * 320 + x] = n < 0.18 ? hex('#a84a1a') : n > 0.85 ? hex('#f0904a') : hex('#d06a2a'); }
  // el corcho con su marco
  rect(26, 22, 252, 134, K); rect(27, 23, 251, 133, hex('#8a5a2a')); rect(27, 23, 251, 24, hex('#b07a40')); rect(31, 27, 247, 129, K);
  for (let y = 28; y < 129; y++) for (let x = 32; x < 247; x++) { const n = nz(x, y, 15); R.buf[y * 320 + x] = n < 0.2 ? hex('#a87442') : n > 0.82 ? hex('#e4b478') : hex('#c8965c'); }
  // la pizarrita del contador
  rect(258, 52, 304, 90, K); rect(259, 53, 303, 89, hex('#8a5a2a')); rect(262, 56, 300, 86, hex('#22382a')); for (let k = 0; k < 18; k++) pset(263 + Math.floor(nz(k, 1, 16) * 36), 57 + Math.floor(nz(k, 2, 16) * 28), hex('#3a5040'));
  rect(262, 87, 300, 88, hex('#a8a090')); rect(270, 87, 276, 88, BL);
  // la mesa de trabajo de la derecha con el flexo, el bote de lápices, el papel cuadriculado y la caja de disquetes
  rect(250, 120, 319, 126, K); rect(251, 121, 319, 124, hex('#9a6a3a')); rect(251, 121, 319, 121, hex('#c8945a')); rect(254, 126, 319, 179, K); rect(255, 127, 319, 179, hex('#7a5028'));
  for (const y of [134, 150, 166]) { rect(258, y, 316, y + 12, K); rect(259, y + 1, 315, y + 11, hex('#8a5a30')); rect(282, y + 5, 292, y + 6, hex('#c8c0a8')); }
  rect(256, 112, 286, 120, K); rect(257, 113, 285, 119, hex('#f2f2ea')); for (let x = 259; x < 285; x += 3) linea(x, 113, x, 119, hex('#c8d8f0')); for (let y = 114; y < 120; y += 2) linea(257, y, 285, y, hex('#c8d8f0'));
  rect(290, 108, 298, 120, K); rect(291, 109, 297, 119, hex('#3a6a9a')); for (const [x, c] of [[292, '#e8c840'], [294, '#c83a2a'], [296, '#5aa83a']]) { linea(x, 102, x, 108, K); pset(x, 102, hex(c)); }
  rect(302, 106, 318, 120, K); rect(303, 107, 317, 119, hex('#3a3a48')); for (let k = 0; k < 3; k++) rect(304 + k * 5, 104, 307 + k * 5, 110, k === 1 ? hex('#c83a2a') : hex('#e8e0c8'));
  linea(262, 112, 268, 96, K); linea(268, 96, 280, 92, K); rect(278, 88, 288, 94, K); rect(279, 89, 287, 93, hex('#2a6a4a'));
  // el taburete de Roberta
  rect(50, 142, 76, 146, K); rect(51, 143, 75, 145, hex('#c86a2a')); rect(51, 143, 75, 143, hex('#e88a4a'));
  for (const x of [53, 72]) rect(x, 146, x + 2, 172, K); rect(53, 160, 74, 161, K);
});
const p4 = (t) => {
  const { rect, pset } = R;
  corcho();
  const t0 = P4 + 0.15, dur = Y(0.9) - t0, n = Math.max(0, Math.min(70, Math.floor((t - t0) / dur * 70) + 1));
  // los dibujos aparecen de derecha a izquierda y de arriba abajo; el último (abajo a la izquierda) lo clava Roberta
  for (let k = 0; k < 69; k++) { if (k >= n) break; const row = Math.floor(k / 10), col = 9 - (k % 10), x = 36 + col * 21, y = 30 + row * 14, nuevo = t - (t0 + k / 70 * dur) < 0.1;
    if (nuevo) { rect(x - 2, y - 2, x + 19, y + 12, hex('#fff8c0')); }
    rect(x, y, x + 17, y + 10, K); rect(x, y, x + 17, y + 10, BL); rect(x, y + 10, x + 17, y + 10, hex('#b8b0a0')); picto(k, x, y);
    pset(x + 8, y, [hex('#c83a2a'), hex('#3a6ac8'), hex('#e8c840')][k % 3]); pset(x + 8, y - 1, K); }
  const ult = 36, uy = 30 + 6 * 14, clavado = t > Y(0.88);
  // Roberta, en su taburete, lleva el último dibujo y lo clava
  const r = R.actor(EL.roberta, 56, 143, t, { dir: 1, sostiene: !clavado ? [ult + 4, uy + 6] : false, sonrisa: true, brazos: t > Y(0.94), habla: t > Y(0.95) && Math.sin(t * 6) > 0.4 });
  if (!clavado) { const [hx, hy] = r.mano; rect(hx - 4, hy - 9, hx + 13, hy + 1, K); rect(hx - 4, hy - 9, hx + 13, hy + 1, BL); picto(69, hx - 4, hy - 9); }
  else { rect(ult, uy, ult + 17, uy + 10, BL); rect(ult, uy + 10, ult + 17, uy + 10, hex('#b8b0a0')); picto(69, ult, uy); pset(ult + 8, uy, hex('#c83a2a')); pset(ult + 8, uy - 1, K); }
  // la cifra que sube hasta 70
  R.numero(String(n), 281, 80, { tam: 16, centro: true });
  // Ken llega con un disquete en la mano
  const kv = tramo(t, Y(0.7), Y(0.86)), kx = Math.round(lerp(330, 226, ease(kv)));
  const k = R.actor(EL.ken, kx, 170, t, { dir: -1, anda: kv > 0 && kv < 1, sostiene: true, sonrisa: true });
  { const [hx, hy] = k.mano; rect(hx - 5, hy - 6, hx + 3, hy + 2, K); rect(hx - 4, hy - 5, hx + 2, hy + 1, hex('#2a2e3a')); rect(hx - 3, hy - 5, hx + 1, hy - 3, hex('#e8e4d8')); pset(hx - 1, hy - 1, hex('#6a6a7a')); }
};

const efectos = [[I(0.362), 'interruptor'], [I(0.58), 'toc'], [I(0.86), 'papel'], [D(0.2), 'lapiz'], [D(0.6), 'tecleo'], [Y(0.192), 'trueno'], [Y(0.4), 'miau'], [Y(0.5), 'puerta'], [Y(0.88), 'golpecito'], [Y(0.9), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => t < P3 ? 1979 : 1980 });
''')

E['si-bolsas'] = ('Bolsas con cierre', '''// SI-BOLSAS (frases 14–15), 1980. Tres planos:
// 1. fondo local: una tienda de ordenadores de 1980: el panel perforado con las bolsas colgadas (disquete y hoja dentro),
//    la mesa con el ordenador y la casa en su monitor; en «graphics» el chico se asombra; en «zip-top plastic bags» va al
//    panel, salta, coge una bolsa y se la enseña a su padre; el dependiente cuelga más (corta en «with a floppy»);
// 2. casa salon, cámara 'mesa': manos que meten el disquete («floppy disk») y la hoja («sheet of paper») en la bolsa;
//    en «photocopies» otra mano deja un montón de fotocopias; en «packed by hand» las dos manos cierran la bolsa;
// 3. casa super, cámara 'caja': Roberta entra empujando el carro lleno de cajas de bolsas hasta arriba; en «cart full
//    of bags» la cajera coge una caja, levanta la ceja y sale el «?» (gag 2).''', COMUN + r'''
const Bo = (f) => en('bolsas', f), S = (f) => en('super', f);
const P2 = Bo(0.738), P3 = S(0.461);

// una bolsa con cierre (con el disquete y la hoja dentro) de w × h con la parte de arriba en (x, y)
const bolsa = (x, y, w = 22, h = 28) => { const { rect, pset } = R;
  rect(x, y, x + w, y + h, hex('#8aa0b8')); rect(x + 1, y + 1, x + w - 1, y + h - 1, hex('#d4e2ee'));
  rect(x + 1, y + 1, x + w - 1, y + 1, hex('#c83a2a')); rect(x + 1, y + 2, x + w - 1, y + 2, hex('#3a6ac8'));
  rect(x + w - 11, y + 4, x + w - 2, y + 19, K); rect(x + w - 10, y + 5, x + w - 3, y + 18, BL); for (let j = 0; j < 4; j++) rect(x + w - 9, y + 7 + j * 3, x + w - 5 - (j % 2), y + 7 + j * 3, hex('#8a8a9a'));
  rect(x + 2, y + 8, x + 15, y + 21, K); rect(x + 3, y + 9, x + 14, y + 20, hex('#2a2e3a')); rect(x + 4, y + 9, x + 13, y + 12, hex('#e8e4d8')); R.disco(x + 8, y + 16, 2, hex('#5a5a6a')); pset(x + 8, y + 16, K);
  pset(x + 3, y + h - 3, BL); pset(x + w - 3, y + 5, BL); };
const PEG = { cols: [16, 48, 80, 112, 144], filas: [40, 76, 112] };   // dónde cuelgan las bolsas (arriba)
const cogida = [2, 2];   // la del chico: fila 3, columna 3

// 1 · fondo local: la tienda de ordenadores de 1980
const tienda = capa(() => {
  const { rect, pset, linea, disco } = R;
  // el techo y la pared crema con su friso de rayas setenteras
  rect(0, 0, 319, 15, hex('#e8e2d0')); for (let x = 0; x < 320; x += 24) rect(x, 0, x, 15, hex('#cfc8b4')); rect(0, 15, 319, 15, hex('#b0a890'));
  for (let y = 16; y < 150; y++) for (let x = 0; x < 320; x++) R.buf[y * 320 + x] = (x % 6 === 0) ? hex('#e0d2b0') : nz(x >> 1, y >> 1, 21) < 0.08 ? hex('#e2d6b8') : hex('#ecdfc0');
  rect(0, 18, 319, 19, hex('#d8783a')); rect(0, 20, 319, 21, hex('#e8a830')); rect(0, 22, 319, 23, hex('#8a4a24'));
  // el panel perforado con su marco
  rect(4, 28, 182, 146, K); rect(5, 29, 181, 145, hex('#8a6438'));
  for (let y = 31; y < 144; y++) for (let x = 7; x < 180; x++) R.buf[y * 320 + x] = (x % 5 === 2 && y % 5 === 2) ? hex('#5a3e1e') : nz(x >> 2, y >> 1, 22) < 0.1 ? hex('#a8804c') : hex('#b48c58');
  // los ganchos y lo que cuelga (menos la bolsa que coge el chico): bolsas, casetes y un joystick en su blíster
  PEG.filas.forEach((y, fi) => PEG.cols.forEach((x, ci) => { linea(x + 11, y - 6, x + 11, y - 1, hex('#8a8a92')); pset(x + 11, y - 6, K);
    if (fi === cogida[0] && ci === cogida[1]) return;
    if ((fi * 5 + ci) % 7 === 3) { rect(x + 2, y, x + 20, y + 13, K); rect(x + 3, y + 1, x + 19, y + 12, hex('#3a3a44')); disco(x + 7, y + 6, 2, BL); disco(x + 15, y + 6, 2, BL); rect(x + 5, y + 9, x + 17, y + 11, hex('#c83a2a')); }
    else if ((fi * 5 + ci) % 7 === 5) { rect(x + 1, y, x + 21, y + 26, hex('#b8c8d8')); rect(x + 2, y + 1, x + 20, y + 25, hex('#e8eef4')); rect(x + 6, y + 14, x + 16, y + 22, K); rect(x + 7, y + 15, x + 15, y + 21, hex('#2a2a30')); rect(x + 10, y + 4, x + 12, y + 14, K); disco(x + 11, y + 4, 2, hex('#c83a2a')); }
    else bolsa(x, y); }));
  // la balda de la derecha con cajas de juegos (pictogramas: un cohete, un castillo, una pelota, un coche)
  for (const y of [82, 118]) { rect(250, y, 318, y + 3, K); rect(251, y + 1, 318, y + 2, hex('#a87848')); }
  const cajas = [[254, 56, '#3a6ac8'], [270, 60, '#c83a2a'], [286, 54, '#5aa83a'], [302, 58, '#e8a830'], [254, 92, '#8a4ac8'], [272, 96, '#e8783a'], [290, 90, '#3a8a8a']];
  for (const [x, y, c] of cajas) { const top = y; const bottom = y < 82 ? 81 : 117; rect(x, top, x + 14, bottom, K); rect(x + 1, top + 1, x + 13, bottom, hex(c)); rect(x + 1, top + 1, x + 13, top + 2, BL); rect(x + 4, top + 6, x + 10, top + 14, hex('#f2eee2')); pset(x + 7, top + 8, K); pset(x + 6, top + 11, K); pset(x + 8, top + 11, K); }
  // la mesa de muestra (faldón naranja) con el ordenador, la disquetera y el monitor
  rect(186, 116, 250, 120, K); rect(187, 117, 249, 119, hex('#e8e2d0')); rect(188, 120, 248, 146, K); rect(189, 121, 247, 145, hex('#d8783a')); for (let x = 192; x < 247; x += 6) rect(x, 121, x + 2, 145, hex('#c8682a'));
  rect(192, 104, 236, 116, K); rect(193, 105, 235, 115, hex('#e0d8c0')); for (let k = 0; k < 10; k++) rect(196 + k * 4, 110, 198 + k * 4, 112, hex('#5a5048')); rect(193, 105, 235, 106, hex('#f0ead8'));
  rect(196, 66, 236, 104, K); rect(197, 67, 235, 103, hex('#d8d0b8')); rect(233, 67, 235, 103, hex('#a8a088')); rect(200, 70, 232, 96, K);
  rect(238, 104, 250, 116, K); rect(239, 105, 249, 115, hex('#e0d8c0')); rect(240, 109, 248, 110, K);
  // el suelo de linóleo a cuadros con brillos y el rodapié
  rect(0, 146, 319, 150, K); rect(0, 147, 319, 149, hex('#6a4a2a'));
  for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) { const c = (Math.floor(x / 16) + Math.floor((y - 151) / 8)) % 2, br = ((x + y) & 3) === 0 && Math.abs(x - 250 + (y - 151) * 1.5) < 10;
    R.buf[y * 320 + x] = br ? hex('#fff4dc') : c ? hex('#c8a878') : hex('#e8d8b0'); }
  // el reloj de pared
  disco(214, 40, 8, K); disco(214, 40, 7, hex('#f2eee2')); linea(214, 40, 214, 35, K); linea(214, 40, 218, 41, K);
});
const p1 = (t) => {
  const { rect, pset, linea } = R;
  tienda();
  // el monitor de muestra: la casa del juego en blanco y negro, con su relámpago
  rect(201, 71, 231, 95, hex('#07080c')); { const W = hex('#e6ecf2'); linea(208, 90, 208, 80, W); linea(224, 90, 224, 80, W); linea(206, 80, 216, 74, W); linea(216, 74, 226, 80, W); linea(204, 90, 228, 90, W); rect(214, 84, 217, 89, W); pset(211, 83, Math.sin(t * 9) > 0 ? W : hex('#7a828c')); pset(221, 83, W); for (let x = 201; x < 232; x += 3) pset(x, 93, hex('#7a828c')); if ((t % 2.2) < 0.15) linea(228, 72, 225, 78, W); }
  for (let y = 72; y < 96; y += 2) for (let x = 201; x < 232; x++) if (((x + y) & 3) === 0) pset(x, y, mez(R.pget(x, y), hex('#000000'), 0.3));
  // el tubo del techo que parpadea
  { const on = Math.sin(t * 19) > -0.9 || Math.floor(t * 3) % 4; rect(186, 4, 262, 8, K); rect(187, 5, 261, 7, on ? hex('#f8fbff') : hex('#b8bcc0')); }
  // el dependiente cuelga una bolsa en la primera columna de abajo (sube y baja el brazo)
  const dep = Math.sin(t * 1.6) > 0, de = R.actor(EL.tecnico, 4, 168, t, { dir: 1, sostiene: dep ? [20, 140] : false });
  if (dep) R.rect(de.mano[0] - 2, de.mano[1] - 8, de.mano[0] + 6, de.mano[1] + 2, hex('#8aa0b8')), R.rect(de.mano[0] - 1, de.mano[1] - 7, de.mano[0] + 5, de.mano[1] + 1, hex('#d4e2ee')), R.rect(de.mano[0] - 1, de.mano[1] - 7, de.mano[0] + 5, de.mano[1] - 7, hex('#c83a2a'));
  // el chico mira el monitor; en «graphics» se asombra; en «bags» va al panel, salta y coge la bolsa; se la enseña al padre
  const graf = Bo(0.254), va = tramo(t, Bo(0.39), Bo(0.5)), cx = Math.round(lerp(172, 82, ease(va))), salta = t > Bo(0.5) && t < Bo(0.6);
  const tiene = t > Bo(0.56), vuelve = tramo(t, Bo(0.62), Bo(0.72)), cx2 = Math.round(lerp(cx, 104, ease(vuelve)));
  const px = PEG.cols[cogida[1]], py = PEG.filas[cogida[0]];
  if (!tiene) bolsa(px, py);
  R.actor(EL.padre, 140, 168, t, { dir: t > Bo(0.45) ? -1 : 1, habla: (t > graf && t < graf + 0.8) || (t > Bo(0.68) && Math.sin(t * 6) > 0.2), dedo: t > graf - 0.2 && t < graf + 0.8, sonrisa: t > Bo(0.66) });
  const ch = R.actor(EL.chico, cx2, 168, t, { dir: va > 0 && va < 1 ? -1 : vuelve > 0 ? 1 : (t < Bo(0.39) ? 1 : -1), anda: (va > 0 && va < 1) || (vuelve > 0 && vuelve < 1), sorpresa: t > graf && t < graf + 1, salto: salta ? 5 : 0, sostiene: salta ? [px + 11, py + 30] : tiene ? true : false, sonrisa: t > Bo(0.58) });
  if (tiene) { const [hx, hy] = ch.mano, x = hx - 2, y = hy - 13; R.rect(x, y, x + 11, y + 14, hex('#8aa0b8')); R.rect(x + 1, y + 1, x + 10, y + 13, hex('#d4e2ee')); R.rect(x + 1, y + 1, x + 10, y + 1, hex('#c83a2a'));
    R.rect(x + 2, y + 4, x + 8, y + 10, K); R.rect(x + 3, y + 5, x + 7, y + 9, hex('#2a2e3a')); R.rect(x + 3, y + 5, x + 7, y + 6, hex('#e8e4d8')); R.rect(x + 8, y + 3, x + 9, y + 11, BL); }
  if (t > graf && t < graf + 0.9) R.icono('!', cx + 5, 128, hex('#ffd040'), K, 2);
};

// 2 · la mesa del salón: el disquete, la hoja, las fotocopias y el cierre
const p2 = (t) => {
  const u = t < Bo(0.76) ? 0 : t < Bo(0.86) ? 0.714 * tramo(t, Bo(0.76), Bo(0.86)) : t < Bo(0.93) ? lerp(0.714, 0.857, tramo(t, Bo(0.86), Bo(0.93))) : t < S(0.29) ? 0.857 : lerp(0.857, 1, tramo(t, S(0.29), S(0.355)));
  T.casa(R, t, { encuadre: 'salon', camara: 'mesa', bolsa: u });
  const bx = 124, by = 96;
  // la mano de Roberta (brazo corto, en diagonal) empuja el disquete hasta la bolsa y se retira
  const dq = Math.min(1, u * 1.4), dx = Math.round(lerp(bx + 80, bx + 8, dq)), dy = Math.round(lerp(by + 70, by + 12, dq));
  const sale1 = ease(tramo(t, Bo(0.87), Bo(0.95)));
  if (t > P2 && sale1 < 1) { const hx = dx + 36 + Math.round(sale1 * 70), hy = dy + 22 + Math.round(sale1 * 60); T.brazo(R, hx + 30, hy + 30, hx, hy, '#9a6a9a', -1); }
  // la mano de Ken trae la hoja desde la derecha
  const hq = Math.max(0, Math.min(1, u * 1.4 - 0.2)), hx0 = Math.round(lerp(bx + 100, bx + 44, hq)), hy0 = Math.round(lerp(by + 60, by + 14, hq)), sale2 = ease(tramo(t, Bo(0.95), S(0.02)));
  if (t > Bo(0.8) && sale2 < 1) { const x1 = hx0 + 24 + Math.round(sale2 * 80), y1 = hy0 + 16 + Math.round(sale2 * 10); T.brazo(R, x1 + 36, y1 + 14, x1, y1, '#4a6a9a', -1); }
  // «photocopies»: la mano de Ken entra por la izquierda con un montón nuevo de fotocopias y lo deja sobre el montón
  const fo = ease(tramo(t, S(0.0), S(0.07))), fv = ease(tramo(t, S(0.1), S(0.17)));
  if (fo > 0) { const x = Math.round(lerp(-60, 16, fo)), y = 70; R.rect(x, y, x + 52, y + 30, K); R.rect(x + 1, y + 1, x + 51, y + 29, BL); for (let j = 0; j < 6; j++) R.rect(x + 4, y + 4 + j * 4, x + 22 + ((j * 7) % 22), y + 4 + j * 4, hex('#8a8a9a')); R.rect(x + 1, y + 26, x + 51, y + 29, hex('#d8d8d0'));
    if (fv < 1) { const hx = x - Math.round(fv * 50), hy = y + 14; T.brazo(R, hx - 34, hy + 16, hx, hy, '#4a6a9a', 1); } }
  // «packed by hand»: las dos manos pinzan el cierre y lo recorren del centro a las puntas
  const ci = tramo(t, S(0.26), S(0.36)), fuera = ease(tramo(t, S(0.4), S(0.46)));
  if (ci > 0 && fuera < 1) { const sx = Math.round(lerp(0, 24, ci)), yy = by + 2 + Math.round(fuera * 70);
    T.brazo(R, bx + 4 - sx, yy + 38, bx + 30 - sx, yy, '#9a6a9a', 1); T.brazo(R, bx + 66 + sx, yy + 38, bx + 40 + sx, yy, '#9a6a9a', -1);
    if (ci > 0 && ci < 1) for (const xx of [bx + 30 - sx, bx + 40 + sx]) if (Math.floor(t * 16) % 2) R.pset(xx, by - 2, BL); }
};

// 3 · la caja del súper: el carro hasta arriba y la ceja de la cajera
const p3 = (t) => {
  const o = { encuadre: 'super', camara: 'caja' };
  T.casa(R, t, o);
  const ceja = S(0.84), u = tramo(t, P3 + 0.1, S(0.72)), rx = Math.round(lerp(-74, 50, ease(u)));
  const cj = R.actor(EL.cajera, 215, 150, t, { dir: -1, habla: t < S(0.62) && Math.sin(t * 6) > 0.3, sostiene: t > ceja ? true : false, sorpresa: t > S(0.74) && t < ceja });
  T.a_casaDelante(R, t, o);
  if (t > ceja) { const [hx, hy] = cj.mano; R.rect(hx - 9, hy - 9, hx + 3, hy + 2, K); R.rect(hx - 8, hy - 8, hx + 2, hy + 1, hex('#3a8ac8')); R.rect(hx - 8, hy - 8, hx + 2, hy - 7, BL); R.rect(hx - 6, hy - 5, hx, hy - 1, hex('#d4e2ee')); R.rect(hx - 6, hy - 5, hx, hy - 5, hex('#c83a2a'));
    const [cx, cy] = cj.cabeza; R.linea(cx - 6, cy + 2, cx - 3, cy + 1, K); R.pset(cx - 5, cy + 1, K);
    const s = tramo(t, ceja, ceja + 0.15); if (s > 0) R.icono('?', cx - 6, cy - 16 + Math.round((1 - s) * 4), hex('#ffd040'), K, 2); }
  R.actor(EL.roberta, rx, 166, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: true, habla: t > S(0.9) && Math.sin(t * 6) > 0.3 });
  T.a_carro(R, rx + 6, 166, t, { lleno: 1, anda: u > 0 && u < 1 });
};

const efectos = [[Bo(0.254), 'brillo'], [Bo(0.56), 'papel'], [Bo(0.86), 'toc'], [Bo(0.93), 'papel'], [S(0.07), 'golpecito'], [S(0.355), 'pop'], [S(0.48), 'carro'], [S(0.84), 'pop'], [S(0.95), 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1980 });
''')
