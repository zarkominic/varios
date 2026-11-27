E = {}

# piezas comunes de las tres escenas (cada escena es su propia página, así que van en cada cuerpo)
LIB = r'''
const K = hex('#1a1420');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const dz = (x, y, u) => u * 16 > BY[((y & 3) << 2) | (x & 3)] + 0.5;
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// una capa fija: se pinta una vez en su búfer; pegar() la pone encima (los píxeles sin pintar dejan ver lo de debajo)
const capa = (f) => { const b = R.nuevo(), p = R.usar(b); f(); R.usar(p); return b; };
const pegar = (b) => { const B = R.buf; for (let i = 0; i < B.length; i++) if (b[i]) B[i] = b[i]; };
// degradado tramado (orden de Bayer) entre varios colores, por filas
const degr = (x0, y0, x1, y1, cols) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), i = Math.min(cols.length - 2, Math.floor(u)), f = u - i; for (let x = x0; x <= x1; x++) R.pset(x, y, dz(x, y, f) ? cols[i + 1] : cols[i]); } };
// nube de tres tonos (sombra, cuerpo y luz), con la base plana
const NUB = [[0, 0, 0.32], [-0.32, 0.06, 0.24], [0.3, 0.05, 0.26], [-0.1, -0.12, 0.26], [0.14, -0.08, 0.22]];
const nube = (cx, cy, w, cs) => { for (const [dx, dy, r] of NUB) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), Math.round(r * w), cs[0]);
  for (const [dx, dy, r] of NUB) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), Math.round(r * w * 0.92), cs[1]);
  for (const [dx, dy, r] of NUB) if (dy <= 0.02) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), Math.round(r * w * 0.55), cs[2]);
  for (let x = Math.round(cx - w * 0.5); x <= Math.round(cx + w * 0.5); x++) R.pset(x, Math.round(cy + w * 0.3), cs[0]); };
// nubes a tres velocidades (lejanas, medias y cercanas), dentro de [y0, y1]
const nubes = (t, y0, y1, cs, n = 5) => { for (let k = 0; k < n; k++) { const v = [1.2, 2.4, 4][k % 3], w = [16, 24, 34][k % 3], x = ((k * 113 + t * v) % 440) - 60, y = y0 + Math.round(hh(k, 3, 9) * (y1 - y0)); nube(Math.round(x), y, w, cs); } };
// pájaros que aletean
const pajaros = (t, n, y0, c = K) => { for (let k = 0; k < n; k++) { const x = Math.round(((k * 71 + t * (9 + k * 2)) % 360) - 20), y = Math.round(y0 + k * 5 + Math.sin(t * 1.3 + k) * 3); if (x > 266 && y < 48) continue; const a = Math.sin(t * 10 + k * 2) > 0 ? 1 : 0; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x - 2, y - a * 2 + (a ? 0 : 1), c); R.pset(x + 1, y - a, c); R.pset(x + 2, y - a * 2 + (a ? 0 : 1), c); } };
// paloma pequeña (o.vuela: aletea y sube)
const paloma = (x, y, t, o = {}) => { x = Math.round(x); y = Math.round(y); const g = hex('#8a8a96'), gs = hex('#5a5a66'), gl = hex('#c8c8d0');
  if (o.vuela) { const a = Math.sin(t * 22 + x) > 0; R.rect(x - 2, y - 1, x + 2, y, g); R.pset(x + 3, y - 1, gs); if (a) { R.linea(x - 1, y - 1, x - 4, y - 4, gl); R.linea(x + 1, y - 1, x + 3, y - 4, gl); } else { R.linea(x - 1, y, x - 4, y + 2, gs); R.linea(x + 1, y, x + 3, y + 2, gs); } return; }
  const p = Math.sin(t * 6 + x) > 0.6 ? 1 : 0, d = o.dir ?? 1; R.rect(x - 2, y - 3, x + 2, y - 1, g); R.rect(x - 1, y - 3, x + 1, y - 3, gl); R.pset(x + 3 * d, y - 4 + p, gs); R.pset(x + 3 * d, y - 5 + p, g); R.pset(x + 4 * d, y - 4 + p, hex('#e8a040')); R.pset(x - 3 * d, y - 2, gs); R.pset(x - 1, y, hex('#c86a4a')); R.pset(x + 1, y, hex('#c86a4a')); };
// la bandera de 1789 (13 barras, el cantón azul con las estrellas), ondeando; (x, y) = arriba junto al asta, d = hacia dónde ondea
const bandera13 = (x, y, w, hgt, t, d = 1) => { const rojo = hex('#c8303a'), rojoS = hex('#962028'), bl = hex('#f2eee2'), blS = hex('#c8c0b0'), az = hex('#2a3a7a');
  for (let i = 0; i < w; i++) { const ola = Math.round(Math.sin(t * 6 - i * 0.45) * 1.5 * i / w), som = Math.cos(t * 6 - i * 0.45) > 0.3; const X = x + i * d;
    for (let j = 0; j < hgt; j++) { const Y = y + j + ola, enCanton = i < w * 0.42 && j < hgt * 0.54, barra = Math.floor(j * 13 / hgt) % 2 === 0;
      R.pset(X, Y, enCanton ? ((i + j) % 3 === 0 && i % 2 === 0 ? bl : az) : barra ? (som ? rojoS : rojo) : (som ? blS : bl)); } R.pset(X, y - 1 + ola, K); R.pset(X, y + hgt + ola, K); }
  R.linea(x - d, y - 3, x - d, y + hgt + 30, hex('#4a3a2a')); R.pset(x - d, y - 4, hex('#e8b830')); };
// el gorro de tres picos que vuela
const tricornio = (x, y, giro) => { x = Math.round(x); y = Math.round(y); const g = Math.round(Math.sin(giro) * 2); R.poligono([[x - 6, y + 1 + g], [x, y - 3], [x + 6, y + 1 - g], [x, y + 3]], K); R.poligono([[x - 5, y + 1 + g], [x, y - 2], [x + 5, y + 1 - g], [x, y + 2]], hex('#2a2430')); R.pset(x, y - 1, hex('#4a4050')); };
'''

E['ny-investidura'] = ('La investidura', '''// NY-INVESTIDURA (frases 24–25), 30 de abril de 1789, cartela «1789». Cinco planos:
// 1. Wall Street con el Federal Hall y la multitud; dos funcionarios salen al balcón a preparar la mesa; una familia
//    llega corriendo por delante y el padre señala el balcón en «capital»; corta en «1789»;
// 2. el balcón de cerca (fondo local): las cortinas se abren, Washington sale en «balcony» y la multitud de abajo agita
//    los sombreros; en «Wall Street» levanta la mano; el canciller sostiene el cojín con la Biblia; corta en «George»;
// 3. inserto (fondo local): la Biblia abierta sobre el cojín rojo, en la mesa del balcón; la mano de Washington baja y se
//    posa en ella en «oath»; a lo lejos, la salva de cañón y los sombreros al aire en «first president»; corta en «He»;
// 4. la logia (colonial 'taberna'): un caballero entra corriendo, el maestre le da la Biblia en «fetched» y se va a
//    toda prisa; el sombrero se le vuela y cae en la cabeza del maestre (gag); corta antes de «because»;
// 5. la calle junto al Federal Hall (fondo local): el funcionario espera en la puerta con el cojín vacío («?» en
//    «nobody»); el caballero llega corriendo, las palomas se espantan, y deja la Biblia en el cojín en «bring one».''', LIB + r'''
const a = (f) => en('balcon', f), b = (f) => en('biblia', f);
const P2 = a(0.393), P3 = a(0.7465), P4 = b(-0.004), P5 = b(0.583);
const CAPITAL = a(0.205), BALCON = a(0.533), WALL = a(0.677), JURA = a(0.865), PRIMER = a(0.929);
const TRAE = b(0.168), LOGIA = b(0.426), NADIE = b(0.70), TRAER = b(0.905);
const PIEL = hex('#f0c8a0'), ROJO = hex('#b8302a'), ROJOS = hex('#86201c'), ROJOL = hex('#d84a3a'), ORO = hex('#e8b830'), OROS = hex('#a8801c'), BL = hex('#f2eee2');
const CAL = hex('#d8d0bc'), CALS = hex('#b0a890'), CALL = hex('#ece6d6'), CALD = hex('#8a8270');
// la Biblia cerrada (x, y = esquina de arriba a la izquierda), de cuero con cantos dorados
const biblia = (x, y, w = 12, hg = 8) => { x = Math.round(x); y = Math.round(y); R.rect(x - 1, y - 1, x + w, y + hg, K); R.rect(x, y, x + w - 1, y + hg - 1, hex('#5a2a1a')); R.rect(x, y + hg - 1, x + w - 1, y + hg - 1, ORO); R.rect(x + 1, y + 1, x + w - 2, y + 1, hex('#7a3a24')); const cx = x + (w >> 1), cy = y + (hg >> 1) - 1; R.rect(cx, cy - 2, cx, cy + 2, ORO); R.rect(cx - 1, cy - 1, cx + 1, cy - 1, ORO); R.pset(cx + 1, cy + 1, OROS); };
// el cojín rojo con borlas (cx, y = arriba)
const cojin = (cx, y, w = 16) => { cx = Math.round(cx); y = Math.round(y); const h0 = Math.round(w / 3); R.rect(cx - (w >> 1) - 1, y - 1, cx + (w >> 1) + 1, y + h0 + 1, K); R.rect(cx - (w >> 1), y, cx + (w >> 1), y + h0, ROJO); R.rect(cx - (w >> 1), y, cx + (w >> 1), y, ROJOL); R.rect(cx - (w >> 1), y + h0, cx + (w >> 1), y + h0, ROJOS); for (const s of [-1, 1]) { R.pset(cx + s * ((w >> 1) + 1), y + h0 + 1, ORO); R.pset(cx + s * ((w >> 1) + 1), y + h0 + 2, OROS); } };

// ── 1 · Wall Street y el Federal Hall ──
const p1 = (t) => {
  const g = T.colonial(R, t, { encuadre: 'wallStreet', anyo: 1789, multitud: 1 });
  // dos funcionarios salen por la puerta del balcón y colocan la mesita con el paño (detrás de la barandilla)
  const s1 = tramo(t, 2.2, 3.6), s2 = tramo(t, 2.6, 4.2);
  if (s1 > 0) R.actor(EL.delegado, Math.round(lerp(153, 126, s1)), 101, t, { dir: s1 < 1 ? -1 : 1, anda: s1 > 0 && s1 < 1, tocado: '', habla: t > 4.6 && Math.sin(t * 8) > 0 });
  if (s2 > 0) R.actor(EL.delegado2, Math.round(lerp(153, 182, s2)), 101, t, { dir: s2 < 1 ? 1 : -1, anda: s2 > 0 && s2 < 1, sostiene: s2 < 1 ? true : [176, 92] });
  if (s2 >= 1) { R.rect(150, 93, 170, 95, K); R.rect(151, 93, 169, 94, ROJO); cojin(160, 89, 12); }
  T.colonialDelante(R, t, { encuadre: 'wallStreet', anyo: 1789 });
  // una familia llega corriendo por delante; el padre señala el balcón en «capital»
  const u = tramo(t, 1.0, CAPITAL - 0.2), xp = Math.round(lerp(-30, 92, u)), xm = Math.round(lerp(-50, 72, u)), xn = Math.round(lerp(-16, 108, tramo(t, 1.2, CAPITAL - 0.4)));
  R.actor(EL.colona, xm, 174, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: u >= 1 });
  R.actor(EL.libertad, xp, 172, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > CAPITAL && t < CAPITAL + 1.6, habla: t > CAPITAL && Math.sin(t * 9) > 0 });
  R.actor(EL.hermanoMoore, xn, 176, t, { dir: 1, anda: xn < 108, salto: t > CAPITAL + 0.3 && t < CAPITAL + 1.4 ? Math.round(Math.abs(Math.sin((t - CAPITAL) * 7)) * 4) : 0, sonrisa: true });
  // un vendedor con su carretilla de ostras cruza de derecha a izquierda
  const v = tramo(t, 0.3, P2), xv = Math.round(lerp(300, 196, v));
  R.actor(EL.estibador, xv, 170, t, { dir: -1, anda: v < 1, sostiene: [xv - 6, 160] });
  R.rect(xv - 24, 158, xv - 4, 165, K); R.rect(xv - 23, 159, xv - 5, 164, hex('#8a5a34')); R.rect(xv - 23, 159, xv - 5, 159, hex('#b07a4a')); for (let i = 0; i < 6; i++) R.pset(xv - 21 + i * 3, 158, i % 2 ? hex('#c8c0b0') : hex('#8a8a7a')); R.disco(xv - 18, 167, 3, K); R.disco(xv - 18, 167, 2, hex('#6a4a2a')); R.pset(xv - 18, 167, hex('#c8a060'));
};

// ── 2 · el balcón de perfil, desde la calle (fondo local) ──
let F2 = null, F2d = null;
const fondo2 = () => capa(() => {
  // la otra acera de Wall Street a lo lejos: casas de ladrillo con ventanas, tejados y chimeneas, y la aguja de la Trinidad
  R.rect(244, 22, 252, 70, K); R.rect(245, 30, 251, 70, hex('#8a7a6a')); R.poligono([[243, 30], [248, 4], [253, 30]], K); R.poligono([[245, 29], [248, 8], [251, 29]], hex('#6a5a4a')); R.pset(248, 3, ORO); R.rect(246, 40, 250, 46, K); R.disco(248, 52, 2, hex('#e8e0cc'));
  const LAD = [hex('#a84a34'), hex('#8a3a28'), hex('#c86a4a'), hex('#9a5a3a'), hex('#b07a5a')];
  for (let k = 0; k < 7; k++) { const x0 = 96 + k * 34, x1 = x0 + 32, top = 46 + (k % 3) * 6, c0 = LAD[k % 5];
    for (let y = top; y < 124; y++) for (let x = x0; x <= Math.min(319, x1); x++) R.pset(x, y, (y % 3 === 0 || (x + (Math.floor(y / 3) % 2) * 2) % 5 === 0) ? mez(c0, K, 0.25) : c0);
    R.rect(x0, top - 2, x1, top, K); R.poligono([[x0, top - 2], [x1, top - 2], [x1 - 6, top - 9], [x0 + 6, top - 9]], hex('#4a4a5a')); R.rect(x0 + 22, top - 15, x0 + 26, top - 8, K); R.rect(x0 + 23, top - 14, x0 + 25, top - 8, mez(c0, K, 0.2));
    for (const fy of [top + 5, top + 22, top + 39]) for (let i = 0; i < 3; i++) { const fx = x0 + 3 + i * 10; if (fx + 6 > x1) continue; R.rect(fx - 1, fy - 1, fx + 6, fy + 10, K); R.rect(fx, fy, fx + 5, fy + 9, hex('#e8e0cc')); R.rect(fx + 1, fy + 1, fx + 4, fy + 8, hex('#3a4a5a')); R.pset(fx + 1, fy + 1, hex('#8aa8c0')); } }
  // el Federal Hall a la izquierda: la pared de sillares, la gran columna, la puerta del balcón y el friso de estrellas
  for (let y = 0; y < 124; y++) for (let x = 0; x < 98; x++) { const fila = Math.floor(y / 8), off = fila % 2 ? 9 : 0, junta = y % 8 === 0 || (x + off) % 18 === 0; R.pset(x, y, junta ? CALS : hh(x >> 1, y >> 1, 3) > 0.92 ? CALS : dz(x, y, 0.3 + 0.4 * hh(Math.floor((x + off) / 18), fila, 5)) ? CAL : mez(CAL, CALS, 0.3)); }
  R.rect(0, 0, 100, 20, K); R.rect(0, 1, 99, 6, CALL); R.rect(0, 7, 99, 18, CAL); R.rect(0, 19, 99, 19, CALD); for (let x = 2; x < 98; x += 5) R.rect(x, 1, x + 2, 5, CALS);
  for (let x = 3; x < 98; x += 8) { R.rect(x, 9, x + 4, 16, CALS); R.rect(x + 1, 10, x + 3, 15, CALL); }
  R.rect(22, 34, 64, 112, K); R.rect(24, 36, 62, 112, CALL); R.rect(27, 39, 59, 112, K);
  for (let y = 40; y < 112; y++) for (let x = 28; x < 59; x++) R.pset(x, y, dz(x, y, (y - 40) / 90) ? hex('#3a2a2a') : hex('#24181c'));
  R.rect(18, 30, 68, 34, K); R.rect(19, 31, 67, 33, CALL);
  for (let y = 20; y < 112; y++) { for (let x = 92; x < 98; x++) R.pset(x, y, mez(R.pget(x, y), K, 0.25)); for (let x = 70; x <= 92; x++) { const u = (x - 70) / 22, est = (x - 70) % 4 === 0; R.pset(x, y, x === 70 || x === 92 ? K : est ? (u < 0.5 ? CALS : CALD) : u < 0.25 ? CALL : u < 0.65 ? CAL : u < 0.85 ? CALS : CALD); } }
  R.rect(66, 20, 96, 25, K); R.rect(67, 21, 95, 24, CALL);
  // la losa del balcón que vuela hasta x 236, con su moldura y las ménsulas
  R.rect(0, 112, 238, 120, K); R.rect(0, 113, 237, 116, CALL); R.rect(0, 117, 237, 119, CALS);
  for (let x = 104; x < 236; x += 26) { R.poligono([[x, 120], [x + 8, 120], [x + 8, 132], [x + 4, 128]], K); R.poligono([[x + 1, 120], [x + 7, 120], [x + 7, 130], [x + 4, 127]], CAL); R.linea(x + 2, 121, x + 2, 126, CALL); }
  // las guirnaldas colgadas del canto de la losa
  for (let k = 0; k < 6; k++) { const g0 = 4 + k * 39; for (let i = 0; i <= 39; i++) { const x = g0 + i, y = 120 + Math.round(Math.sin(i / 39 * Math.PI) * 7); if (x > 236) continue; R.pset(x, y, hex('#c8303a')); R.pset(x, y + 1, BL); R.pset(x, y + 2, hex('#2a3a7a')); } R.disco(g0, 120, 2, K); R.disco(g0, 120, 1, ORO); }
});
// la barandilla de hierro de perfil (tapa las piernas) y el paño rojo
const delante2 = () => capa(() => {
  const H0 = hex('#2a2a34'), H1 = hex('#4a4a5a'), H2 = hex('#7a7a8a');
  R.rect(96, 97, 238, 100, K); R.rect(96, 98, 238, 98, H2); R.rect(96, 99, 238, 99, H1);
  for (let x = 98; x < 238; x += 5) { R.rect(x, 100, x + 1, 112, H0); R.pset(x, 100, H2); R.pset(x, 106, H2); R.pset(x - 1, 106, H1); R.pset(x + 2, 106, H1); }
  R.rect(234, 88, 240, 112, K); R.rect(235, 89, 239, 112, H1); R.disco(237, 86, 3, K); R.disco(237, 86, 2, ORO);
  R.poligono([[146, 97], [196, 97], [194, 122], [148, 122]], K); R.poligono([[147, 98], [195, 98], [193, 121], [149, 121]], ROJO);
  for (let x = 151; x < 192; x += 5) R.linea(x, 100, x + 1, 120, ROJOS); for (let x = 148; x < 195; x++) R.pset(x, 98, ROJOL);
  for (let x = 149; x < 194; x++) { R.pset(x, 122, x % 2 ? ORO : OROS); if (x % 3 === 0) R.pset(x, 123, OROS); }
  { const ex = 171, ey = 108; R.disco(ex, ey, 6, K); R.disco(ex, ey, 5, ORO); R.disco(ex, ey, 3, hex('#2a3a7a')); R.pset(ex, ey, BL); }
});
const p2 = (t) => {
  F2 = F2 || fondo2(); F2d = F2d || delante2();
  degr(0, 0, 319, 70, [hex('#7ab4e0'), hex('#9ccaee'), hex('#c4e2f4')]); nubes(t, 6, 34, [hex('#c4d0e0'), hex('#eef4fa'), hex('#ffffff')], 5); pajaros(t, 3, 26);
  pegar(F2);
  // las palomas del friso salen volando cuando la multitud grita
  const vuelo = tramo(t, BALCON + 0.1, BALCON + 1.8);
  for (let k = 0; k < 4; k++) { const x0 = 14 + k * 22, y0 = 26; if (vuelo <= 0) paloma(x0, y0 - 6, t, { dir: k % 2 ? 1 : -1 }); else if (vuelo < 1) paloma(x0 + vuelo * (60 + k * 30), y0 - 6 - vuelo * 26 + Math.sin(vuelo * 9 + k) * 3, t, { vuela: true }); }
  bandera13(240, 58, 28, 18, t, 1);
  // los vecinos de enfrente asomados a las ventanas, que agitan pañuelos
  for (const [x, y] of [[104, 58], [174, 70], [208, 64], [278, 72]]) { R.rect(x, y, x + 3, y + 3, PIEL); R.pset(x + 1, y + 1, K); const f = Math.sin(t * 7 + x) > 0 ? 1 : 0; R.rect(x + 4, y - 3 - f, x + 6, y - 1 - f, BL); }
  // el secretario espera; las cortinas se abren y Washington sale al balcón en «balcony»; el canciller sostiene la Biblia
  const ab = tramo(t, P2 + 0.2, P2 + 1.0);
  R.actor(EL.delegado2, 112, 112, t, { dir: 1, sonrisa: t > BALCON + 0.4, salto: t > BALCON && t < BALCON + 0.3 ? 1 : 0 });
  const w = tramo(t, P2 + 0.9, BALCON + 0.3), xw = Math.round(lerp(36, 140, w * (2 - w)));
  if (ab > 0.4) R.actor(EL.washington89, xw, 112, t, { dir: 1, anda: w > 0 && w < 1, dedo: t > WALL, sonrisa: t > BALCON + 0.3 });
  const c = R.actor(EL.juez, 200, 112, t, { dir: -1, sostiene: true, sonrisa: t > WALL });
  cojin(c.mano[0] - 3, c.mano[1] - 3, 14); biblia(c.mano[0] - 9, c.mano[1] - 9, 12, 7);
  for (const s of [-1, 1]) { const ancho = Math.round(lerp(16, 3, ab)); for (let y = 40; y < 112; y++) { const x0 = s < 0 ? 28 : 59 - ancho; for (let x = x0; x < x0 + ancho; x++) { const pl = (x - x0 + Math.floor(Math.sin(y / 6) * 1.5)) % 5; R.pset(x, y, pl === 0 ? ROJOS : pl === 1 ? ROJOL : ROJO); } } const bx = s < 0 ? 28 + ancho : 59 - ancho; R.linea(bx, 40, bx, 111, K); R.disco(bx, 80, 1, ORO); }
  pegar(F2d);
  // la multitud de abajo, que agita los sombreros y las banderitas cuando sale Washington
  const grita = t > BALCON + 0.1, tipos = ['peluca', 'rizos', 'mujer', 'calvo', 'marinero'];
  const ropa = ['#2a3a6a', '#7a5a3a', '#5a7a4a', '#8a2a2a', '#3a3a4a', '#c8a060', '#5a3a6a', '#2a5a5a'], pelo = ['#e8e4dc', '#5a3418', '#8a5428', '#2a1c14', '#c8904c'];
  for (let fila = 0; fila < 5; fila++) for (let k = 0; k < 26; k++) { const x = Math.round(k * 12.6 - 6 + (fila % 2) * 6 + (hh(k, fila, 4) - 0.5) * 6), y = 124 + fila * 11 + Math.round(hh(k, fila, 2) * 3) - (grita && hh(k, fila, 8) > 0.6 ? Math.round(Math.abs(Math.sin(t * 7 + k)) * 2) : 0);
    const ti = Math.floor(hh(k, fila, 6) * 5), cr = hex(ropa[Math.floor(hh(k, fila, 7) * 8)]); R.busto(tipos[ti], { C: cr, c: mez(cr, K, 0.3), H: hex(pelo[Math.floor(hh(k, fila, 9) * 5)]), h: hex(pelo[Math.floor(hh(k, fila, 9) * 5)]), V: hex('#e8dcc0') }, x, y, t, { rie: grita, saluda: grita && hh(k, fila, 10) > 0.72 });
    const r = hh(k, fila, 11); if (r > 0.78) { const sy = grita ? y - 5 - Math.round(Math.abs(Math.sin(t * 6 + k)) * 7) : y - 1; tricornio(x + 4, sy, grita ? t * 8 + k : 0); } else if (r < 0.06 && fila > 0) { const f = Math.sin(t * 8 + k) > 0 ? 1 : 0; R.linea(x + 9, y + 2, x + 9, y - 8, hex('#5a3a1a')); R.rect(x + 10, y - 8 + f, x + 15, y - 5 + f, hex('#c8303a')); R.rect(x + 10, y - 8 + f, x + 11, y - 7 + f, hex('#2a3a7a')); R.pset(x + 13, y - 6 + f, BL); } }
};
// ── 3 · inserto: la Biblia sobre el cojín, la mano de Washington ──
let F3 = null, F3c = null;
const fondo3 = () => capa(() => {
  // las casas de enfrente, de ladrillo, con ventanas de guillotina y contraventanas verdes
  const LAD = [hex('#a84a34'), hex('#8a3a28'), hex('#c86a4a'), hex('#9a5a3a')];
  for (let k = 0; k < 6; k++) { const x0 = k * 56 - 10, x1 = x0 + 54, top = 22 + (k % 3) * 5, c0 = LAD[k % 4];
    for (let y = top; y < 92; y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) R.pset(x, y, (y % 4 === 0 || (x + (Math.floor(y / 4) % 2) * 3) % 7 === 0) ? mez(c0, K, 0.3) : hh(x, y, k) > 0.9 ? mez(c0, BL, 0.15) : c0);
    R.rect(x0, top - 3, x1, top, K); R.rect(x0 + 1, top - 2, x1 - 1, top - 1, hex('#4a4a5a'));
    R.rect(x0 + 6, top - 12, x0 + 13, top - 3, K); R.rect(x0 + 7, top - 11, x0 + 12, top - 3, mez(c0, K, 0.15));
    for (const fy of [top + 6, top + 30]) for (let i = 0; i < 3; i++) { const fx = x0 + 6 + i * 16; R.rect(fx - 1, fy - 1, fx + 9, fy + 15, K); R.rect(fx, fy, fx + 8, fy + 14, hex('#c8d8e0')); R.rect(fx + 1, fy + 1, fx + 7, fy + 6, hex('#3a4a5a')); R.rect(fx + 1, fy + 8, fx + 7, fy + 13, hex('#3a4a5a')); R.pset(fx + 2, fy + 2, hex('#a8c0d0')); R.rect(fx - 4, fy, fx - 2, fy + 14, hex('#2a5a3a')); R.rect(fx + 10, fy, fx + 12, fy + 14, hex('#2a5a3a')); R.rect(fx - 1, fy + 15, fx + 9, fy + 16, BL); } }
  // el balcón: la losa de piedra y la barandilla de hierro (grande, de cerca)
  R.rect(0, 92, 319, 98, K); R.rect(0, 93, 319, 96, CALL); R.rect(0, 97, 319, 97, CALS);
});
const cerca3 = () => capa(() => {
  const H0 = hex('#2a2a34'), H1 = hex('#4a4a5a'), H2 = hex('#8a8a9a');
  // el suelo del balcón: losas de piedra en perspectiva entre la barandilla y la mesa
  const FILAS = [98, 104, 111, 119, 128, 138, 150, 164, 180];
  for (let y = 98; y < 180; y++) { const f = FILAS.findIndex((v, i) => y >= v && y < FILAS[i + 1]); for (let x = 0; x < 320; x++) { const X = (x - 160) * (70 / (70 + y - 98)) + 1000, c = Math.floor(X / 22), borde = FILAS.includes(y) || Math.round(X) % 22 === 0, mar = (c + f) % 2 === 0;
    R.pset(x, y, borde ? CALD : mar ? (hh(x >> 1, y, 17) > 0.9 ? CALS : dz(x, y, 0.25) ? CAL : CALL) : (hh(x, y, 19) > 0.85 ? hex('#a8a090') : dz(x, y, 0.3) ? hex('#8a8478') : hex('#9a9488'))); } }
  for (let y = 136; y < 150; y++) for (let x = 0; x < 320; x++) if (dz(x, y, (y - 136) / 16 * 0.6)) R.pset(x, y, mez(R.pget(x, y), K, 0.35));
  for (const [px, py] of [[40, 112], [70, 130], [262, 108], [290, 126], [230, 140], [20, 140]]) { R.pset(px, py, hex('#c8303a')); R.pset(px + 1, py, hex('#e85a6a')); R.pset(px, py + 1, hex('#962028')); }
  R.rect(0, 98, 319, 102, K); R.rect(0, 99, 319, 99, H2); R.rect(0, 100, 319, 101, H1);
  for (let x = 4; x < 320; x += 16) { R.rect(x, 102, x + 3, 120, K); R.rect(x + 1, 102, x + 2, 120, H0); R.pset(x + 1, 103, H2); for (const yy of [108, 114]) { R.disco(x + 1, yy, 3, K); R.disco(x + 1, yy, 2, H0); R.pset(x, yy - 1, H2); } }
  // la mesa con el paño rojo de terciopelo, el cojín y la Biblia: se pintan aparte y se bajan DY píxeles
  const DY = 24, cj = capa(() => {
  R.poligono([[22, 124], [298, 124], [319, 140], [0, 140]], K); R.poligono([[24, 125], [296, 125], [317, 139], [2, 139]], ROJOL);
  for (let y = 125; y < 140; y++) for (let x = 0; x < 320; x++) if (dz(x, y, (y - 125) / 18) && R.pget(x, y) === ROJOL) R.pset(x, y, ROJO);
  for (let y = 140; y < 172; y++) for (let x = 0; x < 320; x++) { const pl = (x + Math.round(Math.sin(y / 9 + x / 30) * 2)) % 22; R.pset(x, y, pl < 2 ? ROJOS : pl < 5 ? ROJOL : dz(x, y, (y - 140) / 40) ? ROJOS : ROJO); }
  R.rect(0, 140, 319, 140, K);
  for (let x = 0; x < 320; x++) { R.pset(x, 172, OROS); for (let y = 173; y < 180; y++) R.pset(x, y, (x + y) % 3 === 0 ? hex('#5a3a1a') : (x % 2 ? ORO : OROS)); }
  // el cojín grande con sus borlas y, encima, la Biblia abierta (páginas con renglones, sin letras)
  R.poligono([[96, 112], [224, 112], [238, 134], [82, 134]], K); R.poligono([[97, 113], [223, 113], [236, 133], [84, 133]], ROJO);
  for (let x = 86; x < 236; x++) R.pset(x, 113, ROJOL); for (let x = 86; x < 236; x += 9) R.linea(x, 114, x + 3, 132, ROJOS);
  for (const [bx, by] of [[84, 134], [236, 134], [97, 112], [223, 112]]) { R.disco(bx, by, 3, K); R.disco(bx, by, 2, ORO); R.linea(bx, by + 2, bx, by + 7, OROS); R.linea(bx + 1, by + 2, bx + 1, by + 6, ORO); }
  R.poligono([[110, 98], [158, 104], [160, 128], [104, 122]], K); R.poligono([[162, 104], [210, 98], [216, 122], [160, 128]], K);
  R.poligono([[112, 100], [158, 105], [159, 126], [106, 121]], hex('#f2e8cc')); R.poligono([[162, 105], [208, 100], [214, 121], [161, 126]], hex('#f2e8cc'));
  for (let i = 0; i < 9; i++) { R.linea(114 + i * 0.6, 104 + i * 2.2, 155, 108 + i * 2.2, hex('#8a7a5a'), 3); R.linea(165, 108 + i * 2.2, 206 - i * 0.6, 104 + i * 2.2, hex('#8a7a5a'), 3); }
  R.rect(117, 103, 128, 108, ROJO); R.rect(118, 104, 127, 107, ROJOL);   // la letra capital iluminada (un adorno, no una letra)
  R.linea(159, 104, 160, 128, hex('#c8b890')); R.poligono([[104, 122], [160, 128], [216, 122], [218, 124], [160, 131], [102, 124]], hex('#5a2a1a')); R.linea(104, 124, 160, 131, ORO); R.linea(160, 131, 218, 124, ORO);
  R.poligono([[158, 128], [162, 128], [163, 142], [160, 139], [157, 142]], ROJO);   // la cinta del marcapáginas
  });
  { const B = R.buf; for (let y = 179 - DY; y >= 0; y--) for (let x = 0; x < 320; x++) { const v = cj[y * 320 + x]; if (v) B[(y + DY) * 320 + x] = v; } }
});
const p3 = (t) => {
  F3 = F3 || fondo3(); F3c = F3c || cerca3();
  degr(0, 0, 319, 30, [hex('#8ac0e8'), hex('#a8d4f0'), hex('#c8e4f4')]); nubes(t, 4, 18, [hex('#c8d4e4'), hex('#eef4fa'), hex('#ffffff')], 4); pajaros(t, 3, 10);
  pegar(F3);
  // la multitud de abajo en la calle, pequeña, que tira los sombreros al aire en «first president»
  for (let k = 0; k < 64; k++) { const x = k * 5 + Math.round(hh(k, 1, 1) * 3), y = 86 + Math.round(hh(k, 2, 1) * 6) - (t > PRIMER && k % 3 === 0 ? Math.round(Math.abs(Math.sin(t * 8 + k)) * 2) : 0); R.rect(x, y, x + 2, y + 2, K); R.pset(x + 1, y + 1, [PIEL, hex('#e8e4dc'), hex('#5a3418'), PIEL][k % 4]); R.pset(x + 1, y + 3, [hex('#2a3a6a'), hex('#7a3a2a'), hex('#3a5a3a')][k % 3]); }
  if (t > PRIMER) for (let k = 0; k < 9; k++) { const u = ((t - PRIMER) * 1.3 + k * 0.17) % 1, x = 20 + k * 33, y = 86 - Math.round(Math.sin(u * Math.PI) * 18); R.rect(x - 1, y, x + 1, y, K); R.pset(x, y - 1, K); }
  // la salva de cañón lejana: un fogonazo y el humo que sube sobre los tejados
  const sv = tramo(t, PRIMER + 0.2, PRIMER + 1.6); if (sv > 0) for (let k = 0; k < 3; k++) { const sx = 196 + k * 14, u = Math.max(0, sv - k * 0.15); if (u <= 0) continue; if (u < 0.12) R.disco(sx, 16, 3, hex('#fff0a0')); R.disco(sx + Math.round(u * 6), 16 - Math.round(u * 8), 2 + Math.round(u * 5), mez(hex('#e8e8ec'), hex('#a8b0c0'), u)); }
  pegar(F3c);
  // la mano del canciller sujeta el cojín por la derecha (manga negra de la toga)
  const resp = Math.round(Math.sin(t * 2.2));
  T.brazo(R, 300, 210, 250, 158 + resp, '#24242c', -1, { codo: [290, 184] });
  // la mano de Washington baja y se posa sobre la Biblia en «oath»
  const m = tramo(t, JURA - 0.9, JURA - 0.05), e = m * m * (3 - 2 * m), wx = Math.round(lerp(70, 120, e)), wy = Math.round(lerp(204, 146, e));
  if (m > 0) T.brazo(R, 50, 214, wx, wy, '#6a4a2a', 1, { codo: [Math.round(lerp(66, 82, e)), Math.round(lerp(212, 182, e))] });
};

// ── 4 · la logia (la taberna): el caballero recoge la Biblia y se va corriendo ──
const p4 = (t) => {
  T.colonial(R, t, { encuadre: 'taberna' });
  // el compás y la escuadra dorados en un estandarte azul colgado de la viga
  { const x = 228, y = 46, sw = Math.round(Math.sin(t * 1.4)); R.linea(x + 9, 30, x + 9, y, hex('#5a3a1a')); R.rect(x - 1 + sw, y, x + 19 + sw, y + 24, K); R.rect(x + sw, y + 1, x + 18 + sw, y + 22, hex('#2a3a7a')); R.poligono([[x + sw, y + 23], [x + 9 + sw, y + 28], [x + 18 + sw, y + 23]], hex('#2a3a7a'));
    R.linea(x + 9 + sw, y + 5, x + 4 + sw, y + 17, ORO); R.linea(x + 9 + sw, y + 5, x + 14 + sw, y + 17, ORO); R.disco(x + 9 + sw, y + 5, 1, ORO); R.linea(x + 3 + sw, y + 13, x + 9 + sw, y + 19, OROS); R.linea(x + 9 + sw, y + 19, x + 15 + sw, y + 13, OROS); for (let i = 0; i < 19; i += 2) R.pset(x + sw + i, y + 22, ORO); }
  // el maestre con su mandil blanco detrás de la mesa; el caballero entra por la izquierda, coge la Biblia y se va
  const ent = tramo(t, P4 + 0.1, TRAE - 0.1), sal = tramo(t, TRAE + 0.55, LOGIA + 0.3), xr = Math.round(sal > 0 ? lerp(124, -30, sal) : lerp(-24, 124, ent));
  const da = t > TRAE + 0.05, gorro = tramo(t, TRAE + 0.6, TRAE + 1.3);
  const m = R.actor(EL.delegado2, 162, 140, t, { dir: -1, sostiene: !da ? true : false, dedo: da && t < LOGIA, sonrisa: true, tocado: gorro >= 1 ? 'tricornio' : undefined, sorpresa: gorro >= 1 && t < gorro + 0.8 });
  R.rect(163, 128, 173, 136, K); R.rect(164, 129, 172, 136, BL); R.rect(164, 129, 172, 130, hex('#2a3a7a'));   // el mandil
  const r = R.actor(EL.libertad, xr, 140, t, { dir: sal > 0 ? -1 : 1, anda: (ent > 0 && ent < 1) || (sal > 0 && sal < 1), sostiene: da ? true : undefined, sorpresa: ent >= 1 && !da, tocado: gorro > 0 ? '' : undefined });
  if (!da) biblia(m.mano[0] - 11, m.mano[1] - 6); else biblia(r.mano[0] - (sal > 0 ? 11 : 2), r.mano[1] - 6);
  if (gorro > 0 && gorro < 1) tricornio(lerp(xr + 7, 169, gorro), lerp(118, 112, gorro) - Math.sin(gorro * Math.PI) * 22, gorro * 14);
  // un hermano de la logia limpia una jarra detrás del mostrador
  { const s = R.actor(EL.colono, 262, 126, t, { dir: -1, sostiene: [256, 112 + Math.round(Math.sin(t * 6))], tocado: '' }); R.rect(s.mano[0] - 3, s.mano[1] - 4, s.mano[0] + 1, s.mano[1], K); R.rect(s.mano[0] - 2, s.mano[1] - 3, s.mano[0], s.mano[1] - 1, hex('#a8a8b0')); }
  T.colonialDelante(R, t, { encuadre: 'taberna' });
};

// ── 5 · la calle junto al Federal Hall: llega justo a tiempo ──
let F5 = null;
const fondo5 = () => capa(() => {
  const LAD = [hex('#a84a34'), hex('#c8a060'), hex('#8a3a28')];
  // las casas georgianas de la calle, cada una con su color, ventanas, puerta con montante y escalones
  const casas = [[-6, 70, 28], [70, 150, 20], [150, 232, 34]];
  casas.forEach(([x0, x1, top], k) => { const c0 = LAD[k];
    for (let y = top; y < 140; y++) for (let x = Math.max(0, x0); x <= x1; x++) R.pset(x, y, (y % 4 === 0 || (x + (Math.floor(y / 4) % 2) * 3) % 7 === 0) && k !== 1 ? mez(c0, K, 0.28) : k === 1 && (x + y) % 9 === 0 ? mez(c0, K, 0.12) : c0);
    R.rect(x0, top - 4, x1, top, K); R.rect(x0 + 1, top - 3, x1 - 1, top - 1, hex('#e8e0cc')); R.poligono([[x0 + 2, top - 4], [x1 - 2, top - 4], [x1 - 14, top - 18], [x0 + 14, top - 18]], hex('#4a4a5a'));
    for (let x = x0 + 16; x < x1 - 14; x += 3) R.linea(x, top - 17, x, top - 5, hex('#3a3a46'));
    R.rect(x0 + 18, top - 30, x0 + 26, top - 16, K); R.rect(x0 + 19, top - 29, x0 + 25, top - 16, mez(c0, K, 0.2)); R.rect(x0 + 18, top - 31, x0 + 26, top - 30, hex('#5a5a66'));
    for (const fy of [top + 8, top + 42]) for (let fx = x0 + 8; fx < x1 - 12; fx += 24) { R.rect(fx - 1, fy - 1, fx + 11, fy + 21, K); R.rect(fx, fy, fx + 10, fy + 20, hex('#e8e0cc')); R.rect(fx + 1, fy + 1, fx + 9, fy + 9, hex('#3a4a5a')); R.rect(fx + 1, fy + 11, fx + 9, fy + 19, hex('#3a4a5a')); R.pset(fx + 2, fy + 2, hex('#a8c0d0')); R.pset(fx + 2, fy + 12, hex('#a8c0d0')); R.linea(fx + 5, fy + 1, fx + 5, fy + 19, hex('#e8e0cc')); R.rect(fx - 4, fy, fx - 2, fy + 20, hex('#2a5a3a')); R.rect(fx + 12, fy, fx + 14, fy + 20, hex('#2a5a3a')); R.rect(fx - 1, fy + 21, fx + 11, fy + 22, hex('#e8e0cc')); }
    const dx = Math.round((x0 + x1) / 2) - 7; R.rect(dx - 3, 108, dx + 17, 140, K); R.rect(dx - 2, 109, dx + 16, 112, hex('#e8e0cc')); R.disco(dx + 7, 114, 6, hex('#e8e0cc')); R.disco(dx + 7, 114, 4, hex('#3a4a5a')); R.rect(dx, 116, dx + 14, 136, [hex('#2a3a5a'), hex('#5a2a2a'), hex('#2a4a3a')][k]); R.rect(dx + 7, 116, dx + 7, 136, K); R.pset(dx + 11, 126, ORO);
    R.rect(dx - 4, 136, dx + 18, 140, hex('#8a8270')); R.rect(dx - 4, 136, dx + 18, 136, hex('#b0a890')); });
  // la muestra colgante de una tienda (un sombrero pintado) y el farol
  R.rect(74, 64, 98, 65, K);
  // el lado del Federal Hall: piedra almohadillada y la puerta en arco abierta
  for (let y = 0; y < 150; y++) for (let x = 232; x < 320; x++) { const fila = Math.floor(y / 10), off = fila % 2 ? 11 : 0, junta = y % 10 === 0 || (x + off) % 22 === 0; R.pset(x, y, junta ? CALS : y > 86 && (y % 10 === 1) ? CALL : hh(x >> 1, y >> 1, 7) > 0.92 ? CALS : y < 46 && x > 274 ? CAL : dz(x, y, 0.3) ? CAL : mez(CAL, CALS, 0.2)); }
  R.rect(232, 0, 234, 150, K); R.rect(235, 0, 237, 150, CALL);
  R.rect(246, 86, 296, 150, K); R.disco(271, 96, 25, K); R.rect(249, 96, 293, 150, hex('#2a1c1c')); R.disco(271, 96, 22, hex('#2a1c1c'));
  for (let y = 74; y < 150; y++) for (let x = 249; x < 294; x++) if (R.pget(x, y) === hex('#2a1c1c') && dz(x, y, (y - 74) / 140)) R.pset(x, y, hex('#3a2622'));
  R.rect(252, 140, 290, 150, ROJOS); R.rect(256, 132, 286, 140, ROJO); for (let x = 252; x < 291; x += 4) R.pset(x, 141, ROJOL);   // la alfombra roja que sale
  for (let k = 0; k < 9; k++) { const ang = Math.PI * (k / 8), x = 271 - Math.cos(ang) * 27, y = 96 - Math.sin(ang) * 27; R.rect(Math.round(x) - 2, Math.round(y) - 2, Math.round(x) + 2, Math.round(y) + 2, K); R.rect(Math.round(x) - 1, Math.round(y) - 1, Math.round(x) + 1, Math.round(y) + 1, CALL); }
  R.rect(244, 50, 298, 56, K); R.rect(245, 51, 297, 55, CALL);
  for (let x = 252; x < 292; x += 13) { R.rect(x, 58, x + 8, 80, K); R.rect(x + 1, 59, x + 7, 79, hex('#4e7088')); R.pset(x + 2, 60, hex('#a8c8d8')); R.rect(x + 1, 69, x + 7, 69, K); }
  // la acera de losas y los adoquines con las rodadas
  for (let y = 140; y < 152; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 140 ? CALL : (x + (y > 145 ? 9 : 0)) % 18 === 0 || y === 146 ? CALD : hh(x, y, 11) > 0.9 ? CALS : mez(CAL, CALS, 0.35));
  R.rect(0, 151, 319, 153, hex('#6a6258')); R.rect(0, 151, 319, 151, CALL);
  for (let y = 154; y < 180; y++) for (let x = 0; x < 320; x++) { const by = Math.floor((y - 154) / 4), bx = Math.floor((x + (by % 2) * 3) / 6), junta = (y - 154) % 4 === 3 || (x + (by % 2) * 3) % 6 === 5, n = hh(bx, by, 13);
    R.pset(x, y, junta ? hex('#4a443e') : n < 0.3 ? hex('#8a8278') : n < 0.75 ? hex('#7a7268') : hex('#9a9288')); }
  for (let x = 0; x < 320; x++) { R.pset(x, 166, hex('#5a544c')); R.pset(x, 174, hex('#5a544c')); }
  R.poligono([[60, 170], [96, 168], [104, 173], [70, 176]], hex('#7a98b0')); R.linea(66, 171, 92, 170, hex('#c8e0ec'));   // un charco
});
const p5 = (t) => {
  F5 = F5 || fondo5();
  const llega = tramo(t, P5 + 0.1, TRAER - 0.05), xr = Math.round(lerp(-24, 226, llega)), deja = t > TRAER + 0.1;
  degr(0, 0, 231, 40, [hex('#8ac0e8'), hex('#a8d4f0'), hex('#c8e4f4')]); nubes(t, 4, 20, [hex('#c8d4e4'), hex('#eef4fa'), hex('#ffffff')], 4); pajaros(t, 2, 12);
  pegar(F5);
  // el humo de las chimeneas y la muestra que se mece
  for (const cx of [16, 92, 172]) for (let k = 0; k < 4; k++) { const u = (t * 0.4 + k / 4) % 1, x = Math.round(cx + 4 + u * 8 + Math.sin(u * 6 + k) * 2), y = Math.round([0, 0, 0][0] + (cx === 92 ? -12 : cx === 16 ? -4 : -6) + 0 - u * 14); if (y > 0) R.disco(x, y, 1 + Math.round(u * 2), mez(hex('#d8d8e0'), hex('#a8a8b8'), u)); }
  { const sw = Math.sin(t * 2.2) * 2; R.linea(86, 65, 86 + Math.round(sw), 70, K); R.rect(80 + Math.round(sw), 70, 94 + Math.round(sw), 80, K); R.rect(81 + Math.round(sw), 71, 93 + Math.round(sw), 79, hex('#e8c878')); tricornio(87 + sw, 75, 0); }
  // vecinos asomados a las ventanas con banderitas
  for (const [x, y] of [[33, 54], [114, 46], [192, 60]]) { R.rect(x - 2, y - 7, x + 4, y, K); R.rect(x - 1, y - 6, x + 3, y - 1, PIEL); R.pset(x, y - 4, K); R.pset(x + 2, y - 4, K); const f = Math.sin(t * 6 + x) > 0 ? 1 : 0; R.linea(x + 5, y - 2, x + 5, y - 10, hex('#5a3a1a')); R.rect(x + 6, y - 10 + f, x + 10, y - 7 + f, hex('#c8303a')); R.rect(x + 6, y - 10 + f, x + 7, y - 9 + f, hex('#2a3a7a')); }
  // el carro aparcado con barriles, el farol y el perro que duerme junto a los barriles (se despierta cuando pasa)
  { const cx = 8; R.rect(cx, 146, cx + 40, 156, K); R.rect(cx + 1, 147, cx + 39, 155, hex('#8a5a34')); for (let i = 0; i < 4; i++) { const bx = cx + 3 + i * 9; R.rect(bx, 136, bx + 7, 146, K); R.rect(bx + 1, 137, bx + 6, 146, hex('#a8703a')); R.rect(bx + 1, 139, bx + 6, 139, K); R.rect(bx + 1, 143, bx + 6, 143, K); R.pset(bx + 2, 138, hex('#c89050')); }
    for (const wx of [cx + 8, cx + 32]) { R.disco(wx, 159, 6, K); R.disco(wx, 159, 5, hex('#6a4a2a')); R.disco(wx, 159, 2, K); for (let a = 0; a < 6.28; a += 1.05) R.pset(Math.round(wx + Math.cos(a) * 4), Math.round(159 + Math.sin(a) * 4), hex('#8a6a3a')); } R.linea(cx + 40, 152, cx + 58, 156, K); }
  { const fx = 140; R.rect(fx, 104, fx + 2, 150, K); R.rect(fx + 1, 105, fx + 1, 150, hex('#4a4a5a')); R.rect(fx - 4, 96, fx + 6, 106, K); R.rect(fx - 3, 97, fx + 5, 105, hex('#f0d080')); R.rect(fx - 3, 97, fx + 5, 98, hex('#3a3a46')); R.pset(fx + 1, 101, hex('#fff0a0')); R.poligono([[fx - 5, 96], [fx + 1, 91], [fx + 7, 96]], K); }
  { const dx = 206, des = xr > 150 && llega > 0, cola = Math.round(Math.sin(t * (des ? 14 : 2)) * 2); R.rect(dx, 144, dx + 12, 149, K); R.rect(dx + 1, 145, dx + 11, 148, hex('#b07a4a')); R.rect(dx + 3, 145, dx + 7, 146, hex('#d8a060'));
    const hy = des ? 138 : 143; R.rect(dx + 10, hy, dx + 16, hy + 5, K); R.rect(dx + 11, hy + 1, dx + 15, hy + 4, hex('#b07a4a')); R.pset(dx + 16, hy + 3, K); R.pset(dx + 13, hy + 2, des ? K : hex('#8a5a34')); R.rect(dx + 10, hy + 1, dx + 11, hy + 4, hex('#6a4028')); R.linea(dx, 146, dx - 3, 145 + cola, K);
    if (des && t < TRAER) for (let k = 0; k < 3; k++) if (Math.sin(t * 9 + k) > 0) R.pset(dx + 19 + k * 2, hy + 1 - k, K); }
  // el funcionario espera en la puerta con el cojín vacío; otro asoma y se encoge de hombros
  R.actor(EL.delegado, 282, 150, t, { dir: -1, tocado: '', brazos: t > NADIE && t < NADIE + 0.9, sorpresa: t > NADIE && !deja });
  const f = R.actor(EL.juez, 250, 150, t, { dir: -1, sostiene: deja ? [244, 130] : true, sorpresa: t > NADIE - 0.2 && !deja, sonrisa: deja, salto: !deja && Math.floor(t * 4) % 2 && t < NADIE ? 1 : 0 });
  cojin(f.mano[0] - 4, f.mano[1] - 2, 14); if (deja) biblia(f.mano[0] - 10, f.mano[1] - 8, 12, 7);
  if (t > NADIE && !deja) R.bocadillo(f.cabeza[0] - 2, f.cabeza[1] - 6, { icono: '?' });
  // las palomas del empedrado se espantan cuando pasa corriendo
  for (let k = 0; k < 5; k++) { const px = 96 + k * 17, pasa = xr > px - 20 && llega > 0, u = pasa ? Math.min(1, (xr - px + 20) / 60) : 0; if (u <= 0) paloma(px, 160 + (k % 2) * 6, t, { dir: k % 2 ? 1 : -1 }); else paloma(px + u * 40 * (k % 2 ? 1 : -1), 160 - u * 70 + (k % 2) * 6, t, { vuela: true }); }
  // el caballero sin sombrero llega corriendo con la Biblia bajo el brazo y sube a la acera
  const sube = tramo(t, TRAER - 0.5, TRAER - 0.05), suelo = Math.round(lerp(170, 150, sube));
  const r = R.actor(EL.libertad, xr, suelo, t, { dir: 1, anda: llega > 0 && llega < 1, tocado: '', sostiene: deja ? undefined : true, sonrisa: deja, salto: llega > 0 && llega < 1 ? Math.round(Math.abs(Math.sin(t * 12)) * 2) : 0 });
  if (!deja) biblia(r.mano[0] - 2, r.mano[1] - 6);
  if (llega > 0 && llega < 1) for (let k = 0; k < 3; k++) { const u = (t * 3 + k / 3) % 1; R.pset(xr - 2 - Math.round(u * 10), suelo - 1 - Math.round(u * 3), hex('#b0a898')); }
  if (deja) for (const [dx, dy] of [[-2, -4], [16, -5]]) if (Math.sin(t * 8) > 0) R.pset(r.cabeza[0] + dx, r.cabeza[1] + dy + Math.round((t * 6) % 4), hex('#8ac0e8'));
  if (deja && t < TRAER + 1) { const u = tramo(t, TRAER + 0.1, TRAER + 1); for (let k = 0; k < 6; k++) { const an = k * 1.05, d = 4 + u * 8; R.pset(Math.round(f.mano[0] - 4 + Math.cos(an) * d), Math.round(f.mano[1] - 6 + Math.sin(an) * d), ORO); } }
};
const efectos = [[1.6, 'publico'], [3.0, 'puerta'], [BALCON + 0.1, 'publico'], [JURA, 'golpecito'], [PRIMER + 0.2, 'boom'], [TRAE + 0.05, 'papel'], [TRAE + 0.6, 'whoosh'], [TRAE + 1.3, 'pop'], [P5 + 0.6, 'whoosh'], [NADIE + 0.1, 'boing'], [TRAER + 0.1, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '1789', efectos, año: 1789 });
''')

E['ny-capital'] = ('La capital se va', '''// NY-CAPITAL (frases 26–28), 1789–1800. Cinco planos:
// 1. la sala del Congreso (colonial 'salon' 'congreso'): el escribano desenrolla el pergamino largo en «proposes» y los
//    congresistas firman con sus plumas en «Bill of Rights»; el presidente da un mazazo; corta antes de «and»;
// 2. la sala del Tribunal ('salon' 'tribunal'): cinco jueces se sientan uno tras otro en «Supreme Court», el sexto llega
//    con prisa por la derecha y se sienta el último; el presidente da un mazazo en «first time»; corta en «But»;
// 3. la cena de 1790 ('salon' 'cena', de noche): tres políticos a la luz de las velas; dos se dan la mano en «struck»;
//    el anfitrión señala el mapa de encima de la chimenea y una flecha roja baja de Nueva York al sur en «south»;
// 4. el mapa de la costa (T.mapa): la flecha de Nueva York a Filadelfia y al Potomac; el carro con las cajas de papeles
//    se va de Nueva York en «loses the government»; la chincheta de la nueva capital cae al final (1790 → 1800);
// 5. los muelles (puerto 'muelles'): todo bulle; el comerciante sigue apuntando en su libro y no levanta la vista ni
//    cuando un fardo cae a su lado en «harbor was enough» (gag).''', LIB + r'''
const d = (f) => en('derechos', f), c = (f) => en('cena', f), p = (f) => en('puerto', f);
const P2 = d(0.543), P3 = c(0.0218), P4 = c(0.703), P5 = p(-0.011);
const PROPONE = d(0.265), DERECHOS = d(0.39), SUPREMO = d(0.605), PRIMERA = d(0.853);
const TRATO = c(0.311), SUR = c(0.59), PIERDE = c(0.80), CRECE = p(0.471), PUERTO = p(0.758);
const ORO = hex('#e8b830'), OROS = hex('#a8801c'), BL = hex('#f2eee2'), PERG = hex('#f0e4c4'), PERGS = hex('#c8b890');
// el mazo en la mano (x, y)
const mazo = (x, y, arriba) => { x = Math.round(x); y = Math.round(y); const dy = arriba ? -4 : 0; R.linea(x, y, x + 2, y - 4 + dy, hex('#5a3a1a')); R.rect(x, y - 7 + dy, x + 5, y - 4 + dy, K); R.rect(x + 1, y - 6 + dy, x + 4, y - 5 + dy, hex('#8a5a34')); };

// ── 1 · el Congreso: el pergamino largo y las plumas ──
const p1 = (t) => {
  T.colonial(R, t, { encuadre: 'salon', sala: 'congreso' });
  // el presidente en su sillón, que da un mazazo en «Bill of Rights»
  const golpe = t > DERECHOS && t < DERECHOS + 0.25;
  const pr = R.actor(EL.delegado, 153, 124, t, { dir: 1, tocado: '', sostiene: [168, golpe ? 116 : 108], habla: t < PROPONE && Math.sin(t * 7) > 0 }); mazo(pr.mano[0], pr.mano[1], !golpe);
  // cuatro congresistas detrás de la mesa, con la pluma en la mano
  const CON = [[EL.delegado2, 92, 1], [EL.delegado, 116, 1], [EL.delegado2, 190, -1], [EL.delegado, 214, -1]];
  const manos = CON.map(([def, x, dir], k) => { const escribe = t > DERECHOS + k * 0.15; const o = { dir, tocado: '', sostiene: [x + (dir > 0 ? 18 : -4), 137 + (escribe ? Math.round(Math.sin(t * 14 + k)) : 0)], sonrisa: escribe && k % 2 === 0, habla: !escribe && k === 2 && Math.sin(t * 8) > 0 };
    if (k === 1 || k === 3) o.pal = { C: k === 1 ? '#5a3a5a' : '#2a4a3a', c: '#e8dcc0' }; return R.actor(def, x, 146, t, o).mano; });
  T.colonialDelante(R, t, { encuadre: 'salon', sala: 'congreso' });
  // el escribano desenrolla el pergamino de derecha a izquierda (lo que aún no está desenrollado es paño)
  const u = tramo(t, PROPONE - 0.4, DERECHOS - 0.1), xr = Math.round(lerp(208, 110, u)), pano = R.pget(100, 145);
  if (u < 1) { R.rect(108, 141, xr, 147, pano); R.rect(xr - 2, 139, xr + 3, 148, K); R.rect(xr - 1, 140, xr + 2, 147, PERG); R.rect(xr + 2, 140, xr + 2, 147, PERGS); R.rect(xr - 1, 140, xr + 2, 140, BL); }
  // las firmas: rúbricas que aparecen bajo cada pluma (rayas, sin letras), y las plumas
  manos.forEach(([mx, my], k) => { const f = tramo(t, DERECHOS + k * 0.15, DERECHOS + 0.9 + k * 0.15); if (f > 0) { const x0 = Math.max(110, Math.min(200, mx - 10)); for (let i = 0; i < Math.round(f * 12); i++) R.pset(x0 + i, 143 + Math.round(Math.sin(i * 1.3 + k) * 1.2), hex('#3a2a4a')); }
    if (mx > 104 && mx < 216 || true) { R.linea(mx, my, mx + 3, my - 9, BL); R.linea(mx + 1, my, mx + 4, my - 8, hex('#c8c0b0')); R.pset(mx, my + 1, K); } });
  // el ujier cruza por delante con un tintero nuevo
  const v = tramo(t, 0.2, P2 - 0.2), xu = Math.round(lerp(330, -20, v)); const uj = R.actor(EL.libertad, xu, 176, t, { dir: -1, anda: true, tocado: '', sostiene: true });
  R.rect(uj.mano[0] - 2, uj.mano[1] - 4, uj.mano[0] + 2, uj.mano[1], K); R.rect(uj.mano[0] - 1, uj.mano[1] - 3, uj.mano[0] + 1, uj.mano[1] - 1, hex('#2a2a4a')); R.linea(uj.mano[0], uj.mano[1] - 4, uj.mano[0] + 2, uj.mano[1] - 10, BL);
};

// ── 2 · el Tribunal Supremo se sienta por primera vez ──
const p2 = (t) => {
  T.colonial(R, t, { encuadre: 'salon', sala: 'tribunal' });
  const X = [81, 110, 139, 168, 197, 226];
  X.forEach((x, k) => { if (k === 5) return; const s = tramo(t, SUPREMO + k * 0.14, SUPREMO + 0.25 + k * 0.14), golpe = k === 2 && t > PRIMERA && t < PRIMERA + 0.25;
    const j = R.actor(EL.juez, x, Math.round(lerp(120, 128, s)), t, { dir: k < 3 ? 1 : -1, sonrisa: t > PRIMERA + 0.3, sostiene: k === 2 && s >= 1 ? [x + 18, golpe ? 114 : 106] : undefined, pal: k % 2 ? { H: '#d8d4cc' } : undefined }); if (k === 2 && s >= 1) mazo(j.mano[0], j.mano[1], !golpe); });
  // el sexto juez llega con prisa por la derecha y se sienta el último
  const ll = tramo(t, P2 + 0.1, SUPREMO + 0.9), x6 = Math.round(lerp(330, 226, ll)), s6 = tramo(t, SUPREMO + 1.0, SUPREMO + 1.25);
  R.actor(EL.juez, x6, Math.round(lerp(120, 128, s6)), t, { dir: -1, anda: ll > 0 && ll < 1, sorpresa: ll < 1, sonrisa: t > PRIMERA + 0.3, salto: ll > 0 && ll < 1 ? Math.round(Math.abs(Math.sin(t * 11)) * 2) : 0 });
  T.colonialDelante(R, t, { encuadre: 'salon', sala: 'tribunal' });
  // delante: el pregonero con su vara anuncia la sesión; el escribano escribe en su pupitre
  const pg = R.actor(EL.libertad, 268, 176, t, { dir: -1, tocado: '', habla: t < SUPREMO + 0.6 && Math.sin(t * 9) > 0, sostiene: [262, 150 + (t > PRIMERA && t < PRIMERA + 0.3 ? 3 : 0)] }); R.linea(pg.mano[0], pg.mano[1] - 16, pg.mano[0], pg.mano[1] + 14, hex('#5a3a1a')); R.disco(pg.mano[0], pg.mano[1] - 17, 2, ORO);
  { const x0 = 34; const e = R.actor(EL.delegado2, x0 + 14, 174, t, { dir: 1, tocado: '', sostiene: [x0 + 34, 160 + Math.round(Math.sin(t * 12))] });
    R.rect(x0 + 24, 158, x0 + 50, 162, K); R.rect(x0 + 25, 158, x0 + 49, 160, hex('#8a5a34')); R.rect(x0 + 27, 162, x0 + 29, 178, K); R.rect(x0 + 45, 162, x0 + 47, 178, K); R.rect(x0 + 28, 156, x0 + 44, 158, PERG);
    R.linea(e.mano[0], e.mano[1], e.mano[0] + 3, e.mano[1] - 8, BL); for (let i = 0; i < Math.round(tramo(t, P2, P3) * 14); i++) R.pset(x0 + 29 + i, 157, hex('#3a2a4a')); }
};

// ── 3 · la cena de 1790: el trato y la flecha al sur ──
const p3 = (t) => {
  T.colonial(R, t, { encuadre: 'salon', sala: 'cena' });
  // el mapa enmarcado encima de la chimenea: la costa, Nueva York arriba y la flecha roja que baja al sur en «south»
  { const x0 = 196, y0 = 14, x1 = 250, y1 = 54; R.rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, K); R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, OROS); R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const costa = x0 + 40 - (y - y0) * 0.6 + Math.sin(y * 0.7) * 2; R.pset(x, y, x < costa ? (dz(x, y, 0.3) ? hex('#c8b080') : hex('#b89a68')) : (dz(x, y, 0.4) ? hex('#5a7a8a') : hex('#4a6a7a'))); }
    R.disco(x0 + 37, y0 + 6, 2, hex('#2a3a7a')); R.pset(x0 + 37, y0 + 6, ORO); const u = tramo(t, SUR - 0.1, SUR + 0.7), ex = Math.round(lerp(x0 + 35, x0 + 16, u)), ey = Math.round(lerp(y0 + 9, y0 + 32, u));
    if (u > 0) { for (const dd of [-1, 0, 1]) R.linea(x0 + 35 + dd, y0 + 9, ex + dd, ey, hex('#c8303a')); if (u >= 1) { R.poligono([[ex - 3, ey - 1], [ex + 3, ey - 3], [ex - 1, ey + 3]], hex('#c8303a')); R.pset(ex - 1, ey + 2, ORO); } }
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if ((x + y) % 4 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#f0a040'), 0.25)); }
  // la criada pasa por detrás con la sopera
  const v = tramo(t, P3 + 0.1, TRATO + 0.4), xs = Math.round(lerp(40, 330, v)); const cr = R.actor(EL.colona, xs, 140, t, { dir: 1, anda: v > 0 && v < 1, sostiene: true });
  R.rect(cr.mano[0] - 3, cr.mano[1] - 4, cr.mano[0] + 4, cr.mano[1], K); R.rect(cr.mano[0] - 2, cr.mano[1] - 3, cr.mano[0] + 3, cr.mano[1] - 1, BL); for (let k = 0; k < 3; k++) { const u = (t * 0.8 + k / 3) % 1; R.pset(cr.mano[0] + Math.round(Math.sin(u * 7) * 1.5), cr.mano[1] - 5 - Math.round(u * 7), hex('#d8d8e0')); }
  // dos políticos sentados se dan la mano en «struck»; el anfitrión levanta la copa y luego señala el mapa
  const mano = t > TRATO - 0.2 && t < TRATO + 1.6;
  R.actor(EL.delegado2, 104, 146, t, { dir: 1, tocado: '', sostiene: mano ? [124, 129] : undefined, sonrisa: t > TRATO, habla: !mano && t < TRATO && Math.sin(t * 7) > 0.2 });
  R.actor(EL.delegado, 126, 146, t, { dir: -1, tocado: '', sostiene: mano ? [120, 129] : undefined, sonrisa: t > TRATO, pal: { C: '#2a4a3a', c: '#e8dcc0' } });
  if (mano) { R.rect(119, 126, 125, 130, K); R.rect(120, 127, 124, 129, hex('#f0c8a0')); }
  const se = t > SUR - 0.4; const an = R.actor(EL.delegado2, 196, 146, t, { dir: se ? 1 : -1, tocado: '', dedo: se && t < SUR + 1.4, sostiene: !se ? [192, 124 + (t > TRATO && t < TRATO + 0.8 ? -3 : 0)] : undefined, sonrisa: true, pal: { C: '#5a2a3a', c: '#e8dcc0' } });
  if (!se) { const [gx, gy] = an.mano; R.rect(gx - 1, gy - 5, gx + 2, gy - 2, K); R.rect(gx, gy - 4, gx + 1, gy - 3, hex('#8a2a3a')); R.pset(gx, gy - 1, K); R.rect(gx - 1, gy, gx + 2, gy, K); }
  T.colonialDelante(R, t, { encuadre: 'salon', sala: 'cena' });
  // el gato bajo la mesa persigue una miga
  { const gx = 60 + Math.round(Math.sin(t * 0.9) * 6); R.rect(gx, 170, gx + 8, 174, K); R.rect(gx + 1, 171, gx + 7, 173, hex('#5a5a66')); R.rect(gx + 7, 167, gx + 11, 171, K); R.rect(gx + 8, 168, gx + 10, 170, hex('#5a5a66')); R.pset(gx + 8, 166, K); R.pset(gx + 10, 166, K); R.pset(gx + 9, 169, hex('#e8c840')); R.linea(gx, 171, gx - 4, 167 + Math.round(Math.sin(t * 5)), K); }
};

// ── 4 · el mapa de la costa: la capital se va al sur ──
const NY = [-74.0, 40.71], FIL = [-75.16, 39.95], WAS = [-77.04, 38.9];
const carro = (x, y, d) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 7, y - 6, x + 5, y - 1, K); R.rect(x - 6, y - 5, x + 4, y - 2, hex('#8a5a34')); R.rect(x - 6, y - 9, x - 1, y - 6, K); R.rect(x - 5, y - 8, x - 2, y - 6, hex('#e8dcc0')); R.rect(x, y - 10, x + 4, y - 6, K); R.rect(x + 1, y - 9, x + 3, y - 6, hex('#c8a060'));
  R.disco(x - 4, y, 2, K); R.disco(x + 3, y, 2, K); R.pset(x - 4, y, hex('#c8a060')); R.pset(x + 3, y, hex('#c8a060'));
  const hx = x + 10 * d; R.rect(hx - 4, y - 6, hx + 4, y - 3, K); R.rect(hx - 3, y - 5, hx + 3, y - 4, hex('#6a4a2a')); R.rect(hx + 3 * d, y - 9, hx + 5 * d, y - 5, K); R.pset(hx + 4 * d, y - 8, hex('#6a4a2a')); R.linea(hx - 3, y - 2, hx - 3, y, K); R.linea(hx + 3, y - 2, hx + 3, y, K); R.linea(x + 5 * d, y - 4, hx - 4 * d, y - 4, K); };
const sede = (x, y, gris) => { x = Math.round(x); y = Math.round(y); const c = gris ? hex('#a8a8a8') : hex('#f2eee2'), cs = gris ? hex('#7a7a7a') : hex('#c8c0b0');
  R.rect(x - 7, y - 8, x + 7, y, K); R.rect(x - 6, y - 7, x + 6, y - 1, c); for (let i = -5; i <= 5; i += 2) R.linea(x + i, y - 6, x + i, y - 1, cs); R.poligono([[x - 8, y - 8], [x, y - 13], [x + 8, y - 8]], K); R.poligono([[x - 6, y - 9], [x, y - 12], [x + 6, y - 9]], c); R.linea(x, y - 13, x, y - 17, K); if (!gris) R.rect(x + 1, y - 17, x + 4, y - 15, hex('#c8303a')); };
const p4 = (t) => {
  const P = T.mapa(R, t, { zoom: 5.2, centro: [-75.6, 40.2] });
  const ny = P(NY), fi = P(FIL), wa = P(WAS), ruta = [ny, [lerp(ny[0], fi[0], 0.5) + 4, lerp(ny[1], fi[1], 0.5) + 2], fi, [lerp(fi[0], wa[0], 0.5) + 3, lerp(fi[1], wa[1], 0.5) + 3], wa];
  const r = tramo(t, P4 + 0.1, P4 + 1.0);
  if (r > 0) { R.ruta(ruta, r); }
  // el carro con las cajas de papeles sale de Nueva York y baja; para en Filadelfia (1790) y sigue al Potomac (1800)
  const c1 = tramo(t, PIERDE - 0.3, PIERDE + 1.4), c2 = tramo(t, PIERDE + 2.0, P5 - 0.6);
  const at = (u) => { const L = []; let tot = 0; for (let i = 1; i < ruta.length; i++) { const dd = Math.hypot(ruta[i][0] - ruta[i - 1][0], ruta[i][1] - ruta[i - 1][1]); L.push(dd); tot += dd; } let q = u * tot; for (let i = 1; i < ruta.length; i++) { if (q <= L[i - 1]) { const f = q / L[i - 1]; return [lerp(ruta[i - 1][0], ruta[i][0], f), lerp(ruta[i - 1][1], ruta[i][1], f)]; } q -= L[i - 1]; } return ruta[ruta.length - 1]; };
  const L1 = Math.hypot(fi[0] - ny[0], fi[1] - ny[1]), L2 = Math.hypot(wa[0] - fi[0], wa[1] - fi[1]), uf = L1 / (L1 + L2), uc = c1 < 1 ? c1 * uf : uf + c2 * (1 - uf);
  sede(ny[0] + 10, ny[1] - 4, c1 > 0.15);
  T.chincheta(R, Math.round(fi[0]), Math.round(fi[1]), t, hex('#e8b830'), { baja: tramo(t, PIERDE + 1.2, PIERDE + 1.6) });
  T.chincheta(R, Math.round(wa[0]), Math.round(wa[1]), t, hex('#c8303a'), { baja: tramo(t, P5 - 0.9, P5 - 0.5), pulso: true });
  T.chincheta(R, Math.round(ny[0]), Math.round(ny[1]), t, c1 > 0.15 ? hex('#8a8a8a') : hex('#2a3a7a'));
  if (t > PIERDE - 0.3) { const [cx, cy] = at(uc); carro(cx, cy - 2, -1); if ((c1 > 0 && c1 < 1) || (c2 > 0 && c2 < 1)) for (let k = 0; k < 3; k++) { const u = (t * 2 + k / 3) % 1; R.pset(Math.round(cx + 8 + u * 6), Math.round(cy - 3 - u * 4), hex('#c8b890')); } }
};

// ── 5 · los muelles: el comerciante ni levanta la vista ──
const p5 = (t) => {
  T.puerto(R, t, { encuadre: 'muelles' });
  // un estibador rueda un barril por detrás; otro carga un saco hacia el fondo
  const v = tramo(t, P5 + 0.2, PUERTO + 0.6), xb = Math.round(lerp(262, 150, v)); R.actor(EL.estibador, xb + 12, 160, t, { dir: -1, anda: v > 0 && v < 1, sostiene: [xb + 6, 152] });
  { const g = (xb * 0.4) % 6; R.rect(xb - 6, 146, xb + 6, 160, K); R.rect(xb - 5, 147, xb + 5, 159, hex('#8a5a34')); R.rect(xb - 5, 149 + Math.round(g / 3), xb + 5, 149 + Math.round(g / 3), K); R.rect(xb - 5, 156 - Math.round(g / 3), xb + 5, 156 - Math.round(g / 3), K); R.rect(xb - 4, 147, xb - 3, 159, hex('#b07a4a')); }
  const w = tramo(t, P5, P5 + 4.5), xs = Math.round(lerp(70, 180, w)); const s = R.actor(EL.estibador2, xs, Math.round(lerp(162, 132, w)), t, { dir: 1, anda: w < 1, sostiene: true }); R.rect(s.mano[0] - 6, s.mano[1] - 9, s.mano[0] + 2, s.mano[1] - 1, K); R.rect(s.mano[0] - 5, s.mano[1] - 8, s.mano[0] + 1, s.mano[1] - 2, hex('#d8c8a0'));
  // el fardo que baja de la grúa con su cuerda y cae junto al comerciante en «harbor»
  const fb = tramo(t, CRECE, PUERTO), yb = Math.round(lerp(-10, 162, fb * fb)), BX = 186;
  R.linea(BX, 0, BX, yb - 10, hex('#8a7a5a')); R.rect(BX - 10, yb - 12, BX + 10, yb + 4, K); R.rect(BX - 9, yb - 11, BX + 9, yb + 3, hex('#e8dcc0')); R.rect(BX - 9, yb - 5, BX + 9, yb - 4, hex('#8a6a3a')); R.rect(BX - 1, yb - 11, BX, yb + 3, hex('#8a6a3a')); R.rect(BX - 9, yb - 11, BX + 9, yb - 11, BL); R.rect(BX - 9, yb + 1, BX + 9, yb + 3, hex('#b8a880'));
  if (t > PUERTO) { const u = tramo(t, PUERTO, PUERTO + 0.8); for (let k = 0; k < 8; k++) { const an = Math.PI + k * Math.PI / 7; R.disco(Math.round(BX + Math.cos(an) * (11 + u * 16)), Math.round(165 + Math.sin(an) * (2 + u * 6)), u < 0.6 ? 2 : 1, hex('#b0a898')); } }
  // el comerciante, de pie junto a sus cajas, apunta en el libro sin levantar la vista
  const cm = R.actor(EL.comerciante, 150, 178, t, { dir: 1, sostiene: [166, 166] });
  R.rect(cm.mano[0] - 2, cm.mano[1] - 5, cm.mano[0] + 9, cm.mano[1] + 1, K); R.rect(cm.mano[0] - 1, cm.mano[1] - 4, cm.mano[0] + 3, cm.mano[1], BL); R.rect(cm.mano[0] + 4, cm.mano[1] - 4, cm.mano[0] + 8, cm.mano[1], hex('#e8e0cc'));
  for (let i = 0; i < 3; i++) R.linea(cm.mano[0], cm.mano[1] - 3 + i, cm.mano[0] + 2, cm.mano[1] - 3 + i, hex('#8a8a8a'));
  { const px = cm.mano[0] + 5 + Math.round(Math.sin(t * 10) * 2); R.linea(px, cm.mano[1] - 2, px + 3, cm.mano[1] - 9, BL); }
  // una gaviota se posa en el bolardo
  { const g = tramo(t, P5 + 1.5, P5 + 2.6), gx = Math.round(lerp(330, 92, g)), gy = Math.round(lerp(40, 150, g) - Math.sin(g * Math.PI) * 20); R.rect(88, 152, 96, 166, K); R.rect(89, 153, 95, 166, hex('#3a3a46')); R.rect(87, 151, 97, 153, K);
    const vol = g < 1, a = Math.sin(t * 16) > 0; R.rect(gx - 3, gy - 3, gx + 2, gy, BL); R.pset(gx + 3, gy - 3, hex('#e8a040')); R.pset(gx + 2, gy - 4, BL); R.pset(gx - 3, gy - 2, hex('#a8a8b0')); if (vol) { R.linea(gx - 1, gy - 2, gx - 5, gy - (a ? 7 : 0), hex('#c8c8d0')); R.linea(gx, gy - 2, gx + 4, gy - (a ? 7 : 0), hex('#c8c8d0')); } else R.rect(gx - 2, gy - 2, gx, gy - 1, hex('#a8a8b0')); }
};
const año = (t) => (t < P2 ? 1789 : t < PIERDE + 2 ? 1790 : t < P5 ? Math.round(lerp(1790, 1800, tramo(t, PIERDE + 2, P5 - 0.6))) : 1800);
const efectos = [[PROPONE - 0.3, 'papel'], [DERECHOS, 'toc'], [SUPREMO + 0.2, 'golpecito'], [PRIMERA, 'toc'], [TRATO, 'palmada'], [SUR, 'whoosh'], [PIERDE + 1.4, 'pop'], [P5 - 0.6, 'brillo'], [P5 + 0.4, 'ola'], [PUERTO, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')

E['ny-cuadricula'] = ('La cuadrícula', '''// NY-CUADRICULA (frases 29–30), 1811, cartela «1811». Cuatro planos:
// 1. la sala de los comisionados (puerto 'planos'): tres comisionados detrás de la mesa miran el plano de la isla con sus
//    colinas y arroyos; en «draws» una mano entra con la pluma y traza las avenidas y luego las calles; corta en «Right»;
// 2. las colinas de Manhattan en 1811 (fondo local): el agrimensor mira por su teodolito, su ayudante clava estacas en
//    línea recta por encima de la loma, la granja y el arroyo; el granjero sale con un «?» en «farms»; corta en «Why»;
// 3. inserto sobre el plano (fondo local): las casitas de madera caen y encajan en las manzanas como ladrillos; una mano
//    trae la casa redonda en «planners», no cabe («X») y la deja fuera; corta en «Right-angled»;
// 4. la calle nueva (fondo local): los obreros allanan la loma con picos; las casas rectas en fila, una se levanta en
//    «cheapest to build» y una familia entra a vivir en «convenient to live in».''', LIB + r'''
const q = (f) => en('cuadricula', f), r = (f) => en('rectas', f);
const P2 = q(0.597), P3 = r(-0.02), P4 = r(0.484);
const DIBUJA = q(0.178), CALLES = q(0.398), COLINAS = q(0.744), GRANJAS = q(0.877), ARROYOS = q(0.927);
const PORQUE = r(0.019), PLANIF = r(0.229), RECTAS = r(0.358), BARATAS = r(0.674), COMODAS = r(0.857);
const PIEL = hex('#f0c8a0'), BL = hex('#f2eee2'), ROJO = hex('#c8303a');

// ── 1 · la sala de los comisionados: la cuadrícula se traza sobre el plano ──
const p1 = (t) => {
  const qq = tramo(t, DIBUJA + 0.2, P2 - 0.25);
  const g = T.puerto(R, t, { encuadre: 'planos', cuadricula: qq, detras: (tt) => {
    R.actor(EL.clinton, 104, 100, tt, { dir: 1, habla: tt < DIBUJA && Math.sin(tt * 8) > 0, sonrisa: tt > CALLES });
    R.actor(EL.delegado2, 150, 100, tt, { dir: 1, tocado: '', dedo: tt > DIBUJA - 0.3 && tt < DIBUJA + 1.2, sorpresa: tt > CALLES && tt < CALLES + 0.8, pal: { C: '#3a3a5a' } });
    R.actor(EL.comerciante, 196, 100, tt, { dir: -1, sonrisa: tt > CALLES + 0.6, habla: tt > P2 - 1.2 && Math.sin(tt * 8) > 0 }); } });
  // la mano que traza, con su brazo desde abajo (la manga negra de la levita)
  if (g.punta && qq > 0 && qq < 1) { const [x, y] = g.punta; T.brazo(R, x + 56, 204, x + 11, y + 3, '#2a2a3a', -1, { codo: [x + 34, Math.min(186, y + 34)] }); }
  else if (qq <= 0 && t > DIBUJA - 0.6) { const u = tramo(t, DIBUJA - 0.6, DIBUJA + 0.2), x = Math.round(lerp(270, 120, u)), y = Math.round(lerp(196, 128, u)); T.brazo(R, x + 56, 214, x + 11, y + 3, '#2a2a3a', -1, { codo: [x + 34, Math.min(192, y + 34)] }); }
};

// ── 2 · las colinas y granjas de 1811: el agrimensor y la línea de estacas ──
let F2 = null;
const LOMA = (x) => 96 - Math.round(Math.sin((x - 40) / 70) * 22 + Math.sin(x / 23) * 3);   // la cresta de la loma del medio
const ESTACAS = [[30, 168], [84, 150], [134, 134], [178, 122], [216, 112], [250, 104], [280, 98]];   // la línea recta de la calle futura, del frente al fondo
const fondo2 = () => capa(() => {
  // las colinas lejanas azuladas y el bosque
  for (let x = 0; x < 320; x++) { const y0 = 62 + Math.round(Math.sin(x / 40) * 6 + Math.sin(x / 13) * 2); for (let y = y0; y < 100; y++) R.pset(x, y, dz(x, y, (y - y0) / 30) ? hex('#6a8aa0') : hex('#8aa4b8')); }
  for (let k = 0; k < 40; k++) { const x = k * 8 + Math.round(hh(k, 1, 2) * 6), y = 70 + Math.round(Math.sin(x / 40) * 6) + 4; R.disco(x, y, 4, hex('#4a6a6a')); R.disco(x - 1, y - 1, 3, hex('#5a7a72')); }
  // la loma del medio, verde, con rocas grises de esquisto, el huerto y la granja
  for (let x = 0; x < 320; x++) { const y0 = LOMA(x); for (let y = y0; y < 140; y++) { const n = hh(x >> 1, y >> 1, 21); R.pset(x, y, n > 0.94 ? hex('#8aa858') : dz(x, y, (y - y0) / 46) ? hex('#4a7a3a') : n < 0.12 ? hex('#4a7a3a') : hex('#5a8a42')); } }
  for (const [rx, ry, rw] of [[60, 104, 14], [118, 90, 10], [300, 98, 12]]) { R.poligono([[rx - rw, ry + 5], [rx - rw + 3, ry - 3], [rx + 2, ry - 6], [rx + rw, ry + 1], [rx + rw - 2, ry + 5]], K); R.poligono([[rx - rw + 1, ry + 4], [rx - rw + 4, ry - 2], [rx + 2, ry - 5], [rx + rw - 1, ry + 1], [rx + rw - 3, ry + 4]], hex('#7a7a86')); for (let i = -rw + 4; i < rw - 3; i += 3) R.linea(rx + i, ry - 2, rx + i + 3, ry + 3, hex('#5a5a66')); R.linea(rx - rw + 4, ry - 2, rx + 1, ry - 5, hex('#a8a8b4')); }
  // el huerto: manzanos en filas
  for (let k = 0; k < 6; k++) { const x = 20 + k * 15, y = LOMA(20 + k * 15) + 14; R.rect(x, y, x + 1, y + 6, hex('#5a3a1a')); R.disco(x, y - 2, 5, hex('#2a5a2a')); R.disco(x - 1, y - 3, 4, hex('#3a7a32')); R.disco(x - 2, y - 4, 2, hex('#5a9a42')); R.pset(x + 2, y - 1, ROJO); R.pset(x - 2, y, ROJO); }
  // la granja: la casa de tablas blancas con su chimenea, el granero rojo y la cerca de troncos
  { const x0 = 190, y0 = 72; R.rect(x0 - 1, y0 - 1, x0 + 37, y0 + 25, K); for (let y = y0; y < y0 + 25; y++) R.linea(x0, y, x0 + 36, y, y % 3 === 0 ? hex('#c8c0b0') : hex('#ece6d6'));
    R.poligono([[x0 - 4, y0], [x0 + 18, y0 - 14], [x0 + 40, y0]], K); R.poligono([[x0 - 2, y0 - 1], [x0 + 18, y0 - 13], [x0 + 38, y0 - 1]], hex('#5a4a4a')); for (let i = 0; i < 6; i++) R.linea(x0 + 2 + i * 6, y0 - 2, x0 + 18, y0 - 12, hex('#4a3a3a'));
    R.rect(x0 + 28, y0 - 18, x0 + 33, y0 - 8, K); R.rect(x0 + 29, y0 - 17, x0 + 32, y0 - 8, hex('#8a3a28'));
    for (const fx of [x0 + 4, x0 + 26]) { R.rect(fx - 1, y0 + 5, fx + 7, y0 + 14, K); R.rect(fx, y0 + 6, fx + 6, y0 + 13, hex('#3a4a5a')); R.linea(fx + 3, y0 + 6, fx + 3, y0 + 13, hex('#ece6d6')); R.rect(fx - 3, y0 + 6, fx - 2, y0 + 13, hex('#2a5a3a')); }
    R.rect(x0 + 15, y0 + 10, x0 + 22, y0 + 24, K); R.rect(x0 + 16, y0 + 11, x0 + 21, y0 + 24, hex('#5a3a2a'));
    const bx = 236; R.rect(bx - 1, 77, bx + 31, 98, K); for (let x = bx; x < bx + 31; x++) R.linea(x, 78, x, 97, x % 4 === 0 ? hex('#7a2a1c') : hex('#a83a28')); R.poligono([[bx - 4, 78], [bx + 15, 64], [bx + 34, 78]], K); R.poligono([[bx - 2, 77], [bx + 15, 66], [bx + 32, 77]], hex('#6a5a4a'));
    R.rect(bx + 9, 84, bx + 21, 97, K); R.rect(bx + 10, 85, bx + 20, 97, hex('#5a1a14')); R.linea(bx + 10, 85, bx + 20, 97, hex('#e8dcc0')); R.linea(bx + 20, 85, bx + 10, 97, hex('#e8dcc0'));
    for (let x = 150; x < 320; x += 9) { R.rect(x, 104 - Math.round((x - 150) * 0.05), x + 1, 112 - Math.round((x - 150) * 0.05), hex('#6a4a2a')); } R.linea(150, 106, 319, 98, hex('#8a6a3a')); R.linea(150, 109, 319, 101, hex('#8a6a3a')); }
  // el prado de delante, con matas, flores y surcos de un campo arado
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < LOMA(x) + 30) continue; const n = hh(x, y, 31); R.pset(x, y, n > 0.95 ? hex('#a8c870') : n < 0.04 ? hex('#e8e0a0') : dz(x, y, (y - 120) / 70) ? hex('#4a7a32') : hex('#5a8a3a')); }
  for (let k = 0; k < 9; k++) { const x0 = 210 + k * 12; R.linea(x0, 180, x0 + 40, 128, hex('#6a5a32')); R.linea(x0 + 1, 180, x0 + 41, 128, hex('#8a7442')); }
  for (let k = 0; k < 30; k++) { const x = Math.round(hh(k, 7, 1) * 320), y = 128 + Math.round(hh(k, 8, 1) * 50); R.pset(x, y, hex('#2a5a22')); R.pset(x - 1, y + 1, hex('#2a5a22')); R.pset(x + 1, y + 1, hex('#3a6a2a')); R.pset(x, y - 1, k % 3 ? hex('#e8e0a0') : hex('#e87a8a')); }
});
const p2 = (t) => {
  F2 = F2 || fondo2();
  degr(0, 0, 319, 70, [hex('#7ab4e0'), hex('#9ccaee'), hex('#c4e2f4')]); nubes(t, 8, 40, [hex('#c4d0e0'), hex('#eef4fa'), hex('#ffffff')], 5); pajaros(t, 3, 24);
  pegar(F2);
  // el humo de la chimenea de la granja
  for (let k = 0; k < 4; k++) { const u = (t * 0.45 + k / 4) % 1; R.disco(Math.round(220 + u * 10 + Math.sin(u * 6 + k) * 2), Math.round(52 - u * 16), 1 + Math.round(u * 2), mez(hex('#e8e8ec'), hex('#b0b0bc'), u)); }
  // el arroyo que cruza el prado, con brillos que corren, y el puentecillo de tablas
  for (let x = 0; x < 320; x++) { const yc = 150 + Math.round(Math.sin(x / 34) * 6 + x * 0.04); for (let y = yc - 2; y <= yc + 2; y++) R.pset(x, y, y === yc - 2 ? hex('#3a6a4a') : (x + Math.floor(t * 12) + y * 3) % 11 === 0 ? hex('#e8f4f8') : y > yc ? hex('#4a7aa0') : hex('#6a9ac0')); }
  { const bx = 60; R.rect(bx, 150, bx + 14, 152, K); for (let i = 0; i < 14; i += 3) R.rect(bx + i, 150, bx + i + 1, 151, hex('#8a6a3a')); }
  // las estacas ya clavadas, con la cuerda tensa (la calle futura cruza la loma, la cerca y el arroyo)
  const clav = Math.floor(tramo(t, COLINAS - 0.6, ARROYOS) * 4) + 3;
  for (let i = 0; i < ESTACAS.length; i++) { if (i >= clav && i !== ESTACAS.length - 1) continue; const [x, y] = ESTACAS[i], s = 1 - i * 0.1, hs = Math.round(10 * s); R.rect(x - 1, y - hs, x + 1, y, K); R.rect(x, y - hs + 1, x, y - 1, BL); R.rect(x - 1, y - hs, x + 1, y - hs + 2, ROJO); }
  const ult = Math.min(clav, ESTACAS.length) - 1; for (let i = 0; i < ult; i++) { const [x0, y0] = ESTACAS[i], [x1, y1] = ESTACAS[i + 1]; if (i + 1 >= clav) break; R.linea(x0, y0 - Math.round(8 * (1 - i * 0.1)), x1, y1 - Math.round(8 * (1 - (i + 1) * 0.1)), hex('#e8d8a0')); }
  // la vaca que pasta y mueve la cola
  { const vx = 112, vy = 120; R.rect(vx - 1, vy - 7, vx + 15, vy, K); R.rect(vx, vy - 6, vx + 14, vy - 1, BL); R.rect(vx + 3, vy - 6, vx + 7, vy - 3, K); R.rect(vx + 10, vy - 4, vx + 13, vy - 2, K); const c = Math.round(Math.sin(t * 2.5) * 1.5) + 2; R.rect(vx - 4, vy - 6 + c, vx, vy - 2 + c, K); R.rect(vx - 3, vy - 5 + c, vx - 1, vy - 3 + c, BL); R.pset(vx - 3, vy - 3 + c, hex('#e8a0a0')); for (const lx of [1, 4, 10, 13]) R.linea(vx + lx, vy, vx + lx, vy + 3, K); R.linea(vx + 15, vy - 6, vx + 17, vy - 2 + Math.round(Math.sin(t * 4) * 2), K); }
  // el agrimensor con su teodolito en el trípode, que mira y hace señas
  { const x = 24, s = 176; R.linea(x + 22, s, x + 26, s - 14, K); R.linea(x + 30, s, x + 26, s - 14, K); R.linea(x + 26, s, x + 26, s - 14, K); R.rect(x + 22, s - 18, x + 31, s - 14, K); R.rect(x + 23, s - 17, x + 30, s - 15, hex('#c8a040')); R.rect(x + 30, s - 18, x + 33, s - 16, K); R.pset(x + 33, s - 17, hex('#a8c8d8'));
    R.actor(EL.colono, x, s, t, { dir: 1, tocado: '', dedo: t > COLINAS - 0.2 && t < COLINAS + 1.2, habla: t > COLINAS && t < COLINAS + 1 && Math.sin(t * 9) > 0 }); }
  // el ayudante sube con una estaca y la clava a mazazos en lo alto de la loma
  { const u = tramo(t, P2 + 0.2, COLINAS + 0.2), [ex, ey] = ESTACAS[4], x = Math.round(lerp(ESTACAS[2][0] - 20, ex - 16, u)), y = Math.round(lerp(ESTACAS[2][1], ey, u)), golpe = u >= 1 && Math.floor(t * 4) % 2 === 0 && t < GRANJAS;
    const a = R.actor(EL.estibador, x, y, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [x + 18, y - (golpe ? 18 : 12)] }); R.rect(a.mano[0] - 1, a.mano[1] - 4, a.mano[0] + 4, a.mano[1] - 1, K); R.rect(a.mano[0], a.mano[1] - 3, a.mano[0] + 3, a.mano[1] - 2, hex('#8a5a34')); R.linea(a.mano[0], a.mano[1], a.mano[0] - 2, a.mano[1] + 6, hex('#5a3a1a')); }
  // el granjero sale de la casa y no entiende nada en «farms»
  { const u = tramo(t, GRANJAS - 0.8, GRANJAS), x = Math.round(lerp(204, 180, u)); if (u > 0) R.actor(EL.colono, x, 98, t, { dir: -1, anda: u > 0 && u < 1, sorpresa: u >= 1, pal: { C: '#7a5a3a', c: '#5a4028', H: '#c8904c' }, tocado: '' }); if (u >= 1) R.bocadillo(x + 7, 64, { icono: '?' }); }
  // una rana salta en el arroyo en «streams»
  { const u = tramo(t, ARROYOS, ARROYOS + 0.6); if (u > 0 && u < 1) { const fx = Math.round(lerp(170, 196, u)), fy = 152 - Math.round(Math.sin(u * Math.PI) * 10); R.rect(fx - 2, fy - 2, fx + 2, fy, K); R.rect(fx - 1, fy - 1, fx + 1, fy - 1, hex('#5a9a3a')); } if (u >= 1) for (let k = 0; k < 6; k++) { const an = k * 1.05, d = 2 + tramo(t, ARROYOS + 0.6, ARROYOS + 1.2) * 6; R.pset(Math.round(196 + Math.cos(an) * d), Math.round(152 + Math.sin(an) * d * 0.4), hex('#c8e4f0')); } }
};

// ── 3 · inserto: las casitas encajan en las manzanas; la redonda no cabe ──
let F3 = null;
const MZ = []; for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) MZ.push([44 + i * 40, 46 + j * 30]);   // las manzanas (esquina de arriba a la izquierda), de 34 × 24
const HUECO = 5 + 6 * 2;   // la manzana que queda para la casa redonda
const fondo3 = () => capa(() => {
  // la mesa de nogal y el papel del plano con las colinas en hachures y el arroyo a tinta debajo de la cuadrícula
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (Math.floor(x / 3 + Math.sin(y / 9) * 3) % 7 === 0) ? hex('#4a2a14') : dz(x, y, hh(x >> 3, y, 41) * 0.6) ? hex('#6a3a1c') : hex('#7a4a24'));
  R.poligono([[22, 24], [300, 26], [304, 168], [18, 170]], hex('#3a2010')); R.poligono([[24, 22], [300, 22], [302, 164], [20, 166]], K);
  for (let y = 23; y < 165; y++) for (let x = 21; x < 302; x++) { const n = hh(x >> 1, y >> 1, 51); R.pset(x, y, n > 0.96 ? hex('#d8c8a0') : dz(x, y, 0.2 + 0.2 * Math.sin(x / 50 + y / 70)) ? hex('#ece0c0') : hex('#f2e8cc')); }
  for (const [cx, cy, rr] of [[90, 80, 26], [210, 120, 30], [250, 60, 18]]) for (let a = 0; a < 6.28; a += 0.18) { const x0 = cx + Math.cos(a) * rr, y0 = cy + Math.sin(a) * rr * 0.6; R.linea(Math.round(x0), Math.round(y0), Math.round(x0 + Math.cos(a) * 6), Math.round(y0 + Math.sin(a) * 4), hex('#a89070')); }
  for (let x = 24; x < 300; x++) { const y = 100 + Math.round(Math.sin(x / 26) * 18); R.pset(x, y, hex('#4a7ab0')); R.pset(x, y + 1, hex('#7aa0c8')); }
  // las calles de tinta roja, rectas por encima de todo
  for (let i = 0; i <= 6; i++) { const x = 41 + i * 40; R.linea(x, 40, x, 168 - 6, ROJO); R.linea(x + 2, 40, x + 2, 162, ROJO); }
  for (let j = 0; j <= 4; j++) { const y = 43 + j * 30; R.linea(36, y, 286, y, ROJO); R.linea(36, y + 2, 286, y + 2, ROJO); }
  // en el borde de la mesa: el tintero con la pluma, el compás, la regla y la vela
  R.rect(4, 120, 18, 134, K); R.rect(5, 121, 17, 133, hex('#2a2a3a')); R.rect(7, 119, 15, 121, K); R.linea(11, 119, 18, 100, BL); R.linea(12, 119, 19, 101, hex('#c8c0b0'));
  R.linea(304, 120, 316, 172, hex('#c8c8d0')); R.linea(308, 120, 300, 172, hex('#a8a8b0')); R.disco(306, 118, 2, hex('#8a8a96'));
  R.rect(40, 172, 200, 177, K); R.rect(41, 173, 199, 176, hex('#e8d8a8')); for (let x = 44; x < 200; x += 6) R.linea(x, 173, x, 174 + (x % 12 === 2 ? 2 : 0), hex('#5a4a2a'));
});
const casita = (x, y, c, cs) => { // una casa de madera de juguete (frente y tejado), de 15 × 16
  R.rect(x - 1, y + 4, x + 15, y + 16, K); R.rect(x, y + 5, x + 14, y + 15, c); R.rect(x, y + 13, x + 14, y + 15, cs); R.poligono([[x - 2, y + 5], [x + 7, y - 2], [x + 16, y + 5]], K); R.poligono([[x, y + 4], [x + 7, y - 1], [x + 14, y + 4]], hex('#8a3a28')); R.linea(x + 1, y + 4, x + 7, y, hex('#b85a3a'));
  R.rect(x + 2, y + 7, x + 5, y + 10, K); R.rect(x + 3, y + 8, x + 4, y + 9, hex('#8ac0e0')); R.rect(x + 9, y + 8, x + 12, y + 15, K); R.rect(x + 10, y + 9, x + 11, y + 15, hex('#5a3a1a')); };
const redonda = (x, y) => { // la casa redonda de juguete: torre cilíndrica con tejado cónico (x = centro)
  for (let i = -11; i <= 11; i++) { const yb = y + 16 + Math.round(Math.sqrt(Math.max(0, 1 - (i / 11) ** 2)) * 3); R.pset(x + i + 2, yb + 2, hex('#c8b890')); }
  for (let i = -10; i <= 10; i++) { const u = (i + 10) / 20, yb = y + 15 + Math.round(Math.sqrt(Math.max(0, 1 - (i / 10) ** 2)) * 3); for (let j = 2; j <= yb - y; j++) R.pset(x + i, y + j, Math.abs(i) === 10 || j === yb - y ? K : u < 0.25 ? hex('#7ab0d8') : u < 0.7 ? hex('#4a80b8') : hex('#2a5a8a')); R.pset(x + i, yb + 1, K); }
  R.poligono([[x - 12, y + 3], [x, y - 12], [x + 12, y + 3]], K); R.poligono([[x - 10, y + 2], [x, y - 10], [x + 10, y + 2]], hex('#e8b830')); R.linea(x - 1, y - 9, x - 8, y + 1, hex('#f8e080'));
  R.rect(x - 2, y + 9, x + 2, y + 16, K); R.rect(x - 1, y + 10, x + 1, y + 16, hex('#5a3a1a')); R.rect(x + 4, y + 6, x + 6, y + 8, K); R.pset(x + 5, y + 7, hex('#8ac0e0')); };
const p3 = (t) => {
  F3 = F3 || fondo3(); R.copiar(F3);
  // la vela que parpadea y su luz
  { const f = Math.sin(t * 13) > 0 ? 1 : 0; R.rect(4, 40, 12, 70, K); R.rect(5, 41, 11, 70, hex('#f2e8cc')); R.disco(8, 36 - f, 3, hex('#f8a040')); R.disco(8, 35 - f, 2, hex('#fff0a0')); R.rect(3, 70, 13, 74, K); R.rect(4, 70, 12, 73, hex('#c8a040')); }
  // las casitas caen en sus manzanas de sur a norte, dos por manzana
  const COL = [[hex('#d8c8a0'), hex('#a89870')], [hex('#c86a4a'), hex('#8a3a28')], [hex('#e8e0cc'), hex('#b0a890')], [hex('#a8b870'), hex('#78884a')]];
  MZ.forEach(([mx, my], k) => { if (k === HUECO) return; for (let s = 0; s < 2; s++) { const n = k * 2 + s, t0 = P3 + 0.15 + n * 0.08, u = tramo(t, t0, t0 + 0.3); if (u <= 0) continue; const x = mx + 2 + s * 17, y = my + 4 - Math.round((1 - u) * (1 - u) * 26);
      if (u < 1) R.disco(x + 7, my + 20, Math.round(3 + u * 4), hex('#c8b890')); casita(x, y, COL[(k + s) % 4][0], COL[(k + s) % 4][1]); } });
  // la mano trae la casa redonda, intenta meterla en el último hueco (no cabe: la «X»), y la deja fuera del plano
  const [hx, hy] = MZ[HUECO], cx = hx + 17, entra = tramo(t, PLANIF - 0.8, PLANIF), prueba = t > PLANIF && t < RECTAS, sale = tramo(t, RECTAS, P4 - 0.5);
  let x = cx, y = hy + 2; if (entra < 1) { x = Math.round(lerp(330, cx, entra)); y = Math.round(lerp(150, hy - 10, entra)); } else if (prueba) { const w = Math.sin((t - PLANIF) * 14) * 3; x = cx + Math.round(w); y = hy - 2 + Math.round(Math.abs(w)); } else if (sale > 0) { x = Math.round(lerp(cx, 300, sale)); y = Math.round(lerp(hy - 10, 150, sale)); }
  if (t > PORQUE - 0.4 || entra > 0) { redonda(x, y); if (!(sale >= 1)) T.brazo(R, x + 60, 214, x + 14, y + 8, '#2a2a3a', -1, { codo: [x + 40, Math.min(196, y + 40)] }); }
  if (prueba && Math.floor(t * 5) % 2 === 0) R.icono('X', cx - 6, hy - 22, ROJO, K, 2);
  if (t > PORQUE && t < PLANIF - 0.6) R.icono('?', 150, 26, ROJO, K, 2);
};

// ── 4 · la calle nueva: se allana la loma y se levantan casas rectas ──
let F4 = null;
const fondo4 = () => capa(() => {
  // a lo lejos: campos a cuadros, árboles y la loma que aún queda
  for (let x = 0; x < 320; x++) { const y0 = 70 + Math.round(Math.sin(x / 50) * 5); for (let y = y0; y < 104; y++) R.pset(x, y, dz(x, y, (y - y0) / 40) ? hex('#6a9a4a') : hex('#8ab05a')); }
  for (let k = 0; k < 8; k++) { const x0 = 150 + k * 22; R.linea(x0, 104, x0 + 18, 76, hex('#7a9a42')); }
  for (let k = 0; k < 9; k++) { const x = 150 + k * 19, y = 82 + (k % 3); R.rect(x, y, x + 1, y + 6, hex('#5a3a1a')); R.disco(x, y - 2, 4, hex('#2a5a2a')); R.disco(x - 1, y - 3, 3, hex('#3a7a32')); }
  // la loma de roca a la izquierda, cortada: el esquisto en capas, con los escombros
  R.poligono([[0, 40], [30, 34], [70, 44], [110, 70], [120, 140], [0, 140]], K);
  for (let y = 35; y < 140; y++) for (let x = 0; x < 121; x++) { const borde = 30 + (y - 36) * 0.9 + 0; if (x > 120 - Math.max(0, (106 - y) * 0.2) - (y < 70 ? (70 - y) * 1.1 : 0)) continue; const capaR = Math.floor((y + Math.sin(x / 9) * 3) / 4) % 3; if (R.pget(x, y) !== K && y > 36) continue;
    R.pset(x, y, y < 46 && x < 60 ? (dz(x, y, 0.5) ? hex('#4a7a3a') : hex('#5a8a42')) : capaR === 0 ? hex('#6a6a76') : capaR === 1 ? hex('#8a8a96') : hex('#7a7a86')); }
  for (let k = 0; k < 14; k++) { const x = 4 + k * 8, y = 50 + Math.round(hh(k, 2, 4) * 70); R.linea(x, y, x + 5, y + 2, hex('#a8a8b4')); R.pset(x + 2, y + 3, hex('#4a4a56')); }
  R.poligono([[0, 28], [30, 22], [70, 32], [100, 52], [96, 58], [66, 40], [30, 32], [0, 38]], hex('#4a7a3a')); R.poligono([[0, 28], [30, 22], [70, 32], [100, 52], [98, 54], [68, 36], [30, 27], [0, 33]], hex('#6a9a4a'));
  for (let k = 0; k < 16; k++) { const x = 4 + k * 6, y = 24 + Math.round(Math.abs(x - 30) * 0.2) + (x > 70 ? Math.round((x - 70) * 0.6) : 0); R.pset(x, y - 1, hex('#8ab05a')); R.pset(x + 1, y - 2, hex('#8ab05a')); }
  { const x = 34, y = 24; R.rect(x, y - 10, x + 2, y, hex('#5a3a1a')); R.disco(x + 1, y - 14, 8, hex('#2a5a2a')); R.disco(x, y - 15, 6, hex('#3a7a32')); R.disco(x - 2, y - 17, 3, hex('#5a9a42')); }
  for (let k = 0; k < 6; k++) { const x = 6 + k * 18, y = 62 + (k % 3) * 22; R.linea(x, y, x + 9, y + 14, hex('#4a4a56')); R.linea(x + 9, y + 14, x + 6, y + 24, hex('#4a4a56')); }
  // las casas rectas en fila, de ladrillo, una tras otra a lo largo de la calle
  for (let k = 0; k < 4; k++) { const x0 = 128 + k * 46, top = 52, c0 = [hex('#a84a34'), hex('#9a5a3a'), hex('#b05038'), hex('#8a3a28')][k];
    if (k === 2) continue;
    for (let y = top; y < 136; y++) for (let x = x0; x < x0 + 44; x++) R.pset(x, y, (y % 4 === 0 || (x + (Math.floor(y / 4) % 2) * 3) % 7 === 0) ? mez(c0, K, 0.3) : c0);
    R.rect(x0 - 1, top - 3, x0 + 44, top, K); R.rect(x0, top - 2, x0 + 43, top - 1, hex('#e8e0cc')); R.poligono([[x0, top - 3], [x0 + 43, top - 3], [x0 + 38, top - 13], [x0 + 5, top - 13]], hex('#4a4a5a')); R.rect(x0 + 32, top - 20, x0 + 38, top - 12, K); R.rect(x0 + 33, top - 19, x0 + 37, top - 12, mez(c0, K, 0.2));
    for (const fy of [top + 6, top + 36]) for (let i = 0; i < 2; i++) { const fx = x0 + 6 + i * 22; R.rect(fx - 1, fy - 1, fx + 11, fy + 19, K); R.rect(fx, fy, fx + 10, fy + 18, hex('#e8e0cc')); R.rect(fx + 1, fy + 1, fx + 9, fy + 8, hex('#3a4a5a')); R.rect(fx + 1, fy + 10, fx + 9, fy + 17, hex('#3a4a5a')); R.pset(fx + 2, fy + 2, hex('#a8c0d0')); }
    R.rect(x0 + 16, 112, x0 + 28, 136, K); R.rect(x0 + 17, 113, x0 + 27, 136, [hex('#2a3a5a'), hex('#2a4a3a'), 0, hex('#5a2a2a')][k]); R.pset(x0 + 25, 124, hex('#e8b830')); R.rect(x0 + 14, 136, x0 + 30, 139, hex('#8a8270')); }
  // la calle recta de tierra apisonada, con la cuerda de las estacas y las rodadas
  for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { const n = hh(x >> 1, y, 61); R.pset(x, y, n > 0.93 ? hex('#a89070') : n < 0.06 ? hex('#6a5a3a') : dz(x, y, (y - 136) / 60) ? hex('#8a7450') : hex('#9a845c')); }
  for (let x = 0; x < 320; x++) { R.pset(x, 158 + (x % 37 === 0 ? 1 : 0), hex('#6a5a3a')); R.pset(x, 168, hex('#6a5a3a')); }
  for (let k = 0; k < 8; k++) { const x = 120 + k * 28; R.rect(x - 1, 140, x + 1, 148, K); R.rect(x, 141, x, 147, BL); R.rect(x - 1, 140, x + 1, 141, ROJO); } R.linea(120, 142, 319, 142, hex('#e8d8a0'));
  for (const [cx, cy, w] of [[150, 160, 18], [238, 172, 22], [60, 170, 14]]) { R.poligono([[cx - w, cy], [cx - w + 4, cy - 3], [cx + w - 3, cy - 3], [cx + w, cy], [cx + w - 4, cy + 3], [cx - w + 3, cy + 3]], hex('#5a7088')); R.linea(cx - w + 5, cy - 1, cx + w - 8, cy - 1, hex('#a8c8d8')); }
  { const bx = 274; for (let j = 0; j < 4; j++) for (let i = 0; i < 6 - j; i++) { const x = bx + i * 6 + j * 3, y = 150 - j * 4; R.rect(x, y, x + 5, y + 3, K); R.rect(x, y, x + 4, y + 2, hex('#b05038')); R.pset(x, y, hex('#d07050')); } }
  { const lx = 166; for (let j = 0; j < 3; j++) { R.rect(lx + j * 2, 146 - j * 3, lx + 40 - j * 2, 148 - j * 3, K); R.rect(lx + 1 + j * 2, 146 - j * 3, lx + 39 - j * 2, 147 - j * 3, hex('#c8a060')); R.pset(lx + 1 + j * 2, 147 - j * 3, hex('#8a6a3a')); } }
  // escombros y una carretilla al pie del corte
  for (let k = 0; k < 18; k++) { const x = 70 + Math.round(hh(k, 1, 9) * 50), y = 134 + Math.round(hh(k, 2, 9) * 10); R.rect(x, y, x + 2, y + 1, hex('#7a7a86')); R.pset(x, y, hex('#a8a8b4')); }
});
const p4 = (t) => {
  F4 = F4 || fondo4();
  degr(0, 0, 319, 78, [hex('#7ab4e0'), hex('#9ccaee'), hex('#c4e2f4')]); nubes(t, 6, 34, [hex('#c4d0e0'), hex('#eef4fa'), hex('#ffffff')], 5); pajaros(t, 2, 20);
  pegar(F4);
  // la casa que se levanta: el armazón de vigas que se llena de ladrillo en «cheapest to build»
  { const x0 = 220, top = 52, u = tramo(t, BARATAS - 0.5, BARATAS + 0.5), yl = Math.round(lerp(136, top, u));
    for (let y = yl; y < 136; y++) for (let x = x0; x < x0 + 44; x++) R.pset(x, y, (y % 4 === 0 || (x + (Math.floor(y / 4) % 2) * 3) % 7 === 0) ? mez(hex('#b05038'), K, 0.3) : hex('#b05038'));
    for (const vx of [x0, x0 + 14, x0 + 29, x0 + 43]) { R.rect(vx - 1, top - 2, vx + 1, 136, K); R.rect(vx, top - 1, vx, 135, hex('#c8a060')); } for (const vy of [top, top + 30, top + 60]) { R.rect(x0 - 1, vy - 1, x0 + 44, vy + 1, K); R.rect(x0, vy, x0 + 43, vy, hex('#c8a060')); }
    if (u >= 1) { R.poligono([[x0, top - 3], [x0 + 43, top - 3], [x0 + 38, top - 13], [x0 + 5, top - 13]], hex('#4a4a5a')); for (const fy of [top + 6, top + 36]) for (let i = 0; i < 2; i++) { const fx = x0 + 6 + i * 22; R.rect(fx - 1, fy - 1, fx + 11, fy + 19, K); R.rect(fx, fy, fx + 10, fy + 18, hex('#e8e0cc')); R.rect(fx + 1, fy + 1, fx + 9, fy + 17, hex('#3a4a5a')); } R.rect(x0 + 16, 112, x0 + 28, 136, K); R.rect(x0 + 17, 113, x0 + 27, 136, hex('#3a3a5a')); }
    if (u > 0.9 && u < 1 || (t > BARATAS + 0.5 && t < BARATAS + 1.1)) for (let k = 0; k < 10; k++) { const v = tramo(t, BARATAS + 0.4, BARATAS + 1.1), an = Math.PI + k * Math.PI / 9; R.disco(Math.round(x0 + 22 + Math.cos(an) * (20 + v * 14)), Math.round(136 + Math.sin(an) * (4 + v * 6)), 2, hex('#c8b890')); } }
  // el carpintero en la escalera martillea el armazón
  { const golpe = Math.floor(t * 5) % 2 === 0 && t < BARATAS; R.linea(206, 136, 214, 70, hex('#8a6a3a')); R.linea(212, 136, 220, 70, hex('#8a6a3a')); for (let k = 0; k < 8; k++) R.linea(207 + k, 130 - k * 8, 213 + k, 130 - k * 8, hex('#8a6a3a'));
    const c = R.actor(EL.estibador2, 204, 104, t, { dir: 1, sostiene: [222, golpe ? 90 : 84], sonrisa: t > BARATAS + 0.5 }); R.rect(c.mano[0] - 1, c.mano[1] - 5, c.mano[0] + 3, c.mano[1] - 3, K); R.linea(c.mano[0], c.mano[1], c.mano[0], c.mano[1] - 3, hex('#5a3a1a')); }
  // los obreros pican la loma y uno se lleva la carretilla de piedras
  { const p = Math.floor(t * 3) % 2 === 0; const o1 = R.actor(EL.estibador, 80, 140, t, { dir: -1, sostiene: [72, p ? 112 : 122] }); R.linea(o1.mano[0], o1.mano[1], o1.mano[0] + 4, o1.mano[1] + 6, hex('#5a3a1a')); R.linea(o1.mano[0] - 4, o1.mano[1] + (p ? -1 : 4), o1.mano[0] + 3, o1.mano[1] - (p ? 4 : 0), hex('#7a7a86'));
    if (!p) for (let k = 0; k < 3; k++) R.pset(66 + k * 3, 120 - k, hex('#a8a8b4'));
    const u = tramo(t, P4 + 0.3, P4 + 4.6), x = Math.round(lerp(96, 170, u)); R.actor(EL.vigas, x, 172, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [x + 20, 160], pal: { C: '#d8ccaa', c: '#5a3a24' } });
    R.rect(x + 18, 158, x + 36, 164, K); R.rect(x + 19, 159, x + 35, 163, hex('#8a6a3a')); for (let k = 0; k < 4; k++) R.disco(x + 22 + k * 4, 157, 2, hex('#7a7a86')); R.disco(x + 33, 167, 3, K); R.disco(x + 33, 167, 2, hex('#5a3a1a')); }
  // una familia llega y entra a vivir en la casa de la izquierda en «convenient to live in»; la madre pone una maceta en la ventana
  { const u = tramo(t, COMODAS - 1.8, COMODAS), x = Math.round(lerp(330, 144, u)), dentro = t > COMODAS + 0.4;
    if (!dentro) { R.actor(EL.colona, x + 16, 152, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: true }); R.actor(EL.colono, x, 152, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: true, sostiene: true, tocado: '' }); }
    const ab = tramo(t, COMODAS - 0.1, COMODAS + 0.3); if (ab > 0 && !dentro) { R.rect(145, 113, 155, 136, K); }
    if (t > COMODAS + 0.6) { const f = 134 + 6; R.rect(f - 1, 86, f + 9, 89, K); R.rect(f, 87, f + 8, 88, hex('#a84a34')); R.disco(f + 2, 84, 2, hex('#e85a6a')); R.disco(f + 6, 84, 2, hex('#e8c840')); R.pset(f + 4, 83, hex('#5a9a3a')); } }
  // una gallina picotea en la calle
  { const gx = 270 + Math.round(Math.sin(t * 0.7) * 10), pic = Math.sin(t * 5) > 0.5 ? 2 : 0; R.rect(gx - 3, 168, gx + 3, 173, K); R.rect(gx - 2, 169, gx + 2, 172, BL); R.rect(gx + 2, 165 + pic, gx + 5, 168 + pic, K); R.pset(gx + 3, 166 + pic, BL); R.pset(gx + 6, 167 + pic, hex('#e8a040')); R.pset(gx + 3, 164 + pic, ROJO); }
};
const efectos = [[DIBUJA + 0.2, 'lapiz'], [CALLES, 'lapiz'], [COLINAS + 0.3, 'golpecito'], [GRANJAS, 'boing'], [P3 + 0.4, 'pop'], [PLANIF + 0.2, 'golpecito'], [RECTAS - 0.2, 'aviso'], [BARATAS, 'golpecito'], [BARATAS + 0.5, 'pop'], [COMODAS + 0.3, 'puerta']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1811', efectos, año: 1811 });
''')
