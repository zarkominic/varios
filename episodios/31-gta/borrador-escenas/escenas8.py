E = {}

# Utilidades comunes de los fondos LOCAL (se repiten en cada cuerpo: cada escena es un .html independiente)
UTIL = r'''
const K = T.C.k;
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const RA = (...c) => c.map(hex);
const tono = (r, v, x, y) => r[Math.max(0, Math.min(r.length - 1, Math.floor(v + BY[(y & 3) * 4 + (x & 3)] / 16)))];
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
// lo fijo de un plano se pinta una vez en su búfer y se copia en cada fotograma
const fijo = (pinta) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); } R.copiar(b); }; };
// mezcla de dos colores (a: cuánto del segundo) y aclarado/oscurecido de una zona (luz de un foco, sombra)
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const baña = (x0, y0, x1, y1, col, a, f = null) => { for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) { const k = f ? f(x, y) : 1; if (k > 0) R.pset(x, y, mez(R.pget(x, y), col, a * k)); } };
// relleno tramado con ruido (paredes, suelos): r rampa, v0 tono base, amp ruido
const relleno = (x0, y0, x1, y1, r, v0, amp = 0.6, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono(r, v0 + (h(x >> 1, y >> 1, k) - 0.5) * amp, x, y)); };
// madera con vetas (tablas horizontales de alto ht)
const madera = (x0, y0, x1, y1, r, ht = 12, k = 0) => { for (let y = y0; y <= y1; y++) { const tb = Math.floor((y - y0) / ht), fy = (y - y0) % ht;
  for (let x = x0; x <= x1; x++) { const v = 1.6 + Math.sin(x * 0.045 + tb * 1.7 + Math.sin(y * 0.55 + tb) * 1.4) * 0.8 + (h(x >> 2, y, k + tb) - 0.5) * 0.5 - (fy === 0 ? 1.6 : 0) + (fy === 1 ? 0.6 : 0);
    R.pset(x, y, tono(r, v, x, y)); }
  if (fy === 0) for (let x = x0 + ((tb * 53) % 70); x <= x1; x += 70 + (tb % 3) * 9) R.pset(x, y + 4, r[0]); } };
// cuarterón de madera en relieve (paneles de pared)
const cuarteron = (x0, y0, x1, y1, r) => { R.rect(x0, y0, x1, y1, r[1]); R.rect(x0, y0, x1, y0, r[3]); R.rect(x0, y0, x0, y1, r[3]); R.rect(x0, y1, x1, y1, r[0]); R.rect(x1, y0, x1, y1, r[0]);
  for (let y = y0 + 2; y < y1 - 1; y++) for (let x = x0 + 2; x < x1 - 1; x++) R.pset(x, y, tono(r, 1.4 + Math.sin(y * 0.3 + x * 0.02) * 0.5 + (h(x, y >> 1, 7) - 0.5) * 0.4, x, y)); };
// nube de tres tonos
const nube3 = (cx, cy, w, c) => { const B = [[0, 0, .32], [-.32, .06, .24], [.3, .05, .26], [-.1, -.12, .26], [.14, -.08, .22]];
  for (const [dx, dy, r] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), Math.round(r * w), c[0]);
  for (const [dx, dy, r] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), Math.round(r * w), c[1]);
  for (const [dx, dy, r] of B) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), Math.round(r * w * 0.7), c[2]); };
// la esquina de Atom (x 272–319, y 0–48) tranquila: dos tonos casi iguales, sin dibujo
const calma = (c1, c2) => { for (let y = 0; y <= 64; y++) for (let x = 252; x < 320; x++) { const k = Math.min(1, Math.min(x - 252, 64 - y) / 18); if (BY[(y & 3) * 4 + (x & 3)] < k * 16) R.pset(x, y, BY[(y & 3) * 4 + (x & 3)] < 3 ? c2 : c1); } };
// una estrella de cinco puntas (emblemas sin letras)
const estrella = (x, y, r, c) => { const P = []; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * 0.45 : r; P.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); } R.poligono(P, c); };
// una caja de juego genérica (sin letras) vista de frente: x, y arriba a la izquierda, 22 × 30; n: la cifra grande
const cajaN = (x, y, n, c1, c2, k = 0) => { x = Math.round(x); y = Math.round(y);
  R.rect(x, y, x + 21, y + 29, K); R.rect(x + 1, y + 1, x + 20, y + 28, c1); R.rect(x + 1, y + 1, x + 20, y + 1, mez(c1, hex('#ffffff'), 0.4)); R.rect(x + 20, y + 2, x + 20, y + 28, c2);
  R.rect(x + 3, y + 3, x + 18, y + 21, hex('#1e2a50')); for (let i = 0; i < 4; i++) { const bx = x + 3 + i * 4, bh = 5 + ((i * 7 + k) % 5) * 2; R.rect(bx, y + 21 - bh, bx + 3, y + 21, hex('#3a3458')); if ((i + k) % 2) R.pset(bx + 1, y + 21 - bh + 2, hex('#f0c040')); }
  R.disco(x + 15, y + 7, 2, hex('#f6e890'));
  R.rect(x + 3, y + 23, x + 18, y + 27, hex('#f2ecd8')); R.rect(x + 5, y + 25, x + 16, y + 25, c2);
  if (n != null) R.numero(String(n), x + 11, y + 20, { tam: 16, centro: true }); };
// la caja de juego pequeña que se lleva en la mano (x, y = el centro de abajo; 11 × 15): la ilustración de la noche, la
// etiqueta blanca y el canto
const cajaMini = (x, y, c, k = 0) => { x = Math.round(x) - 5; y = Math.round(y) - 15; const C1 = hex(c);
  R.rect(x, y, x + 10, y + 14, K); R.rect(x + 1, y + 1, x + 9, y + 13, C1); R.rect(x + 9, y + 1, x + 9, y + 13, mez(C1, K, 0.35)); R.rect(x + 1, y + 1, x + 8, y + 1, mez(C1, hex('#ffffff'), 0.45));
  R.rect(x + 2, y + 2, x + 7, y + 8, hex('#1e2a50')); R.rect(x + 2, y + 6, x + 3, y + 8, hex('#3a3458')); R.rect(x + 5, y + 4, x + 6, y + 8, hex('#3a3458')); R.pset(x + 6, y + 3, hex('#f6e890')); R.pset(x + 2 + (k % 3), y + 7, hex('#f0c040'));
  R.rect(x + 2, y + 10, x + 7, y + 12, hex('#f2ecd8')); R.pset(x + 3, y + 11, K); R.pset(x + 5, y + 11, K); };
// figurita de público de espaldas o de frente (bustos pequeños de 6 px) para gradas
const cabecita = (x, y, c, piel, t, k) => { const dy = Math.sin(t * 3 + k) > 0.92 ? -1 : 0; R.rect(x - 2, y + dy, x + 2, y + 3 + dy, piel); R.rect(x - 2, y + dy, x + 2, y + dy, c); R.rect(x - 3, y + 4, x + 3, y + 7, c); };
const PIELES = RA('#f2c49a', '#d8a070', '#a86a40', '#7a4a2a', '#f6d4b4');
const ROPA = RA('#c8303a', '#3a6ad8', '#3ac85a', '#f0c040', '#8a4ad8', '#e8e8ee', '#2a2a34', '#f08a2a');
'''

# ─────────────────────────────────────────────────────────────── gt-thompson ──
E['gt-thompson'] = ('Thompson', '''// GT-THOMPSON (frase 25), 2005 → 2008. Cuatro planos:
// 1. nuevayork/tribunal/tele (2005): el plató de noticias; la presentadora le da paso y Jack Thompson, tras la mesa, habla
//    a cámara; en «campaigning against these games» levanta una caja de juego genérica y la señala, enfadado; el piloto
//    rojo de la cámara late, un técnico cruza por delante con el cable. Corta en «and in the courts».
// 2. nuevayork/tribunal (o.florida, 2008): Thompson entra en la sala de Florida (palmeras por la ventana) y se planta
//    ante el estrado; en «2008» la barra salta a 2008; en «Florida Supreme Court» la jueza habla y le señala; él se queda
//    boquiabierto. Corta en «permanently».
// 3. (LOCAL) el estrado de cerca: la licencia enmarcada sobre el cartapacio verde; en «took away» la mano de la toga se
//    la lleva; en «law» el mazo baja y en el hueco queda una X roja. Lámpara de banquero, reloj de péndulo, libros.
// 4. (LOCAL) una fábrica de cajas: la prensa escupe cajas a la cinta, en la tele de la pared el mazo da paso a una caja;
//    en «the games kept coming» la cinta acelera y las cajas se amontonan en la carretilla; el operario se encoge.''', UTIL + r'''
const P2 = en('thompson', .366), P3 = en('thompson', .612), P4 = en('thompson', .826);
const jack = en('thompson', .132), campa = en('thompson', .228), juegos = en('thompson', .305), tv = en('thompson', .342);
const año08 = en('thompson', .469), corte = en('thompson', .537), supremo = en('thompson', .579);
const quita = en('thompson', .637), licencia = en('thompson', .699), ley = en('thompson', .76), siguen = en('thompson', .927), llegan = en('thompson', .965);
// ── 1: el plató ──
const p1 = (t) => {
  const o = { encuadre: 'tribunal', camara: 'tele' };
  T.nuevayork(R, t, o);
  // la presentadora le da paso; Thompson habla a cámara y en «campaigning» levanta la caja y la señala
  const caja = t > campa - 0.2 && t < juegos + 0.25, señala = t >= juegos + 0.25;
  R.actor(EL.presentador, 176, 151, t, { dir: -1, habla: t < jack - 0.3 && Math.sin(t * 8) > 0, dedo: t > 1.2 && t < jack, sonrisa: t >= jack });
  const th = R.actor(EL.abogadoThompson, 118, 151, t, { dir: 1, habla: t > jack + 0.2 && Math.sin(t * 9) > -0.2, enfado: t > campa, sostiene: caja ? [140, Math.round(lerp(134, 122, tramo(t, campa - 0.2, campa + 0.2)))] : false, dedo: señala });
  if (caja) T.PIEZAS_GT.cajaJuego(R, th.mano[0] + 2, th.mano[1] + 5, { color: '#c8303a' });
  if (señala) { R.icono('!', 146, 120 + (Math.sin(t * 10) > 0 ? -1 : 0), hex('#ff4a4a'), K, 2); }
  T.nuevayorkDelante(R, t, o);
  // el piloto rojo de las dos cámaras late: estamos en el aire
  const on = Math.sin(t * 6) > -0.3; for (const x of [40, 280]) { R.disco(x, 118, 2, K); R.pset(x, 118, on ? hex('#ff3a3a') : hex('#7a1e26')); if (on) R.halo(x, 118, 5, RA('#5a1a1a', '#a8302e', '#ff6a5a'), 0.6); }
  // el técnico de plató cruza por delante con el cable
  const u = tramo(t, 2.2, 6.6); if (u > 0 && u < 1) { const x = Math.round(lerp(-20, 340, u)); R.actor(EL.tecnico, x, 179, t, { dir: 1, anda: true, sostiene: true }); R.disco(x + 16, 168, 4, K); R.disco(x + 16, 168, 3, hex('#4a4856')); R.pset(x + 16, 168, hex('#c8c8d2')); R.linea(x - 40, 179, x + 13, 170, K); }
};
// ── 2: la sala de Florida ──
const p2 = (t) => {
  const o = { encuadre: 'tribunal', florida: true };
  T.nuevayork(R, t, o);
  const u = tramo(t, P2 + 0.1, P2 + 1.9), x = Math.round(lerp(-16, 118, u));
  R.actor(EL.juezaGT, 146, 100, t, { dir: -1, habla: t > corte - 0.2 && t < supremo + 0.4 && Math.sin(t * 9) > 0, dedo: t > supremo, enfado: t > supremo });
  R.actor(EL.guardia, 236, 158, t, { dir: -1 });
  R.actor(EL.oficinista, 276, 160, t, { dir: -1, habla: t < año08 && Math.sin(t * 5) > 0.5 });
  R.actor(EL.abogadoThompson, x, 158, t, { dir: 1, anda: u > 0 && u < 1, habla: u >= 1 && t < corte - 0.4 && Math.sin(t * 8) > 0, dedo: u >= 1 && t < corte - 0.6, sorpresa: t > supremo + 0.3 });
  T.nuevayorkDelante(R, t, o);
  if (t > supremo + 0.3) R.icono('!', 125, 118, hex('#ff4a4a'), K, 2);
};
// ── 3: el estrado de cerca (LOCAL) ──
const NOGAL = RA('#2a160c', '#3e2214', '#56301c', '#6e4024', '#8a5630');
const fondo3 = fijo(() => {
  // la pared de nogal en cuarterones
  relleno(0, 0, 319, 99, NOGAL, 1.2, 0.5, 3);
  for (const [x0, x1] of [[4, 66], [72, 134], [140, 186], [276, 316]]) { cuarteron(x0, 10, x1, 52, NOGAL); cuarteron(x0, 58, x1, 94, NOGAL); }
  R.rect(0, 0, 319, 7, NOGAL[1]); R.rect(0, 8, 319, 9, NOGAL[4]); R.rect(0, 10, 319, 10, NOGAL[0]); calma(NOGAL[1], NOGAL[2]);
  // la estantería de libros de leyes (lomos sin letras, con sus bandas doradas)
  R.rect(190, 8, 270, 98, K); R.rect(192, 10, 268, 96, NOGAL[0]);
  for (const yb of [36, 66, 96]) { R.rect(191, yb - 1, 269, yb, NOGAL[3]); let x = 194;
    while (x < 264) { const w = 4 + Math.floor(h(x, yb, 4) * 4), hh = 18 + Math.floor(h(x, yb, 5) * 7), c = RA('#7a1e26', '#2a4a7a', '#2a5a3a', '#6a4a2a', '#5a2a4a')[Math.floor(h(x, yb, 6) * 5)];
      if (x + w > 266) break; R.rect(x, yb - 1 - hh, x + w - 1, yb - 2, c); R.rect(x, yb - 1 - hh, x, yb - 2, mez(c, hex('#ffffff'), 0.25));
      R.rect(x, yb - hh + 3, x + w - 1, yb - hh + 3, hex('#d8b048')); R.rect(x, yb - 6, x + w - 1, yb - 6, hex('#d8b048')); x += w + (h(x, yb, 8) > 0.85 ? 3 : 0); } }
  // el canto del estrado y el tablero con vetas
  R.rect(0, 98, 319, 104, NOGAL[4]); R.rect(0, 98, 319, 98, hex('#b07848')); R.rect(0, 104, 319, 105, K);
  madera(0, 106, 319, 179, RA('#3a2010', '#4e2c16', '#66391c', '#7e4824', '#94582c'), 15, 2);
  // el cartapacio de cuero verde con el filete dorado
  R.rect(56, 112, 236, 172, K); relleno(57, 113, 235, 171, RA('#16301e', '#1e3e28', '#28503a', '#326246'), 1.6, 0.8, 9);
  R.rect(60, 116, 232, 116, hex('#a8883a')); R.rect(60, 168, 232, 168, hex('#a8883a')); R.rect(60, 116, 60, 168, hex('#a8883a')); R.rect(232, 116, 232, 168, hex('#a8883a'));
  // la marca más clara donde estaba la licencia
  baña(108, 122, 192, 162, hex('#4a7a5a'), 0.35);
  // el bloque con la placa dorada (sin letras: una estrella)
  R.rect(66, 100, 104, 112, K); R.rect(67, 101, 103, 111, NOGAL[3]); R.rect(70, 103, 100, 109, hex('#d8b048')); R.rect(70, 103, 100, 103, hex('#f6e08a')); estrella(85, 106, 3, hex('#8a6a20'));
  // la jarra de agua y el vaso, el bote de plumas y las carpetas
  R.rect(294, 112, 310, 144, K); R.rect(295, 114, 309, 143, hex('#bcd8e8')); R.rect(296, 124, 308, 142, hex('#8ab8d8')); R.rect(296, 114, 297, 142, hex('#e8f4fa')); R.rect(310, 120, 313, 132, K);
  R.rect(280, 128, 290, 146, K); R.rect(281, 129, 289, 145, hex('#d0e6f2')); R.rect(281, 135, 289, 145, hex('#9ac4e0'));
  R.rect(28, 118, 40, 134, K); R.rect(29, 119, 39, 133, hex('#3a3a46')); for (const [dx, c] of [[1, '#c8303a'], [4, '#f0f0f0'], [7, '#2a4a8a']]) { R.linea(29 + dx, 118, 27 + dx, 106, K); R.linea(30 + dx, 118, 28 + dx, 107, hex(c)); }
  for (let i = 0; i < 4; i++) { const y = 166 - i * 4, x = 244 + (i % 2) * 3; R.rect(x, y, x + 56, y + 4, K); R.rect(x + 1, y + 1, x + 55, y + 3, RA('#e8dcb0', '#c8a85a', '#e8e0c8', '#9ab4d8')[i]); R.rect(x + 1, y + 3, x + 55, y + 3, hex('#8a7a5a')); }
});
const LIC = { papel: hex('#f6eed6'), papelS: hex('#d8cca8'), oro: hex('#d8b048'), oroL: hex('#f6e08a'), oroS: hex('#8a6a20'), rojo: hex('#b8303a') };
const licencia_ = (x, y) => {
  // el marco dorado, el papel crema con la orla, la estrella, las rayas de texto y el sello con sus cintas
  R.rect(x - 1, y - 1, x + 84, y + 42, K); R.rect(x, y, x + 83, y + 41, LIC.oro); R.rect(x, y, x + 83, y, LIC.oroL); R.rect(x, y + 41, x + 83, y + 41, LIC.oroS);
  R.rect(x + 3, y + 3, x + 80, y + 38, LIC.papel); R.rect(x + 5, y + 5, x + 78, y + 36, LIC.papelS); R.rect(x + 6, y + 6, x + 77, y + 35, LIC.papel);
  estrella(x + 42, y + 11, 4, LIC.oroS); R.rect(x + 20, y + 16, x + 63, y + 17, hex('#3a3046'));
  for (const yy of [22, 26, 30]) R.rect(x + 12, y + yy, x + 52 - (yy === 30 ? 14 : 0), y + yy, hex('#8a8090'));
  R.disco(x + 66, y + 28, 6, K); R.disco(x + 66, y + 28, 5, LIC.rojo); R.disco(x + 66, y + 28, 3, hex('#e85a5a')); R.linea(x + 63, y + 33, x + 61, y + 39, LIC.rojo); R.linea(x + 69, y + 33, x + 71, y + 39, LIC.rojo);
};
const p3 = (t) => {
  fondo3();
  // el reloj de péndulo de la pared
  R.rect(144, 14, 176, 92, K); R.rect(145, 15, 175, 91, NOGAL[3]); R.disco(160, 30, 11, K); R.disco(160, 30, 10, hex('#f2ecd8')); for (let k = 0; k < 12; k++) R.pset(160 + Math.round(Math.cos(k * 0.5236) * 8), 30 + Math.round(Math.sin(k * 0.5236) * 8), K);
  R.linea(160, 30, 160 + Math.round(Math.cos(t * 0.6) * 6), 30 + Math.round(Math.sin(t * 0.6) * 6), K); R.linea(160, 30, 160, 23, K);
  R.rect(149, 46, 171, 88, hex('#1a0e08')); const a = Math.sin(t * 3.1) * 0.35, px = 160 + Math.round(Math.sin(a) * 30), py = 46 + Math.round(Math.cos(a) * 30);
  R.recorte([149, 46, 171, 88]); R.linea(160, 46, px, py, hex('#a8883a')); R.disco(px, py, 4, hex('#d8b048')); R.disco(px - 1, py - 1, 2, hex('#f6e08a')); R.recorte(null);
  // la lámpara de banquero con su pantalla verde y su luz
  R.rect(14, 60, 54, 70, K); R.poligono([[16, 70], [52, 70], [48, 60], [20, 60]], hex('#1e7a4a')); R.rect(20, 61, 48, 62, hex('#4ab878')); R.rect(32, 70, 35, 100, hex('#d8b048')); R.rect(24, 99, 44, 104, hex('#d8b048')); R.rect(24, 104, 44, 105, K);
  baña(0, 71, 130, 179, hex('#ffe8a0'), 0.22, (x, y) => Math.abs(x - 34) < 18 + (y - 71) * 0.9 ? cl(1 - Math.hypot(x - 34, y - 71) / 105) : 0);
  // la licencia: en «took away» la mano de la toga se la lleva por la derecha
  const q = tramo(t, quita - 0.05, quita + 0.6), dy = Math.round(q * q * 70);
  if (dy < 68) licencia_(108, 122 + dy);
  const llega = tramo(t, quita - 0.9, quita - 0.1);
  if (llega > 0 && q < 1) { const hx = 150, hy = Math.round(lerp(196, 164, llega)) + dy; T.brazo(R, hx + 22, hy + 34, hx + 4, hy + 4, '#1c1c24', -1, { sombra: false }); }
  // el mazo: se levanta, baja en «law» y vuelve a subir
  const M0 = 262, MY = 120, arriba = t < ley || t > ley + 0.6, entra = tramo(t, ley - 1.2, ley - 0.5);
  R.rect(M0 - 21, MY - 13, M0 + 21, MY - 7, K); R.rect(M0 - 20, MY - 12, M0 + 20, MY - 11, hex('#b07a40')); R.rect(M0 - 23, MY - 7, M0 + 23, MY, K); R.rect(M0 - 22, MY - 6, M0 + 22, MY - 1, hex('#6a4220')); R.rect(M0 - 22, MY - 6, M0 + 22, MY - 6, hex('#8a5a2a'));
  if (entra > 0) {
    const ox = Math.round((1 - entra) * 80);
    T.PIEZAS_GT.mazo(R, M0 + (arriba ? ox : 0), MY - 12, arriba ? { s: 3, base: false, arriba: true, dir: -1 } : { s: 3, base: false });
    const hx = (arriba ? M0 + 16 : M0 + 25) + (arriba ? ox : 0), hy = arriba ? MY - 26 : MY - 24;
    T.brazo(R, 334, hy - 18, hx + 12, hy, '#1c1c24', -1, { codo: [hx + 34, hy + 4] });
    if (!arriba) for (const [ex, ey] of [[-30, -8], [-34, 0], [30, 2], [-26, -16]]) R.pset(M0 + ex, MY + ey, hex('#f6e08a'));
  }
  // en el hueco, la X roja
  const x = tramo(t, ley + 0.15, ley + 0.4); if (x > 0) { const s = Math.round(lerp(10, 6, x)); R.icono('X', 150 - Math.round(2.5 * s), 142 - Math.round(2.5 * s), hex('#e83a3a'), hex('#5a1018'), s); }
  // el agua de la jarra tiembla con el golpe
  const tb = tramo(t, ley, ley + 0.8); if (tb > 0 && tb < 1) R.rect(296, 124 + Math.round(Math.sin(t * 40) * 1.5), 308, 124, hex('#e8f4fa'));
};
// ── 4: la fábrica de cajas (LOCAL) ──
const LAD = RA('#4a2418', '#6a3424', '#84442c', '#9a5436', '#b06a46');
const fondo4 = fijo(() => {
  // pared de ladrillo con juntas, hollín arriba
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 5), off = f % 2 ? 6 : 0, jx = (x + off) % 12 === 0, jy = y % 5 === 0;
    R.pset(x, y, jx || jy ? hex('#3a2a24') : tono(LAD, 2.2 + (h(Math.floor((x + off) / 12), f, 3) - 0.5) * 1.6 - (y < 30 ? (30 - y) / 20 : 0), x, y)); }
  // los ventanales de fábrica con su cuadrícula (el cielo se pinta en cada fotograma)
  for (const x0 of [16, 96]) { R.rect(x0 - 3, 22, x0 + 60, 80, hex('#2a2a30')); R.rect(x0 - 4, 80, x0 + 61, 83, hex('#8a8a92')); }
  // la tubería del techo con su válvula
  R.rect(0, 0, 319, 15, hex('#2a2224')); R.rect(0, 15, 319, 16, hex('#4a3a34')); calma(hex('#6a3424'), hex('#5a2c20'));
  R.rect(160, 86, 319, 91, K); R.rect(160, 87, 319, 89, hex('#7a8a96')); R.rect(160, 87, 319, 87, hex('#b8c8d2'));
  for (let x = 176; x < 320; x += 40) { R.rect(x, 85, x + 3, 92, hex('#4a5058')); }
  R.disco(190, 88, 4, K); R.disco(190, 88, 3, hex('#c8303a')); R.rect(189, 82, 191, 84, K);
  // el suelo de hormigón con manchas y las líneas amarillas
  relleno(0, 112, 319, 179, RA('#6a6a70', '#7c7c82', '#8e8e94', '#a0a0a6'), 1.8, 1.1, 5);
  for (let k = 0; k < 9; k++) R.disco(Math.floor(h(k, 1, 2) * 320), 130 + Math.floor(h(k, 2, 2) * 45), 2 + Math.floor(h(k, 3, 2) * 4), hex('#5e5e64'));
  for (let x = 0; x < 320; x++) if ((x >> 3) % 2) { R.pset(x, 170, hex('#e0b830')); R.pset(x, 171, hex('#e0b830')); }
  R.rect(0, 112, 319, 113, hex('#4a4a50'));
  // la prensa de cajas (izquierda): chapa con remaches, manómetros y la boca
  R.rect(0, 58, 62, 156, K); relleno(1, 59, 61, 155, RA('#3a5a7a', '#4a6a8a', '#5a7a9a', '#6a8aaa'), 1.6, 0.5, 6);
  for (let y = 62; y < 154; y += 10) for (const x of [4, 58]) R.pset(x, y, hex('#a8c0d8'));
  R.rect(8, 64, 54, 66, hex('#2a3a4a')); R.rect(40, 108, 62, 130, K); R.rect(41, 109, 62, 129, hex('#1a1a22'));
  for (const [cx, cy] of [[16, 80], [34, 80]]) { R.disco(cx, cy, 6, K); R.disco(cx, cy, 5, hex('#f2ecd8')); }
  // la carretilla de la derecha (palé) y una pila de cajas al fondo
  // cartones apilados delante a la izquierda, los bolardos amarillos, la rejilla del desagüe y la escoba
  for (const [x0, y0, w, hh] of [[80, 156, 30, 18], [112, 160, 26, 14], [86, 140, 22, 16]]) { R.rect(x0, y0, x0 + w, y0 + hh, K); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, hex('#b8864a')); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + 2, hex('#d8a868')); R.rect(x0 + w / 2 | 0, y0 + 1, (x0 + w / 2 | 0) + 1, y0 + hh - 1, hex('#e8d8a8')); R.rect(x0 + w - 2, y0 + 2, x0 + w - 1, y0 + hh - 1, hex('#8a5a2a')); }
  for (const x of [200, 236]) { R.rect(x, 150, x + 6, 172, K); R.rect(x + 1, 151, x + 5, 171, hex('#f0c040')); for (let y = 154; y < 170; y += 6) R.rect(x + 1, y, x + 5, y + 2, K); R.rect(x + 1, 151, x + 2, 171, hex('#f8e080')); }
  R.rect(160, 172, 184, 177, K); for (let x = 162; x < 183; x += 3) R.rect(x, 173, x + 1, 176, hex('#4a4a50'));
  R.linea(20, 176, 40, 132, K); R.linea(21, 176, 41, 132, hex('#a8743c')); R.rect(12, 172, 30, 178, K); R.rect(13, 173, 29, 177, hex('#c83a3a'));
  R.rect(262, 150, 318, 156, K); R.rect(263, 151, 317, 155, hex('#b08a4a')); for (const x of [266, 288, 310]) R.rect(x, 156, x + 4, 162, hex('#7a5a2a'));
});
const p4 = (t) => {
  fondo4();
  // el cielo por los ventanales, con nubes que pasan (recortado al hueco)
  for (const x0 of [16, 96]) { R.recorte([x0, 24, x0 + 57, 78]); for (let y = 24; y < 79; y++) R.linea(x0, y, x0 + 57, y, tono(RA('#5a8ad8', '#6a9ae0', '#80aee8', '#9ac0ee', '#b4d2f2'), (y - 24) / 12, x0, y));
    for (const [nx, ny, w, v] of [[0, 40, 26, 3], [120, 56, 20, 5], [60, 34, 16, 8]]) { const xx = x0 + ((nx + x0 + t * v) % 100) - 20; nube3(xx, ny, w, RA('#b8c4d8', '#e4eaf2', '#ffffff')); }
    R.recorte(null);
    for (let i = 0; i <= 3; i++) { R.rect(x0 + i * 19, 24, x0 + i * 19, 78, hex('#2a2a30')); } R.rect(x0, 50, x0 + 57, 51, hex('#2a2a30')); }
  // las lámparas industriales que se mecen con su cono de luz
  for (const [lx, k] of [[70, 0], [168, 1.3], [250, 2.1]]) { const sw = Math.round(Math.sin(t * 1.4 + k) * 2); R.linea(lx, 17, lx + sw, 30, K); R.poligono([[lx + sw - 8, 38], [lx + sw + 8, 38], [lx + sw + 3, 30], [lx + sw - 3, 30]], hex('#3a5a4a')); R.rect(lx + sw - 8, 38, lx + sw + 8, 38, hex('#5a8a6a')); R.rect(lx + sw - 3, 39, lx + sw + 3, 40, hex('#fff4c0'));
    baña(lx - 50, 40, lx + 50, 150, hex('#fff0c0'), 0.16, (x, y) => cl(1 - Math.abs(x - lx - sw) / (8 + (y - 40) * 0.42))); }
  // la tele de la pared: el mazo de la noticia y luego una caja
  R.rect(196, 38, 240, 68, K); R.rect(198, 40, 238, 64, hex('#1e2a50')); R.rect(214, 68, 220, 76, hex('#4a4856')); R.rect(200, 76, 236, 78, hex('#4a4856'));
  if (t < siguen) { T.PIEZAS_GT.mazo(R, 218, 60, { arriba: Math.sin(t * 5) > 0 }); } else { T.PIEZAS_GT.cajaJuego(R, 218, 64, { color: '#f0c040' }); R.disco(234, 44, 1, hex('#ff3a3a')); }
  R.rect(198, 40, 238, 40, hex('#4a6aa8'));
  // la prensa: el pistón que sube y baja y los pilotos
  const vel = t < siguen ? 1 : 2.6, fase = ((t - P4) * vel * 0.9) % 1, pis = Math.round(Math.abs(Math.sin(fase * Math.PI)) * 18);
  R.rect(46, 66, 56, 92 + pis, K); R.rect(47, 66, 55, 91 + pis, hex('#b8c8d2')); R.rect(42, 92 + pis, 60, 96 + pis, hex('#4a5058'));
  for (const [cx, cy, k] of [[16, 80, 0], [34, 80, 1]]) { const a = -2.4 + Math.sin(t * (2 + k) + k) * 0.6 + (vel > 1 ? 1.2 : 0); R.linea(cx, cy, cx + Math.round(Math.cos(a) * 4), cy + Math.round(Math.sin(a) * 4), hex('#c8303a')); }
  for (let k = 0; k < 3; k++) R.disco(14 + k * 9, 100, 2, Math.sin(t * 6 + k * 2) > 0 ? RA('#3ac85a', '#f0c040', '#ff3a3a')[k] : hex('#2a2a30'));
  // el operario detrás de la cinta coge cajas; en «kept coming» se encoge
  // la cinta transportadora: rodillos que giran y las cajas que avanzan
  R.rect(58, 116, 262, 122, K); R.rect(58, 117, 262, 119, hex('#3a3a42')); R.rect(58, 120, 262, 121, hex('#22222a'));
  const off = Math.floor((t - P4) * 20 * vel) % 8; for (let x = 60 - off; x < 262; x += 8) if (x > 58) R.pset(x, 118, hex('#6a6a74'));
  for (let x = 64; x < 262; x += 14) { R.disco(x, 126, 3, K); R.disco(x, 126, 2, hex('#8a8a94')); R.pset(x + Math.round(Math.cos(t * 9) * 1.5), 126 + Math.round(Math.sin(t * 9) * 1.5), hex('#2a2a30')); }
  for (const x of [70, 160, 250]) { R.rect(x, 128, x + 4, 162, K); R.rect(x + 1, 128, x + 3, 162, hex('#5a5a64')); }
  // las cajas sobre la cinta (a más velocidad al final)
  const dist = (tt) => 150 + (tt < siguen ? (tt - P4) * 26 : (siguen - P4) * 26 + (tt - siguen) * 26 * 2.6);
  const d = dist(t), cols = ['#c8303a', '#3a6ad8', '#f0c040', '#3ac85a', '#8a4ad8'];
  for (let k = 0; k < 40; k++) { const x = 52 + d - k * 26; if (x < 52 || x > 250) continue; T.PIEZAS_GT.cajaJuego(R, Math.round(x), 117, { color: cols[k % 5] }); }
  // las que ya llegaron, en la pila de la carretilla
  const n = Math.max(0, Math.floor((d - 198) / 26) + 1), pila = Math.min(n, 9);
  for (let k = 0; k < pila; k++) T.PIEZAS_GT.cajaJuego(R, 274 + (k % 3) * 18, 150 - Math.floor(k / 3) * 26, { color: cols[k % 5] });
  // el operario, delante de la cinta, apunta en su tablilla; en «kept coming» se queda boquiabierto
  const op = R.actor(EL.operario, 150, 162, t, { dir: 1, sostiene: t < siguen + 0.2, sorpresa: t > siguen + 0.3, brazos: t > llegan + 0.1 });
  if (t < siguen + 0.2) { const [mx, my] = op.mano; R.rect(mx - 3, my - 7, mx + 5, my + 4, K); R.rect(mx - 2, my - 6, mx + 4, my + 3, hex('#f2ecd8')); R.rect(mx - 2, my - 6, mx + 4, my - 5, hex('#8a6a3a')); for (let j = 0; j < 3; j++) R.rect(mx - 1, my - 3 + j * 2, mx + 3 - (j === 2 && Math.sin(t * 4) > 0 ? 2 : 0), my - 3 + j * 2, hex('#6a6478')); }
  // el mozo de delante se lleva cajas en brazos
  const w = tramo(t, P4 + 0.4, P4 + 2.6), ob = R.actor(EL.obrero, Math.round(lerp(330, 222, w)), 178, t, { dir: -1, anda: w > 0 && w < 1, sostiene: w > 0 && w < 1, sorpresa: t > siguen + 0.2, brazos: t > llegan });
  if (w > 0 && w < 1) cajaMini(ob.mano[0] - 1, ob.mano[1] + 5, '#3ac85a');
};
const año = (t) => t < año08 ? 2005 : 2008;
const efectos = [[juegos, 'golpecito'], [P2 + 0.2, 'puerta'], [quita + 0.1, 'papel'], [ley, 'toc'], [P4 + 0.3, 'maquina'], [siguen + 0.2, 'pop'], [llegan + 0.3, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

# ──────────────────────────────────────────────────────────────── gt-cuatro ──
E['gt-cuatro'] = ('Cuatro', '''// GT-CUATRO (frase 26), 2008 → 2013. Cuatro planos:
// 1. nuevayork/tienda/calle (2008): medianoche y nieve; la cola de aficionados ante el escaparate echa vaho, uno llega
//    corriendo a la cola; en «Grand Theft Auto IV» se abre la puerta, sale el dependiente con los brazos arriba y la cola
//    salta. Corta en «had sold».
// 2. (LOCAL) la doble puerta de cristal por dentro: el primero de la cola entra, el dependiente le da la caja desde la
//    mesa del mantel rojo, la levanta y salta; el letrero de leds de encima cuenta hasta 3,500,000 en «three and a half
//    million copies»; un flash; entran los siguientes y él sale hacia delante con su caja.
//    Corta en «and Guinness».
// 3. (LOCAL) un escenario con telón rojo: el juez del récord trae el trofeo y se lo da a Sam Houser en «record», que lo
//    levanta; Dan aplaude, flashes del público; en «24 hours» se enciende la esfera con el 24. Corta en «And five».
// 4. (LOCAL) una balda con las cajas 1, 2, 3 y 4; el calendario de la pared pasa hojas de 2008 a 2013; en «the fifth» una
//    mano coloca la caja 5, que brilla.''', UTIL + r'''
const P2 = en('cuatro', .294), P3 = en('cuatro', .574), P4 = en('cuatro', .843);
const año08 = en('cuatro', .111), gta4 = en('cuatro', .192), tres = en('cuatro', .368), copias = en('cuatro', .446), dia = en('cuatro', .528);
const record = en('cuatro', .63), veinte = en('cuatro', .791), horas = en('cuatro', .825), cinco = en('cuatro', .893), quinto = en('cuatro', .967);
// ── 1: la cola en la calle ──
const p1 = (t) => {
  const o = { encuadre: 'tienda', camara: 'calle', año: 2008 };
  T.nuevayork(R, t, o);
  // la puerta se abre y sale la luz de dentro
  const ab = tramo(t, gta4 - 0.2, gta4 + 0.3);
  if (ab > 0) { R.rect(133, 85, 159, 127, hex('#fff0b0')); R.rect(133, 85, 159, 88, hex('#ffe070')); const w = Math.round(lerp(26, 6, ab)); R.rect(133, 85, 133 + w, 127, hex('#5a7a9a')); R.rect(134, 86, 132 + w, 126, hex('#9ac0e0')); R.rect(133 + w, 85, 133 + w, 127, K);
    baña(118, 128, 176, 150, hex('#fff0b0'), 0.35 * ab, (x, y) => cl(1 - Math.abs(x - 146) / (14 + (y - 128) * 0.9))); }
  const salta = (k) => t > gta4 + 0.3 + k * 0.12 ? Math.max(0, Math.round(Math.sin((t - gta4 - k * 0.12) * 9) * 3)) : 0;
  const cola = [[EL.comprador1GT, 104], [EL.chico, 88], [EL.sudadera, 72], [EL.chica, 56], [EL.aficionado2005, 40]];
  cola.forEach(([d, x], k) => R.actor(d, x, 146, t, { dir: 1, habla: t < gta4 && Math.sin(t * 5 + k * 2) > 0.6, salto: t < E.duracion && t < P2 ? salta(k) : 0, brazos: t > gta4 + 0.5 && k % 2 === 0, sonrisa: t > gta4 }));
  // el que llega corriendo a la cola
  const u = tramo(t, 0.3, 2.2); R.actor(EL.senor30, Math.round(lerp(-18, 24, u)), 146, t, { dir: 1, anda: u > 0 && u < 1, salto: salta(5), sonrisa: t > gta4 });
  // el vaho de la cola
  for (let k = 0; k < 6; k++) { const f = ((t * 0.7 + k * 0.37) % 1), x = 120 - k * 16 + Math.round(f * 4), y = 124 - Math.round(f * 8); if (f < 0.7) R.pset(x, y, hex('#e8eef6')); }
  // el dependiente sale con los brazos arriba
  if (ab > 0.5) R.actor(EL.dependienteGT, 138, 146, t, { dir: -1, brazos: true, sonrisa: true });
  T.nuevayorkDelante(R, t, o);
};
// ── 2: la puerta de la tienda por dentro (LOCAL) ──
const fondo2 = fijo(() => {
  // la pared azul marino pintada, con el friso liso arriba y el zócalo de madera abajo
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#1e2a48', '#24324f', '#2a3a58', '#324262'), 1.6 + (h(x >> 2, y >> 2, 4) - 0.5) * 0.5 - (y < 16 ? 0.8 : 0), x, y));
  R.rect(0, 0, 319, 15, hex('#1a2440')); R.rect(0, 15, 319, 16, hex('#3a4a6e')); calma(hex('#2a3a58'), hex('#24324f'));
  R.rect(0, 112, 319, 132, hex('#5a3a20')); for (let x = 0; x < 320; x += 24) { R.rect(x + 2, 115, x + 21, 129, hex('#6e4826')); R.rect(x + 2, 115, x + 21, 115, hex('#8a5e32')); } R.rect(0, 111, 319, 112, hex('#a87444'));
  // el marco metálico de la doble puerta de cristal (dentro: la calle, en cada fotograma)
  R.rect(110, 44, 210, 134, K); R.rect(111, 45, 209, 133, hex('#8a92a0')); R.rect(111, 45, 209, 45, hex('#c8d0dc'));
  // los carteles sin letras de la derecha (un coche bajo la luna, un mando) y el de la izquierda (estrellas)
  for (const [x0, y0, w, hh, k] of [[226, 52, 40, 52, 0], [12, 30, 40, 30, 1]]) { R.rect(x0, y0, x0 + w, y0 + hh, K); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, hex('#f2ecd8'));
    for (let y = y0 + 3; y < y0 + hh - 2; y++) R.linea(x0 + 3, y, x0 + w - 3, y, tono(k ? RA('#3a1e5a', '#6a2a7a', '#c84a6a') : RA('#1e1a4a', '#3a2a6a', '#6a3a7a', '#c85a6a', '#f0a050'), (y - y0) / (hh / (k ? 3 : 5)), x0, y));
    if (!k) { R.disco(x0 + 28, y0 + 14, 5, hex('#f6e8b0')); R.rect(x0 + 8, y0 + 38, x0 + 30, y0 + 44, K); R.rect(x0 + 9, y0 + 39, x0 + 29, y0 + 43, hex('#c8303a')); R.disco(x0 + 13, y0 + 45, 3, K); R.disco(x0 + 26, y0 + 45, 3, K); }
    else for (const [sx, sy] of [[10, 8], [24, 14], [32, 6], [16, 20]]) { R.pset(x0 + sx, y0 + sy, hex('#f6e08a')); R.pset(x0 + sx - 1, y0 + sy, hex('#d8b048')); R.pset(x0 + sx + 1, y0 + sy, hex('#d8b048')); R.pset(x0 + sx, y0 + sy - 1, hex('#d8b048')); R.pset(x0 + sx, y0 + sy + 1, hex('#d8b048')); } }
  // el suelo de tablones cálidos y el felpudo con nieve delante de la puerta
  madera(0, 134, 319, 179, RA('#5a3a1e', '#6e4826', '#845830', '#9a6a3a', '#b07e48'), 9, 3);
  R.rect(108, 134, 212, 150, K); relleno(109, 135, 211, 149, RA('#3a3a42', '#4a4a52', '#5a5a62'), 1.2, 0.9, 6); for (let k = 0; k < 14; k++) R.pset(112 + Math.floor(h(k, 1, 4) * 96), 137 + Math.floor(h(k, 2, 4) * 11), hex('#e8eef6'));
  // la mesa plegable con el mantel rojo de pliegues y la pila de cajas
  R.rect(4, 126, 102, 132, K); R.rect(5, 127, 101, 131, hex('#c8303a')); R.rect(5, 127, 101, 127, hex('#f06a6a'));
  for (let y = 132; y < 164; y++) for (let x = 6; x < 101; x++) R.pset(x, y, tono(RA('#6a1018', '#8a1e26', '#a8282e', '#c8303a'), 2 + Math.sin(x * 0.5) * 1.1 - (y - 132) / 30, x, y));
  R.rect(5, 164, 101, 165, hex('#4a0c12'));
  // el recortable de cartón de un coche junto a la pared (sin letras)
  R.rect(236, 116, 300, 152, K); R.poligono([[240, 148], [242, 132], [256, 126], [282, 126], [294, 136], [296, 148]], hex('#c8303a')); R.rect(258, 128, 280, 136, hex('#8ac8e8')); R.disco(252, 149, 6, K); R.disco(252, 149, 3, hex('#8a8a96')); R.disco(284, 149, 6, K); R.disco(284, 149, 3, hex('#8a8a96')); R.rect(266, 152, 270, 170, hex('#a8885a'));
});
const p2 = (t) => {
  fondo2();
  // por los cristales: la calle nevada de noche, la fachada de enfrente y la cola que sigue fuera
  R.recorte([112, 46, 208, 132]);
  for (let y = 46; y < 133; y++) R.linea(112, y, 208, y, tono(RA('#0e1430', '#1a2244', '#262e58', '#323a66'), (y - 46) / 16, 112, y));
  R.rect(112, 60, 208, 110, hex('#3a2a2e')); for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) R.rect(116 + i * 16, 64 + j * 15, 123 + i * 16, 72 + j * 15, (i + j * 2 + Math.floor(t * 0.5)) % 5 ? hex('#f0d080') : hex('#2a2a3e'));
  R.rect(112, 110, 208, 132, hex('#d8e0ea'));
  const tx = Math.round(((t * 70) % 260) - 60), rc = (x0, y0, x1, y1, c) => R.rect(Math.max(112, x0), y0, Math.min(208, x1), y1, c); if (tx < 208 && tx + 30 > 112) { rc(tx, 116, tx + 30, 124, K); rc(tx + 1, 117, tx + 29, 123, hex('#f0c040')); rc(tx + 8, 113, tx + 22, 117, K); rc(tx + 9, 114, tx + 21, 116, hex('#8ac8e8')); }
  for (let k = 0; k < 9; k++) { const x = 196 - k * 10, y = 112 + Math.round(Math.sin(t * 2 + k) * 0.6); R.rect(x, y, x + 6, y + 16, ROPA[k % 8]); R.rect(x + 1, y - 6, x + 5, y - 1, PIELES[k % 5]); R.rect(x + 1, y - 7, x + 5, y - 6, ROPA[(k + 3) % 8]); }
  for (let k = 0; k < 26; k++) R.pset(112 + Math.round((k * 37 + t * 8) % 96), 46 + Math.round((k * 53 + t * 20) % 86), hex('#f0f4fa'));
  R.recorte(null);
  // la hoja derecha de la puerta, abierta hacia dentro, y el montante del medio
  R.rect(158, 46, 162, 132, K); R.rect(159, 46, 161, 132, hex('#c8d0dc'));
  R.rect(196, 48, 214, 134, K); R.rect(197, 49, 213, 133, hex('#6a8aa8')); R.rect(198, 50, 200, 132, hex('#a8c8e8')); R.rect(202, 88, 206, 92, hex('#c8c8d2'));
  // el letrero de leds sobre la puerta: cuenta las copias
  R.linea(100, 16, 100, 22, K); R.linea(220, 16, 220, 22, K); R.rect(84, 22, 236, 44, K); R.rect(86, 24, 234, 42, hex('#140a10'));
  for (let y = 25; y < 42; y += 2) for (let x = 87; x < 234; x += 2) R.pset(x, y, hex('#2a1018'));
  const n = Math.round(3500000 * (1 - (1 - tramo(t, tres - 0.1, copias)) ** 2.4)); R.numero(n.toLocaleString('en-US'), 160, 41, { tam: 16, centro: true, rampa: RA('#ff8a6a', '#ff5a3a', '#e8302a', '#a81818') });
  // el dependiente detrás de la mesa con las cajas; le da una al que entra
  const dep = R.actor(EL.dependienteGT, 64, 142, t, { dir: 1, sostiene: t > P2 + 0.2 && t < P2 + 1.25 ? [Math.round(lerp(70, 96, tramo(t, P2 + 0.4, P2 + 1.1))), 120] : false, sonrisa: true, brazos: t > copias && t < copias + 0.8, habla: t > P2 + 1.3 && t < tres && Math.sin(t * 9) > 0 });
  if (t > P2 + 0.2 && t < P2 + 1.25) cajaMini(dep.mano[0], dep.mano[1] + 5, '#c8303a');
  for (let k = 0; k < 3; k++) T.PIEZAS_GT.cajaJuego(R, 16 + k * 12, 127 - (k % 2) * 3, { color: ['#3a6ad8', '#f0c040', '#3ac85a', '#8a4ad8'][k] });
  // el primero de la cola entra por la puerta, coge la caja, la levanta, salta y se va hacia delante
  const entra = tramo(t, P2 - 0.2, P2 + 0.9), coge = t > P2 + 1.2, vete = tramo(t, copias + 0.5, dia + 0.5);
  const cx = Math.round(vete > 0 ? lerp(104, 330, vete) : lerp(170, 104, entra)), cy = Math.round(vete > 0 ? lerp(156, 178, vete) : lerp(146, 156, entra));
  const sal = t > tres && t < copias + 0.4 ? Math.max(0, Math.round(Math.sin((t - tres) * 8) * 4)) : 0;
  // los siguientes entran detrás
  [[EL.chico, 0], [EL.sudadera, 1]].forEach(([d, k]) => { const u = tramo(t, copias + 0.2 + k * 0.6, dia + 0.4 + k * 0.5); const x = Math.round(lerp(182 + k * 10, 130 - k * 26, u)), y = Math.round(lerp(144, 152 + k * 4, u)); R.actor(d, x, y, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: true }); });
  const cp = R.actor(EL.comprador1GT, cx, cy, t, { dir: vete > 0 ? 1 : -1, anda: (entra > 0 && entra < 1) || (vete > 0 && vete < 1), salto: sal, sostiene: coge ? (vete > 0 ? true : [cx + 16, 132 - sal]) : false, sonrisa: coge });
  if (coge) cajaMini(cp.mano[0], cp.mano[1] + 5, '#c8303a');
  // la fotógrafa con su flash
  const fl = t - (copias + 0.4), fo = R.actor(EL.senora30, 286, 172, t, { dir: -1, sostiene: true, sonrisa: fl > 0 });
  { const [mx, my] = fo.mano; R.rect(mx - 4, my - 4, mx + 3, my + 1, K); R.rect(mx - 3, my - 3, mx + 2, my, hex('#4a4856')); R.pset(mx - 3, my - 2, hex('#a8d8f0')); R.rect(mx - 1, my - 6, mx + 1, my - 5, K);
    if (fl > 0 && fl < 0.25) R.halo(mx, my - 4, 30, RA('#a8a8b8', '#e8e8f0', '#ffffff'), 1.4); }
};
// ── 3: el escenario del récord (LOCAL) ──
const TEL = RA('#3a0a10', '#5a121a', '#7a1a22', '#9a2430', '#b8323e');
const fondo3 = fijo(() => {
  // el telón rojo con sus pliegues
  for (let y = 0; y < 116; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(TEL, 2.1 + Math.sin(x * 0.42) * 1.4 + Math.sin(x * 0.11 + 1) * 0.5 - (y > 100 ? (y - 100) / 10 : 0), x, y));
  R.rect(0, 0, 319, 15, hex('#4a0e14')); R.rect(0, 15, 319, 16, hex('#2a080c')); for (let x = 0; x < 320; x += 4) { R.rect(x, 17, x + 1, 19, hex('#d8b048')); R.pset(x + 2, 18, hex('#a8883a')); }
  calma(hex('#6a161e'), hex('#5a121a'));
  // el panel del fondo con la esfera del reloj y las estrellas
  R.disco(160, 62, 38, K); R.disco(160, 62, 37, hex('#1e1a3a')); R.disco(160, 62, 33, hex('#2a2450'));
  for (const [x, y] of [[96, 30], [224, 30], [90, 92], [230, 92], [118, 18], [204, 18]]) { R.pset(x, y, hex('#f6e08a')); R.pset(x - 1, y, hex('#d8b048')); R.pset(x + 1, y, hex('#d8b048')); R.pset(x, y - 1, hex('#d8b048')); R.pset(x, y + 1, hex('#d8b048')); }
  // el suelo del escenario: tablas con brillo
  madera(0, 116, 319, 150, RA('#3a2412', '#5a3a1e', '#7a522a', '#9a6a36', '#b88a4e'), 7, 4);
  R.rect(0, 150, 319, 155, K); R.rect(0, 151, 319, 153, hex('#2a1a10'));
  // la fila del público y los fotógrafos, en penumbra
  R.rect(0, 156, 319, 179, hex('#14101e'));
});
const p3 = (t) => {
  fondo3();
  // la esfera: 24 marcas que se encienden hasta «24 hours»; el 24 brilla
  const enc = tramo(t, veinte - 1.2, horas);
  for (let k = 0; k < 24; k++) { const a = -Math.PI / 2 + k * Math.PI / 12, on = k / 24 < enc; const x = 160 + Math.round(Math.cos(a) * 29), y = 62 + Math.round(Math.sin(a) * 29); R.disco(x, y, 2, on ? hex('#f6e08a') : hex('#4a4070')); if (on) R.pset(x, y, hex('#ffffff')); }
  R.numero('24', 160, 70, { tam: 16, centro: true, rampa: t > veinte ? undefined : RA('#4a4070', '#5a5080', '#6a6090', '#3a3060') });
  if (t > veinte) R.halo(160, 62, 26, RA('#3a3060', '#8a7a4a', '#f6e08a'), 0.5 + 0.3 * Math.sin(t * 8));
  // los focos que barren el escenario
  for (const [fx, fy, k] of [[8, 40, 0], [312, 60, 1]]) { const cx = 160 + Math.sin(t * 0.9 + k * 2) * 40; baña(0, fy, 319, 150, hex('#fff6d0'), 0.22, (x, y) => { const u = (y - fy) / (150 - fy), mx = lerp(fx, cx, u); return Math.abs(x - mx) < 3 + u * 24 ? 1 : 0; }); R.rect(fx - 6, fy - 4, fx + 6, fy + 3, K); R.rect(fx - 5, fy - 3, fx + 5, fy + 2, hex('#4a4856')); R.rect(fx - 5, fy + 2, fx + 5, fy + 2, hex('#fff6d0')); }
  // las candilejas
  for (let x = 10; x < 320; x += 22) { R.rect(x, 151, x + 6, 153, hex('#f6e08a')); R.halo(x + 3, 150, 6, RA('#5a3a1e', '#a8883a', '#f6e08a'), 0.5); }
  // el juez del récord trae el trofeo y se lo da a Sam en «record»
  const u = tramo(t, P3 + 0.05, record - 0.15), da = t > record;
  const jx = Math.round(lerp(-18, 136, u)) - Math.round(tramo(t, record + 0.6, record + 1.6) * 30);
  const sube = tramo(t, record + 0.1, record + 0.6), sam = 168;
  R.actor(EL.danHouser, 202, 142, t, { dir: -1, brazos: da && Math.sin(t * 12) > 0, sonrisa: true });
  const sm = R.actor(EL.samHouser, sam, 142, t, { dir: -1, sostiene: da ? [sam + 2, Math.round(lerp(124, 98, sube))] : false, sonrisa: da, habla: !da && t > P3 + 1 && Math.sin(t * 8) > 0.3 });
  const ju = R.actor(EL.oficinista, jx, 142, t, { dir: u < 1 || !da ? 1 : -1, anda: (u > 0 && u < 1) || (t > record + 0.6 && t < record + 1.6), sostiene: !da, sonrisa: true });
  const [tx, ty] = da ? sm.mano : ju.mano; T.PIEZAS_GT.trofeo(R, tx, ty + (da ? 4 : 10), {});
  if (da) for (let k = 0; k < 4; k++) { const a = t * 4 + k * 1.57; R.pset(tx + Math.round(Math.cos(a) * 12), ty - 4 + Math.round(Math.sin(a) * 9), hex('#fff6c0')); }
  // el público y los fotógrafos con sus flashes
  for (let k = 0; k < 22; k++) { const x = 8 + k * 14 + (k % 2) * 4, y = 162 + (k % 3); cabecita(x, y, mez(ROPA[k % 8], K, 0.55), mez(PIELES[k % 5], K, 0.5), t * (da ? 2 : 0.5), k); }
  for (let k = 0; k < 5; k++) { const ft = (t * 1.3 + k * 0.53) % 1.7; if (t > record + 0.3 && ft < 0.1) R.halo(30 + k * 62, 160, 14, RA('#a8a8b8', '#e8e8f0', '#ffffff'), 1.3); }
};
// ── 4: la balda con las cajas (LOCAL) ──
const fondo4 = fijo(() => {
  // el papel pintado de rayas con rombos
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const r = (x % 16) < 8, rombo = Math.abs(((x + 4) % 16) - 8) + Math.abs((y % 16) - 8) < 2;
    R.pset(x, y, rombo ? hex('#b8946a') : tono(r ? RA('#e8d4b0', '#f0dcb8', '#f4e4c4') : RA('#dcc4a0', '#e4ccaa', '#ecd6b4'), 1.2 + (h(x >> 2, y >> 2, 3) - 0.5) * 0.5, x, y)); }
  R.rect(0, 0, 319, 15, hex('#c8a87a')); R.rect(0, 15, 319, 16, hex('#8a6a4a')); calma(hex('#e8d4b0'), hex('#e0caa6'));
  // el cuadro (un paisaje de costa, sin letras)
  R.rect(116, 22, 168, 62, hex('#8a5a2a')); R.rect(118, 24, 166, 60, K); for (let y = 25; y < 60; y++) R.linea(119, y, 165, y, tono(RA('#6a9ae0', '#8ab4ea', '#f0c890', '#e8a060'), (y - 25) / 9, 119, y));
  R.disco(150, 46, 5, hex('#fff0b0')); R.rect(119, 48, 165, 59, hex('#3a6aa8')); for (let x = 120; x < 165; x += 5) R.pset(x, 52 + (x % 3), hex('#a8d0f0')); R.poligono([[119, 50], [140, 40], [150, 50]], hex('#4a7a4a'));
  // el aparador de madera con dos puertas y sus tiradores
  madera(108, 122, 314, 176, RA('#4a2a14', '#6a3e1e', '#8a5228', '#a86a34', '#c08448'), 9, 5);
  R.rect(108, 116, 316, 122, K); R.rect(108, 116, 316, 120, hex('#a86a34')); R.rect(108, 116, 316, 116, hex('#d8a060'));
  for (const x0 of [114, 214]) { R.rect(x0, 128, x0 + 94, 170, K); R.rect(x0 + 1, 129, x0 + 93, 169, hex('#7a4a22')); R.rect(x0 + 4, 132, x0 + 90, 166, hex('#8a5a2a')); R.rect(x0 + 4, 132, x0 + 90, 132, hex('#b07a40')); R.disco(x0 + (x0 < 200 ? 88 : 6), 150, 2, hex('#d8b048')); }
  R.rect(112, 176, 120, 179, K); R.rect(302, 176, 310, 179, K);
  // el suelo de tarima
  madera(0, 176, 319, 179, RA('#5a3a20', '#7a5230', '#9a6a3e'), 4, 6); R.rect(0, 126, 107, 175, hex('#d8c0a0')); madera(0, 128, 107, 179, RA('#5a3a20', '#7a5230', '#9a6a3e', '#b07e4a'), 8, 7); R.rect(0, 126, 107, 127, hex('#8a6a4a'));
});
const p4 = (t) => {
  fondo4();
  // el calendario de la pared pasa hojas de 2008 a 2013
  const pa = tramo(t, P4 + 0.3, cinco + 0.5), año = 2008 + Math.min(5, Math.floor(pa * 5.999));
  R.rect(34, 20, 88, 84, K); R.rect(35, 21, 87, 83, hex('#f6f2e6')); R.rect(35, 21, 87, 34, hex('#c8303a')); R.rect(35, 34, 87, 34, hex('#8a1e26'));
  for (const x of [44, 60, 76]) { R.rect(x, 17, x + 2, 23, K); R.pset(x + 1, 18, hex('#c8c8d2')); }
  R.numero(String(año), 61, 31, { tam: 8, centro: true, color: hex('#ffffff') });
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) R.rect(38 + i * 7, 38 + j * 9, 42 + i * 7, 43 + j * 9, (j * 7 + i) === 18 ? hex('#c8303a') : hex('#d8d0c0'));
  // las hojas que salen volando
  for (let k = 0; k < 5; k++) { const v = tramo(t, P4 + 0.3 + k * (cinco + 0.2 - P4) / 5, P4 + 1.3 + k * (cinco + 0.2 - P4) / 5); if (v <= 0 || v >= 1) continue;
    const x = 40 + Math.round(v * 70 + Math.sin(v * 9 + k) * 6), y = 24 + Math.round(v * v * 120), w = Math.round(16 * Math.abs(Math.cos(v * 7 + k)));
    R.rect(x - w, y, x + w, y + 12, K); if (w > 1) R.rect(x - w + 1, y + 1, x + w - 1, y + 11, hex('#f6f2e6')); if (w > 2) R.rect(x - w + 1, y + 1, x + w - 1, y + 3, hex('#c8303a')); }
  // la planta de la esquina que se mece y la lámpara de pie
  R.rect(14, 150, 40, 176, K); R.rect(15, 151, 39, 175, hex('#c86a3a')); R.rect(15, 151, 39, 154, hex('#e88a5a'));
  for (let k = 0; k < 7; k++) { const a = -1.9 + k * 0.45 + Math.sin(t * 1.3 + k) * 0.06; const L = 22 + (k % 3) * 6; R.linea(27, 151, 27 + Math.round(Math.cos(a) * L), 151 + Math.round(Math.sin(a) * L), hex('#2a6a3a')); R.disco(27 + Math.round(Math.cos(a) * L), 151 + Math.round(Math.sin(a) * L), 3, hex('#3a8a4a')); R.pset(27 + Math.round(Math.cos(a) * L) - 1, 150 + Math.round(Math.sin(a) * L), hex('#6ac87a')); }
  R.rect(84, 60, 86, 176, K); R.rect(78, 174, 92, 176, K); R.poligono([[74, 62], [96, 62], [90, 48], [80, 48]], hex('#f0d8a0')); R.halo(85, 64, 26, RA('#e8d4b0', '#f6e4c0', '#fff4d8'), 0.5);
  // el gato del aparador
  T.gato(R, 126, 115, t, { dir: 1 });
  // las cajas 1–4 y la 5 que llega en la mano
  const CC = [['#3a6ad8', '#24449a'], ['#3ac85a', '#2a8a3a'], ['#c8303a', '#8a1e26'], ['#8a4ad8', '#5a2a9a'], ['#f0c040', '#a87a18']];
  for (let k = 0; k < 4; k++) cajaN(150 + k * 30, 86, k + 1, hex(CC[k][0]), hex(CC[k][1]), k);
  const ll = tramo(t, quinto - 0.9, quinto - 0.05), x5 = Math.round(lerp(334, 270, 1 - (1 - ll) ** 2)), suelta = t > quinto + 0.25;
  if (ll > 0) cajaN(x5, 86 - Math.round(Math.sin(ll * Math.PI) * 6), 5, hex(CC[4][0]), hex(CC[4][1]), 4);
  if (ll > 0) { const vuelve = tramo(t, quinto + 0.25, quinto + 0.9), hx = x5 + 22 + Math.round(vuelve * 80); if (vuelve < 1) T.brazo(R, Math.max(332, hx + 36), 126, hx + 4, 102, '#3a4a6a', -1, { codo: [Math.max(318, hx + 24), 118] }); }
  if (t > quinto) { const b = tramo(t, quinto, quinto + 1.2); for (let k = 0; k < 8; k++) { const a = k * 0.785 + b, r = 16 + b * 14; R.pset(281 + Math.round(Math.cos(a) * r), 100 + Math.round(Math.sin(a) * r * 0.8), hex('#fff6c0')); }
    R.halo(281, 100, 22, RA('#e8d4b0', '#f6e08a', '#fff6c0'), 0.6 * (1 - b)); }
};
const año = (t) => t < P4 + 0.3 ? 2008 : 2008 + Math.min(5, Math.floor(tramo(t, P4 + 0.3, cinco + 0.5) * 5.999));
const efectos = [[0.6, 'viento'], [gta4, 'puerta'], [gta4 + 0.4, 'publico'], [P2 + 1.0, 'campana'], [copias + 0.4, 'flash'], [record, 'publico'], [record + 1.2, 'flash'], [veinte, 'brillo'], [P4 + 0.5, 'papel'], [quinto, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

# ───────────────────────────────────────────────────────────────── gt-cinco ──
E['gt-cinco'] = ('Cinco', '''// GT-CINCO (frases 27–28), cartela «2013»; 2013 → 2026. Cinco planos:
// 1. nuevayork/tienda (o.año 2013): medianoche en la tienda, la clientela espera con los móviles y la cola de fuera
//    echa vaho; en «5» el dependiente levanta el dedo, en «came out» salta la fiesta (guirnaldas y confeti), las cajas
//    vuelan de la pirámide a las manos y la clientela salta. Corta en «According».
// 2. (LOCAL, gag 7) la caja registradora de cerca, sobre un mostrador de madera ante una pared de ladrillo: la mano del
//    dependiente teclea sin parar, las cajas vendidas pasan por detrás, la cifra cuenta hasta 11,000,000 en «11 million copies» y la caja echa cada vez más humo; en «first
//    day» se le abre el cajón de golpe y suelta una bocanada. Corta en «and in just three days».
// 3. (LOCAL) un estadio de noche: una carrera de cochecitos con una bobina de cine, un libro, otro mando y nuestra caja;
//    el marcador del día pasa 1, 2, 3 y la cifra sube; en «billion» nuestra caja cruza la meta (destello, confeti, la
//    grada salta); la película, el libro y el otro juego llegan en «movie», «book» y «game». Corta en «And it didn't stop».
// 4. hoy/records: la montaña de cajas crece hasta el techo de cristal mientras el contador rueda hasta 235,000,000 en
//    «235 million copies»; dos aficionados miran hacia arriba boquiabiertos, el del récord señala el contador y saltan
//    al final; la barra pasa de 2013 a 2026 en «10 years later». Corta en «Few things».
// 5. (LOCAL) una sala de museo con la gráfica de cerca: las barras del cine, el libro, el disco y el móvil suben un poco;
//    la de la caja sube hasta arriba en «that many», con su estrella; unos visitantes la señalan y se asombran.''', UTIL + r'''
const P2 = en('cinco', .335), P3 = en('cinco', .634), P4 = en('cinco', 1), P5 = en('copias', .598);
const sale5 = en('cinco', .232), sale = en('cinco', .264), once = en('cinco', .461), copias = en('cinco', .511), dia = en('cinco', .593);
const tres = en('cinco', .657), dias = en('cinco', .678), billon = en('cinco', .748), peli = en('cinco', .883), libro = en('cinco', .928), juego = en('cinco', .964);
const paro = en('copias', .047), diez = en('copias', .135), tarde = en('copias', .222), n235 = en('copias', .368), millon = en('copias', .54);
const pocos = en('copias', .657), tantos = en('copias', .929);
// ── 1: la tienda a medianoche ──
const p1 = (t) => {
  const o = { encuadre: 'tienda', año: 2013, fiesta: tramo(t, sale, sale + 0.6), humo: tramo(t, sale + 0.3, P2), t };
  T.nuevayork(R, t, o);
  const salta = (k) => t > sale + 0.15 + k * 0.1 ? Math.max(0, Math.round(Math.sin((t - sale - k * 0.1) * 9) * 3)) : 0;
  // la clientela de dentro, con los móviles; al salir el juego, las cajas les vuelan a las manos
  const cl_ = [[EL.comprador2GT, 146, '#c8303a'], [EL.chica, 126, '#3a6ad8'], [EL.chico, 106, '#f0c040'], [EL.sudadera, 86, '#3ac85a'], [EL.senor30, 66, '#8a4ad8']];
  cl_.forEach(([d, x, c], k) => { const tiene = t > sale + 0.5 + k * 0.18;
    const a = R.actor(d, x, 168, t, { dir: 1, salto: salta(k), sostiene: tiene || (t < sale && k % 2 === 0), sonrisa: t > sale, habla: t < sale && Math.sin(t * 4 + k) > 0.7, sorpresa: t > sale && !tiene });
    if (tiene) cajaMini(a.mano[0], a.mano[1] + 5, c, k);
    else if (t < sale && k % 2 === 0) { const [mx, my] = a.mano; R.rect(mx - 1, my - 5, mx + 2, my + 1, K); R.rect(mx, my - 4, mx + 1, my, Math.sin(t * 3 + k) > 0 ? hex('#8ae0f0') : hex('#4a9ab8')); } });
  // las cajas que vuelan de la pirámide hacia cada mano
  for (let k = 0; k < 5; k++) { const v = tramo(t, sale + 0.1 + k * 0.18, sale + 0.5 + k * 0.18); if (v <= 0 || v >= 1) continue; const x1 = cl_[k][1] + 15, x = lerp(36, x1, v), y = lerp(112, 150, v) - Math.sin(v * Math.PI) * 34; cajaMini(x, y, cl_[k][2], k); }
  // el dependiente mira el reloj, levanta el dedo en «5» y los brazos en «came out»
  R.actor(EL.dependienteGT, 204, 160, t, { dir: -1, dedo: t > sale5 - 0.2 && t < sale, brazos: t > sale, sonrisa: t > sale, habla: t < sale5 - 0.4 && Math.sin(t * 6) > 0.4 });
  T.nuevayorkDelante(R, t, o);
};
// ── 2: la caja registradora de cerca (LOCAL, gag 7) ──
const fondo2 = fijo(() => {
  // la pared de ladrillo de la trastienda, con el friso liso arriba
  for (let y = 16; y < 104; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 6), off = f % 2 ? 7 : 0, jx = (x + off) % 14 === 0, jy = y % 6 === 0;
    R.pset(x, y, jx || jy ? hex('#4a3a34') : tono(RA('#6a3424', '#7e402c', '#924c34', '#a65a3e'), 1.8 + (h(Math.floor((x + off) / 14), f, 5) - 0.5) * 1.4, x, y)); }
  R.rect(0, 0, 319, 15, hex('#3a2a26')); R.rect(0, 15, 319, 16, hex('#6a4a3a'));
  calma(hex('#7e402c'), hex('#6a3424'));
  // el cartel sin letras (palmera y sol), el corcho con tiques y fotos, el reloj que pasa de las doce
  R.rect(18, 30, 70, 82, K); R.rect(19, 31, 69, 81, hex('#f2ecd8')); for (let y = 33; y < 80; y++) R.linea(21, y, 67, y, tono(RA('#f0a050', '#e86a5a', '#a83a6a', '#4a2a6a'), (y - 33) / 12, 21, y));
  R.disco(44, 62, 8, hex('#ffd060')); R.rect(21, 66, 67, 79, hex('#2a1e3a')); R.linea(32, 79, 34, 50, K); for (const d of [-8, -4, 4, 8]) R.linea(34, 50, 34 + d, 54 + Math.abs(d) / 3, hex('#1a1424'));
  R.rect(86, 34, 150, 80, K); relleno(87, 35, 149, 79, RA('#a8783a', '#b88848', '#c89858'), 1.2, 1.2, 8);
  for (const [x, y, w, hh, c] of [[92, 40, 14, 18, '#f6f2e6'], [110, 38, 18, 12, '#f6e890'], [132, 44, 12, 16, '#8ac8e8'], [96, 62, 20, 12, '#f6f2e6'], [122, 60, 16, 14, '#f0a0c8']]) { R.rect(x, y, x + w, y + hh, K); R.rect(x + 1, y + 1, x + w - 1, y + hh - 1, hex(c)); for (let j = y + 4; j < y + hh - 1; j += 3) R.rect(x + 3, j, x + w - 3, j, hex('#a8a4b0')); R.disco(x + w / 2 | 0, y + 1, 1, hex('#c8303a')); }
  R.disco(176, 46, 12, K); R.disco(176, 46, 11, hex('#f2ecd8')); for (let k = 0; k < 12; k++) R.pset(176 + Math.round(Math.cos(k * 0.5236) * 9), 46 + Math.round(Math.sin(k * 0.5236) * 9), K); R.linea(176, 46, 176, 38, K); R.linea(176, 46, 177, 39, K);
  // el tablero del mostrador de madera oscura y la alfombrilla verde de la caja
  R.rect(0, 102, 319, 106, K); R.rect(0, 103, 319, 104, hex('#8a5630'));
  madera(0, 106, 319, 179, RA('#2a160c', '#3e2214', '#56301c', '#6e4024', '#8a5630'), 12, 9);
  R.rect(150, 150, 260, 179, K); relleno(151, 151, 259, 179, RA('#16301e', '#1e3e28', '#28503a'), 1.4, 0.8, 4);
  // las bolsas, la pila de cajas, el rollo de tiques y el bote de bolis
  R.rect(14, 112, 46, 140, K); R.rect(15, 113, 45, 139, hex('#f2ecd8')); R.rect(15, 113, 45, 116, hex('#d8d0bc')); R.rect(22, 106, 25, 113, K); R.rect(34, 106, 37, 113, K); R.disco(30, 127, 4, hex('#c8303a')); R.disco(30, 127, 2, hex('#f2ecd8'));
  for (let k = 0; k < 3; k++) T.PIEZAS_GT.cajaJuego(R, 66 + k * 7, 150 - k * 5, { color: ['#3a6ad8', '#f0c040', '#3ac85a'][k] });
  R.rect(272, 128, 290, 146, K); R.rect(273, 129, 289, 145, hex('#f6f2e6')); R.rect(276, 132, 286, 142, hex('#c8c0b0')); R.disco(281, 137, 3, hex('#8a8090'));
  R.rect(298, 120, 310, 146, K); R.rect(299, 121, 309, 145, hex('#3a3a46')); for (const [dx, c] of [[1, '#c8303a'], [5, '#3a6ad8'], [9, '#f0c040']]) { R.linea(299 + dx, 120, 297 + dx, 110, K); R.linea(300 + dx, 120, 298 + dx, 111, hex(c)); }
});
const p2 = (t) => {
  fondo2();
  // el neón del mando que parpadea
  const on = Math.sin(t * 7) > -0.6; R.rect(212, 34, 256, 56, K); R.rect(213, 35, 255, 55, hex('#1a1424')); const nc = on ? hex('#4af0f0') : hex('#1e5a5a');
  R.rect(222, 41, 246, 47, nc); R.rect(220, 43, 222, 51, nc); R.rect(246, 43, 248, 51, nc); R.pset(227, 44, K); R.pset(241, 43, K); R.pset(243, 45, K); if (on) R.halo(234, 45, 22, RA('#1a1424', '#1e5a5a', '#4af0f0'), 0.35);
  // la caja registradora (abajo, sobre la alfombrilla): tiembla y echa más humo cuanto más vende
  const hu = tramo(t, P2 + 0.3, dia), sac = t > dia ? Math.round(Math.sin(t * 50) * 1) : hu > 0.5 ? Math.round(Math.sin(t * 40) * (hu > 0.8 ? 1 : 0.6)) : 0;
  const cx = 204 + sac, cy = 178;
  // el humo grande que sube en bocanadas y se va hacia la izquierda (detrás de la caja)
  for (let k = 0; k < 9; k++) { const f = ((t * 0.55 + k / 9) % 1), r = (3 + f * 13) * (0.4 + hu * 0.9) * (t > dia ? 1.5 : 1); if (hu <= 0.05 || f * 9 > 3 + hu * 6) continue;
    const x = cx + 8 + Math.round(Math.sin(f * 5 + k) * 6 - f * 40), y = Math.max(30, cy - 64 - Math.round(f * 80 * (0.6 + hu * 0.5)));
    nube3(x, y, Math.round(r * 2), RA('#6a6a78', '#9a9aa8', '#c8c8d2')); }
  T.PIEZAS_GT.cajaRegistradora(R, cx, cy, { s: 3, t });
  // la cifra que cuenta, por delante del humo
  const n = Math.round(11000000 * (1 - (1 - tramo(t, once - 0.6, copias)) ** 2)); R.numero(n.toLocaleString('en-US'), 120, 98, { tam: 16, centro: true });
  // el cajón que se abre de golpe en «first day», con los billetes que saltan
  const ca = tramo(t, dia, dia + 0.15);
  if (ca > 0) { const dy = Math.round(ca * 8), y0 = cy - 14 + dy; R.rect(cx - 30, y0, cx + 30, Math.min(179, y0 + 12), K); R.rect(cx - 29, y0 + 1, cx + 29, Math.min(179, y0 + 11), hex('#8c90a4')); for (let k = 0; k < 5; k++) { R.rect(cx - 26 + k * 11, y0 + 2, cx - 18 + k * 11, y0 + 6, hex('#5ac83a')); R.rect(cx - 26 + k * 11, y0 + 2, cx - 18 + k * 11, y0 + 2, hex('#9ae08a')); }
    for (let k = 0; k < 6; k++) { const v = tramo(t, dia + 0.05 + k * 0.05, dia + 0.7 + k * 0.05); if (v > 0 && v < 1) { const bx = cx - 20 + k * 8 + Math.round(Math.sin(v * 6 + k) * 6), by = cy - 20 - Math.round(v * 60) + Math.round(v * v * 40); R.rect(bx, by, bx + 6, by + 3, hex('#5ac83a')); R.rect(bx, by, bx + 6, by, hex('#9ae08a')); } } }
  // la mano del dependiente entra por abajo a la derecha y teclea sin parar; en «first day» se aparta
  const te = Math.abs(Math.sin(t * (t > once ? 16 : 10))) * 3, ap = tramo(t, dia + 0.05, dia + 0.4), hx = cx + 6 + Math.round(ap * 18), hy = cy - 36 + Math.round(te) + Math.round(ap * 16);
  T.brazo(R, hx + 30, 200, hx + 10, hy + 2, '#2a5aa8', -1, { codo: [hx + 26, hy + 24] });
  // las cajas vendidas que pasan por detrás de la caja, por el fondo del mostrador
  for (let k = 0; k < 12; k++) { const t0 = P2 + 0.4 + k * 0.32 * (k > 4 ? 0.7 : 1); const v = tramo(t, t0, t0 + 0.6); if (v <= 0 || v >= 1) continue; const x = lerp(60, 340, v), y = 124 - Math.round(Math.sin(v * Math.PI) * 6); if (x > 150 && x < 262) continue; T.PIEZAS_GT.cajaJuego(R, Math.round(x), y, { color: ['#c8303a', '#3a6ad8', '#f0c040', '#3ac85a', '#8a4ad8'][k % 5] }); }
  if (t > dia) { const b = tramo(t, dia, dia + 0.6); for (let k = 0; k < 8; k++) { const a = k * 0.785; R.pset(cx + Math.round(Math.cos(a) * (34 + b * 20)), cy - 40 + Math.round(Math.sin(a) * (24 + b * 14)), hex('#ffffff')); } }
};
// ── 3: la carrera hasta los mil millones (LOCAL) ──
const fondo3 = fijo(() => {
  // el cielo de noche tramado con estrellas
  for (let y = 0; y < 52; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#080c22', '#0e1430', '#16204a', '#202c5a', '#2a386a'), y / 11 + (h(x >> 3, y >> 2, 1) - 0.5) * 0.4, x, y));
  // la grada: escalones de hormigón (el público se pinta en cada fotograma)
  for (let y = 52; y < 104; y++) for (let x = 0; x < 320; x++) R.pset(x, y, ((y - 52) % 9) < 2 ? hex('#5a5a6a') : tono(RA('#2a2a3a', '#343446', '#3e3e52'), 1.2 + (h(x >> 1, y, 4) - 0.5) * 0.6, x, y));
  R.rect(0, 50, 319, 52, hex('#6a6a7e'));
  // la valla con paneles sin letras (estrella, círculo, triángulo)
  R.rect(0, 102, 319, 112, K); for (let k = 0; k < 8; k++) { const x = k * 40 + 1, c = ['#c8303a', '#3a6ad8', '#f0c040', '#3ac85a'][k % 4]; R.rect(x, 103, x + 38, 111, hex(c)); R.rect(x, 103, x + 38, 103, mez(hex(c), hex('#ffffff'), 0.4));
    const m = x + 19; if (k % 3 === 0) R.icono('X', m - 2, 105, hex('#ffffff'), hex(c)); else if (k % 3 === 1) R.disco(m, 107, 3, hex('#ffffff')); else R.poligono([[m - 4, 110], [m + 4, 110], [m, 104]], hex('#ffffff')); }
  // la pista de tartán con sus calles
  for (let y = 112; y < 176; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#8a3a2a', '#a04632', '#b4523a', '#c45e42'), 1.6 + (y - 112) / 50 + (h(x, y, 8) - 0.5) * 0.9, x, y));
  for (const y of [112, 128, 146, 164]) for (let x = 0; x < 320; x++) R.pset(x, y, hex('#f0ece0'));
  for (const [k, y] of [[1, 126], [2, 144], [3, 162]]) R.numero(String(k), 14, y, { tam: 8, color: hex('#f0ece0'), sombra: false });
  for (let x = 40; x < 262; x += 44) for (const y of [112, 128, 146, 164]) R.rect(x, y - 1, x, y + 1, hex('#f0ece0'));
  // la línea de meta a cuadros y su poste
  for (let y = 113; y < 176; y++) for (let x = 266; x < 274; x++) R.pset(x, y, ((x >> 1) + (y >> 1)) % 2 ? K : hex('#f6f6f6'));
  R.rect(276, 84, 278, 176, K); R.rect(277, 84, 277, 176, hex('#c8c8d2'));
  // la hierba de abajo
  for (let y = 176; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#2a6a2a', '#3a8a3a', '#4aa04a'), 1 + h(x, y, 9), x, y));
});
const bobina = (x, y, s = 1) => { R.disco(x, y, 6 * s, K); R.disco(x, y, 6 * s - 1, hex('#4a4856')); R.disco(x - s, y - s, 4 * s, hex('#5a5866')); for (let k = 0; k < 5; k++) { const a = k * 1.2566 + 0.3; R.disco(x + Math.round(Math.cos(a) * 3 * s), y + Math.round(Math.sin(a) * 3 * s), s, hex('#1a1a22')); } R.disco(x, y, s, hex('#c8c8d2')); if (s > 1) { R.linea(x + 6 * s, y + 2, x + 9 * s, y + 6 * s, K); R.linea(x + 6 * s, y + 3, x + 9 * s, y + 6 * s + 1, hex('#3a3a46')); } };
const libroI = (x, y, s = 1) => { R.rect(x - 6 * s, y - 5 * s, x + 6 * s, y + 4 * s, K); R.rect(x - 5 * s, y - 4 * s, x - 1, y + 3 * s, hex('#f6f2e6')); R.rect(x + 1, y - 4 * s, x + 5 * s, y + 3 * s, hex('#f6f2e6')); R.rect(x, y - 4 * s, x, y + 4 * s, hex('#24449a'));
  for (let j = -2; j <= 2; j++) { R.rect(x - 4 * s, y + j * 2 * s - 1, x - 2, y + j * 2 * s - 1, hex('#a8a4b0')); R.rect(x + 2, y + j * 2 * s - 1, x + 4 * s, y + j * 2 * s - 1, hex('#a8a4b0')); } R.rect(x - 6 * s, y + 4 * s, x + 6 * s, y + 4 * s + 1, hex('#3a6ad8')); };
const mandoI = (x, y, s = 1) => { R.rect(x - 7 * s, y - 3 * s, x + 7 * s, y + 3 * s, K); R.rect(x - 6 * s, y - 2 * s, x + 6 * s, y + 2 * s, hex('#6a6478')); R.rect(x - 6 * s, y - 2 * s, x + 6 * s, y - 2 * s, hex('#8a84a0')); R.rect(x - 8 * s, y, x - 5 * s, y + 5 * s, K); R.rect(x + 5 * s, y, x + 8 * s, y + 5 * s, K); R.rect(x - 7 * s, y + 1, x - 6 * s, y + 4 * s, hex('#6a6478')); R.rect(x + 6 * s, y + 1, x + 7 * s, y + 4 * s, hex('#6a6478'));
  const p = (i, j, c) => R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, hex(c)); p(-4, -1, '#f0f0f0'); p(-4, 1, '#f0f0f0'); p(-5, 0, '#f0f0f0'); p(-3, 0, '#f0f0f0'); p(3, -1, '#ff3a3a'); p(5, 0, '#3ac85a'); p(4, 1, '#3a6ad8'); };
const p3 = (t) => {
  fondo3();
  // nubes oscuras que pasan, la luna y el dirigible
  R.disco(40, 26, 6, hex('#f6f0d0')); R.disco(42, 24, 5, hex('#fffbe8'));
  for (const [x0, y, w, v] of [[0, 34, 30, 3], [150, 40, 22, 6], [90, 22, 16, 9]]) { const nx = ((x0 + t * v) % 300) - 30; if (nx < 250) nube3(nx, y, w, RA('#1a2244', '#2a3458', '#3a466a')); }
  for (const [bx, k] of [[70, 0], [200, 1.7]]) { const a = -Math.PI / 2 + Math.sin(t * 0.8 + k) * 0.5; baña(0, 0, 319, 50, hex('#c8d8ff'), 0.2, (x, y) => { const dx = x - bx, dy = y - 50, d = Math.hypot(dx, dy); if (d < 2) return 1; const ang = Math.atan2(dy, dx); return Math.abs(ang - a) < 0.05 + 2 / d ? 1 - d / 70 : 0; }); }
  for (let k = 0; k < 18; k++) if (Math.sin(t * 3 + k * 2.3) > 0.2) R.pset(Math.floor(h(k, 1, 7) * 268), Math.floor(h(k, 2, 7) * 22), hex('#f0f0ff'));
  // el público de la grada (salta en «billion»)
  const fiesta = t > billon;
  for (let r = 0; r < 5; r++) for (let k = 0; k < 26; k++) { const x = 6 + k * 12 + (r % 2) * 6, y = 55 + r * 9 - (fiesta && Math.sin(t * 12 + k + r) > 0 ? 2 : 0); cabecita(x, y, ROPA[(k + r * 3) % 8], PIELES[(k * 7 + r) % 5], t, k + r * 30); }
  // el marcador del día: 1, 2, 3
  R.rect(284, 56, 316, 96, K); R.rect(285, 57, 315, 95, hex('#1a1a22')); R.rect(285, 57, 315, 64, hex('#c8303a')); R.icono('reloj', 297, 58, hex('#ffffff'), hex('#c8303a')); R.rect(298, 96, 301, 101, K);
  const d = t < tres ? 1 : t < dias ? 2 : 3; R.numero(String(d), 300, 90, { tam: 16, centro: true, rampa: RA('#ffe890', '#f0c040', '#d8a020', '#a87a18') });
  // la cifra que sube hasta mil millones
  const u = tramo(t, P3 + 0.1, billon), n = Math.round(1e9 * u ** 1.6);
  R.numero('$' + n.toLocaleString('en-US'), 156, 40, { tam: 16, centro: true });
  // los cochecitos: la película, el libro, el otro juego y nuestra caja (delante)
  const pos = (lleg, meta, tope) => { const v = tramo(t, P3 + 0.1, lleg); return v < 1 ? lerp(-8, meta, 1 - (1 - v) ** 1.4) : Math.min(tope, meta + (t - lleg) * 30); };
  const carros = [[pos(peli, 196, 204), 126, '#8a8a96', (x, y) => bobina(x, y - 4, 2)], [pos(libro, 172, 180), 144, '#3ac85a', (x, y) => libroI(x, y - 3, 2)], [pos(juego, 148, 156), 162, '#8a4ad8', (x, y) => mandoI(x, y, 2)], [pos(billon, 238, 262), 178, '#c8303a', null]];
  for (const [x, yb, c, icono] of carros) { const xi = Math.round(x), bote = Math.round(Math.abs(Math.sin(t * 14 + yb)) * 1);
    T.PIEZAS_GT.cocheJuguete(R, xi + 16, yb - bote, { color: c });
    if (icono) icono(xi + 17, yb - 21 - bote); else T.PIEZAS_GT.cajaJuego(R, xi + 16, yb - 12 - bote, { color: '#f0c040' });
    if (x > -30 && x < 236) for (let k = 1; k <= 3; k++) R.pset(xi - k * 4, yb - 4 - (k % 2), hex('#e8e0d0')); }
  // la bandera del poste ondea
  for (let j = 0; j < 10; j++) for (let i = 0; i < 16; i++) R.pset(279 + i, 85 + j + Math.round(Math.sin(t * 6 + i * 0.5) * 1.2), ((i >> 2) + (j >> 2)) % 2 ? K : hex('#f6f6f6'));
  // el destello y el confeti en «billion»
  const fl = tramo(t, billon, billon + 0.4); if (fl > 0 && fl < 1) baña(0, 0, 319, 179, hex('#ffffff'), 0.55 * (1 - fl));
  if (fiesta) for (let k = 0; k < 40; k++) { const v = ((t - billon) * 0.6 + h(k, 1, 3)) % 1, x = Math.round(h(k, 2, 3) * 320 + Math.sin(t * 3 + k) * 4), y = Math.round(v * 180); R.rect(x, y, x + 1, y + (k % 2), hex(['#f0c040', '#ff5ab0', '#4af0f0', '#5ac83a', '#ffffff'][k % 5])); }
};
// ── 4: la sala de récords: la montaña que crece ──
// el contador del decorado tiene 8 cifras y 235,000,000 lleva 9: se pinta encima uno de 9 cifras, con sus fichas blancas
const SEG = ['1110111', '0010010', '1011101', '1011011', '0111010', '1101011', '1101111', '1010010', '1111111', '1111011'];
const digito = (x, y, d, c) => { const g = SEG[d]; const S = [[2, 0, 5, 1], [0, 2, 1, 6], [6, 2, 7, 6], [2, 6, 5, 7], [0, 8, 1, 12], [6, 8, 7, 12], [2, 13, 5, 14]]; S.forEach(([a, b, e, f], i) => { if (g[i] === '1') R.rect(x + a, y + b, x + e, y + f, c); }); };
const contador9 = (v, t) => { R.rect(6, 40, 134, 66, K); R.rect(7, 41, 133, 65, hex('#2a1e10')); const s9 = String(Math.max(0, Math.min(999999999, v))).padStart(9, '0');
  let x = 11; for (let i = 0; i < 9; i++) { if (i === 3 || i === 6) { R.rect(x, 60, x + 1, 63, hex('#f6e08a')); x += 4; }
    const rueda = i >= 6 && v < 235000000 ? Math.round(Math.sin(t * 30 + i) * 2) : 0;
    R.rect(x, 43, x + 10, 63, hex('#f6f2e6')); R.rect(x, 43, x + 10, 44, hex('#ffffff')); R.rect(x, 53, x + 10, 53, hex('#c8c0b0')); R.recorte([x, 43, x + 10, 63]); digito(x + 2, 46 + rueda, +s9[i], K); R.recorte(null); x += 12; } };
const p4 = (t) => {
  const g = tramo(t, P4 + 0.2, millon), o = { encuadre: 'records', montana: 0.25 + 0.75 * (1 - (1 - g) ** 1.6), contador: 11000000 };
  const geo = T.hoy(R, t, o);
  contador9(Math.round(11000000 + 224000000 * (1 - (1 - tramo(t, diez, millon)) ** 2)), t);
  const salta = (k) => t > millon + 0.1 + k * 0.1 ? Math.max(0, Math.round(Math.sin((t - millon - k * 0.1) * 9) * 3)) : 0;
  const mira = t > paro;
  R.actor(EL.oficinista, 90, 160, t, { dir: -1, dedo: t > n235 - 0.3 && t < millon + 0.4, habla: t < n235 - 0.4 && Math.sin(t * 7) > 0.3, sonrisa: t > millon });
  const fx = 40, fo = R.actor(EL.chica, fx, 162, t, { dir: 1, sorpresa: mira && t < millon, sonrisa: t > millon, salto: salta(0), sostiene: t > tarde && t < n235 + 0.4 });
  if (t > tarde && t < n235 + 0.4) { const [mx, my] = fo.mano; R.rect(mx - 1, my - 6, mx + 2, my + 1, K); R.rect(mx, my - 5, mx + 1, my, hex('#8ae0f0')); if ((t - tarde) % 1.1 < 0.12) R.halo(mx, my - 3, 16, RA('#a8a8b8', '#e8e8f0', '#ffffff'), 1.2); }
  R.actor(EL.chico, 60, 164, t, { dir: 1, sorpresa: mira && t < millon, brazos: t > millon, salto: salta(1) });
  T.hoyDelante(R, t, o);
};
// ── 5: la gráfica del museo (LOCAL) ──
const fondo5 = fijo(() => {
  // la pared verde oscuro con damasco y el zócalo de madera
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const dm = Math.abs(((x + (Math.floor(y / 14) % 2) * 8) % 16) - 8) + Math.abs((y % 14) - 7) < 3;
    R.pset(x, y, dm ? hex('#2e5a46') : tono(RA('#163024', '#1c3a2c', '#224434', '#284e3c'), 1.6 + (h(x >> 2, y >> 2, 1) - 0.5) * 0.5 - (y < 12 ? 1 : 0), x, y)); }
  R.rect(0, 0, 319, 15, hex('#122418')); R.rect(0, 15, 319, 16, hex('#3a5a46')); calma(hex('#1c3a2c'), hex('#163024'));
  R.rect(0, 132, 319, 152, K); for (const [x0, x1] of [[2, 78], [82, 158], [162, 238], [242, 318]]) cuarteron(x0, 134, x1, 150, RA('#3a2010', '#56301c', '#6e4024', '#8a5630'));
  R.rect(0, 130, 319, 132, hex('#8a5630'));
  // el parqué en espiga
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const k = Math.floor((x + (y - 152)) / 10) + Math.floor((x - (y - 152)) / 10); R.pset(x, y, tono(RA('#6a4224', '#7e5230', '#946238', '#a87444'), 1.6 + (k % 2 ? 0.7 : -0.5) + (h(x, y >> 1, 2) - 0.5) * 0.5, x, y)); }
  // el marco dorado y el papel con su cuadrícula
  R.rect(34, 18, 266, 128, K); R.rect(35, 19, 265, 127, hex('#b08a3a')); R.rect(35, 19, 265, 20, hex('#f6e08a')); R.rect(38, 22, 262, 124, hex('#8a6a20')); R.rect(40, 24, 260, 122, K);
  relleno(41, 25, 259, 121, RA('#e8dcc0', '#f0e6cc', '#f6eed8'), 1.6, 0.6, 3);
  for (let y = 30; y < 110; y += 10) for (let x = 72; x < 256; x += 2) R.pset(x, y, hex('#d8ccb0'));
  R.rect(70, 26, 70, 110, hex('#3a3046')); R.rect(70, 110, 256, 110, hex('#3a3046'));
  for (const [v, y] of [[50, 90], [100, 70], [150, 50], [200, 30]]) { R.rect(67, y, 70, y, hex('#3a3046')); R.numero(String(v), 56, y + 4, { tam: 8, centro: true, color: hex('#5a5068'), sombra: false }); }
  // las chinchetas de las esquinas del papel
  for (const [x, y] of [[44, 28], [256, 28]]) { R.disco(x, y, 2, K); R.disco(x, y, 1, hex('#c8303a')); }
  // las cordoneras de terciopelo
  for (const x of [20, 160, 300]) { R.rect(x - 1, 140, x + 1, 168, hex('#d8b048')); R.rect(x - 3, 168, x + 3, 170, hex('#a8883a')); R.disco(x, 139, 2, hex('#f6e08a')); }
  for (const [a, b] of [[20, 160], [160, 300]]) for (let x = a + 2; x < b - 1; x++) { const y = 142 + Math.round(Math.sin((x - a) / (b - a) * Math.PI) * 8); R.pset(x, y, hex('#a8202a')); R.pset(x, y + 1, hex('#6a1018')); }
});
const p5 = (t) => {
  fondo5();
  // los focos del techo sobre el cuadro
  for (const fx of [90, 210]) { R.rect(fx - 10, 15, fx + 10, 19, K); R.rect(fx - 9, 16, fx + 9, 17, hex('#d8b048')); R.rect(fx - 9, 18, fx + 9, 18, hex('#fff4d0')); baña(fx - 60, 20, fx + 60, 128, hex('#fff4d0'), 0.12, (x, y) => cl(1 - Math.abs(x - fx) / (10 + (y - 20) * 0.5))); }
  // las barras: cine, libro, disco, móvil… y la caja
  const B = [['#8a8a96', 0.32, bobina], ['#3a6ad8', 0.42, libroI], ['#c8303a', 0.26, null], ['#5a5a6a', 0.36, null]];
  B.forEach(([c, alto, ic], k) => { const v = 0.35 + 0.65 * tramo(t, pocos + k * 0.25, pocos + 0.6 + k * 0.25), hh = Math.round(84 * alto * (1 - (1 - v) ** 2)), x = 78 + k * 34;
    if (hh > 0) { R.rect(x, 110 - hh, x + 20, 109, K); R.rect(x + 1, 111 - hh, x + 19, 109, hex(c)); R.rect(x + 1, 111 - hh, x + 4, 109, mez(hex(c), hex('#ffffff'), 0.3)); }
    const yi = 116; if (ic) ic(x + 10, yi, 1); else if (k === 2) { R.disco(x + 10, yi, 6, K); R.disco(x + 10, yi, 5, hex('#2a2a34')); R.disco(x + 10, yi, 2, hex('#c8303a')); } else { R.rect(x + 6, yi - 6, x + 14, yi + 5, K); R.rect(x + 7, yi - 5, x + 13, yi + 3, hex('#8ae0f0')); } });
  // la barra de la caja sube hasta arriba en «that many»
  const v = 0.3 + 0.7 * tramo(t, pocos + 1.2, tantos + 0.1), hh = Math.round(80 * (1 - (1 - v) ** 2)), x = 218;
  if (hh > 0) { R.rect(x, 110 - hh, x + 22, 109, K); R.rect(x + 1, 111 - hh, x + 21, 109, hex('#f0c040')); R.rect(x + 1, 111 - hh, x + 5, 109, hex('#f6e08a')); R.rect(x + 18, 111 - hh, x + 21, 109, hex('#a87a18')); }
  cajaMini(x + 11, 123, '#f0c040', 2);
  if (t > tantos) { const b = tramo(t, tantos, tantos + 0.8), sy = 110 - hh - 8; R.poligono([[x + 11, sy - 6], [x + 13, sy - 2], [x + 17, sy - 2], [x + 14, sy + 1], [x + 15, sy + 5], [x + 11, sy + 3], [x + 7, sy + 5], [x + 8, sy + 1], [x + 5, sy - 2], [x + 9, sy - 2]], hex('#f0c040')); R.halo(x + 11, sy, 14, RA('#e8dcc0', '#f6e08a', '#fff6c0'), 0.7 * (1 - b * 0.5));
    R.numero('235,000,000', 150, 36, { tam: 8, centro: true, color: hex('#3a3046') }); }
  // los visitantes delante del cordón: señalan y se asombran; un niño cruza al fondo
  const u = tramo(t, P5 + 0.2, P5 + 3.8); R.actor(EL.chico, Math.round(lerp(-16, 330, u)), 160, t, { dir: 1, anda: u > 0 && u < 1 });
  R.actor(EL.senor30, 120, 176, t, { dir: 1, dedo: t > pocos + 0.4 && t < tantos - 0.2, habla: t > pocos && t < pocos + 1.4 && Math.sin(t * 8) > 0, sorpresa: t > tantos });
  R.actor(EL.senora30, 150, 177, t, { dir: 1, sorpresa: t > tantos - 0.1, sonrisa: t < tantos - 0.1 });
  R.actor(EL.guardia, 286, 176, t, { dir: -1 });
};
const año = (t) => t < P4 ? 2013 : Math.round(lerp(2013, 2026, tramo(t, diez, tarde)));
const efectos = [[sale - 0.5, 'campana'], [sale, 'publico'], [P2 + 0.5, 'tecleo'], [once, 'campana'], [copias + 0.4, 'vapor'], [dia, 'boing'], [P3 + 0.2, 'motor'], [billon, 'brillo'], [billon + 0.2, 'publico'], [paro + 0.4, 'avalancha'], [tarde + 0.6, 'flash'], [millon, 'brillo'], [pocos + 0.1, 'pop'], [tantos, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, cartela: '2013', año });
''')
