E = {}

E['lf-gancho'] = ('Gancho', '''// LF-GANCHO (frases 1–2). Siete planos; la barra dice 2018 hasta el mapa y 2026 desde «Today».
// 1. (0) la cámara de seguridad del techo de una tienda de gasolinera a las 3:41: un caimán se acerca por fuera, las
//    puertas automáticas se abren solas en «wanders into» y entra; el dependiente da un respingo y lo señala.
// 2. («strolls») el pasillo, por la misma cámara: el caimán pasa con las neveras al fondo y se para delante del cajón de
//    patatas (golpe de la música en «first GTA 6 trailer»); mira, abre la boca «como quien elige» y le cae una bolsa (gag 4).
// 3. («something») INSERTO: el mapa de papel con Florida; cae la polaroid de la cámara de seguridad; en «really happened»
//    cae y se clava la chincheta en el condado de Manatee (late); en «Florida» un círculo de lápiz rodea la península;
//    en «2018», el sello con el 2018.
// 4. («Today») la mesita del salón de Atom: el calendario de mesa pasa del 18 al 19 en «November 19»; la mano de Atom
//    abre la caja en «GTA 6 is finally out» (dentro solo la tarjetita del código), la sacude en «two delays» y sale un «?» (gag 1).
// 5. («It takes place») Ocean Drive de noche, con los neones: la patinadora cruza; un turista llega y hace una foto con
//    flash en «Florida».
// 6. («So today») la carretera sobre el mar al atardecer: el turista llega a una señal de cruce de caimanes, la señala en
//    «alligators» y en «highway over the sea» abre los brazos hacia el puente y sigue.
// 7. («its strange headlines») Britton Hill: un periódico vuela con el viento; el turista sube el montículo de un paso en
//    «mountain» y le sale un «?» en «doesn't exist».''', r'''
const A = (f) => en('caiman', f), L = (f) => en('leonida', f);
const P2 = A(0.2994), P3 = A(0.6476), P4 = L(0), P5 = L(0.3241), P6 = L(0.5515), P7 = L(0.8435);
const PUERTA = A(0.0341), GOLPE = A(0.4731), REALLY = A(0.7624), FLORIDA = A(0.8477), Y2018 = A(0.9206);
const DIEZ9 = L(0.0429), SALE = L(0.0879), DELAYS = L(0.1779), TRES = L(0.2435), FLA = L(0.5069);
const REAL = L(0.6143), GATOR = L(0.7230), HIGH = L(0.7699), HEAD = L(0.8468), MONTE = L(0.9264), NOEXISTE = L(0.9550);
const HORA = 3 * 3600 + 41 * 60 + 7, K = T.C.k, BL = hex('#f6f4ec'), ROJO = hex('#d01a2a'), MANGA = '#3a4a8a';
const camino = (pts, u) => {   // un punto a la fracción u de una polilínea
  const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), tot = segs.reduce((a, b) => a + b, 0);
  let d = Math.max(0, Math.min(1, u)) * tot;
  for (let i = 0; i < segs.length; i++) { if (d <= segs[i] || i === segs.length - 1) { const f = segs[i] ? Math.min(1, d / segs[i]) : 0; return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; } d -= segs[i]; }
};
// ── 1. La tienda por la cámara de seguridad: el caimán entra por las puertas automáticas ──
const p1 = (t) => {
  const o = { encuadre: 'tienda', cctv: 1, hora: HORA, puerta: tramo(t, PUERTA - 0.2, PUERTA + 0.3) - tramo(t, P2 - 1.0, P2 - 0.4) };
  T.tienda(R, t, o);
  // fuera, tras el cristal (recortado a su hueco), el caimán se acerca por la acera
  const u0 = tramo(t, 0, PUERTA + 0.3);
  if (u0 < 1) { R.recorte([9, 42, 57, 103]); T.a_caiman(R, Math.round(lerp(-40, 26, u0)), 101, t, { dir: 1, anda: true, s: 1.6 }); R.recorte(null); }
  // dentro: baja por delante de las cestas y del cartel de suelo mojado y se va hacia la góndola
  const u = tramo(t, PUERTA + 0.3, P2 + 0.3);
  if (u0 >= 1) { const [x, y] = camino([[28, 108], [46, 128], [92, 150], [150, 160]], u); T.a_caiman(R, Math.round(x), Math.round(y), t, { dir: 1, anda: u < 1, s: 1.6 }); }
  // el dependiente detrás del mostrador: lee algo; en «night» lo ve, da un respingo y lo señala
  const ve = A(0.2416), salta = tramo(t, ve, ve + 0.15) * (1 - tramo(t, ve + 0.15, ve + 0.4));
  R.actor(EL.dependienteLF, 262, 130, t, { dir: -1, sorpresa: t > ve, salto: Math.round(salta * 4), dedo: t > ve + 0.45, habla: t > ve + 0.6 && Math.sin(t * 9) > 0 });
  T.tiendaDelante(R, t, o);
};
// ── 2. El pasillo: el caimán se para delante de las patatas (gag 4) ──
const p2 = (t) => {
  const o = { encuadre: 'tienda', camara: 'pasillo', cctv: 1, hora: HORA };
  T.tienda(R, t, o);
  const u = tramo(t, P2 + 0.1, GOLPE), x = Math.round(lerp(-60, 170, u ** 0.85));
  // «como quien elige»: abre la boca dos veces y gira un poco; luego le cae una bolsa
  const elige = t > GOLPE + 0.25 && t < GOLPE + 1.0 ? (Math.sin((t - GOLPE) * 6) > 0.3 ? 0.6 : 0) : 0;
  const cae = tramo(t, GOLPE + 1.05, GOLPE + 1.35), bx = Math.round(lerp(214, 204, cae)), by = Math.round(lerp(124, 164, cae * cae));
  const empuja = tramo(t, GOLPE + 1.6, GOLPE + 2.2);
  T.a_caiman(R, x + Math.round(empuja * 6), 168, t, { dir: 1, anda: (u > 0 && u < 1) || (empuja > 0 && empuja < 1), boca: elige || (t > GOLPE + 1.35 && t < GOLPE + 1.6 ? 0.5 : 0), s: 2.2 });
  // la bolsa de patatas que cae del cajón (roja, con su brillo y su pliegue de arriba)
  if (t > GOLPE + 1.0) { const bx2 = bx + Math.round(empuja * 8); R.rect(bx2 - 1, by - 19, bx2 + 14, by, K); R.rect(bx2, by - 18, bx2 + 13, by - 1, hex('#f8e870')); R.rect(bx2, by - 18, bx2 + 13, by - 16, hex('#d83a2a')); R.rect(bx2, by - 3, bx2 + 13, by - 1, hex('#d83a2a'));
    R.disco(bx2 + 7, by - 9, 3, hex('#e89a2a')); R.disco(bx2 + 7, by - 9, 2, hex('#f8c040')); R.rect(bx2 + 11, by - 14, bx2 + 12, by - 6, BL); R.linea(bx2 + 1, by - 15, bx2 + 12, by - 15, hex('#8a2a1a')); }
  T.tiendaDelante(R, t, o);
};
// ── 3. INSERTO: el mapa de Florida; la mano de Atom clava la chincheta; «2018» ──
const polaroid = (x, y, t) => {
  R.rect(x + 2, y + 2, x + 45, y + 43, hex('#5a4a34'));
  R.rect(x, y, x + 43, y + 41, K); R.rect(x + 1, y + 1, x + 42, y + 40, BL);
  R.recorte([x + 4, y + 4, x + 39, y + 31]);
  for (let yy = y + 4; yy <= y + 31; yy++) R.linea(x + 4, yy, x + 39, yy, yy % 2 ? hex('#8a9884') : hex('#7a8874'));
  for (let k = 0; k < 4; k++) R.linea(x + 6 + k * 9, y + 6, x + 9 + k * 9, y + 12, hex('#b8c8b4'));   // las neveras al fondo
  R.linea(x + 4, y + 13, x + 39, y + 13, hex('#5a6a56'));
  T.a_caiman(R, x + 10, y + 28, t, { dir: 1 });
  R.pset(x + 36, y + 7, (Math.floor(t * 3) % 2) ? ROJO : hex('#6a1a1a'));
  R.recorte(null);
  R.linea(x + 4, y + 35, x + 22, y + 35, hex('#c8c4b4')); R.linea(x + 4, y + 37, x + 16, y + 37, hex('#c8c4b4'));
};
const p3 = (t) => {
  const P = T.mapa(R, t, { zoom: 5.2, centro: [-83.4, 27.6] });
  const [px, py] = P([-82.40, 27.42]).map(Math.round);
  // la polaroid de la cámara de seguridad cae sobre el golfo
  const cae = tramo(t, P3 + 0.1, P3 + 0.55), qx = 26, qy = Math.round(lerp(40, 88, cae));
  if (cae > 0) polaroid(qx, qy, t);
  // el hilo rojo de la foto a la chincheta
  const hilo = tramo(t, REALLY + 0.1, REALLY + 0.7);
  if (hilo > 0) { const x1 = lerp(qx + 22, px, hilo), y1 = lerp(qy + 2, py - 5, hilo); R.linea(qx + 22, qy + 2, Math.round(x1), Math.round(y1), ROJO); R.linea(qx + 23, qy + 2, Math.round(x1) + 1, Math.round(y1), hex('#8a1018')); }
  if (cae > 0) { R.disco(qx + 22, qy + 2, 2, K); R.pset(qx + 22, qy + 2, hex('#3a8ae8')); }
  // en «Florida», el círculo de lápiz que rodea la península
  const circ = tramo(t, FLORIDA - 0.1, FLORIDA + 0.5), [cx, cy] = P([-81.6, 27.6]).map(Math.round);
  for (let a = 0; a < circ * 6.2; a += 0.025) { const x = Math.round(cx + Math.cos(a - 1.4) * 52), y = Math.round(cy + Math.sin(a - 1.4) * 64); R.pset(x, y, hex('#2a3a7a')); R.pset(x + 1, y, hex('#4a5a9a')); }
  // la chincheta cae del cielo del mapa con su sombra y se clava en «really happened»; luego late
  T.chincheta(R, px, py, t, ROJO, { baja: tramo(t, REALLY - 0.3, REALLY), pulso: t > REALLY + 0.3 });
  // en «2018», el sello rojo del año sobre el Atlántico
  const s = tramo(t, Y2018 - 0.08, Y2018 + 0.08);
  if (s > 0) { const x0 = 92, y0 = 158, sh = Math.round((1 - s) * 6);
    for (const [a, b] of [[x0 - 4 - sh, y0 - 22 - sh], [x0 + 74 + sh, y0 + 6 + sh]]) R.pset(a, b, ROJO);
    R.rect(x0 - 4 - sh, y0 - 22 - sh, x0 + 74 + sh, y0 - 21 - sh, ROJO); R.rect(x0 - 4 - sh, y0 + 5 + sh, x0 + 74 + sh, y0 + 6 + sh, ROJO);
    R.rect(x0 - 4 - sh, y0 - 22 - sh, x0 - 3 - sh, y0 + 6 + sh, ROJO); R.rect(x0 + 73 + sh, y0 - 22 - sh, x0 + 74 + sh, y0 + 6 + sh, ROJO);
    R.numero('2018', x0 + 35, y0, { tam: 16, centro: true, rampa: [hex('#6a0a12'), hex('#a01a22'), hex('#d02a2a'), hex('#f05a4a')] }); }
};
// ── 4. La mesita del salón: el calendario pasa al 19; la caja solo trae un código (gag 1) ──
const calendario = (t) => {
  const x = 212, y = 112, pasa = tramo(t, DIEZ9 - 0.1, DIEZ9 + 0.5);
  R.rect(x - 2, y + 30, x + 34, y + 36, K); R.rect(x - 1, y + 31, x + 33, y + 35, hex('#6a4a2a')); R.rect(x - 1, y + 31, x + 33, y + 31, hex('#9a6a3a'));
  R.rect(x, y, x + 32, y + 31, K); R.rect(x + 1, y + 1, x + 31, y + 30, BL); R.rect(x + 1, y + 1, x + 31, y + 7, ROJO);
  for (const k of [7, 15, 23]) { R.rect(x + k, y - 2, x + k + 1, y + 2, hex('#b8b8c0')); }
  R.numero(pasa > 0.1 ? '19' : '18', x + 16, y + 25, { tam: 16, centro: true, rampa: [K, hex('#2a2a3a'), hex('#3a3a4a'), hex('#4a4a5a')] });
  R.rect(x + 3, y + 27, x + 29, y + 27, hex('#d8d4c8'));
  // la hoja del 18 que se arranca y se va volando hacia arriba
  if (pasa > 0 && pasa < 1) { const hx0 = Math.round(x + 1 + pasa * 40), hy0 = Math.round(y + 1 - pasa * 50 + Math.sin(pasa * 9) * 3), w = Math.round(30 * (1 - pasa * 0.5)), hgt = Math.round(29 * (1 - pasa * 0.6));
    R.rect(hx0 - 1, hy0 - 1, hx0 + w + 1, hy0 + hgt + 1, K); R.rect(hx0, hy0, hx0 + w, hy0 + hgt, hex('#eeeae0')); R.rect(hx0, hy0, hx0 + w, hy0 + 4, ROJO); }
};
const p4 = (t) => {
  const ab = tramo(t, SALE, SALE + 0.8), sac = tramo(t, DELAYS, DELAYS + 0.15) * (1 - tramo(t, TRES - 0.2, TRES));
  const o = { encuadre: 'salon', camara: 'mesa', abierta: ab, sacude: sac };
  const g = T.salon(R, t, o) || {};
  calendario(t);
  T.salonDelante(R, t, o);
  // la mano de Atom: entra por abajo, coge la caja por el canto y no la suelta hasta el «?»
  const [mx, my0] = g.manoCaja ?? [164, 126], my = my0 + 14, m = tramo(t, P4 + 0.2, SALE - 0.2) * (1 - tramo(t, TRES + 0.5, P5 - 0.2));
  if (m > 0) { const wx = Math.round(lerp(250, mx + 9, m)), wy = Math.round(lerp(230, my, m)); T.brazo(R, wx + 22, wy + 52, wx, wy, MANGA, -1); }
  // el «?» que sale de la caja vacía
  const q = tramo(t, TRES, TRES + 0.25);
  if (q > 0) { const [cx] = g.caja ?? [140, 120]; const yq = Math.round(lerp(92, 60, q) - Math.max(0, Math.sin((t - TRES) * 8)) * 2 * (1 - tramo(t, TRES + 0.5, TRES + 1)));
    R.disco(cx, yq, 11, K); R.disco(cx, yq, 10, hex('#f8e098')); R.icono('?', cx - 7, yq - 7, K, hex('#c8a040'), 2); }
};
// ── 5. Ocean Drive de noche: la patinadora pasa y el turista hace su foto ──
const p5 = (t) => {
  const o = { encuadre: 'ocean', noche: 1 };
  T.vicecity(R, t, o);
  const pa = tramo(t, P5 + 0.3, P6 - 0.4);
  R.actor(EL.fanaLF, 196, 158, t, { dir: -1, habla: t < FLA && Math.sin(t * 7) > 0.2, sonrisa: t > FLA });
  R.actor(EL.fanLF, 180, 158, t, { dir: 1, sonrisa: true, dedo: t > FLA + 0.3 && t < FLA + 1.2 });
  const tu = tramo(t, P5 + 0.1, FLA - 1.1), tx = Math.round(lerp(-16, 120, tu)), foto = t > FLA - 0.6;
  const tr = R.actor(EL.turistaLF, tx, 160, t, { dir: 1, anda: tu > 0 && tu < 1, sostiene: foto ? true : undefined, sonrisa: t > FLA });
  if (foto && tr && tr.mano) { const [hx1, hy1] = tr.mano; R.rect(hx1 - 2, hy1 - 3, hx1 + 3, hy1 + 1, K); R.rect(hx1 - 1, hy1 - 2, hx1 + 2, hy1, hex('#5a5a66'));
    const f = 1 - tramo(t, FLA, FLA + 0.35); if (t > FLA && f > 0) { for (let r = 2; r < 2 + f * 9; r++) { R.pset(hx1 + 1 + r, hy1 - 2, BL); R.pset(hx1 + 1 - r, hy1 - 2, BL); R.pset(hx1 + 1, hy1 - 2 - r, BL); R.pset(hx1 + 1, hy1 - 2 + r, BL); } R.disco(hx1 + 1, hy1 - 2, 2, BL); } }
  R.actor(EL.patinadoraLF, Math.round(lerp(300, -20, pa)), 165, t, { dir: -1, anda: pa > 0 && pa < 1, sonrisa: true });
  T.vicecityDelante(R, t, o);
};
// ── 6. La carretera sobre el mar: la señal de los caimanes ──
const senal = (x, y) => {   // la señal amarilla de rombo con un caimán, en su poste
  R.rect(x - 1, y + 10, x + 1, y + 34, K); R.rect(x, y + 10, x, y + 34, hex('#b8b8c0'));
  R.poligono([[x, y - 12], [x + 12, y], [x, y + 12], [x - 12, y]], K); R.poligono([[x, y - 10], [x + 10, y], [x, y + 10], [x - 10, y]], hex('#f2c818'));
  R.linea(x - 7, y, x, y - 7, hex('#fff08a'));
  // el caimán en silueta
  R.rect(x - 7, y, x + 5, y + 1, K); R.rect(x - 4, y - 1, x + 2, y - 1, K); R.rect(x + 5, y, x + 8, y, K); R.pset(x - 8, y + 1, K); R.pset(x - 5, y + 2, K); R.pset(x + 2, y + 2, K); R.pset(x - 3, y - 2, K); R.pset(x, y - 2, K);
};
const p6 = (t) => {
  const o = { encuadre: 'puente', tarde: true };
  T.cayos(R, t, o);
  senal(206, 108);
  const llega = tramo(t, P6 + 0.1, REAL + 1.2), sigue = tramo(t, HIGH + 0.9, P7 + 0.3);
  const x = Math.round(lerp(-16, 170, llega) + sigue * 160), anda = (llega > 0 && llega < 1) || sigue > 0;
  R.actor(EL.turistaLF, x, 150, t, { dir: 1, anda, dedo: t > GATOR - 0.1 && t < HIGH, sorpresa: t > GATOR - 0.1 && t < GATOR + 0.6, brazos: t > HIGH && t < HIGH + 0.9, sonrisa: t > HIGH });
  const e = tramo(t, GATOR - 0.1, GATOR + 0.15) * (1 - tramo(t, GATOR + 0.9, GATOR + 1.2));
  if (e > 0) { R.disco(x + 8, 116 - Math.round(e * 4), 5, K); R.disco(x + 8, 116 - Math.round(e * 4), 4, BL); R.icono('!', x + 5, 113 - Math.round(e * 4), ROJO, K, 1); }
  T.cayosDelante(R, t, o);
};
// ── 7. Britton Hill: el periódico que vuela y la montaña que no está ──
const periodico = (t, u) => {
  const x = Math.round(lerp(10, 340, u)), y = Math.round(112 + Math.sin(u * 9) * 12 - u * 24), f = Math.floor(t * 8) % 3;
  const w = [22, 16, 7][f], h = [15, 17, 16][f];
  R.rect(x - 1, y - 1, x + w + 1, y + h + 1, K); R.rect(x, y, x + w, y + h, hex('#e8e4d8'));
  if (w > 8) { R.rect(x + 1, y + 1, x + w - 1, y + 2, hex('#3a3a46')); for (let k = 4; k < h - 1; k += 2) R.linea(x + 1, y + k, x + (k % 4 ? w - 1 : Math.round(w / 2)), y + k, hex('#9a968a')); R.rect(x + w - 5, y + 4, x + w - 1, y + 7, hex('#7a8a6a')); }
  else R.linea(x + 1, y + 1, x + 1, y + h - 1, hex('#9a968a'));
};
const p7 = (t) => {
  const o = { encuadre: 'britton' };
  T.interior(R, t, o);
  const v = tramo(t, HEAD - 0.05, HEAD + 2.0); if (v > 0 && v < 1) periodico(t, v);
  const an = tramo(t, P7 + 0.2, MONTE - 0.05), sube = tramo(t, MONTE - 0.05, MONTE + 0.3);
  const x = Math.round(lerp(-16, 100, an) + sube * 54), suelo = Math.round(160 - sube * 10 - Math.sin(sube * Math.PI) * 6);
  const mira = t > NOEXISTE + 0.6 ? (Math.floor((t - NOEXISTE) * 1.6) % 2 ? -1 : 1) : 1;
  R.actor(EL.turistaLF, x, suelo, t, { dir: mira, anda: an > 0 && an < 1, sorpresa: t > NOEXISTE, brazos: t > MONTE + 0.3 && t < NOEXISTE });
  const q = tramo(t, NOEXISTE, NOEXISTE + 0.2);
  if (q > 0) { const yq = Math.round(lerp(130, 112, q)); R.disco(x + 8, yq, 7, K); R.disco(x + 8, yq, 6, BL); R.icono('?', x + 5, yq - 3, hex('#2a5ac8'), K, 1); }
  T.interiorDelante(R, t, o);
};
const efectos = [[PUERTA, 'puerta'], [A(0.2416), 'aviso'], [GOLPE + 1.35, 'pop'], [P3 + 0.5, 'papel'], [REALLY, 'golpecito'], [FLORIDA, 'lapiz'], [Y2018, 'sello'],
  [DIEZ9, 'papel'], [SALE + 0.1, 'cerrojo'], [DELAYS + 0.1, 'golpecito'], [TRES, 'pop'], [FLA, 'flash'], [GATOR, 'pop'], [HEAD, 'viento'], [MONTE + 0.25, 'boing'], [NOEXISTE, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año: (t) => (t < P4 ? 2018 : 2026) });
''')

E['lf-hola'] = ('Hola', '''// LF-HOLA (frase 3), 2026. Un plano: el salón de Atom de noche, con la barra de descarga en la tele. En «I'm Atom» la
// mano de Atom sube y saluda; en «wondered» la barra avanza un punto; en «Let's find out» la mano pulsa el mando de la
// mesita y la barra da otro salto.''', r'''
const H = (f) => en('hola', f);
const ATOM = H(0.0437), WOND = H(0.588), FIND = H(0.8335), MANGA = '#3a4a8a';
const p1 = (t) => {
  const pulsa = tramo(t, FIND - 0.05, FIND + 0.1);
  const o = { encuadre: 'salon', descarga: 11 + (t > WOND ? 1 : 0) + (pulsa >= 1 ? 1 : 0) };
  T.salon(R, t, o);
  T.salonDelante(R, t, o);
  // el saludo: el brazo sube por la derecha, la mano se mece y se baja
  const s = tramo(t, ATOM - 0.4, ATOM + 0.1) * (1 - tramo(t, ATOM + 1.6, ATOM + 2.2));
  if (s > 0) { const wx = 290 + Math.round(Math.sin(t * 10) * 4 * (s >= 1 ? 1 : 0)), wy = Math.round(lerp(204, 148, s)); T.brazo(R, 316, wy + 50, wx, wy, MANGA, -1); }
  // «Let's find out»: la mano coge el mando de la mesita y lo pulsa apuntando a la tele
  const m = tramo(t, FIND - 0.7, FIND - 0.1) * (1 - tramo(t, E.duracion - 0.6, E.duracion));
  if (m > 0) { const wx = Math.round(lerp(200, 170, m)), wy = Math.round(lerp(200, 164, m) - (t > FIND && t < FIND + 0.15 ? 1 : 0)); T.brazo(R, 214, 214, wx, wy, MANGA, -1, { codo: [218, 192] });
    if (pulsa > 0 && pulsa < 1) for (let k = 1; k < 4; k++) R.pset(wx - 16 - k * 3, wy - 6 - k * 3, hex('#ff6a5a')); }
};
T.rodar(E, R, [[0, p1]], { efectos: [[WOND, 'bip'], [FIND, 'interruptor']], año: 2026 });
''')
