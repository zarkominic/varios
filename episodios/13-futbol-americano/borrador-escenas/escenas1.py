E = {}
E['fa-gancho'] = ('Gancho', '''// FA-GANCHO (frases 1–3), 1913, cartela «1913». Ocho planos, todos con acción y vida de fondo:
// 1. West Point desde la banda («afternoon… 1913»): los dos equipos saltan al campo, el Ejército por la izquierda y Notre
//    Dame por la derecha; un cadete trae a la mula por la banda de acá y saluda; el árbitro pita; el público aplaude;
// 2. el mapa («West Point, New York»): cae la chincheta en West Point y otra pequeña en Nueva York; a «Army» sale el
//    escudo del Ejército; a «toughest teams in the country» el mapa se abre a todo el país y caen las de los demás
//    equipos, grises; la del Ejército brilla;
// 3. el campo pequeño del Medio Oeste («small Midwestern school»): Dorais y Rockne se pasan el balón gordo, otros dos
//    jugadores de Notre Dame entrenan; a «Notre Dame» todos saltan y el público agita los sombreros;
// 4. el campo embarrado («one giant shoving match»): la cuña empuja yarda a yarda; a «piles» salta el barro; dos
//    suplentes animan y uno se tapa los ojos;
// 5. desde la banda («yard by yard»): los jueces de la cadena avanzan la estaca a cada «yard»; a «rugby» un jugador sale
//    del montón con el balón bajo el brazo y otros dos se le tiran encima; el árbitro pita;
// 6. West Point a ras de campo («Gus Dorais drops back, raises his arm»): el saque, la línea empuja, Rockne sale
//    corriendo por la banda, Dorais retrocede con el balón y levanta el brazo; el fotógrafo dispara el magnesio;
// 7. el cielo («throws the ball long, spinning»): el balón en espiral cruza el cielo de otoño de punta a punta y baja la
//    punta al pasar la cima; los gansos y las hojas; abajo, la torre de la capilla y los banderines;
// 8. la carrera («into the hands of… Rockne, running all alone»): el balón cae en las manos de Rockne, que corre solo
//    por la banda con la cámara detrás; los defensas quedan lejos; en primer término la mula se come el programa del
//    cadete, que mira la jugada (gag).''', r'''
const a = (f) => en('westpoint', f), b = (f) => en('mele', f), c = (f) => en('pase', f);
const P2 = a(0.244), P3 = a(0.593), P4 = b(0), P5 = b(0.536), P6 = c(0), P7 = c(0.445), P8 = c(0.711);
const C = T.C, K = C.k;
const suave = (u) => u * u * (3 - 2 * u);
const parpadeo = (t, f = 6) => Math.sin(t * f) > 0;
// dónde lleva algo un personaje en la mano que cuelga (x, suelo, dir) y dónde, con el brazo levantado (o.dedo)
const enMano = (x, suelo, dir) => [dir > 0 ? x + 12 : x + 2, suelo - 9];
const enAlto = (x, suelo, dir) => [dir > 0 ? x + 15 : x - 1, suelo - 30];
const ND = { pal: { C: hex('#2a3458'), c: hex('#1c2440'), W: hex('#2a3458') } };
// jugadores de Notre Dame sin nombre: el jersey azul marino de Dorais con otro pelo
const nd = (k) => ({ ...EL.dorais, pal: { ...EL.dorais.pal, H: [hex('#6a3a1a'), hex('#a8743c'), hex('#3a2418')][k % 3], h: [hex('#8a5428'), hex('#c8904c'), hex('#5a3a24')][k % 3] } });
const ejer = (k) => ({ ...EL.soldadoJugador, pal: { ...EL.soldadoJugador.pal, H: [hex('#5a3418'), hex('#2a2430'), hex('#8a5a2a')][k % 3] } });
// el programa de papel del partido (pequeño, con su tapa de color y los renglones)
const programa = (x, y) => { R.rect(x, y, x + 5, y + 7, K); R.rect(x + 1, y + 1, x + 4, y + 6, hex('#f2eee2')); R.rect(x + 1, y + 1, x + 4, y + 2, hex('#c8a040')); R.pset(x + 2, y + 4, hex('#9a9488')); R.pset(x + 3, y + 5, hex('#9a9488')); };
// el escudo inventado del Ejército (negro, oro y gris), sin letras
const escudo = (x, y, s = 1) => { const p = (i, j) => [Math.round(x + i * s), Math.round(y + j * s)];
  R.poligono([p(-9, -8), p(9, -8), p(9, 4), p(0, 12), p(-9, 4)], K); R.poligono([p(-8, -7), p(8, -7), p(8, 4), p(0, 11), p(-8, 4)], hex('#2a2430'));
  R.poligono([p(-2, -7), p(2, -7), p(2, 10), p(0, 11), p(-2, 10)], hex('#c8a040')); R.poligono([p(-8, -2), p(8, -2), p(8, 0), p(-8, 0)], hex('#8c8ca0'));
  R.pset(Math.round(x - 5 * s), Math.round(y - 5 * s), hex('#5a5468')); };
// la estaca de la cadena de medir, con su banderín rojo
const estaca = (x, y) => { R.rect(x, y - 22, x + 1, y, K); R.rect(x, y - 22, x, y - 1, hex('#c8a060')); R.poligono([[x + 2, y - 22], [x + 9, y - 19], [x + 2, y - 16]], K); R.poligono([[x + 2, y - 21], [x + 7, y - 19], [x + 2, y - 17]], hex('#c83a2a')); };

// ── 1 · West Point: salen los equipos ─────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const mu = tramo(t, 1.5, 3.6), mx = Math.round(lerp(4, 46, mu));
  T.westPoint(R, t, { encuadre: 'grada', mula: { x: mx, suelo: 171, dir: 1, anda: mu > 0 && mu < 1 } });
  // el Ejército sale por la izquierda y forma; Notre Dame entra por la derecha
  for (let k = 0; k < 4; k++) { const u = tramo(t, 1.4 + k * 0.25, 3.4 + k * 0.25), x = Math.round(lerp(-24 - k * 10, 64 + k * 18, suave(u))), y = 128 + (k % 2) * 7 + k;
    R.actor(ejer(k), x, y, t, { dir: 1, anda: u > 0 && u < 1, brazos: u >= 1 && t > 4.0 && t < 4.6 + k * 0.1, salto: u >= 1 && t > 4.0 && t < 4.6 ? 2 : 0 }); }
  for (let k = 0; k < 3; k++) { const u = tramo(t, 1.9 + k * 0.3, 4.2 + k * 0.3), x = Math.round(lerp(330 + k * 12, 208 + k * 20, suave(u))), y = 131 + (k % 2) * 8;
    R.actor(k === 0 ? EL.dorais : k === 1 ? EL.rockne : nd(k), x, y, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: u >= 1 }); }
  // el cadete trae a la mula del ronzal y, cuando salen los equipos, saluda con la mano
  R.actor(EL.cadete, mx + 26, 176, t, { dir: 1, anda: mu > 0 && mu < 1, dedo: t > 3.9 && t < 4.9, sonrisa: t > 3.7 });
  if (mu < 1) R.linea(mx + 14, 156, mx + 32, 166, hex('#8a6a3a'));
  // el árbitro, de blanco, con el silbato
  R.actor(EL.rector, 150, 147, t, { dir: t < 2.6 ? 1 : -1, dedo: t > 1.5 && t < 2.1, habla: t > 1.5 && t < 2.1 });
};

// ── 2 · el mapa: West Point, el Ejército y el país ────────────────────────────────────────────────────────────────
const OTROS = [[-71.12, 42.37], [-72.92, 41.31], [-74.66, 40.34], [-75.19, 39.95], [-83.74, 42.28], [-87.6, 41.79], [-93.23, 44.97], [-77.19, 40.2], [-76.49, 38.98], [-89.4, 43.07]];
const p2 = (t) => {
  const abre = tramo(t, a(0.46), a(0.56));
  const P = T.mapa(R, t, { desde: 'eeuu', zoom: 4.2, centro: [-75.6, 41.0], u: 1 - abre });
  // el balón de cuero sobre el papel, con su sombra, y el lápiz rojo de marcar
  if (abre < 0.5) { R.disco(66, 152, 9, hex('#9a8a68')); T.balon(R, 62, 146, t, { epoca: '1913', s: 1.5, ang: -0.35 }); R.linea(92, 166, 132, 150, K); R.linea(92, 165, 132, 149, hex('#c83a2a')); R.linea(92, 166, 95, 165, hex('#f0c890')); }
  // la ruta del tren de Notre Dame: de South Bend a West Point, con la locomotora que avanza
  const ru = tramo(t, a(0.56), P3 - 0.1);
  if (ru > 0) { const [sx, sy] = P(T.LUGARES.southBend), [wx2, wy2] = P(T.LUGARES.westPoint), pts = [[sx, sy], [sx + (wx2 - sx) * 0.35, sy + 3], [sx + (wx2 - sx) * 0.7, wy2 + 4], [wx2, wy2]].map(([x, y]) => [Math.round(x), Math.round(y)]);
    R.ruta(pts, ru, hex('#2a3458'), { grueso: 1, flecha: false });
    T.chincheta(R, pts[0][0], pts[0][1], t, hex('#2a3458'), { baja: tramo(t, a(0.56), a(0.58)) });
    const L = [0]; for (let i = 1; i < 4; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    let d = ru * L[3], i = 1; while (i < 3 && d > L[i]) i++; const f = (d - L[i - 1]) / (L[i] - L[i - 1] || 1), lx = Math.round(lerp(pts[i - 1][0], pts[i][0], f)), ly = Math.round(lerp(pts[i - 1][1], pts[i][1], f));
    R.rect(lx - 4, ly - 4, lx + 3, ly, K); R.rect(lx - 3, ly - 3, lx + 2, ly - 1, hex('#3a3440')); R.rect(lx + 1, ly - 6, lx + 2, ly - 4, K); R.pset(lx - 2, ly + 1, K); R.pset(lx + 1, ly + 1, K);
    for (let k = 0; k < 3; k++) { const u = ((t * 1.5 + k / 3) % 1); R.pset(lx + 1 - Math.round(u * 6), ly - 7 - Math.round(u * 4), u < 0.5 ? hex('#e8e4dc') : hex('#b8b4ac')); } }
  OTROS.forEach((ll, k) => { const [x, y] = P(ll); T.chincheta(R, Math.round(x), Math.round(y), t, hex('#8c8c96'), { baja: tramo(t, a(0.53) + k * 0.06, a(0.53) + k * 0.06 + 0.3) }); });
  const [nx, ny] = P(T.LUGARES.nuevaYork); T.chincheta(R, Math.round(nx), Math.round(ny), t, hex('#3a6ac8'), { baja: tramo(t, a(0.33), a(0.36)) });
  const [wx, wy] = P(T.LUGARES.westPoint); T.chincheta(R, Math.round(wx), Math.round(wy), t, hex('#c8a040'), { baja: tramo(t, P2 + 0.05, P2 + 0.45), pulso: t > a(0.52) });
  const e = tramo(t, a(0.391), a(0.391) + 0.25); if (e > 0) escudo(Math.round(wx) - 16, Math.round(wy) - 22 + Math.round((1 - e) * 6), 0.6 + 0.4 * e * (1 + 0.15 * Math.sin(Math.min(1, e) * Math.PI)));
};

// ── 3 · la universidad pequeña del Medio Oeste ────────────────────────────────────────────────────────────────────
const PASES = [[P3 + 0.5, 1], [P3 + 2.2, -1], [P3 + 3.9, 1]];
const p3 = (t) => {
  const grito = a(0.945), animo = tramo(t, grito, grito + 0.3);
  T.campo1906(R, t, { animo });
  const DX = 92, RX = 196, SD = 162, SR = 158;
  // a quién le toca: el balón vuela de mano a mano en arco
  let bx = null, by = null, quien = 1, lanza = 0, recibe = 0;
  for (const [t0, d] of PASES) {
    if (t >= t0 - 0.35 && t < t0) lanza = d;
    if (t >= t0 && t < t0 + 0.9) { const u = (t - t0) / 0.9, [x0, y0] = d > 0 ? [DX + 14, SD - 16] : [RX, SR - 16], [x1, y1] = d > 0 ? [RX, SR - 16] : [DX + 14, SD - 16];
      bx = lerp(x0, x1, u); by = lerp(y0, y1, u) - Math.sin(u * Math.PI) * 34; quien = 0; }
    if (t >= t0 + 0.9) { quien = d > 0 ? 2 : 1; recibe = t < t0 + 1.4 ? d : 0; }
  }
  if (t < PASES[0][0]) quien = 1;
  const salto = (k) => (t > grito && t < grito + 1.2 ? Math.round(Math.abs(Math.sin((t - grito) * 8 + k)) * 3) : 0);
  // dos compañeros entrenan detrás: uno trota de lado a lado, el otro hace estiramientos
  const tr = ((t - P3) * 22) % 260, trx = Math.round(tr < 130 ? 70 + tr : 330 - tr);
  R.actor(nd(0), trx, 140, t, { dir: tr < 130 ? 1 : -1, anda: t < grito, brazos: t > grito && t < grito + 1.2, salto: salto(1) });
  R.actor(nd(1), 262, 146, t, { dir: -1, brazos: Math.floor(t * 1.6) % 2 === 0 || (t > grito && t < grito + 1.2), salto: salto(2) });
  R.actor(EL.dorais, DX, SD, t, { dir: 1, dedo: lanza > 0, sonrisa: recibe < 0 || t > grito, brazos: t > grito && t < grito + 1.2, salto: salto(3) });
  R.actor(EL.rockne, RX, SR, t, { dir: -1, dedo: lanza < 0, sonrisa: recibe > 0 || t > grito, brazos: t > grito && t < grito + 1.2, salto: salto(4) });
  if (bx != null) T.balon(R, bx, by, t, { epoca: '1913', s: 0.75, gira: 2, ang: -0.3 });
  else if (quien === 1) { const [hx, hy] = lanza > 0 ? enAlto(DX, SD, 1) : enMano(DX, SD, 1); T.balon(R, hx, hy, t, { epoca: '1913', s: 0.75, ang: -0.4 }); }
  else if (quien === 2) { const [hx, hy] = lanza < 0 ? enAlto(RX, SR, -1) : enMano(RX, SR, -1); T.balon(R, hx, hy, t, { epoca: '1913', s: 0.75, ang: 0.4 }); }
};

// ── 4 · la melé en el barro ───────────────────────────────────────────────────────────────────────────────────────
const p4 = (t) => {
  const m = 0.05 + 0.5 * suave(tramo(t, P4 + 0.4, P5 + 0.6)), montones = b(0.354);
  T.campo1905(R, t, { encuadre: 'general', mele: m, u: 0.4 + 0.6 * tramo(t, montones - 0.3, montones + 0.2) });
  // el balón gordo asoma por delante de la cuña a «ball forward»
  const sale = tramo(t, b(0.48), b(0.52)); if (sale > 0) { const fx = Math.round(lerp(110, 190, m)) + 12 + Math.round(sale * 6); T.balon(R, fx, 131, t, { epoca: '1906', s: 0.7, ang: 0.2 }); }
  // dos suplentes animan desde la banda de acá con sus mantas; uno se tapa los ojos en lo peor
  R.actor(EL.jugador1905, 52, 172, t, { dir: 1, habla: parpadeo(t, 7) && t < montones, dedo: t > P4 + 0.6 && t < montones, sorpresa: t > montones && t < montones + 1.4 });
  R.actor({ ...EL.jugador1905, pal: { ...EL.jugador1905.pal, H: hex('#2a2430') } }, 72, 174, t, { dir: 1, brazos: t > b(0.48) && t < b(0.53) + 0.6, salto: t > b(0.48) && t < b(0.53) ? 2 : 0, sonrisa: t > b(0.48) });
  R.rect(46, 160, 50, 172, hex('#5a4a6a')); R.rect(47, 161, 49, 171, hex('#7a6a8a'));
  // el entrenador grita con la bocina de cartón; a sus pies el cubo con la esponja
  const grita = parpadeo(t, 5) && t < montones + 1;
  R.actor(EL.rector, 112, 168, t, { dir: 1, habla: grita, enfado: t > montones, dedo: t > b(0.48) && t < b(0.53) + 0.5 });
  if (!(t > b(0.48) && t < b(0.53) + 0.5)) { const y = 151 + (grita ? 0 : 1); R.poligono([[124, y - 1], [134, y - 4], [134, y + 4], [124, y + 1]], K); R.poligono([[125, y], [133, y - 3], [133, y + 3], [125, y]], hex('#c8b890')); R.linea(133, y - 3, 133, y + 3, hex('#8a7a58')); }
  R.rect(136, 162, 144, 169, K); R.rect(137, 163, 143, 168, hex('#8a8a92')); R.rect(137, 163, 143, 163, hex('#b8b8c0')); R.rect(138, 162, 142, 162, hex('#3a5a7a')); R.disco(140, 161, 2, hex('#e8c060'));
};

// ── 5 · yarda a yarda, desde la banda ─────────────────────────────────────────────────────────────────────────────
const YARDAS = [b(0.536) + 0.1, b(0.586) + 0.05];
const p5 = (t) => {
  const rugby = b(0.734), m = 0.3 + 0.35 * tramo(t, P5, rugby);
  T.campo1905(R, t, { encuadre: 'banda', mele: m, u: 0.6 });
  // el que sale del montón con el balón bajo el brazo, y los dos que se le tiran encima
  const sale = tramo(t, rugby, rugby + 1.3), cx = Math.round(lerp(110, 190, m)) + 18;
  if (sale > 0) {
    const x = Math.round(cx + sale * 50), cae = tramo(t, rugby + 1.3, rugby + 1.6);
    R.actor(EL.jugador1905, x, 146, t, { dir: 1, anda: sale < 1, sorpresa: sale >= 1 });
    T.balon(R, x + 12, 136, t, { epoca: '1906', s: 0.6, ang: 0.1 });
    for (let k = 0; k < 2; k++) { const u = tramo(t, rugby + 0.4 + k * 0.2, rugby + 1.4 + k * 0.1), tx = Math.round(lerp(cx - 10 - k * 8, x - 8 + k * 8, u));
      R.actor({ ...EL.jugador1905, pal: { ...EL.jugador1905.pal, C: hex('#2a4a8a'), c: hex('#f2eee2'), W: hex('#2a4a8a') } }, tx, 148 + k * 2, t, { dir: 1, anda: u > 0 && u < 1, salto: u >= 1 && cae < 1 ? Math.round(Math.sin(cae * Math.PI) * 6) : 0 }); }
  }
  // los jueces de la cadena avanzan la estaca a cada «yard»
  let paso = 0; for (const y of YARDAS) paso += tramo(t, y, y + 0.4);
  const jx = Math.round(80 + paso * 12), an = YARDAS.some((y) => t > y && t < y + 0.4);
  R.linea(jx + 14, 168, jx + 74, 168, hex('#c8c0a0')); for (let i = jx + 16; i < jx + 74; i += 3) R.pset(i, 169, hex('#8a8270'));
  R.actor(EL.periodista, jx, 176, t, { dir: 1, anda: an }); estaca(jx + 12, 174);
  R.actor({ ...EL.periodista, pal: { ...EL.periodista.pal, C: hex('#3a3a4a'), c: hex('#2a2a36') } }, jx + 62, 176, t, { dir: -1, anda: an }); estaca(jx + 72, 174);
};

// ── 6 · West Point a ras de campo: Dorais retrocede ───────────────────────────────────────────────────────────────
const saque = c(0.03), atras = c(0.305), arriba = c(0.388);
const p6 = (t) => {
  const pan = Math.round((t - P6) * 3);
  T.westPoint(R, t, { encuadre: 'campo', pan, defensas: false });
  const empuja = t > saque ? Math.round(Math.sin(t * 9) * 1) : 0;
  // las dos líneas, frente a frente; con el saque empujan
  for (let k = 0; k < 3; k++) R.actor(ejer(k), 236 + k * 15 - empuja, 144 + (k % 2) * 3, t, { dir: -1, salto: t > saque && Math.sin(t * 9 + k) > 0.6 ? 1 : 0, enfado: t > saque });
  for (let k = 0; k < 3; k++) R.actor(nd(k), 188 + k * 14 + empuja, 146 + (k % 2) * 3, t, { dir: 1, salto: t > saque && Math.sin(t * 9 + k + 1) > 0.6 ? 1 : 0 });
  // Rockne sale corriendo por la banda en cuanto sacan, por delante de las líneas
  const ru = tramo(t, saque + 0.2, saque + 3.2); R.actor(EL.rockne, Math.round(lerp(178, 340, ru)), 159, t, { dir: 1, anda: ru > 0 && ru < 1 });
  // Dorais: recibe el saque, retrocede a «drops back» y levanta el brazo a «raises his arm»
  const ret = tramo(t, atras, atras + 0.8), dx = Math.round(lerp(150, 116, suave(ret))), sube = t > arriba;
  R.actor(EL.dorais, dx, 164, t, { dir: 1, anda: ret > 0 && ret < 1, dedo: sube });
  const vuela = tramo(t, saque, saque + 0.35);
  if (vuela < 1) T.balon(R, lerp(222, dx + 12, vuela), lerp(138, 155, vuela), t, { epoca: '1913', s: 0.7, gira: 1 });
  else { const [hx, hy] = sube ? enAlto(dx, 164, 1) : enMano(dx, 164, 1); T.balon(R, hx, hy, t, { epoca: '1913', s: 0.75, ang: sube ? -0.6 : -0.2 }); }
  // en primer término: un cadete que anima y el fotógrafo con su cámara de fuelle y el magnesio
  R.actor(EL.cadete, 22, 177, t, { dir: 1, habla: parpadeo(t, 8) && t > saque, brazos: sube });
  const fx = 262; R.actor(EL.periodista, fx, 179, t, { dir: -1, dedo: t > arriba - 0.4 && t < arriba + 0.3 });
  R.rect(fx - 13, 156, fx - 2, 165, K); R.rect(fx - 12, 157, fx - 3, 164, hex('#3a2a20')); R.rect(fx - 16, 158, fx - 13, 163, hex('#2a2430')); R.disco(fx - 16, 160, 2, hex('#6a7a8a'));
  for (const [x0, x1] of [[fx - 10, fx - 14], [fx - 5, fx - 5], [fx - 1, fx + 4]]) R.linea(x0, 165, x1, 179, hex('#5a3a24'));
  const fl = tramo(t, arriba + 0.1, arriba + 0.5); if (fl > 0 && fl < 1) { const r = Math.round(2 + fl * 4); R.disco(fx - 2, 150, r, hex('#f8f4d8')); R.disco(fx - 2, 150, 1, C.blanco); for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; R.linea(Math.round(fx - 2 + Math.cos(an) * (r + 2)), Math.round(150 + Math.sin(an) * (r + 2)), Math.round(fx - 2 + Math.cos(an) * (r + 5)), Math.round(150 + Math.sin(an) * (r + 5)), hex('#f8f4d8')); } }
};

// ── 7 · el balón en espiral cruza el cielo ────────────────────────────────────────────────────────────────────────
let cieloB = null;
const TONOS = ['#2e5494', '#3a64a8', '#4a76b8', '#5e8ac6', '#7aa2d2', '#9cbadc', '#c0cedc', '#e0d4bc'].map(hex);
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const pintaCielo = () => { const bb = R.nuevo(), prev = R.usar(bb);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 64, (y - 132) * 1.3), f = Math.min(1, y / 190 + Math.max(0, 0.32 - d / 300)); const q = f * (TONOS.length - 1) + (BAYER[(y & 3) * 4 + (x & 3)] / 16 - 0.5); R.pset(x, y, TONOS[Math.max(0, Math.min(TONOS.length - 1, Math.round(q)))]); }
  // el sol bajo de la tarde con su halo tramado
  for (let r = 18; r > 0; r--) for (let a = 0; a < 6.283; a += 0.02) { const x = Math.round(64 + Math.cos(a) * r), y = Math.round(132 + Math.sin(a) * r); if (r > 9 ? ((x + y) & 1) === 0 : true) R.pset(x, y, r > 13 ? hex('#ecdcb4') : r > 9 ? hex('#f6e8c0') : hex('#fff6d8')); }
  // la torre de la capilla, de granito, con sus almenas, la ventana ojival y la sombra
  for (let y = 126; y < 180; y++) for (let x = 226; x < 266; x++) { const j = (y - 126) % 6 === 0 || ((x - 226 + ((y - 126) / 6 | 0) * 5) % 10 === 0); R.pset(x, y, x > 254 ? (j ? hex('#4e4c4a') : hex('#62605c')) : j ? hex('#6e6a62') : (x + y) % 7 === 0 ? hex('#a8a296') : hex('#8e897e')); }
  for (let k = 0; k < 5; k++) { const x = 226 + k * 8; R.rect(x, 120, x + 4, 126, hex('#6e6a62')); R.rect(x, 120, x + 4, 120, hex('#b0aa9e')); R.rect(x + 4, 121, x + 4, 126, hex('#4e4c4a')); }
  R.rect(225, 126, 266, 127, hex('#4e4c4a'));
  R.rect(238, 140, 248, 170, K); R.rect(239, 142, 247, 170, hex('#2a3040')); R.rect(240, 141, 246, 141, K); R.rect(241, 140, 245, 140, K); R.rect(243, 142, 243, 170, hex('#4e4c4a')); R.rect(239, 155, 247, 155, hex('#4e4c4a'));
  for (let y = 144; y < 170; y += 3) R.pset(240, y, hex('#6a7a9a'));
  R.usar(prev); return bb; };
const nube = (cx, cy, w, tonos) => { const bolas = [[0, 0, 0.32], [-0.32, 0.06, 0.24], [0.3, 0.05, 0.26], [-0.1, -0.12, 0.26], [0.14, -0.08, 0.22], [0.48, 0.12, 0.14], [-0.48, 0.12, 0.13]];
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 2), Math.round(r * w), tonos[0]);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), Math.round(r * w), tonos[1]);
  for (const [dx, dy, r] of bolas) { const rr = Math.round(r * w * 0.72); for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) if (i * i + j * j <= rr * rr && (i * i + j * j < rr * rr * 0.5 || ((i + j) & 1))) R.pset(Math.round(cx + dx * w - 1 + i), Math.round(cy + dy * w - 2 + j), tonos[2]); }
  R.rect(Math.round(cx - w * 0.6), Math.round(cy + w * 0.2), Math.round(cx + w * 0.62), Math.round(cy + w * 0.3), tonos[0]); };
const NUBES = [[[0.18, 3], 30, 18, ['#5878b2', '#6a8abe', '#7e9cc8']], [[0.55, 3], 42, 22, ['#5878b2', '#6a8abe', '#7e9cc8']], [[0.05, 7], 74, 30, ['#a8aebe', '#ccd0da', '#eceef2']], [[0.62, 7], 96, 34, ['#a8aebe', '#ccd0da', '#eceef2']], [[0.35, 14], 150, 44, ['#b8a8a0', '#e0d4cc', '#fbf6ee']], [[0.9, 14], 112, 38, ['#b8a8a0', '#e0d4cc', '#fbf6ee']]];
const lanzaT = c(0.462), llega = c(0.70);
const p7 = (t) => {
  if (!cieloB) cieloB = pintaCielo(); R.copiar(cieloB);
  for (const [[f0, v], y, w, tonos] of NUBES) { const x = ((f0 * 480 + t * v) % 480) - 80; nube(x, y, w, tonos.map(hex)); }
  // los gansos en uve que migran
  for (let k = 0; k < 7; k++) { const s = k === 0 ? 0 : Math.ceil(k / 2) * (k % 2 ? 1 : -1), gx = Math.round(300 - (t - P7) * 9 + Math.abs(s) * 7), gy = 84 + s * 4, al = Math.sin(t * 9 + k) > 0;
    R.pset(gx, gy, hex('#2a2430')); R.pset(gx + 1, gy, hex('#2a2430')); R.pset(gx - 1, gy - (al ? 1 : 0), hex('#2a2430')); R.pset(gx + 2, gy - (al ? 1 : 0), hex('#2a2430')); R.pset(gx - 2, gy - (al ? 2 : -1), hex('#3a3440')); R.pset(gx + 3, gy - (al ? 2 : -1), hex('#3a3440')); }
  // las copas de los arces de otoño abajo a la izquierda, que se mecen
  for (let k = 0; k < 7; k++) { const x0 = 6 + k * 30, y0 = 178 - (k % 3) * 6, r = 17 + (k % 2) * 4, tonos = [['#6a1e14', '#a83a1e', '#d8662e', '#f09a4a'], ['#6a4214', '#a8761e', '#d8a83a', '#f4d468'], ['#561e1a', '#8a2e22', '#c0502e', '#e8844a']][k % 3].map(hex);
    // la copa: racimos de hojas en cuatro tonos, la luz arriba a la izquierda, que se mecen con el viento
    for (let q = 0; q < 22; q++) { const an = q * 2.399, d = Math.sqrt((q + 0.5) / 22) * r, bx = Math.round(x0 + Math.cos(an) * d + Math.sin(t * 1.4 + k + q * 0.3) * (d / r) * 1.6), by = Math.round(y0 + Math.sin(an) * d * 0.8), rr = 4 + (q % 3);
      const luz = (Math.cos(an) * -0.6 + Math.sin(an) * -0.8) * d / r; R.disco(bx, by + 1, rr, tonos[0]); R.disco(bx, by, rr - 1, tonos[luz > 0.3 ? 2 : 1]);
      if (luz > 0.1) { R.pset(bx - 1, by - 2, tonos[3]); R.pset(bx, by - 2, tonos[3]); R.pset(bx - 2, by - 1, tonos[luz > 0.5 ? 3 : 2]); } else R.pset(bx + 1, by + 1, tonos[0]); } }
  // los banderines del pretil de la grada, que ondean
  for (let k = 0; k < 4; k++) { const x = 176 + k * 14, y = 158 + (k % 2) * 3; R.rect(x, y, x, 180, hex('#3a2a20')); const col = [hex('#2a2430'), hex('#c8a040'), hex('#8c8ca0'), hex('#2a3458')][k];
    for (let i = 1; i <= 10; i++) { const w = Math.round(Math.sin(t * 6 + k + i * 0.6) * 1.2), h = Math.round(3.5 * (1 - i / 11)); R.rect(x + i, y + 1 + w - h + 3, x + i, y + 1 + w + h + 3, col); } }
  // la bandera de la torre
  R.rect(245, 98, 245, 120, hex('#3a3440'));
  for (let i = 1; i <= 16; i++) for (let j = 0; j < 10; j++) { const w = Math.round(Math.sin(t * 5 - i * 0.5) * 1.3 * i / 16); const col = i <= 7 && j < 5 ? ((i + j) % 2 ? hex('#2a3a78') : hex('#e8e4dc')) : j % 2 ? hex('#e8e4dc') : hex('#b82a2a'); R.pset(245 + i, 98 + j + w, col); }
  // las hojas que vuelan
  for (let k = 0; k < 12; k++) { const u = ((t * 0.18 + k / 12) % 1), x = Math.round(((k * 53 + t * 26) % 340) - 10), y = Math.round(40 + u * 120 + Math.sin(t * 3 + k) * 6); R.pset(x, y, [hex('#e8803a'), hex('#c84a22'), hex('#f0c050')][k % 3]); R.pset(x + (Math.sin(t * 5 + k) > 0 ? 1 : -1), y, hex('#8a2a1a')); }
  // el balón: entra por abajo a «throws», sube en espiral y baja la punta al pasar la cima
  const u = tramo(t, lanzaT, llega); if (u > 0 && u < 1) { const x = lerp(-24, 344, u), y = 196 - 4 * 150 * u * (1 - u), ang = Math.atan2(-600 * (1 - 2 * u), 368);
    T.balon(R, x, y, t, { epoca: '1913', s: 2.4, gira: 2.6, ang, estela: 1.3 }); }
};

// ── 8 · Rockne lo atrapa y corre solo por la banda ────────────────────────────────────────────────────────────────
const atrapa = c(0.73), come = c(0.80);
const p8 = (t) => {
  const pan = Math.round(320 + (t - P8) * 54);
  T.westPoint(R, t, { encuadre: 'campo', pan, defensas: false });
  // los defensas del Ejército, lejos y cada vez más atrás
  for (let k = 0; k < 2; k++) R.actor(ejer(k), Math.round(40 - (t - P8) * 9 - k * 22), 136 + k * 5, t, { dir: 1, anda: true, enfado: true });
  // Rockne corre: brazos arriba para recibir, lo atrapa en «hands» y sigue solo, con el balón bajo el brazo
  const rx = Math.round(150 + (t - P8) * 4), sueloR = 156, tiene = t >= atrapa;
  R.actor(EL.rockne, rx, sueloR, t, { dir: 1, anda: true, brazos: !tiene, sonrisa: tiene });
  if (!tiene) { const u = tramo(t, P8, atrapa), x = lerp(40, rx + 8, u), y = lerp(-10, sueloR - 34, u); T.balon(R, x, y, t, { epoca: '1913', s: 1, gira: 2.6, ang: 0.7, estela: 0.8 }); }
  else { const [hx, hy] = enMano(rx, sueloR, 1); T.balon(R, hx, hy + 1, t, { epoca: '1913', s: 0.8, ang: -0.3 }); }
  // primer término: el público de pie tras la cuerda de la banda de acá, que pasa por delante con la cámara; salta
  // cuando Rockne atrapa el balón. Entre ellos, el cadete del programa y la mula, que se lo come mientras él mira
  const dx = (t - P8) * 62, gente = [EL.cadete, EL.periodista, EL.cadete, { ...EL.cadete, pal: { ...EL.cadete.pal, H: hex('#2a2430') } }, EL.recogepelotas, EL.cadete];
  for (let k = 0; k < 18; k++) { if (k === 15 || k === 16) continue; const x = Math.round(((k * 23 + 7 - dx) % 414 + 414) % 414) - 40, salta = tiene && Math.sin(t * 8 + k * 1.3) > 0.2 ? 3 : 0;
    R.actor(gente[k % gente.length], x, 187 + (k % 2) * 3, t, { dir: x + 7 < rx ? 1 : -1, salto: salta, sonrisa: tiene, habla: !tiene && Math.sin(t * 6 + k) > 0.4 }); }
  for (let x = 0; x < 320; x++) R.pset(x, 170 + Math.round(Math.sin(((x + dx * 1.15) % 40) / 40 * Math.PI)), hex('#d8ccb0'));
  const fx = Math.round(((15 * 23 + 7 - dx) % 414 + 414) % 414) - 40, co = tramo(t, come, come + 1.4), mira = t > come + 1.6;
  R.actor(EL.cadete, fx + 30, 186, t, { dir: mira ? -1 : 1, dedo: !mira && co <= 0.05, sorpresa: mira, sonrisa: !mira && tiene });
  if (co <= 0.05) { const [hx, hy] = enAlto(fx + 30, 186, 1); programa(hx - 2, hy - 1); }
  T.g_mula(R, fx + 12, 183, t, { dir: 1, come: co, programa: co > 0.05 });
};

const efectos = [[1.45, 'silbato'], [2.6, 'palmada'], [P2 + 0.4, 'pop'], [a(0.391) + 0.1, 'brillo'], [a(0.56), 'pop'],
  [PASES[0][0] + 0.9, 'golpecito'], [PASES[1][0] + 0.9, 'golpecito'], [a(0.945) + 0.1, 'palmada'],
  [b(0.354), 'chof'], [b(0.48), 'golpecito'], [YARDAS[0], 'toc'], [YARDAS[1], 'toc'], [b(0.734) + 1.45, 'chof'], [b(0.734) + 1.9, 'silbato'],
  [saque, 'toc'], [arriba + 0.1, 'flash'], [lanzaT + 0.05, 'whoosh'], [atrapa, 'golpecito'], [atrapa + 0.2, 'palmada'], [come + 0.2, 'masca'], [come + 1.6, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { cartela: '1913', efectos, año: 1913 });
''')

E['fa-gana'] = ('Gana Notre Dame', '''// FA-GANA (frase 4), 1913. Dos planos:
// 1. el marcador de madera de West Point al atardecer («Notre Dame wins 35–13»): el chico cuelga el «35» de Notre Dame
//    y la chapa se balancea; debajo, Dorais y Rockne saltan con los brazos arriba; el público tira las gorras y vuelan
//    los sombreros; un periodista dispara el magnesio de su cámara de fuelle; un cadete aplaude y otro se encoge; el
//    repartidor de periódicos entra pregonando;
// 2. el inserto de los periódicos («newspapers across the country write about those passes»): sobre el mostrador del
//    quiosco caen uno encima de otro periódicos de todo el país, cada uno con su cabecera y el dibujo del pase en la
//    portada; a «the game starts to change forever» la línea del pase de la portada se dibuja sola, el balón la recorre
//    y brilla. Café que humea, monedas, el reloj de bolsillo, el lápiz, el fajo atado y el polvo en el rayo de sol.''', r'''
const g = (f) => en('gana', f);
const P2 = g(0.4);
const C = T.C, K = C.k;
const enMano = (x, suelo, dir) => [dir > 0 ? x + 12 : x + 2, suelo - 9];
const nd = (k) => ({ ...EL.dorais, pal: { ...EL.dorais.pal, H: [hex('#6a3a1a'), hex('#a8743c'), hex('#3a2418')][k % 3] } });
const cuelga = g(0.098), fogon = g(0.322) - 0.1;

// ── 1 · el marcador: 35 a 13 ──────────────────────────────────────────────────────────────────────────────────────
const SOMBREROS = [[30, 0.55, 1], [64, 0.7, -1], [250, 0.62, 1], [296, 0.8, -1], [150, 1.4, 1]];
const p1 = (t) => {
  T.westPoint(R, t, { encuadre: 'marcador', marcador: [13, 35], cambio: cuelga });
  const fiesta = t > 0.5, bote = (k) => (fiesta ? Math.round(Math.abs(Math.sin(t * 7 + k)) * 4) : 0);
  // debajo del tablero: Notre Dame lo celebra
  R.actor(EL.dorais, 124, 170, t, { dir: 1, brazos: fiesta, salto: bote(0), sonrisa: true });
  R.actor(EL.rockne, 150, 172, t, { dir: -1, brazos: fiesta && Math.sin(t * 3) > -0.6, salto: bote(1), sonrisa: true });
  R.actor(nd(0), 178, 168, t, { dir: -1, brazos: fiesta && t > 0.8, salto: bote(2), sonrisa: true });
  // a la izquierda los periodistas: uno apunta, otro dispara el magnesio
  R.actor(EL.periodista, 22, 172, t, { dir: 1, habla: Math.sin(t * 8) > 0, dedo: t > 1.2 && t < 2.2 });
  R.rect(14, 160, 20, 166, K); R.rect(15, 161, 19, 165, hex('#f2eee2')); R.linea(16, 162, 18, 162, hex('#9a9488')); R.linea(16, 164, 18, 164, hex('#9a9488'));
  const fx = 62; R.actor({ ...EL.periodista, pal: { ...EL.periodista.pal, C: hex('#3a3a4a'), c: hex('#2a2a36') } }, fx, 174, t, { dir: 1, dedo: t > fogon - 0.5 && t < fogon + 0.3 });
  R.rect(fx + 14, 150, fx + 25, 159, K); R.rect(fx + 15, 151, fx + 24, 158, hex('#3a2a20')); R.rect(fx + 25, 152, fx + 28, 157, hex('#2a2430')); R.disco(fx + 28, 154, 2, hex('#6a7a8a'));
  for (const [x0, x1] of [[fx + 16, fx + 12], [fx + 20, fx + 20], [fx + 23, fx + 28]]) R.linea(x0, 159, x1, 174, hex('#5a3a24'));
  R.rect(fx + 15, 142, fx + 17, 149, hex('#8a8a92')); const fl = tramo(t, fogon, fogon + 0.45); if (fl > 0 && fl < 1) { R.disco(fx + 16, 140, Math.round(3 + fl * 7), hex('#f8f4d8')); R.disco(fx + 16, 140, 2, C.blanco); }
  if (fl >= 1) for (let k = 0; k < 6; k++) { const u = ((t - fogon) * 0.6 + k * 0.12), x = Math.round(fx + 16 + Math.sin(k * 2 + t) * 4 + u * 10), y = Math.round(138 - u * 26); if (u < 1) R.pset(x, y, (x + y) & 1 ? hex('#d8d4cc') : hex('#b8b4ac')); }
  // a la derecha los cadetes: uno aplaude con deportividad, el otro se encoge
  R.actor(EL.cadete, 244, 170, t, { dir: -1, dedo: Math.sin(t * 9) > 0, habla: true });
  R.actor({ ...EL.cadete, pal: { ...EL.cadete.pal, H: hex('#2a2430') } }, 266, 172, t, { dir: -1, triste: true });
  // el repartidor de periódicos entra pregonando con el fajo bajo el brazo
  const ru = tramo(t, 1.9, P2 - 0.2), rx = Math.round(lerp(330, 286, ru));
  R.actor({ ...EL.recogepelotas, pal: { ...EL.recogepelotas.pal, C: hex('#7a5a3a'), c: hex('#5a4028'), W: hex('#7a5a3a') } }, rx, 178, t, { dir: -1, anda: ru > 0 && ru < 1, habla: ru >= 1 && Math.sin(t * 9) > 0, dedo: ru >= 1 });
  { const [hx, hy] = enMano(rx, 178, -1); R.rect(hx - 4, hy - 2, hx + 5, hy + 4, K); R.rect(hx - 3, hy - 1, hx + 4, hy + 3, hex('#e8e2d0')); R.rect(hx - 3, hy, hx + 4, hy, hex('#9a9488')); R.rect(hx - 3, hy + 2, hx + 4, hy + 2, hex('#b8b2a2')); }
  // los sombreros que vuelan al aire
  for (const [x0, t0, d] of SOMBREROS) { const u = (t - t0) / 1.6; if (u <= 0 || u >= 1) continue; const x = Math.round(x0 + d * u * 22), y = Math.round(150 - Math.sin(u * Math.PI) * 70), gi = Math.floor(t * 8 + x0) % 2;
    R.rect(x - 4, y + 1, x + 4, y + 2, K); R.rect(x - 2, y - 3, x + 2, y + 1, K); R.rect(x - 3, y + 1, x + 3, y + 1, gi ? hex('#3a2a20') : hex('#2a2430')); R.rect(x - 1, y - 2, x + 1, y, hex('#3a2a20')); R.pset(x - 1, y - 2, hex('#6a5040')); }
};

// ── 2 · los periódicos de todo el país ────────────────────────────────────────────────────────────────────────────
let mesaB = null;
const MAD = ['#5a3418', '#6e4220', '#7e4e28', '#8e5c30', '#a06a3a'].map(hex);
const pintaMesa = () => { const bb = R.nuevo(), prev = R.usar(bb);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(y / 30), yy = y % 30, v = Math.sin(x * 0.05 + tabla * 2.1 + Math.sin(x * 0.013 + tabla) * 3 + yy * 0.35) + Math.sin(x * 0.21 + yy * 1.7 + tabla) * 0.3;
    let q = 2 + (v > 0.9 ? 1 : v < -0.9 ? -1 : 0) + ((x * 7 + y * 13 + tabla) % 23 === 0 ? 1 : 0); if (yy === 0) q = 0; if (yy === 1) q = 4; if (yy === 29) q = 1;
    R.pset(x, y, MAD[Math.max(0, Math.min(4, q))]); }
  for (let tb = 0; tb < 6; tb++) for (const x of [12 + tb * 37 % 40, 300 - tb * 23 % 30]) { R.pset(x, tb * 30 + 4, hex('#2a1a10')); R.pset(x, tb * 30 + 25, hex('#2a1a10')); R.pset(x + 1, tb * 30 + 4, hex('#c8a070')); }
  // el nudo de la madera
  for (const [nx, ny] of [[44, 136], [212, 18], [292, 104]]) for (let r = 4; r > 0; r--) for (let a = 0; a < 6.283; a += 0.15) R.pset(Math.round(nx + Math.cos(a) * r * 1.8), Math.round(ny + Math.sin(a) * r), r % 2 ? MAD[0] : MAD[1]);
  R.usar(prev); return bb; };
// un periódico de 1913 sin letras: la cabecera es un adorno, los titulares barras, la foto el dibujo del pase y el 35–13
const PAPELES = [[g(0.40) + 0.3, 18, 30, -200, 0, '#2a2430'], [g(0.475), 128, 20, 0, -150, '#2a3458'], [g(0.52), 36, 44, 330, 0, '#7a2a22'], [g(0.621) - 0.15, 86, 26, 0, 200, '#1c1a20']];
const periodico = (x, y, tinta, t, ultimo, dibuja) => {
  const W = 150, H = 132;
  R.rect(x + 3, y + 3, x + W + 3, y + H + 3, hex('#3a2010'));
  R.rect(x, y, x + W, y + H, K); R.rect(x + 1, y + 1, x + W - 1, y + H - 1, hex('#ece6d4'));
  for (let j = y + 2; j < y + H - 1; j += 5) for (let i = x + 2; i < x + W - 1; i += 7) R.pset(i + (j % 2) * 3, j, hex('#ddd6c2'));
  R.rect(x + W - 1, y + 1, x + W - 1, y + H - 1, hex('#c8c0aa'));
  // la cabecera: un adorno de tinta con dos estrellas, y la doble raya
  R.rect(x + 14, y + 6, x + W - 14, y + 15, tinta); for (let i = x + 17; i < x + W - 17; i++) R.pset(i, y + 10 + Math.round(Math.sin((i - x) * 0.45) * 2.4), hex('#ece6d4'));
  for (let i = x + 20; i < x + W - 20; i += 9) { R.pset(i, y + 8, hex('#ece6d4')); R.pset(i + 4, y + 13, hex('#ece6d4')); } R.disco(x + W / 2, y + 10, 3, hex('#ece6d4')); R.disco(x + W / 2, y + 10, 2, tinta); R.pset(x + W / 2, y + 10, hex('#c8a040'));
  for (const sx of [x + 6, x + W - 8]) { R.pset(sx + 1, y + 8, tinta); R.rect(sx, y + 9, sx + 2, y + 11, tinta); R.pset(sx + 1, y + 12, tinta); }
  R.rect(x + 4, y + 18, x + W - 4, y + 18, K); R.rect(x + 4, y + 20, x + W - 4, y + 20, K);
  // el titular grande: barras gruesas
  R.rect(x + 8, y + 24, x + 96, y + 29, hex('#2a2430')); R.rect(x + 8, y + 32, x + 70, y + 36, hex('#2a2430'));
  R.numero('35-13', x + 104, y + 36, { rampa: [hex('#2a2430'), hex('#2a2430'), hex('#2a2430'), hex('#2a2430')] });
  // la foto: el dibujo del pase (el lanzador, el arco punteado y el receptor)
  const fx = x + 8, fy = y + 42, fw = 86, fh = 56;
  R.rect(fx, fy, fx + fw, fy + fh, K); R.rect(fx + 1, fy + 1, fx + fw - 1, fy + fh - 1, hex('#d8d2c0'));
  for (let j = fy + 1; j < fy + fh; j++) for (let i = fx + 1; i < fx + fw; i++) if ((i + j) % 3 === 0 && j > fy + 38) R.pset(i, j, hex('#b0aa98'));
  for (let i = fx + 1; i < fx + fw; i += 2) R.pset(i, fy + 40, hex('#8a8474'));
  const fig = (px, py, brazo) => { R.disco(px, py - 9, 2, hex('#3a3440')); R.rect(px - 2, py - 7, px + 2, py - 2, hex('#3a3440')); R.linea(px - 1, py - 2, px - 3, py + 2, hex('#3a3440')); R.linea(px + 1, py - 2, px + 3, py + 2, hex('#3a3440')); if (brazo) R.linea(px + 2, py - 6, px + 5, py - 11, hex('#3a3440')); };
  fig(fx + 14, fy + 46, true); fig(fx + 72, fy + 44, false);
  const n = ultimo ? Math.max(0, Math.min(1, dibuja)) : 1, arco = (u) => [fx + 19 + u * 50, fy + 35 - Math.sin(u * Math.PI) * 26];
  for (let u = 0; u <= n; u += 0.02) { if (Math.floor(u * 50) % 2) continue; const [ax, ay] = arco(u); R.pset(Math.round(ax), Math.round(ay), hex('#3a3440')); }
  if (ultimo && dibuja > 0) { const [bx, by] = arco(n); T.balon(R, bx, by, t, { epoca: '1913', s: 0.55, ang: Math.atan2(-Math.cos(n * Math.PI) * 26 * Math.PI, 50) }); }
  // las columnas de texto: renglones grises
  for (let col = 0; col < 2; col++) for (let j = 0; j < 12; j++) { const cx = x + 100 + col * 24, cy = y + 44 + j * 5, l = 18 - ((j * 7 + col * 3) % 5); R.rect(cx, cy, cx + l, cy + 1, hex('#8a8474')); }
  for (let col = 0; col < 3; col++) for (let j = 0; j < 5; j++) { const cx = x + 8 + col * 46, cy = y + 104 + j * 5, l = 40 - ((j * 5 + col * 7) % 9); R.rect(cx, cy, cx + l, cy + 1, hex('#8a8474')); }
  R.rect(x + 54, y + 101, x + 54, y + 128, hex('#b0aa98')); R.rect(x + 100, y + 101, x + 100, y + 128, hex('#b0aa98'));
};
const p2 = (t) => {
  if (!mesaB) mesaB = pintaMesa(); R.copiar(mesaB);
  // el rayo de sol que entra en diagonal, con su polvo
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = x - 180 + y * 0.6; if (d > 0 && d < 70 && ((x + y * 3) & 3) === 0) { const p = R.pget(x, y); R.pset(x, y, (p & 0xff000000) | Math.min(255, ((p >> 16) & 255) + 22) << 16 | Math.min(255, ((p >> 8) & 255) + 18) << 8 | Math.min(255, (p & 255) + 12)); } }
  // el café con su vapor, las monedas, el lápiz y el reloj de bolsillo que hace tic tac
  for (let k = 0; k < 4; k++) { const x = 196 + k * 4, y = 172 - k; R.disco(x, y, 5, K); R.disco(x, y, 4, hex('#b87a3a')); R.disco(x - 1, y - 1, 2, hex('#e0a860')); R.pset(x + 1, y + 1, hex('#8a5a2a')); }
  R.linea(250, 172, 300, 160, K); R.linea(250, 171, 300, 159, hex('#e8c040')); R.linea(296, 160, 300, 159, hex('#e8a8a0')); R.linea(250, 172, 254, 171, hex('#3a3440'));
  R.disco(296, 140, 13, K); R.disco(296, 140, 12, hex('#c8a040')); R.disco(296, 140, 10, hex('#f2eee2')); R.rect(294, 124, 298, 127, hex('#c8a040'));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.pset(Math.round(296 + Math.cos(a) * 8), Math.round(140 + Math.sin(a) * 8), K); }
  { const s = Math.floor(t) * Math.PI / 30 - Math.PI / 2; R.linea(296, 140, Math.round(296 + Math.cos(s) * 8), Math.round(140 + Math.sin(s) * 8), hex('#c83a2a')); R.linea(296, 140, 300, 136, K); }
  // el fajo atado con cordel, en el borde derecho
  R.rect(270, 50, 320, 66, hex('#3a2010')); for (let k = 0; k < 5; k++) R.rect(268, 48 + k * 3, 320, 49 + k * 3, k % 2 ? hex('#d8d0bc') : hex('#ece6d4')); R.rect(268, 47, 268, 63, K); R.rect(286, 46, 287, 64, hex('#c8a060')); R.pset(287, 45, hex('#c8a060')); R.pset(285, 44, hex('#c8a060'));
  // los periódicos caen uno encima de otro, deslizándose desde fuera
  PAPELES.forEach(([t0, x, y, dx, dy, tinta], i) => { const u = tramo(t, t0, t0 + 0.3); if (u <= 0) return; const e = 1 - (1 - u) * (1 - u);
    periodico(Math.round(x + dx * (1 - e)), Math.round(y + dy * (1 - e)), tinta, t, i === PAPELES.length - 1, tramo(t, g(0.761), g(0.9))); });
  // el polvo en el rayo de sol
  // la taza de café, encima de todo, con su vapor
  R.disco(290, 92, 13, hex('#3a2010')); R.disco(288, 90, 13, K); R.disco(288, 90, 12, hex('#e8e4dc')); R.disco(288, 90, 9, hex('#c8c0b4')); R.disco(288, 90, 8, hex('#3a2010')); R.disco(286, 88, 2, hex('#6a4020')); R.rect(300, 86, 305, 94, K); R.rect(301, 87, 304, 93, hex('#e8e4dc'));
  for (let k = 0; k < 7; k++) { const u = ((t * 0.5 + k / 7) % 1), x = Math.round(288 + Math.sin(u * 7 + k) * 3 - u * 6), y = Math.round(86 - u * 30); if (y > 50) R.pset(x, y, u < 0.5 ? hex('#e8e0d4') : hex('#c8beb0')); }
  for (let k = 0; k < 14; k++) { const u = ((t * 0.07 + k * 0.071) % 1), x = Math.round(190 + k * 6 - u * 40 + Math.sin(t + k) * 3), y = Math.round(u * 170); R.pset(x, y, hex('#f8ecd0')); }
  const br = tramo(t, g(0.907), g(0.907) + 0.6); if (br > 0 && br < 1) { const [bx, by] = [86 + 8 + 19 + 50, 26 + 42 + 35]; for (let r = 1; r < 3 + br * 6; r++) { R.pset(bx + r, by, C.blanco); R.pset(bx - r, by, C.blanco); R.pset(bx, by + r, C.blanco); R.pset(bx, by - r, C.blanco); } }
};
const efectos = [[0.55, 'palmada'], [cuelga, 'toc'], [fogon, 'flash'], [PAPELES[0][0] + 0.25, 'papel'], [PAPELES[2][0] + 0.25, 'papel'], [PAPELES[3][0] + 0.25, 'papel'], [g(0.907), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 1913 });
''')
