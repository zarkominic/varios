E = {}
E['oi-cove'] = ("Smith's Cove", '''// OI-COVE (frases 16–18), 1849–1850, sin cartela. Seis planos:
// 1. la orilla con la marea alta: llegan los tres de la compañía; «tide goes out» el agua se retira y «the sand weeps
//    water» la arena llora: hilillos que corren al mar; el cavador lo ve y se sorprende (corta en «and when they dig»);
// 2. desde dentro de la zanja: cavan (la arena cae), «coconut fiber» el cavador alza un mechón de fibra, «stone channels»
//    el capataz señala los canales; gag: el cangrejo sale de un canal, los mira y se mete en otro (corta en «In 1850»);
// 3. la playa con la zanja: levantan el dique (mazo, tablones); «an extra-high tide» la ola rompe, se lo lleva y los tres
//    se apartan corriendo (corta en «before»);
// 4. la orilla sur: los tablones flotan a la deriva, los tres alicaídos; «famous theory» al capataz se le ocurre (¡!) y
//    señala el mar (corta en «is born»);
// 5. el pozo en corte: el capataz se acerca; «tunnel from the sea to the pit» se dibuja el túnel de puntos y el agua
//    del mar corre por él hasta el fondo; el cavador se asusta (¡!) (corta en «A booby trap»);
// 6. abajo, en el fondo del pozo: un buscador da con el cofre y «water would swallow» el agua brota y lo cubre; él sube por
//    la soga a tiempo: se agarra y lo izan.''', r'''
const a = (f) => en('cove', f), b = (f) => en('dique', f), c = (f) => en('trampa', f);
const P2 = a(0.537), P3 = b(0), P4 = b(0.831), P5 = c(0.203), P6 = c(0.611);
const MAD = hex('#7a5230'), MADL = hex('#a8784a'), MADS = hex('#4e3218'), FIB = hex('#a0703c'), FIBL = hex('#c8955a'), FIBS = hex('#6e4422');
const AGUA = hex('#9ad0e8'), AGUAL = hex('#e8f8ff'), K = hex('#1c1424');
const mez = (p, q, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((p >>> s) & 255) * (1 - k) + ((q >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const tinta = (x, y, col, k) => R.pset(x, y, mez(R.pget(x, y), col, k));
// la pala en las manos: mango de madera con veta y hoja de hierro con su filo
const pala = (x, y, ang, larga = 16) => {
  const ux = Math.cos(ang), uy = Math.sin(ang), x1 = x + ux * larga, y1 = y + uy * larga;
  R.linea(Math.round(x), Math.round(y), Math.round(x1), Math.round(y1), MADS); R.linea(Math.round(x) - 1, Math.round(y), Math.round(x1) - 1, Math.round(y1), MAD);
  R.rect(Math.round(x) - 2, Math.round(y) - 1, Math.round(x) + 1, Math.round(y), MADS);
  const bx = Math.round(x1), by = Math.round(y1);
  R.poligono([[bx - 3, by], [bx + 3, by], [bx + 2 + Math.round(ux * 5), by + 5], [bx - 2 + Math.round(ux * 5), by + 5]], hex('#8a96a2'));
  R.linea(bx - 3, by, bx + 3, by, K); R.pset(bx - 1, by + 1, hex('#c8d2dc')); R.pset(bx, by + 2, hex('#c8d2dc'));
};
// el tablón: madera con vetas, cantos oscuros y un clavo
const tablon = (x, y, w, h = 3) => {
  R.rect(x - 1, y - 1, x + w, y + h, K); R.rect(x, y, x + w - 1, y + h - 1, MAD); R.rect(x, y, x + w - 1, y, MADL);
  for (let i = 3; i < w - 2; i += 5) R.pset(x + i, y + 1 + (i % 2), MADS); R.pset(x + 2, y + 1, hex('#5e6a76'));
};
// el mechón de fibra de coco: una mata ovalada de hebras pardas con brillos, contorno oscuro y hebras sueltas que cuelgan
const fibra = (x, y, t, s = 2) => {
  const W = 9 * s, H = 5 * s;
  for (let j = -H - 1; j <= H + 1; j++) for (let i = -W - 1; i <= W + 1; i++) { const d = (i / (W + 1)) ** 2 + (j / (H + 1)) ** 2; if (d <= 1) R.pset(x + i, y + j, K); }
  for (let j = -H; j <= H; j++) for (let i = -W; i <= W; i++) { if ((i / W) ** 2 + (j / H) ** 2 > 1) continue;
    const v = (Math.floor((i + j * 2.3 + Math.sin(j * 0.9) * 3) / 2) % 3 + 3) % 3; R.pset(x + i, y + j, j < -H * 0.4 && v === 0 ? FIBL : v === 1 ? FIBS : FIB); }
  for (let k = 0; k < 6; k++) { const hx = x - W + 3 + k * Math.round(2 * W / 6), l = 3 + (k * 5) % 4 + s; for (let j = 0; j < l; j++) { const xx = hx + Math.round(Math.sin(t * 4 + k + j * 0.6) * (j / 3)); R.pset(xx, y + H - 1 + j, j === l - 1 ? FIBL : FIBS); } }
  for (let k = 0; k < 4; k++) R.pset(x - W + 4 + k * 5, y - H + 2 + (k % 2), FIBL);
};
// 1 · la orilla: la marea se retira y la arena llora agua
const p1 = (t) => {
  const baja = tramo(t, a(0.26), a(0.402)), marea = 0.85 - 0.8 * baja;
  T.isla1795(R, t, { encuadre: 'orilla', marea, polea: false });
  // los hilillos que lloran desde la arena hasta el agua, con sus gotas de luz
  const llora = tramo(t, a(0.38), a(0.46)), yAgua = Math.round(lerp(140, 118, baja));
  if (llora > 0) for (const [k, x0] of [128, 154, 176, 214, 236].entries()) {
    const y0 = 149, y1 = Math.round(lerp(y0, yAgua + 2, Math.min(1, llora * 1.3)));
    for (let y = y0; y >= y1; y--) { const x = x0 + Math.round(Math.sin(y * 0.35 + k) * 1.5 + (y0 - y) * 0.08 * (k % 2 ? 1 : -1)); tinta(x - 1, y, hex('#5a8aa8'), 0.5); tinta(x, y, AGUA, 0.9); tinta(x + 1, y, AGUA, 0.7); tinta(x + 2, y, hex('#5a8aa8'), 0.35); if ((y + k + Math.floor(t * 8)) % 5 === 0) R.pset(x, y, AGUAL); }
    for (let g = 0; g < 2; g++) { const u = ((t * 0.9 + k * 0.23 + g * 0.5) % 1), y = Math.round(lerp(y0, y1, u)); if (y1 < y0) R.pset(x0 + Math.round(Math.sin(y * 0.35 + k) * 1.5 + (y0 - y) * 0.08 * (k % 2 ? 1 : -1)), y, AGUAL); }
    for (let i = -3; i <= 3; i++) tinta(x0 + i, y0 + 1 + (Math.abs(i) > 2 ? 0 : 1), AGUA, 0.8); const bor = Math.floor(t * 6 + k) % 3; R.pset(x0 - 1 + bor, y0, AGUAL);
  }
  // una gaviota cruza alta por el cielo
  const g = tramo(t, 0.4, 6.4); T.gaviota(R, Math.round(lerp(250, 40, g)), Math.round(58 + Math.sin(g * 6) * 4), t, { pose: 'vuela', dir: -1 });
  // llegan por la arena desde la derecha
  const u1 = tramo(t, 0.2, a(0.209)), u2 = tramo(t, 0.5, a(0.26)), u3 = tramo(t, 0.8, a(0.3));
  const xc = Math.round(lerp(340, 214, u1)), xv = Math.round(lerp(352, 162, u2)), xw = Math.round(lerp(366, 120, u3));
  const ve = t > a(0.435);
  // las huellas que dejan en la arena mojada
  for (const [x, y, k] of [[xc, 156, 0], [xv, 162, 1], [xw, 168, 2]]) for (let fx = x + 12 + k; fx < 322; fx += 7) { tinta(fx, y, hex('#7a6a4a'), 0.45); tinta(fx + 1, y, hex('#7a6a4a'), 0.3); tinta(fx + 3, y - 2, hex('#7a6a4a'), 0.4); }
  // el cubo: lo lleva el cavador y lo deja en la arena al llegar
  const cubo = (x, y) => { R.rect(x - 1, y - 7, x + 7, y, K); R.rect(x, y - 6, x + 6, y - 1, hex('#8a6a44')); R.rect(x, y - 6, x + 6, y - 6, hex('#b8925e')); R.rect(x, y - 3, x + 6, y - 3, hex('#5e6a76')); R.linea(x, y - 7, x + 3, y - 10, K); R.linea(x + 3, y - 10, x + 6, y - 7, K); };
  cubo(u3 < 1 ? xw + 13 : xw + 16, u3 < 1 ? 160 + (Math.floor(t * 5) % 2) : 169);
  R.actor(EL.capataz, xc, 156, t, { dir: -1, anda: u1 > 0 && u1 < 1, dedo: t > a(0.297) && t < a(0.42), habla: t > a(0.297) && t < a(0.38) && Math.sin(t * 8) > 0 });
  R.actor(EL.cavador2, xv, 162, t, { dir: -1, anda: u2 > 0 && u2 < 1, sonrisa: ve });
  if (u2 < 1) pala(xv + 4, 141 + 0 * xv, -1.1, 14);
  R.actor(EL.cavador, xw, 168, t, { dir: -1, anda: u3 > 0 && u3 < 1, sorpresa: ve, salto: ve && t < a(0.47) ? Math.round(Math.sin((t - a(0.435)) * 10) * 2 + 2) : 0 });
  if (ve) R.bocadillo(xw + 8, 136, { icono: '!' });
  T.a_islaDelante(R, t, { encuadre: 'orilla' });
};

// 2 · dentro de la zanja: cavan, la fibra de coco, los canales en abanico y el cangrejo
const p2 = (t) => {
  T.smithsCove(R, t, { encuadre: 'canales' });
  // la arena que cae de las paladas
  for (let k = 0; k < 3; k++) { const t0 = P2 + 0.15 + k * 0.55, u = (t - t0) / 0.6; if (u < 0 || u > 1) continue;
    for (let q = 0; q < 7; q++) { const x = Math.round(176 + q * 2 - 6 + u * (10 + q * 3)), y = Math.round(68 + u * u * 50 + q % 3); R.pset(x, y, q % 2 ? hex('#d8c8a0') : hex('#b8a47c')); R.pset(x + 1, y, hex('#b8a47c')); } }
  // el cavador cava al borde; luego se agacha a mirar
  const cava = t < a(0.684), ang = cava ? (Math.floor((t - P2) / 0.55) % 2 ? 0.9 : 1.6) : 1.3;
  R.actor(EL.cavador2, 168, 66, t, { dir: -1, sorpresa: !cava && t < a(0.79) });
  pala(170, 50, ang, 15);
  // el compañero alza el mechón de fibra de coco
  // la saca de la pared de la zanja (asoma con un destello), la alza sobre la cabeza y la deja en la arena
  const alza = t > a(0.684), sube = tramo(t, a(0.66), a(0.70)), deja = t > a(0.86);
  R.actor(EL.cavador, 196, 66, t, { dir: -1, brazos: sube >= 1 && !deja, sonrisa: alza, salto: alza && !deja && t < a(0.72) ? 1 : 0 });
  if (!deja) { const fy = Math.round(lerp(84, 32, sube)); fibra(203, fy, t, 2); if (t > a(0.6) && sube < 1) for (const [dx, dy] of [[-22, -6], [22, -2], [0, -14]]) if (Math.floor(t * 6 + dx) % 2) { const bx = 203 + dx, by = fy + dy; R.pset(bx, by, hex('#ffffff')); for (const [ex, ey] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(bx + ex, by + ey, hex('#fff6c8')); } }
  else fibra(224, 62, t, 1);
  // el capataz señala los canales
  R.actor(EL.capataz, 72, 66, t, { dir: 1, dedo: t > a(0.79) && t < a(0.94), habla: t > a(0.6) && t < a(0.7) && Math.sin(t * 8) > 0 });
  // un brillo recorre los canales cuando la voz los nombra
  const br = tramo(t, a(0.793), a(0.88));
  if (br > 0 && br < 1) for (const [x0, x1] of [[150, 99], [155, 124], [160, 160], [165, 196], [170, 221]]) { const y = Math.round(lerp(100, 170, br)), x = Math.round(lerp(x0, x1, br)); for (let i = -2; i <= 2; i++) tinta(x + i, y, AGUAL, 0.7 - Math.abs(i) * 0.2); }
  // el cangrejo: sale de un canal, mira arriba y se mete en otro
  const sale = tramo(t, a(0.829), a(0.862)), cruza = tramo(t, a(0.921), a(0.98)), mete = tramo(t, a(0.98), a(1.013));
  if (sale > 0 && mete < 1) {
    const x = Math.round(lerp(124, 196, cruza)), y = 150;
    if (cruza === 0) T.cangrejo(R, x, y, t, { s: 2, hundido: Math.max(0.05, sale), sorpresa: sale >= 1, mira: -1, pinzas: sale >= 1 });
    else if (mete > 0) T.cangrejo(R, x, y, t, { s: 2, hundido: Math.max(0.05, 1 - mete), dir: 1 });
    else T.cangrejo(R, x, y, t, { s: 2, dir: 1, anda: true, pinzas: true });
  }
};

// 3 · la playa con la zanja: el dique y la ola que se lo lleva
const p3 = (t) => {
  const dique = 0.86 * tramo(t, b(0.007), b(0.442)), ola = tramo(t, b(0.454), b(0.82));
  T.smithsCove(R, t, { encuadre: 'playa', cavado: 1, dique, ola });
  const huye = tramo(t, b(0.65), b(0.79));
  // el capataz dirige; el obrero lleva tablones; el cavador clava con el mazo
  R.actor(EL.capataz, Math.round(lerp(52, 22, huye)), 160, t, { dir: huye > 0 ? -1 : 1, anda: huye > 0 && huye < 1, dedo: t < b(0.4) && t > b(0.1), habla: t < b(0.4) && Math.sin(t * 7) > 0.3, sorpresa: t > b(0.6) });
  const lleva = tramo(t, b(0.05), b(0.38)), xl = Math.round(lerp(300, 252, lleva) + lerp(0, 50, huye));
  R.actor(EL.cavador2, xl, 156, t, { dir: huye > 0 ? 1 : -1, anda: (lleva > 0 && lleva < 1) || (huye > 0 && huye < 1), sorpresa: t > b(0.6) });
  if (t < b(0.6)) tablon(xl - 14, 136, 30);
  const xm = Math.round(lerp(92, 60, huye)), golpe = t < b(0.5) ? Math.floor(t * 2.4) % 2 : 0;
  R.actor(EL.cavador, xm, 166, t, { dir: huye > 0 ? -1 : 1, anda: huye > 0 && huye < 1, sorpresa: t > b(0.6) });
  if (t < b(0.6)) { const mx = xm + 12, my = 146; R.linea(mx, my, mx + (golpe ? 8 : 4), my - (golpe ? 2 : 10), MADS); R.rect(mx + (golpe ? 7 : 2), my - (golpe ? 4 : 13), mx + (golpe ? 11 : 6), my - (golpe ? 0 : 10), hex('#5e6a76')); R.rect(mx + 10, 150, mx + 12, 165, MAD); R.rect(mx + 10, 150, mx + 12, 150, MADL); }
};

// 4 · la orilla sur: los tablones flotan a la deriva y nace la teoría
const p4 = (t) => {
  T.smithsCove(R, t, { encuadre: 'sur' });
  for (const [k, [x0, y0, w]] of [[150, 150, 26], [196, 134, 20], [232, 158, 30], [270, 140, 18]].entries()) {
    const x = Math.round(x0 + (t - P4) * (3 + k)), y = Math.round(y0 + Math.sin(t * 1.6 + k * 2) * 1.5);
    tablon(x, y, w, 3); for (let i = -2; i < w + 2; i += 2) tinta(x + i, y + 4, hex('#e8f0f0'), 0.5);
  }
  const idea = t > c(0.12), apunta = t > c(0.165);
  R.actor(EL.capataz, 70, 152, t, { dir: apunta ? 1 : -1, triste: !idea, sorpresa: idea && !apunta, dedo: apunta, sonrisa: apunta });
  if (idea) R.bocadillo(78, 122, { icono: '!' });
  R.actor(EL.cavador, 98, 160, t, { dir: idea ? -1 : 1, triste: !idea, sorpresa: idea });
  const pisa = t < c(0.05) ? Math.max(0, Math.round(Math.sin((t - P4) * 14) * 2)) : 0;
  R.actor(EL.cavador2, 36, 162, t, { dir: 1, enfado: !idea, salto: pisa, sonrisa: idea });
};

// 5 · el pozo en corte: el túnel imaginario del mar al pozo
const p5 = (t) => {
  const tunel = tramo(t, c(0.33), c(0.54));
  const g = T.pozo(R, t, { encuadre: 'corte', epoca: '1849', nivel: 1, sigue: true, tunel, cubo: false });
  // el agua del mar corre por el túnel: un chorro claro que baja por los puntos hasta el fondo del pozo
  const TU = [[226, 90], [182, 126], [125, 167]], L1 = Math.hypot(44, 36), L2 = Math.hypot(57, 41);
  const enTunel = (u) => { const d = u * (L1 + L2); return d < L1 ? [lerp(226, 182, d / L1), lerp(90, 126, d / L1)] : [lerp(182, 125, (d - L1) / L2), lerp(126, 167, (d - L1) / L2)]; };
  if (tunel >= 1) for (let k = 0; k < 3; k++) { const u = ((t - c(0.54)) * 0.55 + k / 3) % 1;
    for (let q = 0; q < 6; q++) { const [px, py] = enTunel(Math.max(0, u - q * 0.012)); R.disco(Math.round(px), Math.round(py), q ? 1 : 2, q < 2 ? AGUAL : AGUA); } }
  if (tunel >= 1) for (let k = 0; k < 4; k++) { const v = ((t * 1.2 + k * 0.25) % 1); R.pset(112 + k * 3, Math.round(166 - v * 10), AGUAL); }
  // el capataz traza con el dedo el camino del mar al pozo; el cavador se asoma a la boca y se asusta
  const va = tramo(t, P5 + 0.2, c(0.33));
  R.actor(EL.capataz, Math.round(lerp(196, 166, va)), 52, t, { dir: -1, anda: va > 0 && va < 1, dedo: tunel > 0, habla: t < c(0.33) && Math.sin(t * 7) > 0 });
  R.actor(EL.cavador, 128, 52, t, { dir: 1, sorpresa: tunel >= 1, salto: tunel >= 1 && t < c(0.56) ? 2 : 0 });
  if (tunel >= 1) R.bocadillo(136, 24, { icono: '!' });
};

// 6 · el fondo del pozo: el cofre, el agua que brota y el buscador que sube a tiempo
const p6 = (t) => {
  const brota = tramo(t, c(0.72), c(0.9)), sube = tramo(t, c(0.78), c(0.88)), trepa = tramo(t, c(0.88), c(1.0));
  T.pozo(R, t, { encuadre: 'fondo', agua: brota });
  // el cofre con su oro, que brilla
  const cx = 156, cy = 163, ORO = hex('#e8b830'), OROS = hex('#a8801c'), OROL = hex('#fff0a0');
  // la tapa abierta hacia atrás y el oro que asoma
  R.rect(cx - 17, cy - 30, cx + 17, cy - 19, K); R.rect(cx - 16, cy - 29, cx + 16, cy - 20, MADS); R.rect(cx - 16, cy - 29, cx + 16, cy - 27, MAD); for (let i = -14; i <= 14; i += 6) R.rect(cx + i, cy - 26, cx + i + 2, cy - 21, MAD);
  R.rect(cx - 17, cy - 18, cx + 17, cy, K); R.rect(cx - 16, cy - 17, cx + 16, cy - 1, MAD); R.rect(cx - 16, cy - 17, cx + 16, cy - 15, MADL);
  for (let i = -15; i <= 15; i += 4) R.rect(cx + i, cy - 12, cx + i + 1, cy - 2, MADS);
  R.rect(cx - 16, cy - 9, cx + 16, cy - 8, hex('#5e6a76')); R.rect(cx - 17, cy - 18, cx - 14, cy, hex('#5e6a76')); R.rect(cx + 14, cy - 18, cx + 17, cy, hex('#5e6a76'));
  R.rect(cx - 3, cy - 12, cx + 3, cy - 6, K); R.rect(cx - 2, cy - 11, cx + 2, cy - 7, ORO); R.pset(cx, cy - 9, K);
  for (let i = -14; i <= 14; i++) { const hh = 4 - Math.round(Math.abs(i) / 5); for (let j = 0; j < hh; j++) R.pset(cx + i, cy - 19 - j, (i + j) % 3 === 0 ? OROL : (i + j) % 3 === 1 ? ORO : OROS); }
  for (const [k, dx] of [[0, -8], [1, 6]]) if (Math.floor(t * 3 + k * 1.5) % 2 && brota < 0.6) { const bx = cx + dx, by = cy - 25; R.pset(bx, by, hex('#ffffff')); for (let r = 1; r <= 2; r++) { R.pset(bx - r, by, OROL); R.pset(bx + r, by, OROL); R.pset(bx, by - r, OROL); R.pset(bx, by + r, OROL); } }
  // el buscador: llega al cofre y sonríe; el agua brota, se asusta, corre a la soga, se agarra y lo izan desde arriba
  const llega = tramo(t, P6 + 0.1, P6 + 1.2), x = Math.round(sube > 0 ? lerp(124, 199, sube) : lerp(70, 124, llega)), y = Math.round(lerp(162, 70, trepa * trepa));
  R.actor(EL.cavador2, x, y, t, { dir: 1, anda: (llega > 0 && llega < 1) || (sube > 0 && sube < 1), brazos: trepa > 0, sonrisa: t < c(0.72), sorpresa: t >= c(0.72), salto: t > c(0.72) && t < c(0.78) ? 2 : 0 });
  if (trepa > 0) { R.linea(206, 0, 206, y - 26, hex('#d8ccaa')); R.linea(207, 0, 207, y - 26, hex('#a8946a')); for (let yy = 2; yy < y - 26; yy += 4) R.pset(206, yy, hex('#8a7a56')); }
  // el agua sube y se traga el cofre
  const nivel = Math.round(lerp(180, 146, brota));
  for (let yy = nivel; yy < 180; yy++) for (let xx = 0; xx < 320; xx++) { const s = yy === nivel + Math.round(Math.sin(xx * 0.2 + t * 4) * 0.8); tinta(xx, yy, s ? AGUAL : hex('#3a6a8a'), s ? 0.8 : 0.45 + Math.min(0.3, (yy - nivel) * 0.01)); }
  if (brota > 0 && brota < 1) for (let k = 0; k < 8; k++) { const u = (t * 1.3 + k * 0.13) % 1; R.pset(40 + k * 34, Math.round(nivel - 1 - u * 5), AGUAL); }
};

const efectos = [[a(0.30), 'ola'], [a(0.42), 'burbujas'], [a(0.435), 'pop'], [P2 + 0.2, 'golpecito'], [P2 + 0.75, 'golpecito'], [a(0.69), 'papel'], [a(0.8), 'burbujas'], [a(0.84), 'pop'], [a(0.99), 'chof'],
  [b(0.1), 'toc'], [b(0.3), 'toc'], [b(0.58), 'ola'], [b(0.7), 'boom'], [c(0.12), 'pop'], [c(0.36), 'lapiz'], [c(0.73), 'burbujas'], [c(0.79), 'chof']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: (t) => (t < P3 ? 1849 : 1850) });
''')

E['oi-mareas'] = ('Las mareas', '''// OI-MAREAS (frase 26), 1850. Dos planos:
// 1. el pozo en corte junto al mar: un buscador baja una cuerda con un flotador al agua del pozo; la marea sube y baja dos
//    veces y el agua del pozo la sigue; una luna pálida cruza el cielo y la sombra del reloj de sol gira (corta en «In
//    time with the tides»);
// 2. la boca del pozo de noche: el obrero llega con el farol; el agua de la boca sube y baja como si la isla respirara; el
//    capataz se aparta y se asoma; la luna sobre la bahía.''', r'''
const m = (f) => en('mareas', f);
const P2 = m(0.643);
const K = hex('#1c1424'), MAD = hex('#7a5230'), MADS = hex('#4e3218'), LUNA = hex('#f2eedc'), LUNAS = hex('#c8c2aa');
const mez = (p, q, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((p >>> s) & 255) * (1 - k) + ((q >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const luna = (x, y, r, k = 1) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r + 0.3) continue; const c = d > r - 0.8 ? LUNAS : (i * 3 + j * 5) % 7 === 0 && d < r - 1.5 ? LUNAS : LUNA; R.pset(x + i, y + j, mez(R.pget(x + i, y + j), c, k)); } };
// la flecha blanca que sube o baja (la misma en el pozo y en el mar)
const flechaV = (x, y, sube) => { for (let j = 0; j < 7; j++) { const w = sube ? Math.floor(j / 2) : 3 - Math.floor(j / 2); R.rect(x - w - 1, y + j - 1, x + w + 1, y + j + 1, K); } for (let j = 0; j < 7; j++) { const w = sube ? Math.floor(j / 2) : 3 - Math.floor(j / 2); R.rect(x - w, y + j, x + w, y + j, j === (sube ? 6 : 0) ? hex('#c8d8e0') : hex('#f2f6f8')); } };
// la marea: dos subidas y dos bajadas en el plano («rises» sube, «falls» baja)
const marea = (t) => 0.5 - 0.5 * Math.cos(2 * Math.PI * (t - 0.8) / 3.0);

const p1 = (t) => {
  const mr = marea(t);
  const g = T.pozo(R, t, { encuadre: 'corte', epoca: '1849', luz: 'tarde', nivel: 1, marea: mr, sigue: true, cubo: false });
  // las dos flechas que suben y bajan a la vez: la del pozo y la del mar
  const sube = Math.sin(2 * Math.PI * (t - 0.8) / 3.0) > 0, flecha = (x, y) => flechaV(x, y, sube);
  if (t > 1.0) { const yp = (g.aguaY ?? 88), ym = (g.marY ?? 88); flecha(134, yp - 4); flecha(300, ym - 14);
    for (let x = 101; x <= 123; x++) R.pset(x, yp, (x + Math.floor(t * 8)) % 3 ? hex('#e8f8ff') : hex('#9ad0e8')); R.linea(126, yp, 130, yp, hex('#f2f6f8')); R.linea(292, ym, 308, ym, hex('#f2f6f8')); }
  // la luna pálida de día que cruza el cielo (la que mueve las mareas)
  const u = tramo(t, 0, P2); luna(Math.round(lerp(58, 214, u)), Math.round(34 - Math.sin(u * Math.PI) * 10), 4, 0.8);
  // el reloj de sol junto a la boca: la sombra del gnomon gira
  const sx = 146, sy = 50; R.rect(sx - 6, sy - 1, sx + 6, sy + 1, K); R.rect(sx - 5, sy - 1, sx + 5, sy, hex('#c8c2b0')); R.rect(sx - 1, sy + 1, sx + 1, sy + 2, hex('#8a8a8a'));
  for (let i = -4; i <= 4; i += 2) R.pset(sx + i, sy - 1, hex('#8a8478'));
  R.linea(sx, sy - 1, sx + 1, sy - 6, K); const ang = Math.PI * (0.15 + 0.7 * u); R.linea(sx, sy - 1, Math.round(sx - Math.cos(ang) * 6), sy - 1, hex('#5a5448'));
  // el buscador baja la cuerda con el flotador hasta el agua del pozo
  const baja = tramo(t, 0.6, 2.4), yAgua = g.aguaY ?? 88, yf = Math.round(lerp(46, yAgua - 2, baja));
  R.actor(EL.cavador, 126, 52, t, { dir: -1, sorpresa: t > m(0.425) && t < m(0.55), dedo: t > m(0.204) && t < m(0.3) });
  R.linea(122, 40, 113, 40, MADS); R.linea(113, 40, 113, yf, hex('#d8ccaa'));
  R.rect(111, yf, 115, yf + 2, K); R.rect(112, yf, 114, yf + 1, hex('#d84a2c')); R.pset(112, yf, hex('#f0804e'));
  // el capataz mira el mar y luego el pozo: van a la vez
  const mira = Math.floor((t - 0.5) / 1.6) % 2 ? -1 : 1;
  R.actor(EL.capataz, 184, 52, t, { dir: mira, habla: t > m(0.2) && t < m(0.24), sorpresa: t > m(0.52) && t < m(0.6) });
};

const p2 = (t) => {
  // el agua de la boca respira: sube y baja con la marea; sale la luna sobre la bahía
  const v = tramo(t, P2, m(0.99)), resp = 0.55 - 0.45 * Math.cos(2 * Math.PI * v * 1.25);
  const g = T.pozo(R, t, { encuadre: 'boca', epoca: '1849', luz: 'noche', agua: resp, cubo: false });
  // el agua que asoma: su filo brilla y la flecha dice si sube o baja
  const yw = 152 - 5 - Math.round(resp * 9), subeA = Math.sin(2 * Math.PI * v * 1.25) > 0;
  for (let x = 141; x <= 179; x++) R.pset(x, yw, (x + Math.floor(t * 8)) % 3 ? hex('#e8f8ff') : hex('#9ad0e8'));
  if (v > 0.05 && v < 0.97) flechaV(174, yw - 12, subeA);
  // el farol: el obrero llega con él y lo alza sobre la boca; su luz tiembla en el agua
  const llega = tramo(t, P2, P2 + 1.6), ox = Math.round(lerp(320, 196, llega));
  R.actor(EL.cavador2, ox, 164, t, { dir: -1, anda: llega > 0 && llega < 1, dedo: llega >= 1, sorpresa: v > 0.35 && v < 0.55 });
  const fx = ox - 2, fy = llega >= 1 ? 128 : 146, fl = Math.sin(t * 13) > 0 ? 1 : 0;
  for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j); if (d < 9 && (i + j + Math.floor(t * 3)) % 2 === 0) { const c = R.pget(fx + i, fy + j); R.pset(fx + i, fy + j, mez(c, hex('#f0c060'), 0.25 * (1 - d / 9))); } }
  R.rect(fx - 3, fy - 4, fx + 3, fy + 4, K); R.rect(fx - 2, fy - 3, fx + 2, fy + 3, hex('#f0c060')); R.rect(fx - 1, fy - 2 + fl, fx + 1, fy + 1, hex('#fff6c8')); R.rect(fx - 3, fy - 6, fx + 3, fy - 5, K); R.pset(fx, fy - 8, K); R.pset(fx, fy - 7, K);
  // el capataz, de rodillas en el brocal, se aparta cuando sube y se asoma cuando baja
  const asoma = resp > 0.7 ? 0 : 1;
  R.actor(EL.capataz, asoma ? 118 : 110, 162, t, { dir: 1, sorpresa: !asoma, sonrisa: v > 0.8, habla: asoma && Math.sin(t * 6) > 0.4 });
  // gotas de luz en el agua que asoma
  for (let k = 0; k < 3; k++) R.pset(152 + k * 6 + Math.round(Math.sin(t * 4 + k) * 2), yw + 1, hex('#fff6c8'));
};

const efectos = [[m(0.204), 'burbujas'], [m(0.425), 'ola'], [m(0.55), 'burbujas'], [m(0.84), 'burbujas']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 1850 });
''')
