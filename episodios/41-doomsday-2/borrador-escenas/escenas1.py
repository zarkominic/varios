E = {}

E['dd-gancho'] = ('Gancho', '''// DD-GANCHO (frases 1–2), 2026. Ocho planos, cortados en la palabra:
// 1. «Dr. Doom has already started making his moves»: la ciudad en ruinas; Doom en lo alto de los cascotes levanta los
//    brazos y se enciende la columna verde; Thor y Steve llegan por los lados y se paran a mirarlo (corta en «scene»);
// 2. el búnker: Banner graba su informe ante la cámara de vídeo; con «his voice» entra la luz verde, Banner se vuelve y en
//    «vanishes» lo traga un destello;  3. GOLPE en «Hulk» (hulk+7.0): lo que graba la cámara: Hulk ruge en la luz verde,
//    la imagen se rasga, un destello y solo queda el símbolo humeante; los papeles suben en la luz (corta en «Scarlet»);
// 4. Wundagore: las rocas suben con su halo verde, Doom con los brazos en alto; Wanda, como dormida, en el hueco; en
//    «wake up» un pulso rojo y abre los ojos (corta en «but»);  5. el estudio de Atom: la barra del tráiler llega al 99 y
//    vuelve a 0 en «trailer»; la mano que tamborilea da un golpe en la mesa; el corcho se llena (corta en «pieces»);
// 6. la mesa desde arriba: caen seis piezas de puzle (dos escenas, pósters, vídeo, etiqueta, cifra), el móvil vibra y en
//    «together» una mano las junta y encajan;  7. los once pósters de la pared se llenan de golpe en «eleven», sale el
//    «11» y en «behind-the-scenes» la cámara de cine;  8. el vestíbulo del cine: la etiqueta del «13» cae sobre la
//    pantalla de venta en «rating label» y el contador se dispara en «dizzying numbers»; la cola se asombra.''', r'''
const P2 = 3.55, P3 = en('hulk', 0) + 7.0, P4 = 11.05, P5 = 15.8, P6 = 20.0, P7 = 25.97, P8 = 30.6;
const MOVES = 1.74, VOICE = 4.35, VANISH = 7.05, LIFTS = 9.83, WAKE = 12.85, TRAILER = 16.58, PIECES = 20.0, PUZZLE = 20.92, WORLD = 22.02, TOGETHER = 25.07, ELEVEN = 26.89, BEHIND = 29.09, RATING = 30.91, NUMBERS = 32.39;
const K = T.C.k, BL = hex('#f6f6ee');
// ── 1. Doom mueve ficha: la ciudad en ruinas ──
const p1 = (t) => {
  const o = { encuadre: 'campo', doom: 0.25 + 0.75 * tramo(t, MOVES - 0.3, MOVES + 0.9) };
  T.batalla(R, t, o);
  const a = tramo(t, 0.1, 1.6), b = tramo(t, 0.4, 2.0);
  R.actor(EL.thor, Math.round(lerp(-18, 62, a)), 158, t, { dir: 1, anda: a > 0 && a < 1, sorpresa: t > MOVES && t < MOVES + 1.2, enfado: t > MOVES + 1.2 });
  R.actor(EL.steve, Math.round(lerp(330, 232, b)), 158, t, { dir: -1, anda: b > 0 && b < 1, dedo: t > 2.3, sorpresa: t > MOVES && t < 2.3 });
  const brazos = t > MOVES - 0.2;
  R.actor(EL.doom, 153, 121, t, { dir: 1, brazos, quieto: false });
  const pul = t - MOVES; if (pul > 0 && pul < 1.2) R.anillo(160, 110, 8 + pul * 40, pul < 0.6 ? hex('#3ae88a') : hex('#1a8a4a'), 3);
  T.batallaDelante(R, t, o);
};
// ── 2. El búnker: Banner graba y la luz verde lo traga ──
const p2 = (t) => {
  const v = tramo(t, VOICE, VANISH - 0.2), o = { encuadre: 'bunker', verde: v, foco: [150, 112], ruge: tramo(t, VANISH - 0.6, VANISH) * 0.5 };
  T.bunker(R, t, o);
  if (t < VANISH) {
    const mira = t > VOICE + 0.6 && t < VANISH - 0.7;
    R.actor(EL.bannerDD, 140, 158, t, { dir: mira ? -1 : 1, habla: t < VOICE && Math.sin(t * 8) > 0, dedo: t < VOICE - 0.2 && t > P2 + 0.3, sorpresa: t > VOICE + 0.2 });
  }
  T.bunkerDelante(R, t, o);
  // el destello que se lo lleva: una columna de luz blanca y verde que sube y se cierra
  const f = tramo(t, VANISH - 0.25, VANISH) * (1 - tramo(t, VANISH + 0.05, VANISH + 0.4));
  if (f > 0) for (let y = 24; y <= 160; y++) { const w = Math.round((3 + 13 * f) * (0.45 + 0.55 * (y - 24) / 136)); R.linea(147 - w, y, 147 + w, y, hex('#3ae88a')); R.linea(147 - Math.round(w / 2), y, 147 + Math.round(w / 2), y, hex('#d2ffe6')); }
};
// ── 3. GOLPE: lo que graba la cámara: Hulk ruge y desaparece; queda el símbolo ──
const VAN3 = P3 + 1.15;
const p3 = (t) => {
  const ruge = t < VAN3 ? 1 - 0.5 * tramo(t, P3 + 0.8, VAN3) : 0, vacio = t > VAN3;
  const o = { encuadre: 'bunker', camara: 'camara', verde: vacio ? 1 - 0.75 * tramo(t, VAN3, VAN3 + 1.2) : 1, ruge, vacio };
  T.bunker(R, t, o);
  // los papeles que suben en la luz (el eco de «lifts»)
  const u = tramo(t, LIFTS - 0.6, P4);
  if (u > 0) for (let k = 0; k < 6; k++) { const x = 104 + k * 22 + Math.round(Math.sin(t * 2 + k) * 4), y = Math.round(168 - u * (40 + k * 9) - (k % 2) * 4);
    R.rect(x - 4, y - 3, x + 4, y + 3, T.C.doomVS ?? hex('#1a8a4a')); R.rect(x - 3, y - 2, x + 3, y + 2, BL); R.linea(x - 2, y - 1, x + 2, y - 1, hex('#9aa0a8')); R.linea(x - 2, y + 1, x + 1, y + 1, hex('#9aa0a8')); }
  T.bunkerDelante(R, t, o);
  // Hulk, por encima del tinte para que se lea: tiembla, ruge (rayas del rugido) y desaparece en el destello
  if (!vacio) { const j = Math.round(Math.sin(t * 47) * 1.5), g = R.actor(EL.hulk, 152 + j, 170, t, { dir: 1, brazos: true, enfado: true, sorpresa: Math.sin(t * 9) > -0.6, quieto: true });
    if (t < P3 + 0.9) for (let k = 0; k < 7; k++) { const a = -Math.PI * (0.15 + k * 0.12), r0 = 14 + ((t * 40 + k * 5) % 12); R.linea(g.cabeza[0] + Math.cos(a) * r0, g.cabeza[1] + 6 + Math.sin(a) * r0, g.cabeza[0] + Math.cos(a) * (r0 + 6), g.cabeza[1] + 6 + Math.sin(a) * (r0 + 6), BL); } }
  const fl = tramo(t, VAN3 - 0.12, VAN3) * (1 - tramo(t, VAN3 + 0.05, VAN3 + 0.6));
  if (fl > 0) T.tinte(R, 0, 179, [214, 255, 232], fl * 0.9);
};
// ── 4. Wundagore: las rocas suben y Wanda despierta ──
const wanda = (x, y, t, abre) => {     // Wanda tumbada, como dormida (28 × 12), la cabeza a la izquierda
  const PEL = hex('#9a2a1e'), PELS = hex('#6a1a14'), PI = hex('#f6c290'), PIS = hex('#d48a5a'), RO = hex('#c01a2e'), ROS = hex('#7a1020'), NE = hex('#2a1a24');
  R.disco(x + 5, y + 6, 5, K); R.disco(x + 5, y + 6, 4, PEL); R.rect(x + 5, y + 3, x + 10, y + 9, K); R.rect(x + 6, y + 4, x + 9, y + 8, PI); R.rect(x + 6, y + 8, x + 9, y + 8, PIS);
  R.rect(x + 3, y + 2, x + 7, y + 3, PELS); R.rect(x + 1, y + 8, x + 5, y + 11, PEL);
  if (abre) { R.pset(x + 8, y + 5, BL); R.pset(x + 8, y + 6, K); R.pset(x + 9, y + 5, BL); } else R.linea(x + 7, y + 6, x + 9, y + 6, PIS);
  R.rect(x + 10, y + 3, x + 22, y + 10, K); R.rect(x + 11, y + 4, x + 21, y + 9, RO); R.rect(x + 11, y + 8, x + 21, y + 9, ROS); R.linea(x + 13, y + 4, x + 19, y + 4, hex('#e84a5a'));
  R.rect(x + 22, y + 5, x + 28, y + 10, K); R.rect(x + 23, y + 6, x + 27, y + 9, NE); R.rect(x + 14, y + 7, x + 17, y + 8, PI);
};
const p4 = (t) => {
  const lev = 0.3 + 0.7 * tramo(t, P4, P4 + 1.1), o = { encuadre: 'ruinas', verde: 1, levanta: lev };
  T.wundagore(R, t, o);
  const abre = t > WAKE + 0.1;
  wanda(191, 140, t, abre);
  R.actor(EL.doom, 112, 160, t, { dir: 1, brazos: t < WAKE + 0.6, dedo: t >= WAKE + 0.6, quieto: false });
  T.wundagoreDelante(R, t, o);
  // el despertar: pulsos rojos que salen de ella y el «!» encima
  const d = t - (WAKE + 0.1);
  if (d > 0) for (let k = 0; k < 3; k++) { const e = d - k * 0.35; if (e > 0 && e < 1.4) R.anillo(205, 146, 6 + e * 34, e < 0.7 ? hex('#ff3a4a') : hex('#a8182a'), 3); }
  if (d > 0 && d < 1.8) { const y = Math.round(126 - Math.min(1, d * 4) * 6); R.rect(200, y - 2, 208, y + 9, K); R.rect(201, y - 1, 207, y + 8, BL); R.icono('!', 203, y, hex('#d01a2a'), BL); }
};
// ── 5. El estudio: la barra que no acaba (gag 1) ──
const p5 = (t) => {
  const carga = t < TRAILER ? lerp(0.93, 0.99, tramo(t, P5, TRAILER - 0.25)) : 0.13 * tramo(t, TRAILER + 0.3, P6);
  const o = { encuadre: 'estudio', carga, pared: 0.5 + 0.18 * tramo(t, 19.0, 19.6), dias: 29 };
  T.estudio(R, t, o); T.estudioDelante(R, t, o);
  // la mano de Atom que tamborilea y da el golpe cuando la barra vuelve a 0
  const sale = tramo(t, 18.6, 19.4), golpe = t > TRAILER && t < TRAILER + 0.25;
  const y = 152 - (golpe ? -2 : Math.floor(t * 7) % 2 ? 1 : 0) + Math.round(sale * 40);
  if (sale < 1) T.brazo(R, 336, 196 + Math.round(sale * 30), 300, y, '#3a4a8a', -1, { codo: [326, 170 + Math.round(sale * 30)] });
};
// ── 6. La mesa desde arriba: las piezas del puzle ──
const PZ = [   // [x final, y final, x suelta, y suelta, instante de caída, color, qué lleva]
  [128, 56, 112, 44, PIECES + 0.05, '#2a6a4a', 'simbolo'], [150, 56, 168, 40, PIECES + 0.45, '#5a6a8a', 'montana'], [172, 56, 196, 60, PUZZLE + 0.1, '#c8a040', 'posters'],
  [128, 78, 98, 96, PUZZLE + 0.5, '#4a4a5a', 'camara'], [150, 78, 168, 102, WORLD - 0.4, '#d8c050', 'trece'], [172, 78, 204, 92, WORLD, '#a83a4a', 'cifra']];
const pieza = (x, y, col, que, t, brillo) => {
  const C0 = hex(col), CL = hex('#f0f0e0'), CS = hex('#1a1820');
  R.rect(x + 2, y + 2, x + 21, y + 21, hex('#3a2a1a'));                              // sombra en la mesa
  R.rect(x - 1, y - 1, x + 20, y + 20, CS); R.disco(x + 20, y + 10, 4, CS); R.disco(x + 10, y - 1, 4, CS);
  R.rect(x, y, x + 19, y + 19, C0); R.disco(x + 20, y + 10, 3, C0); R.disco(x + 10, y - 1, 3, C0);
  R.linea(x, y, x + 19, y, CL); R.linea(x, y, x, y + 19, CL);
  R.disco(x + 4, y + 8, 3, CS); R.disco(x + 4, y + 8, 2, hex('#6a4a2a'));             // el hueco de la izquierda
  const cx = x + 10, cy = y + 10;
  if (que === 'simbolo') { R.rect(x + 3, y + 3, x + 17, y + 17, hex('#1a2a22')); T.a_simbolo(R, cx, cy + 1, 6, 4, t); }
  else if (que === 'montana') { R.rect(x + 3, y + 3, x + 17, y + 17, hex('#2a3048')); R.poligono([[x + 3, y + 17], [cx, y + 5], [x + 17, y + 17]], hex('#8a8a9a')); R.poligono([[cx - 3, y + 9], [cx, y + 5], [cx + 3, y + 9]], BL); R.disco(cx, y + 14, 2, hex('#3ae88a')); }
  else if (que === 'posters') { for (let k = 0; k < 3; k++) { R.rect(x + 3 + k * 5, y + 4, x + 6 + k * 5, y + 15, BL); R.rect(x + 4 + k * 5, y + 5, x + 5 + k * 5, y + 14, hex(['#d8783a', '#3ae88a', '#d8783a'][k])); } }
  else if (que === 'camara') R.icono('camara', x + 3, y + 5, BL, CS, 2);
  else if (que === 'trece') { R.rect(x + 3, y + 5, x + 17, y + 15, CS); R.rect(x + 4, y + 6, x + 16, y + 14, hex('#3a8ae8')); R.numero('13', cx, y + 14, { centro: true, rampa: [BL, BL, BL, BL] }); }
  else R.numero('50', cx, y + 14, { centro: true });
  if (brillo > 0) R.anillo(cx, cy, 12 + brillo * 6, hex('#fff6c0'), 2);
};
const p6 = (t) => {
  const o = { encuadre: 'pared', camara: 'escritorio', vibra: t > WORLD + 0.2 && t < 23.6 ? 1 : 0 };
  T.estudio(R, t, o);
  const junta = tramo(t, 24.1, TOGETHER), br = tramo(t, TOGETHER, TOGETHER + 0.5) * (1 - tramo(t, TOGETHER + 0.5, TOGETHER + 0.9));
  PZ.forEach(([xf, yf, xs, ys, t0, col, que], k) => {
    const c = tramo(t, t0, t0 + 0.35); if (c <= 0) return;
    const rebote = c < 1 ? 0 : Math.round(Math.max(0, Math.sin((t - t0 - 0.35) * 18)) * 3 * (1 - tramo(t, t0 + 0.35, t0 + 0.7)));
    const x = Math.round(lerp(xs, xf, junta)), y = Math.round(lerp(lerp(-30, ys, c), yf, junta)) - rebote;
    pieza(x, y, col, que, t, k === 5 ? br : 0);
  });
  if (br > 0) R.anillo(160, 78, 34 + br * 14, hex('#fff6c0'), 3);
  // la mano que las junta: entra por abajo y empuja hacia el centro
  // la mano de Atom da el empujón final desde abajo, en el hueco que deja la mesa (x 155–185, y 150–170)
  const m = tramo(t, 23.6, 24.1) * (1 - tramo(t, TOGETHER + 0.3, P7 - 0.2)), mx = Math.round(176 - 4 * junta), my = Math.round(lerp(200, 160, m) - 3 * junta);
  if (m > 0) T.brazo(R, 192, 206, mx, my, '#3a4a8a', -1, { codo: [186, Math.max(my + 22, 184)] });
};
// ── 7. Los once pósters encajan ──
const PAREJAS = [[EL.thor, EL.steve], [EL.sam, EL.ciclope], [EL.magneto, EL.shuri], [EL.xavier, EL.reed], [EL.loki, EL.mistica], [EL.doom], [EL.bucky, EL.shangchi], [EL.antman, EL.guardian], [EL.sue, EL.namor], [EL.gambito, EL.yelena], [EL.rondador, EL.mbaku]];
const p7 = (t) => {
  const n = Math.min(11, Math.floor(2 + 9 * tramo(t, P7 + 0.2, 28.3))), o = { encuadre: 'campo', camara: 'marcos', n, doom: 1 };
  const g = T.batalla(R, t, o);
  for (let k = 0; k < n; k++) { const xs = g.sitios?.[k] ?? []; PAREJAS[k].forEach((d, i) => { if (d && xs[i] != null) R.actor(d, xs[i], g.pies ?? 154, t, { dir: i ? -1 : 1, brazos: k === 5 && t > 27.6 }); }); }
  T.batallaDelante(R, t, o);
  const e = tramo(t, ELEVEN, ELEVEN + 0.3);
  if (e > 0) { R.rect(186, 18, 246, 42, K); R.rect(187, 19, 245, 41, hex('#1a2030')); R.numero('11', 216, Math.round(38 + (1 - e) * 6), { tam: 16, centro: true }); }
  const c = tramo(t, BEHIND, BEHIND + 0.25);
  if (c > 0) { const y = Math.round(22 + (1 - c) * 8); R.rect(250, y - 2, 274, y + 17, K); R.rect(251, y - 1, 273, y + 16, hex('#e8e0c8')); R.icono('camara', 255, y + 1, hex('#2a2a3a'), hex('#9a9080'), 2); }
};
// ── 8. El vestíbulo: la etiqueta nueva y las cifras que marean ──
const p8 = (t) => {
  const ventas = 0.3 + 0.7 * tramo(t, NUMBERS - 0.3, 33.6) ** 1.6, o = { encuadre: 'vestibulo', ventas };
  T.cine(R, t, o);
  const a = tramo(t, P8, P8 + 1.6), b = tramo(t, P8 + 0.6, P8 + 2.4);
  R.actor(EL.chica, 52, 140, t, { dir: 1, sonrisa: true, habla: Math.sin(t * 6) > 0.4 });
  R.actor(EL.espectador, Math.round(lerp(330, 214, a)), 160, t, { dir: -1, anda: a > 0 && a < 1, sorpresa: t > NUMBERS + 0.2, dedo: t > NUMBERS + 0.8 });
  R.actor(EL.espectadora, Math.round(lerp(352, 238, b)), 160, t, { dir: -1, anda: b > 0 && b < 1, sorpresa: t > NUMBERS + 0.4 });
  R.actor(EL.chico, 140, 160, t, { dir: 1, sorpresa: t > NUMBERS, sonrisa: t < NUMBERS });
  T.cineDelante(R, t, o);
  // la etiqueta del «13» cae y se balancea colgada en la esquina de la pantalla de venta
  const c = tramo(t, RATING - 0.35, RATING); if (c > 0) {
    const sw = Math.round(Math.sin((t - RATING) * 9) * 3 * (1 - tramo(t, RATING, RATING + 1.4))), x = 198 + sw, y = Math.round(lerp(-20, 36, c));
    R.linea(206, 30, x + 8, y, hex('#c8c0a8')); R.rect(x - 1, y - 1, x + 17, y + 13, K); R.rect(x, y, x + 16, y + 12, hex('#3a8ae8')); R.rect(x, y, x + 16, y + 1, hex('#8ac0ff')); R.numero('13', x + 8, y + 11, { centro: true, rampa: [BL, BL, BL, BL] }); }
  // las cifras que marean: espirales alrededor del contador
  const m = tramo(t, NUMBERS, NUMBERS + 0.3);
  if (m > 0) for (let k = 0; k < 10; k++) { const a2 = t * 7 + k * 0.63, r = 30 + k * 1.6; R.pset(Math.round(152 + Math.cos(a2) * r), Math.round(68 + Math.sin(a2) * r * 0.55), k % 2 ? hex('#ffd84a') : BL); }
};
const efectos = [[MOVES, 'zumbido'], [VOICE + 0.1, 'whoosh'], [VANISH - 0.1, 'flash'], [P3, 'boom'], [VAN3, 'flash'], [LIFTS, 'papel'], [P4 + 0.1, 'trueno'], [WAKE + 0.1, 'brillo'],
  [TRAILER, 'bip'], [TRAILER + 0.05, 'golpecito'], [19.1, 'papel'], [PIECES + 0.4, 'golpecito'], [PUZZLE + 0.45, 'golpecito'], [WORLD + 0.25, 'zumbido'], [TOGETHER, 'brillo'],
  [ELEVEN, 'papel'], [BEHIND, 'pop'], [RATING, 'golpecito'], [NUMBERS, 'tic']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { efectos, año: 2026 });
''')

E['dd-hola'] = ('Hola', '''// DD-HOLA (frase 3), 2026. Un plano: el corcho del estudio de cerca. En las tres fotos, lo del gancho (el símbolo verde
// del búnker, la montaña de Wundagore, la máscara de Doom); en «wondered» tres hilos rojos van de las fotos al recuadro
// del «?», y en «Let's find out» la mano de Atom clava una chincheta roja en el «?», que se enciende. A la derecha, el
// reloj pequeño de la cuenta atrás.''', r'''
import { e_mascara } from '/atomo/plato/escenas/do-comun.js';
const WOND = 2.92, FIND = 3.93, K = T.C.k, BL = hex('#f6f6ee'), ROJO = hex('#d01a2a');
const p1 = (t) => {
  const o = { encuadre: 'pared' };
  const g = T.estudio(R, t, o);
  const F = g.fotos ?? [[30, 42, 86, 90], [104, 36, 160, 84], [178, 44, 234, 92], [104, 110, 184, 162]];
  // lo que hay en las fotos (recortado a su hueco)
  const [a, b, c] = F;
  R.recorte([a[0] + 3, a[1] + 3, a[2] - 3, a[3] - 12]);
  for (let y = a[1]; y <= a[3]; y++) R.linea(a[0], y, a[2], y, (y % 4) ? hex('#5a5a56') : hex('#4a4a46'));
  T.a_simbolo(R, (a[0] + a[2]) / 2, a[3] - 26, 16, 6, t, { quemado: true });
  R.recorte([b[0] + 3, b[1] + 3, b[2] - 3, b[3] - 12]);
  for (let y = b[1]; y <= b[3]; y++) R.linea(b[0], y, b[2], y, y < b[1] + 22 ? hex('#3a3a5a') : hex('#4a4450'));
  R.poligono([[b[0] + 2, b[3] - 10], [b[0] + 26, b[1] + 10], [b[2] - 2, b[3] - 10]], hex('#6a6470')); R.poligono([[b[0] + 20, b[1] + 16], [b[0] + 26, b[1] + 10], [b[0] + 32, b[1] + 16]], hex('#eef2f8'));
  R.disco(b[0] + 30, b[3] - 18, 3 + Math.sin(t * 4), hex('#3ae88a'));
  R.recorte([c[0] + 3, c[1] + 3, c[2] - 3, c[3] - 12]);
  for (let y = c[1]; y <= c[3]; y++) R.linea(c[0], y, c[2], y, hex('#1a3a26'));
  e_mascara(R, (c[0] + c[2]) / 2, c[1] + 22, 2, { brillo: (t * 0.4) % 1, capucha: true, ojos: 0.5 + 0.5 * Math.sin(t * 3) });
  R.recorte(null);
  T.estudioDelante(R, t, o);
  // los hilos rojos que van de cada foto al recuadro del «?»
  const q = [145, 136], PIN = [150, 156];
  F.slice(0, 3).forEach(([x0, y0, x1], k) => { const u = tramo(t, 0.8 + k * 0.6, 1.7 + k * 0.6); if (u <= 0) return; const sx = (x0 + x1) / 2, sy = y0 + 2;
    R.linea(sx, sy, lerp(sx, q[0], u), lerp(sy, q[1] - 22, u), ROJO); R.linea(sx + 1, sy, lerp(sx, q[0], u) + 1, lerp(sy, q[1] - 22, u), hex('#8a1018')); });
  // el «?» que se enciende cuando entra la chincheta
  const pin = tramo(t, FIND + 0.1, FIND + 0.3), luz = pin * (1 - tramo(t, FIND + 0.6, 5.3) * 0.5);
  if (luz > 0) { const c = Math.sin(t * 10) > -0.3 ? hex('#ffe08a') : hex('#c8a040'); R.rect(105, 111, 183, 112, c); R.rect(105, 160, 183, 161, c); R.rect(105, 111, 106, 161, c); R.rect(182, 111, 183, 161, c);
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + t, r = 30 + pin * 4; R.pset(Math.round(q[0] + Math.cos(a) * r * 1.3), Math.round(q[1] + Math.sin(a) * r * 0.9), hex('#ffe08a')); } }
  if (pin > 0) { R.disco(PIN[0], PIN[1], 3, K); R.disco(PIN[0], PIN[1], 2, ROJO); R.pset(PIN[0] - 1, PIN[1] - 1, hex('#ff8a8a')); }
  // la mano de Atom con la chincheta: entra por abajo a la derecha, la clava y se va
  const m = tramo(t, FIND - 0.9, FIND + 0.15) * (1 - tramo(t, FIND + 0.5, 5.2));
  if (m > 0) { const wx = Math.round(lerp(166, PIN[0] + 9, m)), wy = Math.round(lerp(204, PIN[1] + 4, m)); T.brazo(R, 172, 214, wx, wy, '#3a4a8a', -1, { codo: [170, Math.max(wy + 20, 184)] });
    if (pin === 0) { R.disco(wx - 9, wy - 4, 3, K); R.disco(wx - 9, wy - 4, 2, ROJO); } }
  // el reloj pequeño de la cuenta atrás, en la pared de la derecha
  R.rect(284, 122, 316, 148, K); R.rect(285, 123, 315, 147, hex('#2a2430')); R.rect(287, 125, 313, 138, hex('#140a0e'));
  R.numero('29', 300, 137, { centro: true, rampa: [hex('#6a0a12'), hex('#c01a22'), hex('#ff3a3a'), hex('#ff8a8a')] });
  const s = 59 - Math.floor(t) % 60; R.numero(String(s).padStart(2, '0'), 300, 146, { centro: true, fina: true, rampa: [hex('#8a8a8a'), BL, BL, BL] });
  R.linea(300, 116, 292, 122, hex('#8a6a4a')); R.linea(300, 116, 308, 122, hex('#8a6a4a')); R.disco(300, 116, 1, hex('#c8c0a8'));
};
const efectos = [[WOND, 'lapiz'], [FIND + 0.15, 'pop'], [FIND + 0.25, 'brillo']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')

E['dd-encore'] = ('Endgame Encore', '''// DD-ENCORE (frases 4–5), 2026, cartela «2026». Seis planos:
// 1. las puertas de las salas: la gente entra en la sala de la máscara; en «new name» se enciende el cartel nuevo (corta
//    en «Encore»);  2. dentro de la sala IMAX, con la tormenta verde en la pantalla: en «four scenes» se abren en ella
//    cuatro fotogramas nuevos (la puerta, el reloj, el yunque, el símbolo) y un chico con palomitas se para en el pasillo
//    (corta en «Joe»);  3. la sala envolvente: Joe Russo entra hasta su silla de director y en «required» señala la
//    pantalla, que se extiende por las paredes;  4. (película) la casa de Peggy de noche: Loki llama en «knocks», abre
//    Peggy, Steve se asoma detrás y Loki les ofrece la mano con una chispa verde (corta en «The TVA»);  5. la consola de la
//    oficina del tiempo (pieza del 19, con lo nuestro en la pantalla): dos universos se acercan y chocan en «collide»; la
//    baliza gira y la agente se asusta;  6. un taller a oscuras: martillazos con chispas; en «turns out» la fragua se pone
//    verde y se ve que es Doom, que levanta en «mask» la máscara al rojo, que humea.''', r'''
import * as DO from '/atomo/plato/escenas/do-comun.js';
const P2 = 6.74, P3 = 10.33, P4 = 15.79, P5 = 22.29, P6 = 26.79;
const GOLPES = [27.0, 28.0, 30.05], NEWNAME = 5.84, FOUR = 8.02, REQUIRED = 13.49, PLANOS = 12.67, KNOCKS = 17.45, LOKI = 19.47, HELP = 20.47, SEES = 25.21, COLLIDE = 25.79, TURNS = 29.15, DOOM = 29.85, MASK = 30.91;
const K = T.C.k, BL = hex('#f6f6ee');
const tinta = (R, x, y, c, a) => { const o = R.pget(x, y), r = o & 255, g = (o >> 8) & 255, b = (o >> 16) & 255, cr = c & 255, cg = (c >> 8) & 255, cb = (c >> 16) & 255;
  R.pset(x, y, (0xff000000 | (Math.round(b + (cb - b) * a) << 16) | (Math.round(g + (cg - g) * a) << 8) | Math.round(r + (cr - r) * a)) >>> 0); };
const b4 = (x, y) => [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5][(y & 3) * 4 + (x & 3)] / 16;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
// ── 1. Las puertas de las salas: vuelve al cine ──
const p1 = (t) => {
  const o = { encuadre: 'imax' }, g = T.cine(R, t, o);
  const pu = g.puerta ?? [220, 72, 258, 150];
  // la cola que entra en la sala de la máscara: cada uno camina hasta la puerta y desaparece dentro
  [[EL.espectador, 0.2], [EL.chicaHoy, 0.9], [EL.espectadora, 1.7], [EL.chicoHoy, 2.6], [EL.vecino, 3.5]].forEach(([d, t0], k) => {
    const x = Math.round(lerp(-20 - k * 4, pu[0] + 8, tramo(t, t0, t0 + 3.4))); if (x < pu[0] + 8) R.actor(d, x, 160, t, { dir: 1, anda: true, sonrisa: k % 2 === 0 }); });
  R.actor(EL.chica, 170, 160, t, { dir: -1, habla: Math.sin(t * 5) > 0.3, dedo: t > 2.0 && t < 3.4, sonrisa: t > NEWNAME });   // la acomodadora que indica el camino
  T.cineDelante(R, t, o);
  // el cartel nuevo que se enciende sobre la puerta: un marco de luz verde que corre
  const e = tramo(t, NEWNAME - 0.2, NEWNAME + 0.3);
  if (e > 0) { const x0 = 184, x1 = 262, y0 = 50, y1 = 66; R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#14301e'));
    for (let x = x0 + 1; x < x1; x += 3) { const on = Math.floor(t * 8 + x / 3) % 3 === 0; R.pset(x, y0 + 1, on ? hex('#d2ffe6') : hex('#3ae88a')); R.pset(x, y1 - 1, on ? hex('#3ae88a') : hex('#d2ffe6')); }
    DO.e_mascara(R, (x0 + x1) / 2, y0 + 4, 1, { ojos: 1 });
    if (e < 1) R.anillo((x0 + x1) / 2, (y0 + y1) / 2, 6 + e * 18, hex('#d2ffe6'), 2); }
};
// ── 2. Dentro de la sala: cuatro escenas nuevas ──
const foto = (x, y, k, t) => {      // un fotograma de 40 × 26 de cada escena nueva
  R.rect(x - 1, y - 1, x + 40, y + 26, K); R.rect(x, y, x + 39, y + 25, BL);
  const X0 = x + 2, Y0 = y + 2, X1 = x + 37, Y1 = y + 23;
  if (k === 0) { R.rect(X0, Y0, X1, Y1, hex('#3a2a4a')); R.rect(X0 + 12, Y0 + 3, X0 + 24, Y1, hex('#7a4a2a')); R.rect(X0 + 14, Y0 + 5, X0 + 22, Y0 + 10, hex('#5a3420')); R.pset(X0 + 22, Y0 + 13, hex('#f0c040')); R.disco(X0 + 6, Y0 + 5, 2, hex('#ffe08a')); R.rect(X0 + 27, Y0 + 6, X0 + 31, Y1, hex('#1a5a2a')); R.rect(X0 + 27, Y0 + 3, X0 + 31, Y0 + 5, hex('#c8a040')); }
  else if (k === 1) { R.rect(X0, Y0, X1, Y1, hex('#6a3a1a')); R.disco(x + 20, y + 13, 9, hex('#e8a040')); R.disco(x + 20, y + 13, 7, hex('#f6e0b0')); const a = t * 3; R.linea(x + 20, y + 13, x + 20 + Math.cos(a) * 6, y + 13 + Math.sin(a) * 6, K); R.linea(x + 20, y + 13, x + 20, y + 8, K); }
  else if (k === 2) { R.rect(X0, Y0, X1, Y1, hex('#1a1414')); R.rect(X0 + 8, Y1 - 8, X0 + 26, Y1 - 5, hex('#5a5a62')); R.rect(X0 + 13, Y1 - 5, X0 + 21, Y1, hex('#3a3a42')); if (Math.floor(t * 4) % 2) for (let s = 0; s < 6; s++) R.pset(X0 + 17 + Math.round(Math.cos(s) * (3 + s)), Y1 - 10 - s, hex('#ffb040')); }
  else { R.rect(X0, Y0, X1, Y1, hex('#14301e')); T.a_simbolo(R, x + 20, y + 16, 10, 4, t); }
};
const p2 = (t) => {
  const o = { encuadre: 'imax', camara: 'sala', peli: 'doom' }, g = T.cine(R, t, o);
  const pa = g.pantalla ?? [30, 22, 270, 100];
  for (let k = 0; k < 4; k++) { const e = tramo(t, FOUR + k * 0.3 - 0.15, FOUR + k * 0.3 + 0.1); if (e <= 0) continue;
    const x = 44 + k * 54, y = Math.round(42 + (1 - e) * 8); foto(x, y, k, t); R.numero(String(k + 1), x + 20, y + 36, { centro: true }); }
  // el chico de las palomitas baja por el pasillo y se para a mirar
  const a = tramo(t, P2 + 0.1, FOUR - 0.2), x = Math.round(lerp(300, 214, a));
  const ch = R.actor(EL.chico, x, 175, t, { dir: -1, anda: a > 0 && a < 1, sostiene: true, sorpresa: t > FOUR + 0.4 && t < FOUR + 1.8, sonrisa: t > FOUR + 1.8 });
  if (ch.mano) { const [mx, my] = ch.mano; R.rect(mx - 3, my - 2, mx + 3, my + 5, K); R.rect(mx - 2, my - 1, mx + 2, my + 4, hex('#e8e0d0')); R.linea(mx - 2, my, mx - 2, my + 4, hex('#d01a2a')); R.linea(mx + 1, my, mx + 1, my + 4, hex('#d01a2a')); R.rect(mx - 2, my - 3, mx + 2, my - 2, hex('#ffe8a0'));
    if (t > FOUR + 0.4 && t < FOUR + 1.2) { const u = (t - FOUR - 0.4) / 0.8; R.pset(mx + Math.round(u * 6), my - 4 - Math.round(Math.sin(u * 3) * 8), hex('#fff6d0')); } }
  T.cineDelante(R, t, o);
};
// ── 3. Joe Russo: «obligatorio» ──
const p3 = (t) => {
  const o = { encuadre: 'reunion', camara: 'pantalla', planos: tramo(t, REQUIRED - 0.2, REQUIRED + 0.8) }, g = T.sala(R, t, o);
  const a = tramo(t, P3 + 0.1, P3 + 1.7), x = Math.round(lerp(84, 150, a));
  R.actor(EL.russoAnthonyDD, 196, 165, t, { dir: -1, sonrisa: t > 11.4, habla: t > 11.2 && t < 11.9 && Math.sin(t * 9) > 0 });
  const senala = t > REQUIRED - 0.1;
  R.actor(EL.russoJoeDD, x, 165, t, { dir: senala ? -1 : 1, anda: a > 0 && a < 1, habla: t > PLANOS && t < REQUIRED + 1.0 && Math.sin(t * 8) > 0, dedo: senala, sonrisa: t > REQUIRED + 1.2 });
  T.salaDelante(R, t, o);
  const e = tramo(t, REQUIRED, REQUIRED + 0.25);
  if (e > 0 && t < REQUIRED + 1.8) { const hx = x + 2, hy = 128; for (let k = 0; k < 5; k++) { const u = (k + 1) / 6 * e; R.disco(Math.round(lerp(hx, 150, u)), Math.round(lerp(hy, 104, u)), 1, hex('#ffe08a')); }
    R.poligono([[146, 104], [154, 104], [150, 98]], hex('#ffe08a'));
    const y = Math.round(116 - e * 6); R.rect(x + 3, y - 2, x + 11, y + 9, K); R.rect(x + 4, y - 1, x + 10, y + 8, BL); R.icono('!', x + 6, y, hex('#d01a2a'), BL); }
};
// ── 4. (película) La casa de Peggy: llama Loki ──
let fondoCasa = null;
const casa = () => {
  const b = R.nuevo(), prev = R.usar(b);
  // cielo de noche tramado, con estrellas fuera de la barra del año y de la esquina de Atom
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { const u = y / 120, q = u * 3 + b4(x, y) * 0.9; R.pset(x, y, q < 1 ? hex('#0e1430') : q < 2 ? hex('#18204a') : q < 2.8 ? hex('#26305e') : hex('#3a3a6a')); }
  for (let k = 0; k < 40; k++) { const x = Math.floor(hh(k, 1) * 320), y = Math.floor(hh(k, 2) * 70) + 4; if ((x > 18 && x < 172 && y < 22) || (x > 274 && y < 48)) continue; R.pset(x, y, k % 5 ? hex('#8a90c0') : BL); }
  // casas lejanas y árboles en silueta
  for (const [x0, w, hgt] of [[0, 46, 34], [44, 40, 26], [292, 40, 30]]) { R.rect(x0, 118 - hgt, x0 + w, 120, hex('#1a1a30')); R.poligono([[x0 - 3, 118 - hgt], [x0 + w / 2, 104 - hgt], [x0 + w + 3, 118 - hgt]], hex('#141428')); R.rect(x0 + 8, 124 - hgt, x0 + 14, 130 - hgt, hex('#e8b850')); }
  for (let k = 0; k < 7; k++) R.disco(76 + k * 4, 70 + Math.round(hh(k, 3) * 10), 9, hex('#10182a'));
  R.rect(84, 80, 86, 120, hex('#1a1410'));
  // la fachada de tablas: listones con su sombra y vetas
  R.poligono([[92, 66], [196, 30], [300, 66]], hex('#3a2a2a')); R.poligono([[98, 64], [196, 34], [294, 64]], hex('#5a3a34'));
  for (let y = 40; y < 64; y += 3) for (let x = 100; x < 292; x++) if (y > 66 - Math.abs(x - 196) * 0.346 - 30 + 30 && b4(x, y) < 0.5) R.pset(x, y, hex('#4a302a'));
  for (let y = 64; y < 150; y++) for (let x = 96; x < 298; x++) { const lis = (y - 64) % 6, c = lis === 5 ? hex('#6a7a8a') : lis === 0 ? hex('#c8d4dc') : hex('#a8b8c4'); R.pset(x, y, hh(x >> 3, y >> 2) < 0.06 && lis > 1 ? hex('#98a8b4') : c); }
  R.rect(92, 64, 300, 66, hex('#2a1e1e')); R.rect(96, 66, 298, 67, hex('#6a7a8a'));
  // el porche: tejadillo, columnas, suelo de tablas y escalones
  R.rect(150, 78, 246, 84, hex('#3a2a2a')); R.rect(150, 84, 246, 85, hex('#1a1414')); for (let x = 152; x < 246; x += 6) R.rect(x, 84, x + 2, 87, hex('#f0ece0'));
  for (const x of [152, 240]) { R.rect(x, 85, x + 5, 150, hex('#f0ece0')); R.rect(x + 4, 85, x + 5, 150, hex('#b8b0a0')); R.rect(x - 1, 146, x + 6, 150, hex('#d8d0c0')); }
  for (let y = 150; y < 158; y++) for (let x = 140; x < 258; x++) R.pset(x, y, (x % 9 === 0) ? hex('#5a3a24') : y === 150 ? hex('#a8784a') : hex('#8a5a34'));
  for (const [y, x0, x1] of [[158, 170, 226], [163, 164, 232], [168, 158, 238]]) { R.rect(x0, y, x1, y + 4, hex('#9a6a40')); R.rect(x0, y, x1, y, hex('#c89a6a')); R.rect(x0, y + 4, x1, y + 4, hex('#4a2a18')); }
  // la puerta (el hueco) y su marco; las ventanas con luz cálida, cortinas y macetas
  R.rect(182, 96, 214, 150, hex('#f0ece0')); R.rect(185, 99, 211, 150, hex('#2a1a12'));
  for (const [x0, x1] of [[110, 144], [254, 288]]) { R.rect(x0 - 2, 92, x1 + 2, 132, hex('#f0ece0')); R.rect(x0, 94, x1, 130, hex('#f0c070')); R.rect(x0, 94, x0 + 6, 130, hex('#c84a3a')); R.rect(x1 - 6, 94, x1, 130, hex('#c84a3a')); R.rect((x0 + x1) / 2, 94, (x0 + x1) / 2, 130, hex('#f0ece0')); R.rect(x0, 112, x1, 112, hex('#f0ece0'));
    R.rect(x0 - 4, 132, x1 + 4, 136, hex('#7a4a2a')); for (let x = x0 - 2; x < x1 + 2; x += 5) { R.disco(x + 2, 130, 2, hex('#3a8a3a')); R.pset(x + 2, 129, hex('#e84a6a')); } }
  // el farol del porche, el buzón, las botellas de leche y el felpudo
  R.rect(218, 100, 222, 108, K); R.rect(219, 101, 221, 107, hex('#ffe08a'));
  R.rect(232, 136, 237, 150, K); R.rect(233, 137, 236, 145, hex('#e8e0d0')); R.rect(226, 144, 230, 150, K); R.rect(227, 145, 229, 149, hex('#e8e0d0'));
  R.rect(184, 151, 212, 154, hex('#7a5a30')); for (let x = 186; x < 212; x += 3) R.pset(x, 152, hex('#9a7a40'));
  // el jardín, la acera y la valla de delante
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { if (x >= 140 && x < 258 && y < 158) continue; if (y < 158 && x >= 158 && x < 238) continue;
    const acera = y > 170; R.pset(x, y, acera ? ((x % 24 === 0 || y === 171) ? hex('#5a5a62') : hex('#8a8a92')) : (hh(x, y) < 0.3 ? hex('#2a5a2a') : hh(x, y, 2) < 0.15 ? hex('#4a8a3a') : hex('#3a6a32'))); }
  R.rect(100, 150, 140, 158, hex('#3a6a32')); R.rect(258, 150, 300, 158, hex('#3a6a32'));
  for (let x = 2; x < 150; x += 7) { R.rect(x, 152, x + 3, 170, hex('#f0ece0')); R.pset(x + 1, 151, hex('#f0ece0')); R.rect(x + 3, 153, x + 3, 170, hex('#a8a090')); }
  for (let x = 246; x < 320; x += 7) { R.rect(x, 152, x + 3, 170, hex('#f0ece0')); R.pset(x + 1, 151, hex('#f0ece0')); R.rect(x + 3, 153, x + 3, 170, hex('#a8a090')); }
  R.rect(0, 157, 150, 158, hex('#d8d0c0')); R.rect(246, 157, 319, 158, hex('#d8d0c0')); R.rect(0, 165, 150, 166, hex('#d8d0c0')); R.rect(246, 165, 319, 166, hex('#d8d0c0'));
  for (const [x, y] of [[106, 148], [124, 148], [268, 148], [284, 148]]) { R.disco(x, y, 6, hex('#2a5a2a')); R.disco(x - 1, y - 2, 4, hex('#3a7a32')); R.pset(x + 2, y - 3, hex('#e84a6a')); R.pset(x - 3, y, hex('#f0d040')); }
  // la farola de la calle
  R.rect(40, 70, 42, 170, hex('#2a2a30')); R.rect(34, 66, 48, 70, hex('#2a2a30')); R.rect(36, 70, 46, 73, hex('#ffe08a'));
  R.usar(prev); return b;
};
const p4 = (t) => {
  if (!fondoCasa) fondoCasa = casa();
  R.copiar(fondoCasa);
  // vida: nubes que pasan delante de la luna, una polilla en el farol, la luz de la farola que parpadea
  R.disco(70, 30, 9, hex('#e8e8d0')); R.disco(67, 28, 9, hex('#f6f6e8'));
  for (const [y, v, w, c] of [[24, 3, 40, '#2a3060'], [36, 5, 56, '#3a4070'], [48, 2, 34, '#4a4a78']]) { const x = ((t * v * 2 + y * 7) % 400) - 60; for (let i = 0; i < w; i++) { const hgt = Math.round(3 + Math.sin(i / w * Math.PI) * 4); R.linea(x + i, y - hgt, x + i, y, hex(c)); } }
  R.halo(41, 74, 26, [hex('#3a3450'), hex('#6a5a50'), hex('#b8a060')], 0.9 + 0.2 * Math.sin(t * 13));
  R.halo(220, 104, 18, [hex('#8a7a60'), hex('#c8a860'), hex('#ffe08a')], 1.1);
  R.pset(220 + Math.round(Math.sin(t * 11) * 5), 100 + Math.round(Math.cos(t * 7) * 4), hex('#3a3020'));
  // la puerta: se abre en «Peggy Carter's door»
  const ab = tramo(t, 18.2, 18.7), w = Math.round(26 * (1 - ab * 0.88));
  if (ab > 0) { R.rect(186, 99, 210, 150, hex('#f0c070')); R.rect(188, 102, 200, 116, hex('#7a5a3a')); R.rect(189, 103, 199, 115, hex('#c8a060')); R.rect(203, 112, 208, 150, hex('#8a4a2a')); R.rect(186, 140, 210, 150, hex('#c89a5a')); }
  // Steve se asoma por detrás de Peggy (dentro de la casa)
  if (t > LOKI + 0.1) R.actor(EL.steve, Math.round(lerp(206, 196, tramo(t, LOKI + 0.1, LOKI + 0.6))), 151, t, { dir: -1, sorpresa: t < HELP + 0.4, sonrisa: t > HELP + 0.9 });
  if (ab > 0.4) R.actor(EL.peggy, Math.round(lerp(188, 180, tramo(t, 18.6, 19.1))), Math.round(lerp(151, 157, tramo(t, 18.6, 19.1))), t, { dir: -1, sorpresa: t > 18.5 && t < LOKI + 0.6, habla: t > LOKI + 0.6 && t < HELP && Math.sin(t * 8) > 0, sonrisa: t > HELP + 0.5 });
  // la hoja de la puerta, girando sobre su bisagra de la derecha
  R.rect(210 - w, 99, 211, 150, hex('#5a2a1a')); if (w > 4) { R.rect(212 - w, 102, 209, 122, hex('#6a3a24')); R.rect(212 - w, 126, 209, 147, hex('#6a3a24')); R.pset(213 - w, 126, hex('#f0c040')); }
  // Loki llega por el camino, sube al porche, llama y ofrece la mano
  // por la acera (delante de la valla) hasta los escalones, y luego sube al porche
  const a = tramo(t, P4 + 0.05, KNOCKS - 1.0), sube = tramo(t, KNOCKS - 1.0, KNOCKS - 0.25), lx = Math.round(lerp(-18, 164, a)), suelo = Math.round(lerp(176, 158, sube));
  const llama = (t > KNOCKS - 0.1 && t < KNOCKS + 0.2) || (t > KNOCKS + 0.35 && t < KNOCKS + 0.6);
  const lk = R.actor(EL.loki, lx, suelo, t, { dir: 1, anda: (a > 0 && a < 1) || (sube > 0 && sube < 1), dedo: llama, sostiene: t > HELP - 0.1 ? true : false, sonrisa: t > LOKI, habla: t > HELP && t < HELP + 1.0 && Math.sin(t * 8) > 0 });
  if (llama) R.icono('!', 176, 104, hex('#ffe08a'), K);
  if (t > HELP - 0.1 && lk.mano) { const [mx, my] = lk.mano; for (let k = 0; k < 6; k++) { const a2 = t * 6 + k; R.pset(Math.round(mx + 2 + Math.cos(a2) * (3 + k % 3)), Math.round(my - 2 + Math.sin(a2) * (3 + k % 3)), k % 2 ? hex('#3ae88a') : hex('#e8c040')); } R.disco(mx + 2, my - 2, 1, hex('#d2ffe6')); }
};
// ── 5. La oficina del tiempo: chocan los universos ──
const p5 = (t) => {
  const al = tramo(t, SEES, SEES + 0.3), o = { encuadre: 'oficina', camara: 'pantalla', fosforo: 'verde', ramas: al };
  const g = DO.tiempo(R, t, o) || {}, pa = g.pantalla ?? [118, 44, 216, 106];
  // dentro de la pantalla: dos burbujas de universo que se acercan y chocan
  R.recorte([pa[0] + 2, pa[1] + 2, pa[2] - 2, pa[3] - 2]);
  const cx = (pa[0] + pa[2]) / 2, cy = (pa[1] + pa[3]) / 2, u = tramo(t, P5 + 0.2, COLLIDE), d = Math.round(lerp(34, 9, u * u));
  for (let y = pa[1]; y <= pa[3]; y++) for (let x = pa[0]; x <= pa[2]; x++) if (b4(x, y) < 0.25 && (x + y) % 3 === 0) R.pset(x, y, hex('#0a2a14'));
  if (t < COLLIDE + 0.1) for (const [s, col, col2] of [[-1, '#3a8ae8', '#8ac0ff'], [1, '#e8783a', '#ffc08a']]) { const bx = Math.round(cx + s * d), by = Math.round(cy + s * 3 * (1 - u));
    R.disco(bx, by, 11, hex(col)); R.disco(bx - 2, by - 2, 7, hex(col2)); R.anillo(bx, by, 11, BL, 2); for (let k = 0; k < 5; k++) R.pset(bx + Math.round(Math.cos(t + k * 1.3) * 6), by + Math.round(Math.sin(t + k * 1.3) * 6), BL); }
  const ch = t - COLLIDE;
  if (ch > 0) { R.disco(cx, cy, Math.max(1, 16 - ch * 6), hex('#fff6e0')); for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2, r = ch * 30 + 6; R.linea(cx + Math.cos(a) * r * 0.6, cy + Math.sin(a) * r * 0.4, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.7, k % 2 ? hex('#3a8ae8') : hex('#e8783a')); } }
  R.recorte(null);
  // la agente de la lupa: vigila, señala y se asusta; otro agente entra corriendo con la alarma
  R.actor(EL.agenteTVA ?? EL.mobius, 70, 166, t, { dir: 1, dedo: t > SEES - 0.6 && t < COLLIDE, sorpresa: t > COLLIDE, habla: t < SEES - 0.6 && Math.sin(t * 6) > 0.5 });
  const b = tramo(t, SEES + 0.2, SEES + 1.3); R.actor(EL.mobius ?? EL.agenteTVA, Math.round(lerp(330, 270, b)), 166, t, { dir: -1, anda: b > 0 && b < 1, sorpresa: b >= 1 });
  DO.tiempoDelante(R, t, o);
  // la esquina de Atom, tranquila: el papel pintado de arriba a la derecha queda en sombra
  for (let y = 0; y < 72; y++) for (let x = 240; x < 320; x++) { const a = 0.62 * Math.min(1, (x - 240) / 26, (72 - y) / 26); if (a > 0) tinta(R, x, y, hex('#24160e'), a); }
  if (ch > 0 && ch < 0.35) T.tinte(R, 22, 179, [255, 246, 224], 0.5 * (1 - ch / 0.35));
};
// ── 6. El taller: el martilleo era Doom ──
let fondoTaller = null;
const taller = () => {
  const b = R.nuevo(), prev = R.usar(b);
  // pared de piedra con juntas y hollín
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 9), off = (fila % 2) * 8, junta = y % 9 === 0 || (x + off) % 16 === 0;
    const tono = hh(Math.floor((x + off) / 16), fila); R.pset(x, y, junta ? hex('#1a1416') : tono < 0.3 ? hex('#3a3034') : tono < 0.7 ? hex('#463a3c') : hex('#524446')); if (!junta && b4(x, y) < 0.2 && y < 40) R.pset(x, y, hex('#2a2224')); }
  // la campana de la fragua y su chimenea, la fragua de ladrillo con la boca de brasas
  R.poligono([[220, 40], [300, 40], [312, 76], [208, 76]], hex('#2a2a30')); R.rect(244, 0, 276, 40, hex('#222228')); R.rect(244, 0, 246, 40, hex('#3a3a42'));
  R.rect(212, 96, 310, 150, hex('#6a2a1e')); for (let y = 96; y < 150; y += 5) for (let x = 212; x < 310; x++) if (y % 5 === 0 || (x + (y % 10 ? 0 : 6)) % 12 === 0) R.pset(x, y + ((x + (y % 10 ? 0 : 6)) % 12 === 0 ? 1 : 0), hex('#3a1610'));
  R.rect(232, 108, 290, 128, hex('#1a0a08'));
  // el banco de herramientas a la izquierda: tablero, tenazas, martillos colgados, un torno
  R.rect(10, 104, 110, 110, hex('#5a3a22')); R.rect(10, 104, 110, 104, hex('#8a5a32')); R.rect(16, 110, 20, 150, hex('#3a2416')); R.rect(100, 110, 104, 150, hex('#3a2416'));
  for (const [x, l] of [[24, 22], [36, 18], [48, 26], [62, 20], [76, 24], [90, 16]]) { R.rect(x, 52, x + 1, 52 + l, hex('#5a4a3a')); R.rect(x - 2, 52 + l, x + 3, 56 + l, hex('#6a6a72')); R.rect(x - 2, 52 + l, x + 3, 52 + l, hex('#9a9aa2')); }
  R.rect(18, 48, 98, 50, hex('#3a2416'));
  R.rect(28, 96, 46, 104, hex('#4a4a52')); R.rect(30, 92, 34, 96, hex('#6a6a72')); R.rect(60, 98, 84, 104, hex('#6a6a72')); R.rect(88, 100, 96, 104, hex('#8a5a32'));
  // el yunque en el centro, sobre su tocón
  R.rect(146, 122, 194, 128, K); R.rect(148, 122, 192, 126, hex('#5a5a62')); R.poligono([[194, 122], [206, 124], [194, 127]], hex('#5a5a62')); R.rect(148, 122, 192, 122, hex('#9a9aa2'));
  R.rect(160, 128, 180, 136, hex('#3a3a42')); R.rect(156, 136, 184, 150, hex('#5a3a22')); for (let y = 138; y < 150; y += 3) R.linea(157, y, 183, y, hex('#4a2e1a'));
  // el suelo de losas con la arena y el cubo de agua
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const l = (y - 150) % 10 === 0 || (x + (Math.floor((y - 150) / 10) % 2) * 20) % 40 === 0; R.pset(x, y, l ? hex('#1a1416') : hh(x, y) < 0.2 ? hex('#3a3234') : hex('#2e2628')); }
  // el ventanuco alto con barrotes, la luna y su rayo; herraduras y chatarra por el suelo; el montón de carbón
  R.rect(184, 18, 212, 46, K); R.rect(186, 20, 210, 44, hex('#1a2448')); R.disco(203, 27, 4, hex('#e8e8d0')); for (const x of [192, 198, 204]) R.rect(x, 20, x + 1, 44, hex('#3a3a42'));
  for (let y = 46; y < 150; y++) for (let x = 0; x < 320; x++) { const bx = 186 + (y - 46) * 0.45; if (x > bx && x < bx + 24 && b4(x, y) < 0.18) tinta(R, x, y, hex('#8a90c0'), 0.35); }
  for (const [x, y] of [[40, 166], [64, 172], [210, 170]]) { R.anillo(x, y, 4, hex('#6a6a72')); R.rect(x - 4, y + 2, x + 4, y + 4, hex('#2e2628')); }
  R.poligono([[18, 180], [30, 160], [52, 156], [76, 164], [86, 180]], hex('#141214')); for (let k = 0; k < 30; k++) R.pset(24 + Math.floor(hh(k, 7) * 58), 162 + Math.floor(hh(k, 8) * 16), hex('#3a3a42'));
  R.rect(116, 136, 136, 152, K); R.rect(117, 137, 135, 151, hex('#5a4a3a')); R.rect(117, 137, 135, 139, hex('#3a5a7a')); R.rect(118, 144, 134, 145, hex('#3a3a42'));
  R.usar(prev); return b;
};
const p6 = (t) => {
  if (!fondoTaller) fondoTaller = taller();
  R.copiar(fondoTaller);
  const verde = tramo(t, TURNS, TURNS + 0.5), fuego = verde > 0 ? hex('#3ae88a') : hex('#ff8a2a'), fuegoL = verde > 0 ? hex('#d2ffe6') : hex('#ffd060');
  // las brasas que laten y las llamas
  for (let x = 234; x < 289; x++) { const hgt = Math.round(6 + 6 * Math.abs(Math.sin(t * 7 + x * 0.6))); R.linea(x, 127, x, 127 - hgt, x % 3 ? fuego : fuegoL); }
  R.halo(261, 118, 60, verde > 0 ? [hex('#14301e'), hex('#1a8a4a'), hex('#3ae88a')] : [hex('#3a1a10'), hex('#8a3a14'), hex('#e8782a')], 0.9);
  // el humo que sube a la campana, las pavesas y la cadena que se mece
  for (let k = 0; k < 6; k++) { const v = (t * 0.35 + k / 6) % 1; R.disco(Math.round(258 + Math.sin(v * 5 + k) * 8), Math.round(100 - v * 60), 3 + v * 5, v < 0.5 ? hex('#4a4448') : hex('#3a3438')); }
  for (let k = 0; k < 8; k++) { const v = (t * 0.5 + hh(k, 3)) % 1; R.pset(Math.round(240 + hh(k, 4) * 44 + Math.sin(t * 3 + k) * 3), Math.round(108 - v * 50), verde > 0 ? hex('#3ae88a') : hex('#ffb040')); }
  { const ang = Math.sin(t * 1.7) * 0.25; for (let k = 0; k < 9; k++) { const x = Math.round(176 + Math.sin(ang) * k * 4), y = 0 + k * 4; R.anillo(x, y, 1.5, hex('#6a6a72')); } const hx = Math.round(176 + Math.sin(ang) * 36); R.linea(hx, 36, hx, 42, hex('#8a8a92')); R.linea(hx, 42, hx + 3, 40, hex('#8a8a92')); }
  // el fuelle que sube y baja
  const fu = Math.sin(t * 3) * 3; R.poligono([[290, 128], [312, 124 + fu], [312, 136 - fu], [290, 132]], hex('#6a4a2a'));
  // Doom en el yunque: martillea; en «turns out» se le ve, y en «mask» levanta la máscara al rojo
  const golpes = GOLPES, ultimo = golpes.filter((g) => t >= g).pop(), d = ultimo == null ? 1 : t - ultimo, arriba = t < MASK - 0.3 && d > 0.18;
  const levanta = tramo(t, MASK - 0.3, MASK + 0.3);
  const dm = R.actor(EL.doom, 128, 150, t, { dir: 1, sostiene: levanta > 0 ? [146, Math.round(lerp(118, 92, levanta))] : arriba ? [148, 102] : [154, 118] });
  const [mx, my] = dm.mano;
  if (levanta > 0) { const calor = 1 - tramo(t, MASK + 0.4, 33), kx = mx + 12, ky = Math.round(my - 6 - 14 * levanta);
    R.linea(mx, my, kx - 2, ky + 9, K); R.linea(mx + 1, my, kx - 1, ky + 9, hex('#5a5a62')); R.linea(mx + 2, my + 1, kx + 1, ky + 9, K);   // las tenazas
    R.halo(kx, ky, 22, [hex('#3a1a10'), hex('#8a3a14'), hex('#ff6a2a')], 0.6 + 0.6 * calor); DO.e_mascara(R, kx, ky, 2, { ojos: calor, brillo: (t * 0.6) % 1 });
    for (let k = 0; k < 5; k++) { const v = ((t * 0.8 + k * 0.2) % 1); R.disco(Math.round(kx + Math.sin(v * 6 + k) * 4), Math.round(ky - 14 - v * 26), 2 + v * 3, v < 0.5 ? hex('#e8e8f0') : hex('#a8a8b8')); } }
  else { R.rect(mx - 1, my - 2, mx + 1, my + 10, K); R.rect(mx, my - 1, mx, my + 9, hex('#8a5a32')); R.rect(mx - 4, my - 6, mx + 6, my - 1, K); R.rect(mx - 3, my - 5, mx + 5, my - 2, hex('#7a7a82')); R.rect(mx - 3, my - 5, mx + 5, my - 5, hex('#c8c8d0'));
    R.rect(160, 118, 176, 122, hex('#e8582a')); R.rect(162, 119, 174, 121, hex('#ffb060')); }
  // las chispas de cada martillazo
  if (ultimo != null && d < 0.2 && levanta === 0) R.halo(166, 118, 30, verde > 0 ? [hex('#14301e'), hex('#1a8a4a'), hex('#d2ffe6')] : [hex('#3a1a10'), hex('#c85a1a'), hex('#ffe0a0')], 1.4 * (1 - d / 0.2));
  if (ultimo != null && d < 0.35 && levanta === 0) for (let k = 0; k < 12; k++) { const a = -Math.PI * (0.1 + 0.8 * hh(k, ultimo)), r = d * 70 * (0.5 + hh(k, ultimo, 2)); R.pset(Math.round(166 + Math.cos(a) * r), Math.round(118 + Math.sin(a) * r + d * d * 60), k % 2 ? hex('#ffd060') : hex('#ff8a2a')); }
  // antes de «turns out», el taller a oscuras: solo se ven la fragua y las chispas
  const osc = 0.58 * (1 - verde);
  if (osc > 0) { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const dx = x - 261, dy = y - 118, cerca = Math.max(0, 1 - Math.hypot(dx, dy) / 90); if (b4(x, y) < osc * (1 - cerca)) tinta(R, x, y, hex('#0a0608'), 0.85); } }
  // delante: el cubo de carbón con su pala, y la esquina de Atom y la barra del año en sombra
  R.rect(282, 158, 318, 180, K); R.rect(284, 160, 316, 180, hex('#3a3a42')); R.rect(284, 160, 316, 161, hex('#6a6a72')); for (let k = 0; k < 14; k++) R.disco(288 + (k * 7) % 26, 160 - (k % 3), 2, hex('#141214')); R.linea(300, 158, 312, 138, hex('#6a4a2a')); R.rect(296, 156, 304, 160, hex('#5a5a62'));
  for (let y = 0; y < 72; y++) for (let x = 230; x < 320; x++) { const a2 = 0.6 * Math.min(1, (x - 230) / 26, (72 - y) / 26); if (a2 > 0) tinta(R, x, y, hex('#100c0e'), a2); }
  for (let y = 0; y < 24; y++) for (let x = 14; x < 180; x++) tinta(R, x, y, hex('#100c0e'), 0.45 * Math.min(1, (24 - y) / 8));
  if (verde > 0 && verde < 1) T.tinte(R, 22, 179, [58, 232, 138], 0.35 * (1 - verde));
};
const efectos = [[0.6, 'publico'], [NEWNAME, 'brillo'], [FOUR, 'tic'], [FOUR + 0.9, 'pop'], [REQUIRED, 'whoosh'], [KNOCKS - 0.05, 'toc'], [18.2, 'puerta'], [HELP, 'brillo'],
  [SEES, 'aviso'], [COLLIDE, 'boom'], ...GOLPES.map((g) => [g, 'golpecito']), [TURNS, 'flash'], [MASK + 0.3, 'vapor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '2026', efectos, año: 2026 });
''')
