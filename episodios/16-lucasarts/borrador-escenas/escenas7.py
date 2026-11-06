E = {}

# Ayudas comunes de las tres escenas (van al principio de cada cuerpo)
AYUDA = r'''
const K = hex('#140c18');
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const hh = (x, y, s = 0) => { let n = (x * 374761393 + y * 668265263 + s * 1442695041) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const BUF = new Map();
// un fondo fijo pintado una vez en su búfer (R.usar devuelve el anterior: nunca R.usar() a secas)
const fijo = (clave, pinta) => { let b = BUF.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); BUF.set(clave, b); } R.copiar(b); return b; };
const ez = (u) => u * u * (3 - 2 * u);
const pulso = (t, a, d = 0.5, h = 4) => (t > a && t < a + d ? Math.round(Math.sin((t - a) / d * Math.PI) * h) : 0);
const CEMPA = [hex('#9a4a0c'), hex('#e0841a'), hex('#f8b030'), hex('#ffe27a')];
const flor = (x, y) => { x = Math.round(x); y = Math.round(y); R.pset(x, y - 1, CEMPA[2]); R.pset(x - 1, y, CEMPA[1]); R.pset(x + 1, y, CEMPA[2]); R.pset(x, y + 1, CEMPA[0]); R.pset(x, y, CEMPA[3]); };
// pétalos de cempasúchil que caen (fuera de la zona de Atom y de la barra del año)
const petalos = (t, n, x0, x1, y0, y1, sem) => { for (let k = 0; k < n; k++) { const v = 9 + hh(k, 1, sem) * 12, f = hh(k, 2, sem);
  const y = y0 + ((t * v + f * (y1 - y0)) % (y1 - y0)), x = x0 + hh(k, 3, sem) * (x1 - x0) + Math.sin(t * 1.7 + k) * 4;
  if ((x > 274 && y < 48) || (x > 18 && x < 172 && y < 16)) continue;
  R.pset(Math.round(x), Math.round(y), CEMPA[1 + (k % 3)]); if (Math.sin(t * 4 + k) > 0) R.pset(Math.round(x) + 1, Math.round(y), CEMPA[1 + ((k + 1) % 3)]); } };
// lo que sostiene un esqueleto: (x, y) = su .mano
const maleta = (x, y, c) => { R.rect(x - 4, y, x + 4, y + 7, K); R.rect(x - 3, y + 1, x + 3, y + 6, c); R.rect(x - 3, y + 1, x + 3, y + 1, mez(c, hex('#ffffff'), 0.35)); R.rect(x - 1, y - 2, x + 1, y - 1, K); R.pset(x - 2, y + 4, hex('#e8c060')); R.pset(x + 2, y + 4, hex('#e8c060')); };
const folleto = (x, y) => { R.rect(x - 3, y - 4, x + 3, y + 2, K); R.rect(x - 2, y - 3, x + 2, y + 1, hex('#f2e6c0')); R.rect(x - 2, y - 3, x + 2, y - 2, hex('#e0a030')); R.pset(x, y, hex('#c8a040')); };
'''

E['la-grim'] = ('Grim Fandango', '''// LA-GRIM (frases 37–38), 1998, cartela «1998». Tres planos:
// 1. (0 → «set») la Tierra de los Muertos de noche: tras la cartela, tres almas recién llegadas entran por la acera con
//    su equipaje; en «most ambitious» estallan los fuegos artificiales sobre el rascacielos art déco y las almas dan un
//    respingo; en «Grim Fandango» estalla la segunda tanda; una pareja de esqueletos baila junto al carro de flores.
// 2. («set» → «travel agent») la agencia de viajes art déco: las almas hacen cola; en «Manny Calavera» el agente asoma
//    de un salto tras la ventanilla con su sombrero y habla con la primera alma en «skeleton»; otra alma lee un folleto.
// 3. («travel agent» → fin) inserto sobre el mostrador de la agencia (fondo local): el folleto de viaje se despliega en
//    tres hojas; en «selling» el tren dorado echa a andar por el folleto hacia la puerta de luz y llega en «rest»; las
//    almas de la cola, al fondo, miran y saltan de alegría.''', AYUDA + r'''
const G = (f) => en('grim', f), Mn = (f) => en('manny', f);
const P2 = G(0.792), P3 = Mn(0.452);
const amb = G(0.293), grim = G(0.578), manny = Mn(0.128), esq = Mn(0.303), sell = Mn(0.601), viaje = Mn(0.812), rest = Mn(0.928);
const ORO = hex('#f8c838'), ROSA = hex('#f06aa8'), TURQ = hex('#5ae8e0'), CIELO = hex('#1a1638');
// un cohete: sube 0,6 s y estalla en t0
const cohete = (t, t0, x, y, col) => {
  const s = t - t0;
  if (s > -0.6 && s < 0) { const u = (s + 0.6) / 0.6, yy = Math.round(lerp(y + 46, y, ez(u)));
    R.pset(x, yy, hex('#fff4c8')); R.pset(x, yy + 1, col); for (let i = 2; i < 8; i++) if (hh(i, Math.floor(t * 15), 7) > 0.35) R.pset(x + (hh(i, 3, Math.floor(t * 15)) > 0.5 ? 1 : 0), yy + i, mez(col, CIELO, i / 9)); }
  if (s >= 0 && s < 1.9) { const u = s / 1.9, r = 4 + 21 * Math.sqrt(Math.min(1, s / 0.55)), cae = s * s * 5;
    if (s < 0.5) R.halo(x, y, r + 6, [mez(CIELO, col, 0.15), mez(CIELO, col, 0.3)], 0.8 * (1 - s / 0.5));
    for (let k = 0; k < 30; k++) { const a = k / 30 * 6.2832 + x * 0.1;
      if (u > 0.55 && hh(k, Math.floor(t * 12), 9) < u - 0.25) continue;
      const px = Math.round(x + Math.cos(a) * r), py = Math.round(y + Math.sin(a) * r * 0.9 + cae);
      const c = u < 0.2 ? hex('#fffbe8') : mez(col, CIELO, Math.max(0, u - 0.35));
      R.pset(px, py, c); if (u < 0.35) { R.pset(px + 1, py, c); R.pset(px, py + 1, c); } if (u < 0.55) { R.pset(px - Math.round(Math.cos(a) * 2), py - Math.round(Math.sin(a) * 2), mez(c, CIELO, 0.45)); R.pset(px - Math.round(Math.cos(a) * 4), py - Math.round(Math.sin(a) * 4) + 1, mez(c, CIELO, 0.7)); }
      if (k % 2 === 0 && u > 0.3) R.pset(px + 1, py + 2, mez(col, hex('#ffffff'), 0.3)); }
    if (s < 0.12) R.disco(x, y, 4, hex('#fffbe8')); else if (s < 0.3) R.disco(x, y, 2, mez(col, hex('#ffffff'), 0.5)); }
};
const almas = [
  { ropa: 'vestido', color: hex('#d0508a') }, { ropa: 'chaqueta', color: hex('#3a8a5a') }, { ropa: 'chaqueta', color: hex('#c89a3a'), sombrero: true },
];
const p1 = (t) => {
  T.muertos(R, t, { encuadre: 'ciudad' });
  cohete(t, amb, 196, 36, ORO); cohete(t, amb + 0.3, 50, 38, ROSA); cohete(t, grim, 226, 52, TURQ); cohete(t, grim + 0.35, 176, 30, ROSA); cohete(t, grim + 0.6, 62, 30, ORO);
  // la pareja que baila junto al carro de flores
  const b = Math.floor(t * 2.5) % 2;
  T.calaca(R, 214, 168, t, { ropa: 'vestido', color: hex('#e8a020'), dir: 1, salto: b ? 2 : 0 });
  T.calaca(R, 234, 168, t, { ropa: 'chaqueta', color: hex('#7a3ab8'), dir: -1, salto: b ? 0 : 2, habla: true });
  // las tres almas recién llegadas
  [[-18, 150, 0.3, 3.0], [-40, 122, 0.5, 3.2], [-62, 96, 0.7, 3.4]].forEach(([xa, xb, a, bb], i) => {
    const u = tramo(t, a, bb), v = tramo(t, grim + 0.4, P2 + 0.6), x = Math.round(lerp(xa, xb, ez(u)) + v * 30);
    const anda = (u > 0 && u < 1) || (v > 0 && v < 1);
    const g = T.calaca(R, x, 172, t, { ...almas[i], dir: 1, anda, salto: pulso(t, amb + 0.08 * i, 0.45, 4) + pulso(t, grim + 0.08 * i, 0.45, 3) });
    if (i === 1) maleta(g.mano[0] + 1, g.mano[1] + 1, hex('#8a4a2a')); if (i === 2) maleta(g.mano[0] + 1, g.mano[1] + 1, hex('#3a5a8a'));
  });
  petalos(t, 16, 60, 270, 60, 176, 3);
};
const p2 = (t) => {
  T.muertos(R, t, { encuadre: 'agencia' });
  const sube = ez(tramo(t, manny - 0.35, manny + 0.02));
  R.recorte([150, 56, 196, 113]);
  T.calaca(R, 172, 121 + Math.round((1 - sube) * 20), t, { dir: -1, salto: pulso(t, manny, 0.45, 4), habla: t > manny + 0.4 && t < P3 && Math.sin(t * 5) > -0.4 });
  R.recorte(null);
  T.muertosDelante(R, t, { encuadre: 'agencia' });
  // el alma que lee un folleto junto al revistero
  const d = T.calaca(R, 274, 164, t, { ropa: 'chaqueta', color: hex('#4a6ab8'), sombrero: true, dir: -1, habla: Math.sin(t * 1.3) > 0.6 });
  folleto(d.mano[0] - 1, d.mano[1]);
  // la cola de almas recién llegadas
  const ua = tramo(t, P2 + 0.05, manny - 0.4);
  T.calaca(R, Math.round(lerp(-16, 128, ez(ua))), 164, t, { ...almas[0], dir: 1, anda: ua > 0 && ua < 1, salto: pulso(t, manny + 0.05, 0.4, 3), habla: t > esq && t < esq + 0.9 && Math.sin(t * 7) > 0 });
  const ub = tramo(t, P2 + 0.8, manny + 0.3), gb = T.calaca(R, Math.round(lerp(-16, 82, ez(ub))), 164, t, { ...almas[1], dir: 1, anda: ub > 0 && ub < 1 });
  maleta(gb.mano[0] + 1, gb.mano[1] + 1, hex('#8a4a2a'));
  const uc = tramo(t, P2 + 1.8, esq + 0.4), gc = T.calaca(R, Math.round(lerp(-16, 48, ez(uc))), 164, t, { ...almas[2], dir: 1, anda: uc > 0 && uc < 1 });
  maleta(gc.mano[0] + 1, gc.mano[1] + 1, hex('#3a5a8a'));
};
// inserto: el mostrador de la agencia visto desde dentro, con la cola al fondo y el folleto del tren dorado
const BORDE = 88, SUELO0 = 74;
const fondo3 = () => {
  // la pared: papel crema con abanicos art déco, pilastras doradas, el friso en zigzag
  for (let y = 0; y < 66; y++) for (let x = 0; x < 320; x++) {
    const fx = x % 24, fy = y % 20, ab = Math.hypot(fx - 12, fy - 20) < 11 && (Math.atan2(fy - 20, fx - 12) * 6 | 0) % 2 === 0;
    R.pset(x, y, mez(ab ? hex('#e4cfa0') : hex('#efe0b8'), hex('#c8a870'), hh(x, y, 1) * 0.18 + y / 400));
  }
  R.rect(0, 0, 319, 3, hex('#3a2416')); R.rect(0, 4, 319, 4, hex('#c8a84a'));
  for (const px of [0, 98, 222]) { R.rect(px, 5, px + 8, 65, hex('#a8842e')); R.rect(px + 1, 5, px + 2, 65, hex('#f0d878')); R.rect(px + 6, 5, px + 7, 65, hex('#6a5018')); for (let y = 10; y < 64; y += 9) R.rect(px + 3, y, px + 5, y + 1, hex('#f8e8a0')); }
  for (let x = 0; x < 320; x++) { const z = Math.abs((x % 8) - 4); R.pset(x, 62 + z, hex('#1c1420')); R.pset(x, 63 + z, hex('#c8a84a')); R.pset(x, 64 + z, hex('#1c1420')); }
  R.rect(0, 70, 319, 73, hex('#3a2416')); R.rect(0, 70, 319, 70, hex('#6a4a2a'));
  // el tablero de salidas (números y trenes, sin letras) y los apliques de luz
  R.rect(112, 14, 214, 50, K); R.rect(114, 16, 212, 48, hex('#1c1a24')); R.rect(112, 12, 214, 14, hex('#c8a84a'));
  for (const sx of [108, 218]) { R.rect(sx - 1, 24, sx + 1, 34, hex('#a8842e')); R.poligono([[sx - 4, 18], [sx + 4, 18], [sx + 2, 24], [sx - 2, 24]], hex('#f8e8b0')); }
  // la ventana arqueada de la izquierda con la ciudad de noche
  const W0 = [22, 16, 82, 50];
  R.rect(W0[0] - 2, W0[1] - 2, W0[2] + 2, W0[3] + 2, hex('#6a5018'));
  for (let y = W0[1]; y <= W0[3]; y++) for (let x = W0[0]; x <= W0[2]; x++) R.pset(x, y, mez(hex('#1a1640'), hex('#4a2a6a'), (y - W0[1]) / 40 + hh(x, y, 4) * 0.12));
  for (let k = 0; k < 9; k++) { const bx = 24 + k * 7, bt = 30 + Math.round(hh(k, 1, 5) * 12); R.rect(bx, bt, bx + 5, W0[3], hex('#2a2238')); for (let y = bt + 2; y < W0[3]; y += 3) if (hh(k, y, 6) > 0.45) R.pset(bx + 2, y, hex('#f8d070')); }
  R.disco(70, 23, 4, hex('#f8f0c8')); R.disco(72, 22, 3, hex('#1a1640'));
  for (let x = W0[0]; x <= W0[2]; x += 15) R.rect(x, W0[1], x, W0[3], hex('#a8842e')); R.rect(W0[0], 33, W0[2], 33, hex('#a8842e'));
  // el cartel de viaje enmarcado (montaña al amanecer y un tren)
  R.rect(236, 14, 268, 46, hex('#5a3a18')); R.rect(238, 16, 266, 44, hex('#f8a850'));
  for (let y = 16; y < 30; y++) R.rect(238, y, 266, y, mez(hex('#f86a4a'), hex('#f8d070'), (y - 16) / 14));
  R.disco(252, 30, 6, hex('#fff0a8')); R.poligono([[238, 38], [248, 26], [256, 34], [262, 28], [266, 38]], hex('#6a3a6a')); R.rect(238, 38, 266, 44, hex('#3a5a3a')); R.rect(240, 40, 254, 42, hex('#e0b030')); R.rect(242, 39, 244, 39, hex('#e0b030'));
  // el suelo de damero detrás del mostrador
  for (let y = SUELO0; y < BORDE; y++) for (let x = 0; x < 320; x++) { const w = 8 + (y - SUELO0) * 0.6, c = (Math.floor((x - 160) / w) + Math.floor((y - SUELO0) / 4)) % 2 === 0;
    R.pset(x, y, mez(c ? hex('#ece2cc') : hex('#26222e'), hex('#000000'), 0.1 + hh(x, y, 8) * 0.06)); }
  // el mostrador: barandilla de latón, tablero de caoba con vetas e incrustación, frente tallado
  R.rect(0, BORDE, 319, BORDE + 1, hex('#f0d878')); R.rect(0, BORDE + 2, 319, BORDE + 3, hex('#a8842e')); R.rect(0, BORDE + 4, 319, BORDE + 4, hex('#3a2416'));
  for (let y = BORDE + 5; y < 166; y++) for (let x = 0; x < 320; x++) {
    const v = Math.sin(x * 0.045 + Math.sin(y * 0.6) * 1.4 + hh(0, y, 9) * 6) * 0.5 + 0.5, brillo = Math.abs((x - y * 1.6) - 40) < 26 ? 0.22 : 0;
    R.pset(x, y, mez(mez(hex('#4a1e12'), hex('#7a3a20'), v * 0.7 + hh(x, y, 10) * 0.12), hex('#c87a4a'), brillo)); }
  for (const yy of [BORDE + 8, 160]) R.rect(6, yy, 313, yy, hex('#c8a84a')); R.rect(6, BORDE + 8, 6, 160, hex('#c8a84a')); R.rect(313, BORDE + 8, 313, 160, hex('#c8a84a'));
  R.rect(0, 166, 319, 167, hex('#f0d878')); R.rect(0, 168, 319, 168, hex('#6a5018'));
  for (let y = 169; y < 180; y++) R.rect(0, y, 319, y, mez(hex('#3a160c'), hex('#5a2414'), (y - 169) / 11));
  for (let k = 0; k < 8; k++) { const cx = 20 + k * 40; for (let a = 0; a < 7; a++) { const an = Math.PI + a / 6 * Math.PI; R.linea(cx, 179, cx + Math.cos(an) * 9, 179 + Math.sin(an) * 9, hex('#c8a84a')); } R.disco(cx, 179, 3, hex('#f0d878')); }
  // el jarrón de cempasúchil
  R.poligono([[16, 106], [34, 106], [36, 128], [14, 128]], K); R.poligono([[17, 107], [33, 107], [35, 127], [15, 127]], hex('#2a6ab8'));
  for (let y = 108; y < 127; y += 4) R.rect(17, y, 34, y, hex('#f0e0b0')); R.rect(17, 107, 19, 127, hex('#6aa8e8')); R.rect(10, 128, 40, 129, hex('#2a0e08'));
  for (let k = 0; k < 18; k++) { const a = k * 2.4, r = 3 + (k % 5) * 2.4; flor(25 + Math.cos(a) * r * 1.2, 96 + Math.sin(a) * r * 0.8); }
  R.linea(25, 104, 22, 96, hex('#3a7a2a')); R.linea(25, 104, 30, 98, hex('#3a7a2a'));
  // el taco de billetes, las monedas, la pluma
  for (let k = 3; k >= 0; k--) { const x = 34 + k * 2, y = 136 - k * 2; R.rect(x, y, x + 32, y + 13, K); R.rect(x + 1, y + 1, x + 31, y + 12, hex('#f6ecc8')); R.rect(x + 1, y + 1, x + 31, y + 3, hex('#e0a030')); R.rect(x + 4, y + 7, x + 12, y + 9, hex('#c8a040')); R.rect(x + 16, y + 6, x + 28, y + 6, hex('#b8a888')); R.rect(x + 16, y + 9, x + 26, y + 9, hex('#b8a888')); }
  R.rect(46, 133, 48, 150, hex('#c83a3a'));
  for (const [x, y] of [[76, 152], [83, 156], [90, 151]]) { R.disco(x, y, 3, K); R.disco(x, y, 2.4, hex('#d8b040')); R.pset(x - 1, y - 1, hex('#fff0a0')); }
  R.linea(236, 160, 262, 150, K); R.linea(236, 159, 262, 149, hex('#1c1c2a')); R.linea(258, 151, 262, 149, hex('#e8c040'));
  // el timbre de latón, el tampón y el sello
  R.rect(262, 120, 288, 122, K); R.rect(263, 120, 287, 121, hex('#3a2416'));
  R.disco(275, 118, 10, K); R.disco(275, 118, 9, hex('#c8a040')); R.disco(272, 115, 4, hex('#f8e8a0')); R.rect(264, 118, 286, 121, hex('#3a2416')); R.rect(274, 106, 276, 109, K);
  R.rect(250, 138, 282, 152, K); R.rect(251, 139, 281, 151, hex('#2a2a3a')); R.rect(253, 141, 279, 149, hex('#5a1a2a'));
  R.rect(288, 126, 300, 152, K); R.rect(289, 140, 299, 151, hex('#3a2a20')); R.disco(294, 131, 5, K); R.disco(294, 131, 4, hex('#a8582a')); R.pset(292, 129, hex('#e89a5a')); R.rect(292, 135, 296, 140, hex('#a8582a'));
  // la vela en su candelero
  R.rect(300, 102, 306, 120, K); R.rect(301, 103, 305, 120, hex('#f6eedc')); R.rect(301, 103, 302, 120, hex('#ffffff')); R.rect(296, 120, 310, 123, hex('#c8a040'));
};
const fondoPapel = (x0, y0, x1, y1) => { R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K); R.rect(x0, y0, x1, y1, hex('#f6ecc8')); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#c8a040')); R.rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, hex('#c8a040')); };
const rc = (a, b, c, d, col) => R.poligono([[a, b], [c + 1, b], [c + 1, d + 1], [a, d + 1]], col);   // R.rect no respeta el recorte
const tablero = (t) => {
  const filas = [[1, 9], [2, 4], [3, 7], [4, 2]];
  filas.forEach(([n, h], i) => { const y = 19 + i * 7, cambia = Math.floor(t * 0.8 + i * 0.5) % 5 === 0 && ((t * 0.8 + i * 0.5) % 1) < 0.25;
    R.rect(117, y, 209, y + 5, hex('#2a2834'));
    R.rect(119, y + 1, 124, y + 4, hex('#e8b030')); R.rect(120, y + 3, 123, y + 4, K);   // un trenecito
    R.numero(String(n), 132, y + 5, { fina: true, rampa: [hex('#f8e8a0'), hex('#f8e8a0'), hex('#f8e8a0')] });
    for (let k = 0; k < 4; k++) R.rect(146 + k * 7, y + 1, 151 + k * 7, y + 4, cambia ? hex('#5a5a6a') : hex('#3a3a4a'));
    R.numero(cambia ? '-' : String((h + Math.floor(t * 0.25 + i)) % 10) + ':' + String((i * 15 + 5) % 60).padStart(2, '0'), 178, y + 5, { fina: true, rampa: [hex('#f8c838'), hex('#f8c838'), hex('#f8c838')] });
    if (i === 0) R.pset(205, y + 2, Math.sin(t * 6) > 0 ? hex('#5af08a') : hex('#1c3a2a')); });
};
const dentro = (t, x0, y0, x1, y1) => {
  // el paisaje del folleto: cielo al atardecer, montañas, el campo de cempasúchil, la vía y la puerta de luz
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const hz = 128;
    if (y < hz) { const u = (y - y0) / (hz - y0) + (hh(x, y, 20) - 0.5) * 0.18; R.pset(x, y, u < 0.35 ? hex('#3a2a6a') : u < 0.6 ? hex('#8a3a7a') : u < 0.82 ? hex('#e8604a') : hex('#f8a850')); }
    else R.pset(x, y, ((x + (y % 2)) % 3 === 0 || hh(x, y, 21) > 0.7) ? hex('#e0841a') : (y + x) % 5 === 0 ? hex('#3a6a2a') : hex('#c86010'));
  }
  for (let k = 0; k < 8; k++) if (Math.sin(t * 3 + k * 2) > 0) R.pset(x0 + 6 + k * 15, y0 + 3 + (k % 3) * 4, hex('#fff4c8'));
  R.poligono([[x0, 128], [x0 + 18, 114], [x0 + 34, 122], [x0 + 52, 110], [x0 + 72, 124], [x0 + 90, 112], [x1, 124], [x1, 128]], hex('#5a3a7a'));
  R.poligono([[x0, 128], [x0 + 26, 120], [x0 + 46, 126], [x0 + 64, 118], [x0 + 84, 127], [x1, 128]], hex('#3a2450'));
  // la puerta de luz (el descanso eterno) y sus rayos, que laten
  const gx = x1 - 22, gy = 126, br = 1 + 0.25 * Math.sin(t * 4) + 1.4 * Math.max(0, 1 - Math.abs(t - rest - 0.25) / 0.5);
  for (let a = 0; a < 12; a++) { const an = Math.PI + (a + 0.5) / 12 * Math.PI; if (a % 2) R.poligono([[gx, gy - 8], [gx + Math.cos(an - 0.12) * 30 * br, gy - 8 + Math.sin(an - 0.12) * 30 * br], [gx + Math.cos(an + 0.12) * 30 * br, gy - 8 + Math.sin(an + 0.12) * 30 * br]], hex('#f8d870')); }
  rc(gx - 7, gy - 14, gx + 7, gy, K); R.disco(gx, gy - 14, 7, K); rc(gx - 6, gy - 14, gx + 6, gy, hex('#fff8d8')); R.disco(gx, gy - 14, 6, hex('#fff8d8')); rc(gx - 7, gy - 14, gx - 6, gy, hex('#c8a040')); rc(gx + 6, gy - 14, gx + 7, gy, hex('#c8a040'));
  // la vía
  const via = (x) => Math.round(lerp(150, gy, (x - x0) / (gx - x0 - 4)));
  for (let x = x0; x < gx - 4; x++) { const y = via(x); R.pset(x, y, hex('#3a2a20')); R.pset(x, y + 3, hex('#3a2a20')); if (x % 4 === 0) rc(x, y - 1, x, y + 4, hex('#6a4a2a')); }
  // el tren dorado: echa a andar en «selling» y llega a la puerta en «rest»
  const p = ez(tramo(t, sell, rest)), tx = Math.round(lerp(x0 - 12, gx - 14, p)), ty = via(Math.max(x0, tx + 6)) - 1;
  const vag = (x, y) => { rc(x, y - 7, x + 10, y - 1, K); rc(x + 1, y - 6, x + 9, y - 2, hex('#e8b030')); rc(x + 1, y - 6, x + 9, y - 6, hex('#fff0a0')); rc(x + 2, y - 5, x + 3, y - 4, hex('#fff8d8')); rc(x + 6, y - 5, x + 7, y - 4, hex('#fff8d8')); R.pset(x + 2, y, K); R.pset(x + 8, y, K); };
  vag(tx - 24, ty + 2); vag(tx - 12, ty + 1);
  rc(tx, ty - 9, tx + 13, ty - 1, K); rc(tx + 1, ty - 6, tx + 9, ty - 2, hex('#f8c838')); rc(tx + 1, ty - 6, tx + 9, ty - 6, hex('#fff4b0')); rc(tx + 9, ty - 8, tx + 12, ty - 2, hex('#c8901c')); rc(tx + 10, ty - 7, tx + 11, ty - 6, hex('#fff8d8'));
  rc(tx + 2, ty - 11, tx + 4, ty - 7, K); rc(tx + 3, ty - 10, tx + 3, ty - 7, hex('#e8b030'));
  for (const wx of [2, 6, 10]) { R.disco(tx + wx, ty, 1.6, K); R.pset(tx + wx, ty, hex('#c8a040')); }
  if (p > 0 && p < 1) for (let k = 0; k < 4; k++) { const s = ((t * 2 + k * 0.25) % 1); R.disco(tx + 3 - s * 10, ty - 12 - s * 7, 1 + s * 2, mez(hex('#ffffff'), hex('#e8604a'), s * 0.6)); }
  if (t > rest && t < rest + 1.2) for (let k = 0; k < 10; k++) { const a = k * 0.63, r = (t - rest) * 30; R.pset(Math.round(gx + Math.cos(a) * r), Math.round(gy - 12 + Math.sin(a) * r * 0.7), hex('#fffbe0')); }
};
const p3 = (t) => {
  const b = fijo('mostrador', fondo3);
  tablero(t);
  // la cola de almas al fondo, detrás del mostrador (los pies los tapa el mostrador)
  const cola = [[118, { ropa: 'vestido', color: hex('#3a7ac8') }], [148, { ropa: 'chaqueta', color: hex('#3a8a5a') }], [178, { ropa: 'chaqueta', color: hex('#c89a3a'), sombrero: true }], [204, { ropa: 'vestido', color: hex('#d0508a') }]];
  cola.forEach(([x, o], i) => { const llega = i === 3 ? tramo(t, P3 + 0.6, viaje - 0.4) : 1; const xx = i === 3 ? Math.round(lerp(330, x, ez(llega))) : x;
    T.calaca(R, xx, BORDE + 2, t, { ...o, dir: i === 3 && llega < 1 ? -1 : (i % 2 ? -1 : 1), anda: llega > 0 && llega < 1, salto: pulso(t, rest + 0.1 * i, 0.5, 4) + (i === 1 ? pulso(t, viaje, 0.4, 2) : 0), habla: i === 0 && t > sell && t < sell + 1.2 && Math.sin(t * 8) > 0 }); });
  R.buf.set(b.subarray(BORDE * 320), BORDE * 320);
  // la llama de la vela
  const fl = Math.round(Math.sin(t * 13) + Math.sin(t * 7.3)); R.halo(303, 96, 14, [hex('#5a2a14'), hex('#8a4a1c'), hex('#c87a2a')], 0.9);
  R.disco(303 + (fl > 0 ? 1 : 0), 98, 2, hex('#f8a830')); R.rect(303, 94 - (fl > 1 ? 1 : 0), 303, 97, hex('#fff4b0')); R.pset(303, 101, K);
  // el folleto: cerrado (portada con el sol y la locomotiva), se abre en tres hojas
  const xa = 140, xb = 184, y0 = 98, y1 = 156, ab = P3 + 0.55;
  const wl = Math.round(44 * ez(tramo(t, ab, ab + 0.5))), wr = Math.round(44 * ez(tramo(t, ab + 0.18, ab + 0.68)));
  R.rect(xa - wl + 3, y0 + 3, xb + wr + 3, y1 + 3, mez(hex('#3a160c'), K, 0.4));
  fondoPapel(xa - wl, y0, xb + wr, y1);
  if (wl === 0) {
    for (let a = 0; a < 16; a++) { const an = a / 16 * 6.2832; if (a % 2) R.poligono([[162, 124], [162 + Math.cos(an) * 30, 124 + Math.sin(an) * 30], [162 + Math.cos(an + 0.39) * 30, 124 + Math.sin(an + 0.39) * 30]], hex('#f8d870')); }
    R.recorte(null); R.rect(xa - 1, y0 - 1, xa, y1 + 1, K); R.rect(xb, y0 - 1, xb + 1, y1 + 1, K);
    R.disco(162, 126, 12, K); R.disco(162, 126, 11, hex('#e8b030')); R.disco(162, 126, 7, hex('#c8901c')); R.disco(162, 126, 4, hex('#fff8d8')); R.rect(158, 108, 166, 114, K); R.rect(159, 109, 165, 114, hex('#e8b030'));
    R.poligono([[148, 140], [176, 140], [170, 150], [154, 150]], K); R.poligono([[150, 141], [174, 141], [169, 149], [155, 149]], hex('#c8901c'));
    flor(146, 104); flor(178, 104); flor(146, 150); flor(178, 150);
  } else {
    R.recorte([xa - wl + 2, y0 + 2, xb + wr - 2, y1 - 2]); dentro(t, 98, y0 + 2, 226, y1 - 2); R.recorte(null);
    for (const sx of [xa, xb]) { R.rect(sx, y0, sx, y1, mez(hex('#f6ecc8'), K, 0.45)); R.rect(sx + 1, y0, sx + 1, y1, hex('#fffaf0')); }
    if (wl < 44) R.rect(xa - wl, y0, xa - wl + 1, y1, hex('#d8c8a0'));
  }
  // motas de polvo en la luz de la vela
  for (let k = 0; k < 10; k++) { const x = Math.round(250 + hh(k, 1, 30) * 60 + Math.sin(t * 0.6 + k) * 5), y = Math.round(80 + hh(k, 2, 30) * 40 + Math.sin(t * 0.4 + k * 2) * 4); if (Math.sin(t * 2 + k) > 0.2) R.pset(x, y, hex('#f8d8a0')); }
};
const efectos = [[amb - 0.55, 'whoosh'], [amb, 'pop'], [grim, 'pop'], [manny, 'boing'], [P3 + 0.3, 'papel'], [sell + 0.1, 'silbato'], [rest, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { cartela: '1998', efectos, año: 1998 });
''')

E['la-muertos'] = ('La Tierra de los Muertos', '''// LA-MUERTOS (frases 39–40), 1998. Cuatro planos:
// 1. (0 → «art deco») el altar de muertos de cerca: la abuela esqueleto trae una vela y la deja delante del altar en
//    «Day of the Dead», y se enciende; un niño esqueleto llega con cempasúchil y echa pétalos en «Aztec».
// 2. («art deco» → «and his characters») el collage de papel recortado que se monta (fondo local): junto a la calavera
//    de azúcar sube la pirámide azteca, en «skyscrapers» el rascacielos art déco, en «film noir» cae un fotograma de cine
//    negro con su farola y su lluvia, y en «1940s» un sombrero de fieltro cae sobre la calavera de azúcar.
// 3. («and his characters» → «the story») calle de cine negro bajo la lluvia (fondo local): el agente llega con su
//    paraguas y se para ante el escaparate de calacas de papel maché en «calacas»; en «skeletons» él y la calaca de traje
//    del escaparate dan el mismo saltito; un coche negro de los cuarenta pasa por delante y él sigue su camino.
// 4. («the story» → fin) el calendario de cuatro hojas de cerca: en «four» el niño enciende la primera vela de cuatro;
//    en «each», «place» y «day» pasan las hojas de cuatro Días de Muertos y enciende una vela con cada una; el agente
//    mira y celebra cada hoja.''', AYUDA + r'''
const Z = (f) => en('mezcla', f), A = (f) => en('anios', f);
const P2 = Z(0.28), P3 = Z(0.645), P4 = A(0) - 0.15;
const dia = Z(0.11), azteca = Z(0.194), deco = Z(0.297), rasca = Z(0.331), film = Z(0.435), noir = Z(0.458), cuarenta = Z(0.511);
const calacas = Z(0.734), papel = Z(0.827), esqueletos = Z(0.89);
const cuatro = A(0.152), cada = A(0.416), sitio = A(0.535), diaM = A(0.8);
const p1 = (t) => {
  T.muertos(R, t, { encuadre: 'ciudad', camara: 'altar' });
  // la abuela con la vela
  const u = tramo(t, 0, dia - 0.15), xa = Math.round(lerp(4, 58, ez(u))), deja = t > dia;
  const ga = T.calaca(R, xa, 168, t, { ropa: 'vestido', color: hex('#7a3a9a'), dir: 1, anda: u > 0 && u < 1, habla: t > dia + 0.5 && t < dia + 1.6 && Math.sin(t * 6) > 0 });
  const vx = deja ? 72 : ga.mano[0] + 1, vy = deja ? 167 : ga.mano[1] + 2;
  R.rect(vx - 2, vy - 8, vx + 1, vy, K); R.rect(vx - 1, vy - 7, vx, vy, hex('#f6eedc')); R.rect(vx - 3, vy, vx + 2, vy + 1, hex('#c8a040'));
  const enc = tramo(t, dia + 0.15, dia + 0.5);
  if (enc > 0) { R.halo(vx, vy - 10, 6 + enc * 8, [hex('#5a2a3a'), hex('#a85a3a'), hex('#e8a040')], 0.9); const fl = Math.sin(t * 13) > 0 ? 1 : 0; R.disco(vx - 0.5 + fl * 0.5, vy - 10, 1.6, hex('#f8a830')); R.pset(vx - 1, vy - 12, hex('#fff4b0')); }
  // el niño con el ramo de cempasúchil que echa pétalos
  const v = tramo(t, 0.3, azteca - 0.2), xn = Math.round(lerp(334, 256, ez(v)));
  const gn = T.calaca(R, xn, 168, t, { ropa: 'chaqueta', color: hex('#2a8ab8'), dir: -1, anda: v > 0 && v < 1, salto: pulso(t, azteca - 0.1, 0.4, 3) });
  for (let k = 0; k < 7; k++) flor(gn.mano[0] - 2 + (k % 3) * 2, gn.mano[1] - 3 + Math.floor(k / 3) * 2);
  if (t > azteca) for (let k = 0; k < 14; k++) { const s = t - azteca - k * 0.04; if (s < 0) continue; const x = gn.mano[0] - s * (18 + (k % 4) * 6), y = Math.min(167, gn.mano[1] - 6 + s * (-14 + s * 40) + (k % 3));
    R.pset(Math.round(x), Math.round(y), CEMPA[1 + (k % 3)]); }
  petalos(t, 10, 80, 240, 40, 168, 5);
};
// el collage: papel kraft con un sol art déco detrás y el papel picado arriba
const fondoCollage = () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const fib = hh(x >> 1, y, 40) * 0.12 + (hh(x, y >> 2, 41) > 0.93 ? 0.12 : 0);
    R.pset(x, y, mez(hex('#d8b47a'), hex('#a8804a'), fib + Math.hypot(x - 160, y - 100) / 900)); }
  for (let a = 0; a < 24; a++) if (a % 2) { const a0 = a / 24 * 6.2832, a1 = (a + 1) / 24 * 6.2832; R.poligono([[160, 120], [160 + Math.cos(a0) * 260, 120 + Math.sin(a0) * 260], [160 + Math.cos(a1) * 260, 120 + Math.sin(a1) * 260]], (x, y) => mez(hex('#e4c48a'), hex('#d8b47a'), hh(x, y, 42) * 0.5)); }
  // tiras de papel rasgado en los bordes
  for (let x = 0; x < 320; x++) { const r = Math.round(hh(x >> 2, 1, 43) * 4); R.rect(x, 164 + r, x, 179, hex('#7a1e3a')); R.pset(x, 164 + r, hex('#f6eedc')); R.rect(x, 170 + r, x, 172 + r, hex('#c83a6a')); }
  for (let k = 0; k < 40; k++) R.pset(Math.round(hh(k, 1, 44) * 320), 174 + Math.round(hh(k, 2, 44) * 5), hex('#f0a020'));
  // la luna de papel plateado con estrellas recortadas, el billete de tren pegado y flores de papel
  R.disco(41, 61, 15, mez(hex('#6a4a2a'), K, 0.3)); R.disco(38, 58, 15, K); R.disco(38, 58, 14, hex('#e8e8f0')); R.disco(45, 54, 12, hex('#d8b47a')); R.disco(44, 55, 11, (x, y) => mez(hex('#e4c48a'), hex('#d8b47a'), hh(x, y, 42) * 0.5));
  for (let k = 0; k < 6; k++) { const x = 64 + k * 9 + (k % 2) * 3, y = 46 + (k % 3) * 9; R.pset(x, y, hex('#fff4c0')); R.pset(x - 1, y, hex('#f0c020')); R.pset(x + 1, y, hex('#f0c020')); R.pset(x, y - 1, hex('#f0c020')); R.pset(x, y + 1, hex('#f0c020')); }
  for (const [x, y, w, h, a] of [[20, 44, 14, 5, 1], [52, 72, 14, 5, -1]]) R.poligono([[x, y], [x + w, y + a * 3], [x + w, y + h + a * 3], [x, y + h]], hex('#f0e6b8'));
  R.poligono([[232, 154], [282, 150], [284, 162], [234, 166]], K); R.poligono([[233, 155], [281, 151], [283, 161], [235, 165]], hex('#f6ecc8')); R.poligono([[234, 156], [244, 155], [246, 164], [236, 165]], hex('#e0a030'));
  R.rect(250, 156, 262, 158, hex('#c8a040')); R.rect(250, 160, 270, 160, hex('#b8a888'));
  for (const [x, y] of [[112, 150], [120, 154], [8, 150], [296, 120], [292, 128]]) { for (let k = 0; k < 7; k++) { const an = k * 0.9; R.disco(x + Math.cos(an) * 3, y + Math.sin(an) * 3, 2, k % 2 ? hex('#e0841a') : hex('#f8b030')); } R.disco(x, y, 1.5, hex('#9a4a0c')); }
};
const sombra = (pts) => R.poligono(pts.map(([x, y]) => [x + 3, y + 3]), mez(hex('#6a4a2a'), K, 0.3));
const piramide = (x0, base, dy) => {
  const b = base + dy; const esc = [[0, 104], [8, 96], [16, 88], [24, 80], [32, 72]];
  sombra([[x0, b], [x0 + 104, b], [x0 + 70, b - 48], [x0 + 34, b - 48]]);
  esc.forEach(([m, w], i) => { const y = b - i * 9; R.rect(x0 + m - 1, y - 10, x0 + m + w + 1, y, K); R.rect(x0 + m, y - 9, x0 + m + w, y - 1, i % 2 ? hex('#c8a060') : hex('#b88a4a'));
    R.rect(x0 + m, y - 9, x0 + m + w, y - 9, hex('#f0d8a0')); for (let x = x0 + m + 2; x < x0 + m + w; x += 6) R.rect(x, y - 6, x + 2, y - 4, i % 2 ? hex('#3aa8a0') : hex('#c83a3a')); });
  R.rect(x0 + 44, b - 45, x0 + 60, b, K); R.rect(x0 + 45, b - 44, x0 + 59, b - 1, hex('#e8d0a0')); for (let y = b - 44; y < b; y += 3) R.rect(x0 + 45, y, x0 + 59, y, hex('#a8804a'));
  R.rect(x0 + 38, b - 62, x0 + 66, b - 45, K); R.rect(x0 + 39, b - 61, x0 + 65, b - 46, hex('#c84a3a')); R.rect(x0 + 47, b - 56, x0 + 57, b - 46, K); R.rect(x0 + 39, b - 61, x0 + 65, b - 59, hex('#3aa8a0'));
  for (let x = x0 + 40; x < x0 + 65; x += 4) R.rect(x, b - 66, x + 1, b - 62, hex('#e8d0a0'));
};
const rascacielos = (x0, base, dy) => {
  const b = base + dy; const T3 = [[0, 48, 70], [6, 36, 100], [12, 24, 122]];
  sombra([[x0, b], [x0 + 48, b], [x0 + 48, b - 70], [x0 + 24, b - 136], [x0, b - 70]]);
  T3.forEach(([m, w, h]) => { R.rect(x0 + m - 1, b - h - 1, x0 + m + w + 1, b, K); for (let x = x0 + m; x <= x0 + m + w; x++) R.rect(x, b - h, x, b - 1, (x - x0 - m) % 6 === 0 ? hex('#8a7a5a') : (x - x0 - m) < 3 ? hex('#f0e6c8') : hex('#d8c8a0'));
    R.rect(x0 + m, b - h, x0 + m + w, b - h + 1, hex('#c8a040')); });
  for (let y = b - 118; y < b - 4; y += 5) for (let x = x0 + 2; x < x0 + 46; x += 6) { const dentro = (x > x0 + 6 && x < x0 + 42) || y > b - 70; if (!dentro || (y < b - 100 && (x < x0 + 13 || x > x0 + 35))) continue; R.rect(x + 1, y, x + 3, y + 2, hh(x, y, 45) > 0.4 ? hex('#f8d870') : hex('#3a3a5a')); }
  for (let a = 0; a < 7; a++) { const an = Math.PI + (a + 0.5) / 7 * Math.PI; R.linea(x0 + 24, b - 122, x0 + 24 + Math.cos(an) * 11, b - 122 + Math.sin(an) * 11, hex('#c8a040')); }
  R.rect(x0 + 23, b - 140, x0 + 25, b - 122, K); R.rect(x0 + 24, b - 140, x0 + 24, b - 122, hex('#f0d878'));
};
const calaveraAzucar = (cx, cy, sal) => {
  const y = cy - sal;
  R.disco(cx + 3, y + 3, 24, mez(hex('#6a4a2a'), K, 0.3));
  R.disco(cx, y, 24, K); R.disco(cx, y, 23, hex('#fbf6ea')); R.rect(cx - 14, y + 14, cx + 14, y + 26, K); R.rect(cx - 13, y + 14, cx + 13, y + 25, hex('#fbf6ea'));
  R.disco(cx - 7, y - 8, 9, hex('#ffffff'));
  for (const s of [-1, 1]) { R.disco(cx + s * 10, y + 2, 8, hex('#e8488a')); R.disco(cx + s * 10, y + 2, 6, K); R.disco(cx + s * 10, y + 2, 4, hex('#2a8ae8')); R.pset(cx + s * 10 - 2, y, hex('#ffffff'));
    for (let k = 0; k < 8; k++) { const a = k * 0.785; R.pset(Math.round(cx + s * 10 + Math.cos(a) * 9), Math.round(y + 2 + Math.sin(a) * 9), k % 2 ? hex('#f0c020') : hex('#3ab84a')); } }
  R.poligono([[cx - 3, y + 10], [cx + 3, y + 10], [cx, y + 15]], hex('#c83a3a'));
  for (let i = -3; i <= 3; i++) { R.rect(cx + i * 4 - 1, y + 17, cx + i * 4 + 1, y + 23, hex('#ffffff')); R.rect(cx + i * 4 + 2, y + 17, cx + i * 4 + 2, y + 23, K); R.pset(cx + i * 4, y + 19, [hex('#e8488a'), hex('#3ab84a'), hex('#2a8ae8')][(i + 3) % 3]); }
  for (let k = 0; k < 5; k++) flor(cx - 8 + k * 4, y - 17 + (k % 2) * 2);
  for (let k = 0; k < 10; k++) { const a = Math.PI + k / 9 * Math.PI; R.pset(Math.round(cx + Math.cos(a) * 19), Math.round(y - 2 + Math.sin(a) * 15), hex('#3aa8a0')); }
  for (const s of [-1, 1]) for (let k = 0; k < 4; k++) R.pset(cx + s * (16 + k), y + 10 + k * 2, hex('#e8488a'));
};
const p2 = (t) => {
  fijo('collage', fondoCollage);
  // el papel picado que se mece (por debajo de la barra del año, antes de la zona de Atom)
  for (let k = 0; k < 13; k++) { const x = 6 + k * 20, sw = Math.round(Math.sin(t * 2.2 + k * 0.7) * 1.5), y = 20 + Math.round(Math.sin(k / 12 * Math.PI) * 4), c = [hex('#e8488a'), hex('#f0c020'), hex('#3ab84a'), hex('#2a8ae8'), hex('#a83ac8')][k % 5];
    R.linea(x - 10, y - 2, x + 10, y - 2, hex('#3a2416')); R.poligono([[x - 7, y - 1], [x + 7, y - 1], [x + 7 + sw, y + 13], [x - 7 + sw, y + 13]], c);
    R.rect(x - 3 + sw, y + 3, x - 2 + sw, y + 4, hex('#d8b47a')); R.rect(x + 2 + sw, y + 3, x + 3 + sw, y + 4, hex('#d8b47a')); R.rect(x - 1 + sw, y + 8, x + 1 + sw, y + 9, hex('#d8b47a'));
    for (let i = -6; i <= 6; i += 3) R.pset(x + i + sw, y + 13, hex('#d8b47a')); }
  const up = (a, d = 0.5) => Math.round((1 - ez(tramo(t, a, a + d))) * 140);
  // el fotograma de cine negro con su farola, su niebla y su lluvia
  const fv = tramo(t, film - 0.3, film + 0.15), fx = Math.round(lerp(330, 210, ez(fv)));
  if (fv > 0) {
    const x0 = fx, y0 = 52, x1 = fx + 66, y1 = 150;
    R.rect(x0 + 3, y0 + 3, x1 + 3, y1 + 3, mez(hex('#6a4a2a'), K, 0.3)); R.rect(x0, y0, x1, y1, hex('#141418'));
    for (let y = y0 + 2; y < y1; y += 6) { R.rect(x0 + 2, y, x0 + 4, y + 3, hex('#d8d8d0')); R.rect(x1 - 4, y, x1 - 2, y + 3, hex('#d8d8d0')); }
    R.recorte([x0 + 7, y0 + 2, x1 - 7, y1 - 2]);
    for (let y = y0 + 2; y <= y1 - 2; y++) for (let x = x0 + 7; x <= x1 - 7; x++) R.pset(x, y, mez(hex('#2a2a32'), hex('#6a6a70'), (y - y0) / 160 + hh(x, y + Math.floor(t * 12), 46) * 0.08));
    for (let k = 0; k < 4; k++) { const bx = x0 + 8 + k * 14, bt = y0 + 20 + (k % 2) * 10; R.poligono([[bx, y1], [bx, bt], [bx + 12, bt], [bx + 12, y1]], hex('#18181e')); for (let y = bt + 3; y < y1 - 30; y += 5) if (hh(k, y, 47) > 0.5) R.rect(bx + 3, y, bx + 4, y + 1, hex('#c8c8b0')); }
    R.rect(x0 + 7, y1 - 22, x1 - 7, y1 - 2, hex('#3a3a40'));
    const lv = tramo(t, noir - 0.1, noir + 0.25), lx = x0 + 40, ly = Math.round(lerp(y0 - 30, y0 + 22, ez(lv)));
    if (lv > 0) { R.poligono([[lx - 2, ly + 6], [lx + 2, ly + 6], [lx + 22, y1 - 2], [lx - 22, y1 - 2]], (x, y) => ((x + y) % 2 === 0 ? hex('#8a8a80') : hex('#5a5a58')));
      R.rect(lx - 1, ly + 6, lx + 1, y1 - 2, K); R.rect(lx - 4, y1 - 6, lx + 4, y1 - 2, K); R.rect(lx - 5, ly - 2, lx + 5, ly + 6, K); R.rect(lx - 3, ly, lx + 3, ly + 5, hex('#fffbe0')); R.rect(lx - 3, ly - 4, lx + 3, ly - 2, K); }
    if (t > noir) { for (let k = 0; k < 40; k++) { const x = x0 + 7 + ((k * 13 + Math.floor(t * 40) * 3) % 54), y = y0 + ((k * 29 + t * 160) % 96); R.linea(x, y, x - 1, y + 4, hex('#a8a8b0')); }
      for (let k = 0; k < 3; k++) { const fxk = x0 + 10 + ((t * 8 + k * 20) % 50); R.disco(fxk, y1 - 24 + k * 3, 6, (x, y) => ((x + y) % 2 ? hex('#8a8a90') : hex('#2a2a32'))); }
      // la silueta de sombrero bajo la farola
      R.rect(lx + 8, y1 - 26, lx + 14, y1 - 6, K); R.disco(lx + 11, y1 - 30, 3, K); R.rect(lx + 6, y1 - 33, lx + 16, y1 - 32, K); R.rect(lx + 8, y1 - 36, lx + 14, y1 - 33, K); }
    R.recorte(null);
  }
  // la pirámide azteca y el rascacielos art déco que suben
  piramide(14, 158, up(P2 + 0.2, 0.5));
  rascacielos(120, 158, up(deco - 0.1, 0.55));
  // la calavera de azúcar delante, y el sombrero de fieltro que le cae en «1940s»
  const sal = Math.max(0, Math.round(Math.sin(t * 3) * 1.5)) + pulso(t, cuarenta + 0.3, 0.35, 3);
  calaveraAzucar(174, 130, sal);
  const sv = tramo(t, cuarenta - 0.1, cuarenta + 0.3), sy = Math.round(lerp(-20, 106 - sal, ez(sv)));
  if (sv > 0) { R.rect(156, sy - 1, 194, sy + 3, K); R.rect(157, sy, 193, sy + 2, hex('#3a3a4a')); R.rect(162, sy - 12, 188, sy, K); R.rect(163, sy - 11, 187, sy - 1, hex('#4a4a5a')); R.rect(163, sy - 5, 187, sy - 3, hex('#c83a3a')); R.rect(163, sy - 11, 166, sy - 1, hex('#6a6a7a')); R.rect(172, sy - 12, 178, sy - 11, hex('#2a2a3a')); }
  petalos(t, 12, 10, 270, 40, 162, 7);
};
// la calle de cine negro bajo la lluvia, con el escaparate de calacas de papel maché
const fondoCalle = () => {
  for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) R.pset(x, y, mez(hex('#10142a'), hex('#2e2a4e'), y / 150 + (hh(x, y, 50) - 0.5) * 0.1));
  // la ciudad lejana art déco con ventanas
  for (let k = 0; k < 11; k++) { const bx = 150 + k * 16, top = (bx > 268 ? 52 : 26) + Math.round(hh(k, 1, 51) * 26); R.rect(bx, top, bx + 14, 140, hex('#1c1a34')); R.rect(bx + 6, top - 6, bx + 8, top, hex('#1c1a34'));
    for (let y = top + 3; y < 132; y += 4) for (let x = bx + 2; x < bx + 13; x += 3) if (hh(x, y, 52) > 0.72) R.pset(x, y, hex('#f8d070')); }
  // el edificio de la derecha con su portal y su letrero de neón
  R.rect(212, 62, 319, 140, hex('#2a2440')); for (let y = 66; y < 140; y += 6) R.rect(212, y, 319, y, hex('#22203a'));
  for (let x = 228; x < 319; x += 22) { R.rect(x, 70, x + 10, 92, K); R.rect(x + 1, 71, x + 9, 91, hh(x, 1, 53) > 0.4 ? hex('#e8a848') : hex('#3a3a5a')); R.rect(x + 5, 71, x + 5, 91, K); }
  R.rect(250, 104, 278, 140, K); R.rect(252, 106, 276, 140, hex('#5a3a2a')); R.rect(263, 106, 264, 140, K);
  // la tienda de la izquierda: ladrillo, cornisa art déco, toldo de rayas, escaparate y puerta
  for (let y = 30; y < 140; y++) for (let x = 0; x < 160; x++) { const fila = Math.floor((y - 30) / 5), junta = (y - 30) % 5 === 4 || (x + (fila % 2) * 6) % 12 === 0;
    R.pset(x, y, junta ? hex('#4a2a2a') : mez(hex('#7a3030'), hex('#9a4a3a'), hh(x >> 2, fila, 54) * 0.6)); }
  R.rect(0, 28, 160, 33, K); R.rect(0, 29, 160, 31, hex('#c8a84a')); for (let x = 4; x < 160; x += 10) R.poligono([[x, 33], [x + 5, 38], [x + 10, 33]], hex('#a8842e'));
  // el letrero tallado: una calavera con dos flores
  R.disco(80, 44, 6, K); R.disco(80, 44, 5, hex('#f2eee2')); R.rect(77, 43, 78, 44, K); R.rect(82, 43, 83, 44, K); flor(68, 44); flor(92, 44);
  R.rect(14, 64, 142, 132, K);
  R.rect(140, 70, 158, 140, K); R.rect(142, 72, 156, 140, hex('#3a2016')); R.rect(144, 76, 154, 100, hex('#e8b060')); R.rect(149, 76, 149, 100, K); R.pset(154, 118, hex('#e8c040'));
  // la acera mojada y la calzada
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c = y < 158 ? mez(hex('#3a3848'), hex('#4a4a5a'), hh(x >> 3, y >> 2, 55) * 0.5) : mez(hex('#16161e'), hex('#24242e'), hh(x, y, 56) * 0.6);
    if (y < 158 && ((x + (y >> 3) * 7) % 22 === 0 || y % 8 === 0)) c = hex('#2a2836');
    if (y >= 158 && y < 161) c = hex('#6a6a7a');
    R.pset(x, y, c); }
  // los reflejos del escaparate y de las ventanas en el suelo mojado
  for (let x = 16; x < 142; x += 2) for (let y = 142; y < 178; y++) if (hh(x, y, 57) < 0.5 - (y - 142) / 90) R.pset(x, y, mez(R.pget(x, y), hex('#e8a040'), 0.45));
  for (const [cx, cy, rx] of [[60, 166, 18], [240, 170, 24], [180, 150, 10]]) for (let y = -3; y <= 3; y++) for (let x = -rx; x <= rx; x++) if ((x * x) / (rx * rx) + (y * y) / 9 <= 1) R.pset(cx + x, cy + y, mez(hex('#2a2c48'), hex('#5a5a8a'), hh(x, y, 58) * 0.3));
};
const escaparate = (t) => {
  R.recorte([15, 65, 141, 131]);
  for (let y = 65; y <= 131; y++) for (let x = 15; x <= 141; x += 1) R.pset(x, y, mez(hex('#f8c878'), hex('#b8602a'), (y - 65) / 70 + (((x >> 3) + (y >> 3)) % 2) * 0.06));
  for (let k = 0; k < 12; k++) { const x = 18 + k * 10, c = [hex('#e8488a'), hex('#3ab84a'), hex('#2a8ae8'), hex('#a83ac8')][k % 4]; R.poligono([[x, 66], [x + 8, 66], [x + 8 + Math.sin(t * 2 + k), 74], [x + Math.sin(t * 2 + k), 74]], c); R.pset(x + 4, 69, hex('#f8c878')); }
  for (const ys of [99, 127]) { R.rect(15, ys, 141, ys + 2, hex('#5a3418')); R.rect(15, ys, 141, ys, hex('#8a5a2a')); }
  // las calacas de papel maché, que cabecean en sus muelles
  const fig = [[32, 99, { ropa: 'vestido', color: hex('#e8488a') }], [58, 99, { ropa: 'traje' }], [94, 99, { ropa: 'chaqueta', color: hex('#2a8ae8'), sombrero: true }], [122, 99, { ropa: 'vestido', color: hex('#f0c020') }], [104, 127, { ropa: 'chaqueta', color: hex('#3ab84a') }]];
  fig.forEach(([x, y, o], i) => T.calaca(R, x, y, t + i * 0.7, { ...o, dir: i % 2 ? -1 : 1, salto: Math.max(0, Math.round(Math.sin(t * 3 + i * 1.3) * 1.5)) + (i === 1 ? pulso(t, esqueletos, 0.5, 4) : 0) }));
  for (let k = 0; k < 4; k++) { const x = 24 + k * 14; R.disco(x, 122, 5, K); R.disco(x, 122, 4, hex('#fbf6ea')); R.pset(x - 2, 121, hex('#e8488a')); R.pset(x + 2, 121, hex('#2a8ae8')); R.pset(x, 125, K); flor(x, 117); }
  // el reflejo del cristal y las gotas que resbalan
  for (let k = 0; k < 3; k++) R.poligono([[30 + k * 44, 65], [40 + k * 44, 65], [10 + k * 44, 131], [0 + k * 44, 131]], (x, y) => ((x + y) % 3 === 0 ? hex('#fff0d0') : R.pget(x, y)));
  for (let k = 0; k < 14; k++) { const x = 18 + Math.round(hh(k, 1, 60) * 120), y = 66 + ((t * (6 + k % 5) + hh(k, 2, 60) * 70) % 66); R.pset(x, Math.round(y), hex('#fff8e8')); R.pset(x, Math.round(y) - 1, hex('#f0d8b0')); }
  R.recorte(null);
  R.rect(77, 64, 79, 132, K); R.rect(14, 64, 142, 64, K); R.rect(12, 132, 144, 134, hex('#5a3418'));
};
const lluvia = (t, n, sem) => { for (let k = 0; k < n; k++) { const x = Math.round(((hh(k, 1, sem) * 340 + t * 30) % 340) - 10), y = Math.round((hh(k, 2, sem) * 190 + t * (150 + (k % 3) * 30)) % 190) - 10;
  if ((x > 270 && y < 50) || (x > 16 && x < 174 && y < 18)) continue; R.linea(x, y, x - 1, y + 4, (k % 3) ? hex('#7a7aa0') : hex('#b8b8d8')); } };
const sedan = (x, suelo) => {
  const y = suelo; R.poligono([[x, y - 8], [x + 8, y - 15], [x + 22, y - 16], [x + 30, y - 25], [x + 52, y - 25], [x + 60, y - 15], [x + 72, y - 13], [x + 74, y - 6], [x, y - 4]], K);
  R.poligono([[x + 2, y - 8], [x + 9, y - 14], [x + 23, y - 15], [x + 31, y - 23], [x + 51, y - 23], [x + 59, y - 14], [x + 71, y - 12], [x + 72, y - 6], [x + 2, y - 5]], hex('#1e1e2a'));
  R.linea(x + 9, y - 13, x + 70, y - 12, hex('#5a5a7a')); R.poligono([[x + 33, y - 22], [x + 40, y - 22], [x + 40, y - 16], [x + 28, y - 16]], hex('#3a4a6a')); R.poligono([[x + 42, y - 22], [x + 50, y - 22], [x + 56, y - 16], [x + 42, y - 16]], hex('#3a4a6a'));
  for (const wx of [x + 14, x + 58]) { R.disco(wx, y - 3, 5, K); R.disco(wx, y - 3, 3.5, hex('#e8e8e0')); R.disco(wx, y - 3, 2, hex('#2a2a2a')); }
  R.rect(x, y - 10, x + 2, y - 8, hex('#fff8c8')); R.rect(x + 71, y - 10, x + 73, y - 9, hex('#c83a3a'));
  R.poligono([[x, y - 10], [x - 40, y - 16], [x - 40, y - 2], [x, y - 8]], (px, py) => ((px + py) % 2 ? mez(R.pget(px, py), hex('#fff0b0'), 0.4) : R.pget(px, py)));
};
const p3 = (t) => {
  fijo('calle', fondoCalle);
  // las nubes de lluvia a tres velocidades (lejos de la zona de Atom)
  for (let c = 0; c < 3; c++) for (let k = 0; k < 4; k++) { const x = ((k * 90 + t * (3 + c * 3)) % 380) - 40, y = 10 + c * 9 + (k % 2) * 4; if (x > 250) continue; R.disco(x, y, 9 - c, [hex('#2a2a48'), hex('#34345a'), hex('#42426a')][c]); R.disco(x + 10, y + 2, 7 - c, [hex('#2a2a48'), hex('#34345a'), hex('#42426a')][c]); }
  for (let k = 0; k < 6; k++) if (Math.sin(t * (0.7 + k * 0.3) + k) > 0.6) R.pset(160 + k * 17, 40 + (k % 3) * 9, hex('#f8d070'));
  // el neón que parpadea (una estrella y una calavera)
  const neon = Math.sin(t * 9) > -0.7 || Math.floor(t * 3) % 4; const nc = neon ? hex('#ff6ac8') : hex('#5a2a4a');
  for (let a = 0; a < 5; a++) { const an = a / 5 * 6.2832 - 1.57; R.linea(238, 112, 238 + Math.cos(an) * 7, 112 + Math.sin(an) * 7, nc); }
  R.anillo(292, 112, 6, neon ? hex('#6af0ff') : hex('#2a4a5a')); R.pset(290, 111, nc); R.pset(294, 111, nc);
  escaparate(t);
  // el toldo de rayas con sus goteras
  for (let x = 8; x < 150; x++) { const c = Math.floor((x - 8) / 8) % 2 ? hex('#f2e6c8') : hex('#c83a3a'); R.rect(x, 50 + Math.round((x - 8) / 40), x, 61, c); R.pset(x, 62 + (((x - 8) % 8) < 4 ? 1 : 0), c); }
  R.rect(8, 49, 150, 50, K);
  for (let k = 0; k < 6; k++) { const x = 14 + k * 24, s = (t * 1.1 + k * 0.37) % 1; R.pset(x, Math.round(63 + s * 86), hex('#c8d8f8')); if (s > 0.95) { R.pset(x - 1, 148, hex('#c8d8f8')); R.pset(x + 1, 148, hex('#c8d8f8')); } }
  // el gato negro sobre el toldo
  const cola = Math.round(Math.sin(t * 3) * 2); R.rect(124, 44, 130, 48, K); R.rect(122, 41, 126, 45, K); R.pset(122, 40, K); R.pset(125, 40, K); R.pset(123, 43, hex('#f0e040')); R.linea(130, 47, 133, 42 + cola, K);
  // la farola art déco con su cono de luz
  R.rect(196, 46, 198, 152, K); R.rect(197, 46, 197, 152, hex('#4a4a5a')); R.rect(192, 148, 202, 152, K);
  R.halo(197, 40, 30, [hex('#2a2a4a'), hex('#4a4060'), hex('#8a7a6a')], 0.8);
  R.poligono([[193, 46], [201, 46], [222, 152], [172, 152]], (x, y) => ((x + y) % 2 === 0 && hh(x, y, 61) > 0.35 ? mez(R.pget(x, y), hex('#f8e0a0'), 0.25) : R.pget(x, y)));
  R.rect(191, 30, 203, 32, K); R.rect(192, 33, 202, 44, K); R.rect(194, 34, 200, 43, hex('#fff4c0')); R.rect(197, 34, 197, 43, hex('#e8c060')); R.rect(194, 26, 200, 29, K); R.rect(196, 22, 198, 25, K);
  // las ondas en los charcos
  for (let k = 0; k < 6; k++) { const s = (t * 1.3 + k * 0.29) % 1, cx = [60, 70, 232, 248, 180, 54][k], cy = [166, 168, 170, 171, 150, 165][k]; const r = 1 + s * 6;
    for (let a = 0; a < 16; a++) { const an = a / 16 * 6.2832; R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r * 0.35), mez(hex('#8a8ab8'), hex('#2a2c48'), s)); } }
  // el agente con su paraguas: llega, mira el escaparate, salta a la vez que su calaca de papel y sigue su camino
  const u = tramo(t, P3 + 0.05, calacas - 0.05), w = tramo(t, esqueletos + 0.7, P4 + 0.3);
  const x = Math.round(lerp(340, 168, ez(u)) - w * 120), anda = (u > 0 && u < 1) || (w > 0 && w < 1);
  const g = T.calaca(R, x, 152, t, { dir: -1, anda, salto: pulso(t, esqueletos, 0.5, 4), habla: t > papel - 0.3 && t < esqueletos && Math.sin(t * 6) > 0 });
  const [mx, my] = g.mano, ux = mx + 1, uy = g.cabeza[1] - 20 - pulso(t, esqueletos, 0.5, 4);
  R.linea(mx, my, ux, uy, K); R.pset(mx + 1, my + 1, K);
  for (let y = 0; y <= 9; y++) { const hw = Math.round(Math.sqrt(1 - ((9 - y) / 9.5) ** 2) * 15); R.rect(ux - hw, uy + y - 9, ux + hw, uy + y - 9, y < 2 ? hex('#3a3a4a') : hex('#1c1c26')); }
  for (let k = -2; k <= 2; k++) R.linea(ux, uy - 9, ux + k * 7, uy, hex('#3a3a50')); R.rect(ux, uy - 11, ux, uy - 9, K);
  for (let k = -2; k <= 2; k++) { const s = (t * 2 + k * 0.3) % 1; if (s < 0.6) R.pset(ux + k * 7 + (k ? Math.sign(k) * 1 : 0), Math.round(uy + 1 + s * 12), hex('#b8c8f0')); }
  lluvia(t, 150, 62);
  // el coche negro de los cuarenta que pasa por delante
  const cv = tramo(t, esqueletos + 0.9, P4 - 0.2); if (cv > 0 && cv < 1) sedan(Math.round(lerp(340, -90, cv)), 178);
};
const p4 = (t) => {
  const hoja = tramo(t, cada - 0.05, cada + 0.4) + tramo(t, sitio - 0.05, sitio + 0.4) + tramo(t, diaM - 0.05, diaM + 0.4);
  T.muertos(R, t, { encuadre: 'calendario', camara: 'cerca', hoja });
  // el agente entra por la izquierda y celebra cada hoja
  const u = tramo(t, P4 + 0.05, cuatro);
  T.calaca(R, Math.round(lerp(-14, 54, ez(u))), 178, t, { dir: 1, anda: u > 0 && u < 1, salto: pulso(t, cada + 0.3, 0.45, 3) + pulso(t, sitio + 0.3, 0.45, 3) + pulso(t, diaM + 0.3, 0.45, 3), habla: t > cuatro && t < cuatro + 0.8 && Math.sin(t * 7) > 0 });
  // las cuatro velas: el niño enciende una en «four» y otra con cada hoja
  const enc = [cuatro, cada + 0.2, sitio + 0.2, diaM + 0.2], vx = [248, 262, 276, 290];
  let k = 0; for (let i = 0; i < 4; i++) if (t > enc[i] - 0.5) k = i;
  const nx = Math.round(lerp(vx[Math.max(0, k - 1)] - 6, vx[k] - 6, ez(tramo(t, enc[k] - 0.5, enc[k] - 0.15))));
  const andaN = t > enc[k] - 0.5 && t < enc[k] - 0.15 && k > 0;
  const gn = T.calaca(R, k === 0 ? Math.round(lerp(330, vx[0] - 6, ez(tramo(t, P4, cuatro - 0.15)))) : nx, 174, t, { ropa: 'chaqueta', color: hex('#2a8ab8'), dir: 1, anda: andaN || (k === 0 && t < cuatro - 0.15) });
  R.linea(gn.mano[0], gn.mano[1], gn.mano[0] + 4, gn.mano[1] - 3, hex('#e8c87a')); R.pset(gn.mano[0] + 4, gn.mano[1] - 4, hex('#f86a2a'));
  for (let i = 0; i < 4; i++) { const x = vx[i], hv = 14 - i * 2;
    if (t > enc[i]) { const fl = Math.sin(t * 13 + i) > 0 ? 1 : 0; R.halo(x, 176 - hv - 4, 16, [hex('#6a3a2a'), hex('#b8702a'), hex('#f0b048')], 0.9); }
    R.rect(x - 3, 176 - hv, x + 2, 177, K); R.rect(x - 2, 177 - hv, x + 1, 177, hex('#f6eedc')); R.rect(x - 2, 177 - hv, x - 2, 177, hex('#ffffff')); R.rect(x - 4, 177, x + 3, 179, hex('#c8a040'));
    R.rect(x, 172 - hv, x, 175 - hv, K);
    if (t > enc[i]) { const fl = Math.sin(t * 13 + i) > 0 ? 1 : 0; R.disco(x + fl * 0.5, 171 - hv, 2.4, hex('#f8a830')); R.rect(x, 168 - hv, x, 171 - hv, hex('#fff4b0')); } }
  petalos(t, 10, 10, 270, 50, 176, 9);
};
const efectos = [[dia + 0.2, 'brillo'], [P2 + 0.05, 'papel'], [deco, 'whoosh'], [noir, 'papel'], [cuarenta + 0.25, 'pop'], [P3 + 0.1, 'lluvia'], [esqueletos, 'boing'], [esqueletos + 1.1, 'coche'], [cuatro, 'brillo'], [cada, 'papel'], [diaM, 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1998 });
''')

E['la-meche'] = ('Meche, Glottis y el 3D', '''// LA-MECHE (frases 41–43), 1998. Cinco planos:
// 1. (0 → «his best friend») la ciudad de día: el agente sigue el rastro de pétalos de cempasúchil por la acera; en
//    «Meche» ella aparece al fondo, pequeña, en el portal dorado del rascacielos, y él da un respingo; en «destination»
//    ella entra en el portal y se encienden las luces.
// 2. («his best friend» → «orange») el taller: el demonio naranja saca la cabeza del motor en «Glottis» con su llave
//    inglesa y saluda al agente, que llega por la izquierda; en «huge» levanta los brazos de alegría.
// 3. («orange» → «and it was») el capó de cerca: el demonio aprieta tuercas, en «drive» arranca el motor (vapor y
//    temblor) y en «cars» levanta los brazos, feliz. Gag: el tentáculo morado llega con una calavera de azúcar de sombrero
//    y un esqueleto vendedor le pone precio; el morado se va ofendido.
// 4. («and it was» → «with 3D») la mesa del estudio: en la pantalla se despliega una cuadrícula en 3D y en «three
//    dimensions» aparece una calavera en malla que la mano hace girar con el ratón; en el último segundo coge volumen.
// 5. («with 3D» → fin) sobre la malla azul, en «characters» el agente y una clienta pasan de malla a sólido, con luz y
//    sombra de volumen; en «computer-made backgrounds» se pinta de arriba abajo, como un render, el fondo quieto de la
//    ventanilla de la agencia, detrás de ellos; el agente le da el billete y ella da un saltito.''', AYUDA + r'''
const Mc = (f) => en('meche', f), Gl = (f) => en('glottis', f), Td = (f) => en('tresd', f);
const P2 = Mc(1) + 0.2, P3 = Gl(0.53), P4 = Td(0) - 0.1, P5 = Td(0.52);
const meche = Mc(0.395), ayuda = Mc(0.762), destino = Mc(0.859);
const glottis = Gl(0.113), huge = Gl(0.3), drive = Gl(0.766), cars = Gl(0.893);
const first = Td(0.187), dims = Td(0.324), tres = Td(0.537), pers = Td(0.59), fijoT = Td(0.69), compu = Td(0.809);
// Meche, pequeña y lejos, en el portal del rascacielos
const MECHE = ['..o.f.o..', '.okkkkko.', '.kWWWWWk.', '.kWkWkWk.', '.kWWWWWk.', '..kWkWk..', '...kSk...', '..kSSSk..', '.kSSSSSk.', '.kSSSSSk.', 'kSSSSSSSk', '..kW.Wk..'];
const p1 = (t) => {
  T.muertos(R, t, { encuadre: 'ciudad', luz: 'dia', petalos: 1 });
  // el viento lleva pétalos por el rastro, hacia el portal
  for (let k = 0; k < 12; k++) { const s = (t * 0.22 + k / 12) % 1, x = lerp(0, 123, s) + Math.sin(t * 3 + k) * 2, y = lerp(170, 132, s) - Math.abs(Math.sin(t * 2 + k)) * 4; R.pset(Math.round(x), Math.round(y), CEMPA[1 + (k % 3)]); }
  // Meche en el portal: aparece en «Meche» y entra en «destination»
  const ap = tramo(t, meche - 0.2, meche + 0.2), entra = tramo(t, destino - 0.2, destino + 0.5);
  if (ap > 0) { const glow = 1 - entra * 0.5; R.halo(123, 120, 14 + 8 * glow, [hex('#e8b040'), hex('#f8d070'), hex('#fff4c0')], 1.1);
    for (let k = 0; k < 8; k++) { const an = t * 2 + k * 0.785, r = 13 + Math.sin(t * 3 + k) * 2; R.pset(Math.round(123 + Math.cos(an) * r), Math.round(118 + Math.sin(an) * r * 0.8), k % 2 ? hex('#fff8d8') : CEMPA[2]); }
    if (entra < 1) { R.recorte([110, 100, 136, 131 - Math.round(entra * 0)]); R.sprite(MECHE, 119, 119 + Math.round(entra * 2), { o: CEMPA[2], f: hex('#e8488a'), k: K, W: hex('#f6f2ea'), S: entra > 0.5 ? hex('#f8e0a0') : hex('#3a7ac8') }, false); R.recorte(null); } }
  // el agente sigue el rastro; respingo en «Meche», se para y mira en «help»
  const u = tramo(t, 0.4, meche - 0.1), v = tramo(t, meche + 0.6, ayuda), x = Math.round(lerp(-14, 62, ez(u)) + 40 * ez(v));
  T.calaca(R, x, 170, t, { dir: 1, anda: (u > 0 && u < 1) || (v > 0 && v < 1), salto: pulso(t, meche + 0.05, 0.45, 4), habla: t > ayuda && t < destino + 0.4 && Math.sin(t * 6) > 0 });
  // dos vecinas que pasean hacia la izquierda por la acera de este lado
  const w = tramo(t, 0.2, P2), xv = Math.round(lerp(336, 196, w));
  T.calaca(R, xv, 172, t, { ropa: 'vestido', color: hex('#e8a020'), dir: -1, anda: true });
  T.calaca(R, xv + 18, 172, t, { ropa: 'chaqueta', color: hex('#7a3ab8'), dir: -1, anda: true, habla: Math.sin(t * 5) > 0 });
};
const p2 = (t) => {
  T.muertos(R, t, { encuadre: 'taller' });
  const sale = t > glottis - 0.15;
  T.calaca(R, 144, 156, t, { quien: 'demonio', mete: !sale, llave: sale, brazos: t > huge && t < huge + 0.9, dir: sale && t > glottis + 0.25 ? -1 : 1, habla: sale && Math.sin(t * 6) > -0.2, salto: pulso(t, glottis - 0.15, 0.35, 3) + pulso(t, huge, 0.5, 4) });
  T.muertosDelante(R, t, { encuadre: 'taller' });
  // el agente llega por la izquierda y saluda
  const u = tramo(t, P2 + 0.1, glottis + 0.1);
  T.calaca(R, Math.round(lerp(-14, 56, ez(u))), 158, t, { dir: 1, anda: u > 0 && u < 1, habla: t > glottis + 0.3 && t < huge && Math.sin(t * 7) > 0, salto: pulso(t, huge + 0.1, 0.45, 2) });
};
const p3 = (t) => {
  const tiembla = t > drive && t < drive + 0.9 ? (Math.floor(t * 20) % 2) : 0;
  T.muertos(R, t, { encuadre: 'taller', camara: 'capo' });
  const aprieta = t < drive - 0.1, feliz = t > cars - 0.05;
  T.calaca(R, 176, 150 - tiembla, t, { quien: 'demonio', mete: aprieta, llave: !feliz, brazos: feliz, habla: !aprieta, dir: -1, salto: pulso(t, cars - 0.05, 0.5, 3) });
  T.muertosDelante(R, t, { encuadre: 'taller', camara: 'capo' });
  // el vapor del arranque
  if (t > drive && t < drive + 2.4) for (let k = 0; k < 6; k++) { const s = ((t - drive) * 0.8 + k / 6) % 1; R.disco(Math.round(110 + k * 22 + Math.sin(t * 2 + k) * 5), Math.round(118 - s * 34), 3 + s * 6, (x, y) => ((x + y) % 2 === 0 && hh(x, y, Math.floor(t * 8)) > s * 0.8 ? mez(R.pget(x, y), hex('#ffffff'), 0.55) : R.pget(x, y))); }
  // gag: el morado con su calavera de azúcar de sombrero y el vendedor que le pone precio
  const lm = tramo(t, P3 + 0.05, P3 + 0.8), va = tramo(t, cars - 0.2, cars + 0.6);
  const xm = Math.round(lerp(-16, 84, ez(lm)) - va * 120);
  const ofendido = t > drive + 0.15;
  T.tentaculo(R, xm, 178, t, { color: 'morado', accesorio: 'calavera', dir: va > 0 ? -1 : 1, anda: (lm > 0 && lm < 1) || va > 0, expresion: ofendido ? 'harto' : t > drive - 0.6 ? 'sorpresa' : 'feliz' });
  const gv = T.calaca(R, 40, 178, t, { ropa: 'chaqueta', color: hex('#c84a3a'), dir: 1, habla: t > P3 + 0.9 && t < drive + 0.2 && Math.sin(t * 7) > -0.2 });
  // la bandeja de calaveritas del vendedor y el precio que levanta
  const [bx, by] = gv.mano; R.rect(bx - 8, by, bx + 8, by + 2, K); R.rect(bx - 7, by, bx + 7, by + 1, hex('#a8743a')); for (let k = 0; k < 3; k++) { R.disco(bx - 4 + k * 5, by - 2, 2.4, hex('#fbf6ea')); R.pset(bx - 5 + k * 5, by - 2, hex('#e8488a')); R.pset(bx - 3 + k * 5, by - 2, hex('#2a8ae8')); }
  // el bocadillo del vendedor: la calavera del sombrero = $4
  const pr = tramo(t, P3 + 0.9, P3 + 1.1) * (1 - tramo(t, cars, cars + 0.2));
  if (pr > 0) { const px = 34, py = 118 - Math.round(pr * 3); R.rect(px, py, px + 44, py + 16, K); R.rect(px + 1, py + 1, px + 43, py + 15, hex('#fff6d8')); R.poligono([[px + 6, py + 16], [px + 13, py + 16], [px + 6, py + 22]], K); R.poligono([[px + 7, py + 15], [px + 12, py + 15], [px + 7, py + 20]], hex('#fff6d8'));
    R.disco(px + 9, py + 8, 5, K); R.disco(px + 9, py + 8, 4, hex('#fbf6ea')); R.pset(px + 7, py + 7, hex('#e8488a')); R.pset(px + 11, py + 7, hex('#2a8ae8')); R.pset(px + 9, py + 10, K);
    R.rect(px + 16, py + 7, px + 19, py + 7, K); R.rect(px + 16, py + 9, px + 19, py + 9, K);
    R.numero('$4', px + 32, py + 12, { centro: true, color: hex('#c83a3a') }); }
};
// la pantalla del estudio: la cuadrícula en 3D que se despliega y la calavera en malla que gira con el ratón
const rx = (t) => 280 + Math.round(Math.sin(Math.max(0, t - dims) * 2.2) * 9 * tramo(t, dims, dims + 0.4));
const CAL = (() => { const V = [], A = [];
  for (let i = 0; i <= 5; i++) { const la = -Math.PI / 2 + 0.25 + i / 5 * Math.PI * 0.72; for (let j = 0; j < 10; j++) { const lo = j / 10 * 2 * Math.PI; V.push([Math.cos(la) * Math.cos(lo), Math.sin(la) * 0.95, Math.cos(la) * Math.sin(lo)]); } }
  for (let i = 0; i <= 5; i++) for (let j = 0; j < 10; j++) { const a = i * 10 + j; A.push([a, i * 10 + (j + 1) % 10]); if (i < 5) A.push([a, a + 10]); }
  const q = V.length; for (const [x, z] of [[-0.6, 0.75], [0.6, 0.75], [0.6, 0.3], [-0.6, 0.3]]) V.push([x, 0.55, z]); for (const [x, z] of [[-0.5, 0.65], [0.5, 0.65], [0.5, 0.2], [-0.5, 0.2]]) V.push([x, 1.0, z]);
  for (let k = 0; k < 4; k++) { A.push([q + k, q + (k + 1) % 4]); A.push([q + 4 + k, q + 4 + (k + 1) % 4]); A.push([q + k, q + 4 + k]); }
  return { V, A }; })();
const pantalla = (t) => (R2, x0, y0, x1, y1) => {
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(hex('#0a1430'), hex('#1a2a5a'), (y - y0) / (y1 - y0) + (hh(x, y, 70) - 0.5) * 0.06));
  // la barra de herramientas (iconos sin letras) y el gizmo de ejes
  for (let k = 0; k < 9; k++) { const bx = x0 + 3 + k * 9; R.rect(bx, y0 + 2, bx + 6, y0 + 7, hex('#3a4a7a')); R.pset(bx + 3, y0 + 4, [hex('#f04a4a'), hex('#4af04a'), hex('#4a8af0'), hex('#f0d04a')][k % 4]); }
  const cx = Math.round((x0 + x1) / 2), hz = y0 + 26, vp = [cx, hz];
  const u = tramo(t, P4 + 0.25, first + 0.4);
  for (let k = 0; k <= 8; k++) { const yy = Math.round(hz + (y1 - hz) * ((k / 8) ** 1.8)); if (k / 8 > u) continue; R.linea(x0, yy, x1, yy, k === 8 ? hex('#6af0ff') : hex('#2a7aa8')); }
  for (let k = -10; k <= 10; k++) { const bx = cx + k * 22, f = Math.min(1, u * 1.3); R.linea(bx, y1, Math.round(lerp(bx, vp[0], f)), Math.round(lerp(y1, vp[1], f)), k === 0 ? hex('#6af0ff') : hex('#2a7aa8')); }
  const a = -0.9 + (rx(t) - 280) * 0.06 + ez(tramo(t, dims - 0.2, dims + 0.6)) * 0.9, ap = ez(tramo(t, dims - 0.2, dims + 0.3)), s = 25 * ap;
  if (s > 1) {
    const ca = Math.cos(a), sa = Math.sin(a), pr = ([x, y, z]) => { const X = x * ca - z * sa, Z = x * sa + z * ca; return [cx + X * s, hz + 10 + y * s - Z * s * 0.12, Z]; };
    const vol = tramo(t, P5 - 0.9, P5 - 0.4);
    if (vol > 0) { R.disco(cx, hz + 10, s * 1.02, (x, y, d) => { const l = 0.85 - d * 0.5 - (x - cx) / s * 0.3 - (y - hz - 10) / s * 0.3 + (hh(x, y, 71) - 0.5) * 0.2; return l > 0.7 ? hex('#fbf6ea') : l > 0.45 ? hex('#d8cfb8') : l > 0.2 ? hex('#a89a80') : hex('#6a5e50'); });
      for (const sx of [-1, 1]) { const [ex, ey] = pr([sx * 0.38, 0.05, 0.85]); R.disco(ex, ey, 3.2 * ap, K); } }
    const P = CAL.V.map(pr);
    for (const [i, j] of CAL.A) { const fr = (P[i][2] + P[j][2]) > 0; R.linea(P[i][0], P[i][1], P[j][0], P[j][1], vol > 0.5 ? (fr ? hex('#5ad8ff') : hex('#2a6a9a')) : fr ? hex('#8afcff') : hex('#3a8ac8')); }
    // las cuencas, la nariz y los dientes de la calavera (por delante, si miran hacia aquí)
    for (const sx of [-1, 1]) { const c = pr([sx * 0.36, 0.08, 0.92]); if (c[2] > -0.2) { R.disco(c[0], c[1], 5.2 * ap, K); R.disco(c[0] - 1, c[1] - 1, 1.2, hex('#8afcff')); for (let k = 0; k < 14; k++) { const an = k / 14 * 6.2832; R.pset(Math.round(c[0] + Math.cos(an) * 6 * ap), Math.round(c[1] + Math.sin(an) * 6 * ap), hex('#f0d04a')); } } }
    { const n = pr([0, 0.42, 0.98]); if (n[2] > -0.2) R.poligono([[n[0] - 2, n[1] + 2], [n[0] + 2, n[1] + 2], [n[0], n[1] - 2]], K);
      for (let k = -3; k <= 3; k++) { const d0 = pr([k * 0.1, 0.72, 0.62]), d1 = pr([k * 0.1, 0.92, 0.55]); if (d0[2] > -0.2) R.linea(d0[0], d0[1], d1[0], d1[1], hex('#f0d04a')); } }
  }
  const gx = x0 + 14, gy = y1 - 10; for (const [dx, dy, c] of [[Math.cos(a) * 8, Math.sin(a) * 3, hex('#f04a4a')], [0, -9, hex('#4af04a')], [-Math.sin(a) * 8, Math.cos(a) * 3, hex('#4a8af0')]]) R.linea(gx, gy, gx + dx, gy + dy, c);
  R.recorte(null);
};
const p4 = (t) => {
  T.estudio(R, t, { encuadre: 'oficina', camara: 'mesa', anyo: 1990, raton: false, pantalla: pantalla(t) });
  // el ratón y la mano que lo arrastra para girar la calavera
  const mx = rx(t), clic = (t > P4 + 0.2 && t < P4 + 0.35) || (t > dims && t < dims + 0.15);
  R.rect(mx, 144, mx + 11, 157, K); R.rect(mx + 1, 145, mx + 10, 156, hex('#e8e0c8')); R.rect(mx + 1, 145, mx + 10, 148, clic ? hex('#b8b0a0') : hex('#f6f0dc')); R.rect(mx + 5, 145, mx + 5, 149, K); R.rect(mx + 1, 149, mx + 10, 149, hex('#a89a80'));
  T.brazo(R, 334, 182, mx + 14, 151 + (clic ? 1 : 0), '#3e6a8a', -1, {});
};
// el fondo fijo de la ventanilla, que se pinta como un render, y los personajes que pasan de malla a sólido con volumen
const capas = [R.nuevo(), R.nuevo()];
const osc = (c) => (c & 255) + ((c >>> 8) & 255) + ((c >>> 16) & 255) < 110;
const capturar = (k, pinta) => { const cp = capas[k]; cp.fill(0); const prev = R.usar(cp); pinta(); R.usar(prev); return cp; };
// pega lo capturado con luz a la izquierda y sombra a la derecha (volumen); por debajo de la línea que revela, en malla
const pegar = (capa, bx0, by0, bx1, by1, revela, desde = 0) => {
  const B = R.buf, W = 320, ly = Math.round(lerp(by0, by1 + 1, revela));
  for (let y = Math.max(desde, by0); y <= Math.min(179, by1); y++) for (let x = Math.max(1, bx0); x <= Math.min(318, bx1); x++) {
    const c = capa[y * W + x]; if (!c) continue;
    const iz = capa[y * W + x - 1], de = capa[y * W + x + 1], ar = y > 0 ? capa[(y - 1) * W + x] : 0, ab = y < 179 ? capa[(y + 1) * W + x] : 0;
    if (y >= ly) { if (!iz || !de || !ar || !ab || (x + y) % 4 === 0) B[y * W + x] = hex('#6af0ff'); continue; }
    if (osc(c)) { B[y * W + x] = c; continue; }
    B[y * W + x] = !iz || (osc(iz) && x > 1 && !capa[y * W + x - 2]) ? mez(c, hex('#ffffff'), 0.4) : !de || osc(de) ? mez(c, K, 0.38) : ((x * 7) % 5 === 0 ? mez(c, K, 0.12) : c);
  }
  if (revela > 0 && revela < 1) for (let x = bx0; x <= bx1; x++) if (ly >= by0 && ly <= by1 && capa[ly * W + x]) B[ly * W + x] = hex('#ffffff');
};
const p5 = (t) => {
  const FR = P5 + 0.4, rv = ez(tramo(t, compu - 0.15, compu + 0.55)), ly = Math.round(rv * 180);
  const m = tramo(t, pers - 0.05, pers + 0.45), c = tramo(t, pers + 0.2, pers + 0.7);
  const cm = m > 0 ? capturar(0, () => T.calaca(R, 160, 141, t, { dir: -1, habla: t > fijoT && t < compu && Math.sin(t * 6) > -0.3, salto: pulso(t, compu + 0.9, 0.45, 2) })) : null;
  const cc = c > 0 ? capturar(1, () => { const g = T.calaca(R, 62, 178, t, { ropa: 'vestido', color: hex('#3a7ac8'), dir: 1, salto: pulso(t, compu + 0.75, 0.5, 4), habla: t > fijoT + 0.4 && t < compu - 0.2 && Math.sin(t * 7) > 0 }); folleto(g.mano[0] + 1, g.mano[1]); }) : null;
  // el fondo (quieto: un único instante) y, por encima de la línea del render, ya pintado
  if (ly > 0) {
    T.muertos(R, FR, { encuadre: 'agencia', camara: 'ventanilla' });
    if (cm) pegar(cm, 140, 100, 180, 142, m);
    T.muertosDelante(R, FR, { encuadre: 'agencia', camara: 'ventanilla' });
  }
  // por debajo de la línea, la malla azul del fondo aún sin pintar, con los personajes delante
  if (ly < 180) {
    for (let y = ly; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 16 === 0 || y % 16 === 0) ? hex('#2a6ab8') : ((x + y) % 2 ? hex('#0e1a3a') : hex('#122044')));
    // la agencia aún en malla: la ventanilla arqueada, su reja, el reloj, el mostrador y sus paneles
    R.recorte([0, ly, 319, 179]); const L = hex('#6ad8ff'), L2 = hex('#3a8ac8');
    R.linea(131, 135, 131, 66, L); R.linea(189, 135, 189, 66, L); for (let k = 0; k <= 24; k++) { const an = Math.PI + k / 24 * Math.PI; R.pset(Math.round(160 + Math.cos(an) * 29), Math.round(66 + Math.sin(an) * 22), L); }
    for (let x = 138; x < 186; x += 8) R.linea(x, 70, x, 135, L2); for (let y = 76; y < 135; y += 10) R.linea(132, y, 188, y, L2);
    R.anillo(47, 40, 10, L); R.linea(47, 40, 47, 33, L); R.linea(47, 40, 52, 42, L);
    for (let x = 4; x < 320; x += 18) R.linea(x, 0, x, 135, L2);
    R.linea(0, 136, 319, 136, L); R.linea(0, 140, 319, 140, L); for (let k = 0; k < 4; k++) { const x0 = 8 + k * 80; R.linea(x0, 146, x0 + 70, 146, L2); R.linea(x0, 146, x0, 179, L2); R.linea(x0 + 70, 146, x0 + 70, 179, L2); for (let j = 0; j <= 8; j++) { const an = Math.PI + j / 8 * Math.PI; R.pset(Math.round(x0 + 35 + Math.cos(an) * 10), Math.round(179 + Math.sin(an) * 10), L); } }
    R.anillo(290, 132, 5, L); R.recorte(null);
    if (ly > 0) { R.rect(0, ly, 319, ly + 1, hex('#bff8ff')); R.rect(0, ly + 2, 319, ly + 2, hex('#4ac8ff')); }
    if (cm) pegar(cm, 140, 100, 180, 142, m, ly + 3);
  }
  if (cc) pegar(cc, 44, 140, 82, 179, c);
};
const efectos = [[meche, 'brillo'], [destino, 'puerta'], [glottis - 0.15, 'golpecito'], [huge, 'boing'], [P3 + 1.0, 'pop'], [drive, 'arranque'], [cars, 'boing'], [P4 + 0.2, 'toc'], [dims, 'zumbido'], [pers, 'brillo'], [compu - 0.1, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 1998 });
''')
