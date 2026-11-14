E = {}

# piezas comunes de las tres escenas (cada escena es su propia página: se repiten en cada cuerpo)
COMUN = r'''
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const K = hex('#1a1214'), BL = hex('#f6f2e4');
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// un fondo fijo pintado una vez en su búfer y copiado en cada fotograma (con R.usar(prev), para no romper los fundidos)
const BUF = {};
const fijo = (k, pinta) => { let b = BUF[k]; if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); BUF[k] = b; } R.copiar(b); };
// sombra suave en el suelo (oscurece lo que hay)
const sombra = (cx, cy, rx, ry, a = 0.35) => { for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) if ((x * x) / (rx * rx) + (y * y) / (ry * ry) <= 1) R.pset(cx + x, cy + y, mez(R.pget(cx + x, cy + y), K, a)); };
// recorrido por fotogramas clave [t, x, suelo]: dónde está, si anda y hacia dónde mira
const ruta = (t, kf) => { if (t <= kf[0][0]) return { x: kf[0][1], s: kf[0][2], mv: false, d: kf[0][3] ?? 1 };
  for (let i = 0; i + 1 < kf.length; i++) if (t < kf[i + 1][0]) { const [t0, x0, s0] = kf[i], [t1, x1, s1] = kf[i + 1], u = (t - t0) / (t1 - t0); return { x: Math.round(lerp(x0, x1, u)), s: Math.round(lerp(s0, s1, u)), mv: x1 !== x0, d: x1 < x0 ? -1 : x1 > x0 ? 1 : (kf[i + 1][3] ?? 1) }; }
  const u = kf[kf.length - 1]; return { x: u[1], s: u[2], mv: false, d: u[3] ?? 1 }; };
// bocadillo de pensamiento: nubecitas con borde y las bolitas que bajan a la cabeza
const piensa = (cx, cy, rx, ry, hx, hy, u = 1) => {
  if (u <= 0) return; const sx = Math.max(1, Math.round(rx * u)), sy = Math.max(1, Math.round(ry * u));
  for (let k = 0; k < 3; k++) { const f = (k + 1) / 4, bx = Math.round(lerp(hx, cx, f * 0.7)), by = Math.round(lerp(hy, cy + sy, f * 0.9)); R.disco(bx, by, 1 + k, K); R.disco(bx, by, k, BL); }
  const bolas = [[0, 0, 1], [-0.62, 0.2, 0.62], [0.62, 0.2, 0.62], [-0.32, -0.42, 0.62], [0.32, -0.42, 0.62]];
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx * sx), Math.round(cy + dy * sy), Math.round(r * sy) + 1, K);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx * sx), Math.round(cy + dy * sy), Math.round(r * sy), BL);
  for (let x = -sx; x <= sx; x += 2) R.pset(Math.round(cx + x), Math.round(cy + sy * 0.86), hex('#d8d2c2'));
};
// bocadillo grande con un símbolo ('?' o '!') a escala 2, con su piquito hacia abajo en (x, y)
const globo = (x, y, icono, c = hex('#c8282a')) => { const w = icono === '!' ? 3 : 5; R.rect(x - 8, y - 20, x + 8, y - 3, K); R.rect(x - 7, y - 19, x + 7, y - 4, BL); R.rect(x - 7, y - 5, x + 7, y - 4, hex('#d8d2c2'));
  R.pset(x - 1, y - 2, K); R.pset(x, y - 1, K); R.pset(x - 1, y - 3, BL); R.pset(x, y - 2, BL); R.pset(x + 1, y - 2, K); R.icono(icono, x - w, y - 17, c, hex('#8a8478'), 2); };
// la piedra de los símbolos (sin letras: rayas, puntos, triángulos, círculos), de frente: (x, y) esquina de arriba,
// w × hh; rev 0–1 los símbolos se encienden (tallados con su filo de luz); luz: tono de la cara
const SIMB = ['tri', 'pp', 'bar', 'circ', 'tri2', 'p3', 'cruz', 'bar2', 'circp', 'tri', 'p2', 'bar', 'tri2', 'circ', 'pp', 'bar2', 'p3', 'tri', 'cruz', 'circp', 'tri2', 'bar', 'pp', 'circ'];
const simbolo = (tipo, x, y, c, cl) => {
  const P = (a, b) => { R.pset(x + a, y + b + 1, cl); R.pset(x + a, y + b, c); };
  if (tipo === 'tri') { for (let i = 0; i < 5; i++) { P(2 - (i >> 1), i); P(2 + (i >> 1), i); } for (let i = 0; i < 5; i++) P(i, 4); }
  else if (tipo === 'tri2') { for (let i = 0; i < 5; i++) P(i, 0); for (let i = 0; i < 5; i++) { P(2 - (i >> 1), 4 - i); P(2 + (i >> 1), 4 - i); } }
  else if (tipo === 'pp') { P(0, 1); P(1, 1); P(3, 3); P(4, 3); }
  else if (tipo === 'p2') { P(1, 2); P(3, 2); }
  else if (tipo === 'p3') { P(2, 0); P(0, 4); P(4, 4); }
  else if (tipo === 'bar') { for (let i = 0; i < 5; i++) P(1, i); for (let i = 0; i < 5; i++) P(3, i); }
  else if (tipo === 'bar2') { for (let i = 0; i < 5; i++) P(i, 1); for (let i = 0; i < 5; i++) P(i, 3); }
  else if (tipo === 'circ') { for (const [a, b] of [[1, 0], [2, 0], [3, 0], [0, 1], [4, 1], [0, 2], [4, 2], [0, 3], [4, 3], [1, 4], [2, 4], [3, 4]]) P(a, b); }
  else if (tipo === 'circp') { for (const [a, b] of [[1, 0], [2, 0], [3, 0], [0, 1], [4, 1], [0, 2], [4, 2], [0, 3], [4, 3], [1, 4], [2, 4], [3, 4], [2, 2]]) P(a, b); }
  else if (tipo === 'cruz') { for (let i = 0; i < 5; i++) { P(2, i); P(i, 2); } }
};
const piedra = (x, y, w, hh, rev = 1, o = {}) => {
  const c0 = hex(o.c0 ?? '#7c766a'), c1 = hex(o.c1 ?? '#a29c8c'), c2 = hex(o.c2 ?? '#56514a'), cs = hex('#3a3632');
  const P = []; for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2, r = 1 + (h(i, w, 300) - 0.5) * 0.08; P.push([Math.round(x + w / 2 + Math.cos(a) * w / 2 * r), Math.round(y + hh / 2 + Math.sin(a) * hh / 2 * r)]); }
  R.poligono(P.map(([a, b]) => [a + 1, b + 2]), cs); R.poligono(P.map(([a, b]) => [a, b + 1]), K); R.poligono(P, c0);
  for (let j = y; j < y + hh; j++) for (let i = x; i < x + w; i++) { if (R.pget(i, j) !== c0) continue; const v = h(i >> 1, j >> 1, 301); if (v < 0.12) R.pset(i, j, c2); else if (v > 0.9 || j < y + 3) R.pset(i, j, c1); }
  // las vetas de la losa
  for (let k = 0; k < 3; k++) { const yy = y + Math.round(hh * (0.25 + k * 0.3)); for (let i = x + 4; i < x + w - 4; i++) if (h(i, k, 302) < 0.55) R.pset(i, yy + Math.round(Math.sin(i * 0.2 + k) * 0.8), c2); }
  if (rev <= 0) return;
  const cols = Math.max(3, Math.floor((w - 6) / 7)), filas = Math.max(2, Math.floor((hh - 4) / 7)), x0 = x + Math.round((w - cols * 7) / 2) + 1, y0 = y + Math.round((hh - filas * 7) / 2) + 1;
  const tallo = hex(o.talla ?? '#241e1a'), filo = mez(c1, hex('#fff2c8'), 0.5 * rev);
  for (let f = 0; f < filas; f++) for (let c = 0; c < cols; c++) { const n = f * cols + c; if (h(n, 7, 303) > rev * 1.2) continue; simbolo(SIMB[(n * 5 + f) % SIMB.length], x0 + c * 7, y0 + f * 7, tallo, filo); }
};
'''

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['oi-hola'] = ('Hola', '''// OI-HOLA (frase 7), hoy, 2026. Un plano: la orilla de Oak Island de hoy al atardecer, con la marea que entra (sube
// la línea del agua), la calzada con su coche y la gaviota en la roca. Un buscador con detector de metales recorre la
// playa barriendo la arena; la vecina hace una foto al sol con el móvil («And I explain»: el flash); los correlimos corren
// tras las olas. «Let's find out»: el detector pita, la luz se pone roja, ondas en la arena; el buscador se para, «!»,
// sonríe y señala abajo.''', COMUN + r'''
const D = E.duracion, PITA = en('hola', 0.795), FOTO = en('hola', 0.25);
const pajaros = (t, yAgua) => {   // tres correlimos que corren detrás de la ola y escapan cuando vuelve
  for (let k = 0; k < 3; k++) { const v = Math.sin(t * 1.7 + k * 0.8), x = Math.round(150 + k * 16 + Math.sin(t * 0.6 + k) * 8 + v * 4), y = Math.round(yAgua + 10 + v * 3 + k % 2);
    const pata = Math.floor(t * 12 + k) % 2; R.pset(x - 1, y + 3, K); R.pset(x + (pata ? 1 : -2), y + 3, K); R.pset(x, y + 2, K); R.pset(x - 1, y + 2, K);
    R.rect(x - 4, y - 3, x + 3, y + 1, K); R.rect(x - 3, y - 2, x + 2, y - 1, hex('#6a5438')); R.rect(x - 3, y, x + 2, y, hex('#f6f2e8')); R.pset(x - 1, y - 2, hex('#a88a60'));
    R.rect(x + 2, y - 5, x + 4, y - 3, K); R.pset(x + 3, y - 4, hex('#f6f2e8')); R.pset(x + 5, y - 4, K); R.pset(x + 6, y - 4, K); R.pset(x - 5, y - 2, K); }
};
const detector = (x, s, t, pita, para) => {   // el detector de metales: mango desde la mano, caja con luz y el plato que barre
  const sw = para ? 0 : Math.sin(t * 3.2) * 6, hx = x + 13, hy = s - 11, px = Math.round(x + 27 + sw), py = s - 1;
  R.linea(hx, hy, px - 2, py - 2, K); R.linea(hx, hy - 1, px - 2, py - 3, hex('#8a96a2'));
  R.rect(hx - 1, hy - 3, hx + 3, hy, K); R.rect(hx, hy - 2, hx + 2, hy - 1, hex('#e8783a'));
  R.pset(hx + 1, hy - 4, pita && Math.floor(t * 8) % 2 ? hex('#ff4a3a') : hex('#4ae86a'));
  sombra(px, py + 2, 6, 1, 0.3); R.rect(px - 6, py - 1, px + 6, py + 1, K); R.rect(px - 5, py - 1, px + 5, py, hex('#3a3a46')); R.rect(px - 3, py - 1, px + 3, py - 1, hex('#6a6a7a'));
  if (pita) for (let r = 0; r < 3; r++) { const rr = 4 + ((t * 10 + r * 4) % 12); for (let a = 0; a < 6.28; a += 0.25) if (Math.sin(a) < 0.2) R.pset(Math.round(px + Math.cos(a) * rr * 1.6), Math.round(py + Math.sin(a) * rr * 0.4), mez(R.pget(Math.round(px + Math.cos(a) * rr * 1.6), Math.round(py + Math.sin(a) * rr * 0.4)), hex('#fff2a0'), 0.7)); }
};
const p1 = (t) => {
  const g = T.isla1795(R, t, { encuadre: 'orilla', hoy: true, atardecer: true, marea: lerp(0.32, 0.66, t / D) });
  pajaros(t, g.marea ?? 130);
  // la vecina hace una foto al sol con el móvil
  const fotoA = t > FOTO - 0.6;
  R.actor(EL.vecina, 230, 166, t, { dir: -1, dedo: fotoA && t < FOTO + 1.4, sonrisa: t > FOTO + 0.4 });
  if (fotoA && t < FOTO + 1.4) { R.rect(226, 135, 229, 140, K); R.rect(227, 136, 228, 139, hex('#3a4a6a')); if (t > FOTO && t < FOTO + 0.12) { R.disco(227, 137, 4, hex('#fffbe0')); R.disco(227, 137, 2, BL); } }
  // el buscador con su detector: barre la arena hasta que pita
  const q = ruta(t, [[0, 112, 162], [PITA - 0.1, 178, 168]]), pita = t > PITA, para = t > PITA - 0.1;
  sombra(q.x + 7, q.s + 1, 7, 1, 0.3);
  R.actor(EL.sudadera, q.x, q.s, t, { dir: 1, anda: q.mv, sorpresa: pita && t < PITA + 0.6, sonrisa: t > PITA + 0.6, dedo: t > PITA + 0.7 });
  detector(q.x, q.s, t, pita, para);
  if (t > PITA + 0.15) globo(q.x + 7, q.s - 27 - Math.round(2 * Math.sin(t * 6)), '!');
  if (t > PITA + 0.5) { const gx = q.x + 27, gy = q.s + 2, f = Math.sin(t * 7) > 0; R.pset(gx, gy, BL); for (let r = 1; r < (f ? 4 : 3); r++) { R.pset(gx + r, gy, hex('#ffe890')); R.pset(gx - r, gy, hex('#ffe890')); R.pset(gx, gy + r, hex('#ffe890')); R.pset(gx, gy - r, hex('#ffe890')); } }
  T.a_islaDelante(R, t, { encuadre: 'orilla', atardecer: true, hoy: true });
};
const efectos = [[0.7, 'ola'], [FOTO, 'flash'], [PITA, 'bip'], [PITA + 0.35, 'bip']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['oi-onslow'] = ('La compañía de Onslow', '''// OI-ONSLOW (frases 8–9), 1803, cartela «1803». Seis planos:
// 1. la bahía: dos botes de remos cargados de obreros, picos y cubos llegan a la isla; el primero vara en la playa
//    («arrives») y un obrero salta a la arena;
// 2. («backed») el mapa de Nueva Escocia: cae la chincheta de Onslow («OnSlow») y la bolsa de dinero cruza la provincia
//    («across Nova Scotia») hasta Oak Island, donde cae otra chincheta;
// 3. («and digs») el pozo en corte: el castillete con su torno, el cavador que pica y baja de diez en diez pies, la cinta
//    de medir; «90 feet»: «90'»;
// 4. («Along») la boca del pozo: el torno sube el cubo, un obrero lo vacía en la carretilla y el capataz lo apunta todo
//    en su libro («written down»);
// 5. («They find») el inserto: la tabla junto al pozo, y tres manos dejan las muestras en su palabra: el carbón
//    («charcoal»), la masilla («putty») y la fibra de coco («coconut fiber»);
// 6. («which») el claro de robles: el obrero levanta la fibra y mira a un lado y a otro; piensa en un cocotero, y en
//    «not a single» lo tacha una X roja; otro cava detrás y el capataz llega con el cubo.''', COMUN + r'''
const a = (f) => en('onslow', f), b = (f) => en('coco', f);
const P2 = a(0.3475), P3 = a(0.7094), P4 = b(0), P5 = b(0.3128), P6 = b(0.6192);
const LLEGA = a(0.243), ONSLOW = a(0.457), NOVA = a(0.576), NOVENTA = a(0.912), APUNTA = b(0.2), CARBON = b(0.3725), MASILLA = b(0.4637), COCO = b(0.5096), NORTE = b(0.6997), NI = b(0.8168);
const MAD = hex('#7a4a2a'), MADL = hex('#a8703c'), MADS = hex('#4a2a18'), FIERRO = hex('#8a96a2');
// un bote de remos con su gente (dir 1: la proa a la derecha); u: cuánto ha avanzado; rema: si mueve los remos
const bote = (x, y, t, gente, rema, k = 0) => {
  const bob = Math.round(Math.sin(t * 2.4 + k) * 1);
  y += bob;
  // estela
  if (rema) for (let i = 0; i < 18; i++) { const xx = x - 26 - i * 2, dy = Math.round(i * 0.45 + Math.sin(t * 6 + i) * 0.6); if (h(i, Math.floor(t * 8), k) < 0.7) { R.pset(xx, y + 6 + dy, hex('#e8f0f0')); R.pset(xx, y + 6 - dy, hex('#cfe0e6')); } }
  // remos de detrás
  const fase = t * 3.4 + k, ang = Math.sin(fase), sube = Math.cos(fase) > 0;
  const remo = (ox, lado) => { const bx = Math.round(ox - 8 - ang * 9), by = y + (lado ? 8 : 9) + (sube ? -3 : 1); R.linea(ox, y + 1, bx, by, MADS); R.rect(bx - 2, by, bx + 1, by + 1, MADL);
    if (!sube && rema && Math.floor(t * 8) % 2) { R.pset(bx - 3, by - 1, BL); R.pset(bx + 2, by - 2, BL); } };
  remo(x - 4, 1); remo(x + 8, 1);
  // la gente: el cuerpo lo tapa la borda
  for (const [d, dx, op] of gente) R.actor(d, x + dx, y + 8, t, { dir: op.dir ?? -1, quieto: false, ...op });
  // picos y palas que asoman
  R.linea(x + 14, y - 10, x + 18, y + 1, MADS); R.rect(x + 11, y - 12, x + 17, y - 11, FIERRO); R.rect(x + 11, y - 12, x + 11, y - 10, K);
  R.linea(x - 18, y - 8, x - 16, y + 1, MADS); R.rect(x - 20, y - 11, x - 16, y - 8, FIERRO);
  // casco: borda, tracas y quilla
  const casco = [[x - 26, y], [x + 24, y], [x + 30, y - 4], [x + 26, y + 3], [x + 18, y + 9], [x - 20, y + 9], [x - 25, y + 5]];
  R.poligono(casco.map(([a, b]) => [a, b + 1]), K); R.poligono(casco, MAD);
  for (let i = x - 24; i < x + 26; i++) { R.pset(i, y, MADL); R.pset(i, y + 1, MADL); if ((i & 3) !== 0) R.pset(i, y + 4, MADS); if ((i + 1) % 5) R.pset(i, y + 7, MADS); }
  for (let i = x - 22; i < x + 22; i += 2) R.pset(i, y + 2, hex('#d8ccaa'));
  R.rect(x - 8, y - 4, x - 2, y, K); R.rect(x - 7, y - 3, x - 3, y, hex('#8a8a96'));   // un cubo
  remo(x - 2, 0); remo(x + 10, 0);
  // el agua que lame el casco
  for (let i = x - 24; i < x + 22; i++) if ((i + Math.floor(t * 6)) % 4 === 0) R.pset(i, y + 9, hex('#cfe0e6'));
};
const p1 = (t) => {
  const g = T.isla1795(R, t, { encuadre: 'bahia' });
  // el segundo bote llega a la playa y un obrero salta a la arena
  const u2 = tramo(t, 1.0, LLEGA), x2 = Math.round(lerp(150, 204, u2)), y2 = Math.round(lerp(112, 99, u2));
  const salta = tramo(t, LLEGA + 0.15, LLEGA + 0.7);
  bote(x2, y2, t, salta > 0 ? [[EL.cavador2, -14, { dir: 1 }]] : [[EL.cavador2, -14, { dir: 1 }], [EL.cavador, 2, { dir: 1, dedo: t > LLEGA - 0.6 }]], u2 < 1, 1);
  if (salta > 0) { const sx = Math.round(lerp(x2 + 2, x2 + 30, salta)), sy = Math.round(lerp(y2 + 8, 97, salta) - Math.sin(salta * Math.PI) * 10);
    R.actor(EL.cavador, sx, sy, t, { dir: 1, anda: salta >= 1, sonrisa: true }); }
  // el primero, más cerca, con el capataz que señala la isla
  const u1 = tramo(t, 0.6, E.duracion), x1 = Math.round(lerp(96, 160, tramo(t, 0.2, P2 + 1))), y1 = Math.round(lerp(146, 128, tramo(t, 0.2, P2 + 1)));
  bote(x1, y1, t, [[EL.cavador, -16, {}], [EL.cavador2, -2, { pal: { C: hex('#b8a888') } }], [EL.capataz, 12, { dir: 1, dedo: t > 2.2, habla: Math.sin(t * 7) > 0.3 && t > 2.2 }]], true, 0);
};
const p2 = (t) => {
  const P = T.mapa(R, t, { zoom: 8, centro: [-63.82, 44.96] });
  const on = P(T.LUGARES.onslow), oak = P(T.LUGARES.oakIsland);
  const pts = [[-63.33, 45.40], [-63.62, 45.22], [-63.95, 45.02], [-64.12, 44.78], [-64.30, 44.51]].map((p) => P(p).map(Math.round));
  const r = tramo(t, NOVA - 0.4, P3 - 0.5);
  if (r > 0) { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); let q = L * r;
    for (let i = 1; i < pts.length && q > 0; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]), f = Math.min(1, q / d), n = Math.ceil(d * f);
      for (let k = 0; k <= n; k++) { const x = Math.round(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k / d), y = Math.round(pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k / d); if (((x + y) >> 2) % 2 === 0) { R.disco(x, y, 3, K); R.disco(x, y, 2, hex('#c8282a')); R.pset(x - 1, y - 1, hex('#ff8a7a')); } }
      q -= d; } }
  T.chincheta(R, on[0], on[1], t, hex('#c8a040'), { baja: tramo(t, ONSLOW - 0.35, ONSLOW), pulso: t > ONSLOW && t < NOVA });
  T.chincheta(R, oak[0], oak[1], t, hex('#b8282a'), { baja: tramo(t, P3 - 0.6, P3 - 0.3), pulso: t > P3 - 0.3 });
  // la bolsa de dinero de los inversores, que viaja por la ruta
  // una goleta diminuta que navega por el Atlántico, abajo a la derecha
  { const gx = Math.round(300 - ((t - P2) * 5) % 80), gy = 150 + Math.round(Math.sin(t * 2) * 1); R.rect(gx - 5, gy, gx + 5, gy + 2, K); R.rect(gx - 4, gy, gx + 4, gy + 1, hex('#6a4a2a')); R.linea(gx, gy - 9, gx, gy, K);
    R.poligono([[gx + 1, gy - 9], [gx + 6, gy - 2], [gx + 1, gy - 2]], BL); R.poligono([[gx - 1, gy - 7], [gx - 5, gy - 2], [gx - 1, gy - 2]], hex('#e8e0c8')); for (let i = 1; i < 6; i++) if ((i + Math.floor(t * 6)) % 2) R.pset(gx + 6 + i, gy + 2, BL); }
  if (t > ONSLOW + 0.2) {
    let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    let q = L * r, bx = pts[0][0], by = pts[0][1]; for (let i = 1; i < pts.length && q > 0; i++) { const f = Math.min(1, q / seg[i - 1]); bx = lerp(pts[i - 1][0], pts[i][0], f); by = lerp(pts[i - 1][1], pts[i][1], f); q -= seg[i - 1]; }
    const sal = tramo(t, ONSLOW + 0.2, ONSLOW + 0.6), bob = Math.round(Math.abs(Math.sin(t * 7)) * 2 * (r > 0 && r < 1 ? 1 : 0));
    const ix = Math.round(bx) - 8, iy = Math.round(by) - 22 - bob - Math.round((1 - sal) * 6);
    R.disco(ix + 8, iy + 10, 10, K); R.disco(ix + 8, iy + 10, 9, hex('#f2e6c0'));
    R.icono('bolsa', ix + 1, iy + 2, hex('#e8b830'), hex('#6a4a18'), 2);
    if (Math.sin(t * 9) > 0.6) { R.pset(ix + 16, iy + 2, BL); R.pset(ix + 15, iy + 2, hex('#ffe890')); R.pset(ix + 16, iy + 1, hex('#ffe890')); }
  }
};
const p3 = (t) => {
  const pies = lerp(10, 90, tramo(t, P3 + 0.2, NOVENTA));
  const g = T.pozo(R, t, { encuadre: 'corte', epoca: '1803', fondo: pies });
  const fy = g.fondoY ?? Math.round(52 + 1.2 * pies);
  // la cinta de medir que baja junto al pozo, con una marca cada diez pies
  for (let y = 52; y <= fy; y++) { R.pset(127, y, hex('#e8dcb0')); R.pset(128, y, hex('#a89870')); }
  for (let p = 10; p <= pies + 0.1; p += 10) { const y = Math.round(52 + 1.2 * p); R.rect(126, y, 131, y, K); R.pset(132, y, hex('#e8dcb0')); }
  // el cavador del fondo, que pica
  const golpe = Math.floor(t * 2.2) % 2, cx = 106;
  R.actor(EL.cavador, cx, fy, t, { dir: 1, quieto: false });
  const ang = golpe ? 0.4 : -1.1, mx = cx + 12, my = fy - 12; R.linea(mx, my, Math.round(mx + Math.cos(ang) * 9), Math.round(my + Math.sin(ang) * 9), MADS);
  { const px = Math.round(mx + Math.cos(ang) * 9), py = Math.round(my + Math.sin(ang) * 9); R.rect(px - 2, py - 1, px + 2, py, FIERRO); R.pset(px - 3, py + 1, K); }
  if (golpe) for (let k = 0; k < 4; k++) R.pset(cx + 14 + k, fy - 2 - ((k * 3 + Math.floor(t * 9)) % 4), hex('#9a7a5a'));
  // arriba: el del torno, el capataz que señala abajo y el que se lleva la tierra
  R.actor(EL.cavador2, 141, 52, t, { dir: -1, habla: t > NOVENTA - 0.5 && Math.sin(t * 8) > 0 });
  R.actor(EL.capataz, 74, 52, t, { dir: 1, dedo: t > P3 + 0.4 && t < NOVENTA + 0.6, sorpresa: t > NOVENTA && t < NOVENTA + 0.5, sonrisa: t > NOVENTA + 0.5 });
  const q = ruta(t, [[P3 + 0.3, 176, 52], [P3 + 2.2, 200, 52], [P3 + 2.6, 200, 52], [P3 + 3.9, 176, 52]]);
  R.actor(EL.cavador, q.x, q.s, t, { dir: q.d, anda: q.mv, pal: { C: hex('#b8a888') } });
  if (t < P3 + 2.3) { const bx = q.x + (q.d > 0 ? 13 : -2); R.rect(bx, 40, bx + 5, 45, K); R.rect(bx + 1, 41, bx + 4, 44, hex('#8a8a96')); R.rect(bx + 1, 41, bx + 4, 41, hex('#7a5a40')); }
  else if (t < P3 + 2.8) for (let k = 0; k < 6; k++) R.pset(206 + (k % 3), 46 + k + Math.floor((t - P3) * 12) % 4, hex('#7a5a40'));
  // «90'»
  const n = tramo(t, NOVENTA - 0.05, NOVENTA + 0.25);
  if (n > 0) { const y = Math.round(lerp(fy + 8, fy + 2, n)); R.rect(134, fy, 140, fy, hex('#e8dcb0')); R.numero("90'", 144, Math.min(178, y + 10), { tam: 16 }); }
};
const p4 = (t) => {
  const g = T.pozo(R, t, { encuadre: 'boca', epoca: '1803' });
  // el del torno
  R.actor(EL.cavador2, 206, 160, t, { dir: -1, habla: Math.sin(t * 3) > 0.6 });
  // el obrero que coge el cubo del brocal, lo lleva a la carretilla y lo vacía
  const q = ruta(t, [[P4 + 0.2, 150, 162, 1], [P4 + 0.9, 150, 162, 1], [P4 + 2.4, 222, 166], [P4 + 3.4, 222, 166, 1], [P4 + 4.2, 200, 164]]);
  R.actor(EL.cavador, q.x, q.s, t, { dir: q.d, anda: q.mv, sonrisa: t > P4 + 3 });
  const vacia = tramo(t, P4 + 2.5, P4 + 3.0);
  if (t > P4 + 0.8 && t < P4 + 3.2) { const bx = q.x + 14, by = q.s - 12 - Math.round(vacia * 5); R.rect(bx, by, bx + 6, by + 6, K); R.rect(bx + 1, by + 1, bx + 5, by + 5, hex('#8a8a96')); R.rect(bx + 1, by + 1, bx + 5, by + 2, hex('#7a5a40'));
    if (vacia > 0) for (let k = 0; k < 10; k++) { const ff = ((t - P4 - 2.5) * 3 + k * 0.13) % 1; R.pset(bx + 6 + (k % 3), Math.round(by + 4 + ff * 14), k % 2 ? hex('#7a5a40') : hex('#5a3a24')); } }
  // el capataz apunta en su libro, sentado en los tablones
  const escribe = t > P4 + 0.5;
  R.actor(EL.capataz, 92, 158, t, { dir: 1, habla: false, sonrisa: t > APUNTA + 0.4 });
  { const lx = 104, ly = 140; R.rect(lx, ly, lx + 11, ly + 7, K); R.rect(lx + 1, ly + 1, lx + 5, ly + 6, hex('#f2ecd8')); R.rect(lx + 6, ly + 1, lx + 10, ly + 6, hex('#e8e0c8')); R.rect(lx + 5, ly, lx + 5, ly + 7, hex('#7a3a2a'));
    const ln = Math.floor((t - P4) * 2) % 4; for (let j = 0; j < 4; j++) if (escribe && (j < ln || t > APUNTA)) R.linea(lx + 7, ly + 2 + j, lx + 9, ly + 2 + j, hex('#3a3a5a'));
    const qx = lx + 8 + Math.round(Math.sin(t * 9) * 1.5), qy = ly + 2 + ln; R.linea(qx, qy, qx + 4, qy - 7, BL); R.linea(qx + 1, qy - 1, qx + 5, qy - 6, hex('#d8d2c2')); R.pset(qx, qy, K); }
};
// el inserto de la tabla junto al pozo: tierra, hierba, el cubo, la pala, la soga, el farol y la tabla con las muestras
const tabla = () => {
  const T0 = hex('#6a4a30'), T1 = hex('#7e5a3a'), T2 = hex('#523822'), T3 = hex('#8e6a48');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 400), w = h(x >> 3, y >> 3, 401); R.pset(x, y, v < 0.18 ? T2 : v > 0.86 ? T3 : w > 0.55 ? T1 : T0); }
  // rodadas de la carretilla y pisadas
  for (let x = 0; x < 320; x++) { const y = Math.round(82 + Math.sin(x * 0.02) * 6); R.pset(x, y, T2); R.pset(x, y + 1, T2); R.pset(x, y + 5, T2); R.pset(x, y + 6, T2); if (x % 9 < 2) R.pset(x, y + 3, T3); }
  // guijarros y raicillas
  for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 402) * 320), y = 18 + Math.round(h(k, 2, 402) * 162), r = 1 + Math.floor(h(k, 3, 402) * 3); R.disco(x + 1, y + 1, r, T2); R.disco(x, y, r, h(k, 4, 402) > 0.5 ? hex('#9a9488') : hex('#b0a898')); R.pset(x - 1, y - 1, hex('#d8d2c4')); }
  for (let k = 0; k < 8; k++) { let x = h(k, 5, 402) * 320, y = 20 + h(k, 6, 402) * 150; for (let i = 0; i < 26; i++) { x += Math.cos(k + i * 0.3) * 1.2; y += Math.sin(k * 2 + i * 0.4) * 1.1 + 0.4; R.pset(Math.round(x), Math.round(y), hex('#c8a878')); } }
  // hierba arriba (la zona de Atom y la barra del año quedan en hierba oscura y tranquila)
  for (let x = 0; x < 320; x++) { const hh = 14 + Math.round(h(x, 9, 403) * 8); for (let y = 0; y < hh; y++) R.pset(x, y, y > hh - 3 ? hex('#2e4a22') : y < 10 ? hex('#3a5a2a') : (x + y) % 3 ? hex('#4a7a32') : hex('#6a9a42')); }
  // el cubo con tierra (arriba a la izquierda), la pala, el rollo de soga y el farol apagado
  R.disco(40, 52, 18, K); R.disco(40, 52, 16, hex('#7a7a86')); R.disco(40, 52, 13, hex('#5a3a24')); for (let k = 0; k < 30; k++) R.pset(30 + (k * 7) % 20, 44 + (k * 5) % 16, k % 3 ? hex('#7a5a40') : hex('#3a2418')); R.anillo(40, 52, 15, hex('#a8a8b4'));
  R.linea(80, 30, 196, 62, K); R.linea(80, 29, 196, 61, hex('#8a6a44')); R.linea(81, 28, 196, 60, hex('#a8845a'));
  R.poligono([[194, 54], [214, 58], [216, 72], [196, 70]], K); R.poligono([[195, 56], [213, 59], [214, 70], [197, 68]], FIERRO); R.linea(196, 57, 212, 60, hex('#c8d2dc'));
  for (let r = 14; r > 3; r -= 3) { R.anillo(250, 62, r, K); R.anillo(250, 62, r - 1, hex('#c8a870')); } R.disco(250, 62, 3, T2);
  R.rect(130, 64, 140, 78, K); R.rect(131, 66, 139, 77, hex('#c8c0a0')); R.rect(131, 64, 139, 65, hex('#3a3a46')); R.linea(133, 61, 137, 61, K); R.pset(135, 72, hex('#5a4a38'));
  // la tabla: de x 30 a 290, y 98–164, con vetas, nudos, clavos y su sombra
  R.rect(34, 104, 294, 170, mez(T0, K, 0.5));
  R.rect(28, 96, 290, 164, K); R.rect(29, 97, 289, 163, hex('#c8a070'));
  for (let y = 98; y < 163; y++) for (let x = 30; x < 289; x++) { const v = Math.sin(y * 0.55 + Math.sin(x * 0.03 + y * 0.04) * 2.5 + h(x >> 4, y >> 3, 404)); if (v > 0.8) R.pset(x, y, hex('#a87e52')); else if (v < -0.85) R.pset(x, y, hex('#dcb888')); }
  R.rect(29, 130, 289, 130, hex('#8a6440')); R.rect(29, 131, 289, 131, hex('#e0c094'));
  for (const [x, y] of [[58, 112], [200, 150], [270, 108]]) { R.disco(x, y, 4, hex('#8a6440')); R.disco(x, y, 2, hex('#6a4a30')); }
  for (const [x, y] of [[36, 102], [282, 102], [36, 158], [282, 158], [36, 126], [282, 136]]) { R.disco(x, y, 1, K); R.pset(x, y, hex('#a8b0b8')); }
  // manchas de barro en la tabla
  for (let k = 0; k < 14; k++) { const x = 40 + Math.round(h(k, 1, 405) * 240), y = 100 + Math.round(h(k, 2, 405) * 60); R.pset(x, y, hex('#8a6440')); R.pset(x + 1, y, hex('#8a6440')); }
};
const carbon = (cx, cy) => { for (let k = 0; k < 15; k++) { const x = cx - 20 + Math.round(h(k, 1, 410) * 36), y = cy - 8 + Math.round(h(k, 2, 410) * 15), w = 6 + Math.round(h(k, 3, 410) * 7);
  const P = [[x, y - 4], [x + w, y - 5], [x + w + 2, y + 1], [x + w - 1, y + 4], [x - 1, y + 3]]; R.poligono(P.map(([a, b]) => [a + 1, b + 1]), K); R.poligono(P, hex('#24222a')); R.linea(x, y - 4, x + w, y - 5, hex('#5a5a6a')); R.pset(x + 2, y - 2, hex('#9a9ab0')); R.linea(x + 3, y + 1, x + w - 2, y, hex('#3a3842')); } };
const masilla = (cx, cy) => { R.disco(cx + 2, cy + 3, 16, mez(hex('#c8a070'), K, 0.4)); R.disco(cx, cy, 16, K); R.disco(cx, cy, 15, hex('#8a98a0')); R.disco(cx - 4, cy - 4, 9, hex('#a8b4ba')); R.disco(cx - 6, cy - 6, 3, hex('#d0d8dc')); R.disco(cx + 5, cy + 3, 4, hex('#6e7c84')); R.disco(cx + 5, cy + 2, 3, hex('#7e8c94')); for (let k = 0; k < 3; k++) R.linea(cx + 2 + k, cy + 6 - k, cx + 8 + k, cy + 4 - k, hex('#6e7c84')); };
const fibra = (cx, cy, s = 1) => { for (let k = 0; k < Math.round(44 * s); k++) { let x = cx + (h(k, 1, 420) - 0.5) * 36 * s, y = cy + (h(k, 2, 420) - 0.5) * 18 * s; const a0 = h(k, 3, 420) * 6.28;
  for (let i = 0; i < 14 * s; i++) { x += Math.cos(a0 + i * 0.35) * 1.1; y += Math.sin(a0 + i * 0.35) * 0.6; R.pset(Math.round(x), Math.round(y), k % 4 === 0 ? hex('#3a2010') : k % 3 ? hex('#8a5428') : hex('#c8904c')); } } };
const MUESTRAS = [[CARBON, 88, 134, carbon, '#5a6a4a', 1], [MASILLA, 160, 134, masilla, '#4a5a7a', 1], [COCO, 234, 134, (x, y) => fibra(x, y, 1.15), '#7a5230', -1]];
const p5 = (t) => {
  fijo('tabla', tabla);
  // vida: la sombra de las hojas que se mece sobre la tabla, la nube que pasa, hormigas en fila, una hoja que vuela
  for (let k = 0; k < 7; k++) { const cx = Math.round(40 + k * 42 + Math.sin(t * 1.3 + k) * 4), cy = Math.round(100 + (k % 3) * 22 + Math.cos(t * 1.1 + k * 2) * 3);
    for (let y = -7; y <= 7; y++) for (let x = -11; x <= 11; x++) if (x * x / 121 + y * y / 49 < 1 && h(x + k, y, 406) > 0.35 && (x + y) % 2 === 0) R.pset(cx + x, cy + y, mez(R.pget(cx + x, cy + y), K, 0.22)); }
  const nx = ((t - P5) * 34) % 520 - 100; for (let y = 20; y < 180; y += 1) for (let x = Math.max(0, Math.round(nx)); x < Math.min(320, Math.round(nx + 90 + Math.sin(y * 0.05) * 14)); x++) if ((x + y) % 2 === 0) R.pset(x, y, mez(R.pget(x, y), K, 0.15));
  for (let k = 0; k < 9; k++) { const x = Math.round((t * 12 + k * 9) % 340) - 10, y = 172 + Math.round(Math.sin(x * 0.08) * 2); R.rect(x, y, x + 2, y, K); R.pset(x + 1, y - 1, hex('#3a2418')); if (k === 3) { R.rect(x - 1, y - 3, x + 2, y - 2, hex('#e8e0c8')); } }
  { const u = ((t - P5) * 0.35) % 1, x = Math.round(lerp(-10, 330, u)), y = Math.round(36 + Math.sin(u * 9) * 10); R.poligono([[x, y], [x + 6, y - 3], [x + 8, y + 1], [x + 2, y + 3]], hex('#c8a030')); R.linea(x, y + 1, x + 8, y, hex('#8a6a20')); }
  for (const [tt, cx, cy, pinta, manga, lado] of MUESTRAS) {
    const ent = tramo(t, tt - 0.55, tt), sal = tramo(t, tt + 0.1, tt + 0.6);
    if (t > tt) { pinta(cx, cy); if (t < tt + 0.5) for (let k = 0; k < 10; k++) { const r = 18 + (t - tt) * 30; R.pset(Math.round(cx + Math.cos(k * 0.63) * r), Math.round(cy + 8 + Math.sin(k * 0.63) * r * 0.25), hex('#e8dcb8')); } }
    if (ent > 0 && sal < 1) {
      const u = ent < 1 ? ent : 1 - sal, wx = Math.round(cx + lado * 14), wy = Math.round(lerp(204, cy + 4, u));
      if (t < tt) pinta(cx, wy - 4);
      T.brazo(R, cx + lado * 40, Math.round(lerp(230, 200, u)), wx, wy, manga, -lado, { codo: [cx + lado * 40, Math.round(lerp(220, cy + 30, u))] });
    }
  }
};
const p6 = (t) => {
  const g = T.isla1795(R, t, { encuadre: 'claro', polea: false, cavado: 1 });
  // el que cava detrás del hoyo
  const golpe = Math.floor(t * 2) % 2; R.actor(EL.cavador2, 152, 136, t, { dir: -1 });
  { const mx = 152, my = 124, ang = golpe ? Math.PI - 0.4 : Math.PI + 1.0, px = Math.round(mx + Math.cos(ang) * 10), py = Math.round(my + Math.sin(ang) * 10); R.linea(mx, my, px, py, MADS); R.rect(px - 2, py, px + 1, py + 1, FIERRO); if (golpe) for (let k = 0; k < 4; k++) R.pset(140 + k * 2, 134 - ((k + Math.floor(t * 10)) % 3), hex('#9a7a5a')); }
  // el capataz llega con un cubo y se queda mirando la fibra
  const c = ruta(t, [[P6 + 0.6, 330, 156], [P6 + 2.8, 204, 154], [P6 + 4, 204, 154, -1]]);
  R.actor(EL.capataz, c.x, c.s, t, { dir: -1, anda: c.mv, sorpresa: t > NI + 0.2 && t < NI + 1.2 });
  { const bx = c.x - 4, by = c.s - 12; R.rect(bx, by, bx + 5, by + 5, K); R.rect(bx + 1, by + 1, bx + 4, by + 4, hex('#8a8a96')); }
  if (t > NI + 1.3) globo(c.x + 7, c.s - 27, '?');
  // el obrero de la fibra: la levanta, mira a un lado y a otro, piensa en un cocotero
  const sube = tramo(t, P6, P6 + 0.6), mira = t < P6 + 0.8 ? 1 : t < NORTE - 0.6 ? (Math.floor((t - P6) * 1.2) % 2 ? -1 : 1) : 1;
  const ox = 104, os = 156;
  sombra(ox + 7, os + 1, 8, 1, 0.3);
  const man = R.actor(EL.cavador, ox, os, t, { dir: mira, dedo: sube > 0.5, sorpresa: t > NI && t < NI + 0.8, triste: t > NI + 0.8 });
  if (sube > 0.5) fibra(man.mano[0] + mira * 2, man.mano[1] - 2, 0.5); else fibra(ox + (mira > 0 ? 16 : -2), os - 10, 0.5);
  const pu = tramo(t, NORTE - 0.3, NORTE + 0.2);
  if (pu > 0) {
    const cx = 164, cy = 74; piensa(cx, cy, 34, 22, ox + 12, os - 30, pu);
    if (pu >= 1) {
      // el cocotero: tronco curvo, penachos y cocos
      for (let i = 0; i < 30; i++) { const x = Math.round(cx - 6 + Math.sin(i * 0.08) * 6 + i * 0.25), y = cy + 18 - i; R.rect(x - 1, y, x + 1, y, i % 4 === 0 ? hex('#6a4a2a') : hex('#a8784a')); }
      const top = [cx + 3, cy - 12];
      for (let k = 0; k < 7; k++) { const a = -Math.PI + k * Math.PI / 6 + 0.15, L = 13; for (let i = 0; i < L; i++) { const x = Math.round(top[0] + Math.cos(a) * i), y = Math.round(top[1] + Math.sin(a) * i * 0.6 + i * i * 0.04); R.pset(x, y, hex('#2e7a3a')); R.pset(x, y + 1, i % 2 ? hex('#4aa24a') : hex('#2e7a3a')); } }
      for (const [dx, dy] of [[-2, 2], [2, 3], [0, 4]]) { R.disco(top[0] + dx, top[1] + dy, 2, hex('#4a2e18')); R.pset(top[0] + dx - 1, top[1] + dy - 1, hex('#8a6440')); }
      // la X roja en «not a single»
      const x = tramo(t, NI, NI + 0.25);
      if (x > 0) { const L = Math.round(22 * x); for (let i = -L; i <= L; i++) for (let w = -2; w <= 2; w++) { R.pset(cx + i + w, cy + i * 0.85 | 0, w === -2 || w === 2 ? K : hex('#d8282a')); R.pset(cx + i + w, cy - i * 0.85 | 0, w === -2 || w === 2 ? K : hex('#d8282a')); } }
    }
  }
  // una hoja de roble que cae sobre el sombrero
  { const u = tramo(t, P6 + 0.3, P6 + 2.4), x = Math.round(lerp(150, ox + 8, u) + Math.sin(u * 12) * 6), y = Math.round(lerp(40, os - 26, u)); if (t < P6 + 3.6) { R.poligono([[x, y], [x + 4, y - 2], [x + 6, y + 1], [x + 3, y + 3]], hex('#c88a2a')); R.pset(x + 1, y + 1, hex('#8a5a1a')); } }
  T.a_islaDelante(R, t, { encuadre: 'claro' });
};
const efectos = [[LLEGA, 'chof'], [ONSLOW, 'toc'], [NOVA - 0.2, 'lapiz'], [P3 - 0.3, 'toc'], [P3 + 0.5, 'golpecito'], [P3 + 2.6, 'chof'], [NOVENTA, 'pop'],
  [P4 + 0.6, 'maquina'], [P4 + 2.6, 'chof'], [APUNTA, 'papel'], [CARBON, 'golpecito'], [MASILLA, 'chof'], [COCO, 'golpecito'], [NORTE, 'pop'], [NI, 'aviso'], [NI + 1.3, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '1803', efectos, año: 1803 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['oi-piedra'] = ('La piedra de los símbolos', '''// OI-PIEDRA (frases 10–11). Cuatro planos:
// 1. el fondo del pozo a la luz del farol (1803): el cavador pica, y en «pull out» los dos levantan la losa del barro;
//    el capataz acerca su farol de mano y en «symbols» se encienden los símbolos tallados (rayas, puntos, triángulos);
//    «no one can read»: «?»;
// 2. («The stone») el taller del encuadernador de Halifax: la piedra expuesta en el escaparate, la gente se para a mirarla;
//    el encuadernador trabaja; en «lost» el calendario corre de año en año (1865 → 1919), fuera pasan días y noches, el
//    encuadernador se va, el polvo y la telaraña crecen y la piedra se deshace en polvo hasta dejar su hueco y un «?»;
// 3. («Much later») el despacho del profesor de noche, con velas: el profesor mira la piedra con la lupa; un visitante
//    entra, se lleva una copia («made the rounds») y en «40» el profesor levanta la hoja con el «40»;
// 4. («Two million») el inserto de la mesa: la pluma escribe «2,000,000» bajo los símbolos y el «40»; en «another
//    version» moja en tinta roja y en «10» escribe «/ 10»; en «no one» cae un goterón de tinta que lo emborrona todo y sale
//    el «?».''', COMUN + r'''
const a = (f) => en('piedra', f), b = (f) => en('descifra', f);
const P2 = a(0.5498), P3 = b(0), P4 = b(0.4286);
const PICA = a(0.05), SACA = a(0.11), SIMBOLOS = a(0.3265), LEER = a(0.40), PIERDE = a(0.604), NADIE = a(0.826);
const VUELTAS = b(0.1159), CUARENTA = b(0.2913), MILLON = b(0.4439), OTRA = b(0.6061), DIEZ = b(0.6977), NINGUNO = b(0.7837), DUDA = b(0.86);
const MAD = hex('#7a4a2a'), MADS = hex('#4a2a18'), FIERRO = hex('#8a96a2');
// un farol de mano con su halo
const farolHalo = (x, y, t) => { const fl = 0.5 + 0.5 * Math.sin(t * 13 + x); R.halo(x, y, 26 + fl * 3, [hex('#5a4030'), hex('#8a6038'), hex('#c89048')], 0.8); };
const farol = (x, y, t, halo = true) => { if (halo) farolHalo(x, y, t);
  R.linea(x, y - 7, x, y - 5, K); R.rect(x - 3, y - 5, x + 3, y + 4, K); R.rect(x - 2, y - 4, x + 2, y + 3, hex('#ffe08a')); R.pset(x, y - 1, BL); R.rect(x - 3, y + 4, x + 3, y + 5, hex('#3a3632')); };
const p1 = (t) => {
  const g = T.pozo(R, t, { encuadre: 'fondo' });
  const sube = tramo(t, SACA, SACA + 0.9);
  // la losa: tumbada en el barro (se ve de canto) y luego en alto, de cara
  const w = 60, hh = Math.round(lerp(9, 32, sube)), px = 132, py = Math.round(lerp(150, 116, sube));
  const brazos = sube > 0;
  // el farol del capataz: su luz va detrás de la gente (el farol en sí, en su mano, después)
  const c = ruta(t, [[0, 246, 164, -1], [SIMBOLOS - 1.2, 246, 164, -1], [SIMBOLOS - 0.1, 216, 164]]);
  farolHalo(c.x - 8, c.s - 11, t);
  R.actor(EL.cavador, sube > 0 ? Math.round(lerp(110, 127, Math.min(1, sube * 3))) : 104, 162, t, { dir: 1, brazos, sorpresa: t > SIMBOLOS && t < SIMBOLOS + 0.9, enfado: t > PICA && t < SACA });
  R.actor(EL.cavador2, sube > 0 ? 190 : 196, 162, t, { dir: -1, brazos, sorpresa: t > SIMBOLOS + 0.1 && t < SIMBOLOS + 1 });
  if (sube <= 0) { // el pico que golpea la losa
    const gp = Math.floor(t * 3) % 2, mx = 119, my = 150, an = gp ? 0.5 : -1.0; R.linea(mx, my, Math.round(mx + Math.cos(an) * 10), Math.round(my + Math.sin(an) * 10), MADS);
    const qx = Math.round(mx + Math.cos(an) * 10), qy = Math.round(my + Math.sin(an) * 10); R.rect(qx - 2, qy - 1, qx + 2, qy, FIERRO); }
  piedra(px, py, w, hh, sube < 1 ? 0 : tramo(t, SIMBOLOS - 0.2, SIMBOLOS + 0.5));
  if (sube <= 0) for (let i = px + 2; i < px + w - 2; i++) if (h(i, 1, 500) < 0.6) R.pset(i, py - 1 + Math.round(h(i, 2, 500) * 2), hex('#6a4a30'));
  if (sube > 0 && sube < 1) for (let k = 0; k < 10; k++) { const ff = ((t - SACA) * 2 + k * 0.1) % 1; R.pset(px + 4 + k * 4, Math.round(py + hh + ff * 18), k % 2 ? hex('#6a4a30') : hex('#8a6a48')); }
  // el capataz acerca el farol de mano
  R.actor(EL.capataz, c.x, c.s, t, { dir: -1, anda: c.mv, dedo: true, sorpresa: t > SIMBOLOS && t < LEER, habla: t > LEER && Math.sin(t * 8) > 0 });
  farol(c.x - 8, c.s - 11, t, false);
  if (t > SIMBOLOS) { const u = tramo(t, SIMBOLOS, SIMBOLOS + 0.6); for (let k = 0; k < 5; k++) { const sx = px + 6 + k * 12, sy = py - 3 - Math.round(u * 4 + (k % 2) * 3); if (u < 1 || Math.sin(t * 5 + k) > 0.3) { R.pset(sx, sy, BL); R.pset(sx - 1, sy, hex('#ffe890')); R.pset(sx + 1, sy, hex('#ffe890')); R.pset(sx, sy - 1, hex('#ffe890')); R.pset(sx, sy + 1, hex('#ffe890')); } } }
  if (t > LEER + 0.2) globo(px + w / 2, py - 2 - Math.round(Math.abs(Math.sin(t * 5)) * 2), '?');
};
// ── el taller del encuadernador de Halifax, con la piedra en el escaparate ──────────────────────────────────────────
const W1 = hex('#2e4a3a'), W2 = hex('#3a5a46'), W3 = hex('#24392e');
const taller = () => {
  // papel pintado verde con rombos y rayas
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) { const r = ((x + (y >> 3 & 1) * 6) % 12 === 0 && y % 8 === 3) || ((x + 3 + (y >> 3 & 1) * 6) % 12 === 0 && y % 8 === 7); R.pset(x, y, r ? W2 : x % 24 === 0 ? W3 : W1); }
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) if (h(x >> 2, y >> 2, 600) < 0.08) R.pset(x, y, W3);
  R.rect(0, 0, 319, 4, hex('#4a2e1c')); R.rect(0, 5, 319, 5, hex('#6a4a2a'));
  // friso de madera
  R.rect(0, 100, 319, 124, hex('#5a3820')); R.rect(0, 100, 319, 101, hex('#8a5a34')); for (let x = 4; x < 316; x += 36) { R.rect(x, 104, x + 30, 120, hex('#4a2c18')); R.rect(x + 1, 105, x + 29, 105, hex('#7a4e2c')); }
  // suelo de tablas
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 124) / 7), v = h(x >> 3, y, 601); R.pset(x, y, (y - 124) % 7 === 0 || (x + fila * 37) % 61 === 0 ? hex('#3a2416') : v > 0.8 ? hex('#7a5232') : hex('#6a4428')); }
  R.rect(0, 124, 319, 124, hex('#2a1810'));
  // alfombra
  R.rect(140, 160, 300, 179, hex('#5a1e1e')); R.rect(144, 163, 296, 179, hex('#7a2a24')); for (let x = 150; x < 292; x += 10) { R.pset(x, 168, hex('#c8a040')); R.pset(x + 5, 172, hex('#c8a040')); R.pset(x, 176, hex('#c8a040')); }
  // el escaparate: marco, montantes y alféizar (el cristal se pinta cada fotograma)
  R.rect(12, 26, 124, 106, K); R.rect(14, 27, 122, 104, hex('#6a4022')); R.rect(18, 29, 118, 96, K);
  R.rect(14, 96, 122, 104, hex('#8a5a34')); R.rect(10, 104, 126, 110, hex('#5a3820')); R.rect(10, 104, 126, 104, hex('#a8703c'));
  // cortinas
  for (const [x0, d] of [[6, 1], [118, -1]]) for (let y = 26; y < 112; y++) for (let i = 0; i < 12; i++) { const x = x0 + i * d, f = Math.sin(i * 1.4 + y * 0.03); R.pset(x, y, f > 0.5 ? hex('#a83a2e') : f < -0.5 ? hex('#5a1a18') : hex('#8a2a24')); }
  R.rect(2, 23, 132, 25, hex('#c8a040')); R.rect(2, 26, 132, 26, hex('#6a4a18'));
  // la librería: estantes con libros encuadernados
  R.rect(136, 15, 220, 122, K); R.rect(138, 16, 218, 122, hex('#5a3418'));
  for (const yb of [38, 62, 86, 110]) { R.rect(140, yb - 22, 216, yb, hex('#2a180e')); let x = 141; let k = yb;
    while (x < 214) { const w = 3 + Math.floor(h(x, k, 602) * 4), hb = 14 + Math.floor(h(x, k, 603) * 7), cs = ['#7a2a24', '#2a4a6a', '#3a5a2a', '#6a4a20', '#4a2a4a', '#8a6a3a', '#2a2a3a'], c = hex(cs[Math.floor(h(x, k, 604) * 7)]);
      if (h(x, k, 605) < 0.12 && x < 206) { R.poligono([[x, yb], [x + 3, yb], [x + 12, yb - hb + 4], [x + 9, yb - hb + 2]], c); x += 10; continue; }
      R.rect(x, yb - hb, x + w - 1, yb - 1, c); R.rect(x, yb - hb, x, yb - 1, mez(c, BL, 0.25)); R.pset(x + 1, yb - hb + 3, hex('#e8c860')); R.pset(x + 1, yb - 5, hex('#e8c860')); x += w + (h(x, k, 606) < 0.15 ? 2 : 0); }
    R.rect(138, yb + 1, 218, yb + 2, hex('#8a5a34')); }
  // tarros de cola y una prensa en el estante de arriba de la librería
  // calendario y reloj de pared (la zona de Atom queda libre)
  R.rect(228, 46, 258, 82, K); R.rect(229, 47, 257, 81, hex('#f2ecd8')); R.rect(229, 47, 257, 55, hex('#a83a2e')); R.pset(243, 45, K);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) R.rect(232 + i * 4, 72 + j * 3, 233 + i * 4, 72 + j * 3, hex('#8a8478'));
  R.rect(264, 50, 286, 112, K); R.rect(265, 51, 285, 111, hex('#6a3e20')); R.disco(275, 62, 9, K); R.disco(275, 62, 8, hex('#f2ecd8')); for (let k = 0; k < 12; k++) R.pset(Math.round(275 + Math.cos(k * 0.52) * 6), Math.round(62 + Math.sin(k * 0.52) * 6), K);
  R.rect(268, 74, 282, 108, hex('#2a180e'));
  // percha con pieles de cuero y herramientas
  R.rect(292, 52, 318, 54, hex('#8a5a34')); for (const [x, c] of [[296, '#8a5a2a'], [304, '#5a2a1e'], [312, '#a87a4a']]) { R.poligono([[x - 3, 55], [x + 4, 55], [x + 5, 92], [x + 1, 96], [x - 4, 90]], hex(c)); R.linea(x - 2, 60, x - 2, 88, mez(hex(c), K, 0.3)); }
  // el banco de trabajo (delante: se pinta encima de la gente en cada fotograma)
};
const banco = (t) => {
  R.rect(150, 128, 278, 133, K); R.rect(151, 128, 277, 132, hex('#9a6a3e')); R.rect(151, 128, 277, 128, hex('#c8945a'));
  R.rect(154, 133, 274, 162, K); R.rect(155, 133, 273, 161, hex('#6a4022')); for (const x of [160, 200, 240]) { R.rect(x, 137, x + 30, 157, hex('#5a341a')); R.rect(x + 1, 137, x + 29, 137, hex('#8a5a34')); R.disco(x + 15, 147, 1, hex('#c8a040')); }
  sombra(214, 164, 64, 2, 0.4);
  // encima: papeles, la cola con su pincel, el carrete de hilo, tijeras y un libro abierto en el bastidor de coser
  R.rect(156, 121, 176, 127, K); R.rect(157, 122, 175, 127, hex('#e8e0c8')); R.rect(157, 124, 175, 124, hex('#c8c0a8'));
  R.rect(182, 120, 188, 127, K); R.rect(183, 121, 187, 127, hex('#8a8a96')); R.linea(186, 112, 188, 121, hex('#c8a060'));
  R.rect(194, 123, 200, 127, K); R.rect(195, 124, 199, 126, hex('#e8e0c8')); R.pset(197, 125, hex('#a83a2e'));
  R.rect(244, 104, 246, 127, K); R.rect(268, 104, 270, 127, K); R.rect(244, 104, 270, 106, K); for (let i = 0; i < 6; i++) R.linea(248 + i * 4, 106, 248 + i * 4, 120, hex('#d8d2c2'));
  R.rect(242, 120, 272, 127, K); R.rect(243, 121, 256, 126, hex('#f2ecd8')); R.rect(258, 121, 271, 126, hex('#e8e0c8'));
};
const p2 = (t) => {
  fijo('taller', taller);
  const pasa = tramo(t, PIERDE, NADIE - 0.3);   // el tiempo que corre
  // por el cristal: la calle (cielo que pasa del día a la noche y vuelta, ladrillo de enfrente, farola) y la gente
  R.recorte([18, 30, 118, 95]);
  const dia = 0.5 + 0.5 * Math.cos((t - P2) * (1 + pasa * 14) * 1.3);
  for (let y = 30; y < 96; y++) for (let x = 18; x < 119; x++) R.pset(x, y, y < 48 ? mez(hex('#1e2650'), hex('#e8b070'), dia * (y - 30) / 18) : ((y % 6 === 0) || ((x + (Math.floor(y / 6) % 2) * 4) % 9 === 0)) ? mez(hex('#3a1e18'), hex('#5a3028'), dia) : mez(hex('#5a2a22'), hex('#a85a42'), dia));
  for (const wx of [30, 62, 94]) { R.rect(wx, 54, wx + 12, 70, K); R.rect(wx + 1, 55, wx + 11, 69, dia < 0.5 ? hex('#f2c860') : hex('#6a7a8a')); }
  { R.linea(108, 46, 108, 95, K); R.rect(105, 42, 111, 47, K); R.rect(106, 43, 110, 46, dia < 0.6 ? hex('#ffe08a') : hex('#c8c8b0')); }
  R.rect(18, 88, 118, 95, hex('#5a5a62')); for (let x = 18; x < 119; x += 7) R.pset(x, 90, hex('#3a3a42'));
  const gente = [[EL.vecina, 0, 1], [EL.capataz, 0.45, -1], [EL.geologo, 0.8, 1]];
  for (const [d, f, dir] of gente) { const u = (((t - P2) * (0.16 + pasa * 0.6) + f) % 1), x = Math.round(dir > 0 ? lerp(4, 132, u) : lerp(132, 4, u)); const mira = Math.abs(x - 62) < 14 && pasa < 0.2;
    R.actor(d, mira ? 62 : x, 95, t, { dir: mira ? 1 : dir, anda: !mira, dedo: mira, sorpresa: mira }); }
  R.recorte(null);
  // reflejo en el cristal y montantes
  for (let i = 0; i < 18; i++) R.pset(30 + i, 34 + i, mez(R.pget(30 + i, 34 + i), BL, 0.35)); for (let i = 0; i < 10; i++) R.pset(36 + i, 34 + i, mez(R.pget(36 + i, 34 + i), BL, 0.25));
  R.rect(67, 30, 69, 96, hex('#6a4022')); R.rect(18, 58, 118, 59, hex('#6a4022'));
  // la piedra en el escaparate, apoyada en su atril; se deshace en polvo y deja su hueco
  const se = tramo(t, PIERDE + 0.9, NADIE - 0.2), px = 44, py = 70;
  R.rect(56, 96, 80, 99, K); R.rect(57, 96, 79, 98, hex('#c8a040'));
  if (se < 1) { const antes = []; for (let y = py - 2; y < py + 30; y++) for (let x = px - 2; x < px + 52; x++) antes.push(R.pget(x, y));
    piedra(px, py, 48, 26, 1); let i = 0; if (se > 0) for (let y = py - 2; y < py + 30; y++) for (let x = px - 2; x < px + 52; x++, i++) if (h(x, y, 610) < se * 1.05) R.pset(x, y, antes[i]); }
  if (se > 0 && se < 1) for (let k = 0; k < 16; k++) { const ff = ((t - PIERDE) * 0.8 + k / 16) % 1; R.pset(px + 4 + (k * 3) % 44, Math.round(py + 26 - ff * 22 - (k % 4)), hex('#c8c0b0')); }
  if (se >= 1) { for (let x = px; x < px + 48; x += 2) { R.pset(x, py, hex('#c8c0b0')); R.pset(x + 1, py + 25, hex('#c8c0b0')); } for (let y = py; y < py + 26; y += 2) { R.pset(px, y, hex('#c8c0b0')); R.pset(px + 47, y, hex('#c8c0b0')); } }
  if (t > NADIE) { const u = tramo(t, NADIE, NADIE + 0.3); R.icono('?', px + 17, py + 2 + Math.round((1 - u) * 6), hex('#ffe08a'), K, 3); }
  // la telaraña que crece en la esquina y el polvo
  if (pasa > 0) { const L = Math.round(pasa * 18); for (let k = 0; k < 5; k++) R.linea(126, 28, Math.round(126 + Math.cos(1.6 + k * 0.32) * L), Math.round(28 + Math.sin(1.6 + k * 0.32) * L), hex('#c8c8c0'));
    for (let r = 4; r < L; r += 5) for (let k = 0; k < 4; k++) R.linea(Math.round(126 + Math.cos(1.6 + k * 0.32) * r), Math.round(28 + Math.sin(1.6 + k * 0.32) * r), Math.round(126 + Math.cos(1.6 + (k + 1) * 0.32) * r), Math.round(28 + Math.sin(1.6 + (k + 1) * 0.32) * r), hex('#a8a8a0')); }
  // el calendario: el año que corre
  const año = Math.round(lerp(1865, 1919, pasa)); R.rect(230, 57, 256, 69, hex('#f2ecd8')); R.numero(String(año), 231, 67, { color: K, sombra: false, fina: true });
  if (pasa > 0 && pasa < 1 && Math.floor(t * 12) % 2) { R.poligono([[229, 56], [257, 56], [252, 50], [234, 50]], hex('#e8e0c8')); }
  // el péndulo del reloj
  { const an = Math.sin(t * (3.2 + pasa * 10)) * 0.35, x = Math.round(275 + Math.sin(an) * 22), y = Math.round(76 + Math.cos(an) * 22); R.linea(275, 76, x, y, hex('#c8a040')); R.disco(x, y, 3, K); R.disco(x, y, 2, hex('#e8c860')); }
  { const an = (t - P2) * (1 + pasa * 30); R.linea(275, 62, Math.round(275 + Math.sin(an) * 6), Math.round(62 - Math.cos(an) * 6), K); R.linea(275, 62, Math.round(275 + Math.sin(an / 12) * 4), Math.round(62 - Math.cos(an / 12) * 4), K); }
  // el encuadernador: golpea el lomo de un libro con el mazo y, cuando corre el tiempo, se va
  const q = ruta(t, [[0, 206, 128, 1], [PIERDE + 0.3, 206, 128, 1], [PIERDE + 1.8, 330, 150]]);
  const golpea = t < PIERDE + 0.3, gp = golpea && Math.floor((t - P2) * 3) % 2;
  R.actor(EL.cavador, q.x, q.s, t, { dir: q.mv ? 1 : -1, anda: q.mv, pal: { C: hex('#e8e0c8'), c: hex('#3a3a4a'), F: hex('#3a3a4a') }, sonrisa: golpea });
  banco(t);
  if (golpea) { const mx = 200, my = gp ? 118 : 108; R.linea(mx + 6, my + 6, mx, my, MADS); R.rect(mx - 4, my - 3, mx + 3, my + 1, K); R.rect(mx - 3, my - 2, mx + 2, my, hex('#a8784a'));
    R.rect(186, 122, 204, 127, K); R.rect(187, 123, 203, 126, hex('#7a2a24')); }
  // el gato del taller, que mira el escaparate vacío
  T.gato(R, 132, 172, t, { dir: -1 });
  if (t > NADIE + 0.4) globo(135, 156, '?');
};
// ── el despacho del profesor, de noche, a la luz de las velas ─────────────────────────────────────────────────────
const despacho = () => {
  // pared: arriba papel granate con rayas, abajo friso de nogal
  for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) { let c = x % 10 < 5 ? hex('#5a2026') : hex('#4e1a20'); if (x % 10 === 7 && y % 4 === 0) c = hex('#7a3a2e'); if (h(x >> 2, y >> 2, 700) < 0.06) c = hex('#3e1418'); R.pset(x, y, c); }
  R.rect(0, 0, 319, 3, hex('#2a1a12')); R.rect(0, 4, 319, 5, hex('#6a4a2a'));
  R.rect(0, 96, 319, 140, hex('#4a2e1a')); R.rect(0, 96, 319, 97, hex('#8a5a34')); for (let x = 2; x < 318; x += 26) { R.rect(x, 101, x + 22, 136, hex('#3a2212')); R.rect(x + 1, 101, x + 21, 101, hex('#6a4426')); }
  // suelo de parqué en espiga y alfombra
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const f = ((x + y * 2) >> 3) % 2, v = h(x >> 2, y >> 1, 701); R.pset(x, y, (x + y * 2) % 8 === 0 ? hex('#2a1810') : f ? (v > 0.8 ? hex('#7a5232') : hex('#6a4428')) : (v > 0.8 ? hex('#6a4428') : hex('#5a3820'))); }
  R.rect(60, 158, 260, 179, hex('#2a3a5a')); R.rect(64, 161, 256, 179, hex('#3a4e72')); for (let x = 70; x < 252; x += 12) { R.poligono([[x, 170], [x + 5, 166], [x + 10, 170], [x + 5, 174]], hex('#c8a040')); }
  // la librería alta de la izquierda
  R.rect(4, 14, 70, 142, K); R.rect(6, 16, 68, 142, hex('#4a2a16'));
  for (const yb of [38, 62, 86, 110, 134]) { R.rect(8, yb - 21, 66, yb, hex('#1e120a')); let x = 9, k = yb;
    while (x < 64) { const w = 3 + Math.floor(h(x, k, 702) * 4), hb = 13 + Math.floor(h(x, k, 703) * 7), cs = ['#6a2420', '#24405a', '#2e4a26', '#5a3e1c', '#3e2440', '#7a5e32'], c = hex(cs[Math.floor(h(x, k, 704) * 6)]);
      R.rect(x, yb - hb, x + w - 1, yb - 1, c); R.pset(x + 1, yb - hb + 2, hex('#e8c860')); x += w; }
    R.rect(6, yb + 1, 68, yb + 2, hex('#7a4e2c')); }
  // la ventana de noche (lo de fuera se pinta cada fotograma) y el cuadro del pozo en corte
  R.rect(82, 20, 138, 94, K); R.rect(84, 22, 136, 92, hex('#5a3418')); R.rect(78, 92, 142, 96, hex('#7a4e2c'));
  R.rect(152, 22, 202, 74, K); R.rect(153, 23, 201, 73, hex('#c8a040')); R.rect(156, 26, 198, 70, hex('#e8dcb8'));
  R.rect(175, 30, 179, 66, hex('#6a5a48')); for (let y = 34; y < 66; y += 5) R.rect(171, y, 183, y, hex('#8a5a34')); R.rect(158, 30, 196, 30, hex('#5a8a3a')); for (let x = 184; x < 198; x++) for (let y = 40; y < 66; y++) if ((x + y) % 3 === 0) R.pset(x, y, hex('#5a7aa0'));
  // la puerta (se pinta cada fotograma) y su marco
  R.rect(222, 38, 266, 142, K); R.rect(224, 40, 264, 142, hex('#6a4426'));
  // el globo y el perchero de la derecha (debajo de la zona de Atom)
  R.linea(296, 112, 296, 140, K); R.rect(288, 140, 304, 142, K); R.disco(296, 100, 13, K); R.disco(296, 100, 12, hex('#3a6a8a'));
  for (const [x, y, r] of [[291, 96, 5], [300, 104, 4], [294, 106, 3]]) R.disco(x, y, r, hex('#c8b070')); R.anillo(296, 100, 14, hex('#c8a040'));
  R.linea(278, 60, 278, 142, K); R.linea(279, 60, 279, 142, hex('#5a3418')); R.poligono([[272, 62], [286, 62], [284, 74], [274, 74]], hex('#2a2a3a')); R.rect(270, 74, 288, 76, hex('#2a2a3a'));
};
const MESA = hex('#5a3418');
const mesa = () => {
  R.rect(92, 126, 228, 134, K); R.rect(93, 126, 227, 133, hex('#6a3e1e')); R.rect(93, 126, 227, 126, hex('#a8703c'));
  R.rect(98, 134, 222, 164, K); R.rect(99, 134, 221, 163, MESA); for (const x of [104, 166]) { R.rect(x, 138, x + 50, 158, hex('#4a2a14')); R.rect(x + 1, 138, x + 49, 138, hex('#7a4e2c')); R.disco(x + 25, 148, 1, hex('#c8a040')); }
  sombra(160, 166, 64, 2, 0.45);
  // papeles, libros, el tintero y la pluma, el calco de la piedra
  R.rect(100, 118, 122, 125, K); R.rect(101, 119, 121, 121, hex('#7a2a24')); R.rect(101, 122, 121, 125, hex('#2a4a6a')); R.rect(101, 122, 121, 122, hex('#e8c860'));
  R.rect(198, 121, 204, 125, K); R.rect(199, 122, 203, 125, hex('#1e1e2a')); R.linea(203, 121, 210, 110, BL); R.linea(204, 121, 211, 111, hex('#c8c0b0'));
  R.rect(126, 122, 150, 125, K); R.rect(127, 122, 149, 125, hex('#e8e0c8')); for (let x = 129; x < 148; x += 4) R.pset(x, 123, hex('#3a3a46'));
};
const vela = (x, y, t) => { const fl = 0.5 + 0.5 * Math.sin(t * 17 + x) * Math.sin(t * 5.3); R.halo(x, y - 6, 26 + fl * 3, [hex('#6a2a26'), hex('#8a4a2e'), hex('#c87a3a')], 0.8);
  R.rect(x - 4, y + 4, x + 4, y + 6, K); R.rect(x - 3, y + 4, x + 3, y + 5, hex('#c8a040')); R.rect(x - 1, y - 5, x + 1, y + 4, hex('#f2ecd8')); R.pset(x + 1, y - 3, hex('#d8d0b8'));
  R.pset(x, y - 6, hex('#ffd36a')); R.pset(x, y - 7, fl > 0.5 ? BL : hex('#ffd36a')); R.pset(x, y - 8, hex('#f6a94f')); if (fl > 0.6) R.pset(x, y - 9, hex('#e07b45')); };
const p3 = (t) => {
  fijo('despacho', despacho);
  // por la ventana: la noche, la luna, estrellas y una rama que se mece
  R.recorte([84, 22, 136, 92]);
  for (let y = 22; y < 93; y++) for (let x = 84; x < 137; x++) R.pset(x, y, (y < 50 ? hex('#141a3e') : hex('#1e2650')));
  for (let k = 0; k < 14; k++) { const x = 86 + (k * 37) % 48, y = 24 + (k * 23) % 40; R.pset(x, y, Math.sin(t * 2 + k) > 0.4 ? BL : hex('#8a8ab0')); }
  R.disco(120, 38, 7, hex('#f2ecd0')); R.disco(117, 36, 2, hex('#d8d0b0')); R.disco(122, 41, 1, hex('#d8d0b0'));
  { const sw = Math.sin(t * 1.3) * 3; for (let i = 0; i < 40; i++) { const x = 84 + i, y = Math.round(70 - i * 0.4 + Math.sin(i * 0.2) * 2 + sw * i / 40); R.pset(x, y, K); R.pset(x, y + 1, K); if (i % 6 === 3) R.disco(x, y - 2, 2, hex('#0a0e1e')); } }
  R.recorte(null);
  R.rect(109, 22, 111, 92, hex('#5a3418')); R.rect(84, 56, 136, 58, hex('#5a3418'));
  // la puerta: se abre para el visitante
  const ab = tramo(t, P3 + 0.4, P3 + 0.8) - tramo(t, P4 - 1.2, P4 - 0.8);
  R.rect(226, 42, 262, 142, hex('#1a0e08')); R.rect(226, 120, 262, 142, hex('#3a2a1e'));
  const wd = Math.round(36 * (1 - ab * 0.8)); R.rect(226, 42, 226 + wd, 142, hex('#7a4a2a')); R.rect(226 + wd, 42, 226 + wd, 142, K);
  if (wd > 20) { R.rect(230, 48, 226 + wd - 4, 86, hex('#6a3e22')); R.rect(230, 92, 226 + wd - 4, 136, hex('#6a3e22')); R.disco(226 + wd - 5, 96, 1, hex('#c8a040')); }
  // el visitante entra, recibe una copia y se la lleva
  const v = ruta(t, [[P3 + 0.6, 244, 160, -1], [VUELTAS + 0.2, 214, 160], [VUELTAS + 0.7, 214, 160, -1], [CUARENTA - 0.2, 250, 160], [P4 - 1.0, 290, 160]]);
  if (t > P3 + 0.5 && t < P4 - 0.9) { R.actor(EL.amigo1, v.x, v.s, t, { dir: v.d, anda: v.mv, sonrisa: t > VUELTAS + 0.6 });
    if (t > VUELTAS + 0.5) { const px = v.x + (v.d > 0 ? 12 : -4); R.rect(px, 140, px + 7, 148, K); R.rect(px + 1, 141, px + 6, 147, hex('#f2ecd8')); R.rect(px + 2, 143, px + 5, 143, hex('#3a3a46')); } }
  // el profesor, detrás de la mesa, con la lupa sobre el calco
  const alza = tramo(t, CUARENTA - 0.25, CUARENTA + 0.1);
  R.actor(EL.geologo, 152, 133, t, { dir: 1, dedo: alza > 0, sorpresa: t > CUARENTA && t < CUARENTA + 0.5, sonrisa: t > CUARENTA + 0.5, habla: t > VUELTAS - 0.2 && t < VUELTAS + 0.6 && Math.sin(t * 9) > 0 });
  mesa();
  // el calco de la piedra sobre la mesa y la lupa que lo recorre
  R.rect(158, 119, 192, 126, K); R.rect(159, 120, 191, 125, hex('#d8d0b8')); for (let i = 0; i < 4; i++) simbolo(SIMB[i * 3], 161 + i * 8, 120, hex('#3a3a46'), hex('#d8d0b8'));
  if (alza <= 0) { const lx = Math.round(170 + Math.sin(t * 1.4) * 10), ly = 112; R.linea(lx + 4, ly + 4, lx + 9, ly + 9, hex('#3a2418')); R.disco(lx, ly, 6, K); R.disco(lx, ly, 5, hex('#c8e0e8')); simbolo(SIMB[Math.floor((lx - 160) / 6) & 7], lx - 2, ly - 2, hex('#2a2a3a'), hex('#c8e0e8')); R.pset(lx - 3, ly - 3, BL); }
  vela(108, 118, t); vela(214, 118, t);
  // la hoja con el «40», en alto
  if (alza > 0) { const y = Math.round(lerp(118, 74, alza)); R.rect(144, y, 196, y + 30, K); R.rect(145, y + 1, 195, y + 29, hex('#f2ecd8')); R.rect(145, y + 1, 195, y + 3, hex('#e0d6bc'));
    if (t > CUARENTA) R.numero('40', 154, y + 24, { tam: 16 }); }
  // una polilla que ronda la vela
  { const a = t * 5, x = Math.round(214 + Math.cos(a) * 8), y = Math.round(104 + Math.sin(a * 1.3) * 5); R.pset(x, y, hex('#d8c8a8')); R.pset(x - 1, y - (Math.floor(t * 20) % 2), hex('#b8a888')); R.pset(x + 1, y - (Math.floor(t * 20) % 2), hex('#b8a888')); }
};
// ── el inserto de la mesa: la hoja de la «traducción» ────────────────────────────────────────────────────────────
const tablero = () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(y * 0.45 + Math.sin(x * 0.02 + y * 0.03) * 3 + h(x >> 5, y >> 2, 800) * 1.5), c = v > 0.75 ? hex('#5a3418') : v < -0.8 ? hex('#3a200e') : hex('#4a2a14'); R.pset(x, y, c); }
  for (let y = 0; y < 180; y++) if (y % 45 === 0) R.rect(0, y, 319, y, hex('#2a160a'));
  // el calco de la piedra (abajo a la izquierda, de través), un libro, las gafas, el reloj de bolsillo, lacre y monedas
  R.poligono([[4, 128], [58, 118], [66, 178], [8, 186]], K); R.poligono([[5, 129], [57, 119], [65, 177], [9, 185]], hex('#3a3a42'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) simbolo(SIMB[(i + j * 5) % SIMB.length], 12 + i * 9 + j, 130 - i * 2 + j * 11, hex('#c8c0b0'), hex('#2a2a32'));
  R.rect(262, 128, 318, 179, K); R.rect(263, 129, 318, 179, hex('#6a2420')); R.rect(263, 129, 318, 133, hex('#e8e0c8')); R.rect(266, 136, 318, 136, hex('#c8a040')); R.rect(266, 170, 318, 170, hex('#c8a040'));
  R.anillo(24, 34, 7, hex('#c8a040')); R.anillo(42, 34, 7, hex('#c8a040')); R.linea(31, 34, 35, 34, hex('#c8a040')); R.disco(24, 34, 5, hex('#5a6a7a')); R.disco(42, 34, 5, hex('#5a6a7a')); R.pset(22, 32, BL); R.pset(40, 32, BL);
  R.linea(17, 34, 6, 48, hex('#c8a040')); R.linea(49, 34, 58, 50, hex('#c8a040'));
  R.disco(290, 98, 11, K); R.disco(290, 98, 10, hex('#c8a040')); R.disco(290, 98, 8, hex('#f2ecd8')); R.rect(289, 84, 291, 87, hex('#c8a040')); for (let k = 0; k < 12; k++) R.pset(Math.round(290 + Math.cos(k * 0.52) * 6), Math.round(98 + Math.sin(k * 0.52) * 6), hex('#3a3a46'));
  R.rect(250, 104, 262, 108, K); R.rect(251, 105, 261, 107, hex('#a81a1a')); R.disco(266, 106, 3, hex('#a81a1a'));
  for (const [x, y] of [[20, 70], [30, 76], [14, 82]]) { R.disco(x, y, 4, K); R.disco(x, y, 3, hex('#c8a040')); R.pset(x - 1, y - 1, hex('#f2e090')); }
  // el tintero rojo (el negro se pinta cada fotograma: se vuelca)
  R.disco(286, 54, 9, K); R.disco(286, 54, 8, hex('#c8d0d8')); R.disco(286, 54, 5, hex('#8a1a1a')); R.pset(283, 50, BL);
  // la hoja (sale por arriba y por abajo: el inserto está cerca), renglones, la flecha y el boceto del pozo
  R.rect(72, 0, 248, 179, mez(hex('#4a2a14'), K, 0.5));
  R.rect(64, 0, 240, 179, K); R.rect(65, 0, 239, 179, hex('#f2ead2'));
  for (let y = 0; y < 180; y++) for (let x = 65; x < 240; x++) if (h(x >> 1, y >> 1, 801) < 0.05) R.pset(x, y, hex('#e4d8b8'));
  for (let y = 62; y < 176; y += 22) for (let x = 72; x < 234; x += 2) R.pset(x, y, hex('#c8d0e0'));
  for (let y = 0; y < 180; y += 3) R.pset(72, y, hex('#e0a0a0'));
  // los símbolos copiados arriba
  for (let i = 0; i < 17; i++) simbolo(SIMB[i], 78 + i * 9, 20, hex('#2a2a3a'), hex('#f2ead2'));
  R.rect(76, 30, 232, 30, hex('#8a8478'));
  // la flecha que baja del «40» al millón
  for (let y = 62; y < 124; y++) if (y % 4 < 3) { R.pset(88, y, hex('#3a3a5a')); R.pset(89, y, hex('#3a3a5a')); }
  for (let i = 0; i < 6; i++) { R.pset(88 - i, 124 - i, hex('#3a3a5a')); R.pset(89 + i, 124 - i, hex('#3a3a5a')); }
  // el boceto del pozo, a la derecha: las paredes, las plataformas y un cofre al fondo
  R.linea(206, 64, 206, 122, hex('#3a3a5a')); R.linea(226, 64, 226, 122, hex('#3a3a5a')); R.linea(198, 64, 234, 64, hex('#3a3a5a'));
  for (let y = 72; y < 120; y += 8) R.linea(207, y, 225, y, hex('#8a7a6a'));
  R.rect(210, 112, 222, 120, hex('#3a3a5a')); R.rect(211, 113, 221, 119, hex('#f2ead2')); R.rect(211, 115, 221, 115, hex('#3a3a5a')); R.pset(216, 117, hex('#3a3a5a'));
};
// el tintero negro: se vuelca (v 0–1) y su tinta corre hacia la hoja
const tintero = (v) => { const x = Math.round(lerp(262, 254, v)), y = Math.round(lerp(26, 34, v));
  if (v > 0) { R.disco(x - 4, y + 6, 7, K); R.linea(x - 6, y + 8, 236, 44, hex('#1e1e3a')); R.linea(x - 6, y + 9, 236, 45, hex('#1e1e3a')); }
  R.disco(x, y, 9, K); R.disco(x, y, 8, hex('#c8d0d8')); R.disco(x - Math.round(v * 3), y + Math.round(v * 3), 5, hex('#1a1a24')); R.pset(x - 3, y - 4, BL); };
const p4 = (t) => {
  fijo('tablero', tablero);
  const luz = 0.5 + 0.5 * Math.sin(t * 9) * Math.sin(t * 3.1);
  // la vela de la mesa, vista desde arriba, con su luz que tiembla y una gota de cera que baja
  R.halo(30, 100, 30 + luz * 3, [hex('#5a3418'), hex('#7a4a22'), hex('#b0783a')], 0.6); R.disco(30, 100, 10, K); R.disco(30, 100, 9, hex('#c8a040')); R.disco(30, 100, 5, hex('#f2ecd8')); R.disco(30, 100, 2, hex('#ffd36a')); R.pset(30, 100, BL);
  { const g = (t * 0.3) % 1; R.pset(34, Math.round(96 + g * 6), hex('#e8e0c8')); R.pset(35, Math.round(96 + g * 6), hex('#e8e0c8')); }
  // «40» (ya escrito), «2,000,000» que escribe la pluma, «/10» en rojo que escribe el lápiz
  R.numero('40', 80, 56, { tam: 16 });
  const n = Math.floor(tramo(t, MILLON - 0.1, MILLON + 1.2) * 150);
  if (n > 0) R.numero('2,000,000', 80, 148, { tam: 16, n });
  const d = Math.floor(tramo(t, DIEZ - 0.35, DIEZ + 0.3) * 80);
  if (d > 0) R.numero('/10', 124, 56, { tam: 16, n: d, rampa: [hex('#3a0a0a'), hex('#d8282a'), hex('#a81a1a'), hex('#6a0a0a')] });
  // el lápiz rojo se va, roza el tintero, que se vuelca: la tinta corre y lo emborrona todo; la duda
  const vuelca = tramo(t, NINGUNO - 0.35, NINGUNO);
  tintero(vuelca);
  const bor = tramo(t, NINGUNO, NINGUNO + 1.2);
  if (bor > 0) { const cx = 158, cy = 96, r = 8 + bor * 70;
    for (let y = 34; y < 160; y++) for (let x = 66; x < 239; x++) { const dd = Math.hypot((x - cx) / 1.5, y - cy) + (h(x >> 1, y >> 1, 802) - 0.5) * 14; if (dd < r * 0.55) R.pset(x, y, mez(R.pget(x, y), hex('#1e1e3a'), 0.78)); else if (dd < r * 0.7 && (x + y) % 2) R.pset(x, y, mez(R.pget(x, y), hex('#3a3a5a'), 0.5)); }
    for (let i = 0; i < 40 * bor; i++) { const x = Math.round(lerp(236, cx + 30, i / 40)), y = Math.round(lerp(45, cy - 10, i / 40)); R.disco(x, y, 2, hex('#1e1e3a')); } }
  if (t > DUDA) { const u = tramo(t, DUDA, DUDA + 0.3), s = 4 + Math.round(u); R.icono('?', 158 - Math.round(2.5 * s), 98 - Math.round(3.5 * s) + Math.round(Math.sin(t * 4) * 2), hex('#ffd36a'), K, s); }
  // la mano de abajo, con la pluma: entra, escribe el millón y se va
  if (t < OTRA + 0.2) {
    let wx, wy;
    if (t < MILLON - 0.1) { const u = tramo(t, P4, MILLON - 0.1); wx = lerp(300, 82, u); wy = lerp(200, 146, u); }
    else if (t < MILLON + 1.25) { wx = 82 + tramo(t, MILLON - 0.1, MILLON + 1.2) * 144; wy = 146 + Math.sin(t * 30) * 1.5; }
    else { const u = tramo(t, MILLON + 1.3, OTRA + 0.2); wx = lerp(226, 300, u); wy = lerp(146, 210, u); }
    wx = Math.round(wx); wy = Math.round(wy);
    R.linea(wx, wy, wx + 4, wy - 4, hex('#1a1a24'));
    T.brazo(R, wx + 46, wy + 52, wx + 13, wy + 1, '#3a3a4a', -1, { codo: [wx + 34, wy + 26] });
    for (let i = 0; i < 20; i++) { const x = wx + 4 + i, y = wy - 4 - Math.round(i * 1.1); R.pset(x, y, BL); R.pset(x + 1, y, i > 6 ? hex('#d8d2c2') : BL); if (i > 6) R.pset(x - 1, y - 1, hex('#e8e4d8')); }
  }
  // la mano de arriba, con el lápiz rojo: baja, escribe «/10», se va y roza el tintero
  if (t > OTRA - 0.2 && t < NINGUNO + 0.3) {
    let wx, wy;
    if (t < DIEZ - 0.35) { const u = tramo(t, OTRA - 0.2, DIEZ - 0.35); wx = lerp(210, 124, u); wy = lerp(-40, 50, u); }
    else if (t < DIEZ + 0.35) { wx = 124 + tramo(t, DIEZ - 0.35, DIEZ + 0.3) * 48; wy = 50 + Math.sin(t * 30) * 1.5; }
    else { const u = tramo(t, DIEZ + 0.4, NINGUNO + 0.3); wx = lerp(172, 270, u); wy = lerp(50, -30, u) + Math.sin(u * Math.PI) * 14; }
    wx = Math.round(wx); wy = Math.round(wy);
    // el lápiz: de la punta (wx, wy) hacia arriba a la derecha
    for (let i = 0; i < 16; i++) { const x = wx + Math.round(i * 0.6), y = wy - i; R.pset(x, y, i < 2 ? hex('#a81a1a') : i < 4 ? hex('#e8c890') : hex('#c8282a')); R.pset(x + 1, y, i < 4 ? hex('#c8a070') : hex('#8a1a1a')); }
    T.brazo(R, wx + 40, wy - 54, wx + 12, wy - 8, '#5a3a24', -1, { codo: [wx + 34, wy - 26] });
  }
};
const año = (t) => t < P2 ? 1803 : t < P3 ? Math.round(lerp(1865, 1919, tramo(t, PIERDE, NADIE - 0.3))) : null;
const efectos = [[PICA, 'golpecito'], [SACA + 0.1, 'chof'], [SIMBOLOS, 'brillo'], [LEER + 0.2, 'pop'],
  [P2 + 0.35, 'golpecito'], [P2 + 1.0, 'golpecito'], [PIERDE + 0.2, 'tic'], [PIERDE + 1.2, 'rafaga'], [NADIE, 'pop'], [NADIE + 0.5, 'miau'],
  [P3 + 0.4, 'puerta'], [VUELTAS + 0.5, 'papel'], [CUARENTA, 'pop'], [MILLON, 'lapiz'], [DIEZ - 0.3, 'lapiz'], [NINGUNO, 'chof'], [DUDA, 'aviso']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')
