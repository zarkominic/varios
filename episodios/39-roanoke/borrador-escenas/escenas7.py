E = {}

# piezas comunes de las dos escenas (se pegan al principio de cada cuerpo)
COMUN = r'''
const K = hex('#17151d'), BL = hex('#f6f2ea'), GUANTE = '#5a8ad0';
const ease = (u) => u * u * (3 - 2 * u);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { a = Math.max(0, Math.min(1, a)); const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const H = (s) => hex(s);
// un fondo fijo propio, en su búfer (se pinta una vez)
const CAPAS = new Map();
const capa = (clave, dibuja) => { let b = CAPAS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); R.recorte(null); CAPAS.set(clave, b); } R.copiar(b); };
// tramado de Bayer 4×4 y degradado vertical tramado entre varios colores
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const deg = (x0, y0, x1, y1, cols) => { const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), r = f - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, r > bay(x, y) ? cols[i + 1] : cols[i]); } };
// las zonas que se quedan tranquilas: Atom y la barra del año
const tranquilo = (x, y) => (x >= 268 && y <= 50) || (x >= 14 && x <= 176 && y <= 24);
// nube de tres tonos (sombra, cuerpo, luz)
const nube3 = (cx, cy, w, c) => {
  const b = [[0, 0, 0.3], [-0.3, 0.06, 0.22], [0.3, 0.05, 0.24], [-0.1, -0.12, 0.24], [0.14, -0.09, 0.2], [0.46, 0.1, 0.14], [-0.46, 0.1, 0.13]];
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), Math.round(r * w), c[0]);
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), Math.round(r * w * 0.9), c[1]);
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), Math.round(r * w * 0.58), c[2]);
};
// copa redonda de árbol en racimos
const copa = (cx, cy, r, c, cl, cs, k0 = 0) => { for (let k = 0; k < 7; k++) { const a = hh(k, 1, k0) * 6.28, d = r * 0.55 * hh(k, 2, k0); R.disco(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d * 0.7 + 1), Math.round(r * 0.5), cs); }
  for (let k = 0; k < 7; k++) { const a = hh(k, 1, k0) * 6.28, d = r * 0.55 * hh(k, 2, k0); R.disco(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d * 0.7), Math.round(r * 0.45), c); }
  for (let k = 0; k < 5; k++) { const a = hh(k, 3, k0) * 3 + 3.4, d = r * 0.5 * hh(k, 4, k0); R.disco(Math.round(cx + Math.cos(a) * d - 1), Math.round(cy + Math.sin(a) * d * 0.7 - 2), Math.round(r * 0.22), cl); } };
// mata de hierba que se mece con el viento
const mata = (x, b, h, t, c, cl, k = 0, fuerza = 1) => { const m = Math.sin(t * 2.2 + x * 0.21 + k) * fuerza;
  for (let i = -2; i <= 2; i++) { const hh2 = h - Math.abs(i) * 1.4, tx = Math.round(x + i * 1.6 + m * hh2 * 0.25); R.linea(x + i, b, tx, Math.round(b - hh2), i % 2 ? cl : c); } };
// el brillo cálido de una luz sobre lo que hay (mezcla los píxeles de alrededor)
const resplandor = (cx, cy, r, c, a) => { if (a <= 0) return; for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const g = 1 - Math.hypot(x - cx, (y - cy) * 1.3) / r; if (g > 0 && !tranquilo(x, y)) R.pset(x, y, mez(R.pget(x, y), c, g * g * a)); } };
// veta de madera horizontal en un rectángulo (tablas con juntas, vetas onduladas y nudos)
const madera = (x0, y0, x1, y1, c, cl, cs, k0 = 0, tabla = 12) => {
  R.rect(x0, y0, x1, y1, c);
  for (let y = y0; y <= y1; y++) { const j = (y - y0) % tabla; if (j === 0) { R.linea(x0, y, x1, y, cs); continue; } if (j === 1) { R.linea(x0, y, x1, y, cl); continue; }
    for (let x = x0; x <= x1; x++) { const v = Math.sin(x * 0.045 + Math.floor((y - y0) / tabla) * 2.1 + Math.sin(x * 0.13 + k0) * 0.9 + j * 0.55); if (v > 0.93) R.pset(x, y, cs); else if (v < -0.96) R.pset(x, y, cl); } }
  for (let k = 0; k < Math.round((x1 - x0) * (y1 - y0) / 1600); k++) { const x = x0 + 6 + Math.floor(hh(k, 1, k0) * (x1 - x0 - 12)), y = y0 + 4 + Math.floor(hh(k, 2, k0) * (y1 - y0 - 8)); R.disco(x, y, 2, cs); R.pset(x, y, cl); R.linea(x - 6, y - 2, x - 3, y - 1, cs); R.linea(x + 3, y + 1, x + 6, y + 2, cs); } };
// estera tejida (tramado de cuadros en diagonal)
const estera = (x0, y0, x1, y1, c, cl, cs, paso = 4) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = Math.floor((x + y) / paso), b = Math.floor((x - y + 400) / paso), m = (a + b) % 2; const e = m ? (x + y) % paso : (x - y + 400) % paso;
  R.pset(x, y, e === 0 ? cs : e === 1 ? cl : c); } };
// el libro de tapas pardas cerrado, pequeño, en la mano de alguien (x, y: el centro)
const libroMano = (x, y, abierto = 0) => { x = Math.round(x); y = Math.round(y);
  if (abierto) { R.rect(x - 7, y - 4, x + 7, y + 2, K); R.rect(x - 6, y - 3, x - 1, y + 1, H('#efe6d0')); R.rect(x + 1, y - 3, x + 6, y + 1, H('#e4d8bc')); R.linea(x, y - 3, x, y + 2, H('#6a3a20'));
    for (const j of [-2, 0]) { R.linea(x - 5, y + j, x - 2, y + j, H('#8a7a62')); R.linea(x + 2, y + j, x + 5, y + j, H('#8a7a62')); } return; }
  R.rect(x - 4, y - 5, x + 4, y + 2, K); R.rect(x - 3, y - 4, x + 3, y + 1, H('#6a3a20')); R.linea(x - 3, y - 4, x - 3, y + 1, H('#8a5434')); R.linea(x + 3, y - 3, x + 3, y + 1, H('#efe6d0')); R.pset(x, y - 2, H('#c8a040')); };
// un destello pequeño de cuatro puntas
const destello = (x, y, c, r = 2) => { x = Math.round(x); y = Math.round(y); R.pset(x, y, c); for (let i = 1; i <= r; i++) { R.pset(x + i, y, c); R.pset(x - i, y, c); R.pset(x, y + i, c); R.pset(x, y - i, c); } };
'''

E['rk-cierre'] = ('Cierre', '''// RK-CIERRE (frases 31–33), sin cartela. Nueve planos; cierre cálido: la colonia no se perdió del todo.
// 1. (2026) la maqueta de Atom: el guante toca la empalizada en «colony», «?» en «Roanoke», señala la lupa y el imán en
//    «clues» y en «vanish all at once» reparte las figuritas: cuatro a la canoa de papel (al sur) y cuatro a los pinitos;
// 2. (1588) la orilla del pueblo de tarde, en la sequía: la colona vuelca el cesto vacío en «drought», bocadillo con el
//    barco tachado en «no ships»; el colono lanza el fardo a la canoa en «split up»; Manteo señala el sur en «Manteo» y
//    la canoa sale con la colona y el niño, que dice adiós; los de la orilla se quedan;
// 3. (1588) el pinar: el otro grupo mira atrás (la colona señala la costa, «just as the post said») y en «perhaps» echa a
//    andar senda arriba, tierra adentro; un ciervo levanta la cabeza y se va, un cardenal, rayos de sol;
// 4. (1600) años después, un pueblo de Croatoan junto al mar: los niños de los dos pueblos se pasan la pelota (la coge
//    en «children»), el perro salta; las dos mujeres desgranan maíz y en «took them in» una le da la mazorca a la otra;
// 5. (1588) el roble de la duna al atardecer: un colono subido a dos cofres talla «CRO»; brilla en «clear message»; la
//    colona y su niño (que salta en «lost») le esperan y en «their own people» echan a andar;
// 6. (1590) al anochecer desde el agua: la isla con su fuego; el barco de White se aleja hacia la tormenta; la colona lo
//    señala en «the one person» y baja el brazo en «never managed»; relámpago; Manteo se vuelve hacia ella en «back»;
// 7. (2026) el corcho de cerca: la nota de la taza; el guante la coge en «anything», la da la vuelta en «answer» y es una
//    flecha a la isla; la clava en «down» (gag 8); en la mesa, la taza de verdad humea (era café);
// 8. (2026) las tres pistas en fila sobre el fieltro: la lupa pasa con un «?»; se encienden el poste con «CRO» en «post»,
//    los anillos finos en «tree rings» y las escamas en «iron»; un hilo de puntos rojos las une;
// 9. (2026) la criba de Hatteras, de tarde: el imán remueve la tierra con paciencia, las escamas crecen; sube en «magnet»
//    con su destello; una mariquita cruza y una mariposa se posa en el imán.''', COMUN + r'''
const burbuja = (cx, cy, w, h, tx, ty, u, dibuja) => { if (u <= 0) return; const s = Math.min(1, u), W2 = Math.round(w * s), H2 = Math.round(h * s);
  const tx2 = Math.round(lerp(cx, tx, s)), ty2 = Math.round(lerp(cy + H2, ty, s)); R.poligono([[cx - 4, cy + H2 - 1], [cx + 4, cy + H2 - 1], [tx2, ty2]], K); R.poligono([[cx - 3, cy + H2 - 2], [cx + 3, cy + H2 - 2], [Math.round(lerp(cx, tx2, 0.85)), Math.round(lerp(cy + H2, ty2, 0.85))]], BL);
  R.rect(cx - W2 - 1, cy - H2, cx + W2 + 1, cy + H2, K); R.rect(cx - W2, cy - H2 - 1, cx + W2, cy + H2 + 1, K); R.rect(cx - W2, cy - H2 + 1, cx + W2, cy + H2 - 1, BL); R.rect(cx - W2 + 1, cy - H2, cx + W2 - 1, cy + H2, BL);
  R.linea(cx - W2 + 1, cy + H2, cx + W2 - 1, cy + H2, H('#d8d4cc'));
  if (s >= 0.95) dibuja(cx, cy); };
const preg = (x, y, c = H('#c8303a'), esc = 2) => R.icono('?', Math.round(x), Math.round(y), c, K, esc);
// la espadita (pequeña, en la mano de un personaje): hoja, guarda y pomo
const espadita = (x, y, d = 1, ang = 0) => { x = Math.round(x); y = Math.round(y); const ex = x + Math.round(d * 13 * Math.cos(ang)), ey = y - Math.round(13 * Math.sin(ang));
  R.linea(x, y + 1, ex, ey + 1, K); R.linea(x, y, ex, ey, H('#d8e0e8')); R.linea(x - d, y - 1, x - d * 4, y - 1, K);
  R.rect(x - 1, y - 3, x + 1, y + 3, K); R.linea(x, y - 2, x, y + 2, H('#c8a040')); R.pset(x - d * 4, y - 1, H('#c8a040')); R.pset(x - d * 5, y - 1, H('#8a6a2a')); };
// el calcetín del gag (blanco con rayas rojas)
const calcetin = (x, y, ang = 0) => { x = Math.round(x); y = Math.round(y);
  R.poligono([[x - 3, y - 8], [x + 3, y - 8], [x + 3, y + 2], [x + 8, y + 3], [x + 8, y + 7], [x - 3, y + 7]], K);
  R.poligono([[x - 2, y - 7], [x + 2, y - 7], [x + 2, y + 3], [x + 7, y + 4], [x + 7, y + 6], [x - 2, y + 6]], BL);
  for (const j of [-5, -2]) R.linea(x - 2, y + j, x + 2, y + j, H('#c8303a')); R.rect(x + 4, y + 4, x + 7, y + 6, H('#c8303a')); };
// la mazorca pequeña (para la balanza y la mano)
const mazorca = (x, y) => { x = Math.round(x); y = Math.round(y); R.disco(x, y, 4, K); R.rect(x - 7, y - 3, x + 5, y + 3, K); R.rect(x - 6, y - 2, x + 4, y + 2, H('#e0c040'));
  for (let i = -5; i <= 3; i += 2) { R.pset(x + i, y - 1, H('#b8901a')); R.pset(x + i + 1, y + 1, H('#b8901a')); } R.poligono([[x + 3, y - 3], [x + 10, y - 6], [x + 6, y], [x + 10, y + 5], [x + 3, y + 3]], H('#6a9a3a')); R.linea(x + 4, y, x + 9, y - 4, H('#8aba4a')); };
// el guante de Atom (la mano canónica, sin manga) que viene de su esquina
const guante = (x, y, d = -1) => T.mano(R, Math.round(x), Math.round(y), d, GUANTE, { sinManga: true });
// cielo tramado de día con nubes de tres tonos que pasan a tres velocidades y pájaros
const cieloDia = (t, t0, y1, cols, nubesL) => { deg(0, 0, 319, y1, cols); };
const nubesDia = (t, t0, lista) => { for (const [x0, y, w, v, c] of lista) { const x = Math.round(x0 + (t - t0) * v); if (x > 250 && y < 56) continue; nube3(x, y, w, c); } };
const pajaros = (t, n, y0, k0, c = K) => { for (let k = 0; k < n; k++) { const x = Math.round((hh(k, 1, k0) * 300 + t * (8 + k * 2)) % 340) - 10, y = y0 + Math.round(hh(k, 2, k0) * 20 + Math.sin(t + k) * 2); if (tranquilo(x, y)) continue; const a = Math.sin(t * 8 + k * 2) > 0;
  R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : 0), c); R.pset(x + 2, y - (a ? 2 : 0), c); } };
const NUB = [H('#b8c8d8'), H('#e0e8f0'), H('#ffffff')];

// ── tiempos: cada frase con su marca (los segundos son de la voz inglesa, desde el principio de la escena) ──────────
const A = (s) => en('entonces', (s - 0.9) / 18.229), B = (s) => en('perdida', (s - 19.629) / 9.427), Cf = (s) => en('final', (s - 29.556) / 13.209);
const W = (s) => s < 19.4 ? A(s) : s < 29.4 ? B(s) : Cf(s);
const P2 = W(6.28), P3 = W(11.54), P4 = W(15.13), P5 = W(19.629), P6 = W(24.24), P7 = W(29.556), P8 = W(33.94), P9 = W(39.76);
const ri = Math.round;
// recorrido por puntos clave [[t, x, y, dir], …]: interpola con suavidad entre uno y el siguiente
const ruta = (t, K) => { if (t <= K[0][0]) return K[0].slice(1); for (let i = 0; i + 1 < K.length; i++) { const [a, x0, y0, d0] = K[i], [b, x1, y1, d1] = K[i + 1]; if (t <= b) { const u = ease(Math.max(0, Math.min(1, (t - a) / Math.max(1e-6, b - a)))); return [lerp(x0, x1, u), lerp(y0, y1, u), u < 0.5 ? d0 : d1]; } } return K[K.length - 1].slice(1); };
// el fardo de tela atado con cuerda (en la mano o en el suelo)
const fardo = (x, y) => { x = ri(x); y = ri(y); R.rect(x - 5, y - 4, x + 5, y + 3, K); R.rect(x - 4, y - 3, x + 4, y + 2, H('#b89a6a')); R.rect(x - 4, y - 3, x + 4, y - 3, H('#d8bc8a')); R.linea(x, y - 4, x, y + 3, H('#6a4a2a')); R.linea(x - 5, y - 1, x + 5, y - 1, H('#6a4a2a')); R.pset(x - 3, y + 1, H('#8a6a44')); R.pset(x + 2, y + 2, H('#8a6a44')); };
// el cesto de cañas (boca arriba u, con boca abajo, volcado)
const cesto = (x, y, volcado = false) => { x = ri(x); y = ri(y); const yb = volcado ? -1 : 1;
  R.poligono([[x - 6, y - 3 * yb], [x + 6, y - 3 * yb], [x + 4, y + 4 * yb], [x - 4, y + 4 * yb]].map(([a, b]) => [a, b]), K);
  R.poligono([[x - 5, y - 2 * yb], [x + 5, y - 2 * yb], [x + 3, y + 3 * yb], [x - 3, y + 3 * yb]], H('#c8a050'));
  for (let i = -4; i <= 4; i += 2) R.pset(x + i, y, H('#8a6a2a')); R.linea(x - 5, y - 2 * yb, x + 5, y - 2 * yb, H('#e8c878')); };
// la navajita de tallar en la mano (hoja hacia la madera)
const navajita = (x, y, d = 1) => { x = ri(x); y = ri(y); R.rect(x - 2, y - 1, x + 2, y + 1, K); R.linea(x - 1, y, x + 1, y, H('#8a5a30')); R.linea(x + d * 3, y - 1, x + d * 8, y - 2, K); R.linea(x + d * 3, y, x + d * 8, y - 1, H('#e0e4ec')); };
// el barquito de White (una pinaza con dos velas y la cruz roja), de perfil hacia la derecha; (x, y): la línea de flotación
const pinaza = (t, x, y, luzF = 0) => { x = ri(x); y = ri(y);
  R.poligono([[x - 24, y - 7], [x + 20, y - 7], [x + 26, y - 11], [x + 20, y + 1], [x - 18, y + 1], [x - 26, y - 10]], K);
  R.poligono([[x - 23, y - 6], [x + 19, y - 6], [x + 24, y - 9], [x + 19, y], [x - 17, y], [x - 24, y - 9]], H('#4a2e1e'));
  R.linea(x - 22, y - 5, x + 19, y - 5, H('#7a5236')); R.linea(x - 18, y - 2, x + 18, y - 2, H('#3a2214'));
  R.rect(x - 26, y - 14, x - 18, y - 7, K); R.rect(x - 25, y - 13, x - 19, y - 8, H('#5a3a24')); R.pset(x - 23, y - 11, H('#f8d070'));
  for (const [mx, h2, w2] of [[x - 6, 34, 11], [x + 10, 26, 8]]) { R.linea(mx, y - 7, mx, y - 7 - h2, K);
    const fl = Math.sin(t * 3 + mx) * 1.2; for (let j = 0; j < h2 - 8; j++) { const ww = ri(w2 * (0.7 + 0.3 * Math.sin(j / (h2 - 8) * 3.14)) + fl * Math.sin(j / (h2 - 8) * 3.14)); R.linea(mx + 1, y - 11 - j, mx + 1 + ww, y - 11 - j, j % 7 === 0 ? H('#c8b898') : H('#e8dcc4')); R.pset(mx + 1 + ww, y - 11 - j, K); }
    const cy2 = y - 11 - ri((h2 - 8) / 2); R.linea(mx + 2, cy2, mx + w2 - 1, cy2, H('#c8303a')); R.linea(mx + ri(w2 / 2), cy2 - 4, mx + ri(w2 / 2), cy2 + 4, H('#c8303a')); }
  R.linea(x - 6, y - 41, x - 6, y - 45, K); for (let i = 0; i < 6; i++) R.pset(x - 5 + i, y - 44 + ri(Math.sin(t * 6 + i) * 0.8), H('#c8303a'));
  R.linea(x + 20, y - 8, x + 34, y - 14, K);
  if (luzF > 0) { R.disco(x - 22, y - 16, 2, H('#ffe08a')); R.pset(x - 22, y - 16, BL); } };

// ── 1 · la maqueta: «¿qué pasó?» y el guante reparte las figuritas en dos grupos (no desaparecen) ────────────────────
const COLONY = W(1.70), ROANOKE = W(2.18), CLUES = W(3.61), VANISH = W(4.93), ONCE = W(5.51);
const GA = [[128, 152, '#3a6ac8', '#5a3a20'], [136, 150, '#c8303a', '#f0e8dc'], [144, 153, '#4a8a3a', '#5a3a20'], [152, 151, '#8a5a9a', '#f0e8dc']];
const GB = [[166, 151, '#d89a30', '#5a3a20'], [174, 153, '#3a8aa8', '#f0e8dc'], [182, 150, '#b8483a', '#5a3a20'], [190, 152, '#5a7a3a', '#f0e8dc']];
// una figurita de madera pintada (peón con cabeza y sombrero o cofia), base en (x, y)
const peon = (x, y, c, gorro) => { x = ri(x); y = ri(y); R.linea(x - 3, y + 1, x + 4, y + 1, H('#8a6a40'));
  R.rect(x - 3, y - 8, x + 3, y, K); R.rect(x - 2, y - 7, x + 2, y - 1, H(c)); R.linea(x - 2, y - 7, x - 2, y - 1, mez(H(c), BL, 0.4)); R.linea(x - 3, y, x + 3, y, H('#c8a070'));
  R.disco(x, y - 11, 3, K); R.disco(x, y - 11, 2, H('#f0c8a0')); R.pset(x - 1, y - 12, H('#fff0d8')); R.linea(x - 3, y - 13, x + 3, y - 13, K); R.linea(x - 2, y - 14, x + 2, y - 14, H(gorro)); R.linea(x - 2, y - 13, x + 2, y - 13, H(gorro)); };
const pinito = (x, y, h2) => { R.linea(x, y, x, y - 3, H('#6a4a2a')); for (let j = 0; j < h2; j++) { const w = ri((h2 - j) * 0.45); R.linea(x - w, y - 3 - j, x + w, y - 3 - j, j % 3 === 0 ? H('#2a5a2a') : H('#3a7a3a')); } R.pset(x, y - 3 - h2, H('#5a9a4a')); };
const p1 = (t) => {
  T.hoy(R, t, { encuadre: 'estudio', camara: 'maqueta' });
  // en la base de corcho: tres pinitos de musgo (tierra adentro) y una canoa de papel sobre una tira de papel azul (el sur)
  for (const [x, y, h2] of [[90, 147, 14], [100, 153, 11], [82, 152, 9], [110, 146, 8]]) pinito(x, y, h2);
  R.poligono([[212, 150], [262, 147], [266, 153], [214, 157]], H('#3a6aa8')); for (let x = 216; x < 262; x += 5) R.pset(x + ri(Math.sin(t * 3 + x) * 1), 151 + (x % 3), H('#8ab8e0'));
  R.poligono([[220, 146], [254, 146], [250, 151], [224, 151]], K); R.poligono([[221, 147], [253, 147], [249, 150], [225, 150]], H('#b8885a')); R.linea(222, 147, 252, 147, H('#d8b080'));
  // el guante: llega, toca la empalizada («colony», «Roanoke»), señala la lupa y el imán («clues») y reparte las figuritas
  const K1 = [[P7 * 0, 330, 176, -1], [W(0.6), 330, 176, -1], [COLONY - 0.1, 206, 138, -1], [ROANOKE + 0.3, 200, 136, -1], [CLUES - 0.2, 252, 128, -1], [CLUES + 0.5, 262, 140, -1],
    [W(4.45), 156, 147, 1], [W(4.55), 156, 147, 1], [W(5.25), 204, 147, 1], [W(5.35), 168, 146, -1], [W(5.42), 166, 147, -1], [W(6.1), 122, 147, -1], [W(6.4), 140, 132, -1]];
  let [gx, gy, gd] = ruta(t, K1);
  if (t > COLONY - 0.1 && t < ROANOKE + 0.4) gy += Math.abs(Math.sin((t - COLONY) * 9)) * -3;
  // las figuritas: el grupo B va a la canoa (al sur) y el grupo A a los pinitos (tierra adentro)
  const uB = ease(tramo(t, W(4.55), W(5.25))), uA = ease(tramo(t, W(5.42), W(6.1)));
  for (const [i, [x, y, c, g2]] of GA.entries()) peon(x - 34 * uA - (i % 2) * 2 * uA, y - 2 * uA * (i % 2), c, g2);
  for (const [i, [x, y, c, g2]] of GB.entries()) peon(x + 52 * uB + i * 1.5 * uB, lerp(y, 149, uB), c, g2);
  // el borde de la canoa de papel por delante de las que ya están dentro
  if (uB > 0.7) R.linea(224, 151, 250, 151, H('#8a6040'));
  // «?» sobre la empalizada: ¿adónde fueron?
  burbuja(160, 74, 9, 10, 168, 98, tramo(t, ROANOKE, ROANOKE + 0.25) * (1 - tramo(t, VANISH - 0.3, VANISH)), (cx, cy) => preg(cx - 4, cy - 7));
  guante(gx, gy, gd);
};

// ── 2 · la orilla del pueblo, de tarde y en la sequía: el fardo a la canoa y Manteo se los lleva al sur ──────────────
const DROUGHT = W(6.52), SHIPS = W(7.18), SPLIT = W(8.08), SOME = W(9.22), MANTEO = W(9.72), CROATOAN = W(10.36);
const p2 = (t) => {
  const o = { encuadre: 'secotan', camara: 'canoas', luz: 'tarde', seco: 0.5, canoa: 0.36 * ease(tramo(t, SOME + 0.1, P3 + 0.2)) };
  const g = T.pueblo(R, t, o), [cx, cy] = g.canoa, bob = ri(Math.sin(t * 2.2) * 0.8);
  // en la canoa: Manteo a popa con la pértiga (señala el sur en «Manteo»), una colona y su niño, que dice adiós
  const ma = R.actor(EL.manteoRK, cx - 24, cy + bob, t, { dir: 1, dedo: t > MANTEO - 0.1 && t < CROATOAN + 0.7, sostiene: t > MANTEO - 0.1 && t < CROATOAN + 0.7 ? false : [cx - 8, cy - 22], sonrisa: t > SOME });
  { const apunta = t > MANTEO - 0.1 && t < CROATOAN + 0.7, [mx, my] = apunta ? [cx - 22, cy - 22 + bob] : ma.mano; R.linea(mx, my - 14, mx - 6, cy - 4 + bob, K); R.linea(mx + 1, my - 14, mx - 5, cy - 4 + bob, H('#8a6a40')); }
  R.actor(EL.colonaRK, cx - 9, cy + bob, t, { dir: 1, sonrisa: t > CROATOAN, habla: t > SOME && t < MANTEO && Math.sin(t * 9) > 0 });
  R.actor(EL.ninoColonoRK, cx + 5, cy + bob, t, { dir: -1, brazos: t > SOME + 0.3 && Math.sin(t * 7) > -0.3, sonrisa: true });
  // el fardo: lo trae el colono por la arena y en «split up» lo lanza a la canoa
  const cxl = ri(lerp(40, 158, ease(tramo(t, P2, SPLIT - 0.25)))), anda = t > P2 && t < SPLIT - 0.25, vuelve = t > CROATOAN + 0.4;
  const xc = vuelve ? ri(lerp(158, 120, tramo(t, CROATOAN + 0.4, P3))) : cxl;
  const lanza = tramo(t, SPLIT, SPLIT + 0.45), lleva = t < SPLIT;
  const co = R.actor(EL.colonoRK, xc, g.suelo, t, { dir: vuelve ? -1 : 1, anda: anda || (vuelve && t < P3), sostiene: lleva ? [xc + 18, g.suelo - 18] : false, brazos: t > SOME + 0.2 && t < CROATOAN + 0.4, triste: vuelve });
  if (lleva) fardo(co.mano[0] + 2, co.mano[1] - 3);
  else if (lanza < 1) fardo(lerp(xc + 20, cx + 2, lanza), lerp(g.suelo - 21, cy - 12 + bob, lanza) - Math.sin(lanza * 3.14) * 16);
  else fardo(cx + 2, cy - 11 + bob);
  // la colona de la orilla: vuelca el cesto vacío en «drought» (solo polvo), mira al mar en «no ships» y en «split up»
  // señala tierra adentro: ella se queda con el otro grupo
  const vol = t > DROUGHT - 0.1 && t < SHIPS;
  const cl = R.actor(EL.colonaRK, 96, g.suelo, t, { pal: PAL_COLONA2, dir: t > SPLIT ? -1 : 1, sostiene: t < SPLIT ? [116, g.suelo - (vol ? 22 : 15)] : false, dedo: t > SPLIT + 0.1 && t < SOME + 0.6, triste: t > DROUGHT && t < SPLIT });
  if (t < SPLIT) { cesto(cl.mano[0] + 2, cl.mano[1] - 1, vol); if (vol) for (let k = 0; k < 6; k++) { const p = ((t - DROUGHT) * 1.6 + k / 6) % 1; R.pset(ri(cl.mano[0] + 1 + Math.sin(k * 3) * 3), ri(cl.mano[1] + 3 + p * 14), H('#c8b08a')); } }
  // el bocadillo: ningún barco (un barco tachado)
  burbuja(110, 82, 15, 11, 104, g.suelo - 30, tramo(t, SHIPS - 0.15, SHIPS + 0.1) * (1 - tramo(t, SPLIT - 0.1, SPLIT + 0.1)), (bx, by) => {
    for (let i = -9; i <= 9; i++) R.pset(bx + i, by + 5 + (Math.abs(i) > 7 ? -1 : 0), H('#5a3a24')); R.rect(bx - 8, by + 2, bx + 8, by + 4, H('#6a4a2a')); R.linea(bx, by + 2, bx, by - 8, K); R.rect(bx + 1, by - 7, bx + 6, by - 1, H('#e8dcc4'));
    R.icono('X', bx - 2, by - 3, H('#c8303a'), K, 2); });
  // el niño de la orilla corre a coger la mano de la colona cuando se separan
  const nx = ri(lerp(150, 80, ease(tramo(t, SPLIT + 0.2, MANTEO))));
  R.actor(EL.ninoColonoRK, nx, g.suelo + 2, t, { pal: PAL_NINO2, dir: nx < 82 ? 1 : -1, anda: t > SPLIT + 0.2 && t < MANTEO, brazos: t > CROATOAN + 0.2 && Math.sin(t * 7) > 0 });
  T.puebloDelante(R, t, o);
};

// ── 3 · el pinar: otro grupo se va tierra adentro ───────────────────────────────────────────────────────────────
const POST = W(12.08), INLAND = W(14.26), PERHAPS = W(13.32);
const senda = (x) => 128 + (x - 40) * 0.17;
const p3 = (t) => {
  capa('c3', () => {
    // la luz de la tarde entre las copas: un cielo cálido y velado arriba
    deg(0, 0, 319, 70, [H('#c8dcd8'), H('#e0e4c8'), H('#f0e2b0'), H('#e8d8a0')]);
    // tres términos de pinos con sus pisos de ramas: lejanos (azulados por la calima), medios y cercanos
    const pino = (x, base, h2, w, c, cs, tr) => { R.rect(x - 1, base - h2, x + 1, base, tr);
      for (let j = 0; j < h2 - 6; j++) { const piso = (j % 9) / 9, ww = ri(w * (1 - j / (h2 - 6)) * (0.55 + 0.45 * piso)); if (ww <= 0) continue; R.linea(x - ww, base - 8 - j, x + ww, base - 8 - j, piso < 0.25 ? cs : c); } };
    for (let y = 60; y < 118; y++) for (let x = 0; x < 320; x++) R.pset(x, y, mez(H('#c8d0b8'), H('#9aa894'), (y - 60) / 58));
    for (let k = 0; k < 30; k++) { const x = ri(k * 11 + hh(k, 1, 301) * 8), h2 = 46 + ri(hh(k, 2, 301) * 26); if (x > 262 && x < 322 && 116 - h2 < 50) continue; pino(x, 116, h2, 7, H('#8a9a88'), H('#7a8a7a'), H('#7a8678')); }
    for (let k = 0; k < 14; k++) { const x = ri(10 + k * 22 + hh(k, 3, 302) * 10), h2 = 70 + ri(hh(k, 4, 302) * 26); if (x > 250 && 120 - h2 < 52) continue; pino(x, 120, h2, 11, H('#4a6a4a'), H('#3a563c'), H('#5a4636')); }
    for (let k = 0; k < 12; k++) { const x = ri(hh(k, 6, 303) * 320), w = 3 + ri(hh(k, 7, 303) * 2); if (x > 258 && x < 322) continue;
      R.rect(x, 40, x + w, 124, H('#6a5a48')); R.linea(x, 40, x, 124, H('#8a7a62')); for (let y = 44; y < 124; y += 6) R.linea(x + 1, y + (k % 3), x + w - 1, y + (k % 3), H('#54463a')); }
    // el suelo del pinar: pinocha rojiza con tramas, piñas, helechos lejanos
    for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const q = hh(x, y, 305); R.pset(x, y, q > 0.9 ? H('#7a4a2a') : q > 0.78 ? H('#a8683a') : (x + y * 2) % 9 === 0 ? H('#b8804a') : H('#94603a')); }
    for (let y = 112; y < 118; y++) for (let x = 0; x < 320; x++) if (hh(x, y, 306) > 0.4) R.pset(x, y, H('#7a8a62'));
    // la senda de arena que sube en diagonal hacia el interior
    for (let x = 20; x < 320; x++) { const yc = senda(x), w = 5 + (x - 20) * 0.04; for (let y = ri(yc - w); y <= ri(yc + w); y++) if (y >= 112 && y < 180) R.pset(x, y, hh(x, y, 307) > 0.85 ? H('#c8a878') : H('#dcc08e')); }
    for (let k = 0; k < 30; k++) { const x = ri(hh(k, 1, 308) * 320), y = 118 + ri(hh(k, 2, 308) * 58); R.disco(x, y, 1, H('#5a3a1a')); R.pset(x, y - 1, H('#8a6030')); }
    // helechos y piedras con musgo a media distancia, a los lados de la senda
    for (let k = 0; k < 9; k++) { const x = 30 + ri(hh(k, 1, 312) * 260), y = 124 + ri(hh(k, 2, 312) * 40); if (Math.abs(y - senda(x)) < 10) continue;
      if (k % 3 === 0) { R.disco(x, y, 4, H('#5a5a54')); R.disco(x - 1, y - 1, 3, H('#7a7a70')); R.linea(x - 3, y - 3, x + 2, y - 4, H('#6a9a4a')); }
      else for (let i = -3; i <= 3; i++) { R.linea(x, y, x + i * 3, y - 7 + Math.abs(i), i % 2 ? H('#3e6a2e') : H('#5a8a3a')); R.pset(x + i * 3, y - 7 + Math.abs(i), H('#7aaa4a')); } }
    // troncos cercanos, grandes, con corteza en placas (a la izquierda y en el centro-derecha)
    for (const [x0, w] of [[0, 18], [232, 14]]) { R.rect(x0, 22, x0 + w, 176, K); R.rect(x0 + 1, 22, x0 + w - 1, 176, H('#6a4630'));
      for (let y = 24; y < 176; y += 5) for (let x = x0 + 2; x < x0 + w - 1; x += 4) { R.linea(x, y + (x % 3), x + 2, y + (x % 3), H('#4a2e1e')); R.pset(x + 1, y + 2, H('#8a6448')); }
      R.linea(x0 + 2, 22, x0 + 2, 176, H('#9a7656')); R.poligono([[x0 - 6, 176], [x0 + w + 6, 176], [x0 + w + 2, 168], [x0 - 2, 168]], H('#4a2e1e')); }
    // un tronco caído con musgo y setas, abajo a la derecha
    R.rect(250, 156, 318, 166, K); R.rect(251, 157, 318, 165, H('#6a4a30')); R.linea(251, 158, 318, 158, H('#8a6a48')); for (let x = 254; x < 318; x += 3) R.pset(x, 156, H('#5a8a3a')); R.disco(252, 161, 4, H('#b89a6a')); R.anillo(252, 161, 2, H('#8a6a48'));
    for (const x of [270, 290, 304]) { R.rect(x, 151, x + 1, 155, H('#e8dcc4')); R.rect(x - 2, 149, x + 3, 151, H('#c84a2a')); R.pset(x - 1, 149, BL); }
  });
  // los rayos de sol oblicuos entre los troncos (respiran despacio)
  for (let b = 0; b < 3; b++) { const x0 = 70 + b * 64, a = 0.12 + 0.06 * Math.sin(t * 0.9 + b * 2);
    for (let y = 20; y < 150; y += 1) { const xx = ri(x0 + (y - 20) * 0.35); for (let x = xx; x < xx + 10; x++) if ((x + y) % 2 === 0 && !tranquilo(x, y)) R.pset(x, y, mez(R.pget(x, y), H('#fff0b8'), a)); } }
  // vida: un ciervo al fondo que levanta la cabeza en «perhaps» y se va de un salto; un cardenal; agujas que caen
  const cv = tramo(t, INLAND - 0.3, P4), dx = ri(150 - cv * 70), dy = 116 - ri(Math.sin(cv * 9.4) * (cv > 0 ? 4 : 0)), alza = t > PERHAPS - 0.2;
  R.rect(dx - 6, dy - 5, dx + 6, dy, H('#9a6a3a')); R.linea(dx - 6, dy - 5, dx + 6, dy - 5, H('#b8885a')); for (const lx of [dx - 5, dx - 3, dx + 3, dx + 5]) R.linea(lx, dy, lx, dy + 6, H('#6a4428'));
  const hx = dx - 7, hy = alza ? dy - 10 : dy - 3; R.linea(dx - 5, dy - 4, hx + 1, hy + 2, H('#9a6a3a')); R.rect(hx - 2, hy, hx + 1, hy + 2, H('#9a6a3a')); R.pset(hx - 2, hy + 1, K); R.pset(hx, hy - 1, H('#5a3a20')); R.pset(hx + 1, hy - 2, H('#5a3a20')); R.pset(dx + 6, dy - 5, BL);
  const bx = ri(40 + ((t * 18) % 200)), by = ri(70 + Math.sin(t * 3) * 6); if (!tranquilo(bx, by)) { R.rect(bx, by, bx + 2, by + 1, H('#c8202a')); R.pset(bx + 3, by, H('#e8a020')); R.pset(bx - 1, by - (Math.sin(t * 20) > 0 ? 1 : 0), H('#901820')); }
  for (let k = 0; k < 8; k++) { const p = (t * 0.25 + hh(k, 1, 309)) % 1, x = ri(hh(k, 2, 309) * 300 + Math.sin(t + k) * 6), y = ri(30 + p * 130); if (!tranquilo(x, y)) R.linea(x, y, x + 1, y + 2, H('#a86a3a')); }
  // el grupo: miran atrás, a la costa («just as the post said»: la colona señala allí) y en «perhaps» echan a andar
  // senda arriba, hacia el interior
  const echa = tramo(t, PERHAPS - 0.2, P4 + 0.3), v = (t > PERHAPS - 0.2) ? (t - PERHAPS + 0.2) * 30 : 0;
  const quien = [[EL.colonoRK, 168, 'fardo'], [EL.colonaRK, 184, 'dedo'], [EL.ninoColonoRK, 200, ''], [EL.colonoRK, 214, 'hacha']];
  for (const [def, x0, que] of quien) { const x = ri(x0 - v), sx = ri(senda(x + 7));
    const a = R.actor(def, x, sx, t, { pal: que === 'hacha' ? PAL_COLONO2 : undefined, dir: echa > 0 ? -1 : 1, anda: echa > 0 && t < P4, dedo: que === 'dedo' && t > POST - 0.3 && t < PERHAPS - 0.2, sostiene: que === 'fardo' || que === 'hacha' ? [x + (echa > 0 ? -4 : 18), sx - 20] : false,
      sonrisa: que === '' && t > PERHAPS, habla: que === 'fardo' && t < POST && Math.sin(t * 9) > 0 });
    if (que === 'fardo') fardo(a.mano[0], a.mano[1] - 4);
    if (que === 'hacha') { const [ax, ay] = a.mano; R.linea(ax, ay, ax + (echa > 0 ? -2 : 2), ay - 12, H('#8a6a40')); R.rect(ax - 2, ay - 14, ax + 2, ay - 11, H('#9aa4b0')); R.pset(ax - 2, ay - 14, K); } }
  // helechos de primer término (por delante de todo), que se mecen
  for (const [x, k] of [[30, 1], [44, 2], [196, 3], [292, 4]]) for (let i = -3; i <= 3; i++) { const m = Math.sin(t * 1.8 + k + i) * 2, b = 180, h2 = 16 - Math.abs(i) * 2; R.linea(x + i * 3, b, ri(x + i * 5 + m), b - h2, i % 2 ? H('#3a6a2a') : H('#4a8a3a')); R.pset(ri(x + i * 5 + m), b - h2, H('#6aaa4a')); }
};

// ── 4 · años después: dentro de un pueblo de Croatoan con su valla (como Pomeiooc en las acuarelas de White); los niños de los dos pueblos juegan juntos ─────────────────
const CHILDREN = W(16.35), GREW = W(16.77), PART = W(17.43), TOOK = W(18.39);
const PAL_COLONA2 = { H: H('#4a3020'), h: H('#6a4830'), C: H('#3a5a8a'), c: H('#2a3e64') };
const PAL_NINO2 = { H: H('#d8b060'), h: H('#e8c880'), C: H('#a8483a'), c: H('#7a3028') };
const PAL_COLONO2 = { H: H('#8a4a2a'), h: H('#a8643a'), C: H('#5a6a4a'), c: H('#3e4a34'), o: H('#5a6a4a') };
// la valla de estacas por detrás del pueblo (un arco, como en Pomeiooc): y de la base en x
const valla = (x) => 98 - 24 * Math.sqrt(Math.max(0, 1 - ((x - 160) / 178) ** 2));
const p4 = (t) => {
  capa('c4', () => {
    // cielo de media tarde y la linde del bosque (sin tocar la esquina de Atom)
    deg(0, 0, 319, 60, [H('#6aa6dc'), H('#8cbce6'), H('#c0d8ea'), H('#ecdcb4')]);
    for (let k = 0; k < 26; k++) { const x = ri(k * 13 + hh(k, 1, 420) * 8), y = 52 + ri(hh(k, 2, 420) * 10); if (x > 258 && y < 60) continue; copa(x, y, 9 + ri(hh(k, 3, 420) * 4), H('#3e6a3a'), H('#6a9a4a'), H('#2a4a2a'), k + 420); }
    for (let y = 60; y < 80; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x, y, 421) > 0.8 ? H('#8aa04a') : H('#9ab05a'));
    // el maizal de fuera, por encima de la valla
    for (let x = 2; x < 320; x += 3) { const b = ri(valla(x)) - 6, h2 = 12 + ri(hh(x, 1, 422) * 6); R.linea(x, b, x, b - h2, H('#5a8a32')); R.linea(x, b - h2 + 4, x + 2, b - h2 + 1, H('#7aa83a')); if (x % 9 === 2) R.rect(x + 1, b - h2 + 6, x + 2, b - h2 + 9, H('#e0c040')); }
    // la plaza de tierra apisonada, con huellas y matas sueltas
    for (let x = 0; x < 320; x++) for (let y = ri(valla(x)); y < 180; y++) { const q = hh(x, y, 423); R.pset(x, y, q > 0.9 ? H('#b89a6a') : q > 0.75 ? H('#d8bc8a') : H('#ccae7c')); }
    // senderos más oscuros de cada puerta al fuego, huellas, hierba al pie de la valla y piedras
    for (const cx of [34, 96, 226, 290]) { const b = ri(valla(cx)) + 15; for (let i = 0; i <= 40; i++) { const u = i / 40, x = ri(lerp(cx, 172, u)), y = ri(lerp(b, 142, u)); for (let d = -3; d <= 3; d++) if (hh(x + d, y, 425) > 0.35) R.pset(x + d, y, H('#bc9e6c')); } }
    for (let k = 0; k < 60; k++) { const x = ri(hh(k, 1, 424) * 310) + 5, y = 104 + ri(hh(k, 2, 424) * 72); R.pset(x, y, H('#a07e50')); R.pset(x + 2, y + 1, H('#a07e50')); }
    for (let x = 0; x < 320; x += 2) { const b = ri(valla(x)); if (hh(x, 1, 426) > 0.4) { R.linea(x, b + 1, x - 1, b - 3, H('#6a8a3a')); R.pset(x + 1, b, H('#8aa84a')); } }
    for (let k = 0; k < 10; k++) { const x = 10 + ri(hh(k, 1, 427) * 300), y = 112 + ri(hh(k, 2, 427) * 60); R.disco(x, y, 2, H('#8a8478')); R.pset(x - 1, y - 1, H('#b8b0a0')); }
    // el mortero de tronco con su mano de madera (a la derecha de la plaza) y una estera con pescado secándose
    R.rect(244, 108, 254, 126, K); R.rect(245, 109, 253, 125, H('#7a5a3a')); R.linea(246, 109, 246, 125, H('#9a7a50')); R.rect(244, 108, 254, 110, H('#5a3a22'));
    estera(196, 116, 236, 128, H('#c8a86a'), H('#e0c48a'), H('#9a7e48'), 4);
    for (let i = 0; i < 6; i++) { const x = 200 + i * 6; R.poligono([[x, 122], [x + 4, 120], [x + 4, 124]], K); R.rect(x - 1, 121, x + 2, 123, H('#9aa0a8')); R.pset(x, 121, BL); }
    // calabazas y una olla junto a la casa grande; un fardo de cañas apoyado en la valla
    for (const [x, y, c] of [[120, 104, '#e0a030'], [128, 106, '#c88020'], [196, 102, '#d8a040']]) { R.disco(x, y, 4, K); R.disco(x, y, 3, H(c)); R.pset(x - 1, y - 2, H('#f8d880')); R.pset(x, y - 4, H('#4a6a2a')); }
    for (let i = 0; i < 6; i++) R.linea(60 + i * 2, ri(valla(60)) + 2, 66 + i * 2, ri(valla(60)) - 16, i % 2 ? H('#c8b070') : H('#a89050'));
    // la valla de estacas aguzadas, con luz y sombra
    for (let x = 0; x < 320; x += 5) { const b = ri(valla(x)); R.rect(x, b - 18, x + 3, b, K); R.rect(x + 1, b - 17, x + 2, b, H('#8a6a44')); R.pset(x + 1, b - 17, H('#c8a878')); R.pset(x + 1, b - 19, K); R.pset(x + 2, b - 18, H('#6a4a2a')); }
    // las casas de esteras sobre arcos, a lo largo de la valla (la grande en el centro, con su puerta)
    for (const [cx, w, ht] of [[34, 28, 22], [96, 26, 20], [160, 40, 28], [226, 26, 20], [290, 26, 20]]) { const b = ri(valla(cx)) + 14;
      for (let x = cx - w; x <= cx + w; x++) { const top = b - ht + ri(((x - cx) / w) ** 2 * ht * 0.45); for (let y = top; y <= b; y++) R.pset(x, y, x === cx - w || x === cx + w ? K : ((y - top) >> 2) % 2 ? H('#b89a6a') : H('#a8885a')); R.pset(x, top, K); R.pset(x, top + 1, H('#e0c898')); }
      for (let x = cx - w + 8; x < cx + w; x += 9) R.linea(x, b - ht + ri(((x - cx) / w) ** 2 * ht * 0.45) + 2, x, b, H('#7a6040'));
      R.rect(cx - 5, b - 12, cx + 5, b, H('#3a2c20')); R.rect(cx - 5, b - 12, cx + 5, b - 11, H('#6a5040')); R.rect(cx + 8, b - 9, cx + 18, b - 6, H('#8a7048')); R.linea(cx - w, b + 1, cx + w, b + 1, H('#8a7048')); }
    // el secadero de maíz, la estera grande con mazorcas y un cesto, conchas y la olla del fuego central
    estera(26, 150, 104, 166, H('#c8a86a'), H('#e0c48a'), H('#9a7e48'), 4);
    for (const [x, y] of [[36, 160], [44, 162], [96, 158]]) { R.rect(x - 4, y - 1, x + 4, y + 1, H('#e0c040')); R.pset(x + 5, y, H('#6a9a3a')); }
    for (const [x, y] of [[290, 162], [298, 166], [304, 160], [294, 170], [308, 168]]) { R.disco(x, y, 3, H('#7a7468')); R.disco(x, y, 2, H('#e8e0d0')); R.pset(x - 1, y - 1, BL); }
    R.poligono([[250, 168], [276, 160], [278, 172]], K); R.poligono([[252, 168], [275, 161], [276, 171]], H('#c8a050')); for (let x = 256; x < 274; x += 3) R.linea(x, 166 - ri((x - 252) * 0.25), x, 168 + ri((x - 252) * 0.1), H('#8a6a2a'));
    for (let a = 0; a < 6.28; a += 0.5) { const x = ri(172 + Math.cos(a) * 13), y = ri(142 + Math.sin(a) * 5); R.disco(x, y, 2, H('#6a6458')); R.pset(x - 1, y - 1, H('#9a9488')); }
    R.linea(166, 142, 178, 140, H('#3a2414')); R.linea(166, 140, 178, 143, H('#4a2e1a'));
  });
  // nubes que pasan y pájaros
  nubesDia(t, P4, [[10, 22, 26, 2, NUB], [120, 34, 22, 4, NUB], [200, 18, 16, 6, NUB]]);
  pajaros(t, 4, 14, 412);
  // el fuego del centro, con su humo
  for (let k = 0; k < 5; k++) { const f = Math.sin(t * 12 + k * 1.7); R.linea(168 + k * 2, 141, 168 + k * 2 + ri(f), 133 - ri(Math.abs(f) * 4) - (k === 2 ? 3 : 0), k % 2 ? H('#f8c040') : H('#f07020')); }
  for (let k = 0; k < 6; k++) { const p = (t * 0.3 + k / 6) % 1; R.disco(ri(172 + Math.sin(p * 6 + t) * 3 + p * 10), ri(128 - p * 60), 1 + ri(p * 3), mez(H('#b8b0a8'), H('#c0d8ea'), p)); }
  // una mujer machaca maíz en el mortero (la mano sube y baja) y un pavo pasea por la plaza
  { const sube = Math.abs(Math.sin(t * 4)), my2 = 96 - ri(sube * 8); const mo = R.actor(EL.croatoanaRK, 254, 128, t, { pal: { C: H('#8a6a4a'), c: H('#6a4a30') }, dir: -1, sostiene: [251, my2 + 6] });
    R.rect(mo.mano[0] - 1, mo.mano[1] - 10, mo.mano[0] + 1, mo.mano[1] + 6, K); R.linea(mo.mano[0], mo.mano[1] - 9, mo.mano[0], mo.mano[1] + 5, H('#b08a5a')); if (sube < 0.15) { R.pset(247, 106, H('#f0d060')); R.pset(252, 105, H('#f0d060')); } }
  { const tx2 = ri(lerp(150, 110, tramo(t, P4, P5))), ty2 = 124, pa = Math.floor(t * 4) % 2, pk = Math.sin(t * 3) > 0.6 ? 2 : 0;
    R.disco(tx2, ty2 - 6, 6, K); R.disco(tx2, ty2 - 6, 5, H('#5a3a28')); for (let i = 0; i < 5; i++) { R.linea(tx2 + 4, ty2 - 7, tx2 + 9 + ri(Math.cos(i * 0.5) * 3), ty2 - 15 + i * 2, K); R.linea(tx2 + 4, ty2 - 8, tx2 + 8 + ri(Math.cos(i * 0.5) * 3), ty2 - 15 + i * 2, i % 2 ? H('#b08a4a') : H('#6a4a2a')); }
    R.linea(tx2 - 4, ty2 - 8, tx2 - 6, ty2 - 13 + pk, K); R.rect(tx2 - 8, ty2 - 15 + pk, tx2 - 6, ty2 - 13 + pk, H('#8ab0d0')); R.pset(tx2 - 9, ty2 - 13 + pk, H('#d8302a')); R.pset(tx2 - 7, ty2 - 12 + pk, H('#d8302a'));
    R.linea(tx2 - 1, ty2, tx2 - 1 - pa, ty2 + 3, H('#c8902a')); R.linea(tx2 + 1, ty2, tx2 + 1 + pa, ty2 + 3, H('#c8902a')); }
  // el anciano a la puerta de la casa grande mira y se ríe con los niños
  const vb = ri(valla(160)) + 14;
  R.actor(EL.croatoanRK, 152, vb + 2, t, { dir: 1, sonrisa: t > W(16.5), habla: t > GREW && t < PART && Math.sin(t * 8) > 0 });
  // las dos mujeres en la estera desgranan maíz juntas y charlan; en «took them in» una le da la mazorca a la otra
  const da = tramo(t, TOOK - 0.3, TOOK + 0.3);
  const m1 = R.actor(EL.croatoanaRK, 42, 162, t, { dir: 1, sostiene: [62, 146], habla: t < TOOK && Math.sin(t * 7) > 0.2, sonrisa: t > TOOK });
  const m2 = R.actor(EL.colonaRK, 74, 162, t, { dir: -1, sostiene: [70, 148], habla: t < TOOK && Math.sin(t * 7 + 2) > 0.2, sonrisa: t > PART });
  const mz = da < 1 ? [lerp(m1.mano[0] + 2, m2.mano[0] - 2, da), lerp(m1.mano[1], m2.mano[1], da) - Math.sin(da * 3.14) * 5] : [m2.mano[0] - 2, m2.mano[1]];
  R.rect(ri(mz[0]) - 3, ri(mz[1]) - 1, ri(mz[0]) + 3, ri(mz[1]) + 1, H('#e0c040')); R.pset(ri(mz[0]) - 2, ri(mz[1]), H('#b8901a')); R.pset(ri(mz[0]) + 4, ri(mz[1]), H('#6a9a3a'));
  // la pelota de piel: el niño de Croatoan la lanza, el niño colono la coge de un salto en «children» y la devuelve
  const T1 = W(15.6), T2 = CHILDREN, T3 = W(17.0), T4 = W(17.7), CORRE = W(18.2);
  const corre = ease(tramo(t, CORRE, P5)), xa = ri(lerp(122, 104, corre)), xb = ri(lerp(222, 124, corre));
  const salA = t > T2 - 0.15 && t < T2 + 0.25 ? 6 : 0, salB = t > T4 - 0.15 && t < T4 + 0.25 ? 6 : 0;
  const na = R.actor(EL.ninoColonoRK, xa, 170, t, { dir: 1, salto: salA, sonrisa: true, sostiene: t > T2 && t < T3 ? [xa + 16, 152] : false, anda: corre > 0 && corre < 1 });
  const nb = R.actor(EL.ninoCroatoanRK, xb, 170, t, { dir: -1, salto: salB, sonrisa: true, sostiene: t < T1 || (t > T4 && t < CORRE) ? [xb - 2, 152] : false, anda: corre > 0 && corre < 1 });
  let bp = null; const arco = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u) - Math.sin(u * 3.14) * 30];
  if (t < T1) bp = nb.mano; else if (t < T2) bp = arco(nb.mano, [xa + 16, 152 - salA], tramo(t, T1, T2)); else if (t < T3) bp = na.mano; else if (t < T4) bp = arco(na.mano, [xb - 2, 152 - salB], tramo(t, T3, T4)); else if (t < CORRE) bp = nb.mano;
  else bp = [lerp(xb + 4, xa + 30, 0.5), 164 - Math.abs(Math.sin(t * 9)) * 8];
  if (bp) { R.disco(ri(bp[0]), ri(bp[1]), 4, K); R.disco(ri(bp[0]), ri(bp[1]), 3, H('#c8905a')); R.linea(ri(bp[0]) - 2, ri(bp[1]), ri(bp[0]) + 2, ri(bp[1]), H('#f0e0c0')); }
  // el perro del pueblo (pardo oscuro, con su contorno) corre y salta detrás de la pelota
  const px = ri(lerp(196, 214, Math.sin(t * 1.5) * 0.5 + 0.5)), py = 176 - (t > T3 && t < T4 + 0.2 ? ri(Math.abs(Math.sin((t - T3) * 6)) * 7) : 0), pa = Math.floor(t * 8) % 2;
  R.rect(px - 7, py - 7, px + 6, py, K); R.rect(px + 3, py - 12, px + 10, py - 5, K);
  R.rect(px - 6, py - 6, px + 5, py - 2, H('#6a4a30')); R.rect(px + 4, py - 11, px + 9, py - 6, H('#6a4a30')); R.rect(px - 6, py - 6, px + 5, py - 6, H('#8a6a48')); R.pset(px + 8, py - 9, K); R.rect(px + 9, py - 7, px + 10, py - 6, H('#2a1a10')); R.rect(px + 3, py - 13, px + 4, py - 11, H('#4a3020'));
  R.linea(px - 7, py - 6, px - 10, py - 10 + ri(Math.sin(t * 14) * 2), K);
  for (const [lx, f] of [[px - 5, pa], [px - 2, 1 - pa], [px + 2, pa], [px + 4, 1 - pa]]) R.linea(lx, py - 2, lx + (f ? 1 : -1), py + 1, K);
  // matas de primer término
  for (const [x, k] of [[8, 1], [312, 2], [236, 3]]) mata(x, 180, 10, t, H('#4a7a32'), H('#7aa04a'), k);
};

// ── 5 · el roble de la duna, de tarde: un colono talla «CRO» antes de irse (el mensaje claro) ────────────────────────
const NEVER = W(20.83), LOST = W(21.31), CLEAR = W(22.68), MESSAGE = W(22.9), OWN = W(23.7);
const p5 = (t) => {
  const talla = ease(tramo(t, W(20.0), MESSAGE + 0.2));
  const o = { encuadre: 'poste', camara: 'arbol', epoca: 1590, luz: 'tarde', talla };
  const g = T.roanoke(R, t, o);
  // dos cofres apilados al pie del roble, para llegar a la talla
  for (const [x0, y0, y1] of [[172, 148, 162], [175, 137, 148]]) { R.rect(x0, y0, x0 + 26, y1, K); R.rect(x0 + 1, y0 + 1, x0 + 25, y1 - 1, H('#7a5232')); R.linea(x0 + 1, y0 + 1, x0 + 25, y0 + 1, H('#a07448')); R.rect(x0 + 1, ri((y0 + y1) / 2), x0 + 25, ri((y0 + y1) / 2), H('#4a3020')); R.rect(x0 + 11, y0 + 3, x0 + 14, y0 + 6, H('#c8a040')); }
  const tall = t > W(20.0) && t < MESSAGE + 0.2, ty = 108 + ri(talla * 16);
  const c = R.actor(EL.colonoRK, 180, 137, t, { dir: t > OWN ? -1 : 1, sostiene: t < OWN ? [203, tall ? ty + ri(Math.sin(t * 22) * 1.5) : 124] : false, sonrisa: t > MESSAGE, brazos: t > OWN + 0.3 && Math.sin(t * 8) > 0 });
  if (t < OWN) navajita(c.mano[0], c.mano[1], 1);
  if (tall) for (let k = 0; k < 4; k++) { const p = (t * 2.4 + k / 4) % 1; R.pset(ri(c.mano[0] + 6 + Math.sin(k) * 2), ri(c.mano[1] + p * (g.suelo - c.mano[1] - 6)), H('#e8d0a0')); }
  // la colona y su niño esperan con el hatillo; en «never really lost» ella sonríe y el niño salta; en «their own people»
  // ella llama al colono con la mano y echan a andar hacia la izquierda
  const vamos = tramo(t, OWN, P6 + 0.3), xc = ri(lerp(104, 74, vamos));
  const cl = R.actor(EL.colonaRK, xc, g.suelo, t, { dir: t > OWN ? -1 : 1, sonrisa: t > NEVER, sostiene: [xc + (t > OWN ? -2 : 16), g.suelo - 14], anda: vamos > 0 && vamos < 1, dedo: false });
  fardo(cl.mano[0], cl.mano[1] - 2);
  R.actor(EL.ninoColonoRK, xc - 18, g.suelo + 1, t, { dir: t > OWN ? -1 : 1, salto: t > LOST && t < LOST + 0.35 ? 5 : 0, sonrisa: t > NEVER, anda: vamos > 0 && vamos < 1, brazos: t > LOST + 0.35 && t < CLEAR });
  // el brillo de la talla terminada en «clear message»
  if (t > CLEAR && t < CLEAR + 0.8) { const u = (t - CLEAR) / 0.8, [x0, y0, x1, y1] = g.talla; for (let k = 0; k < 4; k++) destello(lerp(x0, x1, (k + 0.5) / 4), lerp(y0, y1, 0.5) - 2 + ri(Math.sin(k * 2) * 6), H('#fff4c0'), ri(1 + u * 2)); }
  T.roanokeDelante(R, t, o);
};

// ── 6 · al anochecer, desde el agua: la isla con su fuego y el barco de White que se aleja y no vuelve ───────────────
const ONE = W(25.0), NEVER2 = W(27.2), BACK = W(28.62);
const p6 = (t) => {
  capa('c6', () => {
    deg(0, 0, 319, 96, [H('#2a2a5a'), H('#4a3a72'), H('#8a4a7a'), H('#d06a6a'), H('#f0a060')]);
    for (let k = 0; k < 40; k++) { const x = ri(hh(k, 1, 601) * 320), y = ri(hh(k, 2, 601) * 40); if (!tranquilo(x, y)) R.pset(x, y, k % 4 ? H('#b8b8d8') : BL); }
    // jirones de nube encendidos, en tres tonos
    for (const [x0, y0, w] of [[20, 58, 70], [120, 70, 90], [200, 52, 50]]) for (let i = 0; i < w; i++) { const x = x0 + i, y = y0 + ri(Math.sin(i * 0.15) * 2); if (tranquilo(x, y)) continue; R.pset(x, y, H('#5a3a6a')); R.pset(x, y - 1, H('#e08a7a')); if (i % 3) R.pset(x, y - 2, H('#f8c0a0')); }
    // el mar: el reflejo del ocaso en una columna, ondas tramadas que oscurecen hacia delante
    for (let y = 96; y < 180; y++) { const f = (y - 96) / 84; for (let x = 0; x < 320; x++) { const col = Math.abs(x - 236) < 14 + f * 30, w2 = Math.sin(x * 0.2 + y * 1.3) > 0.7;
      R.pset(x, y, col && w2 ? H('#f0a060') : w2 ? mez(H('#6a5a8a'), H('#2a3a5a'), f) : mez(H('#4a4a7a'), H('#1a2a48'), f)); } }
    R.linea(0, 96, 319, 96, H('#f8c080'));
    for (let k = 0; k < 70; k++) { const x = ri(hh(k, 1, 602) * 320), y = 104 + ri(hh(k, 2, 602) * 74), w = 3 + ri((y - 100) / 12); R.linea(x, y, x + w, y, (y > 140 ? H('#4a5a8a') : H('#7a6a9a'))); R.pset(x + 1, y - 1, H('#9a8ab8')); }
    // la isla baja a la izquierda, con su pinar en silueta y la playa
    R.poligono([[0, 97], [0, 84], [20, 80], [60, 78], [110, 82], [140, 90], [150, 97]], H('#2a2238'));
    for (let k = 0; k < 18; k++) { const x = 6 + k * 7, b = 82 + ri(Math.abs(x - 60) * 0.07); for (let j = 0; j < 9; j++) R.linea(x - ri((9 - j) * 0.4), b - j, x + ri((9 - j) * 0.4), b - j, H('#1e1a2a')); }
    R.linea(0, 97, 150, 97, H('#a07a6a'));
  });
  // el fuego en la isla (allí estaban) con su reflejo y su humo
  const fl = Math.sin(t * 13) > 0; R.disco(74, 93, 2, fl ? H('#ffd060') : H('#f08030')); R.pset(74, 91, H('#fff0a0')); for (let k = 0; k < 3; k++) R.pset(74 + ri(Math.sin(t * 5 + k)), 99 + k * 3, H('#f0a040'));
  for (let k = 0; k < 5; k++) { const p = (t * 0.25 + k / 5) % 1; R.pset(ri(74 + p * 10 + Math.sin(p * 6 + t) * 2), ri(89 - p * 26), mez(H('#8a7a8a'), H('#5a4a7a'), p)); }
  // el barco de White se aleja hacia la derecha, hacia la tormenta; ya lejos en «never managed», un relámpago
  const u = tramo(t, P6, P7 + 0.2), bx = lerp(150, 252, u), by = lerp(112, 100, u);
  if (t > NEVER2 + 0.3 && t < NEVER2 + 0.5) { R.linea(298, 60, 290, 76, H('#fff8d0')); R.linea(290, 76, 296, 80, H('#fff8d0')); R.linea(296, 80, 288, 96, H('#fff8d0')); }
  for (const [x0, y0, w] of [[300, 72, 34], [272, 80, 26], [318, 86, 30]]) nube3(ri(x0 - (t - P6) * 1.5), y0, w, [H('#1e1a34'), H('#2e2a4a'), H('#4a4266')]);
  for (let k = 0; k < 14; k++) { const x = 262 + ri(hh(k, 1, 611) * 56), y = 92 + ((ri(t * 40) + k * 7) % 6); R.pset(x - ri((y - 92) * 0.3), y, H('#6a6a9a')); }
  pinaza(t, bx, by + ri(Math.sin(t * 2) * 1), 1);
  for (let i = 0; i < 12; i++) R.pset(ri(bx - 26 - i * 3), ri(by + 1 + Math.sin(i + t * 3)), H('#b8a8c8'));
  // aves que vuelven a la isla, peces que saltan
  pajaros(t, 3, 60, 620, H('#1a1428'));
  const jx = 200, jp = ((t - P6) * 0.7) % 1; if (jp < 0.3) { const a = jp / 0.3; R.rect(ri(jx + a * 10), ri(140 - Math.sin(a * 3.14) * 8), ri(jx + a * 10) + 2, ri(140 - Math.sin(a * 3.14) * 8) + 1, H('#c8c8d8')); }
  // la canoa en primer término con Manteo y la colona: ella señala el barco («the one person»); en «never managed» baja
  // el brazo, triste; en «come back» Manteo se vuelve hacia ella
  const cb = ri(Math.sin(t * 1.8) * 1.5);
  R.actor(EL.manteoRK, 60, 156 + cb, t, { dir: t > BACK - 0.3 ? 1 : 1, sostiene: [82, 140 + cb], sonrisa: t > BACK - 0.2, habla: t > BACK - 0.3 && Math.sin(t * 9) > 0 });
  R.linea(82, 128 + cb, 78, 150 + cb, K); R.linea(83, 128 + cb, 79, 150 + cb, H('#8a6a40'));
  R.actor(EL.colonaRK, 92, 156 + cb, t, { dir: t > BACK - 0.3 ? -1 : 1, dedo: t > ONE - 0.2 && t < NEVER2, triste: t > NEVER2 });
  // el costado de la canoa por delante (de un tronco, con la luz del ocaso en el borde)
  R.poligono([[30, 150 + cb], [134, 150 + cb], [128, 162 + cb], [38, 162 + cb]], K); R.poligono([[32, 151 + cb], [132, 151 + cb], [126, 161 + cb], [40, 161 + cb]], H('#4a2e1e'));
  R.linea(32, 151 + cb, 132, 151 + cb, H('#c8805a')); for (let x = 44; x < 124; x += 9) R.pset(x, 156 + cb, H('#2a1a10'));
  for (let x = 26; x < 140; x += 2) R.pset(x, 163 + cb + ri(Math.sin(x * 0.3 + t * 3)), H('#8a7aa8'));
};

// ── 7 · el corcho de Atom de cerca: la nota de la taza se da la vuelta y es una flecha a la isla ───────────────────────
const ANYTHING = W(31.62), ANSWER = W(32.46), WRITTEN = W(33.01), DOWN = W(33.22);
const NC = [146, 88];
// la nota grande (88×80) dibujada con sx = escala horizontal (1: de frente; 0: de canto; el signo da la cara)
const notaGrande = (t, sx, tipo) => { const [cx, cy] = NC, ax = Math.abs(sx), X = (lx) => ri(cx + lx * ax), Y = (ly) => ri(cy + ly);
  const lev = Math.max(0, Math.sin(t * 3.1) * 2);
  R.rect(X(-44) + 3, Y(-40) + 3, X(44) + 3, Y(40) + 3, H('#8a5a34'));
  R.rect(X(-44), Y(-40), X(44), Y(40), H('#f4dc6a')); R.rect(X(-44), Y(-40), X(44), Y(-37), H('#fae890'));
  if (ax > 0.2) { R.rect(X(42), Y(-36), X(44), Y(40), H('#d8bc4a')); for (let i = 0; i < 6 + lev; i++) R.linea(X(44) - i, Y(40), X(44), Y(40) - i, H('#fae890')); }
  if (ax < 0.15) return;
  const L = (a, b, c2, d, col, gr = 2) => { for (let k = 0; k < gr; k++) R.linea(X(a), Y(b) + k, X(c2), Y(d) + k, col); };
  const LAP = H('#4a4a5a'), ROJO = H('#c8303a');
  if (tipo === 'taza') {
    // la taza a lápiz (con plato y vapor) y la flecha en bucle que no va a ninguna parte
    L(-28, 0, 4, 0, LAP); L(-28, 0, -24, 24, LAP); L(4, 0, 0, 24, LAP); L(-24, 24, 0, 24, LAP); L(-36, 32, 12, 32, LAP);
    for (let a = 0; a < 6.28; a += 0.2) R.pset(X(12 + Math.cos(a) * 7), Y(12 + Math.sin(a) * 7), LAP);
    for (const sx2 of [-16, -6]) for (let j = 0; j < 14; j++) R.pset(X(sx2 + Math.sin(j * 0.6 + t * 3) * 2), Y(-6 - j), LAP);
    let px = null, py = null; for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2.2, x = 24 + Math.cos(a) * 12 - i * 0.2, y = -4 - Math.sin(a) * 12 - i * 0.5; if (px !== null) L(px, py, x, y, ROJO); px = x; py = y; }
    L(px, py, px - 4, py + 5, ROJO); L(px, py, px + 4, py + 5, ROJO);
  } else {
    // la isla con su árbol y el mar, y la flecha roja gorda que va derecha a ella
    for (let i = -24; i <= 24; i++) for (let j = 0; j <= 10; j++) if ((i / 25) ** 2 + (j / 10.5) ** 2 < 1) R.pset(X(12 + i), Y(20 + j), j < 2 ? H('#b8904a') : H('#e8c878'));
    L(-20, 32, 40, 32, H('#3a7ac8'), 2); L(-14, 36, 30, 36, H('#3a7ac8'), 1);
    L(16, 20, 16, -2, H('#6a4a2a'), 2); for (const [a, b, c2, d] of [[4, -2, 28, -2], [6, -6, 26, -6], [10, -10, 22, -10], [14, -13, 18, -13]]) L(a, b, c2, d, H('#3a8a3a'), 2);
    L(-36, -24, -8, -10, ROJO, 4); L(-8, -10, -16, -10, ROJO, 3); L(-8, -10, -12, -18, ROJO, 3);
  }
};
const p7 = (t) => {
  capa('c7', () => {
    // la pared ocre del estudio con su flor de lis menuda (lisa tras Atom)
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, !tranquilo(x, y) && (x % 14 === 7) && (y % 16 === ((x / 14) & 1) * 8 + 4) ? H('#c8a868') : H('#dcc088'));
    // el marco de roble del corcho y el corcho con su grano de tres tonos
    R.rect(6, 22, 266, 150, K); R.rect(7, 23, 265, 149, H('#8a5a34')); R.rect(8, 24, 264, 25, H('#b07a48'));
    for (let y = 30; y < 144; y++) for (let x = 13; x < 260; x++) { const q = hh(x, y, 701); R.pset(x, y, q > 0.9 ? H('#a87a4a') : q > 0.8 ? H('#e0b888') : q < 0.05 ? H('#8a6038') : H('#c89a6a')); }
    R.rect(13, 30, 259, 30, H('#6a4428')); R.rect(13, 30, 13, 143, H('#6a4428'));
    // las otras notas: un barco, unos anillos, un imán y un «?»; una foto de la playa; un trozo de mapa
    const nota = (x0, y0, c, dib) => { R.rect(x0 + 2, y0 + 2, x0 + 32, y0 + 28, H('#8a5a34')); R.rect(x0, y0, x0 + 30, y0 + 26, c); R.rect(x0, y0, x0 + 30, y0 + 1, mez(c, BL, 0.4)); dib(x0 + 15, y0 + 14); R.disco(x0 + 15, y0 + 2, 2, H('#3a6ac8')); };
    nota(22, 38, H('#f4dc6a'), (x, y) => { R.linea(x - 9, y + 4, x + 9, y + 4, H('#4a4a5a')); R.linea(x - 7, y + 7, x + 7, y + 7, H('#4a4a5a')); R.linea(x - 9, y + 4, x - 7, y + 7, H('#4a4a5a')); R.linea(x + 9, y + 4, x + 7, y + 7, H('#4a4a5a')); R.linea(x, y + 4, x, y - 8, H('#4a4a5a')); R.linea(x + 1, y - 7, x + 7, y + 2, H('#4a4a5a')); R.linea(x + 1, y + 2, x + 7, y + 2, H('#4a4a5a')); });
    nota(24, 104, H('#f4dc6a'), (x, y) => { for (const r of [3, 6, 9]) R.anillo(x, y, r, r === 6 ? H('#c8303a') : H('#4a4a5a')); });
    nota(222, 36, H('#a8d8a8'), (x, y) => { for (let a = 0; a <= 3.14; a += 0.1) { R.pset(ri(x + Math.cos(a) * 7), ri(y - 2 - Math.sin(a) * 7), H('#c8303a')); R.pset(ri(x + Math.cos(a) * 5), ri(y - 2 - Math.sin(a) * 5), H('#c8303a')); } R.rect(x - 7, y - 2, x - 5, y + 6, H('#c8303a')); R.rect(x + 5, y - 2, x + 7, y + 6, H('#c8303a')); R.rect(x - 7, y + 5, x - 5, y + 7, H('#8a8a9a')); R.rect(x + 5, y + 5, x + 7, y + 7, H('#8a8a9a')); });
    nota(222, 106, H('#f8b8c8'), (x, y) => R.icono('?', x - 4, y - 7, H('#4a4a5a'), null, 2));
    R.rect(60, 120, 92, 142, BL); R.rect(62, 122, 90, 136, H('#8ac0e0')); R.rect(62, 131, 90, 136, H('#e8d4a0')); R.linea(62, 130, 90, 130, BL); R.disco(84, 126, 2, H('#f8e080'));
    R.poligono([[196, 120], [218, 116], [222, 140], [198, 142]], H('#e8dcb8')); R.linea(200, 126, 216, 124, H('#7aa8c8')); R.linea(204, 134, 214, 128, H('#a8885a'));
    // la mesa de debajo: tablero de nogal con la taza DE VERDAD (humea), lápices y el taco de notas
    for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + y * 0.9 + Math.sin(x * 0.13) * 0.8); R.pset(x, y, y === 152 ? H('#b07a48') : v > 0.9 ? H('#5a3a22') : H('#7a5232')); }
    R.rect(0, 151, 319, 151, K);
    R.rect(40, 160, 62, 172, K); R.rect(41, 161, 61, 171, H('#f4dc6a')); R.rect(41, 161, 61, 162, H('#fae890'));
    R.linea(80, 168, 118, 162, K); R.linea(80, 167, 116, 161, H('#e8b030')); R.pset(118, 162, H('#3a3a3a'));
    R.linea(124, 172, 156, 170, K); R.linea(124, 171, 154, 169, H('#c8303a'));
    // una planta en su maceta a la derecha
    R.rect(284, 146, 306, 170, K); R.rect(285, 147, 305, 169, H('#b85a3a')); R.rect(285, 147, 305, 150, H('#d87a5a'));
  });
  // la luz de la ventana que se mueve por la pared y las hojas de la planta que se mecen
  for (let y = 60; y < 150; y += 2) for (let x = 270; x < 282 + ri(Math.sin(t * 0.5) * 3); x++) if (!tranquilo(x, y)) R.pset(x, y, mez(R.pget(x, y), H('#fff4d0'), 0.35));
  for (let k = 0; k < 6; k++) { const a = -1.2 + k * 0.45 + Math.sin(t * 1.6 + k) * 0.08; R.linea(295, 146, ri(295 + Math.cos(a - 1.57) * 22), ri(146 + Math.sin(a - 1.57) * 22), k % 2 ? H('#4a8a3a') : H('#3a6a2a')); }
  // la lana roja que une las chinchetas, con su comba que se mece
  for (const [x0, y0] of [[37, 40], [39, 106], [237, 38], [237, 108]]) { const x1 = NC[0], y1 = NC[1] - 38; let qx = x0, qy = y0; for (let i = 1; i <= 16; i++) { const u = i / 16, nx = ri(lerp(x0, x1, u)), ny = ri(lerp(y0, y1, u) + Math.sin(u * 3.14) * (8 + Math.sin(t * 1.3 + x0) * 2)); R.linea(qx, qy, nx, ny, H('#c8303a')); R.linea(qx, qy + 1, nx, ny + 1, H('#8a1e24')); qx = nx; qy = ny; } }
  // el vapor de la taza de verdad (el gag: era café)
  R.rect(226, 156, 244, 174, K); R.rect(227, 157, 243, 173, BL); R.rect(227, 157, 243, 158, H('#e8e4dc')); R.anillo(247, 165, 4, K); R.rect(229, 159, 241, 160, H('#5a3a22'));
  for (const sx2 of [231, 238]) for (let j = 0; j < 10; j++) R.pset(ri(sx2 + Math.sin(j * 0.7 + t * 4) * 1.5), 154 - j * 2, mez(H('#f0f0f0'), H('#dcc088'), j / 10));
  // la nota: de frente (la taza), el guante la coge por el borde y la da la vuelta en «answer»; detrás, la flecha a la isla
  const vu = tramo(t, ANSWER - 0.15, WRITTEN - 0.1), sx = Math.cos(vu * Math.PI);
  notaGrande(t, sx, sx >= 0 ? 'taza' : 'flecha');
  const pin = t > DOWN ? 1 : 0; R.disco(NC[0], NC[1] - 38, 3, K); R.disco(NC[0], NC[1] - 38, 2, H('#c8303a')); R.pset(NC[0] - 1, NC[1] - 39, BL);
  const borde = [NC[0] + 44 * sx + (sx >= 0 ? 4 : -4), NC[1] + 10];
  const K7 = [[P7, 336, 120, -1], [W(30.5), 336, 120, -1], [ANYTHING - 0.2, 196, 100, -1], [ANSWER - 0.15, 196, 98, -1]];
  let [gx, gy, gd] = ruta(t, K7);
  if (t > ANSWER - 0.15 && t < WRITTEN) { gx = borde[0] + 6; gy = borde[1]; gd = sx >= 0 ? -1 : 1; }
  else if (t >= WRITTEN) { const u2 = tramo(t, WRITTEN, DOWN), u3 = tramo(t, DOWN + 0.3, P8); gx = lerp(lerp(borde[0], NC[0] + 8, u2), 300, u3); gy = lerp(lerp(borde[1], NC[1] - 38, u2), 150, u3) + (t > DOWN && t < DOWN + 0.3 ? 2 : 0); gd = -1; }
  if (t > DOWN && t < DOWN + 0.6) destello(NC[0] - 20, NC[1] - 14, H('#fff8c0'), 1 + ri(tramo(t, DOWN, DOWN + 0.3) * 3));
  guante(gx, gy, gd);
};

// ── 8 · las tres pistas en fila sobre el fieltro: el poste tallado, los anillos y las escamas en el imán ────────────────
const POSTE = W(36.51), RINGS = W(37.34), IRON = W(38.51), LINEA = W(38.98);
const p8 = (t) => {
  capa('c8', () => {
    // el banco del laboratorio desde arriba: la plancha de corte gris azulada con su cuadrícula (lisa bajo el año y Atom)
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const lin = !tranquilo(x, y) && (x % 16 === 0 || y % 16 === 0), q = hh(x, y, 803);
      R.pset(x, y, lin ? H('#5a7a86') : q > 0.93 ? H('#6a8a96') : H('#4a6a76')); }
    for (let x = 0; x < 320; x += 4) if (!tranquilo(x, 64)) R.pset(x, 64, H('#8aaab4'));
    R.rect(16, 70, 304, 166, K); R.rect(17, 71, 303, 165, H('#2e6a4a'));
    for (let y = 72; y < 165; y++) for (let x = 18; x < 303; x++) if (hh(x, y, 801) > 0.86) R.pset(x, y, H('#3a7a56'));
    for (let x = 22; x < 300; x += 4) { R.pset(x, 75, H('#8ab89a')); R.pset(x, 161, H('#8ab89a')); } for (let y = 76; y < 161; y += 4) { R.pset(21, y, H('#8ab89a')); R.pset(299, y, H('#8ab89a')); }
    // arriba: bolsitas de muestras numeradas con su cierre rojo, unas pinzas, una regla con marcas y un pincel
    for (const [x, n] of [[40, '1'], [78, '2'], [116, '3']]) { R.rect(x, 30, x + 28, 60, K); R.rect(x + 1, 31, x + 27, 59, H('#e8eef0')); R.rect(x + 1, 31, x + 27, 34, H('#c8303a')); R.linea(x + 3, 36, x + 3, 57, BL); R.numero(n, x + 14, 54, { centro: true, color: H('#3a3a44') }); }
    R.linea(160, 58, 200, 34, K); R.linea(161, 58, 201, 34, H('#c8ccd4')); R.linea(162, 59, 204, 38, K); R.linea(163, 59, 205, 38, H('#a8acb4'));
    R.rect(214, 52, 266, 60, K); R.rect(215, 53, 265, 59, H('#e8d070')); for (let x = 217; x < 265; x += 3) R.linea(x, 53, x, x % 15 === 2 ? 57 : 55, H('#5a4a2a'));
    R.linea(216, 40, 250, 46, K); R.linea(216, 39, 244, 44, H('#c89a5a')); R.rect(244, 43, 252, 47, H('#3a3a3a'));
    // 1 · el trozo de poste con «CRO» tallado
    R.rect(34, 96, 108, 140, K); R.rect(35, 97, 107, 139, H('#b08a5a'));
    for (let y = 98; y < 139; y++) for (let x = 36; x < 107; x++) { const v = Math.sin(x * 0.4 + Math.sin(y * 0.2) * 2); if (v > 0.85) R.pset(x, y, H('#9a7448')); else if (v < -0.9) R.pset(x, y, H('#c8a070')); }
    R.rect(35, 135, 107, 139, H('#6a4a2a')); R.rect(35, 97, 38, 139, H('#5a3a22')); for (let y = 99; y < 139; y += 3) R.pset(36, y, H('#8a6a44'));
    const letra = (x0, y0, filas) => { for (let j = 0; j < filas.length; j++) for (let i = 0; i < filas[j].length; i++) if (filas[j][i] === '#') { R.rect(x0 + i * 3, y0 + j * 3, x0 + i * 3 + 2, y0 + j * 3 + 2, H('#4a2e18')); R.pset(x0 + i * 3, y0 + j * 3, H('#2a1a0c')); R.pset(x0 + i * 3 + 2, y0 + j * 3 + 2, H('#d8b080')); } };
    letra(44, 106, ['.###', '#...', '#...', '#...', '#...', '#...', '.###']);
    letra(60, 106, ['###.', '#..#', '#..#', '###.', '#.#.', '#..#', '#..#']);
    letra(78, 106, ['.##.', '#..#', '#..#', '#..#', '#..#', '#..#', '.##.']);
    // 2 · el corte de tronco: corteza, albura y anillos, con los tres finísimos
    R.disco(164, 116, 32, K); R.disco(164, 116, 31, H('#5a3a22')); R.disco(164, 116, 28, H('#e0b880'));
    for (let r = 3; r < 28; r += 3) R.anillo(164, 116, r, r === 18 ? H('#a07040') : H('#c89a62'));
    for (const r of [19, 20, 21]) R.anillo(164, 116, r, H('#8a5a30'));
    R.linea(164, 116, 186, 100, H('#7a4a28')); R.disco(164, 116, 2, H('#8a5a30'));
    // 3 · el imán de herradura con la barba de escamas de hierro en los polos
    for (let a = 0; a <= 3.15; a += 0.04) for (let r = 10; r <= 19; r++) R.pset(ri(252 + Math.cos(a) * r), ri(110 - Math.sin(a) * r), r === 10 || r === 19 ? K : r < 13 ? H('#e86a6a') : H('#c8303a'));
    for (const x0 of [233, 262]) { R.rect(x0, 110, x0 + 9, 126, K); R.rect(x0 + 1, 110, x0 + 8, 118, H('#c8303a')); R.rect(x0 + 1, 119, x0 + 8, 125, H('#b8c0c8')); R.linea(x0 + 1, 119, x0 + 8, 119, BL); }
    for (let k = 0; k < 90; k++) { const x = 231 + ri(hh(k, 1, 802) * 42), y = 126 + ri(hh(k, 2, 802) * 10 * (1 - Math.abs((x % 29) - 5) / 20)); if (x > 243 && x < 261) continue; R.rect(x, y, x + 1, y + 1, k % 3 ? H('#3a3a44') : H('#9a9aa8')); R.pset(x + 1, y, H('#c8c8d4')); }
    // los números de las tres fichas
    for (const [n, x] of [['1', 70], ['2', 164], ['3', 252]]) { R.rect(x - 7, 146, x + 7, 158, K); R.rect(x - 6, 147, x + 6, 157, H('#f2ecdc')); R.numero(n, x, 156, { centro: true, color: H('#3a3a44') }); }
  });
  // la luz de la lámpara de lupa que barre despacio el tapete
  { const lx = ri(160 + Math.sin(t * 0.6) * 40); for (let y = 72; y < 165; y += 2) for (let x = lx - 30; x < lx + 30; x += 2) if (Math.hypot(x - lx, (y - 118) * 1.4) < 30) R.pset(x + (y & 2 ? 1 : 0), y, mez(R.pget(x, y), H('#fff8d8'), 0.12)); }
  // la lupa: el guante la pasea por encima de las tres pistas («a language we've forgotten how to read»), con un «?»
  const K8 = [[P8, 330, 170, -1], [W(34.4), 100, 124, -1], [W(35.2), 186, 120, -1], [W(35.9), 270, 120, -1], [POSTE - 0.2, 104, 134, -1], [RINGS - 0.2, 200, 134, -1], [IRON - 0.2, 286, 134, -1], [LINEA + 0.3, 290, 160, -1], [P9, 336, 176, -1]];
  const [gx, gy] = ruta(t, K8), lupa = t < POSTE - 0.3;
  if (lupa) { const lx = ri(gx - 26), ly = ri(gy - 10); R.disco(lx, ly, 15, K); R.disco(lx, ly, 13, H('#c8a040')); R.disco(lx, ly, 11, H('#bcd8e8')); R.pset(lx - 5, ly - 6, BL); R.linea(lx - 6, ly - 4, lx - 3, ly - 7, BL); R.linea(lx + 12, ly + 6, gx - 4, gy, K); R.linea(lx + 12, ly + 5, gx - 4, gy - 1, H('#6a4a2a')); }
  if (t > W(34.4) && t < POSTE - 0.3) preg(gx - 34, gy - 50);
  // en cada palabra, su pista se enciende: «a post» (las letras), «tree rings» (los tres anillos finos), «iron» (escamas)
  const brilla = (t0) => t > t0 ? 0.5 + 0.5 * Math.sin((t - t0) * 7) : 0;
  const b1 = brilla(POSTE), b2 = brilla(RINGS), b3 = brilla(IRON);
  if (b1) { R.rect(33, 95, 109, 95, mez(H('#fff0a0'), H('#2e6a4a'), 1 - b1)); R.rect(33, 141, 109, 141, mez(H('#fff0a0'), H('#2e6a4a'), 1 - b1)); destello(92, 102, H('#fff4c0'), 2); }
  if (b2) for (const r of [19, 20, 21]) R.anillo(164, 116, r, mez(H('#8a5a30'), H('#ff5040'), 0.5 + 0.5 * b2));
  if (b3) for (let k = 0; k < 4; k++) destello(234 + k * 12 + (k > 1 ? 6 : 0), 128 + (k % 2) * 3, H('#ffffff'), ri(1 + b3 * 2));
  // en «iron» una escama salta de la mesa al imán
  const sj = tramo(t, IRON, IRON + 0.35); if (sj > 0 && sj < 1) R.rect(ri(lerp(276, 266, sj)), ri(lerp(140, 127, sj) - Math.sin(sj * 3.14) * 6), ri(lerp(276, 266, sj)) + 1, ri(lerp(140, 127, sj) - Math.sin(sj * 3.14) * 6) + 1, H('#5a5a64'));
  // el hilo de puntos rojos que las une, en el orden de la voz
  const lu = tramo(t, LINEA, P9 - 0.1); if (lu > 0) { const pts = [[108, 118], [132, 116], [196, 116], [232, 116]]; for (let s = 0; s < 3; s++) { const a = pts[s], b = pts[s + 1], fin = Math.min(1, lu * 3 - s); for (let i = 0; i <= 24 * fin; i += 3) R.disco(ri(lerp(a[0], b[0], i / 24)), ri(lerp(a[1], b[1], i / 24) - Math.sin(i / 24 * 3.14) * 6), 1, H('#e83a3a')); } }
  guante(gx, gy, -1);
};

// ── 9 · la criba de Hatteras, luz de tarde: paciencia, y un buen imán ──────────────────────────────────────────────
const UNDERSTAND = W(39.98), PATIENCE = W(41.14), MAGNET = W(42.2), FIN = en('final', 1);
const p9 = (t) => {
  const remueve = t > UNDERSTAND - 0.1 && t < MAGNET - 0.5 ? Math.abs(Math.sin((t - UNDERSTAND) * 5)) * 0.08 : 0;
  const iman = (1 - ease(tramo(t, MAGNET - 0.45, MAGNET + 0.05))) - remueve;
  const o = { encuadre: 'excavacion', camara: 'criba', iman, escamas: 0.15 + 0.85 * ease(tramo(t, W(39.9), MAGNET - 0.5)), gag: 0 };
  const g = T.hatteras(R, t, o);
  // la luz cálida de la tarde sobre la criba
  T.tinte(R, 0, 179, [255, 176, 96], 0.13);
  T.brazo(R, ...g.brazo, ...g.iman, '#b49a6a', -1);
  // al subir, la barba de escamas destella
  if (t > MAGNET && t < MAGNET + 0.7) { const d = (t - MAGNET) / 0.7; for (const [px, py] of g.polos) for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283, r = 4 + d * 14; R.pset(ri(px + Math.cos(a) * r), ri(py + 6 + Math.sin(a) * r), d < 0.5 ? BL : H('#ffe0a0')); } }
  if (t > MAGNET + 0.4) for (let k = 0; k < 3; k++) if (Math.sin(t * 5 + k * 2) > 0.6) destello(g.polos[k % 2][0] + (k - 1) * 3, g.polos[k % 2][1] + 6 + k * 2, H('#ffffff'), 1);
  // una mariquita cruza el marco despacio («patience»)
  const mx = ri(lerp(40, 180, tramo(t, P9, FIN + 1.5))), my = 152 + ri(Math.sin(t * 2) * 1); R.disco(mx, my, 2, K); R.disco(mx, my, 1, H('#d8302a')); R.pset(mx + 2, my, K);
  // al final, una mariposa entra y se posa en el lomo del imán
  const mu = tramo(t, MAGNET + 0.3, FIN + 0.5), top = g.iman[1] - 12;
  if (mu > 0) { const bx = ri(lerp(150, 262, mu) + (mu < 1 ? Math.sin(t * 6) * 6 : 0)), by = ri(lerp(30, top - 4, mu) + (mu < 1 ? Math.cos(t * 5) * 5 : 0)), al = mu < 1 ? Math.sin(t * 30) > 0 : Math.sin(t * 3) > 0.7;
    R.linea(bx, by, bx, by + 3, K); for (const s of [-1, 1]) { R.rect(Math.min(bx + s, bx + s * (al ? 3 : 4)), by - (al ? 3 : 1), Math.max(bx + s, bx + s * (al ? 3 : 4)), by + 1, H('#f0a030')); R.pset(bx + s * 2, by - 1, K); } }
  T.hatterasDelante(R, t, o);
};

const año = (t) => t < P2 ? 2026 : t < P4 ? 1588 : t < P5 ? 1610 : t < P6 ? 1588 : t < P7 ? 1590 : 2026;
const efectos = [[ROANOKE, 'pop'], [W(4.6), 'whoosh'], [DROUGHT, 'papel'], [SPLIT + 0.4, 'golpecito'], [SOME + 0.15, 'ola'], [PERHAPS, 'viento'],
  [CHILDREN, 'palmada'], [W(17.1), 'guau'], [W(20.3), 'golpecito'], [W(21.6), 'golpecito'], [CLEAR, 'brillo'], [NEVER2 + 0.35, 'trueno'],
  [ANYTHING - 0.1, 'papel'], [ANSWER, 'papel'], [DOWN, 'pop'], [POSTE, 'golpecito'], [RINGS, 'tic'], [IRON, 'brillo'], [LINEA, 'lapiz'], [MAGNET, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9]], { efectos, año });
''')
