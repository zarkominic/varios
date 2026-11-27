E = {}

# Lo común de las tres escenas (cada .html es una página aparte): el reparto, el ruido, los búferes y el cielo con
# máscara (las nubes solo se pintan donde el fondo deja ver el cielo).
COMUN = r'''
import { ELENCO_TS as TS } from '/atomo/plato/kits/pixel-chibi.js';
const PZ = T.PIEZAS_TS, K = hex('#0c0a12');
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const capa = (() => { const m = {}; return (clave, dibuja) => { if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; } R.copiar(m[clave]); }; })();
// fondo con cielo: pinta el cielo y luego el resto; devuelve la máscara de lo que sigue siendo cielo
const fondoCielo = (() => { const m = {}; return (clave, cielo, resto) => { let f = m[clave];
  if (!f) { const a = R.nuevo(), b = R.nuevo(), prev = R.usar(a); cielo(); R.usar(b); R.copiar(a); resto(); R.usar(prev);
    const mk = new Uint8Array(320 * 180); for (let i = 0; i < mk.length; i++) mk[i] = a[i] === b[i] ? 1 : 0; f = m[clave] = { b, mk }; }
  R.copiar(f.b); return f.mk; }; })();
// una nube de tres tonos (luz, medio, sombra) que solo se pinta sobre el cielo de la máscara
const BOLAS = [[0, 0, 1], [-0.42, 0.12, 0.72], [0.45, 0.14, 0.7], [-0.2, -0.22, 0.72], [0.22, -0.26, 0.62], [0.7, 0.2, 0.45], [-0.72, 0.2, 0.42]];
const nube = (mk, cx, cy, w, ton) => { const r0 = w / 3.2;
  for (let y = Math.floor(cy - r0 * 1.7); y <= cy + r0 * 0.55; y++) for (let x = Math.floor(cx - w); x <= cx + w; x++) {
    if (x < 0 || x > 319 || y < 0 || y > 179 || !mk[y * 320 + x]) continue;
    let dentro = false, sup = -1; for (const [bx, by, br] of BOLAS) { const dx = x - (cx + bx * w), dy = y - (cy + by * w), r = br * r0; if (dx * dx + dy * dy <= r * r) { dentro = true; sup = Math.max(sup, -dy / r); } }
    if (!dentro) continue; R.pset(x, y, y > cy + r0 * 0.3 ? ton[2] : sup > 0.45 ? ton[0] : sup > 0.2 && ((x + y) & 1) ? ton[0] : ton[1]); } };
// un pájaro (gaviota o paloma lejos) que aletea; solo sobre el cielo
const pajaro = (mk, x, y, t, c) => { x = Math.round(x); y = Math.round(y); const a = Math.floor(t * 6 + x * 0.1) % 2;
  for (const [dx, dy] of a ? [[-2, -1], [-1, 0], [0, 0], [1, 0], [2, -1]] : [[-2, 1], [-1, 0], [0, 0], [1, 0], [2, 1]]) { const X = x + dx, Y = y + dy; if (X >= 0 && X < 320 && Y >= 0 && Y < 180 && mk[Y * 320 + X]) R.pset(X, Y, c); } };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const tinte = (x, y, c, a) => R.pset(x, y, mez(R.pget(x, y), c, a));
'''

E['ts-estado'] = ('El Estado', '''// TS-ESTADO (frase 7), 1985. Tres planos:
// 1. «But in the Soviet Union, what a state employee made didn't belong to him»: el despacho del archivo. Pázhitnov entra
//    por la derecha hasta el globo y señala su disquete, que está en la caja abierta de la mesa; el burócrata, detrás de
//    la mesa, baja el sello rojo de la estrella sobre la carpeta en «made» y cierra la caja con el candado en «him»;
//    Pázhitnov se queda triste. Corta en «Tetris».
// 2. «Tetris belonged to the state, and the state had no idea how»: el pasillo de los despachos del ministerio. El
//    burócrata cruza con la caja cerrada en las manos; se abren las tres puertas una tras otra y de cada una asoma alguien
//    que no sabe qué hacer con ella («?»); en «no idea» el burócrata se rasca la cabeza. Corta en «the West».
// 3. «to the West. And that's where the race began»: la mesa del ministerio de cerca (fondo local): la caja con candado,
//    el reloj de ajedrez, el tablero y el teléfono rojo; el teléfono suena en «West» (llama Occidente) y, en «race», una
//    mano aprieta el botón del reloj de ajedrez: la otra esfera echa a correr.''', COMUN + r'''
const e = (f) => en('estado', f);
const P2 = e(0.37), P3 = e(0.78);
const made = e(0.206), him = e(0.31), estado = e(0.469), idea = e(0.592), como = e(0.652), oeste = e(0.796), carrera = e(0.928);
// la caja de metal con el candado, en pequeño (en la mano): centro x, base y
const cajita = (x, y) => { R.rect(x - 7, y - 8, x + 7, y, K); R.rect(x - 6, y - 7, x + 6, y - 1, hex('#8a909c')); R.rect(x - 6, y - 7, x + 6, y - 6, hex('#c0c6d0'));
  R.rect(x - 6, y - 2, x + 6, y - 1, hex('#5a606c')); R.pset(x - 5, y - 4, hex('#c0c6d0')); R.pset(x + 5, y - 4, hex('#c0c6d0'));
  R.rect(x - 2, y - 5, x + 2, y - 1, K); R.rect(x - 1, y - 4, x + 1, y - 2, hex('#e8b830')); R.pset(x - 1, y - 6, K); R.pset(x + 1, y - 6, K); R.pset(x, y - 7, K); R.pset(x, y - 3, K); };

// ── 1 · el archivo: el sello y la caja ──
const p1 = (t) => {
  const sello = tramo(t, made - 0.35, made) - tramo(t, made + 0.45, made + 0.85);
  const cierra = tramo(t, him - 0.45, him);
  const o = { encuadre: 'pasillo', camara: 'archivo', sello, marca: t > made, caja: cierra, globo: 1 };
  T.centro(R, t, o);
  // Pázhitnov entra por la derecha hasta el globo, señala su disquete y se queda triste cuando el candado se cierra
  const w = tramo(t, 0.15, 1.7), px = Math.round(lerp(326, 252, w));
  R.actor(TS.pazhitnov, px, 162, t, { dir: -1, anda: w > 0 && w < 1, dedo: w >= 1 && t > 1.9 && t < him - 0.15, habla: t > 1.95 && t < made - 0.2,
    sorpresa: t > him - 0.15 && t < him + 0.35, triste: t > him + 0.35 });
  // el burócrata, detrás de la mesa: coge el sello, lo baja en «made», y luego echa el candado a la caja
  const aCaja = tramo(t, made + 0.85, him - 0.5), mx = Math.round(lerp(171, 200, aCaja)), my = Math.round(lerp(lerp(120, 131, sello), 130, aCaja));
  R.actor(TS.burocrata, 152, 146, t, { dir: 1, sostiene: t < him + 0.3 ? [mx, my] : false, enfado: t > made - 0.4 && t < made + 0.5,
    habla: t < made - 0.6 || (t > him + 0.3 && t < him + 0.9), sonrisa: t > him + 0.9 });
  T.centroDelante(R, t, o);
  // la estrella roja del sello salta sobre la carpeta en «made» y el candado sobre la caja en «him»
  if (t > made && t < made + 1.1) { const u = tramo(t, made, made + 0.2), cy = 118 - Math.round(u * 8), r = 3 + Math.round(u * 4);
    const pts = []; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * 0.45 : r; pts.push([Math.round(170 + Math.cos(a) * rr), Math.round(cy + Math.sin(a) * rr)]); }
    R.poligono(pts.map(([x, y]) => [x - 1, y]), K); R.poligono(pts.map(([x, y]) => [x + 1, y]), K); R.poligono(pts.map(([x, y]) => [x, y + 1]), K); R.poligono(pts, hex('#e8302a'));
    for (let k = 0; k < 6; k++) { const a = k * 1.05, d = 9 + u * 5; R.pset(Math.round(170 + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d * 0.7), hex('#ffd0a0')); } }
  if (t > him - 0.05 && t < him + 0.6) R.icono('candado', 201, 112 - Math.round(tramo(t, him - 0.05, him + 0.25) * 5), hex('#ffe08a'), K, 2);
};

// ── 2 · el pasillo del ministerio: nadie sabe qué hacer con la caja ──
const QUIEN = [TS.publica, TS.publico, TS.cientifico];
const p2 = (t) => {
  const pa = tramo(t, P2 + 0.25, P2 + 0.6) - tramo(t, P2 + 1.7, P2 + 2.0);
  const pb = tramo(t, idea - 0.55, idea - 0.15) - tramo(t, como + 1.2, como + 1.5);
  const pc = tramo(t, idea + 0.25, idea + 0.6);
  T.moscu(R, t, { encuadre: 'elorg', camara: 'pasillo', puertas: [pa, pb, pc], hora: 0.15 });
  // quien asoma a cada puerta: sale cuando la puerta está abierta y se encoge con su «?»
  const asoma = [[pa, 53, P2 + 0.75], [pb, 153, idea - 0.05], [pc, 249, idea + 0.75]];
  asoma.forEach(([a, x, cuando], i) => { if (a < 0.7) return;
    R.actor(QUIEN[i], x, 146, t, { dir: i === 2 ? -1 : 1, habla: t > cuando - 0.3 && t < cuando + 0.3, triste: t > cuando + 0.3, sorpresa: t > cuando - 0.6 && t < cuando - 0.3 });
    if (t > cuando && t < cuando + 1.3) R.icono('?', x + 3, 108 - Math.round(tramo(t, cuando, cuando + 0.25) * 6), hex('#ffe890'), K, 2); });
  // el burócrata cruza con la caja cerrada, se para delante de la segunda puerta y se rasca la cabeza
  const w = tramo(t, P2, idea - 0.4), bx = Math.round(lerp(-4, 196, w * (2 - w)));
  const rasca = t > como - 0.1;
  const r = R.actor(TS.burocrata, bx, 166, t, { dir: rasca && t > como + 0.9 ? -1 : 1, anda: w > 0 && w < 1, sostiene: !rasca || t > oeste - 0.05, dedo: rasca && t < oeste - 0.05,
    sorpresa: rasca && t < como + 0.5, enfado: rasca && t > como + 0.5 && t < oeste - 0.05 });
  if (!rasca || t > oeste - 0.05) cajita(r.mano[0], r.mano[1] + 3);
  if (rasca && t < oeste) R.icono('?', bx + 3, 120 - Math.round(tramo(t, como - 0.1, como + 0.2) * 6), hex('#ffe890'), K, 2);
};

// ── 3 · la mesa del ministerio de cerca: el teléfono de Occidente y el reloj de ajedrez (fondo local) ──
const VERDE = [hex('#1e4a32'), hex('#2a5a3e'), hex('#346a48'), hex('#163a26')];
const mesaMinisterio = () => {
  // la pared: papel pintado verde oscuro con su motivo de rombos, la moldura y el friso de madera
  for (let y = 0; y < 62; y++) for (let x = 0; x < 320; x++) { const m = ((x + y * 2) % 14 === 0 || (x - y * 2 + 700) % 14 === 0) && y < 46;
    R.pset(x, y, m ? hex('#3e5a48') : h(x >> 1, y, 2) < 0.1 ? hex('#2e4a3a') : hex('#344e40')); }
  for (let x = 0; x < 320; x++) { R.pset(x, 46, hex('#6a4a2a')); R.pset(x, 47, hex('#8a6438')); R.pset(x, 48, hex('#4a3018')); }
  for (let y = 49; y < 62; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 40 === 0 || x % 40 === 39) ? hex('#3a2410') : y === 49 ? hex('#7a5430') : (h(x, y >> 2, 3) < 0.15 ? hex('#5a3a1c') : hex('#664422')));
  // la ventana de noche (con su marco, la cortina y el alféizar); los tejados nevados y la estrella roja lejos
  R.rect(14, 4, 92, 46, K); R.rect(16, 6, 90, 44, hex('#0e1630'));
  for (let y = 6; y < 45; y++) for (let x = 16; x < 91; x++) if (h(x, y, 5) < 0.04) R.pset(x, y, hex('#2a3a6a'));
  R.poligono([[16, 36], [30, 30], [44, 34], [58, 26], [72, 32], [90, 28], [90, 44], [16, 44]], hex('#1a2238'));
  R.poligono([[16, 38], [30, 32], [44, 36], [58, 28], [72, 34], [90, 30], [90, 32], [72, 36], [58, 30], [44, 38], [30, 34], [16, 40]], hex('#c8d4e8'));
  R.rect(60, 16, 61, 28, hex('#2a2a3a')); R.poligono([[57, 18], [60, 10], [63, 18]], hex('#2a2a3a'));
  for (let y = 6; y < 45; y += 10) for (let x = 64; x < 90; x += 6) R.pset(x, y + 30 > 44 ? 40 : y + 30, hex('#ffd870'));
  R.rect(52, 6, 53, 44, hex('#8a6438')); R.rect(16, 24, 90, 25, hex('#8a6438'));
  for (let y = 4; y < 50; y++) for (let x = 92; x < 104; x++) R.pset(x, y, ((x + (y >> 3)) % 4 === 0) ? hex('#5a1418') : hex('#7a1e22'));
  R.rect(10, 46, 96, 49, hex('#c8c0b0'));
  // el reloj de pared redondo (x 200, y 24) y un diploma de rayas sin letras
  R.disco(204, 24, 14, K); R.disco(204, 24, 13, hex('#8a6438')); R.disco(204, 24, 11, hex('#f2ecd8'));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.pset(Math.round(204 + Math.cos(a) * 9), Math.round(24 + Math.sin(a) * 9), K); }
  R.rect(130, 10, 170, 38, K); R.rect(131, 11, 169, 37, hex('#c8a040')); R.rect(134, 14, 166, 34, hex('#f2ead0'));
  for (let y = 18; y < 32; y += 3) R.rect(138, y, 162 - (y % 2) * 6, y, hex('#8a8070')); R.disco(156, 30, 3, hex('#c8302a'));
  // la mesa: el tapete verde con su pelusa y el canto de madera del fondo
  R.rect(0, 62, 319, 66, hex('#4a2a12')); R.rect(0, 62, 319, 62, hex('#7a4a26'));
  for (let y = 67; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 7); R.pset(x, y, v < 0.08 ? VERDE[3] : v < 0.5 ? VERDE[1] : v < 0.92 ? VERDE[0] : VERDE[2]); }
  // los papeles con renglones (sin letras), el tintero y la pluma (abajo, en el centro)
  for (const [x, y, g] of [[118, 144, -0.05], [128, 150, 0.04]]) { R.poligono([[x, y], [x + 62, y + g * 62], [x + 66, y + 40 + g * 62], [x + 4, y + 42]], K); R.poligono([[x + 1, y + 1], [x + 61, y + g * 62 + 1], [x + 65, y + 39 + g * 62], [x + 5, y + 41]], hex('#ece6d4')); }
  for (let k = 0; k < 6; k++) R.linea(136, 158 + k * 4, 184 - (k % 3) * 8, 160 + k * 4, hex('#9a9484'));
  R.disco(138, 182, 3, hex('#c8302a'));
  R.rect(198, 158, 212, 170, K); R.rect(199, 159, 211, 169, hex('#2a2a3a')); R.rect(201, 157, 209, 159, hex('#c8a040'));
  R.linea(212, 168, 246, 180, K); R.linea(213, 168, 247, 180, hex('#1e1e2a'));
  // el tablero de ajedrez en perspectiva, abajo a la izquierda, con su marco
  R.poligono([[2, 136], [96, 136], [108, 180], [-10, 180]], hex('#3a2010'));
  for (let j = 0; j < 6; j++) for (let i = 0; i < 8; i++) { const y0 = 138 + j * 7, y1 = y0 + 7, l0 = 4 - j * 2, r0 = 94 + j * 2, l1 = l0 - 2, r1 = r0 + 2;
    const xa0 = l0 + (r0 - l0) * i / 8, xb0 = l0 + (r0 - l0) * (i + 1) / 8, xa1 = l1 + (r1 - l1) * i / 8, xb1 = l1 + (r1 - l1) * (i + 1) / 8;
    R.poligono([[Math.round(xa0), y0], [Math.round(xb0), y0], [Math.round(xb1), y1], [Math.round(xa1), y1]], (i + j) % 2 ? hex('#5a3418') : hex('#e8d4a8')); }
};
// una pieza de ajedrez (peón o torre) de pie en (x, base)
const pieza = (x, y, blanca, torre) => { const c = blanca ? hex('#f2ecd8') : hex('#2a2430'), s = blanca ? hex('#c8bca0') : hex('#141018');
  R.rect(x - 4, y - 2, x + 4, y, K); R.rect(x - 3, y - 2, x + 3, y - 1, c); R.rect(x - 3, y - 9, x + 3, y - 3, K); R.rect(x - 2, y - 8, x + 2, y - 3, c); R.rect(x + 1, y - 8, x + 2, y - 3, s);
  if (torre) { R.rect(x - 4, y - 13, x + 4, y - 8, K); R.rect(x - 3, y - 12, x + 3, y - 9, c); R.pset(x - 1, y - 12, K); R.pset(x + 1, y - 12, K); }
  else { R.disco(x, y - 11, 3, K); R.disco(x, y - 11, 2, c); R.pset(x - 1, y - 12, blanca ? hex('#ffffff') : hex('#5a5466')); } };
// una esfera del reloj de ajedrez: centro, radio, el ángulo de la aguja y si corre (con la banderita roja)
const esfera = (cx, cy, a, corre, bandera) => { R.disco(cx, cy, 15, K); R.disco(cx, cy, 14, hex('#c8a040')); R.disco(cx, cy, 12, corre ? hex('#fff8e0') : hex('#e8e0c8'));
  for (let k = 0; k < 12; k++) { const b = k * Math.PI / 6, r = k % 3 ? 10 : 9; R.pset(Math.round(cx + Math.cos(b) * r), Math.round(cy + Math.sin(b) * r), K); if (!(k % 3)) R.pset(Math.round(cx + Math.cos(b) * 10), Math.round(cy + Math.sin(b) * 10), K); }
  R.linea(cx, cy, Math.round(cx + Math.cos(a - Math.PI / 2) * 9), Math.round(cy + Math.sin(a - Math.PI / 2) * 9), hex('#c8302a'));
  R.linea(cx, cy, Math.round(cx + Math.cos(a / 12 - Math.PI / 2) * 6), Math.round(cy + Math.sin(a / 12 - Math.PI / 2) * 6), K); R.disco(cx, cy, 1, K);
  // la banderita: caída cuando no corre, levantada cuando la aguja se acerca
  const bx = cx + 6, by = cy - 11; R.linea(bx, by, bx + (bandera ? 1 : 4), by - (bandera ? 5 : 2), K); R.rect(bx + (bandera ? 1 : 3), by - (bandera ? 6 : 4), bx + (bandera ? 4 : 6), by - (bandera ? 4 : 2), hex('#e8302a')); };
const p3 = (t) => {
  capa('mesaMinisterio', mesaMinisterio);
  // la nieve que cae por la ventana, recortada a su hueco
  R.recorte([16, 6, 90, 44]); for (let k = 0; k < 26; k++) { const x = 16 + ((h(k, 1, 9) * 74 + t * 6 + Math.sin(t + k) * 3) % 74 + 74) % 74, y = 6 + ((h(k, 2, 9) * 38 + t * (10 + k % 3 * 4)) % 38); R.pset(Math.round(x), Math.round(y), k % 3 ? hex('#e8eef8') : hex('#9aa8c8')); } R.recorte(null);
  // el segundero del reloj de pared
  { const a = t * Math.PI / 30 * 6; R.linea(204, 24, Math.round(204 + Math.cos(a) * 9), Math.round(24 + Math.sin(a) * 9), hex('#c8302a')); R.linea(204, 24, 204, 17, K); R.linea(204, 24, 209, 24, K); R.disco(204, 24, 1, K); }
  // la caja de metal con el candado (a la izquierda, grande): el disquete encerrado se ve por la mirilla
  R.rect(14, 82, 92, 134, K); R.rect(15, 83, 91, 133, hex('#7a808c')); R.rect(15, 83, 91, 92, hex('#a8aeb8')); R.rect(15, 83, 91, 84, hex('#d0d6de'));
  R.rect(15, 128, 91, 133, hex('#4a505c')); for (const x of [19, 87]) for (const y of [88, 104, 124]) { R.pset(x, y, hex('#d0d6de')); R.pset(x + 1, y + 1, hex('#3a404a')); }
  R.rect(15, 92, 91, 93, K); R.rect(30, 100, 60, 118, K); R.rect(31, 101, 59, 117, hex('#1a1c24')); PZ.disquete(R, 45, 117, {}); R.rect(31, 101, 59, 102, hex('#5a606c'));
  for (let x = 31; x < 60; x += 4) R.linea(x, 101, x, 117, hex('#3a404a'));
  R.rect(70, 90, 80, 100, K); R.rect(71, 91, 79, 99, hex('#c0c6d0'));
  R.rect(68, 106, 84, 124, K); R.rect(69, 107, 83, 123, hex('#e8b830')); R.rect(69, 107, 83, 109, hex('#ffe08a')); R.rect(80, 108, 83, 123, hex('#b88820'));
  R.rect(71, 96, 72, 106, K); R.rect(80, 96, 81, 106, K); R.rect(72, 95, 80, 96, K); R.rect(75, 113, 77, 117, K); R.pset(76, 118, K);
  R.linea(14, 136, 92, 136, VERDE[3]); R.linea(16, 137, 92, 137, VERDE[3]);
  // el reloj de ajedrez (a la derecha): la caja de madera, las dos esferas y los dos pulsadores
  const g = tramo(t, carrera - 0.08, carrera), pulsado = g >= 1;
  R.poligono([[198, 106], [298, 106], [306, 152], [190, 152]], K); R.poligono([[199, 107], [297, 107], [304, 151], [191, 151]], (x, y) => (h(x >> 2, y, 11) < 0.15 || (x + y * 3) % 17 === 0 ? hex('#6a3a18') : hex('#8a5228')));
  R.rect(191, 146, 304, 151, hex('#5a3010')); R.linea(199, 107, 297, 107, hex('#b87a40')); R.linea(190, 153, 306, 153, VERDE[3]);
  const ai = pulsado ? 3.2 : 1.2 + t * 0.9, ad = pulsado ? 0.6 + (t - carrera) * 9 : 0.6;
  esfera(224, 128, ai, !pulsado, false); esfera(272, 128, ad, pulsado, pulsado && (t - carrera) % 0.6 < 0.3);
  // los pulsadores: el de la izquierda arriba hasta que se aprieta el de la derecha
  const yi = pulsado ? 94 : 100, yd = pulsado ? 100 : 94;
  R.rect(218, yi, 230, 106, K); R.rect(219, yi + 1, 229, 106, hex('#c8c0b0')); R.rect(219, yi + 1, 229, yi + 2, hex('#f2ecd8'));
  R.rect(266, yd, 278, 106, K); R.rect(267, yd + 1, 277, 106, hex('#c8c0b0')); R.rect(267, yd + 1, 277, yd + 2, hex('#f2ecd8'));
  if (pulsado && t < carrera + 0.3) for (let k = 0; k < 5; k++) { const a = -Math.PI * (0.15 + k * 0.17); R.linea(Math.round(272 + Math.cos(a) * 12), Math.round(96 + Math.sin(a) * 10), Math.round(272 + Math.cos(a) * 18), Math.round(96 + Math.sin(a) * 15), hex('#fff2a0')); }
  // las piezas del ajedrez: saltan con el golpe
  const bote = pulsado && t < carrera + 0.4 ? Math.round(Math.abs(Math.sin((t - carrera) * 16)) * 3 * (1 - (t - carrera) / 0.4)) : 0;
  for (const [x, y, b, tr] of [[20, 152, 1, 1], [42, 160, 0, 0], [64, 150, 1, 0], [84, 170, 0, 1], [30, 176, 0, 0], [70, 178, 1, 0]]) pieza(x, y - bote, b, tr);
  // el teléfono rojo: suena en «West» (llama Occidente), tiembla y el auricular salta
  const suena = t > oeste - 0.1 && t < carrera - 0.3, tb = suena ? Math.round(Math.sin(t * 60)) : 0;
  PZ.telefonoRojo(R, 124 + tb, 128, { s: 2, descolgado: false });
  if (suena) { const f = Math.floor(t * 8) % 2; for (const s of [-1, 1]) { R.linea(124 + s * 22, 104 + f, 124 + s * 27, 100 + f, hex('#ffe890')); R.linea(124 + s * 23, 109, 124 + s * 29, 108, hex('#ffe890')); } }
  // el vaso de té con su soporte, que humea
  R.rect(156, 102, 170, 128, K); R.rect(157, 103, 169, 127, hex('#a8a8b4')); R.rect(158, 104, 168, 112, hex('#b8622a')); R.rect(157, 116, 169, 126, hex('#8a8a96'));
  for (let x = 159; x < 168; x += 3) R.rect(x, 117, x, 125, hex('#c8c8d4'));
  for (let k = 0; k < 3; k++) { const s = (t * 0.6 + k / 3) % 1; R.pset(Math.round(161 + k * 3 + Math.sin(t * 3 + k) * 2), Math.round(100 - s * 22), hex('#c8d0d8')); }
  // la mano que aprieta el reloj en «race» (brazo canónico desde la derecha)
  const llega = tramo(t, carrera - 1.0, carrera - 0.08), vy = Math.round(lerp(132, 96, llega) + (pulsado ? 2 : 0));
  if (llega > 0) T.brazo(R, 336, 150, Math.round(lerp(316, 282, llega)), vy, '#3a3e4a', -1, { codo: [Math.round(lerp(330, 312, llega)), Math.round(lerp(140, 124, llega))] });
  if (pulsado && t < carrera + 1.4) R.icono('!', 241, 76 - Math.round(tramo(t, carrera, carrera + 0.2) * 4), hex('#ffe890'), K, 2);
};
const efectos = [[made, 'sello'], [him, 'cerrojo'], [P2 + 0.3, 'puerta'], [idea - 0.5, 'puerta'], [idea + 0.3, 'puerta'], [oeste, 'ring'], [carrera, 'golpecito'], [carrera + 0.3, 'tic']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1985 });
''')

E['ts-budapest'] = ('Budapest', '''// TS-BUDAPEST (frase 8), 1986, con cartela. Cuatro planos:
// 1. «In 1986, a Hungarian-born British software dealer»: la calle del instituto de Budapest (fondo local): Stein, con
//    traje, bigote y maletín, llega por la acera, las palomas echan a volar a su paso, el tranvía amarillo cruza al
//    fondo del puente y él entra por el portal, que se abre. Corta en «Robert».
// 2. «Robert Stein saw Tetris running at an institute in Budapest. He thought it was brilliant»: la oficina del
//    instituto: una empleada juega en el ordenador; Stein se acerca por detrás de la mesa, se sorprende en «saw Tetris»,
//    señala la pantalla y da un salto de alegría en «brilliant».
// 3. «and sent a telex to Moscow asking for the rights»: el télex de cerca: la mano de Stein teclea y la cinta empieza a
//    salir sin parar y se amontona por la mesa (gag 3). Corta en «Pajitnov».
// 4. «Pajitnov sent back a careful maybe, and Stein took it as a firm yes»: dos cuadros (fondo local): a la izquierda
//    Moscú de noche, Pázhitnov teclea en su télex y se encoge con un «?»; la señal viaja por el hilo del telégrafo de
//    arriba; a la derecha Budapest de día, la hoja sale con el «?» y, en «firm yes», Stein salta y el «?» se vuelve «!»;
//    la cinta sigue llenando su oficina (gag 3).''', COMUN + r'''
const b = (f) => en('budapest', f);
const P2 = b(0.2404), P3 = b(0.548), P4 = b(0.7552);
const dealer = b(0.197), vio = b(0.293), tetris = b(0.3155), budapest = b(0.444), genial = b(0.5166), telex = b(0.596), moscu = b(0.6315), derechos = b(0.7054);
const devuelve = b(0.79), quiza = b(0.8268), stein = b(0.896), firme = b(0.9545);
const maletin = (x, y) => { R.rect(x - 5, y - 1, x + 5, y + 7, K); R.rect(x - 4, y, x + 4, y + 6, hex('#5a3418')); R.rect(x - 4, y, x + 4, y, hex('#8a5428')); R.pset(x - 2, y + 1, hex('#e8b830')); R.pset(x + 2, y + 1, hex('#e8b830')); R.rect(x - 2, y - 3, x + 2, y - 2, K); };

// ── 1 · la calle del instituto (fondo local) ──
const CI = [hex('#7ab8e8'), hex('#92c8f0'), hex('#b4dcf6')], NU = [hex('#ffffff'), hex('#dfe8f2'), hex('#aeb8cc')];
const OC = [hex('#e2b878'), hex('#cc9c5c'), hex('#a87a40'), hex('#f2d498')];
const cieloCalle = () => { for (let y = 0; y < 110; y++) for (let x = 0; x < 320; x++) { const u = y / 110 + (h(x, y, 1) - 0.5) * 0.14; R.pset(x, y, u < 0.34 ? CI[0] : u < 0.68 ? CI[1] : CI[2]); } };
const ventanaAlta = (x, y, w, hgt, fronton) => {
  R.rect(x - 2, y - 2, x + w + 2, y + hgt + 3, OC[3]); R.rect(x - 1, y - 1, x + w + 1, y + hgt + 1, K);
  for (let j = 0; j < hgt; j++) for (let i = 0; i < w; i++) R.pset(x + i, y + j, (i + j * 0.6) % 9 < 1.4 ? hex('#8ab0d0') : j < hgt * 0.4 ? hex('#3a5a7a') : hex('#2a4060'));
  R.rect(x + (w >> 1), y, x + (w >> 1), y + hgt - 1, hex('#f2ecd8')); R.rect(x, y + Math.round(hgt * 0.38), x + w - 1, y + Math.round(hgt * 0.38), hex('#f2ecd8'));
  R.rect(x - 3, y + hgt + 2, x + w + 3, y + hgt + 4, OC[3]); R.rect(x - 3, y + hgt + 4, x + w + 3, y + hgt + 4, OC[2]);
  if (fronton) { R.poligono([[x - 4, y - 3], [x + (w >> 1), y - 10], [x + w + 4, y - 3]], OC[3]); R.linea(x - 4, y - 3, x + w + 4, y - 3, OC[2]); R.linea(x + (w >> 1), y - 10, x + w + 4, y - 3, OC[2]); }
  else { R.rect(x - 3, y - 6, x + w + 3, y - 3, OC[3]); R.rect(x - 3, y - 3, x + w + 3, y - 3, OC[2]); R.rect(x + (w >> 1) - 2, y - 6, x + (w >> 1) + 2, y - 3, OC[0]); }
};
const calle = () => {
  // lejos, a la izquierda: la colina de Buda con el palacio de cúpula verde, el Danubio y una torre del puente
  R.poligono([[0, 84], [30, 70], [70, 74], [100, 68], [100, 112], [0, 112]], hex('#7a9a6a'));
  for (let y = 70; y < 112; y++) for (let x = 0; x < 100; x++) if (h(x, y, 4) < 0.18 && y > 74) R.pset(x, y, hex('#5a7a4e'));
  R.rect(18, 56, 70, 72, hex('#c8c0a8')); for (let x = 20; x < 70; x += 5) R.rect(x, 60, x + 2, 66, hex('#8a8474')); R.rect(16, 54, 72, 56, hex('#a8a090'));
  R.disco(44, 48, 9, hex('#4a9a7a')); R.rect(35, 48, 53, 54, hex('#4a9a7a')); R.disco(42, 45, 3, hex('#7ac0a0')); R.rect(43, 32, 44, 39, hex('#3a6a5a'));
  for (let y = 96; y < 122; y++) for (let x = 0; x < 100; x++) R.pset(x, y, (x * 3 + y * 7) % 23 === 0 ? hex('#9ac4e8') : y > 112 ? hex('#3e6a96') : hex('#4a7aa8'));
  // la balaustrada de piedra del muelle, entre el río y la acera
  R.rect(0, 120, 100, 123, hex('#d8d0bc')); R.rect(0, 123, 100, 123, hex('#9a9282')); R.rect(0, 136, 100, 140, hex('#c8c0aa')); R.rect(0, 136, 100, 136, hex('#e8e0cc'));
  for (let x = 2; x < 100; x += 6) { R.rect(x, 124, x + 3, 135, hex('#c8c0aa')); R.rect(x + 1, 127, x + 2, 131, hex('#b0a892')); R.rect(x + 3, 124, x + 3, 135, hex('#9a9282')); }
  for (let y = 124; y < 136; y++) for (let x = 0; x < 100; x++) if ((x - 2) % 6 > 3) R.pset(x, y, y > 130 ? hex('#3e6a96') : hex('#4a7aa8'));
  R.rect(66, 66, 80, 104, hex('#b8ae96')); R.rect(69, 72, 77, 90, hex('#4a4438')); R.disco(73, 72, 4, hex('#4a4438')); R.rect(64, 64, 82, 66, hex('#968c76'));
  R.linea(80, 70, 100, 86, hex('#3a3a46')); R.linea(80, 72, 100, 88, hex('#3a3a46')); R.rect(0, 102, 100, 104, hex('#6a6a74'));
  // la columna de anuncios redonda (carteles de rayas y dibujos, sin letras)
  R.rect(80, 92, 98, 140, K); R.rect(81, 93, 97, 140, hex('#3a5a4a')); R.disco(89, 90, 10, K); R.disco(89, 90, 9, hex('#3a5a4a')); R.disco(89, 82, 3, hex('#3a5a4a'));
  R.rect(82, 98, 96, 110, hex('#e8d0a0')); R.disco(88, 104, 3, hex('#c8302a')); R.rect(91, 101, 95, 102, hex('#2a5ac8'));
  R.rect(82, 112, 96, 126, hex('#f2ecd8')); for (let y = 114; y < 126; y += 3) R.rect(84, y, 94, y, hex('#3a8a5a'));
  R.rect(82, 128, 96, 138, hex('#e8a020')); R.rect(84, 130, 90, 136, hex('#2a2a3a')); R.rect(95, 93, 96, 140, hex('#2a4a3a'));
  // la fachada del instituto: estuco ocre, el almohadillado de la planta baja, las cornisas y las ventanas con frontón
  for (let y = 18; y < 140; y++) for (let x = 100; x < 320; x++) { const baja = y > 104;
    R.pset(x, y, baja && ((y - 105) % 7 === 0 || ((x + (Math.floor((y - 105) / 7) % 2) * 9) % 18 === 0)) ? OC[2] : h(x >> 1, y >> 1, 2) < 0.07 ? OC[1] : (x + y) % 37 === 0 ? OC[3] : OC[0]); }
  R.rect(98, 14, 319, 18, OC[3]); R.rect(98, 18, 319, 19, OC[2]); for (let x = 100; x < 320; x += 4) R.rect(x, 20, x + 1, 22, OC[3]);
  R.rect(98, 62, 319, 64, OC[3]); R.rect(98, 65, 319, 65, OC[2]); R.rect(98, 102, 319, 104, OC[3]); R.rect(98, 104, 319, 104, OC[2]);
  for (const x of [112, 148, 248, 284]) { ventanaAlta(x, 30, 16, 26, true); ventanaAlta(x, 72, 16, 24, false); ventanaAlta(x + 2, 112, 12, 16, false); }
  ventanaAlta(194, 30, 24, 26, true);
  // el balcón con balaustres sobre el portal
  R.rect(184, 60, 228, 62, OC[3]); R.rect(184, 70, 228, 72, OC[2]); for (let x = 186; x < 228; x += 4) { R.rect(x, 63, x + 1, 69, OC[3]); R.pset(x + 1, 66, OC[2]); }
  // el portal en arco con la puerta de madera de dos hojas (la escena la abre), las pilastras y el escudo de piedra liso
  R.rect(186, 72, 226, 140, OC[3]); R.rect(190, 76, 222, 140, K); R.disco(206, 92, 16, K);
  for (const x of [182, 226]) { R.rect(x, 72, x + 4, 140, OC[3]); R.rect(x + 4, 72, x + 4, 140, OC[2]); }
  R.disco(206, 66, 5, OC[3]); R.disco(206, 66, 3, OC[2]);
  // la acera de losas, el bordillo y la calzada adoquinada con las vías del tranvía
  for (let y = 140; y < 156; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x + (y - 140) * 2) % 24 === 0 || y === 147 ? hex('#8a8478') : h(x >> 1, y, 6) < 0.1 ? hex('#a8a294') : hex('#b8b2a4'));
  R.rect(0, 156, 319, 158, hex('#d0cabc')); R.rect(0, 159, 319, 159, hex('#6a665c'));
  for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 160) / 4), bx = (x + f * 3) % 7; R.pset(x, y, (y - 160) % 4 === 0 || bx === 0 ? hex('#4a4640') : h(x >> 1, y, 8) < 0.2 ? hex('#7a746a') : hex('#6a645a')); }
  for (const y of [166, 174]) { R.rect(0, y, 319, y, hex('#c8c8d0')); R.rect(0, y + 1, 319, y + 1, hex('#3a3a40')); }
  // la farola de hierro de dos brazos y el árbol (tronco; la copa se mece en la escena)
  R.rect(150, 70, 152, 156, K); R.rect(151, 70, 151, 156, hex('#3a3a46')); R.rect(146, 150, 156, 156, K); R.linea(140, 74, 162, 74, K);
  for (const x of [140, 162]) { R.rect(x - 3, 74, x + 3, 82, K); R.rect(x - 2, 75, x + 2, 81, hex('#f2e8b0')); R.poligono([[x - 4, 74], [x, 70], [x + 4, 74]], K); }
  R.rect(32, 104, 36, 152, hex('#5a3a1c')); R.rect(33, 104, 33, 152, hex('#7a5430')); R.rect(28, 150, 40, 152, hex('#3a2a14'));
};
const p1 = (t) => {
  const mk = fondoCielo('calle', cieloCalle, calle);
  // nubes de tres tonos a tres velocidades y gaviotas
  for (let k = 0; k < 5; k++) { const v = [3, 5, 8][k % 3], w = [22, 16, 12][k % 3]; nube(mk, ((k * 83 + t * v) % 400) - 40, 8 + (k * 13) % 40, w, NU); }
  for (let k = 0; k < 3; k++) pajaro(mk, ((k * 110 + t * (14 + k * 4)) % 360) - 20, 28 + k * 9 + Math.sin(t * 2 + k) * 3, t + k, hex('#2a2a3a'));
  // el tranvía amarillo cruza el puente al fondo (detrás de la columna de anuncios)
  { const x = Math.round(((t * 22) % 260) - 80); R.recorte([0, 60, 79, 112]); R.poligono([[x, 92], [x + 46, 92], [x + 46, 101], [x, 101]], hex('#e8c020')); for (let k = 0; k < 6; k++) R.poligono([[x + 3 + k * 7, 94], [x + 7 + k * 7, 94], [x + 7 + k * 7, 97], [x + 3 + k * 7, 97]], hex('#3a5a7a')); R.linea(x, 101, x + 46, 101, hex('#8a6a10')); R.recorte(null); }
  // la copa del árbol que se mece
  { const s = Math.round(Math.sin(t * 1.3) * 1.5); for (const [dx, dy, r, c] of [[0, 0, 15, '#3a6a2a'], [-10, 8, 11, '#3a6a2a'], [10, 6, 12, '#3a6a2a'], [-3, -4, 11, '#4a8a3a'], [6, -2, 8, '#5aa04a'], [-8, 2, 6, '#5aa04a']]) R.disco(34 + dx + s, 92 + dy, r, hex(c)); }
  // dos personas asomadas a las ventanas del primer piso: una sacude un mantel
  { const a = Math.sin(t * 5) > 0, X = 249; R.rect(X, 80, X + 14, 95, hex('#2a3a50')); R.rect(X + 3, 81, X + 11, 90, hex('#f0c8a0')); R.rect(X + 2, 79, X + 12, 82, hex('#8a5a2a')); R.pset(X + 5, 85, K); R.pset(X + 9, 85, K); R.pset(X + 7, 88, hex('#c86a5a')); R.rect(X + 1, 90, X + 13, 96, hex('#3a7a5a'));
    R.poligono([[X + 14, 92], [X + 27, a ? 90 : 94], [X + 27, a ? 98 : 102], [X + 14, 98]], hex('#f2f2f2')); for (let x = X + 16; x < X + 27; x += 3) R.pset(x, 95, hex('#c8302a')); for (let k = 0; k < 3; k++) if (a) R.pset(X + 29 + k * 2, 100 + k * 3 + Math.floor(t * 4) % 3, hex('#e8e0cc')); }
  // la bandera húngara que ondea sobre el portal
  R.rect(205, 40, 206, 72, K); for (let i = 0; i < 22; i++) { const o = Math.round(Math.sin(t * 6 - i * 0.4) * 1.5); for (let j = 0; j < 12; j++) R.pset(207 + i, 41 + j + o, j < 4 ? hex('#d8302a') : j < 8 ? hex('#f6f2ec') : hex('#3a8a4a')); }
  // las hojas del portal se abren cuando llega Stein
  const abre = tramo(t, dealer - 0.6, dealer - 0.1);
  R.disco(206, 92, 15, hex('#e8c890')); R.rect(191, 92, 221, 140, hex('#e8c890')); R.rect(194, 120, 218, 140, hex('#c8a870'));
  for (const s of [-1, 1]) { const wv = Math.round(15 * (1 - abre * 0.8)), x0 = s < 0 ? 191 : 221 - wv;
    R.rect(x0, 78, x0 + wv, 140, hex('#5a3418')); R.rect(x0 + 1, 82, x0 + wv - 1, 108, hex('#6a4020')); R.rect(x0 + 1, 112, x0 + wv - 1, 138, hex('#6a4020')); if (wv > 4) R.pset(s < 0 ? x0 + wv - 2 : x0 + 2, 110, hex('#e8b830')); }
  // las palomas de la acera: picotean y echan a volar cuando pasa Stein
  const w = tramo(t, 0.2, dealer - 0.3), sx = Math.round(lerp(-12, 200, w));
  for (let k = 0; k < 4; k++) { const px = 110 + k * 13, vuela = sx > px - 26, d = vuela ? (t - (0.2 + (px - 14) / 212 * (dealer - 0.5))) : 0;
    const x = px + (vuela ? d * 40 : 0), y = 151 - (vuela ? d * 46 : (Math.floor(t * 3 + k) % 3 === 0 ? 1 : 0));
    if (y < -4) continue; R.rect(Math.round(x) - 2, Math.round(y) - 2, Math.round(x) + 2, Math.round(y), hex('#7a7a8a')); R.pset(Math.round(x) + 2, Math.round(y) - 3, hex('#5a5a6a'));
    if (vuela) { const f = Math.floor(t * 10 + k) % 2; R.linea(Math.round(x) - 3, Math.round(y) - 2 - f * 2, Math.round(x) + 3, Math.round(y) - 2 - f * 2, hex('#9a9aaa')); } else R.pset(Math.round(x) + 2, Math.round(y) - 2, hex('#e88a2a')); }
  // una señora con su perro... (pasea hacia la izquierda junto a la fachada)
  { const x = Math.round(300 - t * 13); R.actor(TS.publica, x, 147, t, { dir: -1, anda: true }); }
  // Stein, con traje y maletín, llega por la acera y entra
  if (t < dealer + 0.1) { const r = R.actor(TS.stein, sx, 154, t, { dir: 1, anda: w > 0 && w < 1, sostiene: [sx + 16, 146], sonrisa: w >= 1 }); maletin(r.mano[0], r.mano[1]); }
  // un Trabant cruza por delante en la calzada
  { const x = Math.round(lerp(-60, 340, tramo(t, 2.4, 6.0))); R.rect(x, 162, x + 34, 172, K); R.rect(x + 1, 163, x + 33, 171, hex('#8ab0c8')); R.poligono([[x + 7, 162], [x + 11, 154], [x + 25, 154], [x + 29, 162]], K); R.poligono([[x + 8, 162], [x + 12, 155], [x + 24, 155], [x + 28, 162]], hex('#8ab0c8'));
    R.poligono([[x + 13, 161], [x + 15, 156], [x + 19, 156], [x + 19, 161]], hex('#d8ecf8')); R.poligono([[x + 21, 161], [x + 21, 156], [x + 23, 156], [x + 26, 161]], hex('#d8ecf8')); R.rect(x + 1, 168, x + 33, 168, hex('#f2f2f2'));
    for (const rx of [x + 7, x + 27]) { R.disco(rx, 172, 4, K); R.disco(rx, 172, 2, hex('#8a8a96')); } R.pset(x + 33, 165, hex('#ffe890')); if (x > 0) { R.pset(x - 3, 170 - Math.floor(t * 8) % 2, hex('#c8c8d0')); R.pset(x - 6, 169, hex('#a8a8b0')); } }
};

// ── 2 · la oficina del instituto: Stein ve el juego ──
const p2 = (t) => {
  const o = { encuadre: 'budapest', cinta: 0 };
  T.occidente(R, t, o);
  // un empleado pasa por detrás con una carpeta, hacia el archivador
  { const x = Math.round(lerp(70, 300, tramo(t, P2 + 0.2, P2 + 4.6))); if (x < 296) { const r = R.actor(TS.publico, x, 170, t, { dir: 1, anda: true, sostiene: true }); R.rect(r.mano[0] - 3, r.mano[1] - 3, r.mano[0] + 3, r.mano[1] + 2, hex('#c8a040')); } }
  // la empleada juega en el ordenador (a la izquierda de la pantalla)
  R.actor(TS.publica, 80, 146, t, { dir: 1, habla: t > vio + 0.2 && t < tetris + 0.9, sonrisa: t > genial });
  // Stein se acerca por detrás de la mesa, se sorprende, señala y salta de alegría en «brilliant»
  const w = tramo(t, P2, P2 + 0.8), x = Math.round(lerp(196, 150, w));
  const salta = t > genial && t < genial + 0.6 ? Math.round(Math.sin((t - genial) / 0.6 * Math.PI) * 6) : 0;
  R.actor(TS.stein, x, 146, t, { dir: -1, anda: w > 0 && w < 1, sorpresa: t > vio - 0.1 && t < tetris + 0.7, dedo: t > tetris + 0.7 && t < genial - 0.1, habla: t > budapest - 0.6 && t < genial - 0.1,
    salto: salta, brazos: t > genial && t < genial + 0.6, sonrisa: t > genial - 0.2 });
  T.occidenteDelante(R, t, o);
  if (t > vio && t < vio + 1.1) R.icono('!', x + 5, 108 - Math.round(tramo(t, vio, vio + 0.2) * 5), hex('#ffe890'), K, 2);
};

// ── 3 · el télex de cerca: la cinta que no para (gag 3) ──
const p3 = (t) => {
  const o = { encuadre: 'budapest', camara: 'telex', cinta: 0.06 + tramo(t, telex - 0.2, P4 + 0.3) * 0.94 };
  T.occidente(R, t, o);
  const teclea = t > telex - 0.5 && t < derechos + 0.3, kx = 140 + Math.round(Math.sin(t * 2.3) * 12), ky = 132 + (teclea && Math.floor(t * 11) % 2 ? 1 : 0);
  T.brazo(R, 112, 200, teclea ? kx : 128, teclea ? ky : 150, '#4a4a5a', 1, { codo: [110, 178] });
  T.occidenteDelante(R, t, o);
};

// ── 4 · Moscú y Budapest, cada uno en su cuadro (fondo local) ──
const dosCuadros = () => {
  // la pared oscura con su papel de rayas finas y el friso
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 6 === 0 ? hex('#1a1c2e') : h(x >> 2, y >> 2, 3) < 0.06 ? hex('#1e2236') : hex('#22263a'));
  // la banda del telégrafo: el cielo de la noche (izquierda) al día (derecha) con postes y el hilo que los une
  for (let y = 18; y < 44; y++) for (let x = 8; x < 312; x++) { const u = (x - 8) / 304 + (h(x, y, 4) - 0.5) * 0.12;
    R.pset(x, y, u < 0.3 ? hex('#141a3a') : u < 0.45 ? hex('#3a3a6a') : u < 0.55 ? hex('#c88a6a') : u < 0.7 ? hex('#9ac8ea') : hex('#7ab8e8')); }
  for (let k = 0; k < 18; k++) { const x = 10 + Math.round(h(k, 3) * 120), y = 20 + Math.round(h(k, 4) * 14); R.pset(x, y, hex('#f2f2ff')); }
  R.disco(36, 26, 4, hex('#f2ecc8')); R.disco(38, 25, 3, hex('#141a3a'));
  R.disco(232, 27, 5, hex('#fff2a0'));
  R.rect(8, 40, 311, 43, hex('#2a3a2a')); for (let x = 8; x < 312; x += 3) R.pset(x, 40 - (x % 7 === 0 ? 1 : 0), hex('#3a5a3a'));
  R.rect(6, 16, 313, 17, hex('#8a6a3a')); R.rect(6, 44, 313, 45, hex('#8a6a3a')); R.rect(6, 16, 7, 45, hex('#8a6a3a')); R.rect(312, 16, 313, 45, hex('#8a6a3a'));
  for (const x of [40, 120, 200, 262]) { R.rect(x, 22, x + 1, 42, hex('#3a2a1a')); R.rect(x - 4, 23, x + 5, 24, hex('#3a2a1a')); R.pset(x - 3, 22, hex('#c8c8d0')); R.pset(x + 4, 22, hex('#c8c8d0')); }
  // los dos cuadros: marcos de madera con su bisel
  for (const [x0, x1] of [[10, 154], [166, 310]]) { R.rect(x0 - 3, 50, x1 + 3, 172, K); R.rect(x0 - 2, 51, x1 + 2, 171, hex('#8a6438')); R.rect(x0 - 2, 51, x1 + 2, 52, hex('#b88a50')); R.rect(x0 - 2, 170, x1 + 2, 171, hex('#5a3a1c')); R.rect(x0, 54, x1, 168, K); }
  // Moscú, de noche: papel pintado azul gris, la ventana con la nieve y la estrella roja, la estantería y el suelo
  for (let y = 55; y < 168; y++) for (let x = 11; x < 154; x++) R.pset(x, y, y > 140 ? ((x + (y >> 2) * 5) % 10 === 0 ? hex('#3a2a1e') : hex('#4a3626')) : (x + y * 2) % 12 === 0 ? hex('#3a4258') : hex('#30384c'));
  R.rect(22, 64, 66, 112, K); R.rect(24, 66, 64, 110, hex('#0e1630')); R.poligono([[24, 98], [40, 90], [52, 96], [64, 92], [64, 110], [24, 110]], hex('#1a2238'));
  R.rect(46, 78, 47, 92, hex('#2a2a3a')); R.poligono([[43, 80], [46, 72], [50, 80]], hex('#2a2a3a')); R.rect(43, 66, 44, 110, hex('#5a4a3a')); R.rect(24, 86, 64, 87, hex('#5a4a3a'));
  R.rect(112, 60, 150, 130, hex('#3a2416')); for (let k = 0; k < 4; k++) { R.rect(112, 74 + k * 18, 150, 75 + k * 18, hex('#5a3a22')); for (let i = 0; i < 9; i++) R.rect(114 + i * 4, 62 + k * 18, 116 + i * 4, 73 + k * 18, hex(['#8a2a2a', '#2a4a7a', '#c8a040', '#3a6a3a'][(i + k) % 4])); }
  R.rect(14, 140, 112, 142, hex('#5a3a22')); R.rect(18, 142, 22, 160, hex('#3a2416')); R.rect(102, 142, 106, 160, hex('#3a2416')); R.rect(14, 136, 112, 140, hex('#6a4a2e'));
  // Budapest, de día: pared crema, ventana con el sol y el Danubio, el archivador, el reloj y el parqué
  for (let y = 55; y < 168; y++) for (let x = 167; x < 310; x++) R.pset(x, y, y > 140 ? ((x + (y % 4) * 3) % 8 === 0 ? hex('#9a6a3a') : hex('#b8844a')) : y > 120 ? hex('#7a8a7a') : h(x >> 1, y >> 1, 5) < 0.06 ? hex('#e8dcb8') : hex('#f2e8c8'));
  R.rect(167, 120, 309, 121, hex('#4a5a4a'));
  R.rect(244, 62, 296, 108, K); R.rect(246, 64, 294, 106, hex('#9ac8ea')); R.rect(246, 92, 294, 106, hex('#4a7aa8')); R.disco(282, 74, 5, hex('#fff2a0'));
  R.rect(252, 82, 258, 98, hex('#b8ae96')); R.rect(278, 82, 284, 98, hex('#b8ae96')); R.linea(258, 84, 278, 92, hex('#3a3a46'));
  R.rect(269, 64, 270, 106, hex('#f2ecd8')); R.rect(246, 84, 294, 85, hex('#f2ecd8'));
  R.disco(196, 70, 7, K); R.disco(196, 70, 6, hex('#f6f2e6')); R.linea(196, 70, 196, 66, K); R.linea(196, 70, 199, 70, K);
  R.rect(170, 136, 236, 138, hex('#6a4a2e')); R.rect(174, 138, 178, 160, hex('#5a3a22')); R.rect(228, 138, 232, 160, hex('#5a3a22')); R.rect(170, 132, 236, 136, hex('#8a6438'));
};
// un rizo de cinta de papel perforada por el suelo
const rizo = (x, y, r) => { for (let a = 0; a < 6.3; a += 0.35) { const px = Math.round(x + Math.cos(a) * r), py = Math.round(y + Math.sin(a) * r * 0.6); R.pset(px, py, hex('#f2ecd8')); R.pset(px, py + 1, hex('#c8c0a8')); } };
const p4 = (t) => {
  capa('dosCuadros', dosCuadros);
  // la nieve de Moscú y las nubes de Budapest, cada una en su ventana
  R.recorte([24, 66, 64, 110]); for (let k = 0; k < 16; k++) { const x = 24 + ((h(k, 1) * 40 + t * 5) % 40), y = 66 + ((h(k, 2) * 44 + t * (9 + k % 3 * 3)) % 44); R.pset(Math.round(x), Math.round(y), hex('#e8eef8')); }
  R.recorte([246, 64, 294, 91]); for (let k = 0; k < 2; k++) { const x = Math.round(((t * (4 + k * 3) + k * 30) % 80) + 230); R.disco(x, 70 + k * 8, 4, hex('#ffffff')); R.disco(x + 5, 71 + k * 8, 3, hex('#ffffff')); R.disco(x + 2, 73 + k * 8, 3, hex('#dfe8f2')); } R.recorte(null);
  // la lámpara de Moscú que oscila un poco y su luz
  { const s = Math.round(Math.sin(t * 1.4) * 2); R.linea(80, 55, 80 + s, 70, hex('#5a5a6a')); R.poligono([[73 + s, 74], [80 + s, 69], [87 + s, 74]], hex('#2a6a40')); R.rect(78 + s, 74, 82 + s, 75, hex('#fff2b0'));
    for (let y = 76; y < 136; y++) for (let x = 60; x < 104; x++) if (Math.abs(x - 80 - s) < (y - 74) * 0.32 && ((x + y) & 1) && h(x, y, 2) > 0.5) tinte(x, y, hex('#fff2b0'), 0.12); }
  // los dos télex en sus mesas
  PZ.telex(R, 62, 136, { t, cinta: 0.05 }); PZ.telex(R, 202, 132, { t, cinta: 0.05 });
  // la señal viaja por el hilo de arriba, de Moscú a Budapest, en «sent back»
  const viaje = tramo(t, devuelve - 0.1, quiza + 0.3);
  { const sag = (x) => 30 + Math.round(Math.sin((x - 40) / 80 * Math.PI) * 3);
    for (let x = 40; x <= 262; x++) R.pset(x, (x - 40) % 80 > 78 ? 26 : sag(((x - 40) % 80) + 40), hex('#1a1a22'));
    if (viaje > 0 && viaje < 1) { const x = Math.round(lerp(40, 262, viaje)); R.disco(x, sag(((x - 40) % 80) + 40), 3, hex('#ffe890')); R.disco(x, sag(((x - 40) % 80) + 40), 1, hex('#ffffff')); for (let k = 1; k < 4; k++) R.pset(Math.round(lerp(40, 262, Math.max(0, viaje - k * 0.02))), 30, hex('#c8a040')); } }
  // Pázhitnov teclea su respuesta y se encoge: «a careful maybe»
  R.actor(TS.pazhitnov, 72, 156, t, { dir: -1, habla: t > devuelve - 0.4 && t < quiza, brazos: t > quiza - 0.1 && t < quiza + 0.9, sonrisa: t > quiza + 0.9 });
  if (t > quiza - 0.1 && t < quiza + 1.8) R.icono('?', 76, 112 - Math.round(tramo(t, quiza - 0.1, quiza + 0.2) * 5), hex('#ffe890'), K, 2);
  // en Budapest: la cinta que sigue saliendo y llena el suelo (gag 3)
  const lleno = 0.4 + tramo(t, P4, firme + 0.6) * 0.6;
  for (let k = 0; k < Math.round(lleno * 16); k++) rizo(176 + Math.round(h(k, 5) * 128), 146 + Math.round(h(k, 6) * 20), 3 + Math.round(h(k, 7) * 3));
  { let px = 218, py = 128; for (let i = 0; i < 40; i++) { const nx = 218 + i * 2, ny = 128 + Math.round(Math.min(i, 8) * 2 + Math.sin(i * 0.7 + t * 4) * 2); if (nx > 306) break; R.linea(px, py, nx, ny, hex('#f2ecd8')); R.pset(nx, ny + 1, hex('#c8c0a8')); px = nx; py = ny; } }
  // la hoja de la respuesta sale del télex de Stein con su «?» (que se vuelve «!» en «firm yes»)
  const hoja = tramo(t, quiza, quiza + 0.6), si = t > firme;
  if (hoja > 0) { const y0 = Math.round(108 - hoja * 16); R.rect(193, y0, 211, 112, K); R.rect(194, y0 + 1, 210, 111, hex('#f6f2e6')); for (let y = y0 + 3; y < 110; y += 3) R.linea(196, y, 208, y, hex('#b8b0a0'));
    if (hoja >= 1) { R.rect(196, 94, 208, 108, hex('#f6f2e6')); R.icono(si ? '!' : '?', si ? 199 : 197, 94, si ? hex('#2a8a3a') : hex('#3a3a6a'), hex('#f6f2e6'), 2); } }
  // Stein lee la hoja, duda y salta con los brazos arriba en «firm yes»
  const salta = t > firme && t < firme + 0.7 ? Math.round(Math.sin((t - firme) / 0.7 * Math.PI) * 7) : 0;
  R.actor(TS.stein, 228, 158, t, { dir: -1, sorpresa: t > quiza + 0.6 && t < stein, habla: t > stein && t < firme - 0.1, dedo: t > stein + 0.3 && t < firme - 0.1, salto: salta, brazos: t > firme, sonrisa: t > firme - 0.1 });
  if (si && t < firme + 1.4) R.icono('!', 232, 112 - Math.round(tramo(t, firme, firme + 0.2) * 6), hex('#ffe890'), K, 2);
  if (si) for (let k = 0; k < 6; k++) { const a = k * 1.05 + t * 3, r = 10 + ((t - firme) * 20) % 10; R.pset(Math.round(202 + Math.cos(a) * r), Math.round(100 + Math.sin(a) * r * 0.7), hex('#ffe890')); }
};
const efectos = [[dealer - 0.6, 'puerta'], [1.4, 'whoosh'], [vio, 'brillo'], [genial, 'boing'], [telex, 'tecleo'], [moscu, 'maquina'], [devuelve, 'bip'], [quiza, 'papel'], [firme, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, cartela: '1986', año: 1986 });
''')

E['ts-maxwell'] = ('Maxwell', '''// TS-MAXWELL (frase 9), 1987 → 1988. Cuatro planos:
// 1. «Without a signed contract, Stein sold the rights to Mirrorsoft, a British company»: el despacho alto del magnate
//    en Londres: Stein y el ejecutivo se dan la mano sobre la alfombra en «sold the rights» (el contrato, sin firmar,
//    pasa a la mesa); detrás de la mesa, el magnate, grande y con cejas pobladas, firma. Corta en «owned».
// 2. «owned by the newspaper tycoon Robert Maxwell, and to its American partner Spectrum HoloByte»: la nave de las
//    rotativas (fondo local): el papel corre por los rodillos, los periódicos salen en cinta; el magnate entra en
//    «tycoon» y señala orgulloso; en «American partner» una carretilla saca una caja con la banderita de EE. UU.
// 3. «In 1988, Tetris reached American stores in a box with Red Square and its onion domes on it»: la tienda de
//    informática de EE. UU.: un cliente entra en «stores», el dependiente enciende el foco del escaparate en «box» y
//    el cliente señala la caja de la Plaza Roja en «Red Square». Corta en «The first».
// 4. «The first Soviet video game ever sold in America»: el mostrador de cerca (fondo local): la mano del cliente deja
//    la caja y los billetes; la caja registradora marca el precio y el cajón se abre con su campanilla en «sold».''', COMUN + r'''
const m = (f) => en('maxwell', f);
const P2 = m(0.217), P3 = m(0.5246), P4 = m(0.8476);
const contrato = m(0.03), vende = m(0.079), derechos = m(0.1077), mirror = m(0.131), britanica = m(0.183);
const magnate = m(0.271), maxwell = m(0.324), socio = m(0.391), spectrum = m(0.436);
const tetris = m(0.5945), tiendas = m(0.646), caja = m(0.693), plaza = m(0.722), cupulas = m(0.773);
const sovietico = m(0.865), vendido = m(0.939), america = m(0.969);

// ── 1 · la torre de Londres: el apretón de manos sin contrato firmado ──
const p1 = (t) => {
  const o = { encuadre: 'torre' };
  T.occidente(R, t, o);
  // Stein llega desde la izquierda y el ejecutivo desde la derecha; se dan la mano en «sold the rights»
  const ws = tramo(t, 0.1, vende - 0.2), we = tramo(t, 0.3, vende - 0.2);
  const sx = Math.round(lerp(14, 70, ws)), ex = Math.round(lerp(150, 92, we));
  const junto = ws >= 1 && we >= 1, sacude = junto && t < derechos + 1.2 ? Math.round(Math.sin(t * 16)) * 2 : 0;
  const pm = [86, 148 + sacude];
  R.actor(TS.stein, sx, 164, t, { dir: 1, anda: ws > 0 && ws < 1, sostiene: junto && t < derechos + 1.2 ? pm : false, sonrisa: junto, habla: t > derechos + 1.2 && t < britanica });
  // el ejecutivo lleva el contrato sin firmar y, tras el apretón, lo deja en la mesa del magnate
  const lleva = tramo(t, derechos + 1.3, britanica - 0.2), ex2 = Math.round(lerp(ex, 150, lleva));
  const re = R.actor(TS.ejecutivoMirror, ex2, 164, t, { dir: lleva > 0 && lleva < 1 ? 1 : -1, anda: (we > 0 && we < 1) || (lleva > 0 && lleva < 1), sostiene: junto && t < derechos + 1.2 ? [pm[0] + 1, pm[1]] : true, sonrisa: junto });
  if (!(junto && t < derechos + 1.2) && lleva < 1) { R.rect(re.mano[0] - 3, re.mano[1] - 5, re.mano[0] + 3, re.mano[1] + 3, K); R.rect(re.mano[0] - 2, re.mano[1] - 4, re.mano[0] + 2, re.mano[1] + 2, hex('#f6f2e6')); }
  // el magnate detrás de la mesa: habla por teléfono y luego firma
  const firma = t > britanica - 0.1;
  const rm = R.actor(TS.maxwell, 220, 144, t, { dir: -1, habla: t < derechos, sostiene: firma ? [246 + Math.round(Math.sin(t * 14) * 2), 136] : false, enfado: t > derechos && t < britanica - 0.1, sonrisa: firma });
  T.occidenteDelante(R, t, o);
  // el contrato en la mesa (sin firma hasta que el magnate firma) y la pluma en su mano
  if (lleva >= 1) { R.poligono([[238, 138], [258, 138], [260, 142], [236, 142]], K); R.poligono([[239, 138], [257, 138], [259, 141], [237, 141]], hex('#f6f2e6')); R.linea(240, 139, 254, 139, hex('#b8b0a0'));
    if (firma) R.linea(244, 140, 244 + Math.round(tramo(t, britanica - 0.1, britanica + 0.6) * 12), 140, hex('#2a4ac8')); }
  if (firma) R.linea(rm.mano[0], rm.mano[1], rm.mano[0] + 3, rm.mano[1] - 6, hex('#1a1a22'));
  if (t > contrato - 0.2 && t < vende) R.icono('X', 236, 118, hex('#ff8a7a'), K, 2);
};

// ── 2 · la nave de las rotativas (fondo local) ──
const AC = [hex('#3a3e4a'), hex('#4a4e5a'), hex('#5a6070'), hex('#2a2c36')];
const VE = [hex('#2e5a46'), hex('#3e6e56'), hex('#5a8a70'), hex('#1e3e30')];
// el camino del papel por la rotativa: de la bobina, arriba y abajo entre los rodillos, hasta la plegadora
const CAMINO = [[22, 118], [40, 84], [66, 84], [76, 122], [102, 122], [112, 84], [138, 84], [148, 122], [174, 122], [184, 84], [206, 84], [222, 112]];
const LARGO = (() => { let L = 0; for (let i = 1; i < CAMINO.length; i++) L += Math.hypot(CAMINO[i][0] - CAMINO[i - 1][0], CAMINO[i][1] - CAMINO[i - 1][1]); return L; })();
const enCamino = (u) => { let d = u * LARGO; for (let i = 1; i < CAMINO.length; i++) { const [x0, y0] = CAMINO[i - 1], [x1, y1] = CAMINO[i], l = Math.hypot(x1 - x0, y1 - y0); if (d <= l) return [x0 + (x1 - x0) * d / l, y0 + (y1 - y0) * d / l]; d -= l; } return CAMINO[CAMINO.length - 1]; };
const cieloNave = () => { for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) { const u = y / 70 + (h(x, y, 2) - 0.5) * 0.16; R.pset(x, y, u < 0.4 ? hex('#8aa8c8') : u < 0.75 ? hex('#a8c0d8') : hex('#c8d4e0')); } };
const nave = () => {
  // por los ventanales: Londres gris (la cúpula, las agujas, los tejados) — se pinta antes que la pared, que deja los huecos
  R.poligono([[0, 60], [20, 52], [30, 56], [52, 50], [70, 56], [96, 48], [120, 54], [150, 46], [176, 52], [200, 50], [230, 56], [260, 48], [290, 54], [320, 50], [320, 70], [0, 70]], hex('#7a8698'));
  R.disco(160, 36, 9, hex('#6a7688')); R.rect(151, 36, 169, 48, hex('#6a7688')); R.rect(159, 22, 160, 28, hex('#6a7688')); R.rect(146, 44, 174, 48, hex('#6a7688'));
  for (const [x, hh] of [[60, 16], [240, 20], [270, 12]]) { R.rect(x, 50 - hh, x + 2, 52, hex('#6a7688')); R.poligono([[x - 1, 50 - hh], [x + 1, 44 - hh], [x + 3, 50 - hh]], hex('#6a7688')); }
  // la pared de ladrillo, con los tres ventanales de hierro (huecos) y las columnas de acero roblonadas
  const hueco = (x, y) => y > 8 && y < 58 && ((x > 18 && x < 88) || (x > 118 && x < 188) || (x > 218 && x < 288));
  for (let y = 0; y < 134; y++) for (let x = 0; x < 320; x++) { if (hueco(x, y)) { if ((x - 18) % 10 === 0 || (y - 8) % 10 === 0) R.pset(x, y, hex('#2a2c36')); continue; }
    const f = y >> 2, bx = (x + (f % 2) * 6) % 12; R.pset(x, y, y % 4 === 0 || bx === 0 ? hex('#5a3a2e') : h(x >> 2, f, 3) < 0.2 ? hex('#8a4a36') : h(x >> 2, f, 4) < 0.1 ? hex('#6a3a2a') : hex('#7a4232')); }
  for (const x0 of [18, 118, 218]) { R.rect(x0 - 2, 6, x0 + 72, 8, AC[0]); R.rect(x0 - 2, 58, x0 + 72, 61, hex('#a8a090')); R.rect(x0 - 2, 61, x0 + 72, 61, hex('#6a6458')); }
  for (const x of [100, 200, 300]) { R.rect(x - 4, 0, x + 4, 134, K); R.rect(x - 3, 0, x + 3, 134, AC[1]); R.rect(x - 1, 0, x + 1, 134, AC[2]); for (let y = 6; y < 134; y += 10) { R.pset(x - 3, y, AC[2]); R.pset(x + 3, y, AC[2]); } }
  // la pasarela con su barandilla y los tubos con sus llaves de paso
  R.rect(0, 64, 319, 67, AC[0]); R.rect(0, 64, 319, 64, AC[2]); R.rect(0, 74, 319, 75, AC[2]); for (let x = 2; x < 320; x += 10) R.rect(x, 66, x, 75, AC[2]);
  for (let x = 0; x < 320; x += 20) { R.linea(x, 67, x + 10, 72, AC[3]); R.linea(x + 10, 72, x + 20, 67, AC[3]); }
  R.rect(0, 100, 319, 103, hex('#8a6a3a')); R.rect(0, 100, 319, 100, hex('#b8945a')); R.rect(0, 106, 319, 108, hex('#4a6a8a')); R.rect(0, 106, 319, 106, hex('#6a8aaa'));
  for (const x of [46, 156, 252]) { R.rect(x, 97, x + 5, 104, K); R.rect(x + 1, 98, x + 4, 103, hex('#c8302a')); R.rect(x - 2, 95, x + 7, 96, hex('#c8302a')); }
  // el cartel de seguridad (el casco y el triángulo, sin letras), el reloj de fichar y el extintor
  R.rect(232, 78, 252, 96, K); R.rect(233, 79, 251, 95, hex('#e8c020')); R.poligono([[242, 81], [249, 93], [235, 93]], K); R.poligono([[242, 84], [247, 92], [237, 92]], hex('#e8c020')); R.rect(241, 86, 242, 89, K);
  R.rect(276, 78, 296, 98, K); R.rect(277, 79, 295, 97, hex('#c8c0b0')); R.disco(286, 86, 6, K); R.disco(286, 86, 5, hex('#f6f2e6')); R.rect(280, 93, 292, 95, K);
  R.rect(306, 110, 312, 128, K); R.rect(307, 111, 311, 127, hex('#c8302a')); R.rect(307, 111, 311, 112, hex('#e8605a'));
  // el suelo de hormigón: juntas, manchas de tinta, el charco y la franja de peligro amarilla y negra
  for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y - 134) % 15 === 0 || (x + (y - 134)) % 64 === 0 ? hex('#56565e') : h(x >> 1, y >> 1, 5) < 0.07 ? hex('#5e5e66') : hex('#6c6c74'));
  for (let x = 0; x < 320; x++) for (let y = 152; y < 155; y++) R.pset(x, y, ((x + y) >> 2) % 2 ? hex('#d8b030') : hex('#1a1a22'));
  for (const [x, y, r] of [[60, 168, 5], [250, 164, 4], [178, 176, 3]]) { R.disco(x, y, r, hex('#3a3a46')); R.pset(x - 1, y - 1, hex('#5a5a6a')); }
  R.poligono([[120, 170], [150, 168], [158, 173], [124, 176]], hex('#4a5a70')); R.linea(126, 171, 146, 170, hex('#8aa0c0'));
  // la rotativa: dos cuerpos de hierro verde con su bastidor, los engranajes del costado y la plegadora
  for (const [x0, x1] of [[30, 90], [102, 162], [174, 216]]) { R.rect(x0, 76, x1, 134, K); R.rect(x0 + 1, 77, x1 - 1, 133, VE[0]); R.rect(x0 + 1, 77, x1 - 1, 79, VE[2]); R.rect(x1 - 4, 77, x1 - 1, 133, VE[3]);
    for (let y = 82; y < 132; y += 8) { R.pset(x0 + 3, y, VE[2]); R.pset(x1 - 6, y, VE[2]); } R.rect(x0 + 2, 128, x1 - 2, 133, VE[3]); }
  R.rect(26, 134, 222, 138, K); R.rect(27, 134, 221, 136, AC[1]);
  R.rect(214, 98, 236, 134, K); R.rect(215, 99, 235, 133, VE[1]); R.rect(215, 99, 235, 101, VE[2]); R.rect(236, 116, 318, 122, K); R.rect(237, 117, 317, 121, AC[2]); for (let x = 240; x < 318; x += 6) R.pset(x, 119, AC[3]);
  R.rect(244, 122, 248, 152, AC[3]); R.rect(306, 122, 310, 152, AC[3]);
  // las pilas de periódicos atados (rayas de titulares, sin letras) y el palé de bobinas de papel
  for (const [x, y, n] of [[252, 150, 4], [280, 150, 3]]) for (let k = 0; k < n; k++) { const yy = y - k * 5; R.rect(x, yy - 5, x + 22, yy, K); R.rect(x + 1, yy - 4, x + 21, yy - 1, hex('#e8e2d0')); R.rect(x + 2, yy - 4, x + 9, yy - 4, hex('#1a1a22')); R.rect(x + 11, yy - 3, x + 19, yy - 3, hex('#8a8478')); R.rect(x + 10, yy - 5, x + 11, yy, hex('#a87a40')); }
  R.rect(0, 168, 34, 172, hex('#8a6a3a')); for (const [x, y] of [[8, 160], [24, 160], [16, 150]]) { R.disco(x, y, 8, K); R.disco(x, y, 7, hex('#f2ecd8')); R.disco(x, y, 4, hex('#e2dcc8')); R.disco(x, y, 2, AC[0]); }
};
const p2 = (t) => {
  const mk = fondoCielo('nave', cieloNave, nave);
  // las nubes de Londres que pasan por los ventanales y unas palomas
  for (let k = 0; k < 4; k++) { const v = [2, 4, 6][k % 3], w = [18, 14, 10][k % 3]; nube(mk, ((k * 97 + t * v) % 380) - 30, 14 + (k * 11) % 26, w, [hex('#eef2f6'), hex('#ccd6e0'), hex('#9aa8b8')]); }
  for (let k = 0; k < 2; k++) pajaro(mk, ((k * 150 + t * 18) % 360) - 20, 22 + k * 10, t + k, hex('#3a3a46'));
  // las lámparas industriales que cuelgan y se mecen, con su luz
  for (const [x, f] of [[60, 0], [160, 1.3], [258, 2.1]]) { const s = Math.round(Math.sin(t * 1.1 + f) * 2); R.linea(x, 0, x + s, 18, K); R.poligono([[x + s - 8, 24], [x + s - 3, 18], [x + s + 3, 18], [x + s + 8, 24]], AC[0]); R.rect(x + s - 8, 24, x + s + 8, 24, AC[3]); R.rect(x + s - 2, 25, x + s + 2, 26, hex('#fff2b0')); }
  // los rodillos que giran y el papel que corre entre ellos, con la tinta de las páginas
  for (let i = 1; i < CAMINO.length - 1; i++) { const [x, y] = CAMINO[i], arriba = y < 100; const cy = arriba ? y + 4 : y - 4; R.disco(x, cy, 6, K); R.disco(x, cy, 5, AC[2]); R.disco(x, cy, 3, AC[1]); const a = t * 9 + x; R.linea(x, cy, Math.round(x + Math.cos(a) * 4), Math.round(cy + Math.sin(a) * 4), AC[3]); }
  for (let i = 1; i < CAMINO.length; i++) { const [x0, y0] = CAMINO[i - 1], [x1, y1] = CAMINO[i]; R.linea(x0, y0, x1, y1, hex('#f2ecd8')); R.linea(x0 + 1, y0, x1 + 1, y1, hex('#d8d2c0')); }
  for (let k = 0; k < 22; k++) { const [x, y] = enCamino((t * 0.35 + k / 22) % 1); R.pset(Math.round(x), Math.round(y), hex('#1a1a22')); }
  // los engranajes del costado, que giran
  for (const [x, y, r] of [[60, 108, 9], [132, 108, 9], [196, 110, 7]]) { R.disco(x, y, r, K); R.disco(x, y, r - 1, hex('#8a8a96')); R.disco(x, y, r - 4, AC[1]);
    for (let k = 0; k < 8; k++) { const a = t * (r === 7 ? -2 : 2) + k * Math.PI / 4; R.rect(Math.round(x + Math.cos(a) * r) - 1, Math.round(y + Math.sin(a) * r) - 1, Math.round(x + Math.cos(a) * r) + 1, Math.round(y + Math.sin(a) * r) + 1, hex('#8a8a96')); } R.disco(x, y, 1, hex('#e8e0cc')); }
  // la bobina gira y los periódicos plegados salen por la cinta y caen en la pila
  { R.disco(16, 116, 13, K); R.disco(16, 116, 12, hex('#f2ecd8')); for (let r = 3; r < 12; r += 3) R.disco(16, 116, r, (r % 2) ? hex('#e2dcc8') : hex('#f2ecd8')); R.disco(16, 116, 2, AC[0]); const a = t * 3; R.linea(16, 116, Math.round(16 + Math.cos(a) * 10), Math.round(116 + Math.sin(a) * 10), hex('#c8c0a8')); }
  for (let k = 0; k < 4; k++) { const u = (t * 0.45 + k / 4) % 1, x = Math.round(lerp(232, 316, u)); R.rect(x, 111, x + 12, 116, K); R.rect(x + 1, 112, x + 11, 115, hex('#e8e2d0')); R.rect(x + 2, 112, x + 6, 112, hex('#1a1a22')); R.rect(x + 8, 113, x + 10, 114, hex('#c8302a')); }
  R.linea(286, 86, 286 + Math.round(Math.cos(t * 0.8) * 4), 86 + Math.round(Math.sin(t * 0.8) * 4), K);
  // un operario cruza la pasarela y otro vigila la rotativa
  { const x = Math.round(((t * 16) % 380) - 30); R.actor(TS.operario, x, 64, t, { dir: 1, anda: true }); }
  R.actor(TS.operario, 92, 150, t, { dir: 1, habla: t > P2 + 0.4 && t < P2 + 1.2, sorpresa: t > magnate - 0.2 && t < magnate + 0.4, sonrisa: t > magnate + 0.4 });
  // el magnate entra en «tycoon», se para en el centro y señala la rotativa, orgulloso
  const w = tramo(t, P2 + 0.1, magnate + 0.5), mx = Math.round(lerp(-20, 140, w * (2 - w)));
  const rc = tramo(t, socio - 0.6, socio + 0.5);
  R.actor(TS.maxwell, mx, 168, t, { dir: rc > 0.6 ? 1 : w >= 1 ? -1 : 1, anda: w > 0 && w < 1, dedo: (t > maxwell - 0.3 && t < socio - 0.3) || (t > spectrum - 0.2 && t < spectrum + 0.8), sonrisa: t > maxwell - 0.3, habla: t > socio && t < spectrum + 1.2 });
  // la carretilla con la caja para el socio americano (la banderita de EE. UU.) llega por la derecha y se para junto a él
  if (rc > 0) { const cx = Math.round(lerp(330, 176, rc * (2 - rc)));
    R.rect(cx - 2, 156, cx + 34, 158, K); R.rect(cx + 34, 140, cx + 36, 172, K); R.disco(cx + 6, 172, 3, K); R.disco(cx + 6, 172, 1, AC[2]); R.disco(cx + 28, 172, 3, K); R.disco(cx + 28, 172, 1, AC[2]); R.rect(cx - 2, 166, cx + 34, 168, AC[0]);
    R.rect(cx + 2, 134, cx + 32, 166, K); R.rect(cx + 3, 135, cx + 31, 165, hex('#c8964a')); R.rect(cx + 3, 135, cx + 31, 137, hex('#e2b06a')); R.linea(cx + 3, 135, cx + 31, 165, hex('#a87a40')); R.linea(cx + 31, 135, cx + 3, 165, hex('#a87a40'));
    R.rect(cx + 9, 142, cx + 25, 154, K); for (let j = 0; j < 11; j++) R.rect(cx + 10, 143 + j, cx + 24, 143 + j, j % 2 ? hex('#f6f2ec') : hex('#c8302a')); R.rect(cx + 10, 143, cx + 16, 148, hex('#2a4a9a')); R.pset(cx + 12, 145, hex('#ffffff')); R.pset(cx + 14, 146, hex('#ffffff'));
    R.actor(TS.operario, cx + 36, 176, t, { dir: -1, anda: rc < 1, sonrisa: rc >= 1, sostiene: [cx + 36, 150] }); }
};

// ── 3 · la tienda de informática de EE. UU., 1988 ──
const p3 = (t) => {
  const o = { encuadre: 'torre', camara: 'tienda' };
  T.occidente(R, t, o);
  // el foco del escaparate se enciende sobre la caja en «box»: un haz y destellos
  const foco = tramo(t, caja - 0.3, caja + 0.1);
  if (foco > 0) { for (let y = 22; y < 98; y++) for (let x = 20; x < 86; x++) if (Math.abs(x - 52) < (y - 18) * 0.28 && ((x + y) & 1) && h(x, y, 3) < foco * 0.55) tinte(x, y, hex('#fff6c0'), 0.3);
    for (let k = 0; k < 4; k++) { const a = t * 2 + k * 1.6; R.pset(Math.round(52 + Math.cos(a) * 26), Math.round(70 + Math.sin(a) * 30), hex('#ffffff')); } }
  // un niño juega en el ordenador de demostración
  R.actor(TS.publico, 158, 154, t, { dir: 1, habla: Math.sin(t * 1.7) > 0.5, sonrisa: t > tetris });
  // el dependiente detrás del mostrador: saluda y señala el escaparate en «box»
  R.actor(TS.tendero, 266, 144, t, { dir: -1, habla: t > tiendas && t < caja - 0.3, dedo: t > caja - 0.3 && t < cupulas, sonrisa: t > cupulas });
  // el cliente entra por la puerta en «stores», se acerca al escaparate y señala la caja en «Red Square»
  const w = tramo(t, tetris - 0.4, tiendas + 0.6), w2 = tramo(t, caja - 0.2, plaza);
  const cx = Math.round(lerp(lerp(108, 150, w), 72, w2)), entra = t > tetris - 0.4;
  if (entra) R.actor(TS.publica, cx, 166, t, { dir: w2 > 0 ? -1 : 1, anda: (w > 0 && w < 1) || (w2 > 0 && w2 < 1), dedo: t > plaza && t < cupulas + 0.6, sorpresa: t > plaza - 0.1 && t < plaza + 0.4, sonrisa: t > cupulas + 0.2 });
  T.occidenteDelante(R, t, o);
  if (t > plaza && t < plaza + 1.2) R.icono('!', cx + 4, 128 - Math.round(tramo(t, plaza, plaza + 0.2) * 5), hex('#ffe890'), K, 2);
};

// ── 4 · el mostrador de cerca: la primera venta (fondo local) ──
const mostrador = () => {
  // la pared de listones con las estanterías de cajas de programas (sin letras) y el póster espacial
  for (let y = 0; y < 98; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 12 === 0 ? hex('#8a6a4a') : h(x, y >> 2, 2) < 0.08 ? hex('#b8946a') : hex('#c8a47a'));
  for (const y of [34, 70]) { R.rect(0, y, 230, y + 3, hex('#5a3a22')); R.rect(0, y, 230, y, hex('#8a6438'));
    for (let k = 0; k < 13; k++) { const x = 6 + k * 17, hh = 20 + (k % 3) * 3, c = ['#2a5ac8', '#c8302a', '#e8a020', '#3a8a4a', '#6a3aa8'][(k + y) % 5];
      R.rect(x, y - hh, x + 13, y - 1, K); R.rect(x + 1, y - hh + 1, x + 12, y - 1, hex(c)); R.rect(x + 3, y - hh + 4, x + 10, y - hh + 10, hex('#f2ecd8')); R.disco(x + 6, y - hh + 7, 2, hex(c)); R.rect(x + 2, y - 5, x + 11, y - 4, mez(hex(c), K, 0.4)); } }
  R.rect(242, 8, 300, 60, K); R.rect(243, 9, 299, 59, hex('#141a3a')); for (let k = 0; k < 20; k++) R.pset(244 + Math.round(h(k, 1) * 54), 10 + Math.round(h(k, 2) * 48), hex('#f2f2ff'));
  R.disco(262, 40, 9, hex('#c8603a')); R.disco(265, 37, 3, hex('#e8905a')); R.poligono([[282, 20], [290, 34], [274, 34]], hex('#c8c8d0')); R.rect(278, 34, 286, 50, hex('#c8c8d0')); R.poligono([[278, 50], [286, 50], [289, 56], [275, 56]], hex('#e8a020'));
  // el canto del mostrador de laminado, con su sombra
  R.rect(0, 98, 319, 104, hex('#f2ecd8')); R.rect(0, 98, 319, 98, hex('#ffffff')); R.rect(0, 104, 319, 106, hex('#8a8478'));
  for (let y = 107; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x >> 1, y >> 1, 9) < 0.05 ? hex('#d8d0bc') : (x + y) % 41 === 0 ? hex('#f2ecd8') : hex('#e6dec8'));
  // el cuenco de caramelos y el dispensador de cinta, el bloc de recibos y el bolígrafo con cadena
  R.disco(30, 122, 14, K); R.disco(30, 122, 13, hex('#b8d8e8')); for (let k = 0; k < 12; k++) R.disco(22 + (k % 5) * 4, 116 + Math.floor(k / 5) * 4, 1, hex(['#c8302a', '#3a8a4a', '#e8a020'][k % 3]));
  R.rect(16, 122, 44, 136, K); R.rect(17, 122, 43, 135, hex('#a8c8d8'));
  R.rect(60, 150, 104, 176, K); R.rect(61, 151, 103, 175, hex('#f6f2e6')); for (let y = 156; y < 174; y += 4) R.linea(64, y, 100, y, hex('#a8c0d0')); R.rect(61, 151, 103, 153, hex('#c8302a'));
  R.linea(104, 168, 130, 160, K); R.linea(104, 169, 130, 161, hex('#2a4ac8'));
  // la caja registradora beis grande, a la derecha (el visor, las teclas y el cajón los pinta la escena)
  R.rect(210, 62, 312, 150, K); R.rect(211, 63, 311, 149, hex('#d8cfb8')); R.rect(211, 63, 311, 66, hex('#ece6d4')); R.rect(300, 63, 311, 149, hex('#b8ae96'));
  R.rect(226, 50, 296, 66, K); R.rect(227, 51, 295, 65, hex('#2a2a32')); R.rect(229, 53, 293, 63, hex('#0a1a10'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) { const x = 218 + i * 13, y = 74 + j * 11; R.rect(x, y, x + 10, y + 8, K); R.rect(x + 1, y + 1, x + 9, y + 6, i > 3 ? hex('#c8302a') : hex('#f2ecd8')); R.rect(x + 1, y + 7, x + 9, y + 7, hex('#8a8478')); }
  R.rect(298, 88, 316, 92, K); R.rect(312, 72, 316, 92, K); R.disco(314, 70, 4, K); R.disco(314, 70, 3, hex('#c8302a'));
};
const p4 = (t) => {
  capa('mostrador', mostrador);
  // el visor de la caja: las cifras del precio aparecen al teclear y el total parpadea
  const marca = tramo(t, P4 + 0.6, sovietico + 0.6);
  if (marca > 0) R.numero(marca < 1 ? String(Math.floor(marca * 39)).padStart(2, '0') + '.95' : '39.95', 261, 62, { centro: true, color: hex('#5aff8a'), sombra: false });
  // las teclas se hunden al marcar
  if (marca > 0 && marca < 1) { const k = Math.floor(t * 8) % 24, x = 218 + (k % 6) * 13, y = 74 + Math.floor(k / 6) * 11; R.rect(x + 1, y + 2, x + 9, y + 7, hex('#a8a090')); }
  // el cajón se abre en «sold», con los billetes y las monedas
  const cajon = tramo(t, vendido - 0.1, vendido + 0.25);
  { const y = 150 + Math.round(cajon * 18); R.rect(208, 150, 314, y + 10, K); R.rect(209, y, 313, y + 9, hex('#c8bea6')); R.rect(250, y + 3, 270, y + 5, hex('#8a8478'));
    if (cajon > 0) { R.rect(212, 151, 310, y - 1, hex('#3a3a42')); for (let k = 0; k < 5; k++) { R.rect(214 + k * 19, 153, 230 + k * 19, Math.max(153, y - 2), hex('#6aa86a')); R.rect(214 + k * 19, 153, 230 + k * 19, 153, hex('#8ac88a')); } } }
  if (cajon > 0 && t < vendido + 1.0) for (let k = 0; k < 5; k++) { const a = -Math.PI * (0.1 + k * 0.2); R.linea(Math.round(314 + Math.cos(a) * 6), Math.round(66 + Math.sin(a) * 6), Math.round(314 + Math.cos(a) * 11), Math.round(66 + Math.sin(a) * 11), hex('#fff2a0')); }
  // la caja del juego: la mano del cliente la desliza sobre el mostrador en «The first»
  const desliza = tramo(t, P4 + 0.1, P4 + 1.0), bx = Math.round(lerp(-30, 140, desliza * (2 - desliza)));
  PZ.cajaJuego(R, bx, 160, { s: 3 });
  // la banderita de EE. UU. del mostrador ondea (y una estrella roja pegada en la caja, soviética)
  R.rect(176, 108, 177, 148, K); for (let i = 0; i < 18; i++) { const o = Math.round(Math.sin(t * 5 - i * 0.5) * 1.2); for (let j = 0; j < 11; j++) R.pset(178 + i, 109 + j + o, i < 8 && j < 6 ? (((i + j) % 2) ? hex('#2a4a9a') : hex('#f6f2ec')) : (j % 2 ? hex('#f6f2ec') : hex('#c8302a'))); }
  R.rect(172, 146, 182, 150, K);
  // la mano deja los billetes en «sold»: el brazo canónico entra desde abajo a la izquierda
  const paga = tramo(t, sovietico - 0.4, vendido - 0.3) - tramo(t, vendido + 0.7, america + 0.9);
  if (desliza < 1) { const mx = bx - 40; T.brazo(R, mx - 34, 192, mx, 150, '#c8302a', 1, { codo: [mx - 22, 176] }); }
  const my = Math.round(lerp(190, 150, paga));
  if (paga > 0) T.brazo(R, 120, 200, 150, my, '#c8302a', 1, { codo: [126, 184] });
  if (t > vendido - 0.3) { const y = t > vendido + 0.7 ? 154 : Math.round(lerp(190, 150, paga)) + 2; for (let k = 0; k < 3; k++) { R.rect(150 + k * 3, y - 6 + k, 172 + k * 3, y + 4 + k, K); R.rect(151 + k * 3, y - 5 + k, 171 + k * 3, y + 3 + k, hex('#8ab88a')); R.disco(161 + k * 3, y - 1 + k, 2, hex('#5a8a5a')); } }
  if (t > america - 0.1 && t < america + 1.2) R.icono('!', 140, 108 - Math.round(tramo(t, america - 0.1, america + 0.15) * 5), hex('#ffe890'), K, 2);
};
const año = (t) => t < P3 ? 1987 : 1988;
const efectos = [[derechos, 'palmada'], [britanica, 'firma'], [magnate, 'maquina'], [socio, 'carro'], [tiendas, 'puerta'], [caja, 'interruptor'], [plaza, 'brillo'], [P4 + 0.6, 'bip'], [vendido, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')
