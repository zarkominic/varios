E = {}

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['at-pong'] = ('Pong', '''// AT-PONG (frase 4), 1972 → 1981, cartela «1972». Seis planos:
// 1. el bar de California en 1972: una pareja juega al Pong, un parroquiano entra a mirar, ella marca y salta;
// 2. la pantalla de cerca, con las dos manos en los mandos: «two lines» las palas se iluminan, «ball» la pelota;
// 3. inserto, 1976: el despacho de la Warner; la mano de Atari empuja su Pong de casa, «film» gira la bobina, «music» el disco, y
//    «bought» la mano del traje azul firma;  4. el salón de 1977: el padre entra con la caja de la consola, «console» se
//    enciende la tele, el niño salta y la madre aplaude;  5. la tele de cerca con dos manos en los mandos:
//    en «cartridges» el cartucho de la consola cambia una y otra vez y la colección se amontona en la moqueta;  6. el rotafolio del despacho: columnas de
//    cartuchos apilados por año (77–82) que crecen, el directivo las señala, la línea une las cimas y en «history» sale
//    la flecha y todos celebran.''', r'''
const a = (f) => en('pong', f);
const P2 = a(0.157), P3 = a(0.324), P4 = a(0.503), P5 = a(0.697), P6 = a(0.872);
const DOS = a(0.242), BOLA = a(0.288), FILM = a(0.394), MUSIC = a(0.416), WARNER = a(0.448), FIRMA = a(0.465);
const SALE = a(0.582), CONSOLA = a(0.621), CARTUCHO = a(0.723), POCOS = a(0.775), HIST = a(0.968), GOL = 4.0;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, u) => { const A = [c1 & 255, (c1 >>> 8) & 255, (c1 >>> 16) & 255], B = [c2 & 255, (c2 >>> 8) & 255, (c2 >>> 16) & 255]; const m = A.map((v, i) => Math.round(v + (B[i] - v) * u)); return (0xff000000 | (m[2] << 16) | (m[1] << 8) | m[0]) >>> 0; };
const K = hex('#141016'), BL = hex('#f6f2e6');

// 1 · el bar de 1972
const p1 = (t) => {
  T.atari(R, t, { encuadre: 'bar72', marcador: t < GOL ? [3, 2] : [3, 3] });
  // el camarero, detrás de la barra, seca un vaso y mira la partida
  const cm = R.actor(EL.dependiente, 196, 140, t, { dir: -1, sostiene: true, sonrisa: t > GOL });
  { const [mx, my] = cm.mano, v = Math.round(Math.sin(t * 6) * 1); R.rect(mx - 3, my - 6 + v, mx + 2, my + 1 + v, K); R.rect(mx - 2, my - 5 + v, mx + 1, my + v, hex('#c8e4ec')); R.pset(mx - 2, my - 5 + v, BL); }
  // el parroquiano entra por la izquierda y se pone a mirar
  const u = tramo(t, 1.5, 3.0), px = Math.round(lerp(-18, 30, u));
  R.actor(EL.padre77, px, 156, t, { dir: 1, anda: u > 0 && u < 1, pal: { C: hex('#4a6a8a'), c: hex('#34506a') }, brazos: t > GOL && t < GOL + 0.9, sonrisa: t > GOL });
  // la pareja juega: las manos en los mandos, que giran
  const g = Math.sin(t * 3.1), mira = t > GOL + 0.2 && t < GOL + 1.2;
  R.actor(EL.jugadorPong, 64, 152, t, mira ? { dir: -1, enfado: true } : { dir: 1, sostiene: [92, 127 + Math.round(g)] });
  const gana = t > GOL && t < GOL + 0.8;
  R.actor(EL.jugadoraPong, 130, 152, t, gana ? { dir: -1, brazos: true, salto: Math.round(Math.abs(Math.sin((t - GOL) * 8)) * 3), sonrisa: true } : { dir: -1, sostiene: [124, 127 - Math.round(g)], sonrisa: t > GOL });
  T.atariDelante(R, t, { encuadre: 'bar72' });
};

// 2 · la pantalla del Pong de cerca: las dos palas y la pelota
const p2 = (t) => {
  const g = T.atari(R, t, { encuadre: 'bar72', camara: 'pantalla', vel: 0.62 }) || {};
  // «two lines»: las palas laten; «ball»: un aro alrededor de la pelota
  const lin = tramo(t, DOS - 0.05, DOS + 0.2) - tramo(t, BOLA - 0.1, BOLA + 0.1), bol = tramo(t, BOLA - 0.05, BOLA + 0.15);
  if (lin > 0 && Math.floor(t * 8) % 2 === 0 && g.palas) for (const [x, y] of [[70, g.palas[0]], [248, g.palas[1]]]) { R.rect(x - 2, y - 2, x + 5, y + 2, hex('#a8f0c8')); }
  if (bol > 0 && g.pelota) { const [bx, by] = g.pelota, r = 5 + Math.round(Math.sin(t * 12) * 1.5); for (let k = 0; k < 24; k++) { const an = k / 24 * Math.PI * 2; R.pset(Math.round(bx + 2 + Math.cos(an) * r), Math.round(by + 2 + Math.sin(an) * r), hex('#fff6a0')); } }
  // las manos en los mandos (las de la pareja del bar): giran con las palas
  const yl = g.palas ? Math.round((g.palas[0] - 60) / 20) : 0, yr = g.palas ? Math.round((g.palas[1] - 60) / 20) : 0;
  T.brazo(R, 56, 192, 90, 153 + yl, '#d0783a', 1);
  T.brazo(R, 264, 192, 230, 153 + yr, '#e8d070', -1);
  // una moneda que baila sobre la pila con cada golpe
  if (Math.sin(t * 9) > 0.8) R.pset(184, 160, BL);
};

// 3 · inserto, 1976: el despacho de la Warner y la firma
let F3 = null;
const fondo3 = () => {
  if (F3) { R.copiar(F3); return; }
  F3 = R.nuevo(); const prev = R.usar(F3);
  // la pared: paneles de nogal con vetas a la izquierda, la ventana a la ciudad y la esquina lisa y tranquila
  for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) {
    const tabla = Math.floor(x / 24), vx = x % 24, veta = Math.sin(y * 0.18 + tabla * 2.1 + Math.sin(y * 0.05 + tabla) * 2) > 0.86;
    let c = [hex('#5a3420'), hex('#4c2c1a'), hex('#64402a')][tabla % 3]; if (veta) c = hex('#3e2414'); if (vx === 0) c = hex('#24140a'); if (vx === 1) c = hex('#74482c');
    if (x >= 262 && y < 52) c = (x + y) % 9 === 0 ? hex('#4a2c1a') : hex('#4e2e1c');
    R.pset(x, y, c);
  }
  // el marco de la ventana (el cielo y la ciudad van en cada fotograma)
  R.rect(146, 4, 252, 62, hex('#24140a')); R.rect(148, 6, 250, 60, hex('#8a6a4a'));
  // un disco de oro enmarcado y una foto de una claqueta (sin letras)
  R.rect(62, 20, 96, 54, hex('#24140a')); R.rect(64, 22, 94, 52, hex('#c8a040')); R.rect(66, 24, 92, 50, hex('#1a1a20'));
  R.disco(79, 37, 11, hex('#e8c050')); R.disco(79, 37, 10, hex('#c89a30')); for (let r = 3; r < 10; r += 2) for (let k = 0; k < 30; k++) { const an = k / 30 * 6.28; if (k % 3) R.pset(Math.round(79 + Math.cos(an) * r), Math.round(37 + Math.sin(an) * r), hex('#f0d880')); } R.disco(79, 37, 3, hex('#c8303a')); R.pset(79, 37, K);
  R.rect(104, 22, 140, 52, hex('#24140a')); R.rect(106, 24, 138, 50, hex('#e8e0cc'));
  for (let i = 0; i < 5; i++) R.poligono([[108 + i * 6, 26], [112 + i * 6, 26], [110 + i * 6, 31], [106 + i * 6, 31]], i % 2 ? BL : hex('#1a1a20'));
  R.rect(108, 32, 136, 48, hex('#2a2a30')); R.rect(110, 35, 134, 36, hex('#5a5a66')); R.rect(110, 39, 128, 40, hex('#5a5a66')); R.rect(110, 43, 131, 44, hex('#5a5a66'));
  // la moldura y el canto de la mesa
  R.rect(0, 62, 319, 64, hex('#24140a')); R.rect(0, 62, 319, 62, hex('#8a5a32'));
  // el tablero de caoba en perspectiva, con vetas largas y el reflejo de la ventana
  for (let y = 65; y < 180; y++) for (let x = 0; x < 320; x++) {
    const v = Math.sin(x * 0.035 + y * 0.42 + Math.sin(x * 0.012 + y * 0.07) * 3), n = hh(x >> 1, y, 3);
    let c = v > 0.7 ? hex('#5a2414') : v < -0.75 ? hex('#8a3e22') : hex('#74301a'); if (n < 0.03) c = hex('#4a1c10');
    const refl = x > 150 && x < 250 && y < 120 && (x - y * 0.3) % 22 < 12; if (refl) c = mez(c, hex('#e8c8a0'), 0.12);
    R.pset(x, y, c);
  }
  // el secante de cuero verde bajo el contrato, con sus cantoneras de latón
  R.rect(194, 80, 280, 174, hex('#1a2a1a')); R.rect(196, 82, 278, 174, hex('#2e5a3a')); for (let y = 84; y < 174; y += 3) for (let x = 198; x < 277; x += 4) R.pset(x + (y % 2) * 2, y, hex('#3a6a46'));
  for (const [x, y] of [[196, 82], [270, 82]]) R.poligono([[x, y], [x + 8, y], [x + (x < 230 ? 0 : 8), y + 8]], hex('#c8a040'));
  // la lámpara de banquero de latón con la tulipa verde
  R.rect(14, 76, 46, 80, K); R.rect(15, 77, 45, 79, hex('#c89a30')); R.rect(28, 58, 31, 76, hex('#a87a20'));
  R.poligono([[10, 58], [50, 58], [46, 48], [14, 48]], K); R.poligono([[12, 57], [48, 57], [44, 49], [16, 49]], hex('#2a7a4a')); R.rect(16, 50, 44, 51, hex('#5aa87a'));
  // el portaplumas de latón, el teléfono de la época y el cenicero de cristal
  R.rect(172, 66, 186, 78, K); R.rect(173, 67, 185, 77, hex('#c89a30')); R.rect(174, 67, 176, 77, hex('#f0d070'));
  R.linea(176, 66, 170, 54, K); R.linea(180, 66, 184, 52, hex('#1a1a40')); R.pset(184, 52, hex('#c8a040'));
  R.rect(118, 66, 150, 84, K); R.rect(119, 67, 149, 83, hex('#2a2a30')); R.disco(134, 76, 6, hex('#c8c8d0')); R.disco(134, 76, 2, K); R.rect(114, 62, 154, 67, K); R.rect(115, 63, 153, 66, hex('#3a3a44')); R.disco(117, 64, 3, K); R.disco(151, 64, 3, K);
  R.disco(298, 84, 9, K); R.disco(298, 84, 8, hex('#a8c8d0')); R.disco(298, 84, 5, hex('#5a7a84')); R.rect(284, 80, 298, 82, hex('#6a3a1a')); R.rect(284, 80, 287, 82, hex('#e85a2a'));
  R.usar(prev); R.copiar(F3);
};
const sigX = (u) => 234 + u * 32, sigY = (u) => 158 + Math.round(Math.sin(u * 19) * 3 + Math.sin(u * 7) * 1.5);
// el Pong de casa (la consolita de madera con sus dos ruedas y la pantallita), que llega empujado por la mano de Atari
const pongCasa = (x, y) => { R.rect(x, y, x + 52, y + 26, K); R.rect(x + 1, y + 1, x + 51, y + 25, hex('#8a5a2a')); for (let k = 0; k < 4; k++) R.rect(x + 1, y + 4 + k * 6, x + 51, y + 4 + k * 6, hex('#6a4220'));
  R.rect(x + 1, y + 1, x + 51, y + 8, hex('#1a1a20')); R.rect(x + 14, y + 2, x + 38, y + 7, hex('#2a3a2a')); R.rect(x + 16, y + 3, x + 16, y + 6, hex('#c8f0c8')); R.rect(x + 36, y + 3, x + 36, y + 6, hex('#c8f0c8')); R.pset(x + 26, y + 4, hex('#f0f8f0'));
  for (const cx of [x + 10, x + 42]) { R.disco(cx, y + 17, 5, K); R.disco(cx, y + 17, 4, hex('#d8d8e0')); R.pset(cx, y + 14, K); } };
const p3 = (t) => {
  fondo3();
  // por la ventana: el cielo tramado, nubes de tres tonos a tres velocidades y los rascacielos, recortados al hueco
  R.recorte([150, 8, 248, 58]);
  for (let y = 8; y <= 58; y++) for (let x = 150; x <= 248; x++) R.pset(x, y, (y < 24 ? hex('#5a9ad8') : y < 40 ? ((x + y) % 2 ? hex('#7ab4e4') : hex('#5a9ad8')) : hex('#9acaf0')));
  for (const [v, y, c, w] of [[3, 14, hex('#f6f8fc'), 16], [5, 22, hex('#d8e4f0'), 12], [8, 30, hex('#b8c8dc'), 20]]) { const x = 150 + ((t * v + y * 7) % 130) - 16; R.disco(Math.round(x), y, 4, c); R.disco(Math.round(x) + 6, y - 2, 5, c); R.disco(Math.round(x) + w / 2 + 6, y, 4, c); }
  for (const [x0, w, hgt, c] of [[150, 16, 30, hex('#4a5a7a')], [168, 12, 40, hex('#3a4a6a')], [182, 22, 24, hex('#5a6a86')], [206, 14, 44, hex('#34445e')], [222, 26, 30, hex('#4a5a7a')]]) {
    R.rect(x0, 58 - hgt, x0 + w, 58, c); for (let y = 60 - hgt; y < 57; y += 4) for (let x = x0 + 2; x < x0 + w - 1; x += 3) R.pset(x, y, hh(x, y, Math.floor(t / 3)) < 0.5 ? hex('#f8e8a0') : hex('#2a3448')); }
  { const bx = 150 + ((t * 9) % 120) - 10; R.pset(Math.round(bx), 18, K); R.pset(Math.round(bx) + 1, 17, K); R.pset(Math.round(bx) - 1, 17, K); }
  R.recorte(null);
  R.rect(198, 6, 200, 60, hex('#8a6a4a')); R.rect(148, 32, 250, 33, hex('#8a6a4a'));
  // el humo del puro que sube en espiral
  for (let k = 0; k < 10; k++) { const u = ((t * 0.5 + k / 10) % 1), x = Math.round(286 + Math.sin(u * 7 + t) * 3 * u), y = Math.round(78 - u * 26); R.pset(x, y, u < 0.5 ? hex('#d8d4cc') : hex('#a8a49c')); }
  // la bobina de película (gira en «film»)
  const gf = tramo(t, FILM - 0.1, FILM + 1.4), gm = tramo(t, MUSIC - 0.1, MUSIC + 1.6), bx = 72, by = 104;
  R.disco(bx, by, 27, K); R.disco(bx, by, 26, hex('#9aa0aa')); R.disco(bx, by, 22, hex('#3a2a20')); for (let r = 12; r < 22; r += 3) for (let k = 0; k < 60; k++) { const an = k / 60 * 6.28; R.pset(Math.round(bx + Math.cos(an) * r), Math.round(by + Math.sin(an) * r), hex('#4a3626')); }
  R.disco(bx, by, 11, hex('#b8bec8')); const af = gf * 9 + 0.3;
  for (let k = 0; k < 5; k++) { const an = af + k / 5 * 6.28; R.disco(Math.round(bx + Math.cos(an) * 6), Math.round(by + Math.sin(an) * 6), 2, hex('#3a3a44')); } R.disco(bx, by, 2, K);
  if (gf > 0 && gf < 1) { const an = af * 1.3; for (let r = 12; r < 26; r++) R.pset(Math.round(bx + Math.cos(an) * r), Math.round(by + Math.sin(an) * r), hex('#f0f0f8')); }
  for (let k = 0; k < 14; k++) { const x = bx + 20 + k * 4, y = by + 20 + Math.round(k * 1.2); R.rect(x, y, x + 3, y + 5, hex('#3a2a20')); R.pset(x + 1, y, hex('#c8b890')); R.pset(x + 1, y + 5, hex('#c8b890')); }
  // el disco que asoma de su funda (gira en «music») y la funda con la nota, por delante
  const dx = 116; R.disco(dx, 138, 26, K); R.disco(dx, 138, 25, hex('#1e1e24')); for (let r = 10; r < 25; r += 2) for (let k = 0; k < 50; k++) { const an = k / 50 * 6.28; if ((k + r) % 3) R.pset(Math.round(dx + Math.cos(an) * r), Math.round(138 + Math.sin(an) * r), hex('#2c2c34')); }
  { const an = gm * 14 + 2.4; for (let r = 11; r < 25; r++) R.pset(Math.round(dx + Math.cos(an) * r), Math.round(138 + Math.sin(an) * r), hex('#8a8a9a')); }
  R.disco(dx, 138, 8, hex('#e85a2a')); R.disco(dx, 138, 2, K); { const an = gm * 14 + 3; R.pset(Math.round(dx + Math.cos(an) * 5), Math.round(138 + Math.sin(an) * 5), hex('#f8e0a0')); }
  R.rect(120, 106, 182, 170, hex('#3a1a0a')); R.rect(116, 108, 176, 168, K); R.rect(117, 109, 175, 167, hex('#e8c040')); R.rect(123, 115, 169, 161, hex('#c8303a')); R.disco(146, 138, 16, hex('#f0d060'));
  R.rect(140, 124, 142, 146, K); R.disco(138, 147, 3, K); R.rect(142, 124, 150, 126, K); R.rect(148, 126, 150, 135, K); R.disco(146, 136, 3, K);
  R.rect(117, 109, 119, 167, hex('#f0d878'));
  // el contrato sobre el secante, con su sello rojo y la línea de la firma
  const cx = 202; R.rect(cx + 2, 90, cx + 70, 172, hex('#1a2a1a')); R.rect(cx, 88, cx + 68, 170, K); R.rect(cx + 1, 89, cx + 67, 169, BL);
  for (let y = 96; y < 146; y += 5) R.rect(cx + 7, y, cx + 7 + 34 + Math.round(hh(y, 1, 5) * 20), y + 1, hex('#8a8a94'));
  R.disco(cx + 14, 156, 6, hex('#a8281e')); R.disco(cx + 14, 156, 4, hex('#d84a3a')); R.rect(cx + 30, 163, cx + 66, 163, hex('#3a3a44'));
  // la mano de Atari empuja su Pong de casa hasta el centro de la mesa y se va
  const ll = tramo(t, P3 + 0.15, P3 + 1.0), px = Math.round(lerp(-60, 14, ll)), r = tramo(t, P3 + 1.1, P3 + 1.6);
  pongCasa(px, 144);
  if (r < 1) T.brazo(R, -30, 186 + Math.round(r * 30), px - 4 - Math.round(r * 30), 160 + Math.round(r * 30), '#c8a060', 1);
  // la firma de la Warner: llega la mano del traje azul con la pluma, firma en «bought» y se retira
  const llega = tramo(t, WARNER - 0.5, FIRMA - 0.05), fi = tramo(t, FIRMA, FIRMA + 0.55), va = tramo(t, FIRMA + 0.75, P4 + 0.2);
  const n = Math.floor(fi * 40); for (let i = 0; i < n; i++) { const u = i / 40; R.linea(Math.round(sigX(u)), sigY(u), Math.round(sigX(u + 1 / 40)), sigY(u + 1 / 40), hex('#1a1a5a')); }
  if (llega > 0 && va < 1) {
    const tx = Math.round(sigX(fi)) + Math.round((1 - llega) * 50 + va * 60), ty = sigY(fi) + Math.round((1 - llega) * 20 + va * 30) - (fi > 0 && fi < 1 ? 0 : 3);
    const hx = tx + 14, hy = ty - 6;
    T.brazo(R, 336, 200, hx, hy, '#1e2a4a', -1);
    R.linea(tx + 1, ty, hx - 4, hy - 1, K); R.linea(tx + 2, ty - 1, hx - 4, hy - 2, hex('#1a1a20')); R.pset(tx + 5, ty - 2, hex('#c8a040')); R.pset(tx, ty, hex('#c8a040'));
  }
};

// 4 · el salón de 1977: la consola nueva
const ENC = SALE - 0.1, PARA = SALE + 0.6;
const apagada = (R2, t2, [x0, y0, x1, y1]) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (x - x0 + (y - y0)) % 13 < 2 && y < y0 + 12 ? hex('#4a5058') : hex('#262a30')); };
const p4 = (t) => {
  const on = t >= CONSOLA, fl = t >= CONSOLA && t < CONSOLA + 0.15;
  T.atari(R, t, { encuadre: 'salon77', pantalla: !on ? apagada : fl ? (R2, t2, [x0, y0, x1, y1]) => R.rect(x0, y0, x1, y1, BL) : undefined, cartucho: 'azul' });
  // el niño, sentado delante de la tele, se levanta de un salto cuando se enciende
  const sal = on && t < CONSOLA + 1.2 ? Math.round(Math.abs(Math.sin((t - CONSOLA) * 7)) * 4) : 0;
  R.actor(EL.nino77, 70, 156, t, { dir: on ? 1 : -1, salto: sal, sonrisa: on, sorpresa: t > PARA && !on });
  // la madre, junto al sofá, aplaude
  R.actor(EL.madre77, 222, 152, t, { dir: -1, brazos: on && Math.floor(t * 6) % 2 === 0 && t < CONSOLA + 1.6, sonrisa: t > PARA, habla: t > P4 + 0.6 && t < ENC && Math.sin(t * 8) > 0 });
  // el padre entra con la caja de la consola, la deja y señala la tele
  const u = tramo(t, P4 + 0.2, ENC + 0.4), x = Math.round(lerp(330, 116, u)), lleva = t < PARA;
  const pa = R.actor(EL.padre77, x, 154, t, { dir: -1, anda: u > 0 && u < 1, sostiene: lleva ? true : undefined, dedo: !lleva, sonrisa: on });
  const caja = (bx, by) => { R.rect(bx - 9, by - 12, bx + 9, by, K); R.rect(bx - 8, by - 11, bx + 8, by - 1, hex('#e8e0cc')); R.rect(bx - 8, by - 11, bx + 8, by - 9, hex('#c8303a')); R.rect(bx - 6, by - 7, bx + 6, by - 3, hex('#1a1a20')); R.rect(bx - 6, by - 4, bx + 6, by - 3, hex('#8a5a2a')); R.pset(bx - 3, by - 6, hex('#c8c8d0')); R.pset(bx + 1, by - 6, hex('#c8c8d0')); };
  if (lleva) caja(pa.mano[0] - 2, pa.mano[1] + 4); else caja(128, 157);
  T.atariDelante(R, t, { encuadre: 'salon77' });
};

// 5 · la tele de cerca: dos manos en los mandos; en «cartridges» los cartuchos se cambian y se amontonan
const MONTON = [[96, 'verde', 'flor'], [206, 'naranja', 'nave'], [100, 'morado', 'foso'], [210, 'amarillo', 'comecocos'], [96, 'turquesa', 'nave'], [206, 'rosa', 'flor']];
const COLS = ['rojo', 'azul', 'verde', 'naranja', 'morado', 'amarillo'];
const p5 = (t) => {
  const ci = t < CARTUCHO ? 0 : Math.min(5, 1 + Math.floor((t - CARTUCHO) / 0.6));
  T.atari(R, t, { encuadre: 'salon77', camara: 'tele', cartucho: COLS[ci] });
  // cada cartucho nuevo: un parpadeo de la pantalla
  const cambio = t >= CARTUCHO && ((t - CARTUCHO) % 0.6) < 0.08 && ci < 5; if (cambio) R.rect(54, 36, 186, 120, hex('#c8d0d8'));
  // las manos de los dos jugadores en los mandos, que se menean
  const j1 = Math.sin(t * 6), j2 = Math.sin(t * 5.2 + 1);
  T.brazo(R, 14, 196, 52 + Math.round(j1 * 2), 158 + Math.round(Math.abs(j1) * 2), '#3a8a4a', 1);
  T.brazo(R, 306, 196, 262 + Math.round(j2 * 2), 158 + Math.round(Math.abs(j2) * 2), '#e8784a', -1);
  // los cartuchos de la colección entran deslizándose por la moqueta, uno tras otro
  for (let k = 0; k < MONTON.length; k++) {
    const t0 = CARTUCHO + 0.15 + k * 0.42; if (t < t0) continue; const [x, c, ic] = MONTON[k], fila = Math.floor(k / 2), cae = tramo(t, t0, t0 + 0.2);
    const y = Math.round(lerp(196, 179 - fila * 8, cae)); T.PIEZAS_AT.cartucho?.(R, x + (fila % 2) * 3, y, { color: c, icono: ic });
  }
};

// 6 · inserto local: el rotafolio del despacho, con columnas hechas de cartuchos apilados que crecen año a año
let F6 = null;
const fondo6 = () => {
  if (F6) { R.copiar(F6); return; }
  F6 = R.nuevo(); const prev = R.usar(F6);
  // la pared de listones claros de los setenta (lisa en la esquina de Atom) y el rodapié
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const l = x % 12, n = hh(x, y >> 2, 6); R.pset(x, y, x >= 268 && y < 52 ? hex('#c89a64') : l === 0 ? hex('#8a5a32') : l === 1 ? hex('#dcaa72') : n < 0.15 ? hex('#b8844e') : hex('#c89a64')); }
  R.rect(0, 146, 319, 150, hex('#5a3418')); R.rect(0, 146, 319, 146, hex('#a87a4a'));
  // la moqueta naranja de pelo
  for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) { const n = hh(x, y, 8); R.pset(x, y, n < 0.2 ? hex('#a8501e') : n > 0.85 ? hex('#e88a4a') : hex('#c8642a')); }
  // la ventana de la izquierda (el cielo va en cada fotograma) y la planta de la derecha
  R.rect(6, 22, 62, 112, hex('#5a3418')); R.rect(8, 24, 60, 110, hex('#a8c8e0'));
  R.rect(270, 128, 296, 150, K); R.rect(271, 129, 295, 149, hex('#c86a3a')); R.rect(271, 129, 295, 131, hex('#e88a5a'));
  for (let k = 0; k < 11; k++) { const an = -2.9 + k * 0.28, L = 22 + (k % 3) * 6; R.linea(283, 128, Math.round(283 + Math.cos(an) * L), Math.round(128 + Math.sin(an) * L), hex('#2a6a2a')); R.disco(Math.round(283 + Math.cos(an) * L), Math.round(128 + Math.sin(an) * L), 2, hex('#4aa84a')); }
  // el cuadro de un velero, la lámpara de pie y la mesita con el teléfono y el café
  R.rect(242, 40, 268, 62, hex('#5a3418')); R.rect(244, 42, 266, 60, hex('#a8d0f0')); R.rect(244, 54, 266, 60, hex('#3a6ab0')); R.poligono([[254, 44], [254, 54], [262, 54]], BL); R.rect(250, 54, 262, 56, hex('#8a3a1a'));
  R.rect(232, 92, 246, 104, K); R.poligono([[233, 103], [245, 103], [242, 93], [236, 93]], hex('#f0e0a8')); R.rect(238, 104, 240, 172, hex('#5a4a2a')); R.rect(232, 172, 246, 174, K);
  R.rect(6, 150, 52, 154, K); R.rect(7, 151, 51, 153, hex('#8a5a2a')); R.rect(10, 154, 12, 172, K); R.rect(46, 154, 48, 172, K);
  R.rect(14, 140, 32, 150, K); R.rect(15, 141, 31, 149, hex('#c8303a')); R.disco(23, 145, 3, hex('#e8e0d0')); R.rect(38, 142, 46, 150, K); R.rect(39, 143, 45, 149, BL);
  // el caballete de madera y el rotafolio de papel cuadriculado
  R.linea(118, 174, 132, 44, K); R.linea(119, 174, 133, 44, hex('#8a5a2a')); R.linea(206, 174, 192, 44, K); R.linea(205, 174, 191, 44, hex('#8a5a2a')); R.linea(162, 150, 162, 172, K);
  R.rect(102, 46, 222, 148, K); R.rect(103, 47, 221, 147, hex('#f8f4e8'));
  for (let y = 52; y < 147; y += 6) for (let x = 104; x < 221; x++) R.pset(x, y, hex('#d8e4ec')); for (let x = 106; x < 221; x += 6) for (let y = 48; y < 147; y++) R.pset(x, y, hex('#d8e4ec'));
  R.rect(100, 42, 224, 47, K); R.rect(101, 43, 223, 46, hex('#4a4a54')); R.rect(101, 43, 223, 43, hex('#8a8a96'));
  R.rect(110, 52, 110, 136, hex('#3a3a44')); R.rect(110, 136, 216, 136, hex('#3a3a44'));
  // la bandeja de los rotuladores
  R.rect(102, 148, 222, 151, K); R.rect(103, 149, 221, 150, hex('#8a5a2a')); for (const [x, c] of [[130, '#3ac85a'], [142, '#d82a2a'], [154, '#3a6ac8']]) { R.rect(x, 146, x + 8, 148, K); R.rect(x + 1, 147, x + 7, 147, hex(c)); }
  R.usar(prev); R.copiar(F6);
};
const ANOS = [77, 78, 79, 80, 81, 82], ALTO = [2, 3, 5, 7, 10, 13], CC = ['#c8303a', '#3a6ac8', '#3a9a4a', '#e8a030', '#8a4ac8', '#2ab0b0'];
const miniCart = (x, y, c) => { R.rect(x, y, x + 9, y + 5, K); R.rect(x + 1, y + 1, x + 8, y + 4, hex('#2a2a30')); R.rect(x + 2, y + 1, x + 7, y + 2, hex(c)); R.pset(x + 2, y + 1, BL); };
const colX = (k) => 116 + k * 17, colTop = (k) => 135 - ALTO[k] * 6;
const p6 = (t) => {
  fondo6();
  // por la ventana: el cielo de California, nubes de tres tonos y una palmera que se mece (recortados al hueco)
  R.recorte([8, 24, 60, 110]);
  for (let y = 24; y <= 110; y++) for (let x = 8; x <= 60; x++) R.pset(x, y, y < 50 ? hex('#4a8ad8') : y < 80 ? ((x + y) % 2 ? hex('#6aa4e4') : hex('#4a8ad8')) : y < 96 ? hex('#9ac4ec') : hex('#8a9a6a'));
  for (const [v, y, c] of [[2, 34, hex('#f6f8fc')], [4, 48, hex('#d8e4f0')], [6, 60, hex('#b8c8dc')]]) { const x = 8 + ((t * v + y * 5) % 70) - 10; R.disco(Math.round(x), y, 3, c); R.disco(Math.round(x) + 5, y - 1, 4, c); }
  { const m = Math.round(Math.sin(t * 1.3) * 2); R.linea(40, 110, 42 + m, 62, hex('#6a4a2a')); R.linea(41, 110, 43 + m, 62, hex('#8a6a3a')); for (let k = 0; k < 6; k++) { const an = -3 + k * 0.6 + Math.sin(t * 2 + k) * 0.1; R.linea(42 + m, 62, Math.round(42 + m + Math.cos(an) * 14), Math.round(62 + Math.sin(an) * 9 + 4), hex('#2a7a3a')); } }
  { const bx = 8 + ((t * 7) % 60); R.pset(Math.round(bx), 40, K); R.pset(Math.round(bx) + 1, 39, K); R.pset(Math.round(bx) - 1, 39, K); }
  for (const x of [8, 34, 60]) R.rect(x - 1, 24, x, 110, hex('#5a3418'));
  R.recorte(null);
  // el humo del café de la mesita
  for (let k = 0; k < 5; k++) { const u = (t * 0.6 + k / 5) % 1; R.pset(Math.round(42 + Math.sin(u * 6 + k) * 2), Math.round(140 - u * 18), u < 0.5 ? hex('#f0ece4') : hex('#c8c0b4')); }
  // los años en cifras y las columnas de cartuchos, una por año, que crecen
  for (let k = 0; k < 6; k++) {
    if (k === 0 || k === 5) R.numero(String(ANOS[k]), colX(k) + 5, 145, { centro: true, color: hex('#3a3a44'), sombra: false });
    const t0 = P6 + 0.25 + k * 0.32; if (t < t0) continue; const n = Math.ceil(ALTO[k] * tramo(t, t0, t0 + 0.3));
    for (let i = 0; i < n; i++) miniCart(colX(k), 130 - i * 6, CC[(i + k) % 6]);
  }
  // la línea verde que une las cimas, de 1977 a 1982, y la flecha en «history»
  const u = tramo(t, P6 + 2.3, HIST - 0.1), L = u * 5, n = Math.floor(L);
  const pt = (k) => [colX(k) + 5, colTop(k) - 3];
  for (let k = 0; k < Math.min(n, 5); k++) { const [x0, y0] = pt(k), [x1, y1] = pt(k + 1); for (let d = 0; d < 2; d++) R.linea(x0, y0 + d, x1, y1 + d, hex('#2a9a3a')); }
  if (n < 5 && u > 0) { const [x0, y0] = pt(n), [x1, y1] = pt(n + 1), f = L - n, mx = Math.round(x0 + (x1 - x0) * f), my = Math.round(y0 + (y1 - y0) * f); for (let d = 0; d < 2; d++) R.linea(x0, y0 + d, mx, my + d, hex('#2a9a3a')); R.disco(mx, my, 1, hex('#3ac85a')); }
  const fl = tramo(t, HIST - 0.15, HIST + 0.2);
  if (fl > 0) { const [ax, ay0] = pt(5), ay = ay0 - 3 - Math.round(Math.abs(Math.sin(t * 6)) * 2);
    R.poligono([[ax - 7, ay + 2], [ax, ay - 7], [ax + 7, ay + 2]], K); R.poligono([[ax - 5, ay + 1], [ax, ay - 5], [ax + 5, ay + 1]], hex('#3ac85a')); }
  // el directivo presenta junto al caballete: señala las columnas y celebra en «history»
  const fiesta = t > HIST - 0.1;
  R.actor(EL.ejecutivoWarner, 226, 172, t, { dir: -1, dedo: !fiesta && t > P6 + 0.4, brazos: fiesta && Math.floor(t * 5) % 2 === 0, sonrisa: t > P6 + 1.6, habla: !fiesta && t > P6 + 0.6 && Math.sin(t * 7) > 0.3 });
  // los dos de Atari que miran: se sorprenden y aplauden
  R.actor(EL.ejecutivoAtari2, 66, 176, t, { dir: 1, sorpresa: t > P6 + 1.7 && t < P6 + 2.6, brazos: fiesta && Math.floor(t * 6) % 2 === 1, sonrisa: t > P6 + 2.6 });
  R.actor(EL.ejecutivoAtari, 84, 178, t, { dir: 1, habla: t < P6 + 1.5 && Math.sin(t * 6) > 0.4, brazos: fiesta && Math.floor(t * 6) % 2 === 0, sonrisa: t > P6 + 1.2 });
};

const año = (t) => (t < P3 ? 1972 : t < P4 ? 1976 : t < P6 ? 1977 : Math.round(lerp(1977, 1982, tramo(t, P6 + 0.25, P6 + 2.0))));
const efectos = [[2.4, 'bip'], [3.2, 'bip'], [GOL, 'publico'], [DOS, 'bip'], [BOLA, 'bip'], [FILM, 'brillo'], [FIRMA, 'firma'], [P4 + 0.4, 'puerta'], [CONSOLA, 'interruptor'], [CARTUCHO, 'golpecito'], [CARTUCHO + 1.4, 'pop'], [P6 + 1.0, 'pop'], [HIST, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '1972', efectos, año });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['at-et'] = ('La película', '''// AT-ET (frase 5), 1982, cartela «1982». Cuatro planos:
// 1. la calle del cine al anochecer de 1982 (la luna del medallón, sola y con estrellas): un niño pasa corriendo con la
//    caja de un cartucho en alto y otro detrás; la pareja de la acera se vuelve a mirarlo («hottest company»);
// 2. el mapa de EE. UU. sobre la mesa: una mano clava la chincheta en California y las teles se encienden por todo el
//    país («millions of homes»); en el Pacífico, el montón de cartuchos supera al de bobinas («outsold plenty of movies»);
// 3. la taquilla del cine: la cola, la entrada que sale en «E.T.», la clienta se va contenta y avanza el siguiente;
// 4. la sala de juntas: el ejecutivo pone el maletín en la mesa, «fortune» lo abre lleno de billetes, «rights» firma el
//    de la Warner, y en «Christmas» la pantalla pasa a un abeto con el cartucho y el 25.''', r'''
const a = (f) => en('pelicula', f);
const P2 = a(0.2445), P3 = a(0.521), P4 = a(0.782);
const HOT = a(0.159), MILL = a(0.308), CASAS = a(0.339), VENDE = a(0.407), PELIS = a(0.474), ET = a(0.659);
const PAGA = a(0.809), FORT = a(0.837), DERE = a(0.883), NAV = a(0.962);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const K = hex('#141016'), BL = hex('#f6f2e6');
// la luna sola con estrellas, encima del medallón del decorado (que pinta la luna con la bici: no puede salir)
const lunaSola = (cx, cy, r, t) => {
  R.disco(cx, cy, r + 2, hex('#1a1a3a')); R.disco(cx, cy, r + 1, hex('#232a5a'));
  for (let k = 0; k < 9; k++) { const an = k * 2.4, d = r * (0.55 + hh(k, 2, 7) * 0.4); if (Math.sin(t * 3 + k) > -0.3) R.pset(Math.round(cx + Math.cos(an) * d), Math.round(cy + Math.sin(an) * d), BL); }
  const lr = Math.max(3, Math.round(r * 0.45)), lx = cx + Math.round(r * 0.25), ly = cy - Math.round(r * 0.2);
  R.disco(lx, ly, lr + 1, hex('#c8c0a0')); R.disco(lx, ly, lr, hex('#f4ecc8')); R.pset(lx - 1, ly + 1, hex('#d8d0b0')); R.pset(lx + 1, ly - 1, hex('#d8d0b0'));
};

// 1 · la calle del cine en 1982
const p1 = (t) => {
  T.mundo(R, t, { encuadre: 'cine82' });
  lunaSola(160, 71, 13, t);
  // el cartel de la vitrina de la izquierda (pintaba la luna con la bici): una noche con luna sola, estrellas y colinas
  R.rect(74, 94, 106, 126, hex('#141a3e')); for (let y = 94; y < 112; y++) for (let x = 74; x <= 106; x++) if ((x + y) % 2 === 0 && y > 104) R.pset(x, y, hex('#232a5a'));
  for (let k = 0; k < 10; k++) if (Math.sin(t * 3 + k) > -0.4) R.pset(76 + Math.round(hh(k, 1, 3) * 28), 96 + Math.round(hh(k, 2, 3) * 14), BL);
  R.disco(97, 101, 5, hex('#c8c0a0')); R.disco(97, 101, 4, hex('#f4ecc8')); R.pset(96, 102, hex('#d8d0b0'));
  for (let x = 74; x <= 106; x++) { const y = 116 + Math.round(Math.sin(x * 0.25) * 2 + Math.sin(x * 0.6)); R.rect(x, y, x, 126, hex('#0e1226')); }
  for (const x of [80, 86, 101]) R.poligono([[x - 3, 118], [x, 110], [x + 3, 118]], hex('#0e1226'));
  R.rect(76, 122, 104, 123, hex('#c8303a'));
  // la pareja de la acera charla; cuando pasa el niño, se vuelve a mirarlo
  const pasa = t > HOT - 0.4;
  R.actor(EL.espectador, 84, 148, t, { dir: pasa ? 1 : 1, habla: !pasa && Math.sin(t * 7) > 0, sorpresa: pasa && t < HOT + 0.8, sonrisa: t > HOT + 0.8 });
  R.actor(EL.espectadora, 100, 148, t, { dir: pasa ? 1 : -1, habla: !pasa && Math.sin(t * 7 + 2) > 0, sonrisa: pasa });
  // los dos niños que corren con el cartucho nuevo
  for (const [d, x0, dt, c] of [[EL.nino77, -20, 0, 'rojo'], [EL.nino85, -44, 0.45, null]]) {
    const u = tramo(t, 2.2 + dt, 5.9 + dt), x = Math.round(lerp(x0, 340, u)); if (u <= 0 || u >= 1) continue;
    const r = R.actor(d, x, 150, t, { dir: 1, anda: true, sonrisa: true, sostiene: c ? [x + 12, 118] : undefined, salto: Math.abs(Math.sin(t * 9)) > 0.8 ? 1 : 0 });
    if (c) T.PIEZAS_AT.cajaCartucho?.(R, r.mano[0], r.mano[1] + 6, { color: c, icono: 'nave' });
  }
  T.mundoDelante(R, t, { encuadre: 'cine82' });
};

// 2 · el mapa: las teles se encienden por todo el país
const CIUDADES = [[-122.04, 37.37], [-118.24, 34.05], [-117.16, 32.72], [-122.68, 45.52], [-122.33, 47.61], [-121.49, 38.58], [-119.79, 36.74], [-115.14, 36.17], [-112.07, 33.45], [-111.89, 40.76], [-106.65, 35.08], [-104.99, 39.74], [-116.2, 43.6], [-97.74, 30.27], [-96.8, 32.78], [-95.37, 29.76], [-98.49, 29.42], [-97.52, 35.47], [-94.58, 39.1], [-90.2, 38.63], [-93.27, 44.98], [-87.63, 41.88], [-83.05, 42.33], [-86.16, 39.77], [-84.51, 39.1], [-81.69, 41.5], [-80.0, 40.44], [-90.07, 29.95], [-86.8, 33.52], [-84.39, 33.75], [-81.66, 30.33], [-80.19, 25.76], [-82.46, 27.95], [-80.84, 35.23], [-78.64, 35.78], [-77.04, 38.9], [-76.61, 39.29], [-75.17, 39.95], [-74.0, 40.71], [-71.06, 42.36], [-73.76, 42.65], [-78.88, 42.89], [-89.4, 43.07], [-96.7, 40.81], [-100.78, 46.81], [-108.5, 45.78], [-86.78, 36.16], [-92.29, 34.75], [-89.97, 35.15], [-77.44, 37.54]];
const ORDEN = CIUDADES.map((c, k) => [Math.hypot(c[0] + 122.04, c[1] - 37.37) + hh(k, 1, 4) * 6, c]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
const tele = (x, y, t, k, s) => { const sy = y - Math.round((1 - s) * 3);
  R.rect(x - 5, sy - 7, x + 5, sy, K); R.rect(x - 4, sy - 6, x + 4, sy - 1, hex('#8a5a2a')); const on = Math.sin(t * 5 + k * 1.7) > -0.6;
  R.rect(x - 3, sy - 5, x + 1, sy - 2, on ? (k % 3 === 0 ? hex('#7ae0f0') : k % 3 === 1 ? hex('#a8f0a0') : hex('#f0d080')) : hex('#4a8aa8')); R.pset(x + 3, sy - 4, hex('#e8c050')); R.pset(x + 3, sy - 2, hex('#e8c050'));
  R.pset(x - 2, sy - 8, K); R.pset(x - 3, sy - 9, K); R.pset(x + 1, sy - 8, K); R.pset(x + 2, sy - 9, K);
  if (s < 1) for (let i = 0; i < 6; i++) { const an = i / 6 * 6.28, r = 6 + s * 5; R.pset(Math.round(x + Math.cos(an) * r), Math.round(sy - 3 + Math.sin(an) * r), hex('#fff6a0')); } };
const p2 = (t) => {
  const P = T.mapa(R, t, { zona: 'eeuu' });
  // las teles, desde California hacia el este, entre «console» y «homes»
  for (let k = 0; k < ORDEN.length; k++) { const t0 = P2 + 0.75 + (CASAS - P2 - 0.8) * k / ORDEN.length; if (t < t0) continue; const [x, y] = P(ORDEN[k]); tele(Math.round(x), Math.round(y), t, k, tramo(t, t0, t0 + 0.25)); }
  // la chincheta roja de Atari en California, que clava una mano
  const [cx, cy] = P([-122.04, 37.37]), b = tramo(t, P2 + 0.15, P2 + 0.6);
  T.chincheta(R, Math.round(cx), Math.round(cy), t, hex('#d82a2a'), { baja: b, pulso: t > P2 + 0.8 });
  const va = tramo(t, P2 + 0.75, P2 + 1.3); if (va < 1) T.brazo(R, -24, Math.round(cy) + 44, Math.round(cx) - 4 - Math.round(va * 50), Math.round(cy) - 2 - Math.round((1 - b) * 22) + Math.round(va * 30), '#2a4a7a', 1);
  // en el golfo: la fila de bobinas de cine (tres) y la de cartuchos, que crece y la pasa («outsold plenty of movies»)
  const gx = 150, gy = 172;
  R.rect(gx - 2, gy - 28, gx + 100, gy + 5, hex('#5a6a7a')); R.rect(gx - 4, gy - 30, gx + 98, gy + 3, K); R.rect(gx - 3, gy - 29, gx + 97, gy + 2, hex('#efe4c4'));
  for (let y = gy - 26; y < gy + 2; y += 4) for (let x = gx - 2; x < gx + 97; x += 2) R.pset(x, y, hex('#d8ccaa'));
  R.rect(gx - 3, gy - 29, gx + 97, gy - 27, hex('#c8303a')); T.chincheta(R, gx + 47, gy - 25, t, hex('#3a6ac8'));
  for (let k = 0; k < 3; k++) { const x = gx + 6 + k * 15; R.disco(x, gy - 6, 7, K); R.disco(x, gy - 6, 6, hex('#9aa0aa')); R.disco(x, gy - 6, 4, hex('#3a2a20')); R.disco(x, gy - 6, 2, hex('#c8ccd4')); R.pset(x, gy - 6, K); }
  const n = Math.floor(tramo(t, VENDE, PELIS) * 7.99);
  for (let k = 0; k < n; k++) T.PIEZAS_AT.cartucho?.(R, gx + 6 + k * 13, gy - 14, { color: ['rojo', 'azul', 'verde', 'naranja', 'morado', 'amarillo', 'turquesa'][k], icono: ['nave', 'flor', 'foso', 'comecocos'][k % 4] });
  if (n >= 4) { const x = gx + 6 + (n - 1) * 13 + 10, y = gy - 22 - Math.round(Math.abs(Math.sin(t * 6)) * 2); R.poligono([[x - 6, y], [x, y - 7], [x + 6, y]], K); R.poligono([[x - 4, y - 1], [x, y - 5], [x + 4, y - 1]], hex('#3ac85a')); }
};

// 3 · la taquilla: la cola, la entrada en «E.T.»
const p3 = (t) => {
  const SALE = ET + 0.55, AV = SALE + 0.3;
  T.mundo(R, t, { encuadre: 'cine82', camara: 'taquilla', entrada: tramo(t, ET - 0.35, ET + 0.1) });
  lunaSola(55, 80, 18, t);
  // la clienta paga, recibe la entrada y se va hacia la puerta de las palomitas
  const u = tramo(t, SALE, P4 + 0.2), cx = Math.round(lerp(156, 330, u));
  const cl = R.actor(EL.espectadora, cx, 176, t, { dir: 1, anda: u > 0 && u < 1, sostiene: t > ET ? true : [166, 150], sonrisa: t > ET, habla: t < ET - 0.4 && Math.sin(t * 7) > 0 });
  if (t > ET) { const [mx, my] = cl.mano; R.rect(mx - 2, my - 5, mx + 4, my + 1, K); R.rect(mx - 1, my - 4, mx + 3, my, hex('#e8c050')); R.pset(mx + 1, my - 2, hex('#c8303a')); }
  // el siguiente de la cola avanza; detrás, otros dos esperan y charlan
  const v = tramo(t, AV, AV + 1.4);
  R.actor(EL.espectador, Math.round(lerp(64, 140, v)), 176, t, { dir: 1, anda: v > 0 && v < 1, habla: v === 0 && Math.sin(t * 6) > 0.3 });
  R.actor(EL.nino85, Math.round(lerp(44, 92, tramo(t, AV + 0.4, AV + 1.6))), 176, t, { dir: 1, anda: t > AV + 0.4 && t < AV + 1.6, sonrisa: true });
  R.actor(EL.madre85, Math.round(lerp(24, 70, tramo(t, AV + 0.5, AV + 1.8))), 176, t, { dir: 1, anda: t > AV + 0.5 && t < AV + 1.8, dedo: t < AV });
  T.mundoDelante(R, t, { encuadre: 'cine82', camara: 'taquilla' });
};

// 4 · la sala de juntas: el maletín de dinero, la firma y la Navidad
const p4 = (t) => {
  T.atari(R, t, { encuadre: 'juntas', grafica: 0.55 });
  // en «Christmas» la pantalla pasa a la diapositiva del abeto con el cartucho y el 25
  if (t > NAV - 0.1) { R.recorte([141, 23, 251, 99]);
    for (let y = 23; y <= 99; y++) for (let x = 141; x <= 251; x++) R.pset(x, y, (x + y) % 7 === 0 ? hex('#e8f0f8') : hex('#f6f8fc'));
    const ax = 176; for (let k = 0; k < 4; k++) R.poligono([[ax - 6 - k * 5, 44 + k * 11], [ax, 30 + k * 11], [ax + 6 + k * 5, 44 + k * 11]], k % 2 ? hex('#2a7a3a') : hex('#3a9a4a'));
    R.rect(ax - 3, 77, ax + 3, 86, hex('#6a3a1a')); R.poligono([[ax - 4, 28], [ax, 22], [ax + 4, 28]], hex('#f0c840'));
    for (let k = 0; k < 7; k++) if (Math.sin(t * 6 + k) > 0) R.disco(ax - 12 + k * 4, 50 + (k % 3) * 9, 1, [hex('#d82a2a'), hex('#f0c840'), hex('#3a8ae8')][k % 3]);
    T.PIEZAS_AT.cartucho?.(R, 214, 76, { s: 2, color: 'rojo', icono: 'flor' });
    R.numero('25', 236, 95, { centro: true, color: hex('#c8303a') });
    R.recorte(null); }
  // los consejeros sentados: se sorprenden con el dinero
  const ve = t > FORT;
  R.actor(EL.consejero, 53, 150, t, { dir: 1, sorpresa: ve && t < FORT + 1, sonrisa: t > FORT + 1 });
  R.actor(EL.ejecutivoAtari2, 97, 150, t, { dir: 1, habla: !ve && Math.sin(t * 7) > 0.2, sorpresa: ve && t < FORT + 1.2, sonrisa: t > FORT + 1.2 });
  R.actor(EL.ejecutivoWarner, 141, 150, t, { dir: 1, dedo: t > DERE - 0.2 && t < DERE + 0.8, sonrisa: t > DERE + 0.8 });
  R.actor(EL.consejeroCalvo, 185, 150, t, { dir: 1, sorpresa: ve && t < FORT + 1, brazos: t > NAV && t < NAV + 0.8, sonrisa: t > NAV });
  // el ejecutivo de Atari entra por la puerta con el maletín y lo deja en la mesa
  const u = tramo(t, P4 + 0.1, PAGA - 0.1), x = Math.round(lerp(300, 254, u)), lleva = t < PAGA;
  const ej = R.actor(EL.ejecutivoAtari, x, 150, t, { dir: -1, anda: u > 0 && u < 1, sostiene: lleva ? true : undefined, dedo: !lleva && t < DERE, sonrisa: t > FORT });
  T.atariDelante(R, t, { encuadre: 'juntas' });
  const mal = (mx, my, abre) => {
    if (abre > 0) { const ly = my - 16 - Math.round(abre * 14); R.rect(mx - 17, ly, mx + 17, my - 15, K); R.rect(mx - 16, ly + 1, mx + 16, my - 16, hex('#6a3a1a')); R.rect(mx - 13, ly + 3, mx + 13, my - 17, hex('#b8ae98')); }
    R.rect(mx - 17, my - 16, mx + 17, my, K); R.rect(mx - 16, my - 15, mx + 16, my - 1, hex('#8a4a22')); R.rect(mx - 16, my - 15, mx + 16, my - 14, hex('#b0682e')); R.rect(mx - 16, my - 3, mx + 16, my - 1, hex('#5a2a12'));
    R.rect(mx - 6, my - 20, mx + 6, my - 16, K); R.rect(mx - 5, my - 19, mx + 5, my - 17, hex('#6a3a1a')); R.rect(mx - 12, my - 14, mx - 10, my - 12, hex('#e8c050')); R.rect(mx + 10, my - 14, mx + 12, my - 12, hex('#e8c050'));
    if (abre > 0) { for (let k = 0; k < 7; k++) { const bx = mx - 15 + k * 4 + (k > 3 ? 1 : 0); R.rect(bx, my - 15, bx + 3, my - 4, hex('#2a6a2a')); R.rect(bx, my - 15, bx + 3, my - 13, hex('#9ad89a')); R.rect(bx, my - 10, bx + 3, my - 9, hex('#e8e0c0')); }
      if (Math.sin(t * 8) > 0.3) { R.pset(mx + 6, my - 18, BL); R.pset(mx + 5, my - 18, BL); R.pset(mx + 6, my - 19, BL); R.pset(mx + 7, my - 18, BL); } }
  };
  if (lleva) mal(ej.mano[0] - 6, ej.mano[1] + 12, 0); else { mal(232, 147, tramo(t, FORT - 0.2, FORT + 0.15));
    // los $ que saltan del maletín en «fortune»
    for (let k = 0; k < 3; k++) { const u = tramo(t, FORT + k * 0.25, FORT + 1.1 + k * 0.25); if (u > 0 && u < 1) R.numero('$', 222 + k * 10, Math.round(128 - u * 22), { color: hex('#3ac85a') }); } }
  // la firma del de la Warner sobre la mesa
  if (t > DERE - 0.3) { R.rect(126, 140, 150, 147, K); R.rect(127, 141, 149, 146, BL); const n = Math.floor(tramo(t, DERE, DERE + 0.6) * 16); for (let i = 0; i < n; i++) R.pset(130 + i, 144 + Math.round(Math.sin(i * 1.3)), hex('#1a1a5a')); }
};

const efectos = [[HOT, 'whoosh'], [P2 + 0.6, 'toc'], [MILL, 'pop'], [VENDE + 0.2, 'pop'], [ET, 'papel'], [PAGA, 'golpecito'], [FORT, 'brillo'], [DERE, 'firma'], [NAV, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1982', efectos, año: 1982 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['at-calendario'] = ('El calendario', '''// AT-CALENDARIO (frase 6), 1982. Cuatro planos:
// 1. las oficinas de Atari: el de Atari y el de la Warner se dan la mano en «closed»; detrás pasa uno con una caja de
//    cartuchos camino de las tiendas («Christmas»);  2. el calendario gigante: julio y agosto salen volando (gag 2), en
//    «1st of September» se rodea el 1 en rojo; «six months»: el cronómetro da la vuelta y sale el 6;
// 3. el pasillo de los trofeos (fondo local): Warshaw, joven y de pelo rizado, entra y señala su cartucho de oro
//    enmarcado en «Raiders»; el jefe llega por la derecha;  4. inserto, la mesa de Warshaw: la mano del jefe deja el reloj
//    de arena y el 5; las cinco semanas se van tachando una tras otra.''', r'''
const a = (f) => en('calendario', f);
const P2 = a(0.317), P3 = a(0.615), P4 = a(0.887);
const CAL = a(0.042), CIERRA = a(0.112), JUL = a(0.166), NAV = a(0.273), UNO = a(0.41), NORMAL = a(0.495), SEIS = a(0.551);
const HOWARD = a(0.619), PROG = a(0.703), RAID = a(0.776), JUEGO = a(0.854), DADO = a(0.898), CINCO = a(0.944);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, u) => { const A = [c1 & 255, (c1 >>> 8) & 255, (c1 >>> 16) & 255], B = [c2 & 255, (c2 >>> 8) & 255, (c2 >>> 16) & 255]; const m = A.map((v, i) => Math.round(v + (B[i] - v) * u)); return (0xff000000 | (m[2] << 16) | (m[1] << 8) | m[0]) >>> 0; };
const K = hex('#141016'), BL = hex('#f6f2e6');

// 1 · las oficinas: el apretón de manos
const p1 = (t) => {
  T.atari(R, t, { encuadre: 'oficinas' });
  // el de la caja de cartuchos cruza por detrás, camino de las tiendas
  const w = tramo(t, NAV - 1.2, P2 + 0.2), wx = Math.round(lerp(84, 250, w));
  if (w > 0 && w < 1) { const r = R.actor(EL.ejecutivoAtari2, wx, 140, t, { dir: 1, anda: true, sostiene: true }); const [mx, my] = r.mano; R.rect(mx - 6, my - 6, mx + 8, my + 4, K); R.rect(mx - 5, my - 5, mx + 7, my + 3, hex('#c8a06a')); R.rect(mx - 5, my - 5, mx + 7, my - 4, hex('#8a6a3a')); for (let k = 0; k < 3; k++) R.rect(mx - 4 + k * 4, my - 8, mx - 2 + k * 4, my - 5, [hex('#c8303a'), hex('#3a6ac8'), hex('#3a9a4a')][k]); }
  // los dos se acercan, se dan la mano en «closed» y la sacuden
  const u = tramo(t, 0.2, CIERRA - 0.3), da = t > CIERRA - 0.25 && t < CIERRA + 1.0, sac = da ? Math.round(Math.sin((t - CIERRA) * 18) * 1.5) : 0;
  const xa = Math.round(lerp(96, 134, u)), xw = Math.round(lerp(222, 156, u));
  R.actor(EL.ejecutivoAtari, xa, 150, t, da ? { dir: 1, sostiene: [151, 135 + sac], sonrisa: true } : { dir: 1, anda: u > 0 && u < 1, sonrisa: t > CIERRA, habla: t > JUL - 0.2 && t < NAV && Math.sin(t * 7) > 0 });
  R.actor(EL.ejecutivoWarner, xw, 150, t, da ? { dir: -1, sostiene: [152, 135 + sac], sonrisa: true } : { dir: -1, anda: u > 0 && u < 1, dedo: t > NAV - 0.3 && t < NAV + 0.7, sonrisa: t > CIERRA });
  T.atariDelante(R, t, { encuadre: 'oficinas' });
};

// 2 · el calendario gigante: las hojas vuelan y el 1 de septiembre se rodea en rojo
const H1 = P2 + 0.35, H2 = P2 + 0.85;
const p2 = (t) => {
  const mes = t < H1 + 0.4 ? 7 : t < H2 + 0.4 ? 8 : 9, hojas = mes === 7 ? tramo(t, H1, H1 + 0.4) : mes === 8 ? tramo(t, H2, H2 + 0.4) : 0;
  T.atari(R, t, { encuadre: 'oficinas', camara: 'calendario', mes, hojas, dia: mes === 7 ? 31 : mes === 8 ? 31 : 0, marca: tramo(t, UNO - 0.05, UNO + 0.5), crono: tramo(t, NORMAL, SEIS + 0.3) });
  // «six months»: el 6 grande bajo el cronómetro
  const s = tramo(t, SEIS - 0.1, SEIS + 0.2); if (s > 0) R.numero('6', 236, Math.round(112 - s * 4), { tam: 16, centro: true });
  // el ejecutivo: se sorprende con las hojas, señala el 1 y mira el cronómetro preocupado
  R.actor(EL.ejecutivoAtari, 262, 170, t, { dir: -1, sorpresa: t > H1 && t < H2 + 0.6, dedo: t > UNO - 0.1 && t < UNO + 0.9, triste: t > SEIS, habla: t > NORMAL - 0.3 && t < SEIS && Math.sin(t * 7) > 0 });
};

// 3 · el pasillo de los trofeos (fondo local)
let F3 = null;
const fondo3 = () => {
  if (F3) { R.copiar(F3); return; }
  F3 = R.nuevo(); const prev = R.usar(F3);
  // el techo de placas con su rejilla
  for (let y = 0; y < 16; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 40 === 0 || y === 7 ? hex('#b8b4a8') : (hh(x, y, 2) < 0.08 ? hex('#cfcbbf') : hex('#dcd8cc')));
  R.rect(0, 16, 319, 18, hex('#8a8478'));
  // la pared de corcho beis con tramado suave y el friso de madera
  for (let y = 19; y < 112; y++) for (let x = 0; x < 320; x++) { const n = hh(x >> 1, y >> 1, 5), raya = (x % 16 === 0) && !(x >= 272 && y < 50); R.pset(x, y, x >= 272 && y < 50 ? hex('#d8ccb0') : raya ? hex('#c8ba9a') : n < 0.18 ? hex('#cbbd9e') : n > 0.9 ? hex('#e6dcc4') : hex('#dacfb4')); }
  // la sombra del techo en la pared y el zócalo de luz
  for (let x = 0; x < 320; x++) { R.pset(x, 19, hex('#a89a7c')); if (x % 2) R.pset(x, 20, hex('#bcae90')); }
  for (let y = 112; y < 126; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 112 ? hex('#a8744a') : Math.sin(x * 0.2 + y * 1.3) > 0.8 ? hex('#5a3418') : hex('#7a4a28'));
  // la moqueta azul con rombos y luz
  for (let y = 126; y < 180; y++) for (let x = 0; x < 320; x++) { const fx = (x + (y - 126) * 0.4) % 28, fy = (y - 126) % 14, junta = fx < 1 || fy === 0, d = Math.abs(fx - 14) + Math.abs(fy - 7) * 2 < 5;
    R.pset(x, y, junta ? hex('#24305e') : d ? hex('#4a5aa0') : hh(x, y, 9) < 0.12 ? hex('#2a3668') : hex('#34448a')); }
  // la alfombra de paso, roja con su greca, y la luz de la ventana del fondo en la moqueta
  for (let y = 150; y < 176; y++) for (let x = 110; x < 250; x++) { const b = y < 152 || y > 173 || x < 112 || x > 247, g = (y === 154 || y === 171) && (x + y) % 4 < 2; R.pset(x, y, b ? hex('#5a1a1a') : g ? hex('#e8c050') : hh(x, y, 7) < 0.1 ? hex('#8a2a2a') : hex('#a8343a')); }
  // el tablón de corcho con notas (sin letras: rayas, dibujos y chinchetas)
  R.rect(110, 24, 150, 54, hex('#5a3418')); R.rect(111, 25, 149, 53, hex('#b8844a')); for (let k = 0; k < 40; k++) R.pset(112 + Math.round(hh(k, 1, 11) * 36), 26 + Math.round(hh(k, 2, 11) * 26), hex('#946a38'));
  for (const [x, y, c] of [[114, 28, '#f4ecc8'], [128, 27, '#f8d0e0'], [139, 32, '#c8e8f8'], [118, 40, '#f8f0a0'], [134, 42, '#f4ecc8']]) { R.rect(x, y, x + 9, y + 9, hex(c)); R.rect(x + 1, y + 3, x + 7, y + 3, hex('#8a8a94')); R.rect(x + 1, y + 6, x + 6, y + 6, hex('#8a8a94')); R.pset(x + 4, y, hex('#d82a2a')); }
  // la puerta del fondo con su ventanuco y el letrero de salida (un pictograma)
  R.rect(212, 52, 236, 126, hex('#3a2414')); R.rect(214, 54, 234, 126, hex('#8a6a4a')); R.rect(218, 60, 230, 76, K); R.rect(219, 61, 229, 75, hex('#a8c8e0')); R.rect(219, 61, 222, 75, hex('#d8e8f4')); R.disco(231, 94, 1, hex('#e8c050'));
  // el estante de trofeos: copitas doradas y una placa
  R.rect(240, 108, 286, 110, hex('#5a3418')); for (const [x, hgt] of [[246, 9], [258, 12], [272, 8]]) { R.rect(x - 1, 108 - hgt, x + 5, 107 - hgt + 4, hex('#c89a30')); R.rect(x, 108 - hgt + 1, x + 1, 107 - hgt + 3, hex('#f0d070')); R.rect(x + 1, 108 - hgt + 5, x + 3, 106, hex('#a87a20')); R.rect(x - 1, 106, x + 5, 107, hex('#5a3a14')); }
  // tres marcos con cartuchos de la casa y sus placas doradas sin letras
  for (const [x0, y0, c, ic] of [[34, 38, 'azul', 'nave'], [96, 42, 'verde', 'flor']]) {
    R.rect(x0, y0, x0 + 34, y0 + 42, hex('#3a2414')); R.rect(x0 + 2, y0 + 2, x0 + 32, y0 + 40, hex('#1e1e2a'));
    for (let y = y0 + 3; y < y0 + 40; y++) for (let x = x0 + 3; x < x0 + 32; x++) if ((x + y) % 5 === 0) R.pset(x, y, hex('#28283a'));
    T.PIEZAS_AT.cartucho?.(R, x0 + 17, y0 + 32, { color: c, icono: ic });
    R.rect(x0 + 8, y0 + 34, x0 + 26, y0 + 37, hex('#c8a040')); R.rect(x0 + 9, y0 + 35, x0 + 25, y0 + 35, hex('#f0d070'));
  }
  // el póster de un juego inventado (un muñeco que salta un foso) y un reloj de pared
  R.rect(246, 54, 278, 100, K); R.rect(247, 55, 277, 99, hex('#2a3a6a'));
  for (let y = 56; y < 70; y++) for (let x = 248; x < 277; x++) if (hh(x, y, 4) < 0.08) R.pset(x, y, BL);
  R.rect(248, 88, 276, 98, hex('#3a8a3a')); R.rect(260, 88, 266, 98, K); R.rect(254, 74, 258, 80, hex('#f0c840')); R.rect(255, 80, 257, 84, hex('#e85a2a'));
  R.disco(84, 28, 7, K); R.disco(84, 28, 6, hex('#f4f0e4')); for (let k = 0; k < 12; k++) { const an = k / 12 * 6.28; R.pset(Math.round(84 + Math.cos(an) * 5), Math.round(28 + Math.sin(an) * 5), hex('#5a5a66')); }
  // la máquina recreativa de la izquierda (el mueble; la demo va en cada fotograma)
  R.rect(2, 54, 26, 150, K); R.rect(3, 55, 25, 149, hex('#c8303a')); R.rect(3, 55, 6, 149, hex('#e85a5a')); R.rect(6, 64, 23, 84, hex('#111')); R.rect(5, 90, 24, 96, hex('#3a3a44')); R.disco(10, 93, 2, hex('#f0c840')); R.disco(18, 93, 2, hex('#3a8ae8'));
  for (let y = 100; y < 148; y += 4) R.rect(6, y, 22, y, hex('#a8242a'));
  // la fuente de agua con su garrafa y la planta
  R.rect(288, 92, 304, 150, K); R.rect(289, 93, 303, 149, hex('#e8e8e0')); R.rect(290, 112, 302, 113, hex('#b8b8b0')); R.rect(294, 118, 298, 121, hex('#3a8ae8'));
  R.disco(296, 82, 9, K); R.disco(296, 82, 8, hex('#a8d8f0')); R.rect(290, 82, 302, 90, hex('#a8d8f0')); R.rect(288, 90, 304, 92, K); R.pset(292, 78, BL);
  R.rect(262, 136, 278, 152, K); R.rect(263, 137, 277, 151, hex('#c86a3a')); for (let k = 0; k < 9; k++) { const an = -2.6 + k * 0.35; R.linea(270, 136, Math.round(270 + Math.cos(an) * 16), Math.round(136 + Math.sin(an) * 18), hex('#2a7a3a')); R.pset(Math.round(270 + Math.cos(an) * 16), Math.round(136 + Math.sin(an) * 18), hex('#5ab85a')); }
  // el banco y un cable por la moqueta
  R.rect(40, 140, 96, 144, K); R.rect(41, 141, 95, 143, hex('#8a5a2a')); R.rect(44, 144, 46, 156, K); R.rect(90, 144, 92, 156, K);
  R.usar(prev); R.copiar(F3);
};
const p3 = (t) => {
  fondo3();
  // los fluorescentes (uno parpadea) y la demo de la recreativa
  for (const [x, k] of [[60, 0], [180, 1]]) { const on = k === 0 || hh(Math.floor(t * 9), 3, 8) > 0.12; R.rect(x, 4, x + 50, 9, K); R.rect(x + 1, 5, x + 49, 8, on ? hex('#fbfbe8') : hex('#a8a89a')); }
  { const bx = 7 + Math.round((Math.sin(t * 3) + 1) * 7), by = 66 + Math.round((Math.cos(t * 2.3) + 1) * 7); R.rect(6, 64, 23, 84, hex('#101820')); R.rect(bx, by, bx + 1, by + 1, hex('#a8f0a0')); R.rect(7, 80 - Math.round(Math.sin(t * 3) * 2), 10, 81, hex('#f0c840')); }
  // el marco grande del cartucho de oro (el juego de antes de Warshaw), con el foco que se enciende en «Raiders»
  const luz = tramo(t, RAID - 0.2, RAID + 0.3);
  for (let y = 19; y < 112; y++) { const w = (y - 19) * 0.32; for (let x = Math.round(176 - w); x <= 176 + w; x++) if ((x + y) % 2 === 0 || luz > 0.5) R.pset(x, y, mez(R.pget(x, y), hex('#fff4c0'), 0.1 + luz * 0.2)); }
  R.rect(154, 36, 198, 92, hex('#7a5418')); R.rect(156, 38, 196, 90, hex('#e8c050')); R.rect(159, 41, 193, 87, hex('#3a1a1a'));
  for (let y = 42; y < 87; y++) for (let x = 160; x < 193; x++) if ((x * 3 + y) % 7 === 0) R.pset(x, y, hex('#4a2424'));
  T.PIEZAS_AT.cartucho?.(R, 176, 76, { s: 2, color: '#e8c040' });
  // el cofre del tesoro en la ventanita del cartucho de oro
  R.rect(170, 55, 182, 63, K); R.rect(171, 57, 181, 62, hex('#8a4a1a')); R.rect(171, 56, 181, 57, hex('#f0c840')); R.rect(175, 58, 177, 60, hex('#f0c840'));
  if (luz > 0) for (let k = 0; k < 4; k++) { const an = t * 3 + k * 1.57, r = 26 + Math.sin(t * 5 + k) * 2; R.pset(Math.round(176 + Math.cos(an) * r), Math.round(64 + Math.sin(an) * r * 0.9), hex('#fff6a0')); }
  { const an = t * 0.8; R.linea(84, 28, Math.round(84 + Math.cos(an) * 4), Math.round(28 + Math.sin(an) * 4), K); R.linea(84, 28, 84, 25, K); }
  // una compañera lee en el banco y pasa la hoja
  { const r = R.actor(EL.espectadora, 60, 144, t, { dir: 1, sostiene: true, sonrisa: t > RAID }); const [mx, my] = r.mano, f = Math.floor(t * 0.7) % 2; R.rect(mx - 4, my - 6, mx + 4, my + 1, K); R.rect(mx - 3, my - 5, mx + 3, my, f ? BL : hex('#f4ecc8')); R.rect(mx - 2, my - 3, mx + 2, my - 3, hex('#8a8a94')); }
  // un compañero pasa por detrás con papeles
  const c = tramo(t, P3 + 0.2, P3 + 3.0); if (c > 0 && c < 1) { const r = R.actor(EL.ejecutivoAtari2, Math.round(lerp(330, 200, c)), 136, t, { dir: -1, anda: true, sostiene: true }); R.rect(r.mano[0] - 4, r.mano[1] - 4, r.mano[0] + 3, r.mano[1] + 2, BL); }
  // Warshaw entra, se vuelve sonriente en «programmer» y señala su cartucho de oro en «Raiders»
  const u = tramo(t, P3 + 0.1, PROG - 0.3), wx = Math.round(lerp(-20, 130, u));
  R.actor(EL.warshaw, wx, 158, t, { dir: u < 1 || t > RAID - 0.3 ? 1 : -1, anda: u > 0 && u < 1, sonrisa: t > PROG - 0.3, dedo: t > RAID - 0.2 && t < JUEGO, habla: t > JUEGO && Math.sin(t * 7) > 0 && t < JUEGO + 0.6 });
  // el jefe llega por la derecha (el encargo es en el plano siguiente)
  const j = tramo(t, JUEGO - 0.4, P4 + 0.1); if (j > 0) R.actor(EL.ejecutivoAtari, Math.round(lerp(330, 214, j)), 160, t, { dir: -1, anda: j < 1, dedo: j >= 1 });
};

// 4 · inserto: la mesa de Warshaw, el reloj de arena y las cinco semanas
let F4 = null;
const fondo4 = () => {
  if (F4) { R.copiar(F4); return; }
  F4 = R.nuevo(); const prev = R.usar(F4);
  // la pared del fondo, desenfocada (bloques azules) con un póster, y el canto de la mesa
  for (let y = 0; y < 52; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x >= 266 && y < 48 ? hex('#34405a') : (y % 12 === 0 || (x + (Math.floor(y / 12) % 2) * 12) % 24 === 0) ? hex('#2a3448') : hh(x >> 2, y >> 2, 6) < 0.1 ? hex('#2e3a52') : hex('#34405a'));
  R.rect(196, 6, 240, 44, hex('#1a1a24')); R.rect(197, 7, 239, 43, hex('#e8e0cc')); for (let k = 0; k < 3; k++) { R.rect(201 + k * 13, 30, 209 + k * 13, 38, K); R.rect(202 + k * 13, 31, 208 + k * 13, 37, hex('#1a1a20')); } R.rect(199, 26, 237, 28, hex('#3a8a3a')); R.rect(214, 14, 218, 24, hex('#f0c840'));
  R.rect(0, 50, 319, 54, hex('#3a2414')); R.rect(0, 50, 319, 50, hex('#8a5a32'));
  // el tablero de formica de madera clara con vetas
  for (let y = 55; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.04 + y * 0.5 + Math.sin(x * 0.01 + y * 0.05) * 4); R.pset(x, y, v > 0.75 ? hex('#a87a4a') : v < -0.8 ? hex('#d8aa72') : hh(x, y, 1) < 0.02 ? hex('#9a6a3a') : hex('#c8945e')); }
  // la libreta con los dibujos de los fosos (sin letras), abajo a la izquierda
  R.rect(4, 118, 104, 179, K); R.rect(5, 119, 103, 179, hex('#f4ecc8')); for (let y = 126; y < 179; y += 6) R.rect(6, y, 102, y, hex('#a8c8e8')); R.rect(12, 119, 13, 179, hex('#e88a8a'));
  for (let k = 0; k < 3; k++) { const x = 20 + k * 27; R.rect(x, 150, x + 14, 151, hex('#2a2a6a')); R.rect(x + 4, 151, x + 10, 160, hex('#2a2a6a')); R.rect(x + 5, 152, x + 9, 159, hex('#f4ecc8')); }
  R.rect(24, 134, 26, 140, hex('#2a2a6a')); R.disco(25, 132, 2, hex('#2a2a6a')); R.linea(28, 134, 40, 128, hex('#2a2a6a')); R.linea(40, 128, 50, 134, hex('#2a2a6a'));
  // los manuales apilados, el bote de lápices, la placa de prototipo y la lámpara
  for (let k = 0; k < 4; k++) { const y = 74 - k * 6; R.rect(6 + k, y, 62 - k, y + 6, K); R.rect(7 + k, y + 1, 61 - k, y + 5, [hex('#c8303a'), hex('#3a6ac8'), hex('#e8c040'), hex('#3a9a4a')][k]); R.rect(7 + k, y + 1, 61 - k, y + 1, BL); }
  R.rect(72, 66, 86, 88, K); R.rect(73, 67, 85, 87, hex('#5a6a8a')); for (const [x, c] of [[75, '#e8c040'], [79, '#c8303a'], [82, '#3a8ae8']]) R.rect(x, 58, x + 1, 66, hex(c));
  R.rect(118, 142, 196, 176, K); R.rect(119, 143, 195, 175, hex('#2a7a3a')); for (let k = 0; k < 3; k++) { R.rect(128 + k * 22, 152, 144 + k * 22, 161, K); for (let i = 0; i < 7; i++) { R.pset(129 + k * 22 + i * 2, 151, hex('#c8c8d0')); R.pset(129 + k * 22 + i * 2, 162, hex('#c8c8d0')); } } for (let x = 122; x < 192; x += 3) R.pset(x, 170, hex('#e8c040')); R.rect(184, 144, 192, 150, hex('#3a3a44'));
  R.rect(110, 98, 118, 102, K); R.rect(111, 99, 117, 101, hex('#d8d8e0'));
  // el papel continuo de la impresora, plegado en acordeón, con las rayas verdes y los agujeros de arrastre
  for (let k = 0; k < 4; k++) { const y = 82 - k * 3; R.rect(252 + k, y, 312 - k, y + 16, K); R.rect(253 + k, y + 1, 311 - k, y + 15, BL); for (let j = 0; j < 3; j++) R.rect(258 + k, y + 3 + j * 4, 306 - k, y + 4 + j * 4, hex('#c8e8c8')); for (let j = 0; j < 4; j++) { R.pset(255 + k, y + 2 + j * 4, hex('#8a8a94')); R.pset(309 - k, y + 2 + j * 4, hex('#8a8a94')); } }
  R.usar(prev); R.copiar(F4);
};
const p4 = (t) => {
  fondo4();
  // la taza de café humeante
  R.disco(222, 150, 12, K); R.disco(222, 150, 11, hex('#e8e0d0')); R.disco(222, 148, 8, hex('#4a2a14')); R.rect(232, 144, 238, 154, K); R.rect(233, 146, 237, 152, hex('#e8e0d0')); R.pset(219, 146, hex('#7a5a3a'));
  for (let k = 0; k < 6; k++) { const u = (t * 0.6 + k / 6) % 1; R.pset(Math.round(222 + Math.sin(u * 6 + k) * 3), Math.round(136 - u * 26), u < 0.5 ? hex('#f0ece4') : hex('#c8c0b4')); }
  // las cinco semanas: cinco hojas de taco que aparecen en «five» y se van tachando (gag 2: el tiempo vuela)
  for (let k = 0; k < 5; k++) { const t0 = CINCO - 0.1 + k * 0.08; if (t < t0) continue; const x = 98 + k * 30, y = 62, s = tramo(t, t0, t0 + 0.15);
    R.rect(x, y - Math.round((1 - s) * 4), x + 24, y + 30, K); R.rect(x + 1, y + 1, x + 23, y + 29, BL); R.rect(x + 1, y + 1, x + 23, y + 6, hex('#c8303a'));
    for (let j = 0; j < 3; j++) for (let i = 0; i < 7; i++) R.rect(x + 3 + i * 3, y + 10 + j * 5, x + 4 + i * 3, y + 11 + j * 5, hex('#8a8a94'));
    const ta = tramo(t, CINCO + 0.9 + k * 0.42, CINCO + 1.15 + k * 0.42); if (ta > 0) { const n = Math.round(ta * 18); for (let i = 0; i < n; i++) { R.rect(x + 3 + i, y + 8 + i, x + 4 + i, y + 9 + i, hex('#d82a2a')); R.rect(x + 20 - i, y + 8 + i, x + 21 - i, y + 9 + i, hex('#d82a2a')); } } }
  if (t > CINCO - 0.1) { const s = tramo(t, CINCO - 0.1, CINCO + 0.15); R.numero('5', 172, Math.round(126 - s * 4), { tam: 16, centro: true }); }
  // la mano de Warshaw (camisa de cuadros roja) dibuja en la libreta; se para cuando llega el reloj
  const dib = t < DADO + 0.2, lx = 44 + Math.round(dib ? Math.sin(t * 9) * 8 : 0), ly = 150 + Math.round(dib ? Math.cos(t * 7) * 3 : 0);
  T.brazo(R, -14, 194, lx, ly, '#c83a3a', 1);
  R.linea(lx + 9, ly - 2, lx + 15, ly - 10, K); R.linea(lx + 10, ly - 2, lx + 16, ly - 10, hex('#e8c040')); R.pset(lx + 8, ly - 1, K);
  // la mano del jefe deja el reloj de arena en «given» y se va
  const ba = tramo(t, P4 + 0.05, DADO + 0.15), va = tramo(t, DADO + 0.5, DADO + 1.0);
  const rx = 282, ry = 150 - Math.round((1 - ba) * 36);
  const arena = tramo(t, DADO + 0.2, P4 + 4.4);
  R.rect(rx - 10, ry - 34, rx + 10, ry - 31, K); R.rect(rx - 9, ry - 33, rx + 9, ry - 32, hex('#8a5a2a')); R.rect(rx - 10, ry - 1, rx + 10, ry + 2, K); R.rect(rx - 9, ry, rx + 9, ry + 1, hex('#8a5a2a'));
  for (let j = 0; j < 29; j++) { const y = ry - 30 + j, w = Math.round(1 + Math.abs(j - 14) * 0.55); R.rect(rx - w - 1, y, rx + w + 1, y, K); R.rect(rx - w, y, rx + w, y, hex('#d8eef4'));
    const arriba = j < 14 && j > 14 - Math.round((1 - arena) * 12), abajo = j > 28 - Math.round(arena * 12); if (arriba || abajo) R.rect(rx - w, y, rx + w, y, hex('#e8c060')); }
  if (arena > 0 && arena < 1) for (let y = ry - 15; y < ry - 1; y++) if ((y + Math.floor(t * 20)) % 2) R.pset(rx, y, hex('#e8c060'));
  if (va < 1) T.brazo(R, 340, 196, rx + 12 + Math.round(va * 40), ry - 16 + Math.round(va * 40), '#dfe6ee', -1);
};

const efectos = [[CIERRA, 'palmada'], [H1 + 0.1, 'papel'], [H2 + 0.1, 'papel'], [UNO, 'lapiz'], [SEIS, 'tic'], [RAID, 'brillo'], [DADO, 'golpecito'], [CINCO, 'pop'], [CINCO + 1.0, 'lapiz']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1982 });
''')
