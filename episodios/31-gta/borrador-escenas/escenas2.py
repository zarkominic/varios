E = {}

# utilidades del grupo S2 (gt-dundee y gt-dailly): cada escena las lleva dentro. Los fondos LOCAL usan la paleta de
# Dundee del decorado A (AD de gt-comun.js: piedra, arenisca, haya, bloque, moqueta) para que el corte no cambie de color.
HELP = r'''
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const tin = (x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, a)); };
const CAPAS = {};
const capa = (k, dib) => { if (!CAPAS[k]) { const b = R.nuevo(), prev = R.usar(b); dib(); R.usar(prev); CAPAS[k] = b; } R.copiar(CAPAS[k]); };
// como capa(), pero solo pega lo pintado (lo de debajo, por ejemplo un cielo que se mueve, queda a la vista)
const capaEncima = (k, dib) => { if (!CAPAS[k]) { const bb = R.nuevo(), prev = R.usar(bb); dib(); R.usar(prev); CAPAS[k] = bb; } const B = CAPAS[k]; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const c = B[y * 320 + x]; if (c) R.pset(x, y, c); } };
const sube = (u) => u * u * (3 - 2 * u);
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const tono = (r, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return r[l < 0 ? 0 : l >= r.length ? r.length - 1 : l]; };
const Q = Object.fromEntries(Object.entries({
  k: '#17151d', bl: '#f4f4ee', crema: '#efe6cc',
  pap0: '#c9b48c', pap1: '#d8c49c', pap2: '#e4d4b0', papR: '#b07a5a', papV: '#7a9a6a',
  mad: '#9a6a3c', madL: '#b8844c', madS: '#764e2a', madD: '#4e321c',
  haya: '#d0a872', hayaS: '#a6804e', hayaL: '#e4c290', hayaD: '#7a5a34',
  bloque: '#cfcab4', bloqueS: '#b6b09a', bloqueL: '#dedac6', bloqueJ: '#a8a28c',
  moq: '#5c6880', moqS: '#4a5468', moqL: '#6e7a92',
  beige: '#d8ccb0', beigeS: '#a89c80', beigeL: '#ece2c8', beigeD: '#7c725e',
  verde: '#3a8a4a', verdeL: '#5ab85a', verdeS: '#2a6a36', naranja: '#e8842a', naranjaS: '#b05a1a', naranjaL: '#ffb060',
  piel: '#f6c290', pielS: '#d48a5a', rojo: '#c8302a', rojoS: '#8a1e1a', rojoL: '#e8584a',
  azul: '#3a5aa8', azulS: '#26407a', azulL: '#6a8ad0', oro: '#f0c040', oroS: '#a87a18', oroL: '#ffe890',
  gris: '#8a8c90', grisS: '#5e6064', grisL: '#b8bac0', grisD: '#3a3c44',
  pant0: '#0e1a2e', pant1: '#16284a', pant2: '#22406e', fos: '#5ae07a', fosS: '#2a8a4a',
  cielo0: '#7c8da4', cielo1: '#90a0b4', cielo2: '#a6b3c2', cielo3: '#bec7d0', nubeL: '#e4e8ec', nubeM: '#c0c7d0', nubeS: '#99a3b0', nubeD: '#727c8c',
  piedra: '#9c9a94', piedraL: '#b8b4ac', piedraS: '#787670', piedraD: '#56544f',
  bronce: '#8c5c2c', bronceS: '#5c3c1c', bronceL: '#c48e4c', bronceB: '#e8b870', verdin: '#5a8a74',
  hierba: '#5a8a3e', hierbaL: '#78a84e', hierbaS: '#40682c', hierbaD: '#2e4e22',
  grava: '#b8ac94', gravaS: '#948870', gravaL: '#d0c6ae',
  tormenta0: '#2a2838', tormenta1: '#3a3850', tormenta2: '#4e4a66', rayo: '#e8f0ff',
}).map(([k, v]) => [k, hex(v)]));
// un rectángulo con borde negro y relleno
const caja = (x0, y0, x1, y1, c, borde = Q.k) => { R.rect(x0, y0, x1, y1, borde); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
// el paraguas abierto que alguien lleva en la mano (x, y = la mano): el palo, la cúpula a gajos y las varillas
const paraguas = (x, y, c1, c2, t = 0) => {
  const m = Math.round(Math.sin(t * 3 + x) * 0.6), cx = x + m, top = y - 22;
  R.linea(x, y, cx, top + 6, Q.k); R.pset(x - 1, y + 1, Q.k); R.pset(x - 2, y, Q.k);
  for (let i = -11; i <= 11; i++) { const a = Math.round(Math.sqrt(Math.max(0, 121 - i * i)) * 0.55); for (let j = top + 6 - a; j <= top + 6; j++) R.pset(cx + i, j, j === top + 6 - a ? Q.k : (Math.floor((i + 11) / 4) % 2 ? c1 : c2)); }
  for (let i = -11; i <= 11; i += 4) R.pset(cx + i, top + 7, Q.k); R.pset(cx, top - 1, Q.k);
};
// el bocadillo grande con un icono a doble tamaño (x, y = la punta de abajo)
const globo = (x, y, ic, col = Q.k) => { x = Math.round(x); y = Math.round(y); R.rect(x - 8, y - 20, x + 8, y - 3, Q.k); R.rect(x - 9, y - 19, x + 9, y - 4, Q.k); R.rect(x - 7, y - 19, x + 7, y - 4, Q.bl); R.rect(x - 8, y - 18, x + 8, y - 5, Q.bl); R.rect(x - 1, y - 3, x + 1, y - 2, Q.k); R.pset(x, y - 1, Q.k); R.pset(x, y - 3, Q.bl); R.icono(ic, x - (ic === '!' ? 3 : 5), y - 18, col, Q.bl, 2); };
// una caja de cartón con su cinta (x, y = centro de abajo)
const carton = (x, y, w, hh, o = {}) => {
  const x0 = Math.round(x - w / 2), y0 = y - hh;
  caja(x0, y0, x0 + w, y, hex('#c89a5a')); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + 2, hex('#dcb478')); R.rect(x0 + w - 3, y0 + 3, x0 + w - 1, y - 1, hex('#a07840'));
  R.rect(Math.round(x) - 1, y0 + 1, Math.round(x) + 1, y - 1, hex('#e8d8a8'));
  if (o.icono) { R.rect(x0 + 3, y0 + 5, x0 + 9, y0 + 10, Q.k); R.rect(x0 + 4, y0 + 6, x0 + 8, y0 + 8, Q.pant2); R.rect(x0 + 5, y0 + 10, x0 + 7, y0 + 11, Q.k); }
};
// cielo escocés tramado con nubes de tres tonos a tres velocidades (para los fondos LOCAL de exterior)
const nubeT = (cx, cy, w, t, col) => { for (let i = -w; i <= w; i++) { const a = Math.round((Math.sqrt(Math.max(0, w * w - i * i)) / w) * (w * 0.42) * (0.75 + 0.25 * Math.sin(i * 0.7 + cx))); for (let j = -a; j <= Math.round(a * 0.35); j++) { const x = Math.round(cx + i), y = Math.round(cy + j); const v = j < -a * 0.4 ? 0 : j < a * 0.1 ? 1 : 2; R.pset(x, y, col[Math.min(2, v + (h(x, y) > 0.8 ? 1 : 0))]); } } };
'''


E['gt-dundee'] = ('Dundee', '''// GT-DUNDEE (frases 4–5), finales de los ochenta → 1991. Siete planos (encuadres-ep31.md):
// 1. Dundee junto al Tay bajo la lluvia (decorado A ciudad): el joven Jones cruza el paseo con una caja de piezas bajo el
//    brazo; una señora con paraguas pasa al otro lado; el tren cruza el puente; corta en «Tay».
// 2. LOCAL su cuarto de finales de los ochenta: Jones monta un ordenador en el escritorio; la pantalla se enciende en
//    «studio» y él sonríe; lluvia en la ventana, el gato en la cama.
// 3. LOCAL de cerca: las manos con el soldador sobre la placa, chispitas y humo; en «D.M.A. Design» la mano pone junto a
//    la placa un cartelito con tres formas (cuadrado, triángulo, círculo: sin letras).
// 4. A oficina (1991, pantalla 'bichitos'): Jones se encoge de hombros con una «?» en «anything»; la barra salta a 1991 en
//    «And in 1991» y el equipo celebra en «gold»; llega la primera caja del juego en «released».
// 5. LOCAL la pantalla de tubo de cerca sobre la mesa: los bichitos andan hacia el precipicio y uno abre el paraguas en «save».
// 6. LOCAL contraplano: el equipo se ríe ante la pantalla; en «world» se encienden chinchetas en el mapa de la pared.
// 7. LOCAL la esquina de la mesa de cerca (gag 2): el bichito de juguete se tira del borde con el paraguas; risas en «laugh».''', HELP + r'''
const a = (f) => en('dundee', f), b = (f) => en('bichitos', f);
const P2 = a(0.3215), P3 = a(0.6047), P4 = a(0.8526), P5 = b(0.191), P6 = b(0.643), P7 = b(0.878);
const TAY = a(0.313), STUDIO = a(0.519);
// ── plano 1: Dundee bajo la lluvia ──
const p1 = (t) => {
  T.dundee(R, t, { lluvia: 0.6, año: 1990 });
  // la señora del paraguas va hacia la izquierda por detrás
  const v = tramo(t, 0.2, P2), xs = Math.round(lerp(236, 40, v));
  const s = R.actor(EL.comprador2GT, xs, 154, t, { dir: -1, anda: v < 1, sostiene: [xs + 4, 136] });
  paraguas(s.mano[0], s.mano[1], Q.rojo, Q.bl, t);
  // Jones entra por la izquierda con la caja, se para junto a la barandilla en «Tay» y mira al río
  const u = tramo(t, 0.3, TAY - 0.6), xj = Math.round(lerp(-20, 150, sube(u)));
  const para = t > TAY - 0.6;
  const j = R.actor(EL.jonesGT, xj, 157, t, { dir: para && t > TAY ? -1 : 1, anda: u > 0 && u < 1, sostiene: true, sonrisa: t > TAY + 0.1 });
  carton(j.mano[0], j.mano[1] + 5, 13, 10, { icono: true });
  T.dundeeDelante(R, t, { lluvia: 0.6, año: 1990 });
};
// ── plano 2: el cuarto de Jones, finales de los ochenta ──
const fondoCuarto = () => capa('cuarto', () => {
  // la pared: papel pintado de rayas con florecitas, más tranquilo arriba a la derecha (la esquina de Atom)
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) {
    const raya = (x % 14) < 4, calma = x > 262 && y < 54;
    let c = tono([Q.pap0, Q.pap1, Q.pap2], 1.2 + (raya && !calma ? 0.6 : 0) - y / 400 + (h(x, y) - 0.5) * 0.3, x, y);
    if (!calma && (x % 14) === 9 && (y % 11) === 5) c = Q.papR; if (!calma && (x % 14) === 9 && (y % 11) === 6) c = Q.papV;
    R.pset(x, y, c);
  }
  for (let x = 0; x < 320; x++) { R.pset(x, 26, Q.madS); R.pset(x, 27, Q.madL); R.pset(x, 28, Q.madD); }   // la moldura
  R.rect(0, 118, 319, 124, Q.madD); R.rect(0, 118, 319, 119, Q.madL);   // el zócalo
  // el suelo de tablas con vetas y juntas
  for (let y = 125; y < 180; y++) for (let x = 0; x < 320; x++) {
    const tabla = Math.floor((y - 125) / 7), jx = (x + tabla * 37) % 64;
    let c = tono([Q.madD, Q.madS, Q.mad, Q.madL], 1.6 + (tabla % 2) * 0.4 + Math.sin(x * 0.21 + tabla * 3) * 0.25 + (y - 125) / 120, x, y);
    if ((y - 125) % 7 === 6 || jx === 0) c = Q.madD; R.pset(x, y, c);
  }
  // la alfombra
  for (let y = 150; y < 178; y++) for (let x = 20; x < 140; x++) { const e = ((x - 80) / 60) ** 2 + ((y - 164) / 14) ** 2; if (e < 1) R.pset(x, y, e > 0.8 ? Q.k : e > 0.62 ? Q.oro : ((x + y) % 6 < 3 ? Q.rojo : Q.rojoS)); }
  // la ventana con la lluvia de Dundee (lo de fuera se pinta en cada fotograma, recortado al hueco)
  caja(18, 34, 86, 100, Q.bl); R.rect(16, 100, 88, 104, Q.bl); R.rect(16, 104, 88, 105, Q.beigeD);
  // las cortinas de cuadros escoceses
  for (const [x0, x1] of [[8, 22], [82, 96]]) for (let y = 30; y < 110; y++) for (let x = x0; x <= x1; x++) { const q = ((x >> 2) + (y >> 2)) % 2, l = (x % 8 < 2) || (y % 8 < 2); R.pset(x, y, x === x0 || x === x1 ? Q.k : l ? Q.verdeS : q ? Q.rojo : Q.rojoS); }
  R.rect(4, 28, 100, 30, Q.madD);
  // el póster (un cohete sobre un planeta y estrellas: sin letras)
  caja(108, 36, 144, 84, Q.pant1); for (let k = 0; k < 14; k++) R.pset(110 + (k * 13) % 32, 38 + (k * 7) % 44, Q.bl);
  R.disco(126, 84, 14, Q.azul); R.disco(122, 80, 3, Q.azulL); R.recorte(null);
  R.rect(124, 48, 128, 64, Q.bl); R.poligono([[124, 48], [128, 48], [126, 43]], Q.rojo); R.rect(122, 60, 123, 66, Q.rojo); R.rect(129, 60, 130, 66, Q.rojo); R.rect(125, 65, 127, 68, Q.naranja);
  R.rect(108, 84, 144, 86, Q.k);
  // la balda con disquetes, cajas de juegos, libros y una maqueta de avión
  R.rect(158, 70, 256, 73, Q.madD); R.rect(158, 70, 256, 70, Q.madL); R.rect(162, 73, 164, 78, Q.madD); R.rect(250, 73, 252, 78, Q.madD);
  [[162, Q.rojo], [167, Q.azul], [171, Q.verde], [175, Q.oro], [179, Q.grisD], [183, Q.rojoS]].forEach(([x, c], k) => { R.rect(x, 52 + (k % 3), x + 3, 69, Q.k); R.rect(x + 1, 53 + (k % 3), x + 2, 69, c); });
  for (let k = 0; k < 3; k++) { caja(192 + k * 13, 54, 203 + k * 13, 69, [Q.naranja, Q.azulL, Q.verdeL][k]); R.rect(194 + k * 13, 57, 201 + k * 13, 60, Q.bl); }
  for (let k = 0; k < 4; k++) { caja(232 + k * 4, 61, 236 + k * 4, 69, Q.grisD); R.pset(234 + k * 4, 62, Q.grisL); }
  // el escritorio (tablero, cajonera y patas) con la torre abierta, el teclado, el flexo y los cables
  caja(158, 126, 254, 133, Q.mad); R.rect(159, 127, 253, 127, Q.madL); for (let x = 162; x < 252; x += 9) R.pset(x, 130, Q.madS);
  caja(160, 133, 166, 162, Q.madS); caja(224, 133, 252, 162, Q.mad); for (const y of [136, 145, 154]) { R.rect(226, y, 250, y, Q.madD); R.rect(236, y + 3, 240, y + 4, Q.oro); }
  caja(204, 106, 236, 126, Q.beige); R.rect(205, 107, 235, 108, Q.beigeL); R.rect(207, 110, 233, 124, Q.grisD);   // la torre sin tapa
  R.rect(209, 112, 220, 118, Q.verdeS); for (let x = 210; x < 220; x += 2) R.pset(x, 113, Q.oro); R.rect(222, 112, 231, 116, Q.gris); R.rect(209, 120, 231, 121, Q.rojoS);
  R.poligono([[236, 108], [248, 102], [250, 124], [238, 126]], Q.beigeS); R.linea(236, 108, 248, 102, Q.k); R.linea(248, 102, 250, 124, Q.k);   // la tapa apoyada
  caja(170, 122, 196, 126, Q.beigeL); for (let x = 172; x < 195; x += 2) { R.pset(x, 123, Q.beigeD); R.pset(x + 1, 124, Q.beigeD); }
  R.linea(220, 126, 222, 140, Q.k); R.linea(222, 140, 216, 160, Q.k); R.linea(200, 126, 196, 162, Q.grisD);
  // la cama con la manta de cuadros
  caja(258, 112, 266, 164, Q.madS); caja(262, 128, 320, 150, Q.bl);
  for (let y = 132; y < 162; y++) for (let x = 268; x < 320; x++) { const q = ((x >> 2) + (y >> 2)) % 2; R.pset(x, y, y === 132 ? Q.k : (x % 9 < 2 || y % 9 < 2) ? Q.oro : q ? Q.azul : Q.azulS); }
  caja(272, 122, 300, 132, Q.crema);
  // cajas de cartón de las piezas en el suelo y una regleta
  carton(34, 160, 26, 20, { icono: true }); carton(38, 140, 20, 14); carton(66, 166, 18, 12);
  caja(100, 166, 122, 170, Q.bl); for (let k = 0; k < 4; k++) R.pset(104 + k * 5, 168, Q.rojo); R.linea(122, 168, 160, 160, Q.k);
});
const p2 = (t) => {
  fondoCuarto();
  // por la ventana: el cielo gris, los tejados y las chimeneas de enfrente, y la lluvia (recortado al hueco)
  R.recorte([20, 36, 84, 98]);
  for (let y = 36; y < 99; y++) for (let x = 20; x < 85; x++) R.pset(x, y, tono([Q.cielo0, Q.cielo1, Q.cielo2], 2 - (y - 36) / 40 + (h(x, y) - 0.5) * 0.4, x, y));
  nubeT(((t * 3) % 120) + 10, 46, 16, t, [Q.nubeL, Q.nubeM, Q.nubeS]); nubeT(((t * 1.5 + 60) % 120) + 0, 54, 12, t, [Q.nubeM, Q.nubeS, Q.nubeD]);
  for (let x = 20; x < 85; x++) { const tj = 74 + Math.round(Math.abs(((x - 20) % 22) - 11) * 0.7); for (let y = tj; y < 99; y++) R.pset(x, y, y === tj ? Q.k : (y + (x >> 3)) % 4 ? Q.piedraS : Q.piedraD); }
  for (const cx of [30, 52, 74]) { R.rect(cx, 66, cx + 4, 74, Q.k); R.rect(cx + 1, 67, cx + 3, 74, Q.piedra); const hu = (t * 6 + cx) % 14; R.pset(cx + 2 + Math.round(Math.sin(t + cx) * 1.5), 64 - hu, Q.nubeM); R.pset(cx + 3, 62 - hu, Q.nubeL); }
  for (let k = 0; k < 26; k++) { const x = 20 + (k * 29 + Math.floor(t * 40) * 3) % 65, y = 36 + (k * 17 + t * 120) % 63; R.linea(x, y, x - 1, y + 3, Q.nubeL); }
  for (let k = 0; k < 5; k++) { const y = 36 + ((t * 7 + k * 13) % 62), x = 24 + k * 12; R.pset(x, y, Q.bl); R.pset(x, y + 1, Q.cielo3); }   // gotas que resbalan por el cristal
  R.recorte(null);
  caja(51, 34, 53, 100, Q.bl); R.rect(18, 66, 86, 67, Q.bl);   // el parteluz y el travesaño
  R.rect(40, 96, 48, 100, Q.rojoS); R.disco(44, 94, 3, Q.verde); R.pset(43, 92, Q.verdeL);   // la maceta del alféizar
  // el gato en la cama: la cola se mueve y parpadea
  const gx = 290; R.disco(gx, 124, 6, Q.k); R.disco(gx, 124, 5, Q.grisS); R.disco(gx + 6, 120, 4, Q.k); R.disco(gx + 6, 120, 3, Q.grisS);
  R.pset(gx + 4, 116, Q.k); R.pset(gx + 8, 116, Q.k); if ((t % 3.1) > 0.15) { R.pset(gx + 5, 120, Q.verdeL); R.pset(gx + 8, 120, Q.verdeL); }
  const cola = Math.sin(t * 2.4) * 4; R.linea(gx - 5, 126, gx - 10, Math.round(122 + cola), Q.grisS); R.pset(gx - 10, Math.round(122 + cola), Q.k);
  // el flexo que se enciende cuando arranca el ordenador
  R.linea(250, 126, 256, 104, Q.k); R.linea(256, 104, 244, 96, Q.k); R.poligono([[238, 94], [248, 92], [246, 100]], Q.rojo);
  if (t > STUDIO - 0.3) for (let y = 100; y < 126; y++) for (let x = 226 - (y - 100); x < 250; x++) if ((x + y) % 3 === 0) tin(x, y, Q.oroL, 0.25);
  // Jones trae el monitor, lo pone en la mesa, enchufa y se enciende en «studio»
  const u = tramo(t, P2 + 0.2, P2 + 2.3), xj = Math.round(lerp(28, 140, sube(u))), deja = tramo(t, P2 + 2.4, P2 + 3.0);
  const j = R.actor(EL.jonesGT, xj, 160, t, { dir: 1, anda: u > 0 && u < 1, sostiene: deja < 1 ? true : undefined, dedo: deja >= 1 && t < STUDIO, sonrisa: t > STUDIO, salto: t > STUDIO + 0.2 && t < STUDIO + 0.6 ? 2 : 0 });
  const mx = deja < 1 ? Math.round(lerp(j.mano[0] + 4, 178, deja)) : 178, my = deja < 1 ? Math.round(lerp(j.mano[1] + 6, 122, deja)) : 122;
  caja(mx - 12, my - 20, mx + 12, my, Q.beige); R.rect(mx - 11, my - 19, mx + 11, my - 18, Q.beigeL); R.rect(mx - 9, my - 17, mx + 7, my - 4, Q.k);
  const enc = t > STUDIO;
  R.rect(mx - 8, my - 16, mx + 6, my - 5, enc ? Q.pant1 : Q.grisD);
  if (enc) { for (let k = 0; k < 4; k++) R.rect(mx - 7, my - 15 + k * 3, mx - 7 + Math.min(12, Math.round((t - STUDIO) * 14) - k * 3), my - 14 + k * 3, Q.fos); if (Math.floor(t * 3) % 2) R.rect(mx - 7, my - 6, mx - 6, my - 6, Q.fos); }
  R.pset(mx + 9, my - 4, enc ? Q.fos : Q.grisS);
  if (deja >= 1) { caja(mx - 4, my, mx + 4, my + 3, Q.beigeS); R.linea(mx + 10, my - 2, 204, 124, Q.k); }
  if (enc) for (let k = 0; k < 10; k++) tin(mx - 14 + (k * 7) % 28, my - 22 + (k * 5) % 12, Q.fos, 0.15);
};
// ── plano 3: las manos con el soldador ──
const fondoMesa = () => capa('mesa', () => {
  // el tablero de corcho perforado con herramientas colgadas (arriba), más liso en la esquina de Atom
  for (let y = 0; y < 56; y++) for (let x = 0; x < 320; x++) { const calma = x > 262 && y < 50; let c = tono([Q.beigeS, Q.beige, Q.beigeL], 1.3 - y / 120 + (h(x, y) - 0.5) * 0.3, x, y); if (!calma && x % 8 === 4 && y % 8 === 4) c = Q.beigeD; R.pset(x, y, c); }
  R.rect(0, 54, 319, 57, Q.hayaD);
  // los alicates, el carrete de estaño y el destornillador colgados
  R.linea(40, 14, 34, 40, Q.grisD); R.linea(44, 14, 50, 40, Q.grisD); R.disco(42, 14, 3, Q.rojo); R.rect(32, 36, 36, 46, Q.rojo); R.rect(48, 36, 52, 46, Q.rojo);
  R.disco(84, 28, 10, Q.k); R.disco(84, 28, 9, Q.grisL); R.disco(84, 28, 3, Q.grisD); for (let a = 0; a < 6; a++) R.pset(84 + Math.round(Math.cos(a) * 6), 28 + Math.round(Math.sin(a) * 6), Q.gris);
  R.rect(120, 12, 122, 34, Q.grisL); R.rect(118, 34, 124, 48, Q.amarillo ?? Q.oro); R.rect(119, 35, 120, 47, Q.oroL);
  caja(150, 10, 210, 46, Q.bl); for (let k = 0; k < 5; k++) R.rect(156, 16 + k * 6, 156 + 20 + (k * 13) % 26, 17 + k * 6, Q.grisS);   // un esquema clavado (rayas, sin letras)
  R.linea(168, 40, 200, 22, Q.azul); R.disco(184, 32, 3, Q.rojo);
  caja(222, 8, 252, 46, Q.bl); R.rect(223, 9, 251, 16, Q.azul); R.numero('88', 237, 15, { fina: true, centro: true, color: Q.bl }); for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) R.rect(226 + c * 5, 20 + r * 6, 228 + c * 5, 22 + r * 6, (r * 5 + c) < 11 ? Q.rojoL : Q.grisL);
  for (let x = 0; x < 320; x += 1) if (x % 37 < 2) R.rect(x, 0, x, 2, Q.beigeD);
  // el tablero de haya en perspectiva con vetas
  for (let y = 57; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.11) * 2 + y * 0.02) ; R.pset(x, y, tono([Q.hayaD, Q.hayaS, Q.haya, Q.hayaL], 1.7 + v * 0.45 + (y - 57) / 160 + (h(x, y) - 0.5) * 0.2, x, y)); }
  // el periódico de los anuncios de trabajo: todos tachados (sin letras: rayas grises y cruces rojas)
  R.poligono([[8, 108], [92, 102], [100, 176], [14, 180]], Q.k); R.poligono([[10, 109], [91, 104], [98, 175], [16, 178]], Q.crema);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) { const x0 = 18 + c * 38 + r, y0 = 112 + r * 21; for (let k = 0; k < 4; k++) R.rect(x0, y0 + k * 4, x0 + 30, y0 + k * 4 + 1, Q.grisL); R.rect(x0, y0, x0 + 14, y0 + 1, Q.grisS);
    R.linea(x0 - 1, y0 - 1, x0 + 30, y0 + 15, Q.rojo); R.linea(x0 - 1, y0 + 15, x0 + 30, y0 - 1, Q.rojo); R.linea(x0, y0 - 1, x0 + 31, y0 + 15, Q.rojo); }
  // la taza, los componentes sueltos y los disquetes
  caja(112, 70, 130, 92, Q.bl); R.rect(130, 76, 134, 86, Q.k); R.rect(114, 72, 128, 74, Q.madS); R.rect(118, 80, 124, 86, Q.rojo);
  for (let k = 0; k < 9; k++) { const x = 106 + (k * 23) % 50, y = 112 + (k * 11) % 60; if (k % 3 === 0) { R.rect(x, y, x + 5, y + 2, Q.oro); R.pset(x - 1, y + 1, Q.grisS); R.pset(x + 6, y + 1, Q.grisS); } else if (k % 3 === 1) { R.rect(x, y, x + 6, y + 3, Q.k); } else { R.disco(x, y, 2, Q.azul); R.pset(x, y + 3, Q.grisS); } }
  for (let k = 0; k < 2; k++) { caja(160 + k * 10, 66 + k * 6, 190 + k * 10, 96 + k * 6, [Q.grisD, Q.azulS][k]); R.rect(168 + k * 10, 67 + k * 6, 182 + k * 10, 76 + k * 6, Q.grisL); R.rect(166 + k * 10, 86 + k * 6, 184 + k * 10, 95 + k * 6, Q.bl); }
  // la placa verde con las pistas de cobre, los chips y los huecos
  R.poligono([[170, 100], [304, 96], [310, 166], [166, 172]], Q.k); R.poligono([[172, 102], [302, 98], [307, 164], [168, 169]], Q.verdeS);
  for (let k = 0; k < 16; k++) { const y = 106 + k * 4; R.linea(174, y + 1, 302, y - 2, (k % 3) ? hex('#4a9a5a') : Q.oroS); }
  for (const [x, y, w] of [[180, 108, 22], [214, 112, 16], [246, 106, 26], [186, 136, 14], [212, 150, 18]]) { caja(x, y, x + w, y + 9, Q.grisD); R.rect(x + 1, y + 1, x + w - 1, y + 1, Q.gris); for (let i = x + 2; i < x + w; i += 3) { R.pset(i, y - 1, Q.grisL); R.pset(i, y + 10, Q.grisL); } }
  for (let k = 0; k < 6; k++) { const x = 186 + k * 7, y = 124; R.rect(x, y, x + 2, y + 6, [Q.azul, Q.rojo, Q.oro][k % 3]); }
});
const SOLD = [[252, 126], [262, 128], [272, 126], [282, 124], [288, 138], [276, 148], [262, 152], [250, 150]];
const p3 = (t) => {
  fondoMesa();
  // el vapor de la taza
  for (let k = 0; k < 3; k++) { const v = (t * 0.8 + k / 3) % 1; tin(260 + Math.round(Math.sin(v * 6 + k) * 3), 72 - v * 22, Q.bl, 0.5 * (1 - v)); tin(261 + Math.round(Math.sin(v * 6 + k) * 3), 71 - v * 22, Q.bl, 0.35 * (1 - v)); }
  // las soldaduras que ya brillan y la que se está haciendo
  const u = tramo(t, P3 + 0.1, P4 - 0.3) * (SOLD.length - 0.01), k = Math.floor(u), f = u - k;
  for (let i = 0; i < SOLD.length; i++) { const [x, y] = SOLD[i]; R.disco(x, y, 2, Q.k); R.disco(x, y, 1, i < k ? Q.grisL : Q.oroS); if (i < k) R.pset(x - 1, y - 1, Q.bl); }
  const [sx, sy] = SOLD[k], toca = f > 0.25 && f < 0.85, alza = toca ? 0 : 4;
  // el humito y las chispitas en la punta
  if (toca) { for (let n = 0; n < 4; n++) { const v = ((t * 2 + n / 4) % 1); tin(sx + Math.round(Math.sin(v * 5 + n) * 3), sy - 3 - v * 18, Q.bl, 0.6 * (1 - v)); } if (Math.floor(t * 12) % 3 === 0) for (const [dx, dy] of [[-3, -2], [3, -3], [-2, 2], [4, 1]]) R.pset(sx + dx, sy + dy, Q.oroL); }
  // el soldador en la mano derecha (el brazo canónico entra desde abajo a la derecha)
  const tx = sx, ty = sy - alza, hx = tx + 22, hy = ty + 18;
  T.brazo(R, 372, 232, hx + 10, hy + 2, '#2a3a6a', -1);
  R.linea(tx, ty, hx - 2, hy - 2, Q.grisL); R.linea(tx + 1, ty, hx - 1, hy - 2, Q.grisS);
  R.linea(tx + 6, ty + 5, hx + 4, hy + 2, Q.k); R.linea(tx + 6, ty + 4, hx + 4, hy + 1, Q.rojo); R.linea(tx + 7, ty + 5, hx + 4, hy + 3, Q.rojoS);
  R.linea(hx + 4, hy + 2, 330, 150, Q.k);   // el cable
  if (toca) { R.pset(tx, ty, Q.oroL); R.pset(tx, ty + 1, Q.naranja); }
  // la mano izquierda pone el cartelito de las tres formas en «D.M.A. Design»
  const c = tramo(t, a(0.758), a(0.82)), r = tramo(t, a(0.825), P4 - 0.1), cx = Math.round(lerp(-30, 28, sube(c)) - lerp(0, 60, r)), cy = 74;
  const cxF = 28, cyF = 74, puesta = c >= 1;
  const kx = puesta ? cxF : cx, ky = cy;
  caja(kx - 20, ky - 12, kx + 20, ky + 12, Q.bl); R.rect(kx - 19, ky + 9, kx + 19, ky + 11, Q.grisL);
  caja(kx - 15, ky - 6, kx - 6, ky + 4, Q.rojo); R.poligono([[kx - 3, ky + 4], [kx + 5, ky + 4], [kx + 1, ky - 6]], Q.oro); R.disco(kx + 13, ky - 1, 5, Q.k); R.disco(kx + 13, ky - 1, 4, Q.azul);
  if (r < 1 && cx > -40) T.brazo(R, -60, 84, Math.min(cx, kx) - 20, ky + 6, '#2a3a6a', 1);
};
// ── plano 4: la oficina de DMA ──
const ANY = a(0.97), GOLD = b(0.0935), REL = b(0.163);
const cajaBichito = (x, y) => { caja(x - 6, y - 15, x + 6, y, Q.naranja); R.rect(x - 5, y - 14, x + 5, y - 13, Q.naranjaL); R.disco(x, y - 7, 3, Q.naranjaS); R.rect(x - 2, y - 11, x + 2, y - 10, Q.verdeL); R.pset(x - 1, y - 7, Q.bl); R.pset(x + 1, y - 7, Q.bl); R.rect(x - 4, y - 3, x + 4, y - 2, Q.bl); };
const p4 = (t) => {
  T.dundee(R, t, { encuadre: 'oficina', pantalla: 'bichitos', lluvia: 0.6 });
  // el bichito de juguete ya está en la esquina de la mesa
  T.PIEZAS_GT.bichito(R, 184, 131, { t });
  const salto = (k) => t > GOLD && t < GOLD + 1.2 ? Math.round(Math.abs(Math.sin((t - GOLD) * 7 + k)) * 4) : 0;
  const d = R.actor(EL.daillyGT, 66, 150, t, { dir: 1, sonrisa: t > ANY - 0.2, habla: t < ANY - 0.4 && Math.floor(t * 6) % 2 === 0, brazos: t > GOLD && t < GOLD + 1.2, salto: salto(1) });
  const shrug = t > ANY - 0.15 && t < ANY + 0.9;
  R.actor(EL.jonesGT, 112, 150, t, { dir: -1, habla: t < ANY - 0.2 && Math.floor(t * 7) % 2 === 0, brazos: shrug || (t > GOLD && t < GOLD + 1.2), sonrisa: t > ANY + 0.3, salto: salto(0) });
  if (shrug || (t > ANY && t < ANY + 1.4)) globo(120, 120 - Math.round(tramo(t, ANY - 0.15, ANY + 0.1) * 4), '?');
  // las chispas doradas de «struck gold»
  if (t > GOLD && t < GOLD + 1.6) for (let k = 0; k < 18; k++) { const v = (t - GOLD) / 1.6, x = 100 + Math.round(Math.cos(k * 2.1) * (20 + v * 50)), y = 108 + Math.round(Math.sin(k * 1.3) * 20 + v * 40); R.pset(x, y, k % 2 ? Q.oroL : Q.oro); if (k % 3 === 0) R.pset(x + 1, y, Q.oroL); }
  // el compañero entra con la primera caja del juego en «released»
  const v = tramo(t, REL - 1.0, REL + 0.3), xc = Math.round(lerp(-20, 146, sube(v)));
  if (t > REL - 1.0) { const c = R.actor(EL.programadorNorth, xc, 152, t, { dir: 1, anda: v > 0 && v < 1, sostiene: true, sonrisa: v >= 1 }); cajaBichito(c.mano[0] + 2, c.mano[1] + 6); }
  T.dundeeDelante(R, t, { encuadre: 'oficina', pantalla: 'bichitos', lluvia: 0.6 });
};
// ── plano 5: la pantalla de tubo de cerca ──
const SAVE = b(0.577), DANGER = b(0.478);
const fondoTubo = () => capa('tubo', () => {
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { let c = tono([Q.bloqueJ, Q.bloqueS, Q.bloque], 1.4 - y / 300 + (h(x, y) - 0.5) * 0.25, x, y); if (y % 12 === 0 || (x + (Math.floor(y / 12) % 2) * 12) % 24 === 0) c = Q.bloqueJ; R.pset(x, y, c); }
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono([Q.hayaD, Q.hayaS, Q.haya, Q.hayaL], 1.8 + Math.sin(x * 0.04 + y * 0.3) * 0.4 + (y - 132) / 80, x, y));
  R.rect(0, 131, 319, 133, Q.hayaD);
  // un cartel del corcho a la izquierda (bocetos de bichitos) y una planta a la derecha
  caja(6, 30, 44, 84, hex('#b88a5a')); for (let k = 0; k < 3; k++) { caja(10 + k * 11, 36 + (k % 2) * 6, 19 + k * 11, 48 + (k % 2) * 6, Q.bl); R.disco(14 + k * 11, 42 + (k % 2) * 6, 2, Q.naranja); R.pset(14 + k * 11, 39 + (k % 2) * 6, Q.verde); R.pset(14 + k * 11, 36 + (k % 2) * 6, Q.rojo); }
  caja(12, 58, 38, 78, Q.bl); R.linea(15, 74, 35, 62, Q.azul); R.disco(25, 68, 2, Q.rojo);
  caja(282, 104, 300, 132, Q.rojoS); for (let k = 0; k < 7; k++) { R.linea(291, 104, 291 + Math.round(Math.cos(k * 0.9 + 3.6) * 14), 104 + Math.round(Math.sin(k * 0.9 + 3.6) * 22), Q.verdeS); }
  // el monitor de tubo beis grande, con su sombra, los botones y la lucecita
  for (let y = 20; y < 150; y++) for (let x = 52; x < 272; x++) tin(x + 6, y + 4, Q.k, 0.25);
  caja(50, 14, 270, 146, Q.beige); R.rect(51, 15, 269, 17, Q.beigeL); R.rect(51, 140, 269, 145, Q.beigeS);
  caja(64, 24, 256, 128, Q.beigeD); caja(68, 28, 252, 124, Q.k);
  for (let k = 0; k < 6; k++) R.rect(206 + k * 6, 134, 209 + k * 6, 135, Q.beigeD); R.disco(80, 136, 3, Q.beigeS); R.disco(92, 136, 3, Q.beigeS);
  caja(130, 146, 190, 152, Q.beigeS);
  // el teclado delante y el ratón con su alfombrilla
  R.poligono([[60, 158], [210, 156], [216, 180], [52, 180]], Q.k); R.poligono([[62, 159], [208, 157], [213, 180], [55, 180]], Q.beigeL);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 18; c++) { const x = 64 + c * 8 + r, y = 162 + r * 5; R.rect(x, y, x + 5, y + 3, Q.beige); R.rect(x, y + 3, x + 5, y + 3, Q.beigeS); }
  caja(232, 156, 300, 180, Q.azulS); for (let y = 158; y < 180; y += 3) R.rect(234, y, 298, y, Q.azul);
  R.linea(264, 158, 250, 146, Q.k); R.linea(250, 146, 230, 148, Q.k);
});
const nivel = (t) => {
  // el nivel: el cielo de noche con estrellas, las colinas lejanas, la plataforma de tierra y el precipicio
  R.recorte([69, 29, 251, 123]);
  for (let y = 29; y < 124; y++) for (let x = 69; x < 252; x += 1) R.pset(x, y, tono([Q.pant0, Q.pant1, Q.pant2], (y - 29) / 40, x, y));
  for (let k = 0; k < 22; k++) { const x = 72 + (k * 37) % 178, y = 32 + (k * 23) % 40; if (Math.sin(t * 3 + k) > -0.4) R.pset(x, y, Q.bl); }
  for (let x = 69; x < 252; x++) { const yy = 86 + Math.round(Math.sin(x * 0.07) * 5 + Math.sin(x * 0.19) * 2); for (let y = yy; y < 124; y++) R.pset(x, y, hex('#1e3a5a')); }
  // la plataforma (de x 69 a 196) con la hierba, las rocas y el borde; abajo, el agua que brilla
  for (let y = 98; y < 124; y++) for (let x = 69; x < 197; x++) R.pset(x, y, y < 101 ? (x % 4 ? Q.verdeL : Q.verde) : tono([hex('#5a3a1e'), hex('#7a4e26'), hex('#9a6a34')], 1.2 + Math.sin(x * 0.4 + y) * 0.6, x, y));
  for (let y = 98; y < 124; y++) R.pset(196 - Math.floor((y - 98) / 5), y, Q.k);
  for (let x = 197; x < 252; x++) for (let y = 116; y < 124; y++) R.pset(x, y, (x + y + Math.floor(t * 6)) % 7 ? hex('#2a5a9a') : hex('#8ac0f0'));
  // la plataforma baja de la derecha, donde se llega con el paraguas
  for (let y = 108; y < 124; y++) for (let x = 222; x < 252; x++) R.pset(x, y, y < 111 ? Q.verdeL : hex('#7a4e26'));
  // los bichitos (nuestros: mono naranja, mata verde) que andan hacia el borde
  const bicho = (x, y, f, par) => {
    x = Math.round(x); y = Math.round(y);
    const P = (i, j, c) => { R.pset(x + i * 2, y + j * 2, c); R.pset(x + i * 2 + 1, y + j * 2, c); R.pset(x + i * 2, y + j * 2 + 1, c); R.pset(x + i * 2 + 1, y + j * 2 + 1, c); };
    if (par) { for (let i = -5; i <= 5; i++) { const aa = Math.round(Math.sqrt(25 - i * i) * 0.6); for (let j = -aa; j <= 0; j++) P(i, -13 + j, j === -aa ? Q.k : (Math.floor((i + 5) / 3) % 2) ? Q.bl : Q.rojo); } for (let j = -13; j <= -6; j++) P(0, j, Q.k); }
    for (let i = -3; i <= 3; i++) for (let j = -7; j <= 0; j++) { const d = Math.hypot(i, (j + 3.5) * 0.9); if (d < 3.6) P(i, j, d > 2.8 ? Q.k : j > -2 ? Q.naranjaS : Q.naranja); }
    P(-1, -5, Q.piel); P(0, -5, Q.piel); P(1, -5, Q.piel); P(1, -5, Q.k); P(-1, -5, Q.bl); P(0, -2, Q.oro);
    for (const [i, j] of [[-2, -7], [-1, -8], [0, -9], [1, -8], [2, -7], [0, -8], [-1, -7], [1, -7]]) P(i, j, j === -9 ? Q.verdeL : Q.verde);
    P(-2 + f, 1, Q.k); P(1 - f, 1, Q.k);
  };
  const t0 = P5 + 0.2;
  for (let k = 0; k < 7; k++) {
    let x = 82 - k * 22 + (t - t0) * 26, y = 96, par = false;
    if (k === 0) { if (t > SAVE) { const w = tramo(t, SAVE, SAVE + 1.6); par = true; x = 190 + w * 40; y = 96 + Math.round(sube(w) * 12); } else x = Math.min(x, 190); }
    else x = Math.min(x, 176 - (k - 1) * 14);
    if (x > 66) bicho(x, y, Math.floor(t * 6 + k) % 2, par);
  }
  if (t > DANGER - 0.1 && t < SAVE) R.icono('!', 190, 62, Q.oroL, Q.k, 2);
  // el cursor del ratón que va al bichito del borde y hace clic en «save»
  const cu = tramo(t, SAVE - 1.2, SAVE - 0.1), kx = Math.round(lerp(120, 194, cu)), ky = Math.round(lerp(50, 80, cu));
  for (let j = 0; j < 12; j++) for (let i = 0; i <= j / 1.6; i++) R.pset(kx + i, ky + j, i === 0 || i >= Math.floor(j / 1.6) || j === 11 ? Q.k : Q.bl);
  if (t > SAVE - 0.1 && t < SAVE + 0.3) { R.anillo(kx, ky, 6, Q.oroL); R.anillo(kx, ky, 8, Q.oro); }
  // las rayas del tubo, la curva y el reflejo
  for (let y = 29; y < 124; y += 2) for (let x = 69; x < 252; x += 1) tin(x, y, Q.k, 0.18);
  R.recorte(null);
  for (let k = 0; k < 18; k++) { tin(78 + k, 34 + Math.round(k * 0.3), Q.bl, 0.35); tin(78 + Math.round(k * 0.2), 34 + k, Q.bl, 0.25); }
};
const p5 = (t) => {
  fondoTubo(); nivel(t);
  R.pset(244, 136, Math.floor(t * 2) % 2 ? Q.fos : Q.fosS);
  // la mano en el ratón: clic en «save»
  const cl = t > SAVE - 0.1 && t < SAVE + 0.15 ? 1 : 0;
  caja(256, 160 + cl, 272, 176, Q.beigeL); R.linea(264, 160 + cl, 264, 166 + cl, Q.beigeD);
  T.brazo(R, 340, 196, 276, 172 + cl, '#2a3a6a', -1, { sombra: false });
};
// ── plano 6: el contraplano, el equipo se ríe ante la pantalla ──
const WORLD = b(0.701), JSAID = b(0.751);
const fondoContra = () => capa('contra', () => {
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono([Q.moqS, Q.moq, Q.moqL], 0.8 + (y - 120) / 50 + ((x >> 3) + (y >> 3)) % 2 * 0.3 + (h(x, y) - 0.5) * 0.3, x, y));
  R.rect(0, 117, 319, 120, Q.grisD); R.rect(0, 117, 319, 117, Q.grisS); R.linea(150, 120, 120, 180, Q.k); R.linea(151, 120, 122, 180, Q.grisD);
  // en el suelo: cinta en los cables, una caja de pizza, papeles y disquetes, y cajas del juego apiladas junto a la estantería
  for (let k = 0; k < 4; k++) R.rect(146 - k * 7, 126 + k * 14, 150 - k * 7, 127 + k * 14, Q.oro);
  caja(214, 168, 250, 176, hex('#e8d8b0')); R.rect(215, 169, 249, 169, hex('#c8a870')); R.disco(232, 172, 2, Q.rojoS);
  R.poligono([[166, 172], [184, 170], [186, 178], [168, 179]], Q.bl); R.poligono([[190, 166], [204, 165], [205, 171], [191, 172]], Q.bl); caja(104, 170, 112, 177, Q.azulS);
  for (let y = 0; y < 117; y++) for (let x = 0; x < 320; x++) { let c = tono([Q.bloqueJ, Q.bloqueS, Q.bloque], 1.5 - y / 260 + (h(x, y) - 0.5) * 0.25, x, y); if (y % 12 === 0 || (x + (Math.floor(y / 12) % 2) * 12) % 24 === 0) c = Q.bloqueJ; R.pset(x, y, c); }
  for (let y = 0; y < 8; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 40 < 1) ? Q.grisS : Q.grisL);
  // el mapamundi de la pared (manchas de continentes, sin letras) con su marco y sus paralelos
  caja(104, 22, 212, 84, hex('#6a9ac8')); R.rect(103, 21, 213, 21, Q.madD); R.rect(103, 85, 213, 86, Q.madD);
  for (const [cx, cy, rx, ry] of [[126, 40, 12, 9], [134, 64, 6, 12], [162, 38, 9, 7], [166, 58, 8, 12], [192, 42, 15, 9], [204, 70, 6, 5], [150, 30, 4, 3]]) for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) if ((x / rx) ** 2 + (y / ry) ** 2 < 1 - h(cx + x, cy + y) * 0.25) R.pset(cx + x, cy + y, (x + y) % 5 ? hex('#8ab86a') : hex('#6a9a4e'));
  for (let x = 106; x < 211; x += 4) { R.pset(x, 53, hex('#8ab0d8')); R.pset(x, 38, hex('#7aa4d0')); R.pset(x, 68, hex('#7aa4d0')); }
  // la estantería con archivadores y cajas del juego, la ventana con persiana y el reloj
  caja(228, 52, 274, 117, Q.madS); for (const y of [72, 96]) R.rect(229, y, 273, y + 1, Q.madD);
  for (let k = 0; k < 8; k++) { const x = 231 + k * 5; caja(x, 54 + (k % 2) * 2, x + 4, 71, [Q.rojo, Q.azul, Q.oro, Q.verde][k % 4]); }
  for (let k = 0; k < 3; k++) { caja(232 + k * 13, 80, 243 + k * 13, 95, Q.naranja); R.disco(237 + k * 13, 87, 2, Q.naranjaS); R.rect(235 + k * 13, 83, 239 + k * 13, 83, Q.verdeL); }
  for (let k = 0; k < 5; k++) caja(232 + k * 8, 100, 238 + k * 8, 115, Q.grisD);
  caja(14, 26, 80, 96, Q.bl); for (let y = 28; y < 58; y += 3) R.rect(15, y, 79, y + 1, Q.beigeL); R.rect(15, 58, 79, 95, Q.cielo1);
  R.disco(90, 36, 8, Q.k); R.disco(90, 36, 7, Q.bl);
});
const mesaContra = () => capaEncima('mesaC', () => {
  // en primer término a la izquierda: la esquina de la mesa con el monitor de tubo de espaldas; a la derecha, el respaldo de una silla
  R.poligono([[0, 132], [96, 132], [104, 140], [0, 140]], Q.k); R.poligono([[0, 133], [95, 133], [101, 139], [0, 139]], Q.haya);
  for (let y = 140; y < 180; y++) for (let x = 0; x < 104 - (y - 140) * 0.1; x++) R.pset(x, y, tono([Q.hayaD, Q.hayaS, Q.haya], 1.3 + Math.sin(x * 0.07 + y * 0.4) * 0.4, x, y));
  R.rect(0, 140, 103, 141, Q.hayaD); R.rect(30, 152, 60, 152, Q.hayaD); R.rect(40, 158, 50, 159, Q.grisL);
  caja(16, 84, 84, 132, Q.beigeS); R.rect(17, 85, 83, 89, Q.beige); R.poligono([[24, 92], [76, 92], [70, 126], [30, 126]], Q.beigeD); for (let k = 0; k < 6; k++) R.rect(34 + k * 6, 98, 36 + k * 6, 118, Q.beigeS);
  caja(40, 128, 60, 133, Q.beigeS); R.linea(84, 120, 104, 132, Q.k);
  caja(88, 124, 98, 133, Q.bl); R.rect(90, 128, 96, 130, Q.azul);
  caja(258, 120, 300, 160, Q.azulS); R.rect(260, 122, 298, 126, Q.azul); for (let y = 130; y < 158; y += 4) R.rect(262, y, 296, y, Q.azul); R.rect(276, 160, 282, 172, Q.k); R.rect(262, 172, 296, 174, Q.k);
});
const p6 = (t) => {
  fondoContra();
  // la lluvia por la ventana y el segundero
  R.recorte([15, 59, 79, 95]); for (let k = 0; k < 14; k++) { const x = 15 + (k * 13 + Math.floor(t * 30)) % 64, y = 59 + (k * 11 + t * 90) % 36; R.linea(x, y, x - 1, y + 3, Q.nubeL); } R.recorte(null);
  const an = t * 1.0; R.linea(90, 36, 90 + Math.round(Math.cos(an) * 6), 36 + Math.round(Math.sin(an) * 6), Q.rojo); R.linea(90, 36, 90, 31, Q.k);
  // las chinchetas que se encienden por el mundo en «world»
  const pins = [[128, 38], [190, 42], [164, 56], [134, 62], [204, 70], [162, 36], [180, 46]];
  pins.forEach(([x, y], k) => { const on = t > WORLD - 0.8 + k * 0.18; if (on) { R.disco(x, y, 2, Q.k); R.disco(x, y, 1, Q.rojoL); if (t < WORLD + 0.2 + k * 0.18) R.anillo(x, y, 4, Q.oroL); } });
  // el equipo detrás de la mesa, mirando a la pantalla: se ríen (asoman cabeza y hombros)
  const ri = (k) => (Math.sin(t * 9 + k * 2) > 0 ? 1 : 0);
  R.actor(EL.daillyGT, 118, 162, t, { dir: 1, sonrisa: true, salto: t > WORLD ? ri(1) : 0, brazos: t > JSAID + 2.2 });
  R.actor(EL.programadorNorth, 146, 164, t, { dir: 1, sonrisa: true, salto: t > JSAID + 1.2 ? ri(2) : 0 });
  R.actor(EL.jonesGT, 178, 162, t, { dir: -1, habla: t > JSAID && Math.floor(t * 7) % 2 === 0, dedo: t > JSAID + 0.3 && t < JSAID + 1.6, sonrisa: t < JSAID || t > JSAID + 1.7 });
  R.actor(EL.comprador1GT, 206, 164, t, { dir: -1, sorpresa: t < WORLD, sonrisa: t > WORLD, salto: t > JSAID + 1.0 ? ri(3) : 0 });
  if (t > JSAID + 1.4) for (let k = 0; k < 3; k++) { const v = ((t - JSAID - 1.4) * 1.2 + k / 3) % 1; R.icono('!', 126 + k * 32, Math.round(126 - v * 10), Q.oroL, Q.k); }
  // el monitor de tubo de espaldas (a la izquierda) y su luz azul en las caras
  for (let y = 128; y < 166; y++) for (let x = 110; x < 236; x++) if ((x + y) % 2 === 0) tin(x, y, hex('#6ac8ff'), 0.08 + 0.04 * Math.sin(t * 7));
  mesaContra(); for (let k = 0; k < 60; k++) tin(86 + (k * 7) % 30, 88 + (k * 13) % 44, hex('#8ad8ff'), 0.25 + 0.1 * Math.sin(t * 8));
  for (let k = 0; k < 3; k++) { const v = (t * 0.7 + k / 3) % 1; tin(93 + Math.round(Math.sin(v * 6) * 2), 122 - v * 14, Q.bl, 0.5 * (1 - v)); }
};
// ── plano 7: el gag 2, el bichito de juguete se tira de la mesa con el paraguas ──
const LAUGH = b(0.961);
const fondoEsquina = () => capa('esquina', () => {
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { let c = tono([Q.bloqueJ, Q.bloqueS, Q.bloque], 1.6 - y / 200 + (h(x, y) - 0.5) * 0.25, x, y); if (y % 16 === 0 || (x + (Math.floor(y / 16) % 2) * 16) % 32 === 0) c = Q.bloqueJ; R.pset(x, y, c); }
  // el radiador y la papelera al fondo (abajo de la pared), el suelo de moqueta
  caja(200, 76, 270, 114, Q.bl); for (let x = 204; x < 268; x += 5) R.rect(x, 78, x + 2, 112, Q.grisL);
  for (let y = 114; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono([Q.moqS, Q.moq, Q.moqL], 1 + (y - 114) / 80 + ((x >> 3) + (y >> 3)) % 2 * 0.3, x, y));
  R.rect(0, 113, 319, 115, Q.grisD);
  caja(276, 130, 304, 166, Q.grisS); for (let x = 279; x < 302; x += 3) R.rect(x, 132, x, 164, Q.grisD); for (const [x, y] of [[282, 128], [292, 126], [298, 130]]) { R.disco(x, y, 4, Q.k); R.disco(x, y, 3, Q.crema); }
  R.disco(250, 172, 4, Q.k); R.disco(250, 172, 3, Q.crema);
  // la esquina de la mesa de haya en primer término (tablero grueso con canto), con un disquete, la taza y el teclado
  R.poligono([[0, 70], [182, 70], [196, 92], [0, 92]], Q.k); R.poligono([[0, 71], [181, 71], [194, 90], [0, 90]], Q.haya);
  for (let y = 72; y < 90; y++) for (let x = 0; x < 192; x++) if (x < 181 + (y - 71) * 0.7) R.pset(x, y, tono([Q.hayaS, Q.haya, Q.hayaL], 1.4 + Math.sin(x * 0.06 + y * 0.5) * 0.5, x, y));
  R.rect(0, 92, 196, 100, Q.k); R.rect(0, 92, 195, 98, Q.hayaS); R.rect(0, 92, 195, 92, Q.hayaL);
  R.rect(150, 100, 156, 180, Q.k); R.rect(151, 100, 155, 180, Q.hayaD);
  caja(10, 56, 70, 72, Q.beigeL); for (let r = 0; r < 2; r++) for (let c = 0; c < 9; c++) caja(13 + c * 6, 58 + r * 6, 17 + c * 6, 62 + r * 6, Q.beige);
  caja(92, 60, 108, 74, Q.grisD); R.rect(96, 61, 104, 66, Q.grisL); R.rect(95, 69, 105, 73, Q.bl);
  caja(118, 52, 132, 72, Q.bl); R.rect(132, 56, 136, 66, Q.k); R.rect(120, 60, 130, 64, Q.azul);
  // en la pared: un cartel de un coche de noche (sin letras) y un calendario con cifras; bajo la mesa, la sombra, la mochila y cables
  caja(20, 14, 64, 46, Q.pant1); R.disco(52, 24, 4, Q.crema); for (let x = 22; x < 63; x++) R.pset(x, 38 + Math.round(Math.sin(x * 0.3)), Q.grisD); caja(30, 32, 46, 38, Q.rojo); R.rect(33, 29, 42, 32, Q.rojo); R.disco(33, 39, 2, Q.k); R.disco(43, 39, 2, Q.k);
  caja(204, 20, 236, 58, Q.bl); R.rect(205, 21, 235, 30, Q.rojo); for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) R.rect(208 + c * 6, 34 + r * 6, 211 + c * 6, 36 + r * 6, (r * 5 + c) === 13 ? Q.rojo : Q.grisL);
  R.numero('91', 220, 29, { fina: true, centro: true, color: Q.bl });
  for (let y = 100; y < 180; y++) for (let x = 0; x < 150; x++) if ((x + y) % 2 === 0) tin(x, y, Q.k, 0.25);
  caja(40, 150, 70, 178, Q.verdeS); R.rect(44, 154, 66, 160, Q.verde); R.rect(52, 146, 58, 150, Q.verdeS);
  R.linea(80, 100, 96, 178, Q.k); R.linea(84, 100, 112, 178, Q.grisD); caja(100, 170, 130, 176, Q.bl); for (let k = 0; k < 4; k++) R.pset(104 + k * 7, 173, Q.rojo);
});
const p7 = (t) => {
  fondoEsquina();
  for (let k = 0; k < 3; k++) { const v = (t * 0.8 + k / 3) % 1; tin(125 + Math.round(Math.sin(v * 6 + k) * 2), 50 - v * 16, Q.bl, 0.5 * (1 - v)); }
  // al fondo, un compañero pequeño que se ríe al verlo (en «laugh»)
  R.actor(EL.daillyGT, 226, 116, t, { dir: -1, sorpresa: t > P7 + 0.75 && t < LAUGH - 0.1, sonrisa: t > LAUGH - 0.1, salto: t > LAUGH && Math.sin(t * 10) > 0 ? 1 : 0 });
  // el bichito anda hasta el borde, abre el paraguas y salta: baja flotando hasta la moqueta
  const anda = tramo(t, P7 + 0.1, P7 + 0.7), xb = Math.round(lerp(120, 176, anda)), abre = P7 + 1.0, cae = tramo(t, abre + 0.25, abre + 1.6);
  if (t < abre) { T.PIEZAS_GT.bichito(R, xb, 71, { t, anda: anda > 0 && anda < 1, s: 2 }); if (t > P7 + 0.75) globo(xb, 34, '!', Q.rojo); }
  else { const x = Math.round(176 + cae * 44 + Math.sin(cae * 7) * 4), y = Math.round(71 + sube(cae) * 102 - (cae < 0.1 ? 4 : 0)); T.PIEZAS_GT.bichito(R, x, Math.min(173, y), { t, paraguas: true, s: 2 }); }
  if (cae >= 1 && t < abre + 2.1) for (let k = 0; k < 4; k++) R.pset(212 + k * 5, 172 - k % 2, Q.bl);
};
const efectos = [[0.4, 'lluvia'], [3.3, 'coche'], [P2 + 3.0, 'golpecito'], [STUDIO, 'bip'], [P3 + 0.9, 'vapor'], [a(0.82), 'papel'],
  [ANY, 'boing'], [GOLD, 'brillo'], [SAVE, 'pop'], [WORLD - 0.3, 'pop'], [JSAID + 1.4, 'publico'], [P7 + 1.0, 'whoosh'], [P7 + 2.6, 'golpecito']];
const año = (t) => (t < b(0) ? 1988 : 1991);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')


E['gt-dailly'] = ('Dailly', '''// GT-DAILLY (frases 6–7), 1990 → hoy. Cinco planos (encuadres-ep31.md; el parque y las estatuas de cerca van juntos):
// 1. LOCAL la pantalla de cerca con el programa de dibujo (rejilla gorda, paleta, herramientas, sin letras): el bichito
//    se dibuja píxel a píxel con el lápiz; queda hecho en «pixels» y la miniatura de al lado echa a andar.
// 2. LOCAL Dailly en su mesa ante el monitor: se ríe en «joke»; en «years later» vuelan las hojas del calendario y la
//    barra pasa de 1990 a 1995; en «city» la pantalla muestra la ciudad vista desde arriba y él la señala; brilla en
//    «change everything».
// 3. A dundee/ciudad/calle (1989, lluvia): Jones y Dailly llegan por la acera con cajas y entran por el portal verde;
//    el pez del rótulo se ilumina en «fish»; en «Dundee», alguien pasa por la ventana iluminada de la oficina.
// 4. LOCAL el parque de Dundee hoy: la columna de piedra con los bichitos de bronce grandes trepando; niños que la
//    señalan en «statues»; una paloma se posa arriba en «pillar».
// 5. LOCAL un camino que se bifurca: a la izquierda el parque al sol, a la derecha nubes negras y rayos; el bichito de
//    juguete se para en el cruce y un cochecito se mete por el camino oscuro en «very different»; parpadea, como si
//    casi no fuera a existir, en «almost never existed».''', HELP + r'''
const a = (f) => en('dailly', f), b = (f) => en('estatuas', f);
const P2 = a(0.3336), P3 = a(0.7407), P4 = b(0), P5 = b(0.5084);
const PIX = a(0.2928), JOKE = a(0.379), YEARS = a(0.438), CITY = a(0.577), ABOVE = a(0.63), CHANGE = a(0.668), FISH = a(0.864), DUN = a(0.969);
const STAT = b(0.152), CLIMB = b(0.321), PILLAR = b(0.421), DIFF = b(0.755), NEVER = b(0.847);
// ── plano 1: el bichito píxel a píxel ──
const BICHO = (() => { const g = []; for (let j = 0; j < 16; j++) g.push(new Array(11).fill(null));
  for (let j = 6; j <= 13; j++) for (let i = 0; i < 11; i++) if (Math.hypot(i - 5, (j - 9.3) * 1.05) <= 4.3) g[j][i] = j >= 12 ? 'n' : 'N';
  for (let j = 4; j <= 8; j++) for (let i = 0; i < 11; i++) if (Math.hypot(i - 5, (j - 7) * 1.3) <= 3.2) g[j][i] = 'F';
  for (const [i, j] of [[5, 0], [3, 1], [5, 1], [7, 1], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [2, 4], [3, 4], [7, 4], [8, 4]]) g[j][i] = 'G';
  for (const [i, j] of [[4, 3], [6, 3], [2, 4], [8, 4]]) g[j][i] = 'v';
  g[6][4] = 'E'; g[7][4] = 'K'; g[6][6] = 'E'; g[7][6] = 'K'; g[9][5] = 'n'; g[11][5] = 'O';
  for (const [i, j] of [[2, 14], [3, 14], [7, 14], [8, 14]]) g[j][i] = 'K';
  const orden = []; for (let j = 0; j < 16; j++) for (let i = 0; i < 11; i++) if (g[j][i]) orden.push([i, j]);
  return { g, orden }; })();
const COLB = { G: Q.verdeL, v: Q.verdeS, F: Q.piel, E: Q.bl, K: Q.k, N: Q.naranja, n: Q.naranjaS, O: Q.oro };
const SWATCH = [Q.k, Q.bl, Q.grisS, Q.grisL, Q.rojo, Q.naranja, Q.naranjaS, Q.oro, Q.verdeL, Q.verde, Q.verdeS, Q.azulL, Q.azul, Q.azulS, Q.piel, Q.pielS];
const UI = hex('#b4b4bc'), UIL = hex('#e0e0e6'), UIS = hex('#7c7c86');
const fondoEditor = () => capa('editor', () => {
  // el marco del monitor (beis) alrededor y abajo, con la lucecita y una nota pegada con un dibujito
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono([Q.beigeS, Q.beige, Q.beigeL], 1.3 + (h(x, y) - 0.5) * 0.2 - (y > 160 ? 0.4 : 0), x, y));
  caja(10, 14, 310, 156, Q.beigeD); caja(13, 17, 307, 153, Q.k);
  R.rect(0, 166, 319, 167, Q.beigeS); for (let k = 0; k < 8; k++) R.rect(220 + k * 6, 170, 223 + k * 6, 171, Q.beigeD); R.disco(30, 168, 3, Q.beigeS); R.disco(42, 168, 3, Q.beigeS);
  caja(80, 157, 108, 179, hex('#f6e87a')); R.disco(94, 168, 4, Q.naranja); R.rect(91, 162, 97, 163, Q.verde); R.pset(93, 167, Q.k); R.pset(95, 167, Q.k);
  // el programa de dibujo: fondo gris con biseles, barra de arriba sin letras, herramientas, lienzo, paleta y vista previa
  R.rect(14, 18, 306, 152, UI);
  R.rect(14, 18, 306, 25, Q.azulS); for (let x = 18; x < 60; x += 6) R.rect(x, 20, x + 3, 23, Q.azulL); caja(294, 19, 302, 24, UI);
  const bisel = (x0, y0, x1, y1, hundido) => { R.rect(x0, y0, x1, y0, hundido ? UIS : UIL); R.rect(x0, y0, x0, y1, hundido ? UIS : UIL); R.rect(x0, y1, x1, y1, hundido ? UIL : UIS); R.rect(x1, y0, x1, y1, hundido ? UIL : UIS); };
  // las herramientas (lápiz, cubo, línea, caja, círculo, lupa, goma, cuentagotas)
  for (let k = 0; k < 8; k++) { const x = 20 + (k % 2) * 18, y = 32 + Math.floor(k / 2) * 18; bisel(x, y, x + 15, y + 15, k === 0); }
  R.linea(24, 44, 31, 37, Q.oro); R.pset(24, 44, Q.k); R.pset(32, 36, Q.rojo);
  R.rect(42, 40, 48, 45, Q.grisS); R.linea(48, 38, 50, 42, Q.azul); R.linea(24, 62, 32, 54, Q.k); R.rect(41, 54, 49, 62, Q.k); R.rect(42, 55, 48, 61, UI);
  R.anillo(28, 76, 4, Q.k); R.anillo(44, 75, 3, Q.k); R.linea(46, 77, 49, 80, Q.k); R.rect(23, 90, 31, 95, Q.rojoL); R.linea(42, 96, 48, 88, Q.k); R.rect(47, 87, 49, 89, Q.azul);
  bisel(18, 106, 53, 146, true); R.rect(19, 107, 52, 145, UIS); R.rect(22, 110, 34, 122, Q.naranja); R.rect(28, 116, 40, 128, Q.verdeL);
  // el lienzo con la rejilla (11 × 16 casillas de 7 px)
  bisel(96, 28, 176, 142, true); R.rect(97, 29, 175, 141, Q.bl);
  for (let j = 0; j <= 16; j++) for (let x = 98; x < 175; x += 2) R.pset(x, 30 + j * 7, Q.grisL);
  for (let i = 0; i <= 11; i++) for (let y = 30; y < 142; y += 2) R.pset(98 + i * 7, y, Q.grisL);
  // la paleta de 16 colores y la vista previa (abajo a la derecha, para dejar tranquila la esquina de Atom)
  bisel(190, 60, 262, 104, true); for (let k = 0; k < 16; k++) { const x = 192 + (k % 4) * 17, y = 62 + Math.floor(k / 4) * 10; R.rect(x, y, x + 15, y + 8, Q.k); R.rect(x + 1, y + 1, x + 14, y + 7, SWATCH[k]); }
  bisel(190, 110, 268, 148, true); R.rect(191, 111, 267, 147, Q.pant1); for (let k = 0; k < 12; k++) R.pset(194 + (k * 23) % 70, 114 + (k * 7) % 22, Q.bl);
  for (let x = 191; x < 268; x++) R.pset(x, 140, (x % 6) ? Q.verde : Q.verdeS); for (let y = 141; y < 148; y++) for (let x = 191; x < 268; x++) R.pset(x, y, hex('#5a3a1e'));
  // la barra de abajo con la cuadrícula del zoom (sin letras: cifras)
  R.numero('8', 72, 150, { fina: true, color: UIS }); R.anillo(84, 147, 3, UIS); R.linea(86, 149, 89, 152, UIS); R.numero('11', 192, 56, { fina: true, color: UIS }); R.numero('16', 210, 56, { fina: true, color: UIS });
  // el marco de arriba y de la derecha tapa la barra del año y la esquina de Atom (zonas tranquilas), con dos notas pegadas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (y < 23 || x > 273) R.pset(x, y, tono([Q.beigeS, Q.beige, Q.beigeL], 1.3 + (h(x, y) - 0.5) * 0.15, x, y));
  R.rect(13, 23, 273, 23, Q.k); R.rect(273, 23, 273, 153, Q.k); R.rect(12, 22, 274, 22, Q.beigeD); R.rect(274, 22, 274, 154, Q.beigeD);
  R.rect(14, 24, 272, 27, Q.azulS); for (let x = 18; x < 60; x += 6) R.rect(x, 25, x + 3, 26, Q.azulL);
  caja(282, 64, 312, 92, hex('#f6e87a')); R.disco(297, 80, 5, Q.naranja); R.rect(294, 72, 300, 73, Q.verde); R.pset(295, 79, Q.k); R.pset(299, 79, Q.k);
  caja(284, 98, 314, 124, hex('#8ae8c8')); R.rect(290, 110, 306, 114, Q.rojo); R.rect(293, 107, 302, 110, Q.rojo); R.disco(293, 116, 2, Q.k); R.disco(303, 116, 2, Q.k);
});
const p1 = (t) => {
  fondoEditor();
  const n = BICHO.orden.length, u = tramo(t, 0.35, PIX + 0.1), hechos = Math.floor(u * n);
  let col = null;
  for (let k = 0; k < hechos; k++) { const [i, j] = BICHO.orden[k], c = COLB[BICHO.g[j][i]]; R.rect(99 + i * 7, 31 + j * 7, 104 + i * 7, 36 + j * 7, c); }
  const [ci, cj] = BICHO.orden[Math.min(n - 1, hechos)]; col = BICHO.g[cj][ci];
  // la casilla del color que se usa
  const sel = SWATCH.indexOf(COLB[col]); if (sel >= 0) { const x = 192 + (sel % 4) * 17, y = 62 + Math.floor(sel / 4) * 10; R.rect(x - 1, y - 1, x + 16, y - 1, Q.rojoL); R.rect(x - 1, y + 9, x + 16, y + 9, Q.rojoL); R.rect(x - 1, y, x - 1, y + 8, Q.rojoL); R.rect(x + 16, y, x + 16, y + 8, Q.rojoL); }
  // el lápiz que pinta casilla a casilla (con su sombra), y el destello de la última
  const lx = u < 1 ? 102 + ci * 7 : 186, ly = u < 1 ? 34 + cj * 7 : 46;
  R.linea(lx + 1, ly + 1, lx + 13, ly - 11, Q.k); R.linea(lx + 2, ly, lx + 13, ly - 11, Q.oro); R.linea(lx + 2, ly - 1, lx + 12, ly - 11, Q.oroL); R.rect(lx + 12, ly - 13, lx + 14, ly - 11, Q.rojoL); R.pset(lx, ly, Q.k); R.pset(lx + 1, ly - 1, Q.piel);
  if (u < 1 && Math.floor(t * 10) % 2) R.rect(99 + ci * 7, 31 + cj * 7, 104 + ci * 7, 36 + cj * 7, COLB[col]);
  // la miniatura en la vista previa: aparece cuando está hecho y echa a andar
  if (u >= 1) { const ww = tramo(t, PIX + 0.2, P2 + 0.4), x = Math.round(204 + ww * 50); T.PIEZAS_GT.bichito(R, x, 141, { t, anda: ww > 0 && ww < 1, s: 1 }); if (t < PIX + 0.6) for (let k = 0; k < 8; k++) R.pset(136 + Math.round(Math.cos(k * 0.8) * 46), 86 + Math.round(Math.sin(k * 0.8) * 60), Q.oroL); }
  // la luz de encendido del monitor parpadea al guardar
  R.disco(290, 168, 2, Math.floor(t * 3) % 2 || u < 1 ? Q.fos : Q.fosS);
};
// ── plano 2: Dailly en su mesa ──
const fondoDailly = () => capa('dailly', () => {
  // pared de yeso pintado con manchas de humedad, un zócalo; ventana con la lluvia (lo de fuera va en cada fotograma)
  for (let y = 0; y < 134; y++) for (let x = 0; x < 320; x++) { const calma = x > 262 && y < 50; R.pset(x, y, tono([hex('#a8b49c'), hex('#b8c4ac'), hex('#c8d2bc')], 1.4 - y / 300 + (calma ? 0 : (h(x >> 2, y >> 2) - 0.5) * 0.5), x, y)); }
  for (let k = 0; k < 3; k++) { const cx = [40, 150, 230][k], cy = [18, 10, 22][k]; for (let y = -8; y < 9; y++) for (let x = -14; x < 15; x++) if ((x / 14) ** 2 + (y / 8) ** 2 < 1 - h(x + cx, y) * 0.3) tin(cx + x, cy + y, hex('#8a9478'), 0.35); }
  R.rect(0, 130, 319, 136, Q.madD); R.rect(0, 130, 319, 130, Q.madL);
  for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y - 136) / 8), jx = (x + tabla * 41) % 72; R.pset(x, y, (y - 136) % 8 === 7 || jx === 0 ? Q.madD : tono([Q.madS, Q.mad, Q.madL], 1.1 + (tabla % 2) * 0.4 + Math.sin(x * 0.2 + tabla) * 0.3, x, y)); }
  caja(14, 24, 74, 96, Q.bl); R.rect(12, 96, 76, 100, Q.bl); R.rect(43, 24, 45, 96, Q.bl); R.rect(14, 59, 74, 61, Q.bl);
  // el corcho con bocetos de bichitos y el cartel de una ciudad de noche (sin letras)
  caja(90, 22, 150, 70, hex('#b88a5a')); for (let k = 0; k < 6; k++) { const x = 94 + (k % 3) * 18, y = 26 + Math.floor(k / 3) * 22; caja(x, y, x + 14, y + 18, Q.bl); R.disco(x + 7, y + 11, 3, Q.naranja); R.rect(x + 5, y + 5, x + 9, y + 6, Q.verdeL); R.pset(x + 7, y + 1, Q.rojo); }
  caja(160, 18, 196, 66, Q.pant1); for (let k = 0; k < 6; k++) R.rect(164 + k * 5, 40 - (k * 7) % 14, 167 + k * 5, 60, Q.grisD); for (let k = 0; k < 10; k++) R.pset(165 + (k * 7) % 28, 44 + (k * 5) % 14, Q.oroL); R.disco(188, 26, 3, Q.crema);
  // la mesa: tablero de haya, cajonera, teclado, ratón, taza, disquetes y una lata; la torre en el suelo y la papelera
  caja(112, 124, 294, 130, Q.haya); R.rect(113, 125, 293, 125, Q.hayaL); caja(116, 130, 122, 170, Q.hayaS); caja(256, 130, 290, 170, Q.haya); for (const y of [137, 148, 159]) { R.rect(258, y, 288, y, Q.hayaD); R.rect(270, y + 5, 276, y + 6, Q.grisL); }
  caja(186, 116, 210, 124, Q.beigeL); for (let x = 188; x < 209; x += 2) R.pset(x, 119, Q.beigeD);
  caja(216, 118, 224, 124, Q.beigeL); R.linea(220, 118, 218, 110, Q.k);
  caja(236, 110, 246, 124, Q.bl); R.rect(246, 113, 249, 120, Q.k); R.rect(238, 116, 244, 120, Q.rojo);
  for (let k = 0; k < 3; k++) caja(120 + k * 8, 116 - k, 128 + k * 8, 124, [Q.grisD, Q.azul, Q.rojoS][k]);
  caja(264, 112, 272, 124, Q.verde); R.rect(265, 114, 271, 116, Q.bl);
  caja(224, 140, 246, 170, Q.beige); R.rect(227, 144, 243, 146, Q.k); R.pset(242, 164, Q.fos);
  caja(40, 146, 62, 170, Q.grisS); for (const [x, y] of [[46, 144], [54, 142], [58, 146]]) { R.disco(x, y, 4, Q.k); R.disco(x, y, 3, Q.crema); }
  // una balda con cajas de juegos y disquetes, a la derecha (por debajo de la esquina de Atom)
  R.rect(244, 78, 316, 80, Q.madD); R.rect(244, 78, 316, 78, Q.madL); for (let k = 0; k < 4; k++) { caja(248 + k * 12, 62, 258 + k * 12, 77, [Q.naranja, Q.azulL, Q.rojo, Q.verdeL][k]); R.rect(250 + k * 12, 65, 256 + k * 12, 67, Q.bl); } for (let k = 0; k < 4; k++) caja(298 + k * 4, 70, 302 + k * 4, 77, Q.grisD);
});
const p2 = (t) => {
  fondoDailly();
  // por la ventana: los tejados de Dundee, la lluvia y la luz
  R.recorte([15, 25, 73, 95]);
  for (let y = 25; y < 96; y++) for (let x = 15; x < 74; x++) R.pset(x, y, tono([Q.cielo0, Q.cielo1, Q.cielo2], 2.2 - (y - 25) / 36, x, y));
  nubeT(((t * 3) % 100) + 5, 36, 14, t, [Q.nubeL, Q.nubeM, Q.nubeS]);
  for (let x = 15; x < 74; x++) { const tj = 70 + Math.round(Math.abs(((x - 15) % 26) - 13) * 0.6); for (let y = tj; y < 96; y++) R.pset(x, y, y === tj ? Q.k : (x + y) % 5 ? Q.piedraS : Q.piedraD); }
  for (const x of [22, 50, 64]) for (let y = 78; y < 94; y += 6) R.rect(x, y, x + 2, y + 2, Math.sin(t + x) > 0 ? Q.oroL : Q.piedraD);
  for (let k = 0; k < 18; k++) { const x = 15 + (k * 23 + Math.floor(t * 30)) % 59, y = 25 + (k * 13 + t * 100) % 70; R.linea(x, y, x - 1, y + 3, Q.nubeL); }
  R.recorte(null);
  // las hojas del calendario que vuelan en «years later»
  caja(204, 30, 236, 70, Q.bl); R.rect(205, 31, 235, 40, Q.rojo);
  const yr = t < YEARS ? 90 : t < YEARS + 2 ? 90 + Math.floor(tramo(t, YEARS, YEARS + 2) * 5) : 95; R.numero(String(yr), 220, 39, { fina: true, centro: true, color: Q.bl });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) R.rect(208 + c * 6, 44 + r * 6, 211 + c * 6, 46 + r * 6, Q.grisL);
  if (t > YEARS - 0.1 && t < YEARS + 2.4) for (let k = 0; k < 6; k++) { const v = tramo(t, YEARS + k * 0.35, YEARS + k * 0.35 + 0.9); if (v > 0 && v < 1) { const x = Math.round(214 + v * 34 + Math.sin(v * 6 + k) * 6), y = Math.round(44 - v * 30 + v * v * 40); R.poligono([[x - 6, y - 5], [x + 6, y - 7 + Math.round(Math.sin(v * 9) * 2)], [x + 7, y + 5], [x - 5, y + 6]], Q.bl); R.linea(x - 6, y - 5, x + 6, y - 7, Q.grisS); } }
  // el monitor grande: el bichito en pantalla y, en «city», la ciudad vista desde arriba
  const pan = t < CITY ? 'bichitos' : 'ciudad';
  T.PIEZAS_GT.monitorTubo(R, 160, 124, { pantalla: pan, t, s: 2 });
  if (t > CITY - 0.1 && t < CITY + 0.25) for (let y = 74; y < 120; y += 2) R.rect(132, y, 188, y, Q.bl);
  if (t > CHANGE - 0.1 && t < CHANGE + 1.4) for (let k = 0; k < 10; k++) { const an = k * 0.63 + t * 2, r = 36 + ((t - CHANGE) * 20) % 10; R.pset(160 + Math.round(Math.cos(an) * r), 96 + Math.round(Math.sin(an) * r * 0.7), k % 2 ? Q.oroL : Q.bl); }
  // Dailly, de pie junto a la mesa: se ríe en «joke», señala la ciudad en «above»
  const rie = t > JOKE - 0.1 && t < JOKE + 1.2;
  R.actor(EL.daillyGT, 94, 166, t, { dir: 1, sonrisa: rie || t > CHANGE, salto: rie && Math.sin(t * 12) > 0 ? 2 : 0, sorpresa: t > CITY && t < ABOVE - 0.05, dedo: t > ABOVE - 0.05 && t < CHANGE + 0.9, habla: t > CHANGE + 0.9 && Math.floor(t * 6) % 2 === 0 });
  if (rie) globo(102, 136, '!', Q.rojo);
  // la silla giratoria delante y el cable
  caja(150, 136, 174, 156, Q.azulS); R.rect(151, 137, 173, 139, Q.azul); for (let y = 142; y < 154; y += 4) R.rect(153, y, 171, y, Q.azul); R.rect(160, 156, 164, 166, Q.k); R.rect(150, 166, 174, 168, Q.k); R.disco(152, 170, 2, Q.k); R.disco(172, 170, 2, Q.k);
};
// ── plano 3: la calle de la tienda de pescado frito ──
const p3 = (t) => {
  T.dundee(R, t, { camara: 'calle', lluvia: 0.5, año: 1990 });
  // el pez del rótulo se ilumina en «fish»
  if (t > FISH - 0.1 && t < FISH + 1.4) { const k = 0.5 + 0.5 * Math.sin((t - FISH) * 10); for (let y = 102; y < 118; y++) for (let x = 74; x < 108; x++) if (Math.hypot((x - 90) / 16, (y - 110) / 8) < 1 && (x + y) % 2 === 0) tin(x, y, Q.oroL, 0.35 * k); R.halo?.(90, 110, 14, [Q.oro, Q.oroL], 0.4); }
  // alguien pasa por la ventana iluminada de la oficina en «Dundee»
  R.recorte([64, 59, 136, 95]);
  const w = tramo(t, FISH + 3.0, FISH + 3.8), sx = Math.round(lerp(58, 140, w));
  if (w > 0 && w < 1) { R.disco(sx, 82, 5, Q.k); R.rect(sx - 6, 87, sx + 6, 96, Q.k); }
  R.recorte(null);
  // Jones y Dailly llegan con las cajas y entran por el portal verde (x 168–196)
  const puerta = tramo(t, FISH + 0.6, FISH + 1.0) - tramo(t, FISH + 2.6, FISH + 3.0);
  if (puerta > 0) { const wpx = Math.round(puerta * 22); R.rect(171, 112, 171 + wpx, 155, hex('#2a2420')); R.rect(171, 112, 171 + wpx, 113, Q.oro); }
  const dentro = (x) => x > 168;
  const xj = Math.round(lerp(-20, 176, sube(tramo(t, P3 + 0.2, FISH + 1.6)))), xd = Math.round(lerp(-44, 176, sube(tramo(t, P3 + 0.4, FISH + 2.2))));
  for (const [d, x, k] of [[EL.jonesGT, xj, 0], [EL.daillyGT, xd, 1]]) {
    if (dentro(x) && t > FISH + 1.9 + k * 0.6) continue;
    const mv = x < 176 && t < FISH + 2.2;
    const r = R.actor(d, x, 164, t, { dir: 1, anda: mv, sostiene: true, sonrisa: t > FISH, habla: k === 1 && t > FISH - 0.4 && t < FISH + 0.4 });
    carton(r.mano[0] + 2, r.mano[1] + 6, k ? 16 : 13, k ? 11 : 10, { icono: k === 0 });
  }
  // un paseante con paraguas al otro lado (por delante de los coches no: va por la acera)
  const v = tramo(t, P3, P4), xp = Math.round(lerp(330, 220, v)); const s = R.actor(EL.comprador1GT, xp, 166, t, { dir: -1, anda: true, sostiene: [xp + 2, 146] }); paraguas(s.mano[0], s.mano[1], Q.azul, Q.azulL, t);
  T.dundeeDelante(R, t, { camara: 'calle', lluvia: 0.5, año: 1990 });
};
// ── plano 4: el parque de Dundee hoy, con la columna de los bichitos de bronce ──
const fondoParque = () => capaEncima('parque', () => {
  // el cielo (lo de arriba se pinta en cada fotograma); colinas lejanas, la ciudad, los árboles y la hierba
  for (let x = 0; x < 320; x++) { const yy = 82 + Math.round(Math.sin(x * 0.02) * 6 + Math.sin(x * 0.07) * 2); for (let y = yy; y < 100; y++) R.pset(x, y, tono([Q.hierbaS, hex('#7a9a86'), hex('#94aaa0')], 2 - (y - yy) / 10, x, y)); }
  for (let k = 0; k < 14; k++) { const x0 = 6 + k * 23, hh = 8 + (k * 7) % 12; caja(x0, 92 - hh, x0 + 14, 100, Q.piedraS); for (let j = 92 - hh + 3; j < 98; j += 4) for (let i = x0 + 3; i < x0 + 12; i += 4) R.pset(i, j, (i + j) % 3 ? Q.oroL : Q.piedraD); }
  R.rect(140, 64, 142, 92, Q.piedraD); R.poligono([[138, 66], [144, 66], [141, 54]], Q.piedraD);
  for (let y = 98; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono([Q.hierbaD, Q.hierbaS, Q.hierba, Q.hierbaL], 2.2 + (y - 98) / 90 + (h(x, y) - 0.5) * 0.9 + ((x * 3 + y * 7) % 11 === 0 ? 0.8 : 0), x, y));
  // el camino de grava que cruza
  for (let y = 120; y < 180; y++) { const c = 160 + Math.round((y - 120) * -0.9), w = 18 + (y - 120) * 0.7; for (let x = Math.round(c - w); x <= Math.round(c + w); x++) R.pset(x, y, Math.abs(x - c) > w - 1 ? Q.gravaS : tono([Q.gravaS, Q.grava, Q.gravaL], 1.2 + (h(x, y) - 0.5) * 1.4, x, y)); }
  // macizos de flores, un banco, una farola y una papelera
  for (let k = 0; k < 40; k++) { const x = 8 + (k * 37) % 90, y = 150 + (k * 13) % 26; R.pset(x, y, [Q.rojoL, Q.oro, Q.bl, Q.azulL][k % 4]); R.pset(x, y + 1, Q.hierbaD); }
  caja(236, 138, 290, 142, Q.mad); caja(236, 130, 290, 133, Q.mad); R.rect(240, 142, 242, 152, Q.k); R.rect(284, 142, 286, 152, Q.k);
  R.rect(30, 70, 32, 140, Q.k); R.rect(26, 64, 36, 70, Q.k); R.rect(27, 65, 35, 69, Q.crema); caja(296, 140, 306, 156, Q.verdeS);
  // la columna de piedra grande con su basa y su capitel (los bichitos de bronce van en cada fotograma: brillan)
  caja(146, 136, 214, 152, Q.piedra); R.rect(147, 137, 213, 139, Q.piedraL); R.rect(196, 140, 213, 151, Q.piedraS);
  caja(158, 52, 202, 137, Q.piedra); for (let y = 53; y < 137; y++) for (let x = 159; x < 202; x++) R.pset(x, y, tono([Q.piedraD, Q.piedraS, Q.piedra, Q.piedraL], 2.6 - (x - 159) / 22 + (h(x, y) - 0.5) * 0.5, x, y));
  for (let y = 64; y < 136; y += 14) { R.rect(159, y, 201, y, Q.piedraD); R.rect(159, y + 1, 201, y + 1, Q.piedraL); }
  caja(152, 44, 208, 52, Q.piedraL); R.rect(153, 50, 207, 51, Q.piedraS);
  for (let y = 138; y < 156; y++) for (let x = 140; x < 222; x++) if (y > 151) tin(x + 6, y, Q.k, 0.25);
});
const bronce = (x, y, d, pose, t) => {
  // un bichito de bronce (a doble tamaño: 16 × 24) agarrado a la columna; pose 1 trepa, 2 saluda arriba
  const P = (i, j, c) => { const xx = x + (d > 0 ? i : -i) * 2, yy = y + j * 2; R.pset(xx, yy, c); R.pset(xx + 1, yy, c); R.pset(xx, yy + 1, c); R.pset(xx + 1, yy + 1, c); };
  for (let j = -7; j <= 0; j++) for (let i = -3; i <= 3; i++) { const dd = Math.hypot(i, (j + 3.5) * 0.9); if (dd < 3.6) P(i, j, dd > 2.8 ? Q.k : i < -1 ? Q.bronceL : i > 1 ? Q.bronceS : Q.bronce); }
  for (const [i, j] of [[-2, -8], [-1, -9], [0, -10], [1, -9], [2, -8], [0, -9], [-1, -8], [1, -8]]) P(i, j, j === -10 ? Q.verdin : Q.bronceS);
  P(1, -5, Q.bronceS); P(-1, -5, Q.bronceS); P(-1, -6, Q.bronceB);
  if (pose === 1) { P(3, -8, Q.bronceS); P(3, -7, Q.bronceS); P(3, -6, Q.bronce); P(-3, -7, Q.bronceS); P(-4, -6, Q.bronceS); }
  else { P(3, -9, Q.bronceS); P(4, -10, Q.bronce); P(3, -8, Q.bronceS); }
  P(-2, 1, Q.bronceS); P(1, 1, Q.bronceS);
  const br = (t * 0.6 + x * 0.01) % 2; if (br < 0.2) P(-2, -5 + Math.round(br * 20) % 4, Q.bronceB);
};
const p4 = (t) => {
  // el cielo tramado de Dundee con claros, nubes de tres tonos a tres velocidades y gaviotas
  for (let y = 0; y < 92; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono([Q.cielo0, Q.cielo1, Q.cielo2, Q.cielo3, hex('#d0d8de')], 0.6 + y / 26 + (x > 262 && y < 50 ? 0 : (h(x >> 3, y >> 3) - 0.5) * 0.3), x, y));
  for (const [x0, y, w, v, c] of [[30, 30, 22, 1.2, [Q.nubeM, Q.nubeS, Q.nubeD]], [150, 22, 30, 2.6, [Q.nubeL, Q.nubeM, Q.nubeS]], [220, 58, 18, 4.5, [Q.nubeL, Q.nubeM, Q.nubeS]], [90, 62, 14, 6, [Q.nubeL, Q.nubeM, Q.nubeS]]]) { const x = ((x0 + t * v) % 300) - 20; if (!(x > 240 && y < 50)) nubeT(x, y, w, t, c); }
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * 14 + k * 70) % 360) - 20), y = 46 + k * 8 + Math.round(Math.sin(t * 2 + k) * 2), al = Math.floor(t * 5 + k) % 2; if (x < 250) { R.pset(x - 2, y - al, Q.bl); R.pset(x - 1, y, Q.bl); R.pset(x, y, Q.k); R.pset(x + 1, y, Q.bl); R.pset(x + 2, y - al, Q.bl); } }
  fondoParque();
  // los árboles que se mecen
  for (const [x, s] of [[56, 1.6], [104, 1.3], [256, 1.5], [304, 1.2]]) { const m = Math.round(Math.sin(t * 1.3 + x) * 1.5); R.rect(x - 2, 128 - Math.round(30 * s), x + 2, 128, Q.madD); for (let k = 0; k < 4; k++) R.disco(x + m + [-6, 6, 0, -2][k] * s, 128 - Math.round((34 + [0, 2, 10, 4][k]) * s), Math.round(10 * s), [Q.hierbaS, Q.hierba, Q.hierbaL, Q.hierbaS][k]); }
  for (const [x, y, d, p] of [[166, 132, 1, 1], [192, 118, -1, 1], [168, 104, 1, 1], [193, 90, -1, 1], [170, 76, 1, 1], [178, 42, 1, 2]]) bronce(x, y, d, p, t);
  // la paloma que se posa arriba en «pillar»
  const pv = tramo(t, PILLAR - 1.2, PILLAR), px = Math.round(lerp(330, 198, pv)), py = Math.round(lerp(26, 41, pv) - Math.sin(pv * 3.1) * 10);
  R.disco(px, py, 2, Q.grisS); R.pset(px - 2, py - 1, Q.grisD); R.pset(px - 3, py - 1, Q.oro); if (pv < 1) { const al = Math.floor(t * 10) % 2; R.linea(px - 1, py - 1, px + 3, py - 3 - al * 2, Q.gris); } else { R.pset(px, py + 2, Q.oro); }
  // los niños: miran, señalan en «statues», uno salta en «climbing»
  R.actor(EL.chicoHoy, 104, 160, t, { dir: 1, dedo: t > STAT - 0.1 && t < STAT + 1.6, sorpresa: t > STAT - 0.1 && t < STAT + 0.6, sonrisa: t > STAT + 0.6 });
  R.actor(EL.chicaHoy, 124, 166, t, { dir: 1, sonrisa: true, salto: t > CLIMB && t < CLIMB + 0.8 ? Math.round(Math.abs(Math.sin((t - CLIMB) * 8)) * 4) : 0, brazos: t > CLIMB && t < CLIMB + 0.8 });
  const mv = tramo(t, P4, PILLAR + 0.4), xm = Math.round(lerp(330, 236, mv));
  R.actor(EL.comprador2GT, xm, 172, t, { dir: -1, anda: mv < 1, sonrisa: true });
  R.actor(EL.ninaKinder ?? EL.chicaHoy, xm - 14, 172, t, { dir: -1, anda: mv < 1, dedo: mv >= 1 });
};
// ── plano 5: el camino que se bifurca hacia la tormenta ──
const fondoCamino = () => capaEncima('camino', () => {
  // las colinas: a la izquierda verdes al sol; a la derecha grises bajo la tormenta
  for (let x = 0; x < 320; x++) { const yy = 92 + Math.round(Math.sin(x * 0.025) * 7 + Math.sin(x * 0.09) * 2), osc = x > 170 ? Math.min(1, (x - 170) / 40) : 0; for (let y = yy; y < 112; y++) R.pset(x, y, osc > b4(x, y) ? tono([Q.tormenta1, Q.tormenta2, hex('#5a5a6a')], 1 + (y - yy) / 12, x, y) : tono([Q.hierbaS, hex('#7aa07a'), hex('#9ab896')], 2 - (y - yy) / 10, x, y)); }
  // la hierba con flores (izquierda) y seca (derecha), el camino que se parte en dos
  for (let y = 108; y < 180; y++) for (let x = 0; x < 320; x++) { const osc = Math.min(1, Math.max(0, (x - 150 - (180 - y) * 0.3) / 50)); R.pset(x, y, osc > b4(x, y) ? tono([hex('#3a3828'), hex('#5a5436'), hex('#76704a')], 1.2 + (h(x, y) - 0.5) * 1.2 + (y - 108) / 120, x, y) : tono([Q.hierbaD, Q.hierbaS, Q.hierba, Q.hierbaL], 2 + (y - 108) / 90 + (h(x, y) - 0.5) * 0.9, x, y)); }
  const ruta = (x0, y0, x1, y1, w0, w1, osc) => { for (let y = y1; y <= y0; y++) { const u = (y0 - y) / (y0 - y1), c = x0 + (x1 - x0) * Math.pow(u, 0.8), w = w0 + (w1 - w0) * u; for (let x = Math.round(c - w); x <= Math.round(c + w); x++) R.pset(x, y, Math.abs(x - c) > w - 1 ? Q.gravaS : tono(osc ? [hex('#6a6458'), hex('#86806e'), Q.gravaS] : [Q.gravaS, Q.grava, Q.gravaL], 1.2 + (h(x, y) - 0.5) * 1.4, x, y)); } };
  ruta(160, 179, 160, 140, 34, 14, false); ruta(158, 141, 60, 108, 14, 4, false); ruta(162, 141, 262, 106, 14, 4, true);
  for (let k = 0; k < 50; k++) { const x = 6 + (k * 37) % 110, y = 118 + (k * 23) % 58; R.pset(x, y, [Q.rojoL, Q.oro, Q.bl, Q.azulL][k % 4]); R.pset(x, y + 1, Q.hierbaD); }
  // el árbol frondoso del lado del sol y el árbol pelado del lado oscuro
  R.rect(40, 70, 44, 120, Q.madD); for (const [dx, dy, r, c] of [[-10, -50, 14, Q.hierbaS], [10, -52, 14, Q.hierba], [0, -62, 15, Q.hierbaL], [-4, -46, 10, Q.hierba]]) R.disco(42 + dx, 120 + dy, r, c);
  R.rect(280, 70, 283, 120, hex('#2a2420')); for (const [x1, y1] of [[268, 60], [296, 58], [274, 78], [292, 82], [300, 70]]) R.linea(281, 96, x1, y1, hex('#2a2420'));
  // el poste con dos flechas (símbolos: un bichito a la izquierda, una interrogación a la derecha)
  R.rect(158, 104, 161, 146, Q.madD); R.rect(159, 104, 159, 146, Q.madL);
  R.poligono([[120, 106], [156, 106], [156, 118], [120, 118], [114, 112]], Q.k); R.poligono([[121, 107], [155, 107], [155, 117], [121, 117], [116, 112]], Q.mad);
  R.disco(138, 112, 3, Q.naranja); R.rect(136, 108, 140, 108, Q.verdeL);
  R.poligono([[163, 120], [199, 120], [205, 126], [199, 132], [163, 132]], Q.k); R.poligono([[164, 121], [198, 121], [203, 126], [198, 131], [164, 131]], Q.madS);
  R.icono('?', 180, 122, Q.bl, Q.k);
  for (let y = 146; y < 150; y++) for (let x = 154; x < 170; x++) tin(x, y, Q.k, 0.3);
});
const p5 = (t) => {
  // el cielo partido: a la izquierda azul con nubes blancas; a la derecha la tormenta que se arremolina, con rayos
  const rayo = (t > DIFF && t < DIFF + 0.15) || (t > NEVER + 0.3 && t < NEVER + 0.42) || (t > b(0.97) && t < b(0.99));
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const osc = Math.min(1, Math.max(0, (x - 150 + Math.sin(y * 0.1 + t) * 8) / 60)); const c = osc > b4(x, y) ? tono([Q.tormenta0, Q.tormenta1, Q.tormenta2], 0.4 + y / 70 + Math.sin(x * 0.05 - t * 0.8 + y * 0.08) * 0.5 + (rayo ? 1.2 : 0), x, y) : tono([hex('#6a98d4'), hex('#8ab4e4'), hex('#b0d0f0')], 0.4 + y / 50, x, y); R.pset(x, y, c); }
  for (const [x0, y, w, v] of [[10, 34, 20, 1.6], [70, 46, 22, 2.8], [40, 66, 14, 5]]) { const x = ((x0 + t * v) % 190) - 30; nubeT(x, y, w, t, [Q.nubeL, Q.nubeM, Q.nubeS]); }
  for (const [x0, y, w, v] of [[210, 40, 30, 3], [260, 64, 24, 5], [190, 76, 20, 7]]) { const x = 170 + ((x0 - 170 + t * v) % 160); if (!(x > 250 && y < 50)) nubeT(x, y, w, t, [Q.tormenta2, Q.tormenta1, Q.tormenta0]); }
  if (rayo) { let x = 236, y = 54; for (let k = 0; k < 8; k++) { const nx = x + ((k * 7) % 5) - 2, ny = y + 6; R.linea(x, y, nx, ny, Q.rayo); R.linea(x + 1, y, nx + 1, ny, Q.bl); x = nx; y = ny; } }
  for (let k = 0; k < 2; k++) { const x = Math.round(((t * 12 + k * 60) % 160) - 10), y = 40 + k * 10, al = Math.floor(t * 5 + k) % 2; R.pset(x - 2, y - al, Q.k); R.pset(x - 1, y, Q.k); R.pset(x, y, Q.k); R.pset(x + 1, y, Q.k); R.pset(x + 2, y - al, Q.k); }
  fondoCamino();
  for (let k = 0; k < 40; k++) { const x = 190 + (k * 31 + Math.floor(t * 20)) % 130, y = 40 + (k * 17 + t * 130) % 140; R.linea(x, y, x - 1, y + 4, hex('#8a90a8')); }
  // el bichito de juguete llega al cruce, se para y mira; el cochecito se mete por el camino oscuro en «very different»
  const u = tramo(t, P5 + 0.3, P5 + 1.8), xb = Math.round(lerp(130, 150, u)), yb = Math.round(lerp(178, 156, u));
  T.PIEZAS_GT.bichito(R, xb, yb, { t, anda: u > 0 && u < 1, s: 2, dir: t > DIFF + 0.3 ? 1 : -1 });
  if (t > DIFF - 0.3 && t < DIFF + 1.2) globo(xb, yb - 34, '?', Q.k);
  const c = tramo(t, DIFF - 0.6, NEVER + 1.6), cx = Math.round(lerp(176, 258, sube(c))), cy = Math.round(lerp(166, 110, sube(c)));
  const casi = t > NEVER && t < NEVER + 1.6 && Math.floor(t * 10) % 3 === 0;
  if (c > 0 && c < 1 && !casi) T.PIEZAS_GT.cocheJuguete(R, cx, cy, { color: '#d83a3a', s: c < 0.5 ? 2 : 1 });
  if (c > 0 && c < 1) for (let k = 0; k < 3; k++) tin(cx - 18 - k * 4, cy - 2 + (k % 2), Q.grisL, 0.5);
};
const efectos = [[0.5, 'lapiz'], [PIX, 'brillo'], [JOKE, 'boing'], [YEARS, 'papel'], [CITY, 'bip'], [CHANGE, 'brillo'], [P3 + 0.3, 'lluvia'], [FISH + 0.6, 'puerta'],
  [P4 + 0.3, 'viento'], [STAT, 'pop'], [DIFF, 'trueno'], [DIFF + 0.2, 'motor'], [NEVER + 0.3, 'trueno']];
const año = (t) => t < YEARS ? 1990 : t < P3 ? Math.round(lerp(1990, 1995, tramo(t, YEARS, YEARS + 2))) : t < P4 ? 1989 : 2026;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')
