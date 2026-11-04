E = {}

# ── piezas pequeñas comunes a las cuatro escenas (se repiten en cada cuerpo: cada escena es un .html suelto) ──
PIEZAS = r'''
const K9 = { k: hex('#1c1222'), b: hex('#ffffff'), crema: hex('#f4eedc'), cremaS: hex('#d8cca8'), oro: hex('#f0c040'), oroS: hex('#a87a18'), oroL: hex('#fff0a0'),
  rojo: hex('#c8303a'), rojoS: hex('#8a1a24'), verde: hex('#4a9a3a'), verdeS: hex('#2e6a24'), azul: hex('#3a6ab8'), azulS: hex('#24467a'),
  morado: hex('#7a4ab0'), moradoS: hex('#52307a'), piel: hex('#f6c290'), gris: hex('#8a8a96'), grisS: hex('#5a5a66'), grisL: hex('#c8c8d0') };
const h9 = (x, y, k = 0) => { let n = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(k | 0, 1442695041)) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const mz = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const di = (x, y, u) => u * 16 > BY[(y & 3) * 4 + (x & 3)];
// degradado vertical tramado entre varios colores (respeta el recorte: pset)
const degr = (x0, y0, x1, y1, cs) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * (cs.length - 1), i = Math.min(cs.length - 2, Math.floor(u)), f = u - i;
  for (let x = x0; x <= x1; x++) R.pset(x, y, di(x, y, f) ? cs[i + 1] : cs[i]); } };
const caja = (x0, y0, x1, y1, c, k = K9.k) => { R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, k); R.rect(x0, y0, x1, y1, c); };
// velar: mezcla un rectángulo con un color (luz o sombra)
const velar = (x0, y0, x1, y1, c, a) => { if (a <= 0) return; for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) R.pset(x, y, mz(R.pget(x, y), c, a)); };
// el fondo fijo de un plano, pintado una vez en su búfer
const FIJOS = {};
const fijo = (clave, f) => { if (!FIJOS[clave]) { const b = R.nuevo(), prev = R.usar(b); R.recorte(null); f(); R.recorte(null); R.usar(prev); FIJOS[clave] = b; } R.copiar(FIJOS[clave]); };
// un personaje pintado solo dentro de un hueco (una pantalla): se pinta en un búfer aparte y se copia recortado
let BUFA = null;
const actorEn = (def, x, suelo, t, o, [x0, y0, x1, y1]) => {
  if (!BUFA) BUFA = R.nuevo(); BUFA.fill(0); const prev = R.usar(BUFA); const r = R.actor(def, x, suelo, t, o); R.usar(prev);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let xx = Math.max(0, x0); xx <= Math.min(319, x1); xx++) { const c = BUFA[y * 320 + xx]; if (c) R.pset(xx, y, c); }
  return r;
};
// una nube de tres tonos (cs: luz, medio, sombra); ok(x, y) dice si ahí se ve cielo
const nube = (cx, cy, r, cs, ok = () => true) => { cx = Math.round(cx); cy = Math.round(cy);
  const L = [[-r, 1, r * 0.75], [0, -1, r], [r, 1, r * 0.72], [r * 0.5, 2, r * 0.7], [-r * 0.5, 2, r * 0.7], [r * 1.6, 2, r * 0.5]];
  for (let y = Math.round(cy - r * 1.3); y <= cy + r * 0.5; y++) for (let x = Math.round(cx - r * 2); x <= cx + r * 2.3; x++) {
    if (x < 0 || x > 319 || y < 0 || !ok(x, y)) continue; let d = 9; for (const [lx, ly, lr] of L) d = Math.min(d, Math.hypot(x - cx - lx, (y - cy - ly) * 1.35) / lr);
    if (d > 1) continue; const u = (y - (cy - r * 1.2)) / (r * 1.7); R.pset(x, y, u < 0.38 ? cs[0] : u < 0.72 ? (di(x, y, (u - 0.38) * 3) ? cs[1] : cs[0]) : (di(x, y, (u - 0.72) * 3.5) ? cs[2] : cs[1])); } };
// un pájaro pequeño que aletea
const pajarito = (x, y, t, c = K9.k) => { x = Math.round(x); y = Math.round(y); const up = Math.sin(t * 12 + x * 0.3) > 0;
  R.pset(x, y, c); R.pset(x - 1, y + (up ? -1 : 1), c); R.pset(x + 1, y + (up ? -1 : 1), c); R.pset(x - 2, y + (up ? -2 : 1), c); R.pset(x + 2, y + (up ? -2 : 1), c); };
// la portada de una película o de un libro, sin letras: 0 sinsajo (los Juegos), 1 la llama (En llamas), 2 la serpiente y el
// pájaro (la Balada), 3 el sinsajo de alas abiertas (Sinsajo), 4 el sol que sale (el libro nuevo); una barra dorada de título
const PORT = [['#1a1418', '#3a2a30'], ['#6a1408', '#d0501a'], ['#0e2a24', '#24584a'], ['#101c3a', '#2a4a8a'], ['#2a1240', '#d0703a']].map((p) => p.map(hex));
const portada = (x0, y0, x1, y1, k, t = 0) => {
  const [c0, c1] = PORT[k], w = x1 - x0, hg = y1 - y0, cx = Math.round((x0 + x1) / 2), cy = Math.round(y0 + hg * 0.55), m = Math.min(w, hg);
  R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K9.k); degr(x0, y0, x1, y1, [c0, c1]);
  const s = Math.max(1, Math.floor(m / 22));
  if (k === 0 || k === 3) {
    const r = Math.max(4, Math.round(m * 0.34));
    R.disco(cx, cy, r + 1, K9.k); R.disco(cx, cy, r, k === 0 ? K9.oro : hex('#d8e4f8')); R.disco(cx, cy, r - Math.max(1, s), k === 0 ? hex('#e8b030') : hex('#9ab8e8'));
    if (m >= 14) T.PIEZAS_JH.sinsajo(R, cx, cy + Math.round(5 * s), { s, t: k === 3 ? t : null }); else R.rect(cx - 1, cy - 1, cx + 1, cy + 1, K9.k);
    if (k === 3) for (const sx of [-1, 1]) R.linea(cx + sx * (r + 2), cy + r, cx + sx * (r + 5), cy - r, K9.oro);
  } else if (k === 1) {
    const f = Math.sin(t * 9) * 0.06, hh = hg * 0.62, bw = w * 0.3;
    R.poligono([[cx - bw, y1 - hg * 0.14], [cx - bw * 0.9, y1 - hh * 0.55], [cx - bw * 0.3, y1 - hh * (0.8 + f)], [cx, y1 - hh * 1.05], [cx + bw * 0.4, y1 - hh * (0.75 - f)], [cx + bw * 0.95, y1 - hh * 0.5], [cx + bw, y1 - hg * 0.14]].map(([a, b]) => [Math.round(a), Math.round(b)]), K9.oro);
    R.poligono([[cx - bw * 0.5, y1 - hg * 0.14], [cx - bw * 0.3, y1 - hh * 0.5], [cx, y1 - hh * (0.72 + f)], [cx + bw * 0.35, y1 - hh * 0.45], [cx + bw * 0.5, y1 - hg * 0.14]].map(([a, b]) => [Math.round(a), Math.round(b)]), K9.oroL);
  } else if (k === 2) {
    const yb = Math.round(y0 + hg * 0.72), A = Math.max(2, hg * 0.08);
    for (let x = x0 + 3; x <= x1 - 3; x++) { const y = Math.round(yb + Math.sin((x - x0) / Math.max(4, w) * 9 + t * 3) * A), g = Math.max(1, Math.round(s * 1.2));
      R.rect(x, y - g - 1, x, y + g + 1, K9.k); R.rect(x, y - g, x, y + g, hex('#8ab89a')); R.pset(x, y - g, hex('#d0f0d8')); }
    R.rect(x1 - 5, Math.round(yb - A) - 1, x1 - 4, Math.round(yb - A), K9.rojo);
    if (m >= 14) T.PIEZAS_JH.sinsajo(R, cx, Math.round(y0 + hg * 0.5), { s, t }); else R.rect(cx - 1, y0 + 3, cx + 1, y0 + 5, K9.oro);
  } else {
    const hy = Math.round(y0 + hg * 0.62), r = Math.max(3, Math.round(m * 0.28));
    for (let a = 0; a < 12; a++) { const an = Math.PI + a * Math.PI / 11, l = r + 3 + (a % 2) * 3 + Math.round(Math.sin(t * 4 + a)); R.linea(cx + Math.round(Math.cos(an) * (r + 2)), hy + Math.round(Math.sin(an) * (r + 2)), cx + Math.round(Math.cos(an) * l), hy + Math.round(Math.sin(an) * l), K9.oroL); }
    R.disco(cx, hy, r, K9.oro); R.disco(cx - 1, hy - 1, Math.max(1, r - 2), K9.oroL);
    R.rect(x0, hy, x1, y1, hex('#1c0c28')); R.poligono([[x0, hy + 3], [x0 + w * 0.3, hy - 2], [x0 + w * 0.55, hy + 2], [x0 + w * 0.8, hy - 3], [x1, hy + 1], [x1, y1], [x0, y1]].map(([a, b]) => [Math.round(a), Math.round(b)]), hex('#3a1a4a'));
    R.rect(x0, hy, x1, hy, hex('#f8a060'));
  }
  if (w >= 16) { R.rect(x0 + 3, y0 + 3, x1 - 3, y0 + 3 + Math.max(1, s - 1), K9.oro); R.rect(x0 + 5, y0 + 5 + s, x1 - 5, y0 + 5 + s, mz(K9.oro, c0, 0.5)); }
  for (let i = 0; i < m; i += 1) { const x = x0 + Math.round(w * 0.65) + i - Math.round(m * 0.3), y = y0 + i; if (x > x0 && x < x1 && y < y1 && (i & 1)) R.pset(x, y, mz(R.pget(x, y), K9.b, 0.22)); }
};
// un libro tumbado visto de frente (el canto de las páginas), centrado en cx, con la base en y
const libroTumbado = (cx, y, k, w = 56) => { const C = [[K9.rojo, K9.rojoS], [K9.oro, K9.oroS], [K9.azul, K9.azulS], [K9.verde, K9.verdeS], [K9.morado, K9.moradoS]][k % 5], x0 = Math.round(cx - w / 2), x1 = x0 + w;
  R.rect(x0 - 1, y - 7, x1 + 1, y, K9.k); R.rect(x0, y - 6, x1, y - 1, C[0]); R.rect(x0 + 2, y - 5, x1 - 1, y - 2, K9.crema);
  for (let x = x0 + 3; x < x1 - 1; x += 3) R.pset(x, y - 4, K9.cremaS); R.rect(x0 + 2, y - 2, x1 - 1, y - 2, K9.cremaS); R.rect(x0, y - 6, x1, y - 6, mz(C[0], K9.b, 0.35)); R.rect(x0, y - 6, x0 + 1, y - 1, C[1]); };
// un coche que pasa (x: la izquierda, 42 px de largo), con su sombra, faros y ruedas que giran
const coche = (x, suelo, c, dir, t) => { x = Math.round(x); const cS = mz(c, K9.k, 0.35), cL = mz(c, K9.b, 0.35), vid = hex('#a8c8e0');
  R.rect(x + 2, suelo + 1, x + 40, suelo + 2, mz(hex('#2a2a32'), K9.k, 0.4));
  R.poligono([[x + 9, suelo - 12], [x + 14, suelo - 20], [x + 28, suelo - 20], [x + 34, suelo - 12]], K9.k); R.poligono([[x + 10, suelo - 12], [x + 15, suelo - 19], [x + 27, suelo - 19], [x + 32, suelo - 12]], c);
  R.rect(x + 15, suelo - 18, x + 20, suelo - 13, vid); R.rect(x + 22, suelo - 18, x + 27, suelo - 13, vid); R.pset(x + 16, suelo - 17, K9.b); R.pset(x + 23, suelo - 17, K9.b);
  R.rect(x, suelo - 12, x + 42, suelo - 3, K9.k); R.rect(x + 1, suelo - 11, x + 41, suelo - 4, c); R.rect(x + 1, suelo - 11, x + 41, suelo - 10, cL); R.rect(x + 1, suelo - 5, x + 41, suelo - 4, cS);
  R.rect(x + 20, suelo - 9, x + 20, suelo - 5, cS); R.rect(x + 23, suelo - 9, x + 25, suelo - 9, cS);
  const fx = dir > 0 ? x + 40 : x + 1, tx = dir > 0 ? x + 1 : x + 40; R.rect(fx, suelo - 9, fx + 1, suelo - 8, K9.oroL); R.rect(tx, suelo - 9, tx + 1, suelo - 8, K9.rojo);
  for (const wx of [x + 9, x + 33]) { R.disco(wx, suelo - 3, 4, K9.k); R.disco(wx, suelo - 3, 2, K9.grisS); const a = t * 14 * dir; R.pset(wx + Math.round(Math.cos(a) * 2), suelo - 3 + Math.round(Math.sin(a) * 2), K9.grisL); R.pset(wx, suelo - 3, K9.grisL); } };
// una figurita lejana (de una cola o de la calle): 5 × 11 px, con su color
const mini = (x, y, k, t, anda = false) => { x = Math.round(x); y = Math.round(y);
  const cs = [K9.rojo, K9.azul, K9.verde, K9.morado, hex('#e8a030'), hex('#3ab0b0'), hex('#d86a9a')][k % 7], pl = [hex('#3a2418'), hex('#e8c060'), K9.k, hex('#8a4a2a'), hex('#c8c8d0')][k % 5], pi = [K9.piel, hex('#c8905a'), hex('#8a5a3a')][k % 3];
  const p = anda && Math.sin(t * 9 + k) > 0 ? 1 : 0;
  R.rect(x - 2, y - 11, x + 2, y - 1, K9.k); R.rect(x - 1, y - 10, x + 1, y - 8, pi); R.rect(x - 1, y - 11, x + 1, y - 10, pl); R.rect(x - 2, y - 7, x + 2, y - 3, cs); R.rect(x - 2, y - 7, x - 2, y - 3, mz(cs, K9.b, 0.3));
  R.rect(x - 1, y - 2, x - 1, y - p, hex('#2a2a3a')); R.rect(x + 1, y - 2, x + 1, y - 1 + p, hex('#2a2a3a')); };
// un corazón de 7 × 6 px
const corazon = (x, y, c) => { x = Math.round(x); y = Math.round(y); const F = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'];
  F.forEach((f, j) => { for (let i = 0; i < 7; i++) if (f[i] === '#') R.pset(x + i, y + j, (i === 1 && j === 1) ? K9.b : c); }); };
// una nota musical (corchea)
const nota = (x, y, c) => { x = Math.round(x); y = Math.round(y); R.rect(x, y + 4, x + 2, y + 6, c); R.rect(x + 2, y, x + 2, y + 5, c); R.rect(x + 3, y, x + 4, y + 1, c); R.pset(x + 4, y + 2, c); };
'''

E['jh-libros'] = ('Cien millones', '''// JH-LIBROS (frases 51–52), lo real de hoy, sin barra. Cuatro planos:
// 1. (real 'libreria' general) un lector entra por la izquierda y una lectora se acerca a la mesa; la torre de libros crece
//    hasta el techo en «one hundred million copies» (sale «100»); la librera levanta los brazos (corta en «And this movie's»);
// 2. (real 'libreria' 'grafico') una mano entra y da al play en «trailer»; el contador sube y llega a 109 en «109 million»,
//    con un destello; salen corazones y las barras de las horas crecen hasta «single day» (corta en «And the new book»);
// 3. (fondo local: la calle de la librería al amanecer) la cola da la vuelta a la manzana; la dependienta saca libros
//    nuevos de la caja y la caja se vacía; los que lo tienen se van contentos; el letrero cuenta hasta 1500000 en «one and
//    a half million» y se marcan los siete días en «first week»; pasan coches por delante (corta tras «week»);
// 4. (fondo local: la mesa de novedades de cerca) la pila de la Balada ya está; la del libro nuevo crece libro a libro con
//    el pan subido encima, hasta el doble: «X2» en «double»; en «Ballad» el pan señala la pila pequeña y se ríe.''', PIEZAS + r'''
const a = (f) => en('libros', f), b = (f) => en('semana', f);
const P2 = a(0.4016), P3 = b(0), P4 = b(0.6154);
const CIEN = a(0.1775), COPIES = a(0.279), TRAILER = a(0.503), N109 = a(0.632), DAY = a(0.911);
const MEDIO = b(0.1715), MILLON = b(0.2596), PRIMERA = b(0.5262), DOBLE = b(0.8391), BALADA = b(0.9063);
const ENTREGAS = [b(0.048), b(0.169), b(0.29), b(0.412), b(0.534)];

// 1 · la librería: la torre crece hasta el techo
const p1 = (t) => {
  const tor = tramo(t, 0.5, COPIES + 0.15), n = Math.round(tor * 22), top = 127 - Math.round(n * 4.4);
  T.real(R, t, { encuadre: 'libreria', torre: tor });
  // la librera, detrás del mostrador: atiende, se sorprende con la torre y levanta los brazos en «copies»
  R.actor(EL.cajera, 248, 142, t, { dir: -1, habla: t < CIEN - 0.2 && Math.sin(t * 8) > 0, sorpresa: t > CIEN && t < COPIES, brazos: t > COPIES && t < COPIES + 1.0, sonrisa: t > COPIES + 1.0 });
  // un lector entra por la izquierda y se queda mirando la torre; en «copies» la señala
  const u = tramo(t, 0.1, 1.6), x1 = Math.round(lerp(-18, 52, u));
  R.actor(EL.estudiante, x1, 168, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > CIEN && t < COPIES + 0.2, dedo: t > COPIES + 0.2 });
  // una lectora llega desde la derecha con un libro en la mano y se para ante la mesa
  const v = tramo(t, 0.4, 2.2), x2 = Math.round(lerp(214, 176, v)), r2 = R.actor(EL.joven2, x2, 172, t, { dir: -1, anda: v > 0 && v < 1, sostiene: true, sorpresa: t > COPIES - 0.1 && t < COPIES + 0.8 });
  if (r2 && r2.mano) T.libroJH(R, r2.mano[0], r2.mano[1] + 3, 4, { w: 4, alto: 9 });
  // una niña lee de pie en la alfombra, pasa la página y en «copies» levanta la vista
  const rn = R.actor(EL.nina, 92, 176, t, { dir: 1, sostiene: t < COPIES - 0.2 ? [109, 160] : false, sorpresa: t > COPIES - 0.2 });
  if (t < COPIES - 0.2 && rn && rn.mano) { const [bx, by] = rn.mano, pg = Math.floor(t * 1.2) % 2; R.rect(bx - 6, by - 4, bx + 6, by + 3, K9.k); R.rect(bx - 5, by - 3, bx - 1, by + 2, K9.crema); R.rect(bx + 1, by - 3, bx + 5, by + 2, pg ? K9.b : K9.crema); R.rect(bx, by - 3, bx, by + 2, K9.morado); }
  // cada libro que llega a la torre deja un destello en la cima; al final, la cifra
  if (tor > 0 && tor < 1) { const f = (tor * 22) % 1; if (f < 0.5) { R.pset(150 - 10, top - 1, K9.oroL); R.pset(150 + 10, top - 1, K9.oroL); R.pset(150 - 12, top - 3, K9.b); R.pset(150 + 12, top - 3, K9.b); } }
  const c = tramo(t, CIEN - 0.1, CIEN + 0.3);
  if (c > 0) { const yy = Math.round(lerp(top + 4, top - 6, c)); R.rect(150 - 14, yy - 11, 150 + 14, yy + 2, K9.k); R.rect(150 - 13, yy - 10, 150 + 13, yy + 1, hex('#2a1a2a')); T.a_cifras(R, '100', 150, yy); }
  T.realDelante(R, t, { encuadre: 'libreria' });
};
// 2 · el móvil: el tráiler, el contador hasta 109 y las barras de las horas
const p2 = (t) => {
  const c = tramo(t, TRAILER + 0.1, N109 + 0.05), n = Math.round(109 * (1 - (1 - c) ** 2.2));
  T.real(R, t, { encuadre: 'libreria', camara: 'grafico', cifra: String(n), icono: 'play', barras: [0.08, 0.13, 0.2, 0.28, 0.4, 0.55, 0.74, 1], crece: tramo(t, N109 - 0.3, DAY + 0.2) });
  // el destello del 109: un aro que se abre alrededor de la cifra
  const f = tramo(t, N109 + 0.05, N109 + 0.7);
  if (f > 0 && f < 1) { R.recorte([124, 28, 196, 144]); const r = Math.round(6 + f * 26); for (let k = 0; k < 40; k++) { const an = k / 40 * Math.PI * 2; R.pset(160 + Math.round(Math.cos(an) * r), 50 + Math.round(Math.sin(an) * r * 0.6), mz(K9.oroL, hex('#1a2238'), f)); } R.recorte(null); }
  // corazones que suben del móvil después del 109
  if (t > N109 + 0.3) for (let k = 0; k < 7; k++) { const u = ((t - N109 - 0.3) * 0.45 + k / 7) % 1, x = 186 + Math.round(u * 34 + Math.sin(u * 7 + k) * 5), y = 120 - Math.round(u * 100);
    if (u > 0.04 && (t - N109 - 0.3) * 0.45 + k / 7 > 0.15) corazon(x, y, u < 0.7 ? hex('#e84a6a') : hex('#c83a5a')); }
  // la mano entra desde abajo, da al play en «trailer» y se va
  const ent = tramo(t, P2 + 0.25, TRAILER - 0.08), sal = tramo(t, TRAILER + 0.4, TRAILER + 1.1), toque = Math.abs(t - TRAILER) < 0.12 ? 3 : 0;
  if (ent > 0 && sal < 1) { const yy = Math.round(lerp(196, 140, ent) + lerp(0, 66, sal)) + toque; T.brazo(R, 232, 200, 164, yy, '#3a5a8a', -1, { codo: [204, Math.min(196, yy + 30)] }); }
  if (Math.abs(t - TRAILER) < 0.25) R.disco(151, 135, 3 + Math.round(tramo(t, TRAILER - 0.05, TRAILER + 0.25) * 4), mz(hex('#e8b830'), K9.b, 0.4));
};
// 3 · la calle de la librería: la cola que da la vuelta a la manzana
let SK = null;
const fondoCalle = () => {
  SK = new Int16Array(320);
  degr(0, 0, 319, 100, [hex('#6a8ad0'), hex('#9ab0e0'), hex('#d8b8d0'), hex('#f8d0a8')]);
  // la ciudad lejana en la bruma, con ventanas
  for (let x = 0, k = 0; x < 320; k++) { const w = 10 + Math.floor(h9(k, 1, 7) * 18), y = 40 + Math.floor(h9(k, 2, 7) * 34), c = mz(hex('#8a94c0'), hex('#d8b8d0'), h9(k, 3, 7) * 0.4);
    R.rect(x, y, x + w, 110, c); R.rect(x, y, x, 110, mz(c, K9.b, 0.15)); for (let wy = y + 4; wy < 100; wy += 5) for (let wx = x + 2; wx < x + w - 1; wx += 4) if (h9(wx, wy, 8) < 0.35) R.pset(wx, wy, mz(c, hex('#fff0c0'), 0.55));
    if (h9(k, 4, 7) < 0.3) { R.rect(x + Math.floor(w / 2), y - 6, x + Math.floor(w / 2), y, c); R.pset(x + Math.floor(w / 2), y - 7, K9.rojo); }
    for (let i = x; i <= Math.min(319, x + w); i++) SK[i] = y; x += w + 1; }
  // el lado de la manzana que se aleja (izquierda): fachada en perspectiva con ventanas y la acera que sube
  R.poligono([[0, 52], [58, 34], [58, 134], [0, 116]], K9.k); R.poligono([[0, 53], [57, 35], [57, 134], [0, 117]], (x, y) => { const yy = y - (52 - x * 18 / 58); return ((Math.floor(yy / 4) + Math.floor(x / 6)) % 2 === 0 && (yy % 4) === 0) ? hex('#7a4034') : h9(x, y, 3) < 0.12 ? hex('#8a4a3a') : hex('#a85a46'); });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const x0 = 6 + c * 13, sc = 1 - (58 - x0) / 140, top = Math.round(60 - x0 * 0.31 + r * 18 * sc + 2), hh = Math.round(10 * sc);
    if (r === 3) continue; R.poligono([[x0, top], [x0 + 8, top - 2], [x0 + 8, top - 2 + hh], [x0, top + hh]], K9.k); R.poligono([[x0 + 1, top + 1], [x0 + 7, top - 1], [x0 + 7, top - 2 + hh - 1], [x0 + 1, top + hh - 1]], h9(c, r, 4) < 0.4 ? hex('#f8d890') : hex('#7a9ac8')); }
  R.poligono([[0, 116], [58, 134], [58, 150], [0, 126]], hex('#b8b4ac')); for (let i = 0; i < 6; i++) { const x = 6 + i * 9; R.linea(x, 118 + Math.round(x * 0.3), x - 2, 127 + Math.round(x * 0.4), hex('#9a968e')); }
  R.poligono([[0, 126], [58, 150], [58, 152], [0, 128]], hex('#8a867e'));
  for (let i = 0; i < 58; i++) SK[i] = Math.min(SK[i], Math.round(52 - i * 18 / 58));
  // la librería: cornisa, piso alto de ladrillo, letrero de cifras, ventanas con jardineras
  R.rect(58, 32, 262, 134, K9.k);
  for (let y = 40; y < 74; y++) for (let x = 59; x <= 261; x++) { const fila = Math.floor((y - 40) / 4), jun = (y - 40) % 4 === 3 || ((x + (fila % 2) * 5) % 10 === 0); R.pset(x, y, jun ? hex('#8a4a3a') : h9(Math.floor((x + (fila % 2) * 5) / 10), fila, 5) < 0.2 ? hex('#b05a44') : h9(x, y, 6) < 0.08 ? hex('#a04e3a') : hex('#c06a50')); }
  R.rect(56, 32, 264, 39, K9.k); R.rect(57, 33, 263, 38, hex('#d8d0c0')); R.rect(57, 33, 263, 33, K9.b); R.rect(57, 38, 263, 38, hex('#a89c88')); for (let x = 60; x < 262; x += 5) R.rect(x, 39, x + 2, 41, hex('#b8ae9a'));
  for (const wx of [66, 232]) { caja(wx, 44, wx + 24, 64, hex('#6a88b0')); R.rect(wx + 12, 44, wx + 12, 64, K9.k); R.rect(wx, 54, wx + 24, 54, K9.k); R.rect(wx + 1, 45, wx + 4, 53, hex('#b0c8e8')); R.rect(wx - 2, 65, wx + 26, 67, hex('#d8d0c0')); R.rect(wx - 2, 68, wx + 26, 70, hex('#6a4a2a'));
    for (let i = 0; i < 7; i++) { R.pset(wx + 1 + i * 4, 67, [K9.rojo, K9.oro, hex('#e88ab0')][i % 3]); R.pset(wx + 2 + i * 4, 66, K9.verde); } }
  caja(100, 40, 224, 69, hex('#1e1a2a')); R.rect(99, 39, 225, 39, K9.oroS); R.rect(99, 70, 225, 70, K9.oroS); R.rect(100, 41, 224, 41, hex('#2e2a3e'));
  for (const bx of [102, 222]) R.disco(bx, 42, 1, K9.oroL);
  // planta baja: toldo, escaparates, la puerta abierta con luz cálida
  for (let y = 74; y < 134; y++) for (let x = 59; x <= 261; x++) R.pset(x, y, ((x - 59) % 26 < 2) ? hex('#1e3a2e') : hex('#2e5a44'));
  R.rect(58, 128, 262, 134, hex('#a89c88')); R.rect(58, 128, 262, 128, hex('#c8bea8'));
  // escaparate izquierdo: libros en pirámide, póster del sol y guirnalda
  caja(66, 86, 150, 127, hex('#3a4a6a')); degr(66, 86, 150, 127, [hex('#4a5a7a'), hex('#5a4a5a'), hex('#7a5a4a')]);
  R.rect(66, 114, 150, 127, hex('#6a3a22')); R.rect(66, 114, 150, 114, hex('#a86a3a'));
  for (let i = 0; i < 11; i++) T.libroJH(R, 98 + i * 3 - (i > 5 ? 0 : 0), 113, [4, 4, 3, 1, 4, 0, 4, 2, 4, 3, 4][i], { w: 3, alto: 11 + (i % 3) * 2 });
  for (let r = 0; r < 3; r++) for (let i = 0; i < 3 - r; i++) { const bx = 100 + i * 12 + r * 6, by = 126 - r * 4; R.rect(bx - 6, by - 4, bx + 6, by, K9.k); R.rect(bx - 5, by - 3, bx + 5, by - 1, K9.morado); R.rect(bx - 5, by - 3, bx + 5, by - 3, hex('#a87ad8')); R.pset(bx, by - 2, K9.oro); }
  portada(70, 90, 92, 120, 4, 0); portada(126, 92, 146, 120, 2, 0);
  for (let x = 66; x <= 150; x += 2) R.pset(x, 88 + Math.round(Math.sin(x * 0.2) * 1.5), hex('#3a2a1a'));
  R.linea(66, 86, 98, 127, mz(hex('#4a5a7a'), K9.b, 0.25)); R.linea(72, 86, 104, 127, mz(hex('#4a5a7a'), K9.b, 0.15));
  // la puerta
  caja(156, 86, 180, 133, hex('#f8d890')); degr(157, 87, 179, 132, [hex('#f8e0a0'), hex('#f0c070'), hex('#c8904a')]);
  for (let y = 92; y < 128; y += 9) { R.rect(158, y, 178, y, hex('#8a5a2a')); for (let x = 159; x < 178; x += 3) R.rect(x, y - 7, x + 1, y - 1, [K9.rojo, K9.azul, K9.verde, K9.morado, K9.oro][(x + y) % 5]); }
  R.rect(155, 85, 155, 133, hex('#4a2a1a')); R.rect(181, 85, 181, 133, hex('#4a2a1a')); R.rect(150, 133, 186, 134, hex('#8a8478'));
  // escaparate derecho: el sinsajo de cartón y las pilas moradas
  caja(186, 86, 256, 127, hex('#3a4a6a')); degr(186, 86, 256, 127, [hex('#4a5a7a'), hex('#5a4a5a'), hex('#7a5a4a')]);
  for (let s = 0; s < 2; s++) { const x0 = 192 + s * 16; for (let i = 0; i < 6; i++) { const by = 126 - i * 6; R.rect(x0, by - 5, x0 + 13, by, K9.k); R.rect(x0 + 1, by - 4, x0 + 12, by - 1, i % 2 ? K9.morado : hex('#8a5ac0')); R.rect(x0 + 1, by - 4, x0 + 12, by - 4, hex('#b08ae0')); R.pset(x0 + 6, by - 2, K9.oro); } }
  for (let i = 0; i < 6; i++) T.libroJH(R, 196 + i * 4, 88 + 14, i % 5, { w: 3, alto: 12 });
  R.disco(236, 104, 13, K9.k); R.disco(236, 104, 12, K9.oro); R.disco(236, 104, 10, hex('#e8b030')); T.PIEZAS_JH.sinsajo(R, 236, 110, { s: 1 });
  R.linea(190, 86, 222, 127, mz(hex('#4a5a7a'), K9.b, 0.22));
  // el toldo de rayas con su festón
  for (let x = 62; x <= 258; x++) { const c = Math.floor((x - 62) / 7) % 2 ? K9.crema : hex('#c8303a'); R.rect(x, 74, x, 82, c); R.pset(x, 74, K9.k); const fe = 83 + Math.round(Math.abs(Math.sin((x - 62) * Math.PI / 7)) * 2); R.rect(x, 83, x, fe, c); R.pset(x, fe + 1, K9.k); }
  R.rect(62, 87, 258, 88, mz(hex('#2e5a44'), K9.k, 0.4));
  // el edificio de al lado (más bajo: deja el cielo libre arriba a la derecha), con un café
  R.rect(262, 70, 319, 134, K9.k); for (let y = 71; y < 134; y++) for (let x = 263; x <= 319; x++) R.pset(x, y, (y % 6 === 0) ? hex('#b8a888') : hex('#d8c8a8'));
  R.rect(262, 68, 319, 71, hex('#a89880')); caja(270, 76, 312, 92, hex('#7a9ac8')); R.rect(291, 76, 291, 92, K9.k);
  for (let x = 264; x <= 319; x++) { R.rect(x, 96, x, 102, Math.floor((x - 264) / 6) % 2 ? K9.crema : hex('#3a8a5a')); R.pset(x, 103 + (x % 6 < 3 ? 1 : 0), K9.k); }
  caja(270, 106, 312, 128, hex('#f0d8a0')); degr(270, 106, 312, 128, [hex('#f8e0b0'), hex('#d8a868')]); R.rect(276, 118, 300, 119, hex('#6a4a2a')); R.rect(282, 113, 285, 117, K9.b); R.rect(292, 112, 295, 117, K9.rojo);
  for (let i = 263; i < 320; i++) SK[i] = Math.min(SK[i], 68); for (let i = 58; i <= 262; i++) SK[i] = Math.min(SK[i], 32);
  // la acera de delante: losas con juntas, manchas, el bordillo y la calle
  for (let y = 134; y < 160; y++) for (let x = 0; x < 320; x++) { if (x < 58 && y < 126 + (x * 24 / 58)) continue; const jun = y === 147 || (x + (y > 147 ? 10 : 0)) % 22 === 0;
    R.pset(x, y, jun ? hex('#9a968e') : h9(x, y, 9) < 0.06 ? hex('#a8a49c') : y > 155 ? hex('#b0aca4') : hex('#c4c0b8')); }
  R.rect(0, 160, 319, 160, hex('#e0dcd4')); R.rect(0, 161, 319, 163, hex('#7a766e'));
  for (let y = 164; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h9(x, y, 11) < 0.1 ? hex('#4a4a52') : h9(x, y, 12) < 0.05 ? hex('#2e2e36') : hex('#3a3a42'));
  for (let x = 6; x < 320; x += 30) R.rect(x, 172, x + 14, 173, hex('#e8e0b0'));
  caja(148, 165, 162, 168, hex('#2a2a30')); for (let x = 150; x < 162; x += 3) R.rect(x, 165, x, 168, hex('#4a4a52'));
  // farola de la esquina, boca de incendios, papelera y el alcorque del árbol
  R.rect(53, 62, 55, 158, K9.k); R.rect(54, 62, 54, 158, hex('#3a4a3a')); caja(49, 54, 59, 62, hex('#2a3a2a')); R.rect(51, 56, 57, 60, hex('#f8e8a0')); R.rect(51, 157, 57, 159, K9.k);
  caja(266, 142, 272, 154, K9.rojo); R.rect(265, 145, 273, 146, K9.rojoS); R.rect(267, 141, 271, 141, K9.rojoS); R.pset(267, 143, hex('#f07070'));
  caja(306, 140, 316, 156, hex('#3a5a3a')); R.rect(305, 139, 317, 140, hex('#2a3a2a')); R.rect(308, 142, 309, 155, hex('#4a7a4a'));
  R.rect(284, 154, 300, 157, hex('#5a4a3a')); R.rect(291, 104, 293, 155, hex('#5a3a22')); R.linea(292, 118, 284, 108, hex('#5a3a22')); R.linea(292, 112, 300, 104, hex('#5a3a22'));
};
const p3 = (t) => {
  fijo('calle', fondoCalle);
  const cielo = (x, y) => y < SK[x] && !(x >= 278 && y <= 44);
  // nubes de tres tonos a tres velocidades y pájaros
  for (const [k, v, y, r] of [[0, 3, 14, 7], [1, 5, 26, 9], [2, 8, 8, 6], [3, 4, 34, 8]]) { const x = ((k * 97 + t * v) % 420) - 50; nube(x, y, r, [hex('#fff4ea'), hex('#f0d0d8'), hex('#c8a8c8')], cielo); }
  for (let k = 0; k < 4; k++) { const x = ((k * 60 + t * 14) % 360) - 20, y = 20 + k * 5 + Math.round(Math.sin(t * 2 + k) * 2); if (cielo(Math.round(Math.max(0, Math.min(319, x))), y)) pajarito(x, y, t, hex('#3a3a5a')); }
  // la copa del árbol de la acera, que se mece
  for (let y = 84; y < 116; y++) for (let x = 272; x < 316; x++) { const sw = Math.sin(t * 1.6 + y * 0.15) * 1.5, d = Math.hypot((x - 293 - sw) / 22, (y - 100) / 16); if (d > 1) continue;
    const hh = h9(Math.floor((x - sw) / 3), Math.floor(y / 3), 33); R.pset(x, y, d > 0.92 ? hex('#1e4a24') : hh < 0.3 ? hex('#2e6a2e') : hh < 0.75 ? hex('#4a8a3a') : hex('#7ab84a')); }
  // la guirnalda del escaparate que titila y la luz de la farola
  for (let x = 67; x < 150; x += 4) R.pset(x, 89 + Math.round(Math.sin(x * 0.2) * 1.5), Math.sin(t * 4 + x) > 0 ? K9.oroL : hex('#e86a4a'));
  // el letrero: la cifra sube hasta 1500000 en «one and a half million»; debajo, los siete días de la primera semana
  const c = tramo(t, MEDIO - 0.15, MILLON + 0.1), n = c >= 1 ? 1500000 : Math.round(1500000 * (1 - (1 - c) ** 3) / 1000) * 1000;
  R.numero(String(n), 162, 59, { tam: 16, centro: true });
  for (let i = 0; i < 7; i++) { const x = 129 + i * 10, on = t > b(0.30 + i * 0.037); caja(x, 62, x + 6, 66, on ? K9.oro : hex('#3a3448')); if (on) { R.pset(x + 1, 64, K9.k); R.pset(x + 2, 65, K9.k); R.pset(x + 3, 64, K9.k); R.pset(x + 4, 63, K9.k); } }
  // la cola por la acera del lado, que se pierde al fondo
  for (let i = 0; i < 9; i++) { const u = ((i + 0.3) / 9 + t * 0.012) % 1, x = 56 - u * 52, y = 150 - u * 24; mini(x, y, i, t, (t * 0.7 + i) % 3 < 0.6); }
  // la cola de delante: avanza cada vez que alguien recibe su libro
  const s = ENTREGAS.reduce((acc, h) => acc + tramo(t, h + 0.25, h + 0.85), 0), moviendo = ENTREGAS.some((h) => t > h + 0.25 && t < h + 0.85);
  const GENTE = [EL.estudiante, EL.abuela, EL.fanCapa, EL.joven, EL.adolescente, EL.turista, EL.chicaRara, EL.oficinista, EL.chico, EL.empollon, EL.roquero, EL.nina, EL.padre];
  const vanse = [];
  GENTE.forEach((def, i) => { const pos = i - s;
    if (i < ENTREGAS.length && t > ENTREGAS[i] + 0.25) { vanse.push([def, i]); return; }
    const x = Math.round(140 - 14 * pos); if (x < 56) return;
    R.actor(def, x, 151, t, { dir: 1, anda: moviendo, sonrisa: i === Math.round(s) && t > ENTREGAS[Math.min(4, i)] - 0.6, habla: i % 3 === 1 && Math.sin(t * 5 + i) > 0.4 && !moviendo }); });
  // la dependienta en la puerta: coge un libro de la caja y se lo da al primero
  let mano = null, dirD = -1; const hNow = ENTREGAS.find((h) => t > h - 0.9 && t < h + 0.3);
  if (hNow != null) { if (t < hNow - 0.45) { dirD = 1; mano = [194, 140]; } else mano = [152, 136]; }
  const rD = R.actor(EL.cajera, 162, 150, t, { dir: dirD, sostiene: mano || false, sonrisa: true, habla: hNow != null && t > hNow - 0.3 });
  if (mano && rD && rD.mano) T.libroJH(R, rD.mano[0], rD.mano[1] + 3, 4, { w: 4, alto: 9 });
  // la caja de libros nuevos, que se vacía
  const quedan = 6 - ENTREGAS.filter((h) => t > h - 0.45).length;
  caja(188, 138, 208, 150, hex('#c8a068')); R.rect(188, 138, 208, 139, hex('#e0bc80')); R.poligono([[187, 138], [182, 132], [190, 132], [194, 138]], hex('#b08850')); R.poligono([[209, 138], [214, 133], [207, 133], [203, 138]], hex('#b08850'));
  R.rect(192, 144, 204, 144, hex('#8a6a3a')); for (let i = 0; i < quedan; i++) { const bx = 190 + i * 3; R.rect(bx, 134, bx + 2, 138, K9.k); R.rect(bx, 135, bx + 1, 138, K9.morado); R.pset(bx, 135, K9.oro); }
  // los que ya tienen el libro se van por la derecha, contentos, por delante
  for (const [def, i] of vanse) { const lv = tramo(t, ENTREGAS[i] + 0.3, ENTREGAS[i] + 2.6); if (lv >= 1) continue; const x = Math.round(lerp(150, 332, lv));
    const r = R.actor(def, x, 158, t, { dir: 1, anda: true, sonrisa: true, sostiene: true }); if (r && r.mano) T.libroJH(R, r.mano[0], r.mano[1] + 3, 4, { w: 4, alto: 9 }); }
  // coches que pasan por delante
  { const u = tramo(t, P3 + 0.6, P3 + 3.2); if (u > 0 && u < 1) coche(lerp(330, -50, u), 177, hex('#e8b830'), -1, t); }
  { const u = tramo(t, P3 + 3.4, P3 + 5.4); if (u > 0 && u < 1) coche(lerp(-50, 330, u), 179, hex('#3a7ab8'), 1, t); }
};
// 4 · la mesa de novedades: la pila del libro nuevo crece hasta el doble que la de la Balada
const fondoMesa = () => {
  degr(0, 0, 319, 118, [hex('#3a2a2a'), hex('#4a3428'), hex('#3a2a24')]);
  // la ventana desenfocada (luz de día), la estantería borrosa y la pared tranquila de la derecha
  for (let y = 6; y < 104; y++) for (let x = 0; x < 52; x++) { const d = Math.min(x, 52 - x, y - 6, 104 - y) / 10, arbol = Math.hypot(x - 18, y - 40) < 16, acera = y > 80, mu = Math.abs(x - 26) < 2 || Math.abs(y - 50) < 2;
    const c = mu ? hex('#6a5040') : arbol ? (di(x, y, 0.5) ? hex('#7aa868') : hex('#5a8a4e')) : acera ? hex('#c8c0b0') : hex('#d8e6f0'); R.pset(x, y, di(x, y, Math.min(1, d)) ? c : mz(c, hex('#4a3428'), 0.5)); }
  for (let y = 0; y < 118; y++) for (let x = 60; x < 262; x++) { const est = Math.floor(y / 32), yy = y % 32, col = Math.floor((x - 60) / 5);
    if (yy < 4) { R.pset(x, y, di(x, y, 0.5) ? hex('#6a4a30') : hex('#5a3c26')); continue; }
    const c = [K9.rojo, K9.oro, K9.azul, K9.verde, K9.morado, hex('#e8e0c8'), hex('#3a8a8a')][Math.floor(h9(col, est, 21) * 7)], alto = 10 + Math.floor(h9(col, est, 22) * 16);
    R.pset(x, y, yy > 31 - alto ? (di(x, y, 0.5 + ((x - 60) % 5) * 0.1) ? mz(c, hex('#3a2a24'), 0.45) : mz(c, hex('#3a2a24'), 0.6)) : mz(hex('#3a2a24'), K9.k, 0.2)); }
  for (let y = 0; y < 118; y++) for (let x = 262; x < 320; x++) R.pset(x, y, di(x, y, (x - 262) / 70) ? hex('#5a4434') : hex('#4a382c'));
  for (let y = 58; y < 104; y++) for (let x = 272; x < 312; x++) { const d = Math.min(x - 272, 312 - x, y - 58, 104 - y); const c = d < 3 ? hex('#a87a3a') : y < 86 ? hex('#d88a5a') : hex('#6a4a7a'); if (di(x, y, d < 2 ? 0.5 : 1)) R.pset(x, y, mz(c, hex('#4a382c'), 0.35)); }
  for (const [cx, cy, r] of [[90, 20, 9], [150, 10, 7], [212, 26, 10], [120, 66, 6], [244, 70, 8], [30, 40, 7], [180, 96, 6]]) for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1 && (x < 270 || y > 46)) R.pset(x, y, mz(R.pget(x, y), hex('#fff0c0'), d > 0.8 ? 0.55 : 0.35)); }
  // el tablero de la mesa: vetas, juntas y el canto
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y - 118) / 15), veta = Math.abs(Math.sin(x * 0.045 + tabla * 2.1 + Math.sin(x * 0.013 + tabla) * 3)) < 0.08;
    R.pset(x, y, (y - 118) % 15 === 0 ? hex('#5a3418') : veta ? hex('#8a5428') : h9(x, y, 30) < 0.05 ? hex('#b07a40') : y < 124 ? hex('#c8904e') : hex('#a8703a')); }
  R.rect(0, 118, 319, 118, hex('#e0a868'));
  // la taza con el café, las gafas, los lápices, la planta y un punto de libro
  caja(22, 136, 42, 156, hex('#e8e0d0')); R.rect(22, 136, 42, 138, hex('#5a3418')); R.rect(43, 141, 46, 150, K9.k); R.rect(44, 142, 45, 149, hex('#e8e0d0')); R.rect(22, 136, 23, 156, K9.b); R.rect(20, 157, 44, 158, hex('#7a4a22'));
  for (const gx of [252, 268]) { R.disco(gx, 166, 6, K9.k); R.disco(gx, 166, 5, hex('#c8d8e8')); R.pset(gx - 2, 164, K9.b); } R.rect(258, 165, 262, 165, K9.k);
  for (let i = 0; i < 3; i++) { R.linea(56 + i * 6, 172, 84 + i * 6, 162, K9.k); R.linea(57 + i * 6, 172, 85 + i * 6, 162, [K9.oro, K9.rojo, K9.azul][i]); R.pset(85 + i * 6, 161, hex('#e8a0a0')); }
  caja(282, 122, 300, 138, hex('#c86a3a')); R.rect(280, 120, 302, 122, hex('#a8582a')); for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.4; R.linea(291, 119, 291 + Math.round(Math.cos(a) * 10), 119 + Math.round(Math.sin(a) * 10), k % 2 ? K9.verde : K9.verdeS); }
  R.rect(140, 160, 146, 178, K9.rojo); R.poligono([[140, 178], [143, 175], [146, 178]], hex('#a8703a'));
};
const p4 = (t) => {
  fijo('mesa', fondoMesa);
  // gente borrosa que pasa por la tienda, detrás
  for (let k = 0; k < 3; k++) { const x = ((k * 140 + t * (k % 2 ? -22 : 18)) % 460 + 460) % 460 - 70, c = [hex('#6a4a7a'), hex('#4a6a8a'), hex('#8a5a3a')][k];
    for (let y = 40; y < 118; y++) for (let xx = Math.round(x) - 9; xx <= Math.round(x) + 9; xx++) { if (xx < 0 || xx > 260) continue; const d = y < 58 ? Math.hypot(xx - x, y - 50) / 7 : Math.abs(xx - x) / 10; if (d < 1 && di(xx, y, 0.6 - d * 0.3)) R.pset(xx, y, mz(R.pget(xx, y), c, 0.5)); } }
  // el vapor del café
  for (let k = 0; k < 6; k++) { const f = (t * 0.6 + k / 6) % 1, vx = 32 + Math.round(Math.sin(t * 2 + k * 1.7) * 2 + f * 2), vy = 134 - Math.round(f * 22); if (f < 0.85) R.pset(vx, vy, mz(R.pget(vx, vy), K9.b, 0.6 - f * 0.5)); }
  // la pila de la Balada (seis) y la del libro nuevo (doce, que caen uno a uno)
  const BAL = 6, NUEVO = 12, xb = 104, xn = 206, base = 160;
  for (let i = 0; i < BAL; i++) libroTumbado(xb + Math.round((h9(i, 1, 40) - 0.5) * 4), base - i * 7, 3);
  const topB = base - BAL * 7; portada(xb - 13, topB - 34, xb + 13, topB - 1, 2, t);
  const t0 = P4 + 0.15, dt = (DOBLE - 0.25 - t0) / NUEVO; let n = 0;
  for (let i = 0; i < NUEVO; i++) { const ti = t0 + i * dt, u = tramo(t, ti, ti + 0.22); if (u <= 0) break; const yy = base - i * 7 - Math.round((1 - u) * 40); libroTumbado(xn + Math.round((h9(i, 2, 40) - 0.5) * 4), yy, 4); if (u >= 1) n = i + 1; }
  const topN = base - n * 7, flota = n < NUEVO && t > t0 ? -Math.round(tramo(t, t0 + n * dt, t0 + n * dt + 0.22) * 0) : 0;
  portada(xn - 26, topN - 34 + flota, xn, topN - 1 + flota, 4, t);
  // la línea de la Balada que cruza hasta la pila nueva: la nueva llega al doble
  if (t > DOBLE - 0.2) { for (let x = xb + 30; x < xn + 32; x += 3) { R.pset(x, topB, K9.b); R.pset(x + 1, topB, K9.b); }
    const e = tramo(t, DOBLE, DOBLE + 0.35), cx = 262, yy = Math.round(lerp(124, 100, e));
    R.rect(250, 76, 252, base, K9.k); R.rect(251, 77, 251, base - 1, K9.oroL); for (const yb of [base, topB, topN]) R.rect(246, yb, 256, yb, K9.k);
    if (e > 0) { R.icono('X', cx - 6, yy - 14, K9.oro, K9.k, 2); R.numero('2', cx + 16, yy + 2, { tam: 16, centro: true }); } }
  // el pan, subido a la pila nueva: sube con ella, se agarra, y en «Ballad» señala la pila pequeña y se ríe
  const subiendo = t > t0 && n < NUEVO, py = topN - 1 + (subiendo && Math.sin(t * 20) > 0 ? -1 : 0);
  T.pan(R, xn + 14, py, t, { s: 2, dir: -1, expresion: t > BALADA + 0.3 ? 'risa' : subiendo ? 'susto' : 'normal', señala: t > BALADA - 0.1 && t < BALADA + 1.4 ? [xb + 10, topB - 18] : null, saluda: t > DOBLE && t < BALADA - 0.1 });
};
const efectos = [[0.9, 'papel'], [CIEN, 'pop'], [COPIES + 0.05, 'brillo'], [TRAILER, 'golpecito'], [N109 + 0.05, 'brillo'], [P3 + 0.3, 'campana'], [P3 + 0.8, 'coche'], [MEDIO, 'tic'], [PRIMERA, 'sello'], [P4 + 0.3, 'papel'], [DOBLE, 'brillo'], [BALADA + 0.3, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: null });
''')

E['jh-maraton'] = ('La maratón', '''// JH-MARATON (frases 53–54), hoy, sin barra. Tres planos:
// 1. (hoy 'cuarto' general, tarde, reloj a las seis) Atom llega volando y se acomoda en el sofá junto al pan; el pan se
//    tapa con la manta en «one evening»; en «Watch» Atom enciende la tele con una chispa (el sinsajo) y en «Catching Fire»
//    cambia a la llama; el pan aplaude (corta en «That's where»);
// 2. (fondo local: la tele de cerca, desde detrás del sofá) en la pantalla, Haymitch levanta la petaca en «Haymitch»; la
//    cúpula del campo de fuerza tiembla en «force field» y el pan da un salto; los vencedores suben por sus plataformas en
//    «returning victors» (corta en «If you have another»);
// 3. (fondo local: de noche, de lado) la tele con la tercera portada, la serpiente y el pájaro, que se mueven; el pan se
//    va comiendo a sí mismo a mordiscos (gag 8) hasta quedarse en la mitad; en «song» salen notas de la tele; Atom se da
//    cuenta y se sorprende; el pan se ríe con migas.''', PIEZAS + r'''
const a = (f) => en('tarde', f), b = (f) => en('otra', f);
const P2 = a(0.5029), P3 = b(0);
const TARDE = a(0.0737), WATCH = a(0.2049), HG = a(0.2486), CF = a(0.3407), HAY = a(0.5812), FF = a(0.7101), VICT = a(0.8678);
const OTRA = b(0.0751), BALLAD = b(0.325), SNAKES = b(0.5373), SONG = b(0.8974);

// 1 · el cuarto de la fan por la tarde: el sofá, la manta y la tele que se enciende
const p1 = (t) => {
  const tele = t < WATCH + 0.15 ? null : t < CF ? 1 : 2;
  const o = { encuadre: 'cuarto', luz: 'tarde', hora: 18, mapa: 12, linea: 4, pistas: 3, hilo: 1 }; if (tele) o.tele = tele;
  T.hoy(R, t, o);
  // la chispa de Atom a la tele en «Watch» y en «Catching Fire»
  for (const tc of [WATCH, CF]) { const f = tramo(t, tc - 0.05, tc + 0.3); if (f > 0 && f < 1) { for (let i = 0; i <= 10; i++) { const u = i / 10; if (u > f + 0.2 || u < f - 0.4) continue; const x = Math.round(lerp(184, 262, u)), y = Math.round(lerp(108, 104, u) - Math.sin(u * Math.PI) * 14 + (i % 2 ? 1 : -1)); R.pset(x, y, K9.b); R.pset(x + 1, y, hex('#9ae8ff')); } } }
  const fl = tramo(t, WATCH + 0.1, WATCH + 0.35); if (fl > 0 && fl < 1) { R.recorte([224, 92, 300, 120]); for (let y = 92; y <= 120; y++) for (let x = 224; x <= 300; x++) if (((x + y) & 1) === 0) R.pset(x, y, K9.b); R.recorte(null); }
  // el pan: se arropa con la manta en «one evening», mira la tele y aplaude en «Catching Fire»
  const arropa = tramo(t, TARDE - 0.2, TARDE + 0.5);
  T.pan(R, 140, 126, t, { dir: 1, expresion: t > CF && t < CF + 1.2 ? 'risa' : 'normal', saluda: t > CF && t < CF + 1.2, señala: t > HG && t < CF - 0.1 ? [262, 104] : null });
  // Atom llega volando desde la ventana y se acomoda junto al pan
  const v = tramo(t, 0.15, 1.2), ax = Math.round(lerp(40, 176, v)), ay = Math.round(lerp(60, 114, v) - Math.sin(v * Math.PI) * 18 + Math.sin(t * 2.6));
  const salto = t > CF && t < CF + 0.6 ? Math.round(Math.sin(tramo(t, CF, CF + 0.6) * Math.PI) * 8) : 0;
  R.atomo(ax, ay - salto, t, { r: 10, energia: (v > 0 && v < 1) || Math.abs(t - WATCH) < 0.4 || Math.abs(t - CF) < 0.4 ? 0.8 : 0.3 });
  // la manta de punto que sube y tapa a los dos
  const my = Math.round(lerp(133, 122, arropa)); R.poligono([[128, my + 1], [196, my - 1], [198, 133], [126, 133]], K9.k);
  R.poligono([[129, my + 2], [195, my], [197, 132], [127, 132]], (x, y) => ((x + (y >> 1)) % 4 === 0) ? hex('#a83a4a') : (y % 3 === 0) ? hex('#d86a6a') : hex('#c8505a'));
  for (let x = 130; x < 196; x += 4) R.pset(x, Math.round(lerp(my + 2, my, (x - 129) / 66)), hex('#f0a0a0'));
  T.hoyDelante(R, t, o);
};
// 2 · la tele de cerca, por encima del respaldo del sofá
const PANT = [64, 26, 256, 128];
const fondoTele = () => {
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const raya = (x % 12) < 6, rombo = ((x + 3) % 12 === 0 && y % 8 === 4); const base = raya ? hex('#5a4a6a') : hex('#52425f');
    R.pset(x, y, rombo ? hex('#7a6a8a') : mz(base, hex('#f0a060'), Math.max(0, 0.35 - x / 360))); }
  R.rect(0, 134, 319, 136, hex('#3a2a3a'));
  // la lámpara de pie de la izquierda
  R.rect(27, 70, 28, 150, K9.k); R.poligono([[16, 70], [20, 50], [36, 50], [40, 70]], K9.k); R.poligono([[17, 69], [21, 51], [35, 51], [39, 69]], hex('#f8d890')); R.rect(17, 66, 39, 69, hex('#e8b860'));
  // la balda de la derecha con figuritas y libros (por debajo de la zona de Atom)
  R.rect(268, 76, 318, 79, hex('#6a4a2a')); R.rect(268, 112, 318, 115, hex('#6a4a2a'));
  for (let i = 0; i < 5; i++) T.libroJH(R, 276 + i * 6, 112, i, { w: 5, alto: 14 + (i % 2) * 2 });
  T.PIEZAS_JH.sinsajo(R, 306, 76, { s: 1 }); R.disco(282, 72, 3, K9.k); R.disco(282, 72, 2, hex('#c86a3a')); R.rect(280, 72, 284, 75, hex('#c86a3a'));
  // la tele: marco negro con su brillo y el pie
  R.rect(56, 18, 264, 136, K9.k); R.rect(58, 20, 262, 134, hex('#24242c')); R.rect(58, 20, 262, 20, hex('#4a4a56')); R.pset(160, 132, hex('#3ae84a'));
  // el mueble de la tele con el aparato, las cajas y una planta
  R.rect(60, 136, 260, 156, K9.k); for (let y = 137; y < 156; y++) for (let x = 61; x < 260; x++) R.pset(x, y, (x - 61) % 50 === 0 ? hex('#4a2e1a') : Math.abs(Math.sin(x * 0.07 + y * 0.4)) < 0.06 ? hex('#7a4a2a') : hex('#8a5a32'));
};
const pantalla = (t) => {
  const [x0, y0, x1, y1] = PANT; R.recorte(PANT);
  if (t < HAY - 0.6 || (t >= HAY - 0.6 && t < FF - 0.35)) {
    // Haymitch en el tren: la ventanilla con el campo que pasa, y en «Haymitch» levanta la petaca
    degr(x0, y0, x1, y1, [hex('#4a3a5a'), hex('#8a5a5a'), hex('#c87a5a')]);
    for (let k = 0; k < 3; k++) { const wx = x0 + 14 + k * 64; R.rect(wx, y0 + 12, wx + 44, y0 + 56, K9.k); degr(wx + 1, y0 + 13, wx + 43, y0 + 55, [hex('#f8b070'), hex('#f8d8a0')]);
      for (let i = 0; i < 6; i++) { const px = wx + 1 + ((i * 17 - t * 60) % 43 + 43) % 43; R.rect(px, y0 + 42, px + 1, y0 + 55, hex('#3a4a3a')); R.disco(px, y0 + 40, 3, hex('#4a6a4a')); } }
    R.rect(x0, y0 + 76, x1, y1, hex('#5a2a2a')); for (let x = x0; x <= x1; x += 6) R.rect(x, y0 + 76, x, y1, hex('#4a2020'));
    const sube = t > HAY - 0.1 && t < FF - 0.5;
    const r = actorEn(EL.haymitchViejo, 152, y0 + 92, t, { dir: -1, sostiene: sube ? [150, y0 + 66] : false, sonrisa: sube, habla: !sube && Math.sin(t * 6) > 0.3 }, PANT);
    if (sube && r.mano) T.PIEZAS_JH.petaca(R, r.mano[0], r.mano[1] + 2, { s: 1 });
    R.rect(x0, y0 + 90, x1, y0 + 92, hex('#3a1a1a'));
  } else if (t < VICT - 0.2) {
    // la arena y la cúpula del campo de fuerza, que tiembla en «force field»
    degr(x0, y0, x1, y1, [hex('#5ab0d8'), hex('#a8d8e0'), hex('#d8e8b0')]);
    for (let i = 0; i < 14; i++) { const px = x0 + i * 14 + (i % 3) * 3, ph = 30 + (i * 37) % 26; R.poligono([[px - 8, y1], [px, y1 - ph], [px + 8, y1]], i % 2 ? hex('#2a6a3a') : hex('#3a7a4a')); }
    R.rect(x0, y1 - 10, x1, y1, hex('#2a5a32'));
    const tiembla = tramo(t, FF, FF + 0.9), cx = 160, cy = y1 + 20, rr = 118;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const dd = Math.hypot(x - cx, (y - cy) / 0.85); if (dd < rr) { const hx = ((x + Math.floor(y / 6) * 3) % 12 === 0) || (y % 6 === 0 && (x % 12) < 7); if (hx) R.pset(x, y, mz(R.pget(x, y), hex('#e0f8ff'), 0.45 + (tiembla > 0 && tiembla < 1 ? 0.45 * (1 - tiembla) : 0))); else if (di(x, y, 0.15)) R.pset(x, y, mz(R.pget(x, y), hex('#c8f0ff'), 0.3)); } }
    for (let k = 0; k < 220; k++) { const an = Math.PI + (k / 220) * Math.PI, r0 = rr + Math.sin(an * 9 + t * 3) * 1.5 + (tiembla > 0 && tiembla < 1 ? Math.sin(an * 30 - t * 40) * 3 * (1 - tiembla) : 0);
      const px = cx + Math.round(Math.cos(an) * r0), py = cy + Math.round(Math.sin(an) * r0 * 0.85); R.pset(px, py, K9.b); R.pset(px, py + 1, hex('#c8f0ff')); R.pset(px, py + 2, hex('#8ad8f0')); }
    for (let j = 1; j < 5; j++) for (let k = 0; k < 60; k++) { const an = Math.PI + (k / 60) * Math.PI; if ((k + j) % 3 === 0) R.pset(cx + Math.round(Math.cos(an) * rr * j / 5), cy + Math.round(Math.sin(an) * rr * 0.85 * (0.4 + j * 0.12)), mz(hex('#c8f0ff'), hex('#a8d8e0'), 0.4)); }
    if (tiembla > 0 && tiembla < 1) { const gx = 210, gy = 48; for (let i = 0; i < 8; i++) R.linea(gx, gy, gx + Math.round(Math.cos(i * 0.8) * 12 * tiembla), gy + Math.round(Math.sin(i * 0.8) * 10 * tiembla), K9.b); }
  } else {
    // los vencedores que vuelven: suben por sus plataformas en un escenario con focos
    degr(x0, y0, x1, y1, [hex('#1a1430'), hex('#3a2050'), hex('#6a3060')]);
    for (let k = 0; k < 4; k++) { const fx = x0 + 30 + k * 46 + Math.round(Math.sin(t * 1.5 + k) * 10); R.poligono([[fx - 3, y0], [fx + 3, y0], [fx + 20, y1], [fx - 20, y1]], (x, y) => di(x, y, 0.25) ? hex('#f8e8c0') : null); }
    R.rect(x0, y1 - 14, x1, y1, hex('#2a1a3a')); for (let x = x0; x <= x1; x += 8) R.pset(x, y1 - 13, Math.sin(t * 6 + x) > 0 ? K9.oro : hex('#8a5a2a'));
    const QUIEN = [EL.haymitchViejo, EL.mags, EL.beetee, EL.wiress];
    QUIEN.forEach((def, k) => { const u = tramo(t, VICT - 0.1 + k * 0.25, VICT + 0.5 + k * 0.25), x = 84 + k * 40, s = y1 - 14 + Math.round((1 - u) * 30);
      R.rect(x - 2, s, x + 16, s + 2, K9.oro); actorEn(def, x, s, t, { dir: k < 2 ? 1 : -1, sonrisa: u >= 1, brazos: u >= 1 && k === 0 && Math.sin(t * 4) > 0 }, [x0, y0, x1, y1 - 14]); });
  }
  // el zapeo entre una cosa y otra
  for (const tz of [FF - 0.35, VICT - 0.2]) if (t > tz - 0.08 && t < tz + 0.12) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, h9(x, y, Math.floor(t * 30)) < 0.5 ? hex('#d0d0d8') : hex('#3a3a42'));
  // líneas de la pantalla y el reflejo
  for (let y = y0; y <= y1; y += 3) for (let x = x0; x <= x1; x += 2) R.pset(x, y, mz(R.pget(x, y), K9.k, 0.12));
  for (let i = 0; i < 70; i++) { const x = x0 + 120 + i, y = y0 + i; if (x <= x1 && (i & 1)) R.pset(x, y, mz(R.pget(x, y), K9.b, 0.15)); }
  R.recorte(null);
};
// el pan visto por detrás: la corteza con sus cortes, asomando por el respaldo
const panEspalda = (cx, cy, t) => { cx = Math.round(cx); cy = Math.round(cy);
  for (let y = cy - 11; y <= cy + 6; y++) for (let x = cx - 14; x <= cx + 14; x++) { const d = Math.hypot((x - cx) / 14, (y - cy) / 11); if (d > 1.05) continue;
    R.pset(x, y, d > 0.93 ? K9.k : (Math.abs((x - cx) + (y - cy) * 0.8 - 6) < 1 || Math.abs((x - cx) + (y - cy) * 0.8 + 4) < 1) && d < 0.8 ? hex('#c88a3a') : y < cy - 6 ? hex('#f0c070') : hex('#e0a050')); }
  R.pset(cx - 5, cy - 8, hex('#fff0c0')); R.pset(cx - 4, cy - 9, hex('#fff0c0')); };
const p2 = (t) => {
  fijo('tele', fondoTele);
  // la luz de la lámpara que respira y el resplandor de la pantalla en la pared
  for (let k = 0; k < 5; k++) { const f = 0.5 + 0.5 * Math.sin(t * 2 + k); R.pset(22 + k * 3, 72 + (k % 2), mz(hex('#f8d890'), K9.b, f * 0.4)); }
  pantalla(t);
  const glow = t < FF - 0.35 ? hex('#c87a5a') : t < VICT - 0.2 ? hex('#a8d8e0') : hex('#8a4a8a');
  for (const [x0, x1] of [[40, 55], [265, 280]]) for (let y = 30; y < 130; y++) for (let x = x0; x <= x1; x++) { const d = x0 < 100 ? (55 - x) / 15 : (x - 265) / 15; if (di(x, y, 0.4 * (1 - d))) R.pset(x, y, mz(R.pget(x, y), glow, 0.3)); }
  // detrás del sofá: el pan (salta con la cúpula) y Atom
  const brinco = tramo(t, FF, FF + 0.5), sb = brinco > 0 && brinco < 1 ? Math.round(Math.sin(brinco * Math.PI) * 10) : 0, bota = t > VICT + 0.4 ? Math.round(Math.abs(Math.sin(t * 7)) * 3) : 0;
  panEspalda(112, 144 - sb - bota, t);
  if (sb > 4) R.icono('!', 128, 120 - sb, K9.oroL, K9.k, 2);
  R.atomo(216, 136 + Math.round(Math.sin(t * 2.4)), t, { r: 12, energia: Math.abs(t - FF) < 0.5 || t > VICT ? 0.7 : 0.3 });
  // el respaldo del sofá, por delante: terciopelo con capitoné
  R.rect(0, 144, 319, 144, K9.k);
  for (let y = 145; y < 180; y++) for (let x = 0; x < 320; x++) { const bx = (x + (Math.floor((y - 145) / 12) % 2) * 12) % 24, by = (y - 145) % 12, boton = bx === 12 && by === 6, pliegue = Math.abs(bx - 12) + Math.abs(by - 6) === 7;
    R.pset(x, y, boton ? hex('#0e2a30') : pliegue ? hex('#1a4048') : y < 149 ? hex('#3a7a84') : mz(hex('#2a5a64'), K9.k, (y - 149) / 80)); }
  R.rect(0, 145, 319, 145, hex('#5a9aa4'));
  // la mano de miga del pan, que asoma y aplaude a los vencedores
  if (t > VICT + 0.4) { const hy = 140 - bota; R.disco(98, hy, 3, K9.k); R.disco(98, hy, 2, hex('#f8e0b0')); R.disco(126, hy, 3, K9.k); R.disco(126, hy, 2, hex('#f8e0b0')); }
};
// 3 · de noche, de lado: la tercera portada y el pan que se come a sí mismo
const fondoNoche = () => {
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 10 < 5) ? hex('#1e2240') : hex('#1a1e3a'));
  // la ventana con la ciudad de noche, la luna y estrellas
  caja(150, 18, 250, 82, hex('#0e1430')); degr(150, 18, 250, 82, [hex('#0a1028'), hex('#1a2448'), hex('#2a3058')]);
  for (let k = 0; k < 18; k++) R.pset(152 + Math.floor(h9(k, 1, 50) * 96), 20 + Math.floor(h9(k, 2, 50) * 30), K9.b);
  R.disco(232, 32, 7, hex('#f8f0d0')); R.disco(234, 30, 6, hex('#0e1430')); R.disco(232, 32, 7, hex('#f8f0d0')); R.disco(230, 30, 2, hex('#d8d0b0'));
  for (let x = 150, k = 0; x < 250; k++) { const w = 8 + Math.floor(h9(k, 3, 50) * 12), y = 50 + Math.floor(h9(k, 4, 50) * 20); R.rect(x, y, Math.min(250, x + w), 82, hex('#141a34')); for (let wy = y + 3; wy < 80; wy += 4) for (let wx = x + 2; wx < Math.min(249, x + w - 1); wx += 3) if (h9(wx, wy, 51) < 0.3) R.pset(wx, wy, hex('#f8d070')); x += w + 1; }
  R.rect(200, 18, 200, 82, K9.k); R.rect(150, 50, 250, 50, K9.k); R.rect(146, 83, 254, 86, hex('#3a3a5a'));
  for (const [cx0, cx1] of [[136, 152], [248, 264]]) for (let y = 12; y < 98; y++) for (let x = cx0; x <= cx1; x++) R.pset(x, y, ((x + Math.floor(y / 3)) % 5 === 0) ? hex('#2a1a3a') : hex('#3a2a4a'));
  // el reloj de pared: casi medianoche
  R.disco(278, 70, 10, K9.k); R.disco(278, 70, 9, hex('#e8e0c8')); for (let k = 0; k < 12; k++) R.pset(278 + Math.round(Math.cos(k * Math.PI / 6) * 7), 70 + Math.round(Math.sin(k * Math.PI / 6) * 7), K9.k);
  R.linea(278, 70, 277, 64, K9.k); R.linea(278, 70, 274, 66, K9.k);
  // el suelo de tarima con la alfombra
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y - 132) % 9 === 0 ? hex('#2a1a14') : ((x + (Math.floor((y - 132) / 9) % 2) * 30) % 60 === 0) ? hex('#2a1a14') : hex('#4a3020'));
  R.poligono([[100, 158], [310, 158], [320, 180], [90, 180]], hex('#5a2a3a')); for (let x = 104; x < 312; x += 8) R.rect(x, 166, x + 3, 167, hex('#8a4a5a'));
  // el mueble bajo y la tele de la izquierda
  R.rect(4, 114, 122, 150, K9.k); for (let y = 115; y < 150; y++) for (let x = 5; x < 122; x++) R.pset(x, y, (x - 5) % 39 === 0 ? hex('#2a1a12') : hex('#4a3020'));
  for (const dx of [20, 59, 98]) { R.rect(dx, 130, dx + 4, 131, hex('#c8a060')); } R.rect(8, 150, 12, 156, K9.k); R.rect(114, 150, 118, 156, K9.k);
  R.rect(6, 44, 120, 112, K9.k); R.rect(8, 46, 118, 110, hex('#202028')); R.rect(56, 112, 70, 114, K9.k);
  // el sofá, de frente, mirando a la tele
  R.rect(132, 92, 318, 160, K9.k); for (let y = 93; y < 132; y++) for (let x = 133; x < 318; x++) { const bx = (x - 133) % 30, b = bx === 15 && (y - 93) % 12 === 6; R.pset(x, y, b ? hex('#0e2a30') : y < 97 ? hex('#3a6a74') : hex('#2a5260')); }
  for (let y = 132; y < 160; y++) for (let x = 133; x < 318; x++) R.pset(x, y, y < 146 ? (y === 132 ? hex('#4a8a94') : hex('#2e5a66')) : hex('#1e3a44'));
  for (const [cx0, c] of [[146, hex('#c8a040')], [274, hex('#a84a6a')]]) { R.rect(cx0, 104, cx0 + 22, 130, K9.k); for (let y = 105; y < 130; y++) for (let x = cx0 + 1; x < cx0 + 22; x++) R.pset(x, y, ((x + y) % 6 === 0) ? mz(c, K9.k, 0.3) : y < 108 ? mz(c, K9.b, 0.25) : c); R.pset(cx0 + 11, 117, K9.k); }
  for (const ax of [124, 302]) { R.rect(ax, 108, ax + 17, 160, K9.k); R.rect(ax + 1, 109, ax + 16, 159, hex('#24505c')); R.rect(ax + 1, 109, ax + 16, 111, hex('#3a7a84')); }
  R.rect(140, 160, 144, 166, K9.k); R.rect(306, 160, 310, 166, K9.k);
  // el bol vacío y envoltorios en el suelo
  R.poligono([[122, 164], [150, 164], [146, 172], [126, 172]], K9.k); R.poligono([[123, 165], [149, 165], [145, 171], [127, 171]], hex('#c8303a')); for (let x = 125; x < 148; x += 4) R.pset(x, 165, K9.crema);
  for (const [x, y, c] of [[160, 172, K9.oro], [180, 176, hex('#3a8ab8')], [102, 170, K9.crema], [108, 174, K9.crema]]) { R.rect(x, y, x + 3, y + 1, c); R.pset(x + 4, y, mz(c, K9.k, 0.3)); }
};
const p3 = (t) => {
  fijo('noche', fondoNoche);
  // la tele: la tercera portada, con la serpiente que se mece y el pájaro que aletea
  portada(10, 48, 116, 108, 2, t);
  R.recorte([8, 46, 118, 110]); for (let y = 46; y <= 110; y += 3) for (let x = 8; x <= 118; x += 2) R.pset(x, y, mz(R.pget(x, y), K9.k, 0.15)); R.recorte(null);
  // el reflejo verdoso de la tele, que parpadea, sobre el sofá y el suelo
  const fl = 0.75 + 0.25 * Math.sin(t * 9) * Math.sin(t * 2.3), verde = hex('#6ad8a8');
  for (let y = 60; y < 180; y++) for (let x = 120; x < 320; x++) { const d = Math.hypot(x - 116, (y - 80) * 1.4) / 230, a = (1 - d) * 0.32 * fl; if (a > 0.02 && di(x, y, a * 2.4)) R.pset(x, y, mz(R.pget(x, y), verde, 0.35)); }
  // el gato duerme en el brazo del sofá
  { const br = Math.sin(t * 2) > 0 ? 1 : 0; R.rect(300, 101 - br, 318, 108, K9.k); R.rect(301, 102 - br, 317, 107, hex('#e89a4a')); R.rect(311, 98, 317, 103, K9.k); R.rect(312, 99, 316, 102, hex('#e89a4a')); R.pset(312, 97, K9.k); R.pset(316, 97, K9.k); R.rect(304, 104, 310, 104, hex('#c87a2a')); }
  // Atom, sentado a la derecha; se da cuenta del mordisco y se sorprende
  const ve = t > SONG + 0.5;
  R.atomo(240, 118 + Math.round(Math.sin(t * 2.2)), t, { r: 10, energia: ve ? 0.9 : 0.3 });
  if (ve) R.icono('!', 252, 90, K9.oroL, K9.k, 2);
  // el pan, s 2: mordisco a mordisco (en «another», en «Ballad» y en «snakes») se queda en la mitad
  const mord = [OTRA, BALLAD, SNAKES], lleno = 1 - mord.reduce((acc, m) => acc + tramo(t, m, m + 0.3) * (0.5 / 3), 0), masca = mord.some((m) => t > m && t < m + 0.6);
  const rp = T.pan(R, 178, 132, t, { s: 2, dir: -1, lleno, expresion: ve ? 'risa' : 'normal', señala: t > SNAKES + 0.7 && t < SONG ? [116, 78] : null });
  if (masca) for (let k = 0; k < 4; k++) { const u = ((t * 2 + k / 4) % 1); R.pset(166 + k * 3, 120 + Math.round(u * 14), hex('#f0c070')); }
  // la manta de punto sobre las piernas
  R.poligono([[150, 136], [272, 133], [276, 154], [146, 156]], K9.k);
  R.poligono([[151, 137], [271, 134], [275, 153], [147, 155]], (x, y) => ((x + (y >> 1)) % 4 === 0) ? hex('#6a2a3a') : (y % 3 === 0) ? hex('#9a4a5a') : hex('#8a3a4a'));
  // las notas de la canción, que salen de la tele en «song»
  if (t > SONG - 0.1) for (let k = 0; k < 5; k++) { const u = ((t - SONG + 0.1) * 0.5 + k * 0.2); if (u > 1 || u < 0) continue; nota(118 + u * 150, 70 - Math.sin(u * 6 + k) * 8 - k * 4, k % 2 ? hex('#a8f0c8') : K9.oroL); }
};
const efectos = [[0.3, 'whoosh'], [TARDE, 'tela'], [WATCH, 'interruptor'], [CF, 'interruptor'], [CF + 0.1, 'palmada'], [HAY + 0.05, 'burbujas'], [FF, 'zumbido'], [VICT + 0.2, 'publico'], [OTRA, 'masca'], [BALLAD, 'masca'], [SNAKES, 'masca'], [SONG + 0.5, 'boing']].filter(([, n]) => n !== 'tela');
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: null });
''')

E['jh-lista'] = ('La lista', '''// JH-LISTA (frases 55–56), hoy, sin barra. Dos planos:
// 1. (fondo local: la estantería de las películas y el escritorio de la fan) las cajas en orden con su número; la lista
//    tiene tres casillas marcadas; en «Mockingjay» la cuarta caja se ilumina y Atom va volando a la lista y traza el visto
//    con una estela de chispas; luego las figuritas de Haymitch, Plutarch y Snow saltan cada una en su nombre (corta en la
//    pausa antes de «And save»);
// 2. (fondo local: una butaca del cine de cerca) el libro nuevo, atado con un lazo rojo y una nota (película → libro), en
//    la butaca; en «after the movie» se encienden las luces de la sala; el pan llega por el reposabrazos, tira del lazo y
//    del libro salen luz y «?» en «everything I didn't tell you»; en «waiting» el lazo se aprieta con un destello y el pan
//    da un respingo.''', PIEZAS + r'''
const a = (f) => en('sinsajo', f), b = (f) => en('libro', f);
const P2 = a(1.083);
const MJ = a(0.2899), FIN = a(0.5797), HAY = a(0.663), PLU = a(0.8196), SNOW = a(0.8996);
const AFTER = b(0.1975), MOVIE = b(0.2723), EVERY = b(0.5264), TELL = b(0.7133), WAIT = b(0.889);

// 1 · la estantería y la lista
const FILAS = [124, 137, 150, 163];
const fondoEstante = () => {
  // la pared de papel pintado, con la esquina de arriba a la derecha tranquila
  for (let y = 0; y < 108; y++) for (let x = 0; x < 320; x++) { const pun = (x % 8 === 4 && y % 8 === 4) || (x % 8 === 0 && y % 8 === 0); R.pset(x, y, pun && !(x > 270 && y < 50) ? hex('#d8c098') : mz(hex('#ead8b0'), hex('#fff0d0'), Math.max(0, 0.4 - Math.hypot(x - 296, y - 70) / 200))); }
  // la balda alta con libros pequeños y una planta colgante
  R.rect(8, 40, 256, 44, hex('#7a4a28')); R.rect(8, 40, 256, 40, hex('#a8703a')); R.rect(8, 45, 256, 45, hex('#c8a878'));
  for (let i = 0; i < 26; i++) { const x = 12 + i * 6 + (i > 12 ? 30 : 0), al = 12 + Math.floor(h9(i, 1, 60) * 6); R.rect(x, 39 - al, x + 4, 39, K9.k); R.rect(x + 1, 40 - al, x + 3, 39, [K9.rojo, K9.azul, K9.verde, K9.oro, K9.morado, hex('#3ab0b0')][i % 6]); R.pset(x + 1, 42 - al, K9.oroL); }
  R.disco(108, 32, 6, hex('#c86a3a')); R.rect(102, 32, 114, 39, hex('#c86a3a')); for (let k = 0; k < 5; k++) R.linea(108, 26, 100 + k * 4, 18 + (k % 2) * 3, K9.verde);
  // la balda de las películas: madera con vetas y el canto
  R.rect(0, 96, 319, 104, K9.k); for (let y = 97; y < 104; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 97 ? hex('#c8904e') : Math.abs(Math.sin(x * 0.05 + y)) < 0.1 ? hex('#7a4a22') : hex('#9a6234'));
  for (const bx of [30, 290]) { R.poligono([[bx - 3, 104], [bx + 3, 104], [bx, 112]], K9.k); }
  // las cajas de las películas en orden, con su etiqueta de número
  [0, 1, 2, 3].forEach((k, i) => { const x0 = 16 + i * 52; portada(x0, 50, x0 + 38, 95, k, 0); R.rect(x0 + 39, 51, x0 + 41, 95, mz(PORT[k][1], K9.k, 0.4)); caja(x0 + 14, 99, x0 + 24, 107, K9.crema); R.numero(String(i + 1), x0 + 19, 106, { tam: 8, centro: true }); });
  // el libro nuevo, aparte, apoyado al final, con una pegatina «?»
  R.poligono([[236, 95], [250, 52], [282, 58], [270, 95]], K9.k); portada(244, 58, 268, 94, 4, 0); R.icono('?', 250, 80, K9.b, K9.k);
  // el escritorio: el tablero con vetas
  for (let y = 108; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y - 108) / 18), veta = Math.abs(Math.sin(x * 0.04 + tabla * 1.7 + Math.sin(x * 0.011) * 2.5)) < 0.07; R.pset(x, y, (y - 108) % 18 === 0 ? hex('#6a3c1c') : veta ? hex('#8a5428') : y < 112 ? hex('#c8904e') : hex('#a8703a')); }
  // la libreta de espiral con la lista: casilla, portada pequeña y una raya de tinta en cada fila
  R.rect(38, 114, 178, 177, mz(hex('#6a3c1c'), K9.k, 0.3)); caja(36, 112, 176, 175, hex('#fbf6e8')); for (let y = 120; y < 175; y += 13) R.rect(37, y + 9, 175, y + 9, hex('#c8d8e8')); R.rect(48, 113, 48, 174, hex('#e8a0a0'));
  for (let x = 44; x < 172; x += 9) { R.disco(x, 112, 2, K9.k); R.pset(x, 111, K9.grisL); }
  FILAS.forEach((y, i) => { caja(54, y - 4, 62, y + 4, K9.b); portada(68, y - 5, 77, y + 5, [0, 1, 2, 3][i], 0);
    for (let x = 84; x < 164 - (i % 2) * 18; x++) R.pset(x, y + Math.round(Math.sin(x * 0.7 + i) * 1.4), hex('#3a4a8a')); });
  // a la derecha: la peana de las figuritas, el bote de lápices, la lámpara de mesa, notas adhesivas y una goma
  R.rect(186, 168, 268, 172, K9.k); R.rect(187, 168, 267, 171, hex('#3a3a4a')); R.rect(187, 168, 267, 168, hex('#6a6a7a'));
  caja(276, 128, 294, 160, hex('#3a8a8a')); for (let k = 0; k < 4; k++) { R.rect(279 + k * 4, 114 + k * 2, 280 + k * 4, 128, [K9.oro, K9.rojo, K9.azul, K9.verde][k]); R.pset(279 + k * 4, 113 + k * 2, hex('#e8c0a0')); }
  R.rect(300, 168, 316, 172, K9.k); R.rect(307, 96, 309, 168, hex('#4a4a56')); R.poligono([[296, 96], [302, 84], [314, 84], [318, 96]], K9.k); R.poligono([[297, 95], [303, 85], [313, 85], [317, 95]], hex('#2a6a5a'));
  for (const [x, y, c] of [[200, 120, hex('#f8e870')], [214, 124, hex('#f8a0c0')], [190, 132, hex('#a0e0f8')]]) { caja(x, y, x + 10, y + 10, c); R.rect(x + 2, y + 3, x + 8, y + 3, mz(c, K9.k, 0.3)); }
  caja(240, 150, 252, 156, hex('#f0a0b0')); R.rect(240, 150, 244, 156, hex('#3a6ab8'));
  caja(288, 52, 314, 84, K9.b); R.rect(288, 52, 314, 60, K9.rojo); R.disco(294, 52, 1, K9.k); R.disco(308, 52, 1, K9.k);
  R.numero('11', 301, 70, { tam: 8, centro: true }); R.numero('20', 301, 82, { tam: 8, centro: true }); R.rect(292, 72, 310, 72, K9.grisL);
};
const p1 = (t) => {
  fijo('estante', fondoEstante);
  // la luz de la lámpara sobre el escritorio y las motas que flotan
  for (let y = 98; y < 170; y++) for (let x = 250; x < 320; x++) { const d = Math.hypot(x - 306, (y - 96) * 0.6) / 70; if (d < 1 && di(x, y, (1 - d) * 0.35)) R.pset(x, y, mz(R.pget(x, y), hex('#fff0b0'), 0.3)); }
  for (let k = 0; k < 6; k++) { const u = (t * 0.07 + k / 6) % 1; R.pset(280 + Math.round(Math.sin(u * 9 + k) * 12), 160 - Math.round(u * 60), hex('#fff8d0')); }
  // la caja de Sinsajo se ilumina en «Mockingjay»
  const g = tramo(t, MJ - 0.1, MJ + 0.3) * (1 - tramo(t, FIN, FIN + 0.5));
  if (g > 0) { const x0 = 16 + 3 * 52; for (let k = 0; k < 3; k++) { R.rect(x0 - 2 - k, 48 - k, x0 + 40 + k, 48 - k, mz(K9.oroL, hex('#ead8b0'), k / 3 + (1 - g) * 0.6)); R.rect(x0 - 2 - k, 48 - k, x0 - 2 - k, 96, mz(K9.oroL, hex('#ead8b0'), k / 3 + (1 - g) * 0.6)); R.rect(x0 + 40 + k, 48 - k, x0 + 40 + k, 96, mz(K9.oroL, hex('#ead8b0'), k / 3 + (1 - g) * 0.6)); } }
  // las tres primeras casillas, ya marcadas; la cuarta se marca con la estela de Atom
  for (let i = 0; i < 3; i++) T.visto(R, 54, FILAS[i] - 4, 1);
  const tr = tramo(t, MJ + 0.45, MJ + 1.15), PTS = [[55, 160], [58, 165], [66, 154]];
  const pt = (u) => { const s = u * 2, i = Math.min(1, Math.floor(s)), f = s - i; return [lerp(PTS[i][0], PTS[i + 1][0], f), lerp(PTS[i][1], PTS[i + 1][1], f)]; };
  if (tr > 0) { for (let k = 0; k <= 40 * tr; k++) { const [x, y] = pt(k / 40); R.rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y) + 1, hex('#2a8a3a')); }
    if (tr < 1) for (let k = 0; k < 6; k++) { const [x, y] = pt(Math.max(0, tr - k * 0.04)); R.pset(Math.round(x + Math.sin(t * 30 + k) * 3), Math.round(y - 2 - k), k % 2 ? K9.oroL : hex('#9ae8ff')); } }
  // las figuritas: Haymitch, Plutarch y Snow saltan cada uno en su nombre
  [[EL.haymitchViejo, HAY, 192], [EL.plutarch, PLU, 218], [EL.snow, SNOW, 244]].forEach(([def, tn, x], i) => { const u = tramo(t, tn - 0.05, tn + 0.4), s = u > 0 && u < 1 ? Math.round(Math.sin(u * Math.PI) * 9) : 0, on = t > tn - 0.05;
    if (on) for (let k = 0; k < 3; k++) R.pset(x + 7 + (k - 1) * 6, 166 + (k % 2), mz(K9.oroL, hex('#3a3a4a'), 0.3));
    R.actor(def, x, 168, t, { dir: i === 2 ? -1 : 1, salto: s, sonrisa: on && i !== 2, enfado: on && i === 2 && t < tn + 1.2, quieto: !on }); });
  // Atom: espera junto a las cajas, va a la de Sinsajo, baja a la lista a marcar y luego pasa por las figuritas
  const KEY = [[0, 200, 72], [MJ - 0.1, 200, 72], [MJ + 0.35, 176, 70], [MJ + 0.5, 58, 150], [MJ + 1.15, 72, 150], [HAY - 0.35, 200, 140], [PLU - 0.35, 226, 140], [SNOW - 0.3, 252, 140], [E.duracion, 240, 120]];
  let ax = KEY[0][1], ay = KEY[0][2]; for (let i = 1; i < KEY.length; i++) if (t >= KEY[i - 1][0]) { const u = tramo(t, KEY[i - 1][0], KEY[i][0]), e = u * u * (3 - 2 * u); ax = lerp(KEY[i - 1][1], KEY[i][1], e); ay = lerp(KEY[i - 1][2], KEY[i][2], e); }
  if (tr > 0 && tr < 1) { const [x, y] = pt(tr); ax = x + 8; ay = y - 12; }
  R.atomo(Math.round(ax), Math.round(ay + Math.sin(t * 2.6) * 1.5), t, { r: 9, energia: (tr > 0 && tr < 1) || g > 0.5 ? 0.85 : 0.35 });
};
// 2 · la butaca del cine de cerca, con las luces apagadas y luego encendidas
const fondoButaca = (lit) => {
  const L = (c) => lit ? c : mz(c, hex('#141a34'), 0.62);
  degr(0, 0, 319, 70, [L(hex('#5a2a2a')), L(hex('#6a3430')), L(hex('#4a2224'))]);
  for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) if (((x + y * 2) % 14) === 0) R.pset(x, y, L(hex('#4a1e20')));
  // apliques de la pared (encendidos o apagados) y la salida verde
  for (const ax of [40, 140, 240]) { R.rect(ax - 4, 18, ax + 4, 28, K9.k); R.rect(ax - 3, 19, ax + 3, 27, lit ? hex('#fff0c0') : hex('#5a4a40')); if (lit) for (let r = 5; r < 16; r++) for (let k = 0; k < 24; k++) { const an = k / 24 * Math.PI * 2, x = ax + Math.round(Math.cos(an) * r), y = 23 + Math.round(Math.sin(an) * r * 0.8); if (di(x, y, 0.5 - r / 32) && y > 14) R.pset(x, y, mz(R.pget(x, y), hex('#fff0c0'), 0.4)); } }
  caja(4, 20, 16, 28, hex('#2a9a4a')); R.rect(7, 22, 9, 26, K9.b); R.rect(10, 24, 13, 24, K9.b);
  // filas de atrás: respaldos que suben, cada vez más pequeños
  for (let f = 0; f < 3; f++) { const y = 54 - f * 14, w = 36 - f * 6; for (let x = -10 + (f % 2) * w / 2; x < 330; x += w + 4) { R.disco(Math.round(x + w / 2), y, Math.round(w / 2), K9.k); R.rect(Math.round(x), y, Math.round(x + w), y + 10, K9.k); R.disco(Math.round(x + w / 2), y, Math.round(w / 2) - 1, L(hex('#a82a34'))); R.rect(Math.round(x + 1), y, Math.round(x + w - 1), y + 9, L(hex('#a82a34'))); R.rect(Math.round(x + 2), y - Math.round(w / 2) + 3, Math.round(x + w - 2), y - Math.round(w / 2) + 3, L(hex('#d84a50'))); } }
  // nuestra fila: tres butacas (la del centro entera)
  const butaca = (x0, x1) => { const cx = (x0 + x1) / 2, w = x1 - x0;
    R.disco(Math.round(cx), 72, Math.round(w / 2), K9.k); R.rect(x0, 72, x1, 128, K9.k);
    for (let y = 72 - Math.round(w / 2) + 1; y < 128; y++) for (let x = x0 + 1; x < x1; x++) { if (y < 72 && Math.hypot(x - cx, y - 72) > w / 2 - 1) continue; const cos = Math.round((x - x0) / (w / 5)) * (w / 5) + x0, plie = Math.abs(x - cos) < 1;
      R.pset(x, y, plie ? L(hex('#7a1a24')) : x < x0 + 6 ? L(hex('#d84a50')) : x > x1 - 6 ? L(hex('#8a1e28')) : L(hex('#b82e38'))); }
    R.rect(x0 - 2, 120, x1 + 2, 148, K9.k); for (let y = 121; y < 148; y++) for (let x = x0 - 1; x <= x1 + 1; x++) R.pset(x, y, y < 124 ? L(hex('#e05a60')) : y < 136 ? L(hex('#c03440')) : L(hex('#8a1e28')));
    R.rect(x0 + 4, 136, x1 - 4, 136, L(hex('#6a141c'))); };
  butaca(-60, 64); butaca(98, 222); butaca(256, 380);
  for (const ax of [68, 228]) { R.rect(ax, 108, ax + 24, 150, K9.k); for (let y = 109; y < 150; y++) for (let x = ax + 1; x < ax + 24; x++) R.pset(x, y, x < ax + 4 ? L(hex('#a82a34')) : x > ax + 20 ? L(hex('#5a1018')) : L(hex('#8a1e28')));
    R.rect(ax - 2, 102, ax + 26, 109, K9.k); R.rect(ax - 1, 103, ax + 25, 108, L(hex('#4a2a22'))); R.rect(ax - 1, 103, ax + 25, 103, L(hex('#8a5a40'))); R.disco(ax + 12, 105, 4, K9.k); R.disco(ax + 12, 105, 3, L(hex('#2a1810'))); R.pset(ax + 10, 104, L(hex('#8a7a70'))); }
  // la moqueta con rombos, las luces del pasillo y palomitas por el suelo
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const r = Math.abs(((x + y) % 16) - 8) + Math.abs(((x - y + 320) % 16) - 8); R.pset(x, y, r === 8 ? L(hex('#7a4a3a')) : r === 0 ? L(hex('#a87a3a')) : L(hex('#4a1a2a'))); }
  for (let x = 10; x < 320; x += 40) { R.rect(x, 172, x + 4, 174, K9.k); R.rect(x + 1, 173, x + 3, 173, hex('#f8b040')); }
  for (let k = 0; k < (lit ? 18 : 8); k++) { const x = Math.floor(h9(k, 1, 70) * 310), y = 152 + Math.floor(h9(k, 2, 70) * 24); R.rect(x, y, x + 1, y + 1, L(K9.crema)); R.pset(x + 1, y, L(K9.b)); }
  caja(260, 162, 274, 168, L(hex('#e8d8b0'))); R.rect(262, 165, 272, 165, L(hex('#c8303a')));
};
const p2 = (t) => {
  const luz = tramo(t, AFTER, MOVIE + 0.3);
  fijo('butacaN', () => fondoButaca(false));
  if (luz > 0) { if (!FIJOS.butacaL) { const bb = R.nuevo(), prev = R.usar(bb); fondoButaca(true); R.usar(prev); FIJOS.butacaL = bb; }
    const L = FIJOS.butacaL; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (h9(x, y, 77) < luz) R.pset(x, y, L[y * 320 + x]); }
  // a oscuras: la luz de la pantalla que parpadea en todo; la linterna del acomodador barre el suelo
  if (luz < 1) { const f = (1 - luz) * (0.12 + 0.06 * Math.sin(t * 7)); for (let y = 0; y < 180; y += 1) for (let x = (y & 1); x < 320; x += 2) R.pset(x, y, mz(R.pget(x, y), hex('#8ab0f0'), f));
    const lx = 40 + Math.round(Math.sin(t * 1.3) * 30); for (let y = 160; y < 178; y++) for (let x = lx - 10; x < lx + 10; x++) if (Math.hypot(x - lx, (y - 169) * 2) < 10 && di(x, y, 0.5)) R.pset(x, y, mz(R.pget(x, y), hex('#fff0b0'), (1 - luz) * 0.6)); }
  // con la luz: la gente que se va por las filas de atrás
  if (luz > 0.5) for (let k = 0; k < 4; k++) { const x = ((k * 90 + t * 16) % 380) - 30; mini(x, 34 + (k % 2) * 14, k + 2, t, true); }
  // el libro apoyado en el respaldo, con el lazo rojo, el moño y la nota (película → libro)
  const tira = t > EVERY - 0.4 && t < WAIT ? Math.round(Math.sin(t * 16)) : 0, aprieta = tramo(t, WAIT, WAIT + 0.3);
  R.poligono([[138, 126], [142, 70], [184, 70], [184, 126]], K9.k); portada(142, 72, 182, 124, 4, t);
  R.rect(184, 72, 186, 124, hex('#e8e0c8')); for (let y = 74; y < 124; y += 2) R.pset(185, y, hex('#c8b898'));
  // la luz y los «?» que se escapan de las páginas
  const asoma = tramo(t, EVERY, TELL + 0.2) * (1 - aprieta);
  if (asoma > 0) { for (let k = 0; k < 10; k++) { const y = 76 + k * 5, l = Math.round(asoma * (6 + (k % 3) * 4)); R.linea(187, y, 187 + l, y - Math.round(l * 0.3), mz(K9.oroL, R.pget(188, y), 0.3)); }
    for (let k = 0; k < 3; k++) { const u = (t * 0.8 + k / 3) % 1; if (asoma > 0.3) R.icono('?', 192 + k * 9 + Math.round(u * 10), 92 - Math.round(u * 30) - k * 4, k === 1 ? K9.oroL : K9.b, K9.k); } }
  R.rect(158 + tira, 72, 162 + tira, 124, K9.k); R.rect(159 + tira, 72, 161 + tira, 124, K9.rojo); R.rect(142, 96, 182, 100, K9.k); R.rect(142, 97, 182, 99, K9.rojo); R.rect(159 + tira, 72, 159 + tira, 124, hex('#f06a6a'));
  const bx = 160 + tira, by = 97, bs = 1 + (aprieta > 0 && aprieta < 1 ? 1 : 0);
  for (const sx of [-1, 1]) { R.poligono([[bx, by], [bx + sx * 11 * bs, by - 7], [bx + sx * 12 * bs, by + 4]], K9.k); R.poligono([[bx, by], [bx + sx * 10 * bs, by - 5], [bx + sx * 10 * bs, by + 2]], K9.rojo); R.linea(bx, by + 1, bx + sx * 7, by + 12, K9.rojoS); }
  R.disco(bx, by, 3, K9.k); R.disco(bx, by, 2, hex('#e84a4a'));
  if (aprieta > 0 && aprieta < 1) for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4, r = 6 + aprieta * 14; R.pset(bx + Math.round(Math.cos(an) * r), by + Math.round(Math.sin(an) * r), K9.oroL); }
  // la nota colgada del lazo: claqueta → flecha → libro abierto
  R.linea(bx + 2, by + 2, 196, 110, hex('#e8e0c8')); caja(190, 108, 228, 126, hex('#fbf6e0'));
  R.rect(193, 114, 203, 122, K9.k); R.rect(194, 115, 202, 121, hex('#3a3a4a')); R.poligono([[193, 113], [203, 109], [204, 112], [194, 116]], K9.k); for (let i = 0; i < 3; i++) R.pset(196 + i * 3, 112 - i, K9.b);
  R.rect(206, 117, 211, 117, K9.k); R.pset(210, 116, K9.k); R.pset(210, 118, K9.k);
  R.rect(214, 115, 225, 122, K9.k); R.rect(215, 116, 219, 121, K9.b); R.rect(220, 116, 224, 121, K9.b); R.rect(219, 116, 220, 121, K9.grisS); R.rect(216, 118, 218, 118, K9.grisL); R.rect(221, 118, 223, 118, K9.grisL);
  // el pan: asoma por el reposabrazos, baja al cojín, tira del lazo; en «waiting» da un respingo y se aparta
  const llega = tramo(t, EVERY - 1.6, EVERY - 0.5), salta = tramo(t, WAIT, WAIT + 0.5);
  const px = Math.round(lerp(lerp(246, 204, llega), 222, salta)), py = Math.round(llega < 1 ? lerp(104, 122, llega) - Math.sin(llega * Math.PI) * 10 : 122 - Math.sin(salta * Math.PI) * 14);
  T.pan(R, px, py, t, { s: 2, dir: -1, anda: llega > 0 && llega < 1, señala: t > EVERY - 0.4 && t < WAIT ? [bx + 8, by + 6] : null, expresion: t > WAIT ? 'susto' : t > EVERY ? 'risa' : 'normal' });
  if (t > WAIT && t < WAIT + 0.9) R.icono('!', px + 6, py - 40, K9.oroL, K9.k);
};
const efectos = [[MJ, 'brillo'], [MJ + 0.5, 'lapiz'], [HAY, 'pop'], [PLU, 'pop'], [SNOW, 'pop'], [AFTER, 'interruptor'], [EVERY - 1.5, 'boing'], [EVERY + 0.1, 'brillo'], [WAIT, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: null });
''')

E['jh-cierre'] = ('El cierre', '''// JH-CIERRE (frases 57–60), Juegos 50 → 74 → hoy. Cinco planos:
// 1. (distrito 'aldea' general, amanecer, Juegos 50) Haymitch joven llega a la Aldea de los Vencedores con su maleta,
//    escoltado por un agente que señala la casa; en «Panem's history» se para, deja la maleta y mira la casa vacía;
// 2. (fondo local: el suelo de la plaza al amanecer, de cerca) el broche brilla entre los adoquines, junto a una papeleta;
//    pasa una paloma; en «what it cost him» cae una rosa blanca a su lado y la sombra de Haymitch se aleja;
// 3. (distrito 'aldea' 'porche', tarde, Juegos 74) Haymitch adulto bebe de la petaca en «drunk»; en «District 12» echa
//    migas a los gansos, que vienen a comer; en «you'll know why» sonríe a medias y brinda;
// 4. (capitolio 'mapa' general, hoy) en «which district» caen chinchetas de colores en los doce distritos; el pan llega
//    por la mesa y señala el 12 en «be from»; en «Tell me in the comments» saluda y le sale un bocadillo;
// 5. (hoy cine 'butacas', luz de amanecer en la pantalla) Atom se despide junto al pan; en «hiding this bread» se le
//    acerca; en «reaping» el pan tiembla de miedo y en «shaking» se esconde tras la fila de delante, que tiembla con él;
//    Atom se despide.''', PIEZAS + r'''
const a = (f) => en('costo', f), b = (f) => en('borracho', f), c = (f) => en('distrito', f), d = (f) => en('pan', f);
const P2 = a(0.5016), P3 = b(0), P4 = c(0), P5 = d(0);
const SURV = a(0.0599), DANG = a(0.1857), HIST = a(0.3714), SUNRISE = a(0.5975), COST = a(0.8536);
const DRUNK = b(0.3026), D12 = b(0.4486), WHY = b(0.7936);
const WHICH = c(0.2339), FROM = c(0.4393), TELL = c(0.7474);
const HIDING = d(0.1332), REAPING = d(0.662), SHAKING = d(0.8693);

// 1 · la Aldea de los Vencedores al amanecer: Haymitch llega solo a su casa nueva
const p1 = (t) => {
  T.distrito(R, t, { encuadre: 'aldea', camara: 'general', luz: 'amanecer', periodico: false });
  // el agente de la paz espera junto a la fuente y señala la casa del vencedor
  R.actor(EL.agentePaz, 198, 168, t, { dir: 1, dedo: t > SURV && t < HIST + 0.3, habla: t > SURV && t < DANG + 0.4 && Math.sin(t * 7) > 0 });
  // Haymitch entra por la izquierda con la maleta; en «history» la deja en el suelo y mira la casa, solo
  const u = tramo(t, 0.15, HIST - 0.2), x = Math.round(lerp(-18, 96, u)), deja = t > HIST + 0.1;
  const r = R.actor(EL.haymitch, x, 168, t, { dir: 1, anda: u > 0 && u < 1, sostiene: deja ? false : [x + 17, 162], triste: deja });
  const [mx, my] = deja ? [x + 19, 168] : (r && r.mano ? r.mano : [x + 17, 162]);
  R.rect(mx - 5, my - 1, mx + 5, my + 6 - (deja ? 7 : 0), K9.k); const yM = deja ? 161 : my;
  caja(mx - 4, yM, mx + 4, yM + 5, hex('#8a5a32')); R.rect(mx - 4, yM, mx + 4, yM, hex('#b07a48')); R.rect(mx - 1, yM - 2, mx + 1, yM - 2, K9.k); R.pset(mx - 3, yM + 2, K9.oroS); R.pset(mx + 3, yM + 2, K9.oroS);
  // una hoja de periódico vieja y hojas secas que el viento arrastra por el camino
  for (let k = 0; k < 4; k++) { const v = ((t * 0.18 + k * 0.27) % 1), hx = Math.round(320 - v * 340), hy = 172 + k * 2 - Math.round(Math.abs(Math.sin(v * 12 + k)) * 6); R.pset(hx, hy, [hex('#c8803a'), hex('#a8602a'), hex('#d8a040'), hex('#8a5a2a')][k]); R.pset(hx + 1, hy, hex('#6a3a1a')); }
  T.distritoDelante(R, t, { encuadre: 'aldea', camara: 'general', luz: 'amanecer', periodico: false });
};
// 2 · los adoquines de la plaza al amanecer, de cerca: el broche, la papeleta y la rosa blanca
const fondoAdoquines = () => {
  // filas de adoquines que se estrechan hacia arriba (el suelo en perspectiva)
  const FY = [0]; for (let h = 9; FY[FY.length - 1] < 180; h += 0.9) FY.push(Math.round(FY[FY.length - 1] + h));
  for (let f = 0; f + 1 < FY.length; f++) { const y0 = FY[f], y1 = Math.min(179, FY[f + 1] - 1), hh = FY[f + 1] - FY[f], w = Math.round(hh * 1.5);
    for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const xx = x + (f % 2) * Math.round(w / 2) + Math.round(h9(f, 9, 80) * w), cx = Math.floor(xx / w), lx = xx % w, ly = y - y0;
      const dx = Math.min(lx, w - 1 - lx), dy = Math.min(ly, hh - 1 - ly), esq = dx < 2 && dy < 2, borde = dx < 1 || dy < 1 || (dx + dy < 3);
      const tono = h9(cx, f, 80), base = mz(hex('#8a8070'), hex('#bcae96'), tono), luz = Math.max(0, 0.38 - Math.hypot(x - 300, y - 10) / 460);
      let c = borde ? (h9(x, y, 82) < 0.18 ? hex('#4a6a3a') : hex('#3e382e')) : (lx < 3 || ly < 2) ? mz(base, hex('#fff0d0'), 0.3) : (dx < 3 && lx > w / 2) || (ly > hh - 4) ? mz(base, K9.k, 0.25) : base;
      if (!borde && h9(x, y, 81) < 0.05) c = mz(c, K9.k, 0.18); if (esq) c = hex('#3e382e');
      R.pset(x, y, mz(c, hex('#f8b070'), luz)); } }
  // un charco que refleja el cielo del amanecer
  for (let y = 120; y < 160; y++) for (let x = 210; x < 300; x++) { const d = Math.hypot((x - 255) / 44, (y - 140) / 18); if (d < 1) R.pset(x, y, d > 0.92 ? hex('#4a4438') : mz(hex('#f8c080'), hex('#8ab0d8'), (y - 120) / 40)); }
  // papeletas pisadas y una mata entre las piedras
  for (const [x, y, an] of [[40, 30, 0.3], [250, 60, -0.2], [70, 150, 0.1]]) { R.poligono([[x, y], [x + 18, y + Math.round(an * 18)], [x + 18 - Math.round(an * 12), y + 12 + Math.round(an * 18)], [x - Math.round(an * 12), y + 12]], K9.k); R.poligono([[x + 1, y + 1], [x + 17, y + 1 + Math.round(an * 18)], [x + 17 - Math.round(an * 12), y + 11 + Math.round(an * 18)], [x + 1 - Math.round(an * 12), y + 11]], hex('#e8e0c8')); R.linea(x + 3, y + 5, x + 13, y + 5 + Math.round(an * 10), hex('#a89c80')); }
  for (let k = 0; k < 7; k++) R.linea(122, 40, 116 + k * 2, 30 + (k % 3) * 2, k % 2 ? K9.verde : K9.verdeS);
};
const p2 = (t) => {
  fijo('adoquines', fondoAdoquines);
  // el reflejo del charco se ondula
  for (let k = 0; k < 3; k++) { const r = ((t * 8 + k * 10) % 30); for (let i = 0; i < 24; i++) { const an = i / 24 * Math.PI * 2, x = 255 + Math.round(Math.cos(an) * r), y = 140 + Math.round(Math.sin(an) * r * 0.4); if (Math.hypot((x - 255) / 44, (y - 140) / 18) < 0.9) R.pset(x, y, mz(R.pget(x, y), K9.b, 0.3 * (1 - r / 30))); } }
  // la sombra larga de Haymitch, que se aleja en «what it cost him»
  const va = tramo(t, COST - 0.2, COST + 1.2), sx = Math.round(lerp(60, -120, va));
  // la sombra larga de una persona: la cabeza arriba, el cuerpo y las dos piernas que llegan abajo (los pies, fuera)
  for (let y = 20; y < 180; y++) { const yy = y - 20, cx = sx + 60 + yy * 0.45; for (let x = Math.round(cx - 18); x <= cx + 18; x++) { if (x < 0 || x > 319) continue; const dx = x - cx;
    const dentro = yy < 16 ? Math.hypot(dx, (yy - 8) * 0.9) < 7 : yy < 22 ? Math.abs(dx) < 4 : yy < 90 ? Math.abs(dx) < 10 + (yy < 30 ? (yy - 22) * 0.4 : 3) : Math.abs(Math.abs(dx) - 4 - (yy - 90) * 0.03) < 3.5;
    if (dentro && di(x, y, 0.6)) R.pset(x, y, mz(R.pget(x, y), hex('#2a2440'), 0.45)); } }
  // el broche, grande, con su destello que recorre el aro (y en «Sunrise» se enciende)
  T.PIEZAS_JH.broche(R, 150, 116, { s: 3, brillo: true });
  const g = (t * 0.6) % 1; if (g < 0.4) { const an = -Math.PI / 2 + g * 5; R.pset(150 + Math.round(Math.cos(an) * 18), 95 + Math.round(Math.sin(an) * 18), K9.b); }
  const sun = tramo(t, SUNRISE - 0.1, SUNRISE + 0.6) * (1 - tramo(t, SUNRISE + 1.2, SUNRISE + 1.8));
  if (sun > 0) for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4 + t, l = 6 + sun * 10; R.linea(150 + Math.round(Math.cos(an) * 26), 95 + Math.round(Math.sin(an) * 24), 150 + Math.round(Math.cos(an) * (26 + l)), 95 + Math.round(Math.sin(an) * (24 + l)), k % 2 ? K9.oroL : K9.b); }
  // una paloma que pasa picoteando
  { const u = tramo(t, P2 + 0.2, COST - 0.3), x = Math.round(lerp(330, 236, u)), pica = u >= 1 && Math.sin(t * 8) > 0 ? 2 : 0, pa = u > 0 && u < 1 && Math.sin(t * 14) > 0 ? 1 : 0;
    R.rect(x - 8, 66, x + 6, 74, K9.k); R.rect(x - 7, 67, x + 5, 73, hex('#8a8a9a')); R.rect(x - 4, 67, x + 2, 69, hex('#a8a8b8')); R.rect(x - 12, 62 + pica, x - 6, 68 + pica, K9.k); R.rect(x - 11, 63 + pica, x - 7, 67 + pica, hex('#6a7a8a')); R.pset(x - 10, 64 + pica, K9.k); R.pset(x - 13, 66 + pica, hex('#e8a040'));
    R.rect(x + 6, 68, x + 10, 71, K9.k); R.rect(x - 3, 75, x - 3, 77 - pa, hex('#d86a6a')); R.rect(x + 1, 75, x + 1, 77 - (1 - pa), hex('#d86a6a')); }
  // la rosa blanca cae junto al broche en «what it cost him»
  const cae = tramo(t, COST - 0.4, COST + 0.15);
  if (cae > 0) { const ry = Math.round(lerp(-20, 132, cae)), gira = cae < 1 ? Math.round(Math.sin(cae * 9) * 3) : 0; T.PIEZAS_JH.rosaBlanca(R, 200 + gira, ry, { s: 4 }); if (cae >= 1) { const fl = tramo(t, COST + 0.15, COST + 0.7); if (fl > 0 && fl < 1) for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4, r = 10 + fl * 10; R.pset(198 + Math.round(Math.cos(an) * r), ry - 28 + Math.round(Math.sin(an) * r), K9.b); } } }
};
// 3 · el porche de Haymitch adulto: la petaca, las migas y los gansos
const ganso = (x, y, t, k, come) => { x = Math.round(x); const pic = come && Math.sin(t * 9 + k) > 0 ? 3 : 0;
  R.rect(x - 8, y - 9, x + 6, y - 2, K9.k); R.rect(x - 7, y - 8, x + 5, y - 3, K9.b); R.rect(x - 2, y - 8, x + 4, y - 6, hex('#e0e0e8')); R.rect(x + 6, y - 6, x + 9, y - 4, K9.k);
  R.rect(x - 10, y - 16 + pic, x - 7, y - 7, K9.k); R.rect(x - 9, y - 15 + pic, x - 8, y - 8, K9.b); R.rect(x - 13, y - 16 + pic, x - 8, y - 13 + pic, K9.k); R.rect(x - 12, y - 15 + pic, x - 9, y - 14 + pic, K9.b); R.pset(x - 10, y - 15 + pic, K9.k);
  R.rect(x - 15, y - 15 + pic, x - 13, y - 14 + pic, hex('#e88a2a')); R.rect(x - 3, y - 2, x - 3, y, hex('#e88a2a')); R.rect(x + 1, y - 2, x + 1, y, hex('#e88a2a')); };
const p3 = (t) => {
  T.distrito(R, t, { encuadre: 'aldea', camara: 'porche', luz: 'tarde' });
  // Haymitch adulto en su porche: bebe en «drunk», echa migas en «District 12», brinda en «you'll know why»
  const bebe = t > DRUNK - 0.2 && t < D12 - 0.1, echa = t > D12 && t < D12 + 0.9, brinda = t > WHY - 0.1;
  const r = R.actor(EL.haymitchViejo, 152, 156, t, { dir: 1, sostiene: bebe ? [163, 132] : echa ? [172, 142] : brinda ? [170, 128] : [168, 146], sonrisa: brinda, habla: t < DRUNK - 0.3 && Math.sin(t * 5) > 0.3 });
  if (r && r.mano) { if (echa) { R.rect(r.mano[0] - 1, r.mano[1] - 1, r.mano[0] + 2, r.mano[1] + 1, hex('#e0a050')); } else T.PIEZAS_JH.petaca(R, r.mano[0], r.mano[1] + 3, { s: 1 }); }
  // las migas vuelan en arco hasta el césped
  const vu = tramo(t, D12 + 0.3, D12 + 1.2);
  for (let k = 0; k < 7; k++) { const u = Math.max(0, vu - k * 0.04); if (u <= 0) continue; const x = Math.round(lerp(176, 214 + k * 9, u)), y = Math.round(lerp(140, 172, u) - Math.sin(u * Math.PI) * 18); R.pset(x, y, hex('#f0c070')); R.pset(x + 1, y, hex('#c88a3a')); }
  // dos gansos llegan corriendo a por las migas
  for (let k = 0; k < 2; k++) { const u = tramo(t, D12 + 0.8 + k * 0.2, D12 + 2.0 + k * 0.2), x = lerp(334 + k * 20, 228 + k * 30, u); ganso(x, 178 - k * 2, t, k, u >= 1); }
  if (brinda && Math.sin(t * 4) > 0) R.pset(174, 124, K9.b);
  T.distritoDelante(R, t, { encuadre: 'aldea', camara: 'porche', luz: 'tarde' });
};
// 4 · el mapa de Panem: las chinchetas de los que comentan y el pan que señala el 12
const COLS = ['#e84a4a', '#3a8ae8', '#3ac85a', '#e8c040', '#c84ae8', '#3ad8d8', '#e88a3a', '#f0f0f0', '#8a6ae8', '#e86aa8', '#6ae86a', '#ff3a2a'].map(hex);
const p4 = (t) => {
  const g = T.capitolio(R, t, { encuadre: 'mapa', trenes: 0.7 });
  const D = g.distritos;
  // las chinchetas caen una a una desde «which district»
  D.forEach(([x, y], i) => { const t0 = WHICH - 0.3 + i * 0.12, u = tramo(t, t0, t0 + 0.3); if (u <= 0) return; T.chincheta(R, Math.round(x), Math.round(y), t, COLS[i], { baja: u }); });
  // el 12, con un aro que late
  const [x12, y12] = D[11]; if (t > FROM - 0.2) { const r = 7 + Math.round((Math.sin(t * 6) + 1) * 2); for (let k = 0; k < 20; k++) { const an = k / 20 * Math.PI * 2; R.pset(Math.round(x12 + Math.cos(an) * r), Math.round(y12 + Math.sin(an) * r * 0.6), K9.oroL); } }
  // el pan llega andando por el canto de la mesa, se para junto al 12, lo señala y saluda
  const u = tramo(t, P4 + 0.2, FROM - 0.4), px = Math.round(lerp(330, x12 + 24, u)), py = Math.round(y12 + 18);
  T.pan(R, px, py, t, { s: 2, dir: -1, anda: u > 0 && u < 1, señala: t > FROM - 0.4 && t < TELL ? [x12 + 2, y12 - 2] : null, saluda: t > TELL, expresion: t > TELL ? 'risa' : 'normal' });
  // el bocadillo de los comentarios
  const bo = tramo(t, TELL + 0.1, TELL + 0.4);
  if (bo > 0) { const bx = px - 30, by = py - 52; caja(bx, by, bx + 24, by + 14, K9.b); R.poligono([[bx + 16, by + 15], [bx + 22, by + 15], [bx + 24, by + 20]], K9.k); R.poligono([[bx + 17, by + 15], [bx + 21, by + 15], [bx + 22, by + 18]], K9.b);
    for (let k = 0; k < 3; k++) if (t > TELL + 0.3 + k * 0.2) R.rect(bx + 5 + k * 6, by + 6, bx + 7 + k * 6, by + 8, K9.k); }
};
// 5 · el cine, contraplano: Atom se despide y el pan se esconde temblando
const p5 = (t) => {
  const tiembla = t > REAPING - 0.05;
  T.hoy(R, t, { encuadre: 'cine', camara: 'butacas', luzPantalla: hex('#f8b070') });
  // el pan: tranquilo; en «reaping» tiembla (susto) y en «shaking» se esconde detrás de la fila de delante
  const baja = tramo(t, SHAKING - 0.1, SHAKING + 0.35), sacude = tiembla ? Math.round(Math.sin(t * 60)) : 0, brinco = tramo(t, REAPING, REAPING + 0.4);
  const py = Math.round(lerp(136, 172, baja) - (brinco > 0 && brinco < 1 ? Math.sin(brinco * Math.PI) * 8 : 0));
  T.pan(R, 128 + sacude, py, t, { s: 2, dir: 1, expresion: tiembla ? 'susto' : 'normal', esconde: baja, saluda: t < HIDING - 0.2 });
  if (tiembla && t < SHAKING) R.icono('!', 136, py - 44, K9.oroL, K9.k);
  // Atom se acerca al pan en «hiding this bread», vuelve a su butaca y se despide
  const va = tramo(t, HIDING - 0.2, HIDING + 0.5) * (1 - tramo(t, REAPING - 0.6, REAPING - 0.1)), adios = t > SHAKING + 0.4;
  const ax = Math.round(lerp(192, 156, va) + (adios ? Math.sin(t * 6) * 4 : 0)), ay = Math.round(lerp(112, 104, va) + Math.sin(t * 2.4) * 1.5);
  if (adios) for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4 + t * 3, rr = 16 + Math.sin(t * 8) * 2; R.pset(Math.round(ax + Math.cos(an) * rr), Math.round(ay + Math.sin(an) * rr), hex('#c8f0ff')); }
  R.atomo(ax, ay, t, { r: adios ? 12 : 11, energia: va > 0 && va < 1 ? 0.7 : adios ? 0.9 : 0.35 });
  T.hoyDelante(R, t, { encuadre: 'cine', camara: 'butacas', luzPantalla: hex('#f8b070') });
  // el respaldo de delante tiembla con el pan escondido detrás
  if (baja >= 1) { const s = Math.round(Math.sin(t * 50)); for (let x = 112; x < 146; x++) R.pset(x + s, 142, hex('#e05a60')); for (let k = 0; k < 3; k++) R.pset(116 + k * 12 + s, 138 - (Math.floor(t * 8 + k) % 3), hex('#f0c070')); }
};
const año = (t) => (t < P3 ? 50 : t < P4 ? 74 : null);
const efectos = [[0.4, 'pasos'], [SURV + 0.1, 'silbato'], [HIST + 0.15, 'golpecito'], [SUNRISE, 'brillo'], [COST, 'viento'], [DRUNK, 'burbujas'], [WHY, 'brillo'], [WHICH, 'toc'], [FROM, 'pop'], [TELL + 0.1, 'pop'], [HIDING, 'whoosh'], [REAPING, 'boing'], [SHAKING, 'whoosh'], [SHAKING + 0.8, 'brillo']].filter(([, n]) => n !== 'pasos');
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')
