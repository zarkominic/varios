E = {}

# ── piezas comunes de este grupo (cada escena lleva su copia) ─────────────────────────────────────────────────────────
HLP = r'''
const K = hex('#1a1014'), BL = hex('#ffffff');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const cl = (v, a, b) => Math.max(a, Math.min(b, v));
const ent = (u) => u * u * (3 - 2 * u);
const capas = {};
const capa = (k, dib) => { if (!capas[k]) { const b = R.nuevo(); const prev = R.usar(b); dib(); R.usar(prev); capas[k] = b; } R.copiar(capas[k]); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const pal = (...cs) => cs.map((c) => hex(c));
const MB = [[0, 0.5], [0.75, 0.25]];
const tram = (P, v, x, y) => { const i = Math.floor(v), f = v - i; return P[cl(i + (f > MB[y & 1][x & 1] ? 1 : 0), 0, P.length - 1)]; };
const velo = (x, y, c, a) => R.pset(x, y, mez(R.pget(x, y), c, a));
// sprite de filas a escala s, con contorno negro
const spr = (filas, x, y, s, P, borde = true) => {
  if (borde) filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (P[f[i]] != null) R.rect(x + i * s - 1, y + j * s - 1, x + i * s + s, y + j * s + s, K); });
  filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = P[f[i]]; if (c != null) R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); } });
};
const caja = (x0, y0, x1, y1, c, cl0, cs) => { R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K); R.rect(x0, y0, x1, y1, c); if (cl0 != null) R.rect(x0, y0, x1, y0, cl0); if (cs != null) R.rect(x0, y1, x1, y1, cs); };
// el casco de Kang (azul con aletas moradas, cara visible) y el casco de la hormiga (rojo y plata, ojos grandes)
const CASCO = ['....aaaaa....', '..aaBBBBBaa..', '.aBBBBBBBBBa.', 'fBBBSSSSSBBBf', 'FfBBSeSeSBBfF', 'FfBBSSSSSBBfF', 'FfBBsSmSsBBfF', '.fBBBsssBBBf.', '..bBBBBBBBb..', '...bbbbbbb...', '....ggggg....'];
const PCASCO = { a: hex('#8ab8ff'), B: hex('#2a5ad8'), b: hex('#1a3a9a'), f: hex('#7a4ad0'), F: hex('#4a2a8a'), S: hex('#d89a6a'), s: hex('#a86a4a'), e: K, m: hex('#7a3a2a'), g: hex('#3aa860') };
const HORMIGA = ['...rrrrr...', '..rRRwRRr..', '.rRRRRRRRr.', 'rRLLLRLLLRr', 'rRLlLRLlLRr', 'rRLLLRLLLRr', '.rRRRmRRRr.', '.rrSSSSSrr.', '..rSSSSSr..', '...rrrrr...'];
const PHORM = { r: hex('#8a1a1a'), R: hex('#d83030'), w: hex('#ff9a8a'), L: hex('#2a1a24'), l: hex('#ff6a5a'), S: hex('#c8c8d4'), m: hex('#8a8a96') };
// un trono pequeño, morado y dorado
const TRONO = ['.o.....o.', '.oPPPPPo.', '.oPpppPo.', '.oPpppPo.', '.oPpppPo.', 'oooooooo.', 'oPPPPPPPo', 'o.o...o.o'];
const PTRONO = { o: hex('#e8b830'), P: hex('#6a3aa8'), p: hex('#4a2a7a') };
'''

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['do-kang'] = ('Kang', '''// DO-KANG (frases 29–31), 2022–2023. Siete planos:
// 1. (fondo local, la sala de guion) el corcho del plan con la tarjeta grande del casco de Kang en el centro; la
//    guionista tacha con rotulador la tarjeta de la máscara («wasn't supposed to be Doom») y señala a Kang;
// 2. el auditorio en 2022, con luz azul: el productor de la gorra sale al centro; la pantalla se enciende con el villano
//    del casco y su trono («a movie called…») y el público se levanta en «The Kang Dynasty»;
// 3. el reino cuántico de cerca: Kang sale de la puerta de luz; en «He Who Remains» asoma en la puerta el fantasma del
//    que permanece (la misma cara) y Kang se vuelve;
// 4. el reino cuántico general: Kang carga energía («dangerous»); llega la hormiga corriendo, salta el disparo y en
//    «and the Wasp» aparece la avispa que zumba alrededor;
// 5. la taquilla en 2023: en «Quantumania» se desenrolla el cartel (casco de Kang, casco de hormiga, 2023); la cola,
//    con las palomitas, avanza hacia las puertas;
// 6. (sala de guion, otra cámara) de noche y con lluvia: la silla vacía gira despacio y se para; el calendario de la
//    mesa pasa del 11 al 12 en «December 2023» (sin personas);
// 7. (la mesa desde arriba) una mano con una goma borra el guion grueso («let the actor go»), quita la hoja y en
//    «from scratch» dibuja un «?» en la hoja en blanco.''', HLP + r'''
const a = (f) => en('dinastia', f), b = (f) => en('quantumania', f), c = (f) => en('despido', f);
const P2 = a(0.392), P3 = a(1), P4 = b(0.275), P5 = b(0.693), P6 = b(1) + 0.3, P7 = c(0.499);
// ── la sala de guion (fondo local): paletas
const SP = { pared: pal('#7a6e60', '#948672', '#ac9e88', '#c2b49c', '#d4c8b0'), techo: pal('#a8a49a', '#c4c0b4', '#dcd8cc', '#ecE8de'), moq: pal('#2e3448', '#3a4258', '#465068', '#525e78', '#5e6a86'),
  corcho: pal('#6a4628', '#82583a', '#9a6c46', '#b48256', '#c8986a'), mad: pal('#3a2414', '#563620', '#74482a', '#925c36', '#ac7444', '#c48e58'), papel: pal('#b8b0a0', '#d8d2c4', '#f0ece2', '#fbf8f0') };
const tarjeta = (x0, y0, x1, y1, pin, tinte = 2) => { R.rect(x0 + 1, y0 + 1, x1 + 1, y1 + 1, SP.corcho[0]); R.rect(x0, y0, x1, y1, SP.papel[tinte]); R.rect(x0, y1, x1, y1, SP.papel[1]); R.rect(x0, y0, x0, y1, SP.papel[3]);
  R.disco(Math.round((x0 + x1) / 2), y0 + 1, 2, K); R.disco(Math.round((x0 + x1) / 2), y0 + 1, 1, pin); R.pset(Math.round((x0 + x1) / 2) - 1, y0, BL); };
const picto = (tipo, x, y) => {   // pictogramas de las tarjetas pequeñas
  if (tipo === 'escudo') { R.disco(x, y, 4, K); R.disco(x, y, 3, hex('#d83030')); R.disco(x, y, 2, hex('#f4f4f0')); R.disco(x, y, 1, hex('#2a5ad8')); }
  else if (tipo === 'martillo') { R.rect(x - 4, y - 3, x + 4, y, K); R.rect(x - 3, y - 2, x + 3, y - 1, hex('#9aa0b0')); R.rect(x - 1, y + 1, x, y + 4, hex('#7a4a2a')); }
  else if (tipo === 'arana') { R.disco(x, y, 3, hex('#d83030')); for (const d of [-1, 1]) for (const k of [-2, 0, 2]) R.linea(x + d * 2, y + k * 0.5, x + d * 5, y + k, K); R.pset(x, y, K); }
  else if (tipo === 'cuernos') { for (const d of [-1, 1]) { R.linea(x + d, y + 2, x + d * 3, y - 1, hex('#e8b830')); R.linea(x + d * 3, y - 1, x + d * 4, y - 4, hex('#e8b830')); } R.rect(x - 1, y, x + 1, y + 3, hex('#2e8a3e')); }
  else if (tipo === 'planeta') { R.disco(x, y, 3, hex('#3a8ae8')); R.pset(x - 1, y - 1, hex('#5ac86a')); R.linea(x - 5, y + 1, x + 5, y - 1, hex('#e8b830')); }
  else if (tipo === 'hormiga') spr(HORMIGA.filter((_, j) => j % 2 === 0).map((f) => f.split('').filter((_, i) => i % 2 === 0).join('')), x - 3, y - 2, 1, PHORM, false);
};
const PEQ = [[104, 30, 'escudo'], [104, 50, 'martillo'], [104, 70, 'arana'], [122, 40, 'planeta'], [204, 30, 'cuernos'], [222, 46, 'hormiga'], [204, 58, 'planeta']];
function salaG() {
  for (let y = 0; y < 11; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tram(SP.techo, 1.2 + y * 0.08 + (hh(x >> 2, y, 1) - 0.5) * 0.4, x, y));
  for (let x = 6; x < 320; x += 34) R.rect(x, 0, x, 10, SP.techo[0]); R.rect(0, 5, 319, 5, SP.techo[1]); R.rect(0, 11, 319, 11, SP.pared[0]);
  R.rect(112, 2, 212, 7, K); R.rect(113, 3, 211, 6, hex('#f6f4ea')); R.rect(113, 6, 211, 6, hex('#c8c4b8'));
  for (let y = 12; y < 100; y++) for (let x = 0; x < 320; x++) { const v = 2.9 - x / 320 * 1.1 + (hh(x >> 1, y >> 1, 2) - 0.5) * 0.45 - (y < 20 ? (20 - y) * 0.07 : 0) + (x > 274 && y < 48 ? -0.2 : 0); R.pset(x, y, tram(SP.pared, v, x, y)); }
  for (let x = 0; x < 320; x += 47) for (let y = 12; y < 100; y++) if (hh(x, y >> 3, 9) > 0.2) R.pset(x, y, SP.pared[1]);
  // el zócalo de listones
  for (let y = 100; y < 112; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tram(SP.mad, 2.4 + (hh(x, y >> 2, 3) - 0.5) * 0.9 - (x % 12 === 0 ? 1.3 : 0) + (y === 100 ? 1.2 : 0), x, y));
  R.rect(0, 99, 319, 99, K);
  // la moqueta de losetas, en perspectiva
  for (let y = 112; y < 180; y++) { const p = (y - 112) / 68; for (let x = 0; x < 320; x++) { const X = (x - 160) / (0.55 + p * 0.9) + 160, Y = Math.floor(Math.log(1 + (y - 112) / 6) * 3.2);
    const lo = (Math.floor(X / 36) + Y) % 2, junta = Math.abs(((X % 36) + 36) % 36) < 0.9; R.pset(x, y, junta ? SP.moq[0] : tram(SP.moq, 1.5 + lo * 0.55 + p * 0.9 + (hh(x, y, 4) - 0.5) * 0.7, x, y)); } }
  R.rect(0, 112, 319, 113, SP.mad[1]); R.rect(0, 112, 319, 112, SP.mad[3]);
  // la ventana con persiana (el cielo se pinta en cada fotograma)
  R.rect(10, 18, 76, 88, K); R.rect(11, 19, 75, 87, SP.mad[4]); R.rect(13, 21, 73, 84, K); R.rect(10, 86, 78, 90, SP.mad[4]); R.rect(10, 90, 78, 90, SP.mad[1]);
  // el corcho con su marco
  R.rect(92, 20, 240, 98, K); R.rect(93, 21, 239, 97, SP.mad[4]); R.rect(93, 97, 239, 97, SP.mad[1]);
  for (let y = 24; y < 95; y++) for (let x = 96; x < 237; x++) R.pset(x, y, tram(SP.corcho, 2.3 + (hh(x, y, 5) - 0.5) * 1.8 + (x - 96) / 140 * -0.4, x, y));
  // las tarjetas pequeñas, los hilos rojos y la tarjeta grande de Kang (2025)
  for (const [x, y] of PEQ) R.linea(x + 8, y + 6, 166, 52, hex('#c82a2a'));
  for (const [x, y, tp] of PEQ) { tarjeta(x, y, x + 16, y + 12, [hex('#3a8ae8'), hex('#e8c040'), hex('#2e9a4a')][(x + y) % 3]); picto(tp, x + 8, y + 7); }
  tarjeta(142, 26, 190, 90, hex('#d83030'), 3); R.rect(144, 28, 188, 29, hex('#c82a2a')); R.rect(144, 87, 188, 88, hex('#c82a2a'));
  spr(TRONO, 157, 46, 2, PTRONO); spr(CASCO, 147, 30, 3, PCASCO);
  R.numero('2025', 166, 85, { centro: true, color: hex('#2a3a7a') });
  // la tarjeta de la máscara, abajo a la derecha (la que se tacha)
  tarjeta(204, 74, 228, 96, hex('#2e9a4a')); T.e_mascara(R, 216, 86, 2, { brillo: 0.3, ojos: 0.6 });
  // notas de colores sueltas
  for (const [x, y, cc] of [[124, 74, '#f4e070'], [124, 60, '#f0a0c0'], [214, 24, '#a0e0f0']]) { R.rect(x, y, x + 10, y + 9, hex(cc)); R.rect(x, y + 9, x + 10, y + 9, mez(hex(cc), K, 0.3)); for (let k = 0; k < 3; k++) R.rect(x + 2, y + 2 + k * 2, x + 7 - k, y + 2 + k * 2, mez(hex(cc), K, 0.45)); }
  // el ficus junto a la ventana
  R.rect(80, 104, 92, 118, K); R.rect(81, 105, 91, 117, hex('#b8582e')); R.rect(81, 105, 91, 106, hex('#d8784a'));
  for (let k = 0; k < 22; k++) { const x = 86 + Math.round((hh(k, 1, 6) - 0.5) * 18), y = 56 + Math.round(hh(k, 2, 6) * 46); R.disco(x, y, 3, hex('#1e5a2a')); R.disco(x - 1, y - 1, 2, hex('#3a8a3e')); R.pset(x - 1, y - 2, hex('#6ab85a')); }
  R.linea(86, 104, 86, 60, hex('#5a3a20'));
  // el armario de carpetas a la derecha (por debajo de la esquina de Atom)
  R.rect(246, 64, 318, 112, K); R.rect(247, 65, 317, 111, SP.mad[3]); R.rect(247, 65, 317, 66, SP.mad[5]); R.rect(247, 87, 317, 88, SP.mad[1]);
  const lomos = ['#c83a3a', '#3a6ac8', '#e8b830', '#3a9a5a', '#7a4ab8', '#e87a3a', '#4a4a5a'];
  for (const yy of [68, 90]) for (let x = 250; x < 314; x += 6) { const cc = hex(lomos[(x + yy) % 7]), al = 16 + (x % 3); R.rect(x, yy + 18 - al, x + 4, yy + 18, K); R.rect(x + 1, yy + 19 - al, x + 3, yy + 18, cc); R.rect(x + 1, yy + 22 - al, x + 3, yy + 22 - al, hex('#f4f0e4')); }
  // la planta encima del armario y el reloj de pared
  R.rect(252, 54, 266, 64, K); R.rect(253, 55, 265, 63, hex('#e8e4da')); for (let k = 0; k < 9; k++) { const an = -2.6 + k * 0.33; R.linea(259, 55, 259 + Math.round(Math.cos(an) * 10), 55 + Math.round(Math.sin(an) * 12), k % 2 ? hex('#3a8a3e') : hex('#5ab85a')); }
  R.disco(262, 26, 8, K); R.disco(262, 26, 7, hex('#f4f2ea')); R.anillo(262, 26, 7, hex('#4a4a5a'));
  for (let k = 0; k < 12; k++) R.pset(262 + Math.round(Math.cos(k * 0.5236) * 5), 26 + Math.round(Math.sin(k * 0.5236) * 5), hex('#4a4a5a'));
}
// la mesa larga de delante (salaDelante, DESPUÉS de los actores)
function salaDelante(t) {
  R.rect(28, 136, 252, 150, K); for (let y = 137; y < 146; y++) for (let x = 29; x < 252; x++) R.pset(x, y, tram(SP.mad, 3.2 + (hh(x >> 2, y, 7) - 0.5) * 0.8 + Math.sin(x * 0.07 + y) * 0.3, x, y));
  R.rect(29, 137, 251, 137, SP.mad[5]); R.rect(29, 146, 251, 149, SP.mad[1]); R.rect(29, 146, 251, 146, SP.mad[2]);
  for (const x of [34, 244]) { R.rect(x - 2, 150, x + 2, 179, K); R.rect(x - 1, 150, x + 1, 179, SP.mad[2]); }
  // guiones, tazas, el portátil y el bote de lápices
  for (const [x, w, n] of [[96, 26, 4], [196, 22, 6]]) for (let k = 0; k < n; k++) { R.rect(x + k, 140 - k, x + w + k, 141 - k, k % 2 ? SP.papel[2] : SP.papel[3]); R.rect(x + k, 142 - k, x + w + k, 142 - k, SP.papel[0]); }
  R.rect(140, 128, 168, 143, K); R.rect(141, 129, 167, 142, hex('#5a5e6a')); R.rect(142, 130, 166, 131, hex('#8a8e9a')); R.disco(154, 136, 2, hex('#c8ccd8'));
  for (const [x, cc] of [[128, '#e8e4da'], [182, '#3a6ac8']]) { R.rect(x, 135, x + 7, 143, K); R.rect(x + 1, 136, x + 6, 142, hex(cc)); R.rect(x + 7, 137, x + 9, 140, K); R.rect(x + 1, 136, x + 6, 136, hex('#5a3a20'));
    for (let k = 0; k < 3; k++) { const yy = 132 - ((t * 6 + k * 3 + x) % 9), xx = x + 3 + Math.round(Math.sin(t * 3 + k + x) * 1.5); R.pset(xx, Math.round(yy), mez(hex('#ffffff'), SP.pared[3], 0.4)); } }
  R.rect(226, 132, 232, 143, K); R.rect(227, 133, 231, 142, hex('#c83a3a')); for (const [dx, cc] of [[0, '#e8b830'], [2, '#3a6ac8'], [4, '#2a2a34']]) R.rect(227 + dx, 128 + dx % 3, 227 + dx, 133, hex(cc));
}
const p1 = (t) => {
  capa('sala-g', salaG);
  // el cielo de la tarde en la ventana: nubes que pasan y la palmera lejana que se mece
  R.recorte([14, 22, 72, 83]);
  for (let y = 22; y < 84; y++) R.linea(14, y, 72, y, tram(pal('#e8a870', '#f0c890', '#a8c8e8', '#78a8e0'), 3 - (y - 22) / 62 * 3, 0, y));
  for (let k = 0; k < 4; k++) { const x = ((k * 37 + t * (3 + k)) % 110) - 20, y = 30 + k * 9; for (const [dx, r, cc] of [[0, 4, '#f4f0ea'], [5, 3, '#dcd4cc'], [-5, 3, '#c8bcb8']]) R.disco(x + dx + 14, y, r, hex(cc)); }
  R.poligono([[14, 84], [14, 70], [30, 64], [50, 68], [72, 62], [72, 84]], hex('#8a7a6a'));
  const sw = Math.round(Math.sin(t * 1.4) * 2); R.linea(56, 84, 58 + sw, 52, hex('#3a2a20')); for (let k = 0; k < 6; k++) R.linea(58 + sw, 52, 58 + sw + Math.round(Math.cos(k * 1.05) * 9), 52 + Math.round(Math.sin(k * 1.05) * 4) + 2, hex('#2a4a2a'));
  R.recorte(null);
  for (let y = 21; y < 50; y += 3) { R.rect(13, y, 73, y + 1, hex('#e8e2d4')); R.rect(13, y + 1, 73, y + 1, hex('#b8b0a0')); }
  R.rect(42, 21, 42, 52, hex('#8a8272')); R.disco(42, 54, 1, hex('#8a8272'));
  // el reloj y el ventilador del armario
  const ma = t * 0.6 - 1.57; R.linea(262, 26, 262 + Math.round(Math.cos(ma) * 5), 26 + Math.round(Math.sin(ma) * 5), hex('#c83a3a')); R.linea(262, 26, 265, 23, K);
  const g = Math.sin(t * 0.8) * 3; R.rect(296, 58, 300, 64, K); R.disco(298 + Math.round(g * 0.3), 54, 7, K); R.disco(298 + Math.round(g * 0.3), 54, 6, hex('#c8ccd4'));
  for (let k = 0; k < 3; k++) { const an = t * 18 + k * 2.09; R.linea(298, 54, 298 + Math.round(Math.cos(an) * 5 * (0.6 + Math.abs(Math.cos(g * 0.2)) * 0.4)), 54 + Math.round(Math.sin(an) * 5), hex('#6a7080')); }
  // la guionista: habla con el de la mesa, va al corcho, tacha la máscara («Doom») y señala la tarjeta de Kang
  const ir = tramo(t, 2.5, 3.2), x = Math.round(lerp(150, 194, ir)), tacha = tramo(t, a(0.24), a(0.31));
  if (t < a(0.21) || t > a(0.34)) R.actor(EL.escritora, x, 116, t, { dir: ir > 0 && t < a(0.34) ? 1 : -1, anda: ir > 0 && ir < 1, habla: t < 2.3 && Math.sin(t * 7) > 0, dedo: t > a(0.34) + 0.15, sonrisa: t > a(0.34) });
  else { const m = R.actor(EL.escritora, x, 116, t, { dir: 1, sostiene: [214, 88] }).mano; R.rect(m[0] - 1, m[1] - 5, m[0] + 1, m[1] + 1, K); R.rect(m[0], m[1] - 4, m[0], m[1], hex('#c82a2a')); }
  if (tacha > 0) { const n1 = Math.round(tramo(tacha, 0, 0.5) * 18), n2 = Math.round(tramo(tacha, 0.5, 1) * 18);
    for (let i = 0; i <= n1; i++) R.rect(206 + i, 76 + i, 207 + i, 77 + i, hex('#d82020')); for (let i = 0; i <= n2; i++) R.rect(224 - i, 76 + i, 225 - i, 77 + i, hex('#d82020')); }
  // el dibujante, sentado detrás de la mesa, comenta y asiente
  R.actor(EL.dibujante, 62, 148, t, { dir: 1, habla: t > 1.2 && t < 2.6 && Math.sin(t * 6) > 0, sonrisa: t > a(0.3), sostiene: t > a(0.33) ? [80, 128] : false });
  salaDelante(t);
  // las sillas vacías de este lado de la mesa (de espaldas), la papelera y el cable del suelo
  for (const [cx, k] of [[118, 0], [176, 1], [222, 2]]) { const g = Math.round(Math.sin(t * 0.7 + k) * 1);
    R.rect(cx - 13 + g, 150, cx + 13 + g, 172, K); R.rect(cx - 12 + g, 151, cx + 12 + g, 171, hex('#2a2e3e')); R.rect(cx - 10 + g, 153, cx + 10 + g, 169, hex('#3a4054')); R.rect(cx - 10 + g, 153, cx - 9 + g, 169, hex('#5a6278'));
    for (let y = 157; y < 168; y += 5) R.rect(cx - 8 + g, y, cx + 8 + g, y, hex('#323748')); R.rect(cx - 2, 172, cx + 2, 179, K); R.rect(cx - 1, 172, cx + 1, 179, hex('#6a6e7a')); }
  R.rect(266, 150, 286, 174, K); R.rect(267, 151, 285, 173, hex('#4a5a6a')); R.rect(267, 151, 285, 152, hex('#7a8a9a')); for (let x = 269; x < 285; x += 4) R.rect(x, 154, x, 172, hex('#3a4a58'));
  for (const [x, y] of [[271, 148], [279, 147], [275, 145]]) { R.disco(x, y, 3, K); R.disco(x, y, 2, hex('#f0ece2')); R.pset(x - 1, y - 1, hex('#c8c0b0')); }
  for (let x = 250; x < 320; x++) R.pset(x, 176 + Math.round(Math.sin(x * 0.15) * 1.5), K);
};
// ── 2: el auditorio de 2022 con luz azul y el villano del casco en la pantalla
const p2 = (t) => {
  const cambio = a(0.718), ov = 0.12 + 0.7 * tramo(t, a(0.88), a(0.95)) - 0.35 * tramo(t, a(0.98), P3);
  const o = { encuadre: 'auditorio', pantalla: t < cambio + 0.15 ? undefined : 'casco', glitch: Math.max(0, 1 - Math.abs(t - cambio) / 0.3), ovacion: Math.max(0, ov) };
  T.escenario(R, t, o);
  T.tinte(R, 14, 104, [30, 70, 190], 0.2);
  const u = tramo(t, P2 + 0.2, P2 + 1.6), x = Math.round(lerp(212, 152, u));
  R.actor(EL.feige, x, 106, t, { dir: -1, anda: u > 0 && u < 1, habla: u >= 1 && t < cambio - 0.2 && Math.sin(t * 7) > 0, dedo: t > cambio - 0.1, sonrisa: t > a(0.88) });
  // dos fans de pie en el público que saltan cuando sale el nombre
  const salta = t > a(0.88) && t < a(0.98);
  R.actor(EL.fanCuernos, 64, 178, t, { dir: 1, brazos: salta, salto: salta ? Math.round(Math.abs(Math.sin(t * 9)) * 4) : 0 });
  R.actor(EL.fanCapa, 238, 178, t, { dir: -1, brazos: salta, salto: salta ? Math.round(Math.abs(Math.sin(t * 9 + 1)) * 4) : 0 });
  T.escenarioDelante(R, t, o);
};
// ── 3: el reino cuántico de cerca: Kang sale de la puerta; el fantasma del que permanece
const p3 = (t) => {
  T.cosmos(R, t, { encuadre: 'cuantico', camara: 'ciudad' });
  const sale = tramo(t, P3 + 0.3, P3 + 1.6), fan = tramo(t, b(0.17), b(0.21));
  if (fan > 0) { R.actor(EL.permanece, 153, 147, t, { dir: 1, sonrisa: true });
    for (let y = 112; y < 148; y++) for (let x = 146; x < 174; x++) if ((x + y + Math.floor(t * 8)) % 2 === 0 || fan < 1 && hh(x, y, 3) > fan) velo(x, y, hex('#c8a0ff'), 0.55);
    if (Math.floor(t * 6) % 3 === 0) for (let y = 112; y < 148; y += 3) R.linea(147, y, 173, y, mez(hex('#e8d8ff'), hex('#8a6ae8'), 0.5)); }
  const y = Math.round(lerp(150, 166, sale)), mira = t > b(0.21) + 0.2;
  R.actor(EL.kang, Math.round(lerp(153, 150, sale)), y, t, { dir: mira ? -1 : 1, anda: sale > 0 && sale < 1, enfado: t > b(0.24), sonrisa: mira && t < b(0.24) });
  // burbujas que suben delante
  for (let k = 0; k < 7; k++) { const bx = 40 + k * 38 + Math.round(Math.sin(t * 1.3 + k) * 4), by = 176 - ((t * (14 + k * 3) + k * 23) % 90); R.anillo(bx, Math.round(by), 2 + k % 2, hex('#f0d8ff')); R.pset(bx - 1, Math.round(by) - 1, BL); }
};
// ── 4: el reino cuántico general: energía, la hormiga que esquiva, la avispa
const p4 = (t) => {
  T.cosmos(R, t, { encuadre: 'cuantico' });
  const carga = t > b(0.303) && t < b(0.59), dispara = tramo(t, b(0.535), b(0.585));
  R.actor(EL.kang, 200, 164, t, { dir: -1, brazos: carga, enfado: true, dedo: !carga && t > b(0.585) });
  if (carga) for (const dx of [-3, 17]) { const r = 3 + Math.round(Math.abs(Math.sin(t * 10 + dx))); R.disco(200 + dx, 134, r + 1, hex('#3a6ae8')); R.disco(200 + dx, 134, r, hex('#8ac8ff')); R.pset(200 + dx, 133, BL); }
  const llega = tramo(t, P4 + 0.6, b(0.43)), ax = Math.round(lerp(-20, 104, llega)), sal = tramo(t, b(0.56), b(0.62));
  R.actor(EL.antman, ax, 168, t, { dir: 1, anda: llega > 0 && llega < 1, salto: Math.round(Math.sin(sal * Math.PI) * 12), sorpresa: t > b(0.53) && t < b(0.64) });
  if (dispara > 0 && dispara < 1) { const rx = Math.round(lerp(196, 100, dispara)); R.anillo(rx, 152, 6, hex('#8ac8ff')); R.anillo(rx, 152, 4, hex('#3a6ae8')); for (let k = 1; k < 5; k++) R.pset(rx + k * 5, 152 + (k % 2), hex('#c8e0ff')); }
  // la avispa: alas que zumban y una vuelta alrededor de la hormiga
  const av = tramo(t, b(0.6), b(0.66));
  if (av > 0) { const an = t * 5, vx = Math.round(lerp(330, 112 + Math.cos(an) * 16, av)), vy = Math.round(lerp(40, 140 + Math.sin(an) * 7, av));
    R.rect(vx - 2, vy - 1, vx + 2, vy + 1, K); R.rect(vx - 1, vy, vx + 1, vy, hex('#e8c030')); R.pset(vx, vy - 2, hex('#d83030'));
    const al = Math.floor(t * 30) % 2; R.rect(vx - 4, vy - 3 - al, vx - 2, vy - 2, hex('#d8f0ff')); R.rect(vx + 2, vy - 3 - al, vx + 4, vy - 2, hex('#d8f0ff')); }
};
// ── 5: la taquilla en 2023: el cartel nuevo y la cola que avanza
const p5 = (t) => {
  T.mundo(R, t, { encuadre: 'nyhoy', camara: 'taquilla', corona: 0 });
  const un = tramo(t, P5 + 0.2, P5 + 0.9), h = Math.round(un * 58);
  if (h > 0) { const x0 = 268, y0 = 73, x1 = 312;
    for (let y = y0; y < y0 + h; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tram(pal('#2a1048', '#4a1a6a', '#7a2a8a', '#c84aa0'), 3 - (y - y0) / 58 * 2.6 + (hh(x, y, 8) - 0.5) * 0.6, x, y));
    if (h > 40) { spr(CASCO, 278, 76, 2, PCASCO); spr(HORMIGA, 274, 104, 1, PHORM); R.numero('2023', 290, 128, { centro: true, color: t > b(0.767) && Math.floor(t * 6) % 2 ? hex('#fff4a0') : hex('#e8c040') });
      for (let k = 0; k < 5; k++) R.anillo(270 + k * 9, 110 + (k * 7) % 12, 1 + k % 2, hex('#f0a0ff')); }
    R.rect(x0 - 1, y0 + h, x1 + 1, y0 + h + 2, K); R.rect(x0, y0 + h, x1, y0 + h + 1, hex('#e8e0d0')); }
  // la cola avanza un paso en «with Jonathan Majors»
  const p = tramo(t, b(0.88), b(0.95)), mov = p > 0 && p < 1, dx = -Math.round(p * 18);
  const cola = [[EL.fanArana, 132], [EL.fanCapa, 156], [EL.estudiante, 204], [EL.fanCuernos, 228], [EL.turista, 252]];
  cola.forEach(([d, x], k) => R.actor(d, x + dx, 160, t, { dir: -1, anda: mov, sonrisa: t > P5 + 0.9, habla: k === 3 && t < P5 && Math.sin(t * 6) > 0 }));
  T.palomitas(R, 186 + dx, 160, t, { dir: -1, expresion: t > P5 + 0.9 ? 'emocion' : 'normal', salta: tramo(t, P5 + 0.9, P5 + 1.6) * (t < P5 + 2.2 ? 1 : 0), anda: mov });
};
// ── 6: la sala de guion de noche, otra cámara: la silla vacía y el calendario de la mesa
function salaSilla() {
  const P = pal('#3a3440', '#4a4250', '#5a5060', '#6a5e6e', '#7a6c7a');
  for (let y = 0; y < 104; y++) for (let x = 0; x < 320; x++) { const l = Math.max(0, 1 - Math.hypot((x - 290) / 140, (y - 90) / 90)); R.pset(x, y, tram(P, 1.2 + l * 2.6 + (hh(x >> 1, y >> 1, 2) - 0.5) * 0.4, x, y)); }
  for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) { const l = Math.max(0, 1 - Math.hypot((x - 240) / 160, (y - 140) / 60)); R.pset(x, y, tram(SP.moq, 0.6 + l * 2.4 + (hh(x, y, 4) - 0.5) * 0.7, x, y)); }
  R.rect(0, 103, 319, 104, SP.mad[0]);
  // la ventana grande con la lluvia (se pinta encima en cada fotograma)
  R.rect(14, 14, 100, 90, K); R.rect(15, 15, 99, 89, SP.mad[2]); R.rect(18, 18, 96, 86, K);
  // el corcho de cerca: falta la tarjeta grande (queda su huella y las chinchetas)
  R.rect(118, 12, 266, 86, K); R.rect(119, 13, 265, 85, SP.mad[2]);
  for (let y = 16; y < 83; y++) for (let x = 122; x < 263; x++) R.pset(x, y, tram(SP.corcho, 1.5 + (hh(x, y, 5) - 0.5) * 1.6, x, y));
  for (let y = 22; y < 78; y++) for (let x = 166; x < 214; x++) R.pset(x, y, tram(SP.corcho, 2.7 + (hh(x, y, 5) - 0.5) * 1.2, x, y));
  for (const [x, y] of [[168, 24], [211, 24], [168, 75], [211, 75]]) { R.disco(x, y, 2, K); R.disco(x, y, 1, hex('#d83030')); }
  for (const [x, y, tp] of [[128, 20, 'escudo'], [128, 44, 'martillo'], [222, 22, 'planeta'], [236, 48, 'cuernos'], [130, 64, 'arana']]) {
    R.rect(x + 1, y + 1, x + 25, y + 19, SP.corcho[0]); R.rect(x, y, x + 24, y + 18, SP.papel[1]); R.rect(x, y, x + 24, y, SP.papel[2]); picto(tp, x + 12, y + 10); R.disco(x + 12, y + 1, 1, hex('#e8c040')); }
  // la mesa a la derecha: tablero, canto y cajonera
  R.rect(150, 112, 319, 124, K); for (let y = 113; y < 124; y++) for (let x = 151; x < 320; x++) R.pset(x, y, tram(SP.mad, 2.6 + (hh(x >> 2, y, 7) - 0.5) * 0.8 + Math.sin(x * 0.05 + y * 0.6) * 0.4, x, y));
  R.rect(151, 113, 319, 113, SP.mad[5]); R.rect(150, 124, 319, 130, K); R.rect(151, 125, 319, 129, SP.mad[1]);
  R.rect(250, 130, 319, 179, K); R.rect(251, 131, 319, 179, SP.mad[2]); for (const y of [146, 162]) { R.rect(251, y, 319, y, K); R.rect(278, y - 9, 292, y - 7, hex('#c8a060')); }
  R.rect(156, 130, 160, 179, K); R.rect(157, 130, 159, 179, SP.mad[1]);
  // cosas de la mesa: guiones, la taza, el bote, el cactus
  for (let k = 0; k < 7; k++) { R.rect(170 + k, 110 - k * 2, 204 + k, 111 - k * 2, k % 2 ? SP.papel[2] : SP.papel[3]); R.rect(170 + k, 112 - k * 2, 204 + k, 112 - k * 2, SP.papel[0]); }
  R.rect(212, 102, 222, 114, K); R.rect(213, 103, 221, 113, hex('#c83a3a')); R.rect(222, 105, 224, 110, K); R.rect(213, 103, 221, 103, hex('#3a2014'));
  R.rect(300, 100, 310, 114, K); R.rect(301, 101, 309, 113, hex('#6a7a8a')); for (const [dx, cc] of [[0, '#e8b830'], [3, '#3a6ac8'], [6, '#d83030']]) R.rect(302 + dx, 94 + dx % 4, 303 + dx, 101, hex(cc));
  R.rect(232, 106, 242, 114, K); R.rect(233, 107, 241, 113, hex('#c8784a')); R.rect(235, 96, 239, 107, K); R.rect(236, 97, 238, 106, hex('#3a8a4a')); R.pset(237, 95, hex('#f070a0'));
}
const p6 = (t) => {
  capa('sala-s', salaSilla);
  // la lluvia en la ventana, sobre la ciudad de noche
  R.recorte([19, 19, 95, 85]);
  for (let y = 19; y < 86; y++) R.linea(19, y, 95, y, tram(pal('#141a34', '#1e2648', '#2a3460', '#3a3a6a'), (y - 19) / 66 * 3, 0, y));
  for (let k = 0; k < 14; k++) { const x = 20 + k * 6, h = 18 + (k * 7) % 24; R.rect(x, 86 - h, x + 4, 85, hex('#0e1226')); for (let j = 0; j < h - 4; j += 4) if (hh(k, j, 3) > 0.55) R.pset(x + 1 + (j % 3), 86 - h + 2 + j, hex('#e8c860')); }
  for (let k = 0; k < 26; k++) { const x = 19 + ((k * 29) % 77), y = 19 + ((k * 17 + t * 70) % 70); R.linea(x, Math.round(y), x - 1, Math.round(y) + 3, hex('#8a9ac8')); }
  R.recorte(null);
  for (let y = 18; y < 44; y += 3) { R.rect(18, y, 96, y + 1, hex('#7a7488')); R.rect(18, y + 1, 96, y + 1, hex('#4a4458')); }
  R.rect(56, 18, 58, 86, SP.mad[2]); R.rect(18, 50, 96, 52, SP.mad[2]);
  // la lámpara de la mesa y su cono de luz con motas
  R.linea(296, 112, 286, 84, K); R.linea(297, 112, 287, 84, hex('#4a4a5a')); R.linea(286, 84, 272, 76, hex('#4a4a5a')); R.rect(290, 110, 304, 113, K);
  R.poligono([[262, 74], [280, 72], [284, 82], [266, 86]], K); R.poligono([[263, 75], [279, 73], [282, 81], [267, 84]], hex('#2e7a5a'));
  for (let y = 86; y < 112; y++) for (let x = 250; x < 300; x++) if (Math.abs(x - 273 - (y - 86) * 0.2) < (y - 84) * 0.9 && (x + y) % 2 === 0) velo(x, y, hex('#fff0b0'), 0.18);
  for (let k = 0; k < 6; k++) R.pset(262 + ((k * 13 + Math.floor(t * 4)) % 26), 90 + ((k * 7 + Math.floor(t * 3)) % 20), hex('#fff4c8'));
  // el calendario de mesa: el 11 se levanta y queda el 12 (2023) en «December 2023»
  const fl = tramo(t, c(0.04), c(0.1));
  R.poligono([[252, 116], [276, 116], [272, 96], [256, 96]], K); R.poligono([[254, 115], [274, 115], [271, 98], [257, 98]], hex('#e8e4da'));
  R.rect(256, 92, 272, 112, K); R.rect(257, 93, 271, 111, BL); R.rect(257, 93, 271, 97, hex('#c83a3a')); R.numero('2023', 264, 97, { centro: true, color: BL, fina: true });
  R.numero(fl < 0.5 ? '11' : '12', 264, 109, { centro: true, color: K });
  if (fl > 0 && fl < 1) { const hy = Math.round(lerp(111, 88, fl)); R.rect(257, Math.min(hy, 93), 271, 93, K); R.rect(258, Math.min(hy, 93) + 1, 270, 92, BL); }
  // la silla vacía: gira despacio y se para
  const u = tramo(t, P6, P6 + 3.4), an = 0.9 * (1 - ent(u)) * Math.sin(1.2 + u * 2), cx = Math.round(lerp(118, 110, ent(u))), ca = Math.abs(Math.cos(an));
  for (let k = 0; k < 5; k++) { const al = k * 1.2566 + an * 0.5, px = cx + Math.round(Math.cos(al) * 24), py = 166 + Math.round(Math.sin(al) * 5); R.linea(cx, 160, px, py, K); R.linea(cx, 159, px, py - 1, hex('#3a3a46')); R.disco(px, py + 2, 2, K); R.pset(px, py + 1, hex('#6a6a7a')); }
  R.rect(cx - 2, 138, cx + 2, 160, K); R.rect(cx - 1, 138, cx + 1, 160, hex('#8a8a96'));
  const bw = Math.round(6 + 14 * ca), bx = cx + Math.round(Math.sin(an) * 7);
  R.rect(bx - bw - 1, 92, bx + bw + 1, 132, K); R.rect(bx - bw, 93, bx + bw, 131, hex('#2a2a36')); R.rect(bx - bw + 2, 95, bx + bw - 2, 129, hex('#3a3a4a')); R.rect(bx - bw + 2, 95, bx - bw + 3, 129, hex('#5a5a6a'));
  for (let y = 99; y < 128; y += 6) R.rect(bx - bw + 4, y, bx + bw - 4, y, hex('#30303e'));
  R.poligono([[cx - 22, 134], [cx + 22, 134], [cx + 19, 142], [cx - 19, 142]], K); R.poligono([[cx - 21, 135], [cx + 21, 135], [cx + 18, 140], [cx - 18, 140]], hex('#3a3a4a')); R.rect(cx - 19, 135, cx + 19, 135, hex('#5a5a6a'));
  for (const d of [-1, 1]) { const ax = cx + d * Math.round(17 * (0.4 + 0.6 * ca)); R.rect(ax - 2, 122, ax + 2, 125, K); R.rect(ax - 1, 123, ax + 1, 124, hex('#4a4a5a')); R.rect(ax, 125, ax, 134, K); }
  R.rect(cx - 30, 172, cx + 30, 173, hex('#1e2232'));
  R.rect(196, 148, 216, 174, K); R.rect(197, 149, 215, 173, hex('#3a4a5a')); R.rect(197, 149, 215, 150, hex('#6a7a8a')); for (let x = 199; x < 215; x += 4) R.rect(x, 152, x, 172, hex('#2a3644'));
  for (const [x, y] of [[201, 146], [209, 145]]) { R.disco(x, y, 3, K); R.disco(x, y, 2, hex('#e8e4da')); }
  R.rect(14, 146, 62, 174, K); R.rect(15, 147, 61, 173, hex('#a87a4a')); R.rect(15, 147, 61, 149, hex('#c8985a')); R.rect(37, 147, 39, 173, hex('#8a5a32'));
  for (let k = 0; k < 5; k++) { R.rect(18 + k * 2, 140 - k, 50 + k * 2, 141 - k, k % 2 ? hex('#e8e4da') : hex('#f8f4ea')); R.rect(18 + k * 2, 142 - k, 50 + k * 2, 142 - k, hex('#b8b0a0')); }
  for (let x = 62; x < 196; x++) R.pset(x, 168 + Math.round(Math.sin(x * 0.1) * 1.2), hex('#14161e'));
};
// ── 7: la mesa desde arriba: la goma borra el guion, la hoja se va y queda un «?» en blanco
const MP = pal('#3a2214', '#52321c', '#6a4426', '#825632', '#9a683c', '#b07c48');
function mesaArriba() {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y + 10) / 36), yy = (y + 10) % 36;
    const veta = Math.sin(x * 0.045 + tabla * 2.3 + Math.sin(y * 0.35 + tabla) * 1.3 + Math.sin(x * 0.011 + tabla * 4) * 3);
    let v = 2.6 + (veta > 0.62 ? 0.9 : veta < -0.72 ? -0.9 : 0) + (hh(x >> 1, y, tabla) > 0.95 ? -0.8 : 0) + Math.max(0, 1 - Math.hypot((x - 150) / 200, (y - 95) / 130)) * 1.3 - (x > 270 && y < 50 ? 0.6 : 0);
    if (yy === 0) v = 0; R.pset(x, y, tram(MP, v, x, y)); }
  // la taza con su cerco, las gafas, las notas y los clips
  R.anillo(62, 142, 13, MP[1]); R.disco(40, 40, 15, K); R.disco(40, 40, 14, hex('#e8e4da')); R.disco(40, 40, 11, hex('#3a2014')); R.disco(37, 37, 4, hex('#5a3420')); R.rect(54, 36, 60, 44, K); R.rect(55, 37, 59, 43, hex('#e8e4da'));
  for (const [x, y, cc] of [[30, 76, '#f4e070'], [36, 100, '#a0e0f0']]) { R.rect(x + 2, y + 2, x + 28, y + 26, MP[0]); R.rect(x, y, x + 26, y + 24, hex(cc)); for (let k = 0; k < 4; k++) R.rect(x + 4, y + 5 + k * 4, x + 20 - k * 3, y + 5 + k * 4, mez(hex(cc), K, 0.4)); }
  for (const d of [0, 22]) { R.anillo(86 + d, 158, 8, K); R.anillo(86 + d, 158, 7, hex('#4a4a5a')); } R.linea(94, 158, 100, 158, K);
  for (let k = 0; k < 3; k++) { const x = 100 + k * 12, y = 112; R.rect(x, y, x + 3, y + 10, hex('#c8ccd8')); R.rect(x + 1, y + 1, x + 2, y + 8, MP[2]); }
  R.rect(84, 30, 92, 100, K); R.rect(85, 31, 91, 96, hex('#e8c040')); R.rect(85, 96, 91, 99, hex('#f0a8b8')); R.poligono([[85, 30], [91, 30], [88, 24]], hex('#e8c8a0')); R.pset(88, 25, K);
  // el guion grueso, con sus capas y sus dos encuadernadores
  for (let k = 5; k >= 1; k--) { R.rect(150 + k, 26 + k, 274 + k, 166 + k, K); R.rect(150 + k, 26 + k, 273 + k, 165 + k, k % 2 ? hex('#d8d2c4') : hex('#ece6d8')); }
  R.rect(150, 26, 274, 166, K);
}
const hoja = (x0, borradas, lineas = true) => {
  R.rect(x0 + 2, 30, x0 + 128, 170, MP[0]); R.rect(x0, 26, x0 + 124, 166, K); R.rect(x0 + 1, 27, x0 + 123, 165, hex('#faf6ec')); R.rect(x0 + 1, 27, x0 + 2, 165, hex('#e8e2d2'));
  for (const y of [40, 150]) { R.disco(x0 + 10, y, 3, K); R.disco(x0 + 10, y, 2, hex('#c8a040')); }
  if (!lineas) return;
  R.rect(x0 + 40, 36, x0 + 84, 37, hex('#4a4a5a'));
  for (let y = 46, k = 0; y < 158; y += 6, k++) { if (y < borradas) continue; const w = 40 + Math.round(hh(k, 2, 11) * 56), s = k % 5 === 0 ? 30 : 20; R.rect(x0 + s, y, x0 + s + w, y, hex('#6a6a7a')); }
};
const p7 = (t) => {
  capa('mesa-a', mesaArriba);
  const e = tramo(t, P7 + 0.2, c(0.8)), borr = Math.round(46 + e * 112), quita = tramo(t, c(0.82), c(0.9)), q = tramo(t, c(0.92), E.duracion - 0.3);
  if (quita > 0) hoja(150, 999, false);
  hoja(150 + Math.round(ent(quita) * 200), quita > 0 ? 999 : borr, true);
  // las migas de goma
  if (quita === 0) for (let k = 0; k < 14; k++) { const y = 46 + ((k * 13) % Math.max(1, borr - 46)), x = 174 + (k * 37) % 90; R.pset(x, y, hex('#d8a0a8')); R.pset(x + 1, y, hex('#b88088')); }
  // el «?» que se dibuja de arriba abajo
  if (q > 0) { R.recorte([0, 0, 319, Math.round(60 + q * 70)]); R.icono('?', 194, 64, hex('#3a3a4a'), hex('#c8c0b0'), 7); R.recorte(null); }
  // la mano: con la goma (borra), luego quita la hoja, luego con el lápiz
  let hx, hy, cosa;
  if (t < c(0.81)) { hx = Math.round(214 + 34 * (0.5 + 0.5 * Math.sin(t * 14))); hy = Math.max(52, borr) + 2; cosa = 'goma'; if (t < P7 + 0.3) hx = Math.round(lerp(340, hx, tramo(t, P7, P7 + 0.3))); }
  else if (t < c(0.91)) { hx = 276 + Math.round(ent(quita) * 120); hy = 100; cosa = null; }
  else { const qq = q < 1 ? q : 1, an = qq * 5; hx = 224 + Math.round(Math.cos(an) * 12 * (1 - qq * 0.5)); hy = Math.round(70 + qq * 60 + Math.sin(an) * 6); cosa = 'lapiz'; }
  if (hx < 320 && hy < 190) {
    T.brazo(R, 346, hy + 26, hx + 14, hy + 2, '#3a5a8a', -1, { codo: [Math.round((346 + hx) / 2 + 8), hy + 20] });
    if (cosa === 'goma') { R.rect(hx - 8, hy - 4, hx + 4, hy + 3, K); R.rect(hx - 7, hy - 3, hx + 3, hy + 2, hex('#f0a8b8')); R.rect(hx - 7, hy - 3, hx - 3, hy + 2, hex('#7aa0d8')); R.rect(hx - 7, hy - 3, hx + 3, hy - 3, hex('#ffd0d8')); }
    if (cosa === 'lapiz') { R.linea(hx - 4, hy + 4, hx + 8, hy - 8, K); R.linea(hx - 3, hy + 4, hx + 9, hy - 8, hex('#e8c040')); R.pset(hx - 5, hy + 5, hex('#3a3a4a')); }
  }
};
const efectos = [[a(0.25), 'lapiz'], [a(0.72), 'brillo'], [a(0.89), 'publico'], [P3 + 0.4, 'zumbido'], [b(0.18), 'brillo'], [b(0.31), 'zumbido'], [b(0.54), 'whoosh'], [b(0.61), 'boing'],
  [P5 + 0.2, 'papel'], [P5 + 1, 'pop'], [c(0.05), 'papel'], [P7 + 0.3, 'lapiz'], [c(0.83), 'papel'], [c(0.93), 'lapiz']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año: (t) => (t < P3 ? 2022 : 2023) });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['do-comiccon'] = ('Comic-Con 2024', '''// DO-COMICCON (frase 32), julio de 2024, cartela «2024». Tres planos:
// 1. (fondo local) el centro de convenciones de San Diego de día: las velas blancas del tejado, palmeras, banderolas
//    con pictogramas, la bahía con veleros y la cola de fans disfrazados; el tranvía rojo pasa por delante en
//    «Comic-Con»; se abren las puertas y la cola avanza;
// 2. el auditorio, cámara de la pantalla, con luz cálida: los dos directores salen desde el telón («the Russo Brothers
//    return»), saludan y hablan con el micro; en «renamed Doomsday» el título se rompe y sale la máscara; señalan;
// 3. (fondo local) la sala desde el público: una mano sostiene un móvil que graba; en el móvil, el villano de la
//    capucha verde se quita la máscara en «Downey» y es él; las cabezas saltan; en «New mask» levanta la máscara;
//    en «Same task» cae confeti; las palomitas saltan de emoción.''', HLP + r'''
const a = (f) => en('russo', f);
const P2 = a(0.243), P3 = a(0.626);
// ── 1: el exterior del centro de convenciones (fondo local)
function exterior() {
  const CI = pal('#4a86d0', '#6a9ee0', '#8ab8ec', '#aed0f4', '#d0e4f8');
  for (let y = 0; y < 72; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tram(CI, (y / 72) * 3.6 + (hh(x >> 3, y >> 2, 1) - 0.5) * 0.3, x, y));
  // la punta de Point Loma y la bahía con brillos
  R.poligono([[0, 66], [40, 60], [90, 63], [130, 66], [0, 66]], hex('#7a8ab0')); R.poligono([[200, 66], [250, 61], [320, 59], [320, 66]], hex('#8a96b8'));
  for (let y = 66; y < 76; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x >> 1, y, 3) > 0.9 ? hex('#e8f4ff') : tram(pal('#2a6ab0', '#3a7ac0', '#5a96d0'), 1 + (y - 66) / 10 + (hh(x, y, 2) - 0.5) * 0.6, x, y));
  // el tejado de velas blancas (por debajo de la esquina de Atom)
  const PV = pal('#9aa4b8', '#c8ced8', '#e8ecf2', '#ffffff');
  for (const cx of [62, 104, 146, 188, 230]) { R.linea(cx, 44, cx, 76, hex('#6a7080'));
    for (let y = 50; y < 78; y++) { const w = (y - 50) * 0.85; for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) R.pset(x, y, tram(PV, x < cx ? 3 - (cx - x) / Math.max(1, w) * 0.8 : 2.1 - (x - cx) / Math.max(1, w) * 1.5, x, y)); }
    R.linea(cx, 50, cx - 24, 78, hex('#8a92a4')); R.linea(cx, 50, cx + 24, 78, hex('#8a92a4')); }
  // la fachada: cornisa clara y el muro de cristal que refleja el cielo
  R.rect(0, 76, 319, 86, K); for (let y = 77; y < 86; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tram(pal('#b8ae9a', '#d8ceb8', '#ece4d0'), 2.2 - (y - 77) * 0.15 + (hh(x >> 2, y, 4) - 0.5) * 0.4, x, y));
  for (let x = 0; x < 320; x += 16) R.rect(x, 77, x, 85, hex('#a89e8a'));
  for (let y = 86; y < 120; y++) for (let x = 0; x < 320; x++) { const gl = ((x - y * 0.7) % 70 + 70) % 70 < 9; R.pset(x, y, gl ? hex('#b8e0f4') : tram(pal('#1e4a6a', '#2a6088', '#3a7aa4', '#5a9ac0'), 3 - (y - 86) / 34 * 2.6 + (hh(x >> 3, y >> 3, 5) - 0.5) * 0.5, x, y)); }
  for (let x = 0; x < 320; x += 12) R.rect(x, 86, x, 119, hex('#14283a')); R.rect(0, 102, 319, 102, hex('#14283a'));
  // la entrada con su marquesina
  R.rect(136, 92, 200, 120, K); R.rect(137, 93, 199, 119, hex('#0e1e2e')); R.rect(130, 88, 206, 92, K); R.rect(131, 89, 205, 91, hex('#e8e4da'));
  // la plaza de losas en perspectiva
  for (let y = 120; y < 180; y++) { const p = (y - 120) / 60; for (let x = 0; x < 320; x++) { const X = (x - 168) / (0.5 + p) + 168, junta = Math.abs(((X % 22) + 22) % 22) < 0.8 || (y - 120) % Math.round(6 + p * 10) === 0;
    R.pset(x, y, junta ? hex('#a89c88') : tram(pal('#bcb09a', '#d0c4ae', '#e2d8c4', '#f0e8d8'), 2.4 - p * 0.6 + (hh(x, y, 6) - 0.5) * 0.7, x, y)); } }
  // los raíles del tranvía y el cable de arriba
  for (const y of [166, 174]) { R.rect(0, y, 319, y + 1, hex('#5a5a62')); R.rect(0, y, 319, y, hex('#c8ccd4')); }
  for (let x = 0; x < 320; x += 9) R.rect(x, 168, x + 4, 172, hex('#7a6a5a'));
  // los maceteros de las palmeras
  for (const x of [18, 300]) { R.rect(x - 12, 146, x + 12, 162, K); R.rect(x - 11, 147, x + 11, 161, hex('#b8a888')); R.rect(x - 11, 147, x + 11, 148, hex('#e0d4b8')); R.rect(x - 9, 145, x + 9, 147, hex('#3a5a2a')); }
}
const palmera = (x, t, k) => { const sw = Math.sin(t * 1.1 + k) * 2;
  for (let y = 66; y < 146; y++) { const xx = Math.round(x + (146 - y) * 0.06 + sw * (146 - y) / 80); R.rect(xx - 2, y, xx + 2, y, K); R.rect(xx - 1, y, xx + 1, y, y % 4 === 0 ? hex('#6a4a2a') : hex('#8a6a42')); }
  const tx = Math.round(x + 80 * 0.06 + sw), ty = 66;
  for (let f = 0; f < 8; f++) { const an = -Math.PI + f * 0.45 + Math.sin(t * 1.6 + f) * 0.05; for (let i = 0; i < 20; i++) { const px = Math.round(tx + Math.cos(an) * i), py = Math.round(ty + Math.sin(an) * i * 0.6 + i * i * 0.03); R.pset(px, py, K); R.pset(px, py - 1, i % 3 ? hex('#3a8a3e') : hex('#5ab84a')); R.pset(px + 1, py + 1, hex('#1e5a2a')); } } };
const banderola = (x, t, k, cc, tipo) => { const sw = Math.round(Math.sin(t * 2 + k) * 1.5); R.linea(x, 84, x, 122, hex('#4a4a52')); R.rect(x + 1, 86, x + 12 + sw, 112, K); R.rect(x + 2, 87, x + 11 + sw, 111, hex(cc)); R.rect(x + 2, 87, x + 3, 111, mez(hex(cc), BL, 0.3));
  if (tipo === 'mascara') T.e_mascara(R, x + 7, 98, 1, {}); else if (tipo === 'escudo') { R.disco(x + 7, 98, 4, BL); R.disco(x + 7, 98, 2, hex('#d83030')); } else { R.disco(x + 7, 98, 3, hex('#e8c040')); R.pset(x + 7, 93, hex('#e8c040')); R.pset(x + 7, 103, hex('#e8c040')); } };
const p1 = (t) => {
  capa('expo', exterior);
  // nubes de tres tonos a tres velocidades, gaviotas, veleros (fuera de la esquina de Atom)
  R.recorte([0, 0, 272, 64]);
  for (let k = 0; k < 6; k++) { const v = [2, 4, 7][k % 3], x = ((k * 71 + t * v) % 340) - 30, y = 16 + (k * 13) % 34; for (const [dx, dy, r, cc] of [[0, 0, 5, '#ffffff'], [7, 1, 4, '#eef2f8'], [-7, 2, 4, '#d4dcea'], [3, 4, 4, '#c0cadc']]) R.disco(Math.round(x + dx), y + dy, r, hex(cc)); }
  for (let k = 0; k < 3; k++) { const x = ((k * 97 + t * 22) % 300), y = 24 + k * 9 + Math.round(Math.sin(t * 3 + k) * 2), al = Math.floor(t * 5 + k) % 2; R.linea(x - 3, y - al, x, y, hex('#3a3a4a')); R.linea(x, y, x + 3, y - al, hex('#3a3a4a')); }
  R.recorte(null);
  for (let k = 0; k < 2; k++) { const x = Math.round(((k * 150 + t * 3) % 330) - 10), y = 70 + k * 3; R.poligono([[x, y], [x + 3, y - 7], [x + 4, y]], BL); R.rect(x - 2, y, x + 5, y + 1, hex('#4a3a2a')); }
  banderola(28, t, 0, '#c83a3a', 'mascara'); banderola(92, t, 1, '#3a6ac8', 'escudo'); banderola(232, t, 2, '#2e8a4a', 'estrella'); banderola(276, t, 3, '#7a4ab8', 'mascara');
  // las puertas de cristal que se abren («July 2024») y la cola de disfraces que avanza
  const ab = tramo(t, a(0.12), a(0.18)), w = Math.round(ab * 14);
  R.rect(140, 96, 167 - w, 119, hex('#3a6a88')); R.rect(169 + w, 96, 196, 119, hex('#3a6a88')); R.rect(167 - w, 96, 168 - w, 119, BL); R.rect(168 + w, 96, 169 + w, 119, BL);
  for (let k = 0; k < 3; k++) R.rect(150 + k * 14, 106, 154 + k * 14, 119, hex('#1a2a3a'));
  const av = tramo(t, a(0.16), P2 - 0.2), cola = [[EL.fanCapa, 186], [EL.fanArana, 206], [EL.fanCuernos, 226], [EL.turista, 246], [EL.nina, 266], [EL.estudiante, 286]];
  cola.forEach(([d, x], k) => R.actor(d, Math.round(x - av * 22), 152 + (k % 2), t, { dir: -1, anda: av > 0 && av < 1, habla: av === 0 && k % 2 === 0 && Math.sin(t * 5 + k) > 0.3, sonrisa: k % 3 === 0 }));
  // un fotógrafo retrata a un disfrazado (flash en «Comic-Con»)
  R.actor(EL.fanCapa, 70, 158, t, { dir: 1, brazos: t > a(0.06) && t < a(0.12) });
  const fo = R.actor(EL.tecnico, 104, 160, t, { dir: -1, sostiene: true }).mano; R.rect(fo[0] - 5, fo[1] - 3, fo[0] + 1, fo[1] + 2, K); R.rect(fo[0] - 4, fo[1] - 2, fo[0], fo[1] + 1, hex('#4a4a5a')); R.pset(fo[0] - 5, fo[1] - 1, hex('#8ac8ff'));
  if (t > a(0.066) && t < a(0.066) + 0.15) { R.disco(fo[0] - 6, fo[1] - 1, 5, hex('#fff8d0')); R.disco(fo[0] - 6, fo[1] - 1, 2, BL); }
  palmera(16, t, 0); palmera(296, t, 1);
  // el tranvía rojo, por delante de la gente
  // el carrito de comida con su sombrilla, el caballete con pictograma y los que cruzan por delante
  R.rect(112, 128, 144, 150, K); R.rect(113, 129, 143, 149, hex('#e8e4da')); R.rect(113, 129, 143, 131, hex('#c83a3a')); for (const x of [116, 140]) { R.disco(x, 152, 3, K); R.disco(x, 152, 2, hex('#6a6a72')); }
  R.linea(128, 128, 128, 104, K); for (let i = -18; i <= 18; i++) { const y = 104 + Math.round(Math.abs(i) * 0.35); R.rect(128 + i, y - 3, 128 + i, y, Math.floor((i + 18) / 6) % 2 ? hex('#f4f0e4') : hex('#e85a3a')); } R.rect(110, 104, 146, 104, K);
  for (let k = 0; k < 3; k++) { const yy = 120 - ((t * 8 + k * 4) % 12); R.pset(122 + k * 5, Math.round(yy), hex('#f4f4f4')); }
  R.actor(EL.oficinista, 134, 154, t, { dir: -1, habla: Math.sin(t * 4) > 0.4 });
  R.linea(236, 156, 242, 138, K); R.linea(248, 156, 242, 138, K); R.rect(236, 140, 248, 152, K); R.rect(237, 141, 247, 151, hex('#2a3a6a')); R.disco(242, 146, 3, hex('#e8c040'));
  const cr = tramo(t, 0.2, P2), cr2 = tramo(t, 0.6, P2);
  R.actor(EL.fanArana, Math.round(lerp(-20, 120, cr)), 176, t, { dir: 1, anda: cr > 0 && cr < 1 });
  R.actor(EL.joven, Math.round(lerp(330, 196, cr2)), 178, t, { dir: -1, anda: cr2 > 0 && cr2 < 1 });
  const tx = Math.round(lerp(340, -230, cl((t - 1.2) / 3.4, 0, 1)));
  if (tx < 330 && tx > -230) { R.rect(tx, 124, tx + 196, 170, K); R.rect(tx + 1, 125, tx + 195, 168, hex('#c82a2a')); R.rect(tx + 1, 125, tx + 195, 128, hex('#e85a4a')); R.rect(tx + 1, 160, tx + 195, 168, hex('#3a3a42'));
    R.rect(tx + 1, 156, tx + 195, 158, hex('#f4f0e4'));
    for (let k = 0; k < 9; k++) { const wx = tx + 8 + k * 21; R.rect(wx, 132, wx + 15, 147, K); R.rect(wx + 1, 133, wx + 14, 146, hex('#8ab8d8')); R.linea(wx + 2, 145, wx + 8, 134, hex('#c8e4f4')); if (k % 3 === 1) R.rect(wx + 5, 140, wx + 10, 146, hex('#3a2a3a')); }
    R.linea(tx + 90, 124, tx + 104, 108, K); R.linea(tx + 104, 108, tx + 118, 124, K); R.rect(tx + 96, 106, tx + 112, 107, K);
    for (const k of [20, 60, 140, 176]) { R.disco(tx + k, 169, 4, K); R.disco(tx + k, 169, 2, hex('#6a6a72')); }
    R.rect(tx + 2, 150, tx + 6, 153, hex('#fff4a0')); }
  R.linea(0, 105, 319, 103, hex('#3a3a42'));
};
// ── 2: el auditorio, cámara de la pantalla, luz cálida: los directores y el título que cambia
const p2 = (t) => {
  const cambio = a(0.539), o = { encuadre: 'auditorio', camara: 'pantalla', pantalla: t < a(0.552) ? 'titulo' : 'mascara', glitch: Math.max(0, 1 - Math.abs(t - a(0.548)) / 0.35),
    ovacion: Math.max(0, 0.15 + 0.35 * tramo(t, a(0.27), a(0.3)) - 0.3 * tramo(t, a(0.33), a(0.37)) + 0.55 * tramo(t, a(0.56), a(0.6))) };
  T.escenario(R, t, o);
  T.tinte(R, 14, 140, [230, 110, 60], 0.13);
  const u1 = tramo(t, P2 + 0.05, P2 + 1.4), u2 = tramo(t, P2 + 0.3, P2 + 1.6), mira = t > cambio + 0.2;
  const saluda = t > a(0.29) && t < a(0.34);
  const d1 = R.actor(EL.ejecutivo, Math.round(lerp(10, 112, u1)), 146, t, { dir: 1, anda: u1 > 0 && u1 < 1, barba: true, brazos: saluda, sostiene: !saluda && u1 >= 1 && !mira, habla: t > a(0.35) && t < cambio && Math.sin(t * 7) > 0, dedo: mira, sonrisa: true });
  if (!saluda && u1 >= 1 && !mira) { const m = d1.mano; R.rect(m[0] - 1, m[1] - 6, m[0] + 1, m[1], K); R.rect(m[0], m[1] - 5, m[0], m[1] - 1, hex('#3a3a46')); R.disco(m[0], m[1] - 7, 2, K); R.disco(m[0], m[1] - 7, 1, hex('#8a8e9a')); }
  R.actor(EL.ejecutivo2, Math.round(lerp(-10, 146, u2)), 146, t, { dir: mira || u2 < 1 ? 1 : -1, anda: u2 > 0 && u2 < 1, brazos: saluda, dedo: mira, sorpresa: t > cambio && t < cambio + 0.6, sonrisa: t > cambio + 0.6, pal: { H: hex('#4a4650'), h: hex('#6a6670') } });
  // un técnico cruza al fondo con un cable, detrás del telón derecho
  const tc = tramo(t, P2 + 2.5, P2 + 5.5); if (tc > 0 && tc < 1) R.actor(EL.tecnico, Math.round(lerp(250, 300, tc)), 146, t, { dir: 1, anda: true });
  T.escenarioDelante(R, t, o);
};
// ── 3: la sala desde el público, con el móvil que graba (fondo local)
function sala() {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tram(pal('#0a0a1a', '#12122a', '#1a183a', '#24204a', '#2e2858'), 0.4 + (y < 104 ? y / 104 * 2.8 : 3.2 - (y - 104) / 76 * 2.6) + (hh(x >> 2, y >> 2, 1) - 0.5) * 0.4, x, y));
  // la cercha con sus focos
  for (let x = 0; x < 320; x += 2) { R.pset(x, 18, hex('#3a3a4a')); R.pset(x, 24, hex('#3a3a4a')); } for (let x = 0; x < 320; x += 8) { R.linea(x, 18, x + 4, 24, hex('#4a4a5a')); R.linea(x + 4, 24, x + 8, 18, hex('#4a4a5a')); }
  // la pantalla gigante y las laterales (la imagen se pinta encima)
  R.rect(94, 28, 226, 84, K); R.rect(95, 29, 225, 83, hex('#0a2a14')); R.rect(16, 48, 72, 78, K); R.rect(17, 49, 71, 77, hex('#0a2a14')); R.rect(248, 48, 304, 78, K); R.rect(249, 49, 303, 77, hex('#0a2a14'));
  // el escenario lejano con su borde de luz
  R.rect(40, 92, 280, 104, hex('#1e1a2e')); R.rect(40, 92, 280, 92, hex('#e8c860')); for (let x = 42; x < 280; x += 6) R.pset(x, 98, hex('#8a6a3a'));
  R.rect(56, 84, 96, 92, hex('#2a2438')); R.rect(224, 84, 264, 92, hex('#2a2438'));
}
const p3 = (t) => {
  capa('sala-pov', sala);
  const quita = a(0.668), salto = Math.max(tramo(t, quita, quita + 0.3) - tramo(t, a(0.78), a(0.84)), tramo(t, a(0.946), a(0.96)));
  // la imagen de las pantallas: la máscara con capucha verde que brilla
  const ojo = 0.5 + 0.5 * Math.sin(t * 4);
  T.e_mascara(R, 160, 56, 4, { capucha: true, brillo: (t * 0.4) % 1, ojos: ojo }); T.e_mascara(R, 44, 63, 2, { brillo: (t * 0.4) % 1 }); T.e_mascara(R, 276, 63, 2, { brillo: (t * 0.4 + 0.5) % 1 });
  // los haces de los focos que barren
  for (let k = 0; k < 4; k++) { const x0 = 40 + k * 80, x1 = 160 + Math.sin(t * 0.9 + k * 1.7) * 90; const cc = [hex('#3ae87a'), hex('#8a5aff'), hex('#3ae87a'), hex('#5ac8ff')][k];
    for (let y = 26; y < 100; y += 1) { const f = (y - 26) / 74, xc = Math.round(lerp(x0, x1, f)), w = Math.round(2 + f * 12); for (let x = xc - w; x <= xc + w; x++) if ((x + y) % 2 === 0) velo(x, y, cc, 0.16); }
    R.disco(x0, 25, 2, BL); }
  // las figuras pequeñas del escenario lejano: el de la capucha verde y los dos directores
  for (const x of [128, 192]) { R.rect(x, 82, x + 2, 91, hex('#0a0a14')); R.rect(x, 80, x + 2, 81, hex('#d8a878')); }
  R.rect(158, 80, 162, 91, hex('#2e7a3e')); R.rect(159, 79, 161, 81, t < quita ? hex('#a8acbc') : hex('#d8a878'));
  if (t > quita && t < quita + 0.25) R.disco(160, 84, 6, hex('#e8fff0'));
  // tres filas de cabezas de espaldas que saltan
  const filas = [[110, 4, 12, 0.5], [128, 6, 17, 0.75], [152, 9, 26, 1]];
  filas.forEach(([y, r, dx, s], fi) => { for (let k = -1; k < 340 / dx; k++) { const x = k * dx + (fi % 2 ? dx / 2 : 0), j = Math.round(Math.abs(Math.sin(t * 8 + k * 1.3 + fi)) * 5 * s * salto);
    const yy = y - j; R.disco(x, yy, r + 1, K); R.disco(x, yy, r, [hex('#2a2030'), hex('#3a2a20'), hex('#4a3a2a'), hex('#1e1a28')][(k + fi) & 3]); R.rect(x - r, yy - r + 1, x - r + 1, yy, hex('#4a6a5a'));
    R.rect(x - r - 2, yy + r - 1, x + r + 2, yy + r + 12, K); R.rect(x - r - 1, yy + r, x + r + 1, yy + r + 12, [hex('#3a3a6a'), hex('#5a2a3a'), hex('#2a4a3a'), hex('#4a4a52')][(k * 3 + fi) & 3]); } });
  // el confeti de «Same task»
  const cf = tramo(t, a(0.95), E.duracion);
  if (cf > 0) for (let k = 0; k < 70; k++) { const x = (k * 47 + Math.round(Math.sin(t * 3 + k) * 6)) % 320, y = Math.round(-10 + (cf * 260 + hh(k, 1, 4) * 120) % 200); if (x > 272 && y < 50) continue; R.rect(x, y, x + 1, y + (k % 2), [hex('#ff4a4a'), hex('#4ae87a'), hex('#ffd84a'), hex('#5ac8ff'), BL][k % 5]); }
  // el móvil: la pantalla con el escenario de cerca y quien se quita la máscara
  const mx = 200, my = 56, bb = Math.round(Math.sin(t * 2.2) * 1 + salto * Math.sin(t * 9) * 1.5);
  R.rect(mx - 2, my - 2 + bb, mx + 54, my + 96 + bb, K); R.rect(mx - 1, my - 1 + bb, mx + 53, my + 95 + bb, hex('#2a2a34')); R.rect(mx + 22, my + 1 + bb, mx + 30, my + 2 + bb, hex('#4a4a56'));
  const sx0 = mx + 3, sy0 = my + 5 + bb, sx1 = mx + 49, sy1 = my + 89 + bb;
  for (let y = sy0; y <= sy1; y++) R.rect(sx0, y, sx1, y, tram(pal('#0a1a10', '#123a1e', '#1e5a2e', '#2a6a3a'), (y < sy0 + 50 ? 1.8 + Math.sin((y - sy0) * 0.2 + t) * 0.6 : 0.6), sx0, y));
  R.rect(sx0, sy0 + 62, sx1, sy1, hex('#3a2a2a')); R.rect(sx0, sy0 + 62, sx1, sy0 + 62, hex('#e8c860')); for (let x = sx0; x < sx1; x += 5) R.pset(x, sy0 + 70, hex('#5a4030'));
  T.e_mascara(R, (sx0 + sx1) / 2, sy0 + 18, 2, { capucha: true, brillo: (t * 0.4) % 1, ojos: ojo });
  const fx = Math.round((sx0 + sx1) / 2) - 7, fs = sy0 + 74;
  if (t < quita) R.actor(EL.doom, fx, fs, t, { dir: 1, brazos: t > quita - 0.5 });
  else { R.poligono([[fx + 1, fs - 22], [fx + 14, fs - 22], [fx + 17, fs], [fx - 2, fs]], hex('#1e5a2a')); R.poligono([[fx + 2, fs - 21], [fx + 13, fs - 21], [fx + 15, fs - 1], [fx, fs - 1]], hex('#2e7a3e'));
    const sube = t > a(0.88) && t < a(0.94), m = R.actor(EL.rdj, fx, fs, t, { dir: 1, sostiene: sube ? [fx + 20, fs - 30] : true, sonrisa: true, habla: t > a(0.86) && Math.sin(t * 8) > 0 }).mano;
    T.e_mascara(R, m[0] + 1, m[1] - 3, 1, {}); }
  if (t > quita && t < quita + 0.3) for (let k = 0; k < 8; k++) R.pset(fx + 7 + Math.round(Math.cos(k * 0.8) * (6 + (t - quita) * 40)), fs - 14 + Math.round(Math.sin(k * 0.8) * (6 + (t - quita) * 40)), BL);
  R.disco(sx0 + 5, sy0 + 5, 2, Math.floor(t * 2) % 2 ? hex('#ff3030') : hex('#8a1a1a'));
  for (let k = 0; k < 4; k++) R.rect(sx1 - 12 + k * 3, sy0 + 7 - k, sx1 - 11 + k * 3, sy0 + 7, BL);
  // la mano que lo sostiene (canónica)
  T.brazo(R, 334, 196, mx + 46, my + 92 + bb, '#4a3a7a', -1, { codo: [300, 176] });
  // las palomitas, en el respaldo de delante, saltan de emoción
  const ex = t > quita ? 'emocion' : 'normal';
  T.palomitas(R, 74, 178, t, { s: 2, dir: 1, expresion: ex, salta: salto > 0.3 ? 1 : 0, cae: 0, lleno: 1 });
};
const efectos = [[1.2, 'campana'], [a(0.066), 'flash'], [a(0.13), 'puerta'], [a(0.28), 'publico'], [a(0.545), 'zumbido'], [a(0.56), 'brillo'], [a(0.668), 'publico'], [a(0.89), 'brillo'], [a(0.95), 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { cartela: '2024', efectos, año: 2024 });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['do-latveria'] = ('Latveria', '''// DO-LATVERIA (frases 33–34). Seis planos:
// 1. (fondo local, el estudio de Doom) muros de piedra, tapices verdes, antorchas, la ventana con el castillo, el globo
//    terráqueo y el banco de inventos: Doom se vuelve en «Victor von Doom» y enciende su invento («a genius»);
// 2. Latveria: el castillo sobre el pueblo; Doom cruza la plaza («rules a small European country») y en «Latveria»
//    se para, levanta los brazos y repica la campana; los paisanos se apartan;
// 3. la puerta del castillo de cerca: entran flotando las viñetas antiguas (la máscara, el 1962 en «1962», el rival en
//    «rival»); Reed llega por la rampa y los dos se encaran;
// 4. (la mesa de Doom desde arriba) el cómic de los cuatro con un 4 grande; una mano señala al líder («the leader of the
//    Fantastic Four»); las palomitas cuentan 1 («one movie») y 2;
// 5. la rueda de prensa de cerca: él, con gafas y la máscara en la mano, se la pone en «Doom»; señala el panel 2026
//    («Doomsday») y se descubre el panel 2027 («the next Avengers film»); levanta los brazos entre flashes;
// 6. (el estudio de Doom, la pared) el calendario de pergamino: la hoja 2026 se levanta en «December 2027» y una mano
//    rodea el 17 de diciembre con rotulador rojo.''', HLP + r'''
const a = (f) => en('latveria', f), b = (f) => en('secret', f);
const P2 = a(0.262), P3 = a(0.515), P4 = a(0.879), P5 = b(0.206), P6 = b(0.659);
const PI = pal('#2a2c30', '#3a3c42', '#4c4e54', '#5e6066', '#72747a', '#888a8e');
const VERDE = pal('#123a1e', '#1e5a2a', '#2e7a3e', '#4a9a52'), ORO = hex('#e8b830'), OROS = hex('#a87a20');
// piedra en bloques con luz de dos antorchas (lx: lista de focos [x, y, alcance])
const piedra = (x0, y0, x1, y1, bw, bh, focos, k = 0, base = 1.6) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const fila = Math.floor((y - y0) / bh), xx = x + (fila % 2) * (bw >> 1), jx = ((xx % bw) + bw) % bw, jy = (y - y0) % bh;
    let l = 0; for (const [fx, fy, r] of focos) l = Math.max(l, 1 - Math.hypot(x - fx, (y - fy) * 1.2) / r);
    const bloque = hh(Math.floor(xx / bw), fila, k), v = base + l * 2.4 + (bloque - 0.5) * 0.9 + (hh(x, y, k + 1) - 0.5) * 0.5;
    R.pset(x, y, jx === 0 || jy === 0 ? PI[0] : jy === 1 || jx === 1 ? tram(PI, v + 0.6, x, y) : tram(PI, v, x, y)); } };
const llama = (x, y, t, k = 0, s = 1) => { const f = Math.sin(t * 13 + k) * 1.2, g = Math.sin(t * 7.7 + k * 2); R.disco(x, y - Math.round(3 * s), Math.round(4 * s), hex('#c84a1a')); R.disco(x + Math.round(f * 0.5), y - Math.round(5 * s), Math.round(3 * s), hex('#f08a2a'));
  R.disco(x + Math.round(f), y - Math.round((7 + g) * s), Math.round(2 * s), hex('#ffd860')); R.pset(x + Math.round(f), y - Math.round((10 + g) * s), hex('#fff4c0')); };
const tapiz = (x0, y0, x1, y1, t, k) => { const sw = Math.round(Math.sin(t * 0.9 + k) * 1); R.rect(x0 - 3, y0 - 2, x1 + 3, y0, K); R.rect(x0 - 2, y0 - 1, x1 + 2, y0 - 1, OROS);
  for (let y = y0; y < y1; y++) { const d = Math.round(sw * (y - y0) / (y1 - y0)); R.rect(x0 + d - 1, y, x1 + d + 1, y, K); for (let x = x0; x <= x1; x++) R.pset(x + d, y, x === x0 + 2 || x === x1 - 2 ? ORO : tram(VERDE, 1.6 + (x - x0) / (x1 - x0) * 0.8 + Math.sin(x * 0.9) * 0.3, x, y)); }
  const cx = Math.round((x0 + x1) / 2) + sw; T.e_mascara(R, cx, Math.round(y0 + (y1 - y0) * 0.4), 1, {}); for (let x = x0; x <= x1; x += 2) R.rect(x + sw, y1, x + sw, y1 + 3, ORO); };
// ── 1: el estudio de Doom (fondo local)
function estudio() {
  piedra(0, 0, 319, 121, 22, 10, [[118, 56, 90], [222, 56, 90], [46, 60, 60]], 3, 1.0);
  for (let y = 0; y < 50; y++) for (let x = 274; x < 320; x++) velo(x, y, PI[1], 0.45);
  // la ventana en arco (el cielo y el castillo, en cada fotograma)
  R.rect(18, 30, 74, 98, K); R.disco(46, 30, 28, K); R.rect(22, 30, 70, 96, PI[4]); R.disco(46, 30, 24, PI[4]); R.rect(26, 30, 66, 94, K); R.disco(46, 30, 20, K);
  R.rect(14, 96, 78, 102, K); R.rect(15, 97, 77, 101, PI[4]); R.rect(15, 97, 77, 97, PI[5]);
  // el suelo de losas y la alfombra verde
  for (let y = 122; y < 180; y++) { const p = (y - 122) / 58; for (let x = 0; x < 320; x++) { const X = (x - 170) / (0.5 + p) + 170, fila = Math.floor(Math.log(1 + (y - 122) / 5) * 3), jx = ((X + fila * 11) % 24 + 24) % 24;
    R.pset(x, y, jx < 0.9 ? PI[0] : tram(PI, 1.4 + p * 1.6 + (hh(Math.floor((X + fila * 11) / 24), fila, 2) - 0.5) * 0.9 + (hh(x, y, 4) - 0.5) * 0.4, x, y)); } }
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const e = Math.hypot((x - 176) / 120, (y - 168) / 16); if (e < 1) R.pset(x, y, e > 0.88 ? ORO : e > 0.8 ? VERDE[0] : tram(VERDE, 1.4 + (hh(x >> 1, y, 6) - 0.5) * 0.6 + (Math.sin(x * 0.3) > 0.8 ? 0.6 : 0), x, y)); }
  R.rect(0, 121, 319, 122, PI[0]);
  // la estantería con libros y frascos (por debajo de la esquina de Atom)
  R.rect(262, 52, 319, 122, K); R.rect(263, 53, 319, 121, hex('#3a2414'));
  for (const yy of [54, 78, 100]) { R.rect(263, yy + 20, 319, yy + 21, hex('#6a4426')); for (let x = 265; x < 318; x += 5) { const al = 13 + ((x * 7 + yy) % 6); R.rect(x, yy + 20 - al, x + 3, yy + 19, K); R.rect(x + 1, yy + 21 - al, x + 2, yy + 19, [hex('#7a2a2a'), hex('#2a4a6a'), hex('#5a4a2a'), hex('#2e5a3a'), hex('#6a5a8a')][(x + yy) % 5]); R.pset(x + 1, yy + 23 - al, ORO); } }
  R.rect(296, 90, 304, 99, K); R.rect(297, 92, 303, 98, hex('#3ae87a')); R.rect(299, 87, 301, 91, K);
}
const p1 = (t) => {
  capa('estudio', estudio);
  // por la ventana: cielo de la tarde, montes nevados y la torre con la bandera verde
  R.recorte([26, 10, 66, 93]);
  for (let y = 10; y < 94; y++) R.linea(26, y, 66, y, tram(pal('#3a4a7a', '#5a6a9a', '#c88a6a', '#f0b878'), (y - 10) / 84 * 3, 0, y));
  R.poligono([[26, 80], [36, 60], [44, 70], [54, 54], [66, 74], [66, 94], [26, 94]], hex('#7a8aa8')); R.poligono([[32, 68], [36, 60], [40, 66]], BL); R.poligono([[50, 60], [54, 54], [58, 62]], BL);
  R.disco(46, 98, 14, hex('#3a4a3a')); R.rect(40, 62, 50, 94, hex('#5a5c62')); R.rect(40, 62, 41, 94, hex('#8a8c92')); for (let x = 40; x <= 50; x += 3) R.rect(x, 59, x + 1, 62, hex('#5a5c62'));
  R.linea(45, 58, 45, 44, K); for (let k = 0; k < 8; k++) R.rect(46 + k, 44 + Math.round(Math.sin(t * 6 - k * 0.7) * 1.2), 46 + k, 49 + Math.round(Math.sin(t * 6 - k * 0.7) * 1.2), VERDE[2 + (k % 2)]);
  for (let k = 0; k < 2; k++) { const x = Math.round(((t * 4 + k * 30) % 50) + 22), y = 22 + k * 8; R.disco(x, y, 3, hex('#f0e0d8')); R.disco(x + 4, y + 1, 2, hex('#d8c0c0')); }
  R.recorte(null); R.rect(45, 10, 47, 93, PI[3]); R.rect(26, 52, 66, 53, PI[3]);
  tapiz(88, 14, 108, 96, t, 0); tapiz(232, 14, 252, 96, t, 1);
  for (const x of [120, 222]) { R.rect(x - 3, 58, x + 3, 62, K); R.rect(x - 2, 59, x + 2, 61, hex('#6a5a4a')); R.rect(x - 1, 62, x + 1, 68, hex('#4a3a2a')); llama(x, 58, t, x); }
  // el globo terráqueo que gira despacio hacia Europa
  R.linea(52, 160, 64, 132, K); R.linea(76, 160, 64, 132, K); R.linea(64, 170, 64, 132, K); R.linea(53, 160, 64, 133, hex('#7a4a2a')); R.linea(75, 160, 64, 133, hex('#7a4a2a'));
  R.globo(64, 118, 15, lerp(-60, 21, ent(tramo(t, 0, P2))), {}); R.anillo(64, 118, 17, OROS); R.pset(64, 100, ORO); R.pset(64, 136, ORO);
  // Doom detrás del banco: trabaja de espaldas, se vuelve en «Doom» y señala su invento en «genius»
  const vuelve = t > a(0.08), m = R.actor(EL.doom, 168, 146, t, { dir: vuelve ? 1 : -1, sostiene: !vuelve ? [158, 128] : false, dedo: t > a(0.2) });
  if (!vuelve) { R.linea(m[0], m[1], m[0] - 5, m[1] + 4, hex('#8a8e9a')); R.disco(m[0] - 5, m[1] + 4, 1, hex('#c8ccd8')); }
  // el banco de inventos (DELANTE): tablero, frasco que burbujea, engranajes, planos, la esfera que se enciende
  R.rect(116, 132, 244, 140, K); for (let y = 133; y < 140; y++) for (let x = 117; x < 244; x++) R.pset(x, y, tram(pal('#3a2414', '#52321c', '#6a4426', '#825632'), 2.2 + Math.sin(x * 0.2 + y) * 0.4 + (hh(x >> 2, y, 3) - 0.5) * 0.6, x, y));
  R.rect(117, 133, 243, 133, hex('#9a683c')); R.rect(116, 140, 244, 154, K); R.rect(117, 141, 243, 153, hex('#3a2414')); for (const x of [150, 210]) R.rect(x, 141, x, 153, hex('#24160c'));
  for (const x of [120, 240]) { R.rect(x - 2, 154, x + 2, 176, K); R.rect(x - 1, 154, x + 1, 176, hex('#52321c')); }
  R.rect(124, 128, 146, 133, hex('#d8d0b8')); for (let k = 0; k < 3; k++) R.rect(126, 129 + k * 1, 138 - k * 3, 129 + k * 1, hex('#3a5aa8'));
  for (const [gx, gr, sp] of [[154, 5, 1], [163, 3, -1.6]]) { const an = t * sp * 2; R.disco(gx, 128, gr + 1, K); R.disco(gx, 128, gr, hex('#a8904a')); for (let k = 0; k < 8; k++) R.pset(gx + Math.round(Math.cos(an + k * 0.785) * (gr + 1)), 128 + Math.round(Math.sin(an + k * 0.785) * (gr + 1)), hex('#c8b06a')); R.pset(gx, 128, K); }
  R.rect(180, 116, 188, 132, K); R.rect(181, 120, 187, 131, hex('#2ec85a')); R.rect(181, 117, 187, 119, hex('#c8e8f0')); for (let k = 0; k < 4; k++) R.pset(182 + (k * 2) % 5, 130 - ((t * 9 + k * 3) % 11), hex('#c8ffd8'));
  const on = tramo(t, a(0.12), a(0.2)), core = on * (0.6 + 0.4 * Math.sin(t * 12));
  R.disco(214, 118, 12, K); R.anillo(214, 118, 11, ORO); R.anillo(214, 118, 7, OROS); R.linea(203, 118, 225, 118, ORO); R.linea(214, 107, 214, 129, ORO);
  if (core > 0) { R.disco(214, 118, Math.round(2 + 3 * core), hex('#3ae87a')); R.disco(214, 118, Math.round(1 + 2 * core), hex('#d8ffe4'));
    for (let k = 0; k < 3; k++) { const an = t * 9 + k * 2.1; let px = 214, py = 118; for (let i = 1; i < 6; i++) { const nx = 214 + Math.round(Math.cos(an + Math.sin(i * 3 + t * 20) * 0.4) * i * 3), ny = 118 + Math.round(Math.sin(an) * i * 3); R.linea(px, py, nx, ny, hex('#a8ffc8')); px = nx; py = ny; } } }
  R.rect(206, 129, 222, 133, K); R.rect(207, 130, 221, 132, OROS);
  R.rect(232, 124, 238, 133, K); R.rect(233, 125, 237, 132, hex('#f0e8d0')); llama(235, 124, t, 5, 0.6);
};
// ── 2: Latveria, la plaza: Doom la cruza y los paisanos se apartan
const p2 = (t) => {
  T.latveria(R, t, {});
  const u = tramo(t, P2 + 0.2, a(0.41)), x = Math.round(lerp(96, 174, u)), alto = t > a(0.42);
  R.actor(EL.doom, x, 162, t, { dir: 1, anda: u > 0 && u < 1, brazos: alto && t < a(0.48) });
  const ap = tramo(t, P2 + 1.2, P2 + 2.2);
  R.actor(EL.colona, Math.round(lerp(198, 222, ap)), 160, t, { dir: ap > 0 && ap < 1 ? 1 : -1, anda: ap > 0 && ap < 1, sorpresa: t > P2 + 1 });
  R.actor(EL.colono, 232, 166, t, { dir: -1, sorpresa: alto, dedo: alto });
  R.actor(EL.nina, 128, 168, t, { dir: 1, sonrisa: true, salto: alto ? Math.round(Math.abs(Math.sin(t * 8)) * 3) : 0 });
  // las palomas de la plaza echan a volar cuando pasa
  for (let k = 0; k < 4; k++) { const v = tramo(t, P2 + 0.8 + k * 0.15, P2 + 2.6 + k * 0.15), px = 150 + k * 9 + Math.round(v * (60 + k * 20)), py = 166 - Math.round(v * (70 + k * 12)) + (k % 2);
    R.rect(px - 1, py - 1, px + 2, py + 1, K); R.rect(px, py, px + 1, py, hex('#a8acb8')); if (v > 0 && Math.floor(t * 10 + k) % 2) { R.pset(px - 2, py - 2, hex('#c8ccd8')); R.pset(px + 3, py - 2, hex('#c8ccd8')); } }
};
// ── 3: la puerta del castillo con las viñetas de 1962; Reed llega y se encaran
const p3 = (t) => {
  const v = t < a(0.6) ? 0.445 * tramo(t, P3 + 0.1, a(0.6)) : t < a(0.72) ? 0.445 : lerp(0.445, 1, tramo(t, a(0.72), a(0.76)));
  T.latveria(R, t, { camara: 'vinetas', vinetas: v });
  const llega = tramo(t, a(0.7), a(0.78)), cara = t > a(0.78);
  R.actor(EL.doom, 200, 162, t, { dir: 1, dedo: cara, sonrisa: false });
  R.actor(EL.reed, Math.round(lerp(330, 238, llega)), 174, t, { dir: -1, anda: llega > 0 && llega < 1, enfado: cara, dedo: cara && Math.sin(t * 3) > 0 });
};
// ── 4: la mesa de Doom desde arriba: el cómic de los cuatro y las palomitas que cuentan
function mesaDoom() {
  const M = pal('#24140a', '#341e10', '#462a16', '#5a361c', '#6e4424');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const veta = Math.sin(x * 0.05 + Math.sin(y * 0.3) * 1.5 + y * 0.02); R.pset(x, y, tram(M, 2 + (veta > 0.7 ? 1 : veta < -0.8 ? -1 : 0) + Math.max(0, 1 - Math.hypot((x - 150) / 190, (y - 100) / 120)) * 1.4 - (x > 270 && y < 50 ? 0.5 : 0) + (hh(x >> 1, y, 2) - 0.5) * 0.5, x, y)); }
  // el cuero verde con su filete de oro
  R.rect(24, 22, 266, 170, K); for (let y = 23; y < 170; y++) for (let x = 25; x < 266; x++) R.pset(x, y, tram(VERDE, 1.3 + (hh(x >> 1, y >> 1, 4) - 0.5) * 0.7, x, y));
  R.rect(28, 26, 262, 26, OROS); R.rect(28, 166, 262, 166, OROS); R.rect(28, 26, 28, 166, OROS); R.rect(262, 26, 262, 166, OROS);
  // el pergamino con planos, el tintero y la pluma, la vela
  R.rect(184, 32, 252, 82, K); R.rect(185, 33, 251, 81, hex('#e8d8b0')); R.anillo(206, 56, 14, hex('#6a4a2a')); R.anillo(206, 56, 8, hex('#6a4a2a')); R.linea(192, 56, 220, 56, hex('#6a4a2a')); R.linea(224, 40, 246, 74, hex('#6a4a2a')); R.rect(228, 44, 246, 50, hex('#c8b88a'));
  R.disco(292, 120, 9, K); R.disco(292, 120, 8, hex('#2a2a34')); R.disco(290, 118, 3, hex('#4a4a5a')); R.linea(292, 120, 304, 150, hex('#e8e0d0')); R.linea(293, 120, 306, 150, hex('#c8c0b0'));
  R.disco(296, 70, 11, K); R.disco(296, 70, 10, OROS); R.disco(296, 70, 6, hex('#f0e8d0'));
  // el cómic antiguo: papel amarillento, cielo, ciudad, un 4 grande y la máscara que acecha
  R.rect(66, 34, 178, 160, hex('#1a0e08')); R.rect(62, 30, 174, 156, K); for (let y = 31; y < 156; y++) for (let x = 63; x < 174; x++) R.pset(x, y, y < 120 ? tram(pal('#3a8ad8', '#5aa8e8', '#8ac8f0'), 2.4 - (y - 31) / 90 * 2 + ((x + y) % 4 === 0 ? 0.6 : 0), x, y) : tram(pal('#c89a4a', '#e0b860'), 1, x, y));
  for (let k = 0; k < 10; k++) { const x = 64 + k * 11, h = 14 + (k * 7) % 20; R.rect(x, 120 - h, x + 9, 120, hex('#3a4a6a')); for (let j = 4; j < h; j += 5) R.rect(x + 2, 120 - j, x + 3, 121 - j, hex('#f0e070')); }
  R.rect(63, 31, 173, 52, hex('#f0d040')); R.rect(63, 52, 173, 53, K); R.rect(63, 31, 173, 31, hex('#fff4a0'));
  R.numero('4', 80, 50, { tam: 16 }); R.numero('12', 162, 42, { centro: true, color: K, fina: true });
  for (let k = 0; k < 40; k++) R.pset(63 + (k * 37) % 110, 31 + (k * 53) % 124, hex('#e8d8a0'));
}
const p4 = (t) => {
  capa('mesa-doom', mesaDoom);
  T.e_mascara(R, 146, 72, 2, { brillo: (t * 0.5) % 1, ojos: 0.5 + 0.5 * Math.sin(t * 3) });
  // los cuatro, en la portada
  const ll = t > P4 + 0.5 && t < a(0.97);
  R.actor(EL.reed, 70, 140, t, { dir: 1, dedo: ll, sonrisa: true }); R.actor(EL.sue, 92, 140, t, { dir: 1, sonrisa: true }); R.actor(EL.antorcha, 112, 138, t, { dir: 1 }); R.actor(EL.cosa, 136, 140, t, { dir: -1, enfado: true });
  // la mano que entra y señala al líder
  const en1 = tramo(t, P4, P4 + 0.5) - tramo(t, a(1) + 0.2, a(1) + 0.8);
  if (en1 > 0) T.brazo(R, -14, 196, Math.round(lerp(-10, 72, ent(en1))), Math.round(lerp(196, 128, ent(en1))), '#2e7a3e', 1, { codo: [Math.round(lerp(-20, 30, ent(en1))), 172] });
  // las palomitas en la mesa: miran, cuentan 1 («one movie») y luego 2
  const n = t > b(0.15) ? 2 : t > b(0.09) ? 1 : 0;
  T.palomitas(R, 222, 154, t, { s: 2, dir: -1, expresion: n === 2 ? 'emocion' : 'normal', cuenta: n || undefined, asiente: n === 0 && t > a(0.95) });
  if (n > 0) R.numero(String(n), 222, 102, { tam: 16, centro: true });
};
// ── 5: la rueda de prensa de cerca: la máscara puesta y los dos paneles 2026 y 2027
const panel = (x0, num, t, tapa) => { const x1 = x0 + 52; R.linea(x0 + 8, 128, x0 + 2, 150, K); R.linea(x1 - 8, 128, x1 - 2, 150, K); R.linea(x0 + 26, 128, x0 + 26, 150, K);
  R.rect(x0 - 1, 56, x1 + 1, 129, K); for (let y = 57; y < 129; y++) R.rect(x0, y, x1, y, tram(pal('#0e2216', '#163a22', '#1e4a2e'), 2 - (y - 57) / 72 * 2, x0, y));
  R.rect(x0, 57, x1, 58, hex('#3ae87a'));
  T.e_mascara(R, x0 + 26, 84, 3, { brillo: (t * 0.5) % 1, ojos: 0.7 }); R.numero(num, x0 + 27, 124, { centro: true });
  if (tapa < 1) { const h = Math.round((1 - tapa) * 72); R.rect(x0 - 2, 56, x1 + 2, 56 + h, K); for (let y = 57; y < 56 + h; y++) R.rect(x0 - 1, y, x1 + 1, y, tram(pal('#5a1a1a', '#7a2a2a', '#9a3a3a'), 1.4 + Math.sin(y * 0.3 + (y > 56 + h - 6 ? 2 : 0)) * 0.7, x0, y));
    for (let x = x0; x < x1; x += 6) R.rect(x, 56, x, 56 + h, hex('#4a1414')); } };
const p5 = (t) => {
  const o = { encuadre: 'prensa', camara: 'cerca', flashes: 0.4 + 0.5 * tramo(t, b(0.55), b(0.58)) };
  T.escenario(R, t, o);
  panel(72, '2026', t, 1); panel(196, '2027', t, tramo(t, b(0.49), b(0.56)));
  if (t > b(0.33) && t < b(0.33) + 0.5 && Math.floor(t * 8) % 2) { R.rect(70, 54, 126, 55, hex('#fff4a0')); R.rect(70, 130, 126, 131, hex('#fff4a0')); }
  const pone = b(0.27), ya = t > pone;
  if (!ya) { const sube = tramo(t, pone - 0.5, pone), m = R.actor(EL.rdj, 153, 150, t, { dir: 1, sostiene: sube > 0 ? [168, 121] : true, sonrisa: true, habla: t < pone - 0.6 && Math.sin(t * 7) > 0 }).mano; T.e_mascara(R, Math.round(lerp(m[0] + 1, 162, sube)), Math.round(lerp(m[1] - 3, 120, sube)), 1, {}); }
  else { R.poligono([[152, 128], [168, 128], [172, 152], [148, 152]], hex('#1e5a2a'));
    R.actor(EL.doom, 153, 150, t, { dir: t > b(0.49) ? 1 : -1, dedo: t > b(0.32) && t < b(0.56), brazos: t > b(0.57) });
    if (t < pone + 0.35) for (let k = 0; k < 10; k++) { const r = (t - pone) * 50; R.pset(160 + Math.round(Math.cos(k * 0.63) * r), 126 + Math.round(Math.sin(k * 0.63) * r * 0.7), hex('#a8ffc8')); } }
  T.escenarioDelante(R, t, o);
};
// ── 6: el estudio de Doom, la pared: el calendario de pergamino y el 17 de diciembre de 2027
function pared() { piedra(0, 0, 319, 179, 34, 15, [[40, 70, 120], [300, 150, 90]], 7, 0.8); for (let y = 0; y < 52; y++) for (let x = 272; x < 320; x++) velo(x, y, PI[0], 0.5);
  R.rect(0, 166, 319, 179, hex('#3a2414')); R.rect(0, 166, 319, 167, hex('#6a4426')); R.rect(0, 168, 319, 168, K); }
const hojaCal = (anio, t, yb = 0) => {
  const x0 = 98, x1 = 222, y0 = 26, y1 = 156;
  R.rect(x0 + 3, y0 + 3, x1 + 4, y1 + 4, PI[0]); R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K); for (let y = y0; y <= y1; y++) R.rect(x0, y, x1, y, tram(pal('#c8b080', '#dcc89a', '#ece0b8', '#f6eed2'), 2.6 - Math.abs(y - 90) / 70 + (hh(1, y, 3) - 0.5) * 0.5, x0, y));
  R.rect(x0 + 6, y0 + 6, x1 - 6, y0 + 50, K); for (let y = y0 + 7; y < y0 + 50; y++) R.rect(x0 + 7, y, x1 - 7, y, tram(pal('#0a1a10', '#123a1e', '#1e5a2e'), (y - y0) / 50 * 2, x0, y));
  for (let k = 0; k < 18; k++) R.pset(x0 + 9 + (k * 23) % 104, y0 + 9 + (k * 13) % 38, hex('#c8ffd8'));
  T.e_mascara(R, 160, y0 + 28, 3, { brillo: (t * 0.4) % 1, ojos: 0.6 });
  R.numero('12', 136, 102, { tam: 16, centro: true }); R.numero(anio, 192, 96, { centro: true, color: hex('#7a2a1a') });
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) { const d = j * 7 + i - 2; const x = 106 + i * 16, y = 108 + j * 9; R.rect(x, y, x + 13, y + 7, d >= 1 && d <= 31 ? hex('#e8dcb8') : hex('#d0c098')); R.rect(x, y + 7, x + 13, y + 7, hex('#b89a6a')); if (d === 17) R.numero('17', x + 7, y + 7, { centro: true, color: hex('#3a2a1a'), fina: true }); else if (d >= 1 && d <= 31) R.rect(x + 2, y + 2, x + 4, y + 3, hex('#9a8a6a')); }
};
const p6 = (t) => {
  capa('pared', pared);
  // la antorcha de la pared y la estantería con la vela
  R.rect(34, 74, 46, 80, K); R.rect(35, 75, 45, 79, hex('#6a5a4a')); R.rect(38, 80, 42, 92, hex('#4a3a2a')); llama(40, 74, t, 2, 1.3);
  for (let y = 20; y < 160; y++) for (let x = 0; x < 80; x++) if ((x + y) % 3 === 0 && Math.hypot(x - 40, y - 70) < 40 + Math.sin(t * 9) * 3) velo(x, y, hex('#ffb060'), 0.08);
  tapiz(258, 40, 284, 150, t, 2);
  // el cordel y el clavo
  R.disco(160, 18, 2, K); R.pset(160, 17, hex('#c8ccd8')); R.linea(160, 18, 104, 26, hex('#6a4a2a')); R.linea(160, 18, 216, 26, hex('#6a4a2a'));
  const fl = tramo(t, b(0.84), b(0.89));
  hojaCal('2027', t);
  if (fl < 1) { const h = Math.round((1 - ent(fl)) * 130); R.recorte([96, 24, 224, 24 + h]); hojaCal('2026', t); R.recorte(null);
    if (fl > 0) { R.rect(97, 24 + h, 223, 26 + h, K); R.rect(98, 24 + h, 222, 25 + h, hex('#f6eed2')); } }
  // la mano con el rotulador rojo que rodea el 17
  const ro = tramo(t, b(0.9), E.duracion - 0.5), sale = tramo(t, E.duracion - 0.4, E.duracion);
  const cx = 177, cy = 129; if (ro > 0) for (let i = 0; i < ro * 40; i++) { const an = -1.2 + i / 40 * 6.6; R.rect(cx + Math.round(Math.cos(an) * 11), cy + Math.round(Math.sin(an) * 7), cx + Math.round(Math.cos(an) * 11) + 1, cy + Math.round(Math.sin(an) * 7), hex('#d82020')); }
  if (t > b(0.86)) { const an = -1.2 + ro * 6.6, hx = Math.round(lerp(330, cx + Math.cos(an) * 11, tramo(t, b(0.86), b(0.9))) + sale * 120), hy = cy + Math.round(Math.sin(an) * 7);
    T.brazo(R, 352, 196, hx + 14, hy + 4, '#2e7a3e', -1, { codo: [300, 182] }); R.linea(hx - 2, hy + 1, hx + 6, hy - 5, K); R.linea(hx - 1, hy + 1, hx + 7, hy - 5, hex('#d82020')); }
};
const efectos = [[a(0.12), 'zumbido'], [a(0.2), 'brillo'], [P2 + 0.4, 'carro'], [a(0.43), 'campana'], [P3 + 0.3, 'papel'], [a(0.595), 'pop'], [a(0.74), 'whoosh'], [P4 + 0.6, 'golpecito'], [b(0.09), 'pop'], [b(0.15), 'pop'],
  [b(0.27), 'brillo'], [b(0.5), 'whoosh'], [b(0.58), 'flash'], [b(0.84), 'papel'], [b(0.9), 'lapiz']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: (t) => (t >= P3 && t < P4 ? 1962 : 2024) });
''')
