E = {}

# piezas comunes de las dos escenas (se pegan al principio de cada cuerpo)
COMUN = r'''
const K = hex('#17151d'), BL = hex('#f6f2ea'), GUANTE = '#5a8ad0';
const ease = (u) => u * u * (3 - 2 * u);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { a = Math.max(0, Math.min(1, a)); const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const H = (s) => hex(s);
// un fondo fijo propio, en su búfer (se pinta una vez)
const CAPAS = new Map();
const capa = (clave, dibuja) => { let b = CAPAS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); R.recorte(null); CAPAS.set(clave, b); } R.copiar(b); };
// tramado de Bayer 4×4 y degradado vertical tramado entre varios colores
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const deg = (x0, y0, x1, y1, cols) => { const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), r = f - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, r > bay(x, y) ? cols[i + 1] : cols[i]); } };
// las zonas que se quedan tranquilas: Atom y la barra del año
const tranquilo = (x, y) => (x >= 268 && y <= 50) || (x >= 14 && x <= 176 && y <= 24);
// nube de tres tonos (sombra, cuerpo, luz)
const nube3 = (cx, cy, w, c) => {
  const b = [[0, 0, 0.3], [-0.3, 0.06, 0.22], [0.3, 0.05, 0.24], [-0.1, -0.12, 0.24], [0.14, -0.09, 0.2], [0.46, 0.1, 0.14], [-0.46, 0.1, 0.13]];
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), Math.round(r * w), c[0]);
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), Math.round(r * w * 0.9), c[1]);
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), Math.round(r * w * 0.58), c[2]);
};
// copa redonda de árbol en racimos
const copa = (cx, cy, r, c, cl, cs, k0 = 0) => { for (let k = 0; k < 7; k++) { const a = hh(k, 1, k0) * 6.28, d = r * 0.55 * hh(k, 2, k0); R.disco(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d * 0.7 + 1), Math.round(r * 0.5), cs); }
  for (let k = 0; k < 7; k++) { const a = hh(k, 1, k0) * 6.28, d = r * 0.55 * hh(k, 2, k0); R.disco(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d * 0.7), Math.round(r * 0.45), c); }
  for (let k = 0; k < 5; k++) { const a = hh(k, 3, k0) * 3 + 3.4, d = r * 0.5 * hh(k, 4, k0); R.disco(Math.round(cx + Math.cos(a) * d - 1), Math.round(cy + Math.sin(a) * d * 0.7 - 2), Math.round(r * 0.22), cl); } };
// mata de hierba que se mece con el viento
const mata = (x, b, h, t, c, cl, k = 0, fuerza = 1) => { const m = Math.sin(t * 2.2 + x * 0.21 + k) * fuerza;
  for (let i = -2; i <= 2; i++) { const hh2 = h - Math.abs(i) * 1.4, tx = Math.round(x + i * 1.6 + m * hh2 * 0.25); R.linea(x + i, b, tx, Math.round(b - hh2), i % 2 ? cl : c); } };
// el brillo cálido de una luz sobre lo que hay (mezcla los píxeles de alrededor)
const resplandor = (cx, cy, r, c, a) => { if (a <= 0) return; for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const g = 1 - Math.hypot(x - cx, (y - cy) * 1.3) / r; if (g > 0 && !tranquilo(x, y)) R.pset(x, y, mez(R.pget(x, y), c, g * g * a)); } };
// veta de madera horizontal en un rectángulo (tablas con juntas, vetas onduladas y nudos)
const madera = (x0, y0, x1, y1, c, cl, cs, k0 = 0, tabla = 12) => {
  R.rect(x0, y0, x1, y1, c);
  for (let y = y0; y <= y1; y++) { const j = (y - y0) % tabla; if (j === 0) { R.linea(x0, y, x1, y, cs); continue; } if (j === 1) { R.linea(x0, y, x1, y, cl); continue; }
    for (let x = x0; x <= x1; x++) { const v = Math.sin(x * 0.045 + Math.floor((y - y0) / tabla) * 2.1 + Math.sin(x * 0.13 + k0) * 0.9 + j * 0.55); if (v > 0.93) R.pset(x, y, cs); else if (v < -0.96) R.pset(x, y, cl); } }
  for (let k = 0; k < Math.round((x1 - x0) * (y1 - y0) / 1600); k++) { const x = x0 + 6 + Math.floor(hh(k, 1, k0) * (x1 - x0 - 12)), y = y0 + 4 + Math.floor(hh(k, 2, k0) * (y1 - y0 - 8)); R.disco(x, y, 2, cs); R.pset(x, y, cl); R.linea(x - 6, y - 2, x - 3, y - 1, cs); R.linea(x + 3, y + 1, x + 6, y + 2, cs); } };
// estera tejida (tramado de cuadros en diagonal)
const estera = (x0, y0, x1, y1, c, cl, cs, paso = 4) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = Math.floor((x + y) / paso), b = Math.floor((x - y + 400) / paso), m = (a + b) % 2; const e = m ? (x + y) % paso : (x - y + 400) % paso;
  R.pset(x, y, e === 0 ? cs : e === 1 ? cl : c); } };
// el libro de tapas pardas cerrado, pequeño, en la mano de alguien (x, y: el centro)
const libroMano = (x, y, abierto = 0) => { x = Math.round(x); y = Math.round(y);
  if (abierto) { R.rect(x - 7, y - 4, x + 7, y + 2, K); R.rect(x - 6, y - 3, x - 1, y + 1, H('#efe6d0')); R.rect(x + 1, y - 3, x + 6, y + 1, H('#e4d8bc')); R.linea(x, y - 3, x, y + 2, H('#6a3a20'));
    for (const j of [-2, 0]) { R.linea(x - 5, y + j, x - 2, y + j, H('#8a7a62')); R.linea(x + 2, y + j, x + 5, y + j, H('#8a7a62')); } return; }
  R.rect(x - 4, y - 5, x + 4, y + 2, K); R.rect(x - 3, y - 4, x + 3, y + 1, H('#6a3a20')); R.linea(x - 3, y - 4, x - 3, y + 1, H('#8a5434')); R.linea(x + 3, y - 3, x + 3, y + 1, H('#efe6d0')); R.pset(x, y - 2, H('#c8a040')); };
// un destello pequeño de cuatro puntas
const destello = (x, y, c, r = 2) => { x = Math.round(x); y = Math.round(y); R.pset(x, y, c); for (let i = 1; i <= r; i++) { R.pset(x + i, y, c); R.pset(x - i, y, c); R.pset(x, y + i, c); R.pset(x, y - i, c); } };
'''

E['rk-lawson'] = ('Lawson', '''// RK-LAWSON (frase 27), hacia 1701, sin cartela. Tres planos (el orden lo manda la voz: el libro antes del fuego, porque
// los ojos grises llegan al final):
// 1. el pueblo de Hatteras al atardecer: John Lawson llega por la arena con su libro bajo el brazo; un vecino se levanta
//    del tronco y sale a recibirlo, un niño corre a mirar y una mujer se vuelve desde la estera; en «John Lawson» él
//    levanta el libro y saluda (corta en «Hatteras»);
// 2. inserto: su libro abierto sobre un arcón, junto a la vela, el cuerno de tinta y el sombrero; la mano con la pluma
//    dibuja (sin letras), en columna, el barco y las figuritas con sombrero de los antepasados («ancestors… white») y
//    una figurita con un libro abierto del que salen rayitas («could talk in a book»); la vela tiembla, luciérnagas fuera;
// 3. de noche, junto al fuego: el anciano habla con las manos, Lawson escucha con el libro abierto y un niño lo mira por
//    encima; en «gray eyes» los ojos grises brillan a la luz del fuego (la mujer sentada, el niño y la muchacha), y
//    Lawson se sorprende y anota.''', COMUN + r'''
const S = (s) => en('lawson', (s - 0.5) / 13.427);
const P2 = S(6.16), P3 = S(10.9);
const LATER = S(2.96), EXPLORER = S(3.86), JOHN = S(4.26), LAWSON = S(4.62), PEOPLE = S(5.74);
const ANCESTORS = S(7.88), WHITE = S(8.82), TALK = S(9.82), BOOK = S(10.4), ADDED = S(11.32), GRAY = S(11.8), COMMON = S(12.96);
const AÑO = 1701;
// ── 1 · el pueblo de Hatteras al atardecer: llega Lawson ──────────────────────────────────────────────────────────────
const l1 = (t) => {
  const o = { encuadre: 'lawson' };
  const g = T.pueblo(R, t, o);
  // pelícanos que pasan en fila sobre el mar, despacio (por debajo de la barra del año)
  for (let k = 0; k < 4; k++) { const x = Math.round(330 - (t * 9 + k * 12) % 420 + k * 3), y = 58 + k * 2 + Math.round(Math.sin(t * 2 + k) * 1); if (x > 258 && y < 50) continue;
    const a = Math.sin(t * 5 + k) > 0.3; R.linea(x - 4, y - (a ? 2 : 0), x, y, H('#3a2a30')); R.linea(x, y, x + 4, y - (a ? 2 : 0), H('#3a2a30')); R.pset(x - 1, y + 1, H('#3a2a30')); R.pset(x - 2, y + 1, H('#c89048')); }
  // Lawson llega por la arena desde la izquierda, con el libro; se para, lo levanta y saluda
  const u = ease(tramo(t, 0.25, JOHN - 0.1)), lx = Math.round(lerp(-20, 62, u)), anda = u > 0 && u < 1;
  const levanta = tramo(t, JOHN, LAWSON) > 0;
  const law = R.actor(EL.lawsonRK, lx, g.suelo, t, { dir: 1, anda, sostiene: levanta ? [lx + 19, g.suelo - 26] : true, sonrisa: t > EXPLORER, habla: t > LAWSON + 0.2 && Math.sin(t * 8) > 0 && t < PEOPLE - 0.2 });
  if (lx > -6) libroMano(law.mano[0] + 1, law.mano[1] + (levanta ? -2 : 1));
  // el vecino estaba sentado en el tronco: se levanta y sale a recibirlo; en «explorer» le saluda y señala el tronco
  const v = ease(tramo(t, LATER - 0.2, EXPLORER + 0.5)), cx = Math.round(lerp(126, 88, v));
  R.actor(EL.croatoanRK, cx, g.suelo, t, { dir: -1, anda: v > 0 && v < 1, dedo: t > LAWSON && t < PEOPLE + 0.2, sonrisa: t > EXPLORER, habla: t > JOHN && t < LAWSON && Math.sin(t * 9) > 0, salto: t < LATER - 0.2 ? 0 : 0 });
  // un niño corre desde la estera a ver al forastero, se para y mira el libro con sorpresa
  const w = tramo(t, 1.2, JOHN), nx = Math.round(lerp(204, 112, ease(w)));
  R.actor(EL.ninoCroatoanRK, nx, g.suelo, t, { dir: -1, anda: w > 0 && w < 1, sorpresa: t > LAWSON - 0.2 && t < LAWSON + 1.2, sonrisa: t > LAWSON + 1.2 });
  // la mujer de la estera teje una nasa; al llegar él se vuelve y sonríe
  const vuelve = t > EXPLORER + 0.3;
  const m = R.actor(EL.croatoanaRK, 232, g.suelo, t, { dir: vuelve ? -1 : 1, sostiene: true, sonrisa: vuelve });
  { const [mx, my] = m.mano, d = vuelve ? -1 : 1; for (let j = 0; j < 6; j++) R.linea(mx + d * j, my - 2 + (j % 2), mx + d * j, my + 4, j % 2 ? H('#c8a860') : H('#9a7e40')); R.linea(mx, my + 1, mx + d * 6, my + 1, H('#6a5428')); }
  // huellas que deja Lawson en la arena
  for (let k = 0; k < 8; k++) { const fx = Math.round(lerp(-20, 62, ease(tramo(t, 0.25 + k * 0.3, 0.55 + k * 0.3))) * 0 + (-10 + k * 9)); if (fx < lx - 2 && fx > 0) { R.pset(fx + 5, g.suelo + 2 + (k % 2), H('#b8946a')); R.pset(fx + 6, g.suelo + 2 + (k % 2), H('#b8946a')); } }
  T.puebloDelante(R, t, o);
};
// ── 2 · inserto: el libro de Lawson sobre el arcón, con la vela; la pluma dibuja ──────────────────────────────────────
const LIB = { x0: 122, y0: 82, x1: 302, y1: 162, lomo: 212 };
// los dibujos de la página derecha: trazos [x0, y0, x1, y1] y el instante en que la pluma los acaba
const TRAZOS = (() => { const L = [];
  // el barco (casco, palo, vela cuadrada y banderita) — «ancestors»
  const b = [[256, 108, 284, 108], [284, 108, 280, 113], [280, 113, 260, 113], [260, 113, 256, 108], [270, 108, 270, 92], [263, 94, 277, 94], [277, 94, 277, 104], [277, 104, 263, 104], [263, 104, 263, 94], [270, 92, 275, 90]];
  // tres figuritas con sombrero de ala — «white»
  const f = []; for (const x of [260, 271, 282]) f.push([x - 3, 119, x + 3, 119], [x - 2, 118, x + 2, 118], [x, 121, x, 123], [x, 123, x, 131], [x - 3, 126, x + 3, 126], [x, 131, x - 2, 136], [x, 131, x + 2, 136]);
  // una figurita que sostiene un libro abierto, con rayitas que salen de él — «talk in a book»
  const p = [[256, 140, 256, 143], [256, 144, 256, 153], [256, 153, 253, 159], [256, 153, 259, 159], [256, 147, 265, 147], [264, 143, 270, 145], [270, 145, 276, 143], [264, 143, 264, 149], [276, 143, 276, 149], [264, 149, 270, 151], [270, 151, 276, 149], [270, 145, 270, 151],
    [280, 140, 286, 137], [281, 145, 289, 145], [280, 150, 286, 153]];
  const reparte = (lista, a, z) => lista.forEach((s, i) => L.push([...s, lerp(a, z, (i + 1) / lista.length)]));
  reparte(b, ANCESTORS - 0.6, WHITE - 0.1); reparte(f, WHITE - 0.1, TALK - 0.2); reparte(p, TALK - 0.2, BOOK + 0.3);
  return L; })();
const l2 = (t) => {
  capa('l2', () => {
    // la pared de esteras de la casa, con su trama y la luz cálida, y la puerta enrollada que da al atardecer
    estera(0, 0, 319, 74, H('#8a6a44'), H('#a8845a'), H('#5a4228'), 5);
    for (let x = 0; x < 320; x += 38) { R.rect(x, 0, x + 2, 74, H('#4a3420')); R.linea(x + 1, 0, x + 1, 74, H('#6a4c30')); }
    // el hueco de la puerta (recortado) con el cielo de la tarde, el mar y la duna
    R.recorte([186, 6, 252, 70]);
    deg(186, 6, 252, 50, [H('#f0b878'), H('#e89868'), H('#c87060'), H('#8a5a70')]);
    for (let y = 50; y <= 60; y++) for (let x = 186; x <= 252; x++) R.pset(x, y, (x + y) % 3 ? H('#4a3a58') : H('#6a4a60'));
    for (let x = 200; x <= 236; x += 2) R.pset(x, 52 + (x % 3), H('#f8d0a0'));
    R.poligono([[186, 70], [186, 60], [210, 57], [236, 61], [252, 58], [252, 70]], H('#c89a68'));
    for (let x = 188; x < 252; x += 5) { R.linea(x, 61, x + 2, 57 + (x % 3), H('#6a7a3a')); }
    R.recorte(null);
    R.rect(184, 4, 185, 72, H('#3a2814')); R.rect(253, 4, 254, 72, H('#3a2814'));
    for (let x = 184; x <= 254; x++) { const y = 4 + Math.round(Math.sin((x - 184) / 70 * 3.14) * -2); R.rect(x, y - 2, x, y + 3, (x % 4) < 2 ? H('#a8845a') : H('#7a5a3a')); }
    // la esquina de arriba a la derecha (la de Atom), en penumbra y tranquila
    for (let y = 0; y <= 74; y++) for (let x = 256; x < 320; x++) { const f = Math.min(1, (x - 256) / 20) * (1 - Math.max(0, y - 50) / 24); if (f > 0) R.pset(x, y, mez(R.pget(x, y), H('#3a2818'), 0.75 * f)); }
    // la sombra del alero arriba (tranquila bajo la barra del año)
    for (let y = 0; y < 26; y++) for (let x = 0; x < 320; x++) { const f = 1 - y / 26; R.pset(x, y, mez(R.pget(x, y), H('#3a2818'), 0.78 * f)); }
    // colgados de la pared: una ristra de mazorcas y una red
    for (let k = 0; k < 4; k++) { const x = 40 + k * 7, y = 32 + k * 8; R.disco(x, y, 3, H('#b8902a')); R.rect(x - 2, y - 4, x + 2, y + 4, H('#d8b840')); for (let j = -3; j < 4; j += 2) R.pset(x - 1, y + j, H('#a8801a')); R.linea(x + 2, y - 4, x + 5, y - 7, H('#c8b080')); }
    R.linea(46, 24, 44, 60, H('#6a5030'));
    for (let i = 0; i < 9; i++) for (let j = 0; j < 7; j++) { const x = 100 + i * 6 + Math.round(j * 0.6), y = 30 + j * 6 + Math.round(Math.sin(i) * 1); R.pset(x, y, H('#d8c8a0')); R.linea(x, y, x + 6, y, H('#b8a880')); R.linea(x, y, x + 1, y + 6, H('#b8a880')); }
    R.linea(98, 28, 156, 28, H('#5a4228')); for (const x of [102, 128, 152]) R.disco(x, 72, 2, H('#c8c0a8'));
    // el arcón de madera que hace de mesa (tablas, juntas, vetas y herrajes)
    madera(0, 75, 319, 179, H('#7a5434'), H('#9a7048'), H('#4e3420'), 3, 15);
    R.rect(0, 75, 319, 77, H('#3a2414')); R.linea(0, 78, 319, 78, H('#b08458'));
    for (const x of [20, 300]) { R.rect(x - 4, 79, x + 4, 179, H('#4a4440')); R.linea(x - 4, 79, x - 4, 179, H('#6a6460')); for (let y = 86; y < 180; y += 18) { R.disco(x, y, 1, H('#9a948a')); } }
    // el cuerno de tinta, la vela en su palmatoria, el sombrero de tres picos y un cuenco de conchas que le regalaron
    R.poligono([[4, 128], [58, 124], [52, 142], [12, 144]], K); R.poligono([[6, 129], [56, 126], [50, 140], [13, 142]], H('#2a2428'));
    R.poligono([[18, 132], [42, 130], [40, 138], [22, 139]], H('#3a3238')); R.linea(8, 130, 54, 127, H('#c8a040'));
    R.poligono([[30, 154], [62, 144], [66, 152], [36, 164]], K); R.poligono([[32, 154], [61, 146], [64, 151], [36, 161]], H('#d8c8a0')); R.linea(34, 155, 60, 147, H('#f0e6d0')); R.disco(64, 149, 3, K); R.disco(64, 149, 2, H('#1a1418'));
    R.disco(48, 106, 11, K); R.disco(48, 106, 10, H('#a07a3a')); R.disco(48, 105, 7, H('#c89a48')); R.rect(44, 76, 52, 104, K); R.rect(45, 77, 51, 104, H('#efe4c8')); R.linea(45, 77, 45, 104, BL); R.rect(50, 80, 51, 104, H('#d8c8a8'));
    R.linea(57, 108, 64, 112, K); R.disco(65, 113, 3, K); R.disco(65, 113, 2, H('#a07a3a'));
    R.disco(96, 176, 14, K); R.disco(96, 176, 13, H('#8a5a34')); R.disco(96, 174, 10, H('#5a3a20'));
    for (const [x, y] of [[90, 172], [98, 170], [102, 176], [93, 177]]) { R.disco(x, y, 2, H('#e8dcc8')); R.pset(x - 1, y - 1, BL); }
    // una pipa de barro sobre el arcón
    R.linea(70, 168, 104, 156, K); R.linea(70, 167, 104, 155, H('#e8e0d0')); R.disco(106, 154, 3, K); R.disco(106, 154, 2, H('#e8e0d0'));
    // el libro abierto: tapas, páginas con su curva, el lomo y la cinta roja
    const { x0, y0, x1, y1, lomo } = LIB;
    R.rect(x0 - 4, y0 - 3, x1 + 4, y1 + 5, K); R.rect(x0 - 3, y0 - 2, x1 + 3, y1 + 4, H('#5a2e18'));
    R.rect(x0 - 1, y0 + 2, x1 + 2, y1 + 3, H('#c8b898'));
    for (let x = x0; x <= x1; x++) { const d = Math.abs(x - lomo) / (lomo - x0), sub = Math.round((1 - Math.min(1, d)) ** 3 * 4); for (let y = y0 - sub; y <= y1 - sub; y++) R.pset(x, y, x < lomo ? (x < lomo - 6 ? H('#efe6d0') : H('#d8ccb0')) : (x > lomo + 6 ? H('#f2ead6') : H('#dcd0b4'))); }
    R.linea(lomo, y0 - 4, lomo, y1 - 4, H('#a89878'));
    for (let y = y0 + 4; y < y1 - 4; y += 2) R.pset(x0, y, H('#d0c4a4'));
    // la página izquierda, escrita: renglones de rayas (sin letras)
    for (let r = 0; r < 13; r++) { const y = y0 + 8 + r * 5; let x = x0 + 8; while (x < lomo - 10) { const l = 3 + Math.floor(hh(r, x, 3) * 9); R.linea(x, y, Math.min(lomo - 10, x + l), y, H('#4a3a2a')); if (hh(x, r, 5) > 0.7) R.pset(x + 1, y - 1, H('#4a3a2a')); x += l + 3; } }
    R.rect(x0 + 8, y0 + 6, x0 + 12, y0 + 12, H('#8a2a20'));
    R.poligono([[lomo - 2, y1 - 2], [lomo + 2, y1 - 2], [lomo + 4, y1 + 14], [lomo, y1 + 10], [lomo - 3, y1 + 14]], H('#b8303a'));
    // la página derecha: dos renglones arriba y el resto en blanco para los dibujos
    for (let y = y0 + 8; y < y1 - 6; y += 5) { let x = lomo + 10; while (x < 246) { const l = 3 + Math.floor(hh(y, x, 7) * 8); R.linea(x, y, Math.min(246, x + l), y, H('#4a3a2a')); x += l + 3; } }
  });
  // la luz de la vela: la llama tiembla y calienta lo de alrededor
  const fl = 0.8 + Math.sin(t * 13) * 0.1 + Math.sin(t * 29) * 0.08;
  resplandor(48, 74, 70, H('#ffc870'), 0.35 * fl);
  const ly = 76, lx = 48 + Math.round(Math.sin(t * 7) * 1);
  R.poligono([[lx - 3, ly], [lx + 3, ly], [lx + 1, ly - 9 - Math.round(fl * 2)], [lx, ly - 10 - Math.round(fl * 2)]], H('#f8a030')); R.poligono([[lx - 1, ly], [lx + 1, ly], [lx, ly - 6]], H('#fff4b0')); R.pset(48, ly + 1, K);
  // la polilla que ronda la vela
  // las luciérnagas que se encienden fuera, por la puerta
  R.recorte([186, 6, 252, 70]); for (let k = 0; k < 5; k++) { const x = Math.round(194 + hh(k, 1, 12) * 52 + Math.sin(t * 0.9 + k) * 5), y = Math.round(40 + hh(k, 2, 12) * 26 + Math.cos(t * 0.7 + k * 2) * 3), on = Math.sin(t * 2.3 + k * 1.9) > 0.4; if (on) { R.pset(x, y, H('#f8f080')); R.pset(x + 1, y, H('#c8d040')); R.pset(x, y - 1, H('#a8b040')); } } R.recorte(null);
  // las nubes de la tarde que pasan por la puerta
  R.recorte([186, 6, 252, 48]);
  for (const [x0, y, w, v] of [[190, 22, 20, 2.2], [236, 34, 14, 1.4]]) { const x = 186 + ((x0 - 186 + (t - P2) * v * 3) % 90); for (let i = 0; i < w; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2 === 0 || j === 1) R.pset(Math.round(x + i - j), y + j, j < 2 ? H('#f8d8b0') : H('#d89a80')); }
  for (let k = 0; k < 2; k++) { const x = Math.round(256 - ((t - P2) * 7 + k * 30) % 74), y = 30 + k * 6, a = Math.sin(t * 8 + k) > 0; R.pset(x, y, K); R.pset(x - 1, y - (a ? 1 : 0), K); R.pset(x + 1, y - (a ? 1 : 0), K); }
  R.recorte(null);
  // lo que la pluma ya ha dibujado
  const tinta = H('#2a1e18');
  let tip = [262, 100];
  for (const [x0, y0, x1, y1, fin] of TRAZOS) { const dur = 0.16, u = tramo(t, fin - dur, fin); if (u <= 0) break; const ex = lerp(x0, x1, u), ey = lerp(y0, y1, u); R.linea(x0, y0, Math.round(ex), Math.round(ey), tinta); tip = [ex, ey]; }
  // la hoja de la derecha se levanta un poco con la corriente de aire
  { const lev = Math.max(0, Math.sin(t * 1.7)) * 3; if (lev > 0.5) { const x = LIB.x1, y = LIB.y1; R.poligono([[x - 12, y], [x, y - 12], [x + 1, y - 12 - lev], [x - 12 - lev, y - 1]], H('#e4dac2')); R.linea(x - 12, y, x, y - 12, H('#c8bca0')); } }
  // la mano de Lawson con la pluma: entra por abajo a la derecha (manga azul con puño blanco)
  const llega = ease(tramo(t, P2, ANCESTORS - 0.7)), sale = ease(tramo(t, BOOK + 0.35, P3 - 0.05));
  const tx = lerp(lerp(330, tip[0], llega), 330, sale), ty = lerp(lerp(120, tip[1], llega), 120, sale);
  if (tx < 326) {
    const wx = Math.round(tx + 19), wy = Math.round(ty - 3);
    T.brazo(R, 346, wy + 14, wx, wy, '#2a3a5a', -1, { puno: '#f2eee2' });
    // la pluma: el cañón que sale de entre los dedos hasta la punta, y la barba blanca arriba
    const px = Math.round(tx), py = Math.round(ty);
    R.linea(px, py, px + 14, py - 18, K); R.linea(px + 1, py, px + 15, py - 18, H('#d8d0c0'));
    R.poligono([[px + 8, py - 9], [px + 22, py - 30], [px + 24, py - 26], [px + 13, py - 10]], H('#f6f2ea')); R.linea(px + 9, py - 10, px + 22, py - 29, H('#b8b0a0'));
    R.pset(px, py, tinta);
  }
};
// ── 3 · de noche, junto al fuego: los ojos grises ─────────────────────────────────────────────────────────────────────
const l3 = (t) => {
  const o = { encuadre: 'lawson', camara: 'fuego', libro: false, ojos: tramo(t, GRAY - 0.1, GRAY + 0.5) };
  const g = T.pueblo(R, t, o);
  // Lawson, con el libro abierto, escucha; en «gray eyes» se sorprende y luego anota sonriendo
  const law = R.actor(EL.lawsonRK, 84, g.suelo, t, { dir: 1, sostiene: [104, g.suelo - 18], sorpresa: t > GRAY + 0.1 && t < COMMON, sonrisa: t > COMMON });
  libroMano(law.mano[0] + 2, law.mano[1], 1);
  if (t > COMMON + 0.2) { const k = Math.floor(t * 6) % 3; R.pset(law.mano[0] + 4 + k, law.mano[1] - 2, H('#2a1e18')); }
  // el niño mira el libro por encima, de puntillas
  const nino = R.actor(EL.ninoCroatoanRK, 64, g.suelo, t, { dir: 1, salto: Math.sin(t * 3) > 0.6 ? 1 : 0, sonrisa: t > ADDED });
  // el anciano cuenta, con las manos; la muchacha escucha a su lado
  const an = R.actor(EL.croatoanRK, 202, g.suelo, t, { dir: -1, habla: t < COMMON + 0.6 && Math.sin(t * 9) > -0.2, dedo: t > ADDED - 0.3 && t < GRAY + 0.8, sonrisa: t > COMMON });
  const mu = R.actor(EL.croatoanaRK, 222, g.suelo, t, { dir: -1, sonrisa: t > GRAY + 0.4 });
  // los ojos grises: un destello claro en los ojos del niño y de la muchacha, uno tras otro
  const gris = H('#c8d0d8');
  for (const [a, d, t0] of [[nino.cabeza, 1, GRAY + 0.35], [mu.cabeza, -1, GRAY + 0.6]]) { const u = tramo(t, t0, t0 + 0.25); if (u <= 0) continue;
    const ex = a[0] + (d > 0 ? 3 : -3), ey = a[1] + 6;
    if (t < t0 + 1.2) destello(ex + d, ey - 3, H('#e8f0f8'), 1 + Math.round(u * 2)); }
  // el anciano lo dice: un bocadillo con un ojo de iris gris
  { const u = tramo(t, GRAY - 0.15, GRAY + 0.15), fuera = tramo(t, COMMON + 0.8, COMMON + 1.1); if (u > 0 && fuera < 1) { const s = u * (1 - fuera), bx = 196, by = 112, w = Math.round(17 * s), h = Math.round(11 * s);
    R.rect(bx - w - 1, by - h - 1, bx + w + 1, by + h + 1, K); R.rect(bx - w, by - h, bx + w, by + h, BL); R.pset(bx - w, by - h, K); R.pset(bx + w, by - h, K); R.pset(bx - w, by + h, K); R.pset(bx + w, by + h, K);
    R.poligono([[bx + 4, by + h], [bx + 10, by + h], [bx + 12, by + h + 6]], K); R.poligono([[bx + 5, by + h], [bx + 9, by + h], [bx + 11, by + h + 4]], BL);
    if (s > 0.8) { for (let i = -12; i <= 12; i++) { const yy = Math.round(Math.sqrt(Math.max(0, 1 - (i / 12) ** 2)) * 6); R.pset(bx + i, by - yy, K); R.pset(bx + i, by + yy, K); }
      R.disco(bx, by, 5, H('#8a96a2')); R.disco(bx, by, 4, H('#a8b4c0')); R.disco(bx, by, 2, K); R.pset(bx - 2, by - 2, BL); R.pset(bx - 1, by - 2, BL);
      const pa = (t * 1.3) % 3 < 0.12; if (pa) for (let i = -12; i <= 12; i++) R.pset(bx + i, by, K); } } }
  T.puebloDelante(R, t, o);
};
const año = (t) => AÑO;
const efectos = [[0.4, 'ola'], [ANCESTORS - 0.5, 'lapiz'], [TALK - 0.15, 'lapiz'], [GRAY, 'brillo']];
T.rodar(E, R, [[0, l1], [P2, l2], [P3, l3]], { efectos, año });
''')

E['rk-objeto'] = ('Objeto', '''// RK-OBJETO (frases 28–30), sin cartela. Diez planos:
// 1. inserto: una espada inglesa sobre una estera, dentro de una casa de Croatoan, de día: un rayo de sol la barre, un
//    pavo pasa por la puerta; «?» en «proves», banderita de San Jorge en «English» y casita de esteras en «village»;
// 2. la mesa del estudio: la balanza cae del lado de la espadita («an Englishman lived there»); el guante trae la
//    mazorca y la pone en el otro platillo en «corn»: la balanza se equilibra (un trueque, bocadillo de ida y vuelta);
// 3. una fila de gente, cada uno delante de su casa (esteras, la casita inglesa, el secadero, el muelle): la espadita
//    salta de mano en mano («from hand to hand»); ellos se quedan («people don't») y al guante de Atom le llega… un
//    calcetín (gag); «?» en «doubts»;
// 4. inserto: la revista científica en el escritorio; las hojas pasan, la página queda en blanco y el guante le pone un
//    sello rojo «?» en «journal»; humea el café y brillan las escamas de la placa;
// 5. la excavación de Hatteras, con la criba parada: la arqueóloga enseña el frasquito de escamas; otra arqueóloga pide
//    ver la fragua (bocadillo con yunque y fuego, «?») y no se convence («X»); en «Neither on Hatteras» miran la cata;
// 6. el Sitio X: la arqueóloga levanta un tiesto y lo mira; bocadillo con una etiqueta con nombre tachada (X) en
//    «name»; el voluntario niega con la cabeza;
// 7. inserto: el banco de ADN: la tabla de bandas de colores, la doble hélice que gira, dos retratos (uno de hoy y un
//    colono); un hilo rojo los va a unir en «linked»… y se queda corto: «?» grande en «specific colonist»;
// 8. Jamestown de lejos (1608), el fuerte triangular junto al río: sube un bocadillo de tiza con el rumor (figuritas y
//    una nube con rayo, sin nada morboso) y el guante lo borra en «never confirmed»;
// 9. 1937, un camino junto al río entre robles con musgo: un visitante levanta una piedra con rayas talladas en
//    «turned up»; su mujer baja del coche y se sorprende; brillan las rayas en «messages»;
// 10. la balda con las piedras: se llenan de florituras («messages from Eleanor Dare»); el guante da un golpecito a
//    la última y se parte en «hoax»: dentro es yeso.''', COMUN + r'''
const O = (s) => en('objeto', (s - 0.9) / 12.247), D = (s) => en('dudas', (s - 13.789) / 18.939), Q = (s) => en('piedras', (s - 33.228) / 15.951);
const W = (s) => s < 13.4 ? O(s) : s < 33.0 ? D(s) : Q(s);
const P2 = W(5.39), P3 = W(10.6), P4 = W(14.71), P5 = W(19.49), P6 = W(24.38), P7 = W(28.64), P8 = W(33.85), P9 = W(40.9), P10 = W(45.12);
// un bocadillo blanco con borde, que crece (u 0–1), con la cola hacia (tx, ty); dentro, lo que pinte dibuja(cx, cy)
const burbuja = (cx, cy, w, h, tx, ty, u, dibuja) => { if (u <= 0) return; const s = Math.min(1, u), W2 = Math.round(w * s), H2 = Math.round(h * s);
  const tx2 = Math.round(lerp(cx, tx, s)), ty2 = Math.round(lerp(cy + H2, ty, s)); R.poligono([[cx - 4, cy + H2 - 1], [cx + 4, cy + H2 - 1], [tx2, ty2]], K); R.poligono([[cx - 3, cy + H2 - 2], [cx + 3, cy + H2 - 2], [Math.round(lerp(cx, tx2, 0.85)), Math.round(lerp(cy + H2, ty2, 0.85))]], BL);
  R.rect(cx - W2 - 1, cy - H2, cx + W2 + 1, cy + H2, K); R.rect(cx - W2, cy - H2 - 1, cx + W2, cy + H2 + 1, K); R.rect(cx - W2, cy - H2 + 1, cx + W2, cy + H2 - 1, BL); R.rect(cx - W2 + 1, cy - H2, cx + W2 - 1, cy + H2, BL);
  R.linea(cx - W2 + 1, cy + H2, cx + W2 - 1, cy + H2, H('#d8d4cc'));
  if (s >= 0.95) dibuja(cx, cy); };
const preg = (x, y, c = H('#c8303a'), esc = 2) => R.icono('?', Math.round(x), Math.round(y), c, K, esc);
// la espadita (pequeña, en la mano de un personaje): hoja, guarda y pomo
const espadita = (x, y, d = 1, ang = 0) => { x = Math.round(x); y = Math.round(y); const ex = x + Math.round(d * 13 * Math.cos(ang)), ey = y - Math.round(13 * Math.sin(ang));
  R.linea(x, y + 1, ex, ey + 1, K); R.linea(x, y, ex, ey, H('#d8e0e8')); R.linea(x - d, y - 1, x - d * 4, y - 1, K);
  R.rect(x - 1, y - 3, x + 1, y + 3, K); R.linea(x, y - 2, x, y + 2, H('#c8a040')); R.pset(x - d * 4, y - 1, H('#c8a040')); R.pset(x - d * 5, y - 1, H('#8a6a2a')); };
// el calcetín del gag (blanco con rayas rojas)
const calcetin = (x, y, ang = 0) => { x = Math.round(x); y = Math.round(y);
  R.poligono([[x - 3, y - 8], [x + 3, y - 8], [x + 3, y + 2], [x + 8, y + 3], [x + 8, y + 7], [x - 3, y + 7]], K);
  R.poligono([[x - 2, y - 7], [x + 2, y - 7], [x + 2, y + 3], [x + 7, y + 4], [x + 7, y + 6], [x - 2, y + 6]], BL);
  for (const j of [-5, -2]) R.linea(x - 2, y + j, x + 2, y + j, H('#c8303a')); R.rect(x + 4, y + 4, x + 7, y + 6, H('#c8303a')); };
// la mazorca pequeña (para la balanza y la mano)
const mazorca = (x, y) => { x = Math.round(x); y = Math.round(y); R.disco(x, y, 4, K); R.rect(x - 7, y - 3, x + 5, y + 3, K); R.rect(x - 6, y - 2, x + 4, y + 2, H('#e0c040'));
  for (let i = -5; i <= 3; i += 2) { R.pset(x + i, y - 1, H('#b8901a')); R.pset(x + i + 1, y + 1, H('#b8901a')); } R.poligono([[x + 3, y - 3], [x + 10, y - 6], [x + 6, y], [x + 10, y + 5], [x + 3, y + 3]], H('#6a9a3a')); R.linea(x + 4, y, x + 9, y - 4, H('#8aba4a')); };
// el guante de Atom (la mano canónica, sin manga) que viene de su esquina
const guante = (x, y, d = -1) => T.mano(R, Math.round(x), Math.round(y), d, GUANTE, { sinManga: true });
// cielo tramado de día con nubes de tres tonos que pasan a tres velocidades y pájaros
const cieloDia = (t, t0, y1, cols, nubesL) => { deg(0, 0, 319, y1, cols); };
const nubesDia = (t, t0, lista) => { for (const [x0, y, w, v, c] of lista) { const x = Math.round(x0 + (t - t0) * v); if (x > 250 && y < 56) continue; nube3(x, y, w, c); } };
const pajaros = (t, n, y0, k0, c = K) => { for (let k = 0; k < n; k++) { const x = Math.round((hh(k, 1, k0) * 300 + t * (8 + k * 2)) % 340) - 10, y = y0 + Math.round(hh(k, 2, k0) * 20 + Math.sin(t + k) * 2); if (tranquilo(x, y)) continue; const a = Math.sin(t * 8 + k * 2) > 0;
  R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : 0), c); R.pset(x + 2, y - (a ? 2 : 0), c); } };
const NUB = [H('#b8c8d8'), H('#e0e8f0'), H('#ffffff')];

// ── 1 · inserto: la espada inglesa sobre la estera, en una casa de Croatoan ─────────────────────────────────────────
const PROVES = W(2.24), ENGLISH = W(3.35), SWORD = W(3.67), VILLAGE = W(4.39);
const ESP = { x0: 64, y0: 152, x1: 236, y1: 104 };
const o1 = (t) => {
  capa('o1', () => {
    // la pared de cortezas de la casa larga: placas verticales con vetas, varas curvas que hacen el arco
    for (let x = 0; x < 320; x++) { const pl = Math.floor(x / 22), c = [H('#7a5a3a'), H('#6a4c30'), H('#82603e')][pl % 3]; for (let y = 0; y <= 78; y++) { const v = hh(x >> 1, y >> 3, pl) > 0.82; R.pset(x, y, x % 22 === 0 ? H('#3a2814') : v ? H('#5a3e24') : (x + y * 3) % 17 === 0 ? H('#9a7650') : c); } }
    for (const yb of [10, 34, 58]) { R.rect(0, yb, 319, yb + 2, H('#4a3420')); R.linea(0, yb, 319, yb, H('#8a6a44')); for (let x = 6; x < 320; x += 22) { R.rect(x, yb - 1, x + 2, yb + 3, H('#c8b078')); R.pset(x + 1, yb + 1, H('#8a7040')); } }
    // la puerta (a la izquierda): fuera, el sol, el maíz alto, un girasol y otra casa a lo lejos
    R.recorte([10, 28, 74, 96]);
    deg(10, 28, 74, 64, [H('#8ac0e8'), H('#a8d4f0'), H('#d8ecf4')]);
    R.poligono([[10, 62], [30, 52], [52, 50], [74, 56], [74, 70], [10, 70]], H('#a88a5a')); for (let x = 30; x < 52; x += 4) R.linea(x, 50 + (x % 3), x + 2, 58, H('#7a6040'));
    for (let x = 10; x <= 74; x += 3) { const h2 = 24 + Math.floor(hh(x, 1, 41) * 10); R.linea(x, 96, x + 1, 96 - h2, H('#4a7a32')); R.linea(x + 1, 96 - h2 + 6, x + 4, 96 - h2 + 2, H('#6a9a3a')); R.pset(x + 1, 96 - h2 - 1, H('#d8b840')); if (x % 9 === 1) R.rect(x + 2, 96 - h2 + 10, x + 3, 96 - h2 + 14, H('#e0c040')); }
    R.linea(60, 96, 60, 52, H('#4a7a32')); R.disco(60, 50, 5, H('#e8b020')); R.disco(60, 50, 2, H('#5a3a14'));
    for (let y = 70; y <= 96; y++) for (let x = 10; x <= 74; x++) if ((x * 7 + y * 3) % 11 === 0) R.pset(x, y, H('#c8a868'));
    R.recorte(null);
    R.rect(6, 26, 9, 98, H('#3a2814')); R.rect(75, 26, 78, 98, H('#3a2814')); R.linea(7, 26, 7, 98, H('#6a4c30'));
    for (let x = 6; x <= 78; x++) R.rect(x, 22, x, 28 + Math.round(Math.sin(x * 0.6) * 1), (x % 4) < 2 ? H('#a8845a') : H('#7a5a3a'));
    // la sombra del techo arriba (tranquila bajo la barra del año) y la esquina de Atom, en penumbra
    for (let y = 0; y < 26; y++) for (let x = 0; x < 320; x++) { const f = 1 - y / 26; R.pset(x, y, mez(R.pget(x, y), H('#2a1c10'), 0.78 * f)); }
    for (let y = 0; y <= 60; y++) for (let x = 250; x < 320; x++) { const f = Math.min(1, (x - 250) / 24) * (1 - Math.max(0, y - 40) / 20); if (f > 0) R.pset(x, y, mez(R.pget(x, y), H('#2a1c10'), 0.7 * f)); }
    // el suelo de arena apisonada y la estera grande tejida, con su orla
    for (let y = 79; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x, y, 9) > 0.9 ? H('#a88a60') : hh(x, y, 8) > 0.86 ? H('#d8c098') : H('#c4a678'));
    R.rect(0, 79, 319, 80, H('#5a4228'));
    estera(26, 92, 300, 176, H('#c8a86a'), H('#e0c48a'), H('#9a7e48'), 5);
    for (const [a, b] of [[24, 25], [301, 302]]) R.rect(a, 92, b, 176, H('#6a5028')); R.rect(24, 90, 302, 91, H('#6a5028')); R.rect(24, 177, 302, 178, H('#6a5028'));
    for (let x = 28; x < 300; x += 6) { R.pset(x, 91, H('#b84a2a')); R.pset(x + 3, 177, H('#b84a2a')); }
    // la olla de barro con granos de maíz, con su raya incisa, y un calabacino
    R.disco(276, 136, 22, K); R.disco(276, 136, 21, H('#9a6a44')); R.disco(272, 131, 14, H('#b07a50')); R.rect(258, 112, 294, 118, K); R.rect(259, 113, 293, 117, H('#8a5a38'));
    for (let x = 260; x < 293; x += 2) { R.pset(x, 115, H('#e0c040')); R.pset(x + 1, 114, H('#c8a030')); }
    for (let i = 0; i < 24; i++) { const a = i / 24 * 3.14, x = Math.round(276 - Math.cos(a) * 19), y = 132 + Math.round(Math.sin(i * 1.3) * 2); R.pset(x, y, H('#5a3a20')); }
    R.disco(240, 160, 8, K); R.disco(240, 160, 7, H('#c8a040')); R.disco(238, 158, 3, H('#e8c860')); R.linea(246, 156, 260, 146, K); R.linea(246, 155, 260, 145, H('#a8802a'));
    // un cesto de conchas y una sarta de cuentas de concha
    R.disco(46, 156, 15, K); R.disco(46, 156, 14, H('#a88040')); for (let a = 0; a < 6.28; a += 0.4) R.pset(Math.round(46 + Math.cos(a) * 12), Math.round(156 + Math.sin(a) * 12), H('#7a5a28'));
    for (let a = 0; a < 6.28; a += 0.8) for (let r = 4; r < 12; r += 4) R.pset(Math.round(46 + Math.cos(a + r) * r), Math.round(156 + Math.sin(a + r) * r), H('#7a5a28'));
    for (const [x, y] of [[40, 150], [50, 148], [45, 158], [54, 156]]) { R.disco(x, y, 3, H('#ece0cc')); R.pset(x - 1, y - 1, BL); R.pset(x + 1, y + 1, H('#b8a890')); }
    for (let i = 0; i < 26; i++) { const x = 120 + i * 4, y = 166 + Math.round(Math.sin(i * 0.5) * 3); R.disco(x, y, 1, i % 3 ? H('#f0e8dc') : H('#6a4a7a')); }
    // una piel de ciervo doblada arriba de la estera
    { const P = [[84, 104], [96, 95], [112, 98], [124, 92], [150, 96], [170, 91], [188, 97], [200, 94], [204, 104], [196, 112], [178, 110], [160, 116], [136, 112], [112, 117], [96, 112]];
      R.poligono(P.map(([x, y]) => [x, y + 1]), K); R.poligono(P, H('#b8885a')); R.poligono([[110, 101], [180, 99], [184, 107], [114, 109]], H('#d8b080'));
      for (let k = 0; k < 60; k++) { const x = 92 + Math.floor(hh(k, 1, 78) * 104), y = 96 + Math.floor(hh(k, 2, 78) * 16); if (R.pget(x, y) !== K) R.pset(x, y, k % 2 ? H('#9a6a40') : H('#e0c098')); }
      for (const [x, y] of [[100, 106], [120, 98], [150, 102], [176, 104], [192, 100]]) R.pset(x, y, H('#6a4428')); }
    // LA ESPADA: hoja de acero con su canal, guarda de lazo y empuñadura de alambre
    const { x0, y0, x1, y1 } = ESP;
    R.poligono([[x0 - 2, y0 + 4], [x1, y1 + 2], [x1, y1 - 3], [x0 - 4, y0 - 1]], K);
    R.poligono([[x0, y0 + 2], [x1, y1 + 1], [x1, y1 - 2], [x0 - 2, y0]], H('#b8c4cc'));
    R.linea(x0, y0 + 1, x1, y1 - 1, H('#e8f0f4')); R.linea(x0 + 10, y0, x1 - 6, y1 - 1, H('#8a96a0'));
    for (let i = 0; i < 9; i++) { const u = hh(i, 1, 77), x = Math.round(lerp(x0 + 20, x1 - 10, u)), y = Math.round(lerp(y0, y1, u)); R.pset(x, y + 1, H('#9a6a3a')); R.pset(x + 1, y + 1, H('#7a4a2a')); }
    // la guarda (gavilanes y lazo) y el puño
    R.linea(x1 - 3, y1 - 14, x1 + 6, y1 + 16, K); R.linea(x1 - 2, y1 - 14, x1 + 7, y1 + 16, H('#6a7078')); R.linea(x1 - 1, y1 - 13, x1 + 7, y1 + 13, H('#a8b0b8'));
    for (let a = 0; a < 3.2; a += 0.12) { const x = Math.round(x1 + 10 + Math.cos(a + 1.6) * 10), y = Math.round(y1 + 6 - Math.sin(a + 1.6) * 7); R.pset(x, y, K); R.pset(x, y - 1, H('#8a9098')); }
    R.poligono([[x1 + 4, y1 - 3], [x1 + 26, y1 - 12], [x1 + 28, y1 - 7], [x1 + 6, y1 + 3]], K); R.poligono([[x1 + 5, y1 - 2], [x1 + 26, y1 - 11], [x1 + 27, y1 - 8], [x1 + 6, y1 + 2]], H('#5a3a24'));
    for (let i = 0; i < 10; i++) R.linea(x1 + 7 + i * 2, y1 + 1 - Math.round(i * 0.9), x1 + 8 + i * 2, y1 - 3 - Math.round(i * 0.9), H('#c8a040'));
    R.disco(x1 + 31, y1 - 11, 5, K); R.disco(x1 + 31, y1 - 11, 4, H('#8a9098')); R.pset(x1 + 30, y1 - 13, H('#d8e0e8'));
    // la sombra de la espada en la estera
    for (let i = 0; i < 170; i++) { const x = Math.round(lerp(x0, x1, i / 170)) + 3, y = Math.round(lerp(y0, y1, i / 170)) + 5; if (i % 2) R.pset(x, y, H('#9a7e48')); }
  });
  // el rayo de sol que entra por una rendija y barre la estera hasta la espada
  { const c0 = 150 + Math.round((t - 0) * 6); for (let y = 0; y < 180; y++) { const x0 = Math.round(c0 + (y - 0) * 0.45 - 10), x1 = x0 + 18; for (let x = x0; x <= x1; x++) if (x >= 0 && x < 320 && !tranquilo(x, y) && (x + y) % 2 === 0) R.pset(x, y, mez(R.pget(x, y), H('#fff0c0'), 0.32)); }
    for (let k = 0; k < 14; k++) { const y = Math.round((hh(k, 1, 33) * 170 + t * (3 + k % 3)) % 170), x = Math.round(c0 + y * 0.45 - 8 + hh(k, 2, 33) * 16 + Math.sin(t + k) * 2); if (!tranquilo(x, y)) R.pset(x, y, H('#fff8e0')); } }
  // el pavo que pasa por fuera de la puerta
  { const u = tramo(t, 0.3, 3.6), px = Math.round(lerp(4, 84, u)), py = 92, pa = Math.floor(t * 6) % 2; R.recorte([10, 28, 74, 96]);
    if (u > 0 && u < 1) { R.disco(px, py - 8, 6, K); R.disco(px, py - 8, 5, H('#4a3424')); for (let k = 0; k < 5; k++) R.linea(px - 4, py - 9, px - 10, py - 18 + k * 3, k % 2 ? H('#6a4a2a') : H('#8a6a3a'));
      R.linea(px + 4, py - 12, px + 6, py - 18, H('#5a4a40')); R.disco(px + 7, py - 19, 2, H('#7a8aa8')); R.pset(px + 7, py - 17, H('#c8303a')); R.pset(px + 9, py - 19, H('#c8a040'));
      R.linea(px - 1, py - 3, px - 2 + pa, py, H('#c8a040')); R.linea(px + 2, py - 3, px + 3 - pa, py, H('#c8a040')); }
    R.recorte(null); }
  // el destello que corre por la hoja en «sword»
  { const u = tramo(t, SWORD, SWORD + 0.5); if (u > 0 && u < 1) { const x = Math.round(lerp(ESP.x0, ESP.x1, u)), y = Math.round(lerp(ESP.y0, ESP.y1, u)); destello(x, y, BL, 4); destello(x, y, H('#fff8c0'), 2); } }
  // los bocadillos: «?» (proves), la bandera de San Jorge (English) y la casa de esteras (village)
  burbuja(150, 52, 12, 11, 150, 82, tramo(t, PROVES - 0.15, PROVES + 0.1), (cx, cy) => preg(cx - 4, cy - 7));
  burbuja(258, 70, 13, 9, 250, 96, tramo(t, ENGLISH, ENGLISH + 0.2), (cx, cy) => { R.rect(cx - 9, cy - 6, cx + 9, cy + 6, K); R.rect(cx - 8, cy - 5, cx + 8, cy + 5, BL); R.rect(cx - 8, cy - 1, cx + 8, cy + 1, H('#c8303a')); R.rect(cx - 1, cy - 5, cx + 1, cy + 5, H('#c8303a')); });
  burbuja(100, 122, 14, 10, 84, 146, tramo(t, VILLAGE, VILLAGE + 0.2), (cx, cy) => { for (let i = -10; i <= 10; i++) { const h2 = Math.round(Math.sqrt(1 - (i / 11) ** 2) * 7); R.linea(cx + i, cy + 5, cx + i, cy + 5 - h2, i % 3 ? H('#b89a6a') : H('#8a7048')); R.pset(cx + i, cy + 5 - h2, K); } R.rect(cx - 2, cy, cx + 1, cy + 5, H('#3a2814')); R.linea(cx - 11, cy + 6, cx + 11, cy + 6, K); });
};
// ── 2 · la mesa del estudio: la balanza y el trueque ──────────────────────────────────────────────────────────────
const ENGLISHMAN = W(6.29), TRADED = W(8.95), CORN = W(9.31);
const o2 = (t) => {
  const puesta = t > CORN;
  // la balanza: cae del lado de la espada y se mece; con la mazorca se equilibra con un vaivén que se apaga
  let bal = -1 + Math.sin(t * 2.4) * 0.08;
  if (t > ENGLISHMAN - 0.3 && !puesta) bal = -1 + Math.sin(t * 9) * 0.06 * tramo(t, ENGLISHMAN - 0.3, ENGLISHMAN);
  if (puesta) { const s = t - CORN; bal = lerp(-1, 0, ease(Math.min(1, s / 0.5))) + Math.sin(s * 9) * 0.4 * Math.exp(-s * 2.5); }
  const o = { encuadre: 'mesa', balanza: bal, espada: false, mazorca: false };
  const g = T.hoy(R, t, o);
  const p0 = g.platos ? g.platos[0] : [138, 112], pl = g.platos ? g.platos[1] : [182, 112];
  // la espadita en el platillo izquierdo y, cuando llega, la mazorca en el derecho (más grandes, para que se lean)
  const espadaGrande = (x, y) => { x = Math.round(x); y = Math.round(y); R.linea(x - 9, y + 1, x + 9, y - 3, K); R.linea(x - 9, y, x + 9, y - 4, H('#d8e0e8')); R.linea(x - 8, y - 1, x + 8, y - 4, BL);
    R.linea(x - 9, y - 4, x - 7, y + 4, K); R.linea(x - 10, y - 4, x - 8, y + 4, H('#c8a040')); R.rect(x - 15, y, x - 10, y + 2, K); R.rect(x - 14, y + 1, x - 11, y + 1, H('#6a3a20')); R.disco(x - 16, y + 1, 1, H('#c8a040')); };
  espadaGrande(p0[0], p0[1] - 4);
  if (puesta) mazorca(pl[0] - 1, pl[1] - 4);
  // «an Englishman lived there»: un bocadillo con un colono con sombrero delante de una casa de esteras
  burbuja(92, 56, 18, 12, 128, 92, tramo(t, ENGLISHMAN - 0.2, ENGLISHMAN + 0.1) * (1 - tramo(t, W(7.7), W(7.9))), (cx, cy) => {
    for (let i = -14; i <= 0; i++) { const h2 = Math.round(Math.sqrt(1 - ((i + 7) / 8) ** 2) * 8); R.linea(cx + i, cy + 7, cx + i, cy + 7 - h2, (i % 3) ? H('#b89a6a') : H('#8a7048')); R.pset(cx + i, cy + 7 - h2, K); }
    R.rect(cx - 8, cy + 2, cx - 6, cy + 7, H('#3a2814')); R.linea(cx - 16, cy + 8, cx + 14, cy + 8, K);
    R.disco(cx + 8, cy - 3, 2, H('#f0c8a0')); R.rect(cx + 4, cy - 6, cx + 12, cy - 6, H('#5a3a20')); R.rect(cx + 6, cy - 8, cx + 10, cy - 7, H('#5a3a20')); R.rect(cx + 6, cy, cx + 10, cy + 5, H('#6a4a3a')); R.rect(cx + 6, cy + 6, cx + 7, cy + 7, K); R.rect(cx + 9, cy + 6, cx + 10, cy + 7, K); });
  // el guante trae la mazorca desde la esquina de Atom y la deja en el platillo derecho
  const a = ease(tramo(t, W(7.6), TRADED)), b = ease(tramo(t, CORN + 0.15, P3 - 0.15));
  if (a > 0 && b < 1) { const gx = lerp(lerp(300, pl[0] + 14, a), 300, b), gy = lerp(lerp(56, pl[1] - 12, a), 40, b);
    if (!puesta) mazorca(gx - 8, gy + 4); guante(gx, gy, -1); }
  // el trueque: un bocadillo con la espadita, dos flechas de ida y vuelta y la mazorca
  burbuja(118, 50, 22, 11, 140, 90, tramo(t, CORN + 0.4, CORN + 0.6), (cx, cy) => {
    R.linea(cx - 19, cy + 2, cx - 9, cy - 4, K); R.linea(cx - 19, cy + 1, cx - 9, cy - 5, H('#a8b4c0')); R.rect(cx - 20, cy, cx - 18, cy + 4, H('#c8a040'));
    R.linea(cx - 5, cy - 3, cx + 5, cy - 3, H('#c8303a')); R.pset(cx + 4, cy - 4, H('#c8303a')); R.pset(cx + 4, cy - 2, H('#c8303a')); R.pset(cx + 3, cy - 5, H('#c8303a')); R.pset(cx + 3, cy - 1, H('#c8303a'));
    R.linea(cx - 5, cy + 3, cx + 5, cy + 3, H('#3a6ac8')); R.pset(cx - 4, cy + 2, H('#3a6ac8')); R.pset(cx - 4, cy + 4, H('#3a6ac8')); R.pset(cx - 3, cy + 1, H('#3a6ac8')); R.pset(cx - 3, cy + 5, H('#3a6ac8'));
    mazorca(cx + 15, cy); });
  T.hoyDelante(R, t, o);
};
// ── 3 · de mano en mano: la espadita pasa y al guante le llega un calcetín ───────────────────────────────────────────
const OBJECTS = W(10.6), HAND = W(11.46), HAND2 = W(11.78), DONT = W(12.42), DOUBTS = W(14.71);
const SALTOS = [[W(10.95), 0], [HAND - 0.05, 1], [HAND2 + 0.1, 2], [DONT - 0.1, 3]];
const o3 = (t) => {
  capa('o3', () => {
    deg(0, 0, 319, 74, [H('#7ab0e0'), H('#98c4ea'), H('#b8d8f0'), H('#d8ecf4')]);
    // el mar a la derecha con su horizonte, y la tierra con el pinar a la izquierda
    for (let y = 70; y <= 100; y++) for (let x = 150; x < 320; x++) R.pset(x, y, (x * 3 + y * 7) % 13 === 0 ? H('#8ac0d8') : y < 78 ? H('#4a8ab0') : H('#3a7aa0'));
    for (let k = 0; k < 40; k++) { const x = 160 + Math.floor(hh(k, 1, 51) * 155), y = 74 + Math.floor(hh(k, 2, 51) * 24); R.linea(x, y, x + 3, y, H('#a8d4e8')); }
    for (let x = 0; x < 190; x++) { const h2 = 10 + Math.round(Math.sin(x * 0.07) * 4 + hh(x >> 2, 0, 52) * 6) + Math.max(0, Math.round((150 - x) * 0.08)); R.linea(x, 92 - h2, x, 100, x % 5 === 0 ? H('#1e3e28') : H('#2e5a3a')); }
    for (let k = 0; k < 18; k++) { const x = 4 + k * 10 + Math.floor(hh(k, 3, 53) * 6), h2 = 22 + Math.floor(hh(k, 4, 53) * 12), b = 98; R.rect(x, b - h2 * 0.3, x + 1, b, H('#4a3424'));
      for (let j = 0; j < 4; j++) { const w = h2 * 0.28 * (1 - j * 0.18), y = b - h2 * 0.25 - j * h2 * 0.18; R.poligono([[Math.round(x - w), Math.round(y)], [Math.round(x + 1 + w), Math.round(y)], [x + 1, Math.round(y - h2 * 0.3)], [x, Math.round(y - h2 * 0.3)]], j % 2 ? H('#2e5a3a') : H('#3a6a44')); } }
    // la arena y la hierba del camino, con conchas y huellas
    for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x, y, 54) > 0.92 ? H('#c8b080') : hh(x, y, 55) > 0.9 ? H('#f4e4bc') : (y < 112 && hh(x, y, 56) > 0.6) ? H('#8a9a5a') : H('#e8d4a4'));
    for (let k = 0; k < 30; k++) { const x = Math.floor(hh(k, 5, 57) * 320), y = 164 + Math.floor(hh(k, 6, 57) * 14); R.disco(x, y, 1, k % 2 ? H('#f0e8dc') : H('#d8a890')); }
    for (let x = 0; x < 320; x += 7) { R.pset(x + 2, 170 + (x % 3), H('#c8b080')); R.pset(x + 4, 172 + (x % 2), H('#c8b080')); }
    // en primer término: un cesto, un remo apoyado, una nasa de cañas, troncos de deriva y conchas grandes
    R.disco(20, 172, 9, K); R.rect(11, 166, 29, 172, K); R.disco(20, 172, 8, H('#a88040')); R.rect(12, 167, 28, 172, H('#a88040')); for (let x = 13; x < 28; x += 3) R.linea(x, 167, x, 178, H('#7a5a28')); R.linea(12, 169, 28, 169, H('#c8a060'));
    for (const [x, y] of [[16, 164], [22, 163]]) { R.poligono([[x - 3, y], [x + 3, y], [x, y - 3]], H('#a8b0b8')); }
    R.linea(66, 178, 84, 140, K); R.linea(67, 178, 85, 140, H('#a07a4a')); R.poligono([[82, 146], [90, 128], [93, 130], [86, 148]], H('#a07a4a'));
    R.poligono([[118, 172], [170, 168], [172, 174], [120, 178]], K); R.poligono([[119, 172], [169, 169], [170, 173], [121, 176]], H('#b8a080')); R.linea(121, 173, 168, 170, H('#e0d0b0'));
    for (let i = 0; i < 7; i++) R.linea(250 + i * 4, 176, 254 + i * 3, 156, H('#c8a860')); R.disco(262, 156, 6, H('#9a7e40')); R.linea(248, 166, 276, 166, H('#7a6030'));
    for (const [x, y] of [[196, 176], [212, 172], [300, 174]]) { R.poligono([[x - 4, y + 2], [x + 4, y + 2], [x + 2, y - 3], [x - 2, y - 3]], H('#f0d8c8')); R.linea(x, y + 2, x, y - 3, H('#c89888')); }
    // 1: la casa de esteras con su arco y el maíz
    R.poligono([[8, 128], [8, 112], [20, 104], [52, 104], [64, 112], [64, 128]], K);
    for (let x = 9; x < 64; x++) { const top = 106 + Math.round(((x - 36) / 28) ** 2 * 7); R.linea(x, top, x, 127, (x % 6) < 3 ? H('#b89a6a') : H('#a0845a')); }
    for (let y = 110; y < 128; y += 5) R.linea(9, y, 63, y, H('#8a7048')); R.rect(30, 114, 40, 127, H('#3a2814'));
    for (let x = 66; x < 76; x += 3) { R.linea(x, 128, x, 104, H('#4a7a32')); R.pset(x + 1, 106, H('#d8b840')); R.linea(x, 114, x + 3, 111, H('#6a9a3a')); }
    // 2: la casita inglesa de tablas con tejado de juncos y chimenea de barro
    R.rect(84, 108, 126, 130, K); R.rect(85, 109, 125, 129, H('#9a7a54')); for (let y = 111; y < 129; y += 3) R.linea(85, y, 125, y, H('#7a5a3a'));
    R.poligono([[80, 109], [105, 92], [130, 109]], K); R.poligono([[82, 108], [105, 94], [128, 108]], H('#c8a860')); for (let x = 86; x < 126; x += 3) R.linea(x, 107, 105 + Math.round((x - 105) * 0.3), 96, H('#9a7e40'));
    R.rect(116, 88, 122, 100, H('#8a5a3a')); R.rect(98, 116, 106, 129, H('#4a3020')); R.rect(110, 113, 118, 120, H('#2a3a4a')); R.linea(114, 113, 114, 120, H('#9a7a54'));
    // 3: el secadero de pescado y una canoa de un tronco en la orilla
    R.linea(146, 128, 146, 104, H('#5a4228')); R.linea(186, 128, 186, 104, H('#5a4228')); R.linea(144, 106, 188, 106, H('#6a5030'));
    for (let x = 150; x < 184; x += 6) { R.poligono([[x, 107], [x + 3, 107], [x + 2, 116], [x + 1, 116]], H('#a8b0b8')); R.pset(x + 1, 109, K); }
    R.poligono([[136, 132], [196, 130], [192, 138], [142, 139]], K); R.poligono([[138, 132], [194, 131], [190, 136], [143, 137]], H('#6a4428')); R.linea(140, 133, 192, 132, H('#3a2414'));
    // 4: el muelle de tablas con un bote amarrado, y el barco fondeado mar adentro
    R.rect(200, 112, 262, 116, K); R.rect(201, 112, 261, 115, H('#9a7a54')); for (let x = 204; x < 262; x += 6) R.linea(x, 112, x, 115, H('#6a5030'));
    for (const x of [206, 230, 256]) R.rect(x, 116, x + 2, 128, H('#5a4228'));
    R.poligono([[234, 118], [262, 118], [258, 124], [238, 124]], H('#5a3a24'));
    R.poligono([[276, 86], [312, 86], [306, 94], [282, 94]], H('#4a2e1c')); for (const [x, h2] of [[286, 30], [296, 36], [304, 26]]) { R.linea(x, 86, x, 86 - h2, H('#3a2416')); R.rect(x - 6, 86 - h2 + 6, x + 6, 86 - h2 + 14, H('#efe4c8')); }
    R.rect(295, 59, 297, 66, H('#c8303a')); R.rect(290, 62, 302, 63, H('#c8303a'));
  });
  nubesDia(t, P3, [[60, 38, 30, 2.5, NUB], [170, 46, 22, 4, NUB], [220, 30, 16, 1.5, NUB]]);
  pajaros(t, 4, 44, 71);
  // un cangrejo que cruza la arena de lado; la hierba de la orilla se mece
  { const x = Math.round(90 + ((t - P3) * 14) % 140), y = 150, p = Math.floor(t * 8) % 2; R.rect(x - 3, y - 2, x + 3, y, H('#c8603a')); R.pset(x - 2, y - 3, K); R.pset(x + 2, y - 3, K); R.pset(x - 5, y - 3 + p, H('#c8603a')); R.pset(x + 5, y - 3 + p, H('#c8603a')); R.pset(x - 4, y + 1 - p, H('#a84a2a')); R.pset(x + 4, y + p, H('#a84a2a')); }
  for (const x of [8, 40, 130, 190, 236, 312]) mata(x, 104, 7, t, H('#6a8a3a'), H('#9aba5a'), x);
  // el humo de la casa de esteras y las olas que rompen en la orilla
  for (let k = 0; k < 6; k++) { const s = (t * 0.6 + k / 6) % 1, x = Math.round(36 + Math.sin(t + k) * 2 + s * 10), y = Math.round(102 - s * 30); R.disco(x, y, 1 + Math.round(s * 2), mez(H('#d8d8d8'), H('#b8c8d8'), s)); }
  for (let x = 196; x < 320; x += 2) if (Math.sin(x * 0.2 - t * 3) > 0.6) R.pset(x, 100, BL);
  // la gente, cada uno delante de su casa
  const X = [36, 96, 156, 216], defs = [EL.croatoanRK, EL.colonoRK, EL.croatoanaRK, EL.marineroRK];
  let tiene = 0; for (const [t0, i] of SALTOS) if (t > t0 + 0.4) tiene = i + 1;
  const vuela = SALTOS.find(([t0]) => t > t0 && t <= t0 + 0.4);
  const manos = [];
  for (let i = 0; i < 4; i++) { const lleva = tiene === i && !vuela, recibe = vuela && vuela[1] + 1 === i, da = vuela && vuela[1] === i;
    const a = R.actor(defs[i], X[i], 162, t, { dir: t > DOUBTS - 0.6 ? 1 : (i === 3 && t > DONT ? -1 : 1), sostiene: lleva || recibe || da || (i === 3 && t > DONT) ? [X[i] + 20, 140] : false,
      sonrisa: (i < tiene) || (i === 3 && t > DONT), habla: i < tiene && t > DONT && t < DOUBTS - 0.8 && Math.sin(t * 8 + i) > 0.3, sorpresa: t > DOUBTS - 0.6 && i < 3 });
    manos.push(a.mano); if (lleva && i < 3) espadita(a.mano[0] + 2, a.mano[1], 1, 0.6); }
  // el marinero se queda la espadita (la esconde detrás) y lo que pasa al guante es un calcetín
  if (t > DONT) espadita(manos[3][0] - 2, manos[3][1], -1, 0.5);
  if (tiene === 3 && !vuela) espadita(manos[3][0] + 2, manos[3][1], 1, 0.6);
  // el guante baja de la esquina de Atom y espera con la palma arriba
  const gb = ease(tramo(t, HAND, HAND2 + 0.3)), gx = Math.round(lerp(300, 286, gb)), gy = Math.round(lerp(40, 128, gb) + Math.sin(t * 3) * 1);
  if (t > HAND) guante(gx, gy, -1);
  if (vuela) { const [t0, i] = vuela, u = (t - t0) / 0.4, a = manos[i], b = i < 3 ? manos[i + 1] : [gx - 8, gy - 4];
    const x = lerp(a[0], b[0], u), y = lerp(a[1], b[1], u) - Math.sin(u * Math.PI) * 16;
    if (i < 3) espadita(x, y, 1, u * 6); else calcetin(x, y);
    for (let k = 1; k < 4; k++) { const v = Math.max(0, u - k * 0.08); R.pset(Math.round(lerp(a[0], b[0], v)), Math.round(lerp(a[1], b[1], v) - Math.sin(v * Math.PI) * 16), H('#fff8c0')); } }
  if (t > DONT + 0.4) calcetin(gx - 6, gy - 6 + Math.round(Math.sin(t * 5) * 1));
  // «?» en «doubts»
  burbuja(gx - 18, gy - 34, 10, 10, gx - 10, gy - 14, tramo(t, DOUBTS - 0.7, DOUBTS - 0.45), (cx, cy) => preg(cx - 4, cy - 7));
};
// ── 4 · inserto: la revista científica con la página en blanco; el sello «?» ────────────────────────────────────────
const IRON = W(15.71), PUBLISHED = W(16.89), JOURNAL = W(18.19);
const REV = { x0: 70, y0: 36, x1: 250, y1: 158, lomo: 160 };
const o4 = (t) => {
  capa('o4', () => {
    // el escritorio de roble visto desde arriba
    madera(0, 0, 319, 179, H('#b88a5a'), H('#d0a472'), H('#8a6038'), 11, 22);
    // el vade de piel verde arriba a la izquierda (tranquilo bajo la barra del año), con su pespunte
    R.rect(0, 0, 200, 26, K); R.rect(0, 0, 199, 25, H('#2e4a3a')); for (let x = 2; x < 198; x += 3) R.pset(x, 23, H('#5a7a5a')); R.linea(198, 0, 198, 23, H('#5a7a5a'));
    // la luz suave del flexo arriba a la derecha (la esquina de Atom, tranquila)
    for (let y = 0; y < 70; y++) for (let x = 230; x < 320; x++) { const g = 1 - Math.hypot(x - 300, (y - 20) * 1.2) / 70; if (g > 0) R.pset(x, y, mez(H('#c89a68'), H('#f0d8b0'), g * 0.9)); }
    // una regla con marcas, un lápiz y una nota amarilla de Atom con un imán dibujado
    R.rect(8, 166, 140, 174, K); R.rect(9, 167, 139, 173, H('#e8d070')); for (let x = 12; x < 138; x += 4) R.linea(x, 167, x, x % 20 === 12 ? 171 : 169, H('#5a4a20'));
    R.linea(262, 172, 316, 150, K); R.linea(262, 171, 316, 149, H('#e8b030')); R.linea(262, 170, 266, 168, H('#2a2428')); R.linea(312, 151, 316, 149, H('#e88a9a'));
    R.rect(12, 104, 50, 140, H('#c8a838')); R.rect(10, 102, 48, 138, H('#f8e070')); R.rect(10, 102, 48, 106, H('#f0d050'));
    for (let a = 0; a <= 3.14; a += 0.1) { const x = Math.round(29 + Math.cos(a) * 9), y = Math.round(126 - Math.sin(a) * 9); R.rect(x - 1, y - 1, x + 1, y + 1, H('#c8303a')); }
    R.rect(18, 125, 22, 132, H('#c8303a')); R.rect(36, 125, 40, 132, H('#c8303a')); R.rect(18, 131, 22, 132, H('#8a8a96')); R.rect(36, 131, 40, 132, H('#8a8a96'));
    // la placa de Petri con escamas
    R.disco(286, 120, 22, K); R.disco(286, 120, 21, H('#c8d8e0')); R.disco(286, 120, 18, H('#a8bcc8')); R.anillo(286, 120, 19, BL);
    for (let k = 0; k < 40; k++) { const a = hh(k, 1, 61) * 6.28, r = hh(k, 2, 61) * 14; R.pset(Math.round(286 + Math.cos(a) * r), Math.round(120 + Math.sin(a) * r), k % 3 ? H('#4a5460') : H('#8a96a2')); }
    // la taza de café (vista desde arriba)
    R.disco(34, 62, 16, K); R.disco(34, 62, 15, H('#e8e4dc')); R.disco(34, 62, 11, H('#5a3218')); R.disco(32, 60, 4, H('#7a4a28')); R.rect(48, 58, 56, 66, K); R.rect(49, 59, 55, 65, H('#e8e4dc')); R.rect(51, 61, 53, 63, H('#b8885a'));
    // el tampón de tinta roja
    R.rect(266, 64, 304, 90, K); R.rect(267, 65, 303, 89, H('#3a3a46')); R.rect(270, 68, 300, 86, H('#a82830')); for (let x = 271; x < 300; x += 3) R.pset(x, 70 + (x % 4), H('#c8404a'));
    // la revista abierta: tapas, las páginas y la página izquierda con su figura de puntos y sus barras (sin letras)
    const { x0, y0, x1, y1, lomo } = REV;
    R.rect(x0 - 3, y0 - 2, x1 + 3, y1 + 4, K); R.rect(x0 - 2, y0 - 1, x1 + 2, y1 + 3, H('#2a4a7a'));
    R.rect(x0, y0 + 1, x1, y1 + 1, H('#d8d4cc'));
    for (let x = x0; x <= x1; x++) { const d = Math.abs(x - lomo) / (lomo - x0), sub = Math.round((1 - Math.min(1, d)) ** 3 * 3); for (let y = y0 - sub; y <= y1 - sub; y++) R.pset(x, y, Math.abs(x - lomo) < 5 ? H('#e4e0d8') : H('#fbfaf6')); }
    R.linea(lomo, y0 - 3, lomo, y1 - 3, H('#b8b4ac'));
    R.rect(x0 + 8, y0 + 6, lomo - 10, y0 + 9, H('#2a4a7a'));
    R.rect(x0 + 8, y0 + 14, x0 + 44, y0 + 50, K); R.rect(x0 + 9, y0 + 15, x0 + 43, y0 + 49, H('#3a3a40'));
    for (let k = 0; k < 50; k++) { const x = x0 + 10 + Math.floor(hh(k, 1, 62) * 32), y = y0 + 16 + Math.floor(hh(k, 2, 62) * 32); R.pset(x, y, k % 2 ? H('#a8b4c0') : H('#6a7480')); }
    for (let i = 0; i < 6; i++) { const h2 = 6 + Math.floor(hh(i, 3, 62) * 26); R.rect(x0 + 50 + i * 6, y0 + 49 - h2, x0 + 53 + i * 6, y0 + 49, i === 3 ? H('#c8303a') : H('#3a6ac8')); }
    R.linea(x0 + 48, y0 + 50, lomo - 8, y0 + 50, K);
    for (let r = 0; r < 14; r++) { const y = y0 + 56 + r * 4; let x = x0 + 8; while (x < lomo - 10) { const l = 3 + Math.floor(hh(r, x, 63) * 10); R.linea(x, y, Math.min(lomo - 10, x + l), y, H('#8a8a92')); x += l + 3; } }
    // la página derecha EN BLANCO: solo el recuadro de puntos donde iría el artículo
    for (let x = lomo + 10; x <= x1 - 8; x += 3) { R.pset(x, y0 + 8, H('#b8b4ac')); R.pset(x, y1 - 8, H('#b8b4ac')); }
    for (let y = y0 + 8; y <= y1 - 8; y += 3) { R.pset(lomo + 10, y, H('#b8b4ac')); R.pset(x1 - 8, y, H('#b8b4ac')); }
  });
  // el vapor del café
  for (let k = 0; k < 7; k++) { const s = (t * 0.5 + k / 7) % 1, x = Math.round(34 + Math.sin(t * 2 + k + s * 4) * 4), y = Math.round(58 - s * 40); if (!tranquilo(x, y)) { R.pset(x, y, mez(H('#f0e8e0'), H('#c89a68'), s)); R.pset(x + 1, y - 1, mez(H('#f0e8e0'), H('#c89a68'), s)); } }
  // las escamas de la placa destellan en «iron flakes»
  if (t > IRON - 0.2) for (let k = 0; k < 4; k++) { const ph = Math.sin(t * 6 + k * 1.7); if (ph > 0.6) destello(276 + k * 6, 112 + (k % 2) * 12, BL, ph > 0.85 ? 2 : 1); }
  // las hojas pasan al abrir (de la derecha a la izquierda) hasta quedar la página en blanco
  const { x0, y0, x1, y1, lomo } = REV;
  for (let k = 0; k < 3; k++) { const u = tramo(t, P4 + 0.1 + k * 0.3, P4 + 0.45 + k * 0.3); if (u > 0 && u < 1) { const xe = Math.round(lerp(x1, x0 + 6, u)), lev = Math.round(Math.sin(u * Math.PI) * 14);
    R.poligono([[lomo, y0], [xe, y0 - lev], [xe, y1 - lev], [lomo, y1]], K); R.poligono([[lomo + (xe > lomo ? 1 : -1), y0 + 1], [xe + (xe > lomo ? -1 : 1), y0 - lev + 1], [xe + (xe > lomo ? -1 : 1), y1 - lev - 1], [lomo + (xe > lomo ? 1 : -1), y1 - 1]], u < 0.5 ? H('#f4f2ec') : H('#e8e4dc'));
    for (let r = 0; r < 8; r++) R.linea(Math.round(lerp(lomo, xe, 0.2)), y0 + 12 + r * 12 - Math.round(lev * 0.5), Math.round(lerp(lomo, xe, 0.8)), y0 + 12 + r * 12 - Math.round(lev * 0.8), H('#a8a8b0')); } }
  // el guante coge el sello del tampón y lo estampa en la página en blanco
  const sx0 = 285, sy0 = 76, sx1 = 205, sy1 = 96;
  const a = ease(tramo(t, W(16.4), PUBLISHED + 0.1)), b = ease(tramo(t, PUBLISHED + 0.3, JOURNAL - 0.08)), c = ease(tramo(t, JOURNAL + 0.35, P5 - 0.2));
  const cogido = t > PUBLISHED + 0.1, golpe = t > JOURNAL - 0.08 && t < JOURNAL + 0.35;
  let sx = sx0, sy = sy0, alto = 0;
  if (cogido) { sx = lerp(sx0, sx1, b); sy = lerp(sy0, sy1, b); alto = Math.round(Math.sin(b * Math.PI) * 18) + (golpe ? 0 : (t > JOURNAL ? Math.round(c * 30) : 0)); sx = lerp(sx, 320, c); sy = lerp(sy, 30, c); }
  // la marca del sello en la página (aparece al golpear y se queda)
  if (t > JOURNAL - 0.02) { const mx = sx1, my = sy1 + 18; for (let y = -20; y <= 20; y++) for (let x = -20; x <= 20; x++) { const r = Math.hypot(x, y); if (r > 17 && r < 20 && hh(x, y, 64) > 0.15) R.pset(mx + x, my + y, H('#c8303a')); }
    R.icono('?', mx - 7, my - 12, H('#c8303a'), H('#e8a0a0'), 3); for (let k = 0; k < 20; k++) R.pset(mx - 15 + Math.floor(hh(k, 1, 65) * 30), my - 15 + Math.floor(hh(k, 2, 65) * 30), BL); }
  // el sello: mango de madera, base roja, y el guante que lo sujeta
  { const x = Math.round(sx), y = Math.round(sy - alto);
    if (alto > 2) { R.disco(x + 3, Math.round(sy) + 22, 8, mez(H('#fbfaf6'), K, 0.15)); }
    R.rect(x - 12, y + 10, x + 12, y + 16, K); R.rect(x - 11, y + 11, x + 11, y + 15, H('#a82830')); R.rect(x - 3, y - 6, x + 3, y + 10, K); R.rect(x - 2, y - 5, x + 2, y + 10, H('#8a5a34')); R.disco(x, y - 8, 5, K); R.disco(x, y - 8, 4, H('#a06a3a')); R.pset(x - 1, y - 10, H('#d0a070'));
    if (t > W(16.4)) { const gx = cogido ? x + 12 : lerp(320, x + 12, a), gy = cogido ? y - 2 : lerp(20, y - 2, a); guante(gx, gy, -1); } }
};
// ── 5 · la excavación de Hatteras, con la criba parada: «want to see the forge itself» ──────────────────────────────
const OTHER = W(19.49), FORGE = W(21.25), CONVINCED = W(22.59), NEITHER = W(23.54);
const o5 = (t) => {
  const o = { encuadre: 'excavacion', sacude: 0 };
  const g = T.hatteras(R, t, o);
  // la arqueóloga enseña el frasquito con las escamas; la otra arqueóloga quiere ver la fragua
  const mira = t > NEITHER - 0.1;
  const a = R.actor(EL.arqueologaRK, 86, g.suelo, t, { dir: 1, sostiene: mira ? false : [118, g.suelo - 24], habla: t < FORGE - 0.4 && Math.sin(t * 8) > 0, triste: t > CONVINCED && t < NEITHER, dedo: mira, sonrisa: t < OTHER + 0.6 });
  if (!mira) { const [x, y] = a.mano; R.rect(x - 1, y - 8, x + 3, y + 1, K); R.rect(x, y - 7, x + 2, y, H('#d8e8f0')); R.rect(x, y - 3, x + 2, y, H('#5a6470')); R.rect(x - 1, y - 9, x + 3, y - 8, H('#c8303a')); if (Math.sin(t * 7) > 0.7) R.pset(x + 1, y - 2, BL); }
  const b = R.actor(EL.arqueologo, 132, g.suelo, t, { dir: mira ? 1 : -1, habla: t > FORGE - 0.6 && t < CONVINCED + 0.3 && Math.sin(t * 9) > -0.2, dedo: t > FORGE - 0.3 && t < CONVINCED, triste: t > CONVINCED - 0.1 && t < NEITHER - 0.2, sorpresa: t < OTHER + 0.5 });
  // el bocadillo con la fragua: yunque, fuego y «?»
  burbuja(150, 92, 22, 12, 142, 128, tramo(t, FORGE - 0.35, FORGE - 0.1) * (1 - tramo(t, NEITHER - 0.2, NEITHER)), (cx, cy) => {
    R.rect(cx - 16, cy + 2, cx - 2, cy + 4, K); R.rect(cx - 14, cy - 2, cx - 4, cy + 2, H('#4a4a54')); R.rect(cx - 18, cy - 4, cx - 2, cy - 2, H('#6a6a74')); R.rect(cx - 10, cy + 4, cx - 8, cy + 8, H('#4a4a54'));
    const f = Math.sin(t * 14) > 0 ? 1 : 0; R.poligono([[cx - 18, cy + 8], [cx - 2, cy + 8], [cx - 6, cy - 6 - f], [cx - 10, cy + 1], [cx - 13, cy - 4 + f]], H('#e86a20')); R.poligono([[cx - 15, cy + 8], [cx - 5, cy + 8], [cx - 8, cy - 1], [cx - 11, cy + 3]], H('#f8d040'));
    preg(cx + 4, cy - 7); });
  // en «convinced», niega con la cabeza; en «Neither on Hatteras» las dos miran la cata
  // en «convinced» no se convence: un «X» pequeño
  burbuja(146, 108, 7, 7, 141, 128, tramo(t, CONVINCED - 0.1, CONVINCED + 0.1) * (1 - tramo(t, NEITHER - 0.2, NEITHER)), (cx, cy) => R.icono('X', cx - 2, cy - 2, H('#c8303a'), K, 1));
  T.hatterasDelante(R, t, o);
};
// ── 6 · el Sitio X: nada con un nombre ────────────────────────────────────────────────────────────────────────────
const ANYTHING = W(25.8), NAME = W(27.72), ONIT = W(27.9);
const o6 = (t) => {
  const o = { encuadre: 'sitiox', hallazgo: 1 };
  const g = T.museo(R, t, o);
  // la arqueóloga levanta un tiesto y lo mira de cerca
  const sube = t > ANYTHING - 0.3;
  const a = R.actor(EL.arqueologaRK, 128, g.suelo, t, { dir: 1, sostiene: sube ? [150, g.suelo - 26] : [146, g.suelo - 12], sorpresa: t > ANYTHING && t < NAME - 0.4, triste: t > NAME + 0.3 });
  { const [x, y] = a.mano; R.poligono([[x - 1, y - 4], [x + 6, y - 5], [x + 7, y + 1], [x, y + 2]], K); R.poligono([[x, y - 3], [x + 5, y - 4], [x + 6, y], [x + 1, y + 1]], H('#c88a5a')); R.linea(x + 1, y - 2, x + 5, y - 3, H('#3a5aa0')); }
  // el voluntario vacía la criba y niega con la cabeza
  const niega = t > ONIT && t < P7 - 0.3;
  const v = R.actor(EL.voluntarioRK, 238, g.suelo, t, { dir: -1, sostiene: niega ? false : [228, g.suelo - 16], triste: niega });
  if (!niega) { const [x, y] = v.mano, s = Math.round(Math.sin(t * 16) * 1); R.rect(x - 12 + s, y - 1, x + 2 + s, y + 1, K); R.rect(x - 11 + s, y - 3, x + 1 + s, y - 1, H('#8a8a96')); for (let i = 0; i < 4; i++) { const yy = y + 2 + ((t * 40 + i * 5) % 10); R.pset(x - 9 + i * 3 + s, Math.round(yy), H('#8a6a44')); } }
  // el bocadillo: la etiqueta con un nombre (rayas y una figurita con sombrero), tachada en «name»
  burbuja(170, 86, 20, 13, 156, 120, tramo(t, W(26.5), W(26.8)), (cx, cy) => {
    R.poligono([[cx - 15, cy - 7], [cx + 10, cy - 7], [cx + 15, cy], [cx + 10, cy + 7], [cx - 15, cy + 7]], K); R.poligono([[cx - 14, cy - 6], [cx + 9, cy - 6], [cx + 13, cy], [cx + 9, cy + 6], [cx - 14, cy + 6]], H('#f0e0b0'));
    R.disco(cx + 9, cy, 1, K); R.rect(cx - 11, cy - 3, cx - 7, cy - 2, K); R.rect(cx - 10, cy - 2, cx - 8, cy + 3, H('#5a4a3a')); R.disco(cx - 9, cy - 4, 1, H('#d8a878'));
    R.linea(cx - 4, cy - 2, cx + 6, cy - 2, H('#3a2a20')); R.linea(cx - 4, cy + 1, cx + 3, cy + 1, H('#3a2a20')); R.linea(cx - 4, cy + 4, cx + 5, cy + 4, H('#3a2a20'));
    const u = tramo(t, NAME - 0.05, NAME + 0.3); if (u > 0) { const n = Math.round(14 * u); for (let i = -n; i <= n; i++) for (const w of [-1, 0, 1]) { R.pset(cx + i + w, cy + Math.round(i * 0.6), H('#c8303a')); if (u > 0.5) R.pset(cx + i + w, cy - Math.round(i * 0.6), H('#c8303a')); } } });
  T.museoDelante(R, t, o);
};
// ── 7 · inserto: la tabla de ADN, la doble hélice y los dos retratos que no se unen ──────────────────────────────────
const LINKED = W(29.88), TODAY = W(30.76), SPECIFIC = W(31.5);
const o7 = (t) => {
  capa('o7', () => {
    // la pared de azulejos blancos con sus juntas, y una balda con frascos
    for (let y = 0; y < 82; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 16 === 0 || y % 12 === 0) ? H('#b8c0c8') : ((x >> 4) + (y / 12 | 0)) % 2 ? H('#e8eef2') : H('#dfe6ec'));
    for (let y = 0; y < 60; y++) for (let x = 262; x < 320; x++) R.pset(x, y, mez(R.pget(x, y), H('#c8d0d8'), 0.6 * Math.min(1, (x - 262) / 16)));
    R.rect(176, 64, 262, 67, H('#8a9098')); R.linea(176, 64, 262, 64, H('#c8ccd0'));
    for (const [x, c, h2] of [[182, '#3a8ac8', 16], [196, '#c8a030', 12], [208, '#6aa84a', 18], [222, '#c84a5a', 10], [236, '#8a6ac8', 14], [250, '#3a8ac8', 12]]) { R.rect(x, 64 - h2, x + 8, 63, K); R.rect(x + 1, 65 - h2, x + 7, 63, H(c)); R.rect(x + 2, 62 - h2, x + 6, 64 - h2, H('#e8e8e8')); R.linea(x + 2, 66 - h2, x + 2, 62, BL); }
    // dos retratos sujetos con cinta: una persona de hoy y un colono con sombrero (siluetas)
    for (const [x, col] of [[36, '#8ab8d8'], [118, '#d8c8a0']]) { R.rect(x - 1, 27, x + 31, 63, K); R.rect(x, 28, x + 30, 62, BL); R.rect(x + 3, 31, x + 27, 55, H(col)); R.rect(x + 8, 25, x + 22, 28, H('#e8e0a0')); }
    R.disco(51, 41, 5, H('#3a4a5a')); R.poligono([[42, 55], [44, 48], [58, 48], [60, 55]], H('#3a4a5a'));
    R.disco(133, 42, 5, H('#5a4030')); R.rect(126, 36, 140, 37, H('#5a4030')); R.rect(129, 32, 137, 36, H('#5a4030')); R.poligono([[124, 55], [126, 48], [140, 48], [142, 55]], H('#5a4030')); R.rect(129, 48, 137, 50, BL);
    // la encimera negra con su moteado
    for (let y = 82; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x, y, 66) > 0.93 ? H('#4a4e56') : y < 86 ? H('#5a5e66') : H('#2a2e36'));
    R.linea(0, 82, 319, 82, H('#8a8e96'));
    // la tabla de bandas (como un gel): calles con bandas de colores, sin letras; dos calles se parecen a medias
    R.rect(20, 94, 164, 172, K); R.rect(21, 95, 163, 171, H('#f4f4f0')); R.rect(21, 95, 163, 100, H('#3a6ac8'));
    for (let c = 0; c < 6; c++) { const x = 30 + c * 22; R.rect(x, 104, x + 14, 168, H('#e8e8e4'));
      for (let k = 0; k < 9; k++) { const y = 108 + Math.floor(hh(c < 2 && k < 5 ? 0 : c, k, 67) * 56); R.rect(x + 1, y, x + 13, y + 1, [H('#c8303a'), H('#3a8a4a'), H('#3a6ac8'), H('#c8a030')][(k + c) % 4]); } }
    for (const x of [30, 52]) { R.rect(x - 1, 103, x + 15, 104, H('#c8303a')); }
    // la gradilla con tubos de tapones de colores y una pipeta
    R.rect(244, 128, 314, 150, K); R.rect(245, 129, 313, 149, H('#d8dce0')); for (let i = 0; i < 6; i++) { const x = 250 + i * 10; R.rect(x, 112, x + 5, 136, K); R.rect(x + 1, 113, x + 4, 136, H('#e8f0f4')); R.rect(x + 1, 128, x + 4, 136, H('#c8d8a0')); R.rect(x, 110, x + 5, 113, [H('#c8303a'), H('#3a6ac8'), H('#e8c040'), H('#6aa84a')][i % 4]); }
    R.linea(176, 166, 236, 150, K); R.linea(176, 165, 236, 149, H('#e8e8e8')); R.rect(232, 144, 240, 152, H('#3a6ac8'));
    // el pie de la maqueta de la doble hélice
    R.rect(190, 160, 236, 168, K); R.rect(191, 161, 235, 167, H('#5a5e66')); R.rect(211, 70, 214, 162, H('#8a8e96'));
  });
  // la doble hélice que gira despacio
  for (let y = 74; y < 158; y++) { const a = (y - 74) * 0.14 + t * 1.6, x1 = Math.round(213 + Math.sin(a) * 16), x2 = Math.round(213 + Math.sin(a + Math.PI) * 16), d1 = Math.cos(a), d2 = -d1;
    if (y % 6 === 0) { const c = [H('#c8303a'), H('#3a8a4a'), H('#3a6ac8'), H('#c8a030')][(y / 6 | 0) % 4]; R.linea(Math.min(x1, x2), y, Math.max(x1, x2), y, c); }
    for (const [x, d] of [[x1, d1], [x2, d2]]) { R.rect(x - 1, y, x + 1, y, d > 0 ? H('#e8eef2') : H('#8a9aaa')); R.pset(x - 2, y, K); R.pset(x + 2, y, K); } }
  // el hilo rojo de la persona de hoy hacia el colono: avanza y se queda corto
  const u = ease(tramo(t, LINKED - 0.1, TODAY + 0.3)), cae = tramo(t, SPECIFIC - 0.1, SPECIFIC + 0.4);
  const xa = 67, ya = 45, xb = 117;
  if (u > 0) { const xe = Math.round(lerp(xa, lerp(xa, xb, 0.72), u)); for (let x = xa; x <= xe; x++) { const s = (x - xa) / (xb - xa), y = Math.round(ya + Math.sin(s * Math.PI) * 10 + (x > xe - 12 ? cae * (x - xe + 12) * 1.2 : 0)); R.pset(x, y, H('#c8303a')); R.pset(x, y + 1, H('#8a1a20')); }
    R.disco(xa, ya, 2, H('#c8303a')); }
  // «?» grande en «specific colonist»
  burbuja(96, 76, 11, 11, 92, 56, tramo(t, SPECIFIC - 0.1, SPECIFIC + 0.15), (cx, cy) => preg(cx - 4, cy - 7));
  // la luz del fluorescente parpadea un poco sobre la encimera
  if (Math.sin(t * 23) > 0.97) for (let x = 0; x < 320; x += 2) R.pset(x + (t * 10 | 0) % 2, 84, H('#c8ccd4'));
};
// ── 8 · Jamestown de lejos: el rumor de tiza que se borra ─────────────────────────────────────────────────────────
const JAMESTOWN = W(36.18), SAID = W(37.36), BADEND = W(38.94), NEVER = W(40.2);
const o8 = (t) => {
  capa('o8', () => {
    deg(0, 0, 319, 70, [H('#e8b890'), H('#f0c8a0'), H('#f4dcb8'), H('#e8e4c8')]);
    // la otra orilla: bosque lejano azulado
    for (let x = 0; x < 320; x++) { const h2 = 12 + Math.round(Math.sin(x * 0.05) * 4 + hh(x >> 1, 0, 81) * 5); R.linea(x, 72 - h2, x, 74, x % 3 ? H('#6a7a6a') : H('#5a6a5a')); }
    // el río ancho
    for (let y = 74; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x * 5 + y * 11) % 23 === 0 ? H('#8aa8b0') : y < 90 ? H('#7a9aa8') : y < 130 ? H('#5a7a8a') : H('#4a6a7a'));
    // la península con el fuerte triangular (tres baluartes redondos), las casas, la iglesia y la empalizada
    R.poligono([[60, 108], [110, 86], [250, 90], [292, 112], [200, 122], [90, 122]], H('#8a9a5a')); R.poligono([[64, 110], [110, 89], [248, 92], [288, 112], [200, 120], [92, 120]], H('#9aaa6a'));
    for (let x = 64; x < 288; x += 3) R.pset(x, 114 + (x % 5), H('#c8b880'));
    const F = [[128, 94], [222, 96], [176, 116]];
    R.poligono(F, H('#a89870'));
    for (let k = 0; k < 3; k++) { const [ax, ay] = F[k], [bx, by] = F[(k + 1) % 3], n = Math.round(Math.hypot(bx - ax, by - ay) / 2); for (let i = 0; i <= n; i++) { const x = Math.round(lerp(ax, bx, i / n)), y = Math.round(lerp(ay, by, i / n)); R.linea(x, y, x, y - 5, i % 2 ? H('#6a4a2a') : H('#8a6a44')); R.pset(x, y - 6, H('#4a3420')); } }
    for (const [x, y] of F) { R.disco(x, y - 2, 6, H('#6a4a2a')); R.disco(x, y - 3, 5, H('#8a6a44')); for (let a = 0; a < 6.28; a += 0.5) R.pset(Math.round(x + Math.cos(a) * 5), Math.round(y - 3 + Math.sin(a) * 3), H('#4a3420')); }
    for (const [x, y, w] of [[150, 100, 10], [168, 98, 12], [188, 100, 9], [160, 106, 8], [196, 104, 10]]) { R.rect(x, y - 4, x + w, y, H('#9a7a54')); R.poligono([[x - 1, y - 4], [x + Math.round(w / 2), y - 9], [x + w + 1, y - 4]], H('#c8a860')); R.pset(x + 2, y - 2, H('#3a2814')); }
    R.rect(176, 92, 184, 100, H('#b09070')); R.poligono([[175, 92], [180, 86], [185, 92]], H('#8a6a44')); R.linea(180, 86, 180, 82, H('#4a3420')); R.linea(178, 84, 182, 84, H('#4a3420'));
    // los barcos fondeados delante del fuerte
    for (const [x, s] of [[240, 1], [270, 0.8], [96, 0.7]]) { const wl = 118 + Math.round((1 - s) * 6); R.poligono([[x - 14 * s, wl - 4], [x + 14 * s, wl - 4], [x + 11 * s, wl], [x - 11 * s, wl]].map(([a, b]) => [Math.round(a), Math.round(b)]), H('#4a2e1c'));
      for (const dx of [-6, 0, 6]) { const mx = Math.round(x + dx * s); R.linea(mx, wl - 4, mx, Math.round(wl - 4 - 20 * s), H('#3a2416')); } }
    // en primer término, la orilla con juncos, un tronco y una canoa varada
    R.poligono([[0, 150], [60, 146], [120, 158], [140, 180], [0, 180]], H('#8a7a4a')); R.poligono([[0, 154], [56, 150], [110, 160], [126, 180], [0, 180]], H('#a8945a'));
    for (let x = 0; x < 120; x += 2) { const h2 = 6 + Math.floor(hh(x, 1, 82) * 14); R.linea(x, 162, x + 1, 162 - h2, x % 4 ? H('#6a7a3a') : H('#8a9a4a')); }
    R.poligono([[20, 166], [80, 160], [82, 166], [22, 172]], H('#5a4028')); R.linea(22, 166, 80, 161, H('#8a6a44'));
  });
  // nubes y pájaros; humo de las casas; un bote que cruza el río
  nubesDia(t, P8, [[60, 34, 26, 2, [H('#d8a888'), H('#f0d0b0'), H('#fff0dc')]], [150, 42, 18, 3.2, [H('#d8a888'), H('#f0d0b0'), H('#fff0dc')]], [220, 22, 14, 1.2, [H('#d8a888'), H('#f0d0b0'), H('#fff0dc')]]]);
  pajaros(t, 3, 48, 83, H('#4a3a3a'));
  for (const [hx, hy] of [[172, 92], [192, 96]]) for (let k = 0; k < 4; k++) { const s = (t * 0.5 + k / 4) % 1; R.pset(Math.round(hx + s * 8 + Math.sin(t + k) * 1), Math.round(hy - s * 18), mez(H('#d8d0c8'), H('#f0d8c0'), s)); }
  { const x = Math.round(300 - (t - P8) * 9), y = 140; R.poligono([[x - 8, y - 2], [x + 8, y - 2], [x + 6, y + 1], [x - 6, y + 1]], H('#5a3a24')); R.rect(x - 2, y - 6, x, y - 2, H('#c8a878')); const r = Math.sin(t * 5) > 0 ? 1 : -1; R.linea(x - 4, y - 2, x - 9, y + 3 * r, H('#c8a070')); for (let i = 1; i < 5; i++) R.pset(x + 8 + i * 3, y + (i % 2), H('#c8dce4')); }
  for (let k = 0; k < 60; k++) { const x = Math.round(hh(k, 1, 84) * 320 + Math.sin(t * 0.8 + k) * 3), y = 124 + Math.floor(hh(k, 2, 84) * 56), l = 2 + Math.floor(hh(k, 3, 84) * 6); if (Math.sin(t * 2 + k) > 0.2) R.linea(x, y, x + l, y, y > 150 ? H('#7a9aa8') : H('#a8c8d0')); }
  // el reflejo del fuerte y de los barcos en el agua, que tiembla
  for (let y = 124; y < 140; y++) { const off = Math.round(Math.sin(y * 0.8 + t * 3) * 2); for (let x = 130; x < 230; x += 2) if ((x + y) % 4 === 0) R.pset(x + off, y, H('#8a8a6a')); for (const sx of [240, 270]) if (y < 134) R.pset(sx + off, y, H('#3a3a3a')); }
  // unos patos que nadan y un pez que salta
  for (let k = 0; k < 3; k++) { const x = Math.round(150 + k * 8 + (t - P8) * 3), y = 162 + (k % 2) * 3; R.rect(x - 2, y - 1, x + 2, y, H('#5a4a3a')); R.pset(x + 2, y - 2, H('#2a5a3a')); R.pset(x + 3, y - 2, H('#c8a040')); R.linea(x - 5, y + 1, x - 3, y + 1, H('#a8c8d0')); }
  { const s = ((t - P8) % 2.6) / 0.7; if (s < 1) { const x = 60 + Math.round(s * 14), y = 136 - Math.round(Math.sin(s * Math.PI) * 9); R.rect(x - 2, y, x + 2, y + 1, H('#b8c8d0')); R.pset(x - 3, y - 1, H('#8a9aa8')); } }
  // el bocadillo de tiza (pizarra) con el rumor: figuritas que van y una nube oscura con un rayo
  const bx = 176, by = 48, u = tramo(t, JAMESTOWN - 0.1, JAMESTOWN + 0.3), borra = tramo(t, NEVER - 0.3, W(40.75));
  if (u > 0) { const s = Math.min(1, u), w = Math.round(46 * s), h2 = Math.round(26 * s);
    for (const [f, r] of [[0.3, 2], [0.6, 3]]) { const x = Math.round(lerp(176, bx, f)), y = Math.round(lerp(92, by + h2, f)); R.disco(x, y, r + 1, H('#5a4028')); R.disco(x, y, r, H('#2e4a3a')); }
    R.rect(bx - w - 2, by - h2 - 2, bx + w + 2, by + h2 + 2, H('#7a5a38')); R.rect(bx - w - 1, by - h2 - 1, bx + w + 1, by + h2 + 1, H('#5a4028')); R.rect(bx - w, by - h2, bx + w, by + h2, H('#2e4a3a'));
    for (let k = 0; k < 40; k++) R.pset(bx - w + Math.floor(hh(k, 1, 85) * 2 * w), by - h2 + Math.floor(hh(k, 2, 85) * 2 * h2), H('#3a5848'));
    if (s >= 1) { const tiza = H('#e8ece4'), lim = Math.round(lerp(bx - w, bx + w + 8, borra));
      R.recorte([lim, by - h2, bx + w, by + h2]);
      // las casitas del fuerte y las figuritas que se van por un camino (dibujadas a tiza, poco a poco)
      const d = tramo(t, SAID - 0.3, SAID + 0.6);
      R.linea(bx - 44, by + 20, bx + 44, by + 20, tiza);
      for (let i = 0; i < 2; i++) { const x = bx - 42 + i * 18, y = by + 19; for (const w of [0, 1]) { R.linea(x, y - w, x + 14, y - w, tiza); R.linea(x + w, y, x + w, y - 10, tiza); R.linea(x + 14 - w, y, x + 14 - w, y - 10, tiza); R.linea(x - 2, y - 10 - w, x + 7, y - 17 - w, tiza); R.linea(x + 7, y - 17 - w, x + 16, y - 10 - w, tiza); } R.rect(x + 5, y - 6, x + 8, y, tiza); }
      for (let i = 0; i < 4; i++) { if (d < (i + 1) / 4) break; const x = bx - 4 + i * 12, y = by + 19; R.disco(x, y - 14, 2, tiza); R.linea(x, y - 11, x, y - 5, tiza); R.linea(x + 1, y - 11, x + 1, y - 5, tiza); R.linea(x, y - 5, x - 3, y, tiza); R.linea(x + 1, y - 5, x + 4, y, tiza); R.linea(x - 3, y - 9, x + 4, y - 9, tiza); }
      // la nube oscura con el rayo (lo malo que se decía), y una «?»
      const n = tramo(t, BADEND - 0.3, BADEND + 0.2); if (n > 0) { const ny = by - 12; for (const [dx, dy, r] of [[0, 0, 8], [-10, 3, 6], [10, 3, 6], [-4, -5, 6], [5, -5, 6]]) R.disco(bx + 14 + dx, ny + dy, Math.round(r * n), H('#7a8a84')); for (const [dx, dy, r] of [[0, 0, 8], [-10, 3, 6], [10, 3, 6]]) R.anillo(bx + 14 + dx, ny + dy, Math.round(r * n), tiza);
        if (n >= 1 && Math.sin(t * 10) > -0.3) { const c = H('#f0d860'); for (const w of [0, 1]) { R.linea(bx + 14 + w, ny + 8, bx + 9 + w, ny + 15, c); R.linea(bx + 9 + w, ny + 15, bx + 16 + w, ny + 15, c); R.linea(bx + 16 + w, ny + 15, bx + 11 + w, ny + 23, c); } } }
      if (t > BADEND + 0.4) R.icono('?', bx - 38, by - 22, tiza, H('#2e4a3a'), 2);
      R.recorte(null);
      // lo borrado queda emborronado
      if (borra > 0) for (let y = by - h2; y <= by + h2; y++) for (let x = bx - w; x < Math.min(bx + w, lim); x++) if ((x * 3 + y * 5) % 7 === 0) R.pset(x, y, H('#5a7466'));
      // el guante con el borrador de fieltro
      if (borra > 0 && borra < 1) { const ex = lim, ey = by + Math.round(Math.sin(t * 22) * 8); R.rect(ex - 8, ey - 6, ex + 4, ey + 6, K); R.rect(ex - 7, ey - 5, ex + 3, ey + 1, H('#8a6a44')); R.rect(ex - 7, ey + 2, ex + 3, ey + 5, H('#d8d0c0')); guante(ex + 16, ey, -1); } } }
};
// ── 9 · 1937: aparece una piedra tallada junto al camino ──────────────────────────────────────────────────────────
const NINETEEN = W(41.7), CARVED = W(43.36), TURNED = W(44.02), MESSAGES = W(44.72);
const o9 = (t) => {
  capa('o9', () => {
    // el cielo entre las copas y el río al fondo
    deg(0, 0, 319, 96, [H('#a8d0e8'), H('#c8e0ec'), H('#e4eef0')]);
    for (let y = 84; y < 108; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x * 7 + y * 3) % 19 === 0 ? H('#c8e0e8') : H('#6a9ab0'));
    for (let x = 0; x < 320; x++) { const h2 = 6 + Math.round(Math.sin(x * 0.04) * 3 + hh(x >> 1, 0, 91) * 3); R.linea(x, 86 - h2, x, 86, H('#7a9a7a')); }
    // la tierra: el camino de tierra en diagonal con sus roderas, la hierba y los helechos
    for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) { const enCam = Math.abs(x - (60 + (y - 104) * 2.2)) < 30 + (y - 104) * 0.9;
      R.pset(x, y, enCam ? (hh(x, y, 92) > 0.9 ? H('#9a7a54') : H('#b89a70')) : hh(x, y, 93) > 0.85 ? H('#5a7a3a') : hh(x, y, 94) > 0.9 ? H('#8a6a3a') : H('#6a8a44')); }
    for (let y = 108; y < 180; y += 3) for (const d of [-10, 10]) { const x = Math.round(60 + (y - 104) * 2.2 + d * (1 + (y - 104) / 70)); R.pset(x, y, H('#8a6a48')); R.pset(x + 1, y, H('#8a6a48')); }
    for (let k = 0; k < 12; k++) { const x = Math.floor(hh(k, 1, 95) * 320), y = 116 + Math.floor(hh(k, 2, 95) * 60); if (Math.abs(x - (60 + (y - 104) * 2.2)) < 40) continue; for (let i = -4; i <= 4; i++) R.linea(x, y, x + i * 2, y - 6 + Math.abs(i), H('#4a7a32')); }
    // los troncos de los robles con su corteza y el musgo que cuelga
    for (const [x, w] of [[14, 12], [102, 8], [204, 10], [302, 14]]) { R.rect(x - w, 0, x + w, 116, K); R.rect(x - w + 1, 0, x + w - 1, 116, H('#5a4434')); for (let y = 0; y < 116; y += 2) for (let i = -w + 2; i < w - 1; i += 3) if (hh(i + x, y >> 2, 96) > 0.5) R.pset(x + i, y, H('#3a2a20')); R.linea(x - w + 2, 0, x - w + 2, 116, H('#7a6450'));
      R.poligono([[x - w - 4, 116], [x + w + 4, 116], [x + w, 108], [x - w, 108]], H('#4a3424')); }
    // la copa de los árboles arriba (oscura, tranquila en la esquina de Atom)
    for (let x = 0; x < 320; x++) { const h2 = 22 + Math.round(Math.sin(x * 0.09) * 8 + hh(x >> 2, 1, 97) * 6); for (let y = 0; y < h2; y++) R.pset(x, y, x > 262 ? H('#2a4a2a') : (x >= 14 && x <= 176 && y <= 24) ? H('#345e2e') : (x + y) % 5 === 0 ? H('#4a7a3a') : H('#3a6a32')); }
    for (let k = 0; k < 16; k++) { const x = 6 + k * 16 + Math.floor(hh(k, 1, 87) * 8); if (x > 250) continue; copa(x, 36 + Math.floor(hh(k, 2, 87) * 8), 12, H('#3a6a32'), H('#6a9a4a'), H('#24442a'), k + 300); }
    // el musgo que cuelga de las ramas
    for (let k = 0; k < 14; k++) { const x = 10 + k * 18 + Math.floor(hh(k, 3, 87) * 8); if (x > 256) continue; const l = 12 + Math.floor(hh(k, 4, 87) * 18); for (let j = 0; j < l; j++) { R.pset(x + Math.round(Math.sin(j * 0.5) * 1), 30 + j, j % 3 ? H('#9aa88a') : H('#b8c4a8')); if (j % 4 === 0) R.pset(x + 1, 30 + j, H('#7a8a6a')); } }
    // matas y arbustos de la orilla del camino
    for (let k = 0; k < 10; k++) { const x = Math.floor(hh(k, 5, 87) * 320), y = 112 + Math.floor(hh(k, 6, 87) * 10); if (Math.abs(x - (60 + (y - 104) * 2.2)) < 36 || (x > 190 && x < 290)) continue; R.disco(x, y, 6, H('#3a6a32')); R.disco(x - 2, y - 2, 4, H('#5a8a3a')); R.pset(x - 3, y - 4, H('#8aba5a')); }
    // el coche de los años treinta aparcado (negro, guardabarros redondos, rueda de repuesto; sin marcas)
    const cx = 236, cy = 150;
    R.poligono([[cx - 40, cy - 6], [cx - 34, cy - 18], [cx - 14, cy - 20], [cx - 8, cy - 34], [cx + 20, cy - 34], [cx + 28, cy - 18], [cx + 46, cy - 16], [cx + 48, cy - 4], [cx - 40, cy - 2]], K);
    R.poligono([[cx - 38, cy - 6], [cx - 33, cy - 17], [cx - 13, cy - 19], [cx - 7, cy - 32], [cx + 19, cy - 32], [cx + 27, cy - 17], [cx + 45, cy - 15], [cx + 46, cy - 5], [cx - 38, cy - 3]], H('#2a2a36'));
    R.rect(cx - 4, cy - 29, cx + 8, cy - 20, H('#a8c8d8')); R.rect(cx + 11, cy - 29, cx + 20, cy - 20, H('#a8c8d8')); R.linea(cx - 3, cy - 28, cx + 1, cy - 28, BL);
    R.linea(cx - 36, cy - 10, cx + 46, cy - 10, H('#4a4a5a')); R.rect(cx + 9, cy - 17, cx + 10, cy - 6, K); R.rect(cx + 2, cy - 14, cx + 6, cy - 13, H('#a8a8b0'));
    for (const wx of [cx - 24, cx + 30]) { R.disco(wx, cy, 9, K); R.disco(wx, cy, 7, H('#2a2a30')); R.disco(wx, cy, 3, H('#c8c8d0')); R.anillo(wx, cy, 6, H('#4a4a54')); }
    R.disco(cx + 50, cy - 10, 6, K); R.disco(cx + 50, cy - 10, 4, H('#3a3a44')); R.disco(cx - 42, cy - 12, 3, H('#f0e8c0')); R.pset(cx - 43, cy - 13, BL);
    R.rect(cx - 36, cy + 4, cx + 44, cy + 6, H('#3a3530'));
    // la piedra en el suelo, junto al camino (gris, redondeada)
  });
  // la luz entre las hojas y las hojas que caen; una ardilla en el tronco
  for (let k = 0; k < 5; k++) { const x = Math.round((hh(k, 1, 98) * 300 + t * 12) % 320), y = Math.round((hh(k, 2, 98) * 100 + t * 14 + k * 30) % 120) + 24; R.pset(x + Math.round(Math.sin(t * 3 + k) * 2), y, k % 2 ? H('#c8902a') : H('#a8702a')); R.pset(x + 1 + Math.round(Math.sin(t * 3 + k) * 2), y, H('#8a5a24')); }
  { const s = (t * 0.35) % 1, y = Math.round(100 - s * 70), x = 108; if (y > 30) { R.rect(x, y, x + 4, y + 5, H('#8a6a4a')); R.pset(x + 1, y - 1, H('#8a6a4a')); R.linea(x + 4, y + 5, x + 7, y + 1 + Math.round(Math.sin(t * 8) * 2), H('#a88a6a')); R.pset(x + 1, y + 1, K); } }
  pajaros(t, 2, 36, 99);
  for (let k = 0; k < 20; k++) { const x = Math.floor(hh(k, 1, 90) * 320), y = 88 + Math.floor(hh(k, 2, 90) * 18); if (Math.sin(t * 3 + k) > 0.6) R.pset(x, y, BL); }
  // la mujer baja del coche y se acerca; el visitante levanta la piedra en «turned up»
  const ba = tramo(t, NINETEEN - 0.3, CARVED + 0.2), mx = Math.round(lerp(212, 168, ease(ba)));
  R.actor(EL.senora30, mx, 162, t, { dir: -1, anda: ba > 0 && ba < 1, sorpresa: t > MESSAGES - 0.2, dedo: t > CARVED + 0.3 && t < MESSAGES });
  const coge = t > TURNED - 0.2;
  const v = R.actor(EL.senor30, 122, 164, t, { dir: 1, sostiene: coge ? [146, 140] : [140, 160], sorpresa: t > CARVED && t < TURNED, sonrisa: t > MESSAGES });
  const [px, py] = coge ? v.mano : [146, 160];
  { const x = Math.round(px + 6), y = Math.round(py - (coge ? 2 : 0)); R.disco(x, y, 9, K); R.rect(x - 11, y - 6, x + 11, y + 4, K); R.disco(x, y - 1, 8, H('#8a8a86')); R.rect(x - 10, y - 5, x + 10, y + 3, H('#9a9a94')); R.rect(x - 9, y - 6, x + 6, y - 5, H('#b8b8b0'));
    const lu = tramo(t, MESSAGES - 0.1, MESSAGES + 0.3), cr = lu > 0 && Math.sin(t * 10) > -0.4 ? H('#f8e8a0') : H('#5a5a56');
    for (const j of [-3, 0, 3]) R.linea(x - 7, y + j, x + 7 - Math.abs(j), y + j, coge ? cr : H('#6a6a66')); }
};
// ── 10 · las piedras de 1937: florituras y la que se rompe en «hoax» ─────────────────────────────────────────────
const ELEANOR = W(45.5), TODAY2 = W(46.72), DOUBTS2 = W(48.1), HOAX = W(48.64);
const o10 = (t) => {
  const rompe = tramo(t, HOAX - 0.12, HOAX + 0.8);
  const o = { encuadre: 'mesa', camara: 'piedras', floritura: ease(tramo(t, P10 + 0.2, DOUBTS2)), rompe };
  const g = T.hoy(R, t, o);
  const [px, py] = g.piedras ? g.piedras[3] : [264, 102];
  // el guante con un martillito de geólogo baja a la última piedra, la golpea («hoax») y se aparta
  const a = ease(tramo(t, TODAY2, HOAX - 0.4)), b = ease(tramo(t, HOAX + 0.3, HOAX + 0.9));
  if (a > 0 && b < 1) { const golpe = t > HOAX - 0.35 && t < HOAX, alza = golpe ? Math.round((1 - tramo(t, HOAX - 0.35, HOAX - 0.12)) * 10) : (t < HOAX - 0.35 ? 10 : 0);
    const hx = lerp(lerp(310, px + 26, a), 318, b), hy = lerp(lerp(150, py + 10, a), 168, b) - alza;
    // el martillito: mango de madera y cabeza de acero apuntando a la piedra
    R.linea(hx - 4, hy, hx - 18, hy - 2, K); R.linea(hx - 4, hy - 1, hx - 18, hy - 3, H('#a07040'));
    R.rect(hx - 24, hy - 7, hx - 17, hy + 3, K); R.rect(hx - 23, hy - 6, hx - 18, hy + 2, H('#8a9098')); R.pset(hx - 22, hy - 5, H('#c8d0d8'));
    guante(hx + 4, hy, -1); }
  // el polvo de yeso que salta al romperse, y una «!»
  if (rompe > 0 && rompe < 1) for (let k = 0; k < 10; k++) { const a2 = hh(k, 1, 101) * 3.14 + 3.14, r = rompe * (10 + hh(k, 2, 101) * 18); R.pset(Math.round(px + Math.cos(a2) * r), Math.round(py + Math.sin(a2) * r * 0.7), BL); }
  burbuja(px - 30, py - 44, 8, 9, px - 22, py - 30, tramo(t, HOAX + 0.2, HOAX + 0.4), (cx, cy) => R.icono('!', cx - 2, cy - 7, H('#c8303a'), K, 2));
};
const año = (t) => t < P2 ? 1590 : t < P3 ? 2026 : t < P4 ? 1600 : t < P8 ? 2026 : t < P9 ? 1608 : t < TODAY2 ? 1937 : 2026;
const efectos = [[0.9, 'gluglu'], [PROVES - 0.1, 'pop'], [SWORD, 'brillo'], [CORN, 'golpecito'], [W(10.95), 'whoosh'], [DONT - 0.1, 'boing'], [P4 + 0.1, 'papel'], [JOURNAL - 0.05, 'sello'],
  [NAME, 'lapiz'], [SPECIFIC, 'pop'], [JAMESTOWN, 'pop'], [NEVER - 0.25, 'papel'], [MESSAGES, 'brillo'], [ELEANOR, 'lapiz'], [HOAX - 0.02, 'golpecito']];
T.rodar(E, R, [[0, o1], [P2, o2], [P3, o3], [P4, o4], [P5, o5], [P6, o6], [P7, o7], [P8, o8], [P9, o9], [P10, o10]], { efectos, año });
''')
