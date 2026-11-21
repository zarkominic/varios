"""Borrador de escenas del ep34 (grupo S9): nx-sabemos y nx-cierre. Formato del 11: E[id] = (título, comentario de
cabecera, cuerpo). Los cortes y las acciones van en segundos de la voz inglesa (linea.json), pasados a fracción de su
frase con en('marca', f)."""
E = {}

COMUN = r'''
const K = hex('#17151d'), BL = hex('#f6f2ea'), ORO = hex('#ffd860'), OROL = hex('#fff4b8'), OROS = hex('#b8862a'), ROJO = hex('#d8402c'), ROJOL = hex('#ff7a5a'), PZ = T.PIEZAS_NX;
const MANGA = '#3e4e74';
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
// un globo de cómic (sin letras: dentro va un dibujo), centrado en (cx, cy), de medio ancho w y medio alto h, con el rabito hacia abajo en tx
const globo = (cx, cy, w, h, tx) => {
  R.rect(cx - w, cy - h + 2, cx + w, cy + h - 2, K); R.rect(cx - w + 2, cy - h, cx + w - 2, cy + h, K); R.rect(cx - w + 1, cy - h + 1, cx + w - 1, cy + h - 1, K);
  R.rect(cx - w + 1, cy - h + 2, cx + w - 1, cy + h - 2, BL); R.rect(cx - w + 2, cy - h + 1, cx + w - 2, cy + h - 1, BL);
  R.rect(cx - w + 2, cy + h - 1, cx + w - 2, cy + h - 1, hex('#d8d2c4'));
  for (let k = 0; k < 5; k++) { R.rect(tx - 4 + k, cy + h + k, tx + 4 - k, cy + h + k, K); if (k < 4) R.rect(tx - 3 + k, cy + h + k - 1, tx + 3 - k, cy + h + k, BL); }
};
// LA LUPA de mano: aro dorado de radio r, cristal que AGRANDA ×2 lo que tiene debajo y mango de nogal hacia abajo (dir 1:
// a la derecha; −1: a la izquierda). pinta(lx, ly, ri): algo que se dibuja dentro del cristal. Devuelve la punta del mango
const lupa = (lx, ly, r, dir = 1, pinta = null) => {
  lx = Math.round(lx); ly = Math.round(ly); const ri = r - 3, m0 = Math.round(r * 0.7), L = 19;
  for (let k = 0; k < L; k++) { const x = lx + dir * (m0 + k), y = ly + m0 + k; R.rect(x - 2, y - 1, x + 2, y + 3, K); }
  for (let k = 0; k < L - 1; k++) { const x = lx + dir * (m0 + k), y = ly + m0 + k; R.rect(x - 1, y, x + 1, y + 2, k > 4 ? hex('#8a5a30') : hex('#a8acb8')); R.pset(x - dir, y, k > 4 ? hex('#c08a50') : BL); R.pset(x + dir, y + 2, k > 4 ? hex('#5a3a20') : hex('#6a6e7a')); }
  const buf = [];
  for (let j = -ri; j <= ri; j++) for (let i = -ri; i <= ri; i++) if (i * i + j * j <= ri * ri) buf.push([i, j, R.pget(lx + Math.round(i / 2), ly + Math.round(j / 2))]);
  for (const [i, j, c] of buf) R.pset(lx + i, ly + j, mez(c, hex('#d8f0f8'), 0.12));
  if (pinta) pinta(lx, ly, ri);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r + 0.4 || d <= ri + 0.2) continue; R.pset(lx + i, ly + j, d > r - 0.7 || d < ri + 1.1 ? K : i + j < -2 ? OROL : i + j > r ? OROS : ORO); }
  for (let a = 3.5; a < 4.5; a += 0.07) R.pset(Math.round(lx + Math.cos(a) * (ri - 3)), Math.round(ly + Math.sin(a) * (ri - 3)), BL);
  R.pset(lx + Math.round(ri * 0.45), ly + Math.round(ri * 0.45), hex('#e8f8ff'));
  return [lx + dir * (m0 + L - 3), ly + m0 + L - 3];
};
// la mano que sujeta algo por la punta (hx, hy) y entra por abajo (dir 1: el brazo viene por la derecha)
const manoAbajo = (hx, hy, dir = 1) => T.brazo(R, hx + dir * 30, 188, hx + dir * 8, hy + 2, MANGA, -dir, { codo: [hx + dir * 26, Math.round((hy + 190) / 2)] });
'''

E['nx-sabemos'] = ('Lo que sabemos', '''// NX-SABEMOS (frases 28–29, marcas «sabemos» y «roca2»), 2026, sin cartela. El recuento, en calma. Cinco planos (reparto
// de encuadres-ep34.md). A Noé / Nuh no se le dibuja; los tres libros, cerrados y con la misma luz en todo momento:
// 1. la tablilla pequeña sobre la mesa del museo: una mano pasa la lupa por las cuñas (agranda de verdad); en «the flood
//    story» corren por la arcilla tres olas de luz con un barquito; en «almost 4,000 years old» la cifra sube hasta
//    «4000» debajo de la tablilla;
// 2. los tres libros y la tablilla: en «the Bible, the Quran» se traza A LA VEZ el mismo cerco de luz en los tres libros
//    (idéntico: ninguno se ilumina más ni antes); en «clay tablets» en la tablilla, y en «far older» un reloj de arena
//    sobre ella; en «millions of people» llegan cuatro oyentes de hoy (gente corriente: dos turistas, un pastor y un
//    geólogo) y se quedan mirando entre los demás; los oyentes de espaldas están desde el principio (gente fija);
// 3. dentro de la forma (2026, de día): a un lado la geóloga golpea con el martillo una roca que asoma, al otro el técnico empuja
//    el radar; en «shaped like a ship» una línea de luz recorre las dos bordas hasta la proa y los dos se vuelven a mirar;
// 4. el corte de geología: la geóloga lo explica desde la orilla y Collins asiente; en «explain it» un trazo de luz
//    recorre la capa dura plegada, de borde a borde; en «without needing any ship» el recuadro «visto desde arriba» se
//    enmarca y recibe su marca de visto;
// 5. el plano azul, «según ellos»: el fundador lo cuenta (su globo con las rectas ámbar) y los pasillos se trazan en
//    «found something underneath»; en «not yet proved» cae encima un «?» grande, que se queda latiendo; el arqueólogo
//    se encoge. Las barras siguen a cero: nada probado.''', COMUN + r'''
const w1 = (s) => en('sabemos', (s - 0.9) / 12.585), w2 = (s) => en('roca2', (s - 14.513) / 11.762);
const P2 = w1(6.85), P3 = w1(13.75), P4 = w2(17.72), P5 = w2(21.62);

// ── 1 · la tablilla más vieja: casi cuatro mil años ──────────────────────────────────────────────────────────────────
const FLOOD = w1(3.08), CUATRO = w1(4.31), MIL = w1(4.95), OLD = w1(5.5);
const AGUA = hex('#3a8ad8'), AGUAL = hex('#bfe6ff');
const esArcilla = (c) => (c & 255) > ((c >>> 16) & 255) + 28;
const p1 = (t) => {
  const o = { encuadre: 'sala', camara: 'tablilla', pequena: true, dibujo: 1 };
  const g = T.museo(R, t, o), [tx0, ty0, tx1, ty1] = g.tablilla;
  // «the flood story»: tres olas de luz corren por la arcilla (solo sobre ella) y un barquito sube y baja con la primera
  const ol = tramo(t, FLOOD - 0.15, FLOOD + 0.9);
  if (ol > 0) { const xf = lerp(tx0 + 2, tx1 - 2, ol);
    for (let k = 0; k < 3; k++) for (let x = tx0 + 2; x <= xf; x++) { const y = Math.round(ty0 + 14 + k * 27 + Math.sin(x * 0.42 - t * 5 + k * 1.7) * 2.2); if (!esArcilla(R.pget(x, y))) continue; R.pset(x, y, AGUAL); R.pset(x, y + 1, AGUA); if ((x + k) % 5 === 0) R.pset(x, y + 2, AGUA); }
    const bx = Math.round(lerp(tx0 + 5, tx1 - 13, tramo(t, FLOOD, OLD + 0.6))), by = Math.round(ty0 + 14 + Math.sin((bx + 4) * 0.42 - t * 5) * 2.2);
    if (bx + 8 < xf) R.icono('barco', bx, by - 8, hex('#4a2a14'), AGUAL, 1); }
  // «almost 4,000 years old»: la cifra, debajo de la tablilla, sube de mil en mil
  const n = tramo(t, CUATRO - 0.1, MIL + 0.1);
  if (n > 0) { const v = Math.min(4000, 1000 * Math.ceil(n * 4)), late = t >= MIL + 0.1 && t < MIL + 0.4 ? 1 : 0;
    R.linea(160, ty1 + 2, 160, 131 - late, K); R.linea(161, ty1 + 2, 161, 131 - late, BL);
    R.numero(String(v), 171, 149 - late, { tam: 16, centro: true });
    if (late) for (let a = 0; a < 12; a++) { const an = a * Math.PI / 6; R.pset(Math.round(171 + Math.cos(an) * 40), Math.round(140 + Math.sin(an) * 14), a & 1 ? ORO : BL); } }
  // la mano con la lupa: entra por abajo a la izquierda, recorre las filas de cuñas y se queda sobre la espiral
  const ent = ease(tramo(t, 0.25, 1.3)), lee = tramo(t, 1.3, FLOOD - 0.1), cen = ease(tramo(t, FLOOD - 0.1, FLOOD + 0.7)), fila = Math.min(2, Math.floor(lee * 3)), uf = (lee * 3) % 1;
  let lx = lerp(tx0 + 12, tx1 - 12, fila === 1 ? 1 - uf : uf), ly = ty0 + 12 + fila * 9;
  if (lee >= 1) { lx = tx1 - 12; ly = ty0 + 30; }
  lx = lerp(lx, 160 + Math.sin(t * 1.3) * 5, cen); ly = lerp(ly, 84 + Math.cos(t * 1.7) * 4, cen);
  lx = lerp(96, lx, ent); ly = lerp(214, ly, ent);
  const [hx, hy] = lupa(lx, ly, 14, -1);
  manoAbajo(hx, hy, -1);
  // el polvo que flota a la luz del flexo
  for (let k = 0; k < 16; k++) { const x = 20 + ((hh(k, 1, 3) * 280 + t * (2 + hh(k, 2, 3) * 3)) % 280), y = 24 + ((hh(k, 3, 3) * 130 + t * (1 + hh(k, 4, 3) * 2) + Math.sin(t + k) * 2) % 130); if (Math.sin(t * 1.9 + k * 2.1) > 0.1) R.pset(Math.round(x), Math.round(y), k % 3 ? hex('#fffbe8') : BL); }
  T.museoDelante(R, t, o);
};

// ── 2 · la Biblia, el Corán y las tablillas: quien lo tiene por sagrado ──────────────────────────────────────────────
const BIBLIA = w1(7.08), CORAN = w1(7.8), ARCILLA = w1(8.58), VIEJAS = w1(9.4), AMBOS = w1(10.4), MILL = w1(11.3), SAGR = w1(12.8);
// el mismo cerco de luz para cada libro y para la tablilla: una línea de puntos dorados que da la vuelta
const cerco = (x0, y0, x1, y1, t0, t) => { if (t < t0) return; const d = t - t0, per = 2 * (x1 - x0 + y1 - y0), n = Math.min(per, Math.round(d / 0.8 * per)), late = t >= SAGR && t < SAGR + 0.6;
  for (let k = 0; k < n; k++) { let x, y; if (k < x1 - x0) { x = x0 + k; y = y0; } else if (k < x1 - x0 + y1 - y0) { x = x1; y = y0 + k - (x1 - x0); } else if (k < 2 * (x1 - x0) + y1 - y0) { x = x1 - (k - (x1 - x0) - (y1 - y0)); y = y1; } else { x = x0; y = y1 - (k - 2 * (x1 - x0) - (y1 - y0)); }
    if (late || (k + Math.floor(t * 8)) % 4 < 2) { R.pset(x, y, late ? BL : OROL); R.pset(x + (x === x0 ? -1 : x === x1 ? 1 : 0), y + (y === y0 ? -1 : y === y1 ? 1 : 0), ORO); } }
  if (d < 0.8) destello(x0 + (n < x1 - x0 ? n : x1 - x0), n < x1 - x0 ? y0 : Math.min(y1, y0 + n - (x1 - x0)), 3, BL); };
const arena = (cx, cy, t) => {
  R.rect(cx - 8, cy - 12, cx + 8, cy + 12, K); R.rect(cx - 9, cy - 11, cx + 9, cy + 11, K); R.rect(cx - 8, cy - 11, cx + 8, cy + 11, hex('#2a2634'));
  R.rect(cx - 6, cy - 10, cx + 6, cy - 9, ORO); R.rect(cx - 6, cy + 9, cx + 6, cy + 10, ORO); R.rect(cx - 6, cy - 10, cx + 6, cy - 10, OROL);
  const f = (t * 0.22) % 1, AN = [5, 5, 4, 3, 2, 1, 0, 0];
  for (let j = 0; j < 8; j++) { const a = AN[j], yt = cy - 8 + j, yb = cy + 8 - j;
    R.pset(cx - a - 1, yt, AGUAV); R.pset(cx + a + 1, yt, AGUAV); R.pset(cx - a - 1, yb, AGUAV); R.pset(cx + a + 1, yb, AGUAV);
    if (j >= Math.floor(f * 7) + 1) R.rect(cx - a, yt, cx + a, yt, hex('#f0c868'));
    if (j < Math.floor(f * 6) + 1) R.rect(cx - a, yb, cx + a, yb, j === Math.floor(f * 6) ? OROL : hex('#f0c868')); }
  R.pset(cx, cy - 1 + Math.floor((t * 9) % 3) * 3, OROL);
};
const AGUAV = hex('#bfe6f0');
const OYEN = [[EL.turista2NX, 28, -22, 0], [EL.pastorNX, 236, 338, 0.2], [EL.turista1NX, 111, -22, 0.35], [EL.geologo2NX, 195, 338, 0.5]];
const p2 = (t) => {
  const o = { encuadre: 'diluvio', camara: 'libros', cuantos: 3, tablilla: true, gente: 0.57 };
  T.relato(R, t, o);
  // los cercos: el mismo y a la vez en los tres libros («the Bible, the Quran»), y luego en la tablilla
  cerco(68, 79, 116, 140, BIBLIA, t); cerco(136, 79, 184, 140, BIBLIA, t); cerco(204, 79, 252, 140, BIBLIA, t); cerco(265, 92, 305, 140, ARCILLA, t);
  // «far older than both»: el reloj de arena sobre la tablilla
  if (t >= VIEJAS - 0.15) { const q = ease(tramo(t, VIEJAS - 0.15, VIEJAS + 0.15)); arena(285, Math.round(74 + (1 - q) * 5), t); }
  // «millions of people hold it sacred»: llegan cuatro oyentes de hoy y se quedan mirando, entre los demás
  for (const [quien, x1, x0, d] of OYEN) { const a = MILL - 0.5 + d, dur = Math.abs(x1 - x0) / 85, u = tramo(t, a, a + dur); if (u <= 0) continue;
    const x = Math.round(lerp(x0, x1, u)), dir = x1 < 160 ? 1 : -1;
    R.actor(quien, x, 178, t, { dir, anda: u < 1, sonrisa: u >= 1 && t >= SAGR }); }
  T.relatoDelante(R, t, o);
};

// ── 3 · la roca, desde dentro: a un lado la geóloga, al otro el radar ────────────────────────────────────────────────
const ROCK = w2(15.35), FORMA = w2(16.23), SHIP = w2(16.99);
const ROCA = ['.....kkkkkk.......', '...kkLLLLRRkkk....', '..kLLLRRRRRRRRkk..', '.kLLRRRRRkRRRRRRk.', '.kLRRRRRRRkRRRrrk.', 'kLRRRkRRRRRRRrrrrk', 'kRRRRRkRRRRRrrrrrk', 'kRRRRRRRRRRrrrrrrk', 'kRRrRRRRRrrrrrrrrk', 'kkrrrrrrrrrrrrrkkk', '..kkkkkkkkkkkkk...'];
const PALR = { k: K, L: hex('#d89a78'), R: hex('#b06a4c'), r: hex('#7e4634') };
const traza = (x0, y0, x1, y1, u, t, c1, c2) => { const n = Math.round(Math.hypot(x1 - x0, y1 - y0)), m = Math.round(n * u);
  for (let k = 0; k <= m; k++) { const x = Math.round(lerp(x0, x1, k / n)), y = Math.round(lerp(y0, y1, k / n)), cab = u < 1 && k > m - 7;
    if (cab || (k + Math.floor(t * 12)) % 5 < 3) { R.pset(x, y, cab ? BL : c1); R.pset(x, y + 1, c2); } }
  if (u > 0 && u < 1) destello(lerp(x0, x1, u), lerp(y0, y1, u), 3, BL); };
const p3 = (t) => {
  const o = { encuadre: 'ladera', camara: 'cerca', epoca: 2026, hora: 'dia' };
  T.ladera(R, t, o);
  // la línea de luz que recorre las dos bordas hasta la proa en «shaped like a ship»
  const u = tramo(t, FORMA - 0.25, SHIP + 0.1);
  if (u > 0) { traza(0, 103, 150, 86, u, t, OROL, ORO); traza(319, 106, 170, 86, u, t, OROL, ORO);
    if (u >= 1) { traza(150, 86, 160, 82, 1, t, OROL, ORO); traza(170, 86, 160, 82, 1, t, OROL, ORO);
      const d = t - SHIP - 0.1; destello(160, 81, d < 0.35 ? 6 : 2 + (Math.sin(t * 6) > 0 ? 1 : 0), BL); if (d < 0.5) for (let a = 0; a < 10; a++) { const an = a * Math.PI / 5; R.pset(Math.round(160 + Math.cos(an) * (6 + d * 24)), Math.round(81 + Math.sin(an) * (4 + d * 14)), a & 1 ? ORO : BL); } } }
  // la roca que asoma junto a la borda, donde golpea la geóloga
  for (let i = 0; i < 22; i++) if (i & 1) R.pset(57 + i, 161, hex('#5a4030'));
  R.dibujo(ROCA, 58, 150, 1, PALR);
  // la geóloga, a la izquierda: dos golpes de martillo a la borda y se vuelve a mirar la proa
  const mira = t >= FORMA + 0.1, G1 = w2(14.65), G2 = w2(15.07), gol = Math.max(0, 1 - Math.abs(t - G1) / 0.1, 1 - Math.abs(t - G2) / 0.1), alza = tramo(t, P3 + 0.3, G1 - 0.15), gx = 84;
  const ge = R.actor(EL.geologa3NX, gx, 160, t, { dir: mira ? 1 : -1, sostiene: mira ? [gx + 19, 151] : [gx - 6, Math.round(lerp(150, 141, alza) + gol * 8)], sonrisa: t >= SHIP });
  if (ge && ge.mano) { const [mx, my] = ge.mano; PZ.martillo(R, mx + (mira ? 3 : -3), my + 7, { dir: mira ? 1 : -1 }); }
  for (const g0 of [G1, G2]) if (t >= g0 && t < g0 + 0.4) { const d = (t - g0) / 0.4; destello(71, 150, d < 0.3 ? 3 : 1, BL);
    for (let k = 0; k < 6; k++) { const an = -2.7 + k * 0.42; R.pset(Math.round(71 + Math.cos(an) * d * (9 + k * 2)), Math.round(150 + Math.sin(an) * d * 11 + d * d * 13), k & 1 ? hex('#d89a78') : hex('#7e4634')); } }
  // el técnico, a la derecha: empuja el radar por la cuadrícula y se para a mirar
  const um = tramo(t, P3, FORMA), tx = Math.round(lerp(246, 208, um)), rueda = um > 0 && um < 1;
  if (rueda) for (let k = 0; k < 3; k++) { const r = ((t * 16 + k * 6) % 18); for (let i = 0; i <= 10; i++) { const an = 0.5 + i / 10 * 2.14, x = Math.round(tx - 14 + Math.cos(an) * r * 1.2), y = Math.round(163 + Math.sin(an) * r * 0.5); if (y < 176 && (i + k) % 3) R.pset(x, y, hex('#bfe6ff')); } }
  PZ.radar(R, tx - 14, 161 - (rueda ? Math.floor(t * 8) % 2 : 0), { dir: -1, t });
  R.actor(EL.tecnicoNX, tx, 160, t, { dir: -1, anda: rueda, sostiene: [tx - 2, 141], sonrisa: t >= SHIP });
  T.laderaDelante(R, t, o);
};

// ── 4 · se explica sin barco: las capas plegadas ─────────────────────────────────────────────────────────────────────
const GEOS = w2(18.11), EXPL = w2(18.91), SIN = w2(19.71), NINGUN = w2(20.45);
const yDura = (x) => 78 + 56 * Math.cos(Math.max(-2, Math.min(2, (x - 172) / 84)) * Math.PI / 2);
const p4 = (t) => {
  const o = { encuadre: 'corte', fase: 3 };
  T.ladera(R, t, o);
  // el trazo de luz que recorre la capa dura, de borde a borde
  const u = tramo(t, EXPL - 0.15, SIN + 0.25);
  if (u > 0) { const xf = lerp(81, 263, u);
    for (let x = 81; x <= xf; x++) { const y = Math.round(yDura(x)) + 2, cab = u < 1 && x > xf - 7; if (cab || (x + Math.floor(t * 12)) % 5 < 3) { R.pset(x, y, cab ? BL : OROL); R.pset(x, y + 1, cab ? OROL : ORO); R.pset(x, y + 2, hex('#6a2a14')); } }
    if (u < 1) destello(xf, yDura(xf) + 2, 4, BL); }
  // el recuadro «visto desde arriba» se enmarca y recibe su marca de visto: explicado, sin barco
  if (t >= NINGUN - 0.1) { const d = t - NINGUN + 0.1, late = d < 0.5 || Math.sin(t * 5) > 0.3, c = late ? OROL : ORO;
    R.rect(66, 22, 196, 22, c); R.rect(66, 76, 196, 76, c); R.rect(66, 22, 66, 76, c); R.rect(196, 22, 196, 76, c); R.rect(65, 21, 197, 21, K); R.rect(65, 77, 197, 77, K); R.rect(65, 21, 65, 77, K); R.rect(197, 21, 197, 77, K);
    const q = tramo(t, NINGUN - 0.1, NINGUN + 0.12), r = Math.round(6 + q * 8), cx = 214, cy = 50 - Math.round(Math.sin(q * Math.PI) * 4);
    R.disco(cx, cy + 1, r + 2, hex('#2a4a6a')); R.disco(cx, cy, r + 1, K); R.disco(cx, cy, r, BL); if (q >= 1) { T.visto(R, cx - 11, cy - 8, 2); }
    if (d < 0.45) for (let a = 0; a < 12; a++) { const an = a * Math.PI / 6; R.pset(Math.round(cx + Math.cos(an) * (16 + d * 22)), Math.round(cy + Math.sin(an) * (16 + d * 22)), a & 1 ? ORO : hex('#6ad86a')); } }
  // la geóloga lo explica desde la orilla, martillo en mano; Collins asiente
  const habla = t >= GEOS - 0.2 && t < NINGUN, asi = t >= NINGUN ? Math.max(0, Math.round(Math.sin((t - NINGUN) * 9) * 1.6)) : 0;
  R.actor(EL.collins, 3, 74, t, { dir: 1, sonrisa: t >= NINGUN, salto: asi });
  const ge = R.actor(EL.geologa3NX, 23, 74, t, { dir: 1, sostiene: [42, habla ? 58 + Math.round(Math.sin(t * 6) * 1.5) : 64], habla: habla && Math.sin(t * 11) > -0.3, sonrisa: t >= NINGUN });
  if (ge && ge.mano) { const [mx, my] = ge.mano; PZ.martillo(R, mx + 3, my + 7, { dir: 1 }); }
  T.laderaDelante(R, t, o);
};

// ── 5 · «según ellos»: algo debajo, sin probar ───────────────────────────────────────────────────────────────────────
const DICE = w2(22.66), ALGO = w2(23.56), DEBAJO = w2(23.94), NOYET = w2(25.12), PROBADO = w2(25.56);
const AMBAR = hex('#ffb030');
const p5 = (t) => {
  const o = { encuadre: 'corte', plano: true, barras: 0, pasillos: lerp(0.25, 1, tramo(t, ALGO - 0.2, DEBAJO + 0.7)) };
  T.ladera(R, t, o);
  // el fundador lo cuenta desde la orilla: su globo con las rectas ámbar («a team says»)
  const dice = t >= DICE - 0.15 && t < NOYET - 0.1, cae = tramo(t, NOYET, NOYET + 0.24), puesto = cae >= 1;
  R.actor(EL.arqueologoNX, 3, 74, t, { dir: 1, sorpresa: puesto && t < NOYET + 0.9, triste: t >= NOYET + 0.9 });
  R.actor(EL.fundadorNX, 23, 74, t, { dir: 1, dedo: dice, habla: dice && Math.sin(t * 10) > -0.2, sorpresa: puesto && t < NOYET + 0.7 });
  if (t >= DICE - 0.15) { const q = ease(tramo(t, DICE - 0.15, DICE + 0.1)), cy = Math.round(41 - q * 4), cx = 46;
    globo(cx, cy, 17, 11, 34); R.rect(cx - 13, cy - 7, cx + 13, cy + 7, hex('#163a66'));
    for (let i = -12; i <= 12; i += 4) for (let j = -6; j <= 6; j += 4) R.pset(cx + i, cy + j, hex('#2a5a8e'));
    const a = dice ? (Math.floor(t * 4) % 2 ? AMBAR : hex('#ffd070')) : hex('#c88a30');
    R.rect(cx - 10, cy - 4, cx + 9, cy - 4, a); R.rect(cx - 10, cy + 4, cx + 9, cy + 4, a); R.rect(cx - 10, cy - 4, cx - 10, cy + 4, a); R.rect(cx + 9, cy - 4, cx + 9, cy + 4, a); R.rect(cx - 3, cy - 4, cx - 3, cy + 4, a); R.rect(cx + 3, cy - 4, cx + 3, cy, a); R.rect(cx - 10, cy, cx - 3, cy, a); }
  T.laderaDelante(R, t, o);
  // «has not yet proved it»: el «?» grande cae sobre el casco y se queda latiendo dentro de su aro a trazos
  if (cae > 0) { const QX = 172, QY = Math.round(lerp(-30, 106, cae * cae)), bota = puesto && t < NOYET + 0.5 ? Math.round(Math.abs(Math.sin((t - NOYET - 0.24) * 12)) * 5 * (1 - (t - NOYET - 0.24) / 0.26)) : 0, y0 = QY - 21 - bota, x0 = QX - 15;
    const late = puesto && Math.sin((t - NOYET) * 4.2) > 0;
    if (puesto) { const rr = 31 + (late ? 1 : 0); for (let a = 0; a < 48; a++) { const an = a * Math.PI / 24 + t * 0.5; if (a % 4 < 2) continue; const x = Math.round(QX + Math.cos(an) * rr), y = Math.round(106 + Math.sin(an) * rr); R.pset(x, y, BL); R.pset(x + 1, y, BL); R.pset(x, y + 1, hex('#0c2040')); } }
    for (const [dx, dy] of [[-2, 0], [2, 0], [0, -2], [0, 2], [-1, -1], [1, 1], [-1, 1], [1, -1], [2, 2]]) R.icono('?', x0 + dx, y0 + dy, K, K, 6);
    for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.icono('?', x0 + dx, y0 + dy, BL, BL, 6);
    R.icono('?', x0, y0, late ? ROJOL : ROJO, hex('#8a2418'), 6);
    if (puesto && t < NOYET + 0.6) { const d = (t - NOYET - 0.24) / 0.36; for (let a = 0; a < 14; a++) { const an = a * Math.PI / 7; R.pset(Math.round(QX + Math.cos(an) * (22 + d * 26)), Math.round(106 + Math.sin(an) * (22 + d * 20)), a & 1 ? BL : AMBAR); } } }
};

const efectos = [[FLOOD, 'ola'], [MIL + 0.1, 'golpecito'], [BIBLIA, 'brillo'], [VIEJAS, 'tic'], [G1e(), 'toc'], [w2(15.07), 'toc'], [FORMA - 0.2, 'brillo'], [EXPL - 0.1, 'lapiz'], [NINGUN, 'pop'], [DICE, 'pop'], [ALGO, 'lapiz'], [NOYET + 0.24, 'sello']];
function G1e() { return w2(14.65); }
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2026 });
''')

E['nx-cierre'] = ('Cierre', '''// NX-CIERRE (frase 30, marca «cierre»), 2026, sin cartela. Sereno y respetuoso. Tres planos:
// 1. la hoja de las tres casillas: en «Believing», «claiming» y «checking» se enciende cada una (el corazón, el
//    bocadillo, la lupa) y recibe su número; en «all three fit in this story» una mano con el lápiz las une por debajo
//    con una sola llave;
// 2. el escritorio de cerca: una mano deja el titular (un papel con un barco y un «!») en «read»; el «!» bota en «has
//    been found»; otra mano coge la lupa del borde, la pasa por delante de la pecera (agranda al pez, que mira el
//    barquito) y la pone sobre el titular: en «who has checked it» en el cristal se lee un «?»;
// 3. el estudio (gag 8), con la pecera pintada aquí algo mayor (radio 31) para que se lea: el pez salta por encima del
//    borde y cae subido en el barquito de papel, le cae su gorra de capitán y echa a navegar; Atom baja de su esquina
//    a mirarlo; en «not confirmed» su globo enseña la casilla vacía con su «?». Acaba en calma.''', COMUN + r'''
const w = (s) => en('cierre', (s - 0.5) / 13.259);
const P2 = w(5.4), P3 = w(10.65);
const comp0 = R.companero; R.companero = (t, e) => { if (t < P3) comp0(t, e); };   // en el plano 3 Atom baja a la pecera

// ── 1 · creer, decir y comprobar ─────────────────────────────────────────────────────────────────────────────────────
const C1 = w(0.5), C2 = w(1.12), C3 = w(1.66), TRES = w(2.24), TODOS = w(3.64), HIST = w(4.66);
const CX = [88, 160, 232];
const p1 = (t) => {
  const o = { encuadre: 'lista', camara: 'casillas', luz: tramo(t, C1, C1 + 0.3) + tramo(t, C2, C2 + 0.3) + tramo(t, C3, C3 + 0.3) };
  T.hoy(R, t, o);
  // el aro que se abre al encenderse cada una y su número
  [C1, C2, C3].forEach((c0, k) => { if (t < c0) return; const d = t - c0;
    if (d < 0.45) { const r = 30 + d * 30; for (let a = 0; a < 20; a++) { const an = a * Math.PI / 10 + k; const x = Math.round(CX[k] + Math.cos(an) * r), y = Math.round(96 + Math.sin(an) * r); if (y > 48 && y < 152) R.pset(x, y, a & 1 ? ORO : BL); } }
    const n0 = TRES + k * 0.3; if (t >= n0) { const b = t < n0 + 0.25 ? Math.round(Math.sin((t - n0) / 0.25 * Math.PI) * 3) : 0; R.disco(CX[k], 56 - b, 6, K); R.disco(CX[k], 56 - b, 5, hex('#2a2634')); R.numero(String(k + 1), CX[k] + 1, 60 - b, { centro: true }); } });
  // «all three fit in this story»: la llave a lápiz que las une por debajo, y la mano que la traza
  const u = tramo(t, TODOS - 0.1, HIST + 0.25), LL = [[58, 137], [58, 143], [160, 143], [160, 148], [160, 143], [262, 143], [262, 137]], LEN = [6, 102, 5, 5, 102, 6], TOT = 226;
  let rest = u * TOT, px = 58, py = 137;
  for (let s = 0; s < 6 && u > 0; s++) { const [ax, ay] = LL[s], [bx, by] = LL[s + 1], f = Math.max(0, Math.min(1, rest / LEN[s])); if (f <= 0) break;
    const ex = Math.round(lerp(ax, bx, f)), ey = Math.round(lerp(ay, by, f)); R.linea(ax, ay, ex, ey, hex('#2a2a38')); R.linea(ax, ay + 1, ex, ey + 1, hex('#2a2a38')); R.linea(ax + 1, ay, ex + 1, ey, hex('#2a2a38')); px = ex; py = ey; rest -= LEN[s]; }
  T.hoyDelante(R, t, o);
  const ent = ease(tramo(t, TODOS - 0.75, TODOS - 0.1)), sal = ease(tramo(t, HIST + 0.3, HIST + 0.72));
  if (ent > 0 && sal < 1) { const tx = px + Math.round(sal * 20), ty = py + Math.round((1 - ent) * 52 + sal * 56) + (u > 0 && u < 1 ? Math.round(Math.sin(t * 30) * 0.6) : 0);
    for (let i = 0; i <= 20; i++) { const x = Math.round(tx + i * 0.8), y = Math.round(ty + i * 0.75); R.rect(x - 1, y - 1, x + 2, y + 2, K); }
    for (let i = 1; i <= 20; i++) { const x = Math.round(tx + i * 0.8), y = Math.round(ty + i * 0.75); R.rect(x, y, x + 1, y + 1, i < 4 ? hex('#e8c89a') : i > 17 ? hex('#e88aa0') : hex('#f0c030')); if (i >= 4 && i <= 17) R.pset(x + 1, y, hex('#fff0a0')); }
    R.pset(tx, ty, K); R.pset(tx + 1, ty + 1, hex('#3a3a48'));
    manoAbajo(tx + 15, ty + 14, 1); }
  // las tres laten a la vez al cerrarse la llave
  if (u >= 1 && t < HIST + 0.8) { const d = (t - HIST - 0.25) / 0.55; for (const cx of CX) for (let a = 0; a < 16; a++) { const an = a * Math.PI / 8; const x = Math.round(cx + Math.cos(an) * (34 + d * 8)), y = Math.round(96 + Math.sin(an) * (34 + d * 8)); if (y > 48 && y < 152) R.pset(x, y, a & 1 ? ORO : BL); } }
};

// ── 2 · el titular y la lupa: ¿quién lo ha comprobado? ───────────────────────────────────────────────────────────────
const LEES = w(6.35), HALLADA = w(7.83), SABES = w(8.61), PREG = w(9.15), QUIEN = w(9.55);
const titular = (x, y, t) => {
  R.rect(x + 3, y + 3, x + 55, y + 63, hex('#3a2416')); R.rect(x - 1, y - 1, x + 53, y + 61, K); R.rect(x, y, x + 52, y + 60, BL); R.rect(x + 50, y + 2, x + 52, y + 60, hex('#d8d2c4')); R.rect(x, y + 58, x + 52, y + 60, hex('#d8d2c4'));
  R.rect(x, y, x + 52, y + 4, hex('#2a3a5a')); for (let i = 3; i < 50; i += 3) R.pset(x + i, y + 2, hex('#8aa0c8'));
  // la foto: un barco sobre el agua
  R.rect(x + 3, y + 8, x + 31, y + 33, K); R.rect(x + 4, y + 9, x + 30, y + 32, hex('#bfe0f4')); R.rect(x + 4, y + 26, x + 30, y + 32, hex('#3a8ad8'));
  for (let i = 0; i < 27; i++) if ((i + Math.floor(t * 3)) % 4 < 2) R.pset(x + 4 + i, y + 26 + ((i >> 1) & 1), hex('#bfe6ff'));
  R.icono('barco', x + 10, y + 12, hex('#6a3e1c'), hex('#3a2010'), 2);
  // el «!» grande y las rayas del texto
  const b = t >= HALLADA && t < HALLADA + 0.5 ? Math.round(Math.abs(Math.sin((t - HALLADA) * 13)) * 4 * (1 - (t - HALLADA) / 0.5)) : 0;
  R.icono('!', x + 37, y + 9 - b, ROJO, hex('#8a2418'), 4);
  if (t >= HALLADA && t < HALLADA + 0.45) { const d = (t - HALLADA) / 0.45; for (let a = 0; a < 8; a++) { const an = -Math.PI + a * Math.PI / 7; R.pset(Math.round(x + 43 + Math.cos(an) * (9 + d * 8)), Math.round(y + 12 + Math.sin(an) * (9 + d * 8)), ROJO); } }
  for (let k = 0; k < 6; k++) R.rect(x + 4, y + 38 + k * 4, x + (k === 2 ? 30 : k === 5 ? 22 : 47), y + 38 + k * 4, hex('#a8a6a0'));
};
const p2 = (t) => {
  const o = { encuadre: 'estudio', camara: 'mesa', mira: true, gatoMira: 1 };
  T.hoy(R, t, o);
  T.g_barquito(R, 160 + Math.round(Math.sin(t * 0.7) * 6), 109, 21, t, {});
  // el lápiz del borde
  R.linea(190, 177, 236, 172, hex('#3a2416')); R.linea(188, 175, 234, 170, hex('#f0c030')); R.linea(188, 174, 234, 169, hex('#fff0a0')); R.linea(188, 176, 234, 171, hex('#b8862a')); R.rect(234, 169, 238, 171, hex('#e88aa0')); R.linea(184, 175, 187, 175, hex('#e8c89a')); R.pset(183, 175, K);
  // el titular: una mano lo deja a la derecha en «read»
  const TX = 240, TY = 113, ent = ease(tramo(t, P2 + 0.2, LEES - 0.05)), dx = Math.round((1 - ent) * 92), sal = ease(tramo(t, LEES + 0.1, LEES + 0.7));
  titular(TX + dx, TY, t);
  if (sal < 1) T.brazo(R, TX + dx + 96 + Math.round(sal * 40), TY + 52, TX + dx + 60 + Math.round(sal * 44), TY + 34, MANGA, -1, { codo: [TX + dx + 82 + Math.round(sal * 40), TY + 38] });
  // la lupa: en reposo en el borde; una mano la coge, la pasa por delante de la pecera y la pone sobre el «!»
  const va = tramo(t, SABES - 0.15, PREG + 0.1), e = ease(va), coge = tramo(t, SABES - 0.75, SABES - 0.15);
  const lx = lerp(44, TX + 41, e), ly = lerp(160, TY + 19, e) - Math.sin(va * Math.PI) * 22 + (va >= 1 ? Math.sin(t * 2.2) * 1.2 : 0);
  const [hx, hy] = lupa(lx, ly, 17, 1, t >= QUIEN ? (cx, cy, ri) => { const d = t - QUIEN;
    for (let j = -ri; j <= ri; j++) for (let i = -ri; i <= ri; i++) if (i * i + j * j <= ri * ri) R.pset(cx + i, cy + j, d < 0.12 ? BL : hex('#f6f2ea'));
    const b = d < 0.4 ? Math.round(Math.sin(d / 0.4 * Math.PI) * 2) : 0; R.icono('?', cx - 7, cy - 11 - b, Math.sin(t * 5) > 0 ? ROJO : ROJOL, hex('#8a2418'), 3); } : null);
  if (coge > 0) { const sube = Math.round((1 - ease(coge)) * 34); manoAbajo(hx + 1, hy + sube, 1); }
  if (t >= QUIEN && t < QUIEN + 0.5) { const d = (t - QUIEN) / 0.5; for (let a = 0; a < 14; a++) { const an = a * Math.PI / 7; R.pset(Math.round(lx + Math.cos(an) * (19 + d * 12)), Math.round(ly + Math.sin(an) * (19 + d * 12)), a & 1 ? ORO : BL); } }
};

// ── 3 · gag 8: el pez capitán ────────────────────────────────────────────────────────────────────────────────────────
const SALTA = P3 + 0.3, CAE = SALTA + 0.8, BAJA = w(11.38), HONESTA = w(11.46), NOCONF = w(12.84);
const p3 = (t) => {
  const o = { encuadre: 'estudio', pecera: false, pez: false };
  T.hoy(R, t, o);
  T.hoyDelante(R, t, o);
  for (let i = -23; i <= 25; i++) if (i & 1) R.pset(152 + i + 3, 131, hex('#3a2416'));
  const pe = T.g_pecera(R, 152, 130, 31, t, { pez: false }), [wx, wy] = pe.agua, medio = pe.medio;
  const nav = t >= CAE ? Math.sin((t - CAE) * 1.1) * Math.max(0, medio - 19) : 0, bx = Math.round(wx - 2 + nav), hunde = t >= CAE && t < CAE + 0.25 ? 2 : 0;
  // el pez: nada bajo el barquito, toma impulso, salta por encima del borde y cae dentro
  if (t < SALTA) { const q = tramo(t, P3, SALTA); T.g_pez(R, Math.round(wx - 4 - q * 8), Math.round(wy + 12 + q * 8), 5, t, { dir: 1, mira: true }); }
  else if (t < CAE) { const q = (t - SALTA) / (CAE - SALTA), fx = lerp(wx - 12, bx + 10, q), fy = lerp(wy + 16, wy - 7, q) - Math.sin(q * Math.PI) * 44;
    T.g_pez(R, Math.round(fx), Math.round(fy), 6, t, { dir: 1 });
    for (let k = 0; k < 6; k++) { const f = q * 1.4 - k * 0.07; if (f > 0.15 && f < 1) R.pset(Math.round(lerp(wx - 12, bx + 7, f * 0.8) - 3 - k), Math.round(lerp(wy + 16, wy - 7, f * 0.8) - Math.sin(f * 0.8 * Math.PI) * 44 + 5 + k * 2), k & 1 ? hex('#d8f4ff') : hex('#8ad0f0')); } }
  T.g_barquito(R, bx, wy + hunde, 18, t, { pez: t >= CAE });
  // la gorra de capitán del pez (blanca, con su visera azul), que le cae justo después
  if (t >= CAE + 0.15) { const bob = Math.round(Math.sin(t * 2.1) * 1.26), q = tramo(t, CAE + 0.15, CAE + 0.45), fxh = bx + 10 + 4, fyh = wy + hunde - 8 + bob - 4 - 6 - Math.round((1 - q * q) * 26);
    R.rect(fxh - 3, fyh - 3, fxh + 3, fyh, K); R.rect(fxh - 2, fyh - 2, fxh + 2, fyh - 1, BL); R.rect(fxh - 3, fyh, fxh + 5, fyh, hex('#22386a')); R.pset(fxh, fyh - 2, ORO); }
  for (const [s0, sx] of [[SALTA + 0.12, wx - 10], [CAE, bx + 5]]) if (t >= s0 && t < s0 + 0.5) { const s = (t - s0) / 0.5; for (let k = 0; k < 12; k++) { const an = Math.PI * (1.08 + 0.84 * k / 11), r = 5 + s * 17; R.pset(Math.round(sx + Math.cos(an) * r), Math.round(wy + Math.sin(an) * r * 1.2 + s * s * 14), k & 1 ? hex('#d8f4ff') : hex('#8ad0f0')); } }
  // Atom baja de su esquina a mirar la pecera
  const v = tramo(t, BAJA - 0.35, BAJA + 0.75), pos = (vv) => { const ee = ease(vv); return [lerp(297, 208, ee), lerp(24, 90, ee) - Math.sin(vv * Math.PI) * 8]; };
  if (v <= 0) comp0(t, E.energia(t));
  else { const [ax, ay] = pos(v), by = v >= 1 ? Math.sin(t * 2.4) * 2 : 0;
    if (v < 1) for (let k = 1; k <= 7; k++) { const [qx, qy] = pos(Math.max(0, v - k * 0.04)); R.pset(Math.round(qx), Math.round(qy), hex('#c8f0ff')); if (k % 2) R.pset(Math.round(qx) + 1, Math.round(qy) + 1, BL); }
    atomAbajo(ax, ay + by, t, { r: Math.round(lerp(10, 12, ease(v))), e: v < 1 ? 0.8 : 0.45 });
    if (v >= 1 && t < BAJA + 1.2) chispas(ax, ay, t, 21, 10, hex('#c8f0ff'));
    // «not confirmed»: su globo, con la casilla vacía y su «?»
    if (t >= NOCONF - 0.05) { const q = ease(tramo(t, NOCONF - 0.05, NOCONF + 0.15)), gx = 236, gy = Math.round(60 - q * 5 + (q >= 1 ? Math.sin(t * 2.4) * 1 : 0));
      globo(gx, gy, 15, 13, 224); R.rect(gx - 9, gy - 9, gx + 9, gy + 9, K); R.rect(gx - 7, gy - 7, gx + 7, gy + 7, BL); R.rect(gx - 7, gy + 6, gx + 7, gy + 7, hex('#d8d2c4'));
      if (q >= 1) R.icono('?', gx - 5, gy - 7, Math.sin(t * 4) > 0 ? ROJO : ROJOL, null, 2); } }
};
const efectos = [[C1, 'aldea'], [C2, 'aldea'], [C3, 'aldea'], [TODOS, 'lapiz'], [P2 + 0.7, 'papel'], [HALLADA, 'golpecito'], [QUIEN, 'brillo'], [SALTA + 0.1, 'burbujas'], [CAE, 'chof'], [NOCONF, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')
