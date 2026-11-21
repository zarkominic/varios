# Borrador de las escenas del ep35 (Jumanji), grupo 1: jm-gancho y jm-hola. Formato del 11: E[id] = (título, cabecera, cuerpo).
COMUN = r'''
const K = hex('#17151d'), BL = hex('#f6f2ea'), ROJO = hex('#d8402c'), ROJOS = hex('#8e2418'), PZ = T.PIEZAS_JM;
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const ease = (u) => u * u * (3 - 2 * u);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
// un destello de cuatro puntas
const destello = (x, y, r, c = BL) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } if (r > 1) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); R.pset(x + 1, y + 1, c); } };
// Atom cuando baja de su esquina: el resplandor tramado y el átomo
const atomAbajo = (ax, ay, t, o = {}) => {
  const r = o.r ?? 12, rr = r + 7; ax = Math.round(ax); ay = Math.round(ay);
  for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { const g = 1 - Math.hypot(i, j) / rr; if (g > 0.3 && ((i + j) & 1 || g > 0.6)) R.pset(ax + i, ay + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(ax, ay, t, { r, orbita: R.PAL.ATOM[7], energia: o.e ?? 0.4, vel: o.vel ?? 1 });
};
const chispas = (x, y, t, r, n, c) => { for (let k = 0; k < n; k++) { const an = k * Math.PI * 2 / n + t * 4, q = r + Math.sin(t * 9 + k) * 2; R.pset(Math.round(x + Math.cos(an) * q), Math.round(y + Math.sin(an) * q), c); } };
// el vaho de cerca (visto desde arriba): bocanadas tramadas que suben desde el borde de abajo y se deshacen
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const vahoGrande = (x, y, t, f = 1) => { for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1, px = x + Math.sin(u * 5 + k * 2) * 6 + (k - 1) * 9, py = y - u * 44, r = 4 + u * 9;
  for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) { const dd = Math.hypot(i, j * 1.2) / r, X = Math.round(px) + i, Y = Math.round(py) + j; if (dd < 1 && Math.min(1, u * 6) * (1 - u) * f * (1 - dd * 0.6) * 1.5 > B4[(X & 3) + (Y & 3) * 4] / 16 + 0.04) R.pset(X, Y, dd < 0.45 ? hex('#eef4fc') : hex('#b8c8e0')); } } };
// la mano que dibuja: la mano canónica sola (sin manga: el papel queda lejos del borde y un brazo pasaría de 45 px),
// con su sombra tramada sobre el papel, y el lápiz con la punta en (px, py)
const manoLapiz = (px, py, manga, o = {}) => {
  px = Math.round(px); py = Math.round(py);
  for (let j = 0; j < 9; j++) for (let i = 0; i < 16; i++) if (((i + j) & 1) && Math.hypot((i - 8) / 8, (j - 4) / 4.5) < 1) R.pset(px + 4 + i, py + 2 + j, hex('#8a8474'));
  T.g_lapizGrande(R, px + 23, py - 24, px, py, { negro: !!o.negro });
  T.mano(R, px + 12, py - 4, -1, manga, { sinManga: true });
};
'''

E = {}
E['jm-gancho'] = ('Gancho', '''// JM-GANCHO (frases 1–2), sin cartela. Siete planos:
// 1. la libreta de los intentos, de noche: la mano escribe garabatos y los tacha; en «anything» cae encima una nota con
//    un «?»; la mano le da dos golpecitos con el lápiz (la J no sale: es de jm-pregunta);
// 2. («for a thirty-two-page…») pasa la página: la lámina a lápiz del salón; el «32» en la esquina; en «book» el
//    rinoceronte se dibuja en la alfombra y resopla;
// 3. («Out of that book…») el contador de latón sube hasta 2027 (millones) y se clava en «billion»; llueven monedas;
// 4. («Along the way…») la mesa del artista desde arriba, de noche: la mano dibuja el salón bajo el flexo; vaho; en
//    «cold» tirita;
// 5. («a white dog…») la esquina de una lámina: el perro blanco asoma las orejas y en «sneaks» se cuela tras el seto;
// 6. («a New Hampshire town…») la esquina de la casa con el zapato pintado: el pintor llega con la esponja y los vecinos
//    se plantan delante en «refused»;
// 7. («and a lion…») la sala de pantallas: el león de alambre en la pantalla grande; en «hair by hair» le sale melena.''', COMUN + r'''
const w = (s) => s;   // los instantes van en segundos de la escena (medidos en linea.json) y se anclan a las marcas
const a = (s) => en('palabra', (s - 0.5) / 14.701), b = (s) => en('camino', (s - 16.756) / 13.597);
const P2 = a(5.84), P3 = a(10.02), P4 = b(15.7), P5 = b(20.88), P6 = b(24.4), P7 = b(27.92);
const NADA = a(1.56), ESCULTOR = a(5.04), N32 = a(6.36), LIBRO = a(7.2), BN = a(8.68), BILLON = a(13.04);
const NOCHE = b(18.9), FRIO = b(20.32), PERRO = b(21.54), CUELA = b(22.48), REHUSA = b(25.8), BORRAR = b(26.5), LEON = b(27.92), PELO = b(29.54);
const MANGA = '#6a5a3a';
let JD = null;
// 1 · la libreta: garabatos tachados y la nota con el «?»
const p1 = (t) => {
  if (JD == null) JD = ((T.taller(R, 0, { encuadre: 'palabras', intentos: 0 }) || {}).jDesde ?? 0.8) - 0.03;
  const u = lerp(Math.min(0.42, JD - 0.2), JD, tramo(t, 0.1, a(4.4)));
  const g = T.taller(R, t, { encuadre: 'palabras', intentos: u }) || {};
  // la nota con el «?»: cae en «anything», rebota y se queda, un poco torcida
  const cae = tramo(t, NADA - 0.3, NADA), nx = 110, ny = Math.round(lerp(-30, 146, cae * cae) - (t > NADA && t < NADA + 0.3 ? Math.abs(Math.sin((t - NADA) * 21)) * 5 * (1 - (t - NADA) / 0.3) : 0));
  if (cae > 0) {
    for (let j = 0; j <= 38; j++) for (let i = 0; i <= 40; i++) if ((i + j) & 1) R.pset(nx - 17 + i, 146 - 15 + j, hex('#6a6048'));
    for (let j = -19; j <= 19; j++) { const s = Math.round(j * 0.08); R.rect(nx - 21 + s, ny + j, nx + 21 + s, ny + j, K); }
    for (let j = -18; j <= 18; j++) { const s = Math.round(j * 0.08); R.rect(nx - 20 + s, ny + j, nx + 20 + s, ny + j, j < -12 ? hex('#f0d060') : hex('#ffe680')); R.pset(nx + 20 + s, ny + j, hex('#d8b848')); }
    R.rect(nx - 18, ny + 17, nx + 20, ny + 18, hex('#d8b848'));
    R.icono('?', nx - 9, ny - 13, ROJOS, null, 4); R.icono('?', nx - 10, ny - 14, ROJO, null, 4);
    if (t > NADA && t < NADA + 0.5) for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4, r = 24 + (t - NADA) * 30; R.pset(Math.round(nx + Math.cos(an) * r), Math.round(ny + Math.sin(an) * r * 0.8), BL); }
  }
  // la mano: escribe y tacha; en «sculptor» baja a la nota y le da dos golpecitos
  const [px, py] = g.punta || [140, 90], baja = ease(tramo(t, a(4.4), ESCULTOR)), toque = t > ESCULTOR ? Math.round(Math.abs(Math.sin((t - ESCULTOR) * Math.PI * 2.6)) * 4 * (t < ESCULTOR + 0.78 ? 1 : 0)) : 0;
  manoLapiz(lerp(px, 136, baja), lerp(py, 152, baja) - toque - (baja > 0 && baja < 1 ? Math.sin(baja * Math.PI) * 8 : 0), MANGA);
};
// 2 · la lámina del libro, a lápiz: el salón y el rinoceronte
const p2 = (t) => {
  const o = { encuadre: 'salon', rino: ease(tramo(t, P2 + 0.5, LIBRO + 0.7)) };
  T.casaJuego(R, t, o); T.casaJuegoDelante(R, t, o);
  // el resoplido del rinoceronte, en grises
  if (t > BN) for (let k = 0; k < 2; k++) { const f = ((t - BN) * 1.3 + k * 0.5) % 1, x = 157 + f * 13, y = 143 + f * 3, r = 2 + f * 4; for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j); if (d < r && hh(i, j, k) > f * 0.7) R.pset(Math.round(x + i), Math.round(y + j), d > r - 1.1 ? hex('#4a4a52') : (i + j) & 1 ? hex('#f6f5ee') : hex('#d2d0c6')); } }
  // el número de página
  if (t > N32) { const e = tramo(t, N32, N32 + 0.25); const y0 = Math.round(lerp(180, 162, e)); R.rect(140, y0, 180, 179, K); R.rect(141, y0 + 1, 179, 179, hex('#34343c')); R.rect(141, y0 + 1, 179, y0 + 1, hex('#5a5a64')); for (let x = 144; x < 178; x += 2) R.pset(x, y0 + 3, hex('#5a5a64')); R.numero('32', 160, y0 + 15, { tam: 8, centro: true }); }
};
// 3 · el contador de taquilla
const p3 = (t) => {
  const u = tramo(t, P3 + 0.3, BILLON + 0.3), e = 1 - (1 - u) ** 2.2, fin = BILLON + 0.3;
  const g = T.cine(R, t, { encuadre: 'contador', cifra: u >= 1 ? 2027 : 2027 * e, gira: u > 0 && u < 0.86 ? 1 : u < 1 ? (1 - u) / 0.14 : 0, signo: true, lluvia: u <= 0 ? 0 : u < 1 ? 0.4 + u * 0.6 : Math.max(0.45, 1 - (t - fin) * 0.25) }) || {};
  if (t >= fin) { const s = t - fin; for (let k = 0; k < 6; k++) { const f = (s * 1.4 + k * 0.37) % 1, x = 82 + hh(k, Math.floor(s * 1.4 + k * 0.37)) * 164, y = 56 + hh(k, 7 + Math.floor(s * 1.4 + k * 0.37)) * 60; if (f < 0.5) destello(x, y, f < 0.25 ? 3 : 2, k & 1 ? hex('#fff4b8') : BL); }
    if (s < 0.35) { const r = 20 + s * 260; for (let k = 0; k < 40; k++) { const an = k * Math.PI / 20; R.pset(Math.round(158 + Math.cos(an) * r), Math.round(87 + Math.sin(an) * r * 0.5), hex('#fff4b8')); } } }
};
// 4 · la mesa del artista, de noche
const p4 = (t) => {
  const u = lerp(0.3, 0.92, tramo(t, P4, P5 - 0.2)), g = T.taller(R, t, { encuadre: 'casa', camara: 'mesa', dibujo: u }) || {};
  const [px, py] = g.punta || [160, 90], fr = t > FRIO ? Math.round(Math.sin(t * 38)) : 0;
  manoLapiz(px + fr, py, MANGA, { negro: true });
  // el vaho del que dibuja (está debajo del cuadro): sube desde el borde de abajo
  vahoGrande(106, 182, t, t > FRIO ? 1 : 0.75);
};
// 5 · el perro blanco se cuela en la esquina del dibujo
const p5 = (t) => {
  const as = t < CUELA ? 0.62 * ease(tramo(t, PERRO - 0.2, PERRO + 0.15)) - 0.24 * ease(tramo(t, CUELA - 0.4, CUELA - 0.1)) : lerp(0.38, 1, ease(tramo(t, CUELA, CUELA + 0.55))) - 0.06 * Math.max(0, Math.sin((t - CUELA - 0.55) * 7)) * (t > CUELA + 0.55 ? 1 : 0);
  const o = { encuadre: 'esquinas', camara: 'esquina', asoma: Math.max(0, as) };
  T.editorial(R, t, o);
  // en el margen de la lámina, el lápiz negro del dibujante y unas migas de goma
  T.g_lapizGrande(R, 300, 62, 268, 122, { negro: true }); for (let k = 0; k < 9; k++) R.pset(262 + Math.round(hh(k, 5) * 40), 128 + Math.round(hh(k, 6) * 12), k % 3 ? hex('#bab8b0') : hex('#8a887e'));
  T.editorialDelante(R, t, o);
  // las hojas del seto, que tiemblan y caen cuando pasa
  for (let k = 0; k < 7; k++) { const t0 = (k < 3 ? PERRO - 0.1 : CUELA) + k * 0.07, f = (t - t0) / 0.9; if (f > 0 && f < 1) { const x = 152 + hh(k, 1) * 14 - f * 6 + Math.sin(f * 9 + k) * 2, y = 70 + hh(k, 2) * 50 + f * f * 26; R.rect(Math.round(x), Math.round(y), Math.round(x) + 2, Math.round(y) + 1, K); R.pset(Math.round(x) + 1, Math.round(y), hex('#c6c4ba')); } }
};
// 6 · el pueblo que no quiso borrar el letrero
const p6 = (t) => {
  const o = { encuadre: 'calle', camara: 'esquina', letrero: 1, epoca: 1994 };
  T.keene(R, t, o);
  const llega = tramo(t, P6, REHUSA + 0.15), px = Math.round(lerp(300, 196, llega)), para = t >= REHUSA, no = t >= BORRAR;
  const planta = ease(tramo(t, P6 + 0.2, REHUSA - 0.1));
  R.actor(EL.vecina3JM, Math.round(lerp(84, 112, planta)), 156, t, { dir: 1, anda: planta > 0 && planta < 1, enfado: para, brazos: para && Math.sin(t * 9) > -0.3 });
  R.actor(EL.vecino1JM, Math.round(lerp(236, 164, planta)), 158, t, { dir: planta < 1 ? -1 : 1, anda: planta > 0 && planta < 1, enfado: para, dedo: para, habla: para && Math.sin(t * 11) > 0 });
  R.actor(EL.vecina2JM, Math.round(lerp(120, 138, planta)), 160, t, { dir: 1, anda: planta > 0 && planta < 1, enfado: para, brazos: no });
  const pin = R.actor(EL.pintorJM, px, 157, t, { dir: -1, anda: llega < 1, sorpresa: para && !no, triste: no, sostiene: no ? [px - 6, 150] : [px - 9, 140] });
  if (pin && pin.mano) PZ.esponja(R, pin.mano[0], pin.mano[1] + 3, {});
  if (para && t < REHUSA + 1) { const gx = px + 4, gy = 116 - Math.round(tramo(t, REHUSA, REHUSA + 0.15) * 4); R.disco(gx, gy, 9, K); R.disco(gx, gy, 8, BL); R.disco(gx - 6, gy + 10, 2, K); R.disco(gx - 6, gy + 10, 1, BL); R.icono('!', gx - 3, gy - 6, ROJO, null, 2); }
  T.keeneDelante(R, t, o);
};
// 7 · el león hecho por computadora
const p7 = (t) => {
  const pelo = 0.1 * tramo(t, P7, PELO) + 0.75 * tramo(t, PELO, E.duracion - 0.3), o = { encuadre: 'efectos', pelo };
  T.keene(R, t, o);
  const mira = t > P7 + 0.5;
  R.actor(EL.tecnicoFX1JM, 112, 145, t, { dir: mira ? 1 : -1, dedo: t > PELO && t < PELO + 1.2, sonrisa: t > PELO });
  R.actor(EL.tecnicoFX2JM, 208, 145, t, { dir: t > PELO + 0.2 ? -1 : 1, habla: t < PELO && Math.sin(t * 9) > 0, sorpresa: t > PELO + 0.2 && t < PELO + 1.1, sonrisa: t >= PELO + 1.1 });
  T.keeneDelante(R, t, o);
};
const año = (t) => (t < P3 ? 1981 : t < P4 ? 2026 : t < P6 ? 1979 : 1995);
const efectos = [[0.6, 'lapiz'], [NADA, 'papel'], [ESCULTOR + 0.1, 'toc'], [P2 + 0.1, 'papel'], [LIBRO + 0.3, 'lapiz'], [BN + 0.1, 'vapor'], [P3 + 0.3, 'maquina'], [BILLON + 0.3, 'campana'], [P4 + 0.4, 'lapiz'], [CUELA + 0.1, 'whoosh'], [CUELA + 0.7, 'guau'], [REHUSA, 'aviso'], [P7 + 0.3, 'tecleo'], [PELO, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')

E['jm-hola'] = ('Hola', '''// JM-HOLA (frase 3), sin cartela. Un plano: el estudio de Atom con NUESTRO juego en el escritorio (gag 1). Atom ha bajado
// con los dos dados colgando; bota en «I'm Atom»; en «explain» los agita y los tira: ruedan por la mesa y se paran
// (5 y 3); en «wondered» una liana baja del techo, en «about» engancha el lápiz y se lo lleva; Atom da un respingo
// («!») y en «Let's find out» vuelve de un salto a su esquina.''', COMUN + r'''
R.companero = () => {};   // Atom está en el plano: baja a la mesa y al final vuelve a su esquina
const wh = (s) => en('hola', (s - 0.5) / 4.588);
const ATOM = wh(0.66), EXPLICA = wh(1.36), SUELTA = wh(1.86), LIANA = wh(2.66), COGE = wh(3.32), VAMOS = wh(4.17), PARAN = SUELTA + 0.85;
const p1 = (t) => {
  const cogido = t >= COGE, o = { encuadre: 'estudio', dados: t >= PARAN ? [5, 3] : false, lapiz: !cogido };
  T.hoy(R, t, o);
  const d = T.hoyDelante(R, t, o), [dx, dy] = d.dados || [125, 130], [lx, ly] = d.lapiz || [187, 128];
  // Atom: bota en «I'm Atom», agita los dados y los suelta; respingo cuando la liana se lleva el lápiz; vuelve a su esquina
  const AX = 118, AY = 80, sal = t > ATOM - 0.1 && t < EXPLICA ? Math.round(Math.abs(Math.sin((t - ATOM + 0.1) * Math.PI * 2.4)) * 9 * Math.max(0.3, 1 - (t - ATOM))) : 0;
  const agita = t > EXPLICA && t < SUELTA ? Math.round(Math.sin((t - EXPLICA) * 40) * 3) : 0, resp = t > COGE && t < COGE + 0.5 ? Math.round(Math.sin((t - COGE) / 0.5 * Math.PI) * 7) : 0;
  const v = tramo(t, VAMOS + 0.15, E.duracion - 0.35), e = ease(v);
  const pos = (vv) => { const ee = ease(vv); return [lerp(AX, 297, ee), lerp(AY, 24, ee) - Math.sin(vv * Math.PI) * 16]; };
  const [bx0, by0] = v > 0 ? pos(v) : [AX + agita, AY], ax = bx0, ay = by0 - sal - resp + (v < 1 ? Math.sin(t * 2.6) * 2 : Math.round(1.4 * Math.sin(2 * Math.PI * t / 2.6)));
  // los dados: cuelgan de Atom, caen, botan dos veces y se paran en su sitio
  if (t < SUELTA) { const hx = Math.round(ax + 2), hy = Math.round(ay + 30); for (let k = 0; k < 4; k++) R.pset(hx - 5 + k * 3, hy - 14 + ((k + Math.floor(t * 8)) & 1), hex('#c8f0ff')); PZ.dados(R, hx, hy, { caras: t < EXPLICA ? [2, 6] : [1 + Math.floor(t * 9) % 6, 1 + Math.floor(t * 7 + 3) % 6] }); }
  else if (t < PARAN) { const f = (t - SUELTA) / (PARAN - SUELTA), hx = AX + 2, hy = AY + 30; let x, y;
    if (f < 0.55) { const u = f / 0.55; x = lerp(hx, dx + 12, u); y = lerp(hy, dy + 1, u) - 4 * 24 * u * (1 - u); }
    else if (f < 0.82) { const u = (f - 0.55) / 0.27; x = lerp(dx + 12, dx + 3, u); y = dy + 1 - Math.sin(u * Math.PI) * 8; }
    else { const u = (f - 0.82) / 0.18; x = lerp(dx + 3, dx, u); y = dy + 1 - Math.sin(u * Math.PI) * 3; }
    if (f < 0.55) for (let k = 1; k <= 4; k++) { const u = Math.max(0, f - k * 0.035) / 0.55; R.pset(Math.round(lerp(hx, dx + 12, u)), Math.round(lerp(hy, dy + 1, u) - 4 * 24 * u * (1 - u)) - 6, k & 1 ? BL : hex('#c8f0ff')); }
    PZ.dados(R, Math.round(x), Math.round(y), { caras: [1 + Math.floor(t * 13) % 6, 1 + Math.floor(t * 11 + 2) % 6] }); }
  else if (t < PARAN + 0.4) { const s = (t - PARAN) / 0.4; destello(dx - 4, dy - 14 - s * 4, s < 0.5 ? 3 : 2, hex('#fff4b8')); }
  // la liana: baja del techo, engancha el lápiz y se lo lleva
  const baja = ease(tramo(t, LIANA, COGE)), sube = 0.58 * ease(tramo(t, COGE + 0.15, COGE + 0.5)) + 0.42 * ease(tramo(t, COGE + 1.0, COGE + 1.4)), largo = lerp(lerp(6, ly - 5 - 8, baja), 4, sube);
  if (baja > 0) { const li = PZ.liana(R, lx, 5, { largo, t }) || {}, [qx, qy] = li.punta || [lx, 5 + largo]; if (cogido && qy > 14) { const bal = sube > 0 && sube < 1 ? Math.round(Math.sin((t - COGE) * 11) * 2) : 0; R.rect(qx - 1 + bal, qy - 2, qx + 4 + bal, qy + 15, BL); T.g_lapizMesa(R, qx + 1 + bal, qy + 6, { vertical: true }); if (Math.floor(t * 10) % 2) destello(qx + 7 + bal, qy + 3, 1, hex('#fff4b8')); else destello(qx - 5 + bal, qy + 11, 1, BL); } }
  if (t > COGE && t < COGE + 0.9) { const gx = Math.round(ax + 9), gy = Math.round(ay - 28); R.disco(gx, gy, 9, K); R.disco(gx, gy, 8, BL); R.disco(gx - 8, gy + 9, 2, K); R.disco(gx - 8, gy + 9, 1, BL); R.icono('!', gx - 3, gy - 6, ROJO, null, 2); }
  if (v > 0 && v < 1) for (let k = 1; k <= 7; k++) { const [qx, qy] = pos(Math.max(0, v - k * 0.04)); R.pset(Math.round(qx), Math.round(qy), hex('#c8f0ff')); if (k % 2) R.pset(Math.round(qx) + 1, Math.round(qy) + 1, BL); }
  atomAbajo(ax, ay, t, { r: Math.round(lerp(12, 10, e)) + (sal > 3 ? 1 : 0), e: sal > 0 || agita || resp || (v > 0 && v < 1) ? 0.8 : 0.4, vel: 1 });
  if (sal > 2 || resp > 2) chispas(ax, ay, t, 20, 10, hex('#c8f0ff'));
};
const efectos = [[ATOM, 'pop'], [SUELTA + 0.3, 'golpecito'], [LIANA + 0.1, 'whoosh'], [COGE + 0.15, 'boing'], [VAMOS + 0.15, 'brillo']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')
