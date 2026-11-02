E = {}

# Piezas pequeñas que comparten las tres escenas (se repiten en cada cuerpo porque cada escena es su propia página).
PIEZAS = r'''
const C = T.C;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], by = (x, y) => BY[(y & 3) * 4 + (x & 3)] / 16;
const rampa = (lista) => lista.map(hex);
// degradado tramado por filas (cielos, fondos): v 0–1 de y0 a y1, con la rampa de colores
const degradado = (x0, y0, x1, y1, ram, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
  const v = (y - y0) / Math.max(1, y1 - y0) * (ram.length - 1) + by(x, y) - 0.5 + (hh(x >> 3, y >> 2, k) - 0.5) * 0.5;
  R.pset(x, y, ram[Math.max(0, Math.min(ram.length - 1, Math.round(v)))]); } };
// una nube de humo de tres tonos (bolas que se solapan), en (x, y), tamaño s
const humo = (x, y, s, c0, c1, c2) => { for (const [dx, dy, k] of [[0, 0, 1], [-1.1, 0.2, 0.75], [1.1, 0.25, 0.8], [-0.5, -0.6, 0.7], [0.6, -0.55, 0.65]]) R.disco(x + dx * s, y + dy * s, s * k + 1, c2);
  for (const [dx, dy, k] of [[0, 0, 1], [-1.1, 0.2, 0.75], [1.1, 0.25, 0.8], [-0.5, -0.6, 0.7], [0.6, -0.55, 0.65]]) R.disco(x + dx * s, y + dy * s - 1, s * k, c1);
  for (const [dx, dy, k] of [[-0.3, -0.5, 0.55], [0.5, -0.45, 0.45], [-1.1, 0, 0.4]]) R.disco(x + dx * s - 1, y + dy * s - 2, s * k, c0); };
// lágrimas que caen de los ojos de un chibi (cabeza = la .cabeza que devuelve R.actor)
const lagrimas = (cab, t, dir = 1) => { for (const ex of [-2, 2]) { const f = ((t * 1.6 + (ex > 0 ? 0.5 : 0)) % 1); const x = cab[0] + ex + (dir > 0 ? 1 : 0), y = Math.round(cab[1] + 7 + f * 7);
  R.pset(x, y, hex('#8ad8ff')); R.pset(x, y + 1, hex('#4aa8e8')); } };
'''

E['do-gancho'] = ('Gancho', '''// DO-GANCHO (frases 1–2), 2019. Cinco planos:
// 1. «In 2019, in the final battle of Avengers: Endgame»: una sala de cine de lado, de noche; en la pantalla, la batalla
//    (cielo de humo, los héroes contra el ejército); en «Battle» estalla un fogonazo en la pantalla y la fila de fans
//    salta: el niño de la araña se levanta con los brazos arriba, la de la capa se asusta; en «Endgame» señala; corta en
//    la pausa antes de «Tony»;
// 2. inserto, el campo de batalla de cerca (fondo local): el guante dorado de pie sobre un bloque de hormigón; en «puts
//    all six Infinity Stones» las seis gemas llegan volando una a una con su estela y encajan con un destello; en
//    «gauntlet» el guante se carga, tiembla, chisporrotea y suelta un haz al cielo; corta en «Snaps»;
// 3. la batalla entera: Iron Man levanta el guante y del puño sale el destello blanco que llena el plano; el ejército
//    del fondo y Thanos («Thanos») se deshacen en polvo de colores que sube con el aire; en «doesn't survive» Iron Man
//    se deja caer detrás de un bloque de escombros, y el Capitán y Thor llegan andando, cabizbajos; corta en «Millions»;
// 4. el cine de frente: en la pantalla, un lago al atardecer con una corona de flores que flota; el público llora; el
//    cubo de palomitas llora en su butaca y en «goodbye» se suena con la servilleta (gag 1, «moc» de claxon); la de la
//    capa se seca los ojos con un pañuelo; corta en «the hero»;
// 5. la noche, el pedestal de homenaje con la armadura: las velas se encienden una a una; un fan llega con una flor y la
//    deja al pie; una niña levanta la luz del móvil; en la placa sale 2008 («started it all») y cuenta hasta 2019 en
//    «11 years earlier».''', PIEZAS + r'''
const a = (f) => en('chasquido', f), b = (f) => en('lloraron', f);
const P2 = a(0.309), P3 = a(0.632), P4 = b(-0.014), P5 = b(0.571);
const BATALLA = a(0.147), ENDGAME = a(0.277), GEMA0 = a(0.408), GEMA5 = a(0.531), GUANTE = a(0.563), SNAP = P3 + 0.3, THANOS = a(0.750), SOBREVIVE = a(0.892);
const ADIOS = b(0.307), IRON = b(0.405), EMPEZO = b(0.683), ONCE = b(0.806);
const GEMAS = rampa(['#9a4ae8', '#3a8ae8', '#e83a3a', '#e8903a', '#3ac85a', '#f0e040']);

// ── 1 · la batalla en la pantalla del cine ──
const peliBatalla = (R, t, S) => {
  const [x0, y0, x1, y1] = S, w = x1 - x0, h = y1 - y0, hz = y0 + Math.round(h * 0.62);
  R.recorte(S);
  degradado(x0, y0, x1, hz, rampa(['#3a2232', '#6a2e30', '#a8442e', '#e07a3a', '#f4b060']), 7);
  for (let k = 0; k < 5; k++) { const x = x0 + ((k * 53 + t * (6 + k * 2)) % (w + 40)) - 20; humo(x, y0 + 14 + (k % 3) * 9, 6 + (k % 2) * 3, hex('#b88a7a'), hex('#8a6060'), hex('#5a3a44')); }
  // ruinas al fondo y el suelo de tierra
  for (let x = x0; x <= x1; x++) { const top = hz - 4 - Math.round(8 * hh(x >> 3, 3)) - (x > x0 + 150 ? 6 : 0); R.linea(x, top, x, hz, hex('#3a2634')); if (hh(x, top) > 0.92) R.pset(x, top + 3, hex('#f8a040')); }
  for (let y = hz; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, by(x, y) + hh(x >> 1, y >> 1, 2) * 0.4 > 0.7 ? hex('#7a5444') : (y - hz) > h * 0.22 ? hex('#4a3230') : hex('#5e3e36'));
  // los héroes a la izquierda, el ejército a la derecha
  const sal = tramo(t, BATALLA - 0.3, BATALLA + 0.1);
  R.actor(EL.capitan, x0 + 30, y1 - 8, t, { dir: 1, sostiene: true });
  R.actor(EL.ironman, x0 + 54, y1 - 4 - Math.round(Math.sin(sal * Math.PI) * 10), t, { dir: 1, brazos: sal > 0 && sal < 1 });
  R.actor(EL.thor, x0 + 78, y1 - 7, t, { dir: 1, sostiene: true });
  for (let k = 0; k < 14; k++) { const ax = x0 + 132 + k * 6 + (k % 2) * 2, ay = hz + 6 + (k % 3) * 4 + Math.round(Math.sin(t * 3 + k) * 1);
    R.rect(ax, ay - 7, ax + 3, ay, hex('#2a1a2a')); R.pset(ax + 1, ay - 8, hex('#2a1a2a')); R.pset(ax + 2, ay - 5, hex('#c83a3a')); }
  R.actor(EL.thanos, x1 - 46, y1 - 6, t, { dir: -1, enfado: true, sostiene: true });
  // el fogonazo de «Battle»
  const f = tramo(t, BATALLA, BATALLA + 1.1);
  if (f > 0 && f < 1) { const cx = x0 + 120, cy = hz - 6, r = 8 + f * 60; for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r * 1.4); x <= cx + r * 1.4; x++) {
    const d = Math.hypot((x - cx) / 1.4, y - cy) / r; if (d < 1 && by(x, y) > d * 0.9 + f * 0.6) R.pset(x, y, d < 0.4 ? hex('#ffffff') : hex('#fff0a0')); } }
  R.recorte(null);
};
const p1 = (t) => {
  const g = T.hoy(R, t, { encuadre: 'cine', pantalla: peliBatalla, publico: 'normal' });
  const s = tramo(t, BATALLA + 0.05, BATALLA + 0.35) - tramo(t, BATALLA + 1.6, BATALLA + 1.9);
  R.actor(EL.chica, 140, 166, t, { dir: -1, sorpresa: t > BATALLA && t < BATALLA + 1.4 });
  R.actor(EL.fanArana, 176, 166, t, { dir: -1, salto: Math.round(s * 8), brazos: s > 0.3, sonrisa: s > 0.3 });
  const fc = R.actor(EL.fanCapa, 212, 166, t, { dir: -1, sorpresa: t > BATALLA && t < ENDGAME, dedo: t > ENDGAME, habla: t > ENDGAME && Math.sin(t * 9) > 0 });
  R.actor(EL.sudadera, 248, 166, t, { dir: -1, sostiene: true });
  const cubo = R.actor(EL.senor30, 284, 166, t, { dir: -1, sostiene: true }).mano;
  // el vaso del de la sudadera y el cubo del señor (vacíos, del cine)
  T.hoyDelante(R, t, {});
  // el fogonazo de la pantalla ilumina la sala
  const f = tramo(t, BATALLA, BATALLA + 0.7); if (f > 0 && f < 1) for (let y = 14; y < 176; y += 1) for (let x = 104; x < 320; x++) if (by(x, y) < (1 - f) * 0.35) R.pset(x, y, hex('#f8e8c8'));
};

// ── 2 · inserto: el guante y las seis gemas (fondo local) ──
let fondoG = null;
const pintaFondoG = () => {
  const b = R.nuevo(), prev = R.usar(b);
  degradado(0, 0, 319, 118, rampa(['#2a1a28', '#3e2030', '#5e2a30', '#8a3a30', '#b8522e', '#e0763a', '#f4a456']), 3);
  // el sol velado por el humo
  for (let y = 40; y < 100; y++) for (let x = 40; x < 120; x++) { const d = Math.hypot(x - 80, y - 70) / 26; if (d < 1 && by(x, y) < (1 - d) * 1.4) R.pset(x, y, d < 0.55 ? hex('#fff0c0') : hex('#f8c878')); }
  // ruinas lejanas: torres rotas con ventanas encendidas
  for (let x = 0; x < 320; x++) { const k = x >> 4, alto = 18 + Math.round(26 * hh(k, 1)) * (hh(k, 2) > 0.35 ? 1 : 0.3), top = 112 - alto + ((x & 15) > 12 ? Math.round(hh(x, 4) * 5) : 0);
    for (let y = top; y < 120; y++) R.pset(x, y, (x & 15) < 2 ? hex('#2a1c28') : hex('#3a2634'));
    if ((x & 3) === 1) for (let y = top + 4; y < 116; y += 5) if (hh(x, y) > 0.7) R.pset(x, y, hh(x, y, 9) > 0.5 ? hex('#f8a040') : hex('#c85a28')); }
  // el casco de la nave estrellada a la derecha
  R.poligono([[214, 120], [236, 84], [300, 70], [330, 74], [330, 122]], hex('#2e2a3a'));
  for (let k = 0; k < 7; k++) R.linea(240 + k * 13, 82 - k, 236 + k * 13, 120, hex('#4a4458'));
  R.linea(236, 84, 300, 70, hex('#6a6478'));
  // el suelo de escombros: tierra tramada, piedras, varillas, grietas y charcos con brillo
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y - 118) / 62 + (by(x, y) - 0.5) * 0.3 + (hh(x >> 2, y >> 1, 5) - 0.5) * 0.35;
    R.pset(x, y, v < 0.25 ? hex('#6a4a40') : v < 0.55 ? hex('#5a3c36') : v < 0.85 ? hex('#4a302e') : hex('#3a2428')); }
  for (let k = 0; k < 70; k++) { const x = Math.round(hh(k, 11) * 320), y = 122 + Math.round(hh(k, 12) ** 0.7 * 56), s = 1 + Math.round(hh(k, 13) * (y - 110) / 18);
    R.poligono([[x - s, y], [x - s + 1, y - s], [x + s, y - s + 1], [x + s + 1, y]], hex('#7a6a6a')); R.linea(x - s + 1, y - s, x + s, y - s + 1, hex('#a89a96')); R.linea(x - s, y + 1, x + s + 1, y + 1, hex('#2a1c20')); }
  for (let k = 0; k < 9; k++) { const x = 20 + k * 34 + Math.round(hh(k, 21) * 14), y = 128 + Math.round(hh(k, 22) * 40); R.linea(x, y, x + 6 + k % 4, y - 9 - k % 5, hex('#3a2a2a')); R.linea(x + 1, y, x + 7 + k % 4, y - 9 - k % 5, hex('#8a5a4a')); }
  for (let k = 0; k < 6; k++) { let x = 10 + k * 52, y = 140 + (k % 3) * 12; for (let s = 0; s < 14; s++) { R.pset(x, y, hex('#2a1a1e')); x += 1 + (hh(k, s) > 0.5 ? 1 : 0); y += hh(k, s, 2) > 0.6 ? 1 : hh(k, s, 2) < 0.2 ? -1 : 0; } }
  // un bloque de hormigón roto delante, a la derecha (tercer término)
  R.poligono([[236, 180], [242, 146], [276, 138], [320, 142], [320, 180]], hex('#8a8288'));
  R.poligono([[242, 146], [276, 138], [320, 142], [320, 148], [278, 145], [246, 152]], hex('#b4aab0'));
  for (let k = 0; k < 5; k++) R.linea(250 + k * 14, 150 + (k % 2) * 6, 256 + k * 14, 178, hex('#5a5258'));
  for (let k = 0; k < 4; k++) { R.linea(262 + k * 12, 140, 266 + k * 12, 124 - k * 3, hex('#5a3a2a')); R.pset(266 + k * 12, 124 - k * 3, hex('#8a5a3a')); }
  R.usar(prev); return b;
};
const guanteRojo = { k: hex('#1a1014'), O: hex('#e8b830'), g: hex('#a87a18'), L: hex('#fff0a0') };
const GUANTE_G = ['.kk.kk.kk..', 'kOOkOOkOOk.', 'kOskOskOsk.', 'kOOOOOOOOkk', 'kLOOOOOOOkOk', 'kLOOsOOOOksk', 'kgOOOOsOOkOk', 'kggOOOOggkk.', '.kkgggggk...', '..kOOOOOk...', '..kkkkkkk...'];
const ZOCALOS = [[2, 2], [5, 2], [8, 2], [4, 5], [10, 5], [6, 6]];
const p2 = (t) => {
  if (!fondoG) fondoG = pintaFondoG(); R.copiar(fondoG);
  // humo de tres capas a tres velocidades, brasas que suben, una nave lejana
  for (let k = 0; k < 6; k++) { const x = ((k * 70 + t * (4 + k)) % 400) - 40; humo(x, 30 + (k % 3) * 22, 8 + (k % 3) * 3, hex('#9a7a7a'), hex('#6e5258'), hex('#4a3440')); }
  { const nx = ((t * 30) % 420) - 50; R.rect(nx, 46, nx + 9, 48, hex('#2a2030')); R.rect(nx + 3, 44, nx + 6, 45, hex('#2a2030')); R.pset(nx - 1, 47, hex('#f8a040')); }
  for (let k = 0; k < 40; k++) { const x = Math.round((hh(k, 31) * 320 + Math.sin(t + k) * 6) % 320), y = Math.round(178 - ((t * (10 + k % 7) + hh(k, 32) * 180) % 180)); R.pset(x, y, k % 3 ? hex('#f8a040') : hex('#fff0a0')); }
  for (const [fx, fy] of [[44, 150], [130, 168], [212, 134]]) for (let k = 0; k < 6; k++) { const hgt = 3 + ((Math.floor(t * 10) + k) % 4); R.linea(fx + k - 3, fy, fx + k - 3 + (k % 2), fy - hgt, k % 2 ? hex('#f8c040') : hex('#e85a20')); }
  // el bloque de hormigón del centro, donde descansa el guante (cara de arriba con luz, grietas, varillas y polvo)
  R.poligono([[110, 170], [114, 136], [124, 128], [214, 126], [224, 134], [228, 170]], hex('#1a1014'));
  R.poligono([[112, 169], [116, 137], [214, 136], [226, 136], [226, 169]], hex('#7a7278'));
  R.poligono([[116, 137], [125, 129], [213, 127], [223, 135], [214, 136]], hex('#b4aab0'));
  for (let x = 118; x < 224; x += 3) if (hh(x, 9) > 0.5) R.pset(x, 131 + Math.round(hh(x, 8) * 3), hex('#d4cad0'));
  for (const [x0, y0, x1, y1] of [[140, 138, 146, 160], [146, 160, 142, 168], [196, 140, 192, 152], [192, 152, 198, 166], [170, 137, 172, 146]]) R.linea(x0, y0, x1, y1, hex('#4a4248'));
  for (let y = 138; y < 169; y++) for (let x = 113; x < 226; x++) { const n = hh(x >> 1, y >> 1, 4); if (n > 0.9) R.pset(x, y, hex('#5e565c')); else if (n < 0.06) R.pset(x, y, hex('#9a9298')); }
  for (const [mx, my, mr] of [[130, 160, 5], [204, 150, 4], [176, 164, 3]]) for (let y = my - mr; y <= my + mr; y++) for (let x = mx - mr * 2; x <= mx + mr * 2; x++) if (Math.hypot((x - mx) / 2, y - my) < mr && by(x, y) < 0.5) R.pset(x, y, hex('#5a4e50'));
  for (let x = 118; x < 222; x += 7) R.pset(x, 169, hex('#c8bcc0'));
  R.linea(220, 140, 232, 124, hex('#5a3a2a')); R.linea(221, 140, 233, 124, hex('#8a5a3a')); R.linea(116, 150, 104, 140, hex('#5a3a2a'));
  // el guante dorado de pie sobre el bloque; al llegar la última gema, late y tiembla
  const carga = tramo(t, GUANTE - 0.2, GUANTE + 0.4), tiembla = t > GUANTE ? (Math.floor(t * 24) % 2) : 0;
  const S = 4, gx = 146 + tiembla, gy = 130 - GUANTE_G.length * S;
  if (carga > 0) for (let y = gy - 22; y < gy + 50; y++) for (let x = gx - 24; x < gx + 72; x++) { const d = Math.hypot((x - gx - 22) / 46, (y - gy - 22) / 34); if (d < 1 && by(x, y) < (1 - d) * carga * (0.7 + 0.3 * Math.sin(t * 12))) R.pset(x, y, hex('#fff0a0')); }
  GUANTE_G.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const ch = f[i]; if (ch === '.') continue; R.rect(gx + i * S, gy + j * S, gx + i * S + S - 1, gy + j * S + S - 1, ch === 's' ? hex('#3a2a14') : guanteRojo[ch]); } });
  // pliegues, remaches y brillo del metal
  for (let j = 1; j < 8; j++) { R.pset(gx + 5, gy + j * S + 2, hex('#fff6c8')); R.pset(gx + 6, gy + j * S + 1, hex('#fff6c8')); }
  for (const [i, j] of [[3, 3], [6, 3], [8, 7], [3, 7]]) { R.pset(gx + i * S + 1, gy + j * S + 1, hex('#a87a18')); R.pset(gx + i * S + 2, gy + j * S + 1, hex('#fff0a0')); }
  for (let i = 1; i < 9; i++) R.pset(gx + i * S + 2, gy + 3 * S - 1, hex('#a87a18'));
  R.rect(gx + 6, 130, gx + 38, 131, hex('#4a4248'));
  // las seis gemas: llegan volando una a una con su estela y encajan con un destello
  ZOCALOS.forEach(([i, j], k) => {
    const lleg = GEMA0 + k * (GEMA5 - GEMA0) / 5, u = tramo(t, lleg - 0.55, lleg), zx = gx + i * S + 1, zy = gy + j * S + 1, c = GEMAS[k];
    if (u <= 0) return;
    const ox = 330 - k * 14, oy = -10 + k * 20, px = Math.round(lerp(ox, zx, u * u)), py = Math.round(lerp(oy, zy, u * u));
    if (u < 1) { for (let s = 1; s < 16; s++) { const q = Math.max(0, u * u - s * 0.022); const qx = Math.round(lerp(ox, zx, q)), qy = Math.round(lerp(oy, zy, q)); R.pset(qx, qy, s < 7 ? c : hex('#fff6c8')); if (s < 5) R.pset(qx, qy + 1, c); }
      R.poligono([[px, py - 4], [px + 4, py], [px, py + 4], [px - 4, py]], hex('#1a1014')); R.poligono([[px, py - 3], [px + 3, py], [px, py + 3], [px - 3, py]], c); R.pset(px - 1, py - 1, hex('#ffffff')); R.pset(px, py - 2, hex('#ffffff')); }
    else { R.rect(zx - 1, zy - 1, zx + 2, zy + 2, c); R.pset(zx - 1, zy - 1, hex('#ffffff')); R.pset(zx, zy - 1, hex('#ffffff')); if (Math.sin(t * 6 + k) > 0.5) R.pset(zx + 3, zy - 2, hex('#ffffff')); }
    const f = tramo(t, lleg, lleg + 0.5); if (f > 0 && f < 1) { R.anillo(zx, zy, 3 + f * 10, c); R.anillo(zx, zy, 1 + f * 7, hex('#ffffff'), 3); for (let d = 0; d < 4; d++) { const r = 5 + f * 11; R.pset(zx + [r, -r, 0, 0][d], zy + [0, 0, r, -r][d], hex('#ffffff')); } }
  });
  // con las seis puestas, el guante chisporrotea y suelta un haz hacia el cielo
  if (t > GEMA5 + 0.2) for (let k = 0; k < 6; k++) { if (Math.floor(t * 14 + k) % 3) continue; let x = gx + 22 + Math.round((hh(k, Math.floor(t * 9)) - 0.5) * 50), y = gy + 10 + Math.round(hh(k, Math.floor(t * 9), 3) * 30);
    for (let s = 0; s < 6; s++) { const nx = x + (hh(k, s, Math.floor(t * 9)) > 0.5 ? 3 : -3), ny = y - 3; R.linea(x, y, nx, ny, s % 2 ? hex('#e8d0ff') : hex('#ffffff')); x = nx; y = ny; } }
  if (carga > 0.5) { const hgt = Math.round((carga - 0.5) * 2 * (gy - 22)); for (let y = gy - hgt; y < gy; y++) for (let x = gx + 18; x < gx + 27; x++) if (by(x, y) < 0.6 - Math.abs(x - gx - 22.5) * 0.12) R.pset(x, y, hex('#fff6c8')); }
  // un dron roto en el suelo con su luz que parpadea y un cable (tercer término a la izquierda)
  R.poligono([[30, 168], [36, 158], [58, 156], [64, 166]], hex('#3a3e4a')); R.linea(36, 158, 58, 156, hex('#6a6e7a')); R.disco(46, 162, 3, hex('#1a1014')); R.pset(46, 162, Math.sin(t * 5) > 0 ? hex('#5ad8ff') : hex('#2a4a6a'));
  R.linea(64, 166, 80, 172, hex('#1a1014')); R.linea(80, 172, 96, 170, hex('#1a1014'));
};

// ── 3 · el chasquido en la batalla ──
const capaT = R.nuevo();
const disuelve = (pinta, u, caja) => {
  capaT.fill(0); const prev = R.usar(capaT); pinta(); R.usar(prev);
  const [x0, y0, x1, y1] = caja;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = capaT[y * 320 + x]; if (!c) continue;
    const umbral = 0.15 + 0.7 * (y1 - y) / (y1 - y0) * 0.6 + hh(x, y, 5) * 0.4;
    if (u < umbral) R.pset(x, y, c);
    else if (hh(x, y, 6) < 0.35) { const d = (u - umbral) * 60; if (d < 40) R.pset(Math.round(x + d * 0.9 + Math.sin(d + y) * 2), Math.round(y - d * 0.8), GEMAS[Math.floor(hh(x, y, 7) * 6)]); } }
};
const p3 = (t) => {
  const destello = tramo(t, SNAP, SNAP + 4.6), o = { encuadre: 'batalla', destello };
  // Iron Man de pie detrás de un bloque de escombros; levanta el guante y, al final, se deja caer
  const cae = tramo(t, SOBREVIVE, SOBREVIVE + 1.2), ix = 112, iy = 164 + Math.round(cae * 8), arriba = tramo(t, P3, SNAP) - tramo(t, SOBREVIVE - 0.4, SOBREVIVE);
  const ixy = [ix + 22, iy - 34];
  // la posición del guante, para el centro del destello
  const hxP = ix + 12 + Math.round(9 * 0.6), hyP = iy - 13 + 2 - Math.round(9 * 0.8);
  T.lago(R, t, { ...o, centro: [hxP, hyP - 5] });
  // Thanos avanza un paso y, en «Thanos», se deshace en polvo de colores
  const pasoT = tramo(t, P3, P3 + 0.7), tx = Math.round(lerp(214, 200, pasoT));
  const u = tramo(t, THANOS - 0.2, THANOS + 1.6);
  if (u < 1) disuelve(() => R.actor(EL.thanos, tx, 146, t, { dir: -1, enfado: true, sorpresa: t > SNAP + 0.4, anda: pasoT > 0 && pasoT < 1 }), u, [tx - 6, 110, tx + 24, 146]);
  // el Capitán y Thor llegan andando cuando Iron Man cae
  const vc = tramo(t, SOBREVIVE - 0.2, SOBREVIVE + 1.4), vt = tramo(t, SOBREVIVE + 0.1, SOBREVIVE + 1.6);
  const cx = Math.round(lerp(-18, 70, vc)), thx = Math.round(lerp(330, 158, vt));
  if (vc > 0) { const cap = R.actor(EL.capitan, cx, 172, t, { dir: 1, anda: vc > 0 && vc < 1, triste: vc >= 1, sostiene: true });
    T.PIEZAS_DO.escudo(R, cap.mano[0] + 2, cap.mano[1] + 1, { s: 1 }); }
  if (vt > 0) { const th = R.actor(EL.thor, thx, 170, t, { dir: -1, anda: vt > 0 && vt < 1, triste: vt >= 1, sostiene: true });
    T.PIEZAS_DO.martillo(R, th.mano[0], th.mano[1] + 2, {}); }
  const im = R.actor(EL.ironman, ix, iy, t, { dir: 1, sostiene: arriba > 0.05 ? [lerp(ix + 20, ixy[0], arriba), lerp(iy - 6, ixy[1], arriba)] : false });
  if (arriba > 0.05) T.PIEZAS_DO.guantelete(R, im.mano[0], im.mano[1] + 2, t);
  else { R.rect(im.mano[0] - 1, im.mano[1] - 1, im.mano[0] + 2, im.mano[1] + 2, hex('#1a1014')); R.rect(im.mano[0], im.mano[1], im.mano[0] + 1, im.mano[1] + 1, hex('#e8b830')); }
  // el bloque de escombros por delante de sus piernas (hormigón con grietas y una varilla)
  { const X = ix - 16; R.poligono([[X - 2, 176], [X + 2, 158], [X + 16, 154], [X + 40, 157], [X + 46, 176]], hex('#1a1014'));
    R.poligono([[X, 175], [X + 4, 159], [X + 16, 155], [X + 39, 158], [X + 44, 175]], hex('#8a8288'));
    R.poligono([[X + 4, 159], [X + 16, 155], [X + 39, 158], [X + 38, 161], [X + 16, 158], [X + 6, 162]], hex('#b4aab0'));
    R.linea(X + 12, 162, X + 16, 175, hex('#5a5258')); R.linea(X + 28, 161, X + 26, 172, hex('#5a5258')); R.linea(X + 34, 157, X + 38, 147, hex('#5a3a2a')); R.pset(X + 38, 146, hex('#8a5a3a'));
    for (let y = 163; y < 175; y += 2) for (let x = X + 2; x < X + 43; x += 2) if (by(x, y) > 0.8) R.pset(x, y, hex('#6a6268')); }
  // el reactor del pecho late cada vez más despacio
  const late = cae > 0 ? 0.5 + 0.5 * Math.sin(t * (6 - cae * 4)) : 1; if (late > 0.4) R.pset(ix + 7, iy - 9, hex('#e8ffff'));
  T.lagoDelante(R, t, o);
};

// ── 4 · el cine de frente: el público llora; las palomitas se suenan (gag 1) ──
const peliLago = (R, t, S) => {
  const [x0, y0, x1, y1] = S, hz = y0 + 58; R.recorte(S);
  degradado(x0, y0, x1, hz, rampa(['#3a2a5a', '#6a3a6a', '#b85a5a', '#e88a4a', '#f8c060']), 4);
  for (let y = hz - 14; y < hz; y++) for (let x = 140; x < 164; x++) { const d = Math.hypot(x - 151.5, y - hz) / 12; if (d < 1) R.pset(x, y, d < 0.8 ? hex('#fff0b0') : hex('#f8d070')); }
  for (let x = x0; x <= x1; x++) { const top = hz - 3 - Math.round(5 * Math.sin(x * 0.05) + 3 * hh(x >> 2, 9)); R.linea(x, top, x, hz, hex('#3a2a40')); }
  for (let y = hz; y <= y1; y++) for (let x = x0; x <= x1; x++) { const raya = Math.sin(y * 1.3 + Math.sin(x * 0.2 + t * 1.5) * 1.2) > 0.6; const sol = Math.abs(x - 151) < 6 + (y - hz) * 0.3 && hh(x, y + Math.floor(t * 4)) > 0.45;
    R.pset(x, y, sol ? hex('#f8c060') : raya ? hex('#6a5a8a') : (y - hz) > 24 ? hex('#2a2448') : hex('#3e3460')); }
  // la corona de flores que flota, con su luz azul en el centro
  const cx = Math.round(lerp(118, 176, (t % 14) / 14)), cy = hz + 18 + Math.round(Math.sin(t * 1.6) * 1);
  R.anillo(cx, cy, 7, hex('#2a6a3a')); R.anillo(cx, cy, 6, hex('#3a8a4a'));
  for (let k = 0; k < 10; k++) { const ang = k * 0.628; R.pset(Math.round(cx + Math.cos(ang) * 6.5), Math.round(cy + Math.sin(ang) * 3.5), ['#f8f0f0', '#f05a6a', '#f8d040'].map(hex)[k % 3]); }
  const brilla = 1 + tramo(t, IRON, IRON + 0.4) - tramo(t, IRON + 1.2, IRON + 1.8);
  R.disco(cx, cy, 2 + brilla, hex('#8ae8ff')); R.pset(cx, cy, hex('#ffffff'));
  for (let k = 0; k < 3; k++) { const r = 9 + ((t * 5 + k * 5) % 15); R.anillo(cx, cy, r, hex('#8a7aa8'), 4); }
  for (let k = 0; k < 4; k++) { const bx = Math.round(x0 + ((t * 9 + k * 40) % (x1 - x0))), byy = y0 + 18 + k * 6 + Math.round(Math.sin(t * 3 + k) * 2), al = Math.sin(t * 10 + k) > 0;
    R.pset(bx, byy, hex('#2a1a30')); R.pset(bx - 1, byy - (al ? 1 : 0), hex('#2a1a30')); R.pset(bx + 1, byy - (al ? 1 : 0), hex('#2a1a30')); }
  R.recorte(null);
};
const p4 = (t) => {
  T.hoy(R, t, { encuadre: 'cine', camara: 'pantalla', pantalla: peliLago, publico: 'llora' });
  const sec = t > b(0.112) && t < ADIOS - 0.2;
  const fc = R.actor(EL.fanCapa, 66, 176, t, { dir: 1, triste: true, sostiene: sec ? [86, 150] : false });
  if (sec) { const [mx, my] = fc.mano; R.rect(mx - 2, my - 3, mx + 2, my + 1, hex('#e8e8f0')); R.pset(mx - 1, my - 3, hex('#ffffff')); R.pset(mx + 2, my + 1, hex('#b8b8c8')); }
  lagrimas(fc.cabeza, t, 1);
  const s1 = R.actor(EL.senora30, 104, 176, t, { dir: 1, triste: true }); lagrimas(s1.cabeza, t + 0.3, 1);
  const s2 = R.actor(EL.fanArana, 196, 176, t, { dir: -1, triste: true }); lagrimas(s2.cabeza, t + 0.6, -1);
  const s3 = R.actor(EL.abuela, 232, 176, t, { dir: -1, triste: true, sostiene: true }); lagrimas(s3.cabeza, t + 0.9, -1);
  { const [mx, my] = s3.mano; R.rect(mx - 1, my - 2, mx + 2, my + 1, hex('#e8e8f0')); }
  // las palomitas en su butaca: lloran y, en «goodbye», se suenan con la servilleta
  const suena = t > ADIOS && t < ADIOS + 1.3;
  T.palomitas(R, 150, 169, t, { s: 2, dir: 1, expresion: suena ? 'normal' : 'llora', servilleta: suena, gafas: false });
  T.hoyDelante(R, t, { camara: 'pantalla' });
};

// ── 5 · la noche del homenaje: velas, una flor y la placa 2008–2019 ──
const p5 = (t) => {
  const v = tramo(t, P5, b(0.97)), o = { encuadre: 'batalla', camara: 'pedestal', velas: 0.25 + 0.75 * v };
  T.lago(R, t, o);
  const w = tramo(t, P5 + 0.1, P5 + 1.6), deja = tramo(t, P5 + 1.8, P5 + 2.3), fx = Math.round(lerp(-16, 92, w));
  const fan = R.actor(EL.fanCapa, fx, 166, t, { dir: 1, anda: w > 0 && w < 1, triste: w >= 1, sostiene: deja < 1 ? [fx + 20, 154 + deja * 8] : false });
  const flor = (x, y) => { R.linea(x, y, x, y - 6, hex('#2a7a3a')); R.pset(x + 1, y - 4, hex('#3a9a4a')); R.disco(x, y - 8, 2, hex('#f05a6a')); R.pset(x, y - 8, hex('#f8d040')); R.pset(x - 1, y - 9, hex('#ffb0b8')); };
  if (deja < 1) flor(fan.mano[0], fan.mano[1]); else flor(114, 164);
  // una niña levanta la luz del móvil; un señor la acompaña
  const lv = tramo(t, P5 + 0.6, P5 + 1.4);
  const ni = R.actor(EL.nina, 214, 166, t, { dir: -1, sostiene: [214 - 4, 132 + Math.round((1 - lv) * 12)] });
  { const [mx, my] = ni.mano; R.rect(mx - 1, my - 4, mx + 1, my, hex('#1a1014')); R.pset(mx, my - 3, hex('#ffffff')); if (lv > 0.5) for (let y = my - 12; y < my - 4; y++) for (let x = mx - 4; x <= mx + 4; x++) if (by(x, y) < 0.25 - Math.abs(x - mx) * 0.04) R.pset(x, y, hex('#e8f0ff')); }
  R.actor(EL.senor30, 238, 166, t, { dir: -1, triste: true });
  // la placa del pedestal: 2008 en «started it all», cuenta hasta 2019 en «11 years earlier»
  const ap = tramo(t, EMPEZO - 0.2, EMPEZO + 0.2);
  if (ap > 0) { R.rect(136, 152, 184, 161, hex('#1a1014')); R.rect(137, 153, 183, 160, hex('#3a2a1a')); R.rect(137, 153, 183, 153, hex('#e8b830'));
    const año = Math.round(lerp(2008, 2019, tramo(t, ONCE, ONCE + 0.8))); if (ap > 0.5) R.numero(String(año), 160, 160, { centro: true }); }
  T.lagoDelante(R, t, o);
};
const año = 2019;
const efectos = [[BATALLA, 'boom'], [GEMA0, 'brillo'], [GEMA5, 'brillo'], [GUANTE, 'zumbido'], [SNAP, 'flash'], [THANOS, 'rafaga'], [SOBREVIVE + 0.3, 'whoosh'], [ADIOS + 0.1, 'claxon'], [P5 + 1.9, 'golpecito'], [ONCE, 'tic']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')

E['do-mascara'] = ('La máscara', '''// DO-MASCARA (frases 3–4), 2024 → 2026. Cinco planos:
// 1. «Five years later, in July 2024, in a hall packed with fans in San Diego»: el pabellón de la Comic-Con entero, la
//    pantalla gigante con la máscara; los fans de pie saltan y agitan los brazos en «packed with fans»; el presentador
//    habla en el escenario y en «San Diego» señala al lateral, por donde asoma el hombre de la capa verde; corta en «A man»;
// 2. el escenario de cerca: el hombre de la capa verde y la máscara de metal cruza hasta el centro («walks onto the
//    stage»), levanta las manos a la cara y en «takes off the mask» se la quita: es el actor, con la máscara en la mano;
//    destello, la pantalla parpadea, las cabezas de delante se levantan; corta en la pausa antes de «and it's»;
// 3. el público visto desde el escenario (fondo local): las gradas con cientos de cabezas y móviles; las tres filas se
//    levantan en ola en «the same actor» con los brazos arriba; en «Robert Downey Jr.» un señor salta y se le cae el
//    refresco (dos asientos vacíos a su lado y un foco sobre él): el vaso vuela y se derrama con hielo en el pasillo
//    (gag 4); corta en «The man who saved»;
// 4. Latveria al atardecer: Iron Man entra en la plaza; en «coming back as Dr. Doom» un remolino verde lo envuelve y sale
//    convertido en Doom, con capa; los vecinos se asustan y las palomas salen volando; en «the villain» levanta los brazos
//    con rayos verdes y en «Doomsday» truena y el cielo se oscurece; corta en «which hits»;
// 5. el espacio: tres Tierras (616, 828 y 10005); en «December 18th» cae una hoja de calendario con el 12 y un 18
//    dorado enorme que rebota; en «heroes» llegan al risco Thor, Reed y Lobezno, uno de cada mundo, y en «three
//    different universes» cada Tierra se ilumina a su turno.''', PIEZAS + r'''
const a = (f) => en('mascara', f), b = (f) => en('doom', f);
const P2 = a(0.409), P3 = a(0.763), P4 = b(0), P5 = b(0.549);
const LLENO = a(0.251), DIEGO = a(0.337), SUBE = a(0.579), ESCENARIO = a(0.622), QUITA = a(0.699), MISMO = a(0.816), ROBERT = a(0.911);
const VUELVE = b(0.208), DOOM = b(0.235), VILLANO = b(0.345), DIA = b(0.484), DICIEMBRE = b(0.656), DIECIOCHO = b(0.684), HEROES = b(0.785), TRES = b(0.861);

// ── 1 · el pabellón entero ──
const p1 = (t) => {
  const ov = 0.18 * (tramo(t, LLENO, LLENO + 0.4) - tramo(t, LLENO + 1.4, LLENO + 2));
  T.escenario(R, t, { pantalla: 'mascara', ovacion: ov });
  // el presentador habla y señala al lateral; el hombre de la capa asoma
  const pr = R.actor(EL.feige, 192, 106, t, { dir: -1, habla: t < DIEGO && Math.sin(t * 8) > 0, dedo: t > DIEGO, sonrisa: t > DIEGO });
  const e = tramo(t, DIEGO + 0.3, P2 + 0.1); if (e > 0) R.actor(EL.doom, Math.round(lerp(78, 108, e)), 106, t, { dir: 1, anda: e < 1 });
  // fans de pie entre el público: saltan y agitan los brazos en «packed with fans»
  const s1 = Math.abs(Math.sin((t - LLENO) * 7)) * tramo(t, LLENO, LLENO + 0.3) * (1 - tramo(t, LLENO + 2.2, LLENO + 2.5));
  R.actor(EL.fanCuernos, 52, 178, t, { dir: 1, salto: Math.round(s1 * 5), brazos: s1 > 0.1, sonrisa: true });
  R.actor(EL.fanArana, 252, 178, t, { dir: -1, salto: Math.round(Math.abs(Math.sin((t - LLENO) * 7 + 1)) * 4 * tramo(t, LLENO + 0.2, LLENO + 0.5)), brazos: t > LLENO + 0.2, sonrisa: true });
  T.escenarioDelante(R, t, { ovacion: ov });
};

// ── 2 · el escenario de cerca: se quita la máscara ──
const p2 = (t) => {
  const quita = t > QUITA + 0.15, ov = 0.55 * tramo(t, QUITA + 0.2, QUITA + 0.9);
  const glitch = tramo(t, QUITA, QUITA + 0.2) - tramo(t, QUITA + 0.5, QUITA + 0.8);
  T.escenario(R, t, { camara: 'pantalla', pantalla: 'mascara', glitch, ovacion: ov });
  const w = tramo(t, P2 + 0.1, ESCENARIO + 0.2), dx = Math.round(lerp(26, 142, w));
  // el foco que lo sigue y se cierra sobre él al quitarse la máscara
  { const fo = 0.45 + 0.35 * tramo(t, QUITA - 0.6, QUITA); for (let y = 20; y < 147; y++) { const w = 4 + (y - 20) * 0.11, cxx = dx + 7 + (y - 146) * 0.15; for (let x = Math.round(cxx - w); x <= cxx + w; x++) if (by(x, y) < fo * 0.5 - Math.abs(x - cxx) / w * 0.2) R.pset(x, y, hex('#fff0c0')); }
    for (let x = dx - 8; x < dx + 24; x++) for (let y = 143; y < 150; y++) if (Math.hypot((x - dx - 7) / 16, (y - 146.5) / 3.5) < 1 && by(x, y) < fo) R.pset(x, y, hex('#f8e8b0')); }
  R.actor(EL.feige, 214, 146, t, { dir: -1, sonrisa: true, sorpresa: quita && t < QUITA + 1.2, brazos: t > QUITA + 1.3, habla: t < SUBE && Math.sin(t * 8) > 0 });
  if (!quita) R.actor(EL.doom, dx, 146, t, { dir: 1, anda: w > 0 && w < 1, brazos: t > QUITA - 0.5 });
  else {
    const rd = R.actor(EL.rdj, dx, 146, t, { dir: 1, sonrisa: true, sostiene: [dx + 22, 120 - Math.round(tramo(t, QUITA + 0.3, QUITA + 0.8) * 6)] });
    T.e_mascara(R, rd.mano[0] + 2, rd.mano[1] - 3, 1, {});
    // la capa verde sigue colgada de los hombros
    R.rect(dx + 1, 135, dx + 3, 145, hex('#1e5a2a')); R.pset(dx + 2, 136, hex('#2e7a3e'));
  }
  // el destello de la revelación y los flashes del público
  const f = tramo(t, QUITA + 0.1, QUITA + 0.7); if (f > 0 && f < 1) { const cx = dx + 8, cy = 126; for (let k = 0; k < 12; k++) { const ang = k * 0.52, r0 = 4 + f * 14, r1 = r0 + 6; R.linea(Math.round(cx + Math.cos(ang) * r0), Math.round(cy + Math.sin(ang) * r0), Math.round(cx + Math.cos(ang) * r1), Math.round(cy + Math.sin(ang) * r1), k % 2 ? hex('#fff0a0') : hex('#ffffff')); } }
  if (quita) for (let k = 0; k < 4; k++) { if (hh(k, Math.floor(t * 8)) < 0.6) continue; const x = 20 + Math.round(hh(k, Math.floor(t * 8), 2) * 280), y = 160 + Math.round(hh(k, Math.floor(t * 8), 3) * 12); R.disco(x, y, 2, hex('#ffffff')); R.pset(x - 3, y, hex('#e8f0ff')); R.pset(x + 3, y, hex('#e8f0ff')); }
  T.escenarioDelante(R, t, { camara: 'pantalla', ovacion: ov });
};

// ── 3 · el público desde el escenario: la ola y el refresco (gag 4) ──
let fondoP = null;
const pintaFondoP = () => {
  const bf = R.nuevo(), prev = R.usar(bf);
  degradado(0, 0, 319, 179, rampa(['#0a0c1a', '#12162a', '#1a1e38', '#222844']), 2);
  // el techo con la cercha y sus focos
  for (const y of [8, 18]) { R.linea(0, y, 319, y, hex('#4a4e64')); }
  for (let x = 0; x < 320; x += 10) { R.linea(x, 8, x + 10, 18, hex('#3a3e54')); R.linea(x + 10, 8, x, 18, hex('#3a3e54')); }
  for (let k = 0; k < 9; k++) { const x = 16 + k * 34; R.rect(x - 3, 19, x + 3, 24, hex('#2a2a36')); R.rect(x - 2, 24, x + 2, 25, hex('#f8f0c0')); }
  // las gradas del fondo: cientos de cabezas en filas que suben, con barandillas
  const pelos = rampa(['#2a1c14', '#5a3418', '#a8743c', '#e0b860', '#1c1424', '#7a7a8a', '#c84a2a']), pieles = rampa(['#f6c290', '#d48a5a', '#8a5a3a', '#e8b080']);
  for (let fila = 0; fila < 12; fila++) { const y = 36 + fila * 6, desf = (fila % 2) * 3;
    R.rect(0, y + 3, 319, y + 5, fila % 2 ? hex('#3a1a2a') : hex('#4a2030'));
    for (let x = 2 + desf; x < 320; x += 6) { if (hh(x, fila) < 0.08) continue; const p = pelos[Math.floor(hh(x, fila, 1) * pelos.length)], s = pieles[Math.floor(hh(x, fila, 2) * pieles.length)];
      R.rect(x, y, x + 2, y + 2, s); R.rect(x, y - 1, x + 2, y, p); if (hh(x, fila, 3) > 0.85) { R.pset(x + 1, y - 2, hex('#e8c840')); R.pset(x - 1, y - 2, hex('#e8c840')); } } }
  for (const y of [60, 84]) { R.linea(0, y + 5, 319, y + 5, hex('#8a8ea0')); R.linea(0, y + 6, 319, y + 6, hex('#3a3e4a')); for (let x = 4; x < 320; x += 16) R.linea(x, y + 6, x, y + 10, hex('#5a5e6a')); }
  // las salidas (rectángulos verdes con su flecha) y dos banderolas con pictogramas
  for (const x of [10, 296]) { R.rect(x, 30, x + 13, 36, hex('#1a1014')); R.rect(x + 1, 31, x + 12, 35, hex('#3ac85a')); R.linea(x + 3, 33, x + 9, 33, hex('#ffffff')); R.pset(x + 8, 32, hex('#ffffff')); R.pset(x + 8, 34, hex('#ffffff')); }
  for (const [x, c] of [[40, '#c8303a'], [272, '#2e7a3e']]) { R.rect(x, 26, x + 12, 62, hex('#1a1014')); R.rect(x + 1, 26, x + 11, 61, hex(c)); R.poligono([[x + 1, 61], [x + 6, 66], [x + 11, 61]], hex(c)); R.disco(x + 6, 40, 4, hex('#f2eee2')); R.disco(x + 6, 40, 2, hex(c)); }
  // el suelo del pasillo delante de la primera fila: moqueta con estampado y palomitas caídas
  for (let y = 159; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, ((x >> 2) + (y >> 1)) % 5 === 0 ? hex('#5a2a3a') : by(x, y) > 0.8 ? hex('#2a1420') : hex('#3a1a2a'));
  for (let k = 0; k < 26; k++) { const x = Math.round(hh(k, 41) * 316), y = 164 + Math.round(hh(k, 42) * 14); R.pset(x, y, hex('#fff4c8')); R.pset(x + 1, y, hex('#e8c870')); }
  R.usar(prev); return bf;
};
const GENTE = ['chico', 'fanCuernos', 'senora30', 'oficinista', 'turista', 'chica', 'sudadera', 'fanArana', 'abuela', 'fanCapa', 'nina'];
const FILAS = [{ suelo: 104, x0: -4, d: 23, n: 15 }, { suelo: 131, x0: 7, d: 23, n: 14 }, { suelo: 158, x0: -2, d: 24, n: 14 }];
const SENOR = [2, 6];   // fila y puesto del señor del refresco
const p3 = (t) => {
  if (!fondoP) fondoP = pintaFondoP(); R.copiar(fondoP);
  // los móviles de las gradas que titilan
  for (let k = 0; k < 30; k++) { const x = Math.round(hh(k, 51) * 318), y = 34 + Math.round(hh(k, 52) * 50); if (Math.sin(t * 3 + k * 1.7) > 0.2) R.pset(x, y, k % 3 ? hex('#e8f0ff') : hex('#8ad8ff')); }
  // los haces de los focos que barren la sala
  for (let k = 0; k < 4; k++) { const x0 = 50 + k * 74, ang = Math.sin(t * 0.7 + k * 1.3) * 0.5, col = hex(['#f8f0c0', '#8ad8ff', '#f8a0d0', '#c0f8a0'][k]);
    for (let y = 26; y < 164; y += 1) { const cx = x0 + Math.tan(ang) * (y - 26), w = 2 + (y - 26) * 0.12; for (let x = Math.round(cx - w); x <= cx + w; x++) if (by(x, y) < 0.12) R.pset(x, y, col); } }
  // el vaso de refresco (rojo y blanco, con tapa y pajita), de pie en (vx, vy); inc lo inclina; e: escala
  const vaso = (vx, vy, inc, e = 1) => { const k = hex('#1a1014'), P = (x, y, c) => R.rect(vx + x * e, vy + y * e, vx + x * e + e - 1, vy + y * e + e - 1, c);
    for (let j = 0; j < 9; j++) { const sx = Math.round(inc * (8 - j)), wj = j > 6 ? 3 : 2; P(sx - wj - 1, -j, k); P(sx + wj + 1, -j, k);
      for (let i = -wj; i <= wj; i++) P(sx + i, -j, j > 6 ? hex('#f2eee2') : i === wj ? hex('#9a1a20') : i === -wj ? hex('#f05a4a') : (j === 3 ? hex('#f2eee2') : hex('#d82a2a'))); }
    const tx = Math.round(inc * 8); for (let i = -4; i <= 4; i++) P(tx + i, -9, k); for (let q = 0; q < 5; q++) P(Math.round(tx + 1 + q * (0.4 + inc * 0.8)), -9 - q, q === 4 ? hex('#c83a3a') : hex('#f8f0f0')); };
  FILAS.forEach((F, fi) => {
    // los respaldos de la fila, por detrás de la gente
    R.rect(0, F.suelo - 24, 319, F.suelo - 20, hex('#1a1014')); for (let x = F.x0 - 3; x < 320; x += F.d) { R.rect(x, F.suelo - 23, x + F.d - 3, F.suelo - 12, hex('#7a1a2a')); R.rect(x + 1, F.suelo - 23, x + F.d - 4, F.suelo - 22, hex('#a8283a')); }
    for (let k = 0; k < F.n; k++) {
      const x = F.x0 + k * F.d, senor = fi === SENOR[0] && k === SENOR[1];
      const up = tramo(t, MISMO - 0.3 + k * 0.05 + fi * 0.12, MISMO + 0.1 + k * 0.05 + fi * 0.12), y = F.suelo + Math.round((1 - up) * 7);
      if (fi === SENOR[0] && Math.abs(k - SENOR[1]) === 1) continue;   // a su lado, dos asientos vacíos: el gag se ve solo
      if (senor) {
        const fo = 0.25 + 0.35 * tramo(t, ROBERT - 0.6, ROBERT); for (let yy = 26; yy < 180; yy++) { const cxx = x + 7 + (yy - 160) * 0.05, ww = 3 + (yy - 26) * 0.16; for (let xx = Math.round(cxx - ww); xx <= cxx + ww; xx++) if (by(xx, yy) < fo * 0.45) R.pset(xx, yy, hex('#fff0c0')); }
        const salta = tramo(t, ROBERT, ROBERT + 0.25) - tramo(t, ROBERT + 0.5, ROBERT + 0.8), suelta = t > ROBERT + 0.1;
        const se = R.actor(EL.senor30, x, y, t, { dir: 1, sorpresa: suelta && t < ROBERT + 1.6, sonrisa: !suelta || t > ROBERT + 1.6, brazos: suelta, salto: Math.round(salta * 7), sostiene: suelta ? false : [x + 20, y - 12] });
        if (!suelta) vaso(se.mano[0] - 1, se.mano[1] + 3, 0);
        else {
          const c = tramo(t, ROBERT + 0.1, ROBERT + 0.75), vx = Math.round(x + 19 + c * 20), vy = Math.round(lerp(y - 18, 176, c * c) - Math.sin(c * Math.PI) * 16);
          if (c < 1) { vaso(vx, vy, Math.min(1, c * 1.4), 2); for (let s2 = 1; s2 < 9; s2++) { const q = Math.max(0, c - s2 * 0.04), qx = Math.round(x + 19 + q * 20) + 10, qy = Math.round(lerp(y - 18, 176, q * q) - Math.sin(q * Math.PI) * 16) - 20 - s2; R.rect(qx, qy, qx + 1, qy + 1, s2 % 3 ? hex('#7a4a22') : hex('#e8f8ff')); } }
          else { const k = hex('#1a1014'); R.poligono([[vx - 8, 176], [vx + 14, 168], [vx + 20, 177], [vx - 4, 180]], k); R.poligono([[vx - 6, 176], [vx + 14, 170], [vx + 18, 176], [vx - 4, 179]], hex('#d82a2a')); R.linea(vx + 2, 174, vx + 14, 171, hex('#f2eee2')); R.linea(vx + 2, 175, vx + 14, 172, hex('#f2eee2'));
            const ch = tramo(t, ROBERT + 0.75, ROBERT + 1.1); for (let y2 = 170; y2 < 180; y2++) for (let x2 = vx - 40; x2 < vx + 50; x2++) { const d = Math.hypot((x2 - vx - 4) / (10 + ch * 30), (y2 - 177) / (2 + ch * 3)); if (d < 1) R.pset(x2, y2, d > 0.85 ? hex('#3a2010') : by(x2, y2) > 0.85 ? hex('#c8905a') : hex('#7a4a22')); }
            for (const [ix, iy] of [[-22, 173], [26, 174], [6, 171], [36, 176], [-8, 176]]) { R.rect(vx + ix - 1, iy - 1, vx + ix + 3, iy + 3, hex('#5a7a8a')); R.rect(vx + ix, iy, vx + ix + 2, iy + 2, hex('#c8e8f8')); R.pset(vx + ix, iy, hex('#ffffff')); } }
          const sp = tramo(t, ROBERT + 0.75, ROBERT + 1.5); if (sp > 0 && sp < 1) for (let k2 = 0; k2 < 16; k2++) { const dxs = (k2 - 7.5) * 2.2 * sp * 3, dys = -Math.sin(sp * Math.PI) * (8 + (k2 % 4) * 5); R.rect(Math.round(vx + 3 + dxs), Math.round(176 + dys), Math.round(vx + 4 + dxs), Math.round(177 + dys), k2 % 4 ? hex('#7a4a22') : hex('#e8f8ff')); }
        }
        continue;
      }
      const movil = (k + fi) % 4 === 1 && up > 0.9, brazos = up > 0.9 && !movil && Math.sin(t * 5 + k) > -0.2;
      const ac = R.actor(EL[GENTE[(k * 3 + fi * 5) % GENTE.length]], x, y, t, { dir: k % 2 ? -1 : 1, sorpresa: up > 0 && up < 0.9, sonrisa: up >= 0.9, habla: up >= 0.9 && Math.sin(t * 9 + k) > 0.3, brazos, sostiene: movil ? [x + (k % 2 ? -4 : 18), y - 30] : false, salto: up >= 1 && (k + fi) % 3 === 0 ? Math.round(Math.abs(Math.sin(t * 6 + k)) * 3) : 0 });
      if (movil) { const [mx, my] = ac.mano; R.rect(mx - 1, my - 5, mx + 2, my, hex('#1a1014')); R.rect(mx, my - 4, mx + 1, my - 1, hex('#8ad8ff')); if (Math.floor(t * 3 + k) % 4 === 0) R.disco(mx, my - 3, 2, hex('#ffffff')); }
    }
    // los asientos de la fila, por delante de las piernas
    R.rect(0, F.suelo - 7, 319, F.suelo + 1, hex('#1a1014'));
    for (let x = F.x0 - 3; x < 320; x += F.d) { R.rect(x, F.suelo - 6, x + F.d - 3, F.suelo, hex('#a8283a')); R.rect(x, F.suelo - 6, x + F.d - 3, F.suelo - 5, hex('#d84a5a')); R.rect(x, F.suelo, x + F.d - 3, F.suelo, hex('#6a1a28')); R.rect(x + F.d - 2, F.suelo - 9, x + F.d - 1, F.suelo + 1, hex('#3a3a46')); R.pset(x + F.d - 2, F.suelo - 9, hex('#8a8ea0')); }
  });
};

// ── 4 · Latveria: Iron Man vuelve como Doom ──
const p4 = (t) => {
  const tr = tramo(t, VUELVE, DOOM + 0.2), doom = t > DOOM, oscuro = tramo(t, DIA, DIA + 0.6);
  T.latveria(R, t, {});
  // en «Doomsday» llega la tormenta: nubes oscuras de tres tonos que bajan y un velo verdoso
  if (oscuro > 0) { T.tinte(R, 0, 100, [30, 40, 50], 0.28 * oscuro);
    for (let k = 0; k < 9; k++) { const x = ((k * 41 + t * (5 + k % 3 * 3)) % 380) - 30, y = Math.round(-24 + oscuro * (34 + (k % 3) * 12)); humo(x, y, 9 + (k % 3) * 3, hex('#6a7480'), hex('#4a5260'), hex('#2a3038')); } }
  const w = tramo(t, P4 + 0.1, P4 + 1.6), x = Math.round(lerp(96, 152, w));
  // los vecinos: una señora con la cesta y un chico; se asustan y el chico huye
  const sx = 214, se = R.actor(EL.senora30, sx, 160, t, { dir: -1, sostiene: true, sorpresa: doom });
  { const [mx, my] = se.mano; R.rect(mx - 3, my - 1, mx + 3, my + 3, hex('#1a1014')); R.rect(mx - 2, my, mx + 2, my + 2, hex('#a87a3a')); R.pset(mx - 1, my - 1, hex('#e83a3a')); R.pset(mx + 1, my - 1, hex('#f8d040')); }
  const hu = tramo(t, DOOM + 0.5, DOOM + 2.2), chx = Math.round(lerp(248, 330, hu));
  R.actor(EL.chico, chx, 162, t, { dir: hu > 0 ? 1 : -1, anda: hu > 0 && hu < 1, sorpresa: doom, sonrisa: !doom });
  if (!doom) R.actor(EL.ironman, x, 160, t, { dir: 1, anda: w > 0 && w < 1 });
  else R.actor(EL.doom, x, 160, t, { dir: 1, brazos: t > VILLANO, enfado: true });
  // el remolino verde de la transformación
  if (tr > 0 && tr < 1) for (let k = 0; k < 18; k++) { const ang = k * 0.35 + t * 9, r = 14 - tr * 4, y = 158 - ((k * 3 + t * 40) % 30); R.pset(Math.round(x + 7 + Math.cos(ang) * r), Math.round(y), k % 3 ? hex('#5ae87a') : hex('#d0ffd8')); }
  const fl = tramo(t, DOOM, DOOM + 0.5); if (fl > 0 && fl < 1) for (let y = 120; y < 170; y++) for (let xx = x - 20; xx < x + 36; xx++) { const d = Math.hypot(xx - x - 7, y - 145) / 26; if (d < 1 && by(xx, y) < (1 - d) * (1 - fl) * 1.6) R.pset(xx, y, hex('#d0ffd8')); }
  // los rayos verdes de las manos en «the villain»
  if (t > VILLANO + 0.2) for (const lado of [-1, 1]) { if (Math.floor(t * 12 + lado) % 3 === 0) continue; let lx = x + 7 + lado * 8, ly = 128;
    for (let s = 0; s < 7; s++) { const nx = lx + lado * 2 + Math.round((hh(s, Math.floor(t * 12), lado + 2) - 0.5) * 6), ny = ly - 4; R.linea(lx, ly, nx, ny, s % 2 ? hex('#5ae87a') : hex('#d0ffd8')); lx = nx; ly = ny; } }
  // las palomas de la plaza salen volando
  for (let k = 0; k < 5; k++) { const u = tramo(t, DOOM + k * 0.08, DOOM + 1.8 + k * 0.1), px = Math.round(120 + k * 14 + u * (60 + k * 10)), py = Math.round(166 - u * (90 + k * 8)), al = u > 0 && Math.sin(t * 22 + k) > 0;
    R.pset(px, py, hex('#7a7a8a')); R.pset(px + 1, py, hex('#9a9aaa')); R.pset(px - 1, py - (al ? 1 : 0), hex('#5a5a6a')); R.pset(px + 2, py - (al ? 1 : 0), hex('#5a5a6a')); if (u === 0) R.pset(px, py + 1, hex('#e8a030')); }
  // el relámpago de «Doomsday»
  const rl = tramo(t, DIA, DIA + 0.35); if (rl > 0 && rl < 1 && Math.floor(t * 20) % 2) { let lx = 250, ly = 0; for (let s = 0; s < 9; s++) { const nx = lx + Math.round((hh(s, 77) - 0.5) * 14), ny = ly + 9; R.linea(lx, ly, nx, ny, hex('#ffffff')); R.linea(lx + 1, ly, nx + 1, ny, hex('#d0ffd8')); lx = nx; ly = ny; } }
};

// ── 5 · tres Tierras y el 18 de diciembre ──
const p5 = (t) => {
  const g = T.cosmos(R, t, { encuadre: 'espacio', camara: 'choque', choque: 0.08 + 0.04 * Math.sin(t * 0.8), numeros: [616, 828] });
  // la tercera Tierra (10005, ocre y apagada) arriba en el centro, con su placa
  const cx = 160, cy = 46, r = 14;
  for (let y = cy - r - 2; y <= cy + r + 2; y++) for (let x = cx - r - 2; x <= cx + r + 2; x++) { const d = Math.hypot(x - cx, y - cy);
    if (d > r + 1.5) continue; if (d > r) { if (by(x, y) < 0.4) R.pset(x, y, hex('#c8a070')); continue; }
    const n = R.vnoise((x + t * 2) * 0.22, y * 0.22) * 0.7 + hh(x, y, 3) * 0.3, sombra = (x - cx) / r + (y - cy) / r * 0.3 > 0.45;
    R.pset(x, y, sombra ? (n > 0.5 ? hex('#6a4a2a') : hex('#4a3a3a')) : n > 0.55 ? hex('#c8904a') : n > 0.3 ? hex('#a87040') : hex('#7a6a7a')); }
  for (let k = 0; k < 6; k++) { const u = ((t * 0.3 + k / 6) % 1), px = Math.round(cx + r + u * 26), py = Math.round(cy - 4 + k * 2 + u * 6); if (by(px, py) < 1 - u) R.pset(px, py, hex('#c8a070')); }
  R.rect(cx - 17, cy + r + 4, cx + 17, cy + r + 13, hex('#1a1014')); R.rect(cx - 16, cy + r + 5, cx + 16, cy + r + 12, hex('#2a2440')); R.numero('10005', cx, cy + r + 12, { centro: true });
  // las tres se iluminan a su turno en «three different universes»
  const luces = [[g.planetas[0].x, g.planetas[0].y, g.planetas[0].r], [cx, cy, r], [g.planetas[1].x, g.planetas[1].y, g.planetas[1].r]];
  luces.forEach(([px, py, pr], k) => { const f = tramo(t, TRES + k * 0.25, TRES + k * 0.25 + 0.7); if (f > 0 && f < 1) { const g2 = k === 1 ? 0.5 : 1; R.anillo(px, py, pr + 2 + f * 8 * g2, hex('#fff0a0')); R.anillo(px, py, pr + 4 + f * 10 * g2, hex('#f8c040'), 3); } });
  // la hoja del calendario: el 12 arriba y el 18 dorado enorme, que cae y rebota
  const c = tramo(t, DICIEMBRE, DIECIOCHO + 0.1), bote = c >= 1 ? Math.round(Math.abs(Math.sin((t - DIECIOCHO - 0.1) * 9)) * 6 * Math.max(0, 1 - (t - DIECIOCHO - 0.1) * 1.4)) : 0;
  if (c > 0) { const y0 = Math.round(lerp(-70, 82, c * c)) - bote, x0 = 128;
    R.rect(x0 - 1, y0 - 1, x0 + 65, y0 + 57, hex('#1a1014')); R.rect(x0, y0, x0 + 64, y0 + 56, hex('#f6f2ea')); R.rect(x0, y0, x0 + 64, y0 + 13, hex('#c8303a')); R.rect(x0, y0 + 13, x0 + 64, y0 + 13, hex('#8a1e28'));
    for (const rx of [x0 + 14, x0 + 50]) { R.rect(rx - 1, y0 - 4, rx + 1, y0 + 2, hex('#1a1014')); R.pset(rx, y0 - 3, hex('#c0c4d4')); }
    R.numero('12', x0 + 32, y0 + 11, { centro: true, rampa: [hex('#ffffff'), hex('#ffffff'), hex('#f2eee2'), hex('#f2eee2')] });
    R.numero('18', x0 + 33, y0 + 50, { tam: 32, centro: true });
    for (let y = y0 + 52; y < y0 + 56; y++) for (let x = x0 + 1; x < x0 + 64; x++) if (by(x, y) < 0.3) R.pset(x, y, hex('#d8d0c4'));
    if (c >= 1 && Math.sin(t * 5) > 0.3) { const sx = x0 + 56, sy = y0 + 22; R.pset(sx, sy, hex('#ffffff')); R.pset(sx - 1, sy, hex('#fff0a0')); R.pset(sx + 1, sy, hex('#fff0a0')); R.pset(sx, sy - 1, hex('#fff0a0')); R.pset(sx, sy + 1, hex('#fff0a0')); } }
  // los héroes de los tres mundos llegan al risco y miran arriba
  [[EL.thor, 6], [EL.reed, 36], [EL.lobezno, 66]].forEach(([d, x1], k) => { const u = tramo(t, HEROES - 0.3 + k * 0.25, HEROES + 0.9 + k * 0.25), x = Math.round(lerp(-22 - k * 12, x1, u));
    const ac = R.actor(d, x, 162, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: u >= 1 && t < TRES + 0.8, sonrisa: t > TRES + 0.8, sostiene: d === EL.thor ? true : false });
    if (d === EL.thor) T.PIEZAS_DO.martillo(R, ac.mano[0], ac.mano[1] + 2, {}); });
};
const año = (t) => t < P4 ? 2024 : 2026;
const efectos = [[0.6, 'publico'], [DIEGO + 0.4, 'whoosh'], [QUITA + 0.15, 'flash'], [QUITA + 0.5, 'publico'], [MISMO + 0.2, 'palmada'], [ROBERT + 0.65, 'chof'], [DOOM, 'brillo'], [DIA, 'trueno'], [DIECIOCHO + 0.1, 'golpecito'], [TRES, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')

E['do-hola'] = ('Hola', '''// DO-HOLA (frases 5–6), hoy (2026). Tres planos:
// 1. «So how did we get here? Which universes…»: el cuarto del fan de noche; el cubo de palomitas, sentado en el
//    escritorio, mira el mapa de la pared, donde crecen las ramas y salen las Tierras con número; en «Which universes»
//    lo señala; el fan entra con su vaso, mira el mapa y se rasca la cabeza («?»); corta en «And what»;
// 2. el mapa de cerca: las palomitas, de pie delante, señalan las Tierras y cuentan con los dedos lo que hay que saber
//    («what do you need to know… a thing»: 1, 2, 3, 4); en «I'm Atom» se vuelven hacia la esquina de Atom y lo saludan;
//    corta en «And I explain»;
// 3. la estantería de cerca: las palomitas pasan andando y señalan las cinco cajas de película una a una («the things
//    you've always wondered about»); en «Let's find out» se ponen las gafas de cine, dan un salto de emoción y saludan.''', PIEZAS + r'''
const a = (f) => en('como', f), b = (f) => en('hola', f);
const P2 = a(0.627), P3 = b(0.208);
const AQUI = a(0.117), CUALES = a(0.249), SOBRE = a(0.479), NECESITAS = a(0.702), SABER = a(0.783), NADA = a(0.884);
const ATOM = b(0), COSAS = b(0.377), SIEMPRE = b(0.482), DESCUBRIR = b(0.821);
const p1 = (t) => {
  const m = 0.18 + 0.32 * tramo(t, 0.2, P2), o = { encuadre: 'cuarto', mapa: m };
  const g = T.hoy(R, t, o);
  // el fan entra con su vaso y se para delante del mapa, extrañado
  const w = tramo(t, 0.3, AQUI + 1.0), x = Math.round(lerp(300, 222, w)), duda = t > CUALES - 0.1;
  const fan = R.actor(EL.fanCuernos, x, 166, t, { dir: -1, anda: w > 0 && w < 1, sostiene: duda ? false : true, dedo: duda && t < SOBRE, sorpresa: t > SOBRE });
  if (!duda) { const [mx, my] = fan.mano; R.rect(mx - 2, my - 5, mx + 2, my + 1, hex('#1a1014')); R.rect(mx - 1, my - 4, mx + 1, my, hex('#3a8ae8')); R.pset(mx - 1, my - 4, hex('#8ad8ff')); }
  else if (t < SOBRE + 0.8) { const ic = tramo(t, CUALES - 0.1, CUALES + 0.2); R.icono('?', x + 4, 128 - Math.round(ic * 6), hex('#f8d040'), hex('#1a1014'), 2); }
  T.hoyDelante(R, t, o);
  // las palomitas, sentadas en el escritorio: miran el mapa y lo señalan en «Which universes»
  const se = t > CUALES && t < SOBRE + 0.4;
  T.palomitas(R, 96, 136, t, { s: 1, dir: 1, señala: se ? [200, 60] : undefined, asiente: t > SOBRE + 0.4, expresion: t > SOBRE + 0.4 ? 'susto' : 'normal' });
};
const p2 = (t) => {
  const m = 0.5 + 0.34 * tramo(t, P2, ATOM), o = { encuadre: 'cuarto', camara: 'mapa', mapa: m };
  T.hoy(R, t, o);
  // las palomitas, de pie delante del mapa: señalan y cuentan; en «I'm Atom» se vuelven y saludan
  const cuenta = t < NECESITAS ? 1 : t < SABER ? 2 : t < NADA ? 3 : 4, vuelve = t > ATOM - 0.15;
  const w = tramo(t, P2, P2 + 0.8), x = Math.round(lerp(300, 276, w));
  T.palomitas(R, x, 176, t, { s: 2, dir: vuelve ? 1 : -1, anda: w > 0 && w < 1, cuenta: !vuelve && t > P2 + 0.5 && t < NADA + 0.7 ? cuenta : undefined, señala: !vuelve && t > NADA + 0.7 ? [150, 70] : undefined, saluda: vuelve, expresion: vuelve ? 'emocion' : 'normal' });
};
const p3 = (t) => {
  const o = { encuadre: 'cuarto', camara: 'estanteria' }, g = T.hoy(R, t, o);
  const w = tramo(t, P3 + 0.1, DESCUBRIR - 0.4), x = Math.round(lerp(34, 206, w));
  // la caja que tiene delante, a la que señala
  const cajas = g.cajas ?? [62, 100, 138, 176, 214].map((cx) => [cx, 74]);
  let objetivo; for (const c of cajas) if (Math.abs(c[0] - x) < 22) objetivo = [c[0], c[1]];
  const salta = tramo(t, DESCUBRIR, DESCUBRIR + 0.3) - tramo(t, DESCUBRIR + 0.6, DESCUBRIR + 0.9);
  T.palomitas(R, x, 172, t, { s: 2, dir: 1, anda: w > 0 && w < 1, señala: w > 0 && w < 1 ? objetivo : undefined, gafas: t > DESCUBRIR - 0.2 ? '3d' : false, salta: salta, expresion: t > DESCUBRIR - 0.2 ? 'emocion' : 'normal', saluda: t > DESCUBRIR + 1 });
  // la caja señalada brilla
  if (objetivo && w > 0 && w < 1) { const [cx, cy] = objetivo; R.anillo(cx, cy, 20 + Math.round(Math.sin(t * 8)), hex('#f8d040'), 3); }
};
const año = 2026;
const efectos = [[0.4, 'toc'], [CUALES, 'pop'], [NECESITAS, 'tic'], [NADA, 'tic'], [ATOM + 0.1, 'boing'], [COSAS, 'whoosh'], [DESCUBRIR, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')
