E = {}

E['te-masones'] = ('Los templarios masones', '''// TE-MASONES (frases 27–29). Los templarios «sobreviven» en la masonería. Cinco planos:
// 1. (el salón de una logia alemana de noche, hacia 1756, a la luz de las velas) dos hermanos entran por la izquierda con
//    un manto blanco doblado; en «Germany» llegan al centro de la alfombra; el venerable se levanta del sitial y señala;
//    en «go further» despliegan el manto con su cruz roja (un hermano sentado se asoma);
// 2. (fondo local: la antesala de la logia, corte en «claim») paneles de roble, la ventana con el pueblo nevado, el
//    estandarte azul con la escuadra y el compás, el cuadro del caballero templario; en «Templars» le ponen el manto al
//    hermano del centro (destellos); en «survived» el templario del cuadro sonríe y en «secret» pide silencio con el
//    dedo; los demás asienten; en «inside Freemasonry» brillan la escuadra y el compás y aplauden;
// 3. (el desfile de hoy, corte en «There's») tres caballeros de la orden masónica con manto blanco y sombrero de pluma
//    desfilan con su estandarte; en «popular» el público aplaude, una turista hace una foto (flash) y cae confeti;
// 4. (el bordillo de cerca, corte en «Masonic») los caballeros pasan por delante; en «Knights Templar» una niña les
//    saluda y en «still exists» el primero se quita el sombrero y la saluda; un perro mueve la cola;
// 5. (la torre del Temple de noche, corte en «So the lost») el buscador entra con un farol; en «became» se abren los
//    cofres: casi vacíos; en «lost secret» del del centro sube un sobre con un «?»; lo coge, le da la vuelta y en
//    «even harder» se rasca la cabeza («?»).''', r'''
const A = (f) => en('alemania', f), O = (f) => en('orden', f), Q = (f) => en('secreto', f);
const GERM = A(0.305), FURTH = A(0.389), P2 = A(0.4836), TEMPL = A(0.5706), SURV = A(0.6395), SECR = A(0.74), INSIDE = A(0.793), FREEM = A(0.861);
const P3 = O(0), PROVES = O(0.13), IDEA = O(0.281), POPU = O(0.415), P4 = O(0.5438), KNIG = O(0.7265), STILL = O(0.829), TODAY = O(0.921);
const P5 = Q(0), TREAS = Q(0.114), BECAME = Q(0.194), LSEC = Q(0.302), TOO = Q(0.439), EVEN = Q(0.729), FIND = Q(0.868);
const K = T.C.k;
const PL = (o) => { const r = {}; for (const k in o) r[k] = typeof o[k] === 'string' ? hex(o[k]) : o[k]; return r; };
const H = (x, y, s) => { const v = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v); };
const rgb = (c) => [c & 255, (c >> 8) & 255, (c >> 16) & 255];
const mez = (c, [r, g, b], a) => { const [cr, cg, cb] = rgb(c); return (0xff000000 | (Math.round(cb + (b - cb) * a) << 16) | (Math.round(cg + (g - cg) * a) << 8) | Math.round(cr + (r - cr) * a)) >>> 0; };
const mz = (p, q, u) => mez(p, rgb(q), u);
// un halo de luz cálida alrededor de (cx, cy): mezcla los píxeles hacia col, más cuanto más cerca
const halo = (cx, cy, r, col, a) => { const c = rgb(hex(col)); for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(319, cx + r); x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1) R.pset(x, y, mez(R.pget(x, y), c, a * (1 - d) * (1 - d))); } };
// destellos que salen de (x, y) durante u 0–1
const destello = (x, y, u, col = '#fff6c0', n = 8, r0 = 3, r1 = 10) => { if (u <= 0 || u >= 1) return; for (let q = 0; q < n; q++) { const an = q / n * Math.PI * 2 + u, r = r0 + u * r1; R.pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r), hex(col)); if (q % 2 === 0) R.pset(Math.round(x + Math.cos(an) * (r - 1)), Math.round(y + Math.sin(an) * (r - 1)), hex(col)); } };
// el manto blanco con la cruz roja, doblado (abre 0) o desplegado (abre 1), sostenido por arriba en (x, y)
const manto = (x, y, abre, t) => { x = Math.round(x); y = Math.round(y); const w = Math.round(lerp(5, 9, abre)), h = Math.round(lerp(5, 17, abre));
  R.rect(x - w - 1, y - 1, x + w + 1, y + h + 1, K);
  for (let j = 0; j <= h; j++) for (let i = -w; i <= w; i++) { const pl = abre > 0.5 && (i + w) % 4 === 0 && j > 2, ond = abre > 0.5 && j === h && (i + Math.floor(t * 6)) % 3 === 0;
    R.pset(x + i, y + j, ond ? K : pl ? hex('#d8d2c4') : i < -w + 2 ? hex('#ffffff') : hex('#f2eee2')); }
  const cy = y + Math.round(h * 0.45), s = Math.max(2, Math.round(abre * 3));
  R.rect(x - 1, cy - s - 1, x + 1, cy + s + 1, hex('#c8303a')); R.rect(x - s - 1, cy - 1, x + s + 1, cy + 1, hex('#c8303a')); R.pset(x, cy, hex('#e8505a')); };
// el sombrero de pluma de la orden de hoy (bicornio negro con ribete dorado y la pluma blanca que se mece)
const sombrero = (x, y, dir, t, k = 0) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 7, y - 1, x + 7, y + 1, K); R.rect(x - 6, y - 3, x + 6, y - 2, K); R.rect(x - 6, y - 1, x + 6, y, hex('#22222e')); R.rect(x - 5, y - 3, x + 5, y - 2, hex('#2e2e3c')); R.linea(x - 6, y + 1, x + 6, y + 1, hex('#c8a040')); R.pset(x + 3 * dir, y - 1, hex('#e8c050'));
  const b = Math.round(Math.sin(t * 7 + k) * 1.2);
  for (let i = 0; i < 9; i++) { const px = x - dir * (i - 2), py = y - 3 - Math.round(Math.sin(i / 8 * Math.PI) * 5) - (i > 5 ? b : 0); R.pset(px, py, hex('#ffffff')); R.pset(px, py - 1, hex('#f2eee2')); R.pset(px, py + 1, i % 2 ? hex('#d8d4cc') : hex('#ffffff')); }
  R.pset(x - dir * 7, y - 4 - b, hex('#ffffff')); R.pset(x - dir * 8, y - 2 - b, hex('#e8e4dc')); };
// un caballero de la orden masónica de hoy: manto blanco con cruz roja y sombrero de pluma
const KT = (x, S, t, o = {}) => { const m = R.actor(EL.templario, x, S, t, { tocado: false, bigote: true, pal: PL({ H: o.pelo ?? '#8a8a96', h: '#b8b8c4', L: '#1c1c24' }), ...o });
  if (!o.sinSombrero) sombrero(x + 8, S - 26 - (o.anda ? (Math.floor(t * 5 + x * 0.37) % 2) : 0), o.dir ?? 1, t, x); return m; };

// 1 · el salón de la logia alemana: traen el manto
const p1 = (t) => {
  const d = T.logia(R, t, { encuadre: 'salon', lugar: 'alemania' });
  const S = d.suelo;
  // el venerable en el estrado: se levanta del sitial y señala en «go further»
  { const sube = tramo(t, GERM - 0.6, GERM); R.actor(EL.mason, 152, d.estrado - Math.round((1 - sube) * 0), t, { dir: 1, pal: PL({ C: '#5a1e2a', c: '#3e141e', A: '#c8303a' }), dedo: t > FURTH - 0.2 && t < P2, habla: t > FURTH && Math.sin(t * 9) > 0, sonrisa: t > FURTH + 0.5 }); }
  // los dos hermanos que traen el manto doblado y lo despliegan en «go further»
  const u = tramo(t, 0.1, GERM), abre = tramo(t, FURTH, FURTH + 0.5);
  const x1 = Math.round(lerp(-30, 124, u)), x2 = Math.round(lerp(-52, 102, u)), anda = u > 0 && u < 1;
  const m1 = R.actor(EL.mason2, x1, S, t, { dir: 1, anda, pal: PL({ C: '#2a3a5a', c: '#1e2a44', A: '#c8a040' }), sostiene: [x1 + 18, S - 18 - Math.round(abre * 8)], sonrisa: t > FURTH + 0.4 }).mano;
  R.actor(EL.mason, x2, S, t, { dir: 1, anda, pal: PL({ C: '#3a2a1e', c: '#2a1e14', A: '#3a9a5a' }), habla: !anda && t < FURTH && Math.sin(t * 8) > 0.2, dedo: t > FURTH + 0.2 && t < FURTH + 1.1 });
  manto(m1[0] + 2, m1[1] - 2 - Math.round(abre * 6), abre, t);
  destello(m1[0] + 2, m1[1] + 4, tramo(t, FURTH + 0.4, FURTH + 1.1));
  // un hermano de la derecha se levanta del banco para mirar
  { const se = tramo(t, FURTH - 0.2, FURTH + 0.3); R.actor(EL.mason, 226, S - 2, t, { dir: -1, pal: PL({ C: '#4a2a1a', c: '#33200e', A: '#3a6ac8' }), sorpresa: t > FURTH && t < FURTH + 0.6, sonrisa: t > FURTH + 0.6, salto: Math.round(se * 2) }); }
  // la vela de un candelero que un hermano enciende al principio, al fondo a la izquierda
  { const u2 = tramo(t, 0.2, 2.0), m0 = R.actor(EL.mason2, 46, S - 4, t, { dir: 1, pal: PL({ C: '#3a3a3a', c: '#2a2a2a', A: '#e8b830' }), sostiene: [64, S - 22 + Math.round(Math.sin(u2 * Math.PI) * 2)] }).mano;
    if (m0) { R.rect(m0[0] - 1, m0[1] - 7, m0[0] + 1, m0[1] - 2, hex('#f2eee2')); R.pset(m0[0] + 1, m0[1] - 6, hex('#d8d0b0')); const f = Math.sin(t * 13) > 0 ? 1 : 0; R.pset(m0[0], m0[1] - 8, hex('#ffd860')); R.pset(m0[0] + f, m0[1] - 9, hex('#ff9a30')); R.pset(m0[0], m0[1] - 10, hex('#fff4c0')); halo(m0[0], m0[1] - 9, 9, '#ffd890', 0.35); } }
};

// 2 · la antesala: le ponen el manto; el templario del cuadro sonríe y pide silencio
const B2 = R.nuevo(); let hecho2 = false;
const pintaAntesala = () => {
  const p = (x, y, c) => R.pset(x, y, c), r = (x0, y0, x1, y1, c) => R.rect(x0, y0, x1, y1, c);
  // la pared de roble: tablas con vetas, la cornisa con dentículos y el friso
  for (let y = 0; y <= 128; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor(x / 9), v = H(tb, Math.floor((y + tb * 7) / 5), 3);
    p(x, y, x % 9 === 0 ? hex('#2a180e') : v < 0.18 ? hex('#3e2414') : v > 0.85 ? hex('#5e3a22') : (Math.sin(y * 0.4 + tb * 2 + Math.sin(y * 0.11) * 2) > 0.85 ? hex('#3a2212') : hex('#4a2e1a'))); }
  r(0, 0, 319, 9, hex('#2a180e')); for (let x = 0; x < 320; x += 5) { r(x, 6, x + 2, 9, hex('#6a4426')); p(x, 6, hex('#8a5e36')); } r(0, 10, 319, 11, hex('#8a6a30')); r(0, 12, 319, 12, hex('#1e1008'));
  // los paneles en relieve del zócalo y de arriba (luz arriba a la izquierda, sombra abajo a la derecha)
  const panel = (x0, y0, x1, y1) => { r(x0, y0, x1, y1, hex('#55341e')); r(x0, y0, x1, y0, hex('#7a5232')); r(x0, y0, x0, y1, hex('#6a4428')); r(x0, y1, x1, y1, hex('#24140a')); r(x1, y0, x1, y1, hex('#2e1a0c'));
    r(x0 + 3, y0 + 3, x1 - 3, y1 - 3, hex('#4a2c18')); r(x0 + 3, y0 + 3, x1 - 3, y0 + 3, hex('#2e1a0c')); r(x0 + 3, y1 - 3, x1 - 3, y1 - 3, hex('#6a4428'));
    for (let y = y0 + 5; y < y1 - 4; y += 3) for (let x = x0 + 5; x < x1 - 4; x++) if (H(x, y, 9) < 0.12) p(x, y, hex('#3e2414')); };
  for (const x of [4, 76, 214, 278]) panel(x, 104, x + 36, 124);
  for (const x of [278]) panel(x, 52, x + 36, 96);
  r(0, 100, 319, 101, hex('#7a5232')); r(0, 102, 319, 102, hex('#24140a'));
  r(0, 125, 319, 128, hex('#2a180e')); r(0, 125, 319, 125, hex('#6a4428'));
  // la ventana con el pueblo nevado de noche (lo de dentro lo pinta cada fotograma) y sus cortinas rojas
  r(17, 27, 63, 97, K); r(18, 28, 62, 96, hex('#6a4428'));
  for (const [x0, x1] of [[8, 20], [60, 72]]) for (let y = 22; y <= 100; y++) for (let x = x0; x <= x1; x++) { const f = Math.sin((x - x0) * 1.3 + (y > 80 ? (y - 80) * 0.1 : 0)); p(x, y, f > 0.6 ? hex('#a83a3a') : f < -0.5 ? hex('#5a1418') : hex('#8a2a2e')); }
  r(6, 20, 74, 23, hex('#c8a040')); for (let x = 8; x <= 72; x += 3) p(x, 24, hex('#e8c050'));
  for (const x0 of [8, 60]) { r(x0, 70, x0 + 12, 72, hex('#e8c050')); p(x0 + 6, 73, hex('#c8a040')); }
  r(16, 97, 64, 100, hex('#7a5232')); r(16, 97, 64, 97, hex('#a07048'));
  // el marco dorado del cuadro (el cuadro lo pinta cada fotograma)
  r(117, 25, 215, 101, K); r(118, 26, 214, 100, hex('#c8a040'));
  for (let i = 0; i < 5; i++) { r(118 + i, 26 + i, 214 - i, 26 + i, i < 2 ? hex('#f0d070') : hex('#a88030')); r(118 + i, 100 - i, 214 - i, 100 - i, hex('#8a6420')); r(118 + i, 26 + i, 118 + i, 100 - i, i < 2 ? hex('#e8c050') : hex('#a88030')); r(214 - i, 26 + i, 214 - i, 100 - i, hex('#8a6420')); }
  for (const [x, y] of [[120, 28], [212, 28], [120, 98], [212, 98], [166, 27], [166, 99]]) { R.disco(x, y, 3, hex('#f0d070')); p(x, y, hex('#fff6c0')); p(x + 1, y + 1, hex('#8a6420')); }
  r(123, 31, 209, 95, K);
  // el armario con los mantos colgados a la derecha
  r(229, 30, 273, 127, K); r(230, 31, 272, 126, hex('#3a2212')); r(230, 31, 272, 35, hex('#5e3a22')); r(232, 36, 270, 124, hex('#24140a'));
  r(234, 40, 268, 41, hex('#8a8a96')); for (const x of [238, 252, 264]) { r(x - 1, 41, x + 1, 43, hex('#b8b8c4')); }
  for (const [x, cruz] of [[238, true], [264, true]]) { for (let y = 44; y <= 98; y++) { const w = 4 + Math.floor((y - 44) / 9); for (let i = -w; i <= w; i++) p(x + i, y, i === -w || i === w ? K : (i + y) % 7 === 0 ? hex('#d8d2c4') : i < -w + 2 ? hex('#ffffff') : hex('#ece6d8')); }
    if (cruz) { r(x - 1, 56, x + 1, 70, hex('#c8303a')); r(x - 5, 60, x + 5, 62, hex('#c8303a')); } }
  // la percha vacía del medio (el manto que le ponen) y una espada en su vaina
  r(251, 44, 253, 46, hex('#8a8a96')); R.linea(258, 50, 258, 118, hex('#5a5a62')); R.linea(259, 50, 259, 118, hex('#2a2430')); r(254, 54, 263, 55, hex('#c8a040')); r(257, 46, 260, 49, hex('#c8a040'));
  r(229, 120, 273, 127, hex('#5e3a22')); r(229, 120, 273, 120, hex('#7a5232'));
  // el suelo ajedrezado en perspectiva con su reflejo
  for (let y = 129; y < 180; y++) { const z = (y - 120) / 60, fila = Math.floor(Math.log(z * 8 + 1) * 3.2);
    for (let x = 0; x < 320; x++) { const col = Math.floor((x - 160) / (14 + z * 40) + 100); const neg = (col + fila) % 2 === 0, c = neg ? (H(x, y, 4) < 0.1 ? hex('#3a3440') : hex('#262230')) : (H(x, y, 5) < 0.12 ? hex('#cfc6b0') : hex('#e2dac6')); p(x, y, c); } }
  r(0, 129, 319, 129, hex('#120c08'));
  // la alfombra roja que cruza el suelo
  for (let y = 150; y < 180; y++) { const w = Math.round(50 + (y - 150) * 1.2); for (let x = 160 - w; x <= 160 + w; x++) p(x, y, x === 160 - w || x === 160 + w ? hex('#e8c050') : (x + y) % 5 === 0 ? hex('#7a1e24') : hex('#9a2a30')); }
  // la consola con libros y el reloj de mesa, a la izquierda
  r(78, 104, 112, 106, hex('#6a4428')); r(78, 104, 112, 104, hex('#8a5e36')); r(80, 107, 82, 127, hex('#3a2212')); r(108, 107, 110, 127, hex('#3a2212'));
  for (const [x, c] of [[84, '#2a4a6a'], [88, '#7a2a2a'], [92, '#3a5a2a']]) { r(x, 92, x + 3, 103, K); r(x + 1, 93, x + 2, 103, hex(c)); p(x + 1, 95, hex('#c8a040')); }
  r(98, 90, 108, 103, K); r(99, 91, 107, 103, hex('#5e3a22')); R.disco(103, 96, 3, hex('#f2eee2')); p(103, 96, K); p(104, 95, K); };
const p2 = (t) => {
  if (!hecho2) { const prev = R.usar(B2); pintaAntesala(); R.usar(prev); hecho2 = true; }
  R.copiar(B2);
  // por la ventana: el cielo de noche, la luna, los tejados nevados con ventanas encendidas y la nieve que cae
  R.recorte([18, 28, 62, 96]);
  for (let y = 28; y <= 96; y++) R.linea(18, y, 62, y, y < 50 ? hex('#141c38') : y < 70 ? hex('#1e2a4a') : hex('#2a3658'));
  for (const [x, y] of [[24, 34], [40, 31], [55, 44], [30, 52], [48, 58]]) R.pset(x, y, (Math.sin(t * 3 + x) > 0.3) ? hex('#ffffff') : hex('#8a9ac8'));
  R.disco(50, 38, 5, hex('#f2eee2')); R.disco(52, 37, 4, hex('#1e2a4a'));
  for (const [x0, w, top] of [[18, 14, 70], [30, 12, 64], [42, 10, 72], [52, 12, 66]]) { for (let y = top; y <= 96; y++) for (let x = x0; x <= x0 + w; x++) { const tej = y < top + Math.round(w / 2) - Math.abs(x - x0 - w / 2); if (tej) continue; R.pset(x, y, y < top + Math.round(w / 2) - Math.abs(x - x0 - w / 2) + 2 ? hex('#e8ecf4') : (x + y) % 5 === 0 ? hex('#3a3046') : hex('#4a3e52')); }
    const lit = Math.sin(t * 0.7 + x0) > -0.6; R.pset(x0 + 4, top + 10, lit ? hex('#f8c860') : hex('#2a2430')); R.pset(x0 + 4, top + 11, lit ? hex('#e8a040') : hex('#2a2430')); R.pset(x0 + 8, top + 16, hex('#f8c860')); }
  for (let k = 0; k < 18; k++) { const x = 18 + ((k * 23 + t * (6 + k % 3)) % 45), y = 28 + ((k * 37 + t * (10 + k % 4) * 1.4) % 69); R.pset(Math.round(x + Math.sin(t * 2 + k) * 1.5), Math.round(y), hex('#ffffff')); }
  R.recorte(null);
  R.rect(39, 28, 41, 96, hex('#6a4428')); R.rect(18, 60, 62, 61, hex('#6a4428')); R.linea(40, 28, 40, 96, hex('#8a5e36'));
  // el cuadro: un templario en lo alto de una colina al atardecer, con su estandarte; sonríe en «survived» y pide silencio en «secret»
  R.recorte([124, 32, 208, 94]);
  for (let y = 32; y <= 94; y++) R.linea(124, y, 208, y, y < 46 ? hex('#e8a868') : y < 60 ? hex('#d08a5a') : hex('#a86a4a'));
  R.disco(186, 54, 8, hex('#f8d890'));
  for (let x = 124; x <= 208; x++) { const yh = Math.round(66 + Math.sin(x * 0.08) * 4 + Math.sin(x * 0.21) * 2); R.linea(x, yh, x, 94, (x + yh) % 4 === 0 ? hex('#4a5a34') : hex('#5a6a3a')); R.pset(x, yh, hex('#7a8a4a')); }
  for (let x = 130; x <= 150; x++) { const yh = 58 + Math.abs(x - 140) % 6; R.linea(x, yh, x, 66, hex('#7a6a5a')); } R.rect(134, 50, 138, 58, hex('#7a6a5a')); R.rect(144, 52, 148, 58, hex('#7a6a5a')); R.pset(136, 49, hex('#c8303a'));
  for (let x = 124; x <= 208; x++) { const y = Math.round(84 + Math.sin(x * 0.05 + 1) * 3); R.linea(x, y, x, 94, (x * 3 + y) % 5 === 0 ? hex('#3a4a2a') : hex('#4a5a30')); }
  { const KX = 160, KS = 86, sonr = t > SURV, chis = t > SECR && t < INSIDE + 0.6;
    R.actor(EL.templario, KX, KS, t, { dir: -1, sonrisa: sonr && !chis, dedo: chis, sostiene: chis ? false : [KX - 4, KS - 22] });
    if (!chis) { const lx = KX - 4; R.linea(lx, KS - 34, lx, KS + 2, hex('#6a4a2a')); for (let j = 0; j <= 8; j++) for (let i = 1; i <= 11; i++) { const w = Math.round(Math.sin(t * 6 + i * 0.6) * (i / 11) * 1.5); R.pset(lx - i, KS - 34 + j + w, j < 4 ? K : hex('#f2eee2')); } }
    if (t > SURV && t < SURV + 0.35) { R.pset(KX + 4, KS - 19, K); R.pset(KX + 5, KS - 19, K); } }
  R.recorte(null);
  // el barniz del cuadro: un reflejo que pasa en «survived»
  { const u = tramo(t, SURV - 0.2, SURV + 0.6); if (u > 0 && u < 1) { const x0 = Math.round(lerp(110, 220, u)); for (let y = 32; y <= 94; y++) for (let i = 0; i < 3; i++) { const x = x0 + i - Math.round((y - 32) * 0.4); if (x >= 124 && x <= 208) R.pset(x, y, mez(R.pget(x, y), [255, 250, 230], 0.5)); } } }
  // el estandarte azul con la escuadra y el compás, que se mece; brilla en «inside Freemasonry»
  { const br = tramo(t, INSIDE, FREEM) - tramo(t, FREEM + 0.8, FREEM + 1.4), x0 = 80, sw = Math.sin(t * 1.3);
    R.linea(76, 22, 112, 22, hex('#c8a040')); R.disco(76, 22, 1, hex('#f0d070')); R.disco(112, 22, 1, hex('#f0d070'));
    for (let y = 23; y <= 76; y++) { const dx = Math.round(sw * (y - 23) / 53 * 1.5), w = y > 68 ? Math.max(0, 16 - (y - 68) * 2) : 16;
      for (let x = x0 + 16 - w; x <= x0 + 16 + w; x++) R.pset(x + dx, y, x === x0 + 16 - w || x === x0 + 16 + w ? K : (x + y) % 9 === 0 ? hex('#22408a') : x < x0 + 6 ? hex('#3a5ab0') : hex('#2a4a9a')); }
    const g = br > 0 ? hex('#fff2a0') : hex('#e8c050'), cx = x0 + 16 + Math.round(sw * 0.8), cy = 44;
    for (let i = 0; i <= 10; i++) { R.pset(cx - i, cy + i, g); R.pset(cx + i, cy + i, g); R.pset(cx - i + 1, cy + i, g); R.pset(cx + i - 1, cy + i, g); }
    for (let i = 0; i <= 9; i++) { R.pset(cx - 9 + i, cy + 16 - i, g); R.pset(cx + 9 - i, cy + 16 - i, g); }
    R.disco(cx, cy - 1, 2, g); R.pset(cx, cy - 1, hex('#2a4a9a'));
    for (let x = x0 + 2; x <= x0 + 30; x += 3) R.linea(x, 77 + Math.round(sw), x, 80 + Math.round(sw), hex('#e8c050'));
    if (br > 0) { halo(cx, cy + 8, 22, '#fff2a0', 0.5 * br); destello(cx, cy + 8, (t - INSIDE) % 1, '#fff6c0', 10, 8, 10); } }
  // los apliques con velas en la pared, con su luz que tiembla
  for (const [x, y] of [[100, 60], [224, 60]]) { R.rect(x - 4, y + 4, x + 4, y + 6, hex('#c8a040')); R.rect(x - 1, y + 7, x + 1, y + 12, hex('#a88030')); for (const dx of [-3, 3]) { R.rect(x + dx - 1, y - 2, x + dx + 1, y + 3, hex('#f2eee2')); const f = Math.sin(t * 13 + dx + x) > 0 ? 1 : 0; R.pset(x + dx, y - 3, hex('#ffd860')); R.pset(x + dx + f, y - 4, hex('#ff9a30')); R.pset(x + dx, y - 5, hex('#fff4c0')); }
    halo(x, y - 4, 16 + Math.sin(t * 9 + x) * 1.5, '#ffd890', 0.28); }
  // los personajes: el iniciado en el centro; el hermano que le pone el manto; dos que asienten
  const S = 168, pone = tramo(t, P2 + 0.05, TEMPL), puesto = t >= TEMPL;
  const asiente = (k) => t > SURV && Math.sin((t - SURV) * 9 + k) > 0.6 ? 1 : 0;
  // los que asienten, a la derecha
  R.actor(EL.mason, 192, S + asiente(0), t, { dir: -1, pal: PL({ C: '#4a2a1a', c: '#33200e', A: '#3a6ac8' }), sonrisa: t > SURV, brazos: t > FREEM + 0.3 && Math.sin(t * 14) > 0 });
  R.actor(EL.mason2, 214, S + asiente(1.7), t, { dir: -1, pal: PL({ C: '#2a3a2a', c: '#1e2a1e', A: '#e8b830' }), sonrisa: t > SURV + 0.3, habla: t > TEMPL && t < SURV && Math.sin(t * 9) > 0 });
  // el iniciado: con mandil y tricornio; en «Templars», con el manto blanco y la cruz roja
  const IX = 146;
  if (!puesto) R.actor(EL.mason2, IX, S, t, { dir: -1, pal: PL({ C: '#3a2a3a', c: '#2a1e2a', A: '#c8303a' }), sonrisa: t > P2 + 0.4 });
  else R.actor(EL.templario, IX, S, t, { dir: t > INSIDE ? -1 : 1, tocado: 'tricornio', bigote: false, pal: PL({ H: '#e8e4dc', h: '#c8c4bc', J: '#1c1c24', j: '#3a3a4a' }), sonrisa: true, brazos: t > TEMPL + 0.2 && t < TEMPL + 0.9 });
  destello(IX + 8, S - 14, tramo(t, TEMPL - 0.05, TEMPL + 0.6), '#fff6c0', 10, 6, 10);
  // el hermano que le pone el manto: se lo sube por encima de los hombros y baja las manos
  { const x = 118, alto = puesto ? 0 : 1, m = R.actor(EL.mason, x, S, t, { dir: 1, pal: PL({ C: '#2a3a5a', c: '#1e2a44', A: '#c8a040' }), sostiene: puesto ? false : [IX + 2, S - 24 + Math.round(pone * 6)], dedo: t > SECR && t < INSIDE + 0.4, sonrisa: t > INSIDE + 0.4 }).mano;
    if (alto && m) manto(m[0] + 5, m[1] - 3, 1, t); }
  // un gato negro en la consola que mueve la cola
  { const x = 86, y = 103; R.rect(x - 3, y - 4, x + 3, y, K); R.rect(x + 1, y - 7, x + 4, y - 4, K); R.pset(x + 1, y - 8, K); R.pset(x + 4, y - 8, K); R.pset(x + 3, y - 6, (t % 3.4) < 0.15 ? K : hex('#e8d040'));
    for (let i = 1; i <= 5; i++) R.pset(x - 3 - i, Math.round(y - Math.max(0, i - 2) * (0.6 + 0.5 * Math.sin(t * 2.4 + i * 0.5))), K); }
};

// 3 · el desfile de hoy: los caballeros con su estandarte; en «popular», aplausos, foto y confeti
const confeti = (t, t0, x0, x1, n = 40) => { if (t < t0) return; const u = t - t0; for (let k = 0; k < n; k++) { const x = x0 + H(k, 1, 2) * (x1 - x0) + Math.sin(u * 3 + k) * 4, y = -4 + u * (24 + H(k, 2, 3) * 26) - H(k, 3, 4) * 30; if (y < 16 || y > 178) continue; const c = ['#e84a5a', '#3a8ae8', '#f8d040', '#3ac86a', '#f2eee2', '#e878c8'][k % 6]; R.pset(Math.round(x), Math.round(y), hex(c)); if ((k + Math.floor(u * 8)) % 2) R.pset(Math.round(x) + 1, Math.round(y), hex(c)); } };
const p3 = (t) => {
  const d = T.logia(R, t, { encuadre: 'desfile' });
  const S = d.suelo, A0 = d.acera, u = (t - P3) / (P4 - P3);
  // en la acera: un fotógrafo que hace la foto en «popular» y dos que aplauden
  const flash = t > POPU && t < POPU + 0.25;
  { const m = R.actor(EL.periodista, 238, A0, t, { dir: -1, sostiene: [240, A0 - 16], sonrisa: t > POPU + 0.3 }).mano; R.rect(m[0] - 3, m[1] - 3, m[0] + 2, m[1] + 1, K); R.rect(m[0] - 2, m[1] - 2, m[0] + 1, m[1], hex('#3a3a4a')); R.pset(m[0] - 3, m[1] - 1, hex('#8ab0d0'));
    if (flash) { halo(m[0] - 4, m[1] - 2, 14, '#ffffff', 0.9); R.pset(m[0] - 4, m[1] - 2, hex('#ffffff')); } }
  R.actor(EL.estudiante, 262, A0, t, { dir: -1, brazos: t > POPU && Math.sin(t * 16) > -0.2, sonrisa: t > IDEA });
  R.actor(EL.arqueologo, 280, A0, t, { dir: -1, sonrisa: true, brazos: t > POPU + 0.1 && Math.sin(t * 15 + 1) > 0 });
  // los tres caballeros que desfilan de izquierda a derecha (el abanderado delante)
  const xb = Math.round(lerp(30, 244, u));
  for (const [dx, k] of [[0, 0], [-30, 1], [-54, 2]]) {
    const x = xb + dx, aband = k === 0;
    const m = KT(x, S, t, { dir: 1, anda: true, pelo: ['#8a8a96', '#5a3418', '#c8c4bc'][k], sostiene: aband ? [x + 16, S - 20] : false, sonrisa: t > POPU, habla: k === 1 && t > IDEA - 0.3 && t < POPU && Math.sin(t * 9) > 0 }).mano;
    if (aband && m) { const lx = m[0]; R.linea(lx, m[1] + 8, lx, m[1] - 30, hex('#c8a040')); R.linea(lx + 1, m[1] + 8, lx + 1, m[1] - 30, hex('#8a6420')); R.disco(lx, m[1] - 31, 1, hex('#f0d070'));
      const des = tramo(t, P3 + 0.2, PROVES); for (let j = 0; j <= Math.round(16 * des); j++) for (let i = 2; i <= 18; i++) { const w = Math.round(Math.sin(t * 8 - i * 0.6) * (i / 18) * 1.5), y = m[1] - 29 + j + w; const cx = i >= 9 && i <= 11, cy = j >= 7 && j <= 9;
        R.pset(lx - i, y, j === 0 || i === 18 ? K : (cx && j >= 3 && j <= 13) || (cy && i >= 5 && i <= 15) ? hex('#c8303a') : j === Math.round(16 * des) ? hex('#e8c050') : hex('#f2eee2')); } } }
  // un tambor que cierra la fila, más atrás
  { const x = xb - 86, g = Math.sin(t * 10) > 0; const m = KT(x, S, t, { dir: 1, anda: true, sostiene: [x + 16, S - 12 - (g ? 2 : 0)], pelo: '#3a2a1a' }).mano;
    if (m) { R.rect(x + 9, S - 15, x + 19, S - 7, K); R.rect(x + 10, S - 14, x + 18, S - 8, hex('#c8303a')); R.rect(x + 10, S - 14, x + 18, S - 13, hex('#f2eee2')); for (let i = 0; i < 4; i++) R.pset(x + 11 + i * 2, S - 11 + (i % 2), hex('#e8c050')); R.linea(m[0], m[1], m[0] - 3, m[1] - 4 + (g ? 3 : 0), hex('#d8c8a0')); } }
  confeti(t, POPU - 0.1, 30, 300, 60);
};

// 4 · el bordillo de cerca: la niña saluda y el caballero se quita el sombrero
const p4 = (t) => {
  const d = T.logia(R, t, { encuadre: 'desfile', camara: 'cerca' });
  const S = d.suelo, A0 = d.acera, u = (t - P4) / (P5 - P4);
  // en la acera: la niña y su madre con el globo; un perro que mueve la cola
  const sal = t > KNIG - 0.1 && t < TODAY + 0.6;
  R.actor(EL.nina, 150, A0, t, { dir: 1, dedo: sal, sonrisa: t > KNIG - 0.4, sorpresa: t > STILL && t < STILL + 0.4, salto: t > STILL + 0.4 && t < STILL + 1.2 ? Math.round(Math.abs(Math.sin((t - STILL) * 9)) * 3) : 0 });
  { const m = R.actor(EL.turista, 124, A0, t, { dir: 1, sostiene: [128, A0 - 36], sonrisa: true }).mano;
    const gx = m[0] + Math.round(Math.sin(t * 1.6) * 2), gy = m[1] - 22; R.linea(m[0], m[1], gx, gy + 6, hex('#e8e4dc')); R.disco(gx, gy, 6, K); R.disco(gx, gy, 5, hex('#e84a5a')); R.pset(gx - 2, gy - 2, hex('#ffb0b8')); R.pset(gx - 1, gy - 3, hex('#ffb0b8')); R.pset(gx, gy + 6, hex('#a8303a')); }
  { const x = 176, y = A0, c = Math.sin(t * 14) > 0 ? 1 : 0; R.rect(x, y - 6, x + 10, y - 3, K); R.rect(x + 1, y - 5, x + 9, y - 4, hex('#c88a4a')); R.rect(x + 8, y - 9, x + 13, y - 5, K); R.rect(x + 9, y - 8, x + 12, y - 6, hex('#c88a4a')); R.pset(x + 11, y - 7, K); R.pset(x + 13, y - 6, K); R.pset(x + 9, y - 9, hex('#8a5a2a'));
    for (const lx of [x + 1, x + 3, x + 7, x + 9]) R.rect(lx, y - 2, lx, y, K); R.pset(x - 1, y - 6 - c, K); R.pset(x - 2, y - 7 - c * 2, K); R.pset(x - 1, y - 5, hex('#c88a4a'));
    if (t > STILL && t < STILL + 1.2 && Math.sin(t * 10) > 0) { R.pset(x + 15, y - 9, hex('#f2eee2')); R.pset(x + 16, y - 10, hex('#f2eee2')); } }
  // los caballeros pasan por la calzada de derecha a izquierda; el primero se quita el sombrero ante la niña en «still exists»
  const xb = Math.round(lerp(332, -10, u));
  for (const [dx, k] of [[0, 0], [44, 1], [88, 2]]) {
    const x = xb + dx, quita = k === 0 ? tramo(t, STILL - 0.1, STILL + 0.3) - tramo(t, TODAY + 0.3, TODAY + 0.8) : 0;
    const m = KT(x, S, t, { dir: -1, anda: true, pelo: ['#c8c4bc', '#5a3418', '#8a8a96'][k], sinSombrero: quita > 0, sostiene: quita > 0 ? [x - 2, S - 26 - Math.round(quita * 6)] : false, sonrisa: t > KNIG }).mano;
    if (quita > 0 && m) sombrero(m[0], m[1] - 3, -1, t, k);
  }
  // el coche de la orden (un descapotable antiguo con banderín) que viene detrás, por delante de la gente
  { const x = Math.round(lerp(332, -10, u)) + 140; if (x < 330) { R.rect(x, S - 14, x + 56, S - 4, K); R.rect(x + 1, S - 13, x + 55, S - 5, hex('#1e2a5a')); R.rect(x + 1, S - 13, x + 55, S - 12, hex('#3a4a8a')); R.rect(x + 14, S - 19, x + 30, S - 14, K); R.rect(x + 15, S - 18, x + 29, S - 15, hex('#a8c8e0'));
    for (const wx of [x + 12, x + 44]) { R.disco(wx, S - 3, 4, K); R.disco(wx, S - 3, 2, hex('#c8c8d0')); R.pset(wx + Math.round(Math.cos(t * 12) * 2), S - 3 + Math.round(Math.sin(t * 12) * 2), K); }
    R.rect(x + 2, S - 9, x + 54, S - 9, hex('#e8c050')); R.pset(x + 1, S - 12, hex('#f8e8a0')); R.linea(x + 50, S - 13, x + 50, S - 26, hex('#c8a040'));
    for (let j = 0; j < 6; j++) for (let i = 1; i <= 8; i++) R.pset(x + 50 + i, S - 26 + j + Math.round(Math.sin(t * 9 + i * 0.7) * i / 8), j === 0 ? K : (i >= 4 && i <= 5) || (j >= 2 && j <= 3) ? hex('#c8303a') : hex('#f2eee2')); } }
  confeti(t, P4 - 1.5, 10, 310, 50);
};

// 5 · la torre de noche, a la luz del farol: los cofres casi vacíos y el sobre con el «?»
const farol = (x, y, t) => { x = Math.round(x); y = Math.round(y);
  R.linea(x, y, x, y + 2, hex('#2a2024')); R.rect(x - 3, y + 3, x + 3, y + 3, K); R.rect(x - 3, y + 11, x + 3, y + 12, K);
  R.rect(x - 2, y + 4, x + 2, y + 10, hex('#f8d070')); R.rect(x - 1, y + 5, x + 1, y + 9, hex('#fff2b0'));
  R.linea(x - 3, y + 4, x - 3, y + 10, K); R.linea(x + 3, y + 4, x + 3, y + 10, K); R.linea(x, y + 4, x, y + 10, hex('#3a2a20')); R.pset(x + (Math.sin(t * 13) > 0 ? 1 : -1), y + 6, hex('#ffffff')); };
// la noche: oscurece todo menos el círculo de luz del farol (un solo recorrido de pantalla)
const noche = (cx, cy, r, t) => { const fl = 1 + Math.sin(t * 11) * 0.03 + Math.sin(t * 5.3) * 0.03, rr = r * fl;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - cx, (y - cy) * 1.15) / rr, c = R.pget(x, y), [cr, cg, cb] = rgb(c);
    const luz = d < 1 ? (1 - d) * (1 - d) : 0, os = 0.5 * (1 - Math.min(1, luz * 1.6)), tg = [cr * (1 - os) + 14 * os + luz * 70, cg * (1 - os) + 16 * os + luz * 46, cb * (1 - os) + 34 * os + luz * 8];
    R.pset(x, y, (0xff000000 | (Math.min(255, Math.round(tg[2])) << 16) | (Math.min(255, Math.round(tg[1])) << 8) | Math.min(255, Math.round(tg[0]))) >>> 0); } };
const p5 = (t) => {
  const abre = tramo(t, BECAME - 0.1, BECAME + 0.5);
  const d = T.temple(R, t, { encuadre: 'torre', camara: 'cofres', abre });
  const S = d.suelo, boca = d.bocas[1].boca;
  // el buscador entra con el farol, lo deja en el suelo y mira
  const ue = tramo(t, P5, P5 + 1.1), xb = Math.round(lerp(-20, 104, ue)), anda = ue > 0 && ue < 1;
  const deja = t > TREAS + 0.4, sube = tramo(t, LSEC - 0.1, LSEC + 0.5), coge = t > TOO, vuelta = tramo(t, TOO + 0.4, EVEN - 0.1), duda = t > EVEN;
  const fx = deja ? 96 : xb + 18, fy = deja ? S - 13 : S - 30;
  const sx0 = 160, sy0 = boca[1] + 2, sy = Math.round(sy0 - sube * 22 + Math.sin(t * 3) * (sube >= 1 && !coge ? 1 : 0));
  const m = R.actor(EL.buscador, xb, S, t, { dir: 1, anda, sostiene: coge ? [xb + 24, S - 26 - Math.round(Math.sin(vuelta * Math.PI) * 3)] : !deja ? [xb + 18, S - 16] : false, sorpresa: t > LSEC && t < TOO + 0.3, triste: duda && t < FIND + 0.4, dedo: duda && t > FIND + 0.4, habla: t > TREAS && t < TREAS + 0.6 }).mano;
  // un ratón que sale de un cofre y huye cuando se abren
  { const u = tramo(t, BECAME + 0.3, BECAME + 1.8); if (u > 0 && u < 1) { const x = Math.round(lerp(250, 330, u)), y = S - 2; R.rect(x, y - 2, x + 4, y, hex('#8a8a96')); R.pset(x + 5, y - 1, hex('#8a8a96')); R.pset(x + 4, y - 3, hex('#c8a0a0')); R.pset(x + 5, y - 2, K); R.linea(x - 1, y, x - 5, y - 1 - (Math.sin(t * 20) > 0 ? 1 : 0), hex('#c8a0a0')); } }
  noche(fx + 30, fy - 20, 150, t);
  // lo que está en la luz se repinta encima: el farol, el sobre y su brillo
  farol(fx, fy, t);
  if (sube > 0) { const ex = coge && m ? m[0] + 1 : sx0, ey = coge && m ? m[1] - 12 : sy, gira = coge && vuelta > 0.35 && vuelta < 0.75;
    if (!coge) halo(ex, ey + 4, 18, '#fff2a0', 0.45 * sube);
    R.rect(ex - 11, ey, ex + 11, ey + 14, K); R.rect(ex - 10, ey + 13, ex + 11, ey + 14, hex('#6a5a40'));
    for (let y = ey + 1; y <= ey + 12; y++) for (let x = ex - 10; x <= ex + 10; x++) R.pset(x, y, (x * 3 + y) % 13 === 0 ? hex('#e6dcc2') : y > ey + 9 ? hex('#e8dec6') : hex('#f6eed8'));
    if (!gira) { for (let i = 0; i <= 10; i++) { const yy = ey + 1 + Math.round(i * 0.6); R.pset(ex - 10 + i, yy, hex('#8a7a5a')); R.pset(ex + 10 - i, yy, hex('#8a7a5a')); R.pset(ex - 10 + i, yy + 1, hex('#d8ccb0')); R.pset(ex + 10 - i, yy + 1, hex('#d8ccb0')); }
      R.disco(ex, ey + 7, 2, hex('#a8202a')); R.pset(ex - 1, ey + 6, hex('#e84a5a')); }
    else { for (let i = 0; i <= 10; i++) { R.pset(ex - 10 + i, ey + 12 - Math.round(i * 0.5), hex('#c8bca0')); R.pset(ex + 10 - i, ey + 12 - Math.round(i * 0.5), hex('#c8bca0')); } }
    if (!duda) R.icono('?', ex - 4, ey - 17, hex('#fff2a0'), K, 2);
  }
  // el «?» que sale encima del buscador en «even harder»
  if (duda) { const y = S - 44 - Math.round(Math.min(1, (t - EVEN) * 3) * 4); R.icono('?', xb + 4, y, hex('#fff2a0'), K, 2); }
};

const efectos = [[0.8, 'golpecito'], [FURTH, 'papel'], [TEMPL - 0.1, 'whoosh'], [SURV, 'brillo'], [FREEM, 'brillo'], [FREEM + 0.4, 'palmada'],
  [P3 + 0.3, 'silbato'], [POPU, 'publico'], [POPU + 0.05, 'flash'], [KNIG, 'publico'], [STILL, 'pop'], [STILL + 0.5, 'guau'],
  [P5 + 0.3, 'golpecito'], [BECAME, 'cerrojo'], [LSEC, 'brillo'], [TOO, 'papel'], [EVEN, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => (t < P3 ? 1756 : 2026) });
''')

E['te-perceval'] = ('Perceval y el grial', '''// TE-PERCEVAL (frases 30–32), cartela «1190». Seis planos:
// 1. (fondo local: Troyes al anochecer, 1190) el cielo de ocaso con nubes y pájaros, la catedral y los tejados, la abadía
//    con la ventana encendida del scriptorium; en la plaza un juglar con su laúd cuenta una historia: en «story» le sale el
//    bocadillo con un libro abierto y una copa que brilla; los que escuchan se asombran; un carro de heno cruza al fondo;
// 2. (el scriptorium de noche, corte en «A French poet») Chrétien escribe en su pupitre bajo la lluvia; en «Chrétien»
//    levanta la vista y sonríe; en «writes» moja la pluma y escribe; un novicio le trae más pergaminos; en «Perceval»
//    le empieza a salir el bocadillo;
// 3. (fondo local: la miniatura del cuento, corte en «A young knight») sobre un fondo azul con estrellas de oro y una
//    arquería, el joven Perceval ve pasar la procesión: un paje con un candelero y una doncella con una copa de oro;
//    en «watches» se vuelve, en «go by» pasa la copa y en «a grail» brilla con sus rayos («!»);
// 4. (la hoja de cerca, corte en «Chrétien died») la mano escribe el último renglón; en «died» se para, se retira y la
//    pluma se queda quieta en la hoja; en «finishing» la vela se apaga (humo); en «grail came from» aparece un «?»;
// 5. (fondo local: el estudio de Robert de Boron, de día, corte en «Other poets») por la ventana, colinas y viñas; un
//    poeta trae el libro y en «carried it on» se lo pasa a otro; otro lee su copia; en «Robert de Boron» Boron levanta
//    el dedo («!») y sonríe;
// 6. (fondo local: la hoja de Boron de cerca, corte en «gave it») la mano pinta una cena en una miniatura; en «origin»
//    acaba la copa y en «cup» la copa brilla.''', r'''
const Ch = (f) => en('chretien', f), Si = (f) => en('sin-terminar', f), Bo = (f) => en('boron', f);
const STORY = Ch(0.109), P2 = Ch(0.3096), CHRET = Ch(0.409), WRITES = Ch(0.5414), PERC = Ch(0.594), P3 = Ch(0.6744), WATCH = Ch(0.7445), GOBY = Ch(0.8611), GRAIL = Ch(0.953);
const P4 = Si(0), DIED = Si(0.063), FINISH = Si(0.209), NEVER = Si(0.496), WHERE = Si(0.668);
const P5 = Bo(0), CARRIED = Bo(0.064), ANOTHER = Bo(0.253), ROBERT = Bo(0.375), BORON = Bo(0.453), P6 = Bo(0.5796), ORIGIN = Bo(0.6387), CUP = Bo(0.8337), SUPPER = Bo(0.9225);
const K = T.C.k;
const PL = (o) => { const r = {}; for (const k in o) r[k] = typeof o[k] === 'string' ? hex(o[k]) : o[k]; return r; };
const H = (x, y, s) => { const v = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v); };
const rgb = (c) => [c & 255, (c >> 8) & 255, (c >> 16) & 255];
const mez = (c, [r, g, b], a) => { const [cr, cg, cb] = rgb(c); return (0xff000000 | (Math.round(cb + (b - cb) * a) << 16) | (Math.round(cg + (g - cg) * a) << 8) | Math.round(cr + (r - cr) * a)) >>> 0; };
const halo = (cx, cy, r, col, a) => { const c = rgb(hex(col)); for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(319, cx + r); x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1) R.pset(x, y, mez(R.pget(x, y), c, a * (1 - d) * (1 - d))); } };
const destello = (x, y, u, col = '#fff6c0', n = 8, r0 = 3, r1 = 10) => { if (u <= 0 || u >= 1) return; for (let q = 0; q < n; q++) { const an = q / n * Math.PI * 2 + u, r = r0 + u * r1; R.pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r), hex(col)); } };
// cielo tramado en bandas (b4) y nubes de tres tonos a tres velocidades, solo en el cielo (máscara M)
const bandas = (p, y0, y1, x0, x1, cols) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), i = Math.floor(f), fr = f - i; p(x, y, hex(cols[Math.min(cols.length - 1, fr > R.b4(x, y) ? i + 1 : i)])); } };
const nubes = (t, lista, [cs, cm, cl], dentro) => { for (const [x0, y, w, v] of lista) { const x = ((x0 + t * v) % 420 + 420) % 420 - 60;
  for (let j = -5; j <= 5; j++) for (let i = -w; i <= w; i++) { const e = (i / w) ** 2 + (j / 5) ** 2 + Math.sin(i * 0.5 + x0) * 0.08; if (e > 1) continue; const px = Math.round(x + i), py = y + j; if (!dentro(px, py)) continue; R.pset(px, py, hex(j > 2 ? cs : j < -2 && i < w * 0.3 ? cl : cm)); } } };
const pajaros = (t, y0, dentro, n = 4, v = 22) => { for (let k = 0; k < n; k++) { const x = Math.round(((k * 60 + t * v) % 380) - 30), y = Math.round(y0 + Math.sin(t * 0.8 + k * 2) * 4 + (k % 2) * 6), a = Math.sin(t * 11 + k) > 0 ? 1 : 0; if (!dentro(x, y)) continue; R.pset(x, y, K); R.pset(x - 1, y - a, K); R.pset(x + 1, y - a, K); R.pset(x - 2, y - a * 2 + 1, K); R.pset(x + 2, y - a * 2 + 1, K); } };

// 1 · Troyes al anochecer: el juglar cuenta la historia
const B1 = R.nuevo(), M1 = new Uint8Array(320 * 180); let hecho1 = false;
const pintaTroyes = () => {
  const p = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, c); M1[y * 320 + x] = 0; };
  const r = (x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= y1; y++) for (let x = Math.round(x0); x <= x1; x++) p(x, y, c); };
  bandas(p, 0, 112, 0, 319, ['#2e2c5a', '#4a3e6e', '#7a5278', '#b86a6a', '#e8945e', '#f6be72']);
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) M1[y * 320 + x] = 1;
  for (const [x, y] of [[60, 8], [190, 12], [240, 6], [120, 20]]) { p(x, y, hex('#f2eee2')); }
  // las colinas lejanas y la ciudad: la catedral con su torre, los tejados y la muralla, a contraluz
  for (let x = 0; x < 320; x++) { const yh = Math.round(92 + Math.sin(x * 0.03) * 5 + Math.sin(x * 0.09) * 2); for (let y = yh; y <= 112; y++) p(x, y, (x + y) % 5 === 0 ? hex('#7a5a7a') : hex('#8a6a80')); }
  const sil = hex('#4a3a5e'), silL = hex('#5e4a6e');
  for (let x = 60; x <= 200; x++) { const yr = 96 - Math.round(Math.abs(Math.sin(x * 0.21)) * 6) - (x % 23 < 11 ? 4 : 0); r(x, yr, x, 120, (x % 23) === 11 ? silL : sil); }
  r(96, 54, 112, 120, sil); r(98, 50, 110, 54, sil); for (let j = 0; j < 14; j++) r(104 - Math.round(j * 0.45), 36 + j, 104 + Math.round(j * 0.45), 36 + j, sil); p(104, 34, sil); p(104, 35, sil);
  r(112, 72, 170, 120, sil); for (let j = 0; j < 10; j++) r(112 + j, 72 - j, 170 - j, 72 - j, sil);
  for (const [x, y] of [[100, 64], [106, 64], [100, 80], [106, 80], [124, 84], [140, 84], [156, 84]]) { r(x, y, x + 2, y + 5, hex('#2e2440')); }
  R.disco(141, 98, 6, hex('#2e2440')); R.disco(141, 98, 4, hex('#e8a858')); R.disco(141, 98, 2, hex('#f8d080'));
  for (let x = 0; x < 320; x += 1) { if (x > 60 && x < 200) continue; const yr = 104 - (x % 30 < 15 ? 3 : 0); r(x, yr, x, 120, sil); }
  // la muralla de la ciudad con sus almenas
  r(0, 112, 319, 124, hex('#6a5a6a')); for (let x = 0; x < 320; x += 8) r(x, 108, x + 4, 112, hex('#6a5a6a')); for (let y = 114; y < 124; y += 3) for (let x = (y % 2) * 4; x < 320; x += 8) p(x, y, hex('#5a4a5a'));
  // la casa de entramado de la izquierda con su ventana encendida y la chimenea
  for (let y = 44; y <= 70; y++) { const w = Math.round((y - 44) * 1.6); r(36 - w, y, 36 + w, y, (y % 3 === 0) ? hex('#3a2620') : hex('#5a3a2a')); p(36 - w, y, K); p(36 + w, y, K); }
  r(52, 26, 60, 50, hex('#6a4a3a')); r(51, 24, 61, 26, hex('#4a3428')); for (let y = 28; y < 50; y += 3) r(52, y, 60, y, hex('#4a3428'));
  r(0, 70, 76, 140, hex('#e0d0b0')); for (let x = 0; x <= 76; x++) for (let y = 70; y <= 140; y++) if (H(x, y, 5) < 0.08) p(x, y, hex('#cbbb98'));
  for (const x of [0, 18, 38, 58, 74]) r(x, 70, x + 2, 140, hex('#4a3020')); r(0, 70, 76, 72, hex('#3a2418')); r(0, 104, 76, 106, hex('#3a2418'));
  for (let i = 0; i < 16; i++) { p(20 + i, 72 + i * 2, hex('#4a3020')); p(21 + i, 72 + i * 2, hex('#4a3020')); }
  r(42, 112, 66, 140, K); r(43, 113, 65, 140, hex('#3a2a1e')); for (const y of [118, 128]) r(45, y, 63, y + 6, hex('#4a3626')); p(62, 127, hex('#c8a040'));
  r(4, 76, 16, 98, K); r(5, 77, 15, 97, hex('#7a5a3a')); r(6, 78, 14, 96, hex('#3a2a1e'));
  // la abadía de piedra de la derecha con la ventana del scriptorium (la luz la pinta cada fotograma)
  for (let y = 56; y <= 140; y++) for (let x = 196; x <= 304; x++) { const fila = Math.floor((y - 56) / 5), off = fila % 2 ? 5 : 0, j = (y - 56) % 5 === 4 || (x + off) % 10 === 0; p(x, y, j ? hex('#7a6a5a') : H(Math.floor((x + off) / 10), fila, 3) < 0.25 ? hex('#a89478') : hex('#b8a486')); }
  for (let j = 0; j <= 20; j++) { const w = Math.round(j * 2.8); r(250 - w, 36 + j, 250 + w, 36 + j, j % 3 === 0 ? hex('#4a3a4a') : hex('#5e4a5a')); } r(194, 56, 306, 58, hex('#3a2a3a'));
  r(244, 22, 256, 40, hex('#a89478')); for (let j = 0; j < 8; j++) r(250 - j, 14 + j, 250 + j, 14 + j, hex('#4a3a4a')); r(246, 28, 254, 34, hex('#2e2440'));
  r(222, 70, 254, 112, K); for (let j = 0; j < 16; j++) { const w = Math.round(Math.sqrt(1 - (j / 16) ** 2) * 16); r(238 - w - 1, 70 - j, 238 + w + 1, 70 - j, K); }
  r(272, 82, 290, 104, K); r(273, 83, 289, 103, hex('#3a2e3e')); r(281, 83, 281, 103, hex('#7a6a5a'));
  r(206, 116, 228, 140, K); for (let j = 0; j < 11; j++) { const w = Math.round(Math.sqrt(1 - (j / 11) ** 2) * 11); r(217 - w, 116 - j, 217 + w, 116 - j, K); }
  r(207, 116, 227, 140, hex('#5a3a22')); for (let x = 209; x < 227; x += 4) r(x, 106, x, 140, hex('#4a2e1a')); p(224, 128, hex('#c8a040'));
  // la plaza empedrada
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { if (x > 195 && x < 305 && y <= 140) continue; if (x <= 76 && y <= 140) continue; const s = 3 + Math.floor((y - 124) / 12), cx = Math.floor((x + (Math.floor(y / s) % 2) * s) / (s * 2)), cyy = Math.floor(y / s);
    p(x, y, (x + (Math.floor(y / s) % 2) * s) % (s * 2) === 0 || y % s === 0 ? hex('#6a5a5a') : H(cx, cyy, 7) < 0.3 ? hex('#a08a80') : H(cx, cyy, 8) < 0.5 ? hex('#8e7a72') : hex('#968278')); }
  // el pozo de piedra en la plaza con su tejadillo
  r(122, 132, 146, 150, K); for (let y = 133; y <= 149; y++) for (let x = 123; x <= 145; x++) p(x, y, (y - 133) % 4 === 3 || (x + ((y - 133) >> 2) * 3) % 6 === 0 ? hex('#6a5a50') : hex('#a89884'));
  r(122, 130, 146, 132, hex('#c8b8a0')); r(124, 104, 125, 130, hex('#5a3a22')); r(143, 104, 144, 130, hex('#5a3a22')); for (let j = 0; j < 7; j++) r(120 + j, 98 + j, 148 - j, 98 + j, j % 2 ? hex('#7a3a2a') : hex('#9a4a32'));
  r(126, 112, 142, 113, hex('#6a4a2a'));
  // el puesto del mercado con su toldo a rayas, a la derecha delante de la abadía
  r(262, 132, 312, 150, hex('#6a4a2a')); r(262, 132, 312, 133, hex('#8a6a3a')); for (const [x, c] of [[266, '#c83a2a'], [274, '#e8a030'], [282, '#7aa040'], [290, '#c83a2a'], [298, '#e8c050'], [306, '#7aa040']]) { R.disco(x, 130, 3, K); R.disco(x, 130, 2, hex(c)); p(x - 1, 129, hex('#ffffff')); }
  r(262, 112, 264, 150, hex('#4a2e1a')); r(310, 112, 312, 150, hex('#4a2e1a'));
};
const p1 = (t) => {
  if (!hecho1) { const prev = R.usar(B1); pintaTroyes(); R.usar(prev); hecho1 = true; }
  R.copiar(B1);
  const cielo = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180 && M1[y * 320 + x] === 1 && !(y <= 16 && x >= 18 && x <= 172) && !(y <= 46 && x >= 276);
  nubes(t, [[20, 30, 26, 3], [180, 46, 34, 5], [300, 22, 22, 7], [110, 62, 30, 4]], ['#8a5a7a', '#c88a8a', '#f4c8a0'], cielo);
  pajaros(t, 50, cielo, 3, 26);
  // el humo de la chimenea
  for (let k = 0; k < 7; k++) { const u = ((t * 0.35 + k / 7) % 1), x = Math.round(56 + u * 22 + Math.sin(t + k) * 2), y = Math.round(22 - u * 22 + 18); if (y > 18) { R.disco(x, y, 2 + u * 2, hex('#9a8a9a')); R.pset(x - 1, y - 1, hex('#b8a8b8')); } }
  // la ventana del scriptorium: luz de vela que tiembla y la silueta del poeta que escribe
  { const f = Math.sin(t * 9) * 0.5 + Math.sin(t * 13) * 0.5; for (let y = 56; y <= 111; y++) for (let x = 223; x <= 253; x++) { const top = 70 - Math.round(Math.sqrt(Math.max(0, 1 - ((x - 238) / 15.5) ** 2)) * 15); if (y < top) continue; R.pset(x, y, (y > 96) ? hex('#d88a40') : (x - 223) % 10 === 0 || (y - 56) % 12 === 0 ? hex('#4a3020') : f > 0.3 && H(x, y, 2) < 0.3 ? hex('#ffe0a0') : hex('#f8c070')); }
    const w = Math.round(Math.sin(t * 7) * 1); R.rect(232, 92, 242, 110, hex('#3a2418')); R.disco(237, 88, 4, hex('#3a2418')); R.linea(242, 98, 247 + w, 94, hex('#3a2418')); R.linea(247 + w, 94, 250 + w, 88, hex('#f2eee2'));
    halo(238, 92, 30, '#ffc070', 0.18); }
  // el carro de heno que cruza al fondo, de derecha a izquierda, con su mula
  { const u = tramo(t, 0.4, P2 + 0.3), x = Math.round(lerp(330, -70, u)), y = 138, pata = Math.floor(t * 6) % 2;
    if (u > 0 && u < 1) { R.rect(x + 14, y - 14, x + 50, y - 6, K); R.rect(x + 15, y - 13, x + 49, y - 7, hex('#7a5030')); for (let k = 0; k < 12; k++) R.pset(x + 16 + k * 3, y - 10, hex('#5a3a20'));
      for (let j = 0; j < 9; j++) { const w = 18 - Math.abs(j - 4); R.rect(x + 32 - w, y - 23 + j, x + 32 + w, y - 23 + j, (j + x) % 3 === 0 ? hex('#c8a040') : hex('#e8c860')); }
      for (const wx of [x + 22, x + 42]) { R.disco(wx, y - 4, 5, K); R.disco(wx, y - 4, 4, hex('#6a4a2a')); R.linea(wx - 3, y - 4, wx + 3, y - 4, K); R.linea(wx, y - 7, wx, y - 1, K); }
      R.linea(x + 14, y - 9, x + 2, y - 10, hex('#5a3a20'));
      R.rect(x - 14, y - 15, x + 2, y - 7, K); R.rect(x - 13, y - 14, x + 1, y - 8, hex('#7a6a5a')); R.rect(x - 20, y - 20, x - 13, y - 13, K); R.rect(x - 19, y - 19, x - 14, y - 14, hex('#7a6a5a')); R.pset(x - 18, y - 21, K); R.pset(x - 15, y - 22, K); R.pset(x - 17, y - 17, K);
      for (const [lx, ph] of [[x - 12, pata], [x - 8, 1 - pata], [x - 2, pata], [x + 1, 1 - pata]]) R.rect(lx, y - 6, lx, y - ph, K);
      R.actor(EL.peregrino, x + 2, y, t, { dir: -1, anda: true, pal: PL({ C: '#5a6a3a', c: '#44522a' }) }); } }
  // los que escuchan: un niño, un mercader y una monja; se asombran en «story»
  const asombro = t > STORY && t < STORY + 0.8;
  R.actor(EL.nina, 104, 168, t, { dir: 1, pal: PL({ C: '#8a5a3a', c: '#6a4428', F: '#6a4428', W: '#8a5a3a' }), sorpresa: asombro, sonrisa: t > STORY + 0.8, salto: asombro ? Math.round(Math.abs(Math.sin((t - STORY) * 10)) * 2) : 0 });
  R.actor(EL.escribano, 80, 170, t, { dir: 1, pal: PL({ C: '#4a5a7a', c: '#36445e' }), sonrisa: t > STORY + 0.4, habla: t > P2 - 1.2 && Math.sin(t * 8) > 0.3 });
  R.actor(EL.peregrino, 232, 168, t, { dir: -1, pal: PL({ C: '#2a2a3a', c: '#1e1e2a', o: '#f2eee2' }), sorpresa: asombro, sonrisa: t > STORY + 0.8 });
  // el perro que olisquea el empedrado
  { const x = 196 + Math.round(Math.sin(t * 0.7) * 3), y = 172, c = Math.sin(t * 12) > 0 ? 1 : 0; R.rect(x, y - 6, x + 10, y - 3, K); R.rect(x + 1, y - 5, x + 9, y - 4, hex('#a87a4a')); R.rect(x + 9, y - 6 + (t % 2 < 1 ? 1 : 0), x + 13, y - 2 + (t % 2 < 1 ? 1 : 0), K); R.pset(x + 10, y - 4, hex('#a87a4a'));
    for (const lx of [x + 1, x + 3, x + 7, x + 9]) R.rect(lx, y - 2, lx, y, K); R.pset(x - 1, y - 6 - c, K); R.pset(x - 2, y - 7 - c, K); }
  // el juglar con su laúd: cuenta y en «story» le sale el bocadillo
  { const x = 150, S = 168, g = Math.sin(t * 6) > 0 ? 1 : 0;
    const m = R.actor(EL.poeta, x, S, t, { dir: -1, pal: PL({ C: '#3a7a4a', c: '#2a5a36', J: '#c83a3a', j: '#8a2a2a' }), sostiene: [x - 2, S - 12 + g], habla: Math.sin(t * 9) > -0.2 && t < P2, dedo: t > STORY - 0.2 && t < STORY + 0.5, sonrisa: t > STORY + 0.6 && Math.sin(t * 9) < -0.2 }).mano;
    if (m) { R.disco(m[0] + 3, m[1] + 2, 4, K); R.disco(m[0] + 3, m[1] + 2, 3, hex('#c88a3a')); R.pset(m[0] + 3, m[1] + 2, K); R.pset(m[0] + 1, m[1], hex('#e8b060')); R.linea(m[0] + 6, m[1] - 1, m[0] + 13, m[1] - 6, K); R.rect(m[0] + 12, m[1] - 8, m[0] + 14, m[1] - 6, hex('#6a4a2a')); }
    const u = tramo(t, STORY - 0.15, STORY + 0.35);
    if (u > 0) { const cx = 146, cy = 84, rx = Math.round(30 * u), ry = Math.round(20 * u);
      for (const [bx, by, br, k] of [[152, 136, 1, 0], [149, 128, 2, 0.2], [148, 118, 3, 0.4]]) if (u > k) { R.disco(bx, by, br + 1, K); R.disco(bx, by, br, hex('#f4f0e4')); }
      if (rx > 4) { R.disco(cx, cy, 1, K); for (let y = cy - ry - 1; y <= cy + ry + 1; y++) for (let x2 = cx - rx - 1; x2 <= cx + rx + 1; x2++) { const e = ((x2 - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (e <= 1.12) R.pset(x2, y, e > 0.9 ? K : hex('#f4f0e4')); }
        if (u >= 1) { // el libro abierto y la copa que brilla encima
          R.rect(cx - 15, cy + 2, cx + 15, cy + 12, K); R.rect(cx - 14, cy + 3, cx - 1, cy + 11, hex('#fffaf0')); R.rect(cx + 1, cy + 3, cx + 14, cy + 11, hex('#fffaf0')); R.rect(cx, cy + 2, cx, cy + 12, hex('#8a2a2a'));
          for (let y = cy + 5; y <= cy + 10; y += 2) { R.linea(cx - 12, y, cx - 3, y, hex('#9a8a7a')); R.linea(cx + 3, y, cx + 12, y, hex('#9a8a7a')); }
          T.copa(R, cx, cy, t, { tipo: 'oro', s: 1, brillo: 0.6 + Math.sin(t * 5) * 0.3 }); destello(cx, cy - 6, ((t - STORY) * 0.9) % 1, '#e8b830', 8, 4, 6); } } } }
};

// 2 · el scriptorium de noche: Chrétien escribe; en «Perceval» le sale el bocadillo
const p2 = (t) => {
  const vision = tramo(t, PERC + 0.05, P3 + 0.2);
  const d = T.grial(R, t, { encuadre: 'scriptorium', luz: 'noche', vision });
  const moja = tramo(t, WRITES - 0.35, WRITES) - tramo(t, WRITES + 0.15, WRITES + 0.45), mira = t > CHRET - 0.1 && t < CHRET + 0.9;
  const esc = !mira && moja === 0 ? Math.round(Math.sin(t * 16) * 2) : 0;
  const hx = Math.round(lerp(170 + esc, 128, moja)), hy = Math.round(lerp(130 + (mira ? -4 : 0), 132, moja));
  const m = R.actor(EL.poeta, 150, d.detras, t, { dir: 1, sostiene: [hx, hy], sonrisa: mira || t > PERC, habla: false }).mano;
  if (m) { R.linea(m[0], m[1], m[0] + 6, m[1] - 8, hex('#f2eee2')); R.linea(m[0] + 1, m[1], m[0] + 7, m[1] - 8, hex('#c8c0b0')); for (let k = 0; k < 4; k++) R.pset(m[0] + 3 + k, m[1] - 3 - k * 2, hex('#ffffff')); R.pset(m[0], m[1] + 1, K); }
  T.grialDelante(R, t, { encuadre: 'scriptorium' });
  // el novicio que trae un montón de pergaminos y los deja junto al pupitre
  { const u = tramo(t, P2 + 0.2, PERC - 0.4), x = Math.round(lerp(330, 210, u)), deja = t > PERC - 0.3;
    const mn = R.actor(EL.escribano, x, 168, t, { dir: -1, anda: u > 0 && u < 1, pal: PL({ C: '#6a5a4a', c: '#4e4236' }), sostiene: deja ? false : [x - 2, 152], sonrisa: deja });
    const px = deja ? 206 : (mn.mano ? mn.mano[0] - 4 : x), py = deja ? 166 : (mn.mano ? mn.mano[1] - 2 : 150);
    for (let k = 0; k < 4; k++) { R.rect(px - 6, py - k * 2 - 1, px + 6, py - k * 2, K); R.rect(px - 5, py - k * 2 - 1, px + 5, py - k * 2 - 1, k % 2 ? hex('#f2e8cc') : hex('#e8dcb8')); } }
  // la gota de tinta que brilla en el tintero al mojar
  if (moja > 0.8) R.pset(129, 133, hex('#8a8aa8'));
};

// 3 · la miniatura del cuento: Perceval ve pasar la copa
const B3 = R.nuevo(); let hecho3 = false;
const pintaMiniatura = () => {
  const p = (x, y, c) => R.pset(x, y, c), r = (x0, y0, x1, y1, c) => R.rect(x0, y0, x1, y1, c);
  // el pergamino del margen con sus manchas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) p(x, y, H(x, y, 1) < 0.06 ? hex('#e0d0ac') : H(x >> 2, y >> 2, 2) < 0.1 ? hex('#ece0c0') : hex('#f2e8cc'));
  // el fondo azul con la trama de rombos rojos y los puntos de oro
  for (let y = 22; y <= 126; y++) for (let x = 20; x <= 300; x++) { const a = (x + y) % 12, b = (x - y + 600) % 12, lin = a === 0 || b === 0, cen = a === 6 && b === 6;
    p(x, y, cen ? hex('#f0cc58') : lin ? hex('#8a2a3a') : (x + y * 3) % 17 === 0 ? hex('#22306e') : hex('#2a3a84')); }
  // la arquería: tres arcos de piedra rosa, con torrecillas encima y una lámpara colgada en cada uno
  for (const cx of [66, 160, 254]) { for (let j = 0; j <= 26; j++) { const w = Math.round(Math.sqrt(Math.max(0, 1 - (j / 26) ** 2)) * 42); for (let i = -47; i <= 47; i++) { const y = 50 - j; if (Math.abs(i) > w && Math.abs(i) <= w + 4 && y >= 22) p(cx + i, y, Math.abs(i) > w + 2 ? hex('#a86a6a') : hex('#e0a8a0')); } }
    for (const tx of [cx - 14, cx + 14]) { r(tx - 4, 22, tx + 4, 30, hex('#d89890')); for (let x = tx - 4; x <= tx + 4; x += 2) p(x, 21, hex('#d89890')); r(tx - 1, 25, tx, 28, hex('#5a2a3a')); }
    R.linea(cx, 25, cx, 44, hex('#c8a040')); r(cx - 4, 45, cx + 4, 47, hex('#c8a040')); r(cx - 3, 48, cx + 3, 48, hex('#8a6420')); }
  r(20, 22, 300, 23, hex('#a86a6a'));
  for (const cx of [20, 113, 207, 300]) { r(cx - 3, 48, cx + 3, 104, hex('#d89890')); r(cx - 3, 48, cx - 2, 104, hex('#f0c0b8')); r(cx + 2, 48, cx + 3, 104, hex('#a86a6a')); r(cx - 5, 46, cx + 5, 50, hex('#e8c050')); r(cx - 5, 102, cx + 5, 106, hex('#e8c050')); }
  // el suelo de baldosas verdes y rojas
  for (let y = 107; y <= 126; y++) for (let x = 20; x <= 300; x++) { const fx = Math.floor((x - 20 + (y - 107) * 0.3) / 10), fy = Math.floor((y - 107) / 5); p(x, y, (x - 20 + Math.round((y - 107) * 0.3)) % 10 === 0 || (y - 107) % 5 === 0 ? hex('#3a2a2a') : (fx + fy) % 2 ? hex('#3a7a4a') : hex('#a83a3a')); }
  r(20, 106, 300, 106, hex('#e8c050'));
  // el lecho del rey pescador, a la derecha (la colcha la pinta cada fotograma, por delante del rey)
  r(240, 84, 296, 106, K); r(240, 80, 246, 106, hex('#c8a040')); r(290, 76, 296, 106, hex('#c8a040')); R.disco(243, 79, 2, hex('#f0d070')); R.disco(293, 75, 2, hex('#f0d070'));
  // el marco: banda azul y roja con filete de oro y la orla de hojas en los márgenes
  for (let i = 0; i < 6; i++) { const c = i < 2 ? hex('#e8c050') : i < 4 ? hex('#2a4aa8') : hex('#c8303a'); r(14 + i, 16 + i, 306 - i, 16 + i, c); r(14 + i, 132 - i, 306 - i, 132 - i, c); r(14 + i, 16 + i, 14 + i, 132 - i, c); r(306 - i, 16 + i, 306 - i, 132 - i, c); }
  for (let x = 18; x < 304; x += 6) { p(x, 18, hex('#fff6c0')); p(x + 3, 130, hex('#fff6c0')); }
  for (let y = 22; y < 130; y += 6) { p(16, y, hex('#fff6c0')); p(304, y, hex('#fff6c0')); }
  for (let k = 0; k < 44; k++) { const side = k % 2, y = 24 + k * 3.4, x = side ? 311 + Math.round(Math.sin(k) * 3) : 7 + Math.round(Math.sin(k) * 3); if (y > 172 || (side && y < 50)) continue; p(x, y, hex('#3a7a3a')); p(x + 1, y, hex('#5a9a4a')); p(x, y + 1, hex('#3a7a3a')); if (k % 5 === 0) { R.disco(x, y, 2, hex('#c8303a')); p(x, y, hex('#e8c050')); } }
  // el texto de debajo: dos columnas de renglones (trazos, sin letras) y la capitular con su vid
  for (let y = 140; y <= 168; y += 4) for (const [x0, x1] of [[40, 152], [168, 296]]) { let x = x0 + (y < 150 && x0 === 40 ? 18 : 0); while (x < x1) { const w = 3 + Math.floor(H(x, y, 7) * 10); R.linea(x, y, Math.min(x1, x + w), y, hex('#3a2a1e')); x += w + 2; } }
  r(38, 138, 53, 152, hex('#2a4aa8')); r(40, 140, 51, 150, hex('#c8303a')); r(43, 142, 48, 148, hex('#e8c050')); p(45, 145, hex('#fff6c0'));
  for (let k = 0; k < 8; k++) { p(36 - (k % 2), 154 + k * 2, hex('#3a7a3a')); if (k % 3 === 0) p(34, 155 + k * 2, hex('#c8303a')); }
};
const p3 = (t) => {
  if (!hecho3) { const prev = R.usar(B3); pintaMiniatura(); R.usar(prev); hecho3 = true; }
  R.copiar(B3);
  // el brillo del oro de la trama, que pasa en diagonal
  { const xb = ((t - P3) * 70) % 420 - 50; for (let y = 22; y <= 104; y++) for (let x = Math.max(20, Math.round(xb - y * 0.5)); x <= Math.min(300, Math.round(xb - y * 0.5) + 6); x++) { if (((x + y) % 12 === 6) && ((x - y + 600) % 12 === 6)) R.pset(x, y, hex('#fff6c0')); } }
  // las lámparas que cuelgan y las antorchas de las columnas
  for (const cx of [66, 160, 254]) { const f = Math.sin(t * 12 + cx) > 0 ? 1 : 0, sw = Math.round(Math.sin(t * 1.5 + cx) * 1); R.pset(cx + sw, 44, hex('#ff9a30')); R.pset(cx + sw + f, 43, hex('#ffd860')); R.pset(cx + sw, 42, hex('#fff4c0')); halo(cx, 44, 12, '#ffc070', 0.3); }
  for (const cx of [113, 207]) { R.rect(cx + 4, 66, cx + 6, 68, hex('#6a4a2a')); R.linea(cx + 6, 68, cx + 9, 64, hex('#6a4a2a')); const f = Math.sin(t * 12 + cx) > 0 ? 1 : 0; R.rect(cx + 8, 59, cx + 10, 63, hex('#ff9a30')); R.pset(cx + 9 + f, 58, hex('#ffd860')); R.pset(cx + 9, 57 - f, hex('#fff4c0')); halo(cx + 9, 60, 14, '#ffc070', 0.3); }
  const S = 122;
  // el rey pescador, recostado en su lecho (asoma de cintura arriba), mira la procesión
  R.actor(EL.obispo, 262, 100, t, { dir: -1, tocado: 'corona', pal: PL({ C: '#6a3a7a', c: '#4e2a5a', H: '#c8c4bc', h: '#a8a49c' }), sorpresa: t > GRAIL && t < GRAIL + 0.6, habla: t > WATCH && t < GOBY && Math.sin(t * 8) > 0.4 });
  R.rect(247, 88, 289, 105, hex('#6a3a7a')); for (let x = 249; x < 289; x += 5) R.rect(x, 90, x + 2, 104, hex('#7a4a8a')); R.rect(246, 87, 290, 88, hex('#e8c050')); R.rect(247, 86, 262, 88, hex('#f2eee2'));
  // Perceval, el joven caballero, a la izquierda en su banco: se vuelve en «watches» y en «a grail» se levanta («!»)
  const ve = t > WATCH - 0.1, lev = t > GRAIL;
  R.actor(EL.templario, 44, S, t, { dir: ve ? 1 : -1, bigote: false, pal: PL({ W: '#3a5ab0', D: '#e8c050', H: '#8a5428', h: '#a8743c' }), sorpresa: ve && !lev && t < GOBY, sonrisa: t > GOBY && !lev, brazos: lev && t < GRAIL + 0.8, salto: lev && t < GRAIL + 0.5 ? 2 : 0 });
  R.rect(36, S - 6, 68, S - 2, K); R.rect(37, S - 5, 67, S - 3, hex('#8a5a3a')); R.rect(37, S - 5, 67, S - 5, hex('#a87a4a')); R.rect(38, S - 2, 40, S, hex('#5a3a22')); R.rect(64, S - 2, 66, S, hex('#5a3a22'));
  if (lev) { const y = S - 44 - Math.round(Math.min(1, (t - GRAIL) * 4) * 3); R.icono('!', 51, y, hex('#fff2a0'), K, 2); }
  // la procesión: el paje con el cirio y la doncella con la copa, de derecha a izquierda; en «a grail» se para y la copa brilla
  const ux = (tt) => tramo(tt, P3 + 0.1, P4 + 0.6), para = t > GRAIL - 0.2 && t < GRAIL + 0.5;
  const xd = Math.round(lerp(300, 128, ux(para ? GRAIL - 0.2 : t > GRAIL + 0.5 ? t - 0.7 : t))), xp = xd - 30;
  if (xp > 0 && xp < 300) { const mp = R.actor(EL.escribano, xp, S, t, { dir: -1, anda: !para, pal: PL({ C: '#f2eee2', c: '#d8d2c4', H: '#e8c060', h: '#c8a040' }), sostiene: [xp - 2, S - 16] }).mano;
    if (mp) { R.rect(mp[0] - 1, mp[1] - 12, mp[0] + 1, mp[1] - 1, hex('#f2eee2')); R.pset(mp[0] + 1, mp[1] - 10, hex('#d8d0b0')); R.rect(mp[0] - 3, mp[1], mp[0] + 3, mp[1] + 1, hex('#c8a040')); const f = Math.sin(t * 12) > 0 ? 1 : 0; R.pset(mp[0], mp[1] - 13, hex('#ff9a30')); R.pset(mp[0] + f, mp[1] - 14, hex('#ffd860')); R.pset(mp[0], mp[1] - 15, hex('#fff4c0')); halo(mp[0], mp[1] - 14, 12, '#ffd890', 0.35); } }
  if (xd > -10 && xd < 300) { const md = R.actor(EL.poeta, xd, S, t, { dir: -1, anda: !para, tocado: 'cofia', pal: PL({ C: '#e8e4f4', c: '#c8c4dc', H: '#c8843a', h: '#e0a050', W: '#f2eee2', J: '#2a4aa8', j: '#1e3a8a' }), sostiene: [xd - 4, S - 18 - (para ? 3 : 0)], sonrisa: true }).mano;
    if (md) { const br = 0.4 + tramo(t, GOBY - 0.4, GOBY) * 0.3 + tramo(t, GRAIL - 0.2, GRAIL + 0.1) * 0.3; const cx = md[0], cy = md[1] - 1;
      halo(cx, cy - 10, 18 + br * 16, '#fff2a0', 0.45 * br);
      if (t > GRAIL - 0.1) { const rot = (t - GRAIL) * 1.4; for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2 + rot, L = 20 + (k % 2) * 10; for (let s = 9; s < L; s++) { const x = Math.round(cx + Math.cos(a) * s), y = Math.round(cy - 10 + Math.sin(a) * s); if (x > 20 && x < 300 && y > 22 && y < 126 && (s + k) % 2 === 0) R.pset(x, y, hex('#fff6c0')); } } }
      T.copa(R, cx, cy + 4, t, { tipo: 'oro', s: 2, brillo: br }); } }
};

// 4 · la hoja de cerca: la mano se para y se va, la pluma se queda quieta y la vela se apaga
const p4 = (t) => {
  const escrito = 0.82 + 0.04 * tramo(t, P4, DIED), vela = 1 - tramo(t, FINISH - 0.25, FINISH + 0.35), sale = tramo(t, DIED + 0.25, DIED + 1.1);
  const d = T.grial(R, t, { encuadre: 'scriptorium', camara: 'hoja', escrito, vela, pluma: sale > 0.05 ? 'hoja' : false });
  // la mano de Chrétien con la pluma: escribe el renglón, se para en «died» y se retira
  if (sale < 1) { const yl = 56 + Math.floor(18 * escrito) * 6 - 6, quieta = t > DIED, esc = quieta ? 0 : Math.round(Math.sin(t * 14) * 2), tx = 226 + esc, ty = yl - (quieta ? 0 : Math.abs(Math.round(Math.sin(t * 7)))), wx = Math.round(lerp(tx + 9, 300, sale * sale)), wy = Math.round(lerp(ty + 2, 214, sale * sale));
    // la pluma en la mano: la punta en el renglón, las barbas hacia arriba a la derecha
    const qx = Math.round(lerp(tx, 300, sale * sale)), qy = Math.round(lerp(ty, 212, sale * sale));
    if (sale < 0.05) { R.linea(qx, qy, qx + 30, qy - 22, hex('#f0ece0')); R.linea(qx + 1, qy, qx + 31, qy - 22, hex('#c8c0b0')); for (let k = 0; k < 8; k++) { R.pset(qx + 14 + k * 2, qy - 11 - k * 1.5, hex('#f8f4ea')); R.pset(qx + 15 + k * 2, qy - 9 - k * 1.5, hex('#e0dcd0')); } R.pset(qx, qy, K); }
    T.brazo(R, 256, 200, wx, wy, '#7a2a2a', -1); }
  // el «?» que se dibuja en el blanco de la hoja en «where that grail came from»
  { const u = tramo(t, WHERE - 0.3, WHERE + 0.3); if (u > 0) { const y = 143 - Math.round(u * 3); R.icono('?', 250, y, u > 0.6 ? hex('#2a1a10') : hex('#8a7a62'), hex('#c8b898'), 3); } }
};

// 5 · el estudio de Robert de Boron, de día: le pasan el libro; en «Robert de Boron», la idea
const B5 = R.nuevo(), M5 = new Uint8Array(320 * 180); let hecho5 = false;
const pintaEstudio = () => {
  const p = (x, y, c) => R.pset(x, y, c), r = (x0, y0, x1, y1, c) => R.rect(x0, y0, x1, y1, c);
  // la pared de piedra encalada con sillares que asoman, las vigas del techo
  for (let y = 0; y <= 118; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 9), off = fila % 2 ? 8 : 0, sill = H(Math.floor((x + off) / 16), fila, 6) < 0.3, j = y % 9 === 8 || (x + off) % 16 === 0;
    p(x, y, sill ? (j ? hex('#9a8a72') : H(x, y, 2) < 0.2 ? hex('#b8a888') : hex('#c8b898')) : H(x, y, 3) < 0.08 ? hex('#d8ccb0') : hex('#e6dcc4')); }
  r(0, 0, 319, 8, hex('#4a3020')); for (let x = 186; x < 270; x += 28) { r(x, 0, x + 10, 13, hex('#5a3a24')); r(x, 13, x + 10, 14, hex('#3a2418')); r(x, 0, x + 1, 13, hex('#6a4a30')); }
  // la ventana de arco de medio punto, con su derrame de piedra (el paisaje lo pinta cada fotograma)
  for (let j = 0; j <= 24; j++) { const w = Math.round(Math.sqrt(1 - (j / 24) ** 2) * 30); r(76 - w - 6, 46 - j, 76 + w + 6, 46 - j, hex('#a89878')); }
  r(40, 46, 112, 106, hex('#a89878')); r(46, 46, 106, 100, hex('#8a7a62'));
  for (let y = 22; y <= 100; y++) for (let x = 46; x <= 106; x++) { const top = 46 - Math.round(Math.sqrt(Math.max(0, 1 - ((x - 76) / 30) ** 2)) * 24); if (y >= top) M5[y * 320 + x] = 1; }
  r(36, 104, 116, 108, hex('#c8b898')); r(36, 104, 116, 104, hex('#e8dcc0')); r(36, 108, 116, 109, hex('#7a6a52'));
  // la estantería con libros, rollos y un tarro (sin letras)
  r(204, 40, 270, 118, K); r(205, 41, 269, 117, hex('#5a3a22'));
  for (const y of [62, 86]) { r(205, y, 269, y + 2, hex('#7a5232')); r(205, y + 3, 269, y + 3, hex('#3a2418')); }
  const libros = (y0, y1, sem) => { let x = 208; while (x < 266) { const w = 3 + Math.floor(H(x, sem, 1) * 4), h = y1 - y0 - Math.floor(H(x, sem, 2) * 6), c = ['#7a2a2a', '#2a4a7a', '#3a6a3a', '#8a6a2a', '#5a2a5a', '#a8502a'][Math.floor(H(x, sem, 3) * 6)];
    if (H(x, sem, 4) < 0.15) { R.disco(x + 3, y1 - 3, 3, K); R.disco(x + 3, y1 - 3, 2, hex('#e8dcb8')); p(x + 3, y1 - 3, hex('#a89870')); x += 8; continue; }
    r(x, y1 - h, x + w, y1, K); r(x + 1, y1 - h + 1, x + w - 1, y1, hex(c)); r(x + 1, y1 - h + 3, x + w - 1, y1 - h + 3, hex('#e8c050')); r(x + 1, y1 - 4, x + w - 1, y1 - 4, hex('#e8c050')); x += w + 1; } };
  libros(44, 61, 1); libros(66, 85, 2); libros(90, 116, 3); r(205, 116, 269, 117, hex('#7a5232'));
  // el tapiz de la pared de la derecha, con un ciervo y flores (sin letras)
  r(282, 54, 312, 110, K); for (let y = 55; y <= 109; y++) for (let x = 283; x <= 311; x++) p(x, y, (x + y) % 7 === 0 ? hex('#2a5a3a') : hex('#3a6a46'));
  for (let k = 0; k < 18; k++) { const x = 285 + Math.floor(H(k, 1, 1) * 24), y = 58 + Math.floor(H(k, 2, 1) * 48); p(x, y, hex(['#e8c050', '#c83a3a', '#f2eee2'][k % 3])); }
  r(290, 84, 302, 92, hex('#c88a4a')); r(300, 78, 304, 86, hex('#c88a4a')); r(292, 92, 293, 100, hex('#c88a4a')); r(299, 92, 300, 100, hex('#c88a4a')); p(301, 75, hex('#8a5a2a')); p(303, 74, hex('#8a5a2a')); p(302, 80, K);
  r(280, 52, 314, 54, hex('#6a4a2a')); for (let x = 284; x <= 310; x += 3) r(x, 111, x, 114, hex('#e8c050'));
  // el suelo de baldosas de barro en perspectiva, con una estera de junco
  r(0, 118, 319, 120, hex('#7a6a52')); r(0, 118, 319, 118, hex('#a89878'));
  for (let y = 121; y < 180; y++) { const z = (y - 121) / 59, fila = Math.floor(Math.sqrt(z) * 7), wv = 12 + z * 26;
    for (let x = 0; x < 320; x++) { const cx = (x - 160) / wv + 100, col = Math.floor(cx), jx = cx - col < 0.07, jy = Math.abs(Math.sqrt(z) * 7 - fila - 0.5) > 0.46;
      p(x, y, jx || jy ? hex('#7a4a32') : H(col, fila, 9) < 0.3 ? hex('#b06a46') : H(col, fila, 10) < 0.25 ? hex('#d08c62') : hex('#c27c54')); } }
  for (let y = 152; y < 178; y++) for (let x = 14 + Math.round((178 - y) * 0.3); x < 130 - Math.round((178 - y) * 0.2); x++) p(x, y, (x + y) % 3 === 0 ? hex('#a8904a') : (y % 4 === 0) ? hex('#8a7438') : hex('#c0a860'));
  // el banco de la derecha
  r(256, 150, 300, 154, hex('#6a4428')); r(256, 150, 300, 150, hex('#8a5e36')); r(258, 154, 260, 168, hex('#4a2e1a')); r(296, 154, 298, 168, hex('#4a2e1a'));
};
const escritorio = (t) => { const r = (x0, y0, x1, y1, c) => R.rect(x0, y0, x1, y1, c);
  R.poligono([[146, 142], [238, 142], [234, 130], [150, 130]], K); R.poligono([[147, 141], [237, 141], [233, 131], [151, 131]], hex('#7a4a2a')); R.linea(147, 141, 237, 141, hex('#9a6a3a'));
  for (let x = 156; x < 232; x += 9) R.linea(x, 132, x - 2, 140, hex('#6a3e22'));
  r(148, 143, 236, 166, K); r(149, 144, 235, 165, hex('#5e3a22')); for (let x = 152; x < 232; x += 10) { r(x, 146, x + 7, 162, hex('#6a4428')); r(x, 146, x + 7, 146, hex('#7a5232')); r(x + 7, 146, x + 7, 162, hex('#4a2e1a')); } r(149, 144, 235, 145, hex('#7a5232'));
  r(146, 166, 238, 168, hex('#3a2418'));
  // el tintero con la pluma, la vela apagada en su palmatoria y un montón de pergaminos sobre la mesa
  r(222, 124, 228, 130, K); r(223, 125, 227, 129, hex('#2a2a3a')); R.linea(225, 124, 232, 112, hex('#f2eee2')); R.linea(226, 124, 233, 112, hex('#c8c0b0'));
  r(156, 118, 159, 130, hex('#f2eee2')); r(159, 119, 159, 130, hex('#d8d0b0')); r(153, 129, 162, 131, hex('#c8a040')); R.pset(157, 117, K);
  for (let k = 0; k < 3; k++) r(206, 127 - k * 2, 220, 128 - k * 2, k % 2 ? hex('#e8dcb8') : hex('#f2e8cc')); R.rect(206, 129, 220, 129, K); };
const p5 = (t) => {
  if (!hecho5) { const prev = R.usar(B5); pintaEstudio(); R.usar(prev); hecho5 = true; }
  R.copiar(B5);
  // por la ventana: cielo de mañana, nubes, colinas de Borgoña con viñas y una iglesia lejana
  const ven = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180 && M5[y * 320 + x] === 1;
  for (let y = 22; y <= 100; y++) for (let x = 46; x <= 106; x++) if (ven(x, y)) { const f = (y - 22) / 56, i = Math.min(2, Math.floor(f * 3 + (R.b4(x, y) - 0.5) * 0.6)); R.pset(x, y, hex(['#6a9ad8', '#8ab4e4', '#b8d4ee'][Math.max(0, i)])); }
  nubes(t, [[40, 34, 12, 4], [120, 44, 10, 6], [200, 30, 14, 3]], ['#a8b8d0', '#e8eef4', '#ffffff'], (x, y) => ven(x, y) && y < 70);
  pajaros(t, 40, (x, y) => ven(x, y) && y < 74, 2, 18);
  for (let x = 46; x <= 106; x++) { const y1 = Math.round(76 + Math.sin(x * 0.12) * 4), y2 = Math.round(86 + Math.sin(x * 0.07 + 2) * 3);
    for (let y = y1; y <= 100; y++) if (ven(x, y)) R.pset(x, y, y < y2 ? ((x + y) % 4 === 0 ? hex('#6a9a5a') : hex('#7aaa66')) : ((y - y2) % 3 === 0 ? hex('#4a6a2a') : (x % 4 === 0 ? hex('#6a3a5a') : hex('#5a8a3a')))); }
  for (const [x, y] of [[90, 74], [94, 70]]) { R.rect(x, y, x + 3, y + 5, hex('#c8b898')); } R.rect(91, 66, 92, 69, hex('#c8b898')); R.pset(91, 65, hex('#5a4a3a'));
  R.rect(75, 22, 77, 100, hex('#6a4a2a')); R.rect(46, 62, 106, 63, hex('#6a4a2a'));
  // el haz de luz de la ventana con sus motas, hasta el suelo
  for (let y = 100; y < 176; y++) { const x0 = Math.round(48 + (y - 100) * 0.9), x1 = Math.round(104 + (y - 100) * 1.1); for (let x = x0; x <= x1; x++) if (((x + y) & 1) === 0 && R.b4(x, y) < 0.35) R.pset(x, y, mez(R.pget(x, y), [255, 244, 210], 0.35)); }
  for (let k = 0; k < 14; k++) { const u = ((t * 0.08 + k / 14) % 1), y = Math.round(104 + u * 66), x = Math.round(60 + (y - 100) * 1 + Math.sin(t * 0.7 + k * 2) * 18 + k * 2); R.pset(x, y, hex('#fff6d8')); }
  // dos palomas en el alféizar; una se va volando en «another»
  { R.rect(52, 100, 58, 103, hex('#9a9aa8')); R.pset(58, 99, hex('#9a9aa8')); R.pset(59, 100, hex('#e8a040')); R.pset(57, 99, K); R.pset(54, 100 - (Math.sin(t * 3) > 0.7 ? 1 : 0), hex('#c8c8d4'));
    const u = tramo(t, ANOTHER, ANOTHER + 1.4); if (u < 1) { const x = Math.round(lerp(96, 40, u)), y = Math.round(lerp(100, 50, u)), a = u > 0 && Math.sin(t * 20) > 0; R.rect(x, y, x + 6, y + 3, hex('#8a8a9a')); R.pset(x - 1, y, hex('#8a8a9a')); R.pset(x - 2, y + 1, hex('#e8a040')); R.pset(x, y - 1, K); if (u > 0) { R.rect(x + 1, y - (a ? 4 : 0), x + 4, y - (a ? 1 : -1), hex('#c8c8d4')); } } }
  // Boron detrás de su escritorio: recibe el libro en «carried it on»; en «Robert de Boron», la idea
  const pasa = tramo(t, CARRIED - 0.1, CARRIED + 0.5), idea = t > ROBERT - 0.1;
  const xb = 182, Sb = 140;
  const mb = R.actor(EL.escribano, xb, Sb, t, { dir: -1, pal: PL({ C: '#5a3a6a', c: '#422a4e', H: '#7a5a3a', h: '#9a7a52' }), sostiene: pasa > 0.5 && !idea ? [xb - 4, Sb - 10] : false, dedo: idea && t < BORON + 0.6, sonrisa: t > BORON, sorpresa: pasa > 0.5 && t < ANOTHER });
  if (idea) { const y = Sb - 42 - Math.round(Math.min(1, (t - ROBERT) * 4) * 3); R.icono('!', xb + 6, y, hex('#fff2a0'), K, 2); destello(xb + 8, y + 6, ((t - ROBERT) * 1.5) % 1, '#fff6c0', 8, 6, 6); }
  escritorio(t);
  // el poeta que trae el libro, desde la izquierda, y se lo pasa
  const ue = tramo(t, P5 - 0.2, CARRIED - 0.2), xp = Math.round(lerp(-20, 126, ue));
  const mp = R.actor(EL.poeta, xp, 170, t, { dir: 1, anda: ue > 0 && ue < 1, pal: PL({ C: '#2a6a5a', c: '#1e4e42', J: '#2a2a3a', j: '#1e1e2a' }), sostiene: pasa < 0.5 ? [xp + 18 + Math.round(pasa * 14), 146 - Math.round(pasa * 10)] : false, habla: t > CARRIED + 0.4 && t < ANOTHER && Math.sin(t * 9) > 0, sonrisa: t > ANOTHER });
  // el libro rojo de Perceval: en la mano del que lo trae, en el aire y en la de Boron (lo abre en el escritorio después de la idea)
  { let bx, by; if (pasa < 0.5 && mp.mano) { bx = mp.mano[0]; by = mp.mano[1]; } else if (!idea && mb.mano) { bx = mb.mano[0]; by = mb.mano[1]; } else { bx = 190; by = 128; }
    if (idea) { R.rect(bx - 12, by - 3, bx + 12, by + 2, K); R.rect(bx - 11, by - 2, bx - 1, by + 1, hex('#fffaf0')); R.rect(bx + 1, by - 2, bx + 11, by + 1, hex('#fffaf0')); R.rect(bx, by - 3, bx, by + 2, hex('#8a2a2a')); for (const yy of [by - 1, by + 1]) { R.linea(bx - 9, yy, bx - 3, yy, hex('#9a8a7a')); R.linea(bx + 3, yy, bx + 9, yy, hex('#9a8a7a')); } }
    else { R.rect(bx - 6, by - 7, bx + 6, by + 2, K); R.rect(bx - 5, by - 6, bx + 5, by + 1, hex('#a82a2a')); R.rect(bx - 5, by - 6, bx - 4, by + 1, hex('#6a1a1a')); R.rect(bx - 2, by - 4, bx + 3, by - 1, hex('#e8c050')); R.pset(bx, by - 3, hex('#fff6c0')); } }
  // otro poeta, de pie junto a la estantería, lee su propia copia y pasa la hoja
  { const x = 262, m = R.actor(EL.peregrino, x, 170, t, { dir: -1, pal: PL({ C: '#2a3a6a', c: '#1e2a4e', o: '#e8dcc0' }), sostiene: [x - 2, 152], habla: t < CARRIED && Math.sin(t * 7) > 0.4, sonrisa: t > BORON }).mano;
    if (m) { const hoja = ((t - P5) % 1.6) < 0.3; R.rect(m[0] - 7, m[1] - 4, m[0] + 5, m[1] + 2, K); R.rect(m[0] - 6, m[1] - 3, m[0] - 1, m[1] + 1, hex('#fffaf0')); R.rect(m[0], m[1] - 3, m[0] + 4, m[1] + 1, hex('#fffaf0')); R.rect(m[0] - 1, m[1] - 4, m[0] - 1, m[1] + 2, hex('#2a4a7a')); if (hoja) R.rect(m[0] - 1, m[1] - 6, m[0] + 3, m[1] - 4, hex('#f2eee2')); } }
};

// 6 · la hoja de Boron de cerca: la mano pinta la cena; en «cup» la copa brilla
const B6 = R.nuevo(); let hecho6 = false;
const pintaHojaBoron = () => {
  const p = (x, y, c) => R.pset(x, y, c), r = (x0, y0, x1, y1, c) => R.rect(x0, y0, x1, y1, c);
  // la mesa de roble con sus vetas y la luz de la ventana desde la izquierda
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(y * 0.35 + Math.sin(x * 0.02 + y * 0.05) * 3), l = x < 120 ? 0.15 * (1 - x / 120) : 0;
    p(x, y, mez(v > 0.85 ? hex('#5a3820') : v < -0.8 ? hex('#7a5030') : (H(x >> 1, y, 3) < 0.05 ? hex('#5e3c22') : hex('#6c462a')), [255, 230, 180], l)); }
  // la hoja de pergamino con su sombra y el borde irregular
  r(40, 18, 262, 172, hex('#3a2414'));
  for (let y = 12; y <= 166; y++) for (let x = 34; x <= 256; x++) { const borde = (x < 36 || x > 254 || y < 14 || y > 164) && H(x, y, 4) < 0.5; if (borde) continue; p(x, y, H(x, y, 5) < 0.05 ? hex('#e2d2ae') : H(x >> 3, y >> 3, 6) < 0.15 ? hex('#ecdfc0') : hex('#f4e9cf')); }
  // dos columnas de texto (trazos, sin letras) y una capitular
  for (let y = 22; y <= 54; y += 4) { for (const [x0, x1] of [[50, 140], [152, 242]]) { let x = x0 + (y === 22 && x0 === 50 ? 14 : 0); while (x < x1) { const w = 3 + Math.floor(H(x, y, 7) * 9); R.linea(x, y, Math.min(x1, x + w), y, hex('#4a3a2a')); x += w + 2; } } }
  r(50, 20, 61, 31, hex('#c8303a')); r(52, 22, 59, 29, hex('#2a4aa8')); R.disco(55, 25, 2, hex('#e8c050'));
  // el marco de la miniatura: filete de oro, fondo azul con estrellas y el suelo
  r(58, 64, 238, 162, hex('#c8a040')); r(60, 66, 236, 160, hex('#8a2a3a')); r(62, 68, 234, 158, hex('#2a3a84'));
  for (let k = 0; k < 40; k++) { const x = 64 + Math.floor(H(k, 1, 8) * 168), y = 70 + Math.floor(H(k, 2, 8) * 34); p(x, y, hex('#e8c050')); if (k % 3 === 0) { p(x + 1, y, hex('#e8c050')); p(x, y + 1, hex('#e8c050')); } }
  for (let y = 142; y <= 158; y++) for (let x = 62; x <= 234; x++) p(x, y, (x + y) % 8 < 4 ? hex('#3a7a4a') : hex('#2e6a3e'));
  for (let x = 58; x <= 238; x += 4) { p(x, 64, hex('#fff6c0')); p(x + 2, 162, hex('#fff6c0')); }
  // los comensales detrás de la mesa: siete figuras con túnicas de colores y aureolas de oro (sin caras de detalle)
  [[84, '#c8303a'], [104, '#3a7a4a'], [124, '#e8a030'], [148, '#f2eee2'], [172, '#7a3a8a'], [192, '#3a6ac8'], [212, '#a8502a']].forEach(([x, c], k) => {
    R.disco(x, 112, 6, hex('#e8c050')); R.disco(x, 112, 5, hex('#f8d870')); R.disco(x, 113, 4, K); R.disco(x, 113, 3, hex('#e8b890')); r(x - 2, 109, x + 2, 110, hex(k % 2 ? '#5a3a1a' : '#8a5a2a'));
    r(x - 7, 118, x + 7, 132, K); r(x - 6, 119, x + 6, 132, hex(c)); r(x - 6, 119, x - 5, 132, mez(hex(c), [255, 255, 255], 0.3)); });
  // la mesa larga con el mantel blanco, panes y jarras
  r(70, 130, 226, 144, K); r(71, 131, 225, 143, hex('#fffaf0')); for (let x = 74; x < 224; x += 6) r(x, 138, x + 2, 143, hex('#e8e0cc')); r(71, 143, 225, 144, hex('#c8bca0'));
  for (const x of [92, 116, 184, 206]) { R.disco(x, 130, 3, K); R.disco(x, 130, 2, hex('#c88a3a')); p(x - 1, 129, hex('#e8b060')); }
  for (const x of [134, 166]) { r(x - 2, 124, x + 2, 130, K); r(x - 1, 125, x + 1, 129, hex('#a8a8b8')); }
  // a la derecha de la hoja: las conchas con los colores, el tarro de pinceles y el pan de oro
  for (const [x, y, c] of [[282, 40, '#c8303a'], [298, 60, '#2a4aa8'], [280, 78, '#e8c050'], [300, 98, '#3a7a4a']]) { R.disco(x, y, 7, K); R.disco(x, y, 6, hex('#e8dcc8')); R.disco(x, y + 1, 4, hex(c)); for (let i = -5; i <= 5; i += 2) p(x + i, y - 4, hex('#b8a890')); p(x - 2, y, hex('#ffffff')); }
  r(270, 118, 292, 150, K); r(271, 119, 291, 150, hex('#8a6a4a')); r(271, 119, 291, 121, hex('#a8885a')); for (let x = 273; x < 290; x += 4) r(x, 122, x + 1, 149, hex('#7a5a3a'));
  for (const [x, a] of [[275, -3], [281, 0], [287, 4]]) { R.linea(x, 118, x + a, 98, hex('#c8a060')); r(x + a - 1, 94, x + a + 1, 98, hex('#3a2a1a')); }
  r(296, 150, 316, 164, hex('#3a2414')); r(294, 146, 314, 162, hex('#e8c050')); r(294, 146, 314, 147, hex('#fff6c0')); for (let k = 0; k < 6; k++) p(296 + k * 3, 152 + (k % 2) * 4, hex('#c8a030'));
};
const p6 = (t) => {
  if (!hecho6) { const prev = R.usar(B6); pintaHojaBoron(); R.usar(prev); hecho6 = true; }
  R.copiar(B6);
  // el pan de oro y la hoja que se levantan un poco con la corriente
  { const lev = Math.max(0, Math.sin(t * 1.3)) * 2; for (let i = 0; i < 10; i++) R.linea(246 + i, 164 - Math.round(lev * (i / 10)), 256, 164 - Math.round(lev * (i / 10)), hex('#f4e9cf')); }
  // la copa: primero el boceto de tinta, luego pintada de oro; en «cup» brilla con sus rayos
  const pinta = tramo(t, P6 + 0.1, ORIGIN + 0.6), br = tramo(t, CUP - 0.3, CUP + 0.2), cx = 150, cy = 136;
  if (pinta < 1) { const g = hex('#6a4a2a'); for (let i = -8; i <= 8; i++) R.pset(cx + i, cy - 18 + Math.round((i * i) / 12), g); R.linea(cx - 8, cy - 18, cx + 8, cy - 18, g); R.linea(cx, cy - 12, cx, cy - 4, g); R.linea(cx - 6, cy - 1, cx + 6, cy - 1, g); R.linea(cx - 4, cy - 3, cx + 4, cy - 3, g);
    const n = Math.round(pinta * 24); for (let k = 0; k < n; k++) { const x = cx - 7 + (k % 15), y = cy - 17 + Math.floor(k / 15) * 4 + (k % 3); R.pset(x, y, hex('#e8c050')); } }
  else { if (br > 0) { halo(cx, cy - 12, 26 + br * 10, '#fff2a0', 0.55 * br); R.recorte([62, 68, 234, 158]); const rot = (t - CUP) * 0.8; for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2 + rot, L = 22 + (k % 2) * 14; for (let s = 12; s < L * br + 12; s++) if ((s + k) % 2 === 0) R.pset(Math.round(cx + Math.cos(a) * s), Math.round(cy - 12 + Math.sin(a) * s), hex('#fff6c0')); } R.recorte(null); }
    T.copa(R, cx, cy, t, { tipo: 'oro', s: 2, brillo: 0.3 + br * 0.7 }); }
  // la mano de Boron con el pincel: pinta la copa y se retira en «Last Supper»
  const sale = tramo(t, SUPPER - 0.4, SUPPER + 0.4);
  if (sale < 1) { const ph = t * 9, mv = pinta < 1 ? 1 : 0.25, tx = cx + Math.sin(ph) * 6 * mv, ty = cy - 12 + Math.cos(ph * 0.7) * 5 * mv, px = Math.round(lerp(tx + 13, 230, sale * sale)), py = Math.round(lerp(ty + 16, 220, sale * sale));
    R.linea(px - 2, py - 2, px - 12, py - 14, hex('#c8a060')); R.linea(px - 1, py - 2, px - 11, py - 14, hex('#a07a40')); R.rect(px - 14, py - 17, px - 12, py - 14, hex('#3a2a1a')); R.pset(px - 14, py - 17, pinta < 1 ? hex('#e8c050') : hex('#3a2a1a'));
    T.brazo(R, 200, 206, px, py, '#5a3a6a', -1); }
};

const efectos = [[0.3, 'aldea'], [STORY, 'pop'], [CHRET + 0.2, 'lapiz'], [WRITES + 0.3, 'lapiz'], [PERC + 0.1, 'whoosh'],
  [GOBY, 'brillo'], [GRAIL, 'brillo'], [DIED + 0.3, 'papel'], [FINISH, 'vapor'], [WHERE, 'pop'],
  [P5 + 0.3, 'golpecito'], [CARRIED, 'papel'], [ROBERT, 'pop'], [P6 + 0.2, 'lapiz'], [CUP, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '1190', efectos, año: (t) => (t < P5 ? 1190 : 1200) });
''')
