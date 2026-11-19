E = {}

# piezas pequeñas que comparten las dos escenas (se repiten en cada cuerpo porque cada escena es su propio .html)
COMUN = r'''
const H = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const K = hex('#1a1420');
// pasa a sepia (con viñeta) el rectángulo [x0, y0, x1, y1] de lo ya pintado
const sepia = (x0, y0, x1, y1, vin = 0.35) => {
  const B = R.buf, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, rx = (x1 - x0) / 2, ry = (y1 - y0) / 2;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const c = B[y * 320 + x], r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
    let l = (0.3 * r + 0.59 * g + 0.11 * b) / 255; l = 0.18 + 0.78 * l;
    const d = Math.hypot((x - cx) / rx, (y - cy) / ry); l *= 1 - vin * Math.max(0, d - 0.55);
    if (H(x, y, 3) > 0.93) l *= 0.9;
    const rr = Math.min(255, Math.round(255 * l * 1.0)), gg = Math.min(255, Math.round(225 * l * 0.98)), bb = Math.min(255, Math.round(170 * l * 0.9));
    B[y * 320 + x] = (0xff000000 | (bb << 16) | (gg << 8) | rr) >>> 0;
  }
};
// bocadillo de pensamiento (o de diálogo, si dialogo) con su contenido pintado por dentro
const bocadillo = (x, y, w, h, s, dentro, dialogo = false) => {
  if (s <= 0) return; const ww = Math.round(w * s), hh = Math.round(h * s), x0 = Math.round(x - ww / 2), y0 = Math.round(y - hh);
  R.rect(x0 + 1, y0 - 1, x0 + ww - 1, y0 + hh + 1, K); R.rect(x0 - 1, y0 + 1, x0 + ww + 1, y0 + hh - 1, K);
  R.rect(x0 + 1, y0, x0 + ww - 1, y0 + hh, hex('#fbf6ea')); R.rect(x0, y0 + 1, x0 + ww, y0 + hh - 1, hex('#fbf6ea'));
  R.rect(x0 + 1, y0 + hh - 2, x0 + ww - 1, y0 + hh, hex('#e4dccb'));
  if (dialogo) { R.poligono([[x - 3, y0 + hh], [x + 3, y0 + hh], [x - 4, y0 + hh + 5]], K); R.poligono([[x - 2, y0 + hh], [x + 2, y0 + hh], [x - 3, y0 + hh + 3]], hex('#fbf6ea')); }
  else if (s > 0.8) { R.disco(x - 3, y0 + hh + 4, 2, K); R.pset(x - 3, y0 + hh + 4, hex('#fbf6ea')); R.disco(x - 6, y0 + hh + 8, 1, K); }
  if (s > 0.6 && dentro) dentro(x0, y0, ww, hh);
};
// madera en tablas horizontales: vetas finas que ondulan, juntas oscuras, nudos y la luz de una lámpara (tonos de claro a oscuro)
const madera = (x0, y0, x1, y1, tonos, alto = 24, lx = 160, ly = 90) => {
  const c = tonos.map(hex);
  for (let y = y0; y <= y1; y++) { const tabla = Math.floor((y - y0) / alto), jy = (y - y0) % alto, des = H(tabla, 9) * 300;
    for (let x = x0; x <= x1; x++) {
      if (jy === 0) { R.pset(x, y, c[4]); continue; }
      if (jy === 1) { R.pset(x, y, c[1]); continue; }
      const xx = x + des, vet = Math.sin(xx / 23 + Math.sin(jy / 5 + xx / 61) * 1.4 + jy * 0.9), nudo = Math.hypot((xx % 140) - 70, jy - alto / 2) < 4;
      const luz = 1 - Math.min(1, Math.hypot((x - lx) / 230, (y - ly) / 150)) * 0.55;
      let q = luz * 0.75 + (vet > 0.82 ? -0.18 : vet > 0.55 ? -0.07 : 0) + (H(x >> 2, y, tabla) - 0.5) * 0.06;
      if (nudo) q -= 0.25;
      R.pset(x, y, q > 0.68 ? c[0] : q > 0.55 ? c[1] : q > 0.42 ? c[2] : q > 0.3 ? c[3] : c[4]);
    }
    if (jy === 0) for (let x = x0 + ((tabla * 97) % 120); x <= x1; x += 160) { R.rect(x, y - alto + 1, x, y - 1, c[4]); }
  }
};
// corazón de 7 × 6
const corazon = (x, y, c) => { for (const [i, j] of [[1,0],[2,0],[4,0],[5,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[1,3],[2,3],[3,3],[4,3],[5,3],[2,4],[3,4],[4,4],[3,5]]) R.pset(x + i, y + j, c); R.pset(x + 1, y + 1, hex('#ff9aa8')); };
// pica de 7 × 7
const pica = (x, y, c) => { for (const [i, j] of [[3,0],[2,1],[3,1],[4,1],[1,2],[2,2],[3,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[3,5],[2,6],[3,6],[4,6]]) R.pset(x + i, y + j, c); };
// la casita con palmera (el sueño de la buena vida), dentro de un bocadillo
const casita = (x, y) => {
  R.rect(x, y + 6, x + 12, y + 13, hex('#f4b0a0')); R.rect(x, y + 13, x + 12, y + 13, hex('#c87a6a'));
  R.poligono([[x - 2, y + 7], [x + 6, y], [x + 14, y + 7]], hex('#e8604a')); R.rect(x + 5, y + 9, x + 7, y + 13, hex('#6a3a2a')); R.rect(x + 9, y + 8, x + 11, y + 10, hex('#7ac8e8'));
  R.rect(x + 17, y + 3, x + 17, y + 13, hex('#8a5a30')); for (const [dx, dy] of [[-4, 1], [-3, 0], [3, 0], [4, 1], [-2, -1], [2, -1]]) R.linea(x + 17, y + 3, x + 17 + dx, y + 3 + dy + 1, hex('#3a9a4a'));
  R.disco(x + 22, y + 1, 2, hex('#f8c040'));
};
'''

E['lf-jason'] = ('Jason y Lucia', '''// LF-JASON (frases 24–25), sin cartela; 2026 salvo la foto (1933). Siete planos:
// 1. vicecity/playa cámara 'coche': Jason al volante y Lucia en su descapotable turquesa junto al mar; él saluda al nombrarlo,
//    ella se gira y señala el mar al nombrarla; una gaviota se posa en el capó y se va (corta en «According»);
// 2. INSERTO sobre el tapete: la baraja; nuestras dos cartas bajas de corazones a la izquierda; la mano canónica reparte
//    picas en un montón que crece y crece («the deck is stacked against them»); las dos cartas tiemblan (corta en «Lucia»);
// 3. interior/carcel: la corredera se abre al sol («walked out»); Lucia sale, se estira y echa a andar hacia la
//    carretera; el vigilante saluda; el bocadillo con la casita y la palmera («the good life») (corta en «Jason»);
// 4. interior/carcel cámara 'carretera': Jason en su silla plegable con la nevera en el arcén («an easy life»); la silla
//    se cierra de golpe («harder») y el descapotable rosa se va sin él (corta en «The press»);
// 5. INSERTO, 1933: la foto en sepia de la pareja de los años treinta junto a su coche, que la mano deja sobre un
//    escritorio de la época (reloj de bolsillo, lupa, café que humea, periódico sin letras); en «1930s» la mano lleva la
//    lupa sobre él (corta en «although»);
// 6. salon/salon cámara 'mesa': la mano trae la foto a la mesita; «?» en «doesn't use that name»; la mano da dos
//    golpecitos en el libro («everything anyone knew») y en «story» cae el candado (corta en «the rest»);
// 7. INSERTO del libro con candado (de cerca): la mano gira la llavecita y el arco se cierra en «spoil»; el mando de la
//    consola vibra en «playing».''', COMUN + r'''
const a = (f) => en('jason', f), b = (f) => en('bonnie', f);
const P2 = a(0.2098), P3 = a(0.4467), P4 = a(0.7887), P5 = b(0) - 0.05, P6 = b(0.3198), P7 = b(0.7721);
// ── 1. el descapotable junto al mar ──
const p1 = (t) => {
  const o = { encuadre: 'playa', camara: 'coche', colorCoche: '#3ab8c8' };
  T.vicecity(R, t, o);
  const jas = t > a(0.05) && t < a(0.05) + 1.4, luc = t > a(0.085);
  R.actor(EL.luciaLF, 150, 146, t, { dir: luc ? -1 : 1, dedo: luc && t < a(0.085) + 1.8, sonrisa: true, habla: luc && t < a(0.085) + 1.2 && Math.sin(t * 9) > 0 });
  R.actor(EL.jasonLF, 176, 146, t, { dir: 1, brazos: jas && t < a(0.05) + 0.7, sonrisa: true, habla: t > a(0.1) && t < a(0.2) && Math.sin(t * 8) > 0.2 });
  T.vicecityDelante(R, t, o);
  // la gaviota que baja al capó y se va
  const g1 = tramo(t, 0.6, 1.6), g2 = tramo(t, P2 - 1.3, P2 - 0.4);
  const gx = Math.round(g2 > 0 ? lerp(238, 330, g2) : lerp(320, 238, g1)), gy = Math.round(g2 > 0 ? lerp(124, 60, g2) : lerp(70, 124, g1));
  const vuela = g1 < 1 || g2 > 0, al = vuela ? (Math.sin(t * 20) > 0 ? -2 : 1) : 0;
  R.rect(gx - 3, gy - 3, gx + 3, gy, hex('#f4f4f0')); R.rect(gx - 3, gy, gx + 3, gy, hex('#c8c8cc')); R.pset(gx + (g2 > 0 ? 4 : -4), gy - 3, hex('#f0b030')); R.pset(gx + (g2 > 0 ? 3 : -3), gy - 4, K);
  if (vuela) { R.linea(gx - 2, gy - 2, gx - 8, gy - 2 + al, hex('#e0e0e4')); R.linea(gx + 2, gy - 2, gx + 8, gy - 2 + al, hex('#e0e0e4')); R.pset(gx - 8, gy - 2 + al, K); R.pset(gx + 8, gy - 2 + al, K); }
  else { R.pset(gx - 1, gy + 1, hex('#f0b030')); R.pset(gx + 1, gy + 1, hex('#f0b030')); R.rect(gx - 4, gy - 2, gx - 2, gy - 1, hex('#8a8e9a')); }
};
// ── 2. la baraja en contra ──
const tapete = (t) => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const d = Math.hypot((x - 168) / 190, (y - 86) / 120), l = 1 - Math.min(1, d) * 0.55, n = H(x >> 1, y >> 1) * 0.12;
    const v = Math.max(0, Math.min(1, l - n + (((x + y) & 3) === 0 ? 0.03 : 0)));
    R.pset(x, y, v > 0.82 ? hex('#3c8a5a') : v > 0.66 ? hex('#2f7a4c') : v > 0.5 ? hex('#26663f') : v > 0.36 ? hex('#1d5233') : hex('#163f28'));
  }
  // la sombra de las aspas del ventilador que barre el tapete
  for (let k = 0; k < 3; k++) { const an = t * 1.6 + k * 2.09; for (let r = 30; r < 120; r += 2) { const x = Math.round(168 + Math.cos(an) * r), y = Math.round(80 + Math.sin(an) * r * 0.6); for (let w = -3; w <= 3; w++) if (((x + w + y) & 1) === 0) R.pset(x + w, y, hex('#163f28')); } }
  // el posavasos de hoja de palma, una carta suelta boca abajo, la libreta con los tantos (solo cifras) y el lápiz
  R.disco(290, 88, 17, hex('#3a7a3a')); R.disco(290, 88, 15, hex('#4a9a48')); for (let k = 0; k < 8; k++) R.linea(290, 88, Math.round(290 + Math.cos(k * 0.785) * 15), Math.round(88 + Math.sin(k * 0.785) * 15), hex('#2e6a2e'));
  R.rect(96, 30, 140, 76, hex('#10301e')); R.rect(94, 28, 138, 74, K); R.rect(95, 29, 137, 73, hex('#f4f0e2')); for (let k = 0; k < 6; k++) R.rect(99, 34 + k * 7, 133, 34 + k * 7, hex('#a8c0d8')); R.rect(104, 29, 104, 73, hex('#e89090'));
  R.numero('12', 108, 40, { color: hex('#3a3a6a'), sombra: false }); R.numero('7', 108, 47, { color: hex('#3a3a6a'), sombra: false }); R.numero('0', 108, 54, { color: hex('#c83a3a'), sombra: false });
  R.linea(142, 70, 176, 52, K); R.linea(142, 71, 176, 53, hex('#f0c040')); R.rect(140, 70, 142, 72, hex('#f4b0a0'));
  { const cx = 196, cy = 30; R.poligono([[cx, cy], [cx + 22, cy + 6], [cx + 16, cy + 36], [cx - 6, cy + 30]], K); R.poligono([[cx + 1, cy + 1], [cx + 21, cy + 7], [cx + 15, cy + 35], [cx - 5, cy + 29]], hex('#c83a4a')); for (let k = 0; k < 6; k++) R.linea(cx + 2 + k * 3, cy + 6, cx - 2 + k * 3, cy + 26, hex('#e86a7a')); }
  // el canto de madera con vetas y el remate acolchado (un salamanquesa lo cruza)
  madera(0, 156, 319, 179, ['#c07a40', '#a8622e', '#8a5024', '#6e3e1c', '#4a2812'], 12, 160, 120);
  R.rect(0, 152, 319, 155, hex('#0e2a1a')); R.rect(0, 156, 319, 158, hex('#e0b070')); R.rect(0, 159, 319, 159, hex('#a8763a'));
  for (let x = 6; x < 320; x += 52) { R.disco(x, 168, 2, hex('#f0d090')); R.pset(x - 1, 167, hex('#fff0c0')); }
  { const gx = Math.round(lerp(-20, 340, ((t - P2) / 4.2))), gy = 164 + Math.round(Math.sin(t * 9)); R.rect(gx, gy, gx + 9, gy + 2, hex('#7ab84a')); R.rect(gx + 9, gy - 1, gx + 12, gy + 2, hex('#8ac85a')); R.linea(gx - 6, gy + 2, gx, gy + 1, hex('#6aa83a')); R.pset(gx + 11, gy - 1, K);
    const p = Math.floor(t * 12) % 2; R.pset(gx + 2, gy + (p ? 3 : -1), hex('#6aa83a')); R.pset(gx + 7, gy + (p ? -1 : 3), hex('#6aa83a')); }
  // la llave del coche con el llavero de palmera y las gafas de sol
  R.disco(40, 40, 5, hex('#c8c8d0')); R.disco(40, 40, 3, hex('#26663f')); R.rect(44, 39, 60, 41, hex('#d8d8e0')); R.rect(54, 41, 56, 43, hex('#d8d8e0')); R.rect(58, 41, 60, 44, hex('#d8d8e0')); R.rect(44, 41, 60, 41, hex('#8a8a96'));
  R.rect(28, 30, 32, 44, hex('#8a5a30')); for (const [dx, dy] of [[-5, -2], [5, -2], [-4, -4], [4, -4], [0, -5]]) R.linea(30, 30, 30 + dx, 30 + dy, hex('#3aba5a'));
  { const sx = -214, sy = 4; R.rect(244 + sx, 128 + sy, 262 + sx, 136 + sy, K); R.rect(268 + sx, 128 + sy, 286 + sx, 136 + sy, K); R.rect(245 + sx, 129 + sy, 261 + sx, 135 + sy, hex('#2a3a5a')); R.rect(269 + sx, 129 + sy, 285 + sx, 135 + sy, hex('#2a3a5a')); R.rect(262 + sx, 130 + sy, 268 + sx, 131 + sy, K); R.pset(247 + sx, 130 + sy, hex('#8ab0e0')); R.pset(271 + sx, 130 + sy, hex('#8ab0e0')); }
  // el vaso de limonada con hielo y pajita (las burbujas suben), fuera de la esquina de Atom
  { const vy = 24; R.disco(290, 62 + vy, 13, hex('#163f28')); R.rect(280, 40 + vy, 300, 66 + vy, hex('#f0e890')); R.rect(280, 40 + vy, 281, 66 + vy, hex('#fffbe0')); R.rect(299, 40 + vy, 300, 66 + vy, hex('#c8b850')); R.rect(280, 40 + vy, 300, 42 + vy, hex('#fffbe8'));
  R.rect(284, 44 + vy, 289, 49 + vy, hex('#fbfbf0')); R.rect(291, 47 + vy, 296, 52 + vy, hex('#f0f4f0')); R.linea(294, 30 + vy, 290, 52 + vy, hex('#e84a6a')); R.linea(295, 30 + vy, 291, 52 + vy, hex('#ff8aa0'));
  for (let k = 0; k < 4; k++) { const yy = 64 - ((t * 9 + k * 6) % 22); R.pset(283 + k * 4, Math.round(yy) + vy, hex('#fffbe0')); }
  R.rect(280, 66 + vy, 300, 67 + vy, K); }
};
const carta = (x, y, cara, palo, num, ang = 0) => {
  R.rect(x - 1, y + 2, x + 23, y + 33, hex('#10301e'));
  R.rect(x, y, x + 22, y + 31, K); R.rect(x + 1, y + 1, x + 21, y + 30, cara ? hex('#fbf8f0') : hex('#c83a4a'));
  if (!cara) { for (let j = 3; j < 29; j += 3) for (let i = 3; i < 20; i += 3) R.pset(x + i + (j % 2), y + j, hex('#f8d0d0')); R.rect(x + 3, y + 3, x + 19, y + 3, hex('#f8e0e0')); return; }
  R.rect(x + 1, y + 28, x + 21, y + 30, hex('#e4ddcc'));
  const c = palo === 'c' ? hex('#d8303e') : hex('#1a1a26');
  R.numero(String(num), x + 3, y + 9, { color: palo === 'c' ? hex('#d8303e') : hex('#1a1a26'), sombra: false });
  (palo === 'c' ? corazon : pica)(x + 8, y + 13, c);
};
const p2 = (t) => {
  tapete(t);
  // nuestras dos cartas bajas, que tiemblan cuando el montón se les viene encima
  const tiembla = t > a(0.37) && t < a(0.37) + 1.2 ? (Math.floor(t * 18) % 2) : 0;
  carta(44 + tiembla, 92, true, 'c', 2); carta(72 - tiembla, 96, true, 'c', 3);
  // la baraja a la derecha (el canto con sus hojas), junto al borde: la mano reparte desde ahí
  const reparto = tramo(t, P2 + 0.3, a(0.37)) * 9, n = Math.min(9, Math.floor(reparto)), fase = reparto - Math.floor(reparto), activo = reparto > 0 && reparto < 9;
  const quedan = 9 - n;
  for (let k = 0; k < 3 + quedan; k++) carta(254, 106 - k, false);
  // el montón de picas que crece en el medio (cada carta resbala por el tapete desde la baraja)
  const valores = [9, 8, 9, 7, 9, 8, 9, 6, 9];
  for (let k = 0; k < n; k++) carta(140 + ((k * 5) % 3) - 1, 108 - k * 6, true, 'p', valores[k]);
  if (activo && fase > 0.35) { const u = Math.min(1, (fase - 0.35) / 0.45); carta(Math.round(lerp(250, 140, u)), Math.round(lerp(100, 108 - n * 6, u)) - Math.round(Math.sin(u * 3.14) * 8), u > 0.6, 'p', valores[n]); }
  // la mano canónica, corta, desde la esquina: coge la carta de arriba y la lanza (un ciclo por carta)
  const tiro = activo ? (fase < 0.35 ? fase / 0.35 : 1 - (fase - 0.35) / 0.65) : 0, sal = tramo(t, a(0.37) + 0.2, a(0.37) + 0.8);
  const mx = Math.round(lerp(282, 262, tiro) + sal * 40), my = Math.round(lerp(104, 96, tiro) + sal * 30);
  T.brazo(R, 340, 170, mx, my, '#2a5a7a', -1, { codo: [326, 128] });
};
// ── 3. la puerta de la cárcel ──
const p3 = (t) => {
  const abre = tramo(t, P3 + 0.3, a(0.5));
  const o = { encuadre: 'carcel', abre };
  T.interior(R, t, o);
  const sale = tramo(t, a(0.5) - 0.1, a(0.73)), lx = Math.round(lerp(176, 92, sale));
  if (abre > 0.55) R.actor(EL.luciaLF, lx, 162, t, { dir: -1, anda: sale > 0 && sale < 1, brazos: t > a(0.73) && t < a(0.73) + 0.9, sonrisa: t > a(0.6) });
  bocadillo(lx + 4, 126, 34, 22, tramo(t, a(0.66), a(0.69)) - tramo(t, P4 - 0.5, P4 - 0.2), (x0, y0) => casita(x0 + 4, y0 + 5));
  T.interiorDelante(R, t, o);
};
// ── 4. la silla que se cierra ──
const rayas = (x0, y0, x1, y1) => { for (let x = x0; x <= x1; x++) R.rect(x, y0, x, y1, ((x - x0) >> 2) % 2 ? hex('#f8f4e8') : hex('#3a9ad8')); R.rect(x0, y1, x1, y1, hex('#2a6aa0')); R.rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, K); R.rect(x0 - 1, y1 + 1, x1 + 1, y1 + 1, K); R.rect(x0 - 1, y0, x0 - 1, y1, K); R.rect(x1 + 1, y0, x1 + 1, y1, K); };
// la silla de playa plegable vista de frente (x: borde izquierdo; y: el suelo); el respaldo va detrás del actor y el
// asiento y las patas delante; cierre 0–1 la pliega hasta el suelo
const sillaAtras = (x, y, cierre) => { if (cierre > 0.5) return; R.linea(x + 1, y - 34, x + 1, y - 10, hex('#b8b8c4')); R.linea(x + 22, y - 34, x + 22, y - 10, hex('#b8b8c4')); rayas(x + 2, y - 33, x + 21, y - 14); };
const sillaDelante = (x, y, cierre) => {
  const h = Math.round(lerp(10, 2, cierre));
  R.linea(x, y, x + 23, y - h, K); R.linea(x + 23, y, x, y - h, K); R.linea(x + 1, y, x + 23, y - h + 1, hex('#c8c8d4')); R.linea(x + 22, y, x, y - h + 1, hex('#c8c8d4'));
  rayas(x, y - h - 4, x + 23, y - h);
  if (cierre > 0.5) rayas(x - 2, y - 3, x + 25, y - 1);
};
const p4 = (t) => {
  const plie = tramo(t, a(0.95), a(0.95) + 0.2), vaCoche = tramo(t, a(0.88), P5);
  const o = { encuadre: 'carcel', camara: 'carretera', coche: vaCoche > 0 ? vaCoche : 0.001 };
  T.interior(R, t, o);
  // la nevera azul y blanca con su asa y una lata encima
  R.rect(56, 146, 76, 160, K); R.rect(57, 147, 75, 159, hex('#3a8ad8')); R.rect(57, 147, 75, 150, hex('#f4f4f0')); R.rect(61, 143, 71, 144, K); R.pset(61, 145, K); R.pset(71, 145, K); R.rect(57, 158, 75, 159, hex('#2a6aa8'));
  R.rect(64, 139, 67, 146, K); R.rect(65, 140, 66, 145, hex('#e8603a')); R.pset(65, 140, hex('#f8d0b0'));
  sillaAtras(80, 160, plie);
  const caido = plie > 0.5, salto = t > a(0.95) + 0.2 && t < a(0.95) + 0.6 ? 3 : 0;
  // Jason sentado: los pies quedan tapados por el asiento; al plegarse, cae al suelo
  R.actor(EL.jasonLF, 84, caido ? 162 : 151, t, { dir: 1, sonrisa: !caido, sorpresa: caido, salto, habla: t > P4 + 0.3 && t < P4 + 1.6 && Math.sin(t * 8) > 0.3, brazos: !caido && t > P4 + 1.7 && t < a(0.94) });
  sillaDelante(80, 160, plie);
  if (caido && t < a(0.95) + 1.2) for (const [dx, dy] of [[-4, -6], [28, -8], [-6, 0], [30, -2]]) R.pset(80 + dx, 150 + dy, hex('#fff6c0'));
  T.interiorDelante(R, t, o);
};
// ── 5. la foto en sepia de 1934 ──
const escritorio = (t, sinLupa = false) => {
  madera(0, 0, 319, 179, ['#a86a38', '#8e5630', '#784626', '#5e361e', '#3e2212'], 26, 170, 80);
  // el periódico de la época (solo rayas y una foto), a la izquierda
  R.poligono([[4, 34], [96, 28], [102, 98], [8, 106]], hex('#3a2212')); R.poligono([[4, 32], [94, 26], [100, 94], [8, 102]], hex('#d8ccb0')); R.poligono([[6, 34], [92, 28], [97, 92], [10, 100]], hex('#ece2c8'));
  R.rect(14, 38, 86, 42, hex('#3a3228')); for (let k = 0; k < 8; k++) R.rect(14, 48 + k * 5, 46, 49 + k * 5, hex('#8a7e6a')); R.rect(52, 48, 86, 74, hex('#9a8e78')); R.rect(54, 50, 84, 72, hex('#b8ac94'));
  R.rect(60, 62, 78, 70, hex('#8a7e68')); R.disco(66, 58, 3, hex('#8a7e68'));
  for (let k = 0; k < 3; k++) R.rect(52, 78 + k * 5, 88, 79 + k * 5, hex('#8a7e6a'));
  // la taza de café con su plato y el vapor que sube
  R.disco(124, 74, 11, hex('#3a2212')); R.disco(124, 72, 11, hex('#e8e0d0')); R.disco(124, 72, 7, hex('#f8f4ea')); R.disco(124, 72, 5, hex('#4a2a14')); R.pset(122, 70, hex('#8a5a30'));
  R.rect(132, 70, 134, 74, hex('#f8f4ea'));
  for (let k = 0; k < 3; k++) { const ph = t * 1.4 + k * 2.1, u = ph - Math.floor(ph); R.pset(Math.round(122 + k * 2 + Math.sin(u * 6 + k) * 2), Math.round(64 - u * 20), hex('#f0e4d0')); R.pset(Math.round(123 + k * 2 + Math.sin(u * 6 + k) * 2), Math.round(63 - u * 20), hex('#e0d0bc')); }
  // el reloj de bolsillo con su cadena (el segundero corre)
  R.disco(40, 146, 13, K); R.disco(40, 146, 12, hex('#d8b048')); R.disco(40, 146, 10, hex('#f8f0dc')); R.disco(40, 132, 3, hex('#d8b048'));
  for (let k = 0; k < 12; k++) R.pset(Math.round(40 + Math.cos(k * 0.52) * 8), Math.round(146 + Math.sin(k * 0.52) * 8), hex('#5a4a3a'));
  R.linea(40, 146, 40, 140, K); R.linea(40, 146, 44, 147, K); const sg = Math.floor(t) * 0.105; R.linea(40, 146, Math.round(40 + Math.sin(sg) * 8), Math.round(146 - Math.cos(sg) * 8), hex('#c83a3a'));
  for (let k = 0; k < 14; k++) R.pset(Math.round(44 + k * 4), Math.round(130 + Math.sin(k * 0.7) * 3 + k * 0.6), hex('#e8c060'));
  // la lupa
  if (!sinLupa) lupa(104, 140);
};
const lupa = (cx, cy) => {
  R.disco(cx, cy, 15, K); R.disco(cx, cy, 13, hex('#b89a40')); R.disco(cx, cy, 11, hex('#a8c0c8')); R.disco(cx - 4, cy - 4, 3, hex('#e8f4f8'));
  R.linea(cx + 10, cy + 11, cx + 28, cy + 32, K); R.linea(cx + 11, cy + 11, cx + 29, cy + 32, hex('#3a2218')); R.linea(cx + 12, cy + 11, cx + 30, cy + 32, hex('#5a3424'));
};
const motas = (t) => {
  for (let k = 0; k < 12; k++) { const x = Math.round(120 + ((k * 37 + t * 4) % 150)), y = Math.round(24 + ((k * 23 + t * 3) % 140)); R.pset(x, y, hex('#f8e0b0')); }
};
const fotoAntigua = (x0, y0, t) => {
  // el papel con su borde blanco dentado y su sombra
  R.rect(x0 + 3, y0 + 4, x0 + 153, y0 + 112, hex('#3a2010'));
  R.rect(x0, y0, x0 + 150, y0 + 108, hex('#efe6d0'));
  for (let x = x0; x <= x0 + 150; x += 3) { R.pset(x, y0, hex('#3a2010')); R.pset(x, y0 + 108, hex('#3a2010')); }
  for (let y = y0; y <= y0 + 108; y += 3) { R.pset(x0, y, hex('#3a2010')); R.pset(x0 + 150, y, hex('#3a2010')); }
  const ix0 = x0 + 8, iy0 = y0 + 8, ix1 = x0 + 142, iy1 = y0 + 92;
  // la escena en color (luego se pasa a sepia): cielo con nubes, campo, camino de tierra, valla y el coche de 1934
  for (let y = iy0; y <= iy1; y++) for (let x = ix0; x <= ix1; x++) {
    const hor = iy0 + 42;
    let c;
    if (y < hor) c = (H(x >> 2, y >> 2, 5) > 0.82 && y < hor - 18) ? hex('#ffffff') : y < iy0 + 16 ? hex('#7ab0e0') : hex('#a8d0f0');
    else if (y < hor + 6) c = H(x >> 1, y, 2) > 0.5 ? hex('#6a8a4a') : hex('#5a7a3a');
    else c = Math.abs(x - (ix0 + 30) - (y - hor) * 0.6) < (y - hor) * 1.2 ? (H(x, y, 4) > 0.8 ? hex('#a08060') : hex('#c8a882')) : (H(x, y, 1) > 0.7 ? hex('#7a9a4a') : hex('#8aaa5a'));
    R.pset(x, y, c);
  }
  // nubes grandes
  for (const [cx, cy, r] of [[ix0 + 24, iy0 + 12, 6], [ix0 + 34, iy0 + 10, 8], [ix0 + 44, iy0 + 13, 5], [ix0 + 98, iy0 + 18, 5], [ix0 + 106, iy0 + 16, 7]]) R.disco(cx, cy, r, hex('#f8f8f8'));
  // árbol solitario y postes de la valla
  R.rect(ix0 + 118, iy0 + 26, ix0 + 120, iy0 + 44, hex('#4a3020')); R.disco(ix0 + 119, iy0 + 22, 9, hex('#3a6a2a')); R.disco(ix0 + 115, iy0 + 25, 6, hex('#4a7a34'));
  for (let k = 0; k < 7; k++) { const px = ix0 + 4 + k * 20; R.rect(px, iy0 + 40, px + 1, iy0 + 50, hex('#5a4030')); } R.rect(ix0, iy0 + 43, ix1, iy0 + 43, hex('#6a5040')); R.rect(ix0, iy0 + 47, ix1, iy0 + 47, hex('#6a5040'));
  // el sedán de los años treinta (de perfil, mirando a la izquierda)
  const cx = ix0 + 44, cy = iy0 + 74;
  R.poligono([[cx, cy - 6], [cx + 6, cy - 12], [cx + 22, cy - 13], [cx + 26, cy - 24], [cx + 54, cy - 24], [cx + 60, cy - 13], [cx + 68, cy - 11], [cx + 70, cy - 3], [cx + 70, cy + 2], [cx, cy + 2]], K);
  R.poligono([[cx + 1, cy - 6], [cx + 7, cy - 11], [cx + 23, cy - 12], [cx + 27, cy - 23], [cx + 53, cy - 23], [cx + 59, cy - 12], [cx + 67, cy - 10], [cx + 69, cy - 3], [cx + 69, cy + 1], [cx + 1, cy + 1]], hex('#2a3a4a'));
  R.rect(cx + 29, cy - 21, cx + 39, cy - 14, hex('#a8c8e0')); R.rect(cx + 42, cy - 21, cx + 51, cy - 14, hex('#a8c8e0')); R.rect(cx + 40, cy - 21, cx + 41, cy - 3, K);
  R.rect(cx + 2, cy - 9, cx + 6, cy - 6, hex('#d8d8d0')); R.rect(cx - 1, cy - 1, cx + 3, cy + 1, hex('#c8c8c0')); R.rect(cx + 8, cy - 11, cx + 22, cy - 11, hex('#5a6a7a'));
  R.linea(cx + 10, cy - 3, cx + 60, cy - 3, hex('#4a5a6a'));
  for (const wx of [cx + 14, cx + 56]) { R.disco(wx, cy + 2, 7, K); R.disco(wx, cy + 2, 5, hex('#3a3a3a')); R.disco(wx, cy + 2, 3, hex('#e8e8e0')); R.disco(wx, cy + 2, 1, hex('#8a8a8a')); }
  R.poligono([[cx + 4, cy - 5], [cx + 10, cy - 1], [cx + 22, cy - 1], [cx + 26, cy - 5]], hex('#1e2a36'));
  // la pareja: ella con el pie en el estribo, él con el sombrero, apoyado en el morro
  R.actor(EL.bonnieLF, ix0 + 20, iy0 + 82, 0.5, { dir: 1, sonrisa: true, quieto: true });
  R.actor(EL.clydeLF, ix0 + 116, iy0 + 82, 1.3, { dir: -1, quieto: true });
  sepia(ix0, iy0, ix1, iy1, 0.5);
  // el reflejo del papel brillante que cruza
  const z = ((t * 30) % 260) - 60; for (let y = iy0; y <= iy1; y++) for (let w = 0; w < 5; w++) { const x = Math.round(ix0 + z + (y - iy0) * 0.6 + w); if (x >= ix0 && x <= ix1 && ((x + y) & 1)) R.pset(x, y, hex('#fff4dc')); }
  // las esquinas de álbum
  for (const [qx, qy, sx, sy] of [[x0 - 2, y0 - 2, 1, 1], [x0 + 152, y0 - 2, -1, 1], [x0 - 2, y0 + 110, 1, -1], [x0 + 152, y0 + 110, -1, -1]]) R.poligono([[qx, qy], [qx + sx * 14, qy], [qx, qy + sy * 14]], hex('#2a1a12'));
};
// la lupa sobre el cristal: lo de dentro se aclara, como si se acercara
const lupaEncima = (cx, cy) => {
  const B = R.buf; for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { if (i * i + j * j > 100) continue; const x = cx + i, y = cy + j; if (x < 0 || x > 319 || y < 0 || y > 179) continue;
    const c = B[y * 320 + x], r = Math.min(255, (c & 255) + 34), g = Math.min(255, ((c >> 8) & 255) + 30), b2 = Math.min(255, ((c >> 16) & 255) + 22); B[y * 320 + x] = (0xff000000 | (b2 << 16) | (g << 8) | r) >>> 0; }
  for (let a2 = 0; a2 < 6.29; a2 += 0.06) { R.pset(Math.round(cx + Math.cos(a2) * 12), Math.round(cy + Math.sin(a2) * 12), hex('#b89a40')); R.pset(Math.round(cx + Math.cos(a2) * 13), Math.round(cy + Math.sin(a2) * 13), K); }
  R.pset(cx - 5, cy - 6, hex('#ffffff')); R.pset(cx - 6, cy - 5, hex('#ffffff'));
  R.linea(cx + 10, cy + 10, cx + 26, cy + 30, K); R.linea(cx + 11, cy + 10, cx + 27, cy + 30, hex('#5a3424'));
};
const p5 = (t) => {
  const lp = tramo(t, b(0.2), b(0.23)) * (1 - tramo(t, b(0.3), b(0.315)));
  escritorio(t, lp > 0);
  const entra = tramo(t, P5 + 0.1, b(0.068)), fx = 146, fy = Math.round(lerp(196, 46, entra));
  fotoAntigua(fx, fy, t);
  motas(t);
  // la mano que la deja y se va
  const m = entra < 1 ? 1 : 1 - tramo(t, b(0.075), b(0.13));
  if (m > 0.02 && fy < 190) T.brazo(R, 340, 196, Math.round(lerp(340, fx + 146, m)), Math.min(190, fy + 92), '#6a5a4a', -1, { codo: [324, 172] });
  // en «the 1930s» la mano trae la lupa sobre la pareja (él, con su sombrero de fieltro)
  if (lp > 0.02) { const cx = Math.round(lerp(104, 276, lp)), cy = Math.round(lerp(140, 118, lp)); if (lp < 1) lupa(cx, cy); else lupaEncima(cx, cy); T.brazo(R, 344, 196, cx + 30, cy + 33, '#2a5a7a', -1, { codo: [330, 176] }); }
};
// ── 6. la mesita: la foto, la tele y el candado ──
const p6 = (t) => {
  const o = { encuadre: 'salon', camara: 'mesa', foto: tramo(t, P6 + 0.1, P6 + 1.0), candado: tramo(t, b(0.712), b(0.735)) };
  T.salon(R, t, o); T.salonDelante(R, t, o);
  // la mano que trae la foto desde abajo
  const m = tramo(t, P6, P6 + 1.0) * (1 - tramo(t, P6 + 1.3, P6 + 2.0));
  if (m > 0.02) T.brazo(R, 250, 200, 236, Math.round(lerp(200, 150, m)), '#2a5a7a', 1, { codo: [262, 186] });
  // el «?» sobre la foto cuando se dice que Rockstar no usa ese nombre, y el destello de la tele en «until today»
  const q = tramo(t, b(0.37), b(0.39)) - tramo(t, b(0.47), b(0.49)); if (q > 0) R.icono('?', 216, Math.round(118 - q * 6), hex('#f8e070'), K, 2);
  // la mano que da dos golpecitos en el libro («everything anyone knew about their story») antes de que caiga el candado
  const tq = tramo(t, b(0.57), b(0.62)) * (1 - tramo(t, b(0.69), b(0.72))), toc = t > b(0.62) && t < b(0.69) ? Math.round(Math.abs(Math.sin((t - b(0.62)) * 9)) * 3) : 0;
  if (tq > 0.02) T.brazo(R, 306, 204, 292, Math.round(lerp(204, 142, tq)) - toc, '#2a5a7a', -1, { codo: [312, 178] });
};
// ── 7. el libro con el candado ──
const p7 = (t) => {
  // la mesa de teca de cerca, con vetas y cercos de vasos
  madera(0, 0, 319, 179, ['#c48450', '#a86a3c', '#8e5630', '#744424', '#5c341c'], 30, 190, 90);
  for (let a2 = 0; a2 < 6.28; a2 += 0.05) { R.pset(Math.round(96 + Math.cos(a2) * 14), Math.round(26 + Math.sin(a2) * 9), hex('#6a3e20')); R.pset(Math.round(250 + Math.cos(a2) * 11), Math.round(166 + Math.sin(a2) * 7), hex('#6a3e20')); }
  // la luz de la tele que parpadea: un reflejo azulado que respira en el canto de arriba de la mesa
  if (Math.sin(t * 7) * Math.sin(t * 2.3) > 0.3) for (let x = 0; x < 320; x += 2) R.pset(x, 1 + ((x >> 1) & 1), hex('#c8a07a'));
  // la caja del juego (cerrada), el mando de la consola y el bol de palomitas abajo (una salta)
  T.a_caja(R, 26, 40, t, { s: 2, sombra: true });
  const vib = t > b(0.807) && t < b(0.87) ? (Math.floor(t * 30) % 2) : 0;
  const mx = 16 + vib, my = 104;
  R.disco(mx + 6, my + 14, 9, K); R.disco(mx + 36, my + 14, 9, K); R.rect(mx + 4, my + 4, mx + 38, my + 18, K);
  R.disco(mx + 6, my + 14, 8, hex('#2a2a36')); R.disco(mx + 36, my + 14, 8, hex('#2a2a36')); R.rect(mx + 5, my + 5, mx + 37, my + 17, hex('#3a3a48')); R.rect(mx + 5, my + 5, mx + 37, my + 6, hex('#5a5a6c'));
  R.rect(mx + 5, my + 10, mx + 11, my + 12, hex('#1a1a22')); R.rect(mx + 7, my + 8, mx + 9, my + 14, hex('#1a1a22'));
  for (const [dx, dy, c] of [[32, 8, '#e84a5a'], [36, 11, '#4ab0e8'], [28, 11, '#5ad870'], [32, 14, '#f0c040']]) { R.disco(mx + dx, my + dy, 1, hex(c)); }
  R.rect(mx + 19, my + 9, mx + 23, my + 10, vib || Math.floor(t * 2) % 2 ? hex('#7ae0ff') : hex('#2a6a8a'));
  if (vib) { R.linea(mx - 4, my + 6, mx - 2, my + 10, hex('#f8e8c0')); R.linea(mx + 46, my + 6, mx + 44, my + 10, hex('#f8e8c0')); }
  R.disco(66, 190, 32, K); for (let y = 158; y < 180; y++) for (let x = 34; x <= 98; x++) if (Math.hypot(x - 66, y - 190) <= 30) R.pset(x, y, (((x - 34) >> 3) & 1) ? hex('#f8f0e8') : hex('#e85a4a')); R.disco(66, 188, 25, hex('#f8f0d0'));
  for (let k = 0; k < 16; k++) { const px = Math.round(44 + H(k, 1) * 44), py = Math.round(164 + H(k, 2) * 14); R.disco(px, py, 2, hex('#fffbe8')); R.pset(px + 1, py + 1, hex('#e8c060')); }
  const sal = tramo(t, P7 + 1.0, P7 + 1.3) - tramo(t, P7 + 1.3, P7 + 1.7); R.disco(70, Math.round(158 - sal * 16), 2, hex('#fffbe8'));
  // el libro viejo de cuero con cantoneras y la ilustración en relieve (sol y palmera, sin letras)
  const bx = 122, by = 40;
  R.rect(bx + 4, by + 6, bx + 170, by + 116, hex('#3a2010'));
  R.rect(bx, by, bx + 164, by + 108, K); R.rect(bx + 1, by + 1, bx + 163, by + 107, hex('#7a3a2a'));
  for (let y = by + 2; y < by + 107; y++) for (let x = bx + 2; x < bx + 163; x++) if (H(x, y, 7) > 0.86) R.pset(x, y, hex('#6a3022')); else if (H(x, y, 8) > 0.95) R.pset(x, y, hex('#8a4a36'));
  R.rect(bx + 1, by + 1, bx + 12, by + 107, hex('#5e2a1e')); for (let y = by + 12; y < by + 100; y += 20) R.rect(bx + 2, y, bx + 11, y + 2, hex('#c89a50'));
  R.rect(bx + 164, by + 4, bx + 168, by + 104, hex('#f0e4c8')); for (let y = by + 6; y < by + 104; y += 2) R.pset(bx + 166, y, hex('#d8c8a8'));
  for (const [qx, qy] of [[bx + 150, by + 1], [bx + 150, by + 93]]) { R.rect(qx, qy, qx + 13, qy + 13, hex('#c8a050')); R.rect(qx + 1, qy + 1, qx + 12, qy + 12, hex('#e0bc68')); R.pset(qx + 6, qy + 6, hex('#8a6a30')); }
  R.rect(bx + 40, by + 18, bx + 136, by + 84, hex('#c89a50')); R.rect(bx + 42, by + 20, bx + 134, by + 82, hex('#6a2e22'));
  R.disco(bx + 88, by + 60, 18, hex('#c89a50')); R.disco(bx + 88, by + 60, 16, hex('#6a2e22')); for (let k = 0; k < 4; k++) R.rect(bx + 66, by + 62 + k * 4, bx + 110, by + 62 + k * 4, hex('#c89a50'));
  R.rect(bx + 108, by + 36, bx + 109, by + 78, hex('#c89a50')); for (const [dx, dy] of [[-10, 4], [10, 4], [-8, 1], [8, 1], [-4, -2], [4, -2]]) R.linea(bx + 108, by + 36, bx + 108 + dx, by + 36 + dy + 4, hex('#c89a50'));
  // la correa con la hebilla y el candado grande
  R.rect(bx + 120, by + 48, bx + 172, by + 62, K); R.rect(bx + 121, by + 49, bx + 171, by + 61, hex('#4a2a1c')); for (let x = bx + 122; x < bx + 170; x += 3) R.pset(x, by + 51, hex('#6a4030'));
  const cierra = tramo(t, b(0.94) - 0.2, b(0.94)), lx = bx + 150, ly = by + 60;
  // el arco del candado (baja y encaja)
  const arc = Math.round(lerp(8, 0, cierra));
  for (let k = 0; k < 2; k++) { R.rect(lx - 9 + k, ly - 18 - arc, lx - 6 + k, ly - 2 - (k ? arc : 0), K); R.rect(lx + 6 + k, ly - 18, lx + 9 + k, ly - 2, K); }
  R.rect(lx - 8, ly - 18 - arc, lx - 7, ly - 3 - arc, hex('#c8c8d4')); R.rect(lx + 7, ly - 18, lx + 8, ly - 3, hex('#c8c8d4'));
  for (let a2 = 3.14; a2 <= 6.29; a2 += 0.08) { R.pset(Math.round(lx + Math.cos(a2) * 8), Math.round(ly - 18 - arc + Math.sin(a2) * 7), hex('#c8c8d4')); R.pset(Math.round(lx + Math.cos(a2) * 9), Math.round(ly - 18 - arc + Math.sin(a2) * 8), K); }
  R.rect(lx - 13, ly - 4, lx + 13, ly + 22, K); R.rect(lx - 12, ly - 3, lx + 12, ly + 21, hex('#d8a838')); R.rect(lx - 12, ly - 3, lx + 12, ly - 1, hex('#f8d870')); R.rect(lx + 10, ly - 3, lx + 12, ly + 21, hex('#a87820'));
  R.disco(lx, ly + 8, 3, K); R.rect(lx - 1, ly + 8, lx + 1, ly + 14, K);
  // la mano con la llavecita: entra, la mete y la gira en «spoil»
  const llega = tramo(t, P7 + 0.4, b(0.9)), sale = tramo(t, b(0.975), E.duracion);
  if (llega > 0 && sale < 1) {
    const kx = Math.round(lerp(330, lx + 4, llega - sale)), ky = ly + 10, gira = cierra;
    R.rect(kx - 6, ky - 1, kx + 2, ky + 1, hex('#e8c860')); R.disco(kx + 6, ky, 4, hex('#e8c860')); R.disco(kx + 6, ky, 2, hex('#8a6a30'));
    if (gira > 0.5) R.rect(kx - 6, ky - 2, kx - 4, ky + 2, hex('#e8c860'));
    T.brazo(R, 340, 160, kx + 14, ky + 2, '#2a5a7a', -1, { codo: [326, 136] });
  }
  if (cierra >= 1 && t < b(0.94) + 0.6) for (const [dx, dy] of [[-18, -22], [18, -24], [-20, 2], [20, 0]]) R.pset(lx + dx, ly + dy, hex('#fff6c0'));
};
const año = (t) => t >= P5 && t < P6 ? 1933 : 2026;
const efectos = [[a(0.05), 'claxon'], [P2 + 0.6, 'papel'], [a(0.37), 'papel'], [a(0.5), 'cerrojo'], [a(0.95), 'golpecito'], [a(0.97), 'coche'], [b(0.068), 'papel'], [b(0.21), 'whoosh'], [b(0.733), 'golpecito'], [b(0.81), 'zumbido'], [b(0.94), 'cerrojo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')

E['lf-cierre'] = ('El cierre', '''// LF-CIERRE (frases 29–30), sin cartela, 2026 (el archivo, 1997). Siete planos:
// 1. cayos/puente cámara 'barandilla': la patinadora recorre el arcén, el coche pasa por delante; en «funhouse mirror»
//    el espejo de feria (T.a_vcEspejo) entra y todo se estira (corta en «Alligators»);
// 2. tienda/piscina cámara 'agua', en el espejo: el caimán cruza a nado, sube al flotador de flamenco y le salen las
//    gafas de sol (gag 7) (corta en «a river»);
// 3. everglades/rio, en el espejo: la turista sale a la pasarela y hace la foto con flash en «grass»; asoma un caimán y
//    ella da un respingo; en «a mountain that isn't there» el espejo pasa a interior/britton 'capas': el mar baja, la
//    silueta a rayas de la montaña que no está parpadea con un «?» y se tacha en «there» (corta al acabar «there»);
// 4. redaccion cámara 'impresora', en el espejo: la impresora escupe titulares; el periodista coge uno, se asombra en
//    «exaggerated» y en «really happened» el espejo se endereza y él asiente (corta en «And you»);
// 5. movil cámara 'feed': el dedo desliza los vídeos (la tienda del caimán, la piscina, la playa, el puente): «which real
//    Florida moment…?», un «?»; en «Tell me in the comments», doble toque, corazón y suben los comentarios (corta en «And if»);
// 6. redaccion/archivo cámara 'cajones' (1997): la mano tira desde arriba de la ficha roja; en «Scotland» sale la banderita
//    (la cruz de San Andrés) y en «with a game» se escribe 1997 (corta en «almost»);
// 7. salon/mapa general: los fans tachan las seis regiones del mapa; Atom con la mochila y el mando; en el portátil la
//    barra de descarga llega al 100 % en «GTA» y sale el 100 de oro; los fans lo celebran.''', COMUN + r'''
const a = (f) => en('espejo', f), b = (f) => en('final', f);
const P2 = a(0.278), P3 = a(0.5128), P4 = a(0.787), P5 = b(0) - 0.05, P6 = b(0.3972), P7 = b(0.6992);
const fe = (t) => tramo(t, a(0.15), a(0.23));
// ── 1. el puente desde la barandilla ──
const p1 = (t) => {
  const o = { encuadre: 'puente', camara: 'barandilla', coche: tramo(t, 0.8, 3.4) };
  T.cayos(R, t, o);
  const u = tramo(t, 0.2, P2 - 0.2);
  R.actor(EL.patinadoraLF, Math.round(lerp(20, 250, u)), 160, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: true, brazos: t > a(0.2) && t < a(0.2) + 0.8 });
  T.cayosDelante(R, t, o);
  T.a_vcEspejo(R, t, fe(t));
};
// ── 2. la piscina por dentro: el caimán del flotador ──
const p2 = (t) => {
  const o = { encuadre: 'piscina', camara: 'agua', flamenco: false };
  T.tienda(R, t, o);
  const nada = tramo(t, P2 + 0.1, a(0.4)), sube = tramo(t, a(0.4), a(0.43));
  const fy = Math.round(104 + Math.sin(t * 2.2) * 1.5), fx = Math.round(150 + Math.sin(t * 0.8) * 6);
  T.d_flamenco(R, fx, fy, t, { s: 2 });
  if (sube < 0.5) T.a_caiman(R, Math.round(lerp(340, fx + 40, nada)), 114, t, { dir: -1, agua: 1, s: 2 });
  else {
    // tumbado en el flotador, con las gafas de sol que le caen del cielo (gag 7)
    T.a_caiman(R, fx + 4, fy - 4, t, { dir: -1, s: 2, boca: t > a(0.47) ? 0.35 : 0 });
    const g = tramo(t, a(0.44), a(0.465)); if (g > 0) { const gx = fx - 16, gy = fy - 22 - Math.round((1 - g) * 30);
      R.rect(gx - 3, gy - 1, gx + 16, gy + 4, hex('#f8d040')); R.rect(gx - 2, gy, gx + 5, gy + 3, hex('#ff5a9a')); R.rect(gx + 8, gy, gx + 15, gy + 3, hex('#ff5a9a')); R.rect(gx + 6, gy - 1, gx + 7, gy + 4, hex('#f8d040')); R.rect(gx - 4, gy - 2, gx + 17, gy - 2, K); R.rect(gx - 4, gy + 5, gx + 17, gy + 5, K);
      R.pset(gx - 1, gy, hex('#8ab0f0')); R.pset(gx, gy, hex('#c8e0ff')); R.pset(gx + 9, gy, hex('#8ab0f0')); R.pset(gx + 10, gy, hex('#c8e0ff'));
      if (g >= 1 && Math.floor(t * 4) % 2) { R.pset(gx + 17, gy - 3, hex('#fff6c0')); R.pset(gx - 5, gy - 2, hex('#fff6c0')); } }
  }
  T.tiendaDelante(R, t, o);
  T.a_vcEspejo(R, t, 1);
};
// ── 3. el río de hierba y, en «a mountain that isn't there», el corte de Florida sin montaña (todo en el espejo) ──
const MONTE = a(0.6817);
const p3 = (t) => {
  if (t < MONTE) {
    const o = { encuadre: 'rio' };
    const g = T.everglades(R, t, o);
    const ag = (g.aguas || []).reduce((m, p) => (!m || Math.abs(p[0] - 150) < Math.abs(m[0] - 150) ? p : m), null) || [150, 118];
    const asoma = tramo(t, a(0.575), a(0.6)) - tramo(t, MONTE - 0.4, MONTE - 0.1);
    if (asoma > 0) T.a_caiman(R, ag[0], ag[1] + Math.round((1 - asoma) * 4), t, { dir: -1, agua: 0.5, s: 2 });
    const u = tramo(t, P3 + 0.05, a(0.53)), x = Math.round(lerp(20, 112, u));
    const foto = t > a(0.53) && t < a(0.6);
    const r = R.actor(EL.turistaLF, x, 150, t, { dir: 1, anda: u > 0 && u < 1, sostiene: foto ? [x + 18, 130] : undefined, sorpresa: t > a(0.6), salto: t > a(0.6) && t < a(0.615) ? 3 : 0 });
    if (foto && r && r.mano) { const [hx, hy] = r.mano; R.rect(hx - 2, hy - 4, hx + 5, hy + 1, K); R.rect(hx - 1, hy - 3, hx + 4, hy, hex('#4a4a5a')); R.pset(hx + 3, hy - 2, hex('#8ad0f0')); }
    R.actor(EL.ciudadanoLF, 210, 150, t, { dir: -1, dedo: t > a(0.6), habla: t > a(0.53) && t < a(0.58) && Math.sin(t * 8) > 0 });
    T.evergladesDelante(R, t, o);
    if (t > a(0.547) && t < a(0.547) + 0.15) { R.disco(x + 22, 128, 14, hex('#fffbe0')); R.disco(x + 22, 128, 8, hex('#ffffff')); }
  } else {
    // el corte de caliza: el mar baja; donde «debería» estar la montaña, su silueta a rayas parpadea y se tacha en «there»
    const o = { encuadre: 'britton', camara: 'capas', mar: tramo(t, MONTE, MONTE + 1.2) };
    T.interior(R, t, o);
    const sil = tramo(t, MONTE + 0.1, MONTE + 0.5), tacha = tramo(t, a(0.765), a(0.79));
    if (sil > 0 && (tacha > 0 || Math.floor(t * 4) % 4 !== 0)) { const pk = [128, Math.round(lerp(100, 46, sil))];
      // la montaña fantasma: relleno tramado y el contorno a trazos gruesos
      for (let y = pk[1] + 2; y < 99; y++) { const w = (y - pk[1]) * 50 / (99 - pk[1]); for (let x = Math.round(pk[0] - w); x <= Math.round(pk[0] + w); x++) if (((x + y) & 3) === 0) R.pset(x, y, hex('#e8f4ff')); }
      for (let k = 0; k <= 60; k++) { if (k % 6 > 3) continue; for (const x0 of [78, 178]) { const x = Math.round(lerp(x0, pk[0], k / 60)), y = Math.round(lerp(99, pk[1], k / 60)); R.pset(x, y, hex('#fff6c0')); R.pset(x, y - 1, hex('#fff6c0')); R.pset(x + (x0 < pk[0] ? -1 : 1), y, K); } }
      R.icono('?', pk[0] + 14, pk[1] - 8, hex('#f8e070'), K, 2); }
    if (tacha > 0) { const l = Math.round(lerp(0, 34, tacha)); for (let w = 0; w < 3; w++) { R.linea(111 + w, 56, 111 + w + l, 56 + l, hex('#e8303e')); R.linea(145 + w, 56, 145 + w - l, 56 + l, hex('#e8303e')); } }
  }
  T.a_vcEspejo(R, t, 1);
};
// ── 4. la impresora de titulares ──
const p4 = (t) => {
  const o = { encuadre: 'redaccion', camara: 'impresora', papeles: lerp(0.4, 0.75, tramo(t, P4, a(1))) };
  T.redaccion(R, t, o);
  const coge = t > P4 + 0.6, asombro = t > a(0.885) && t < a(0.95), ok = t > a(0.96);
  const r = R.actor(EL.periodistaLF, 200, 170, t, { dir: -1, sostiene: coge ? [190, 148] : undefined, sorpresa: asombro, sonrisa: ok, habla: ok && Math.sin(t * 8) > 0 && t < a(1) });
  if (coge && r && r.mano) { const [hx, hy] = r.mano; R.rect(hx - 9, hy - 12, hx + 1, hy + 2, K); R.rect(hx - 8, hy - 11, hx, hy + 1, hex('#fbfaf2')); R.rect(hx - 7, hy - 9, hx - 1, hy - 8, hex('#2a2a36')); for (let k = 0; k < 3; k++) R.rect(hx - 7, hy - 6 + k * 2, hx - 2, hy - 6 + k * 2, hex('#9a9aa6')); }
  if (asombro) R.icono('!', 205, 132, hex('#f8e070'), K, 1);
  T.redaccionDelante(R, t, o);
  T.a_vcEspejo(R, t, 1 - tramo(t, a(0.94), a(0.99)));
};
// ── 5. el feed del móvil: ¿qué momento te gustaría encontrarte? ──
const p5 = (t) => {
  // el dedo desliza tres veces: la tienda → la piscina → la playa → el puente; en «comments», doble toque y comentarios
  const pasos = [b(0.06), b(0.15), b(0.24)], des = pasos.reduce((acc, p0) => acc + tramo(t, p0, p0 + 0.45) / 3, 0);
  const like = b(0.3);
  const o = { encuadre: 'causeway', camara: 'feed', desliza: des, like };
  const g = T.movil(R, t, o);
  T.movilDelante(R, t, o);
  // el «?» que late sobre el vídeo mientras se pregunta qué momento
  const q = tramo(t, b(0.255), b(0.275)) - tramo(t, b(0.3), b(0.32)); if (q > 0) R.icono('?', 152, Math.round(70 - q * 6), hex('#f8e070'), K, 3);
  // los comentarios que suben por el lado del vídeo
  if (t > like) for (let k = 0; k < 4; k++) { const t0 = like + 0.15 + k * 0.4, u = (t - t0) / 1.8; if (u <= 0 || u >= 1) continue; const cy = Math.round(150 - u * 90), cx = 136 + (k % 2) * 24;
    R.rect(cx - 12, cy - 7, cx + 12, cy + 4, K); R.rect(cx - 11, cy - 6, cx + 11, cy + 3, k % 2 ? hex('#fbf6ea') : hex('#ffd8e8')); R.poligono([[cx - 6, cy + 4], [cx, cy + 4], [cx - 8, cy + 8]], K);
    R.rect(cx - 8, cy - 3, cx + 8, cy - 3, hex('#8a8a9a')); R.rect(cx - 8, cy, cx + 3, cy, hex('#8a8a9a')); if (k === 1) corazon(cx + 3, cy - 3, hex('#e84a5a')); if (k === 2) R.icono('?', cx + 4, cy - 5, hex('#3a6ad8'), K, 1); }
  // la mano que desliza (y que da el doble toque), corta, desde la esquina de abajo
  const sw = pasos.reduce((m, p0) => Math.max(m, tramo(t, p0 - 0.05, p0 + 0.2) - tramo(t, p0 + 0.25, p0 + 0.5)), 0);
  const toque = t > like - 0.2 && t < like + 0.3 ? Math.round(Math.abs(Math.sin((t - like) * 18)) * 3) : 0;
  const entra = tramo(t, P5, P5 + 0.6) * (1 - tramo(t, like + 0.5, like + 1.0));
  if (entra > 0.02) T.brazo(R, 250, 200, Math.round(lerp(250, 186, entra)), Math.round(lerp(200, 150 - sw * 34 - toque, entra)), '#e87a3a', -1, { codo: [236, 184] });
};
// ── 6. el archivo: cómo empezó todo ──
const saltire = (x, y) => { R.rect(x, y, x + 20, y + 13, K); R.rect(x + 1, y + 1, x + 19, y + 12, hex('#2a5ab8')); R.linea(x + 1, y + 1, x + 19, y + 12, hex('#ffffff')); R.linea(x + 2, y + 1, x + 19, y + 11, hex('#ffffff')); R.linea(x + 19, y + 1, x + 1, y + 12, hex('#ffffff')); R.linea(x + 18, y + 1, x + 1, y + 11, hex('#ffffff')); R.rect(x - 1, y, x - 1, y + 24, hex('#8a6a40')); };
const p6 = (t) => {
  const saca = tramo(t, P6 + 0.2, P6 + 1.3);
  const o = { encuadre: 'archivo', camara: 'cajones', saca };
  T.redaccion(R, t, o);
  // la ficha que sube del cajón, de cerca (sale de detrás del frente): la banderita en «Scotland» y el 1997 en «with a game»
  const fy = Math.round(lerp(130, 38, saca));
  if (saca > 0) { R.rect(124, fy, 196, fy + 44, K); R.rect(125, fy + 1, 195, fy + 43, hex('#f4ecd8')); R.rect(125, fy + 1, 195, fy + 6, hex('#d8343e')); for (let k = 0; k < 3; k++) R.rect(130, fy + 30 + k * 4, 190, fy + 30 + k * 4, hex('#c8bca4')); }
  const fl = tramo(t, b(0.56), b(0.59)); if (fl > 0 && saca > 0.5) saltire(132, fy + 10 - Math.round((1 - fl) * 3));
  const n = tramo(t, b(0.585), b(0.585) + 0.8); if (n > 0 && saca > 0.5) R.numero('1997', 160, fy + 22, { n: Math.ceil(n * 32) });
  T.redaccionDelante(R, t, o);
  // la mano que tira de la ficha desde arriba (se ve poco brazo) y se va cuando ya se lee
  const m = Math.min(1, saca * 1.2) * (1 - tramo(t, b(0.63), b(0.66)));
  if (m > 0.02) T.brazo(R, 214, -14, 200, Math.round(lerp(-10, fy + 4, m)), '#2a5a7a', -1, { codo: [222, Math.round(lerp(-12, (fy - 10) / 2, m))] });
};
// ── 7. el final: el mapa tachado y la descarga al 100 % ──
const equis = (x, y, u) => { if (u <= 0) return; const s = 5; const l1 = Math.min(1, u * 2), l2 = Math.max(0, u * 2 - 1);
  for (let w = 0; w < 2; w++) { R.linea(x - s + w, y - s, Math.round(x - s + w + 2 * s * l1), Math.round(y - s + 2 * s * l1), hex('#e8303e')); if (l2 > 0) R.linea(x + s + w, y - s, Math.round(x + s + w - 2 * s * l2), Math.round(y - s + 2 * s * l2), hex('#e8303e')); } };
const p7 = (t) => {
  const o = { encuadre: 'mapa', florida: 1 };
  const g = T.salon(R, t, o);
  const reg = g.regiones ? Object.values(g.regiones) : [];
  reg.forEach((p, k) => equis(p[0], p[1], tramo(t, P7 + 0.2 + k * 0.35, P7 + 0.5 + k * 0.35)));
  // la mochila en el suelo y Atom que flota a su lado
  { const mx = 62, my = 140; R.disco(mx + 10, my + 6, 9, K); R.rect(mx + 1, my + 6, mx + 19, my + 24, K); R.disco(mx + 10, my + 6, 8, hex('#e8803a')); R.rect(mx + 2, my + 6, mx + 18, my + 23, hex('#e8803a'));
    R.rect(mx + 2, my + 20, mx + 18, my + 23, hex('#c8602a')); R.rect(mx + 4, my + 12, mx + 16, my + 20, K); R.rect(mx + 5, my + 13, mx + 15, my + 19, hex('#f09a50')); R.rect(mx + 5, my + 13, mx + 15, my + 13, hex('#f8c070'));
    R.rect(mx + 9, my + 14, mx + 11, my + 15, hex('#f8e070')); R.rect(mx + 6, my + 1, mx + 14, my + 1, hex('#f8b070')); R.rect(mx + 9, my - 3, mx + 11, my - 1, K); R.rect(mx + 19, my + 8, mx + 21, my + 20, hex('#5a3a20')); R.pset(mx + 4, my + 4, hex('#ffc890')); }
  const ay = Math.round(146 + Math.sin(t * 2) * 2), ax = 106;
  for (let j = -18; j <= 18; j++) for (let i = -18; i <= 18; i++) { const g = 1 - Math.hypot(i, j) / 18; if (g > 0.3 && ((i + j) & 1 || g > 0.6)) R.pset(ax + i, ay + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(ax, ay, t, { r: 11, orbita: R.PAL.ATOM[7], energia: t > b(0.93) ? 0.8 : 0.35 });
  // los fans detrás de la mesa: tachan, y lo celebran al llegar al 100
  const fin = t > b(0.92);
  R.actor(EL.fanLF, 150, 164, t, { dir: 1, dedo: !fin && t < P7 + 2.4, brazos: fin, sonrisa: true, habla: !fin && Math.sin(t * 7) > 0.3 });
  R.actor(EL.fanaLF, 214, 164, t, { dir: -1, brazos: fin, sonrisa: fin, sorpresa: t > b(0.9) && t < b(0.92) });
  T.salonDelante(R, t, o);
  // el mando sobre la mesa
  R.rect(238, 162, 256, 169, K); R.rect(239, 163, 255, 168, hex('#3a3a48')); R.pset(242, 165, hex('#1a1a22')); R.pset(251, 164, hex('#e84a5a')); R.pset(253, 166, hex('#4ab0e8'));
  // la barra de descarga, grande sobre el mar del mapa, y en el portátil; al llegar al 100, el 100 de oro
  const pc = Math.min(100, lerp(87, 100, tramo(t, P7, b(0.93))));
  R.rect(287, 138, 311, 146, K); R.rect(288, 139, 310, 145, hex('#1a2030')); R.rect(289, 140, 289 + Math.round(20 * pc / 100), 144, pc >= 100 ? hex('#f8c838') : hex('#4ad870'));
  R.rect(86, 113, 196, 125, K); R.rect(87, 114, 195, 124, hex('#1a2030')); R.rect(88, 115, 194, 115, hex('#3a4458'));
  const w = Math.round(106 * pc / 100); R.rect(88, 116, 88 + w, 123, pc >= 100 ? hex('#f8c838') : hex('#4ad870')); R.rect(88, 116, 88 + w, 117, pc >= 100 ? hex('#fff0a0') : hex('#9af0a8'));
  for (let x = 92; x < 88 + w; x += 8) R.rect(x, 118, x + 2, 121, pc >= 100 ? hex('#e8a820') : hex('#3ac060'));
  if (pc < 100) { const z = Math.round((t * 40) % 106); if (z < w) R.rect(88 + z, 116, 90 + z, 123, hex('#d0ffd8')); }
  const cien = tramo(t, b(0.93), b(0.96));
  if (cien > 0) { R.numero('100', 214, Math.round(lerp(130, 124, cien)), { tam: 16, centro: true }); if (Math.floor(t * 6) % 2) for (const [dx, dy] of [[-24, -18], [22, -20], [-26, 2], [24, 4]]) R.pset(214 + dx, 116 + dy, hex('#fff6c0')); }
  else R.numero(String(Math.floor(pc)), 214, 124, { tam: 8, centro: true });
};
const año = (t) => t >= P6 && t < P7 ? 1997 : 2026;
const efectos = [[1.0, 'coche'], [a(0.18), 'brillo'], [a(0.42), 'chof'], [a(0.45), 'pop'], [a(0.547), 'flash'], [a(0.58), 'chof'], [a(0.79), 'golpecito'], [P4 + 0.3, 'papel'], [a(0.96), 'brillo'], [b(0.06), 'whoosh'], [b(0.3), 'pop'], [P6 + 0.4, 'papel'], [b(0.585), 'lapiz'], [P7 + 0.3, 'lapiz'], [b(0.93), 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')
