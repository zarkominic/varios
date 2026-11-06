E = {}

# ── tr-campanadas ─────────────────────────────────────────────────────────────────────────────────────────────
E['tr-campanadas'] = ('Las campanadas', '''// TR-CAMPANADAS (frase 5). 1962 → hoy. Cuatro planos:
// 1. (tele62 general) un salón de 1962: el padre entra con el plato de uvas, la tele se calienta y sale el reloj de la
//    Puerta del Sol («Spanish television»); con cada campanada («chimes», «Sol») la familia se come una uva;
// 2. (fondo local: un mapa del mundo de papel sobre la mesa) en «grapes» cae una uva en España, una ruta lleva otra a
//    México («Mexico») y otra a Filipinas («Philippines»), y salen granos por toda América; en «sometimes» cae sobre el
//    mapa una foto: una niña se come las uvas debajo de la mesa («table»);
// 3. (fondo local: una calle de México en Nochevieja) en «red» el viento sacude los calzones rojos del tendedero y la
//    vecina tiende los amarillos («yellow»); en «walking» sale un vecino con la maleta, da la vuelta a la manzana y
//    vuelve por la izquierda («suitcase») con un «?» encima;
// 4. (sol general, hoy) la bola baja por el mástil; «Nobody has found»: «?» sobre el de la maleta, que da la vuelta a la
//    plaza, y sobre los de delante; en «millions» suenan las campanadas: la multitud y los de delante se comen las uvas.''', r'''
import { equirect, pintar, PAPEL, rosa } from '/atomo/plato/escenas/ov-mapas.js';
import { TIERRA } from '/atomo/plato/escenas/geo-ov.js';
const a = (f) => en('tele', f);
const P2 = a(0.304), P3 = a(0.57), P4 = a(0.785);
const ENCIENDE = a(0.069), CH1 = a(0.173), CH2 = a(0.238);
const UVAS = a(0.333), MEX = a(0.38), FIL = a(0.425), FOTO = a(0.468), COME = a(0.53);
const ROJO = a(0.58), AMAR = a(0.603), SALE = a(0.665), MALETA = a(0.734);
const NADIE = a(0.785), HALLA = a(0.816), MIL = a(0.897) + 0.1;
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const rampa = (...c) => c.map(hex), K = T.C.k, BL = T.C.blanco;
const mez = (c1, c2, u) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * u) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * u) << 8) | Math.round(r1 + ((c2 & 255) - r1) * u)) >>> 0; };
const capa = (f) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); f(); R.recorte(null); R.usar(prev); } R.copiar(b); }; };
const grano = (x, y) => { x = Math.round(x); y = Math.round(y); R.disco(x, y, 2, K); R.disco(x, y, 1, hex('#7a3a9a')); R.pset(x - 1, y - 1, hex('#c890e0')); };
// alguien que come uvas: la uva en la mano un poco antes de cada instante c, y a la boca en c
const comeUvas = (def, x, suelo, t, dir, cs, o = {}) => {
  const c = cs.find((c) => t > c - 0.6 && t < c + 0.3);
  const cuerpo = def.altoCuerpo ?? 13, boca = suelo - cuerpo - 3;
  const obj = c == null ? undefined : t < c ? [x + (dir > 0 ? 18 : -3), suelo - cuerpo + 1] : [x + (dir > 0 ? 11 : 3), boca];
  const r = R.actor(def, x, suelo, t, { dir, ...o, sostiene: obj ?? o.sostiene, sonrisa: o.sonrisa || cs.some((c) => t > c + 0.3 && t < c + 1.2) });
  if (c != null && t < c + 0.1) grano(r.mano[0], r.mano[1] - 2);
  return r;
};

// ── 1 · el salón de 1962 ──
const apagada = (R_, t_, r) => {
  const [x0, y0, x1, y1] = r, cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1, u = tramo(t_, ENCIENDE - 0.35, ENCIENDE);
  R.rect(x0, y0, x1, y1, hex('#141618')); for (let y = y0; y <= y1; y += 2) R.rect(x0, y, x1, y, hex('#1c1f22'));
  R.pset(x0 + 5, y0 + 4, hex('#3a3e44')); R.pset(x0 + 6, y0 + 4, hex('#3a3e44')); R.pset(x0 + 5, y0 + 5, hex('#2a2e34'));
  if (u > 0) { const w = Math.round((x1 - x0) * 0.5 * u); R.rect(cx - w, cy - 1, cx + w, cy + 1, hex('#8a8a8a')); R.rect(cx - w, cy, cx + w, cy, hex('#fafafa')); }
  else R.pset(cx, cy, hex('#7a7a7a'));
};
const p1 = (t) => {
  const o = { encuadre: 'tele62', pantalla: t < ENCIENDE ? apagada : undefined };
  T.anuevo(R, t, o);
  // cada campanada: el reloj de la tele destella
  for (const c of [CH1, CH2]) { const u = (t - c) / 0.5; if (u > 0 && u < 1) { R.recorte([48, 60, 86, 92]); for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4, r0 = 6 + u * 4, r1 = 9 + u * 8; R.linea(67 + Math.cos(an) * r0, 71 + Math.sin(an) * r0, 67 + Math.cos(an) * r1, 71 + Math.sin(an) * r1, BL); } R.recorte(null); } }
  // la luz de la tele en el suelo cuando se enciende
  if (t > ENCIENDE) for (let y = 162; y < 178; y++) for (let x = 40 + (y - 162); x < 120 - (y - 162) * 2; x++) if (((x + y) & 3) === 0 && h(x, y, 5) < 0.5) R.pset(x, y, mez(R.pget(x, y), hex('#dce8f0'), 0.35));
  T.anuevoDelante(R, t, o);
  // la familia, delante de la mesita, mirando la tele: el niño señala y salta; la madre le habla; la abuela sonríe
  comeUvas(EL.nino62, 100, 172, t, -1, [CH1 + 0.1, CH2 + 0.1], { dedo: t > ENCIENDE - 0.2 && t < CH1 - 0.7, sorpresa: t > ENCIENDE && t < ENCIENDE + 1, salto: t > ENCIENDE && t < ENCIENDE + 0.35 ? 3 : t > CH1 + 0.3 && t < CH1 + 0.6 ? 2 : 0 });
  comeUvas(EL.madre62, 128, 177, t, -1, [CH1, CH2], { habla: t < ENCIENDE && Math.sin(t * 8) > 0 });
  comeUvas(EL.abuela62, 150, 177, t, -1, [CH1 + 0.15, CH2 + 0.15], { sonrisa: t > ENCIENDE + 0.4 });
  // el padre entra por la derecha con el plato de uvas y se lo ofrece a la familia
  const u = tramo(t, 0.2, 2.8), xp = Math.round(lerp(330, 172, u));
  const r = R.actor(EL.padre62, xp, 177, t, { dir: -1, anda: u > 0 && u < 1, sostiene: [xp - 4, 163], sonrisa: u >= 1, habla: u >= 1 && t < CH1 - 0.6 && Math.sin(t * 7) > 0 });
  { const [mx, my] = r.mano; R.rect(mx - 7, my - 1, mx + 4, my + 1, K); R.rect(mx - 6, my - 1, mx + 3, my, hex('#f4f0e6')); const quedan = 5 - (t > CH1 - 0.6 ? 2 : 0) - (t > CH2 - 0.6 ? 2 : 0);
    [[-4, -3], [-1, -4], [2, -3], [-2, -6], [0, -2]].slice(0, Math.max(1, quedan)).forEach(([dx, dy]) => grano(mx + dx, my + dy)); }
};

// ── 2 · el mapa del mundo con las uvas ──
const CAJA = [18, 22, 302, 166], P = equirect(CAJA, [-125, 150, -42, 72]);
const PX = (l) => P(l).map(Math.round);
const ESP = PX([-3.7, 40.4]), MEXI = PX([-99.1, 19.4]), MANILA = PX([121.0, 14.6]);
const OTRAS = [[-74.1, 4.6], [-77.0, -12.0], [-70.6, -33.4], [-58.4, -34.6], [-66.9, 10.5], [-82.4, 23.1], [-90.5, 14.6], [-66.1, 18.4], [-78.5, -0.2], [-68.1, -16.5], [-57.6, -25.3], [-56.2, -34.9], [-86.3, 12.1], [-79.5, 9.0], [-70.7, 19.0], [-87.2, 14.1], [-84.1, 9.9]].map(PX);
const MAD = rampa('#2e1c10', '#4a2e1a', '#6a4426', '#8a5e36', '#a87a48');
const curva = (p0, p1, c, n = 24) => Array.from({ length: n + 1 }, (_, i) => { const u = i / n; return [(1 - u) ** 2 * p0[0] + 2 * u * (1 - u) * c[0] + u * u * p1[0], (1 - u) ** 2 * p0[1] + 2 * u * (1 - u) * c[1] + u * u * p1[1]]; });
const R_MEX = curva(ESP, MEXI, [92, 38]), R_FIL = curva(ESP, MANILA, [214, 26]);
const mapaFijo = capa(() => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(y * 0.5 + Math.sin(x * 0.02 + y * 0.013) * 2.6) + (h(x >> 4, y >> 1, 3) - 0.5) * 0.8; R.pset(x, y, R.tone(MAD, 2 + v * 0.9, x, y)); }
  for (let x = 0; x < 320; x += 37) R.linea(x + 12, 0, x + 9, 179, MAD[0]);
  R.rect(CAJA[0] + 4, CAJA[1] + 4, CAJA[2] + 4, CAJA[3] + 4, hex('#20120a'));
  R.recorte(CAJA);
  for (let y = CAJA[1]; y <= CAJA[3]; y++) for (let x = CAJA[0]; x <= CAJA[2]; x++) R.pset(x, y, h(x >> 2, y, 150) < 0.1 ? PAPEL.marS : PAPEL.mar);
  // las líneas de agua y la retícula punteada
  for (let lat = -30; lat <= 60; lat += 15) for (let lon = -125; lon <= 150; lon += 0.5) { const [x, y] = P([lon, lat]); if (Math.round(lon * 2) % 4 === 0) R.pset(Math.round(x), Math.round(y), PAPEL.reticula); }
  for (let lon = -120; lon <= 150; lon += 15) for (let lat = -42; lat <= 72; lat += 0.5) { const [x, y] = P([lon, lat]); if (Math.round(lat * 2) % 4 === 0) R.pset(Math.round(x), Math.round(y), PAPEL.reticula); }
  for (let k = 0; k < 90; k++) { const x = 20 + Math.round(h(k, 1, 7) * 280), y = 24 + Math.round(h(k, 2, 7) * 140); R.linea(x, y, x + 3, y, PAPEL.marS); R.pset(x + 4, y - 1, PAPEL.marS); }
  pintar(R, P, TIERRA, (x, y) => (h(x >> 1, y, 151) < 0.09 ? PAPEL.tierraS : PAPEL.tierra), { somera: PAPEL.somera });
  // sierras a plumilla y desiertos punteados
  for (const [l0, l1, n] of [[[-112, 45], [-106, 33], 6], [[-77, 5], [-70, -30], 7], [[70, 36], [95, 30], 6], [[8, 46], [14, 46], 2], [[-104, 25], [-98, 18], 3]]) for (let i = 0; i <= n; i++) { const [x, y] = PX([l0[0] + (l1[0] - l0[0]) * i / n, l0[1] + (l1[1] - l0[1]) * i / n]); R.linea(x - 2, y + 1, x, y - 2, hex('#8a7a5a')); R.linea(x, y - 2, x + 2, y + 1, hex('#b8a888')); }
  for (let k = 0; k < 260; k++) { const lon = lerp(-15, 50, h(k, 3, 9)), lat = lerp(16, 30, h(k, 4, 9)); const [x, y] = PX([lon, lat]); if (R.pget(x, y) === PAPEL.tierra || R.pget(x, y) === PAPEL.tierraS) R.pset(x, y, hex('#c8b48a')); }
  rosa(R, 128, 142, 0);
  // un monstruo marino de los mapas viejos (sin letras), en el Pacífico de la izquierda
  for (const [dx, dy] of [[0, 0], [5, -2], [10, 0], [15, -2]]) { R.disco(30 + dx, 128 + dy, 2, hex('#5a7a8a')); R.pset(30 + dx, 127 + dy, hex('#a4c0d0')); }
  R.disco(27, 126, 3, hex('#5a7a8a')); R.pset(26, 125, K); R.linea(46, 126, 50, 122, hex('#5a7a8a')); R.linea(46, 126, 51, 128, hex('#5a7a8a'));
  // el papel viejo: los bordes tostados y los dobleces
  for (let y = CAJA[1]; y <= CAJA[3]; y++) for (let x = CAJA[0]; x <= CAJA[2]; x++) { const d = Math.min(x - CAJA[0], CAJA[2] - x, y - CAJA[1], CAJA[3] - y); if (d < 9 && h(x, y, 157) < (9 - d) / 14) R.pset(x, y, mez(R.pget(x, y), hex('#8a6a3a'), 0.35)); }
  for (const xf of [113, 207]) for (let y = CAJA[1]; y <= CAJA[3]; y++) R.pset(xf, y, mez(R.pget(xf, y), K, 0.12));
  for (let x = CAJA[0]; x <= CAJA[2]; x++) R.pset(x, 94, mez(R.pget(x, 94), K, 0.12));
  for (let k = 0; k < 3; k++) { const cx = [70, 250, 180][k], cy = [60, 140, 40][k], r = [9, 7, 6][k]; for (let a2 = 0; a2 < 6.28; a2 += 0.08) { const x = Math.round(cx + Math.cos(a2) * r), y = Math.round(cy + Math.sin(a2) * r); R.pset(x, y, mez(R.pget(x, y), hex('#7a5a3a'), 0.3)); } }
  R.recorte(null);
  // el filete del borde, con la cenefa de cuadros
  R.rect(CAJA[0] - 1, CAJA[1] - 1, CAJA[2] + 1, CAJA[1] + 2, K); R.rect(CAJA[0] - 1, CAJA[3] - 2, CAJA[2] + 1, CAJA[3] + 1, K);
  R.rect(CAJA[0] - 1, CAJA[1] - 1, CAJA[0] + 2, CAJA[3] + 1, K); R.rect(CAJA[2] - 2, CAJA[1] - 1, CAJA[2] + 1, CAJA[3] + 1, K);
  for (let x = CAJA[0]; x < CAJA[2]; x += 8) { R.rect(x, CAJA[1], x + 3, CAJA[1] + 1, PAPEL.tierra); R.rect(x + 4, CAJA[3] - 1, x + 7, CAJA[3], PAPEL.tierra); }
  for (let y = CAJA[1]; y < CAJA[3]; y += 8) { R.rect(CAJA[0], y, CAJA[0] + 1, y + 3, PAPEL.tierra); R.rect(CAJA[2] - 1, y + 4, CAJA[2], y + 7, PAPEL.tierra); }
  // sobre la mesa: la lupa abajo a la izquierda y el compás arriba a la izquierda
  R.disco(10, 172, 9, K); R.disco(10, 172, 8, hex('#c89a40')); R.disco(10, 172, 6, hex('#9ab8c8')); R.pset(7, 169, BL); R.pset(8, 169, BL);
  R.linea(4, 6, 14, 20, K); R.linea(5, 6, 15, 20, hex('#c8c8d0')); R.linea(14, 4, 8, 20, K); R.linea(15, 4, 9, 20, hex('#a8a8b0')); R.disco(14, 5, 2, hex('#c89a40'));
});
const p2 = (t) => {
  mapaFijo();
  // un galeón que cruza el Atlántico y su estela
  const g = ((t * 4) % 70), gx = Math.round(122 - g), gy = 80 + Math.round(g * 0.12);
  R.recorte(CAJA); for (let i = 1; i < 6; i++) if ((i + Math.floor(t * 6)) % 2) R.pset(gx + 6 + i * 2, gy + 1, PAPEL.somera);
  R.rect(gx - 4, gy, gx + 4, gy + 1, hex('#5a3a22')); R.rect(gx - 3, gy + 2, gx + 3, gy + 2, hex('#3a2416')); R.rect(gx - 2, gy - 5, gx, gy - 1, hex('#f4f0e2')); R.rect(gx + 1, gy - 4, gx + 3, gy - 1, hex('#e8e0cc')); R.pset(gx - 1, gy - 6, hex('#c8303a'));
  // el rayo de sol de la ventana, con motas
  for (let y = CAJA[1]; y <= CAJA[3]; y++) { const x0 = 150 + (y - 22) * 0.6 + Math.sin(t * 0.4) * 6; for (let x = Math.round(x0); x < x0 + 26; x++) if (((x + y) & 1) === 0) R.pset(x, y, mez(R.pget(x, y), hex('#fff4d0'), 0.18)); }
  for (let k = 0; k < 8; k++) { const x = Math.round(160 + (k * 13) % 30 + Math.sin(t * 0.7 + k) * 6 + ((t * 3 + k * 20) % 100) * 0.6), y = Math.round(30 + ((t * 3 + k * 20) % 100)); if (Math.sin(t * 3 + k) > 0) R.pset(x, y, hex('#fff8e0')); }
  R.recorte(null);
  // la mariquita que recorre el canto de la mesa
  const mq = Math.round(((t * 9) % 360) - 20); R.disco(mq, 175, 2, K); R.disco(mq, 175, 1, hex('#d8303a')); R.pset(mq - 2, 175, K);
  // las rutas y las uvas que caen: España, México, Filipinas
  const cae = (x, y, c, cara) => { const u = tramo(t, c - 0.35, c); if (u <= 0) return; const yy = Math.round(lerp(y - 40, y, u)), bote = t > c && t < c + 0.25 ? 2 : 0;
    R.disco(x + 2, y + 2, 4, hex('#3a2a1a')); T.uva(R, x, yy + 3 - bote, t, { cara: t > c + 0.2 ? cara : 'susto' }); if (t > c && t < c + 0.4) for (let k = 0; k < 8; k++) { const an = k * 0.785, r = 9 + (t - c) * 20; R.pset(Math.round(x + Math.cos(an) * r), Math.round(y - 8 + Math.sin(an) * r * 0.6), hex('#f8e8a0')); } };
  R.recorte(CAJA);
  if (t > UVAS) R.ruta(R_MEX, tramo(t, UVAS + 0.1, MEX - 0.2), hex('#7a2a8a'));
  if (t > UVAS + 0.4) R.ruta(R_FIL, tramo(t, MEX - 0.3, FIL - 0.2), hex('#7a2a8a'));
  R.recorte(null);
  cae(ESP[0], ESP[1], UVAS, 'feliz'); cae(MEXI[0], MEXI[1], MEX, 'feliz'); cae(MANILA[0] - 2, MANILA[1], FIL, 'feliz');
  OTRAS.forEach(([x, y], k) => { const c = FIL + 0.25 + k * 0.05; if (t > c) { const b = t < c + 0.15 ? 1 : 0; grano(x, y - b); } });
  // la foto que cae sobre el mapa: una niña se come las uvas debajo de la mesa
  const f = tramo(t, FOTO, FOTO + 0.5); if (f > 0) {
    const fx = Math.round(lerp(330, 178, f)), fy = Math.round(lerp(196, 98, f)), W = 88, H = 66;
    R.rect(fx + 3, fy + 3, fx + W + 3, fy + H + 3, hex('#1a1008')); R.rect(fx - 1, fy - 1, fx + W + 1, fy + H + 1, K); R.rect(fx, fy, fx + W, fy + H, hex('#f6f2e6'));
    const ix = fx + 4, iy = fy + 4, iw = W - 8, ih = H - 12; R.recorte([ix, iy, ix + iw, iy + ih]);
    for (let y = iy; y <= iy + ih; y++) for (let x = ix; x <= ix + iw; x++) R.pset(x, y, y > iy + 44 ? (((x >> 2) + (y >> 2)) & 1 ? hex('#b85a3a') : hex('#d07a4a')) : ((x + y * 3) % 11 === 0 ? hex('#d88a50') : hex('#f0b070')));
    // la ventana con un cohete y el reloj de las doce
    for (let y = iy + 4; y < iy + 20; y++) for (let x = ix + 54; x < ix + 76; x++) R.pset(x, y, hex('#1a2048')); R.linea(ix + 65, iy + 4, ix + 65, iy + 19, hex('#e8e0d0')); R.linea(ix + 54, iy + 12, ix + 75, iy + 12, hex('#e8e0d0'));
    const fu = (t * 1.5) % 1; for (let k = 0; k < 8; k++) { const an = k * 0.785; R.pset(Math.round(ix + 60 + Math.cos(an) * fu * 5), Math.round(iy + 9 + Math.sin(an) * fu * 5), [hex('#f0c040'), hex('#e85a8a')][k & 1]); }
    R.disco(ix + 14, iy + 9, 6, K); R.disco(ix + 14, iy + 9, 5, hex('#f4ecd8')); R.linea(ix + 14, iy + 9, ix + 14, iy + 5, K); R.linea(ix + 14, iy + 9, ix + 15, iy + 6, K);
    // la mesa con su mantel y la niña debajo
    const mY = iy + 22; R.rect(ix + 6, mY, ix + iw - 6, mY + 3, hex('#6a3a1e')); R.rect(ix + 8, mY + 4, ix + 10, iy + ih, hex('#4a2a14')); R.rect(ix + iw - 10, mY + 4, ix + iw - 8, iy + ih, hex('#4a2a14'));
    R.rect(ix + 5, mY - 2, ix + iw - 5, mY + 1, hex('#fafaf4')); for (let x = ix + 5; x <= ix + iw - 5; x += 2) R.pset(x, mY + 2, hex('#e0dcd0'));
    for (const gx of [ix + 22, ix + 26, ix + 24]) grano(gx, mY - 4); R.rect(ix + 40, mY - 7, ix + 41, mY - 3, hex('#c8e0f0')); R.rect(ix + 46, mY - 7, ix + 47, mY - 3, hex('#c8e0f0')); R.rect(ix + 58, mY - 8, ix + 59, mY - 3, BL); R.pset(ix + 58, mY - 9, hex('#ffd060'));
    for (let x = ix + 12; x < ix + iw - 12; x++) R.pset(x, iy + ih - 1, mez(R.pget(x, iy + ih - 1), K, 0.35));
    comeUvas(EL.chicaHoy, ix + 30, iy + ih - 1, t, 1, [COME, COME + 0.8], { sonrisa: true });
    R.recorte(null);
  }
};

// ── 3 · la calle de México en Nochevieja ──
const CASAS = [[0, 58, 62, '#c8603a'], [58, 122, 54, '#e8b83a'], [122, 178, 66, '#3aa8a8'], [178, 242, 58, '#d86a8a'], [242, 320, 70, '#7a8ad8']];
const calleFija = capa(() => {
  const CI = rampa('#0c0e2a', '#161a3e', '#221e4e', '#36265a', '#4e2e62');
  for (let y = 0; y < 110; y++) for (let x = 0; x < 320; x++) R.pset(x, y, R.tone(CI, y / 24 + (h(x >> 3, y >> 2, 2) - 0.5) * 0.3, x, y));
  for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 4) * 320), y = Math.round(h(k, 2, 4) * 60); R.pset(x, y, k % 4 ? hex('#8a8ab8') : hex('#e8e8ff')); }
  // la ciudad lejana: el cerro, la cúpula con dos torres y las lucecitas
  R.poligono([[0, 100], [40, 86], [90, 92], [150, 80], [230, 90], [320, 82], [320, 112], [0, 112]], hex('#241a3a'));
  R.disco(64, 78, 8, hex('#2c2044')); R.rect(52, 72, 54, 90, hex('#2c2044')); R.rect(74, 72, 76, 90, hex('#2c2044')); R.pset(64, 69, hex('#f0c040'));
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 5, 4) * 320), y = 88 + Math.round(h(k, 6, 4) * 20); R.pset(x, y, k % 3 ? hex('#f0c060') : hex('#f8e8b0')); }
  // las casas de colores
  for (const [x0, x1, top, col] of CASAS) {
    const c = hex(col), cS = mez(c, K, 0.3), cL = mez(c, BL, 0.25);
    for (let y = top; y < 148; y++) for (let x = x0; x < x1; x++) { const n = h(x >> 1, y >> 1, x0); R.pset(x, y, n < 0.08 ? cS : n > 0.95 ? cL : c); }
    R.rect(x0, top - 4, x1 - 1, top, cS); R.rect(x0, top - 5, x1 - 1, top - 5, K); R.rect(x0, top + 1, x1 - 1, top + 1, mez(c, K, 0.5));
    for (let x = x0 + 2; x < x1 - 4; x += 8) R.rect(x, top - 8, x + 3, top - 5, cS);
    R.rect(x0, 136, x1 - 1, 147, mez(c, K, 0.42)); R.rect(x0, 135, x1 - 1, 135, K);
    for (let k = 0; k < 4; k++) { const cx = x0 + 6 + Math.round(h(k, x0, 8) * (x1 - x0 - 12)), cy = top + 8 + Math.round(h(k, x0, 9) * 60); R.linea(cx, cy, cx + 2, cy + 5, cS); R.linea(cx + 2, cy + 5, cx + 1, cy + 9, cS); }
    R.rect(x0, top, x0, 147, mez(c, K, 0.55));
  }
  // los tinacos y las antenas de las azoteas
  for (const [x, top] of [[20, 62], [96, 54], [270, 70]]) { R.rect(x - 1, top - 17, x + 13, top - 5, K); R.rect(x, top - 16, x + 12, top - 6, hex('#2a2a32')); R.rect(x + 1, top - 15, x + 2, top - 7, hex('#4a4a56')); R.rect(x - 2, top - 18, x + 14, top - 17, K); }
  R.linea(150, 66, 150, 50, hex('#4a4a56')); R.linea(144, 54, 156, 54, hex('#4a4a56')); R.linea(146, 51, 154, 51, hex('#4a4a56'));
  // ventanas con reja y luz, balcones con macetas
  const ventana = (x, y, w, hh, luz) => { R.rect(x - 1, y - 1, x + w, y + hh, K); R.rect(x, y, x + w - 1, y + hh - 1, luz ? hex('#f8d890') : hex('#2a2440')); if (luz) R.rect(x, y + hh - 3, x + w - 1, y + hh - 1, hex('#e8b060'));
    for (let i = x + 2; i < x + w; i += 3) R.linea(i, y, i, y + hh - 1, hex('#1a1a20')); R.rect(x - 2, y + hh, x + w + 1, y + hh + 1, hex('#e8e0d0')); };
  ventana(12, 80, 14, 18, 1); ventana(34, 80, 14, 18, 0); ventana(12, 108, 14, 18, 0); ventana(36, 108, 12, 18, 1);
  ventana(68, 70, 14, 18, 1); ventana(96, 70, 14, 18, 1); ventana(70, 104, 14, 20, 0);
  ventana(128, 78, 12, 16, 0); ventana(160, 78, 12, 16, 1);
  ventana(190, 66, 14, 18, 1); ventana(222, 104, 14, 20, 1);
  ventana(254, 82, 14, 18, 0); ventana(284, 82, 14, 18, 1); ventana(254, 110, 14, 18, 1);
  // el balcón de la vecina (rosa): la losa
  R.rect(180, 86, 216, 89, K); R.rect(181, 86, 215, 88, hex('#e8e0d0'));
  // el portal del vecino (turquesa) y el de al lado
  const portal = (x, y, w, hh) => { R.rect(x - 2, y - 2, x + w + 1, y + hh, hex('#e8e0d0')); R.rect(x - 1, y - 1, x + w, y + hh, K); };
  portal(140, 116, 16, 32); portal(92, 116, 16, 32); portal(286, 118, 16, 30);
  for (const [x, y] of [[92, 116], [286, 118]]) { R.rect(x, y, x + 15, y + 31, hex('#6a3a1e')); for (let j = y + 3; j < y + 30; j += 9) { R.rect(x + 2, j, x + 6, j + 6, hex('#7a4a28')); R.rect(x + 9, j, x + 13, j + 6, hex('#7a4a28')); } R.pset(x + 12, y + 16, hex('#f0c040')); }
  // la buganvilla que trepa por la casa rosa y las macetas de geranios
  for (let k = 0; k < 140; k++) { const x = 236 + Math.round((h(k, 1, 12) - 0.5) * 14), y = 60 + Math.round(h(k, 2, 12) * 80); R.pset(x, y, k % 3 ? hex('#c83a8a') : hex('#3a7a3a')); }
  for (const x of [14, 38, 70, 98, 256]) { const y = x < 60 ? 98 : x < 120 ? 88 : 100; R.rect(x, y - 4, x + 7, y, hex('#a8502a')); R.rect(x, y - 4, x + 7, y - 4, hex('#c86a3a')); for (let i = 0; i < 6; i++) R.pset(x + 1 + i, y - 5 - (i & 1), i % 2 ? hex('#d8303a') : hex('#3a8a3a')); }
  // la acera de baldosas, el bordillo y el empedrado
  for (let y = 148; y < 157; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 12 === 0 || y === 152) ? hex('#7a7480') : h(x, y, 6) < 0.1 ? hex('#8a8490') : hex('#a49eaa'));
  R.rect(0, 156, 319, 158, hex('#c8c0b0')); R.rect(0, 158, 319, 158, hex('#5a5460'));
  for (let x = 0; x < 320; x += 24) R.rect(x, 156, x + 11, 157, hex('#e8c040'));
  for (let y = 159; y < 180; y++) for (let x = 0; x < 320; x++) { const cx = (x + ((y >> 2) & 1) * 3) % 6, cy = y % 4; R.pset(x, y, cx === 0 || cy === 0 ? hex('#2a2632') : h(x >> 1, y >> 1, 7) < 0.3 ? hex('#4a4652') : hex('#5a5662')); }
  R.disco(196, 170, 5, hex('#3a3a44')); R.anillo(196, 170, 5, hex('#1e1e26'));
  // el charco que refleja la farola
  for (let y = 164; y < 172; y++) for (let x = 236; x < 266; x++) if (((x - 251) / 15) ** 2 + ((y - 168) / 4) ** 2 < 1) R.pset(x, y, ((x + y) & 1) ? hex('#2a2a4a') : hex('#3a3a5a'));
  // la farola
  R.rect(270, 70, 272, 156, K); R.rect(271, 70, 271, 155, hex('#4a4a56')); R.rect(266, 154, 276, 157, K); R.rect(262, 62, 280, 64, K); R.rect(264, 64, 278, 70, hex('#f8e8a0')); R.rect(264, 64, 278, 64, K);
});
// el papel picado de colores (sin letras: solo los calados), que se mece
const papelPicado = (t) => {
  const pts = (x) => 60 + Math.round(Math.sin((x - 2) / 316 * Math.PI) * 16);
  for (let x = 2; x < 318; x++) R.pset(x, pts(x), hex('#2a2a32'));
  const COL = ['#e8303a', '#f0a020', '#3ac85a', '#3a8ae8', '#c83ac8', '#f0e040'].map(hex);
  for (let k = 0; k < 26; k++) { const x = 6 + k * 12, y = pts(x) + 1, s = Math.round(Math.sin(t * 3 + k * 0.7) * 1.2), c = COL[k % 6];
    for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) { const ox = x + i + (j > 4 ? s : 0); if (j === 7 && (i & 1)) continue; if ((i === 3 || i === 4) && (j === 3 || j === 4)) continue; if ((i + j) % 5 === 0 && j > 1 && j < 6) continue; R.pset(ox, y + j, c); } }
};
const fuegos = (t) => {
  for (let k = 0; k < 3; k++) { const per = 2.4, f = (t + k * 0.8) / per, n = Math.floor(f), u = f - n, cx = [196, 40, 120][k] + Math.round(h(n, k, 31) * 40), cy = 26 + Math.round(h(n, k, 32) * 16);
    const c = [hex('#f0c040'), hex('#e85a8a'), hex('#6ae8f0'), hex('#a8f060')][(n + k) % 4];
    if (u < 0.3) { const y = Math.round(lerp(100, cy, u / 0.3)); R.pset(cx, y, hex('#f8e0a0')); R.pset(cx, y + 2, hex('#8a6a40')); }
    else { const v = (u - 0.3) / 0.7, r = 4 + v * 13; if (v < 0.85) for (let i = 0; i < 14; i++) { const an = i * 0.449 + n; const x = Math.round(cx + Math.cos(an) * r), y = Math.round(cy + Math.sin(an) * r + v * v * 6); R.pset(x, y, v > 0.6 && (i & 1) ? mez(c, hex('#36265a'), 0.5) : c); if (v < 0.5) R.pset(Math.round(cx + Math.cos(an) * r * 0.6), Math.round(cy + Math.sin(an) * r * 0.6), BL); } } }
};
const p3 = (t) => {
  calleFija(); fuegos(t);
  // nubes de tres tonos
  for (let k = 0; k < 3; k++) { const x = ((k * 130 + t * (3 + k * 2)) % 420) - 60, y = 48 + k * 9; for (let i = 0; i < 5; i++) R.disco(Math.round(x + i * 9), y + (i % 2 ? -2 : 0), 5 + (i % 2), [hex('#2a2450'), hex('#36306a'), hex('#443c78')][(i + k) % 3]); }
  // las siluetas que bailan detrás de las ventanas encendidas
  for (const [x, y, w] of [[68, 70, 14], [160, 78, 12], [190, 66, 14], [284, 82, 14]]) { const dx = Math.round(Math.sin(t * 2.4 + x) * (w / 2 - 3)); const cx = x + Math.round(w / 2) + dx; R.recorte([x, y, x + w - 1, y + 17]); R.disco(cx, y + 9, 3, hex('#5a3a30')); R.rect(cx - 3, y + 12, cx + 3, y + 17, hex('#5a3a30')); R.recorte(null); }
  papelPicado(t);
  // el tendedero: de la ventana amarilla al balcón rosa, con la ropa
  const sacude = t > ROJO ? 2.2 : 0.8, y0 = 72, y1 = 74;
  const lineaY = (x) => Math.round(lerp(y0, y1, (x - 114) / 72) + Math.sin((x - 114) / 72 * Math.PI) * 7);
  for (let x = 114; x <= 186; x++) R.pset(x, lineaY(x), hex('#d8d0c0'));
  const ropa = (x, dib) => { const s = Math.round(Math.sin(t * 5 + x) * sacude); dib(x + s, lineaY(x)); };
  ropa(124, (x, y) => { R.rect(x - 6, y + 1, x + 6, y + 13, K); R.rect(x - 5, y + 2, x + 5, y + 12, hex('#f4f4ee')); R.rect(x - 8, y + 2, x - 6, y + 6, hex('#f4f4ee')); R.rect(x + 6, y + 2, x + 8, y + 6, hex('#f4f4ee')); });
  ropa(144, (x, y) => { T.PIEZAS_TR.calzones(R, x, y + 22, { s: 2, color: 'rojo' }); if (t > ROJO && t < ROJO + 1) for (let k = 0; k < 6; k++) { const an = k * 1.05 + t * 2; R.pset(Math.round(x + Math.cos(an) * 17), Math.round(y + 11 + Math.sin(an) * 14), hex('#f8e8a0')); } });
  const tiende = tramo(t, AMAR - 0.1, AMAR + 0.5);
  // la vecina en su balcón, con los calzones amarillos en la mano que va a tender
  const v = R.actor(EL.mexicana, 190, 86, t, { dir: -1, sostiene: tiende < 1 ? [180, 74] : undefined, sonrisa: tiende >= 1, habla: tiende >= 1 && Math.sin(t * 7) > 0 });
  if (tiende < 1) { const [mx, my] = v.mano; const x = Math.round(lerp(mx, 168, tiende)), y = Math.round(lerp(my + 18, lineaY(168) + 22, tiende)); T.PIEZAS_TR.calzones(R, x, y, { s: 2, color: 'amarillo', pinzas: tiende > 0.8 }); }
  else ropa(168, (x, y) => T.PIEZAS_TR.calzones(R, x, y + 22, { s: 2, color: 'amarillo' }));
  ropa(182, (x, y) => { R.rect(x - 1, y + 1, x + 2, y + 9, hex('#3a6ac8')); R.rect(x - 1, y + 8, x + 4, y + 10, hex('#3a6ac8')); });
  // la baranda del balcón, por delante de la vecina
  R.rect(180, 76, 216, 77, K); for (let x = 181; x <= 215; x += 3) R.rect(x, 77, x, 85, K); R.rect(180, 81, 216, 81, K);
  // el portal turquesa: se abre, sale el vecino con la maleta
  const abre = tramo(t, SALE - 0.5, SALE - 0.25) - tramo(t, SALE + 0.5, SALE + 0.8);
  R.rect(140, 116, 155, 147, abre > 0 ? hex('#f8d890') : hex('#2a6a8a'));
  if (abre > 0) { R.rect(140, 140, 155, 147, hex('#e8b060')); const w = Math.round(16 * (1 - abre)); R.rect(140, 116, 140 + w, 147, hex('#2a6a8a')); R.rect(140 + w, 116, 140 + w, 147, K); }
  else { for (let j = 119; j < 146; j += 9) { R.rect(142, j, 146, j + 6, hex('#3a7a9a')); R.rect(149, j, 153, j + 6, hex('#3a7a9a')); } R.pset(152, 132, hex('#f0c040')); }
  // el perro tumbado en la acera, que levanta la cabeza al paso del vecino
  const perro = (x, y) => { const alza = (t > SALE && t < SALE + 1.2) || t > MALETA + 0.2; R.rect(x, y - 4, x + 11, y, K); R.rect(x + 1, y - 3, x + 10, y - 1, hex('#a87a4a')); R.rect(x + 9, y - (alza ? 8 : 6), x + 14, y - (alza ? 3 : 2), K); R.rect(x + 10, y - (alza ? 7 : 5), x + 13, y - (alza ? 4 : 3), hex('#a87a4a')); R.pset(x + 12, y - (alza ? 6 : 4), K); R.pset(x + 10, y - (alza ? 8 : 6), hex('#6a4a2a'));
    const cola = Math.sin(t * 14) > 0 ? -1 : 1; R.linea(x, y - 3, x - 3, y - 4 + cola, hex('#a87a4a')); };
  perro(212, 154);
  // el vecino: sale con prisa, da la vuelta a la manzana por la derecha y vuelve por la izquierda
  const ida = tramo(t, SALE - 0.2, MALETA - 0.5), vuelta = tramo(t, MALETA - 0.3, P4 - 0.2);
  let x = null; if (t > SALE - 0.35 && ida < 1) x = Math.round(lerp(141, 336, ida)); else if (t > MALETA - 0.3) x = Math.round(lerp(-24, 98, vuelta));
  if (x != null) { const r = R.actor(EL.mexicano, x, 154, t, { dir: 1, anda: (ida > 0 && ida < 1) || (vuelta > 0 && vuelta < 1), sostiene: true, sorpresa: vuelta >= 1 }); const [mx, my] = r.mano; T.PIEZAS_TR.maleta(R, mx + 3, my + 13, {});
    if (t > MALETA + 0.3) { const b = t < MALETA + 0.5 ? 2 : 0; R.icono('?', x + 2, 118 - b, hex('#f8f0d0'), K, 2); } }
  // el escarabajo aparcado, por delante de la gente
  const cx0 = 6; R.disco(cx0 + 14, 172, 6, K); R.disco(cx0 + 46, 172, 6, K); R.disco(cx0 + 14, 172, 3, hex('#9a9aa8')); R.disco(cx0 + 46, 172, 3, hex('#9a9aa8'));
  R.poligono([[cx0 + 2, 172], [cx0 + 6, 160], [cx0 + 18, 148], [cx0 + 40, 148], [cx0 + 52, 160], [cx0 + 58, 172]], K);
  R.poligono([[cx0 + 4, 170], [cx0 + 8, 160], [cx0 + 19, 150], [cx0 + 39, 150], [cx0 + 50, 160], [cx0 + 56, 170]], hex('#3a8a4a'));
  R.poligono([[cx0 + 18, 158], [cx0 + 22, 152], [cx0 + 29, 152], [cx0 + 29, 158]], hex('#2a3a5a')); R.poligono([[cx0 + 32, 158], [cx0 + 32, 152], [cx0 + 38, 152], [cx0 + 44, 158]], hex('#2a3a5a'));
  R.rect(cx0 + 4, 164, cx0 + 56, 165, hex('#2a6a3a')); R.pset(cx0 + 55, 162, hex('#f8e8a0')); R.pset(cx0 + 24, 153, hex('#6a8ab8')); R.pset(cx0 + 36, 153, hex('#6a8ab8'));
  // la farola encendida y su halo
  for (let k = 0; k < 40; k++) { const an = k * 0.157, r = 10 + Math.sin(t * 3 + k) * 1.5; if (k & 1) R.pset(Math.round(271 + Math.cos(an) * r), Math.round(67 + Math.sin(an) * r * 0.6), hex('#a89a70')); }
};

// ── 4 · hoy, la Puerta del Sol ──
const p4 = (t) => {
  const camp = t < MIL ? 0 : Math.min(12, 1 + (t - MIL) / 0.7);
  const o = { encuadre: 'sol', bola: tramo(t, P4, MIL - 0.1), campanada: camp, fuegos: tramo(t, MIL + 1.6, MIL + 2.6) };
  T.anuevo(R, t, o);
  const cs = [MIL, MIL + 0.7, MIL + 1.4, MIL + 2.1];
  comeUvas(EL.filipina, 70, 160, t, 1, cs.map((c) => c + 0.1), { sorpresa: t > NADIE && t < HALLA + 0.6, habla: t < NADIE && Math.sin(t * 7) > 0 });
  comeUvas(EL.filipino, 88, 160, t, -1, cs, { dedo: t > HALLA && t < MIL - 0.5 });
  comeUvas(EL.mexicana, 236, 160, t, 1, cs.map((c) => c + 0.05), { sorpresa: t > NADIE + 0.4 && t < NADIE + 1.6 });
  comeUvas(EL.chicaHoy, 254, 160, t, -1, cs.map((c) => c + 0.15), { sonrisa: true });
  // el de la maleta da su vuelta a la plaza, por delante
  const u = tramo(t, P4 - 0.3, E.duracion), x = Math.round(lerp(10, 300, u)), salta = t > MIL && t < MIL + 0.4;
  const r = R.actor(EL.mexicano, x, 166, t, { dir: 1, anda: !salta, salto: salta ? 3 : 0, sostiene: true, sonrisa: t > MIL });
  T.PIEZAS_TR.maleta(R, r.mano[0] + 3, r.mano[1] + 13, {});
  T.anuevoDelante(R, t, o);
  // los «?»: nadie sabe de dónde salieron
  const q = (xq, c0, d) => { if (t > c0 && t < c0 + d) R.icono('?', xq, 112 - (t < c0 + 0.15 ? 2 : 0), hex('#f8f0d0'), K, 2); };
  q(x + 1, NADIE + 0.1, 2.0); q(74, HALLA, 1.3); q(240, NADIE + 0.5, 1.2);
};

const efectos = [[ENCIENDE - 0.3, 'interruptor'], [CH1, 'campana'], [CH1 + 0.4, 'masca'], [CH2, 'campana'],
  [UVAS, 'pop'], [MEX, 'pop'], [FIL, 'pop'], [FOTO + 0.1, 'papel'],
  [ROJO, 'viento'], [SALE - 0.5, 'puerta'], [MALETA + 0.3, 'pop'],
  [NADIE + 0.1, 'pop'], [MIL, 'campana'], [MIL + 0.75, 'masca'], [MIL + 1.4, 'campana'], [MIL + 2.2, 'boom']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P2 ? 1962 : 2026) });
''')

# ── tr-calendario ─────────────────────────────────────────────────────────────────────────────────────────────
E['tr-calendario'] = ('El año empieza en marzo', '''// TR-CALENDARIO (frase 6). Cinco planos:
// 1. (despacho general, 1752) el recaudador escribe y se sorprende en «catch»; el aprendiz engancha con la pértiga la
//    hoja de marzo del calendario de pared y la arranca en «January»: cae revoloteando; el recaudador señala («Rome»);
// 2. (fondo local: el foro de Roma) el calendario de piedra en el muro; César entra y lo señala, la columna de enero se
//    enciende («that month»), una luz recorre el calendario («new calendar») y el cantero labra «45» («45»);
// 3. (paris1558 general, 1450) los aldeanos entran en la catedral; el monje alza la hoja del 25 de marzo («late March»)
//    y el retablo de la Anunciación se ilumina («Annunciation») con las campanas;
// 4. (fondo local: la pared de roble de 1752) una mano arranca la hoja de marzo («England») y debajo sale enero de 1752
//    («1752»), con su destello;
// 5. (despacho libro) el recaudador escribe en el libro de cuentas y pasa la hoja: marzo → abril («April»).''', r'''
const a = (f) => en('calendario', f);
const P2 = a(0.2025), P3 = a(0.449), P4 = a(0.7035), P5 = a(0.887);
const TRUCO = a(0.062), ENERO = a(0.123), ROMA = a(0.172);
const MES = a(0.26), NUEVO = a(0.286), CUARENTA = a(0.3405);
const ENTRAN = P3 + 0.1, MARZO = a(0.609), FIESTA = a(0.646), ANUNC = a(0.674);
const ARRANCA = a(0.735), Y1752 = a(0.7805), ABRIL = a(0.98);
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const rampa = (...c) => c.map(hex), K = T.C.k, BL = T.C.blanco;
const mez = (c1, c2, u) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * u) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * u) << 8) | Math.round(r1 + ((c2 & 255) - r1) * u)) >>> 0; };
const capa = (f) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); f(); R.recorte(null); R.usar(prev); } R.copiar(b); }; };
const DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];
const cifra = (n, x, y, c) => { String(n).split('').forEach((d, k) => { const g = DIG[+d]; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + k * 4 + i, y + j, c); }); };
const destello = (x, y, r, c) => { R.linea(x - r, y, x + r, y, c); R.linea(x, y - r, x, y + r, c); R.pset(x - 1, y - 1, c); R.pset(x + 1, y + 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); };

// ── 1 · el despacho de 1752 ──
const p1 = (t) => {
  const pasa = tramo(t, ENERO - 0.5, ENERO), o = { encuadre: 'despacho', mes: t < ENERO ? 3 : 1, pasa: t < ENERO ? pasa : 0 };
  T.anuevo(R, t, o);
  // la hoja de marzo que cae revoloteando hasta el suelo
  const c = tramo(t, ENERO, ENERO + 1.4); if (t > ENERO && c < 1) { const x = Math.round(128 - c * 24 + Math.sin(c * 9) * 8), y = Math.round(lerp(78, 172, c)); T.PIEZAS_TR.hojaCalendario(R, x, y, { mes: 3, dia: 25, s: 2 }); }
  if (c >= 1) T.PIEZAS_TR.hojaCalendario(R, 104, 172, { mes: 3, dia: 25, s: 2 });
  // el aprendiz con la pértiga: la engancha y tira
  const tira = tramo(t, ENERO - 0.55, ENERO - 0.05), alza = tramo(t, 0.6, ENERO - 0.6);
  const ap = R.actor(EL.aprendiz, 74, 164, t, { dir: 1, sostiene: [94, 144], sonrisa: t > ENERO + 0.3 });
  const [hx, hy] = ap.mano, gx = Math.round(lerp(100, 112, alza) + tira * 6), gy = Math.round(lerp(120, 74, alza) - tira * 10);
  R.linea(hx - 1, hy, gx - 1, gy, K); R.linea(hx + 2, hy, gx + 2, gy, K); R.linea(hx, hy, gx, gy, hex('#8a5a30')); R.linea(hx + 1, hy, gx + 1, gy, hex('#c8904a')); R.linea(gx + 1, gy, gx + 3, gy - 2, hex('#c8c8d0')); R.pset(gx + 3, gy - 1, hex('#c8c8d0'));
  // el recaudador, detrás del escritorio: escribe, se sorprende y señala
  R.actor(EL.recaudador, 162, 145, t, { dir: -1, habla: t > TRUCO - 0.6 && t < TRUCO + 0.4 && Math.sin(t * 8) > 0, sorpresa: t > TRUCO && t < ENERO + 0.8, dedo: t > ROMA - 0.2 });
  T.anuevoDelante(R, t, o);
};

// ── 2 · el foro de Roma: el calendario de piedra ──
const MAR = rampa('#a89c88', '#c4b8a2', '#dcd2bc', '#ece4d0', '#f8f2e4');
const TAB = [20, 30, 160, 122];
const foroFijo = capa(() => {
  // el cielo de la derecha, tramado
  const CI = rampa('#4a86d0', '#5e98da', '#78acE4', '#94c0ec', '#b4d4f2');
  for (let y = 0; y < 118; y++) for (let x = 212; x < 320; x++) R.pset(x, y, R.tone(CI, y / 26 + (h(x >> 2, y >> 2, 1) - 0.5) * 0.4, x, y));
  // el Palatino con sus pinos
  R.poligono([[212, 104], [240, 92], [272, 96], [300, 88], [320, 92], [320, 140], [212, 140]], hex('#7a9a5a')); for (let k = 0; k < 120; k++) R.pset(214 + Math.round(h(k, 1, 6) * 104), 100 + Math.round(h(k, 2, 6) * 38), k % 2 ? hex('#6a8a4a') : hex('#8aaa64'));
  for (const x of [236, 262, 300]) { R.rect(x, 88, x + 1, 98, hex('#5a3a2a')); R.disco(x, 86, 6, hex('#3a6a3a')); R.disco(x - 2, 85, 4, hex('#4a7a44')); }
  // el templo del foro (pórtico, columnas y frontón sin letras)
  R.rect(232, 112, 320, 138, MAR[1]); for (let y = 114; y < 138; y += 4) R.rect(232, y, 320, y, MAR[0]);
  R.poligono([[234, 70], [280, 54], [326, 70]], K); R.poligono([[238, 69], [280, 56], [322, 69]], MAR[3]); R.poligono([[256, 67], [280, 60], [304, 67]], MAR[1]);
  R.rect(234, 70, 320, 77, K); R.rect(235, 71, 320, 76, MAR[2]); for (let x = 236; x < 320; x += 4) R.pset(x, 74, MAR[0]);
  for (let k = 0; k < 6; k++) { const x = 238 + k * 15; R.rect(x - 1, 77, x + 7, 112, K); R.rect(x, 78, x + 6, 111, MAR[3]); R.rect(x + 5, 78, x + 6, 111, MAR[1]); R.rect(x + 2, 78, x + 2, 111, MAR[2]); R.rect(x - 1, 77, x + 7, 79, MAR[4]); }
  R.rect(248, 80, 316, 111, hex('#3a3430')); for (let k = 0; k < 6; k++) { const x = 238 + k * 15; R.rect(x, 78, x + 6, 111, MAR[3]); R.rect(x + 5, 78, x + 6, 111, MAR[1]); R.rect(x + 2, 78, x + 2, 111, MAR[2]); R.rect(x - 1, 77, x + 7, 79, MAR[4]); R.rect(x - 1, 110, x + 7, 112, MAR[4]); }
  // el ciprés
  for (let y = 70; y < 120; y++) { const w = Math.round((y - 70) * 0.12) + 1; R.rect(218 - w, y, 218 + w, y, (y + (h(y, 1, 3) * 3 | 0)) % 3 ? hex('#2a5a34') : hex('#3a6e40')); }
  // el muro de sillares
  for (let y = 0; y < 128; y++) for (let x = 0; x < 212; x++) { const fila = y >> 3, jx = (x + (fila & 1) * 14) % 28, jy = y & 7; const v = 2.5 + (h(x >> 3, y >> 2, 2) - 0.5) * 0.9 - (jy === 7 || jx === 27 ? 1.5 : 0) + (jy === 0 ? 0.6 : 0); R.pset(x, y, R.tone(MAR, v, x, y)); }
  for (let k = 0; k < 14; k++) { let x = Math.round(h(k, 1, 5) * 200), y = Math.round(h(k, 2, 5) * 120); for (let i = 0; i < 12; i++) { R.pset(x, y, MAR[1]); x += h(k, i, 6) > 0.5 ? 1 : 0; y += 1; } }
  // la cornisa de arriba (tranquila bajo la barra) y las pilastras
  R.rect(0, 0, 211, 5, MAR[3]); R.rect(0, 6, 211, 7, MAR[0]); for (let x = 2; x < 212; x += 6) R.rect(x, 3, x + 2, 5, MAR[1]);
  for (const x0 of [194, 0]) { R.rect(x0, 8, x0 + 17, 128, MAR[3]); R.rect(x0 + 17, 8, x0 + 17, 128, MAR[0]); for (let x = x0 + 3; x < x0 + 16; x += 4) R.rect(x, 18, x, 120, MAR[1]); R.rect(x0 - 1, 8, x0 + 18, 13, MAR[4]); R.rect(x0 - 1, 14, x0 + 18, 14, MAR[0]); }
  R.rect(212, 0, 213, 128, K);
  // el medallón con el perfil de César en relieve, con su corona de laurel
  const mx = 178, my = 54; R.disco(mx, my, 14, MAR[0]); R.disco(mx, my, 13, MAR[3]); R.disco(mx, my, 11, MAR[2]);
  for (let a2 = 0; a2 < 6.28; a2 += 0.35) { const x = Math.round(mx + Math.cos(a2) * 12), y = Math.round(my + Math.sin(a2) * 12); R.pset(x, y, hex('#7a9a5a')); }
  R.disco(mx + 1, my - 2, 5, MAR[4]); R.disco(mx + 2, my - 2, 4, MAR[3]); R.rect(mx - 4, my + 2, mx + 3, my + 8, MAR[4]); R.rect(mx - 6, my + 7, mx + 5, my + 9, MAR[3]);
  R.pset(mx + 6, my - 1, MAR[1]); R.pset(mx + 5, my + 1, MAR[1]); R.pset(mx + 4, my - 3, MAR[0]); for (let i = -3; i <= 3; i++) R.pset(mx + i, my - 7 + Math.abs(i) / 2, hex('#7a9a5a'));
  R.rect(mx - 1, my + 3, mx + 3, my + 3, MAR[1]); for (let y = my - 6; y < my + 8; y++) R.pset(mx - 5, y, MAR[1]);
  // la tabla del calendario de piedra (sin letras: cifras, rayas de los días y los festivos en rojo)
  const [x0, y0, x1, y1] = TAB;
  R.rect(x0 - 4, y0 - 4, x1 + 4, y1 + 4, K); R.rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, MAR[1]); R.rect(x0 - 3, y0 - 3, x1 + 3, y0 - 2, MAR[4]); R.rect(x0 - 3, y1 + 2, x1 + 3, y1 + 3, MAR[0]);
  R.rect(x0, y0, x1, y1, MAR[4]); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (h(x, y, 9) < 0.06) R.pset(x, y, MAR[3]);
  R.rect(x0, y0 + 12, x1, y0 + 12, MAR[1]);
  for (let m = 0; m < 12; m++) { const cx = x0 + 2 + m * 11.5; R.rect(Math.round(cx + 10), y0, Math.round(cx + 10), y1, MAR[1]); cifra(m + 1, Math.round(cx + (m + 1 > 9 ? 1 : 3)), y0 + 4, hex('#5a5048'));
    const dias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m];
    for (let d = 0; d < dias; d++) { const y = y0 + 16 + Math.floor(d * 2.4), w = h(m, d, 4) < 0.3 ? 4 : 3, roja = h(m, d, 5) < 0.12; R.rect(Math.round(cx + 2), y, Math.round(cx + 1 + w), y, roja ? hex('#a83028') : hex('#6a6058')); if (d % 8 === 0) R.pset(Math.round(cx + 7), y, hex('#6a6058')); } }
  // una esquina rota y una grieta
  R.poligono([[x1 - 10, y1 + 3], [x1 + 4, y1 + 3], [x1 + 4, y1 - 8]], MAR[0]); R.linea(60, y0, 66, y0 + 30, MAR[0]); R.linea(66, y0 + 30, 63, y0 + 44, MAR[0]);
  // el podio con la cartela en blanco donde se labra el número
  R.rect(0, 128, 211, 150, MAR[2]); R.rect(0, 128, 211, 129, MAR[4]); R.rect(0, 149, 211, 150, MAR[0]); for (let x = 0; x < 212; x += 30) R.rect(x, 130, x, 148, MAR[1]);
  R.rect(56, 131, 112, 147, K); R.rect(57, 132, 111, 146, MAR[3]); R.rect(57, 132, 111, 132, MAR[0]);
  // el enlosado de travertino, con juntas, grietas y matas
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 150) / 8), jx = (x + f * 19) % 38; const v = 2.6 - (y - 150) * 0.02 + (h(x >> 2, y >> 1, 4) - 0.5) * 0.7 - (jx === 0 || (y - 150) % 8 === 0 ? 1.6 : 0); R.pset(x, y, R.tone(MAR, v, x, y)); }
  for (let y = 138; y < 150; y++) for (let x = 212; x < 320; x++) R.pset(x, y, R.tone(MAR, 2 + (h(x >> 2, y, 7) - 0.5), x, y));
  for (const [x, y] of [[30, 160], [140, 172], [250, 156], [300, 176], [190, 166]]) { R.pset(x, y, hex('#5a8a3a')); R.pset(x + 1, y - 1, hex('#6a9a44')); R.pset(x - 1, y - 1, hex('#4a7a34')); R.pset(x + 2, y, hex('#5a8a3a')); }
  R.linea(90, 158, 110, 164, MAR[0]); R.linea(110, 164, 118, 163, MAR[0]);
});
const p2 = (t) => {
  foroFijo();
  // nubes de tres tonos y golondrinas
  for (let k = 0; k < 3; k++) { const x = 212 + ((k * 60 + t * (2 + k * 1.5)) % 160) - 30, y = 20 + k * 14; R.recorte([212, 0, 319, 118]); for (let i = 0; i < 4; i++) R.disco(Math.round(x + i * 7), y + (i % 2 ? -2 : 0), 4 + (i % 2), [hex('#e8f0f8'), hex('#ffffff'), hex('#c8d8ec')][(i + k) % 3]); R.recorte(null); }
  for (let k = 0; k < 2; k++) { const x = Math.round(330 - ((t * 22 + k * 70) % 140)), y = 60 + k * 10 + Math.round(Math.sin(t * 3 + k) * 3); if (x > 214) { R.pset(x, y, K); R.pset(x - 1, y - 1, K); R.pset(x + 1, y - 1, K); R.pset(x - 2, y - 1, K); R.pset(x + 2, y - 1, K); } }
  // gente pequeña que pasa al fondo, ante el templo
  for (let k = 0; k < 3; k++) { const x = Math.round(214 + ((t * 6 + k * 40) % 106)); R.rect(x, 128, x + 2, 135, [hex('#c8603a'), hex('#f4ecd8'), hex('#3a6a9a')][k]); R.pset(x + 1, 127, hex('#e8b090')); }
  // dos palomas que picotean en el podio
  for (const [x0, k] of [[150, 0], [170, 1]]) { const pica = Math.sin(t * 4 + k * 2) > 0.5 ? 1 : 0, x = x0 + Math.round(Math.sin(t * 0.6 + k) * 4); R.rect(x, 124, x + 4, 127, hex('#8a8a96')); R.rect(x + 4, 123 + pica, x + 5, 124 + pica, hex('#6a6a76')); R.pset(x + 6, 124 + pica, hex('#e8a040')); R.pset(x + 1, 128, hex('#e86a4a')); }
  // la columna de enero que se enciende y la luz que recorre el calendario
  const [x0, y0, , y1] = TAB, ene = tramo(t, MES - 0.2, MES + 0.3);
  if (ene > 0) for (let y = y0; y <= y1; y++) for (let x = x0; x < x0 + 12; x++) if (((x + y) & 1) === 0) R.pset(x, y, mez(R.pget(x, y), hex('#f8d860'), 0.5 * ene));
  if (ene > 0 && Math.sin(t * 6) > 0) destello(x0 + 6, y0 - 7, 3, hex('#fff4b0'));
  const barre = (t - NUEVO) / 1.2; if (barre > 0 && barre < 1) { const xb = Math.round(lerp(x0, 160, barre)); for (let y = y0; y <= y1; y++) for (let x = xb - 6; x < xb + 6; x++) if (x >= x0 && x <= 160 && ((x + y) & 1)) R.pset(x, y, mez(R.pget(x, y), hex('#fff8d8'), 0.6)); }
  // el cantero labra el «45» en la cartela del podio
  const n = Math.round(tramo(t, CUARENTA - 0.2, CUARENTA + 1.0) * 40);
  if (n > 0) { R.numero('45', 86, 146, { tam: 16, centro: true, n, color: hex('#7a2a20'), contorno: false, sombra: false }); }
  const golpe = Math.sin(t * 16) > 0.3 && t > CUARENTA - 0.3 && t < CUARENTA + 1.1;
  const cant = R.actor(EL.romanoPileo, 108, 170, t, { dir: -1, sostiene: [103 + (golpe ? 1 : 0), 146], sonrisa: t > CUARENTA + 1.2 });
  { const [mx, my] = cant.mano; R.linea(mx - 1, my, mx - 6, my - 2, hex('#9a9aa8')); R.rect(mx, my - 4, mx + 2, my - 1, hex('#6a4a2a')); R.rect(mx + 1, my - 6, mx + 4, my - 4, hex('#5a5a66'));
    if (golpe) for (let k = 0; k < 3; k++) R.pset(mx - 7 - k, my - 3 + Math.round(Math.sin(t * 30 + k) * 2), hex('#e8e0d0')); }
  // César entra por la derecha y señala el calendario
  const ce = tramo(t, P2, MES - 0.5), cx = Math.round(lerp(262, 178, ce));
  R.actor(EL.cesar, cx, 166, t, { dir: -1, anda: ce > 0 && ce < 1, dedo: t > MES - 0.4, habla: t > MES && t < CUARENTA && Math.sin(t * 7) > 0, sonrisa: t > CUARENTA + 1 });
  // una romana que cruza con su cesto
  const ro = tramo(t, P2 - 0.5, P3 + 0.3), rx = Math.round(lerp(-20, 320, ro));
  const rr = R.actor(EL.romana, rx, 176, t, { dir: 1, anda: true, sostiene: true }); const [bx, by] = rr.mano; R.rect(bx - 3, by - 1, bx + 4, by + 4, K); R.rect(bx - 2, by, bx + 3, by + 3, hex('#c89a50')); R.pset(bx - 1, by - 1, hex('#d84a3a')); R.pset(bx + 1, by - 2, hex('#7a9a3a'));
};

// ── 3 · la catedral en la Edad Media: la Anunciación ──
const retablo = (t) => {
  const x0 = 198, y0 = 58, x1 = 238, y1 = 92, luz = tramo(t, ANUNC - 0.2, ANUNC + 0.4);
  R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, K); R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, hex('#e8b830')); R.rect(x0, y0, x1, y1, hex('#c89a30'));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (((x + y) & 3) === 0) R.pset(x, y, hex('#e8c050'));
  R.rect(x0, y1 - 8, x1, y1, hex('#6a4a2a')); for (let x = x0; x <= x1; x += 4) R.rect(x, y1 - 8, x + 1, y1 - 7, hex('#8a6a3a'));
  // el ángel (túnica blanca, alas), de rodillas a la izquierda
  R.poligono([[x0 + 4, y1 - 8], [x0 + 9, y0 + 14], [x0 + 15, y1 - 8]], hex('#f4f0e6')); R.poligono([[x0 + 3, y0 + 18], [x0 + 6, y0 + 4], [x0 + 10, y0 + 16]], hex('#d8d4e0'));
  R.disco(x0 + 10, y0 + 11, 2, hex('#f0c8a0')); R.anillo(x0 + 10, y0 + 11, 4, hex('#fff0a0')); R.linea(x0 + 12, y0 + 16, x0 + 18, y0 + 13, hex('#f0c8a0'));
  // María (manto azul), con el libro en el atril
  R.poligono([[x1 - 16, y1 - 8], [x1 - 10, y0 + 12], [x1 - 4, y1 - 8]], hex('#2a4aa0')); R.rect(x1 - 12, y1 - 14, x1 - 8, y1 - 9, hex('#b8303a'));
  R.disco(x1 - 10, y0 + 12, 2, hex('#f0c8a0')); R.anillo(x1 - 10, y0 + 12, 4, hex('#fff0a0')); R.rect(x1 - 22, y1 - 15, x1 - 18, y1 - 8, hex('#6a4a2a')); R.rect(x1 - 23, y1 - 17, x1 - 17, y1 - 15, hex('#f4f0e6'));
  // el lirio y el rayo con la paloma
  R.linea(x0 + 20, y1 - 8, x0 + 20, y0 + 18, hex('#3a7a3a')); R.pset(x0 + 19, y0 + 17, BL); R.pset(x0 + 21, y0 + 17, BL); R.pset(x0 + 20, y0 + 16, BL);
  for (let i = 0; i < 18; i++) { const x = x0 + 22 + i * 0.7, y = y0 + 2 + i * 0.6; R.pset(Math.round(x), Math.round(y), luz > 0 && (i + Math.floor(t * 10)) % 3 === 0 ? BL : hex('#fff4b0')); }
  R.rect(x0 + 20, y0 + 1, x0 + 23, y0 + 2, BL); R.pset(x0 + 19, y0 + 2, BL); R.pset(x0 + 24, y0, BL);
  if (luz > 0) { for (let k = 0; k < 12; k++) { const an = k * 0.52 + t, r = 22 + Math.sin(t * 5 + k) * 3; if (Math.sin(t * 9 + k) > 0) R.pset(Math.round(218 + Math.cos(an) * r), Math.round(75 + Math.sin(an) * r * 0.8), hex('#fff4b0')); } destello(x0 + 10, y0 + 5, 2 + Math.round(luz * 2), BL); destello(x1 - 10, y0 + 6, 2 + Math.round(luz * 2), BL); }
};
const p3 = (t) => {
  const o = { encuadre: 'paris1558' };
  T.fiestas(R, t, o);
  retablo(t);
  // el monje en el tablado alza la hoja del 25 de marzo
  const sube = tramo(t, MARZO - 0.3, MARZO + 0.1), m = R.actor(EL.monje, 168, 126, t, { dir: 1, sostiene: [184, Math.round(lerp(110, 100, sube))], sonrisa: t > ANUNC });
  { const [mx, my] = m.mano; T.PIEZAS_TR.hojaCalendario(R, mx + 3, my + 4, { mes: 3, dia: 25, s: 2 }); if (t > MARZO && t < MARZO + 0.8 && Math.sin(t * 14) > 0) destello(mx + 15, my - 24, 3, hex('#fff4b0')); }
  // los aldeanos entran por la nave y se alegran en «the Feast»
  const gente = [[EL.labriego, 64, 0], [EL.labriega, 44, 0.35], [EL.ninoCampo, 86, 0.7]];
  for (const [d, xf, dt] of gente) { const u = tramo(t, ENTRAN + dt, ENTRAN + dt + 2.2), x = Math.round(lerp(-22, xf, u)), fiesta = t > FIESTA && t < FIESTA + 1.4;
    R.actor(d, x, 168, t, { dir: 1, anda: u > 0 && u < 1, brazos: fiesta, salto: fiesta && d === EL.ninoCampo && Math.sin(t * 12) > 0 ? 2 : 0, sonrisa: t > MARZO }); }
  T.fiestasDelante(R, t, o);
};

// ── 4 · la pared de roble de 1752: el calendario cambia ──
const ROB = rampa('#2e1a0e', '#4a2c18', '#6a4024', '#8a5632', '#a8703e');
const paredFija = capa(() => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 2 + Math.sin(x * 0.9 + Math.sin(y * 0.05 + x * 0.01) * 3) * 0.35 + (h(x, y >> 3, 1) - 0.5) * 0.5; R.pset(x, y, R.tone(ROB, v, x, y)); }
  // los paneles en relieve
  for (const [px0, py0, px1, py1] of [[6, 18, 62, 76], [6, 84, 62, 140], [214, 18, 254, 76], [214, 84, 254, 140], [70, 150, 250, 176]]) {
    R.rect(px0, py0, px1, py1, ROB[1]); R.rect(px0 + 1, py0 + 1, px1, py1, ROB[3]); R.rect(px0 + 3, py0 + 3, px1 - 3, py1 - 3, ROB[1]); R.rect(px0 + 4, py0 + 4, px1 - 3, py1 - 3, ROB[2]);
    for (let y = py0 + 5; y < py1 - 3; y++) for (let x = px0 + 5; x < px1 - 3; x++) if (Math.sin(x * 0.7 + Math.sin(y * 0.08) * 4) > 0.85) R.pset(x, y, ROB[1]); }
  R.rect(0, 10, 319, 13, ROB[3]); R.rect(0, 14, 319, 15, ROB[0]); R.rect(0, 0, 319, 9, ROB[1]); for (let x = 0; x < 320; x += 5) R.rect(x, 4, x + 2, 7, ROB[2]);
  // la ventana emplomada de la derecha, con la lluvia de Londres (bajo la esquina de Atom)
  R.rect(260, 52, 318, 142, K); R.rect(262, 54, 316, 140, hex('#3a4a5a'));
  for (let y = 54; y < 141; y++) for (let x = 262; x < 317; x++) { const v = h(x >> 2, y >> 2, 3); R.pset(x, y, y > 112 ? (v < 0.5 ? hex('#4a3a34') : hex('#5a463c')) : v < 0.3 ? hex('#4a5a6a') : hex('#3e4e5e')); }
  for (let k = -12; k < 20; k++) { R.linea(262 + k * 6, 54, 262 + k * 6 + 90, 144, hex('#1a1a22')); R.linea(262 + k * 6 + 90, 54, 262 + k * 6, 144, hex('#1a1a22')); }
  R.rect(260, 52, 318, 54, ROB[3]); R.rect(260, 142, 318, 146, ROB[3]); R.rect(258, 146, 320, 148, ROB[4]);
  // el retrato de silueta y el aplique con la vela
  R.rect(18, 26, 50, 66, hex('#c89a30')); R.rect(20, 28, 48, 64, hex('#f2e8d0')); R.disco(34, 42, 6, K); R.rect(30, 46, 38, 56, K); R.rect(26, 52, 42, 63, K); R.pset(40, 41, K); R.pset(41, 42, K); R.rect(28, 34, 36, 36, K);
  R.rect(84, 60, 88, 62, hex('#a88a40')); R.rect(85, 46, 87, 60, hex('#f2ecd8')); R.rect(80, 62, 92, 63, hex('#a88a40')); R.linea(86, 63, 86, 76, hex('#a88a40')); R.rect(82, 76, 90, 78, hex('#a88a40'));
  // el clavo y el cordel del calendario
  R.pset(160, 22, hex('#c8c8d0')); R.linea(150, 31, 160, 22, hex('#d8c8a0')); R.linea(170, 31, 160, 22, hex('#d8c8a0'));
  // la repisa con sus cosas
  R.rect(0, 140, 319, 143, ROB[4]); R.rect(0, 144, 319, 148, ROB[2]); R.rect(0, 148, 319, 148, ROB[0]);
  R.rect(14, 128, 20, 139, hex('#c8c8d0')); R.rect(12, 138, 22, 139, hex('#a8a8b0')); R.rect(15, 120, 19, 128, hex('#f2ecd8'));
  for (const [x, w, hh, c] of [[30, 8, 12, '#6a2a2a'], [39, 6, 14, '#2a4a6a'], [46, 9, 10, '#3a5a2a']]) { R.rect(x, 139 - hh, x + w, 139, K); R.rect(x + 1, 140 - hh, x + w - 1, 139, hex(c)); R.rect(x + 1, 142 - hh, x + w - 1, 142 - hh, hex('#e8c040')); }
  R.rect(228, 132, 238, 139, K); R.rect(229, 133, 237, 139, hex('#2a2a32')); R.linea(236, 132, 246, 118, hex('#f2ecd8')); R.linea(237, 132, 247, 119, hex('#c8c0b0'));
  R.rect(276, 116, 298, 139, K); R.rect(277, 117, 297, 139, hex('#5a3418')); R.disco(287, 124, 6, hex('#e8c040')); R.disco(287, 124, 5, hex('#f4ecd8')); R.rect(280, 131, 294, 137, hex('#2a1a10'));
  R.linea(287, 124, 287, 120, K); R.linea(287, 124, 290, 124, K);
});
const p4 = (t) => {
  paredFija();
  // la lluvia en los cristales
  R.recorte([262, 54, 316, 140]); for (let k = 0; k < 18; k++) { const x = 264 + (k * 7) % 52, y = 54 + Math.round(((t * 60 + k * 37) % 90)); R.linea(x, y, x - 1, y + 4, hex('#8aa0b8')); }
  for (let k = 0; k < 4; k++) { const x = 270 + k * 12, y = 60 + Math.round(((t * 9 + k * 23) % 50)); R.disco(x, y, 1, hex('#a8c0d4')); } R.recorte(null);
  // la llama de las velas y la polilla
  for (const [x, y] of [[86, 45], [17, 119]]) { const f = Math.sin(t * 13 + x) > 0 ? 1 : 0; R.rect(x - 1, y - 3 - f, x + 1, y, hex('#f8c040')); R.pset(x, y - 4 - f, hex('#fff4b0')); R.pset(x, y - 1, BL); }
  const pa = t * 2.2; R.pset(Math.round(86 + Math.cos(pa) * 9), Math.round(40 + Math.sin(pa * 1.7) * 6), hex('#d8c8a8'));
  // el péndulo del reloj de la repisa
  R.recorte([280, 131, 294, 137]); R.disco(287 + Math.round(Math.sin(t * 3.1) * 4), 134, 1, hex('#e8c040')); R.recorte(null);
  // el calendario: marzo (el 25) arriba; la mano arranca la hoja y debajo sale enero de 1752
  const cx = 160, base = 140, arr = tramo(t, ARRANCA, ARRANCA + 0.45);
  if (t < ARRANCA + 0.05) T.PIEZAS_TR.calendario(R, cx, base, { mes: 3, dia: 25, s: 5 });
  else {
    T.PIEZAS_TR.calendario(R, cx, base, { mes: 1, dia: 1752, s: 5 });
    if (t > Y1752 && t < Y1752 + 1.2) { for (let k = 0; k < 4; k++) { const an = k * 1.57 + t * 3; destello(Math.round(cx + Math.cos(an) * 56), Math.round(90 + Math.sin(an) * 48), 3, hex('#fff4b0')); } }
    const v = tramo(t, ARRANCA + 0.05, ARRANCA + 1.6); if (v < 1) { const s = v < 0.35 ? 4 : v < 0.7 ? 3 : 2; T.PIEZAS_TR.hojaCalendario(R, Math.round(cx + 30 + v * 70 + Math.sin(v * 8) * 10), Math.round(base + 6 + v * 60), { mes: 3, dia: 25, s }); }
  }
  // el brazo canónico desde abajo a la derecha: coge la esquina, tira y se va
  const llega = tramo(t, ARRANCA - 0.6, ARRANCA - 0.05), va = tramo(t, ARRANCA + 0.5, ARRANCA + 1.1);
  if (llega > 0 && va < 1) { const wx = Math.round(lerp(262, 212, llega) + arr * 18 + va * 50), wy = Math.round(lerp(196, 146, llega) + arr * 10 + va * 40);
    T.brazo(R, wx + 30, 196, wx, wy, '#5a4a3a', -1, { puno: '#f2eee2' }); }
};

// ── 5 · el libro de cuentas: abril ──
const p5 = (t) => {
  const pasa = tramo(t, ABRIL - 0.55, ABRIL + 0.05), o = { encuadre: 'despacho', camara: 'libro', mes: t < ABRIL + 0.05 ? 3 : 4, pasa: t < ABRIL + 0.05 ? pasa : 0 };
  T.anuevo(R, t, o);
  // una moneda que rueda y se tumba junto al libro
  const mo = tramo(t, P5 + 0.4, P5 + 1.6), mxx = Math.round(lerp(300, 284, mo)); R.disco(mxx, 150, mo < 1 ? 3 : 3, K); R.disco(mxx, 150, 2, hex('#e8c040')); if (mo < 1 && Math.sin(t * 20) > 0) R.pset(mxx - 1, 149, BL);
  // la mano del recaudador: escribe con la pluma, va a la esquina, pasa la hoja y vuelve a escribir
  const esc = (t0, t1, y) => { const u = (t - t0) / (t1 - t0); return [Math.round(196 + u * 40 + Math.sin(t * 22) * 2), y + (Math.sin(t * 31) > 0 ? 1 : 0)]; };
  let wx, wy, pluma = true;
  if (t < ABRIL - 0.8) [wx, wy] = esc(P5, ABRIL - 0.8, 150);
  else if (t < ABRIL + 0.1) { const u = tramo(t, ABRIL - 0.8, ABRIL - 0.5), w = tramo(t, ABRIL - 0.5, ABRIL + 0.1); wx = Math.round(lerp(236, 268, u) - w * 100); wy = Math.round(lerp(150, 154, u) - Math.sin(w * Math.PI) * 18); pluma = u < 0.5; }
  else { const u = tramo(t, ABRIL + 0.1, ABRIL + 0.6); [wx, wy] = t < ABRIL + 0.6 ? [Math.round(lerp(168, 200, u)), 150] : esc(ABRIL + 0.6, E.duracion + 1, 150); }
  T.brazo(R, wx + 34, 196, wx, wy, '#5a4a3a', -1, { puno: '#f2eee2' });
  if (pluma) { R.linea(wx - 8, wy - 2, wx - 2, wy - 14, K); R.linea(wx - 7, wy - 2, wx - 1, wy - 14, hex('#f2ecd8')); R.linea(wx - 2, wy - 14, wx + 1, wy - 18, hex('#e8e0c8')); R.pset(wx - 8, wy - 1, K); }
  // lo que va escribiendo: las cifras del primer renglón de abril
  if (t > ABRIL + 0.7) { const n = Math.round(tramo(t, ABRIL + 0.7, E.duracion) * 16); cifra('6', 178, 144, hex('#3a2a6a')); for (let i = 0; i < n; i++) R.pset(186 + i * 2, 146 + (i % 3 === 0 ? -1 : 0), hex('#3a2a6a')); }
};

const efectos = [[ENERO - 0.45, 'papel'], [MES, 'brillo'], [CUARENTA, 'golpecito'], [CUARENTA + 0.55, 'golpecito'],
  [MARZO, 'papel'], [ANUNC, 'campana'], [ARRANCA, 'papel'], [Y1752, 'brillo'], [P5 + 0.4, 'lapiz'], [ABRIL - 0.4, 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => (t < P2 ? 1752 : t < P3 ? null : t < P4 ? 1450 : 1752) });
''')

# ── tr-babilonia ─────────────────────────────────────────────────────────────────────────────────────────────
E['tr-babilonia'] = ('Babilonia', '''// TR-BABILONIA (frase 7), hace más de 4.000 años. Cuatro planos:
// 1. (fondo local: la mesa del escriba) en «resolutions?» sale un «?» en la tablilla de barro; la mano con el cálamo lo
//    alisa y escribe cuñas («Celebrating… oldest festivals»), y en «record» rueda el sello cilíndrico;
// 2. (babilonia general) la procesión del Año Nuevo cruza el patio al amanecer, el tamborilero toca; «4000» sale en el
//    cielo con un reloj de arena («4,000»);
// 3. (babilonia altar) el sacerdote le quita la corona al rey («stripped») y se la lanza al ayudante, que la deja en el
//    altar («regalia»); gag 2: la uva entra corriendo, ve la mano en alto y se esconde detrás del rey; la cachetada de
//    teatro con estrellitas («slapped»); el rey se arrodilla («knelt») y jura con la mano en alto («swear»);
// 4. (fondo local: el patio del muro de los leones) la segunda cachetada («second slap»); la lágrima del rey («cried»);
//    el sacerdote sonríe y aprueba, el público lo celebra y vuelan las palomas («good sign»); la uva asoma feliz.''', r'''
const a = (f) => en('babilonia', f);
const P2 = a(0.2863), P3 = a(0.5128), P4 = a(0.845);
const PROP = a(0.023), CELEB = a(0.079), ANTIG = a(0.175), REGISTRO = a(0.245), MIL4 = a(0.415);
const QUITA = a(0.567), INSIG = a(0.62), BOFE = a(0.658), RODILLA = a(0.72), JURA = a(0.758), BIEN = a(0.805);
const SEG = a(0.881), LLORA = a(0.929), BUENA = a(0.967);
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const rampa = (...c) => c.map(hex), K = T.C.k, BL = T.C.blanco;
const mez = (c1, c2, u) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * u) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * u) << 8) | Math.round(r1 + ((c2 & 255) - r1) * u)) >>> 0; };
const capa = (f) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); f(); R.recorte(null); R.usar(prev); } R.copiar(b); }; };
const destello = (x, y, r, c) => { R.linea(x - r, y, x + r, y, c); R.linea(x, y - r, x, y + r, c); R.pset(x - 1, y - 1, c); R.pset(x + 1, y + 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); };
const llama = (x, y, t, k = 0) => { const f = Math.sin(t * 11 + k) > 0 ? 1 : 0; R.poligono([[x - 4, y], [x - 2, y - 7 - f], [x, y - 4], [x + 1, y - 9 + f], [x + 4, y]], hex('#e86a1a')); R.poligono([[x - 2, y], [x, y - 5 - f], [x + 2, y]], hex('#f8c040')); R.pset(x, y - 1, BL); };
// el rey de rodillas: las piernas quedan bajo el suelo (recortadas) y el faldón se arremolina
const arrodillado = (def, x, suelo, t, o, k) => {
  const baja = Math.round(k * 7); if (baja === 0) return R.actor(def, x, suelo, t, o);
  R.recorte([0, 0, 319, suelo - 1]); const r = R.actor(def, x, suelo + baja, t, { ...o, quieto: true }); R.recorte(null);
  const c = def.pal.C, cS = def.pal.c ?? c; R.rect(x + 1, suelo - 3, x + 14, suelo - 1, K); R.rect(x + 2, suelo - 3, x + 13, suelo - 2, c); R.rect(x + 2, suelo - 1, x + 13, suelo - 1, cS);
  return r;
};
const estrellitas = (cx, cy, t, t0) => { const u = t - t0; if (u < 0 || u > 1.1) return; for (let k = 0; k < 3; k++) { const an = u * 7 + k * 2.09, x = Math.round(cx + Math.cos(an) * 10), y = Math.round(cy + Math.sin(an) * 4); destello(x, y, 2, hex('#f8e040')); R.pset(x, y, BL); } };

// ── 1 · la tablilla del escriba ──
const ESTERA = rampa('#6a4a24', '#8a6634', '#a8824a', '#c8a060', '#dcb878');
const BARRO = rampa('#5a3a20', '#7a5230', '#9a6c40', '#b88a56', '#d0a46c');
const TB = [86, 26, 234, 162];
const cunia = (x, y, c1, c2) => { R.pset(x, y, c1); R.pset(x + 1, y, c1); R.pset(x, y + 1, c1); R.pset(x + 1, y + 1, c2); R.pset(x + 2, y + 1, c2); R.pset(x + 3, y + 1, c2); R.pset(x, y + 2, c1); };
const mesaFija = capa(() => {
  // la estera de junco tejida
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const bx = Math.floor(x / 10), by = Math.floor(y / 10), hor = ((bx + by) & 1) === 0, u = hor ? y % 10 : x % 10;
    R.pset(x, y, R.tone(ESTERA, 2.4 + (u === 0 || u === 9 ? -1.4 : u < 3 ? 0.6 : 0) + (h(hor ? x >> 2 : x, hor ? y : y >> 2, 1) - 0.5) * 0.7, x, y)); }
  // la sombra y la tablilla de barro, abombada
  const [x0, y0, x1, y1] = TB;
  for (let y = y0 + 5; y <= y1 + 5; y++) for (let x = x0 + 5; x <= x1 + 5; x++) R.pset(x, y, mez(R.pget(x, y), K, 0.45));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const ex = Math.min(x - x0, x1 - x), ey = Math.min(y - y0, y1 - y); if (ex + ey < 4) continue;
    const borde = Math.min(ex, ey), v = 2.6 - (x - x0) / (x1 - x0) * 0.6 - (y - y0) / (y1 - y0) * 0.6 + (borde < 3 ? (x - x0 < 3 || y - y0 < 3 ? 1 : -1.2) : 0) + (h(x, y, 2) - 0.5) * 0.5; R.pset(x, y, R.tone(BARRO, v, x, y)); }
  for (let x = x0 + 2; x < x1 - 2; x++) { R.pset(x, y0, K); R.pset(x, y1, K); } for (let y = y0 + 2; y < y1 - 2; y++) { R.pset(x0, y, K); R.pset(x1, y, K); }
  // los renglones y las cuñas ya escritas
  for (let r = 0; r < 9; r++) { const y = y0 + 10 + r * 12; for (let x = x0 + 6; x < x1 - 6; x++) { R.pset(x, y + 4, BARRO[1]); R.pset(x, y + 5, BARRO[4]); } }
  for (let r = 0; r < 6; r++) { const y = y0 + 10 + r * 12; let x = x0 + 8; while (x < x1 - 14) { const n = 1 + Math.floor(h(x, r, 3) * 3); for (let i = 0; i < n; i++) { cunia(x, y + (i % 2), BARRO[0], BARRO[1]); x += 5; } x += 5 + Math.floor(h(x, r, 4) * 6); } }
  R.linea(x1 - 30, y0 + 4, x1 - 22, y0 + 18, BARRO[1]); R.pset(x0 + 30, y1 - 4, BARRO[1]);
  // la lámpara de aceite (arriba a la izquierda)
  R.disco(40, 46, 10, K); R.disco(40, 46, 9, hex('#9a6a40')); R.disco(38, 44, 6, hex('#b88a56')); R.disco(40, 46, 3, hex('#3a2416')); R.poligono([[46, 42], [58, 38], [58, 42], [48, 48]], hex('#9a6a40'));
  // el cesto de dátiles (abajo a la izquierda)
  R.disco(40, 150, 26, K); R.disco(40, 150, 25, hex('#a87a3a')); for (let a2 = 0; a2 < 6.28; a2 += 0.2) for (let r = 6; r < 25; r += 5) R.pset(Math.round(40 + Math.cos(a2) * r), Math.round(150 + Math.sin(a2) * r), hex('#7a5224'));
  for (let k = 0; k < 26; k++) { const x = 40 + Math.round((h(k, 1, 5) - 0.5) * 34), y = 150 + Math.round((h(k, 2, 5) - 0.5) * 30); R.rect(x - 2, y - 1, x + 2, y + 1, K); R.rect(x - 1, y - 1, x + 1, y, hex('#7a2a1a')); R.pset(x - 1, y - 1, hex('#b8582a')); }
  // las tablillas ya hechas, apiladas (abajo a la derecha)
  for (const [x, y] of [[248, 118], [252, 130], [246, 142]]) { R.rect(x, y, x + 56, y + 22, K); R.rect(x + 1, y + 1, x + 55, y + 21, BARRO[2]); R.rect(x + 1, y + 1, x + 55, y + 2, BARRO[4]); for (let k = 0; k < 8; k++) cunia(x + 6 + k * 6, y + 6 + (k % 2) * 6, BARRO[0], BARRO[1]); }
  // el cuenco de agua con los cálamos (a la derecha, bajo la esquina tranquila)
  R.disco(270, 76, 16, K); R.disco(270, 76, 15, hex('#8a5a30')); R.disco(270, 75, 12, hex('#3a6a7a')); R.disco(267, 72, 4, hex('#5a8a9a'));
  for (const [dx, c] of [[-6, '#c8a860'], [0, '#b89850'], [6, '#d8b870']]) R.linea(270 + dx, 76, 286 + dx, 52, hex(c));
  // un higo y un trozo de cuerda
  R.disco(70, 22, 5, K); R.disco(70, 22, 4, hex('#5a2a4a')); R.pset(68, 20, hex('#8a4a7a')); R.linea(240, 170, 262, 164, hex('#c8a870')); R.linea(262, 164, 280, 172, hex('#c8a870'));
});
const p1 = (t) => {
  mesaFija();
  // la llama de la lámpara y su resplandor; las motas
  llama(58, 38, t); for (let k = 0; k < 6; k++) { const x = Math.round(50 + Math.sin(t * 0.8 + k) * 20), y = Math.round(30 + ((t * 4 + k * 9) % 40)); if (Math.sin(t * 3 + k) > 0) R.pset(x, y, hex('#f8e0a0')); }
  // la salamanquesa que cruza la estera por abajo
  const sx = Math.round(330 - ((t * 24) % 420)), sy = 172 + Math.round(Math.sin(t * 6) * 1); if (sx > -20 && sx < 330) { R.rect(sx, sy, sx + 9, sy + 2, hex('#6a7a4a')); R.rect(sx - 4, sy, sx, sy + 1, hex('#6a7a4a')); R.rect(sx + 10, sy + 1, sx + 16, sy + 1, hex('#6a7a4a')); R.pset(sx + 1, sy - 1 + (Math.sin(t * 12) > 0 ? 0 : 4), hex('#6a7a4a')); R.pset(sx + 7, sy + 3 - (Math.sin(t * 12) > 0 ? 0 : 4), hex('#6a7a4a')); R.pset(sx - 3, sy, K); }
  // el «?» de los propósitos, incisa en el barro, que luego se alisa
  const [x0, y0, x1, y1] = TB, borra = tramo(t, CELEB, CELEB + 0.5);
  if (t > PROP - 0.15 && borra < 1) { const b = t < PROP + 0.1 ? 1 : 0; R.icono('?', 147, 108 - b, BARRO[0], BARRO[4], 3); if (borra > 0) for (let y = 104; y < 132; y++) for (let x = 144; x < 172; x++) if (h(x, y, 8) < borra) R.pset(x, y, R.tone(BARRO, 2.2 + (h(x, y, 2) - 0.5) * 0.5, x, y)); }
  // las cuñas nuevas en los dos renglones de abajo, al ritmo del cálamo
  const N = 18, ini = CELEB + 0.6, fin = REGISTRO - 0.7, paso = (fin - ini) / N, hechas = Math.max(0, Math.min(N, Math.floor((t - ini) / paso)));
  const pos = (i) => [x0 + 14 + (i % 9) * 14 + (i % 3 === 2 ? 3 : 0), y0 + 10 + (6 + Math.floor(i / 9)) * 12 + ((i * 7) % 2)];
  for (let i = 0; i < hechas; i++) { const [x, y] = pos(i); cunia(x, y, BARRO[0], BARRO[1]); if (i % 4 === 1) cunia(x + 4, y + 1, BARRO[0], BARRO[1]); }
  // el sello cilíndrico que rueda por el margen de abajo y deja su friso
  const sello = tramo(t, REGISTRO - 0.5, REGISTRO + 0.7), sxx = Math.round(lerp(x0 + 14, x1 - 20, sello));
  if (sello > 0) { for (let x = x0 + 14; x < sxx; x++) { const m = (x - x0) % 12; if (m === 2 || m === 3) R.rect(x, y1 - 14, x, y1 - 7, BARRO[0]); if (m === 6) R.pset(x, y1 - 12, BARRO[0]); if (m > 5 && m < 9) R.pset(x, y1 - 9, BARRO[1]); if (m === 10) { R.pset(x, y1 - 13, BARRO[0]); R.pset(x, y1 - 8, BARRO[0]); } }
    R.rect(sxx - 4, y1 - 16, sxx + 4, y1 - 5, K); R.rect(sxx - 3, y1 - 15, sxx + 3, y1 - 6, hex('#3a5aa0')); R.rect(sxx - 3, y1 - 15 + ((Math.floor(t * 10)) % 3) * 3, sxx + 3, y1 - 14 + ((Math.floor(t * 10)) % 3) * 3, hex('#6a8ad0')); }
  // la mano del escriba con el cálamo (brazo canónico, corto, desde abajo a la derecha)
  let px, py; if (sello > 0) { px = sxx; py = y1 - 18; } else if (t < ini) { px = 172; py = 128; } else { const i = Math.min(N - 1, hechas), [x, y] = pos(i); px = x; py = y - (((t - ini) / paso) % 1 < 0.4 ? 0 : 3); }
  const wx = px + 16, wy = Math.min(166, py + 16); T.brazo(R, wx + 22, 198, wx, wy, '#e8dcc0', -1, { puno: '#c8a040' });
  if (sello <= 0) { R.linea(wx - 6, wy - 3, px, py, K); R.linea(wx - 5, wy - 3, px + 1, py, hex('#c8a860')); }
};

// ── 2 · el patio del templo: la procesión ──
const p2 = (t) => {
  const o = { encuadre: 'babilonia' };
  T.anuevo(R, t, o);
  // la procesión entra por la izquierda: el sacerdote con el incensario, dos con palmas, el rey
  const v = 30, x0 = Math.round(-10 + (t - P2) * v);
  const pal2 = { C: hex('#e8d8b0'), c: hex('#b8a880'), D: hex('#2e6a4a'), G: hex('#2e6a4a') };
  const s = R.actor(EL.sacerdote, x0, 162, t, { dir: 1, anda: true, sostiene: true });
  { const [mx, my] = s.mano; R.linea(mx, my, mx + 2, my + 6, hex('#c8a040')); R.disco(mx + 2, my + 8, 2, hex('#c8a040')); for (let k = 0; k < 4; k++) { const u = ((t * 0.8 + k / 4) % 1); R.pset(Math.round(mx + 2 + Math.sin(u * 6 + k) * 2), Math.round(my + 5 - u * 14), hex('#d8d0c8')); } }
  for (let k = 0; k < 2; k++) { const r = R.actor(EL.sacerdote, x0 - 22 - k * 20, 162, t, { dir: 1, anda: true, sostiene: true, pal: pal2 }); const [mx, my] = r.mano; const bal = Math.round(Math.sin(t * 3 + k) * 2);
    R.linea(mx, my, mx + 2 + bal, my - 16, hex('#4a7a2a')); for (let i = 0; i < 6; i++) { R.linea(mx + 1 + bal, my - 4 - i * 2, mx - 4 + bal, my - 1 - i * 2, hex('#5a9a3a')); R.linea(mx + 1 + bal, my - 4 - i * 2, mx + 6 + bal, my - 1 - i * 2, hex('#6aaa44')); } }
  R.actor(EL.reyBabilonia, x0 - 66, 162, t, { dir: 1, anda: true, sonrisa: true });
  // el tamborilero
  const g = Math.sin(t * 9) > 0, tb = R.actor(EL.sacerdote, 230, 162, t, { dir: -1, sostiene: [226, 146 + (g ? 1 : 0)], pal: { C: hex('#c8603a'), c: hex('#8a3a24'), D: hex('#e8c040'), G: hex('#e8c040') } });
  R.disco(222, 150, 6, K); R.disco(222, 150, 5, hex('#c8a870')); R.anillo(222, 150, 5, hex('#8a5a30')); if (g) { R.pset(212, 146, BL); R.pset(211, 150, BL); R.pset(212, 154, BL); }
  T.anuevoDelante(R, t, o);
  // «4000» en el cielo, con un reloj de arena
  const c = tramo(t, MIL4 - 0.3, MIL4 + 0.2); if (c > 0) { const y = Math.round(lerp(48, 66, c)); R.numero('4000', 150, y, { tam: 16 }); R.icono('reloj', 120, y - 14, hex('#f0c040'), K, 2); if (t < MIL4 + 1) destello(204, y - 16, 3, BL); }
};

// ── 3 · la cella: la corona, la cachetada y el juramento ──
const p3 = (t) => {
  const o = { encuadre: 'babilonia', camara: 'altar', insignias: false };
  T.anuevo(R, t, o);
  const reyX = 112, retro = t > BOFE && t < BOFE + 0.5 ? -3 : 0, kneel = tramo(t, RODILLA - 0.1, RODILLA + 0.3);
  // la uva entra corriendo, ve la mano en alto y se esconde detrás del rey
  const ent = tramo(t, QUITA + 0.5, BOFE - 0.45), esc = tramo(t, BOFE - 0.4, BOFE - 0.1), asoma = tramo(t, BOFE + 0.6, BOFE + 1.0);
  let ux = Math.round(lerp(16, 90, ent) + esc * 26 - asoma * 14), cara = t > BOFE - 0.45 ? 'susto' : 'normal';
  if (t > RODILLA + 0.6) cara = 'normal';
  if (ent > 0) T.uva(R, ux + 6, 162, t, { cara, corre: (ent > 0 && ent < 1) || (esc > 0 && esc < 1) });
  // el rey: con su corona y su cetro hasta que se la quitan
  const sinCorona = t > QUITA + 0.35;
  const rey = arrodillado(EL.reyBabilonia, reyX + retro, 162, t, { dir: 1, corona: !sinCorona, sorpresa: t > BOFE && t < BOFE + 1, sonrisa: t < QUITA, dedo: t > JURA - 0.2 && t < BIEN + 0.6, habla: t > JURA && t < BIEN + 0.4 && Math.sin(t * 8) > 0, sostiene: t < INSIG ? true : undefined }, kneel);
  if (t < INSIG) { const [mx, my] = rey.mano; R.linea(mx, my + 3, mx + 1, my - 12, hex('#a87a18')); R.linea(mx + 1, my + 3, mx + 2, my - 12, hex('#f0c040')); R.disco(mx + 2, my - 13, 2, hex('#f0c040')); }
  if (!sinCorona || kneel > 0) {}
  estrellitas(reyX + 7 + retro, 132 + Math.round(kneel * 7), t, BOFE);
  // el sacerdote: le quita la corona, se la lanza al ayudante, alza la mano y le da la cachetada; luego le toma juramento
  const coge = t > QUITA && t < QUITA + 0.5, alza = t > BOFE - 0.5 && t < BOFE, da = t >= BOFE && t < BOFE + 0.25;
  const sac = R.actor(EL.sacerdote, 130, 162, t, { dir: -1, sostiene: coge ? [124, 133] : da ? [122, 145] : undefined, dedo: alza || (t > JURA && t < BIEN), habla: t > RODILLA && t < JURA && Math.sin(t * 7) > 0, enfado: alza });
  // la corona: en la mano del sacerdote, por el aire hasta el ayudante, y al altar
  const vuela = tramo(t, QUITA + 0.5, INSIG - 0.2), deja = t > INSIG + 0.2;
  const ay = R.actor(EL.sacerdote, 196, 162, t, { dir: vuela >= 1 && !deja ? 1 : -1, sostiene: vuela > 0.85 && !deja ? [210, 140] : undefined, pal: { C: hex('#e8d8b0'), c: hex('#b8a880'), D: hex('#2e6a4a'), G: hex('#2e6a4a') } });
  if (t > QUITA + 0.35 && vuela < 1 && t < INSIG) { const [mx, my] = sac.mano; const x = Math.round(lerp(mx, 204, vuela)), y = Math.round(lerp(my - 1, 136, vuela) - Math.sin(vuela * Math.PI) * 20); T.PIEZAS_TR.corona(R, x, y, {}); for (let k = 1; k < 4; k++) { const w = Math.max(0, vuela - k * 0.08), xx = Math.round(lerp(mx, 204, w)), yy = Math.round(lerp(my - 1, 136, w) - Math.sin(w * Math.PI) * 20) - 5; R.pset(xx, yy, hex('#f8e8a0')); } }
  else if (vuela >= 1 && !deja) { const [mx, my] = ay.mano; T.PIEZAS_TR.corona(R, mx, my - 1, {}); }
  T.anuevoDelante(R, t, o);
  // en el altar: la corona y el cetro
  if (deja) { T.PIEZAS_TR.corona(R, 222, 140, {}); if (t < INSIG + 0.9) destello(228, 128, 2 + (Math.sin(t * 20) > 0 ? 1 : 0), BL); }
  if (t > INSIG) { R.linea(232, 146, 250, 140, hex('#a87a18')); R.linea(232, 145, 250, 139, hex('#f0c040')); R.disco(251, 139, 2, hex('#f0c040')); }
  if (da) for (let k = 0; k < 6; k++) { const an = k * 1.05; R.pset(Math.round(121 + Math.cos(an) * 6), Math.round(145 + Math.sin(an) * 6), hex('#f8f0d0')); }
};

// ── 4 · el patio del muro de los leones: la segunda cachetada y la lágrima ──
const AZ = rampa('#0e1e52', '#1a2e78', '#26409a', '#3456b4', '#4a70cc');
const ORO = rampa('#6a4a10', '#a87a18', '#d8a828', '#f0c840', '#f8e8a0');
const leon = (x, y, d) => {   // un león dorado en relieve (d = 1 mira a la derecha)
  const X = (i) => x + d * i;
  R.poligono([[X(0), y + 4], [X(26), y + 2], [X(32), y + 8], [X(30), y + 16], [X(2), y + 16]].map(([a1, b]) => [a1, b]), ORO[1]);
  R.poligono([[X(1), y + 5], [X(25), y + 3], [X(30), y + 9], [X(28), y + 14], [X(2), y + 14]], ORO[3]);
  for (let i = 4; i < 26; i += 3) R.pset(X(i), y + 6, ORO[4]);
  R.disco(X(31), y + 4, 6, ORO[1]); R.disco(X(31), y + 4, 5, ORO[2]); R.disco(X(34), y + 5, 3, ORO[3]); R.pset(X(35), y + 3, K); R.pset(X(37), y + 7, hex('#c8303a'));
  for (let i = 0; i < 8; i++) R.pset(X(27 + (i % 3)), y - 1 + i * 2, ORO[0]);
  for (const [lx, ad] of [[3, 0], [9, 2], [22, 1], [28, 3]]) { R.rect(Math.min(X(lx), X(lx + 2)), y + 15, Math.max(X(lx), X(lx + 2)), y + 24 - ad, ORO[2]); R.rect(Math.min(X(lx - 1), X(lx + 3)), y + 24 - ad, Math.max(X(lx - 1), X(lx + 3)), y + 25 - ad, ORO[0]); }
  R.linea(X(0), y + 6, X(-6), y - 2, ORO[2]); R.disco(X(-6), y - 3, 2, ORO[0]);
};
const patioFijo = capa(() => {
  const CI = rampa('#3a2a5a', '#6a3a6a', '#a8506a', '#e07a5a', '#f0a868');
  for (let y = 0; y < 34; y++) for (let x = 0; x < 320; x++) R.pset(x, y, R.tone(CI, y / 8 + (h(x >> 2, y >> 1, 1) - 0.5) * 0.4, x, y));
  // el muro de ladrillo vidriado, con sus almenas escalonadas
  for (let y = 26; y < 152; y++) for (let x = 0; x < 320; x++) { const fila = y >> 2, jx = (x + (fila & 1) * 4) % 8, jy = y & 3;
    const v = 2.4 + (h(x >> 3, fila, 2) - 0.5) * 1.2 - (jy === 3 || jx === 7 ? 1.6 : 0) + (jy === 0 && jx < 3 ? 1.2 : 0); R.pset(x, y, R.tone(AZ, v, x, y)); }
  for (let x = 0; x < 320; x += 20) { for (let y = 26; y < 34; y++) for (let i = x + 10; i < x + 20; i++) R.pset(i, y, R.tone(CI, y / 8 + (h(i >> 2, y >> 1, 1) - 0.5) * 0.4, i, y)); R.rect(x + 10, 30, x + 13, 33, AZ[2]); R.rect(x + 9, 26, x + 9, 34, K); R.rect(x + 20, 26, x + 20, 34, K); }
  R.rect(0, 34, 319, 35, K);
  // las cenefas de rosetas
  for (const yb of [40, 140]) { R.rect(0, yb - 4, 319, yb + 4, hex('#e8dcc0')); R.rect(0, yb - 5, 319, yb - 5, K); R.rect(0, yb + 5, 319, yb + 5, K);
    for (let x = 6; x < 320; x += 12) { R.disco(x, yb, 3, hex('#2a4aa0')); for (let k = 0; k < 6; k++) R.pset(Math.round(x + Math.cos(k * 1.05) * 2), Math.round(yb + Math.sin(k * 1.05) * 2), hex('#f8f0d8')); R.pset(x, yb, hex('#f0c040')); } }
  // los leones dorados que caminan hacia la puerta
  leon(10, 64, 1); leon(68, 96, 1); leon(306, 64, -1); leon(250, 96, -1);
  // la puerta con su marco escalonado de oro
  R.rect(126, 54, 194, 135, K); R.rect(127, 55, 193, 135, ORO[2]); R.rect(131, 59, 189, 135, K); R.rect(132, 60, 188, 135, ORO[1]); R.rect(136, 64, 184, 135, K);
  for (let y = 65; y < 136; y++) for (let x = 137; x < 184; x++) R.pset(x, y, ((x + y) & 3) === 0 ? hex('#241a14') : hex('#140e0c'));
  R.disco(160, 74, 6, ORO[3]); for (let k = 0; k < 8; k++) R.linea(160, 74, Math.round(160 + Math.cos(k * 0.785) * 9), Math.round(74 + Math.sin(k * 0.785) * 9), ORO[3]); R.disco(160, 74, 3, ORO[4]);
  // las palmeras en sus tiestos y los braseros
  for (const x of [112, 208]) { R.rect(x - 6, 128, x + 6, 140, K); R.rect(x - 5, 129, x + 5, 140, hex('#a8582a')); R.rect(x - 5, 129, x + 5, 130, hex('#c87a4a'));
    for (let y = 88; y < 129; y++) R.pset(x + Math.round(Math.sin(y * 0.2) * 1), y, (y & 3) ? hex('#7a5a34') : hex('#5a3a24'));
    for (let k = 0; k < 7; k++) { const an = -Math.PI / 2 + (k - 3) * 0.5; for (let r = 2; r < 18; r++) R.pset(Math.round(x + Math.cos(an) * r), Math.round(88 + Math.sin(an) * r * 0.7 + r * r * 0.02), r % 3 ? hex('#3a8a3a') : hex('#2a6a2a')); } }
  for (const x of [24, 296]) { R.rect(x - 8, 120, x + 8, 126, K); R.rect(x - 7, 121, x + 7, 125, hex('#c8a040')); R.rect(x - 1, 126, x + 1, 150, hex('#8a6a20')); R.rect(x - 5, 150, x + 5, 152, hex('#8a6a20')); }
  // el suelo de ladrillo en espiga
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (x + y) % 12, w = (x - y + 400) % 12; const junta = (y < 166 ? u : w) === 0; R.pset(x, y, junta ? hex('#5a3a24') : h(x >> 1, y >> 1, 4) < 0.2 ? hex('#a8704a') : hex('#c08858')); }
});
const p4 = (t) => {
  patioFijo();
  // nubes del amanecer, los banderines y las llamas
  for (let k = 0; k < 3; k++) { const x = ((k * 110 + t * (3 + k * 2)) % 400) - 40, y = 8 + k * 6; for (let i = 0; i < 4; i++) R.disco(Math.round(x + i * 8), y, 3 + (i % 2), [hex('#f0a8a0'), hex('#e88a8a'), hex('#c87090')][(i + k) % 3]); }
  R.recorte([0, 0, 319, 33]); for (let x = 10; x < 320; x += 20) R.rect(x, 26, x + 9, 33, AZ[2]); R.recorte(null);
  for (const x of [50, 270]) { R.linea(x, 26, x, 6, hex('#5a3a24')); const b = Math.round(Math.sin(t * 4 + x) * 2); R.poligono([[x + 1, 7], [x + 12, 9 + b], [x + 1, 13]], hex('#c8303a')); }
  llama(24, 120, t, 1); llama(296, 120, t, 2);
  for (const x of [24, 296]) for (let k = 0; k < 3; k++) { const u = ((t * 0.6 + k / 3) % 1); R.pset(Math.round(x + Math.sin(u * 6 + k) * 3), Math.round(110 - u * 26), hex('#8a7a8a')); }
  // las palomas que alzan el vuelo con la buena señal
  if (t > BUENA) for (let k = 0; k < 4; k++) { const u = t - BUENA, x = Math.round(150 + k * 24 + u * (20 + k * 6)), y = Math.round(52 - u * (22 + k * 4)); const al = Math.sin(t * 16 + k) > 0 ? -1 : 1; if (y > 0) { R.rect(x, y, x + 3, y + 1, BL); R.pset(x - 1, y + al, BL); R.pset(x + 4, y + al, BL); R.pset(x + 3, y - 1, hex('#e8a040')); } }
  // el rey de rodillas ante la puerta, el sacerdote, y la uva detrás del rey
  const retro = t > SEG && t < SEG + 0.5 ? -3 : 0, reyX = 146 + retro;
  const asoma = tramo(t, BUENA + 0.2, BUENA + 0.6); T.uva(R, Math.round(reyX + 8 - asoma * 12), 158, t, { cara: t > BUENA + 0.4 ? 'feliz' : t > SEG - 0.4 ? 'susto' : 'normal' });
  arrodillado(EL.reyBabilonia, reyX, 158, t, { dir: 1, corona: false, sorpresa: t > SEG && t < SEG + 0.9, triste: t > SEG + 0.9 && t < BUENA + 0.4, sonrisa: t > BUENA + 0.6 }, 1);
  estrellitas(reyX + 7, 140, t, SEG);
  // la lágrima: brota del ojo, rueda por la mejilla, cae y brilla
  const l = t - LLORA; if (l > 0 && l < 1.6) { const ex = reyX + 11, ey = 158 + 7 - 25 + 7; const y = l < 0.6 ? ey + Math.round(l * 6) : Math.round(ey + 4 + (l - 0.6) ** 2 * 60); if (y < 158) { R.rect(ex - 1, y - 1, ex + 1, y + 2, hex('#2a4a8a')); R.rect(ex, y, ex, y + 1, hex('#8ad0f8')); R.pset(ex, y - 2, hex('#2a4a8a')); R.pset(ex - 1, y, BL); } if (l < 0.5) destello(ex + 4, ey - 3, 2, hex('#c8f0ff')); }
  if (l > 0.1 && l < 2.2) R.icono('gota', reyX + 18, 112 - Math.round(Math.min(1, l * 3) * 4), hex('#8ad0f8'), K, 2);
  const alza = t > SEG - 0.5 && t < SEG, da = t >= SEG && t < SEG + 0.25;
  R.actor(EL.sacerdote, 166, 158, t, { dir: -1, dedo: alza || t > BUENA - 0.2, sostiene: da ? [158, 142] : undefined, sonrisa: t > LLORA + 0.3, enfado: alza });
  if (da) for (let k = 0; k < 6; k++) { const an = k * 1.05; R.pset(Math.round(157 + Math.cos(an) * 6), Math.round(141 + Math.sin(an) * 6), hex('#f8f0d0')); }
  // el público de delante, que lo celebra
  for (let k = 0; k < 14; k++) { const x = 8 + k * 23, sal = t > BUENA && Math.sin(t * 10 + k * 1.3) > 0 ? 3 : 0, y = 174 - sal + (k % 2) * 2;
    R.disco(x, y, 7, K); R.disco(x, y, 6, [hex('#2a1c14'), hex('#3a2a20'), hex('#1c1424')][k % 3]); R.rect(x - 6, y + 4, x + 6, 180, K); R.rect(x - 5, y + 5, x + 5, 180, [hex('#c8603a'), hex('#e8d8b0'), hex('#3a6a9a'), hex('#8a3a5a')][k % 4]);
    if (k % 3 === 0) { R.rect(x - 6, y - 7, x + 6, y - 4, hex('#e8dcc0')); R.rect(x - 6, y - 7, x + 6, y - 7, K); }
    if (sal) { R.disco(x - 8, y - 8, 2, K); R.disco(x - 8, y - 8, 1, hex('#c88a5a')); } }
};

const efectos = [[PROP, 'pop'], [CELEB + 0.7, 'golpecito'], [ANTIG, 'golpecito'], [REGISTRO, 'sello'],
  [P2 + 0.3, 'publico'], [MIL4, 'brillo'],
  [QUITA + 0.5, 'whoosh'], [BOFE, 'palmada'], [RODILLA + 0.2, 'golpecito'],
  [SEG, 'palmada'], [LLORA, 'brillo'], [BUENA, 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos });
''')
