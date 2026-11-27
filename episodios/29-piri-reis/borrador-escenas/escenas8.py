E = {}

# piezas comunes de las tres escenas (se pegan al principio de cada cuerpo): trama de Bayer, capas fijas en búfer,
# degradados tramados, madera con vetas, nubes de tres tonos a tres velocidades, pájaros, globos de símbolo, destellos
COMUN = r'''
const K = hex('#1c1424');
const NOG = [hex('#5a3420'), hex('#432414'), hex('#6e4229'), hex('#2e180c')];
const PERG = [hex('#e8d4a4'), hex('#d8c08c'), hex('#b89a64'), hex('#f2e2b8')], TIN = hex('#2a2018'), TROJA = hex('#a83224'), TVERDE = hex('#3a6a3a');
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const tr = (x, y, a) => a * 16 > BAY[((y & 3) << 2) | (x & 3)] + 0.5;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const CAPAS = new Map();
// la capa fija de un plano: se pinta una vez en su búfer y en cada fotograma se copia entera
const capa = (k, pintar) => { let b = CAPAS.get(k); if (!b) { b = R.nuevo(); const prev = R.usar(b); pintar(); R.usar(prev); CAPAS.set(k, b); } R.copiar(b); return b; };
// la capa sin copiarla (para mezclar dos búferes a mano)
const capaB = (k, pintar) => { let b = CAPAS.get(k); if (!b) { b = R.nuevo(); const prev = R.usar(b); pintar(); R.usar(prev); CAPAS.set(k, b); } return b; };
// la capa de delante: solo se copian los píxeles pintados (el búfer nuevo empieza vacío)
const delante = (k, pintar) => { const b = capaB(k, pintar), B = R.buf; for (let i = 0; i < 57600; i++) if (b[i]) B[i] = b[i]; return b; };
// devuelve un trozo de una capa a la pantalla (para lo que va delante de un personaje)
const restaurar = (b, x0, y0, x1, y1) => { const B = R.buf; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = b[y * 320 + x]; };
const grad = (x0, y0, x1, y1, cols) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i; for (let x = x0; x <= x1; x++) R.pset(x, y, tr(x, y, f) ? cols[i + 1] : cols[i]); } };
const caja = (x0, y0, x1, y1, c, borde = K) => { R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, borde); R.rect(x0, y0, x1, y1, c); };
const sombrear = (x0, y0, x1, y1, c, a) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (tr(x, y, a)) R.pset(x, y, c); };
const oscurecer = (x0, y0, x1, y1, a, c = K) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) R.pset(x, y, mez(R.pget(x, y), c, a)); };
// un halo de luz: mezcla hacia c con caída radial (sin tramas duras)
const halo = (cx, cy, r, c, a) => { for (let y = Math.max(0, Math.round(cy - r)); y <= Math.min(179, Math.round(cy + r)); y++) for (let x = Math.max(0, Math.round(cx - r)); x <= Math.min(319, Math.round(cx + r)); x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1) R.pset(x, y, mez(R.pget(x, y), c, a * (1 - d) * (1 - d))); } };
// madera de tablas horizontales con vetas, nudos y juntas: cols = [base, sombra, luz, junta]
const madera = (x0, y0, x1, y1, cols, alto = 9, k = 0) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / alto), j = (y - y0) % alto; for (let x = x0; x <= x1; x++) {
  let c = cols[0]; const v = Math.sin(x * 0.09 + fila * 3.1 + Math.sin(x * 0.023 + fila) * 2.4 + j * 0.7);
  if (v > 0.82) c = cols[1]; else if (v < -0.9) c = cols[2]; if (hh(x >> 1, y, k + fila) > 0.97) c = cols[1];
  if (j === 0) c = cols[3]; else if (j === 1) c = cols[2]; if ((x + fila * 37 + k * 11) % 71 === 0 && j > 0) c = cols[3];
  R.pset(x, y, c); } }
  for (let n = 0; n < (x1 - x0) * (y1 - y0) / 900; n++) { const nx = x0 + Math.round(hh(n, 1, k + 50) * (x1 - x0)), ny = y0 + Math.round(hh(n, 2, k + 50) * (y1 - y0)); R.disco(nx, ny, 1.6, cols[1]); R.pset(nx, ny, cols[3]); } };
// yeso o estuco con manchas, puntos y alguna grieta: cols = [base, sombra, luz]
const yeso = (x0, y0, x1, y1, cols, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = hh(x >> 3, y >> 3, k) * 0.6 + hh(x >> 1, y >> 1, k + 1) * 0.4;
  R.pset(x, y, n > 0.78 && tr(x, y, 0.5) ? cols[1] : n < 0.16 && tr(x, y, 0.5) ? cols[2] : hh(x, y, k + 2) > 0.985 ? cols[1] : cols[0]); }
  for (let g = 0; g < 3; g++) { let gx = x0 + 20 + hh(g, 9, k) * (x1 - x0 - 40), gy = y0 + 6 + hh(g, 8, k) * (y1 - y0 - 20); for (let i = 0; i < 14; i++) { R.pset(Math.round(gx), Math.round(gy), cols[1]); gx += hh(g, i, k + 3) - 0.5; gy += 0.8; } } };
// suelo de tablas en perspectiva suave (de y0 a y1), con juntas y brillo
const tablas = (y0, y1, cols, k = 0) => { for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / 6); for (let x = 0; x < 320; x++) { const off = (f * 53 + k) % 47, j = (x + off) % 47 === 0;
  R.pset(x, y, (y - y0) % 6 === 0 ? cols[3] : j ? cols[3] : hh(x >> 2, y, k + f) > 0.93 ? cols[1] : Math.sin(x * 0.07 + f * 2.3) > 0.9 ? cols[2] : cols[0]); } } };
const nube = (cx, cy, w, c1, c2, c3) => {
  const r = w / 5, P = [[-1.6, .4, .9], [-.6, -.2, 1.2], [.6, -.4, 1.3], [1.6, .3, 1], [0, .5, 1.1]];
  for (const [a, b, q] of P) R.disco(Math.round(cx + a * r), Math.round(cy + b * r + 1), Math.round(q * r), c3);
  for (const [a, b, q] of P) R.disco(Math.round(cx + a * r), Math.round(cy + b * r), Math.round(q * r), c2);
  for (const [a, b, q] of P.slice(1, 3)) R.disco(Math.round(cx + a * r - 1), Math.round(cy + b * r - 1), Math.max(1, Math.round(q * r * .6)), c1);
};
// nubes de tres tonos a tres velocidades dentro de cl (pone y quita el recorte)
const nubes = (cl, t, y0, y1, cols, n = 6, v = 1, w0 = 12) => { R.recorte(cl); for (let k = 0; k < n; k++) { const c3 = k % 3, vel = (1.5 + c3 * 2.5) * v, w = w0 + c3 * 6 + hh(k, 1) * 8, ancho = cl[2] - cl[0] + 2 * w + 20;
  const x = cl[0] - w - 10 + ((hh(k, 2) * ancho + t * vel) % ancho), y = y0 + hh(k, 3) * (y1 - y0); nube(x, y, w, cols[0], cols[1], cols[2]); } R.recorte(null); };
const pajaros = (t, x0, x1, y, n = 3, v = 9, c = K) => { for (let k = 0; k < n; k++) { const x = Math.round(x0 + ((hh(k, 7) * (x1 - x0) + t * v * (1 + (k % 2) * 0.3)) % (x1 - x0))), yy = Math.round(y + hh(k, 8) * 10 + Math.sin(t * 2 + k) * 2), a = Math.sin(t * 11 + k * 2) > 0 ? 1 : 0;
  R.pset(x, yy, c); R.pset(x - 1, yy - a, c); R.pset(x + 1, yy - a, c); R.pset(x - 2, yy - 1 + a, c); R.pset(x + 2, yy - 1 + a, c); } };
// el globo grande de un símbolo (se lee a 640 px): «!», «?» o «X» a escala 2 sobre fondo claro, con su piquito abajo en (x, y)
const globo = (x, y, ic, col = hex('#c8382e')) => { R.rect(x - 9, y - 18, x + 9, y - 1, K); R.rect(x - 8, y - 17, x + 8, y - 2, hex('#fbf6ea')); R.rect(x - 8, y - 3, x + 8, y - 2, hex('#d8d0c0'));
  R.rect(x - 2, y, x + 1, y, K); R.rect(x - 1, y + 1, x, y + 1, K); R.rect(x - 1, y - 1, x, y, hex('#fbf6ea')); R.icono(ic, x - 6, y - 16, col, K, 2); };
const destello = (x, y, u, c = hex('#fff6c0')) => { if (u <= 0 || u >= 1) return; const r = Math.round(2 + 4 * Math.sin(u * Math.PI)); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } R.pset(x - 1, y - 1, c); R.pset(x + 1, y + 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); };
// una polilla que da vueltas alrededor de una luz
const polilla = (cx, cy, t, r = 9) => { const a = t * 3.1, x = Math.round(cx + Math.cos(a) * r + Math.sin(t * 7) * 2), y = Math.round(cy + Math.sin(a * 1.3) * r * 0.6); const al = Math.sin(t * 30) > 0; R.pset(x, y, hex('#5a4a3a')); R.pset(x - 1, y - (al ? 1 : 0), hex('#c8b898')); R.pset(x + 1, y - (al ? 1 : 0), hex('#c8b898')); };
// la llama de una vela que tiembla, con su halo (x, y: la punta del pabilo)
const llama = (x, y, t, k = 0) => { const f = Math.sin(t * 13 + k) * 0.6 + Math.sin(t * 7.3 + k * 2) * 0.4, dx = Math.round(f);
  halo(x, y - 3, 22, hex('#ffd890'), 0.35 + 0.05 * f); R.disco(x + dx * 0.5, y - 3, 2.4, hex('#f0902a')); R.rect(x - 1 + dx, y - 7, x + dx, y - 4, hex('#ffd860')); R.pset(x + dx, y - 8, hex('#fff4c0')); R.rect(x, y - 3, x, y - 1, hex('#fff8e0')); R.pset(x, y, K); };
// una vela en su palmatoria (x, y: la base)
const vela = (x, y, t, alto = 12, k = 0) => { R.rect(x - 7, y - 2, x + 7, y, K); R.rect(x - 6, y - 2, x + 6, y - 1, hex('#b8862a')); R.rect(x - 6, y - 2, x - 2, y - 2, hex('#f0c860'));
  R.rect(x - 3, y - 2 - alto, x + 2, y - 3, K); R.rect(x - 2, y - 1 - alto, x + 1, y - 3, hex('#f4ecd8')); R.rect(x - 2, y - 1 - alto, x - 2, y - 3, hex('#ffffff')); R.rect(x + 1, y - 1 - alto, x + 1, y - 3, hex('#d8cca8')); R.pset(x + 2, y - alto + 3, hex('#f4ecd8'));
  llama(x, y - 2 - alto, t, k); };
// una pluma de escribir con la punta en (x, y), inclinada hacia arriba a la derecha (dx: 1) o a la izquierda (-1)
const pluma = (x, y, dx = 1, c = hex('#f4f0e4')) => { for (let i = 0; i < 18; i++) { const px = x + Math.round(i * 0.55 * dx), py = y - i; R.pset(px, py, i < 3 ? K : hex('#8a7a5a')); if (i > 5) { const w = Math.round(Math.sin((i - 5) / 13 * Math.PI) * 3); for (let s = 1; s <= w; s++) { R.pset(px + s * dx, py + 1, s === w ? hex('#a8a090') : c); R.pset(px - s * dx, py - 1, s === w ? hex('#a8a090') : c); } } } };
// una gota que cae de (x, y0) a (x, y1) con la fracción u
const gota = (x, y0, y1, u, c) => { if (u <= 0 || u >= 1) return; const y = Math.round(y0 + (y1 - y0) * u * u); R.rect(x - 1, y - 1, x + 1, y + 1, c); R.pset(x, y - 2, c); R.pset(x - 1, y - 1, mez(c, hex('#ffffff'), 0.5)); };
// un gato sentado (x, y: los pies), mirando a dir; la cola se mueve
const gato = (x, y, t, dir = 1, col = hex('#4a4048'), luz = hex('#6a6070'), mira = 0) => { const cola = Math.round(Math.sin(t * 2.2) * 3);
  R.disco(x, y - 4, 4, K); R.disco(x, y - 4, 3, col); R.rect(x - 3, y - 2, x + 3, y, K); R.rect(x - 2, y - 2, x + 2, y - 1, col);
  const hx = x + dir * 2, hy = y - 9 - mira; R.disco(hx, hy, 3.2, K); R.disco(hx, hy, 2.4, col); R.pset(hx - 2, hy - 3, K); R.pset(hx + 2, hy - 3, K); R.pset(hx - 2, hy - 2, col); R.pset(hx + 2, hy - 2, col);
  R.pset(hx + dir, hy, hex('#c8e070')); R.pset(hx + dir * 2, hy, K); R.pset(hx - 1, hy - 1, luz);
  for (let i = 0; i < 7; i++) R.pset(x - dir * (4 + i), y - 1 - Math.round(Math.max(0, i - 3) * (0.6 + cola * 0.12)), K); };
'''

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['pr-pergamino'] = ('Se acaba el pergamino', '''// PR-PERGAMINO (frase 21), sin cartela; la barra marca 1513 (y 1570 en el último plano; sin año en el plano griego).
// Cinco planos:
// 1. «Most likely, the coast turns east because the parchment was running out» (0–4,70 s): LOCAL la mesa de Piri,
//    cenital, a la luz de la vela: la pluma (en la mano canónica) baja trazando la costa de Sudamérica, llega al borde
//    roto del pergamino, duda y en «turns east» la tuerce hacia el este por la franja que queda (gag 6, el golpe);
//    detrás de la pluma salen la tierra, la aguada y los montes; luego da dos toquecitos en el borde («running out»).
// 2. «Piri Reis had to fit the south of South America into the space he had left» (4,70–9,00 s): LOCAL el rincón de
//    Piri de noche: Piri entra con el compás, lo acerca al tablero inclinado («fit»), mide; en «space he had left» la
//    franja que queda parpadea con un recuadro de puntos y él se sorprende; luego sonríe. La lámpara se mece, el gato
//    mueve la cola, en la ventana la luna, las estrellas y el farol de una galera.
// 3. «and mapmakers sometimes turned a coastline to make it fit» (9,00–12,65 s): LOCAL un taller de cartógrafos con tres
//    mapas clavados en la pared; el cartógrafo los señala uno a uno y en cada uno la costa que se tuerce en el borde se
//    enciende con su flecha curva («turned», «coastline», «fit»); el aprendiz muele pigmento al fondo.
// 4. «And since the ancient Greeks, people had believed in a great southern land no one had seen» (12,65–16,41 s):
//    LOCAL un pórtico griego junto al mar: el sabio señala el mundo pintado en una tabla y en «great southern land» pinta
//    con el pincel una tierra enorme en la mitad de abajo; en «no one» le sale un «?».
// 5. «because it had to exist to balance the world» (16,41 s–fin): LOCAL un gabinete de 1570: el mapa ovalado del mundo
//    con la Terra Australis enorme abajo (su contorno late en oro) y, en la mesa, una balanza con el globo en un platillo;
//    en «exist» una mano pone una tierra austral de madera en el otro y en «balance the world» la balanza se equilibra.''', COMUN + r'''
const P2 = en('pergamino', .2149), P3 = en('pergamino', .4349), P4 = en('pergamino', .6216), P5 = en('pergamino', .814);
// ── 1 · la mesa de Piri, cenital: la pluma tuerce la costa en el borde ──
const bordeY = (x) => 148 + Math.round(2 * Math.sin(x * 0.13) + hh(x >> 2, 3, 40) * 2.4);
const bordeX = (y) => 256 + Math.round(2 * Math.sin(y * 0.11 + 1) + hh(y >> 2, 4, 40) * 2.4);
const dentro = (x, y) => y <= bordeY(x) && x <= bordeX(y);
const COSTA_A = [[60, -2], [66, 10], [76, 18], [82, 30], [94, 40], [98, 52], [92, 62], [98, 74], [106, 86], [108, 100], [112, 112], [114, 124]];
const COSTA_B = [[114, 124], [112, 132], [110, 139], [114, 143], [124, 144], [140, 141], [156, 144], [172, 141], [190, 144], [208, 141], [226, 144], [242, 142], [258, 146]];
const muestras = (pl) => { const S = []; for (let i = 0; i < pl.length - 1; i++) { const [a, b] = pl[i], [c, d] = pl[i + 1], n = Math.max(1, Math.ceil(Math.hypot(c - a, d - b))); for (let k = 0; k < n; k++) S.push([a + (c - a) * k / n, b + (d - b) * k / n]); } S.push(pl[pl.length - 1]); return S; };
const SB = muestras(COSTA_B), BAJA = SB.findIndex(([x, y]) => y >= 143) / SB.length;
const mesaPG = () => { madera(0, 0, 319, 179, NOG, 11, 3); };
// el pergamino con el mar, la rosa y sus rumbos, la tierra (hasta yTierra), los montes y las notas
const pintaPergamino = (completo) => {
  mesaPG();
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (dentro(x, y)) { const n = hh(x >> 2, y >> 2, 41) * 0.6 + hh(x, y, 42) * 0.4; let c = n > 0.8 ? PERG[1] : n < 0.12 ? PERG[3] : PERG[0];
    const db = Math.min(bordeY(x) - y, bordeX(y) - x); if (db < 3) c = PERG[2]; else if (db < 6 && tr(x, y, 0.5)) c = PERG[1]; if (hh(x, y, 43) > 0.992) c = PERG[2]; R.pset(x, y, c); }
  // las aureolas de agua y las manchas de edad
  for (const [cx, cy, r] of [[204, 30, 13], [40, 128, 9], [168, 96, 7], [236, 112, 10]]) for (let a = 0; a < 6.28; a += 0.04) { const x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r * 0.8); if (dentro(x, y)) R.pset(x, y, PERG[1]); }
  // los pliegues: uno de arriba abajo y uno de lado a lado, con su luz y su sombra
  for (let y = 0; y < 150; y++) { const x = 172 + Math.round(Math.sin(y * 0.05) * 1.5); if (dentro(x, y)) { R.pset(x, y, PERG[2]); R.pset(x + 1, y, PERG[3]); } }
  for (let x = 0; x < 258; x++) { const y = 70 + Math.round(Math.sin(x * 0.04) * 1.5); if (dentro(x, y) && x > 100) { R.pset(x, y, PERG[2]); R.pset(x, y + 1, PERG[3]); } }
  // la rosa de los vientos de dieciséis rumbos y sus líneas, gastadas, por el mar
  const RX = 196, RY = 54;
  for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, c = k % 4 === 0 ? TROJA : k % 2 === 0 ? TVERDE : TIN;
    for (let r = 20; r < 260; r += 1) { const x = Math.round(RX + Math.cos(a) * r), y = Math.round(RY + Math.sin(a) * r); if (!dentro(x, y) || x < 0 || y < 0) break; if ((r >> 1) % 2 === 0) R.pset(x, y, mez(R.pget(x, y), c, 0.55)); } }
  for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8 - Math.PI / 2, L = k % 4 === 0 ? 19 : k % 2 === 0 ? 13 : 8, c = k % 4 === 0 ? TROJA : k % 2 === 0 ? TVERDE : hex('#c89a30');
    const ax = RX + Math.cos(a) * L, ay = RY + Math.sin(a) * L, b1 = a + 0.3, b2 = a - 0.3; R.poligono([[RX + Math.cos(b1) * 4, RY + Math.sin(b1) * 4], [ax, ay], [RX + Math.cos(b2) * 4, RY + Math.sin(b2) * 4]], c); R.linea(RX, RY, Math.round(ax), Math.round(ay), K); }
  R.disco(RX, RY, 4, K); R.disco(RX, RY, 3, hex('#d8a838')); R.pset(RX, RY, TROJA);
  R.poligono([[RX - 3, RY - 22], [RX, RY - 28], [RX + 3, RY - 22], [RX, RY - 24]], TROJA);   // la flor de lis del norte
  // las olas «~» y las notas en garabato (sin letras), rojas y negras
  for (const [x, y] of [[150, 20], [230, 88], [140, 112], [196, 120], [242, 20], [128, 60]]) for (let i = 0; i < 7; i++) R.pset(x + i, y + (i % 4 < 2 ? 0 : 1), hex('#5a7a8a'));
  const garabato = (x0, y0, n, c) => { for (let r = 0; r < n; r++) for (let i = 0; i < 26; i += 1) { const y = y0 + r * 5; if (hh(i, r, x0) > 0.35) R.pset(x0 - i, y + (hh(i, r + 9, x0) > 0.7 ? -1 : 0), c); if (hh(i, r, x0 + 1) > 0.86) { R.pset(x0 - i, y - 2, c); R.pset(x0 - i, y - 1, c); } } };
  garabato(160, 28, 3, TROJA); garabato(250, 100, 2, TIN); garabato(232, 128, 1, TROJA);
  // la tierra: el poligono de la costa (la parte hecha y, si completo, la que traza la pluma) con su aguada y su rayado
  const pol = completo ? [[-2, -2], ...COSTA_A, ...COSTA_B, [262, 170], [-2, 170]] : [[-2, -2], ...COSTA_A, [-2, 124]];
  R.poligono(pol, hex('#d8c48c'));
  for (let y = 0; y < 180; y++) for (let x = 0; x < 262; x++) { if (!dentro(x, y)) continue; const c = R.pget(x, y); if (c !== hex('#d8c48c')) continue;
    const n = hh(x >> 2, y >> 2, 44) * 0.7 + hh(x >> 1, y >> 1, 45) * 0.3; R.pset(x, y, n > 0.62 ? (tr(x, y, 0.5) ? hex('#a8b874') : hex('#c8c488')) : n < 0.25 ? (tr(x, y, 0.5) ? hex('#d8a874') : hex('#e2c898')) : (x + y) % 5 === 0 ? hex('#c8b47c') : hex('#e0cc98')); }
  // la aguada verdeazul por el lado del mar y la costa a tinta con su borde oscuro por dentro
  const pinta = (S) => { for (const [x, y] of S) { for (let d = 1; d <= 4; d++) { const px = Math.round(x + d), py = Math.round(y + (y > 138 ? -d : 0)); if (dentro(px, py) && tr(px, py, 1 - d / 5)) R.pset(px, py, mez(R.pget(px, py), hex('#5aa0a0'), 0.45)); } } for (const [x, y] of S) { R.pset(Math.round(x), Math.round(y), TIN); R.pset(Math.round(x) - 1, Math.round(y), mez(TIN, hex('#a08050'), 0.5)); } };
  pinta(muestras(COSTA_A)); if (completo) pinta(SB);
  // los Andes en hilera, los ríos, las palmeras y un ciervo
  for (let k = 0; k < 9; k++) { const x = 8 + k * 7 + (k % 2) * 2, y = 30 + k * 11; R.poligono([[x - 4, y + 3], [x, y - 3], [x + 4, y + 3]], hex('#8a6a3a')); R.linea(x, y - 3, x + 4, y + 3, hex('#5a3a1a')); R.pset(x - 1, y - 1, hex('#f2e2b8')); }
  for (const [x0, y0, L] of [[96, 46, 40], [104, 92, 50]]) { for (let i = 0; i < L; i++) R.pset(Math.round(x0 - i), Math.round(y0 + Math.sin(i * 0.3) * 2 + i * 0.25), hex('#3a6a9a')); }
  for (const [x, y] of [[70, 50], [52, 76], [80, 104], [40, 112]]) { R.linea(x, y, x, y - 7, hex('#6a4a2a')); for (const d of [-3, -2, 2, 3]) R.pset(x + d, y - 7 + Math.abs(d) - 1, TVERDE); R.rect(x - 1, y - 8, x + 1, y - 8, TVERDE); }
  if (completo) for (const [x, y] of [[100, 132], [150, 147], [200, 147]]) { R.poligono([[x - 3, y + 1], [x, y - 3], [x + 3, y + 1]], hex('#8a6a3a')); }
  garabato(56, 92, 2, TIN);
  // fuera del pergamino: la mesa debajo del borde roto (con la sombra del pergamino)
  const M = CAPAS.get('pgMesa'); if (M) for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (!dentro(x, y)) R.pset(x, y, M[y * 320 + x]);
  for (let x = 0; x <= 258; x++) { const y = bordeY(x); R.pset(x, y + 1, NOG[3]); R.pset(x, y + 2, mez(R.pget(x, y + 2), K, 0.35)); R.pset(x, y, PERG[2]); }
  for (let y = 0; y < 150; y++) { const x = bordeX(y); R.pset(x + 1, y, NOG[3]); R.pset(x + 2, y, mez(R.pget(x + 2, y), K, 0.35)); }
  // en la mesa: la regla, el compás, el tintero, el salvadera, una pesa de plomo y gotas de tinta
  caja(30, 160, 120, 165, hex('#c8a060')); for (let x = 32; x < 120; x += 4) R.rect(x, 160, x, x % 12 === 0 ? 162 : 161, hex('#5a3a1a'));
  R.linea(150, 172, 176, 160, K); R.linea(151, 172, 177, 160, hex('#c8c8d0')); R.linea(176, 160, 196, 171, K); R.linea(177, 160, 197, 171, hex('#a8a8b4')); R.disco(176, 159, 2, hex('#d8a838')); R.pset(176, 159, K);
  R.disco(290, 162, 10, K); R.disco(290, 162, 9, hex('#4a6a7a')); R.disco(290, 162, 6, K); R.disco(290, 162, 5, hex('#141820')); R.pset(287, 160, hex('#3a4a6a')); R.pset(285, 157, hex('#c8dce8')); R.pset(284, 158, hex('#c8dce8')); pluma(292, 160, 1);
  R.disco(262, 168, 5, K); R.disco(262, 168, 4, hex('#a8885a')); R.disco(261, 167, 2, hex('#d8c09a'));
  R.disco(236, 12, 6, K); R.disco(236, 12, 5, hex('#6a6e7a')); R.disco(235, 11, 2, hex('#9a9eaa'));
  for (const [x, y] of [[214, 166], [218, 170], [140, 176]]) { R.disco(x, y, 1.5, hex('#141018')); }
};
const p1 = (t) => {
  capaB('pgMesa', mesaPG);
  const base = capaB('pgBase', () => pintaPergamino(false));
  const fin = capaB('pgFin', () => pintaPergamino(true));
  // a cada píxel nuevo de la tierra del sur le toca su momento: el de la muestra de costa más cercana
  let S = CAPAS.get('pgS'); if (!S) { S = new Float32Array(320 * 180).fill(9); for (let y = 100; y < 180; y++) for (let x = 0; x < 270; x++) { const i = y * 320 + x; if (fin[i] === base[i]) continue; let mj = 0, md = 1e9; for (let j = 0; j < SB.length; j += 2) { const d = (SB[j][0] - x) ** 2 + (SB[j][1] - y) ** 2 * 0.6; if (d < md) { md = d; mj = j; } } S[i] = mj / SB.length; } CAPAS.set('pgS', S); }
  R.copiar(base);
  // la pluma: baja hasta el borde (0,45–1,55), duda (–1,85) y la tuerce hacia el este en «turns east» (1,85–3,7)
  const tuerce = en('pergamino', .0614);
  const s = t < 0.45 ? 0 : t < 1.55 ? BAJA * tramo(t, 0.45, 1.55) : t < tuerce ? BAJA : BAJA + (1 - BAJA) * tramo(t, tuerce, 3.7);
  for (let y = 100; y < 180; y++) for (let x = 0; x < 270; x++) { const i = y * 320 + x; if (S[i] <= s) R.buf[i] = fin[i]; }
  const k = Math.min(SB.length - 1, Math.floor(s * SB.length)); let [px, py] = SB[k];
  // la tinta fresca que brilla detrás de la punta
  for (let j = Math.max(0, k - 14); j <= k; j++) { const [x, y] = SB[j]; R.pset(Math.round(x), Math.round(y), hex('#100c10')); if (j % 3 === 0) R.pset(Math.round(x), Math.round(y) - 1, hex('#6a6070')); }
  if (t < 0.45) { const u = tramo(t, 0, 0.45); px = lerp(190, SB[0][0], u); py = lerp(178, SB[0][1], u); }
  if (t >= 1.55 && t < tuerce) px += Math.round(Math.sin(t * 30)) ;   // duda en el borde
  if (t > 3.7) { const u = tramo(t, 3.7, 3.95), toque = Math.max(0, Math.sin((t - en('pergamino', .1668)) * 18)) * (t > en('pergamino', .1668) && t < en('pergamino', .1668) + 0.6 ? 1 : 0);
    px = lerp(SB[SB.length - 1][0], 214, u); py = lerp(SB[SB.length - 1][1], 140, u) - 4 + Math.round(toque * 4); }
  px = Math.round(px); py = Math.round(py);
  T.brazo(R, px + 52, 192, px + 14, py + 2, '#8a2a2a', -1, { codo: [px + 34, py + 26], puno: '#e8dcc0' }); pluma(px, py, 1);
  if (t >= 1.55 && t < tuerce + 0.3) globo(px + 4, py - 22, '!', TROJA);
  // en el mar: una carabela que cabecea y un loro de tierra que aletea
  const bx = 214, by = 96 + Math.round(Math.sin(t * 2.4)), cab = Math.sin(t * 2.4) > 0.3 ? 1 : 0;
  R.poligono([[bx - 8, by], [bx + 8, by], [bx + 5, by + 4], [bx - 5, by + 4]], hex('#6a4022')); R.linea(bx - 8, by, bx + 8, by, K); R.linea(bx, by - 12, bx, by, K);
  R.rect(bx - 5, by - 11 + cab, bx + 4, by - 4, hex('#f4ecd8')); R.rect(bx - 5, by - 11 + cab, bx + 4, by - 11 + cab, K); R.rect(bx - 1, by - 9, bx, by - 6, TROJA); R.pset(bx, by - 13, TROJA); R.pset(bx + 1, by - 13, TROJA);
  const lx = 46, ly = 64 + Math.round(Math.sin(t * 5) * 1.5), al = Math.sin(t * 16) > 0; R.rect(lx - 1, ly - 1, lx + 1, ly + 1, hex('#38a038')); R.pset(lx + 2, ly - 1, hex('#e8c030')); R.pset(lx - 2, ly + (al ? -2 : 1), hex('#c83030')); R.pset(lx - 3, ly + (al ? -3 : 2), hex('#c83030')); R.pset(lx + 2, ly + 1, hex('#3060c0'));
  // la vela en la mesa y su polilla
  vela(300, 130, t, 14); polilla(300, 106, t, 10);
};
// ── 2 · el rincón de Piri de noche: el compás y el sitio que queda ──
const T2 = { cielo: [hex('#0e1430'), hex('#18204a'), hex('#24305e')], mar: [hex('#101c34'), hex('#1a2c4c'), hex('#2a4468')] };
const p2 = (t) => {
  capa('pg2', () => {
    yeso(0, 0, 319, 100, [hex('#7a6248'), hex('#5e4a36'), hex('#8e7456')], 5);
    madera(0, 0, 319, 8, [hex('#3a2416'), hex('#24140a'), hex('#4e321e'), hex('#160c06')], 4, 7); for (let x = 30; x < 320; x += 64) { caja(x, 8, x + 6, 14, hex('#3a2416')); }
    // el friso de azulejos de İznik
    R.rect(0, 100, 319, 109, K); for (let x = 0; x < 320; x += 10) { R.rect(x + 1, 101, x + 9, 108, hex('#e8e2d0')); R.disco(x + 5, 104.5, 2.5, hex('#2a5aa0')); R.pset(x + 5, 104, hex('#3a9a9a')); R.pset(x + 1, 101, hex('#3a9a9a')); R.pset(x + 9, 108, hex('#c83a2a')); }
    madera(0, 110, 319, 150, [hex('#4a2e1c'), hex('#2e1a0e'), hex('#5e3c24'), hex('#1e1008')], 10, 8); R.rect(0, 110, 319, 110, hex('#6e4a2c'));
    for (let x = 0; x < 320; x += 40) { R.rect(x + 3, 114, x + 36, 146, hex('#2e1a0e')); R.rect(x + 4, 115, x + 36, 146, hex('#553620')); R.rect(x + 4, 115, x + 35, 115, hex('#2e1a0e')); R.rect(x + 36, 115, x + 36, 146, hex('#6e4a2c')); }
    tablas(150, 179, [hex('#3e2614'), hex('#2a180c'), hex('#563620'), hex('#1a0e06')], 3);
    // la alfombra de kilim
    for (let y = 168; y <= 179; y++) for (let x = 40; x <= 240; x++) { const b = y === 168 || x === 40 || x === 240, m = (Math.abs(((x - 40) % 16) - 8) + Math.abs(y - 174)) < 5;
      R.pset(x, y, b ? hex('#d8b060') : m ? (((x - 40) >> 4) % 2 ? hex('#2a4a7a') : hex('#e8d8a8')) : (x + y) % 6 === 0 ? hex('#6a1a1a') : hex('#8a2a24')); }
    // la ventana en arco con contraventanas, de noche: cielo, luna y mar
    R.rect(20, 22, 84, 96, K); R.disco(52, 38, 32, K); R.recorte([22, 6, 82, 94]);
    for (let y = 6; y <= 94; y++) for (let x = 22; x <= 82; x++) { const dentroArco = y >= 38 || Math.hypot(x - 52, y - 38) <= 30; if (!dentroArco) continue; const u = (y - 6) / 70; R.pset(x, y, y > 74 ? T2.mar[(x + y) % 3 === 0 ? 2 : u > 1.15 ? 1 : 0] : T2.cielo[tr(x, y, Math.min(1, u * 1.5)) ? (u > 0.6 ? 2 : 1) : 0]); }
    R.disco(64, 34, 6, hex('#e8ecd8')); R.disco(66, 32, 5, hex('#fffff0')); R.pset(62, 35, hex('#c8ccb8')); R.pset(64, 37, hex('#c8ccb8'));
    R.linea(22, 74, 82, 74, hex('#2a3a5a')); for (let k = 0; k < 6; k++) { const x = 26 + k * 10; R.poligono([[x, 74], [x + 4, 70 - (k % 2) * 2], [x + 8, 74]], hex('#1a2438')); }   // la otra orilla
    R.recorte(null);
    R.rect(18, 94, 86, 98, K); R.rect(19, 95, 85, 97, hex('#8a6a4a')); R.rect(19, 95, 85, 95, hex('#b08a60'));
    for (const x0 of [8, 86]) { caja(x0, 26, x0 + 9, 92, hex('#5a3a22')); for (let y = 30; y < 90; y += 6) R.rect(x0 + 1, y, x0 + 8, y + 1, hex('#3a2416')); }
    // la balda con el astrolabio, un tintero de repuesto y jarras; colgados: un compás grande y una regla
    caja(100, 40, 190, 43, hex('#5a3a22')); for (const x of [104, 186]) R.poligono([[x, 44], [x + 3, 44], [x, 50]], hex('#3a2416'));
    R.disco(116, 30, 9, K); R.disco(116, 30, 8, hex('#c89a3a')); R.disco(116, 30, 5, hex('#8a6a2a')); R.linea(109, 30, 123, 30, hex('#f0d080')); R.pset(116, 30, K);
    for (const [x, h, c] of [[134, 14, '#2a5aa0'], [146, 10, '#8a3a2a'], [158, 16, '#3a7a5a'], [172, 12, '#c8a060']]) { R.rect(x - 4, 40 - h, x + 4, 39, K); R.rect(x - 3, 41 - h, x + 3, 39, hex(c)); R.rect(x - 3, 41 - h, x - 2, 39, mez(hex(c), hex('#ffffff'), 0.3)); R.rect(x - 2, 38 - h, x + 2, 40 - h, K); }
    R.linea(206, 18, 198, 46, K); R.linea(206, 18, 214, 46, K); R.linea(207, 18, 199, 46, hex('#c8c8d0')); R.linea(205, 18, 213, 46, hex('#a8a8b4')); R.disco(206, 17, 2, hex('#d8a838'));
    caja(218, 16, 222, 60, hex('#c8a060')); for (let y = 18; y < 60; y += 4) R.rect(219, y, 220, y, hex('#5a3a1a'));
    // las celdas con las cartas enrolladas (sin la esquina de Atom)
    caja(232, 52, 316, 140, hex('#3a2416')); for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { const x = 234 + i * 21, y = 54 + j * 21; R.rect(x, y, x + 19, y + 19, hex('#1e1008'));
      for (let n = 0; n < 2; n++) { const cx = x + 6 + n * 8, cy = y + 12 - (n % 2) * 4; R.disco(cx, cy, 5, K); R.disco(cx, cy, 4, [hex('#e8d4a4'), hex('#d8c08c'), hex('#c8a870')][(i + j + n) % 3]); R.disco(cx, cy, 2, hex('#b89a64')); R.pset(cx, cy, hex('#6a4a2a')); R.pset(cx - 2, cy - 2, hex('#fff4d8')); }
      if ((i + j) % 3 === 0) { R.rect(x + 2, y + 17, x + 17, y + 18, hex('#8a2a2a')); } }
    // el tablero inclinado de dibujo, bajo, con sus patas y el travesaño
    for (const x of [112, 206]) { caja(x, 148, x + 4, 168, hex('#4a2a16')); R.rect(x + 1, 149, x + 1, 167, hex('#6e4229')); }
    caja(112, 160, 210, 162, hex('#4a2a16'));
    R.poligono([[108, 92], [216, 92], [222, 148], [102, 148]], K); R.poligono([[110, 94], [214, 94], [219, 146], [105, 146]], hex('#6e4229')); R.rect(102, 146, 222, 149, K); R.rect(103, 146, 221, 148, hex('#8a5a32'));
    // el mapa sobre el tablero: la costa baja y se tuerce al este por la franja de abajo
    for (let y = 98; y <= 141; y++) for (let x = 114; x <= 210; x++) { const n = hh(x >> 2, y >> 2, 46); R.pset(x, y, n > 0.82 ? PERG[1] : PERG[0]); }
    R.rect(113, 97, 211, 97, PERG[2]); R.rect(113, 142, 211, 142, PERG[2]);
    const cs = [[142, 98], [146, 108], [152, 116], [154, 124], [156, 132], [158, 136], [170, 138], [184, 136], [198, 139], [210, 138]];
    R.poligono([[114, 98], ...cs, [210, 141], [114, 141]], hex('#c8c488')); for (let y = 98; y < 142; y++) for (let x = 114; x < 211; x++) if (R.pget(x, y) === hex('#c8c488') && (x + y) % 4 === 0) R.pset(x, y, hex('#a8b874'));
    for (let i = 0; i < cs.length - 1; i++) { R.linea(cs[i][0], cs[i][1], cs[i + 1][0], cs[i + 1][1], TIN); R.linea(cs[i][0] + 1, cs[i][1], cs[i + 1][0] + 1, cs[i + 1][1], hex('#5aa0a0')); }
    for (let k = 0; k < 4; k++) { const x = 120 + k * 6, y = 104 + k * 9; R.poligono([[x - 3, y + 2], [x, y - 2], [x + 3, y + 2]], hex('#8a6a3a')); }
    for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; for (let r = 4; r < 24; r += 2) { const x = Math.round(184 + Math.cos(a) * r), y = Math.round(114 + Math.sin(a) * r); if (x > 158 && x < 211 && y > 98 && y < 132) R.pset(x, y, k % 4 ? hex('#8a7a5a') : TROJA); } }
    R.disco(184, 114, 3, hex('#d8a838')); R.pset(184, 114, TROJA);
    // en el reborde: el tintero y la pluma
    caja(196, 142, 202, 146, hex('#2a3a4a')); R.linea(200, 141, 206, 132, hex('#f4f0e4'));
    // el taburete con un cojín
    caja(250, 152, 280, 156, hex('#5a3420')); for (const x of [252, 276]) caja(x, 157, x + 2, 170, hex('#432414')); R.rect(252, 149, 278, 151, hex('#8a2a2a'));
  });
  // la noche viva: estrellas que titilan, el reflejo de la luna, el farol de una galera que se mece
  R.recorte([22, 6, 82, 73]); for (let k = 0; k < 14; k++) { const x = 24 + Math.round(hh(k, 1, 7) * 56), y = 8 + Math.round(hh(k, 2, 7) * 50); if (Math.hypot(x - 52, y - 38) > 30 && y < 38) continue; if (Math.sin(t * (2 + k % 3) + k) > -0.2) R.pset(x, y, hex('#f0f0ff')); } R.recorte(null);
  for (let y = 76; y < 93; y += 2) { const w = 2 + ((y - 76) >> 2), dx = Math.round(Math.sin(t * 3 + y) * 2); R.rect(64 - w + dx, y, 64 + w + dx, y, hex('#c8c8a0')); }
  R.recorte([22, 70, 82, 94]); const gx = 30 + Math.round(t * 3) % 40, gy = 82 + Math.round(Math.sin(t * 1.7) * 1); R.rect(gx - 8, gy, gx + 8, gy + 2, hex('#0a0e18')); R.linea(gx, gy - 9, gx, gy, hex('#0a0e18')); R.poligono([[gx + 1, gy - 8], [gx + 7, gy - 2], [gx + 1, gy - 2]], hex('#141c2c')); R.pset(gx + 7, gy - 1, Math.sin(t * 5) > 0 ? hex('#ffd860') : hex('#f0a030')); R.recorte(null);
  // la lámpara de aceite que se mece desde la viga
  const a = Math.sin(t * 1.6) * 0.08, lx = 160 + Math.round(Math.sin(a) * 40), ly = 14 + Math.round(Math.cos(a) * 52);
  halo(lx, ly + 4, 56, hex('#ffcc70'), 0.32);
  R.linea(160, 14, lx, ly - 4, hex('#2a2018')); R.poligono([[lx - 6, ly - 3], [lx + 6, ly - 3], [lx + 4, ly + 6], [lx - 4, ly + 6]], K); R.poligono([[lx - 5, ly - 2], [lx + 5, ly - 2], [lx + 3, ly + 5], [lx - 3, ly + 5]], hex('#b8862a'));
  R.rect(lx - 2, ly - 1, lx + 2, ly + 3, hex('#ffe8a0')); R.rect(lx - 1, ly, lx + 1, ly + 2, hex('#fff8e0')); R.rect(lx - 5, ly - 4, lx + 5, ly - 4, hex('#d8a838')); polilla(lx, ly + 2, t, 11);
  // Piri entra con el compás, lo lleva al pie del tablero en «fit», mide la franja y en «space he had left» parpadea
  const fit = en('pergamino', .2671), sitio = en('pergamino', .3735), left = en('pergamino', .4043);
  const u = tramo(t, P2 + 0.1, fit - 0.15), x = Math.round(lerp(26, 86, u)), mide = t > fit - 0.1;
  const ab = mide ? 3 + Math.round(Math.abs(Math.sin((t - fit) * 3)) * 5) : 3;
  const tgt = mide ? [106 + Math.round(Math.sin((t - fit) * 3) * 2), 140] : true;
  const sorp = t > left - 0.15 && t < left + 0.5;
  const r = R.actor(EL.piri, x, 168, t, { dir: 1, anda: u > 0 && u < 1, sostiene: tgt, sorpresa: sorp, sonrisa: t > left + 0.5, habla: t > left + 0.7 && Math.sin(t * 8) > 0 });
  const [mx, my] = r.mano; R.linea(mx, my - 2, mx - 3, my + 8, K); R.linea(mx, my - 2, mx + ab, my + 8, K); R.linea(mx + 1, my - 2, mx + ab + 1, my + 8, hex('#c8c8d0')); R.linea(mx - 1, my - 2, mx - 2, my + 8, hex('#a8a8b4')); R.disco(mx, my - 3, 1.5, hex('#d8a838'));
  if (t > sitio - 0.1 && t < left + 0.6 && Math.floor(t * 6) % 2 === 0) { for (let xx = 156; xx <= 210; xx += 2) { R.pset(xx, 133, hex('#ffe060')); R.pset(xx, 143, hex('#ffe060')); } for (let yy = 133; yy <= 143; yy += 2) { R.pset(156, yy, hex('#ffe060')); R.pset(210, yy, hex('#ffe060')); } }
  if (sorp) globo(x + 7, 136, '!');
  // el gato en el taburete, con la cola, que levanta la cabeza en «left»
  gato(266, 148, t, -1, hex('#c8843a'), hex('#e8a85a'), t > left ? 1 : 0);
};
// ── 3 · el taller de cartógrafos: tres mapas con la costa torcida en el borde ──
const T3 = { pared: [hex('#c8b08a'), hex('#a8906a'), hex('#dcc8a2')] };
// un mapa clavado en la pared (x0..x1, y0..y1) con su costa que choca con el borde y se tuerce; brillo: 0–1
const MAPAS3 = [
  { c: [66, 22, 138, 80], costa: [[80, 22], [86, 36], [92, 50], [96, 64], [102, 76], [114, 78], [126, 77], [137, 78]] },
  { c: [148, 30, 220, 88], costa: [[148, 52], [164, 48], [180, 54], [196, 49], [210, 52], [218, 58], [219, 72], [218, 87]] },
  { c: [228, 50, 276, 106], costa: [[236, 50], [244, 62], [254, 72], [264, 84], [274, 92], [274, 100], [262, 104], [246, 104]] },
];
const p3 = (t) => {
  capa('pg3', () => {
    yeso(0, 0, 319, 134, T3.pared, 9); R.rect(0, 0, 319, 3, hex('#5a3a22')); R.rect(0, 4, 319, 4, hex('#3a2416'));
    R.rect(0, 128, 319, 134, hex('#7a5232')); R.rect(0, 128, 319, 128, hex('#9a6a40')); R.rect(0, 134, 319, 134, K);
    // el suelo de baldosas de barro con juntas y desgaste
    for (let y = 135; y < 180; y++) for (let x = 0; x < 320; x++) { const fy = Math.floor((y - 135) / 9), xx = (x + fy * 7) % 18, j = (y - 135) % 9 === 0 || xx === 0;
      R.pset(x, y, j ? hex('#6a3420') : hh(x >> 1, y >> 1, 52) > 0.9 ? hex('#c87a54') : hh(x >> 3, y >> 3, 53) > 0.7 ? hex('#9a5034') : hex('#a85a3a')); }
    // la ventana con el canal y una torre al fondo, de día
    caja(8, 30, 56, 100, hex('#4a2e1c')); grad(10, 32, 54, 66, [hex('#8ab8e0'), hex('#b8d4ec'), hex('#e0ecf4')]);
    for (let x = 10; x < 55; x += 7) { R.rect(x, 58, x + 5, 82, [hex('#d8a878'), hex('#b8785a'), hex('#e0c098')][(x >> 3) % 3]); R.rect(x + 1, 62, x + 2, 64, hex('#3a2416')); R.rect(x + 3, 70, x + 4, 72, hex('#3a2416')); R.rect(x, 58, x + 5, 58, hex('#8a3a2a')); }
    R.rect(36, 40, 42, 82, hex('#c8a07a')); R.rect(37, 46, 38, 48, hex('#3a2416')); R.poligono([[35, 40], [39, 33], [43, 40]], hex('#8a3a2a'));
    for (let y = 83; y < 98; y++) for (let x = 10; x < 55; x++) R.pset(x, y, (x + y * 2) % 7 === 0 ? hex('#8ac0c8') : hex('#3a7a8a'));
    R.rect(31, 32, 33, 98, hex('#4a2e1c')); R.rect(10, 56, 54, 57, hex('#4a2e1c')); caja(4, 100, 60, 103, hex('#6e4a2c'));
    // el astrolabio colgado y la cuerda con los mapas que se secan (bajo la esquina de Atom)
    R.disco(296, 70, 10, K); R.disco(296, 70, 9, hex('#c89a3a')); R.disco(296, 70, 6, hex('#8a6a2a')); R.linea(289, 70, 303, 70, hex('#f0d080')); R.linea(296, 61, 296, 52, K); R.pset(296, 70, K);
    // el mueble de cajones planos para mapas, con uno medio abierto
    caja(64, 102, 222, 132, hex('#6e4229')); for (let j = 0; j < 4; j++) { const y = 104 + j * 7; R.rect(66, y, 220, y + 5, hex('#5a3420')); R.rect(66, y, 220, y, hex('#8a5a32')); for (const x of [104, 180]) { R.rect(x - 3, y + 2, x + 3, y + 3, K); R.rect(x - 2, y + 2, x + 2, y + 2, hex('#d8a838')); } }
    R.rect(70, 116, 214, 118, PERG[0]); R.rect(70, 116, 214, 116, PERG[2]);
    R.rect(70, 98, 120, 101, hex('#e8dcc0')); R.rect(126, 96, 150, 101, PERG[1]); R.disco(162, 97, 4, K); R.disco(162, 97, 3, hex('#2a3a4a'));
    // los mapas
    for (const m of MAPAS3) { const [x0, y0, x1, y1] = m.c; R.rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, mez(T3.pared[0], K, 0.4));
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = hh(x >> 2, y >> 2, 47); R.pset(x, y, (y === y0 || y === y1 || x === x0 || x === x1) ? PERG[2] : n > 0.82 ? PERG[1] : PERG[0]); }
      R.poligono(m === MAPAS3[1] ? [...m.costa, [x1, y1], [x0, y1]] : [[x0, y0], ...m.costa, [x0, y1]], hex('#c8c488'));
      for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) if (R.pget(x, y) === hex('#c8c488') && (x + 2 * y) % 5 === 0) R.pset(x, y, hex('#a8b874'));
      for (let i = 0; i < m.costa.length - 1; i++) { R.linea(m.costa[i][0], m.costa[i][1], m.costa[i + 1][0], m.costa[i + 1][1], TIN); }
      for (const [cx, cy] of [[x0 + 2, y0 + 2], [x1 - 2, y0 + 2]]) { R.disco(cx, cy, 1.5, K); R.pset(cx, cy, hex('#d8d8e0')); }
      const rx = Math.round(x1 - 16), ry = Math.round(y0 + 14); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; R.linea(rx, ry, Math.round(rx + Math.cos(a) * 7), Math.round(ry + Math.sin(a) * 7), k % 2 ? hex('#8a7a5a') : TROJA); }
      for (let k = 0; k < 3; k++) { const mx = x0 + 10 + k * 7, my = y1 - 10 - (k % 2) * 4; R.poligono([[mx - 3, my + 2], [mx, my - 2], [mx + 3, my + 2]], hex('#8a6a3a')); } }
    // el cesto de mapas enrollados y la mesita del aprendiz con su tablero
    R.rect(18, 140, 46, 162, K); for (let y = 141; y < 162; y++) for (let x = 19; x < 46; x++) R.pset(x, y, (x + y) % 3 === 0 ? hex('#8a6a3a') : hex('#b08a50'));
    for (let k = 0; k < 4; k++) { const x = 22 + k * 6; R.rect(x, 124 + (k % 2) * 4, x + 4, 141, K); R.rect(x + 1, 125 + (k % 2) * 4, x + 3, 141, PERG[k % 2]); R.disco(x + 2, 124 + (k % 2) * 4, 2, PERG[2]); }
  });
  // la luz de la ventana con motas
  for (let k = 0; k < 10; k++) { const u = ((t * 0.06 + hh(k, 5, 3)) % 1), x = Math.round(60 + u * 80 + Math.sin(t + k) * 3), y = Math.round(30 + hh(k, 6, 3) * 60 + u * 30); R.pset(x, y, hex('#fff4d8')); }
  // el agua del canal y una góndola
  R.recorte([10, 83, 54, 97]); const gx = 10 + ((t * 7) % 70) - 10; R.rect(gx, 90, gx + 12, 91, K); R.pset(gx + 13, 89, K); R.linea(gx + 9, 84, gx + 9, 90, K); R.recorte(null);
  // las costas que se tuercen se encienden una a una (con su flecha curva), y el cartógrafo las señala
  const encs = [en('pergamino', .4963), en('pergamino', .5317), en('pergamino', .5884)];
  MAPAS3.forEach((m, i) => { if (t < encs[i]) return; const n = m.costa.length, tramoT = m.costa.slice(n - 4), lat = Math.sin((t - encs[i]) * 8) > -0.3;
    for (let j = 0; j < tramoT.length - 1; j++) { R.linea(tramoT[j][0], tramoT[j][1], tramoT[j + 1][0], tramoT[j + 1][1], lat ? hex('#ffd040') : hex('#e89a20')); R.linea(tramoT[j][0], tramoT[j][1] - 1, tramoT[j + 1][0], tramoT[j + 1][1] - 1, lat ? hex('#ffe890') : hex('#ffd040')); }
    const [ax, ay] = tramoT[1], cx = ax - 9, cy = ay - 10; for (let a = 0; a < 1.7; a += 0.1) { R.pset(Math.round(cx + Math.cos(a) * 8), Math.round(cy + Math.sin(a) * 8), TROJA); R.pset(Math.round(cx + Math.cos(a) * 8) + 1, Math.round(cy + Math.sin(a) * 8), TROJA); }
    R.poligono([[cx - 3, cy + 6], [cx + 2, cy + 6], [cx - 1, cy + 10]].map(([x, y]) => [x + 1, y + 1]), TROJA);
    destello(tramoT[2][0], tramoT[2][1], tramo(t, encs[i], encs[i] + 0.6)); });
  const k = t < encs[1] - 0.2 ? 0 : t < encs[2] - 0.2 ? 1 : 2, xs = [98, 176, 238], cxp = Math.round(lerp(xs[Math.max(0, k - 1)], xs[k], tramo(t, encs[k] - 0.5, encs[k] - 0.1)));
  const llega = tramo(t, P3, encs[0] - 0.2), x0 = Math.round(lerp(150, xs[0], llega)), cx = t < encs[0] - 0.2 ? x0 : cxp;
  const andando = (t < encs[0] - 0.2 && llega > 0 && llega < 1) || (k > 0 && t > encs[k] - 0.5 && t < encs[k] - 0.1);
  R.actor(EL.pilotoPortugues, cx - 8, 162, t, { dir: t < encs[0] - 0.2 ? -1 : 1, anda: andando, dedo: !andando && t > encs[0] - 0.2, habla: !andando && Math.sin(t * 7) > 0.3 });
  // el aprendiz muele pigmento detrás de su mesita (asoman cabeza y hombros)
  const ap = R.actor(EL.escribano, 296, 142, t, { dir: -1, sostiene: [288, 118 + Math.round(Math.abs(Math.sin(t * 5)) * 3)] });
  caja(276, 128, 318, 132, hex('#6e4229')); R.rect(277, 128, 317, 128, hex('#9a6a40')); madera(277, 133, 317, 152, NOG, 6, 20); for (const x of [278, 314]) caja(x, 153, x + 3, 168, hex('#432414'));
  caja(278, 120, 290, 127, hex('#e8e0d0')); R.rect(280, 120, 288, 121, hex('#3a6ac0')); R.rect(279, 126, 289, 127, hex('#c8c0b0'));
  R.linea(ap.mano[0], ap.mano[1], ap.mano[0] - 2, ap.mano[1] + 6, K); R.linea(ap.mano[0] + 1, ap.mano[1], ap.mano[0] - 1, ap.mano[1] + 6, hex('#a87a4a'));
  for (const [x, c] of [[300, '#c83a2a'], [312, '#d8a838']]) { R.disco(x, 126, 3.5, K); R.rect(x - 3, 126, x + 3, 127, K); R.disco(x, 125, 2.5, hex('#e8e0d0')); R.rect(x - 1, 124, x + 1, 125, hex(c)); }
  // el perro que duerme y mueve la cola
  const dx = 66, dy = 172; R.disco(dx, dy - 3, 6, K); R.disco(dx, dy - 3, 5, hex('#c8a070')); R.disco(dx - 7, dy - 2, 3.5, K); R.disco(dx - 7, dy - 2, 2.6, hex('#c8a070')); R.pset(dx - 9, dy - 2, K); R.rect(dx - 6, dy - 5, dx - 5, dy - 4, hex('#8a6040')); R.linea(dx + 5, dy - 1, dx + 9, dy - 3 - Math.round(Math.abs(Math.sin(t * 4)) * 2), hex('#8a6040'));
};
// ── 4 · el pórtico griego: la gran tierra del sur en la tabla del mundo ──
const p4 = (t) => {
  capa('pg4', () => { grad(0, 0, 319, 92, [hex('#5a8ad0'), hex('#7aa8e0'), hex('#a8c8ec'), hex('#d8e4f0')]);
    for (let y = 92; y < 120; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x * 3 + y * 7) % 13 === 0 ? hex('#a8d0e8') : y < 100 ? hex('#3a78b0') : tr(x, y, (y - 100) / 20) ? hex('#2a6aa0') : hex('#3a78b0'));
    R.poligono([[150, 93], [180, 82], [204, 86], [232, 93]], hex('#8a9ab0')); R.poligono([[166, 93], [180, 84], [196, 87], [210, 93]], hex('#a0aec0')); R.poligono([[236, 93], [258, 88], [280, 93]], hex('#9aa8bc')); });
  nubes([0, 0, 319, 90], t, 30, 70, [hex('#ffffff'), hex('#eef2f8'), hex('#c8d4e4')], 5, 1.2, 12); pajaros(t, 130, 270, 46, 3, 10);
  // la vela que cruza el mar y las crestas de las olas (por detrás del caballete y las columnas)
  const vx = 300 - Math.round((t * 5) % 200); R.poligono([[vx - 5, 96], [vx + 5, 96], [vx + 3, 99], [vx - 3, 99]], hex('#6a4022')); R.poligono([[vx, 86], [vx + 5, 94], [vx, 95]], hex('#f4ecd8')); R.linea(vx, 85, vx, 96, K);
  for (let k = 0; k < 8; k++) { const x = (k * 43 + Math.round(t * 6)) % 320, y = 101 + (k % 3) * 5; R.rect(x, y, x + 3, y, hex('#d8ecf4')); }
  delante('pg4d', () => {
    // la orilla y el empedrado del pórtico
    for (let y = 112; y < 140; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 116 ? hex('#e8d8b0') : hh(x >> 2, y >> 2, 48) > 0.7 ? hex('#a8a058') : hex('#8a9a48'));
    for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 140) / 8), j = (y - 140) % 8, xx = (x + fila * 9) % 22; R.pset(x, y, j === 0 || xx === 0 ? hex('#a89a80') : hh(x >> 1, y, 49) > 0.94 ? hex('#c8bca0') : y < 144 ? hex('#f0e6d0') : hex('#e2d6bc')); }
    R.rect(0, 139, 319, 139, hex('#8a7c64'));
    // el pórtico: tres columnas dóricas con su arquitrabe (a la izquierda)
    R.rect(0, 18, 128, 30, K); R.rect(0, 19, 127, 29, hex('#ece2cc')); R.rect(0, 19, 127, 20, hex('#fff8e8')); for (let x = 4; x < 128; x += 14) { R.rect(x, 22, x + 2, 27, hex('#c8bca0')); R.rect(x + 5, 22, x + 7, 27, hex('#c8bca0')); }
    for (const cx of [14, 62, 110]) { R.rect(cx - 9, 30, cx + 9, 34, K); R.rect(cx - 8, 31, cx + 8, 33, hex('#e8ddc4')); for (let y = 35; y < 140; y++) { R.pset(cx - 7, y, K); R.pset(cx + 7, y, K); for (let x = cx - 6; x <= cx + 6; x++) R.pset(x, y, (x - cx + 7) % 3 === 0 ? hex('#c8bca0') : x < cx - 2 ? hex('#fff8e8') : x > cx + 3 ? hex('#d8ccb0') : hex('#efe5ce')); } R.rect(cx - 9, 136, cx + 9, 140, K); R.rect(cx - 8, 137, cx + 8, 139, hex('#e8ddc4')); }
    // el olivo de la derecha (por debajo de la esquina de Atom)
    for (let y = 70; y < 140; y++) { const x = 286 + Math.round(Math.sin(y * 0.12) * 3); R.rect(x - 3, y, x + 3, y, K); R.rect(x - 2, y, x + 2, y, hex('#6a5a48')); R.pset(x - 1, y, hex('#8a7a62')); }
    // la tabla del mundo en su caballete
    for (const [a, b] of [[160, 172], [216, 172]]) { R.linea(a, 120, a - 6, 160, K); R.linea(a + 1, 120, a - 5, 160, hex('#8a5a32')); } R.linea(188, 126, 196, 160, K); R.linea(189, 126, 197, 160, hex('#6e4229'));
    caja(148, 52, 228, 128, hex('#a8784a')); R.rect(150, 54, 226, 126, hex('#c89a64')); for (let y = 56; y < 126; y += 3) R.rect(150, y, 226, y, hex('#b88a58'));
    R.disco(188, 90, 35, K); R.disco(188, 90, 34, hex('#3a78b0')); for (let y = 56; y < 125; y++) for (let x = 154; x < 223; x++) if (Math.hypot(x - 188, y - 90) < 33 && (x * 2 + y) % 9 === 0) R.pset(x, y, hex('#5a98c8'));
    R.poligono([[162, 84], [168, 72], [180, 66], [196, 64], [210, 70], [216, 80], [212, 88], [200, 86], [190, 90], [178, 88], [168, 90]], K); R.poligono([[163, 83], [169, 73], [180, 67], [196, 65], [209, 71], [215, 80], [211, 87], [200, 85], [190, 89], [178, 87], [168, 89]], hex('#d8b070'));
    R.linea(176, 78, 200, 76, hex('#3a78b0')); R.linea(176, 79, 200, 77, hex('#5a98c8'));   // el Mediterráneo
    for (const [x, y] of [[172, 76], [204, 74], [188, 70]]) R.pset(x, y, hex('#8a6a3a'));
  });
  // el cielo vivo: nubes de tres tonos a tres velocidades, pájaros y la vela que cruza el mar
  // la copa del olivo que se mece (por debajo de y 48)
  const ow = Math.round(Math.sin(t * 1.3) * 1.5); for (const [cx, cy, r] of [[268, 66, 14], [292, 58, 13], [306, 72, 12], [282, 80, 11]]) { R.disco(cx + ow, cy, r + 1, K); R.disco(cx + ow, cy, r, hex('#6a7a4a')); R.disco(cx + ow - 2, cy - 2, r * 0.6, hex('#8a9a5a')); }
  for (let k = 0; k < 18; k++) { const x = 258 + Math.round(hh(k, 1, 50) * 56) + ow, y = 50 + Math.round(hh(k, 2, 50) * 38); R.pset(x, y, Math.sin(t * 2 + k) > 0 ? hex('#a8b878') : hex('#4a5a32')); }
  // la gran tierra del sur que el sabio pinta en «great southern land», y el «?» en «no one had seen»
  const great = en('pergamino', .7588), land = en('pergamino', .7897), noone = en('pergamino', .7897) + 0.15;
  const pinta = tramo(t, great - 0.1, land + 0.3);
  if (pinta > 0) { const xm = Math.round(156 + pinta * 66); R.recorte([154, 92, xm, 125]);
    R.poligono([[156, 102], [168, 96], [186, 94], [204, 96], [220, 102], [222, 110], [210, 118], [188, 122], [168, 118], [158, 110]], hex('#5a6a3a'));
    R.poligono([[158, 102], [169, 97], [186, 95], [204, 97], [219, 102], [220, 110], [209, 117], [188, 121], [168, 117], [159, 110]], hex('#a8b870'));
    for (let y = 96; y < 122; y++) for (let x = 156; x < 222; x++) if ((x + y) % 6 === 0 && R.pget(x, y) === hex('#a8b870')) R.pset(x, y, hex('#8a9a58')); R.recorte(null); }
  if (t > noone) { for (let a = 0; a < 6.28; a += 0.1) { const x = Math.round(188 + Math.cos(a) * 36), y = Math.round(108 + Math.sin(a) * 18); if ((a * 10 | 0) % 2 && y > 92) R.pset(x, y, hex('#fff6c0')); } }
  // el sabio señala el mundo, coge el pincel y pinta; el alumno escucha sentado en el escalón
  const coge = great - 0.6, brocha = t > coge;
  const bx = brocha ? Math.round(150 + Math.min(1, pinta) * 6 + Math.sin(t * 9) * 2) : 0, by = brocha ? 104 + Math.round(Math.cos(t * 9) * 2) : 0;
  const s = R.actor(EL.socrates, 132, 152, t, { dir: 1, dedo: !brocha, sostiene: brocha ? [bx, by] : false, habla: !brocha && Math.sin(t * 7) > 0, sonrisa: t > noone });
  if (brocha) { const [hx, hy] = s.mano; R.linea(hx, hy, hx + 6, hy - 3, hex('#8a5a32')); R.rect(hx + 6, hy - 5, hx + 8, hy - 3, hex('#d8c8a0')); R.pset(hx + 8, hy - 4, hex('#5a6a3a')); }
  R.actor(EL.ciudadano, 76, 156, t, { dir: 1, sorpresa: t > noone && t < noone + 0.8, sonrisa: t > noone + 0.8 });
  if (t > noone) globo(206, 90, '?');
};
// ── 5 · el gabinete de 1570: el mapa con la Terra Australis y la balanza ──
const p5 = (t) => {
  capa('pg5', () => {
    // la pared verde con damasco y el friso de madera; la esquina de Atom, lisa
    for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const m = ((x % 16) - 8) ** 2 / 30 + (((y + (x >> 4) * 8) % 16) - 8) ** 2 / 50 < 1 && !(x > 262 && y < 50);
      R.pset(x, y, m ? (tr(x, y, 0.5) ? hex('#2e4a3a') : hex('#36543f')) : hex('#2a4234')); }
    R.rect(0, 0, 319, 3, hex('#5a3a22')); R.rect(0, 4, 319, 4, hex('#3a2416'));
    // el mapa ovalado del mundo, enmarcado: las tierras conocidas y la Terra Australis enorme abajo
    caja(14, 16, 206, 120, hex('#b8862a')); R.rect(16, 18, 204, 118, hex('#e2cc98')); for (let y = 18; y < 119; y++) for (let x = 16; x < 205; x++) if (hh(x >> 2, y >> 2, 51) > 0.85) R.pset(x, y, hex('#d4bc88'));
    for (const [x, y] of [[20, 22], [200, 22], [20, 114], [200, 114]]) { R.disco(x, y, 3, hex('#8a3a2a')); R.pset(x, y, hex('#d8a838')); }
    const cx = 110, cy = 68, rx = 88, ry = 46; for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d <= 1) R.pset(x, y, d > 0.93 ? K : (x * 2 + y * 3) % 11 === 0 ? hex('#7aa0b0') : hex('#9cc0c8')); }
    const tierra = (pts) => { R.poligono(pts.map(([x, y]) => [x + 1, y + 1]), hex('#6a5a38')); R.poligono(pts, hex('#d8b878')); };
    tierra([[44, 36], [62, 30], [70, 40], [64, 52], [70, 62], [66, 76], [58, 80], [56, 68], [48, 58], [40, 48]]);           // las Américas
    tierra([[104, 30], [126, 26], [150, 28], [172, 34], [176, 46], [160, 52], [146, 50], [136, 56], [126, 50], [114, 48], [104, 42]]);   // Europa y Asia
    tierra([[110, 52], [126, 54], [134, 62], [128, 76], [120, 80], [114, 70], [108, 60]]);   // África
    tierra([[26, 92], [44, 86], [62, 88], [80, 84], [104, 88], [130, 84], [156, 88], [178, 86], [192, 92], [188, 102], [160, 108], [130, 112], [100, 113], [70, 110], [44, 104]]);   // la Terra Australis
    for (let k = 0; k < 9; k++) { const x = 46 + k * 16, y = 96 + (k % 3) * 3; R.poligono([[x - 4, y + 3], [x, y - 3], [x + 4, y + 3]], hex('#8a6a3a')); }
    for (let k = 0; k < 4; k++) { const x = 60 + k * 32; for (let i = 0; i < 14; i++) R.pset(x + i, 100 + Math.round(Math.sin(i * 0.5) * 2), hex('#3a6a9a')); }
    // la mesa de nogal (tablero de y 128 a 180) con libros, papeles y la vela
    madera(0, 128, 319, 179, NOG, 10, 14); R.rect(0, 128, 319, 129, hex('#8a5a32'));
    for (const [x, w, c] of [[30, 34, '#6a2a2a'], [32, 30, '#2a4a6a'], [34, 26, '#4a5a2a']]) { const i = [30, 32, 34].indexOf(x), y = 150 - i * 6; caja(x, y, x + w, y + 4, hex(c)); R.rect(x + 1, y + 1, x + w - 1, y + 1, hex('#e8dcc0')); }
    caja(96, 150, 140, 172, hex('#e8dcc0')); for (let y = 154; y < 170; y += 3) R.rect(99, y, 136, y, hex('#a89a80'));
  });
  // el contorno de la Terra Australis late en oro (la tierra que «tenía que existir»), y un barquito navega hacia ella
  const exist = en('pergamino', .9152), bal = en('pergamino', .9449), world = en('pergamino', .9724);
  if (Math.sin(t * 5) > -0.2) { const pts = [[26, 92], [44, 86], [62, 88], [80, 84], [104, 88], [130, 84], [156, 88], [178, 86], [192, 92], [188, 102], [160, 108], [130, 112], [100, 113], [70, 110], [44, 104], [26, 92]]; for (let i = 0; i < pts.length - 1; i++) R.linea(pts[i][0], pts[i][1] - 1, pts[i + 1][0], pts[i + 1][1] - 1, hex('#ffd040')); }
  const sx = 70 + Math.round(t * 3) % 60, sy = 78 + Math.round(Math.sin(t * 2)); R.rect(sx - 3, sy, sx + 3, sy + 1, hex('#6a4022')); R.rect(sx - 1, sy - 4, sx + 1, sy - 1, hex('#f4ecd8')); R.pset(sx, sy - 5, TROJA);
  vela(18, 148, t, 16, 2); polilla(18, 122, t, 9);
  // el reloj de arena que corre
  const rx = 166, ry = 146; caja(rx - 7, ry - 22, rx + 7, ry - 21, hex('#6e4229')); caja(rx - 7, ry, rx + 7, ry + 1, hex('#6e4229')); R.poligono([[rx - 5, ry - 20], [rx + 5, ry - 20], [rx, ry - 10], [rx - 5, ry - 1], [rx + 5, ry - 1]], hex('#d8ecf4'));
  const ar = (t * 0.05) % 1; R.poligono([[rx - 4 + ar * 3, ry - 19 + ar * 8], [rx + 4 - ar * 3, ry - 19 + ar * 8], [rx, ry - 11]], hex('#e0b860')); R.poligono([[rx - 4, ry - 2], [rx + 4, ry - 2], [rx, ry - 2 - Math.round(3 + ar * 5)]], hex('#e0b860')); if (Math.floor(t * 8) % 2) R.linea(rx, ry - 10, rx, ry - 3, hex('#e0b860'));
  // la balanza: el globo pesa más hasta que en «exist» la mano pone la tierra austral y en «balance» se equilibra
  const puesto = t > exist + 0.2, ang = puesto ? 0.26 * Math.exp(-(t - exist - 0.2) * 2.4) * Math.cos((t - exist - 0.2) * 7) : 0.26;
  const BX = 252, BY = 62, L = 36, ex = Math.cos(ang) * L, ey = Math.sin(ang) * L, Lx = Math.round(BX - ex), Ly = Math.round(BY + ey), Rx = Math.round(BX + ex), Ry = Math.round(BY - ey);
  caja(234, 124, 270, 128, hex('#8a6a2a')); R.rect(235, 124, 269, 124, hex('#e0c060')); caja(250, 64, 254, 123, hex('#b8862a')); R.rect(251, 64, 251, 122, hex('#f0d080'));
  R.linea(Lx, Ly, Rx, Ry, K); R.linea(Lx, Ly - 1, Rx, Ry - 1, hex('#d8a838')); R.disco(BX, BY, 3, K); R.disco(BX, BY, 2, hex('#f0d080'));
  const plato = (x, y) => { R.linea(x, y, x - 9, y + 30, hex('#5a4a3a')); R.linea(x, y, x + 9, y + 30, hex('#5a4a3a')); R.linea(x, y, x, y + 30, hex('#5a4a3a')); R.poligono([[x - 12, y + 30], [x + 12, y + 30], [x + 8, y + 34], [x - 8, y + 34]], K); R.rect(x - 10, y + 30, x + 10, y + 31, hex('#d8a838')); return [x, y + 30]; };
  const [lpx, lpy] = plato(Lx, Ly), [rpx, rpy] = plato(Rx, Ry);
  R.disco(lpx, lpy - 7, 7, K); R.disco(lpx, lpy - 7, 6, hex('#5a98c8')); R.poligono([[lpx - 4, lpy - 10], [lpx + 2, lpy - 12], [lpx + 4, lpy - 6], [lpx - 1, lpy - 4]], hex('#d8b878')); R.pset(lpx - 3, lpy - 10, hex('#e8f4ff'));
  // la mano trae la tierra austral de madera desde la derecha y la deja en el platillo
  const trae = tramo(t, P5 + 0.6, exist + 0.1), va = tramo(t, exist + 0.35, bal + 0.4);
  const tx = puesto ? rpx : Math.round(lerp(340, rpx, trae)), ty = puesto ? rpy - 3 : Math.round(lerp(150, rpy - 3, trae));
  const pieza = (x, y) => { R.poligono([[x - 10, y], [x - 6, y - 4], [x + 2, y - 5], [x + 9, y - 3], [x + 10, y], [x, y + 1]], K); R.poligono([[x - 9, y - 1], [x - 5, y - 3], [x + 2, y - 4], [x + 8, y - 2], [x + 9, y - 1]], hex('#e8d8b0')); R.pset(x - 2, y - 3, hex('#8a6a3a')); R.pset(x + 3, y - 3, hex('#8a6a3a')); };
  if (trae > 0) pieza(tx, ty);
  if (trae > 0 && va < 1) { const wx = puesto ? Math.round(lerp(rpx + 12, 340, va)) : tx + 12, wy = puesto ? Math.round(lerp(rpy - 4, 150, va)) : ty - 1; T.brazo(R, wx + 34, wy + 26, wx, wy, '#3a2a4a', -1, { puno: '#f4f0e4' }); }
  if (t > bal + 0.25) destello(BX, BY - 6, tramo(t, bal + 0.25, bal + 0.9));
  if (t > world) { destello(lpx, lpy - 16, tramo(t, world, world + 0.7)); destello(rpx, rpy - 10, tramo(t, world + 0.1, world + 0.8)); }
};
const tuerce = en('pergamino', .0614);
const efectos = [[0.5, 'lapiz'], [tuerce, 'boing'], [en('pergamino', .1668), 'golpecito'], [P2 + 0.2, 'puerta'], [en('pergamino', .2671), 'golpecito'], [en('pergamino', .3735), 'brillo'],
  [en('pergamino', .4963), 'pop'], [en('pergamino', .5884), 'pop'], [en('pergamino', .7588), 'lapiz'], [en('pergamino', .7897) + 0.15, 'boing'], [en('pergamino', .9152), 'golpecito'], [en('pergamino', .9449), 'campana']];
const año = (t) => t < P4 ? 1513 : t < P5 ? null : 1570;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['pr-cerebro'] = ('El cerebro', """// PR-CEREBRO (frase 22), hoy, sin cartela; la barra marca 2026. Cuatro planos:
// 1. «And now, the question you've always wondered about: why did so many people see Antarctica there?» (0–6,42 s):
//    el estudio de Atom con el mapa desenrollado en la mesa; una visitante lo mira y le pregunta a otro que entra por la
//    puerta; en «Antarctica» señala el mapa y en «there?» a los dos les sale un «?».
// 2. «Because your brain is a pattern-finding machine» (6,42–10,39 s): LOCAL un taller con una máquina con un cerebro
//    rosa encima: la alumna vuelca puntos sueltos en la cinta, en «pattern» se encienden las bombillas y en «machine»
//    salen por el otro lado formas (un pez, un barco, una estrella); el técnico coge el pez y se sorprende.
// 3. «It's the same thing that makes you see faces in clouds, or in an electrical outlet» (10,39–14,37 s): LOCAL la
//    ventana y el enchufe de cerca: en «clouds» pasa una nube en la que se adivina algo, y en «outlet» el enchufe de la
//    pared (dos ranuras y un agujero) se ilumina; el gato del alféizar se vuelve a mirarlo.
// 4. «If you look at a twisted coastline hoping to find Antarctica, your brain will help you find it» (14,37 s–fin):
//    LOCAL una sala de museo de noche con la copia grande del mapa: el visitante se acerca con la lupa, en «coastline» la
//    costa torcida se enciende, en «Antarctica» una línea de puntos azul «completa» la Antártida, y en «find it» se
//    cierra, parpadea y al visitante le sale un «!».""", COMUN + r"""
const P2 = en('cerebro', .2889), P3 = en('cerebro', .4966), P4 = en('cerebro', .7049);
// ── 1 · el estudio de Atom: la pregunta ──
const p1 = (t) => {
  T.hoy(R, t, { encuadre: 'estudio', abre: 1 });
  const q = en('cerebro', .0366), ant = en('cerebro', .2104), there = en('cerebro', .2376);
  const u = tramo(t, 0.5, 2.6), x1 = Math.round(lerp(268, 220, u));
  R.actor(EL.visitante1, x1, 160, t, { dir: -1, anda: u > 0 && u < 1, sorpresa: t > there && t < there + 0.6, habla: t > 3 && t < ant - 0.2 && Math.sin(t * 7) > 0 });
  R.actor(EL.visitante2, 150, 158, t, { dir: t > q && t < ant - 0.3 ? 1 : 1, habla: t > q && t < q + 2.2 && Math.sin(t * 8) > 0, dedo: t > ant - 0.1, sonrisa: t < q });
  T.hoyDelante(R, t, { encuadre: 'estudio' });
  if (t > there) { globo(157, 126, '?'); if (t > there + 0.25) globo(227, 128, '?'); }
};
// ── 2 · la máquina de encontrar formas ──
const FORMAS = ['pez', 'barco', 'estrella'];
const forma = (k, x, y) => { const f = FORMAS[k % 3];
  if (f === 'pez') { R.poligono([[x - 6, y], [x, y - 4], [x + 4, y - 2], [x + 4, y + 2], [x, y + 4]], K); R.poligono([[x - 5, y], [x, y - 3], [x + 3, y - 1], [x + 3, y + 1], [x, y + 3]], hex('#f08a3a')); R.poligono([[x + 3, y], [x + 8, y - 4], [x + 8, y + 4]], hex('#f08a3a')); R.pset(x - 2, y - 1, K); }
  else if (f === 'barco') { R.poligono([[x - 7, y + 1], [x + 7, y + 1], [x + 4, y + 4], [x - 4, y + 4]], hex('#8a4a2a')); R.linea(x, y - 8, x, y + 1, K); R.poligono([[x + 1, y - 7], [x + 6, y], [x + 1, y]], hex('#f4f4f0')); R.poligono([[x - 1, y - 6], [x - 5, y], [x - 1, y]], hex('#e8e0c8')); }
  else { for (let a = 0; a < 5; a++) { const b = a * 2 * Math.PI / 5 - Math.PI / 2; R.linea(x, y, Math.round(x + Math.cos(b) * 6), Math.round(y + Math.sin(b) * 6), hex('#ffd040')); } R.disco(x, y, 2.5, hex('#ffd040')); R.pset(x, y, hex('#fff6c0')); } };
const puntos = (k, x, y) => { for (let i = 0; i < 6; i++) { const px = x - 5 + Math.round(hh(k, i, 60) * 10), py = y - 5 + Math.round(hh(k, i, 61) * 8); R.rect(px, py, px + 1, py + 1, [hex('#3a3a4a'), hex('#c83a2a'), hex('#2a6ac0')][i % 3]); } };
const p2 = (t) => {
  capa('cb2', () => {
    yeso(0, 0, 319, 70, [hex('#dce4e0'), hex('#c4ccc8'), hex('#eef2ee')], 21);
    for (let y = 70; y < 140; y++) for (let x = 0; x < 320; x++) { const g = (y - 70) % 7 === 0 || x % 10 === 0; R.pset(x, y, g ? hex('#a8b8c0') : hh(x / 10 | 0, (y - 70) / 7 | 0, 62) > 0.85 ? hex('#c8dce8') : hex('#e4eef2')); }
    R.rect(0, 69, 319, 70, hex('#8a9aa4'));
    for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const c = ((x >> 4) + ((y - 140) >> 3)) % 2; R.pset(x, y, y === 140 ? hex('#5a646a') : c ? hex('#b8b0a0') : hex('#8a8478')); }
    // la ventana con su marco y el estor, el reloj, la balda con frascos y el cuadro con un cerebro dibujado
    caja(14, 14, 72, 62, hex('#f4f4f0')); grad(15, 15, 71, 61, [hex('#6a9ad8'), hex('#8ab8e0'), hex('#c8dcee')]); R.rect(15, 52, 71, 61, hex('#a8b8a0')); for (let x = 15; x < 72; x += 6) R.rect(x, 48 - (x % 4), x + 4, 61, hex('#c8b8a0')); R.rect(42, 15, 43, 61, hex('#f4f4f0')); R.rect(15, 38, 71, 39, hex('#f4f4f0')); R.rect(12, 62, 74, 65, hex('#c8ccc8'));
    R.disco(236, 28, 10, K); R.disco(236, 28, 9, hex('#f4f4f0')); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.pset(Math.round(236 + Math.cos(a) * 7), Math.round(28 + Math.sin(a) * 7), K); }
    caja(206, 54, 270, 56, hex('#8a6a4a')); for (const [x, h, c] of [[212, 10, '#7ac0a0'], [224, 14, '#e8a0b0'], [238, 8, '#c8d860'], [252, 12, '#8ab0e0'], [264, 9, '#f0c070']]) { R.rect(x - 4, 53 - h, x + 4, 53, K); R.rect(x - 3, 54 - h, x + 3, 52, hex(c)); R.rect(x - 3, 54 - h, x - 2, 52, mez(hex(c), hex('#ffffff'), 0.4)); R.rect(x - 2, 51 - h, x + 2, 53 - h, hex('#5a5a5a')); }
    caja(82, 20, 108, 52, hex('#5a4a3a')); R.rect(84, 22, 106, 50, hex('#f4ecd8')); R.disco(95, 34, 8, hex('#e89aa8')); R.disco(93, 32, 4, hex('#f4b8c4')); for (let i = 0; i < 6; i++) R.pset(89 + i * 2, 34 + (i % 2), hex('#c86a80')); R.linea(95, 42, 95, 47, hex('#c86a80'));
    // las cintas: la de entrada a la izquierda y la de salida a la derecha, con sus patas
    for (const [a, b] of [[16, 112], [208, 304]]) { caja(a, 136, b, 141, hex('#3a3e46')); R.rect(a, 136, b, 136, hex('#6a707a')); for (let x = a + 4; x < b; x += 30) caja(x, 142, x + 3, 160, hex('#5a606a')); }
    // la máquina: la caja con remaches, el ojo de buey con el engranaje, la palanca y los tubos al cerebro
    caja(112, 86, 208, 160, hex('#3a8a8a')); R.rect(112, 86, 208, 88, hex('#5ab0a8')); R.rect(112, 156, 208, 160, hex('#2a6a6a'));
    for (let x = 116; x < 206; x += 8) { R.pset(x, 90, hex('#a8dcd4')); R.pset(x, 154, hex('#a8dcd4')); }
    R.disco(160, 124, 15, K); R.disco(160, 124, 14, hex('#c8a040')); R.disco(160, 124, 12, hex('#1e2a30'));
    caja(196, 120, 200, 140, hex('#5a5a5a')); R.disco(198, 118, 3, hex('#c83a2a'));
    for (const x of [140, 180]) { caja(x - 2, 78, x + 2, 86, hex('#8a9aa4')); }
    // la cesta de puntos de la alumna
    R.rect(14, 164, 42, 176, K); for (let y = 165; y < 176; y++) for (let x = 15; x < 42; x++) R.pset(x, y, (x + y) % 3 === 0 ? hex('#8a6a3a') : hex('#b08a50'));
  });
  // el cielo de la ventana con nubes
  nubes([15, 15, 71, 47], t, 20, 40, [hex('#ffffff'), hex('#eef2f8'), hex('#c8d4e4')], 4, 1, 8);
  R.rect(42, 15, 43, 61, hex('#f4f4f0')); R.rect(15, 38, 71, 39, hex('#f4f4f0'));
  // el reloj que anda
  const am = t * 0.4; R.linea(236, 28, Math.round(236 + Math.sin(am) * 6), Math.round(28 - Math.cos(am) * 6), K); R.linea(236, 28, 239, 26, K);
  const pat = en('cerebro', .336), maq = en('cerebro', .3726), vel = t > maq ? 2 : t > pat ? 1.3 : 0.6;
  // el engranaje que gira y los diales
  const g = t * vel * 2; for (let k = 0; k < 8; k++) { const a = g + k * Math.PI / 4; R.linea(160, 124, Math.round(160 + Math.cos(a) * 10), Math.round(124 + Math.sin(a) * 10), hex('#c8a040')); } R.disco(160, 124, 5, hex('#e0c060')); R.disco(160, 124, 2, K);
  for (const [cx, k] of [[130, 0], [190, 1]]) { R.disco(cx, 104, 8, K); R.disco(cx, 104, 7, hex('#f4f0e4')); const a = -2.4 + Math.min(1, vel / 2) * 3 + Math.sin(t * 9 + k) * 0.15; R.linea(cx, 104, Math.round(cx + Math.cos(a) * 6), Math.round(104 + Math.sin(a) * 6), hex('#c83a2a')); R.pset(cx, 104, K); }
  // el cerebro rosa, que late un poco, con sus pliegues y las bombillas
  const lat = Math.round(Math.sin(t * vel * 3) * 0.8), BR = (x, y) => ((x - 160) / (36 + lat)) ** 2 + ((y - 60) / (25 + lat)) ** 2;
  for (let y = 32; y < 90; y++) for (let x = 120; x < 201; x++) { const d = BR(x, y); if (d > 1.08) continue; if (d > 0.92) { R.pset(x, y, K); continue; }
    const v = Math.sin(x * 0.32 + Math.sin(y * 0.21 + x * 0.05) * 2.6) * Math.cos(y * 0.36 + Math.sin(x * 0.17) * 1.8); R.pset(x, y, Math.abs(v) < 0.12 ? hex('#b8566e') : v > 0.55 ? hex('#f8c8d2') : d > 0.7 && y > 62 ? hex('#d8828f') : hex('#e89aa8')); }
  for (let y = 36; y < 85; y++) { R.pset(160 + Math.round(Math.sin(y * 0.4)), y, hex('#9a4058')); }
  R.rect(132, 84, 188, 92, K); R.rect(133, 85, 187, 91, hex('#3a8a8a')); R.rect(133, 85, 187, 85, hex('#5ab0a8'));
  for (let k = 0; k < 7; k++) { const bx = 136 + k * 8, by = 26 - Math.round(Math.sin(k / 6 * Math.PI) * 6), on = t > pat && (Math.floor(t * 8) + k) % 3 !== 0;
    R.linea(bx, by + 4, bx + (k - 3), by + 10, K); if (on) halo(bx, by, 7, hex('#fff2a0'), 0.6); R.disco(bx, by, 3, K); R.disco(bx, by, 2, on ? hex('#fff2a0') : hex('#c8c8b8')); if (on) R.pset(bx - 1, by - 1, hex('#ffffff')); }
  // la cinta de entrada lleva puntos sueltos y la de salida formas
  const vuelca = en('cerebro', .2889) + 0.35, sale = maq + 0.15;
  for (let k = 0; k < 6; k++) { const x = Math.round(20 + ((t - vuelca) * 22 - k * 22)); if (t > vuelca && x > 18 && x < 112) puntos(k, x, 131); }
  for (let k = 0; k < 6; k++) { const x = Math.round(212 + ((t - sale) * 24 - k * 24)); if (t > sale && x > 210 && x < 296) forma(k, x, 130); }
  for (let x = 16; x < 113; x += 3) R.pset(x + Math.round(t * 22) % 3, 139, hex('#6a707a')); for (let x = 208; x < 305; x += 3) R.pset(x + Math.round(t * 24) % 3, 139, hex('#6a707a'));
  if (t > sale - 0.1 && t < sale + 0.5) { destello(214, 128, tramo(t, sale - 0.1, sale + 0.5)); }
  // la alumna vuelca la bandeja de puntos en la cinta; el técnico coge el pez y se sorprende
  const al = R.actor(EL.alumna1, 6, 164, t, { dir: 1, sostiene: t < vuelca + 0.4 ? [26, 140 - (t > vuelca - 0.3 ? 4 : 0)] : false, sonrisa: t > vuelca + 0.4, habla: t > vuelca + 1 && Math.sin(t * 6) > 0.4 });
  if (t < vuelca + 0.4) { const [hx, hy] = al.mano, inc = t > vuelca - 0.3 ? 2 : 0; R.rect(hx - 2, hy - 2 - inc, hx + 10, hy, K); R.rect(hx - 1, hy - 1 - inc, hx + 9, hy - 1, hex('#c8a060')); for (let i = 0; i < 4; i++) R.pset(hx + 1 + i * 2, hy - 3 - inc, [hex('#3a3a4a'), hex('#c83a2a'), hex('#2a6ac0')][i % 3]); }
  const coge = sale + 1.2, tec = R.actor(EL.conservador, 300, 166, t, { dir: -1, sostiene: t > coge ? [298, 146] : false, sorpresa: t > coge && t < coge + 0.8, sonrisa: t > coge + 0.8 });
  if (t > coge) forma(0, tec.mano[0] - 2, tec.mano[1] - 3);
};
// ── 3 · la ventana y el enchufe ──
const p3 = (t) => {
  capa('cb3', () => {
    // el papel pintado crema de rayas con florecillas (tranquilo arriba a la derecha) y el zócalo de madera
    for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) { const m = x % 12; let c = m < 2 ? hex('#d8c8a0') : hex('#ece0c0'); if (!(x > 262 && y < 50) && m === 7 && (y + (x / 12 | 0) * 6) % 14 === 0) c = hex('#c87a6a'); if (!(x > 262 && y < 50) && m === 7 && (y + (x / 12 | 0) * 6) % 14 === 1) c = hex('#7a9a5a'); if (hh(x, y, 63) > 0.99) c = hex('#d0bf98'); R.pset(x, y, c); }
    madera(0, 140, 319, 179, [hex('#7a4a2a'), hex('#5a3420'), hex('#8e5a34'), hex('#3a2010')], 8, 22); R.rect(0, 138, 319, 140, hex('#5a3420'));
    // la ventana grande: marco, alféizar y la maceta
    caja(14, 18, 166, 118, hex('#f4f0e8')); R.rect(16, 20, 164, 116, hex('#8ab8e0')); R.rect(89, 19, 91, 117, hex('#f4f0e8')); R.rect(15, 66, 165, 68, hex('#f4f0e8'));
    caja(8, 118, 172, 123, hex('#e8e0d0')); R.rect(9, 123, 171, 124, hex('#b8ae98'));
    R.poligono([[24, 117], [40, 117], [37, 106], [27, 106]], K); R.poligono([[25, 116], [39, 116], [36, 107], [28, 107]], hex('#c8643a'));
    // la mesita con la lámpara enchufada (debajo de la esquina de Atom)
    caja(262, 128, 312, 132, hex('#6e4229')); for (const x of [266, 306]) caja(x, 133, x + 3, 160, hex('#5a3420'));
    R.rect(285, 104, 289, 128, K); R.rect(286, 104, 288, 127, hex('#c8a040')); R.poligono([[272, 104], [302, 104], [296, 86], [278, 86]], K); R.poligono([[273, 103], [301, 103], [295, 87], [279, 87]], hex('#e8d8b0'));
    // el enchufe de pared: la placa con sus tornillos y dos tomas (ranuras y agujero redondo, nada más)
    caja(210, 66, 250, 126, hex('#f6f2e8')); R.rect(209, 127, 251, 128, hex('#c8bea8')); R.rect(211, 67, 211, 125, hex('#ffffff'));
    for (const cy of [80, 108]) { R.rect(214, cy - 9, 246, cy + 9, hex('#e8e2d4')); R.rect(214, cy - 9, 246, cy - 9, hex('#d0c8b8'));
      R.rect(222, cy - 5, 224, cy + 1, K); R.rect(236, cy - 5, 238, cy + 1, K); R.disco(230, cy + 5, 2.2, K); R.pset(229, cy + 4, hex('#3a3a3a')); }
    R.disco(230, 94, 1.5, hex('#a8a090')); R.pset(229, 94, hex('#6a6050'));
    // el cable de la lámpara que baja al zócalo
    for (let x = 250; x < 287; x++) R.pset(x, 132 + Math.round(Math.sin((x - 250) / 36 * Math.PI) * 6), K);
  });
  // el cielo vivo: nubes de tres tonos a tres velocidades, una con algo dentro, y los pájaros
  R.recorte([16, 20, 164, 116]); grad(16, 20, 164, 116, [hex('#6a9ad8'), hex('#8ab8e0'), hex('#b8d4ec')]); R.recorte(null);
  nubes([16, 20, 164, 116], t, 30, 100, [hex('#ffffff'), hex('#eef2f8'), hex('#c8d4e4')], 5, 0.8, 12);
  const caras = en('cerebro', .5081), cl = en('cerebro', .5469);
  const nx = Math.round(lerp(30, 88, tramo(t, P3, cl + 0.4))), ny = 46; R.recorte([16, 20, 164, 116]);
  nube(nx, ny, 34, hex('#ffffff'), hex('#f2f4f8'), hex('#c8d4e4')); nube(nx + 18, ny + 6, 22, hex('#ffffff'), hex('#f2f4f8'), hex('#c8d4e4'));
  R.disco(nx - 6, ny - 3, 2.5, hex('#c8d4e4')); R.disco(nx + 7, ny - 3, 2.5, hex('#c8d4e4')); for (let i = -6; i <= 6; i++) R.pset(nx + i, ny + 6 + Math.round((i * i) / 14), hex('#c8d4e4'));
  pajaros(t, 20, 160, 70, 3, 12); R.recorte(null);
  R.rect(89, 19, 91, 117, hex('#f4f0e8')); R.rect(15, 66, 165, 68, hex('#f4f0e8'));
  // la cortina que se mece
  const cw = Math.round(Math.sin(t * 1.2) * 2); for (let y = 14; y < 136; y++) { const w = 16 + Math.round((y - 14) / 30) + (y > 100 ? cw : 0); for (let x = 166; x < 166 + w; x++) R.pset(x, y, (x - 166 + Math.round(y * 0.05)) % 5 === 0 ? hex('#8a3a3a') : hex('#b84a4a')); R.pset(166 + w, y, K); }
  R.rect(160, 12, 190, 14, hex('#8a6a3a'));
  // en «outlet» el enchufe se ilumina un poco, y el gato del alféizar se vuelve a mirarlo
  const enc = en('cerebro', .6306), mira = t > enc + 0.2;
  if (t > enc) { const a = 0.3 + 0.12 * Math.sin((t - enc) * 6); halo(230, 96, 40, hex('#fff2b0'), a); }
  gato(130, 118, t, mira ? 1 : -1, hex('#5a5a62'), hex('#7a7a84'), mira ? 1 : 0);
  if (mira && t < enc + 1.2) globo(140, 96, '!');
};
// ── 4 · la sala del museo de noche: la costa torcida y la Antártida de puntos ──
const ANT = (() => { const B = [[246, 100], [245, 108], [238, 115], [222, 119], [200, 121], [176, 120], [156, 117], [142, 110], [138, 100], [146, 92]], P = [];
  for (let i = 0; i < B.length - 1; i++) { const [a, b] = B[i], [c, d] = B[i + 1], n = Math.ceil(Math.hypot(c - a, d - b) / 3); for (let k = 0; k < n; k++) { const u = k / n; P.push([Math.round(a + (c - a) * u + Math.sin(P.length * 1.7) * 1.2), Math.round(b + (d - b) * u + Math.cos(P.length * 1.3) * 1.2)]); } } P.push(B[B.length - 1]); return P; })();
const p4 = (t) => {
  capa('cb4', () => {
    // la pared de tela azul oscura con su trama, el zócalo y el suelo de madera con brillo
    for (let y = 0; y < 146; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x + y) % 3 === 0 ? hex('#1e2a3e') : (x - y) % 7 === 0 ? hex('#26344c') : hex('#22304a'));
    R.rect(0, 140, 319, 146, hex('#141a26')); R.rect(0, 140, 319, 140, hex('#3a4660'));
    tablas(147, 179, [hex('#4a3020'), hex('#3a2416'), hex('#6a4a30'), hex('#24140a')], 5);
    // la copia grande del mapa con su marco dorado
    caja(92, 18, 252, 128, hex('#b8862a')); R.rect(94, 20, 250, 126, hex('#8a6420')); R.rect(97, 23, 247, 123, K);
    for (let y = 24; y <= 122; y++) for (let x = 98; x <= 246; x++) { const n = hh(x >> 2, y >> 2, 64); R.pset(x, y, n > 0.84 ? PERG[1] : n < 0.1 ? PERG[3] : PERG[0]); }
    const cs = [[118, 24], [124, 40], [134, 52], [140, 66], [146, 80], [150, 92], [156, 98], [172, 100], [190, 97], [208, 101], [226, 98], [246, 100]];
    R.poligono([[98, 24], ...cs, [246, 122], [98, 122]], hex('#c8c488')); for (let y = 24; y < 123; y++) for (let x = 98; x < 247; x++) if (R.pget(x, y) === hex('#c8c488') && (x * 2 + y) % 6 === 0) R.pset(x, y, hex('#a8b874'));
    for (let i = 0; i < cs.length - 1; i++) R.linea(cs[i][0], cs[i][1], cs[i + 1][0], cs[i + 1][1], TIN);
    for (let k = 0; k < 6; k++) { const x = 104 + k * 6, y = 34 + k * 12; R.poligono([[x - 3, y + 2], [x, y - 3], [x + 3, y + 2]], hex('#8a6a3a')); }
    for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; for (let r = 5; r < 40; r += 2) { const x = Math.round(206 + Math.cos(a) * r), y = Math.round(54 + Math.sin(a) * r); if (x > 150 && x < 247 && y > 24 && y < 92) R.pset(x, y, k % 4 ? hex('#8a7a5a') : TROJA); } } R.disco(206, 54, 4, hex('#d8a838'));
    // a los lados, dos cuadros pequeños con su luz: una galera y una rosa de los vientos; y los apliques de pared
    caja(16, 44, 70, 92, hex('#8a6420')); R.rect(18, 46, 68, 90, hex('#3a5a7a')); R.rect(18, 76, 68, 90, hex('#2a4a6a')); R.poligono([[28, 76], [58, 76], [54, 82], [32, 82]], hex('#5a3420')); R.linea(42, 56, 42, 76, K); R.poligono([[43, 58], [54, 72], [43, 72]], hex('#e8dcc0')); R.poligono([[41, 60], [32, 72], [41, 72]], hex('#d8ccb0')); for (let x = 20; x < 68; x += 5) R.pset(x, 84, hex('#8ab0d0'));
    caja(276, 58, 312, 94, hex('#8a6420')); R.rect(278, 60, 310, 92, PERG[0]); for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, L = k % 4 ? 8 : 14; R.linea(294, 76, Math.round(294 + Math.cos(a) * L), Math.round(76 + Math.sin(a) * L), k % 4 ? hex('#8a7a5a') : TROJA); } R.disco(294, 76, 3, hex('#d8a838'));
    for (const x of [43, 294]) { R.rect(x - 3, 30, x + 3, 34, hex('#c8a040')); R.rect(x - 1, 35, x + 1, 37, hex('#fff2c8')); for (let y = 38; y < 44; y++) for (let xx = x - (y - 36); xx <= x + (y - 36); xx++) if (tr(xx, y, 0.3)) R.pset(xx, y, hex('#3a4660')); }
    // el banco y la cartela (sin letras: rayas) y el cordón con sus postes
    caja(20, 150, 76, 154, hex('#5a3a22')); for (const x of [24, 70]) caja(x, 155, x + 3, 168, hex('#3a2416'));
    caja(256, 104, 270, 114, hex('#e8e0d0')); for (const y of [107, 110]) R.rect(258, y, 268, y, hex('#a8a090'));
    for (const x of [100, 244]) { caja(x - 1, 146, x + 1, 166, hex('#c8a040')); R.disco(x, 145, 2.5, hex('#e0c060')); } for (let x = 101; x < 244; x++) R.pset(x, 150 + Math.round(Math.sin((x - 100) / 144 * Math.PI) * 6), hex('#a82a2a'));
  });
  // los focos del techo: conos de luz sobre el mapa
  for (const fx of [130, 214]) { for (let y = 0; y < 130; y++) { const w = 4 + y * 0.32; for (let x = Math.round(fx - w); x <= Math.round(fx + w); x++) if (tr(x, y, 0.22)) R.pset(x, y, mez(R.pget(x, y), hex('#fff2c8'), 0.25)); } R.rect(fx - 4, 0, fx + 4, 3, hex('#3a3a44')); R.rect(fx - 2, 4, fx + 2, 5, hex('#fff2c8')); }
  // en «coastline» la costa torcida se enciende; en «Antarctica» los puntos azules la «completan»; en «find it» se cierra
  const costa = en('cerebro', .7604), ant = en('cerebro', .8472), find = en('cerebro', .9687);
  if (t > costa) { const cs = [[146, 80], [150, 92], [156, 98], [172, 100], [190, 97], [208, 101], [226, 98], [246, 100]], on = Math.sin((t - costa) * 7) > -0.4; for (let i = 0; i < cs.length - 1; i++) { R.linea(cs[i][0], cs[i][1], cs[i + 1][0], cs[i + 1][1], on ? hex('#ffd040') : hex('#e89a20')); R.linea(cs[i][0], cs[i][1] + 1, cs[i + 1][0], cs[i + 1][1] + 1, hex('#ffe890')); } }
  const u = tramo(t, ant - 0.5, find - 0.2), n = Math.floor(u * (ANT.length - 1)), cerrada = t > find;
  R.recorte([98, 24, 246, 122]);
  if (cerrada) for (let y = 92; y < 123; y++) for (let x = 138; x < 247; x++) if ((x + y) % 3 === 0 && y > 100 + (x < 150 ? -6 : 0)) { let dentro = false; for (let i = 0, j = ANT.length - 1; i < ANT.length; j = i++) { const [xi, yi] = ANT[i], [xj, yj] = ANT[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) dentro = !dentro; } if (dentro) R.pset(x, y, hex('#9ad0f0')); }
  for (let i = 0; i < n; i++) { const [a, b] = ANT[i], [c, d] = ANT[i + 1]; if (cerrada) { R.linea(a, b, c, d, Math.floor(t * 6) % 2 ? hex('#5ac8ff') : hex('#ffffff')); R.linea(a, b + 1, c, d + 1, hex('#2a7ac8')); } else if (i % 2 === 0) { R.linea(a, b, c, d, hex('#3a9ae8')); } }
  if (n > 0 && !cerrada) { const [a, b] = ANT[n]; R.disco(a, b, 2, hex('#bfe8ff')); }
  R.recorte(null);
  // el visitante se acerca con la lupa; otro pasa por detrás del cordón; el vigilante bosteza junto a la puerta
  const v = tramo(t, P4 + 0.3, costa - 0.1), vx = Math.round(lerp(40, 112, v));
  const vi = R.actor(EL.visitante1, vx, 170, t, { dir: 1, anda: v > 0 && v < 1, sostiene: v >= 1 ? [vx + 22, 140] : true, sorpresa: t > find && t < find + 1.1, sonrisa: t > find + 1.1 });
  const [hx, hy] = vi.mano; R.disco(hx + 4, hy - 4, 4, K); R.disco(hx + 4, hy - 4, 3, hex('#bfe8ff')); R.pset(hx + 3, hy - 5, hex('#ffffff')); R.linea(hx, hy, hx + 2, hy - 2, hex('#5a3a22'));
  const w = tramo(t, P4 + 1, E.duracion), wx = Math.round(lerp(330, 196, w)); R.actor(EL.visitante2, wx, 160, t, { dir: -1, anda: w > 0 && w < 1 });
  R.actor(EL.guia, 286, 168, t, { dir: -1, habla: Math.sin(t * 1.3) > 0.85, sonrisa: t > find });
  if (t > find) globo(vx + 7, 140, '!');
};
const efectos = [[en('cerebro', .2104), 'pop'], [en('cerebro', .2889) + 0.35, 'chof'], [en('cerebro', .336), 'interruptor'], [en('cerebro', .3726), 'zumbido'], [en('cerebro', .3726) + 1.35, 'pop'],
  [en('cerebro', .6306), 'interruptor'], [en('cerebro', .6306) + 0.3, 'miau'], [en('cerebro', .7604), 'brillo'], [en('cerebro', .8472), 'lapiz'], [en('cerebro', .9687), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
""")

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['pr-pareidolia'] = ('La pareidolia', """// PR-PAREIDOLIA (frase 23), hoy, sin cartela; la barra marca 2026. Tres planos:
// 1. «Scientists call it pareidolia, and when it mixes with a good mystery, it becomes very powerful» (0–6,43 s): el
//    escritorio de Atom de cerca (cámara 'mesa'): la visitante bebe café detrás de la mesa, cae una gota en el mapa y la
//    mancha crece con forma de continente (gag 7); en «mystery» se sorprende («!») y en «powerful» la señala y la mancha
//    brilla.
// 2. «A lost civilization makes a better story than a mapmaker running out of parchment» (6,43–11,36 s): LOCAL un aula
//    con la pizarra partida en dos: en «lost civilization» se dibuja en tiza una ciudad con torres, cúpulas, una pirámide
//    y barcos (el público se entusiasma en «better story»); en «mapmaker» sale a la derecha un cartógrafo pequeño con su
//    pergamino corto, y el público se aburre.
// 3. «But the real story has something the myth doesn't: it's true, and it's still amazing» (11,36 s–fin): LOCAL un
//    escenario: los decorados de cartón de la civilización perdida se caen de espaldas en una nube de polvo; en «true» el
//    foco cruza el escenario hasta Piri, que dibuja su mapa en una mesita, y en «amazing» el mapa brilla y el público
//    aplaude.""", COMUN + r"""
const P2 = en('pareidolia', .3883), P3 = en('pareidolia', .7111);
// ── 1 · la mancha de café en el mapa del escritorio ──
const p1 = (t) => {
  const cae = 0.9, toca = 1.3, myst = en('pareidolia', .2174), pow = en('pareidolia', .3182);
  const m = tramo(t, toca, 3.2);
  T.hoy(R, t, { encuadre: 'estudio', camara: 'mesa', mancha: m });
  const bebe = t < 0.6 || (t > 4.3 && t < 4.9);
  const v = R.actor(EL.visitante2, 136, 130, t, { dir: 1, sostiene: t > pow - 0.1 ? false : bebe ? [146, 104] : [158, 113], dedo: t > pow - 0.1, sorpresa: t > myst && t < myst + 0.9, sonrisa: t > myst + 0.9, habla: t > pow + 0.3 && Math.sin(t * 7) > 0.2 });
  const g = T.hoyDelante(R, t, { encuadre: 'estudio', camara: 'mesa', mancha: m });
  const [mx, my] = g.mancha ?? [153, 147];
  if (t < pow - 0.1) { const [hx, hy] = v.mano, inc = t > cae - 0.25 && t < toca ? 1 : 0; R.rect(hx - 1, hy - 5 + inc, hx + 6, hy + 2, K); R.rect(hx, hy - 4 + inc, hx + 5, hy + 1, hex('#e8e4dc')); R.rect(hx, hy - 4 + inc, hx + 5, hy - 4 + inc, hex('#5a3418')); R.rect(hx + 6, hy - 3, hx + 8, hy, K); R.pset(hx + 7, hy - 2, hex('#e8e4dc')); R.pset(hx + 1, hy - 3, hex('#ffffff')); }
  gota(mx, 118, my, tramo(t, cae, toca), hex('#5a3418'));
  if (t > toca && t < toca + 0.4) { for (const [dx, dy] of [[-4, -2], [5, -3], [-6, 1], [6, 1]]) R.pset(mx + Math.round(dx * (1 + (t - toca) * 3)), my + dy, hex('#5a3418')); }
  if (t > pow) { for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + t * 1.2; destello(Math.round(mx + Math.cos(a) * 14), Math.round(my - 1 + Math.sin(a) * 6), ((t - pow) * 1.2 + k / 8) % 1, hex('#fff0a0')); } }
  if (t > myst && t < myst + 1.2) globo(143, 96, '!');
};
// ── 2 · la pizarra: la civilización perdida contra el cartógrafo del pergamino corto ──
const TIZA = hex('#eef2ea'), TIZAS = hex('#a8c0b0');
const cabeza = (x, y, pelo, k, t, sube = 0) => { R.rect(x - 9, y + 6 - sube, x + 9, y + 16, K); R.rect(x - 8, y + 7 - sube, x + 8, y + 16, [hex('#3a5a8a'), hex('#8a3a3a'), hex('#4a7a4a'), hex('#c8a040')][k % 4]); R.disco(x, y - sube, 7, K); R.disco(x, y - sube, 6, pelo); R.pset(x - 7, y + 1 - sube, hex('#e8b088')); R.pset(x + 7, y + 1 - sube, hex('#e8b088')); R.pset(x - 2, y - 4 - sube, mez(pelo, hex('#ffffff'), 0.3)); };
const PELOS = ['#3a2416', '#c8a060', '#1c1424', '#8a4a2a', '#5a3a2a', '#e0c890', '#2a1a10', '#a85a30', '#4a3020'].map(hex);
const p2 = (t) => {
  capa('pz2', () => {
    yeso(0, 0, 319, 150, [hex('#c8d0c0'), hex('#b0b8a8'), hex('#d8e0d0')], 31);
    tablas(150, 179, [hex('#8a6a48'), hex('#6e5236'), hex('#a07c56'), hex('#4a3420')], 11);
    // la pizarra con su marco y sus manchas de tiza borrada, y la repisa con tizas y el borrador
    caja(22, 28, 264, 122, hex('#8a5a32')); R.rect(25, 31, 261, 119, hex('#24402e'));
    for (let y = 31; y < 120; y++) for (let x = 25; x < 262; x++) { const n = hh(x >> 3, y >> 2, 32); if (n > 0.8 && tr(x, y, 0.3)) R.pset(x, y, hex('#3a5644')); else if (hh(x, y, 33) > 0.993) R.pset(x, y, hex('#5a7664')); }
    caja(20, 122, 266, 125, hex('#6e4229')); for (const [x, c] of [[60, '#f4f4f0'], [70, '#f0d060'], [78, '#f09090']]) R.rect(x, 120, x + 5, 121, hex(c)); caja(220, 118, 236, 121, hex('#3a2a4a')); R.rect(221, 118, 235, 118, hex('#c8c0b0'));
    for (let y = 33; y < 118; y += 2) R.pset(143, y, TIZA);
    // la ventana alta de la derecha con su planta (por debajo de la esquina de Atom)
    caja(274, 52, 314, 132, hex('#f4f0e8')); grad(276, 54, 312, 130, [hex('#8ab8e0'), hex('#b8d4ec'), hex('#d8ecf4')]); R.rect(276, 104, 312, 130, hex('#8ab070')); R.rect(293, 53, 295, 131, hex('#f4f0e8')); R.rect(275, 90, 313, 92, hex('#f4f0e8'));
    R.poligono([[282, 148], [298, 148], [296, 136], [284, 136]], hex('#c8643a')); for (const [dx, dy] of [[-6, -10], [0, -14], [6, -9], [-3, -6], [4, -5]]) R.disco(290 + dx, 134 + dy, 4, hex('#4a8a4a'));
  });
  // la ciudad perdida y el cartógrafo, en tiza, en sus capas
  const civ = capaB('pz2L', () => {
    // el sol con rayos, las torres con cúpulas, la pirámide, la muralla y los barcos en las olas
    R.disco(52, 46, 7, TIZA); R.disco(52, 46, 5, hex('#24402e')); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; R.linea(Math.round(52 + Math.cos(a) * 9), Math.round(46 + Math.sin(a) * 9), Math.round(52 + Math.cos(a) * 13), Math.round(46 + Math.sin(a) * 13), TIZA); }
    for (const [x, h] of [[78, 44], [96, 56], [116, 40]]) { R.linea(x - 5, 96, x - 5, 96 - h, TIZA); R.linea(x + 5, 96, x + 5, 96 - h, TIZA); for (let a = 0; a <= Math.PI; a += 0.15) R.pset(Math.round(x + Math.cos(a) * 5), Math.round(96 - h - Math.sin(a) * 6), TIZA); R.linea(x, 96 - h - 6, x, 96 - h - 11, TIZA); R.pset(x + 1, 96 - h - 11, hex('#f0d060')); R.pset(x + 2, 96 - h - 10, hex('#f0d060')); for (let y = 96 - h + 6; y < 94; y += 8) { R.rect(x - 1, y, x + 1, y + 2, TIZAS); } }
    R.linea(36, 96, 58, 64, TIZA); R.linea(58, 64, 80, 96, TIZA); for (let y = 72; y < 96; y += 6) R.linea(36 + Math.round((96 - y) * 0.69) , y, 80 - Math.round((96 - y) * 0.69), y, TIZAS);
    R.linea(30, 96, 140, 96, TIZA); for (let x = 30; x < 140; x += 6) R.rect(x, 93, x + 2, 95, TIZA);
    for (let x = 28; x < 140; x++) R.pset(x, 108 + Math.round(Math.sin(x * 0.5) * 1.5), hex('#9ac8e8'));
    for (const bx of [50, 104]) { R.linea(bx - 9, 102, bx + 9, 102, TIZA); R.linea(bx - 9, 102, bx - 6, 106, TIZA); R.linea(bx + 9, 102, bx + 6, 106, TIZA); R.linea(bx - 6, 106, bx + 6, 106, TIZA); R.linea(bx, 88, bx, 102, TIZA); R.poligono([[bx + 1, 89], [bx + 8, 99], [bx + 1, 99]], TIZAS); R.poligono([[bx - 1, 90], [bx - 7, 99], [bx - 1, 99]], TIZAS); }
  });
  const car = capaB('pz2R', () => {
    // la mesita, el cartógrafo de palotes y su pergamino corto con la costa torcida
    R.linea(176, 100, 236, 100, TIZA); R.linea(180, 100, 180, 114, TIZA); R.linea(232, 100, 232, 114, TIZA);
    R.disco(164, 74, 5, TIZA); R.disco(164, 74, 4, hex('#24402e')); R.linea(164, 79, 164, 98, TIZA); R.linea(164, 98, 158, 114, TIZA); R.linea(164, 98, 170, 114, TIZA); R.linea(164, 84, 186, 94, TIZA); R.linea(164, 84, 156, 92, TIZA);
    R.rect(196, 88, 222, 99, TIZAS); R.rect(197, 89, 221, 98, hex('#24402e')); R.linea(204, 89, 207, 95, TIZA); R.linea(207, 95, 221, 96, TIZA); R.linea(186, 94, 196, 86, TIZA);
  });
  const civT = en('pareidolia', .4119), story = en('pareidolia', .5088), mm = en('pareidolia', .5638), parch = en('pareidolia', .645);
  const xL = Math.round(lerp(26, 142, tramo(t, civT - 0.2, story - 0.1))), xR = Math.round(lerp(146, 260, tramo(t, mm - 0.2, parch)));
  const B = R.buf; for (let y = 30; y < 120; y++) for (let x = 26; x < 262; x++) { const i = y * 320 + x; if (x < xL && civ[i]) B[i] = civ[i]; else if (x >= 146 && x < xR && car[i]) B[i] = car[i]; }
  // la punta de la tiza que dibuja, con su polvillo
  const dib = t > civT - 0.2 && t < story - 0.1 ? [xL, 60 + Math.round(Math.sin(t * 13) * 30)] : t > mm - 0.2 && t < parch ? [xR, 80 + Math.round(Math.sin(t * 11) * 18)] : null;
  if (dib) { R.rect(dib[0], dib[1], dib[0] + 2, dib[1] + 1, TIZA); for (let k = 0; k < 4; k++) R.pset(dib[0] + Math.round(hh(k, t * 10 | 0, 1) * 6) - 3, dib[1] + 2 + k * 2, TIZAS); }
  // la profesora señala a la izquierda y luego a la derecha
  const izq = t < mm - 0.3; R.actor(EL.guia, 136, 152, t, { dir: izq ? -1 : 1, dedo: t > civT - 0.1, habla: Math.sin(t * 7) > 0.1, sonrisa: izq });
  // el público de espaldas: se entusiasma en «better story» y se aburre en «parchment»
  const ent = t > story - 0.2 && t < story + 1.1, abu = tramo(t, parch - 0.2, parch + 0.4);
  for (let k = 0; k < 9; k++) { const x = 20 + k * 35, sube = ent ? Math.round(Math.abs(Math.sin(t * 9 + k)) * 3) : -Math.round(abu * (k % 2 ? 3 : 1)); cabeza(x, 162, PELOS[k], k, t, sube); }
  if (ent) { globo(55, 150, '!'); globo(160, 148, '!'); }
};
// ── 3 · el escenario: el cartón se cae y el foco va a Piri ──
const p3 = (t) => {
  capa('pz3', () => {
    // el telón de fondo pintado (cielo de noche con estrellas) y la bambalina
    grad(0, 0, 319, 128, [hex('#141a3a'), hex('#1e2a54'), hex('#2a3a6a')]); for (let k = 0; k < 40; k++) { const x = Math.round(hh(k, 1, 70) * 320), y = Math.round(hh(k, 2, 70) * 110); if (!(x > 270 && y < 50)) R.pset(x, y, hex('#c8d0f0')); }
    for (let x = 0; x < 320; x += 1) { const y = 120 + Math.round(Math.sin(x * 0.03) * 3); R.rect(x, y, x, 127, hex('#1a2440')); }
    // el suelo del escenario de tablas en fuga y las candilejas
    for (let y = 128; y < 158; y++) for (let x = 0; x < 320; x++) { const xx = (x - 160) * (110 / (y - 20)) ; R.pset(x, y, Math.abs(xx) % 14 < 1 ? hex('#3a2416') : (y - 128) % 7 === 0 ? hex('#4a2e1c') : hex('#6e4a2c')); }
    R.rect(0, 158, 319, 163, K); for (let x = 12; x < 320; x += 24) { R.rect(x, 157, x + 10, 160, hex('#3a3a44')); R.rect(x + 2, 157, x + 8, 157, hex('#fff2c0')); }
    // las butacas con el público de espaldas, abajo, a oscuras
    R.rect(0, 164, 319, 179, hex('#140c10'));
    // la bambalina roja (lisa arriba, por la barra del año) y los telones de los lados (lisos arriba a la derecha)
    R.rect(0, 0, 319, 16, hex('#6a1418')); R.rect(0, 16, 319, 18, hex('#d8a838')); for (let x = 0; x < 320; x += 4) R.pset(x, 19, hex('#d8a838'));
    for (const [x0, x1] of [[0, 38], [282, 319]]) for (let y = 19; y < 158; y++) for (let x = x0; x <= x1; x++) { const f = Math.sin((x - x0) * 0.55) * (x0 > 0 && y < 50 ? 0.3 : 1); R.pset(x, y, f > 0.6 ? hex('#a82a2a') : f < -0.6 ? hex('#5a1014') : hex('#8a1e22')); }
    for (const [x, d] of [[38, 1], [282, -1]]) { R.rect(x - 2 * d, 96, x + 2 * d, 100, hex('#d8a838')); }
    // la mesita de Piri con la vela y su mapa (a la derecha)
    caja(198, 112, 262, 116, hex('#6e4229')); madera(199, 117, 261, 130, NOG, 5, 40); for (const x of [200, 258]) caja(x, 131, x + 3, 146, hex('#432414'));
  });
  // los decorados de cartón de la civilización perdida: se caen de espaldas desde «But»
  const but = en('pareidolia', .7242), cae = tramo(t, but + 0.1, but + 0.9) ** 2, polvo = tramo(t, but + 0.85, but + 2.2);
  const flat = (x0, x1, top, pinta) => { const base = 140, h = base - top, k = 1 - cae; if (k <= 0.04) { R.rect(x0 - 2, base - 2, x1 + 2, base, hex('#a8885a')); R.rect(x0 - 2, base - 2, x1 + 2, base - 2, hex('#c8a870')); return; }
    const sy = (y) => Math.round(base - (base - y) * k); pinta(sy); R.linea(x1 + 2, sy(top + h * 0.3), x1 + 8, base, hex('#8a6a3a')); };
  flat(54, 108, 52, (sy) => { for (const [x, top] of [[60, 60], [80, 52], [100, 66]]) { R.rect(x - 7, sy(top), x + 7, sy(140), K); R.rect(x - 6, sy(top) + 1, x + 6, sy(140) - 1, hex('#d8a838')); R.disco(x, sy(top), Math.max(1, 7 * (1 - cae)), hex('#e8c050')); R.rect(x - 2, sy(top + 14), x + 2, sy(top + 22), hex('#5a3a1a')); } });
  flat(112, 158, 70, (sy) => { R.poligono([[112, sy(140)], [135, sy(70)], [158, sy(140)]], K); R.poligono([[114, sy(139)], [135, sy(73)], [156, sy(139)]], hex('#e0b860')); for (let j = 1; j < 5; j++) R.linea(114 + j * 4, sy(140 - j * 14), 156 - j * 4, sy(140 - j * 14), hex('#a8803a')); });
  flat(160, 196, 96, (sy) => { R.rect(160, sy(126), 196, sy(140), hex('#2a6aa0')); for (let x = 160; x < 196; x += 6) R.disco(x + 3, sy(126), 3, hex('#5a9ad0')); R.rect(170, sy(116), 190, sy(124), hex('#8a4a2a')); R.linea(180, sy(96), 180, sy(116), K); R.poligono([[181, sy(98)], [190, sy(114)], [181, sy(114)]], hex('#f4ecd8')); });
  if (polvo > 0 && polvo < 1) for (let k = 0; k < 18; k++) { const x = 50 + k * 8 + Math.round(Math.sin(k) * 4), y = 138 - Math.round(polvo * (8 + (k % 4) * 4)), r = 2 + Math.round(polvo * 3); if (hh(k, 2, 71) < 1 - polvo * 0.6) { R.disco(x, y, r, mez(hex('#c8b898'), hex('#6e4a2c'), polvo * 0.5)); } }
  // Piri detrás de su mesita dibuja; en «true» el foco cruza hasta él y en «amazing» su mapa brilla
  const tru = en('pareidolia', .8853), ama = en('pareidolia', .9494), fx = Math.round(lerp(104, 230, tramo(t, tru - 0.5, tru + 0.2)));
  const pr = R.actor(EL.piri, 222, 123, t, { dir: -1, sostiene: [213, 108 + Math.round(Math.sin(t * 6))], sonrisa: t > ama, habla: false });
  restaurar(CAPAS.get('pz3'), 198, 112, 262, 146);
  R.rect(204, 108, 236, 112, PERG[0]); R.rect(204, 108, 236, 108, PERG[2]); R.linea(210, 108, 214, 111, TIN); R.linea(214, 111, 234, 111, TIN); pluma(pr.mano[0] - 1, pr.mano[1] + 1, -1);
  vela(250, 112, t, 8, 5);
  // el foco: oscurece el escenario fuera del cono
  for (let y = 20; y < 158; y++) { const w = 10 + (y - 20) * 0.28; for (let x = 40; x < 282; x++) { if (Math.abs(x - fx) > w) R.pset(x, y, mez(R.pget(x, y), hex('#0a0814'), 0.45)); else if (tr(x, y, 0.15)) R.pset(x, y, mez(R.pget(x, y), hex('#fff4d0'), 0.3)); } }
  R.rect(fx - 6, 18, fx + 6, 22, hex('#3a3a44')); R.rect(fx - 4, 22, fx + 4, 23, hex('#fff4d0'));
  if (t > ama) { for (let k = 0; k < 6; k++) destello(206 + k * 6, 100 - (k % 2) * 6, ((t - ama) * 1.1 + k / 6) % 1); R.linea(214, 111, 234, 111, Math.floor(t * 6) % 2 ? hex('#ffd040') : hex('#fff0a0')); }
  // el público de espaldas, que mira y aplaude en «amazing»
  const apl = t > ama + 0.2; for (let k = 0; k < 9; k++) { const x = 20 + k * 35, sube = apl ? Math.round(Math.abs(Math.sin(t * 12 + k * 1.3)) * 2) : 0; cabeza(x, 168, PELOS[(k + 3) % 9], k + 1, t, sube);
    if (apl && Math.sin(t * 14 + k) > 0) { R.rect(x - 2, 158 - sube, x + 2, 160 - sube, hex('#e8b088')); R.pset(x, 157 - sube, K); } }
};
const efectos = [[0.15, 'burbujas'], [1.3, 'chof'], [en('pareidolia', .2174), 'pop'], [en('pareidolia', .3182), 'brillo'], [en('pareidolia', .4119) - 0.1, 'lapiz'], [en('pareidolia', .5088), 'publico'],
  [en('pareidolia', .5638), 'lapiz'], [en('pareidolia', .7242) + 0.85, 'golpecito'], [en('pareidolia', .8853) - 0.4, 'interruptor'], [en('pareidolia', .9494) + 0.2, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
""")
