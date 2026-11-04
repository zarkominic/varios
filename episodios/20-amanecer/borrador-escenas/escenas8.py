E = {}

# ── piezas pequeñas comunes a las cuatro escenas (se repiten en cada cuerpo: cada escena es un .html suelto) ──
PIEZAS = r'''
const K8 = { k: hex('#1c1222'), piel: hex('#f6c290'), pielS: hex('#c88a5a'), blanco: hex('#ffffff'), oro: hex('#f0c040'), oroS: hex('#a87a18'),
  verde: hex('#4a9a3a'), verdeL: hex('#7ac85a'), verdeS: hex('#2e6a24'), crema: hex('#f4eedc'), gris: hex('#8a8a96'), rojo: hex('#c8303a') };
// la mano de tres dedos encima de la mano del chibi (hx, hy): tres dedos de 1 px con su contorno
const tresDedos = (hx, hy, piel = K8.piel) => {
  R.rect(hx - 3, hy - 7, hx + 3, hy - 2, K8.k);
  for (const fx of [-2, 0, 2]) R.rect(hx + fx, hy - 6, hx + fx, hy - 2, piel);
  R.pset(hx - 2, hy - 6, K8.blanco);
};
// una rana (x, y = pie, en el centro) a o.s (2 por omisión) que salta (o.salto 0–1) e infla el saco (o.croa)
const RANA = ['..kk...kk..', '.kwek.kwek.', '.kGGkkkGGk.', 'kGLGGGGGLGk', 'kGgGGGGGgGk', 'kGGGGkGGGGk', '.kgGGGGGgk.', 'kGGkkkkkGGk', 'kkk.....kkk'];
const rana = (x, y, t, o = {}) => {
  const s = o.s ?? 2, w = RANA[0].length, x0 = Math.round(x - w * s / 2), y0 = Math.round(y - Math.sin(Math.max(0, Math.min(1, o.salto ?? 0)) * Math.PI) * 12 - RANA.length * s);
  const pal = { k: K8.k, w: K8.blanco, e: K8.k, G: K8.verde, g: K8.verdeS, L: K8.verdeL };
  RANA.forEach((f, j) => { for (let i = 0; i < w; i++) { const c = pal[f[i]]; if (c != null) R.rect(x0 + i * s, y0 + j * s, x0 + i * s + s - 1, y0 + j * s + s - 1, c); } });
  if (o.croa) { const cx = x0 + Math.round(w * s / 2), cy = y0 + 6 * s + 2; R.disco(cx, cy, 2 * s + 1, K8.k); R.disco(cx, cy, 2 * s, hex('#e8e0a8')); R.pset(cx - 1, cy - 1, K8.blanco); }
};
'''

E['jh-minotauro'] = ('Teseo y el pan y circo', '''// JH-MINOTAURO (frases 46–47), lo real, sin cartela ni barra (no es tiempo de Panem). Cuatro planos:
// 1. Creta desde el acantilado: el barco de vela negra cruza la bahía hacia el espigón mientras un pastor con su cabra
//    sube al borde y señala el barco en «Crete» (corta en «into»);
// 2. el muelle: chicos y chicas bajan por la pasarela uno a uno y se quedan en fila, cabizbajos; un guardia cretense espera;
//    en «Theseus volunteered» el de la espada da un paso al frente y levanta el brazo (los demás le miran);
// 3. el circo romano: gradas llenas; en la arena un malabarista y un acróbata que salta; en «bread» el emperador lanza
//    los panes desde el palco y el público los coge (corta en «Give»);
// 4. el palco: el emperador reparte panes de las cestas; el pan con ojos, entre los panes de la cesta, ve que lo van a
//    repartir y se esconde («protest»); en «Mockingjay» un sinsajo dorado cruza el cielo (el libro de Plutarch).''', PIEZAS + r'''
const a = (f) => en('teseo', f), b = (f) => en('pan', f);
const P2 = a(0.554), P3 = b(0), P4 = b(0.489);
const CRETA = a(0.46), TESEO = a(0.797), VOLUNT = a(0.857), BREAD = b(0.32), PROTEST = b(0.679), SINSAJO = b(0.9), GIVE = b(0.489);
const TUN = (q, qs) => ({ A: hex('#f0ece2'), a: hex('#c8bc9a'), Q: hex(q), q: hex(qs) });
const GRIEGOS = [
  [EL.ciudadano, { pal: TUN('#5a7ac0', '#3a5a90') }], [EL.nina, { pal: { C: hex('#f0ece2'), c: hex('#c8bc9a'), W: hex('#f0ece2') } }],
  [EL.ciudadano, { pal: { ...TUN('#6a9a5a', '#4a7a3a'), H: hex('#6a4426') } }], [EL.nina, { pal: { C: hex('#e0c890'), c: hex('#b8a070'), W: hex('#e0c890'), H: hex('#6a4426') } }],
  [EL.ciudadano, { pal: { ...TUN('#c84a3a', '#8a2a20'), H: hex('#a86a2a') } }],
];
// 1 · Creta desde el acantilado: el barco llega; el pastor sube al borde con la cabra y lo señala
const p1 = (t) => {
  const g = T.real(R, t, { encuadre: 'creta', barco: tramo(t, 0, CRETA + 0.4) });
  const u = tramo(t, 0.6, CRETA - 0.6), x = Math.round(lerp(330, 236, u));
  // la cabra que sigue al pastor y bala
  const cx = Math.round(lerp(352, 262, tramo(t, 0.9, CRETA - 0.2))), cy = g.suelo, bal = t > CRETA + 0.3 && t < CRETA + 1.1;
  R.rect(cx - 1, cy - 9, cx + 11, cy - 3, K8.k); R.rect(cx, cy - 8, cx + 10, cy - 4, K8.crema); R.rect(cx + 1, cy - 4, cx + 9, cy - 4, hex('#c8c0b0'));
  for (const lx of [1, 3, 7, 9]) R.rect(cx + lx, cy - 3, cx + lx, cy - (Math.floor(t * 6 + lx) % 2 && tramo(t, 0.9, CRETA - 0.2) < 1 ? 1 : 0), K8.k);
  R.rect(cx - 4, cy - 12, cx + 1, cy - 7, K8.k); R.rect(cx - 3, cy - 11, cx, cy - 8, K8.crema); R.pset(cx - 2, cy - 10, K8.k); R.pset(cx - 1, cy - 13, hex('#8a7a5a')); R.pset(cx, cy - 14, hex('#8a7a5a'));
  if (bal) R.icono('!', cx - 8, cy - 22, K8.blanco, K8.k);
  R.actor(EL.ciudadano, x, g.suelo, t, { dir: -1, anda: u > 0 && u < 1, dedo: t > CRETA - 0.2 && t < P2, habla: t > CRETA && t < CRETA + 1.2 && Math.sin(t * 9) > 0, pal: { T: hex('#a87a4a') } });
  // una niña del pueblo corre hacia el borde a mirar
  const v = tramo(t, CRETA + 0.2, P2 - 0.3); R.actor(EL.nina, Math.round(lerp(330, 206, v)), g.suelo, t, { dir: -1, anda: v > 0 && v < 1, sorpresa: v >= 1 });
  T.realDelante(R, t, { encuadre: 'creta' });
};
// 2 · el muelle: bajan por la pasarela; Teseo da un paso al frente
const p2 = (t) => {
  const g = T.real(R, t, { encuadre: 'creta', camara: 'puerto' });
  const [[ax, ay], [bx, by]] = g.pasarela;
  // el guardia cretense espera al final del muelle con su lanza
  { const gm = R.actor(EL.ciudadano, 290, g.suelo - 2, t, { dir: -1, dedo: t > P2 + 1.6 && t < P2 + 2.6, sostiene: t > P2 + 1.6 && t < P2 + 2.6 ? null : [283, g.suelo - 16], pal: { ...TUN('#8a3a2a', '#5a2018'), A: hex('#c84a3a'), a: hex('#8a2a20') } });
    if (!(t > P2 + 1.6 && t < P2 + 2.6)) { const [lx, ly] = gm.mano; R.linea(lx, ly - 22, lx, ly + 10, K8.k); R.linea(lx + 1, ly - 22, lx + 1, ly + 10, hex('#8a5a2a')); R.poligono([[lx - 1, ly - 22], [lx + 2, ly - 22], [lx + 1, ly - 27]], hex('#c8ccd8')); } }
  GRIEGOS.forEach(([d, o], k) => {
    const s0 = P2 + 0.1 + k * 0.42, u = tramo(t, s0, s0 + 1.0), w = tramo(t, s0 + 1.0, s0 + 1.6);
    const fx = 184 + k * 16;
    let x = lerp(ax - 8, bx - 8, u), y = lerp(ay, by, u);
    if (w > 0) { x = lerp(bx - 8, fx, w); y = lerp(by, g.suelo - 4, w); }
    const mira = t > TESEO + 0.1;
    R.actor(d, Math.round(x), Math.round(y), t, { dir: mira ? -1 : 1, anda: (u > 0 && u < 1) || (w > 0 && w < 1), triste: !mira, sorpresa: mira && t < VOLUNT + 0.8, ...o });
  });
  // Teseo: baja el último, se queda atrás y en «Theseus» da el paso al frente y levanta el brazo
  const u = tramo(t, P2 + 0.3, P2 + 1.4), w = tramo(t, P2 + 1.4, P2 + 2.0), pasa = tramo(t, TESEO - 0.1, TESEO + 0.6);
  let x = lerp(ax - 8, bx - 8, u), y = lerp(ay, by, u);
  if (w > 0) { x = lerp(bx - 8, 172, w); y = lerp(by, g.suelo - 4, w); }
  if (pasa > 0) { x = lerp(172, 214, pasa); y = lerp(g.suelo - 4, g.suelo + 9, pasa); }
  R.actor(EL.teseo, Math.round(x), Math.round(y), t, { dir: 1, anda: (u > 0 && u < 1) || (w > 0 && w < 1) || (pasa > 0 && pasa < 1), brazos: t > VOLUNT && t < VOLUNT + 0.9, sonrisa: t > VOLUNT + 0.9 });
};
// 3 · el circo: malabarista y acróbata en la arena; en «bread» vuelan los panes
const p3 = (t) => {
  const g = T.real(R, t, { encuadre: 'circo', panes: tramo(t, BREAD - 0.2, GIVE) });
  // el malabarista: tres bolas en el aire
  const mx = 92; R.actor(EL.ciudadano, mx, g.suelo, t, { dir: 1, brazos: true, pal: { A: hex('#e8c040'), a: hex('#b8902a'), Q: hex('#3aa86a'), q: hex('#2a7a4a') } });
  for (let k = 0; k < 3; k++) { const f = (t * 1.6 + k / 3) % 1, bx = Math.round(mx + 2 + f * 11), by = Math.round(g.suelo - 30 - Math.sin(f * Math.PI) * 16); R.disco(bx, by, 2, K8.k); R.disco(bx, by, 1, [K8.rojo, K8.oro, hex('#4a7ac8')][k]); }
  // el acróbata que da volteretas por la arena
  const v = tramo(t, P3 + 0.3, GIVE - 0.3), ax = Math.round(lerp(300, 150, v)), sal = v > 0 && v < 1 ? Math.round(Math.abs(Math.sin(t * 5)) * 12) : 0;
  R.actor(EL.ciudadano, ax, g.suelo, t, { dir: -1, salto: sal, brazos: sal > 4, anda: v > 0 && v < 1 && sal <= 4, pal: { A: hex('#e84a7a'), a: hex('#b83a5a'), Q: hex('#f0ece2'), q: hex('#c8bc9a') } });
  // el emperador en el palco: saluda y, en «bread», lanza los panes
  { const [ex, ey] = g.emperador, tira = t > BREAD - 0.3 && t < BREAD + 1.2; R.actor(EL.emperador, ex - 7, ey, t, { dir: 1, brazos: tira && Math.floor(t * 5) % 2 === 0, dedo: !tira && t > P3 + 1 && t < P3 + 2.2, sonrisa: true }); }
  // el legionario de la puerta aplaude con el público al caer los panes
  R.actor(EL.legionario, 252, g.suelo - 2, t, { dir: -1, sonrisa: t > BREAD, brazos: t > BREAD + 0.2 && Math.floor(t * 4) % 2 === 0 });
  T.realDelante(R, t, { encuadre: 'circo', panes: tramo(t, BREAD - 0.2, GIVE) });
};
// 4 · el palco: el emperador reparte; el pan con ojos se esconde entre los panes; pasa el sinsajo
const p4 = (t) => {
  const pn = tramo(t, P4 + 0.3, PROTEST + 1.6);
  const g = T.real(R, t, { encuadre: 'circo', camara: 'palco', panes: pn });
  const lanza = Math.floor((t - P4) * 1.4) % 2 === 0 && t > P4 + 0.3 && t < PROTEST + 1.6;
  const m = R.actor(EL.emperador, 153, g.suelo, t, { dir: 1, sostiene: lanza ? [176, g.suelo - 30] : [170, g.suelo - 16], sonrisa: true, habla: t > b(0.53) && t < b(0.6) && Math.sin(t * 8) > 0 });
  if (lanza) { R.disco(m.mano[0] + 1, m.mano[1] - 3, 3, K8.k); R.disco(m.mano[0] + 1, m.mano[1] - 3, 2, hex('#d8943a')); R.pset(m.mano[0], m.mano[1] - 4, hex('#f4cc80')); }
  // un esclavo trae otra cesta de panes
  const v = tramo(t, P4 + 0.6, P4 + 2.6); R.actor(EL.ciudadano, Math.round(lerp(-20, 104, v)), g.suelo, t, { dir: 1, anda: v > 0 && v < 1, sostiene: [Math.round(lerp(-20, 104, v)) + 18, g.suelo - 16], pal: { T: hex('#c8bc9a') } });
  if (v > 0) { const cx = Math.round(lerp(-20, 104, v)) + 20, cy = g.suelo - 12; R.rect(cx - 7, cy - 5, cx + 7, cy + 2, K8.k); R.rect(cx - 6, cy - 4, cx + 6, cy + 1, hex('#a87a4a')); for (let i = -5; i <= 5; i += 2) R.pset(cx + i, cy - 1, hex('#6a4a2a')); for (const dx of [-3, 2]) { R.disco(cx + dx, cy - 6, 2, K8.k); R.disco(cx + dx, cy - 6, 1, hex('#d8943a')); } }
  // el pan con ojos en la cesta de la derecha: mira, se asusta y se esconde
  const [px, py] = g.cestas[1], esc = tramo(t, PROTEST - 0.3, PROTEST + 0.4);
  T.pan(R, px, py - 4, t, { s: 2, dir: -1, expresion: t > b(0.6) ? 'susto' : 'normal', esconde: esc });
  if (t > b(0.6) && t < PROTEST) R.icono('!', px - 3, py - 40, K8.blanco, K8.k, 2);
  T.realDelante(R, t, { encuadre: 'circo', camara: 'palco', panes: pn });
  // el sinsajo dorado que cruza el cielo en «Mockingjay» (el libro de Plutarch)
  const s = tramo(t, SINSAJO - 0.5, SINSAJO + 1.4); if (s > 0 && s < 1) T.PIEZAS_JH.sinsajo(R, Math.round(lerp(20, 250, s)), Math.round(58 - Math.sin(s * Math.PI) * 14), { s: 2, t });
};
const efectos = [[1.0, 'ola'], [CRETA + 0.3, 'boing'], [TESEO, 'palmada'], [P3 + 0.2, 'publico'], [BREAD, 'whoosh'], [BREAD + 0.6, 'publico'], [b(0.6), 'pop'], [PROTEST, 'boing'], [SINSAJO, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos });
''')

E['jh-hume'] = ('Hume', '''// JH-HUME (frase 48), lo real, sin barra. Dos planos:
// 1. el estudio de noche: Hume escribe con la pluma a la luz de la vela; en «Hume» deja la pluma y levanta el dedo, y se
//    vuelve a la ventana; una polilla da vueltas a la vela (corta en «his question»);
// 2. la ventana de cerca: Hume asoma de espaldas mirando la plaza; «?» sobre su cabeza; en «many» la multitud se ilumina;
//    en «few» las tres figuras del balcón brillan y la multitud se inclina.''', PIEZAS + r'''
const a = (f) => en('hume', f);
const P2 = a(0.514), HUME = a(0.404), MANY = a(0.711), FEW = a(0.943), COLLINS = a(0.146);
const p1 = (t) => {
  const g = T.real(R, t, { encuadre: 'biblioteca' });
  const escribe = t < HUME;
  const [hx, hy] = g.hume;
  // el gato que cruza la alfombra
  const m = R.actor(EL.hume, hx, hy - (escribe ? 0 : Math.round(tramo(t, HUME, HUME + 0.3) * 5)), t, { dir: escribe ? 1 : -1, sostiene: escribe ? [hx + 22 + Math.round(Math.sin(t * 9) * 2), hy - 6] : null, dedo: !escribe && t < HUME + 1.2, sorpresa: t > HUME - 0.15 && t < HUME + 0.4, habla: t > COLLINS && t < HUME && Math.sin(t * 7) > 0.3 });
  T.realDelante(R, t, { encuadre: 'biblioteca' });
  // la pluma en la mano mientras escribe (por delante del escritorio)
  // una polilla que da vueltas a la luz de la vela
  { const [vx, vy] = g.vela, an = t * 5, px = Math.round(vx + Math.cos(an) * 7), py = Math.round(vy - 8 + Math.sin(an * 1.3) * 4), ab = Math.floor(t * 16) % 2; R.pset(px, py, hex('#e8dcc0')); R.pset(px - 1, py - ab, hex('#c8b890')); R.pset(px + 1, py - ab, hex('#c8b890')); }
  if (escribe) { const [qx, qy] = m.mano; R.linea(qx, qy, qx + 4, qy - 9, K8.k); R.linea(qx + 1, qy - 1, qx + 4, qy - 8, K8.crema); R.pset(qx + 3, qy - 7, K8.blanco); }
};
const p2 = (t) => {
  const g = T.real(R, t, { encuadre: 'biblioteca', camara: 'ventana' });
  const [x0, y0, x1, y1] = g.cristal;
  // la multitud que se enciende en «many» y las tres figuras del balcón en «few»
  const mu = tramo(t, MANY - 0.2, MANY + 0.4), fu = tramo(t, FEW - 0.3, FEW + 0.2);
  if (mu > 0 && mu < 1) T.tinte(R, y1 - 34, y1 - 2, [255, 220, 140], 0.35 * Math.sin(mu * Math.PI));
  // en «few» un marco dorado que late alrededor del balcón de los tres
  if (fu > 0 && Math.floor(t * 6) % 2 === 0) { const [bx0, by0, bx1, by1] = g.balcon, X0 = bx0 - 4, X1 = bx1 + 4, Y0 = by0 - 16, Y1 = by1 + 3; for (const c of [K8.k, K8.oro]) { const d = c === K8.k ? 1 : 0; R.linea(X0 - d, Y0 - d, X1 + d, Y0 - d, c); R.linea(X0 - d, Y1 + d, X1 + d, Y1 + d, c); R.linea(X0 - d, Y0 - d, X0 - d, Y1 + d, c); R.linea(X1 + d, Y0 - d, X1 + d, Y1 + d, c); } }
  // Hume entra por la derecha hasta la ventana y mira la plaza
  const u = tramo(t, P2, P2 + 1.0), hx = Math.round(lerp(262, 226, u));
  R.actor(EL.hume, hx, g.suelo, t, { dir: -1, anda: u > 0 && u < 1, triste: t > FEW, sorpresa: t > MANY && t < MANY + 0.6, dedo: t > a(0.84) && t < FEW });
  if (t > P2 + 0.2 && t < MANY + 0.3) R.icono('?', hx + 4, g.suelo - 48, K8.blanco, K8.k, 2);
};
const efectos = [[0.5, 'lapiz'], [HUME, 'golpecito'], [P2 + 0.3, 'pop'], [MANY, 'publico'], [FEW, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos });
''')

E['jh-sinsonte'] = ('El sinsonte', '''// JH-SINSONTE (frase 49), lo real, sin barra. Dos planos (gag 7):
// 1. el bosque: un sinsajo dorado se posa junto al sinsonte gris y en «made up» se deshace en chispas; una observadora de
//    pájaros llega con los prismáticos; en «Mockingbird exists» el sinsonte imita la alarma y el coche del fondo pita: la
//    observadora da un respingo (corta en «American»);
// 2. la rama de cerca: notas y «200» en «200 songs»; en «frogs» croa como la rana, y una rana de verdad salta y mira;
//    al final imita a Atom: el átomo en su globo y Atom, en su esquina, se sorprende («!»).''', PIEZAS + r'''
const a = (f) => en('sinsonte', f);
const P2 = a(0.481), MADE = a(0.07), REAL = a(0.189), EXISTS = a(0.302), DOS = a(0.648), FROGS = a(0.87), MACH = a(0.931);
const p1 = (t) => {
  const canto = t > EXISTS && t < P2 ? 'alarma' : t > REAL && t < EXISTS ? 'notas' : undefined;
  const g = T.real(R, t, { encuadre: 'bosque', canto });
  const [bx, by] = g.pajaro;
  // el sinsajo dorado (inventado) llega, se posa y se deshace en «made up»
  const ll = tramo(t, 0, MADE - 0.1), poof = tramo(t, MADE + 0.2, MADE + 0.8);
  if (poof < 1) {
    if (poof === 0) T.PIEZAS_JH.sinsajo(R, Math.round(lerp(-10, bx - 16, ll)), Math.round(lerp(40, by, ll) - Math.sin(ll * Math.PI) * 6), { s: 1, t: ll < 1 ? t : null });
    else for (let k = 0; k < 8; k++) { const an = k * 0.785, r = 2 + poof * 12; R.pset(Math.round(bx - 16 + Math.cos(an) * r), Math.round(by - 4 + Math.sin(an) * r), k % 2 ? K8.oro : K8.blanco); }
  }
  // la observadora de pájaros con prismáticos
  const u = tramo(t, 0.6, REAL + 0.6), ox = Math.round(lerp(330, 214, u));
  const susto = t > EXISTS + 0.1 && t < EXISTS + 0.9;
  const m = R.actor(EL.turista, ox, g.suelo, t, { dir: -1, anda: u > 0 && u < 1, salto: susto ? 3 : 0, sorpresa: susto, sonrisa: t > EXISTS + 0.9, sostiene: u >= 1 && !susto ? [ox - 2, g.suelo - 22] : null });
  if (u >= 1 && !susto) { const [qx, qy] = m.mano; R.rect(qx - 4, qy - 3, qx + 1, qy + 1, K8.k); R.rect(qx - 3, qy - 2, qx, qy, hex('#3a3a4a')); R.pset(qx - 3, qy - 2, hex('#8ac8e8')); }
  if (susto) R.icono('!', ox + 4, g.suelo - 40, K8.blanco, K8.k);
  T.realDelante(R, t, { encuadre: 'bosque' });
};
const p2 = (t) => {
  const canto = t > MACH + 0.15 ? 'atom' : t > FROGS - 0.1 ? 'rana' : t > P2 + 0.3 ? 'notas' : undefined;
  const g = T.real(R, t, { encuadre: 'bosque', camara: 'rama', canto });
  // «200»: las canciones que aprende, en dorado junto a las notas
  const d = tramo(t, DOS - 0.1, DOS + 0.3); if (d > 0 && t < FROGS - 0.2) R.numero('200', 104, Math.round(lerp(70, 60, d)), { tam: 16, centro: true });
  // hojas que caen delante del bosque desenfocado
  for (let k = 0; k < 4; k++) { const f = ((t * 0.12 + k * 0.27) % 1), lx = Math.round(30 + k * 70 + Math.sin(t * 2 + k) * 8), ly = Math.round(104 + f * 64); R.rect(lx, ly, lx + 2, ly + 1, k % 2 ? hex('#c8a040') : hex('#8ab84a')); R.pset(lx + (Math.sin(t * 3 + k) > 0 ? 3 : -1), ly, K8.k); }
  // una mariposa naranja que revolotea por el claro de abajo
  { const f = (t * 0.07) % 1, mx = Math.round(330 - f * 360), my = Math.round(140 + Math.sin(t * 2.3) * 12), ab = Math.floor(t * 12) % 2;
    R.rect(mx - 3, my - 2 + ab, mx - 1, my + 1, K8.k); R.rect(mx + 1, my - 2 + ab, mx + 3, my + 1, K8.k); R.rect(mx - 2, my - 1 + ab, mx - 1, my, hex('#f08a2a')); R.rect(mx + 1, my - 1 + ab, mx + 2, my, hex('#f08a2a')); R.rect(mx, my - 2, mx, my + 2, K8.k); }
  // la rana de verdad: sube a la rama a saltos desde la derecha y en «frogs» mira al pájaro y croa
  const ramaY = (x) => 100 - (x / 262) * 14;
  const s1 = tramo(t, P2 + 1.0, P2 + 1.7), s2 = tramo(t, P2 + 2.2, P2 + 2.9), rx = lerp(262, 236, s1) - 24 * s2;
  rana(rx, Math.round(ramaY(rx)) + 2, t, { salto: s1 < 1 ? s1 : s2, dir: -1, croa: t > FROGS + 0.2 && t < MACH && Math.sin(t * 8) > 0 });
  if (t > FROGS && t < MACH + 0.3) R.icono('?', Math.round(rx) - 4, Math.round(ramaY(rx)) - 36, K8.blanco, K8.k, 2);
  // Atom se sorprende al oír su propia voz
  if (t > MACH + 0.5) R.icono('!', 262, 14, K8.oro, K8.k, 2);
};
const efectos = [[MADE + 0.2, 'brillo'], [EXISTS, 'aviso'], [EXISTS + 0.15, 'boing'], [DOS, 'pop'], [FROGS, 'boing'], [MACH + 0.2, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos });
''')

E['jh-saludo'] = ('El saludo de tres dedos', '''// JH-SALUDO (frase 50), lo real, sin barra (las cifras 2014 y 2021 salen como números). Dos planos:
// 1. la plaza: una manifestante en el hueco del centro levanta la mano de tres dedos en «three finger salute» y otras
//    manos se levantan detrás; «2014» en el cielo; en «banned» un agente con casco levanta la mano (no) desde las vallas;
//    la manifestante no la baja (corta en «And people»);
// 2. contraluz desde abajo: la multitud sigue levantando la mano («anyway»); en «2021» el sol baja, cambia la luz, «2021»,
//    y la ola de manos llega hasta el final.''', PIEZAS + r'''
const a = (f) => en('saludo', f);
const P2 = a(0.518), SALUTE = a(0.018), Y14 = a(0.228), BANNED = a(0.424), KEPT = a(0.554), Y21 = a(0.734), SHOWED = a(0.862);
const p1 = (t) => {
  const manos = 0.05 + 0.5 * tramo(t, SALUTE + 0.3, BANNED - 0.4);
  const g = T.real(R, t, { encuadre: 'protesta', manos });
  // la manifestante del centro: llega, levanta la mano de tres dedos y no la baja
  const u = tramo(t, 0, SALUTE), x = Math.round(lerp(122, 146, u)), arriba = t > SALUTE;
  const m = R.actor(EL.manifestante, x, g.suelo, t, { dir: 1, anda: u > 0 && u < 1, sostiene: arriba ? [x + 16, g.suelo - 34] : null, enfado: t > BANNED && t < BANNED + 0.8 });
  if (arriba) tresDedos(m.mano[0], m.mano[1]);
  // un vecino a su lado la imita en «screen»
  const v = t > a(0.132);
  const n = R.actor(EL.estudiante, 176, g.suelo - 2, t, { dir: -1, sostiene: v ? [168, g.suelo - 36] : null, sorpresa: t > SALUTE && t < a(0.132) });
  if (v) tresDedos(n.mano[0], n.mano[1]);
  // tres agentes con casco ante las vallas: miran; en «banned» el del centro levanta la mano (no)
  const no = t > BANNED - 0.1 && t < P2 - 0.2;
  for (const [ax, k] of [[118, 0], [153, 1], [190, 2]]) R.actor(EL.agenteCasco, ax, 121, t, { dir: k === 0 ? 1 : k === 2 ? -1 : 1, dedo: k === 1 && no, enfado: k === 1 && no });
  if (no) R.icono('X', 155, 78, hex('#e84a4a'), K8.k, 2);
  const y14 = tramo(t, Y14 - 0.1, Y14 + 0.4); if (y14 > 0) R.numero('2014', 200, Math.round(lerp(54, 46, y14)), { tam: 12, centro: true });
  T.realDelante(R, t, { encuadre: 'protesta', manos });
};
const p2 = (t) => {
  const manos = 0.45 + 0.3 * tramo(t, KEPT, a(0.62)) + 0.25 * tramo(t, Y21 + 0.2, SHOWED + 0.4);
  const g = T.real(R, t, { encuadre: 'protesta', camara: 'manos', manos });
  // en 2021 cambia la luz: el atardecer se enrojece
  const l = tramo(t, Y21 - 0.3, Y21 + 0.5); if (l > 0) T.tinte(R, 0, 179, [200, 70, 90], 0.22 * l);
  const y21 = tramo(t, Y21 - 0.1, Y21 + 0.4); if (y21 > 0) R.numero('2021', 200, Math.round(lerp(60, 50, y21)), { tam: 12, centro: true });
};
const efectos = [[SALUTE + 0.1, 'palmada'], [Y14, 'pop'], [BANNED, 'silbato'], [KEPT, 'publico'], [Y21, 'pop'], [SHOWED, 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos });
''')
