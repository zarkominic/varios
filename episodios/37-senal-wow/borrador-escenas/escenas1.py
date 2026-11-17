E = {}
E['wo-gancho'] = ('Gancho', '''// WO-GANCHO (frases 1–2), sin cartela; año 1977 salvo los planos de hoy (2026). Siete planos:
// 1. (0) la gran oreja de noche bajo la Vía Láctea; un voluntario sale de la caseta con su termo y bebe, de rutina; en
//    «caught» una estrella titila, tres ondas bajan al reflector curvo y rebotan al carro de las bocinas (piloto).
// 2. («caught a signal», 4,42) la boca de la impresora de noche: el papel sube y sale 6EQUJ5; en «seventy-two» salta
//    el 72 con su esfera que se llena; en «never heard it again» solo vuelven unos y espacios y el 72 se apaga.
// 3. («An astronomer», 9,36) el listado desde arriba bajo la lámpara: halo de «de pronto», el bolígrafo rojo rodea la
//    secuencia en «circled» y escribe el «Wow!»; el último trazo cae en «Wow!» (13,71) y el círculo late (wow_fin).
// 4. («Almost fifty years later», 15,26) hoy: la pantalla con la foto del listado; una mano teclea y el ordenador de
//    1977 imitado escribe su código; en «unexplained» salta un «?» sobre la curva.
// 5. («a telescope», 19,36) a ras del suelo de metal al atardecer: en «three football fields» salen tres campos en el
//    cielo, uno tras otro; en «volunteers» entran dos voluntarios (termo y linterna, que se enciende) y se paran.
// 6. («a line of six», 24,25) la escala sobre la mesa: un lápiz toca los seis caracteres, las barras crecen y la
//    calculadora cuenta; en «isn't a message» un sobre tachado.
// 7. («who reopened», 27,97) el laboratorio de Puerto Rico hoy: una científica entra con una caja de listados, Méndez
//    saca uno en «printouts» y los dos miran la pantalla en «look at that night».''', r'''
// los instantes, de las palabras de la voz inglesa: tw (frase «wow», 0,5–14,41 s) y tc (frase «camino», 15,26–32,77 s)
const tw = (s) => en('wow', (s - 0.5) / 13.907), tc = (s) => en('camino', (s - 15.263) / 17.51);
const P2 = tw(4.42), P3 = tw(9.36), P4 = tc(15.26), P5 = tc(19.36), P6 = tc(24.25), P7 = tc(27.97);
const K = hex('#17151d'), BL = hex('#f6f2ea'), ROJO = hex('#d8402c'), ease = (u) => u * u * (3 - 2 * u);
const destello = (x, y, r, c = BL) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } };
// un termo de los setenta (rojo de cuadros con el tapón blanco) en la mano
const termo = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 2, y - 9, x + 2, y + 1, K); R.rect(x - 1, y - 7, x + 1, y, hex('#c8382c')); R.pset(x - 1, y - 5, hex('#f0d8a0')); R.pset(x + 1, y - 3, hex('#f0d8a0')); R.pset(x, y - 6, hex('#8a2420')); R.rect(x - 1, y - 8, x + 1, y - 8, hex('#e8e8ec')); };
// ── 1 · la gran oreja de noche ───────────────────────────────────────────────────────────────────────────────────
const ESTRELLA = [196, 30], LABIO = [262, 70], CARRO = [206, 120], llega = tw(3.88);
const p1 = (t) => {
  const o = { encuadre: 'campo', luz: 'noche' };
  T.oreja(R, t, o);
  // el voluntario sale de la caseta con el termo, camina hacia el campo y bebe (rutina: no sabe nada)
  const w = tramo(t, tw(0.5), tw(2.6)), x = Math.round(lerp(28, 112, ease(w))), bebe = tramo(t, tw(2.9), tw(3.3)) - tramo(t, tw(3.9), tw(4.3));
  const a = R.actor(EL.voluntario1WO, x, 158, t, { dir: 1, anda: w > 0 && w < 1, sostiene: bebe > 0.5 ? [x + 11, 136] : [x + 13, 145] });
  if (a && a.mano) termo(a.mano[0], a.mano[1] + 2);
  // la linterna que lleva colgada alumbra el suelo delante
  if (w < 1) for (let k = 0; k < 18; k++) { const yy = 156 + (k % 3), xx = x + 16 + k; if ((xx + yy + Math.floor(t * 8)) % 3 === 0) R.pset(xx, yy, hex('#e8d890')); }
  // la llegada, sin nadie que la vea: una estrella titila, tres ondas bajan al labio del curvo y rebotan al carro
  const tit = tramo(t, tw(3.0), tw(3.4)) - tramo(t, tw(4.2), tw(4.4)); if (tit > 0) destello(ESTRELLA[0], ESTRELLA[1], Math.round(1 + tit * 3), Math.floor(t * 10) % 2 ? BL : hex('#bfe0ff'));
  for (let k = 0; k < 3; k++) {
    const u = tramo(t, tw(3.3) + k * 0.18, llega + k * 0.18), v = tramo(t, llega + k * 0.18, llega + 0.4 + k * 0.18);
    const arco = (cx, cy, a0, r, c) => { for (let a2 = -1; a2 <= 1; a2 += 0.08) for (const d of [0, 1]) R.pset(Math.round(cx + Math.cos(a2 + a0) * (r + d)), Math.round(cy + Math.sin(a2 + a0) * (r + d)), d ? hex('#4a7ab8') : c); };
    if (u > 0 && u < 1) arco(lerp(ESTRELLA[0], LABIO[0], u), lerp(ESTRELLA[1], LABIO[1], u), 1.2, 6 + k, hex('#bfe8ff'));
    if (v > 0 && v < 1) arco(lerp(LABIO[0], CARRO[0], v), lerp(LABIO[1], CARRO[1], v), 2.2, 5 + k, hex('#e8f8ff'));
  }
  const piloto = t > llega + 0.4 && Math.floor(t * 6) % 2; if (piloto) { R.disco(CARRO[0], CARRO[1], 2, hex('#ff5a3a')); R.pset(CARRO[0], CARRO[1] - 1, BL); }
  T.orejaDelante(R, t, o);
};
// ── 2 · la impresora de noche: sale 6EQUJ5 ─────────────────────────────────────────────────────────────────────
const SETENTA = tw(5.6), NUNCA = tw(7.3), APAGA = tw(8.4);
const p2 = (t) => {
  const o = { camara: 'impresora', luz: 'noche', seqT: tw(5.0), velocidad: 2 };
  const g = T.sala(R, t, o);
  // el 72 con su esfera de segundos que se llena (y se apaga en «never heard it again»)
  const e = tramo(t, SETENTA, SETENTA + 0.3), f = 1 - tramo(t, APAGA, APAGA + 0.5);
  if (e > 0 && f > 0) {
    const cx = 292, cy = 84, r = 16, lleno = tramo(t, SETENTA, APAGA - 0.1);
    R.disco(cx, cy, r + 2, K); R.disco(cx, cy, r + 1, hex('#e8e2d0')); R.disco(cx, cy, r - 1, hex('#fbf6e8'));
    for (let a = 0; a < lleno * 6.283; a += 0.04) for (let q = 3; q < r - 1; q++) if ((q + Math.round(a * 20)) % 2 === 0) R.pset(Math.round(cx + Math.sin(a) * q), Math.round(cy - Math.cos(a) * q), hex('#f0c060'));
    for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283; R.pset(Math.round(cx + Math.sin(a) * (r - 1)), Math.round(cy - Math.cos(a) * (r - 1)), K); }
    R.linea(cx, cy, Math.round(cx + Math.sin(lleno * 6.283) * (r - 3)), Math.round(cy - Math.cos(lleno * 6.283) * (r - 3)), ROJO);
    R.rect(cx - 2, cy - r - 5, cx + 2, cy - r - 2, K); R.rect(cx - 1, cy - r - 4, cx + 1, cy - r - 3, hex('#c8c8cc'));
    if (f > 0.5 || Math.floor(t * 10) % 2) R.numero('72', cx, Math.round(lerp(cy + 40, cy + 34, ease(e))), { tam: 16, centro: true });
  }
  // «never heard it again»: el piloto rojo de la botonera parpadea en vano
  if (t > NUNCA && Math.floor(t * 3) % 2) { R.disco(252, 165, 3, hex('#ff3a2a')); R.pset(251, 164, BL); }
  T.salaDelante(R, t, o);
};
// ── 3 · el círculo rojo y el «Wow!» (el plano del golpe) ─────────────────────────────────────────────────────────
const RODEA = tw(9.96), ESCRIBE = tw(11.66), WOW = tw(13.71), WOWFIN = en('wow', 1);
const p3 = (t) => {
  const g = T.listado(R, t, { encuadre: 'mesa', camara: 'listado', luz: 'noche', boli: 3, resalta: tramo(t, P3 + 0.05, P3 + 0.5),
    rodea: ease(tramo(t, RODEA - 0.05, RODEA + 1.25)), wow: tramo(t, ESCRIBE, WOW) });
  // el golpe: el círculo y el «Wow!» laten con un aro de luz que se abre (de «Wow!» a wow_fin y un poco más)
  const p = tramo(t, WOW - 0.05, WOWFIN + 0.5);
  if (p > 0 && p < 1 && g.anillo) {
    const [cx, cy, rx, ry] = g.anillo;
    for (let k = 0; k < 2; k++) { const q = Math.min(1, p * 1.4 - k * 0.25); if (q <= 0) continue; const s = 1 + q * 0.7;
      for (let a = 0; a < 6.283; a += 0.03) if ((Math.round(a * 30) + k) % 3 !== 0) { const X = Math.round(cx + Math.cos(a) * (rx + 3) * s), Y = Math.round(cy + Math.sin(a) * (ry + 3) * Math.min(s, 1.25)); R.pset(X, Y, q < 0.6 ? hex('#ff5a3a') : hex('#f09a80')); if (q < 0.5) R.pset(X + 1, Y, hex('#ffd0b0')); } }
    if (g.wow && p < 0.5) for (let k = 0; k < 6; k++) { const a = k * 1.047 + p * 2, q = 6 + p * 22; R.pset(Math.round(g.wow[0] + Math.cos(a) * q), Math.round(g.wow[1] - 8 + Math.sin(a) * q * 0.6), hex('#ffd890')); }
  }
};
// ── 4 · hoy: la pantalla con el listado y el ordenador de 1977 imitado ──────────────────────────────────────────
const SIN = tc(16.86), RATON = tc(16.8), CLIC = tc(18.0);
const p4 = (t) => {
  const o = { encuadre: 'pantalla', codigo: tramo(t, P4 + 0.3, P4 + 3.6), alto: 0 };
  T.archivo(R, t, o);
  // la mano teclea (de 15,4 a 16,7) y luego va al ratón y hace clic
  const tec = t < RATON, va = ease(tramo(t, RATON, RATON + 0.7));
  let mx = lerp(150 + (Math.floor(t * 7) % 3) * 6, 214, va), my = lerp(166 - (tec && Math.floor(t * 11) % 2 ? 2 : 0), 170, va);
  if (t > CLIC && t < CLIC + 0.2) my += 1;
  T.brazo(R, Math.round(mx) + 40, 206, Math.round(mx), Math.round(my), '#3a5a8a', -1, { codo: [Math.round(mx) + 26, 190] });
  // «unexplained»: un «?» grande sobre la curva, que late
  const q = tramo(t, SIN, SIN + 0.25); if (q > 0) { const y = Math.round(lerp(96, 66, ease(q))) + Math.round(Math.sin(t * 5) * 1.5);
    R.disco(153, y + 6, 13, K); R.disco(153, y + 6, 12, BL); R.poligono([[146, y + 16], [152, y + 17], [143, y + 23]], K); R.poligono([[147, y + 16], [151, y + 17], [145, y + 21]], BL); R.icono('?', 147, y, hex('#3a6ac8'), null, 2); }
  T.archivoDelante(R, t, o);
};
// ── 5 · a ras del suelo de metal al atardecer: tres campos de fútbol y los voluntarios ───────────────────────────
const CAMPOS = [tc(20.62), tc(20.9), tc(21.24)], VOLUNTARIOS = tc(22.16), GRATIS = tc(23.6);
const campo = (x, y, e) => {   // un campo de fútbol visto desde arriba: hierba a franjas, rayas blancas, círculo y áreas
  const w = 32, hh = 16, s = e; if (s <= 0) return; const cx = x + w / 2, cy = y + hh / 2, W = Math.round(w * s / 2), H = Math.round(hh * s / 2);
  R.rect(cx - W - 1, cy - H - 1 + 1, cx + W + 1, cy + H + 2, hex('#3a2a4a'));
  for (let i = -W; i <= W; i++) for (let j = -H; j <= H; j++) R.pset(cx + i, cy + j, ((i + 40) >> 2) % 2 ? hex('#4a9a3a') : hex('#5aae44'));
  for (let i = -W; i <= W; i++) { R.pset(cx + i, cy - H, BL); R.pset(cx + i, cy + H, BL); } for (let j = -H; j <= H; j++) { R.pset(cx - W, cy + j, BL); R.pset(cx + W, cy + j, BL); R.pset(cx, cy + j, BL); }
  if (s > 0.8) { for (let a = 0; a < 6.283; a += 0.3) R.pset(Math.round(cx + Math.cos(a) * 3), Math.round(cy + Math.sin(a) * 3), BL); for (const d of [-1, 1]) { R.rect(cx + d * W - (d > 0 ? 4 : 0), cy - 4, cx + d * W + (d < 0 ? 4 : 0), cy - 4, BL); R.rect(cx + d * W - (d > 0 ? 4 : 0), cy + 4, cx + d * W + (d < 0 ? 4 : 0), cy + 4, BL); R.rect(cx + d * (W - 4), cy - 4, cx + d * (W - 4), cy + 4, BL); } }
};
const p5 = (t) => {
  const o = { encuadre: 'campo', camara: 'muros', luz: 'tarde' };
  T.oreja(R, t, o);
  // los tres campos aparecen en el cielo uno tras otro y se van al empezar «volunteers»
  const fuera = tramo(t, VOLUNTARIOS - 0.3, VOLUNTARIOS + 0.3);
  CAMPOS.forEach((c, k) => { const e = ease(tramo(t, c - 0.1, c + 0.18)) * (1 - fuera); campo(150 + k * 38, 22, Math.min(1, e * 1.15)); });
  // en el suelo: la caja de herramientas y la nevera portátil de la noche que viene
  R.rect(96, 150, 114, 160, K); R.rect(97, 151, 113, 159, hex('#c83a2a')); R.rect(97, 151, 113, 152, hex('#e86a4a')); R.rect(102, 148, 108, 150, K); R.rect(97, 155, 113, 155, hex('#8a2418'));
  for (let i = 0; i < 20; i++) R.pset(98 + i, 161, hex('#5a4050'));
  for (let k = 0; k < 3; k++) for (let a = 0; a < 6.283; a += 0.08) R.pset(Math.round(74 + Math.cos(a) * (9 - k * 2)), Math.round(170 + Math.sin(a) * (4 - k)), k === 1 ? hex('#1c1c24') : hex('#3a3a4a'));
  for (let i = 0; i < 40; i++) R.pset(83 + i, Math.round(170 - i * 0.35 + Math.sin(i * 0.4) * 1.5), hex('#2a2a36'));
  // los voluntarios llegan por la derecha (termo y linterna), se paran; ella enciende la linterna; él sonríe en «free»
  const w1 = tramo(t, VOLUNTARIOS - 0.1, VOLUNTARIOS + 1.3), w2 = tramo(t, VOLUNTARIOS + 0.2, VOLUNTARIOS + 1.5);
  const x1 = Math.round(lerp(330, 190, ease(w1))), x2 = Math.round(lerp(346, 218, ease(w2)));
  for (const [xx, w] of [[x1, w1], [x2, w2]]) if (w > 0) for (let i = 0; i < 22; i++) R.pset(xx + 2 - i, 160 + (i >> 3), hex('#7a4a5a'));   // sombras largas
  const enciende = VOLUNTARIOS + 0.74, haz = t > enciende;
  if (haz) for (let y = 150; y < 179; y++) { const w = (y - 150) * 0.9; for (let xx = Math.round(x2 - 6 - (y - 150) * 1.6 - w); xx <= Math.round(x2 - 6 - (y - 150) * 1.6 + w); xx++) if ((xx + y) % 2 === 0) R.pset(xx, y, hex('#f8e8a0')); }
  const a1 = R.actor(EL.voluntario1WO, x1, 160, t, { dir: -1, anda: w1 > 0 && w1 < 1, sonrisa: t > GRATIS, sostiene: t > GRATIS ? [x1 - 2, 136] : [x1 - 1, 146] });
  if (a1 && a1.mano && w1 > 0) termo(a1.mano[0], a1.mano[1] + 2);
  const a2 = R.actor(EL.voluntaria2WO, x2, 160, t, { dir: -1, anda: w2 > 0 && w2 < 1, sonrisa: t > GRATIS + 0.2, sostiene: [x2 - 3, 148] });
  if (a2 && a2.mano && w2 > 0) { const [hx, hy] = a2.mano; R.rect(hx - 6, hy - 1, hx, hy + 1, K); R.rect(hx - 5, hy, hx - 1, hy, hex('#9aa0a8')); R.rect(hx - 7, hy - 2, hx - 6, hy + 2, K); if (haz) { R.pset(hx - 7, hy, hex('#fff8c0')); destello(hx - 8, hy, t < enciende + 0.25 ? 3 : 1, hex('#fff8c0')); } }
  T.orejaDelante(R, t, o);
};
// ── 6 · la escala: seis letras y números ────────────────────────────────────────────────────────────────────────
const SEIS = tc(24.9), NUMEROS = tc(25.72), MENSAJE = tc(26.3);
const p6 = (t) => {
  const g = T.listado(R, t, { encuadre: 'escala', u: tramo(t, P6 + 0.4, MENSAJE + 0.9) });
  const cols = g.cols || [73, 103, 133, 163, 193, 223];
  // el lápiz toca cada carácter de izquierda a derecha y se va
  const toca = tramo(t, SEIS - 0.3, NUMEROS + 0.25), entra = ease(tramo(t, P6, SEIS - 0.3)), sale = ease(tramo(t, NUMEROS + 0.35, MENSAJE + 0.3));
  if (sale < 1) {
    const k = Math.min(5, Math.floor(toca * 6)), fr = toca * 6 - k, golpe = toca > 0 && toca < 1 ? Math.abs(Math.sin(fr * Math.PI)) * 3 : 0;
    const hx = Math.round(lerp(330, cols[k] + 11, entra) + sale * 120), hy = Math.round(154 + golpe + (1 - entra) * 20 + sale * 30);
    // el lápiz (amarillo, con su punta) va en la mano, apuntando arriba a la izquierda
    R.linea(hx - 4, hy - 2, hx - 12, hy - 10, K); R.linea(hx - 3, hy - 2, hx - 11, hy - 10, hex('#e8b830')); R.linea(hx - 4, hy - 1, hx - 12, hy - 9, hex('#c89020')); R.pset(hx - 13, hy - 11, hex('#3a3a46')); R.pset(hx - 12, hy - 11, hex('#e8c8a0'));
    T.brazo(R, hx + 46, 214, hx, hy, '#7a4a3a', -1, { codo: [hx + 30, 196] });
  }
  // «isn't a message»: un sobre que se tacha
  const s = tramo(t, MENSAJE, MENSAJE + 0.2); if (s > 0) { const x = 238, y = 42 - Math.round((1 - ease(s)) * 6); R.rect(x - 2, y - 2, x + 22, y + 16, K); R.icono('sobre', x, y, hex('#f4efe0'), hex('#8a7a5a'), 3);
    const x2 = tramo(t, MENSAJE + 0.3, MENSAJE + 0.6); if (x2 > 0) for (let i = 0; i <= Math.round(24 * x2); i++) for (const d of [0, 1]) { R.pset(x - 2 + i + d, y - 3 + i * 0.8, ROJO); R.pset(x + 22 - i + d, y - 3 + i * 0.8, ROJO); } }
};
// ── 7 · el laboratorio de Puerto Rico: los papeles otra vez ──────────────────────────────────────────────────────
const IMPRESOS = tc(29.54), NOCHE = tc(31.5), OTRAVEZ = tc(32.22);
const cajaListados = (x, y) => { R.rect(x - 1, y - 12, x + 19, y, K); R.rect(x, y - 11, x + 18, y - 1, hex('#b8864a')); R.rect(x, y - 11, x + 18, y - 10, hex('#d8a868')); R.rect(x, y - 3, x + 18, y - 1, hex('#94683a'));
  for (let k = 0; k < 3; k++) { R.rect(x + 1, y - 15 + k * 1, x + 17, y - 15 + k * 1, k % 2 ? hex('#bfe0b8') : hex('#f4efe0')); } R.rect(x + 1, y - 16, x + 17, y - 16, K); R.rect(x + 7, y - 7, x + 11, y - 5, hex('#f4efe0')); R.pset(x + 9, y - 6, K); };
const p7 = (t) => {
  const o = { encuadre: 'fotos', camara: 'laboratorio' };
  const g = T.archivo(R, t, o);
  // en la pared tranquila entre la ventana y el tablón, una foto enmarcada de la gran oreja (sin letras)
  R.rect(192, 36, 232, 64, hex('#5a3a22')); R.rect(194, 38, 230, 62, hex('#2a3048')); for (let i = 0; i < 36; i++) for (let j = 0; j < 9; j++) if ((i * 7 + j * 13) % 23 === 0) R.pset(194 + i, 38 + j, hex('#e8e8f8'));
  R.poligono([[197, 58], [208, 46], [210, 58]], hex('#8a96b0')); R.poligono([[214, 58], [226, 50], [228, 58]], hex('#7a86a0')); R.rect(196, 58, 228, 61, hex('#3a4a2a')); R.rect(211, 56, 214, 58, hex('#c8c0a0'));
  R.rect(211, 33, 213, 35, K);
  // la científica entra con la caja de listados, la deja; Méndez se vuelve, saca un listado y los dos miran la pantalla
  const w = tramo(t, P7, P7 + 1.4), x = Math.round(lerp(-18, 112, ease(w))), deja = t > P7 + 1.55;
  const mira = t > NOCHE - 0.2;
  const a = R.actor(EL.cientifica, x, 156, t, { dir: mira || w < 1 ? 1 : 1, anda: w > 0 && w < 1, sostiene: deja ? false : [x + 18, 140], habla: t > P7 + 1.7 && t < IMPRESOS && Math.sin(t * 9) > 0, sonrisa: t > NOCHE + 0.8 });
  if (!deja && a && a.mano) cajaListados(a.mano[0] - 10, a.mano[1] + 8);
  const saca = tramo(t, IMPRESOS - 0.2, IMPRESOS + 0.4), mx = Math.round(lerp(170, 146, ease(tramo(t, P7 + 1.4, P7 + 2.0))) + lerp(0, 24, ease(tramo(t, NOCHE - 0.3, NOCHE + 0.4))));
  const vuelto = t > P7 + 1.2 && t < NOCHE - 0.2;
  const m = R.actor(EL.mendezWO, mx, 156, t, { dir: vuelto ? -1 : 1, sorpresa: t > IMPRESOS + 0.4 && t < IMPRESOS + 1.1, sostiene: saca > 0 ? (vuelto ? [mx - 2, lerp(150, 132, saca)] : [mx + 16, 136 - Math.round(2 * tramo(t, OTRAVEZ, OTRAVEZ + 0.5))]) : false, habla: t > OTRAVEZ && t < OTRAVEZ + 1.4 && Math.sin(t * 8) > 0 });
  if (saca > 0 && m && m.mano) { const [hx, hy] = m.mano; R.rect(hx - 7, hy - 11, hx + 7, hy + 1, K); R.rect(hx - 6, hy - 10, hx + 6, hy, hex('#f4efe0')); for (const yy of [hy - 9, hy - 8, hy - 4, hy - 3]) R.rect(hx - 6, yy, hx + 6, yy, hex('#bfe0b8')); for (let k = 0; k < 6; k++) R.pset(hx - 6, hy - 10 + k * 2, hex('#a8a090')); for (let a = 0; a < 6.283; a += 0.35) R.pset(Math.round(hx + Math.cos(a) * 2), Math.round(hy - 5 + Math.sin(a) * 4), ROJO); }
  // «that night»: la pantalla grande se aviva con un marco de luz
  if (t > NOCHE && t < NOCHE + 1.2 && Math.floor(t * 8) % 2) { const [x0, y0, x1, y1] = [200, 86, 262, 121]; R.rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, hex('#9af0b0')); R.rect(x0 - 2, y1 + 2, x1 + 2, y1 + 2, hex('#9af0b0')); R.rect(x0 - 2, y0 - 2, x0 - 2, y1 + 2, hex('#9af0b0')); R.rect(x1 + 2, y0 - 2, x1 + 2, y1 + 2, hex('#9af0b0')); }
  if (deja) cajaListados(130, 157);
  T.archivoDelante(R, t, o);
};
const año = (t) => (t >= P4 && t < P5) || t >= P7 ? 2026 : 1977;
const efectos = [[llega + 0.04, 'brillo'], [P2 + 0.2, 'maquina'], [SETENTA, 'pop'], [RODEA, 'lapiz'], [ESCRIBE + 0.05, 'lapiz'], [P4 + 0.3, 'tecleo'], [SIN, 'pop'],
  [CAMPOS[0], 'pop'], [VOLUNTARIOS + 0.74, 'interruptor'], [SEIS, 'tic'], [MENSAJE + 0.3, 'lapiz'], [P7 + 1.55, 'papel'], [NOCHE, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')
E['wo-hola'] = ('Hola', '''// WO-HOLA (frase 3), hoy (2026). Un plano: el estudio de Atom con su «gran oreja» casera (un embudo y un vaso pegados
// al techo). Atom baja de su esquina en «I'm Atom» y saluda con la mano; se arrima al vaso para escuchar; en «and I
// explain» el vecino de arriba pasa la aspiradora: el embudo tiembla, cae polvo de yeso y Atom tirita; en «wondered» le
// sale un «?»; en «Let's find out» se sacude el polvo y vuelve a su esquina.''', r'''
const K = hex('#17151d'), BL = hex('#f6f2ea'), AZ = hex('#3a6ac8'), ease = (u) => u * u * (3 - 2 * u);
const atomAbajo = (ax, ay, t, o = {}) => {
  const r = o.r ?? 12, rr = r + 7; ax = Math.round(ax); ay = Math.round(ay);
  for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { const g = 1 - Math.hypot(i, j) / rr; if (g > 0.3 && ((i + j) & 1 || g > 0.6)) R.pset(ax + i, ay + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(ax, ay, t, { r, orbita: R.PAL.ATOM[7], energia: o.e ?? 0.4, vel: 1 });
};
const globo = (x, y, ic, c) => { R.disco(x, y, 7, K); R.disco(x, y, 6, BL); R.pset(x - 5, y + 7, K); R.pset(x - 4, y + 6, BL); R.icono(ic, x - (ic === '?' ? 2 : 1), y - 4, c, null, 1); };
R.companero = () => {};   // Atom baja al plano y al final vuelve a su esquina
const th = (s) => en('hola', (s - 0.5) / 4.076);   // el instante de la palabra que dice la voz inglesa en s
const BAJA = th(0.5), LLEGA = th(1.2), RUIDO = th(1.5), DUDA = th(2.88), VUELVE = th(3.89);
const p1 = (t) => {
  const o = { encuadre: 'estudio', ruido: t > RUIDO ? 1 : 0 };
  const g = T.hoy(R, t, o);
  const [vx, vy] = g.vaso || [246, 51], esq = [297, 24];
  const AX = vx, AY = vy + 12;
  const b = ease(tramo(t, BAJA, LLEGA)), v = ease(tramo(t, VUELVE + 0.3, E.duracion - 0.25));
  let ax = lerp(esq[0], AX, b), ay = lerp(esq[1], AY, b) + Math.sin(b * Math.PI) * 14;
  if (v > 0) { ax = lerp(AX, esq[0], v); ay = lerp(AY, esq[1], v) + Math.sin(v * Math.PI) * 12; }
  const tirita = t > RUIDO && t < VUELVE + 0.3; if (tirita) { ax += (Math.floor(t * 24) % 2) * 2 - 1; ay += Math.floor(t * 17) % 2; }
  if (!tirita && (b >= 1 || b === 0) && v === 0) ay += Math.round(1.4 * Math.sin(2 * Math.PI * t / 2.6));
  // la mano: saluda en «I'm Atom»; luego hace de pantalla junto al vaso; en «Let's find out» sacude el polvo
  const saluda = t > BAJA + 0.2 && t < RUIDO, sacude = t > VUELVE && t < VUELVE + 0.4;
  let hx = ax + 16, hy = ay - 2;
  if (saluda) { hx = ax + 17 + Math.round(Math.sin(t * 16) * 3); hy = ay - 8; }
  else if (t >= RUIDO && t < VUELVE) { hx = ax + 13; hy = ay - 13; }
  else if (sacude) { hx = ax + 15 + Math.round(Math.sin(t * 30) * 3); hy = ay + 2; }
  if (t > BAJA + 0.1 && v < 0.6) T.mano(R, Math.round(hx), Math.round(hy), -1, '#5a8ad0', { sinManga: true });
  atomAbajo(ax, ay, t, { r: Math.round(lerp(10, 12, b) - 2 * v), e: tirita ? 0.95 : 0.45 });
  // el polvo de yeso que le cae encima
  if (tirita) for (let k = 0; k < 7; k++) { const u = (t * 0.9 + k * 0.143) % 1, px = Math.round(ax - 9 + ((k * 37) % 18) + Math.sin(t * 3 + k) * 2), py = Math.round(vy + 4 + u * 30); if (py < ay - 8 || py > ay + 10) { R.pset(px, py, hex('#a89a86')); R.pset(px + 1, py, hex('#fffaf0')); } }
  for (const [tt, xx, yy] of [[BAJA, 297, 40], [E.duracion - 0.3, esq[0], esq[1] + 14]]) { const d = (t - tt) / 0.35; if (d > 0 && d < 1) for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4, q = 4 + d * 10; R.pset(Math.round(xx + Math.cos(an) * q), Math.round(yy + Math.sin(an) * q), BL); } }
  if (t > DUDA && t < VUELVE + 0.2) globo(Math.round(ax) - 22, Math.round(ay) - 22, '?', AZ);
  T.hoyDelante(R, t, o);
};
const efectos = [[BAJA, 'pop'], [RUIDO, 'zumbido'], [DUDA, 'pop'], [VUELVE + 0.3, 'whoosh']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')
