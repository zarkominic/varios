E = {}

# Ayudas comunes de este grupo (se anteponen al cuerpo de cada escena)
H = r'''
const mez = (c, d, a) => { const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255, r2 = d & 255, g2 = (d >> 8) & 255, b2 = (d >> 16) & 255;
  return (0xff000000 | (Math.round(b + (b2 - b) * a) << 16) | (Math.round(g + (g2 - g) * a) << 8) | Math.round(r + (r2 - r) * a)) >>> 0; };
const h1 = (a, b = 0) => { const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return s - Math.floor(s); };
const tr4 = (x, y) => [0, 0.5, 0.125, 0.625, 0.75, 0.25, 0.875, 0.375, 0.1875, 0.6875, 0.0625, 0.5625, 0.9375, 0.4375, 0.8125, 0.3125][(y & 3) * 4 + (x & 3)];
// el destello del relámpago o del golpe: aclara toda la pantalla (a 0–1)
const destello = (R, a, col = hex('#e8f0ff')) => { if (a <= 0.02) return; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, mez(R.pget(x, y), col, a)); };
// cuánto destella un relámpago que cae en t0 (dos golpes de luz)
const luzRayo = (t, t0) => { const d = t - t0; return d < 0 ? 0 : d < 0.07 ? 0.55 : d < 0.13 ? 0.1 : d < 0.2 ? 0.35 : d < 0.45 ? 0.35 * (1 - (d - 0.2) / 0.25) : 0; };
// el rayo en zigzag de (x, y0) a y1, con ramitas, entre xmin y xmax
const rayo = (R, x, y0, y1, k, xmin = 0, xmax = 319) => { let px = x, py = y0;
  while (py < y1) { const nx = Math.max(xmin, Math.min(xmax, px + Math.round((h1(py, k) - 0.5) * 12))), ny = Math.min(y1, py + 5 + Math.round(h1(py, k + 1) * 6));
    R.linea(px - 1, py, nx - 1, ny, hex('#6a8ae8')); R.linea(px + 1, py, nx + 1, ny, hex('#a8c8ff')); R.linea(px, py, nx, ny, hex('#ffffff'));
    if (h1(py, k + 2) > 0.7) { const bx = nx + Math.round((h1(py, k + 3) - 0.5) * 18); R.linea(nx, ny, bx, ny + 8, hex('#c8dcff')); R.pset(bx, ny + 9, hex('#8aa8f0')); }
    px = nx; py = ny; } };
// una burbuja de lodo que crece y revienta en salpicaduras (u 0–1)
const burbujon = (R, x, y, rMax, u) => { if (u <= 0 || u >= 1) return;
  if (u < 0.7) { const r = rMax * Math.sin(u / 0.7 * Math.PI / 2); R.disco(x, y, r + 1, hex('#1a5a1a')); R.disco(x, y, r, hex('#5ad84a')); R.disco(x - r * 0.3, y - r * 0.3, r * 0.45, hex('#9af88a')); R.pset(Math.round(x - r * 0.45), Math.round(y - r * 0.5), hex('#ffffff')); }
  else { const v = (u - 0.7) / 0.3; for (let k = 0; k < 10; k++) { const a = k * 0.628 + 0.3, d = rMax * (0.6 + v * 1.4); R.rect(Math.round(x + Math.cos(a) * d), Math.round(y - Math.abs(Math.sin(a)) * d * 1.3 + v * v * 8), Math.round(x + Math.cos(a) * d) + 1, Math.round(y - Math.abs(Math.sin(a)) * d * 1.3 + v * v * 8) + 1, k % 2 ? hex('#8af87a') : hex('#3aa83a')); }
    R.anillo(x, y, rMax * (0.5 + v), hex('#9af88a'), 2); } };
// un bocadillo de cómic redondo con un pictograma dentro (dibuja(R, cx, cy)); cola hacia (qx, qy); a 0–1 lo hace crecer
const bocata = (R, cx, cy, w, hh, qx, qy, a, dibuja) => { if (a <= 0) return; const s = Math.min(1, a * 1.6), W = Math.round(w * s), Hh = Math.round(hh * s);
  R.poligono([[cx - 3, cy + Hh / 2 - 1], [cx + 3, cy + Hh / 2 - 1], [qx, qy]], hex('#1a1424')); R.poligono([[cx - 2, cy + Hh / 2 - 2], [cx + 2, cy + Hh / 2 - 2], [qx + (qx < cx ? 1 : -1), qy - 2]], hex('#f8f4e8'));
  R.rect(cx - W / 2 - 1, cy - Hh / 2, cx + W / 2 + 1, cy + Hh / 2, hex('#1a1424')); R.rect(cx - W / 2, cy - Hh / 2 - 1, cx + W / 2, cy + Hh / 2 + 1, hex('#1a1424'));
  R.rect(cx - W / 2, cy - Hh / 2 + 1, cx + W / 2, cy + Hh / 2 - 1, hex('#f8f4e8')); R.rect(cx - W / 2 + 1, cy - Hh / 2, cx + W / 2 - 1, cy + Hh / 2, hex('#f8f4e8'));
  R.rect(cx - W / 2 + 1, cy + Hh / 2 - 1, cx + W / 2 - 1, cy + Hh / 2, hex('#c8c0b0'));
  if (s >= 1) dibuja(R, Math.round(cx), Math.round(cy)); };
'''

E['la-gancho'] = ('El trago', '''// LA-GANCHO (frases 1–2), 1993, cartela «1993». Cuatro planos:
// 1. la fachada de la mansión de noche: el científico sale al rellano, se ríe con los brazos en alto cuando cae el
//    relámpago («mansion») y señala hacia atrás, hacia el río («river»);
// 2. detrás de la casa, el tubo de la máquina escupe un chorro de lodo («sludge»), revienta una burbuja gorda
//    («bubbling») y llegan saltando por la orilla los dos tentáculos, el verde («one green») y el morado («purple»);
// 3. la orilla de cerca: el verde le dice que no con la cabeza («don't even think about it»); el morado, con antojo, se
//    agacha y sorbe un hilo de lodo; GOLPE en «sip»: destello, se ilumina;
// 4. el tejado bajo una luna enorme: le salen dos bracitos («two little arms»), se los mira encantado, pone cara de malo
//    («decides») y, con un relámpago, la pose de conquistador («take over the world»); el verde asoma preocupado.''', H + r'''
const A = (f) => en('rio', f), B = (f) => en('trago', f);
const P2 = A(0.338), P3 = A(0.887), P4 = B(0.528);
const mansionW = A(0.14), riverW = A(0.251), burbW = A(0.481), dosW = A(0.585), verdeW = A(0.713), moradoW = A(0.792);
const diceW = B(0.066), noW = B(0.118), itW = B(0.226), moradoB = B(0.332), tomaW = B(0.393), sorbo = B(0.445);
const brazosW = B(0.554), brazosF = B(0.616), decideW = B(0.74), conquista = B(0.877);
const p1 = (t) => {
  T.mansion(R, t, { encuadre: 'fachada', camara: 'general', luz: 'noche', anyo: 1993 });
  // el rayo, en el cielo de la derecha (lejos de Atom y del año)
  const dr = t - mansionW; if (dr >= 0 && dr < 0.3) rayo(R, 292, 50, 112, 3, 282, 304);
  // el científico sale de la puerta al rellano, se ríe con el trueno y señala hacia atrás, al río
  const sale = tramo(t, 1.4, 2.6), x = Math.round(lerp(153, 168, sale)), ries = t > mansionW && t < riverW - 0.1;
  R.actor(EL.cientifico, x, 121, t, { dir: t > riverW ? 1 : sale < 1 ? 1 : -1, anda: sale > 0 && sale < 1, brazos: ries, habla: ries || (t > riverW && Math.sin(t * 9) > 0), salto: ries && Math.sin((t - mansionW) * 14) > 0 ? 1 : 0, sorpresa: t > mansionW - 0.05 && t < mansionW + 0.2, dedo: t > riverW });
  // el gato negro que pasea por la reja y se eriza con el trueno
  { const u = tramo(t, 0.2, P2), gx = Math.round(lerp(230, 300, u)), ar = t > mansionW && t < mansionW + 0.8 ? 2 : 0, gy = 145 - ar;
    R.rect(gx - 5, gy - 3, gx + 3, gy, hex('#0e0a14')); R.rect(gx + 2, gy - 6, gx + 6, gy - 2, hex('#0e0a14')); R.pset(gx + 3, gy - 7, hex('#0e0a14')); R.pset(gx + 6, gy - 7, hex('#0e0a14'));
    R.pset(gx + 4, gy - 4, hex('#e8e040')); R.pset(gx + 6, gy - 4, hex('#e8e040')); R.linea(gx - 5, gy - 2, gx - 8, gy - 6 - ar - Math.round(Math.sin(t * 4)), hex('#0e0a14'));
    if (u < 1 && ar === 0) { const p = Math.floor(t * 8) % 2; R.pset(gx - 4 + p, gy + 1, hex('#0e0a14')); R.pset(gx + 1 - p, gy + 1, hex('#0e0a14')); } }
  destello(R, luzRayo(t, mansionW));
};
const p2 = (t) => {
  const g = T.mansion(R, t, { encuadre: 'rio', camara: 'general', luz: 'noche' });
  // el chorro gordo de lodo que escupe el tubo, y su salpicadura en el río
  const ch = tramo(t, P2 - 0.05, P2 + 0.25) * (1 - tramo(t, P2 + 1.4, P2 + 2.2));
  if (ch > 0) { const [tx, ty] = g.tubo ?? [74, 106];
    for (let k = 0; k <= 16; k++) { const u = k / 16, x = Math.round(tx + u * 26 * ch), y = Math.round(ty + u * u * 16), w = Math.round(3 * ch);
      R.rect(x - 1, y - w, x + 1, y + w, hex('#2a8a2a')); R.rect(x - 1, y - w + 1, x + 1, y, hex('#6ae85a')); }
    const sx = Math.round(tx + 26 * ch), sy = ty + 17;
    for (let k = 0; k < 9; k++) { const f = ((t * 2.2 + k / 9) % 1), a = 3.14 + k * 0.38; R.rect(Math.round(sx + Math.cos(a) * f * 14), Math.round(sy - Math.sin(f * 3.14) * 9 * ch), Math.round(sx + Math.cos(a) * f * 14) + 1, Math.round(sy - Math.sin(f * 3.14) * 9 * ch) + 1, k % 2 ? hex('#9af88a') : hex('#3aa83a')); } }
  // la burbuja gorda que revienta en «bubbling»
  burbujon(R, 176, g.orilla(176) - 9, 7, tramo(t, burbW - 0.45, burbW + 0.35));
  // los dos tentáculos llegan saltando por la orilla desde la derecha
  const uV = tramo(t, dosW - 0.2, verdeW + 0.15), uM = tramo(t, dosW + 0.25, moradoW + 0.35);
  const xv = Math.round(lerp(340, 132, uV)), xm = Math.round(lerp(352, 178, uM));
  const yv = Math.round(lerp(176, g.orilla(132) + 16, uV)), ym = Math.round(lerp(178, g.orilla(178) + 18, uM));
  const llegaV = uV >= 1, llegaM = uM >= 1;
  T.tentaculo(R, xv, yv, t, { color: 'verde', dir: -1, anda: uV > 0 && uV < 1, expresion: t > moradoW ? 'preocupado' : 'normal', mira: llegaV ? (t > moradoW ? [1, 0] : [-0.6, 0.5]) : [-1, 0], salto: llegaV && t > verdeW + 0.15 && t < verdeW + 0.45 ? 3 : 0 });
  T.tentaculo(R, xm, ym, t, { color: 'morado', dir: -1, anda: uM > 0 && uM < 1, expresion: llegaM ? 'antojo' : 'feliz', mira: llegaM ? [-0.5, 0.8] : [-1, 0], inclina: llegaM ? -1.2 : 0, salto: llegaM && t < moradoW + 0.7 && t > moradoW + 0.35 ? 4 : 0 });
};
const p3 = (t) => {
  const g = T.mansion(R, t, { encuadre: 'rio', camara: 'cerca', luz: 'noche' });
  // el morado llega saltando; el verde ya está mirando el lodo
  const uM = tramo(t, P3 + 0.05, P3 + 0.95), xm = Math.round(lerp(345, 200, uM));
  const habla = t > diceW && t < itW + 0.15, niega = t > noW && t < itW + 0.3;
  const exV = t > sorbo ? 'sorpresa' : t > itW + 0.4 ? 'harto' : t > diceW - 0.2 ? 'preocupado' : 'normal';
  T.tentaculo(R, 112, 147, t, { color: 'verde', s: 2, dir: 1, expresion: exV, habla, inclina: niega ? Math.sin(t * 16) * 1.8 : 0, mira: t < diceW - 0.4 ? [0.3, 0.6] : [1, 0], salto: t > sorbo && t < sorbo + 0.3 ? 3 : 0 });
  // el sorbo: se agacha hacia el lodo y sube un hilo de lodo hasta la boca
  const ag = tramo(t, tomaW - 0.3, tomaW + 0.1) * (1 - tramo(t, sorbo + 0.05, sorbo + 0.3)), brillo = tramo(t, sorbo, sorbo + 0.25);
  const m = T.tentaculo(R, xm, 147, t, { color: 'morado', s: 2, dir: -1, anda: uM > 0 && uM < 1, expresion: t > sorbo ? 'feliz' : uM >= 1 ? 'antojo' : 'normal', mira: t > sorbo ? [0, -0.6] : uM >= 1 ? [-0.4, 1] : [-1, 0], inclina: -ag * 1.8, aplasta: ag * 0.55, brillo, salto: t > sorbo + 0.05 && t < sorbo + 0.5 ? Math.round(Math.sin((t - sorbo) * 7) * 8) : 0 });
  if (ag > 0.6 && t < sorbo + 0.1 && m.boca) { const [bx, by] = m.boca; for (let k = 0; k < 6; k++) { const f = ((t * 3 + k / 6) % 1), yy = Math.round(lerp(158, by + 2, f)); R.disco(bx + Math.round(Math.sin(f * 9 + k) * 1.5), yy, 1.6, k % 2 ? hex('#8af87a') : hex('#3ab83a')); } }
  // las ondas en el lodo donde sorbe
  if (ag > 0.3 && m.boca) for (let k = 0; k < 2; k++) { const f = (t * 1.5 + k / 2) % 1; R.anillo(m.boca[0], 162, 3 + f * 10, hex('#9af88a'), 3); }
  // el golpe del trago: destello verde y chispas
  destello(R, t > sorbo && t < sorbo + 0.3 ? 0.7 * (1 - (t - sorbo) / 0.3) : 0, hex('#d8ffd0'));
};
// 4: el tejado bajo una luna enorme (fondo local, con capa fija)
let capa4 = null;
const fijo4 = () => { const b = R.nuevo(), prev = R.usar(b);
  // el cielo tramado de noche, de morado oscuro arriba a violeta en el horizonte, con estrellas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = y / 150 + (h1(x >> 3, y >> 3) - 0.5) * 0.08; R.pset(x, y, v > tr4(x, y) * 0.25 + 0.75 ? hex('#3a2a5e') : v > tr4(x, y) * 0.25 + 0.45 ? hex('#26204a') : v > tr4(x, y) * 0.25 + 0.15 ? hex('#1a1636') : hex('#100e26')); }
  for (let k = 0; k < 70; k++) { const x = Math.floor(h1(k, 1) * 320), y = Math.floor(h1(k, 2) * 110); R.pset(x, y, k % 5 ? hex('#8a88b8') : hex('#e8e8ff')); }
  // la luna enorme, con su halo, el canto claro, las sombras tramadas y los cráteres
  const lx = 150, ly = 74, lr = 50;
  R.halo(lx, ly, lr + 22, [hex('#1e1a40'), hex('#2a2652'), hex('#3a3464')], 1.1);
  R.disco(lx, ly, lr + 1, hex('#c8b880')); R.disco(lx, ly, lr, (x, y, d) => { const sh = (x - lx) * -0.012 + (y - ly) * 0.008 + d * 0.5; return sh > 0.55 + tr4(x, y) * 0.2 ? hex('#d8c890') : sh > 0.3 + tr4(x, y) * 0.2 ? hex('#ece0b0') : hex('#f8f0d0'); });
  for (const [cx, cy, r] of [[130, 52, 9], [168, 92, 12], [176, 50, 5], [122, 96, 6], [150, 72, 4], [190, 70, 6], [112, 70, 4], [140, 112, 5], [160, 34, 4]]) { R.disco(cx, cy, r, hex('#d8c890')); R.disco(cx + 1, cy + 1, r - 1.2, hex('#e4d6a0')); R.anillo(cx - 0.5, cy - 0.5, r, hex('#c4b47c'), 0); R.pset(cx + Math.round(r * 0.5), cy + Math.round(r * 0.5), hex('#fff8e0')); }
  // las colinas lejanas con el pueblo dormido y árboles secos
  R.poligono([[0, 150], [30, 138], [70, 142], [110, 132], [160, 140], [210, 130], [260, 138], [320, 128], [320, 180], [0, 180]], hex('#1a1432'));
  R.poligono([[0, 160], [40, 152], [90, 156], [140, 148], [200, 154], [250, 146], [320, 152], [320, 180], [0, 180]], hex('#140f28'));
  for (let k = 0; k < 14; k++) { const x = 8 + k * 23 + Math.floor(h1(k, 4) * 10), y = 148 + Math.floor(h1(k, 5) * 6); R.rect(x, y - 3, x + 4, y, hex('#0e0a1e')); R.pset(x + 1 + (k % 3), y - 2, k % 2 ? hex('#f0c060') : hex('#c89040')); R.pset(x + 2, y - 4, hex('#0e0a1e')); }
  for (const [x, y, hh] of [[20, 142, 16], [292, 132, 20], [62, 146, 12]]) { R.linea(x, y, x, y - hh, hex('#0c0818')); R.linea(x, y - hh * 0.6, x - 5, y - hh * 0.9, hex('#0c0818')); R.linea(x, y - hh * 0.4, x + 6, y - hh * 0.8, hex('#0c0818')); R.linea(x + 6, y - hh * 0.8, x + 8, y - hh, hex('#0c0818')); }
  // el tejado de escamas moradas, con la cumbrera de cobre y la luz de la luna en el canto
  const cum = 134, roof = (x) => cum + Math.abs(x - 160) * 0.38;
  R.poligono([[-2, 180], [-2, roof(-2)], [160, cum], [322, roof(322)], [322, 180]], hex('#3a2050'));
  for (let y = cum + 2; y < 180; y += 5) for (let x = -4 + ((y / 5) % 2) * 4; x < 324; x += 8) { if (y < roof(x) + 1) continue; const d = (y - cum) / 46;
    R.disco(x, y, 4.2, hex('#24123a')); R.disco(x, y - 0.6, 3.6, d < 0.5 ? hex('#6a3a8a') : hex('#563078')); R.rect(x - 2, y - 3, x, y - 3, hex('#8a5aaa')); R.pset(x - 2, y - 2, hex('#a87ac8')); }
  R.poligono([[-2, roof(-2) - 2], [160, cum - 3], [322, roof(322) - 2], [322, roof(322) + 1], [160, cum], [-2, roof(-2) + 1]], hex('#2a5a4a'));
  R.linea(-2, Math.round(roof(-2) - 3), 160, cum - 4, hex('#6ac8a0')); R.linea(160, cum - 4, 322, Math.round(roof(322) - 3), hex('#4a9a7a'));
  for (let x = 4; x < 320; x += 12) { const y = Math.round(roof(x) - 3); R.rect(x, y - 2, x + 1, y, hex('#2a5a4a')); R.pset(x, y - 3, hex('#8ae0b8')); }
  // la chimenea torcida de ladrillos
  R.poligono([[236, 92], [256, 90], [258, roof(258) + 2], [234, roof(234) + 2]], hex('#5a2a24'));
  for (let y = 94; y < 170; y += 4) for (let x = 234 + ((y / 4) % 2) * 3; x < 258; x += 6) { if (y > roof(x)) continue; R.rect(x, y, x + 4, y + 2, hex('#7a3a2e')); R.pset(x, y, hex('#9a5a44')); }
  R.rect(232, 86, 260, 91, hex('#2a1418')); R.rect(233, 87, 259, 89, hex('#6a3a30')); R.rect(233, 87, 259, 87, hex('#9a6a54'));
  // la buhardilla con la ventana redonda encendida
  R.poligono([[60, 178], [60, 152], [76, 138], [92, 152], [92, 178]], hex('#4a2a60')); R.linea(58, 153, 76, 136, hex('#8a5aaa')); R.linea(76, 136, 94, 153, hex('#2a1438'));
  R.disco(76, 161, 8, hex('#1a1020')); R.disco(76, 161, 6.5, hex('#f0c860')); R.linea(76, 155, 76, 167, hex('#5a3a20')); R.linea(70, 161, 82, 161, hex('#5a3a20')); R.pset(73, 158, hex('#fff0b0'));
  R.usar(prev); return b; };
const p4 = (t) => {
  if (!capa4) capa4 = fijo4(); R.copiar(capa4);
  // las nubes de tres tonos a tres velocidades que pasan por delante de la luna
  for (const [y, v, w, c0, c1, k] of [[34, 4, 46, '#5a5488', '#7a74a8', 0], [104, 7, 60, '#4a4478', '#68629a', 1], [62, 11, 34, '#6a64a0', '#8e88c0', 2], [18, 2.5, 30, '#46406e', '#5e5890', 3]]) {
    const x = ((t * v + k * 97) % 420) - 70; R.disco(x, y, w * 0.22, hex(c0)); R.disco(x + w * 0.25, y - 3, w * 0.25, hex(c0)); R.disco(x + w * 0.5, y, w * 0.2, hex(c0));
    R.disco(x + w * 0.22, y - 4, w * 0.17, hex(c1)); R.rect(x - w * 0.15, y + 2, x + w * 0.65, y + 3, hex(c0)); }
  // el humo de la chimenea y la veleta-murciélago que gira
  for (let k = 0; k < 6; k++) { const f = (t * 0.35 + k / 6) % 1; R.disco(246 - f * 20 + Math.sin(f * 6 + k) * 3, 82 - f * 38, 2 + f * 4, f < 0.5 ? hex('#4a4466') : hex('#3a3456')); }
  // los murciélagos que cruzan la luna (y salen en bandada de la chimenea en la conquista)
  for (let k = 0; k < 3; k++) { const f = ((t * 0.12 + k * 0.33) % 1), x = Math.round(lerp(-10, 330, f)), y = Math.round(40 + k * 18 + Math.sin(f * 12 + k) * 6), a = Math.sin(t * 16 + k) > 0;
    R.rect(x - 1, y, x + 1, y + 1, hex('#0a0614')); R.linea(x - 1, y, x - 4, y + (a ? -2 : 2), hex('#0a0614')); R.linea(x + 1, y, x + 4, y + (a ? -2 : 2), hex('#0a0614')); }
  const sb = tramo(t, conquista, conquista + 1.6);
  if (sb > 0 && sb < 1) for (let k = 0; k < 7; k++) { const x = Math.round(246 + (k - 3) * 6 * sb * 3 + Math.sin(t * 9 + k) * 2), y = Math.round(84 - sb * (40 + k * 6)), a = Math.sin(t * 18 + k) > 0;
    if (y < 46 && x > 270) continue; R.rect(x - 1, y, x + 1, y + 1, hex('#0a0614')); R.linea(x - 1, y, x - 4, y + (a ? -2 : 2), hex('#0a0614')); R.linea(x + 1, y, x + 4, y + (a ? -2 : 2), hex('#0a0614')); }
  // el rayo de la conquista, a la izquierda de la luna
  const dr = t - conquista; if (dr >= 0 && dr < 0.35) rayo(R, 56, 18, 120, 7, 34, 92);
  // el morado en la cumbrera: le salen los bracitos, se los mira y se pone de conquistador
  const brz = tramo(t, brazosW - 0.05, brazosF), mal = t > decideW, arriba = t > conquista - 0.1;
  T.tentaculo(R, 158, 133, t, { color: 'morado', s: 2, dir: arriba ? 1 : -1, brillo: 0.8 + Math.sin(t * 6) * 0.2, brazos: brz, pose: arriba ? 'arriba' : 'normal', expresion: mal ? 'malvado' : brz > 0 ? 'feliz' : 'sorpresa', mira: !mal ? (brz > 0 ? [Math.sin(t * 3) * 0.8, 0.8] : [0, -0.4]) : [0.8, 0], salto: t > brazosF && t < brazosF + 0.35 ? 4 : arriba && t < conquista + 0.3 ? 3 : 0, habla: mal && !arriba && Math.sin(t * 8) > 0 });
  // el verde asoma por detrás de la chimenea, preocupado
  const asoma = tramo(t, P4 + 0.3, P4 + 0.9);
  T.tentaculo(R, 268, Math.round(lerp(176, 152, asoma)), t, { color: 'verde', s: 1, dir: -1, expresion: t > conquista ? 'sorpresa' : 'preocupado', mira: [-1, -0.3] });
  destello(R, luzRayo(t, conquista));
};
const efectos = [[mansionW, 'trueno'], [P2 + 0.02, 'chof'], [burbW, 'burbujas'], [dosW, 'boing'], [P3 + 0.1, 'boing'], [tomaW, 'burbujas'], [sorbo, 'flash'], [brazosW, 'pop'], [conquista, 'trueno']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1993', efectos, año: 1993 });
''')

E['la-lucas'] = ('LucasArts', '''// LA-LUCAS (frases 3–5), 1993. Siete planos:
// 1. la pantalla del ordenador de tubo: la mansión en píxeles y la línea de verbos; un mini tentáculo morado salta por
//    la colina; el cursor (con la mano en el ratón) lo alcanza y con «mirar» da un salto y un «!» («begins»);
// 2. el cuarto de los noventa: el chico, sentado, juega; su hermana entra corriendo («generation») a mirar; se ríen
//    («remembers») y en «grin» él gira la silla con los brazos en alto;
// 3. la estantería de cerca: la mano pasa por las cajas de juegos inventadas, que se abren una a una («LucasArts»);
// 4. vistazo al puerto pirata: dos piratas se baten; bocadillos de pictogramas (calavera, «!») y el pirata se queda con
//    un «?» y recula («insults»);
// 5. vistazo a la Tierra de los Muertos: un retrete del tiempo llega a la agencia («time»), sale el roquero y el
//    esqueleto (grande en su ventanilla) le vende un billete dorado que vuela hasta su mano («sold trips»); lo levanta;
// 6. la puerta cerrada de la mansión con su candado: el morado tira de las cadenas; sube la línea de verbos («rule»),
//    el cursor pulsa «abrir» y luego el candado: «?» («what was it?»);
// 7. inserto en la mesa de dibujo (fondo local): la mansión a lápiz, la hoja de modelo y la mano que dibuja el
//    tentáculo; en «worlds» una barrida de acuarela la colorea; en «cartoons» el tentáculo dibujado cobra vida y salta.''', H + r'''
const D = (f) => en('dott', f), L = (f) => en('lucasarts', f), G = (f) => en('regla', f);
const P2 = D(0.486), P3 = L(0), P4 = L(0.336), P5 = L(0.674), P6 = G(0), P7 = G(0.65);
// 1: la pantalla: el mini tentáculo morado salta por la colina del juego; el cursor lo alcanza y «mirar» lo hace saltar
const begins = D(0.149), aventura = D(0.385);
const p1 = (t) => {
  const cu = tramo(t, 0.2, begins - 0.1), tx = Math.round(lerp(150, 214, tramo(t, 0, E.duracion)));
  const g = T.hoy(R, t, { encuadre: 'cuarto90', camara: 'pantalla', activo: t > D(0.09) ? 'mirar' : -1, cursor: [lerp(236, tx + 2, cu), lerp(40, 76, cu)] });
  const z = g.zonaJuego ?? [73, 17, 247, 92];
  R.recorte(z);
  const hop = Math.abs(Math.sin(t * 5)) * (t > begins && t < begins + 0.6 ? 7 : 3), ty = 86 - Math.round(hop);
  R.poligono([[tx - 3, ty], [tx + 3, ty], [tx + 3, ty - 7], [tx + 2, ty - 9], [tx - 2, ty - 9], [tx - 3, ty - 7]], hex('#2a1438'));
  R.poligono([[tx - 2, ty - 1], [tx + 2, ty - 1], [tx + 2, ty - 7], [tx + 1, ty - 8], [tx - 1, ty - 8], [tx - 2, ty - 7]], hex('#8a4ac8'));
  R.linea(tx - 2, ty - 6, tx - 2, ty - 2, hex('#b87ae8')); R.pset(tx - 1, ty - 6, hex('#ffffff')); R.pset(tx + 1, ty - 6, hex('#ffffff')); R.pset(tx, ty - 3, hex('#e85a7a'));
  R.linea(tx - 3, ty + 1, tx + 3, ty + 1, hex('#1a3a1a'));
  if (t > begins && t < begins + 1.2) { const s = tramo(t, begins, begins + 0.2); R.linea(tx, ty - 14 - Math.round(s * 3), tx, ty - 11 - Math.round(s * 3), hex('#f0c040')); R.pset(tx, ty - 9 - Math.round(s * 3), hex('#f0c040')); }
  R.recorte(null);
  // la mano del chico en el ratón, que sigue al cursor
  const mx = Math.round(26 + (tx - 236) * cu * 0.06), my = Math.round(162 + cu * 2);
  R.rect(mx - 4, my - 2, mx + 5, my + 4, hex('#1a1424')); R.rect(mx - 3, my - 1, mx + 4, my + 3, hex('#e8e0c8')); R.linea(mx, my - 1, mx, my + 1, hex('#a8a090')); R.linea(mx + 1, my - 2, mx + 6, my - 10, hex('#2a2430'));
  T.brazo(R, mx - 34, 198, mx - 2, my + 2, '#3e8a6a', 1, { codo: [mx - 22, 186] });
};
// 2: el cuarto: el chico, sentado, juega; su hermana entra corriendo a mirar; se ríen y en «grin» él gira la silla
const grin = D(0.944), genW = D(0.62), recuerda = D(0.824);
const p2 = (t) => {
  T.hoy(R, t, { encuadre: 'cuarto90', camara: 'general' });
  const gira = t > grin, clic = !gira && Math.sin(t * 7) > 0.6;
  // el ratón en la mesa
  R.rect(121, 125, 126, 128, hex('#1a1424')); R.rect(122, 125, 125, 127, hex('#e8e0c8')); R.linea(124, 125, 128, 121, hex('#2a2430'));
  R.actor(EL.chico, 103, 141, t, { dir: gira ? -1 : 1, sostiene: gira ? undefined : [121, 125 + (clic ? 1 : 0)], sonrisa: t > D(0.7), habla: t > recuerda && Math.sin(t * 10) > 0, brazos: gira && t > grin + 0.25, salto: gira && t < grin + 0.3 ? 2 : 0 });
  T.silla(R, 110, 140, gira ? -1 : 1);
  const en2 = tramo(t, genW - 0.2, genW + 0.9), sx = Math.round(lerp(-18, 72, en2));
  R.actor(EL.chica, sx, 156, t, { dir: 1, anda: en2 > 0 && en2 < 1, sorpresa: en2 >= 1 && t < recuerda, sonrisa: t > recuerda, habla: t > recuerda && t < grin && Math.sin(t * 9 + 1) > 0, salto: t > grin && t < grin + 0.5 ? Math.round(Math.abs(Math.sin((t - grin) * 12)) * 4) : 0, dedo: t > D(0.75) && t < grin });
};
// 3: la estantería: la mano pasa por las cajas y se abren una a una
const p3 = (t) => {
  const ab = tramo(t, P3 + 0.4, P4 - 0.5); T.hoy(R, t, { encuadre: 'cuarto90', camara: 'estanteria', abre: ab });
  const x = 45 + Math.round(lerp(0, 58 * 4, Math.min(1, ab * 1.25))), toca = Math.round(Math.abs(Math.sin(ab * 5 * Math.PI)) * 3);
  T.brazo(R, x - 30, 198, x, 158 - toca, '#3e8a6a', 1, { codo: [x - 20, 180] });
};
// 4: el puerto pirata: duelo de insultos con bocadillos de pictogramas
const pirW = L(0.512), luchaW = L(0.564), insW = L(0.598);
const p4 = (t) => {
  T.isla(R, t, { encuadre: 'muelle', camara: 'general', luz: 'noche' });
  const ataca = t > P4 + 0.5 && t < insW && Math.sin(t * 6) > 0.2, retro = tramo(t, insW, insW + 0.4);
  const ax = Math.round(112 + (ataca ? 3 : 0) - retro * 10);
  const a = R.actor(EL.pirata, ax, 164, t, { dir: 1, sostiene: [ax + 18, 148 - (ataca ? 3 : 0)], enfado: t < insW, sorpresa: t > insW, habla: t > pirW && t < pirW + 0.6, salto: t > insW && t < insW + 0.3 ? 2 : 0 });
  const b = R.actor(EL.aspirante, 150, 164, t, { dir: -1, sostiene: [146, 148 + (ataca ? 2 : 0)], sonrisa: t > insW, habla: t > luchaW && t < luchaW + 0.7 });
  const pa = a.mano, pb = b.mano;
  R.linea(pa[0], pa[1], pa[0] + 16, pa[1] - 7 + (ataca ? 3 : 0), hex('#e8ecf4')); R.pset(pa[0] + 1, pa[1] - 1, hex('#c8a040'));
  R.linea(pb[0], pb[1], pb[0] - 16, pb[1] - 7, hex('#e8ecf4')); R.pset(pb[0] - 1, pb[1] - 1, hex('#c8a040'));
  if (ataca && Math.sin(t * 6) > 0.8) { const cx = Math.round((pa[0] + pb[0]) / 2), cy = pa[1] - 8; for (let k = 0; k < 6; k++) R.pset(cx + Math.round(Math.cos(k) * 4), cy + Math.round(Math.sin(k) * 3), k % 2 ? hex('#fff0a0') : hex('#ffffff')); }
  // los insultos en pictogramas: calavera, rayo y, al final, un pollo de goma que lo deja sin respuesta
  bocata(R, 104, 112, 26, 20, ax + 8, 136, tramo(t, pirW - 0.15, pirW + 0.15) * (1 - tramo(t, luchaW + 0.4, luchaW + 0.5)), (R, x, y) => R.icono('calavera', x - 7, y - 6, hex('#1a1424'), hex('#c8c0b0'), 2));
  bocata(R, 170, 108, 26, 20, 158, 136, tramo(t, luchaW, luchaW + 0.25), (R, x, y) => { R.icono('!', x - 3, y - 6, hex('#c83a3a'), hex('#c8c0b0'), 2); });
  if (t > insW + 0.1) bocata(R, 104, 112, 26, 20, ax + 8, 136, tramo(t, insW + 0.1, insW + 0.35), (R, x, y) => R.icono('?', x - 5, y - 7, hex('#3a5a8a'), hex('#c8c0b0'), 2));
};
// 5: la agencia de viajes de los muertos: llega el retrete del tiempo, sale el roquero y compra un billete dorado
const timeW = L(0.751), soldW = L(0.881), tripsW = L(0.901), afterW = L(0.945);
const p5 = (t) => {
  T.muertos(R, t, { encuadre: 'agencia', camara: 'ventanilla' });
  const da = tramo(t, soldW - 0.1, tripsW + 0.4);
  const ag = T.calaca(R, 160, 141, t, { s: 2, habla: t > soldW - 0.4 && t < afterW, dir: -1 });
  T.muertosDelante(R, t, { encuadre: 'agencia', camara: 'ventanilla' });
  const ll = tramo(t, P5 + 0.1, timeW), pu = tramo(t, timeW + 0.25, timeW + 0.6), sale = tramo(t, timeW + 0.5, L(0.83));
  T.retrete(R, 34, 178, t, { llega: ll, puerta: pu, capa: 'fondo' });
  const rx = Math.round(lerp(27, 76, sale)), coge = t > tripsW + 0.4;
  const r = pu > 0.4 ? R.actor(EL.roquero, rx, 178, t, { dir: 1, anda: sale > 0 && sale < 1, sorpresa: sale >= 1 && t < soldW, sonrisa: coge, brazos: t > afterW + 0.3, sostiene: coge && t <= afterW + 0.3 ? [rx + 17, 150] : undefined, salto: t > afterW + 0.3 && t < afterW + 0.6 ? 3 : 0 }) : null;
  T.retrete(R, 34, 178, t, { llega: ll, puerta: pu, capa: 'frente' });
  // el billete dorado: sale de la ventanilla y vuela en arco a la mano del roquero
  if (da > 0) { const fx = 150, fy = 112, tx2 = r ? (coge ? r.mano[0] : rx + 17) : 92, ty2 = r ? (coge ? r.mano[1] - 3 : 147) : 147;
    const x = Math.round(lerp(fx, tx2, da)), y = Math.round(lerp(fy, ty2, da) - Math.sin(da * Math.PI) * 18), up = t > afterW + 0.3 ? -14 : 0;
    const bx = x - 7, by = y - 4 + up;
    R.rect(bx - 1, by - 1, bx + 14, by + 8, hex('#5a3a10')); R.rect(bx, by, bx + 13, by + 7, hex('#f0c040')); R.rect(bx, by, bx + 13, by + 1, hex('#fff0a0')); R.rect(bx, by + 6, bx + 13, by + 7, hex('#c8901c'));
    R.linea(bx + 9, by + 1, bx + 9, by + 6, hex('#a8701c')); R.rect(bx + 2, by + 3, bx + 6, by + 4, hex('#a8701c')); R.pset(bx + 11, by + 3, hex('#c83a3a'));
    for (let k = 0; k < 4; k++) if (Math.sin(t * 11 + k * 1.7) > 0.3) R.pset(bx + 7 + Math.round(Math.cos(k * 1.6 + t) * 11), by + 3 + Math.round(Math.sin(k * 1.6 + t) * 7), hex('#fff8c0')); }
};
// 6: la puerta cerrada para siempre: el morado tira de las cadenas; sube la línea de verbos; «abrir» y el candado: «?»
const secW = G(0.109), ruleW = G(0.145), apartW = G(0.265), otraW = G(0.4), queW = G(0.537);
let bot6 = null;
const p6 = (t) => {
  T.mansion(R, t, { encuadre: 'pasillo', camara: 'puerta' });
  const llega = tramo(t, P6 + 0.1, secW - 0.3), tira = t > secW - 0.3 && t < otraW, harto = t > otraW;
  T.tentaculo(R, Math.round(lerp(262, 200, llega)), 150, t, { color: 'morado', s: 2, dir: harto ? 1 : -1, brazos: 1, anda: llega > 0 && llega < 1, inclina: tira ? -1.5 + Math.sin(t * 22) * 1.2 : 0, expresion: harto ? 'harto' : tira ? 'malvado' : 'normal', mira: harto ? [0.5, -0.6] : [-1, 0], habla: tira && Math.sin(t * 9) > 0.4 });
  // el candado se sacude cuando tira, y luego cuando lo pulsa el cursor
  const sac = (tira || (t > queW - 0.3 && t < queW + 0.3)) ? Math.round(Math.sin(t * 40) * 1.5) : 0;
  if (sac) { for (let k = 0; k < 3; k++) R.pset(150 + k * 10 + sac, 86 + (k % 2) * 3, hex('#e8e8f0')); }
  const ab = bot6 ? bot6[3] : [138, 158, 172, 170], bc = [(ab[0] + ab[2]) / 2, (ab[1] + ab[3]) / 2];
  const c1 = tramo(t, ruleW + 0.4, apartW), c2 = tramo(t, otraW, queW - 0.3);
  const cx = c2 > 0 ? lerp(bc[0], 160, c2) : lerp(232, bc[0], c1), cy = c2 > 0 ? lerp(bc[1], 98, c2) : lerp(72, bc[1], c1);
  const v = T.verbos(R, t, { aparece: tramo(t, ruleW, ruleW + 0.45), activo: t > apartW ? 'abrir' : -1, pulsa: tramo(t, apartW, apartW + 0.25), frase: t > apartW ? ['abrir', 'puerta'] : null, cursor: [cx, cy] });
  if (v?.botones?.length) bot6 = v.botones;
  bocata(R, 160, 46, 26, 26, 158, 76, tramo(t, queW - 0.15, queW + 0.15), (R, x, y) => R.icono('?', x - 5, y - 7, hex('#c83a3a'), hex('#c8c0b0'), 2));
};
// 7: inserto en la mesa de dibujo (fondo local): la mano dibuja el tentáculo; la mansión se colorea; el dibujo cobra vida
const dibW = G(0.71), worldsW = G(0.767), cartW = G(0.904);
let capa7 = null;
const casa = [[[96, 112], [96, 72], [194, 72], [194, 112]], [[92, 72], [145, 40], [198, 72]], [[76, 112], [76, 50], [98, 50], [98, 112]], [[190, 112], [190, 60], [208, 60], [208, 112]], [[188, 60], [200, 32], [212, 60]], [[140, 112], [140, 96], [152, 96], [152, 112]]];
const vent = [[106, 80], [124, 80], [162, 80], [178, 80], [106, 96], [124, 96], [162, 96], [178, 96], [83, 60], [83, 80], [196, 70], [196, 88]];
const pintaCasa = (R, color, tinta) => {
  if (color) { R.poligono([[46, 30], [234, 30], [234, 120], [46, 120]], (x, y) => tr4(x, y) < 0.5 - (y - 30) / 220 ? hex('#c8b8e0') : hex('#e8dcec'));
    R.poligono([[46, 132], [80, 120], [140, 112], [200, 116], [234, 126], [234, 140], [46, 140]], (x, y) => tr4(x, y) < 0.35 ? hex('#4a8a3a') : hex('#6aaa4a'));
    R.poligono([[46, 140], [234, 140], [234, 152], [46, 152]], (x, y) => ((x + Math.round(Math.sin(y) * 2)) % 9 < 2) ? hex('#9af88a') : hex('#4ac83a'));
    R.poligono(casa[0], (x, y) => tr4(x, y) < 0.25 ? hex('#c87a6a') : hex('#e89a84')); R.poligono(casa[1], (x, y) => tr4(x, y) < 0.3 ? hex('#5a3a8a') : hex('#7a5aaa'));
    R.poligono(casa[2], (x, y) => tr4(x, y) < 0.3 ? hex('#6a7a9a') : hex('#8a9aba')); R.disco(87, 50, 11, hex('#5aaa8a')); R.poligono(casa[3], (x, y) => tr4(x, y) < 0.3 ? hex('#5aaa8a') : hex('#8ad8b0'));
    R.poligono(casa[4], hex('#c84a6a')); R.poligono(casa[5], hex('#6a3a24'));
    for (const [x, y] of vent) R.poligono([[x, y], [x + 7, y], [x + 7, y + 9], [x, y + 9]], hex('#f8d860'));
    R.disco(145, 60, 5, hex('#f8d860')); }
  const c = tinta ? hex('#2a2032') : hex('#b8ae9a');
  for (const p of casa) for (let i = 0; i < p.length - (p.length === 3 ? 0 : 0); i++) { const a = p[i], b = p[(i + 1) % p.length]; R.linea(a[0], a[1], b[0], b[1], c); }
  for (const [x, y] of vent) { R.linea(x, y, x + 7, y, c); R.linea(x + 7, y, x + 7, y + 9, c); R.linea(x + 7, y + 9, x, y + 9, c); R.linea(x, y + 9, x, y, c); R.linea(x + 3, y, x + 3, y + 9, c); }
  R.anillo(145, 60, 5, c); R.anillo(87, 50, 11, c, 0);
  for (let x = 46; x < 234; x += 2) { R.pset(x, Math.round(132 - Math.sin((x - 46) / 188 * Math.PI) * 18), c); R.pset(x, 140 + Math.round(Math.sin(x * 0.1) * 1.5), c); R.pset(x + 1, 151 + Math.round(Math.sin(x * 0.12 + 1) * 1.5), c); }
  for (let k = 0; k < 6; k++) R.anillo(60 + k * 30, 146, 2 + (k % 2), c);
};
const p7 = (t) => {
  if (!capa7) { capa7 = R.nuevo(); const prev = R.usar(capa7);
    // la mesa de madera con vetas y nudos, y el charco de luz del flexo
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(y * 0.55 + Math.sin(x * 0.03 + y * 0.02) * 3), luz = 1 - Math.hypot(x - 150, y - 80) / 230;
      R.pset(x, y, v > 0.82 ? hex('#7a4a28') : (luz > 0.55 + tr4(x, y) * 0.3 ? (v > 0.3 ? hex('#c8884a') : hex('#d8985a')) : (v > 0.3 ? hex('#9a6234') : hex('#a8703e')))); }
    for (const [x, y] of [[18, 40], [300, 150], [12, 150]]) { R.disco(x, y, 4, hex('#7a4a28')); R.disco(x, y, 2, hex('#5a3418')); }
    // la sombra y la hoja de papel, un poco girada, con su grano, y las tiras de cinta
    R.poligono([[38, 8], [302, 16], [298, 184], [32, 184]], hex('#6a4224'));
    R.poligono([[34, 4], [296, 12], [292, 184], [28, 184]], (x, y) => (tr4(x * 3, y * 5) > 0.93) ? hex('#e4dcc4') : hex('#f4ecd8'));
    for (const [x, y] of [[250, 10], [22, 100]]) { R.poligono([[x, y], [x + 18, y + 2], [x + 17, y + 9], [x - 1, y + 7]], hex('#e8d89a')); R.linea(x, y + 1, x + 17, y + 3, hex('#f8eab8')); }
    pintaCasa(R, false, false);
    // el frasco de lápices de colores, el bote de tinta, la goma y la regla
    R.rect(4, 126, 24, 176, hex('#2a2a3a')); R.rect(5, 127, 23, 175, hex('#5a7a9a')); R.rect(6, 128, 8, 174, hex('#8aaaca')); R.rect(5, 127, 23, 129, hex('#3a4a5a'));
    for (let k = 0; k < 6; k++) { const x = 7 + k * 3, c = [hex('#c83a3a'), hex('#e8c040'), hex('#3a8a4a'), hex('#3a5ac8'), hex('#8a4ac8'), hex('#e8783a')][k]; R.linea(x, 127, x - 2 + k, 98 + (k % 3) * 4, c); R.pset(x - 2 + k, 97 + (k % 3) * 4, hex('#2a2430')); }
    R.rect(4, 70, 24, 96, hex('#1a1424')); R.rect(5, 74, 23, 95, hex('#2a3a6a')); R.rect(9, 64, 19, 73, hex('#1a1424')); R.rect(10, 65, 18, 72, hex('#c84a3a')); R.rect(6, 76, 8, 92, hex('#4a5a9a'));
    R.rect(206, 164, 224, 172, hex('#2a2430')); R.rect(207, 165, 223, 171, hex('#e87a9a')); R.rect(207, 165, 214, 171, hex('#3a6ac8'));
    for (let k = 0; k < 8; k++) R.pset(196 + Math.floor(h1(k, 7) * 14), 174 + Math.floor(h1(k, 8) * 6), hex('#d8a0b0'));
    // la hoja de modelo del tentáculo a lápiz (de frente, de lado y enfadado) y las manchas de prueba de color
    for (let k = 0; k < 3; k++) { const x = 266, y = 58 + k * 30, c = hex('#a8a090'); R.linea(x - 5, y, x - 5, y - 14, c); R.linea(x + 5, y, x + 5, y - 14, c); R.anillo(x, y - 14, 5, c, 0); R.linea(x - 8, y + 1, x + 8, y + 1, c);
      if (k === 0) { R.anillo(x - 2, y - 13, 1.5, c); R.anillo(x + 2, y - 13, 1.5, c); } else if (k === 1) { R.anillo(x + 2, y - 13, 1.5, c); R.linea(x + 5, y - 8, x + 7, y - 8, c); } else { R.linea(x - 4, y - 16, x - 1, y - 14, c); R.linea(x + 4, y - 16, x + 1, y - 14, c); R.linea(x - 2, y - 9, x + 2, y - 10, c); }
      R.linea(x + 10, y - 7, x + 16, y - 7, c); R.pset(x + 15, y - 8, c); R.pset(x + 15, y - 6, c); }
    for (let k = 0; k < 7; k++) { const x = 52 + k * 17, c = [hex('#e89a84'), hex('#7a5aaa'), hex('#8ad8b0'), hex('#4ac83a'), hex('#f8d860'), hex('#8a9aba'), hex('#c84a6a')][k]; R.disco(x, 168, 5.5, c); R.disco(x - 2, 166, 2, mez(c, hex('#ffffff'), 0.35)); R.pset(x + 3, 172, c); }
    R.rect(302, 52, 314, 180, hex('#2a2430')); R.rect(303, 53, 313, 180, hex('#e8d8a0')); for (let y = 56; y < 180; y += 3) R.linea(303, y, y % 15 === 11 ? 309 : 306, y, hex('#6a5a3a'));
    R.usar(prev); }
  R.copiar(capa7);
  // el color, que entra como una barrida de acuarela en «worlds», y la tinta encima
  const cw = tramo(t, worldsW - 0.4, worldsW + 0.6), wx = Math.round(lerp(40, 240, cw));
  if (cw > 0) { R.recorte([40, 20, wx, 160]); pintaCasa(R, true, true); R.recorte(null); if (cw < 1) for (let y = 24; y < 156; y += 2) R.pset(wx, y, hex('#8ab8e8')); }
  // el tentáculo: primero a lápiz (lo va dibujando la mano), luego de color y vivo
  const tx = 262, ty = 170, d = tramo(t, P7 + 0.2, worldsW);
  if (t < cartW - 0.2) { const c = hex('#4a4450'), n = Math.round(d * 40);
    for (let k = 0; k < n; k++) { const a = k / 40; let x, y;
      if (a < 0.3) { x = tx - 6; y = ty - Math.round(a / 0.3 * 18); } else if (a < 0.6) { const b = (a - 0.3) / 0.3 * Math.PI; x = tx - Math.round(Math.cos(b) * 6); y = ty - 18 - Math.round(Math.sin(b) * 6); } else { x = tx + 6; y = ty - 18 + Math.round((a - 0.6) / 0.4 * 18); }
      R.pset(x, y, c); R.pset(x, y + 1, c); }
    if (d > 0.9) { R.anillo(tx - 2, ty - 17, 2, c); R.anillo(tx + 3, ty - 17, 2, c); R.linea(tx - 2, ty - 11, tx + 2, ty - 11, c); } }
  else { const v = tramo(t, cartW - 0.2, cartW + 0.3), vivo = t > cartW;
    T.tentaculo(R, tx, ty, t, { color: 'verde', s: 1, dir: -1, expresion: vivo ? 'feliz' : 'normal', salto: vivo ? Math.round(Math.abs(Math.sin((t - cartW) * 7)) * 6) : 0, mira: [0.6, -0.5], quieto: !vivo });
    if (v < 1) for (let y = ty - 30; y < ty + 2; y++) if ((y + Math.round(v * 30)) % 3) R.linea(tx - 9, y, tx + 9, y, hex('#f4ecd8')); }
  // la mano con el lápiz (amarillo, con su goma rosa), que dibuja en pequeñas vueltas y se aparta cuando el dibujo cobra vida
  const ap = tramo(t, cartW - 0.1, cartW + 0.4), bucle = t < worldsW ? 1 : 0.3;
  const px = Math.round(tx + 4 + Math.cos(t * 9) * 5 * bucle + ap * 24), py = Math.round(ty - 8 + Math.sin(t * 9) * 7 * bucle + ap * 10);
  const wx2 = px + 16, wy2 = py + 4;
  R.linea(px, py, px + 12, py - 10, hex('#2a2430')); R.linea(px + 1, py, px + 13, py - 10, hex('#e8c040')); R.linea(px + 1, py - 1, px + 13, py - 11, hex('#f8e070')); R.pset(px, py, hex('#2a2430')); R.pset(px + 1, py, hex('#d8b890'));
  R.rect(px + 12, py - 13, px + 14, py - 11, hex('#e87a9a'));
  T.brazo(R, wx2 + 40, 200, wx2, wy2, '#3e8a6a', -1, { codo: [wx2 + 26, 188] });
  // las motas de polvo en la luz del flexo
  for (let k = 0; k < 6; k++) { const f = (t * 0.08 + k / 6) % 1; R.pset(Math.round(110 + k * 22 + Math.sin(t + k) * 6), Math.round(30 + f * 60), hex('#fff4d8')); }
};
const efectos = [[begins, 'golpecito'], [genW, 'toc'], [grin, 'pop'], [P3 + 0.6, 'papel'], [luchaW, 'toc'], [insW + 0.1, 'pop'], [timeW, 'flash'], [timeW + 0.3, 'puerta'], [tripsW, 'sello'], [secW, 'cerrojo'], [ruleW, 'whoosh'], [apartW, 'golpecito'], [queW, 'pop'], [dibW, 'lapiz'], [cartW, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año: (t) => t < P4 ? 1993 : t < P5 ? 1990 : t < P6 ? 1998 : 1993 });
''')

E['la-hola'] = ('Hola', '''// LA-HOLA (frase 6), hoy. Un plano: la orilla del río tóxico de día; el tentáculo verde da un saltito y saluda a Atom
// («Atom»); el morado, con sus bracitos nuevos, le hace burla sacando la lengua («school didn't teach you»); en
// «Let's find out» los dos se van saltando hacia la máquina.''', H + r'''
const A = (f) => en('hola', f);
const atom = A(0.037), burla = A(0.42), vamos = A(0.797);
const p1 = (t) => {
  T.mansion(R, t, { encuadre: 'rio', camara: 'general', luz: 'dia' });
  const va = tramo(t, vamos, E.duracion), vb = tramo(t, vamos + 0.3, E.duracion);
  const xv = Math.round(lerp(118, -30, va)), xm = Math.round(lerp(184, -10, vb));
  // el verde: da un saltito al oír «Atom» y le hace una reverencia; luego se va saltando
  T.tentaculo(R, xv, 170, t, { color: 'verde', s: 2, dir: va > 0 ? -1 : 1, anda: va > 0, expresion: 'feliz', mira: va > 0 ? [-1, 0] : [1, -1], salto: t > atom && t < atom + 0.55 ? Math.round(Math.abs(Math.sin((t - atom) * 11)) * 6) : 0, inclina: t > atom + 0.6 && t < atom + 1.5 ? 2.4 : 0 });
  // el morado, con sus bracitos nuevos: le saca la lengua a Atom y mueve las manos (burla)
  const bur = t > burla && t < vamos - 0.1;
  const m = T.tentaculo(R, xm, 174, t, { color: 'morado', s: 2, dir: vb > 0 ? -1 : 1, anda: vb > 0, brazos: 1, pose: bur ? 'saluda' : 'normal', expresion: bur ? 'malvado' : 'normal', mira: [1, -1], inclina: bur ? Math.sin(t * 6) * 0.8 : 0 });
  if (bur && m.boca) { const [bx, by] = m.boca, l = 2 + Math.round(Math.abs(Math.sin(t * 8)) * 2); R.rect(bx - 2, by + 1, bx + 2, by + 2 + l, hex('#5a1018')); R.rect(bx - 1, by + 1, bx + 1, by + 1 + l, hex('#e85a7a')); R.pset(bx, by + l, hex('#c83a5a')); }
  // dos burbujas que revientan en el lodo y una mariposa que pasa
  burbujon(R, 230, 128, 4, (t * 0.7) % 1.4);
  burbujon(R, 60, 116, 3, ((t + 0.6) * 0.8) % 1.3);
  { const f = (t * 0.12) % 1, x = Math.round(lerp(330, 200, f)), y = Math.round(80 + Math.sin(t * 2) * 10), a = Math.sin(t * 20) > 0; R.rect(x - (a ? 2 : 1), y - 1, x - 1, y + 1, hex('#e8a040')); R.rect(x + 1, y - 1, x + (a ? 2 : 1), y + 1, hex('#e8a040')); R.pset(x, y, hex('#2a2430')); }
};
const efectos = [[atom + 0.05, 'boing'], [burla, 'masca'], [vamos + 0.05, 'whoosh']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')
