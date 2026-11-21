E = {}

# piezas comunes de las tres escenas (se pegan al principio de cada cuerpo): trama de Bayer, capas fijas en búfer,
# degradados tramados, vetas de madera, nubes de tres tonos a tres velocidades, pájaros, destellos y un cielo de ciudad
COMUN = r'''
import { ELENCO_NC as NC } from '/atomo/plato/kits/pixel-chibi.js';
const PZ = T.PIEZAS_NC, C = T.C, K = hex('#1c1222');
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const tr = (x, y, a) => a * 16 > BAY[((y & 3) << 2) | (x & 3)] + 0.5;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const lin = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const sv = (u) => u * u * (3 - 2 * u);
const CAPAS = new Map();
// la capa fija de un plano: se pinta una vez en su búfer y en cada fotograma se copia entera
const capa = (k, pintar) => { let b = CAPAS.get(k); if (!b) { b = R.nuevo(); const prev = R.usar(b); pintar(); R.usar(prev); CAPAS.set(k, b); } R.copiar(b); };
const grad = (x0, y0, x1, y1, cols) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i; for (let x = x0; x <= x1; x++) R.pset(x, y, tr(x, y, f) ? cols[i + 1] : cols[i]); } };
const caja = (x0, y0, x1, y1, c, borde = K) => { R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, borde); R.rect(x0, y0, x1, y1, c); };
const cajaR = (x0, y0, x1, y1, c) => { for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, c); };   // respeta R.recorte
const sombrear = (x0, y0, x1, y1, c, a) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (tr(x, y, a)) R.pset(x, y, c); };
// madera con vetas: base, vetas largas onduladas y algún nudo
const vetas = (x0, y0, x1, y1, c, cv, cl, k = 0) => { R.rect(x0, y0, x1, y1, c); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = Math.sin(x * 0.09 + Math.sin(y * 0.7 + k) * 2.2 + y * 1.7 + k); if (v > 0.93) R.pset(x, y, cv); else if (v < -0.97) R.pset(x, y, cl); } for (let n = 0; n < (x1 - x0) * (y1 - y0) / 900; n++) { const nx = x0 + Math.round(hh(n, k, 3) * (x1 - x0)), ny = y0 + Math.round(hh(n, k, 4) * (y1 - y0)); R.pset(nx, ny, cv); R.pset(nx + 1, ny, cv); } };
const nube = (cx, cy, w, c1, c2, c3) => {
  const r = w / 5, P = [[-1.6, .4, .9], [-.6, -.2, 1.2], [.6, -.4, 1.3], [1.6, .3, 1], [0, .5, 1.1]];
  for (const [a, b, q] of P) R.disco(Math.round(cx + a * r), Math.round(cy + b * r + 1), Math.round(q * r), c3);
  for (const [a, b, q] of P) R.disco(Math.round(cx + a * r), Math.round(cy + b * r), Math.round(q * r), c2);
  for (const [a, b, q] of P.slice(1, 3)) R.disco(Math.round(cx + a * r - 1), Math.round(cy + b * r - 1), Math.max(1, Math.round(q * r * .6)), c1);
};
// nubes de tres tonos a tres velocidades entre x0 y x1 (con R.recorte puesto si van en una ventana)
const nubes = (x0, x1, t, y0, y1, cols, n = 6, v = 1, w0 = 12) => { for (let k = 0; k < n; k++) { const c3 = k % 3, vel = (1.5 + c3 * 2.5) * v, w = w0 + c3 * 6 + hh(k, 1) * 8, ancho = x1 - x0 + 2 * w + 20; const x = x0 - w - 10 + ((hh(k, 2) * ancho + t * vel) % ancho), y = y0 + hh(k, 3) * (y1 - y0); nube(x, y, w, cols[0], cols[1], cols[2]); } };
const pajaro = (x, y, t, k, c) => { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 9 + k) > 0 ? 1 : 0; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - a * 2, c); R.pset(x + 2, y - a * 2, c); };
const destello = (x, y, u, c = hex('#fff6c0')) => { if (u <= 0 || u >= 1) return; const r = Math.round(2 + 4 * Math.sin(u * Math.PI)); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } R.pset(x - 1, y - 1, c); R.pset(x + 1, y + 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); };
// un rectángulo de cristal con reflejo diagonal (dentro del hueco)
const reflejo = (x0, y0, x1, y1, c, d = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const s = (x - x0 + (y - y0) * 0.8 + d) % 46; if ((s > 6 && s < 10) || (s > 13 && s < 15)) if (tr(x, y, 0.5)) R.pset(x, y, c); } };
// una figurita de fondo de 7 px que anda (pelo, ropa y piernas)
const figura = (x, y, t, ropa, pelo, k = 0, anda = true) => { x = Math.round(x); const p = anda && Math.floor(t * 6 + k) % 2; R.rect(x - 1, y - 7, x + 1, y - 6, pelo); R.pset(x, y - 6, hex('#e8b090')); R.rect(x - 1, y - 5, x + 1, y - 2, ropa); R.pset(x - 1 + (p ? 0 : 1), y - 1, K); R.pset(x + (p ? 1 : 0), y - 1, K); R.pset(x - 1, y, K); R.pset(x + 1, y, K); };
'''

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nc-goizueta'] = ('Goizueta', '''// NC-GOIZUETA (frase 10, «The new boss, Roberto Goizueta…»), sin cartela; barra en 1983. Tres planos:
// 1. el laboratorio de sabores (colas/sede/laboratorio): Goizueta entra por la izquierda y, en «chemical engineer», se
//    planta y señala la pizarra con los hexágonos; detrás de la isla los dos científicos se vuelven y sonríen en «Cuba»;
//    el investigador entra por la derecha con su tablilla y apunta; el matraz hierve y la bureta gotea. Corta en «decided».
// 2. fondo local: el pasillo de la sede de noche: papel pintado, cuadros, apliques, la ventana a la ciudad con su avión, y
//    la puerta blindada del laboratorio secreto con su ojo de buey verde. Goizueta cruza decidido («attack»), en «In
//    secret» mira a un lado y a otro, y en «scientists» abre la puerta: los dos científicos llegan por la derecha y se
//    meten; la puerta se cierra y la luz se pone roja (cerrojo). Corta en «new».
// 3. fondo local: inserto de la mesa del laboratorio: azulejos, estante de tarros, el reloj de laboratorio. Una mano vierte
//    jarabe en el vaso grande («new recipe»), el agitador se enciende, hace remolino y el jarabe se aclara («smoother»),
//    la mano vuelve con la cuchara y caen tres terrones («sweeter»), y en «Project Kansas» el sello baja desde la derecha,
//    estampa el contorno de Kansas con su estrella en la carpeta y el candado se cierra.''', COMUN + r'''
const g = (f) => en('goizueta', f);
const P2 = g(0.342), P3 = g(0.677);
const INGENIERO = g(0.166), CUBA = g(0.29), ATACA = g(0.376), SECRETO = g(0.517), CIENT = g(0.593);
const SUAVE = g(0.747), DULCE = g(0.786), CLAVE = g(0.885), PROYECTO = g(0.925), KANSAS = g(0.944);
const LAB = { encuadre: 'sede', camara: 'laboratorio' };
const p1 = (t) => {
  T.colas(R, t, LAB);
  // el investigador entra por la derecha con la tablilla y se para a apuntar
  const vi = lin(t, 0.4, 2.6), xi = Math.round(lerp(334, 268, sv(vi)));
  // los dos científicos detrás de la isla: trabajan y se vuelven cuando entra el jefe
  const mira = t > 1.6;
  R.actor(NC.cientifico, 146, 144, t, { dir: mira ? -1 : 1, sonrisa: t > CUBA, habla: t > CUBA + 0.2 && t < CUBA + 0.9 && Math.sin(t * 9) > 0 });
  R.actor(NC.cientifica, 184, 144, t, { dir: mira ? -1 : 1, sonrisa: t > CUBA + 0.15, sorpresa: t > 1.6 && t < 2.2 });
  // Goizueta entra y se planta delante de la campana; en «chemical engineer» señala la pizarra
  const u = lin(t, 0.15, INGENIERO - 0.15), gx = Math.round(lerp(-20, 50, sv(u)));
  R.actor(NC.goizueta, gx, 168, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > INGENIERO && t < CUBA + 0.6, habla: t > INGENIERO + 0.3 && t < P2 - 0.3 && Math.sin(t * 8) > -0.2, sonrisa: t > CUBA + 0.6 });
  // el carrito de acero con dos garrafas de jarabe (detrás del investigador) y la línea amarilla del suelo
  for (let x = 6; x < 316; x += 6) R.rect(x, 174, x + 3, 175, hex('#e8c030'));
  caja(288, 140, 316, 142, hex('#c8ccd4'), hex('#3a3e48')); caja(288, 160, 316, 162, hex('#c8ccd4'), hex('#3a3e48')); R.rect(289, 142, 290, 160, hex('#8a8e98')); R.rect(314, 142, 315, 160, hex('#8a8e98'));
  for (const [gx0, c] of [[292, '#4a2414'], [304, '#6a3418']]) { caja(gx0, 124, gx0 + 9, 139, hex('#d8e4e8'), hex('#3a4a50')); R.rect(gx0 + 1, 128, gx0 + 8, 138, hex(c)); R.rect(gx0 + 3, 120, gx0 + 6, 123, hex('#3a3a3a')); R.pset(gx0 + 1, 126, hex('#ffffff')); }
  caja(293, 150, 311, 159, hex('#c8a06a'), hex('#5a3a1a')); R.rect(293, 154, 311, 154, hex('#a87a4a'));
  for (const wx of [291, 313]) { R.disco(wx, 165, 2, K); R.pset(wx, 165, hex('#8a8e98')); }
  R.actor(NC.investigador, xi, 168, t, { dir: -1, anda: vi > 0 && vi < 1, dedo: vi >= 1 && Math.floor(t * 1.5) % 2 === 0 });
  T.colasDelante(R, t, LAB);
  // la flecha de tiza que se dibuja en la pizarra cuando él la señala
  const f = lin(t, INGENIERO + 0.2, INGENIERO + 1.0);
  if (f > 0) { const x1 = Math.round(lerp(122, 150, f)); R.linea(122, 44, x1, 44, hex('#f4f0e0')); R.linea(122, 45, x1, 45, hex('#c8c4b4')); if (f >= 1) { R.linea(146, 40, 150, 44, hex('#f4f0e0')); R.linea(146, 48, 150, 44, hex('#f4f0e0')); } }
};
// ── el pasillo de la sede de noche ──
const PU = [201, 55, 239, 139];   // el hueco de la puerta blindada
const pasillo = () => capa('pasillo', () => {
  grad(0, 0, 319, 17, [hex('#17131c'), hex('#241e2a'), hex('#2c2532')]);
  for (let x = 6; x < 262; x += 26) R.rect(x, 0, x, 16, hex('#141017')); R.rect(0, 8, 261, 8, hex('#1c1720'));
  for (const lx of [44, 136, 228]) caja(lx - 11, 13, lx + 11, 15, hex('#8a8470'), hex('#0e0b12'));
  // cornisa y pared con papel de rayas verdes (la esquina de Atom, lisa)
  for (let y = 18; y <= 96; y++) for (let x = 0; x < 320; x++) { const raya = x < 262 && Math.floor(x / 5) % 2 === 0; let c = raya ? hex('#2c4136') : hex('#273a30'); if (x < 262 && raya && (x + y * 3) % 23 === 0) c = hex('#36503f'); R.pset(x, y, c); }
  R.rect(262, 18, 319, 96, hex('#26362d')); R.rect(262, 18, 263, 96, hex('#1b2820'));
  for (const sx of [82, 188]) for (let y = 22; y <= 94; y++) for (let x = sx - 30; x <= sx + 30; x++) { const d = Math.hypot((x - sx) / 1.4, y - 52); if (d < 34 && tr(x, y, (1 - d / 34) * 0.9)) R.pset(x, y, x < 262 && Math.floor(x / 5) % 2 === 0 ? hex('#4e6a52') : hex('#43604a')); }
  vetas(0, 17, 319, 21, hex('#5a3a24'), hex('#3e2616'), hex('#7a5232'), 2); R.rect(0, 17, 319, 17, hex('#8a6038')); R.rect(0, 21, 319, 21, hex('#2a180e'));
  // zócalo de nogal con cuarterones
  vetas(0, 96, 319, 139, hex('#4a2c1a'), hex('#311c10'), hex('#62402a'), 5);
  R.rect(0, 96, 319, 98, hex('#6a4426')); R.rect(0, 96, 319, 96, hex('#8a5e36')); R.rect(0, 99, 319, 99, hex('#24140a'));
  for (let x = 4; x < 320; x += 42) { R.rect(x, 104, x + 34, 104, hex('#24140a')); R.rect(x, 104, x, 130, hex('#24140a')); R.rect(x + 1, 131, x + 34, 131, hex('#7a5232')); R.rect(x + 34, 105, x + 34, 131, hex('#7a5232')); }
  R.rect(0, 134, 319, 139, hex('#22140c')); R.rect(0, 134, 319, 134, hex('#5a3a22'));
  // suelo de mármol a cuadros en perspectiva, con la alfombra roja de pasillo
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const z = (y - 132) / 48, u = Math.floor(((x - 160) / z + 2000) / 28), v = Math.floor(14 / z); R.pset(x, y, (u + v) % 2 ? hex('#3a3a44') : hex('#2c2c36')); }
  for (const sx of [82, 188]) for (let y = 141; y < 150; y++) for (let x = sx - 5; x <= sx + 5; x++) if (tr(x, y, 0.35 - (y - 141) * 0.03)) R.pset(x, y, hex('#6a6a5a'));
  for (let y = 150; y <= 172; y++) for (let x = 0; x < 320; x++) { let c = hex('#6e2028'); if (y === 152 || y === 170) c = hex('#c8a040'); else if (y === 150 || y === 172) c = hex('#3a0e14'); else if (y > 153 && y < 169 && (x + (y - 154) * 2) % 16 === 0) c = hex('#8a3038'); else if (tr(x, y, 0.08)) c = hex('#5a1820'); R.pset(x, y, c); }
  for (let x = 0; x < 320; x++) { R.pset(x, 173, hex('#1a1a20')); }
  // la ventana del fondo a la ciudad de noche (recortada a su hueco)
  caja(12, 26, 70, 92, hex('#3a2416'), hex('#140c08'));
  R.recorte([15, 29, 67, 89]);
  grad(15, 29, 67, 89, [hex('#0a1028'), hex('#16204a'), hex('#2a2c5a')]);
  for (let k = 0; k < 14; k++) R.pset(15 + Math.round(hh(k, 9) * 52), 29 + Math.round(hh(k, 8) * 26), hex('#c8c8e0'));
  R.disco(57, 40, 5, hex('#f0ecd0')); R.disco(59, 39, 4, hex('#1a2350'));
  for (const [bx, bw, bh] of [[15, 10, 34], [25, 8, 46], [33, 12, 28], [45, 7, 52], [52, 10, 38], [62, 8, 30]]) { cajaR(bx, 89 - bh, bx + bw - 1, 89, hex('#141830')); for (let wy = 89 - bh + 3; wy < 88; wy += 4) for (let wx = bx + 1; wx < bx + bw - 1; wx += 3) if (hh(wx, wy, 7) > 0.45) R.pset(wx, wy, hh(wx, wy, 2) > 0.5 ? hex('#f0d080') : hex('#c8a050')); }
  R.recorte(null);
  for (let y = 29; y <= 44; y += 2) { R.rect(15, y, 67, y, hex('#b8ae98')); R.rect(15, y + 1, 67, y + 1, hex('#8a8270')); }
  R.rect(40, 26, 40, 92, hex('#3a2416')); R.rect(12, 58, 70, 59, hex('#3a2416')); R.rect(10, 92, 72, 95, hex('#5a3a24')); R.rect(10, 92, 72, 92, hex('#8a6038'));
  // los dos cuadros: la planta embotelladora al atardecer y un bodegón con botella recta y vaso
  caja(90, 32, 138, 68, hex('#e09048'), hex('#7a5a1a')); R.rect(89, 31, 139, 31, hex('#c8a040')); R.rect(89, 31, 89, 69, hex('#c8a040'));
  grad(91, 33, 137, 54, [hex('#f0b060'), hex('#e08048'), hex('#a85040')]);
  R.disco(124, 50, 5, hex('#ffe0a0')); R.rect(91, 54, 137, 67, hex('#4a3a3a')); R.rect(98, 46, 120, 58, hex('#3a2a2e')); R.rect(102, 38, 104, 46, hex('#3a2a2e')); R.rect(110, 41, 112, 46, hex('#3a2a2e'));
  for (let x = 100; x < 120; x += 4) R.pset(x, 52, hex('#f0c060')); R.rect(126, 44, 130, 58, hex('#3a2a2e')); R.disco(128, 43, 4, hex('#3a2a2e'));
  for (let x = 91; x <= 137; x++) if (tr(x, 62, 0.5)) R.pset(x, 62, hex('#6a5a4a'));
  caja(150, 40, 176, 66, hex('#2a2026'), hex('#7a5a1a')); R.rect(149, 39, 177, 39, hex('#c8a040'));
  R.rect(151, 58, 175, 65, hex('#5a3a28')); R.rect(156, 44, 159, 58, hex('#6a3a24')); R.rect(157, 41, 158, 44, hex('#6a3a24')); R.pset(156, 46, hex('#e0a070'));
  R.rect(164, 52, 169, 58, hex('#c8d4dc')); R.rect(165, 54, 168, 58, hex('#4a2414')); R.disco(171, 57, 2, hex('#c84a30'));
  // apliques de latón con su tulipa
  for (const sx of [82, 188]) { R.rect(sx - 1, 52, sx + 1, 60, hex('#8a6a24')); R.rect(sx - 3, 58, sx + 3, 60, hex('#c8a040')); R.poligono([[sx - 5, 52], [sx + 5, 52], [sx + 3, 44], [sx - 3, 44]], hex('#f0e6c0')); R.rect(sx - 3, 44, sx + 3, 44, hex('#fff6dc')); R.rect(sx - 5, 52, sx + 5, 52, hex('#c8b890')); }
  // la puerta blindada del laboratorio: marco, señal del candado, teclado y piloto
  caja(198, 52, 242, 139, hex('#3a3e48'), hex('#14161c'));
  caja(208, 44, 232, 50, hex('#24262c'), hex('#101216'));
  caja(246, 88, 254, 106, hex('#4a4e58'), hex('#14161c')); for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) R.pset(247 + i * 3, 92 + j * 3, hex('#c8ccd8'));
  // fuente de agua con su garrafa, el extintor y el ficus
  caja(258, 108, 274, 139, hex('#d8d8d0'), hex('#3a3a40')); R.rect(258, 108, 274, 110, hex('#b8b8b0')); R.rect(262, 116, 264, 118, hex('#3a6ab0')); R.rect(268, 116, 270, 118, hex('#c84a3a'));
  R.rect(276, 112, 282, 132, hex('#c83a2a')); R.rect(276, 112, 276, 132, hex('#e86a4a')); R.rect(277, 108, 281, 111, hex('#2a2a2a')); R.rect(278, 106, 284, 107, hex('#2a2a2a'));
  caja(292, 124, 312, 139, hex('#8a5a3a'), hex('#2a1a10')); R.rect(292, 124, 312, 125, hex('#a87048'));
  for (let k = 0; k < 26; k++) { const a = hh(k, 3) * Math.PI - Math.PI, r = 6 + hh(k, 4) * 16, lx = 302 + Math.round(Math.cos(a) * r * 0.8), ly = 104 + Math.round(Math.sin(a) * r * 1.1); R.disco(lx, ly, 3, k % 3 ? hex('#2a5a30') : hex('#3a7a3a')); R.pset(lx - 1, ly - 1, hex('#5a9a4a')); }
  R.linea(302, 123, 302, 100, hex('#4a3020'));
});
const p2 = (t) => {
  pasillo();
  // luces del techo: una parpadea
  for (const lx of [44, 136, 228]) { const on = lx !== 136 || Math.sin(t * 23) > -0.6 || Math.floor(t * 3) % 4; R.rect(lx - 10, 14, lx + 10, 15, on ? hex('#fff6d0') : hex('#8a8470')); }
  // la ciudad: un avión que cruza con su luz y ventanas que se encienden
  R.recorte([15, 45, 67, 89]);
  const ax = 15 + ((t * 7) % 70); R.pset(Math.round(ax), 50, Math.floor(t * 3) % 2 ? hex('#ff4a3a') : hex('#f0f0ff')); R.pset(Math.round(ax) - 1, 50, hex('#3a3a50'));
  for (let k = 0; k < 4; k++) { const on = Math.sin(t * 0.7 + k * 2.1) > 0; R.pset(27 + k * 9, 70 + (k % 2) * 6, on ? hex('#f0d080') : hex('#141830')); }
  R.recorte(null);
  // el agua de la fuente hace una burbuja de vez en cuando
  caja(261, 88, 271, 106, hex('#7aa8d8'), hex('#2a3a5a')); R.rect(262, 89, 263, 105, hex('#a8c8ec')); const bu = (t * 0.9) % 1; if (bu < 0.5) R.pset(266, Math.round(104 - bu * 30), hex('#e0f0ff'));
  // la puerta: el ojo de buey verde (dentro, burbujas de laboratorio), se abre en «scientists» y se cierra con cerrojo
  const abre = lin(t, CIENT - 0.1, CIENT + 0.35) - lin(t, P3 - 0.42, P3 - 0.12), cerrada = t > P3 - 0.12;
  R.recorte(PU); grad(PU[0], PU[1], PU[2], PU[3], [hex('#1c4a3a'), hex('#2a7a5a'), hex('#1a3a2e')]);
  for (let k = 0; k < 5; k++) { const bx = 206 + k * 7; R.rect(bx, 80, bx + 3, 96, hex('#0e2a20')); R.disco(bx + 1, 100, 3, hex('#0e2a20')); }
  R.rect(201, 104, 239, 106, hex('#0e2a20'));
  for (let k = 0; k < 6; k++) { const by = 98 - ((t * 9 + k * 5) % 22); R.pset(205 + k * 6, Math.round(by), hex('#8af0c0')); }
  R.recorte(null);
  // los dos científicos llegan por la derecha y entran en el laboratorio (recortados al hueco cuando cruzan la puerta)
  const llega = lin(t, ATACA + 0.3, SECRETO + 0.3), entra = lin(t, CIENT + 0.15, P3 - 0.35);
  for (const [d, x0, xs, k] of [[NC.cientifica, 344, 252, 0], [NC.cientifico, 364, 274, 1]]) {
    const e = lin(entra, k * 0.3, 0.65 + k * 0.35); if (e >= 1) continue;
    const x = Math.round(e > 0 ? lerp(xs, 214, sv(e)) : lerp(x0, xs, sv(llega)));
    const dentro = e > 0 && x < 244, mov = (llega > 0 && llega < 1) || (e > 0 && e < 1);
    if (dentro) R.recorte([Math.round(lerp(239, 201, abre)) , 55, 239, 139]);
    R.actor(d, x, 162 - (e > 0.6 ? Math.round((e - 0.6) * 10) : 0), t, { dir: -1, anda: mov, sonrisa: llega >= 1 && e === 0 });
    R.recorte(null);
  }
  // la hoja de la puerta (se abre hacia dentro, por la izquierda)
  const ancho = Math.round(lerp(38, 5, abre));
  if (ancho > 0) {
    const x0 = 201, x1 = 201 + ancho;
    R.rect(x0, 55, x1, 139, hex('#6a707c')); R.rect(x0, 55, x1, 56, hex('#8a909c')); R.rect(x1, 55, x1, 139, hex('#3a3e48'));
    for (const by of [66, 118]) R.rect(x0, by, x1, by + 2, hex('#585e6a'));
    for (let ry = 60; ry < 136; ry += 8) { R.pset(x0 + 2, ry, hex('#a8aebc')); if (ancho > 6) R.pset(x1 - 2, ry, hex('#a8aebc')); }
    if (ancho > 26) { const cx = x0 + Math.round(ancho * 0.5); R.disco(cx, 80, 7, hex('#3a3e48')); R.disco(cx, 80, 5, hex('#2a8a6a')); R.disco(cx - 1, 79, 2, hex('#6af0b0')); const by = 84 - ((t * 7) % 9); R.pset(cx + 2, Math.round(by), hex('#c8ffe0'));
      R.rect(cx - 6, 92, cx + 6, 104, hex('#c8a040')); R.icono('candado', cx - 3, 94, hex('#2a2a2a'), hex('#8a6a24'));
      R.rect(x0 + 2, 110, x1 - 4, 112, hex('#9aa0ac')); }
  }
  // el piloto de encima: verde, ámbar al abrir, rojo cuando se cierra
  R.rect(210, 45, 230, 49, cerrada ? (Math.floor(t * 4) % 2 ? hex('#ff3a2a') : hex('#a81a14')) : abre > 0 ? hex('#f0b030') : hex('#3ac86a'));
  R.pset(250, 90, Math.floor(t * 2) % 2 ? hex('#ff4a3a') : hex('#4a1a14'));
  // Goizueta cruza decidido y se planta junto a la puerta; en «In secret» mira a los lados; en «scientists» señala la puerta
  const u = lin(t, P2 + 0.05, ATACA + 0.8), gx = Math.round(lerp(-22, 172, sv(u)));
  const lados = t > SECRETO && t < SECRETO + 1.0 ? (Math.floor((t - SECRETO) * 3) % 2 ? 1 : -1) : 1;
  R.actor(NC.goizueta, gx, 162, t, { dir: u < 1 ? 1 : lados, anda: u > 0 && u < 1, enfado: u < 1, dedo: t > CIENT - 0.1 && t < CIENT + 1.4, habla: t > CIENT && t < CIENT + 1.2 && Math.sin(t * 9) > 0, sonrisa: t > P3 - 0.6 });
};
// ── el inserto de la mesa del laboratorio ──
const VX = 74, VB = 150;   // el vaso grande: centro y base (a la izquierda, donde llega la mano)
const mesaLab = () => capa('mesaLab', () => {
  // azulejos blancos con su junta, más oscuros hacia arriba; el armario alto de la derecha, liso
  for (let y = 0; y <= 92; y++) for (let x = 0; x < 320; x++) { const jx = x % 14 === 0, jy = y % 11 === 0; let c = jx || jy ? hex('#a8b0b4') : hex('#e4eae8'); if (!jx && !jy && tr(x, y, 0.5 - y / 200)) c = hex('#d0d8d8'); if (!jx && !jy && (x % 14 === 1 || y % 11 === 1)) c = hex('#f4f8f6'); R.pset(x, y, c); }
  caja(244, 0, 319, 50, hex('#c8ccc4'), hex('#5a6060')); R.rect(281, 0, 281, 50, hex('#8a9090')); R.rect(276, 22, 278, 30, hex('#5a6060')); R.rect(284, 22, 286, 30, hex('#5a6060')); R.rect(244, 48, 319, 50, hex('#9aa0a0'));
  // el estante con tarros: vainilla, limones, canela, azúcar, botellas rectas pardas
  R.rect(6, 40, 236, 43, hex('#8a6a4a')); R.rect(6, 40, 236, 40, hex('#b08a60')); R.rect(6, 44, 236, 45, hex('#6a6a6a'));
  const tarro = (x, w, h, c, tapa) => { caja(x, 39 - h, x + w, 39, hex('#cfe0e4'), hex('#4a5a60')); R.rect(x + 1, 39 - h + 3, x + w - 1, 38, c); R.rect(x, 38 - h, x + w, 40 - h, tapa); R.rect(x + 1, 39 - h + 1, x + 1, 37, hex('#ffffff')); R.rect(x + 2, 31 - Math.round(h / 3), x + w - 2, 34 - Math.round(h / 3), hex('#f2ead0')); };
  tarro(12, 14, 20, hex('#4a2a14'), hex('#2a2a2a')); tarro(32, 12, 16, hex('#f0d040'), hex('#c84a2a'));
  for (let k = 0; k < 4; k++) R.disco(36 + (k % 2) * 4, 30 + Math.floor(k / 2) * 4, 2, hex('#e8c830'));
  tarro(50, 10, 22, hex('#a8582a'), hex('#5a5a5a')); for (let k = 0; k < 4; k++) R.rect(52 + k * 2, 20, 52 + k * 2, 36, hex('#7a3a1a'));
  tarro(66, 16, 18, hex('#f4f4ee'), hex('#3a6ab0'));
  for (let k = 0; k < 4; k++) { const bx = 92 + k * 9; caja(bx, 22, bx + 5, 39, hex('#6a3a1a'), hex('#2a1408')); R.rect(bx + 1, 17, bx + 4, 21, hex('#6a3a1a')); R.rect(bx + 1, 16, bx + 4, 16, hex('#c8c8c8')); R.rect(bx + 1, 28, bx + 4, 32, hex('#e8dcc0')); R.pset(bx + 1, 24, hex('#c8885a')); }
  tarro(132, 12, 14, hex('#c84a2a'), hex('#2a2a2a')); tarro(150, 18, 24, hex('#d8c8a0'), hex('#8a8a8a'));
  for (let k = 0; k < 3; k++) { const bx = 176 + k * 18; caja(bx, 24, bx + 12, 39, hex('#e8eef0'), hex('#5a6a70')); R.rect(bx + 1, 32, bx + 11, 38, [hex('#e08030'), hex('#6a3018'), hex('#b0702a')][k]); R.rect(bx + 3, 20, bx + 9, 23, hex('#c8d0d4')); R.pset(bx + 2, 26, hex('#ffffff')); }
  // la regleta de enchufes con su cable, el cartel de seguridad en pictograma y el temporizador de pared
  R.rect(110, 76, 172, 82, hex('#d8d8d0')); R.rect(110, 82, 172, 82, hex('#8a8a84')); for (let x = 116; x < 172; x += 12) R.rect(x, 78, x + 3, 80, hex('#3a3a3a'));
  R.linea(122, 82, 118, 92, hex('#2a2a2a')); R.linea(134, 82, 140, 92, hex('#2a2a2a'));
  R.poligono([[186, 74], [196, 56], [206, 74]], hex('#f0c030')); R.linea(186, 74, 196, 56, K); R.linea(196, 56, 206, 74, K); R.rect(186, 74, 206, 74, K); R.rect(195, 62, 196, 68, K); R.rect(195, 71, 196, 72, K);
  R.disco(232, 68, 13, K); R.disco(232, 68, 12, hex('#f4f4ee'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(232 + Math.round(Math.cos(a) * 10), 68 + Math.round(Math.sin(a) * 10), K); }
  // el canto de la mesa y la mesa de resina negra con su brillo
  R.rect(0, 92, 319, 97, hex('#9aa4a8')); R.rect(0, 92, 319, 92, hex('#d8e0e4')); R.rect(0, 97, 319, 97, hex('#4a5458'));
  for (let y = 98; y < 180; y++) for (let x = 0; x < 320; x++) { let c = hex('#22262c'); if (tr(x, y, 0.16 + (y - 98) / 600)) c = hex('#2c3038'); if ((x + y * 0.6) % 90 < 3 && tr(x, y, 0.5)) c = hex('#3a404a'); R.pset(x, y, c); }
  // la gradilla con seis tubos de jarabes de distinto tono
  caja(120, 104, 186, 108, hex('#c8c8c0'), hex('#3a3a3a')); caja(120, 124, 186, 128, hex('#c8c8c0'), hex('#3a3a3a')); R.rect(122, 108, 123, 124, hex('#9a9a92')); R.rect(183, 108, 184, 124, hex('#9a9a92'));
  ['#3a1a0c', '#6a3418', '#8a4a20', '#a8682a', '#5a2a14', '#c8883a'].forEach((c, k) => { const x = 128 + k * 10; caja(x, 96, x + 4, 126, hex('#dceaee'), hex('#4a5a60')); R.rect(x, 106 + k * 2, x + 4, 125, hex(c)); R.rect(x, 96, x + 4, 97, hex('#8a9aa0')); R.pset(x + 1, 100, hex('#ffffff')); });
  // el agitador magnético bajo el vaso
  caja(VX - 30, VB, VX + 30, VB + 12, hex('#d8dcd8'), hex('#3a3e40')); R.rect(VX - 30, VB + 10, VX + 30, VB + 12, hex('#a8aca8')); R.disco(VX + 20, VB + 6, 3, hex('#5a5e60')); R.rect(VX - 24, VB + 5, VX - 14, VB + 7, hex('#2a2e30'));
  // la libreta cuadriculada con cifras y el lápiz
  R.poligono([[112, 146], [190, 142], [196, 178], [114, 179]], hex('#f2f0e4')); R.linea(112, 146, 190, 142, K); R.linea(190, 142, 196, 178, K); R.linea(112, 146, 114, 179, K);
  for (let k = 0; k < 6; k++) R.linea(116, 152 + k * 4, 188, 148 + k * 4, hex('#a8c0d8'));
  R.numero('46', 122, 160, { color: hex('#2a3a7a'), sombra: false }); R.numero('12', 152, 170, { color: hex('#2a3a7a'), sombra: false });
  R.linea(160, 150, 194, 168, hex('#e0a030')); R.linea(161, 150, 195, 168, hex('#8a5a10')); R.pset(194, 169, K);
  // el azucarero con terrones (en medio de la mesa) y el cuentagotas
  caja(200, 128, 228, 146, hex('#f4f4f0'), hex('#3a3a40')); R.rect(198, 124, 230, 128, hex('#e0e0dc')); R.rect(198, 124, 230, 124, hex('#ffffff')); R.rect(203, 132, 225, 132, hex('#3a6ab0'));
  for (let k = 0; k < 5; k++) caja(202 + k * 6, 119 - (k % 2) * 2, 206 + k * 6, 123 - (k % 2) * 2, hex('#fbfaf4'), hex('#8a8a84'));
  caja(14, 112, 22, 132, hex('#6a3a1a'), K); R.rect(15, 106, 21, 111, hex('#2a2a2a')); R.rect(17, 102, 19, 105, hex('#c84a3a')); R.rect(15, 118, 21, 122, hex('#e8dcc0'));
  // la carpeta (con su presilla), abajo a la derecha
  R.poligono([[232, 140], [312, 136], [316, 178], [236, 179]], hex('#d8b878')); R.poligono([[232, 140], [312, 136], [312, 139], [232, 143]], hex('#c0a060'));
  R.linea(232, 140, 312, 136, hex('#6a5020')); R.linea(312, 136, 316, 178, hex('#6a5020')); R.linea(232, 140, 236, 179, hex('#6a5020'));
  R.rect(240, 142, 250, 144, hex('#e8d8a8'));
});
// una botella parda recta inclinada: centro (bx, by), ángulo ang (0 = tumbada con la boca a la derecha)
const botellaInclinada = (bx, by, ang) => {
  const ca = Math.cos(ang), sa = Math.sin(ang), P = (u, v) => [Math.round(bx + u * ca - v * sa), Math.round(by + u * sa + v * ca)];
  R.poligono([P(-15, -7), P(9, -7), P(9, 7), P(-15, 7)], K); R.poligono([P(-14, -6), P(8, -6), P(8, 6), P(-14, 6)], hex('#6a3a1a'));
  R.poligono([P(9, -4), P(14, -3), P(14, 3), P(9, 4)], K); R.poligono([P(14, -3), P(21, -3), P(21, 3), P(14, 3)], K); R.poligono([P(14, -2), P(20, -2), P(20, 2), P(14, 2)], hex('#6a3a1a'));
  R.poligono([P(-8, -6), P(2, -6), P(2, 6), P(-8, 6)], hex('#e8dcc0')); R.linea(...P(-13, -4), ...P(7, -4), hex('#a86a3a'));
  return P(21, 0);
};
const p3 = (t) => {
  mesaLab();
  const BATA = '#eef0f2';
  // la manecilla del temporizador
  const a = t * 1.2; R.linea(232, 68, 232 + Math.round(Math.sin(a) * 9), 68 - Math.round(Math.cos(a) * 9), hex('#c83a2a')); R.disco(232, 68, 1, K);
  // el vaso grande: se llena al verter; en «smoother» el agitador se enciende, hace remolino y el jarabe se aclara
  const vierte = lin(t, P3 + 0.35, SUAVE - 0.15), agita = t > SUAVE - 0.1, tono = lin(t, SUAVE, DULCE + 0.2), nivel = 6 + Math.round(30 * sv(vierte));
  R.pset(VX + 24, VB + 3, agita ? (Math.floor(t * 4) % 2 ? hex('#4af06a') : hex('#2ab04a')) : hex('#1a3a2a'));
  const cJ = tono < 0.5 ? hex('#4a2414') : tono < 1 ? hex('#6a3418') : hex('#7e4220');
  caja(VX - 22, VB - 54, VX + 22, VB - 1, hex('#e6f2f4'), hex('#3a5058'));
  cajaR(VX - 21, VB - nivel, VX + 21, VB - 2, cJ);
  const sup = agita ? hex('#c8925a') : hex('#8a5a3a');
  if (agita) { for (let x = VX - 21; x <= VX + 21; x++) { const d = Math.abs(x - VX), hund = Math.max(0, 5 - Math.round(d / 4)); R.rect(x, VB - nivel, x, VB - nivel + hund, hund > 0 ? hex('#e6f2f4') : cJ); R.pset(x, VB - nivel + hund, sup); } }
  else R.rect(VX - 21, VB - nivel, VX + 21, VB - nivel, sup);
  for (let k = 0; k < 5; k++) R.rect(VX + 14, VB - 10 - k * 9, VX + 20, VB - 10 - k * 9, hex('#6a8a94'));
  R.rect(VX - 19, VB - 50, VX - 18, VB - 6, hex('#ffffff')); R.rect(VX - 23, VB - 55, VX + 23, VB - 54, hex('#9ab8c0'));
  if (agita) { for (let k = 0; k < 12; k++) { const an = t * 9 + k * 0.52, r = 3 + (k % 4) * 4; R.pset(VX + Math.round(Math.cos(an) * r * 1.3), VB - Math.round(nivel * 0.45) + Math.round(Math.sin(an) * r * 0.35), hex('#c8925a')); }
    const an = t * 14; R.rect(VX - 4 + Math.round(Math.cos(an) * 2), VB - 4, VX + 4 - Math.round(Math.cos(an) * 2), VB - 3, hex('#f4f4f4')); }
  // la mano izquierda (desde el borde) vierte jarabe de la botella parda y se va; vuelve con la cuchara de terrones
  const e1 = lin(t, P3, P3 + 0.35) - lin(t, SUAVE - 0.15, SUAVE + 0.2), inc = lin(t, P3 + 0.25, P3 + 0.45) - lin(t, SUAVE - 0.3, SUAVE - 0.1);
  if (e1 > 0) {
    const hx = Math.round(lerp(-30, 36, sv(e1))), hy = Math.round(lerp(96, 70, sv(e1)));
    const [mx, my] = botellaInclinada(hx + 2, hy, lerp(-0.2, 0.75, inc));
    if (inc > 0.9 && vierte < 1) { R.linea(mx, my, mx + 1, VB - nivel, hex('#4a2414')); R.linea(mx + 1, my, mx + 2, VB - nivel, hex('#6a3418')); R.pset(mx + 1, VB - nivel - 1, hex('#8a5a3a')); }
    T.brazo(R, -40, 104, hx - 4, hy + 2, BATA, 1, { codo: [-8, 92] });
  }
  const e2 = lin(t, DULCE - 0.5, DULCE - 0.15) - lin(t, DULCE + 0.7, DULCE + 1.0), vuelca = lin(t, DULCE - 0.1, DULCE + 0.2);
  if (e2 > 0) {
    const hx = Math.round(lerp(-30, 34, sv(e2))), hy = Math.round(lerp(100, 78, sv(e2)));
    // la cuchara de laboratorio con tres terrones, que se vuelca sobre el vaso
    const cx = hx + 10, cy = hy - 2, ca = vuelca * 0.9;
    R.linea(hx + 4, hy, cx + 24, cy - Math.round(ca * 4), hex('#a8acb4')); R.linea(hx + 4, hy + 1, cx + 24, cy + 1 - Math.round(ca * 4), hex('#6a6e76')); R.linea(hx + 4, hy - 1, cx + 24, cy - 1 - Math.round(ca * 4), hex('#e0e4ec'));
    const sx = cx + 24, sy = cy - Math.round(ca * 4); caja(sx - 2, sy - 3 + Math.round(ca * 4), sx + 14, sy + 2, hex('#c8ccd4'), hex('#3a3e48')); R.rect(sx - 2, sy + 2, sx + 14, sy + 2, hex('#6a6e76'));
    if (vuelca < 0.5) for (let k = 0; k < 3; k++) caja(sx + k * 5, sy - 7, sx + k * 5 + 3, sy - 4, hex('#fbfaf4'), hex('#8a8a84'));
    T.brazo(R, -40, 110, hx - 4, hy + 2, BATA, 1, { codo: [-8, 98] });
  }
  for (let k = 0; k < 3; k++) { const c = lin(t, DULCE + 0.05 + k * 0.12, DULCE + 0.4 + k * 0.12); if (c <= 0) continue; const x = VX + 2 + k * 5, y = Math.round(lerp(76, VB - 8, c * c)); if (c < 1) { if (y < VB - nivel) caja(x - 2, y - 2, x + 2, y + 2, hex('#fbfaf4'), hex('#8a8a84')); }
    else for (let b = 0; b < 3; b++) { const by = VB - 6 - ((t - DULCE) * 16 + b * 6 + k * 3) % Math.max(4, nivel - 6); R.pset(x - 1 + b, Math.round(by), hex('#e8c8a0')); } }
  // el sello baja desde la derecha sobre la carpeta en «Project Kansas» y deja Kansas con su estrella; el candado se cierra
  const baja = lin(t, CLAVE - 0.1, PROYECTO + 0.1) - lin(t, KANSAS + 0.15, KANSAS + 0.6), marca = t > KANSAS;
  if (marca) {
    const ox = 252, oy = 148, rojo = hex('#c8302a'), papel = hex('#d8b878');
    R.poligono([[ox, oy], [ox + 34, oy - 1], [ox + 35, oy + 4], [ox + 38, oy + 5], [ox + 39, oy + 20], [ox + 1, oy + 21]], rojo);
    R.poligono([[ox + 3, oy + 3], [ox + 32, oy + 2], [ox + 33, oy + 6], [ox + 36, oy + 7], [ox + 36, oy + 18], [ox + 4, oy + 18]], papel);
    for (let y = oy + 3; y < oy + 19; y++) for (let x = ox + 3; x < ox + 37; x++) if (hh(x, y, 5) > 0.85 && R.pget(x, y) === papel) R.pset(x, y, hex('#e0a080'));
    const sx = ox + 20, sy = oy + 11; R.poligono([[sx, sy - 6], [sx + 2, sy - 2], [sx + 6, sy - 2], [sx + 3, sy + 1], [sx + 4, sy + 5], [sx, sy + 3], [sx - 4, sy + 5], [sx - 3, sy + 1], [sx - 6, sy - 2], [sx - 2, sy - 2]], rojo);
  }
  if (baja > 0) {
    const sx = 272, sy = Math.round(lerp(104, 160, sv(baja)));
    caja(sx - 15, sy - 7, sx + 15, sy, hex('#3a2a20'), K); R.rect(sx - 15, sy - 1, sx + 15, sy, hex('#c8302a')); caja(sx - 3, sy - 20, sx + 3, sy - 8, hex('#8a5a3a'), K); R.disco(sx, sy - 23, 5, hex('#6a3a20')); R.pset(sx - 2, sy - 25, hex('#a87048'));
    T.brazo(R, 352, sy - 6, sx + 6, sy - 22, '#22283a', -1, { codo: [328, sy - 4] });
    if (baja > 0.97 && t < KANSAS + 0.4) for (let k = 0; k < 6; k++) { const an = k / 6 * Math.PI; R.pset(sx + Math.round(Math.cos(an) * 22), sy - Math.round(Math.sin(an) * 6) + 2, hex('#f4f0e0')); }
  }
  const cierra = lin(t, KANSAS + 0.7, KANSAS + 1.0);
  { const lx = 300, ly = 156; R.rect(lx - 5, ly - 2, lx + 5, ly + 6, hex('#c8a040')); R.rect(lx - 5, ly - 2, lx + 5, ly - 2, hex('#e8c860')); R.rect(lx - 5, ly + 6, lx + 5, ly + 6, hex('#8a6a24')); R.rect(lx - 1, ly + 1, lx, ly + 3, K);
    const up = Math.round(4 * (1 - cierra)); R.rect(lx - 3, ly - 7 - up, lx - 2, ly - 2, hex('#a8a8b0')); R.rect(lx + 2, ly - 7 - up, lx + 3, ly - 2 - up, hex('#a8a8b0')); R.rect(lx - 3, ly - 8 - up, lx + 3, ly - 7 - up, hex('#d0d0d8'));
    destello(lx + 8, ly - 6, lin(t, KANSAS + 1.0, KANSAS + 1.5)); }
};
const efectos = [[INGENIERO + 0.2, 'lapiz'], [g(0.25), 'burbujas'], [CIENT + 0.05, 'puerta'], [P3 - 0.12, 'cerrojo'], [P3 + 0.45, 'burbujas'], [DULCE + 0.4, 'pop'], [KANSAS, 'sello'], [KANSAS + 0.95, 'cerrojo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1983 });
''')

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nc-kansas'] = ('Proyecto Kansas', '''// NC-KANSAS (frase 11, «And the science backed him up…»), sin cartela; barra en 1984. Tres planos:
// 1. fondo local: la sala de catas a ciegas: el espejo espía con dos observadores, el tablero de cifras que rueda hasta
//    200000 en «200,000», el cartel de los vasos A y B, la puerta; tres catadores tras la mesa larga con filas de vasos
//    beben por turnos y sonríen; la científica cruza delante con el carrito de bandejas; el investigador apunta. Corta en
//    «across».
// 2. el mapa de papel de EE. UU. (T.mapa, encuadre propio centrado en Kansas): cae la chincheta de Kansas, salen vasitos de
//    cata por todo el país desde el centro («across the country»), en «the new recipe won» una ola los vuelve rojos (unos
//    pocos pardos y azules) y una mano desliza la ficha del recuento con las tres barras. Corta en «more than Pepsi».
// 3. fondo local: la sala de resultados al atardecer: ventana con nubes y pájaros, corcho con gráficas, la impresora de
//    agujas que escupe papel, el proyector con su haz y la pantalla; el podio con la lata nueva en el 1 y la vieja en el
//    2; en «Pepsi» la científica trae la lata azul en brazos y la deja en el 3; en «numbers» crecen las barras de la
//    pantalla y Goizueta las señala; en «safest» le cuelga la medalla a la lata nueva, sale el visto bueno y levanta los
//    brazos.''', COMUN + r'''
const k = (f) => en('kansas', f);
const Q2 = k(0.348), Q3 = k(0.666);
const CORRE = k(0.138), DOSC = k(0.186), GANA = k(0.447), GANO = k(0.483), VIEJA = k(0.617), PEPSI = k(0.694);
const NUMEROS = k(0.774), SEGURA = k(0.890), MUNDO = k(0.968);
// ── 1. la sala de catas ──
const vasito = (x, y, lleno = 0.7, letra = 0) => { R.rect(x - 3, y - 7, x + 3, y, K); R.rect(x - 2, y - 6, x + 2, y - 1, hex('#e2eef2')); const h = Math.round(5 * lleno); if (h) R.rect(x - 2, y - h, x + 2, y - 1, hex('#4a2414')); R.pset(x - 2, y - 6, hex('#ffffff')); if (letra) { R.rect(x - 1, y - 4, x + 1, y - 2, hex('#fbfaf4')); R.pset(x, y - 3, letra === 1 ? hex('#c83a2a') : hex('#2a5aa8')); } };
const catas = () => capa('catas', () => {
  // pared de paneles beis de los ochenta con sus juntas; arriba a la derecha, lisa
  for (let y = 0; y <= 112; y++) for (let x = 0; x < 320; x++) { let c = hex('#d8cdb2'); if (x % 32 === 0 && x < 270) c = hex('#b8ac90'); else if (tr(x, y, 0.12 + (112 - y) / 900)) c = hex('#cfc3a6'); R.pset(x, y, c); }
  grad(0, 0, 319, 8, [hex('#a89c80'), hex('#c8bc9e')]); R.rect(0, 9, 319, 10, hex('#8a7e64'));
  for (const lx of [40, 140, 240]) { caja(lx - 16, 0, lx + 16, 3, hex('#f4f0e0'), hex('#8a7e64')); for (let y = 4; y < 30; y++) for (let x = lx - 20; x <= lx + 20; x++) if (tr(x, y, 0.14 - y / 260)) R.pset(x, y, hex('#e8e0c8')); }
  // el espejo espía (cristal ahumado) con su marco de aluminio
  caja(12, 28, 138, 94, hex('#2a2e36'), hex('#8a909a')); R.rect(11, 27, 139, 27, hex('#c8ccd4')); R.rect(11, 95, 139, 96, hex('#6a707a'));
  grad(13, 29, 137, 93, [hex('#1e222a'), hex('#2a2e38'), hex('#22262e')]);
  // el tablero de cifras con su marco de latón
  caja(150, 20, 262, 56, hex('#141418'), hex('#8a6a24')); R.rect(149, 19, 263, 19, hex('#c8a040')); R.rect(149, 57, 263, 57, hex('#6a5018'));
  for (let i = 0; i < 6; i++) { const x = 155 + i * 17; caja(x, 25, x + 14, 51, hex('#24242a'), hex('#0a0a0e')); R.rect(x, 38, x + 14, 38, hex('#0a0a0e')); }
  for (const [x, y] of [[152, 22], [260, 22], [152, 54], [260, 54]]) R.pset(x, y, hex('#e8c860'));
  // el cartel de la cata: dos vasos A y B y la interrogación
  caja(160, 66, 210, 104, hex('#f4f0e4'), hex('#5a5040')); vasito(174, 94, 0.8, 1); vasito(196, 94, 0.8, 2); R.icono('?', 182, 72, hex('#c83a2a'), hex('#e8d8c0'));
  R.disco(160, 66, 1, hex('#c83a2a')); R.disco(210, 66, 1, hex('#c83a2a'));
  // el reloj de pared y la puerta con su ventanuco (la esquina de Atom queda lisa)
  R.disco(236, 82, 10, K); R.disco(236, 82, 9, hex('#f4f4ee')); for (let q = 0; q < 12; q++) { const a = q / 12 * Math.PI * 2; R.pset(236 + Math.round(Math.cos(a) * 7), 82 + Math.round(Math.sin(a) * 7), K); }
  caja(282, 52, 314, 112, hex('#a87a4a'), hex('#4a3018')); vetas(283, 53, 313, 111, hex('#a87a4a'), hex('#8a5e34'), hex('#c8955e'), 9); caja(290, 60, 306, 76, hex('#9ab8c8'), hex('#4a3018')); R.rect(291, 61, 293, 75, hex('#c8e0ec')); R.rect(306, 84, 309, 86, hex('#c8a040'));
  // zócalo de goma y moqueta azul con su dibujo; los cables pegados con cinta
  R.rect(0, 112, 319, 117, hex('#3a3a40')); R.rect(0, 112, 319, 112, hex('#5a5a62'));
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { let c = hex('#4a5878'); if ((x + y * 2) % 14 === 0 && y % 4 === 0) c = hex('#5a6a8e'); else if (tr(x, y, 0.2)) c = hex('#42506e'); R.pset(x, y, c); }
  R.linea(196, 179, 226, 160, hex('#1a1a20')); R.linea(226, 160, 250, 160, hex('#1a1a20')); R.rect(208, 168, 216, 170, hex('#c8c0a0'));
  // la mesa larga: tablero y faldón blanco con sus pliegues (los catadores van detrás)
  // pilas de vasos y una caja de cartón en el suelo, a la izquierda
  caja(6, 150, 30, 172, hex('#c8a06a'), hex('#5a3a1a')); R.rect(6, 158, 30, 159, hex('#a87a4a')); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) R.rect(9 + i * 7, 141 - j * 3, 13 + i * 7, 149 - j * 3, j % 2 ? hex('#e2eef2') : hex('#c8d8de'));
});
const SITIOS = [70, 128, 186];   // dónde se sientan los catadores (sin vasos delante de la cara)
const mesaCatas = (t) => {
  R.rect(34, 128, 254, 133, hex('#e8e4d8')); R.rect(34, 128, 254, 128, hex('#fbfaf4')); R.rect(30, 133, 258, 156, hex('#f2efe6'));
  for (let x = 38; x < 256; x += 12) { R.rect(x, 134, x, 156, hex('#d0ccc0')); R.rect(x + 1, 134, x + 1, 156, hex('#fbfaf6')); }
  R.rect(30, 156, 258, 157, hex('#b0aca0')); R.rect(30, 133, 258, 134, hex('#c8c4b8'));
  for (let x = 40; x < 252; x += 8) { if (SITIOS.some((s) => x > s - 3 && x < s + 18)) continue; vasito(x, 131, (x * 7) % 5 / 5 + 0.2, (x / 8) % 2 ? 1 : 2); }
  for (const s of SITIOS) { vasito(s + 1, 132, 0.8, 1); vasito(s + 14, 132, 0.8, 2); }
};
const p1 = (t) => {
  catas();
  // los observadores tras el espejo (siluetas que se mueven) y el reflejo que corre
  R.recorte([13, 29, 137, 93]);
  for (const [ox, k] of [[44, 0], [96, 1]]) { const x = ox + Math.round(Math.sin(t * 0.8 + k * 2) * 4); R.disco(x, 60, 5, hex('#3a3e48')); R.rect(x - 7, 66, x + 7, 93, hex('#3a3e48')); R.rect(x + 4, 70, x + 10, 78, hex('#4a4e5a')); if (Math.sin(t * 3 + k) > 0.6) R.pset(x + 6, 74, hex('#6a6e7a')); }
  reflejo(13, 29, 137, 93, hex('#4a5060'), t * 6);
  R.recorte(null);
  // el tablero rueda hasta 200000 entre «ran» y «200,000»
  const u = lin(t, CORRE, DOSC + 0.5), n = Math.round(200000 * (1 - (1 - u) ** 3)), txt = String(n).padStart(6, '0');
  for (let i = 0; i < 6; i++) { const x = 155 + i * 17; R.numero(txt[i], x + 9, 47, { tam: 16, centro: true, rampa: [hex('#ffe8a0'), hex('#f0b830'), hex('#c87818')] }); if (u > 0 && u < 1 && (Math.floor(t * 20) + i) % 3 === 0) R.rect(x, 37, x + 14, 39, hex('#3a3a44')); R.rect(x, 38, x + 14, 38, hex('#0a0a0e')); }
  if (u >= 1) destello(258, 22, lin(t, DOSC + 0.5, DOSC + 1.1));
  const a = t * 1.4; R.linea(236, 82, 236 + Math.round(Math.sin(a) * 7), 82 - Math.round(Math.cos(a) * 7), hex('#c83a2a')); R.linea(236, 82, 238, 78, K);
  // los tres catadores detrás de la mesa: cada uno bebe a su turno y reacciona
  [[NC.senora75, SITIOS[0], 0], [NC.profesor, SITIOS[1], 1.1], [NC.estudiante, SITIOS[2], 2.2]].forEach(([d, x, f]) => {
    const c = (t + 3.3 - f) % 3.3, bebe = c > 0.4 && c < 1.4, tras = c >= 1.4 && c < 2.6;
    const r = R.actor(d, x, 131, t, { dir: x > 150 ? -1 : 1, sostiene: bebe ? [x + (x > 150 ? -1 : 15), 110] : undefined, sonrisa: tras && x !== 128, sorpresa: tras && x === 128, habla: tras && Math.sin(t * 9) > 0.3 });
    if (bebe) vasito(r.mano[0], r.mano[1] + 3, 0.5, x > 150 ? 2 : 1);
  });
  mesaCatas(t);
  // la científica cruza delante empujando el carrito de bandejas de vasos
  const cx = Math.round(lerp(-50, 300, lin(t, 0.2, Q2 - 0.1)));
  R.actor(NC.cientifica, cx, 176, t, { dir: 1, anda: true, sonrisa: true });
  { const x0 = cx + 16; caja(x0, 154, x0 + 30, 156, hex('#c8ccd4'), hex('#3a3e48')); caja(x0, 166, x0 + 30, 168, hex('#c8ccd4'), hex('#3a3e48')); R.rect(x0, 156, x0 + 1, 170, hex('#8a8e98')); R.rect(x0 + 29, 156, x0 + 30, 170, hex('#8a8e98')); R.linea(x0 - 2, 150, x0, 156, hex('#3a3e48'));
    for (let i = 0; i < 4; i++) { vasito(x0 + 4 + i * 7, 153, 0.8); vasito(x0 + 4 + i * 7, 165, 0); } for (const wx of [x0 + 3, x0 + 27]) { R.disco(wx, 173, 2, K); R.pset(wx, 173, hex('#8a8e98')); } }
  // el investigador apunta en su tablilla
  R.actor(NC.investigador, 272, 172, t, { dir: -1, dedo: Math.floor(t * 2) % 2 === 0 && t < DOSC + 0.3, sonrisa: t > DOSC + 0.5, sorpresa: t > DOSC && t < DOSC + 0.5 });
};
// ── 2. el mapa ──
const CIUDADES = [[-122.3, 47.6], [-122.7, 45.5], [-122.4, 37.8], [-118.2, 34.05], [-117.2, 32.7], [-112.1, 33.4], [-115.1, 36.2], [-111.9, 40.8], [-116.2, 43.6], [-105, 39.7], [-106.6, 35.1], [-96.8, 32.8], [-95.4, 29.8], [-98.5, 29.4], [-97.5, 35.5], [-96, 41.3], [-93.3, 44.98], [-87.6, 41.9], [-83, 42.3], [-90.2, 38.6], [-90, 35.1], [-90.1, 29.95], [-84.4, 33.75], [-80.2, 25.8], [-82.5, 27.95], [-80.8, 35.2], [-86.8, 36.2], [-84.5, 39.1], [-80, 40.4], [-77, 38.9], [-75.2, 39.95], [-74, 40.7], [-71.06, 42.36], [-78.9, 42.9], [-94.6, 39.1], [-97.3, 37.7], [-108.5, 45.8], [-96.8, 46.9], [-86.2, 39.8], [-92.3, 34.7], [-101.8, 35.2], [-100.8, 46.8], [-89.4, 43.1], [-73.8, 42.7]];
const KANSAS_LL = [-98.4, 38.5];
const p2 = (t) => {
  const P = T.mapa(R, t, { zoom: 1.1, centro: [-96.4, 38.4] });
  const [kx, ky] = P(KANSAS_LL);
  // los vasitos salen desde Kansas hacia fuera; en «won» la ola los vuelve del color de la receta ganadora
  const lista = CIUDADES.map((ll, i) => { const [x, y] = P(ll); return { x: Math.round(x), y: Math.round(y), d: Math.hypot(x - kx, y - ky), i }; }).sort((a, b) => a.d - b.d);
  const dmax = lista[lista.length - 1].d;
  R.recorte([24, 18, 296, 166]);
  for (const c of lista) {
    const sale = lin(t, Q2 + 0.25 + c.d / dmax * 1.1, Q2 + 0.4 + c.d / dmax * 1.1); if (sale <= 0) continue;
    const ola = lin(t, GANA + c.d / dmax * 0.7, GANA + 0.12 + c.d / dmax * 0.7), quien = c.i % 7 === 3 ? 2 : c.i % 9 === 5 ? 1 : 0;
    const y = c.y - Math.round((1 - sale) * 5);
    if (ola <= 0) { R.disco(c.x + 1, c.y + 2, 3, hex('#8a7a5a')); vasito(c.x, y + 3, 0.7); }
    else { const col = quien === 0 ? T.C.rojoCola : quien === 1 ? hex('#5a3020') : T.C.azulCola; R.disco(c.x + 1, c.y + 1, 4, hex('#6a5a3a')); R.disco(c.x, c.y, 4, K); R.disco(c.x, c.y, 3, col); R.pset(c.x - 1, c.y - 1, hex('#ffffff')); if (ola < 1) destello(c.x, c.y, ola, hex('#fff6c0')); }
  }
  R.recorte(null);
  // la chincheta de Kansas cae al empezar, con la estrella
  T.chincheta(R, kx, ky, t, T.C.rojoCola, { baja: lin(t, Q2, Q2 + 0.35) });
  if (t > Q2 + 0.35) { const s = Math.sin(t * 5) > 0 ? hex('#f0c030') : hex('#ffe890'); R.pset(kx, ky - 13, s); R.pset(kx - 1, ky - 12, s); R.pset(kx + 1, ky - 12, s); R.pset(kx, ky - 14, s); R.pset(kx, ky - 11, s); }
  // la mano desliza la ficha del recuento (tres latas y sus barras) en «won»
  const e = lin(t, GANO - 0.4, GANO + 0.1), sal = lin(t, GANO + 0.9, GANO + 1.3);
  const fx = Math.round(lerp(-70, 30, sv(e))), fy = 124;
  caja(fx, fy, fx + 62, fy + 38, hex('#f4f0e2'), hex('#6a5a3a')); R.rect(fx + 1, fy + 37, fx + 62, fy + 38, hex('#c8bea4'));
  const bar = lin(t, GANO + 0.1, VIEJA);
  [[T.C.rojoCola, 1], [hex('#5a3020'), 0.58], [T.C.azulCola, 0.5]].forEach(([c, v], j) => { const y = fy + 6 + j * 11; R.rect(fx + 7, y + 1, fx + 11, y + 8, j === 2 ? T.C.azulCola : j === 1 ? hex('#5a3020') : T.C.rojoCola); R.rect(fx + 7, y, fx + 11, y, hex('#a8a8b0')); const w = Math.round(40 * v * bar); if (w > 0) caja(fx + 16, y + 2, fx + 16 + w, y + 6, c, K); });
  if (bar >= 1) T.visto(R, fx + 46, fy + 2, 1);
  if (sal < 1) T.brazo(R, -50, 186, Math.round(fx + 4 - sal * 60), fy + 22, '#22283a', 1, { codo: [-12, 170] });
};
// ── 3. la sala de resultados ──
const POD = { 2: [100, 140, 132], 1: [140, 180, 118], 3: [180, 220, 142] };   // x0, x1, tablero
const resultados = () => capa('resultados', () => {
  for (let y = 0; y <= 124; y++) for (let x = 0; x < 320; x++) { let c = hex('#b8c0c8'); if (x % 40 === 20 && x < 266) c = hex('#a0a8b2'); else if (tr(x, y, 0.1 + y / 800)) c = hex('#b0b8c2'); R.pset(x, y, c); }
  R.rect(0, 100, 319, 102, hex('#8a92a0')); R.rect(0, 100, 319, 100, hex('#d0d8e0'));
  for (let y = 103; y <= 124; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tr(x, y, 0.3) ? hex('#7a8494') : hex('#848e9e'));
  R.rect(0, 122, 319, 124, hex('#3a3e48'));
  // la ventana del atardecer (el cielo y la ciudad se pintan en cada fotograma); el marco y la persiana
  caja(10, 24, 86, 98, hex('#e8eef4'), hex('#4a505a'));
  // el corcho con gráficas, recortes y chinchetas
  caja(96, 28, 152, 80, hex('#b08a5a'), hex('#5a3a1a')); for (let y = 29; y < 80; y++) for (let x = 97; x < 152; x++) if (hh(x, y, 2) > 0.7) R.pset(x, y, hex('#9a7448'));
  caja(100, 32, 122, 50, hex('#fbfaf4'), hex('#8a8a84')); for (let i = 0; i < 4; i++) R.rect(103 + i * 5, 46 - i * 3 - (i % 2) * 2, 105 + i * 5, 48, [T.C.rojoCola, hex('#5a3020'), T.C.azulCola, T.C.rojoCola][i]);
  caja(126, 34, 148, 52, hex('#fbfaf4'), hex('#8a8a84')); R.linea(128, 48, 134, 44, T.C.rojoCola); R.linea(134, 44, 140, 46, T.C.rojoCola); R.linea(140, 46, 146, 37, T.C.rojoCola);
  caja(102, 56, 120, 76, hex('#f4f0d0'), hex('#8a8a84')); vasito(108, 72, 0.8, 1); vasito(115, 72, 0.8, 2);
  caja(126, 58, 148, 76, hex('#fbfaf4'), hex('#8a8a84')); R.numero('85', 128, 70, { color: hex('#2a3a7a'), sombra: false });
  for (const [x, y] of [[111, 32], [137, 34], [111, 56], [137, 58]]) { R.disco(x, y, 1, hex('#c83a2a')); R.pset(x - 1, y - 1, hex('#ff8a7a')); }
  // la pantalla de proyección con su caja enrollable
  caja(160, 16, 266, 20, hex('#6a6e78'), hex('#2a2e36'));
  caja(164, 21, 262, 92, hex('#f4f4f2'), hex('#8a8e98')); R.rect(164, 92, 262, 93, hex('#3a3e48')); R.disco(213, 95, 1, hex('#3a3e48'));
  // la mesa de la impresora de agujas, a la izquierda
  caja(12, 104, 82, 108, hex('#8a6a4a'), hex('#3a2a1a')); R.rect(16, 108, 18, 124, hex('#5a4030')); R.rect(76, 108, 78, 124, hex('#5a4030'));
  caja(22, 92, 62, 103, hex('#d8d0bc'), hex('#5a5448')); R.rect(26, 95, 58, 97, hex('#3a3a3a')); R.pset(56, 100, hex('#4af06a'));
  // el carrito del proyector a la derecha (debajo de la esquina de Atom)
  caja(274, 102, 310, 106, hex('#9aa0aa'), hex('#3a3e48')); R.rect(278, 106, 279, 124, hex('#6a707a')); R.rect(305, 106, 306, 124, hex('#6a707a')); caja(276, 116, 308, 118, hex('#9aa0aa'), hex('#3a3e48'));
  caja(280, 90, 304, 101, hex('#3a3e48'), K); R.disco(282, 95, 4, hex('#6a707a')); R.disco(282, 95, 2, hex('#e8f0ff')); R.rect(290, 92, 302, 93, hex('#5a5e68'));
  // moqueta gris de losetas
  for (let y = 125; y < 180; y++) for (let x = 0; x < 320; x++) { const z = (y - 112) / 68, u = Math.floor(((x - 160) / z + 2000) / 30), v = Math.floor(10 / z); let c = (u + v) % 2 ? hex('#5a5e6a') : hex('#545864'); if (tr(x, y, 0.12)) c = hex('#62666e'); R.pset(x, y, c); }
  // el podio: 2, 1 y 3 con sus números
  for (const [n, [x0, x1, y0]] of Object.entries(POD)) { caja(x0, y0, x1 - 1, 162, hex('#f2f2f4'), hex('#3a3e48')); R.rect(x0, y0, x1 - 1, y0 + 2, hex('#c8a040')); R.rect(x1 - 4, y0 + 3, x1 - 1, 162, hex('#c8ccd4')); R.numero(n, Math.round((x0 + x1) / 2), y0 + 20, { tam: 16, centro: true }); }
  for (let x = 98; x < 222; x++) if (tr(x, 163, 0.6)) R.pset(x, 163, hex('#3a3e48'));
});
const p3 = (t) => {
  resultados();
  // el cielo del atardecer con nubes y pájaros, y la ciudad, recortados a la ventana; la persiana
  R.recorte([11, 25, 85, 97]);
  grad(11, 25, 85, 97, [hex('#f0a860'), hex('#f08860'), hex('#c86070'), hex('#8a5a7a')]);
  nubes(11, 85, t, 30, 60, [hex('#ffd8b0'), hex('#f0a888'), hex('#b07080')], 4, 1.2, 9);
  for (let k = 0; k < 3; k++) pajaro(11 + ((t * (8 + k * 3) + k * 30) % 80), 42 + k * 6, t, k, hex('#4a2a3a'));
  for (const [bx, bw, bh] of [[11, 12, 30], [23, 9, 42], [32, 14, 24], [46, 8, 50], [54, 12, 34], [66, 9, 40], [75, 11, 28]]) { cajaR(bx, 97 - bh, bx + bw - 1, 97, hex('#4a3a52')); for (let wy = 97 - bh + 3; wy < 96; wy += 4) for (let wx = bx + 2; wx < bx + bw - 1; wx += 3) if (hh(wx, wy, 3) > 0.55) R.pset(wx, wy, Math.sin(t * 0.5 + wx) > -0.6 ? hex('#ffd880') : hex('#4a3a52')); }
  R.recorte(null);
  for (let y = 25; y <= 44; y += 2) { R.rect(11, y, 85, y, hex('#e8e8e0')); R.rect(11, y + 1, 85, y + 1, hex('#b8b8b0')); } R.rect(48, 24, 48, 98, hex('#4a505a')); R.linea(80, 45, 80, 70, hex('#8a8a84'));
  // el haz del proyector hacia la pantalla y la gráfica: barras que crecen en «numbers»; el visto bueno en «safest»
  for (let y = 24; y < 100; y++) { const u = (y - 24) / 72; const xa = Math.round(lerp(168, 280, u * u)), xb = Math.round(lerp(258, 282, u)); for (let x = xa; x <= xb; x++) if (y > 92 && tr(x, y, 0.18)) R.pset(x, y, hex('#e8ecf4')); }
  const b = lin(t, NUMEROS - 0.2, NUMEROS + 0.8);
  R.rect(176, 84, 250, 84, hex('#3a3e48')); R.rect(176, 28, 176, 84, hex('#3a3e48'));
  [[T.C.rojoCola, 50, 186], [hex('#5a3020'), 30, 210], [T.C.azulCola, 25, 234]].forEach(([c, h, x], j) => { const hh2 = Math.round(h * sv(lin(b, j * 0.15, 0.6 + j * 0.15))); if (hh2 > 0) { R.rect(x - 7, 83 - hh2, x + 7, 83, c); R.rect(x - 7, 83 - hh2, x - 6, 83, hex('#ffffff')); } });
  if (b > 0.9) R.numero('1', 186, 30 + (50 - 50) + 0, { color: hex('#c8a040'), sombra: false });
  if (t > SEGURA) T.visto(R, 236, 30, 2);
  // la impresora de agujas escupe papel continuo que cae en zigzag
  const pl = Math.round((t * 6) % 6); R.rect(26, 88 - pl, 58, 91, hex('#fbfaf4')); for (let y = 88 - pl; y < 91; y += 2) R.pset(27, y, hex('#a8a8a0'));
  for (let j = 0; j < 5; j++) { const y = 108 + j * 3; R.rect(30, y, 58, y + 2, j % 2 ? hex('#e8f0e0') : hex('#fbfaf4')); R.rect(30, y + 2, 58, y + 2, hex('#a8b8a0')); }
  // el científico lee la tira de papel junto a la impresora
  R.actor(NC.cientifico, 64, 168, t, { dir: 1, sostiene: [80, 142], sonrisa: t > NUMEROS, sorpresa: t > NUMEROS - 0.2 && t < NUMEROS + 0.4 });
  { const r = [80, 142]; caja(r[0] - 1, r[1] - 10, r[0] + 7, r[1], hex('#fbfaf4'), hex('#8a8a84')); for (let j = 0; j < 3; j++) R.rect(r[0] + 1, r[1] - 8 + j * 3, r[0] + 5, r[1] - 8 + j * 3, hex('#7a9a6a')); }
  // las latas del podio: la nueva (con su franja) en el 1 y la vieja en el 2; la azul llega en brazos en «Pepsi»
  const brilla = Math.floor(t * 3) % 2;
  PZ.lata(R, 160, POD[1][2], { color: 'rojo', franja: true, s: 2 }); if (brilla) destello(170, POD[1][2] - 30, 0.5);
  PZ.lata(R, 120, POD[2][2], { color: 'rojo', s: 2 });
  const lleva = lin(t, Q3 - 0.4, PEPSI - 0.1), deja = t >= PEPSI;
  const cx = Math.round(lerp(300, 214, sv(lleva))), vuelve = lin(t, PEPSI + 0.6, NUMEROS + 0.4), cx2 = Math.round(lerp(214, 290, sv(vuelve)));
  if (deja) PZ.lata(R, 200, POD[3][2], { color: 'azul', s: 2 });
  const xc = deja ? cx2 : cx;
  const r = R.actor(NC.cientifica, xc, 168, t, { dir: deja && vuelve > 0 && vuelve < 1 ? 1 : -1, anda: (lleva > 0 && lleva < 1) || (vuelve > 0 && vuelve < 1), sostiene: deja ? undefined : [xc - 2, 150], sonrisa: deja, enfado: !deja && lleva > 0.9 });
  if (!deja) PZ.lata(R, r.mano[0] - 6, r.mano[1] + 12, { color: 'azul', s: 2 });
  // Goizueta señala la pantalla en «numbers»; en «safest» cuelga la medalla a la lata nueva y levanta los brazos
  const va = lin(t, SEGURA - 0.9, SEGURA - 0.2), gx = Math.round(lerp(250, 226, sv(va)));
  const medalla = t > SEGURA;
  R.actor(NC.goizueta, gx, 172, t, { dir: va > 0 ? -1 : -1, anda: va > 0 && va < 1, dedo: t > NUMEROS && t < SEGURA - 0.9, habla: t > NUMEROS + 0.2 && t < SEGURA - 1 && Math.sin(t * 8) > 0, sonrisa: t > SEGURA - 0.2, brazos: t > MUNDO - 0.3 });
  if (medalla) { const y = POD[1][2] - 20; R.linea(156, y - 8, 160, y, hex('#2a5aa8')); R.linea(164, y - 8, 160, y, hex('#2a5aa8')); R.disco(160, y + 3, 4, K); R.disco(160, y + 3, 3, hex('#f0c030')); R.pset(159, y + 2, hex('#fff6c0')); destello(166, y - 2, lin(t, SEGURA, SEGURA + 0.6)); }
  if (t > MUNDO - 0.3) { for (let q = 0; q < 14; q++) { const ct = t - MUNDO + 0.3, x = 120 + Math.round(hh(q, 1) * 90 + Math.sin(ct * 4 + q) * 4), y = 40 + Math.round(ct * 40 + hh(q, 2) * 30); if (y < 160) R.rect(x, y, x + 1, y, [T.C.rojoCola, hex('#f0c030'), hex('#ffffff')][q % 3]); } }
};
const efectos = [[CORRE + 0.1, 'tic'], [DOSC + 0.5, 'brillo'], [Q2 + 0.25, 'pop'], [GANA + 0.1, 'brillo'], [GANO - 0.2, 'papel'], [PEPSI, 'golpecito'], [NUMEROS, 'bip'], [SEGURA + 0.05, 'campana'], [MUNDO - 0.25, 'palmada']];
T.rodar(E, R, [[0, p1], [Q2, p2], [Q3, p3]], { efectos, año: 1984 });
''')

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nc-anuncio'] = ('El anuncio', '''// NC-ANUNCIO (frase 12, «On April 23, 1985, in New York…»), cartela «1985» y barra en 1985. Cuatro planos:
// 1. fondo local: la fachada de la sala de conciertos de la plaza (columnata fina de travertino, muro de cristal con el
//    vestíbulo encendido, escalinata, macetones con cerezos en flor), cielo de abril con nubes y palomas, la furgoneta de
//    la tele que sube el mástil, el reloj de la farola con «4/23», un taxi que pasa por delante; los periodistas y el
//    cámara llegan y suben la escalinata; las palomas echan a volar. Corta en «Coca».
// 2. anuncio/prensa general: la sala se llena: el presentador espera junto a la lata tapada y la señala en «huge»,
//    Goizueta entra por la derecha y se planta en el atril; la periodista entra corriendo con el micro y el cámara por la
//    izquierda; en «packed» se disparan los flashes. Corta en «reporters».
// 3. anuncio/prensa 'atril' (gag 4): Goizueta habla en el atril; el presentador se acerca a la peana en «retired» y
//    agarra la esquina; en «the new one» tira, se lleva el paño Y el mantel, trastabilla; la lata nueva brilla en «here»
//    y estallan los flashes. Corta en «The press».
// 4. fondo local: el quiosco de prensa de una esquina de Nueva York a la mañana siguiente: revistas, periódicos con la
//    foto de la lata, el vendedor, una señora que compra, vapor de la alcantarilla, un taxi; cae el fardo de periódicos,
//    y en «New Coke» la portada sale girando hacia la cámara: la foto de la lata nueva con sus destellos.''', COMUN + r'''
const a = (f) => en('anuncio', f);
const A2 = a(0.206), A3 = a(0.46), A4 = a(0.87);
const HUGE = a(0.266), LLENA = a(0.405), LINCOLN = a(0.512), ANUNCIA = a(0.584), RETIRA = a(0.711), NUEVA = a(0.789), AQUI = a(0.828);
const NOMBRE = a(0.934), NEWCOKE = a(0.963);
// ── 1. la fachada de la plaza ──
const fachada = () => capa('fachada', () => {
  grad(0, 0, 319, 70, [hex('#5a90d8'), hex('#78a8e4'), hex('#a8c8ee'), hex('#c8dcf0')]);
  // Manhattan en la bruma
  for (let k = 0; k < 26; k++) { const x = k * 13 - 4, w = 8 + Math.round(hh(k, 1) * 8), h = 14 + Math.round(hh(k, 2) * 26); R.rect(x, 64 - h, x + w, 64, hex('#9ab4d0')); R.rect(x + w - 2, 64 - h, x + w, 64, hex('#8aa4c2')); for (let y = 66 - h; y < 62; y += 3) for (let xx = x + 2; xx < x + w - 2; xx += 3) if (hh(xx, y) > 0.6) R.pset(xx, y, hex('#b0c6dc')); }
  R.rect(140, 14, 142, 30, hex('#9ab4d0')); R.rect(136, 28, 146, 40, hex('#9ab4d0'));
  // las alas laterales de la plaza: travertino con juntas, ventanas altas oscuras y su cornisa
  for (const [x0, x1] of [[0, 35], [285, 319]]) { for (let y = 58; y < 140; y++) for (let x = x0; x <= x1; x++) { let c = hex('#e2d6ba'); if ((y - 58) % 9 === 0 || (x + Math.floor((y - 58) / 9) * 7) % 14 === 0) c = hex('#c4b698'); else if (tr(x, y, 0.1)) c = hex('#d8cbae'); R.pset(x, y, c); }
    R.rect(x0, 56, x1, 59, hex('#f2e8d0')); R.rect(x0, 59, x1, 60, hex('#a89a7c'));
    for (let wx = x0 + 4; wx < x1 - 4; wx += 12) { caja(wx, 68, wx + 6, 96, hex('#3a4a5e'), hex('#8a7c60')); R.rect(wx + 1, 69, wx + 2, 80, hex('#6a8aa8')); caja(wx, 104, wx + 6, 130, hex('#3a4a5e'), hex('#8a7c60')); R.rect(wx + 1, 105, wx + 2, 114, hex('#6a8aa8')); } }
  // la sala: cornisa de travertino, columnata fina delante del muro de cristal encendido
  caja(34, 40, 286, 52, hex('#ece0c4'), hex('#8a7c60')); R.rect(34, 50, 286, 52, hex('#c8b898')); for (let x = 36; x < 286; x += 4) R.pset(x, 46, hex('#d8caa8'));
  grad(36, 53, 284, 136, [hex('#f0c870'), hex('#e8a850'), hex('#c88a40')]);
  for (let y = 53; y <= 136; y++) for (let x = 36; x <= 284; x++) if (y % 20 === 0 || x % 22 === 0) R.pset(x, y, hex('#6a4a2a'));
  // el vestíbulo: palcos, la escalera curva, las lámparas de araña y gente pequeña dentro (fija)
  for (const ly of [73, 93, 113]) { R.rect(36, ly, 284, ly + 2, hex('#8a3a2a')); R.rect(36, ly, 284, ly, hex('#c86a4a')); }
  for (let k = 0; k < 10; k++) { const sx = 150 + Math.round(Math.sin(k / 9 * Math.PI) * 30), sy = 74 + k * 6; R.rect(sx - 6, sy, sx + 6, sy + 1, hex('#a8402a')); }
  for (const [lx, ly] of [[80, 62], [160, 60], [240, 62]]) { R.linea(lx, 53, lx, ly - 4, hex('#6a4a2a')); for (let q = 0; q < 10; q++) { const an = q / 10 * Math.PI * 2; R.linea(lx, ly, lx + Math.round(Math.cos(an) * 7), ly + Math.round(Math.sin(an) * 4), hex('#fff0c0')); } R.disco(lx, ly, 2, hex('#ffffff')); }
  for (let k = 0; k < 14; k++) { const x = 44 + Math.round(hh(k, 4) * 230), y = [72, 92, 112, 134][k % 4]; if (Math.abs(x - 160) > 22) { R.rect(x - 1, y - 6, x + 1, y - 2, k % 2 ? hex('#3a2a40') : hex('#5a2a2a')); R.rect(x - 1, y - 8, x + 1, y - 7, hex('#2a1a14')); } }
  // las columnas finas de travertino con su sombra
  for (let x = 40; x <= 280; x += 16) { R.rect(x, 52, x + 4, 137, hex('#f2e8d0')); R.rect(x + 3, 52, x + 4, 137, hex('#c8b898')); R.rect(x, 52, x, 137, hex('#fffaec')); for (let y = 56; y < 136; y += 9) R.pset(x + 2, y, hex('#d8caa8')); }
  // las puertas de cristal del centro
  caja(146, 112, 174, 137, hex('#f8e0a0'), hex('#3a3a40')); R.rect(160, 112, 160, 137, hex('#3a3a40')); R.rect(156, 124, 158, 126, hex('#c8a040')); R.rect(162, 124, 164, 126, hex('#c8a040'));
  // la escalinata y la plaza de losas de travertino
  for (let k = 0; k < 4; k++) { const y = 137 + k * 3; R.rect(26 - k * 6, y, 294 + k * 6, y + 2, k % 2 ? hex('#e0d4b8') : hex('#ece2c8')); R.rect(26 - k * 6, y + 2, 294 + k * 6, y + 2, hex('#b0a488')); }
  for (let y = 149; y < 172; y++) for (let x = 0; x < 320; x++) { const z = (y - 140) / 32, u = Math.floor(((x - 160) / z + 2000) / 26); let c = (u + Math.floor(y / 6)) % 2 ? hex('#e4d8bc') : hex('#dacdae'); if ((y - 149) % 6 === 0) c = hex('#b8ac90'); if (tr(x, y, 0.08)) c = hex('#cfc2a2'); R.pset(x, y, c); }
  // bordillo y calzada
  R.rect(0, 172, 319, 173, hex('#9a9a9a')); for (let y = 174; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tr(x, y, 0.2) ? hex('#4a4a52') : hex('#3e3e46'));
  for (let x = 6; x < 320; x += 30) R.rect(x, 177, x + 12, 177, hex('#e8c030'));
  // macetones con cerezos en flor y las farolas con el reloj de la calle
  for (const mx of [92, 228]) { caja(mx - 10, 150, mx + 10, 166, hex('#a8a090'), hex('#4a4438')); R.rect(mx - 10, 150, mx + 10, 152, hex('#c8c0b0')); R.rect(mx - 1, 132, mx + 1, 150, hex('#5a3a2a'));
    for (let q = 0; q < 34; q++) { const an = hh(q, mx) * Math.PI * 2, r = hh(q, mx, 2) * 13; const px = mx + Math.round(Math.cos(an) * r * 1.2), py = 124 + Math.round(Math.sin(an) * r * 0.7); R.disco(px, py, 2, q % 3 ? hex('#f4b8c8') : hex('#e890a8')); R.pset(px - 1, py - 1, hex('#fde0e8')); } }
  for (const lx of [18, 302]) { R.rect(lx - 1, 92, lx + 1, 170, hex('#2a3a2a')); R.rect(lx - 3, 168, lx + 3, 171, hex('#2a3a2a')); R.disco(lx, 90, 4, hex('#f4f0d8')); R.disco(lx, 90, 3, hex('#fffaf0')); }
  caja(286, 104, 316, 118, hex('#1a1a20'), hex('#4a4a52'));
});
const p1 = (t) => {
  fachada();
  // nubes de tres tonos y palomas, sin tocar la esquina de Atom
  R.recorte([0, 0, 268, 38]); nubes(0, 268, t, 8, 30, [hex('#ffffff'), hex('#e4ecf6'), hex('#b8cce4')], 5, 1.5, 12); R.recorte(null);
  for (let k = 0; k < 3; k++) pajaro(((t * (12 + k * 4) + k * 70) % 300), 22 + k * 5, t, k, hex('#4a4a5a'));
  // la luz del vestíbulo que titila y el reloj de la calle: 4/23 y la hora
  if (Math.floor(t * 2) % 3 === 0) R.disco(160, 60, 1, hex('#fffaf0'));
  R.numero(Math.floor(t / 1.6) % 2 ? '4/23' : '9:58', 301, 115, { centro: true, color: hex('#f0b030'), sombra: false });
  // la furgoneta de la tele aparcada a la izquierda: el mástil sube con la parabólica
  const m = sv(lin(t, 1.4, 3.6)), mt = Math.round(lerp(130, 74, m));
  R.rect(28, mt, 29, 130, hex('#c8ccd4')); R.rect(30, mt, 30, 130, hex('#8a8e98')); R.disco(29, mt - 2, 4, hex('#e8ecf0')); R.linea(26, mt - 4, 33, mt + 1, hex('#8a8e98')); R.pset(29, mt - 2, hex('#ff4a3a'));
  caja(2, 130, 62, 164, hex('#f2f2f2'), hex('#3a3a40')); R.rect(2, 146, 62, 150, hex('#2a5aa8')); R.rect(2, 151, 62, 152, hex('#c8302a'));
  caja(44, 134, 60, 144, hex('#6a8aa8'), hex('#3a3a40')); R.rect(45, 135, 47, 143, hex('#9ab8d0'));
  for (const wx of [14, 50]) { R.disco(wx, 165, 5, K); R.disco(wx, 165, 2, hex('#8a8e98')); }
  // las palomas de la plaza picotean y echan a volar cuando llega el cámara
  for (let k = 0; k < 4; k++) { const vuela = lin(t, 2.5 + k * 0.15, 3.6 + k * 0.15), px = 204 + k * 9 + Math.round(vuela * 40), py = 166 - Math.round(vuela * 60) - (k % 2) * 2;
    if (vuela <= 0) { const pic = Math.sin(t * 6 + k * 2) > 0.5; R.rect(px - 2, py - 3, px + 2, py - 1, hex('#8a8e9a')); R.pset(px + (pic ? 3 : 3), py - (pic ? 1 : 4), hex('#6a6e7a')); R.pset(px - 3, py - 3, hex('#5a5e6a')); R.pset(px, py, hex('#c86a4a')); }
    else pajaro(px, py, t * 2, k, hex('#6a6e7a')); }
  // los periodistas llegan y suben la escalinata hacia las puertas
  const sube = (x) => x > 120 && x < 200 ? Math.round(lerp(160, 148, lin(Math.abs(x - 160), 40, 14))) : 160;
  const u1 = lin(t, 1.3, A2 - 0.2), x1 = Math.round(lerp(60, 146, u1));
  R.actor(NC.periodista, x1, sube(x1) + 4, t, { dir: 1, anda: u1 > 0 && u1 < 1 });
  const u2 = lin(t, 1.6, A2), x2 = Math.round(lerp(330, 172, u2));
  R.actor(NC.camarografo, x2, sube(x2) + 4, t, { dir: -1, anda: u2 > 0 && u2 < 1 });
  const u3 = lin(t, 2.4, A2), x3 = Math.round(lerp(-20, 108, u3));
  R.actor(NC.periodista2, x3, 168, t, { dir: 1, anda: u3 > 0 && u3 < 1, habla: Math.sin(t * 7) > 0.4 });
  // el taxi amarillo pasa por delante
  const tx = Math.round(lerp(-70, 360, lin(t, 2.6, 4.4)));
  if (tx > -70 && tx < 360) { caja(tx, 168, tx + 52, 178, hex('#f0c020'), K); R.poligono([[tx + 12, 168], [tx + 18, 160], [tx + 38, 160], [tx + 44, 168]], hex('#f0c020')); R.linea(tx + 12, 168, tx + 18, 160, K); R.linea(tx + 18, 160, tx + 38, 160, K); R.linea(tx + 38, 160, tx + 44, 168, K);
    R.rect(tx + 19, 162, tx + 27, 167, hex('#8ab0d0')); R.rect(tx + 30, 162, tx + 37, 167, hex('#8ab0d0')); R.rect(tx + 24, 157, tx + 32, 159, hex('#f4f0d8')); for (let q = 0; q < 6; q++) R.rect(tx + 4 + q * 8, 172, tx + 7 + q * 8, 173, q % 2 ? K : hex('#f4f0d8'));
    for (const wx of [tx + 10, tx + 42]) { R.disco(wx, 178, 4, K); R.disco(wx, 178, 1, hex('#8a8e98')); } R.rect(tx + 50, 170, tx + 52, 172, hex('#fff6c0')); }
};
// ── 2 y 3. la rueda de prensa ──
const PRENSA = { encuadre: 'prensa' }, ATRIL = { encuadre: 'prensa', camara: 'atril' };
const p2 = (t) => {
  const fl = t < A2 + 0.45 ? 0 : 0.35 + 0.65 * lin(t, LLENA, LLENA + 0.5);   // sin flashes en el fundido de entrada
  const o = { ...PRENSA, flashes: fl };
  T.anuncio(R, t, o);
  // el presentador espera junto a la lata y la señala en «huge»
  R.actor(NC.presentador, 214, 118, t, { dir: -1, dedo: t > HUGE && t < HUGE + 1.2, sonrisa: true });
  // Goizueta entra por la derecha por la tarima y se planta en el atril
  const g = lin(t, A2 + 0.3, A2 + 2.0), gx = Math.round(lerp(300, 250, sv(g)));
  R.actor(NC.goizueta, gx, 118, t, { dir: -1, anda: g > 0 && g < 1, sonrisa: g >= 1, habla: g >= 1 && Math.sin(t * 8) > 0.3 });
  // la periodista entra corriendo con el micro y el cámara por la izquierda; el periodista de la libreta pregunta
  const p = lin(t, A2 + 0.1, A2 + 1.4), px = Math.round(lerp(334, 214, sv(p)));
  R.actor(NC.periodista2, px, 158, t, { dir: -1, anda: p > 0 && p < 1, sonrisa: p >= 1 });
  const c = lin(t, A2 + 0.5, A2 + 2.2), cx = Math.round(lerp(-24, 86, sv(c)));
  R.actor(NC.camarografo, cx, 158, t, { dir: 1, anda: c > 0 && c < 1 });
  R.actor(NC.periodista, 150, 158, t, { dir: 1, dedo: t > LLENA && t < LLENA + 0.7, habla: t > LLENA && t < LLENA + 0.7 && Math.sin(t * 9) > 0 });
  T.anuncioDelante(R, t, o);
};
const p3 = (t) => {
  const tira = sv(lin(t, NUEVA - 0.15, NUEVA + 0.45)), mantel = sv(lin(t, NUEVA - 0.15, NUEVA + 0.3));
  const fl = 0.3 + 0.7 * lin(t, AQUI - 0.2, AQUI + 0.2) - 0.4 * lin(t, AQUI + 0.6, A4);
  const o = { ...ATRIL, paño: tira, mantel, destapada: tira >= 1, flashes: fl };
  T.anuncio(R, t, o);
  // el presentador va hacia la peana en «retired», agarra la esquina del mantel y tira en «the new one»
  const va = lin(t, RETIRA - 0.6, RETIRA + 0.2), atras = lin(t, NUEVA - 0.15, NUEVA + 0.5);
  const mx = Math.round(lerp(170, 133, sv(va)) + atras * 22), agarra = va >= 1 && atras < 0.5;
  R.actor(NC.presentador, mx, 160, t, { dir: -1, anda: (va > 0 && va < 1), sostiene: agarra ? [124, 122] : undefined, sorpresa: atras > 0.2 && atras < 1, sonrisa: atras >= 1, salto: atras > 0.3 && atras < 0.7 ? 2 : 0 });
  // Goizueta habla en el atril: explica con el índice; se sorprende con el tirón y sonríe cuando sale la lata
  R.actor(NC.goizueta, 216, 160, t, { dir: -1, habla: t < NUEVA - 0.3 && Math.sin(t * 8) > -0.1, dedo: t > ANUNCIA && t < RETIRA, sorpresa: t > NUEVA && t < AQUI + 0.2, sonrisa: t > AQUI + 0.2 });
  T.anuncioDelante(R, t, o);
  if (t > AQUI) { destello(70, 80, lin(t, AQUI, AQUI + 0.7)); destello(100, 92, lin(t, AQUI + 0.3, AQUI + 1.0)); destello(80, 104, lin(t, AQUI + 0.6, AQUI + 1.3)); }
};
// ── 4. el quiosco de prensa de la esquina ──
const PORTADA = (x0, y0, w, h, t, grande) => {
  caja(x0, y0, x0 + w, y0 + h, hex('#f4f2ea'), hex('#3a3a40'));
  R.rect(x0 + 2, y0 + 2, x0 + w - 2, y0 + 2 + Math.max(2, Math.round(h * 0.13)), hex('#1a1a20'));
  const fx = x0 + Math.round(w * 0.3), fy = y0 + Math.round(h * 0.24), fw = Math.round(w * 0.42), fh = Math.round(h * 0.6);
  caja(fx, fy, fx + fw, fy + fh, hex('#2a2a34'), hex('#3a3a40'));
  for (let y = y0 + Math.round(h * 0.24); y < y0 + h - 2; y += grande ? 3 : 2) { R.rect(x0 + 3, y, fx - 3, y, hex('#a8a8a0')); R.rect(fx + fw + 3, y, x0 + w - 3, y, hex('#a8a8a0')); }
  return [fx + Math.round(fw / 2), fy + fh - 2];
};
const quiosco = () => capa('quiosco', () => {
  // arriba, la cornisa de piedra y el estuco liso (la esquina de Atom, tranquila); ventanas con jardineras a la izquierda
  R.rect(0, 0, 319, 44, hex('#d8ccb4')); for (let y = 0; y < 44; y++) for (let x = 0; x < 320; x++) if (tr(x, y, 0.1)) R.pset(x, y, hex('#cfc2a8'));
  for (const wx of [24, 92, 180]) { caja(wx, 16, wx + 34, 40, hex('#3a4a5a'), hex('#5a4a3a')); R.rect(wx + 17, 16, wx + 17, 40, hex('#8a7a6a')); R.rect(wx, 28, wx + 34, 28, hex('#8a7a6a')); R.rect(wx + 2, 18, wx + 6, 26, hex('#6a8aa8'));
    R.rect(wx - 2, 40, wx + 36, 43, hex('#6a4a2a')); for (let q = 0; q < 8; q++) R.disco(wx + 2 + q * 4, 38, 2, q % 2 ? hex('#c83a4a') : hex('#3a8a3a')); }
  R.rect(0, 44, 319, 48, hex('#b8ac94')); R.rect(0, 44, 319, 44, hex('#ece2cc')); R.rect(0, 48, 319, 48, hex('#7a6e58'));
  // pared de ladrillo
  for (let y = 49; y < 148; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 49) / 5), jx = (x + (f % 2) * 6) % 12 === 0, jy = (y - 49) % 5 === 0; let c = jx || jy ? hex('#c8b8a0') : hh(Math.floor((x + (f % 2) * 6) / 12), f) > 0.5 ? hex('#a84a30') : hex('#984028'); if (!jx && !jy && tr(x, y, 0.12)) c = hex('#b85a3a'); R.pset(x, y, c); }
  // la cafetería de la derecha: escaparate con su rótulo de neón en pictograma (taza)
  caja(252, 58, 318, 140, hex('#3a2a20'), hex('#1a1210')); grad(254, 60, 316, 138, [hex('#f0c880'), hex('#d89850'), hex('#a86a3a')]);
  for (let k = 0; k < 4; k++) { const x = 262 + k * 14; R.rect(x - 2, 112, x + 2, 120, hex('#fbfaf4')); R.rect(x - 4, 120, x + 4, 122, hex('#6a4a2a')); }
  R.rect(254, 122, 316, 126, hex('#6a4a2a')); R.rect(254, 122, 316, 122, hex('#8a6a4a'));
  // el quiosco verde: tejadillo, paredes de revistas, periódicos colgados y el mostrador
  caja(60, 54, 244, 62, hex('#2a6a3a'), hex('#143a1e')); for (let x = 60; x < 244; x += 8) { R.disco(x + 4, 63, 4, hex('#2a6a3a')); R.pset(x + 4, 66, hex('#143a1e')); }
  R.rect(60, 54, 244, 55, hex('#4a9a5a'));
  caja(66, 68, 238, 148, hex('#3a2a20'), hex('#1a1210'));
  for (let row = 0; row < 3; row++) for (let i = 0; i < 12; i++) { const x = 70 + i * 14, y = 72 + row * 18; const cols = ['#c83a4a', '#3a6ab0', '#f0c030', '#4a9a5a', '#e87a3a', '#8a4ab0', '#f4f2ea']; const c = hex(cols[(i * 3 + row * 5) % cols.length]);
    caja(x, y, x + 11, y + 15, c, hex('#1a1210')); R.rect(x + 1, y + 1, x + 10, y + 3, hex('#fbfaf4')); R.rect(x + 3, y + 6, x + 8, y + 12, hh(i, row) > 0.5 ? hex('#e8b090') : hex('#2a2a34')); }
  R.rect(66, 124, 238, 128, hex('#2a6a3a')); R.rect(66, 124, 238, 124, hex('#4a9a5a'));
  caja(62, 128, 242, 148, hex('#2a6a3a'), hex('#143a1e')); for (let x = 66; x < 242; x += 10) R.rect(x, 130, x, 147, hex('#1e5a2e'));
  // las pilas de periódicos en el mostrador con la foto de la lata
  for (const [x, y] of [[70, 113], [94, 115], [186, 114], [212, 113]]) { for (let q = 0; q < 3; q++) R.rect(x, y + 8 + q, x + 22, y + 8 + q, q % 2 ? hex('#d8d6ce') : hex('#f4f2ea')); const [cx, cy] = PORTADA(x, y - 2, 22, 11, 0, false); }
  // la acera, el bordillo y la calzada
  for (let y = 148; y < 168; y++) for (let x = 0; x < 320; x++) { let c = (x % 40 === 0 || (y - 148) % 10 === 0) ? hex('#8a8a8a') : hex('#b0b0ac'); if (tr(x, y, 0.1)) c = hex('#a4a4a0'); R.pset(x, y, c); }
  R.rect(0, 168, 319, 170, hex('#d0d0cc')); R.rect(0, 170, 319, 171, hex('#6a6a6a'));
  for (let y = 172; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tr(x, y, 0.2) ? hex('#4a4a52') : hex('#3e3e46'));
  R.disco(270, 176, 6, hex('#2a2a2e')); R.disco(270, 176, 5, hex('#4a4a50')); for (let q = -4; q <= 4; q += 2) R.rect(266, 176 + q / 2, 274, 176 + q / 2, hex('#2a2a2e'));
  // la boca de incendios, la papelera de rejilla y la caja de periódicos
  caja(30, 152, 38, 166, hex('#c83a2a'), K); R.rect(28, 156, 40, 158, hex('#c83a2a')); R.disco(34, 151, 4, hex('#c83a2a')); R.pset(33, 150, hex('#e86a4a'));
  caja(250, 148, 266, 166, hex('#3a5a3a'), K); for (let x = 252; x < 266; x += 3) R.rect(x, 150, x, 165, hex('#2a4a2a'));
});
const p4 = (t) => {
  quiosco();
  // los periódicos colgados de la cuerda se mecen con el aire
  for (let k = 0; k < 4; k++) { const x = 92 + k * 32 + Math.round(Math.sin(t * 2 + k) * 1), y = 64; R.linea(70, 64, 236, 64, hex('#2a2a2a')); PORTADA(x, y + 2, 18, 22, t, false); R.rect(x + 8, y, x + 10, y + 3, hex('#c8a040')); }
  // el vapor de la alcantarilla
  for (let k = 0; k < 8; k++) { const f = (t * 0.6 + k / 8) % 1, x = 270 + Math.round(Math.sin(f * 6 + k) * 5 + f * 6), y = 174 - Math.round(f * 40); if (tr(x, y, 0.8 - f * 0.7)) R.disco(x, y, 3 + Math.round(f * 4), hex('#e8e8ec')); }
  // el vendedor tras el mostrador: corta el cordel del fardo y enseña un periódico
  const cae = lin(t, A4 + 0.3, A4 + 0.7), corta = t > NOMBRE - 0.4;
  R.actor(EL.neoyorquino, 152, 136, t, { dir: 1, sostiene: corta ? [168, 112] : undefined, sonrisa: t > NEWCOKE, habla: t > NOMBRE && t < NEWCOKE + 0.6 && Math.sin(t * 9) > 0 });
  if (corta) PORTADA(162, 98, 18, 14, t, false);
  // el fardo cae al mostrador desde la furgoneta que pasa
  if (cae > 0) { const fx = Math.round(lerp(300, 128, cae)), fy = Math.round(lerp(150, 112, cae) - Math.sin(cae * Math.PI) * 30); caja(fx - 12, fy - 10, fx + 12, fy, hex('#f4f2ea'), hex('#3a3a40')); if (!corta) { R.rect(fx - 1, fy - 10, fx, fy, hex('#c8a060')); R.rect(fx - 12, fy - 5, fx + 12, fy - 5, hex('#c8a060')); } for (let q = 0; q < 3; q++) R.rect(fx - 11, fy - 8 + q * 3, fx + 11, fy - 8 + q * 3, hex('#c8c6be')); }
  // la señora compra el periódico y se va leyendo
  const llega = lin(t, A4, A4 + 1.2), vase = lin(t, NEWCOKE + 0.6, E.duracion), sx = Math.round(lerp(-20, 100, sv(llega)) - vase * 140);
  const tiene = t > NOMBRE;
  const r = R.actor(EL.neoyorquina, sx, 166, t, { dir: vase > 0 ? -1 : 1, anda: (llega > 0 && llega < 1) || vase > 0, sostiene: tiene ? [sx + (vase > 0 ? -2 : 16), 146] : undefined, sonrisa: tiene });
  if (tiene) PORTADA(r.mano[0] - (vase > 0 ? 12 : 4), r.mano[1] - 10, 14, 12, t, false);
  // la furgoneta de reparto pasa por delante (de ella sale el fardo)
  const vx = Math.round(lerp(330, -110, lin(t, A4 - 0.2, A4 + 1.6)));
  if (vx > -110 && vx < 330) { caja(vx, 146, vx + 70, 176, hex('#e8e4d8'), K); caja(vx - 16, 156, vx, 176, hex('#e8e4d8'), K); R.rect(vx - 14, 158, vx - 4, 165, hex('#8ab0d0')); R.rect(vx + 4, 158, vx + 66, 162, hex('#2a6a3a')); R.rect(vx + 60, 148, vx + 68, 172, hex('#c8c4b8')); for (const wx of [vx - 4, vx + 54]) { R.disco(wx, 177, 4, K); R.disco(wx, 177, 1, hex('#8a8e98')); } }
  // en «New Coke» la portada sale girando hacia la cámara: la foto de la lata nueva con destellos
  const gira = lin(t, NEWCOKE - 0.45, NEWCOKE + 0.05);
  if (gira > 0) {
    const s = sv(gira), w = Math.round(lerp(8, 120, s)), h = Math.round(lerp(6, 86, s)), an = (1 - s) * 4 * Math.PI, cx = 160, cy = 92;
    if (gira < 1) { const ca = Math.cos(an), sa = Math.sin(an), P = (u, v) => [Math.round(cx + u * ca - v * sa), Math.round(cy + u * sa + v * ca)]; R.poligono([P(-w / 2 - 1, -h / 2 - 1), P(w / 2 + 1, -h / 2 - 1), P(w / 2 + 1, h / 2 + 1), P(-w / 2 - 1, h / 2 + 1)], hex('#3a3a40')); R.poligono([P(-w / 2, -h / 2), P(w / 2, -h / 2), P(w / 2, h / 2), P(-w / 2, h / 2)], hex('#f4f2ea')); R.poligono([P(-w / 2 + 2, -h / 2 + 2), P(w / 2 - 2, -h / 2 + 2), P(w / 2 - 2, -h / 2 + 8), P(-w / 2 + 2, -h / 2 + 8)], hex('#1a1a20')); }
    else {
      for (let y = 52; y < 140; y++) for (let x = 96; x < 228; x++) if (tr(x, y, 0.35)) R.pset(x, y, hex('#2a2a30'));
      const [lx, ly] = PORTADA(cx - 60, cy - 43, 120, 86, t, true);
      for (let q = 0; q < 6; q++) R.rect(cx - 56 + q * 8, cy - 38, cx - 52 + q * 8, cy - 36, hex('#f4f2ea'));
      R.numero('85', cx + 40, cy - 34, { color: hex('#f4f2ea'), sombra: false });
      PZ.lata(R, lx, ly, { color: 'rojo', franja: true, s: 2 });
      destello(lx + 13, ly - 30, (t * 1.3) % 1); destello(lx - 12, ly - 12, (t * 1.3 + 0.5) % 1);
    }
  }
};
const efectos = [[1.6, 'motor'], [2.6, 'aldea'], [2.7, 'coche'], [A2 + 0.3, 'publico'], [LLENA + 0.1, 'flash'], [LINCOLN, 'flash'], [NUEVA - 0.1, 'whoosh'], [AQUI, 'flash'], [AQUI + 0.4, 'publico'], [A4 + 0.65, 'golpecito'], [NEWCOKE - 0.45, 'whoosh'], [NEWCOKE + 0.05, 'papel']];
T.rodar(E, R, [[0, p1], [A2, p2], [A3, p3], [A4, p4]], { cartela: '1985', efectos, año: 1985 });
''')
