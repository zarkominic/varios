E = {}

# utilidades del grupo S5 (gt-lores y gt-ventas): cada escena las lleva dentro.
AUX = r'''
const K = T.C.k, BL = hex('#f6f4ec');
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const tin = (x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; const p = R.pget(x, y); if (p) R.pset(x, y, mez(p, c, a)); };
const tinta = (x0, y0, x1, y1, c, a) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) tin(x, y, c, a); };
const ovalo = (cx, cy, rx, ry, a, c = K) => { for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) tin(x, cy + j, c, a); } };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const tono = (r, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return r[l < 0 ? 0 : l >= r.length ? r.length - 1 : l]; };
const rampa = (...cs) => cs.map(hex);
const CAPAS = {};
const capa = (k, dib) => { if (!CAPAS[k]) { const b = R.nuevo(), prev = R.usar(b); dib(); R.recorte(null); R.usar(prev); CAPAS[k] = b; } return CAPAS[k]; };
const pon = (k, dib) => R.copiar(capa(k, dib));
// pega solo lo pintado de una capa (lo de delante de los personajes)
const ponDelante = (k, dib, y0 = 0, y1 = 179, dy = 0) => { const b = capa(k, dib); for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const c = b[y * 320 + x]; if (c) R.pset(x, y + dy, c); } };
const suave = (u) => u * u * (3 - 2 * u);
// recorrido por fotogramas clave [t, x, suelo, dir]: dónde está, si anda y hacia dónde mira
const ruta = (t, kf) => { if (t < kf[0][0]) return { x: kf[0][1], s: kf[0][2], mv: false, d: kf[0][3] ?? 1 };
  for (let i = 0; i + 1 < kf.length; i++) if (t < kf[i + 1][0]) { const [t0, x0, s0] = kf[i], [t1, x1, s1] = kf[i + 1], u = (t - t0) / (t1 - t0);
    return { x: Math.round(lerp(x0, x1, u)), s: Math.round(lerp(s0, s1, u)), mv: x1 !== x0, d: x1 < x0 ? -1 : x1 > x0 ? 1 : (kf[i + 1][3] ?? 1) }; }
  const f = kf[kf.length - 1]; return { x: f[1], s: f[2], mv: false, d: f[3] ?? 1 }; };
// caja con bisel (luz arriba, sombra abajo y a la derecha)
const caja3 = (x0, y0, x1, y1, base, luz, sombra) => { R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, luz); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, luz); R.rect(x1 - 1, y0 + 2, x1 - 1, y1 - 1, sombra); R.rect(x0 + 2, y1 - 1, x1 - 1, y1 - 1, sombra); };
// vetas de madera (horizontales)
const vetas = (x0, y0, x1, y1, veta, luz, k = 0, paso = 0.07) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = Math.sin(x * paso + Math.sin(y * 0.33 + k) * 1.8 + h(y >> 1, k, 3) * 2.4); if (v > 0.93) R.pset(x, y, veta); else if (luz && v < -0.96) R.pset(x, y, luz); } };
// la caja del juego, pequeña y de frente (10 × 13; (x, y) su esquina de arriba)
const cajaMini = (x, y) => { R.rect(x, y, x + 9, y + 12, K); R.rect(x + 1, y + 1, x + 8, y + 11, hex('#e0a030')); R.rect(x + 8, y + 1, x + 8, y + 11, hex('#a87018'));
  R.rect(x + 2, y + 2, x + 7, y + 7, hex('#1e2a50')); R.rect(x + 2, y + 5, x + 3, y + 7, hex('#6a6478')); R.rect(x + 5, y + 3, x + 6, y + 7, hex('#48445a')); R.pset(x + 6, y + 4, hex('#ffe890'));
  R.rect(x + 3, y + 7, x + 6, y + 7, hex('#d8303a')); R.rect(x + 2, y + 9, x + 5, y + 10, BL); R.pset(x + 7, y + 10, K); };
// el lomo de una caja de juego en la balda (7 × 11)
const cajita = (x, y, col, k) => { R.rect(x, y, x + 6, y + 10, K); R.rect(x + 1, y + 1, x + 5, y + 9, col); R.rect(x + 1, y + 1, x + 5, y + 1, mez(col, BL, 0.45)); R.rect(x + 5, y + 2, x + 5, y + 9, mez(col, K, 0.35));
  R.rect(x + 2, y + 3, x + 4, y + 5, [hex('#1e2a50'), BL, hex('#2a2832'), hex('#3a7a3a')][k % 4]); R.pset(x + 3, y + 4, k % 2 ? hex('#ff4a4a') : hex('#f0c040')); R.rect(x + 2, y + 7, x + 4, y + 8, mez(col, K, 0.5)); };
// la lluvia que cae dentro de un hueco [x0, y0, x1, y1] (con recorte)
const lluvia = (t, x0, y0, x1, y1, n, col, k = 0, v = 170) => { R.recorte([x0, y0, x1, y1]); for (let i = 0; i < n; i++) { const x = x0 + h(i, k, 7) * (x1 - x0 + 30), y = y0 + ((h(i, k, 9) * (y1 - y0 + 20) + t * v * (0.8 + h(i, k, 8) * 0.4)) % (y1 - y0 + 20)) - 10; R.linea(x - (y - y0) * 0.25, y, x - (y - y0) * 0.25 - 1, y + 3, col); } R.recorte(null); };
// el bocadillo grande con unos iconos dentro; u 0–1 lo hace crecer
const bocadillo = (cx, cy, w, hh, u, cola, dentro) => { if (u <= 0) return; const ww = Math.max(3, Math.round(w * u)), hy = Math.max(3, Math.round(hh * u)), x0 = Math.round(cx - ww / 2), y0 = Math.round(cy - hy / 2);
  R.rect(x0 + 1, y0, x0 + ww - 1, y0 + hy, K); R.rect(x0, y0 + 1, x0 + ww, y0 + hy - 1, K); R.rect(x0 + 1, y0 + 1, x0 + ww - 1, y0 + hy - 1, BL); R.rect(x0 + 1, y0 + hy - 2, x0 + ww - 1, y0 + hy - 1, hex('#d8d4ca'));
  if (cola) { const [tx, ty] = cola; R.poligono([[cx - 4, y0 + hy - 1], [cx + 2, y0 + hy - 1], [tx, ty]], K); R.poligono([[cx - 3, y0 + hy - 2], [cx + 1, y0 + hy - 2], [tx + (tx < cx ? 1 : -1), ty - 2]], BL); }
  if (u >= 1) dentro(x0, y0); };
'''

# ───────────────────────────────────────── gt-lores ─────────────────────────────────────────
E['gt-lores'] = ('Los Lores', '''// GT-LORES (frases 14–15), cartela «1997». Seis planos:
// 1. la Cámara de los Lores (londres 'lores'): lord Campbell trae la caja del juego por el pasillo y la deja en la mesa de
//    los secretarios en «House of Lords»; el ministro, a la derecha, levanta la vista de sus papeles;
// 2. las gradas de cerca (londres 'lores', cámara 'banco'): el lord se levanta en «A lord» y pregunta; en «stealing cars»
//    sale el bocadillo con el coche y la interrogación; su vecino de grada se vuelve, sorprendido;
// 3. LOCAL la mesa del despacho, de cerca: el ministro se levanta tras la caja de despachos y contesta («The government
//    replied»); en «concern» da un toque en la caja y los lores de detrás asienten («violent games»);
// 4. LOCAL la mesa del censor: la caja del juego sobre el cartapacio; en «censors» baja el sello y en «refused» estampa la
//    X roja; en «selling it» llegan las monedas y en «illegal» la cadena con el candado cierra la caja;
// 5. LOCAL la rotativa de noche: los periódicos se apilan («piled on»); en «headline» la primera plana vuela hacia
//    la cámara (sin letras: el coche y el rayo) y tiembla en «thugs»;
// 6. el quiosco con lluvia (londres 'redaccion', cámara 'quiosco'; gag 5): los periódicos humean en «noise»; dos
//    transeúntes se acercan, se preguntan qué es («want to know») y él compra uno que humea.''', AUX + r'''
const L = (f) => en('lores', f), Q = (f) => en('periodicos', f);
const P2 = L(0.2970), P3 = L(0.5691), P4 = L(0.7790), P5 = Q(0), P6 = Q(0.6468);

// ── 1 · la Cámara: la caja llega a los Lores ──
const G1 = { encuadre: 'lores' };
const LLEGA = L(0.205), DEJA = L(0.2514);
const p1 = (t) => {
  T.londres(R, t, G1);
  const q = ruta(t, [[1.3, -18, 152, 1], [LLEGA, 96, 152, 1]]);
  const tiene = t < DEJA, tiende = t > LLEGA - 0.2 && tiene;
  const a = R.actor(EL.lordCampbell, q.x, q.s, t, { dir: 1, anda: q.mv, sostiene: tiene ? (tiende ? [q.x + 24, 116] : true) : undefined,
    dedo: !tiene && t > DEJA + 0.35, habla: !tiene && t > DEJA + 0.4 && Math.sin(t * 8) > 0, sonrisa: !tiene && t < DEJA + 0.35 });
  if (tiene) { const [mx, my] = a.mano; cajaMini(mx - 3, my - 12); } else { cajaMini(133, 103); if (t < DEJA + 0.7) for (const [dx, dy] of [[-5, -4], [14, -4], [-6, 8], [15, 8], [4, -8]]) R.linea(137 + dx, 109 + dy, 137 + dx * 1.3, 109 + dy * 1.3, hex('#fff0a0')); }
  // el ministro lee sus papeles y levanta la vista cuando la caja toca la mesa
  const lee = t < DEJA + 0.1;
  const m = R.actor(EL.ministroLores, 252, 152, t, { dir: -1, sostiene: lee ? true : undefined, sorpresa: !lee && t < DEJA + 1.1, dedo: t > DEJA + 1.2 });
  if (lee) { const [mx, my] = m.mano; R.rect(mx - 6, my - 7, mx + 1, my + 2, K); R.rect(mx - 5, my - 6, mx, my + 1, BL); R.rect(mx - 4, my - 4, mx - 1, my - 4, hex('#9a9aa6')); R.rect(mx - 4, my - 2, mx - 1, my - 2, hex('#9a9aa6')); }
  T.londresDelante(R, t, G1);
  bocadillo(138, 66, 34, 40, suave(tramo(t, DEJA + 0.05, DEJA + 0.3)) * (t < P2 - 0.15 ? 1 : 0), [138, 100], (x0, y0) => T.PIEZAS_GT.cajaJuego(R, x0 + 17, y0 + 35, {}));
};

// ── 2 · las gradas: el lord se levanta y pregunta ──
const G2 = { encuadre: 'lores', camara: 'banco' };
const PIE = P2 + 0.12, PREGUNTA = L(0.4876);
const p2 = (t) => {
  T.londres(R, t, G2);
  const s = Math.round(lerp(171, 156, suave(tramo(t, PIE, PIE + 0.55))));
  const hablando = t > L(0.3173) && t < L(0.5129) + 0.25;
  R.actor(EL.lordAvebury, 176, 171, t, { dir: t > PIE + 0.3 ? -1 : 1, sorpresa: t > PREGUNTA + 0.1 && t < PREGUNTA + 1.3, sonrisa: t > PREGUNTA + 1.3 });
  const a = R.actor(EL.lordCampbell, 132, s, t, { dir: 1, habla: hablando && Math.sin(t * 9) > -0.3, dedo: t > L(0.41) && t < L(0.53) });
  T.londresDelante(R, t, G2);
  // el bocadillo: un coche robado y la interrogación
  bocadillo(a.cabeza[0] + 34, a.cabeza[1] - 16, 40, 22, suave(tramo(t, PREGUNTA, PREGUNTA + 0.25)), [a.cabeza[0] + 9, a.cabeza[1] - 2], (x0, y0) => {
    R.icono('coche', x0 + 5, y0 + 4, hex('#d8303a'), K, 2); R.icono('?', x0 + 25, y0 + 4, hex('#2a2832'), hex('#c8c4ba'), 2); });
};

// ── 3 · LOCAL la mesa del despacho: contesta el ministro ──
const RO = rampa('#3a2010', '#5a3418', '#7a4a24', '#9a6234', '#b47a44');
const fondo3 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  // la cornisa (tranquila, bajo la barra del año) y el friso dorado
  rect(0, 0, 319, 15, hex('#2a170c')); for (let x = 2; x < 320; x += 7) { rect(x, 10, x + 3, 13, hex('#3a2212')); pset(x, 10, hex('#4a2c16')); }
  rect(0, 15, 319, 15, hex('#c8963c')); rect(0, 16, 319, 16, hex('#7a5420')); rect(0, 17, 319, 18, RO[0]);
  // la pared de paneles de pliegues, en dos filas
  rect(0, 19, 319, 100, RO[1]);
  const pl = (x0, y0, x1, y1, apaga) => {
    const M = apaga ? RO[1] : RO[2], Lz = apaga ? RO[2] : RO[3], S = RO[1], SS = RO[0];
    rect(x0, y0, x1, y1, SS); rect(x0 + 1, y0 + 1, x1, y1, S); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, M); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, Lz); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, Lz);
    for (let x = x0 + 4; x <= x1 - 5; x += 4) { rect(x, y0 + 6, x, y1 - 6, Lz); rect(x + 2, y0 + 6, x + 2, y1 - 6, S); pset(x + 1, y0 + 5, S); pset(x + 1, y1 - 5, Lz); pset(x, y0 + 5, S); pset(x + 2, y1 - 5, Lz); }
    rect(x0 + 3, y0 + 3, x1 - 3, y0 + 3, S); rect(x0 + 3, y1 - 3, x1 - 3, y1 - 3, Lz);
    vetas(x0 + 2, y0 + 2, x1 - 2, y1 - 2, S, null, x0 * 0.1 + y0, 0.21);
  };
  for (let c = 0; c < 12; c++) { const x0 = 3 + c * 27, x1 = x0 + 23; pl(x0, 22, x1, 56, x0 > 262); pl(x0, 60, x1, 96, false); }
  rect(0, 57, 319, 59, RO[0]); rect(0, 58, 319, 58, RO[2]);
  // dos apliques de latón (las velas se encienden en cada fotograma)
  for (const x of [58, 254]) { rect(x - 1, 50, x + 1, 64, hex('#8a6420')); rect(x - 6, 60, x + 6, 62, hex('#c8963c')); rect(x - 6, 62, x + 6, 62, hex('#7a5420')); for (const dx of [-5, 0, 5]) { rect(x + dx - 1, 52, x + dx + 1, 59, hex('#f2ecd8')); pset(x + dx + 1, 53, hex('#c8c0a8')); } ovalo(x, 60, 18, 14, 0.12, hex('#ffd890')); }
  // el respaldo rojo del banco de detrás, capitoné, con su rodillo
  rect(0, 98, 319, 125, hex('#8a1e2c')); rect(0, 98, 319, 101, hex('#b8283a')); rect(0, 99, 319, 99, hex('#d84a5a')); rect(0, 102, 319, 102, hex('#5e1420'));
  for (let y = 106; y < 124; y += 6) for (let x = (y / 6) % 2 ? 4 : 8; x < 320; x += 8) { pset(x, y, hex('#5e1420')); pset(x + 1, y, hex('#c8384a')); linea(x - 3, y - 3, x, y, hex('#9e2232')); }
  rect(0, 124, 319, 125, hex('#4a0e18'));
  // el asiento del banco y su sombra (la mesa de delante tapa el resto)
  rect(0, 126, 319, 131, hex('#a8283a')); rect(0, 126, 319, 126, hex('#d84a5a')); for (let x = 3; x < 320; x += 9) pset(x, 129, hex('#7a1a28')); rect(0, 132, 319, 139, hex('#2a1a12')); for (let x = 0; x < 320; x += 5) pset(x, 134 + (x % 3), hex('#3a2418'));
  // el cuadro grande con marco dorado: el Támesis con nubes, una barcaza y la orilla
  rect(114, 22, 206, 94, K); rect(115, 23, 205, 93, hex('#c8963c')); rect(117, 25, 203, 91, hex('#8a6420')); rect(115, 23, 205, 23, hex('#ffe890')); rect(115, 23, 115, 93, hex('#ffe890'));
  for (let y = 28; y < 89; y++) for (let x = 120; x < 201; x++) pset(x, y, y < 62 ? tono(rampa('#5a7aa8', '#7a9ac0', '#a8bcd0', '#d8c8a8'), (y - 28) / 10 + (h(x >> 1, y, 13) - 0.5) * 0.4, x, y) : y < 72 ? tono(rampa('#3a5a3a', '#4a6a44', '#5a7a4e'), 1 + (h(x, y, 14) - 0.5), x, y) : tono(rampa('#3a5a7a', '#4a6a8a', '#6a8aa8'), 1 + Math.sin(x * 0.5 + y) * 0.6, x, y));
  for (const [cx, cy, w] of [[140, 36, 10], [178, 42, 13], [160, 33, 7]]) for (let j = -3; j <= 3; j++) { const ww = Math.round(w * Math.sqrt(1 - (j / 4) ** 2)); rect(cx - ww, cy + j, cx + ww, cy + j, j < 0 ? hex('#f2ecd8') : j < 2 ? hex('#d8d4ca') : hex('#b8b4ac')); }
  rect(130, 50, 136, 62, hex('#4a4a5a')); poligono([[129, 50], [133, 42], [137, 50]], hex('#4a4a5a')); rect(150, 54, 190, 62, hex('#5a5a68')); for (let x = 152; x < 190; x += 5) rect(x, 50, x + 2, 54, hex('#5a5a68'));
  rect(166, 74, 186, 78, hex('#5a3418')); rect(174, 64, 175, 74, hex('#3a2a20')); poligono([[175, 64], [175, 72], [184, 72]], hex('#e8dcc0'));
  for (let x = 121; x < 200; x += 6) pset(x, 80 + (x % 4), hex('#a8c8e0'));
  // los micrófonos colgados: el cable baja del techo
  for (const x of [104, 214]) linea(x, 17, x, 40, hex('#1c1222'));
};
// la mesa de delante, con la caja de despachos, libros, la jarra y la maza
const mesa3 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  rect(0, 132, 319, 179, K);
  for (let y = 133; y <= 138; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(RO, 3.2 - (y - 133) * 0.35 + Math.sin(x * 0.06 + Math.sin(y) * 2) * 0.35, x, y));
  rect(0, 133, 319, 133, hex('#d4975a')); rect(0, 139, 319, 140, RO[0]);
  for (let y = 141; y <= 179; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(RO, 2.1 + Math.sin(x * 0.11 + Math.sin(y * 0.4) * 2.2) * 0.3 - (y - 141) / 70, x, y));
  for (let c = 0; c < 8; c++) { const x0 = 6 + c * 40, x1 = x0 + 32; rect(x0, 146, x1, 172, RO[0]); rect(x0 + 1, 147, x1, 172, RO[1]); rect(x0 + 1, 147, x1 - 1, 171, RO[2]); rect(x0 + 1, 147, x1 - 1, 147, RO[3]); rect(x0 + 3, 150, x1 - 3, 168, RO[1]); rect(x0 + 4, 151, x1 - 4, 167, RO[2]); disco(x0 + 16, 159, 3, hex('#c8963c')); pset(x0 + 15, 158, hex('#ffe890')); }
  rect(0, 143, 319, 143, hex('#c8963c')); rect(0, 144, 319, 144, hex('#7a5420'));
  // la caja de despachos de latón y roble (x 104–142)
  rect(104, 118, 142, 133, K); rect(105, 119, 141, 132, hex('#7a3a1e')); vetas(105, 120, 141, 131, hex('#5a2a14'), hex('#9a5230'), 4, 0.15);
  rect(105, 119, 141, 121, hex('#9a5230')); rect(104, 117, 142, 118, K); rect(105, 116, 141, 117, hex('#c8963c'));
  for (const x of [105, 138]) { rect(x, 119, x + 3, 132, hex('#c8963c')); pset(x + 1, 120, hex('#ffe890')); }
  rect(118, 124, 128, 127, hex('#c8963c')); rect(122, 125, 124, 126, K);
  // libros apilados a la izquierda
  [[14, 120, 46, '#2a5a3a'], [16, 125, 44, '#8a1e2c'], [12, 129, 48, '#1e3a6a']].forEach(([x0, y0, x1, c]) => { rect(x0, y0, x1, y0 + 4, K); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 3, hex(c)); rect(x1 - 4, y0 + 1, x1 - 1, y0 + 3, hex('#f2ecd8')); rect(x0 + 3, y0 + 2, x0 + 8, y0 + 2, hex('#c8963c')); });
  // papeles y la pluma
  poligono([[56, 132], [60, 126], [86, 126], [84, 132]], K); poligono([[57, 131], [61, 127], [85, 127], [83, 131]], BL); for (let i = 0; i < 3; i++) linea(62, 128 + i, 80, 128 + i, hex('#a8a4b0'));
  linea(70, 124, 84, 130, K);
  // la maza dorada, tumbada en la mesa
  rect(196, 128, 300, 130, K); rect(197, 129, 299, 129, hex('#e0b048')); for (let x = 200; x < 298; x += 8) pset(x, 129, hex('#fff0a0'));
  disco(296, 127, 6, K); disco(296, 127, 5, hex('#e0b048')); pset(294, 124, hex('#fff0a0')); rect(293, 120, 299, 122, K); rect(294, 120, 298, 121, hex('#e0b048')); disco(200, 129, 3, hex('#c8963c'));
  // la jarra de agua y el vaso
  rect(170, 116, 180, 132, K); rect(171, 117, 179, 131, hex('#a8d0e8')); rect(171, 124, 179, 131, hex('#7ab0d8')); rect(172, 118, 173, 129, hex('#e8f4fc')); rect(180, 120, 182, 126, K);
  rect(184, 124, 190, 132, K); rect(185, 125, 189, 131, hex('#c8e4f4')); rect(185, 128, 189, 131, hex('#8ac0e0'));
};
const p3 = (t) => {
  pon('despacho', fondo3);
  // las velas de los apliques titilan
  for (const x of [58, 254]) for (const dx of [-5, 0, 5]) { const f = Math.sin(t * 13 + dx + x) > 0.2; R.pset(x + dx, 50, hex('#ffd860')); R.pset(x + dx, 49, f ? hex('#fff6c0') : hex('#ffb040')); if (f) R.pset(x + dx + (Math.sin(t * 7 + dx) > 0 ? 1 : -1), 48, hex('#ffe890')); }
  // los micrófonos que se mecen
  for (const [x, k] of [[104, 0], [214, 2]]) { const dx = Math.round(Math.sin(t * 1.3 + k) * 1.5); R.linea(x, 40, x + dx, 64, hex('#1c1222')); R.rect(x + dx - 2, 64, x + dx + 2, 70, K); R.rect(x + dx - 1, 65, x + dx + 1, 69, hex('#4a4856')); R.pset(x + dx - 1, 65, hex('#8a8aa0')); }
  // los lores del banco de detrás: asienten en «violent games»
  const asiente = t > L(0.7273) && t < L(0.7273) + 1.6;
  [[20, 'peluca'], [46, 'calvo'], [72, 'peluca'], [210, 'calvo'], [236, 'peluca'], [262, 'calvo'], [288, 'peluca']].forEach(([x, tipo], i) => {
    const bob = asiente && i % 2 === 0 ? Math.round(Math.abs(Math.sin(t * 8 + i))) : Math.round(Math.max(0, Math.sin(t * 0.7 + i * 2) - 0.9) * 10);
    R.busto(tipo, T.tela(i % 3 ? '#b8283a' : '#2a2a3a', i % 3 ? '#8a1e2c' : '#1c1c26', { H: '#f2f0ea', h: '#cfcac0', W: '#e8e8ee', S: '#f0c49a', s: '#d8a070' }), x, 104 + bob, t, { rie: asiente && i === 4, saluda: asiente && i === 5 });
    if (asiente && i === 5) { const ay = 104 + 3 - Math.round(Math.abs(Math.sin(t * 10 + x)) * 2); R.rect(x + 8, ay - 7, x + 15, ay, K); R.rect(x + 9, ay - 6, x + 14, ay - 1, BL); R.rect(x + 10, ay - 4, x + 13, ay - 4, hex('#9a9aa6')); }
  });
  // un papel que un lord agita en «violent games»
  // el ministro se levanta tras la mesa y contesta; en «concern» toca la caja
  const s = Math.round(lerp(158, 135, suave(tramo(t, P3 + 0.1, P3 + 0.6)))), TOCA = L(0.6867);
  R.actor(EL.ministroLores, 150, s, t, { dir: -1, habla: t > L(0.5904) - 0.1 && Math.sin(t * 8.5) > -0.3 && !(t > TOCA && t < TOCA + 0.4), dedo: t > TOCA - 0.15 && t < TOCA + 1.3, enfado: t > TOCA && t < TOCA + 1.3 });
  ponDelante('despachoMesa', mesa3, 108, 171, 8);
  if (t > TOCA && t < TOCA + 0.3) for (const [dx, dy] of [[-4, -3], [0, -5], [4, -3]]) R.linea(136 + dx, 121 + dy, 136 + dx * 2, 121 + dy * 2, hex('#fff0a0'));
};

// ── 4 · LOCAL la mesa del censor: el sello y el candado ──
const SELLO = L(0.8408), BAJA = L(0.8185), VENDE = L(0.9290), ILEGAL = L(0.9706);
const fondo4 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  const PA = rampa('#7a8a78', '#8a9a86', '#9aaa94', '#aab8a2');
  for (let y = 0; y < 76; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(PA, 1.6 + (h(x >> 1, y >> 1, 41) - 0.5) * 0.9 - (y < 16 ? 0.6 : 0) + (x < 140 ? 0.3 : 0) - (x > 270 && y < 48 ? 0.4 : 0), x, y));
  rect(0, 16, 319, 16, hex('#6a7a68'));
  // el título enmarcado (sin letras: el sello rojo y unas rayas)
  rect(28, 22, 86, 60, K); rect(29, 23, 85, 59, hex('#5a3418')); rect(30, 24, 84, 58, hex('#7a4a24')); rect(33, 27, 81, 55, hex('#f2ecd8')); for (let y = 31; y < 46; y += 3) rect(37, y, 77 - (y % 2) * 8, y, hex('#a8a4b0'));
  disco(70, 49, 5, hex('#b8283a')); disco(70, 49, 3, hex('#d84a5a')); linea(66, 54, 64, 58, hex('#b8283a')); linea(73, 54, 75, 58, hex('#b8283a'));
  // el calendario de pared (números sueltos) con el día rodeado
  rect(102, 20, 136, 62, K); rect(103, 21, 135, 61, BL); rect(103, 21, 135, 29, hex('#b8283a')); rect(110, 18, 111, 23, K); rect(127, 18, 128, 23, K);
  for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) rect(106 + i * 5, 33 + j * 6, 108 + i * 5, 35 + j * 6, hex('#8a8aa0'));
  for (let a = 0; a < 6.3; a += 0.25) pset(117 + Math.round(Math.cos(a) * 4), 46 + Math.round(Math.sin(a) * 3), hex('#d8282e'));
  // la balda con latas de película y cintas de vídeo
  rect(150, 56, 262, 58, K); rect(151, 56, 261, 57, hex('#9a6234')); for (const x of [156, 254]) { rect(x, 58, x + 3, 64, K); rect(x + 1, 58, x + 2, 63, hex('#7a4a24')); }
  for (let i = 0; i < 4; i++) { const y = 54 - i * 4; rect(154, y - 3, 184, y, K); rect(155, y - 2, 183, y - 1, i % 2 ? hex('#b8bcc8') : hex('#d8dce6')); pset(170, y - 2, hex('#8a8ea0')); }
  for (let i = 0; i < 9; i++) { const x = 192 + i * 7; rect(x, 34, x + 5, 55, K); rect(x + 1, 35, x + 4, 54, hex('#2a2832')); rect(x + 1, 38, x + 4, 46, [hex('#f2ecd8'), hex('#e8c040'), hex('#c8e4f4')][i % 3]); rect(x + 2, 40, x + 3, 40, hex('#8a8aa0')); }
  // la mesa: el tablero con vetas, el canto del fondo y el cartapacio verde con el filete dorado
  const MA = rampa('#3a1e0e', '#5a3018', '#7a4224', '#94562e');
  for (let y = 76; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(MA, 2 + Math.sin(x * 0.045 + Math.sin(y * 0.21) * 2.3 + h(y >> 2, 1, 5) * 1.5) * 0.55 + (y - 76) / 260, x, y));
  rect(0, 74, 319, 76, K); rect(0, 76, 319, 77, hex('#a8683a'));
  rect(66, 90, 254, 174, K); rect(67, 91, 253, 173, hex('#2e5a3a'));
  for (let y = 92; y < 173; y++) for (let x = 68; x < 253; x++) if (h(x, y, 11) > 0.86) pset(x, y, hex('#28503a')); else if (h(x, y, 12) > 0.94) pset(x, y, hex('#36684a'));
  rect(70, 94, 250, 94, hex('#c8963c')); rect(70, 170, 250, 170, hex('#c8963c')); rect(70, 94, 70, 170, hex('#c8963c')); rect(250, 94, 250, 170, hex('#c8963c'));
  // la lámpara de banquero (pantalla verde) y su charco de luz
  ovalo(36, 128, 40, 20, 0.22, hex('#ffe8a0'));
  rect(24, 120, 48, 124, K); rect(25, 120, 47, 123, hex('#c8963c')); rect(25, 120, 47, 120, hex('#ffe890')); rect(34, 92, 37, 120, K); rect(35, 92, 36, 119, hex('#c8963c'));
  poligono([[14, 92], [20, 80], [52, 80], [58, 92]], K); poligono([[16, 91], [21, 81], [51, 81], [56, 91]], hex('#1e6a3a')); linea(22, 82, 50, 82, hex('#4aa86a')); linea(18, 89, 54, 89, hex('#124a28'));
  rect(16, 92, 56, 94, hex('#f6e8a0')); ovalo(36, 98, 14, 4, 0.35, hex('#fff6c0'));
  // la caja de tampón con la tinta roja
  rect(262, 118, 298, 134, K); rect(263, 119, 297, 133, hex('#8a8ea0')); rect(266, 121, 294, 131, hex('#b8283a')); for (let x = 268; x < 293; x += 3) pset(x, 125 + (x % 2), hex('#8a1e2c')); rect(263, 112, 297, 118, K); rect(264, 113, 296, 117, hex('#b8bcc8'));
  // los papeles y la pluma
  for (let i = 0; i < 4; i++) { rect(8 + i * 2, 140 - i, 58 + i * 2, 172 - i, K); rect(9 + i * 2, 141 - i, 57 + i * 2, 171 - i, i === 3 ? BL : hex('#e8e2d0')); }
  for (let y = 144; y < 166; y += 3) rect(16, y, 52 - (y % 4) * 4, y, hex('#a8a4b0'));
  linea(30, 176, 58, 160, K); linea(31, 176, 58, 161, hex('#2a2a3a')); pset(57, 161, hex('#e0b048'));
};
const cajaGrande = (x, y) => {
  const { rect, pset, linea, disco, poligono } = R, w = 60, hh = 74;
  tinta(x + 3, y + 4, x + w + 4, y + hh + 4, K, 0.4);
  rect(x, y, x + w, y + hh, K); rect(x + 1, y + 1, x + w - 1, y + hh - 1, hex('#e0a030')); rect(x + 1, y + 1, x + w - 1, y + 2, hex('#f6c860')); rect(x + w - 2, y + 2, x + w - 1, y + hh - 1, hex('#a87018'));
  rect(x + 4, y + 5, x + w - 5, y + 48, K); rect(x + 5, y + 6, x + w - 6, y + 47, hex('#1e2a50'));
  for (let i = 0; i < 9; i++) pset(x + 7 + Math.round(h(i, 2, 3) * (w - 14)), y + 8 + Math.round(h(i, 3, 3) * 12), hex('#f6f2c8'));
  disco(x + w - 14, y + 13, 4, hex('#f6e8a0')); disco(x + w - 12, y + 12, 3, hex('#1e2a50'));
  [[6, 22, 12, '#6a6478'], [14, 16, 9, '#48445a'], [24, 26, 10, '#5a5468'], [35, 18, 8, '#48445a'], [44, 24, 10, '#6a6478']].forEach(([dx, dy, ww, c]) => { rect(x + dx, y + dy, x + dx + ww, y + 40, hex(c)); for (let yy = y + dy + 3; yy < y + 38; yy += 4) for (let xx = x + dx + 2; xx < x + dx + ww - 1; xx += 3) if (h(xx, yy, 6) > 0.4) pset(xx, yy, hex('#ffe890')); });
  rect(x + 5, y + 40, x + w - 6, y + 47, hex('#3a3a44')); for (let xx = x + 8; xx < x + w - 8; xx += 6) rect(xx, y + 43, xx + 2, y + 43, hex('#f0c040'));
  // el coche rojo de la portada (de perfil) y el rayo
  const cx = x + 16, cy = y + 34; rect(cx + 4, cy - 5, cx + 18, cy - 1, K); rect(cx, cy - 1, cx + 26, cy + 5, K); rect(cx + 5, cy - 4, cx + 17, cy - 1, hex('#d8303a')); rect(cx + 1, cy, cx + 25, cy + 4, hex('#d8303a')); rect(cx + 7, cy - 3, cx + 10, cy - 1, hex('#a8d8f0')); rect(cx + 12, cy - 3, cx + 15, cy - 1, hex('#a8d8f0')); rect(cx + 1, cy, cx + 25, cy, hex('#ff6a5a'));
  disco(cx + 6, cy + 5, 2.5, K); disco(cx + 20, cy + 5, 2.5, K); pset(cx + 25, cy + 1, hex('#ffe890'));
  poligono([[x + 40, y + 9], [x + 34, y + 22], [x + 39, y + 22], [x + 35, y + 33], [x + 46, y + 18], [x + 41, y + 18], [x + 45, y + 9]], hex('#ffe060'));
  // la etiqueta de abajo: rayas y el hueco vacío de la calificación
  rect(x + 4, y + 52, x + w - 5, y + hh - 5, K); rect(x + 5, y + 53, x + w - 6, y + hh - 6, BL);
  for (let yy = y + 56; yy < y + hh - 8; yy += 3) rect(x + 8, yy, x + 34 - (yy % 2) * 6, yy, hex('#8a8aa0'));
  rect(x + w - 20, y + 55, x + w - 9, y + hh - 9, hex('#c8c4ba')); rect(x + w - 19, y + 56, x + w - 10, y + hh - 10, BL);
};
const p4 = (t) => {
  pon('censor', fondo4);
  // el té que humea, a la derecha
  R.rect(282, 150, 310, 156, K); R.rect(283, 151, 309, 155, BL); R.rect(288, 140, 304, 152, K); R.rect(289, 141, 303, 151, BL); R.rect(290, 142, 302, 143, hex('#8a5a2a')); R.rect(304, 143, 307, 148, K);
  for (let i = 0; i < 4; i++) { const y = 136 - ((t * 9 + i * 6) % 22), x = 296 + Math.round(Math.sin(t * 2 + i * 1.7 + y * 0.2) * 2); R.pset(x, y, hex('#e8e8e2')); R.pset(x + 1, y - 1, hex('#d0d0ca')); }
  // la caja se desliza hasta el centro del cartapacio
  const u = suave(tramo(t, P4 + 0.05, P4 + 0.6)), bx = Math.round(lerp(-70, 150, u)), by = 94;
  cajaGrande(bx, by);
  // la X roja estampada (con la textura de la tinta)
  if (t > SELLO) { const cx = 180, cy = 128;
    for (let j = -20; j <= 20; j++) for (let i = -20; i <= 20; i++) { const r = Math.hypot(i, j); if (r > 17 && r < 20 && h(i + 40, j + 40, 21) > 0.18) R.pset(cx + i, cy + j, hex('#c8202a')); }
    for (let k = -12; k <= 12; k++) for (let d = -2; d <= 2; d++) { if (h(k + 50, d + 9, 22) > 0.12) R.pset(cx + k + d, cy + k, hex('#d8282e')); if (h(k + 70, d + 9, 23) > 0.12) R.pset(cx + k + d, cy - k, hex('#d8282e')); } }
  // el sello baja desde arriba (la mano queda fuera de cuadro), estampa y se va
  const baja = suave(tramo(t, BAJA - 0.35, BAJA + 0.1)), golpe = tramo(t, SELLO - 0.12, SELLO), sube = suave(tramo(t, SELLO + 0.25, SELLO + 0.8));
  const fondoY = Math.round(lerp(-20, 78, baja) + golpe * 54 - sube * 180);
  if (fondoY > -10) { const sx = 180;
    R.rect(sx - 4, -2, sx + 4, fondoY - 12, K); R.rect(sx - 3, -2, sx + 3, fondoY - 12, hex('#8a5a2a')); R.rect(sx - 3, -2, sx - 2, fondoY - 12, hex('#b47a44'));
    R.disco(sx, fondoY - 13, 6, K); R.disco(sx, fondoY - 13, 5, hex('#9a6234')); R.pset(sx - 2, fondoY - 15, hex('#c89058'));
    R.rect(sx - 17, fondoY - 8, sx + 17, fondoY, K); R.rect(sx - 16, fondoY - 7, sx + 16, fondoY - 3, hex('#7a4a24')); R.rect(sx - 16, fondoY - 7, sx + 16, fondoY - 7, hex('#b47a44')); R.rect(sx - 16, fondoY - 2, sx + 16, fondoY - 1, hex('#b8283a')); }
  if (t > SELLO && t < SELLO + 0.3) for (const [dx, dy] of [[-26, -6], [26, -6], [-30, 4], [30, 4]]) R.linea(180 + dx, 128 + dy, 180 + dx * 1.2, 128 + dy * 1.4, hex('#fff0a0'));
  // en «selling it» llegan las monedas por la izquierda
  const mv = suave(tramo(t, VENDE - 0.1, VENDE + 0.45));
  if (mv > 0) for (let i = 0; i < 3; i++) { const x = Math.round(lerp(-20, 108, mv)) - i * 3, y = 156 - i * 3; R.disco(x, y, 6, K); R.disco(x, y, 5, hex('#e0b048')); R.disco(x, y, 3, hex('#c8963c')); R.pset(x - 2, y - 2, hex('#fff0a0')); }
  // en «illegal» la cadena cae en diagonal y el candado la cierra; sobre las monedas, la señal de prohibido
  const cae = suave(tramo(t, ILEGAL - 0.35, ILEGAL));
  if (cae > 0) { const off = Math.round((1 - cae) * -60);
    for (let k = 0; k < 14; k++) { const x = 144 + k * 6, y = 96 + k * 6 + off; R.rect(x - 2, y - 2, x + 3, y + 3, K); R.rect(x - 1, y - 1, x + 2, y + 2, k % 2 ? hex('#b8bcc8') : hex('#8a8ea0')); if (k % 2) R.rect(x, y, x + 1, y + 1, K); R.pset(x - 1, y - 1, hex('#e8ecf2')); }
    const lx = 176, ly = 118 + off; R.rect(lx - 9, ly - 8, lx + 9, ly - 6, K); R.rect(lx - 9, ly - 8, lx - 7, ly, K); R.rect(lx + 7, ly - 8, lx + 9, ly, K); R.rect(lx - 8, ly - 7, lx - 8, ly, hex('#b8bcc8')); R.rect(lx + 8, ly - 7, lx + 8, ly, hex('#b8bcc8'));
    R.rect(lx - 12, ly, lx + 12, ly + 18, K); R.rect(lx - 11, ly + 1, lx + 11, ly + 17, hex('#e0b048')); R.rect(lx - 11, ly + 1, lx + 11, ly + 2, hex('#fff0a0')); R.rect(lx + 9, ly + 3, lx + 11, ly + 17, hex('#a87a18')); R.disco(lx, ly + 8, 2, K); R.rect(lx, ly + 9, lx, ly + 13, K); }
  if (t > ILEGAL + 0.1 && mv > 0) { const x = 104, y = 150; for (let j = -13; j <= 13; j++) for (let i = -13; i <= 13; i++) { const r = Math.hypot(i, j); if ((r > 10.5 && r < 13.5) || (r < 11 && Math.abs(i - j) < 2.2)) R.pset(x + i, y + j, hex('#d8282e')); } }
};

// ── 5 · LOCAL la rotativa: los periódicos se apilan y la primera plana vuela ──
const PILA = Q(0.0629), TITULAR = Q(0.2783), MATONES = Q(0.5448), GLORIA = Q(0.4074);
const ROD = [[64, 70], [104, 70], [144, 70], [84, 108], [124, 108], [164, 108]];
const fondo5 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  // la viga del techo (tranquila) y el muro de ladrillo con ventanales de noche
  rect(0, 0, 319, 15, hex('#24262e')); rect(0, 13, 319, 15, hex('#34363e')); for (let x = 6; x < 320; x += 16) pset(x, 14, hex('#5a5e6a'));
  for (let y = 16; y < 120; y++) for (let x = 0; x < 320; x++) { const fila = y >> 2, jx = (x + (fila % 2) * 6) % 12, junta = (y & 3) === 3 || jx === 11; pset(x, y, junta ? hex('#3a2420') : tono(rampa('#4a2a22', '#5e342a', '#6e4030'), 1 + (h((x + (fila % 2) * 6) / 12 | 0, fila, 31) - 0.5) * 1.6 - (x > 270 && y < 46 ? 0.8 : 0), x, y)); }
  for (const x0 of [22, 96, 170]) { rect(x0, 26, x0 + 46, 88, K); rect(x0 + 1, 27, x0 + 45, 87, hex('#7a7468'));
    for (let y = 30; y < 86; y++) for (let x = x0 + 4; x < x0 + 43; x++) pset(x, y, tono(rampa('#141a3e', '#1e2650', '#2a3460'), (y - 30) / 22, x, y));
    for (let k = 0; k < 7; k++) { const bx = x0 + 6 + Math.round(h(k, x0, 4) * 32), bh = 6 + Math.round(h(k, x0, 5) * 16); rect(bx, 86 - bh, bx + 5, 85, hex('#0e1230')); if (h(k, x0, 6) > 0.3) pset(bx + 2, 86 - bh + 3, hex('#ffd860')); }
    for (let x = x0 + 4; x < x0 + 43; x += 13) rect(x, 30, x, 85, hex('#7a7468')); rect(x0 + 4, 56, x0 + 42, 56, hex('#7a7468'));
    rect(x0, 88, x0 + 46, 91, hex('#8a8478')); }
  // la tubería con su llave
  rect(0, 98, 319, 101, K); rect(0, 99, 319, 100, hex('#6a6e7a')); rect(0, 99, 319, 99, hex('#9aa0ae')); for (const x of [60, 220]) { rect(x - 3, 96, x + 3, 103, K); rect(x - 2, 97, x + 2, 102, hex('#c83a3a')); }
  // el suelo de hormigón con manchas de aceite y la línea amarilla
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(rampa('#4a4c54', '#5a5c64', '#6a6c74'), 1 + (h(x >> 2, y >> 1, 33) - 0.5) * 0.8 + (y - 120) / 120, x, y));
  for (const [cx, cy, rx] of [[210, 160, 14], [60, 168, 10], [290, 172, 8]]) ovalo(cx, cy, rx, 3, 0.45, hex('#1c1a22'));
  for (let x = 0; x < 320; x++) { rect(x, 174, x, 176, (x >> 3) % 2 ? hex('#e8c040') : K); }
  // en el suelo: dos bobinas de repuesto, la carretilla de mano, un cubo amarillo y hojas sueltas
  for (const [cx, cy] of [[214, 160], [236, 164]]) { rect(cx - 10, cy - 9, cx + 10, cy + 9, K); rect(cx - 10, cy - 8, cx + 10, cy + 8, hex('#efe8d8')); for (let x = cx - 8; x < cx + 9; x += 3) rect(x, cy - 8, x, cy + 8, hex('#d8d0bc')); disco(cx + 10, cy, 9, K); disco(cx + 10, cy, 8, hex('#e4dcc8')); disco(cx + 10, cy, 2, hex('#6a6e7a')); }
  rect(130, 156, 166, 160, K); rect(131, 157, 165, 159, hex('#c83a3a')); rect(162, 140, 165, 160, K); rect(163, 141, 164, 159, hex('#8a8ea0')); disco(136, 163, 3, K); disco(158, 163, 3, K);
  rect(178, 150, 194, 170, K); rect(179, 151, 193, 169, hex('#e8c040')); rect(179, 151, 193, 153, hex('#f6e070')); rect(181, 156, 191, 157, hex('#a87a18'));
  for (const [x, y] of [[96, 166], [112, 170], [60, 158]]) { rect(x, y, x + 9, y + 3, K); rect(x + 1, y, x + 8, y + 2, hex('#f4f0e2')); pset(x + 2, y + 1, hex('#d8303a')); }
  // la rotativa: bastidores de hierro verde con remaches, la bobina de papel y la mesa de salida
  const VE = hex('#2e4a3a'), VEl = hex('#4a6a54'), VEs = hex('#1e3428');
  for (const [x0, x1] of [[40, 52], [176, 188]]) { rect(x0, 44, x1, 150, K); rect(x0 + 1, 45, x1 - 1, 149, VE); rect(x0 + 1, 45, x0 + 1, 149, VEl); rect(x1 - 1, 46, x1 - 1, 149, VEs); for (let y = 50; y < 148; y += 8) { pset(x0 + 3, y, VEl); pset(x1 - 3, y, VEl); } }
  rect(40, 44, 188, 50, K); rect(41, 45, 187, 49, VE); rect(41, 45, 187, 45, VEl);
  rect(30, 140, 198, 152, K); rect(31, 141, 197, 151, VEs); rect(31, 141, 197, 141, VE);
  // la bobina
  rect(8, 132, 14, 152, K); rect(9, 133, 13, 151, hex('#6a6e7a'));
  disco(24, 128, 18, K); disco(24, 128, 17, hex('#efe8d8')); for (let r = 4; r < 17; r += 3) for (let a = 0; a < 6.28; a += 0.08) pset(24 + Math.round(Math.cos(a) * r), 128 + Math.round(Math.sin(a) * r), hex('#d8d0bc')); disco(24, 128, 4, hex('#6a6e7a')); disco(24, 128, 2, K);
  // la cinta de salida y el palé
  rect(188, 114, 262, 120, K); rect(189, 115, 261, 118, hex('#3a3a44')); for (let x = 192; x < 262; x += 10) { rect(x, 120, x + 1, 150, K); }
  rect(246, 150, 312, 156, K); rect(247, 151, 311, 155, hex('#9a6a3c')); for (let x = 250; x < 312; x += 10) rect(x, 153, x + 5, 155, hex('#6a4626'));
};
const pagina = (x0, y0, x1, y1, completa) => {
  const { rect, pset } = R; rect(x0, y0, x1, y1, K); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#f4f0e2')); rect(x1 - 1, y0 + 2, x1 - 1, y1 - 1, hex('#d8d0bc'));
  if (!completa) { rect(x0 + 2, y0 + 2, x1 - 2, y0 + Math.max(2, Math.round((y1 - y0) * 0.14)), hex('#d8303a')); return; }
  const w = x1 - x0, hh = y1 - y0, X = (f) => Math.round(x0 + w * f), Y = (f) => Math.round(y0 + hh * f);
  rect(X(0.04), Y(0.04), X(0.96), Y(0.17), hex('#d8303a')); R.icono('!', X(0.47), Y(0.06), BL, hex('#8a1e26'), 2);
  rect(X(0.06), Y(0.22), X(0.94), Y(0.29), K); rect(X(0.06), Y(0.32), X(0.66), Y(0.39), K);
  // el coche negro, el rayo amarillo y las líneas de velocidad
  const cx = X(0.08), cy = Y(0.62);
  rect(cx + 8, cy - 9, cx + 34, cy - 1, K); rect(cx, cy - 1, cx + 46, cy + 9, K); rect(cx + 12, cy - 7, cx + 19, cy - 2, hex('#c8c4ba')); rect(cx + 22, cy - 7, cx + 30, cy - 2, hex('#c8c4ba'));
  R.disco(cx + 10, cy + 9, 5, K); R.disco(cx + 36, cy + 9, 5, K); R.disco(cx + 10, cy + 9, 2, hex('#c8c4ba')); R.disco(cx + 36, cy + 9, 2, hex('#c8c4ba'));
  for (const dy of [-4, 1, 6]) rect(cx - 10, cy + dy, cx - 4, cy + dy, K);
  R.poligono([[X(0.70), Y(0.42)], [X(0.58), Y(0.66)], [X(0.68), Y(0.66)], [X(0.60), Y(0.88)], [X(0.86), Y(0.56)], [X(0.75), Y(0.56)], [X(0.84), Y(0.42)]], K);
  R.poligono([[X(0.71), Y(0.44)], [X(0.61), Y(0.64)], [X(0.70), Y(0.64)], [X(0.63), Y(0.82)], [X(0.83), Y(0.58)], [X(0.73), Y(0.58)], [X(0.81), Y(0.44)]], hex('#f0c040'));
  for (let y = Y(0.84); y < Y(0.95); y += 3) { rect(X(0.06), y, X(0.46), y, hex('#8a8aa0')); rect(X(0.52), y, X(0.94), y, hex('#8a8aa0')); }
};
const p5 = (t) => {
  pon('imprenta', fondo5);
  const { rect, pset, linea, disco } = R;
  // las lámparas colgadas que se mecen, con su cono de luz
  for (const [x, k] of [[110, 0], [228, 1.3]]) { const dx = Math.round(Math.sin(t * 0.9 + k) * 2); linea(x, 15, x + dx, 30, K); R.poligono([[x + dx - 8, 38], [x + dx - 3, 30], [x + dx + 3, 30], [x + dx + 8, 38]], hex('#2a4a3a')); rect(x + dx - 3, 38, x + dx + 3, 39, hex('#fff6c0'));
    for (let y = 40; y < 118; y += 1) { const w = (y - 38) * 0.38; for (let i = -w; i <= w; i++) if (((x + i + y) & 1) === 0) tin(x + dx + i, y, hex('#fff2c0'), 0.14); } }
  // los rodillos que giran y la banda de papel que corre por ellos
  const ang = t * 7;
  const camino = [[24, 110], [64, 58], [104, 82], [144, 58], [164, 96], [124, 120], [84, 96], [200, 114]];
  for (let i = 0; i + 1 < camino.length; i++) { const [ax, ay] = camino[i], [bx, by] = camino[i + 1], n = Math.ceil(Math.hypot(bx - ax, by - ay));
    for (let k = 0; k <= n; k++) { const x = Math.round(ax + (bx - ax) * k / n), y = Math.round(ay + (by - ay) * k / n); rect(x - 1, y - 1, x + 1, y + 1, hex('#efe8d8')); if (((k + i * 7 - Math.floor(t * 60)) % 14 + 14) % 14 < 3) pset(x, y, (k + i) % 3 ? K : hex('#d8303a')); } }
  for (const [cx, cy] of ROD) { disco(cx, cy, 13, K); disco(cx, cy, 12, hex('#8a8ea0')); disco(cx, cy, 9, hex('#6a6e7a')); for (let k = 0; k < 4; k++) { const a = ang + k * Math.PI / 2; linea(cx, cy, cx + Math.cos(a) * 9, cy + Math.sin(a) * 9, hex('#b8bcc8')); } disco(cx, cy, 2, hex('#e0b048')); pset(cx - 6, cy - 9, hex('#d8dce6')); }
  // los periódicos doblados corren por la cinta y caen en la pila, que crece
  const n = Math.min(26, 6 + Math.floor(Math.max(0, t - P5) * 4.2));
  for (let k = 0; k < 3; k++) { const x = 190 + ((t * 70 + k * 24) % 60); rect(x, 110, x + 11, 113, K); rect(x + 1, 111, x + 10, 112, hex('#f4f0e2')); pset(x + 2, 111, hex('#d8303a')); pset(x + 3, 111, hex('#d8303a')); }
  for (let i = 0; i < n; i++) { const y = 149 - i * 2, dx = Math.round((h(i, 1, 51) - 0.5) * 4); rect(254 + dx, y - 1, 300 + dx, y, K); rect(255 + dx, y - 1, 299 + dx, y - 1, i % 3 ? hex('#f4f0e2') : hex('#e8e2d0')); pset(256 + dx, y - 1, hex('#d8303a')); pset(257 + dx, y - 1, hex('#d8303a')); }
  const cima = 149 - n * 2;
  // el operario echa un fardo en «piled on» y luego levanta la primera plana
  const lanza = t > PILA - 0.6 && t < PILA + 0.1;
  const o = R.actor(EL.obrero, 296, 160, t, { dir: -1, sostiene: lanza ? [282, cima - 8] : t > TITULAR - 0.5 && t < TITULAR + 0.1 ? [286, cima - 10] : undefined, sorpresa: t > MATONES && t < MATONES + 1, sonrisa: t > PILA + 0.2 && t < PILA + 1.4 });
  if (lanza) { const [mx, my] = o.mano; rect(mx - 12, my - 4, mx + 2, my + 3, K); rect(mx - 11, my - 3, mx + 1, my + 2, hex('#e8e2d0')); rect(mx - 11, my, mx + 1, my, hex('#c8a060')); }
  if (t > PILA + 0.1 && t < PILA + 0.4) for (const dx of [-24, 24]) linea(277 + dx, cima + 2, 277 + dx * 1.3, cima - 2, hex('#e8e8e2'));
  // la primera plana vuela hacia la cámara en «headline» y tiembla en «thugs»
  const v = suave(tramo(t, TITULAR - 0.1, TITULAR + 0.45));
  if (v > 0) { const tiembla = t > MATONES && t < MATONES + 0.6 ? Math.round(Math.sin(t * 60)) : 0;
    const x0 = Math.round(lerp(270, 112, v)) + tiembla, y0 = Math.round(lerp(cima - 12, 22, v)), x1 = Math.round(lerp(290, 244, v)) + tiembla, y1 = Math.round(lerp(cima - 2, 122, v));
    tinta(x0 + 3, y0 + 4, x1 + 4, y1 + 5, K, 0.5); pagina(x0, y0, x1, y1, v >= 0.45);
    if (t > GLORIA) for (const [dx, dy, k] of [[-14, 10, 0], [140, 30, 0.3], [-10, 70, 0.6]]) { if (t > GLORIA + k) R.icono('!', x0 + dx, y0 + dy + Math.round(Math.sin(t * 9 + k) * 1.5), hex('#ff4a4a'), K, 2); } }
};

// ── 6 · el quiosco (gag 5): los periódicos humean ──
const RUIDO = Q(0.6968), TODOS = Q(0.8238), SABER = Q(0.8633), COMPRA = Q(0.92);
const p6 = (t) => {
  const G = { encuadre: 'redaccion', camara: 'quiosco', humo: tramo(t, RUIDO - 0.3, RUIDO + 0.9), lluvia: 0.8 };
  T.londres(R, t, G);
  const a = ruta(t, [[P6 + 0.1, -18, 156, 1], [TODOS + 0.1, 96, 156, 1]]);
  const b = ruta(t, [[P6 + 0.6, -18, 156, 1], [SABER - 0.1, 66, 156, 1]]);
  // el periódico del caballete (el que se compra), que también humea
  const cogido = t > COMPRA;
  R.rect(144, 146, 168, 157, K); R.rect(145, 147, 167, 156, hex('#7a4a24')); for (const y of [150, 153]) R.rect(145, y, 167, y, hex('#5a3418')); R.rect(145, 147, 167, 147, hex('#9a6234'));
  if (!cogido) T.PIEZAS_GT.periodico(R, 156, 147, { humo: tramo(t, RUIDO, RUIDO + 0.8), t });
  R.actor(EL.comprador2GT, b.x, b.s, t, { dir: b.d, anda: b.mv, sorpresa: t > RUIDO + 0.2 && t < SABER - 0.2 && !b.mv, habla: t > SABER && Math.sin(t * 8) > 0 });
  const m = R.actor(EL.comprador1GT, a.x, a.s, t, { dir: 1, anda: a.mv, sostiene: cogido ? true : t > COMPRA - 0.35 ? [150, 128] : undefined, sorpresa: t > TODOS + 0.15 && t < COMPRA - 0.3, sonrisa: cogido });
  if (cogido) { const [mx, my] = m.mano; T.PIEZAS_GT.periodico(R, mx + 2, my + 8, { humo: 1, t }); }
  const c = ruta(t, [[P6 + 1.2, 330, 156, -1], [TODOS + 0.4, 196, 156, -1]]);
  R.actor(EL.periodista1GT, c.x, c.s, t, { dir: -1, anda: c.mv, sorpresa: !c.mv && t > TODOS + 0.4 && t < SABER + 0.6, dedo: t > SABER + 0.6 });
  if (t > SABER) { bocadillo(b.x + 7, b.s - 40, 14, 14, suave(tramo(t, SABER, SABER + 0.2)), [b.x + 9, b.s - 30], (x0, y0) => R.icono('?', x0 + 5, y0 + 3, K, hex('#c8c4ba'))); }
  if (t > SABER + 0.25 && !cogido) { bocadillo(a.x + 7, a.s - 40, 14, 14, suave(tramo(t, SABER + 0.25, SABER + 0.45)), [a.x + 9, a.s - 30], (x0, y0) => R.icono('?', x0 + 5, y0 + 3, K, hex('#c8c4ba'))); }
  T.londresDelante(R, t, G);
};

const efectos = [[DEJA, 'toc'], [PIE + 0.1, 'golpecito'], [PREGUNTA, 'pop'], [L(0.5129) + 0.3, 'publico'], [L(0.6867), 'toc'], [L(0.7273) + 0.2, 'publico'],
  [P4 + 0.1, 'whoosh'], [SELLO, 'sello'], [VENDE + 0.2, 'tic'], [ILEGAL, 'cerrojo'], [P5 + 0.1, 'maquina'], [PILA, 'golpecito'], [TITULAR, 'papel'],
  [RUIDO, 'vapor'], [SABER, 'pop'], [COMPRA, 'papel']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '1997', efectos, año: 1997 });
''')

# ───────────────────────────────────────── gt-ventas ─────────────────────────────────────────
E['gt-ventas'] = ('Las ventas', '''// GT-VENTAS (frase 16). Cinco planos:
// 1. LOCAL una tienda británica de 1997, de día y con lluvia en el escaparate: el dependiente pone la caja nueva en lo
//    alto de la pirámide en «1997»; un chaval entra (la campanilla), la mira, y en «rated for adults» el dependiente
//    planta el cartel del «18» y le dice que no con el dedo;
// 2. LOCAL un salón de 1998, de noche (gag 6): el lord entra por la puerta en «another Lord» y mira por encima del
//    hombro de su hijo, que juega a la demo en el ordenador; en «tried the demo» los dos sonríen;
// 3. LOCAL el monitor de cerca, con las manos del chaval en el teclado: en la ciudad de juguete su coche se para en el
//    paso de cebra para que crucen tres bichitos («no urge») y arranca con el verde («steal cars»);
// 4. LOCAL una calle comercial de Londres al anochecer, en Navidad: la cola ante la tienda, guirnaldas de bombillas; la
//    cifra sube hasta 500,000 en «half a million»; uno sale con su caja y la cola avanza; pasa un taxi;
// 5. LOCAL el almacén de envíos: los paquetes con el avión y el barco corren por la cinta, el operario los etiqueta y
//    la cifra sube «+1,000,000» en «a million more»; por el ventanal despega un avión de carga en «world».''', AUX + r'''
const V = (f) => en('ventas', f);
Object.assign(R.ICONOS, { avion: ['...#...', '...#...', '.#####.', '#######', '...#...', '..###..', '.......'] });
const P2 = V(0.2593), P3 = V(0.4945), P4 = V(0.7020), P5 = V(0.8990);

// ── el salón de 1998 y su monitor (planos 2 y 3): el papel pintado verde ──
const PP = rampa('#3e5a46', '#4a6a52', '#56785e', '#628668');
const papel = (x0, y0, x1, y1, apaga = () => 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const raya = (x % 10) < 2, mot = ((x + 5) % 10 === 0) && (y % 12 === 3 || y % 12 === 4); R.pset(x, y, mot ? hex('#c8a050') : tono(PP, (raya ? 2.3 : 1.4) + (h(x >> 1, y >> 1, 61) - 0.5) * 0.4 - apaga(x, y), x, y)); } };
// la ciudad de juguete en la pantalla, vista desde arriba (base 74 × 44; s escala), sin nada del juego real
const CIUDAD = { pare: V(0.5859) - 0.3, verde: V(0.6472) + 0.05 };
const pantallaCiudad = (x0, y0, s, t) => {
  const P = (u) => Math.round(u * s), r = (u0, v0, u1, v1, c) => { u0 = Math.max(0, u0); v0 = Math.max(0, v0); u1 = Math.min(74, u1); v1 = Math.min(44, v1); if (u1 > u0 && v1 > v0) R.rect(x0 + P(u0), y0 + P(v0), x0 + P(u1) - 1, y0 + P(v1) - 1, c); };
  r(0, 0, 74, 44, hex('#8a8a96'));
  // las manzanas: tejados de colores, un parque con árboles
  [[0, 0, 17, 19, '#c86a4a'], [24, 0, 51, 19, '#5a7ac8'], [58, 0, 74, 19, '#d8b04a'], [0, 28, 17, 44, '#7a5ac8'], [24, 28, 51, 44, '#4a9a4a'], [58, 28, 74, 44, '#c84a6a']].forEach(([a, b, c, d, col], i) => {
    r(a + 1, b + 1, c - 1, d - 1, hex(col)); r(a + 1, d - 2, c - 1, d - 1, mez(hex(col), K, 0.35)); r(a + 2, b + 2, c - 2, b + 3, mez(hex(col), BL, 0.35));
    if (i === 4) for (const [u, v] of [[28, 32], [34, 37], [41, 32], [46, 38], [30, 40]]) { r(u, v, u + 3, v + 3, hex('#2a6a2a')); r(u, v, u + 2, v + 1, hex('#5ac83a')); }
    else for (let k = 0; k < 3; k++) r(a + 3 + k * 5, b + 6, a + 5 + k * 5, b + 8, mez(hex(col), K, 0.25)); });
  // las calles: la grande (horizontal) con su raya, dos verticales, el paso de cebra y el semáforo
  r(0, 19, 74, 28, hex('#3a3a44')); r(17, 0, 24, 44, hex('#3a3a44')); r(51, 0, 58, 44, hex('#3a3a44'));
  for (let u = 1; u < 74; u += 6) if (u < 17 || (u > 24 && u < 37) || (u > 47 && u < 51) || u > 58) r(u, 23, u + 3, 24, hex('#f0c040'));
  for (let v = 20; v < 28; v += 2) r(39, v, 46, v + 1, hex('#f6f6f0'));
  const fase = t < CIUDAD.verde ? 'rojo' : 'verde'; r(47, 12, 51, 19, K); r(48, 13, 50, 15, fase === 'rojo' ? hex('#ff3a3a') : hex('#4a2a2a')); r(48, 16, 50, 18, fase === 'verde' ? hex('#5aff5a') : hex('#2a3a2a'));
  // el coche del chaval (rojo): llega, se para antes de la cebra y arranca con el verde
  const ida = suave(tramo(t, P3 - 0.6, CIUDAD.pare)), vuelta = tramo(t, CIUDAD.verde + 0.15, CIUDAD.verde + 1.6);
  const cu = vuelta > 0 ? lerp(29, 80, vuelta * vuelta) : lerp(-10, 29, ida);
  r(cu, 23.5, cu + 9, 27.5, K); r(cu + 0.5, 24, cu + 8.5, 27, hex('#e8303a')); r(cu + 3, 24, cu + 6, 27, hex('#ffd0d0')); r(cu + 8.5, 24, cu + 9, 25, hex('#ffe890')); r(cu + 8.5, 26.5, cu + 9, 27, hex('#ffe890'));
  // los otros coches: uno azul hacia la izquierda y uno blanco por la calle vertical
  const ca = 74 - ((t * 9) % 90); r(ca, 20, ca + 6, 22.5, hex('#2a4aa8')); r(ca + 2, 20.5, ca + 3, 22, hex('#a8c8ff'));
  const cb = ((t * 7 + 12) % 60) - 10; r(52.5, cb, 55.5, cb + 6, BL); r(53, cb + 2, 55, cb + 3, hex('#8a9ab8'));
  r(26, 29, 31, 31.5, hex('#e8c040'));
  // los bichitos cruzan la cebra mientras el coche espera
  const cruza = tramo(t, CIUDAD.pare - 0.2, CIUDAD.verde - 0.1);
  if (cruza > 0 && cruza < 1) for (let k = 0; k < 3; k++) { const v = lerp(14, 31, Math.min(1, Math.max(0, cruza * 1.5 - k * 0.25))), u = 39.5 + k * 2.5, pie = Math.floor(t * 6 + k) % 2;
    if (v > 14 && v < 31) { r(u, v, u + 2, v + 1, hex('#5ac83a')); r(u, v + 1, u + 2, v + 2, hex('#f6d0a8')); r(u, v + 2, u + 2, v + 3.5, hex('#f08a2a')); r(u + pie, v + 3.5, u + pie + 0.5, v + 4, K); } }
};
// el ordenador del salón (monitor beis de los noventa) con la ciudad en pantalla
const monitorSalon = (t) => {
  const { rect, pset } = R, d = 8;
  rect(250, 86 + d, 298, 124 + d, K); rect(251, 87 + d, 297, 123 + d, hex('#d8ccb0')); rect(251, 87 + d, 297, 87 + d, hex('#ece2c8')); rect(295, 88 + d, 296, 123 + d, hex('#a89c80'));
  rect(255, 90 + d, 293, 115 + d, K); pantallaCiudad(256, 91 + d, 0.5, t); for (let y = 91 + d; y < 115 + d; y += 2) for (let x = 256; x < 293; x++) tin(x, y, K, 0.18);
  pset(258, 92 + d, hex('#ffffff')); pset(259, 92 + d, hex('#d8e8f8')); rect(286, 118 + d, 288, 119 + d, hex('#3ac85a')); rect(262, 118 + d, 270, 119 + d, hex('#a89c80'));
  rect(266, 124 + d, 282, 127 + d, K); rect(267, 124 + d, 281, 126 + d, hex('#a89c80'));
};

// ── 1 · LOCAL la tienda de 1997 ──
const PIRA = V(0.1126), DIECIOCHO = V(0.1819), ENTRA = 0.35;
const fondo1 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  // el techo de placas (tranquilo) y las regletas
  for (let y = 0; y < 20; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 32 === 0 || y === 9) ? hex('#7a7668') : tono(rampa('#8a8678', '#9a9686', '#a8a492'), 1.2 + (h(x >> 2, y >> 2, 71) - 0.5) * 0.5, x, y));
  rect(0, 19, 319, 20, hex('#a89c80'));
  for (const [x0, x1] of [[178, 226], [234, 270]]) { rect(x0, 15, x1, 18, K); rect(x0 + 1, 15, x1 - 1, 17, hex('#f6f6f0')); }
  // la pared azul de la tienda
  for (let y = 21; y < 126; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(rampa('#3e5a8a', '#4a6a9a', '#567aa8'), 1.3 + (h(x >> 1, y >> 1, 72) - 0.5) * 0.5, x, y));
  // la puerta de cristal y el escaparate (lo de fuera se pinta en cada fotograma)
  rect(4, 38, 40, 126, K); rect(6, 40, 38, 126, hex('#8a8ea0')); rect(8, 42, 36, 124, hex('#2a2a34')); rect(30, 82, 33, 86, hex('#d8dce6'));
  rect(44, 38, 102, 112, K); rect(46, 40, 100, 110, hex('#8a8ea0')); rect(48, 42, 98, 108, hex('#2a2a34'));
  rect(44, 110, 102, 126, K); rect(45, 111, 101, 125, hex('#7a4a24')); rect(45, 111, 101, 112, hex('#9a6234'));
  for (let i = 0; i < 5; i++) { const x = 50 + i * 10; rect(x, 100 - (i % 2) * 3, x + 8, 110, K); rect(x + 1, 101 - (i % 2) * 3, x + 7, 110, [hex('#e0a030'), hex('#3a6ad8'), hex('#d8303a'), hex('#3a8a4a'), hex('#e0a030')][i]); rect(x + 2, 103 - (i % 2) * 3, x + 6, 106 - (i % 2) * 3, hex('#1e2a50')); }
  // las estanterías llenas de cajas y el rótulo de pictogramas (sin letras)
  rect(108, 24, 270, 33, K); rect(109, 25, 269, 32, hex('#1e2440'));
  R.icono('coche', 120, 26, hex('#f0c040'), K); R.icono('trofeo', 150, 26, hex('#f0c040'), K); R.icono('bichito', 180, 26, hex('#f0c040'), K); R.icono('edificio', 210, 26, hex('#f0c040'), K); R.icono('coche', 240, 26, hex('#f0c040'), K);
  rect(108, 34, 270, 120, hex('#2a3448')); rect(108, 34, 110, 120, K); rect(268, 34, 270, 120, K);
  const cols = ['#e0a030', '#3a6ad8', '#d8303a', '#3a8a4a', '#7a3ac8', '#e8e8e8', '#2a2832', '#f08a2a'];
  for (const yb of [52, 74, 96, 118]) { rect(110, yb, 268, yb + 2, K); rect(110, yb, 268, yb, hex('#c8c0a8')); rect(111, yb + 1, 267, yb + 1, hex('#f2ecd8'));
    for (let i = 0; i < 22; i++) { if (h(i, yb, 73) > 0.9) continue; cajita(112 + i * 7, yb - 11, hex(cols[Math.floor(h(i, yb, 74) * cols.length)]), i + yb); }
    for (let x = 116; x < 266; x += 24) { rect(x, yb + 1, x + 6, yb + 1, BL); } }
  // el cartel de la derecha (una persecución vista desde arriba, sin letras); la esquina de Atom queda de pared
  rect(276, 52, 314, 102, K); rect(277, 53, 313, 101, hex('#1e2a50')); rect(277, 72, 313, 80, hex('#3a3a44')); rect(290, 53, 296, 101, hex('#3a3a44')); for (let x = 279; x < 312; x += 6) pset(x, 76, hex('#f0c040'));
  rect(280, 74, 286, 78, hex('#e8303a')); rect(300, 74, 306, 78, BL); rect(301, 74, 305, 74, hex('#3a6aff')); rect(279, 55, 288, 70, hex('#5a7ac8')); rect(298, 82, 311, 99, hex('#4a9a4a'));
  // el suelo de linóleo a cuadros con el reflejo de las regletas
  for (let y = 126; y < 180; y++) for (let x = 0; x < 320; x++) { const c = ((x >> 4) + (y >> 3)) % 2; pset(x, y, c ? hex('#c8c4ba') : hex('#a8a49a')); }
  rect(0, 126, 319, 127, hex('#6a6658')); for (const x0 of [60, 210]) for (let y = 132; y < 176; y += 2) for (let x = x0; x < x0 + 50; x++) if ((x + y) % 4 === 0) tin(x, y, BL, 0.25);
  // la mesa de las novedades
  rect(128, 132, 200, 150, K); rect(129, 133, 199, 149, hex('#d8303a')); rect(129, 133, 199, 134, hex('#f05a5a')); rect(129, 146, 199, 149, hex('#8a1e26'));
  for (const x of [131, 194]) rect(x, 150, x + 3, 164, K);
  // el mostrador de la derecha
  rect(222, 128, 319, 179, K); rect(223, 129, 319, 179, hex('#7a4a24')); vetas(223, 134, 319, 179, hex('#5a3418'), hex('#9a6234'), 3);
  rect(223, 129, 319, 133, hex('#9a6234')); rect(223, 129, 319, 129, hex('#c8905a')); for (const x of [236, 278]) { rect(x, 140, x + 30, 172, hex('#5a3418')); rect(x + 1, 141, x + 29, 171, hex('#7a4a24')); }
};
const p1 = (t) => {
  pon('tiendaUK', fondo1);
  // por el escaparate: la acera de enfrente bajo la lluvia, un autobús rojo y gente con paraguas (recortado al hueco)
  const vent = (x0, y0, x1, y1) => { R.recorte([x0, y0, x1, y1]);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y < y0 + 20 ? tono(rampa('#8a92a0', '#9aa2ae', '#aab2bc'), 1 + (h(x >> 1, y, 75) - 0.5) * 0.8, x, y) : y < y0 + 40 ? ((x >> 3) % 3 ? hex('#8a5a44') : hex('#6e4434')) : hex('#5a5c64'));
    for (let x = x0; x <= x1; x += 8) for (let y = y0 + 22; y < y0 + 38; y += 7) R.linea(x + 2, y, x + 4, y, hex('#ffd890'));
    const bx = 120 - ((t * 30) % 220); for (let y = y0 + 26; y < y0 + 56; y++) R.linea(bx, y, bx + 70, y, y % 9 === 0 ? hex('#ffe890') : hex('#d8303a')); for (let x = bx + 4; x < bx + 66; x += 9) R.linea(x, y0 + 30, x + 5, y0 + 30, hex('#a8c8e8'));
    for (let k = 0; k < 2; k++) { const px = x0 + ((t * (8 + k * 5) + k * 40) % (x1 - x0 + 20)) - 10, py = y0 + 46; R.linea(px, py, px, py + 14, hex('#2a2a34')); R.linea(px - 4, py - 2, px + 4, py - 2, [hex('#c83a3a'), hex('#3a6ad8')][k]); R.linea(px - 3, py - 3, px + 3, py - 3, [hex('#c83a3a'), hex('#3a6ad8')][k]); }
    R.recorte(null); lluvia(t, x0, y0, x1, y1, 26, hex('#c8d4e4'), x0); };
  vent(48, 42, 98, 108); vent(8, 42, 36, 80);
  // la regleta que parpadea
  if ((t % 3.7) < 0.12) R.rect(235, 15, 269, 17, hex('#a8a89a'));
  // la tele de la demo, la caja registradora, una bolsa y los folletos en el mostrador
  T.PIEZAS_GT.monitorTubo(R, 246, 128, { pantalla: 'ciudad', t });
  T.PIEZAS_GT.cajaRegistradora(R, 296, 129, {});
  R.rect(270, 114, 284, 129, K); R.rect(271, 115, 283, 128, hex('#e8e0c8')); R.rect(271, 115, 283, 117, hex('#3a6ad8')); R.linea(274, 114, 276, 109, K); R.linea(280, 114, 278, 109, K); R.linea(276, 109, 278, 109, K);
  for (let i = 0; i < 3; i++) { R.rect(226 + i * 2, 125 - i, 238 + i * 2, 128 - i, K); R.rect(227 + i * 2, 125 - i, 237 + i * 2, 127 - i, [hex('#f0c040'), hex('#ff6a6a'), BL][i]); }
  // la cesta de la compra y una caja caída en el suelo
  R.rect(58, 160, 80, 172, K); R.rect(59, 161, 79, 171, hex('#c83a3a')); for (let x = 61; x < 79; x += 3) R.rect(x, 162, x, 170, hex('#8a1e26')); R.linea(60, 160, 66, 154, K); R.linea(78, 160, 72, 154, K); R.linea(66, 154, 72, 154, K); cajaMini(64, 151);
  // un cliente cruza por delante con su bolsa
  const cl = ruta(t, [[1.2, 330, 176, -1], [5.4, 150, 176, -1]]);
  const cm = R.actor(EL.comprador1GT, cl.x, cl.s, t, { dir: -1, anda: cl.mv, sostiene: true }); R.rect(cm.mano[0] - 6, cm.mano[1], cm.mano[0] + 2, cm.mano[1] + 9, K); R.rect(cm.mano[0] - 5, cm.mano[1] + 1, cm.mano[0] + 1, cm.mano[1] + 8, hex('#e8e0c8')); R.rect(cm.mano[0] - 5, cm.mano[1] + 1, cm.mano[0] + 1, cm.mano[1] + 2, hex('#3a6ad8'));
  // el pez de la pirámide: las cajas de la mesa
  for (const [x, y] of [[136, 120], [147, 120], [158, 120], [169, 120], [141, 107], [152, 107], [163, 107]]) cajaMini(x, y);
  const puesta = t > PIRA;
  if (puesta) cajaMini(147, 94);
  // el dependiente trae la caja nueva y la pone en lo alto; luego planta el cartel del 18
  const d = ruta(t, [[0.3, 240, 156, -1], [PIRA - 0.5, 176, 156, -1]]);
  const ddo = R.actor(EL.dependienteGT, d.x, d.s, t, { dir: -1, anda: d.mv, sostiene: !puesta ? (t > PIRA - 0.5 ? [160, 102] : true) : t > DIECIOCHO - 0.4 && t < DIECIOCHO + 0.1 ? [196, 118] : undefined, dedo: t > DIECIOCHO + 0.25, habla: t > DIECIOCHO + 0.3 && Math.sin(t * 9) > 0 });
  if (!puesta) { const [mx, my] = ddo.mano; cajaMini(mx - 6, my - 12); }
  // el cartel del 18 (un número sobre una etiqueta, sin sello de nadie)
  const c18 = suave(tramo(t, DIECIOCHO - 0.1, DIECIOCHO + 0.15));
  if (c18 > 0) { const y = Math.round(lerp(118, 108, c18)); R.rect(182, y, 202, y + 16, K); R.rect(183, y + 1, 201, y + 15, BL); R.rect(183, y + 1, 201, y + 2, hex('#d8303a')); R.numero('18', 186, y + 13, { color: K, sombra: false }); R.rect(190, y + 16, 193, 132, K); }
  // el chaval entra (la campanilla), va a la mesa y se queda con las ganas
  const k = ruta(t, [[ENTRA, 12, 158, 1], [ENTRA + 2.8, 104, 158, 1]]);
  if (t > ENTRA - 0.1) R.actor(EL.hijoLord, k.x, k.s, t, { dir: 1, anda: k.mv, dedo: t > PIRA + 0.6 && t < DIECIOCHO + 0.2, sorpresa: t > DIECIOCHO + 0.15 && t < DIECIOCHO + 0.8, triste: t > DIECIOCHO + 0.8 });
  // la puerta se abre al entrar
  if (t > ENTRA - 0.3 && t < ENTRA + 0.6) { R.rect(6, 40, 14, 126, hex('#8a8ea0')); R.rect(8, 42, 12, 124, hex('#3a3a46')); }
};

// ── 2 · LOCAL el salón: el lord mira por encima del hombro de su hijo (gag 6) ──
const ABRE = V(0.2975) - 0.45, LLEGA = V(0.3457) + 0.3, DOCE = V(0.3970), DEMO = V(0.4714);
const fondo2 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  // el techo y el friso crema (tranquilos), la moldura de madera
  rect(0, 0, 319, 9, hex('#9a927e')); rect(0, 9, 319, 10, hex('#7a7462'));
  for (let y = 11; y < 34; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(rampa('#a89e86', '#b4aa92', '#c0b69e'), 1.2 + (h(x >> 2, y >> 1, 81) - 0.5) * 0.5, x, y));
  rect(0, 34, 319, 36, hex('#5a3418')); rect(0, 34, 319, 34, hex('#8a5a2a'));
  papel(0, 37, 319, 145, (x, y) => (x > 270 && y < 50 ? 0.4 : 0));
  rect(0, 128, 319, 130, hex('#5a3418')); rect(0, 128, 319, 128, hex('#8a5a2a'));
  rect(0, 146, 319, 150, hex('#f2ecd8')); rect(0, 150, 319, 150, hex('#a89c80'));
  // la alfombra y el suelo de tablas
  for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(rampa('#5a3418', '#6e4422', '#82542c'), 1.2 + Math.sin(x * 0.2 + y) * 0.2 + (y % 6 === 0 ? -0.8 : 0), x, y));
  for (let y = 156; y < 178; y++) for (let x = 64; x < 300; x++) { const bx = Math.abs(((x - 64) % 24) - 12) + Math.abs(((y - 156) % 12) - 6); pset(x, y, y < 158 || y > 175 || x < 66 || x > 297 ? hex('#c8963c') : bx < 4 ? hex('#e0b048') : bx < 7 ? hex('#3a4a7a') : tono(rampa('#6a1e26', '#8a2a32', '#a83a42'), 1.2 + (h(x, y, 82) - 0.5) * 0.6, x, y)); }
  // la puerta del pasillo (cerrada; se abre en cada fotograma)
  rect(8, 56, 44, 150, K); rect(9, 57, 43, 150, hex('#5a3418')); rect(12, 60, 40, 150, hex('#3a2a20'));
  // la ventana de noche con las cortinas (lo de fuera, en cada fotograma)
  rect(56, 48, 112, 112, K); rect(57, 49, 111, 111, hex('#f2ecd8')); rect(84, 49, 85, 111, hex('#f2ecd8')); rect(57, 80, 111, 81, hex('#f2ecd8')); rect(54, 112, 114, 115, hex('#f2ecd8')); rect(54, 115, 114, 116, hex('#a89c80'));
  for (const [x0, x1] of [[46, 60], [108, 122]]) { for (let x = x0; x <= x1; x++) rect(x, 42, x, 124, (x - x0) % 4 === 0 ? hex('#5e1420') : (x - x0) % 4 === 1 ? hex('#a8283a') : hex('#8a1e2c')); rect(x0, 42, x1, 44, hex('#5e1420')); }
  rect(42, 38, 126, 43, K); rect(43, 39, 125, 42, hex('#8a5a2a')); rect(43, 39, 125, 39, hex('#c8905a'));
  // la chimenea con la repisa, el espejo y el reloj
  rect(130, 42, 178, 76, K); rect(131, 43, 177, 75, hex('#c8963c')); rect(134, 46, 174, 72, hex('#4a5a5a')); for (let y = 48; y < 71; y++) for (let x = 135; x < 174; x++) if ((x - y) % 9 === 0) pset(x, y, hex('#5e7070'));
  rect(124, 80, 184, 84, K); rect(125, 80, 183, 83, hex('#e8e4dc')); rect(125, 80, 183, 80, BL);
  rect(128, 84, 180, 146, K); rect(129, 85, 179, 146, hex('#e8e4dc')); for (let y = 86; y < 146; y += 9) rect(129, y, 179, y, hex('#d0ccc4'));
  rect(138, 98, 170, 144, K); rect(139, 99, 169, 144, hex('#1c1416')); for (let x = 140; x < 169; x += 4) rect(x, 136, x + 1, 144, hex('#3a3236'));
  rect(126, 146, 182, 150, hex('#8a8478'));
  rect(150, 70, 158, 80, K); rect(151, 71, 157, 79, hex('#c8963c')); disco(154, 74, 3, BL);
  for (const [x, c] of [[132, '#3a6ad8'], [170, '#4a9a4a']]) { rect(x, 72, x + 7, 80, K); rect(x + 1, 73, x + 6, 79, hex('#e8dcc0')); rect(x + 2, 74, x + 5, 77, hex(c)); }
  // la estantería sobre la mesa (la esquina de Atom queda de pared)
  rect(204, 60, 268, 62, K); rect(205, 60, 267, 61, hex('#8a5a2a'));
  for (let i = 0; i < 12; i++) { const x = 206 + i * 5, hh = 12 + Math.round(h(i, 3, 83) * 6); rect(x, 60 - hh, x + 4, 59, K); rect(x + 1, 61 - hh, x + 3, 59, hex(['#8a1e2c', '#1e3a6a', '#2a5a3a', '#c8963c', '#5a3418'][i % 5])); }
  // la mesa del ordenador, la torre, los altavoces y la caja de disquetes
  rect(240, 132, 319, 136, K); rect(241, 132, 319, 135, hex('#9a6234')); rect(241, 132, 319, 132, hex('#c8905a'));
  for (const x of [242, 314]) rect(x, 136, x + 3, 150, K);
  rect(288, 137, 312, 150, K); rect(289, 138, 311, 150, hex('#d8ccb0')); rect(291, 140, 309, 141, hex('#a89c80')); rect(291, 143, 309, 144, hex('#a89c80')); pset(294, 147, hex('#3ac85a'));
  for (const x of [302, 312]) { rect(x - 4, 116, x + 4, 132, K); rect(x - 3, 117, x + 3, 131, hex('#2a2832')); disco(x, 126, 2, hex('#4a4856')); }
};
const p2 = (t) => {
  pon('salon', fondo2);
  const { rect, pset } = R;
  // por la ventana: la calle de noche con la farola, las casas de enfrente con luz y la lluvia
  R.recorte([57, 49, 111, 111]);
  for (let y = 49; y < 112; y++) R.linea(57, y, 111, y, y < 80 ? tono(rampa('#0e1430', '#1a2448', '#24305a'), (y - 49) / 14, 60, y) : hex('#2a2430'));
  for (let x = 58; x < 111; x += 9) for (let y = 84; y < 108; y += 8) if (h(x, y, 84) > 0.35) R.linea(x, y, x + 3, y, (Math.floor(t * 0.5 + h(x, y, 85) * 9) % 7) ? hex('#ffd890') : hex('#3a3a50'));
  R.linea(98, 60, 98, 111, K); R.disco(98, 59, 3, hex('#ffb040')); for (let r = 4; r < 14; r++) for (let a = 0; a < 6.3; a += 0.3) if (h(r, a * 10, 86) > 0.6) tin(98 + Math.cos(a) * r, 59 + Math.sin(a) * r, hex('#ffb040'), 0.3);
  const cx = 130 - ((t * 40) % 140); R.linea(cx, 106, cx + 18, 106, hex('#c83a3a')); R.linea(cx + 2, 105, cx + 14, 105, hex('#a83030')); R.linea(cx + 19, 106, cx + 26, 106, hex('#fff0a0'));
  R.recorte(null); lluvia(t, 57, 49, 111, 111, 22, hex('#8a9ab8'), 5);
  rect(84, 49, 85, 111, hex('#f2ecd8')); rect(57, 80, 111, 81, hex('#f2ecd8'));
  // el fuego de la chimenea y su luz
  for (let i = 0; i < 9; i++) { const x = 142 + i * 3, hgt = 8 + Math.round((Math.sin(t * 11 + i * 1.7) + 1) * 4 + h(i, Math.floor(t * 8), 87) * 4); for (let y = 0; y < hgt; y++) pset(x + (y % 3 === 0 ? (Math.sin(t * 9 + i) > 0 ? 1 : 0) : 0), 140 - y, y > hgt - 3 ? hex('#ffe890') : y > hgt * 0.5 ? hex('#ffb040') : hex('#e85a2a')); }
  rect(140, 140, 168, 143, hex('#5a3418')); ovalo(154, 152, 34, 6, 0.18, hex('#ffb040'));
  // el reloj de la repisa anda
  const a = t * 1.2; R.linea(154, 74, 154 + Math.round(Math.cos(a) * 2), 74 + Math.round(Math.sin(a) * 2), K);
  // el gato duerme en la alfombra y mueve la cola
  T.gato(R, 110, 170, t, { dir: -1 });
  // la puerta se abre y entra el lord; se queda detrás de su hijo y mira la pantalla
  const ab = suave(tramo(t, ABRE, ABRE + 0.5)) * (1 - suave(tramo(t, LLEGA + 0.4, LLEGA + 1.0)));
  const w = Math.round(28 * (1 - ab)); if (w > 0) { rect(12, 60, 12 + w, 150, hex('#7a4a24')); rect(12 + w, 60, 12 + w, 150, K); if (w > 10) { rect(15, 64, 10 + w, 100, hex('#6a3e1e')); rect(15, 106, 10 + w, 146, hex('#6a3e1e')); R.disco(9 + w, 104, 1, hex('#e0b048')); } }
  if (ab > 0.2 && w < 26) { for (let y = 60; y < 150; y++) for (let x = 13 + w; x < 41; x++) tin(x, y, hex('#ffd890'), 0.35); }
  monitorSalon(t);
  // el chaval en su silla, con las manos en el teclado
  rect(246, 129, 272, 131, K); rect(247, 129, 271, 130, hex('#d8ccb0')); for (let x = 248; x < 271; x += 3) pset(x, 129, hex('#a89c80'));
  const tecla = Math.floor(t * 6) % 2;
  const lx = ruta(t, [[ABRE + 0.2, 14, 152, 1], [LLEGA, 204, 150, 1]]);
  if (t > ABRE + 0.1) R.actor(EL.lordAvebury, lx.x, lx.s, t, { dir: 1, anda: lx.mv, dedo: t > DOCE && t < DOCE + 1.1, salto: t > LLEGA + 0.2 && !lx.mv && t < DEMO && Math.sin((t - LLEGA) * 5) > 0.4 ? 1 : 0, sorpresa: t > LLEGA && t < DOCE, sonrisa: t > DEMO, pal: { C: hex('#3a3e52'), c: hex('#2a2e3e'), X: hex('#3a3e52') } });
  R.actor(EL.hijoLord, 220, 148, t, { dir: 1, sostiene: [250 + tecla * 4, 129 - tecla], sonrisa: t > DEMO, habla: t > DOCE + 0.2 && t < DOCE + 1.2 && Math.sin(t * 9) > 0 });
  T.silla(R, 227, 147, 1);
};

// ── 3 · LOCAL el monitor de cerca: el coche espera en la cebra ──
const fondo3 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  for (let y = 0; y < 16; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(rampa('#a89e86', '#b4aa92', '#c0b69e'), 1.2 + (h(x >> 2, y >> 1, 81) - 0.5) * 0.5, x, y));
  rect(0, 16, 319, 18, hex('#5a3418')); rect(0, 16, 319, 16, hex('#8a5a2a'));
  papel(0, 19, 319, 140, (x, y) => (x > 270 && y < 50 ? 0.4 : 0));
  // la mesa de madera
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(rampa('#6a3e1e', '#8a5230', '#9a6234', '#b47a44'), 2 + Math.sin(x * 0.04 + Math.sin(y * 0.3) * 2 + h(y >> 2, 2, 5)) * 0.6 - (y - 140) / 60, x, y));
  rect(0, 140, 319, 141, hex('#c8905a'));
  // el monitor grande, beis, con sus rejillas
  rect(64, 18, 256, 142, K); rect(65, 19, 255, 141, hex('#d8ccb0')); rect(65, 19, 255, 20, hex('#ece2c8')); rect(65, 19, 66, 141, hex('#ece2c8')); rect(252, 21, 255, 141, hex('#a89c80')); rect(66, 138, 254, 141, hex('#a89c80'));
  rect(80, 28, 240, 124, K); rect(81, 29, 239, 123, hex('#7c725e')); rect(83, 31, 237, 121, K);
  for (let x = 90; x < 230; x += 4) { pset(x, 130, hex('#a89c80')); pset(x + 1, 131, hex('#a89c80')); }
  rect(210, 128, 230, 133, K); rect(211, 129, 229, 132, hex('#c0b490')); disco(240, 131, 2, K); pset(240, 131, hex('#3ac85a'));
  // la taza, los disquetes, el flexo y la caja del disco de la demo
  rect(14, 132, 30, 152, K); rect(15, 133, 29, 151, hex('#c83a3a')); rect(15, 133, 29, 134, hex('#e85a5a')); rect(30, 138, 34, 146, K); rect(16, 134, 28, 136, hex('#4a2a14'));
  for (let i = 0; i < 4; i++) { rect(262 + i * 3, 150 - i * 2, 286 + i * 3, 166 - i * 2, K); rect(263 + i * 3, 151 - i * 2, 285 + i * 3, 165 - i * 2, [hex('#2a2832'), hex('#3a6ad8'), hex('#d8303a'), hex('#2a2832')][i]); rect(267 + i * 3, 151 - i * 2, 279 + i * 3, 157 - i * 2, hex('#b8bcc8')); }
  rect(290, 100, 293, 150, K); rect(291, 100, 292, 149, hex('#8a8ea0')); poligono([[282, 100], [288, 88], [304, 88], [310, 100]], K); poligono([[284, 99], [289, 89], [303, 89], [308, 99]], hex('#2a5a8a')); rect(284, 150, 302, 154, K); rect(285, 151, 301, 153, hex('#5a5c64'));
  ovalo(296, 150, 22, 6, 0.2, hex('#fff2c0'));
};
const p3 = (t) => {
  pon('crt', fondo3);
  // la ciudad de juguete en pantalla (dentro del cristal) con las líneas de barrido y el reflejo
  pantallaCiudad(86, 32, 2, t);
  for (let y = 32; y < 121; y += 2) for (let x = 84; x < 237; x++) tin(x, y, K, 0.14);
  for (let k = 0; k < 18; k++) R.linea(92 + k, 36, 92, 36 + k, mez(hex('#ffffff'), hex('#a8b8c8'), 0.5));
  for (const [x, y] of [[84, 31], [236, 31], [84, 121], [236, 121]]) R.rect(x - 1, y - 1, x + 1, y + 1, K);
  // el disco de la demo junto al teclado
  T.PIEZAS_GT.disco(R, 250, 176, { t });
  // el teclado y las manos del chaval que pulsan
  R.rect(92, 148, 228, 178, K); R.rect(93, 149, 227, 177, hex('#d8ccb0')); R.rect(93, 149, 227, 150, hex('#ece2c8'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 16; i++) { const x = 97 + i * 8 + (j % 2) * 3, y = 153 + j * 6; R.rect(x, y, x + 6, y + 4, hex('#a89c80')); R.rect(x, y, x + 5, y + 3, hex('#ece2c8')); }
  R.rect(130, 177, 186, 178, hex('#a89c80'));
  const pulsa = (k) => (Math.floor(t * 5 + k) % 3 === 0 ? 1 : 0);
  const espera = t > CIUDAD.pare && t < CIUDAD.verde;
  T.brazo(R, 66, 196, 116, 166 + (espera ? -2 : pulsa(0)), '#8a2a3a', 1, { sombra: false });
  T.brazo(R, 254, 196, 204, 166 + (espera ? 0 : pulsa(1)), '#8a2a3a', -1, { sombra: false });
};

// ── 4 · LOCAL la calle comercial en Navidad: la cola y el medio millón ──
const VENDE = V(0.7442), MEDIO = V(0.7859) + 0.4, BRETANA = V(0.8412);
const fondo4 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  // el cielo del anochecer, tramado (las nubes se mueven en cada fotograma)
  for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(rampa('#22224a', '#34306a', '#4e3e7a', '#7a5a8a', '#b07a7a'), y / 15 + (h(x >> 1, y, 91) - 0.5) * 0.4, x, y));
  // la casa de ladrillo de la izquierda
  for (let y = 34; y < 132; y++) for (let x = 0; x < 88; x++) { const fila = (y / 7) | 0, jx = (x + (fila % 2) * 9) % 18; pset(x, y, (y % 7) === 6 || jx === 17 ? hex('#7a7670') : tono(rampa('#9a968e', '#aaa69e', '#bab6ae'), 1 + (h((x + (fila % 2) * 9) / 18 | 0, fila, 92) - 0.5) * 1.2, x, y)); }
  rect(0, 30, 90, 34, K); rect(0, 31, 89, 33, hex('#5a5c64'));
  for (const [x0, y0] of [[10, 44], [50, 44], [10, 84], [50, 84]]) { rect(x0, y0, x0 + 26, y0 + 30, K); rect(x0 + 1, y0 + 1, x0 + 25, y0 + 29, hex('#f2ecd8')); rect(x0 + 3, y0 + 3, x0 + 23, y0 + 27, hex('#ffcf70')); rect(x0 + 3, y0 + 14, x0 + 23, y0 + 15, hex('#f2ecd8')); rect(x0 + 12, y0 + 3, x0 + 13, y0 + 27, hex('#f2ecd8')); rect(x0 - 2, y0 + 30, x0 + 28, y0 + 32, hex('#e8e4dc'));
    disco(x0 + 13, y0 + 15, 5, hex('#2a6a2a')); disco(x0 + 13, y0 + 15, 3, hex('#ffcf70')); pset(x0 + 13, y0 + 20, hex('#d8303a')); }
  // la tienda de juegos (en medio): pisos de estuco y el escaparate encendido
  for (let y = 40; y < 96; y++) for (let x = 88; x < 238; x++) { const fila = y >> 2, jx = (x + (fila % 2) * 4) % 8; pset(x, y, (y & 3) === 3 || jx === 7 ? hex('#2a1814') : tono(rampa('#4a2a24', '#58322a', '#663a30'), 1 + (h(x >> 3, fila, 93) - 0.5), x, y)); }
  rect(86, 38, 240, 42, K); rect(87, 39, 239, 41, hex('#e8e4dc'));
  for (const x0 of [100, 150, 200]) { rect(x0, 52, x0 + 24, 84, K); rect(x0 + 1, 53, x0 + 23, 83, hex('#f2ecd8')); rect(x0 + 3, 55, x0 + 21, 81, hex('#ffd890')); rect(x0 + 3, 67, x0 + 21, 68, hex('#f2ecd8')); rect(x0 + 11, 55, x0 + 12, 81, hex('#f2ecd8')); rect(x0 - 2, 84, x0 + 26, 86, hex('#f6f2ea')); }
  poligono([[162, 56], [158, 62], [166, 62]], hex('#2a6a2a')); poligono([[162, 60], [156, 68], [168, 68]], hex('#2a6a2a')); poligono([[162, 64], [154, 74], [170, 74]], hex('#2a6a2a')); rect(161, 74, 163, 78, hex('#5a3418'));
  rect(86, 94, 240, 104, K); rect(87, 95, 239, 103, hex('#1e4a32')); R.icono('coche', 132, 96, hex('#f0c040'), K); R.icono('trofeo', 156, 96, hex('#f0c040'), K); R.icono('bichito', 180, 96, hex('#f0c040'), K);
  rect(86, 104, 240, 134, K); rect(90, 106, 176, 132, hex('#ffe0a0'));
  for (let y = 108; y < 132; y++) for (let x = 92; x < 175; x++) if (h(x, y, 94) > 0.95) pset(x, y, hex('#fff6d8'));
  // en el escaparate: la pirámide de cajas y un abeto con bolas
  for (let fila = 0; fila < 2; fila++) for (let i = 0; i <= 4 - fila; i++) cajaMini(96 + i * 11 + fila * 5, 119 - fila * 12);
  poligono([[156, 108], [146, 124], [166, 124]], hex('#1e5a2a')); poligono([[156, 114], [142, 131], [170, 131]], hex('#2a6a2a')); for (const [x, y, c] of [[152, 120, '#d8303a'], [160, 124, '#f0c040'], [150, 128, '#3a6ad8'], [158, 116, '#f0c040']]) pset(x, y, hex(c));
  rect(178, 106, 202, 134, K); rect(180, 108, 200, 134, hex('#ffcf70')); rect(180, 108, 200, 109, hex('#ffe890')); rect(204, 106, 238, 132, hex('#ffe0a0')); for (let x = 206; x < 236; x += 7) { rect(x, 112, x + 5, 130, K); rect(x + 1, 113, x + 4, 129, hex(['#e0a030', '#3a6ad8', '#d8303a', '#3a8a4a', '#7a3ac8'][(x / 7 | 0) % 5])); }
  // la casa de la derecha, de ladrillo más oscuro, con un mirador (bajo: la esquina de Atom queda de cielo)
  for (let y = 52; y < 132; y++) for (let x = 240; x < 320; x++) { const fila = y >> 2, jx = (x + (fila % 2) * 4) % 8; pset(x, y, (y & 3) === 3 || jx === 7 ? hex('#3a2420') : tono(rampa('#5a3028', '#6a3a30', '#7a4636'), 1 + (h(x >> 3, fila, 95) - 0.5), x, y)); }
  rect(238, 48, 319, 52, K); rect(238, 49, 319, 51, hex('#5a5c64')); rect(246, 42, 256, 49, K); rect(247, 43, 255, 49, hex('#6a3a30')); rect(246, 42, 256, 43, hex('#5a5c64')); for (const x of [248, 253]) rect(x, 39, x + 1, 42, hex('#a85a3a'));
  rect(256, 64, 304, 100, K); rect(257, 65, 303, 99, hex('#e8e4dc')); rect(260, 68, 300, 96, hex('#ffcf70')); for (const x of [272, 287]) rect(x, 68, x + 1, 96, hex('#e8e4dc')); rect(254, 100, 306, 104, hex('#e8e4dc'));
  rect(262, 108, 300, 132, K); rect(263, 109, 299, 132, hex('#2a3448')); rect(266, 112, 296, 128, hex('#ffd890'));
  // la acera mojada y la calzada
  for (let y = 132; y < 150; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 20 === 0 || y === 140) ? hex('#4a4c58') : tono(rampa('#5a5c6a', '#6a6c7a', '#7a7c8a'), 1 + (h(x >> 2, y, 96) - 0.5) * 0.6, x, y));
  rect(0, 150, 319, 152, hex('#9a9aa6')); rect(0, 152, 319, 153, hex('#3a3a44'));
  for (let y = 153; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(rampa('#2a2a36', '#34343e', '#3e3e4a'), 1 + (h(x >> 2, y >> 1, 97) - 0.5) * 0.6, x, y));
  for (let x = 4; x < 320; x += 30) rect(x, 166, x + 14, 167, hex('#d8d8d0'));
  for (let x = 96; x < 176; x += 1) for (let y = 156; y < 176; y += 3) if (h(x, y, 98) > 0.7) pset(x, y, hex('#8a7a60'));
};
const p4 = (t) => {
  pon('navidad', fondo4);
  const { rect, pset, linea, disco } = R;
  // las nubes del anochecer, en tres capas a tres velocidades, sólo sobre el cielo
  const nube = (cx, cy, w, c) => { for (let j = -3; j <= 3; j++) { const ww = Math.round(w * Math.sqrt(1 - (j / 4) ** 2)); for (let x = cx - ww; x <= cx + ww; x++) { const y = cy + j; if (y < 0 || y >= 70 || x < 0 || x > 319) continue; if ((x < 88 && y >= 30) || (x >= 86 && x < 240 && y >= 38) || (x >= 238 && y >= 48)) continue; if (x > 270 && y < 46) continue; pset(x, y, c); } } };
  for (const [v, y, c, n] of [[2, 22, '#5a4a7a', 3], [5, 30, '#7a6088', 3], [9, 16, '#9a7a92', 2]]) for (let k = 0; k < n; k++) nube(Math.round(((k * 140 + t * v) % 420) - 50), y + k * 4, 18 + k * 6, hex(c));
  // el humo de la chimenea
  for (let i = 0; i < 5; i++) { const y = 38 - ((t * 6 + i * 4) % 20), x = 250 + Math.round(Math.sin(t + i) * 2 - (38 - y) * 0.5); if (y > 18) disco(x, y, 1 + (38 - y) / 8, hex('#8a8098')); }
  // las guirnaldas de bombillas que cruzan la calle y parpadean
  for (const [y0, sag, k] of [[52, 10, 0], [60, 8, 1]]) { for (let x = 0; x < 320; x++) { const y = Math.round(y0 + Math.sin(Math.PI * ((x % 160) / 160)) * sag); pset(x, y, hex('#1c1a22')); if (x % 8 === 4) { const on = Math.floor(t * 3 + x / 8 + k) % 3 !== 0; const c = [hex('#ff4a4a'), hex('#4aff6a'), hex('#ffd84a'), hex('#4a9aff')][(x / 8 + k) % 4 | 0]; rect(x, y + 1, x + 1, y + 2, on ? c : mez(c, K, 0.6)); if (on) { tin(x - 1, y + 2, c, 0.4); tin(x + 2, y + 2, c, 0.4); } } } }
  // la estrella que cuelga en medio
  const sy = 66 + Math.round(Math.sin(t * 1.5) * 1); linea(160, 57, 160, sy - 4, K); R.poligono([[160, sy - 5], [162, sy - 1], [166, sy - 1], [163, sy + 2], [164, sy + 6], [160, sy + 3], [156, sy + 6], [157, sy + 2], [154, sy - 1], [158, sy - 1]], (Math.floor(t * 2) % 2) ? hex('#ffe890') : hex('#f0c040'));
  // la cola: avanza un paso cuando sale el primero con su caja
  const sale = VENDE - 0.2, paso = suave(tramo(t, sale + 0.6, sale + 1.3));
  const cola = [EL.comprador1GT, EL.periodista1GT, EL.obrera, EL.cartero, EL.chico, EL.periodista2GT];
  cola.forEach((def, i) => { const x0 = 160 - i * 20, x = Math.round(x0 + paso * 20); if (i === 0) return;
    R.actor(def, x, 146, t, { dir: 1, anda: paso > 0 && paso < 1, sonrisa: i % 2 === 0, habla: i === 3 && Math.sin(t * 7) > 0.3 }); });
  const q = ruta(t, [[sale, 182, 146, 1], [sale + 2.8, 330, 146, 1]]);
  if (t < sale - 0.25) { const e = ruta(t, [[sale - 1.0, 160, 146, 1], [sale - 0.25, 186, 146, 1]]); R.actor(cola[0], e.x, e.s, t, { dir: 1, anda: e.mv, dedo: t > P4 + 0.3 && t < sale - 1.1 }); }
  else { const m = R.actor(EL.comprador2GT, q.x, q.s, t, { dir: 1, anda: q.mv, sostiene: true, sonrisa: true }); const [mx, my] = m.mano; cajaMini(mx - 4, my - 11); }
  if (t < sale + 0.5 && t > sale - 0.6) { R.rect(180, 108, 200, 134, hex('#ffe890')); }
  // un taxi negro pasa por la calzada (por delante de todos)
  const tx = Math.round(lerp(-60, 340, tramo(t, P4 + 1.4, P4 + 3.0)));
  if (tx > -60 && tx < 340) { rect(tx, 158, tx + 44, 172, K); rect(tx + 8, 150, tx + 32, 158, K); rect(tx + 1, 159, tx + 43, 171, hex('#26262e')); rect(tx + 9, 151, tx + 31, 158, hex('#26262e')); rect(tx + 10, 152, tx + 19, 157, hex('#ffd890')); rect(tx + 21, 152, tx + 30, 157, hex('#ffd890')); rect(tx + 42, 160, tx + 46, 163, hex('#fff6c0')); for (let k = 1; k < 14; k++) tin(tx + 46 + k, 161 + (k >> 2), hex('#fff2c0'), 0.4 - k * 0.025); rect(tx + 1, 159, tx + 43, 159, hex('#6a6a7a')); rect(tx + 9, 151, tx + 31, 151, hex('#6a6a7a')); rect(tx + 2, 165, tx + 42, 165, hex('#c8ccd8')); rect(tx + 20, 159, tx + 20, 170, K); rect(tx + 43, 162, tx + 44, 164, hex('#ffe890')); rect(tx + 18, 148, tx + 22, 150, hex('#ffd860')); disco(tx + 10, 172, 4, K); disco(tx + 34, 172, 4, K); disco(tx + 10, 172, 2, hex('#8a8aa0')); disco(tx + 34, 172, 2, hex('#8a8aa0')); }
  // los reflejos de las luces en la calzada mojada
  for (let k = 0; k < 14; k++) { const x = 8 + k * 23, y = 158 + (k % 4) * 5; if (Math.sin(t * 3 + k) > -0.3) linea(x, y, x + 4, y, [hex('#ffd84a'), hex('#ff6a6a'), hex('#6aff8a')][k % 3]); }
  // la cifra sube hasta medio millón
  const n = Math.round(500000 * suave(tramo(t, VENDE, MEDIO)));
  if (t > VENDE - 0.1) R.numero(n.toLocaleString('en-US'), 160, 38, { tam: 16, centro: true });
  if (t > MEDIO && t < MEDIO + 0.5) for (const [dx, dy] of [[-62, -10], [62, -10], [-56, 4], [56, 4]]) pset(160 + dx, 32 + dy, hex('#fff6c0'));
};

// ── 5 · LOCAL el almacén de envíos: un millón más por el mundo ──
const MAS = V(0.9181), MUNDO = V(0.9784);
const fondo5 = () => {
  const { rect, pset, linea, disco, poligono } = R;
  rect(0, 0, 319, 15, hex('#2a2e3a')); rect(0, 12, 319, 15, hex('#3a3e4a')); for (let x = 8; x < 320; x += 20) { rect(x, 4, x + 1, 11, hex('#4a4e5a')); }
  // la pared de bloques pintados
  for (let y = 16; y < 116; y++) for (let x = 0; x < 320; x++) { const fila = (y - 16) / 8 | 0, jx = (x + (fila % 2) * 12) % 24; pset(x, y, ((y - 16) % 8 === 7 || jx === 23) ? hex('#8a94a4') : tono(rampa('#a8b2c0', '#b4bdca', '#c0c8d4'), 1.2 + (h((x + (fila % 2) * 12) / 24 | 0, fila, 101) - 0.5) * 0.7 - (x > 270 && y < 48 ? 0.5 : 0), x, y)); }
  rect(0, 100, 319, 116, hex('#d8b040')); for (let x = 0; x < 320; x += 12) poligono([[x, 116], [x + 6, 100], [x + 10, 100], [x + 4, 116]], hex('#2a2a34'));
  // el cartel del globo con las flechas (sin letras)
  rect(18, 24, 96, 88, K); rect(19, 25, 95, 87, hex('#f2ecd8'));
  for (let j = -24; j <= 24; j++) for (let i = -24; i <= 24; i++) { const r = Math.hypot(i, j); if (r > 24) continue; const x = 57 + i, y = 55 + j; if (r > 23) { pset(x, y, K); continue; }
    const lat = Math.asin(j / 24), lon = Math.asin(Math.max(-1, Math.min(1, i / (24 * Math.cos(lat) + 0.01)))), tierra = Math.sin(lon * 3 + 1) + Math.cos(lat * 4 - 0.5) + Math.sin(lon * 5 + lat * 3) * 0.6 > 0.9;
    pset(x, y, tierra ? (i + j > 10 ? hex('#3a7a3a') : hex('#5aa84a')) : (i + j > 10 ? hex('#2a4a9a') : hex('#3a6ad8'))); if (((Math.round(lon * 12) % 4 === 0) && (j | 0) % 2) || (Math.abs(j) % 8 === 0 && i % 2)) pset(x, y, hex('#a8c8f0')); }
  for (const [a, c] of [[0.6, '#d8303a'], [2.3, '#d8303a'], [3.9, '#d8303a'], [5.3, '#d8303a']]) { const x0 = 57 + Math.cos(a) * 27, y0 = 55 + Math.sin(a) * 27, x1 = 57 + Math.cos(a) * 34, y1 = 55 + Math.sin(a) * 34; linea(x0, y0, x1, y1, hex(c)); disco(x1, y1, 1.5, hex(c)); }
  // el ventanal alto (lo de fuera en cada fotograma)
  rect(160, 22, 262, 82, K); rect(161, 23, 261, 81, hex('#6a6e7a')); for (let x = 161; x < 262; x += 25) rect(x, 23, x + 1, 81, hex('#6a6e7a'));
  // las baldas de paquetes a la izquierda
  rect(0, 92, 120, 94, K); rect(0, 92, 120, 92, hex('#8a8ea0'));
  for (let i = 0; i < 8; i++) { const x = 4 + i * 15, hh = 10 + (i % 3) * 3; rect(x, 92 - hh, x + 12, 91, K); rect(x + 1, 93 - hh, x + 11, 91, hex('#c8a060')); rect(x + 5, 93 - hh, x + 6, 91, hex('#e8d8a8')); }
  // la cinta transportadora y sus patas
  rect(0, 116, 319, 128, K); rect(0, 117, 319, 121, hex('#2a2a34')); rect(0, 122, 319, 127, hex('#6a6e7a')); for (let x = 4; x < 320; x += 10) disco(x, 124, 2, hex('#8a8ea0'));
  for (let x = 20; x < 320; x += 60) { rect(x, 128, x + 3, 154, K); rect(x + 1, 128, x + 2, 154, hex('#8a8ea0')); }
  // el suelo de hormigón con la línea amarilla
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) if (R.pget(x, y) === 0) pset(x, y, tono(rampa('#6a6c74', '#7a7c84', '#8a8c94'), 1 + (h(x >> 2, y >> 1, 102) - 0.5) * 0.7 + (y - 128) / 100, x, y));
  for (let x = 0; x < 320; x++) if ((x >> 4) % 2) rect(x, 170, x, 172, hex('#e8c040'));
  // la jaula de carga de la derecha (malla)
  rect(272, 100, 318, 160, K); for (let y = 101; y < 160; y++) for (let x = 273; x < 318; x++) if ((x + y) % 6 === 0 || (x - y) % 6 === 0) pset(x, y, hex('#8a8ea0')); else if (R.pget(x, y) === K) pset(x, y, hex('#3a3a44'));
};
const p5 = (t) => {
  pon('envios', fondo5);
  const { rect, pset, linea, disco } = R;
  // por el ventanal: el aeropuerto al anochecer y el avión de carga que despega en «world»
  R.recorte([162, 24, 260, 80]);
  for (let y = 24; y < 81; y++) linea(162, y, 260, y, tono(rampa('#2a2a5a', '#5a4a7a', '#b07a7a', '#e0a070'), (y - 24) / 14, 200, y));
  for (let x = 162; x < 261; x += 1) linea(x, 74, x, 80, hex('#3a3a44')); for (let x = 166; x < 260; x += 8) pset(x, 76, (Math.floor(t * 4 + x / 8) % 2) ? hex('#ffd84a') : hex('#4a4a54'));
  const u = tramo(t, MUNDO - 1.0, MUNDO + 1.4), ax = Math.round(lerp(150, 270, u)), ay = Math.round(lerp(72, 28, u * u));
  linea(ax, ay, ax + 22, ay - 4 * u, BL); linea(ax, ay + 1, ax + 22, ay + 1 - 4 * u, BL); R.poligono([[ax + 8, ay], [ax + 4, ay + 5], [ax + 12, ay + 1]], hex('#c8ccd8')); R.poligono([[ax + 1, ay], [ax - 2, ay - 6], [ax + 4, ay - 1]], hex('#c8ccd8')); pset(ax + 22, ay - Math.round(4 * u), hex('#ff4a4a'));
  R.recorte(null);
  for (let x = 161; x < 262; x += 25) rect(x, 23, x + 1, 81, hex('#6a6e7a'));
  // los paquetes corren por la cinta y caen en la jaula; cada uno con su pegatina (avión, barco, globo)
  const vel = 46 + 20 * tramo(t, MAS, MAS + 1);
  for (let k = 0; k < 8; k++) { const x = ((t * vel + k * 44) % 352) - 32, y = 103;
    if (x > 262) continue; rect(x, y, x + 22, y + 14, K); rect(x + 1, y + 1, x + 21, y + 13, hex('#c8a060')); rect(x + 1, y + 1, x + 21, y + 2, hex('#e0bc80')); rect(x + 10, y + 1, x + 12, y + 13, hex('#e8d8a8'));
    if (x > 60) { rect(x + 2, y + 4, x + 9, y + 11, BL); R.icono(['barco', 'globo', 'avion'][k % 3], x + 2, y + 4, hex('#3a6ad8'), BL); } }
  for (let k = 0; k < 6; k++) { const y = 150 - (k % 3) * 12, x = 278 + (k * 9) % 32; rect(x, y - 10, x + 14, y, K); rect(x + 1, y - 9, x + 13, y - 1, hex('#c8a060')); }
  // el operario pega una etiqueta a cada paquete que pasa
  const golpe = (Math.floor(t * vel / 44 * 1) % 2) === 0;
  const o = R.actor(EL.obrero, 52, 160, t, { dir: 1, sostiene: [72, golpe ? 122 : 116], sonrisa: t > MAS });
  rect(o.mano[0] - 1, o.mano[1] - 3, o.mano[0] + 5, o.mano[1] + 2, K); rect(o.mano[0], o.mano[1] - 2, o.mano[0] + 4, o.mano[1] + 1, BL);
  // los sacos de correo con el avión, en el suelo
  for (const [x, y] of [[12, 168], [34, 172], [22, 158]]) { R.disco(x, y - 6, 9, K); R.disco(x, y - 6, 8, hex('#e8e0c8')); R.rect(x - 2, y - 16, x + 2, y - 13, K); R.icono('avion', x - 3, y - 9, hex('#3a6ad8'), hex('#e8e0c8')); }
  // la carretilla elevadora cruza por delante con un palé de cajas
  const fx = Math.round(lerp(-70, 340, tramo(t, P5 + 0.6, P5 + 3.8)));
  if (fx > -70 && fx < 340) { rect(fx, 150, fx + 34, 168, K); rect(fx + 1, 151, fx + 33, 167, hex('#e8c040')); rect(fx + 1, 151, fx + 33, 152, hex('#f6e070')); rect(fx + 6, 134, fx + 24, 151, K); rect(fx + 8, 136, fx + 22, 150, hex('#3a4a6a')); rect(fx + 7, 134, fx + 23, 135, hex('#e8c040'));
    rect(fx + 35, 128, fx + 37, 170, K); rect(fx + 36, 166, fx + 56, 168, K); rect(fx + 38, 146, fx + 56, 165, K); for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) cajaMini(fx + 39 + i * 6, 147 + j * 9);
    disco(fx + 8, 170, 6, K); disco(fx + 28, 170, 6, K); disco(fx + 8, 170, 3, hex('#8a8aa0')); disco(fx + 28, 170, 3, hex('#8a8aa0')); if (Math.floor(t * 4) % 2) rect(fx + 14, 131, fx + 16, 133, hex('#ff8a2a')); }
  const n = Math.round(1000000 * suave(tramo(t, MAS - 0.2, MAS + 0.9)));
  if (t > P5 + 0.2) { R.numero('+' + n.toLocaleString('en-US'), 210, 98, { tam: 16, centro: true }); }
  if (t > MAS + 0.9 && t < MAS + 1.4) for (const [dx, dy] of [[-84, -14], [84, -14], [-78, 2], [78, 2]]) R.linea(210 + dx, 92 + dy, 210 + dx * 1.08, 92 + dy * 1.3, hex('#fff6c0'));
};

const efectos = [[ENTRA, 'timbre'], [PIRA, 'toc'], [DIECIOCHO, 'pop'], [ABRE + 0.1, 'puerta'], [DOCE + 0.3, 'tecleo'],
  [P3 + 0.3, 'tecleo'], [CIUDAD.pare + 0.1, 'bip'], [CIUDAD.verde + 0.15, 'motor'], [P4 + 0.2, 'campana'], [P4 + 1.6, 'coche'], [MEDIO, 'brillo'],
  [P5 + 0.2, 'maquina'], [MAS + 0.9, 'brillo'], [MUNDO - 0.2, 'jet']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => (t >= P2 && t < P4 ? 1998 : 1997) });
''')
