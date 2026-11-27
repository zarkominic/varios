E = {}

E['jm-nuevo'] = ('El nuevo', '''// JM-NUEVO (frases 20–21), cartela «2017». Siete planos (cortes en Robin · The writers · what kid · Nobody · And · Now):
// 1. cine/anuncio (2015): la noticia en la pantalla y los pulgares hacia abajo que se amontonan;
// 2. cine/anuncio/vela (2014): la foto en gris con las velas; sobrio: solo el cursor se aparta de la foto;
// 3. keene/guionistas 2016: los guionistas ante la caja del juego llena de polvo: uno sopla, el otro tose y se
//    encoge («?»); por delante pasa el chaval de 2017 con el móvil;
// 4. cine/salon 2017: el chaval cruza el salón mirando el móvil; el tablero del estante le suelta polvo, él mira un
//    momento («?») y sigue;
// 5. cine/salon/estante: de noche el tablero carraspea, tiembla, da un destello y se pliega en un cartucho (gag 7);
// 6. selva/claro (EXTRA): una puerta de casa plantada en la selva: el poste de la flecha gira (de la casa a la selva),
//    las lianas que entraban por la puerta se retiran y la puerta se cierra con candado;
// 7. selva/caida: ahora cae el jugador: en plena caída un destello le cambia el cuerpo (del chaval a la jugadora) y
//    saltan los tres corazones.''', r'''
const a = (s) => en('anuncio', (s - 1.5) / 17.575), c = (s) => en('cartucho', (s - 20.666) / 16.962);   // s = el segundo de la palabra en la voz inglesa
const P2 = a(5.2), P3 = a(9.94), P4 = a(16.2), P5 = c(22.53), P6 = c(28.97), P7 = c(34.08);
const K = T.C.k, PZ = T.PIEZAS_JM, B = T.C.blanco;
const movil = (m, t) => { R.rect(m[0] - 2, m[1] - 5, m[0] + 2, m[1] + 1, K); R.rect(m[0] - 1, m[1] - 4, m[0] + 1, m[1], hex(Math.sin(t * 9) > 0.6 ? '#e8f6ff' : '#a8e0ff')); };
const polvo = (x, y, u, n = 7, k0 = 0) => { if (u <= 0 || u >= 1) return; for (let k = 0; k < n; k++) { const q = k0 + k * 2.4, px = Math.round(x + Math.cos(q) * (3 + u * (8 + (k % 3) * 4))), py = Math.round(y - u * (6 + (k % 4) * 3) + Math.sin(q) * 2), r = u < 0.6 ? 1 : 0; R.rect(px - r - 1, py - r - 1, px + r + 1, py + 1, hex('#8a8272')); R.rect(px - r, py - r, px + r, py, hex(k % 2 ? '#e8e2d4' : '#c8c0b0')); } };
const cursor = (x, y) => { R.poligono([[x, y], [x, y + 10], [x + 3, y + 8], [x + 5, y + 12], [x + 7, y + 11], [x + 5, y + 7], [x + 8, y + 7]], K); R.poligono([[x + 1, y + 2], [x + 1, y + 8], [x + 3, y + 6], [x + 5, y + 6]], B); };
const p1 = (t) => { T.cine(R, t, { encuadre: 'anuncio', enfado: tramo(t, a(3.3), a(5.0)) }); };
const p2 = (t) => {
  T.cine(R, t, { encuadre: 'anuncio', camara: 'vela' });
  const u = tramo(t, a(7.2), a(9.2)), e = u * u * (3 - 2 * u); cursor(Math.round(lerp(176, 262, e)), Math.round(lerp(96, 150, e)));
};
const p3 = (t) => {
  const o = { encuadre: 'guionistas', epoca: 2016 }; T.keene(R, t, o);
  const sopla = tramo(t, a(11.9), a(12.9)), tos = t > a(12.5) && t < a(13.7), mira = t > a(15.1);
  R.actor(EL.guionista1JM, 96, 145, t, { dir: 1, habla: t < a(11.6) && Math.sin(t * 8) > 0, dedo: t > a(10.4) && t < a(11.7), sorpresa: sopla > 0 && sopla < 1, sonrisa: t > a(13.2) });
  R.actor(EL.guionista2JM, 222, 145, t, { dir: mira ? 1 : -1, sorpresa: tos, triste: t > a(13.7) && !mira, salto: tos && Math.sin(t * 22) > 0 ? 1 : 0, brazos: t > a(13.88) && t < a(14.9) });
  T.keeneDelante(R, t, o);
  PZ.cajaJuego(R, 158, 139, { polvo: 1 - 0.6 * sopla });
  polvo(166, 122, sopla, 10); polvo(200, 120, tramo(t, a(12.3), a(13.5)), 7, 1);
  if (t > a(13.88) && t < a(15.0)) R.bocadillo(232, 106, { icono: '?' });
  const u = tramo(t, a(14.7), P4 + 0.3), x = Math.round(lerp(326, 274, u));
  const n = R.actor(EL.nino2017JM, x, 176, t, { dir: -1, anda: u > 0 && u < 1, sostiene: true }); movil(n.mano, t);
};
const p4 = (t) => {
  const o = { encuadre: 'salon', epoca: 2017, chaval: false }; T.cine(R, t, o);
  const u1 = tramo(t, P4 - 0.3, a(18.5)), u2 = tramo(t, c(20.8), P5 - 0.1), x = Math.round(lerp(lerp(300, 152, u1), -24, u2));
  const cae = tramo(t, a(18.3), a(19.4)), para = u1 >= 1 && u2 <= 0, mira = para && t > a(19.2) && t < c(20.6);
  const n = R.actor(EL.nino2017JM, x, 162, t, { dir: mira ? 1 : -1, anda: !para, sostiene: !mira, sorpresa: mira && t < a(19.9) }); if (!mira) movil(n.mano, t);
  if (cae > 0 && cae < 1) for (let k = 0; k < 9; k++) { const px = 150 + (k * 7) % 23 + Math.round(Math.sin(k * 2 + t * 4) * 2), py = Math.round(lerp(66, 142, cae) - (k * 13) % 34); if (py > 66) R.rect(px, py, px + 1, py + 1, hex(k % 2 ? '#e8e2d4' : '#b8b0a0')); }
  if (mira) R.bocadillo(x + 8, 128, { icono: '?' });
  T.cineDelante(R, t, o);
};
const p5 = (t) => {
  const o = { encuadre: 'salon', camara: 'estante', cambio: tramo(t, c(25.7), c(28.1)) }; T.cine(R, t, o);
  // una polilla ronda el tablero y huye con el destello
  const h = tramo(t, c(26.5), c(27.2)), mx = Math.round(160 + Math.cos(t * 2.3) * (34 + h * 150)), my = Math.round(84 + Math.sin(t * 3.1) * 16 - h * 50), al = Math.sin(t * 30) > 0;
  if (my > 46) { R.pset(mx, my, hex('#e8e0c8')); R.pset(mx - 1, my - (al ? 1 : 0), hex('#c8c0a8')); R.pset(mx + 1, my - (al ? 1 : 0), hex('#c8c0a8')); }
};
const p6 = (t) => {
  const o = { encuadre: 'claro' }; T.selva(R, t, o);
  const gira = tramo(t, c(30.0), c(30.6)), ret = tramo(t, c(31.2), c(33.0)), cierra = tramo(t, c(33.05), c(33.45));
  const X0 = 106, X1 = 134, Y0 = 100, Y1 = 150;
  // la puerta de casa: marco, interior (papel a rayas, cuadro, lámpara, tarima) y felpudo
  for (let j = 0; j < 4; j++) R.rect(X0 - 8 - j, Y1 + 1 + j, X1 + 10 - j * 2, Y1 + 1 + j, hex('#2a6a38'));
  R.rect(X0 - 4, Y0 - 4, X1 + 4, Y1, K); R.rect(X0 - 3, Y0 - 3, X1 + 3, Y1, hex('#e8dcc0')); R.rect(X0 - 3, Y0 - 3, X1 + 3, Y0 - 3, hex('#fff6dc')); R.rect(X1 + 2, Y0 - 2, X1 + 3, Y1, hex('#b8a888')); R.rect(X0 - 3, Y0 - 2, X0 - 3, Y1, hex('#fff6dc'));
  R.rect(X0 - 1, Y0 - 1, X1 + 1, Y1, K); R.rect(X0, Y0, X1, Y1 - 1, hex('#f0d8a0')); for (let x = X0 + 2; x < X1; x += 4) R.rect(x, Y0, x, Y1 - 13, hex('#e0bc78'));
  R.rect(X0, Y1 - 13, X1, Y1 - 11, hex('#8a5a2e')); R.rect(X0, Y1 - 13, X1, Y1 - 13, hex('#b07a44')); R.rect(X0, Y1 - 10, X1, Y1 - 1, hex('#b07a44')); for (let x = X0 + 5; x < X1; x += 7) R.rect(x, Y1 - 10, x, Y1 - 1, hex('#8a5a2e')); R.rect(X0, Y1 - 5, X1, Y1 - 5, hex('#96663a'));
  R.rect(X0 + 3, Y0 + 7, X0 + 12, Y0 + 15, K); R.rect(X0 + 4, Y0 + 8, X0 + 11, Y0 + 14, hex('#7ab8e0')); R.rect(X0 + 4, Y0 + 12, X0 + 11, Y0 + 14, hex('#5a9a50')); R.pset(X0 + 9, Y0 + 10, hex('#ffe890'));
  R.rect(X1 - 10, Y0 + 18, X1 - 3, Y0 + 24, K); R.rect(X1 - 9, Y0 + 19, X1 - 4, Y0 + 23, hex(Math.sin(t * 5) > -0.8 ? '#fff0a8' : '#ffe080')); R.rect(X1 - 7, Y0 + 25, X1 - 6, Y1 - 14, hex('#5a3a1e')); R.rect(X1 - 9, Y1 - 14, X1 - 4, Y1 - 13, hex('#5a3a1e'));
  R.rect(X0 - 2, Y1 + 1, X1 + 2, Y1 + 4, K); R.rect(X0 - 1, Y1 + 1, X1 + 1, Y1 + 3, hex('#a84a3a')); for (let x = X0; x < X1 + 1; x += 3) R.pset(x, Y1 + 2, hex('#d87a5a'));
  // las lianas que entraban por la puerta: se retiran hacia los árboles
  const liana = (x0, y0, xc, yc, x1, y1, k) => {
    const f = 1 - 0.74 * Math.min(1, ret * (1 + k * 0.12)), n = 72, m = Math.round(n * f), pts = [];
    for (let i = 0; i <= m; i++) { const u = i / n, w = Math.sin(t * 2.2 + k * 2 + u * 6) * 1.6 * u + (ret > 0 && ret < 1 ? Math.sin(t * 16 + u * 9) * 1.4 * u : 0);
      pts.push([Math.round((1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * xc + u * u * x1), Math.round((1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * yc + u * u * y1 + w)]); }
    for (const [x, y] of pts) R.rect(x - 1, y - 1, x + 1, y + 2, hex('#123a22'));
    pts.forEach(([x, y], i) => { if (i % 9 === 4) { const sgn = (i / 9 | 0) % 2 ? -1 : 1, lx = x + sgn * 2, ly = y + sgn * 5; R.disco(lx, ly, 3.2, hex('#123a22')); R.disco(lx, ly, 2.2, hex('#3fae52')); R.pset(lx - 1, ly - 1, hex('#9ae07a')); R.linea(x, y, lx, ly, hex('#1c5230')); } });
    pts.forEach(([x, y], i) => { R.rect(x - 1, y, x, y + 1, hex('#2e8a42')); if (i % 3 === 0) R.pset(x - 1, y - 1, hex('#6fd070')); else R.pset(x, y - 1, hex('#3fae52')); });
    const [ax, ay] = pts[m]; R.disco(ax, ay, 4.4, hex('#123a22')); R.disco(ax, ay, 3.4, hex('#3fae52')); R.disco(ax - 1, ay - 1, 1.6, hex('#7ad070')); R.linea(ax - 2, ay + 2, ax + 2, ay - 2, hex('#d8f0a0'));
  };
  liana(28, 58, 70, 132, X0 + 9, Y0 + 30, 0); liana(182, 24, 150, 96, X0 + 16, Y0 + 16, 1); liana(236, 76, 180, 150, X0 + 21, Y0 + 38, 2);
  // la hoja de la puerta: abierta hacia fuera, de canto, y al final se cierra
  const D = hex('#b8402e'), DS = hex('#8a2a20'), DL = hex('#d86a50');
  if (cierra < 1) { const w = Math.round(10 * (1 - cierra)); R.poligono([[X0 - 1, Y0 - 1], [X0 - 2 - w, Y0 + 3], [X0 - 2 - w, Y1 + 4], [X0 - 1, Y1]], K); R.poligono([[X0 - 1, Y0 + 1], [X0 - 1 - w, Y0 + 5], [X0 - 1 - w, Y1 + 2], [X0 - 1, Y1 - 1]], DS); }
  if (cierra > 0) { const x1 = Math.round(lerp(X0, X1, cierra)); R.rect(X0, Y0, x1, Y1 - 1, D); R.rect(X0, Y0, x1, Y0, DL); R.rect(x1, Y0, x1, Y1 - 1, DS);
    if (cierra >= 1) { for (const [ya, yb] of [[Y0 + 4, Y0 + 20], [Y0 + 25, Y1 - 5]]) { R.rect(X0 + 4, ya, X1 - 4, yb, DS); R.rect(X0 + 5, ya + 1, X1 - 4, yb, D); R.rect(X0 + 5, yb, X1 - 4, yb, DL); } R.rect(X1 - 5, Y0 + 22, X1 - 3, Y0 + 24, K); R.pset(X1 - 4, Y0 + 23, hex('#ffd860')); } }
  if (t > c(33.5)) R.bocadillo(X0 + 14, Y0 - 9 - (t < c(33.62) ? 2 : 0), { icono: 'candado' });
  // el poste de la flecha: apuntaba a la puerta y se da la vuelta hacia la selva
  const cx = 168, w = Math.max(1, Math.round(13 * Math.abs(Math.cos(Math.PI * gira)))), d = gira < 0.5 ? -1 : 1, by = gira > 0 && gira < 1 ? -1 : 0, bamb = gira >= 1 ? Math.round(Math.sin((t - c(30.6)) * 14) * Math.max(0, 1 - (t - c(30.6)) * 1.6) * 2) : 0;
  R.rect(cx - 2, 120, cx + 2, 156, K); R.rect(cx - 1, 120, cx + 1, 155, hex('#8a5a2e')); R.rect(cx - 1, 120, cx - 1, 155, hex('#b07a44')); R.rect(cx - 4, 155, cx + 4, 156, hex('#2a6a38'));
  const fy = 114 + by, tip = cx + bamb + d * (w + 7);
  R.poligono([[cx + bamb - d * (w + 1), fy - 7], [cx + bamb + d * (w + 1), fy - 7], [tip + d, fy], [cx + bamb + d * (w + 1), fy + 7], [cx + bamb - d * (w + 1), fy + 7]], K);
  R.poligono([[cx + bamb - d * w, fy - 6], [cx + bamb + d * w, fy - 6], [tip - d, fy], [cx + bamb + d * w, fy + 6], [cx + bamb - d * w, fy + 6]], hex('#e8c078'));
  R.linea(cx + bamb - d * w, fy - 6, cx + bamb + d * w, fy - 6, hex('#fff0c0')); R.linea(cx + bamb - d * w, fy + 5, cx + bamb + d * w, fy + 5, hex('#b8904e'));
  if (w > 9) { const ix = cx + bamb - 3; if (d < 0) { R.poligono([[ix - 1, fy], [ix + 3, fy - 4], [ix + 7, fy]], hex('#b8402e')); R.rect(ix, fy, ix + 6, fy + 3, hex('#8a5a2e')); R.rect(ix + 2, fy + 1, ix + 4, fy + 3, hex('#ffe890')); } else { R.disco(ix + 3, fy, 3, hex('#2e7a42')); R.linea(ix, fy + 3, ix + 6, fy - 3, hex('#7ad070')); } }
  R.rect(cx - 1, fy - 1, cx + 1, fy + 1, hex('#5a3a1e'));
  T.selvaDelante(R, t, o);
};
const p7 = (t) => {
  const cae = tramo(t, P7 - 0.5, c(37.6)), o = { encuadre: 'caida', cae, figura: false }, g = T.selva(R, t, o);
  const [x, y] = g.cae ?? [196, -40], otro = t > c(35.96), fl = tramo(t, c(35.86), c(36.3));
  if (g.cae) R.actor(otro ? EL.aventureraJM : EL.nino2017JM, x - 8, y + 12, t, { dir: -1, brazos: true, sorpresa: true });
  if (g.cae && fl > 0 && fl < 1) { const r = Math.round(4 + fl * 16); if (fl < 0.35) R.disco(x, y, 13, B); R.anillo(x, y, r, B); R.anillo(x, y, r + 1, hex('#a8f0b0'));
    for (let k = 0; k < 8; k++) { const q = k * Math.PI / 4 + 0.3, px = Math.round(x + Math.cos(q) * (r + 4)), py = Math.round(y + Math.sin(q) * (r + 4)); R.rect(px - 1, py, px + 1, py, hex('#fff6a0')); R.rect(px, py - 1, px, py + 1, hex('#fff6a0')); } }
  T.selvaDelante(R, t, o);
  for (let k = 0; k < 3; k++) { const e = tramo(t, c(36.74) + k * 0.22, c(36.74) + k * 0.22 + 0.15); if (e > 0) PZ.corazonVida(R, 62 + k * 26, 66 - Math.round(Math.sin(e * Math.PI) * 4), { s: 2, t: t + k * 0.3 }); }
};
const efectos = [[a(3.02), 'bip'], [a(3.9), 'pop'], [a(12.0), 'rafaga'], [a(12.7), 'golpecito'], [a(15.2), 'bip'], [a(18.4), 'golpecito'],
  [c(23.0), 'golpecito'], [c(24.3), 'golpecito'], [c(26.6), 'brillo'], [c(27.9), 'interruptor'], [c(30.05), 'whoosh'], [c(31.3), 'rafaga'], [c(33.2), 'puerta'], [c(33.55), 'cerrojo'],
  [P7 + 0.2, 'viento'], [c(35.96), 'brillo'], [c(36.74), 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { cartela: '2017', efectos, año: (t) => (t < P2 ? 2015 : t < P3 ? 2014 : t < P4 ? 2016 : 2017) });
''')

E['jm-taquilla'] = ('La taquilla', '''// JM-TAQUILLA (frases 22–23). Seis planos (cortes en But · In the jungle · carved · Two years · Jumanji films):
// 1. cine/fachada 2017, de noche: al lado, el cine de las estrellas con su cola enorme; a la nuestra, corta, va llegando
//    gente (uno se pasa de la cola de al lado);
// 2. cine/calendario 2017→2018: las semanas se tachan una tras otra, cae la hoja del año, la cola no deja de pasar por
//    delante y el contador de latón de la pared sube hasta 960;
// 3. selva/cabana: la jugadora sube por la escala a la cabaña del árbol y descubre la tabla («!»);
// 4. selva/cabana/tabla: su mano (sola, T.mano) aparta el musgo y aparecen las rayas grabadas en la madera;
// 5. cine/sala/publico: 2019, otra: la mano enseña la entrada «2019», la sala llena con gafas da un bote y el contador
//    del borde del escenario sube a 800;
// 6. cine/contador/suma: 260 + 960 + 800 → 2027 (GOLPE); al lado, una mano deja el libro fino y un cronómetro marca
//    sus 10 minutos.''', r'''
const a = (s) => en('estrellas', (s - 0.5) / 17.753), b = (s) => en('suma', (s - 20.571) / 10.213);   // s = el segundo de la palabra en la voz inglesa
const P2 = a(5.38), P3 = a(11.9), P4 = a(15.72), P5 = b(20.57), P6 = b(25.17);
const K = T.C.k, PZ = T.PIEZAS_JM, B = T.C.blanco;
// gente de 12 px, como la de las colas del decorado (para que pise su misma acera)
const PIEL = ['#f6c290', '#d89a6a', '#a86a44', '#f0d0a8'], PELO = ['#3a2414', '#1c1222', '#a8743c', '#e8c040'], ROPA = ['#c83a3a', '#3a6ab0', '#3a8a4a', '#e8c040', '#8a4a9a', '#e8803a', '#5aa8a8'];
const mini = (x, suelo, k, t, o = {}) => {
  const dir = o.dir ?? 1, n = o.nino ? 1 : 0, anda = o.anda ? Math.floor(t * 6 + k) % 2 : 0, piel = hex(PIEL[k % 4]), pelo = hex(PELO[(k * 3 + 1) % 4]), ropa = hex(ROPA[(k * 5 + 2) % 7]), yl = suelo - 3 + n, yb = yl - 4 - anda, yh = yb - 4;
  R.rect(x - 2, yl, x + 2, suelo, K); R.rect(x - 2, yl, x - 1, suelo - 1 - (anda ? 1 : 0), hex('#2a2a3a')); R.rect(x + 1, yl, x + 2, suelo - 1 - (anda ? 0 : 1) + (o.anda ? 0 : 1), hex('#2a2a3a'));
  R.rect(x - 3, yb, x + 3, yl, K); R.rect(x - 2, yb, x + 2, yl - 1, ropa); R.pset(x - 1, yb + 1, B); if (o.bufanda) R.rect(x - 2, yb, x + 2, yb, hex(ROPA[(k + 3) % 7]));
  R.rect(x - 3, yh, x + 3, yb - 1, K); R.rect(x - 2, yh - 1, x + 2, yh - 1, K); R.rect(x - 2, yh, x + 2, yb - 1, piel); R.rect(x - 2, yh, x + 2, yh + 1, pelo); R.pset(dir > 0 ? x - 2 : x + 2, yh + 2, pelo);
  R.pset(dir > 0 ? x : x - 2, yh + 2, K); R.pset(dir > 0 ? x + 2 : x, yh + 2, K);
  if (o.gorro) { R.rect(x - 2, yh - 1, x + 2, yh, hex(ROPA[(k + 1) % 7])); R.pset(x, yh - 2, B); }
  if (o.brazo) { R.pset(x + dir * 3, yb - 1, piel); R.pset(x + dir * 3, yb, ropa); }
};
const contador = (x0, y0, v, t, brilla) => {   // un contador de latón de tres cifras (68 × 22)
  R.rect(x0, y0, x0 + 67, y0 + 21, K); R.rect(x0 + 1, y0 + 1, x0 + 66, y0 + 20, hex('#c8a040')); R.rect(x0 + 1, y0 + 1, x0 + 66, y0 + 1, hex('#f0d878')); R.rect(x0 + 1, y0 + 20, x0 + 66, y0 + 20, hex('#8a6a20')); R.rect(x0 + 66, y0 + 2, x0 + 66, y0 + 20, hex('#8a6a20'));
  R.rect(x0 + 5, y0 + 2, x0 + 62, y0 + 19, K); R.rect(x0 + 6, y0 + 3, x0 + 61, y0 + 18, hex('#f6f0dc')); R.rect(x0 + 6, y0 + 3, x0 + 61, y0 + 4, hex('#c8c0a8')); R.rect(x0 + 6, y0 + 17, x0 + 61, y0 + 18, hex('#d8d0b8'));
  for (const xs of [24, 43]) R.rect(x0 + xs, y0 + 3, x0 + xs, y0 + 18, hex('#8a8272'));
  for (const xb of [2, 64]) for (const yb of [3, 17]) { R.pset(x0 + xb, y0 + yb, hex('#5e4a14')); R.pset(x0 + xb + 1, y0 + yb, hex('#fff0a8')); }
  R.numero(String(Math.round(v)).padStart(3, '0'), x0 + 34, y0 + 19, { tam: 16, centro: true, rampa: ['#5a4a5a', '#3a2a3a', '#2a1a2a', '#1c1222'].map(hex), sombra: false });
  if (brilla > 0 && brilla < 1) { const r = Math.round(brilla * 10); for (const [sx, sy] of [[3, 0], [64, 2], [34, -3]]) { R.rect(x0 + sx - r, y0 + sy, x0 + sx + r, y0 + sy, hex('#fff6a0')); R.rect(x0 + sx, y0 + sy - r, x0 + sx, y0 + sy + r, hex('#fff6a0')); } }
};
const palomitas = (m) => { R.rect(m[0] - 3, m[1] - 5, m[0] + 3, m[1] + 2, K); R.rect(m[0] - 2, m[1] - 4, m[0] + 2, m[1] + 1, B); R.rect(m[0] - 2, m[1] - 4, m[0] - 2, m[1] + 1, hex('#c83a3a')); R.rect(m[0], m[1] - 4, m[0], m[1] + 1, hex('#c83a3a')); R.rect(m[0] + 2, m[1] - 4, m[0] + 2, m[1] + 1, hex('#c83a3a')); R.rect(m[0] - 3, m[1] - 7, m[0] + 3, m[1] - 5, hex('#fff0a8')); R.pset(m[0] - 1, m[1] - 8, hex('#fff0a8')); R.pset(m[0] + 2, m[1] - 8, hex('#ffe070')); R.pset(m[0], m[1] - 6, hex('#e8c040')); };
const p1 = (t) => {
  const o = { encuadre: 'fachada', epoca: 2017, rival: true, cola: 0.2 }; T.cine(R, t, o);
  // los que van llegando a nuestra cola (el último se pasa de la de al lado)
  const llega = (k, t0, t1, xa, xb, s, op = {}) => { const u = tramo(t, t0, t1); mini(Math.round(lerp(xa, xb, u)), s, k, t, { dir: xb > xa ? 1 : -1, anda: u > 0 && u < 1, ...op }); };
  llega(3, 0.2, a(2.6), 30, 138, 144, { gorro: true }); llega(8, 0.2, a(2.6) + 0.25, 20, 130, 143, { nino: true, bufanda: true });
  llega(5, a(1.4), a(4.2), -6, 122, 144, { bufanda: true });
  const v = tramo(t, a(3.46), a(5.0)); llega(11, a(3.46), a(5.0), 252, 196, 147, { gorro: true, brazo: v > 0.2 }); llega(6, a(3.7), a(5.2), 262, 206, 148, { nino: true });
  T.cineDelante(R, t, o);
};
const FILA = ['nino2017JM', 'vecina2JM', 'vecino1JM', 'senoraJM', 'chico1JM', 'criticoJM', 'vecina3JM', 'chico2JM', 'tecnicoFX1JM', 'tecnicoFX2JM'];
const p2 = (t) => {
  const voltea = tramo(t, a(9.0), a(9.6)), o = { encuadre: 'calendario', de: 2017, a: 2018, u: voltea }, g = T.cine(R, t, o); p2.g = g;
  // las semanas que se tachan (en la hoja de 2017 y luego en la de 2018)
  const t0 = voltea <= 0 ? P2 + 0.5 : a(9.75), paso = voltea <= 0 ? 0.6 : 0.5;
  if (voltea <= 0 || voltea >= 1) for (let j = 0; j < 5; j++) { const e = tramo(t, t0 + j * paso, t0 + j * paso + 0.3); if (e <= 0) break; const y = 81 + j * 10, x1 = Math.round(lerp(119, 202, e));
    for (let x = 119; x <= x1; x++) { const w = Math.round(Math.sin(x * 0.5 + j) * 0.8); R.rect(x, y + w, x, y + w + 1, hex('#c83a3a')); } if (e < 1) { R.rect(x1 + 1, y - 6, x1 + 3, y, K); R.rect(x1 + 1, y - 5, x1 + 2, y - 1, hex('#c83a3a')); } }
  // el contador de la pared, bajo la repisa
  const v = 960 * (1 - (1 - tramo(t, a(7.4), a(10.3))) ** 2); contador(24, 109, v, t, tramo(t, a(10.3), a(10.8)));
  R.rect(40, 131, 41, 137, hex('#e8dcc0')); R.rect(38, 137, 44, 141, K); R.rect(39, 138, 43, 140, hex('#e8a080')); R.pset(41, 139, K);
  // la cola que no se acaba: pasa por delante, hacia el cine
  for (let k = 0; k < 18; k++) { const x = Math.round(296 - k * 34 + (t - P2) * 30); if (x < -22 || x > 326) continue; const con = k % 3 !== 1;
    const n = R.actor(EL[FILA[k % 10]], x, 173 + (k % 2), t, { dir: 1, anda: true, sostiene: con, sonrisa: k % 2 === 0 }); if (con) palomitas(n.mano); }
  T.cineDelante(R, t, o);
};
const p3 = (t) => {
  const o = { encuadre: 'cabana' }; T.selva(R, t, o);
  const sube = tramo(t, P3 + 0.1, a(13.3)), u = tramo(t, a(13.3), a(14.3)), ve = u >= 1;
  const x = Math.round(lerp(238, 204, u)), y = Math.round(lerp(166, 118, sube));
  R.actor(EL.aventureraJM, x, y, t, { dir: -1, anda: (sube > 0 && sube < 1) || (u > 0 && u < 1), dedo: ve && t > a(14.6), sorpresa: ve && t < a(15.0), sonrisa: ve });
  T.selvaDelante(R, t, o);
  if (ve && t > a(14.4)) R.bocadillo(x + 8, 84 - (t < a(14.55) ? 2 : 0), {});
};
const MUSGO = []; for (let r = 0; r < 2; r++) for (let i = 0; i < 16; i++) MUSGO.push([90 + i * 9.6 + ((i * 7 + r * 3) % 5) - 2, (r ? 104 : 75) + ((i * 11 + r * 5) % 13) - 6, 6 + ((i * 5 + r) % 4), r]);
const p4 = (t) => {
  const o = { encuadre: 'cabana', camara: 'tabla', graba: 1 }; T.selva(R, t, o);
  const T1 = [P4 + 0.3, a(17.5)], T2 = [a(17.7), a(19.3)], u1 = tramo(t, T1[0], T1[1]), u2 = tramo(t, T2[0], T2[1]), fila = u1 < 1 ? 0 : 1;
  const hx = Math.round(fila ? lerp(82, 240, u2) : lerp(82, 240, u1)), hy = (fila ? 105 : 76) + Math.round(Math.sin(t * 9) * 3);
  // el musgo que tapaba las rayas: se va al pasar la mano, y caen las briznas
  for (const [mx, my, r, f] of MUSGO) { const tq = f ? lerp(T2[0], T2[1], (mx - 82) / 158) : lerp(T1[0], T1[1], (mx - 82) / 158);
    if (t < tq) { for (let dy = -r - 2; dy <= r + 2; dy++) for (let dx = -r - 2; dx <= r + 2; dx++) { const px = Math.round(mx) + dx, py = my + dy, h = (((px * 73856093) ^ (py * 19349663)) >>> 0) % 97 / 97; if (Math.hypot(dx, dy * 1.25) < r - 1.2 + h * 3.2) R.pset(px, py, hex(h > 0.86 ? '#6a8040' : h < 0.2 ? '#3c5226' : (px + py) % 3 ? '#4a6230' : '#546c36')); } }
    else if (t < tq + 0.9) { const q = t - tq; for (let k = 0; k < 3; k++) R.rect(Math.round(mx + (k - 1) * 4 + Math.sin(q * 8 + k) * 2), Math.round(my + q * q * 70 + k * 3), Math.round(mx + (k - 1) * 4 + Math.sin(q * 8 + k) * 2) + 1, Math.round(my + q * q * 70 + k * 3) + 1, hex(k % 2 ? '#42582a' : '#5a743a')); } }
  const sale = tramo(t, a(19.4), a(20.1)), ax = hx + Math.round(sale * sale * 110), ay = hy + Math.round(sale * 30);
  if (sale < 1) T.mano(R, ax + 4, ay + 1, 1, '#6e7e4a', { sinManga: true });
};
const p5 = (t) => {
  const bote = t > b(23.75) && t < b(24.35), o = { encuadre: 'sala', camara: 'publico', lleno: 1, gafas: true, susto: bote }; T.cine(R, t, o); T.cineDelante(R, t, o);
  // el contador de esta, en el borde del escenario
  R.rect(232, 170, 290, 173, K); R.rect(233, 171, 289, 172, hex('#8a6a20')); contador(227, 148, 800 * (1 - (1 - tramo(t, b(22.4), b(23.5))) ** 2), t, tramo(t, b(23.5), b(24.0)));
  // la entrada de 2019, en la mano
  const sube = tramo(t, P5 + 0.1, P5 + 0.6), y = Math.round(lerp(200, 157, sube * (2 - sube))) + Math.round(Math.sin(t * 2.4) * 1), x = 30;
  R.rect(x, y - 13, x + 92, y + 13, K); R.rect(x + 1, y - 12, x + 91, y + 12, hex('#f6e8b8')); R.rect(x + 1, y - 12, x + 91, y - 11, hex('#fff6dc')); R.rect(x + 1, y + 11, x + 91, y + 12, hex('#d8c890'));
  for (const xm of [x, x + 92]) for (let j = y - 9; j < y + 12; j += 6) R.rect(xm - 1, j, xm + 1, j + 2, hex('#5e1622'));
  for (let j = y - 11; j < y + 12; j += 3) R.pset(x + 72, j, hex('#a89860')); R.rect(x + 5, y - 10, x + 68, y - 9, hex('#c83a3a')); R.rect(x + 5, y + 9, x + 68, y + 10, hex('#c83a3a'));
  R.numero('2019', x + 38, y + 8, { tam: 16, centro: true, rampa: ['#5a4a5a', '#3a2a3a', '#2a1a2a', '#1c1222'].map(hex), sombra: false });
  PZ.cartucho(R, x + 82, y + 10, {});
  if (t > b(21.57)) { R.disco(x + 82, y - 8, 2, hex('#5e1622')); const q = t - b(21.57); if (q < 0.5) for (let k = 0; k < 4; k++) R.pset(Math.round(x + 82 + Math.cos(k * 1.6) * q * 22), Math.round(y - 8 - q * 20 + q * q * 60 + Math.sin(k * 1.6) * 4), hex('#f6e8b8')); }
  T.brazo(R, -8, y + 30, x + 1, y + 15, '#c83a3a', 1, { codo: [8, y + 26] });
};
const p6 = (t) => {
  const o = { encuadre: 'contador', camara: 'suma', cifras: [260, 960, 800], ver: 1 + (t > b(25.55) ? 1 : 0) + (t > b(25.95) ? 1 : 0), total: tramo(t, b(26.4), b(27.3)), totalCifra: 2027 }; T.cine(R, t, o);
  // el libro fino, que deja una mano, y encima el despertador con sus diez minutos
  const llega = tramo(t, b(28.6), b(29.2)), e = llega * (2 - llega), bx = Math.round(lerp(352, 278, e)), se = tramo(t, b(29.3), b(29.9));
  if (llega > 0) { for (let j = 0; j < 3; j++) R.rect(bx - 27 + j, 177 + j, bx + 31, 177 + j, hex('#2a0a14')); PZ.libroFino(R, bx, 176, { s: 2 });
    if (se < 1) T.brazo(R, 334 + Math.round(se * 30), 172, bx + 26 + Math.round(se * 44), 158, '#3a3a40', -1, { codo: [bx + 46 + Math.round(se * 44), 170], sombra: false }); }
  const cl = tramo(t, b(29.45), b(29.75)), diez = tramo(t, b(29.97), b(30.7));
  if (cl > 0) { const cx = 296, cy = 84 - Math.round((1 - cl) * (1 - cl) * 30), r = 12, tic = diez > 0 && diez < 1 ? Math.round(Math.sin(t * 40)) : 0;   // el cronómetro, tumbado en el terciopelo
    R.disco(cx + 2, cy + 3, r + 3, hex('#2a0a14')); R.rect(cx - 2, cy - r - 8 + tic, cx + 2, cy - r - 2, K); R.rect(cx - 1, cy - r - 7 + tic, cx + 1, cy - r - 3, hex('#f0d878')); R.rect(cx - 4, cy - r - 10 + tic, cx + 4, cy - r - 8 + tic, K); R.rect(cx - 3, cy - r - 9 + tic, cx + 3, cy - r - 9 + tic, hex('#f0d878'));
    R.disco(cx, cy, r + 3, K); R.disco(cx, cy, r + 2, hex('#c8a040')); R.anillo(cx, cy, r + 2, hex('#f0d878')); R.disco(cx, cy, r, K); R.disco(cx, cy, r - 1, hex('#f6f2ea'));
    for (let j = -r; j <= r; j++) for (let i = 0; i <= r; i++) { const d = Math.hypot(i, j), ang = Math.atan2(i, -j); if (d < r - 1.5 && ang >= 0 && ang <= diez * Math.PI / 3) R.pset(cx + i, cy + j, hex('#f0a030')); }
    for (let k = 0; k < 12; k++) { const q = k * Math.PI / 6; R.pset(Math.round(cx + Math.sin(q) * (r - 2.5)), Math.round(cy - Math.cos(q) * (r - 2.5)), K); }
    const q = diez * Math.PI / 3; R.linea(cx, cy, Math.round(cx + Math.sin(q) * (r - 3)), Math.round(cy - Math.cos(q) * (r - 3)), hex('#c83a3a')); R.linea(cx + 1, cy, Math.round(cx + 1 + Math.sin(q) * (r - 3)), Math.round(cy - Math.cos(q) * (r - 3)), hex('#c83a3a')); R.rect(cx - 1, cy - 1, cx + 1, cy + 1, K);
    if (diez > 0) R.numero('10', 262, 93 - (diez < 0.15 ? 2 : 0), { tam: 16, centro: true }); }
};
const efectos = [[0.5, 'coche'], [a(2.6), 'publico'], [P2 + 0.6, 'lapiz'], [P2 + 1.8, 'lapiz'], [a(9.1), 'papel'], [a(10.3), 'campana'], [P3 + 0.4, 'golpecito'], [a(14.45), 'pop'],
  [P4 + 0.5, 'rafaga'], [a(17.9), 'rafaga'], [P5 + 0.3, 'papel'], [b(21.57), 'sello'], [b(23.5), 'campana'], [b(23.8), 'publico'], [P6 + 0.1, 'tic'], [b(27.3), 'boom'],
  [b(29.2), 'toc'], [b(29.97), 'tic'], [b(30.7), 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: (t) => (t < P2 ? 2017 : t < P3 ? (p2.g?.año ?? 2017) : t < P5 ? 2017 : 2019) });
''')
