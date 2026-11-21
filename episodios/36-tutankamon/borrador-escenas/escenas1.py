E = {}
E['tu-gancho'] = ('Gancho', '''// TU-GANCHO (frases 1–2), sin cartela. Siete planos, cortados en la palabra inglesa:
// 1. (0) la pared norte pintada, de cerca: en el golpe de música asoma la RAYA recta del dintel; un turista entra, se
//    para debajo, se sorprende en «walls» y la señala en «chamber»;
// 2. («there could be rooms») el corte del monte: la tumba dentro y, en «rooms», salen las manchas; en «3,300» la cifra;
// 3. («And this year») la cumbre con la perforadora: la geofísica llega con el permiso y lo alza en «permission»; en
//    «drill» el motor hace un amago y el técnico lo señala; en «find out», la «?» de la espera;
// 4. («Along the way») la segunda puerta de 1922: la mano de Carter acerca la vela al hueco («hole») y el oro brilla
//    («candlelight»);
// 5. («newspapers») la calle de El Cairo, 1923: el chaval alza el periódico de la pirámide y grita en «curse» (lo alza en «newspapers»);
// 6. («three radars») la pizarra de Atom: tres radares de mano dibujados uno a uno, ✓ ✗ ✗ (2015, 2016, 2018); sus
//    tres técnicos debajo levantan el dedo cuando sale su respuesta;
// 7. («scientists») la cumbre con la rejilla y el gravímetro: el geofísico llega al trípode, la geofísica lee el
//    portátil; en «hollow» la aguja tiembla y los dos se sorprenden.''', r'''
const TU = T.ELENCO_TU, PZ = T.PIEZAS_TU;
const wm = (s) => en('muro', (s - 0.5) / 15.75), wc = (s) => en('camino', (s - 17.781) / 12.08);
const ease = (u) => u * u * (3 - 2 * u);
const K = hex('#17151d'), BL = hex('#f6f2ea'), ROJO = hex('#d8402c');
// el globo del grito o de la duda (sin letras: «!» o «?»)
const globo = (x, y, ic = '!', c = ROJO) => { R.disco(x, y, 7, K); R.disco(x, y, 6, BL); R.pset(x - 5, y + 7, K); R.pset(x - 4, y + 6, BL); R.pset(x - 6, y + 8, K); R.icono(ic, x - (ic === '?' ? 2 : 1), y - 4, c, null, 1); };
const P2 = wm(6.5), P3 = wm(10.95), P4 = wc(17.45), P5 = wc(21.95), P6 = wc(24.45), P7 = wc(26.9);
// 1. la pared pintada: la raya sale con el golpe de música («muro», ~0,6 s) y el turista la descubre
const p1 = (t) => {
  const ry = ease(tramo(t, 0.2, 0.75));
  const g = T.tumba(R, t, { encuadre: 'pintada', camara: 'pared', raya: ry }), [qx0, qy, qx1] = g.puerta || [150, 52, 224];
  // la raya, que se lea a 640 px: su sombra debajo y un brillo que la recorre con el golpe y otra vez en «walls»
  if (ry > 0) { const qm = (qx0 + qx1) / 2, qh = (qx1 - qx0) / 2, x0 = Math.round(qm - qh * ry), x1 = Math.round(qm + qh * ry);
    for (let x = x0; x <= x1; x++) { R.pset(x, qy - 1, hex('#ffe8a8')); R.pset(x, qy + 1, hex('#5a3410')); if ((x & 1) === 0) R.pset(x, qy + 2, hex('#a8742c')); }
    for (const [a, b] of [[0.45, 1.6], [wm(3.9), wm(4.9)]]) { const s = tramo(t, a, b); if (s > 0 && s < 1) { const cx = lerp(qx0 - 4, qx1 + 4, s); for (let x = Math.round(cx) - 7; x <= Math.round(cx) + 7; x++) if (x >= x0 && x <= x1) { R.pset(x, qy, hex('#fff8e0')); if (Math.abs(x - cx) < 3) { R.pset(x, qy - 2, hex('#fff2c0')); R.pset(x, qy + 1, hex('#fff2c0')); } } } } }
  const u = tramo(t, 1.0, wm(3.5)), x = Math.round(lerp(-20, 118, ease(u)));
  R.actor(EL.turista1, x, 172, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > wm(3.95) && t < wm(5.4), dedo: t > wm(5.6), sonrisa: t > wm(6.0) });
  const v = tramo(t, wm(4.3), wm(6.3)), x2 = Math.round(lerp(330, 236, ease(v)));
  R.actor(EL.turista2, x2, 172, t, { dir: -1, anda: v > 0 && v < 1, sorpresa: t > wm(6.2) });
  if (t > wm(3.95) && t < wm(5.0)) globo(x + 16, 136, '!');
  T.tumbaDelante(R, t, { encuadre: 'pintada', camara: 'pared' });
};
// 2. el corte del monte: las manchas salen en «rooms»; «3300» en «3,300»
const p2 = (t) => {
  T.ladera(R, t, { encuadre: 'corte', anomalias: ease(tramo(t, wm(7.1), wm(8.4))), broca: 0 });
  const n = tramo(t, wm(8.95), wm(9.35)); if (n > 0) R.numero('3300', 257, Math.round(lerp(150, 146, n)), { tam: 16, centro: true });
  T.laderaDelante(R, t, { encuadre: 'corte' });
};
// 3. la perforadora espera: el permiso, el amago del motor en «drill», la «?» en «find out»
const p3 = (t) => {
  const amago = 0.1 * (ease(tramo(t, wm(13.35), wm(13.75))) - ease(tramo(t, wm(14.9), wm(15.4))));
  T.ladera(R, t, { encuadre: 'perforadora', broca: amago });
  const u = tramo(t, P3 + 0.2, wm(12.3)), x = Math.round(lerp(-20, 64, ease(u))), alza = t > wm(12.7) && t < wm(14.2);
  const a = R.actor(TU.geofisica2TU, x, 146, t, { dir: 1, anda: u > 0 && u < 1, sostiene: alza ? [x + 18, 112] : true, habla: alza && Math.sin(t * 9) > 0 });
  const [mx, my] = a.mano; R.rect(mx - 4, my - 10, mx + 4, my + 1, K); R.rect(mx - 3, my - 9, mx + 3, my, BL);
  for (let j = 0; j < 3; j++) R.rect(mx - 2, my - 7 + j * 2, mx + 2, my - 7 + j * 2, hex('#9aa4b4'));
  R.actor(TU.geofisico1TU, 104, 146, t, { dir: 1, dedo: t > wm(13.4) && t < wm(14.6), habla: t > wm(15.0) && t < wm(15.6) && Math.sin(t * 9) > 0 });
  if (t > wm(15.6)) globo(116, 106, '?', hex('#3a6ac8'));
  T.laderaDelante(R, t, { encuadre: 'perforadora' });
};
// 4. la vela de Carter se acerca al hueco y el oro brilla
const p4 = (t) => { const o = { encuadre: 'pasillo', camara: 'hueco', abierta: 1, acerca: ease(tramo(t, wc(18.2), wc(20.75))), oro: 0.6 * ease(tramo(t, wc(20.7), wc(21.7))) }; T.tumba(R, t, o); T.tumbaDelante(R, t, o); };
// 5. El Cairo, 1923: el chaval alza el periódico y grita en «curse»
const p5 = (t) => {
  T.cairo(R, t, { encuadre: 'calle', gente: 0.7 });
  const v = tramo(t, P5, P6 + 0.2), cx = Math.round(lerp(236, 150, v));
  R.actor(TU.obrero2TU, cx, 160, t, { dir: -1, anda: true });
  const al = ease(tramo(t, wc(22.25), wc(22.7))), grita = t > wc(23.8);
  const a = R.actor(TU.vendedorTU, 110, 154, t, al > 0 ? { dir: 1, sostiene: [Math.round(lerp(126, 130, al)), Math.round(lerp(136, 118, al)) - (grita ? Math.round(Math.abs(Math.sin(t * 6)) * 2) : 0)], habla: Math.sin(t * 11) > -0.2, sorpresa: grita } : { dir: 1, habla: Math.sin(t * 11) > -0.2 });
  if (al > 0) { const [mx, my] = a.mano; PZ.periodico(R, mx + 2 + Math.round((1 - al) * 6), my + 6, { icono: 'piramide' }); }
  if (grita) globo(134, 112 - Math.round(Math.abs(Math.sin(t * 8)) * 2), '!');
  T.cairoDelante(R, t, { encuadre: 'calle', gente: 0.7 });
};
// 6. la pizarra: tres radares y tres respuestas, ✓ ✗ ✗; cada técnico levanta el dedo cuando sale la suya
const tr6 = (t) => tramo(t, P6 + 0.05, P7 - 0.25);
const p6 = (t) => {
  const tr = tr6(t), g = T.hoy(R, t, { encuadre: 'pizarra', n: 3, respuestas: ['✓', '✗', '✗'], traza: tr });
  [[TU.watanabeTU, 86], [TU.natgeoTU, 153], [TU.porcelliTU, 221]].forEach(([d, x], i) => {
    const sale = tr * 3 - i >= 0.85; R.actor(d, x, 162, t, { dir: i === 2 ? -1 : 1, dedo: sale, habla: sale && Math.sin(t * 8 + i) > 0.3 });
  });
  T.hoyDelante(R, t, { encuadre: 'pizarra' });
};
// 7. el gravímetro: llega el geofísico, la geofísica lee el portátil, la aguja tiembla en «hollow»
const p7 = (t) => {
  const tb = tramo(t, wc(29.3), wc(29.6)) - tramo(t, wc(30.6), wc(31.2));
  T.ladera(R, t, { encuadre: 'gravimetro', tiembla: 0.7 * tb });
  const u = tramo(t, P7 + 0.1, wc(28.0)), x = Math.round(lerp(-20, 116, ease(u))), sor = t > wc(29.45) && t < wc(30.6);
  R.actor(TU.geofisico1TU, x, 151, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: sor, dedo: t > wc(30.6) });
  R.actor(TU.geofisica2TU, 196, 151, t, { dir: -1, habla: t > wc(27.7) && t < wc(28.5) && Math.sin(t * 10) > 0, sorpresa: sor, sonrisa: t > wc(30.8) });
  if (sor) globo(214, 112, '!');
  T.laderaDelante(R, t, { encuadre: 'gravimetro', tiembla: 0.7 * tb });
};
const año = (t) => t < P4 ? 2026 : t < P5 ? 1922 : t < P6 ? 1923 : t < P7 ? [2015, 2016, 2018][Math.min(2, Math.floor(tr6(t) * 3))] : 2024;
const efectos = [[wm(7.2), 'bip'], [wm(12.75), 'papel'], [wm(13.4), 'motor'], [wc(20.8), 'brillo'], [wc(22.3), 'papel'], [P6 + 0.1, 'lapiz'], [P6 + 0.05 + (P7 - 0.3 - P6) / 3, 'lapiz'], [P6 + 0.05 + 2 * (P7 - 0.3 - P6) / 3, 'lapiz'], [wc(29.4), 'tic']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')

E['tu-hola'] = ('Hola', '''// TU-HOLA (frase 3), sin cartela. Un plano (gag 1): la pared de papel pintado egipcio del estudio, de cerca. En «I'm
// Atom» Atom baja de su esquina con el estetoscopio puesto (las olivas a los lados); en «explain» da un golpecito en
// la pared con la mano y apoya la campana; desde el otro lado le devuelven tres toques (la lámina de la barca salta en
// cada uno) y Atom da un respingo con «!» y luego «?»; en «Let's find out» vuelve de un salto a su esquina.''', r'''
const PZ = T.PIEZAS_TU, K = hex('#17151d'), BL = hex('#f6f2ea'), ROJO = hex('#d8402c'), AZ = hex('#3a6ac8');
const ease = (u) => u * u * (3 - 2 * u);
const destello = (x, y, r, c = BL) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } };
const atomAbajo = (ax, ay, t, o = {}) => {
  const r = o.r ?? 12, rr = r + 7; ax = Math.round(ax); ay = Math.round(ay);
  for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { const g = 1 - Math.hypot(i, j) / rr; if (g > 0.3 && ((i + j) & 1 || g > 0.6)) R.pset(ax + i, ay + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(ax, ay, t, { r, orbita: R.PAL.ATOM[7], energia: o.e ?? 0.4, vel: 1 });
};
const globo = (x, y, ic, c) => { R.disco(x, y, 7, K); R.disco(x, y, 6, BL); R.pset(x - 5, y + 7, K); R.pset(x - 4, y + 6, BL); R.icono(ic, x - (ic === '?' ? 2 : 1), y - 4, c, null, 1); };
R.companero = () => {};   // Atom baja al plano y al final vuelve a su esquina
const wh = (s) => en('hola', (s - 0.5) / 4.588);
const BAJA = wh(0.55), LLEGA = wh(1.45), TOC = wh(1.75), APOYA = wh(2.05), G0 = wh(2.25), G1 = wh(5.5), VUELVE = wh(4.95);
const toque = (k) => G0 + (G1 - G0) * [0.05, 0.35, 0.65][k];
const p1 = (t) => {
  const g = T.hoy(R, t, { encuadre: 'estudio', camara: 'pared', golpe: tramo(t, G0, G1) });
  const [px, py] = g.punto || [150, 92];
  // dónde está Atom: en su esquina, baja en «I'm Atom», se arrima a la pared y vuelve en «Let's find out»
  const AX = px + 10, AY = py - 44, esq = [297, 24];
  const b = ease(tramo(t, BAJA, LLEGA)), v = ease(tramo(t, VUELVE, E.duracion - 0.2));
  let ax = lerp(esq[0], AX, b) , ay = lerp(esq[1], AY, b) - Math.sin(b * Math.PI) * 12;
  if (v > 0) { ax = lerp(AX, esq[0], v); ay = lerp(AY, esq[1], v) - Math.sin(v * Math.PI) * 16; }
  // respingo en cada toque del otro lado
  let sal = 0; for (let k = 0; k < 3; k++) { const d = t - toque(k); if (d > 0 && d < 0.4) sal = Math.max(sal, Math.round(Math.sin(d / 0.4 * Math.PI) * (k === 0 ? 7 : 4))); }
  ay -= sal; if (b > 0 && b < 1 || v > 0) {} else ay += Math.round(1.4 * Math.sin(2 * Math.PI * t / 2.6));
  // el estetoscopio: puesto en Atom (las olivas a los lados); la campana, en la mano, que llama y luego se apoya en la pared
  const enPared = t > APOYA && v === 0, llama = t > TOC - 0.25 && t < APOYA;
  let hx = ax - 6, hy = ay + 30;
  if (b >= 1 && v === 0) { const w = ease(tramo(t, LLEGA - 0.1, TOC - 0.2)); hx = lerp(ax - 6, px + 12, w); hy = lerp(ay + 30, py + 2, w);
    if (llama) { const d = (t - (TOC - 0.25)) / 0.5; hx = px + 10 + Math.round(Math.max(0, Math.sin(d * Math.PI * 2)) * 4); hy = py + 1; }
    if (enPared) { hx = px + 15; hy = py + 1; } }
  const bx = enPared ? px : hx - 13, by = enPared ? py : hy;
  // el tubo, de las olivas (en Atom) a la campana
  if (t > BAJA && t < E.duracion - 0.55) {
    const ox = Math.round(ax), oy = Math.round(ay + 6);
    R.linea(ox - 15, oy - 6, ox - 6, oy + 6, hex('#9aa0a8')); R.linea(ox + 15, oy - 6, ox + 6, oy + 6, hex('#9aa0a8')); R.linea(ox - 14, oy - 6, ox - 5, oy + 6, hex('#5a606c')); R.linea(ox + 14, oy - 6, ox + 5, oy + 6, hex('#5a606c'));
    R.disco(ox - 15, oy - 7, 1, K); R.disco(ox + 15, oy - 7, 1, K);
    const n = 24; let qx = ox, qy = oy + 6; for (let i = 1; i <= n; i++) { const u = i / n, x = lerp(ox, bx + 7, u), y = lerp(oy + 6, by, u) + Math.sin(u * Math.PI) * 10; R.linea(Math.round(qx), Math.round(qy), Math.round(x), Math.round(y), K); R.linea(Math.round(qx) + 1, Math.round(qy), Math.round(x) + 1, Math.round(y), hex('#4a4a56')); qx = x; qy = y; }
    T.mano(R, Math.round(hx), Math.round(hy), -1, '#5a8ad0', { sinManga: true });
    // la campana, encima de los dedos: aro oscuro, metal, el disco claro y su brillo
    const X = Math.round(bx), Y = Math.round(by); R.disco(X, Y, 6, K); R.disco(X, Y, 5, hex('#8a909c')); R.disco(X - 1, Y - 1, 4, hex('#c8ced8')); R.disco(X, Y, 2, hex('#eef2f6')); R.pset(X - 2, Y - 3, BL); R.rect(X + 4, Y - 1, X + 7, Y + 1, K); R.rect(X + 5, Y, X + 7, Y, hex('#8a909c'));
    if (enPared) for (let k = 0; k < 3; k++) R.pset(X - 7 - k, Y + 5 + k, hex('#a08860'));
  }
  atomAbajo(ax, ay, t, { r: Math.round(lerp(10, 13, b) - 3 * v), e: sal > 0 ? 0.9 : 0.4 });
  for (const [tt, xx, yy] of [[BAJA, 297, 40], [E.duracion - 0.55, ax, ay + 20]]) { const d = (t - tt) / 0.35; if (d > 0 && d < 1) for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4, q = 4 + d * 10; R.pset(Math.round(xx + Math.cos(an) * q), Math.round(yy + Math.sin(an) * q), BL); } }
  if (t > toque(0) && t < toque(1) - 0.1) globo(Math.round(ax) + 24, Math.round(ay) - 4, '!', ROJO);
  if (t > toque(2) && t < VUELVE) globo(Math.round(ax) + 24, Math.round(ay) - 4, '?', AZ);
  if (llama) destello(px + 2, py - 2, 3);
  T.hoyDelante(R, t, { encuadre: 'estudio', camara: 'pared' });
};
const efectos = [[BAJA, 'pop'], [TOC, 'golpecito'], [toque(0), 'toc'], [toque(1), 'toc'], [toque(2), 'toc']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')
