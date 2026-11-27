E = {}

# utilidades comunes a las tres escenas (cada escena es su propia página: se repiten en cada cuerpo)
COMUN = r'''
const K = T.C.k, PZ = T.PIEZAS_TR;
const rnd = (x, y, s = 0) => { const n = Math.sin(x * 12.9898 + y * 78.233 + s * 37.719) * 43758.5453; return n - Math.floor(n); };
const capa = (fn) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); fn(); R.usar(prev); } R.copiar(b); }; };
const H = (s) => hex(s);
const lin = (t, a, b) => Math.max(0, Math.min(1, (t - a) / Math.max(1e-6, b - a)));
const mezC = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// trama ordenada entre los tonos de una rampa (v continuo de 0 a n − 1): nada de franjas lisas
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const trama = (cols, v, x, y) => { const i = Math.floor(v), f = v - i, b = (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16; return cols[Math.max(0, Math.min(cols.length - 1, f > b ? i + 1 : i))]; };
// un icono del kit ('?', 'X', '!', corazon…) con su contorno, a escala esc; a < 1: se deshace en trama
const glifo = (nombre, x, y, esc, c, a = 1, borde = K) => {
  const g = R.ICONOS[nombre]; if (!g || a <= 0) return;
  const w = g[0].length, h = g.length, on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && g[j][i] === '#';
  for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) {
    const ll = on(i, j), cerca = !ll && (on(i - 1, j) || on(i + 1, j) || on(i, j - 1) || on(i, j + 1) || on(i - 1, j - 1) || on(i + 1, j + 1) || on(i - 1, j + 1) || on(i + 1, j - 1));
    if (!ll && !cerca) continue;
    for (let v = 0; v < esc; v++) for (let u = 0; u < esc; u++) { const px = Math.round(x + i * esc + u), py = Math.round(y + j * esc + v); if (a < 1 && (BAYER[(py & 3) * 4 + (px & 3)] + 0.5) / 16 > a) continue; R.pset(px, py, ll ? (u === 0 && v === 0 && esc > 1 ? mezC(c, H('#ffffff'), 0.35) : c) : borde); }
  }
};
// escala con rebote al aparecer en t0
const rebote = (t, t0, esc) => (t < t0 ? 0 : t < t0 + 0.07 ? Math.max(1, esc - 1) : t < t0 + 0.15 ? esc + 1 : esc);
// chispas que salen de (x, y) durante 0,5 s desde t0
const chispas = (t, t0, x, y, c = H('#fff0a0'), r0 = 6) => { const k = (t - t0) / 0.5; if (k < 0 || k > 1) return; for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4 + 0.3, r = r0 + k * 12; R.pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r), c); if (i % 2 === 0) R.pset(Math.round(x + Math.cos(an) * (r - 2)), Math.round(y + Math.sin(an) * (r - 2)), c); } };
// madera con vetas (tres tonos: base, luz, sombra)
const madera = (x0, y0, x1, y1, cs, s = 1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = (y + Math.sin(x * 0.045 + s) * 2.4 + Math.sin(x * 0.17 + y) * 0.6) / 3.1, f = v - Math.floor(v), r = rnd(x, y, s); R.pset(x, y, f < 0.16 ? cs[2] : f > 0.82 && r > 0.3 ? cs[1] : r < 0.05 ? cs[2] : cs[0]); } };
// sillares de piedra
const sillares = (x0, y0, x1, y1, cs, alto = 9, s = 3) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / alto), jy = (y - y0) % alto === alto - 1; for (let x = x0; x <= x1; x++) { const w = 15 + Math.floor(rnd(fila, Math.floor((x + fila * 7) / 15), s) * 3), jx = (x + fila * 7) % w === 0, r = rnd(x, y, s); R.pset(x, y, jy || jx ? cs[2] : r < 0.08 ? cs[2] : r > 0.9 ? cs[1] : (y - y0) % alto === 0 ? cs[1] : cs[0]); } } };
'''

E['tr-valentin'] = ('San Valentín', '''// TR-VALENTIN (frase 8), sin cartela. Cuatro planos:
// 1. la cocina de hoy en febrero (fondo local): la chica lee la lista de propósitos de la nevera; en «February» la
//    hoja de enero se arranca y vuela, sale febrero con el 14 marcado; la chica arruga la lista y la encesta en el cubo
//    (la mancuerna, llena de polvo, en el suelo); nieva tras la ventana y pasa un coche;
// 2. en «Valentine's Day»: la iglesia romana del siglo III: entra el Valentín de Roma y, en «barely know», le sale un
//    «?»; en «There were» entra por la derecha el Valentín de Terni y en «two» sale un «2» entre los dos;
// 3. en «in the third century»: el fresco de los dos santos de cerca: en «Rome» se enciende el medallón del Coliseo y
//    en «Turney» el de la cascada de Terni; la romana sube la lucerna, el romano señala; en «So little» salen dos «?»;
// 4. en «the Catholic Church»: un despacho del Vaticano en 1969 (fondo local): el obispo teclea, se levanta y señala
//    el calendario de 1969 y en «took his feast off» la casilla del 14 se apaga despacio; en «still honored» la abuela
//    enciende una vela a la estatuilla del santo.''', COMUN + r'''
const V = (f) => en('valentin', f);
const P2 = V(0.1816), P3 = V(0.4746), P4 = V(0.7515);

// ── 1 · la cocina de hoy, en febrero (fondo local) ─────────────────────────────────────────────────────────────
const FONDO1 = capa(() => {
  // la pared: papel pintado crema con rombos finos (la esquina de Atom, lisa y suave)
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) {
    const atom = x >= 262 && y <= 50, d = !atom && (((x + y) % 14 === 0) || ((x - y + 700) % 14 === 0)), r = rnd(x, y, 1);
    R.pset(x, y, d ? H('#e4d4aa') : (!atom && (x + y) % 14 === 7 && (x - y + 700) % 14 === 7) ? H('#d8a0a0') : r < 0.1 ? H('#eee0b8') : H('#f3e7c5'));
  }
  // la moldura del techo
  for (let x = 0; x < 320; x++) { R.pset(x, 0, H('#fbf4e0')); R.pset(x, 1, H('#d8c8a0')); }
  // el rodapié
  R.rect(0, 144, 319, 151, H('#f6f2e8')); R.rect(0, 144, 319, 144, H('#c8bca0')); R.rect(0, 150, 319, 151, H('#b8ac90'));
  // el suelo de baldosas de barro y crema, con juntas y brillos
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) {
    const fy = Math.floor((y - 152) / 9), fx = Math.floor((x + fy * 6) / 18), junta = (y - 152) % 9 === 8 || (x + fy * 6) % 18 === 17, r = rnd(x, y, 2);
    const base = (fx + fy) % 2 ? H('#c8784a') : H('#e8d2a8'), sombra = (fx + fy) % 2 ? H('#a85a34') : H('#cdb48a');
    R.pset(x, y, junta ? H('#8a6a4a') : r < 0.1 ? sombra : (y - 152) % 9 === 0 && r > 0.6 ? mezC(base, H('#ffffff'), 0.3) : base);
  }
  // el reloj de pared (la aguja se mueve encima)
  R.disco(34, 46, 10, K); R.disco(34, 46, 9, H('#c8503a')); R.disco(34, 46, 7, H('#fbf6ea'));
  for (let a = 0; a < 12; a++) R.pset(Math.round(34 + Math.cos(a * Math.PI / 6) * 5.6), Math.round(46 + Math.sin(a * Math.PI / 6) * 5.6), a % 3 ? H('#8a8a96') : K);
  R.pset(31, 43, H('#ffffff')); R.pset(30, 44, H('#ffffff'));
  // la balda con tarros de especias y una planta colgante
  R.rect(56, 60, 92, 62, K); R.rect(57, 60, 91, 61, H('#b8844a')); R.rect(58, 63, 59, 66, H('#7a4a2a')); R.rect(89, 63, 90, 66, H('#7a4a2a'));
  [['#c8503a', 58], ['#e8b830', 65], ['#5a9a3a', 72], ['#8a5a34', 79]].forEach(([c, x], i) => { R.rect(x, 51 + (i % 2), x + 5, 59, K); R.rect(x + 1, 53 + (i % 2), x + 4, 58, H(c)); R.rect(x + 1, 51 + (i % 2), x + 4, 52 + (i % 2), H('#e8e4dc')); R.pset(x + 1, 55, H('#ffffff')); });
  R.rect(86, 52, 91, 59, K); R.rect(87, 53, 90, 59, H('#c87a3a'));
  for (let k = 0; k < 14; k++) { const x = 88 + Math.round(Math.sin(k * 0.9) * 2), y = 50 + k * 2 - 6; R.pset(x, y, H('#4a8a3a')); R.pset(x + 1, y, k % 3 ? H('#6ab04a') : H('#2e6a24')); }
  // el cuadro con un paisaje de playa (el verano que se espera)
  R.rect(58, 72, 90, 94, K); R.rect(59, 73, 89, 93, H('#b8844a')); R.rect(61, 75, 87, 91, H('#7ab0d8'));
  for (let x = 61; x <= 87; x++) { R.pset(x, 84, H('#3a7ab8')); R.pset(x, 85, (x % 3) ? H('#3a7ab8') : H('#e8f0f8')); for (let y = 86; y <= 91; y++) R.pset(x, y, rnd(x, y, 4) < 0.2 ? H('#d8b878') : H('#e8d098')); }
  R.disco(80, 79, 2, H('#f8e070')); R.linea(66, 91, 68, 82, H('#6a4a2a')); R.linea(68, 82, 64, 80, H('#3a8a3a')); R.linea(68, 82, 72, 80, H('#3a8a3a'));
  // la nevera de dos puertas con imanes y el dibujo de un niño
  R.rect(11, 85, 55, 152, K); R.rect(12, 86, 54, 151, H('#eef2f6'));
  for (let y = 86; y <= 151; y++) { R.rect(48, y, 54, y, H('#d0d8e0')); R.pset(53, y, H('#b8c0cc')); R.pset(13, y, H('#ffffff')); }
  R.rect(12, 107, 54, 107, H('#9aa4b4')); R.rect(12, 108, 54, 108, H('#ffffff'));
  R.rect(49, 91, 50, 102, H('#8a94a4')); R.rect(49, 112, 50, 134, H('#8a94a4')); R.pset(49, 91, H('#ffffff')); R.pset(49, 112, H('#ffffff'));
  R.rect(12, 149, 54, 151, H('#5a6070'));
  R.rect(17, 89, 31, 101, H('#9aa4b4')); R.rect(18, 90, 30, 100, H('#ffffff')); R.disco(21, 93, 2, H('#f0c040')); R.rect(23, 96, 28, 100, H('#c8503a')); R.poligono([[22, 96], [25, 93], [29, 96]], H('#5a3a8a')); R.rect(18, 100, 30, 100, H('#5a9a3a'));
  for (const [x, y, c] of [[24, 88, '#3a6ad8'], [37, 95, '#e8b830'], [42, 140, '#5a9a3a'], [20, 140, '#e87a9a'], [40, 102, '#c8503a']]) { R.disco(x, y, 2, K); R.disco(x, y, 1, H(c)); }
  // la cesta del pan sobre la nevera
  R.rect(18, 79, 44, 85, K); for (let x = 19; x <= 43; x++) for (let y = 80; y <= 84; y++) R.pset(x, y, (x + y) % 3 ? H('#c8945a') : H('#9a6a34'));
  R.disco(26, 78, 4, K); R.disco(26, 78, 3, H('#d8a050')); R.disco(36, 78, 4, K); R.disco(36, 78, 3, H('#e0b060')); R.pset(25, 76, H('#f0d090')); R.pset(35, 76, H('#f0d090'));
  // la ventana con cortinas, la barra y el alféizar
  R.rect(161, 23, 265, 24, K); R.rect(159, 22, 161, 25, H('#b8844a')); R.rect(264, 22, 266, 25, H('#b8844a'));
  R.rect(174, 28, 252, 96, K); R.rect(175, 29, 251, 95, H('#fbfbf4'));
  R.rect(170, 95, 256, 99, K); R.rect(171, 96, 255, 98, H('#fbfbf4')); R.rect(171, 98, 255, 98, H('#d0ccc0'));
  for (const [x0, x1] of [[162, 178], [248, 264]]) for (let y = 25; y <= 108; y++) for (let x = x0; x <= x1; x++) { const pl = Math.sin((x - x0) * 1.1 + (x0 > 200 ? 1 : 0)), bo = x === x0 || x === x1 || y === 108; R.pset(x, y, bo ? H('#5a7a9a') : pl > 0.6 ? H('#c8dcf0') : pl < -0.5 ? H('#7a9aba') : H('#a0bcd8')); }
  // la encimera de madera, los muebles de abajo y los azulejos
  for (let y = 99; y <= 117; y++) for (let x = 160; x <= 319; x++) { if (x >= 170 && x <= 256 && y <= 99) continue; const j = (y - 99) % 6 === 5 || (x + ((y - 99) / 6 | 0) * 6) % 12 === 0; R.pset(x, y, j ? H('#b8c0c8') : rnd(x, y, 6) < 0.08 ? H('#dce6ee') : (y - 99) % 6 === 0 ? H('#ffffff') : H('#eef4f8')); }
  R.rect(158, 117, 319, 124, K); madera(159, 118, 319, 123, [H('#c8945a'), H('#e0b47a'), H('#9a6a3a')], 7);
  R.rect(159, 125, 319, 151, K);
  for (let k = 0; k < 5; k++) { const x0 = 160 + k * 32; R.rect(x0, 125, x0 + 30, 147, H('#7a9a7a')); R.rect(x0 + 3, 128, x0 + 27, 144, H('#8aaa88')); R.rect(x0 + 3, 128, x0 + 27, 128, H('#6a8a6a')); R.rect(x0 + 27, 128, x0 + 27, 144, H('#6a8a6a')); R.rect(x0 + 3, 144, x0 + 27, 144, H('#a8c4a4')); R.rect(x0 + 14, 130, x0 + 16, 131, H('#e8b830')); }
  R.rect(160, 148, 319, 151, H('#3a4a3a'));
  // el armario de arriba a la derecha, con platos y tazas tras el cristal (debajo de Atom)
  R.rect(266, 52, 316, 94, K); R.rect(267, 53, 315, 93, H('#7a9a7a')); R.rect(270, 56, 289, 90, H('#cfe0e8')); R.rect(293, 56, 312, 90, H('#cfe0e8'));
  for (const yb of [72, 90]) { R.rect(270, yb, 289, yb, H('#6a8a6a')); R.rect(293, yb, 312, yb, H('#6a8a6a')); }
  for (let k = 0; k < 4; k++) { R.disco(274 + k * 4, 66, 4, K); R.disco(274 + k * 4, 66, 3, k % 2 ? H('#f8f8f0') : H('#e87a5a')); R.disco(297 + k * 4, 66, 4, K); R.disco(297 + k * 4, 66, 3, k % 2 ? H('#3a6ad8') : H('#f8f8f0')); }
  for (let k = 0; k < 3; k++) { R.rect(272 + k * 6, 82, 276 + k * 6, 89, K); R.rect(273 + k * 6, 83, 275 + k * 6, 88, [H('#e8b830'), H('#c8503a'), H('#5a9a3a')][k]); R.rect(296 + k * 6, 84, 300 + k * 6, 89, K); R.rect(297 + k * 6, 85, 299 + k * 6, 88, H('#f8f8f0')); }
  R.linea(271, 57, 276, 62, H('#ffffff')); R.linea(294, 57, 299, 62, H('#ffffff'));
  R.rect(290, 70, 291, 76, H('#e8b830'));
  // lo de la encimera: la albahaca, la tostadora, el frutero, la taza y el hervidor en su fuego
  R.rect(166, 108, 176, 117, K); R.rect(167, 109, 175, 116, H('#c8603a')); R.rect(167, 109, 175, 110, H('#e07a4a'));
  for (let k = 0; k < 10; k++) { const x = 166 + (k * 3) % 12, y = 100 + (k * 5) % 9; R.disco(x, y, 2, K); R.disco(x, y, 1, k % 2 ? H('#5aaa4a') : H('#3a8a3a')); }
  R.rect(194, 104, 214, 117, K); R.rect(195, 105, 213, 116, H('#c8ccd8')); R.rect(195, 105, 213, 106, H('#f0f2f8')); R.rect(198, 104, 203, 104, H('#3a3a4a')); R.rect(206, 104, 211, 104, H('#3a3a4a')); R.rect(213, 108, 215, 110, H('#3a3a4a')); R.rect(197, 109, 199, 114, H('#f8f8ff'));
  R.poligono([[222, 110], [248, 110], [244, 117], [226, 117]], K); R.poligono([[223, 111], [247, 111], [243, 116], [227, 116]], H('#3a6ad8'));
  for (const [x, y, c] of [[228, 107, '#e87a2a'], [235, 106, '#c8303a'], [242, 107, '#e8b830'], [232, 103, '#e87a2a'], [239, 103, '#5aaa3a']]) { R.disco(x, y, 3, K); R.disco(x, y, 2, H(c)); R.pset(x - 1, y - 1, H('#ffffff')); }
  R.rect(258, 109, 266, 117, K); R.rect(259, 110, 265, 116, H('#f8f4ec')); R.rect(259, 110, 265, 110, H('#c8503a')); R.linea(266, 111, 268, 113, K); R.linea(268, 113, 266, 115, K);
  R.rect(278, 116, 304, 117, H('#2a2a32'));
  R.disco(291, 109, 7, K); R.rect(284, 109, 298, 116, K); R.disco(291, 109, 6, H('#c8303a')); R.rect(285, 109, 297, 115, H('#c8303a')); R.rect(285, 113, 297, 115, H('#9a1e28'));
  R.pset(288, 105, H('#f08a8a')); R.pset(287, 106, H('#f08a8a')); R.rect(289, 101, 293, 102, K); R.linea(297, 110, 302, 105, K); R.linea(297, 111, 302, 106, H('#c8303a'));
  for (const x of [284, 292, 300]) { R.disco(x, 136, 2, K); R.disco(x, 136, 1, H('#e8e4dc')); }
  // el lazo de la nevera al rodapié: la mancuerna polvorienta y las zapatillas, en el suelo
  R.rect(132, 151, 148, 155, K); R.rect(133, 150, 136, 156, H('#3a3a4a')); R.rect(144, 150, 147, 156, H('#3a3a4a')); R.rect(136, 152, 144, 153, H('#8a8a96'));
  for (let k = 0; k < 12; k++) R.pset(131 + (k * 7) % 18, 148 + (k * 3) % 4, H('#b8b0a0'));
  R.linea(134, 149, 138, 147, H('#d0c8b8'));
  for (const x0 of [154, 166]) { R.rect(x0, 152, x0 + 10, 157, K); R.rect(x0 + 1, 153, x0 + 9, 156, H('#f0f0f0')); R.rect(x0 + 1, 156, x0 + 9, 156, H('#3a6ad8')); R.rect(x0 + 1, 153, x0 + 4, 154, H('#c8303a')); R.pset(x0 + 6, 153, H('#3a3a4a')); R.pset(x0 + 8, 153, H('#3a3a4a')); }
  // el clavo del calendario
  R.linea(118, 30, 124, 26, H('#8a7a6a')); R.linea(130, 30, 124, 26, H('#8a7a6a')); R.disco(124, 26, 1, K);
});
// lo que se ve por la ventana: cielo de nieve tramado, casas de ladrillo con tejados nevados, la calle, un vecino, un
// coche y los copos (recortado al hueco)
const CIELO_N = [H('#8a9ab0'), H('#a0aec2'), H('#b8c4d4'), H('#cdd6e2')];
const ventana1 = (t) => {
  R.recorte([175, 29, 251, 95]);
  for (let y = 29; y <= 64; y++) for (let x = 175; x <= 251; x++) R.pset(x, y, trama(CIELO_N, (y - 29) / 36 * 3, x, y));
  for (const [x0, y0, w, v] of [[160, 38, 20, 1.2], [210, 34, 26, 0.7], [240, 46, 14, 1.8]]) { const x = 175 + ((x0 + t * v * 3) % 100) - 10; R.disco(Math.round(x), y0, Math.round(w / 3), H('#d8e0ea')); R.disco(Math.round(x + w / 3), y0 + 1, Math.round(w / 4), H('#e8eef4')); R.disco(Math.round(x - w / 4), y0 + 2, Math.round(w / 5), H('#c0cad8')); }
  for (const [x0, w, hh, c] of [[172, 26, 30, '#a8583a'], [198, 22, 24, '#8a4a3a'], [220, 34, 34, '#b8684a']]) {
    const top = 86 - hh;
    for (let y = top; y <= 86; y++) for (let x = x0; x < x0 + w; x++) R.pset(x, y, (y - top) % 3 === 2 || (x + ((y - top) / 3 | 0) * 2) % 5 === 0 ? mezC(H(c), K, 0.35) : H(c));
    R.poligono([[x0 - 2, top + 1], [x0 + w / 2, top - 9], [x0 + w + 1, top + 1]], H('#f4f8fc')); R.linea(x0 - 2, top + 1, x0 + w / 2, top - 9, H('#c8d4e0'));
    for (let k = 0; k < Math.floor(w / 9); k++) { const wx = x0 + 3 + k * 9, wy = top + 6; R.rect(wx, wy, wx + 4, wy + 6, H('#3a3040')); R.rect(wx + 1, wy + 1, wx + 3, wy + 5, Math.sin(t * 0.7 + k + x0) > -0.6 ? H('#ffd870') : H('#e8b850')); R.rect(wx, wy + 7, wx + 4, wy + 7, H('#f4f8fc')); }
    R.rect(x0 + w - 6, top - 6, x0 + w - 3, top, H('#5a3a2a'));
    for (let k = 0; k < 4; k++) { const u = ((t * 0.5 + k * 0.25 + x0 * 0.01) % 1); R.pset(Math.round(x0 + w - 5 + u * 6 + Math.sin(u * 6 + k) * 1.5), Math.round(top - 7 - u * 14), mezC(H('#e8eef4'), H('#a0aec2'), u)); }
  }
  for (let y = 86; y <= 95; y++) for (let x = 175; x <= 251; x++) R.pset(x, y, y === 90 || y === 91 ? (x % 7 < 4 ? H('#9aa8b8') : H('#b8c4d4')) : rnd(x, y, 8) < 0.1 ? H('#d8e2ec') : H('#f4f8fc'));
  // el vecino con bufanda roja, que pasea despacio
  { const x = Math.round(lerp(168, 262, (t % 14) / 14)), p = Math.floor(t * 4) % 2; R.rect(x, 79, x + 3, 86, H('#3a3a5a')); R.rect(x, 79, x + 3, 80, H('#c8303a')); R.disco(x + 1, 77, 2, H('#f0c8a0')); R.rect(x - 1, 75, x + 3, 75, H('#2a2a3a')); R.pset(x + (p ? 0 : 3), 87, H('#2a2a3a')); R.pset(x + (p ? 3 : 0), 87, H('#2a2a3a')); }
  // un coche rojo que cruza por delante
  { const x = Math.round(lerp(150, 270, lin(t, 0.9, 3.4))); if (x > 152 && x < 268) { R.rect(x, 86, x + 15, 91, K); R.rect(x + 1, 87, x + 14, 90, H('#c8303a')); R.rect(x + 3, 83, x + 11, 86, K); R.rect(x + 4, 84, x + 10, 86, H('#a8d0e8')); R.rect(x + 1, 87, x + 14, 87, H('#f4f8fc')); R.disco(x + 3, 92, 2, K); R.disco(x + 12, 92, 2, K); R.pset(x + 15, 88, H('#fff0a0')); } }
  // los copos
  for (let k = 0; k < 46; k++) { const y = 29 + ((k * 23 + t * (8 + (k % 3) * 4)) % 67), x = 175 + ((k * 37 + Math.sin(t + k) * 3 + t * 2) % 77); R.pset(Math.round(x), Math.round(y), k % 4 ? H('#ffffff') : H('#e0e8f0')); }
  R.recorte(null);
  // los parteluces de la ventana, encima
  R.rect(212, 29, 214, 95, H('#fbfbf4')); R.rect(175, 61, 251, 63, H('#fbfbf4')); R.rect(215, 29, 215, 95, H('#d0ccc0')); R.rect(175, 64, 251, 64, H('#d0ccc0'));
};
const TEAR = V(0.1036), COGE = TEAR + 0.25, ARRUGA = COGE + 0.2, TIRA = V(0.1418) - 0.1, CAE = TIRA + 0.55;
const p1 = (t) => {
  FONDO1();
  ventana1(t);
  // la lámpara colgante con su luz
  R.linea(214, 0, 214, 17, H('#3a3a4a')); R.poligono([[207, 25], [221, 25], [217, 17], [211, 17]], K); R.poligono([[208, 24], [220, 24], [216, 18], [212, 18]], H('#3a8a5a')); R.rect(212, 19, 213, 22, H('#6ab08a'));
  R.rect(211, 25, 217, 26, Math.sin(t * 9) > -0.9 ? H('#fff4c0') : H('#ffe890'));
  // la aguja del reloj (el segundero corre)
  { const a = t * Math.PI / 2 - Math.PI / 2; R.linea(34, 46, Math.round(34 + Math.cos(a) * 5), Math.round(46 + Math.sin(a) * 5), H('#c8303a')); R.linea(34, 46, 34, 42, K); R.linea(34, 46, 37, 46, K); }
  // el vapor del hervidor (se queda bajo la esquina de Atom)
  for (let k = 0; k < 7; k++) { const u = (t * 0.6 + k / 7) % 1, x = Math.round(303 + u * 4 + Math.sin(u * 7 + k) * 2.5), y = Math.round(103 - u * 40); R.pset(x, y, mezC(H('#ffffff'), H('#f3e7c5'), u)); if (u < 0.6) R.pset(x + 1, y, mezC(H('#ffffff'), H('#f3e7c5'), u + 0.2)); }
  // el calendario: enero hasta que se arranca la hoja; luego febrero, con el 14 marcado
  const feb = t >= TEAR;
  PZ.calendario(R, 124, 100, { mes: feb ? 2 : 1, s: 3, marca: feb ? [14, 14] : undefined });
  if (feb && t < TEAR + 1.4) { const k = lin(t, TEAR, TEAR + 1.4), x = lerp(124, 84, k) + Math.sin(k * 9) * 6, y = lerp(76, 160, k * k); PZ.hojaCalendario(R, Math.round(x), Math.round(y), { mes: 1, s: 2, dia: 31 }); }
  if (feb && t > V(0.1434)) { const e = rebote(t, V(0.1434), 2); glifo('corazon', 135, 63 + Math.round(Math.sin(t * 6)), e, H('#e8304a')); chispas(t, V(0.1434), 142, 70, H('#ffb0c0')); }
  // la lista de propósitos en la nevera (casillas y renglones, sin letras), hasta que la chica la coge
  if (t < COGE) { R.rect(21, 110, 43, 135, H('#9aa4b4')); R.rect(22, 111, 42, 134, H('#fdfdf6')); for (let k = 0; k < 5; k++) { const y = 115 + k * 4; R.rect(24, y, 26, y + 2, H('#7a7a8a')); R.pset(25, y + 1, k === 0 ? H('#3aa04a') : H('#fdfdf6')); R.linea(29, y + 1, 29 + 8 + ((k * 5) % 6), y + 1, H('#6a7aa8')); } R.linea(23, 112, 41, 112, H('#e87a9a')); }
  R.disco(32, 110, 2, K); R.disco(32, 110, 1, H('#c8303a'));
  // el cubo de pedal (la tapa se abre cuando llega la bola)
  const abre = t > CAE - 0.25 && t < CAE + 0.45;
  R.rect(112, 134, 127, 152, K); for (let y = 135; y <= 151; y++) for (let x = 113; x <= 126; x++) R.pset(x, y, x < 116 ? H('#e0e4ec') : x > 123 ? H('#8a909c') : H('#b8bcc8'));
  R.rect(113, 149, 126, 149, H('#6a707c')); R.rect(117, 151, 122, 152, H('#3a3a4a'));
  if (abre) { R.linea(112, 133, 116, 124, K); R.linea(113, 133, 117, 124, H('#c8ccd8')); R.rect(113, 133, 126, 134, H('#2a2a32')); } else { R.rect(111, 131, 128, 134, K); R.rect(112, 132, 127, 133, H('#c8ccd8')); }
  // la chica: lee la lista, se entristece, mira el calendario, arruga la lista y la encesta
  const mira = t > TEAR && t < TEAR + 0.5, lanza = t >= TIRA - 0.35;
  const dir = lanza || mira ? 1 : -1, x = 57;
  const coge = t >= COGE && t < TIRA;
  const a = R.actor(EL.chicaHoy, x, 157, t, { dir, dedo: t > 0.3 && t < V(0.0663), triste: t > V(0.0663) && t < TEAR, sorpresa: mira, sostiene: coge ? (t < ARRUGA ? [52, 128] : [60, 141]) : t >= TIRA && t < TIRA + 0.2 ? [x + 18, 134] : undefined, sonrisa: t > CAE + 0.2 });
  if (coge) { const [mx, my] = a.mano; if (t < ARRUGA) { R.rect(mx - 6, my - 8, mx + 4, my + 4, H('#9aa4b4')); R.rect(mx - 5, my - 7, mx + 3, my + 3, H('#fdfdf6')); R.linea(mx - 4, my - 5, mx + 2, my - 5, H('#6a7aa8')); R.linea(mx - 4, my - 2, mx + 1, my - 2, H('#6a7aa8')); } else { R.disco(mx, my - 1, 3, K); R.disco(mx, my - 1, 2, H('#f4f4ec')); R.pset(mx - 1, my - 2, H('#c8c8c0')); R.pset(mx + 1, my, H('#c8c8c0')); } }
  if (t >= TIRA && t < CAE) { const k = lin(t, TIRA, CAE), bx = lerp(x + 18, 120, k), by = lerp(134, 132, k) - Math.sin(k * Math.PI) * 26; for (let j = 1; j <= 3; j++) { const kk = Math.max(0, k - j * 0.07), tx = lerp(x + 18, 120, kk), ty = lerp(134, 132, kk) - Math.sin(kk * Math.PI) * 26; R.pset(Math.round(tx), Math.round(ty), H('#ffffff')); } R.disco(Math.round(bx), Math.round(by), 4, K); R.disco(Math.round(bx), Math.round(by), 3, H('#f4f4ec')); R.pset(Math.round(bx) - 1, Math.round(by) - 1, H('#c8c8c0')); R.pset(Math.round(bx) + 1, Math.round(by) + 1, H('#c8c8c0')); R.pset(Math.round(bx) + 2, Math.round(by) - 1, H('#b0b0a8')); }
  if (t >= CAE && t < CAE + 0.4) chispas(t, CAE, 120, 128, H('#ffffff'), 4);
};

// ── 2 · la iglesia romana del siglo III: los dos Valentines ──────────────────────────────────────────────────────
const LLEGA_T = V(0.3950), DOS = V(0.4174);
const p2 = (t) => {
  const o = { encuadre: 'iglesia' };
  T.amor(R, t, o);
  const k1 = lin(t, P2 + 0.05, P2 + 1.9), xr = Math.round(lerp(-16, 98, k1));
  const duda = t > V(0.2885) && t < LLEGA_T;
  const dirR = duda ? (Math.floor((t - V(0.2885)) / 0.7) % 2 ? -1 : 1) : 1;
  const k2 = lin(t, LLEGA_T, LLEGA_T + 1.3), xt = Math.round(lerp(332, 194, k2));
  R.actor(EL.valentinRoma, xr, 150, t, { dir: dirR, anda: k1 > 0 && k1 < 1, sonrisa: t > DOS + 0.3, dedo: t > V(0.4274) && t < V(0.4274) + 0.8, habla: t > DOS + 1.2 && Math.sin(t * 9) > 0 });
  if (t > LLEGA_T - 0.05) R.actor(EL.valentinTerni, xt, 150, t, { dir: -1, anda: k2 > 0 && k2 < 1, sonrisa: k2 >= 1, habla: t > DOS + 0.5 && t < DOS + 1.2 && Math.sin(t * 9) > 0 });
  T.amorDelante(R, t, o);
  // «we barely know who…»: el «?» sobre el de Roma, que mira a un lado y a otro
  if (t > V(0.2885)) { const a = 1 - lin(t, LLEGA_T - 0.4, LLEGA_T); glifo('?', xr + 3, 100 + Math.round(Math.sin(t * 5) * 1.5), Math.max(rebote(t, V(0.2885), 2), 1), H('#ffe08a'), a); }
  // «two martyrs»: el 2 entre los dos
  if (t > DOS) { R.numero('2', 152, 104 + (t < DOS + 0.12 ? -3 : 0), { tam: 16, centro: true }); chispas(t, DOS, 152, 96); }
};

// ── 3 · el fresco de los dos santos: Roma y Terni ───────────────────────────────────────────────────────────────
const ROMA = V(0.5484), TERNI = V(0.5957), DUDA = V(0.6388);
const COLISEO = ['..kkkkkkkk..', '.kOOOOOOOOk.', 'kOkOkOkOkOkO', 'kOkOkOkOkOkk', 'kOOOOOOOOOOk', 'kOkOkOkOkOkk', 'kOkOkOkOkOkk', 'kkkkkkkkkkkk'];
const medallon = (cx, cy, t, t0, cual) => {
  if (t < t0) return;
  const r = Math.min(11, Math.round(lin(t, t0, t0 + 0.18) * 11)); if (r < 2) return;
  R.disco(cx, cy, r + 1, K); R.disco(cx, cy, r, H('#e8b830')); R.disco(cx, cy, r - 2, H('#f6ecd0'));
  if (r < 11) return;
  for (let a = 0; a < 16; a++) R.pset(Math.round(cx + Math.cos(a * Math.PI / 8) * 10), Math.round(cy + Math.sin(a * Math.PI / 8) * 10), a % 2 ? H('#a87a18') : H('#fff0a0'));
  if (cual === 'roma') {
    R.dibujo(COLISEO, cx - 6, cy - 4, 1, { k: H('#6a4a2a'), O: H('#d8a860') }); R.rect(cx - 7, cy + 4, cx + 6, cy + 5, H('#8aa04a'));
  } else {
    R.poligono([[cx - 8, cy + 5], [cx - 8, cy - 5], [cx - 2, cy - 7], [cx - 2, cy + 5]], H('#5a7a3a')); R.poligono([[cx + 3, cy + 5], [cx + 3, cy - 7], [cx + 8, cy - 4], [cx + 8, cy + 5]], H('#4a6a32'));
    for (let y = cy - 7; y <= cy + 3; y++) for (let x = cx - 2; x <= cx + 2; x++) R.pset(x, y, (y + Math.floor(t * 12) + x) % 3 ? H('#e8f4ff') : H('#7ab0e0'));
    for (let x = cx - 6; x <= cx + 6; x++) R.pset(x, cy + 4 + ((x + Math.floor(t * 8)) % 2), H('#5a90d0')); R.pset(cx, cy - 8, H('#5a7a3a'));
  }
  chispas(t, t0, cx, cy, H('#fff0a0'), 12);
};
const lucerna = (x, y, t) => { R.rect(x - 3, y, x + 3, y + 2, K); R.rect(x - 2, y, x + 2, y + 1, H('#c87a3a')); R.pset(x + 4, y, K); const f = Math.sin(t * 17) > 0 ? 1 : 0; R.pset(x + 4, y - 1, H('#ffd860')); R.pset(x + 4, y - 2 - f, H('#fff4b0')); R.pset(x + 5, y - 1, H('#f0a030')); };
const p3 = (t) => {
  const o = { encuadre: 'iglesia', camara: 'vitral' };
  T.amor(R, t, o);
  medallon(91, 76, t, ROMA, 'roma');
  medallon(229, 76, t, TERNI, 'terni');
  // la romana entra con la lucerna y la sube; el romano señala; luego hablan
  const k = lin(t, P3 + 0.05, P3 + 1.3), xa = Math.round(lerp(-16, 62, k));
  const sube = t > V(0.5302) && t < ROMA + 0.9;
  const a = R.actor(EL.romana, xa, 166, t, { dir: t > DUDA + 0.2 ? 1 : 1, anda: k > 0 && k < 1, sostiene: sube ? [xa + 19, 134] : [xa + 17, 147], habla: t > DUDA && t < DUDA + 1.2 && Math.sin(t * 9) > 0, sonrisa: t > ROMA && t < DUDA });
  lucerna(a.mano[0], a.mano[1] - 2, t);
  R.actor(EL.romanoPileo2, 236, 166, t, { dir: -1, dedo: t > TERNI - 0.1 && t < TERNI + 0.9, sorpresa: t > DUDA + 0.3 && t < DUDA + 1.0, habla: t > DUDA + 1.2 && t < DUDA + 2.2 && Math.sin(t * 9) > 0 });
  // «So little is certain»: los «?» sobre los medallones
  if (t > DUDA) glifo('?', 86, 46 + Math.round(Math.sin(t * 5)), rebote(t, DUDA, 2), H('#ffe08a'));
  if (t > V(0.6595)) glifo('?', 224, 46 + Math.round(Math.sin(t * 5 + 1)), rebote(t, V(0.6595), 2), H('#ffe08a'));
};

// ── 4 · un despacho del Vaticano en 1969: la casilla del 14 se apaga (fondo local) ──────────────────────────────
const DAMASCO = (x, y) => { const u = (x + 6) % 16, v = (y + ((x + 6) / 16 | 0) % 2 * 8) % 16, d = Math.abs(u - 8) + Math.abs(v - 8); return d === 6 || (d < 3 && (u + v) % 2 === 0); };
const FONDO4 = capa(() => {
  // el damasco granate (la esquina de Atom, lisa y oscura) y el arrimadero de nogal
  for (let y = 0; y < 106; y++) for (let x = 0; x < 320; x++) { const atom = x >= 262 && y <= 50; R.pset(x, y, !atom && DAMASCO(x, y) ? H('#8a2a34') : rnd(x, y, 11) < 0.08 ? H('#5e1820') : H('#6e1e28')); }
  R.rect(0, 0, 319, 2, H('#c8a050')); R.rect(0, 3, 319, 3, H('#5a3a14'));
  R.rect(0, 104, 319, 107, K); R.rect(0, 105, 319, 106, H('#c8a050'));
  madera(0, 108, 319, 151, [H('#6a3a1e'), H('#8a5230'), H('#4a2612')], 12);
  for (let k = 0; k < 8; k++) { const x0 = 4 + k * 40; R.rect(x0, 113, x0 + 34, 145, H('#3a1e0e')); R.rect(x0 + 1, 114, x0 + 33, 114, H('#a86a3a')); R.rect(x0 + 1, 115, x0 + 1, 144, H('#a86a3a')); }
  // el suelo de mármol en damero
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const c = (Math.floor(x / 16) + Math.floor((y - 152) / 8)) % 2, r = rnd(x, y, 13), vena = Math.abs(Math.sin(x * 0.11 + y * 0.31 + c * 2)) < 0.06; R.pset(x, y, c ? (vena ? H('#3a3a44') : r < 0.1 ? H('#2a2a32') : H('#4a4a56')) : (vena ? H('#b8b0a0') : r < 0.1 ? H('#d8d0c0') : H('#ece6d8'))); }
  R.rect(0, 151, 319, 152, H('#2a1a10'));
  // la ventana en arco con las cortinas de terciopelo
  R.rect(14, 22, 76, 102, K); R.disco(45, 34, 31, K);
  R.rect(17, 34, 73, 99, H('#e8e0cc')); R.disco(45, 34, 28, H('#e8e0cc'));
  // el crucifijo de madera
  R.rect(232, 36, 236, 66, K); R.rect(225, 43, 243, 47, K); R.rect(233, 37, 235, 65, H('#8a5230')); R.rect(226, 44, 242, 46, H('#8a5230')); R.rect(233, 44, 235, 46, H('#c8a050'));
  // la hornacina con la estatuilla del santo (túnica blanca, aureola, sin rostro) y el velero de las velas
  R.rect(84, 60, 104, 104, K); R.disco(94, 62, 10, K); R.rect(85, 62, 103, 103, H('#3a1418')); R.disco(94, 62, 9, H('#3a1418'));
  R.disco(94, 64, 4, H('#e8b830')); R.disco(94, 66, 3, H('#e8c8a0')); R.poligono([[89, 70], [99, 70], [101, 96], [87, 96]], H('#f2eee2')); R.linea(94, 72, 94, 95, H('#c8c0b0')); R.linea(91, 74, 88, 92, H('#c8c0b0')); R.linea(99, 76, 102, 84, H('#4a8a3a')); R.pset(100, 82, H('#6ab04a'));
  R.rect(86, 97, 102, 102, H('#c8a050')); R.rect(86, 101, 102, 102, H('#8a6a28'));
});
const VENTANA4 = (t) => {
  R.recorte([17, 6, 73, 99]);
  for (let y = 6; y <= 99; y++) for (let x = 17; x <= 73; x++) { const dx = x - 45, dy = y - 34; if (y < 34 && dx * dx + dy * dy > 28 * 28) continue; R.pset(x, y, trama([H('#5a8ad8'), H('#7aa4e4'), H('#a0c0ec'), H('#d0dcec')], (y - 6) / 70 * 3, x, y)); }
  for (const [x0, y, w, v] of [[20, 26, 16, 1], [60, 40, 12, 1.8], [40, 16, 10, 0.6]]) { const x = 14 + ((x0 + t * v * 2) % 70); R.disco(Math.round(x), y, Math.round(w / 3), H('#f4f8fc')); R.disco(Math.round(x + w / 3), y + 1, Math.round(w / 4), H('#ffffff')); R.disco(Math.round(x - w / 4), y + 2, Math.round(w / 5), H('#c8d4e4')); }
  // la cúpula con su linterna, el tambor con columnas y los tejados de Roma
  R.disco(46, 70, 15, H('#8a96a8')); R.disco(45, 69, 14, H('#a8b4c4')); R.disco(42, 66, 9, H('#c0cad8'));
  for (let k = -3; k <= 3; k++) R.linea(46 + k * 4, 70, 46 + k * 2, 56, H('#7a8698'));
  R.rect(31, 70, 61, 84, H('#d8ccb0')); for (let x = 32; x <= 60; x += 4) R.rect(x, 72, x + 1, 83, H('#a89a80'));
  R.rect(43, 50, 49, 56, H('#d8ccb0')); R.rect(45, 46, 47, 50, H('#a8b4c4')); R.pset(46, 44, H('#e8b830')); R.pset(46, 45, H('#e8b830'));
  for (let x = 17; x <= 73; x++) { const ty = 84 + Math.round(Math.sin(x * 0.4) * 1.5) + (x % 13 < 6 ? 0 : 3); for (let y = ty; y <= 99; y++) R.pset(x, y, (y - ty) % 3 === 0 ? H('#a85a34') : (x + y) % 4 ? H('#c8784a') : H('#e0a070')); }
  // las palomas
  for (let k = 0; k < 3; k++) { const u = ((t * 0.12 + k * 0.33) % 1), x = Math.round(lerp(78, 10, u)), y = Math.round(30 + k * 12 + Math.sin(u * 12 + k) * 4), al = Math.floor(t * 8 + k) % 2; R.pset(x, y, H('#5a5a6a')); R.pset(x + 1, y, H('#5a5a6a')); R.pset(x - 1, y - 1 + al * 2, H('#3a3a4a')); R.pset(x + 2, y - 1 + al * 2, H('#3a3a4a')); }
  R.recorte(null);
  R.rect(44, 6, 46, 99, H('#e8e0cc')); R.rect(17, 58, 73, 60, H('#e8e0cc'));
  // las cortinas
  for (const [x0, x1] of [[8, 22], [68, 82]]) for (let y = 14; y <= 106; y++) for (let x = x0; x <= x1; x++) { if (y > 70 && (x0 < 30 ? x > x0 + 6 + (y - 70) * 0.1 : x < x1 - 6 - (y - 70) * 0.1)) continue; const pl = Math.sin((x - x0) * 1.2 + y * 0.02 + Math.sin(t * 0.8) * 0.2); R.pset(x, y, x === x0 || x === x1 ? K : pl > 0.5 ? H('#b83a40') : pl < -0.4 ? H('#5a1418') : H('#8a2028')); }
  R.rect(6, 12, 84, 14, H('#c8a050')); R.rect(6, 14, 84, 14, H('#8a6a28'));
  for (const x of [15, 75]) { R.rect(x - 2, 72, x + 2, 74, H('#e8b830')); R.linea(x, 74, x, 80, H('#e8b830')); }
};
// el calendario litúrgico de 1969: cabecera morada con el año, febrero de 1969 (el 1 es sábado) y una marca de color
// por fiesta; la casilla del 14 (palma y corazón) se apaga despacio
const CAL4 = (t, apaga) => {
  const x0 = 112, y0 = 27, x1 = 210, y1 = 100;
  R.linea(161, 22, x0 + 10, y0, H('#3a2a20')); R.linea(161, 22, x1 - 10, y0, H('#3a2a20')); R.disco(161, 22, 1, H('#c8a050'));
  R.rect(x0 - 1, y0 - 1, x1 + 2, y1 + 2, K); R.rect(x0 + 1, y0 + 1, x1 + 2, y1 + 2, H('#3a1418'));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, rnd(x, y, 14) < 0.06 ? H('#e8dcc0') : H('#f8f0dc'));
  R.rect(x0, y0, x1, y0 + 16, H('#5a2a7a')); R.rect(x0, y0 + 16, x1, y0 + 17, H('#e8b830'));
  for (let x = x0 + 2; x < x1; x += 6) R.pset(x, y0 + 2, H('#8a5aaa'));
  R.numero('1969', 161, y0 + 13, { centro: true });
  R.disco(x0 + 10, y0 + 8, 4, H('#e8b830')); R.rect(x0 + 9, y0 + 4, x0 + 11, y0 + 12, H('#5a2a7a')); R.rect(x0 + 6, y0 + 7, x0 + 14, y0 + 9, H('#5a2a7a'));
  R.disco(x1 - 10, y0 + 8, 4, H('#e8b830')); R.rect(x1 - 11, y0 + 4, x1 - 9, y0 + 12, H('#5a2a7a')); R.rect(x1 - 14, y0 + 7, x1 - 6, y0 + 9, H('#5a2a7a'));
  const gx = x0 + 3, gy = y0 + 21, cw = 13, ch = 10;
  const fiesta = (d) => [2, 11, 22, 24].includes(d) ? H('#f2eee2') : [3, 5, 6, 23].includes(d) ? H('#c8303a') : d % 7 === 2 ? H('#5a2a7a') : H('#3a8a4a');
  for (let d = 1; d <= 28; d++) {
    const i = (d + 5) % 7, f = Math.floor((d + 5) / 7), cx = gx + i * cw, cy = gy + f * ch;
    R.rect(cx, cy, cx + cw - 2, cy + ch - 2, H('#d8c8a8')); R.rect(cx + 1, cy + 1, cx + cw - 3, cy + ch - 3, i === 0 ? H('#f8e0d8') : H('#fffaf0'));
    for (let k = 0; k < Math.min(d, 9); k++) R.pset(cx + 2 + (k % 3) * 2, cy + 2 + Math.floor(k / 3) * 2, k % 2 ? H('#8a7a6a') : H('#5a4a3a'));
    if (d !== 14) { R.rect(cx + 7, cy + 2, cx + 9, cy + 4, fiesta(d)); R.pset(cx + 7, cy + 2, K); }
    else {
      const gris = (c) => mezC(c, H('#c8c4bc'), apaga * 0.9);
      R.rect(cx + 1, cy + 1, cx + cw - 3, cy + ch - 3, gris(H('#ffe0e4')));
      R.rect(cx - 1, cy - 1, cx + cw - 1, cy - 1, gris(H('#c8303a'))); R.rect(cx - 1, cy + ch - 1, cx + cw - 1, cy + ch - 1, gris(H('#c8303a'))); R.rect(cx - 1, cy - 1, cx - 1, cy + ch - 1, gris(H('#c8303a'))); R.rect(cx + cw - 1, cy - 1, cx + cw - 1, cy + ch - 1, gris(H('#c8303a')));
      for (const [i2, j2] of [[0, 0], [1, 0], [3, 0], [4, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [2, 3]]) R.pset(cx + 3 + i2, cy + 3 + j2, gris(H('#e8304a')));
      R.linea(cx + 9, cy + 7, cx + 9, cy + 2, gris(H('#3a8a3a'))); R.pset(cx + 8, cy + 3, gris(H('#5aaa4a'))); R.pset(cx + 10, cy + 4, gris(H('#5aaa4a')));
    }
  }
};
const TECLEA = P4 + 0.05, SEÑALA = V(0.8087), APAGA0 = V(0.8286), APAGA1 = V(0.8742), ENTRA = V(0.9107) - 0.9, VELA = V(0.9447);
const p4 = (t) => {
  FONDO4();
  VENTANA4(t);
  const apaga = lin(t, APAGA0, APAGA1);
  CAL4(t, apaga);
  // el reloj de péndulo, a la derecha (debajo de Atom)
  R.rect(252, 54, 272, 104, K); R.rect(253, 55, 271, 103, H('#6a3a1e')); R.disco(262, 64, 7, K); R.disco(262, 64, 6, H('#f2ead8'));
  for (let a = 0; a < 12; a++) R.pset(Math.round(262 + Math.cos(a * Math.PI / 6) * 4.6), Math.round(64 + Math.sin(a * Math.PI / 6) * 4.6), K);
  R.linea(262, 64, 262, 60, K); R.linea(262, 64, 265, 66, K);
  R.rect(256, 74, 268, 100, H('#2a1408')); { const an = Math.sin(t * Math.PI) * 0.35, px = Math.round(262 + Math.sin(an) * 18), py = Math.round(76 + Math.cos(an) * 18); R.linea(262, 76, px, py, H('#c8a050')); R.disco(px, py, 2, H('#e8b830')); }
  // el velero de las velas bajo la hornacina; la vela nueva se enciende en «honored»
  R.rect(80, 120, 108, 124, K); R.rect(81, 121, 107, 123, H('#3a2a20')); R.rect(92, 125, 95, 151, H('#3a2a20'));
  for (let k = 0; k < 6; k++) { const x = 83 + k * 4, nueva = k === 5, on = !nueva || t > VELA; R.rect(x, 115, x + 2, 120, H('#f4ecd8')); R.pset(x + 2, 115, H('#d8ccb0')); if (on) { const f = Math.sin(t * 13 + k * 2) > 0 ? 1 : 0; R.pset(x + 1, 114, H('#ffd860')); R.pset(x + 1, 113 - f, H('#fff4b0')); R.pset(x + 1 + (f ? 1 : -1), 113, H('#f0a030')); if (!nueva || t > VELA + 0.1) R.pset(x + 1, 112 - f, H('#fff8d8')); } }
  if (t > VELA) { const g = Math.sin(t * 11) > 0 ? 1 : 0; for (let a = 0; a < 10; a++) R.pset(Math.round(104 + Math.cos(a * 0.63) * (5 + g)), Math.round(113 + Math.sin(a * 0.63) * (5 + g)), H('#ffe890')); chispas(t, VELA, 104, 112); }
  // el obispo: teclea, se levanta, señala el calendario mientras la casilla se apaga, y sonríe a la abuela
  const vaY = lin(t, SEÑALA - 0.6, SEÑALA - 0.05), xo = Math.round(lerp(236, 214, vaY)), vuelve = t > ENTRA + 1.2;
  const teclea = t < SEÑALA - 0.6;
  R.actor(EL.obispo, xo, 146, t, { dir: vuelve ? -1 : teclea ? 1 : -1, anda: vaY > 0 && vaY < 1, dedo: t > SEÑALA && t < APAGA1 + 0.3, sonrisa: t > VELA, habla: t > APAGA1 + 0.3 && t < ENTRA + 1.2 && Math.sin(t * 8) > 0, sostiene: teclea ? [xo + 18, 137 + (Math.floor(t * 10) % 2)] : undefined });
  // la abuela entra por la izquierda y enciende la vela
  if (t > ENTRA) { const k = lin(t, ENTRA, ENTRA + 1.5), xa = Math.round(lerp(-16, 62, k)); const a = R.actor(EL.abuela62, xa, 156, t, { dir: 1, anda: k > 0 && k < 1, sostiene: t > VELA - 0.5 && t < VELA + 0.6 ? [96, 116] : undefined, sonrisa: t > VELA + 0.2 }); if (t > VELA - 0.5 && t < VELA + 0.6) { const [mx, my] = a.mano; R.linea(mx, my, mx + 4, my - 4, H('#f4ecd8')); R.pset(mx + 5, my - 5, H('#ffd860')); } }
  // el escritorio de nogal, delante: la máquina de escribir, la lámpara verde, el teléfono, los papeles y el tintero
  R.rect(150, 141, 300, 179, K); madera(151, 142, 299, 179, [H('#6a3a1e'), H('#8a5230'), H('#4a2612')], 15); R.rect(151, 142, 299, 144, H('#a86a3a'));
  for (const x0 of [160, 230]) { R.rect(x0, 152, x0 + 56, 174, H('#4a2612')); R.rect(x0 + 1, 153, x0 + 55, 153, H('#a86a3a')); R.rect(x0 + 26, 160, x0 + 30, 162, H('#c8a050')); }
  R.rect(256, 128, 284, 142, K); R.rect(257, 129, 283, 141, H('#3a3a44')); R.rect(257, 129, 283, 130, H('#5a5a68'));
  for (let k = 0; k < 12; k++) R.pset(259 + (k % 6) * 4, 134 + Math.floor(k / 6) * 3, H('#d8d8e0'));
  R.rect(261, 118, 279, 128, K); R.rect(262, 119, 278, 128, H('#fbf8f0')); const lineas = Math.floor(lin(t, P4, SEÑALA - 0.6) * 4); for (let k = 0; k < lineas; k++) R.linea(264, 121 + k * 2, 271 + (k * 3) % 6, 121 + k * 2, H('#5a5a6a'));
  R.rect(257, 126, 283, 128, H('#2a2a32'));
  R.rect(166, 132, 184, 136, K); R.rect(167, 133, 183, 135, H('#2a6a3a')); R.rect(167, 133, 183, 133, H('#5aa06a')); R.rect(174, 137, 176, 141, H('#c8a050')); R.rect(169, 140, 181, 141, H('#c8a050'));
  for (let y = 137; y <= 141; y++) for (let x = 164 - (y - 137); x <= 186 + (y - 137); x++) if (rnd(x, y, 16) < 0.25) R.pset(x, y, H('#fff0b0'));
  R.rect(196, 135, 210, 141, K); R.rect(197, 136, 209, 140, H('#1e1e24')); R.disco(203, 134, 3, K); R.rect(195, 131, 211, 133, K); R.rect(196, 131, 210, 132, H('#2a2a32')); R.disco(203, 138, 2, H('#c8c8d0'));
  R.rect(214, 136, 232, 141, H('#e8e0cc')); R.rect(215, 135, 231, 135, H('#fbf8f0')); R.rect(216, 134, 230, 134, H('#fbf8f0'));
  R.rect(288, 136, 294, 141, K); R.rect(289, 137, 293, 140, H('#1a1a2a')); R.linea(292, 136, 297, 128, H('#f4ecd8'));
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  efectos: [[TEAR + 0.05, 'whoosh'], [ARRUGA, 'papel'], [CAE, 'golpecito'], [V(0.2885), 'pop'], [DOS, 'brillo'], [ROMA, 'brillo'], [TERNI, 'brillo'], [DUDA, 'pop'], [TECLEA + 0.1, 'tecleo'], [VELA, 'brillo']],
  año: (t) => (t < P2 ? 2026 : t < P4 ? 270 : 1969),
});
''')

E['tr-chaucer'] = ('Chaucer', '''// TR-CHAUCER (frase 9), sin cartela. Tres planos:
// 1. la plaza romana del Lupercal (fondo local): la loba de bronce con los gemelos sobre su pedestal, la cueva, la
//    higuera, el templo y el puesto de fruta; un romano la señala en «Roman festival», pasa una cabra, y el «?» que sale
//    en «replaced» crece en «Lupercalia» y se deshace antes del corte;
// 2. en «but there's no document»: el gabinete de Chaucer: busca en un códice de la librería y sale una «X»; en
//    «love» le sale un corazón, va al pupitre y en «Chaucer» moja la pluma y escribe; la criada entra y sale;
// 3. en «who around 1380»: la ventana de cerca: Chaucer escribe en su rollo mirando la rama; llega un pájaro y se
//    posa junto al que estaba solo; en «chose its mate» salen corazones sobre las parejas y Chaucer sonríe y señala.''', COMUN + r'''
const C9 = (f) => en('chaucer', f);
const P2 = C9(0.3193), P3 = C9(0.6835);

// ── 1 · el Lupercal: la loba de bronce (fondo local) ───────────────────────────────────────────────────────────
const CIELO = [H('#4a7ac8'), H('#6a96d8'), H('#8ab2e4'), H('#b0ccec'), H('#d8e4ee')];
const FONDO1 = capa(() => {
  for (let y = 0; y < 110; y++) for (let x = 0; x < 320; x++) R.pset(x, y, trama(CIELO, Math.min(4, y / 100 * 4.2), x, y));
  // colinas lejanas
  for (let x = 0; x < 320; x++) { const h1 = 84 + Math.round(Math.sin(x * 0.025 + 1) * 5 + Math.sin(x * 0.09) * 2); for (let y = h1; y < 112; y++) R.pset(x, y, (x + y) % 3 ? H('#8aa0a8') : H('#7a909a')); }
  // el templo del fondo: podio, seis columnas, frontón (sin letras)
  R.rect(194, 84, 262, 96, K); R.rect(195, 85, 261, 95, H('#e8dcc4')); R.rect(195, 85, 261, 86, H('#fff4e0'));
  R.poligono([[192, 58], [228, 44], [264, 58]], K); R.poligono([[195, 57], [228, 46], [261, 57]], H('#c8603a')); R.poligono([[201, 57], [228, 49], [255, 57]], H('#e8dcc4'));
  R.rect(193, 58, 263, 62, K); R.rect(194, 59, 262, 61, H('#f2e8d0'));
  for (let k = 0; k < 6; k++) { const x = 198 + k * 12; for (let y = 64; y <= 84; y++) for (let xx = x + 6; xx < x + 12 && xx < 262; xx++) R.pset(xx, y, H('#6a5a4a')); R.rect(x, 64, x + 5, 84, H('#e8dcc4')); R.rect(x + 1, 64, x + 2, 84, H('#fffaf0')); R.rect(x + 5, 64, x + 5, 84, H('#a89a80')); R.rect(x - 1, 63, x + 6, 64, H('#c8bca0')); }
  // las casas de vecinos de la derecha: estuco ocre, tejas, ventanucos y una pérgola con parra
  for (const [bx, w, top, c, s] of [[184, 32, 106, '#d8a070', 1], [214, 28, 100, '#e8c090', 2], [240, 38, 104, '#c8885a', 3], [276, 44, 98, '#e0b080', 4]]) {
    R.rect(bx, top, bx + w, 140, K);
    for (let y = top + 1; y <= 140; y++) for (let x = bx + 1; x < bx + w; x++) { const r = rnd(x, y, 50 + s); R.pset(x, y, r < 0.1 ? mezC(H(c), K, 0.2) : r > 0.93 ? mezC(H(c), H('#ffffff'), 0.25) : x > bx + w - 4 ? mezC(H(c), K, 0.15) : H(c)); }
    R.poligono([[bx - 2, top + 1], [bx + w / 2, top - 6], [bx + w + 2, top + 1]], K); R.poligono([[bx - 1, top], [bx + w / 2, top - 5], [bx + w + 1, top]], H('#b8582a'));
    for (let x = bx; x <= bx + w; x += 3) R.linea(x, top, bx + w / 2 + (x - bx - w / 2) * 0.3, top - 4, H('#8a3a1e'));
    for (let wy = top + 6; wy < 132; wy += 12) for (let wx = bx + 5; wx < bx + w - 6; wx += 10) { R.rect(wx, wy, wx + 4, wy + 5, K); R.rect(wx + 1, wy + 1, wx + 3, wy + 4, H('#3a2a20')); R.rect(wx, wy + 6, wx + 4, wy + 6, H('#f2e6c8')); }
  }
  R.rect(214, 124, 244, 125, H('#6a4a2a')); for (let k = 0; k < 18; k++) { const x = 215 + (k * 7) % 29, y = 122 + (k % 3); R.pset(x, y, H('#4a8a3a')); R.pset(x + 1, y - 1, H('#6aaa4a')); if (k % 5 === 0) R.pset(x, y + 2, H('#6a2a7a')); }
  // el Palatino a la izquierda: ladera con pinos piñoneros y cipreses
  for (let x = 0; x < 190; x++) { const top = Math.round(48 + Math.pow(x / 190, 1.6) * 64 + Math.sin(x * 0.2) * 1.5); for (let y = top; y < 140; y++) { const r = rnd(x, y, 21); R.pset(x, y, r < 0.12 ? H('#4a6a2a') : r > 0.88 ? H('#8aa04a') : (x + y) % 5 === 0 ? H('#5a7a32') : H('#6a8a3a')); } }
  for (const [px, py, r] of [[22, 46, 12], [64, 56, 10], [108, 74, 9]]) { R.linea(px, py, px - 2, py + 18, H('#4a3020')); R.linea(px + 1, py, px - 1, py + 18, H('#5a3a28')); R.disco(px, py - 2, r + 1, H('#1e3a1e')); for (let k = 0; k < 40; k++) { const a = rnd(k, px, 22) * Math.PI, d = rnd(k, py, 23) * r; R.pset(Math.round(px + Math.cos(a) * d * 1.3), Math.round(py - 2 - Math.sin(a) * d * 0.55), k % 3 ? H('#3a6a2a') : H('#5a8a3a')); } R.rect(px - r, py - 1, px + r, py + 1, H('#1e3a1e')); }
  for (const [cx, cy] of [[142, 82], [152, 86], [176, 92]]) { for (let y = 0; y < 26; y++) { const w = Math.round(Math.sin(y / 26 * Math.PI) * 3.5 + 0.5); for (let x = -w; x <= w; x++) R.pset(cx + x, cy - 26 + y, x < 0 ? H('#2a4a22') : (x + y) % 3 ? H('#1e3a1a') : H('#3a5a2a')); } R.pset(cx, cy, H('#4a3020')); }
  // la cueva del Lupercal con su hiedra
  R.disco(44, 116, 20, K); R.rect(24, 116, 64, 140, K); R.disco(44, 116, 18, H('#2a2018')); R.rect(26, 116, 62, 140, H('#2a2018')); R.disco(44, 120, 12, H('#140e0a')); R.rect(32, 120, 56, 140, H('#140e0a'));
  for (let k = 0; k < 60; k++) { const a = rnd(k, 1, 24) * Math.PI, x = Math.round(44 + Math.cos(a) * (18 + rnd(k, 2, 24) * 5)), y = Math.round(118 - Math.sin(a) * (18 + rnd(k, 3, 24) * 5)); R.pset(x, y, k % 3 ? H('#3a7a2a') : H('#6aaa4a')); R.pset(x, y + 1, H('#2a5a1e')); }
  for (let y = 98; y < 140; y++) { R.pset(24 + ((y * 3) % 4), y, H('#5a4a3a')); R.pset(63 - ((y * 5) % 3), y, H('#5a4a3a')); }
  // la higuera
  R.linea(98, 140, 100, 104, H('#5a4030')); R.linea(99, 140, 101, 104, H('#7a5a40')); R.linea(100, 112, 92, 102, H('#5a4030')); R.linea(101, 108, 110, 98, H('#5a4030'));
  for (let k = 0; k < 70; k++) { const x = Math.round(100 + (rnd(k, 5, 25) - 0.5) * 30), y = Math.round(98 + (rnd(k, 6, 25) - 0.5) * 18); R.rect(x, y, x + 1, y + 1, k % 4 ? H('#3a7a2a') : H('#5aa03a')); if (k % 9 === 0) R.pset(x, y + 2, H('#6a3a6a')); }
  // la plaza enlosada de basalto
  for (let y = 140; y < 180; y++) { const fila = Math.floor((y - 140) / 6), jy = (y - 140) % 6 === 5; for (let x = 0; x < 320; x++) { const w = 9 + Math.floor(rnd(fila, Math.floor((x + fila * 5) / 11), 26) * 5), jx = (x + fila * 5) % w === 0, r = rnd(x, y, 27); R.pset(x, y, jy || jx ? H('#2e2c34') : r < 0.1 ? H('#4a4854') : r > 0.92 ? H('#7a7884') : (y - 140) % 6 === 0 ? H('#6a6874') : H('#5a5864')); } }
  for (let k = 0; k < 24; k++) { const x = (k * 47) % 320, y = 141 + (k * 13) % 36; R.pset(x, y, H('#5a8a3a')); R.pset(x + 1, y - 1, H('#7aaa4a')); }
  R.rect(0, 139, 319, 140, H('#8a8478'));
  // el pedestal de mármol con su guirnalda
  R.rect(124, 110, 196, 116, K); R.rect(125, 111, 195, 115, H('#f2ece0')); R.rect(125, 115, 195, 115, H('#c8c0b0'));
  R.rect(129, 116, 191, 146, K); for (let y = 117; y <= 145; y++) for (let x = 130; x <= 190; x++) { const v = Math.abs(Math.sin(x * 0.13 + y * 0.29)) < 0.05; R.pset(x, y, v ? H('#c8c0b4') : x > 184 ? H('#d0c8b8') : x < 134 ? H('#fffaf2') : H('#ece6d8')); }
  R.rect(124, 146, 196, 152, K); R.rect(125, 147, 195, 151, H('#e8e2d4')); R.rect(125, 147, 195, 147, H('#fffaf0'));
  for (let x = 140; x <= 180; x++) { const y = 124 + Math.round(Math.sin((x - 140) / 40 * Math.PI) * 9); R.pset(x, y, H('#a8b890')); R.pset(x, y + 1, H('#8aa070')); if (x % 4 === 0) R.pset(x, y - 1, H('#c8d4b0')); }
  R.disco(140, 124, 2, H('#c8c0b0')); R.disco(180, 124, 2, H('#c8c0b0'));
  // la loba de bronce: cuerpo, patas, cabeza vuelta, orejas y cola; los gemelos bajo el vientre
  const BR = [H('#4a2e14'), H('#7a4e22'), H('#a8742e'), H('#d8a050')];
  const lobaM = (x, y) => { const dx = (x - 162) / 24, dy = (y - 92) / 8; if (dx * dx + dy * dy < 1) return true; const hx = (x - 138) / 7, hy = (y - 84) / 6; if (hx * hx + hy * hy < 1) return true; if (x >= 134 && x <= 150 && y >= 84 && y <= 96 && y > 84 + (150 - x) * 0.25) return true; if (x >= 126 && x <= 134 && y >= 85 && y <= 89 + (x - 126) * 0.2) return true; if ((x >= 142 && x <= 145 || x >= 149 && x <= 152 || x >= 172 && x <= 175 || x >= 179 && x <= 182) && y >= 92 && y <= 110) return true; if (x >= 134 && x <= 137 && y >= 77 && y <= 81 + (x - 134)) return true; if (x >= 140 && x <= 143 && y >= 76 && y <= 80 + (x - 140)) return true; const tx = x - 186; if (tx >= 0 && tx <= 6 && Math.abs(y - (92 + tx * 1.6)) < 1.6) return true; return false; };
  for (let y = 72; y <= 111; y++) for (let x = 120; x <= 196; x++) { if (!lobaM(x, y)) { if (lobaM(x + 1, y) || lobaM(x - 1, y) || lobaM(x, y + 1) || lobaM(x, y - 1)) R.pset(x, y, K); continue; } const luz = !lobaM(x, y - 2) ? 3 : !lobaM(x - 2, y - 1) ? 2 : !lobaM(x, y + 2) ? 0 : 1, mel = (x > 136 && x < 154 && (x + y) % 4 === 0 && y < 92) ? 0 : luz; R.pset(x, y, BR[mel]); }
  R.pset(131, 86, K); R.pset(127, 87, K); R.pset(137, 82, H('#fff0a0')); R.linea(128, 89, 133, 89, H('#4a2e14'));
  for (let k = 0; k < 6; k++) R.pset(156 + k * 3, 99, H('#a8742e'));
  for (const gx of [156, 168]) { R.disco(gx, 104, 3, K); R.disco(gx, 104, 2, BR[2]); R.disco(gx + 1, 99, 3, K); R.disco(gx + 1, 99, 2, BR[2]); R.pset(gx, 98, BR[3]); R.rect(gx - 3, 108, gx + 3, 110, BR[1]); R.rect(gx - 3, 108, gx + 3, 108, K); }
  // el puesto de fruta con su toldo de rayas (delante va la frutera)
  R.rect(244, 104, 316, 108, K); for (let x = 245; x <= 315; x++) { const c = Math.floor((x - 245) / 6) % 2 ? H('#f2ece0') : H('#c8303a'); R.rect(x, 105, x, 112 + (Math.floor((x - 245) / 6) % 2 ? 0 : 1), c); }
  for (let x = 245; x <= 315; x += 6) R.rect(x, 113, x + 2, 114, H('#c8303a'));
  R.rect(246, 108, 247, 150, H('#5a3a28')); R.rect(312, 108, 313, 150, H('#5a3a28'));
});
const cabra = (x, y, t, anda) => {
  const p = anda ? Math.floor(t * 6) % 2 : 0, G = H('#f2ece0'), g = H('#c8bca8'), M = H('#7a5a3a');
  R.rect(x, y - 7, x + 11, y - 3, K); R.rect(x + 1, y - 6, x + 10, y - 4, G); R.rect(x + 1, y - 4, x + 10, y - 4, g);
  R.rect(x - 4, y - 11, x, y - 6, K); R.rect(x - 3, y - 10, x - 1, y - 7, G); R.pset(x - 3, y - 9, K); R.linea(x - 1, y - 11, x + 1, y - 14, M); R.linea(x - 2, y - 11, x - 1, y - 14, M); R.pset(x - 3, y - 6, g); R.pset(x - 3, y - 5, g);
  R.linea(x + 11, y - 7, x + 13, y - 9, G);
  for (const [lx, ph] of [[x + 1, p], [x + 3, 1 - p], [x + 8, p], [x + 10, 1 - p]]) R.linea(lx, y - 3, lx + (ph ? 1 : 0), y, K);
};
const PREG = C9(0.1420), LUPER = C9(0.2545), BORRA0 = P2 - 0.8;
const p1 = (t) => {
  FONDO1();
  // nubes a tres velocidades (lejos de la esquina de Atom) y golondrinas
  for (const [x0, y, w, v] of [[30, 33, 30, 1.2], [150, 32, 40, 0.7], [250, 36, 22, 2.0], [90, 30, 16, 1.6]]) { const x = ((x0 + t * v * 3) % 380) - 30; R.nube(Math.round(x), y, w); }
  for (let k = 0; k < 3; k++) { const u = ((t * 0.15 + k * 0.3) % 1), x = Math.round(lerp(10, 240, u)), y = Math.round(36 + k * 9 + Math.sin(u * 20 + k) * 3), al = Math.floor(t * 9 + k) % 2; R.pset(x, y, H('#2a2a3a')); R.pset(x - 1, y - al, H('#2a2a3a')); R.pset(x + 1, y - al, H('#2a2a3a')); }
  // la frutera tras su puesto
  R.actor(EL.romana, 272, 140, t, { dir: -1, habla: t > 0.6 && t < 2.0 && Math.sin(t * 9) > 0 });
  R.rect(244, 128, 316, 150, K); madera(245, 129, 315, 149, [H('#8a5a34'), H('#a8744a'), H('#6a4024')], 28);
  for (const [x, c] of [[252, '#e87a2a'], [262, '#c8303a'], [274, '#6a2a7a'], [286, '#e8b830'], [298, '#5aaa3a'], [306, '#e87a2a']]) { R.disco(x, 127, 4, K); R.disco(x, 127, 3, H(c)); R.pset(x - 1, 126, H('#ffffff')); }
  for (const x of [256, 296]) { R.rect(x - 3, 138, x + 3, 148, K); R.rect(x - 2, 139, x + 2, 147, H('#c8784a')); R.rect(x - 1, 136, x + 1, 138, H('#c8784a')); }
  // el romano que cuenta la historia y el que llega y señala la loba
  R.actor(EL.romanoPileo2, 82, 156, t, { dir: 1, habla: t > C9(0.0489) && t < PREG && Math.sin(t * 9) > 0, sorpresa: t > LUPER && t < LUPER + 0.8, triste: t > LUPER + 0.8 });
  const k = lin(t, 0.3, 2.4), xp = Math.round(lerp(332, 206, k));
  R.actor(EL.romanoPileo, xp, 158, t, { dir: -1, anda: k > 0 && k < 1, dedo: t > C9(0.1841) && t < LUPER + 0.6, sonrisa: t > C9(0.1841) && t < LUPER });
  // una cabra cruza la plaza (las Lupercales tenían cabras)
  { const kc = lin(t, 0.8, 5.8), xc = Math.round(lerp(330, 220, kc)); cabra(xc, 172, t, kc > 0 && kc < 1); }
  // el «?» sobre la loba: sale en «replaced», crece en «Lupercalia» y se deshace antes del corte
  if (t > PREG) { const esc = t > LUPER ? rebote(t, LUPER, 3) : rebote(t, PREG, 2), a = 1 - lin(t, BORRA0, P2 - 0.1); const w = 5 * esc; glifo('?', 160 - w / 2, (t > LUPER ? 40 : 48) + Math.round(Math.sin(t * 4) * 1.5), esc, H('#ffe08a'), a); if (t > LUPER) chispas(t, LUPER, 160, 52); }
};

// ── 2 · el gabinete de Chaucer: ningún documento; luego el amor y la pluma ──────────────────────────────────────
const NODOC = C9(0.3420), XX = C9(0.3829), AMOR = C9(0.4858), VA0 = C9(0.4574), VA1 = C9(0.5914), MOJA = C9(0.6437);
const p2 = (t) => {
  const o = { encuadre: 'chaucer' };
  T.amor(R, t, o);
  // la criada entra por la derecha, deja la jarra en el arcón y se va
  { const ent = lin(t, P2 + 0.2, P2 + 1.6), sal = lin(t, AMOR + 1.0, AMOR + 2.6), xc = Math.round(lerp(lerp(332, 212, ent), 332, sal)); const anda = (ent > 0 && ent < 1) || (sal > 0 && sal < 1); const a = R.actor(EL.criada, xc, 150, t, { dir: sal > 0 ? 1 : -1, anda, sonrisa: t > AMOR && t < AMOR + 1.0, sostiene: sal > 0 ? undefined : true }); if (sal === 0) { const [mx, my] = a.mano; R.rect(mx - 2, my - 5, mx + 2, my, K); R.rect(mx - 1, my - 4, mx + 1, my - 1, H('#c8784a')); R.pset(mx - 1, my - 4, H('#e8a070')); } }
  // Chaucer: ante la librería con el códice, «X»; camina al pupitre y escribe
  const kv = lin(t, VA0, VA1), xc = Math.round(lerp(28, 92, kv)), libro = t < VA0;
  const sacude = t > XX && t < XX + 0.6;
  const a = R.actor(EL.chaucer, xc, 150, t, { dir: sacude ? (Math.floor(t * 8) % 2 ? 1 : -1) : kv >= 1 ? -1 : 1, anda: kv > 0 && kv < 1, triste: t > XX && t < VA0, sonrisa: t > AMOR, sostiene: libro ? [xc + 18, 134] : kv >= 1 && t > MOJA ? [xc - 2, 138] : undefined });
  if (libro) {
    const [mx, my] = a.mano, abierto = t > NODOC;
    if (!abierto) { R.rect(mx - 4, my - 6, mx + 3, my + 1, K); R.rect(mx - 3, my - 5, mx + 2, my, H('#7a3a2a')); R.rect(mx - 1, my - 4, mx, my - 3, H('#e8b830')); }
    else { R.rect(mx - 7, my - 5, mx + 6, my + 1, K); R.rect(mx - 6, my - 4, mx - 1, my, H('#f4ead0')); R.rect(mx, my - 4, mx + 5, my, H('#e8dcc0')); for (let k = 0; k < 3; k++) { R.linea(mx - 5, my - 3 + k * 1, mx - 2, my - 3 + k, H('#8a7a6a')); R.linea(mx + 1, my - 3 + k, mx + 4, my - 3 + k, H('#8a7a6a')); } if (Math.floor(t * 3) % 2 && t < XX) R.linea(mx, my - 6, mx + 3, my - 5, H('#f4ead0')); }
  }
  T.amorDelante(R, t, o);
  // la pluma y lo que escribe, encima del pupitre
  if (kv >= 1 && t > MOJA) { const w = lin(t, MOJA + 0.2, P3), px = Math.round(84 + (w * 40) % 40), py = 140 + Math.floor(w * 2); for (let r = 0; r < Math.floor(w * 2); r++) R.linea(80, 140 + r, 122, 140 + r, H('#3a2a2a')); R.linea(80, py, px, py, H('#3a2a2a')); R.linea(px, py, px + 5, py - 9, H('#f4f4ec')); R.linea(px + 1, py - 1, px + 6, py - 9, H('#c8c8c0')); R.pset(px, py, K); }
  // «no document»: la X; «love»: el corazón
  if (t > XX && t < VA0 + 0.4) glifo('X', 34, 100, rebote(t, XX, 2), H('#e8304a'), 1 - lin(t, VA0, VA0 + 0.4));
  if (t > AMOR && t < MOJA + 0.4) { glifo('corazon', xc, 98 + Math.round(Math.sin(t * 6) * 1.5), rebote(t, AMOR, 2), H('#e8304a'), 1 - lin(t, MOJA, MOJA + 0.4)); chispas(t, AMOR, xc + 7, 104, H('#ffb0c0')); }
};

// ── 3 · la ventana: los pájaros se emparejan en la rama ─────────────────────────────────────────────────────────
const ESCRIBE = C9(0.7733), PAREJA = C9(0.9721), ELIGE = C9(0.8948);
const p3 = (t) => {
  // el reloj del decorado se desplaza para que el pájaro que llega empiece su vuelo al abrir el plano
  const tt = t - P3 + 70;
  const o = { encuadre: 'chaucer', camara: 'ventana' };
  T.amor(R, tt, o);
  // Chaucer, a la izquierda, con su rollo: escribe; en «chose its mate» señala la rama y sonríe
  const señala = t > ELIGE && t < PAREJA + 0.6;
  const a = R.actor(EL.chaucer, 44, 166, t, { dir: 1, sostiene: señala ? undefined : [64, 150], dedo: señala, sonrisa: t > ELIGE, habla: t > PAREJA + 0.6 && Math.sin(t * 8) > 0.3 });
  if (!señala) {
    const [mx, my] = a.mano, w = lin(t, ESCRIBE, ELIGE);
    R.rect(mx - 5, my - 12, mx + 7, my + 1, K); R.rect(mx - 4, my - 11, mx + 6, my, H('#f4ead0')); R.rect(mx - 5, my - 13, mx + 7, my - 12, H('#c8a878')); R.rect(mx - 5, my + 1, mx + 7, my + 2, H('#c8a878'));
    const n = Math.floor(w * 5); for (let k = 0; k < n; k++) R.linea(mx - 3, my - 9 + k * 2, mx + 4 - (k % 2) * 2, my - 9 + k * 2, H('#3a2a2a'));
    if (t > ESCRIBE && t < ELIGE) { const px = Math.round(mx - 3 + ((t * 6) % 7)), py = my - 9 + n * 2; R.linea(px, py, px + 6, py - 10, H('#f4f4ec')); R.linea(px + 1, py, px + 7, py - 10, H('#c8c8c0')); R.pset(px, py, K); }
  }
  // en «chose its mate»: un corazón sobre cada pareja de la rama
  if (t > PAREJA - 0.2) for (const [hx, hy, d] of [[132, 60, 0], [166, 56, 0.12], [200, 54, 0.24]]) if (t > PAREJA - 0.2 + d) { glifo('corazon', hx, hy - Math.round(lin(t, PAREJA, PAREJA + 2) * 6), rebote(t, PAREJA - 0.2 + d, 2), H('#e8406a')); }
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], {
  efectos: [[PREG, 'pop'], [BORRA0 + 0.1, 'whoosh'], [NODOC, 'papel'], [AMOR, 'pop'], [MOJA + 0.2, 'lapiz'], [P3 + 3.1, 'brillo'], [PAREJA - 0.2, 'pop']],
  año: (t) => (t < P2 ? 400 : 1380),
});
''')

E['tr-orleans'] = ('Carlos de Orleans', '''// TR-ORLEANS (frase 10), cartela «1415». Cuatro planos:
// 1. la Torre de Londres al anochecer desde el Támesis (fondo local): la Torre Blanca con su ventana encendida; en
//    «Valentine» se enciende un corazón tras los barrotes y en «prisoner» se asoma la silueta del preso; los cuervos
//    saltan en la muralla, pasa la barca y el guardia hace la ronda;
// 2. en «Charles»: el campo embarrado de Azincourt (fondo local): Carlos, de azul, resbala en el barro; dos soldados
//    ingleses llegan en «captured», él levanta las manos y en «Agincourt» se lo llevan;
// 3. en «spent»: la celda de la Torre: Carlos señala las rayas de la pared y el número cuenta de 1 a 25 en «25 years»
//    (la barra del año va de 1415 a 1440); en «part of them» va a la mesa y en «Tower» corren el cerrojo;
// 4. en «There he wrote»: la carta de cerca: la mano escribe el poema renglón a renglón, en «sweet Valentine» sale el
//    corazoncito y la carta se dobla y se sella con lacre en forma de corazón.''', COMUN + r'''
import { ELENCO_TE } from '/atomo/plato/kits/pixel-chibi.js';
const O = (f) => en('orleans', f);
const SOLD = ELENCO_TE.templario;
// la bóveda en sombra sobre la esquina de Atom (los sillares del decorado se ven ahí con mucho borde)
const SOMBRA = H('#24222c');
const boveda = () => { for (let y = 0; y <= 66; y++) for (let x = 236; x < 320; x++) { const d = Math.hypot((x - 322) / 84, (y + 2) / 68), a = 0.82 * Math.max(0, Math.min(1, (1 - d) / 0.5)); if (a > 0) R.pset(x, y, mezC(R.pget(x, y), SOMBRA, a)); } };
const P2 = O(0.2260), P3 = O(0.5362), P4 = O(0.8308);

// ── 1 · la Torre de Londres al anochecer (fondo local) ─────────────────────────────────────────────────────────
const OCASO = [H('#2a2a5a'), H('#4a3a6a'), H('#7a4a7a'), H('#b8607a'), H('#e88a6a'), H('#f8b870')];
const PIEDRA = [H('#c8bca0'), H('#e0d6bc'), H('#9a8e78')];
const FONDO1 = capa(() => {
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) R.pset(x, y, trama(OCASO, Math.min(5, y / 118 * 5.2), x, y));
  for (let k = 0; k < 18; k++) { const x = (k * 71) % 320, y = (k * 23) % 40; if (!(x > 262 && y < 50) && !(x > 18 && x < 172 && y < 16)) R.pset(x, y, H('#e8e0f0')); }
  // la otra orilla lejana: tejados y la aguja de una iglesia
  for (let x = 0; x < 320; x++) { const h1 = 112 + Math.round(Math.sin(x * 0.3) * 1.5) + (x % 17 < 8 ? -3 : 0); for (let y = h1; y < 128; y++) R.pset(x, y, (x + y) % 4 ? H('#4a3a5a') : H('#3a2e4a')); }
  R.poligono([[282, 112], [286, 84], [290, 112]], H('#3a2e4a'));
  for (let k = 0; k < 10; k++) R.pset(8 + k * 31, 116 + (k % 3), H('#ffd870'));
  // la muralla exterior con almenas y la torre redonda de la derecha
  sillares(0, 98, 319, 128, PIEDRA, 6, 31);
  for (let x = 0; x < 320; x += 10) { R.rect(x, 92, x + 5, 98, K); R.rect(x + 1, 93, x + 4, 98, PIEDRA[1]); R.rect(x + 4, 93, x + 4, 98, PIEDRA[2]); }
  R.rect(0, 98, 319, 99, PIEDRA[2]);
  R.rect(226, 70, 266, 128, K); sillares(227, 71, 265, 127, PIEDRA, 6, 32); for (let y = 71; y <= 127; y++) { R.rect(227, y, 230, y, PIEDRA[1]); R.rect(260, y, 265, y, PIEDRA[2]); }
  for (let x = 226; x < 267; x += 8) { R.rect(x, 64, x + 4, 70, K); R.rect(x + 1, 65, x + 3, 70, PIEDRA[1]); }
  R.rect(242, 86, 248, 96, K); R.rect(243, 87, 247, 95, H('#ffc860')); R.rect(245, 87, 245, 95, K);
  // la puerta del agua (arco sobre el río)
  R.rect(140, 110, 188, 128, K); R.disco(164, 118, 16, K); R.disco(164, 120, 13, H('#1a1428')); R.rect(151, 120, 177, 128, H('#1a1428'));
  for (let x = 152; x <= 176; x += 3) R.linea(x, 108, x, 128, H('#3a3040')); R.rect(150, 112, 178, 112, H('#3a3040'));
  // la Torre Blanca: cuerpo, cuatro torreones con cúpulas de plomo y veletas, ventanitas en arco
  R.rect(66, 36, 196, 98, K); sillares(67, 37, 195, 97, [H('#f0e8d4'), H('#fff8e8'), H('#c8bca4')], 7, 33);
  for (let y = 37; y <= 97; y++) for (let x = 170; x <= 195; x++) R.pset(x, y, mezC(R.pget(x, y), H('#7a6a8a'), 0.35));
  for (let x = 66; x <= 196; x += 8) { R.rect(x, 30, x + 4, 36, K); R.rect(x + 1, 31, x + 3, 36, H('#f0e8d4')); }
  for (const [tx, w] of [[60, 16], [118, 14], [182, 16]]) { R.rect(tx, 26, tx + w, 98, K); sillares(tx + 1, 27, tx + w - 1, 97, [H('#f0e8d4'), H('#fff8e8'), H('#c8bca4')], 7, 34 + tx); R.rect(tx + w - 3, 27, tx + w - 1, 97, H('#c8bca4')); const cx = tx + w / 2; R.disco(Math.round(cx), 25, Math.round(w / 2), K); R.disco(Math.round(cx), 25, Math.round(w / 2) - 1, H('#6a7a8a')); R.disco(Math.round(cx) - 2, 23, 3, H('#8a9aaa')); R.rect(Math.round(cx), 16, Math.round(cx), 17, H('#e8b830')); }
  for (const [wx, wy] of [[84, 56], [100, 56], [146, 56], [160, 56], [84, 76], [100, 76], [146, 76], [160, 76], [66, 50]]) { if (wx === 66) continue; R.rect(wx, wy, wx + 4, wy + 8, K); R.disco(wx + 2, wy, 2, K); R.rect(wx + 1, wy + 1, wx + 3, wy + 7, H('#3a3048')); }
  // el muelle de piedra
  R.rect(0, 128, 319, 133, K); for (let x = 0; x < 320; x++) { R.pset(x, 129, PIEDRA[1]); R.pset(x, 130, PIEDRA[0]); R.pset(x, 131, x % 9 ? PIEDRA[0] : PIEDRA[2]); R.pset(x, 132, PIEDRA[2]); }
});
// el Támesis: reflejos del cielo y de las ventanas, ondas que corren
const rio1 = (t) => {
  for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) {
    const v = (y - 134) / 46, ond = Math.sin(x * 0.35 + y * 1.3 - t * 2.2) + Math.sin(x * 0.11 - t * 0.8 + y);
    let c = trama([H('#e88a6a'), H('#9a5a7a'), H('#4a3a6a'), H('#2a2a4a')], Math.min(3, v * 3.2 + (ond > 1.2 ? -0.8 : 0)), x, y);
    if (((x > 124 && x < 140) || (x > 240 && x < 250)) && ond > 0.4 && y < 160) c = H('#ffc860');
    if (ond > 1.75) c = H('#f8c8a0');
    R.pset(x, y, c);
  }
};
const CORAZON1 = O(0.0505), PRESO = O(0.1782) - 0.4;
const p1 = (t) => {
  FONDO1();
  rio1(t);
  // nubes encendidas por el ocaso (a media altura, lejos de Atom) y gaviotas
  for (const [x0, y, w, v] of [[20, 52, 26, 1.0], [190, 44, 20, 1.6], [120, 64, 14, 2.2]]) { const x = ((x0 + t * v * 3) % 300) - 10; for (const [dx, dy, r, c] of [[0, 0, w * 0.3, '#c86a7a'], [-w * 0.3, 2, w * 0.22, '#a85a7a'], [w * 0.28, 1, w * 0.24, '#a85a7a'], [-2, -2, w * 0.22, '#f0a080']]) R.disco(Math.round(x + dx), Math.round(y + dy), Math.max(2, Math.round(r)), H(c)); }
  for (let k = 0; k < 3; k++) { const u = ((t * 0.1 + k * 0.37) % 1), x = Math.round(lerp(330, -10, u)), y = Math.round(78 + k * 8 + Math.sin(u * 15 + k) * 3), al = Math.floor(t * 7 + k) % 2; R.pset(x, y, H('#f8f0e8')); R.pset(x - 1, y - al, H('#f8f0e8')); R.pset(x + 1, y - al, H('#f8f0e8')); R.pset(x - 2, y - 1 + al, H('#d8d0c8')); R.pset(x + 2, y - 1 + al, H('#d8d0c8')); }
  // la ventana del preso, grande, encendida, con barrotes: el corazón y la silueta
  const fl = Math.sin(t * 11) > 0.3 ? 1 : 0;
  R.rect(120, 60, 138, 84, K); R.disco(129, 61, 9, K); R.rect(121, 61, 137, 83, fl ? H('#ffd070') : H('#ffc860')); R.disco(129, 61, 8, fl ? H('#ffd070') : H('#ffc860'));
  if (t > PRESO) { const k = lin(t, PRESO, PRESO + 0.5), y = Math.round(lerp(86, 66, k)); R.recorte([121, 53, 137, 83]); R.disco(129, y + 4, 5, H('#3a2a2a')); R.disco(129, y + 15, 8, H('#3a2a2a')); R.rect(122, y + 14, 136, 83, H('#3a2a2a')); R.rect(124, y - 1, 134, y + 1, H('#3a2a2a')); R.recorte(null); }
  if (t > CORAZON1) { const e = rebote(t, CORAZON1, 2); glifo('corazon', 122, 55 + Math.round(Math.sin(t * 5)), e, H('#e8304a')); chispas(t, CORAZON1, 129, 62, H('#ffb0c0')); }
  for (const x of [124, 129, 134]) { R.rect(x, 53, x, 83, K); R.pset(x + 1, 60, H('#6a5a5a')); }
  R.rect(121, 72, 137, 72, K);
  R.rect(118, 84, 140, 86, K); R.rect(119, 85, 139, 85, H('#fff8e8'));
  // el guardia que hace la ronda por el adarve y los cuervos de las almenas
  { const u = (t % 10) / 10, xg = Math.round(u < 0.5 ? lerp(196, 214, u * 2) : lerp(214, 196, (u - 0.5) * 2)); R.actor(SOLD, xg, 98, t, { dir: u < 0.5 ? 1 : -1, anda: true, sostiene: [u < 0.5 ? xg + 17 : xg - 2, 84] }); const hx = u < 0.5 ? xg + 17 : xg - 2; R.linea(hx, 66, hx, 96, H('#5a3a28')); R.poligono([[hx - 2, 66], [hx + 2, 66], [hx, 61]], H('#c8ccd8')); }
  for (const [cx, k] of [[30, 0], [276, 1]]) { const sal = Math.max(0, Math.sin(t * 3 + k * 2)) > 0.8 ? 2 : 0, x = cx + Math.round(Math.sin(t * 0.7 + k) * 3), y = 92 - sal; R.rect(x, y - 3, x + 4, y - 1, K); R.pset(x - 1, y - 3, K); R.pset(x - 2, y - 3, H('#5a5a6a')); R.pset(x, y - 3, H('#3a3a4a')); R.pset(x + 5, y - 2, K); R.pset(x + 1, y, K); R.pset(x + 3, y, K); }
  // la barca del barquero que cruza a remo
  { const x = Math.round(lerp(-30, 330, ((t + 3) % 16) / 16)), y = 156 + Math.round(Math.sin(t * 2) * 1); R.poligono([[x, y], [x + 26, y], [x + 22, y + 5], [x + 4, y + 5]], K); R.poligono([[x + 1, y + 1], [x + 25, y + 1], [x + 21, y + 4], [x + 5, y + 4]], H('#6a4024')); R.rect(x + 1, y + 1, x + 25, y + 1, H('#a8744a'));
    R.rect(x + 11, y - 8, x + 15, y, K); R.rect(x + 12, y - 7, x + 14, y - 1, H('#3a4a6a')); R.disco(x + 13, y - 10, 2, H('#e0b090')); R.rect(x + 11, y - 13, x + 15, y - 12, H('#3a2a2a'));
    const r = Math.sin(t * 4); R.linea(x + 13, y - 4, x + 13 + Math.round(r * 9), y + 7, H('#c8945a')); for (let k = 0; k < 6; k++) R.pset(x - 2 - k * 3, y + 5 + (k % 2), H('#f8c8a0')); }
};

// ── 2 · el campo embarrado de Azincourt (fondo local) ─────────────────────────────────────────────────────────
const GRIS = [H('#5a6070'), H('#6a7282'), H('#828a98'), H('#9aa2ae'), H('#b0b6c0')];
const FONDO2 = capa(() => {
  for (let y = 0; y < 80; y++) for (let x = 0; x < 320; x++) R.pset(x, y, trama(GRIS, Math.min(4, y / 76 * 4.2), x, y));
  for (let y = 80; y < 93; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x + y) % 3 ? H('#6a6a4a') : H('#5a5a3e'));
  // los dos bosques que cerraban el campo
  for (const [x0, x1, s] of [[-10, 96, 41], [228, 330, 42]]) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const top = 50 + Math.round(Math.sin(x * 0.4 + s) * 3 + Math.sin(x * 0.13) * 4 + Math.abs(x - (x0 + x1) / 2) * 0.12); for (let y = top; y < 92; y++) { const r = rnd(x, y, s); R.pset(x, y, y === top ? H('#3a4a32') : r < 0.2 ? H('#1e2a1e') : r > 0.85 ? H('#4a5a3a') : H('#2a3a26')); } }
  // el horizonte del campo, las tiendas y la empalizada de estacas inglesas
  for (const [tx, c1, c2] of [[112, '#c8303a', '#f2ece0'], [146, '#2a4fa8', '#e8b830'], [196, '#f2ece0', '#c8303a']]) { R.poligono([[tx, 80], [tx + 9, 68], [tx + 18, 80]], K); for (let y = 69; y <= 79; y++) for (let x = tx + 1; x <= tx + 17; x++) { const dx = Math.abs(x - tx - 9); if (dx <= (y - 68) * 0.8) R.pset(x, y, Math.floor((x - tx) / 3) % 2 ? H(c1) : H(c2)); } R.linea(tx + 9, 68, tx + 9, 63, K); }
  for (let x = 100; x < 230; x += 5) { R.linea(x, 92, x + 3, 86, H('#4a3424')); R.pset(x + 3, 85, H('#d8c8a8')); }
  // el barro: surcos en perspectiva, charcos, paja pisoteada
  for (let y = 92; y < 180; y++) for (let x = 0; x < 320; x++) {
    const v = (y - 92) / 88, surco = Math.sin(((x - 160) / (0.35 + v * 1.4)) * 0.55) > 0.7, r = rnd(x, y, 43);
    R.pset(x, y, surco ? H('#4a3020') : r < 0.12 ? H('#3a2618') : r > 0.9 ? H('#8a6a48') : v < 0.3 ? H('#6a5034') : H('#5a4028'));
  }
  for (const [cx, cy, rx, ry] of [[54, 128, 22, 4], [250, 140, 26, 5], [120, 168, 30, 5], [292, 172, 18, 4], [200, 112, 14, 3]]) for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d < 1) R.pset(x, y, d > 0.75 ? H('#3a2618') : trama([H('#9aa2ae'), H('#7a8292'), H('#5a6070')], Math.min(2, (y - cy + ry) / ry), x, y)); }
  for (let k = 0; k < 60; k++) { const x = (k * 53) % 320, y = 96 + (k * 29) % 80; R.linea(x, y, x + 3, y - 1, H('#c8b070')); }
  // un yelmo caído y una lanza rota en el barro (nada más)
  R.disco(84, 160, 5, K); R.disco(84, 160, 4, H('#8a909c')); R.rect(79, 160, 89, 163, H('#5a4028')); R.pset(82, 158, H('#d0d4dc'));
  R.linea(220, 166, 262, 158, K); R.linea(220, 165, 262, 157, H('#8a6a48'));
});
const caballo = (x, y, t) => {
  // un caballo sin jinete que pace, con la gualdrapa azul y oro (sin escudo): cuerpo, cuello bajado, patas, crin y cola
  const c = H('#7a5034'), cL = H('#a8744a'), cS = H('#4a2e1c'), baja = Math.sin(t * 0.9) > -0.2 ? 2 : 0;
  const M = (i, j) => { const dx = (i - 13) / 12, dy = (j + 13) / 6; return dx * dx + dy * dy < 1; };
  for (let j = -20; j <= -6; j++) for (let i = 0; i <= 26; i++) { if (M(i, j)) R.pset(x + i, y + j, !M(i, j - 1) ? cL : !M(i, j + 2) ? cS : c); else if (M(i + 1, j) || M(i - 1, j) || M(i, j + 1) || M(i, j - 1)) R.pset(x + i, y + j, K); }
  R.poligono([[x + 22, y - 18], [x + 26, y - 15], [x + 32, y - 6 + baja], [x + 29, y - 4 + baja]], K); R.poligono([[x + 23, y - 17], [x + 26, y - 15], [x + 31, y - 6 + baja], [x + 29, y - 5 + baja]], c);
  R.rect(x + 28, y - 7 + baja, x + 34, y - 3 + baja, K); R.rect(x + 29, y - 6 + baja, x + 33, y - 4 + baja, c); R.pset(x + 30, y - 6 + baja, K); R.pset(x + 33, y - 4 + baja, cS);
  for (let k = 0; k < 6; k++) R.pset(x + 22 + k, y - 19 + k * 2 + (k > 2 ? baja : 0), H('#2a1a10'));
  for (const [lx, d] of [[x + 4, 0], [x + 8, 1], [x + 18, 0], [x + 22, 1]]) { R.rect(lx, y - 8, lx + 2, y, K); R.rect(lx + 1, y - 8, lx + 1, y - 1, d ? cS : c); R.rect(lx, y, lx + 2, y, H('#2a1a10')); }
  for (let k = 0; k < 7; k++) R.pset(x - 1 - Math.round(Math.sin(t * 2 + k * 0.4) * (k / 4)), y - 17 + k * 2, H('#2a1a10'));
  R.rect(x + 7, y - 19, x + 19, y - 11, K); R.rect(x + 8, y - 18, x + 18, y - 12, H('#2a4fa8')); R.rect(x + 8, y - 12, x + 18, y - 12, H('#e8b830')); R.rect(x + 12, y - 18, x + 14, y - 13, H('#4a78d0'));
};
const RESBALA = O(0.2560), CAPTURA = O(0.3473), LLEVAN = O(0.4181);
const p2 = (t) => {
  FONDO2();
  // nubes bajas a tres velocidades, cuervos, llovizna
  for (const [x0, y, w, v] of [[0, 38, 44, 0.8], [130, 32, 34, 1.4], [230, 42, 26, 2.0], [70, 44, 20, 1.8]]) { const x = ((x0 + t * v * 3) % 380) - 30; R.nube(Math.round(x), y, w); }
  for (let k = 0; k < 2; k++) { const u = ((t * 0.12 + k * 0.5) % 1), x = Math.round(lerp(-10, 250, u)), y = Math.round(40 + k * 10 + Math.sin(u * 14) * 3), al = Math.floor(t * 6 + k) % 2; R.pset(x, y, K); R.pset(x - 1, y - al, K); R.pset(x + 1, y - al, K); R.pset(x - 2, y - 1 + al, K); R.pset(x + 2, y - 1 + al, K); }
  // los estandartes de colores lisos que ondean (sin escudos)
  for (const [bx, c1, c2] of [[104, '#c8303a', '#f2ece0'], [170, '#2a4fa8', '#e8b830'], [214, '#f2ece0', '#c8303a']]) { R.linea(bx, 92, bx, 54, H('#4a3424')); for (let i = 0; i < 16; i++) { const y = 55 + Math.round(Math.sin(t * 6 - i * 0.6) * (i / 8)); for (let j = 0; j < 7 - (i > 11 ? (i - 11) : 0); j++) R.pset(bx + 1 + i, y + j, j < 3 ? H(c1) : H(c2)); } }
  caballo(236, 116, t);
  // Carlos resbala, los dos ingleses llegan, él levanta las manos y se lo llevan
  const kL = lin(t, LLEVAN, P3 - 0.3), xc = Math.round(lerp(150, 214, kL));
  const k1 = lin(t, P2 + 0.3, CAPTURA), xi = Math.round(lerp(-16, xc - 26, k1)), xd = Math.round(lerp(332, xc + 26, k1));
  const res = t > RESBALA && t < RESBALA + 0.5;
  const ING = {};
  R.actor(SOLD, xi, 160, t, { dir: 1, anda: (k1 > 0 && k1 < 1) || (kL > 0 && kL < 1), pal: ING, dedo: t > CAPTURA && t < LLEVAN });
  R.actor(EL.orleans, xc, 158 + (res ? 1 : 0), t, { dir: kL > 0 ? 1 : res ? (Math.floor(t * 10) % 2 ? 1 : -1) : 1, libre: true, anda: kL > 0 && kL < 1, brazos: t > CAPTURA && t < LLEVAN, sorpresa: res || (t > CAPTURA && t < CAPTURA + 0.8), triste: t > CAPTURA + 0.8, salto: res ? 1 : 0 });
  R.actor(ELENCO_TE.templario2, xd, 162, t, { dir: kL > 0 ? 1 : -1, anda: (k1 > 0 && k1 < 1) || (kL > 0 && kL < 1), pal: ING });
  // el chapoteo del barro
  if (t > RESBALA && t < RESBALA + 0.5) { const k = (t - RESBALA) / 0.5; for (let i = 0; i < 7; i++) { const an = Math.PI + i * Math.PI / 6, r = 3 + k * 9; R.pset(Math.round(xc + 7 + Math.cos(an) * r), Math.round(158 + Math.sin(an) * r * 0.6 - k * 2), H('#6a5034')); } }
  // las huellas que dejan al irse
  for (let k = 0; k < Math.floor(kL * 6); k++) { R.rect(156 + k * 10, 160, 157 + k * 10, 160, H('#3a2618')); }
  // la llovizna
  for (let k = 0; k < 60; k++) { const x = (k * 53 + t * 40) % 330 - 5, y = (k * 37 + t * 120) % 180; R.pset(Math.round(x), Math.round(y), H('#c8d0dc')); R.pset(Math.round(x) - 1, Math.round(y) - 2, H('#a0a8b4')); }
};

// ── 3 · la celda: las rayas cuentan 25 años ─────────────────────────────────────────────────────────────────────
const C0 = O(0.5512), C1 = O(0.6081), VA0 = O(0.7036), VA1 = O(0.7391) + 0.2, CERROJO = O(0.7530);
const p3 = (t) => {
  const o = { encuadre: 'torre' };
  T.amor(R, t, o);
  boveda();
  // el cerrojo de la puerta se corre en «Tower» (y el casco del guardia asoma por la rejilla)
  { const k = lin(t, CERROJO - 0.25, CERROJO); R.rect(30 + Math.round(k * 10), 96, 44 + Math.round(k * 10), 99, K); R.rect(31 + Math.round(k * 10), 97, 43 + Math.round(k * 10), 98, H('#5a5a68')); R.rect(54, 94, 57, 101, K); R.pset(55, 95, H('#8a8a96'));
    if (t > CERROJO - 0.9 && t < CERROJO + 0.9) { R.recorte([31, 63, 45, 75]); R.disco(38, 70, 5, H('#3a2a2a')); R.disco(38, 68, 5, H('#8a909c')); R.rect(32, 68, 44, 69, H('#6a707c')); R.recorte(null); for (const x of [34, 38, 42]) R.rect(x, 63, x, 75, K); } }
  // Carlos señala las rayas; luego va a la mesa y coge la pluma
  const kv = lin(t, VA0, VA1), xc = Math.round(lerp(222, 146, kv));
  R.actor(EL.orleans, xc, 150, t, { dir: kv > 0 && kv < 1 ? -1 : kv >= 1 ? 1 : 1, anda: kv > 0 && kv < 1, dedo: t > P3 + 0.2 && t < C1 + 0.8, triste: t > C1 + 0.3 && t < VA0, sostiene: kv >= 1 ? [xc + 16, 134] : undefined });
  T.amorDelante(R, t, o);
  if (kv >= 1) { const px = xc + 16, py = 133; R.linea(px, py, px + 4, py - 8, H('#f4f4ec')); R.linea(px + 1, py, px + 5, py - 8, H('#c8c8c0')); }
  // las rayas se iluminan una a una y el número cuenta hasta 25
  const n = t < C0 ? 0 : Math.min(25, 1 + Math.floor(lin(t, C0, C1) * 24.999));
  if (n > 0) {
    for (let k = 0; k < n; k++) { const g = Math.floor(k / 5), i = k % 5, x = 262 + (g % 3) * 17 + i * 3, y = 92 + Math.floor(g / 3) * 12; if (i < 4) R.rect(x, y, x, y + 8, H('#fff0a0')); else R.linea(x - 13, y + 7, x, y + 1, H('#fff0a0')); }
    R.numero(String(n), 287, 86 - (n === 25 && t < C1 + 0.12 ? 2 : 0), { tam: 16, centro: true });
    if (n === 25) chispas(t, C1, 287, 78);
  }
};

// ── 4 · la carta de cerca: el poema, el corazón y el lacre ─────────────────────────────────────────────────────
const W0 = O(0.8459), W1 = O(0.9350) + 0.2, DOBLA0 = O(0.9532) + 0.35, DOBLA1 = DOBLA0 + 0.5, DOBLA2 = DOBLA1 + 0.5, SELLA = DOBLA2 + 0.3;
const p4 = (t) => {
  const carta = t < W0 ? 0 : t < W1 ? lin(t, W0, W1) * 0.9 : Math.min(1, 0.9 + lin(t, O(0.9532) - 0.1, O(0.9532) + 0.15) * 0.1);
  const o = { encuadre: 'torre', camara: 'mesa', carta };
  T.amor(R, t, o);
  boveda();
  T.amorDelante(R, t, o);
  // la carta se dobla en tres y se sella con un corazón de lacre
  if (t > DOBLA0) {
    const fila = []; for (let y = 148; y <= 179; y++) fila[y] = [R.pget(102, y), R.pget(104, y), R.pget(106, y)];
    const kA = lin(t, DOBLA0, DOBLA1), kB = lin(t, DOBLA1, DOBLA2);
    const arriba = Math.round(150 + kA * 9), abajo = Math.round(177 - kB * 9);
    for (let y = 150; y <= 177; y++) { if (y >= arriba && y <= abajo) continue; for (let x = 110; x <= 206; x++) R.pset(x, y, fila[y][(x + y) % 3]); }
    const DOR = H('#e8dcc0'), DORS = H('#c8b898');
    if (kA > 0) { const h = Math.round(9 * Math.sin(kA * Math.PI / 2)); R.rect(110, arriba, 206, arriba + Math.max(0, h - 1), DOR); R.rect(110, arriba + h, 206, arriba + h, DORS); R.rect(110, arriba, 206, arriba, K); }
    if (kB > 0) { const h = Math.round(9 * Math.sin(kB * Math.PI / 2)); R.rect(110, abajo - h, 206, abajo, DOR); R.rect(110, abajo - h, 206, abajo - h, DORS); R.rect(110, abajo, 206, abajo, K); }
    R.rect(109, arriba, 109, abajo, K); R.rect(207, arriba, 207, abajo, K);
    if (kB >= 1) { R.linea(110, 159, 158, 166, DORS); R.linea(206, 159, 158, 166, DORS); }
  }
  if (t > SELLA) { const e = rebote(t, SELLA, 2); glifo('corazon', 151, 159, e, H('#b8202a'), 1, H('#5a0a10')); chispas(t, SELLA, 158, 164, H('#ffd0a0')); }
  // la mano que escribe (el brazo canónico entra por abajo a la derecha, con la manga azul del jubón)
  let px, py;
  if (t < W1) { const w = carta / 0.9, lineas = 8, k = Math.min(lineas - 1, Math.floor(w * lineas)), u = w * lineas - k; px = Math.round(118 + u * 80); py = Math.round(155 + k * 2.6); }
  else if (t < DOBLA0) { const k = lin(t, W1, DOBLA0); px = Math.round(lerp(198, 150, k)); py = Math.round(lerp(173, 172, k)); }
  else if (t < DOBLA1) { px = 160; py = Math.round(150 + lin(t, DOBLA0, DOBLA1) * 10); }
  else if (t < DOBLA2) { px = 160; py = Math.round(177 - lin(t, DOBLA1, DOBLA2) * 8); }
  else { const k = lin(t, DOBLA2, SELLA); px = Math.round(lerp(160, 176, k)); py = Math.round(lerp(169, 170, k)); if (t > SELLA + 0.5) { const k2 = lin(t, SELLA + 0.5, SELLA + 1.2); px = Math.round(lerp(176, 230, k2)); py = Math.round(lerp(170, 182, k2)); } }
  const escribe = t < W1 && t > W0;
  const temb = escribe ? Math.round(Math.sin(t * 40)) : 0;
  T.brazo(R, px + 46, 198, px + 12, py + 1 + temb, '#2a4fa8', -1, { codo: [px + 34, py + 17] });
  if (t < DOBLA0) { R.linea(px + 2, py + 1 + temb, px - 3, py + 5 + temb, K); R.linea(px + 2, py + temb, px + 9, py - 12 + temb, H('#f4f4ec')); R.linea(px + 3, py + temb, px + 10, py - 12 + temb, H('#c8c8c0')); R.pset(px + 8, py - 10 + temb, H('#ffffff')); }
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  cartela: '1415',
  efectos: [[CORAZON1, 'brillo'], [RESBALA, 'chof'], [CAPTURA, 'toc'], [LLEVAN + 0.2, 'chof'], [C0, 'lapiz'], [C1, 'brillo'], [CERROJO, 'cerrojo'], [W0 + 0.1, 'lapiz'], [DOBLA0, 'papel'], [SELLA, 'sello']],
  año: (t) => (t < P3 ? 1415 : t < P4 ? Math.round(lerp(1415, 1440, lin(t, C0, C1))) : 1415),
});
''')
