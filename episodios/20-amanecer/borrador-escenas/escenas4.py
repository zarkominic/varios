E = {}

E['jh-cosecha'] = ('La cosecha', '''// JH-COSECHA (frases 20–21), Juegos 50. Tres planos:
// 1. (calle 'puerta', amanecer) en el porche, la madre abraza a Haymitch y el hermano pequeño le tira de la manga; un
//    agente de la paz llega por la derecha y le hace señas con el silbato en «reaping»; en «torn away» Haymitch se suelta
//    y echa a andar; la madre alarga la mano, triste; corta en «from».
// 2. (bosque 'arbol', amanecer) bajo el árbol viejo, Lenore Dove llega corriendo; en «the girl he loves» se cogen de
//    la mano y sale un corazón; el agente los separa y se lleva a Haymitch; a Lenore se le cae una pluma de colores que
//    baja revoloteando; corta en «are» (antes de «48»).
// 3. (plaza 'escenario', antigua: altavoces de bocina, sin pantallas) Drusilla en el micrófono con el abanico; la urna de
//    la derecha se desborda de papeletas y el pan con ojos sale nadando entre ellas (gag 2) y cae detrás de la barandilla;
//    en «four» salta un 4 dorado y suben cuatro tributos por los lados hasta sus marcas; en «two boys» y «two girls», un
//    2 sobre cada pareja.''', r'''
const a = (f) => en('cosecha', f), b = (f) => en('cuatro', f);
const P2 = a(0.62), P3 = b(0.08);
const reaping = a(0.27), torn = a(0.53), chica = a(0.83), cuatro = b(0.64), chicos = b(0.79), chicas = b(0.89);
const K = T.C.k;
const CORA = ['.kk.kk.', 'krrkrrk', 'krRrrrk', 'krrrrrk', '.krrrk.', '..krk..', '...k...'];
const PCORA = { k: K, r: hex('#e8486a'), R: hex('#ffb0c0') };
// p1 · la despedida en el porche
const p1 = (t) => {
  T.distrito(R, t, { encuadre: 'calle', camara: 'puerta' });
  const va = tramo(t, a(0.47), P2 + 0.2), hx = Math.round(lerp(170, 226, va));
  // la madre sale al umbral: la mano en el hombro de su hijo y, al irse él, la alarga
  const sm = tramo(t, 0.1, 0.9), mx = Math.round(lerp(150, 154, sm));
  R.actor(EL.madreHaymitch, mx, Math.round(lerp(160, 166, sm)), t, { dir: 1, triste: true, anda: sm > 0 && sm < 1, sostiene: sm < 1 ? false : va < 0.05 ? [hx + 2, 146] : [mx + 24, 146 - Math.round(va * 3)] });
  // el hermano pequeño le tira de la manga y, cuando se va, da dos pasos detrás de él
  const hm = Math.round(lerp(118, 150, tramo(t, torn + 0.2, torn + 1.1)));
  R.actor(EL.hermanoHaymitch, hm, 168, t, { dir: 1, triste: t > torn, sorpresa: t > reaping && t < torn, sostiene: va < 0.05 ? [Math.min(hm + 22, hx + 2), 152] : false, anda: t > torn + 0.2 && t < torn + 1.1 });
  R.actor(EL.haymitch, hx, 166, t, { dir: va > 0 ? 1 : -1, anda: va > 0 && va < 1, habla: t < reaping && Math.sin(t * 7) > 0.2, enfado: t > reaping && t < torn, sonrisa: t < reaping - 0.6 });
  // el agente de la paz llega por la derecha y hace señas con el silbato
  const ag = tramo(t, 0.4, reaping - 0.1), ax = Math.round(lerp(334, 236, ag));
  const r = R.actor(EL.agentePaz, ax, 166, t, { dir: -1, anda: ag > 0 && ag < 1, dedo: t > reaping && t < torn + 0.3, habla: t > torn + 0.3 && Math.sin(t * 6) > 0 });
  if (t > reaping && t < reaping + 0.7) { const [cx, cy] = r.cabeza; R.rect(cx - 9, cy + 7, cx - 6, cy + 8, hex('#c8ccd8')); for (let k = 0; k < 3; k++) { const u = ((t - reaping) * 3 + k / 3) % 1; R.pset(cx - 12 - Math.round(u * 8), cy + 4 - k * 2, hex('#ffffff')); } }
};
// p2 · bajo el árbol viejo del bosque, al amanecer: Lenore Dove llega corriendo; se cogen de la mano; el agente se lo
// lleva; a ella se le cae una pluma
const p2 = (t) => {
  T.distrito(R, t, { encuadre: 'bosque', camara: 'arbol', luz: 'amanecer' });
  const llega = tramo(t, P2 + 0.1, chica - 0.15), lx = Math.round(lerp(70, 196, llega));
  const suelta = a(1) + 0.15, sx = tramo(t, suelta, P3 - 0.1), hx = Math.round(lerp(216, 300, sx));
  const cog = t > chica - 0.15 && t < suelta;
  R.actor(EL.lenore, lx, 164, t, { dir: 1, anda: llega > 0 && llega < 1, sonrisa: cog || (llega > 0 && llega < 1), triste: t >= suelta, sostiene: cog ? [lx + 18, 150] : t >= suelta + 0.3 ? [lx + 20, 142 - Math.round(Math.sin(t * 9) * 2)] : false });
  R.actor(EL.haymitch, hx, 164, t, { dir: t < suelta ? -1 : 1, anda: sx > 0 && sx < 1, sonrisa: cog, sostiene: cog ? [hx - 3, 150] : false, triste: t >= suelta, sorpresa: t < P2 + 0.8 });
  // el agente de la paz aparece por la derecha y le hace señas
  const ae = tramo(t, chica + 0.3, suelta - 0.2), ag = Math.round(lerp(334, 262, ae) + lerp(0, 70, sx));
  R.actor(EL.agentePaz, ag, 164, t, { dir: sx > 0 ? 1 : -1, anda: (ae > 0 && ae < 1) || (sx > 0 && sx < 1), dedo: ae >= 1 && sx <= 0, habla: ae >= 1 && sx <= 0 && Math.sin(t * 7) > 0 });
  // el corazón que sube entre los dos
  const c = tramo(t, chica, chica + 1.1); if (c > 0 && c < 1) R.dibujo(CORA, lx + 18, Math.round(134 - c * 16), 1, PCORA);
  // la pluma que se le cae a Lenore y baja revoloteando
  const p = tramo(t, suelta + 0.2, P3 - 0.1);
  if (p > 0) { const px = Math.round(lerp(lx + 4, lx + 22, p) + Math.sin(p * 12) * 4), py = Math.round(lerp(134, 163, p));
    R.linea(px, py, px + (Math.sin(p * 12) > 0 ? 2 : -2), py + 4, K); R.pset(px, py, hex('#e8484a')); R.pset(px + 1, py + 1, hex('#f0c040')); R.pset(px, py + 2, hex('#3ab0e8')); R.pset(px - 1, py + 1, hex('#e8484a')); }
};
// p3 · la cosecha en el escenario: la urna se desborda, el pan nada, suben cuatro
const p3 = (t) => {
  const o = { encuadre: 'plaza', camara: 'escenario', luz: 'dia', antigua: true, urna: 1, desborda: t > P3 + 1.0 };
  T.distrito(R, t, o);
  // dos agentes de la paz de guardia al fondo del escenario, que respiran y se miran
  R.actor(EL.agentePaz, 68, 140, t, { dir: 1, sorpresa: t > P3 + 0.6 && t < P3 + 1.6 });
  R.actor(EL.agentePaz, 240, 140, t, { dir: -1, dedo: t > cuatro - 0.4 && t < cuatro + 0.6 });
  // Drusilla va a la urna de la derecha, mete la mano y sale una ola de papeletas (con el pan); vuelve al micrófono con
  // la papeleta y lee
  const ida = tramo(t, P3 + 0.05, P3 + 0.9), vuelta = tramo(t, P3 + 1.9, b(0.5)), drx = Math.round(lerp(146, 232, ida) - lerp(0, 86, vuelta));
  const meteM = ida >= 1 && vuelta <= 0, lee = vuelta > 0;
  const dr = R.actor(EL.drusilla, drx, 146, t, { dir: vuelta > 0 && vuelta < 1 ? -1 : 1, anda: (ida > 0 && ida < 1) || (vuelta > 0 && vuelta < 1), habla: t > b(0.5) && t < cuatro && Math.sin(t * 8) > 0, sostiene: meteM ? [258, 118] : lee ? [drx + 20, 124] : false, sorpresa: t > P3 + 1.0 && t < P3 + 2.2, sonrisa: t > cuatro });
  if (lee) { const [mx, my] = dr.mano; R.rect(mx - 1, my - 7, mx + 5, my - 1, K); R.rect(mx, my - 6, mx + 4, my - 2, hex('#f6f2e6')); R.linea(mx + 1, my - 4, mx + 3, my - 4, hex('#a89880')); }
  // los cuatro tributos: los chicos por la izquierda, las chicas por la derecha
  const sube = (k) => tramo(t, cuatro - 0.1 + k * 0.18, chicos - 0.1 + k * 0.12);
  const TR = [[EL.haymitch, 40, 96, 1], [EL.tributoChico, 14, 124, 1], [EL.maysilee, 300, 190, -1], [EL.tributoChica, 278, 218, -1]];
  TR.forEach(([d, x0, x1, dir], k) => { const u = sube(k); if (u <= 0) return; const x = Math.round(lerp(x0, x1, u));
    R.actor(d, x, 146, t, { dir: u < 1 ? dir : (k < 2 ? 1 : -1), anda: u < 1, salto: u > 0.15 && u < 0.32 ? 2 : 0, sorpresa: u >= 1 && t < chicas + 0.3, triste: u >= 1 && t >= chicas + 0.3, enfado: d === EL.maysilee && u >= 1 }); });
  // el pan con ojos sale nadando entre las papeletas de la urna derecha y cae detrás de la barandilla (gag 2)
  const n0 = P3 + 1.0, n1 = cuatro - 0.6;
  if (t > n0 && t < n1 + 0.7) {
    if (t < n1) { const u = tramo(t, n0, n1); T.pan(R, 272 + Math.round(Math.sin(u * 7) * 6), Math.round(lerp(94, 82, u)), t, { nada: true, expresion: u > 0.6 ? 'risa' : 'normal' }); }
    else { const u = tramo(t, n1, n1 + 0.7); T.pan(R, Math.round(lerp(272, 248, u)), Math.round(82 - Math.sin(u * Math.PI) * 14 + u * 64), t, { expresion: 'susto' }); }
  }
  T.distritoDelante(R, t, o);
  // el 4 dorado en «four» y un 2 sobre cada pareja
  const c4 = tramo(t, cuatro, cuatro + 0.25); if (c4 > 0 && t < chicos) R.numero('4', 160, Math.round(lerp(70, 58, c4)), { tam: 16, centro: true });
  if (t > chicos) R.numero('2', 118, Math.round(108 - tramo(t, chicos, chicos + 0.2) * 6), { tam: 16, centro: true });
  if (t > chicas) R.numero('2', 212, Math.round(108 - tramo(t, chicas, chicas + 0.2) * 6), { tam: 16, centro: true });
};
const efectos = [[reaping, 'silbato'], [chica, 'pop'], [P3 + 1.0, 'papel'], [P3 + 1.3, 'chof'], [cuatro - 0.6, 'boing'], [cuatro, 'brillo'], [chicos, 'pop'], [chicas, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 50 });
''')

E['jh-grabacion'] = ('La grabación', '''// JH-GRABACION (frases 22–23). Cuatro planos:
// 1. (fondo local, de cerca: la mesita del salón de la casa de los vencedores, de noche) una caja de cintas viejas con
//    números en el lomo; la del «50» brilla en «don't know»; en «How those games ended» la mano de Katniss la coge y la
//    saca de la caja; corta en «already».  Juegos 75.
// 2. (interior 'tele' general) Katniss mete la cinta en la tele; en «revealed years ago» la nieve de la pantalla se
//    vuelve el prado de flores; vuelve a su butaca y se sienta a mirar; corta en «Katniss».
// 3. (interior 'tele' pantalla) en la cinta, el prado de los Juegos 50: Haymitch joven en el prado; en «wins» levanta
//    los brazos con confeti y una corona; en «force field» brilla el filo de la cúpula; corta en «around».
// 4. (arena 'cupula' general, Juegos 50) la maqueta de la arena: una piedra sale del prado, choca en «edge» con el borde
//    invisible (destello y anillos) y vuelve rebotando en «throws back»; los dos vigilantes se quedan boquiabiertos.''', r'''
const a = (f) => en('contaron', f), b = (f) => en('campo', f);
const P2 = a(0.55), P3 = b(0.10), P4 = b(0.50);
const K = T.C.k, W = hex('#ffffff');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, u) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * u) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * u) << 8) | Math.round(r1 + ((c2 & 255) - r1) * u)) >>> 0; };
// ── p1: el fondo local de la mesita con la caja de cintas (lo fijo, en un búfer) ──
const NUM = [['46', '47', '48', '49'], ['45', '50', '51', '52']];
const OX = 58, COLX = [76 + OX, 152 + OX], FILY = [84, 97, 110, 123], CINTA_W = 72;
const VEN = [178, 14, 250, 62];
let F1 = null;
const fondo1 = () => {
  if (F1) { R.copiar(F1); return; }
  F1 = R.nuevo(); const prev = R.usar(F1);
  // la pared: papel pintado oscuro a rayas con rombos pequeños; a la derecha, en sombra lisa (rincón de Atom)
  for (let y = 0; y < 92; y++) for (let x = 0; x < 320; x++) {
    const raya = (x >> 3) & 1, rom = (Math.abs(((x + 4) % 16) - 8) + Math.abs(((y + (raya ? 8 : 0)) % 16) - 8)) === 4;
    let c = raya ? hex('#2e2638') : hex('#352c42'); if (rom && x < 262) c = hex('#4a3e58');
    if (x >= 262) c = ((x + y) & 1) && x < 270 ? hex('#2e2638') : hex('#241e2c');
    if (y > 82) c = hex('#1e1824');
    R.pset(x, y, c);
  }
  R.rect(0, 80, 319, 81, hex('#5a4a3a')); R.rect(0, 82, 319, 84, hex('#3a2e26'));   // el zócalo
  // el cuadro dorado con un lago y un bosque
  const QX = 92; R.rect(QX, 24, QX + 54, 60, K); R.rect(QX + 1, 25, QX + 53, 59, hex('#c8962a')); R.rect(QX + 3, 27, QX + 51, 57, hex('#8a6418'));
  for (let y = 29; y <= 55; y++) for (let x = QX + 5; x <= QX + 49; x++) R.pset(x, y, y < 40 ? (hh(x, y) < 0.15 ? hex('#f8c890') : hex('#e89a6a')) : y < 46 ? hex('#2e5a3a') : (hh(x, y, 1) < 0.3 ? hex('#8ac0d8') : hex('#4a8ab0')));
  for (let k = 0; k < 7; k++) { const x = QX + 8 + k * 6; R.poligono([[x, 46], [x + 3, 34 + (k % 3) * 2], [x + 6, 46]], hex('#1e3a28')); }
  R.rect(QX + 1, 25, QX + 53, 25, hex('#f0c860')); R.pset(QX + 27, 21, K); R.linea(QX + 27, 21, QX + 2, 25, hex('#6a5a4a')); R.linea(QX + 27, 21, QX + 52, 25, hex('#6a5a4a'));
  // la ventana de noche (lo que se ve se pinta vivo): marco de madera y alféizar
  R.rect(VEN[0] - 4, VEN[1] - 4, VEN[2] + 4, VEN[3] + 4, K); R.rect(VEN[0] - 3, VEN[1] - 3, VEN[2] + 3, VEN[3] + 3, hex('#5a3e2a')); R.rect(VEN[0], VEN[1], VEN[2], VEN[3], hex('#0e1a3a'));
  R.rect(VEN[0] - 4, VEN[3] + 4, VEN[2] + 6, VEN[3] + 8, hex('#6a4a32')); R.rect(VEN[0] - 4, VEN[3] + 4, VEN[2] + 6, VEN[3] + 4, hex('#8a6a48'));
  // la lámpara de mesa: pantalla de tela con flecos
  const LX = 50; R.poligono([[LX - 16, 38], [LX + 16, 38], [LX + 24, 62], [LX - 24, 62]], (x, y) => ((x + y) & 1 ? hex('#e8b860') : hex('#d8a048')));
  R.linea(LX - 16, 38, LX + 16, 38, K); R.linea(LX - 24, 62, LX + 24, 62, K); R.linea(LX - 16, 38, LX - 24, 62, K); R.linea(LX + 16, 38, LX + 24, 62, K);
  for (let x = LX - 22; x <= LX + 22; x += 3) R.pset(x, 63, hex('#a86a28'));
  R.rect(LX - 2, 63, LX + 1, 92, hex('#8a7a5a')); R.rect(LX - 10, 92, LX + 9, 96, hex('#6a5a3a'));
  // el tablero de la mesa: tablas con vetas, nudos y la luz de la lámpara
  for (let y = 88; y < 180; y++) for (let x = 0; x < 320; x++) {
    const tabla = Math.floor((y - 88) / 23), vy = y + Math.sin(x * 0.045 + tabla * 2.1) * 3 + Math.sin(x * 0.17 + tabla) * 0.8;
    const veta = Math.abs(((vy * 0.7) % 4) - 2) < 0.35, luz = Math.max(0, 1 - Math.hypot(x - LX, (y - 92) * 1.6) / 170);
    let c = (y - 88) % 23 === 0 ? hex('#2a1810') : veta ? hex('#5a3420') : hex('#7a4a2c');
    if (!veta && (y - 88) % 23 !== 0 && hh(x, y, 3) < luz * 0.7) c = hex('#9a6238');
    if (hh(x >> 2, y >> 1, 5) < 0.004) c = hex('#3a2014');
    if (y < 97 && x > LX - 11 && x < LX + 10) continue;
    R.pset(x, y, c);
  }
  for (const [nx, ny] of [[96, 104], [26, 170], [300, 128]]) { R.disco(nx, ny, 3, hex('#4a2818')); R.anillo(nx, ny, 4, hex('#5a3420')); }
  // el tapete de ganchillo bajo la caja
  for (let y = 132; y < 172; y++) for (let x = 56 + OX; x < 250 + OX && x < 320; x++) { const d = Math.hypot((x - 153 - OX) / 98, (y - 152) / 21); if (d < 1 && (((x >> 1) + (y >> 1)) % 3 !== 0 || d > 0.92)) R.pset(x, y, d > 0.92 ? hex('#d8d0c0') : hex('#efe8d8')); }
  // la caja de cartón: la solapa de atrás y el hueco
  R.poligono([[64 + OX, 70], [236 + OX, 70], [228 + OX, 80], [72 + OX, 80]], hex('#c89a62')); R.linea(64 + OX, 70, 236 + OX, 70, K);
  R.rect(70 + OX, 80, 230 + OX, 140, hex('#2a1e14')); R.rect(70 + OX, 80, 70 + OX, 140, K); R.rect(230 + OX, 80, 230 + OX, 140, K);
  // la mesita: la taza roja (humea viva), el mando, dos fundas de cinta, un lápiz y unas gafas
  R.rect(14, 140, 36, 166, K); R.rect(15, 141, 35, 165, hex('#c84a3a')); R.rect(15, 141, 17, 165, hex('#e86a5a'));
  R.rect(15, 140, 35, 143, hex('#3a2014')); R.rect(36, 146, 41, 158, K); R.rect(37, 147, 39, 157, hex('#c84a3a'));
  R.rect(56, 160, 94, 170, K); R.rect(57, 161, 93, 169, hex('#3a3a44')); for (let k = 0; k < 5; k++) { R.rect(60 + k * 6, 163, 62 + k * 6, 164, k === 0 ? hex('#e83a3a') : hex('#8a8a96')); R.rect(60 + k * 6, 166, 62 + k * 6, 167, hex('#6a6a76')); }
  R.rect(10, 100, 56, 108, K); R.rect(11, 101, 55, 107, hex('#1a1a20')); R.rect(15, 102, 35, 106, hex('#e8e0c8')); R.numero('36', 26, 107, { color: K, sombra: false, centro: true });
  R.rect(60, 116, 104, 126, K); R.rect(61, 117, 103, 125, hex('#1a1a20')); R.rect(66, 119, 86, 123, hex('#e8e0c8')); R.numero('12', 77, 124, { color: K, sombra: false, centro: true });
  R.linea(20, 128, 46, 136, K); R.linea(20, 127, 46, 135, hex('#f0c040')); R.pset(46, 135, hex('#f6c290')); R.pset(47, 136, K);
  R.anillo(84, 146, 5, K); R.anillo(98, 146, 5, K); R.linea(89, 145, 93, 145, K); R.disco(84, 146, 4, hex('#8ab0c8')); R.disco(98, 146, 4, hex('#8ab0c8')); R.pset(82, 144, hex('#ffffff')); R.pset(96, 144, hex('#ffffff'));
  R.usar(prev); R.copiar(F1);
};
const cinta = (x, y, num, brillo) => {
  R.rect(x, y, x + CINTA_W, y + 11, K); R.rect(x + 1, y + 1, x + CINTA_W - 1, y + 10, hex('#202028')); R.rect(x + 1, y + 1, x + CINTA_W - 1, y + 1, hex('#4a4a56'));
  const lx = x + 20; R.rect(lx, y + 2, lx + 32, y + 9, brillo ? hex('#f8d860') : hex('#ece4d0')); R.rect(lx, y + 9, lx + 32, y + 9, hex('#b8ae98'));
  R.numero(num, lx + 17, y + 9, { color: K, sombra: false, centro: true });
  R.rect(x + 4, y + 4, x + 12, y + 7, hex('#3a3a46')); R.rect(x + 60, y + 4, x + 68, y + 7, hex('#3a3a46'));
};
const coge = a(0.35), saca0 = a(0.38);
const p1 = (t) => {
  fondo1();
  // por la ventana: la luna, las estrellas, los tejados con nieve, una ventana encendida y la nieve que cae
  const [v0, w0, v1, w1] = VEN; R.recorte(VEN);
  R.disco(v0 + 52, w0 + 12, 6, hex('#f4ecd0')); R.disco(v0 + 54, w0 + 11, 5, hex('#fff8e8'));
  for (let k = 0; k < 14; k++) { const x = v0 + Math.floor(hh(k, 1) * 72), y = w0 + Math.floor(hh(k, 2) * 26); if (Math.sin(t * 3 + k) > -0.3) R.pset(x, y, hex('#c8d0f0')); }
  R.poligono([[v0 - 2, w1 + 1], [v0 - 2, w1 - 12], [v0 + 18, w1 - 22], [v0 + 36, w1 - 12], [v0 + 36, w1 - 8], [v0 + 54, w1 - 18], [v1 + 2, w1 - 10], [v1 + 2, w1 + 1]], hex('#1a2238'));
  R.linea(v0 - 2, w1 - 12, v0 + 18, w1 - 22, hex('#e8f0ff')); R.linea(v0 + 18, w1 - 22, v0 + 36, w1 - 12, hex('#e8f0ff')); R.linea(v0 + 36, w1 - 8, v0 + 54, w1 - 18, hex('#e8f0ff')); R.linea(v0 + 54, w1 - 18, v1 + 2, w1 - 10, hex('#e8f0ff'));
  R.disco(v0 + 26, w1 - 8, 2, Math.sin(t * 1.3) > -0.6 ? hex('#f8c860') : hex('#a87a30'));
  for (let k = 0; k < 22; k++) { const x = v0 + ((Math.floor(hh(k, 4) * 72) + Math.round(Math.sin(t + k) * 3)) % 72), y = w0 + ((Math.floor(hh(k, 5) * 48) + Math.floor(t * (8 + k % 5))) % 48); R.pset(x, y, hex('#ffffff')); }
  R.recorte(null);
  R.rect(v0 + 35, w0, v0 + 36, w1, hex('#5a3e2a')); R.rect(v0, w0 + 24, v1, w0 + 25, hex('#5a3e2a'));
  // la lámpara que titila un poco
  if (Math.sin(t * 13) > 0.85) R.rect(36, 54, 64, 60, hex('#f8d888'));
  // las cintas en la caja; la del 50 brilla y la mano la saca por la derecha
  const sale = tramo(t, saca0, P2 - 0.2), dx = Math.round(sale * sale * 90), dy = -Math.round(sale * 10);
  NUM.forEach((col, i) => col.forEach((n, j) => { if (n === '50') return; cinta(COLX[i], FILY[j], n, false); }));
  // la cara de delante de la caja, con la cinta de embalar y un número escrito a rotulador
  R.rect(66 + OX, 128, 234 + OX, 158, K); R.rect(67 + OX, 129, 233 + OX, 157, hex('#b8844e')); R.rect(67 + OX, 129, 233 + OX, 131, hex('#d8a46a'));
  for (let x = 70 + OX; x < 232 + OX; x += 7) R.pset(x, 140 + ((x >> 3) % 3), hex('#9a6a3a'));
  R.rect(140 + OX, 129, 160 + OX, 157, hex('#d8c8a0')); R.rect(140 + OX, 129, 160 + OX, 129, hex('#f0e4c4')); R.linea(140 + OX, 157, 160 + OX, 129, hex('#c8b890'));
  R.numero('1-74', 100 + OX, 150, { color: hex('#3a2a1a'), sombra: false, centro: true });
  const bril = t > a(0.12) && t < coge + 0.2 && Math.floor(t * 6) % 2 === 0;
  cinta(COLX[1] + dx, FILY[1] + dy, '50', bril || t > a(0.12));
  if (bril) for (const [sx, sy] of [[COLX[1] + 18, FILY[1] - 3], [COLX[1] + 56, FILY[1] + 13]]) { R.pset(sx, sy, W); R.pset(sx - 1, sy, hex('#f8e880')); R.pset(sx + 1, sy, hex('#f8e880')); R.pset(sx, sy - 1, hex('#f8e880')); R.pset(sx, sy + 1, hex('#f8e880')); }
  // la mano de Katniss (cazadora marrón) entra por el borde derecho, agarra el extremo de la cinta y tira
  const entra = tramo(t, a(0.22), coge);
  if (entra > 0) { const wx = Math.round(lerp(340, COLX[1] + CINTA_W + 13, entra)) + dx, wy = FILY[1] + 6 + dy;
    T.brazo(R, wx + 40, wy + 14, wx, wy, '#7a5a3a', -1); }
  // la taza que humea
  for (let k = 0; k < 3; k++) { const u = ((t * 0.5 + k / 3) % 1); R.pset(25 + Math.round(Math.sin(u * 6 + k) * 2), 136 - Math.round(u * 18), u < 0.6 ? hex('#d8d0c8') : hex('#8a8090')); }
  // la luz azul de la tele (fuera de plano, a la izquierda) que parpadea sobre la mesa
  const fl = 0.18 + 0.1 * Math.sin(t * 9) + 0.06 * Math.sin(t * 23);
  for (let y = 100; y < 180; y += 1) for (let x = 0; x < 24; x++) if (((x + y) & 1) && hh(x, y, 9) < fl * (24 - x) / 24 * 2) R.pset(x, y, mez(R.pget(x, y), hex('#6a9ae8'), 0.35));
};
// ── p2: Katniss mete la cinta y se sienta a mirar ──
const enc = a(0.68), mete = P2 + 0.9, vuelve0 = enc + 0.3, sienta = b(0) - 0.1;
const p2 = (t) => {
  const o = { encuadre: 'tele', camara: 'general', lampara: true, pantalla: t < mete + 0.2 ? 'apagada' : t < enc ? 'nieve' : 'prado' };
  T.interior(R, t, o);
  const ida = tramo(t, P2 + 0.05, mete - 0.25), vuelta = tramo(t, vuelve0, sienta);
  let x, s, dir = 1, anda = false;
  if (vuelta <= 0) { x = Math.round(lerp(130, 194, ida)); s = 156; anda = ida > 0 && ida < 1; }
  else { x = Math.round(lerp(194, 86, vuelta)); s = Math.round(lerp(156, 172, vuelta * vuelta)); dir = vuelta < 1 ? -1 : 1; anda = vuelta < 1; }
  const lleva = t < mete;
  const r = R.actor(EL.katniss, x, s, t, { dir, anda, sostiene: lleva ? (t > mete - 0.25 ? [219, 126] : true) : false, sorpresa: t > enc && t < enc + 0.8 && vuelta <= 0, sonrisa: vuelta >= 1 });
  if (lleva) { const [mx, my] = r.mano; R.rect(mx - 1, my - 4, mx + 9, my + 1, K); R.rect(mx, my - 3, mx + 8, my, hex('#202028')); R.rect(mx + 2, my - 3, mx + 6, my - 1, hex('#f8d860')); }
  T.interiorDelante(R, t, o);
};
// ── p3: la cinta en la pantalla: el prado de los Juegos 50 y Haymitch que gana ──
const gana = b(0.33), filo = b(0.44);
const prado = (R, t, [x0, y0, x1, y1]) => {
  const w = x1 - x0, hz = y0 + Math.round((y1 - y0) * 0.42);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let c;
    if (y < hz) { const u = (y - y0) / (hz - y0); c = hh(x, y) < u ? hex('#a8d8f0') : hex('#78b8e8'); }
    else { const u = (y - hz) / (y1 - hz); c = hh(x, y, 2) < u * 0.6 ? hex('#3a8a3a') : hex('#5ab84a'); }
    R.pset(x, y, c);
  }
  // nubes que pasan
  for (let k = 0; k < 3; k++) { const cx = x0 + ((k * 61 + t * (4 + k * 2)) % (w + 40)) - 20, cy = y0 + 8 + k * 6; R.disco(cx, cy, 5, hex('#ffffff')); R.disco(cx + 6, cy + 1, 4, hex('#f0f4f8')); R.disco(cx - 6, cy + 1, 4, hex('#e0e8f0')); }
  // la montaña con dos picos y nieve, el bosque
  R.poligono([[x0 + 10, hz], [x0 + 44, y0 + 14], [x0 + 60, y0 + 24], [x0 + 78, y0 + 10], [x0 + 118, hz]], hex('#6a7a9a'));
  R.poligono([[x0 + 38, y0 + 20], [x0 + 44, y0 + 14], [x0 + 50, y0 + 20]], hex('#ffffff')); R.poligono([[x0 + 72, y0 + 16], [x0 + 78, y0 + 10], [x0 + 84, y0 + 16]], hex('#ffffff'));
  for (let k = 0; k < 10; k++) { const x = x0 + 4 + k * 15, yb = hz + 4; R.poligono([[x, yb], [x + 4, yb - 10 - (k % 3) * 2], [x + 8, yb]], hex('#1e5a32')); }
  // la cornucopia dorada
  R.poligono([[x0 + 96, hz + 18], [x0 + 118, hz + 10], [x0 + 124, hz + 20], [x0 + 104, hz + 24]], hex('#e8b830')); R.disco(x0 + 99, hz + 21, 3, hex('#8a6418'));
  // las flores del prado que se mecen
  for (let k = 0; k < 60; k++) { const fx = x0 + Math.floor(hh(k, 7) * w), fy = hz + 8 + Math.floor(hh(k, 8) * (y1 - hz - 10)), m = Math.round(Math.sin(t * 2 + k) * 1);
    R.pset(fx + m, fy, [hex('#f8e040'), hex('#e84a8a'), hex('#ffffff'), hex('#a84ae8')][k % 4]); R.pset(fx, fy + 1, hex('#2e7a2e')); }
  // Haymitch joven en el prado: anda hacia el centro y, en «wins», levanta los brazos
  const u = tramo(t, P3 + 0.2, gana - 0.1), hx = Math.round(lerp(x0 + 20, x0 + 66, u)), sy = y1 - 12;
  R.actor(EL.haymitch, hx, sy, t, { dir: 1, anda: u > 0 && u < 1, brazos: t > gana, sonrisa: t > gana, salto: t > gana && t < gana + 1.2 ? Math.round(Math.abs(Math.sin((t - gana) * 8)) * 3) : 0 });
  if (t > gana) { R.icono('corona', hx + 4, sy - 40 - Math.round(tramo(t, gana, gana + 0.3) * 4), hex('#f8d040'), K);
    for (let k = 0; k < 24; k++) { const cu = ((t - gana) * 0.6 + hh(k, 3)) % 1, cx = x0 + Math.floor(hh(k, 4) * w) + Math.round(Math.sin(t * 3 + k) * 3), cy = y0 + Math.round(cu * (y1 - y0)); R.rect(cx, cy, cx + 1, cy, [hex('#f8d040'), hex('#e84a8a'), hex('#3ad0c8')][k % 3]); } }
  // en «force field», el filo de la cúpula se enciende: un arco de rombos de luz que crece desde los dos lados
  const f = tramo(t, filo, filo + 0.5);
  if (f > 0) { const cx = x0 + w / 2, ry = (y1 - y0) * 0.86, rx = w * 0.47, br = Math.sin(t * 9) > 0;
    for (let k = 0; k <= 160; k++) { const q = k / 160; if (!(q <= 0.5 * f || q >= 1 - 0.5 * f)) continue;
      const ang = Math.PI + q * Math.PI, px = Math.round(cx + Math.cos(ang) * rx), py = Math.round(y1 + Math.sin(ang) * ry);
      R.pset(px, py, br ? hex('#ffffff') : hex('#e8fbff')); R.pset(px, py + 1, hex('#8ad8ff')); R.pset(px, py - 1, hex('#8ad8ff'));
      if (k % 10 === 0) for (const [ix, iy] of [[0, 3], [-2, 5], [2, 5], [0, 7]]) R.pset(px + ix, py + iy, hex('#bfeaff')); } }
  // el triángulo de reproducir de la cinta, arriba a la izquierda
  for (let j = 0; j < 7; j++) R.linea(x0 + 6, y0 + 4 + j, x0 + 6 + Math.min(j, 6 - j), y0 + 4 + j, W);
};
const p3 = (t) => { T.interior(R, t, { encuadre: 'tele', camara: 'pantalla', pantalla: prado }); };
// ── p4: la maqueta de la arena: la piedra choca con el borde invisible y vuelve ──
const lanza = b(0.585), choca = b(0.70);
const p4 = (t) => {
  const g = tramo(t, lanza, lanza + (choca - lanza) / 0.45);
  const ga = T.arena(R, t, { encuadre: 'cupula', golpe: g, luces: 2 });
  // la estela de la piedra, de puntos, como en una repetición: sube hasta el filo y vuelve rebotando
  const P = ga.punto ?? [262, 84], ida = (u) => [200 + (P[0] - 200) * u, 128 + (P[1] - 128) * u - Math.sin(u * Math.PI) * 14], vu = (u) => [P[0] + (176 - P[0]) * u, P[1] + (140 - P[1]) * Math.min(1, u * 1.4)];
  if (g > 0) for (let k = 0; k < 40; k++) { const q = k / 40, gq = q * 0.45; if (gq > g || t > choca + 2.6) break; if (k % 2) continue; const [x, y] = ida(q); R.pset(Math.round(x), Math.round(y), hex('#ffffff')); }
  if (g > 0.45) for (let k = 0; k < 40; k++) { const q = k / 40, gq = 0.45 + q * 0.55; if (gq > g || t > choca + 2.6) break; if (k % 2) continue; const [x, y] = vu(q); R.pset(Math.round(x), Math.round(y), hex('#f8e060')); }
  // el destello del golpe: una estrella y dos anillos de rombos que se abren
  const fx = tramo(t, choca - 0.05, choca + 0.7);
  if (fx > 0 && fx < 1) { const [px, py] = P, r = 3 + fx * 16; for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4, L = (k % 2 ? 5 : 9) * (1 - fx * 0.5); R.linea(px, py, px + Math.cos(an) * L, py + Math.sin(an) * L, hex('#ffffff')); }
    for (let k = 0; k < 24; k++) { const an = k / 24 * Math.PI * 2; R.pset(Math.round(px + Math.cos(an) * r), Math.round(py + Math.sin(an) * r), hex('#bff0ff')); R.pset(Math.round(px + Math.cos(an) * r * 0.6), Math.round(py + Math.sin(an) * r * 0.6), hex('#ffffff')); } }
  const boca = t > choca;
  // el vigilante de delante, con su tablilla, anota y, al rebotar la piedra, se le cae la mandíbula y la tablilla
  const vx = 150, rv = R.actor(EL.vigilante, vx, 179, t, { dir: 1, sostiene: !boca ? [vx + 22, 156] : false, sorpresa: boca, brazos: boca && t < choca + 1.2, habla: !boca && Math.sin(t * 6) > 0.4 });
  if (!boca) { const [mx, my] = rv.mano; R.rect(mx - 3, my - 9, mx + 5, my + 1, K); R.rect(mx - 2, my - 8, mx + 4, my, hex('#e8e4d8')); R.rect(mx - 2, my - 8, mx + 4, my - 7, hex('#8a6a3a')); R.linea(mx - 1, my - 5, mx + 3, my - 5, hex('#8a8a96')); R.linea(mx - 1, my - 3, mx + 2, my - 3, hex('#8a8a96')); }
  else { const u = tramo(t, choca, choca + 0.5), cx = vx + 24, cy = Math.round(lerp(150, 176, u)); R.rect(cx - 4, cy - 2, cx + 4, cy, K); R.rect(cx - 3, cy - 1, cx + 3, cy - 1, hex('#e8e4d8')); }
  R.actor(EL.vigilante, 30, 177, t, { dir: 1, sorpresa: boca, habla: !boca && Math.sin(t * 5 + 1) > 0.5, pal: { R: hex('#3a5a8a') } });
  R.actor(EL.vigilante, 276, 176, t, { dir: -1, sorpresa: boca, dedo: t > choca + 0.4, pal: { R: hex('#5a3a8a') } });
  R.actor(EL.vigilante, Math.round(lerp(330, 296, tramo(t, P4, P4 + 1.2))), 177, t, { dir: -1, anda: t < P4 + 1.2, sorpresa: boca, pal: { R: hex('#8a3a5a') } });
};
const efectos = [[a(0.12), 'brillo'], [coge, 'toc'], [mete, 'golpecito'], [enc, 'zumbido'], [P3 + 0.2, 'bip'], [gana, 'palmada'], [filo, 'brillo'], [choca, 'golpecito'], [choca + 0.9, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P4 ? 75 : 50) });
''')

E['jh-arma'] = ('El arma', '''// JH-ARMA (frases 24–26). Cinco planos:
// 1. (capitolio 'despacho' general, de noche: tinte azul, la luna y las luces de la ciudad en el ventanal) Snow detrás
//    de la mesa mira una pantalla de pie: la piedra rebota en el filo («own weapon») y Haymitch gana con el confeti; en
//    «never forgave» Snow aprieta la rosa blanca y se deshoja; corta en «and from then on».  Juegos 50.
// 2. (distrito 'quemador' general) Haymitch cruza el mercado; un ojo del Capitolio (una cámara volante con su piloto
//    rojo y su haz) le sigue; en «eyes off him» él se para y la mira; corta en «He'd».  Juegos 51.
// 3. (capitolio 'plato' sillones) en la pantalla grande, Snow con la sonrisa forzada y una gota de sudor; Caesar y
//    Drusilla en los sillones y el público se ríen en «fool»; corta en «That's».  Juegos 50.
// 4. (interior 'tren' general, de noche) Haymitch adulto se sirve de la petaca en «drinks»; en «trusts no one» mira de
//    reojo al camarero que pasa por el ventanuco y esconde la petaca; corta en «when».  Juegos 74.
// 5. (fondo local, de cerca: su mesa del tren de noche) por la puerta corredera entran Katniss y Peeta; en «knows
//    exactly» la mano de Haymitch deja la copa sin beber en el mantel y la aparta.''', r'''
const a = (f) => en('arma', f), o2 = (f) => en('ojo', f), b = (f) => en('bebe', f);
const P2 = o2(0), P3 = o2(0.55), P4 = b(0), P5 = b(0.52);
const K = T.C.k, W = hex('#ffffff');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, u) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * u) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * u) << 8) | Math.round(r1 + ((c2 & 255) - r1) * u)) >>> 0; };
// ── p1: el despacho de noche; la pantalla; la rosa ──
const rebota = a(0.2), gana = a(0.55), aprieta = a(0.8);
const SCR = [14, 62, 74, 104];
// la noche: cada píxel se mezcla con un azul oscuro (y las luces cálidas guardan algo de su color)
const NAVY = hex('#0e1232');
const noche = (y0, y1) => { for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const c = R.pget(x, y); R.pset(x, y, mez(c, NAVY, 0.68)); } };
const p1 = (t) => {
  T.capitolio(R, t, { encuadre: 'despacho' });
  R.recorte(null);
  noche(0, 179);
  // por el ventanal: el cielo de noche (las nubes se apagan), la luna y las ventanas de la ciudad encendidas
  for (let y = 22; y < 70; y++) for (let x = 80; x <= 240; x++) { const c = R.pget(x, y), l = (c & 255) + ((c >> 8) & 255) + ((c >> 16) & 255); if (l > 330) R.pset(x, y, mez(c, hex('#1a2250'), 0.7)); }
  R.recorte([80, 22, 240, 117]);
  R.disco(212, 40, 7, hex('#e8ecf8')); R.disco(214, 39, 6, hex('#fafcff'));
  for (let k = 0; k < 40; k++) { const x = 84 + Math.floor(hh(k, 1) * 152), y = 60 + Math.floor(hh(k, 2) * 54); if (Math.sin(t * 0.7 + k * 1.3) > -0.5) R.pset(x, y, k % 3 ? hex('#f8d070') : hex('#f070c0')); }
  for (let k = 0; k < 10; k++) { const x = 84 + Math.floor(hh(k, 6) * 120), y = 24 + Math.floor(hh(k, 7) * 22); if (Math.sin(t * 2 + k) > 0) R.pset(x, y, hex('#c8d0f0')); }
  R.recorte(null);
  // la pantalla de pie (marco blanco y oro) con su pie
  const [x0, y0, x1, y1] = SCR;
  R.rect(42, y1 + 2, 46, 150, hex('#a8a8b8')); R.rect(30, 148, 58, 152, K); R.rect(31, 149, 57, 151, hex('#d8d8e0'));
  R.rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, K); R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, hex('#e8e4f0')); R.rect(x0 - 2, y1 + 2, x1 + 2, y1 + 2, hex('#e8b830'));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y < y0 + 18 ? (hh(x, y) < (y - y0) / 18 ? hex('#a8d8f0') : hex('#78b8e8')) : hh(x, y, 2) < 0.3 ? hex('#3a8a3a') : hex('#5ab84a'));
  for (let k = 0; k < 16; k++) R.pset(x0 + Math.floor(hh(k, 7) * 60), y0 + 22 + Math.floor(hh(k, 8) * 18), [hex('#f8e040'), hex('#e84a8a'), W][k % 3]);
  // el filo de la cúpula y la piedra que rebota (la propia arma del Capitolio)
  for (let x = x0; x <= x1; x++) { const yy = Math.round(y0 + 4 + Math.pow((x - x0 - 30) / 30, 2) * 26); if (yy < y1 - 6 && yy > y0) R.pset(x, yy, Math.sin(t * 8 + x) > 0 ? hex('#e8fbff') : hex('#8ad8ff')); }
  const u = tramo(t, rebota - 0.7, rebota + 0.7);
  if (u > 0 && u < 1) { const sx = u < 0.5 ? lerp(x0 + 36, x1 - 4, u * 2) : lerp(x1 - 4, x0 + 24, (u - 0.5) * 2), sy = u < 0.5 ? lerp(y1 - 8, y0 + 22, u * 2) : lerp(y0 + 22, y1 - 6, (u - 0.5) * 2); R.disco(sx, sy, 2, hex('#8a8a96')); R.pset(Math.round(sx) - 1, Math.round(sy) - 1, hex('#c8c8d0'));
    if (u > 0.45 && u < 0.6) { R.anillo(x1 - 4, y0 + 22, 3 + (u - 0.45) * 40, hex('#e8fbff')); } }
  // Haymitch gana: levanta los brazos; confeti y corona
  const hy = y1 - 2; R.actor(EL.haymitch, x0 + 22, hy, t, { dir: 1, brazos: t > gana, sonrisa: t > gana });
  if (t > gana) { R.icono('corona', x0 + 26, hy - 36, hex('#f8d040'), K); for (let k = 0; k < 14; k++) { const cu = ((t - gana) * 0.7 + hh(k, 3)) % 1; R.pset(x0 + Math.floor(hh(k, 4) * 60), y0 + Math.round(cu * 42), [hex('#f8d040'), hex('#e84a8a'), hex('#3ad0c8')][k % 3]); } }
  R.rect(x0, y0, x1, y0 + 1, hex('#c8e8ff'));
  R.halo(44, 84, 46, [hex('#2a3a6a'), hex('#3a5a8a')], 0.5);
  // Snow detrás de la mesa, vuelto hacia la pantalla, con la rosa en la mano; en «never forgave» la aprieta
  const r = R.actor(EL.snow, 160, 133, t, { dir: -1, sostiene: [148, 118], enfado: t > a(0.6), sonrisa: t < gana - 0.4 && Math.sin(t * 2) > 0 });
  const [mx, my] = r.mano, ap = tramo(t, aprieta, aprieta + 0.35);
  T.capitolioDelante(R, t, { encuadre: 'despacho' });
  R.recorte(null);
  noche(128, 179);
  if (ap < 1) T.PIEZAS_JH.rosaBlanca(R, mx, my + 4 + Math.round(ap * 4), { s: 2 }); else { R.rect(mx, my - 8, mx + 1, my + 6, hex('#3a7a3a')); R.rect(mx - 2, my - 9, mx + 2, my - 8, hex('#c8c4b4')); }
  R.disco(mx, my, 2.3, K); R.disco(mx, my, 1.5, hex('#f0d0b8'));
  // los pétalos que caen sobre la mesa
  if (t > aprieta) for (let k = 0; k < 12; k++) { const u = tramo(t, aprieta + k * 0.05, aprieta + 1.3 + k * 0.1), px = Math.round(mx + (hh(k, 1) - 0.5) * 34 * u + Math.sin(u * 9 + k) * 3), py = Math.round(my - 2 + u * (138 - my) + (hh(k, 2) - 0.5) * 4);
    R.rect(px, py, px + 2, py + 1, hex('#f8f6ee')); R.rect(px, py + 2, px + 1, py + 2, hex('#c8c4b8')); }
  // la luz de la pantalla parpadea sobre la mesa
  if (Math.sin(t * 11) > 0.6) for (let x = 92; x < 150; x += 2) R.pset(x + ((x >> 1) & 1), 130, hex('#6a8ac8'));
};
// ── p2: el ojo del Capitolio sigue a Haymitch por el mercado ──
const ojos = o2(0.37);
const p2 = (t) => {
  T.distrito(R, t, { encuadre: 'quemador', camara: 'general' });
  const u = tramo(t, P2 + 0.1, ojos - 0.1), v = tramo(t, ojos + 0.9, P3), hx = Math.round(lerp(30, 136, u) + lerp(0, 90, v));
  // una compradora que cruza por delante de los puestos al fondo
  const pa = tramo(t, P2, P2 + 2.6); if (pa < 1) R.actor(EL.vendedoraHob, Math.round(lerp(190, 336, pa)), 176, t, { dir: 1, anda: true });
  R.actor(EL.hermanoHaymitch, Math.round(lerp(250, 214, tramo(t, P2 + 1.5, P2 + 2.4))), 150, t, { dir: -1, anda: t > P2 + 1.5 && t < P2 + 2.4, sorpresa: t > ojos, pal: { R: hex('#6a4a3a') } });
  const mira = t > ojos && t < ojos + 0.9;
  R.actor(EL.haymitch, hx, 160, t, { dir: 1, anda: (u > 0 && u < 1) || (v > 0 && v < 1), enfado: mira || v > 0, sorpresa: mira && t < ojos + 0.3 });
  // la cámara volante: bola de metal, hélices, el objetivo con su piloto rojo y un haz tramado hacia él
  const dx = Math.round(hx + 8 + Math.sin(t * 2.3) * 4 - (u < 1 ? 16 : 4)), dy = Math.round(100 + Math.sin(t * 3.1) * 3);
  for (let y = dy + 7; y < 156; y++) { const w = (y - dy) * 0.28; for (let x = Math.round(dx - w); x <= dx + w; x++) if (((x + y) & 3) === 0) R.pset(x, y, mez(R.pget(x, y), hex('#ff6a6a'), 0.45)); }
  R.disco(dx, dy, 8, K); R.disco(dx, dy, 7, hex('#8a90a0')); R.disco(dx - 2, dy - 3, 3, hex('#c8ccd8')); R.pset(dx - 3, dy - 4, W);
  R.rect(dx - 15, dy - 9, dx + 15, dy - 9, K); R.rect(dx - 1, dy - 9, dx + 1, dy - 7, K); R.rect(dx - 16, dy - 10, dx - 14, dy - 8, K); R.rect(dx + 14, dy - 10, dx + 16, dy - 8, K);
  const hel = Math.floor(t * 20) % 2; R.rect(dx - 21 + hel * 4, dy - 11, dx - 9 - hel * 4, dy - 11, hex('#c8ccd8')); R.rect(dx + 9 + hel * 4, dy - 11, dx + 21 - hel * 4, dy - 11, hex('#c8ccd8'));
  // el objetivo es un ojo: blanco, iris rojo y pupila que mira a Haymitch; parpadea un párpado de metal
  const ex = dx + 1, ey = dy + 2, pup = hx + 7 > ex ? 1 : -1;
  R.disco(ex, ey, 4.4, K); R.disco(ex, ey, 3.6, hex('#f4f4f8')); R.disco(ex + pup, ey + 1, 2.2, mira ? hex('#ff2a2a') : hex('#c83a3a')); R.pset(ex + pup, ey + 1, K); R.pset(ex + pup - 1, ey, W);
  if ((t * 0.9) % 3 < 0.12) R.rect(ex - 3, ey - 3, ex + 3, ey + 3, hex('#6a7080'));
  if (Math.floor(t * 4) % 2 || mira) R.disco(dx + 6, dy - 4, 1, hex('#ff3a3a'));
};
// ── p3: el plató: Snow sonríe sin ganas en la pantalla y el público se ríe ──
const tonto = o2(0.73);
const pantallaSnow = (R, t, [x0, y0, x1, y1]) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = Math.hypot(x - (x0 + x1) / 2, (y - y1) * 1.4) / 130; R.pset(x, y, hh(x, y) < d ? hex('#3a1a4a') : hex('#6a2a6a')); }
  for (let k = 0; k < 12; k++) { const ang = Math.PI + (k + 0.5) / 12 * Math.PI + Math.sin(t * 0.4) * 0.05, cx = (x0 + x1) / 2; R.linea(cx, y1, cx + Math.cos(ang) * 140, y1 + Math.sin(ang) * 100, k % 2 ? hex('#8a3a7a') : hex('#7a3270')); }
  // el balcón del palacio con colgaduras
  R.rect(x0 + 50, y1 - 22, x1 - 50, y1, hex('#e8e4f0')); for (let x = x0 + 54; x < x1 - 50; x += 6) R.rect(x, y1 - 18, x + 2, y1 - 2, hex('#b8b4c8'));
  R.rect(x0 + 50, y1 - 24, x1 - 50, y1 - 22, hex('#e8b830'));
  for (const cx of [x0 + 60, x1 - 64]) { R.rect(cx, y0 + 6, cx + 6, y1 - 26, hex('#8a1a2a')); R.rect(cx + 1, y0 + 6, cx + 2, y1 - 26, hex('#b82a3a')); }
  const cx = Math.round((x0 + x1) / 2) - 7, sy = y1 - 20;
  const ri = t > tonto - 0.3;
  R.actor(EL.snow, cx, sy, t, { dir: 1, sonrisa: true, enfado: ri, quieto: true, salto: 0 });
  if (ri) { const u = ((t - tonto) * 1.2) % 1, gy = sy - 27 + Math.round(u * 8); R.disco(cx - 1, gy, 2.2, K); R.disco(cx - 1, gy, 1.5, hex('#8ad0ff')); R.pset(cx - 1, gy - 3, K); R.pset(cx - 2, gy - 1, W); if (Math.floor(t * 7) % 3 === 0) R.pset(cx + 12, sy - 21, K); }
  // la rosa de su ojal, grande, se mustia en «fool»: se dobla y se le caen dos pétalos
  const mu = tramo(t, tonto - 0.1, tonto + 0.6), rx = cx + 22, ry = sy - 4;
  if (mu < 0.5) T.PIEZAS_JH.rosaBlanca(R, rx, ry, { s: 2 });
  else { R.rect(rx, ry - 12, rx + 1, ry, hex('#3a7a3a')); R.rect(rx + 1, ry - 14, rx + 4, ry - 12, hex('#3a7a3a')); R.disco(rx + 6, ry - 10, 3.5, K); R.disco(rx + 6, ry - 10, 2.6, hex('#e8e4d4')); R.pset(rx + 5, ry - 11, W); }
  if (mu > 0.5) for (let k = 0; k < 2; k++) { const u = tramo(t, tonto + 0.3 + k * 0.4, tonto + 1.6 + k * 0.4); R.rect(rx + 4 + k * 3 + Math.round(Math.sin(u * 8) * 2), ry - 8 + Math.round(u * 26), rx + 5 + k * 3 + Math.round(Math.sin(u * 8) * 2), ry - 7 + Math.round(u * 26), W); }
};
const p3 = (t) => {
  const rie = tramo(t, tonto, tonto + 0.3);
  T.capitolio(R, t, { encuadre: 'plato', camara: 'sillones', pantalla: pantallaSnow, aplausos: rie });
  const salta = (k) => (t > tonto ? Math.round(Math.abs(Math.sin(t * 9 + k)) * 2) : 0);
  R.actor(EL.caesar, 112, 158, t, { dir: 1, habla: t < tonto && Math.sin(t * 7) > 0, sonrisa: true, salto: salta(0), dedo: t > tonto - 0.6 && t < tonto + 0.3 });
  R.actor(EL.drusilla, 208, 158, t, { dir: -1, sonrisa: t > tonto, habla: t > tonto && Math.sin(t * 10) > 0, salto: salta(1) });
  // dos capitolinos de la primera fila, delante, que se ríen y se señalan la pantalla
  R.actor(EL.capitolino1, 22, 182, t, { dir: 1, sonrisa: t > tonto, dedo: t > tonto + 0.2 && t < tonto + 1.4, salto: salta(2) });
  R.actor(EL.capitolino2, 284, 182, t, { dir: -1, sonrisa: t > tonto, habla: t > tonto && Math.sin(t * 11) > 0, salto: salta(3) });
  R.actor(EL.capitolino2, 52, 188, t, { dir: 1, sonrisa: t > tonto, brazos: t > tonto + 0.3 && t < tonto + 1.8, salto: salta(4), pal: { H: hex('#e85aa8') } });
  R.actor(EL.capitolino1, 254, 188, t, { dir: -1, sonrisa: t > tonto, habla: t > tonto && Math.sin(t * 9) > 0, salto: salta(5), pal: { H: hex('#8a4ad8') } });
  if (t > tonto) for (const [x, y, k] of [[34, 138, 0], [66, 146, 1], [262, 146, 2], [292, 138, 3], [120, 112, 4], [196, 112, 5]]) if (Math.floor(t * 3 + k) % 2) R.icono('!', x, y, hex('#f8d040'), K, 2);
};
// ── p4: el tren de noche: se sirve de la petaca y mira de reojo al camarero ──
const bebe = b(0.04), nadie = b(0.21);
const p4 = (t) => {
  const o = { encuadre: 'tren', camara: 'general', luz: 'noche' };
  T.interior(R, t, o);
  // Haymitch adulto de pie junto a la cubitera: se lleva la petaca a la boca en «drinks»; en «trusts no one» se vuelve
  // hacia la puerta, frunce el ceño y da dos pasos señalando el ventanuco, por donde se asomaba el camarero
  const trago = t > bebe - 0.1 && t < nadie - 0.3, va = tramo(t, nadie + 0.2, nadie + 1.0), hx = Math.round(lerp(142, 104, va));
  const vuelto = t > nadie - 0.1;
  const r = R.actor(EL.haymitchViejo, hx, 156, t, { dir: vuelto ? -1 : 1, anda: va > 0 && va < 1, sostiene: trago ? [hx + 14, 128] : false, enfado: vuelto, dedo: va >= 1 && t < P5 - 0.3, habla: t < bebe - 0.3 && Math.sin(t * 5) > 0.5 });
  if (trago) { const [mx, my] = r.mano; T.PIEZAS_JH.petaca(R, mx, my + 2, {}); R.disco(mx, my, 2, K); R.disco(mx, my, 1.3, hex('#f0c8a0')); if (Math.floor(t * 5) % 2) R.pset(mx + 2, my - 4, hex('#e8a040')); }
  // el camarero que se asoma por el ventanuco y, al verle la cara, se esconde
  const cw = tramo(t, nadie - 0.9, nadie + 0.1), sale = tramo(t, nadie + 0.5, nadie + 1.0);
  if (cw > 0 && sale < 1) { R.recorte([11, 43, 25, 69]); R.actor(EL.capitolino2, Math.round(lerp(-8, 10, cw) - sale * 22), 76, t, { dir: 1, anda: cw < 1 || sale > 0, sorpresa: t > nadie }); R.recorte(null); }
  T.interiorDelante(R, t, o);
};
// ── p5: el fondo local: su mesa del tren de cerca; entran Katniss y Peeta; deja la copa sin beber ──
const sabe = b(0.74), entran = P5 + 0.15;
let F5 = null;
const fondo5 = () => {
  if (F5) { R.copiar(F5); return; }
  F5 = R.nuevo(); const prev = R.usar(F5);
  // el techo abovedado crema con la moldura dorada
  for (let y = 0; y < 16; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y > 12 ? hex('#c8a040') : (hh(x, y) < y / 20 ? hex('#d8ccb0') : hex('#e8dcc0')));
  R.rect(0, 13, 319, 13, hex('#f0c860')); R.rect(0, 15, 319, 15, hex('#8a6418'));
  // la pared de caoba con cuarterones y vetas (a la derecha arriba, lisa y en sombra)
  for (let y = 16; y < 124; y++) for (let x = 0; x < 320; x++) {
    let c = hex('#5a2a1c'); const vy = x + Math.sin(y * 0.09 + x * 0.02) * 4;
    if (Math.abs((vy % 9) - 4.5) < 0.6) c = hex('#4a2216'); if (hh(x, y, 4) < 0.05) c = hex('#6a3424');
    if (x > 268 && y < 56) c = ((x + y) & 1) && y > 48 ? hex('#4a2216') : hex('#3e1c12');
    R.pset(x, y, c);
  }
  for (const [px0, px1] of [[4, 14], [160, 170], [262, 270]]) { R.rect(px0, 16, px1, 123, hex('#6a3424')); R.rect(px0, 16, px0, 123, hex('#8a4a30')); R.rect(px1, 16, px1, 123, hex('#3a180e')); for (let y = 20; y < 120; y += 4) R.pset(px0 + 3, y, hex('#4a2216')); }
  R.rect(0, 104, 319, 106, hex('#c8a040')); R.rect(0, 104, 319, 104, hex('#f0c860'));
  // el aplique de tulipa de la derecha
  R.rect(286, 64, 296, 66, hex('#c8a040')); R.poligono([[284, 66], [298, 66], [294, 76], [288, 76]], hex('#f8e0b0')); R.linea(284, 66, 288, 76, K); R.linea(298, 66, 294, 76, K);
  // la ventana (se pinta viva) con su marco de latón y las cortinas de terciopelo ciruela recogidas
  R.rect(18, 22, 154, 100, K); R.rect(19, 23, 153, 99, hex('#c8a040')); R.rect(21, 25, 151, 97, K);
  for (const [cx0, dir] of [[10, 1], [150, -1]]) for (let y = 18; y < 106; y++) { const w = 12 - Math.round(Math.max(0, Math.sin((y - 18) / 88 * Math.PI)) * 6) + (y > 60 && y < 70 ? -4 : 0); for (let i = 0; i < w; i++) { const x = dir > 0 ? cx0 + i : cx0 + 12 - i; R.pset(x, y, (i % 4 === 1) ? hex('#4a1a3a') : i === w - 1 ? K : hex('#7a2a5a')); } }
  R.rect(10, 62, 24, 66, hex('#c8a040')); R.rect(148, 62, 162, 66, hex('#c8a040'));
  R.rect(6, 16, 166, 20, hex('#5a1a3a')); for (let x = 6; x < 166; x += 3) R.pset(x, 21, hex('#c8a040'));
  // el marco de la puerta corredera del pasillo
  R.rect(180, 20, 256, 124, K); R.rect(182, 22, 254, 122, hex('#c8a040'));
  // la mesa: el mantel blanco con su trama de lino, los pliegues, la cenefa bordada y el filo de encaje
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) {
    const pli = Math.sin(x * 0.07 + Math.sin(x * 0.013) * 2), tr = ((x >> 1) + (y >> 1)) % 3 === 0;
    let c = tr ? hex('#e6e2d8') : hex('#f6f4ee'); if (pli > 0.9 && tr) c = hex('#fbfaf6'); if (pli < -0.88) c = tr ? hex('#d8d4ca') : hex('#e6e2d8');
    if (y < 121) c = hex('#b8b4ac'); if (y >= 124 && y <= 127) c = y === 125 || y === 126 ? ((x % 6 < 3) ? hex('#8a2a3a') : hex('#c8a040')) : hex('#8a2a3a');
    R.pset(x, y, c);
  }
  for (let x = 0; x < 320; x++) { const yb = 172 + (Math.abs((x % 8) - 4) > 2 ? 1 : 0); R.rect(x, yb, x, 179, hex('#3a2a20')); if (x % 4 === 0) R.pset(x, yb - 1, hex('#d8d0c0')); if (x % 8 === 4) R.pset(x, yb + 2, hex('#d8d0c0')); }
  // las sombras de los objetos en el mantel
  const sombra = (cx, cy, rx) => { for (let x = cx - rx; x <= cx + rx; x++) for (let y = cy - 2; y <= cy + 2; y++) if (((x + y) & 1) && ((x - cx) / rx) ** 2 + ((y - cy) / 2.5) ** 2 < 1) R.pset(x, y, hex('#c8c0b4')); };
  sombra(44, 151, 13); sombra(124, 162, 20); sombra(86, 172, 16);
  // la licorera de cristal tallado con su tapón
  R.poligono([[34, 150], [30, 140], [34, 128], [38, 124], [38, 116], [44, 116], [44, 124], [48, 128], [52, 140], [48, 150]], hex('#a8c8d8'));
  R.poligono([[33, 149], [31, 141], [34, 134], [49, 134], [51, 141], [47, 149]], hex('#c87a2a')); R.linea(36, 128, 36, 146, W); R.rect(38, 110, 44, 116, hex('#c8d8e8')); R.disco(41, 109, 3, hex('#d8e8f0'));
  for (let y = 136; y < 149; y += 3) R.linea(34, y, 48, y + 1, hex('#e8a050'));
  R.linea(30, 140, 34, 150, K); R.linea(52, 140, 48, 150, K); R.linea(34, 150, 48, 150, K); R.linea(34, 128, 30, 140, K); R.linea(48, 128, 52, 140, K);
  // el frutero de latón con fruta
  R.rect(106, 152, 142, 156, hex('#c8a040')); R.rect(106, 152, 142, 152, hex('#f0c860')); R.rect(116, 156, 132, 160, hex('#a87a20')); R.rect(110, 160, 138, 162, hex('#c8a040'));
  for (const [fx, fy, c] of [[114, 147, '#d83a3a'], [124, 145, '#e8b830'], [134, 148, '#7ac83a'], [119, 140, '#8a3aa8'], [129, 139, '#d83a3a'], [124, 134, '#7ac83a']]) { R.disco(fx, fy, 5, K); R.disco(fx, fy, 4, hex(c)); R.pset(fx - 2, fy - 2, W); }
  R.linea(124, 129, 126, 126, hex('#3a2a1a'));
  // el plato con un pastelito rosa, la servilleta doblada y los cubiertos
  R.disco(84, 166, 14, K); R.disco(84, 166, 13, W); R.disco(84, 166, 9, hex('#e8e4dc')); R.anillo(84, 166, 11, hex('#c8a040'));
  R.rect(78, 156, 90, 164, hex('#e8a0c0')); R.rect(78, 156, 90, 157, hex('#f8d0e0')); R.rect(78, 160, 90, 160, hex('#c87aa0')); R.disco(84, 154, 2, hex('#d83a3a'));
  R.poligono([[196, 160], [222, 156], [228, 168], [200, 172]], hex('#8a2a3a')); R.linea(200, 164, 224, 160, hex('#c8a040'));
  R.rect(190, 154, 191, 172, hex('#a8a8b8')); R.rect(189, 152, 192, 156, hex('#c8c8d8')); R.rect(232, 154, 233, 172, hex('#a8a8b8')); R.rect(231, 152, 234, 158, hex('#c8c8d8'));
  // migas y una mancha de vino
  for (let k = 0; k < 10; k++) R.pset(60 + Math.floor(hh(k, 3) * 200), 130 + Math.floor(hh(k, 4) * 36), hex('#d8b880'));
  R.disco(246, 138, 2, hex('#e8c8b0'));
  R.usar(prev); R.copiar(F5);
};
const p5 = (t) => {
  fondo5();
  // el paisaje de noche que corre por la ventana: estrellas, la luna, montes, casas con luz y postes
  R.recorte([21, 25, 151, 97]);
  for (let y = 25; y < 98; y++) for (let x = 21; x < 152; x++) R.pset(x, y, hh(x, y) < (y - 25) / 120 ? hex('#1a2a5a') : hex('#0e1838'));
  for (let k = 0; k < 18; k++) { const x = 21 + Math.floor(hh(k, 1) * 130), y = 27 + Math.floor(hh(k, 2) * 30); if (Math.sin(t * 2 + k) > -0.4) R.pset(x, y, hex('#d8e0ff')); }
  R.disco(126, 38, 6, hex('#f4f0e0')); R.disco(124, 37, 5, hex('#fffaf0'));
  const capa = (vel, base, amp, col, sem) => { const off = t * vel; for (let x = 21; x < 152; x++) { const X = x + off, yy = Math.round(base + Math.sin(X * 0.031 + sem) * amp + Math.sin(X * 0.083 + sem * 2) * amp * 0.4); R.linea(x, yy, x, 97, col); } };
  // nubes de noche de tres tonos a tres velocidades
  for (let k = 0; k < 6; k++) { const v = [3, 5, 8][k % 3], col = [hex('#2a3a6a'), hex('#34467a'), hex('#4a5a8a')][k % 3], cx = 21 + ((k * 53 - t * v) % 170 + 170) % 170 - 10, cy = 34 + (k % 3) * 7;
    R.disco(cx, cy, 4, col); R.disco(cx + 6, cy + 1, 3, col); R.disco(cx - 6, cy + 1, 3, col); R.linea(cx - 9, cy + 3, cx + 9, cy + 3, col); }
  capa(6, 66, 8, hex('#1a2440'), 1);
  for (let k = 0; k < 12; k++) { const x = 21 + Math.round(((k * 23 - t * 12) % 140 + 140) % 140) - 4, yb = 80 + Math.round(Math.sin((x + t * 12) * 0.08) * 3); R.poligono([[x - 3, yb], [x, yb - 9 - (k % 3) * 2], [x + 3, yb]], hex('#10182a')); }
  capa(18, 78, 6, hex('#141c30'), 2);
  for (let k = 0; k < 4; k++) { const x = 21 + Math.round(((k * 47 - t * 18) % 188 + 188) % 188) - 20, y = 80; if (x > 18 && x < 154) { R.rect(x, y - 6, x + 8, y, hex('#2a2a3a')); R.poligono([[x - 1, y - 6], [x + 4, y - 10], [x + 9, y - 6]], hex('#22222e')); R.rect(x + 2, y - 4, x + 4, y - 2, Math.sin(t + k) > -0.7 ? hex('#f8c860') : hex('#8a6a30')); } }
  capa(60, 90, 2, hex('#0a0e18'), 3);
  const po = Math.round(((t * 140) % 160)); R.rect(21 + 150 - po, 25, 23 + 150 - po, 97, hex('#2a1e18')); R.linea(21, 34, 151, 32, hex('#3a3a4a'));
  R.recorte(null);
  // la puerta corredera se abre y entra la luz del pasillo; Katniss y Peeta en el umbral
  const ab = tramo(t, entran, entran + 0.6), dw = Math.round(ab * 62);
  R.recorte([183, 23, 253, 121]);
  for (let y = 23; y < 122; y++) for (let x = 183; x < 254; x++) R.pset(x, y, y > 100 ? (((x + y) & 1) ? hex('#8a2a2a') : hex('#7a2222')) : (hh(x, y, 6) < 0.15 ? hex('#e8c890') : hex('#f0d8a8')));
  R.rect(200, 30, 236, 34, hex('#c8a040'));
  const kp = tramo(t, entran + 0.3, entran + 1.1);
  if (kp > 0) { R.actor(EL.katniss, Math.round(lerp(250, 196, kp)), 128, t, { dir: -1, anda: kp < 1, habla: kp >= 1 && t < sabe && Math.sin(t * 7) > 0, enfado: t > sabe + 0.4 });
    R.actor(EL.peeta, Math.round(lerp(270, 220, kp)), 128, t, { dir: -1, anda: kp < 1, sonrisa: t < sabe, dedo: kp >= 1 && t > entran + 1.4 && t < sabe, triste: t > sabe + 0.4 }); }
  // la hoja de la puerta (caoba con cristal esmerilado) que se desliza
  const dx0 = 183 + dw; for (let y = 23; y < 122; y++) for (let x = dx0; x < dx0 + 71; x++) { const lx = x - dx0; R.pset(x, y, lx > 12 && lx < 58 && y > 32 && y < 80 ? (hh(x, y, 8) < 0.5 ? hex('#a8b8c0') : hex('#98a8b0')) : (lx % 9 === 0 ? hex('#4a2216') : hex('#6a3424'))); }
  R.rect(dx0 + 6, 70, dx0 + 8, 78, hex('#c8a040'));
  R.recorte(null);
  // la luz cálida del pasillo que entra en la mesa
  if (ab > 0) for (let y = 118; y < 150; y++) for (let x = 183; x < 183 + dw; x++) if (((x + y) & 3) === 0) R.pset(x, y, hex('#f8e0b0'));
  // la vela que titila, con su halo
  const fl = Math.sin(t * 17) > 0.3 ? 1 : 0;
  R.halo(166, 132, 22 + fl * 2, [hex('#5a3a28'), hex('#8a5a30')], 0.6);
  R.rect(162, 136, 170, 140, hex('#c8a040')); R.rect(164, 122, 168, 136, hex('#f6f0e0')); R.rect(164, 122, 164, 136, W); R.disco(166, 118 - fl, 2, hex('#f8a030')); R.pset(166, 116 - fl, hex('#fff0a0'));
  // la copa llena: la mano de Haymitch la sostiene; en «knows exactly» la deja en el mantel sin beber y la aparta
  const baja = tramo(t, sabe - 0.2, sabe + 0.35), aparta = tramo(t, sabe + 0.5, sabe + 1.2), suelta = tramo(t, sabe + 1.3, sabe + 2.0);
  const gx = Math.round(276 - aparta * 22), gy = Math.round(lerp(158, 168, baja) + Math.sin(t * 2.2) * (baja < 1 ? 1 : 0));
  const ola = t > sabe + 0.35 && t < sabe + 1.6 ? Math.round(Math.sin(t * 20)) : 0;
  if (baja >= 1) for (let x = gx - 5; x <= gx + 5; x++) if (x & 1) R.pset(x, gy + 2, hex('#c8c0b4'));
  R.rect(gx - 5, gy - 14, gx + 5, gy - 14, K); R.rect(gx - 5, gy - 14, gx - 5, gy - 6, K); R.rect(gx + 5, gy - 14, gx + 5, gy - 6, K); R.rect(gx - 4, gy - 5, gx + 4, gy - 5, K);
  R.rect(gx - 4, gy - 13, gx + 4, gy - 6, hex('#c8d8e8')); R.rect(gx - 4, gy - 10 + ola, gx + 4, gy - 6, hex('#d88a2a')); R.rect(gx - 4, gy - 10 + ola, gx + 4, gy - 10 + ola, hex('#f8c060')); R.rect(gx - 3, gy - 13, gx - 3, gy - 7, W);
  R.rect(gx - 1, gy - 4, gx + 1, gy - 1, K); R.rect(gx, gy - 4, gx, gy - 1, hex('#c8d8e8')); R.rect(gx - 4, gy, gx + 4, gy + 1, K); R.rect(gx - 3, gy, gx + 3, gy, hex('#d8e8f0'));
  // la mano de Haymitch entra por la esquina de abajo a la derecha (se ve poco brazo) y, al acabar, se retira
  if (suelta < 1) { const wx = gx + 7 + Math.round(suelta * 50), wy = gy - 9 + Math.round(suelta * 30);
    T.brazo(R, wx + 34, wy + 30, wx, wy, '#5a4e44', -1); }
};
const efectos = [[rebota, 'boing'], [gana, 'palmada'], [aprieta, 'papel'], [P2 + 0.3, 'zumbido'], [ojos, 'bip'], [tonto, 'palmada'], [bebe, 'burbujas'], [nadie, 'toc'], [entran, 'puerta'], [sabe, 'golpecito']];
const año = (t) => (t < P2 ? 50 : t < P3 ? 51 : t < P4 ? 50 : 74);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')
