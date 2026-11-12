E = {}

COMUN = r'''
const K = hex('#17151d'), BL = hex('#f6f2ea'), ORO = hex('#ffd860'), OROL = hex('#fff4b8'), ROJO = hex('#d8402c'), PZ = T.PIEZAS_DU;
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const ease = (u) => u * u * (3 - 2 * u);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const destello = (x, y, r, c = BL) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } if (r > 1) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); R.pset(x + 1, y + 1, c); } };
// un fondo fijo pintado por la escena: se pinta una vez en su búfer y luego se copia
const bufs = {};
const fondo = (k, fn) => { if (!bufs[k]) { const b = R.nuevo(), prev = R.usar(b); fn(); R.usar(prev); bufs[k] = b; } R.copiar(bufs[k]); };
// pinta fn y tiñe con col (en la proporción a) solo los píxeles que ha cambiado dentro de la caja: la luz de noche de los
// decorados va en su búfer, así los actores y las piezas de la escena se tiñen aquí
const tenido = (x0, y0, x1, y1, col, a, fn) => {
  x0 = Math.max(0, Math.round(x0)); y0 = Math.max(0, Math.round(y0)); x1 = Math.min(319, Math.round(x1)); y1 = Math.min(179, Math.round(y1));
  if (x1 < x0 || y1 < y0) return fn();
  const w = x1 - x0 + 1, s = new Uint32Array(w * (y1 - y0 + 1));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) s[(y - y0) * w + x - x0] = R.pget(x, y);
  const r = fn();
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = R.pget(x, y); if (c !== s[(y - y0) * w + x - x0]) R.pset(x, y, mez(c, col, a)); }
  return r;
};
// madera con vetas (c: el tono de base)
const veta = (x0, y0, x1, y1, c, k = 0) => {
  const cs = mez(c, K, 0.2), cl = mez(c, BL, 0.13);
  R.rect(x0, y0, x1, y1, c);
  for (let y = y0; y <= y1; y++) { const r = hh(y, k, 3); if (r < 0.42) { let x = x0 - Math.floor(hh(y, k, 4) * 30); while (x < x1) { const l = 10 + Math.floor(hh(x, y, 5) * 46); R.rect(Math.max(x0, x), y, Math.min(x1, x + l), y, r < 0.24 ? cs : cl); x += l + 5 + Math.floor(hh(x, y, 6) * 26); } } }
};
// un lápiz, de la punta (tx, ty) a donde lo agarra la mano (gx, gy)
const lapiz = (tx, ty, gx, gy, col = hex('#e8b830')) => {
  const n = Math.max(1, Math.ceil(Math.hypot(gx - tx, gy - ty))), cl = mez(col, BL, 0.4), cs = mez(col, K, 0.3);
  for (let i = 2; i <= n; i++) { const x = Math.round(tx + (gx - tx) * i / n), y = Math.round(ty + (gy - ty) * i / n); R.rect(x - 2, y - 1, x + 2, y + 1, K); R.rect(x - 1, y - 2, x + 1, y + 2, K); }
  for (let i = 0; i <= n; i++) { const x = Math.round(tx + (gx - tx) * i / n), y = Math.round(ty + (gy - ty) * i / n);
    if (i < 2) R.pset(x, y, K); else if (i < 7) { R.rect(x - (i > 4 ? 1 : 0), y - (i > 4 ? 1 : 0), x + (i > 3 ? 1 : 0), y + (i > 3 ? 1 : 0), hex('#e8c89a')); }
    else { R.rect(x - 1, y - 1, x + 1, y + 1, col); R.pset(x - 1, y - 1, cl); R.pset(x + 1, y + 1, cs); } }
};
// un camello con su jinete, NUESTRO (sin cara, de lejos): (x, y) los pies, dir, c = { b cuerpo, s sombra, l luz, r túnica,
// t pañuelo, f bandera }; o.s escala, o.quieto, o.bandera 0–1 (sube el asta con su banderín), o.fase
const camello = (x, y, dir, t, c, o = {}) => {
  const s = o.s ?? 1;
  const P = (i, j, col) => { const px = Math.round(x) + dir * i * s - (dir < 0 ? s - 1 : 0), py = Math.round(y) - j * s - (s - 1); if (s === 1) R.pset(px, py, col); else for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) R.pset(px + a, py + b, col); };
  const B = (i0, j0, i1, j1, col) => { for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) P(i, j, col); };
  const f = o.quieto ? -1 : Math.floor(t * 3.2 + (o.fase ?? 0)) % 2, u = f === 1 ? 1 : 0;
  B(-4, f === 1 ? 1 : 0, -4, 6, c.s); B(3, f === 0 ? 1 : 0, 3, 6, c.s); P(f === 1 ? -3 : -5, 3, c.s); P(f === 0 ? 2 : 4, 3, c.s);
  B(-6, f === 0 ? 1 : 0, -6, 6, c.b); B(-7, 4, -7, 6, c.b); B(6, f === 1 ? 1 : 0, 6, 6, c.b); B(5, 4, 5, 6, c.b); P(-5, f === 0 ? 1 : 0, c.b); P(7, f === 1 ? 1 : 0, c.b);
  B(-7, 7 + u, 7, 11 + u, c.b); B(-6, 7 + u, 6, 7 + u, c.s); B(-7, 11 + u, 6, 11 + u, c.l); B(-3, 12 + u, 3, 13 + u, c.b); B(-2, 14 + u, 2, 14 + u, c.l);
  P(-8, 10 + u, c.b); P(-9, 9 + u, c.b); P(-9, 8 + u, c.b); P(-9, 7 + u, c.s);
  B(7, 10 + u, 9, 12 + u, c.b); B(9, 12 + u, 10, 16 + u, c.b); B(10, 16 + u, 13, 18 + u, c.b); B(10, 16 + u, 13, 16 + u, c.s); P(14, 16 + u, c.b); P(14, 17 + u, c.b); P(10, 19 + u, c.b); B(10, 18 + u, 12, 18 + u, c.l); P(12, 17 + u, c.s);
  if (c.r) {
    B(-2, 15 + u, 2, 20 + u, c.r); B(-3, 15 + u, -3, 18 + u, c.rs ?? c.r); B(-2, 15 + u, 2, 15 + u, c.rs ?? c.r); P(3, 15 + u, c.r); P(3, 14 + u, c.r);
    B(-1, 21 + u, 2, 23 + u, c.t); P(-2, 21 + u, c.t); P(-2, 20 + u, c.t); P(-3, 19 + u, c.t); P(2, 21 + u, c.p ?? c.t);
    if (o.bandera > 0) { const hgt = Math.round(o.bandera * 10); B(4, 16 + u, 4, 18 + u + hgt, c.m ?? c.s);
      if (hgt > 6) for (let k = 0; k < 7; k++) { const w = Math.round(Math.sin(t * 7 + k * 0.9 + (o.fase ?? 0))); for (let j = 0; j < (k < 5 ? 3 : 2); j++) P(3 - k, 18 + u + hgt - j + w, k % 4 === 3 ? c.fs ?? c.f : c.f); } }
  }
};
// la lupa: aumenta lo que hay debajo; el mango baja a la derecha hasta la mano (T.brazo desde el borde de abajo)
const lupa = (cx, cy, r, manga, o = {}) => {
  cx = Math.round(cx); cy = Math.round(cy); const z = o.z ?? 1.6, n = 2 * r + 1, src = new Uint32Array(n * n);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) src[(j + r) * n + i + r] = R.pget(cx + Math.round(i / z), cy + Math.round(j / z));
  const hx = cx + Math.round(r * 0.72), hy = cy + Math.round(r * 0.72);
  for (let k = 0; k <= 20; k++) { const x = hx + Math.round(k * 0.6), y = hy + Math.round(k * 0.8); R.rect(x - 2, y - 2, x + 2, y + 2, K); }
  for (let k = 0; k <= 20; k++) { const x = hx + Math.round(k * 0.6), y = hy + Math.round(k * 0.8); R.rect(x - 1, y - 1, x + 1, y + 1, k < 4 ? hex('#d8a83a') : hex('#7a4a26')); R.pset(x - 1, y - 1, k < 4 ? OROL : hex('#a86a3a')); }
  R.disco(cx + 0.5, cy + 0.5, r + 3.6, K); R.disco(cx + 0.5, cy + 0.5, r + 2.6, hex('#d8a83a')); R.disco(cx + 0.5, cy + 0.5, r + 1.2, hex('#8a6420')); R.disco(cx + 0.5, cy + 0.5, r + 0.4, K);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d <= r - 0.3) R.pset(cx + i, cy + j, mez(src[(j + r) * n + i + r], hex('#e6f6ff'), d > r - 2.5 ? 0.3 : 0.08)); }
  for (let a = 3.5; a < 4.5; a += 0.06) { R.pset(cx + Math.round(Math.cos(a) * (r - 3)), cy + Math.round(Math.sin(a) * (r - 3)), BL); if (a > 3.8 && a < 4.2) R.pset(cx + Math.round(Math.cos(a) * (r - 4)), cy + Math.round(Math.sin(a) * (r - 4)), BL); }
  for (let a = 0.5; a < 1.1; a += 0.1) R.pset(cx + Math.round(Math.cos(a) * (r + 2)), cy + Math.round(Math.sin(a) * (r + 2)), OROL);
  const wx = hx + 21, wy = hy + 15;
  T.brazo(R, wx + (o.hombro?.[0] ?? 12), Math.max(wy + 22, 188), wx, wy, manga, -1, { sombra: o.sombra ?? false });
};
'''

E['du-pregunta'] = ('La pregunta', '''// DU-PREGUNTA (frases 7–8), sin cartela. Siete planos:
// 1. (1958) la mesa de Herbert de cerca, de noche: una mano va dejando en la carpeta tres libros, uno por palabra
//    («deserts», la duna; «ecology», la hoja; «religions», el templo), y tamborilea sobre el último;
// 2. el globo terráqueo: un lápiz toca tres veces los desiertos («peoples… no water»: tiendas y la gota tachada en el
//    bocadillo); en «question» el bocadillo se vuelve un «?» y en «whole planet… desert» el globo se hace todo de arena;
// 3. (1959) el planeta desde el espacio: en «most valuable thing» se le encienden destellos naranjas; los otros mundos,
//    apagados, reciben su X y en «only there» lo rodean los anillos;
// 4. inserto, la balda de historia: una mano se lleva un libro («borrowed»); en «Lawrence» la foto antigua del jinete
//    cobra vida (el camello echa a andar, el cristal brilla); el gato de la balda mueve la cola;
// 5. el planeta, al ocaso: el oficial de blanco sube la duna y en «joined» se da la vuelta y se pone al frente de la
//    columna; en «revolt» suben los banderines; en «readers discovered» entra la lupa y los repasa;
// 6. (1960) inserto, el libro de las montañas en la mesa de una biblioteca: la lupa pasa por los renglones y en «words»
//    y «proverbs» las rayas se encienden y se despegan; en «1960» cae la ficha con su sello; en «Caucasus» la lupa va al
//    grabado y dos banderines asoman en las cumbres; las rayas salen volando;
// 7. inserto, el cuaderno de Herbert: las rayas llegan sobre el recorte de las montañas, en «moved» cruzan la espiral y
//    en «sand» se posan bajo el planeta dibujado; la nieve del recorte se vuelve arena y llena las dunas; el lápiz sombrea.''', COMUN + r'''
const wl = (s) => en('leer', (s - 0.9) / 15.541), wr = (s) => en('lawrence', (s - 17.036) / 19.06);
const P2 = wl(5.64), P3 = wl(12.53), P4 = wr(17.04), P5 = wr(21.54), P6 = wr(27.31), P7 = wr(32.77);
const NOCHE = hex('#2a2450');

// ── 1 · la mesa: tres libros, uno por palabra ───────────────────────────────────────────────────────────────────────
const DL = [wl(2.24), wl(3.18), wl(4.28)], SX = [128, 170, 212], SY = [163, 170, 161];
const tomo = (x, y, k) => {   // un libro cerrado visto desde arriba, 36 × 46; (x, y) = el centro de abajo
  const [c, cs, cl] = [['#c8742c', '#8a4418', '#f6c468'], ['#3c7a4c', '#1e4a30', '#9ad888'], ['#5a3c8a', '#33205a', '#d0b4f6']][k].map(hex), x0 = x - 18, y0 = y - 46;
  for (let j = 1; j <= 3; j++) for (let i = x0 + 2; i <= x0 + 38; i++) if ((i + j) & 1 || j < 2) R.pset(i, y + j, mez(R.pget(i, y + j), K, 0.45));
  R.rect(x0 - 1, y0 - 1, x0 + 36, y, K); R.rect(x0, y0, x0 + 35, y - 1, c); R.rect(x0, y0, x0 + 4, y - 1, cs); R.rect(x0 + 5, y0, x0 + 5, y - 1, mez(c, BL, 0.3));
  R.rect(x0 + 33, y0 + 1, x0 + 35, y - 2, BL); for (let j = y0 + 3; j < y - 2; j += 3) R.pset(x0 + 34, j, hex('#b8b0a0')); R.rect(x0 + 6, y - 2, x0 + 35, y - 1, hex('#e8dcc0'));
  R.rect(x0 + 8, y0 + 3, x0 + 30, y0 + 3, cl); R.rect(x0 + 8, y - 6, x0 + 30, y - 6, cl); R.rect(x0 + 11, y0 + 7, x0 + 27, y0 + 8, OROL); R.rect(x0 + 14, y0 + 11, x0 + 24, y0 + 11, ORO);
  const ex = x0 + 9, ey = y0 + 15; R.rect(ex - 1, ey - 1, ex + 22, ey + 20, K); R.rect(ex, ey, ex + 21, ey + 19, cs);
  if (k === 0) { R.rect(ex, ey, ex + 21, ey + 8, hex('#f8d888')); R.disco(ex + 15.5, ey + 5.5, 3.2, hex('#fff6c8')); R.poligono([[ex, ey + 19], [ex, ey + 11], [ex + 8, ey + 6], [ex + 15, ey + 12], [ex + 21, ey + 9], [ex + 21, ey + 19]], hex('#e08a40')); R.poligono([[ex + 8, ey + 6], [ex + 15, ey + 12], [ex + 12, ey + 19], [ex + 5, ey + 19]], hex('#b85a24')); R.linea(ex + 1, ey + 15, ex + 5, ey + 13, hex('#f6c468')); R.linea(ex + 15, ey + 16, ex + 20, ey + 14, hex('#f6c468')); }
  else if (k === 1) { R.rect(ex, ey, ex + 21, ey + 19, hex('#e8f0d0')); R.poligono([[ex + 4, ey + 16], [ex + 5, ey + 8], [ex + 11, ey + 3], [ex + 18, ey + 3], [ex + 17, ey + 10], [ex + 11, ey + 16]], hex('#3c9a4c')); R.poligono([[ex + 4, ey + 16], [ex + 11, ey + 16], [ex + 17, ey + 10], [ex + 18, ey + 3]], hex('#2a7438')); R.linea(ex + 3, ey + 18, ex + 17, ey + 4, hex('#1e4a30')); R.linea(ex + 9, ey + 12, ex + 9, ey + 7, hex('#1e4a30')); R.linea(ex + 12, ey + 9, ex + 16, ey + 9, hex('#1e4a30')); R.pset(ex + 17, ey + 15, hex('#5aa8e0')); R.rect(ex + 16, ey + 16, ex + 18, ey + 17, hex('#5aa8e0')); }
  else { R.rect(ex, ey, ex + 21, ey + 19, hex('#f0dca8')); R.poligono([[ex + 2, ey + 7], [ex + 11, ey + 1], [ex + 19, ey + 7]], hex('#c89a3a')); R.rect(ex + 2, ey + 7, ex + 19, ey + 8, hex('#8a6420')); for (let i = 0; i < 4; i++) { R.rect(ex + 3 + i * 5, ey + 9, ex + 4 + i * 5, ey + 16, hex('#fff6dc')); R.rect(ex + 5 + i * 5, ey + 9, ex + 5 + i * 5, ey + 16, hex('#c89a3a')); } R.rect(ex + 1, ey + 17, ex + 20, ey + 17, hex('#c89a3a')); R.rect(ex, ey + 18, ex + 21, ey + 19, hex('#8a6420')); R.disco(ex + 11, ey + 5, 1.2, hex('#fff6dc')); }
};
const p1 = (t) => {
  const g = T.casa(R, t, { encuadre: 'cuarto', camara: 'mesa', epoca: 1963, notas: 0.7, escribe: 0.45 });
  // la foto antigua de la mesa: un jinete diminuto en una duna (la misma de la balda del plano 4)
  { const [fx0, fy0, fx1, fy1] = g?.foto ?? [209, 27, 237, 47]; R.rect(fx0, fy0, fx1, fy1, hex('#e8cfa0')); R.rect(fx0, fy0, fx1, fy0 + 6, hex('#f0dcb4')); R.disco(fx1 - 6, fy0 + 6, 2.6, hex('#fff0d0'));
    R.recorte([fx0, fy0, fx1, fy1]); R.poligono([[fx0, fy1], [fx0, fy1 - 7], [fx0 + 10, fy1 - 10], [fx0 + 20, fy1 - 6], [fx1, fy1 - 9], [fx1, fy1]], hex('#c8a070')); R.poligono([[fx0 + 10, fy1 - 10], [fx0 + 20, fy1 - 6], [fx0 + 16, fy1], [fx0 + 6, fy1]], hex('#9a7448'));
    const cx = fx0 + 11, cy = fy1 - 9; R.rect(cx - 3, cy - 4, cx + 3, cy - 2, hex('#3a2a1c')); R.rect(cx - 3, cy - 1, cx - 3, cy, hex('#3a2a1c')); R.rect(cx + 3, cy - 1, cx + 3, cy, hex('#3a2a1c')); R.rect(cx + 4, cy - 6, cx + 5, cy - 4, hex('#3a2a1c')); R.pset(cx + 6, cy - 6, hex('#3a2a1c')); R.rect(cx - 1, cy - 7, cx + 1, cy - 5, hex('#6a4c30')); R.rect(cx, cy - 9, cx + 1, cy - 8, hex('#f6ead0')); R.recorte(null); }
  // los libros: el que viene en la mano y los que ya están
  for (let k = 0; k < 3; k++) {
    const a = DL[k] - (k ? 0.72 : 1.85), u = tramo(t, a, DL[k]); if (u <= 0) continue;
    const e = ease(u), bote = t >= DL[k] && t < DL[k] + 0.18 ? 1 : 0;
    const bx = Math.round(lerp(SX[k] + 34, SX[k], e)), by = Math.round(lerp(SY[k] + 66, SY[k], e)) + bote;
    tenido(bx - 20, by - 48, bx + 22, by + 4, NOCHE, 0.14, () => tomo(bx, by, k));
    if (u >= 1 && t < DL[k] + 0.3) { const d = (t - DL[k]) / 0.3; for (let i = 0; i < 5; i++) R.pset(bx - 20 - Math.round(d * (3 + i)), by - 2 - i * 9, hex('#e8dcc0')); for (let i = 0; i < 5; i++) R.pset(bx + 20 + Math.round(d * (3 + i)), by - 6 - i * 8, hex('#e8dcc0')); }
    // la mano: lo trae agarrado por la esquina y se retira; sobre el tercero se queda y tamborilea
    const fuera = k < 2 ? ease(tramo(t, DL[k] + 0.08, DL[k] + 0.34)) : 0, sig = k < 2 && t >= DL[k + 1] - 0.72;
    if (!sig && fuera < 1) { const tam = k === 2 && t > DL[2] + 0.35 && Math.sin((t - DL[2]) * 15) > 0.2 ? -2 : 0;
      const mx = bx + 27 + Math.round(fuera * 16), my = by - 12 + Math.round(fuera * 50) + tam;
      T.brazo(R, mx + 12, my + 46, mx, my, '#6a4a2e', -1, { codo: [mx + 13, my + 22] }); }
  }
  // un destello recorre las tres tapas al final
  if (t > DL[2] + 0.5) for (let k = 0; k < 3; k++) { const d = t - DL[2] - 0.5 - k * 0.22; if (d >= 0 && d < 0.35) destello(SX[k] - 6 + Math.round(d * 30), SY[k] - 38 + Math.round(d * 30), d < 0.18 ? 3 : 2, BL); }
};

// ── 2 · el globo: los pueblos del desierto, la pregunta y el planeta de arena ───────────────────────────────────────
const TA = [wl(6.22), wl(6.98), wl(7.84)], SP = [[190, 76], [184, 93], [181, 63]], QUE = wl(9.5), AR0 = wl(10.45), AR1 = wl(12.2);
const p2 = (t) => {
  const ar = ease(tramo(t, AR0, AR1)), o = { encuadre: 'orbita', camara: 'globo', arena: ar, t0: P2 };
  T.planeta(R, t, o);
  // el bocadillo sobre el globo: dos tiendas y la gota tachada; luego, la pregunta
  const nb = TA.filter((a) => t >= a).length, q = t >= QUE;
  if (nb > 0) { const pop = TA.some((a) => t >= a && t < a + 0.1) || (q && t < QUE + 0.12) ? 1 : 0, bob = q ? Math.round(Math.sin(t * 3)) : 0, y0 = 17 - pop + bob, x0 = q ? 146 : 128, x1 = q ? 174 : 192;
    R.rect(x0 + 2, y0 - 1, x1 - 2, y0 + 23, K); R.rect(x0 - 1, y0 + 2, x1 + 1, y0 + 20, K); R.rect(x0 + 1, y0, x1 - 1, y0 + 22, K); R.rect(x0, y0 + 1, x1, y0 + 21, K);
    R.rect(x0 + 2, y0, x1 - 2, y0 + 22, BL); R.rect(x0, y0 + 2, x1, y0 + 20, BL); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 21, BL); R.rect(x0 + 2, y0 + 21, x1 - 2, y0 + 22, hex('#d8d0c0'));
    if (q) { R.disco(158, y0 + 28, 2.4, K); R.disco(158, y0 + 28, 1.5, BL); R.disco(161, y0 + 33, 1.6, K); R.pset(161, y0 + 33, BL); R.icono('?', 153, y0 + 4, hex('#c8642c'), hex('#5e262e'), 2); if (ar > 0.2) { destello(149, y0 + 5, 1, ORO); destello(171, y0 + 16, 1, ORO); } }
    else { R.poligono([[154, y0 + 23], [166, y0 + 23], [160, y0 + 29]], K); R.poligono([[156, y0 + 22], [164, y0 + 22], [160, y0 + 26]], BL);
      const tienda = (x) => { R.poligono([[x, y0 + 17], [x + 7, y0 + 6], [x + 14, y0 + 17]], hex('#8a4a2a')); R.poligono([[x + 7, y0 + 6], [x + 14, y0 + 17], [x + 9, y0 + 17]], hex('#5e3018')); R.poligono([[x + 5, y0 + 17], [x + 7, y0 + 12], [x + 9, y0 + 17]], K); R.linea(x + 7, y0 + 6, x + 7, y0 + 3, K); R.rect(x + 8, y0 + 3, x + 10, y0 + 4, ROJO); R.rect(x - 1, y0 + 18, x + 15, y0 + 18, hex('#e8b060')); };
      tienda(132); if (nb > 1) tienda(152);
      if (nb > 2) { R.icono('gota', 174, y0 + 5, hex('#4a9ae0'), hex('#1e4a8a'), 2); R.linea(172, y0 + 3, 189, y0 + 20, ROJO); R.linea(173, y0 + 3, 190, y0 + 20, ROJO); R.linea(189, y0 + 3, 172, y0 + 20, ROJO); R.linea(190, y0 + 3, 173, y0 + 20, ROJO); } } }
  // la mano con el lápiz: entra por la derecha, toca tres veces el globo y se va
  const ent = ease(tramo(t, P2 + 0.05, P2 + 0.5)), sal = ease(tramo(t, TA[2] + 0.55, TA[2] + 1.1));
  if (sal < 1) {
    let k = 0; while (k < 2 && t > (TA[k] + TA[k + 1]) / 2) k++;
    const kp = Math.max(0, k - 1), mov = k === 0 ? 1 : ease(tramo(t, (TA[kp] + TA[k]) / 2, (TA[kp] + TA[k]) / 2 + 0.22));
    const px = lerp(SP[kp][0], SP[k][0], mov), py = lerp(SP[kp][1], SP[k][1], mov);
    const d = Math.abs(t - TA[k]), atras = d < 0.07 ? 0 : Math.min(7, 2 + d * 16);
    const off = (1 - ent) * 70 + sal * 80, tx = Math.round(px + atras + off), ty = Math.round(py + atras * 0.2 + off * 0.12), gx = tx + 72, gy = ty + 15;
    lapiz(tx, ty, gx, gy); T.brazo(R, gx + 50, gy + 14, gx + 8, gy + 1, '#6a4a2e', -1, { sombra: false });
    TA.forEach((a, j) => { const e = t - a; if (e >= 0 && e < 0.3) { R.anillo(SP[j][0] + 0.5, SP[j][1] + 0.5, 2 + e * 22, e < 0.15 ? BL : OROL); R.anillo(SP[j][0] + 0.5, SP[j][1] + 0.5, 1 + e * 12, ORO); } });
  }
  T.planetaDelante(R, t, o);
};

// ── 3 · el planeta desde el espacio: lo más valioso del universo, solo allí ─────────────────────────────────────────
const VAL = wl(13.31), UNI = wl(14.53), SOLO = wl(15.55);
const MUNDOS = [[30, 58, 6, '#7a8aa6'], [296, 136, 8, '#8a7a9a'], [40, 154, 5, '#6a9a96']];
const p3 = (t) => {
  T.planeta(R, t, { encuadre: 'orbita', t0: P3 });
  // los otros mundos, apagados; en «universe» cada uno recibe su X
  MUNDOS.forEach(([mx, my, r, c], k) => { const x = mx + Math.round(Math.sin(t * 0.4 + k * 2) * 2), y = my + Math.round(Math.cos(t * 0.3 + k) * 1.5), col = hex(c);
    R.disco(x + 0.5, y + 0.5, r + 1, K); R.disco(x + 0.5, y + 0.5, r, (px, py) => (px - x + (py - y) > r * 0.5 ? mez(col, K, 0.5) : px - x + (py - y) < -r * 0.6 ? mez(col, BL, 0.3) : col));
    R.pset(x - 1, y + 1, mez(col, K, 0.35)); R.pset(x + 2, y - 2, mez(col, K, 0.35)); if (k === 1) { R.linea(x - r - 3, y + 2, x + r + 3, y - 2, mez(col, BL, 0.4)); R.rect(x - 2, y - 1, x + 3, y + 1, col); }
    const e = t - (UNI + 0.1 + k * 0.28); if (e >= 0) { const s = e < 0.12 ? 3 : 2; R.icono('X', x - Math.round(2.5 * s) + 1, y - Math.round(2.5 * s) - (e < 0.12 ? 1 : 0), ROJO, K, s); } });
  // los destellos naranjas sobre el planeta, cada vez más
  const v = tramo(t, VAL, VAL + 1.6), solo = tramo(t, SOLO, SOLO + 0.5);
  for (let k = 0; k < 16; k++) { if (k / 16 > v) break; const an = hh(k, 1, 31) * 6.283, rd = Math.sqrt(hh(k, 2, 31)) * 48, x = 150 + Math.cos(an) * rd, y = 100 + Math.sin(an) * rd * 0.92, ph = (t * (1.4 + hh(k, 3, 31)) + hh(k, 4, 31) * 3) % 1.6;
    if (ph < 0.9) { const r = ph < 0.25 ? 1 : ph < 0.55 ? (k % 3 ? 2 : 3) : 1; destello(x, y, r, ph < 0.55 ? OROL : hex('#ffb040')); R.pset(Math.round(x), Math.round(y), BL); } else R.pset(Math.round(x), Math.round(y), hex('#ff9a30')); }
  // «only there»: los anillos lo rodean y laten
  if (solo > 0) { const late = Math.sin((t - SOLO) * 7) > 0 ? 1 : 0; R.anillo(150.5, 100.5, 64 + late, ORO, 6); R.anillo(150.5, 100.5, 65 + late, OROL, 6); if (solo >= 1) R.anillo(150.5, 100.5, 69 + late * 2, hex('#ffb040'), 10);
    for (let k = 0; k < 4; k++) { const an = k * 1.5708 + 0.785, r0 = 86 - Math.round(solo * 10) - late * 2, x = 150 + Math.cos(an) * r0, y = 100 + Math.sin(an) * r0 * 0.9; if (x < 270 || y > 50) destello(x, y, 2, OROL); } }
};

// ── 4 · inserto: la balda de historia y la foto antigua del jinete ──────────────────────────────────────────────────
const SACA = wr(17.3), LAW = wr(19.94), VIVA = wr(19.1);
const PALB = ['#7a2e2a', '#2e4a6a', '#3c5a3a', '#6a4a2a', '#4a2e5a', '#8a6a2e', '#2a3a4a', '#5a2a3a', '#a85a2a'];
const lomo = (x, base, w, hgt, c, lean = 0) => {
  const d = (j) => Math.round(lean * j / hgt);
  for (let j = 0; j <= hgt + 1; j++) R.rect(x - 1 + d(j), base - j, x + w + d(j), base - j, K);
  for (let j = 1; j <= hgt; j++) { const xx = x + d(j); R.rect(xx, base - j, xx + w - 1, base - j, c); R.pset(xx, base - j, mez(c, BL, 0.28)); R.pset(xx + w - 1, base - j, mez(c, K, 0.35)); }
  const oro = hex('#d8b25a'); for (const j of [5, 7, hgt - 4]) R.rect(x + 1 + d(j), base - j, x + w - 2 + d(j), base - j, oro);
  if (w > 6) { const j = Math.round(hgt * 0.55); R.rect(x + 2 + d(j), base - j - 3, x + w - 3 + d(j), base - j, mez(c, BL, 0.55)); R.rect(x + 3 + d(j), base - j - 2, x + w - 4 + d(j), base - j - 1, oro); }
};
const fondoBalda = () => {
  // el papel pintado, con su cenefa (tranquilo arriba)
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const s = (x >> 3) & 1, c = s ? hex('#2e4c4a') : hex('#294644'); R.pset(x, y, y < 22 ? hex('#243e3c') : c); }
  R.rect(0, 22, 319, 22, hex('#1a2c2c')); R.rect(0, 23, 319, 23, hex('#3e625e'));
  for (let y = 32; y < 180; y += 14) for (let x = 4 + ((y / 14) & 1) * 8; x < 320; x += 16) { if (x > 262 && y < 52) continue; const c = hex('#3e6460'); R.pset(x, y - 2, c); R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x, y, hex('#4a7670')); R.pset(x - 1, y + 1, c); R.pset(x + 1, y + 1, c); R.pset(x, y + 2, c); }
  // las fichas clavadas y su hilo rojo, bajo la balda y arriba a la izquierda
  const ficha = (x, y, w, hg, k) => { R.rect(x - 1, y - 1, x + w, y + hg, K); R.rect(x, y, x + w - 1, y + hg - 1, hex('#efe6cc')); R.rect(x, y + hg - 2, x + w - 1, y + hg - 1, hex('#cfc4a4')); for (let j = y + 4; j < y + hg - 3; j += 3) R.rect(x + 2, j, x + w - 3 - Math.floor(hh(j, k, 2) * 7), j, hex('#8a8690')); R.disco(x + w / 2, y + 1.5, 1.6, ROJO); R.pset(Math.round(x + w / 2) - 1, y + 1, hex('#ff8a70')); };
  // un plano viejo clavado (sin letras: costa, ruta de puntos y una cruz)
  R.rect(21, 27, 71, 67, K); R.rect(22, 28, 70, 66, hex('#e4d4a8')); R.poligono([[22, 28], [44, 28], [40, 38], [48, 46], [42, 56], [50, 66], [22, 66]], hex('#c8b47c')); for (let k = 0; k < 7; k++) R.rect(46 + k * 3, 40 + Math.round(Math.sin(k) * 3) + k * 2, 47 + k * 3, 40 + Math.round(Math.sin(k) * 3) + k * 2, hex('#8a4a2a')); R.icono('X', 64, 56, ROJO, hex('#8a4a2a'), 1); R.disco(46.5, 29.5, 1.6, ROJO);
  for (let y = 30; y < 66; y += 9) R.rect(24, y, 34 - (y % 4), y, hex('#a8946a'));
  ficha(86, 34, 26, 20, 1); ficha(118, 40, 20, 16, 2); ficha(246, 86, 24, 18, 5);
  R.linea(46, 30, 99, 36, hex('#c8362c')); R.linea(99, 36, 128, 42, hex('#c8362c')); R.linea(128, 42, 152, 70, hex('#c8362c')); R.linea(236, 80, 258, 88, hex('#c8362c'));
  ficha(14, 164, 30, 22, 3); ficha(52, 168, 24, 20, 4); ficha(196, 166, 28, 20, 6); ficha(286, 164, 26, 22, 7); R.linea(29, 166, 64, 170, hex('#c8362c')); R.linea(64, 170, 210, 168, hex('#c8362c')); R.linea(210, 168, 299, 166, hex('#c8362c'));
  // la balda y sus escuadras
  for (const x of [38, 282]) { R.rect(x - 1, 157, x + 3, 178, K); R.rect(x, 157, x + 2, 177, hex('#3a3a44')); R.linea(x + 3, 176, x + 20, 158, K); R.linea(x + 3, 175, x + 19, 158, hex('#5a5a66')); }
  R.rect(0, 149, 319, 158, K); veta(0, 150, 319, 155, hex('#8a5a30'), 7); R.rect(0, 150, 319, 150, hex('#c08a50')); R.rect(0, 156, 319, 157, hex('#5a3618'));
  for (let x = 0; x < 320; x++) for (let j = 0; j < 4; j++) if (j < 2 || (x + j) & 1) R.pset(x, 159 + j, mez(R.pget(x, 159 + j), K, 0.4 - j * 0.07));
  // los libros de la izquierda (queda el hueco del que se lleva la mano, x 62–73)
  { let x = 6, k = 0; for (const [w, hg, lean] of [[7, 38, 0], [9, 44, 0], [6, 34, 0], [8, 41, 0], [7, 36, 0], [10, 46, 0]]) { lomo(x, 149, w, hg, hex(PALB[k % PALB.length])); x += w + 1; k++; } }
  { let x = 90, k = 3; for (const [w, hg, lean] of [[8, 42, 0], [6, 35, 0], [9, 39, 0], [7, 44, 6]]) { lomo(x, 149, w, hg, hex(PALB[(k * 2) % PALB.length]), lean); x += w + 1 + (lean ? 2 : 0); k++; } }
  // la vasija de barro con su greca
  { const cx = 134; R.poligono([[cx - 5, 149], [cx - 10, 138], [cx - 9, 126], [cx - 4, 120], [cx - 4, 116], [cx + 4, 116], [cx + 4, 120], [cx + 9, 126], [cx + 10, 138], [cx + 5, 149]], K);
    R.poligono([[cx - 4, 148], [cx - 9, 138], [cx - 8, 127], [cx - 3, 121], [cx + 3, 121], [cx + 8, 127], [cx + 9, 138], [cx + 4, 148]], hex('#b8623a')); R.rect(cx - 3, 117, cx + 3, 120, hex('#c87a4a')); R.rect(cx - 4, 116, cx + 4, 116, hex('#8a3c20'));
    R.rect(cx - 8, 130, cx + 8, 131, hex('#3a2218')); for (let i = -7; i <= 7; i += 3) { R.pset(cx + i, 133, hex('#f0dcb4')); R.pset(cx + i + 1, 134, hex('#f0dcb4')); R.pset(cx + i, 135, hex('#f0dcb4')); } R.rect(cx - 8, 137, cx + 8, 137, hex('#3a2218'));
    for (let j = 122; j < 148; j++) { R.pset(cx - 7 + (j > 138 ? Math.round((j - 138) * 0.4) : j < 127 ? 127 - j : 0), j, hex('#e08a5a')); R.pset(cx + 7 - (j > 138 ? Math.round((j - 138) * 0.4) : j < 127 ? 127 - j : 0), j, hex('#7a3418')); } }
  // el marco de la foto (la foto, viva, la pinta el plano)
  R.rect(146, 64, 236, 149, K); veta(147, 65, 235, 148, hex('#6a3c1e'), 9); R.rect(147, 65, 235, 65, hex('#b07a44')); R.rect(147, 65, 147, 148, hex('#9a6434')); R.rect(150, 68, 232, 68, hex('#3a1e0e')); R.rect(150, 68, 150, 145, hex('#3a1e0e')); R.rect(232, 68, 232, 145, hex('#a87444')); R.rect(150, 145, 232, 145, hex('#a87444'));
  R.rect(151, 69, 231, 144, hex('#efe6cc')); R.rect(151, 69, 231, 70, hex('#cfc4a4')); R.rect(151, 69, 152, 144, hex('#cfc4a4')); R.rect(158, 78, 224, 136, hex('#8a7a5a')); R.rect(159, 79, 223, 135, K);
  for (const [x, y] of [[148, 66], [234, 66], [148, 147], [234, 147]]) R.pset(x, y, ORO);
  // la pila de libros tumbados (encima duerme el gato) y los dos del sujetalibros
  { const L = [[246, 310, '#2e4a6a'], [250, 306, '#7a2e2a'], [248, 302, '#8a6a2e']]; L.forEach(([a, b, c], k) => { const y1 = 149 - k * 9, col = hex(c); R.rect(a - 1, y1 - 9, b + 1, y1, K); R.rect(a, y1 - 8, b, y1 - 1, col); R.rect(a, y1 - 8, b, y1 - 8, mez(col, BL, 0.3)); R.rect(a + 4, y1 - 8, a + 5, y1 - 1, hex('#d8b25a')); R.rect(b - 9, y1 - 8, b - 8, y1 - 1, hex('#d8b25a')); R.rect(b - 2, y1 - 6, b, y1 - 3, hex('#efe6cc')); R.rect(a + 12, y1 - 5, b - 16, y1 - 4, mez(col, BL, 0.45)); }); }
  lomo(313, 149, 6, 40, hex('#3c5a3a'));
  // la luz del flexo: cálida en el centro, más noche hacia los bordes
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 186) * 0.8, y - 104), a = Math.max(0, Math.min(0.5, (d - 60) / 190)); let c = R.pget(x, y); if (d < 90) c = mez(c, hex('#ffd890'), (1 - d / 90) * 0.13); R.pset(x, y, mez(c, hex('#141030'), a)); }
};
const SEP = ['#3a2a1c', '#6a4c30', '#9a7448', '#c8a070', '#e8cfa0', '#f6ead0'], CAL = ['#3c2436', '#8a3c26', '#c8642c', '#e89444', '#f8cc84', '#fff4d0'];
const fotoJinete = (t, viva) => {
  const [x0, y0, x1, y1] = [160, 80, 222, 134], c = SEP.map((s, k) => mez(hex(s), hex(CAL[k]), viva * 0.75));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = (y - y0) / 34; R.pset(x, y, v < 0.35 ? (((x + y) & 1) && v > 0.2 ? c[3] : c[2]) : v < 0.7 ? c[3] : ((x + y) & 1 ? c[4] : c[3])); }
  R.recorte([x0, y0, x1, y1]);
  R.disco(171.5, 93.5, 5.2, c[5]); R.anillo(171.5, 93.5, 7.5, c[4], 4);
  R.poligono([[x0, 116], [172, 108], [186, 113], [200, 106], [x1, 112], [x1, y1], [x0, y1]], c[2]); R.poligono([[200, 106], [x1, 112], [x1, 118], [206, 116]], c[1]);
  R.poligono([[x0, 124], [176, 119], [196, 126], [x1, 121], [x1, y1], [x0, y1]], c[4]); R.poligono([[176, 119], [196, 126], [190, y1], [168, y1]], c[3]);
  for (let k = 0; k < 6; k++) R.linea(162 + k * 10, 129 + (k % 2) * 3, 167 + k * 10, 128 + (k % 2) * 3, c[2]);
  const anda = viva > 0.3, dx = anda ? Math.round(Math.min(8, (t - VIVA) * 2.2)) : 0;
  for (let i = -16; i <= 16; i++) if ((i + 40) % 3) R.pset(186 + dx + i, 132 + (Math.abs(i) > 11 ? 0 : 1), c[2]);
  camello(184 + dx, 131, 1, t, { b: c[1], s: c[0], l: c[2], r: c[5], rs: c[4], t: c[5], p: c[3] }, { s: 2, quieto: !anda });
  if (anda) for (let k = 0; k < 7; k++) { const x = x1 - ((t * (30 + k * 7) + k * 23) % 70), y = 100 + k * 5; R.linea(x, y, x + 5, y, c[5]); if (k % 2) R.pset(184 + dx - 20 - ((t * 20 + k * 5) % 9), 130 - (k % 3), c[4]); }
  // la foto es vieja: esquinas quemadas y un par de arañazos
  for (const [cx, cy] of [[x0, y0], [x1, y0], [x0, y1], [x1, y1]]) for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) if (Math.hypot(i, j) < 6 && ((i + j) & 1 || Math.hypot(i, j) < 3)) R.pset(cx + i, cy + j, c[2]);
  R.linea(216, 84, 218, 95, c[4]); R.linea(214, 120, 218, 131, c[3]);
  // el brillo del cristal
  const gl = (t - LAW) / 0.7; if (gl >= 0 && gl < 1) { const gx = x0 - 30 + Math.round(gl * 110); for (let j = 0; j <= 54; j++) for (let w = 0; w < 9; w++) { const x = gx + w + Math.round((54 - j) * 0.5), y = y0 + j; if (w < 6 || (j & 1)) R.pset(x, y, mez(R.pget(x, y), BL, 0.45)); } }
  else { R.linea(x0 + 3, y0 + 16, x0 + 14, y0 + 3, mez(c[5], BL, 0.5)); R.linea(x0 + 3, y0 + 20, x0 + 18, y0 + 3, mez(c[5], BL, 0.5)); }
  R.recorte(null);
};
const gatoBalda = (t) => {   // el gato atigrado, dormido sobre los libros tumbados: respira, mueve la oreja y la cola
  const x = 276, y = 122 - (Math.sin(t * 2.2) > 0.6 ? 1 : 0), G = hex('#c88a4a'), GS = hex('#8a5a2a'), GL = hex('#e8b070');
  R.rect(x - 15, y - 9, x + 13, y + 1, K); R.rect(x - 12, y - 11, x + 9, y - 9, K); R.rect(x - 14, y - 8, x + 12, y, G); R.rect(x - 11, y - 10, x + 8, y - 9, G); R.rect(x - 11, y - 10, x + 6, y - 10, GL);
  for (let i = -10; i <= 8; i += 4) R.rect(x + i, y - 9, x + i + 1, y - 5, GS); R.rect(x - 14, y - 1, x + 12, y, GS);
  // la cabeza, apoyada a la izquierda
  R.rect(x - 22, y - 9, x - 11, y + 1, K); R.rect(x - 21, y - 8, x - 12, y, G); R.rect(x - 21, y - 2, x - 12, y, GL); const oreja = (t * 0.9) % 3 < 0.15 ? 1 : 0;
  R.poligono([[x - 22, y - 8], [x - 21, y - 13 + oreja], [x - 17, y - 9]], K); R.poligono([[x - 16, y - 9], [x - 13, y - 13], [x - 11, y - 8]], K); R.pset(x - 20, y - 10 + oreja, G); R.pset(x - 20, y - 9, G); R.pset(x - 14, y - 10, G); R.pset(x - 13, y - 9, G); R.pset(x - 14, y - 9, hex('#e89a9a'));
  R.rect(x - 20, y - 5, x - 18, y - 5, K); R.rect(x - 15, y - 5, x - 13, y - 5, K); R.pset(x - 17, y - 3, hex('#e89a9a')); R.pset(x - 19, y - 7, GS); R.pset(x - 16, y - 7, GS); R.pset(x - 14, y - 7, GS);
  // la cola cuelga por delante de los libros y se mece
  let px = x + 12, py = y - 2; for (let k = 0; k < 16; k++) { const sw = Math.sin(t * 2.4 - k * 0.32) * (k * 0.24); const nx = x + 13 + Math.round(sw + (k < 3 ? k : 3)), ny = y - 2 + k; R.rect(nx - 1, ny, nx + 2, ny + 1, K); px = nx; py = ny; }
  for (let k = 0; k < 16; k++) { const sw = Math.sin(t * 2.4 - k * 0.32) * (k * 0.24); const nx = x + 13 + Math.round(sw + (k < 3 ? k : 3)), ny = y - 2 + k; R.rect(nx, ny, nx + 1, ny, k % 4 < 2 ? G : GS); if (k === 15) R.rect(nx, ny, nx + 1, ny, GL); }
};
const p4 = (t) => {
  fondo('balda', fondoBalda);
  const viva = ease(tramo(t, VIVA, VIVA + 0.8));
  fotoJinete(t, viva);
  gatoBalda(t);
  // una polilla ronda la luz
  { const mx = 196 + Math.cos(t * 2.3) * 34 + Math.sin(t * 5.1) * 6, my = 44 + Math.sin(t * 3.1) * 10; R.pset(Math.round(mx), Math.round(my), BL); R.pset(Math.round(mx) + (Math.floor(t * 14) % 2 ? 1 : -1), Math.round(my) - 1, hex('#d8d0c0')); }
  // el libro que se lleva: la mano sube, lo agarra y tira de él hacia abajo
  const sube = ease(tramo(t, P4 + 0.02, SACA)), tira = ease(tramo(t, SACA + 0.12, SACA + 0.75)), cae = tramo(t, SACA + 0.75, SACA + 1.0);
  const by = 149 + Math.round(tira * 76), bx = 63 - Math.round(tira * 5);
  if (tira < 1) { lomo(bx, by - (tira > 0 && tira < 0.15 ? 2 : 0), 10, 42, hex('#a85a2a')); if (tira <= 0) R.icono('reloj', 65, 120, hex('#f0dcb4'), K, 1); }
  // el vecino, sin apoyo, se recuesta en el hueco
  lomo(76, 149, 8, 40, hex('#4a2e5a'), -Math.round(cae * 9));
  if (cae > 0 && cae < 1) for (let i = 0; i < 4; i++) R.pset(66 + i * 3, 146 - Math.round(cae * (3 + i)), hex('#d8d0c0'));
  if (tira < 1) { const my = lerp(196, by - 9, sube) + (tira > 0 ? 0 : 0), mx = bx - 9;
    T.brazo(R, mx - 6, my + 46, mx, my, '#6a4a2e', 1, { codo: [mx - 9, my + 24], sombra: false }); }
  // «fascinated»: destellos alrededor del marco
  if (viva > 0) for (let k = 0; k < 6; k++) { const ph = (t * 1.3 + k * 0.37) % 1; if (ph < 0.5) destello([142, 240, 150, 232, 190, 244][k], [70, 76, 142, 138, 60, 110][k] - Math.round(ph * 6), ph < 0.25 ? 2 : 1, k % 2 ? OROL : ORO); }
};

// ── 5 · el planeta al ocaso: el oficial se une a la columna ─────────────────────────────────────────────────────────
const JOIN = wr(22.64), REV = wr(23.16), LUP = wr(25.0);
const CJ = { b: hex('#3c2436'), s: hex('#24182c'), l: hex('#844e44'), r: hex('#4a3a6a'), rs: hex('#33264a'), t: hex('#b07454'), p: hex('#844e44'), f: hex('#f05a2c'), fs: hex('#b83a1c'), m: hex('#24182c') };
const CO = { b: hex('#7a4a3c'), s: hex('#4a2a2c'), l: hex('#b07454'), r: hex('#fbf0d8'), rs: hex('#d8c0a0'), t: hex('#fbf0d8'), p: hex('#c88a5a'), f: hex('#f05a2c'), fs: hex('#b83a1c'), m: hex('#24182c') };
const p5 = (t) => {
  const o = { encuadre: 'desierto', hora: 'ocaso', silueta: 0, brillo: 0.2, t0: P5 }, g = T.planeta(R, t, o), su = g?.suelo ?? 150;
  const cresta = (x) => su + (x > 232 ? Math.round((x - 232) * 0.55) : 0);
  // la columna avanza por la cresta
  const head = lerp(92, 186, tramo(t, P5 - 0.4, wr(24.9))), band = ease(tramo(t, REV, REV + 0.4)), para = t >= wr(24.9);
  const sombra = (x, y) => { for (let i = -9; i <= 12; i++) if ((i + Math.round(x)) & 1) R.pset(Math.round(x) + i - 8, y + 1 + (Math.abs(i) > 8 ? 0 : 1), mez(R.pget(Math.round(x) + i - 8, y + 2), hex('#24182c'), 0.5)); };
  for (let k = 3; k >= 0; k--) { const x = head - k * 27; if (x < -14) continue; sombra(x, su); camello(x, su, 1, t, CJ, { fase: k * 1.7, quieto: para, bandera: band * (k % 2 ? 0.85 : 1) });
    if (!para && Math.floor(t * 3.2 + k * 1.7) % 2) for (let i = 0; i < 3; i++) R.pset(Math.round(x) - 8 - i * 2, su - 1 - i, hex('#f2ac54')); }
  // el oficial de blanco: sube por la arista, se para y, en «joined», se da la vuelta y se pone al frente
  const lleg = ease(tramo(t, P5 - 0.3, JOIN - 0.25)), vuelta = t >= JOIN, ox = vuelta ? lerp(218, 224, tramo(t, JOIN + 0.3, wr(24.9))) : lerp(318, 218, lleg), oy = cresta(ox);
  sombra(ox, oy); camello(ox, oy, vuelta ? 1 : -1, t, CO, { quieto: (lleg >= 1 && t < JOIN + 0.3) || para, bandera: vuelta ? band : 0 });
  if (t >= JOIN - 0.05 && t < JOIN + 0.3) { for (let i = 0; i < 5; i++) R.pset(Math.round(ox) - 6 + i * 3, oy - 1 - ((i * 2 + Math.floor(t * 20)) % 3), hex('#fcd68a')); }
  if (band > 0 && band < 1) for (let k = 0; k < 5; k++) destello(head - k * 27 + (k === 4 ? 2 * 27 + 40 : 0) + 4, su - 34 - Math.round(band * 6), 1, OROL);
  T.planetaDelante(R, t, o);
  // «readers discovered»: la lupa entra y repasa la columna, del oficial hacia atrás
  if (t >= LUP - 0.05) { const e = ease(tramo(t, LUP, LUP + 0.55)), v = ease(tramo(t, LUP + 0.75, wr(27.2)));
    const lx = lerp(340, 222, e) - v * 96, ly = lerp(170, 132, e) + Math.sin(t * 2.4) * 1.5; lupa(lx, ly, 19, '#3a5a8a', { z: 1.7 }); }
};

// ── 6 · inserto: el libro de las montañas, bajo la lupa ─────────────────────────────────────────────────────────────
const WOR = wr(27.55), PROV = wr(28.61), A60 = wr(29.59), CAU = wr(31.3), VUELA = wr(32.35);
const PAG = hex('#f3ead2'), PAGS = hex('#d8ccae'), TINTA = hex('#6a5a4a');
// los renglones de la página izquierda: [x, y, ancho] de cada «palabra» (raya)
const RENG = (() => { const L = []; for (let j = 0; j < 15; j++) { const y = 62 + j * 6 + (j > 4 ? 4 : 0) + (j > 10 ? 4 : 0); let x = 66 + (j === 0 || j === 5 || j === 11 ? 8 : 0); while (x < 146) { const w = 5 + Math.floor(hh(x, j, 51) * 10); if (x + w > 150) break; L.push([x, y, w, j]); x += w + 3; } } return L; })();
const ROB = RENG.filter((r) => r[3] === 12).slice(1, 4).concat(RENG.filter((r) => r[3] === 13).slice(0, 2));   // las «palabras» que se lleva
const REFRAN = RENG.filter((r) => r[3] === 14);   // el refrán: un renglón entero
const fondoLibro = () => {
  // la mesa de la biblioteca, de arce claro, con sol de ventana
  veta(0, 0, 319, 179, hex('#c89a62'), 21); for (const y of [46, 104, 150]) { R.rect(0, y, 319, y, hex('#9a7040')); R.rect(0, y + 1, 319, y + 1, hex('#dcb47c')); }
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = x * 0.5 + y, w = ((d % 96) + 96) % 96; if (w < 52 && d > 40 && !(w < 2 || (w > 24 && w < 27))) { if (y > 18 || x > 176) R.pset(x, y, mez(R.pget(x, y), hex('#fff0c0'), x > 268 && y < 50 ? 0.1 : 0.2)); } }
  // el libro abierto: tapas, cantos de las hojas y las dos páginas
  for (let j = 0; j < 5; j++) for (let x = 50; x <= 276; x++) if (j < 3 || (x + j) & 1) R.pset(x + 3, 167 + j, mez(R.pget(x + 3, 167 + j), K, 0.4));
  R.rect(49, 39, 271, 167, K); R.rect(50, 40, 270, 166, hex('#6a2a26')); R.rect(50, 40, 270, 40, hex('#9a4a3e')); R.rect(50, 165, 270, 166, hex('#3e1614'));
  R.rect(54, 43, 266, 164, K); for (let k = 0; k < 4; k++) { R.rect(55 + k, 44, 55 + k, 163 - k, k % 2 ? PAGS : PAG); R.rect(265 - k, 44, 265 - k, 163 - k, k % 2 ? PAGS : PAG); } R.rect(55, 160, 265, 163, PAGS); R.rect(55, 161, 265, 161, PAG); R.rect(55, 163, 265, 163, hex('#b8ac8e'));
  R.rect(59, 44, 261, 159, PAG);
  for (let y = 44; y <= 159; y++) for (let i = 0; i < 9; i++) { const a = [0.42, 0.32, 0.24, 0.17, 0.12, 0.08, 0.05, 0.03, 0.015][i]; R.pset(160 - i, y, mez(PAG, hex('#5a4a36'), a)); R.pset(160 + i, y, mez(PAG, hex('#5a4a36'), a * 0.8)); } R.rect(160, 44, 160, 159, hex('#8a7a5e'));
  for (let k = 0; k < 40; k++) R.pset(60 + Math.floor(hh(k, 1, 52) * 200), 46 + Math.floor(hh(k, 2, 52) * 112), PAGS);
  // la página izquierda: adorno de capítulo y los renglones
  R.rect(98, 50, 118, 50, TINTA); R.poligono([[108, 47], [112, 51], [108, 55], [104, 51]], TINTA); R.pset(108, 51, PAG); R.rect(94, 52, 96, 52, TINTA); R.rect(120, 52, 122, 52, TINTA);
  for (const [x, y, w] of RENG) R.rect(x, y, x + w - 1, y + 1, TINTA);
  R.rect(66, 60, 70, 66, hex('#a8322c')); R.rect(67, 61, 69, 65, hex('#d86a5a'));   // la capitular (un bloque rojo, sin letra)
  // la página derecha: renglones arriba y el grabado de las montañas nevadas abajo
  for (let j = 0; j < 5; j++) { let x = 170; const y = 52 + j * 6; while (x < 250) { const w = 5 + Math.floor(hh(x, j, 53) * 10); if (x + w > 254) break; R.rect(x, y, x + w - 1, y + 1, TINTA); x += w + 3; } }
  const [gx0, gy0, gx1, gy1] = [170, 86, 254, 150]; R.rect(gx0 - 2, gy0 - 2, gx1 + 2, gy1 + 2, TINTA); R.rect(gx0 - 1, gy0 - 1, gx1 + 1, gy1 + 1, PAG); R.rect(gx0, gy0, gx1, gy1, hex('#b8d0e0'));
  for (let y = gy0; y <= gy0 + 22; y++) for (let x = gx0; x <= gx1; x++) if (y < gy0 + 8 || ((x + y) & 1 && y < gy0 + 16)) R.pset(x, y, hex('#98b8d0'));
  R.recorte([gx0, gy0, gx1, gy1]);
  for (const [nx, ny] of [[186, 94], [228, 91], [206, 99]]) { R.rect(nx, ny, nx + 12, ny + 1, hex('#e8f0f4')); R.rect(nx + 3, ny - 2, nx + 9, ny - 1, hex('#f6fafc')); R.rect(nx + 1, ny + 2, nx + 11, ny + 2, hex('#c8d8e4')); }
  const pico = (cx, top, w, c, cs, n) => { R.poligono([[cx - w, gy1], [cx, top], [cx + w, gy1]], c); R.poligono([[cx, top], [cx + w, gy1], [cx + Math.round(w * 0.2), gy1]], cs);
    R.poligono([[cx - Math.round(w * n), top + Math.round((gy1 - top) * n)], [cx, top], [cx + Math.round(w * n), top + Math.round((gy1 - top) * n)], [cx + Math.round(w * n * 0.5), top + Math.round((gy1 - top) * n) - 3], [cx, top + Math.round((gy1 - top) * n) + 3], [cx - Math.round(w * n * 0.5), top + Math.round((gy1 - top) * n) - 2]], hex('#fbfdff'));
    R.poligono([[cx, top], [cx + Math.round(w * n), top + Math.round((gy1 - top) * n)], [cx + Math.round(w * n * 0.5), top + Math.round((gy1 - top) * n) - 3], [cx + 1, top + Math.round((gy1 - top) * n) + 2]], hex('#c4d6e6'));
    for (let k = 1; k < 5; k++) R.linea(cx - Math.round(w * 0.2 * k), top + Math.round((gy1 - top) * (n + 0.12 * k)), cx - Math.round(w * 0.2 * k) - 3, top + Math.round((gy1 - top) * (n + 0.12 * k)) + 7, cs); };
  pico(184, 104, 22, hex('#8a9ab0'), hex('#6a7a94'), 0.3); pico(236, 100, 24, hex('#8a9ab0'), hex('#6a7a94'), 0.34); pico(210, 92, 30, hex('#7a8aa4'), hex('#56667e'), 0.4); pico(250, 116, 18, hex('#6a7a94'), hex('#4e5e76'), 0.25); pico(168, 120, 14, hex('#6a7a94'), hex('#4e5e76'), 0.22);
  // el bosque de abetos y la torre de piedra del valle
  for (let x = gx0; x <= gx1; x += 4) { const hg = 7 + Math.floor(hh(x, 1, 54) * 6); R.poligono([[x - 3, gy1], [x, gy1 - hg], [x + 3, gy1]], (x >> 2) & 1 ? hex('#2e5a44') : hex('#234a38')); }
  R.rect(196, 133, 202, 146, hex('#4a4038')); R.rect(197, 134, 201, 146, hex('#a89a86')); R.rect(200, 134, 201, 146, hex('#7a6e5e')); R.rect(195, 131, 203, 133, hex('#4a4038')); R.pset(197, 131, hex('#b8d0e0')); R.pset(201, 131, hex('#b8d0e0')); R.rect(198, 138, 199, 140, K);
  R.recorte(null);
  // la cinta roja del registro, que cuelga por abajo
  R.rect(157, 160, 161, 176, K); R.rect(158, 160, 160, 175, hex('#c8362c')); R.rect(158, 160, 158, 175, hex('#e86a5a')); R.pset(159, 176, hex('#c8362c'));
  // en la mesa: gafas de leer, taza de té, lápiz y fichero de fichas
  { const gx = 286, gy = 154; for (const dx of [-9, 9]) { R.disco(gx + dx + 0.5, gy + 0.5, 7.6, K); R.disco(gx + dx + 0.5, gy + 0.5, 6.2, hex('#b8862a')); R.disco(gx + dx + 0.5, gy + 0.5, 5, mez(R.pget(gx + dx, gy), BL, 0.35)); R.linea(gx + dx - 3, gy + 1, gx + dx + 1, gy - 3, BL); } R.rect(gx - 2, gy - 1, gx + 2, gy, hex('#b8862a')); R.linea(gx - 16, gy - 2, gx - 22, gy - 12, K); R.linea(gx + 17, gy - 2, gx + 24, gy - 12, K); }
  { const cx = 24, cy = 70; for (let j = -1; j < 4; j++) for (let i = -16; i <= 18; i++) if (Math.hypot(i - 2, (j - 1) * 4) < 17) R.pset(cx + i + 3, cy + 14 + j, mez(R.pget(cx + i + 3, cy + 14 + j), K, 0.35));
    R.disco(cx + 0.5, cy + 0.5, 16.4, K); R.disco(cx + 0.5, cy + 0.5, 15.2, hex('#e8e4d8')); R.disco(cx + 0.5, cy + 0.5, 12, hex('#c8c4b8')); R.disco(cx + 0.5, cy + 0.5, 11, K); R.disco(cx + 0.5, cy + 0.5, 10, hex('#f6f2ea')); R.disco(cx + 0.5, cy + 0.5, 8, hex('#9a5a2a')); R.disco(cx - 1.5, cy - 1.5, 4, hex('#b8743a')); R.rect(cx + 11, cy - 3, cx + 18, cy + 2, K); R.rect(cx + 11, cy - 2, cx + 17, cy + 1, hex('#f6f2ea')); R.pset(cx - 4, cy - 5, hex('#e8c89a')); }
  lapiz(282, 78, 302, 118, hex('#3a7a5a'));
  { const fx = 6, fy = 150; R.rect(fx - 1, fy - 1, fx + 36, fy + 30, K); veta(fx, fy, fx + 35, fy + 29, hex('#7a4a26'), 33); R.rect(fx, fy, fx + 35, fy, hex('#a8743c')); for (let k = 0; k < 6; k++) { R.rect(fx + 3, fy + 3 + k * 4, fx + 32, fy + 5 + k * 4, k % 2 ? hex('#efe6cc') : hex('#e4d8b8')); R.rect(fx + 3, fy + 6 + k * 4, fx + 32, fy + 6 + k * 4, hex('#a89a7a')); if (k % 3 === 1) R.rect(fx + 12, fy + 1 + k * 4, fx + 18, fy + 2 + k * 4, hex('#d8a83a')); } }
};
const rayaSuelta = (x, y, w, c = ORO) => { x = Math.round(x); y = Math.round(y); R.rect(x - 1, y - 1, x + w, y + 2, K); R.rect(x, y, x + w - 1, y + 1, c); R.rect(x, y, x + w - 1, y, OROL); };
// dónde está cada raya robada mientras flota sobre el libro: sube de su sitio y se queda en corro sobre la página
const flota = (k, n, t) => [86 + (k % 3) * 22 + (k > 2 ? 10 : 0) + Math.round(Math.sin(t * 2 + k) * 2), 26 + Math.floor(k / 3) * 8 + Math.round(Math.cos(t * 2.6 + k * 1.3) * 1.5)];
const p6 = (t) => {
  fondo('libro', fondoLibro);
  // motas de polvo en el sol
  for (let k = 0; k < 14; k++) { const x = (hh(k, 1, 55) * 320 + t * (3 + k % 4)) % 320, y = (hh(k, 2, 55) * 180 + Math.sin(t * 0.7 + k) * 6 + t * 2) % 180; if (y > 22 && (x < 272 || y > 48) && Math.sin(t * 1.7 + k * 2) > -0.2) R.pset(Math.round(x), Math.round(y), hex('#fff6dc')); }
  // el vapor del té
  for (let k = 0; k < 3; k++) { const ph = (t * 0.5 + k / 3) % 1; R.pset(22 + k * 3 + Math.round(Math.sin(ph * 6 + k) * 2), 64 - Math.round(ph * 16), mez(hex('#c89a62'), BL, 0.7 * (1 - ph))); R.pset(23 + k * 3 + Math.round(Math.sin(ph * 6 + k) * 2), 63 - Math.round(ph * 16), mez(hex('#c89a62'), BL, 0.5 * (1 - ph))); }
  // las rayas que la lupa enciende y despega
  const sale = (k) => (k < ROB.length ? WOR + k * 0.2 : PROV + 0.15), huye = ease(tramo(t, VUELA, VUELA + 0.5));
  const todas = [...ROB, [REFRAN[0][0], REFRAN[0][1], REFRAN[REFRAN.length - 1][0] + REFRAN[REFRAN.length - 1][2] - REFRAN[0][0]]];
  todas.forEach(([x, y, w], k) => { const s = sale(k), e = t - s; if (e < -0.25) return;
    if (e < 0) { R.rect(x - 1, y - 1, x + w, y + 2, OROL); R.rect(x, y, x + w - 1, y + 1, TINTA); return; }
    R.rect(x - 1, y - 1, x + w, y + 2, PAG); R.rect(x, y + 1, x + w - 1, y + 1, hex('#e6dcc0'));   // el hueco que deja
  });
  // la ficha de préstamo con su año: cae en «1960» y recibe el sello
  { const e = tramo(t, A60 - 0.25, A60), d = t - A60, fx = 274, fy = Math.round(lerp(-40, 62, ease(e))) + (d >= 0 && d < 0.1 ? 1 : 0);
    if (e > 0) { for (let i = 0; i < 44; i++) if (i & 1) R.pset(fx + i, fy + 31, mez(R.pget(fx + i, fy + 31), K, 0.4)); R.rect(fx - 1, fy - 1, fx + 42, fy + 30, K); R.rect(fx, fy, fx + 41, fy + 29, hex('#efe6cc')); R.rect(fx, fy, fx + 41, fy + 4, hex('#d86a5a')); R.rect(fx, fy + 28, fx + 41, fy + 29, hex('#cfc4a4'));
      for (let j = 0; j < 2; j++) R.rect(fx + 4, fy + 22 + j * 3, fx + 36 - j * 9, fy + 22 + j * 3, hex('#a89a7a'));
      if (d >= 0) { R.numero('1960', fx + 21, fy + 17 + (d < 0.12 ? 1 : 0), { centro: true, color: hex('#a8322c'), sombra: false }); if (d < 0.35) R.anillo(fx + 21, fy + 13, 8 + d * 40, hex('#d86a5a')); } } }
  // la lupa: por los renglones de abajo de la página izquierda y, en «Caucasus», al grabado
  const a = ease(tramo(t, P6 - 0.2, WOR)), b = ease(tramo(t, WOR + 0.1, PROV + 0.3)), c = ease(tramo(t, CAU - 0.9, CAU - 0.1)), dd = ease(tramo(t, CAU + 0.2, VUELA + 0.3));
  let lx = lerp(52, 96, a) + b * 30, ly = lerp(146, 141, a) + b * 9; lx = lerp(lx, 196, c) + dd * 30; ly = lerp(ly, 116, c) - dd * 8;
  // los banderines de las cumbres (bajo la lupa se ven grandes)
  if (t >= CAU) { const e = Math.min(1, (t - CAU) / 0.25); for (const [fx, fy, col] of [[210, 92, '#d8402c'], [236, 100, '#2c5ad8']]) { R.rect(fx, fy - Math.round(7 * e), fx, fy, K); if (e >= 1) { const w = Math.floor(t * 6) % 2; R.rect(fx + 1, fy - 7, fx + 4, fy - 5 + w, hex(col)); R.pset(fx + 5, fy - 6 + w, hex(col)); } } }
  // las rayas robadas flotan sobre el libro (y al final salen volando hacia la derecha)
  todas.forEach(([x, y, w], k) => { const e = t - sale(k); if (e < 0) return; const u = ease(Math.min(1, e / 0.6)), [qx, qy] = flota(k, todas.length, t), dest = k === todas.length - 1 ? [78, 44] : [qx, qy];
    const fx = lerp(x, dest[0], u) + huye * huye * (260 + k * 16), fy = lerp(y, dest[1], u) - Math.sin(u * Math.PI) * 6 + huye * huye * 44;
    if (u < 1 || huye > 0) for (let i = 1; i <= 3; i++) R.pset(Math.round(fx) - i * 3 * (huye > 0 ? 2 : 0) + (huye > 0 ? 0 : w / 2), Math.round(fy) + (huye > 0 ? 1 : 3 + i * 2), i < 2 ? OROL : ORO);
    rayaSuelta(fx, fy, w); if (k === todas.length - 1) { for (const qx2 of [Math.round(fx) - 6, Math.round(fx) + w + 2]) { R.rect(qx2 - 1, Math.round(fy) - 3, qx2 + 4, Math.round(fy) + 1, K); R.rect(qx2, Math.round(fy) - 2, qx2, Math.round(fy), ORO); R.rect(qx2 + 2, Math.round(fy) - 2, qx2 + 3, Math.round(fy), ORO); } }
    if (e < 0.25) destello(fx + w / 2, fy, 3, BL); });
  if (huye < 1) lupa(lx, ly, 17, '#3a5a8a', { z: 1.8, sombra: true });
};

// ── 7 · inserto: el cuaderno de Herbert; de las montañas a la arena ─────────────────────────────────────────────────
const MOV = wr(33.87), MONT = wr(34.65), SAND = wr(35.45);
const HOJA = hex('#f1e8d0'), HOJAS = hex('#d4c8a8'), GRAF = hex('#5a5a66'), NAR = hex('#d8742c'), NARS = hex('#a84e1c'), NARL = hex('#f4b060');
const NIEVE = [];   // los píxeles de nieve del recorte (los rellena el fondo): [x, y]
const fondoCuaderno = () => {
  // la mesa de nogal de Herbert, de noche
  veta(0, 0, 319, 179, hex('#5a3a22'), 61); for (const y of [30, 96, 158]) { R.rect(0, y, 319, y, hex('#3a2414')); R.rect(0, y + 1, 319, y + 1, hex('#6e4a2c')); }
  // el cuaderno de espiral, abierto
  for (let j = 0; j < 5; j++) for (let x = 44; x <= 280; x++) if (j < 3 || (x + j) & 1) R.pset(x + 3, 171 + j, mez(R.pget(x + 3, 171 + j), K, 0.45));
  R.rect(43, 29, 277, 171, K); R.rect(44, 30, 276, 170, hex('#2a4a5e')); R.rect(44, 30, 276, 30, hex('#4a7088'));
  R.rect(47, 32, 156, 168, K); R.rect(164, 32, 273, 168, K); R.rect(48, 33, 155, 167, HOJA); R.rect(165, 33, 272, 167, HOJA); R.rect(48, 166, 155, 167, HOJAS); R.rect(165, 166, 272, 167, HOJAS);
  for (let y = 44; y < 166; y += 8) { R.rect(48, y, 155, y, hex('#c4d4dc')); R.rect(165, y, 272, y, hex('#c4d4dc')); } R.rect(60, 33, 60, 167, hex('#e8b0a8')); R.rect(177, 33, 177, 167, hex('#e8b0a8'));
  for (let y = 37; y < 166; y += 7) { R.rect(153, y, 167, y + 3, K); R.rect(154, y + 1, 166, y + 2, hex('#b8bcc8')); R.rect(156, y + 1, 160, y + 1, BL); R.disco(151.5, y + 2, 1.6, hex('#3a2a20')); R.disco(169.5, y + 2, 1.6, hex('#3a2a20')); }
  // página izquierda: el recorte de las montañas, pegado con celo, y notas a lápiz (garabatos, sin letras)
  const [x0, y0, x1, y1] = [68, 44, 144, 98]; R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, GRAF); R.rect(x0, y0, x1, y1, hex('#c4d8e6'));
  for (let y = y0; y <= y0 + 20; y++) for (let x = x0; x <= x1; x++) if (y < y0 + 7 || ((x + y) & 1 && y < y0 + 14)) R.pset(x, y, hex('#a4c0d6'));
  R.recorte([x0, y0, x1, y1]);
  const pico = (cx, top, w, c, cs, n) => { R.poligono([[cx - w, y1], [cx, top], [cx + w, y1]], c); R.poligono([[cx, top], [cx + w, y1], [cx + Math.round(w * 0.2), y1]], cs); const hN = Math.round((y1 - top) * n);
    for (let j = 0; j <= hN + 3; j++) { const half = Math.round(w * j / (y1 - top)); for (let i = -half; i <= half; i++) { if (j > hN && (((i + 60) % 6) < 3) === (j - hN > 1)) continue; const x = cx + i, y = top + j; R.pset(x, y, i > half * 0.2 ? hex('#c4d6e6') : hex('#fbfdff')); NIEVE.push([x, y]); } } };
  pico(86, 62, 20, hex('#8a9ab0'), hex('#6a7a94'), 0.34); pico(128, 58, 22, hex('#8a9ab0'), hex('#6a7a94'), 0.36); pico(106, 50, 26, hex('#7a8aa4'), hex('#56667e'), 0.42);
  for (let x = x0; x <= x1; x += 4) { const hg = 5 + Math.floor(hh(x, 1, 62) * 5); R.poligono([[x - 3, y1], [x, y1 - hg], [x + 3, y1]], (x >> 2) & 1 ? hex('#2e5a44') : hex('#234a38')); }
  R.recorte(null);
  for (const [tx, ty] of [[x0 - 4, y0 - 3], [x1 - 8, y0 - 3], [x0 - 4, y1 - 3], [x1 - 8, y1 - 3]]) { R.rect(tx, ty, tx + 12, ty + 5, hex('#e8dca0')); R.rect(tx, ty, tx + 12, ty, hex('#f6eec0')); R.rect(tx, ty + 5, tx + 12, ty + 5, hex('#b8ac78')); }
  for (let j = 0; j < 5; j++) { const y = 114 + j * 8; let x = 66; while (x < 140 - j * 6) { const w = 6 + Math.floor(hh(x, j, 63) * 12); for (let i = 0; i < w; i++) R.pset(x + i, y + Math.round(Math.sin((x + i) * 1.3) * 1), GRAF); x += w + 4; } }
  // página derecha: el planeta a lápiz naranja (las lunas y las dunas vivas las pinta el plano)
  R.disco(218.5, 82.5, 29.6, NARS); R.disco(218.5, 82.5, 28.4, (x, y) => { const d = (x - 218) + (y - 82); return d > 22 ? NARS : d > 8 ? ((x + y) & 1 ? NAR : NARS) : d > -14 ? NAR : (x + y) & 1 ? NAR : NARL; });
  R.recorte([190, 54, 247, 111]); for (const [by, a] of [[70, 5], [80, -4], [91, 6], [100, -3]]) for (let x = 190; x <= 247; x++) { const y = by + Math.round(Math.sin((x - 190) / 57 * Math.PI) * a); if (Math.hypot(x - 218.5, y - 82.5) < 27) R.pset(x, y, (x >> 1) & 1 ? NARS : NARL); } R.recorte(null);
  for (let k = 0; k < 9; k++) R.linea(236 - k * 2, 100 + k, 244 - k, 92 + k * 2 > 110 ? 110 : 92 + k * 2, NARS);
  // en la mesa: las fichas con su hilo rojo y una pila de notas que pisa el cuaderno, a la izquierda; goma, sacapuntas y la taza, a la derecha
  for (let k = 0; k < 4; k++) { const x = 4 + k * 3, y = 40 + k * 5; R.rect(x - 1, y - 1, x + 30, y + 18, K); R.rect(x, y, x + 29, y + 17, k % 2 ? hex('#efe6cc') : hex('#e4d8b8')); for (let j = 4; j < 15; j += 4) R.rect(x + 3, y + j, x + 24 - (j % 3) * 3, y + j, hex('#8a8690')); } R.disco(27, 57, 2, ROJO); R.linea(27, 57, 4, 92, hex('#c8362c')); R.linea(27, 57, 44, 32, hex('#c8362c'));
  for (let i = -30; i <= 34; i++) for (let j = 0; j < 4; j++) if ((i + j) & 1 || j < 2) R.pset(24 + i, 158 + j, mez(R.pget(24 + i, 158 + j), K, 0.45));
  PZ.pilaNotas(R, 24, 158, { s: 2, alto: 0.55 });
  lapiz(6, 172, 40, 168, hex('#c8362c'));
  { R.rect(288, 60, 310, 72, K); R.rect(289, 61, 309, 71, hex('#e88a9a')); R.rect(289, 61, 309, 62, hex('#f6b4c0')); R.rect(289, 61, 296, 71, hex('#5a8ac8')); R.rect(289, 61, 296, 62, hex('#8ab0e0')); }
  { R.rect(290, 84, 304, 96, K); R.rect(291, 85, 303, 95, hex('#a8acb8')); R.rect(291, 85, 303, 86, BL); R.rect(294, 89, 300, 92, K); for (const [vx, vy] of [[284, 100], [296, 104], [306, 99], [288, 108]]) { R.rect(vx, vy, vx + 3, vy + 1, hex('#e8c89a')); R.pset(vx + 3, vy, hex('#e8b830')); } }
  { const cx = 300, cy = 130; for (let j = 0; j < 4; j++) for (let i = -14; i <= 18; i++) if (Math.hypot(i - 2, (j - 1) * 4) < 16) R.pset(cx + i + 3, cy + 13 + j, mez(R.pget(cx + i + 3, cy + 13 + j), K, 0.45));
    R.disco(cx + 0.5, cy + 0.5, 14.4, K); R.disco(cx + 0.5, cy + 0.5, 13.2, hex('#3e7a6a')); R.disco(cx + 0.5, cy + 0.5, 10.6, K); R.disco(cx + 0.5, cy + 0.5, 9.6, hex('#2a1a12')); R.disco(cx - 2, cy - 2, 4, hex('#4a2e1e')); R.rect(cx - 19, cy - 2, cx - 12, cy + 3, K); R.rect(cx - 18, cy - 1, cx - 12, cy + 2, hex('#3e7a6a')); R.linea(cx - 9, cy - 8, cx - 4, cy - 12, hex('#6ab09a')); }
  // el halo del flexo sobre el cuaderno; más noche en las esquinas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) * 0.75, y - 96), a = Math.max(0, Math.min(0.5, (d - 78) / 150)); let c = R.pget(x, y); if (d < 100) c = mez(c, hex('#ffe0a0'), (1 - d / 100) * 0.12); R.pset(x, y, mez(c, hex('#120e2a'), a)); }
};
const DUNAS = [[150, 14, 0.9], [156, 10, 2.6], [163, 7, 4.4]];   // las tres dunas del cuaderno: [y de base, alto, fase]
const p7 = (t) => {
  fondo('cuaderno', fondoCuaderno);
  const cruza = (k) => MONT + 0.35 + k * 0.13, llega = (k) => cruza(k) + 0.5;
  const deshiela = tramo(t, MONT - 0.5, SAND + 0.9), arena = ease(tramo(t, MONT + 0.2, SAND + 1.3));
  // la nieve del recorte se va: debajo queda la roca
  if (deshiela > 0) for (const [x, y] of NIEVE) if (hh(x, y, 71) < deshiela * 1.15 - (y - 50) * 0.004) R.pset(x, y, (x + y) % 5 ? hex('#7a8aa4') : hex('#6a7a94'));
  // las dunas del cuaderno: primero el trazo a lápiz; luego se llenan de arena
  DUNAS.forEach(([by, al, ph], k) => { for (let x = 180; x <= 270; x++) { const top = by - Math.round((Math.sin((x - 180) / 90 * Math.PI * 1.6 + ph) * 0.5 + 0.5) * al); R.pset(x, top, NARS);
      const lleno = arena * 1.25 - k * 0.12 - hh(x, k, 72) * 0.2; for (let y = top + 1; y <= Math.min(165, by + 6); y++) { const f = (y - top) / 14; if (f < lleno) R.pset(x, y, (x + y * 2 + k) % 4 === 0 ? NARL : (x + y) & 1 ? NAR : hex('#e8944a')); else if ((x * 3 + y * 2) % 7 === 0) R.pset(x, y, NARL); } } });
  // las dos lunas: la grande, quieta; la pequeña da vueltas despacio alrededor del planeta
  R.disco(256.5, 50.5, 7.4, GRAF); R.disco(256.5, 50.5, 6.2, hex('#e8dcc0')); R.disco(258.5, 52.5, 3, hex('#cfc0a0')); R.pset(254, 48, GRAF); R.pset(259, 49, GRAF);
  { const an = 2.6 + (t - P7) * 0.5, mx = 218 + Math.cos(an) * 40, my = 82 + Math.sin(an) * 13; for (let k = 0; k < 40; k++) { const a2 = k / 40 * 6.283, ox = 218 + Math.cos(a2) * 40, oy = 82 + Math.sin(a2) * 13; if (k % 2 && (Math.sin(a2) > 0 || Math.hypot(ox - 218.5, oy - 82.5) > 30)) R.pset(Math.round(ox), Math.round(oy), hex('#b8ac90')); }
    if (Math.sin(an) > 0 || Math.hypot(mx - 218.5, my - 82.5) > 31) { R.disco(mx + 0.5, my + 0.5, 4.4, GRAF); R.disco(mx + 0.5, my + 0.5, 3.2, hex('#e8a070')); R.pset(Math.round(mx) + 1, Math.round(my) + 1, NARS); } }
  // la arena que cruza la espiral, de las cumbres a las dunas
  if (deshiela > 0 && arena < 1) for (let k = 0; k < 46; k++) { const ph = (t * 0.9 + hh(k, 1, 73)) % 1, sx = 86 + hh(k, 2, 73) * 44, sy = 56 + hh(k, 3, 73) * 12, ex = 186 + hh(k, 4, 73) * 80, ey = 146 + hh(k, 5, 73) * 10;
      const x = lerp(sx, ex, ph), y = lerp(sy, ey, ph * ph) - Math.sin(ph * Math.PI) * (22 + hh(k, 6, 73) * 16); if (hh(k, 7, 73) < deshiela * 1.4) R.pset(Math.round(x), Math.round(y), ph < 0.3 ? BL : ph < 0.55 ? hex('#f6dcae') : k % 2 ? NAR : NARL); }
  // las rayas: llegan volando sobre el recorte, y en «moved… to the sand» cruzan y se posan bajo el planeta
  const N = 6, W = [9, 12, 7, 11, 8, 30];
  for (let k = 0; k < N; k++) { const ent = ease(tramo(t, P7 - 0.15 + k * 0.06, P7 + 0.55 + k * 0.06)), hx = 70 + (k % 3) * 24 + (k > 2 ? 8 : 0), hy = 36 + Math.floor(k / 3) * 7, w = W[k];
    const sx = k === 5 ? 74 : hx, sy = k === 5 ? 103 : hy, dx = k === 5 ? 200 : 186 + (k % 3) * 26 + (k > 2 ? -4 : 0), dy = k === 5 ? 134 : 118 + Math.floor(k / 3) * 7;
    const u = ease(tramo(t, cruza(k), llega(k)));
    if (u >= 1) { const bote = t < llega(k) + 0.12 ? 1 : 0; R.rect(dx, dy + bote, dx + w - 1, dy + 1 + bote, NARS); R.rect(dx, dy + bote, dx + w - 1, dy + bote, NAR); if (t < llega(k) + 0.3) for (let i = 0; i < 4; i++) R.pset(dx + i * (w / 3) + (i % 2 ? 2 : -2) * (t - llega(k)) * 10, dy - 1 - Math.round((t - llega(k)) * 14), NARL); continue; }
    const fx = lerp(lerp(-40 - k * 6, sx, ent), dx, u) + (u <= 0 ? Math.round(Math.sin(t * 2 + k) * 1.5) : 0), fy = lerp(lerp(sy + 14, sy, ent), dy, u) - Math.sin(u * Math.PI) * 30 + (u <= 0 ? Math.round(Math.cos(t * 2.6 + k * 1.3) * 1.5) : 0);
    if (u > 0 || ent < 1) for (let i = 1; i <= 3; i++) R.pset(Math.round(fx) - i * 4, Math.round(fy) + 1 + (u > 0 ? -i : 0), i < 2 ? OROL : ORO);
    rayaSuelta(fx, fy, w, u > 0.5 ? NARL : ORO); }
  // la mano de Herbert sombrea las dunas con el lápiz naranja y, cuando se posan las rayas, las subraya
  { const sub = ease(tramo(t, llega(5) + 0.1, llega(5) + 0.75)), fin = t > llega(5) + 0.75;
    let tx, ty; if (t < cruza(0) - 0.2) { const z = (t * 2.4) % 1; tx = 232 + (z < 0.5 ? z * 2 : 2 - z * 2) * 16 + Math.floor(t * 2.4) % 3 * 5; ty = 156 - (z < 0.5 ? z * 2 : 2 - z * 2) * 7; }
    else if (!fin) { const sube = ease(tramo(t, cruza(0) - 0.2, cruza(0) + 0.3)); tx = lerp(lerp(240, 252, sube), 202 + sub * 54, tramo(t, llega(5) - 0.2, llega(5) + 0.1)); ty = lerp(lerp(154, 146, sube), 139, tramo(t, llega(5) - 0.2, llega(5) + 0.1)); }
    else { tx = 258; ty = 139 - (Math.sin((t - llega(5)) * 9) > 0.5 ? 2 : 0); }
    if (sub > 0) { R.rect(202, 139, Math.round(202 + sub * 54), 139, NARS); if (sub > 0.5) R.rect(202, 141, Math.round(202 + (sub - 0.5) * 60), 141, NAR); }
    tx = Math.round(tx); ty = Math.round(ty); lapiz(tx, ty, tx + 20, ty + 22, hex('#e87a2c')); T.brazo(R, tx + 34, Math.max(190, ty + 50), tx + 27, ty + 25, '#6a4a2e', -1, { codo: [tx + 38, ty + 40] }); }
  // el vapor del café
  for (let k = 0; k < 3; k++) { const ph = (t * 0.45 + k / 3) % 1; R.pset(297 + k * 3 + Math.round(Math.sin(ph * 6 + k) * 2), 124 - Math.round(ph * 18), mez(hex('#5a3a22'), BL, 0.6 * (1 - ph))); R.pset(298 + k * 3 + Math.round(Math.sin(ph * 6 + k) * 2), 123 - Math.round(ph * 18), mez(hex('#5a3a22'), BL, 0.4 * (1 - ph))); }
};

const efectos = [[DL[0], 'toc'], [DL[1], 'toc'], [DL[2], 'toc'],
  [TA[0], 'golpecito'], [TA[1], 'golpecito'], [TA[2], 'golpecito'], [QUE, 'pop'], [AR0, 'viento'],
  [VAL, 'brillo'], [SOLO, 'campana'],
  [SACA + 0.15, 'papel'], [SACA + 0.9, 'toc'], [LAW, 'brillo'],
  [P5 + 0.1, 'viento'], [JOIN, 'whoosh'], [REV + 0.1, 'rafaga'], [LUP + 0.3, 'tic'],
  [WOR, 'pop'], [WOR + 0.4, 'pop'], [PROV + 0.15, 'brillo'], [A60, 'sello'], [CAU, 'tic'], [VUELA, 'whoosh'],
  [P7 + 0.2, 'lapiz'], [MONT + 0.35, 'whoosh'], [SAND + 0.1, 'viento'], [MONT + 1.6, 'lapiz']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año: (t) => (t < P3 ? 1958 : t < P6 ? 1959 : 1960) });
''')

E['du-planeta'] = ('El planeta', '''// DU-PLANETA (frase 9), sin cartela. Cuatro planos (CAMBIO de orden respecto al reparto: la voz habla primero de
// Herbert y luego de Beverly):
// 1. (1960 → 1963) el cuarto de Herbert, de noche, gag 3: va poniendo hojas en la torre de notas, un año por hoja (el
//    contador sube a 6); la torre ya le saca la cabeza, tiene que saltar, y al final se tambalea y él la abraza;
// 2. (1963) la cocina: Beverly teclea sus anuncios; en «breadwinner» saca la hoja, que vuela al corcho, y una moneda
//    cae en la hucha; otra en «copy»; Herbert cruza por detrás con otra pila de notas;
// 3. el planeta de noche, desde la roca: las últimas hojas caen y se vuelven arena («out of all that came a planet»);
//    en «a boy» el muchacho sale de detrás del peñasco, llega al borde y señala el llano; una lagartija huye;
// 4. el planeta de día: en «sandworms» la loma de arena (solo arena abombada) avanza por el llano levantando polvo y
//    el muchacho la señala y retrocede; en «spice» la arena se llena de destellos naranjas, él recoge un puñado y en
//    primer término asoma un saco abierto que brilla; en «fighting over» dos manos (T.brazo, una manga azul y otra
//    roja) tiran del saco, cada una por su lado.''', COMUN + r'''
const ws = (s) => en('seis', (s - 0.5) / 17.649);
const P2 = ws(4.23), P3 = ws(9.54), P4 = ws(13.72);
const NOCHE = hex('#2a2450');

// ── 1 · el cuarto, gag 3: la torre de notas ─────────────────────────────────────────────────────────────────────────
const A0 = ws(0.62), A6 = ws(3.02), TAMB = ws(3.15), TX = 236;
const p1 = (t) => {
  const o = { encuadre: 'cuarto', epoca: 1963, notas: 0.8 }; T.casa(R, t, o);
  const v = tramo(t, A0, A6), n = Math.min(6, Math.floor(v * 6 + 0.001)), dt = (A6 - A0) / 6, u = t < A0 ? 0 : t >= A6 ? 1 : ((t - A0) / dt) % 1;
  const alto = Math.min(1, 0.1 + 0.9 * (n + (t < A6 ? ease(Math.max(0, u - 0.7) / 0.3) : 0)) / 6), top = 150 - Math.round(6 + 36 * alto), tamb = t >= TAMB;
  // la torre (detrás de Herbert cuando la abraza)
  const torre = () => tenido(TX - 22, top - 6, TX + 22, 151, NOCHE, 0.2, () => PZ.pilaNotas(R, TX, 150, { alto, tambalea: tamb, t }));
  // Herbert: coge una hoja del montón de la mesa, la sube a la torre (saltando cuando ya no llega) y vuelve
  const hx = 256, falta = Math.max(0, 131 - top), sube = t >= A0 && t < A6 && u > 0.35 && u < 0.85, salto = sube && falta > 0 ? Math.round(Math.sin((u - 0.35) / 0.5 * Math.PI) * (falta + 3)) : 0;
  torre();
  const hb = tenido(hx - 8, 100, hx + 24, 152, NOCHE, 0.2, () => R.actor(EL.herbert, hx, 150, t, { dir: -1, sostiene: tamb ? false : sube ? [hx - 6, top + 2 + (falta > 0 ? 8 : 0)] : [hx - 4, 141], brazos: tamb, salto, sorpresa: tamb, sonrisa: !tamb && n > 0 && n < 5, enfado: false }));
  if (!tamb && hb?.mano) { const [mx, my] = hb.mano; if (u < 0.8 || t < A0) tenido(mx - 9, my - 6, mx + 3, my + 4, NOCHE, 0.15, () => { R.rect(mx - 8, my - 4, mx + 1, my + 2, K); R.rect(mx - 7, my - 3, mx, my + 1, BL); R.rect(mx - 6, my - 2, mx - 2, my - 2, hex('#8a8690')); R.rect(mx - 6, my, mx - 3, my, hex('#8a8690')); }); }
  // el contador de años, sobre la torre
  if (n > 0) { const late = t >= A0 && u > 0.82 || (t >= A6 && t < A6 + 0.15) ? 1 : 0, cy = Math.max(64, top - 26);
    R.rect(TX - 10, cy - 1, TX + 10, cy + 17, K); R.rect(TX - 9, cy, TX + 9, cy + 16, hex('#f1e7cf')); R.rect(TX - 9, cy, TX + 9, cy + 3, ROJO); R.pset(TX - 5, cy + 1, K); R.pset(TX + 5, cy + 1, K); R.rect(TX - 9, cy + 15, TX + 9, cy + 16, hex('#cdbf9b'));
    R.numero(String(n), TX, cy + 14 - late, { centro: true }); R.rect(TX, cy + 18, TX + 1, top - 1, K); }
  // cuando se tambalea, se le escapan tres hojas
  if (tamb) { for (let k = 0; k < 3; k++) { const e = t - TAMB - 0.15 - k * 0.22; if (e < 0) continue; const x = TX + (k - 1) * 9 + Math.sin(e * 5 + k) * 9 - e * 8, y = Math.min(149 + k, top - 4 + e * 34), f = y < 149 ? Math.floor(e * 9) % 2 : 0; R.rect(x - 5, y - 2 - f, x + 5, y + 2 + f, K); R.rect(x - 4, y - 1 - f, x + 4, y + 1 + f, mez(BL, NOCHE, 0.15)); R.rect(x - 2, y, x + 2, y, hex('#8a8690')); }
    const e = t - TAMB; if (e > 0.25 && Math.floor(e * 4) % 2 === 0) R.icono('!', hx + 6, 112, ORO, K, 2); }
  T.casaDelante(R, t, o);
};

// ── 2 · la cocina: Beverly escribe anuncios; cada hoja, una moneda ──────────────────────────────────────────────────
const SAC = [ws(6.4), ws(8.3)], HU = [262, 94];
const p2 = (t) => {
  const o = { encuadre: 'entrada', camara: 'cocina', lluvia: true }; T.casa(R, t, o);
  // la hucha, en la encimera
  const mon = SAC.map((s) => s + 0.55), dentro = mon.filter((m) => t >= m).length, bote = mon.some((m) => t >= m && t < m + 0.14) ? 2 : 0;
  PZ.hucha(R, HU[0], HU[1] - bote, {});
  // Herbert cruza por detrás con otra pila de notas, y se para a mirarla
  { const e = tramo(t, P2 + 0.1, ws(8.7)), x = Math.round(lerp(326, 84, e)), anda = e > 0 && e < 1;
    const hb = R.actor(EL.herbert, x, 150, t, { dir: -1, anda, sostiene: [x - 5, 141], sonrisa: !anda });
    if (hb?.mano) PZ.pilaNotas(R, hb.mano[0] - 4, hb.mano[1] + 5, { alto: 0.5, tambalea: true, t }); }
  // Beverly, en su mesa: teclea, saca la hoja y la levanta
  const k = t >= SAC[1] - 0.25 ? 1 : 0, s = SAC[k], saca = t >= s - 0.25 && t < s + 0.45, tecl = !saca && t > P2 + 0.3 && t < ws(9.2);
  const bv = R.actor(EL.beverly, 166, 146, t, { dir: 1, sostiene: saca ? [182, Math.round(lerp(134, 124, tramo(t, s - 0.25, s)))] : false, sonrisa: saca || t > SAC[1], salto: tecl && Math.floor(t * 9) % 4 === 0 ? 1 : 0 });
  T.casaDelante(R, t, o);
  // las teclas: chispitas sobre la máquina y el carro que avanza
  { const ini = k ? SAC[0] + 0.45 : P2 + 0.3, pr = tramo(t, ini, s - 0.25), hg = t >= s - 0.25 ? 0 : 3 + Math.round(pr * 8), cr = tecl ? Math.floor(t * 5.5) % 6 - 3 : 0; if (hg) { R.rect(197 + cr, 121 - hg, 211 + cr, 122, K); R.rect(198 + cr, 122 - hg, 210 + cr, 122, BL); for (let j = 2; j < hg; j += 2) R.rect(200 + cr, 122 - hg + j, 208 + cr - (j % 4), 122 - hg + j, hex('#8a8690')); } }
  if (tecl) { const f = Math.floor(t * 11); for (let i = 0; i < 2; i++) R.pset(196 + ((f * 7 + i * 5) % 17), 131 + ((f + i) % 2), BL); }
  // la hoja del anuncio: sale de la máquina a la mano y vuela al corcho; la moneda va a la hucha
  const anuncio = (x, y, kk, f = 0) => { x = Math.round(x); y = Math.round(y); const w = f ? 3 : 6; R.rect(x - w - 1, y - 8, x + w + 1, y + 8, K); R.rect(x - w, y - 7, x + w, y + 7, BL); if (!f) { R.rect(x - 4, y - 5, x + 4, y + 1, kk ? hex('#f0c040') : hex('#7ac0e8')); if (kk) { R.rect(x - 2, y - 4, x + 2, y, hex('#d8402c')); R.rect(x - 1, y - 5, x + 1, y - 5, hex('#8a8690')); } else { R.disco(x + 0.5, y - 1.5, 2.6, BL); R.pset(x + 2, y - 4, BL); R.pset(x - 3, y, BL); } R.rect(x - 4, y + 3, x + 4, y + 3, hex('#8a8690')); R.rect(x - 4, y + 5, x + 1, y + 5, hex('#8a8690')); } };
  SAC.forEach((s2, j) => { const e = t - s2; if (e < -0.25) return;
    const dest = [[78, 96], [100, 97]][j];
    if (e < 0.3) { const [mx, my] = bv?.mano ?? [182, 126]; anuncio(mx + 3, my - 6, j); }
    else { const v = ease(Math.min(1, (e - 0.3) / 0.7)), x = lerp(186, dest[0], v), y = lerp(118, dest[1], v) - Math.sin(v * Math.PI) * 26; anuncio(x, y, j, v < 1 ? Math.floor(e * 10) % 2 : 0); if (v >= 1) { R.disco(dest[0] + 0.5, dest[1] - 6.5, 1.6, ROJO); } }
    // la moneda
    const m = e - 0.05; if (m >= 0 && m < 0.5) { const v = m / 0.5, x = lerp(190, HU[0] + 1, v), y = lerp(120, HU[1] - 21, v) - Math.sin(v * Math.PI) * 30; R.disco(x + 0.5, y + 0.5, 3.6, K); R.disco(x + 0.5, y + 0.5, 2.6, Math.floor(m * 16) % 2 ? ORO : OROL); R.pset(Math.round(x), Math.round(y), hex('#b8862a')); for (let i = 1; i < 4; i++) R.pset(Math.round(lerp(190, HU[0] + 1, v - i * 0.05)), Math.round(lerp(120, HU[1] - 21, v - i * 0.05) - Math.sin((v - i * 0.05) * Math.PI) * 30), OROL); }
    if (m >= 0.5 && m < 0.85) { destello(HU[0] + 1, HU[1] - 24 - Math.round((m - 0.5) * 20), m < 0.65 ? 3 : 2, OROL); } });
};

// ── 3 · el planeta de noche, desde la roca: de las notas sale un mundo; un muchacho ─────────────────────────────────
const BOY = ws(12.0), LLEGA = ws(13.05);
const p3 = (t) => {
  const o = { encuadre: 'desierto', camara: 'roca', hora: 'noche', silueta: 0, brillo: 0.3, t0: P3 }, g = T.planeta(R, t, o), su = g?.suelo ?? 131;
  // las hojas de la torre caen del cielo y se deshacen en arena
  for (let k = 0; k < 9; k++) { const e = (t - P3 + 0.3 - k * 0.16) / 1.9; if (e < 0 || e > 1) continue; const x = 196 + hh(k, 1, 81) * 110 + Math.sin(e * 7 + k) * 10 - e * 26, y = -8 + e * (96 + hh(k, 2, 81) * 30), des = Math.max(0, (e - 0.55) / 0.45);
    if (x > 268 && y < 50) continue;
    if (des < 1) { const f = Math.floor(e * 12 + k) % 2, w = Math.round((f ? 5 : 3) * (1 - des * 0.6)), hg = Math.round((f ? 2 : 4) * (1 - des * 0.5)); R.rect(x - w - 1, y - hg - 1, x + w + 1, y + hg + 1, hex('#181228')); R.rect(x - w, y - hg, x + w, y + hg, mez(BL, hex('#c88868'), des)); if (w > 3) R.rect(x - 2, y, x + 2, y, hex('#8a8690')); }
    for (let i = 0; i < Math.round(des * 12); i++) R.pset(Math.round(x + (hh(k, i, 82) - 0.5) * 16 * des - des * 8), Math.round(y + hh(k, i, 83) * 22 * des), i % 2 ? hex('#c88868') : hex('#f0c08c')); }
  // la lagartija, que estaba al sol de las lunas, huye cuando llega el muchacho
  { const e = tramo(t, BOY + 0.5, BOY + 1.3), x = Math.round(lerp(126, 196, e * e)), y = su - 1 + (e > 0.75 ? Math.round((e - 0.75) * 30) : 0), f = e > 0 && e < 1 ? Math.floor(t * 16) % 2 : 0, c = hex('#a8f0c8');
    if (e < 1) { R.rect(x - 5, y - 3, x + 6, y, hex('#181228')); R.rect(x - 4, y - 2, x + 3, y - 1, c); R.rect(x - 3, y - 2, x + 1, y - 2, hex('#d8ffe8')); R.rect(x + 3, y - 2, x + 5, y - 1, c); R.pset(x + 5, y - 2, hex('#181228')); R.rect(x - 8, y - (f ? 1 : 0), x - 4, y - (f ? 1 : 0), c); R.pset(x - 2 + f, y, c); R.pset(x + 1 - f, y, c); if (Math.sin(t * 3) > 0.9 && e <= 0) R.pset(x + 6, y - 2, ROJO); } }
  // el muchacho sale de detrás del peñasco, llega al borde y señala el llano
  const e = tramo(t, BOY - 0.75, LLEGA), bx = Math.round(lerp(8, 116, e));
  if (e > 0) { tenido(bx - 4, su - 34, bx + 22, su + 2, hex('#281c50'), 0.22, () => R.actor(EL.estudiante1DU, bx, su, t, { dir: 1, anda: e < 1, dedo: e >= 1 && t > LLEGA + 0.15, sorpresa: e >= 1 && t > LLEGA + 0.35 }));
    if (e < 1 && Math.floor(t * 5) % 2) R.pset(bx - 2, su - 1, hex('#c88868')); }
  // lo que señala: un temblor en el llano, lejos (la loma llega en el plano siguiente)
  if (t > LLEGA + 0.3) { const d = t - LLEGA - 0.3; for (let k = 0; k < 8; k++) { const x = 250 + k * 7 + Math.round(Math.sin(t * 20 + k) * 1), y = 101 - Math.round(Math.abs(Math.sin(d * 5 + k * 0.8)) * 3); R.pset(x, y, hex('#f0c08c')); if (k % 2) R.pset(x + 1, y - 1, hex('#c88868')); } }
  T.planetaDelante(R, t, o);
};

// ── 4 · el planeta de día: la loma enorme bajo la arena y lo que todos se disputan ──────────────────────────────────
const TREN = ws(14.4), SPI = ws(15.84), PEL = ws(16.44);
const p4 = (t) => {
  const sil = ease(tramo(t, P4 - 0.1, P4 + 1.0)), br = lerp(0.12, 1, ease(tramo(t, SPI - 0.1, SPI + 0.8)));
  const o = { encuadre: 'desierto', hora: 'dia', silueta: sil, brillo: br, t0: P4 - 0.4, lomaEscala: 1.45 }, g = T.planeta(R, t, o), su = g?.suelo ?? 150;
  // el temblor: la arena salta delante de la loma y las piedras de la cresta tiemblan
  if (g?.loma && sil > 0.3) { const L = g.loma, x0 = L.x - L.len / 2, x1 = L.x + L.len / 2;
    // la ola de arena que empuja por delante y la polvareda que deja detrás (tres tonos)
    for (let k = 0; k < 26; k++) { const ph = (t * 1.5 + k * 0.137) % 1, x = x0 - 2 - (k % 9) * 2.2 + Math.sin(k * 7) * 3 - ph * 5, y = L.y - Math.sin(ph * Math.PI) * (5 + (k % 5) * 2.4); R.pset(Math.round(x), Math.round(y), k % 3 ? hex('#fcd68a') : hex('#b85a24')); if (k % 2) R.pset(Math.round(x) + 1, Math.round(y), hex('#fff0c8')); }
    for (let k = 0; k < 9; k++) { const ph = (t * 0.5 + k / 9) % 1, x = x1 - 6 + ph * 34 + (k % 3) * 5, y = L.y - 3 - ph * 9 - (k % 2) * 2, r = 2 + ph * 3.5; if (x < 318) R.disco(x, y, r, (px, py) => ((px + py) & 1 || ph < 0.4 ? (k % 3 === 0 ? hex('#fff0c8') : k % 3 === 1 ? hex('#fcd68a') : hex('#f2ac54')) : R.pget(px, py))); }
    // el filo de luz de la loma y su sombra en el llano, para que se lea de lejos
    for (let x = Math.round(x0) + 3; x < Math.min(319, x1 - 3); x++) { const f = (x - x0) / (x1 - x0), y = Math.round(L.y - Math.sin(Math.min(1, f * 1.6) * Math.PI / 2) * Math.sin(f * Math.PI) ** 0.5 * L.alto); if ((x + Math.floor(t * 8)) % 5) R.pset(x, y - 1, hex('#fff0c8')); if (x & 1) R.pset(x, L.y + 2, hex('#8a3c26')); R.pset(x, L.y + 1, hex('#b85a24')); } }
  // el muchacho: ve la loma, retrocede, y en «spice» recoge un puñado de arena que brilla
  const atras = ease(tramo(t, TREN - 0.3, TREN + 0.5)), bx = Math.round(lerp(78, 62, atras)), coge = tramo(t, SPI + 0.15, SPI + 0.6), tiene = t >= SPI + 0.6;
  const by = R.actor(EL.estudiante1DU, bx, su, t, { dir: 1, anda: atras > 0 && atras < 1, sorpresa: t > P4 + 0.6 && t < SPI, dedo: t > P4 + 0.5 && t < TREN - 0.3, sostiene: coge > 0 ? [bx + 14, Math.round(tiene ? su - 14 : lerp(su - 4, su - 14, coge))] : false, sonrisa: tiene });
  if (coge > 0 && by?.mano) { const [mx, my] = by.mano; R.rect(mx - 1, my - 2, mx + 2, my - 1, hex('#ff9a30')); R.pset(mx, my - 3, OROL); if (tiene) { destello(mx + 1, my - 4, Math.floor(t * 6) % 2 ? 2 : 3, Math.floor(t * 6) % 2 ? ORO : OROL); for (let i = 0; i < 3; i++) { const ph = (t * 1.5 + i / 3) % 1; R.pset(mx + i - 1, my + Math.round(ph * 10), hex('#ffb040')); } } }
  if (t > P4 + 0.7 && t < TREN + 0.4 && Math.floor(t * 5) % 2 === 0) R.icono('!', bx + 6, su - 40, ROJO, K, 2);
  // motas naranjas que suben de la arena desde «spice»
  if (t >= SPI) for (let k = 0; k < 22; k++) { const ph = (t * 0.6 + hh(k, 1, 91)) % 1, x = 20 + hh(k, 2, 91) * 280 + Math.sin(ph * 5 + k) * 3, y = 148 - hh(k, 3, 91) * 30 - ph * 16; if (hh(k, 4, 91) < (t - SPI) * 1.2 && ph < 0.8) R.pset(Math.round(x), Math.round(y), ph < 0.3 ? OROL : hex('#ff9a30')); }
  T.planetaDelante(R, t, o);
  // «a spice»: en primer término, un saco abierto que brilla; en «fighting over» dos manos tiran de él, cada una por su lado
  if (t >= SPI + 0.25) { const sale = ease(tramo(t, SPI + 0.25, SPI + 0.7)), lleg = ease(tramo(t, PEL - 0.45, PEL + 0.05)), tir = t >= PEL + 0.05;
    const osc = tir ? Math.round(Math.sin((t - PEL) * 5.5) * 7 + Math.sin((t - PEL) * 13) * 2) : 0, sx = 172 + osc, sy = Math.round(lerp(204, 172, sale)), est = tir ? Math.round(Math.abs(Math.sin((t - PEL) * 5.5)) * 2) : 0;
    for (let i = -17; i <= 17; i++) for (let j2 = 0; j2 < 3; j2++) if ((i + j2) & 1 && Math.abs(i) < 17 - j2 * 3) R.pset(sx + i + 2, sy + j2, mez(R.pget(sx + i + 2, sy + j2), hex('#8a3c26'), 0.5));
    R.poligono([[sx - 13 - est, sy], [sx - 15 - est, sy - 12], [sx - 10, sy - 21], [sx + 10, sy - 21], [sx + 15 + est, sy - 12], [sx + 13 + est, sy]], K);
    R.poligono([[sx - 12 - est, sy - 1], [sx - 14 - est, sy - 12], [sx - 9, sy - 20], [sx + 9, sy - 20], [sx + 14 + est, sy - 12], [sx + 12 + est, sy - 1]], hex('#b08a5a'));
    R.poligono([[sx + 3, sy - 20], [sx + 9, sy - 20], [sx + 14 + est, sy - 12], [sx + 12 + est, sy - 1], [sx + 5, sy - 1]], hex('#8a6a40')); for (let k = 0; k < 5; k++) { R.pset(sx - 9 + k * 4, sy - 6 - (k % 2), hex('#6a4e2c')); R.pset(sx - 8 + k * 4, sy - 13 + (k % 2), hex('#d0aa74')); }
    R.poligono([[sx - 9, sy - 20], [sx - 5, sy - 27], [sx + 5, sy - 27], [sx + 9, sy - 20]], K); R.poligono([[sx - 7, sy - 20], [sx - 4, sy - 26], [sx + 4, sy - 26], [sx + 7, sy - 20]], hex('#ff9a30')); R.rect(sx - 3, sy - 26, sx + 1, sy - 25, hex('#ffd070')); R.pset(sx + 3, sy - 23, hex('#d8642c')); R.pset(sx - 4, sy - 22, hex('#d8642c'));
    R.rect(sx - 10, sy - 20, sx + 10, sy - 19, hex('#d0aa74')); R.rect(sx - 10, sy - 18, sx + 10, sy - 18, hex('#6a4e2c'));
    for (let k = 0; k < 6; k++) { const ph = (t * 1.1 + k / 6) % 1; R.pset(sx - 8 + k * 3 + Math.round(Math.sin(ph * 7 + k) * 2), sy - 25 - Math.round(ph * 16), ph < 0.5 ? OROL : hex('#ff9a30')); }
    destello(sx - 7, sy - 31 - (Math.floor(t * 5) % 2), Math.floor(t * 6) % 2 ? 3 : 2, OROL); destello(sx + 8, sy - 26, Math.floor(t * 6) % 2 ? 1 : 2, ORO);
    if (lleg > 0) { const ax = Math.round(lerp(96, sx - 25, lleg)), bx2 = Math.round(lerp(248, sx + 25, lleg)), my = sy - 10;
      T.brazo(R, ax - 26, my + 26, ax, my, '#2c4a9a', 1, { codo: [ax - 18, my + 8], sombra: false }); T.brazo(R, bx2 + 26, my + 26, bx2, my, '#a8322c', -1, { codo: [bx2 + 18, my + 8], sombra: false });
      if (tir && Math.floor((t - PEL) * 3.5) % 2 === 0) { R.icono('!', sx - 30, sy - 40, ROJO, K, 2); R.icono('!', sx + 26, sy - 40, ROJO, K, 2); } } }
};

const efectos = [[A0 + 0.1, 'papel'], [A0 + (A6 - A0) / 2, 'papel'], [A6 - 0.1, 'papel'], [TAMB + 0.1, 'boing'],
  [P2 + 0.4, 'tecleo'], [SAC[0], 'campana'], [SAC[0] + 0.55, 'tic'], [ws(7.4), 'tecleo'], [SAC[1], 'papel'], [SAC[1] + 0.55, 'tic'],
  [P3 + 0.1, 'viento'], [P3 + 1.0, 'papel'],
  [P4 + 0.2, 'avalancha'], [SPI, 'brillo'], [PEL + 0.1, 'whoosh']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t >= P2 ? 1963 : 1960 + Math.min(3, Math.floor(tramo(t, A0, A6) * 3.99))) });
''')
