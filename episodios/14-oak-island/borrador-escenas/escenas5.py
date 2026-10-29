E = {}
E['oi-roosevelt'] = ('Roosevelt', '''// OI-ROOSEVELT (frases 19–21), 1909, cartela «1909». Siete planos:
// 1. el bufete de Nueva York: el joven Roosevelt entra con su cartera, la deja y saluda al socio, que le enseña el papel;
// 2. inserto de la mesa: firma su parte de la compañía de rescate (la viñeta del barco y el cofre); el socio estampa el
//    sello; él señala la isla del grabado («invests… travels to the island»);
// 3. el mapa de papel de Nueva York a Nueva Escocia: la ruta del vapor hasta Oak Island; en «His name is» llega su foto
//    de estudio y se clava junto a Nueva York; asoma la chincheta de Campobello;
// 4. Campobello: el niño sale por la puerta con el libro y baja al césped a leer; la madre en la puerta, el padre vuelve
//    de pescar y saluda;  5. inserto del libro de piratas en las tablas del porche: pasa la hoja y aparece el pozo con el
//    cofre, que brilla en «fascinated»;
// 6. la boca del pozo en 1909: la perforadora de vapor trabaja, sacan el testigo de arcilla («samples»), nada; recogen y
//    se van hacia la lancha;  7. el despacho de los años treinta: Roosevelt, ya mayor, lee el periódico que le traen; el
//    calendario corre de 1910 a 1933 («even after he becomes president»).''', r'''
import { despacho, mesaDespacho } from '/atomo/plato/escenas/ov-comun.js';
const K = T.C.k;
const r = (f) => en('roosevelt', f), c = (f) => en('campobello', f), v = (f) => en('vacio', f);
const P2 = r(0.335), P3 = r(0.665), P4 = c(0), P5 = c(0.558), P6 = v(0), P7 = v(0.452);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const fijo = (() => { const B = new Map(); return (clave, dibuja) => { let b = B.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); B.set(clave, b); } R.copiar(b); }; })();
const TRAJE = '#c8bca0', OSCURO = '#3a3a4a', MARINERO = '#f2eee2';

// ── 1 · el bufete ───────────────────────────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  T.roosevelt(R, t, { encuadre: 'bufete', firma: 0 });
  const u = tramo(t, 1.5, 3.7), x = Math.round(lerp(-16, 82, u)), deja = t > 3.85;
  // el socio de la compañía, junto al sillón: saluda, y en «law clerk» señala el papel de la mesa
  const su = tramo(t, 2.2, 3.6), sx = Math.round(lerp(226, 112, su)), da = t > 3.7 && t < 4.3;
  R.actor(EL.capataz, sx, 170, t, { dir: -1, anda: su > 0 && su < 1, habla: (t > 1.6 && t < 2.2) || (t > r(0.27) && t < P2 - 0.1 && Math.sin(t * 8) > -0.2), dedo: da, sonrisa: t > 3.6 });
  R.actor(EL.fdr, x, 167, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: t > r(0.2), dedo: da, habla: t > 4.4 && t < r(0.27) });
  // el apretón de manos: las dos manos juntas entre los dos
  if (da) { const hx = Math.round((x + 15 + sx) / 2); R.rect(hx - 2, 150, hx + 2, 153, K); R.rect(hx - 1, 151, hx + 1, 152, hex('#f6c290')); }
  // la cartera de cuero: en la mano mientras anda; luego, en el suelo junto a sus pies
  const cx = deja ? x + 16 : x + 12, cy = deja ? 167 : 160 + (u > 0 && u < 1 ? Math.floor(t * 5) % 2 : 0);
  R.rect(cx, cy - 7, cx + 9, cy, K); R.rect(cx + 1, cy - 6, cx + 8, cy - 1, hex('#6a3a1e')); R.rect(cx + 1, cy - 6, cx + 8, cy - 5, hex('#8a5a2e')); R.rect(cx + 3, cy - 9, cx + 6, cy - 8, K); R.pset(cx + 4, cy - 4, T.C.oro);
  // el socio empuja el papel por la mesa hacia él (el documento se desliza en el tablero)
  T.d_rooseveltDelante(R, t, { encuadre: 'bufete' });
};

// ── 2 · inserto: la firma ───────────────────────────────────────────────────────────────────────────────────────────
const mesaFirma = () => {
  const { rect, pset, linea, disco, poligono } = R;
  // la pared de detrás, desenfocada: el papel adamascado verde oliva, la moldura y la librería con lomos
  for (let y = 0; y < 36; y++) for (let x = 0; x < 320; x++) pset(x, y, ((x + y * 3) % 14 < 2 || (x - y * 3 + 400) % 14 < 2) ? hex('#5c6a48') : hh(x >> 1, y >> 1, 3) < 0.12 ? hex('#46523a') : hex('#4e5a3e'));
  for (let x = 176; x < 270; x += 7) { const c = [hex('#8a2a2a'), hex('#2a4a6a'), hex('#5a3a1a'), hex('#2e5a3e')][(x / 7 | 0) % 4]; rect(x, 6, x + 5, 30, c); rect(x, 6, x, 30, mez(c, K, 0.4)); rect(x + 2, 10, x + 3, 11, T.C.oro); rect(x + 2, 25, x + 3, 26, T.C.oro); }
  rect(172, 30, 272, 33, hex('#4a2418')); rect(172, 4, 274, 5, hex('#4a2418'));
  rect(0, 33, 319, 36, hex('#3a1a10'));
  for (let x = 0; x < 26; x++) for (let y = 0; y < 34; y++) pset(x, y, (x % 6) < 2 ? hex('#1e4a2e') : (x % 6) < 4 ? hex('#2e6a3e') : hex('#3a7a4a'));
  rect(26, 0, 27, 33, hex('#c8a040'));
  rect(130, 17, 168, 32, K); rect(131, 18, 167, 31, hex('#c8a040')); rect(133, 20, 165, 29, hex('#f2e8cc')); for (const y of [22, 25]) rect(137, y, 160, y, hex('#a8a08a')); disco(158, 27, 2, hex('#b83a3a'));
  rect(36, 18, 52, 32, K); rect(37, 19, 51, 31, hex('#4a3a2a')); disco(44, 25, 4, hex('#c8b898')); disco(44, 24, 2, hex('#8a7a5a'));
  // el tablero de caoba con vetas
  for (let y = 36; y < 180; y++) for (let x = 0; x < 320; x++) { const n = Math.sin(x * 0.05 + Math.sin(y * 0.11 + x * 0.004) * 3 + y * 0.6) + hh(x >> 3, y, 7) * 0.6;
    pset(x, y, n > 1.15 ? hex('#8a4a2e') : n > 0.55 ? hex('#74381f') : n < -1.1 ? hex('#4e2014') : hex('#642c1a')); }
  rect(0, 36, 319, 37, hex('#9a5a3a'));
  // la luz de la ventana, en diagonal
  for (let y = 36; y < 180; y++) for (let x = 0; x < 320; x++) { const d = x + y * 0.8; if (d > 40 && d < 120 && (x + y) % 2 === 0) pset(x, y, mez(R.pget(x, y), hex('#f8e0b0'), 0.18)); }
  // el cartapacio de piel verde con filete dorado y cantoneras
  rect(56, 50, 264, 178, K); rect(57, 51, 263, 177, hex('#2e5a3e'));
  for (let y = 52; y < 177; y++) for (let x = 58; x < 263; x++) if (hh(x, y, 9) < 0.08) pset(x, y, hex('#3a6a4a')); else if (hh(x, y, 11) < 0.05) pset(x, y, hex('#244a32'));
  rect(61, 55, 259, 55, T.C.oro); rect(61, 173, 259, 173, T.C.oro); rect(61, 55, 61, 173, T.C.oro); rect(259, 55, 259, 173, T.C.oro);
  for (const [x, y, sx, sy] of [[57, 51, 1, 1], [263, 51, -1, 1], [57, 177, 1, -1], [263, 177, -1, -1]]) poligono([[x, y], [x + sx * 16, y], [x, y + sy * 16]], hex('#5a2a1a'));
  // el certificado de la compañía: papel crema, orla verde, la viñeta del barco, la isla y el cofre
  rect(98, 62, 226, 170, hex('#3a2a1a')); rect(94, 58, 222, 166, K); rect(95, 59, 221, 165, hex('#f2e8cc'));
  for (let y = 60; y < 165; y++) for (let x = 96; x < 221; x++) if (hh(x, y, 13) < 0.05) pset(x, y, hex('#e4d8b8'));
  for (const i of [4, 6]) { rect(95 + i, 59 + i, 221 - i, 59 + i, hex('#3a6a5a')); rect(95 + i, 165 - i, 221 - i, 165 - i, hex('#3a6a5a')); rect(95 + i, 59 + i, 95 + i, 165 - i, hex('#3a6a5a')); rect(221 - i, 59 + i, 221 - i, 165 - i, hex('#3a6a5a')); }
  for (let x = 103; x < 214; x++) { pset(x, 68 + Math.round(Math.sin(x * 0.5) * 1.5), hex('#5a8a7a')); pset(x, 160 + Math.round(Math.sin(x * 0.5 + 1) * 1.5), hex('#5a8a7a')); }
  for (const [x, y] of [[104, 68], [212, 68], [104, 156], [212, 156]]) { disco(x, y, 5, hex('#3a6a5a')); disco(x, y, 3, hex('#f2e8cc')); disco(x, y, 1, hex('#c8a040')); }
  // la viñeta ovalada
  for (let y = -16; y <= 16; y++) for (let x = -34; x <= 34; x++) { const q = (x / 34) ** 2 + (y / 16) ** 2; if (q <= 1) { const yy = 94 + y, xx = 158 + x;
    pset(xx, yy, q > 0.86 ? hex('#3a6a5a') : yy < 96 ? (hh(xx, yy, 2) < 0.5 ? hex('#e8e0c8') : hex('#d8d4c0')) : ((xx + yy) % 3 ? hex('#8ab0b8') : hex('#6a90a0'))); } }
  poligono([[150, 96], [158, 86], [168, 84], [182, 96]], hex('#6a8a4a')); disco(166, 84, 5, hex('#4e6a3a')); disco(163, 82, 3, hex('#6a8a4a')); rect(165, 86, 166, 92, hex('#5a3a1a'));
  disco(170, 94, 2, K); linea(170, 96, 170, 104, hex('#3a3a3a')); for (let y = 97; y < 104; y += 2) pset(170, y, hex('#f2e8cc'));
  rect(166, 104, 175, 108, K); rect(167, 105, 174, 107, hex('#c8a040')); pset(170, 104, hex('#f8e888'));
  // el barco de vela a la izquierda de la viñeta
  rect(130, 96, 146, 98, hex('#4a2a1a')); poligono([[129, 95], [147, 95], [144, 99], [132, 99]], hex('#5a3a24')); linea(138, 80, 138, 95, K);
  poligono([[139, 81], [146, 92], [139, 92]], hex('#f8f4e8')); poligono([[137, 83], [131, 93], [137, 93]], hex('#f8f4e8')); pset(138, 79, hex('#c83a2a'));
  // las cifras: 100 acciones y el año; renglones en barras y la raya de la firma
  R.numero('100', 112, 86, { color: hex('#3a6a5a'), sombra: false }); R.numero('1909', 190, 86, { color: hex('#3a6a5a'), sombra: false });
  for (const [y, x1] of [[116, 208], [122, 200], [128, 206], [134, 186]]) rect(110, y, x1, y + 1, hex('#8a8270'));
  rect(150, 151, 210, 151, hex('#3a3a3a'));
  // la escribanía de latón con dos tinteros y el portaplumas
  rect(18, 64, 78, 98, K); rect(19, 65, 77, 97, hex('#a8802c')); rect(19, 65, 77, 66, hex('#e8c060')); rect(21, 95, 77, 97, hex('#7a5a1c'));
  for (const x of [30, 64]) { rect(x - 8, 72, x + 8, 92, K); rect(x - 7, 73, x + 7, 91, hex('#b8d0d8')); rect(x - 6, 80, x + 6, 90, hex('#1a2a5a')); rect(x - 6, 74, x - 5, 89, T.C.blanco);
    rect(x - 5, 66, x + 5, 72, K); disco(x, 66, 5, K); disco(x, 66, 4, hex('#c8a040')); rect(x - 4, 67, x + 4, 71, hex('#c8a040')); pset(x - 2, 64, hex('#f8e888')); }
  linea(40, 96, 56, 58, K); linea(41, 96, 57, 58, hex('#2a2a3a')); linea(42, 96, 58, 58, K); pset(56, 58, hex('#c8a040')); pset(57, 59, hex('#c8a040'));
  // el rollo de la carta náutica
  rect(4, 128, 46, 152, K); rect(5, 129, 45, 151, hex('#e8dcc0')); rect(5, 145, 45, 151, hex('#c8b898')); for (let x = 7; x < 45; x += 3) pset(x, 131 + (x % 2), hex('#c8b898'));
  disco(45, 140, 11, K); disco(45, 140, 10, hex('#e8dcc0')); for (let k = 9; k > 1; k -= 2) for (let a = 0; a < 6.3; a += 0.2) pset(Math.round(45 + Math.cos(a) * k), Math.round(140 + Math.sin(a) * k), hex('#c8b898'));
  rect(20, 128, 22, 152, hex('#a83a2a'));
  // las monedas de oro en tres pilas
  for (const [x, n] of [[270, 6], [284, 9], [298, 4]]) for (let k = 0; k < n; k++) { const y = 160 - k * 3; rect(x - 6, y - 2, x + 6, y + 1, K); rect(x - 5, y - 1, x + 5, y, hex('#d8a830')); pset(x - 4, y - 1, hex('#f8e070')); }
  // la sombra del certificado sobre el cartapacio
};
const p2 = (t) => {
  fijo('mesaFirma', mesaFirma);
  const { rect, pset, linea, disco } = R;
  // motas de polvo en la luz
  for (let k = 0; k < 14; k++) { const x = Math.round(30 + ((k * 37 + t * (4 + k % 3)) % 110)), y = Math.round(40 + ((k * 53 + t * 3) % 120)); if (x + y * 0.8 > 44 && x + y * 0.8 < 118 && Math.sin(t * 3 + k) > -0.3) pset(x, y, hex('#fff4d0')); }
  // el reloj de bolsillo con su cadena y el segundero
  disco(290, 100, 12, K); disco(290, 100, 11, hex('#c8a040')); disco(290, 100, 9, hex('#f8f4e8')); for (let k = 0; k < 12; k++) pset(Math.round(290 + Math.cos(k * 0.52) * 7), Math.round(100 + Math.sin(k * 0.52) * 7), K);
  const sg = Math.floor(t) * Math.PI / 30 - Math.PI / 2; linea(290, 100, Math.round(290 + Math.cos(sg) * 7), Math.round(100 + Math.sin(sg) * 7), hex('#a83a2a')); linea(290, 100, 290, 95, K); linea(290, 100, 294, 100, K); rect(288, 87, 292, 89, hex('#c8a040'));
  for (let k = 0; k < 22; k++) pset(Math.round(268 + k), Math.round(88 - Math.sin(k / 22 * Math.PI) * 10 + 14), k % 2 ? hex('#e8c060') : hex('#a8802c'));
  // la firma: la rúbrica azul que se va escribiendo
  const fi = tramo(t, P2 + 0.15, r(0.48));
  const pf = (u) => [150 + u * 58, 146 - Math.sin(u * 26) * 3 * (1 - u * 0.5) - Math.sin(u * 7) * 2];
  for (let u = 0; u < fi; u += 0.004) { const [x, y] = pf(u); pset(Math.round(x), Math.round(y), hex('#2a3a8a')); }
  // el sello del socio: baja, golpea y deja su marca
  const SG = r(0.52), sb = tramo(t, SG - 0.35, SG), ss = tramo(t, SG + 0.25, SG + 0.7), sx = 124, sy = Math.round(lerp(128, 142, sb) - lerp(0, 14, ss));
  if (t > SG) { for (let a = 0; a < 6.3; a += 0.12) { pset(Math.round(sx + Math.cos(a) * 9), Math.round(150 + Math.sin(a) * 9), hex('#b83a3a')); pset(Math.round(sx + Math.cos(a) * 7), Math.round(150 + Math.sin(a) * 7), hex('#b83a3a')); } R.icono('X', sx - 2, 148, hex('#b83a3a'), hex('#f2e8cc')); }
  if (t > SG - 0.7 && t < SG + 1.2) {
    const ax = Math.round(lerp(-60, 0, tramo(t, SG - 0.7, SG - 0.35)) - lerp(0, 60, tramo(t, SG + 0.7, SG + 1.2)));
    const zx = sx + ax; rect(zx - 8, sy + 2, zx + 8, sy + 8, K); rect(zx - 7, sy + 3, zx + 7, sy + 7, hex('#3a2a1a')); rect(zx - 7, sy + 7, zx + 7, sy + 8, hex('#8a2a2a'));
    rect(zx - 2, sy - 8, zx + 2, sy + 2, K); rect(zx - 1, sy - 7, zx + 1, sy + 2, hex('#8a5a2e')); disco(zx, sy - 10, 4, K); disco(zx, sy - 10, 3, hex('#a86a3a')); pset(zx - 1, sy - 12, hex('#d8a070'));
    T.brazo(R, zx - 34, 196, zx - 6, sy - 6, OSCURO, 1, { codo: [zx - 30, sy + 22] });
  }
  // la mano de Roosevelt con la pluma: firma, se aparta y en «island» señala la isla del grabado
  const fin = r(0.49), apunta = tramo(t, r(0.6), r(0.63));
  let tx, ty;
  if (t < P2 + 0.15) { const u = tramo(t, P2, P2 + 0.15); tx = lerp(230, 150, u); ty = lerp(176, 146, u); }
  else if (t < fin) { [tx, ty] = pf(fi); }
  else { const u = tramo(t, fin, fin + 0.4); tx = lerp(208, 228, u); ty = lerp(146, 158, u); tx = lerp(tx, 214, apunta); ty = lerp(ty, 150, apunta); }
  tx = Math.round(tx); ty = Math.round(ty);
  const wx = tx + 13, wy = ty - 3;
  linea(tx, ty, tx + 14, ty - 12, K); linea(tx + 1, ty, tx + 15, ty - 12, hex('#2a2a3a')); pset(tx, ty, hex('#c8a040')); pset(tx + 1, ty - 1, hex('#c8a040'));
  T.brazo(R, wx + 30, 198, wx, wy, TRAJE, -1, { codo: [wx + 24, Math.round((wy + 198) / 2)] });
  // el vapor de la taza (fuera de cuadro, abajo a la izquierda) y una hoja que sube con la corriente
  for (let k = 0; k < 6; k++) { const u = ((t * 0.5 + k / 6) % 1); pset(Math.round(300 + Math.sin(u * 8 + k) * 2), Math.round(176 - u * 30), mez(hex('#e8e0d0'), hex('#642c1a'), u)); }
};

// ── 3 · el mapa: de Nueva York a Oak Island, y la foto ───────────────────────────────────────────────────────────────
const p3 = (t) => {
  const P = T.mapa(R, t, { zoom: 2.4, centro: [-70, 42.5] });
  const q = (ll) => P(ll).map(Math.round);
  const ny = q(T.LUGARES.nuevaYork), oak = q(T.LUGARES.oakIsland), cb = q(T.LUGARES.campobello);
  const pts = [ny, q([-71.8, 40.4]), q([-69.4, 41.2]), q([-66.6, 42.9]), oak];
  const ru = tramo(t, P3 + 0.25, r(0.79));
  R.recorte([22, 16, 298, 168]);
  if (ru > 0) {
    R.ruta(pts, ru, hex('#2a3458'), { grueso: 1, flecha: false });
    // el vapor que avanza por la ruta, con su humo
    const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    let d = ru * L[L.length - 1], i = 1; while (i < pts.length - 1 && d > L[i]) i++; const f = (d - L[i - 1]) / (L[i] - L[i - 1] || 1);
    const lx = Math.round(lerp(pts[i - 1][0], pts[i][0], f)), ly = Math.round(lerp(pts[i - 1][1], pts[i][1], f));
    if (ru < 1) { R.poligono([[lx - 6, ly - 2], [lx + 6, ly - 2], [lx + 4, ly + 1], [lx - 5, ly + 1]], K); R.poligono([[lx - 5, ly - 1], [lx + 5, ly - 1], [lx + 3, ly], [lx - 4, ly]], hex('#3a3a46'));
      R.linea(lx - 2, ly - 4, lx + 2, ly - 4, T.C.blanco); R.linea(lx, ly - 7, lx, ly - 4, hex('#a83a2a'));
      for (let k = 0; k < 4; k++) { const u = (t * 1.6 + k / 4) % 1; R.pset(lx - Math.round(u * 8), ly - 8 - Math.round(u * 4), u < 0.5 ? hex('#e8e4dc') : hex('#a8a4a0')); } }
  }
  R.recorte(null);
  T.chincheta(R, ny[0], ny[1], t, hex('#3a6ac8'), { baja: tramo(t, P3 + 0.05, P3 + 0.3) });
  T.chincheta(R, oak[0], oak[1], t, hex('#c83a2a'), { baja: tramo(t, r(0.77), r(0.8)), pulso: t < r(0.95) });
  T.chincheta(R, cb[0], cb[1], t, hex('#3a8a4a'), { baja: tramo(t, c(0) - 0.7, c(0) - 0.45) });
  // la foto de estudio de 1909 que llega y se clava junto a Nueva York (en el mar, abajo a la derecha de la ciudad)
  const fl = tramo(t, r(0.81), r(0.86)), fxe = ny[0] + 14, fye = ny[1] + 4;
  if (fl > 0) {
    const e = 1 - (1 - fl) ** 3, fx = Math.round(lerp(fxe + 40, fxe, e)), fy = Math.round(lerp(196, fye, e));
    R.rect(fx + 2, fy + 2, fx + 33, fy + 41, hex('#3a3a3a'));
    R.rect(fx - 1, fy - 1, fx + 31, fy + 39, K); R.rect(fx, fy, fx + 30, fy + 38, hex('#f4eedc'));
    R.rect(fx + 3, fy + 3, fx + 27, fy + 31, hex('#5a4630')); R.rect(fx + 4, fy + 4, fx + 26, fy + 30, hex('#b8a07a'));
    for (let y = fy + 4; y <= fy + 30; y++) for (let x = fx + 4; x <= fx + 26; x++) if ((x + y) % 4 === 0) R.pset(x, y, hex('#a88e68'));
    R.rect(fx + 4, fy + 22, fx + 26, fy + 30, hex('#8a7050'));
    R.recorte([fx + 4, fy + 4, fx + 26, fy + 30]);
    R.actor(EL.fdr, fx + 8, fy + 34, t, { dir: 1, sonrisa: true, quieto: true });
    R.recorte(null);
    R.rect(fx + 8, fy + 33, fx + 22, fy + 34, hex('#c8bca0'));
    if (fl >= 1) T.chincheta(R, fx + 15, fy + 2, t, hex('#c8a040'), { baja: tramo(t, r(0.87), r(0.9)) });
    const b = tramo(t, r(0.93), r(0.98)); if (b > 0 && b < 1) { const bx = Math.round(fx - 4 + b * 40); for (let y = fy; y <= fy + 38; y++) { const x = bx - Math.round((y - fy) * 0.4); if (x >= fx && x <= fx + 30) { R.pset(x, y, T.C.blanco); if (x + 1 <= fx + 30) R.pset(x + 1, y, mez(R.pget(x + 1, y), T.C.blanco, 0.5)); } } }
  }
};

// ── 4 · Campobello ──────────────────────────────────────────────────────────────────────────────────────────────────
const p4 = (t) => {
  T.roosevelt(R, t, { encuadre: 'campobello' });
  const abre = t > P4 + 0.2 && t < P4 + 1.6;
  if (abre) { R.rect(212, 103, 226, 123, hex('#2a1e18')); R.rect(213, 104, 225, 110, hex('#3a2a20')); }
  // la madre sale a la puerta tras el niño y le despide con la mano
  const m = t > P4 + 1.2; if (m) { R.rect(212, 103, 226, 123, hex('#2a1e18')); R.actor(EL.vecina, 212, 127, t, { dir: 1, dedo: t > c(0.14) && t < c(0.3), sonrisa: true, habla: t > c(0.06) && t < c(0.12) }); }
  // el niño: sale por la puerta, baja la escalera y se planta en el césped con el libro
  const a1 = tramo(t, P4 + 0.3, P4 + 1.2), a2 = tramo(t, P4 + 1.2, P4 + 2.0), a3 = tramo(t, P4 + 2.0, P4 + 2.8);
  let nx = 212, ny = 127, anda = false, dir = 1;
  if (t < P4 + 0.3) nx = -99;
  else if (a1 < 1) { nx = 212; ny = 127; anda = true; }
  else if (a2 < 1) { nx = Math.round(lerp(212, 208, a2)); ny = Math.round(lerp(127, 140, a2)); anda = true; }
  else { nx = Math.round(lerp(208, 176, a3)); ny = Math.round(lerp(140, 158, a3)); anda = a3 < 1; dir = a3 < 1 ? -1 : 1; }
  if (nx > -50) {
    const lee = a3 >= 1, pasa = t > c(0.4) && t < c(0.46);
    R.actor(EL.fdrNino, nx, ny, t, { dir, anda, sonrisa: lee && t > c(0.3), sorpresa: pasa });
    // el libro rojo: bajo el brazo al andar; abierto en las manos cuando lee
    if (!lee) { R.rect(nx + (dir > 0 ? 9 : -1), ny - 12, nx + (dir > 0 ? 15 : 5), ny - 6, K); R.rect(nx + (dir > 0 ? 10 : 0), ny - 11, nx + (dir > 0 ? 14 : 4), ny - 7, hex('#a82a2a')); }
    else { const bx = nx + 10, by = ny - 13; R.rect(bx, by, bx + 12, by + 7, K); R.rect(bx + 1, by + 1, bx + 5, by + 6, pasa && Math.floor(t * 12) % 2 ? hex('#e8e0c8') : T.C.blanco); R.rect(bx + 7, by + 1, bx + 11, by + 6, T.C.blanco); R.pset(bx + 6, by + 1, K); R.rect(bx + 2, by + 3, bx + 4, by + 3, hex('#9a9a9a')); R.rect(bx + 8, by + 3, bx + 10, by + 3, hex('#9a9a9a')); R.rect(bx, by + 7, bx + 12, by + 7, hex('#a82a2a')); }
  }
  // el padre vuelve de pescar por el camino: caña al hombro y el pez colgando; saluda en «Canada»
  const pu = tramo(t, P4 + 0.4, c(0.4)), px = Math.round(lerp(-18, 96, pu));
  R.actor(EL.vecino, px, 168, t, { dir: 1, anda: pu > 0 && pu < 1, dedo: t > c(0.44) && t < c(0.54), sonrisa: t > c(0.4) });
  R.linea(px + 4, 150, px - 14, 128, hex('#6a4a2a')); R.linea(px - 14, 128, px - 16, 140 + Math.round(Math.sin(t * 3)), hex('#d8d8d8'));
  const pz = px - 16, pyz = 141 + Math.round(Math.sin(t * 3)); R.rect(pz - 2, pyz, pz + 2, pyz + 7, K); R.rect(pz - 1, pyz + 1, pz + 1, pyz + 6, hex('#9ab0c0')); R.pset(pz, pyz + 2, hex('#e8f0f8'));
  T.d_rooseveltDelante(R, t, { encuadre: 'campobello' });
};

// ── 5 · inserto: el libro de piratas en el porche ───────────────────────────────────────────────────────────────────
const tablasPorche = () => {
  const { rect, pset, linea, disco, poligono } = R;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 15), jy = y % 15, off = (fila * 53) % 90, jx = (x + off) % 90;
    let c = hh(x >> 2, y, fila) < 0.1 ? hex('#c8c0b0') : (x * 3 + fila * 7 + Math.floor(Math.sin(x * 0.07 + fila) * 3)) % 17 === 0 ? hex('#c0b8a6') : hex('#d8d0c0');
    if (jy === 0) c = hex('#6a6458'); else if (jy === 1) c = hex('#a8a090'); else if (jy === 14) c = hex('#ece6d8');
    if (jx === 0 && jy > 0) c = hex('#8a8476');
    if ((jx === 4 || jx === 86) && (jy === 4 || jy === 10)) c = hex('#5a5448');
    pset(x, y, c); }
  // la sombra de la barandilla sobre las tablas (los balaustres, en diagonal)
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const s = (x + y * 0.55) % 26; if (s < 9 && (x + y) % 2 === 0) pset(x, y, mez(R.pget(x, y), hex('#5a6a8a'), 0.32)); }
  // el catalejo de latón, un barquito de juguete, un vaso de limonada y conchas
  poligono([[8, 166], [64, 150], [66, 157], [10, 173]], K); poligono([[9, 166], [63, 151], [64, 155], [10, 171]], hex('#c8a040')); linea(10, 167, 62, 152, hex('#f0d878')); rect(36, 158, 39, 164, hex('#6a4a2a'));
  disco(10, 170, 4, K); disco(10, 170, 3, hex('#8ab0d0'));
  rect(14, 38, 40, 74, K); rect(15, 39, 39, 73, hex('#f0e68a')); rect(15, 39, 39, 46, hex('#f8f4c8')); rect(17, 50, 22, 56, hex('#f8f8f0')); rect(28, 58, 33, 63, hex('#f8f8f0')); linea(34, 30, 30, 60, hex('#c83a3a')); linea(35, 30, 31, 60, T.C.blanco); rect(15, 72, 39, 73, hex('#c8be6a'));
  poligono([[16, 76], [40, 76], [44, 80], [12, 80]], hex('#8a8a7a'));
  for (const [x, y] of [[286, 128], [300, 150], [272, 160]]) { disco(x, y, 5, K); disco(x, y, 4, hex('#f0c8b8')); linea(x - 3, y - 2, x + 3, y + 2, hex('#d8a090')); linea(x - 3, y + 1, x + 2, y - 3, hex('#d8a090')); }
  // el barquito de madera con su vela
  poligono([[264, 104], [312, 104], [304, 116], [272, 116]], K); poligono([[266, 105], [310, 105], [303, 114], [273, 114]], hex('#2a4a8a')); rect(268, 105, 308, 106, T.C.blanco);
  linea(288, 60, 288, 104, K); poligono([[289, 62], [306, 100], [289, 100]], T.C.blanco); poligono([[287, 66], [272, 100], [287, 100]], hex('#f0ece0')); pset(288, 58, hex('#c83a2a')); pset(289, 58, hex('#c83a2a'));
  // el libro abierto: tapas rojas, el grosor de las hojas y las dos páginas con el canal
  rect(58, 40, 262, 170, K); rect(59, 41, 261, 169, hex('#8a2a2a')); rect(59, 41, 261, 42, hex('#a83a3a'));
  rect(62, 44, 258, 166, hex('#e8dcc0')); for (let k = 0; k < 4; k++) { rect(62 + k, 44 + k, 62 + k, 166 - k, hex('#c8bca0')); rect(258 - k, 44 + k, 258 - k, 166 - k, hex('#c8bca0')); }
  rect(66, 46, 158, 164, hex('#f6eedc')); rect(162, 46, 254, 164, hex('#f6eedc'));
  for (let x = 150; x < 170; x++) for (let y = 46; y < 164; y++) { const d = Math.abs(x - 160); if (d < 10) pset(x, y, mez(R.pget(x, y), hex('#a8987a'), (10 - d) / 18)); }
  rect(159, 44, 161, 166, hex('#8a7a5a'));
  // página izquierda: la isla de robles con el pozo y la línea de puntos; renglones en barras
  for (let y = 52; y < 104; y++) for (let x = 72; x < 152; x++) pset(x, y, y > 86 ? ((x + y) % 4 ? hex('#a8c4c8') : hex('#88a8b0')) : hex('#efe6d0'));
  poligono([[78, 92], [96, 76], [128, 72], [148, 92]], hex('#b8a070')); poligono([[84, 90], [98, 80], [124, 78], [142, 90]], hex('#8aa05a'));
  for (const [x, y] of [[100, 72], [112, 68], [124, 72], [136, 78]]) { disco(x, y, 6, hex('#4e6a3a')); disco(x - 1, y - 2, 4, hex('#6a8a4a')); rect(x, y + 4, x + 1, y + 9, hex('#5a3a1a')); }
  rect(72, 52, 151, 52, K); rect(72, 103, 151, 103, K); rect(72, 52, 72, 103, K); rect(151, 52, 151, 103, K);
  for (const [y, x1] of [[110, 150], [116, 144], [122, 150], [128, 136], [134, 150], [140, 148], [146, 130], [152, 146]]) rect(74, y, x1, y + 1, hex('#9a927e'));
  R.numero('12', 108, 162, { color: hex('#8a826e'), sombra: false });
};
const paginaBarco = (x0) => {
  const { rect, pset, linea, poligono } = R;
  rect(x0 + 6, 52, x0 + 86, 110, hex('#efe6d0'));
  for (let y = 92; y < 110; y++) for (let x = x0 + 6; x < x0 + 86; x++) if ((x + y * 2) % 7 < 2) pset(x, y, hex('#88a8b0'));
  poligono([[x0 + 20, 90], [x0 + 72, 90], [x0 + 64, 100], [x0 + 26, 100]], hex('#5a3a24')); rect(x0 + 24, 92, x0 + 68, 93, hex('#c8a040'));
  linea(x0 + 46, 56, x0 + 46, 90, K); linea(x0 + 32, 62, x0 + 32, 90, K);
  poligono([[x0 + 47, 58], [x0 + 62, 88], [x0 + 47, 88]], hex('#f8f4e8')); poligono([[x0 + 33, 64], [x0 + 44, 88], [x0 + 33, 88]], hex('#f8f4e8'));
  rect(x0 + 47, 54, x0 + 54, 58, K); linea(x0 + 49, 55, x0 + 52, 57, T.C.blanco); linea(x0 + 49, 57, x0 + 52, 55, T.C.blanco);
  rect(x0 + 6, 52, x0 + 86, 52, K); rect(x0 + 6, 110, x0 + 86, 110, K); rect(x0 + 6, 52, x0 + 6, 110, K); rect(x0 + 86, 52, x0 + 86, 110, K);
  for (const [y, x1] of [[118, 82], [124, 76], [130, 84], [136, 70], [142, 84], [148, 78]]) rect(x0 + 8, y, x0 + x1, y + 1, hex('#9a927e'));
};
const paginaPozo = (x0, t, br) => {
  const { rect, pset, linea, disco } = R;
  // el pozo en corte: capas de tierra, las plataformas cada diez pies y el cofre al fondo con su «X»
  for (let y = 52; y < 140; y++) for (let x = x0 + 6; x < x0 + 86; x++) { const b = Math.floor((y - 58) / 12); pset(x, y, y < 58 ? hex('#efe6d0') : [hex('#c8b088'), hex('#b89870'), hex('#a8885e'), hex('#c0a07a'), hex('#9a7a52'), hex('#b09068'), hex('#8a6a48')][Math.max(0, b) % 7]); }
  for (let y = 58; y < 136; y++) { pset(x0 + 40, y, K); pset(x0 + 52, y, K); for (let x = x0 + 41; x < x0 + 52; x++) pset(x, y, hex('#4a3a2a')); }
  for (let y = 66; y < 132; y += 12) linea(x0 + 41, y, x0 + 51, y, hex('#7a5a30'));
  for (let y = 60; y < 128; y += 4) pset(x0 + 46, y, hex('#f6eedc'));
  const cy = 130; rect(x0 + 40, cy - 6, x0 + 52, cy + 2, K); rect(x0 + 41, cy - 5, x0 + 51, cy + 1, hex('#8a5a2a')); rect(x0 + 41, cy - 3, x0 + 51, cy - 3, hex('#c8a040')); pset(x0 + 46, cy - 2, hex('#f8e070'));
  if (br > 0) for (let k = 0; k < 8; k++) { const a = k * 0.785 + t * 2, l = 4 + br * 12 * (0.6 + 0.4 * Math.sin(t * 9 + k)); linea(x0 + 46, cy - 2, Math.round(x0 + 46 + Math.cos(a) * l), Math.round(cy - 2 + Math.sin(a) * l), hex('#f8e070')); }
  R.icono('X', x0 + 56, cy - 6, hex('#c83a2a'), hex('#f6eedc'));
  disco(x0 + 24, 58, 5, hex('#4e6a3a')); rect(x0 + 24, 60, x0 + 25, 58, hex('#5a3a1a'));
  rect(x0 + 6, 52, x0 + 86, 52, K); rect(x0 + 6, 140, x0 + 86, 140, K); rect(x0 + 6, 52, x0 + 6, 140, K); rect(x0 + 86, 52, x0 + 86, 140, K);
  for (const [y, x1] of [[146, 82], [152, 70], [158, 80]]) rect(x0 + 8, y, x0 + x1, y + 1, hex('#9a927e'));
  R.numero('13', x0 + 66, 163, { color: hex('#8a826e'), sombra: false });
};
const p5 = (t) => {
  fijo('libro', tablasPorche);
  const { rect, pset, linea, poligono } = R;
  const pasa = tramo(t, c(0.583), c(0.66)), BR = c(0.747), br = t > BR ? Math.min(1, (t - BR) * 2) : 0;
  // la página de la derecha: el barco; en «story goes» la hoja gira sobre el canal y debajo aparece el pozo
  if (pasa <= 0) paginaBarco(160); else paginaPozo(160, t, br);
  if (pasa > 0 && pasa < 1) {
    const w = Math.round(Math.cos(pasa * Math.PI) * 96), lev = Math.round(Math.sin(pasa * Math.PI) * 12), x1 = 160 + w;
    if (w > 0) { poligono([[160, 46], [x1, 46 - lev], [x1, 164 - lev], [160, 164]], hex('#f6eedc')); R.recorte([160, 30, x1, 170]); paginaBarco(160 - Math.round((96 - w) * 0.5)); R.recorte(null);
      for (let y = 46 - lev; y < 165; y++) for (let x = Math.max(160, x1 - 6); x <= x1; x++) pset(x, y, mez(R.pget(x, y), hex('#a8987a'), 0.35)); }
    else poligono([[160, 46], [x1, 46 - lev], [x1, 164 - lev], [160, 164]], hex('#e4d8bc'));
    if (w < 0) for (let y = 60; y < 150; y += 6) linea(160, y, x1 + 4, y - lev, hex('#cfc4a8'));
    linea(x1, 46 - lev, x1, 164 - lev, hex('#8a7a5a')); linea(160, 46, x1, 46 - lev, hex('#a8987a')); linea(160, 164, x1, 164 - lev, hex('#a8987a'));
  }
  // el «?» de la curiosidad que sale del pozo del dibujo
  const pq = tramo(t, BR + 0.3, BR + 0.8); if (pq > 0) R.icono('?', 226, Math.round(lerp(96, 72, pq)), hex('#2a3458'), hex('#f6eedc'), 2);
  // una mariquita que cruza la página de la izquierda
  { const u = (t * 0.06) % 1, mx = Math.round(70 + u * 80), my = Math.round(150 - Math.sin(u * 6) * 4); rect(mx - 1, my - 1, mx + 1, my + 1, hex('#c8282a')); pset(mx, my, K); pset(mx + 2, my, K); }
  // las manos del niño: la izquierda sujeta la página; la derecha pasa la hoja y luego sigue con el dedo la línea de puntos
  const lev = Math.sin(Math.min(1, pasa * 1.6) * Math.PI), hx = Math.round(250 - lev * 22), hy = Math.round(160 - lev * 16);
  T.brazo(R, 92, 198, 72, 160, MARINERO, 1, { codo: [88, 180] });
  T.brazo(R, hx + 22, 198, hx, hy, MARINERO, -1, { codo: [hx + 20, Math.round((hy + 198) / 2)] });
  // el sol que pasa entre las hojas del arce: manchas que tiemblan
  for (let k = 0; k < 5; k++) { const x0 = Math.round(20 + k * 64 + Math.sin(t * 0.8 + k) * 6), y0 = Math.round(20 + (k % 2) * 120 + Math.cos(t * 0.6 + k) * 4);
    for (let y = -6; y <= 6; y++) for (let x = -9; x <= 9; x++) if ((x / 9) ** 2 + (y / 6) ** 2 < 1 && (x + y) % 2 === 0 && !(x0 + x > 276 && y0 + y < 46)) pset(x0 + x, y0 + y, mez(R.pget(x0 + x, y0 + y), hex('#fff8e0'), 0.25)); }
};

// ── 6 · la boca del pozo en 1909 ────────────────────────────────────────────────────────────────────────────────────
const p6 = (t) => {
  const g = T.pozo(R, t, { encuadre: 'boca', epoca: '1909' });
  const DR = v(0.094), SA = v(0.224), VA = v(0.3), VACIO = v(0.338);
  // el vapor de la perforadora, más fuerte cuando trabaja
  const tr = t > P6 + 0.3 && t < SA;
  for (let k = 0; k < (tr ? 10 : 4); k++) { const u = ((t * (tr ? 1.2 : 0.5) + k / (tr ? 10 : 4)) % 1); R.disco(Math.round(224 + u * 14 + Math.sin(u * 6 + k) * 2), Math.round(76 - u * 26), Math.round(2 + u * 4), mez(hex('#f0eee8'), hex('#a8b0b8'), u)); }
  // el testigo de arcilla que sale del pozo colgado de la soga (con sus capas)
  const sube = tramo(t, SA - 0.5, SA + 0.1), coge = t > SA + 0.25;
  const cav = { x: 112, s: 166 }, cap = { x: 196, s: 166 };
  if (!coge) { const ty = Math.round(lerp(150, 118, sube)); if (sube > 0) { R.linea(160, g.maquina.roldana ? g.maquina.roldana[1] + 4 : 50, 160, ty, hex('#8a7a5a')); testigo(160, ty, false); } }
  // el obrero de la perforadora (palanca), el capataz que recibe el testigo y Roosevelt, que mira con su canotier
  const cvx = Math.round(lerp(cav.x, 340, tramo(t, VACIO + 0.6, P7 + 0.4)));
  R.actor(EL.cavador, cvx, cav.s, t, { dir: 1, anda: t > VACIO + 0.6, dedo: tr && Math.floor(t * 2.5) % 2 === 0, sonrisa: t > DR && t < SA, triste: t > VACIO && t < VACIO + 0.6 });
  if (t > VACIO + 0.6) { R.linea(cvx + 2, 140, cvx + 16, 128, hex('#6a4a2a')); R.rect(cvx + 14, 125, cvx + 19, 129, hex('#8a8a92')); }
  const vu = tramo(t, VA, E.duracion); const capx = Math.round(lerp(cap.x, 330, tramo(t, VACIO + 0.3, P7)));
  R.actor(EL.capataz, capx, cap.s, t, { dir: t > VACIO + 0.3 ? 1 : -1, anda: t > VACIO + 0.3 && capx < 330, brazos: t > VACIO - 0.15 && t < VACIO + 0.3, sorpresa: t > SA + 0.3 && t < VACIO });
  if (coge && t < VACIO - 0.15) testigo(capx - 3, 152, true);
  if (t > VACIO - 0.1 && t < VACIO + 0.9) R.bocadillo(capx + 8, 128, { icono: 'X' });
  if (t >= VACIO - 0.15) { const lx = capx + (t > VACIO + 0.3 ? 12 : 14); R.rect(lx - 1, 140, lx + 1, 158, K); R.rect(lx, 141, lx, 157, hex('#b8987a')); }
  R.actor(EL.fdr, 64, 172, t, { dir: 1, sonrisa: t < VACIO && t > DR, sorpresa: t > SA && t < SA + 0.6 });
  // la lancha de vapor que espera en la bahía para volver a casa
  const lx = Math.round(lerp(262, 248, tramo(t, P6, VA))), ly = 98;
  R.recorte([200, 60, 319, 120]);
  R.poligono([[lx - 10, ly - 2], [lx + 12, ly - 2], [lx + 9, ly + 2], [lx - 8, ly + 2]], K); R.poligono([[lx - 9, ly - 1], [lx + 11, ly - 1], [lx + 8, ly + 1], [lx - 7, ly + 1]], T.C.blanco);
  R.poligono([[lx - 4, ly - 6], [lx + 4, ly - 6], [lx + 4, ly - 2], [lx - 4, ly - 2]], hex('#8a5a3a')); R.linea(lx + 2, ly - 10, lx + 2, ly - 6, K);
  for (let k = 0; k < 3; k++) { const u = (t * 0.8 + k / 3) % 1; R.pset(lx + 2 - Math.round(u * 6), ly - 11 - Math.round(u * 5), hex('#d8d8d8')); }
  R.recorte(null);
};
const testigo = (x, y, mano) => { R.rect(x - 5, y - 32, x + 5, y, K); const capas = [hex('#6a4a2a'), hex('#9a7a5a'), hex('#c8b088'), hex('#7a6a5a'), hex('#a8885e'), hex('#d8d4cc')];
  for (let j = 0; j < 31; j++) R.rect(x - 4, y - 31 + j, x + 4, y - 31 + j, capas[Math.floor(j / 6)]); R.rect(x - 4, y - 31, x - 3, y - 1, hex('#f0e4c8')); R.rect(x + 3, y - 31, x + 4, y - 1, mez(hex('#6a4a2a'), K, 0.3));
  if (!mano) R.rect(x - 2, y - 35, x + 2, y - 32, hex('#5a5a62')); };

// ── 7 · el despacho del presidente ──────────────────────────────────────────────────────────────────────────────────
const ANIO = (t) => t >= P4 && t < P6 ? 1893 : t < P7 + 0.3 ? 1909 : Math.min(1933, Math.round(lerp(1910, 1933, tramo(t, P7 + 0.3, v(0.925)))));
const p7 = (t) => {
  despacho(R, t, { tono: 'madera', bandera: true, mesa: false, anio: ANIO(t), companero: false });
  { // el papel pintado de rayas con florecitas, y por la ventana Washington: el cielo con nubes, los árboles y el obelisco
    const { rect, pset, disco } = R, PA = T.C.pared, PS = T.C.paredS;
    for (let y = 6; y < 100; y++) for (let x = 0; x < 320; x++) { const c = R.pget(x, y); if (c !== PA && c !== PS) continue;
      const fx = x % 16, fy = (y + ((x >> 4) % 2) * 8) % 16; pset(x, y, fx === 0 || fx === 1 ? hex('#b8945c') : fx === 8 ? hex('#d4b07a') : (fx === 4 && fy === 4) || (fx === 12 && fy === 12) ? hex('#a8844a') : ((fx === 3 || fx === 5) && fy === 4) || ((fx === 11 || fx === 13) && fy === 12) ? hex('#8a9a5a') : PA); }
    for (let y = 20; y <= 84; y++) for (let x = 16; x <= 90; x++) pset(x, y, y < 40 ? hex('#8ab8e0') : y < 60 ? hex('#a0c8e8') : hex('#b8d8f0'));
    for (const [cx, cy, w, vel] of [[30, 30, 18, 2], [70, 26, 14, 3.5], [50, 44, 10, 5]]) { const x = Math.round(16 + ((cx + t * vel) % 90)) - 8; for (const [dx, dy, rr] of [[0, 0, w / 3], [-w / 3, 2, w / 4], [w / 3, 2, w / 4]]) { R.recorte([16, 20, 90, 84]); disco(Math.round(x + dx), Math.round(cy + dy), Math.round(rr), hex('#f4f8fc')); disco(Math.round(x + dx), Math.round(cy + dy + 2), Math.round(rr * 0.7), hex('#d8e4f0')); R.recorte(null); } }
    for (let x = 16; x <= 90; x++) { const hgt = 6 + Math.round(Math.sin(x * 0.4) * 2 + Math.sin(x * 1.3) * 1.5); for (let y = 84 - hgt; y <= 84; y++) pset(x, y, (x + y) % 3 ? hex('#4e7a3a') : hex('#3a6030')); }
    rect(60, 40, 64, 78, hex('#e8e4dc')); rect(63, 40, 64, 78, hex('#c8c4bc')); R.poligono([[60, 40], [62, 35], [64, 40]], hex('#e8e4dc'));
    for (let y = 22; y < 84; y += 4) rect(16, y, 90, y, hex('#d8d0b8')); rect(52, 20, 52, 84, K);
    if (Math.floor(t * 1.3) % 7 === 0) pset(30 + Math.floor(t * 9) % 50, 32, K);
    // la alfombra ovalada delante de la mesa
    for (let y = 150; y < 178; y++) for (let x = 70; x < 250; x++) { const q = ((x - 160) / 90) ** 2 + ((y - 164) / 14) ** 2; if (q < 1) pset(x, y, q > 0.82 ? hex('#5a2a2a') : q > 0.7 ? hex('#c8a040') : (Math.abs(x - 160) + Math.abs(y - 164) * 3) % 14 < 2 ? hex('#c8a040') : (x + y) % 2 ? hex('#7a3434') : hex('#8a3a3a')); }
  }
  { // en la pared: la foto enmarcada de la expedición de 1909 (el castillete sobre el pozo) y el barco de vela en su balda
    const { rect, linea, poligono, pset } = R;
    rect(150, 22, 200, 62, K); rect(151, 23, 199, 61, hex('#6a4a2a')); rect(154, 26, 196, 58, hex('#f0e8d4')); rect(157, 29, 193, 55, hex('#b8a07a'));
    for (let y = 29; y < 56; y++) for (let x = 157; x < 194; x++) if ((x + y) % 5 === 0) pset(x, y, hex('#a88e68'));
    rect(157, 48, 193, 55, hex('#8a7050')); linea(175, 32, 168, 50, hex('#4a3a2a')); linea(175, 32, 182, 50, hex('#4a3a2a')); linea(170, 44, 180, 44, hex('#4a3a2a')); linea(171, 39, 179, 39, hex('#4a3a2a'));
    rect(184, 42, 190, 49, hex('#4a3a2a')); rect(187, 34, 188, 42, hex('#4a3a2a')); for (const x of [162, 166]) { rect(x, 46, x + 2, 52, hex('#4a3a2a')); rect(x, 44, x + 2, 45, hex('#5a4a3a')); }
    const d = 28; rect(156, 70 + d, 204, 72 + d, K); rect(157, 70 + d, 203, 71 + d, hex('#8a5a3a'));
    poligono([[162, 64 + d], [198, 64 + d], [194, 69 + d], [166, 69 + d]], hex('#5a3a24')); rect(164, 64 + d, 196, 65 + d, hex('#c8a040')); linea(180, 38 + d - 4, 180, 64 + d, K); linea(170, 44 + d - 2, 170, 64 + d, K); linea(190, 46 + d - 2, 190, 64 + d, K);
    poligono([[181, 36 + d], [189, 62 + d], [181, 62 + d]], hex('#f4f0e4')); poligono([[171, 44 + d], [178, 62 + d], [171, 62 + d]], hex('#f4f0e4')); poligono([[191, 46 + d], [196, 62 + d], [191, 62 + d]], hex('#f4f0e4')); pset(180, 33 + d, hex('#c83a2a'));
  }
  const LLEGA = v(0.52), ENTREGA = v(0.56);
  // el ayudante trae el periódico, se lo da y se va
  const ida = tramo(t, P7 + 0.2, LLEGA), vuelta = tramo(t, ENTREGA + 0.3, ENTREGA + 1.8), ax = Math.round(lerp(lerp(330, 210, ida), 330, vuelta));
  R.actor(EL.periodista, ax, 164, t, { dir: vuelta > 0 ? 1 : -1, anda: (ida > 0 && ida < 1) || (vuelta > 0 && vuelta < 1), sonrisa: t > LLEGA, habla: t > LLEGA && t < ENTREGA + 0.3 });
  if (t < ENTREGA) { const px = ax - 2, py = 146; R.rect(px, py, px + 9, py + 6, K); R.rect(px + 1, py + 1, px + 8, py + 5, hex('#e8e4d8')); R.rect(px + 2, py + 2, px + 7, py + 2, hex('#6a6a6a')); }
  // Roosevelt, ya mayor, sentado detrás de la mesa: lee la noticia de la isla y sonríe
  const lee = t > ENTREGA;
  R.actor(EL.fdr, 150, 129, t, { dir: 1, pal: { H: hex('#8a8a92'), h: hex('#b0b0b8') }, sonrisa: lee && t > v(0.62), dedo: lee && t > v(0.66) && t < v(0.74) });
  mesaDespacho(R, t, {});
  if (lee) { // el periódico abierto en sus manos, con la foto del castillete del pozo y la «X»
    const up = tramo(t, ENTREGA, ENTREGA + 0.4), nx = 120, ny = Math.round(lerp(124, 115, up)); R.rect(nx, ny, nx + 40, ny + 24, K); R.rect(nx + 1, ny + 1, nx + 39, ny + 23, hex('#ece6d6')); R.rect(nx + 20, ny + 1, nx + 20, ny + 23, hex('#b8b2a2'));
    R.rect(nx + 3, ny + 3, nx + 17, ny + 5, hex('#2a2a2a')); for (const y of [9, 12, 15, 18, 21]) R.rect(nx + 3, ny + y, nx + 17, ny + y, hex('#8a8a8a'));
    R.rect(nx + 22, ny + 3, nx + 37, ny + 16, hex('#4a4038')); R.rect(nx + 23, ny + 4, nx + 36, ny + 15, hex('#c8b898'));
    R.linea(nx + 29, ny + 5, nx + 25, ny + 14, hex('#4a3a2a')); R.linea(nx + 29, ny + 5, nx + 33, ny + 14, hex('#4a3a2a')); R.linea(nx + 26, ny + 11, nx + 32, ny + 11, hex('#4a3a2a')); R.rect(nx + 23, ny + 14, nx + 36, ny + 15, hex('#8a7a5a'));
    R.icono('X', nx + 32, ny + 5, hex('#a83a2a'), hex('#c8b898')); for (const y of [19, 21]) R.rect(nx + 22, ny + y, nx + 37, ny + y, hex('#8a8a8a'));
    T.mano(R, nx - 1, ny + 14, 1, '#3a3a4a', { sinManga: true }); T.mano(R, nx + 41, ny + 14, -1, '#3a3a4a', { sinManga: true });
  }
  // el calendario de la pared: en «president» el año se queda en 1933 y brilla
  const PR = v(0.925); if (t > PR && t < PR + 0.8) { const b = tramo(t, PR, PR + 0.8); for (let k = 0; k < 8; k++) { const a = k * 0.785 + b * 2, l = 6 + b * 12; R.pset(Math.round(120 + Math.cos(a) * (18 + l)), Math.round(57 + Math.sin(a) * (14 + l * 0.6)), T.C.oro); } }
};

const efectos = [[3.85, 'golpecito'], [r(0.3), 'papel'], [P2 + 0.2, 'firma'], [r(0.52), 'sello'], [P3 + 0.25, 'pop'], [r(0.8), 'pop'], [r(0.86), 'papel'], [r(0.95), 'brillo'],
  [P4 + 0.2, 'puerta'], [c(0.583), 'papel'], [c(0.747), 'brillo'], [P6 + 0.3, 'maquina'], [v(0.224), 'chof'], [P7 + 0.4, 'tic'], [v(0.56), 'papel'], [v(0.925), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { cartela: '1909', efectos, año: ANIO });
''')

E['oi-niebla'] = ('La niebla', '''// OI-NIEBLA (frase 22), 1939, cartela «1939». Dos planos:
// 1. mar abierto en la niebla (fondo local, a ras de agua): el crucero gris y su escolta avanzan hacia Oak Island, que
//    apenas se ve; pita la sirena, la gaviota deja la boya de campana, el pescador de la chalana se vuelve y señala el
//    barco; la lámpara de señales destella hacia la isla en «island»;
// 2. la cubierta: el marinero mira con los prismáticos; en «fog» la niebla se espesa y una racha le vuela la gorra por
//    encima de la borda (gag); en «war» sale el oficial con el radiograma («!») y el barco gira: el faro se va por la izquierda.''', r'''
const K = T.C.k;
const n = (f) => en('niebla', f);
const P2 = n(0.516);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const NIEBLA = hex('#c8ccd0');
const ruido = (x, y) => { const a = Math.sin(x * 0.045 + y * 0.09) + Math.sin(x * 0.021 - y * 0.15 + 1.3) * 0.8 + Math.sin(x * 0.11 + y * 0.03 + 2.1) * 0.4; return a / 2.2; };
// el crucero gris de 1939 de perfil (proa a la derecha), con sus dos chimeneas, el mástil y la estela
const crucero = (x, y, t) => {
  const { rect, pset, linea, poligono, disco } = R;
  poligono([[x - 40, y - 6], [x + 38, y - 6], [x + 46, y - 12], [x + 40, y + 1], [x - 38, y + 1]], K);
  poligono([[x - 39, y - 5], [x + 37, y - 5], [x + 43, y - 10], [x + 39, y], [x - 37, y]], hex('#6a727e'));
  rect(x - 38, y - 1, x + 38, y, hex('#3a3e46')); for (let i = -32; i < 34; i += 6) pset(x + i, y - 3, hex('#e8d890'));
  rect(x - 24, y - 12, x + 20, y - 6, K); rect(x - 23, y - 11, x + 19, y - 6, hex('#7a828e')); rect(x - 2, y - 18, x + 12, y - 11, K); rect(x - 1, y - 17, x + 11, y - 11, hex('#848c98'));
  for (const cx of [-14, -4]) { rect(x + cx - 3, y - 22, x + cx + 3, y - 11, K); rect(x + cx - 2, y - 21, x + cx + 2, y - 11, hex('#5a626e')); rect(x + cx - 2, y - 21, x + cx + 2, y - 20, K); }
  linea(x + 6, y - 32, x + 6, y - 17, K); linea(x + 2, y - 28, x + 10, y - 28, K); linea(x - 30, y - 8, x - 22, y - 8, K);
  rect(x + 22, y - 9, x + 30, y - 7, K); linea(x + 30, y - 8, x + 40, y - 9, K); rect(x - 34, y - 9, x - 28, y - 7, K); linea(x - 34, y - 8, x - 44, y - 8, K);
  for (const cx of [-14, -4]) for (let k = 0; k < 6; k++) { const u = ((t * 0.5 + k / 6 + cx * 0.03) % 1); disco(Math.round(x + cx - u * 22), Math.round(y - 24 - u * 10), Math.round(1 + u * 4), mez(hex('#5a5a62'), NIEBLA, u)); }
  // la proa que corta el agua y la estela que se queda atrás
  for (let k = 0; k < 4; k++) { const f = Math.sin(t * 6 + k) > 0; pset(x + 40 + k, y + 1 - (f ? 1 : 0), T.C.blanco); pset(x + 38 - k * 2, y + 2, hex('#e8f0f0')); }
  for (let i = 0; i < 70; i += 3) { const yy = y + 2 + Math.round(i * 0.05), on = Math.sin(i * 0.4 - t * 4) > 0; if (on) { pset(x - 40 - i, yy, hex('#d8e4e8')); pset(x - 40 - i, yy + 2 + Math.round(i * 0.06), hex('#b8c8cc')); } }
};
// fondo local: mar abierto en la niebla, a ras de agua. Al fondo, la costa con el faro que barre y Oak Island apenas
// dibujada; en medio, el escolta y el crucero que avanzan hacia la isla; delante, la boya de campana con su gaviota y
// la chalana del pescador de langostas, que se vuelve con la sirena y señala el barco.
const CI = [hex('#a4b0ba'), hex('#98a6b0'), hex('#b2bcc4'), hex('#a8b2bc'), hex('#bec6cc'), hex('#b4bcc4')];
const NU = [hex('#8e9aa4'), hex('#c4ccd2'), hex('#dfe4e8')];
const MAR = [hex('#7c8c96'), hex('#62788a'), hex('#4c6274'), hex('#3e5466')];
const nubeG = (cx, cy, w) => { const B = [[0, 0, w * 0.3], [-w * 0.3, w * 0.06, w * 0.22], [w * 0.3, w * 0.05, w * 0.24], [-w * 0.1, -w * 0.12, w * 0.24], [w * 0.14, -w * 0.08, w * 0.2]];
  for (const [dx, dy, r] of B) R.disco(Math.round(cx + dx), Math.round(cy + dy + 2), Math.round(r), NU[0]);
  for (const [dx, dy, r] of B) R.disco(Math.round(cx + dx), Math.round(cy + dy), Math.round(r), NU[1]);
  for (const [dx, dy, r] of B) R.disco(Math.round(cx + dx - 1), Math.round(cy + dy - 2), Math.round(r * 0.6), NU[2]); };
const escolta = (x, y, t) => { const G1 = hex('#58606a'), G2 = hex('#727a84');
  R.poligono([[x - 22, y - 3], [x + 20, y - 3], [x + 25, y - 6], [x + 22, y + 1], [x - 21, y + 1]], G1); R.rect(x - 20, y - 2, x + 20, y - 2, G2);
  R.rect(x - 8, y - 7, x + 8, y - 3, G1); R.rect(x - 2, y - 11, x + 4, y - 7, G1); R.rect(x - 6, y - 12, x - 3, y - 7, K); R.linea(x + 2, y - 18, x + 2, y - 11, K);
  for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1; R.disco(Math.round(x - 5 - u * 12), Math.round(y - 13 - u * 6), Math.round(1 + u * 2), mez(hex('#5a5a62'), NIEBLA, u)); }
  for (let i = 0; i < 30; i += 3) if (Math.sin(i * 0.5 - t * 4) > 0) R.pset(x - 22 - i, y + 1, hex('#c8d4d8')); };
const rot = (ox, oy, a) => (dx, dy) => [Math.round(ox + dx * Math.cos(a) - dy * Math.sin(a)), Math.round(oy + dx * Math.sin(a) + dy * Math.cos(a))];
const p1 = (t) => {
  const { rect, pset, linea, poligono, disco } = R;
  const SI = n(0.18), IS = n(0.48), CA = n(0.58);
  // el cielo tramado, con nubes de tres tonos a tres velocidades y gaviotas
  for (let y = 0; y < 92; y++) { const b = y < 34 ? 0 : y < 64 ? 2 : 4; for (let x = 0; x < 320; x++) pset(x, y, (x + y) % 2 === 0 && (y % 8) < 4 ? CI[b + 1] : CI[b]); }
  for (const [vel, cy, w, xs] of [[1.2, 30, 34, [20, 150, 250]], [2.6, 46, 24, [80, 200, 320]], [4.4, 64, 16, [30, 130, 230, 300]]])
    for (const x0 of xs) { const cx = ((x0 + t * vel) % 380) - 30; if (!(cy < 50 && cx > 262)) nubeG(cx, cy, w); }
  for (let k = 0; k < 3; k++) R.gaviota(Math.round(((t * (9 + k * 3) + k * 90) % 360) - 20), 34 + k * 9 + Math.round(Math.sin(t * 1.5 + k) * 2), t, k);
  // la costa del fondo con abetos y el faro que barre la niebla
  poligono([[0, 93], [0, 79], [24, 75], [48, 77], [80, 82], [112, 86], [146, 93]], hex('#8c9aa2'));
  for (let x = 4; x < 120; x += 7) { const yb = Math.round(76 + (x > 48 ? (x - 48) * 0.13 : 0) + Math.sin(x) * 1.5); poligono([[x - 3, yb + 2], [x, yb - 7 - (x % 3)], [x + 3, yb + 2]], hex('#7a8a90')); }
  rect(33, 62, 39, 78, hex('#c8ccd0')); rect(33, 68, 39, 71, hex('#a85a5a')); rect(32, 59, 40, 62, hex('#6a7078')); rect(34, 57, 38, 59, hex('#f0e8b0')); poligono([[32, 57], [36, 53], [40, 57]], hex('#6a7078'));
  { const a = (t * 1.25) % (Math.PI * 2), on = Math.cos(a); if (on > 0.2) { for (let k = 0; k < 60; k += 1) for (const d of [-0.05, 0, 0.05]) { const x = Math.round(36 + Math.sin(a) * k * 2 + d * k * 2), y = Math.round(58 + d * k * 3); if (x >= 0 && x < 320 && (x + y + k) % 2 === 0) pset(x, y, mez(hex('#fff8d0'), CI[4], k / 60)); } }
    if (on > 0.8) disco(36, 58, 4, hex('#fffbe0')); }
  // Oak Island, apenas un perfil de robles en la niebla, con su playita
  poligono([[192, 93], [204, 84], [222, 76], [252, 73], [278, 78], [296, 86], [306, 93]], hex('#80928a'));
  for (const [x, y, r] of [[214, 80, 6], [226, 75, 7], [240, 73, 7], [254, 72, 8], [268, 75, 7], [282, 80, 6], [234, 78, 5], [262, 77, 6]]) { disco(x, y + 1, r, hex('#708478')); disco(x - 1, y - 1, r - 2, hex('#8a9c92')); }
  rect(200, 91, 300, 92, hex('#b8b4a6'));
  // el mar en perspectiva: tres tonos, crestas que corren y espuma
  for (let y = 93; y < 180; y++) { const f = (y - 93) / 87, c = f < 0.2 ? MAR[0] : f < 0.45 ? MAR[1] : f < 0.75 ? MAR[2] : MAR[3], c2 = mez(c, NIEBLA, 0.18);
    for (let x = 0; x < 320; x++) pset(x, y, hh(x >> 2, y, 3) > 0.86 ? c2 : c); }
  for (let y = 95, j = 0; y < 180; y += 2 + Math.floor((y - 93) / 14), j++) { const L = 2 + Math.floor((y - 93) / 7), gap = 14 + (y - 93) / 2, vel = 3 + (y - 93) / 10;
    for (let x0 = -gap; x0 < 330; x0 += gap) { const x = Math.round(x0 + ((t * vel + j * 7) % gap)), cr = hh(j, Math.round(x0), 5) > 0.5;
      linea(x, y, x + L, y, cr ? hex('#a6b6be') : hex('#8ea2ae')); linea(x + 1, y + 1, x + L + 1, y + 1, hex('#32485a')); if (cr && y > 140 && Math.sin(t * 3 + x0) > 0.6) pset(x + (L >> 1), y - 1, hex('#e4ecee')); } }
  // el escolta al fondo y el crucero, que avanzan hacia la isla
  escolta(Math.round(lerp(120, 170, tramo(t, 1.3, P2))), 103, t);
  const u = tramo(t, 1.3, P2), x = Math.round(lerp(46, 126, u)), y = 128 + Math.round(Math.sin(t * 1.2));
  crucero(x, y, t);
  for (let k = 0; k < 5; k++) pset(x - 30 + k * 14, y + 3, hex('#9eb0b8'));
  // la sirena: el chorro de vapor junto a la chimenea
  { const s = tramo(t, SI, SI + 1.2); if (s > 0 && s < 1) for (let k = 0; k < 8; k++) { const q = s * 1.3 - k * 0.06; if (q > 0 && q < 1) disco(Math.round(x - 1 - q * 10), Math.round(y - 26 - q * 12), Math.round(1 + q * 3), mez(T.C.blanco, NIEBLA, q)); } }
  // la lámpara de señales del puente que destella hacia la isla en «island»
  if (t > IS && t < IS + 1 && Math.floor(t * 6) % 2 === 0) { disco(x + 10, y - 16, 2, hex('#fff8c0')); for (let k = 0; k < 60; k += 2) pset(x + 12 + k, y - 16 - Math.round(k * 0.2), hex('#fff8c0')); }
  // la niebla: espesa al fondo, en jirones que pasan
  const nb = 0.5 + 0.08 * Math.sin(t * 0.3);
  for (let yy = 0; yy < 180; yy++) for (let xx = 0; xx < 320; xx++) {
    const f = ruido(xx - t * 9, yy * 1.6), lej = yy < 95 ? 1 : yy < 135 ? 0.7 : 0.35, a = Math.min(0.85, (nb + f * 0.3) * lej);
    if (a > 0.05) { const c = R.pget(xx, yy); pset(xx, yy, mez(c, NIEBLA, ((xx + yy) % 2 ? a : a * 0.9))); } }
  // las boyas de las nasas de langosta, que cabecean
  for (const [bx, by, col] of [[112, 150, '#c84a3a'], [168, 158, '#e8c040'], [204, 146, '#c84a3a'], [146, 168, '#3a8ac8']]) { const yb = by + Math.round(Math.sin(t * 2 + bx) * 1);
    rect(bx - 2, yb - 3, bx + 2, yb, K); rect(bx - 1, yb - 2, bx + 1, yb - 1, hex(col)); pset(bx, yb - 5, K); pset(bx, yb - 4, K); linea(bx - 4, yb + 1, bx + 4, yb + 1, hex('#c8d4d8')); }
  // la boya de campana delante, que se mece; la gaviota de encima sale volando con la sirena
  { const a = Math.sin(t * 1.6) * 0.14, P = rot(40, 160, a), sp = Math.sin(t * 2.4);
    for (let k = -9; k <= 9; k++) pset(40 + k, 162 + Math.round(Math.abs(k) * 0.1 + (Math.abs(k) > 7 && sp > 0 ? -1 : 0)), hex('#dfe8ea'));
    poligono([P(-9, 0), P(9, 0), P(7, 4), P(-7, 4)], K); poligono([P(-8, 0), P(8, 0), P(6, 3), P(-6, 3)], hex('#b83a2e')); linea(...P(-7, 1), ...P(7, 1), hex('#e8604a'));
    for (const [dx0, dx1] of [[-6, -2], [6, 2], [-2, -2], [2, 2]]) linea(...P(dx0, -1), ...P(dx1, -22), dx0 === -2 || dx0 === 2 ? hex('#7a2a22') : hex('#a8342a'));
    linea(...P(-6, -10), ...P(6, -10), hex('#a8342a')); linea(...P(-4, -16), ...P(4, -16), hex('#a8342a'));
    const [cx, cy] = P(0, -19), cb = Math.round(Math.sin(t * 3.2) * 2); disco(cx + cb, cy, 3, K); disco(cx + cb, cy, 2, T.C.oro); pset(cx + cb - 1, cy - 1, hex('#fff0a0'));
    const [lx, ly] = P(0, -24); rect(lx - 1, ly - 2, lx + 1, ly, K); if (Math.floor(t * 1.5) % 2 === 0) { pset(lx, ly - 1, hex('#80ff90')); disco(lx, ly - 1, 3, mez(hex('#80ff90'), NIEBLA, 0.6)); pset(lx, ly - 1, hex('#e0ffe0')); }
    const vo = tramo(t, SI + 0.2, SI + 2.2);
    if (vo <= 0) { const [gx, gy] = P(0, -27); rect(gx - 2, gy - 3, gx + 2, gy, T.C.blanco); pset(gx + 3, gy - 3, T.C.blanco); pset(gx + 4, gy - 3, T.C.oro); rect(gx - 3, gy - 2, gx - 1, gy - 1, hex('#8a9098')); pset(gx - 1, gy + 1, T.C.oro); pset(gx + 1, gy + 1, T.C.oro); pset(gx + 3, gy - 4, K); }
    else if (vo < 1) R.gaviota(Math.round(40 - vo * 70), Math.round(130 - vo * 70), t * 1.6, 0); }
  // la chalana del pescador: se vuelve con la sirena y señala el barco en «island»; recoge el sedal en «Canada»
  { const bob = Math.round(Math.sin(t * 1.7 + 1) * 1.2), hx = 266, hy = 165 + bob, mira = t > SI + 0.3;
    R.actor(EL.amigo2, hx, hy - 2, t, { dir: mira ? -1 : 1, sorpresa: mira && t < SI + 1.3, dedo: t > IS && t < CA, sonrisa: t > CA, tocado: 'gorra' });
    if (!mira || t > CA) { const rx = hx + (mira ? -6 : 6), up = t > CA ? tramo(t, CA, CA + 0.8) : 0; linea(rx, hy - 14, rx + (mira ? -14 : 22), hy - 30 + Math.round(up * 6), hex('#6a4a2a')); if (!mira) linea(rx + 22, hy - 30, rx + 26, hy + 2, hex('#d8dcd8')); }
    poligono([[hx - 26, hy - 6], [hx + 26, hy - 9], [hx + 20, hy + 6], [hx - 20, hy + 6]], K); poligono([[hx - 24, hy - 5], [hx + 24, hy - 8], [hx + 19, hy + 5], [hx - 19, hy + 5]], hex('#5a7a6a'));
    linea(hx - 23, hy - 4, hx + 23, hy - 7, hex('#e8e0c8')); linea(hx - 21, hy, hx + 21, hy - 2, hex('#4a6858')); linea(hx - 20, hy + 3, hx + 20, hy + 2, hex('#4a6858'));
    rect(hx + 8, hy - 12, hx + 16, hy - 8, K); rect(hx + 9, hy - 11, hx + 15, hy - 9, hex('#8a6a3a')); for (let i = 0; i < 3; i++) pset(hx + 10 + i * 2, hy - 12, hex('#c8a060'));
    for (let k = -22; k <= 22; k += 2) if (Math.sin(t * 4 + k) > 0.3) pset(hx + k, hy + 7, hex('#dfe8ea')); }
  // jirones de niebla bajos que pasan por delante
  for (let k = 0; k < 4; k++) { const x0 = Math.round(((t * (14 + k * 4) + k * 97) % 420) - 60), y0 = 170 + k * 2; for (let i = 0; i < 50; i++) if ((i + k) % 2 === 0) pset(x0 + i, y0 + Math.round(Math.sin(i * 0.2) * 1), mez(R.pget(Math.max(0, Math.min(319, x0 + i)), y0), NIEBLA, 0.6)); }
};
const p2 = (t) => {
  const NI = n(0.74), GU = n(0.859);
  const nb = lerp(0.6, 0.92, tramo(t, NI, NI + 1.2)), giro = tramo(t, GU, GU + 1.6);
  const g = T.roosevelt(R, t, { encuadre: 'cubierta', niebla: nb, giro });
  // el marinero: llega con los prismáticos, mira al faro; la racha se lleva la gorra y él la sigue con los brazos en alto
  const an = tramo(t, P2, P2 + 1.1), mx = Math.round(lerp(176, 132, an)), vuela = t > NI;
  const sigue = t > NI + 0.1 && t < NI + 1.1;
  R.actor(EL.marinero39, mx, 150, t, { dir: t > GU + 0.5 ? 1 : -1, anda: an > 0 && an < 1, tocado: vuela ? false : undefined, sorpresa: sigue, brazos: sigue, triste: t > NI + 1.2, dedo: !vuela && an >= 1 && t > P2 + 1.3 });
  // los prismáticos en la mano cuando mira
  if (!vuela && an >= 1) { const bx = mx - 3, by = 129; R.rect(bx, by, bx + 5, by + 3, K); R.rect(bx + 1, by + 1, bx + 4, by + 2, hex('#3a3a46')); }
  // la gorra que vuela: sube dando vueltas por encima de la borda y se pierde en la niebla
  if (vuela) { const q = tramo(t, NI, NI + 1.6); if (q < 1) { const gx = Math.round(lerp(mx + 2, 40, q)), gy = Math.round(lerp(126, 70, Math.sin(q * 1.4)) + q * q * 30), fl = Math.floor(t * 8) % 2 ? 1 : -1;
    const G = ['...kkkkkkkk....', '..kCCCCCCCCk...', '.kCCCCCoCCCCk..', '.kkkkkkkkkkkkkk', '..........kkkk.'], GP = { k: K, C: hex('#2a3458'), o: hex('#f2eee2') };
    const filas = fl > 0 ? G : G.slice().reverse();
    filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = GP[f[i]]; if (c == null) continue; const ix = fl > 0 ? i : f.length - 1 - i; R.rect(gx + ix * 2, gy + j * 2, gx + ix * 2 + 1, gy + j * 2 + 1, c); } });
    for (let k = 0; k < 6; k++) R.pset(gx + 16 + k * 3, gy + 2 + Math.round(Math.sin(t * 10 + k)), mez(T.C.blanco, NIEBLA, 0.3)); } }
  // las rachas de viento: rayas blancas que cruzan
  if (t > NI - 0.1 && t < NI + 1.4) for (let k = 0; k < 6; k++) { const u = ((t - NI) * 1.8 + k * 0.17) % 1, x0 = Math.round(320 - u * 360), y0 = 60 + k * 14; R.linea(x0, y0, x0 + 18, y0 + 1, mez(T.C.blanco, NIEBLA, 0.2)); }
  // el oficial que se asoma a la puerta de la caseta al girar el barco
  // el oficial que sale de la caseta con el radiograma de Europa en «war»: «!»; el marinero se vuelve a mirarlo
  if (t > GU + 0.1) { const ox = Math.round(lerp(255, 238, tramo(t, GU + 0.1, GU + 0.7)));
    R.actor(EL.capataz, ox, 121, t, { dir: -1, anda: t < GU + 0.7, habla: t > GU + 0.7 && Math.sin(t * 8) > 0, tocado: 'gorra' });
    const py = 104 + Math.round(Math.sin(t * 6) * 1); R.rect(ox - 15, py - 2, ox - 5, py + 9, K); R.rect(ox - 14, py - 1, ox - 6, py + 8, hex('#f2ecd8'));
    for (const yy of [1, 3, 5]) R.rect(ox - 13, py + yy, ox - 7, py + yy, hex('#7a7a80')); R.rect(ox - 12, py + 7, ox - 9, py + 7, hex('#c83a2a'));
    T.mano(R, ox - 6, py + 4, -1, '#2a3458', { sinManga: true });
    if (t > GU + 0.6) R.bocadillo(ox, 92, { icono: '!' }); }
  T.d_rooseveltDelante(R, t, { encuadre: 'cubierta', niebla: nb });
};
const efectos = [[n(0.18), 'vapor'], [n(0.48), 'bip'], [P2 + 0.3, 'golpecito'], [n(0.74), 'rafaga'], [n(0.859) + 0.6, 'aviso'], [n(0.92), 'motor']];
T.rodar(E, R, [[0, p1], [P2, p2]], { cartela: '1939', efectos, año: 1939 });
''')
