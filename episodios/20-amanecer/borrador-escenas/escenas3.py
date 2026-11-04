E = {}

# ── piezas pequeñas comunes a las escenas de este módulo (se repiten dentro de cada cuerpo) ──
COMUN = r'''
const K = T.C;
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const INK = hex('#1c1222');
// las cifras legibles de a_cifras a e aumentos (con pset: respetan R.recorte), centradas en x con la base en base
const cifrasG = (s, x, base, e = 2) => T.a_cifras({ pset: (px, py, c) => { for (let a = 0; a < e; a++) for (let b = 0; b < e; b++) R.pset(x + (px - x) * e + a, base + (py - base) * e + b, c); } }, s, x, base);
// destello de cuatro puntas
const destello = (x, y, n, c = hex('#fff8d0')) => { x = Math.round(x); y = Math.round(y); R.pset(x, y, hex('#ffffff')); for (let i = 1; i <= n; i++) { R.pset(x + i, y, c); R.pset(x - i, y, c); R.pset(x, y + i, c); R.pset(x, y - i, c); } };
// mezcla el píxel ya pintado hacia [r, g, b] en la proporción k (luces y sombras sin tapar el dibujo)
const mezcla = (x, y, [cr, cg, cb], k) => {
  const c = R.pget(x, y), r = c & 255, g = (c >> 8) & 255, bb = (c >> 16) & 255;
  R.pset(x, y, (0xff000000 | (Math.round(bb + (cb - bb) * k) << 16) | (Math.round(g + (cg - g) * k) << 8) | Math.round(r + (cr - r) * k)) >>> 0);
};
// una corchea con su contorno (cabeza en (x, y))
const nota = (x, y, c) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 2, y - 1, x + 2, y + 2, INK); R.rect(x - 1, y, x + 1, y + 1, c); R.rect(x + 1, y - 9, x + 3, y, INK); for (let j = -8; j <= 0; j++) R.pset(x + 2, y + j, c);
  R.rect(x + 3, y - 9, x + 5, y - 5, INK); R.pset(x + 3, y - 8, c); R.pset(x + 4, y - 7, c); R.pset(x + 4, y - 6, c); };
// una flecha de luz que apunta a dir (1 derecha, −1 izquierda), de largo l, con la punta en (x, y)
const flecha = (x, y, l, dir, c, cS) => { x = Math.round(x); y = Math.round(y);
  for (let i = 0; i < l; i++) { R.pset(x - dir * (i + 4), y, c); R.pset(x - dir * (i + 4), y + 1, cS); R.pset(x - dir * (i + 4), y - 1, INK); R.pset(x - dir * (i + 4), y + 2, INK); }
  for (let j = -4; j <= 4; j++) for (let i = 0; i <= 4 - Math.abs(j); i++) R.pset(x - dir * i, y + j, Math.abs(j) === 4 - i ? INK : j > 0 ? cS : c); };
'''

E['jh-balada'] = ('La balada', '''// JH-BALADA (frases 13–14), hoy → Juegos 10, cartela «10». Tres planos:
// 1. (0–«The movies») el cuarto de la fan de noche: Atom en el sofá; en «didn't come out» el pan saca el libro verde de
//    la estantería y lo levanta (a Atom le sale un «?»); en «Panem's calendar» se encienden una a una las marcas 10, 50,
//    74 y 75 de la tira de la línea de tiempo y el pan la señala con el libro en alto.
// 2. («The movies»–«from 2023») la estantería de cerca (fondo local): los cinco libros sin letras en el orden en que
//    salieron, sobre la tira 10 · 50 · 74 · 75; en «run backwards» una flecha de luz recorre la tira hacia atrás; el pan
//    entra por la balda y en «oldest story» empuja el libro verde hasta el primer hueco y luego el morado al segundo; en
//    «Songbirds» un sinsonte sale a cantar encima del verde, en «Snakes» la serpiente del lomo saca la lengua y brilla, y
//    el «10» de la tira se enciende.
// 3. («from 2023»–final) el lago del bosque de noche, junto a un farol de mano: Lucy Gray canta con la guitarra (notas
//    de colores que suben y cruzan el lago); en «young Snow» Snow joven llega entre los juncos y se queda escuchando; en
//    «Lucy Gray» ella da una vuelta con destellos; en «the girl who sang» dos sinsajos más se posan en la rama a
//    repetir la melodía y Snow aplaude.''', COMUN + r'''
const A = (f) => en('orden', f), B = (f) => en('balada', f);
const P2 = A(0.736), P3 = B(0.364);
const SACA = A(0.11), ORDEN = A(0.275), CAL = A(0.469), MOVIES = A(0.736), BACK = A(0.849);
const OLDEST = B(0.013), BALLAD = B(0.142), SONG = B(0.187), SNAKES = B(0.265);
const YOUNG = B(0.705), LUCY = B(0.773), GIRL = B(0.908), SANG = B(0.944);

// ── plano 1: el cuarto de noche; el pan saca el libro verde y la línea de tiempo se enciende ──────────────────────────
const p1 = (t) => {
  const lin = Math.min(4, Math.floor(tramo(t, CAL - 0.1, CAL + 0.9) * 4.99));
  const lleva = t > SACA;
  const g = T.hoy(R, t, { encuadre: 'cuarto', luz: 'noche', linea: lin, falta: lleva ? 3 : undefined, hora: 22 });
  // el pan, en la balda junto a los libros: saca el verde, lo levanta y señala la tira
  const sube = tramo(t, SACA, SACA + 0.35), bote = t > ORDEN && t < ORDEN + 0.5 ? Math.round(Math.abs(Math.sin((t - ORDEN) * 12)) * 3) : 0;
  const pr = T.pan(R, 106, 80 - bote, t, { dir: -1, expresion: t > CAL - 0.2 ? 'risa' : 'normal', señala: t > CAL ? [150, 86] : lleva ? [100, 58] : undefined, migas: false });
  if (lleva) { const [mx, my] = pr.mano, by = Math.round(my + 10 - sube * 8); R.rect(mx - 6, by - 22, mx + 6, by + 2, hex('#ffe890')); T.libroJH(R, mx, by, 3, { w: 7, alto: 19 }); if (t < SACA + 0.6) destello(mx + 3, my - 10, 2); }
  // las marcas de la tira: un destello cuando se enciende cada una
  if (lin > 0 && t < CAL + 1.3) { const xs = [126, 146, 166, 186]; const k = lin - 1, dt = t - (CAL - 0.1 + k * 0.2); if (dt < 0.35) destello(xs[k], 84, 3); }
  // Atom en el sofá: se asoma, pregunta con un «?» y luego se ríe con la tira
  const ay = 112 + Math.round(Math.sin(t * 2.6) * 1.5) - (t > CAL && t < CAL + 0.4 ? 3 : 0);
  R.atomo(150, ay - 4, t, { r: 10, energia: t > CAL ? 0.8 : 0.45 });
  if (t > SACA + 0.3 && t < CAL) R.icono('?', 160, 84, hex('#ffe890'), INK, 1);
  T.hoyDelante(R, t, { encuadre: 'cuarto', luz: 'noche' });
};

// ── plano 2: la estantería de cerca (fondo local) ─────────────────────────────────────────────────────────────────────
const LIB = [['#c8303a', '#8a1a24', '#e86a70'], ['#e8b830', '#a87a18', '#f8e080'], ['#3a6ab8', '#24467a', '#7aa0e0'], ['#4a8a4a', '#2e5a2e', '#8ac87a'], ['#7a4ab0', '#52307a', '#a882d8']].map((a) => a.map(hex));
const SLOT = [84, 120, 156, 192, 228];
const fondo2 = R.nuevo(); let hecho2 = false;
const pintaFondo2 = () => {
  const prev = R.usar(fondo2);
  const { rect, pset, linea } = R;
  // la pared de papel pintado de noche, con la luz de la lámpara de pie (derecha)
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const d = Math.hypot(x - 300, y - 58) / 240, raya = (x % 12) < 6, rombo = ((x + 3) % 12 === 0 && (y % 14 === 3 || y % 14 === 4)) || ((x + 9) % 12 === 0 && (y % 14 === 10 || y % 14 === 11));
    let c = raya ? [46, 58, 88] : [40, 50, 78]; if (rombo) c = [92, 92, 120];
    const k = Math.max(0, 0.55 - d * 0.6) + (h(x, y, 3) < 0.08 ? 0.04 : 0);
    pset(x, y, hex('#' + c.map((v, i) => Math.round(v + ([255, 200, 120][i] - v) * k).toString(16).padStart(2, '0')).join('')));
  }
  // a la izquierda: un cuadrito de montes y dos fotos con pinzas en un cordel
  rect(10, 52, 38, 78, INK); rect(11, 53, 37, 77, hex('#c89a5a')); rect(13, 55, 35, 75, hex('#e8c890')); rect(13, 55, 35, 66, hex('#8ab0d8'));
  R.poligono([[13, 75], [20, 62], [26, 70], [30, 64], [35, 75]], hex('#4a6a4a')); R.poligono([[18, 66], [20, 62], [22, 66]], hex('#f2f2f2'));
  linea(4, 96, 40, 100, hex('#a89070'));
  for (const [x, c] of [[10, '#d8a0a0'], [26, '#a0c0d8']]) { rect(x - 1, 99, x + 11, 113, INK); rect(x, 100, x + 10, 112, hex('#f2eee2')); rect(x + 1, 101, x + 9, 109, hex(c)); rect(x + 4, 96, x + 5, 101, hex('#c8a060')); }
  rect(14, 150, 26, 160, INK); rect(15, 151, 25, 159, hex('#e8e4dc')); pset(18, 155, INK); pset(22, 155, INK);   // el enchufe
  // la lámpara de pie, a la derecha (por debajo de la esquina de Atom)
  R.poligono([[290, 50], [310, 50], [316, 66], [284, 66]], INK); R.poligono([[291, 51], [309, 51], [314, 65], [286, 65]], hex('#f0c870'));
  for (let y = 52; y < 65; y++) for (let x = 287; x < 314; x++) if ((x + y) % 5 === 0 && R.pget(x, y) === hex('#f0c870')) pset(x, y, hex('#f8e0a0'));
  rect(299, 66, 301, 180, INK); rect(300, 66, 300, 180, hex('#8a7a6a'));
  // el mueble: los costados, el techo y el fondo de tablas oscuras
  rect(44, 16, 276, 21, INK); rect(45, 17, 275, 20, hex('#8a5a32')); rect(45, 17, 275, 17, hex('#b07a48'));
  for (let y = 22; y < 180; y++) for (let x = 53; x < 268; x++) { const tab = (x - 53) % 24 === 0, v = Math.sin(y * 0.21 + x * 0.9) + h(x, y, 5) * 0.8;
    const luz = Math.max(0, (x - 120) / 300); pset(x, y, tab ? hex('#1e120c') : v > 1.2 ? hex('#4a3020') : hex(luz > 0.25 ? '#3e2818' : '#36221a')); }
  for (const x0 of [44, 268]) { rect(x0, 16, x0 + 8, 180, INK); for (let y = 17; y < 180; y++) for (let x = x0 + 1; x < x0 + 8; x++) pset(x, y, Math.sin(y * 0.3 + x) > 0.85 ? hex('#6a4224') : x === x0 + 1 ? hex('#b07a48') : hex('#8a5a32')); }
  // la balda: el canto de arriba y el frente con la tira de papel de la línea de tiempo
  rect(53, 118, 267, 123, hex('#a06a3a')); rect(53, 118, 267, 118, hex('#d09a60'));
  rect(44, 124, 276, 141, INK); for (let y = 125; y < 141; y++) for (let x = 45; x < 276; x++) pset(x, y, Math.sin(x * 0.17 + y * 0.6 + Math.sin(x * 0.05) * 3) > 0.8 ? hex('#6a4224') : y === 125 ? hex('#c08850') : hex('#8a5a32'));
  rect(60, 127, 262, 139, INK); rect(61, 128, 261, 138, hex('#f2e8cc')); for (let x = 62; x < 261; x += 3) if (h(x, 1, 9) < 0.3) pset(x, 128 + Math.floor(h(x, 2, 9) * 10), hex('#e0d4b4'));
  rect(61, 133, 261, 133, hex('#c8a060'));
  // el hueco de abajo: cajas de películas (lomos sin letras) y una cesta de mimbre
  for (let i = 0; i < 14; i++) { const x = 58 + i * 10, c = ['#c83a3a', '#e8b830', '#3a6ab8', '#4a8a4a', '#7a4ab0', '#2a2a3a', '#d8d0c0'][i % 7], al = 30 + (i * 7 % 5);
    rect(x, 180 - al, x + 8, 180, INK); rect(x + 1, 181 - al, x + 7, 180, hex(c)); rect(x + 1, 181 - al, x + 1, 180, hex('#ffffff')); rect(x + 2, 186 - al, x + 6, 187 - al, hex('#f2eee2')); }
  rect(204, 150, 262, 180, INK); for (let y = 151; y < 180; y++) for (let x = 205; x < 262; x++) pset(x, y, ((x >> 2) + (y >> 1)) % 2 ? hex('#c89a5a') : hex('#a87a3a'));
  rect(204, 150, 262, 152, hex('#e0b878'));
  R.usar(prev); hecho2 = true;
};
// un libro grande de lomo (k 0–4: rojo, oro, azul, verde, morado) con el pie en (x, y): sin letras, con su símbolo
const libro = (x, y, k, t, o = {}) => {
  const [c, s, l] = LIB[k], w = 28, al = 78 - (k % 2) * 4, a = Math.round(x - w / 2), top = y - al, { rect, pset } = R;
  rect(a - 1, top - 4, a + w, y, INK); rect(a, top - 3, a + w - 1, top, hex('#f2ead4')); for (let i = a + 1; i < a + w - 1; i += 2) pset(i, top - 2, hex('#d8ccae'));
  rect(a, top, a + w - 1, y - 1, c); rect(a, top, a + 3, y - 1, l); rect(a + w - 4, top, a + w - 1, y - 1, s);
  for (const yy of [top + 5, top + 8, y - 9, y - 6]) { rect(a, yy, a + w - 1, yy, hex('#f0c040')); }
  const cx = Math.round(x), cy = Math.round(top + al * 0.45), oro = hex('#f8d860'), oroS = hex('#a87a18'), glow = o.brillo ?? 0;
  if (glow > 0) for (let yy = top; yy < y; yy++) for (let xx = a; xx < a + w; xx++) if (((xx + yy) & 1) === 0) mezcla(xx, yy, [255, 240, 160], 0.35 * glow);
  if (k === 0) { R.disco(cx, cy, 7, oroS); R.disco(cx, cy, 6, oro); R.disco(cx, cy, 4, c); R.linea(cx - 5, cy, cx + 5, cy - 2, INK); R.linea(cx - 3, cy + 2, cx + 4, cy - 3, INK); }
  else if (k === 1) { R.poligono([[cx, cy - 9], [cx + 6, cy + 3], [cx, cy + 7], [cx - 6, cy + 3]], oro); R.poligono([[cx, cy - 3], [cx + 3, cy + 3], [cx - 3, cy + 3]], hex('#e8483a')); }
  else if (k === 2) { R.linea(cx - 8, cy - 4, cx, cy + 2, oro); R.linea(cx + 8, cy - 4, cx, cy + 2, oro); R.linea(cx - 8, cy - 3, cx, cy + 3, oroS); R.linea(cx + 8, cy - 3, cx, cy + 3, oroS); R.disco(cx, cy + 3, 2, oro); }
  else if (k === 3) { const len = o.lengua ? 3 : 0; for (let i = -8; i <= 8; i++) { const yy = Math.round(cy + 6 + Math.sin(i * 0.55 + (o.mueve ? t * 6 : 0)) * 3); pset(cx + i, yy, oro); pset(cx + i, yy + 1, oroS); }
    R.disco(cx + 9, cy + 6 + Math.round(Math.sin(9 * 0.55 + (o.mueve ? t * 6 : 0)) * 3), 2, oro); for (let i = 1; i <= len; i++) pset(cx + 11 + i, cy + 6, hex('#e8483a'));
    R.poligono([[cx - 5, cy - 6], [cx + 3, cy - 9], [cx + 5, cy - 5], [cx - 1, cy - 3]], oro); pset(cx + 3, cy - 7, INK); }
  else { R.disco(cx, cy + 3, 6, oro); rect(cx - 9, cy + 3, cx + 9, cy + 9, c); for (let i = 0; i < 7; i++) { const an = Math.PI * (1 + i / 6); R.linea(cx + Math.round(Math.cos(an) * 8), cy + 3 + Math.round(Math.sin(an) * 8), cx + Math.round(Math.cos(an) * 11), cy + 3 + Math.round(Math.sin(an) * 11), oro); } rect(cx - 9, cy + 3, cx + 9, cy + 3, oroS); }
  for (let i = 0; i <= k; i++) R.rect(a + 6 + i * 4, y - 15, a + 7 + i * 4, y - 14, hex('#f2eee2'));   // el número del tomo, en puntos
};
const p2 = (t) => {
  if (!hecho2) pintaFondo2();
  R.copiar(fondo2);
  // las lucecitas colgadas del techo del mueble, que parpadean
  for (let x = 56; x < 266; x += 2) { const u = ((x - 56) % 70) / 70, y = Math.round(22 + Math.sin(u * Math.PI) * 9); R.pset(x, y, hex('#2a2a2a')); }
  for (let x = 60; x < 266; x += 10) { const u = ((x - 56) % 70) / 70, y = Math.round(23 + Math.sin(u * Math.PI) * 9), on = Math.sin(t * 3 + x * 0.7) > -0.2, c = hex(['#ffd060', '#ff7a8a', '#7ad8ff', '#a0f080'][(x / 10) % 4 | 0]);
    R.rect(x - 1, y + 1, x + 1, y + 3, on ? c : hex('#5a4a3a')); if (on) R.pset(x, y + 1, hex('#ffffff')); }
  // la planta del rincón y el sinsajo de juguete
  { const sw = Math.sin(t * 1.3); R.rect(56, 108, 66, 118, INK); R.rect(57, 109, 65, 117, hex('#c86a3a')); R.rect(57, 109, 65, 110, hex('#e88a5a'));
    for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + (i - 2) * 0.45 + sw * 0.06; R.linea(61, 108, Math.round(61 + Math.cos(an) * 12), Math.round(108 + Math.sin(an) * 12), i % 2 ? hex('#4a9a4a') : hex('#6ab85a')); } }
  // los libros: del orden en que salieron [0 1 2 3 4] al de Panem [3 4 0 1 2]
  const u1 = tramo(t, OLDEST, OLDEST + 0.9), u2 = tramo(t, BALLAD - 0.1, SONG + 0.5);
  const sl = (k) => { if (k === 3) return lerp(3, 0, u1); if (k === 4) return lerp(4, 1, u2); return k + u1 + u2; };
  const sx = (s) => lerp(SLOT[0], SLOT[4], s / 4);
  const orden = [0, 1, 2, 3, 4].sort((a, b) => (a === 3 && u1 > 0 && u1 < 1) || (a === 4 && u2 > 0 && u2 < 1) ? 1 : (b === 3 && u1 > 0 && u1 < 1) || (b === 4 && u2 > 0 && u2 < 1) ? -1 : 0);
  for (const k of orden) {
    const lev = k === 3 ? Math.sin(u1 * Math.PI) * 8 : k === 4 ? Math.sin(u2 * Math.PI) * 8 : 0;
    libro(sx(sl(k)), Math.round(118 - lev), k, t, { brillo: k === 3 ? tramo(t, SNAKES - 0.1, SNAKES + 0.3) * (1 - tramo(t, SNAKES + 1.4, SNAKES + 2)) : 0, mueve: k === 3 && t > SNAKES, lengua: k === 3 && t > SNAKES && Math.floor(t * 4) % 2 });
  }
  // la tira de la línea de tiempo: las marcas fijas 10 · 50 · 74 · 75 · 75 bajo cada hueco
  ['10', '50', '74', '75', '75'].forEach((s, i) => { R.rect(SLOT[i], 128, SLOT[i], 130, INK); T.a_cifras(R, s, SLOT[i], 138); });
  { const f = tramo(t, SNAKES + 0.2, SNAKES + 0.6); if (f > 0) { R.rect(SLOT[0] - 10, 127, SLOT[0] + 10, 139, hex('#c87a18')); R.rect(SLOT[0] - 9, 128, SLOT[0] + 9, 138, hex('#ffd040')); T.a_cifras(R, '10', SLOT[0], 138); if (f < 1 || Math.floor(t * 5) % 3 === 0) destello(SLOT[0] + 10, 129, 3); } }
  // «run backwards»: la flecha de luz recorre la tira de derecha a izquierda
  { const u = tramo(t, MOVIES + 0.15, BACK + 0.6); if (u > 0 && u < 1) { const x = Math.round(lerp(258, 66, u)); flecha(x, 133, 14, -1, hex('#ffd040'), hex('#c87a18')); for (let i = 0; i < 18; i += 3) R.pset(x + 18 + i, 133 + (i % 2), hex('#ffe890')); } }
  // el pan: entra por la balda y empuja el verde y luego el morado
  { const ent = tramo(t, BACK + 0.2, OLDEST - 0.05), xb = u1 < 1 ? sx(sl(3)) + 20 : sx(sl(4)) + 20;
    const x = u1 === 0 ? lerp(254, sx(3) + 20, ent) : xb, anda = (ent > 0 && ent < 1) || (u1 > 0 && u1 < 1) || (u2 > 0 && u2 < 1);
    T.pan(R, Math.round(x), 123, t, { s: 2, dir: -1, anda, expresion: t > SNAKES + 0.3 ? 'risa' : 'normal', señala: t > SONG && t < SNAKES ? [SLOT[0], 52] : undefined }); }
  // «Songbirds»: un sinsonte sale encima del verde y canta
  { const v = tramo(t, SONG - 0.1, SONG + 0.25); if (v > 0) { const x = SLOT[0] - 4, y = Math.round(lerp(60, 42, v)); T.PIEZAS_JH.sinsonte(R, x, y, { s: 2, dir: 1, t: v < 1 ? t : undefined });
      for (let i = 0; i < 3; i++) { const w = ((t - SONG) * 0.8 + i / 3) % 1; if (t > SONG + 0.1) nota(x + 16 + w * 22, y - 6 - w * 10, [hex('#ffd040'), hex('#7ad8ff'), hex('#ff8a9a')][i]); } } }
};

// ── plano 3: el lago del bosque de noche; Lucy Gray canta y Snow joven la escucha ──────────────────────────────────
const p3 = (t) => {
  const o = { encuadre: 'bosque', luz: 'noche' };
  T.distrito(R, t, o);
  // la luz cálida de un farol de mano en el suelo, sobre la cantante
  { const fx = 134, fy = 160; R.rect(fx - 3, fy - 9, fx + 3, fy, INK); R.rect(fx - 2, fy - 8, fx + 2, fy - 1, Math.sin(t * 9) > -0.6 ? hex('#ffd870') : hex('#f0b040')); R.rect(fx - 3, fy - 11, fx + 3, fy - 10, INK); R.rect(fx - 1, fy - 13, fx + 1, fy - 12, INK);
    for (let y = 118; y < 168; y++) for (let x = 104; x < 210; x++) { const d = ((x - 152) / 52) ** 2 + ((y - 146) / 26) ** 2; if (d < 1 && ((x + y) & 1) === 0) mezcla(x, y, [255, 214, 140], 0.45 * (1 - d)); } }
  // Snow joven: llega por la derecha entre los juncos y se queda escuchando; aplaude con «sang»
  const sv = tramo(t, YOUNG - 0.3, YOUNG + 0.5), sxn = Math.round(lerp(300, 224, sv));
  R.actor(EL.snowJoven, sxn, 162, t, { dir: -1, anda: sv > 0 && sv < 1, sonrisa: t > LUCY, sorpresa: t > YOUNG + 0.5 && t < LUCY, brazos: t > SANG && Math.floor(t * 6) % 2 === 0 });
  // Lucy Gray con la guitarra; da una vuelta con «Lucy Gray»
  const vuelta = t > LUCY && t < LUCY + 0.6, dirL = vuelta ? (Math.floor((t - LUCY) * 7) % 2 ? -1 : 1) : 1, mece = Math.round(Math.sin(t * 4) * 1);
  const lg = R.actor(EL.lucyGray, 146 + mece, 162, t, { dir: dirL, sostiene: vuelta ? undefined : true, habla: !vuelta && Math.sin(t * 9) > -0.2, sonrisa: true, salto: vuelta ? 2 : 0 });
  if (!vuelta && lg.mano) T.PIEZAS_JH.guitarra(R, lg.mano[0] + 1, lg.mano[1] + 6, { s: 1 });
  if (vuelta) for (let i = 0; i < 6; i++) { const an = (t - LUCY) * 9 + i; destello(153 + Math.cos(an) * 12, 148 + Math.sin(an) * 6, 2, hex(['#ff8a7a', '#ffd040', '#7ad8ff'][i % 3])); }
  // las notas que suben desde la guitarra y cruzan el lago
  const n = t > GIRL ? 8 : 4;
  for (let i = 0; i < n; i++) { const w = ((t - P3) * 0.45 + i / n) % 1, x = 160 + w * 60 * (i % 2 ? 1 : -0.5) + Math.sin(t * 2 + i) * 4, y = 140 - w * 80;
    if (y > 20 && !(x > 274 && y < 48)) nota(x, y, [hex('#ff7a6a'), hex('#ffd040'), hex('#7ad87a'), hex('#7aaaf0')][i % 4]); }
  // «the girl who sang»: dos sinsajos más cruzan el lago y se posan en la rama a repetir la melodía
  for (let k = 0; k < 2; k++) { const v = tramo(t, GIRL + k * 0.25, GIRL + 0.9 + k * 0.25); if (v > 0) { const x = Math.round(lerp(330, 92 + k * 14, v)), y = Math.round(lerp(60, 76 - k * 6, v) - Math.sin(v * Math.PI) * 18);
    T.PIEZAS_JH.sinsajo(R, x, y, { s: 1, dir: -1, t: v < 1 ? t : undefined }); if (v >= 1 && Math.floor(t * 3 + k) % 2) nota(x - 8, y - 10, hex('#ffd040')); } }
  T.distritoDelante(R, t, o);
};

const efectos = [[SACA, 'papel'], [CAL, 'brillo'], [MOVIES + 0.2, 'whoosh'], [OLDEST + 0.1, 'golpecito'], [SONG, 'pop'], [SNAKES + 0.2, 'brillo'], [YOUNG, 'golpecito'], [LUCY, 'brillo'], [SANG, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { cartela: '10', efectos, año: (t) => (t < P3 ? null : 10) });
''')

E['jh-cincuenta'] = ('Los Juegos 50', '''// JH-CINCUENTA (frases 15–17), Juegos 50 → 74 → 50, cartela «50». Tres planos (la cartela ocupa el primer 1,3 s):
// 1. (0–«And twenty-four») el Quemador al amanecer: en «fiftieth» un agente de la paz tira de la cuerda y baja una
//    colgadura granate con un «50» dorado enorme; en «Haymitch's» Haymitch entra por la izquierda y Maysilee por la
//    derecha y se paran a mirarse bajo la colgadura; él le habla, ella se da la vuelta con la nariz alta y al final le
//    sonríe de reojo; por detrás, el hermano de Haymitch persigue una gallina.
// 2. («And twenty-four»–«So») la tele de cerca: en la pantalla, la línea de tiempo 10 · 50 · 74; la luz corre del 50
//    al 74 en «twenty-four years» con un arco y un «24»; en «Katniss's Games» la pantalla pasa a la trenza de Katniss de
//    espaldas y el broche que brilla; el pan, en la balda de las cintas, salta y señala en «saw first»; en «2012» sale
//    la fecha sobre la imagen.
// 3. («So»–final) la sala del mapa del Capitolio: en las tres pantallas de la pared, Snow joven (10), Haymitch (50) y
//    Katniss (74), unidas por una línea dorada; en «sits» baja una lupa por la pantalla del centro y en «the middle» se
//    posa sobre Haymitch (y late el 12 en la mesa); en «after Snow» se enciende la de Snow, en «before Katniss» la de
//    Katniss y en «explains both» salen dos flechas de luz del centro a los lados; un vigilante lo explica con el dedo.''', COMUN + r'''
const A = (f) => en('cincuenta', f), B = (f) => en('katniss', f), C = (f) => en('medio', f);
const P2 = A(0.577), P3 = B(0), P4 = C(0);
const LATER = A(0.093), FIFTY = A(0.235), GAMES = A(0.328), MOVIE = A(0.86);
const AFTER = B(0.137), KATNISS = B(0.321), SAW = B(0.605), BACK = B(0.799), Y2012 = B(0.854);
const SITS = C(0.226), MIDDLE = C(0.358), SNOW = C(0.487), BEFORE = C(0.603), EXPLAINS = C(0.828);

// ── plano 1: la Veta al amanecer; el cartel del 50 y Haymitch y Maysilee se cruzan ───────────────────────────────
const gallina = (x, y, t, dir) => { x = Math.round(x); const X = (i) => x + dir * i, pa = Math.floor(t * 10) % 2, { rect, pset } = R;
  rect(Math.min(X(-4), X(4)), y - 7, Math.max(X(-4), X(4)), y - 2, INK); rect(Math.min(X(-3), X(3)), y - 6, Math.max(X(-3), X(3)), y - 3, hex('#f2eee6'));
  rect(Math.min(X(2), X(5)), y - 10, Math.max(X(2), X(5)), y - 6, INK); rect(Math.min(X(3), X(4)), y - 9, Math.max(X(3), X(4)), y - 7, hex('#f2eee6')); pset(X(4), y - 11, hex('#e83a3a')); pset(X(3), y - 11, hex('#e83a3a')); pset(X(6), y - 8, hex('#f0a020')); pset(X(4), y - 8, INK);
  pset(X(-1 + pa), y - 1, hex('#f0a020')); pset(X(1 - pa), y - 1, hex('#f0a020')); pset(X(-1 + pa), y, hex('#f0a020')); pset(X(1 - pa), y, hex('#f0a020')); pset(X(-5), y - 6 - pa, hex('#d8d0c0')); };
// el cartel pegado en el poste del farol, centro arriba en (x, y); ab 0–1 se desenrolla hacia abajo
const cartel = (x, y, ab) => {
  const w = 40, al = Math.max(4, Math.round(34 * ab)), x0 = x - 20, { rect, pset } = R;
  rect(x0 - 1, y - 1, x0 + w, y + al, INK); rect(x0, y, x0 + w - 1, y + al - 1, hex('#efe4c4')); rect(x0, y, x0 + w - 1, y + 3, hex('#b8323a')); rect(x0, y + al - 4, x0 + w - 1, y + al - 1, hex('#b8323a'));
  for (let i = x0 + 2; i < x0 + w - 2; i += 3) if (h(i, 7, 5) < 0.5) pset(i, y + 5 + Math.floor(h(i, 8, 5) * Math.max(1, al - 10)), hex('#ddd0ae'));
  if (ab >= 1) { cifrasG('50', x, y + 28, 2); pset(x0 + 2, y + 1, hex('#f0e0a0')); pset(x0 + w - 3, y + 1, hex('#f0e0a0')); }
};
const p1 = (t) => {
  T.distrito(R, t, { encuadre: 'calle', luz: 'amanecer' });
  // dos chicos del 12, vestidos para la cosecha, pasan al fondo camino de la plaza
  for (const [el, x0, d] of [[EL.tributoChica, 216, 0], [EL.tributoChico, 234, 0.25]]) { const u = tramo(t, 0.2 + d, 4.4 + d); R.actor(el, Math.round(lerp(x0, x0 + 116, u)), 140, t, { dir: 1, anda: u > 0 && u < 1 }); }
  // el agente de la paz llega con el cartel enrollado y en «fiftieth» lo planta en el poste del farol
  const ua = tramo(t, 0.3, FIFTY - 0.3), pega = t > FIFTY - 0.1;
  const ag = R.actor(EL.agentePaz, Math.round(lerp(-18, 98, ua)), 160, t, { dir: 1, anda: ua > 0 && ua < 1, sostiene: !pega ? true : t < FIFTY + 0.4 ? [122, 128] : undefined, dedo: t > FIFTY + 0.6 && t < P2 });
  if (!pega && ag.mano) { const [mx, my] = ag.mano; R.rect(mx - 2, my - 9, mx + 2, my + 2, INK); R.rect(mx - 1, my - 8, mx + 1, my + 1, hex('#efe4c4')); R.pset(mx, my - 7, hex('#b8323a')); R.pset(mx, my - 2, hex('#b8323a')); }
  if (pega) { cartel(124, 100, tramo(t, FIFTY - 0.1, FIFTY + 0.2)); if (t < FIFTY + 0.6) for (const [dx, dy] of [[-24, 2], [24, 4], [-22, 32], [23, 30]]) destello(124 + dx, 100 + dy, 2); }
  // el hermano de Haymitch persigue una gallina por el barro
  { const u = tramo(t, P2 + 1.0, P3 - 0.2), gx = lerp(40, 250, u); if (u > 0 && u < 1) { gallina(gx + 22, 172 - (Math.floor(t * 8) % 2), t, 1); R.actor(EL.hermanoHaymitch, Math.round(gx), 174, t, { dir: 1, anda: true, sonrisa: true, brazos: Math.floor(t * 4) % 2 === 0 }); } }
  // Haymitch sale de su casa; Maysilee llega por la derecha; se paran junto al cartel y se miran
  const s1 = tramo(t, 1.4, GAMES + 0.2), s2 = tramo(t, GAMES + 0.3, P2 + 0.1);
  const hx = Math.round(lerp(lerp(158, 150, s1), 142, s2)), hy = Math.round(lerp(132, 162, s1));
  const mira = t > P2 + 0.1, gira = t > MOVIE + 0.1 && t < P3 - 0.8;
  R.actor(EL.haymitch, hx, hy, t, { dir: 1, anda: (s1 > 0 && s1 < 1) || (s2 > 0 && s2 < 1), habla: mira && t < MOVIE && Math.sin(t * 9) > 0, sonrisa: mira && !gira, sorpresa: gira || (t > FIFTY + 0.2 && t < FIFTY + 0.8), dedo: mira && t < MOVIE - 0.7 });
  const um = tramo(t, GAMES - 0.4, P2 + 0.1);
  R.actor(EL.maysilee, Math.round(lerp(300, 172, um)), 162, t, { dir: gira ? 1 : -1, anda: um > 0 && um < 1, enfado: mira && t < P3 - 0.8, sonrisa: t > P3 - 0.8 });
  if (mira && t < P2 + 0.8) { R.icono('!', 149, 128, hex('#ffe890'), INK, 1); R.icono('!', 179, 128, hex('#ff9ab8'), INK, 1); }
};

// ── plano 2: la tele de cerca; la línea de tiempo llega al 74 y la trenza y el broche de Katniss ────────────────────────────
const pantalla3 = (R, t, [x0, y0, x1, y1]) => {
  const XT = { '10': x0 + 16, '50': x0 + 54, '74': x0 + 112, '75': x0 + 126 };
  const k = tramo(t, KATNISS - 0.15, KATNISS + 0.25);
  // la línea de tiempo sobre fondo azul noche
  if (k < 1) {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, ((x + y) & 3) === 0 ? hex('#1a2448') : hex('#141c3a'));
    for (let i = 0; i < 30; i++) R.pset(x0 + Math.floor(h(i, 1, 21) * (x1 - x0)), y0 + Math.floor(h(i, 2, 21) * 40), Math.sin(t * 3 + i) > 0 ? hex('#8a9ad8') : hex('#3a4a7a'));
    const yl = y0 + 46, ll = lerp(XT['50'], XT['74'], tramo(t, B(0.016), AFTER + 0.4));
    R.linea(x0 + 8, yl, x1 - 8, yl, hex('#5a6aa0')); R.linea(x0 + 8, yl + 1, x1 - 8, yl + 1, hex('#3a4a78'));
    for (let x = XT['10']; x <= ll; x++) { R.pset(x, yl, hex('#ffe070')); R.pset(x, yl + 1, hex('#d8a030')); R.pset(x, yl - 1, hex('#fff4c0')); }
    for (const [s, x] of Object.entries(XT)) { const on = x <= ll + 1; R.disco(x, yl, 3, on ? hex('#ffd040') : hex('#5a6aa0')); R.disco(x, yl, 1.5, on ? hex('#fff8d0') : hex('#3a4a78'));
      if (s !== '75') { if (on) T.a_cifras(R, s, x, yl + 16); else R.rect(x - 6, yl + 8, x + 6, yl + 16, hex('#2a3460')); } }
    if (ll < XT['74']) destello(Math.round(ll), yl, 3); else if (t < AFTER + 1.2) destello(XT['74'], yl, 4);
    // «twenty-four years»: el arco con el 24 entre el 50 y el 74
    const a = tramo(t, B(0.016), B(0.016) + 0.4); if (a > 0) { for (let i = 0; i <= 40 * a; i++) { const u = i / 40, x = Math.round(lerp(XT['50'], XT['74'], u)), y = Math.round(yl - 6 - Math.sin(u * Math.PI) * 14); R.pset(x, y, hex('#ffd040')); }
      if (a >= 1) T.a_cifras(R, '24', (XT['50'] + XT['74']) / 2, yl - 24); }
  }
  // la trenza de Katniss de espaldas y el broche que brilla
  if (k > 0) {
    const cx = x0 + 56, top = y0 + 14;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const bay = ((x & 3) * 4 + (y & 3)) / 16; if (bay >= k) continue;
      const v = (y - y0) / (y1 - y0); R.pset(x, y, v < 0.5 ? (h(x >> 2, y >> 2, 4) < 0.5 ? hex('#2e5a3a') : hex('#3a6a44')) : (h(x >> 2, y >> 2, 5) < 0.5 ? hex('#4a7a3a') : hex('#5a8a44'))); }
    if (k >= 1) {
      // los pinos del fondo
      for (const px of [x0 + 10, x0 + 30, x1 - 40, x1 - 18]) for (let j = 0; j < 30; j++) { const w = Math.round(j * 0.35); R.rect(px - w, y0 + 14 + j, px + w, y0 + 14 + j, hex('#1e3a26')); }
      // los hombros de la chaqueta y la cabeza de espaldas con la trenza
      R.poligono([[cx - 34, y1], [cx - 28, y1 - 20], [cx - 12, y1 - 26], [cx + 12, y1 - 26], [cx + 28, y1 - 20], [cx + 34, y1]], INK);
      R.poligono([[cx - 32, y1], [cx - 27, y1 - 19], [cx - 11, y1 - 25], [cx + 11, y1 - 25], [cx + 27, y1 - 19], [cx + 32, y1]], hex('#7a4a2a'));
      R.linea(cx - 26, y1 - 18, cx - 30, y1, hex('#9a6a3a')); R.linea(cx + 16, y1 - 22, cx + 24, y1, hex('#5a341c'));
      R.disco(cx, top + 20, 19, INK); R.disco(cx, top + 20, 18, hex('#2a2028')); for (let i = -14; i <= 14; i += 3) R.linea(cx + i, top + 4, cx + i * 0.6, top + 34, hex('#3a3040'));
      for (let j = 0; j < 34; j++) { const bx = Math.round(cx + 12 + j * 0.2 + Math.sin(j * 0.8 + t * 1.5) * 1), by = top + 30 + j; R.rect(bx - 4, by, bx + 4, by, INK); R.rect(bx - 3, by, bx + 3, by, (j >> 2) % 2 ? hex('#2a2028') : hex('#4a3e4c')); }
      // el broche, en la chaqueta, grande y con brillo
      const bx = x1 - 34, by = y1 - 14, br = Math.sin(t * 4) > 0.3;
      T.PIEZAS_JH.broche(R, bx, by, { s: 2, brillo: br });
      for (let i = 0; i < 8; i++) { const an = i / 8 * Math.PI * 2 + t * 0.8, r0 = 18, r1 = 22 + Math.sin(t * 6 + i) * 2; R.linea(Math.round(bx + Math.cos(an) * r0), Math.round(by - 15 + Math.sin(an) * r0), Math.round(bx + Math.cos(an) * r1), Math.round(by - 15 + Math.sin(an) * r1), hex('#ffe070')); }
      if (Math.floor(t * 3) % 2) destello(bx - 6, by - 24, 3);
      // «back in 2012»: la fecha sobre la imagen
      const f = tramo(t, Y2012 - 0.1, Y2012 + 0.2); if (f > 0) { R.rect(x0 + 8, y0 + 6, x0 + 66, y0 + 30, hex('#1c1222')); cifrasG('2012', x0 + 37, y0 + 26, 2); }
      // el grano de la película
      for (let i = 0; i < 24; i++) R.pset(x0 + Math.floor(h(i, Math.floor(t * 12), 6) * (x1 - x0)), y0 + Math.floor(h(i, Math.floor(t * 12), 7) * (y1 - y0)), hex('#d8e0c0'));
    }
  }
};
const p3 = (t) => {
  const o = { encuadre: 'tele', camara: 'pantalla', pantalla: pantalla3 };
  T.interior(R, t, o);
  // el pan, en la balda de las cintas: mira, salta en «saw first» y señala la pantalla
  const salta = t > SAW && t < SAW + 0.8 ? Math.round(Math.sin((t - SAW) / 0.8 * Math.PI) * 12) : 0;
  T.pan(R, 248, 176 - salta, t, { s: 2, dir: -1, expresion: t > SAW ? 'risa' : 'normal', señala: t > SAW + 0.1 && t < BACK ? [180, 100] : undefined });
  T.interiorDelante(R, t, o);
};

// ── plano 3: la sala del mapa del Capitolio; las tres pantallas y la lupa sobre Haymitch ─────────────────────────────
const PANT = [[30, 18, 98, 52], [134, 18, 186, 52], [214, 18, 272, 52]];
const FONDOS = [['#5a6a8a', '#8a9ab8', '#b8c4d8'], ['#a8582a', '#e0904a', '#f8c878'], ['#1e4a2a', '#3a6a3a', '#6a9a5a']];
// lo que sale en cada pantalla: el fondo pintado, un decorado mínimo y el personaje de cuerpo entero
const retrato = (i, t) => {
  const [a, b, c, d] = PANT[i], [c0, c1, c2] = FONDOS[i].map(hex), { rect, pset } = R;
  R.recorte([a, b, c, d]);
  for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) { const v = (y - b) / (d - b) + (h(x >> 1, y >> 1, 50 + i) - 0.5) * 0.2; pset(x, y, v < 0.4 ? c2 : v < 0.7 ? c1 : c0); }
  for (let x = a; x <= c; x++) for (let y = d - 5; y <= d; y++) pset(x, y, ((x + y) & 1) ? hex(['#c8c4bc', '#4a3e34', '#2e4a1e'][i]) : hex(['#a8a49c', '#3a3028', '#24381a'][i]));
  if (i === 0) { for (const x of [a + 6, a + 18, c - 18, c - 6]) { R.linea(x, b + 6, x, d - 6, hex('#f2f0ec')); R.linea(x + 1, b + 6, x + 1, d - 6, hex('#c8c8d0')); } for (let k = 0; k < 4; k++) T.PIEZAS_JH.rosaBlanca(R, a + 10 + k * 15, d - 3, { s: 1 }); }
  if (i === 1) { R.disco(a + 12, b + 14, 5, hex('#fff0b0')); for (const [x, w] of [[a + 4, 9], [c - 14, 11]]) { R.poligono([[x - 1, d - 10], [x + w / 2, d - 16], [x + w + 1, d - 10]], hex('#3a3238')); rect(x, d - 10, x + w, d - 5, hex('#5a4a44')); pset(x + 3, d - 8, hex('#ffd870')); } }
  if (i === 2) { for (const x of [a + 6, a + 16, c - 8]) for (let j = 0; j < 22; j++) { const w = Math.round(j * 0.25); for (let q = -w; q <= w; q++) pset(x + q, d - 26 + j, hex('#14361e')); } T.PIEZAS_JH.sinsajo(R, c - 20, b + 12, { s: 1, dir: -1, t }); }
  const cx = Math.round((a + c) / 2) - 7;
  if (i === 0) { const sj = R.actor(EL.snowJoven, cx, d - 2, t, { dir: 1, sostiene: true, sonrisa: true }); T.PIEZAS_JH.rosaBlanca(R, sj.mano[0], sj.mano[1] + 2, { s: 1 }); }
  if (i === 1) R.actor(EL.haymitch, cx, d - 2, t, { dir: 1, sonrisa: t > MIDDLE + 0.3 });
  if (i === 2) R.actor(EL.katnissArco, cx, d - 2, t, { dir: -1 });
  // la cifra de los Juegos arriba a la izquierda y las líneas de barrido de la pantalla
  T.a_cifras(R, ['10', '50', '74'][i], a + 10, b + 11);
  for (let y = b; y <= d; y += 2) for (let x = a; x <= c; x++) if (((x + Math.floor(t * 20)) % 37) === 0) mezcla(x, y, [255, 255, 255], 0.2);
  R.recorte(null);
};
const p4 = (t) => {
  const g = T.capitolio(R, t, { encuadre: 'mapa', trenes: 0.6 });
  for (let i = 0; i < 3; i++) retrato(i, t);
  // los marcos que se encienden: el del centro con «the middle», el de Snow con «after Snow», el de Katniss con «before»
  const lit = [tramo(t, SNOW - 0.1, SNOW + 0.2), tramo(t, MIDDLE - 0.1, MIDDLE + 0.3), tramo(t, BEFORE - 0.1, BEFORE + 0.2)];
  PANT.forEach(([a, b, c, d], i) => { if (lit[i] > 0) { const on = Math.sin(t * 8 + i) > -0.3 ? hex('#fff4a0') : hex('#f0c040');
    for (let x = a - 2; x <= c + 2; x++) { R.pset(x, b - 2, on); R.pset(x, d + 2, on); } for (let y = b - 2; y <= d + 2; y++) { R.pset(a - 2, y, on); R.pset(c + 2, y, on); } } });
  // la línea de tiempo dorada que une las tres pantallas por debajo, con su punto en cada una
  for (let x = 40; x <= 262; x++) { R.pset(x, 55, hex('#f0c040')); R.pset(x, 56, hex('#a87a18')); }
  for (const x of [64, 160, 243]) { R.disco(x, 55, 2.5, INK); R.disco(x, 55, 1.6, hex('#ffd040')); }
  // «explains both»: dos flechas de luz salen del centro hacia los lados por la línea
  { const e = tramo(t, EXPLAINS - 0.1, EXPLAINS + 0.5); if (e > 0) { const l = Math.round(e * 64); flecha(150 - l, 55, Math.max(2, Math.min(l, 60)), -1, hex('#fff4a0'), hex('#c87a18')); flecha(170 + l, 55, Math.max(2, Math.min(l, 60)), 1, hex('#fff4a0'), hex('#c87a18')); } }
  // la lupa: baja por la pantalla del centro y en «the middle» se posa sobre Haymitch (lo aumenta)
  { const [a, b, c, d] = PANT[1], baja = tramo(t, SITS - 0.2, MIDDLE), bote = t > MIDDLE && t < MIDDLE + 0.5 ? Math.round(Math.sin((t - MIDDLE) * 12) * 2) : 0;
    if (baja > 0) { const lx = 158, ly = Math.round(lerp(b - 20, 36, baja)) + bote, rr = 11, W = 2 * rr + 1, src = [];
      for (let y = ly - rr; y <= ly + rr; y++) for (let x = lx - rr; x <= lx + rr; x++) src.push(R.pget(x, y));
      R.recorte([a, b, c, d]);
      for (let y = -rr; y <= rr; y++) for (let x = -rr; x <= rr; x++) if (x * x + y * y <= rr * rr) R.pset(lx + x, ly + y, src[(Math.round(y / 1.7) + rr) * W + Math.round(x / 1.7) + rr]);
      R.anillo(lx, ly, rr + 1, INK, 1); R.anillo(lx, ly, rr + 2.4, hex('#e0b040'), 2); R.anillo(lx, ly, rr + 3.6, INK, 1);
      for (let i = 0; i < 4; i++) R.pset(lx - 6 + i, ly - 7 + i, hex('#ffffff'));
      R.linea(lx + 10, ly + 10, lx + 18, ly + 18, INK); R.linea(lx + 11, ly + 10, lx + 19, ly + 18, hex('#8a5a2a')); R.linea(lx + 10, ly + 11, lx + 18, ly + 19, hex('#6a3a1a'));
      R.recorte(null); } }
  // en «the middle» late también el Distrito 12 en la mesa del mapa
  if (g && g.distritos && t > MIDDLE) { const [dx, dy] = g.distritos[11], r = 3 + ((t - MIDDLE) * 8) % 8; R.anillo(dx, dy, r, hex('#ffd040'), 1); }
  // dos vigilantes a los lados de la mesa: el de la izquierda señala y explica; el de la derecha asiente
  R.actor(EL.vigilante, 22, 170, t, { dir: 1, dedo: t > MIDDLE - 0.2 && t < EXPLAINS, habla: (t < SITS && Math.sin(t * 9) > 0) || (t > EXPLAINS && Math.sin(t * 9) > 0) });
  R.actor(EL.vigilante, 298, 170, t, { dir: -1, pal: { C: '#3a5a9a', c: '#2a4070' }, sorpresa: (t > SNOW && t < SNOW + 0.5) || (t > BEFORE && t < BEFORE + 0.5), sonrisa: t > EXPLAINS, salto: t > MIDDLE && t < MIDDLE + 0.2 ? 2 : 0 });
  T.capitolioDelante(R, t, { encuadre: 'mapa' });
};

const efectos = [[1.4, 'aldea'], [FIFTY - 0.3, 'papel'], [FIFTY + 0.1, 'brillo'], [P2 + 0.1, 'pop'], [P2 + 1.3, 'boing'], [B(0.016) + 0.1, 'whoosh'], [KATNISS, 'brillo'], [SAW, 'boing'], [Y2012, 'pop'], [SITS, 'whoosh'], [MIDDLE, 'brillo'], [SNOW, 'pop'], [BEFORE, 'pop'], [EXPLAINS, 'whoosh']];
T.rodar(E, R, [[0, p1], [P3, p3], [P4, p4]], { cartela: '50', efectos, año: (t) => (t >= P3 && t < P4 ? 74 : 50) });
''')

E['jh-vasallaje'] = ('El Vasallaje', '''// JH-VASALLAJE (frases 18–19), Juegos 50. Tres planos:
// 1. (0–«Special») el despacho de Snow: Snow cruza detrás de la mesa hasta el cofre; en «twenty-five years» lo abre y
//    sale un «25» dorado; en «Quarter Quell» levanta una tarjeta que brilla; el vigilante de visita se inclina y el
//    agente de la puerta saluda.
// 2. («Special»–«The second») la mesa de cerca: del cofre asoman tres tarjetas, 25, 50 y 75; en «twist» la del 50 da
//    una vuelta; en «that they lost» la del 25 vuelve a caer al cofre; en «fiftieth» Snow saca la del 50 y la tarjeta
//    grande de la mesa pasa de «?» a «50».
// 3. («The second»–final) el borde de la maqueta de la arena: el prado con 24 lucecitas y un panel holográfico con el
//    24; en «double the tributes» se encienden las nuevas una a una (en ámbar en el panel) hasta el 48 en «forty-eight»,
//    con la baliza y la luz de alarma; los dos vigilantes se miran y el de delante señala la maqueta.''', COMUN + r'''
const A = (f) => en('vasallaje', f), B = (f) => en('doble', f);
const P2 = A(0.495), P3 = B(0.218);
const V25 = A(0.034), QUARTER = A(0.34), TWIST = A(0.63), LOST = A(0.917), FIFTIETH = B(0.026);
const DOUBLE = B(0.527), N48 = B(0.745), INSTEAD = B(0.803);

// una tarjeta del cofre con su número, centro abajo en (x, y); lo que queda por debajo de yMax no se pinta (el cofre)
const tarjeta = (x, y, s, ancho = 22, yMax = 999) => { x = Math.round(x); y = Math.round(y); const a = Math.round(ancho / 2), yb = Math.min(y, yMax);
  if (yb < y - 29) return; const { rect } = R;
  rect(x - a - 1, y - 30, x + a, yb, INK); rect(x - a, y - 29, x + a - 1, yb - 1, hex('#f8f4ec')); rect(x - a, y - 29, x + a - 1, y - 28, hex('#f0c040')); rect(x - a, y - 29, x - a, yb - 1, hex('#f0c040'));
  if (ancho > 10 && yb > y - 14) T.a_cifras(R, s, x, y - 15); };

// ── plano 1: el despacho; Snow abre el cofre ───────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const ab = tramo(t, V25 - 0.1, V25 + 0.5), o = { encuadre: 'despacho', cofre: ab };
  T.capitolio(R, t, o);
  // el agente de la paz de guardia junto a la librería; saluda en «Quarter Quell»
  R.actor(EL.agentePaz, 70, 168, t, { dir: 1, dedo: t > QUARTER && t < QUARTER + 1 });
  // el vigilante de visita: espera, habla, y se inclina sorprendido con la tarjeta
  R.actor(EL.vigilante, 262, 168, t, { dir: -1, habla: t > 0.4 && t < V25 - 0.1 && Math.sin(t * 9) > 0, sorpresa: t > QUARTER + 0.1 && t < P2 - 0.6, sonrisa: t > P2 - 0.6, salto: t > QUARTER + 0.1 && t < QUARTER + 0.3 ? 2 : 0 });
  // Snow cruza detrás de la mesa hasta el cofre, lo abre y levanta una tarjeta
  const u = tramo(t, 0.1, V25 - 0.2), sx = Math.round(lerp(108, 160, u)), alza = tramo(t, QUARTER - 0.3, QUARTER + 0.2);
  const s = R.actor(EL.snow, sx, 133, t, { dir: 1, anda: u > 0 && u < 1, sostiene: u >= 1 ? [lerp(178, 172, alza), lerp(118, 108, alza)] : undefined, sonrisa: t > V25 + 0.3 });
  if (alza > 0 && s.mano) { const [mx, my] = s.mano; R.rect(mx - 3, my - 9, mx + 3, my + 1, INK); R.rect(mx - 2, my - 8, mx + 2, my, hex('#f8f4ec')); R.rect(mx - 2, my - 8, mx + 2, my - 7, hex('#f0c040')); if (Math.floor(t * 4) % 2) destello(mx + 4, my - 10, 3); }
  T.capitolioDelante(R, t, o);
  // «twenty-five years»: el 25 dorado sale del cofre
  { const v = tramo(t, V25, V25 + 0.5); if (v > 0 && t < QUARTER - 0.2) { cifrasG('25', 186, Math.round(lerp(118, 98, v)), 2); for (let i = 0; i < 3; i++) destello(172 + i * 14, Math.round(lerp(118, 82, v)) + (i % 2) * 6, 2); } }
};

// ── plano 2: la mesa de cerca; las tarjetas 25, 50 y 75 ───────────────────────────────────────────────────────────
const p2 = (t) => {
  const revela = t > FIFTIETH, o = { encuadre: 'despacho', camara: 'mesa', cofre: 1, numero: revela ? '50' : '?' };
  T.capitolio(R, t, o);
  // Snow, detrás de la mesa, entre el cofre y la tarjeta grande: habla, sonríe y coge al vuelo la del 50
  const vuela = tramo(t, FIFTIETH - 0.3, FIFTIETH + 0.2);
  const s = R.actor(EL.snow, 128, 115, t, { dir: -1, sonrisa: t > LOST - 0.6, sostiene: vuela > 0.6 ? [124, 92] : undefined, habla: t > P2 + 0.3 && t < TWIST && Math.sin(t * 8) > 0, sorpresa: t > TWIST && t < TWIST + 0.5 });
  T.capitolioDelante(R, t, o);
  // las tres tarjetas asoman del cofre; en «twist» la del 50 da una vuelta; en «lost» la del 25 vuelve a caer
  const sube = (k) => tramo(t, P2 + 0.1 + k * 0.2, P2 + 0.5 + k * 0.2), BOCA = 134;
  const cae25 = tramo(t, LOST - 0.2, LOST + 0.2), gira = tramo(t, TWIST - 0.1, TWIST + 0.6), anchoG = Math.max(2, Math.round(22 * Math.abs(Math.cos(gira * Math.PI))));
  tarjeta(60, Math.round(150 - sube(0) * 30 + cae25 * 32), '25', 22, BOCA);
  tarjeta(100, Math.round(150 - sube(2) * 26), '75', 22, BOCA);
  if (vuela < 1) { const x = lerp(80, 124, vuela), y = lerp(150 - sube(1) * 36, 104, vuela) - Math.sin(vuela * Math.PI) * 16; tarjeta(x, y, '50', anchoG, vuela > 0 ? 999 : BOCA); }
  else if (s.mano) { const [mx, my] = s.mano; tarjeta(mx + 2, my + 6, '50'); if (t < FIFTIETH + 0.9) destello(mx + 10, my - 22, 3); }
  // la tarjeta grande de la mesa: destello al revelarse el 50
  if (revela && t < FIFTIETH + 0.6) { for (let i = 0; i < 8; i++) { const an = i / 8 * Math.PI * 2; R.linea(Math.round(169 + Math.cos(an) * 34), Math.round(137 + Math.sin(an) * 30), Math.round(169 + Math.cos(an) * 40), Math.round(137 + Math.sin(an) * 36), hex('#fff4a0')); } }
  // un pétalo que cae del jarrón de rosas
  { const w = ((t - P2) * 0.35) % 1, x = Math.round(282 - w * 18 + Math.sin(t * 3) * 3), y = Math.round(88 + w * 60); R.rect(x, y, x + 1, y, hex('#f8f6f0')); R.pset(x, y + 1, hex('#d8d4cc')); }
};

// ── plano 3: el borde de la maqueta; las lucecitas pasan de 24 a 48 ──────────────────────────────────────────────
// el panel holográfico que flota en la sala: la cifra y la rejilla de figuritas (las nuevas, en ámbar)
const panel = (t, n) => {
  const [a, b, c, d] = [12, 18, 92, 60];
  for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) if (((x + y) & 1) === 0 || x === a || x === c || y === b || y === d) mezcla(x, y, [60, 200, 255], x === a || x === c || y === b || y === d ? 0.7 : 0.18);
  for (let y = b + 2; y < d; y += 3) if (((y + Math.floor(t * 10)) % 9) === 0) for (let x = a + 1; x < c; x++) mezcla(x, y, [180, 240, 255], 0.25);
  cifrasG(String(n), 34, b + 22, 2);
  for (let k = 0; k < 48; k++) { const x = a + 6 + (k % 12) * 6, y = b + 30 + Math.floor(k / 12) * 6, on = k < n, nueva = k >= 24;
    R.rect(x, y, x + 2, y + 3, on ? (nueva ? hex('#ffc040') : hex('#a0f0ff')) : hex('#1e3a4a')); if (on) R.pset(x + 1, y - 1, on ? (nueva ? hex('#ffc040') : hex('#a0f0ff')) : 0); }
  R.linea(c, d, c + 14, d + 22, hex('#5ac8f0'));
};
const p3 = (t) => {
  const n = Math.round(lerp(24, 48, tramo(t, DOUBLE, N48))), alarma = t > DOUBLE ? (0.5 + 0.5 * Math.sin((t - DOUBLE) * 7)) : 0;
  const o = { encuadre: 'cupula', camara: 'borde', luces: n };
  T.arena(R, t, o);
  // las lucecitas nuevas: un destello sobre el prado cuando llegan
  if (t > DOUBLE && t < N48 + 0.3) for (let i = 0; i < 4; i++) destello(20 + h(i, Math.floor(t * 6), 1) * 170, 100 + h(i, Math.floor(t * 6), 2) * 18, 2, hex('#ffe070'));
  panel(t, n);
  // los dos vigilantes, fuera a la derecha: se miran con «double» y el de delante señala la maqueta en «forty-eight»
  R.actor(EL.vigilante, 262, 178, t, { dir: t > DOUBLE + 0.3 && t < N48 - 0.1 ? 1 : -1, sorpresa: t > DOUBLE && t < N48, dedo: t > N48 && t < INSTEAD + 0.6, habla: (t < DOUBLE - 0.3 && Math.sin(t * 9) > 0) || (t > INSTEAD + 0.6 && Math.sin(t * 9) > 0) });
  R.actor(EL.vigilante, 290, 178, t, { dir: -1, pal: { C: '#3a5a9a', c: '#2a4070' }, sorpresa: t > DOUBLE + 0.1 && t < N48 + 0.2, sonrisa: t > INSTEAD, salto: t > DOUBLE && t < DOUBLE + 0.2 ? 2 : 0 });
  // la baliza de alarma del techo y la luz roja que late en toda la sala
  { const on = t > DOUBLE && Math.floor(t * 4) % 2 === 0; R.rect(236, 16, 246, 22, INK); R.rect(237, 17, 245, 21, on ? hex('#ff3a4a') : hex('#6a1a24')); R.rect(238, 17, 240, 18, on ? hex('#ffb0b8') : hex('#8a2a34'));
    if (alarma > 0) for (let y = 0; y < 180; y++) for (let x = (y & 1); x < 320; x += 2) mezcla(x, y, [255, 40, 60], 0.12 * alarma); }
};

const efectos = [[V25, 'cerrojo'], [V25 + 0.3, 'brillo'], [QUARTER, 'papel'], [P2 + 0.2, 'papel'], [TWIST, 'whoosh'], [LOST, 'golpecito'], [FIFTIETH, 'flash'], [DOUBLE, 'aviso'], [N48, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 50 });
''')
