E = {}

# Utilidades comunes de los fondos LOCAL (se repiten en cada cuerpo: cada escena es un .html independiente)
UTIL = r'''
const K = T.C.k, PZ = T.PIEZAS_CF;
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const RA = (...c) => c.map(hex);
const tono = (r, v, x, y) => r[Math.max(0, Math.min(r.length - 1, Math.floor(v + BY[(y & 3) * 4 + (x & 3)] / 16)))];
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const sua = (u) => u * u * (3 - 2 * u);
// lo fijo de un plano se pinta una vez en su búfer y se copia en cada fotograma
const fijo = (pinta) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); } R.copiar(b); }; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const baña = (x0, y0, x1, y1, col, a, f = null) => { for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) { const k = f ? f(x, y) : 1; if (k > 0) R.pset(x, y, mez(R.pget(x, y), col, a * k)); } };
// una sombra o una luz en elipse (centro, radios)
const elipse = (cx, cy, rx, ry, col, a) => baña(cx - rx, cy - ry, cx + rx, cy + ry, col, a, (x, y) => { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; return d < 1 ? 1 - d * d : 0; });
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
const ORO = hex('#f0c040'), OROL = hex('#f6e08a'), OROS = hex('#9a7420'), BL = hex('#f6f6f6'), ROJO = hex('#d8303a'), ROJOL = hex('#f0606a'), VERDE = hex('#3ac85a');
// un anillo que se abre y se apaga (un pulso sobre lo que se nombra)
const pulso = (t, x, y, t0, c, r0 = 6, r1 = 20, d = 0.7) => { const v = tramo(t, t0, t0 + d); if (v > 0 && v < 1) { const r = Math.round(lerp(r0, r1, v)); R.anillo(x, y, r, c, v > 0.6 ? 2 : 0); R.anillo(x, y, r - 1, c, v > 0.3 ? 2 : 0); } };
// un destello en cruz que late
const chispa = (x, y, t, k = 0, c = BL) => T.b_destello(R, x, y, 0.5 + 0.5 * Math.sin(t * 7 + k * 2.1), c);
// una hoja de otoño que cae o rueda
const hoja = (x, y, k, t) => { const c = RA('#e08a2a', '#c85a24', '#e8b83a')[k % 3]; x = Math.round(x); y = Math.round(y); R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x + (Math.sin(t * 5 + k) > 0 ? 1 : 0), y - 1, c); R.pset(x - 1, y + 1, K); };
// un trozo de cerámica crema con un resto de cenefa azul (w × hh, pico según k)
const trozo = (x, y, w, hh, k = 0) => { x = Math.round(x); y = Math.round(y); const P = k % 3 === 0 ? [[x, y + hh], [x + 1, y + 1], [x + w - 2, y], [x + w, y + hh - 2], [x + w - 3, y + hh]] : k % 3 === 1 ? [[x, y + 2], [x + w - 1, y], [x + w, y + hh], [x + 3, y + hh - 1]] : [[x + 2, y], [x + w, y + 3], [x + w - 2, y + hh], [x, y + hh - 2]];
  R.poligono(P.map(([a, b]) => [a + 1, b + 1]), K); R.poligono(P.map(([a, b]) => [a - 1, b - 1]), K); R.poligono(P.map(([a, b]) => [a + 1, b - 1]), K); R.poligono(P.map(([a, b]) => [a - 1, b + 1]), K);
  R.poligono(P, hex('#f0e6cc')); R.linea(x + 2, y + hh - 1, x + w - 2, y + hh - 1, hex('#cdbd96')); R.linea(x + 2, y + 2 + (k % 2), x + w - 3, y + 1 + (k % 2), hex('#3a6ab0')); R.pset(x + 2, y + 1, BL); };
'''

# ─────────────────────────────────────────────────────────────── cf-peridoto ──
E['cf-peridoto'] = ('El peridoto', '''// CF-PERIDOTO (frases 24–25), 2019. Seis planos:
// 1. (LOCAL) la mesa de trabajo de la obra, bajo la lona verde de la valla: la mano de Krupat acerca el trozo de cerámica
//    con el reloj de sol; en «sundial» late; en «the same one» y «the other two» una línea de puntos lo une al reloj de sol
//    de las fotos de los otros dos cofres (1983 y 2004), que se encienden. Corta en «With the expedition team».
// 2. boston/obras (o.base false; 2.ª vez): el presentador genérico y su cámara entran; Krupat cava junto a la excavadora
//    parada y la tierra salta al montón; en «found more pieces» levanta un trozo y todos se alegran. Corta en «and the key».
// 3. (LOCAL) el tamiz de cerca sobre la lona azul: la mano lo sacude, la tierra cae y en «the key» asoma la llave entre los
//    trozos; en «came out broken» los trozos saltan al paño y forman el cofre roto; en «it was real», la marca de visto.
// 4. boston/biblioteca/ceremonia: la familia entra por la izquierda (en «two kids» los niños saltan); la viuda y las hijas
//    esperan a la derecha y en «ceremony» ella da un paso y habla; la piedra espera en el cojín. Corta en «Preiss's widow».
// 5. (LOCAL) el cojín de cerca sobre la mesa de la ceremonia: la mano de la viuda posa el peridoto en «gave», la de Krupat
//    llega en «the family» y en «a peridot» la piedra se enciende en verde. Chimenea, velas, flores, el libro.
// 6. (LOCAL) las sillas de frente: los tres de Chicago (ya adultos) y los dos de Cleveland aplauden junto a las vitrinas
//    de sus cofres (1983 y 2004); en «Chicago» y «Cleveland» cada grupo levanta su piedra y su vitrina se ilumina.''', UTIL + r'''
const r = (f) => en('reloj', f), q = (f) => en('peridoto', f);
const P2 = r(.412), P3 = r(.725), P4 = q(0) - 0.05, P5 = q(.353), P6 = q(.702);
const sol = r(.076), misma = r(.189), otras = r(.293), cajas = r(.328), cavan = r(.598), hallan = r(.655), llave = r(.763), caja = r(.828), rota = r(.882), real = r(.958);
const esposa = q(.089), hijos = q(.1415), ceremonia = q(.249), brooklyn = q(.302), dan = q(.466), familia = q(.509), premio = q(.555), peridot = q(.631), halladores = q(.725), chi = q(.788), cle = q(.852), tambien = q(.947);
const NOG = RA('#2a160c', '#3e2214', '#56301c', '#6e4024', '#8a5630');
// el reloj de sol pintado (el mismo en los tres cofres): el aro azul con sus ocho marcas de oro y el gnomon
const solecito = (cx, cy, lit) => { const A = hex('#24447a'), B = hex('#3a6ab0');
  R.disco(cx, cy, 5, hex('#f0e6cc')); R.anillo(cx, cy, 5, lit ? B : A); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; R.pset(Math.round(cx + Math.cos(a) * 3.2), Math.round(cy + Math.sin(a) * 3.2), lit ? ORO : OROS); }
  R.linea(cx, cy, cx + 2, cy - 3, A); R.linea(cx, cy + 1, cx - 2, cy + 1, hex('#8a7a5a')); };

// ── 1: la mesa de la obra (LOCAL) ──
const LONA = RA('#1e4a34', '#28593e', '#30694a', '#3c7a56'), TABLA = RA('#5a3a20', '#77502c', '#916638', '#a87c48', '#c0945a');
const FOTOS1 = [[156, 66, '1983', '#3e7436', '#5a9a4a'], [236, 78, '2004', '#8a8a96', '#b4b0a4']];
const fondo1 = fijo(() => {
  // la lona verde de la valla, con sus pliegues, los postes, el tubo y los ojales
  for (let y = 0; y <= 57; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(LONA, 1.5 + Math.sin(x * 0.11 + Math.sin(y * 0.07) * 1.2) * (x > 264 ? 0.5 : 1.15) + Math.sin(x * 0.031 + y * 0.05) * 0.5 + (h(x >> 1, y >> 1, 2) - .5) * .5 - (y > 51 ? .9 : 0) - (y === 30 && x < 264 && x % 4 < 2 ? 1 : 0), x, y));
  for (const x of [98, 234]) { R.rect(x, 0, x + 4, 57, K); R.rect(x + 1, 0, x + 3, 57, hex('#8d97a8')); R.rect(x + 1, 0, x + 1, 57, hex('#c6ceda')); for (const y of [20, 44]) { R.rect(x - 2, y, x + 6, y + 2, K); R.rect(x - 1, y + 1, x + 5, y + 1, hex('#6a7486')); } }
  R.rect(0, 47, 319, 49, K); R.rect(0, 48, 319, 48, hex('#8d97a8'));
  for (let x = 12; x < 320; x += 22) { if (Math.abs(x - 100) < 8 || Math.abs(x - 236) < 8) continue; R.disco(x, 53, 2, K); R.pset(x, 53, hex('#c6ceda')); R.linea(x, 50, x, 51, hex('#e8e0c0')); }
  // colgados de la valla: la señal de obras, un casco, un chaleco y un rollo de cinta
  R.poligono([[52, 15], [68, 31], [52, 47], [36, 31]], K); R.poligono([[52, 17], [66, 31], [52, 45], [38, 31]], hex('#f0c830')); R.poligono([[52, 20], [63, 31], [52, 42], [41, 31]], K); R.poligono([[52, 21], [62, 31], [52, 41], [42, 31]], hex('#f0c830')); R.icono('!', 51, 25, K, hex('#c8a020'), 2);
  R.poligono([[92, 27], [93, 21], [96, 17], [104, 17], [107, 21], [108, 27]], K); R.poligono([[94, 26], [95, 21], [97, 19], [103, 19], [105, 21], [106, 26]], hex('#f0c830')); R.rect(97, 19, 98, 25, hex('#f6e08a')); R.rect(90, 27, 111, 29, K); R.rect(91, 27, 110, 28, hex('#c8a020')); R.rect(100, 17, 101, 26, hex('#c8a020'));
  R.rect(150, 46, 178, 61, K); R.rect(151, 47, 177, 60, hex('#f07a2a')); R.rect(151, 51, 177, 52, hex('#f6f0a8')); R.rect(151, 56, 177, 57, hex('#f6f0a8')); R.rect(163, 47, 165, 60, hex('#c85a14')); R.rect(159, 46, 169, 49, LONA[1]);
  R.disco(206, 40, 7, K); R.disco(206, 40, 6, hex('#f6f6f6')); for (let a = 0; a < 6.28; a += 0.5) R.pset(Math.round(206 + Math.cos(a) * 5), Math.round(40 + Math.sin(a) * 5), ROJO); R.disco(206, 40, 3, K); R.disco(206, 40, 2, LONA[1]); R.linea(206, 33, 206, 30, hex('#e8e0c0'));
  for (const [x, y, c] of [[128, 24, '#2a5a8a'], [250, 36, '#8a8a2a']]) { R.rect(x, y, x + 9, y + 7, hex(c)); for (let i = 0; i < 10; i += 2) { R.pset(x + i, y - 1, hex('#e8e0c0')); R.pset(x + i, y + 8, hex('#e8e0c0')); } }
  // por debajo de la lona, la tierra de la obra y unas briznas
  R.rect(0, 58, 319, 63, hex('#3a2616')); for (let x = 0; x < 320; x += 3) R.pset(x + (h(x, 1, 1) * 3 | 0), 58 + (h(x, 2, 1) * 4 | 0), h(x, 3, 1) > .6 ? hex('#5a9a4a') : hex('#523622'));
  // el tablero de la mesa: tablones con vetas, el canto y manchas de barro
  madera(0, 64, 319, 179, TABLA, 23, 1); R.rect(0, 64, 319, 64, K); R.rect(0, 65, 319, 65, TABLA[4]);
  for (const [cx, cy, rx, ry] of [[40, 150, 26, 9], [200, 168, 34, 8], [300, 100, 14, 20], [120, 84, 22, 6]]) elipse(cx, cy, rx, ry, hex('#4a3018'), .32);
  for (let k = 0; k < 90; k++) { const x = h(k, 1, 5) * 320 | 0, y = 68 + (h(k, 2, 5) * 110 | 0); R.pset(x, y, hex('#3a2616')); if (k % 3 === 0) R.pset(x + 1, y, hex('#523622')); }
  // las dos fotos de los otros cofres, sujetas con cinta, con su año
  for (const [x, y, año, f0, f1] of FOTOS1) {
    baña(x + 3, y + 4, x + 69, y + 76, K, .35);
    R.rect(x, y, x + 66, y + 72, K); R.rect(x + 1, y + 1, x + 65, y + 71, hex('#f4f0e4')); R.rect(x + 1, y + 69, x + 65, y + 71, hex('#d4ccb8')); R.rect(x + 64, y + 1, x + 65, y + 71, hex('#d4ccb8'));
    R.rect(x + 5, y + 5, x + 61, y + 56, K); relleno(x + 6, y + 6, x + 60, y + 55, [mez(hex(f0), K, .3), hex(f0), hex(f1), mez(hex(f1), BL, .3)], 1.6, 1.6, 8);
    for (let xx = x + 6; xx <= x + 60; xx++) for (let yy = y + 47; yy <= y + 55; yy++) R.pset(xx, yy, tono(RA('#3a2616', '#523622', '#7a5434'), 1 + (h(xx >> 1, yy, 3) - .5) * 1.4, xx, yy));
    PZ.cofre(R, x + 33, y + 54, { s: 2 });
    R.numero(año, x + 33, y + 67, { centro: true });
    R.rect(x + 22, y - 4, x + 44, y + 3, hex('#e8dca0')); R.rect(x + 22, y + 3, x + 44, y + 3, hex('#c8bc80')); R.pset(x + 22, y - 2, hex('#c8bc80')); R.pset(x + 44, y, hex('#c8bc80'));
  }
  // el café de la obra
  R.rect(15, 72, 31, 92, K); R.rect(16, 73, 30, 91, hex('#f0e6d2')); R.rect(16, 79, 30, 86, hex('#b8743a')); R.rect(16, 79, 18, 86, hex('#d08a4a')); R.rect(14, 70, 32, 73, K); R.rect(15, 71, 31, 72, hex('#fafafa')); R.rect(27, 73, 30, 91, hex('#d4c8ae')); baña(17, 92, 36, 95, K, .3);
  // la regla de escala, las pinzas, el pincel y los testigos numerados con dos trocitos
  R.rect(44, 168, 136, 174, K); for (let i = 0; i < 10; i++) R.rect(45 + i * 9, 169, 53 + i * 9, 173, i % 2 ? hex('#22222a') : hex('#f4f0e4')); R.rect(45, 173, 135, 173, hex('#8a8a8e'));
  R.linea(160, 160, 196, 152, K); R.linea(160, 161, 196, 153, hex('#b6c0ce')); R.linea(160, 162, 196, 156, K); R.linea(160, 163, 196, 157, hex('#8d97a8')); R.disco(159, 161, 2, K);
  for (let i = 0; i < 26; i++) { R.pset(220 + i, 166 - (i >> 2), K); R.pset(220 + i, 167 - (i >> 2), i < 17 ? hex('#a8703a') : hex('#c8ccd8')); R.pset(220 + i, 168 - (i >> 2), i < 17 ? hex('#7a4c22') : hex('#8c90a4')); R.pset(220 + i, 169 - (i >> 2), K); } for (let j = 0; j < 5; j++) R.linea(246, 158 + j, 253, 155 + j, j % 2 ? hex('#e8d8a8') : hex('#c8b078'));
  for (const [x, y, n] of [[270, 160, '1'], [296, 166, '2']]) { R.poligono([[x, y], [x + 6, y - 12], [x + 12, y]], K); R.poligono([[x + 1, y - 1], [x + 6, y - 10], [x + 11, y - 1]], ORO); R.numero(n, x + 3, y - 1, { rampa: [K, K, K, K, K, K, K, K] }); }
  trozo(282, 168, 9, 6, 0); trozo(304, 152, 8, 5, 1);
});
const p1 = (t) => {
  fondo1();
  // el viento riza la lona y pasan dos hojas; el vapor del café
  for (let k = 0; k < 3; k++) { const wx = ((t * 34 + k * 130) % 380) - 30; for (let y = 18; y <= 44; y++) { const x = Math.round(wx + Math.sin(y * 0.3 + k) * 3); if (x >= 0 && x < 272 && Math.abs(x - 100) > 6 && Math.abs(x - 236) > 6) R.pset(x, y, LONA[3]); } }
  for (let k = 0; k < 3; k++) { const u = ((t * 0.5 + k / 3) % 1); R.pset(Math.round(22 + Math.sin(u * 6 + k) * 2), Math.round(68 - u * 12), u > .6 ? hex('#a8c0b0') : BL); }
  for (let k = 0; k < 2; k++) { const u = ((t * 0.16 + k * 0.5) % 1); hoja(-10 + u * 340, 100 + k * 44 + Math.sin(u * 20 + k) * 6, k, t); }
  // la mano de Krupat acerca el trozo con el reloj de sol
  const k1 = 1 - (1 - tramo(t, 0.05, 1.0)) ** 3, cx = Math.round(lerp(4, 92, k1)), cy = Math.round(lerp(190, 150, k1) + Math.sin(t * 2.1) * 1.2);
  elipse(cx + 2, cy + 1, 32, 5, K, .4);
  PZ.relojSol(R, cx, cy, { s: 3 });
  T.brazo(R, cx - 84, cy + 40, cx - 42, cy - 12, '#8a8e9a', 1, { codo: [cx - 62, cy + 16] });
  const S0 = [cx, cy - 27], SA = [FOTOS1[0][0] + 33, FOTOS1[0][1] + 36], SB = [FOTOS1[1][0] + 33, FOTOS1[1][1] + 36];
  // el reloj de sol late en «sundial»
  pulso(t, S0[0], S0[1], sol, ORO, 12, 30, 0.8); if (t > sol && t < sol + 1.2) { chispa(S0[0] - 14, S0[1] - 12, t, 0, OROL); chispa(S0[0] + 16, S0[1] + 8, t, 1, OROL); }
  // la línea de puntos hasta cada foto, y su reloj de sol se enciende
  [[SA, misma], [SB, otras]].forEach(([S, t0], i) => {
    const v = tramo(t, t0, t0 + 0.45), n = Math.hypot(S[0] - S0[0], S[1] - S0[1]) | 0, lit = t > t0 + 0.45;
    solecito(S[0], S[1], lit && Math.sin(t * 9) > -0.6);
    for (let j = 22; j < (n - 8) * v; j++) if ((((j - t * 14) % 7) + 7) % 7 < 4) { const x = Math.round(S0[0] + (S[0] - S0[0]) * j / n), y = Math.round(S0[1] + (S[1] - S0[1]) * j / n - Math.sin(j / n * Math.PI) * (10 + i * 12)); R.pset(x, y, ORO); R.pset(x, y + 1, K); }
    pulso(t, S[0], S[1], t0 + 0.4, ORO, 6, 18, 0.6); if (lit) { R.anillo(S[0], S[1], 8, Math.sin(t * 6 + i) > 0 ? ORO : OROL); chispa(S[0] + 9, S[1] - 8, t, i); }
    if (t > cajas + i * 0.25) T.visto(R, FOTOS1[i][0] + 50, FOTOS1[i][1] + 7, 1);
  });
};

// ── 2: cavan otra vez con el equipo de la tele ──
const p2 = (t) => {
  const o = { encuadre: 'obras', base: false };
  T.boston(R, t, o);
  PZ.excavadora(R, 262, 150, { dir: -1, cuchara: 0.3 });
  R.actor(EL.operarioCF, 290, 154, t, { dir: -1, brazos: t > hallan + 0.2 && Math.sin(t * 9) > 0, sonrisa: t > hallan });
  // el hoyo y el montón que crece
  const hx = 204, hy = 158, lleno = tramo(t, P2, hallan);
  R.rect(hx - 15, hy - 3, hx + 15, hy + 3, K); R.rect(hx - 14, hy - 2, hx + 14, hy + 2, hex('#3a2616')); R.rect(hx - 12, hy - 1, hx + 12, hy + 2, hex('#1e1008')); R.rect(hx - 14, hy - 3, hx + 14, hy - 3, hex('#9a6e44'));
  const mh = Math.round(4 + lleno * 6); R.poligono([[226, 160], [226 + mh + 3, 160 - mh], [226 + mh + 7, 160 - mh + 1], [246 + mh, 160]], K); R.poligono([[228, 160], [226 + mh + 3, 161 - mh], [226 + mh + 6, 162 - mh], [244 + mh, 160]], hex('#7a5434')); R.linea(229, 159, 226 + mh + 2, 162 - mh, hex('#9a6e44'));
  // el presentador y su cámara entran por la izquierda
  const u = tramo(t, P2 + 0.05, P2 + 1.3), ale = t > hallan + 0.15;
  R.actor(EL.camarografo, Math.round(lerp(64, 116, u)), 160, t, { dir: 1, anda: u > 0 && u < 1 });
  if (Math.sin(t * 7) > 0) R.pset(Math.round(lerp(64, 116, u)) + 15, 140, ROJO);
  R.actor(EL.presentadorCF, Math.round(lerp(96, 148, u)), 156, t, { dir: 1, anda: u > 0 && u < 1, habla: u >= 1 && !ale && Math.sin(t * 9) > 0, dedo: u >= 1 && !ale, sorpresa: ale, salto: ale ? Math.abs(Math.sin((t - hallan) * 8)) * 3 : 0 });
  // Krupat cava: la pala baja al hoyo y tira la tierra al montón; en «found» levanta un trozo
  const ph = ((t - P2) * 1.5) % 1, baja = ph < 0.5, kx = 176;
  if (!ale) {
    const m = R.actor(EL.krupat, kx, 158, t, { dir: 1, sostiene: [kx + 17, baja ? 143 : 137] });
    PZ.pala(R, m.mano[0] + 2, m.mano[1] + (baja ? 17 : 13), {});
    if (!baja) for (let k = 0; k < 5; k++) { const v = cl((ph - 0.5) * 2.4 - k * 0.07); if (v > 0 && v < 1) R.rect(Math.round(lerp(198, 236, v)), Math.round(lerp(148, 152, v) - Math.sin(v * Math.PI) * (16 + k * 2)), Math.round(lerp(198, 236, v)) + 1, Math.round(lerp(148, 152, v) - Math.sin(v * Math.PI) * (16 + k * 2)) + 1, k % 2 ? hex('#7a5434') : hex('#523622')); }
  } else {
    PZ.pala(R, 198, 160, {});
    const sube = tramo(t, hallan + 0.15, hallan + 0.5), m = R.actor(EL.krupat, kx, 158, t, { dir: 1, sostiene: [kx + 16, Math.round(lerp(142, 126, sube))], sonrisa: true });
    trozo(m.mano[0] - 2, m.mano[1] - 7, 8, 6, 0); chispa(m.mano[0] + 7, m.mano[1] - 9, t, 0, OROL); chispa(m.mano[0] - 4, m.mano[1] - 3, t, 2);
    R.icono('!', kx + 5, 118 + (Math.sin(t * 10) > 0 ? -1 : 0), ORO, K, 2);
  }
  T.bostonDelante(R, t, o);
};

// ── 3: el tamiz (LOCAL) ──
const TARP = RA('#1c386a', '#264c88', '#3060a2', '#4478ba'), HIERBA = RA('#2e5a2a', '#3e7436', '#4c8a40', '#5a9a4a'), TIERRA = RA('#2a180c', '#523622', '#6a4628', '#7a5434', '#9a6e44'), MAD3 = RA('#5a3a1e', '#7a5028', '#946634', '#b07e44');
const PANO = [176, 58, 308, 152];
const fondo3 = fijo(() => {
  // la lona azul extendida en el césped, con sus pliegues
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(TARP, 1.5 + Math.sin((x + y * .6) * .05) * .6 + Math.sin((x - y * 1.3) * .023 + 2) * .5 + (h(x >> 1, y >> 1, 3) - .5) * .45, x, y));
  for (const [x0, y0, x1, y1] of [[0, 118, 150, 179], [196, 28, 319, 54], [40, 30, 170, 44], [150, 150, 319, 172]]) { R.linea(x0, y0, x1, y1, TARP[3]); R.linea(x0, y0 + 1, x1, y1 + 1, TARP[0]); }
  // el césped de arriba, con el borde de la lona, sus ojales y hojas caídas
  for (let x = 0; x < 320; x++) { const b = 21 + Math.round(Math.sin(x * .09) * 1.5); for (let y = 0; y <= b; y++) R.pset(x, y, tono(HIERBA, 1.5 + (h(x, y >> 1, 4) - .5) * .9 - (y > b - 2 ? 1.2 : 0), x, y)); R.pset(x, b + 1, TARP[3]); R.pset(x, b + 2, TARP[0]); }
  for (let x = 14; x < 270; x += 36) { R.disco(x, 28, 2, K); R.pset(x, 28, hex('#c6ceda')); }
  for (let k = 0; k < 9; k++) hoja(176 + h(k, 1, 2) * 96, 16 + h(k, 2, 2) * 5, k, 0);
  // el paño blanco con sus dobleces
  const [a, b, c, d] = PANO; baña(a + 4, b + 5, c + 5, d + 6, K, .35); R.rect(a, b, c, d, hex('#b8b09a')); R.rect(a + 1, b + 1, c - 1, d - 1, hex('#f4efe2'));
  for (let y = b + 1; y < d; y++) for (let x = a + 1; x < c; x++) { const v = Math.sin(x * .09 + y * .03) + Math.sin(y * .12) * .6 + (h(x >> 1, y >> 1, 6) - .5) * .6; if (v > 1.0) R.pset(x, y, hex('#e2dccb')); else if (v < -1.1) R.pset(x, y, BL); }
  for (let x = a + 12, i = 1; x < c; x += 22, i++) { R.rect(x, b + 12, x, d - 1, hex('#bcc8d8')); if (i < 6) R.numero(String(i), x + 7, b + 10, { rampa: [hex('#7a8aa4'), hex('#7a8aa4'), hex('#7a8aa4'), hex('#7a8aa4'), hex('#7a8aa4'), hex('#7a8aa4'), hex('#7a8aa4'), hex('#7a8aa4')] }); }
  for (let y = b + 12; y < d; y += 22) R.rect(a + 1, y, c - 1, y, hex('#bcc8d8'));
  for (let x = a + 12; x < c; x += 22) for (let y = b + 12; y < d; y += 22) { R.pset(x, y, hex('#7a8aa4')); R.pset(x - 1, y, hex('#7a8aa4')); R.pset(x + 1, y, hex('#7a8aa4')); R.pset(x, y - 1, hex('#7a8aa4')); R.pset(x, y + 1, hex('#7a8aa4')); }
  // sobre el paño: la lupa y un pincel
  for (const [d2, cc] of [[-1, K], [0, hex('#7a5028')], [1, hex('#b07e44')], [2, K]]) R.linea(196 + d2, 92 - d2, 208 + d2, 104 - d2, cc); for (const [rr, cc] of [[9, K], [8, ORO], [7, K]]) R.anillo(190, 85, rr, cc); R.disco(190, 85, 6, hex('#dce8f0')); R.linea(186, 82, 189, 80, BL);
  for (let i = 0; i < 22; i++) { R.rect(214 + i, 70 + (i >> 3), 214 + i, 73 + (i >> 3), K); R.rect(214 + i, 71 + (i >> 3), 214 + i, 72 + (i >> 3), i < 14 ? hex('#a8303a') : i < 16 ? hex('#c6ceda') : hex('#e8d8a8')); }
  // el cajón donde apoya el tamiz, el cubo, el paletín y el pincel
  R.rect(140, 62, 170, 134, K); madera(141, 63, 169, 133, MAD3, 9, 4); R.rect(141, 63, 169, 64, MAD3[3]); for (const y of [70, 126]) { R.pset(145, y, K); R.pset(165, y, K); }
  R.disco(310, 190, 34, K); R.disco(310, 190, 32, hex('#8d97a8')); R.disco(310, 190, 29, hex('#474f60')); R.disco(310, 190, 27, TIERRA[2]); for (let k = 0; k < 40; k++) R.pset(286 + h(k, 1, 8) * 34, 164 + h(k, 2, 8) * 16, h(k, 3, 8) > .5 ? TIERRA[1] : TIERRA[4]);
  R.poligono([[176, 166], [198, 160], [204, 168], [184, 176]], K); R.poligono([[179, 167], [197, 162], [201, 168], [185, 174]], hex('#b6c0ce')); R.linea(182, 169, 196, 165, hex('#e0e6ee')); for (let i = 0; i < 16; i++) { R.rect(203 + i, 163 - (i >> 2), 203 + i, 166 - (i >> 2), K); R.rect(203 + i, 164 - (i >> 2), 203 + i, 165 - (i >> 2), hex('#a8703a')); }
  // el testigo «3»
  R.poligono([[182, 150], [189, 136], [196, 150]], K); R.poligono([[183, 149], [189, 138], [195, 149]], ORO); R.numero('3', 186, 149, { rampa: [K, K, K, K, K, K, K, K] });
});
const TROZOS = [[14, 16, 14, 9], [86, 18, 12, 9], [22, 58, 11, 8], [92, 60, 15, 10], [58, 12, 10, 7]], DEST = [[214, 126], [246, 132], [232, 108], [262, 118]];
const p3 = (t) => {
  fondo3();
  const sac = t < llave + 0.5 ? 1 : 1 - tramo(t, llave + 0.5, llave + 0.9), sx = Math.round(Math.sin(t * 15) * 3 * sac), sy = Math.round(Math.cos(t * 15) * 1 * sac);
  const cub = lerp(1.08, 0.13, sua(tramo(t, P3 + 0.05, llave + 0.2)));
  const x0 = 24 + sx, y0 = 42 + sy, x1 = 146 + sx, y1 = 136 + sy;
  // la sombra del tamiz y la tierra que va cayendo debajo
  baña(x0 + 8, y0 + 12, x1 + 8, y1 + 12, K, .32);
  const mont = tramo(t, P3, llave + 0.6); for (let k = 0; k < 70 * mont; k++) R.pset(Math.round(30 + h(k, 1, 9) * 118), Math.round(138 + h(k, 2, 9) * 12 * (0.4 + mont)), k % 3 ? TIERRA[2] : TIERRA[4]);
  if (sac > 0.2) for (let k = 0; k < 16; k++) { const u = (t * 2.2 + h(k, 5, 1)) % 1; R.pset(Math.round(34 + h(k, 6, 1) * 110), Math.round(132 + u * 16), TIERRA[3]); }
  // el marco de madera y la malla
  R.rect(x0, y0, x1, y1, K); madera(x0 + 1, y0 + 1, x1 - 1, y1 - 1, MAD3, 7, 2); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, MAD3[3]); R.rect(x0 + 7, y0 + 7, x1 - 7, y1 - 7, K); R.rect(x0 + 8, y0 + 8, x1 - 8, y1 - 8, hex('#14244a'));
  for (let x = x0 + 10; x < x1 - 8; x += 4) R.rect(x, y0 + 8, x, y1 - 8, hex('#3a4e78')); for (let y = y0 + 10; y < y1 - 8; y += 4) for (let x = x0 + 8; x <= x1 - 8; x++) R.pset(x, y, (x - x0) % 4 === 2 ? hex('#8a9ab8') : hex('#3a4e78'));
  for (const [cx, cy] of [[x0 + 3, y0 + 3], [x1 - 3, y0 + 3], [x0 + 3, y1 - 3], [x1 - 3, y1 - 3]]) { R.pset(cx, cy, K); R.pset(cx + 1, cy, hex('#c6ceda')); }
  // lo que queda en la malla: los trozos y la llave
  const sal = (k) => tramo(t, caja + k * 0.22, caja + k * 0.22 + 0.42);
  TROZOS.forEach(([dx, dy, w, hh], k) => { if (k < 4 && sal(k) > 0) return; trozo(x0 + dx, y0 + dy, w, hh, k); });
  PZ.llave(R, x0 + 62, y0 + 64, { s: 3 });
  // la tierra, que se cuela con el meneo
  for (let y = y0 + 8; y <= y1 - 8; y++) for (let x = x0 + 8; x <= x1 - 8; x++) { const n = h((x - sx) >> 1, (y - sy) >> 1, 6) * .55 + h((x - sx) >> 3, (y - sy) >> 3, 7) * .45; if (n < cub) R.pset(x, y, tono(TIERRA, 1.2 + (n / cub) * 2.6, x, y)); }
  // la llave brilla al asomar
  if (t > llave) { pulso(t, x0 + 62, y0 + 50, llave + 0.05, OROL, 10, 34, 0.8); chispa(x0 + 46, y0 + 42, t, 0); chispa(x0 + 80, y0 + 58, t, 1, OROL); if (t < llave + 1.4) elipse(x0 + 62, y0 + 50, 30, 20, OROL, 0.22 * (1 - tramo(t, llave + 0.6, llave + 1.4))); }
  // la mano que sacude el tamiz
  T.brazo(R, -8, y0 + 86, x0 - 3, y0 + 48, '#8a8e9a', 1, { codo: [6 + (sx >> 1), y0 + 72] });
  // los trozos saltan al paño y allí forman el cofre roto
  const junto = rota + 0.3, hecho = t >= junto;
  TROZOS.slice(0, 4).forEach(([dx, dy, w, hh], k) => { const v = sal(k); if (v <= 0 || hecho) return; const [ax, ay] = [24 + dx, 42 + dy], [bx, by] = DEST[k]; trozo(lerp(ax, bx, v), lerp(ay, by, v) - Math.sin(v * Math.PI) * 34, w, hh, k); });
  if (hecho) { const cxc = 242, cyc = 142; elipse(cxc, cyc, 42, 6, K, .3); PZ.cofre(R, cxc, cyc, { roto: true, s: 3 });
    const v = tramo(t, junto, junto + 0.35); if (v < 1) { R.anillo(cxc, cyc - 34, Math.round(10 + v * 34), BL); R.anillo(cxc, cyc - 34, Math.round(8 + v * 34), OROL, 2); }
    if (t > real) { const e = tramo(t, real, real + 0.25); T.visto(R, 280, Math.round(lerp(70, 64, e)), 2); R.anillo(cxc, cyc - 34, 44 + Math.round(Math.sin(t * 5) * 2), ORO, 4); chispa(cxc - 36, cyc - 62, t, 0, OROL); chispa(cxc + 38, cyc - 20, t, 1); chispa(cxc + 30, cyc - 66, t, 2, OROL); } }
  // un petirrojo picotea en el césped y pasa una hoja por la lona
  { const bx = Math.round(60 + Math.floor(t * 1.2) * 7 % 70), pica = (t * 1.2) % 1 > 0.7 ? 1 : 0, by = 15 - (((t * 1.2) % 1) < 0.2 ? 2 : 0);
    R.rect(bx, by - 3, bx + 5, by, K); R.rect(bx + 1, by - 3, bx + 4, by - 1, hex('#7a6248')); R.rect(bx + 3, by - 2 + pica, bx + 5, by - 1 + pica, hex('#e0562a')); R.pset(bx + 6, by - 3 + pica * 2, ORO); R.pset(bx + 4, by - 3 + pica, K); R.pset(bx + 2, by + 1, K); }
  { const u = (t * 0.2 + 0.3) % 1; hoja(-8 + u * 180, 152 + Math.sin(u * 18) * 5, 1, t); }
};

// ── 4: la ceremonia en Brooklyn ──
const p4 = (t) => {
  const o = { encuadre: 'biblioteca', camara: 'ceremonia' };
  T.boston(R, t, o);
  // la viuda y las hijas esperan a la derecha; en «ceremony» la viuda da un paso y habla
  const pv = tramo(t, ceremonia - 0.1, ceremonia + 0.7);
  R.actor(EL.hija2CF, 246, 156, t, { dir: -1, sonrisa: true, dedo: t > hijos && t < hijos + 1 });
  R.actor(EL.hija1CF, 224, 156, t, { dir: -1, sonrisa: true, habla: t > esposa && t < hijos && Math.sin(t * 7) > 0.2 });
  R.actor(EL.viudaCF, Math.round(lerp(206, 195, pv)), 156, t, { dir: -1, anda: pv > 0 && pv < 1, sonrisa: true, habla: pv >= 1 && Math.sin(t * 8) > 0, dedo: t > brooklyn });
  // la familia entra por la izquierda: los padres y, delante, los dos niños
  const u = sua(tramo(t, P4 + 0.15, esposa + 0.55)), anda = u > 0 && u < 1, bote = (k) => (t > hijos && t < hijos + 1.1 ? Math.abs(Math.sin((t - hijos) * 8 + k)) * 4 : 0);
  R.actor(EL.mujerKrupat, Math.round(lerp(14, 86, u)), 156, t, { dir: 1, anda, sonrisa: true, dedo: !anda && t > esposa + 0.5 && t < hijos });
  R.actor(EL.krupat, Math.round(lerp(40, 108, u)), 156, t, { dir: 1, anda, sonrisa: true, habla: !anda && t > ceremonia - 1 && t < ceremonia && Math.sin(t * 8) > 0 });
  R.actor(EL.hijaKrupat, Math.round(lerp(-12, 62, u)), 158, t, { dir: 1, anda, sonrisa: true, salto: bote(0), brazos: bote(0) > 2 });
  R.actor(EL.hijoKrupat, Math.round(lerp(-36, 40, u)), 158, t, { dir: 1, anda, sonrisa: true, salto: bote(1.4), brazos: bote(1.4) > 2 });
  const D = T.bostonDelante(R, t, o), [jx, jy] = D?.cojin ?? [160, 137];
  // la piedra espera en el cojín
  PZ.piedra(R, jx, jy, { color: 'peridoto', t }); chispa(jx + 7, jy - 12, t, 0); if (t > brooklyn) pulso(t, jx, jy - 6, brooklyn, hex('#b8e048'), 6, 18, 0.8);
  // un fogonazo de foto desde las sillas
  const f = tramo(t, brooklyn + 0.35, brooklyn + 0.55); if (f > 0 && f < 1) { R.disco(102, 166, Math.round(7 - f * 5), BL); R.anillo(102, 166, Math.round(8 + f * 8), BL, 2); }
};

// ── 5: el peridoto en el cojín (LOCAL) ──
const PAPEL = RA('#b89a62', '#c8ac74', '#d6bd88', '#e2cc9c'), GRAN = RA('#3e1420', '#5a1e2c', '#74283a', '#8e3648'), MARM = RA('#8a8478', '#b4aea0', '#d6d0c2', '#ece8de'), AZC = RA('#141e44', '#1e2c62', '#2a3c80', '#3c52a0');
const WAIN = RA('#4a2a16', '#623a20', '#7a4c2a', '#946236', '#ae7a46');
const fondo5 = fijo(() => {
  // la pared: papel de rayas (la esquina de Atom, lisa), moldura y zócalo de cuarterones
  for (let y = 0; y <= 60; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(PAPEL, 1.5 + (x > 262 && y < 54 ? 0 : (x % 16) < 8 ? .22 : -.22) + (h(x >> 1, y >> 1, 3) - .5) * .35, x, y));
  R.rect(0, 61, 319, 63, NOG[4]); R.rect(0, 64, 319, 64, NOG[0]); relleno(0, 65, 319, 101, WAIN, 1.6, .5, 2); for (let x0 = 4; x0 < 320; x0 += 54) { cuarteron(x0, 68, x0 + 48, 98, WAIN); R.rect(x0 + 6, 74, x0 + 42, 74, WAIN[4]); R.rect(x0 + 6, 92, x0 + 42, 92, WAIN[0]); R.rect(x0 + 6, 74, x0 + 6, 92, WAIN[4]); R.rect(x0 + 42, 74, x0 + 42, 92, WAIN[0]); }
  // la chimenea de mármol, con su repisa, el reloj y dos fotos pequeñas
  R.rect(10, 30, 118, 36, K); R.rect(11, 31, 117, 35, MARM[3]); R.rect(11, 34, 117, 35, MARM[1]);
  R.rect(16, 37, 112, 101, K); for (let y = 38; y <= 101; y++) for (let x = 17; x <= 111; x++) R.pset(x, y, tono(MARM, 1.9 + Math.sin(x * .2 + y * .13 + Math.sin(y * .2) * 2) * .5 + (h(x >> 1, y >> 1, 5) - .5) * .5, x, y));
  R.rect(34, 50, 94, 101, K); R.rect(36, 52, 92, 101, hex('#1a0e0a')); for (let y = 52; y <= 101; y += 5) for (let x = 36 + ((y / 5) % 2) * 5; x <= 92; x += 10) R.pset(x, y, hex('#2e1a12')); R.rect(20, 42, 108, 43, MARM[0]); R.rect(40, 96, 88, 101, hex('#3a2a22')); R.rect(42, 94, 86, 96, hex('#5a3a22'));
  R.rect(56, 18, 72, 30, K); R.rect(57, 19, 71, 29, hex('#6e4024')); R.disco(64, 24, 4, BL); R.pset(64, 24, K); R.linea(64, 24, 64, 21, K); R.linea(64, 24, 66, 25, K);
  for (const x of [24, 96]) { R.rect(x, 20, x + 10, 30, K); R.rect(x + 1, 21, x + 9, 29, ORO); R.rect(x + 2, 22, x + 8, 28, x < 50 ? hex('#7ab0d8') : hex('#a8c890')); R.rect(x + 2, 26, x + 8, 28, x < 50 ? hex('#3a6ab0') : hex('#5a9a4a')); }
  // un cuadro de paisaje y un aplique
  R.rect(138, 18, 196, 54, K); R.rect(139, 19, 195, 53, ORO); R.rect(140, 20, 194, 52, OROS); R.rect(142, 22, 192, 50, hex('#a8cce0')); for (let x = 142; x <= 192; x++) { const y = 38 + Math.round(Math.sin(x * .13) * 3); R.rect(x, y, x, 50, hex('#5a9a4a')); R.pset(x, y, hex('#3e7436')); } R.rect(142, 44, 192, 50, hex('#3a6ab0')); R.disco(180, 28, 3, hex('#f6e8a8')); R.poligono([[158, 44], [164, 34], [166, 44]], BL);
  R.rect(212, 30, 214, 44, K); R.rect(208, 26, 218, 31, K); R.rect(209, 27, 217, 30, hex('#f6e8a8'));
  // el mantel granate adamascado, con su galón y sus flecos
  for (let y = 102; y <= 168; y++) for (let x = 0; x < 320; x++) { const d = ((x + y * 2) % 28 < 2 || (x - y * 2 + 560) % 28 < 2) ? .8 : 0; R.pset(x, y, tono(GRAN, 1.6 + d + (y - 102) / 90 + (h(x >> 1, y >> 1, 4) - .5) * .4, x, y)); if ((x + y * 2) % 28 === 0 && (x - y * 2 + 560) % 28 === 0) { R.pset(x, y, ORO); R.pset(x - 1, y, OROS); R.pset(x + 1, y, OROS); } }
  R.rect(0, 102, 319, 102, K); R.rect(0, 103, 319, 103, GRAN[3]); R.rect(0, 169, 319, 170, ORO); R.rect(0, 171, 319, 171, OROS); R.rect(0, 172, 319, 179, GRAN[0]); for (let x = 1; x < 320; x += 3) R.rect(x, 172, x, 177 + (x % 2), x % 9 ? ORO : OROL);
  // en la mesa: el candelabro, el florero y nuestro libro
  R.rect(34, 146, 52, 150, K); R.rect(35, 147, 51, 149, ORO); R.rect(41, 126, 45, 146, K); R.rect(42, 127, 44, 146, ORO); R.rect(38, 122, 48, 126, K); R.rect(39, 123, 47, 125, OROL); R.rect(40, 100, 46, 122, K); R.rect(41, 101, 45, 122, hex('#f4ecd8')); R.rect(44, 101, 45, 122, hex('#d8ceb4')); elipse(46, 152, 14, 3, K, .35);
  R.poligono([[232, 150], [228, 124], [234, 112], [248, 112], [254, 124], [250, 150]], K); R.poligono([[234, 149], [230, 124], [235, 114], [247, 114], [252, 124], [248, 149]], hex('#e8ecf2')); for (let y = 118; y <= 146; y += 7) R.linea(232, y, 250, y, hex('#3a6ab0')); R.linea(233, 122, 233, 144, BL); elipse(244, 152, 16, 3, K, .35);
  for (let k = 0; k < 13; k++) { const fx = 222 + (h(k, 1, 3) * 38 | 0), fy = 78 + (h(k, 2, 3) * 30 | 0); R.linea(241, 113, fx, fy + 3, hex('#3e7436')); }
  for (let k = 0; k < 13; k++) { const fx = 222 + (h(k, 1, 3) * 38 | 0), fy = 78 + (h(k, 2, 3) * 30 | 0), c = RA('#f6f0e0', '#f0a0b0', '#f6d860', '#e86a7a')[k % 4]; R.disco(fx, fy, 3, K); R.disco(fx, fy, 2, c); R.pset(fx, fy, ORO); R.pset(fx + 4, fy + 3, hex('#5a9a4a')); }
  elipse(284, 152, 22, 4, K, .35); PZ.libro(R, 284, 152, { s: 2 });
  // el cofre roto, bajo su campana de cristal, y pétalos caídos
  elipse(94, 152, 24, 4, K, .35); R.rect(74, 146, 114, 151, K); R.rect(75, 147, 113, 150, NOG[3]); R.rect(75, 147, 113, 147, NOG[4]); PZ.cofre(R, 94, 146, { roto: true });
  for (let y = 112; y <= 146; y++) { const w = y < 124 ? Math.round(Math.sqrt(1 - ((124 - y) / 12) ** 2) * 18) : 18; R.pset(94 - w, y, hex('#d2ecf6')); R.pset(94 + w, y, hex('#9ccae0')); if (y === 112) R.rect(94 - w, y, 94 + w, y, hex('#d2ecf6')); } R.disco(94, 110, 2, K); R.pset(94, 110, hex('#d2ecf6')); R.linea(81, 126, 84, 118, BL);
  for (let k = 0; k < 12; k++) { const x = 190 + (h(k, 1, 9) * 110 | 0), y = 150 + (h(k, 2, 9) * 14 | 0), c = RA('#f0a0b0', '#f6d860', '#f6f0e0')[k % 3]; R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x, y + 1, mez(c, K, .3)); }
});
const cojin = (cx, cy, t) => {
  elipse(cx + 2, cy + 1, 52, 6, K, .4);
  R.poligono([[cx - 46, cy - 2], [cx - 48, cy - 20], [cx - 42, cy - 25], [cx + 42, cy - 25], [cx + 48, cy - 20], [cx + 46, cy - 2], [cx + 40, cy + 1], [cx - 40, cy + 1]], K);
  for (let y = cy - 24; y <= cy; y++) { const w = y < cy - 20 ? 42 + (y - cy + 24) : y > cy - 3 ? 44 - (y - cy + 3) * 2 : 46; for (let x = cx - w; x <= cx + w; x++) { const d = Math.hypot((x - cx) / 46, (y - cy + 12) / 14); R.pset(x, y, tono(AZC, 2.5 - d * 1.2 + (y - cy + 12) / -16 + (h(x >> 1, y >> 1, 2) - .5) * .4 - (Math.abs(x - cx) < 14 && Math.abs(y - cy + 10) < 4 ? .7 : 0), x, y)); } }
  for (let x = cx - 42; x <= cx + 42; x += 2) { R.pset(x, cy - 23, ORO); R.pset(x, cy - 1, OROS); }
  for (const s of [-1, 1]) { const bx = cx + s * 47, m = Math.round(Math.sin(t * 3 + s) * 1); R.rect(bx - 1, cy - 22, bx + 1, cy - 20, ORO); R.linea(bx, cy - 19, bx + m, cy - 13, ORO); R.linea(bx - 1, cy - 19, bx - 1 + m, cy - 14, OROL); R.rect(bx - 1, cy - 4, bx + 1, cy - 2, ORO); R.linea(bx, cy - 1, bx + m, cy + 4, ORO); }
};
const p5 = (t) => {
  fondo5();
  // el fuego de la chimenea y su resplandor, la vela, los pétalos y el aplique
  for (let x = 42; x <= 86; x++) { const a = 12 + Math.sin(x * .5 + t * 9) * 5 + Math.sin(x * 1.3 - t * 13) * 4 + (1 - Math.abs(x - 64) / 22) * 16; for (let y = 0; y < a; y++) R.pset(x, 95 - y, y > a * .7 ? hex('#e8562a') : y > a * .35 ? hex('#f09a2a') : hex('#f6e080')); }
  elipse(64, 100, 60, 26, hex('#f09a2a'), 0.14 + Math.sin(t * 11) * 0.04);
  { const f = Math.sin(t * 13) > 0 ? 1 : 0; R.rect(42, 95 - f, 44, 99, hex('#f09a2a')); R.pset(43, 93 - f, hex('#f6e080')); R.pset(43, 97, BL); T.b_luz(R, 43, 96, 16, hex('#f6e080'), 0.35); }
  T.b_luz(R, 213, 28, 14 + Math.round(Math.sin(t * 3)), hex('#f6e8a8'), 0.4);
  for (let k = 0; k < 2; k++) { const u = (t * 0.22 + k * 0.5) % 1; R.pset(Math.round(226 + k * 22 + Math.sin(u * 9 + k) * 4), Math.round(108 + u * 40), k ? hex('#f0a0b0') : hex('#f6d860')); }
  T.motas(R, t, 120, 300, 66, 140, 10, hex('#f6e8a8'));
  // el cojín (la viuda lo empuja un poco hacia la familia)
  const emp = sua(tramo(t, familia - 0.45, familia + 0.05)), cx = Math.round(lerp(170, 158, emp)), cy = 156;
  cojin(cx, cy, t);
  // la mano de la viuda trae la piedra y la posa en «gave»
  const va = sua(tramo(t, P5 + 0.1, dan)), puesta = t >= dan, vr = sua(tramo(t, dan + 0.1, dan + 0.5));
  const wx = puesta ? Math.round(lerp(cx + 18, cx + 54, vr)) : Math.round(lerp(300, cx + 18, va)), wy = puesta ? Math.round(lerp(cy - 14, cy - 10, vr)) : Math.round(lerp(196, cy - 14, va) - Math.sin(va * Math.PI) * 14);
  const bote = puesta ? Math.round(Math.abs(Math.sin(Math.min(1, (t - dan) / 0.4) * Math.PI * 2)) * 3 * (1 - tramo(t, dan, dan + 0.4))) : 0;
  const px = puesta ? cx : wx - 15, py = puesta ? cy - 9 - bote : wy + 7;
  const lit = tramo(t, peridot, peridot + 0.3);
  if (lit > 0) { const g = 0.8 + 0.2 * Math.sin(t * 6); T.b_luz(R, px, py - 12, 40 * g, hex('#b8e048'), 0.55 * lit);
    for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5 + t * 0.5, r0 = 18, r1 = 26 + (k % 2) * 10 + Math.sin(t * 5 + k) * 3; for (let rr = r0; rr < r1 * lit; rr += 2) R.pset(Math.round(px + Math.cos(a) * rr), Math.round(py - 12 + Math.sin(a) * rr * .8), k % 2 ? hex('#e6f6a0') : hex('#b8e048')); } }
  PZ.piedra(R, px, py, { color: 'peridoto', s: 2, t });
  if (lit > 0) { pulso(t, px, py - 12, peridot, hex('#e6f6a0'), 14, 44, 0.9); chispa(px - 18, py - 26, t, 0); chispa(px + 20, py - 6, t, 1, hex('#e6f6a0')); chispa(px + 12, py - 30, t, 2); }
  T.brazo(R, wx + 44, 192, wx, wy, '#5a3458', -1, { codo: [wx + 34, wy + 30], puno: '#f6f2ea' });
  // la mano de Krupat llega en «the family»
  const ka = sua(tramo(t, familia - 0.15, familia + 0.5)); if (ka > 0) { const kx2 = Math.round(lerp(cx - 96, cx - 55, ka)), ky2 = Math.round(lerp(196, cy - 9, ka)); T.brazo(R, kx2 - 40, 194, kx2, ky2, '#8a8e9a', 1, { codo: [kx2 - 30, ky2 + 28] }); }
};

// ── 6: los de Chicago y los de Cleveland (LOCAL) ──
const SALVIA = RA('#7a9078', '#889e84', '#96ac90', '#a4b89c'), PARQ = RA('#5a3a1e', '#74502a', '#8c6436', '#a47a46', '#b88e58');
const VIT = [[30, '1983'], [289, '2004']];
const fondo6 = fijo(() => {
  // la pared de papel salvia (la esquina de Atom, lisa), la moldura y el zócalo de cuarterones
  for (let y = 0; y <= 84; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(SALVIA, 1.5 + (x > 268 && y < 56 ? 0 : (x % 12) < 2 ? .5 : 0) + (h(x >> 1, y >> 1, 3) - .5) * .35 - (y < 6 ? .6 : 0), x, y));
  R.rect(0, 85, 319, 87, NOG[4]); R.rect(0, 88, 319, 88, NOG[0]); relleno(0, 89, 319, 128, NOG, 1.6, .5, 2); for (let x0 = 5; x0 < 320; x0 += 45) cuarteron(x0, 92, x0 + 39, 124, NOG); R.rect(0, 126, 319, 128, NOG[0]);
  // el ventanal con cortinas (la vista, en cada fotograma) y el radiador
  R.rect(50, 20, 110, 84, K); R.rect(52, 22, 108, 82, hex('#e8e0cc'));
  for (let x = 58; x <= 102; x += 4) { R.rect(x, 96, x + 2, 122, K); R.rect(x, 97, x + 1, 121, hex('#d8d4c8')); } R.rect(56, 94, 106, 96, K); R.rect(57, 95, 105, 95, hex('#f0ece0'));
  // la marina enmarcada y los apliques
  R.rect(132, 22, 196, 66, K); R.rect(133, 23, 195, 65, ORO); R.rect(135, 25, 193, 63, OROS); for (let y = 27; y <= 61; y++) for (let x = 137; x <= 191; x++) R.pset(x, y, y < 46 ? tono(RA('#e8c890', '#f0d8a8', '#c8d8e0', '#a8c4d8'), (y - 27) / 5, x, y) : tono(RA('#1e3a5a', '#2a4e74', '#3a668e'), 1.5 + Math.sin(x * .6 + y) * .8, x, y));
  R.poligono([[158, 46], [163, 31], [166, 46]], BL); R.poligono([[167, 46], [167, 34], [174, 46]], hex('#e0d8c0')); R.rect(156, 46, 176, 48, hex('#5a3a1e')); R.disco(184, 33, 2, hex('#f6e8a8'));
  for (const x of [120, 208]) { R.rect(x, 36, x + 2, 50, K); R.rect(x - 4, 30, x + 6, 36, K); R.rect(x - 3, 31, x + 5, 35, hex('#f6e8a8')); }
  // la librería
  R.rect(222, 24, 266, 84, K); R.rect(224, 26, 264, 82, NOG[0]); for (const yb of [44, 63, 82]) { R.rect(223, yb - 1, 265, yb, NOG[3]); let x = 226; while (x < 260) { const w = 3 + (h(x, yb, 4) * 3 | 0), hh = 11 + (h(x, yb, 5) * 5 | 0), c = RA('#7a1e26', '#2a4a7a', '#2a5a3a', '#6a4a2a', '#5a2a4a', '#c8a040')[h(x, yb, 6) * 6 | 0]; if (x + w > 263) break; R.rect(x, yb - 1 - hh, x + w - 1, yb - 2, c); R.rect(x, yb - 1 - hh, x, yb - 2, mez(c, BL, .25)); R.pset(x + 1, yb - 5, ORO); x += w + (h(x, yb, 7) > .85 ? 3 : 0); } }
  // el parqué en espiga y la alfombra del pasillo
  for (let y = 129; y < 180; y++) for (let x = 0; x < 320; x++) { const d = ((x + (((y - 129) / 6 | 0) % 2 ? y : -y)) % 12 + 12) % 12; R.pset(x, y, tono(PARQ, 1.8 + (d < 1 ? -1.2 : 0) + ((y - 129) % 6 === 0 ? -1 : 0) + (h(x >> 2, y >> 1, 5) - .5) * .8 + (y - 129) / 60, x, y)); }
  R.poligono([[146, 129], [174, 129], [196, 179], [124, 179]], GRAN[1]); for (let y = 130; y < 180; y++) { const a = lerp(146, 124, (y - 129) / 50), b = lerp(174, 196, (y - 129) / 50); for (let x = Math.round(a); x <= b; x++) R.pset(x, y, tono(GRAN, 1.8 + (((x - a) < 3 || (b - x) < 3) ? 1.2 : 0) + (h(x >> 1, y >> 1, 2) - .5) * .6, x, y)); R.pset(Math.round(a) + 1, y, ORO); R.pset(Math.round(b) - 1, y, ORO); }
  // las dos vitrinas con los cofres, sus peanas de mármol y la placa con el año
  for (const [x, año] of VIT) { elipse(x, 153, 20, 4, K, .35); R.rect(x - 10, 120, x + 10, 152, K); for (let y = 121; y <= 151; y++) for (let xx = x - 9; xx <= x + 9; xx++) R.pset(xx, y, tono(MARM, 2 + Math.sin(xx * .5 + y * .2) * .5 - (xx > x + 5 ? .9 : 0), xx, y)); R.rect(x - 13, 116, x + 13, 120, K); R.rect(x - 12, 117, x + 12, 119, MARM[3]); R.rect(x - 13, 149, x + 13, 153, K); R.rect(x - 12, 150, x + 12, 152, MARM[2]);
    PZ.cofre(R, x, 116, {});
    R.rect(x - 19, 156, x + 19, 169, K); R.rect(x - 18, 157, x + 18, 168, hex('#2a2430')); R.rect(x - 18, 157, x + 18, 157, ORO); R.numero(año, x, 167, { centro: true }); }
});
const silla6 = (x, y) => { R.rect(x, y - 24, x + 15, y - 9, K); R.rect(x + 1, y - 23, x + 14, y - 10, NOG[3]); R.rect(x + 3, y - 21, x + 12, y - 12, hex('#8e3648')); R.rect(x + 3, y - 21, x + 12, y - 21, hex('#b04a5c')); R.rect(x, y - 9, x + 15, y - 6, K); R.rect(x + 1, y - 8, x + 14, y - 7, hex('#74283a')); R.rect(x, y - 6, x + 1, y, K); R.rect(x + 14, y - 6, x + 15, y, K); };
const p6 = (t) => {
  fondo6();
  // por el ventanal: el cielo, las casas de piedra parda y un árbol de otoño; hojas que caen
  R.recorte([52, 22, 108, 82]);
  for (let y = 22; y <= 82; y++) for (let x = 52; x <= 108; x++) R.pset(x, y, tono(RA('#8ab8e0', '#a8cce8', '#c8e0f0'), (y - 22) / 22, x, y));
  nube3(((t * 3 + 70) % 90) + 36, 32, 16, RA('#c0d0e0', '#eef2f6', '#ffffff'));
  for (let k = 0; k < 3; k++) { const x0 = 52 + k * 20; for (let y = 50 - (k % 2) * 6; y <= 82; y++) for (let x = x0; x < x0 + 19; x++) R.pset(x, y, x === x0 ? hex('#4a2a22') : tono(RA('#6a3a2e', '#7e483a', '#925848'), 1.4 + (y % 4 === 0 ? -1 : 0), x, y)); for (const [wx, wy] of [[4, 6], [12, 6], [4, 18], [12, 18]]) { const yy = 50 - (k % 2) * 6 + wy; R.rect(x0 + wx - 1, yy - 1, x0 + wx + 3, yy + 5, K); R.rect(x0 + wx, yy, x0 + wx + 2, yy + 4, (k + wx + wy) % 3 ? hex('#a8c4d8') : hex('#f6e8a8')); } }
  { const m = Math.round(Math.sin(t * 1.3)); R.linea(96, 82, 96, 62, hex('#4a3020')); R.linea(97, 82, 97, 62, hex('#4a3020')); for (const [dx, dy, rr, c] of [[0, 0, 9, '#c85a24'], [-6, 4, 6, '#e08a2a'], [6, 3, 6, '#e8b83a'], [1, -5, 5, '#e08a2a']]) R.disco(96 + dx + m, 56 + dy, rr, hex(c)); }
  for (let k = 0; k < 4; k++) { const u = (t * 0.25 + k * 0.27) % 1; hoja(60 + k * 12 + Math.sin(u * 8 + k) * 5, 24 + u * 58, k, t); }
  R.recorte(null);
  R.rect(79, 22, 80, 82, hex('#e8e0cc')); R.rect(52, 50, 108, 51, hex('#e8e0cc'));
  for (const s of [0, 1]) for (let y = 16; y <= 90; y++) { const w = 9 + Math.round(Math.sin(y * .22 + s * 2) * 2 + Math.sin(t * 1.4 + y * .1) * .6), xa = s ? 112 - w : 46; for (let x = xa; x <= xa + w; x++) R.pset(x, y, x === xa || x === xa + w ? K : tono(GRAN, 1.6 + Math.sin(x * 1.2 + y * .05) * 1.1, x, y)); } R.rect(42, 14, 118, 17, K); R.rect(43, 15, 117, 16, ORO);
  for (const x of [121, 209]) T.b_luz(R, x, 33, 13 + Math.round(Math.sin(t * 3 + x)), hex('#f6e8a8'), 0.4);
  // las vitrinas se iluminan cuando se nombra a cada grupo
  VIT.forEach(([x], i) => { const t0 = i ? cle : chi, on = tramo(t, t0, t0 + 0.3);
    if (on > 0) { T.b_luz(R, x, 104, 30, hex('#f6e8a8'), 0.5 * on); PZ.cofre(R, x, 116, {}); pulso(t, x, 104, t0, OROL, 12, 30, 0.8); chispa(x - 12, 92, t, i); chispa(x + 13, 100, t, i + 2, OROL); }
    R.rect(x - 15, 92, x - 15, 116, hex('#d2ecf6')); R.rect(x + 15, 92, x + 15, 116, hex('#9ccae0')); R.rect(x - 15, 91, x + 15, 91, hex('#d2ecf6')); R.linea(x - 12, 100, x - 8, 94, BL); });
  // la fila de atrás: público que aplaude
  const palm = (k) => Math.sin(t * 15 + k * 1.7) > 0;
  [[EL.senora30, 66, 1], [EL.senor30, 96, 1], [EL.clienta, 204, -1], [EL.turista1, 236, -1]].forEach(([d, x, dir], k) => R.actor(d, x, 141, t, { dir, sonrisa: true, brazos: palm(k + 5) && (t < halladores || t > tambien) }));
  for (const x of [54, 80, 106, 192, 218, 244]) silla6(x, 154);
  // los tres de Chicago, ya adultos, y los dos de Cleveland
  const fin = t > tambien, bot = (k) => (fin ? Math.abs(Math.sin((t - tambien) * 7 + k)) * 3 : 0), arr = (t0) => t > t0 && !fin;
  const CANA = { h: hex('#c8c8d0') };
  const c1 = R.actor(EL.chico1CF, 58, 156, t, { dir: 1, sonrisa: true, bigote: true, pal: CANA, sostiene: arr(chi) ? [76, Math.round(lerp(140, 124, tramo(t, chi, chi + 0.3)))] : false, brazos: (!arr(chi) && palm(0)) || fin, salto: bot(0) });
  if (arr(chi)) { PZ.piedra(R, c1.mano[0], c1.mano[1] + 1, { color: 'esmeralda', t }); chispa(c1.mano[0] + 6, c1.mano[1] - 12, t, 0); }
  R.actor(EL.chico2CF, 84, 157, t, { dir: 1, sonrisa: true, pal: CANA, brazos: palm(1) || fin || arr(chi), salto: bot(1) + (arr(chi) && t < chi + 0.8 ? Math.abs(Math.sin((t - chi) * 9)) * 3 : 0) });
  R.actor(EL.chico3CF, 108, 156, t, { dir: 1, sonrisa: true, barba: true, brazos: palm(2) || fin, dedo: arr(chi) && t < chi + 1, salto: bot(2) });
  const z = R.actor(EL.zinn, 196, 156, t, { dir: -1, sonrisa: true, pal: CANA, sostiene: arr(cle) ? [194, Math.round(lerp(140, 124, tramo(t, cle, cle + 0.3)))] : false, brazos: (!arr(cle) && palm(3)) || fin, salto: bot(3) });
  if (arr(cle)) { PZ.piedra(R, z.mano[0], z.mano[1] + 1, { color: 'aguamarina', t }); chispa(z.mano[0] - 6, z.mano[1] - 12, t, 1); }
  R.actor(EL.abrams, 222, 157, t, { dir: -1, sonrisa: true, pal: CANA, brazos: palm(4) || fin || arr(cle), salto: bot(4) + (arr(cle) && t < cle + 0.8 ? Math.abs(Math.sin((t - cle) * 9)) * 3 : 0) });
  // confeti de pétalos al final
  if (t > chi) for (let k = 0; k < 14; k++) { const u = ((t - chi) * 0.35 + h(k, 1, 4)) % 1; R.pset(Math.round(60 + h(k, 2, 4) * 200 + Math.sin(u * 9 + k) * 5), Math.round(60 + u * 110), RA('#f0a0b0', '#f6d860', '#f6f0e0', '#b8e048')[k % 4]); }
};
const efectos = [[sol, 'brillo'], [misma + 0.4, 'pop'], [otras + 0.4, 'pop'], [P2 + 0.33, 'golpecito'], [P2 + 1.0, 'golpecito'], [P2 + 1.67, 'golpecito'], [cavan + 0.2, 'golpecito'], [hallan + 0.2, 'pop'],
  [P3 + 0.1, 'papel'], [llave + 0.05, 'brillo'], [caja + 0.42, 'tic'], [caja + 0.86, 'tic'], [rota + 0.3, 'pop'], [real, 'brillo'],
  [hijos + 0.1, 'boing'], [brooklyn + 0.35, 'flash'], [dan, 'tic'], [peridot, 'brillo'], [P6 + 0.2, 'publico'], [chi, 'pop'], [cle, 'pop'], [tambien, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 2019 });
''')

# ─────────────────────────────────────────────────────────────── cf-nueve ──
E['cf-nueve'] = ('Quedan nueve', '''// CF-NUEVE (frase 26), hoy. Cuatro planos:
// 1. hoy/mapa (o.encontrados 3; 2.ª vez): en «nine» el puntero toca el mapa y los nueve interrogantes saltan como
//    palomitas (gag 7, o.dudas); en «agree on several» el puntero rodea con una línea de puntos las del este. Corta en
//    «New York».
// 2. (LOCAL) T.mapa de cerca, la mitad este: las chinchetas caen una a una al nombrarlas (Nueva York, Houston, Milwaukee,
//    San Agustín, Nueva Orleans, Montreal) y la lupa va de una a otra; las tres verdes ya están. Corta en «Roanoke».
// 3. (LOCAL) dos postales sujetas con chincheta: la isla de dunas de Roanoke (la chincheta cae en «Roanoke») y la fila de
//    casas de colores de Charleston (en «Charleston»); en «the exact spot is disputed» la X salta de un sitio a otro
//    con un «?». Corta en «and San Francisco».
// 4. (LOCAL) San Francisco: el puente rojo entre la niebla que pasa, el faro que barre, un carguero; en «mystery», un gran
//    «?» asoma en la niebla.''', UTIL + r'''
const n = (f) => en('nueve', f);
const P2 = n(.229), P3 = n(.516), P4 = n(.848);
const nueve = n(.017), cazadores = n(.074), acuerdo = n(.111), varias = n(.150), NY = n(.244), HOU = n(.280), MIL = n(.321), AGU = n(.368), ORL = n(.424), MON = n(.471);
const ROA = n(.522), CAR = n(.592), CHA = n(.672), aunque = n(.730), disputa = n(.820), SF = n(.878), misterio = n(.965);
// un «?» que salta como una palomita en (x, y) desde t0
const palomita = (t, x, y, t0, k = 0) => { const v = tramo(t, t0, t0 + 0.35); if (v <= 0) return; const bot = v < 1 ? Math.sin(v * Math.PI) * 9 : Math.abs(Math.sin(t * 3.4 + k * 1.3)) * 2, py = Math.round(y - 12 * v - bot);
  R.disco(x, py + 1, 6, K); R.disco(x - 3, py - 2, 3, K); R.disco(x + 3, py - 1, 3, K); R.disco(x - 3, py - 2, 2, hex('#fff6d8')); R.disco(x + 3, py - 1, 2, hex('#f4dc9a')); R.disco(x, py + 1, 5, hex('#fff0c0')); R.icono('?', x - 2, py - 2, hex('#a82c28'), hex('#f4dc9a')); };
// el puntero de madera con su contera de latón, de la mano (abajo) a la punta
const puntero = (hx, hy, px, py) => { for (const [dx, dy, c] of [[0, -1, K], [0, 2, K], [0, 0, hex('#b07e44')], [0, 1, hex('#7a5028')]]) R.linea(hx + dx, hy + dy, px + dx, py + dy, c);
  const ux = (hx - px) / Math.hypot(hx - px, hy - py), uy = (hy - py) / Math.hypot(hx - px, hy - py); for (let i = 0; i < 7; i++) { R.pset(Math.round(px + ux * i), Math.round(py + uy * i), i < 2 ? OROL : ORO); R.pset(Math.round(px + ux * i), Math.round(py + uy * i) + 1, OROS); }
  T.mano(R, hx - 4, hy + 1, 1, '#3a6ab0', { sinManga: true }); };

// ── 1: los nueve interrogantes (gag 7) ──
const p1 = (t) => {
  const g = T.hoy(R, t, { encuadre: 'mapa', encontrados: 3, dudas: tramo(t, nueve, nueve + 2.3) * 0.85 });
  const L = g.lista, orden = [11, 5, 3, 8, 9, 6, 4, 7, 10];
  // la línea de puntos que rodea las del este en «agree on several»
  const ro = tramo(t, acuerdo, varias + 0.5); if (ro > 0) for (let k = 0; k < 200 * ro; k++) { const a = -Math.PI / 2 + k / 200 * Math.PI * 2; if ((k + Math.floor(t * 8)) % 6 < 2) continue; const x = Math.round(214 + Math.cos(a) * 62), y = Math.round(88 + Math.sin(a) * 66); R.rect(x, y, x + 1, y + 1, ROJO); R.pset(x + 1, y + 2, hex('#7a1e26')); }
  // el puntero: toca San Francisco en «nine», barre hacia el este mientras saltan y luego rodea la costa
  let tip;
  if (t < nueve) { const u = sua(tramo(t, 0.25, nueve - 0.08)); tip = [lerp(96, L[11][0] + 2, u), lerp(190, L[11][1] + 2, u) - Math.sin(u * Math.PI) * 10]; }
  else if (t < acuerdo) { const s = Math.min(8, (t - nueve) / 0.2), i = Math.floor(s), f = sua(s - i), A = L[orden[Math.min(8, i)]], B = L[orden[Math.min(8, i + 1)]]; tip = [lerp(A[0], B[0], f) + 2, lerp(A[1], B[1], f) + 2 - Math.sin(f * Math.PI) * 6]; }
  else { const a = -Math.PI / 2 + ro * Math.PI * 2, u = sua(tramo(t, acuerdo - 0.3, acuerdo)); tip = [lerp(L[10][0], 214 + Math.cos(a) * 62, u), lerp(L[10][1], 88 + Math.sin(a) * 66, u)]; }
  const hx = Math.round(cl(tip[0] * 0.55 + 40, 30, 250)), hy = 172;
  puntero(hx, hy, Math.round(tip[0]), Math.round(tip[1]));
  if (t > nueve - 0.05 && t < nueve + 0.4) pulso(t, L[11][0], L[11][1] - 2, nueve - 0.05, OROL, 4, 16, 0.45);
};

// ── 2: la mitad este, de cerca (LOCAL: T.mapa) ──
const NOMBRADAS = [['nuevaYork', NY], ['houston', HOU], ['milwaukee', MIL], ['sanAgustin', AGU], ['nuevaOrleans', ORL], ['montreal', MON]];
const LL = Object.fromEntries(T.F_CIUDADES.map(([k, lon, lat]) => [k, [lon, lat]]));
const p2 = (t) => {
  const P = T.mapa(R, t, { zoom: 1.4, centro: [-82.5, 38.6], rosa: [262, 140] });
  const en2 = (k) => P(LL[k]).map(Math.round);
  // las tres encontradas, en verde y con su marca; Roanoke y Charleston esperan en gris
  for (const k of ['chicago', 'cleveland', 'boston']) { const [x, y] = en2(k); T.chincheta(R, x, y, t, VERDE); T.visto(R, x - 5, y - 20, 1); }
  for (const k of ['roanoke', 'charleston']) { const [x, y] = en2(k); T.chincheta(R, x, y, t, hex('#9a9aa0')); }
  // las que se nombran caen una a una, con su «?»
  const orden = NOMBRADAS.map(([k, t0]) => [en2(k), t0]).sort((a, b) => a[0][1] - b[0][1]);
  for (const [[x, y], t0] of orden) { const b = tramo(t, t0 - 0.28, t0); if (b <= 0) continue; T.chincheta(R, x, y, t, ROJO, { baja: b, pulso: t > t0 && t < t0 + 0.9 }); }
  NOMBRADAS.forEach(([k, t0], i) => { const [x, y] = en2(k); palomita(t, x + (k === 'nuevaYork' || k === 'sanAgustin' ? 10 : -9), y - 6, t0 + 0.12, i); });
  // la lupa va de una a otra
  let lx, ly; { let i = 0; while (i < 5 && t > NOMBRADAS[i + 1][1] - 0.45) i++; const A = en2(NOMBRADAS[i][0]), B = i > 0 ? en2(NOMBRADAS[i - 1][0]) : [A[0] + 60, A[1] + 80], u = sua(tramo(t, (i > 0 ? NOMBRADAS[i][1] : P2 + 0.55) - 0.45, (i > 0 ? NOMBRADAS[i][1] : P2 + 0.55) - 0.05)); lx = Math.round(lerp(B[0], A[0], u)); ly = Math.round(lerp(B[1], A[1], u) - 4); }
  baña(lx - 13, ly - 13, lx + 13, ly + 13, BL, 0.16, (x, y) => (Math.hypot(x - lx, y - ly) < 12.5 ? 1 : 0));
  for (const [rr, c] of [[15, K], [14, ORO], [13, OROL], [12, K]]) R.anillo(lx, ly, rr, c); R.linea(lx - 7, ly - 6, lx - 3, ly - 9, BL);
  for (const [d, c] of [[-1, K], [0, hex('#7a5028')], [1, hex('#b07e44')], [2, hex('#7a5028')], [3, K]]) R.linea(lx + 10 + d, ly + 11 - d, lx + 26 + d, ly + 27 - d, c);
};

// ── 3: Roanoke y Charleston, dos postales (LOCAL) ──
const CIE = RA('#7ab4e4', '#96c6ec', '#b4d8f2', '#d4e8f6', '#f0f2e8'), MAR = RA('#1e4a7a', '#2a629a', '#3a7cb4', '#5a9cc8', '#8cc0dc'), ARENA = RA('#b89a62', '#d0b47a', '#e2cc96', '#f0e0b4'), CORCHO = RA('#7a5430', '#94683c', '#aa7c4c', '#be9260');
const PA = [10, 24, 138, 168], PB = [152, 24, 268, 168];
const CASAS = [[154, '#f0a0a8', '#c87078'], [177, '#f6dc8a', '#d0b060'], [200, '#9cd0c0', '#6aa898'], [223, '#f0b080', '#c88858'], [246, '#a8c0e8', '#7a94c4']];
const fondo3 = fijo(() => {
  // el tablero de corcho con sus poros, el marco y unas notas (rayas)
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(CORCHO, 1.6 + (h(x, y, 1) - .5) * 1.5 + (h(x >> 2, y >> 2, 2) - .5) * .8, x, y));
  for (let k = 0; k < 160; k++) { const x = h(k, 1, 3) * 320 | 0, y = 16 + (h(k, 2, 3) * 164 | 0); if (x > 270 && y < 50) continue; R.pset(x, y, CORCHO[0]); if (k % 4 === 0) R.pset(x + 1, y, hex('#5a3a1e')); }
  // las dos postales, con su borde blanco y su sombra
  for (const [a, b, c, d] of [PA, PB]) { baña(a - 1, b + 1, c + 7, d + 8, K, .35); R.rect(a - 5, b - 5, c + 5, d + 5, K); R.rect(a - 4, b - 4, c + 4, d + 4, hex('#f4f0e4')); R.rect(a - 4, d + 3, c + 4, d + 4, hex('#d4ccb8')); R.rect(a - 1, b - 1, c + 1, d + 1, K); }
  // a la derecha, bajo Atom: una nota con su «?», la llave colgada de un clavo y la foto de un cofre
  baña(284, 62, 314, 94, K, .3); R.rect(280, 58, 310, 90, K); R.rect(281, 59, 309, 89, hex('#f6e27a')); R.rect(281, 86, 309, 89, hex('#d8c050')); R.icono('?', 288, 64, hex('#a82c28'), hex('#d8c050'), 3); R.disco(295, 59, 2, K); R.disco(295, 59, 1, ROJO);
  R.disco(296, 104, 2, K); R.pset(296, 104, hex('#c6ceda')); R.linea(296, 105, 294, 112, hex('#e8e0c0')); PZ.llave(R, 296, 122, {});
  baña(283, 134, 315, 172, K, .3); R.rect(279, 130, 311, 168, K); R.rect(280, 131, 310, 167, hex('#f4f0e4')); R.rect(283, 134, 307, 160, hex('#3e7436')); PZ.cofre(R, 295, 159, {}); R.disco(295, 131, 2, K); R.disco(295, 131, 1, hex('#3a6ab0'));
  // ── Roanoke: cielo, mar, la isla de dunas con pinos y una pasarela de tablas ──
  { const [a, b, c, d] = PA;
    for (let y = b; y <= 88; y++) for (let x = a; x <= c; x++) R.pset(x, y, tono(CIE, (y - b) / 15, x, y));
    for (let y = 89; y <= 124; y++) for (let x = a; x <= c; x++) R.pset(x, y, tono(MAR, 3.6 - (y - 89) / 12 + Math.sin(x * .35 + y * 1.3) * .5, x, y));
    // la orilla lejana con pinos
    for (let x = a; x <= c; x++) { const hh = 3 + Math.round(Math.sin(x * .07) * 2 + h(x >> 2, 0, 5) * 3); if (x < 84) { R.rect(x, 88 - hh, x, 88, hex('#2a5a3a')); if (x % 3 === 0) R.pset(x, 87 - hh, hex('#1e4a34')); } R.pset(x, 89, hex('#d4e8f6')); }
    // las dunas de delante
    for (let x = a; x <= c; x++) { const top = 120 - Math.round(Math.sin((x - a) * .035 + .4) * 9 + Math.sin(x * .11) * 2); for (let y = top; y <= d; y++) R.pset(x, y, tono(ARENA, 2.6 - (y - top) / 22 + Math.sin(x * .09 + y * .25) * .4 + (h(x >> 1, y >> 1, 6) - .5) * .5 - (y === top ? -1 : 0), x, y)); R.pset(x, top - 1, K); }
    for (let i = 0; i < 9; i++) { const x = 50 + i * 7, y = 150 - i * 3; R.rect(x, y, x + 8, y + 2, K); R.rect(x, y, x + 7, y + 1, hex('#b07e44')); if (i % 2) { R.rect(x + 3, y - 7, x + 4, y, K); R.pset(x + 3, y - 6, hex('#b07e44')); } }
    // un pino retorcido a la derecha
    R.linea(120, 136, 124, 112, K); R.linea(121, 136, 125, 112, hex('#5a3a1e')); R.linea(122, 136, 126, 112, K); for (const [dx, dy, rr] of [[0, 0, 9], [-9, 4, 6], [8, 5, 6], [2, -7, 6]]) { R.disco(125 + dx, 106 + dy, rr + 1, K); } for (const [dx, dy, rr] of [[0, 0, 9], [-9, 4, 6], [8, 5, 6], [2, -7, 6]]) R.disco(125 + dx, 106 + dy, rr, hex('#2a5a3a')); for (const [dx, dy] of [[-3, -3], [-10, 2], [5, -9], [7, 2]]) R.disco(125 + dx, 106 + dy, 3, hex('#3e7a4c'));
  }
  // ── Charleston: cielo, el campanario blanco, la fila de casas de colores, la calle empedrada y el agua ──
  { const [a, b, c, d] = PB;
    for (let y = b; y <= 120; y++) for (let x = a; x <= c; x++) R.pset(x, y, tono(RA('#8cc0e8', '#a8d0ee', '#c8e0f2', '#f0e0c0', '#f6d8b0'), (y - b) / 20, x, y));
    // el campanario
    R.rect(187, 48, 199, 84, K); R.rect(188, 49, 198, 84, BL); R.rect(196, 49, 198, 84, hex('#d0d4de')); R.poligono([[185, 49], [193, 26], [201, 49]], K); R.poligono([[187, 48], [193, 29], [199, 48]], hex('#8c90a4')); R.rect(191, 54, 195, 62, K); R.rect(192, 55, 194, 61, hex('#3a4a6a')); R.rect(190, 68, 196, 69, hex('#8c90a4')); R.linea(193, 26, 193, 22, K);
    for (const [x0, c1, c2] of CASAS) { const w = 23, y0 = 84 - ((x0 / 24 | 0) % 2) * 5, x1 = Math.min(c, x0 + w);
      R.rect(x0, y0, x1, 134, K); for (let y = y0 + 1; y <= 133; y++) for (let x = x0 + 1; x < x1; x++) R.pset(x, y, x > x1 - 4 ? hex(c2) : (y % 5 === 0 ? mez(hex(c1), K, .12) : hex(c1)));
      R.poligono([[x0 - 1, y0], [x0 + 4, y0 - 7], [x1 - 3, y0 - 7], [x1 + 1, y0]], K); R.poligono([[x0 + 1, y0 - 1], [x0 + 5, y0 - 6], [x1 - 4, y0 - 6], [x1 - 1, y0 - 1]], hex('#7a4a3a')); R.rect(x0 + 14, y0 - 12, x0 + 17, y0 - 6, K); R.pset(x0 + 15, y0 - 10, hex('#925848'));
      for (const wy of [y0 + 6, y0 + 22]) for (const wx of [x0 + 4, x0 + 14]) { if (wx + 5 >= c) continue; R.rect(wx - 2, wy - 1, wx + 6, wy + 9, hex(c2)); R.rect(wx, wy, wx + 4, wy + 8, K); R.rect(wx + 1, wy + 1, wx + 3, wy + 7, hex('#5a7aa8')); R.pset(wx + 1, wy + 1, hex('#c8e0f2')); R.rect(wx - 2, wy, wx - 1, wy + 8, hex('#2a5a4a')); R.rect(wx + 5, wy, wx + 6, wy + 8, hex('#2a5a4a')); }
      if (x0 + 12 < c) { R.rect(x0 + 8, 118, x0 + 15, 134, K); R.rect(x0 + 9, 119, x0 + 14, 134, hex('#3a2a4a')); R.pset(x0 + 13, 127, ORO); R.rect(x0 + 7, 116, x0 + 16, 117, BL); } }
    // la acera, la calle empedrada, el muelle y el agua
    R.rect(a, 135, c, 137, hex('#d4ccb8')); R.rect(a, 138, c, 138, K);
    for (let y = 139; y <= 152; y++) for (let x = a; x <= c; x++) R.pset(x, y, ((x + ((y / 3 | 0) % 2) * 3) % 6 === 0 || y % 3 === 0) ? hex('#6a6470') : tono(RA('#8a8490', '#9c96a2', '#aea8b2'), 1.5 + (h(x / 6 | 0, y / 3 | 0, 4) - .5) * 2, x, y));
    R.rect(a, 153, c, 155, K); R.rect(a, 154, c, 154, hex('#b07e44')); for (let x = a + 6; x < c; x += 22) { R.rect(x, 151, x + 3, 160, K); R.rect(x + 1, 152, x + 2, 159, hex('#7a5028')); }
    for (let y = 156; y <= d; y++) for (let x = a; x <= c; x++) if (R.pget(x, y) !== K && R.pget(x, y) !== hex('#7a5028')) R.pset(x, y, tono(MAR, 2.2 - (y - 156) / 10 + Math.sin(x * .4 + y * 1.1) * .6, x, y));
  }
});
const palmito = (x, y, t, k) => { const m = Math.sin(t * 1.6 + k) * 1.5; for (let i = 0; i < 26; i++) { const xx = x + Math.round(Math.sin(i * .08 + k) * 2); R.rect(xx - 1, y - i, xx + 2, y - i, K); R.rect(xx, y - i, xx + 1, y - i, i % 3 ? hex('#8a6a44') : hex('#6a4a2a')); }
  const tx = x + Math.round(Math.sin(26 * .08 + k) * 2), ty = y - 27; for (let a = 0; a < 8; a++) { const an = -Math.PI * (0.02 + a / 7 * 0.96), l = 11 + (a % 2) * 2; R.linea(tx, ty, Math.round(tx + Math.cos(an) * l + m), Math.round(ty + Math.sin(an) * l * .8 + 4 + Math.abs(Math.cos(an)) * 3), K); R.linea(tx, ty - 1, Math.round(tx + Math.cos(an) * l + m), Math.round(ty - 1 + Math.sin(an) * l * .8 + 4 + Math.abs(Math.cos(an)) * 3), a % 2 ? hex('#3e8a4a') : hex('#2a6a3a')); } R.disco(tx, ty, 2, hex('#2a6a3a')); };
const XS = [[178, 146], [238, 148], [208, 136], [254, 162]];
const p3 = (t) => {
  fondo3();
  // ── la vida de Roanoke ──
  R.recorte(PA);
  nube3(((t * 4 + 30) % 190) - 10, 40, 26, RA('#b8cce0', '#eef2f6', '#ffffff')); nube3(((t * 2.4 + 120) % 200) - 20, 60, 18, RA('#c4d4e4', '#f2f4f6', '#ffffff')); nube3(((t * 1.5 + 80) % 210) - 20, 76, 12, RA('#d0dce8', '#f6f6f6', '#ffffff'));
  for (let k = 0; k < 14; k++) { const x = PA[0] + ((k * 37 + t * (6 + k % 3 * 3)) % 128), y = 92 + (k * 7) % 30; R.pset(x, y, MAR[4]); R.pset(x + 1, y, MAR[4]); if (k % 2) R.pset(x + 2, y, BL); }
  { const bx = Math.round(40 + t * 5), by = 98 + Math.round(Math.sin(t * 2)); R.poligono([[bx, by - 12], [bx, by - 2], [bx + 8, by - 2]], K); R.poligono([[bx + 1, by - 9], [bx + 1, by - 3], [bx + 6, by - 3]], BL); R.rect(bx - 5, by - 1, bx + 9, by + 1, K); R.rect(bx - 4, by - 1, bx + 8, by, hex('#b0563a')); R.pset(bx + 12, by + 1, BL); }
  for (let k = 0; k < 3; k++) { const gx = ((t * (14 + k * 4) + k * 70) % 180) + PA[0] - 16, gy = 46 + k * 9 + Math.sin(t * 2 + k) * 3, al = Math.sin(t * 9 + k) > 0 ? 1 : -1; R.pset(gx, gy, K); R.pset(gx - 1, gy - al, K); R.pset(gx + 1, gy - al, K); R.pset(gx - 2, gy - al, BL); R.pset(gx + 2, gy - al, BL); }
  for (let k = 0; k < 26; k++) { const x = PA[0] + 4 + (k * 53) % 122, top = 120 - Math.round(Math.sin((x - PA[0]) * .035 + .4) * 9 + Math.sin(x * .11) * 2) + 2 + (k * 11) % 26, m = Math.round(Math.sin(t * 2.2 + k) * 1.5); if (x > 48 && x < 116 && top > 124) continue; R.linea(x, top + 6, x + m, top, hex('#8a9a4a')); R.linea(x + 2, top + 6, x + 3 + m, top + 1, hex('#a8b060')); R.pset(x + m, top - 1, hex('#e8d890')); }
  { const cx = Math.round(92 + Math.sin(t * 0.9) * 10), cy = 162; R.rect(cx - 3, cy - 2, cx + 3, cy, K); R.rect(cx - 2, cy - 2, cx + 2, cy - 1, hex('#e86a4a')); R.pset(cx - 4, cy - 3 - (Math.sin(t * 8) > 0 ? 1 : 0), hex('#e86a4a')); R.pset(cx + 4, cy - 3 - (Math.sin(t * 8) > 0 ? 0 : 1), hex('#e86a4a')); }
  R.recorte(null);
  // ── la vida de Charleston ──
  R.recorte(PB);
  nube3(((t * 3 + 40) % 150) + 140, 40, 20, RA('#c8d4e0', '#f2f2f0', '#ffffff')); nube3(((t * 1.8 + 100) % 140) + 140, 62, 13, RA('#e0d0c0', '#f6eee0', '#ffffff'));
  for (let k = 0; k < 10; k++) { const x = PB[0] + ((k * 41 + t * (5 + k % 3 * 2)) % 116), y = 158 + (k * 5) % 10; if (R.pget(x, y) !== K) { R.pset(x, y, MAR[4]); R.pset(x + 1, y, MAR[3]); } }
  for (let k = 0; k < 2; k++) { const gx = ((t * (12 + k * 5) + k * 90) % 140) + PB[0] - 14, gy = 52 + k * 12 + Math.sin(t * 2 + k) * 3, al = Math.sin(t * 9 + k) > 0 ? 1 : -1; if (gx > 262 && gy < 50) continue; R.pset(gx, gy, K); R.pset(gx - 1, gy - al, K); R.pset(gx + 1, gy - al, K); }
  R.recorte(null);
  // dos paseantes y un carrito de flores por la calle; los palmitos, delante
  { const x = Math.round(158 + ((t - P3) * 9) % 90); R.actor(EL.turista1, x, 150, t, { dir: 1, anda: true }); }
  { const x = Math.round(250 - ((t - P3) * 7) % 80); R.actor(EL.senora30, x, 146, t, { dir: -1, anda: true }); }
  palmito(166, 150, t, 0); palmito(260, 152, t, 2);
  // las chinchetas que sujetan cada postal caen cuando se nombran, con su «?»
  const cA = [(PA[0] + PA[2]) >> 1, PA[1] + 3], cB = [(PB[0] + PB[2]) >> 1, PB[1] + 3];
  [[cA, ROA], [cB, CHA]].forEach(([[x, y], t0], i) => { const b = tramo(t, t0 - 0.3, t0); if (b > 0) T.chincheta(R, x, y, t, ROJO, { baja: b }); pulso(t, x, y - 4, t0, OROL, 5, 18, 0.6); palomita(t, x + 16, y + 14, t0 + 0.15, i); });
  // en «the exact spot is disputed», la X salta de un sitio a otro, y un gran «?»
  if (t > aunque) { const s = (t - aunque) / 0.42, i = Math.floor(s) % XS.length, f = Math.min(1, (s % 1) * 2.2), A = XS[(i + XS.length - 1) % XS.length], B = XS[i], x = Math.round(lerp(A[0], B[0], f)), y = Math.round(lerp(A[1], B[1], f) - Math.sin(f * Math.PI) * 14);
    XS.forEach(([ax, ay], j) => { if (j !== i || f < 1) { for (let d = 0; d < 5; d += 2) { R.pset(ax - 2 + d, ay - 2 + d, hex('#7a1e26')); R.pset(ax + 2 - d, ay - 2 + d, hex('#7a1e26')); } } });
    elipse(x + 1, B[1] + 5, 6, 2, K, .4); R.icono('X', x - 4, y - 5, ROJO, K, 2);
    const e = tramo(t, disputa, disputa + 0.25); if (e > 0) { const qy = Math.round(lerp(76, 62, e) + Math.sin(t * 6) * 1.5); R.disco(229, qy + 12, 17, K); R.disco(229, qy + 12, 16, hex('#fff0c0')); R.disco(229, qy + 12, 13, hex('#fff6d8')); R.icono('?', 222, qy + 1, hex('#a82c28'), hex('#f4dc9a'), 3); } }
};

// ── 4: San Francisco en la niebla (LOCAL) ──
const CIEL4 = RA('#3a3a6a', '#56508a', '#7a6aa0', '#a888b0', '#d4a8b0', '#f0c8a8', '#f6dcb4'), AGUA4 = RA('#14283e', '#1c3a54', '#28506c', '#3a6a84', '#5a8aa0');
const PR = hex('#c8452e'), PRS = hex('#8a2a1e'), PRL = hex('#e86a48');
const fondo4 = fijo(() => {
  for (let y = 0; y <= 100; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(CIEL4, y / 15.5 + (h(x >> 2, y >> 2, 1) - .5) * .25, x, y));
  // las colinas del otro lado y la ciudad con sus luces
  for (let x = 0; x < 320; x++) { const a = 84 - Math.round(Math.sin(x * .021 + 1) * 9 + Math.sin(x * .07) * 3) + (x > 150 ? Math.round((x - 150) * .05) : 0); for (let y = a; y <= 100; y++) R.pset(x, y, tono(RA('#2a2a4e', '#3a3860', '#4a4a74'), 1.4 - (y - a) / 14 + (h(x >> 1, y >> 1, 2) - .5) * .6, x, y)); }
  for (let k = 0; k < 22; k++) { const x = 226 + (h(k, 1, 3) * 92 | 0), hh = 4 + (h(k, 2, 3) * 10 | 0); R.rect(x, 98 - hh, x + 3, 98, hex('#2a2a4e')); R.pset(x + 1, 98 - hh + 2, hex('#f6e8a8')); if (k % 3 === 0) R.pset(x + 2, 98 - hh + 5, hex('#f0c060')); }
  // la bahía
  for (let y = 101; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(AGUA4, 3.2 - (y - 101) / 30 + Math.sin(x * .16 + y * .9) * .45 + (y < 108 ? .8 : 0), x, y));
  for (let y = 102; y < 150; y += 3) for (let x = 140; x < 180; x++) if (h(x, y, 5) > .5) R.pset(x + (y - 102) / 6, y, hex('#f0c8a8'));
  // el puente rojo: las dos torres, los cables y el tablero
  const TX = [92, 226], YT = 34, YD = 96, cab = (x) => { if (x < TX[0]) return lerp(YD - 4, YT + 2, (x + 20) / (TX[0] + 20)) + Math.sin((x + 20) / (TX[0] + 20) * Math.PI) * 10; if (x > TX[1]) return lerp(YT + 2, YD - 4, (x - TX[1]) / (340 - TX[1])) + Math.sin((x - TX[1]) / (340 - TX[1]) * Math.PI) * 10; const u = (x - TX[0]) / (TX[1] - TX[0]); return YT + 2 + (YD - 12 - YT) * 4 * u * (1 - u); };
  for (let x = 0; x < 320; x++) { const y = Math.round(cab(x)); R.pset(x, y, PRS); R.pset(x, y + 1, PR); if (x % 5 === 0) for (let yy = y + 2; yy < YD; yy++) if (yy % 2) R.pset(x, yy, PRS); }
  R.rect(0, YD, 319, YD + 3, K); R.rect(0, YD, 319, YD, PRL); R.rect(0, YD + 1, 319, YD + 2, PR); for (let x = 2; x < 320; x += 6) R.pset(x, YD + 2, PRS);
  for (const tx of TX) { for (const dx of [-6, 4]) { R.rect(tx + dx - 1, YT - 2, tx + dx + 3, 122, K); R.rect(tx + dx, YT - 1, tx + dx + 2, 121, PR); R.rect(tx + dx, YT - 1, tx + dx, 121, PRL); R.rect(tx + dx + 2, YT - 1, tx + dx + 2, 121, PRS); }
    for (const y of [YT + 4, YT + 20, YT + 38, YT + 56]) { R.rect(tx - 6, y, tx + 6, y + 4, K); R.rect(tx - 5, y + 1, tx + 5, y + 3, PR); R.rect(tx - 5, y + 1, tx + 5, y + 1, PRL); }
    R.rect(tx - 10, 118, tx + 10, 126, K); R.rect(tx - 9, 119, tx + 9, 125, hex('#8a8490')); R.rect(tx - 9, 119, tx + 9, 119, hex('#b4aeb8')); for (let y = 127; y < 150; y += 2) R.rect(tx - 6 + (y % 4), y, tx + 6 - (y % 3), y, hex('#8a2a1e')); }
  // la orilla de acá: rocas, un ciprés inclinado y un banco
  for (let x = 0; x < 132; x++) { const a = 150 + Math.round(x * .16 + Math.sin(x * .2) * 3 + h(x >> 2, 0, 7) * 4); for (let y = a; y < 180; y++) R.pset(x, y, y === a ? K : tono(RA('#1e1a2a', '#2e2a3a', '#403a4c', '#544e60'), 2.2 - (y - a) / 10 + (h(x >> 2, y >> 2, 8) - .5) * 1.6, x, y)); if (x % 7 === 3) R.linea(x, a - 1, x + 1, a - 4, hex('#3e5a3a')); }
  R.linea(30, 156, 40, 124, K); R.linea(31, 156, 41, 124, hex('#3a2a22')); R.linea(32, 156, 42, 124, K); for (const [dx, dy, rr] of [[0, 0, 10], [10, -2, 8], [20, 1, 6], [-8, 4, 6], [6, -8, 6]]) R.disco(44 + dx, 120 + dy, rr + 1, K); for (const [dx, dy, rr] of [[0, 0, 10], [10, -2, 8], [20, 1, 6], [-8, 4, 6], [6, -8, 6]]) R.disco(44 + dx, 120 + dy, rr, hex('#1e3a2e')); for (const [dx, dy] of [[-2, -4], [9, -6], [18, -1], [4, 3]]) R.disco(44 + dx, 120 + dy, 3, hex('#2e5440'));
  R.rect(78, 156, 100, 158, K); R.rect(79, 152, 99, 153, hex('#7a5028')); R.rect(79, 156, 99, 157, hex('#7a5028')); R.rect(80, 150, 81, 164, K); R.rect(97, 150, 98, 164, K);
  // el islote del faro
  for (let x = 254; x <= 300; x++) { const a = 140 - Math.round(Math.sin((x - 254) / 46 * Math.PI) * 7 + h(x >> 1, 0, 9) * 2); for (let y = a; y <= 146; y++) R.pset(x, y, y === a ? K : tono(RA('#2e2a3a', '#403a4c', '#544e60'), 1.5 + (h(x >> 1, y >> 1, 4) - .5) * 1.4, x, y)); }
  R.rect(274, 112, 281, 134, K); R.rect(275, 113, 280, 134, BL); R.rect(279, 113, 280, 134, hex('#c8ccd8')); R.rect(275, 120, 280, 123, ROJO); R.rect(273, 108, 282, 112, K); R.rect(274, 109, 281, 111, hex('#f6e8a8')); R.poligono([[273, 108], [277, 103], [282, 108]], K); R.rect(284, 128, 292, 134, K); R.rect(285, 129, 291, 134, hex('#d8d0c0')); R.rect(284, 126, 292, 128, hex('#8a2a1e'));
});
// un banco de niebla: la densidad se trama; pasa de izquierda a derecha
const niebla4 = (t, y0, alto, v, k, dens, x0 = 0, x1 = 319) => { const C4 = [hex('#e8e0e4'), hex('#f6f0ee'), hex('#d4ccd8')];
  for (let x = x0; x <= x1; x++) { const s = x - t * v + k * 97, g = 0.5 + 0.5 * Math.sin(s * 0.021 + Math.sin(s * 0.008 + k) * 2), a = alto * (0.35 + 0.65 * g), cy = y0 + Math.sin(s * 0.013 + k) * 5;
    for (let y = Math.round(cy - a); y <= cy + a; y++) { if (y < 15 && x > 18 && x < 172) continue; if (x > 274 && y < 46) continue; const d = 1 - Math.abs(y - cy) / a; if (Math.min(1, d * 1.9) * dens * (0.55 + 0.45 * g) > (BY[(y & 3) * 4 + ((x - Math.floor(t * v * 0.5)) & 3)] + 0.5) / 16) R.pset(x, y, y < cy - a * 0.3 ? C4[1] : y > cy + a * 0.4 ? C4[2] : C4[0]); } } };
const p4 = (t) => {
  fondo4();
  const tt = t - P4;
  // las luces de los coches en el tablero y el reflejo del agua
  for (let k = 0; k < 9; k++) { const x = ((k * 43 + t * (16 + k % 3 * 5)) % 340) - 10; R.pset(x, 95, k % 2 ? hex('#f6e8a8') : ROJOL); }
  for (let k = 0; k < 24; k++) { const x = (k * 29 + Math.floor(t * 3 + k) * 13) % 320, y = 106 + (k * 17) % 70; if (R.pget(x, y) !== K) { R.pset(x, y, AGUA4[4]); R.pset(x + 1, y, AGUA4[3]); } }
  // el haz del faro, que barre
  { const a = t * 1.4, c = Math.cos(a), lx = 277, ly = 110; for (let rr = 6; rr < 150; rr += 1) { const w = rr * 0.09; for (let d = -w; d <= w; d += 1) { const x = Math.round(lx + c * rr), y = Math.round(ly + d + Math.sin(a) * rr * 0.12); if (x < 0 || x > 319 || y < 16 || (x > 274 && y < 46)) continue; if (BY[(y & 3) * 4 + (x & 3)] < 5 * (1 - rr / 150)) R.pset(x, y, hex('#f6e8a8')); } } R.disco(lx, ly, 2, BL); T.b_luz(R, lx, ly, 9, hex('#f6e8a8'), 0.6); }
  // la niebla del fondo, tras el puente
  niebla4(t, 84, 12, 7, 0, 1.0);
  // un carguero pasa bajo el puente
  { const x = Math.round(118 + tt * 9), y = 132 + Math.round(Math.sin(t * 1.6)); R.rect(x - 22, y - 5, x + 22, y, K); R.poligono([[x - 21, y - 4], [x + 21, y - 4], [x + 17, y - 1], [x - 18, y - 1]], hex('#3a3a4e')); R.rect(x - 20, y - 4, x + 20, y - 4, hex('#a8303a')); for (let i = 0; i < 5; i++) R.rect(x - 14 + i * 6, y - 9 - (i % 2) * 3, x - 10 + i * 6, y - 5, [hex('#c8702a'), hex('#3a6ab0'), hex('#5a9a4a')][i % 3]); R.rect(x + 14, y - 13, x + 19, y - 5, K); R.rect(x + 15, y - 12, x + 18, y - 6, BL); R.pset(x + 16, y - 10, hex('#f6e8a8')); for (let k = 0; k < 6; k++) R.pset(x - 24 - k * 3, y + (k % 2), BL); }
  // gaviotas
  for (let k = 0; k < 3; k++) { const gx = ((t * (18 + k * 5) + k * 110) % 360) - 20, gy = 56 + k * 16 + Math.sin(t * 2 + k) * 4, al = Math.sin(t * 9 + k) > 0 ? 1 : -1; if (gx > 270 && gy < 48) continue; R.pset(gx, gy, K); R.pset(gx - 1, gy - al, K); R.pset(gx + 1, gy - al, K); R.pset(gx - 2, gy - al, BL); R.pset(gx + 2, gy - al, BL); }
  // el gran «?» que asoma en la niebla en «mystery»
  const e = sua(tramo(t, SF + 0.5, misterio + 0.15));
  if (e > 0) { const qx = 147, qy = Math.round(lerp(66, 30, e) + Math.sin(t * 3) * 1.5), esc = 6; for (const [dx, dy] of [[-2, 0], [2, 0], [0, -2], [0, 2], [2, 3]]) R.icono('?', qx + dx, qy + dy, K, K, esc); R.icono('?', qx, qy, ORO, OROS, esc);
    if (t > misterio) { pulso(t, qx + 15, qy + 22, misterio, OROL, 24, 50, 0.9); chispa(qx - 8, qy + 6, t, 0); chispa(qx + 38, qy + 30, t, 1, OROL); } }
  // la niebla de delante, que se come las torres y medio interrogante
  niebla4(t, 74, 13, 13, 1, 0.95 - e * 0.3);
  niebla4(t, 114, 14, 20, 2, 1.0);
  niebla4(t, 166, 11, 28, 3, 0.7, 110, 319);
};
const efectos = [[nueve - 0.02, 'toc'], [nueve + 0.25, 'pop'], [nueve + 0.85, 'pop'], [nueve + 1.5, 'pop'], [NY, 'toc'], [HOU, 'toc'], [MIL, 'toc'], [AGU, 'toc'], [ORL, 'toc'], [MON, 'toc'],
  [ROA, 'toc'], [P3 + 0.9, 'ola'], [CHA, 'toc'], [aunque + 0.3, 'boing'], [disputa, 'pop'], [P4 + 0.2, 'viento'], [misterio, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
''')
