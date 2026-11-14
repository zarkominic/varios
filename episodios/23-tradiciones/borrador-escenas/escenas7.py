E = {}

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['tr-derechos'] = ('Los derechos', '''// TR-DERECHOS (frase 20), de 1960 a 2016, sin cartela. Cuatro planos:
// 1. (0 → «a music company») el decorado de 1746 convertido en plató de cine: la claqueta (en el golpe), la cantante
//    canta al pastel, la cámara rueda; en «cost money» el director salta y corta con el megáfono (X); en «1988» entra el
//    de la disquera con la factura;
// 2. («a music company» → «it collected») el despacho de la disquera en Los Ángeles, 1988: firma en «bought», el editor le
//    pasa la partitura en «rights», «$25,000,000» en «$25 million» y la partitura vuela a la caja fuerte, que se cierra;
// 3. («it collected» → «valid») el juzgado de 2015: los años corren de 1989 a 2014 y con cada uno cae una moneda en la caja
//    del monitor y crece la pila del «$2»; en «Until 2015» el juez levanta el mazo y golpea en «ruled»; en «weren't valid»
//    la X roja en el monitor, la pila se cae y la cantante y el director lo celebran;
// 4. («valid» → fin) la mesa del juez: mazo en «2016», el candado salta, la caja fuerte se abre y en «free» las notas salen
//    volando libres hacia arriba.''', r'''
const P2 = en('derechos', 0.203), P3 = en('derechos', 0.467), P4 = en('derechos', 0.783);
const CLAC = en('derechos', 0.005), CANTA = en('derechos', 0.039), CORTA = en('derechos', 0.083), A1988 = en('derechos', 0.143);
const FIRMA = en('derechos', 0.218), DERECHOS = en('derechos', 0.270), M25 = en('derechos', 0.366), GUARDA = en('derechos', 0.420);
const DOS = en('derechos', 0.506), HASTA = en('derechos', 0.610), A2015 = en('derechos', 0.638), JUEZ = en('derechos', 0.689), DICTA = en('derechos', 0.703), NOVALE = en('derechos', 0.768);
const A2016 = en('derechos', 0.828), CANCION = en('derechos', 0.875), LIBRE = en('derechos', 0.908);
const ABRE = A2016 + 0.6;
const K = T.C.k, PZ = T.PIEZAS_TR;
const hs = (x, y, k = 0) => { let n = (x * 374761393 + y * 668265263 + k * 1274126177) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const aclara = (x, y, a, c) => R.pset(x, y, mez(R.pget(x, y), c, a));
const umb = (x, y) => [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]][y & 3][x & 3] / 16;
const degr = (y0, y1, x0, x1, st) => { for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0); let k = 0; while (k < st.length - 2 && f > st[k + 1][0]) k++;
  const [f0, c0] = st[k], [f1, c1] = st[k + 1], u = Math.max(0, Math.min(1, (f - f0) / Math.max(1e-6, f1 - f0))); for (let x = x0; x <= x1; x++) R.pset(x, y, u > umb(x, y) ? c1 : c0); } };
const ORO = hex('#e8b830'), OROL = hex('#fff0a0'), OROS = hex('#a87a18'), BLANCO = hex('#f6f4ee'), ROJO = hex('#d8303a');
// una corchea con su contorno (7 × 9; s la escala)
const NOTA = ['...kk..', '...kOk.', '...kOOk', '...kOkk', '...kOk.', '.kkkOk.', 'kOOOOk.', 'kOLOOk.', '.kkkk..'];
const nota = (x, y, c, s = 1) => NOTA.forEach((f, j) => { for (let i = 0; i < 7; i++) { const ch = f[i]; if (ch === '.') continue; const col = ch === 'k' ? K : ch === 'L' ? BLANCO : c; R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, col); } });
const moneda = (x, y) => { R.disco(x, y, 3, K); R.disco(x, y, 2, ORO); R.pset(x - 1, y - 1, OROL); R.pset(x + 1, y + 1, OROS); };
// la partitura: hoja blanca con pentagramas y notas (sin letras)
const partitura = (x, y) => { R.rect(x - 6, y - 8, x + 6, y + 8, K); R.rect(x - 5, y - 7, x + 5, y + 7, BLANCO); R.rect(x + 3, y - 7, x + 5, y - 5, hex('#d8d4cc'));
  for (const yy of [y - 4, y + 2]) for (let l = 0; l < 3; l++) R.linea(x - 4, yy + l * 2, x + 4, yy + l * 2, hex('#8a8a90'));
  for (const [i, j] of [[-3, -3], [0, -1], [3, -3], [-2, 3], [2, 5]]) { R.pset(x + i, y + j, K); R.pset(x + i + 1, y + j, K); R.pset(x + i + 1, y + j - 1, K); R.pset(x + i + 1, y + j - 2, K); } };
// el mazo en la mano (cabeza de nogal con aros dorados y el mango)
const mazoMano = (hx, hy, alto, s = 1) => { const y = hy - (alto ? 6 : 4) * s, a = 6 * s, b = 3 * s; R.rect(hx - a, y - b, hx + a, y + b, K); R.rect(hx - a + 1, y - b + 1, hx + a - 1, y + b - 1, hex('#6a3a1e')); R.rect(hx - a + 1, y - b + 1, hx + a - 1, y - b + s, hex('#9a5e34')); R.rect(hx - a + 1, y + b - s, hx + a - 1, y + b - 1, hex('#46220e'));
  R.rect(hx - 3 * s, y - b + 1, hx - 3 * s + s - 1, y + b - 1, OROS); R.rect(hx + 3 * s, y - b + 1, hx + 3 * s + s - 1, y + b - 1, OROS); R.rect(hx - s, y + b, hx + s, hy + 2, K); R.rect(hx, y + b + 1, hx, hy + 1, hex('#8a5430')); };
// golpe del mazo: rayitas que salen del punto
const golpe = (x, y, u, g = 1) => { if (u <= 0 || u >= 1) return; const r0 = (5 + u * 6) * g, r1 = r0 + 5 * g; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + 0.3; if (Math.sin(a) > 0.3) continue; R.linea(Math.round(x + Math.cos(a) * r0), Math.round(y + Math.sin(a) * r0), Math.round(x + Math.cos(a) * r1), Math.round(y + Math.sin(a) * r1), u < 0.5 ? OROL : BLANCO); } };

// ── plano 1: el plató ─────────────────────────────────────────────────────────────────────────────────────────────
// la cámara de cine de 35 mm sobre su trípode con ruedas: dos bobinas que giran mientras rueda, el parasol y el piloto rojo
const camaraCine = (t, rueda) => {
  const g = hex('#3a3e4c'), gL = hex('#5a6072'), gS = hex('#262a34');
  for (const [x1, y1] of [[18, 177], [46, 178], [76, 176]]) { R.linea(46, 132, x1, y1, K); R.linea(47, 132, x1 + 1, y1, gL); R.disco(x1, y1 - 1, 2, K); }
  R.rect(40, 126, 54, 134, K); R.rect(41, 127, 53, 133, gS);
  R.rect(26, 104, 74, 128, K); R.rect(27, 105, 73, 127, g); R.rect(27, 105, 73, 107, gL); R.rect(27, 124, 73, 127, gS);
  for (let x = 30; x < 70; x += 4) R.pset(x, 116, gS);
  R.rect(74, 108, 86, 124, K); R.rect(75, 109, 85, 123, hex('#1c1c24')); R.rect(76, 111, 84, 112, gL);
  R.rect(86, 102, 94, 130, K); R.rect(87, 103, 93, 129, hex('#22222a')); R.disco(80, 116, 3, hex('#4a6a9a')); R.pset(79, 115, BLANCO);
  R.rect(14, 108, 26, 116, K); R.rect(15, 109, 25, 115, gS); R.disco(17, 112, 2, hex('#1c1c24'));
  for (const [cx, cy] of [[38, 94], [62, 94]]) { R.disco(cx, cy, 10, K); R.disco(cx, cy, 9, hex('#4a4e5c')); R.disco(cx, cy, 6, hex('#2a2a32')); R.disco(cx, cy, 2, gL);
    const a0 = rueda * 9; for (let k = 0; k < 3; k++) { const a = a0 + k * 2.094; R.linea(cx, cy, Math.round(cx + Math.cos(a) * 7), Math.round(cy + Math.sin(a) * 7), gL); } }
  R.linea(38, 104, 34, 106, K); R.linea(62, 104, 66, 106, K);
  if (rueda > 0 && Math.floor(t * 3) % 2 === 0) { R.disco(70, 101, 2, K); R.disco(70, 101, 1, ROJO); }
};
// la claqueta: pizarra negra con tiza y el palo de rayas que se cierra
const claqueta = (x, y, abre) => {
  R.rect(x, y, x + 16, y + 11, K); R.rect(x + 1, y + 1, x + 15, y + 10, hex('#24242c'));
  for (const yy of [y + 4, y + 7]) R.linea(x + 2, yy, x + 14, yy, hex('#b8b8c0')); R.numero('7', x + 4, y + 10, { color: BLANCO, sombra: false });
  const a = abre * 0.6, x1 = x + Math.round(Math.cos(-a) * 16), y1 = y - 1 + Math.round(Math.sin(-a) * 16);
  for (let k = 0; k <= 16; k++) { const px = Math.round(x + (x1 - x) * k / 16), py = Math.round(y - 1 + (y1 - y + 1) * k / 16); R.pset(px, py - 1, K); R.pset(px, py, Math.floor(k / 3) % 2 ? BLANCO : K); R.pset(px, py + 1, K); }
};
// foco de rodaje sobre su pie, con la luz que cae sobre el plató
const foco = (x, t, haz) => {
  R.linea(x, 176, x, 76, K); R.linea(x + 1, 176, x + 1, 76, hex('#6a6e7c'));
  for (const d of [-10, 10]) { R.linea(x, 160, x + d, 177, K); } R.rect(x - 4, 172, x + 4, 176, hex('#5a4a2a'));
  R.rect(x - 9, 62, x + 7, 76, K); R.rect(x - 8, 63, x + 6, 75, hex('#2a2a32')); R.rect(x - 11, 64, x - 9, 74, K); R.rect(x - 10, 65, x - 9, 73, hex('#fff4c8'));
  for (let k = 0; k < 4; k++) R.pset(x - 4 + k * 3, 63, hex('#4a4a56'));
  if (haz) for (let y = 66; y < 150; y += 1) for (let i = 0; i < 1 + (y - 66) * 0.7; i++) { const px = Math.round(x - 12 - (y - 66) * 0.9 - i); if (((px + y) & 1) === 0 && px > 100) aclara(px, y, 0.1, hex('#fff2c0')); }
};
const p1 = (t) => {
  T.fiestas(R, t, { encuadre: 'salon1746', camara: 'general' });
  const corto = t >= CORTA, rueda = t > CLAC && t < CORTA + 0.3 ? t - CLAC : 0;
  T.fiestasDelante(R, t, { encuadre: 'salon1746', camara: 'general' });
  R.actor(EL.cantante, 92, 166, t, { dir: 1, habla: t > CANTA && t < CORTA && Math.sin(t * 9) > -0.3, sonrisa: t < CORTA, sorpresa: corto && t < CORTA + 0.9, triste: t > CORTA + 0.9 });
  R.actor(EL.nino62, 214, 166, t, { dir: -1, brazos: t > CANTA + 0.3 && t < CORTA && Math.sin(t * 7) > 0, sonrisa: t < CORTA, sorpresa: corto && t < A1988, triste: t >= A1988 });
  // las notas que salen de la cantante; con el corte se caen y se apagan
  for (let k = 0; k < 4; k++) { const b = CANTA + k * 0.32; if (t < b) continue; const u = (t - b) / 1.4; if (u > 1 && t < CORTA) continue;
    let x = 108 + u * 30 + Math.sin(u * 7 + k) * 4, y = 138 - u * 60; if (t > CORTA) { const c = t - CORTA; if (c > 0.7) continue; const u0 = Math.min(1, (CORTA - b) / 1.4); x = 108 + u0 * 30; y = 138 - u0 * 60 + c * c * 160; }
    if (y < 180) nota(Math.round(x), Math.round(y), [ORO, hex('#f0a0b8'), hex('#7ac8e8'), OROL][k], 2); }
  // la pértiga del sonido con el micrófono sobre la cantante
  { const m = Math.sin(t * 1.3) * 2; R.linea(319, 70, 112, 104 + m, K); R.linea(319, 71, 112, 105 + m, hex('#8a8e9c')); R.rect(102, 102 + m, 114, 110 + m, K); R.rect(103, 103 + m, 113, 109 + m, hex('#8a8a92')); for (let i = 104; i < 113; i += 2) R.pset(i, 104 + m + (i % 4 ? 1 : 3), hex('#5a5a62')); }
  foco(300, t, t > 0.2);
  // el director con el megáfono y su silla de lona
  { const sx = 266, y = 168; R.linea(sx, y, sx + 18, y - 16, K); R.linea(sx + 18, y, sx, y - 16, K); R.rect(sx - 1, y - 17, sx + 19, y - 15, K); R.rect(sx, y - 16, sx + 18, y - 16, hex('#a83a3a'));
    R.rect(sx + 1, y - 30, sx + 17, y - 22, K); R.rect(sx + 2, y - 29, sx + 16, y - 23, hex('#a83a3a')); R.linea(sx + 1, y - 30, sx + 1, y - 16, hex('#8a5a2a')); R.linea(sx + 17, y - 30, sx + 17, y - 16, hex('#8a5a2a')); }
  const salta = t > CORTA - 0.1 && t < CORTA + 0.45 ? Math.round(Math.sin((t - CORTA + 0.1) / 0.55 * Math.PI) * 4) : 0;
  const mira = t > A1988 + 0.5 ? 1 : -1, arriba = t > CORTA - 0.15 && t < A1988;
  const dr = R.actor(EL.directorCine, 246, 168, t, { dir: mira, salto: salta, enfado: corto && t < A1988 + 0.5, triste: t > A1988 + 0.9, sostiene: mira < 0 ? (arriba ? [234, 136] : [240, 152]) : [270, 152] });
  { const [hx, hy] = dr.mano, d = mira; R.poligono([[hx, hy - 2], [hx - 9 * d, hy - 5], [hx - 9 * d, hy + 4], [hx, hy + 1]], K); R.poligono([[hx, hy - 1], [hx - 8 * d, hy - 4], [hx - 8 * d, hy + 3], [hx, hy]], hex('#e8e0d0')); R.linea(hx - 8 * d, hy - 4, hx - 8 * d, hy + 3, hex('#c83a3a')); }
  if (corto && t < A1988 + 0.2) { const by = 112 - salta; R.rect(222, by, 244, by + 20, K); R.rect(223, by + 1, 243, by + 19, BLANCO); R.poligono([[236, by + 20], [242, by + 26], [240, by + 20]], K);
    for (let k = -1; k <= 1; k++) { R.linea(227 + k, by + 4, 239 + k, by + 16, ROJO); R.linea(239 + k, by + 4, 227 + k, by + 16, ROJO); }
    for (let k = 0; k < 3; k++) { const u = ((t - CORTA) * 3 + k / 3) % 1; R.linea(216 - Math.round(u * 10), 132 - k * 5, 210 - Math.round(u * 10), 132 - k * 5, BLANCO); } }
  // el de la disquera entra con la factura
  { const u = tramo(t, A1988 - 0.1, A1988 + 0.9), x = Math.round(lerp(334, 292, u)); if (u > 0) { const d = R.actor(EL.disquera, x, 174, t, { dir: -1, anda: u < 1, sonrisa: u >= 1, sostiene: [x - 4, 156] });
    const [hx, hy] = d.mano; R.rect(hx - 5, hy - 9, hx + 2, hy + 1, K); R.rect(hx - 4, hy - 8, hx + 1, hy, BLANCO); for (let j = hy - 6; j < hy; j += 2) R.linea(hx - 3, j, hx, j, hex('#8a8a90')); R.pset(hx - 3, hy - 1, ROJO);
    if (t > A1988 + 0.6) R.bocadillo(x + 7, 142, { icono: 'factura' }); } }
  // el operador detrás de la cámara y la claqueta que se cierra en el golpe
  R.actor(EL.tecnico, 2, 172, t, { dir: 1, sorpresa: corto && t < CORTA + 0.8 });
  camaraCine(t, rueda);
  { const u = tramo(t, CLAC + 0.35, CLAC + 1.6), x = Math.round(lerp(132, 330, u)); if (u < 1) { const d = R.actor(EL.tecnica, x, 180, t, { dir: u > 0 ? 1 : -1, anda: u > 0, sostiene: u > 0 ? [x + 18, 160] : [x - 4, 150] });
    if (u === 0) claqueta(d.mano[0] - 16, d.mano[1] - 8, t < CLAC - 0.15 ? 1 : tramo(t, CLAC, CLAC - 0.15)); } }
  // los cables por el suelo y las marcas de cinta
  R.linea(94, 178, 150, 172, K); R.linea(150, 172, 232, 176, K);
  for (const x of [120, 186]) { R.rect(x, 163, x + 8, 163, hex('#e8c840')); R.rect(x + 4, 163, x + 4, 166, hex('#e8c840')); }
};

// ── plano 2: el despacho de la disquera, Los Ángeles 1988 ──────────────────────────────────────────────────────
const DS = { nogal: hex('#6a3e22'), nogalL: hex('#8a5430'), nogalS: hex('#4e2c16'), nogalD: hex('#341a0c'), yeso: hex('#e8dcc4'), yesoS: hex('#d4c6aa'),
  alf: hex('#6a1e2a'), alfS: hex('#4e1420'), alfL: hex('#86303a'), caoba: hex('#6a2a1a'), caobaL: hex('#8e3e26'), caobaS: hex('#4a1c10'), marco: hex('#e8e4dc'), marcoS: hex('#b8b0a4') };
let FONDO2 = null;
const pintaDespacho = () => {
  // arriba, el friso de yeso liso (la barra del año y Atom quedan tranquilos); abajo, la boiserie de nogal con sus vetas
  degr(0, 50, 0, 319, [[0, DS.yesoS], [0.4, DS.yeso], [1, DS.yeso]]);
  R.rect(0, 0, 319, 3, hex('#f4ecdc')); R.rect(0, 4, 319, 4, DS.yesoS); for (let x = 0; x < 320; x += 4) { R.rect(x, 5, x + 1, 7, hex('#f4ecdc')); R.pset(x + 2, 7, DS.yesoS); } R.rect(0, 8, 319, 8, DS.yesoS);
  for (let y = 9; y < 48; y++) for (let x = 0; x < 320; x++) if (hs(x, y, 41) < 0.03) R.pset(x, y, DS.yesoS);
  for (let y = 51; y < 130; y++) for (let x = 0; x < 320; x++) {
    const tabla = Math.floor(x / 18), bx = x % 18, veta = Math.sin(y * 0.11 + tabla * 2.1 + Math.sin(x * 0.6 + tabla) * 1.6);
    let c = veta > 0.8 ? DS.nogalS : hs(x, y, tabla) < 0.04 ? DS.nogalL : DS.nogal; if (bx === 0) c = DS.nogalD; else if (bx === 1) c = DS.nogalL; R.pset(x, y, c); }
  R.rect(0, 48, 319, 50, K); R.rect(0, 49, 319, 49, DS.nogalL); R.rect(0, 51, 319, 52, DS.nogalD);
  // la ventana a Los Ángeles: cielo tramado, las colinas, los rascacielos de 1988 y las palmeras; la persiana arriba
  R.rect(8, 16, 112, 98, K); R.rect(9, 17, 111, 97, DS.marco); R.rect(12, 20, 108, 94, K);
  degr(21, 74, 13, 107, [[0, hex('#5a9ad8')], [0.55, hex('#8cc0ec')], [1, hex('#e6eef0')]]);
  for (let x = 13; x <= 107; x++) { const yA = Math.round(62 + Math.sin(x * 0.09) * 3 + Math.sin(x * 0.23 + 1) * 1.5); for (let y = yA; y <= 93; y++) R.pset(x, y, y < yA + 2 ? hex('#9a9a7a') : ((x * 3 + y) % 7 === 0 ? hex('#6a7a4a') : hex('#8a8a62'))); }
  for (const [a, b, top, c] of [[16, 24, 58, '#7a8aa8'], [26, 34, 44, '#6a7a98'], [36, 42, 52, '#8a9ab4'], [46, 56, 36, '#5a6a8a'], [58, 64, 48, '#7a8aa8'], [68, 78, 40, '#6a7a98'], [80, 86, 54, '#8a9ab4'], [90, 100, 46, '#5a6a8a'], [102, 107, 60, '#7a8aa8']]) {
    R.rect(a, top, b, 86, K); R.rect(a + 1, top + 1, b - 1, 86, hex(c)); R.rect(b - 2, top + 1, b - 1, 86, mez(hex(c), K, 0.3));
    for (let y = top + 3; y < 85; y += 3) for (let x = a + 2; x < b - 2; x += 2) R.pset(x, y, (x + y) % 5 ? hex('#c8d8e8') : hex('#f0e0a0')); }
  R.rect(13, 86, 107, 93, hex('#8a8478')); for (let x = 14; x < 107; x += 6) R.rect(x, 89, x + 2, 89, hex('#e8e0c0'));
  for (const px of [30, 94]) { for (let y = 93; y > 58; y--) R.pset(px + Math.round((93 - y) * 0.05), y, y % 3 ? hex('#6a5a3a') : hex('#4a3a24'));
    for (let f = 0; f < 7; f++) { const a = f / 7 * Math.PI * 2; for (let s = 1; s < 9; s++) R.pset(Math.round(px + 2 + Math.cos(a) * s), Math.round(58 + Math.sin(a) * s * 0.5 + s * 0.25), s > 6 ? hex('#2a5a2a') : hex('#3a7a3a')); } }
  for (let y = 21; y <= 32; y++) R.linea(13, y, 107, y, y % 2 ? hex('#f0ece4') : hex('#c8c0b4')); R.linea(13, 33, 107, 33, K); R.linea(60, 21, 60, 33, hex('#8a8478'));
  R.rect(59, 20, 61, 94, DS.marco); R.rect(12, 56, 108, 58, DS.marco); R.linea(59, 20, 59, 94, DS.marcoS); R.linea(12, 58, 108, 58, DS.marcoS);
  R.rect(4, 96, 116, 101, K); R.rect(5, 97, 115, 99, DS.marco); R.rect(5, 100, 115, 100, DS.marcoS);
  // los tres discos de oro enmarcados (sin letras) sobre la boiserie
  for (const x0 of [124, 166, 208]) { R.rect(x0, 20, x0 + 34, 64, K); R.rect(x0 + 1, 21, x0 + 33, 63, hex('#c8a040')); R.rect(x0 + 1, 21, x0 + 33, 21, OROL);
    R.rect(x0 + 3, 23, x0 + 31, 61, hex('#1a1e3a')); const cx = x0 + 17, cy = 39; R.disco(cx, cy, 11, K); R.disco(cx, cy, 10, ORO); R.anillo(cx, cy, 8, OROS); R.anillo(cx, cy, 6, OROS);
    R.disco(cx, cy, 3, ROJO); R.pset(cx, cy, K); for (const [i, j] of [[-6, -5], [-5, -6], [-7, -3]]) R.pset(cx + i, cy + j, OROL);
    R.rect(x0 + 9, 53, x0 + 25, 58, K); R.rect(x0 + 10, 54, x0 + 24, 57, ORO); R.rect(x0 + 10, 54, x0 + 24, 54, OROL);
    for (let y = 65; y < 69; y++) for (let x = x0 + 2; x < x0 + 34; x++) if ((x + y) % 2 === 0) aclara(x, y, 0.25, K);
    R.rect(x0 + 10, 14, x0 + 24, 17, K); R.rect(x0 + 11, 15, x0 + 23, 16, OROS); R.linea(x0 + 17, 17, x0 + 17, 20, K);
    for (let y = 18; y < 40; y++) for (let x = x0 + 9 - (y - 18) * 0.3; x < x0 + 25 + (y - 18) * 0.3; x++) if ((Math.round(x) + y) % 2 === 0 && R.pget(Math.round(x), y) !== K) aclara(Math.round(x), y, 0.12, hex('#fff2c0')); }
  // el cuadro abstracto a la derecha (lejos de Atom)
  R.rect(246, 58, 274, 90, K); R.rect(247, 59, 273, 89, hex('#f2eee2')); R.disco(256, 70, 6, hex('#d8603a')); R.rect(262, 66, 270, 84, hex('#3a6ab0')); R.linea(249, 86, 271, 62, K);
  // el aparador con el tocadiscos, la pletina y los altavoces
  R.rect(120, 98, 244, 132, K); R.rect(121, 99, 243, 101, DS.caobaL); R.rect(121, 102, 243, 131, DS.caoba);
  for (let k = 0; k < 4; k++) { const a = 123 + k * 30; R.rect(a, 105, a + 27, 129, DS.caobaS); R.rect(a + 1, 106, a + 26, 128, DS.caoba); R.rect(a + 1, 106, a + 26, 106, DS.caobaL); R.rect(a + 12, 115, a + 14, 117, ORO); }
  R.rect(124, 88, 160, 98, K); R.rect(125, 89, 159, 97, hex('#2a2a32')); R.rect(125, 89, 159, 89, hex('#5a5a66'));
  R.rect(164, 86, 198, 98, K); R.rect(165, 87, 197, 97, hex('#3a3a46')); R.rect(167, 89, 181, 94, hex('#1a1a22')); R.rect(184, 89, 195, 91, hex('#c8c8d0'));
  for (const x0 of [202, 224]) { R.rect(x0, 72, x0 + 18, 98, K); R.rect(x0 + 1, 73, x0 + 17, 97, hex('#2a2018')); R.disco(x0 + 9, 80, 4, hex('#4a3a2a')); R.disco(x0 + 9, 90, 6, hex('#4a3a2a')); R.disco(x0 + 9, 90, 2, hex('#1a120c')); }
  for (let k = 0; k < 4; k++) { R.rect(244 - k * 3, 84 + k, 244 - k * 3 + 1, 98, K); }
  // la moqueta granate con su dibujo de rombos y la luz de la ventana
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const d = ((x + y * 2) % 24 === 0) || ((x - y * 2 + 960) % 24 === 0); let c = d ? DS.alfS : hs(x, y, 7) < 0.08 ? DS.alfL : DS.alf;
    const luz = x > 10 + (y - 132) * 0.6 && x < 110 + (y - 132) * 0.6; if (luz && (x + y) % 2 === 0) c = mez(c, hex('#ffd8a0'), 0.25); R.pset(x, y, c); }
  R.rect(0, 130, 319, 132, DS.nogalD); R.rect(0, 129, 319, 129, DS.nogalL);
  // la maceta alta con el ficus a la derecha
  R.rect(302, 140, 318, 164, K); R.rect(303, 141, 317, 163, hex('#c8b89a')); R.rect(303, 141, 317, 143, hex('#e8dcc4'));
  R.linea(310, 140, 309, 76, hex('#5a4028'));
  for (let k = 0; k < 26; k++) { const a = hs(k, 1, 31) * 6.28, r = 4 + hs(k, 2, 31) * 22, x = Math.round(310 + Math.cos(a) * r * 0.5), y = Math.round(100 + Math.sin(a) * r * 0.9); if (y < 60) continue; R.disco(x, y, 3, K); R.disco(x, y, 2, k % 3 ? hex('#3a7a3a') : hex('#5a9a4a')); }
};
// la mesa del ejecutivo (delante): caoba con sus cajones, el flexo verde, los papeles, el péndulo de bolas, el fichero
// giratorio, el teléfono beis y la taza humeante
const escritorio = (t) => {
  R.rect(60, 134, 198, 179, K); R.rect(61, 135, 197, 137, DS.caobaL); R.rect(61, 138, 197, 140, DS.caoba); R.rect(64, 141, 194, 179, DS.caobaS);
  for (let y = 143; y < 180; y++) for (let x = 66; x < 193; x++) if (Math.sin(x * 0.14 + Math.sin(y * 0.3 + x * 0.01) * 1.4) > 0.86) R.pset(x, y, DS.caoba);
  for (const [a, b] of [[68, 104], [154, 190]]) for (const yy of [146, 158, 170]) { R.rect(a, yy, b, yy + 9, K); R.rect(a + 1, yy + 1, b - 1, yy + 8, DS.caoba); R.rect(a + 1, yy + 1, b - 1, yy + 1, DS.caobaL); R.rect((a + b) / 2 - 3, yy + 4, (a + b) / 2 + 3, yy + 5, ORO); }
  // el flexo verde y su luz
  R.rect(66, 131, 80, 134, K); R.rect(67, 132, 79, 133, ORO); R.linea(73, 131, 73, 121, K); R.rect(64, 116, 84, 122, K); R.rect(65, 117, 83, 121, hex('#2a7a4a')); R.rect(65, 117, 83, 117, hex('#5aaa7a'));
  for (let y = 123; y < 134; y++) for (let x = 66 - (y - 123); x < 84 + (y - 123); x++) if ((x + y) % 2 === 0) aclara(x, y, 0.18, hex('#fff2c0'));
  // los papeles del contrato
  R.rect(86, 129, 110, 134, K); R.rect(87, 130, 109, 133, BLANCO); R.rect(88, 129, 108, 129, hex('#e0dcd0')); for (let x = 89; x < 107; x += 3) R.pset(x, 131, hex('#8a8a90'));
  // el péndulo de bolas: las de los extremos se turnan
  { R.rect(118, 133, 144, 134, K); R.linea(119, 118, 119, 133, K); R.linea(143, 118, 143, 133, K); R.linea(119, 118, 143, 118, K);
    const f = Math.sin(t * 6), aI = f < 0 ? f * 0.7 : 0, aD = f > 0 ? f * 0.7 : 0;
    for (let k = 0; k < 5; k++) { let x = 123 + k * 4, y = 129; if (k === 0) { x = Math.round(123 + Math.sin(aI) * 9); y = Math.round(118 + Math.cos(aI) * 11); } if (k === 4) { x = Math.round(139 + Math.sin(aD) * 9); y = Math.round(118 + Math.cos(aD) * 11); }
      R.linea(k < 2 ? 119 + k * 4 : 119 + k * 4, 118, x, y, hex('#8a8a90')); R.disco(x, y, 2, K); R.disco(x, y, 1, hex('#c8ccd8')); R.pset(x - 1, y - 1, BLANCO); } }
  // el fichero giratorio
  R.rect(148, 122, 164, 134, K); R.rect(149, 131, 163, 133, hex('#3a3a44')); for (let k = 0; k < 6; k++) { const a = t * 1.5 + k; R.rect(150 + k * 2, 123 + Math.round(Math.sin(a) * 1), 151 + k * 2, 130, k % 2 ? BLANCO : hex('#e8e0c8')); }
  // el teléfono beis con su luz que parpadea y la taza con vapor
  R.rect(168, 126, 188, 134, K); R.rect(169, 127, 187, 133, hex('#d8ccb0')); R.rect(166, 121, 190, 125, K); R.rect(167, 122, 189, 124, hex('#e8dcc0'));
  for (let x = 172; x < 186; x += 3) R.pset(x, 130, hex('#8a8070')); if (Math.floor(t * 2.5) % 2) R.pset(186, 128, hex('#e84a3a'));
  R.rect(190, 127, 196, 134, K); R.rect(191, 128, 195, 133, BLANCO); R.pset(196, 130, K);
  for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; R.pset(Math.round(193 + Math.sin(u * 7 + k) * 1.5), Math.round(125 - u * 12), u < 0.6 ? hex('#e8e8f0') : hex('#c8c8d0')); }
};
const nubeVentana = (cx, cy, w) => { for (const [dx, dy, r, c] of [[0, 1, 0.32, '#a8c8e0'], [-0.3, 1, 0.24, '#a8c8e0'], [0.3, 1, 0.26, '#a8c8e0'], [0, 0, 0.32, '#d8eaf6'], [-0.3, 0, 0.24, '#d8eaf6'], [0.28, 0, 0.26, '#d8eaf6'], [-0.06, -1, 0.24, '#ffffff'], [0.12, -1, 0.2, '#ffffff']]) R.disco(Math.round(cx + dx * w), Math.round(cy + dy), Math.max(1, Math.round(r * w)), hex(c)); };
const p2 = (t) => {
  if (!FONDO2) { FONDO2 = R.nuevo(); const prev = R.usar(FONDO2); pintaDespacho(); R.usar(prev); }
  R.copiar(FONDO2);
  // las nubes y las gaviotas por la ventana, el disco que gira, los vúmetros
  R.recorte([13, 34, 107, 61]); for (const [x0, y, w, v] of [[20, 42, 22, 3], [70, 48, 16, 5], [110, 38, 26, 2]]) nubeVentana(13 + ((x0 + t * v) % 130) - 15, y, w);
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * 12 + k * 40) % 120) + 5), y = 40 + k * 4 + Math.round(Math.sin(t * 3 + k) * 2); const a = Math.sin(t * 9 + k) > 0; R.pset(x, y, K); R.pset(x - 1, y - (a ? 1 : 0), K); R.pset(x + 1, y - (a ? 1 : 0), K); }
  R.recorte(null);
  { const cx = 142, cy = 93; R.disco(cx, cy, 6, hex('#14141a')); R.disco(cx, cy, 2, ROJO); const a = t * 4; R.pset(Math.round(cx + Math.cos(a) * 4), Math.round(cy + Math.sin(a) * 2), hex('#5a5a66')); R.linea(156, 89, 148, 94, hex('#c8c8d0')); }
  for (let k = 0; k < 5; k++) { const v = Math.round((Math.sin(t * 7 + k * 1.3) * 0.5 + 0.5) * 4); R.rect(168 + k * 3, 94 - v, 169 + k * 3, 93, k > 3 ? ROJO : hex('#5ad85a')); }
  // la caja fuerte de la disquera, abierta hasta que se guarda la partitura
  const cerrada = t > GUARDA + 0.72; PZ.cajaFuerte(R, 262, 162, { s: 3, abierta: !cerrada, monedas: 0.35 });
  if (cerrada && t < GUARDA + 1.2) golpe(262, 120, (t - GUARDA - 0.72) / 0.45);
  // el ejecutivo de la disquera detrás de la mesa: firma, recibe la partitura, la levanta y la lanza a la caja
  const firma = t > FIRMA && t < DERECHOS - 0.1, recibe = t > DERECHOS + 0.45, lanza = t > GUARDA - 0.1;
  const ex = R.actor(EL.disquera, 112, 141, t, { dir: lanza ? 1 : -1, sonrisa: t > M25 - 0.2, habla: t > FIRMA - 0.6 && t < FIRMA && Math.sin(t * 8) > 0,
    sostiene: firma ? [104 + Math.round(Math.sin(t * 22) * 2), 131] : lanza ? [136, 110] : recibe ? [104, 112] : true });
  if (firma) { const [hx, hy] = ex.mano; R.linea(hx - 1, hy - 1, hx - 4, hy - 7, K); R.pset(hx - 4, hy - 8, ORO); }
  // el editor que vende: le da la partitura, aplaude con los millones
  const vx = 22, vd = R.actor(EL.ejecutivo2, vx, 172, t, { dir: 1, sonrisa: t > DERECHOS, habla: t < FIRMA && Math.sin(t * 7) > 0, brazos: t > M25 + 0.1 && t < M25 + 0.9, sostiene: t < DERECHOS + 0.05 ? [vx + 20, 150] : undefined });
  escritorio(t);
  // la partitura: en la mano del editor, vuela a la mesa, sube con el ejecutivo y vuela a la caja fuerte
  { let px, py; const [ax, ay] = vd.mano, [bx, by] = ex.mano;
    if (t < DERECHOS) { px = ax + 3; py = ay - 8; } else if (t < DERECHOS + 0.45) { const u = (t - DERECHOS) / 0.45; px = lerp(ax + 3, bx, u); py = lerp(ay - 8, by - 8, u) - Math.sin(u * Math.PI) * 18; }
    else if (t < GUARDA) { px = bx; py = by - 9; } else if (t < GUARDA + 0.55) { const u = (t - GUARDA) / 0.55; px = lerp(bx, 258, u); py = lerp(by - 9, 128, u) - Math.sin(u * Math.PI) * 26; } else px = null;
    if (px != null) partitura(Math.round(px), Math.round(py)); }
  // «$25,000,000»
  { const u = tramo(t, M25, M25 + 0.35); if (u > 0 && t < GUARDA - 0.1) { R.numero('$25,000,000', 150, Math.round(lerp(96, 86, u)), { tam: 16, centro: true }); if (t < M25 + 0.6) for (let k = 0; k < 6; k++) { const a = k * 1.05 + t * 3, r = 70 * u; R.pset(Math.round(150 + Math.cos(a) * r), Math.round(78 + Math.sin(a) * r * 0.3), OROL); } } }
};

// ── plano 3: el juzgado, 2015 ───────────────────────────────────────────────────────────────────────────────────
const año3 = (t) => t < A2015 ? Math.min(2014, Math.round(lerp(1989, 2014, tramo(t, P3, HASTA)))) : 2015;
const pantalla3 = (Rr, t, [x0, y0, x1, y1]) => {
  R.rect(x0, y0, x1, y1, hex('#1e3a2a')); for (let y = y0; y <= y1; y += 3) R.linea(x0, y, x1, y, hex('#24442e'));
  const n = Math.max(0, año3(t) - 1988), monedas = Math.min(1, 0.15 + n * 0.035);
  PZ.cajaFuerte(R, x0 + 15, y1 - 1, { abierta: true, monedas });
  if (t < HASTA) { const u = (t * 9) % 1; moneda(x0 + 12, Math.round(y0 + 2 + u * 12)); }
  R.numero('2', x1 - 12, y1 - 6, { color: OROL });
  if (t > NOVALE) { for (let k = -1; k <= 1; k++) { R.linea(x0 + 4, y0 + 3 + k, x1 - 4, y1 - 3 + k, ROJO); R.linea(x0 + 4, y1 - 3 + k, x1 - 4, y0 + 3 + k, ROJO); } }
};
const p3 = (t) => {
  T.fiestas(R, t, { encuadre: 'juzgado', camara: 'general', pantalla: pantalla3 });
  // el juez: el mazo en reposo, arriba en «Until», golpe en «ruled»
  const sube = t > HASTA && t < DICTA - 0.12, baja = t >= DICTA - 0.12 && t < DICTA + 0.5;
  const objetivo = sube ? [172, 40 + Math.round(Math.sin(t * 3) * 1)] : baja ? [176, 68] : [174, 62];
  const jz = R.actor(EL.juezToga, 153, 82, t, { dir: 1, sostiene: objetivo, sonrisa: t > NOVALE, enfado: sube, habla: t > JUEZ + 0.6 && t < NOVALE && Math.sin(t * 8) > 0 });
  // de pie ante el estrado: el de la disquera, la cantante y el director del rodaje
  const cae = t > DICTA, celebra = t > NOVALE && Math.sin((t - NOVALE) * 9) > -0.2;
  R.actor(EL.disquera, 122, 150, t, { dir: 1, sonrisa: !cae, sorpresa: cae && t < NOVALE, triste: t >= NOVALE, dedo: t > DOS && t < HASTA });
  R.actor(EL.cantante, 166, 150, t, { dir: -1, triste: t < DICTA, sorpresa: cae && t < NOVALE, brazos: celebra, salto: celebra ? Math.round(Math.abs(Math.sin((t - NOVALE) * 6)) * 3) : 0 });
  R.actor(EL.directorCine, 186, 150, t, { dir: -1, enfado: t < DICTA, sonrisa: t > NOVALE, brazos: t > NOVALE + 0.15 && Math.sin((t - NOVALE) * 7) > 0 });
  T.fiestasDelante(R, t, { encuadre: 'juzgado', camara: 'general', pantalla: pantalla3 });
  mazoMano(jz.mano[0], jz.mano[1], sube, 2);
  if (sube && t > HASTA + 0.3) for (let k = 0; k < 3; k++) R.linea(jz.mano[0] + 14, jz.mano[1] - 12 + k * 4, jz.mano[0] + 18, jz.mano[1] - 10 + k * 4, BLANCO);
  if (baja) { golpe(jz.mano[0], 68, (t - DICTA + 0.05) / 0.4, 2); if (t > DICTA && t < DICTA + 0.9) R.bocadillo(jz.mano[0] + 22, 52, {}); }
  // las pilas de monedas en la mesa de la disquera: crecen con cada año; con el mazo se caen
  { const n = Math.min(14, Math.max(0, año3(t) - 1988));
    for (let k = 0; k < n; k++) { const pila = k % 2, alto = Math.floor(k / 2), x = 92 + pila * 12; let y = 139 - alto * 3, dx = 0;
      if (cae) { const c = Math.min(1.2, t - DICTA); dx = Math.round(c * (pila ? 14 : -10) * (1 + alto * 0.15)); y = Math.min(141, Math.round(y + c * c * 60 * (0.5 + alto * 0.1))); }
      R.rect(x - 5 + dx, y - 2, x + 5 + dx, y + 1, K); R.rect(x - 4 + dx, y - 1, x + 4 + dx, y, ORO); R.rect(x - 4 + dx, y - 1, x + 4 + dx, y - 1, OROL); }
    // «$2» que sube con cada año
    if (t > DOS - 0.3 && t < HASTA) { const u = ((t - DOS + 0.3) * 1.4) % 1; R.numero('$2', 100, Math.round(126 - u * 22), { tam: 16, centro: true }); } }
};

// ── plano 4: la mesa del juez, 2016 ──────────────────────────────────────────────────────────────────────────────
const p4 = (t) => {
  T.fiestas(R, t, { encuadre: 'juzgado', camara: 'estrado', mazo: false });
  // la caja fuerte de la disquera, encima de los expedientes; el candado salta y se abre
  const abierta = t > ABRE; PZ.cajaFuerte(R, 62, 112, { s: 2, abierta, monedas: 0 });
  // dentro, la luz dorada y las notas que esperan; al abrirse, los rayos
  if (abierta) { for (let y = 76; y <= 103; y++) for (let x = 42; x <= 71; x++) { const d = Math.hypot((x - 56) / 16, (y - 92) / 16); R.pset(x, y, d < 0.5 ? hex('#fff0a0') : d < 0.8 ? ((x + y) % 2 ? hex('#f0c040') : hex('#fff0a0')) : d < 1.1 ? hex('#c88a20') : hex('#5a3a14')); }
    for (const [i, j, c] of [[46, 86, hex('#f0a0b8')], [58, 82, hex('#7ac8e8')]]) nota(i, j, c, 1);
    if (t < ABRE + 1.4) { const g = (t - ABRE) / 1.4; for (let k = 0; k < 7; k++) { const a = -Math.PI * (0.15 + k * 0.12), r0 = 18 + g * 10, r1 = r0 + 10; R.linea(Math.round(56 + Math.cos(a) * r0), Math.round(88 + Math.sin(a) * r0), Math.round(56 + Math.cos(a) * r1), Math.round(88 + Math.sin(a) * r1), OROL); } } }
  { const tiembla = t > A2016 && t < ABRE ? Math.round(Math.sin(t * 60) * 1) : 0; let cx = 62 + tiembla, cy = 62;
    if (t > ABRE - 0.1) { const c = t - ABRE + 0.1; cx = Math.round(62 - c * 40); cy = Math.round(62 - c * 30 + c * c * 140); }
    if (cy < 190) { R.linea(cx + 3, cy + 14, 62, 70, hex('#8a8a90')); R.icono('candado', cx - 3, cy, hex('#c8ccd8'), K, 2); } }
  // el juez: levanta el mazo en «and in», golpea en «2016» y sonríe cuando la canción queda libre
  const sube = t > P4 + 0.3 && t < A2016 - 0.1, baja = t >= A2016 - 0.1 && t < A2016 + 0.6;
  const jz = R.actor(EL.juezToga, 143, 124, t, { dir: 1, sostiene: sube ? [168, 96] : baja ? [172, 118] : [170, 110], sonrisa: t > ABRE, sorpresa: t > ABRE - 0.1 && t < CANCION });
  T.fiestasDelante(R, t, { encuadre: 'juzgado', camara: 'estrado', mazo: false });
  mazoMano(jz.mano[0], jz.mano[1], sube, 2);
  if (baja) golpe(jz.mano[0], 120, (t - A2016) / 0.4, 2);
  // las notas que salen de la caja y vuelan libres hacia arriba (por en medio, lejos del año y de Atom)
  const cols = [ORO, hex('#f0a0b8'), hex('#7ac8e8'), BLANCO, hex('#a8e070'), OROL];
  for (let k = 0; k < 40; k++) { const b = ABRE + 0.25 + (k < 5 ? k * 0.22 : 1.1 + (k - 5) * 0.14); if (t < b) continue; const u = (t - b) / (t > LIBRE ? 2.2 : 2.8); if (u > 1.1) continue;
    const x = 66 + u * (170 + (k % 4) * 10) + Math.sin(u * 6 + k) * 8, y = 88 - u * 112 + Math.sin(u * 9 + k * 2) * 3; if (y < -20) continue; nota(Math.round(x), Math.round(y), cols[k % 6], k % 3 === 2 ? 1 : 2); }
  if (t > LIBRE && t < LIBRE + 0.9) for (let k = 0; k < 10; k++) { const a = k * 0.63, r = (t - LIBRE) * 70; R.pset(Math.round(70 + Math.cos(a) * r), Math.round(80 + Math.sin(a) * r * 0.6), OROL); }
};

const año = (t) => t < P2 ? (t < A1988 ? Math.round(lerp(1960, 1987, tramo(t, 0.3, A1988 - 0.1))) : 1988) : t < P3 ? 1988 : t < P4 ? año3(t) : t < A2016 ? 2015 : 2016;
const efectos = [[CLAC, 'palmada'], [CORTA, 'aviso'], [A1988 + 0.6, 'papel'], [FIRMA + 0.1, 'firma'], [DERECHOS + 0.05, 'papel'], [M25, 'brillo'], [GUARDA + 0.72, 'cerrojo'],
  [DOS, 'golpecito'], [DICTA, 'toc'], [NOVALE + 0.1, 'palmada'], [A2016, 'toc'], [ABRE, 'cerrojo'], [LIBRE, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['tr-vestido'] = ('El vestido blanco', '''// TR-VESTIDO (frase 21), cartela «1840». Cinco planos:
// 1. (cartela → «The white dress») la capilla real de St James's en 1840: el paje sube por la alfombra echando pétalos; en
//    «weddings» las campanas, los invitados echan pétalos y entran Victoria y Alberto por el pasillo;
// 2. («The white dress» → «until») la puerta de una iglesia de pueblo: salen las novias de otras épocas con su mejor
//    vestido de color: la de azul (1400) en «The white dress», la de rojo (1600) en «Brides» y la de gris (1830) en «best
//    dress»; en «whatever its color» cada una brilla en su color; los vecinos echan pétalos;
// 3. («until» → «But») el altar: Victoria de blanco y Alberto llegan; él le pone el anillo en «married»; en «in white» el
//    vestido brilla; en «penny post» el sello de un penique vuela con el viento tras el ventanal;
// 4. («But» → «in Paris») Notre Dame en 1558 (la barra vuelve de 1840 a 1558): María Estuardo de blanco recorre el tablado
//    hasta el delfín en «Mary Queen of Scots»; se dan la mano en «married in white»; la corte de blanco mira desde la nave;
// 5. («in Paris» → fin) el tablado de cerca: los novios ante los reclinatorios; en «royal mourning» la corte de luto blanco
//    inclina la cabeza y una dama se lleva el pañuelo a los ojos; la campana; al final los novios se miran.''', r'''
const P2 = en('vestido', 0.211), P3 = en('vestido', 0.430), P4 = en('vestido', 0.675), P5 = en('vestido', 0.878);
const FIESTA = en('vestido', 0.073), BODAS = en('vestido', 0.172), NOVIAS = en('vestido', 0.304), MEJOR = en('vestido', 0.353), COLOR = en('vestido', 0.390);
const CASO = en('vestido', 0.474), ALBERTO = en('vestido', 0.490), DEBLANCO = en('vestido', 0.523), PENIQUE = en('vestido', 0.629);
const A1558 = en('vestido', 0.732), MARIA = en('vestido', 0.780), CASADA = en('vestido', 0.842), DEBLANCO2 = en('vestido', 0.867), BLANCO2 = en('vestido', 0.917), LUTO = en('vestido', 0.966);
const K = T.C.k, PZ = T.PIEZAS_TR;
const hs = (x, y, k = 0) => { let n = (x * 374761393 + y * 668265263 + k * 1274126177) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const aclara = (x, y, a, c) => R.pset(x, y, mez(R.pget(x, y), c, a));
const umb = (x, y) => [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]][y & 3][x & 3] / 16;
const degr = (y0, y1, x0, x1, st) => { for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0); let k = 0; while (k < st.length - 2 && f > st[k + 1][0]) k++;
  const [f0, c0] = st[k], [f1, c1] = st[k + 1], u = Math.max(0, Math.min(1, (f - f0) / Math.max(1e-6, f1 - f0))); for (let x = x0; x <= x1; x++) R.pset(x, y, u > umb(x, y) ? c1 : c0); } };
const BLANCO = hex('#f8f6f0'), OROL = hex('#fff0a0'), ORO = hex('#e8b830');
// un pétalo que cae (dos píxeles, gira)
const PET = ['#f8f6f0', '#f0b8c8', '#f6e0e8', '#e8c8d8'].map(hex);
const petalo = (x, y, t, k, col) => { const g = Math.floor(t * 6 + k) % 2; R.pset(x, y, col ?? PET[k % 4]); R.pset(x + (g ? 1 : 0), y + (g ? 0 : 1), col ?? PET[(k + 1) % 4]); };
const brillo = (x, y, t, k, c = BLANCO) => { const f = Math.floor(t * 8 + k) % 4; if (f === 3) return; const r = f === 1 ? 2 : 1; R.pset(x, y, c); for (let i = 1; i <= r; i++) { R.pset(x - i, y, c); R.pset(x + i, y, c); R.pset(x, y - i, c); R.pset(x, y + i, c); } };
// copia un búfer de sprite pixel a pixel (pset respeta R.recorte)
const pegaSprite = (b, sx0, sy0, w, h, dx, dy) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const c = b[(sy0 + j) * 320 + sx0 + i]; if (c) R.pset(dx + i, dy + j, c); } };
let SELLO = null;

// ── plano 1: la capilla real, 1840 ───────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  T.fiestas(R, t, { encuadre: 'capilla', camara: 'general' });
  // el paje sube por la alfombra echando pétalos de su cesta; los pétalos quedan en el pasillo
  const u = tramo(t, 1.5, BODAS - 0.5), py = Math.round(lerp(186, 128, u)), px = Math.round(lerp(150, 154, u));
  for (let k = 0; k < 18; k++) { const uk = k / 18; if (uk > u) break; const yy = Math.round(lerp(186, 128, uk)) + 1, xx = Math.round(lerp(150, 154, uk)) + 4 + Math.round((hs(k, 1, 5) - 0.5) * 14); petalo(xx, yy, 0, k); }
  // en «weddings» entran los novios por el pasillo (de espaldas a nosotros, hacia el altar)
  const v = tramo(t, BODAS - 0.4, P2 + 0.3), nv = Math.round(lerp(200, 166, v));
  if (u < 1 || t < BODAS) { const d = R.actor(EL.ninoKinder, px, py, t, { dir: Math.floor(t * 1.2) % 2 ? 1 : -1, anda: u > 0 && u < 1, sonrisa: true, sostiene: true });
    const [hx, hy] = d.mano; R.rect(hx - 3, hy - 1, hx + 3, hy + 3, K); R.rect(hx - 2, hy, hx + 2, hy + 2, hex('#c8a060')); R.pset(hx - 1, hy - 1, PET[1]); R.pset(hx + 1, hy - 1, PET[0]);
    if (u > 0 && u < 1) for (let k = 0; k < 3; k++) { const f = ((t * 2 + k / 3) % 1); petalo(hx + Math.round(Math.sin(f * 5 + k) * 4), Math.round(hy + f * 10), t, k); } }
  else { const d = R.actor(EL.ninoKinder, 154, 128, t, { dir: -1, sonrisa: true, dedo: t > BODAS + 0.4 }); }
  T.fiestasDelante(R, t, { encuadre: 'capilla', camara: 'general' });
  if (v > 0) { R.actor(EL.albertoBoda, 165, nv, t, { dir: -1, anda: v < 1, sonrisa: true }); R.actor(EL.victoriaNovia, 145, nv + 1, t, { dir: 1, anda: v < 1, sonrisa: true }); }
  // en «weddings», los invitados echan pétalos desde los bancos y suenan las campanas (las ondas bajo el ventanal)
  if (t > BODAS) { for (let k = 0; k < 26; k++) { const b = BODAS + (k % 13) * 0.08, c = t - b; if (c < 0) continue; const lado = k < 13 ? -1 : 1, x0 = 160 + lado * (40 + (k % 5) * 12), f = (c * 0.7) % 1.4;
      const x = Math.round(x0 - lado * f * 30 + Math.sin(c * 4 + k) * 3), y = Math.round(120 + f * 40 - Math.sin(f * 2.2) * 30); if (y < 178) petalo(x, y, t, k); }
    const c = (t - BODAS) % 1.2; if (t < BODAS + 2.4) for (const r of [6 + c * 14, 12 + c * 14]) R.anillo(160, 64, Math.round(r), mez(OROL, hex('#c8a040'), c / 1.2), 2); }
};

// ── plano 2: la puerta de la iglesia del pueblo, novias de otras épocas ───────────────────────────────────────────
const IG = { piedra: hex('#d8c8a4'), piedraL: hex('#ecdcb8'), piedraS: hex('#b0a07c'), piedraD: hex('#8a7a5a'), junta: hex('#a8987a'), teja: hex('#b85a3a'), tejaS: hex('#8a3a24'), tejaL: hex('#d87a54'),
  cal: hex('#f0ead8'), calS: hex('#d4ccb4'), madera: hex('#6a4024'), maderaL: hex('#8a5a34'), maderaS: hex('#4a2a14'), hierba: hex('#6aa84a'), hierbaS: hex('#4a8a3a'), hierbaL: hex('#8ac85a'), adoq: hex('#a89a88'), adoqS: hex('#7a6e60'), adoqL: hex('#c8bcaa') };
let FONDO_IG = null;
const sillares = (x0, y0, x1, y1, k) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / 6), dy = (y - y0) % 6; for (let x = x0; x <= x1; x++) { const dx = (x - x0 + (fila % 2) * 7) % 14;
  let c = dy === 5 || dx === 13 ? IG.junta : hs(Math.floor((x - x0 + (fila % 2) * 7) / 14), fila, k) < 0.3 ? IG.piedraL : hs(x, y, k) < 0.05 ? IG.piedraS : IG.piedra; if (dy === 0 && dx !== 13) c = mez(c, BLANCO, 0.2); R.pset(x, y, c); } } };
const casa = (x0, x1, yT, yS, pared, k) => {
  R.rect(x0, yT, x1, yS, K); for (let y = yT + 1; y < yS; y++) for (let x = x0 + 1; x < x1; x++) R.pset(x, y, hs(x, y, k) < 0.06 ? IG.calS : pared);
  for (const xx of [x0 + 1, x1 - 4]) R.rect(xx, yT + 1, xx + 2, yS - 1, IG.maderaS); R.rect(x0 + 1, yT + 20, x1 - 1, yT + 22, IG.maderaS);
  for (let j = 0; j < 14; j++) { const y = yT - 14 + j, a = x0 - 4 + (14 - j) * 0.2, b = x1 + 4 - (14 - j) * 0.2; for (let x = Math.round(a); x <= Math.round(b); x++) R.pset(x, y, j === 13 ? IG.tejaS : (x + Math.floor(y / 3) * 2) % 5 === 0 ? IG.tejaS : (y % 3 === 0 ? IG.tejaL : IG.teja)); }
  R.linea(x0 - 4, yT - 1, x1 + 4, yT - 1, K);
  const wx = Math.round((x0 + x1) / 2) - 6; R.rect(wx, yT + 6, wx + 12, yT + 17, K); R.rect(wx + 1, yT + 7, wx + 11, yT + 16, hex('#3a4a6a')); R.linea(wx + 6, yT + 7, wx + 6, yT + 16, IG.cal); R.linea(wx + 1, yT + 11, wx + 11, yT + 11, IG.cal);
  R.rect(wx - 5, yT + 6, wx - 1, yT + 17, IG.hierbaS); R.rect(wx + 13, yT + 6, wx + 17, yT + 17, IG.hierbaS); R.rect(wx - 1, yT + 17, wx + 13, yT + 19, IG.madera);
  for (let i = 0; i < 6; i++) R.pset(wx + i * 2, yT + 16, i % 2 ? hex('#e84a6a') : hex('#f0d040'));
};
const pintaIglesia = () => {
  degr(0, 96, 0, 319, [[0, hex('#5a9ad8')], [0.5, hex('#8cc0ec')], [1, hex('#d8eef6')]]);
  for (let x = 0; x < 320; x++) { const yA = Math.round(80 + Math.sin(x * 0.021) * 6 + Math.sin(x * 0.057 + 1) * 3); for (let y = yA; y < 130; y++) R.pset(x, y, y < yA + 2 ? hex('#9ab8a8') : ((x + y) % 2 ? hex('#7aa08a') : hex('#86aa94'))); }
  for (let x = 0; x < 320; x++) { const yB = Math.round(98 + Math.sin(x * 0.034 + 2) * 4); for (let y = yB; y < 140; y++) R.pset(x, y, (Math.floor(x / 22) + Math.floor(y / 6)) % 2 ? IG.hierba : hex('#7ab85a')); R.pset(x, yB, IG.hierbaS); }
  for (let k = 0; k < 14; k++) { const x = Math.round(hs(k, 2, 9) * 320), y = Math.round(94 + hs(k, 3, 9) * 6); R.disco(x, y, 3, hex('#4a7a4a')); R.disco(x - 1, y - 1, 2, hex('#5a9a5a')); }
  casa(0, 50, 84, 140, IG.cal, 1); casa(244, 302, 86, 140, hex('#f0e0c0'), 2);
  R.rect(254, 64, 262, 76, K); R.rect(255, 65, 261, 76, IG.piedraS); R.rect(253, 63, 263, 65, K);
  // el árbol de la plaza
  R.rect(228, 100, 233, 142, K); R.rect(229, 100, 232, 142, IG.maderaS); R.linea(230, 102, 230, 140, IG.madera);
  for (let k = 0; k < 40; k++) { const a = hs(k, 1, 77) * 6.28, r = hs(k, 2, 77) * 18, x = Math.round(231 + Math.cos(a) * r), y = Math.round(88 + Math.sin(a) * r * 0.75); R.disco(x, y, 4, k < 14 ? hex('#3a7a3a') : k < 28 ? hex('#4a9a44') : hex('#6ab85a')); }
  // la torre del campanario con su tejado y la tronera de la campana
  sillares(64, 28, 102, 146, 3); R.rect(63, 28, 63, 146, K); R.rect(103, 28, 103, 146, K);
  R.poligono([[60, 30], [83, 16], [106, 30]], K); R.poligono([[62, 29], [83, 18], [104, 29]], (x, y) => ((x + y) % 4 === 0 ? IG.tejaS : x < 83 ? IG.tejaL : IG.teja));
  R.rect(73, 34, 93, 56, K); R.rect(74, 35, 92, 56, hex('#2a2018')); R.disco(83, 35, 10, K); R.disco(83, 36, 9, hex('#2a2018')); R.rect(72, 56, 94, 58, IG.piedraD);
  R.rect(64, 60, 102, 61, IG.piedraD); for (let x = 74; x < 92; x += 4) R.rect(x, 96, x + 1, 104, K);
  // la fachada de la iglesia: sillares, el hastial, el rosetón y la portada con arquivoltas
  sillares(104, 52, 220, 146, 4);
  for (let y = 26; y < 52; y++) { const a = Math.round(161 - (y - 26) * 2.3), b = Math.round(161 + (y - 26) * 2.3); for (let x = Math.max(104, a); x <= Math.min(220, b); x++) { const fila = Math.floor(y / 6); R.pset(x, y, y % 6 === 5 || (x + fila * 7) % 14 === 13 ? IG.junta : IG.piedra); } }
  R.linea(100, 54, 161, 24, K); R.linea(161, 24, 222, 54, K); R.linea(101, 55, 161, 25, IG.piedraL); R.linea(161, 25, 221, 55, IG.piedraS); R.rect(104, 146, 220, 146, K); R.linea(104, 54, 104, 146, K); R.linea(220, 54, 220, 146, K);
  R.disco(161, 64, 11, K); R.disco(161, 64, 10, IG.piedraD); R.disco(161, 64, 8, hex('#3a4a8a'));
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; R.linea(161, 64, Math.round(161 + Math.cos(a) * 8), Math.round(64 + Math.sin(a) * 8), IG.piedraD); R.pset(Math.round(161 + Math.cos(a + 0.4) * 5), Math.round(64 + Math.sin(a + 0.4) * 5), [hex('#d84a4a'), hex('#f0c040'), hex('#4ab84a'), hex('#4a8ad8')][k % 4]); }
  R.disco(161, 64, 2, hex('#f0c040'));
  for (const xw of [118, 198]) { R.rect(xw, 84, xw + 7, 104, K); R.rect(xw + 1, 87, xw + 6, 104, hex('#3a4a6a')); R.disco(xw + 3, 87, 3, K); R.disco(xw + 3, 87, 2, hex('#3a4a6a')); R.pset(xw + 2, 90, hex('#8aa0c8')); }
  for (let r = 25; r >= 20; r--) R.disco(160, 106, r, r % 2 ? IG.piedraL : IG.piedraS); R.disco(160, 106, 26, K); for (let r = 25; r >= 20; r--) R.disco(160, 106, r, r % 2 ? IG.piedraL : IG.piedraS);
  R.rect(134, 106, 186, 146, IG.piedra); for (let y = 106; y < 146; y += 2) { R.pset(135, y, IG.piedraS); R.pset(185, y, IG.piedraS); }
  for (let k = 0; k < 15; k++) { const a = Math.PI + k / 14 * Math.PI, x = Math.round(160 + Math.cos(a) * 27), y = Math.round(106 + Math.sin(a) * 27); R.disco(x, y, 2, [hex('#e84a6a'), hex('#f0d040'), BLANCO, hex('#f09ab8')][k % 4]); R.pset(x, y + 2, IG.hierbaS); }
  // las gradas, el banco, las macetas, el pozo y el empedrado de la plaza
  for (const [a, b, y0, y1] of [[126, 194, 146, 151], [118, 202, 151, 156], [110, 210, 156, 161]]) { R.rect(a, y0, b, y1, K); R.rect(a + 1, y0 + 1, b - 1, y1 - 1, IG.piedra); R.rect(a + 1, y0 + 1, b - 1, y0 + 1, IG.piedraL); }
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < 161 && x > 108 && x < 212) continue; if (y < 142 && (x < 104 || x > 220) && y < 140) continue;
    const fila = Math.floor(y / 5), dx = (x + (fila % 2) * 4) % 8, dy = y % 5; R.pset(x, y, dx === 7 || dy === 4 ? IG.adoqS : hs(Math.floor((x + (fila % 2) * 4) / 8), fila, 5) < 0.3 ? IG.adoqL : IG.adoq); }
  for (let x = 0; x < 320; x++) { if (x > 104 && x < 220) continue; R.pset(x, 140, IG.hierbaS); R.pset(x, 139, x % 3 ? IG.hierba : hex('#f0d040')); }
  R.rect(18, 150, 50, 152, K); R.rect(19, 151, 49, 151, IG.maderaL); R.rect(20, 153, 22, 160, IG.maderaS); R.rect(46, 153, 48, 160, IG.maderaS); R.rect(18, 142, 50, 144, IG.madera);
  for (const xm of [116, 200]) { R.rect(xm, 140, xm + 8, 151, K); R.rect(xm + 1, 141, xm + 7, 150, IG.teja); for (let k = 0; k < 5; k++) R.disco(xm + 1 + k * 2, 137 - (k % 2) * 2, 2, k % 2 ? hex('#e84a6a') : hex('#f0d040')); R.linea(xm + 4, 140, xm + 4, 134, IG.hierbaS); }
  R.disco(276, 156, 14, K); R.rect(262, 150, 290, 166, K); R.rect(263, 151, 289, 165, IG.piedra); R.rect(263, 151, 289, 152, IG.piedraL); for (let x = 264; x < 289; x += 7) R.rect(x, 153, x, 165, IG.junta);
  R.rect(263, 126, 265, 150, IG.maderaS); R.rect(287, 126, 289, 150, IG.maderaS); R.poligono([[258, 128], [276, 116], [294, 128]], K); R.poligono([[260, 127], [276, 118], [292, 127]], IG.teja); R.linea(264, 134, 288, 134, IG.madera);
};
const p2 = (t) => {
  if (!FONDO_IG) { FONDO_IG = R.nuevo(); const prev = R.usar(FONDO_IG); pintaIglesia(); R.usar(prev); }
  R.copiar(FONDO_IG);
  // las nubes de tres tonos y las golondrinas; el humo de la chimenea
  for (const [x0, y, w, v] of [[10, 34, 40, 3], [150, 22, 30, 5], [260, 46, 34, 2], [90, 58, 24, 7]]) { const x = ((x0 + t * v) % 380) - 30; if (Math.abs(x - 298) < 30 && y < 48) continue; R.nube(Math.round(x), y, w); }
  for (let k = 0; k < 4; k++) R.gaviota(Math.round(((t * (20 + k * 4) + k * 70) % 360) - 20), 30 + k * 7 + Math.round(Math.sin(t * 2 + k) * 3), t, k);
  for (let k = 0; k < 5; k++) { const u = (t * 0.35 + k / 5) % 1; R.disco(Math.round(258 + u * 8 + Math.sin(u * 6) * 2), Math.round(60 - u * 28), u < 0.5 ? 2 : 3, u < 0.5 ? hex('#d8d8e0') : hex('#e8e8f0')); }
  // la campana que tañe
  { const a = Math.sin(t * 5) * (t > NOVIAS - 0.2 ? 0.5 : 0.12); R.poligono([[83 + Math.round(Math.sin(a) * 2) - 6, 52], [83 + Math.round(Math.sin(a) * 6) - 4, 40], [83 + Math.round(Math.sin(a) * 6) + 4, 40], [83 + Math.round(Math.sin(a) * 2) + 6, 52]], ORO);
    R.linea(77, 52, 89, 52, hex('#a87a18')); R.pset(83 + Math.round(Math.sin(a) * 9), 54, K); }
  // la puerta: dos hojas de madera que se abren
  const ab = tramo(t, P2 + 0.2, P2 + 0.7);
  R.rect(140, 106, 180, 146, hex('#1e1612')); for (let k = 0; k < 4; k++) { R.disco(150 + k * 7, 118, 1, hex('#f0c060')); }
  R.recorte([140, 82, 180, 146]); R.disco(160, 106, 20, hex('#1e1612')); R.recorte(null);
  for (const lado of [-1, 1]) { const w = Math.round(20 * (1 - ab * 0.8)), xa = lado < 0 ? 140 : 180 - w, xb = lado < 0 ? 140 + w : 180;
    for (let y = 87; y <= 146; y++) for (let x = xa; x <= xb; x++) { if (Math.hypot(x - 160, y - 106) > 20 && y < 106) continue; R.pset(x, y, (x - xa) % 5 === 0 ? IG.maderaS : IG.madera); }
    for (const yy of [100, 130]) R.linea(xa, yy, xb, yy, K); }
  // las tres novias que salen por la puerta, cada una en su año, y bajan a la plaza
  const novias = [[EL.noviaAzul, P2 + 0.45, 84, 166], [EL.noviaRoja, NOVIAS, 148, 172], [EL.noviaGris, MEJOR, 212, 166]];
  const vivas = novias.map(([d, b, xf, sf], k) => { const u = tramo(t, b, b + 1.1); if (t < b) return null; return { d, k, x: Math.round(lerp(153, xf, u)), s: Math.round(lerp(146, sf, Math.min(1, u * 1.4))), anda: u < 1, b }; }).filter(Boolean).sort((a, b) => a.s - b.s);
  // los vecinos que echan pétalos y los niños
  R.actor(EL.labriego, 26, 168, t, { dir: 1, dedo: Math.sin(t * 5) > 0.3, sonrisa: true });
  R.actor(EL.labriega, 280, 170, t, { dir: -1, dedo: Math.sin(t * 5 + 1) > 0.3, sonrisa: true });
  { const u = tramo(t, P2 + 1.2, P3 - 0.2), x = Math.round(lerp(330, 236, u)); R.actor(EL.ninaCampo, x, 176, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: true, brazos: u >= 1 && Math.sin(t * 6) > 0 }); }
  for (const v of vivas) { R.actor(v.d, v.x, v.s, t, { dir: v.anda ? (v.x < 153 ? -1 : 1) : v.k === 0 ? 1 : v.k === 2 ? -1 : (Math.floor(t) % 2 ? 1 : -1), anda: v.anda, sonrisa: !v.anda || t > COLOR });
    if (t > COLOR - 0.1 && t < P3) { const c = [hex('#5a8ae8'), hex('#e83a4a'), hex('#a8a8b8')][v.k]; for (let i = 0; i < 6; i++) { const a = i * 1.047 + t * 3; brillo(Math.round(v.x + 7 + Math.cos(a) * 12), Math.round(v.s - 14 + Math.sin(a) * 13), t, i, c); } } }
  // las palomas de la plaza, que se espantan cuando sale la primera novia
  for (let k = 0; k < 3; k++) { const vuela = tramo(t, P2 + 0.8 + k * 0.1, P2 + 2.4); const x = Math.round(60 + k * 14 + vuela * 90), y = Math.round(172 - vuela * 120 - (vuela ? 0 : Math.abs(Math.sin(t * 4 + k)) * 1));
    if (y > -4) { R.rect(x - 2, y - 2, x + 2, y, hex('#8a8a98')); R.pset(x + 3, y - 3, hex('#6a6a78')); R.pset(x + 4, y - 3, hex('#e8a040')); if (vuela > 0) { const a = Math.sin(t * 20 + k) > 0; R.linea(x - 1, y - 2, x - 3, y - (a ? 6 : 1), hex('#c8c8d0')); } } }
  // pétalos que vuelan hacia las novias
  for (let k = 0; k < 16; k++) { const f = (t * 0.6 + k / 16) % 1, lado = k % 2 ? 1 : -1, x0 = lado < 0 ? 40 : 282, x1 = 150 + Math.sin(k) * 50;
    const x = Math.round(lerp(x0, x1, f)), y = Math.round(150 - Math.sin(f * Math.PI) * 40 + f * 14); petalo(x, y, t, k); }
};

// ── plano 3: el altar, Victoria y Alberto ─────────────────────────────────────────────────────────────────────────
const p3 = (t) => {
  T.fiestas(R, t, { encuadre: 'capilla', camara: 'altar' });
  // tras el ventanal: palomas y, en «penny post», el sello de un penique que vuela con el viento (recortado al hueco)
  if (!SELLO) { SELLO = R.nuevo(); const prev = R.usar(SELLO); PZ.sello(R, 14, 36, { s: 1 }); R.usar(prev); }
  R.recorte([119, 19, 201, 65]);
  for (let k = 0; k < 2; k++) { const x = Math.round(((t * 16 + k * 50) % 120) + 100), y = 30 + k * 12 + Math.round(Math.sin(t * 2 + k) * 2), a = Math.sin(t * 10 + k) > 0; R.disco(x, y, 2, BLANCO); R.linea(x - 1, y, x - 4, y - (a ? 4 : -1), BLANCO); R.linea(x + 1, y, x + 3, y - (a ? 4 : -1), hex('#d8d8e0')); }
  R.recorte(null);
  { const u = tramo(t, PENIQUE - 1.0, PENIQUE + 1.1); if (u > 0 && u < 1) { const x = Math.round(lerp(112, 210, u)), y = Math.round(20 + Math.sin(u * 8) * 2);
    R.recorte([119, 19, 201, 36]); pegaSprite(SELLO, 7, 19, 14, 18, x - 7, y);
    const a = Math.sin(t * 12) > 0; R.disco(x + 12, y + 4, 2, BLANCO); R.linea(x + 11, y + 3, x + 8, y - (a ? 2 : -4) + 3, BLANCO); R.linea(x + 13, y + 3, x + 16, y - (a ? 2 : -4) + 3, hex('#d8d8e0')); R.pset(x + 14, y + 4, hex('#e8a040')); R.linea(x + 10, y + 5, x + 6, y + 3, hex('#c8a040'));
    R.recorte(null); } }
  // los novios llegan desde la izquierda; él le pone el anillo en «married»; en «in white» el vestido brilla
  const u = tramo(t, P3 + 0.05, CASO - 0.15), xa = Math.round(lerp(-20, 168, u)), xv = Math.round(lerp(-40, 138, u));
  const anillo = t > CASO && t < DEBLANCO + 0.2;
  R.actor(EL.victoriaNovia, xv, 160, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: true, sorpresa: t > CASO + 0.3 && t < ALBERTO + 0.2 });
  for (const [dx, k] of [[-22, 0], [-38, 1]]) { const xd = Math.round(lerp(-60 - k * 16, 138 + dx, u)); R.actor(EL.ninaKinder, xd, 160, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: true, pal: { C: hex('#f8f6f0'), c: hex('#d8d4cc') } }); }
  const al = R.actor(EL.albertoBoda, xa, 160, t, { dir: u < 1 ? 1 : -1, anda: u > 0 && u < 1, sonrisa: true, sostiene: anillo ? [158, 140] : undefined });
  if (anillo) { const [hx, hy] = al.mano; R.disco(hx - 1, hy - 3, 2, K); R.disco(hx - 1, hy - 3, 1, ORO); R.pset(hx - 1, hy - 3, K); }
  if (t > DEBLANCO - 0.1) { const g = Math.min(1, (t - DEBLANCO + 0.1) / 0.5); for (let y = 122; y < 162; y++) for (let x = 128; x < 160; x++) if ((x + y) % 2 === 0 && Math.hypot((x - 145) / 16, (y - 145) / 22) < 1) aclara(x, y, 0.22 * g, hex('#fffaf0'));
    for (let k = 0; k < 6; k++) brillo(Math.round(140 + hs(k, 1, 2) * 14), Math.round(130 + hs(k, 2, 2) * 26), t, k, BLANCO); }
  T.fiestasDelante(R, t, { encuadre: 'capilla', camara: 'altar' });
  // pétalos blancos que caen despacio
  for (let k = 0; k < 14; k++) { const f = (t * 0.12 + k / 14) % 1, x = Math.round(80 + (k * 37) % 170 + Math.sin(t * 1.5 + k) * 6), y = Math.round(f * 170); if (x > 270 && y < 48) continue; petalo(x, y, t, k); }
};

// ── plano 4: Notre Dame, 1558 ─────────────────────────────────────────────────────────────────────────────────────
const p4 = (t) => {
  T.fiestas(R, t, { encuadre: 'paris1558', camara: 'general' });
  // la corte de blanco en la nave: miran hacia el tablado, una dama se abanica
  R.actor(EL.damaBlanca, 32, 168, t, { dir: 1, sorpresa: t > MARIA && t < MARIA + 0.6 });
  R.actor(EL.cortesano, 56, 168, t, { dir: 1, dedo: t > MARIA - 0.2 && t < MARIA + 1 });
  R.actor(EL.damaBlanca, 80, 168, t, { dir: 1, pal: { H: hex('#8a5a2a'), h: hex('#a87038') }, sonrisa: t > CASADA });
  // el delfín espera bajo el dosel; María Estuardo cruza el tablado de blanco hasta él y se dan la mano
  const u = tramo(t, MARIA - 0.9, MARIA + 0.9), xm = Math.round(lerp(270, 214, u)), mano = t > CASADA - 0.1;
  R.actor(EL.cortesano, 190, 126, t, { dir: 1, pal: { J: hex('#f8f6f0'), C: hex('#f8f6f0') }, sonrisa: t > MARIA + 0.5, sostiene: mano ? [206, 112] : undefined });
  R.actor(EL.mariaEstuardo, xm, 126, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: u >= 1, sostiene: mano ? [206, 112] : undefined });
  if (mano) { const g = Math.min(1, (t - CASADA) / 0.5); for (let k = 0; k < 5; k++) brillo(Math.round(206 + Math.cos(k * 1.25 + t) * 10 * g), Math.round(108 + Math.sin(k * 1.25 + t) * 8 * g), t, k, OROL); }
  T.fiestasDelante(R, t, { encuadre: 'paris1558', camara: 'general' });
};

// ── plano 5: el tablado de cerca, el luto blanco ──────────────────────────────────────────────────────────────────
const p5 = (t) => {
  T.fiestas(R, t, { encuadre: 'paris1558', camara: 'nave' });
  const inclina = t > LUTO - 0.15 && t < LUTO + 2.4;
  // en «where white», bajan del dosel los paños blancos del luto y entra un rayo de luz
  { const g = tramo(t, BLANCO2 - 0.3, BLANCO2 + 1.2), yb = Math.round(56 + g * 70); if (g > 0) for (const x0 of [87, 220]) { for (let y = 56; y <= yb; y++) { const o = Math.round(Math.sin(y * 0.15 + t * 1.5) * 1.5); R.pset(x0 - 1 + o, y, K); R.pset(x0 + 13 + o, y, K);
      for (let x = x0; x <= x0 + 12; x++) R.pset(x + o, y, (x - x0) % 4 === 0 ? hex('#d8d4cc') : x - x0 > 9 ? hex('#e4e0d8') : BLANCO); } R.linea(x0 - 1, yb, x0 + 13, yb, K); for (let x = x0; x <= x0 + 12; x += 3) R.pset(x, yb + 1, OROL); } }
  if (t > BLANCO2) { const g = Math.min(1, (t - BLANCO2) / 0.8); for (let y = 0; y < 142; y++) for (let x = 0; x < 320; x++) { const d = Math.abs(x - 60 - y * 0.75); if (d < 22 && (x + y) % 2 === 0) aclara(x, y, 0.28 * g * (1 - d / 22), hex('#fffaf0')); } }
  // la corte de luto blanco a los lados del tablado
  R.actor(EL.damaBlanca, 66, 142, t, { dir: 1, triste: inclina, salto: inclina ? -1 : 0 });
  const dp = R.actor(EL.damaBlanca, 88, 142, t, { dir: 1, pal: { H: hex('#8a5a2a'), h: hex('#a87038') }, triste: inclina, salto: inclina ? -1 : 0, sostiene: inclina ? [96, 126] : undefined });
  if (inclina) { const [hx, hy] = dp.mano; R.rect(hx - 3, hy - 3, hx + 2, hy + 2, K); R.rect(hx - 2, hy - 2, hx + 1, hy + 1, BLANCO); R.pset(hx + 1, hy + 2, BLANCO); }
  R.actor(EL.cortesano, 222, 142, t, { dir: -1, triste: inclina, salto: inclina ? -1 : 0 });
  R.actor(EL.damaBlanca, 244, 142, t, { dir: -1, pal: { H: hex('#3a2a1c'), h: hex('#5a4030') }, triste: inclina, salto: inclina ? -1 : 0, habla: t > BLANCO2 && t < LUTO - 0.3 && Math.sin(t * 7) > 0 });
  // los novios ante los reclinatorios: se dan la mano; al final se miran y sonríen
  const juntos = t > P5 + 0.4 && t < LUTO + 2.6;
  R.actor(EL.mariaEstuardo, 138, 142, t, { dir: 1, sonrisa: !inclina, sostiene: juntos ? [158, 128] : undefined });
  R.actor(EL.cortesano, 170, 142, t, { dir: -1, pal: { J: hex('#f8f6f0'), C: hex('#f8f6f0') }, sonrisa: !inclina, sostiene: juntos ? [160, 128] : undefined });
  T.fiestasDelante(R, t, { encuadre: 'paris1558', camara: 'nave' });
};

const año = (t) => t < P2 ? 1840 : t < P3 ? (t < NOVIAS ? 1400 : t < MEJOR ? 1600 : 1830) : t < P4 ? 1840 : t < P5 ? Math.round(lerp(1840, 1558, tramo(t, P4 + 0.05, A1558))) : 1558;
const efectos = [[BODAS, 'campana'], [P2 + 0.2, 'puerta'], [COLOR, 'brillo'], [ALBERTO, 'brillo'], [PENIQUE - 0.3, 'whoosh'], [A1558 - 0.7, 'whoosh'], [CASADA, 'campana'], [LUTO, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '1840', efectos, año });
''')
