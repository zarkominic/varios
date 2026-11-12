# Borrador de escenas del ep33 (Dune), grupo S6: du-lectores y du-jodo. Formato del 11: E[id] = (título, comentario de
# cabecera, cuerpo). COMUN son las utilidades que comparten las dos escenas (búfer de fondos fijos, bocadillos, cajas).
E = {}

COMUN = r'''
const K = T.C.k, PZ = T.PIEZAS_DU, BL = hex('#fbf9f2'), BLS = hex('#d8d2c4'), ROJO = hex('#d8303a'), ORO = hex('#e8b840'), OROL = hex('#ffe890'), OROS = hex('#a87820');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// un fondo fijo se pinta una vez en su búfer y luego se copia
const CAPAS = {}; const capa = (id, f) => { if (!CAPAS[id]) { const bb = R.nuevo(), prev = R.usar(bb); f(); R.usar(prev); CAPAS[id] = bb; } R.copiar(CAPAS[id]); };
const sale = (u) => 1 - (1 - u) * (1 - u), lin = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
const caja = (x0, y0, x1, y1, c, l, s) => { R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); if (l != null) R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, l); if (s != null) R.rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, s); };
const destello = (x, y, r, c = BL) => { for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } if (r > 1) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y + 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); } };
const elip = (cx, cy, rx, ry, c) => { for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j * j) / (ry * ry)))); R.rect(cx - w, cy + j, cx + w, cy + j, c); } };
const baña = (x0, y0, x1, y1, col, a, f = null) => { for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) { const q = f ? f(x, y) : 1; if (q > 0) R.pset(x, y, mez(R.pget(x, y), col, a * q)); } };
// madera con vetas y juntas
const madera = (x0, y0, x1, y1, c, v, l, k = 0, junta = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const w = y + Math.round(Math.sin(x * 0.045 + (y >> 3) * 1.7 + k) * 1.6), r = hh(x >> 4, w, 900 + k);
  R.pset(x, y, junta && (y - y0) % junta === 0 ? v : r < 0.2 && (x + w * 5) % 23 < 15 ? v : r > 0.9 && (x + w * 3) % 19 < 9 ? l : c); } };
// un bocadillo de pensar con lo que pinte «dibuja»
const burbuja = (x0, y0, x1, y1, cx, cy, dibuja) => {
  R.rect(x0 + 2, y0, x1 - 2, y1, K); R.rect(x0, y0 + 2, x1, y1 - 2, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, K);
  R.rect(x0 + 2, y0 + 1, x1 - 2, y1 - 1, BL); R.rect(x0 + 1, y0 + 2, x1 - 1, y1 - 2, BL); R.rect(x0 + 2, y1 - 2, x1 - 2, y1 - 1, BLS);
  const mx = (x0 + x1) / 2; for (const [u, r] of [[0.35, 2], [0.75, 1]]) { const bx = Math.round(lerp(mx, cx, u)), by = Math.round(lerp(y1 + 2, cy, u)); R.disco(bx, by, r + 1, K); R.disco(bx, by, r, BL); }
  dibuja(); };
// el libro (18 × 24) en la mano de un chibi: a un lado, sin taparle la cara
const libroEn = (m, dir) => PZ.libro(R, m[0] + dir * 6, m[1] + 9);
const arco = (p0, p1, u, alto) => [Math.round(lerp(p0[0], p1[0], u)), Math.round(lerp(p0[1], p1[1], u) - Math.sin(u * Math.PI) * alto)];
const aro = (x, y, r, c) => { for (let i = 0; i < 28; i++) { const an = i / 28 * Math.PI * 2; R.pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r), c); } };
// una gota de sudor
const gota = (x, y) => { R.rect(x, y, x + 1, y + 2, hex('#8ad0f0')); R.pset(x, y - 1, hex('#8ad0f0')); R.pset(x, y + 1, BL); };
// una nota de música (sin letras)
const nota = (x, y, c) => { R.rect(x, y - 7, x, y, c); R.rect(x - 3, y - 1, x, y + 1, c); R.rect(x - 2, y + 2, x - 1, y + 2, c); R.rect(x + 1, y - 7, x + 3, y - 6, c); R.pset(x + 3, y - 5, c); };
'''

E['du-lectores'] = ('Los lectores que nadie esperaba', '''// DU-LECTORES (frases 16–17), 1968 → 1972 → hoy, sin cartela. Siete planos:
// 1. el campus: el vendedor de la mesa de libros ofrece el nuestro y nadie viene... hasta que llegan estudiantes por los
//    dos lados; se lleva una sorpresa («!») y lanza un ejemplar a la primera, que salta con él;
// 2. inserto del catálogo sobre la manta: una mano con un lápiz rodea NUESTRO libro en su casilla; llegan dos manos más
//    (de otra manga cada una) a señalar las herramientas: la guía de toda una generación;
// 3. inserto (fondo local): cinco estudiantes ante el muro de ladrillo del pabellón se pasan el libro de mano en mano;
//    cuando nace el movimiento ecologista se desenrolla una pancarta con un planeta al que le brota una hoja;
// 4. la lámina de la duna en corte: una estudiante levanta el libro y las seis piezas (viento, arena, hierba, agua,
//    escarabajo, pájaro) se encienden una a una: un planeta como un solo sistema vivo (el globo con su hoja);
// 5. el cuarto en 1972: Herbert deja el fardo de periódicos, cuelga la credencial de prensa (se queda meciéndose) y se
//    va a su mesa; Beverly aplaude;
// 6. inserto de la mesa: una mano deja nuestro libro, del libro salen monedas (vive de sus libros) y caen cinco libros
//    más, numerados del 1 al 5;
// 7. inserto (fondo local), hoy: una pared de estantes que se llena de ejemplares; el contador sube a 20 000 000; un
//    lector se lleva uno y el hueco se vuelve a llenar.''', COMUN + r'''
import { manoBaja } from '/atomo/plato/escenas/ov-comun.js';
const a = (s) => en('lectores', (s - 0.5) / 18.624), b = (s) => en('veinte', (s - 19.665) / 10.971);
const P2 = a(4.24), P3 = a(9.32), P4 = a(14.4), P5 = b(19.3), P6 = b(22.9), P7 = b(26.6);

// ── 1 · el campus: lectores que nadie esperaba ──
const OC = { encuadre: 'campus' };
const exp = a(1.26), y68 = a(2.98);
const p1 = (t) => {
  T.hoy(R, t, OC);
  const ul = tramo(t, y68 - 0.2, y68 + 0.25), otro = t > y68 + 0.7;
  // los que llegan: la rubia por la izquierda, dos más por la derecha
  const u1 = tramo(t, 0.9, 2.3), x1 = Math.round(lerp(-20, 66, u1)), coge = ul >= 1, sj = coge ? Math.round(Math.abs(Math.sin((t - y68 - 0.25) * 7)) * 4 * (1 - lin(t, y68 + 0.25, y68 + 1.3))) : 0;
  const A1 = R.actor(EL.estudiante1DU, x1, 162, t, { dir: 1, anda: u1 > 0 && u1 < 1, sostiene: ul > 0 ? [x1 + 21, 138 - sj] : false, dedo: u1 >= 1 && ul <= 0, sonrisa: true, salto: sj });
  const u2 = tramo(t, 1.2, 2.6), x2 = Math.round(lerp(330, 228, u2));
  R.actor(EL.estudiante2DU, x2, 162, t, { dir: -1, anda: u2 > 0 && u2 < 1, dedo: u2 >= 1 && Math.sin(t * 6) > -0.2, sonrisa: true, habla: u2 >= 1 && Math.sin(t * 9) > 0.3 });
  const u3 = tramo(t, 1.7, 3.4), x3 = Math.round(lerp(346, 262, u3));
  R.actor(EL.lector2DU, x3, 164, t, { dir: -1, anda: u3 > 0 && u3 < 1, brazos: u3 >= 1 && Math.sin(t * 8) > 0, sonrisa: true });
  // el vendedor, detrás de la mesa: pregona, se sorprende y lanza un ejemplar
  const ofrece = ul <= 0 || otro, vy = t < exp ? 120 + Math.round(Math.sin(t * 6) * 3) : 122;
  const V = R.actor(EL.estudiante3DU, 132, 152, t, { dir: ul > 0 && !otro ? -1 : t < exp ? (Math.sin(t * 2.4) > 0 ? 1 : -1) : otro ? 1 : -1, sostiene: ofrece ? [otro ? 151 : 128, vy] : false, habla: t < exp && Math.sin(t * 10) > 0, sorpresa: t > exp && t < exp + 0.9, sonrisa: t > exp + 0.9 });
  T.hoyDelante(R, t, OC);
  if (ofrece) libroEn(V.mano, otro ? 1 : -1);
  if (ul > 0 && ul < 1) { const [bx, by] = arco([124, vy + 9], [A1.mano[0] + 6, A1.mano[1] + 9], ul, 22); PZ.libro(R, bx, by); }
  if (coge) { libroEn(A1.mano, 1); if (t < y68 + 1.1 && Math.sin(t * 20) > 0) { destello(A1.mano[0] + 16, A1.mano[1] - 16, 2, OROL); destello(A1.mano[0] - 4, A1.mano[1] - 12, 1); } }
  if (t > exp && t < exp + 0.9) R.bocadillo(V.cabeza[0], V.cabeza[1] - 5 - Math.round(lin(t, exp, exp + 0.15) * 3), { icono: '!' });
};

// ── 2 · el catálogo sobre la manta ──
const OK2 = { encuadre: 'campus', camara: 'catalogo' };
const rec = a(4.48), earth = a(5.56), gen = a(6.98), whole = a(8.02);
const marco = (c, col) => { R.rect(c[0] - 1, c[1] - 1, c[2] + 1, c[1], col); R.rect(c[0] - 1, c[3], c[2] + 1, c[3] + 1, col); R.rect(c[0] - 1, c[1], c[0], c[3], col); R.rect(c[2], c[1], c[2] + 1, c[3], col); };
const p2 = (t) => {
  const g = T.hoy(R, t, OK2), c9 = g.casillas[9], cx = Math.round((c9[0] + c9[2]) / 2), cy = Math.round((c9[1] + c9[3]) / 2), RX = 26, RY = 20;
  // el círculo de lápiz rojo alrededor de nuestro libro
  const ud = lin(t, rec + 0.35, rec + 1.35), N = 120, n = Math.round(N * ud), pt = (i) => { const an = -1.9 + i / N * Math.PI * 2.12; return [Math.round(cx + Math.cos(an) * (RX + i / N * 2)), Math.round(cy + Math.sin(an) * RY)]; };
  for (let i = 0; i < n; i++) { const [x, y] = pt(i); R.rect(x, y, x + 1, y + 1, ROJO); }
  if (ud >= 1 && t < rec + 2.2 && Math.sin(t * 18) > 0) { destello(c9[2] + 4, c9[1] - 4, 2, OROL); destello(c9[0] - 3, c9[3] + 2, 1, OROL); }
  // el otro ejemplar, con la Tierra en la tapa, brilla cuando la voz lo nombra
  if (t > earth && t < earth + 1.2) { const tr = g.tierra ?? [35, 121]; aro(tr[0], tr[1], 15 + Math.round(lin(t, earth, earth + 1.2) * 4), Math.sin(t * 14) > 0 ? OROL : BL); destello(tr[0] + 11, tr[1] - 12, 2, BL); }
  // las manos de los demás: una por la izquierda, otra por arriba
  const c2 = g.casillas[2], c7 = g.casillas[7];
  { const u = sale(lin(t, gen + 0.05, gen + 0.5)); if (u > 0) { const ty = Math.round((c2[1] + c2[3]) / 2) + 3, tap = u >= 1 ? Math.round(Math.abs(Math.sin((t - gen) * 5)) * 2) : 0, wx = Math.round(lerp(-40, c2[0] - 6, u)) - tap;
      if (u >= 1) marco(c2, Math.sin(t * 8) > 0 ? ORO : OROL);
      T.brazo(R, wx - 40, ty + 44, wx, ty, '#3e5a8c', 1, { codo: [wx - 26, ty + 16] }); } }
  { const u = sale(lin(t, whole, whole + 0.45)); if (u > 0) { const tx = Math.round((c7[0] + c7[2]) / 2), tap = u >= 1 ? Math.round(Math.abs(Math.sin((t - whole) * 5 + 1)) * 2) : 0, y = Math.round(lerp(-8, c7[1] + 9, u)) - tap;
      if (u >= 1) marco(c7, Math.sin(t * 8 + 2) > 0 ? ORO : OROL);
      manoBaja(R, tx + 4, -6, tx, y, '#c8683a'); } }
  // la mano del lápiz, por la derecha
  { const ue = sale(lin(t, P2 + 0.05, rec + 0.35)), uo = sale(lin(t, rec + 1.4, rec + 1.9)), p0 = pt(0), pn = pt(Math.min(n, N));
    let tx = ud <= 0 ? lerp(330, p0[0], ue) : pn[0], ty = ud <= 0 ? lerp(150, p0[1], ue) : pn[1];
    if (ud >= 1) { tx = lerp(pn[0], c9[2] + 12, uo); ty = lerp(pn[1], c9[3] + 8, uo) - (uo >= 1 ? Math.round(Math.abs(Math.sin((t - rec) * 4)) * 2) : 0); }
    tx = Math.round(tx); ty = Math.round(ty);
    for (let d = 0; d <= 13; d++) { const x = tx + d, y = ty + Math.round(d * 0.45); R.rect(x, y - 1, x + 1, y + 2, K); }
    for (let d = 0; d <= 13; d++) { const x = tx + d, y = ty + Math.round(d * 0.45); R.rect(x, y, x + 1, y + 1, d < 2 ? ROJO : d < 4 ? hex('#e8c8a0') : d > 11 ? hex('#f4a8b4') : hex('#f0c040')); }
    T.brazo(R, tx + 62, ty + 52, tx + 20, ty + 6, '#a8743c', -1, { codo: [tx + 52, ty + 22] }); }
  T.hoyDelante(R, t, OK2);
};

// ── 3 · inserto: el libro, de mano en mano, ante el muro del pabellón ──
const VENT3 = [70, 250];
const muro = () => {
  const PI = ['#e9dcc0', '#d8c8a6', '#c4b28e', '#f5ecd8'].map(hex), LD = ['#b4553a', '#a3492f', '#c2664a', '#8e3d28'].map(hex), JUN = hex('#d6c2a0');
  for (let y = 0; y < 47; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y > 40 ? (y === 41 ? PI[3] : y > 44 ? PI[2] : PI[1]) : hh(x >> 1, y >> 1, 11) > 0.94 ? PI[1] : PI[0]);
  R.rect(0, 22, 268, 22, PI[1]); for (let x = 22; x < 262; x += 46) R.rect(x, 23, x, 40, PI[1]); for (let x = 3; x < 266; x += 9) R.rect(x, 37, x + 4, 39, PI[2]);
  for (let y = 47; y < 118; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 47) / 6), off = fila % 2 ? 8 : 0, bx = Math.floor((x + off) / 16), junta = (y - 47) % 6 === 0 || (x + off) % 16 === 0, q = hh(bx, fila, 3);
    R.pset(x, y, junta ? JUN : hh(x, y, 5) > 0.94 ? LD[1] : q > 0.82 ? LD[2] : q < 0.14 ? LD[3] : q < 0.45 ? LD[1] : LD[0]); }
  // el zócalo de piedra
  for (let y = 118; y < 134; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 118 ? PI[3] : y === 119 ? PI[0] : y > 131 ? PI[2] : (x + (y > 125 ? 20 : 0)) % 40 === 0 || y === 125 ? PI[2] : hh(x, y, 13) > 0.9 ? PI[1] : PI[0]);
  R.rect(0, 117, 319, 117, K);
  // las dos ventanas de arco
  for (const cx of VENT3) { R.disco(cx, 68, 21, K); R.rect(cx - 21, 68, cx + 21, 108, K); R.disco(cx, 68, 20, PI[0]); R.rect(cx - 20, 68, cx + 20, 108, PI[0]); R.disco(cx, 68, 16, K); R.rect(cx - 16, 68, cx + 16, 106, K);
    R.disco(cx, 68, 15, hex('#24385a')); R.rect(cx - 15, 68, cx + 15, 105, hex('#24385a'));
    for (let y = 54; y < 106; y++) for (let x = cx - 15; x <= cx + 15; x++) { if (R.pget(x, y) !== hex('#24385a')) continue; const dgl = (x - cx + y) % 26; if (dgl > 2 && dgl < 7) R.pset(x, y, hex('#3a5a86')); else if (dgl === 10 && y % 2) R.pset(x, y, hex('#5a82b0')); else if (y > 96) R.pset(x, y, hex('#1a2a48')); }
    R.rect(cx, 53, cx, 105, PI[3]); R.rect(cx - 15, 68, cx + 15, 68, PI[3]); R.rect(cx - 15, 87, cx + 15, 87, PI[3]); R.pset(cx - 1, 68, PI[2]);
    R.rect(cx - 24, 108, cx + 24, 108, K); R.rect(cx - 23, 109, cx + 23, 111, PI[3]); R.rect(cx - 23, 112, cx + 23, 112, PI[2]); R.rect(cx - 24, 113, cx + 24, 113, K);
    R.rect(cx - 2, 46, cx + 2, 50, PI[3]); R.rect(cx - 3, 46, cx + 3, 46, K);
    // una jardinera con geranios en el alféizar
    R.rect(cx - 14, 103, cx + 14, 108, K); R.rect(cx - 13, 104, cx + 13, 107, hex('#8a4a2a')); for (let i = -12; i <= 12; i += 3) { R.rect(cx + i, 100, cx + i + 1, 103, hex('#3a8a3a')); R.rect(cx + i - 1, 98 - (i & 1), cx + i + 1, 100 - (i & 1), i % 2 ? hex('#e8483a') : hex('#f47a8a')); } }
  // el tablón de corcho del centro, con hojas clavadas (manchas nuestras, sin letras)
  caja(128, 62, 192, 106, hex('#8a5a30'), hex('#a8743e'), hex('#5e3a1c')); for (let y = 65; y < 104; y++) for (let x = 131; x < 190; x++) R.pset(x, y, hh(x, y, 17) > 0.8 ? hex('#a8793e') : hh(x, y, 18) > 0.9 ? hex('#d0a060') : hex('#c08c4c'));
  for (const [x, y, w, h2, c1, c2] of [[134, 68, 14, 12, '#f6eed8', '#3a7ac8'], [152, 67, 12, 16, '#f6e4b0', '#d8303a'], [168, 69, 18, 11, '#f6eed8', '#2e8a24'], [135, 85, 17, 14, '#d8ecf4', '#e8a040'], [156, 88, 12, 12, '#f6eed8', '#7a4ab0'], [172, 84, 14, 16, '#f4d8d0', '#3a7ac8']]) { R.rect(x + 1, y + 1, x + w + 1, y + h2 + 1, hex('#8a6030')); R.rect(x, y, x + w, y + h2, hex(c1)); R.disco(x + (w >> 1), y + (h2 >> 1) + 1, 3, hex(c2)); R.rect(x + 2, y + h2 - 2, x + w - 2, y + h2 - 2, hex('#b8ac90')); R.pset(x + (w >> 1), y + 1, ROJO); }
  // el aplique de hierro (lejos de la esquina de Atom)
  R.rect(210, 60, 211, 72, K); R.rect(208, 72, 213, 80, K); R.rect(209, 73, 212, 79, hex('#f6e4b0')); R.rect(207, 71, 214, 71, K);
  R.rect(108, 60, 109, 72, K); R.rect(106, 72, 111, 80, K); R.rect(107, 73, 110, 79, hex('#f6e4b0')); R.rect(105, 71, 112, 71, K);
  // la hiedra
  const hiedra = (x0, x1, y0, y1, k) => { for (let i = 0; i < (x1 - x0) * (y1 - y0) / 7; i++) { const x = x0 + Math.floor(hh(i, 1, k) * (x1 - x0)), y = y0 + Math.floor(hh(i, 2, k) * (y1 - y0)), bd = Math.min(x - x0, x1 - x) / (x1 - x0); if (hh(i, 3, k) > 0.35 + bd * 1.6 && x1 < 300) continue; const q = hh(i, 4, k); R.rect(x, y, x + 2, y + 1, q > 0.7 ? hex('#5aa84a') : q > 0.3 ? hex('#3a8a3a') : hex('#2a6a30')); R.pset(x + 1, y + 2, hex('#1e4e26')); } };
  hiedra(0, 30, 47, 134, 21); hiedra(22, 44, 96, 134, 22); hiedra(292, 320, 64, 134, 23);
  // el césped a franjas, con margaritas y tréboles
  const G = ['#5aae48', '#4e9e40', '#3e8a36', '#74c25a'].map(hex);
  for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) { const fr = ((x + (y - 134) * 2) >> 5) % 2, q = hh(x, y, 31); R.pset(x, y, y < 137 ? G[2] : q > 0.93 ? G[3] : q < 0.1 ? G[2] : fr ? G[0] : G[1]); }
  for (let i = 0; i < 26; i++) { const x = 6 + Math.floor(hh(i, 1, 33) * 308), y = 141 + Math.floor(hh(i, 2, 33) * 36); if (i % 3 === 0) { R.disco(x, y, 2, G[2]); R.pset(x - 1, y - 1, G[3]); R.pset(x + 1, y, G[3]); } else { R.pset(x, y - 1, BL); R.pset(x - 1, y, BL); R.pset(x + 1, y, BL); R.pset(x, y + 1, BL); R.pset(x, y, hex('#f0c040')); } }
  for (let i = 0; i < 40; i++) { const x = Math.floor(hh(i, 5, 34) * 318), y = 140 + Math.floor(hh(i, 6, 34) * 38); R.rect(x, y - 2, x, y, G[2]); R.pset(x + 1, y - 3, G[3]); }
  // la bici apoyada en el zócalo y la mochila con el termo
  const rueda = (x, y) => { for (let i = 0; i < 40; i++) { const an = i / 40 * Math.PI * 2; R.pset(Math.round(x + Math.cos(an) * 9), Math.round(y + Math.sin(an) * 9), K); R.pset(Math.round(x + Math.cos(an) * 8), Math.round(y + Math.sin(an) * 8), hex('#4a4a56')); } for (let i = 0; i < 8; i++) { const an = i / 8 * Math.PI * 2; R.linea(x, y, Math.round(x + Math.cos(an) * 7), Math.round(y + Math.sin(an) * 7), hex('#b8b8c4')); } R.disco(x, y, 1, K); };
  R.rect(4, 151, 44, 152, G[2]); rueda(12, 141); rueda(38, 141);
  for (const [x0, y0, x1, y1] of [[12, 141, 22, 126], [22, 126, 34, 126], [22, 126, 26, 141], [26, 141, 38, 141], [34, 126, 26, 141], [34, 126, 38, 141], [34, 126, 33, 120], [22, 126, 21, 121]]) { R.linea(x0, y0, x1, y1, hex('#d8303a')); R.linea(x0, y0 + 1, x1, y1 + 1, hex('#8e1e26')); }
  R.rect(18, 120, 25, 121, K); R.rect(30, 118, 37, 119, K); R.pset(38, 120, K);
  caja(288, 147, 304, 164, hex('#6a7a3a'), hex('#8a9a4e'), hex('#4a5a26')); R.rect(289, 152, 303, 152, K); R.rect(294, 155, 298, 159, hex('#4a5a26')); R.rect(293, 144, 299, 146, K); caja(307, 152, 313, 164, hex('#d8303a'), hex('#f47a7a')); R.rect(308, 150, 312, 151, hex('#c8c8d0')); R.rect(286, 165, 314, 165, G[2]);
};
const globoHoja = (x, y, r, uh, t) => { R.disco(x, y, r + 1, K); R.disco(x, y, r, hex('#3a7ac8')); R.disco(x - Math.round(r * 0.3), y - Math.round(r * 0.3), Math.round(r * 0.4), hex('#5a9ae0'));
  R.poligono([[x - r * 0.7, y - r * 0.2], [x - r * 0.2, y - r * 0.6], [x + r * 0.1, y - r * 0.1], [x - r * 0.1, y + r * 0.5], [x - r * 0.5, y + r * 0.3]].map(([p, q]) => [Math.round(p), Math.round(q)]), hex('#3aa040'));
  R.poligono([[x + r * 0.3, y - r * 0.5], [x + r * 0.8, y - r * 0.2], [x + r * 0.6, y + r * 0.4], [x + r * 0.25, y + r * 0.1]].map(([p, q]) => [Math.round(p), Math.round(q)]), hex('#3aa040')); R.pset(x - Math.round(r * 0.5), y - Math.round(r * 0.5), BL);
  if (uh > 0) { const hy = Math.round(r * 0.9 * uh) + 2, sw = Math.round(Math.sin(t * 3) * 1); R.rect(x, y - r - hy, x + 1, y - r, hex('#2e8a24')); const w = Math.round(2 + 6 * uh);
    R.poligono([[x + 1, y - r - hy], [x + 1 + w, y - r - hy - 4 + sw], [x + 2 + w, y - r - hy + 1 + sw], [x + 3, y - r - hy + 3]], K); R.poligono([[x + 2, y - r - hy], [x + w, y - r - hy - 2 + sw], [x + w, y - r - hy + sw], [x + 3, y - r - hy + 2]], hex('#6ac84a'));
    if (uh > 0.5) { R.poligono([[x, y - r - hy + 3], [x - w, y - r - hy - 1 - sw], [x - w - 1, y - r - hy + 3 - sw], [x - 2, y - r - hy + 6]], K); R.poligono([[x - 1, y - r - hy + 3], [x - w + 1, y - r - hy + 1 - sw], [x - w + 1, y - r - hy + 2 - sw], [x - 2, y - r - hy + 5]], hex('#4ab040')); } } };
const XS3 = [36, 92, 148, 204, 260], QUIEN3 = ['estudiante1DU', 'lector1DU', 'estudiante2DU', 'lector3DU', 'estudiante3DU'], PASE3 = [9.72, 10.32, 10.92, 11.5].map(a);
const env = a(12.18), born = a(13.66);
const p3 = (t) => {
  capa('muro', muro);
  // sombras que pasan por dentro de las ventanas
  for (const [i, cx] of VENT3.entries()) { R.recorte([cx - 15, 69, cx + 15, 105]); const x = cx - 26 + Math.round(((t * (7 + i * 3) + i * 23) % 52)); R.disco(x, 92, 4, hex('#14203a')); R.poligono([[x - 6, 106], [x - 5, 98], [x + 5, 98], [x + 6, 106]], hex('#14203a')); R.recorte(null); }
  // dos palomas en el zócalo y hojas que caen
  for (const [px, f] of [[222, 0], [234, 1.7]]) { const pk = Math.sin(t * 3 + f) > 0.5 ? 1 : 0, x = px + Math.round(Math.sin(t * 0.5 + f) * 3); R.rect(x - 3, 113, x + 2, 116, hex('#8a8a9a')); R.rect(x + 2, 111 + pk, x + 4, 113 + pk, hex('#6a6a7a')); R.pset(x + 5, 112 + pk, hex('#e8a040')); R.pset(x - 4, 113, hex('#6a6a7a')); R.pset(x, 114, BL); }
  for (let i = 0; i < 5; i++) { const u = (t * 0.16 + i / 5) % 1, x = Math.round(20 + i * 62 + Math.sin(u * 9 + i) * 8), y = Math.round(40 + u * 130); if (y > 48) { R.rect(x, y, x + 1, y, i % 2 ? hex('#e8a040') : hex('#6ac84a')); R.pset(x + 1, y + 1, hex('#8a5a20')); } }
  // el rollo de la pancarta sobre el tablón; se desenrolla cuando nace el movimiento
  const ub = sale(lin(t, env, env + 0.7)), uh = lin(t, born - 0.1, born + 0.6);
  R.rect(116, 50, 204, 56, K); R.rect(117, 51, 203, 55, hex('#f6eed8')); R.rect(117, 54, 203, 55, hex('#cdbf9e')); for (const x of [124, 196]) { R.rect(x, 47, x, 50, K); R.rect(x - 1, 51, x + 1, 55, hex('#2e8a24')); } R.rect(112, 52, 115, 54, hex('#8a5a30')); R.rect(205, 52, 208, 54, hex('#8a5a30'));
  if (ub > 0) { const h2 = Math.round(60 * ub), x0 = 122, x1 = 198;
    for (let y = 56; y <= 56 + h2; y++) { const dx = Math.round(Math.sin(t * 2.2 + y * 0.1) * (y - 56) / 34); R.rect(x0 + dx - 1, y, x1 + dx + 1, y, K); R.rect(x0 + dx, y, x1 + dx, y, hex('#f6eed8')); R.rect(x0 + dx, y, x0 + dx + 2, y, hex('#2e8a24')); R.rect(x1 + dx - 2, y, x1 + dx, y, hex('#2e8a24')); if ((y - 56) % 9 === 8) R.rect(x0 + dx + 3, y, x1 + dx - 3, y, hex('#e6dcc2')); }
    R.rect(x0 - 1, 56 + h2, x1 + 1, 57 + h2, K); R.rect(x0, 55 + h2, x1, 55 + h2, hex('#2e8a24'));
    R.recorte([x0 + 3, 57, x1 - 3, 54 + h2]); globoHoja(160, 92, 15, uh, t);
    for (const [sx, sy] of [[134, 72], [186, 70], [132, 104], [188, 106]]) { R.linea(sx - 2, sy, sx + 2, sy, hex('#f0c040')); R.linea(sx, sy - 2, sx, sy + 2, hex('#f0c040')); }
    R.recorte(null);
    if (uh > 0 && uh < 1 || (uh >= 1 && t < born + 1.2 && Math.sin(t * 16) > 0)) { destello(172, 70, 2, OROL); destello(150, 66, 1, BL); } }
  // el libro: en la mano del que lo tiene, por el aire o cruzando por delante del pecho
  let dueño = 0, vuela = -1, uv = 0, cruza = 0;
  for (let k = 0; k < 4; k++) { if (t >= PASE3[k]) { dueño = k + 1; const f = lin(t, PASE3[k], PASE3[k] + 0.36); if (f < 1) { vuela = k; uv = f; } else cruza = lin(t, PASE3[k] + 0.36, PASE3[k] + 0.56); } }
  if (dueño === 0) cruza = 1;
  const fin = t > PASE3[3] + 0.56, fiesta = t > born, MR = (i) => [XS3[i] + 21, 141], ML = (i) => [XS3[i] - 5, 141];
  const manos = XS3.map((x, i) => {
    const recibe = vuela === i - 1 && vuela >= 0, tiene = dueño === i && vuela < 0, sj = fiesta ? Math.round(Math.abs(Math.sin((t - born) * 6 + i)) * 3) : fin && i === 4 && t < PASE3[3] + 1.3 ? Math.round(Math.abs(Math.sin((t - PASE3[3]) * 7)) * 3) : 0;
    const alza = fin && i === 4 ? Math.round(lin(t, PASE3[3] + 0.6, PASE3[3] + 0.9) * 12) : 0;
    const dir = recibe || (tiene && cruza < 0.5) ? -1 : t > env + 0.3 && i !== 2 ? (i < 2 ? 1 : -1) : 1;
    const sost = recibe ? ML(i) : tiene ? (cruza < 0.5 ? ML(i) : [MR(i)[0], MR(i)[1] - alza - sj]) : false;
    const A = R.actor(EL[QUIEN3[i]], x, 162, t, { dir, sostiene: sost, dedo: !sost && !fiesta && i > dueño && Math.sin(t * 5 + i * 2) > 0.3, brazos: fiesta && !sost && Math.sin(t * 9 + i) > -0.3, sonrisa: i <= dueño || fiesta, habla: !sost && i < dueño && !fiesta && Math.sin(t * 9 + i) > 0.2, salto: sj });
    return A.mano; });
  if (vuela >= 0) { const [bx, by] = arco([MR(vuela)[0] + 6, 150], [ML(vuela + 1)[0] - 6, 150], uv, 20); PZ.libro(R, bx, by); }
  else libroEn(manos[dueño], cruza < 0.5 && dueño > 0 ? -1 : 1);
  if (fin && t < PASE3[3] + 1.4 && Math.sin(t * 18) > 0) { destello(manos[4][0] + 16, manos[4][1] - 16, 2, OROL); destello(manos[4][0] - 3, manos[4][1] - 12, 1); }
  // corazones de los que ya lo han leído
  for (let i = 0; i < dueño; i++) { const u = lin(t, PASE3[i] + 0.3, PASE3[i] + 1.5); if (u > 0 && u < 1) { const x = XS3[i] + 8, y = 134 - Math.round(u * 12); R.rect(x - 2, y - 1, x - 1, y, ROJO); R.rect(x + 1, y - 1, x + 2, y, ROJO); R.rect(x - 2, y, x + 2, y + 1, ROJO); R.rect(x - 1, y + 2, x + 1, y + 2, ROJO); R.pset(x, y + 3, ROJO); R.pset(x - 2, y - 1, hex('#ff9aa0')); } }
};

// ── 4 · la lámina: un planeta como un solo sistema vivo ──
const PIEZA4 = [15.86, 16.22, 16.52, 16.86, 17.34, 17.82].map(a), CAS4 = [[28, 58], [28, 94], [28, 130], [290, 130], [290, 94], [290, 58]];
const nov = a(14.72), living = a(18.2);
const p4 = (t) => {
  let n = 0; for (const s of PIEZA4) if (t >= s) n++;
  const O = { encuadre: 'pueblo', camara: 'corte', piezas: n }; T.oregon(R, t, O);
  // cada pieza se enciende con un aro
  for (let k = 0; k < n; k++) { const u = lin(t, PIEZA4[k], PIEZA4[k] + 0.4); if (u < 1) { const [x, y] = CAS4[k]; for (const r of [14 + Math.round(u * 8), 12 + Math.round(u * 8)]) aro(x, y, r, OROL); destello(x + 14, y - 12, 2, BL); } }
  // el globo con su hoja, en el cielo de la lámina, cuando ya están las seis
  { const u = sale(lin(t, living - 0.2, living + 0.25)); if (u > 0) { const x = 224, y = 62 - Math.round(u * 6); R.disco(x, y, 17, K); R.disco(x, y, 16, BL); R.disco(x, y, 14, hex('#e8f0d8')); globoHoja(x, y + 4, 8, lin(t, living + 0.1, living + 0.7), t);
      if (Math.sin(t * 14) > 0 && t < living + 1) { destello(x + 17, y - 14, 2, OROL); destello(x - 18, y + 8, 1, OROL); } } }
  // la estudiante levanta el libro; su amigo va señalando las piezas
  const ul = tramo(t, nov - 0.35, nov), sj = t > living ? Math.round(Math.abs(Math.sin((t - living) * 7)) * 3 * (1 - lin(t, living, living + 1.0))) : 0;
  const B = R.actor(EL.estudiante3DU, 96, 178, t, { dir: n > 0 && n < 4 ? -1 : 1, dedo: n > 0 && n < 6, sorpresa: n >= 6 && t < living + 0.5, sonrisa: true, habla: n === 0 && Math.sin(t * 9) > 0 });
  const A = R.actor(EL.estudiante2DU, 150, 178, t, { dir: 1, sostiene: [172, Math.round(lerp(160, 150, ul)) - sj], sonrisa: t > nov, habla: t > nov && n < 6 && Math.sin(t * 8) > 0.2, salto: sj });
  libroEn(A.mano, 1);
  if (t > nov - 0.05 && t < nov + 0.7 && Math.sin(t * 18) > 0) { destello(A.mano[0] + 17, A.mano[1] - 16, 2, OROL); destello(A.mano[0] - 4, A.mano[1] - 12, 1, BL); }
  T.oregonDelante(R, t, O);
};

// ── 5 · el cuarto, 1972: deja los periódicos ──
const O5 = { encuadre: 'cuarto', epoca: 1972 };
const fardo = (x, y) => { R.rect(x - 9, y - 9, x + 9, y, K); for (let j = 0; j < 4; j++) { R.rect(x - 8, y - 8 + j * 2, x + 8, y - 8 + j * 2, hex('#e8e4d8')); R.rect(x - 8, y - 7 + j * 2, x + 8, y - 7 + j * 2, hex('#b8b4a8')); } R.rect(x - 7, y - 8, x - 2, y - 8, hex('#3a3a4a')); R.rect(x, y - 8, x + 6, y - 8, hex('#8a8a96')); R.rect(x - 1, y - 9, x, y, hex('#a8743c')); R.rect(x - 9, y - 5, x + 9, y - 5, hex('#a8743c')); };
const PERCHA = [99, 98];
const credencial = (x, y, sw) => { const cx = x + Math.round(sw * 4), cy = y + 15; R.linea(x - 2, y, cx - 2, cy - 8, ROJO); R.linea(x + 2, y, cx + 2, cy - 8, ROJO); R.rect(cx - 5, cy - 8, cx + 5, cy + 6, K); R.rect(cx - 4, cy - 7, cx + 4, cy + 5, BL); R.rect(cx - 4, cy - 7, cx + 4, cy - 5, hex('#2a4a9a')); R.rect(cx - 3, cy - 3, cx, cy + 1, hex('#f0c8a0')); R.rect(cx - 3, cy - 3, cx, cy - 3, hex('#7a4a2a')); R.rect(cx + 2, cy - 2, cx + 3, cy - 2, hex('#8a8a96')); R.rect(cx + 2, cy, cx + 3, cy, hex('#8a8a96')); R.rect(cx - 3, cy + 3, cx + 3, cy + 3, hex('#8a8a96')); };
const p5 = (t) => {
  T.casa(R, t, O5);
  const s = P5, ue = tramo(t, s, s + 0.9), deja = s + 1.05, cuelga = s + 1.95, uw = tramo(t, s + 2.25, s + 3.15), news = b(22.62);
  const hx = uw > 0 ? Math.round(lerp(58, 138, uw)) : Math.round(lerp(-18, 58, ue));
  // la percha de la pared, con la credencial cuando la cuelga
  R.rect(PERCHA[0] - 4, PERCHA[1] - 3, PERCHA[0] + 4, PERCHA[1] - 1, K); R.rect(PERCHA[0] - 3, PERCHA[1] - 2, PERCHA[0] + 3, PERCHA[1] - 2, hex('#c8a040')); R.rect(PERCHA[0], PERCHA[1] - 1, PERCHA[0], PERCHA[1] + 1, K);
  if (t >= cuelga) { const q = t - cuelga; credencial(PERCHA[0], PERCHA[1], Math.sin(q * 7) * Math.exp(-q * 1.1)); if (q < 0.8 && Math.sin(t * 18) > 0) destello(PERCHA[0] + 9, PERCHA[1] + 6, 2, OROL); }
  // Beverly lo mira desde la cómoda y aplaude
  R.actor(EL.beverly, 228, 150, t, { dir: -1, sonrisa: true, brazos: t > cuelga + 0.1 && t < cuelga + 1.3 && Math.sin(t * 14) > 0, habla: t < deja && Math.sin(t * 8) > 0.3 });
  // el fardo de periódicos: en la mano y luego en el suelo
  if (t >= deja) { const q = lin(t, deja, deja + 0.18); fardo(38, Math.round(lerp(140, 151, q * q))); if (q >= 1 && t < deja + 0.5) for (let i = 0; i < 4; i++) R.pset(28 + i * 7, 150 - Math.round((t - deja) * 10) - (i % 2), hex('#e8e0c8')); }
  const alza = t > deja + 0.3 && t < cuelga + 0.25;
  const H = R.actor(EL.herbert, hx, 150, t, { dir: uw > 0 || ue < 1 ? 1 : t < deja + 0.3 ? -1 : 1, anda: (ue > 0 && ue < 1) || (uw > 0 && uw < 1), sostiene: t < deja ? true : alza ? [hx + 22, Math.round(lerp(132, 112, lin(t, deja + 0.3, cuelga)))] : false, sonrisa: t >= cuelga, brazos: uw >= 1 && Math.sin(t * 10) > 0 });
  if (t < deja) fardo(H.mano[0] + 3, H.mano[1] + 8);
  else if (alza && t < cuelga) credencial(H.mano[0] + 2, H.mano[1] - 2, Math.sin(t * 9) * 0.4);
  T.casaDelante(R, t, O5);
};

// ── 6 · la mesa: vive de sus libros, y cinco más ──
const SEC6 = [['#7a2a4a', '#e8a040'], ['#2a5a6a', '#f0d080'], ['#5a3a7a', '#f08a5a'], ['#2e6a3a', '#f6e4b0'], ['#8a4a1e', '#9ad0e8']];
const secuela = (x, y, k) => { const c = hex(SEC6[k][0]), d = hex(SEC6[k][1]);
  R.rect(x - 11, y - 34, x + 15, y + 2, mez(hex('#2a4a2a'), K, 0.5)); caja(x - 13, y - 36, x + 13, y, c, mez(c, BL, 0.35), mez(c, K, 0.4)); R.rect(x - 12, y - 35, x - 11, y - 1, mez(c, K, 0.4)); R.rect(x + 11, y - 34, x + 12, y - 2, hex('#f0e8d0'));
  R.disco(x + 4, y - 27, 3, d); R.pset(x - 5, y - 30, d); R.pset(x - 7, y - 25, d);
  R.poligono([[x - 10, y - 7], [x - 3, y - 14], [x + 3, y - 10], [x + 10, y - 13], [x + 10, y - 2], [x - 10, y - 2]], mez(d, K, 0.3)); R.poligono([[x - 10, y - 5], [x - 3, y - 12], [x + 2, y - 5]], d);
  R.rect(x - 6, y - 23, x + 6, y - 14, K); R.rect(x - 5, y - 22, x + 5, y - 15, BL); R.numero(String(k + 1), x, y - 15, { centro: true, color: K, sombra: false }); };
const moneda = (x, y) => { elip(x, y, 5, 2, K); elip(x, y - 1, 4, 1, ORO); R.rect(x - 2, y - 2, x + 1, y - 2, OROL); };
const live = b(23.46), n5 = b(25.1);
const p6 = (t) => {
  T.casa(R, t, { encuadre: 'cuarto', camara: 'mesa', epoca: 1972, escribe: 0.2 + 0.8 * lin(t, P6, P7), teclea: true });
  // nuestro libro, que una mano deja en la carpeta
  const um = sale(lin(t, P6 + 0.05, P6 + 0.55)), us = lin(t, P6 + 0.7, P6 + 1.2), bx = Math.round(lerp(346, 126, um));
  R.rect(bx - 16, 122, bx + 20, 170, mez(hex('#2a4a2a'), K, 0.5)); PZ.libro(R, bx, 168, { s: 2 });
  // las monedas que salen del libro y se apilan a su lado
  for (let i = 0; i < 6; i++) { const u = lin(t, live - 0.1 + i * 0.16, live + 0.25 + i * 0.16); if (u <= 0) continue; const [x, y] = arco([126, 140], [155, 168 - i * 3], sale(u), 26); moneda(x, y); if (u >= 1 && i === 5 && t < live + 1.6 && Math.sin(t * 16) > 0) destello(x + 6, y - 6, 2, OROL); }
  // los cinco libros siguientes, uno a uno
  for (let k = 0; k < 5; k++) { const s = n5 + k * 0.27, u = lin(t, s, s + 0.2); if (u <= 0) continue; const x = 178 + k * 12, y0 = 170 - (k % 2) * 4, y = Math.round(lerp(y0 - 90, y0, u * u)) - (u >= 1 && t < s + 0.32 ? 2 : 0); secuela(x, y, k); if (u >= 1 && t < s + 0.3) { destello(x + 12, y - 38, 2, OROL); } }
  if (t > n5 + 1.5 && Math.sin(t * 12) > 0.2) { destello(240, 128, 2, OROL); destello(170, 126, 1, BL); }
  if (um > 0 && us < 1) { const wx = Math.round(lerp(bx + 26, 350, us)), wy = 150; T.brazo(R, wx + 60, wy + 44, wx + 14, wy, '#a8743c', -1, { codo: [wx + 48, wy + 16] }); }
  T.casaDelante(R, t, { encuadre: 'cuarto', camara: 'mesa', epoca: 1972 });
};

// ── 7 · inserto: la pared de estantes, hoy ──
const FILAS7 = [54, 86, 118, 150];
const HUECOS7 = []; for (let f = 0; f < 4; f++) for (let i = 0; i < 14; i++) { const x = 15 + i * 22; if (f === 0 && i >= 12) continue; if ((f === 1 || f === 2) && x > 82 && x < 238) continue; HUECOS7.push({ x, y: FILAS7[f], k: HUECOS7.length, tipo: (f * 5 + i * 3) % 4 }); }
HUECOS7.forEach((q) => { q.umbral = q.y === 150 && q.x === 257 ? 0.05 : 0.02 + hh(q.k, 7, 71) * 0.93; });
const estantes = () => {
  madera(0, 0, 319, 24, hex('#8a5a30'), hex('#7a4c26'), hex('#9a6a3a'), 3); R.rect(0, 21, 319, 21, hex('#5e3a1c')); R.rect(0, 22, 319, 22, hex('#a8743e')); R.rect(0, 24, 319, 25, K);
  madera(0, 26, 319, 153, hex('#4e3220'), hex('#422a1a'), hex('#5a3a24'), 5);
  for (const y of FILAS7) { R.rect(0, y + 1, 319, y + 1, K); R.rect(0, y + 2, 319, y + 3, hex('#b07c44')); R.rect(0, y + 2, 319, y + 2, hex('#d09a5a')); R.rect(0, y + 4, 319, y + 4, K); R.rect(0, y + 5, 319, y + 6, hex('#2e1c10')); }
  for (const x of [0, 104, 214, 317]) { R.rect(x, 26, x + 2, 153, hex('#8a5a30')); R.rect(x + 2, 26, x + 2, 153, hex('#5e3a1c')); }
  // el zócalo de cajones y el suelo de tablas
  madera(0, 155, 319, 164, hex('#7a4c26'), hex('#6a4020'), hex('#8a5a30'), 7); for (let x = 39; x < 320; x += 80) { R.rect(x, 156, x, 164, hex('#4e3220')); R.rect(x - 22, 159, x - 16, 160, ORO); R.rect(x - 22, 161, x - 16, 161, OROS); } R.rect(0, 165, 319, 165, K);
  madera(0, 166, 319, 179, hex('#b89060'), hex('#a47e50'), hex('#c8a070'), 9, 7); for (let x = 20; x < 320; x += 54) R.rect(x, 166, x, 172, hex('#8a6a40'));
  // la placa del contador
  R.rect(82, 60, 238, 114, K); R.rect(83, 61, 237, 113, ORO); R.rect(83, 61, 237, 62, OROL); R.rect(83, 112, 237, 113, OROS); R.rect(87, 65, 233, 109, K); R.rect(88, 66, 232, 108, hex('#1a1c2a')); for (let y = 67; y < 108; y += 2) R.rect(89, y, 231, y, hex('#20233a'));
  for (const [x, y] of [[85, 63], [235, 63], [85, 111], [235, 111]]) R.pset(x, y, OROS);
  // la lamparita de latón de encima de la placa
  R.rect(150, 56, 170, 59, K); R.rect(151, 57, 169, 58, ORO); R.rect(159, 54, 161, 56, OROS);
};
const p7 = (t) => {
  capa('estantes', estantes);
  const uf = 0.3 + 0.7 * lin(t, P7 + 0.1, b(29.5)), coge = b(30.5), repone = b(31.3);
  for (const q of HUECOS7) { if (q.umbral > uf) continue; const tA = P7 + 0.1 + Math.max(0, (q.umbral - 0.3) / 0.7) * (b(29.5) - P7 - 0.1), nuevo = q.umbral > 0.3 && t < tA + 0.25;
    if (q.x === 257 && q.y === 150 && t > coge && t < repone) continue;
    const y = q.y - (nuevo ? 2 : 0);
    if (q.tipo === 0) { for (let j = -1; j <= 1; j++) PZ.libro(R, q.x + j * 6, y, { lomo: true }); }
    else PZ.libro(R, q.x, y);
    if (nuevo) destello(q.x + 8, y - 22, 2, OROL);
    else if (Math.sin(t * 2.3 + q.k * 1.9) > 0.97) destello(q.x + 5, y - 19, 1, BL); }
  // el contador: sube hasta 20 000 000
  { const u = lin(t, P7 + 0.3, b(29.52)), v = u >= 1 ? 20000000 : Math.floor(20000000 * u * u / 1000) * 1000 + Math.floor(hh(Math.floor(t * 30), 3, 77) * 999), s = String(v).padStart(8, ' ');
    let x = 93; for (const [g, sep] of [[s.slice(0, 2), 4], [s.slice(2, 5), 4], [s.slice(5, 8), 0]]) { for (const ch of g) { if (ch !== ' ') R.numero(ch, x, 98, { tam: 16 }); x += 16; } x += sep; }
    if (u >= 1 && t < b(29.52) + 1.2 && Math.sin(t * 16) > 0) { destello(86, 62, 3, BL); destello(234, 110, 3, BL); destello(232, 64, 2, OROL); }
    const lz = Math.sin(t * 5) > -0.6; R.rect(152, 60, 168, 60, lz ? OROL : ORO); }
  // los lectores de hoy
  const u1 = lin(t, P7 - 0.4, P7 + 5.6), x1 = Math.round(lerp(-10, 150, u1)); const L1 = R.actor(EL.voluntario1DU, x1, 177, t, { dir: 1, anda: true, sostiene: true, sonrisa: true }); libroEn(L1.mano, 1);
  const u2 = tramo(t, P7 + 1.6, coge - 0.4), x2 = Math.round(lerp(330, 262, u2)), uc = lin(t, coge, coge + 0.3), us = tramo(t, repone - 0.2, repone + 1.4), x2b = Math.round(lerp(262, 330, us));
  const L2 = R.actor(EL.voluntario2DU, us > 0 ? x2b : x2, 177, t, { dir: us > 0 ? 1 : -1, anda: (u2 > 0 && u2 < 1) || us > 0, sostiene: t > coge - 0.3 ? (us > 0 ? true : [x2 - 5, Math.round(lerp(150, 156, uc))]) : false, sonrisa: uc >= 1 });
  if (t > coge) { if (uc < 1) PZ.libro(R, Math.round(lerp(257, L2.mano[0] - 6, uc)), Math.round(lerp(150, L2.mano[1] + 9, uc))); else libroEn(L2.mano, us > 0 ? 1 : -1); }
  R.actor(EL.lector3DU, 40, 178, t, { dir: 1, sostiene: true, sonrisa: true, habla: Math.sin(t * 7) > 0.5 }).mano && 0;
};

const efectos = [[0.9, 'aldea', { k: 2 }], [exp + 0.05, 'pop'], [y68, 'whoosh'], [y68 + 0.3, 'brillo'], [rec + 0.4, 'lapiz'], [earth + 0.1, 'brillo'], [gen + 0.45, 'golpecito'], [whole + 0.42, 'golpecito'],
  [PASE3[0], 'whoosh'], [PASE3[1] + 0.36, 'papel'], [PASE3[2], 'whoosh'], [PASE3[3] + 0.36, 'papel'], [env + 0.05, 'rafaga'], [born + 0.1, 'brillo'], [born + 0.5, 'publico'],
  [nov, 'brillo'], [PIEZA4[0], 'pop'], [PIEZA4[2], 'pop'], [PIEZA4[4], 'pop'], [living, 'campana'],
  [P5 + 1.2, 'golpecito'], [P5 + 1.95, 'cerrojo'], [P5 + 2.3, 'palmada'], [P6 + 0.5, 'papel'], [live + 0.2, 'brillo'], [n5 + 0.2, 'toc'], [n5 + 0.74, 'toc'], [n5 + 1.28, 'toc'],
  [P7 + 0.4, 'tic'], [P7 + 1.4, 'tic'], [b(29.52), 'campana'], [b(30.5) + 0.2, 'papel'], [b(31.3), 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año: (t) => t < P3 ? 1968 : t < P5 ? 1970 : t < P7 ? 1972 : 2026 });
''')

E['du-jodo'] = ('Los derechos y Jodorowsky', '''// DU-JODO (frases 18–19), 1971 → 1974, cartela «1974». Siete planos:
// 1. un plató de Hollywood a principios de los setenta: el agente llega con el libro, el productor lo compra (el libro
//    para uno, el contrato para el otro) y lo levanta; el operador espera junto a la cámara (un reloj en su bocadillo);
// 2. inserto (fondo local), 1973: la silla de director vacía con el contrato y el libro en el asiento; el calendario
//    pasa de 1971 a 1973, un operario apaga la luz y se va: no se rodó nada (claqueta con un 0). Solo el hecho;
// 3. la oficina de París, 1974: el agente trae el contrato, el productor francés lo firma y paga (la bolsa cruza la
//    mesa) y entra Jodorowsky;
// 4. el estudio de París con la pared vacía: Jodorowsky abre los brazos, piensa su planeta (bocadillo) y, cuando la voz
//    dice que su plan no se parecía a nada, los primeros dibujos aparecen en la pared;
// 5. el salón: Jodorowsky le ofrece a Dalí el papel de emperador (bocadillo con una corona); Dalí, en el trono, contesta
//    con un reloj y una bolsa;
// 6. inserto (fondo local), gag 6: el taxímetro junto al trono; baja la bandera, la cifra corre hasta 100 000 y, al dar
//    el reloj la hora entera, salta a 200 000; el productor suda y se le van las monedas;
// 7. inserto (fondo local): la pared del estudio con dos marcos; se revelan las fotos de Welles y del cantante de rock
//    y arranca el tocadiscos con un disco de prisma (nuestro): suben notas y rayos de colores.''', COMUN + r'''
const a = (s) => en('derechos', (s - 1.5) / 16.745), b = (s) => en('dali', (s - 20.078) / 14.362);
const P2 = a(6.84), P3 = a(10.86), P4 = a(16.3), P5 = b(21.98), P6 = b(26.3), P7 = b(30.13);

// ── 1 · Hollywood: el productor se queda los derechos ──
const OP1 = { encuadre: 'plato' };
const holly = a(3.34), pick = a(4.46), s70 = a(5.78);
const p1 = (t) => {
  T.cine(R, t, OP1);
  const ua = tramo(t, a(1.7), holly + 0.6), ax = Math.round(lerp(64, 110, ua)), ub = lin(t, pick, pick + 0.4), uc = lin(t, pick + 0.45, pick + 0.85), alza = lin(t, s70 - 0.2, s70 + 0.1);
  // el operador espera junto a su cámara
  const Op = R.actor(EL.operadorDU, 176, 156, t, { dir: -1, dedo: false, habla: false, triste: t > s70 });
  PZ.camaraCine(R, 206, 156, { t });
  // el productor dirige el decorado, se vuelve y compra
  const vuelto = t > holly - 0.2, px = 142;
  const Pr = R.actor(EL.productorHollywood, px, 156, t, { dir: vuelto ? -1 : 1, dedo: !vuelto && Math.sin(t * 4) > 0, habla: (!vuelto || (ub <= 0 && t > holly + 0.6)) && Math.sin(t * 9) > 0, sostiene: ub > 0 ? [px - 5, Math.round(lerp(134, 118, alza))] : uc <= 0 && t > holly + 0.2 ? [px - 5, 134] : false, sonrisa: ub >= 1 });
  const Ag = R.actor(EL.agenteDU, ax, 156, t, { dir: 1, anda: ua > 0 && ua < 1, sostiene: [ax + 21, 134], sonrisa: uc >= 1, habla: ua >= 1 && ub <= 0 && Math.sin(t * 8 + 1) > 0 });
  T.cineDelante(R, t, OP1);
  // el libro va del agente al productor y el contrato vuelve
  const mA = [Ag.mano[0] + 6, Ag.mano[1] + 9], mP = [px - 11, (ub > 0 ? Pr.mano[1] : 134) + 9];
  if (ub <= 0) PZ.libro(R, mA[0], mA[1]); else if (ub < 1) { const [x, y] = arco(mA, mP, ub, 10); PZ.libro(R, x, y); } else PZ.libro(R, mP[0], mP[1]);
  if (t > holly + 0.2 && uc <= 0 && ub <= 0) PZ.contrato(R, px - 10, 143);
  else if (ub > 0 && uc < 1) { const [x, y] = arco([px - 10, 143], [mA[0], mA[1] + 2], uc, 12); if (uc > 0) PZ.contrato(R, x, y); }
  else if (uc >= 1) PZ.contrato(R, mA[0], mA[1] + 2);
  if (alza > 0 && t < s70 + 1.0 && Math.sin(t * 18) > 0) { destello(mP[0] + 11, mP[1] - 26, 2, OROL); destello(mP[0] - 10, mP[1] - 18, 1, BL); }
  if (t > s70 + 0.3) burbuja(170, 104, 194, 124, Op.cabeza[0], Op.cabeza[1] - 4, () => { R.icono('reloj', 175, 107, K, BLS, 2); const an = t * 5; R.linea(182, 114, 182 + Math.round(Math.sin(an) * 3), 114 - Math.round(Math.cos(an) * 3), ROJO); });
};

// ── 2 · inserto: 1973, la silla vacía ──
const CAL2 = [230, 56];
const plato73 = () => {
  const W = ['#343c4c', '#2c3342', '#3c4658', '#262c38'].map(hex);
  for (let y = 0; y < 122; y++) for (let x = 0; x < 320; x++) { const q = hh(x >> 1, y >> 1, 41); R.pset(x, y, x % 46 === 0 && y > 22 ? W[3] : x % 46 === 1 && y > 22 ? W[2] : y === 22 ? W[3] : y === 23 ? W[2] : q > 0.93 ? W[2] : q < 0.07 ? W[1] : W[0]); }
  for (let x = 23; x < 320; x += 46) for (const y of [30, 114]) { if (x > 270 && y < 50) continue; R.pset(x, y, W[3]); R.pset(x + 1, y, W[2]); }
  // el tubo de los cables y la caja de luces, con su interruptor
  R.rect(0, 46, 268, 47, hex('#1c2028')); R.rect(0, 45, 268, 45, hex('#4c5870')); for (let x = 30; x < 268; x += 58) R.rect(x, 44, x + 3, 48, hex('#1c2028'));
  caja(286, 84, 306, 112, hex('#5a6478'), hex('#7a869c'), hex('#3a4252')); R.rect(294, 48, 297, 84, hex('#1c2028'));
  // el zócalo y el suelo de tablas del plató
  R.rect(0, 116, 319, 121, hex('#1c2028')); R.rect(0, 116, 319, 116, hex('#4c5870'));
  madera(0, 122, 319, 179, hex('#5a4634'), hex('#4c3a2a'), hex('#6a543e'), 13, 15); R.rect(0, 122, 319, 122, K);
  for (let x = 14; x < 320; x += 71) for (let f = 0; f < 4; f++) R.rect(x + f * 17, 123 + f * 15, x + f * 17, 137 + f * 15, hex('#3e2e20'));
  for (const [x, y] of [[196, 150], [40, 172], [300, 140]]) { R.linea(x - 5, y - 3, x + 5, y + 3, hex('#e8c040')); R.linea(x - 5, y + 3, x + 5, y - 3, hex('#e8c040')); }
  for (let x = 150; x < 320; x++) { const y = 172 + Math.round(Math.sin(x * 0.07) * 3); R.rect(x, y, x, y + 1, hex('#1c1c24')); R.pset(x, y, hex('#3a3a48')); }
  // las latas de película y el megáfono
  for (let i = 0; i < 3; i++) { const y = 166 - i * 8, x = 26 + (i % 2) * 3; R.rect(x - 15, y - 7, x + 15, y, K); R.rect(x - 14, y - 6, x + 14, y - 1, hex('#9aa0b0')); R.rect(x - 14, y - 6, x + 14, y - 5, hex('#c8ccd8')); R.rect(x - 14, y - 2, x + 14, y - 1, hex('#6a7080')); R.rect(x - 4, y - 4, x + 4, y - 3, hex('#e8c040')); }
  R.poligono([[168, 150], [190, 142], [190, 168], [168, 160]], K); R.poligono([[169, 151], [189, 144], [189, 166], [169, 159]], hex('#d8303a')); R.rect(162, 152, 168, 158, K); R.rect(163, 153, 167, 157, hex('#3a3a48')); R.rect(189, 144, 190, 166, BL); R.rect(172, 160, 176, 166, K); R.rect(170, 169, 192, 169, hex('#3e2e20'));
  // la silla de director: tijera de madera, asiento y respaldo de lona
  const MA = hex('#b07840'), MAL = hex('#d09a5a'), MAS = hex('#7a4e24'), LO = hex('#b83a34'), LOL = hex('#d85a4a'), LOS = hex('#8a2424');
  const liston = (x0, y0, x1, y1) => { for (let d = -3; d <= 3; d++) R.linea(x0 + d, y0, x1 + d, y1, Math.abs(d) === 3 ? K : d < -1 ? MAL : d > 1 ? MAS : MA); };
  R.rect(58, 167, 152, 168, hex('#3e2e20'));
  for (const x of [66, 142]) { R.rect(x - 3, 44, x + 3, 112, K); R.rect(x - 2, 45, x + 2, 111, MA); R.rect(x - 2, 45, x - 1, 111, MAL); R.rect(x + 2, 45, x + 2, 111, MAS); R.disco(x, 43, 3, K); R.disco(x, 43, 2, MAL); }
  liston(68, 166, 140, 114); liston(140, 166, 68, 114); R.disco(104, 140, 2, K); R.pset(104, 140, hex('#c8c8d0'));
  R.rect(56, 84, 152, 89, K); R.rect(57, 85, 151, 88, MA); R.rect(57, 85, 151, 85, MAL);
  R.rect(62, 106, 146, 116, K); R.rect(63, 107, 145, 115, LO); R.rect(63, 107, 145, 108, LOL); R.rect(63, 114, 145, 115, LOS); for (let x = 70; x < 145; x += 9) R.pset(x, 111, LOS);
  R.rect(69, 50, 139, 72, K); R.rect(70, 51, 138, 71, LO); R.rect(70, 51, 138, 52, LOL); R.rect(70, 69, 138, 71, LOS); for (let x = 74; x < 138; x += 6) R.pset(x, 54, LOL);
  // una estrella en el respaldo (símbolo, sin letras)
  R.poligono([[104, 54], [107, 60], [113, 60], [108, 64], [110, 70], [104, 66], [98, 70], [100, 64], [95, 60], [101, 60]], hex('#f6e4b0'));
  // el cajón con la claqueta apoyada
  caja(226, 138, 300, 168, hex('#8a6a40'), hex('#a8844e'), hex('#5e4426')); for (const y of [148, 158]) R.rect(227, y, 299, y, hex('#5e4426')); for (const x of [244, 282]) R.rect(x, 139, x + 1, 167, hex('#5e4426')); R.rect(224, 169, 302, 169, hex('#3e2e20'));
  // el taco del calendario (solo el soporte: la hoja la pinta el plano)
  R.rect(CAL2[0] - 39, CAL2[1] - 4, CAL2[0] + 41, CAL2[1] + 54, hex('#1c2028')); caja(CAL2[0] - 40, CAL2[1] - 6, CAL2[0] + 40, CAL2[1] + 52, BL, null, BLS); R.rect(CAL2[0] - 39, CAL2[1] - 5, CAL2[0] + 39, CAL2[1] + 8, ROJO); R.rect(CAL2[0] - 39, CAL2[1] + 8, CAL2[0] + 39, CAL2[1] + 8, hex('#8e1e26'));
  for (const dx of [-22, 22]) { R.rect(CAL2[0] + dx - 2, CAL2[1] - 10, CAL2[0] + dx + 2, CAL2[1] - 1, K); R.rect(CAL2[0] + dx - 1, CAL2[1] - 9, CAL2[0] + dx + 1, CAL2[1] - 2, hex('#c8c8d0')); }
  for (let i = 0; i < 7; i++) R.rect(CAL2[0] - 30 + i * 9, CAL2[1] + 44, CAL2[0] - 25 + i * 9, CAL2[1] + 46, i === 5 ? ROJO : hex('#b8b4a8'));
};
const y73 = a(7.64), nada = a(8.74);
const p2 = (t) => {
  capa('plato73', plato73);
  // el calendario: 1971 → 1972 → 1973
  const f1 = P2 + 0.2, f2 = y73 - 0.08, año2 = t < f1 ? 1971 : t < f2 ? 1972 : 1973;
  R.numero(String(año2), CAL2[0], CAL2[1] + 36, { tam: 16, centro: true });
  for (const f of [f1, f2]) { const u = lin(t, f - 0.18, f); if (u > 0 && u < 1) { const yy = Math.round(lerp(CAL2[1] + 50, CAL2[1] + 12, u)); R.poligono([[CAL2[0] - 38, CAL2[1] + 10], [CAL2[0] + 38, CAL2[1] + 10], [CAL2[0] + 38 - Math.round(u * 8), yy], [CAL2[0] - 38 + Math.round(u * 4), yy + 3]], BL); R.rect(CAL2[0] - 36, yy, CAL2[0] + 32, yy, BLS); } }
  if (t >= f2 && t < f2 + 0.7 && Math.sin(t * 18) > 0) { destello(CAL2[0] + 42, CAL2[1] - 4, 2, BL); destello(CAL2[0] - 40, CAL2[1] + 50, 2, BL); }
  // el contrato y el libro, en el asiento; la claqueta sin estrenar, con su 0
  PZ.contrato(R, 88, 107, { s: 2 }); PZ.libro(R, 122, 107, { s: 2 });
  PZ.claqueta(R, 262, 138, { s: 2 }); R.rect(253, 118, 271, 132, K); R.numero('0', 262, 130, { centro: true });
  // el operario cruza, baja el interruptor y se va
  const luz = 1 - lin(t, nada, nada + 0.35), uo = tramo(t, P2 + 0.1, nada - 0.25), sal = tramo(t, nada + 0.5, nada + 1.9), ox = sal > 0 ? Math.round(lerp(272, 330, sal)) : Math.round(lerp(196, 272, uo));
  { const on = luz > 0.5; R.rect(293, 92, 299, 104, K); R.rect(294, 93, 298, 103, hex('#c8ccd8')); R.rect(295, on ? 94 : 99, 297, on ? 98 : 102, on ? hex('#6ac84a') : ROJO); R.pset(296, 88, on ? hex('#6ac84a') : hex('#3a4252')); }
  R.actor(EL.operarioDU, ox, 170, t, { dir: 1, anda: (uo > 0 && uo < 1) || sal > 0, sostiene: uo >= 1 && sal <= 0 ? [ox + 22, 148] : false, triste: true });
  // el haz del foco sobre la silla: motas de polvo; al apagarse, todo queda en penumbra
  const cono = (x, y) => { const w = 16 + (y / 180) * 62; return Math.abs(x - 104) < w ? 1 : 0; };
  if (luz > 0) baña(20, 22, 190, 179, hex('#fff0c0'), 0.2 * luz, (x, y) => cono(x, y) && ((x + y) % 2 === 0 || Math.abs(x - 104) < 10 + y * 0.25) ? 1 : 0);
  for (let i = 0; i < 16; i++) { const u = (t * 0.07 + hh(i, 1, 43)) % 1, y = Math.round(30 + u * 130), x = Math.round(104 + (hh(i, 2, 43) - 0.5) * (30 + y * 0.6) + Math.sin(t + i) * 3); if (luz > 0.3) R.pset(x, y, hex('#fff4c8')); else if (i % 3 === 0) R.pset(x, y, hex('#5a6478')); }
  if (luz < 1) baña(0, 0, 319, 179, hex('#10121c'), 0.42 * (1 - luz), (x, y) => (x > 276 && y < 46) || (y < 21 && x < 172) ? 0 : 1);
  // una polilla da vueltas donde estaba la luz
  if (luz < 0.5) { const x = Math.round(104 + Math.cos(t * 2.3) * 22), y = Math.round(64 + Math.sin(t * 3.1) * 10), al = Math.sin(t * 30) > 0 ? 2 : 1; R.pset(x, y, BL); R.pset(x - al, y - 1, hex('#c8c0a8')); R.pset(x + al, y - 1, hex('#c8c0a8')); }
};

// ── 3 · la oficina de París: un grupo francés compra los derechos ──
const O3 = { encuadre: 'plato', camara: 'oficina', lugar: 'paris' };
const fr = a(13.42), bought = a(14.12), chile = a(15.06);
const p3 = (t) => {
  T.cine(R, t, O3);
  const ua = tramo(t, P3, P3 + 1.3), ax = Math.round(lerp(8, 72, ua)), uc = lin(t, fr - 0.35, fr + 0.05), firma = t > bought && t < bought + 0.6, ub = lin(t, bought + 0.55, bought + 1.0);
  const uj = tramo(t, chile - 0.25, chile + 0.8), jx = Math.round(lerp(330, 240, uj));
  // el productor francés, tras el escritorio
  const Fr = R.actor(EL.productorFrances, 142, 147, t, { dir: uj > 0.6 ? 1 : -1, habla: uc <= 0 && Math.sin(t * 8) > 0.2, sostiene: firma ? [160 + Math.round(Math.sin(t * 30) * 2), 139] : false, dedo: uj > 0.6, sonrisa: t > bought + 0.6 });
  const Ag = R.actor(EL.agenteDU, ax, 158, t, { dir: 1, anda: ua > 0 && ua < 1, sostiene: uc < 1 || ub > 0.9 ? [ax + 21, 136] : false, sonrisa: ub >= 1, habla: ua >= 1 && uc <= 0 && Math.sin(t * 9 + 2) > 0.2 });
  if (uj > 0) { const llego = uj >= 1, sj = llego && t < chile + 1.5 ? Math.round(Math.abs(Math.sin((t - chile - 0.8) * 7)) * 3) : 0; R.actor(EL.jodorowsky, jx, 158, t, { dir: -1, anda: !llego, brazos: llego && Math.sin(t * 6) > -0.5, sonrisa: true, salto: sj }); if (llego && Math.sin(t * 16) > 0) { destello(jx + 8, 124 - sj, 2, OROL); } }
  T.cineDelante(R, t, O3);
  // el contrato: de la mano del agente a la mesa; la firma y el sello
  const m0 = [Ag.mano[0] + 4, 147];
  if (uc <= 0) PZ.contrato(R, m0[0], m0[1]); else { const [x, y] = uc < 1 ? arco(m0, [164, 148], uc, 14) : [164, 148]; PZ.contrato(R, x, y); }
  if (firma) { R.linea(Fr.mano[0], Fr.mano[1], Fr.mano[0] + 3, Fr.mano[1] + 5, K); R.pset(Fr.mano[0] + 3, Fr.mano[1] + 6, hex('#2a4a9a')); }
  if (t > bought + 0.5 && t < bought + 1.1 && Math.sin(t * 18) > 0) { destello(170, 132, 2, OROL); destello(156, 128, 1, BL); }
  // la bolsa cruza la mesa hasta el agente
  if (t > bought + 0.3) { const [x, y] = ub < 1 ? arco([140, 140], [Ag.mano[0] + 2, Ag.mano[1] + 2], ub, 16) : [Ag.mano[0] + 2, Ag.mano[1] + 2]; R.disco(x, y - 6, 8, K); R.disco(x, y - 6, 7, hex('#c8a040')); R.rect(x - 3, y - 15, x + 3, y - 12, K); R.rect(x - 2, y - 14, x + 2, y - 13, hex('#e8c860')); R.rect(x - 4, y - 12, x + 4, y - 11, hex('#8a2424')); R.disco(x - 2, y - 8, 2, hex('#e8c860')); R.numero('$', x, y - 2, { centro: true, color: K, sombra: false }); }
};

// ── 4 · el estudio vacío: un plan que no se parecía a nada ──
const named = a(17.18), plan = b(20.08);
const planeta4 = (x, y) => { R.disco(x, y, 9, K); R.disco(x, y, 8, hex('#f08a2a')); R.disco(x - 3, y - 3, 3, hex('#f6c468')); R.rect(x - 6, y + 2, x + 5, y + 3, hex('#c8643a')); R.rect(x - 4, y + 5, x + 3, y + 5, hex('#c8643a')); R.disco(x + 13, y - 7, 3, K); R.disco(x + 13, y - 7, 2, hex('#f6e4b0')); R.disco(x - 12, y - 5, 2, K); R.pset(x - 12, y - 5, hex('#cdbf9e')); R.pset(x - 12, y - 6, hex('#cdbf9e')); };
const p4 = (t) => {
  const d = 0.3 * lin(t, plan + 0.15, b(21.7)), O = { encuadre: 'paris', dibujos: d, mesa: 'limpia' };
  T.cine(R, t, O);
  const ue = tramo(t, P4, P4 + 0.7), jx = Math.round(lerp(204, 150, ue)), abre = t > named - 0.25 && t < named + 1.2, piensa = t > named + 1.3 && t < plan - 0.05, sj = t > b(21.1) ? Math.round(Math.abs(Math.sin((t - b(21.1)) * 7)) * 3) : 0;
  // el productor francés mira la pared vacía y luego los dibujos
  const u2 = tramo(t, P4 + 0.3, P4 + 1.4), fx = Math.round(lerp(20, 68, u2));
  R.actor(EL.productorFrances, fx, 148, t, { dir: 1, anda: u2 > 0 && u2 < 1, sorpresa: d > 0.05 && d < 0.28, sonrisa: d >= 0.28, dedo: d > 0.1 && Math.sin(t * 6) > 0 });
  const J = R.actor(EL.jodorowsky, jx, 148, t, { dir: t > plan ? -1 : ue < 1 ? -1 : 1, anda: ue < 1, brazos: abre || (t > plan + 0.2 && Math.sin(t * 7) > -0.2), habla: (t > plan && Math.sin(t * 9) > 0) || (ue >= 1 && !abre && !piensa && Math.sin(t * 9) > 0.3), sonrisa: true, salto: sj });
  T.cineDelante(R, t, O);
  if (abre && Math.sin(t * 16) > 0) { destello(jx - 6, 116, 2, OROL); destello(jx + 22, 114, 2, OROL); }
  if (piensa) { const q = lin(t, named + 1.3, named + 1.5), y0 = 82 - Math.round(q * 4); burbuja(132, y0, 184, y0 + 28, J.cabeza[0], J.cabeza[1] - 4, () => { planeta4(158, y0 + 15); if (Math.sin(t * 9) > 0) destello(176, y0 + 8, 1, ORO); }); }
  // cada dibujo que aparece, con su chispa
  if (d > 0 && d < 0.3) for (let i = 0; i < 4; i++) { const x = 16 + Math.floor(hh(i, Math.floor(t * 6), 61) * 90) + (i % 2) * 176, y = 28 + Math.floor(hh(i, Math.floor(t * 6), 62) * 60); destello(x, y, 2, OROL); }
};

// ── 5 · el salón: Dalí, emperador ──
const O5 = { encuadre: 'paris', camara: 'salon' };
const dali = b(22.92), emp = b(23.96), acc = b(24.86);
const p5 = (t) => {
  T.cine(R, t, O5); PZ.trono(R, 231, 141, {});
  const D = R.actor(EL.dali, 223, 131, t, { dir: -1, dedo: t > acc + 0.5, habla: t > acc + 0.3 && Math.sin(t * 8) > 0.2 });
  const uj = tramo(t, P5, dali), jx = Math.round(lerp(40, 126, uj));
  const u2 = tramo(t, P5 + 0.2, emp), fx = Math.round(lerp(-10, 78, u2));
  const F = R.actor(EL.productorFrances, fx, 158, t, { dir: 1, anda: u2 > 0 && u2 < 1, sostiene: u2 >= 1, sorpresa: t > acc + 1.0 });
  if (u2 >= 1) { R.rect(F.mano[0] + 1, F.mano[1] - 3, F.mano[0] + 9, F.mano[1] + 7, K); R.rect(F.mano[0] + 2, F.mano[1] - 2, F.mano[0] + 8, F.mano[1] + 6, BL); R.rect(F.mano[0] + 3, F.mano[1], F.mano[0] + 7, F.mano[1], hex('#8a8a96')); R.rect(F.mano[0] + 3, F.mano[1] + 2, F.mano[0] + 6, F.mano[1] + 2, hex('#8a8a96')); }
  const J = R.actor(EL.jodorowsky, jx, 157, t, { dir: 1, anda: uj < 1, dedo: uj >= 1 && t < emp - 0.15, brazos: t > emp - 0.15 && t < acc, habla: uj >= 1 && t < acc && Math.sin(t * 9) > 0, sonrisa: true });
  T.cineDelante(R, t, O5);
  // la oferta: una corona; la respuesta: un reloj y una bolsa
  if (t > emp - 0.2 && t < acc + 0.4) { const q = lin(t, emp - 0.2, emp), y0 = 108 - Math.round(q * 4); burbuja(116, y0, 156, y0 + 22, J.cabeza[0], J.cabeza[1] - 4, () => { R.rect(127, y0 + 14, 145, y0 + 17, K); R.rect(128, y0 + 15, 144, y0 + 16, ORO); for (const dx of [0, 8, 16]) { R.poligono([[127 + dx, y0 + 14], [128 + dx, y0 + 5], [130 + dx, y0 + 14]], K); R.rect(128 + dx, y0 + 8, 128 + dx, y0 + 14, ORO); R.pset(128 + dx, y0 + 6, ROJO); } R.rect(131, y0 + 11, 141, y0 + 14, ORO); R.pset(136, y0 + 15, hex('#3a7ac8')); }); }
  if (t > acc + 0.5) { const q = lin(t, acc + 0.5, acc + 0.7), y0 = 70 - Math.round(q * 4); burbuja(176, y0, 222, y0 + 22, D.cabeza[0], D.cabeza[1] - 6, () => { R.icono('reloj', 181, y0 + 4, K, BLS, 2); const an = t * 6; R.linea(188, y0 + 11, 188 + Math.round(Math.sin(an) * 3), y0 + 11 - Math.round(Math.cos(an) * 3), ROJO); R.icono('bolsa', 202, y0 + 3, OROS, BLS, 2); }); }
  if (t > acc + 1.0) { const u = ((t - acc) * 1.4) % 1; gota(F.cabeza[0] + 9, F.cabeza[1] + 2 + Math.round(u * 6)); }
};

// ── 6 · inserto: el taxímetro (gag 6) ──
const salonCerca = () => {
  const WP = ['#6a2438', '#5c1e30', '#7a2e44', '#8a3a50'].map(hex), CR = ['#f0e4c8', '#d8c8a4', '#b8a680'].map(hex);
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) { const liso = y < 52 && x > 262, u = ((x % 24) - 12), v = (((y + (Math.floor(x / 24) % 2) * 12) % 24) - 12), dm = Math.abs(u) + Math.abs(v);
    R.pset(x, y, y < 9 ? (y === 8 ? CR[2] : y > 5 ? CR[1] : CR[0]) : liso ? (x % 12 === 0 ? WP[1] : WP[0]) : dm === 9 ? WP[2] : dm < 3 ? WP[3] : dm === 5 && (x + y) % 2 ? WP[2] : x % 12 === 0 ? WP[1] : WP[0]); }
  R.rect(0, 9, 319, 9, K);
  // el friso de madera con molduras y el parqué en espiga
  madera(0, 124, 319, 139, hex('#5a3420'), hex('#4a2a18'), hex('#6a4028'), 21); R.rect(0, 123, 319, 123, K); R.rect(0, 124, 319, 125, ORO); R.rect(0, 126, 319, 126, OROS); for (let x = 10; x < 320; x += 52) { R.rect(x, 129, x + 40, 137, hex('#4a2a18')); R.rect(x + 1, 130, x + 39, 136, hex('#6a4028')); R.rect(x + 1, 136, x + 39, 136, hex('#3a2012')); }
  R.rect(0, 140, 319, 140, K);
  for (let y = 141; y < 180; y++) for (let x = 0; x < 320; x++) { const cx = Math.floor(x / 14), l = cx % 2 ? (x % 14) + (y - 141) : 13 - (x % 14) + (y - 141), q = hh(cx, Math.floor(l / 7), 23); R.pset(x, y, l % 7 === 0 || x % 14 === 0 ? hex('#7a5630') : q > 0.7 ? hex('#c89a5c') : q < 0.25 ? hex('#a87c44') : hex('#b88a50')); }
  // la tarima del trono con su alfombra roja, y el trono de lado (solo se ve su mitad)
  R.rect(0, 160, 110, 179, K); R.rect(0, 161, 109, 179, hex('#7a2a2a')); R.rect(0, 161, 109, 162, hex('#b84a3a')); for (let x = 4; x < 108; x += 8) { R.pset(x, 168, ORO); R.pset(x + 4, 174, ORO); } R.rect(0, 165, 109, 165, ORO); R.rect(104, 161, 109, 179, hex('#5a1c1c'));
  PZ.trono(R, 14, 164, { s: 4 });
  // la mesita dorada con tablero de mármol
  R.rect(120, 172, 286, 173, hex('#6a4a28'));
  for (const x of [128, 274]) { for (let y = 150; y < 172; y++) { const dx = Math.round(Math.sin((y - 150) / 22 * Math.PI) * 3) * (x < 200 ? -1 : 1); R.rect(x + dx - 3, y, x + dx + 3, y, K); R.rect(x + dx - 2, y, x + dx + 2, y, ORO); R.pset(x + dx - 2, y, OROL); R.pset(x + dx + 2, y, OROS); } R.rect(x - 5, 170, x + 5, 172, K); R.rect(x - 4, 171, x + 4, 171, ORO); }
  R.rect(120, 147, 282, 153, K); R.rect(121, 148, 281, 152, ORO); R.rect(121, 148, 281, 148, OROL); for (let x = 128; x < 280; x += 10) { R.disco(x, 151, 1, OROS); }
  R.rect(116, 141, 286, 147, K); for (let x = 117; x < 286; x++) for (let y = 142; y < 147; y++) R.pset(x, y, hh(x + y * 3 >> 2, y, 25) > 0.8 || (x + y * 4) % 37 < 2 ? hex('#b8b8c8') : y === 142 ? BL : hex('#e8e6ee'));
  // el taxímetro: la caja negra con cromados, la ventanilla y los botones
  R.rect(128, 84, 274, 141, K); R.rect(129, 85, 273, 140, hex('#2a2c38')); R.rect(129, 85, 273, 87, hex('#5a5e72')); R.rect(129, 137, 273, 140, hex('#16171f')); R.rect(129, 88, 130, 136, hex('#3e4152')); R.rect(272, 88, 273, 136, hex('#16171f'));
  for (let y = 90; y < 136; y += 2) for (let x = 132; x < 272; x += 2) if (hh(x, y, 27) > 0.86) R.pset(x, y, hex('#343746'));
  R.rect(134, 92, 268, 122, hex('#c8ccd8')); R.rect(135, 93, 267, 121, K); R.rect(136, 94, 266, 120, hex('#1c0a0c'));
  for (const [x, c] of [[142, '#c8ccd8'], [156, '#c8ccd8'], [170, '#e8c040']]) { R.disco(x, 130, 4, K); R.disco(x, 130, 3, hex(c)); R.pset(x - 1, 129, BL); }
  R.rect(236, 126, 262, 134, K); R.rect(237, 127, 261, 133, hex('#c8ccd8')); R.rect(240, 129, 258, 131, K);
  for (const x of [136, 262]) { R.rect(x, 141, x + 6, 142, K); }
  // el cuello de latón que sube al reloj
  R.rect(192, 74, 210, 84, K); R.rect(193, 75, 209, 83, ORO); R.rect(193, 75, 195, 83, OROL); R.rect(206, 75, 209, 83, OROS);
  // un candelabro de pared a la izquierda y un cuadrito ovalado
  elip(160, 46, 13, 17, K); elip(160, 46, 12, 16, ORO); elip(160, 46, 9, 13, hex('#2a3a5a')); elip(160, 50, 8, 8, hex('#e8a040')); R.disco(157, 40, 3, hex('#f6e4b0')); R.disco(165, 37, 1, hex('#f6e4b0')); R.rect(152, 52, 168, 53, hex('#c8643a'));
};
const asked = b(27.22), cien = b(27.88), hora = b(28.86);
const p6 = (t) => {
  capa('salonCerca', salonCerca);
  const corre = t > asked, u100 = lin(t, cien - 0.25, cien + 0.6), vuelta = lin(t, cien + 0.6, b(29.62)), dos = vuelta >= 1;
  // la esfera: el minutero da la vuelta entera a la hora
  { const cx = 201, cy = 48; R.disco(cx, cy, 27, K); R.disco(cx, cy, 26, ORO); for (let i = 0; i < 40; i++) { const an = i / 40 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(an) * 25), Math.round(cy + Math.sin(an) * 25), i % 2 ? OROL : OROS); } R.disco(cx, cy, 22, K); R.disco(cx, cy, 21, hex('#f6eed8')); R.disco(cx - 5, cy - 5, 12, BL);
    for (let i = 0; i < 12; i++) { const an = i / 12 * Math.PI * 2, r0 = i % 3 ? 18 : 16; R.linea(Math.round(cx + Math.sin(an) * r0), Math.round(cy - Math.cos(an) * r0), Math.round(cx + Math.sin(an) * 20), Math.round(cy - Math.cos(an) * 20), K); }
    const am = (corre ? (dos ? 0.04 * Math.sin((t - b(29.62)) * 20) * Math.exp(-(t - b(29.62)) * 4) : vuelta) : (t - P6) * 0.02) * Math.PI * 2, ah = 0.9;
    if (vuelta > 0 && !dos) { for (let i = 0; i < Math.round(vuelta * 60); i++) { const an = i / 60 * Math.PI * 2; for (const r of [12, 13, 14]) R.pset(Math.round(cx + Math.sin(an) * r), Math.round(cy - Math.cos(an) * r), hex('#f4a8a0')); } }
    R.linea(cx, cy, Math.round(cx + Math.sin(ah) * 10), Math.round(cy - Math.cos(ah) * 10), K); R.linea(cx + 1, cy, Math.round(cx + 1 + Math.sin(ah) * 10), Math.round(cy - Math.cos(ah) * 10), K);
    R.linea(cx, cy, Math.round(cx + Math.sin(am) * 18), Math.round(cy - Math.cos(am) * 18), ROJO); R.linea(cx, cy + 1, Math.round(cx + Math.sin(am) * 18), Math.round(cy + 1 - Math.cos(am) * 18), ROJO); R.disco(cx, cy, 2, K); R.pset(cx, cy, OROL);
    // las campanillas de arriba
    const tl = dos && t < b(29.62) + 0.7 ? Math.round(Math.sin(t * 50) * 2) : 0; for (const s of [-1, 1]) { R.disco(cx + s * 17 + tl, cy - 28, 6, K); R.disco(cx + s * 17 + tl, cy - 28, 5, ORO); R.pset(cx + s * 17 + tl - 2, cy - 30, OROL); } R.rect(cx - 1, cy - 34, cx + 1, cy - 27, K); R.disco(cx + tl, cy - 35, 2, OROS); }
  // la bandera roja: levantada (libre) y bajada cuando empieza a correr
  { const ub2 = sale(lin(t, asked - 0.1, asked + 0.15)), an = lerp(-1.2, 0.25, ub2), px = 262, py = 84, ex = Math.round(px + Math.cos(an) * 26), ey = Math.round(py + Math.sin(an) * 26); for (let d = -1; d <= 1; d++) R.linea(px, py + d, ex, ey + d, d ? K : hex('#c8ccd8'));
    R.poligono([[ex - 2, ey - 10], [ex + 14, ey - 8], [ex + 14, ey + 3], [ex - 2, ey + 3]], K); R.poligono([[ex - 1, ey - 9], [ex + 13, ey - 7], [ex + 13, ey + 2], [ex - 1, ey + 2]], ROJO); R.rect(ex + 1, ey - 6, ex + 10, ey - 5, hex('#ff8a8a')); R.disco(px, py, 3, K); R.disco(px, py, 2, hex('#c8ccd8')); }
  // la cifra, en rojo
  { const v = dos ? 200000 : u100 >= 1 ? 100000 : Math.floor(100000 * u100 / 100) * 100 + (u100 > 0 ? Math.floor(hh(Math.floor(t * 30), 2, 81) * 99) : 0), s = '$' + String(v), sal2 = dos && t < b(29.62) + 0.25 ? 2 : 0;
    let x = 262 - s.length * 16; for (const ch of s) { R.numero(ch, x, 116 - sal2, { tam: 16, rampa: [hex('#ffb0a0'), hex('#ff5040'), hex('#e02820'), hex('#a01410')], contorno: false, sombra: false }); x += 16; }
    if ((u100 >= 1 && t < cien + 1.0 || dos) && Math.sin(t * 16) > 0) { destello(137, 95, 2, hex('#ff8a8a')); destello(265, 119, 2, hex('#ff8a8a')); } }
  // la mano de Dalí en el brazo del trono, que tamborilea
  { const tap = Math.sin(t * 9) > 0.4 ? 1 : 0; T.mano(R, 58, 108 - tap, 1, '#1c1c28', { sinManga: true }); R.rect(40, 103 - tap, 55, 112 - tap, K); R.rect(40, 104 - tap, 54, 111 - tap, hex('#1c1c28')); R.rect(40, 104 - tap, 54, 105 - tap, hex('#3a3a4e')); R.rect(52, 104 - tap, 54, 111 - tap, BL); R.pset(53, 108 - tap, ORO); }
  // el productor suda y sus monedas se van solas a la ranura
  const susto = dos && t < b(29.62) + 0.6, sj = susto ? Math.round(Math.sin((t - b(29.62)) / 0.6 * Math.PI) * 5) : 0;
  const F = R.actor(EL.productorFrances, 296, 174, t, { dir: -1, sorpresa: u100 > 0.2, salto: sj });
  if (corre) for (let i = 0; i < 3; i++) { const u = ((t - asked) * 1.3 + i / 3) % 1; gota(F.cabeza[0] - 6 + i * 7 + Math.round((i - 1) * u * 5), F.cabeza[1] - 3 + Math.round(u * u * 12)); }
  if (u100 > 0) for (let i = 0; i < 5; i++) { const u = ((t - cien) * 0.9 + i / 5) % 1, [x, y] = arco([F.mano[0] - 2, F.mano[1] + 6], [250, 130], u, 26); if (x > 252) { R.disco(x, y, 3, K); R.disco(x, y, 2, ORO); R.pset(x - 1, y - 1, OROL); } }
};

// ── 7 · inserto: Welles, el cantante de rock y un disco con un prisma ──
const F7 = [[30, 34], [108, 34]];
const paredFotos = () => {
  const PA = ['#e8dcc0', '#dfd2b4', '#f0e6cc', '#cfc09e'].map(hex);
  for (let y = 0; y < 126; y++) for (let x = 0; x < 320; x++) { const q = hh(x >> 1, y >> 1, 51); R.pset(x, y, y < 12 ? (y === 11 ? PA[3] : PA[2]) : q > 0.95 ? PA[1] : q < 0.03 && !(x > 270 && y < 50) ? PA[3] : PA[0]); }
  R.rect(0, 12, 319, 12, hex('#b8a680'));
  for (const [x, y] of [[196, 30], [12, 60]]) { for (let i = 0; i < 14; i++) R.pset(x + i * 2 + Math.round(Math.sin(i) * 2), y + i * 3, PA[3]); }
  // los dos marcos dorados, colgados de su clavo
  for (const [fx, fy] of F7) { R.linea(fx + 14, fy, fx + 28, fy - 12, hex('#8a7a5a')); R.linea(fx + 42, fy, fx + 28, fy - 12, hex('#8a7a5a')); R.disco(fx + 28, fy - 12, 1, K);
    R.rect(fx + 3, fy + 3, fx + 59, fy + 75, PA[3]); R.rect(fx, fy, fx + 56, fy + 72, K); R.rect(fx + 1, fy + 1, fx + 55, fy + 71, ORO); R.rect(fx + 1, fy + 1, fx + 55, fy + 2, OROL); R.rect(fx + 1, fy + 1, fx + 2, fy + 71, OROL); R.rect(fx + 1, fy + 70, fx + 55, fy + 71, OROS); R.rect(fx + 54, fy + 1, fx + 55, fy + 71, OROS);
    for (let i = 6; i < 52; i += 5) { R.pset(fx + i, fy + 3, OROS); R.pset(fx + i, fy + 69, OROL); } for (let i = 6; i < 68; i += 5) { R.pset(fx + 3, fy + i, OROS); R.pset(fx + 53, fy + i, OROL); }
    for (const [cx, cy] of [[fx + 3, fy + 3], [fx + 53, fy + 3], [fx + 3, fy + 69], [fx + 53, fy + 69]]) { R.disco(cx, cy, 2, OROS); R.pset(cx, cy, OROL); }
    R.rect(fx + 5, fy + 5, fx + 51, fy + 67, K); R.rect(fx + 6, fy + 6, fx + 50, fy + 66, hex('#f6eed8'));
    R.rect(fx + 20, fy + 77, fx + 36, fy + 81, K); R.rect(fx + 21, fy + 78, fx + 35, fy + 80, ORO); R.rect(fx + 24, fy + 79, fx + 32, fy + 79, OROS); }
  // manchas NUESTRAS clavadas en la pared (bocetos de color, sin letras)
  for (const [x, y, w, h2, c1, c2] of [[4, 84, 18, 22, '#3a7ac8', '#f08a2a'], [172, 36, 20, 16, '#7a4ab0', '#f0c040'], [172, 58, 16, 20, '#2e8a24', '#d8303a'], [196, 62, 22, 16, '#f08a2a', '#3a7ac8']]) { R.rect(x + 1, y + 1, x + w + 1, y + h2 + 1, PA[3]); R.rect(x, y, x + w, y + h2, hex('#fbf6e8')); R.disco(x + (w >> 1) - 2, y + (h2 >> 1), 4, hex(c1)); R.poligono([[x + 3, y + h2 - 2], [x + (w >> 1), y + (h2 >> 1) + 1], [x + w - 2, y + h2 - 2]], hex(c2)); R.pset(x + (w >> 1), y + 1, ROJO); }
  // el planero: tablero y cajones planos con tiradores
  R.rect(0, 125, 319, 125, K); madera(0, 126, 319, 131, hex('#a8743e'), hex('#946434'), hex('#c08a50'), 31); R.rect(0, 126, 319, 126, hex('#d09a5a')); R.rect(0, 132, 319, 132, K);
  madera(0, 133, 319, 179, hex('#7a4c26'), hex('#6a4020'), hex('#8a5a30'), 33);
  for (const y of [147, 162, 177]) { R.rect(0, y, 319, y, hex('#3e2412')); R.rect(0, y + 1, 319, y + 1, hex('#946434')); } for (const x of [106, 213]) R.rect(x, 133, x + 1, 179, hex('#3e2412'));
  for (const y of [140, 155, 170]) for (const x of [53, 160, 266]) { R.rect(x - 9, y - 1, x + 9, y + 2, K); R.rect(x - 8, y, x + 8, y + 1, ORO); R.rect(x - 8, y, x + 8, y, OROL); R.rect(x - 30, y - 2, x - 18, y + 3, hex('#f6eed8')); R.rect(x - 30, y - 2, x - 18, y - 2, hex('#3e2412')); R.pset(x - 27, y, [ROJO, hex('#3a7ac8'), hex('#2e8a24')][(x + y) % 3]); }
  // el tarro de pinceles y las hojas, a la izquierda
  caja(8, 110, 20, 125, hex('#5a8ab0'), hex('#8ab4d8'), hex('#3a6a90')); for (const [dx, c] of [[-3, '#d8303a'], [0, '#f0c040'], [3, '#2e8a24'], [5, '#3a7ac8']]) { R.linea(14 + dx, 110, 14 + dx * 2, 96, hex('#8a5a30')); R.rect(14 + dx * 2 - 1, 93, 14 + dx * 2, 96, hex(c)); }
  // la funda del disco, apoyada en la pared: un prisma NUESTRO (sólido, azul noche, con el abanico hacia arriba)
  R.rect(174, 86, 216, 126, K); R.rect(175, 87, 215, 125, hex('#16204a')); R.rect(175, 87, 215, 88, hex('#2a3672'));
  for (const [dx, c] of [[-14, '#d8303a'], [-8, '#f08a2a'], [-2, '#f0c040'], [4, '#2e8a24'], [10, '#3a7ac8'], [16, '#7a4ab0']]) { R.linea(195, 108, 195 + dx, 89, hex(c)); R.linea(196, 108, 196 + dx, 89, hex(c)); }
  R.poligono([[185, 121], [195, 105], [206, 121]], K); R.poligono([[187, 120], [195, 107], [204, 120]], hex('#c8d8f0')); R.poligono([[195, 107], [204, 120], [196, 120]], hex('#8aa0c8')); R.pset(193, 112, BL);
  for (const [x, y] of [[179, 92], [211, 97], [181, 116], [210, 114]]) R.pset(x, y, hex('#f6e4b0'));
  // el tocadiscos: la caja de chapa, con su mando y su luz
  R.rect(226, 127, 312, 128, hex('#6a4020')); R.rect(224, 104, 310, 126, K); madera(225, 105, 309, 125, hex('#b07c44'), hex('#9a6a38'), hex('#c89454'), 35); R.rect(225, 105, 309, 106, hex('#d8a868')); R.rect(225, 114, 309, 114, hex('#6a4020'));
  R.disco(238, 120, 3, K); R.disco(238, 120, 2, hex('#c8ccd8')); R.disco(250, 120, 3, K); R.disco(250, 120, 2, hex('#c8ccd8')); for (let x = 270; x < 304; x += 3) R.rect(x, 117, x, 123, hex('#6a4020'));
};
const fotoWelles = (fx, fy, t) => { const x0 = fx + 9, y0 = fy + 9, x1 = fx + 47, y1 = fy + 63;
  R.rect(x0, y0, x1, y1, hex('#5a1c24')); for (let x = x0; x <= x1; x += 6) R.rect(x, y0, x + 1, y1 - 10, hex('#7a2a32')); R.rect(x0, y1 - 9, x1, y1, hex('#8a6a40')); R.rect(x0, y1 - 9, x1, y1 - 9, hex('#5e4426'));
  elip(fx + 28, y1 - 4, 15, 3, hex('#c8a060')); for (let y = y0; y < y1 - 6; y += 2) for (let x = x0; x <= x1; x++) if (Math.abs(x - (fx + 28)) < 5 + (y - y0) * 0.22 && (x + y) % 2 === 0) R.pset(x, y, hex('#a84a4a'));
  R.actor(EL.welles, fx + 20, y1 - 3, t, { dir: 1, quieto: true }); };
const fotoJagger = (fx, fy, t) => { const x0 = fx + 9, y0 = fy + 9, x1 = fx + 47, y1 = fy + 63;
  R.rect(x0, y0, x1, y1, hex('#2a1a4a')); for (const [sx, c] of [[x0 + 4, '#7a4ab0'], [x1 - 4, '#3a7ac8']]) for (let y = y0; y < y1 - 8; y++) { const x = Math.round(sx + (fx + 28 - sx) * (y - y0) / 50); if (y % 2) R.rect(x - 2, y, x + 2, y, hex(c)); }
  R.rect(x0, y1 - 8, x1, y1, hex('#3a3a4e')); R.rect(x0, y1 - 8, x1, y1 - 8, hex('#5a5a72')); for (const [x, y, c] of [[x0 + 5, y0 + 5, '#f0c040'], [x1 - 6, y0 + 8, '#ff8ad8'], [x0 + 9, y0 + 20, '#9ad0e8']]) { R.pset(x, y, hex(c)); R.pset(x + 1, y, hex(c)); }
  R.rect(fx + 39, y1 - 26, fx + 39, y1 - 3, hex('#c8ccd8')); R.rect(fx + 37, y1 - 28, fx + 40, y1 - 26, K); R.rect(fx + 36, y1 - 3, fx + 42, y1 - 3, hex('#c8ccd8'));
  R.actor(EL.jagger, fx + 18, y1 - 3, t, { dir: 1, quieto: true }); };
const welles = b(30.91), jagger = b(31.93), musica = b(32.95);
const p7 = (t) => {
  capa('paredFotos', paredFotos);
  // las fotos se revelan en sus marcos; antes, un «?»
  for (const [i, [fx, fy]] of F7.entries()) { const s = i ? jagger : welles, u = lin(t, s - 0.1, s + 0.35);
    if (u > 0) { (i ? fotoJagger : fotoWelles)(fx, fy, t); if (u < 1) for (let y = fy + 9; y <= fy + 63; y++) for (let x = fx + 9; x <= fx + 47; x++) if (hh(x, y, 91 + i) > u) R.pset(x, y, hex('#d8d2c4')); }
    else { R.rect(fx + 9, fy + 9, fx + 47, fy + 63, hex('#d8d2c4')); for (let y = fy + 11; y < fy + 63; y += 4) R.rect(fx + 11, y, fx + 45, y, hex('#cfc8b8')); R.icono('?', fx + 21, fy + 24 + Math.round(Math.sin(t * 4 + i) * 2), hex('#8a8474'), hex('#f6eed8'), 3); }
    R.rect(fx + 8, fy + 8, fx + 48, fy + 8, K); R.rect(fx + 8, fy + 64, fx + 48, fy + 64, K); R.rect(fx + 8, fy + 8, fx + 8, fy + 64, K); R.rect(fx + 48, fy + 8, fx + 48, fy + 64, K);
    if (t > s - 0.1 && t < s + 0.1) { R.rect(fx + 9, fy + 9, fx + 47, fy + 63, BL); }
    if (t > s && t < s + 0.9 && Math.sin(t * 16) > 0) { destello(fx + 54, fy + 4, 3, BL); destello(fx + 2, fy + 68, 2, OROL); } }
  // el tocadiscos: el plato, el disco con su prisma en la galleta y el brazo
  const suena = t > musica, ug = lin(t, musica - 0.5, musica), cx = 262, cy = 100, giro = suena ? (t - musica) * 3.5 : 0;
  elip(cx, cy + 3, 40, 11, K); elip(cx, cy + 2, 39, 10, hex('#8a8e9c')); elip(cx, cy, 39, 10, K); elip(cx, cy, 38, 9, hex('#c8ccd8')); elip(cx, cy, 35, 8, K); elip(cx, cy, 34, 7, hex('#1c1c24'));
  for (const r of [30, 25, 20]) for (let i = 0; i < 60; i++) { const an = i / 60 * Math.PI * 2 + giro; if (Math.sin(an * 2 + r) > 0.2) R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r * 0.21), hex('#3e3e4c')); }
  elip(cx, cy, 13, 3, hex('#16204a')); { const an = giro, px = Math.round(cx + Math.cos(an) * 6), py = Math.round(cy + Math.sin(an) * 1.5); R.poligono([[px - 3, py + 1], [px, py - 2], [px + 3, py + 1]], hex('#c8d8f0')); R.pset(Math.round(cx - Math.cos(an) * 7), Math.round(cy - Math.sin(an) * 1.6), hex('#f0c040')); R.pset(Math.round(cx - Math.cos(an + 0.5) * 9), Math.round(cy - Math.sin(an + 0.5) * 2), ROJO); } R.pset(cx, cy, hex('#c8ccd8'));
  for (let i = 0; i < 10; i++) R.pset(cx - 30 + i * 2, cy - 4 + (i > 6 ? 1 : 0), hex('#5a5a6c'));
  // el brazo: en su soporte y, al sonar, sobre el disco
  { const px = 304, py = 94, ex = Math.round(lerp(300, 284, ug)), ey = Math.round(lerp(106, 101, ug)); R.rect(px - 3, py - 3, px + 3, py + 8, K); R.rect(px - 2, py - 2, px + 2, py + 7, hex('#c8ccd8')); for (let d2 = 0; d2 <= 1; d2++) R.linea(px, py + d2, ex, ey + d2 - 3, d2 ? K : hex('#e8e8f0')); R.rect(ex - 3, ey - 3, ex + 2, ey, K); R.rect(ex - 2, ey - 2, ex + 1, ey - 1, ROJO); }
  R.pset(280, 120, suena ? hex('#6ac84a') : hex('#3e2412')); R.pset(281, 120, suena ? hex('#b8f0a0') : hex('#3e2412'));
  // la música: del disco suben notas y un abanico de rayos de colores
  if (suena) { const q = lin(t, musica, musica + 0.5);
    for (const [k, c] of ['#d8303a', '#f08a2a', '#f0c040', '#2e8a24', '#3a7ac8', '#7a4ab0'].entries()) { const an = -2.5 + k * 0.2 + Math.sin(t * 2 + k) * 0.04, L = Math.round(46 * q); for (let d2 = 12; d2 < L; d2++) { const x = Math.round(cx + Math.cos(an) * d2 * 1.3), y = Math.round(cy - 6 + Math.sin(an) * d2); if (x > 276 && y < 46) continue; if ((d2 + Math.floor(t * 20)) % 5 < 3) R.pset(x, y, hex(c)); } }
    for (let i = 0; i < 5; i++) { const u = ((t - musica) * 0.45 + i / 5) % 1; if ((t - musica) * 0.45 + i / 5 < 1 && i > (t - musica) * 3) continue; const x = Math.round(246 - i * 9 + Math.sin(u * 8 + i) * 5 - u * 22), y = Math.round(92 - u * 44); if (y > 20) nota(x, y, hex(['#7a4ab0', '#3a7ac8', '#d8303a', '#2e8a24', '#c8643a'][i])); } }
  // Jodorowsky los va señalando y baila; el productor echa cuentas
  const enW = t > welles - 0.2 && t < jagger - 0.25, enJ = t > jagger - 0.2 && t < musica - 0.2, sj = suena ? Math.round(Math.abs(Math.sin((t - musica) * 6)) * 3) : 0;
  R.actor(EL.jodorowsky, 84, 178, t, { dir: enW ? -1 : 1, dedo: enW || enJ, brazos: suena && Math.sin(t * 6) > -0.4, habla: !suena && Math.sin(t * 9) > 0, sonrisa: true, salto: sj });
  const F = R.actor(EL.productorFrances, 196, 178, t, { dir: -1, sorpresa: (t > welles && t < welles + 0.7) || (t > jagger && t < jagger + 0.7), sostiene: true, triste: suena });
  R.rect(F.mano[0] - 9, F.mano[1] - 3, F.mano[0] - 1, F.mano[1] + 7, K); R.rect(F.mano[0] - 8, F.mano[1] - 2, F.mano[0] - 2, F.mano[1] + 6, BL); for (let j = 0; j < Math.min(4, 1 + (t > welles ? 1 : 0) + (t > jagger ? 1 : 0) + (suena ? 1 : 0)); j++) R.rect(F.mano[0] - 7, F.mano[1] + j * 2, F.mano[0] - 4 + (j % 2), F.mano[1] + j * 2, ROJO);
};

const efectos = [[a(1.9), 'maquina'], [pick + 0.1, 'papel'], [pick + 0.85, 'firma'], [s70, 'brillo'], [P2 + 0.2, 'papel'], [y73 - 0.08, 'papel'], [nada, 'interruptor'], [nada + 0.8, 'puerta'],
  [P3 + 0.3, 'toc'], [fr, 'papel'], [bought, 'firma'], [bought + 0.6, 'sello'], [chile + 0.1, 'puerta'], [chile + 0.8, 'brillo'], [named, 'whoosh'], [named + 1.4, 'pop'], [plan + 0.2, 'papel'], [plan + 0.8, 'papel'], [b(21.1), 'brillo'],
  [dali - 0.1, 'toc'], [emp - 0.15, 'pop'], [acc + 0.55, 'pop'], [asked - 0.05, 'cerrojo'], [cien - 0.2, 'tic'], [cien + 0.2, 'tic'], [cien + 0.6, 'campana'], [hora, 'tic'], [b(29.62), 'timbre'],
  [welles - 0.05, 'flash'], [jagger - 0.05, 'flash'], [musica - 0.4, 'golpecito'], [musica, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, cartela: '1974', año: (t) => t < P2 ? 1971 : t < P3 ? 1973 : 1974 });
''')
