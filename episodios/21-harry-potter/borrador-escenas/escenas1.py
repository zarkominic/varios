E = {}
E['hp-gancho'] = ('Gancho', '''// HP-GANCHO (frases 1–2), Navidad de 2026. Cuatro planos:
// 1. Privet Drive en Nochebuena, nevando: de la chimenea del 4 salen cartas a cientos (gag 2) y la snitch entre ellas;
//    Harry llega por la acera, se asombra, salta y caza una carta en «school»; una vecina se para a mirar;
// 2. (corta en «and») el andén de Hogsmeade: entra el expreso echando vapor; bajan Harry (con su carta), Ron y Hermione,
//    y Hagrid levanta el farol en «everything»;
// 3. (corta en «Because») el salón de la fan en Navidad: la tele pone el calendario 12·25 dorado en «December 25th», luego
//    las gafas con el castillo en «premieres» y «un libro = una temporada» en «one book per season»; la fan salta y señala;
// 4. (corta en «The plan») el lago y el castillo de noche: siete libros salen del agua y se encienden uno a uno en «seven
//    seasons»; el primero se abre en «first book» y le caen ocho fichas de episodio: «8» en «eight».''', r'''
const a = (f) => en('navidad', f), b = (f) => en('hbo', f);
const P2 = a(0.528), P3 = en('hbo', 0), P4 = b(0.564);
const boy = a(0.117), school = a(0.361), every = a(0.772), dic = b(0.056), prem = b(0.184), libroT = b(0.427), siete = b(0.61), primero = b(0.808), ocho = b(0.907);
const C = T.C, P = T.PIEZAS_HP;
// un halo tramado (no tapa: puntea) alrededor de (cx, cy)
const halo = (cx, cy, r, c, k = 0) => { for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1 && ((x * 7 + y * 13 + k) % 5) < (1 - d) * 3.2 && ((x + y) & 1)) R.pset(x, y, c); } };
const p1 = (t) => {
  T.muggle(R, t, { encuadre: 'calle', luz: 'nochebuena', cartas: 0.12 + 0.88 * tramo(t, a(0.02), a(0.2)) });
  // Harry llega por la acera, se para delante del 4 y mira arriba; salta y caza una carta
  const u = tramo(t, 0.2, boy + 0.9), hx = Math.round(lerp(-18, 128, u));
  const sal = t > school - 0.25 && t < school + 0.35 ? Math.round(Math.sin((t - school + 0.25) / 0.6 * Math.PI) * 9) : 0, tiene = t > school + 0.1;
  const r = R.actor(EL.harryCalle, hx, 138, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > boy + 0.9 && t < school, salto: sal, sostiene: tiene ? [hx + 16, 112] : false, sonrisa: tiene });
  if (tiene) P.carta(R, r.mano[0] + 1, r.mano[1] + 3, {});
  // la carta que cae hacia él antes de cazarla
  if (!tiene && t > school - 1.2) { const v = tramo(t, school - 1.2, school + 0.1); P.carta(R, Math.round(lerp(176, hx + 17, v) + Math.sin(t * 9) * 3), Math.round(lerp(40, 112, v)), {}); }
  // la vecina con su regalo, que se para a mirar las cartas
  const w = tramo(t, 0.4, 2.6), vx = Math.round(lerp(334, 236, w));
  const rv = R.actor(EL.vecina, vx, 140, t, { dir: -1, anda: w > 0 && w < 1, sorpresa: w >= 1, sostiene: true });
  R.rect(rv.mano[0] - 4, rv.mano[1] - 3, rv.mano[0] + 3, rv.mano[1] + 3, C.k); R.rect(rv.mano[0] - 3, rv.mano[1] - 2, rv.mano[0] + 2, rv.mano[1] + 2, hex('#2a8a4a')); R.linea(rv.mano[0] - 1, rv.mano[1] - 2, rv.mano[0] - 1, rv.mano[1] + 2, hex('#e83a3a')); R.linea(rv.mano[0] - 3, rv.mano[1], rv.mano[0] + 2, rv.mano[1], hex('#e83a3a'));
  // la snitch sale de la chimenea entre las cartas y baja dando vueltas hasta Harry
  const s = tramo(t, a(0.06), school), sx = lerp(142, hx + 26, s) + Math.sin(t * 5) * 12 * s, sy = lerp(24, 104, s * s) + Math.sin(t * 9) * 3;
  if (t > a(0.06)) { if (s < 0.3) halo(sx, sy - 4, 9, hex('#ffe890'), Math.floor(t * 8)); T.snitch(R, sx, sy, t, { cara: t > school ? 'feliz' : 'normal' }); }
  T.muggleDelante(R, t, { encuadre: 'calle', luz: 'nochebuena' });
};
const p2 = (t) => {
  const ll = tramo(t, P2 + 0.05, a(0.7));
  T.hogwarts(R, t, { encuadre: 'anden', llega: ll });
  // Hagrid espera con el farol y lo levanta llamando a los de primero
  R.actor(EL.hagridFarol, 18, 174, t, { dir: 1, habla: t > every - 0.3 && Math.sin(t * 9) > 0, sonrisa: t > every, brazos: t > every && t < every + 1.3 });
  // bajan del tren y van hacia él: Harry con su carta, Ron y Hermione; luego dos alumnos más
  const ninos = [[EL.harryCalle, 0.0, 96], [EL.ronJersey, 0.35, 118], [EL.hermione, 0.7, 140], [EL.alumno, 1.3, 176], [EL.alumna, 1.6, 200]];
  ninos.forEach(([d, re, xf], k) => {
    const t0 = a(0.71) + re, v = tramo(t, t0, t0 + 1.7), baja = tramo(t, t0 - 0.25, t0), x = Math.round(lerp(150 + k * 4, xf, v)), y = Math.round(lerp(158, 168 + (k % 2) * 3, baja));
    if (t < t0 - 0.25) return;
    const r = R.actor(d, x, y, t, { dir: -1, anda: v > 0 && v < 1, sonrisa: v >= 1, sorpresa: k === 0 && t > every && t < every + 0.6, sostiene: k === 0 ? true : false });
    if (k === 0) P.carta(R, r.mano[0], r.mano[1] + 3, {});
  });
  // la lechuza de Harry vuela del tren al farol de la izquierda
  const l = tramo(t, P2 + 1.5, P2 + 3.8); if (l > 0 && l < 1) P.lechuza(R, Math.round(lerp(150, 40, l)), Math.round(lerp(60, 112, l) - Math.sin(l * Math.PI) * 18), { t });
  // la snitch sale del vapor de la chimenea
  const s = tramo(t, P2 + 0.8, P3), sx = lerp(160, 70, s) + Math.sin(t * 4) * 18, sy = lerp(86, 120, s) + Math.sin(t * 7) * 6;
  if (s > 0) T.snitch(R, sx, sy, t, { cara: 'feliz' });
  T.hogwartsDelante(R, t, { encuadre: 'anden', llega: ll });
};
// la tele del salón: el calendario 12·25, las gafas con el castillo y «un libro = una temporada»
const tele = (R, t, cl) => {
  const [x0, y0, x1, y1] = cl, cx = (x0 + x1) >> 1;
  if (t < prem) {
    for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, y < y0 + 12 ? hex('#1a2a5a') : hex('#24387a'));
    for (let k = 0; k < 14; k++) R.pset(x0 + ((k * 23 + Math.floor(t * 18) * (k % 3 + 1)) % (x1 - x0)), y0 + ((k * 11 + Math.floor(t * 9)) % (y1 - y0)), C.blanco);
    const e = tramo(t, dic - 0.15, dic + 0.25), h = Math.round(lerp(4, 28, e));
    const ty = cl[3] - 2 - h; R.poligono([[cx - 18, ty], [cx + 18, ty], [cx + 18, y1 - 2], [cx - 18, y1 - 2]], C.k);
    R.poligono([[cx - 17, ty + 1], [cx + 17, ty + 1], [cx + 17, y1 - 3], [cx - 17, y1 - 3]], hex('#fff6dc'));
    R.poligono([[cx - 17, ty + 1], [cx + 17, ty + 1], [cx + 17, ty + 7], [cx - 17, ty + 7]], hex('#c8283a'));
    if (e >= 1) { R.numero('12', cx, ty + 8, { centro: true }); R.numero('25', cx, y1 - 4, { tam: 16, centro: true }); }
  } else if (t < libroT) {
    for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, (y + Math.floor(t * 3)) % 4 ? hex('#5a1424') : hex('#7a2032'));
    P.gafas(R, cx, y1 - 4, { s: 2, reflejo: true, t });
    if (Math.sin(t * 6) > 0) for (const [dx, dy] of [[-22, -10], [20, -12], [-16, 8], [24, 6]]) R.pset(cx + dx, y0 + 16 + dy, hex('#ffe890'));
  } else {
    for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, hex('#141c3a'));
    P.libro(R, cx - 14, y1 - 6, {}); R.rect(cx - 3, y0 + 13, cx + 3, y0 + 14, hex('#ffe890')); R.rect(cx - 3, y0 + 17, cx + 3, y0 + 18, hex('#ffe890'));
    R.icono('tele', cx + 10, y0 + 10, hex('#8ad0ff'), C.k, 2);
    if (tramo(t, libroT, libroT + 0.3) < 1 && Math.floor(t * 10) % 2) R.linea(x0, y0 + 1, x1, y0 + 1, C.blanco);
  }
};
const p3 = (t) => {
  T.hoy(R, t, { encuadre: 'salon', pantalla: tele });
  // la fan cruza desde el sofá hasta la tele: salta en «December 25th», celebra en «premieres» y señala la tele
  const u = tramo(t, P3 + 0.1, dic + 0.4), fx = Math.round(lerp(96, 160, u));
  const sal = t > dic + 0.5 && t < dic + 1.1 ? Math.round(Math.sin((t - dic - 0.5) / 0.6 * Math.PI) * 8) : 0;
  R.actor(EL.chica, fx, 150, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > dic && t < prem, salto: sal, brazos: t > prem && t < prem + 1.2, dedo: t > libroT - 0.6, habla: t > prem + 1.2 && Math.sin(t * 8) > 0, sonrisa: t > prem });
  // la abuela entra con el chocolate caliente
  const w = tramo(t, prem + 0.4, prem + 2.2), ax = Math.round(lerp(330, 236, w));
  const ra = R.actor(EL.abuela, ax, 152, t, { dir: -1, anda: w > 0 && w < 1, sostiene: true, sonrisa: w >= 1 });
  R.rect(ra.mano[0] - 3, ra.mano[1] - 2, ra.mano[0] + 2, ra.mano[1] + 3, C.k); R.rect(ra.mano[0] - 2, ra.mano[1] - 1, ra.mano[0] + 1, ra.mano[1] + 2, hex('#e8e4f0')); R.pset(ra.mano[0] - 1, ra.mano[1] - 1, hex('#6a3a22'));
  if (Math.sin(t * 5) > 0) R.pset(ra.mano[0] - 1, ra.mano[1] - 4 - Math.floor(t * 3) % 3, hex('#e8e4f0'));
  // la snitch da vueltas al árbol y se posa en la punta
  const s = tramo(t, libroT, libroT + 0.9), an = t * 3;
  const sx = lerp(284 + Math.cos(an) * 20, 284, s), sy = lerp(104 + Math.sin(an * 0.7) * 26, 50, s);
  if (s >= 1) halo(284, 46, 8, hex('#ffe890'), Math.floor(t * 6));
  T.snitch(R, sx, sy, t, { cara: s >= 1 ? 'feliz' : 'normal' });
  T.hoyDelante(R, t, { encuadre: 'salon' });
};
const p4 = (t) => {
  T.exterior(R, t, { encuadre: 'castillo', barcas: tramo(t, P4, P4 + 6) });
  // Hagrid y Harry en el embarcadero miran el lago
  R.actor(EL.hagridFarol, 14, 140, t, { dir: 1, sonrisa: t > siete, habla: t > primero && t < ocho && Math.sin(t * 8) > 0 });
  const sal = t > ocho && t < ocho + 0.6 ? Math.round(Math.sin((t - ocho) / 0.6 * Math.PI) * 7) : 0;
  R.actor(EL.harry, 54, 140, t, { dir: 1, dedo: t > siete - 0.3 && t < primero, sorpresa: t > ocho, salto: sal });
  // los siete libros salen del agua uno a uno y se encienden
  let ult = -1;
  for (let k = 0; k < 7; k++) {
    const e = tramo(t, siete + k * 0.13, siete + k * 0.13 + 0.45); if (e <= 0) continue; ult = k;
    const x = 112 + k * 24, y = Math.round(lerp(150, 134, e * e * (3 - 2 * e)) + Math.sin(t * 2 + k) * 1.5);
    halo(x, y - 12, 16, hex(k === 0 && t > primero ? '#fff2a0' : '#ffd84a'), k + Math.floor(t * 5));
    if (k === 0 && t > primero) P.libro(R, x, y, { s: 2, abierto: true }); else P.libro(R, x, y, { s: 2 });
  }
  // las ocho fichas de episodio caen sobre el primero
  for (let i = 0; i < 8; i++) {
    const t0 = primero + 0.2 + i * 0.15, v = tramo(t, t0, t0 + 0.4); if (v <= 0) continue;
    const x = 104 + (i % 4) * 4 - 2, y = Math.round(lerp(20, 112 - i * 2, v * v));
    R.rect(x, y, x + 10, y + 7, C.k); R.rect(x + 1, y + 1, x + 9, y + 6, hex('#f6f0dc')); R.rect(x + 3, y + 2, x + 7, y + 5, hex('#3a5aa8')); R.pset(x + 1, y + 1, C.k); R.pset(x + 9, y + 6, C.k);
  }
  if (t > ocho) { const e = tramo(t, ocho, ocho + 0.25); R.numero('8', 112, Math.round(lerp(104, 92, e)), { tam: 16, centro: true }); }
  else if (t > siete + 0.9 && t < primero) R.numero('7', 184, 106, { tam: 16, centro: true });
  // la snitch va de libro en libro según se encienden
  const sx = ult < 0 ? 200 + Math.sin(t * 2) * 30 : 112 + Math.min(ult, 6) * 24 + Math.sin(t * 6) * 4, sy = ult < 0 ? 80 : 104 + Math.sin(t * 8) * 3;
  T.snitch(R, sx, sy, t, { cara: t > ocho ? 'susto' : 'feliz' });
  T.exteriorDelante(R, t, { encuadre: 'castillo' });
};
const efectos = [[0.6, 'campana'], [a(0.04), 'papel'], [school + 0.05, 'pop'], [P2 + 0.25, 'silbato'], [a(0.7), 'vapor'], [every, 'palmada'],
  [dic, 'interruptor'], [dic + 0.55, 'boing'], [prem, 'brillo'], [libroT, 'pop'], [siete, 'brillo'], [primero + 0.2, 'papel'], [ocho, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
''')

E['hp-hola'] = ('Hola', '''// HP-HOLA (frases 3–4), hoy. Tres planos:
// 1. el corcho de la fan: ella entra y señala; se encienden la pista de las gafas en «new» y la del reparto en «who's who»;
//    la snitch revolotea de una a otra;
// 2. (corta en «movie») el corcho de cerca: las tijeras sobre la película se encienden en «skipped»; la mano de la fan
//    clava una chincheta en la cuarta pista («?» con la moto) en «clues»; la snitch, perdida, echa «?» en «don't make sense»;
// 3. (corta en «I'm») el campo de quidditch: Atom baja de su sitio y saluda dando botes en «I'm Atom»; la snitch se le
//    acerca y, cuando él la mira, se esconde detrás de él (gag 1); en «Let's find out» Atom vuelve arriba, la snitch sale
//    disparada y Harry corre tras ella con su escoba.''', r'''
const a = (f) => en('preguntas', f), b = (f) => en('hola', f);
const P2 = a(0.45), P3 = b(0);
const nuevo = a(0.189), quien = a(0.244), corto = a(0.499), pistas = a(0.611), noSe = a(0.793), anos = a(0.908);
const explica = b(0.219), mira = b(0.406), vamos = b(0.799);
const C = T.C, P = T.PIEZAS_HP;
const p1 = (t) => {
  T.hoy(R, t, { encuadre: 'corcho', pistas: tramo(t, nuevo - 0.1, nuevo + 0.25) + tramo(t, quien - 0.1, quien + 0.25) });
  // la fan entra desde la librería y señala cada pista según se enciende
  const u = tramo(t, 0.2, nuevo - 0.2), fx = Math.round(lerp(250, 96, u));
  R.actor(EL.chica, fx, 160, t, { dir: -1, anda: u > 0 && u < 1, dedo: t > nuevo - 0.2 && t < a(0.37), habla: t > a(0.37) && Math.sin(t * 8) > 0, sonrisa: t > quien });
  // la snitch va de la pista de las gafas a la del reparto y luego a la de las tijeras
  const cen = [[80, 44], [116, 42], [157, 46], [185, 74]];
  const k = t < nuevo ? -1 : t < quien ? 0 : t < a(0.38) ? 1 : 2;
  const [tx, ty] = k < 0 ? [210, 70] : cen[k], v = tramo(t % 100, 0, 1);
  const sx = tx + Math.sin(t * 5) * (k < 0 ? 26 : 5), sy = ty + Math.sin(t * 8) * 3 * v;
  T.snitch(R, sx, sy, t, { cara: k >= 0 ? 'feliz' : 'normal' });
  T.hoyDelante(R, t, { encuadre: 'corcho' });
};
const p2 = (t) => {
  const pn = 2 + tramo(t, corto - 0.1, corto + 0.25) + tramo(t, pistas - 0.05, pistas + 0.25);
  T.hoy(R, t, { encuadre: 'corcho', camara: 'cerca', pistas: pn });
  // la snitch, de las tijeras a la pista de la moto; se lía y le salen «?»
  const k = t < pistas ? 2 : 3, cen = [[74, 40], [146, 40], [228, 44], [284, 100]], [tx, ty] = cen[k];
  const mv = tramo(t, k === 2 ? P2 : pistas, (k === 2 ? P2 : pistas) + 0.5), px = k === 2 ? 146 : 228;
  const sx = lerp(px, tx, mv) + Math.sin(t * 5) * 5, sy = lerp(k === 2 ? 40 : 44, ty, mv) + Math.sin(t * 9) * 3;
  const lio = t > noSe && t < anos + 0.6;
  T.snitch(R, sx, sy, t, { cara: lio ? 'susto' : 'feliz', s: 1 });
  if (lio) { const n = Math.min(3, 1 + Math.floor((t - noSe) * 2.5)); for (let i = 0; i < n; i++) R.icono('?', Math.round(sx - 30 + i * 14), Math.round(sy - 6 - i * 6 + Math.sin(t * 6 + i)), hex('#ffe890'), C.k, 2); }
  // la mano de la fan entra por abajo a la derecha y clava la chincheta roja en la pista de la moto
  const ent = tramo(t, pistas - 0.7, pistas - 0.05), sal = tramo(t, pistas + 0.45, pistas + 1.1), m = ent * (1 - sal);
  if (t > pistas - 0.05) T.chincheta(R, 284, 138, t, hex('#e83a3a'), {});
  if (m > 0) { const x1 = Math.round(lerp(338, 288, m)), y1 = Math.round(lerp(214, 146, m)) + (t > pistas - 0.1 && t < pistas + 0.15 ? 2 : 0); T.brazo(R, x1 + 46, y1 + 50, x1, y1, '#3a6ad8', -1, { codo: [x1 + 26, y1 + 36] }); }
  T.hoyDelante(R, t, { encuadre: 'corcho', camara: 'cerca' });
};
// Atom baja a saludar al campo y luego vuelve a su sitio (el compañero de arriba a la derecha lo pinta rodar)
const comp0 = R.companero;
let escondida = null;
R.companero = (t, e) => {
  if (t < P3) return comp0(t, e);
  const baja = tramo(t, P3, P3 + 0.6), sube = tramo(t, vamos, vamos + 0.7), u = baja * (1 - sube), ue = u * u * (3 - 2 * u);
  const bote = t > b(0.03) && t < explica + 0.5 ? Math.round(Math.abs(Math.sin((t - b(0.03)) * Math.PI * 2.2)) * 10) : 0;
  const x = Math.round(lerp(297, 170, ue)), y = Math.round(lerp(24, 124, ue)) - bote + Math.round(Math.sin(t * 2.6) * 1.5);
  if (escondida) escondida(x, y);
  const r = lerp(10, 18, ue);
  // en el campo, un halo oscuro detrás para que se lea sobre la hierba
  if (ue > 0.2) R.disco(x, y, Math.round(r * 0.95), hex('#14204a'));
  for (let j = -26; j <= 26; j++) for (let i = -26; i <= 26; i++) { const g = 1 - Math.hypot(i, j) / (r + 6); if (g > 0.25 && (ue < 0.2 ? ((i + j) & 1) : g > 0.45 || ((i + j) & 1))) R.pset(x + i, y + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  if (bote > 0) for (let k = 0; k < 10; k++) { const an = k * Math.PI / 5 + t * 4, rr = r + 8 + Math.sin(t * 9) * 2; R.pset(Math.round(x + Math.cos(an) * rr), Math.round(y + Math.sin(an) * rr), hex('#c8f0ff')); }
  R.atomo(x, y, t, { r, orbita: R.PAL.ATOM[7], energia: bote > 0 ? 0.8 : e });
};
const p3 = (t) => {
  escondida = null;
  T.exterior(R, t, { encuadre: 'quidditch' });
  // Harry y Ron esperan con la escoba; en «Let's find out» Harry sale corriendo detrás de la snitch
  const c = tramo(t, vamos + 0.15, vamos + 1.5), hx = Math.round(lerp(96, 340, c * c)), hy = Math.round(lerp(166, 92, c));
  R.actor(EL.harry, hx, hy, t, { dir: 1, dedo: t > b(0.03) && t < explica + 0.4, sorpresa: t > mira && t < vamos, sonrisa: t > vamos });
  if (c > 0) P.escoba(R, hx + 8, hy + 2, { dir: 1 });
  R.actor(EL.ronJersey, 214, 166, t, { dir: -1, dedo: t > b(0.03) && t < explica, habla: t > explica && t < mira && Math.sin(t * 8) > 0, sorpresa: t > mira });
  // la snitch: viene hacia Atom, y cuando él la mira se esconde detrás; en «find out» sale disparada
  if (t < mira) { const v = tramo(t, P3 + 0.2, mira), sx = lerp(110, 144, v) + Math.sin(t * 5) * 14, sy = lerp(96, 124, v) + Math.sin(t * 9) * 4; T.snitch(R, sx, sy, t, { cara: 'feliz' }); }
  else if (t < vamos + 0.2) escondida = (x, y) => { const asoma = Math.sin((t - mira) * 2.4) > 0.55 ? 13 : 3; T.snitch(R, x + asoma, y + 5, t, { cara: 'susto' }); };
  else { const v = tramo(t, vamos + 0.2, vamos + 1.2); T.snitch(R, lerp(176, 340, v), lerp(128, 96, v) + Math.sin(t * 12) * 4, t, { cara: 'feliz' }); }
  T.exteriorDelante(R, t, { encuadre: 'quidditch' });
};
const efectos = [[nuevo, 'brillo'], [quien, 'pop'], [corto, 'brillo'], [pistas - 0.05, 'golpecito'], [noSe, 'boing'],
  [P3 + 0.1, 'whoosh'], [b(0.04), 'pop'], [mira, 'boing'], [vamos, 'whoosh'], [vamos + 0.3, 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')

E['hp-serie'] = ('La serie', '''// HP-SERIE (frase 5), 2026, cartela «2026». Cuatro planos:
// 1. el plató: la claqueta se abre y chasca en «beginning» con el director que da la orden; la guionista entra con el
//    libro y lo levanta en «book»; la grúa, el tramoyista y el pintor trabajan;
// 2. (corta en «Harry») lo alto de la torre: Harry levanta la piedra roja, que brilla en «Philosopher's Stone»; cuatro
//    jinetes en escoba llegan y, en «coming to HBO», se van a repartirla; Hermione se asombra;
// 3. (corta en «across») el monitor del rodaje: el director señala el castillo en «Latin America»; la guionista llega con
//    su libreta y escribe en «written»; en «Succession» él se vuelve y sonríe;
// 4. (corta en «and several») la sala de montaje: el montador junto a la moviola, que gira; el visor cuenta episodios;
//    el director entra y señala el visor en «directed».''', r'''
const a = (f) => en('nombre', f);
const P2 = a(0.188), P3 = a(0.475), P4 = a(0.754);
const inicio = a(0.033), libroT = a(0.176), piedra = a(0.252), llega = a(0.344), latam = a(0.522), escrita = a(0.605), suc = a(0.731), dirigida = a(0.846);
const C = T.C, P = T.PIEZAS_HP;
const halo = (cx, cy, r, c, k = 0) => { for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1 && ((x * 7 + y * 13 + k) % 5) < (1 - d) * 3.2 && ((x + y) & 1)) R.pset(x, y, c); } };
const p1 = (t) => {
  T.hoy(R, t, { encuadre: 'plato', claqueta: t < inicio ? tramo(t, 1.35, 1.7) : 0 });
  // el director da la orden junto a la claqueta
  R.actor(EL.director, 206, 154, t, { dir: -1, dedo: t > 1.3 && t < inicio + 0.4, habla: t > 1.3 && t < inicio + 0.5 && Math.sin(t * 10) > 0, sonrisa: t > libroT });
  // la guionista entra con el libro y lo levanta en «book»
  const u = tramo(t, inicio + 0.1, libroT - 0.5), gx = Math.round(lerp(40, 128, u)), alto = t > libroT - 0.2;
  const rg = R.actor(EL.guionista, gx, 154, t, { dir: 1, anda: u > 0 && u < 1, sostiene: alto ? [gx + 18, 118] : true, sonrisa: alto });
  P.libro(R, rg.mano[0] + 1, rg.mano[1] + 5, {});
  if (alto) halo(rg.mano[0] + 1, rg.mano[1] - 1, 11, hex('#ffe890'), Math.floor(t * 6));
  T.hoyDelante(R, t, { encuadre: 'plato' });
};
const p2 = (t) => {
  const ne = tramo(t, P2 + 0.1, piedra + 1) - tramo(t, llega, latam - 0.3);
  T.exterior(R, t, { encuadre: 'torre', escobas: ne });
  // Hermione con su libro mira; Harry levanta la piedra y despide a los jinetes
  R.actor(EL.hermione, 86, 160, t, { dir: 1, sorpresa: t > piedra && t < llega, sonrisa: t > llega });
  const arriba = t > piedra - 0.3 && t < llega;
  const rh = R.actor(EL.harry, 128, 160, t, { dir: 1, sostiene: arriba ? [148, 118] : t < llega ? true : false, brazos: t > llega && t < llega + 1.4, sonrisa: t > piedra });
  if (t < llega) { if (arriba) halo(rh.mano[0], rh.mano[1] - 4, 13, hex('#ffe890'), Math.floor(t * 6)); P.piedra(R, rh.mano[0], rh.mano[1] + (arriba ? 4 : 3), { brillo: arriba, t, s: arriba ? 2 : 1 }); }
  T.snitch(R, 180 + Math.sin(t * 3) * 20, 112 + Math.sin(t * 7) * 4, t, { cara: 'feliz' });
  T.exteriorDelante(R, t, { encuadre: 'torre', escobas: ne });
};
const p3 = (t) => {
  T.hoy(R, t, { encuadre: 'plato', camara: 'monitor' });
  // el director señala el monitor; la guionista llega, escribe en «written» y él se vuelve en «Succession»
  R.actor(EL.director, 90, 164, t, { dir: t > suc ? -1 : 1, dedo: t > latam - 0.3 && t < escrita, habla: (t > P3 && t < latam - 0.3 && Math.sin(t * 8) > 0) || (t > suc + 0.3 && Math.sin(t * 8) > 0), sonrisa: t > suc });
  const u = tramo(t, P3 + 0.2, escrita - 0.3), gx = Math.round(lerp(-18, 52, u));
  const rg = R.actor(EL.guionista, gx, 164, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true, sonrisa: t > suc });
  const [mx, my] = rg.mano; R.rect(mx - 3, my - 1, mx + 4, my + 6, C.k); R.rect(mx - 2, my, mx + 3, my + 5, hex('#f6f0dc')); R.rect(mx - 2, my, mx + 3, my, hex('#c8283a'));
  if (t > escrita) { const n = Math.min(4, Math.floor((t - escrita) * 3)); for (let i = 0; i < n; i++) R.linea(mx - 1, my + 2 + i, mx + 1 + ((i * 3 + 1) % 3), my + 2 + i, hex('#3a3a5a')); const lx = mx + Math.round(Math.sin(t * 14) * 2); R.linea(lx, my - 4, lx + 2, my + 1, hex('#e8b830')); }
};
// el visor de la moviola: el fotograma del castillo y el contador de episodios que pasa
const visor = (R, t, cl) => {
  const [x0, y0, x1, y1] = cl;
  for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, y < y0 + 10 ? hex('#1a2050') : hex('#2a2a40'));
  const dx = Math.floor(t * 6) % 3;
  R.poligono([[x0 + 4 + dx, y1], [x0 + 6 + dx, y0 + 8], [x0 + 9 + dx, y0 + 5], [x0 + 12 + dx, y0 + 9], [x0 + 15 + dx, y0 + 4], [x0 + 18 + dx, y0 + 9], [x0 + 21 + dx, y1]], hex('#0e1024'));
  for (const [i, j] of [[8, 11], [13, 10], [17, 12]]) if (Math.sin(t * 3 + i) > -0.5) R.pset(x0 + i + dx, y0 + j, hex('#ffd84a'));
  const n = 1 + Math.floor(tramo(t, P4, dirigida + 1.2) * 7.99);
  R.numero(String(n), x1 - 5, y1 - 3, { centro: true });
};
const p4 = (t) => {
  T.hoy(R, t, { encuadre: 'montaje', pantalla: visor });
  // el montador revisa la película con las tijeras; el director entra y señala el visor en «directed»
  const re = R.actor(EL.editor, 84, 158, t, { dir: 1, sostiene: true, habla: t > dirigida + 0.6 && Math.sin(t * 8) > 0, sonrisa: t > dirigida + 0.4 });
  const [mx, my] = re.mano; for (let i = -3; i <= 3; i++) R.linea(mx + i, my - 6 + Math.abs(i), mx + i, my - 4 + Math.abs(i), i % 2 ? hex('#3a3a3a') : hex('#8a6a3a'));
  const u = tramo(t, P4 + 0.1, dirigida - 0.2), dx = Math.round(lerp(330, 166, u));
  R.actor(EL.director, dx, 158, t, { dir: -1, anda: u > 0 && u < 1, dedo: t > dirigida - 0.1 && t < dirigida + 1.4, habla: t > dirigida && Math.sin(t * 9) > 0 });
  T.snitch(R, 246 + Math.sin(t * 2.4) * 8, 60 + Math.sin(t * 6) * 3, t, { cara: t > dirigida ? 'feliz' : 'normal' });
  T.hoyDelante(R, t, { encuadre: 'montaje' });
};
const efectos = [[inicio, 'palmada'], [libroT, 'brillo'], [P2 + 0.3, 'whoosh'], [piedra, 'brillo'], [llega + 0.2, 'whoosh'],
  [latam - 0.3, 'golpecito'], [escrita, 'lapiz'], [suc, 'pop'], [P4 + 0.2, 'maquina'], [dirigida, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '2026', efectos, año: 2026 });
''')
