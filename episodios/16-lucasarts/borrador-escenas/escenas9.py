E = {}
E['la-vuelven'] = ('Los juegos vuelven', '''// LA-VUELVEN (frases 49–51), 2016 → 2022 → hoy. Cinco planos:
// 1. la fachada de la mansión al atardecer, todavía con los colores de 1993; la pintora entra con su brocha y en
//    «repainted» echa a andar: por donde pasa la brocha, una barrida de luz deja la casa repintada en alta resolución;
//    los dos tentáculos del camino brillan cuando la barrida los alcanza y botan de alegría;
// 2. (corta en «with the tentacles») el pasillo de la mansión, repintado: los dos tentáculos grandes, frente a frente;
//    en «purple» el morado bota y se enciende, en «green» el verde, y en «than ever» se miran y el morado alza los brazos;
// 3. (corta en «And in 2022») el porche de la taberna de día: los dos creadores con canas llegan del bote con su maleta y
//    su petate; en «thirty years» sale un «30» dorado con un reloj; el pirata sale de la taberna y los saluda;
// 4. (corta en «went back») el claro del bosque de día: los dos creadores entran; en «Monkey» el mono de tres cabezas
//    parlotea, en «Return» uno lo señala y el mono saluda; en «Island» el otro se ríe con los brazos en alto;
// 5. (corta en «Many») el estudio de hoy: jóvenes con portátiles; llega una con su taza; en «point» un chico señala la
//    balda de figuras (tentáculo, retrete, calavera, barco), que brillan; en «influence» todos sonríen y en «stories» la
//    del centro alza los brazos con un «!».''', r'''
const a = (f) => en('repinta', f), b = (f) => en('vuelta', f), c = (f) => en('creadores', f);
const P2 = a(0.66), P3 = b(-0.012), P4 = b(0.57), P5 = c(-0.015);
const repinta = a(0.2776), alta = a(0.5036), morado = a(0.78), verde = a(0.8965), nunca = a(0.95);
const treinta = b(0.2534), gilbert = b(0.4322), mono = b(0.6605), vuelve = b(0.7949), isla = b(0.909);
const senala = c(0.273), influye = c(0.586), cuenta = c(0.869);
const K = hex('#14101c');
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
// la brocha gorda de la pintora, en su mano: mango de madera y pelo cargado de pintura que gotea
const brocha = ([mx, my], t) => {
  R.linea(mx, my, mx + 7, my - 9, K); R.linea(mx + 1, my, mx + 8, my - 9, hex('#c8944a')); R.linea(mx, my - 1, mx + 7, my - 10, hex('#e8b86a'));
  R.poligono([[mx + 5, my - 12], [mx + 12, my - 17], [mx + 15, my - 13], [mx + 9, my - 8]], K);
  R.poligono([[mx + 6, my - 12], [mx + 12, my - 16], [mx + 14, my - 13], [mx + 9, my - 9]], hex('#c8ccd4'));
  R.poligono([[mx + 10, my - 15], [mx + 13, my - 17], [mx + 17, my - 12], [mx + 14, my - 10]], hex('#b67ae6'));
  R.pset(mx + 14, my - 11, hex('#7ad86c')); R.pset(mx + 16, my - 12, hex('#e8803a'));
  const d = (t * 2.2) % 1; R.pset(mx + 15, Math.round(my - 10 + d * 9), hex('#b67ae6'));
};
// lo viejo: en bloques de 3 px (la resolución de entonces) y un poco más apagado
const gris = (c) => { const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255, l = (r + g + b) / 3, m = (v) => Math.round(v * 0.62 + l * 0.38 - 10) & 255; return (c & 0xff000000) | (m(b) << 16) | (m(g) << 8) | m(r); };
const p1 = (t) => {
  // la pintora: entra, se para, y en «repainted» cruza el jardín; la barrida de luz va con la punta de la brocha
  const w0 = tramo(t, 0.5, 2.3), w1 = tramo(t, repinta - 0.1, alta + 0.5);
  const px = Math.round(w1 > 0 ? lerp(34, 300, w1) : lerp(-24, 34, w0)), sx = w1 > 0 ? (w1 >= 1 ? 400 : px + 20) : -10;
  const o1 = { encuadre: 'fachada', luz: 'atardecer', anyo: 1993 };
  if (sx <= 0) { T.mansion(R, t, o1); const B = R.buf; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = B[(y - y % 3) * 320 + x - x % 3]; for (let i = 0; i < B.length; i++) B[i] = gris(B[i]); }
  else if (sx < 320) T.mansion(R, t, o1);
  if (sx > 0) { const viejo = sx < 320 ? R.buf.slice() : null; T.mansion(R, t, { ...o1, hd: true });
    if (viejo) { const B = R.buf, x0 = Math.max(0, sx); for (let y = 0; y < 180; y++) for (let x = x0; x < 320; x++) B[y * 320 + x] = gris(viejo[(y - y % 3) * 320 + x - x % 3]);
      // el filo de la barrida: una cortina de luz tramada con chispas de colores que caen
      for (let y = 16; y < 180; y++) for (let d = -3; d <= 2; d++) { const x = sx + d; if (x < 0 || x > 319) continue; if (1 - Math.abs(d) / 3.5 > bay(x, y + Math.floor(t * 20))) B[y * 320 + x] = d === 0 ? hex('#fffbe8') : hex('#ffe8a8'); }
      for (let k = 0; k < 14; k++) { const f = (t * 1.4 + k * 0.137) % 1, x = Math.round(sx - 2 - f * 10 + Math.sin(k * 3.1) * 3), y = Math.round(20 + ((k * 47) % 150) + f * 14); R.pset(x, y, [hex('#b67ae6'), hex('#7ad86c'), hex('#ffe070'), hex('#ff8a6a')][k % 4]); if (k % 3 === 0) R.pset(x, y + 1, hex('#ffffff')); } } }
  // los dos tentáculos en el camino: miran a la pintora y se encienden cuando la barrida los alcanza
  for (const [tx, col, dd] of [[150, 'morado', 1], [174, 'verde', -1]]) {
    const pasa = sx > tx ? tramo(t, repinta + (tx - 34) / 266 * (alta + 0.6 - repinta), repinta + (tx - 34) / 266 * (alta + 0.6 - repinta) + 0.5) : 0;
    const mira = w1 > 0 && w1 < 1 ? (px > tx ? 1 : -1) : dd;
    T.tentaculo(R, tx, 166, t, { color: col, s: 1.15, dir: mira, brillo: pasa, expresion: pasa > 0.3 ? 'feliz' : w1 > 0 ? 'sorpresa' : 'normal', salto: pasa > 0 && pasa < 1 ? Math.sin(pasa * Math.PI) * 6 : 0, brazos: col === 'morado' ? 1 : 0, pose: pasa > 0.6 && col === 'morado' ? 'arriba' : 'normal' });
  }
  const r = R.actor(EL.disenadora, px, 176, t, { dir: 1, anda: (w0 > 0 && w0 < 1) || (w1 > 0 && w1 < 1), sostiene: [px + 17, 160], sonrisa: w1 > 0.95 || w0 >= 1 });
  brocha(r.mano, t);
};
const p2 = (t) => {
  T.mansion(R, t, { encuadre: 'pasillo', luz: 'atardecer', hd: true });
  const jm = tramo(t, morado - 0.1, morado + 0.45), jv = tramo(t, verde - 0.1, verde + 0.45);
  const bm = tramo(t, morado, morado + 0.6), bv = tramo(t, verde, verde + 0.6), mir = t > nunca - 0.1;
  const hm = T.tentaculo(R, 124, 160, t, { color: 'morado', s: 2, dir: 1, brazos: 1, pose: mir ? 'arriba' : 'normal', brillo: bm, salto: Math.sin(jm * Math.PI) * 9, expresion: mir ? 'malvado' : t > morado ? 'feliz' : 'normal', mira: [t > verde && !mir ? 1 : 0.4, 0] });
  T.tentaculo(R, 200, 160, t, { color: 'verde', s: 2, dir: -1, brillo: bv, salto: Math.sin(jv * Math.PI) * 9, expresion: mir ? 'feliz' : t > verde ? 'feliz' : t > morado ? 'sorpresa' : 'normal', habla: mir && Math.sin(t * 9) > 0, mira: [-1, 0] });
  // los destellos de color al encenderse cada uno
  for (const [cx, u, col] of [[124, bm, hex('#e6c8ff')], [200, bv, hex('#d8ffb0')]]) if (u > 0 && u < 1) for (let k = 0; k < 8; k++) { const an = k * 0.785 + 0.3, d = 14 + u * 26; R.linea(Math.round(cx + Math.cos(an) * d * 0.7), Math.round(132 + Math.sin(an) * d * 0.7), Math.round(cx + Math.cos(an) * d), Math.round(132 + Math.sin(an) * d), col); }
};
// el bote de remos amarrado al porche, que se mece en el agua
const bote = (t) => { const y = 136 + Math.round(Math.sin(t * 1.8)), x = 270;
  R.poligono([[x, y - 6], [x + 46, y - 6], [x + 40, y + 1], [x + 5, y + 1]], K); R.poligono([[x + 1, y - 5], [x + 45, y - 5], [x + 39, y], [x + 6, y]], hex('#8a5a2a'));
  R.linea(x + 2, y - 5, x + 44, y - 5, hex('#c89058')); R.linea(x + 8, y - 2, x + 38, y - 2, hex('#6a4220'));
  R.linea(x + 14, y - 9, x + 30, y - 1, K); R.linea(x + 15, y - 9, x + 31, y - 1, hex('#c8a070'));
  R.linea(x - 2, y - 5, 262, 150, hex('#d8c8a0'));
  for (let k = 0; k < 5; k++) { const f = (t * 0.7 + k * 0.2) % 1; R.pset(x + 3 + k * 9 + Math.round(f * 4), y + 2, hex('#e8f4ff')); } };
const p3 = (t) => {
  const g = T.isla(R, t, { encuadre: 'muelle', camara: 'taberna', luz: 'dia' });
  bote(t);
  // el mono del banco se come un plátano
  T.bicho(R, 52, 140, t, { quien: 'mono', dir: 1, platano: true });
  // el pirata sale por la puerta en «Gilbert» y saluda
  const s = tramo(t, gilbert - 0.9, gilbert - 0.1);
  if (s > 0) R.actor(EL.pirata, Math.round(lerp(118, 146, s)), Math.round(lerp(140, 156, s)), t, { dir: 1, anda: s < 1, brazos: t > gilbert && t < gilbert + 0.9, habla: t > gilbert + 0.9 && Math.sin(t * 8) > 0, sonrisa: s >= 1 });
  // los dos creadores con canas llegan desde el bote, uno con la maleta y el otro con el petate
  const u = tramo(t, P3 + 0.15, treinta - 0.15), u2 = tramo(t, P3 + 0.5, treinta + 0.2);
  const x1 = Math.round(lerp(300, 196, u)), x2 = Math.round(lerp(326, 226, u2));
  const r2 = R.actor(EL.creador2, x2, 158, t, { dir: -1, anda: u2 > 0 && u2 < 1, sostiene: true, sonrisa: t > gilbert, habla: t > gilbert + 0.4 && t < gilbert + 1.2 && Math.sin(t * 9) > 0 });
  { const [mx, my] = r2.mano; R.disco(mx - 2, my + 3, 5, K); R.disco(mx - 2, my + 3, 4, hex('#c8b890')); R.linea(mx - 5, my + 1, mx + 1, my + 1, hex('#8a7a5a')); R.pset(mx - 3, my + 4, hex('#e8dcb8')); }
  const r1 = R.actor(EL.creador, x1, 162, t, { dir: -1, anda: u > 0 && u < 1, sostiene: t < gilbert ? true : null, brazos: t > gilbert && t < gilbert + 0.8, sonrisa: t > treinta });
  if (t < gilbert) { const [mx, my] = r1.mano; R.rect(mx - 6, my + 1, mx + 4, my + 8, K); R.rect(mx - 5, my + 2, mx + 3, my + 7, hex('#8a3a2a')); R.rect(mx - 5, my + 2, mx + 3, my + 2, hex('#b85a3a')); R.rect(mx - 2, my - 1, mx, my + 1, K); R.pset(mx - 4, my + 5, hex('#e8c040')); }
  // «más de treinta años después»: un 30 dorado con un reloj de arena, sobre ellos
  const e = tramo(t, treinta, treinta + 0.35) - tramo(t, gilbert - 0.2, gilbert + 0.2);
  if (e > 0) { const y = Math.round(lerp(120, 108, e)); R.numero('30', 206, y, { tam: 16, centro: true }); R.icono('reloj', 228, y - 13, hex('#ffe070'), K, 2);
    for (let k = 0; k < 6; k++) { const an = t * 3 + k * 1.05, rr = 22 + Math.sin(t * 5 + k) * 2; if (Math.sin(t * 7 + k) > 0) R.pset(Math.round(214 + Math.cos(an) * rr), Math.round(y - 8 + Math.sin(an) * rr * 0.5), hex('#fff2a8')); } }
};
const p4 = (t) => {
  T.isla(R, t, { encuadre: 'bosque', camara: 'claro', luz: 'dia' });
  const u = tramo(t, P4 + 0.1, mono + 0.4), u2 = tramo(t, P4 + 0.4, mono + 0.8);
  const saluda = t > vuelve - 0.1;
  T.bicho(R, 198, 158, t, { quien: 'mono3', s: 2, dir: -1, habla: t > mono && t < vuelve, saluda });
  if (t > mono && t < vuelve) R.icono('!', 196, 98, hex('#ffe070'), K, 2);
  R.actor(EL.creador2, Math.round(lerp(-30, 82, u2)), 160, t, { dir: 1, anda: u2 > 0 && u2 < 1, sorpresa: t > mono && t < isla, brazos: t > isla, sonrisa: t > isla, habla: t > isla + 0.3 && Math.sin(t * 9) > 0 });
  R.actor(EL.creador, Math.round(lerp(-8, 118, u)), 164, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > vuelve && t < isla + 0.6, sonrisa: t > vuelve });
};
const p5 = (t) => {
  T.hoy(R, t, { encuadre: 'estudioHoy' });
  // las figuras de la balda brillan cuando la señalan
  const gl = tramo(t, senala, senala + 0.4) - tramo(t, influye + 0.6, influye + 1.2);
  if (gl > 0) for (let k = 0; k < 10; k++) { const f = (t * 1.3 + k * 0.1) % 1, x = 168 + ((k * 23) % 54), y = Math.round(52 - f * 16); if (f < gl) { R.pset(x, y, hex('#fff2a8')); if (k % 3 === 0) { R.pset(x - 1, y, hex('#e8c040')); R.pset(x + 1, y, hex('#e8c040')); R.pset(x, y - 1, hex('#e8c040')); } } }
  // estrellitas de cuatro puntas alrededor de la balda
  if (gl > 0) for (let k = 0; k < 5; k++) { const f = Math.sin(t * 5 + k * 1.3); if (f < 0.2) continue; const x = 164 + k * 14, y = 40 + (k % 2) * 16, n = Math.round(1 + f * 2 * gl); R.linea(x - n, y, x + n, y, hex('#fff2a8')); R.linea(x, y - n, x, y + n, hex('#fff2a8')); R.pset(x, y, hex('#ffffff')); }
  // al fondo pasa una diseñadora con un guion gráfico enrollado bajo el brazo
  { const v = tramo(t, P5 + 0.6, P5 + 6), x = Math.round(lerp(-20, 340, v)); const q = R.actor(EL.disenadora, x, 136, t, { dir: 1, anda: v > 0 && v < 1, sostiene: true });
    const [mx, my] = q.mano; R.rect(mx - 9, my - 1, mx + 5, my + 2, K); R.rect(mx - 8, my, mx + 4, my + 1, hex('#f2eee2')); R.pset(mx - 8, my, hex('#c8c0b0')); R.pset(mx + 4, my + 1, hex('#e8803a')); }
  const mira = t > influye;
  R.actor(EL.joven2, 60, 146, t, { dir: mira ? 1 : 1, sonrisa: mira, habla: !mira && Math.sin(t * 5) > 0.5 });
  R.actor({ ...EL.joven, pal: { ...EL.joven.pal } }, 116, 146, t, { dir: 1, pal: { C: hex('#3a8ac8'), c: hex('#2a6a9a'), W: hex('#3a8ac8') }, sonrisa: mira, brazos: t > cuenta && t < cuenta + 1.4, habla: t > cuenta });
  R.actor(EL.chico, 176, 146, t, { dir: t > senala - 0.3 ? 1 : -1, dedo: t > senala && t < influye + 0.4, sonrisa: t > influye });
  R.actor(EL.joven2, 232, 146, t, { dir: -1, pal: { C: hex('#3ab88a'), c: hex('#2a8a6a'), W: hex('#3ab88a'), H: hex('#1c1424') }, sonrisa: mira });
  // llega una más con su taza humeante
  const u = tramo(t, P5 + 0.2, senala - 0.2), x = Math.round(lerp(338, 286, u));
  const r = R.actor(EL.joven, x, 146, t, { dir: -1, anda: u > 0 && u < 1, sostiene: true, sonrisa: t > influye });
  { const [mx, my] = r.mano; R.rect(mx - 3, my - 2, mx + 2, my + 4, K); R.rect(mx - 2, my - 1, mx + 1, my + 3, hex('#f2eee2')); R.pset(mx + 3, my + 1, K); const v = (t * 1.5) % 1; R.pset(mx - 1, Math.round(my - 4 - v * 6), hex('#c8c8d4')); R.pset(mx, Math.round(my - 7 - v * 5), hex('#a8a8b8')); }
  if (t > cuenta && t < cuenta + 1.4) R.icono('!', 120, 100, hex('#ffe070'), K, 2);
};
const año = (t) => t < P3 ? 2016 : t < P5 ? 2022 : 2026;
const efectos = [[repinta, 'whoosh'], [alta + 0.3, 'brillo'], [morado, 'boing'], [verde, 'boing'], [nunca, 'brillo'], [P3 + 0.2, 'ola'], [treinta, 'brillo'], [gilbert - 0.9, 'puerta'], [vuelve, 'palmada'], [senala, 'brillo'], [cuenta, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')

E['la-cierre'] = ('Cierre', '''// LA-CIERRE (frases 52–54), hoy. Cuatro planos:
// 1. la estantería del cuarto de los noventa: la mano del chico, ya mayor, sopla el polvo de una caja vieja en
//    «remember» y la caja se abre: dentro, el disquete y el mapa;
// 2. (corta en «They never») el monitor de hoy con la aventura: el cursor coge el pollo de goma y lo usa con la puerta;
//    en «wrong» sale una X roja y el chaval del juego se encoge de hombros y se ríe; en «look again» el cursor mira el
//    felpudo: «!», aparece la llave y la puerta se abre;
// 3. (corta en «And somewhere») la orilla al atardecer, de lejos: el río de lodo que baja hacia el sol, la mansión en
//    silueta en la colina; los dos tentáculos en la orilla; en «telling» el verde le habla al morado, que mira el río;
// 4. (corta en «not to drink») la orilla de cerca: el verde le dice que no; el morado mira el lodo con antojo y se
//    inclina en «drink»; revienta una burbuja en «river»; en «explain next» el morado se vuelve hacia nosotros con su
//    sonrisa de siempre, el verde pone los ojos en blanco, y una burbuja deja un «?» que sube.''', r'''
const r = (f) => en('regla', f), s = (f) => en('rio', f), d = (f) => en('adios', f);
const P2 = r(0.37), P3 = s(-0.015), P4 = s(0.735);
const recuerda = r(0.1265), mal = r(0.601), invita = r(0.761), mira = r(0.89);
const verdeD = s(0.31), dice = s(0.546), moradoD = s(0.627), no = s(0.747), bebe = s(0.828), rio = s(0.921);
const explica = d(0.415), sig = d(0.59);
const K = hex('#14101c');
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const rampa = (cols, v, x, y) => { v = Math.max(0, Math.min(cols.length - 1.001, v)); const i = Math.floor(v); return v - i > bay(x, y) ? cols[i + 1] ?? cols[i] : cols[i]; };
const p1 = (t) => {
  const ab = tramo(t, recuerda + 0.5, recuerda + 1.6);
  const g = T.hoy(R, t, { encuadre: 'cuarto90', camara: 'estanteria', abre: ab * 0.2 });
  const cj = (g.cajas && g.cajas[0]) || [20, 66, 70, 158];
  const cx = Math.round((cj[0] + cj[2]) / 2), cy = Math.round((cj[1] + cj[3]) / 2);
  // el polvo que vuela al soplar en «remember»
  const sp = tramo(t, recuerda - 0.2, recuerda + 1.4);
  for (let k = 0; k < 26; k++) { const f = sp > 0 && sp < 1 ? sp : 0, x = Math.round(cj[0] + ((k * 37) % (cj[2] - cj[0])) + f * (20 + (k % 5) * 14)), y = Math.round(cj[1] + 4 + ((k * 13) % 30) - f * (10 + (k % 3) * 8) + Math.sin(t * 3 + k) * 2);
    if (sp <= 0) { if (k % 2 === 0) R.pset(cj[0] + ((k * 37) % (cj[2] - cj[0])), cj[1] + 1 + (k % 3), hex('#b8b0a0')); } else if (f < 1) R.pset(x, y, k % 3 ? hex('#d8d0c0') : hex('#a8a090')); }
  // la mano entra por abajo a la derecha, toca la caja y la saca un poco
  const e = tramo(t, 0.5, recuerda - 0.2) - tramo(t, P2 - 0.9, P2 - 0.2);
  if (e > 0) T.brazo(R, lerp(96, 92, e), lerp(214, 200, e), lerp(100, cj[2] - 2, e), lerp(206, cj[3] - 14, e), '#7a5a3a', -1, { codo: [lerp(100, 98, e), lerp(214, 186, e)] });
  if (ab > 0.3) for (let k = 0; k < 6; k++) { const an = t * 2 + k * 1.05, rr = 16 + Math.sin(t * 4 + k) * 3; if (Math.sin(t * 6 + k * 2) > 0) R.pset(Math.round(cx + Math.cos(an) * rr), Math.round(cy - 10 + Math.sin(an) * rr * 0.7), hex('#fff2a8')); }
};
// el chaval del juego, la puerta y el felpudo dentro del monitor
const p2 = (t) => {
  const g = T.hoy(R, t, { encuadre: 'cuartoHoy', camara: 'pantalla', hd: 1 });
  const [x0, y0, x1, y1] = g.pantalla;
  const yb = y1 - 30, X = (f) => Math.round(x0 + (x1 - x0) * f);
  // la habitación del juego: pared de papel pintado, zócalo, suelo de tablas
  R.recorte([x0, y0, x1, yb]);
  for (let y = y0; y <= yb; y++) for (let x = x0; x <= x1; x++) { const pared = y < yb - 26;
    R.pset(x, y, pared ? (((x >> 3) + (y >> 3)) & 1 ? hex('#3a7a7a') : hex('#327070')) : y < yb - 22 ? hex('#7a2a3a') : ((x + (y >> 2) * 7) % 23 === 0 ? hex('#5a3a22') : y % 5 === 0 ? hex('#7a5232') : hex('#8a6038'))); }
  for (let x = x0; x <= x1; x += 9) for (let y = y0 + 4; y < yb - 28; y += 9) R.pset(x + ((y >> 3) & 1) * 4, y, hex('#5aa8a0'));
  // un cuadro torcido y una lámpara
  R.rect(X(0.1), y0 + 14, X(0.1) + 22, y0 + 32, K); R.rect(X(0.1) + 2, y0 + 16, X(0.1) + 20, y0 + 30, hex('#e8a84a')); R.disco(X(0.1) + 11, y0 + 25, 4, hex('#b67ae6'));
  { const lx = X(0.78), sw = Math.round(Math.sin(t * 1.4) * 2); R.linea(lx, y0, lx + sw, y0 + 12, K); R.poligono([[lx + sw - 6, y0 + 18], [lx + sw - 3, y0 + 12], [lx + sw + 3, y0 + 12], [lx + sw + 6, y0 + 18]], hex('#e8c040')); }
  // la puerta: se abre al final
  const ab = tramo(t, mira + 0.35, mira + 0.9), dx = X(0.52), dw = 26, dh = 44, dy = yb - 22;
  R.rect(dx - 2, dy - dh - 2, dx + dw + 2, dy, K); R.rect(dx, dy - dh, dx + dw, dy, hex('#1a1a24'));
  if (ab > 0) { R.rect(dx + 1, dy - dh + 1, dx + dw - 1, dy, hex('#ffe8a0')); for (let k = 0; k < 5; k++) R.linea(dx + 4 + k * 5, dy, dx - 8 + k * 9, dy + 18, hex('#ffe070')); }
  const hw = Math.round(dw * (1 - ab * 0.75)); R.rect(dx, dy - dh, dx + hw, dy, hex('#7a3a2a')); R.rect(dx + 2, dy - dh + 3, dx + hw - 2, dy - dh + 18, hex('#8a4a32')); R.rect(dx + 2, dy - dh + 22, dx + hw - 2, dy - 4, hex('#8a4a32')); if (hw > 6) R.disco(dx + hw - 4, dy - 20, 1.6, hex('#e8c040'));
  // el felpudo y la llave escondida
  const fx = dx - 4; R.rect(fx, dy + 1, fx + 34, dy + 5, K); R.rect(fx + 1, dy + 2, fx + 33, dy + 4, hex('#b8843a')); for (let x = fx + 2; x < fx + 33; x += 3) R.pset(x, dy + 3, hex('#8a5a22'));
  const ll = tramo(t, mira, mira + 0.3);
  if (ll > 0) { const ky = Math.round(dy + 2 - ll * 10); R.disco(fx + 16, ky, 3, K); R.disco(fx + 16, ky, 2, hex('#ffd84a')); R.rect(fx + 18, ky, fx + 25, ky + 1, hex('#ffd84a')); R.pset(fx + 23, ky + 2, hex('#ffd84a')); }
  // el chaval: espera, se encoge en «wrong» y se ríe; luego entra por la puerta
  const en2 = tramo(t, mira + 0.8, P3 - 0.2), cxj = Math.round(lerp(X(0.3), dx + 10, en2));
  if (en2 < 1) R.actor(EL.chico, cxj, dy + 3, t, { dir: 1, anda: en2 > 0, sorpresa: t > mal && t < mal + 0.6, sonrisa: t > mal + 0.6, habla: t > mal + 0.6 && t < invita && Math.sin(t * 10) > 0 });
  // la X roja en «wrong» y el «!» en «look again»
  if (t > mal && t < mal + 1.1 && Math.floor(t * 6) % 3) R.icono('X', dx + 6, dy - 34, hex('#ff3a3a'), K, 3);
  if (t > mira && t < mira + 1.2) R.icono('!', fx + 14, dy - 22, hex('#ffe070'), K, 3);
  R.recorte(null);
  // la línea de verbos del juego, abajo en el monitor; el cursor coge el pollo, lo usa con la puerta y luego mira
  const vc = [x0, yb + 1, x1, y1];
  const fase = t < mal ? 0 : t < invita ? 1 : 2;
  const tgtB = t < P2 + 0.9 ? [X(0.82), yb + 22] : t < mal - 0.1 ? [dx + 13, dy - 22] : t < invita + 0.2 ? [dx + 13, dy - 22] : t < mira - 0.25 ? [X(0.08), yb + 10] : [fx + 16, dy + 2];
  const prevT = t < P2 + 0.9 ? [X(0.5), yb - 40] : t < mal - 0.1 ? [X(0.82), yb + 22] : t < invita + 0.2 ? [dx + 13, dy - 22] : t < mira - 0.25 ? [dx + 13, dy - 22] : [X(0.08), yb + 10];
  const t0 = t < P2 + 0.9 ? P2 : t < mal - 0.1 ? P2 + 0.9 : t < invita + 0.2 ? mal - 0.1 : t < mira - 0.25 ? invita + 0.2 : mira - 0.25;
  const m = tramo(t, t0, t0 + 0.55), cur = [Math.round(lerp(prevT[0], tgtB[0], m)), Math.round(lerp(prevT[1], tgtB[1], m))];
  T.verbos(R, t, { caja: vc, activo: fase === 2 ? 'mirar' : 'usar', pulsa: fase === 2 ? tramo(t, mira - 0.25, mira) : tramo(t, P2 + 0.6, P2 + 0.9), frase: fase === 2 ? ['mirar', null] : ['usar', t > P2 + 1.1 ? 'pollo' : null], inventario: ['pollo', 'mapa', 'vela', 'moneda'], cursor: cur });
  // si lleva el pollo, el pollo va pegado al cursor
  if (t > P2 + 1.1 && t < mal + 0.4) { const [qx, qy] = cur; R.disco(qx + 6, qy + 4, 3, K); R.disco(qx + 6, qy + 4, 2.2, hex('#f8e070')); R.pset(qx + 9, qy + 3, hex('#e8803a')); R.pset(qx + 5, qy + 1, hex('#e83a3a')); }
  // la mano del jugador en el ratón, abajo a la derecha, que sigue al cursor
  const mx = Math.round(296 + (cur[0] - 160) * 0.04), my = Math.round(166 + (cur[1] - 90) * 0.04);
  R.disco(mx + 1, my + 5, 7, hex('#a8a8b0')); R.disco(mx, my + 3, 7, K); R.disco(mx, my + 3, 6, hex('#e8e8ee')); R.linea(mx, my - 3, mx, my + 1, hex('#a8a8b8'));
  T.brazo(R, 334, 204, mx + 2, my + 2, '#7a5a3a', -1, { codo: [326, 186] });
};
// ── la orilla al atardecer, de lejos (fondo local) ─────────────────────────────────────────────────────────────────
let fijo = null;
const CIELO = ['#2a1e4a', '#3e2458', '#5a2c64', '#7e3a68', '#a84a62', '#d0645a', '#ec8a56', '#f8b464', '#ffd890'].map(hex);
const LODO = ['#0e2a12', '#184a1a', '#24702a', '#3a9a34', '#5ac046', '#94e468', '#d0ff9c'].map(hex);
const HIERBA = ['#1e1a22', '#2a2826', '#38362a', '#4a4630', '#5e5434', '#7a6438', '#9a7440'].map(hex);
const h2 = (a, b) => { const v = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return v - Math.floor(v); };
const rioL = (y) => lerp(140, -60, ((y - 100) / 80) ** 1.15), rioR = (y) => lerp(168, 214, ((y - 100) / 80) ** 1.3);
const fondoOrilla = () => {
  const b = R.nuevo(), prev = R.usar(b);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rampa(CIELO, (y / 100) * 8.2 + Math.sin(x * 0.05 + y * 0.2) * 0.15, x, y));
  // el sol que se pone, con bandas
  for (let y = 70; y <= 100; y++) for (let x = 88; x <= 136; x++) { const dd = Math.hypot(x - 112, y - 94); if (dd < 17 && !((y === 84 || y === 89 || y === 93) && x % 2)) R.pset(x, y, dd > 15 ? hex('#ffb85a') : y < 84 ? hex('#fff4c8') : hex('#ffe08a')); }
  // las colinas lejanas, en dos términos, con árboles
  const c1 = (x) => 86 - 10 * Math.exp(-(((x - 60) / 50) ** 2)) - 6 * Math.sin(x * 0.03) - 14 * Math.exp(-(((x - 236) / 46) ** 2));
  for (let x = 0; x < 320; x++) for (let y = Math.round(c1(x)); y < 104; y++) R.pset(x, y, rampa([hex('#3e2448'), hex('#4e2c52'), hex('#5e3458')], 2 - (y - c1(x)) * 0.12, x, y));
  for (const [tx, h] of [[22, 10], [34, 14], [48, 9], [178, 8], [190, 12], [292, 11], [306, 15]]) { const yb = Math.round(c1(tx)) + 1; R.linea(tx, yb, tx, yb - h, hex('#2a1838')); for (let k = 0; k < h - 3; k++) { const w = Math.round((h - k) * 0.35); R.linea(tx - w, yb - 3 - k, tx + w, yb - 3 - k, hex('#2a1838')); } }
  // la mansión en silueta sobre la colina de la derecha: cuerpo, torre torcida con cúpula y antena, chimenea
  { const col = hex('#22142e'), mx = 236, my = Math.round(c1(236)) + 2;
    R.poligono([[mx - 30, my], [mx - 30, my - 20], [mx - 34, my - 20], [mx - 14, my - 38], [mx + 4, my - 22], [mx + 4, my]], col);
    R.poligono([[mx + 2, my], [mx + 6, my - 40], [mx + 20, my - 42], [mx + 18, my]], col); R.disco(mx + 13, my - 44, 8, col); R.linea(mx + 11, my - 51, mx + 8, my - 60, col); R.linea(mx + 15, my - 51, mx + 18, my - 60, col); R.rect(mx - 2, my - 34, mx + 1, my - 26, col);
    R.poligono([[mx - 26, my - 26], [mx - 22, my - 26], [mx - 21, my - 34], [mx - 25, my - 35]], col); R.poligono([[mx - 40, my], [mx - 40, my - 10], [mx - 34, my - 16], [mx - 28, my - 10], [mx - 28, my]], col); }
  // las dos orillas: tierra y hierba seca tramadas, encendidas por el sol bajo y por el brillo verde del lodo
  for (let y = 100; y < 180; y++) { const L = rioL(y), Rr = rioR(y);
    for (let x = 0; x < 320; x++) { if (x >= L - 0.5 && x <= Rr + 0.5) continue; const borde = Math.min(Math.abs(x - L), Math.abs(x - Rr)), mota = h2(x >> 1, y >> 1);
      let v = 2.4 + (y - 100) * 0.012 + Math.max(0, 1 - borde / 22) * 1.6 + (x < 160 ? 0.6 : 0) - (mota < 0.12 ? 1 : 0) + (mota > 0.92 ? 0.8 : 0);
      if (borde < 4) { R.pset(x, y, borde < 1.5 ? hex('#a8f07a') : borde < 2.6 ? hex('#3a2a1a') : hex('#5a4228')); continue; }
      const lejos = (y - 100) / 9; if (lejos < 1 && lejos < bay(x, y) + 0.15) { R.pset(x, y, lejos < 0.4 ? hex('#4e2c52') : hex('#4a3a3e')); continue; }
      R.pset(x, y, rampa(HIERBA, v, x, y)); } }
  // matas de hierba de tres tonos con la punta dorada, flores pequeñas y piedras
  for (let k = 0; k < 150; k++) { const y = 104 + Math.floor(h2(k, 7) * 75), x = Math.floor(h2(k, 3) * 320); if (x > rioL(y) - 5 && x < rioR(y) + 5) continue; const hh = 2 + Math.round((y - 100) / 14 + h2(k, 5) * 3);
    for (const [dx, lean, c] of [[-1, -1, '#4a5228'], [0, 0, '#6a7a34'], [1, 1, '#8a8a3e']]) R.linea(x + dx, y, x + dx + lean, y - hh + Math.abs(dx), hex(c)); R.pset(x, y - hh, hex('#e8b45a')); }
  for (let k = 0; k < 26; k++) { const y = 110 + Math.floor(h2(k, 11) * 66), x = Math.floor(h2(k, 13) * 320); if (x > rioL(y) - 4 && x < rioR(y) + 4) continue; R.pset(x, y, k % 3 ? hex('#c87ae6') : hex('#ffe070')); R.pset(x, y + 1, hex('#3a5a28')); }
  for (const [px, py, pr] of [[300, 172, 6], [312, 160, 4], [36, 112, 3], [292, 128, 3], [214, 170, 3], [278, 176, 3]]) { R.disco(px + 1, py + 1, pr + 1, hex('#14101c')); R.disco(px, py, pr + 1, K); R.disco(px, py, pr, hex('#5a5262')); R.disco(px - 1, py - 1, pr * 0.55, hex('#8a7a8a')); R.pset(Math.round(px - pr * 0.5), Math.round(py - pr * 0.6), hex('#e8a87a')); }
  // un tronco caído en la orilla de acá
  { const lx = 288, ly = 140; R.rect(lx, ly - 5, lx + 30, ly, K); R.rect(lx + 1, ly - 4, lx + 30, ly - 1, hex('#5a3a22')); R.rect(lx + 1, ly - 4, lx + 30, ly - 4, hex('#a8704a')); R.disco(lx + 1, ly - 2, 3, K); R.disco(lx + 1, ly - 2, 2, hex('#c89060')); R.pset(lx + 1, ly - 2, hex('#7a5232')); for (let x = lx + 5; x < lx + 30; x += 6) R.pset(x, ly - 2, hex('#3a2414')); R.pset(lx + 12, ly - 6, hex('#e85a5a')); R.pset(lx + 13, ly - 6, hex('#f2eee2')); }
  // el cartel de peligro en la orilla de enfrente, con su calavera
  { const sx = 70, sy = 126; R.rect(sx, sy, sx + 1, sy + 18, K); R.poligono([[sx - 9, sy + 2], [sx + 10, sy + 2], [sx + 1, sy - 14]], K); R.poligono([[sx - 7, sy + 1], [sx + 8, sy + 1], [sx + 1, sy - 12]], hex('#e8c040')); R.icono('calavera', sx - 2, sy - 7, K, hex('#e8c040'), 1); }
  // el bidón tumbado que gotea
  { const bx = 34, by = 118; R.rect(bx - 10, by - 8, bx + 8, by + 2, K); R.rect(bx - 9, by - 7, bx + 7, by + 1, hex('#7a8a3a')); R.rect(bx - 9, by - 4, bx + 7, by - 3, hex('#5a6a2a')); R.disco(bx + 9, by - 3, 4, K); R.disco(bx + 9, by - 3, 3, hex('#5a6a2a')); }
  R.usar(prev); return b;
};
const p3 = (t) => {
  if (!fijo) fijo = fondoOrilla();
  R.copiar(fijo);
  // estrellas que salen arriba (lejos de la barra del año y de Atom)
  for (let k = 0; k < 22; k++) { const x = (k * 53 + 11) % 320, y = 16 + (k * 17) % 26; if ((x > 270 && y < 48) || (x > 14 && x < 176 && y < 18)) continue; if (Math.sin(t * 2 + k * 1.7) > -0.2) R.pset(x, y, k % 4 ? hex('#c8b8e8') : hex('#ffffff')); }
  // nubes alargadas de tres tonos a tres velocidades, con la panza encendida por el sol
  for (const [cy, v, w, n, k0] of [[48, 1.2, 44, 3, 0], [62, 2.4, 56, 2, 1], [76, 4, 70, 2, 2]]) for (let i = 0; i < n; i++) { const cx = ((i * 160 + k0 * 70 + t * v) % 420) - 50;
    for (let y = cy - 3; y <= cy + 2; y++) for (let x = Math.round(cx - w / 2); x <= cx + w / 2; x++) { const e = Math.abs(x - cx) / (w / 2) + Math.abs(y - cy + 0.5) / 4; if (e > 1.1 || x < 0 || x > 319 || (x > 270 && y < 48)) continue; R.pset(x, y, y >= cy + 1 ? (k0 === 2 ? hex('#ffb070') : hex('#f08a6a')) : y >= cy - 1 ? hex('#a85a7a') : hex('#7a4a7a')); } }
  // murciélagos que salen de la mansión
  for (let k = 0; k < 3; k++) { const f = (t * 0.12 + k * 0.33) % 1, x = Math.round(238 - f * 200 + Math.sin(t * 2 + k) * 6), y = Math.round(54 - f * 18 + Math.sin(t * 3 + k * 2) * 4), al = Math.floor(t * 9 + k) % 2;
    if (y < 20 || (x > 14 && x < 176 && y < 18)) continue; R.pset(x, y, K); R.pset(x - 1, y - al, K); R.pset(x + 1, y - al, K); R.pset(x - 2, y - 1 + al, K); R.pset(x + 2, y - 1 + al, K); }
  // las ventanas de la mansión que se encienden y el arco de la antena
  for (const [wx, wy, k] of [[212, 56, 0], [222, 62, 1], [232, 56, 2], [246, 44, 3], [248, 58, 4]]) if (Math.sin(t * 0.7 + k * 1.9) > -0.6) { R.pset(wx, wy, hex('#d8ff8a')); R.pset(wx + 1, wy, hex('#a8e05a')); R.pset(wx, wy + 1, hex('#a8e05a')); }
  if (Math.floor(t * 5) % 3 === 0) { const j = Math.floor(t * 15) % 2; R.linea(244, 10, 249, 8 + j * 3, hex('#d8ffb0')); R.linea(249, 8 + j * 3, 254, 10, hex('#ffffff')); }
  // el río de lodo, del horizonte hacia nosotros: ondas que corren, el reflejo del sol, burbujas que revientan y vapor
  for (let y = 100; y < 180; y++) { const L = Math.max(0, Math.ceil(rioL(y))), Rr = Math.min(319, Math.floor(rioR(y))), p = (y - 100) / 80, fr = 0.5 - p * 0.35;
    for (let x = L; x <= Rr; x++) { const onda = Math.sin(x * fr * 0.4 + y * (1.4 - p) - t * 3.2) + Math.sin(x * 0.07 - y * 0.5 + t * 1.3);
      let v = 2.2 + p * 1.4 + onda * 0.45; const sol = Math.abs(x - (112 - p * 40)) < 6 + p * 16 && onda > 0.6; R.pset(x, y, sol ? (onda > 1.2 ? hex('#ffe08a') : hex('#e8a85a')) : rampa(LODO, v, x, y)); }
    R.pset(L, y, hex('#d0ff9c')); R.pset(Rr, y, hex('#94e468')); }
  for (let k = 0; k < 9; k++) { const per = 1.4 + (k % 4) * 0.4, f = ((t + k * 0.53) % per) / per, y = 108 + ((k * 31) % 68), L = rioL(y), Rr = rioR(y), x = Math.round(Math.max(0, L) + 6 + ((k * 47) % Math.max(8, Rr - Math.max(0, L) - 12))), rr = (1 + (y - 100) / 26) * (0.4 + f);
    if (f < 0.8) { R.disco(x, y - rr * 0.5, rr + 0.6, LODO[1]); R.disco(x, y - rr * 0.5, rr, LODO[5]); R.pset(Math.round(x - rr * 0.4), Math.round(y - rr), LODO[6]); } else R.anillo(x, y, rr * 1.6, LODO[6]); }
  for (let k = 0; k < 5; k++) { const f = (t * 0.25 + k * 0.2) % 1, x = Math.round(100 + k * 18 + Math.sin(t + k) * 6), y = Math.round(150 - k * 8 - f * 40); for (let j = 0; j < 8; j++) { const xx = x + Math.round(Math.sin(f * 6 + j * 0.6) * 3), yy = y - j; if (bay(xx, yy) < 0.5 * (1 - f)) R.pset(xx, yy, hex('#b8f08a')); } }
  // cosas que bajan por el río: una lata y un patito de goma
  for (const [k, tipo] of [[0, 'lata'], [1, 'pato']]) { const f = (t * 0.07 + k * 0.5) % 1, y = Math.round(102 + f * 76), x = Math.round((Math.max(0, rioL(y)) + rioR(y)) / 2 + (k ? 10 : -14) * f + Math.sin(t * 2 + k) * 1.5), z = 1 + f * 1.5;
    if (tipo === 'lata') { R.rect(x - Math.round(2 * z), y - Math.round(2 * z), x + Math.round(2 * z), y, K); R.rect(x - Math.round(2 * z) + 1, y - Math.round(2 * z) + 1, x + Math.round(2 * z) - 1, y - 1, hex('#c84a3a')); R.pset(x, y - Math.round(z), hex('#e8e8ee')); }
    else { R.disco(x, y - z * 1.5, z * 2.2 + 0.6, K); R.disco(x, y - z * 1.5, z * 2.2, hex('#ffd84a')); R.disco(x + z * 1.6, y - z * 3.4, z * 1.3 + 0.5, K); R.disco(x + z * 1.6, y - z * 3.4, z * 1.3, hex('#ffd84a')); R.pset(Math.round(x + z * 3), Math.round(y - z * 3.2), hex('#e8803a')); R.pset(Math.round(x + z * 1.8), Math.round(y - z * 3.8), K); }
    R.linea(x - Math.round(4 * z), y + 1, x + Math.round(4 * z), y + 1, hex('#94e468')); }
  // los juncos que se mecen en las dos orillas
  for (let k = 0; k < 10; k++) { const side = k % 2, y = 120 + k * 6, x = Math.round(side ? rioR(y) + 2 : rioL(y) - 2), hh = 8 + (y - 100) / 6, sw = Math.sin(t * 1.6 + k) * 2;
    if (x < 0 || x > 319) continue; R.linea(x, y, Math.round(x + sw), Math.round(y - hh), hex('#3a4a22')); R.rect(Math.round(x + sw) - 1, Math.round(y - hh), Math.round(x + sw), Math.round(y - hh + 3), hex('#6a3a1a')); }
  // los dos tentáculos en la orilla de acá: el morado mira el río, el verde le habla
  const hab = t > dice - 0.2;
  T.tentaculo(R, 268, 150, t, { color: 'verde', s: 1.3, dir: -1, habla: hab && Math.sin(t * 9) > 0, expresion: hab ? 'preocupado' : 'normal', mira: [-1, hab ? 0 : -0.3], inclina: hab ? Math.sin(t * 8) * 1.5 : 0 });
  T.tentaculo(R, 236, 154, t, { color: 'morado', s: 1.3, dir: -1, brazos: 1, expresion: t > moradoD - 0.2 ? 'antojo' : 'normal', mira: [-1, 0.4], inclina: t > moradoD ? -2 : 0 });
  // las luciérnagas de la orilla de acá
  for (let k = 0; k < 7; k++) { const x = Math.round(220 + ((k * 41) % 96) + Math.sin(t * 0.8 + k) * 8), y = Math.round(118 + ((k * 23) % 50) + Math.cos(t * 1.1 + k * 2) * 5); if (Math.sin(t * 3 + k * 1.3) > 0.2) { R.pset(x, y, hex('#f8ff9a')); R.pset(x + 1, y, hex('#c8e05a')); } }
  // los juncos del primer término, a contraluz
  for (let k = 0; k < 7; k++) { const x = 286 + k * 5, hh = 26 + (k * 7) % 14, sw = Math.sin(t * 1.3 + k * 0.7) * 3; R.linea(x, 180, Math.round(x + sw), 180 - hh, hex('#141018')); R.linea(x + 1, 180, Math.round(x + sw + 1), 180 - hh, hex('#1e1824')); if (k % 2 === 0) R.rect(Math.round(x + sw) - 1, 180 - hh - 1, Math.round(x + sw) + 1, 180 - hh + 5, hex('#2a1810')); }
  for (let k = 0; k < 5; k++) { const x = 4 + k * 6, hh = 20 + (k * 5) % 12, sw = Math.sin(t * 1.5 + k) * 2; R.linea(x, 180, Math.round(x + sw), 180 - hh, hex('#141018')); }
};
const p4 = (t) => {
  const g = T.mansion(R, t, { encuadre: 'rio', camara: 'cerca', luz: 'atardecer' });
  // el verde le dice que no con la cabeza; el morado mira el lodo con antojo y se inclina en «drink»
  const vuelve = t > explica - 0.1, niega = t > no - 0.1 && t < rio + 0.4;
  T.tentaculo(R, 196, 147, t, { color: 'verde', s: 2, dir: -1, habla: niega && Math.sin(t * 10) > 0, expresion: vuelve ? 'harto' : niega ? 'preocupado' : 'normal', inclina: niega ? Math.sin(t * 9) * 2.5 : 0, mira: [-1, 0] });
  const inc = tramo(t, bebe - 0.2, bebe + 0.4) - tramo(t, explica - 0.3, explica + 0.1);
  T.tentaculo(R, 128, 147, t, { color: 'morado', s: 2, dir: vuelve ? 1 : -1, brazos: 1, pose: t > sig ? 'saluda' : 'normal', expresion: vuelve ? 'malvado' : 'antojo', inclina: -inc * 4, mira: vuelve ? [0.3, 0.3] : [-1, 0.8] });
  // la burbuja grande del lodo, delante: crece y revienta en «river»; al final otra deja un «?» que sube
  const bx = 92, by = 166, f = tramo(t, rio - 1.4, rio);
  if (f > 0 && f < 1) { const rr = 2 + f * 8; R.disco(bx, by - rr * 0.6, rr + 1, hex('#184a1a')); R.disco(bx, by - rr * 0.6, rr, hex('#5ac046')); R.disco(bx - rr * 0.35, by - rr, rr * 0.3, hex('#d0ff9c')); }
  const sp = tramo(t, rio, rio + 0.5); if (sp > 0 && sp < 1) { R.anillo(bx, by, 4 + sp * 14, hex('#94e468')); for (let k = 0; k < 6; k++) { const an = -0.3 - k * 0.5; R.pset(Math.round(bx + Math.cos(an) * (6 + sp * 16)), Math.round(by - 4 + Math.sin(an) * (6 + sp * 16) + sp * sp * 14), hex('#94e468')); } }
  const q = tramo(t, explica, explica + 1.6);
  if (q > 0) { const qx = 86, qy = Math.round(lerp(158, 104, q)); if (q < 0.15) { R.disco(qx + 7, 168, 7, hex('#5ac046')); R.pset(qx - 2, 163, hex('#d0ff9c')); } else { R.disco(qx + 7, qy + 8, 13, hex('#184a1a')); R.disco(qx + 7, qy + 8, 12, hex('#3a9a34')); R.disco(qx + 3, qy + 2, 3, hex('#94e468')); R.icono('?', qx + 2, qy + 1, hex('#f2ffd8'), hex('#0e2a12'), 2); } }
};
const año = 2026;
const efectos = [[recuerda, 'whoosh'], [recuerda + 0.6, 'papel'], [P2 + 0.75, 'toc'], [mal, 'boing'], [mira, 'toc'], [mira + 0.15, 'brillo'], [mira + 0.4, 'puerta'], [P3 + 0.3, 'burbujas'], [rio, 'chof'], [explica, 'burbujas'], [explica + 0.3, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')
