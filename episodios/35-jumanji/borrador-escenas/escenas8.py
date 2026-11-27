E = {}
E['jm-open'] = ('La siguiente: el juego se escapa', '''// JM-OPEN (frases 24–25), 2026, cartela «2026». Seis planos:
// 1. la calle nevada de hoy, en Navidad: un niño corre al escaparate de juegos y lo señala; su madre llega detrás; un
//    vecino cruza con un regalo;  2. la taquilla del cine con adornos: sale la tira de entradas, la madre la recoge y los
//    dos van a la puerta; llega la siguiente;  3. la ventana de cerca: la consola vieja tiembla y de ella brotan las lianas, que se
//    salen a la calle (un gorrión de la repisa sale volando);  4. en el estudio, la liana que le quitó el lápiz a Atom
//    dibuja la línea: la mesa, el tablero (1981), el cartucho (2017); el «45» sube;  5. de cerca, la línea sale de la
//    consola de 2026, da la vuelta y la flecha toca el principio: la mesa con el flexo;  6. 1979: el escultor dibuja de
//    noche, Lisa le trae una taza y, por la ventana, asoma una hoja de selva: ella se vuelve a mirarla y él también.''', r'''
const a = (f) => en('open', f), b = (f) => en('vuelta', f);
const D = M('open_fin', 19.5) - M('open', 1.5), D2 = M('vuelta_fin', 34.2) - M('vuelta', 20);
const ta = (s) => a((s - 1.5) / 18.012), tb = (s) => b((s - 20.012) / 14.171);   // el segundo de la voz inglesa → instante
const P2 = ta(5.78), P3 = ta(12.65), P4 = b(0) - 0.4, P5 = tb(25.18), P6 = tb(28.86);
const llamada = ta(3.58), navidad = ta(7.38), a2026 = ta(8.1), ultima = ta(11.02), rompe = ta(15.37), caos = ta(17.87), mundo = ta(18.99);
const a45 = tb(21.72), carton = tb(23.12), cartucho = tb(24.44), vuelve = tb(26.72), empezo = tb(28.14), noche = tb(31.02), jungla = tb(31.85), lado = tb(33.13);
const V = { k: hex('#12261a'), s: hex('#1e5a30'), m: hex('#2f8a42'), l: hex('#62c45a'), ll: hex('#a6e67a') };
const cl = (v) => Math.max(0, Math.min(1, v)), suave = (u) => u * u * (3 - 2 * u);

// una vid NUESTRA de (x0, y0) a (x1, y1) con comba: tallo de 2 px con luz y hojitas alternas; n 0–1: cuánto ha crecido
const vid = (x0, y0, x1, y1, comba, t, n = 1, hojas = true) => {
  const L = Math.max(2, Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 1.15)), N = Math.round(L * cl(n));
  let ux = 0, uy = 0;
  for (let i = 0; i <= N; i++) {
    const u = i / L, w = Math.sin(u * 9 + t * 1.6) * 1.2 * Math.sin(u * Math.PI);
    const x = Math.round(lerp(x0, x1, u) + w), y = Math.round(lerp(y0, y1, u) + Math.sin(u * Math.PI) * comba);
    R.pset(x - 1, y, V.k); R.pset(x + 2, y, V.k); R.pset(x, y - 1, V.k); R.pset(x + 1, y + 2, V.k); R.pset(x, y + 2, V.k); R.pset(x + 1, y - 1, V.k);
    ux = x; uy = y;
  }
  for (let i = 0; i <= N; i++) {
    const u = i / L, w = Math.sin(u * 9 + t * 1.6) * 1.2 * Math.sin(u * Math.PI);
    const x = Math.round(lerp(x0, x1, u) + w), y = Math.round(lerp(y0, y1, u) + Math.sin(u * Math.PI) * comba);
    R.pset(x, y, V.l); R.pset(x + 1, y, V.m); R.pset(x, y + 1, V.m); R.pset(x + 1, y + 1, V.s);
    if (hojas && i % 13 === 6 && i < N - 3) { const d = (i / 13 | 0) % 2 ? 1 : -1, b = Math.sin(t * 2 + i) > 0.6 ? 1 : 0;
      for (const [dx, dy, c] of [[0, 0, V.k], [1, 0, V.k], [2, 0, V.k], [3, 0, V.k], [0, 1, V.k], [1, 1, V.l], [2, 1, V.m], [3, 1, V.m], [4, 1, V.k], [1, 2, V.k], [2, 2, V.m], [3, 2, V.s], [4, 2, V.k], [2, 3, V.k], [3, 3, V.k]]) R.pset(x + (d > 0 ? 2 + dx : -1 - dx), y + d * (dy + 1) + b * d, c); }
  }
  return [ux, uy];
};
// una hoja de selva NUESTRA, grande, con cortes y nervio: (x, y) el rabito, ang hacia donde apunta, L el largo. Con
// poligono y linea, para que R.recorte la deje dentro de la ventana
const hoja = (x, y, ang, L, t, fase = 0) => {
  const a = ang + Math.sin(t * 1.7 + fase) * 0.05, ca = Math.cos(a), sa = Math.sin(a), W = L * 0.36;
  const P = (u, v) => [Math.round(x + ca * u * L - sa * v * W), Math.round(y + sa * u * L + ca * v * W)];
  const perfil = [[0, 0], [0.1, 0.55], [0.26, 1], [0.38, 0.62], [0.44, 1], [0.58, 0.6], [0.64, 0.86], [0.78, 0.46], [0.84, 0.6], [1, 0]];
  const borde = [...perfil.map(([u, v]) => P(u, v)), ...perfil.slice(1, -1).reverse().map(([u, v]) => P(u, -v))];
  R.poligono(borde, V.m);
  R.poligono([...perfil.map(([u, v]) => P(u, v)), P(0, 0)], V.s);                        // la mitad en sombra
  for (const u of [0.26, 0.44, 0.64, 0.84]) { const [p0, p1] = [P(u - 0.1, 0), P(u, -0.8 * (1 - u * 0.5))]; R.linea(p0[0], p0[1], p1[0], p1[1], V.l); const q = P(u, 0.8 * (1 - u * 0.5)); R.linea(p0[0], p0[1], q[0], q[1], V.m); }
  for (let i = 0; i < borde.length; i++) { const p = borde[i], q = borde[(i + 1) % borde.length]; R.linea(p[0], p[1], q[0], q[1], V.k); }
  const p0 = P(-0.12, 0), p1 = P(0.96, 0); R.linea(p0[0], p0[1], p1[0], p1[1], V.ll);
};
const chispa = (x, y, q = 0) => { const c = hex(q % 2 ? '#fff6c0' : '#ffd030'); R.rect(x - 3, y - 1, x + 3, y + 1, T.C.k); R.rect(x - 1, y - 3, x + 1, y + 3, T.C.k); R.rect(x - 2, y, x + 2, y, c); R.rect(x, y - 2, x, y + 2, c); R.pset(x, y, hex('#ffffff')); };
const regalo = (m, c = '#d8303a') => { const [x, y] = m; R.rect(x - 4, y - 5, x + 4, y + 3, T.C.k); R.rect(x - 3, y - 4, x + 3, y + 2, hex(c)); R.rect(x, y - 4, x, y + 2, hex('#f0c030')); R.rect(x - 3, y - 1, x + 3, y - 1, hex('#f0c030')); R.pset(x - 1, y - 6, hex('#f0c030')); R.pset(x + 1, y - 6, hex('#f0c030')); };
const entradas = (m) => { const [x, y] = m; R.rect(x - 1, y - 6, x + 5, y + 1, T.C.k); R.rect(x, y - 5, x + 4, y, hex('#f6e6b0')); R.rect(x, y - 3, x + 4, y - 3, hex('#d8303a')); R.pset(x + 2, y - 1, hex('#c8a040')); };

// 1 · la calle de hoy, nevada: el niño corre al escaparate de juegos y lo señala; su madre llega; un vecino con un regalo
const p1 = (t) => {
  const o = { encuadre: 'calle', lianas: 0 }; T.selva(R, t, o);
  const u = suave(tramo(t, 1.3, 3.3)), v = tramo(t, 1.6, 4.5);
  const xm = Math.round(lerp(-22, 66, v)), xn = Math.round(lerp(-12, 94, u)), xv = Math.round(214 - (t - 1.3) * 15);
  const vz = R.actor(EL.vecino1JM, xv, 137, t, { dir: -1, anda: true, sostiene: true }); regalo(vz.mano);
  R.actor(EL.vecina2JM, xm, 141, t, { dir: 1, anda: v > 0 && v < 1, habla: v >= 1 && Math.sin(t * 8) > 0, sonrisa: true });
  R.actor(EL.nino2017JM, xn, 141, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > llamada - 0.2, sonrisa: true, salto: t > llamada + 0.8 ? Math.round(Math.abs(Math.sin((t - llamada - 0.8) * 7)) * 3 * (1 - tramo(t, llamada + 0.8, llamada + 1.8))) : 0 });
  if (u >= 1) T.a_vaho(R, xn + 15, 126, t, 1, 1); if (v >= 1) T.a_vaho(R, xm + 15, 123, t, 1, 1);
  T.selvaDelante(R, t, o);
};
// 2 · la taquilla, con adornos: sale la tira de entradas, la madre la recoge y entran; llega el siguiente
const p2 = (t) => {
  const coge = a2026 + 1.5, o = { encuadre: 'fachada', camara: 'taquilla', epoca: 2026, entradas: t < coge ? tramo(t, navidad + 0.2, a2026 + 1) : 0 };
  T.cine(R, t, o);
  const u = tramo(t, P2 + 0.1, navidad), s = tramo(t, coge + 0.5, P3 - 0.5);
  const xm = Math.round(lerp(2, 80, u) + lerp(0, 178, s)), xn = Math.round(lerp(-16, 54, tramo(t, P2 + 0.1, navidad + 0.5)) + lerp(0, 180, tramo(t, coge + 0.9, P3 - 0.3)));
  const xv = Math.round(lerp(-24, 30, tramo(t, ultima - 0.6, P3 - 0.2)));
  R.actor(EL.vecina3JM, xv, 163, t, { dir: 1, anda: t > ultima - 0.6 && xv < 30 });
  const sal = t > a2026 && t < coge ? Math.round(Math.abs(Math.sin((t - a2026) * 8)) * 3) : 0;
  R.actor(EL.nino2017JM, xn, 165, t, { dir: 1, anda: (t < navidad + 0.5 && t > P2 + 0.1) || (t > coge + 0.9 && xn < 234), salto: sal, brazos: sal > 0, sonrisa: true });
  const m = R.actor(EL.vecina2JM, xm, 164, t, { dir: 1, anda: (u > 0 && u < 1) || (s > 0 && s < 1), habla: u >= 1 && t < a2026 && Math.sin(t * 8) > 0, sostiene: t > coge ? true : (t > a2026 + 0.6 ? [xm + 22, 144] : false), sonrisa: true });
  if (t > coge) entradas(m.mano);
  T.cineDelante(R, t, o);
};
// 3 · la ventana de cerca: la consola vieja tiembla y brotan las lianas; el gorrión de la repisa sale volando
const p3 = (t) => {
  const o = { encuadre: 'calle', camara: 'ventana', lianas: cl((t - rompe + 0.1) / (mundo - rompe)) ** 0.6 };
  const g = T.selva(R, t, o);
  // el gorrión: picotea en la repisa y huye cuando brotan
  const h = cl((t - rompe + 0.15) / 1.3), bx = Math.round(lerp(222, 338, h)), by = Math.round(136 - h * 70 - Math.sin(h * 3.1) * 6), pica = h === 0 && (t * 2.2) % 1 < 0.25 ? 1 : 0, ala = h > 0 ? (Math.floor(t * 14) % 2 ? -2 : 1) : 0;
  if (h < 1) { const K = T.C.k, B = hex('#8a6a4a'), Bl = hex('#c8a880'), Bs = hex('#5a4030');
    R.rect(bx - 3, by - 5 + pica, bx + 2, by - 1, K); R.rect(bx - 2, by - 4 + pica, bx + 1, by - 2, B); R.rect(bx - 2, by - 2, bx + 1, by - 2, Bl);
    R.rect(bx - 5, by - 7 + pica * 2, bx - 2, by - 4 + pica * 2, K); R.rect(bx - 4, by - 6 + pica * 2, bx - 3, by - 5 + pica * 2, B); R.pset(bx - 6, by - 5 + pica * 2, hex('#f0c030')); R.pset(bx - 4, by - 6 + pica * 2, K);
    R.rect(bx + 2, by - 4, bx + 4, by - 3, K); if (h > 0) { R.rect(bx - 2, by - 5 + ala, bx + 1, by - 4 + ala, Bs); R.pset(bx - 1, by - 6 + ala, K); } else { R.pset(bx - 1, by, K); R.pset(bx + 1, by, K); } }
  // el aviso: la consola vibra (rayitas a los lados) antes de romper
  if (t > rompe - 1.8 && t < rompe + 0.3 && Math.floor(t * 8) % 2) for (const d of [-1, 1]) for (let k = 0; k < 3; k++) { const x = 160 + d * (39 + k * 3), y = 112 + k * 8; R.linea(x, y + 1, x + d * 6, y - 2, T.C.k); R.linea(x, y, x + d * 6, y - 3, hex('#f6ffd0')); R.linea(x, y - 1, x + d * 6, y - 4, hex('#a6e67a')); }
  T.selvaDelante(R, t, o);
};
// 4 · el estudio: la liana que le quitó el lápiz a Atom dibuja la línea del tiempo; el «45» sube
let FR = null;
const p4 = (t) => {
  if (!FR) { const g0 = T.hoy(R, t, { encuadre: 'linea', traza: 0 }), r = g0.ruta; FR = g0.nudos.map(([nx, ny]) => { let mi = 0, md = 1e9; for (let i = 0; i < r.length * 0.6; i++) { const d = Math.hypot(r[i][0] - nx, r[i][1] - ny); if (d < md) { md = d; mi = i; } } return mi / (r.length - 1); }); }
  const tr = t < carton + 0.35 ? lerp(FR[0], FR[1], tramo(t, P4 + 0.7, carton + 0.1)) : t < cartucho - 0.15 ? lerp(FR[1], FR[2], tramo(t, carton + 0.35, cartucho - 0.3)) : lerp(FR[2], FR[3], cl((t - cartucho + 0.15) / 1.2) * 0.75);
  const o = { encuadre: 'linea', traza: tr }, g = T.hoy(R, t, o), [px, py] = g.punta;
  // el «45» que sube a lápiz bajo el pliego
  const n = Math.round(45 * tramo(t, a45 - 0.9, a45 + 0.3)); if (t > a45 - 0.9) R.numero(String(n), 150, 138 - Math.round(3 * (1 - tramo(t, a45 - 0.9, a45 - 0.6))), { tam: 16, centro: true });
  // la liana (del techo, entre la barra del año y Atom) con el lápiz en la punta
  const bob = Math.round(Math.sin(t * 9) * 1);
  vid(232, 0, px + 3, py - 15 + bob, 10, t); T.g_lapizMesa(R, px + 1, py - 7 + bob, { vertical: true });
  for (const [dx, dy] of [[-2, -13], [3, -12], [-2, -11], [3, -10]]) R.pset(px + 1 + dx, py + dy + bob, V.l);
  // destello al llegar a cada pieza
  for (const [k, t0] of [[1, carton + 0.1], [2, cartucho - 0.3]]) { const e = tramo(t, t0, t0 + 0.6); if (e > 0 && e < 1) { const [nx, ny] = g.nudos[k], r = 17 + e * 9; for (let q = 0; q < 8; q++) { const x = Math.round(nx + Math.cos(q * 0.785 + e) * r * 1.15), y = Math.round(ny - 15 + Math.sin(q * 0.785 + e) * r); chispa(x, y, q); } } }
  const e = tramo(t, P4 + 0.3, P4 + 1.6), xn = Math.round(lerp(330, 286, e));
  R.actor(EL.nino2017JM, xn, 172, t, { dir: -1, anda: e > 0 && e < 1, sorpresa: e >= 1 && t < a45, dedo: t > carton - 0.2, sonrisa: t > a45 });
  T.hoyDelante(R, t, o);
};
// 5 · de cerca: de la consola de 2026 la línea da la vuelta y la flecha toca el principio
const p5 = (t) => {
  const tr = tramo(t, P5 + 0.1, empezo + 0.3) ** 0.85, o = { encuadre: 'linea', camara: 'bucle', traza: tr }, g = T.hoy(R, t, o), [px, py] = g.punta;
  { const e = tramo(t, tb(25.46), tb(25.46) + 0.7); if (e > 0 && e < 1) { const [nx, ny] = g.consola, r = 20 + e * 12; for (let q = 0; q < 10; q++) { const x = Math.round(nx + Math.cos(q * 0.628) * r * 1.6), y = Math.round(ny - 14 + Math.sin(q * 0.628) * r * 0.7); chispa(x, y, q); } } }
  if (tr < 1) { const bob = Math.round(Math.sin(t * 9) * 1), gx = px + 30, gy = py - 26 + bob;
    T.g_lapizGrande(R, gx, gy, px, py, {}); vid(319, 60, gx - 6, gy + 6, 16, t);
    for (const [dx, dy] of [[-9, 4], [-8, 8], [-4, 9], [-3, 2], [-7, 2]]) R.rect(gx + dx, gy + dy, gx + dx + 1, gy + dy + 1, V.m); }
  else { const s = tramo(t, empezo + 0.3, P6); vid(319, 60, Math.round(lerp(px + 24, 334, s)), Math.round(lerp(py - 20, 72, s)), Math.round(lerp(16, 3, s)), t);   // la liana se retira; chispas en el nudo
    for (let q = 0; q < 8; q++) { const r = 6 + ((t * 14 + q * 3) % 12), x = Math.round(g.nudo[0] + Math.cos(q * 0.785) * r), y = Math.round(g.nudo[1] + Math.sin(q * 0.785) * r); chispa(x, y, q); } }
  T.hoyDelante(R, t, o);
};
// 6 · 1979, de noche: el escultor dibuja; Lisa le trae una taza; por la ventana asoma una hoja de selva
const p6 = (t) => {
  const o = { encuadre: 'casa' }; T.taller(R, t, o);
  const h = tramo(t, jungla - 0.6, lado + 0.1);
  if (h > 0) { R.recorte([29, 32, 77, 85]);
    hoja(Math.round(lerp(92, 74, h)), Math.round(lerp(96, 80, h)), -2.5, 34, t, 0); hoja(Math.round(lerp(96, 78, h)), Math.round(lerp(70, 58, h)), 3.3, 26, t, 2); hoja(Math.round(lerp(60, 52, h)), Math.round(lerp(110, 88, h)), -1.75, 24, t, 4);
    R.recorte(null);
    if (h > 0.7) vid(76, 84, 84, Math.round(lerp(86, 112, tramo(t, lado, lado + 1.6))), 2, t, 1, true); }
  const ve = t > jungla + 0.7, vuelta = t > jungla + 1.3;
  const xl = Math.round(lerp(-20, 96, tramo(t, P6 + 0.2, noche)));
  const li = R.actor(EL.lisa, xl, 156, t, { dir: ve ? -1 : 1, anda: xl < 96, sostiene: true, sorpresa: ve && t < lado + 0.6, sonrisa: t > lado + 0.6, habla: ve && t < jungla + 1.5 });
  { const [x, y] = li.mano; R.rect(x - 2, y - 3, x + 3, y + 2, T.C.k); R.rect(x - 1, y - 2, x + 2, y + 1, hex('#f2f2ee')); R.pset(x + 4, y - 1, T.C.k); if (Math.floor(t * 3) % 2) R.pset(x, y - 5, hex('#c8c8d8')); else R.pset(x + 1, y - 6, hex('#c8c8d8')); }
  const dib = !vuelta, mx = 158 + Math.round(Math.sin(t * 5) * 3), my = 141 - Math.round(Math.sin(t * 5) * 1);
  const va = R.actor(EL.vanallsburg, 130, 156, t, { dir: vuelta ? -1 : 1, sostiene: dib ? [mx, my] : true, sorpresa: vuelta && t < lado + 1, sonrisa: t > lado + 1 });
  { const [x, y] = va.mano, d = vuelta ? -1 : 1; R.linea(x, y, x + d * 4, y + (dib ? 4 : -4), T.C.k); R.pset(x + d * 4, y + (dib ? 4 : -4), hex('#3a3a44')); }
  T.tallerDelante(R, t, o);
};
const efectos = [[1.7, 'coche'], [llamada, 'pop'], [a2026 + 0.2, 'papel'], [rompe - 1.8, 'zumbido'], [rompe, 'rafaga'], [caos, 'whoosh'], [P4 + 0.8, 'lapiz'], [carton + 0.1, 'pop'], [cartucho - 0.3, 'pop'], [P5 + 0.4, 'lapiz'], [empezo + 0.3, 'brillo'], [P6 + 0.6, 'lapiz'], [jungla, 'viento']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '2026', efectos, año: (t) => (t < P6 ? 2026 : 1979) });
''')
