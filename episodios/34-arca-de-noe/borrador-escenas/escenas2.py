E = {}
E['nx-foto'] = ('La foto aérea', '''// NX-FOTO (frases 4–5), 1959, cartela «1959». Siete planos:
// 1. el despacho del cuartel: el capitán Durupınar repasa fotos aéreas una a una (las gira y las deja); un ordenanza le
//    trae otra pila, saluda y se va;
// 2. la ladera en 1959, a vista de pájaro: la avioneta de reconocimiento cruza el cielo, su sombra corre por el terreno
//    y el visor dispara dos fotos (la segunda encuadra la forma entera);
// 3. gag 2, la foto sobre el vade: la lupa la recorre y se para en la silueta («?»); la mano gira la foto por una
//    esquina, se pasa de largo, vuelve… hasta que el «barco» queda derecho («!»), y el lápiz graso rojo lo rodea; «2000»;
// 4. el mapa: la pasada del avión llega a trazos hasta la ladera, cae el alfiler rojo, un aro señala el monte de al lado y
//    la regla se tiende con su «30»;
// 5. el Ararat enorme y nevado desde dentro de la forma (sin gente): un águila sube en círculos, una liebre se para a
//    mirarlo y en la cumbre se planta el banderín del «1» (el pico más alto);
// 6. el relato: el mar se calma, la peña sube y el barco queda posado (nadie a bordo); asoman las cumbres y cruzan
//    unas cigüeñas;
// 7. 1960 (la barra cambia): la revista llega empujada por una mano, un dedo señala la foto pequeña de las mulas y la
//    grande de la silueta, y otra mano, de otra manga, se la lleva por el otro lado.''', r'''
const a = (s) => en('capitan', (s - 1.5) / 15.67), b = (s) => en('ararat', (s - 18.462) / 18.844);   // s: el segundo de la voz inglesa de hoy
const K = T.C.k, PZ = T.PIEZAS_NX, BL = hex('#f6f2e6'), ROJO = hex('#d23a2e');
const P2 = a(6.1), P3 = a(10.25), P4 = a(17.3), P5 = b(21.85), P6 = b(25.5), P7 = b(31.3);
const sua = (u) => u * u * (3 - 2 * u);
const osc = (x, y, f) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; const c = R.pget(x, y); R.pset(x, y, (0xff000000 | (Math.round(((c >>> 16) & 255) * (1 - f)) << 16) | (Math.round(((c >>> 8) & 255) * (1 - f)) << 8) | Math.round((c & 255) * (1 - f))) >>> 0); };
// valor por claves [[t, v], …] con entrada y salida suaves
const clave = (t, ks) => { if (t <= ks[0][0]) return ks[0][1]; for (let i = 1; i < ks.length; i++) if (t <= ks[i][0]) { const u = sua((t - ks[i - 1][0]) / (ks[i][0] - ks[i - 1][0])); return typeof ks[i][1] === 'number' ? lerp(ks[i - 1][1], ks[i][1], u) : ks[i][1].map((v, j) => lerp(ks[i - 1][1][j], v, u)); } return ks[ks.length - 1][1]; };

// ── 1 · el despacho ──
const pila = (x, y, n = 4) => { for (let i = 0; i < n; i++) { const yy = y - i * 2, dx = (i * 3) % 2; R.rect(x - 7 + dx, yy - 2, x + 7 + dx, yy, K); R.rect(x - 6 + dx, yy - 1, x + 6 + dx, yy - 1, i === n - 1 ? hex('#8c90a4') : BL); } if (n > 0) { R.rect(x - 4, y - n * 2 + 1, x + 1, y - n * 2 + 1, hex('#4a4a5a')); } };
const p1 = (t) => {
  const o = { encuadre: 'capitan' }; T.papeles(R, t, o);
  const LLEGA = a(3.3), SALE = a(4.6), u = tramo(t, 1.2, LLEGA), v = tramo(t, SALE, P2 + 0.4), deja = u >= 1;
  const ox = Math.round(v > 0 ? lerp(58, -20, v) : lerp(-18, 58, u));
  const od = R.actor(EL.soldadoGA2, ox, 160, t, { dir: v > 0 ? -1 : 1, anda: (u > 0 && u < 1) || (v > 0 && v < 1), sostiene: deja ? false : [ox + 16, 142], dedo: deja && v === 0 && t > LLEGA + 0.35 });
  if (!deja) pila(od.mano[0] + 3, od.mano[1] + 2);
  // el capitán repasa fotos: levanta una, la gira, la deja y coge la siguiente
  const f = ((t - 1.3) / 1.25) % 1, n = Math.floor((t - 1.3) / 1.25), alto = f < 0.2 ? f / 0.2 : f > 0.8 ? (1 - f) / 0.2 : 1;
  const cap = R.actor(EL.durupinar, 153, 141, t, { dir: 1, sostiene: [175, Math.round(lerp(134, 126, sua(alto)))], habla: deja && v === 0 && Math.sin(t * 9) > 0, sorpresa: false });
  const g = T.papelesDelante(R, t, o);
  pila(171, 134, 2 + (n % 3));
  PZ.fotoAerea(R, cap.mano[0] + 5, cap.mano[1] + 4, { giro: n + (f > 0.5 ? 1 : 0) });
  if (deja) pila(90, 134, 4);
};

// ── 2 · la avioneta ──
const avion = (x, y, t) => {
  const V = hex('#6a7a4a'), VL = hex('#8a9a62'), VS = hex('#4a5834'), G = hex('#c8ccd8');
  const pol = (p, c) => R.poligono(p.map(([i, j]) => [x + i, y + j]), c);
  pol([[-21, -2], [-5, -4], [13, -4], [16, -1], [16, 2], [12, 4], [-5, 4], [-21, 1]], K);                 // el fuselaje
  pol([[-23, -3], [-25, -11], [-19, -11], [-14, -3]], K); pol([[-22, -3], [-24, -10], [-20, -10], [-16, -3]], V);   // la deriva
  pol([[-20, -1], [-5, -3], [12, -3], [15, -1], [15, 1], [12, 3], [-5, 3], [-20, 0]], V);
  R.rect(x - 4, y - 3, x + 12, y - 3, VL); R.rect(x - 16, y + 1, x + 12, y + 2, VS);
  R.rect(x - 8, y - 2, x - 6, y + 2, BL);                                                                  // la franja
  R.rect(x + 3, y - 3, x + 10, y - 1, K); R.rect(x + 4, y - 3, x + 9, y - 2, hex('#a8d8f0')); R.pset(x + 6, y - 3, K);   // la cabina
  R.rect(x - 9, y - 8, x + 13, y - 5, K); R.rect(x - 8, y - 7, x + 12, y - 6, VL); R.rect(x - 8, y - 6, x + 12, y - 6, V);   // el ala alta
  R.linea(x + 1, y - 4, x + 5, y + 2, K); R.linea(x + 9, y - 4, x + 6, y + 2, K);                           // los montantes
  R.linea(x + 5, y + 4, x + 4, y + 7, K); R.linea(x + 8, y + 4, x + 9, y + 7, K); R.disco(x + 4, y + 8, 2, K); R.disco(x + 10, y + 8, 2, K); R.pset(x + 4, y + 8, G); R.pset(x + 10, y + 8, G);
  R.rect(x - 22, y + 2, x - 21, y + 4, K);                                                                 // el patín de cola
  const h = Math.floor(t * 24) % 3; R.rect(x + 17, y - 1, x + 18, y + 1, K); R.rect(x + 19, y - (h === 0 ? 7 : h === 1 ? 4 : 1), x + 19, y + (h === 0 ? 7 : h === 1 ? 4 : 1), h === 2 ? K : G);   // la hélice
  R.rect(x + 1, y + 4, x + 3, y + 5, K); R.pset(x + 2, y + 5, hex('#a8d8f0'));                             // la cámara, en la panza
};
const visor = (x0, y0, x1, y1, d) => {
  if (d < 0 || d > 1.5) return;
  if (d < 0.1) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if ((x + y) % 2 === 0) R.pset(x, y, hex('#ffffff'));
  const L = 9, c = d < 0.2 || Math.floor(d * 8) % 2 === 0 || d > 0.6 ? hex('#ffffff') : hex('#ffe890');
  for (const [cx, cy, sx, sy] of [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]]) { for (let i = -1; i <= L; i++) for (let w = -1; w <= 1; w++) { R.pset(cx + sx * i, cy + sy * w + sy, K); R.pset(cx + sx * w + sx, cy + sy * i, K); } for (let i = 0; i < L; i++) { R.pset(cx + sx * i, cy + sy, c); R.pset(cx + sx, cy + sy * i, c); } }
  const mx = (x0 + x1) >> 1, my = (y0 + y1) >> 1; for (let i = -4; i <= 4; i++) if (Math.abs(i) > 1) { R.pset(mx + i, my, c); R.pset(mx, my + i, c); }
};
const p2 = (t) => {
  const o = { epoca: 1959 }; T.ladera(R, t, o);
  const u = tramo(t, P2 - 0.3, P3 + 0.3), ax = Math.round(lerp(-6, 250, u)), ay = Math.round(38 - Math.sin(u * Math.PI) * 5 + Math.sin(t * 2.6) * 1.2);
  const sx = ax - 12, sy = Math.round(lerp(120, 104, u));                                                   // la sombra de la avioneta en el terreno
  for (let j = -3; j <= 3; j++) for (let i = -13; i <= 13; i++) if ((i / 13) ** 2 + (j / 3) ** 2 <= 1 || (Math.abs(i - 2) < 3 && Math.abs(j) < 7)) osc(sx + i, sy + j, 0.3);
  visor(14, 84, 58, 112, t - a(7.2)); visor(36, 80, 284, 140, t - a(8.75));
  T.laderaDelante(R, t, o); avion(ax, ay, t);
};

// ── 3 · gag 2: la foto, la lupa y el lápiz rojo ──
const MANGA = '#6a6a3e';
const p3 = (t) => {
  const giro = clave(t, [[a(12.35), 2.0], [a(12.95), 1.15], [a(13.3), 1.15], [a(13.85), 0.45], [a(14.05), 0.45], [a(14.42), -0.32], [a(14.62), -0.32], [a(14.95), 0]]);
  const lu = clave(t, [[P3, [228, 106]], [a(10.75), [200, 112]], [a(11.1), [122, 104]], [a(11.5), [156, 98]], [a(12.05), [156, 98]], [a(12.4), [262, 96]]]);
  const marca = tramo(t, a(15.35), a(16.55));
  const g = T.papeles(R, t, { encuadre: 'capitan', camara: 'foto', giro, lupa: lu.map(Math.round), marca });
  // la mano derecha lleva la lupa y, al acabar, la deja a un lado y se retira
  const fuera = sua(tramo(t, a(12.4), a(12.8))), hx = Math.round(lu[0] + 25 + fuera * 70), hy = Math.round(lu[1] + 22 + fuera * 50);
  if (fuera < 1) T.brazo(R, hx + 34, 186, hx, hy, MANGA, -1, { codo: [hx + 30, Math.min(176, hy + 44)] });
  // la mano izquierda coge la esquina de abajo y gira la foto
  const coge = sua(tramo(t, a(12.0), a(12.35))) * (1 - sua(tramo(t, a(15.0), a(15.3)))), [ex, ey] = g.esquina(2);
  if (coge > 0) { const wx = Math.round(ex - 13), wy = Math.round(lerp(196, ey + 1, coge)); T.brazo(R, wx - 26, 188, wx, wy, MANGA, 1, { codo: [wx - 24, Math.min(180, wy + 26)] }); }
  // el lápiz graso rojo rodea la silueta
  const lap = sua(tramo(t, a(15.0), a(15.35))) * (1 - sua(tramo(t, a(16.6), a(17.0))));
  if (lap > 0) { const an = 6.283 * marca - 2.2, tx = Math.round(156 + Math.cos(an) * 43), ty = Math.round(lerp(190, 98 + Math.sin(an) * 17, lap));
    for (let i = 0; i <= 16; i++) { const x = tx + Math.round(i * 0.6), y = ty + Math.round(i * 0.9); R.disco(x, y, 2.2, K); }
    for (let i = 0; i <= 16; i++) { const x = tx + Math.round(i * 0.6), y = ty + Math.round(i * 0.9); R.disco(x, y, 1.2, i < 2 ? hex('#7a1c1c') : i < 5 ? hex('#efe6d0') : hex('#c83a3a')); if (i >= 5) R.pset(x - 1, y - 1, hex('#ec7a6a')); }
    T.brazo(R, tx + 46, 188, tx + 21, ty + 16, MANGA, -1, { codo: [tx + 44, Math.min(180, ty + 54)] }); }
  // «?» al dar con la silueta, «!» cuando el barco queda derecho
  const q = t >= a(11.5) && t < a(12.5), ex2 = t >= a(14.95) && t < a(15.9);
  if (q || ex2) { const t0 = q ? a(11.5) : a(14.95), y = 30 - Math.round(Math.max(0, 4 * Math.sin((t - t0) * 12) * Math.exp(-(t - t0) * 5))); R.disco(254, y + 7, 12, K); R.disco(254, y + 7, 11, BL); R.poligono([[244, y + 14], [238, y + 24], [251, y + 17]], K); R.poligono([[246, y + 14], [241, y + 21], [250, y + 16]], BL); R.icono(q ? '?' : '!', 247, y, q ? hex('#3a5a8a') : ROJO, BL, 2); }
  // «2000» metros: la cota, a lápiz, encima de la foto
  if (t >= a(15.6)) { const e = tramo(t, a(15.6), a(15.75)); R.rect(183, 27, 235, 43, K); R.rect(184, 28, 234, 42, hex('#efe6d0')); R.rect(184, 41, 234, 42, hex('#cfc4a8'));
    R.poligono([[190, 33], [194, 29], [198, 33]], ROJO); R.rect(193, 33, 195, 39, ROJO); if (e >= 1) R.numero('2000', 201, 39, { color: hex('#7a2e2e'), sombra: false }); }
};

// ── 4 · el mapa: el alfiler y la regla del 30 ──
const p4 = (t) => {
  const rg = sua(tramo(t, b(20.69), b(21.35)));
  const g = T.papeles(R, t, { encuadre: 'mapa', regla: rg, judi: 0 }), [lx, ly] = g.ladera;
  // la pasada del avión, a trazos, llega hasta la ladera
  const v = tramo(t, P4 - 0.2, b(18.75)), X0 = 34, Y0 = 150, N = 60;
  const pt = (s) => [lerp(X0, lx, s), lerp(Y0, ly, s) - Math.sin(s * Math.PI) * 26];
  for (let i = 0; i < N * v; i++) if (i % 4 < 2) { const [x, y] = pt(i / N); R.rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y) + 1, hex('#7a2e2e')); }
  if (v < 1) { const [x, y] = pt(v), [x2, y2] = pt(Math.min(1, v + 0.02)), an = Math.atan2(y2 - y, x2 - x), ca = Math.cos(an), sa = Math.sin(an), q = (i, j) => [Math.round(x + i * ca - j * sa), Math.round(y + i * sa + j * ca)];
    for (const [c, r] of [[K, 1.6], [hex('#8a9a62'), 0.6]]) { for (let i = -7; i <= 7; i++) R.disco(...q(i, 0), r, c); for (let j = -8; j <= 8; j++) R.disco(...q(2, j), r, c); for (let j = -3; j <= 3; j++) R.disco(...q(-6, j), r, c); }
    for (let i = -3; i <= 3; i++) for (let j = -6; j <= 6; j++) if ((i / 3) ** 2 + (j / 6) ** 2 <= 1 && (i + j) % 2 === 0) osc(x + 5 + i * ca - j * sa, y + 7 + i * sa + j * ca, 0.25); }
  // el alfiler rojo cae en la ladera
  const baja = tramo(t, b(18.6), b(18.96));
  T.chincheta(R, lx, ly, t, T.C.rojo, { baja, pulso: t < b(20.6) });
  // «un sitio con un nombre famoso»: un aro a trazos que gira alrededor del monte de al lado
  const fam = tramo(t, b(19.45), b(19.8));
  if (fam > 0 && rg < 0.2) { const [mx, my] = g.ararat, cy = my - 12, r = Math.round(lerp(34, 23, sua(fam)));
    for (let k = 0; k < 64; k++) if ((k + Math.floor(t * 10)) % 8 < 5) { const an = k / 64 * 6.283, x = Math.round(mx + Math.cos(an) * r), y = Math.round(cy + Math.sin(an) * r * 0.8); R.disco(x, y, 1.3, ROJO); R.pset(x, y + 1, hex('#7a2e2e')); } }
};

// ── 5 · el Ararat, el pico más alto ──
const aguila = (x, y, t) => { const al = Math.sin(t * 5) > 0.2 ? 1 : 0, M0 = hex('#3a2a20'), M1 = hex('#6a4a30');
  for (let i = 1; i <= 6; i++) { R.pset(x - i, y - (al ? Math.round(i * 0.5) : -Math.round(i * 0.2)), M0); R.pset(x + i, y - (al ? Math.round(i * 0.5) : -Math.round(i * 0.2)), M0); R.pset(x - i, y + 1 - (al ? Math.round(i * 0.5) : -Math.round(i * 0.2)), i < 4 ? M1 : M0); R.pset(x + i, y + 1 - (al ? Math.round(i * 0.5) : -Math.round(i * 0.2)), i < 4 ? M1 : M0); }
  R.rect(x - 1, y, x + 1, y + 1, M0); R.pset(x, y + 2, M0); R.pset(x, y - 1, BL); };
const PAL_L = { k: K, P: hex('#d8bc90'), p: hex('#a8845a'), L: hex('#f0d8c0'), W: hex('#ffffff') };
const LIEBRE_CORRE = ['.k.k........', 'kLkLk.......', 'kLkLk.......', '.kPPkkkkkk..', 'kPkPPPPPPPk.', 'kPPPPPPPPPWk', '.kkPpPPPPpk.', '..kPkkkkPPk.', '.kk.....kkk.'];
const LIEBRE_SALTA = ['.k.k........', 'kLkLk.......', 'kLkLkkkkkk..', '.kPPPPPPPPk.', 'kPkPPPPPPPWk', 'kPPPpPPPPpk.', '.kkkkkkkkPPk', 'kPk......kPk', 'kk........kk'];
const LIEBRE_MIRA = ['.k.k....', 'kLkLk...', 'kLkLk...', 'kLkLk...', '.kPPk...', 'kPkPPk..', 'kPPPPk..', '.kPPPkk.', '.kPpPPPk', '.kPpPPPk', '.kPPPPPk', 'kPPkPPWk', 'kkkkkkk.'];
const liebre = (x, y, t, o = {}) => { const g = o.sentada ? LIEBRE_MIRA : (o.salto ?? 0) > 1 ? LIEBRE_SALTA : LIEBRE_CORRE; R.dibujo(g, x - (g[0].length >> 1), y - g.length - (o.salto ?? 0), 1, PAL_L); };
const p5 = (t) => {
  const o = { camara: 'cerca', epoca: 1959 }; T.ladera(R, t, o);
  const UNO = b(23.85);
  // el banderín del «1» en la cumbre
  if (t >= UNO) { const e = Math.min(1, (t - UNO) / 0.18), cx = 204, top = Math.round(lerp(13, 1, e)), on = Math.sin(t * 7) > 0 ? 1 : 0;
    R.rect(cx - 1, top, cx + 1, 14, K); R.rect(cx, top + 1, cx, 13, BL);
    if (e >= 1) { R.poligono([[cx + 1, 0], [cx + 15, 0], [cx + 13 + on, 5], [cx + 15, 11], [cx + 1, 11]], K); R.poligono([[cx + 2, 1], [cx + 13, 1], [cx + 11 + on, 5], [cx + 13, 10], [cx + 2, 10]], ROJO); R.numero('1', cx + 3, 10, { color: BL, sombra: false }); } }
  // el águila que sube en círculos hacia la cumbre
  { const s = tramo(t, P5 - 0.3, P6 + 0.3), an = t * 1.7; aguila(Math.round(lerp(96, 176, s) + Math.cos(an) * 16), Math.round(lerp(74, 34, s) + Math.sin(an) * 5), t); }
  // la liebre cruza, se para y se pone de pie a mirar el monte
  { const s = tramo(t, P5 - 0.2, UNO - 0.25), x = Math.round(lerp(262, 150, s)), sal = s < 1 ? Math.round(Math.abs(Math.sin(s * Math.PI * 5)) * 5) : 0;
    for (let i = -6; i <= 6; i++) for (let j = 0; j <= 1; j++) if ((i + j) % 2 === 0) osc(x + i, 152 + j, 0.3);
    liebre(x, 151, t, { dir: -1, salto: sal, sentada: s >= 1 }); if (s >= 1 && t < UNO + 0.9 && t > UNO) R.bocadillo(x + 8, 128, { icono: '!' }); }
  T.laderaDelante(R, t, o);
};

// ── 6 · el relato: el barco queda posado ──
const p6 = (t) => {
  const calma = lerp(0.64, 1, sua(tramo(t, P6 - 0.2, b(27.55)))), cumbres = lerp(0.2, 1, sua(tramo(t, b(27.5), b(29.7))));
  const o = { encuadre: 'diluvio', lluvia: 0, calma, cumbres, monte: 'ararat' }; const g = T.relato(R, t, o);
  // al posarse, las ondas que se abren alrededor de la peña
  for (let k = 0; k < 3; k++) { const d = t - b(27.45) - k * 0.45; if (d > 0 && d < 1.6) { const r = 34 + d * 44; for (let an = 0; an < 6.283; an += 0.035) { const x = Math.round(150 + Math.cos(an) * r), y = Math.round(131 + Math.sin(an) * r * 0.2); if (Math.sin(an) > -0.2 && (Math.floor(an * 12) + k) % 3 && d < 1.6 - Math.abs(Math.cos(an)) * 0.5) R.pset(x, y, hex(d < 0.8 ? '#ffffff' : '#bfe0f0')); } } }
  // unas cigüeñas cruzan hacia las cumbres
  for (let k = 0; k < 4; k++) { const s = tramo(t, b(27.9) + k * 0.25, P7 + 0.4 + k * 0.25); if (s <= 0 || s >= 1) continue; const x = Math.round(lerp(-14, 262, s)) - k * 3, y = Math.round(62 - Math.sin(s * 3) * 10 + k * 5), al = Math.sin(t * 8 + k * 1.7) > 0;
    R.rect(x - 3, y, x + 4, y, K); R.pset(x + 5, y, hex('#e86a3a')); R.pset(x + 6, y, hex('#e86a3a')); R.rect(x - 2, y - 1, x + 2, y - 1, BL);
    for (let i = 0; i <= 4; i++) { R.pset(x - 1 + (i >> 1), y - (al ? i + 1 : -i - 1), i > 2 ? K : BL); R.pset(x + (i >> 1), y - (al ? i + 1 : -i - 1), K); } R.pset(x - 4, y + 1, hex('#e86a3a')); R.pset(x - 5, y + 1, hex('#e86a3a')); }
  T.relatoDelante(R, t, o);
};

// ── 7 · 1960: la revista pasa de mano en mano ──
const AZUL = '#3a5a8a', MOSTAZA = '#b8862e';
const p7 = (t) => {
  const m = t < b(34.5) ? lerp(-1, 0, sua(tramo(t, P7 + 0.15, b(32.5)))) : sua(tramo(t, b(36.15), b(37.4)));
  const g = T.papeles(R, t, { encuadre: 'mapa', camara: 'revista', manos: m }), [ix, iy] = g.agarres.izq, [dx, dy] = g.agarres.der;
  // la primera mano (manga azul) la empuja desde la izquierda y la suelta al final
  const sA = sua(tramo(t, b(35.55), b(36.1))), ax = Math.round(ix - 9 - sA * 90);
  if (sA < 1) T.brazo(R, ax - 52, iy + 24, ax, iy + 2, AZUL, 1, { codo: [ax - 28, iy + 6] });
  // su otra mano señala: primero la foto pequeña de las mulas, luego la grande de la silueta
  const dedo = clave(t, [[b(32.5), [230, 200]], [b(33.0), [g.foto[0] + 148, 150]], [b(34.6), [g.foto[0] + 148, 150]], [b(35.1), [g.foto[0] + 136, 116]], [b(35.6), [g.foto[0] + 136, 116]], [b(36.1), [250, 204]]]);
  if (t > b(32.5) && t < b(36.1)) { const tx = Math.round(dedo[0]), ty = Math.round(dedo[1] + (t > b(33.0) && t < b(34.6) ? Math.round(Math.sin(t * 9)) : 0)); T.brazo(R, tx + 30, 190, tx + 13, ty, AZUL, -1, { codo: [tx + 31, Math.min(182, ty + 30)] }); }
  // la segunda mano (manga mostaza) llega por la derecha, la coge y se la lleva
  const eC = sua(tramo(t, b(35.6), b(36.1))), cx = Math.round(lerp(340, dx + 10, eC));
  if (eC > 0) T.brazo(R, cx + 54, dy + 26, cx, dy + 2, MOSTAZA, -1, { codo: [cx + 30, dy + 7] });
};
const efectos = [[a(2.0), 'papel'], [a(3.35), 'golpecito'], [a(4.5), 'papel'], [P2 + 0.15, 'motor'], [a(7.2), 'flash'], [a(8.75), 'flash'],
  [a(11.5), 'pop'], [a(12.4), 'papel'], [a(13.35), 'papel'], [a(14.1), 'boing'], [a(14.95), 'brillo'], [a(15.4), 'lapiz'],
  [b(18.96), 'toc'], [b(20.75), 'whoosh'], [P5 + 0.2, 'viento'], [b(23.85), 'pop'], [P6 + 0.2, 'ola'], [b(27.45), 'toc'],
  [P7 + 0.3, 'papel'], [b(33.0), 'golpecito'], [b(36.2), 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { cartela: '1959', efectos, año: (t) => (t < P7 ? 1959 : 1960) });
''')

E['nx-expedicion'] = ('La expedición de 1960', '''// NX-EXPEDICION (frase 6), 1960. Tres planos:
// 1. dentro de la forma: uno mide con la mira y otro cava en la zanja (vuelan terrones); al otro lado de la loma, el
//    barreno: fogonazo, polvo y piedras; los dos se sobresaltan y la mula de las cajas da un respingo;
// 2. las tres cajas de la expedición desde arriba: una mano retira las tapas una a una («ni madera», «ni clavos»,
//    «nada»: cada pictograma con su X roja); dos manos sacan solo una piedra y un puñado de tierra, los sueltan y se
//    retiran; una mano deja sobre la tapa del medio la hoja del cuaderno con el veredicto: el contorno de la forma
//    «=» una piedra (una formación natural);
// 3. la ladera sola: los últimos salen por la derecha con la mula; pasan las estaciones (nieve, verano, nieve…) y la
//    barra del año corre de 1960 a 1977; solo un pastor cruza sin mirar.''', r'''
const e = (s) => en('expedicion', (s - 0.5) / 13.067);   // s: el segundo de la voz inglesa de hoy
const K = T.C.k, PZ = T.PIEZAS_NX, BL = hex('#f6f2e6'), ROJO = hex('#d23a2e');
const P2 = e(3.62), P3 = e(10.2);
const sua = (u) => u * u * (3 - 2 * u);
const osc = (x, y, f) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179 || (x > 274 && y < 48) || (y < 22 && x > 14 && x < 190)) return; const c = R.pget(x, y); R.pset(x, y, (0xff000000 | (Math.round(((c >>> 16) & 255) * (1 - f)) << 16) | (Math.round(((c >>> 8) & 255) * (1 - f)) << 8) | Math.round((c & 255) * (1 - f))) >>> 0); };

// ── 1 · miden, cavan y el barreno ──
const p1 = (t) => {
  const o = { camara: 'cerca', epoca: 1960 }; T.ladera(R, t, o);
  const BOOM = e(2.42), f = tramo(t, BOOM, BOOM + 1.5), susto = t >= BOOM && t < BOOM + 0.9;
  // el barreno, al otro lado de la loma: la nube de polvo y las piedras que saltan
  if (f > 0) { const d = t - BOOM, cx = 178, cy = 99, gr = Math.min(1, d / 0.45) ** 0.6 * (1 + d * 0.22), des = Math.max(0, (d - 0.95) / 0.55);
    const bola = (x, y, r, c) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const X = Math.round(x + i), Y = Math.round(y + j); if (i * i + j * j <= r * r && Y <= cy + 2 && ((X * 7 + Y * 13) % 10) / 10 >= des) R.pset(X, Y, c); } };
    const PU = [[-22, -6, 9], [-12, -16, 11], [2, -24, 12], [16, -15, 10], [25, -5, 8], [-4, -8, 12], [10, -6, 10], [-14, -30, 7], [8, -38, 8], [20, -28, 6]].map(([ax, ay, r]) => [cx + ax * gr - d * 5, cy + ay * gr - d * 9, Math.round(r * gr)]);
    for (const [x, y, r] of PU) bola(x, y, r + 1, hex('#7a5a3a')); for (const [x, y, r] of PU) bola(x, y + 1, r, hex('#b89868')); for (const [x, y, r] of PU) bola(x - 1, y - 1, r - 1, hex('#d8c090')); for (const [x, y, r] of PU) bola(x - 2, y - 3, Math.round(r * 0.5), hex('#f2e6c4'));
    if (d < 0.22) { const r = 5 + d * 70; R.disco(cx, cy - 6, r, hex('#ffe890')); R.disco(cx, cy - 6, r * 0.6, hex('#ffffff')); for (let k = 0; k < 8; k++) { const an = k * 0.785 + 0.3; R.linea(cx, cy - 6, Math.round(cx + Math.cos(an) * r * 1.8), Math.round(cy - 6 + Math.sin(an) * r * 1.8), hex('#ffc040')); } }
    else if (d < 0.5) PZ.explosion(R, cx - 2, cy - Math.round(10 * gr), { f: 0.25 + d * 0.4 });
    for (let k = 0; k < 9; k++) { const d = t - BOOM, vx = (k - 4) * 13 + (k % 2 ? 5 : -5), vy = -62 - (k * 37 % 30), x = Math.round(178 + vx * d), y = Math.round(92 + vy * d + 95 * d * d); if (y < 104 - Math.abs(k - 4) && d < 1.3) { R.rect(x - 1, y - 1, x + 1, y + 1, K); R.pset(x, y, hex(k % 2 ? '#c8a878' : '#8a6c44')); } } }
  // el que mide: avanza con la mira a rayas y la planta
  { const u = tramo(t, 0.15, e(1.25)), x = Math.round(lerp(92, 126, u));
    const m = R.actor(EL.expedicionario1NX, x, 152, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [x + 17, 136], sorpresa: susto, salto: susto ? Math.round(Math.abs(Math.sin((t - BOOM) * 7)) * 3) : 0, habla: u >= 1 && !susto && t < BOOM && Math.sin(t * 9) > 0 });
    const [mx, my] = m.mano; R.rect(mx, my - 22, mx + 2, my + 12, K); for (let j = my - 21; j <= my + 11; j++) R.pset(mx + 1, j, Math.floor((j - my + 40) / 4) % 2 ? ROJO : BL); }
  // el que cava en la zanja: la pala sube y baja, y saltan terrones
  { const c = (t * 1.5) % 1, sube = susto ? 0.4 : c < 0.5 ? sua(c * 2) : 1 - sua((c - 0.5) * 2), px = 46, py = Math.round(lerp(140, 128, sube));
    const m = R.actor(EL.expedicionario2NX, 56, 139, t, { dir: -1, sostiene: [px + 9, py - 6], sorpresa: susto });
    const [mx, my] = m.mano; R.linea(mx + 5, my - 5, mx - 7, my + 7, K); R.linea(mx + 4, my - 5, mx - 8, my + 7, hex('#a8743c')); R.poligono([[mx - 10, my + 5], [mx - 5, my + 9], [mx - 9, my + 13], [mx - 14, my + 9]], K); R.poligono([[mx - 10, my + 7], [mx - 7, my + 9], [mx - 9, my + 11], [mx - 12, my + 9]], hex('#b8c0cc'));
    if (!susto && c > 0.3 && c < 0.8) for (let k = 0; k < 4; k++) { const d = c - 0.3, x = Math.round(mx - 12 - d * (26 + k * 9)), y = Math.round(my + 6 - d * (50 + k * 8) + 150 * d * d); R.rect(x, y, x + 1, y + 1, hex(k % 2 ? '#8a6c44' : '#5a4028')); } }
  // la mula de las cajas, que da un respingo con la voladura
  { const d = t - BOOM, br = d > 0 && d < 0.7 ? Math.round(Math.abs(Math.sin(d * 9)) * 5 * (1 - d / 0.7)) : 0, x = Math.round(lerp(262, 236, sua(tramo(t, 0, e(1.6)))));
    for (let i = -13; i <= 13; i++) for (let j = 0; j <= 2; j++) if ((i + j) % 2 === 0) osc(x + i, 161 + j, 0.3);
    PZ.mula(R, x, 162 - br, { t: t < e(1.6) ? t : null, dir: -1 }); if (d > 0.1 && d < 1) R.bocadillo(x - 12, 128 - br, { icono: '!' }); }
  T.laderaDelante(R, t, o);
};

// ── 2 · las cajas: ni madera, ni clavos, nada ──
const CAQUI = '#8a7a4a';
const picto = (n, cx, cy, d) => {
  if (d < 0) return; const s = d < 0.15 ? Math.round((1 - d / 0.15) * 3) : 0, x0 = cx - 13, y0 = cy - 9 - s, x1 = cx + 13, y1 = cy + 9 - s;
  R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 2, K); R.rect(x0, y0, x1, y1, BL); R.rect(x0, y1, x1, y1 + 1, hex('#c8c0b0'));
  const y = cy - s;
  if (n === 0) { R.rect(cx - 10, y - 4, cx + 10, y + 4, K); R.rect(cx - 9, y - 3, cx + 9, y + 3, hex('#b8803e')); R.rect(cx - 9, y - 3, cx + 9, y - 3, hex('#dca860')); R.rect(cx - 7, y - 1, cx + 3, y - 1, hex('#8a5a24')); R.rect(cx - 2, y + 1, cx + 7, y + 1, hex('#8a5a24')); R.pset(cx - 7, y + 2, K); R.pset(cx + 7, y - 2, K); }   // una tabla
  else if (n === 1) { R.linea(cx - 7, y + 6, cx + 4, y - 5, K); R.linea(cx - 6, y + 6, cx + 5, y - 5, K); R.linea(cx - 6, y + 5, cx + 4, y - 5, hex('#8c90a4')); R.linea(cx + 1, y - 8, cx + 8, y - 1, K); R.linea(cx + 2, y - 8, cx + 8, y - 2, K); R.linea(cx + 2, y - 7, cx + 7, y - 2, hex('#c8ccd8')); }                                 // un clavo
  else { R.poligono([[cx - 4, y - 7], [cx + 4, y - 7], [cx + 3, y - 4], [cx + 7, y], [cx + 5, y + 7], [cx - 5, y + 7], [cx - 7, y], [cx - 3, y - 4]], K); R.poligono([[cx - 3, y - 6], [cx + 3, y - 6], [cx + 2, y - 4], [cx + 6, y], [cx + 4, y + 6], [cx - 4, y + 6], [cx - 6, y], [cx - 2, y - 4]], hex('#c8703a')); R.rect(cx - 5, y, cx + 5, y, hex('#f0c890')); R.rect(cx - 3, y + 3, cx + 3, y + 3, hex('#8a3e1e')); R.rect(cx - 2, y - 6, cx + 2, y - 6, hex('#f0a060')); }   // una vasija
  if (d > 0.3) { const g = d < 0.42 ? 1 : 0; R.icono('X', cx - 7 - g, y - 7 - g, K, K, 2); R.icono('X', cx - 6, y - 6, K, K, 2); R.icono('X', cx - 7, y - 7, ROJO, K, 2); }
};
const piedra = (x, y) => { R.poligono([[x - 6, y - 1], [x - 3, y - 6], [x + 3, y - 6], [x + 7, y - 2], [x + 5, y + 4], [x - 3, y + 5]], K); R.poligono([[x - 5, y - 1], [x - 3, y - 5], [x + 3, y - 5], [x + 6, y - 2], [x + 4, y + 3], [x - 3, y + 4]], hex('#9a9a9c')); R.poligono([[x - 3, y - 5], [x + 3, y - 5], [x + 1, y - 2], [x - 4, y - 1]], hex('#c8c8c4')); R.rect(x, y + 2, x + 3, y + 3, hex('#6e6e76')); };
// la hoja del cuaderno de campo con el veredicto: el contorno de la forma «=» una piedra (una formación natural)
const nota = (nx, ny, igual) => {
  for (let i = -25; i <= 26; i++) for (let j = -12; j <= 15; j++) if ((i + j) % 2 === 0) osc(nx + i + 3, ny + j + 3, 0.3);
  R.rect(nx - 26, ny - 14, nx + 26, ny + 13, K); R.rect(nx - 25, ny - 13, nx + 25, ny + 12, BL); R.rect(nx - 25, ny + 11, nx + 25, ny + 12, hex('#c8c0b0'));
  for (let i = -23; i <= 23; i += 4) R.rect(nx + i, ny - 13, nx + i + 1, ny - 12, hex('#8c90a4'));
  // el contorno de la forma, a lápiz: la proa en punta y la popa roma, con sus costillas
  const F = [[nx - 23, ny], [nx - 15, ny - 5], [nx - 6, ny - 6], [nx - 2, ny - 4], [nx - 1, ny], [nx - 2, ny + 4], [nx - 6, ny + 6], [nx - 15, ny + 5]];
  R.poligono(F, hex('#5a4a44')); R.poligono(F.map(([x, y]) => [Math.round(x + Math.sign(nx - 11 - x) * 1.6), Math.round(y + Math.sign(ny - y) * 1.4)]), hex('#e0b890')); for (const x of [nx - 16, nx - 12, nx - 8, nx - 5]) R.rect(x, ny - 2, x, ny + 2, hex('#a8643a'));
  if (igual > 0) { R.rect(nx + 2, ny - 3, nx + 8, ny - 2, K); R.rect(nx + 2, ny + 1, nx + 8, ny + 2, K); }
  if (igual >= 1) { piedra(nx + 17, ny); R.rect(nx + 13, ny + 7, nx + 22, ny + 7, hex('#c8c0b0')); } };
const p2 = (t) => {
  const L = [e(3.9), e(4.55), e(5.26)], D = 0.5;
  let ab = 0; L.forEach((l, n) => { const u = tramo(t, l, l + D); if (u > 0) ab = (n + 0.9 * u) / 3; });
  const o = { encuadre: 'cajas', abiertas: ab }; const g = T.mesas(R, t, o);
  // los pictogramas con su X: ni madera, ni clavos, nada hecho por nadie
  [[72, 53], [160, 59], [248, 55]].forEach(([cx, cy], n) => picto(n, cx, cy, t - L[n] - 0.3));
  // «parece una formación natural»: una mano deja sobre la tapa del medio la hoja con el veredicto
  { const u = sua(tramo(t, e(7.85), e(8.45))), sale = sua(tramo(t, e(9.15), e(9.6))); if (u > 0) { const nx = 160, ny = Math.round(lerp(206, 124, u)), toque = t > e(8.45) && t < e(8.6) ? 1 : 0;
      nota(nx, ny, t < e(8.7) ? 0 : t < e(8.95) ? 0.5 : 1); if (sale < 1) { const wx = nx + 31 + Math.round(sale * 30), wy = ny + 9 + toque + Math.round(sale * 70); T.brazo(R, wx + 22, 192, wx, wy, CAQUI, -1, { codo: [wx + 24, Math.min(186, wy + 28)] }); } } }
  // la mano que retira las tapas, una tras otra
  { const fin = e(5.95), sale = sua(tramo(t, fin, fin + 0.4)); let gx = 76, gy = 200;
    const agarre = (n) => [g.tapas[n][0] + 4, g.tapas[n][1] + 27];
    if (t < L[0]) { const [x, y] = agarre(0), u = sua(tramo(t, P2 - 0.25, L[0] - 0.05)); gx = x; gy = lerp(196, y, u); }
    else { let n = 0; for (let k = 1; k < 3; k++) if (t >= L[k] - 0.3) n = k; const [x, y] = agarre(n); gx = x; gy = y;
      if (n > 0 && t < L[n]) { const [x0, y0] = agarre(n - 1), u = sua(tramo(t, L[n] - 0.3, L[n])); gx = lerp(x0, x, u); gy = lerp(y0, y, u) + Math.sin(u * Math.PI) * 10; } }
    gy += sale * 60; gx = Math.round(gx); gy = Math.round(gy);
    if (sale < 1) T.brazo(R, gx + 30, 190, gx + 9, gy, CAQUI, -1, { codo: [gx + 31, Math.min(184, gy + 26)] }); }
  // dos manos sacan lo único que hay: una piedra y un puñado de tierra; los sueltan y se van
  { const en0 = e(6.0), su = e(6.45), cae = e(7.25), ent = sua(tramo(t, en0, su)), sal = sua(tramo(t, cae + 0.15, cae + 0.6)), alza = sua(tramo(t, su, su + 0.45)) * (1 - sua(tramo(t, cae - 0.25, cae)));
    if (ent > 0 && sal < 1) {
      const lx = Math.round(lerp(-20, 50, ent) - sal * 80), ly = Math.round(80 - alza * 16 + Math.sin(t * 5) * alza * 1.5);
      if (t < cae) piedra(lx + 13, ly - 3); else { const d = t - cae, y = Math.min(82, 62 + d * d * 260); if (d < 0.5) piedra(Math.round(lerp(-20, 50, ent)) + 13, Math.round(y)); }
      T.brazo(R, lx - 46, ly + 26, lx, ly, CAQUI, 1, { codo: [lx - 24, ly + 8] });
      const rx = Math.round(lerp(340, 270, ent) + sal * 80), ry = Math.round(84 - alza * 14 + Math.sin(t * 5 + 2) * alza * 1.5);
      if (t < cae + 0.4) { for (let i = -5; i <= 4; i++) for (let j = -4; j <= 0; j++) if (Math.abs(i) + Math.abs(j * 1.4) < 6) R.pset(rx - 7 + i, ry - 4 + j, hex((i + j) % 3 === 0 ? '#5a4028' : j < -2 ? '#a8845a' : '#8a6c44'));
        if (alza > 0.2) for (let k = 0; k < 9; k++) { const u = (t * 1.6 + k * 0.11) % 1; R.pset(rx - 9 + (k * 5) % 8, Math.round(ry + 4 + u * (alza * 16 + 4)), hex(k % 2 ? '#8a6c44' : '#5a4028')); } }
      T.brazo(R, rx + 46, ry + 26, rx, ry, CAQUI, -1, { codo: [rx + 24, ry + 8] }); } }
  T.mesasDelante(R, t, o);
};

// ── 3 · la ladera sola: pasan las estaciones (1960 → 1977) ──
const p3 = (t) => {
  const C1 = P3 + 2.4, C2 = C1 + 1.6, FIN = E.duracion - 0.25;
  const est = t < C1 ? tramo(t, P3 + 0.5, C1) : t < C2 ? tramo(t, C1, C2) : tramo(t, C2, FIN);
  const epoca = t < P3 + 0.5 + (C1 - P3 - 0.5) * 0.5 ? 1960 : 1959;   // el campamento desaparece bajo la primera nevada
  const o = { epoca, cavan: false, hora: 'estaciones', estacion: est % 1 }; T.ladera(R, t, o);
  // los últimos de la expedición salen por la derecha con la mula
  { const u = tramo(t, P3 - 0.5, P3 + 1.25), x = Math.round(lerp(226, 344, u));
    if (u < 1) { R.actor(EL.expedicionario2NX, x - 44, 163, t, { dir: 1, anda: true }); R.actor(EL.expedicionario1NX, x - 22, 162, t, { dir: 1, anda: true }); PZ.mula(R, x + 18, 163, { t, dir: 1 }); } }
  // años después, solo un pastor cruza, sin mirar
  { const u = tramo(t, C1 + 0.2, E.duracion + 0.6), x = Math.round(lerp(-18, 128, u)); if (u > 0) R.actor(EL.pastorNX, x, 162, t, { dir: 1, anda: true }); }
  T.laderaDelante(R, t, o);
};
const año = (t) => (t < P3 + 0.5 ? 1960 : Math.round(lerp(1960, 1977, tramo(t, P3 + 0.5, E.duracion - 0.5))));
const efectos = [[e(1.3), 'golpecito'], [e(2.42), 'boom'], [e(3.92), 'toc'], [e(4.57), 'toc'], [e(5.28), 'toc'], [e(7.3), 'golpecito'], [e(8.45), 'papel'], [e(8.95), 'pop'], [P3 + 1.4, 'viento']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')
