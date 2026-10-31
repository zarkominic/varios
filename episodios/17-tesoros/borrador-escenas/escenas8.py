E = {}

# piezas que comparten las tres escenas (cada escena es su propia página: se pegan al principio de cada cuerpo)
COMUN = r'''
const K = T.C.k, BL = hex('#ffffff');
const hh = (x, y, s) => { let n = (x * 374761393 + y * 668265263 + s * 982451653) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const mez = (p, q, u) => { let r = 0; for (const s of [0, 8, 16]) { const ca = (p >>> s) & 255, cb = (q >>> s) & 255; r += Math.round(ca + (cb - ca) * u) * (1 << s); } return (0xff000000 + r) >>> 0; };
const cl = (v) => Math.max(0, Math.min(1, v)), suave = (u) => { u = cl(u); return u * u * (3 - 2 * u); };
const caja = (x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= y1; y++) for (let x = Math.round(x0); x <= x1; x++) R.pset(x, y, c); };   // rect que respeta R.recorte
const oscurece = (x0, y0, x1, y1, a) => { for (let y = Math.max(0, Math.round(y0)); y <= Math.min(179, y1); y++) for (let x = Math.max(0, Math.round(x0)); x <= Math.min(319, x1); x++) R.pset(x, y, mez(R.pget(x, y), K, a)); };
const brillito = (x, y, t, k = 0, c = hex('#fff2a0')) => { const f = (t * 1.6 + k * 0.37) % 1; if (f > 0.5) return; const r = f < 0.15 || f > 0.4 ? 1 : 2; R.pset(x, y, BL); for (let i = 1; i <= r; i++) { R.pset(x + i, y, c); R.pset(x - i, y, c); R.pset(x, y + i, c); R.pset(x, y - i, c); } };
const ORO = [hex('#fff4b0'), hex('#f0c040'), hex('#c89020'), hex('#7a5410')], PLATA = [hex('#ffffff'), hex('#d4d8e0'), hex('#9aa0ac'), hex('#5a5e6a')];
// un lingote (x, y: el centro de la base) y una moneda
const lingote = (x, y, P = ORO, s = 1) => { const w = 6 * s, h = 4 * s, d = 2 * s;
  R.poligono([[x - w - 1, y + 1], [x + w + 1, y + 1], [x + w - d + 1, y - h - 1], [x - w + d - 1, y - h - 1]], K);
  R.poligono([[x - w, y], [x + w, y], [x + w - d, y - h], [x - w + d, y - h]], P[1]);
  caja(x - w + d, y - h, x + w - d, y - h + s - 1, P[0]); R.linea(x + w - d, y - h, x + w, y, P[2]); caja(x - w, y, x + w, y, P[2]); R.pset(x - w + d + 1, y - h + s, BL); };
const moneda = (x, y, r = 3, P = ORO) => { R.disco(x, y, r + 1, K); R.disco(x, y, r, P[1]); R.disco(x - 1, y - 1, Math.max(1, r - 2), P[0]); R.pset(x + r - 1, y + 1, P[2]); R.pset(x, y + r - 1, P[2]); };
// una vasija de barro (x, y: el centro de la base)
const vasija = (x, y, s = 1, tono = 0) => { const B = tono ? [hex('#e8a070'), hex('#c06a3a'), hex('#8a4424')] : [hex('#e8b880'), hex('#c88a4a'), hex('#8a5a2a')];
  const h = 12 * s, w = 5 * s; R.disco(x, y - h * 0.45, w + 1, K); R.disco(x, y - h * 0.45, w, B[1]); R.poligono([[x - 2 * s - 1, y - h - 1], [x + 2 * s + 1, y - h - 1], [x + 2 * s + 1, y - h * 0.6], [x - 2 * s - 1, y - h * 0.6]], K);
  caja(x - 2 * s, y - h, x + 2 * s, y - h * 0.6, B[1]); caja(x - 3 * s, y - h - 1, x + 3 * s, y - h, B[0]); R.pset(x - 3 * s - 1, y - h, K); R.pset(x + 3 * s + 1, y - h, K);
  R.disco(x - Math.round(w * 0.4), y - Math.round(h * 0.55), Math.max(1, s), B[0]); for (let i = -w + 1; i < w; i++) R.pset(x + i, y - Math.round(h * 0.35), B[2]); caja(x - 1, y - 1, x + 1, y, B[2]); };
'''

E['te-lista'] = ('La lista', '''// TE-LISTA (frases 47–49), 1956. Cuatro planos:
// 1. (desierto tiras, general) las 23 tiras de cobre sobre el tapete; una mano trae la última y la deja en su sitio; en
//    «list» (golpe) un barrido dorado recorre las tiras y brillan los lingotes y monedas del margen; en «64» sale la
//    tarjeta dorada que cuenta de 1 a 64 y vuela a la libreta;
// 2. (fondo local, inserto, otra luz: corte en «Almost») una tira grande sobre la mesa del traductor bajo la lámpara; el
//    lápiz marca renglones y al lado salen lingotes de oro en «gold» y de plata en «silver» (y una vasija); en «written»
//    la mano copia en el cuaderno los trazos raros y en «Hebrew» sale un «?»;
// 3. (desierto tiras, lupa: corte en «And on some lines») la mano sujeta la lupa y otro dedo recorre el renglón; en «Greek»
//    salen las letras griegas doradas; en «no one» saltan los «?»;
// 4. (fondo local: corte en «depending») el almacén de piedra con la gran balanza; el arqueólogo pone un lingote en el
//    platillo y duda en «measurements»; en «metal» la montaña de lingotes, monedas y vasijas crece hasta llenar el plano; en
//    «tons» la balanza se parte y él da un salto.''', COMUN + r'''
const L = (f) => en('lista', f), G = (f) => en('griego', f), N = (f) => en('toneladas', f);
const P2 = L(0.729), P3 = G(0.352), P4 = N(0);
const LISTA = L(0.406), N64 = L(0.445), ORO_T = L(0.832), PLATA_T = L(0.906), ESCRIBE = G(0.026), HEBREO = G(0.233);
const LINEAS = G(0.421), GRIEGAS = G(0.588), NADIE = G(0.731), MEDIDAS = N(0.298), METAL = N(0.633), TONS = N(0.848);
const COB = [hex('#e8a868'), hex('#c87a3a'), hex('#8a4a24'), hex('#6ab8a0'), hex('#4a9a84'), hex('#2e6a5a')];
// una tira de cobre como las del tapete: cardenillo con manchas de cobre, renglones grabados y el borde roto
const tira = (x, y, w, a, k) => {
  oscurece(x + 2, y + 2, x + w + 2, y + a + 2, 0.45); caja(x - 1, y - 1, x + w, y + a, K);
  for (let j = 0; j < a; j++) for (let i = 0; i < w; i++) { const v = hh((x + i) >> 1, (y + j) >> 1, 40 + k), m = hh((i + k * 7) >> 2, j >> 2, 90 + k);
    R.pset(x + i, y + j, m < 0.3 ? (v < 0.5 ? COB[1] : COB[0]) : v < 0.2 ? COB[5] : v > 0.85 ? COB[3] : COB[4]); }
  for (let j = 4; j < a - 3; j += 4) for (let i = 2; i < w - 7; i++) if (hh(i >> 1, j, 70 + k) < 0.62) R.pset(x + i, y + j, COB[5]);
  lingote(x + w - 6, y + a - 4, ORO, 1);
};
const tarjeta64 = (x, y, n, t) => { caja(x - 33, y - 19, x + 33, y + 13, K); caja(x - 32, y - 18, x + 32, y + 12, hex('#2a2018')); for (let i = x - 31; i <= x + 31; i++) { R.pset(i, y - 17, ORO[1]); R.pset(i, y + 11, ORO[2]); }
  for (let j = y - 17; j <= y + 11; j++) { R.pset(x - 31, j, ORO[1]); R.pset(x + 31, j, ORO[2]); }
  R.numero(String(n), x + 4, y + 6, { tam: 16, centro: true }); lingote(x - 22, y + 6, ORO, 1); moneda(x - 22, y - 7, 3, PLATA); brillito(x + 26, y - 12, t, 3); };

// 1 · las tiras en orden; la mano trae la última; golpe en «list»
const p1 = (t) => {
  const g = T.desierto(R, t, { encuadre: 'tiras' }), tiras = g.tiras, [sx, sy, sw, sa] = tiras[22];
  const u = suave((t - 0.3) / 1.4);
  // mientras no llega, su sitio es tapete (copiado de la franja de arriba, que está libre)
  if (u < 1) for (let j = -2; j <= sa + 4; j++) for (let i = -2; i <= sw + 4; i++) R.pset(sx + i, sy + j, R.pget(sx + i, 2 + ((j + 2) % 24)));
  const tx = Math.round(lerp(236, sx, u)), ty = Math.round(lerp(176, sy, u));
  tira(tx, ty, sw, sa, 9);
  const sale = suave((t - 1.9) / 0.9);
  if (sale < 1) { const wx = Math.round(lerp(tx + sw + 13, 300, sale)), wy = Math.round(lerp(ty + sa - 5, 214, sale)); T.brazo(R, wx + 44, wy + 64, wx, wy, '#6a7a94', -1, { codo: [wx + 30, wy + 40] }); }
  // golpe: un barrido dorado recorre las tiras y los lingotes y monedas del margen brillan
  const b = (t - LISTA) / 0.9;
  if (b > 0 && b < 1.2) { const bx = lerp(-20, 340, b); tiras.forEach(([x, y, w, a]) => { const d = Math.abs(x + w / 2 - bx); if (d < 18) { const c = d < 8 ? ORO[0] : ORO[1]; R.linea(x - 2, y - 2, x + w + 1, y - 2, c); R.linea(x - 2, y + a + 1, x + w + 1, y + a + 1, c); R.linea(x - 2, y - 2, x - 2, y + a + 1, c); R.linea(x + w + 1, y - 2, x + w + 1, y + a + 1, c); } }); }
  if (t > LISTA) tiras.forEach(([x, y, w, a], k) => { if (k % 3 < 2 && (t - LISTA) * 360 > x) brillito(x + w - 5, y + a - 7, t, k); });
  // la tarjeta del 64: cuenta de 1 a 64 y vuela a la libreta
  if (t > N64 && t < 5.45) { const c = suave((t - N64) / 0.8), n = Math.max(1, Math.round(1 + 63 * c)), v = suave((t - 4.85) / 0.55), sube = t < N64 + 0.15 ? Math.round((1 - (t - N64) / 0.15) * 6) : 0;
    tarjeta64(Math.round(lerp(160, 290, v)), Math.round(lerp(96, 152, v)) + sube, n, t); }
  if (t > 5.4 && t < 5.75) brillito(288, 152, t * 3, 0);
  // una mosca que cruza el tapete
  { const mx = Math.round(lerp(330, -10, ((t * 0.09) % 1))), my = Math.round(20 + Math.sin(t * 3) * 6 + ((t * 0.09) % 1) * 30); R.pset(mx, my, K); R.pset(mx + 1, my, K); if (Math.floor(t * 20) % 2) { R.pset(mx, my - 1, hex('#c8d8e8')); R.pset(mx + 1, my - 1, hex('#c8d8e8')); } }
};

// 2 · inserto: la tira en la mesa del traductor; oro, plata y una vasija en el margen; la mano copia los trazos raros
const MB = R.nuevo(); let mbHecho = false;
const FILAS = 9, FY = (r) => 40 + r * 9;
const pintaMesa = () => {
  const prev = R.usar(MB);
  const MA = [hex('#3a2014'), hex('#5a3420'), hex('#74462a'), hex('#8e5a36')];
  // la mesa de nogal: tablas con vetas y nudos, más clara bajo la lámpara
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(y / 34), junta = y % 34 === 33, vet = Math.sin((x + tabla * 41) * 0.05 + Math.sin(y * 0.4 + tabla) * 1.6 + y * 0.9);
    const luz = 1 - Math.min(1, Math.hypot((x - 128) / 210, (y - 80) / 150)); let i = vet > 0.82 ? 0 : vet > 0.3 ? 1 : 2; if (luz > 0.55 && R.b4(x, y) < luz - 0.4) i++; if (hh(x >> 2, y, 33) < 0.04) i = Math.max(0, i - 1);
    R.pset(x, y, junta ? MA[0] : MA[Math.min(3, i)]); }
  for (const [nx, ny] of [[40, 160], [292, 20], [250, 168]]) { R.disco(nx, ny, 4, MA[0]); R.disco(nx, ny, 2, MA[1]); }
  // la tira grande: cobre verde con el borde roto, la línea del corte de la sierra y nueve renglones de trazos grabados
  const X0 = 20, X1 = 194, Y0 = 28, Y1 = 126;
  oscurece(X0 + 4, Y0 + 5, X1 + 5, Y1 + 6, 0.5);
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const roto = (x - X0 < 3 && hh(0, y >> 1, 5) < 0.5) || (X1 - x < 3 && hh(1, y >> 1, 6) < 0.5); if (roto) continue;
    const v = hh(x >> 1, y >> 1, 41), m = hh(x >> 3, y >> 2, 91), c = m < 0.28 ? (v < 0.5 ? COB[1] : COB[0]) : v < 0.18 ? COB[5] : v > 0.86 ? COB[3] : COB[4];
    R.pset(x, y, (x === X0 || x === X1 || y === Y0 || y === Y1) ? K : c); }
  for (let x = X0; x <= X1; x++) { R.pset(x, Y0 + 1, COB[0]); R.pset(x, Y1 - 1, COB[5]); }
  for (let r = 0; r < FILAS; r++) { const y = FY(r); let x = 28; while (x < 156) { const g = Math.floor(hh(x, r, 7) * 6), w = 3 + (g % 3);
      if (g === 0) { R.linea(x, y, x + w, y, COB[2]); R.linea(x + w, y, x + w, y + 4, COB[2]); } else if (g === 1) { R.linea(x, y, x, y + 4, COB[2]); R.linea(x, y + 4, x + w, y + 4, COB[2]); }
      else if (g === 2) { R.linea(x, y, x + w, y, COB[2]); R.linea(x + 1, y, x + 1, y + 4, COB[2]); R.linea(x + w, y, x + w, y + 4, COB[2]); } else if (g === 3) { R.linea(x, y + 1, x + w, y + 1, COB[2]); R.pset(x + 1, y + 3, COB[2]); }
      else { R.linea(x + 1, y, x + 1, y + 4, COB[2]); R.pset(x, y, COB[2]); R.pset(x + 2, y + 4, COB[2]); }
      for (let i = 0; i <= w; i++) R.pset(x + i, y + 5, COB[3]); x += w + 3; } R.linea(160, y + 2, 162, y + 2, COB[2]); }
  // el cuaderno de espiral con renglones azules y margen rojo, su sombra y las anillas
  oscurece(212, 116, 319, 179, 0.45); caja(208, 112, 319, 179, hex('#f2eedf')); for (let y = 128; y < 180; y += 10) R.linea(210, y, 319, y, hex('#a8c0e0')); R.linea(222, 114, 222, 179, hex('#e07070'));
  for (let x = 208; x <= 319; x++) R.pset(x, 112, K); for (let y = 112; y <= 179; y++) R.pset(208, y, K);
  for (let y = 118; y < 180; y += 8) { R.disco(208, y, 2, hex('#3a3a46')); R.pset(207, y - 1, hex('#a8a8b8')); }
  // los libros apilados (lomos de colores sin letras) y el portaminas
  for (let k = 0; k < 4; k++) { const y = 34 + k * 9, x0 = 216 + (k % 2) * 4, x1 = 268 - (k % 3) * 3, c = [hex('#7a2a2a'), hex('#2a4a7a'), hex('#3a6a3a'), hex('#8a6a2a')][k];
    caja(x0 - 1, y - 1, x1 + 1, y + 8, K); caja(x0, y, x1, y + 7, c); caja(x0, y, x1, y, mez(c, BL, 0.4)); caja(x0 + 4, y + 3, x0 + 8, y + 4, hex('#e8c860')); caja(x1 - 3, y + 1, x1 - 1, y + 6, hex('#f4ecd8')); }
  R.linea(220, 84, 262, 76, K); R.linea(220, 85, 262, 77, hex('#3a3a3a'));
  // el tintero, la plumilla, la regla, la taza de té, la goma y las virutas, los clips y la foto de la cueva
  R.disco(44, 152, 9, K); R.disco(44, 152, 8, hex('#1e2a3a')); R.disco(42, 149, 3, hex('#4a6a8a')); R.disco(44, 152, 4, K); R.pset(41, 148, BL);
  R.linea(58, 160, 84, 146, K); R.linea(58, 161, 84, 147, hex('#2a2a2a')); R.linea(80, 148, 86, 145, hex('#c8a040'));
  caja(70, 168, 176, 175, K); caja(71, 169, 175, 174, hex('#e8d090')); for (let x = 72; x < 175; x += 4) R.linea(x, 169, x, x % 20 === 0 ? 172 : 170, hex('#5a4020'));
  R.disco(240, 100, 10, K); R.disco(240, 100, 9, hex('#f4f0e8')); R.disco(240, 100, 6, hex('#8a4a1a')); R.disco(238, 98, 2, hex('#b8743a')); caja(249, 97, 253, 101, K); caja(250, 98, 252, 100, hex('#f4f0e8'));
  caja(186, 134, 200, 142, K); caja(187, 135, 199, 141, hex('#e89aa8')); caja(187, 135, 199, 136, hex('#f8c0c8'));
  for (let k = 0; k < 7; k++) R.pset(160 + Math.round(hh(k, 1, 3) * 30), 146 + Math.round(hh(k, 2, 3) * 10), hex('#e8b880'));
  // la foto de la cueva sujeta con un clip, junto a los libros
  oscurece(278, 62, 312, 98, 0.35); caja(274, 58, 308, 94, hex('#f0ece0')); caja(277, 61, 305, 86, hex('#6a625a')); for (let y = 61; y <= 86; y++) for (let x = 277; x <= 305; x++) if (hh(x, y, 61) < 0.25 + (y - 61) / 60) R.pset(x, y, hex('#9a9088')); R.disco(290, 76, 6, hex('#1a1614')); R.disco(290, 80, 6, hex('#1a1614'));
  R.linea(296, 54, 296, 66, hex('#c8ccd8')); R.linea(299, 54, 299, 64, hex('#c8ccd8')); R.linea(296, 54, 299, 54, hex('#c8ccd8'));
  // la luz de la lámpara: un viñeteado cálido
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 128) / 230, (y - 80) / 170); if (d > 0.62 && R.b4(x, y) < (d - 0.62) * 2.2) R.pset(x, y, mez(R.pget(x, y), K, 0.4)); }
  R.usar(prev); mbHecho = true;
};
// los iconos del margen: el oro, la plata y una vasija; y cuándo marca cada renglón el lápiz
const MARGEN = [[0, 'o', ORO_T], [2, 'o', ORO_T + 0.12], [3, 'o', ORO_T + 0.24], [6, 'o', ORO_T + 0.36], [1, 'p', PLATA_T], [4, 'p', PLATA_T + 0.12], [5, 'p', PLATA_T + 0.24], [7, 'o', PLATA_T + 0.4], [8, 'v', PLATA_T + 0.62]];
const glifo = (x, y, k, c) => { const g = Math.floor(hh(k, 3, 8) * 5); if (g === 0) { R.linea(x, y, x + 3, y, c); R.linea(x + 3, y, x + 3, y + 4, c); } else if (g === 1) { R.linea(x, y, x, y + 4, c); R.linea(x, y + 4, x + 3, y + 4, c); } else if (g === 2) { R.linea(x, y, x + 3, y, c); R.linea(x, y, x, y + 4, c); R.linea(x + 3, y, x + 3, y + 4, c); } else if (g === 3) { R.linea(x, y + 1, x + 3, y + 1, c); R.pset(x + 1, y + 4, c); } else { R.linea(x + 1, y, x + 1, y + 4, c); R.pset(x, y, c); } };
const p2 = (t) => {
  if (!mbHecho) pintaMesa(); R.copiar(MB);
  // las motas de polvo en la luz y el vapor del té
  for (let k = 0; k < 10; k++) { const mx = Math.round(60 + hh(k, 1, 5) * 150 + Math.sin(t * 0.4 + k) * 8), my = Math.round(20 + ((hh(k, 2, 5) * 140 + t * 4) % 140)); R.pset(mx, my, hex('#f8e8b0')); }
  for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1, vx = Math.round(240 + Math.sin(u * 7 + k) * 3), vy = Math.round(94 - u * 30); if (u < 0.8) { R.pset(vx, vy, hex('#f0ece0')); if (u < 0.5) R.pset(vx + 1, vy, hex('#d8d4c8')); } }
  // el margen: cada icono sale cuando el lápiz marca su renglón
  for (const [r, tipo, tt] of MARGEN) { if (t < tt) continue; const y = FY(r) + 4, s = t < tt + 0.12 ? 1 : 0;
    if (tipo === 'o') lingote(176, y - s, ORO, 1); else if (tipo === 'p') { lingote(174, y - s, PLATA, 1); moneda(186, y - 2 - s, 2, PLATA); } else vasija(177, y + 3 - s, 1, 1);
    if (t < tt + 0.5) brillito(184, y - 6, t * 2, r); }
  // la mano con el lápiz entra por abajo a la derecha y copia en el cuaderno los trazos (sin letras: renglones de signos)
  const total = 4 * 13, hechos = t > ESCRIBE ? Math.min(total, Math.floor((t - ESCRIBE) / (P3 - 0.3 - ESCRIBE) * total)) : 0;
  for (let k = 0; k < hechos; k++) glifo(228 + (k % 13) * 6, 120 + Math.floor(k / 13) * 10, k, hex('#4a4a5a'));
  let px, py;
  if (t < ESCRIBE) { const u = suave((t - ESCRIBE + 1.0) / 0.9); px = lerp(330, 230, u); py = lerp(196, 124, u); }
  else { const k = Math.min(total - 1, hechos); px = 228 + (k % 13) * 6 + 2 + Math.sin(t * 30) * 1.5; py = 124 + Math.floor(k / 13) * 10 - (Math.floor(t * 12) % 2); }
  px = Math.round(px); py = Math.round(py);
  const wx = px + 14, wy = py + 9;
  T.brazo(R, wx + 40, wy + 64, wx, wy, '#6a7a94', -1, { codo: [wx + 26, wy + 36] });
  R.linea(px, py, wx - 6, wy - 4, K); R.linea(px + 1, py, wx - 5, wy - 4, hex('#f0c040')); R.linea(px + 1, py + 1, wx - 5, wy - 3, hex('#c89020')); R.pset(px, py, hex('#3a3a3a'));
  if (t > HEBREO && t < P3) { const u = cl((t - HEBREO) / 0.2); R.bocadillo(214, 104 - Math.round(u * 4), { icono: '?' }); }
};

// 3 · la lupa sobre un renglón; un dedo recorre la línea; las letras griegas doradas y los «?»
const p3 = (t) => {
  const gr = suave((t - GRIEGAS + 0.05) / 0.7);
  const g = T.desierto(R, t, { encuadre: 'tiras', camara: 'lupa', griegas: gr });
  // el dedo que recorre el renglón por debajo de la lupa
  const d = suave((t - LINEAS + 0.3) / 1.2), vuelve = suave((t - NADIE - 0.3) / 0.8), dx = Math.round(lerp(22, 92, d) - vuelve * 80), dy = 138 + Math.round(Math.sin(t * 2) * 1);
  if (dx > -14) T.brazo(R, dx - 50, dy + 64, dx, dy, '#6a7a94', 1, { codo: [dx - 36, dy + 34] });
  // la otra mano sujeta el mango de la lupa (tiembla un poco)
  const mx = 220 + Math.round(Math.sin(t * 1.3) * 1), my = 164 + Math.round(Math.sin(t * 1.7));
  T.brazo(R, mx + 40, my + 50, mx, my, '#6a7a94', -1, { codo: [mx + 30, my + 30] });
  // los «?» que saltan alrededor cuando nadie sabe explicarlas
  if (t > NADIE) for (let k = 0; k < 3; k++) { const u = cl((t - NADIE - k * 0.25) / 0.3); if (u <= 0) continue; const [x, y] = [[96, 46], [210, 52], [150, 30]][k]; R.icono('?', x, y - Math.round(u * 6 + Math.abs(Math.sin(t * 4 + k)) * 2), ORO[1], K, 2); }
  if (gr > 0 && gr < 1) brillito(g.griega[0], g.griega[1], t * 3, 1);
};

// 4 · el almacén de piedra: la balanza, el arqueólogo y la montaña de metal que lo llena todo
const VB = R.nuevo(), PB = R.nuevo(); let vbHecho = false;
const cima = (x) => 30 + ((x - 128) / 150) ** 2 * 140;   // la silueta final de la montaña
const pintaAlmacen = () => {
  let prev = R.usar(VB);
  const PI = [hex('#e8c890'), hex('#c8a46c'), hex('#a07c4c'), hex('#6a4e30'), hex('#3e2c1c')];
  // muros de sillería arenisca, más oscuros hacia la bóveda
  for (let y = 0; y < 134; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 9), off = (fila & 1) * 9, col = Math.floor((x + off) / 18), junta = y % 9 === 8 || (x + off) % 18 === 0;
    const v = hh(col, fila, 12); let i = v < 0.2 ? 2 : v > 0.8 ? 0 : 1; if (hh(x, y, 13) < 0.08) i++; if (R.b4(x, y) < (60 - y) / 70) i++;
    R.pset(x, y, junta ? PI[3] : PI[Math.min(4, i)]); }
  // dos arcos con hornacinas, vasijas y estantes
  for (const [ax, an] of [[52, 34], [268, 30]]) { for (let y = 34; y < 134; y++) for (let x = ax - an; x <= ax + an; x++) { const dx = (x - ax) / an, top = 34 + an * (1 - Math.sqrt(Math.max(0, 1 - dx * dx))) * 0.9; if (y < top) continue;
      R.pset(x, y, Math.abs(x - ax) > an - 3 || y < top + 3 ? PI[2] : y > 130 ? PI[3] : mez(PI[4], PI[3], hh(x >> 2, y >> 2, 3) * 0.4)); }
    caja(ax - an + 4, 96, ax + an - 4, 98, PI[2]); for (let k = -2; k <= 2; k++) vasija(ax + k * 11, 96, 1, k & 1); for (let k = -1; k <= 1; k++) vasija(ax + k * 15, 132, 1.4 > 1 ? 1 : 1, (k + 1) & 1); }
  // el suelo de losas con grietas, arena y un tiesto roto
  for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 134) / 12), off = (fila * 13) % 30, junta = (y - 134) % 12 === 11 || (x + off) % 30 === 0, v = hh(Math.floor((x + off) / 30), fila, 22);
    R.pset(x, y, junta ? PI[3] : hh(x >> 1, y, 23) < 0.06 ? PI[2] : v < 0.3 ? PI[2] : PI[1]); }
  for (let x = 0; x < 320; x++) R.pset(x, 134, PI[4]);
  for (let k = 0; k < 6; k++) { let x = 20 + Math.round(hh(k, 1, 4) * 280), y = 140 + Math.round(hh(k, 2, 4) * 34); for (let i = 0; i < 8; i++) { const nx = x + (hh(k, i, 5) < 0.5 ? 1 : -1) * 2, ny = y + 1; R.linea(x, y, nx, ny, PI[3]); x = nx; y = ny; } }
  for (let x = 0; x < 320; x++) for (let y = 160; y < 180; y++) if (hh(x >> 2, y >> 1, 25) < (y - 160) / 40 && hh(x, y, 26) < 0.5) R.pset(x, y, hex('#e8d0a0'));
  // el haz de luz que entra por arriba
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const a = 96 + y * 0.35, b = 140 + y * 0.55; if (x > a && x < b && R.b4(x, y) < 0.55) R.pset(x, y, mez(R.pget(x, y), hex('#fff0c0'), 0.28)); }
  // la montaña de metal (en su propio búfer, que se descubre de abajo arriba): de arriba abajo para que lo de delante tape
  R.usar(PB);
  const piezas = []; for (let k = 0; k < 1500; k++) { const x = Math.round(hh(k, 1, 77) * 330 - 5), y = Math.round(cima(x) + 4 + hh(k, 2, 77) * 190); if (y > 186) continue; piezas.push([x, y, hh(k, 3, 77)]); }
  piezas.sort((a, b) => a[1] - b[1]);
  for (const [x, y, q] of piezas) { if (q < 0.42) lingote(x, y, ORO, 1); else if (q < 0.6) lingote(x, y, PLATA, 1); else if (q < 0.9) moneda(x, y, 2 + (q > 0.8 ? 1 : 0), q > 0.74 ? PLATA : ORO); else vasija(x, y + 4, 1, q > 0.95 ? 1 : 0); }
  for (let x = 0; x < 320; x++) { const c = Math.round(cima(x)) + 3; for (let y = 0; y < c; y++) PB[y * 320 + x] = 0; }
  R.usar(prev); vbHecho = true;
};
const balanza = (t, incl, rota) => {
  const BR = [hex('#f0c870'), hex('#c8963a'), hex('#8a6024')], cx = 230, cy = 92;
  caja(218, 162, 242, 172, K); caja(219, 163, 241, 171, BR[1]); caja(219, 163, 241, 164, BR[0]); caja(224, 156, 236, 162, K); caja(225, 157, 235, 161, BR[2]);
  caja(227, cy, 233, 157, K); caja(228, cy + 1, 232, 156, BR[1]); caja(228, cy + 1, 228, 156, BR[0]); R.disco(cx, cy - 4, 4, K); R.disco(cx, cy - 4, 3, BR[0]);
  const plato = (x, y) => { R.poligono([[x - 13, y - 1], [x + 13, y - 1], [x + 9, y + 4], [x - 9, y + 4]], K); R.poligono([[x - 12, y], [x + 12, y], [x + 8, y + 3], [x - 8, y + 3]], BR[1]); R.linea(x - 11, y, x + 11, y, BR[0]); };
  const brazoB = (a, l, lado, caido) => { const ex = cx + lado * Math.cos(a) * l, ey = cy + lado * Math.sin(a) * l; R.linea(cx, cy, Math.round(ex), Math.round(ey), K); R.linea(cx, cy + 1, Math.round(ex), Math.round(ey) + 1, BR[1]); R.linea(cx, cy - 1, Math.round(ex), Math.round(ey) - 1, BR[0]); return [Math.round(ex), Math.round(ey)]; };
  if (!rota) {
    const [lx, ly] = brazoB(incl, 34, -1), [rx, ry] = brazoB(incl, 34, 1);
    const ply = ly + 30, pry = ry + 30;
    for (const [ex, ey, py] of [[lx, ly, ply], [rx, ry, pry]]) { R.linea(ex, ey, ex - 10, py, BR[2]); R.linea(ex, ey, ex + 10, py, BR[2]); }
    plato(lx, ply); plato(rx, pry); return [lx, ply];
  }
  // rota: el brazo izquierdo cae sobre la montaña, el derecho se queda torcido hacia arriba
  const c = cl(rota); brazoB(-0.7 * c - incl * (1 - c), 30, 1); const caeX = Math.round(lerp(cx - 30, cx - 44, c)), caeY = Math.round(lerp(cy + 14, cy + 52, c));
  R.linea(cx - 4, cy + 2, caeX, caeY, K); R.linea(cx - 4, cy + 3, caeX, caeY + 1, BR[1]); plato(caeX - 4, caeY + 10);
  return [caeX, caeY];
};
const p4 = (t) => {
  if (!vbHecho) pintaAlmacen(); R.copiar(VB);
  // antorchas que tiemblan y motas en el haz
  for (const [fx, fy] of [[118, 58], [176, 58]]) { caja(fx - 1, fy, fx + 1, fy + 12, hex('#4a3020')); caja(fx - 3, fy - 1, fx + 3, fy + 1, hex('#2a2018')); const f = Math.sin(t * 13 + fx) > 0 ? 1 : 0;
    R.disco(fx, fy - 4 - f, 3, hex('#e8702a')); R.disco(fx, fy - 5, 2, hex('#f8c040')); R.pset(fx, fy - 8 - f, hex('#f8e8a0')); R.pset(fx + (f ? 1 : -1), fy - 10, hex('#f8a040')); }
  for (let k = 0; k < 12; k++) { const u = (hh(k, 1, 9) + t * 0.05) % 1, mx = Math.round(100 + u * 70 + hh(k, 2, 9) * 40 + Math.sin(t + k) * 3), my = Math.round(u * 170); R.pset(mx, my, hex('#fff4d0')); }
  // la montaña crece en «metal»
  const g = suave((t - METAL + 0.25) / 0.85) * 0.9 + suave((t - TONS + 0.05) / 0.5) * 0.1;
  if (g > 0) { for (let x = 0; x < 320; x++) { const c = Math.round(180 - (180 - cima(x)) * g); for (let y = Math.max(0, c); y < 180; y++) { const v = PB[y * 320 + x]; if (v) R.pset(x, y, v); } }
    for (let k = 0; k < 9; k++) { const u = (t * 1.3 + k / 9) % 1, x = Math.round(30 + hh(k, 4, 6) * 200), y0 = Math.round(180 - (180 - cima(x)) * g); if (g < 0.98 && t < TONS + 0.4) { const y = Math.round(lerp(-10, y0, u)); if (k % 2) lingote(x, y, ORO, 1); else moneda(x, y, 2, k % 3 ? ORO : PLATA); } }
    if (g > 0.2) for (let k = 0; k < 6; k++) { const x = 40 + k * 36, y = Math.round(180 - (180 - cima(x)) * g) + 6; brillito(x, y, t, k); } }
  // la balanza: se inclina con el peso y en «tons» se parte
  const incl = t < METAL ? (t > 17.3 ? 0.08 : 0) : 0.08 + 0.4 * g, rota = t > TONS ? suave((t - TONS) / 0.35) : 0;
  const [plx, ply] = balanza(t, incl, rota);
  if (t > 17.3 && !rota) lingote(plx, ply - 1, ORO, 1);
  if (rota > 0 && t < TONS + 0.9) { const u = (t - TONS) / 0.9; for (let k = 0; k < 7; k++) { const a = k * 0.9, r = 4 + u * 26; R.disco(Math.round(230 + Math.cos(a) * r), Math.round(96 + Math.sin(a) * r * 0.6), Math.max(1, Math.round(5 * (1 - u))), k % 2 ? hex('#e8d8b0') : hex('#c8b890')); }
    if (u < 0.3) { R.disco(230, 92, 6, BL); R.disco(230, 92, 4, ORO[0]); } }
  // el arqueólogo pone el lingote, duda, huye a la derecha cuando crece y salta cuando se parte
  const huye = suave((t - METAL + 0.6) / 0.9), ax = Math.round(lerp(170, 268, huye)), pone = t > P4 + 0.2 && t < 17.3;
  const salto = t > TONS && t < TONS + 0.45 ? Math.round(Math.sin((t - TONS) / 0.45 * Math.PI) * 9) : 0;
  const a = R.actor(EL.arqueologo, ax, 172, t, { dir: huye > 0 && huye < 1 ? 1 : t > METAL ? -1 : 1, anda: huye > 0 && huye < 1, sostiene: pone ? [ax + 24, 148] : false, habla: t > MEDIDAS && t < MEDIDAS + 0.9 && Math.sin(t * 14) > 0, sorpresa: t > METAL, salto });
  if (pone) lingote(a.mano[0], a.mano[1] + 2, ORO, 1);
  if (t > MEDIDAS - 0.1 && t < METAL - 0.4) R.bocadillo(ax + 8, 140 - Math.round(cl((t - MEDIDAS + 0.1) / 0.15) * 3), { icono: '?' });
  if (t > TONS + 0.5) R.bocadillo(ax + 8, 140, { icono: '!' });
};

const efectos = [[1.65, 'golpecito'], [LISTA, 'brillo'], [N64 + 0.8, 'tic'], [5.4, 'pop'], [ORO_T, 'brillo'], [PLATA_T, 'golpecito'], [ESCRIBE + 0.1, 'lapiz'], [HEBREO, 'pop'],
  [GRIEGAS, 'brillo'], [NADIE, 'pop'], [17.3, 'golpecito'], [METAL - 0.1, 'avalancha'], [TONS, 'boom']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1956 });
''')

E['te-indicaciones'] = ('Las indicaciones', '''// TE-INDICACIONES (frases 50–51), hoy. Tres planos:
// 1. (desierto escalones, general) el buscador llega leyendo su copia de las indicaciones; en «under the steps» le sale
//    el bocadillo con unos escalones y una X debajo, y en «east» la flecha hacia el este: él señala al este;
// 2. (desierto escalones, cerca: corte en «and no one») gag 7: a cada lado que mira, sube de la arena otro tramo de
//    escalones con su «?»; en «which steps» se encoge de hombros; en «None» coge el detector y barre al pie de los
//    escalones sin que pite; en «64» sale la tarjeta del 64 con el cofre y en «found» una X roja la tacha;
// 3. (desierto museo, vitrina: corte tras «found») el museo de Amán: la niña llega y pega la nariz al cristal de la
//    vitrina de las tiras (el vaho); en «kept today» entra su madre y en «museum» señala las tiras; la niña sonríe.''', COMUN + r'''
const S = (f) => en('escalones', f), Mu = (f) => en('museo', f);
const P2 = S(0.585), P3 = Mu(0.376);
const BAJO = S(0.266), ESC = S(0.345), ESTE = S(0.477), CUALES = S(0.784), NADA = Mu(0), N64 = Mu(0.064), HALLADO = Mu(0.326);
const TIRAS = Mu(0.597), GUARDA = Mu(0.722), MUSEO = Mu(0.81), JORDAN = Mu(0.931);
const PIEDRA = [hex('#f4dcaa'), hex('#dcbc84'), hex('#b8945e'), hex('#7a5e3a')];
// la hoja de las indicaciones en la mano
const hoja = (x, y) => { caja(x - 3, y - 5, x + 3, y + 2, K); caja(x - 2, y - 4, x + 2, y + 1, hex('#f4ecd8')); R.linea(x - 1, y - 3, x + 1, y - 3, hex('#8a7a5a')); R.linea(x - 1, y - 1, x + 1, y - 1, hex('#8a7a5a')); };
// un tramo de escalones de piedra que sube de la arena (sube 0–1); se recorta al suelo
const tramoEsc = (x, suelo, n, dir, sube, k) => {
  const alto = n * 8, dy = Math.round((1 - suave(sube)) * (alto + 2));
  R.recorte([0, 0, 319, suelo]);
  for (let i = 0; i < n; i++) { const w = (n - i) * 10, y0 = suelo - (i + 1) * 8 + dy, xs = dir > 0 ? x + i * 10 : x - n * 10;
    caja(xs - 1, y0 - 1, xs + w, y0 + 8, K); for (let y = y0; y < y0 + 8; y++) for (let xx = xs; xx < xs + w; xx++) { const v = hh(xx >> 2, y >> 1, k + i); R.pset(xx, y, y <= y0 + 1 ? PIEDRA[0] : y === y0 + 7 ? PIEDRA[2] : v < 0.2 ? PIEDRA[2] : PIEDRA[1]); }
    for (let xx = xs + 4; xx < xs + w - 1; xx += 11) R.linea(xx, y0 + 2, xx, y0 + 6, PIEDRA[3]); }
  R.recorte(null);
  if (sube > 0 && sube < 1.4) for (let j = 0; j < 5; j++) { const u = cl(sube - 0.1), px = x + (dir > 0 ? 1 : -1) * j * 9, r = Math.round(1 + u * 3 * (1 - u) * 3); if (u < 1) R.disco(px, suelo - 1 - Math.round(u * 4), r, hex('#ecd4a4')); }
};

// 1 · el buscador llega leyendo; bocadillo con los escalones, la X y la flecha al este; señala al este
const p1 = (t) => {
  T.desierto(R, t, { encuadre: 'escalones' });
  const u = suave((t - 0.15) / 2.0), x = Math.round(lerp(-14, 142, u)), anda = u > 0 && u < 1, senala = t > ESTE;
  const a = R.actor(EL.buscador, x, 164, t, { dir: 1, anda, sostiene: senala ? false : [x + 14, 150], dedo: senala, sonrisa: senala });
  if (!senala) hoja(a.mano[0], a.mano[1]);
  // el bocadillo con el dibujo de la indicación
  const b = cl((t - BAJO + 0.1) / 0.25);
  if (b > 0) { const bx = 118, by = 72, w = Math.round(64 * b), h = Math.round(40 * b), cx = bx + 32;
    caja(cx - w / 2 - 1, by + 20 - h / 2 - 1, cx + w / 2 + 1, by + 20 + h / 2 + 1, K); caja(cx - w / 2, by + 20 - h / 2, cx + w / 2, by + 20 + h / 2, hex('#fbf6e8'));
    if (b >= 1) { R.poligono([[cx - 6, by + 41], [cx + 2, by + 41], [x + 8, 134]], K); R.poligono([[cx - 4, by + 40], [cx + 1, by + 40], [x + 8, 132]], hex('#fbf6e8'));
      // los escalones (suben hacia la derecha), la X debajo y la flecha al este
      for (let i = 0; i < 3; i++) { caja(bx + 8 + i * 8, by + 28 - i * 7, bx + 32, by + 34 - i * 7, PIEDRA[3]); caja(bx + 9 + i * 8, by + 29 - i * 7, bx + 31, by + 29 - i * 7, PIEDRA[1]); }
      if (t > ESC) { const c = hex('#c8303a'); R.linea(bx + 12, by + 30, bx + 18, by + 36, c); R.linea(bx + 18, by + 30, bx + 12, by + 36, c); R.linea(bx + 13, by + 30, bx + 19, by + 36, c); R.linea(bx + 19, by + 30, bx + 13, by + 36, c); }
      const f = cl((t - ESTE + 0.2) / 0.4); if (f > 0) { const x1 = bx + 38 + Math.round(f * 20), c = hex('#c8303a'); caja(bx + 38, by + 13, x1, by + 15, c); if (f >= 1) R.poligono([[x1, by + 9], [x1 + 6, by + 14], [x1, by + 19]], c); } } }
  // una lagartija cruza la arena por delante
  { const v = cl((t - 0.6) / 3.2), lx = Math.round(lerp(330, 220, v)), ly = 172; if (v > 0 && v < 1) { caja(lx, ly, lx + 9, ly + 1, hex('#8a7a4a')); R.pset(lx - 1, ly, hex('#8a7a4a')); R.pset(lx + 10, ly + 1, hex('#8a7a4a')); const p = Math.floor(t * 10) % 2; R.pset(lx + 2, ly + 2 - p, hex('#6a5a32')); R.pset(lx + 7, ly + 1 + p, hex('#6a5a32')); R.pset(lx, ly - 1, K); } }
};

// 2 · gag 7: escalones por todas partes; el detector no pita; el 64 tachado
const TRAMOS = [[56, 178, 3, 1, P2 + 0.3, 31], [196, 174, 3, 1, P2 + 1.0, 32], [320, 179, 4, -1, P2 + 1.7, 33]];
const p2 = (t) => {
  T.desierto(R, t, { encuadre: 'escalones', camara: 'cerca' });
  for (const [x, s, n, d, tt, k] of TRAMOS) if (t > tt) tramoEsc(x, s, n, d, (t - tt) / 0.5, k);
  // a qué lado mira: a cada tramo que sube
  let dir = 1; if (t > TRAMOS[0][4] - 0.1) dir = -1; if (t > TRAMOS[1][4] - 0.1) dir = 1; if (t > TRAMOS[2][4] - 0.1) dir = 1; if (t > CUALES) dir = -1;
  const encoge = t > CUALES + 0.1 && t < CUALES + 1.3, coge = t > NADA + 0.1, x = 146;
  const a = R.actor(EL.buscador, x, 168, t, { dir: coge ? 1 : dir, brazos: encoge, sorpresa: t > TRAMOS[0][4] && t < CUALES + 1.3, sostiene: coge ? [x + 18, 156] : false, triste: t > HALLADO + 0.2 });
  // el detector: tumbado a sus pies hasta que lo coge; luego barre al pie del tramo sin pitar
  if (!coge) T.detector(R, 168, 167, t, { tumbado: true, dir: 1 });
  else T.detector(R, a.mano[0], a.mano[1], t, { dir: 1, suelo: 168, barre: t > NADA + 0.4 ? (Math.sin((t - NADA) * 4) + 1) / 2 : 0.5, largo: 22 });
  // los «?» sobre cada tramo
  for (const [xx, s, n, d, tt] of TRAMOS) if (t > tt + 0.3 && t < NADA) { const tope = d > 0 ? xx + n * 10 - 10 : xx - n * 10 + 4; R.icono('?', Math.min(300, Math.max(8, tope)), s - n * 8 - 20 - Math.round(Math.abs(Math.sin(t * 3 + xx)) * 3), hex('#f0c040'), K, 2); }
  if (encoge) R.bocadillo(x + 8, 130, { icono: '?' });
  // la tarjeta del 64 (los escondites) y la X roja que la tacha en «found»
  const c = cl((t - N64) / 0.25);
  if (c > 0) { const cx = 112, cy = 46 - Math.round((1 - c) * 8); caja(cx - 36, cy - 16, cx + 36, cy + 16, K); caja(cx - 35, cy - 15, cx + 35, cy + 15, hex('#f4ecd8')); caja(cx - 35, cy + 13, cx + 35, cy + 15, hex('#d8ccb0'));
    T.cofre(R, cx - 20, cy + 10, t, { s: 1 }); R.numero('64', cx + 14, cy + 8, { tam: 16, centro: true });
    const xx = cl((t - HALLADO) / 0.15); if (xx > 0) { const r = hex('#d82a2a'), s = Math.round(30 * xx); for (let w = -2; w <= 2; w++) { R.linea(cx - s, cy - s * 0.5 + w, cx + s, cy + s * 0.5 + w, r); R.linea(cx - s, cy + s * 0.5 + w, cx + s, cy - s * 0.5 + w, r); } } }
};

// 3 · el museo de Amán: la niña con la nariz en el cristal; la madre señala las tiras
const p3 = (t) => {
  const g = T.desierto(R, t, { encuadre: 'museo', camara: 'vitrina' });
  // el taburete de madera del museo, delante de la vitrina
  const TX = 140, TY = 166; caja(TX - 1, TY - 1, TX + 22, TY + 3, K); caja(TX, TY, TX + 21, TY + 2, hex('#b8844a')); caja(TX, TY, TX + 21, TY, hex('#d8a468'));
  for (const lx of [TX + 2, TX + 17]) { caja(lx - 1, TY + 3, lx + 2, 178, K); caja(lx, TY + 3, lx + 1, 177, hex('#8a5a2a')); } caja(TX + 3, TY + 8, TX + 18, TY + 9, hex('#8a5a2a'));
  const u = suave((t - P3 - 0.1) / 1.4), nx = Math.round(lerp(-16, 118, u)), sube = suave((t - TIRAS + 0.7) / 0.35), pega = t > TIRAS - 0.3 && t < JORDAN - 0.2;
  const x = Math.round(lerp(nx, TX + 4, sube)), suelo = Math.round(lerp(178, TY, sube)) - (sube > 0 && sube < 1 ? 4 : 0), puntillas = pega ? Math.round(Math.abs(Math.sin(t * 2))) : 0;
  const giro = t > MUSEO + 0.3;
  R.actor(EL.nina, x, suelo, t, { dir: giro && t > JORDAN ? -1 : 1, anda: u > 0 && u < 1, salto: puntillas, sonrisa: giro, sorpresa: pega && !giro, dedo: t > JORDAN });
  // el vaho de la nariz en el cristal, delante de la cara
  if (pega) { const r = 3 + Math.round(Math.abs(Math.sin(t * 2.2)) * 2), vx = x + 17, vy = suelo - 17 - puntillas; for (let j = -r - 1; j <= r + 1; j++) for (let i = -r; i <= r; i++) if (Math.hypot(i, j / 1.3) < r && R.b4(vx + i, vy + j) < 0.6) R.pset(vx + i, vy + j, mez(R.pget(vx + i, vy + j), BL, 0.55)); }
  // la madre entra por la derecha y señala las tiras
  const v = suave((t - GUARDA + 0.2) / 1.0), mx = Math.round(lerp(334, 214, v));
  if (v > 0) R.actor(EL.turista, mx, 178, t, { dir: -1, anda: v > 0 && v < 1, dedo: t > MUSEO, sonrisa: t > MUSEO, habla: t > MUSEO && t < JORDAN && Math.sin(t * 12) > 0 });
  if (t > MUSEO && t < MUSEO + 1.2) { const k = Math.floor((t - MUSEO) * 5) % 7; brillito(g.tiras[k][0] + 12, g.tiras[k][1] + 20, t * 2, k); }
};

const efectos = [[BAJO, 'papel'], [ESTE, 'whoosh'], [TRAMOS[0][4], 'golpecito'], [TRAMOS[1][4], 'golpecito'], [TRAMOS[2][4], 'golpecito'], [CUALES + 0.1, 'boing'],
  [N64, 'pop'], [HALLADO, 'sello'], [TIRAS - 0.2, 'golpecito'], [MUSEO, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')

E['te-fenn'] = ('El cofre de Fenn', '''// TE-FENN (frases 52–54), 2010, cartela «2010». Cinco planos:
// 1. (hoy rocosas, general) Forrest Fenn sube por el sendero entre pinos con el cofre de bronce en brazos; en «treasure?»
//    se para, mira atrás y pide silencio con el dedo; sigue;
// 2. (mapa de EE. UU. del oeste: corte en «A New Mexico») se clava la chincheta en Santa Fe y sale la tarjeta con Fenn;
//    en «hid a chest» el cofre viaja por la ruta de puntos hasta las Rocosas y sale un «?» grande;
// 3. (fondo local, inserto: corte en «full») el cofre abierto entre las rocas y la pinaza: en «gold» sube el brillo, en
//    «jewels» la mano deja una joya; lo cierra y en «Rocky Mountains» lo empuja al hueco de las rocas; una ardilla mira;
// 4. (hoy mesa, general, de noche: corte en «He published») el buscador lee el libro del poema en su atril; en «poem»
//    pasa la hoja, en «clues» saltan los «?»; en «ten years» la barra corre de 2010 a 2020 y el corcho se llena de
//    chinchetas; por la ventana, cientos de frontales de buscadores en el monte; en «searched» coge el detector y se va;
// 5. (fondo local: corte en «The first clue») la fuente termal humea en la montaña y su arroyo caliente entra en el río
//    frío; el buscador llega con el libro; en «Begin it» se dibuja en el aire la flecha de puntos por el agua que humea y
//    en «halt» se clava donde se acaba el vapor: gota roja en lo caliente, gota azul en lo frío.''', COMUN + r'''
const C1 = (f) => en('cofre', f), Po = (f) => en('poema', f), A = (f) => en('aguas', f);
const P2 = C1(0.382), P3 = C1(0.728), P4 = Po(0), P5 = A(0);
const TESORO = C1(0.166), NM = C1(0.409), FENN = C1(0.565), ESCONDE = C1(0.66), ORO_T = C1(0.77), JOYAS = C1(0.834), ROCOSAS = C1(0.901);
const POEMA = Po(0.102), PISTAS = Po(0.207), DIEZ = Po(0.41), CIENTOS = Po(0.526), BUSCAN = Po(0.817);
const EMPIEZA = A(0.456), DONDE = A(0.59), CALIDAS = A(0.633), PARAN = A(0.798);

// 1 · Fenn sube por el sendero con el cofre
const p1 = (t) => {
  T.hoy(R, t, { encuadre: 'rocosas' });
  const a1 = suave((t - 0.9) / 2.3), a2 = suave((t - 4.4) / 1.5), x = Math.round(lerp(44, 150, a1) + lerp(0, 96, a2));
  const anda = (a1 > 0 && a1 < 1) || (a2 > 0 && a2 < 1), mira = t > TESORO && t < 4.4;
  const a = R.actor(EL.fenn, x, 154, t, { dir: mira ? -1 : 1, anda, sostiene: [x + (mira ? -2 : 16), 140], dedo: false, sonrisa: mira });
  T.cofre(R, a.mano[0] + (mira ? -2 : 2), a.mano[1] + 5, t, { bronce: true, s: 1 });
  if (mira && t > TESORO + 0.3) { const hx = x + 4; caja(hx - 1, 124, hx + 1, 131, K); caja(hx, 125, hx, 130, hex('#f6c290')); R.bocadillo(x + 7, 120, { icono: '!' }); }
};

// 2 · el mapa: Santa Fe, la tarjeta de Fenn, la ruta del cofre a las Rocosas y el «?»
const SF = [-105.94, 35.69], RUTA = [SF, [-106.3, 37.6], [-107.6, 39.6], [-108.9, 41.6], [-110.0, 43.4]];
const p2 = (t) => {
  const P = T.mapa(R, t, { zoom: 1.7, centro: [-108.5, 40.2] });
  // la cordillera de las Rocosas: montecitos grises con nieve a lo largo de la sierra
  const SIERRA = [[-105.8, 35.6], [-105.5, 37.6], [-106.1, 39.6], [-106.6, 41.0], [-108.4, 42.6], [-110.4, 44.0], [-111.8, 45.6], [-113.4, 47.2], [-114.4, 48.6]];
  const sp = SIERRA.map((q) => P(q)); for (let i = 1; i < sp.length; i++) { const [ax, ay] = sp[i - 1], [bx, by] = sp[i], n = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay) / 12));
    for (let k = 0; k < n; k++) for (const lado of [-1, 1]) { if (hh(i, k * 2 + lado, 71) < 0.3) continue; const f = (k + (lado > 0 ? 0.5 : 0) + (hh(i, k, 72) - 0.5) * 0.4) / n, mx = Math.round(lerp(ax, bx, f) + lado * (4 + hh(i, k, 73) * 6)), my = Math.round(lerp(ay, by, f) + lado * 2 + (hh(i, k, 74) - 0.5) * 4);
      if (my < 26 || my > 160) continue;
      R.poligono([[mx - 6, my + 3], [mx, my - 5], [mx + 6, my + 3]], hex('#5a4a3a')); R.poligono([[mx - 5, my + 2], [mx, my - 4], [mx + 5, my + 2]], hex('#a8988a')); R.poligono([[mx, my - 4], [mx + 5, my + 2], [mx + 1, my + 2]], hex('#7a6a5c')); R.poligono([[mx - 2, my - 1], [mx, my - 4], [mx + 2, my - 1]], BL); } }
  const [sx, sy] = P(SF).map(Math.round);
  T.chincheta(R, sx, sy, t, T.C.rojo, { baja: cl((t - NM + 0.25) / 0.25), pulso: t > NM + 0.2 && t < ESCONDE });
  // la tarjeta de Fenn junto a Santa Fe (un recorte con su retrato)
  const c = cl((t - FENN + 0.35) / 0.25);
  if (c > 0) { const cx = sx + 30, cy = sy - 14 - Math.round((1 - c) * 6); caja(cx - 15, cy - 15, cx + 15, cy + 13, K); caja(cx - 14, cy - 14, cx + 14, cy + 12, hex('#f4ecd8')); caja(cx - 12, cy - 12, cx + 12, cy + 10, hex('#a8c8e0'));
    R.recorte([cx - 12, cy - 12, cx + 12, cy + 10]); R.actor(EL.fenn, cx - 8, cy + 22, t, { dir: 1, sonrisa: true, quieto: false }); R.recorte(null);
    R.linea(cx - 15, cy + 2, sx + 2, sy - 4, hex('#8a6a4a')); }
  // la ruta del cofre
  const pts = RUTA.map((q) => P(q).map(Math.round)), r = cl((t - ESCONDE + 0.45) / 0.8);
  if (r > 0) { R.ruta(pts, r, hex('#8a3a1a'), { grueso: true, flecha: false });
    let quedan = r, i = 1; const L = []; let tot = 0; for (let k = 1; k < pts.length; k++) { const d = Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]); L.push(d); tot += d; }
    let d = tot * r, q = pts[0]; for (let k = 1; k < pts.length; k++) { if (d <= L[k - 1]) { const f = d / L[k - 1]; q = [lerp(pts[k - 1][0], pts[k][0], f), lerp(pts[k - 1][1], pts[k][1], f)]; break; } d -= L[k - 1]; q = pts[k]; }
    T.cofre(R, Math.round(q[0]), Math.round(q[1]) + 3, t, { bronce: true, s: 1 }); }
  if (t > ESCONDE + 0.4) { const [ex, ey] = pts[pts.length - 1], b = Math.round(Math.abs(Math.sin(t * 5)) * 2); R.icono('?', ex + 10, Math.max(20, ey - 22) - b, hex('#c8303a'), K, 2); }
};

// 3 · inserto: el cofre abierto entre las rocas; oro y joyas; se cierra y entra en el hueco
const IB = R.nuevo(); let ibHecho = false;
const pintaRocas = () => {
  const prev = R.usar(IB), GR = [hex('#d0d0d8'), hex('#a8a8b4'), hex('#84848e'), hex('#5a5a66'), hex('#34343e')];
  // el cielo entre los pinos (arriba a la izquierda), tramado, con ramas
  for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) { const u = y / 70; R.pset(x, y, u + (R.b4(x, y) - 0.5) * 0.25 < 0.5 ? hex('#6aa8e0') : hex('#9cc8ee')); }
  for (let k = 0; k < 9; k++) { const px = k * 40 + Math.round(hh(k, 1, 2) * 20), h = 50 + Math.round(hh(k, 2, 2) * 30); for (let j = 0; j < h; j++) { const w = Math.round((j / h) * 13); for (let i = -w; i <= w; i++) R.pset(px + i, 70 - h + j, (i + j) % 5 === 0 ? hex('#3a7a4a') : j % 6 < 2 ? hex('#1e4a2e') : hex('#2a5a3a')); } }
  // los bolos de granito: grandes, con moteado, liquen y grietas; el hueco en sombra a la derecha
  const bolo = (cx, cy, rx, ry, k) => { for (let y = cy - ry - 1; y <= cy + ry + 1; y++) for (let x = cx - rx - 1; x <= cx + rx + 1; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d > 1.02) continue;
      if (d > 0.95) { R.pset(x, y, GR[4]); continue; } const luz = -(x - cx) / rx * 0.5 - (y - cy) / ry * 0.6 + (R.b4(x, y) - 0.5) * 0.4; let c = GR[luz > 0.45 ? 0 : luz > 0 ? 1 : luz > -0.45 ? 2 : 3];
      const v = hh(x, y, k); if (v < 0.035) c = GR[3]; else if (v > 0.985) c = BL; const li = hh(x >> 1, y >> 1, k + 1) + Math.sin(x * 0.2 + y * 0.13 + k) * 0.06; if (li < 0.06 && luz > -0.3) c = hh(x >> 1, y, k + 2) < 0.5 ? hex('#98a84a') : hex('#c8b85a'); R.pset(x, y, c); }
    for (let i = 0; i < 10; i++) R.pset(cx - rx / 3 + i, cy - ry / 4 + Math.round(Math.sin(i) * 2), GR[4]); };
  bolo(150, 40, 40, 36, 5); bolo(132, 88, 52, 22, 6); bolo(60, 66, 76, 44, 3); bolo(300, 52, 70, 60, 7); bolo(206, 72, 44, 36, 9);
  // el hueco: una boca oscura bajo los bolos de la derecha
  for (let y = 96; y < 156; y++) for (let x = 196; x < 300; x++) { const d = Math.hypot((x - 248) / 52, (y - 156) / 58); if (d < 1) R.pset(x, y, d > 0.9 ? GR[3] : mez(hex('#14141c'), hex('#2a2a34'), hh(x >> 1, y >> 1, 11) * 0.6)); }
  // el suelo: pinaza, piñas, tierra, musgo y helechos
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < 156 && Math.hypot((x - 248) / 52, (y - 156) / 58) < 1) continue; if (y < 112 && R.pget(x, y)) continue; const v = hh(x, y, 15), m = hh(x >> 3, y >> 2, 16);
    R.pset(x, y, y < 112 ? GR[3] : m < 0.2 ? (v < 0.5 ? hex('#4a7a3a') : hex('#5e9046')) : v < 0.25 ? hex('#5a3a22') : v < 0.5 ? hex('#7a5232') : v < 0.75 ? hex('#a0703e') : hex('#c08a4a')); }
  for (let k = 0; k < 140; k++) { const x = Math.round(hh(k, 1, 17) * 320), y = 128 + Math.round(hh(k, 2, 17) * 52), a = hh(k, 3, 17) * 3; R.linea(x, y, Math.round(x + Math.cos(a) * 4), Math.round(y + Math.sin(a) * 2), hh(k, 4, 17) < 0.5 ? hex('#d8a860') : hex('#8a5a2e')); }
  for (const [px, py] of [[30, 150], [176, 170], [290, 172], [96, 176]]) { R.disco(px, py, 4, K); R.disco(px, py, 3, hex('#7a4a24')); for (let j = -2; j <= 2; j += 2) R.linea(px - 2, py + j, px + 2, py + j, hex('#a8703a')); }
  for (const [fx, fy, d] of [[12, 178, 1], [306, 178, -1]]) for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * 0.35 * d, l = 26 - Math.abs(k - 2) * 4; for (let i = 0; i < l; i++) { const x = Math.round(fx + Math.cos(a) * i + d * i * i * 0.02), y = Math.round(fy + Math.sin(a) * i); R.pset(x, y, hex('#2a6a32')); if (i % 3 === 0) { R.pset(x - 2, y + 1, hex('#4a9a4a')); R.pset(x + 2, y + 1, hex('#4a9a4a')); } } }
  for (let i = 0; i < 320 * 180; i++) if (!IB[i]) IB[i] = hex('#1e3a28');
  R.usar(prev); ibHecho = true;
};
const p3 = (t) => {
  if (!ibHecho) pintaRocas(); R.copiar(IB);
  // manchas de sol que se mueven y una aguja que cae
  for (let k = 0; k < 6; k++) { const x = Math.round(30 + k * 48 + Math.sin(t * 0.7 + k) * 6), y = 140 + (k % 3) * 12; for (let i = -4; i <= 4; i++) if (R.b4(x + i, y) < 0.5) R.pset(x + i, y, mez(R.pget(x + i, y), hex('#ffe8a0'), 0.4)); }
  // el cofre: abierto, brilla en «gold», la joya en «jewels», se cierra y entra en el hueco en «Rocky Mountains»
  const cierra = suave((t - 11.15) / 0.4), mete = suave((t - ROCOSAS + 0.15) / 1.0), cx = Math.round(lerp(118, 238, mete)), base = 156;
  const brillo = cl((t - ORO_T + 0.1) / 0.4) * (1 - cierra);
  const g = T.cofre(R, cx, base, t, { bronce: true, s: 3, abre: 1 - cierra, brillo });
  if (brillo > 0.3) for (let k = 0; k < 4; k++) brillito(cx - 18 + k * 12, base - 40 + (k % 2) * 6, t, k);
  if (mete > 0) oscurece(Math.max(196, cx - 30), base - 50, cx + 30, base + 2, 0.45 * cl((cx - 196) / 40));
  // la joya que la mano derecha echa dentro: un arco desde la mano hasta la boca del cofre
  if (t > JOYAS - 0.45 && t < JOYAS + 0.1) { const u = cl((t - JOYAS + 0.45) / 0.55), jx = Math.round(lerp(cx + 30, cx + 4, u)), jy = Math.round(lerp(base - 14, base - 40, u) - Math.sin(u * Math.PI) * 26); R.disco(jx, jy, 3, K); R.disco(jx, jy, 2, hex('#d82a4a')); R.pset(jx - 1, jy - 1, BL); }
  // las manos: sujetan el cofre por abajo a los lados; la derecha lanza la joya y se va; la izquierda lo empuja al hueco
  const izqX = cx - 30, izqY = base - 6;
  T.brazo(R, izqX - 26, izqY + 46, izqX, izqY, '#c8bc9a', 1, { codo: [izqX - 18, izqY + 24] });
  const dSale = suave((t - JOYAS - 0.1) / 0.6);
  if (dSale < 1) { const lanza = t > JOYAS - 0.55 && t < JOYAS - 0.3 ? -6 : 0, rx = Math.round(lerp(cx + 30, 350, dSale)), ry = Math.round(lerp(base - 6 + lanza, 220, dSale)); T.brazo(R, rx + 26, ry + 46, rx, ry, '#c8bc9a', -1, { codo: [rx + 18, ry + 24] }); }
  // la ardilla que asoma por el bolo y se esconde
  const ar = Math.sin(cl((t - P3 - 0.6) / 2.6) * Math.PI); if (ar > 0.05) { const ax = 150, ay = 8 + Math.round((1 - ar) * 10); R.recorte([0, 0, 319, 12]); R.disco(ax, ay + 4, 4, K); R.disco(ax, ay + 4, 3, hex('#9a5a2a')); R.pset(ax + 1, ay + 3, K); R.pset(ax - 2, ay, hex('#9a5a2a')); R.pset(ax + 2, ay, hex('#9a5a2a')); R.recorte(null); }
};

// 4 · el cuarto del buscador: el libro del poema, los diez años, los frontales por la ventana; se va con el detector
const COGE = BUSCAN - 0.2;
const libro = (t) => { const x0 = 104, y0 = 100, w = 22, h = 28;
  caja(x0 + 18, y0 + h, x0 + 26, y0 + h + 8, hex('#4a2e1a')); caja(x0 + 8, y0 + h + 7, x0 + 36, y0 + h + 9, hex('#3a2414'));
  caja(x0 - 2, y0 - 2, x0 + 2 * w + 2, y0 + h + 2, K); caja(x0 - 1, y0 - 1, x0 + 2 * w + 1, y0 + h + 1, hex('#7a2a2a'));
  for (const px of [x0, x0 + w + 1]) { caja(px, y0, px + w - 1, y0 + h - 1, hex('#f4ecd4')); for (let j = y0 + 4; j < y0 + h - 3; j += 3) { const l = 6 + Math.round(hh(px, j, 3) * (w - 10)); R.linea(px + 3, j, px + 3 + l, j, hex('#6a5a4a')); } }
  R.linea(x0 + w, y0, x0 + w, y0 + h - 1, hex('#c8b890'));
  // el dibujito del poema: un monte, un río y el cofre
  R.poligono([[x0 + w + 4, y0 + 20], [x0 + w + 11, y0 + 11], [x0 + w + 18, y0 + 20]], hex('#8a8a94')); R.linea(x0 + w + 3, y0 + 23, x0 + w + 19, y0 + 22, hex('#4a8ad8')); caja(x0 + w + 15, y0 + 16, x0 + w + 18, y0 + 19, hex('#c8963a'));
  // la hoja que pasa en «poem»
  const p = cl((t - POEMA + 0.35) / 0.5); if (p > 0 && p < 1) { const fx = Math.round(x0 + w + Math.cos(p * Math.PI) * w), arr = Math.round(Math.sin(p * Math.PI) * 6); R.poligono([[x0 + w, y0], [fx, y0 - arr], [fx, y0 + h - 1 - arr], [x0 + w, y0 + h - 1]], hex('#fbf6e6')); R.linea(fx, y0 - arr, fx, y0 + h - 1 - arr, hex('#c8b890')); }
};
const PINES = Array.from({ length: 22 }, (_, k) => [88 + Math.round(hh(k, 1, 44) * 100), 30 + Math.round(hh(k, 2, 44) * 56)]);
const p4 = (t) => {
  const cogido = t > COGE;
  const g = T.hoy(R, t, { encuadre: 'mesa', detector: !cogido });
  // por la ventana: el monte de noche y cientos de frontales de buscadores que suben (recortado al hueco)
  R.recorte([215, 33, 259, 95]);
  for (let x = 215; x <= 259; x++) { const yy = Math.round(86 - Math.sin((x - 215) * 0.09) * 6); for (let y = yy; y <= 95; y++) R.pset(x, y, hex('#141a2c')); R.pset(x, yy, hex('#2a3450')); }
  const n = Math.round(cl((t - CIENTOS + 0.2) / 1.4) * 40);
  for (let k = 0; k < n; k++) { const u = (hh(k, 1, 5) + t * 0.04 * (0.5 + hh(k, 3, 5))) % 1, x = Math.round(216 + u * 42), y = Math.round(94 - Math.sin((x - 215) * 0.09) * 6 + hh(k, 2, 5) * 4 - u * 3); R.pset(x, y, Math.sin(t * 6 + k) > -0.6 ? hex('#fff0a0') : hex('#c8a040')); }
  R.recorte(null);
  // el corcho se llena de chinchetas durante los diez años
  const np = Math.round(cl((t - DIEZ) / 2.6) * PINES.length);
  for (let k = 0; k < np; k++) { const [px, py] = PINES[k]; T.chincheta(R, px, py, t, [T.C.rojo, hex('#2a6ad8'), hex('#e8c040')][k % 3], { baja: cl((t - DIEZ - k * 2.6 / PINES.length) / 0.15) }); if (k > 0 && k % 2 === 0) R.linea(PINES[k - 1][0], PINES[k - 1][1] - 4, px, py - 4, hex('#c8303a')); }
  libro(t);
  // el buscador: lee, se sorprende con las pistas, va a por el detector y se marcha
  const va = suave((t - (COGE - 0.9)) / 0.85), sale = suave((t - COGE - 0.15) / 1.2);
  const x = Math.round(lerp(72, 212, va) + lerp(0, 120, sale)), anda = (va > 0 && va < 1) || (sale > 0 && sale < 1);
  const a = R.actor(EL.buscador, x, 160, t, { dir: 1, anda, habla: t > P4 + 0.1 && t < POEMA - 0.3 && Math.sin(t * 13) > 0, sorpresa: t > PISTAS && t < DIEZ, sonrisa: t > DIEZ, sostiene: cogido ? [x + 18, 148] : false, dedo: t > PISTAS - 0.1 && t < PISTAS + 0.8 });
  if (cogido) T.detector(R, a.mano[0], a.mano[1], t, { dir: 1, suelo: 160, largo: 18, pita: t > COGE + 0.1 && t < COGE + 0.5 ? 1 : 0 });
  // los «?» de las pistas que salen del libro
  if (t > PISTAS - 0.1 && t < DIEZ + 0.6) for (let k = 0; k < 3; k++) { const u = cl((t - PISTAS + 0.1 - k * 0.18) / 0.9); if (u <= 0 || u >= 1) continue; R.icono('?', 112 + k * 14, Math.round(94 - u * 26), hex('#e8c040'), K, 2); }
};

// 5 · la fuente termal: el arroyo caliente que entra en el río frío; la flecha de puntos dibujada en el aire
const FB = R.nuevo(); let fbHecho = false;
const RIO = (x) => 148 + Math.round(Math.sin(x * 0.03) * 3 + (x - 160) * 0.04);
const pintaTermal = () => {
  const prev = R.usar(FB);
  // el cielo tramado de añil a celeste
  const cs = [hex('#3a72c8'), hex('#5a8cd8'), hex('#78a6e4'), hex('#9cc2ee'), hex('#c4dcf4')];
  for (let y = 0; y < 96; y++) { const u = Math.min(3.99, y / 22), i = Math.floor(u), f = u - i; for (let x = 0; x < 320; x++) R.pset(x, y, cs[f > R.b4(x, y) ? Math.min(4, i + 1) : i]); }
  // los picos de granito con nieve, en dos términos
  const pico = (cx, cy, w, alto, k, lejos) => { for (let x = cx - w; x <= cx + w; x++) { const top = cy + Math.abs(x - cx) * alto / w + Math.round((hh(x >> 1, k, 3) - 0.5) * 2 + Math.sin(x * 0.3 + k) * 1.2); for (let y = Math.max(0, top); y < 100; y++) { const nieve = y < cy + alto * 0.35 + hh(x >> 1, y >> 2, k) * 8, luz = x < cx;
        const veta = hh(x >> 1, y >> 2, k + 7) < 0.12; R.pset(x, y, nieve ? (luz ? hex('#ffffff') : hex('#c8d4e8')) : lejos ? (luz ? (veta ? hex('#6a7490') : hex('#8a94b0')) : (veta ? hex('#545c78') : hex('#6a7490'))) : (luz ? (veta ? hex('#7a7682') : hex('#9a96a0')) : (veta ? hex('#58546a') : hex('#6e6a78')))); } } };
  pico(70, 26, 70, 70, 1, true); pico(250, 30, 80, 66, 2, true); pico(170, 40, 60, 56, 3, false); pico(10, 50, 50, 46, 4, false); pico(318, 48, 46, 48, 5, false);
  // laderas de pinos en dos términos
  for (let k = 0; k < 60; k++) { const px = Math.round(hh(k, 1, 6) * 330) - 5, base = 98 + Math.round(hh(k, 2, 6) * 10), h = 12 + Math.round(hh(k, 3, 6) * 10); for (let j = 0; j < h; j++) { const w = Math.round(j / h * 5); for (let i = -w; i <= w; i++) R.pset(px + i, base - h + j, j % 4 === 0 ? hex('#3a7a4a') : i < 0 ? hex('#2a5a3a') : hex('#1e4630')); } R.pset(px, base, hex('#4a3020')); }
  // el prado y el suelo
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { const v = hh(x, y, 8), m = hh(x >> 3, y >> 2, 9); R.pset(x, y, m < 0.15 ? hex('#8a7a5a') : v < 0.3 ? hex('#4a7a3a') : v < 0.7 ? hex('#5e9046') : hex('#78a858')); }
  // las terrazas de minerales: escalones naranjas y ocres con su borde claro
  for (let k = 0; k < 3; k++) { const y0 = 114 + k * 7, x0 = 14 + k * 4, x1 = 122 + k * 10; for (let y = y0; y < y0 + 8; y++) for (let x = x0; x <= x1; x++) { const borde = y === y0 || (x - x0 + y) % 13 === 0; R.pset(x, y, borde ? hex('#f4e0b0') : (hh(x >> 1, y, 10 + k) < 0.5 ? hex('#e8902a') : hex('#c86a20'))); }
    for (let x = x0; x <= x1; x += 2) R.pset(x, y0 + 1, hex('#fff4d8')); }
  // la poza turquesa con su anillo de colores
  for (let y = 100; y < 124; y++) for (let x = 20; x < 112; x++) { const d = Math.hypot((x - 64) / 44, (y - 112) / 10); if (d > 1) continue; R.pset(x, y, d > 0.9 ? hex('#e8a040') : d > 0.75 ? hex('#e8d860') : d > 0.55 ? hex('#5ac8c0') : d > 0.3 ? hex('#3aa8d0') : hex('#2a7ab8')); }
  // el río: caliente (verdoso, junto a la terraza) y frío (azul hondo) con orillas de piedras; hielo y nieve a la derecha
  for (let x = 0; x < 320; x++) { const yc = RIO(x), w = 6 + Math.round(x * 0.02); for (let y = yc - w; y <= yc + w; y++) { const cal = cl((210 - x) / 90), c = y === yc - w || y === yc + w ? hex('#3a3a44') : mez(hex('#2a5aa8'), hex('#4ab8a8'), cal * (0.7 + R.b4(x, y) * 0.3)); R.pset(x, y, c); } }
  // el reguero caliente baja de la poza por las terrazas hasta el río
  for (let y = 116; y < RIO(140); y++) { const x = Math.round(118 + (y - 116) * 0.9 + Math.sin(y * 0.4) * 2); for (let i = -2; i <= 2; i++) R.pset(x + i, y, Math.abs(i) === 2 ? hex('#c86a20') : hex('#4ab8a8')); }
  // flores, matas oscuras y piedras por el prado; la costra blanca de minerales alrededor de la poza
  for (let k = 0; k < 70; k++) { const x = Math.round(hh(k, 1, 18) * 320), y = 104 + Math.round(hh(k, 2, 18) * 70); if (Math.abs(y - RIO(x)) < 14 || (x < 150 && y < 140)) continue; const c = [hex('#f0d040'), hex('#b070d0'), hex('#f4f4f4'), hex('#e85a4a')][k % 4]; R.pset(x, y, c); R.pset(x + 1, y + 1, c); R.pset(x, y + 2, hex('#2a5a2a')); }
  for (let k = 0; k < 30; k++) { const x = Math.round(hh(k, 3, 18) * 320), y = 104 + Math.round(hh(k, 4, 18) * 70); if (Math.abs(y - RIO(x)) < 14 || (x < 150 && y < 140)) continue; R.disco(x, y, 3, hex('#3e6a30')); R.disco(x - 1, y - 1, 2, hex('#4e7e38')); }
  for (let y = 98; y < 126; y++) for (let x = 12; x < 118; x++) { const d = Math.hypot((x - 64) / 44, (y - 112) / 10); if (d >= 1 && d < 1.22 && hh(x >> 1, y, 19) < 0.8 && R.pget(x, y) !== hex('#e8902a') && R.pget(x, y) !== hex('#c86a20') && R.pget(x, y) !== hex('#4ab8a8')) R.pset(x, y, hh(x, y, 20) < 0.5 ? hex('#ece8dc') : hex('#d8d0bc')); }
  for (let k = 0; k < 40; k++) { const x = Math.round(hh(k, 1, 12) * 320), y = RIO(x) + (hh(k, 2, 12) < 0.5 ? -1 : 1) * (8 + Math.round(x * 0.02)); R.disco(x, y, 2, hex('#7a7a84')); R.pset(x - 1, y - 1, hex('#b0b0b8')); }
  for (let x = 236; x < 320; x++) { const yc = RIO(x), w = 6 + Math.round(x * 0.02); for (let y = yc - w - 4; y < yc - w; y++) if (hh(x >> 1, y, 13) < 0.7) R.pset(x, y, hex('#f4f8ff')); for (let y = yc + w + 1; y < yc + w + 5; y++) if (hh(x >> 1, y, 14) < 0.7) R.pset(x, y, hex('#e8f0fc')); if (x % 9 < 3) R.pset(x, yc - w + 1, hex('#e0f0ff')); }
  // la pasarela de madera del primer término, con sus postes y la barandilla
  for (let y = 170; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 170 ? hex('#d8a868') : (x + (y > 174 ? 7 : 0)) % 14 === 0 ? hex('#5a3a20') : hh(x >> 2, y, 21) < 0.3 ? hex('#8a5a32') : hex('#a8723e'));
  for (let x = 6; x < 320; x += 40) { caja(x - 1, 152, x + 2, 170, K); caja(x, 153, x + 1, 169, hex('#8a5a32')); } for (let x = 0; x < 320; x++) { R.pset(x, 153, K); R.pset(x, 154, hex('#b8844a')); R.pset(x, 155, K); }
  // matas del primer término
  for (let k = 0; k < 26; k++) { const x = Math.round(hh(k, 1, 15) * 320), y = 160 + Math.round(hh(k, 2, 15) * 8); for (let i = -3; i <= 3; i++) R.linea(x, y, x + i, y - 4 - Math.abs(i) % 2, i % 2 ? hex('#3a6a2a') : hex('#8ab858')); }
  R.usar(prev); fbHecho = true;
};
const vapor = (x, y, t, k, fuerza) => { for (let i = 0; i < 4; i++) { const u = (t * 0.45 + i / 4 + hh(k, i, 3)) % 1; if (u > fuerza) continue; const vx = Math.round(x + Math.sin(u * 6 + k) * 4 + u * 6), vy = Math.round(y - u * 34), r = Math.round(3 + u * 5); for (let j = -r; j <= r; j++) for (let ii = -r; ii <= r; ii++) if (ii * ii + j * j <= r * r && R.b4(vx + ii, vy + j) < 0.85 - u * 0.6) R.pset(vx + ii, vy + j, u < 0.5 ? hex('#ffffff') : hex('#dce4ec')); } };
const p5 = (t) => {
  if (!fbHecho) pintaTermal(); R.copiar(FB);
  // nubes de tres tonos a tres velocidades y dos pájaros
  for (const [k, y, v] of [[0, 18, 3], [1, 34, 5.5], [2, 52, 8]]) { const x = Math.round(((t * v + k * 130) % 400) - 40); for (let i = 0; i < 4; i++) { R.disco(x + i * 8, y - (i % 2) * 3, 6, hex('#c8d4e4')); R.disco(x + i * 8, y - 2 - (i % 2) * 3, 5, BL); } caja(x - 4, y + 3, x + 28, y + 4, hex('#a8b8d0')); }
  for (let k = 0; k < 2; k++) { const bx = Math.round(((t * 14 + k * 60) % 360) - 20), by = 40 + k * 8, a = Math.sin(t * 9 + k) > 0 ? 1 : 0; R.pset(bx, by, K); R.pset(bx - 1, by - a, K); R.pset(bx + 1, by - a, K); R.pset(bx - 2, by - a * 2, K); R.pset(bx + 2, by - a * 2, K); }
  // el agua que corre (brillos) y el vapor: mucho sobre la poza, menos por el río, nada pasado el punto
  for (let k = 0; k < 24; k++) { const x = Math.round(((hh(k, 1, 4) * 320 + t * 18) % 320)), y = RIO(x) + Math.round((hh(k, 2, 4) - 0.5) * 8); R.pset(x, y, hex('#d8f0ff')); R.pset(x + 1, y, hex('#a8d8f0')); }
  for (let k = 0; k < 6; k++) vapor(30 + k * 15, 108, t, k, 1);
  for (let k = 0; k < 7; k++) { const x = 110 + k * 14; vapor(x, RIO(x) - 6, t, k + 9, 0.85 - k * 0.12); }
  // el buscador llega con el libro y señala la flecha
  const u = suave((t - P5 - 0.1) / 1.3), w2 = suave((t - PARAN - 0.5) / 1.0), x = Math.round(lerp(-14, 150, u) + lerp(0, 40, w2)), anda = (u > 0 && u < 1) || (w2 > 0 && w2 < 1);
  const a = R.actor(EL.buscador, x, 173, t, { dir: 1, anda, dedo: t > DONDE && t < PARAN + 0.5, sostiene: t > DONDE && t < PARAN + 0.5 ? false : [x + 15, 162], sonrisa: t > PARAN });
  if (!(t > DONDE && t < PARAN + 0.5)) { const [hx, hy] = a.mano; caja(hx - 4, hy - 4, hx + 4, hy + 2, K); caja(hx - 3, hy - 3, hx - 1, hy + 1, hex('#f4ecd4')); caja(hx + 1, hy - 3, hx + 3, hy + 1, hex('#f4ecd4')); R.linea(hx, hy - 4, hx, hy + 2, hex('#7a2a2a')); }
  // la flecha de puntos que se dibuja en el aire, de la poza al sitio donde el agua deja de humear
  const f = cl((t - EMPIEZA) / (PARAN - EMPIEZA));
  if (f > 0) { const pts = [[66, 92], [110, 104], [150, 114], [188, 124], [206, 132]]; R.ruta(pts, f, hex('#fff4c0'), { grueso: true, flecha: f >= 1 });
    if (t > PARAN) { const r = 6 + Math.round(Math.abs(Math.sin(t * 5)) * 2); for (let a2 = 0; a2 < 6.28; a2 += 0.25) R.pset(Math.round(210 + Math.cos(a2) * r), Math.round(RIO(210) + Math.sin(a2) * r * 0.5), hex('#fff4c0')); } }
  if (t > CALIDAS) R.icono('gota', 56, 76 - Math.round(Math.abs(Math.sin(t * 4)) * 2), hex('#e84a3a'), K, 2);
  if (t > PARAN) R.icono('gota', 246, 118 - Math.round(Math.abs(Math.sin(t * 4 + 1)) * 2), hex('#3a7ae8'), K, 2);
  // una trucha salta en el agua fría
  const tr = cl((t - PARAN - 0.6) / 0.6); if (tr > 0 && tr < 1) { const fx = Math.round(270 + tr * 14), fy = Math.round(RIO(272) - Math.sin(tr * Math.PI) * 12); R.disco(fx, fy, 2, hex('#8a9aa8')); R.pset(fx - 3, fy, hex('#c86a6a')); R.pset(fx + 3, fy - 1, hex('#6a7a88')); }
};

const año = (t) => (t < DIEZ ? 2010 : Math.round(lerp(2010, 2020, cl((t - DIEZ) / 1.4))));
const efectos = [[TESORO + 0.3, 'whoosh'], [NM, 'golpecito'], [FENN - 0.3, 'papel'], [ESCONDE - 0.4, 'lapiz'], [ESCONDE + 0.4, 'pop'], [ORO_T, 'brillo'], [JOYAS, 'golpecito'], [11.4, 'cerrojo'],
  [POEMA - 0.3, 'papel'], [PISTAS, 'pop'], [DIEZ + 0.2, 'tic'], [COGE + 0.1, 'bip'], [P5 + 0.3, 'vapor'], [EMPIEZA, 'lapiz'], [PARAN, 'pop'], [PARAN + 0.8, 'chof']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, cartela: '2010', año });
''')
