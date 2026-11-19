E = {}

E['lf-hoy'] = ('Hoy', '''// LF-HOY (frases 26–28, acto 8 «Hoy»), cartela «2023». Doce planos; la barra dice 2023 en el tráiler y las visitas,
// 2026 en el calendario y desde el precio, y 2025 en el retraso (los anuncios de mayo y noviembre de 2025):
// 1. el cuarto del fan de noche: entra, enciende el ordenador y salta cuando sale el tráiler (corta en «December»);
// 2. el monitor de cerca: la mano pulsa play; el tráiler (ocaso, mar, palmeras, un descapotable); sale 12.05.2023 y,
//    en «2025», el 2025 de oro (corta en «Then»);
// 3. salon/calendario: la mano con el rotulador tacha 2025 en «slipped», 5/2026 en «May 2026» y rodea el 19 en
//    «November 19th» (corta en «Rockstar»);
// 4. redaccion general: la noticia del retraso; la periodista entra con la hoja y el calendario del bocadillo salta de
//    5 a 11; el periodista asiente en «finish the game» (corta en «with»);
// 5. la caja en su peana bajo el foco: la mano le saca brillo con el paño; el nivel se centra en «level»; destellos en
//    «polish» y «deserve» (corta en «That»);
// 6. salon/mapa cámara 'contador': el contador sube a 90,000,000 en «90 million»; el reloj de 24 h; la corona y el
//    confeti en «record»; la nota musical tachada en «isn't music» (corta en «And»);
// 7. el estante de la tienda: la etiqueta cae con $79.99 en «$79.99»; la mano se lleva la caja en «physical edition»
//    (corta en «even»);
// 8. el recibidor (gag 1): la mano trae la caja sobre el paquete; se abre en «disc»: solo la tarjetita (brilla en
//    «code»); la sacude; el gato asoma de las bolitas con un «?» (corta en «The reviews»);
// 9. el escritorio en picado: las críticas llegan como aviones de papel y se abren en notas; la mano las junta en
//    «average» y cae la medalla del 99 en «99», con /100 (corta en «tied»);
// 10. salon general (gag 8): el átomo empuja el 99 de la tele; en «history» es un 100; en «Take-Two» vuelve a 99 y al
//    átomo le sale un «?» (corta en «but»);
// 11. la oficina de los analistas: la analista señala la gráfica que crece; los compañeros se sorprenden en «topped»
//    (corta en «one»);
// 12. la caja fuerte y el corcho: la cifra $1,500,000,000 sube con las pilas de monedas; la mano pega la nota del «?» en
//    «estimates»; el candado de la caja fuerte tiembla y sigue cerrado en «not official».''', r'''
const H = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const K = hex('#1a1420'), MANGA = '#3a4a8a', FANM = '#c84a3a';
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => B4[((y & 3) << 2) | (x & 3)] / 16;
const grad = (cs, q, x, y) => { const n = cs.length - 1, v = Math.max(0, Math.min(n, q * n)), i = Math.floor(v); return cs[Math.min(n, i + (v - i > bay(x, y) ? 1 : 0))]; };
const hx = (a) => a.map(hex);
const ease = (u) => u * u * (3 - 2 * u);
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const tintar = (x, y, c, a) => { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, a)); };
const fijo = (f) => { let bf = null; return () => { if (!bf) { bf = R.nuevo(); const prev = R.usar(bf); f(); R.usar(prev); } R.copiar(bf); }; };
const caja = (x0, y0, x1, y1, c, borde = K) => { R.rect(x0, y0, x1, y1, borde); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
// madera en tablas horizontales con vetas, juntas, nudos y la luz de una lámpara (tonos de claro a oscuro)
const madera = (x0, y0, x1, y1, tonos, alto = 24, lx = 160, ly = 90) => {
  const c = hx(tonos);
  for (let y = y0; y <= y1; y++) { const tabla = Math.floor((y - y0) / alto), jy = (y - y0) % alto, des = H(tabla, 9) * 300;
    for (let x = x0; x <= x1; x++) {
      if (jy === 0) { R.pset(x, y, c[4]); continue; }
      if (jy === 1) { R.pset(x, y, c[1]); continue; }
      const xx = x + des, vet = Math.sin(xx / 23 + Math.sin(jy / 5 + xx / 61) * 1.4 + jy * 0.9), nudo = Math.hypot((xx % 140) - 70, jy - alto / 2) < 3;
      const luz = 1 - Math.min(1, Math.hypot((x - lx) / 230, (y - ly) / 150)) * 0.55;
      let q = luz * 0.75 + (vet > 0.82 ? -0.18 : vet > 0.55 ? -0.07 : 0) + (H(x >> 2, y, tabla) - 0.5) * 0.06;
      if (nudo) q -= 0.25;
      R.pset(x, y, q > 0.68 ? c[0] : q > 0.55 ? c[1] : q > 0.42 ? c[2] : q > 0.3 ? c[3] : c[4]);
    }
    if (jy === 0) for (let x = x0 + ((tabla * 97) % 120); x <= x1; x += 160) R.rect(x, Math.max(y0, y - alto + 1), x, y - 1, c[4]);
  }
};
// pared de estuco: degradado con trama, motas y una luz (cs de oscuro a claro)
const estuco = (x0, y0, x1, y1, cs, luz) => { const c = hx(cs);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let q = luz(x, y); if (H(x >> 1, y >> 1, 3) > 0.92) q -= 0.07; else if (H(x, y, 4) > 0.97) q += 0.05; R.pset(x, y, grad(c, q, x, y)); } };
// destello de cuatro puntas
const destello = (x, y, s, c = hex('#fffbe0')) => { if (s <= 0) return; const n = Math.round(2 + s * 4); R.linea(x - n, y, x + n, y, c); R.linea(x, y - n, x, y + n, c); R.pset(x - 1, y - 1, c); R.pset(x + 1, y + 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); R.pset(x, y, hex('#ffffff')); };
// el tráiler (sin letras ni marcas): el ocaso de franjas, el mar con su reflejo, dos palmeras y un descapotable que pasa
const SKYT = hx(['#24184e', '#3e2270', '#6a2a80', '#a8387a', '#e05a5a', '#f8904a', '#ffc860']);
const trailer = (x0, y0, x1, y1, t) => {
  const w = x1 - x0, h = y1 - y0, s = w / 210, hor = y0 + Math.round(h * 0.62), arena = y0 + Math.round(h * 0.84);
  const sx = x0 + Math.round(w * 0.66), sy = hor - Math.round(h * 0.06), sr = Math.max(4, Math.round(h * 0.24));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let c;
    if (y < hor) {
      c = grad(SKYT, (y - y0) / (hor - y0) * 0.92 + 0.04 * Math.sin((x + t * 10) / 30), x, y);
      const d = Math.hypot(x - sx, y - sy);
      if (d < sr && !(y > sy - sr * 0.4 && ((y - sy + 64) % (w > 80 ? 4 : 3)) === 0)) c = (y - (sy - sr)) / (2 * sr) < 0.45 ? hex('#ffe890') : hex('#ffb050');
      const nb = Math.sin((x * 0.7 + t * 14 * (y < y0 + h * 0.3 ? 1 : 0.6)) / 13) + Math.sin(x / 7 + y * 0.9);
      if (y > y0 + h * 0.18 && y < y0 + h * 0.24 && nb > 1.3) c = hex('#c86a9a');
      if (y > y0 + h * 0.36 && y < y0 + h * 0.40 && nb > 1.4) c = hex('#f0907a');
    } else if (y < arena) {
      const q = (y - hor) / (arena - hor); c = grad(hx(['#5a2a6a', '#3a2260', '#22204e']), q, x, y);
      const ancho = sr * (1 - q * 0.6);
      if (Math.abs(x - sx) < ancho && ((y + Math.floor(t * 5)) % 3 === 0) && H(x >> 1, y, Math.floor(t * 4)) > 0.35) c = hex('#ffb050');
      else if (((x + y * 7 + Math.floor(t * 8)) % 23) === 0) c = hex('#8a5ab0');
    } else c = grad(hx(['#3a2238', '#4a2a3a', '#2a1828']), (y - arena) / Math.max(1, y1 - arena), x, y);
    R.pset(x, y, c);
  }
  // las palmeras a contraluz, que se mecen
  for (const [px, alto, f] of [[x0 + Math.round(w * 0.14), 0.78, 0], [x0 + Math.round(w * 0.88), 0.62, 1.3]]) {
    const ay = y0 + Math.round(h * (1 - alto)), mece = Math.sin(t * 1.6 + f) * 2 * s;
    for (let j = 0; j <= y1 - ay; j++) { const u = j / (y1 - ay), xx = Math.round(px + (1 - u) * (1 - u) * 6 * s + mece * (1 - u)); R.rect(xx, ay + j, xx + Math.max(1, Math.round(2 * s * (0.6 + u * 0.5))), ay + j, hex('#1a0e24')); }
    const cx = Math.round(px + 6 * s + mece);
    for (let k = 0; k < 7; k++) { const a = -Math.PI + k * Math.PI / 6 + Math.sin(t * 2 + k) * 0.06, L = (12 + (k % 2) * 4) * s;
      for (let i = 0; i <= L; i++) { const xx = Math.round(cx + Math.cos(a) * i), yy = Math.round(ay + Math.sin(a) * i * 0.6 + (i * i) / (L * 1.6)); if (xx >= x0 && xx <= x1 && yy >= y0) { R.pset(xx, yy, hex('#1a0e24')); if (s > 0.5 && yy + 1 <= y1) R.pset(xx, yy + 1, hex('#1a0e24')); } } }
  }
  // el descapotable que cruza por la playa
  const cw = Math.max(7, Math.round(26 * s)), cx = x0 + Math.round(((t * 34 * s) % (w + cw * 2)) - cw), cy = arena + Math.max(1, Math.round(3 * s));
  for (let i = 0; i < cw; i++) { const xx = cx + i; if (xx < x0 || xx > x1) continue; const alto = i < cw * 0.2 || i > cw * 0.8 ? 2 : 3; for (let j = 0; j < Math.max(2, Math.round(alto * s * 1.4)); j++) R.pset(xx, cy - j, i > cw * 0.15 && j === 0 ? hex('#ff5aa8') : hex('#140a1a')); }
  for (const dx of [0.22, 0.78]) { const wx = cx + Math.round(cw * dx); if (wx >= x0 && wx <= x1) { R.pset(wx, cy + 1, hex('#140a1a')); if (s > 0.5) R.disco(wx, cy + 1, Math.round(2 * s), hex('#140a1a')); } }
  // las gaviotas
  for (let k = 0; k < 3; k++) { const bx = x0 + Math.round(((t * 12 + k * 70) % (w + 20)) - 10), by = y0 + Math.round(h * (0.2 + k * 0.08)) + Math.round(Math.sin(t * 3 + k) * 2);
    if (bx > x0 + 2 && bx < x1 - 2) { const al = Math.sin(t * 9 + k) > 0 ? -1 : 0; R.pset(bx - 1, by + al, hex('#2a1838')); R.pset(bx, by, hex('#2a1838')); R.pset(bx + 1, by + al, hex('#2a1838')); } }
};

const c = (f) => en('camino', f), r = (f) => en('trailer', f), n = (f) => en('notas', f);
const P2 = c(0.1754), P3 = c(0.4209), P4 = c(0.6421), P5 = c(0.8347), P6 = r(0), P7 = r(0.5135), P8 = r(0.7925), P9 = n(0), P10 = n(0.2973), P11 = n(0.579), P12 = n(0.771);

// ── 1. el cuarto del fan, la noche del 5 de diciembre de 2023 ──
const fondo1 = fijo(() => {
  estuco(0, 0, 319, 126, ['#221c3e', '#2c2650', '#383062', '#463e74', '#565088'], (x, y) => 0.3 + 0.55 * Math.max(0, 1 - Math.hypot((x - 172) / 120, (y - 100) / 74)));
  R.rect(0, 127, 319, 131, hex('#2a2238')); R.rect(0, 127, 319, 127, hex('#6a5e8a'));
  madera(0, 132, 319, 179, ['#9a6a44', '#84583a', '#6c4630', '#563626', '#3e261a'], 8, 170, 130);
  // la puerta entornada con la luz del pasillo
  caja(0, 36, 26, 131, hex('#5a4a6a')); for (let y = 39; y < 131; y++) for (let x = 2; x < 22; x++) R.pset(x, y, grad(hx(['#c88a40', '#e0a850', '#f0c870']), 0.4 + 0.5 * (y - 39) / 92, x, y));
  R.poligono([[22, 38], [34, 46], [34, 128], [22, 131]], K); R.poligono([[23, 40], [33, 47], [33, 127], [23, 129]], hex('#6a4a3a')); R.rect(30, 86, 31, 88, hex('#e8c060'));
  for (let y = 132; y < 180; y++) for (let x = 0; x < 120; x++) { const a = x < 2 + (y - 132) * 1.4 && x > (y - 132) * 0.2 ? 0.35 * (1 - (y - 132) / 60) : 0; if (a > 0.02 && bay(x, y) < 0.8) tintar(x, y, hex('#f0c070'), a); }
  // las cortinas y la barra (la ventana se pinta en cada fotograma)
  R.rect(30, 27, 110, 28, hex('#8a7a5a')); R.disco(30, 27, 2, hex('#b8a070')); R.disco(110, 27, 2, hex('#b8a070'));
  for (const [a, b] of [[34, 44], [96, 106]]) for (let y = 29; y < 110; y++) for (let x = a; x <= b; x++) { const q = 0.5 + 0.4 * Math.sin((x - a) * 1.1 + (y > 100 ? 0 : 0)) - (y - 29) / 300; R.pset(x, y, grad(hx(['#1e4a52', '#2a6a70', '#3a8a88', '#5aaaa0']), q, x, y)); }
  caja(42, 32, 98, 96, hex('#c8c0d8')); R.rect(40, 96, 100, 99, hex('#d8d0e0')); R.rect(40, 99, 100, 99, K);
  R.rect(52, 90, 58, 95, hex('#c86a3a')); R.rect(53, 84, 57, 89, hex('#4a9a4a')); R.pset(51, 86, hex('#4a9a4a')); R.pset(59, 87, hex('#4a9a4a'));
  caja(44, 104, 100, 131, hex('#a8764a')); for (const dy of [108, 119]) { R.rect(47, dy, 97, dy + 9, K); R.rect(48, dy + 1, 96, dy + 8, hex('#c48e5e')); R.rect(48, dy + 1, 96, dy + 1, hex('#d8a878')); R.rect(70, dy + 4, 74, dy + 5, hex('#e8c060')); }
  R.rect(46, 131, 49, 133, K); R.rect(95, 131, 98, 133, K);
  R.disco(84, 96, 7, K); R.disco(84, 96, 6, hex('#6ac8e8')); R.rect(78, 90, 90, 91, hex('#9ae0f0')); R.rect(78, 102, 90, 103, K);
  // los pósteres: el ocaso con palmeras y el mando
  caja(114, 36, 140, 70, hex('#f0a060')); for (let y = 37; y < 70; y++) for (let x = 115; x < 140; x++) R.pset(x, y, y < 56 ? grad(SKYT, (y - 37) / 19, x, y) : grad(hx(['#5a2a6a', '#2a1e4e']), (y - 56) / 13, x, y));
  R.disco(130, 54, 5, hex('#ffd070')); R.rect(124, 54, 136, 56, hex('#e8604a')); for (let j = 0; j < 24; j++) R.pset(120 + Math.round(j * 0.15), 46 + j, hex('#1a0e24'));
  for (const [dx, dy] of [[-5, 1], [-3, -1], [0, -2], [3, -1], [5, 1]]) R.linea(120, 46, 120 + dx, 46 + dy + 2, hex('#1a0e24'));
  for (const [x, y] of [[113, 35], [139, 35], [113, 69], [139, 69]]) R.rect(x, y, x + 2, y + 1, hex('#e8e0c0'));
  caja(148, 42, 172, 64, hex('#3a6ac8')); R.rect(152, 50, 168, 57, K); R.rect(153, 51, 167, 56, hex('#d8d8e0')); R.disco(155, 56, 2, hex('#d8d8e0')); R.disco(165, 56, 2, hex('#d8d8e0'));
  R.pset(155, 53, K); R.pset(154, 53, K); R.pset(156, 53, K); R.pset(155, 52, K); R.pset(155, 54, K); R.pset(165, 52, hex('#e84a5a')); R.pset(166, 54, hex('#4ab0e8')); R.pset(164, 54, hex('#5ad870'));
  // la balda de encima de la mesa con figuras, libros y un trofeo
  R.rect(184, 58, 252, 61, hex('#6a4630')); R.rect(184, 58, 252, 58, hex('#9a6a44')); R.rect(188, 62, 189, 66, hex('#3a2a20')); R.rect(247, 62, 248, 66, hex('#3a2a20'));
  for (let k = 0; k < 6; k++) { const bx = 188 + k * 4, alto = 12 + (k % 3) * 2; caja(bx, 58 - alto, bx + 3, 57, hx(['#c84a3a', '#3a8ac8', '#e8b030', '#4aa860', '#8a4ac8', '#e87a3a'])[k]); }
  R.rect(216, 48, 222, 49, hex('#e8b030')); R.rect(218, 50, 220, 54, hex('#c89020')); R.rect(216, 55, 222, 57, hex('#8a6a20')); R.rect(215, 44, 223, 48, hex('#f8d050')); R.pset(219, 45, hex('#fff6c0'));
  caja(230, 44, 240, 57, hex('#5ad870')); R.rect(232, 47, 238, 50, hex('#1a3a2a')); R.pset(233, 48, hex('#aaffaa')); R.pset(237, 48, hex('#aaffaa'));
  R.rect(244, 50, 250, 57, hex('#c86a3a')); for (const [dx, dy] of [[-2, -4], [0, -6], [2, -4], [3, -2]]) R.linea(247, 50, 247 + dx, 50 + dy, hex('#4a9a4a'));
  // la mesa, la torre, el flexo y la silla
  R.rect(148, 114, 264, 120, K); R.rect(149, 115, 263, 119, hex('#8a5a3a')); R.rect(149, 115, 263, 115, hex('#b07a50')); R.rect(149, 120, 263, 124, hex('#5a3a24')); R.rect(149, 124, 263, 124, K);
  for (const lx of [150, 258]) caja(lx, 124, lx + 5, 158, hex('#4a3020'));
  caja(156, 126, 178, 158, hex('#24242e')); R.rect(158, 128, 176, 129, hex('#3a3a48')); R.disco(167, 146, 5, hex('#14141a')); R.disco(167, 146, 4, hex('#2a2a36'));
  R.disco(160, 112, 3, K); R.rect(157, 111, 163, 113, hex('#3a3a48')); R.linea(160, 110, 168, 86, K); R.linea(161, 110, 169, 86, hex('#4a4a5a')); R.poligono([[166, 82], [178, 86], [174, 92], [164, 88]], K); R.poligono([[167, 83], [177, 87], [174, 91], [165, 87]], hex('#e8b030'));
  for (let y = 92; y < 115; y++) for (let x = 160; x < 200; x++) { const u = (y - 92) / 22; if (x > 168 - u * 6 && x < 176 + u * 24 && bay(x, y) < 0.6) tintar(x, y, hex('#fff0b0'), 0.18); }
  R.rect(198, 107, 214, 114, K); R.rect(203, 104, 209, 108, hex('#2a2a36')); R.rect(194, 113, 218, 114, hex('#2a2a36'));
  caja(176, 70, 236, 106, hex('#1a1a24')); R.rect(178, 72, 234, 72, hex('#3a3a48'));
  R.rect(184, 112, 228, 114, K); for (let x = 186; x < 227; x += 3) R.pset(x, 113, hex('#6a6a7a')); R.rect(232, 111, 238, 114, K); R.pset(235, 112, hex('#5a5a6a'));
  caja(243, 102, 250, 114, hex('#3ac0e8')); R.rect(244, 106, 249, 108, hex('#e8e840')); R.rect(244, 103, 249, 103, hex('#c8c8d0'));
  // la silla de juego, vacía, de espaldas
  caja(236, 104, 262, 140, hex('#2a2a36')); R.rect(240, 108, 258, 136, hex('#c84a3a')); R.rect(246, 108, 252, 136, hex('#2a2a36')); R.rect(240, 104, 258, 106, hex('#3a3a48'));
  caja(232, 138, 266, 146, hex('#2a2a36')); R.rect(247, 146, 251, 154, K); R.rect(236, 154, 262, 156, K); for (const wx of [236, 249, 262]) R.disco(wx, 158, 2, K);
  // la cama con la colcha de zigzag y la almohada
  caja(300, 92, 319, 160, hex('#6a4630')); R.rect(302, 96, 319, 100, hex('#8a5a3a'));
  caja(266, 118, 319, 136, hex('#e8e4f0')); for (let y = 122; y < 146; y++) for (let x = 266; x < 302; x++) R.pset(x, y, ((x + Math.abs(((y * 2) % 12) - 6)) % 12) < 6 ? hex('#3a6ac8') : hex('#2a4a98'));
  R.rect(266, 121, 302, 121, K); R.rect(266, 146, 302, 146, K); caja(296, 110, 316, 122, hex('#f0ecf8')); R.rect(268, 146, 271, 160, hex('#4a3020'));
  // el suelo: la alfombra, las zapatillas, la ropa, el mando y el balón
  for (let y = 150; y < 176; y++) for (let x = 46; x < 150; x++) { const e = Math.hypot((x - 98) / 52, (y - 163) / 13); if (e < 1) R.pset(x, y, e > 0.88 ? hex('#7a2a3a') : ((Math.floor(e * 6) + (x >> 3)) % 2 ? hex('#c84a5a') : hex('#e8c8a0'))); }
  R.rect(30, 160, 38, 164, K); R.rect(31, 161, 37, 163, hex('#e8e8f0')); R.rect(31, 163, 37, 163, hex('#c84a3a')); R.rect(36, 165, 44, 169, K); R.rect(37, 166, 43, 168, hex('#e8e8f0'));
  R.poligono([[244, 166], [262, 160], [276, 164], [270, 172], [248, 172]], K); R.poligono([[246, 166], [262, 162], [274, 165], [268, 170], [249, 170]], hex('#4a8a5a')); R.linea(252, 166, 266, 165, hex('#3a6a48'));
  R.rect(96, 160, 110, 164, K); R.rect(97, 161, 109, 163, hex('#2a2a36')); R.pset(99, 162, hex('#e84a5a')); R.pset(107, 162, hex('#4ab0e8'));
  R.disco(298, 170, 6, K); R.disco(298, 170, 5, hex('#e8803a')); R.linea(293, 170, 303, 170, hex('#8a3a1a')); R.linea(298, 165, 298, 175, hex('#8a3a1a')); R.pset(296, 168, hex('#f8b070'));
});
const p1 = (t) => {
  fondo1();
  // la ventana: noche con estrellas, luna, edificios con luces y la palmera que se mece
  for (let y = 35; y < 94; y++) for (let x = 45; x < 96; x++) R.pset(x, y, grad(hx(['#0e1030', '#18184a', '#2a2260', '#3e2c70']), (y - 35) / 58, x, y));
  for (let k = 0; k < 14; k++) { const sx = 46 + Math.floor(H(k, 1) * 49), sy = 36 + Math.floor(H(k, 2) * 26); if (Math.sin(t * 2.4 + k * 1.7) > -0.3) R.pset(sx, sy, k % 3 ? hex('#c8c8f0') : hex('#ffffff')); }
  R.disco(84, 44, 5, hex('#f8f0d0')); R.disco(86, 43, 4, hex('#18184a'));
  for (const [bx, bw, bh] of [[45, 10, 18], [56, 8, 26], [65, 12, 14], [78, 9, 22], [88, 8, 16]]) { R.rect(bx, 93 - bh, bx + bw, 93, hex('#14102a'));
    for (let wy = 95 - bh; wy < 92; wy += 3) for (let wx = bx + 2; wx < bx + bw - 1; wx += 3) if (H(wx, wy, Math.floor(t / 3)) > 0.55) R.pset(wx, wy, hex('#f8d070')); }
  { const mece = Math.sin(t * 1.3) * 2; for (let j = 0; j < 40; j++) R.pset(Math.round(66 + (40 - j) * 0.08 + mece * j / 40), 93 - j, hex('#0a0818'));
    for (let k = 0; k < 6; k++) { const a = -Math.PI + 0.3 + k * 0.5 + Math.sin(t * 2 + k) * 0.08; for (let i = 0; i < 11; i++) R.pset(Math.round(68 + mece + Math.cos(a) * i), Math.round(53 + Math.sin(a) * i * 0.6 + i * i / 16), hex('#0a0818')); } }
  { const u = ((t + 1.2) % 3.4) / 3.4, cxp = Math.round(40 + u * 64); if (cxp > 45 && cxp < 96) { R.pset(cxp, 92, hex('#fff6c0')); R.pset(cxp + 1, 92, hex('#fff6c0')); } }
  R.rect(69, 34, 70, 95, hex('#c8c0d8')); R.rect(43, 62, 97, 63, hex('#c8c0d8'));
  { const px = Math.round(84 + Math.sin(t * 1.4) * 3), py = 97 + Math.round(Math.sin(t * 2.1)); R.rect(px - 1, py, px + 1, py + 1, hex('#f8803a')); R.pset(px + (Math.cos(t * 1.4) > 0 ? -2 : 2), py, hex('#f8a050')); }
  // la guirnalda de luces, que titila por turnos
  for (let x = 106; x <= 268; x++) { const y = Math.round(22 + 8 * (1 - ((x - 187) / 81) ** 2)); R.pset(x, y, hex('#2a3a2a'));
    if ((x - 106) % 9 === 4) { const on = Math.sin(t * 3 + x * 0.7) > -0.2, col = hx(['#ff5a6a', '#ffd04a', '#5ae0ff', '#7aff8a'])[((x - 106) / 9 | 0) % 4]; R.rect(x - 1, y + 1, x + 1, y + 3, on ? col : mez(col, K, 0.6)); if (on) { tintar(x - 2, y + 2, col, 0.3); tintar(x + 2, y + 2, col, 0.3); } } }
  // la pantalla: apagada, el círculo que carga y, en «trailer», el tráiler
  const ON = c(0.07), TR = c(0.129);
  if (t < ON) { R.rect(178, 72, 234, 104, hex('#10101a')); R.linea(200, 74, 190, 102, hex('#1c1c2a')); }
  else if (t < TR) { R.rect(178, 72, 234, 104, hex('#141a3a')); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + t * 6; R.pset(Math.round(206 + Math.cos(a) * 7), Math.round(88 + Math.sin(a) * 7), k === 0 ? hex('#ffffff') : mez(hex('#5ae0ff'), hex('#141a3a'), k / 9)); } }
  else trailer(178, 72, 234, 104, t);
  if (t >= ON) for (let y = 62; y < 112; y++) for (let x = 168; x < 246; x++) if ((x < 176 || x > 236 || y < 70) && bay(x, y) < 0.35 * (1 - Math.hypot((x - 206) / 40, (y - 88) / 26))) tintar(x, y, t < TR ? hex('#5a7ae0') : hex('#f07a6a'), 0.25);
  // la torre con su tira de luz que cambia de color
  for (let y = 130; y < 156; y++) R.pset(158, y, hex(['#ff5a6a', '#ffd04a', '#5ae0ff', '#a07aff'][(Math.floor(t * 4 + y / 6)) % 4]));
  R.pset(174, 131, Math.sin(t * 9) > 0 ? hex('#5aff8a') : hex('#1a3a2a'));
  // el gato de la cama: duerme enroscado; en «trailer» levanta la cabeza
  { const alza = tramo(t, TR, TR + 0.3), gx = 276, gy = 118;
    R.disco(gx, gy, 6, K); R.disco(gx, gy, 5, hex('#e8a050')); R.linea(gx - 3, gy - 2, gx + 2, gy + 3, hex('#c87a30')); R.linea(gx - 4, gy + 1, gx, gy + 4, hex('#c87a30'));
    const hy = gy - 2 - Math.round(alza * 5), hxx = gx + 6; R.disco(hxx, hy, 3, K); R.disco(hxx, hy, 2, hex('#e8a050'));
    R.pset(hxx - 2, hy - 3, K); R.pset(hxx + 2, hy - 3, K); R.pset(hxx - 2, hy - 4, hex('#e8a050')); R.pset(hxx + 2, hy - 4, hex('#e8a050'));
    if (alza > 0.5) { R.pset(hxx - 1, hy, hex('#3a8a3a')); R.pset(hxx + 1, hy, hex('#3a8a3a')); } else { R.pset(hxx - 1, hy, K); R.pset(hxx + 1, hy, K); }
    for (let i = 1; i <= 6; i++) R.pset(gx - 6 - i, Math.round(gy + 3 - Math.max(0, i - 2) * (0.4 + (alza > 0 ? 0.8 : 0.3) * Math.sin(t * (alza > 0 ? 6 : 2) + i * 0.5))), hex('#e8a050')); }
  // el fan: entra por la puerta, pulsa el botón de la torre y salta cuando sale el tráiler
  const u = tramo(t, 1.35, 2.6), fx = Math.round(lerp(4, 140, ease(u))), salta = t > TR && t < P2 ? Math.round(Math.abs(Math.sin((t - TR) * 8)) * 4) : 0;
  R.actor(EL.fanLF, fx, 166, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > 2.6 && t < ON + 0.3, sorpresa: t > ON + 0.3 && t < TR, brazos: t > TR, sonrisa: t > TR, salto: salta });
};

// ── 2. el monitor de cerca: play, el tráiler, la fecha y el 2025 de oro ──
const fondo2 = fijo(() => {
  estuco(0, 0, 319, 135, ['#1a1530', '#221c3e', '#2c2650', '#383062'], (x, y) => 0.25 + 0.5 * Math.max(0, 1 - Math.hypot((x - 160) / 200, (y - 80) / 110)));
  madera(0, 136, 319, 179, ['#a87048', '#8e5c3a', '#744a2e', '#5c3a24', '#42281a'], 11, 160, 150);
  // el monitor grande con su marco, la cámara web y el pie
  caja(42, 22, 264, 132, hex('#1c1c26')); R.rect(44, 24, 262, 25, hex('#34343e')); R.rect(44, 126, 262, 130, hex('#24242e')); R.disco(153, 23, 1, hex('#3a5a3a'));
  R.rect(141, 132, 165, 140, K); R.rect(143, 132, 163, 139, hex('#2a2a36')); R.rect(128, 139, 178, 143, K); R.rect(129, 140, 177, 142, hex('#34343e'));
  // las notas pegadas al marco: una palmera y un caimán dibujados
  for (const [nx, ny, col] of [[46, 112, '#f8e070'], [60, 116, '#f8a0c0']]) { R.rect(nx, ny, nx + 12, ny + 12, hex(col)); R.rect(nx, ny, nx + 12, ny + 1, mez(hex(col), K, 0.2)); }
  R.linea(52, 122, 52, 116, hex('#4a8a3a')); R.linea(49, 116, 55, 116, hex('#4a8a3a')); R.linea(62, 124, 70, 124, hex('#3a7a3a')); R.pset(70, 123, hex('#3a7a3a')); R.pset(64, 123, hex('#3a7a3a'));
  // el teclado, la alfombrilla, la lata, los cascos y un bote de lápices
  R.rect(70, 148, 204, 166, K); R.rect(71, 149, 203, 165, hex('#2a2a36')); for (let y = 151; y < 164; y += 4) for (let x = 73; x < 201; x += 6) { R.rect(x, y, x + 4, y + 2, hex('#4a4a5a')); R.rect(x, y + 2, x + 4, y + 2, hex('#1a1a24')); }
  R.rect(118, 159, 152, 161, hex('#5a5a6a'));
  caja(216, 146, 300, 174, hex('#24303a')); for (let x = 218; x < 299; x += 5) R.pset(x, 172, hex('#3a4a5a'));
  caja(14, 124, 30, 160, hex('#3ac0e8')); R.rect(15, 134, 29, 140, hex('#e8e840')); R.rect(15, 125, 29, 127, hex('#c8c8d0')); R.rect(16, 128, 18, 158, hex('#7ae0ff'));
  R.disco(296, 136, 12, K); R.disco(296, 136, 10, hex('#2a2a36')); R.disco(296, 136, 7, hex('#1a1420')); R.rect(282, 130, 287, 144, K); R.rect(305, 130, 310, 144, K); R.rect(283, 131, 286, 143, hex('#c84a3a')); R.rect(306, 131, 309, 143, hex('#c84a3a'));
  caja(36, 118, 50, 146, hex('#7a5a8a')); R.rect(37, 119, 49, 120, hex('#9a7aaa')); for (const [lx, col] of [[38, '#e84a5a'], [42, '#4ab0e8'], [46, '#f8d050']]) { R.rect(lx, 106 + (lx % 5), lx + 1, 118, hex(col)); R.pset(lx, 105 + (lx % 5), K); }
  // la figurita del caimán encima del monitor
  R.rect(226, 16, 244, 21, K); R.rect(227, 17, 243, 20, hex('#4a9a4a')); R.rect(240, 14, 246, 18, K); R.rect(241, 15, 245, 17, hex('#5ab05a')); R.pset(243, 15, hex('#ffffff')); R.rect(229, 21, 230, 22, K); R.rect(239, 21, 240, 22, K);
});
const p2 = (t) => {
  fondo2();
  // las luces desenfocadas de la guirnalda, a los lados
  for (let k = 0; k < 9; k++) { const bx = k < 5 ? 6 + (k * 7) % 30 : 272 + (k * 11) % 40, by = 56 + ((k * 29) % 70), col = hx(['#ff5a6a', '#ffd04a', '#5ae0ff', '#7aff8a'])[k % 4], on = 0.15 + 0.15 * Math.sin(t * 2 + k * 1.3);
    for (let y = by - 4; y <= by + 4; y++) for (let x = bx - 4; x <= bx + 4; x++) if (Math.hypot(x - bx, y - by) < 4.2 && bay(x, y) < 0.7) tintar(x, y, col, on); }
  const X0 = 46, Y0 = 26, X1 = 260, Y1 = 124, PLAY = P2 + 0.45, FECHA = c(0.187), AÑO = c(0.2258), PROM = c(0.3029), V25 = c(0.3528);
  trailer(X0, Y0, X1, Y1, t);
  if (t < PLAY + 0.15) { for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) if (bay(x, y) < 0.55) R.pset(x, y, hex('#0e0a1a'));
    R.disco(153, 76, 15, K); R.disco(153, 76, 14, hex('#f0f0f8')); R.poligono([[147, 68], [147, 84], [161, 76]], hex('#1a1420')); }
  // el fundido a negro en «promised» y el 2025 de oro en «2025»
  const neg = tramo(t, PROM, PROM + 0.5); if (neg > 0) for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) if (bay(x, y) < neg) R.pset(x, y, hex('#0a0814'));
  const v = tramo(t, V25, V25 + 0.35);
  if (v > 0) { for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8 + t * 0.6, L = 30 + 16 * v; for (let i = 26; i < L; i += 2) { const xx = Math.round(153 + Math.cos(a) * i * 1.6), yy = Math.round(76 + Math.sin(a) * i); if (xx > X0 && xx < X1 && yy > Y0 && yy < Y1) R.pset(xx, yy, hex('#c89020')); } }
    R.numero('2025', 153, Math.round(lerp(96, 88, ease(v))), { tam: 32, centro: true }); }
  // la barra de reproducción y la fecha de estreno
  const pr = tramo(t, PLAY, PROM); R.rect(X0 + 6, Y1 - 6, X1 - 6, Y1 - 5, hex('#5a5a6a')); R.rect(X0 + 6, Y1 - 6, X0 + 6 + Math.round((X1 - X0 - 12) * pr), Y1 - 5, hex('#f8c838')); { const kx = X0 + 6 + Math.round((X1 - X0 - 12) * pr); R.rect(kx - 1, Y1 - 8, kx + 1, Y1 - 3, hex('#f8e8a0')); }
  if (t > FECHA && t < PROM + 0.4) { const nn = t < AÑO ? 5 : 10; R.rect(X0 + 4, Y0 + 4, X0 + 90, Y0 + 18, K); R.rect(X0 + 5, Y0 + 5, X0 + 89, Y0 + 17, hex('#24203a'));
    R.numero('12.05.2023', X0 + 9, Y0 + 15, { tam: 8, n: nn * 8 + 2, color: hex('#f8f0d0') }); }
  // el brillo del cristal
  for (let i = 0; i < 18; i++) { R.pset(X1 - 30 + i, Y0 + 2 + i, hex('#ffffff')); }
  // la mano del fan: pulsa el ratón (play) y, con el 2025, lo suelta y celebra
  const cel = tramo(t, V25, V25 + 0.3), clic = t > PLAY - 0.1 && t < PLAY + 0.1 ? 1 : 0;
  const mx = 244 + Math.round(cel * 12), my = 157 + clic - Math.round(cel * (14 + Math.abs(Math.sin((t - V25) * 9)) * 4 * (cel >= 1 ? 1 : 0)));
  R.rect(236, 152, 250, 164, K); R.disco(243, 154, 6, K); R.rect(237, 153, 249, 163, hex('#3a3a48')); R.disco(243, 155, 5, hex('#3a3a48')); R.rect(243, 150, 243, 156, K); R.pset(239, 151, clic ? hex('#e84a5a') : hex('#5a5a6a'));
  T.brazo(R, 318, 214, mx + 8, my, FANM, -1, { codo: [300, 186] });
};

// ── 3. el calendario de cerca: se tachan 2025 y 5/2026 y se rodea el 19 ──
const SL = c(0.433), MAY = c(0.4632), NOV = c(0.56), N19 = c(0.5781);
const calU = (t) => 0.3 * tramo(t, SL, SL + 0.5) + 0.3 * tramo(t, MAY, MAY + 0.8) + 0.4 * tramo(t, NOV + 0.1, N19 + 0.7);
const p3 = (t) => {
  const o = { encuadre: 'calendario', calendario: calU(t) };
  const g = T.salon(R, t, o) || {};
  const [d19x, d19y] = g.dia19 && g.dia19[0] ? g.dia19 : [167, 120];
  // la punta del rotulador sigue a la cruz o al círculo; la mano entra por la izquierda para las notas y por abajo para el 19
  const cruz = (cx, cy, u) => { const a = Math.min(1, u * 2), b = Math.max(0, u * 2 - 1); return u < 0.5 ? [cx - 14 + 28 * a, cy - 8 + 16 * a] : [cx + 14 - 28 * b, cy - 8 + 16 * b]; };
  let tip = null, desde = 'izq';
  if (t < SL) { const e = tramo(t, P3 + 0.05, SL); tip = [lerp(-30, 35, ease(e)), lerp(130, 83, ease(e))]; }
  else if (t < SL + 0.5) tip = cruz(49, 91, tramo(t, SL, SL + 0.5));
  else if (t < MAY) { const e = tramo(t, SL + 0.5, MAY); tip = [lerp(35, 35, e), lerp(99, 119, e)]; }
  else if (t < MAY + 0.8) tip = cruz(49, 127, tramo(t, MAY, MAY + 0.8));
  else if (t < NOV - 0.3) { const e = tramo(t, MAY + 0.8, NOV - 0.3); tip = [lerp(63, -40, ease(e)), lerp(135, 150, ease(e))]; }
  else { desde = 'abajo'; const e = tramo(t, NOV - 0.3, NOV + 0.1), cu = tramo(t, NOV + 0.1, N19 + 0.7), sal = tramo(t, N19 + 1.0, P4 - 0.1);
    if (cu <= 0) tip = [lerp(200, d19x - 10, ease(e)), lerp(210, d19y, ease(e))];
    else { const a = Math.PI + cu * Math.PI * 2.1; tip = [d19x + Math.cos(a) * 10, d19y + Math.sin(a) * 8]; }
    if (sal > 0) tip = [lerp(tip[0], 220, ease(sal)), lerp(tip[1], 230, ease(sal))]; }
  if (tip) { const [px, py] = tip.map(Math.round);
    const wx = px - 12, wy = py + 9;
    if (desde === 'izq') T.brazo(R, wx - 46, wy + 34, wx, wy, MANGA, 1, { codo: [wx - 24, wy + 24] });
    else T.brazo(R, wx + 30, wy + 62, wx, wy, MANGA, 1, { codo: [wx + 22, wy + 34] });
    // el rotulador rojo en el puño, con la punta en el papel
    R.linea(wx + 4, wy - 1, px, py, K); R.linea(wx + 5, wy - 1, px + 1, py, K); R.linea(wx + 4, wy - 2, px - 1, py - 1, hex('#e8303e')); R.linea(wx + 5, wy - 2, px, py - 1, hex('#c82030')); R.pset(px, py, hex('#1a1420'));
    T.mano(R, wx, wy, 1, MANGA, { sinManga: true }); }
};

// ── 4. la redacción: la noticia del retraso ──
const p4 = (t) => {
  const o = { encuadre: 'redaccion', papeles: 0.25 + 0.1 * tramo(t, P4, P5), imprime: 1 };
  const g = T.redaccion(R, t, o) || {};
  // la tele de la pared: el calendario con el 19 rodeado y el reloj de arena
  const [tx0, ty0, tx1, ty1] = g.tele || [140, 84, 180, 100], tv = tramo(t, P4 + 0.1, P4 + 0.4);
  if (tv > 0) { R.recorte([tx0 + 1, ty0 + 1, tx1 - 1, ty1 - 1]); for (let y = ty0 + 1; y < ty1; y++) for (let x = tx0 + 1; x < tx1; x++) R.pset(x, y, grad(hx(['#1a2a5a', '#2a3a7a']), (y - ty0) / 16, x, y));
    R.recorte(null); R.rect(tx0 + 4, ty0 + 3, tx0 + 18, ty1 - 3, hex('#f8f4e8')); R.rect(tx0 + 4, ty0 + 3, tx0 + 18, ty0 + 5, hex('#e84a5a'));
    R.numero('19', tx0 + 11, ty1 - 4, { tam: 8, centro: true, color: K, sombra: false }); if (Math.sin(t * 6) > -0.4) for (let a = 0; a < 6.3; a += 0.3) R.pset(Math.round(tx0 + 11 + Math.cos(a) * 7), Math.round(ty0 + 10 + Math.sin(a) * 5), hex('#e84a5a'));
    const ax = tx1 - 12, ay = ty0 + 3, gira = Math.floor((t - P4) * 1.2) % 2; R.rect(ax, ay, ax + 6, ay, hex('#e8c060')); R.rect(ax, ay + 10, ax + 6, ay + 10, hex('#e8c060'));
    R.poligono(gira ? [[ax + 1, ay + 9], [ax + 5, ay + 9], [ax + 3, ay + 5]] : [[ax + 1, ay + 1], [ax + 5, ay + 1], [ax + 3, ay + 5]], hex('#f8e0a0')); R.pset(ax + 3, ay + 6, hex('#f8e0a0')); }
  // el periodista en su mesa: lee la pantalla y, en «finish the game», asiente y señala
  const [trx, , trY] = g.tras || [132, 160, 156], FIN = c(0.7888), EXT = c(0.7182);
  R.actor(EL.periodistaLF, trx + 6, trY, t, { dir: 1, habla: t > FIN && t < FIN + 0.8 && Math.sin(t * 8) > 0, sorpresa: t > EXT && t < EXT + 0.6, sonrisa: t > FIN, dedo: t > FIN + 0.2 && t < P5 - 0.2 });
  T.redaccionDelante(R, t, o);
  // la periodista entra con la hoja de la noticia y se la enseña; su bocadillo: el calendario que salta de 5 a 11
  const ENT = c(0.6628), w = tramo(t, P4 + 0.05, ENT), px = Math.round(lerp(326, 206, ease(w)));
  const yo = R.actor(EL.periodista2LF, px, 166, t, { dir: -1, anda: w > 0 && w < 1, sostiene: true, habla: w >= 1 && t < FIN && Math.sin(t * 7) > 0.2, sonrisa: t > FIN }) || {};
  if (yo.mano) { const [hx0, hy0] = yo.mano; R.rect(hx0 - 9, hy0 - 12, hx0 - 1, hy0, K); R.rect(hx0 - 8, hy0 - 11, hx0 - 2, hy0 - 1, hex('#f8f4e8')); R.rect(hx0 - 7, hy0 - 10, hx0 - 3, hy0 - 9, hex('#3a3a48')); for (let y = hy0 - 7; y < hy0 - 1; y += 2) R.rect(hx0 - 7, y, hx0 - 3, y, hex('#8a8a9a')); }
  const bs = tramo(t, EXT - 0.3, EXT), cambia = tramo(t, EXT + 0.1, c(0.7374) + 0.3);
  if (bs > 0 && t < P5 - 0.15) { const bx = px + 8, by = 128, ww = Math.round(34 * bs), hh = Math.round(26 * bs), x0 = bx - (ww >> 1), y0 = by - hh;
    R.rect(x0 - 1, y0, x0 + ww + 1, y0 + hh, K); R.rect(x0, y0 - 1, x0 + ww, y0 + hh + 1, K); R.rect(x0, y0, x0 + ww, y0 + hh, hex('#fbf6ea')); R.poligono([[bx - 2, y0 + hh], [bx + 3, y0 + hh], [bx + 1, y0 + hh + 5]], K); R.pset(bx + 1, y0 + hh + 1, hex('#fbf6ea'));
    if (bs > 0.8) { R.rect(x0 + 4, y0 + 4, x0 + 20, y0 + 22, K); R.rect(x0 + 5, y0 + 5, x0 + 19, y0 + 21, hex('#ffffff')); R.rect(x0 + 5, y0 + 5, x0 + 19, y0 + 8, hex('#e84a5a'));
      const hoja = cambia > 0 && cambia < 1; R.numero(cambia >= 0.5 ? '11' : '5', x0 + 12, y0 + 19, { tam: 8, centro: true, color: K, sombra: false });
      if (hoja) { const hy = Math.round(y0 + 5 - cambia * 10); R.rect(x0 + 5, hy, x0 + 19, hy + 3, hex('#f0ece0')); }
      R.poligono([[x0 + 23, y0 + 9], [x0 + 23, y0 + 17], [x0 + 30, y0 + 13]], hex('#4ad870')); R.pset(x0 + 22, y0 + 13, hex('#4ad870')); } }
};

// ── 5. la caja en su peana: la mano le saca brillo ──
const fondo5 = fijo(() => {
  // el telón de terciopelo con sus pliegues y la luz del foco
  for (let y = 0; y < 168; y++) for (let x = 0; x < 320; x++) { const pl = 0.5 + 0.38 * Math.sin(x / 7 + Math.sin(x / 31) * 2), luz = Math.max(0, 1 - Math.hypot((x - 252) / 120, (y - 84) / 100));
    R.pset(x, y, grad(hx(['#180a24', '#26103a', '#381a50', '#4e2468', '#6a3480', '#8a4a98']), pl * 0.45 + luz * 0.55 - y / 900, x, y)); }
  for (let x = 0; x < 320; x++) { const y0 = 0; R.pset(x, y0, hex('#c8a040')); if ((x % 14) < 7) R.rect(x, 1, x, 3 + ((x % 14) > 3 ? 1 : 0), hex('#a8802a')); }
  // la tarima
  madera(0, 168, 319, 179, ['#6a4630', '#5a3a26', '#4a2e1e', '#3a2418', '#2a1810'], 6, 252, 168);
  // la peana redonda de mármol
  for (let y = 128; y < 172; y++) for (let x = 200; x < 312; x++) { const u = (x - 200) / 112, q = 0.25 + 0.7 * Math.sin(u * Math.PI) * (1 - (y - 128) / 90) + (Math.sin(x / 5 + y / 9 + Math.sin(y / 4)) > 0.92 ? -0.25 : 0); R.pset(x, y, grad(hx(['#6a6478', '#8a8498', '#aaa6b8', '#cac6d6', '#e8e6f0']), q, x, y)); }
  for (let y = 120; y < 136; y++) for (let x = 196; x < 316; x++) { const e = Math.hypot((x - 256) / 60, (y - 128) / 8); if (e < 1) R.pset(x, y, e > 0.86 ? K : grad(hx(['#5a1a2a', '#7a2438', '#9a3048', '#b84058']), 0.8 - e * 0.6 + (x - 256) / 300, x, y)); }
  R.rect(200, 166, 312, 171, hex('#4a4458')); R.rect(198, 171, 314, 172, K);
  // los postes de latón con el cordón de terciopelo, como en un museo
  for (const px of [124, 184]) { R.rect(px - 1, 128, px + 2, 170, K); R.rect(px, 129, px + 1, 169, hex('#d8b040')); R.pset(px, 130, hex('#fff0a0')); R.disco(px + 1, 127, 3, K); R.disco(px + 1, 127, 2, hex('#e8c050')); R.rect(px - 5, 170, px + 6, 172, K); R.rect(px - 4, 170, px + 5, 171, hex('#c8a040')); }
  for (let x = 126; x < 184; x++) { const y = Math.round(130 + 10 * Math.sin((x - 126) / 58 * Math.PI)); R.rect(x, y, x, y + 2, K); R.rect(x, y, x, y + 1, hex('#b82838')); }
  for (let x = 106; x < 124; x++) { const y = Math.round(130 + 8 * Math.sin((x - 106) / 36 * Math.PI)); R.rect(x, y, x, y + 2, K); R.rect(x, y, x, y + 1, hex('#b82838')); }
  // la mesita de la izquierda: el espray, la lata de cera, el cepillo y un cesto de paños
  R.rect(14, 118, 106, 122, K); R.rect(15, 119, 105, 121, hex('#8a5a3a')); for (const lx of [18, 100]) caja(lx, 122, lx + 4, 168, hex('#5a3a24'));
  caja(24, 84, 36, 118, hex('#5ab0d8')); R.rect(25, 96, 35, 106, hex('#f0f0f0')); R.rect(27, 98, 33, 104, hex('#5ab0d8')); R.rect(27, 76, 33, 84, K); R.rect(28, 77, 32, 83, hex('#e8e8f0')); R.rect(33, 78, 38, 80, K);
  caja(44, 106, 64, 118, hex('#c8a040')); R.rect(45, 106, 63, 108, hex('#e8c860')); R.rect(48, 110, 60, 114, hex('#8a6a20'));
  R.rect(70, 112, 92, 117, K); R.rect(71, 113, 91, 116, hex('#8a5a3a')); for (let x = 72; x < 91; x += 2) R.rect(x, 108, x, 112, hex('#e8d8a0'));
  for (let y = 140; y < 168; y++) for (let x = 30; x < 92; x++) { const e = Math.hypot((x - 61) / 31, (y - 156) / 14); if (e < 1 && y > 144) R.pset(x, y, ((x + y) % 4 < 2) ? hex('#a8763a') : hex('#8a5a2a')); }
  for (const [cx, col] of [[44, '#f8d050'], [60, '#5ab0d8'], [76, '#f07aa8']]) { R.disco(cx, 144, 6, K); R.disco(cx, 144, 5, hex(col)); }
});
const p5 = (t) => {
  fondo5();
  // el haz del foco con motas de polvo
  for (let y = 34; y < 128; y++) { const a = 244 - (y - 34) * 0.3, b = 260 + (y - 34) * 0.3; for (let x = Math.round(a); x < b; x++) if (bay(x, y) < 0.18) tintar(x, y, hex('#f8e8c0'), 0.18); }
  for (let k = 0; k < 14; k++) { const mx = 226 + ((H(k, 1) * 56 + Math.sin(t * 0.5 + k) * 6) | 0), my = 128 - (((H(k, 2) * 120 + t * (3 + k % 3)) % 120) | 0); R.pset(mx, my, hex('#fff6d8')); }
  for (const [fx, ang] of [[196, -1], [252, 0]]) { R.rect(fx, 0, fx, 22, hex('#2a2a36')); R.rect(fx - 5, 22, fx + 5, 32, K); R.rect(fx - 4, 23, fx + 4, 31, hex('#3a3a48')); R.rect(fx - 4, 23, fx - 3, 31, hex('#5a5a6c'));
    R.rect(fx - 6 + ang * 2, 32, fx + 6 + ang * 2, 34, K); R.rect(fx - 5 + ang * 2, 33, fx + 5 + ang * 2, 33, Math.sin(t * 13 + fx) > -0.9 ? hex('#fff6c0') : hex('#e8d090')); }
  const LEV = c(0.8498), POL = c(0.8674), DES = c(0.9667);
  const g = T.a_caja(R, 232, 62, t, { s: 3 }) || {};
  // el nivel de burbuja sobre la peana: la burbuja se centra en «level»
  { const bu = ease(tramo(t, LEV - 0.2, LEV + 0.4)), lx = 204, ly = 120; caja(lx, ly, lx + 24, ly + 6, hex('#f0c030')); R.rect(lx + 6, ly + 2, lx + 18, ly + 4, hex('#9ae8c0')); R.rect(lx + 11, ly + 1, lx + 11, ly + 5, K); R.rect(lx + 13, ly + 1, lx + 13, ly + 5, K);
    const bx = Math.round(lerp(lx + 7, lx + 12, bu)); R.rect(bx, ly + 2, bx + 1, ly + 3, hex('#ffffff')); if (bu >= 1 && t < LEV + 1) destello(lx + 12, ly - 3, 0.5); }
  // los destellos: en «polish» las esquinas; en «deserve» una franja de brillo cruza la caja
  const [x0, y0, x1, y1] = g.caja || [232, 62, 279, 127];
  const d1 = tramo(t, POL, POL + 0.3) * (1 - tramo(t, POL + 0.9, POL + 1.3)); destello(x0 + 6, y0 + 8, d1); destello(x1 - 10, y1 - 14, d1 * 0.8);
  const fr = tramo(t, DES - 0.1, DES + 0.5); if (fr > 0 && fr < 1) { const k0 = Math.round(lerp(-40, 120, fr)); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = (x - x0) + (y - y0) * 0.6 - k0; if (d > 0 && d < 8) tintar(x, y, hex('#ffffff'), 0.5); } }
  if (t > DES) { destello(x0 + 30, y0 + 20, tramo(t, DES, DES + 0.3)); destello(x1 + 4, y0 + 40, tramo(t, DES + 0.2, DES + 0.5) * 0.7); }
  // la mano con el paño amarillo, que frota en círculos
  const en5 = tramo(t, P5, P5 + 0.6) * (1 - tramo(t, P6 - 0.3, P6 + 0.2)), w = t * 7;
  const wx = Math.round(lerp(340, 284 + Math.cos(w) * 5, ease(en5))), wy = Math.round(lerp(150, 96 + Math.sin(w) * 9, ease(en5)));
  if (en5 > 0) { R.poligono([[wx - 14, wy - 7], [wx - 2, wy - 9], [wx + 2, wy + 6], [wx - 6, wy + 10], [wx - 16, wy + 5]], K); R.poligono([[wx - 13, wy - 6], [wx - 3, wy - 8], [wx + 1, wy + 5], [wx - 6, wy + 9], [wx - 15, wy + 4]], hex('#f8d050'));
    R.linea(wx - 12, wy + 2, wx - 4, wy + 6, hex('#d8a830')); R.linea(wx - 10, wy - 4, wx - 2, wy - 2, hex('#fff0a0'));
    T.brazo(R, 352, 176, wx, wy, MANGA, -1, { codo: [326, Math.round(wy + 26)] }); }
};

// ── 6. el contador de visitas: 90,000,000 en 24 horas ──
const N90 = r(0.1054), VIEWS = r(0.1944), H24 = r(0.2434), REC = r(0.3532), MUS = r(0.4363);
const p6 = (t) => {
  const o = { encuadre: 'mapa', camara: 'contador', reservas: 0.5, visitas: 90 * ease(tramo(t, N90 - 0.3, VIEWS)) };
  const g = T.salon(R, t, o) || {};
  // el reloj de mesa: la aguja da vueltas deprisa y sale el 24
  const cx = 20, cy = 150, gira = tramo(t, P6 + 0.2, H24 + 0.3);
  R.disco(cx, cy, 13, K); R.disco(cx, cy, 12, hex('#e8c060')); R.disco(cx, cy, 10, hex('#fbf6ea'));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.pset(Math.round(cx + Math.cos(a) * 8), Math.round(cy + Math.sin(a) * 8), K); }
  const a = -Math.PI / 2 + gira * Math.PI * 4; R.linea(cx, cy, Math.round(cx + Math.cos(a) * 7), Math.round(cy + Math.sin(a) * 7), hex('#e84a5a')); R.linea(cx, cy, Math.round(cx + Math.cos(a / 12) * 5), Math.round(cy + Math.sin(a / 12) * 5), K); R.pset(cx, cy, K);
  R.rect(cx - 9, cy + 12, cx - 7, cy + 15, K); R.rect(cx + 7, cy + 12, cx + 9, cy + 15, K); R.disco(cx - 8, cy - 13, 3, K); R.disco(cx + 8, cy - 13, 3, K); R.disco(cx - 8, cy - 13, 2, hex('#e8c060')); R.disco(cx + 8, cy - 13, 2, hex('#e8c060'));
  const v24 = tramo(t, H24, H24 + 0.25); if (v24 > 0) { R.rect(cx + 14, cy - 18, cx + 36, cy - 6, K); R.rect(cx + 15, cy - 17, cx + 35, cy - 7, hex('#24203a')); R.numero('24', cx + 25, cy - 8, { tam: 8, centro: true, color: hex('#f8e070') }); }
  // el confeti dorado del récord, dentro de la pantalla
  const [sx0, sy0, sx1, sy1] = g.pantalla || [40, 30, 264, 134];
  if (t > REC) { for (let k = 0; k < 26; k++) { const fx = sx0 + 6 + Math.floor(H(k, 3) * (sx1 - sx0 - 12)), fy = sy0 + Math.floor(((t - REC) * (30 + H(k, 4) * 30) + H(k, 5) * 20) % (sy1 - sy0 - 4)) + 2;
    if (fx > sx0 && fx < sx1 && fy > sy0 && fy < sy1) { R.pset(fx, fy, hx(['#f8d050', '#ff7a8a', '#5ae0ff', '#ffffff'])[k % 4]); if (Math.sin(t * 9 + k) > 0) R.pset(fx + 1, fy, hx(['#f8d050', '#ff7a8a', '#5ae0ff', '#ffffff'])[k % 4]); } } }
  // la nota musical tachada sobre la miniatura: «no es un vídeo de música»
  const [mx0, my0, mx1, my1] = g.miniatura || [46, 38, 114, 74], nm = tramo(t, MUS - 0.4, MUS - 0.2);
  if (nm > 0) { const nx = mx1 - 16, ny = my1 - 18; R.disco(nx + 6, ny + 8, 9, K); R.disco(nx + 6, ny + 8, 8, hex('#fbf6ea'));
    R.disco(nx + 3, ny + 12, 2, K); R.rect(nx + 5, ny + 2, nx + 5, ny + 12, K); R.rect(nx + 5, ny + 2, nx + 9, ny + 3, K); R.disco(nx + 8, ny + 10, 2, K); R.rect(nx + 10, ny + 3, nx + 10, ny + 10, K);
    const x2 = tramo(t, MUS, MUS + 0.25); if (x2 > 0) for (let w2 = 0; w2 < 2; w2++) { R.linea(nx - 1 + w2, ny, Math.round(nx - 1 + w2 + 14 * x2), Math.round(ny + 16 * x2), hex('#e8303e')); if (x2 >= 1) R.linea(nx + 13 + w2, ny, nx - 1 + w2, ny + 16, hex('#e8303e')); } }
  // la mano de Atom: mueve el ratón y hace clic para actualizar, y en el récord da un golpecito de alegría en la mesa
  const hm = tramo(t, P6, P6 + 0.5) * (1 - tramo(t, P7 - 0.5, P7)), toc = t > REC && t < REC + 0.6 ? Math.round(Math.abs(Math.sin((t - REC) * 16)) * 3) : 0;
  if (hm > 0) T.brazo(R, 300, 214, Math.round(lerp(300, 238, ease(hm))) + Math.round(Math.sin(t * 1.3) * 2), Math.round(lerp(214, 166, ease(hm))) - toc, MANGA, -1, { codo: [292, 190] });
};

// ── 7. el estante de la tienda: $79.99 y la mano se lleva la caja ──
const fondo7 = fijo(() => {
  estuco(0, 0, 319, 30, ['#c8c0b0', '#d8d0c0', '#e4dccc'], (x, y) => 0.6 + y / 100);
  for (let x = 0; x < 320; x += 64) { R.rect(x + 8, 4, x + 48, 6, hex('#fffbe8')); R.rect(x + 8, 7, x + 48, 7, hex('#b8b0a0')); }
  // el panel perforado del fondo del estante
  for (let y = 31; y < 180; y++) for (let x = 0; x < 320; x++) { const q = 0.5 + 0.35 * (1 - y / 180) - Math.abs(x - 160) / 900; R.pset(x, y, ((x % 7 === 3) && (y % 7 === 3)) ? hex('#4a3e30') : grad(hx(['#8a7458', '#a08a6a', '#b8a280', '#c8b490']), q, x, y)); }
  // las baldas
  for (const by of [64, 118, 172]) { R.rect(0, by, 319, by + 5, K); R.rect(0, by + 1, 319, by + 3, hex('#e8e4dc')); R.rect(0, by + 1, 319, by + 1, hex('#ffffff')); R.rect(0, by + 4, 319, by + 4, hex('#9a968e')); for (let k = 0; k < 320; k += 80) { R.rect(k + 2, by + 6, k + 4, by + 10, hex('#5a5a62')); } }
  // arriba, los lomos de colores (sin letras) y algún juego de frente
  const cols = hx(['#c84a3a', '#3a6ac8', '#e8b030', '#4aa860', '#8a4ac8', '#e87a3a', '#2a2a36', '#d84a8a', '#3ab0b0', '#f0e8d8']);
  for (let x = 6; x < 300; ) { const ww = 5 + Math.floor(H(x, 1) * 3), al = 26 + Math.floor(H(x, 2) * 4), col = cols[Math.floor(H(x, 3) * 10)];
    caja(x, 64 - al, x + ww, 63, col); R.rect(x + 1, 64 - al + 3, x + ww - 1, 64 - al + 4, mez(col, hex('#ffffff'), 0.4)); R.rect(x + 1, 58, x + ww - 1, 59, mez(col, K, 0.3)); x += ww + 1 + (H(x, 4) > 0.85 ? 4 : 0); }
  // en medio, juegos de frente con portadas de dibujos (un coche, un balón, un cohete, una montaña)
  const frente = (x, y, fondo, dib) => { caja(x, y, x + 31, y + 43, hex('#1a2a5a')); R.rect(x + 1, y + 1, x + 4, y + 42, hex('#2a3a7a')); for (let yy = y + 5; yy < y + 34; yy++) for (let xx = x + 5; xx < x + 31; xx++) R.pset(xx, yy, grad(hx(fondo), (yy - y - 5) / 29, xx, yy)); R.rect(x + 5, y + 2, x + 30, y + 4, hex('#e8e8f0')); R.rect(x + 5, y + 35, x + 30, y + 42, hex('#e8e8f0')); R.rect(x + 7, y + 37, x + 12, y + 40, hex('#ffffff')); for (let xx = x + 15; xx < x + 29; xx += 2) R.rect(xx, y + 37, xx, y + 40, hex('#8a8a9a')); dib(x + 5, y + 5); };
  frente(8, 74, ['#5ac8f0', '#a8e0f0', '#f0e0a0'], (x, y) => { R.rect(x + 3, y + 18, x + 22, y + 22, hex('#e84a3a')); R.rect(x + 7, y + 14, x + 17, y + 18, hex('#e84a3a')); R.disco(x + 7, y + 23, 3, K); R.disco(x + 18, y + 23, 3, K); R.rect(x, y + 26, x + 25, y + 28, hex('#5a5a62')); });
  frente(46, 74, ['#4aa860', '#5ac870', '#8ae090'], (x, y) => { R.disco(x + 13, y + 14, 8, K); R.disco(x + 13, y + 14, 7, hex('#ffffff')); R.poligono([[x + 11, y + 11], [x + 15, y + 11], [x + 16, y + 15], [x + 13, y + 17], [x + 10, y + 15]], K); R.rect(x, y + 25, x + 25, y + 28, hex('#ffffff')); });
  frente(84, 74, ['#0e1030', '#2a2260', '#5a3a90'], (x, y) => { for (let k = 0; k < 9; k++) R.pset(x + Math.floor(H(k, 7) * 25), y + Math.floor(H(k, 8) * 28), hex('#ffffff')); R.poligono([[x + 13, y + 3], [x + 18, y + 16], [x + 8, y + 16]], hex('#e8e8f0')); R.rect(x + 9, y + 16, x + 17, y + 22, hex('#e8e8f0')); R.poligono([[x + 10, y + 22], [x + 16, y + 22], [x + 13, y + 28]], hex('#f8a040')); });
  frente(122, 74, ['#f0a0c0', '#a8d0f0', '#e8f0f8'], (x, y) => { R.poligono([[x, y + 28], [x + 10, y + 8], [x + 16, y + 18], [x + 20, y + 12], [x + 26, y + 28]], hex('#6a7a9a')); R.poligono([[x + 8, y + 12], [x + 10, y + 8], [x + 12, y + 12]], hex('#ffffff')); });
  frente(160, 74, ['#e8803a', '#f8c060', '#f8e8a0'], (x, y) => { R.disco(x + 13, y + 12, 6, hex('#fff6c0')); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; R.linea(x + 13 + Math.round(Math.cos(a) * 8), y + 12 + Math.round(Math.sin(a) * 8), x + 13 + Math.round(Math.cos(a) * 11), y + 12 + Math.round(Math.sin(a) * 11), hex('#fff6c0')); } R.rect(x, y + 24, x + 25, y + 28, hex('#c86a3a')); });
  frente(198, 74, ['#3a2a5a', '#5a3a7a', '#8a4a8a'], (x, y) => { R.disco(x + 13, y + 14, 8, hex('#e8e0f0')); R.disco(x + 16, y + 12, 7, hex('#5a3a7a')); for (let k = 0; k < 6; k++) R.pset(x + 3 + k * 4, y + 24 + (k % 2), hex('#f8f0a0')); });
  // abajo, más lomos y una pila de mandos en sus blísteres
  for (let x = 4; x < 316; ) { const ww = 5 + Math.floor(H(x, 11) * 3), al = 30 + Math.floor(H(x, 12) * 6), col = cols[Math.floor(H(x, 13) * 10)];
    caja(x, 172 - al, x + ww, 171, col); R.rect(x + 1, 172 - al + 4, x + ww - 1, 172 - al + 5, mez(col, hex('#ffffff'), 0.4)); x += ww + 1 + (H(x, 14) > 0.88 ? 5 : 0); }
});
const PRE = r(0.5684), FIS = r(0.7124);
const p7 = (t) => {
  fondo7();
  // el brillo que recorre las cajas (la luz del techo)
  const k0 = ((t * 60) % 520) - 100; for (let y = 72; y < 118; y++) for (let x = Math.max(0, Math.round(k0 + y * 0.3)); x < Math.min(320, Math.round(k0 + y * 0.3 + 6)); x++) if (bay(x, y) < 0.5) tintar(x, y, hex('#ffffff'), 0.35);
  // la estrella de «novedad» que se mece en su muelle
  { const sx = 266, sy = Math.round(56 + Math.sin(t * 5) * 3); R.linea(266, 64, sx, sy, hex('#5a5a62')); const pts = []; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5 + Math.sin(t * 3) * 0.1, rr = k % 2 ? 4 : 9; pts.push([Math.round(sx + Math.cos(a) * rr), Math.round(sy - 6 + Math.sin(a) * rr)]); }
    R.poligono(pts.map(([x, y]) => [x + 1, y + 1]), K); R.poligono(pts, hex('#f8d040')); R.pset(sx, sy - 6, hex('#e84a3a')); }
  // la caja del juego: la mano entra por la derecha en «physical edition» y se la lleva
  const coge = tramo(t, FIS - 0.35, FIS), lleva = tramo(t, FIS + 0.1, P8 - 0.05);
  const bx = Math.round(244 + ease(lleva) * 22), by = Math.round(74 - ease(lleva) * 14);
  const g = T.a_caja(R, bx, by, t, { s: 2, sombra: lleva <= 0 }) || {};
  // la etiqueta del precio: cae colgando del canto de la balda en «$79.99» y se balancea
  const e = tramo(t, PRE - 0.25, PRE + 0.1), bal = Math.sin((t - PRE) * 7) * Math.exp(-(Math.max(0, t - PRE)) * 2) * 3;
  if (e > 0) { const hh = Math.round(26 * ease(e)), x0 = 182 + Math.round(bal), x1 = 300 + Math.round(bal); R.rect(x0, 124, x1, 124 + hh, K); R.rect(x0 + 1, 125, x1 - 1, 123 + hh, hex('#f8e040')); R.rect(x0 + 1, 125, x1 - 1, 126, hex('#fff6a0')); R.rect(x0 + 1, 122 + hh, x1 - 1, 123 + hh, hex('#d8b020'));
    R.rect(x0 + 20, 120, x0 + 22, 124, hex('#5a5a62')); R.rect(x1 - 22, 120, x1 - 20, 124, hex('#5a5a62'));
    if (e >= 1) R.numero('$79.99', Math.round((x0 + x1) / 2), 145, { tam: 16, centro: true, rampa: hx(['#c8302a', '#a82020', '#801818', '#601010']) }); }
  if (coge > 0) { const [mx, my] = g.mano || [bx + 32, by + 22]; const wx = Math.round(lerp(338, mx + 11, ease(coge))), wy = Math.round(lerp(150, my, ease(coge)));
    T.brazo(R, 360, 140 + Math.round(lleva * 10), wx, wy, MANGA, -1, { codo: [330, Math.round(wy + 26)] }); }
};

// ── 8. el recibidor (gag 1): la caja abierta trae solo la tarjetita; la sacude; asoma el gato ──
const fondo8 = fijo(() => {
  estuco(0, 0, 319, 96, ['#c89a70', '#d8ac80', '#e8c294', '#f4d6aa'], (x, y) => 0.45 + 0.4 * Math.max(0, 1 - Math.hypot((x - 120) / 220, (y - 30) / 120)));
  // el zócalo de madera con paneles
  for (let y = 96; y < 122; y++) for (let x = 0; x < 320; x++) { const px = x % 46; R.pset(x, y, (px < 2 || y === 96 || y === 121) ? hex('#5a3a24') : px < 4 || y < 99 ? hex('#a8764a') : grad(hx(['#7a5034', '#8a5c3c', '#9a6a46']), 0.4 + Math.sin(x / 6 + y / 3) * 0.2, x, y)); }
  R.rect(0, 96, 319, 96, K);
  // la puerta de la calle con su mirilla, la ranura del correo y el rayo de luz
  caja(0, 14, 44, 121, hex('#3a6a6a')); R.rect(4, 20, 40, 60, hex('#2e5a5a')); R.rect(4, 66, 40, 116, hex('#2e5a5a')); R.rect(5, 21, 39, 21, hex('#5a8a8a')); R.rect(5, 67, 39, 67, hex('#5a8a8a'));
  R.rect(12, 74, 32, 78, K); R.rect(13, 75, 31, 77, hex('#c8a040')); R.disco(22, 40, 2, K); R.pset(22, 40, hex('#c8c8d0')); R.disco(38, 70, 2, hex('#e8c060')); R.rect(45, 14, 47, 121, hex('#fff0c0'));
  // el perchero con el sombrero y la mochila de Atom, el interruptor y un cuadro del faro
  R.rect(70, 34, 132, 37, K); R.rect(71, 35, 131, 36, hex('#8a5a3a')); for (const cx of [80, 100, 120]) { R.rect(cx, 37, cx + 1, 42, hex('#c8a040')); }
  R.poligono([[72, 48], [88, 48], [86, 40], [74, 40]], K); R.poligono([[73, 47], [87, 47], [85, 41], [75, 41]], hex('#e8d8a0')); R.rect(70, 47, 90, 49, K); R.rect(71, 47, 89, 48, hex('#d8c890')); R.rect(75, 43, 85, 44, hex('#c84a3a'));
  R.disco(110, 54, 9, K); R.rect(101, 54, 119, 76, K); R.disco(110, 54, 8, hex('#e8803a')); R.rect(102, 54, 118, 75, hex('#e8803a')); R.rect(104, 60, 116, 70, K); R.rect(105, 61, 115, 69, hex('#f09a50')); R.rect(109, 63, 111, 64, hex('#f8e070')); R.rect(100, 44, 101, 70, hex('#5a3a20'));
  R.rect(150, 58, 156, 68, K); R.rect(151, 59, 155, 67, hex('#f0ece0')); R.rect(152, 61, 154, 64, hex('#c8c0b0'));
  caja(186, 30, 226, 70, hex('#c8a040')); for (let y = 33; y < 68; y++) for (let x = 189; x < 224; x++) R.pset(x, y, y < 54 ? grad(hx(['#5ab0e0', '#9ad0f0']), (y - 33) / 21, x, y) : grad(hx(['#3a8ac0', '#2a6aa0']), (y - 54) / 14, x, y));
  R.rect(203, 40, 208, 56, hex('#ffffff')); for (let y = 42; y < 56; y += 4) R.rect(203, y, 208, y + 1, hex('#e84a3a')); R.rect(202, 37, 209, 40, hex('#3a3a48')); R.pset(205, 38, hex('#fff6a0'));
  // el suelo de baldosas con juntas y el felpudo
  for (let y = 122; y < 180; y++) for (let x = 0; x < 320; x++) { const jx = (x + Math.round((y - 122) * (x - 160) / 260)) % 28, jy = (y - 122) % 14; R.pset(x, y, jx === 0 || jy === 0 ? hex('#8a7a68') : grad(hx(['#b8a890', '#c8b8a0', '#d8c8b0']), 0.5 + (H(x >> 1, y >> 1, 6) - 0.5) * 0.5 - (y - 122) / 200, x, y)); }
  for (let y = 136; y < 170; y++) for (let x = 2; x < 56; x++) R.pset(x, y, (y === 136 || y === 169 || x === 2 || x === 55) ? hex('#5a3a20') : ((x + y) % 3 ? hex('#a8763a') : hex('#8a5a2a')));
  for (const [dx, dy] of [[-5, 1], [-3, -1], [0, -2], [3, -1], [5, 1]]) R.linea(28, 148, 28 + dx, 148 + dy + 2, hex('#3a6a2a')); R.rect(28, 148, 29, 162, hex('#5a3a20'));
  // el paquete de cartón abierto, con las solapas, la cinta y la etiqueta
  R.poligono([[70, 120], [186, 120], [190, 172], [66, 172]], K); for (let y = 121; y < 172; y++) for (let x = 67; x < 190; x++) if (x > 70 - (y - 120) * 0.08 && x < 186 + (y - 120) * 0.08) R.pset(x, y, grad(hx(['#9a6a38', '#b07c44', '#c48e52', '#d4a062']), 0.55 + (x - 128) / 260 + (H(x, y, 2) > 0.95 ? -0.2 : 0), x, y));
  R.rect(122, 121, 134, 171, hex('#c8a870')); R.rect(122, 121, 122, 171, hex('#a88850')); caja(146, 140, 178, 160, hex('#f8f4e8')); for (let x = 150; x < 174; x += 2) R.rect(x, 150, x, 157, K); R.rect(150, 143, 166, 145, hex('#8a8a9a'));
  R.poligono([[70, 120], [62, 98], [118, 100], [128, 120]], K); R.poligono([[71, 119], [64, 100], [117, 102], [126, 119]], hex('#d8a868'));
  R.poligono([[186, 120], [198, 98], [146, 100], [136, 120]], K); R.poligono([[185, 119], [196, 100], [147, 102], [138, 119]], hex('#c4904e'));
});
const DISC = r(0.837), CODE = r(0.9053), BOX = r(0.9587);
const p8 = (t) => {
  fondo8();
  // las bolitas de embalar: saltan cuando asoma el gato
  const GATO = BOX + 0.85, sale = tramo(t, GATO, GATO + 0.35);
  for (let k = 0; k < 30; k++) { const bx = 76 + Math.floor(H(k, 1) * 104), by0 = 116 + Math.floor(H(k, 2) * 8), vu = sale > 0 && k % 3 === 0 ? Math.sin(Math.min(1, (t - GATO) * 1.6) * Math.PI) * (10 + H(k, 3) * 14) : 0, dx = vu ? Math.round((H(k, 4) - 0.5) * 30 * Math.min(1, (t - GATO) * 1.6)) : 0;
    const x = bx + dx, y = Math.round(by0 - vu); R.rect(x - 2, y - 1, x + 2, y + 1, hex('#c8c0b0')); R.rect(x - 1, y - 1, x + 1, y, hex('#fbf8f0')); }
  // el gato asoma de las bolitas con un «?»
  if (sale > 0) { const gx = 124, gy = Math.round(126 - ease(sale) * 18);
    R.disco(gx, gy, 8, K); R.disco(gx, gy, 7, hex('#8a8a96')); R.poligono([[gx - 8, gy - 3], [gx - 6, gy - 12], [gx - 2, gy - 6]], K); R.poligono([[gx + 8, gy - 3], [gx + 6, gy - 12], [gx + 2, gy - 6]], K);
    R.poligono([[gx - 7, gy - 4], [gx - 6, gy - 10], [gx - 3, gy - 6]], hex('#8a8a96')); R.poligono([[gx + 7, gy - 4], [gx + 6, gy - 10], [gx + 3, gy - 6]], hex('#8a8a96')); R.pset(gx - 6, gy - 8, hex('#f0a0b0')); R.pset(gx + 6, gy - 8, hex('#f0a0b0'));
    for (const dx of [-5, 0, 5]) R.linea(gx + dx, gy - 6, gx + dx, gy - 3, hex('#6a6a76'));
    const parp = (t % 2.2) < 0.12; R.rect(gx - 4, gy - 1, gx - 3, gy, parp ? K : hex('#c8e040')); R.rect(gx + 3, gy - 1, gx + 4, gy, parp ? K : hex('#c8e040')); if (!parp) { R.pset(gx - 3, gy, K); R.pset(gx + 3, gy, K); }
    R.pset(gx, gy + 2, hex('#f07a8a')); R.linea(gx - 9, gy + 2, gx - 4, gy + 2, hex('#fbf8f0')); R.linea(gx + 4, gy + 2, gx + 9, gy + 2, hex('#fbf8f0'));
    for (let k = 0; k < 12; k++) { const bx = 112 + (k * 7) % 26, by = 118 + (k % 3); R.rect(bx - 2, by - 1, bx + 2, by + 1, hex('#c8c0b0')); R.rect(bx - 1, by - 1, bx + 1, by, hex('#fbf8f0')); }
    const q = tramo(t, GATO + 0.3, GATO + 0.5); if (q > 0) { const qy = Math.round(gy - 30 - Math.max(0, Math.sin((t - GATO) * 6)) * 2); R.disco(gx, qy, 9, K); R.disco(gx, qy, 8, hex('#f8e098')); R.icono('?', gx - 4, qy - 6, K, hex('#c8a040'), 2); } }
  // la caja del juego, en la mano de Atom: llega, se abre en «disc», brilla la tarjetita en «code» y la sacude en «box»
  const llega = tramo(t, P8, P8 + 0.5), ab = tramo(t, DISC - 0.15, DISC + 0.45), sac = tramo(t, BOX + 0.1, BOX + 0.25) * (1 - tramo(t, BOX + 1.5, BOX + 1.7));
  const gx0 = Math.round(lerp(330, 238, ease(llega))), gy0 = Math.round(lerp(96, 68, ease(llega)));
  const g = T.a_caja(R, gx0, gy0, t, { s: 3, abierta: ab, sacude: sac, sombra: false }) || {};
  if (t > CODE - 0.1 && t < BOX && g.tarjeta) destello(g.tarjeta[0] + 6, g.tarjeta[1] - 6, tramo(t, CODE - 0.1, CODE + 0.2));
  const [mx, my] = g.mano || [gx0 + 48, gy0 + 33]; T.brazo(R, 352, 176, mx + 11, my, MANGA, -1, { codo: [326, my + 36] });
  // las rayitas de la sacudida
  if (sac > 0.5) for (const dy of [-10, 0, 10]) { R.linea(gx0 - 8, gy0 + 33 + dy, gx0 - 4, gy0 + 33 + dy, hex('#fff6d8')); }
};

// ── 9. el escritorio en picado: las críticas llegan como aviones de papel; la medalla del 99 ──
const fondo9 = fijo(() => {
  madera(0, 0, 319, 179, ['#c08a58', '#a87448', '#8e5e3a', '#764c2e', '#5c3a24'], 22, 160, 100);
  // el portátil abierto (desde arriba), la taza, los lápices, la libreta y una planta
  caja(196, 4, 272, 30, hex('#2a2a36')); R.rect(198, 6, 270, 28, hex('#1a2a4a')); for (let k = 0; k < 6; k++) R.rect(204 + k * 11, 22 - k * 2 - (k % 2) * 3, 210 + k * 11, 26, hex('#4ad870'));
  caja(192, 30, 276, 62, hex('#b8b8c4')); for (let y = 34; y < 52; y += 4) for (let x = 196; x < 272; x += 5) R.rect(x, y, x + 3, y + 2, hex('#6a6a7a')); R.rect(220, 54, 248, 60, hex('#9a9aa8'));
  caja(14, 130, 70, 174, hex('#3a6ac8')); R.rect(15, 131, 20, 173, hex('#2a4a98')); for (let y = 136; y < 172; y += 4) R.rect(24, y, 66, y, hex('#5a8ae0')); R.rect(16, 131, 18, 173, hex('#c8c8d0'));
  R.disco(290, 150, 16, K); R.disco(290, 150, 15, hex('#c86a3a')); R.disco(290, 150, 12, hex('#5a3a24')); for (let k = 0; k < 9; k++) { const a = k * 0.7; R.poligono([[290, 150], [290 + Math.round(Math.cos(a) * 15), 150 + Math.round(Math.sin(a) * 15)], [290 + Math.round(Math.cos(a + 0.3) * 10), 150 + Math.round(Math.sin(a + 0.3) * 10)]], k % 2 ? hex('#3a8a3a') : hex('#4aa84a')); }
  for (const [x0, y0, col] of [[8, 50, '#e84a5a'], [10, 58, '#4ab0e8'], [12, 66, '#f8d050']]) { R.linea(x0, y0, x0 + 46, y0 + 10, K); R.linea(x0, y0 + 1, x0 + 46, y0 + 11, hex(col)); R.pset(x0 + 46, y0 + 10, hex('#3a2a1a')); }
  caja(96, 24, 120, 64, hex('#1a1a24')); R.rect(98, 28, 118, 60, hex('#24304a')); R.rect(104, 25, 110, 25, hex('#3a3a48'));
  caja(212, 150, 248, 166, hex('#2a2a36')); R.disco(214, 160, 6, K); R.disco(246, 160, 6, K); R.disco(214, 160, 5, hex('#2a2a36')); R.disco(246, 160, 5, hex('#2a2a36'));
  R.rect(216, 156, 220, 157, hex('#1a1a24')); R.rect(217, 155, 218, 158, hex('#1a1a24')); for (const [dx, dy, col] of [[240, 155, '#e84a5a'], [243, 157, '#4ab0e8'], [237, 157, '#5ad870'], [240, 159, '#f0c040']]) R.pset(dx, dy, hex(col));
  R.rect(270, 92, 290, 112, hex('#f8e070')); R.rect(274, 98, 286, 98, hex('#c8a040')); R.rect(274, 102, 284, 102, hex('#c8a040'));
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.max(Math.abs(x - 160) / 160, Math.abs(y - 90) / 90); if (v > 0.82 && bay(x, y) < (v - 0.82) * 3) tintar(x, y, K, 0.25); }
});
const LAN = n(0.0745), AVG = n(0.1371), N99 = n(0.1657), CIEN = n(0.1975);
const NOTAS = [['100', 104, 70], ['98', 164, 62], ['99', 224, 74], ['97', 98, 120], ['100', 158, 128], ['99', 222, 124]];
const p9 = (t) => {
  fondo9();
  // la taza que humea
  R.disco(52, 96, 13, K); R.disco(52, 96, 12, hex('#f0ece0')); R.disco(52, 96, 9, hex('#5a3420')); R.disco(50, 94, 3, hex('#7a4a30')); R.rect(64, 93, 70, 99, K); R.rect(65, 94, 69, 98, hex('#f0ece0'));
  for (let k = 0; k < 3; k++) { const v = (t * 0.8 + k / 3) % 1; R.pset(Math.round(52 + Math.sin(v * 9 + k) * 3), Math.round(90 - v * 18), mez(hex('#ffffff'), hex('#8e5e3a'), v)); }
  // el móvil: las estrellas de las críticas que se encienden una a una
  for (let k = 0; k < 5; k++) { const on = t > P9 + 0.3 + k * 0.35; const sx = 101 + (k % 3) * 6, sy = 32 + Math.floor(k / 3) * 8 + (k > 2 ? 0 : 0); R.pset(sx + 1, sy, on ? hex('#f8d040') : hex('#4a5a7a')); R.rect(sx, sy + 1, sx + 2, sy + 1, on ? hex('#f8d040') : hex('#4a5a7a')); R.pset(sx + 1, sy + 2, on ? hex('#f8d040') : hex('#4a5a7a')); }
  for (let y = 50; y < 58; y += 3) R.rect(101, y, 101 + ((y * 7) % 14), y, hex('#6a7a9a'));
  // los aviones de papel: llegan uno a uno, aterrizan y se abren en una nota
  const junta = ease(tramo(t, AVG, N99 - 0.1));
  NOTAS.forEach(([num, nx, ny], k) => {
    const ll = P9 + 0.15 + k * 0.28, u = tramo(t, ll, ll + 0.6), abre = tramo(t, ll + 0.6, ll + 0.85);
    if (u <= 0) return;
    const ox = k % 2 ? 340 : -20, oy = k < 3 ? 60 + k * 14 : 200, cx0 = Math.round(lerp(ox, nx, ease(u)) + Math.sin(u * Math.PI) * 18 * (k % 2 ? -1 : 1)), cy0 = Math.round(lerp(oy, ny, ease(u)));
    const fx = Math.round(lerp(cx0, 160 + (k % 3 - 1) * 4, junta)), fy = Math.round(lerp(cy0, 98 + (k < 3 ? -2 : 2), junta));
    if (abre <= 0) { const a = Math.atan2(ny - oy, nx - ox), ca = Math.cos(a), sa = Math.sin(a), P = (i, j) => [Math.round(fx + ca * i - sa * j), Math.round(fy + sa * i + ca * j)];
      R.poligono([P(8, 0), P(-6, -6), P(-3, 0)], hex('#ffffff')); R.poligono([P(8, 0), P(-6, 6), P(-3, 0)], hex('#d8d4e0')); R.linea(...P(8, 0), ...P(-3, 0), hex('#8a8a9a')); R.pset(...P(-10, 2), hex('#e8e0d0')); }
    else { const w = Math.round(14 * abre), h = 10; R.rect(fx - w - 1 + 2, fy - h + 2, fx + w + 1 + 2, fy + h + 2, mez(hex('#5c3a24'), K, 0.3)); R.rect(fx - w - 1, fy - h - 1, fx + w + 1, fy + h + 1, K); R.rect(fx - w, fy - h, fx + w, fy + h, hex('#fbf8f0')); R.rect(fx - w, fy - h, fx + w, fy - h + 3, hex('#e8e4d8'));
      if (abre >= 1) { R.numero(num, fx, fy + 5, { tam: 8, centro: true, color: hex('#2a2a36') }); for (let s = 0; s < 3; s++) R.pset(fx - 6 + s * 6, fy - 7, hex('#e8b030')); } }
  });
  // la mano de Atom junta las notas en «average»
  const hm = tramo(t, AVG - 0.4, AVG) * (1 - tramo(t, N99 + 0.3, N99 + 0.8));
  if (hm > 0) { const wx = Math.round(lerp(236, 216, ease(hm)) - junta * 26), wy = Math.round(lerp(200, 130, ease(hm)) - junta * 14); T.brazo(R, wx + 14, 214, wx, wy, MANGA, -1, { codo: [wx + 18, 186] }); }
  // la medalla de oro del 99, que cae en «99», con el /100 en «out of a hundred»
  const m = tramo(t, N99 - 0.05, N99 + 0.25);
  if (m > 0) { const s = m < 1 ? 1.4 - m * 0.4 : 1 + Math.max(0, Math.sin((t - N99 - 0.25) * 10) * 0.05 * Math.exp(-(t - N99) * 3)), rr = Math.round(22 * s), cx = 160, cy = 92;
    R.poligono([[cx - 14, cy + 10], [cx - 4, cy + 12], [cx - 10, cy + 44], [cx - 16, cy + 38], [cx - 22, cy + 42]], K); R.poligono([[cx - 13, cy + 12], [cx - 5, cy + 13], [cx - 10, cy + 41], [cx - 15, cy + 36], [cx - 20, cy + 39]], hex('#e84a5a'));
    R.poligono([[cx + 14, cy + 10], [cx + 4, cy + 12], [cx + 10, cy + 44], [cx + 16, cy + 38], [cx + 22, cy + 42]], K); R.poligono([[cx + 13, cy + 12], [cx + 5, cy + 13], [cx + 10, cy + 41], [cx + 15, cy + 36], [cx + 20, cy + 39]], hex('#3a6ac8'));
    R.disco(cx + 2, cy + 3, rr, mez(hex('#5c3a24'), K, 0.4)); R.disco(cx, cy, rr + 1, K); R.disco(cx, cy, rr, hex('#e8a820')); R.disco(cx, cy, rr - 3, hex('#f8c838')); R.disco(cx - 4, cy - 4, Math.max(2, rr - 14), hex('#fff0a0'));
    for (let a = 0; a < 6.28; a += 0.26) R.pset(Math.round(cx + Math.cos(a) * (rr - 1)), Math.round(cy + Math.sin(a) * (rr - 1)), hex('#c88a10'));
    R.numero('99', cx, cy + 8, { tam: 16, centro: true, rampa: hx(['#5a3a10', '#4a2a08', '#3a2006', '#2a1604']) });
    const cs = tramo(t, CIEN, CIEN + 0.2); if (cs > 0) { R.rect(cx - 22, cy + 46, cx + 22, cy + 58, K); R.rect(cx - 21, cy + 47, cx + 21, cy + 57, hex('#fbf8f0')); R.numero('/100', cx, cy + 56, { tam: 8, centro: true, color: hex('#2a2a36') }); }
    if (t < N99 + 0.6) { const b = tramo(t, N99, N99 + 0.6); for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5; R.pset(Math.round(cx + Math.cos(a) * (rr + 4 + b * 14)), Math.round(cy + Math.sin(a) * (rr + 4 + b * 14)), hex('#fff6c0')); } } }
};

// ── 10. el salón (gag 8): el átomo empuja el 99 hasta 100, y vuelve a 99 ──
const HIGH = n(0.3291), HIST = n(0.3673), TAKE = n(0.4325), SALES = n(0.4909);
const p10 = (t) => {
  const push = 0.85 * ease(tramo(t, HIGH - 0.4, HIST)), cien = t < HIST ? push : t < TAKE ? 1 : 1 - ease(tramo(t, TAKE, TAKE + 0.35));
  const o = { encuadre: 'salon', nota: 1, cien, descarga: 100 };
  T.salon(R, t, o); T.salonDelante(R, t, o);
  // el átomo: llega volando, empuja el 99 (tiembla del esfuerzo), celebra el 100 y sale despedido cuando vuelve el 99
  const llega = ease(tramo(t, P10, HIGH - 0.4)), empuja = t > HIGH - 0.4 && t < HIST, rebote = tramo(t, TAKE, TAKE + 0.6);
  let ax = lerp(96, 138, llega) + (empuja ? Math.sin(t * 30) * 1 + push * 4 : 0), ay = lerp(60, 78, llega) + Math.sin(t * 2.4) * 2;
  if (t >= HIST && t < TAKE) { ay -= Math.abs(Math.sin((t - HIST) * 7)) * 6; ax = 128 + Math.sin((t - HIST) * 3) * 3; }
  if (rebote > 0) { ax = lerp(138, 100, ease(rebote)); ay = 76 - Math.sin(rebote * Math.PI) * 14 + rebote * 4; }
  { const X = Math.round(ax), Y = Math.round(ay); R.disco(X + 2, Y + 3, 24, mez(hex('#3a2a3a'), K, 0.3)); R.disco(X, Y, 24, K); for (let y = -23; y <= 23; y++) for (let x = -23; x <= 23; x++) { const d = Math.hypot(x, y); if (d < 23.5) R.pset(X + x, Y + y, d > 22 ? hex('#8ad0ff') : grad(hx(['#0e1640', '#16225a', '#1e2e74', '#2a3e90']), 1 - d / 23 + (y < 0 ? 0.1 : -0.1), X + x, Y + y)); } }
  R.atomo(Math.round(ax), Math.round(ay), t, { r: 18, orbita: hex('#8ad0ff'), energia: t >= HIST && t < TAKE ? 1 : empuja ? 0.6 : 0.3 });
  if (empuja) for (const dy of [-6, 0, 6]) R.linea(Math.round(ax) - 30, Math.round(ay) + dy, Math.round(ax) - 24, Math.round(ay) + dy, hex('#fff6d8'));
  if (t > HIST && t < TAKE) for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + t * 2, rr = 18 + Math.sin(t * 8 + k) * 3; R.pset(Math.round(ax + Math.cos(a) * rr), Math.round(ay + Math.sin(a) * rr), hex('#fff6c0')); }
  const q = tramo(t, SALES - 0.4, SALES - 0.2); if (q > 0) { const qx = Math.round(ax), qy = Math.round(ay - 32 - Math.max(0, Math.sin((t - SALES) * 5)) * 2); R.disco(qx, qy, 8, K); R.disco(qx, qy, 7, hex('#f8e098')); R.icono('?', qx - 4, qy - 6, K, hex('#c8a040'), 2); }
};

// ── 11. la oficina de los analistas: la gráfica de las reservas crece ──
const fondo11 = fijo(() => {
  estuco(0, 0, 319, 123, ['#8a96a8', '#9aa6b6', '#aab4c4', '#bcc6d4'], (x, y) => 0.5 + 0.3 * Math.max(0, 1 - Math.hypot((x - 100) / 200, (y - 60) / 100)));
  // la ventana grande con su marco y el estor recogido (el cielo se pinta en cada fotograma)
  caja(22, 22, 180, 106, hex('#e8ecf0')); R.rect(20, 106, 182, 110, hex('#d8dce4')); R.rect(20, 110, 182, 110, K);
  for (let y = 24; y < 31; y++) R.rect(24, y, 178, y, y % 2 ? hex('#f0e8d8') : hex('#c8c0b0'));
  // la pizarra blanca con su bandeja de rotuladores
  caja(194, 32, 274, 110, hex('#9aa0a8')); R.rect(196, 34, 272, 108, hex('#f8f8fa')); R.rect(196, 34, 272, 34, hex('#ffffff')); R.rect(200, 110, 268, 113, K); R.rect(201, 110, 267, 112, hex('#b8bcc4'));
  for (const [x, col] of [[206, '#e84a5a'], [214, '#3a6ac8'], [222, '#2a2a36']]) R.rect(x, 108, x + 6, 109, hex(col));
  // el reloj, la fuente de agua y el zócalo
  R.rect(0, 120, 319, 123, hex('#6a7484'));
  caja(284, 96, 304, 150, hex('#e8ecf0')); R.rect(286, 120, 302, 148, hex('#c8ccd4')); R.rect(290, 112, 292, 116, hex('#5a5a62')); R.rect(296, 112, 298, 116, hex('#e84a5a'));
  // la moqueta en losetas
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const jx = (x + Math.round((y - 124) * (x - 160) / 200)) % 30, jy = (y - 124) % 12; R.pset(x, y, jx === 0 || jy === 0 ? hex('#3a4458') : grad(hx(['#4a5468', '#56607a', '#626c86']), 0.5 + (H(x, y, 8) - 0.5) * 0.6 + (((x / 30 | 0) + (y / 12 | 0)) % 2 ? 0.15 : 0), x, y)); }
  // las mesas de los compañeros (el frente se pinta delante)
  for (const [x0, x1] of [[8, 100], [106, 168]]) { R.rect(x0, 138, x1, 142, K); R.rect(x0 + 1, 139, x1 - 1, 141, hex('#d8c8a8')); }
});
const ANA = n(0.6405), TOP = n(0.7498);
const p11 = (t) => {
  fondo11();
  // por la ventana: el cielo al atardecer, nubes a tres velocidades, la ciudad con luces y pájaros
  for (let y = 31; y < 104; y++) for (let x = 24; x < 179; x++) R.pset(x, y, grad(hx(['#5a7ac8', '#7a9ad8', '#a8b8e0', '#e8c0a8', '#f8d098']), (y - 31) / 74, x, y));
  R.recorte([24, 31, 178, 103]);
  for (const [vel, yy, col, k] of [[2, 40, '#ffffff', 0], [4, 52, '#f0e0e8', 1], [7, 64, '#e8b8a8', 2]]) for (let j = 0; j < 3; j++) { const nx = 24 + ((j * 70 + t * vel + k * 30) % 190) - 20; for (let i = 0; i < 22; i++) { const hh = Math.round(3 * Math.sin(i / 22 * Math.PI)); R.linea(Math.round(nx + i), yy - hh, Math.round(nx + i), yy + 1, hex(col)); } }
  for (const [bx, bw, bh, col] of [[24, 18, 40, '#4a5a7a'], [44, 12, 56, '#3a4a6a'], [58, 22, 34, '#5a6a8a'], [82, 14, 62, '#3a4a6a'], [98, 26, 44, '#4a5a7a'], [126, 12, 52, '#3a4a6a'], [140, 20, 38, '#5a6a8a'], [162, 16, 48, '#4a5a7a']]) {
    R.poligono([[bx, 104], [bx, 104 - bh], [bx + bw, 104 - bh], [bx + bw, 104]], hex(col));
    for (let wy = 106 - bh; wy < 102; wy += 4) for (let wx = bx + 2; wx < bx + bw - 1; wx += 3) R.pset(wx, wy, H(wx, wy, Math.floor(t * 0.7)) > 0.6 ? hex('#f8e090') : hex('#2a3a5a')); }
  for (let k = 0; k < 3; k++) { const bx = Math.round(24 + ((t * 14 + k * 50) % 170)), by = 46 + k * 6 + Math.round(Math.sin(t * 3 + k) * 2), al = Math.sin(t * 10 + k) > 0 ? -1 : 0; R.pset(bx - 1, by + al, K); R.pset(bx, by, K); R.pset(bx + 1, by + al, K); }
  R.recorte(null);
  R.rect(100, 31, 102, 105, hex('#e8ecf0')); R.rect(24, 66, 178, 67, hex('#e8ecf0'));
  // el reloj de pared con segundero
  R.disco(292, 70, 9, K); R.disco(292, 70, 8, hex('#fbf8f0')); { const a = t * 1.0; R.linea(292, 70, Math.round(292 + Math.sin(a) * 6), Math.round(70 - Math.cos(a) * 6), hex('#e84a5a')); R.linea(292, 70, 292, 65, K); R.linea(292, 70, 296, 70, K); }
  // la burbuja de la fuente y la planta que mueve el aire
  { const b = (t * 0.5) % 1; if (b < 0.3) R.disco(294, Math.round(108 - b * 30), 2, hex('#cfe8ff')); R.rect(288, 98, 300, 110, K); R.rect(289, 99, 299, 109, hex('#8ac8f0')); R.rect(290, 100, 292, 108, hex('#cfe8ff')); }
  { R.rect(306, 140, 318, 158, K); R.rect(307, 141, 317, 157, hex('#c86a3a')); for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.35 + Math.sin(t * 1.4 + k) * 0.08; R.linea(312, 140, Math.round(312 + Math.cos(a) * 26), Math.round(140 + Math.sin(a) * 26), k % 2 ? hex('#3a8a3a') : hex('#4aa84a')); } }
  // la gráfica de la pizarra: las barras crecen en «estimates» y la flecha sube en «topped»
  const gb = [0.25, 0.35, 0.5, 0.7, 0.95], cre = tramo(t, P11 + 0.3, TOP);
  R.linea(204, 100, 266, 100, hex('#2a2a36')); R.linea(204, 100, 204, 42, hex('#2a2a36'));
  gb.forEach((v, k) => { const hgt = Math.round(52 * v * ease(Math.min(1, Math.max(0, cre * 5 - k * 0.8)))); if (hgt > 0) { R.rect(208 + k * 12, 100 - hgt, 216 + k * 12, 99, hex('#3a6ac8')); R.rect(208 + k * 12, 100 - hgt, 209 + k * 12, 99, hex('#6a9ae8')); } });
  const fl = tramo(t, TOP - 0.2, TOP + 0.4); if (fl > 0) { R.linea(208, 86, Math.round(208 + 56 * fl), Math.round(86 - 44 * fl), hex('#e84a5a')); R.linea(209, 86, Math.round(209 + 56 * fl), Math.round(86 - 44 * fl), hex('#e84a5a')); if (fl >= 1) R.poligono([[268, 38], [258, 42], [264, 48]], hex('#e84a5a')); }
  for (let x = 206; x < 268; x += 3) R.pset(x, Math.round(96 - (x - 206) * 0.7), hex('#8a8a9a'));
  // el compañero que pasa por detrás con su café
  const w = tramo(t, P11 + 0.2, P12), wx = Math.round(lerp(330, -24, w)); const pw = R.actor(EL.ciudadanoLF, wx, 132, t, { dir: -1, anda: w > 0 && w < 1, sostiene: true }) || {};
  if (pw.mano) { const [mx, my] = pw.mano; R.rect(mx - 2, my - 4, mx + 2, my, K); R.rect(mx - 1, my - 3, mx + 1, my, hex('#f0ece0')); R.pset(mx, my - 6 - Math.round((t * 3) % 2), hex('#e8e8f0')); }
  // los compañeros en sus mesas: teclean; en «topped» se sorprenden y se levantan un poco
  const sor = t > TOP, sube = sor ? Math.round(Math.min(1, (t - TOP) * 4) * 3) : 0;
  R.actor(EL.fanaLF, 56, 152 - sube, t, { dir: -1, habla: false, sorpresa: sor, brazos: sor && t > TOP + 0.3 });
  R.actor(EL.empleadoLF, 112, 152 - sube, t, { dir: 1, sorpresa: sor, sonrisa: sor && t > TOP + 0.4 });
  // los frentes de las mesas, los monitores (gráficas que cambian) y los teclados, por delante
  for (const [x0, x1, mx] of [[8, 100, 20], [106, 168, 140]]) { R.rect(x0, 142, x1, 164, K); R.rect(x0 + 1, 143, x1 - 1, 163, hex('#a89070')); R.rect(x0 + 1, 143, x1 - 1, 144, hex('#c8b090')); R.rect(x0 + 4, 148, x1 - 4, 149, hex('#8a7458'));
    caja(mx, 116, mx + 26, 136, hex('#1a1a24')); R.rect(mx + 2, 118, mx + 24, 134, hex('#1a2a4a')); for (let k = 0; k < 6; k++) { const hgt = 3 + Math.round((Math.sin(t * 2 + k + mx) * 0.5 + 0.5) * 10); R.rect(mx + 3 + k * 4, 133 - hgt, mx + 5 + k * 4, 133, hex('#4ad870')); }
    R.rect(mx + 11, 136, mx + 15, 139, K); R.rect(mx + 30, 136, mx + 50, 139, K); R.rect(mx + 31, 137, mx + 49, 138, hex('#5a5a6a')); }
  // la analista junto a la pizarra: señala las barras, se vuelve a los compañeros en «estimates» y lo celebra en «topped»
  const vuelve = t > ANA && t < TOP - 0.3;
  R.actor(EL.archiveraLF, 172, 168, t, { dir: vuelve ? -1 : 1, dedo: !(t > TOP), habla: Math.sin(t * 7) > 0.1 && t < TOP, brazos: t > TOP, sonrisa: t > TOP });
};

// ── 12. la caja fuerte y el corcho: la cifra y su «?» ──
const fondo12 = fijo(() => {
  estuco(0, 0, 319, 116, ['#2e4a42', '#365548', '#3e6052', '#486c5c'], (x, y) => 0.4 + 0.45 * Math.max(0, 1 - Math.hypot((x - 210) / 170, (y - 70) / 90)));
  for (let y = 116; y < 132; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 116 || x % 40 === 0 ? hex('#3a2418') : grad(hx(['#5a3a24', '#6a4630', '#7a5238']), 0.5 + Math.sin(x / 9 + y) * 0.3, x, y));
  madera(0, 132, 319, 179, ['#9a6a44', '#84583a', '#6c4630', '#563626', '#3e261a'], 9, 210, 140);
  // la caja fuerte de acero con remaches, bisagras y el asa
  for (let y = 62; y < 170; y++) for (let x = 28; x < 124; x++) R.pset(x, y, grad(hx(['#3a3e48', '#4a505c', '#5a6270', '#6e7684', '#8a92a0']), 0.35 + 0.45 * (1 - Math.abs(x - 64) / 70) - (y - 62) / 400, x, y));
  R.rect(27, 61, 124, 61, K); R.rect(27, 170, 124, 170, K); R.rect(27, 61, 27, 170, K); R.rect(124, 61, 124, 170, K);
  R.rect(36, 70, 116, 160, K); for (let y = 71; y < 160; y++) for (let x = 37; x < 116; x++) R.pset(x, y, grad(hx(['#454a56', '#555c68', '#687080', '#7c8494']), 0.4 + 0.4 * (1 - Math.abs(x - 70) / 60), x, y));
  for (const [x, y] of [[31, 65], [120, 65], [31, 166], [120, 166], [76, 65], [76, 166]]) { R.pset(x, y, hex('#a8b0bc')); R.pset(x + 1, y + 1, hex('#2a2e36')); }
  R.rect(34, 84, 38, 96, hex('#2a2e36')); R.rect(34, 134, 38, 146, hex('#2a2e36'));
  R.rect(94, 104, 110, 108, K); R.rect(95, 105, 109, 107, hex('#a8b0bc')); R.rect(30, 170, 40, 176, K); R.rect(112, 170, 122, 176, K);
  R.rect(24, 40, 124, 43, K); R.rect(25, 41, 123, 42, hex('#7a5238')); for (const bx2 of [30, 112]) R.rect(bx2, 44, bx2 + 2, 48, K);
  for (let k = 0; k < 9; k++) { const bx2 = 30 + k * 10, col = hx(['#3a6ac8', '#c84a3a', '#e8b030', '#4aa860', '#8a4ac8'])[k % 5]; caja(bx2, 24, bx2 + 8, 40, col); R.rect(bx2 + 2, 28, bx2 + 6, 31, hex('#f8f4e8')); R.disco(bx2 + 4, 36, 1, K); }
  // encima, la carpeta atada con cinta roja (los datos oficiales) y un flexo
  R.rect(40, 50, 104, 61, K); R.rect(41, 51, 103, 60, hex('#e8dcc0')); R.rect(41, 51, 103, 53, hex('#f8f0d8')); R.rect(70, 50, 74, 61, hex('#c82030')); R.rect(66, 52, 78, 54, hex('#c82030'));
  // el corcho con su marco, fotos, notas y chinchetas
  caja(128, 34, 272, 128, hex('#8a5a3a')); for (let y = 37; y < 126; y++) for (let x = 131; x < 270; x++) R.pset(x, y, grad(hx(['#a8763e', '#ba8a4e', '#cc9c5e']), 0.5 + (H(x, y, 9) - 0.5) * 0.8, x, y));
  for (const [x0, y0, col] of [[134, 42, '#f8e070'], [136, 72, '#a0e0f0'], [134, 100, '#f8a0c0']]) { R.rect(x0, y0, x0 + 20, y0 + 18, hex(col)); R.rect(x0 + 3, y0 + 5, x0 + 16, y0 + 5, mez(hex(col), K, 0.4)); R.rect(x0 + 3, y0 + 9, x0 + 13, y0 + 9, mez(hex(col), K, 0.4)); R.disco(x0 + 10, y0, 1, hex('#e84a5a')); }
  caja(162, 104, 188, 124, hex('#f8f8f0')); for (let y = 106; y < 117; y++) for (let x = 164; x < 187; x++) R.pset(x, y, y < 112 ? hex('#5ab0e0') : hex('#e8c890')); R.disco(182, 108, 2, hex('#fff0a0')); R.disco(175, 104, 1, hex('#3a6ac8'));
  // la mesita de debajo del corcho
  R.rect(160, 152, 270, 156, K); R.rect(161, 153, 269, 155, hex('#8a5a3a')); for (const lx of [164, 264]) caja(lx, 156, lx + 3, 178, hex('#5a3a24'));
});
const ONE = n(0.771), BIL = n(0.8262), EST = n(0.9105), NOTO = n(0.9476);
const p12 = (t) => {
  fondo12();
  // el papel de la cifra, clavado: las barras y $1,500,000,000 que se va contando
  R.rect(166, 44, 268, 98, K); R.rect(167, 45, 267, 97, hex('#fbf8f0')); R.disco(217, 45, 2, hex('#e84a5a')); R.pset(216, 44, hex('#ffb0b8'));
  const cu = ease(tramo(t, ONE - 0.2, BIL + 0.3)), bars = [0.3, 0.45, 0.65, 0.9];
  bars.forEach((v, k) => { const hh = Math.round(26 * v * Math.min(1, cu * 1.3)); R.rect(180 + k * 16, 80 - hh, 190 + k * 16, 80, hex('#3a6ac8')); R.rect(180 + k * 16, 80 - hh, 181 + k * 16, 80, hex('#6a9ae8')); });
  R.linea(174, 81, 246, 81, hex('#2a2a36'));
  const val = Math.round(1500 * cu), txt = '$' + (val >= 1000 ? Math.floor(val / 1000) + ',' + String(val % 1000).padStart(3, '0') : String(val)) + ',000,000';
  R.numero(txt, 217, 94, { tam: 8, centro: true, fina: true, color: hex('#1a6a3a') });
  // las pilas de monedas de oro que crecen en la mesita
  for (let k = 0; k < 5; k++) { const alto = Math.round((6 + k * 4) * Math.min(1, Math.max(0, cu * 1.6 - k * 0.12))), mx = 176 + k * 18;
    for (let j = 0; j < alto; j++) { const y = 151 - j * 2; R.rect(mx, y - 1, mx + 12, y, K); R.rect(mx + 1, y - 1, mx + 11, y - 1, hex('#f8c838')); R.rect(mx + 1, y, mx + 11, y, hex('#c89020')); }
    if (alto > 0 && Math.sin(t * 4 + k) > 0.8) R.pset(mx + 3, 150 - alto * 2, hex('#ffffff')); }
  // la mano pega la nota amarilla del «?» en «estimates»
  const nm = tramo(t, EST - 0.6, EST), sa = tramo(t, EST + 0.4, EST + 0.9);
  const pegada = t >= EST, nx = pegada ? 238 : Math.round(lerp(330, 238, ease(nm))), ny = pegada ? 46 : Math.round(lerp(90, 46, ease(nm)));
  if (nm > 0) { R.rect(nx - 1, ny - 1, nx + 25, ny + 25, K); R.rect(nx, ny, nx + 24, ny + 24, hex('#f8e040')); R.rect(nx, ny, nx + 24, ny + 3, hex('#e8c820')); R.icono('?', nx + 7, ny + 6, hex('#c82030'), hex('#a88a10'), 2);
    if (pegada && t < EST + 0.3) for (const [dx, dy] of [[-4, -4], [28, -4], [-4, 28], [28, 28]]) R.pset(nx + dx, ny + dy, hex('#ffffff')); }
  if (nm > 0 && sa < 1) { const wx = Math.round(lerp(nx + 30, 340, ease(sa))), wy = Math.round(lerp(ny + 14, 120, ease(sa))); T.brazo(R, 356, 150, wx, wy, MANGA, -1, { codo: [328, Math.round(wy + 30)] }); }
  // la caja fuerte: la rueda gira en «not official», el candado tiembla y sigue cerrado
  const gira = tramo(t, NOTO - 0.2, NOTO + 0.6), tiem = t > NOTO && t < NOTO + 0.9 ? Math.round(Math.sin(t * 40) * 1.5) : 0;
  R.disco(68, 112, 13, K); R.disco(68, 112, 12, hex('#c8ccd4')); R.disco(68, 112, 9, hex('#8a92a0')); R.disco(68, 112, 3, hex('#3a3e48'));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6 + gira * Math.PI * 3; R.pset(Math.round(68 + Math.cos(a) * 10), Math.round(112 + Math.sin(a) * 10), K); }
  { const a = gira * Math.PI * 3 - Math.PI / 2; R.linea(68, 112, Math.round(68 + Math.cos(a) * 8), Math.round(112 + Math.sin(a) * 8), hex('#e84a5a')); }
  const lx = 100 + tiem, ly = 124; R.rect(lx - 1, ly - 9, lx + 9, ly - 8, K); R.rect(lx - 1, ly - 9, lx, ly, K); R.rect(lx + 8, ly - 9, lx + 9, ly, K); R.rect(lx, ly - 8, lx + 8, ly - 8, hex('#c8ccd4'));
  R.rect(lx - 4, ly, lx + 12, ly + 14, K); R.rect(lx - 3, ly + 1, lx + 11, ly + 13, hex('#e8b030')); R.rect(lx - 3, ly + 1, lx + 11, ly + 2, hex('#f8d870')); R.disco(lx + 4, ly + 7, 2, K); R.rect(lx + 4, ly + 8, lx + 4, ly + 11, K);
  if (t > NOTO && t < NOTO + 1.2) { R.icono('X', 88, 140, hex('#e8303e'), K, 2); }
};

const año = (t) => t < P3 ? 2023 : t < P4 ? 2026 : t < P6 ? 2025 : t < P7 ? 2023 : 2026;
const efectos = [[1.35, 'puerta'], [c(0.07), 'interruptor'], [c(0.129), 'brillo'], [P2 + 0.45, 'toc'], [c(0.187), 'bip'], [c(0.3528), 'campana'],
  [SL, 'lapiz'], [MAY, 'lapiz'], [NOV + 0.1, 'lapiz'], [c(0.6628), 'papel'], [c(0.7888), 'tecleo'], [c(0.8674), 'brillo'], [c(0.9667), 'brillo'],
  [r(0.1054), 'tic'], [VIEWS, 'campana'], [r(0.2434), 'tic'], [REC, 'publico'], [MUS, 'pop'], [PRE - 0.2, 'firma'], [FIS, 'whoosh'],
  [DISC, 'cerrojo'], [BOX + 0.15, 'golpecito'], [BOX + 0.85, 'miau'], [P9 + 0.3, 'whoosh'], [AVG, 'papel'], [N99, 'campana'],
  [HIGH, 'boing'], [HIST, 'brillo'], [TAKE + 0.05, 'boing'], [P11 + 0.5, 'tecleo'], [TOP, 'aviso'], [EST, 'golpecito'], [NOTO, 'cerrojo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11], [P12, p12]], { efectos, cartela: '2023', año });
''')
