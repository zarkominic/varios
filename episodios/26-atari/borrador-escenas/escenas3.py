E = {}

# Ayudas comunes a las tres escenas (van en el cuerpo de cada una): colores, cielos tramados, nubes de tres tonos, capas
# fijas en búfer, cifras de 3 × 5 y EL JUEGO INVENTADO con su muñequito propio (Bip: una judía naranja con dos antenas
# de bolita amarilla y barriga crema; nada verde ni de cabeza grande), que se pinta en cualquier pantalla.
AYUDAS = r'''
import { ELENCO_AT as AT } from '/atomo/plato/kits/pixel-chibi.js';
const K = hex('#141016'), BL = hex('#f6f2e6');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, u) => { const A = [c1 & 255, (c1 >>> 8) & 255, (c1 >>> 16) & 255], B = [c2 & 255, (c2 >>> 8) & 255, (c2 >>> 16) & 255]; const m = A.map((v, i) => Math.round(v + (B[i] - v) * u)); return (0xff000000 | (m[2] << 16) | (m[1] << 8) | m[0]) >>> 0; };
const parp = (t, v = 7) => Math.sin(t * v) > 0;
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / (a1 - a0)));
// una capa fija: se pinta una vez en un búfer y se copia en cada fotograma
const CAPAS = new Map();
const capa = (k, f) => { let b = CAPAS.get(k); if (!b) { b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); CAPAS.set(k, b); } R.copiar(b); };
// degradado vertical tramado (Bayer 2 × 2) entre varios colores, con pset (respeta R.recorte)
const BAY = [0, 2, 3, 1];
const degr = (x0, y0, x1, y1, cols) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i; for (let x = x0; x <= x1; x++) R.pset(x, y, f * 4 > BAY[(x & 1) + ((y & 1) << 1)] + 0.5 ? cols[i + 1] : cols[i]); } };
// nube de tres tonos (luz, medio, sombra): discos con la sombra abajo y el brillo arriba
const nube = (x, y, w, c) => { const r = w / 5; const B = [[0, 0, 1], [1.3, -0.7, 1.35], [2.6, -0.2, 1.1], [3.6, 0.3, 0.8], [-1, 0.4, 0.75]];
  for (const [dx, dy, s] of B) R.disco(Math.round(x + dx * r), Math.round(y + dy * r + 1), Math.round(r * s), c[2]);
  for (const [dx, dy, s] of B) R.disco(Math.round(x + dx * r), Math.round(y + dy * r), Math.round(r * s * 0.92), c[1]);
  for (const [dx, dy, s] of B) R.disco(Math.round(x + dx * r - 1), Math.round(y + dy * r - r * 0.35), Math.round(r * s * 0.55), c[0]); };
const pajaro = (x, y, t, k = 0, c = hex('#2a2430')) => { const a = Math.sin(t * 10 + k) > 0; x = Math.round(x); y = Math.round(y); R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : -1) + (a ? 0 : 0), c); R.pset(x + 2, y - (a ? 2 : -1), c); };
// cifras propias de 3 × 5 (marcadores del juego y contadores)
const DIG = { 0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['###', '..#', '###', '#..', '###'], 3: ['###', '..#', '.##', '..#', '###'], 4: ['#.#', '#.#', '###', '..#', '..#'],
  5: ['###', '#..', '###', '..#', '###'], 6: ['###', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'], 8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '###'] };
const dig = (s, x, y, e, c, sombra) => { s = String(s); for (let k = 0; k < s.length; k++) { const g = DIG[s[k]]; if (!g) continue; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j][i] === '#') { const X = x + (k * 4 + i) * e, Y = y + j * e; if (sombra != null) R.rect(X + 1, Y + 1, X + e, Y + e, sombra); R.rect(X, Y, X + e - 1, Y + e - 1, c); } } return s.length * 4 * e - e; };

// ── EL JUEGO INVENTADO ────────────────────────────────────────────────────────────────────────────────────────
// tres pantallas distintas (cielo, tierra, fosos y flores), el marcador con las tres piezas del teléfono y la casita
const PANTS = [
  { cielo: ['#141850', '#1e2a78', '#2c44a0', '#4a68c0', '#6a8ad8'], hierba: ['#4ac84a', '#7ae86a', '#2a9a3a'], tierra: ['#8a5a2a', '#7a4a22', '#6a3e1c'], fosos: [0.3, 0.72], flores: [0.1, 0.5, 0.9], arbol: 0.6 },
  { cielo: ['#2a1048', '#4a1a68', '#6a2a80', '#9a4a90', '#c8708a'], hierba: ['#6ad84a', '#9af06a', '#3aa83a'], tierra: ['#7a4a3a', '#6a3a30', '#5a2e26'], fosos: [0.22, 0.52, 0.82], flores: [0.06, 0.37, 0.67, 0.95] },
  { cielo: ['#0a2a3a', '#104a5a', '#1a6a72', '#2a8a84', '#4aaa94'], hierba: ['#8ae85a', '#b8f07a', '#4ab84a'], tierra: ['#6a5a3a', '#5a4a2e', '#4a3e26'], fosos: [0.56], flores: [0.12, 0.3, 0.84], ancho: 1.5, arbol: 0.08 },
].map((L) => ({ ...L, cielo: L.cielo.map(hex), hierba: L.hierba.map(hex), tierra: L.tierra.map(hex) }));
// Bip, el muñequito del juego: 5 × 8 celdas (O naranja, o sombra, Y bolitas, E ojos, C barriga, B pies)
const BIP = ['.Y.Y.', '.O.O.', 'OOOOo', 'OEOEo', 'OOOOo', 'OCCCo', '.OOo.'];
const BIPC = { O: hex('#f08a3a'), o: hex('#b8582a'), Y: hex('#f8e060'), E: hex('#ffffff'), C: hex('#f8dcb0'), B: hex('#5a3418'), k: hex('#05040a') };
const PIEZA = [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [3, 1], [-1, 1], [4, 1]];
// juego([x0, y0, x1, y1], t, st): st.pant (pantalla), st.wipe 0–1 (pasa a la siguiente), st.mi (columna de Bip),
// st.mj (fila de sus pies; por omisión el suelo), st.pose 'anda' | 'quieto' | 'cae' | 'sube' | 'salta', st.dir,
// st.piezas 0–3, st.pieza (pinta la pieza en el fondo del foso st.pieza), st.casa (la casita del marcador se enciende),
// st.puntos, st.s (tamaño de la celda), st.r (radio de las esquinas), st.borde (los bordes del foso verdes: el retoque),
// st.apagada, st.bip false (sin Bip). Devuelve { GW, GH, s, suelo, fosos (columnas), cel }
const juego = ([x0, y0, x1, y1], t, st = {}) => {
  const W = x1 - x0 + 1, H = y1 - y0 + 1, s = st.s ?? Math.max(1, Math.round(W / 50)), GW = Math.ceil(W / s), GH = Math.ceil(H / s);
  const hud = st.hud ?? Math.max(4, Math.round(GH * 0.15)), suelo = st.suelo ?? Math.round(GH * 0.58);
  const cel = (i, j, c) => { if (i < 0 || j < 0 || i >= GW || j >= GH) return; const X = x0 + i * s, Y = y0 + j * s; R.rect(X, Y, Math.min(x1, X + s - 1), Math.min(y1, Y + s - 1), c); };
  if (st.apagada) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(hex('#1a1c22'), hex('#2a2e38'), ((x - x0) + (y - y0)) / (W + H))); for (let k = 0; k < Math.min(W, H) * 0.5; k++) R.pset(x0 + 3 + k, y0 + 2 + Math.round(k * 0.6), hex('#4a4e5a')); return { GW, GH, s, suelo, fosos: [], cel }; }
  const wipe = st.wipe ?? 0, base = st.pant ?? 0, fa0 = Math.max(2, Math.round(GW * 0.06));
  for (let i = 0; i < GW; i++) {
    const gi = i + wipe * GW, n = base + Math.floor(gi / GW), li = gi - Math.floor(gi / GW) * GW, L = PANTS[n % PANTS.length];
    for (let j = hud; j < suelo; j++) cel(i, j, L.cielo[Math.min(4, Math.floor((j - hud) / Math.max(1, (suelo - hud) / 5)))]);
    // estrellas que titilan (fijas en cada pantalla)
    if (hh(li, n, 3) < 0.12) { const j = hud + 1 + Math.floor(hh(li, n, 4) * (suelo - hud) * 0.5); if (Math.sin(t * 3 + li) > -0.2) cel(i, j, hex('#e8e8ff')); }
    let enFoso = false, fc = 0, fa = 0;
    for (const f of L.fosos) { const c = Math.round(f * GW), a = Math.round(fa0 * (L.ancho ?? 1)); if (Math.abs(li - c) <= a) { enFoso = true; fc = c; fa = a; } }
    if (enFoso) {
      const pared = Math.abs(li - fc) === fa, labio = st.borde && Math.abs(li - fc) >= fa - 1;
      for (let j = suelo; j < GH; j++) cel(i, j, j === GH - 1 ? L.tierra[2] : pared ? hex('#3a2410') : j === GH - 2 ? hex('#1a1210') : hex('#05040a'));
      if (labio) { cel(i, suelo, L.hierba[0]); cel(i, suelo + 1, L.hierba[2]); }
    } else {
      cel(i, suelo, (li + Math.floor(t * 2)) % 4 ? L.hierba[0] : L.hierba[1]); cel(i, suelo + 1, L.hierba[2]);
      for (let j = suelo + 2; j < GH; j++) cel(i, j, (li * 3 + j * 5) % 11 === 0 ? mez(L.tierra[0], hex('#e8c080'), 0.35) : L.tierra[Math.floor((j - suelo - 2) / 3) % 3]);
    }
    // flores que se mecen y un arbolito a bloques
    for (const f of L.flores) { const fi = Math.round(f * GW); if (li !== fi) continue; const m = Math.sin(t * 2 + fi) > 0.6 ? 1 : 0, col = (fi % 2) ? hex('#f07aa8') : hex('#f0d040');
      cel(i, suelo - 1, L.hierba[2]); cel(i + m, suelo - 2, col); cel(i - 1 + m, suelo - 3, col); cel(i + 1 + m, suelo - 3, col); cel(i + m, suelo - 4, col); cel(i + m, suelo - 3, hex('#fff6c0')); }
    if (L.arbol != null && li === Math.round(L.arbol * GW) && suelo - hud > 9) { for (let j = suelo - 4; j < suelo; j++) cel(i, j, hex('#6a3e1c')); for (let a = -2; a <= 2; a++) for (let b = -8; b <= -4; b++) if (Math.abs(a) + Math.abs(b + 6) < 4) cel(i + a, suelo + b, (a + b) % 3 ? hex('#2a8a3a') : hex('#4ab84a')); }
  }
  // la pieza del teléfono en el fondo de un foso (de la pantalla base)
  const L0 = PANTS[base % PANTS.length], FOS = L0.fosos.map((f) => Math.round(f * GW));
  if (st.pieza != null && wipe === 0) { const fi = FOS[st.pieza] ?? FOS[0], pc = parp(t, 8) ? hex('#ffffff') : hex('#c8c8e0'); for (const [a, b] of PIEZA) cel(fi - 1 + a, GH - 4 + b, pc); if (parp(t, 5)) cel(fi + 1, GH - 6, hex('#fff6a0')); }
  // el marcador: cifras, las tres piezas y la casita
  if (hud > 0) { for (let j = 0; j < hud; j++) for (let i = 0; i < GW; i++) cel(i, j, hex('#101018'));
    const e = s, cy = y0 + Math.max(0, Math.round((hud * s - 5 * e) / 2));
    dig(st.puntos ?? (1200 + Math.floor(t * 3) * 10), x0 + 2 * s, cy, e, hex('#f0d040'));
    const pz = st.piezas ?? 0;
    for (let k = 0; k < 3; k++) { const i0 = GW - 19 + k * 4, col = k < pz ? hex('#f0f0f0') : st.brillaPiezas && parp(t, 12) ? hex('#8a8aa8') : hex('#3a3a4a'); for (const [a, b] of [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1]]) cel(i0 + a, Math.round(hud / 2) - 1 + b, col); }
    const casa = st.casa ? (parp(t, 9) ? hex('#f8e060') : hex('#f08a3a')) : hex('#3a3a4a'), ci = GW - 6, cj = Math.round(hud / 2) - 1;
    cel(ci + 1, cj - 1, casa); for (let a = 0; a < 3; a++) cel(ci + a, cj, casa); cel(ci, cj + 1, casa); cel(ci + 2, cj + 1, casa); }
  // Bip
  if (st.bip !== false) {
    const mi = Math.round(st.mi ?? 4), mj = Math.round(st.mj ?? suelo - 1), pose = st.pose ?? 'anda', dir = st.dir ?? 1, paso = Math.floor(t * 8) % 2;
    const enPozo = mj > suelo - 1;
    BIP.forEach((f, j) => { for (let i = 0; i < 5; i++) { let ch = f[dir > 0 ? i : 4 - i]; if (ch === '.') continue; if (ch === 'o' && dir < 0) ch = 'o';
      const jj = mj - 7 + j + (pose === 'cae' && j < 2 ? -1 : 0); if (enPozo && jj >= GH - 1) continue; cel(mi - 2 + i, jj, BIPC[ch]); } });
    // pupilas, que miran hacia donde va (o hacia abajo al caer)
    if (pose !== 'cae') { cel(mi - 2 + (dir > 0 ? 2 : 0), mj - 4, BIPC.k); cel(mi - 2 + (dir > 0 ? 4 : 2), mj - 4, BIPC.k); }
    // pies: al andar se alternan; al caer y subir, abiertos
    const pies = pose === 'anda' ? (paso ? [[-1, 0], [2, 0]] : [[0, 0], [1, 0]]) : pose === 'cae' || pose === 'salta' ? [[-2, -1], [2, -1]] : pose === 'sube' ? (paso ? [[-1, 0], [1, -1]] : [[-1, -1], [1, 0]]) : [[-1, 0], [1, 0]];
    for (const [a, b] of pies) if (!(enPozo && mj + b >= GH - 1)) cel(mi + a, mj + b, BIPC.B);
    if (pose === 'sube') { cel(mi - 3, mj - 5 - paso, BIPC.O); cel(mi + 3, mj - 4 - (1 - paso), BIPC.O); }
  }
  // esquinas redondas del tubo, barrido y brillo
  const r = st.r ?? 0;
  if (r > 0) for (const [cx, cy, sx, sy] of [[x0 + r, y0 + r, -1, -1], [x1 - r, y0 + r, 1, -1], [x0 + r, y1 - r, -1, 1], [x1 - r, y1 - r, 1, 1]])
    for (let j = 0; j <= r; j++) for (let i = 0; i <= r; i++) if (Math.hypot(i, j) > r) R.pset(cx + sx * i, cy + sy * j, st.marco ?? hex('#0c0a12'));
  if (st.barrido !== false) for (let y = y0 + 1; y <= y1; y += 2) for (let x = x0; x <= x1; x++) { const p = R.pget(x, y); R.pset(x, y, mez(p, 0xff000000, 0.16)); }
  const by = y0 + Math.round(((t * 0.35) % 1) * H); for (let x = x0; x <= x1; x++) R.pset(x, by, mez(R.pget(x, by), hex('#ffffff'), 0.12));
  return { GW, GH, s, suelo, fosos: FOS, cel };
};
// Bip grande (insertos): e px por celda, (x, y) = el centro de los pies
const bipGrande = (x, y, e, t, o = {}) => {
  const dir = o.dir ?? 1, paso = Math.floor(t * 8) % 2, x0 = Math.round(x - 2.5 * e), y0 = Math.round(y - 8 * e);
  const C = (i, j, c) => R.rect(x0 + i * e, y0 + j * e, x0 + i * e + e - 1, y0 + j * e + e - 1, c);
  // contorno de tinta
  BIP.forEach((f, j) => { for (let i = 0; i < 5; i++) if (f[dir > 0 ? i : 4 - i] !== '.') R.rect(x0 + i * e - 1, y0 + j * e + (o.cae && j < 2 ? -e : 0) - 1, x0 + i * e + e, y0 + j * e + e + (o.cae && j < 2 ? -e : 0), K); });
  BIP.forEach((f, j) => { for (let i = 0; i < 5; i++) { const ch = f[dir > 0 ? i : 4 - i]; if (ch === '.') continue; C(i, j + (o.cae && j < 2 ? -1 : 0), BIPC[ch]); } });
  // brillo en la barriga y la sombra del lado
  R.rect(x0 + e, y0 + 2 * e, x0 + e + Math.max(0, (e >> 1) - 1), y0 + 2 * e + Math.max(0, (e >> 1) - 1), hex('#ffc890'));
  if (o.mareo) { C(1, 3, K); C(3, 3, K); R.pset(x0 + e + (e >> 1), y0 + 3 * e + (e >> 1), BIPC.E); R.pset(x0 + 3 * e + (e >> 1), y0 + 3 * e + (e >> 1), BIPC.E); }
  else if (!o.cae) { const h2 = Math.max(1, e >> 1); for (const ci of [1, 3]) { const X = x0 + ci * e + (dir > 0 ? e - h2 : 0); R.rect(X, y0 + 3 * e + e - h2, X + h2 - 1, y0 + 3 * e + e - 1, BIPC.k); } }
  else { C(1, 3, BIPC.E); C(3, 3, BIPC.E); R.rect(x0 + e + (e >> 2), y0 + 2 * e + (e >> 1), x0 + e + (e >> 1), y0 + 2 * e + e - 1, BIPC.k); R.rect(x0 + 3 * e + (e >> 2), y0 + 2 * e + (e >> 1), x0 + 3 * e + (e >> 1), y0 + 2 * e + e - 1, BIPC.k); }
  // la boca (abierta de susto al caer)
  if (o.cae || o.grita) R.rect(x0 + 2 * e, y0 + 4 * e + (e >> 1), x0 + 3 * e - 1, y0 + 5 * e + (e >> 2), hex('#5a1a1a'));
  else R.rect(x0 + 2 * e - (e >> 2), y0 + 4 * e + (e >> 1), x0 + 3 * e + (e >> 2) - 1, y0 + 4 * e + (e >> 1) + Math.max(0, (e >> 2) - 1), hex('#7a3a1a'));
  // pies
  const pies = o.cae || o.salta ? [[-0.5, -0.6], [3.5, -0.6]] : o.sube ? (paso ? [[0.5, 0], [2.5, -0.8]] : [[0.5, -0.8], [2.5, 0]]) : o.anda ? (paso ? [[0, 0], [3, 0]] : [[1, 0], [2, 0]]) : [[0.6, 0], [2.4, 0]];
  for (const [a, b] of pies) { const X = Math.round(x0 + a * e), Y = Math.round(y0 + 7 * e + b * e); R.rect(X - 1, Y - 1, X + e + 1, Y + Math.max(1, e >> 1) + 1, K); R.rect(X, Y, X + e, Y + Math.max(1, e >> 1), BIPC.B); }
  if (o.sube) { R.rect(x0 - e, y0 + (2 - paso) * e, x0 - 1, y0 + (3 - paso) * e - 1, BIPC.O); R.rect(x0 + 5 * e, y0 + (1 + paso) * e, x0 + 6 * e - 1, y0 + (2 + paso) * e - 1, BIPC.O); }
};
'''

E['at-warshaw'] = ('Warshaw', '''// AT-WARSHAW (frase 7), 1982. Cuatro planos:
// 1. (0–4,9 s) el despacho del programador de noche: Warshaw teclea solo («alone»); en «barely sleeping» se le cae la
//    cabeza, se despierta de golpe («!»), bebe café y en «idea» se vuelve a señalar la pizarra, que brilla en
//    «ambitious». Gag 2: el calendario de la pared pierde hojas a toda velocidad (julio, agosto, y las hojitas de los
//    días que salen volando). En la tele de pruebas anda Bip. Corta en «The alien».
// 2. (4,9–12) la tele de pruebas de cerca: Bip recorre las pantallas («screen to screen»: cada una con su cielo); en
//    «pieces» parpadean las tres casillas del marcador, en «telephone» brilla la pieza en el fondo del foso, en «call
//    home» se enciende la casita; en «bottom of pits» Bip salta dentro, la coge y se llena la primera casilla. La mano
//    de Warshaw mueve la palanca. Corta en la pausa antes de «But».
// 3. (12–16,3) la sala de pruebas al amanecer, vacía: las tres teles con sus mandos y las sillas sin nadie; el reloj
//    gira loco en «no time»; Warshaw entra corriendo con el cartucho y en «players» mira las sillas vacías («?»); el
//    jefe golpea el reloj de pulsera, en «nobody» se lo coge y se va contento por la puerta sin mirar las teles, donde
//    Bip se cae en los fosos. Corta en «fall».
// 4. (16,3–20,3) el foso por dentro (el mundo del juego en corte): Bip cae al fondo en «fall», trepa, vuelve a caer en
//    «again» y otra vez en «and again» (1, 2, 3); se queda mareado con estrellitas; un topo lo mira desde su galería.''', AYUDAS + r'''
const a = (f) => en('warshaw', f);
const P2 = a(0.2398), P3 = a(0.631), P4 = a(0.8658), FIN = E.duracion;
const SOLO = a(0.0329), DUERME = a(0.0669), DESPIERTA = a(0.1031), IDEA = a(0.1421), AMB = a(0.1805);
const PANT1 = a(0.3045), PANT2 = a(0.3418), PIEZAS = a(0.4088), TELEF = a(0.4428), CASA = a(0.4812), FONDO = a(0.5635), FOSOS = a(0.5909);
const NOTIEMPO = a(0.6513), JUGADORES = a(0.7182), NADIE = a(0.7566), NOTA = a(0.7709);
const CAE1 = a(0.8718), FOSO2 = a(0.907), OTRA = a(0.9234), OTRA2 = a(0.9717);

// ── 1 · el despacho de noche: Warshaw solo, el calendario que vuela ─────────────────────────────────────────────
const G0 = 1.25, G1 = 4.4;   // el gag del calendario
const p1 = (t) => {
  const g = tramo(t, G0, G1), mes = 7 + Math.min(1, Math.floor(g * 1.999)), hojas = g > 0 && g < 1 ? (g * 1.999) % 1 : 0;
  T.atari(R, t, { encuadre: 'despachoProg', mes: g >= 1 ? 9 : mes, hojas });
  // la tele de pruebas con el juego propio (Bip anda por la hierba)
  juego([212, 101, 244, 123], t, { s: 1, pant: 0, mi: 2 + ((t * 5) % 30), pose: 'anda', piezas: 0, r: 3, marco: hex('#140c08') });
  // las hojitas de los días que salen volando (a toda velocidad) y caen detrás del escritorio
  for (let k = 0; k < 12; k++) { const t0 = G0 + 0.1 + k * 0.25, u = lin(t, t0, t0 + 1.1); if (u <= 0 || u >= 1) continue;
    const x = Math.round(137 - u * (30 + (k % 4) * 14) + Math.sin(u * 10 + k) * 5), y = Math.round(44 + u * u * 120 - Math.sin(u * Math.PI) * 16), w = Math.max(1, Math.round(4 * Math.abs(Math.cos(u * 9 + k))));
    R.rect(x - w, y, x + w, y + 5, hex('#f4f0e4')); R.rect(x - w, y, x + w, y + 1, [hex('#e8803a'), hex('#d8a020'), hex('#d84a3a')][k % 3]); if (w > 1) R.rect(x + w, y, x + w, y + 5, hex('#b8b4a8')); }
  // Warshaw detrás del escritorio
  const cab = t > DUERME && t < DESPIERTA ? Math.min(2, Math.round((t - DUERME) * 4)) : 0;
  const cafe = t > DESPIERTA + 0.15 && t < IDEA - 0.05, senala = t > IDEA && t < P2 - 0.6;
  const teclea = !cafe && !senala && !(t > DUERME && t < DESPIERTA + 0.15);
  const tx = 90 + (Math.floor(t * 9) % 2) * 6;
  let o;
  if (teclea) o = { dir: -1, sostiene: [tx, 141], sonrisa: t > IDEA };
  else if (cafe) { const u = lin(t, DESPIERTA + 0.15, DESPIERTA + 0.45), v = lin(t, IDEA - 0.35, IDEA - 0.05); o = { dir: 1, sostiene: [Math.round(lerp(130, 116, u - v)), Math.round(lerp(140, 132, u - v))] }; }
  else if (senala) o = { dir: -1, dedo: true, sonrisa: true, habla: t > AMB - 0.2 && t < AMB + 0.5 && parp(t, 8) };
  else o = { dir: -1, triste: true };
  const w = R.actor(AT.warshaw, 100, 152 + cab, t, { ...o, sorpresa: t > DESPIERTA && t < DESPIERTA + 0.5 });
  if (cafe) { const [mx, my] = w.mano; R.rect(mx - 2, my - 6, mx + 3, my, K); R.rect(mx - 1, my - 5, mx + 2, my - 1, hex('#e8e4d8')); R.rect(mx - 1, my - 5, mx + 2, my - 5, hex('#5a3a1a')); R.pset(mx + 4, my - 4, K); R.pset(mx + 4, my - 2, K);
    for (let k = 0; k < 3; k++) { const v = ((t * 1.5 + k / 3) % 1); R.pset(Math.round(mx + Math.sin(v * 6 + k) * 1.5), Math.round(my - 7 - v * 7), mez(hex('#c8d0e0'), hex('#1c2240'), v)); } }
  // los ronquidos: burbujitas que suben de la cabeza que se le cae
  if (t > DUERME + 0.2 && t < DESPIERTA) for (let k = 0; k < 3; k++) { const v = ((t - DUERME) * 1.4 + k / 3) % 1; R.disco(Math.round(96 + v * 6 + k), Math.round(118 - v * 14), 1 + (k === 2 ? 1 : 0), mez(hex('#c8d8f0'), hex('#1c2240'), v * 0.7)); }
  if (t > DESPIERTA && t < DESPIERTA + 0.55) R.bocadillo(108, 116, {});
  // la pizarra brilla en «ambitious»: destellos sobre los dibujos
  if (t > AMB - 0.1 && t < AMB + 0.9) for (const [sx, sy, k] of [[38, 40, 0], [70, 34, 1], [96, 50, 2], [54, 62, 3]]) { if (Math.sin(t * 14 + k * 2) < 0) continue; for (let r = 1; r < 4; r++) { R.pset(sx + r, sy, hex('#fff6a0')); R.pset(sx - r, sy, hex('#fff6a0')); R.pset(sx, sy + r, hex('#fff6a0')); R.pset(sx, sy - r, hex('#fff6a0')); } R.pset(sx, sy, BL); }
  T.atariDelante(R, t, { encuadre: 'despachoProg' });
  // una polilla que da vueltas a la luz del flexo
  const ang = t * 5.2, mx = Math.round(170 + Math.cos(ang) * 8), my = Math.round(108 + Math.sin(ang * 1.3) * 5);
  R.pset(mx, my, hex('#d8c8a0')); R.pset(mx + (parp(t, 30) ? 1 : -1), my - 1, hex('#f0e4c0'));
};

// ── 2 · la tele de pruebas de cerca: Bip recorre las pantallas y busca las piezas ───────────────────────────────
const W1 = [PANT1 - 0.12, PANT1 + 0.2], W2 = [PANT2 + 0.12, PANT2 + 0.44], SALTA = FOSOS - 0.15, COGE = FOSOS + 0.55;
const p2 = (t) => {
  T.atari(R, t, { encuadre: 'despachoProg', camara: 'pantalla', juego: 'fosos' });
  // estado del juego
  let st = { s: 4, r: 10, pant: 0, pose: 'anda', dir: 1, piezas: 0 };
  if (t < W1[0]) { const u = lin(t, P2, W1[0]); let mi = lerp(3, 52, u); const f1 = 15; const d = mi - f1; st = { ...st, mi, mj: Math.abs(d) < 5 ? 15 - Math.round((1 - (d / 5) ** 2) * 5) : undefined, pose: Math.abs(d) < 5 ? 'salta' : 'anda' }; }
  else if (t < W1[1]) st = { ...st, wipe: lin(t, W1[0], W1[1]), bip: false };
  else if (t < W2[0]) { const u = lin(t, W1[1], W2[0]); st = { ...st, pant: 1, mi: lerp(3, 52, u) }; const f = [11, 26, 41].find((c) => Math.abs(st.mi - c) < 5); if (f != null) { const d = st.mi - f; st.mj = 15 - Math.round((1 - (d / 5) ** 2) * 5); st.pose = 'salta'; } }
  else if (t < W2[1]) st = { ...st, pant: 1, wipe: lin(t, W2[0], W2[1]), bip: false };
  else {
    // la tercera pantalla: el foso ancho con la pieza en el fondo
    const llega = lin(t, W2[1], TELEF + 0.3), mi0 = lerp(3, 21, llega);
    st = { ...st, pant: 2, mi: mi0, pose: llega < 1 ? 'anda' : 'quieto', pieza: t > TELEF - 0.2 && t < COGE ? 0 : undefined, brillaPiezas: t > PIEZAS - 0.1 && t < PIEZAS + 0.8, casa: t > CASA && t < CASA + 1.1 };
    if (t > SALTA) { const u = lin(t, SALTA, SALTA + 0.45); st.mi = lerp(21, 28, Math.min(1, u * 1.6)); st.mj = Math.round(15 - Math.sin(Math.min(1, u * 1.6) * Math.PI) * 3 + Math.max(0, u - 0.3) / 0.7 * 9); st.pose = u < 1 ? 'cae' : 'quieto'; st.dir = 1; }
    if (t > COGE) { st.piezas = 1; st.mi = 28; st.mj = 24; st.pose = 'quieto'; }
  }
  if (t > COGE) st.piezas = 1;
  st.puntos = 1500 + Math.floor((t - P2) * 2) * 10 + (t > COGE ? 500 : 0);
  juego([52, 22, 250, 128], t, st);
  if (t > COGE && t < COGE + 0.5) for (let r = 2; r < 7; r++) { const c = parp(t, 20) ? hex('#ffffff') : hex('#f8e060'); R.pset(216 + r, 28, c); R.pset(216 - r, 28, c); R.pset(216, 28 + r, c); R.pset(216, 28 - r, c); }
  // la mano de Warshaw en la palanca (se inclina con lo que hace Bip)
  const inc = t < W2[1] ? (Math.floor(t * 3) % 3 === 0 ? 0 : 1) : t > SALTA - 0.2 && t < SALTA + 0.3 ? 1 : 0;
  T.PIEZAS_AT.joystick(R, 232, 178, { s: 2, inclina: inc, pulsado: Math.abs(t - SALTA) < 0.15 || Math.abs(t - W1[0] + 0.6) < 0.1 });
  const bx = 232 + inc * 5, by = 152;
  T.brazo(R, 300, 205, bx + 9, by + 6, '#3a6a9a', -1, { codo: [276, 182] });
};

// ── 3 · la sala de pruebas al amanecer, vacía ───────────────────────────────────────────────────────────────────
const SUELO3 = 168;
const sala = () => {
  // techo de placas y fluorescentes
  R.rect(0, 0, 319, 15, hex('#d8d4c8')); for (let x = 180; x < 272; x += 20) R.rect(x, 0, x, 15, hex('#c4c0b4')); R.rect(0, 15, 319, 16, hex('#a8a498'));
  for (const x0 of [196]) { R.rect(x0, 5, x0 + 44, 10, hex('#9a9a90')); R.rect(x0 + 1, 6, x0 + 43, 9, hex('#f8f8ec')); }
  // pared: yeso con trama suave; la esquina de Atom queda lisa y tranquila
  for (let y = 17; y < 100; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x * 7 + y * 3) % 23 === 0 && !(x > 270 && y < 48) ? hex('#d6cab0') : y < 22 ? hex('#cfc3a8') : hex('#e2d8c0'));
  // friso de madera y zócalo de tablas
  R.rect(0, 98, 319, 101, hex('#6a4224')); R.rect(0, 98, 319, 98, hex('#9a6a3a'));
  for (let y = 102; y < 124; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 16 === 0 ? hex('#5a3a20') : (hh(x >> 1, y >> 3, 9) < 0.15 ? hex('#7a5030') : hex('#8a5a34')));
  R.rect(0, 123, 319, 125, hex('#4a2e18'));
  // la ventana (el cielo del amanecer va en la vida)
  R.rect(8, 24, 80, 94, hex('#5a5a62')); R.rect(10, 26, 78, 92, hex('#8a8a92')); R.rect(10, 92, 80, 95, hex('#c8c8c0'));
  // el corcho con fichas de colores (sin letras: rayas)
  R.rect(126, 26, 180, 62, hex('#6a4a2a')); R.rect(128, 28, 178, 60, hex('#b8844a'));
  for (let y = 28; y <= 60; y++) for (let x = 128; x <= 178; x++) if (hh(x, y, 5) < 0.18) R.pset(x, y, hex('#a87440'));
  for (const [x, y, c] of [[131, 31, '#f0e8a0'], [146, 33, '#a8d8f0'], [161, 30, '#f0b0c0'], [133, 46, '#ffffff'], [164, 46, '#c8f0a8']]) { R.rect(x, y, x + 11, y + 11, hex(c)); for (let j = 3; j < 10; j += 2) R.rect(x + 2, y + j, x + 9 - (j % 3), y + j, hex('#8a8478')); R.disco(x + 5, y + 1, 1, hex('#d83a3a')); }
  // la puerta de la derecha (con el cristal esmerilado) y su marco
  R.rect(282, 50, 318, 156, hex('#4a2e18')); R.rect(285, 53, 315, 156, hex('#8a5a34'));
  for (let y = 53; y < 156; y++) for (let x = 285; x <= 315; x++) if (hh(x >> 1, y, 21) < 0.12) R.pset(x, y, hex('#7a4e2c'));
  R.rect(290, 60, 310, 92, hex('#4a2e18')); R.rect(291, 61, 309, 91, hex('#c8d4d8')); for (let y = 61; y < 92; y++) for (let x = 291; x < 310; x++) if ((x + y) % 3 === 0) R.pset(x, y, hex('#b0bcc4'));
  R.rect(287, 104, 290, 108, hex('#c8a040')); R.pset(287, 104, hex('#f0d880'));
  // el suelo: moqueta de placas con su trama y la luz de la ventana
  for (let y = 126; y < 180; y++) for (let x = 0; x < 320; x++) { const pl = ((x >> 4) + (y >> 3)) & 1, c = pl ? hex('#5a6878') : hex('#52606e'); R.pset(x, y, hh(x, y, 2) < 0.1 ? hex('#6a7888') : c); }
  for (let y = 126; y < 180; y++) for (let x = 0; x < 320; x++) { const xl = 20 + (y - 126) * 0.9, xr = 92 + (y - 126) * 1.6; if (x > xl && x < xr && (x + y) % 2 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#f8c890'), 0.35)); }
  // en la moqueta: una caja de cartón con cartuchos de prueba, la papelera con bolas de papel y los cables de las teles
  R.rect(28, 150, 58, 170, hex('#6a4a24')); R.rect(29, 151, 57, 169, hex('#c8a06a')); R.rect(29, 151, 57, 154, hex('#a8844a')); R.poligono([[29, 151], [36, 143], [44, 151]], hex('#d8b07a')); R.poligono([[44, 151], [52, 144], [57, 151]], hex('#b8905a'));
  for (let k = 0; k < 4; k++) { R.rect(32 + k * 6, 146, 36 + k * 6, 152, hex('#24222c')); R.rect(33 + k * 6, 147, 35 + k * 6, 149, [hex('#e8803a'), hex('#3a6ad8'), hex('#3a9a4a'), hex('#d0383a')][k]); }
  R.rect(198, 158, 212, 174, hex('#3a3a44')); R.rect(199, 159, 211, 173, hex('#5a5a66')); for (let x = 200; x < 211; x += 3) R.rect(x, 160, x, 172, hex('#4a4a56')); R.disco(203, 157, 3, hex('#f0ecdc')); R.disco(208, 156, 2, hex('#e0dccc')); R.disco(216, 172, 2, hex('#f0ecdc'));
  for (const x0 of [108, 172, 236]) { R.linea(x0 + 20, 116, x0 + 22, 152, hex('#24222c')); R.linea(x0 + 22, 152, x0 + 30, 176, hex('#24222c')); }
  // el dispensador de agua
  R.rect(88, 92, 102, 140, hex('#e8e8e0')); R.rect(88, 92, 102, 93, hex('#c8c8c0')); R.rect(90, 70, 100, 92, hex('#7ab8e0')); R.rect(91, 72, 99, 90, hex('#a8d8f0')); R.rect(92, 66, 98, 70, hex('#5a98c0')); R.rect(90, 110, 92, 112, hex('#3a6ad8')); R.rect(97, 110, 99, 112, hex('#d83a3a'));
  // la planta en el rincón
  R.rect(2, 132, 18, 150, hex('#a8502a')); R.rect(2, 132, 18, 134, hex('#c8683a'));
  for (let k = 0; k < 9; k++) { const an = -Math.PI / 2 + (k - 4) * 0.32, l = 18 + (k % 3) * 5; R.linea(10, 132, Math.round(10 + Math.cos(an) * l), Math.round(132 + Math.sin(an) * l), k % 2 ? hex('#3a8a3a') : hex('#2a6a2a')); }
  // las tres mesas de pruebas (tablero y 112) con sus teles y mandos
  for (const x0 of [108, 172, 236]) {
    R.rect(x0, 112, x0 + 40, 115, hex('#5a3a20')); R.rect(x0, 112, x0 + 40, 112, hex('#8a5a34')); R.rect(x0 + 2, 116, x0 + 4, 150, hex('#4a2e18')); R.rect(x0 + 36, 116, x0 + 38, 150, hex('#4a2e18'));
    R.rect(x0 + 6, 86, x0 + 32, 111, hex('#6a4224')); R.rect(x0 + 6, 86, x0 + 32, 87, hex('#9a6a3a')); R.rect(x0 + 8, 88, x0 + 26, 107, hex('#141016')); R.rect(x0 + 28, 90, x0 + 30, 92, hex('#c8c8c0')); R.rect(x0 + 28, 95, x0 + 30, 97, hex('#c8c8c0'));
    R.linea(x0 + 14, 86, x0 + 9, 78, hex('#9a9aa8')); R.linea(x0 + 22, 86, x0 + 27, 78, hex('#9a9aa8'));
  }
};
const silla3 = (x, y) => {   // silla de ruedas vacía, mirando a la mesa
  R.rect(x - 2, y - 30, x + 12, y - 16, K); R.rect(x - 1, y - 29, x + 11, y - 17, hex('#3a4a6a')); R.rect(x, y - 28, x + 10, y - 27, hex('#5a6a8a'));
  R.rect(x - 4, y - 16, x + 14, y - 12, K); R.rect(x - 3, y - 15, x + 13, y - 13, hex('#4a5a7a')); R.rect(x + 4, y - 11, x + 6, y - 4, hex('#2a2a30'));
  R.linea(x - 4, y - 2, x + 14, y - 2, hex('#2a2a30')); R.linea(x + 5, y - 4, x - 2, y - 1, hex('#2a2a30')); R.linea(x + 5, y - 4, x + 12, y - 1, hex('#2a2a30'));
  for (const dx of [-4, 5, 14]) R.disco(x + dx, y, 1, hex('#141016'));
};
const SALE3 = NADIE + 0.75;
const p3 = (t) => {
  capa('sala', sala);
  // el amanecer por la ventana: cielo tramado, sol que asoma, nubes de tres tonos, palmeras y el aparcamiento
  R.recorte([10, 26, 78, 91]);
  degr(10, 26, 78, 91, [hex('#4a5a9a'), hex('#8a7ab0'), hex('#e89a8a'), hex('#f8c890')]);
  R.disco(52, Math.round(84 - (t - P3) * 1.2), 9, hex('#f8e0a0')); R.disco(52, Math.round(84 - (t - P3) * 1.2), 7, hex('#fff2c8'));
  nube(((t * 3) % 110) - 20, 38, 22, [hex('#f8d8c8'), hex('#d8a8b8'), hex('#a888a8')]); nube(((t * 1.6 + 60) % 110) - 20, 50, 16, [hex('#f8e0c8'), hex('#e0b0a8'), hex('#b8909a')]);
  pajaro(((t * 12) % 90) + 6, 34 + Math.sin(t) * 2, t, 0); pajaro(((t * 12 + 7) % 90) + 6, 37 + Math.sin(t) * 2, t, 1);
  for (let x = 10; x <= 78; x++) R.pset(x, 80 + (hh(x >> 3, 1, 4) < 0.5 ? 0 : 1), hex('#3a3050'));
  for (let y = 81; y <= 91; y++) for (let x = 10; x <= 78; x++) R.pset(x, y, y > 87 ? hex('#4a4652') : hex('#3a3646'));
  for (const [cx, k] of [[22, 0], [66, 1]]) { R.linea(cx, 88, cx + 1, 62, hex('#2a2030')); for (let i = 0; i < 6; i++) { const an = -Math.PI + i * 0.6 + Math.sin(t * 1.5 + k + i) * 0.08; R.linea(cx + 1, 62, Math.round(cx + 1 + Math.cos(an) * 9), Math.round(62 + Math.sin(an) * 5 + 3), hex('#2a2030')); } }
  const cx = Math.round(((t * 9) % 120) - 30); R.disco(cx + 3, 89, 1, K); R.disco(cx + 12, 89, 1, K); R.rect(cx, 84, cx + 15, 88, hex('#c84a3a')); R.rect(cx + 3, 82, cx + 11, 84, hex('#a83a2a')); R.pset(cx + 15, 86, hex('#fff2a0'));
  R.recorte(null);
  // las persianas a medio bajar y el marco
  for (let y = 26; y < 40; y += 2) R.rect(10, y, 78, y, hex('#d8d8d0')); R.rect(10, 40, 78, 41, hex('#a8a8a0')); R.rect(43, 26, 45, 92, hex('#5a5a62'));
  // el fluorescente que parpadea
  if (Math.sin(t * 23) > 0.6 || Math.sin(t * 3.1) > 0.2) R.rect(197, 6, 239, 9, hex('#c8c8bc'));
  // el reloj de pared: las agujas giran locas en «no time»
  const loco = lin(t, NOTIEMPO - 0.3, NOTIEMPO + 0.2) - lin(t, NOTIEMPO + 1.2, NOTIEMPO + 1.6), gira = (t - P3) * 0.4 + Math.max(0, Math.min(t, NOTIEMPO + 1.6) - (NOTIEMPO - 0.3)) * 14;
  R.disco(108, 42, 12, K); R.disco(108, 42, 11, hex('#f8f4e8')); R.disco(108, 42, 10, hex('#ffffff'));
  for (let k = 0; k < 12; k++) { const an = k / 12 * Math.PI * 2; R.pset(Math.round(108 + Math.cos(an) * 8), Math.round(42 + Math.sin(an) * 8), K); }
  R.linea(108, 42, Math.round(108 + Math.cos(gira - 1.57) * 8), Math.round(42 + Math.sin(gira - 1.57) * 8), hex('#d83a3a'));
  R.linea(108, 42, Math.round(108 + Math.cos(gira / 12 - 0.5) * 5), Math.round(42 + Math.sin(gira / 12 - 0.5) * 5), K);
  if (loco > 0.5) for (const [dx, dy] of [[-15, -6], [15, -6], [-15, 6], [15, 6]]) R.linea(108 + dx, 42 + dy, 108 + dx * 1.3, 42 + dy * 1.3, hex('#8a8478'));
  // las teles de pruebas: Bip se cae en los fosos y nadie mira
  [108, 172, 236].forEach((x0, k) => { const v = ((t + k * 0.7) % 2.2) / 2.2, f = 20; const st = { s: 1, hud: 3, suelo: 11, pant: k % 3, piezas: 0, r: 2, marco: hex('#141016'), barrido: false };
    const fosoC = Math.round(PANTS[k % 3].fosos[0] * 19); st.mi = Math.min(fosoC, Math.round(lerp(2, fosoC + 0.5, Math.min(1, v * 2)))); st.mj = v < 0.5 ? undefined : Math.min(18, 10 + Math.round((v - 0.5) * 30)); st.pose = v < 0.5 ? 'anda' : 'cae';
    juego([x0 + 8, 88, x0 + 26, 107], t + k, st); });
  // el ventilador de la primera mesa, que gira y mueve las fichas del corcho
  const os = Math.sin(t * 1.4); R.rect(116, 104, 120, 111, hex('#3a3a40')); R.disco(118 + Math.round(os * 2), 100, 5, hex('#5a5a62')); R.disco(118 + Math.round(os * 2), 100, 4, hex('#9a9aa8'));
  for (let k = 0; k < 3; k++) { const an = t * 25 + k * 2.1; R.linea(118 + Math.round(os * 2), 100, Math.round(118 + os * 2 + Math.cos(an) * 3), Math.round(100 + Math.sin(an) * 3), hex('#d8d8e0')); }
  if (Math.sin(t * 6) > 0) R.rect(164, 46, 175, 47, hex('#e0f8c8'));
  // los mandos sobre las mesas y las sillas vacías
  for (const x0 of [108, 172, 236]) T.PIEZAS_AT.joystick(R, x0 + 34, 112, { inclina: 0 });
  for (const x0 of [108, 172, 236]) silla3(x0 + 14, 156);
  // el jefe en la puerta golpea el reloj de pulsera; en «nobody» coge el cartucho y se va sin mirar
  const ida = lin(t, NADIE - 0.1, NADIE + 0.5), vuelta = lin(t, SALE3 + 0.1, P4 - 0.15), puerta = lin(t, SALE3 + 0.2, SALE3 + 0.6);
  const jx = Math.round(ida < 1 ? lerp(262, 166, ida) : lerp(166, 300, vuelta));
  const lleva = t > SALE3;
  // Warshaw entra corriendo con el cartucho, se para y mira las sillas
  const wu = lin(t, P3, JUGADORES - 0.3), wx = Math.round(lerp(-18, 132, wu)), dudas = t > JUGADORES && t < NADIE + 0.1;
  const daW = t > NADIE + 0.45 && t < SALE3 + 0.05;
  const ww = R.actor(AT.warshaw, wx, SUELO3, t, { dir: dudas ? (Math.floor(t * 3) % 2 ? -1 : 1) : 1, anda: wu > 0 && wu < 1, sostiene: !lleva ? (daW ? [wx + 18, 150] : true) : undefined, sorpresa: t > JUGADORES - 0.2 && t < JUGADORES + 0.4, triste: lleva && t > SALE3 + 0.5, habla: daW && parp(t, 8) });
  if (!lleva) T.PIEZAS_AT.cartucho(R, ww.mano[0], ww.mano[1] + 6, { color: 'naranja', icono: 'foso' });
  if (dudas) R.bocadillo(wx + 8, SUELO3 - 30, { icono: '?' });
  // la puerta se abre (la hoja gira hacia dentro) cuando el jefe sale
  if (puerta > 0) { const wd = Math.round(30 * (1 - puerta * 0.75)); R.rect(285, 53, 315, 156, hex('#1a1410')); R.rect(285, 53, 285 + wd, 156, hex('#8a5a34')); R.rect(285 + wd, 53, 286 + wd, 156, hex('#5a3a20')); }
  const je = R.actor(AT.ejecutivoAtari, jx, SUELO3, t, { dir: ida < 1 && ida > 0 ? -1 : lleva ? 1 : -1, anda: (ida > 0 && ida < 1) || (vuelta > 0 && vuelta < 1), dedo: t < NADIE - 0.2 && t > NOTIEMPO - 0.2 && Math.floor(t * 4) % 2 === 0, habla: t > NOTIEMPO && t < NOTIEMPO + 0.9 && parp(t, 8), sonrisa: lleva, sostiene: lleva ? true : t > NADIE + 0.45 ? [jx - 2, 150] : undefined });
  if (lleva) T.PIEZAS_AT.cartucho(R, je.mano[0], je.mano[1] + 6, { color: 'naranja', icono: 'foso' });
  // el reloj de pulsera que se golpea: un destello
  if (t > NOTIEMPO - 0.2 && t < NADIE - 0.2 && Math.floor(t * 4) % 2 === 0) R.pset(jx + 1, SUELO3 - 18, hex('#f8e060'));
  // si la puerta está abierta, el marco tapa al jefe que sale
  if (puerta > 0 && jx > 290) { R.rect(316, 50, 319, 156, hex('#4a2e18')); }
};

// ── 4 · el foso por dentro: cae, sale, vuelve a caer ───────────────────────────────────────────────────────────
const FX = 160, FW = 22, TOP4 = 84, FONDO4 = 164;
const corte = () => {
  // el cielo de noche del juego, tramado en bandas, con colinas
  degr(0, 0, 319, 84, [hex('#0c0c30'), hex('#14184a'), hex('#202c6a'), hex('#34488a'), hex('#4a64a8')]);
  for (let k = 0; k < 60; k++) { const x = Math.floor(hh(k, 1, 7) * 320), y = Math.floor(hh(k, 2, 7) * 60) + 16; if (x > 270 && y < 48) continue; R.pset(x, y, k % 4 ? hex('#8a90c0') : hex('#e8e8ff')); }
  for (let x = 0; x < 320; x++) { const h1 = 62 + Math.round(Math.sin(x * 0.03) * 6 + Math.sin(x * 0.011 + 1) * 5), h2 = 70 + Math.round(Math.sin(x * 0.05 + 2) * 4); for (let y = h1; y < 85; y++) R.pset(x, y, (x + y) % 2 && y < h1 + 2 ? hex('#3a3a7a') : hex('#2a2a5a')); for (let y = h2; y < 85; y++) R.pset(x, y, hex('#1e3a4a')); }
  // los estratos de la tierra: capa vegetal, arcilla, roca, con piedras, raíces y fósiles
  const CAP = [[86, hex('#7a4a24'), hex('#8a5a2a')], [104, hex('#9a6a3a'), hex('#a87a46')], [126, hex('#7a6a5a'), hex('#8a7a6a')], [150, hex('#5a5260'), hex('#6a6270')]];
  for (let y = 84; y < 180; y++) { let c = CAP[0]; for (const L of CAP) if (y >= L[0] + Math.round(Math.sin(y * 0.1) * 2)) c = L; for (let x = 0; x < 320; x++) { const ond = Math.round(Math.sin(x * 0.07) * 3); let cc = c; for (const L of CAP) if (y >= L[0] + ond) cc = L; R.pset(x, y, hh(x >> 1, y >> 1, 11) < 0.2 ? cc[2] : cc[1]); } }
  for (let k = 0; k < 70; k++) { const x = Math.floor(hh(k, 3, 8) * 320), y = 92 + Math.floor(hh(k, 4, 8) * 84), r = 1 + Math.floor(hh(k, 5, 8) * 3); if (Math.abs(x - FX) < FW + 6) continue; R.disco(x, y, r, hex('#3a2e2a')); R.disco(x, y, Math.max(0, r - 1), y > 126 ? hex('#9a92a0') : hex('#b89a6a')); R.pset(x - 1, y - r + 1, hex('#e8d8b0')); }
  for (const [x0, y0, l, s] of [[30, 88, 18, 1], [70, 88, 12, -1], [240, 88, 20, 1], [290, 88, 14, -1]]) { let x = x0; for (let y = y0; y < y0 + l; y++) { R.pset(x, y, hex('#d8b080')); if (y % 3 === 0) x += s; if (y % 5 === 0) R.pset(x + s, y, hex('#d8b080')); } }
  // una caracola fósil y un cristal
  for (let k = 0; k < 14; k++) { const an = k * 0.6, r = k * 0.45; R.pset(Math.round(62 + Math.cos(an) * r), Math.round(138 + Math.sin(an) * r), hex('#e8dcc0')); }
  R.poligono([[264, 146], [268, 138], [272, 146], [268, 152]], hex('#7ac8e8')); R.linea(268, 139, 268, 151, hex('#c8f0ff'));
  // la hierba de arriba, a bloques gordos
  for (let x = 0; x < 320; x++) { if (Math.abs(x - FX) <= FW) continue; R.rect(x, 82, x, 85, ((x >> 2) % 3) ? hex('#4ac84a') : hex('#7ae86a')); R.pset(x, 86, hex('#2a9a3a')); R.pset(x, 87, hex('#2a9a3a')); if (hh(x, 1, 6) < 0.25) R.pset(x, 81, hex('#3aa83a')); }
  // la galería del topo, a la izquierda del foso
  for (let x = 92; x < 128; x++) for (let y = 128; y < 136; y++) if (((x - 110) / 18) ** 2 + ((y - 132) / 4) ** 2 < 1) R.pset(x, y, hex('#2a1a12'));
  // el pozo: paredes irregulares, oscuro por dentro con la luz de arriba
  for (let y = 84; y <= FONDO4 + 6; y++) { const ia = Math.round(Math.sin(y * 0.4) * 1.5), ib = Math.round(Math.cos(y * 0.33) * 1.5); for (let x = FX - FW + ia; x <= FX + FW + ib; x++) R.pset(x, y, mez(hex('#141018'), hex('#2a2030'), Math.max(0, 1 - (y - 84) / 30) * ((x + y) % 2))); R.pset(FX - FW + ia, y, hex('#3a2410')); R.pset(FX - FW + ia + 1, y, hex('#5a3a1e')); R.pset(FX + FW + ib, y, hex('#3a2410')); R.pset(FX + FW + ib - 1, y, hex('#2a1a0c')); }
  for (let x = FX - FW; x <= FX + FW; x++) { R.pset(x, FONDO4 + 1, hex('#5a4a40')); R.pset(x, FONDO4 + 2, hex('#3a302a')); if (hh(x, 9) < 0.4) R.pset(x, FONDO4, hex('#6a5a4a')); }
};
const SEC4 = [[CAE1 + 0.05, FOSO2 - 0.05], [OTRA, OTRA + 0.35], [OTRA2, OTRA2 + 0.32]];   // cada caída: [empieza, llega al fondo]
const SUBE4 = [[FOSO2 + 0.05, OTRA - 0.08], [OTRA + 0.45, OTRA2 - 0.06]];
const p4 = (t) => {
  capa('corte', corte);
  // la vida del cielo: dos nubes de tres tonos (noche) y luciérnagas sobre la hierba
  nube(((t * 4) % 380) - 40, 26, 30, [hex('#5a6aa8'), hex('#3a4a88'), hex('#2a3268')]); nube(((t * 2.4 + 190) % 380) - 40, 44, 22, [hex('#4a5a98'), hex('#34407a'), hex('#242c5a')]);
  for (let k = 0; k < 6; k++) { const x = Math.round(30 + k * 50 + Math.sin(t * 1.3 + k) * 8), y = Math.round(70 + Math.sin(t * 2 + k * 2) * 5); if (Math.sin(t * 4 + k) > 0) { R.pset(x, y, hex('#f8f0a0')); R.pset(x + 1, y, hex('#a8a050')); } }
  // las flores de la hierba que se mecen
  for (const [x, c] of [[40, '#f07aa8'], [96, '#f0d040'], [214, '#f07aa8'], [262, '#f0d040']]) { const m = Math.sin(t * 2 + x) > 0.4 ? 1 : 0; R.rect(x, 74, x, 81, hex('#2a9a3a')); R.rect(x - 2 + m, 70, x + 2 + m, 72, hex(c)); R.rect(x - 1 + m, 69, x + 1 + m, 73, hex(c)); R.pset(x + m, 71, hex('#fff6c0')); }
  // la pieza del teléfono que brilla en el fondo
  { const pc = parp(t, 6) ? hex('#ffffff') : hex('#c8c8e0'); R.rect(FX + 6, FONDO4 - 6, FX + 18, FONDO4 - 3, K); R.rect(FX + 7, FONDO4 - 5, FX + 17, FONDO4 - 4, pc); R.rect(FX + 5, FONDO4 - 3, FX + 9, FONDO4, K); R.rect(FX + 15, FONDO4 - 3, FX + 19, FONDO4, K); R.rect(FX + 6, FONDO4 - 3, FX + 8, FONDO4 - 1, pc); R.rect(FX + 16, FONDO4 - 3, FX + 18, FONDO4 - 1, pc); }
  // Bip: llega andando, cae, trepa, cae otra vez…
  let bx = lerp(40, FX - 8, lin(t, P4, CAE1)), by = 82, o = { anda: true, dir: 1 }, n = 0;
  for (let k = 0; k < 3; k++) { const [c0, c1] = SEC4[k]; if (t >= c0) { n = k + 1; const u = lin(t, c0, c1); bx = FX - 8 + Math.min(1, u * 3) * 6; by = lerp(82, FONDO4, u * u); o = u < 1 ? { cae: true } : { mareo: k === 2, dir: 1 }; } }
  for (let k = 0; k < 2; k++) { const [s0, s1] = SUBE4[k]; if (t >= s0 && t < s1) { const u = lin(t, s0, s1); bx = FX - FW + 7; by = lerp(FONDO4, 82, u); o = u < 1 ? { sube: true } : { dir: 1 }; if (u >= 0.98) { bx = lerp(FX - FW + 7, FX - 8, lin(t, s1 - 0.1, s1)); } } }
  const tras = t >= SUBE4[0][1] && t < SEC4[1][0] ? lin(t, SUBE4[0][1], SEC4[1][0]) : t >= SUBE4[1][1] && t < SEC4[2][0] ? lin(t, SUBE4[1][1], SEC4[2][0]) : -1;
  if (tras >= 0) { bx = lerp(FX - FW + 7, FX - 8, tras); by = 82; o = { anda: true, dir: 1 }; }
  bipGrande(Math.round(bx), Math.round(by), 3, t, o);
  // el polvo al llegar al fondo y el número de la caída (1, 2, 3)
  for (let k = 0; k < 3; k++) { const c1 = SEC4[k][1], d = t - c1; if (d > 0 && d < 0.5) for (let i = 0; i < 6; i++) { const an = Math.PI + i / 5 * Math.PI, r = 3 + d * 18; R.pset(Math.round(FX - 8 + Math.cos(an) * r * 1.4), Math.round(FONDO4 - 1 + Math.sin(an) * r * 0.5), hex('#c8b898')); }
    if (d > 0 && d < 1.4) { const yy = Math.round(118 - Math.min(1, d * 4) * 8); dig(String(k + 1), FX + 30, yy, 3, hex('#f8e060'), K); } }
  // tras la tercera, estrellitas que le dan vueltas
  if (t > SEC4[2][1] + 0.1) for (let k = 0; k < 3; k++) { const an = t * 5 + k * 2.1; const sx = Math.round(FX - 8 + Math.cos(an) * 8), sy = Math.round(FONDO4 - 20 + Math.sin(an) * 2); R.pset(sx, sy, hex('#f8e060')); R.pset(sx + 1, sy, hex('#f8e060')); R.pset(sx, sy - 1, hex('#fff6c0')); }
  // el topo asoma por su galería y mira (gira la cabeza con cada caída)
  const tp = lin(t, P4 + 0.4, P4 + 1.0), tx = Math.round(lerp(100, 120, tp)), mira = n > 0 ? 1 : -1;
  R.disco(tx, 131, 4, hex('#3a3040')); R.disco(tx + 3 * mira, 132, 2, hex('#4a4050')); R.pset(tx + 5 * mira, 132, hex('#f0a0b0')); R.pset(tx + 1 * mira, 129, BL); R.pset(tx + 2 * mira, 130, K);
  if (t > SEC4[1][1] && t < SEC4[1][1] + 0.6) R.bocadillo(tx, 122, { icono: '!' });
  if (t > SEC4[2][1] + 0.3) { const k = Math.floor(t * 6) % 2; R.pset(tx - 4, 127 - k, hex('#4a4050')); }
};
const efectos = [[0.6, 'tecleo'], [G0 + 0.1, 'papel'], [DESPIERTA, 'golpecito'], [DESPIERTA + 0.5, 'toc'], [AMB, 'brillo'],
  [W1[0], 'whoosh'], [W2[0], 'whoosh'], [TELEF, 'brillo'], [CASA, 'bip'], [SALTA + 0.2, 'boing'], [COGE, 'brillo'],
  [NOTIEMPO, 'tic'], [JUGADORES, 'pop'], [NADIE + 0.6, 'golpecito'], [SALE3 + 0.25, 'puerta'],
  [SEC4[0][1], 'chof'], [SEC4[1][1], 'chof'], [SEC4[2][1], 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1982 });
''')

E['at-millones'] = ('Millones', '''// AT-MILLONES (frase 8), 1982. Cuatro planos:
// 1. (0–4,9 s) la fábrica de cartuchos (fondo local): la cinta lleva los cartuchos, la prensa les pega la etiqueta, la
//    empaquetadora los convierte en cajas que caen al montón; el ejecutivo señala el marcador en «sure of a hit» y
//    levanta los brazos en «millions», cuando el contador pasa del 1000000; una carretilla cruza por delante con un palé
//    («cartridges»). Corta antes de «Sales».
// 2. (4,9–8,8) inserto, el mostrador de la juguetería: la mano del dependiente pasa cajas a la mano de un niño, la caja
//    registradora suena y su visor llega a 1500000 en «a million and a half copies». Corta en «kids».
// 3. (8,8–15,4) el salón en la Navidad de 1982 (gag 3): el niño rompe el papel del regalo en «opened», salta en
//    «Christmas» (la madre hace la foto con flash), corre a la tele con el mando, «?» en «confusing»; en la tele Bip cae
//    en el foso («fell into a pit»), sale («climbed out») y vuelve a caer («fell in again»): el niño se enfada, el padre
//    se lleva la mano a la cabeza y el perro ladra. Corta en la pausa antes de «Stores».
// 4. (15,4–20,2) la juguetería: un padre devuelve la caja en «returns», el dependiente la pone en el montón de
//    devoluciones; llega una madre con su niño en pijama y otra caja, y el montón crece.''', AYUDAS + r'''
const m = (f) => en('millones', f);
const P2 = m(0.2442), P3 = m(0.4854), P4 = m(0.8966), FIN = E.duracion;
const SEGURO = m(0.0544), EXITO = m(0.0853), MILL = m(0.1336), CARTS = m(0.1768);
const VENTAS = m(0.248), MEDIO = m(0.3828), COPIAS = m(0.431);
const ABRE = m(0.5176), NAVIDAD = m(0.5608), CONFUSO = m(0.6227), CAE = m(0.7043), SALE = m(0.776), OTRA = m(0.8304);
const DEVUEL = m(0.9523);

// ── 1 · la fábrica de cartuchos ─────────────────────────────────────────────────────────────────────────────────
const CINTA = 122, VEL = 34;
const fabrica = () => {
  // cubierta de dientes de sierra con cerchas y las ventanas altas (el cielo va en la vida)
  R.rect(0, 0, 319, 179, hex('#5a5e6a'));
  for (let y = 0; y < 16; y++) for (let x = 0; x < 320; x++) R.pset(x, y, ((x + y * 2) % 40) < 3 ? hex('#3a3e48') : hex('#4a4e5a'));
  for (let x = 0; x < 320; x += 40) { R.linea(x, 16, x + 40, 0, hex('#2a2e36')); R.linea(x, 15, x + 39, 0, hex('#2a2e36')); R.linea(x + 20, 8, x + 20, 16, hex('#2a2e36')); }
  R.rect(0, 16, 319, 18, hex('#2a2e36'));
  // pared de ladrillo con trama
  for (let y = 19; y < 120; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 5), o = (f % 2) * 6, jx = (x + o) % 12 === 0, jy = y % 5 === 0;
    R.pset(x, y, jx || jy ? hex('#6a4a3e') : hh((x + o) / 12 | 0, f, 3) < 0.25 ? hex('#9a5a44') : hh((x + o) / 12 | 0, f, 4) < 0.5 ? hex('#a8644a') : hex('#b06e52')); }
  // las ventanas altas (x 8–262): marcos de acero
  for (let k = 0; k < 6; k++) { const x0 = 8 + k * 44; R.rect(x0, 22, x0 + 36, 44, hex('#2a2e36')); }
  // la esquina de Atom: un tramo de pared encalada, tranquila
  R.rect(270, 19, 319, 52, hex('#8a6a5e')); for (let y = 19; y < 53; y++) for (let x = 270; x < 320; x++) if (y % 5 === 0 || (x + (Math.floor(y / 5) % 2) * 6) % 12 === 0) R.pset(x, y, hex('#7e6056')); R.rect(270, 52, 319, 53, hex('#5a4a40'));
  // el marcador de producción (cifras ámbar sobre negro)
  R.rect(92, 50, 228, 76, hex('#2a2a30')); R.rect(94, 52, 226, 74, hex('#0c0a10')); for (const x of [100, 220]) { R.disco(x, 50, 1, hex('#9a9aa8')); }
  R.linea(100, 48, 104, 19, hex('#3a3a40')); R.linea(220, 48, 216, 19, hex('#3a3a40'));
  // tuberías y un cuadro eléctrico
  R.rect(0, 84, 319, 87, hex('#5a7a8a')); R.rect(0, 84, 319, 84, hex('#8aaaba')); for (let x = 20; x < 320; x += 48) R.rect(x, 82, x + 3, 89, hex('#3a4a5a'));
  R.rect(244, 54, 266, 80, hex('#7a8a6a')); R.rect(246, 56, 264, 78, hex('#8a9a7a')); R.rect(252, 60, 258, 66, hex('#f0d040')); R.poligono([[255, 61], [253, 65], [256, 64], [254, 68]], K);
  // el suelo de hormigón con las líneas amarillas, manchas y rejillas
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x >> 1, y >> 1, 12) < 0.12 ? hex('#7a7a76') : y < 124 ? hex('#5a5a58') : hex('#8a8a86'));
  for (let x = 0; x < 320; x += 1) { R.pset(x, 166, (x >> 3) % 2 ? hex('#e8c040') : hex('#2a2a2a')); R.pset(x, 167, (x >> 3) % 2 ? hex('#c8a030') : hex('#2a2a2a')); }
  for (let y = 0; y < 8; y++) for (let x = 0; x < 30; x++) if (((x - 15) / 15) ** 2 + ((y - 4) / 4) ** 2 < 1 && hh(x, y, 4) < 0.6) R.pset(40 + x, 150 + y, hex('#5a5a56'));
  R.rect(200, 172, 222, 177, hex('#4a4a48')); for (let x = 202; x < 222; x += 3) R.rect(x, 173, x, 176, hex('#2a2a2a'));
  // bajo la cinta: cubetas de cartuchos grises; delante: bidones, cartones plegados, una carretilla de mano y un cono
  for (const x0 of [16, 98, 176]) { R.rect(x0, 140, x0 + 26, 158, hex('#2a4a7a')); R.rect(x0 + 1, 141, x0 + 25, 157, hex('#3a6aa8')); R.rect(x0 + 1, 141, x0 + 25, 142, hex('#6a9ad8')); for (let k = 0; k < 5; k++) R.rect(x0 + 2 + k * 5, 136 - (k % 2) * 2, x0 + 5 + k * 5, 141, hex('#5a5a66')); }
  for (const [x0, c] of [[144, '#3a7a5a'], [158, '#3a6a8a']]) { R.rect(x0, 150, x0 + 12, 168, hex('#1a1a20')); R.rect(x0 + 1, 151, x0 + 11, 167, hex(c)); R.rect(x0 + 1, 155, x0 + 11, 155, hex('#1a1a20')); R.rect(x0 + 1, 162, x0 + 11, 162, hex('#1a1a20')); R.rect(x0 + 3, 151, x0 + 4, 167, mez(hex(c), BL, 0.3)); R.rect(x0 + 2, 149, x0 + 10, 150, hex('#5a5a66')); }
  for (let k = 0; k < 5; k++) { R.rect(176, 162 - k * 2, 200, 163 - k * 2, k % 2 ? hex('#a8844a') : hex('#c8a06a')); } R.rect(176, 154, 200, 154, hex('#8a6a3a'));
  R.poligono([[302, 168], [312, 168], [307, 152]], hex('#f08a2a')); R.rect(303, 160, 311, 161, BL); R.rect(300, 168, 314, 169, hex('#3a3a40'));
  R.linea(212, 170, 218, 146, hex('#3a3a40')); R.linea(214, 170, 220, 146, hex('#5a5a66')); R.rect(210, 166, 224, 168, hex('#3a3a40')); R.disco(214, 171, 2, K);
  // la cinta transportadora: patas, rodillos y la banda
  R.rect(0, CINTA, 250, CINTA + 6, hex('#2a2a30')); R.rect(0, CINTA + 7, 250, CINTA + 9, hex('#9a9aa8'));
  for (let x = 10; x <= 240; x += 40) { R.rect(x, CINTA + 10, x + 3, 160, hex('#4a4a56')); R.rect(x - 2, 158, x + 5, 160, hex('#3a3a46')); }
  // la prensa de etiquetas (x 56–100) y la empaquetadora (x 146–202), con sus luces
  R.rect(54, 72, 102, 90, hex('#3a6ad8')); R.rect(56, 74, 100, 88, hex('#4a7ae8')); R.rect(54, 72, 102, 73, hex('#7aa8f8')); R.rect(56, 90, 60, CINTA - 1, hex('#2a4a9a')); R.rect(96, 90, 100, CINTA - 1, hex('#2a4a9a'));
  for (let k = 0; k < 4; k++) R.rect(62 + k * 8, 78, 66 + k * 8, 82, hex('#2a4a9a'));
  R.rect(144, 78, 204, CINTA - 1, hex('#d8a020')); R.rect(146, 80, 202, CINTA - 1, hex('#e8b830')); R.rect(144, 78, 204, 79, hex('#f8d870'));
  for (let y = 80; y < CINTA; y += 6) R.linea(146, y, 202, y + 6 > CINTA ? CINTA : y + 6, hex('#c89818'));
  R.rect(158, 94, 190, CINTA - 1, hex('#1a1410'));   // la boca
  for (let x = 146; x <= 202; x += 8) R.rect(x, 80, x + 3, 82, (x / 8) % 2 ? hex('#141016') : hex('#f8d870'));
  // el palé del final, a la derecha
  R.rect(248, 156, 316, 162, hex('#a87a46')); R.rect(248, 156, 316, 156, hex('#c89a5a')); for (const x of [250, 280, 310]) R.rect(x, 162, x + 5, 166, hex('#7a5a30'));
};
const p1 = (t) => {
  capa('fabrica', fabrica);
  // el cielo por las ventanas altas: tramado, nubes y pájaros
  for (let k = 0; k < 6; k++) { const x0 = 8 + k * 44; R.recorte([x0 + 2, 24, x0 + 34, 42]); degr(x0 + 2, 24, x0 + 34, 42, [hex('#6a9ad8'), hex('#8ab8e8'), hex('#b8d8f0')]);
    nube(((t * 6 + k * 40) % 360) - 40 - k * 3, 30, 22, [hex('#ffffff'), hex('#dce8f4'), hex('#a8b8cc')]); pajaro(((t * 14 + 80) % 360) - 20, 34, t, k); R.recorte(null);
    R.rect(x0 + 18, 22, x0 + 18, 44, hex('#2a2e36')); R.rect(x0, 33, x0 + 36, 33, hex('#2a2e36')); }
  // las lámparas que cuelgan y se mecen
  for (const [x0, k] of [[60, 0], [160, 1], [240, 2]]) { const dx = Math.round(Math.sin(t * 1.3 + k) * 2); R.linea(x0, 18, x0 + dx, 30, hex('#2a2a30')); R.poligono([[x0 + dx - 7, 36], [x0 + dx + 7, 36], [x0 + dx + 3, 30], [x0 + dx - 3, 30]], hex('#3a4a3a')); R.rect(x0 + dx - 3, 37, x0 + dx + 3, 38, hex('#fff2b0')); }
  // el contador de producción: sube y pasa del millón en «millions»
  const n = t < MILL ? Math.floor(lerp(240000, 1000000, lin(t, 0, MILL)) / 7) * 7 : Math.floor(1000000 + (t - MILL) * 2400000 / 3) ;
  const cifra = String(Math.min(9999999, n));
  const ancho = cifra.length * 12 - 3; dig(cifra, 160 - (ancho >> 1), 55, 3, t > MILL && t < MILL + 0.8 && parp(t, 16) ? hex('#fff6c0') : hex('#f0a030'), hex('#5a2a0a'));
  // las cajas apiladas en el palé: el montón crece
  const cajas = Math.min(18, 3 + Math.floor(t * 3.2));
  for (let k = 0; k < cajas; k++) { const c = k % 6, f = Math.floor(k / 6); T.PIEZAS_AT.cajaCartucho(R, 256 + c * 10 + (f % 2) * 3, 155 - f * 13, { color: 'naranja', icono: 'foso' }); }
  // la cinta: cartuchos grises → con la etiqueta → cajas
  const off = (t * VEL) % 24;
  for (let x = -24 + off; x < 252; x += 24) { const X = Math.round(x);
    if (X < 150) T.PIEZAS_AT.cartucho(R, X + 6, CINTA, { color: X > 78 ? 'naranja' : 'gris', icono: X > 78 ? 'foso' : undefined });
    else if (X > 204) T.PIEZAS_AT.cajaCartucho(R, X + 6, CINTA, { color: 'naranja', icono: 'foso' }); }
  for (let x = Math.round(-off * 1); x < 252; x += 6) R.pset(x + 12, CINTA + 3, hex('#4a4a56'));
  for (let x = 4; x < 252; x += 12) { const an = t * 8 + x; R.pset(x + Math.round(Math.cos(an) * 2), CINTA + 8, hex('#e8e8f0')); }
  // la prensa baja y sube (estampa la etiqueta)
  const golpe = Math.abs(Math.sin(t * Math.PI * VEL / 24)), py = Math.round(90 + golpe * 14);
  R.rect(74, 90, 82, py, hex('#9a9aa8')); R.rect(70, py, 86, py + 4, hex('#5a5a66')); R.rect(70, py, 86, py, hex('#c8c8d0'));
  // la empaquetadora tapa la mitad de la cinta; su baliza gira y echa vapor
  R.rect(158, 94, 190, CINTA - 1, hex('#1a1410')); for (let x = 160; x < 190; x += 4) R.rect(x, 94, x + 1, 96 + ((x + Math.floor(t * 10)) % 3), hex('#3a3430'));
  const bal = Math.floor(t * 6) % 4; R.rect(172, 70, 178, 77, hex('#2a2a30')); R.rect(173, 71, 177, 76, bal < 2 ? hex('#f8a020') : hex('#a85a10')); if (bal === 0) { R.linea(168, 72, 160, 68, hex('#f8c060')); R.linea(182, 72, 190, 68, hex('#f8c060')); }
  for (let k = 0; k < 4; k++) { const v = (t * 0.8 + k / 4) % 1; R.disco(Math.round(198 + Math.sin(v * 5 + k) * 3), Math.round(76 - v * 26), 1 + Math.round(v * 3), mez(hex('#e8e8f0'), hex('#9a9aa8'), v)); }
  // el operario coge cajas del final de la cinta y las apila
  const ciclo = (t * 0.9) % 1, ox = Math.round(232 + Math.sin(ciclo * Math.PI) * 6);
  const op = R.actor(AT.operario, ox, 156, t, { dir: ciclo < 0.5 ? -1 : 1, sostiene: ciclo < 0.5 ? [ox - 2, 128 - Math.round(ciclo * 8)] : [ox + 18, 132] });
  T.PIEZAS_AT.cajaCartucho(R, op.mano[0], op.mano[1] + 6, { color: 'naranja', icono: 'foso' });
  // el ejecutivo: señala el marcador («sure of a hit»), levanta los brazos («millions»)
  const llega = lin(t, 0.1, SEGURO - 0.3), ex = Math.round(lerp(-16, 100, llega));
  R.actor(AT.ejecutivoAtari, ex, 162, t, { dir: 1, anda: llega > 0 && llega < 1, dedo: t > SEGURO - 0.2 && t < MILL - 0.15, brazos: t > MILL - 0.1 && t < MILL + 1.0, sonrisa: t > SEGURO, habla: t > SEGURO && t < EXITO + 0.4 && parp(t, 8) });
  if (t > EXITO - 0.1 && t < EXITO + 0.7) R.bocadillo(ex + 8, 130, { icono: '!' });
  // el supervisor con la tablilla junto a la prensa
  const sp = R.actor(AT.gerenteAlmacen, 40, 160, t, { dir: 1, sostiene: [56, 146], habla: t > CARTS && parp(t, 6) && t < CARTS + 0.6 });
  R.rect(sp.mano[0] - 3, sp.mano[1] - 7, sp.mano[0] + 4, sp.mano[1] + 2, K); R.rect(sp.mano[0] - 2, sp.mano[1] - 6, sp.mano[0] + 3, sp.mano[1] + 1, hex('#f0ecdc')); R.rect(sp.mano[0] - 1, sp.mano[1] - 7, sp.mano[0] + 2, sp.mano[1] - 6, hex('#9a9aa8'));
  // la carretilla elevadora cruza por delante con un palé de cajas en «cartridges»
  const cu = lin(t, CARTS - 1.0, CARTS + 1.6), cx = Math.round(lerp(340, -90, cu));
  if (cu > 0 && cu < 1) { const y = 176;
    for (let k = 0; k < 8; k++) T.PIEZAS_AT.cajaCartucho(R, cx + 6 + (k % 4) * 11, y - 8 - Math.floor(k / 4) * 13, { color: 'naranja', icono: 'foso' });
    R.rect(cx, y - 7, cx + 46, y - 5, hex('#a87a46')); R.rect(cx + 46, y - 34, cx + 49, y - 2, hex('#3a3a40'));
    R.rect(cx + 48, y - 26, cx + 84, y - 4, hex('#e8b020')); R.rect(cx + 48, y - 26, cx + 84, y - 25, hex('#f8d870')); R.rect(cx + 60, y - 42, cx + 62, y - 26, hex('#2a2a30')); R.rect(cx + 80, y - 42, cx + 82, y - 26, hex('#2a2a30')); R.rect(cx + 58, y - 43, cx + 84, y - 41, hex('#2a2a30'));
    R.actor(AT.camionero2 ?? AT.camionero, cx + 62, y - 6, t, { dir: -1 });
    R.disco(cx + 56, y - 2, 4, K); R.disco(cx + 56, y - 2, 2, hex('#6a6a70')); R.disco(cx + 78, y - 2, 4, K); R.disco(cx + 78, y - 2, 2, hex('#6a6a70'));
    if (parp(t, 9)) R.rect(cx + 70, y - 46, cx + 73, y - 44, hex('#f8a020')); }
};

// ── 2 · inserto: el mostrador y la caja registradora ────────────────────────────────────────────────────────────
const mostrador = () => {
  // la tienda desenfocada detrás: estanterías con cajas de colores, guirnalda y luz
  degr(0, 0, 319, 96, [hex('#e8dcc4'), hex('#e0d0b4'), hex('#d4c0a0')]);
  for (const [x0, x1] of [[0, 120], [140, 268]]) for (let f = 0; f < 4; f++) { const y = 18 + f * 20; R.rect(x0, y + 14, x1, y + 16, hex('#9a7a5a'));
    for (let x = x0 + 2; x < x1 - 6; x += 9) { const c = [hex('#e8a0a0'), hex('#a0b8e8'), hex('#e8d090'), hex('#b0d8a8'), hex('#d0a8e0')][Math.floor(hh(x, f, 3) * 5)]; for (let y2 = y + 2; y2 < y + 14; y2++) for (let x2 = x; x2 < x + 7; x2++) if ((x2 + y2) % 2 || y2 > y + 4) R.pset(x2, y2, mez(c, hex('#e0d0b4'), 0.3)); } }
  // la esquina de Atom: pared lisa clara
  R.rect(272, 0, 319, 48, hex('#ece2cc'));
  // el mostrador: madera con vetas, el canto y la encimera
  for (let y = 96; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 100 ? hex('#8a5a34') : (Math.sin(x * 0.08 + Math.sin(y * 0.3) * 2) > 0.7 ? hex('#a8744a') : hh(x >> 2, y, 3) < 0.1 ? hex('#9a6a40') : hex('#b8845a')));
  R.rect(0, 96, 319, 97, hex('#d8a878'));
  // la caja registradora: cuerpo de acero, teclas de colores, el visor y el cajón
  R.rect(166, 40, 274, 132, K); R.rect(168, 42, 272, 130, hex('#7a7a86')); R.rect(168, 42, 272, 44, hex('#a8a8b4')); R.rect(270, 44, 272, 130, hex('#5a5a66'));
  R.rect(176, 48, 262, 70, hex('#2a2a30')); R.rect(178, 50, 260, 68, hex('#0c0a10'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) { const x = 178 + i * 12, y = 78 + j * 10; R.rect(x, y, x + 9, y + 7, K); R.rect(x + 1, y + 1, x + 8, y + 5, [hex('#e8e4d8'), hex('#e8e4d8'), hex('#f0c040'), hex('#e85a4a')][i > 5 ? 3 : j === 3 ? 2 : 0]); R.rect(x + 1, y + 6, x + 8, y + 6, hex('#8a8478')); }
  R.rect(262, 76, 268, 112, hex('#3a3a40')); R.disco(265, 74, 3, hex('#d83a3a'));   // la manivela
  R.rect(160, 118, 280, 124, hex('#5a5a66'));
  // en el mostrador: el tarro de caramelos, una campanita, un arbolito y el rollo de papel
  R.rect(28, 66, 52, 96, hex('#d8e8f0')); R.rect(30, 68, 50, 94, hex('#c0d8e8')); for (let k = 0; k < 14; k++) R.disco(33 + (k * 7) % 16, 90 - Math.floor(k / 3) * 5, 2, [hex('#e84a4a'), hex('#f0d040'), hex('#4ab84a'), hex('#4a8ae8')][k % 4]); R.rect(28, 62, 52, 66, hex('#d83a3a'));
  R.poligono([[70, 96], [84, 96], [77, 72]], hex('#2a7a3a')); R.poligono([[72, 90], [82, 90], [77, 78]], hex('#3a9a4a')); R.rect(75, 96, 79, 98, hex('#6a3e1c'));
  R.disco(110, 92, 5, hex('#d8a020')); R.rect(105, 92, 115, 96, hex('#d8a020')); R.rect(109, 85, 111, 87, hex('#8a6a10'));
  // cerca: la bolsa de papel con asas, monedas sueltas, el bolígrafo, el taco de tickets y la etiqueta con el $
  R.poligono([[12, 178], [52, 178], [48, 128], [16, 128]], hex('#6a4a24')); R.poligono([[14, 177], [50, 177], [46, 130], [18, 130]], hex('#c8a06a')); R.rect(18, 130, 46, 133, hex('#a8844a')); R.linea(24, 130, 28, 120, hex('#6a4a24')); R.linea(28, 120, 32, 130, hex('#6a4a24')); R.linea(34, 130, 38, 120, hex('#6a4a24')); R.linea(38, 120, 42, 130, hex('#6a4a24'));
  for (const [x, y] of [[150, 168], [158, 172], [166, 166], [290, 160], [298, 166]]) { R.disco(x, y, 3, hex('#8a7a3a')); R.disco(x, y, 2, hex('#d8c060')); R.pset(x - 1, y - 1, hex('#fff2b0')); }
  R.linea(228, 160, 262, 150, K); R.linea(228, 161, 262, 151, hex('#3a6ad8')); R.rect(226, 159, 229, 162, hex('#c8c8d0'));
  R.rect(276, 136, 312, 156, hex('#8a8478')); R.rect(277, 137, 311, 155, hex('#f8f6ee')); for (let y = 140; y < 154; y += 3) R.rect(280, y, 306 - (y % 4) * 2, y, hex('#b8b4a8'));
  R.poligono([[58, 150], [84, 146], [86, 160], [60, 164]], K); R.poligono([[60, 151], [83, 147], [84, 159], [61, 162]], hex('#f8e8a0')); R.disco(64, 155, 1, K); R.numero('$', 76, 159, { color: hex('#3a8a3a'), centro: true, sombra: false });
};
const VENTAS3 = [VENTAS + 0.1, VENTAS + 1.35, MEDIO - 0.3];   // cada venta: la caja pasa de una mano a otra
const p2 = (t) => {
  capa('mostrador', mostrador);
  // la guirnalda de luces que parpadean
  for (let x = 4; x < 268; x += 3) { const y = 20 + Math.round(Math.sin(x * 0.05) * 3); R.pset(x, y, hex('#2a6a2a')); if (x % 12 === 4) R.disco(x, y + 2, 1, [hex('#f04a4a'), hex('#f0d040'), hex('#4a8af0'), hex('#4ac84a')][((x / 12 | 0) + Math.floor(t * 3)) % 4]); }
  // gente que pasa por detrás, borrosa
  for (const [v, d, c] of [[0.35, 1, '#c8a0a0'], [0.22, -1, '#a0a8c8']]) { const x = Math.round(d > 0 ? ((t * 40 * v) % 400) - 40 : 360 - ((t * 40 * v + 150) % 400)); for (let y = 30; y < 96; y++) for (let xx = x - 10; xx < x + 10; xx++) { const cab = Math.hypot(xx - x, y - 40) < 7, cu = y > 48 && Math.abs(xx - x) < 10; if ((cab || cu) && (xx + y) % 2 === 0) R.pset(xx, y, mez(R.pget(xx, y), hex(c), 0.6)); } }
  // el visor: las copias vendidas, que llegan a 1500000 en «a million and a half»
  const u = lin(t, P2, MEDIO + 0.6), n = u < 1 ? Math.floor(lerp(420000, 1500000, u * u * (3 - 2 * u)) / 10) * 10 : 1500000 + Math.floor((t - MEDIO - 0.6) * 37);
  const s = String(n), w = s.length * 8 - 2; dig(s, 219 - (w >> 1), 54, 2, t > MEDIO + 0.5 && t < COPIAS + 0.6 && parp(t, 14) ? hex('#ffffff') : hex('#5af07a'));
  // cada venta: el cajón sale con monedas y billetes; el ticket se alarga
  let caj = 0; for (const v of VENTAS3) { const d = t - (v + 0.6); if (d > 0 && d < 0.7) caj = Math.max(caj, Math.sin(Math.min(1, d / 0.7) * Math.PI)); }
  const cy = Math.round(124 + caj * 10); R.rect(162, cy, 278, cy + 10, K); R.rect(164, cy + 1, 276, cy + 9, hex('#6a6a76')); R.rect(214, cy + 4, 226, cy + 6, hex('#3a3a40'));
  if (caj > 0.2) for (let k = 0; k < 6; k++) R.disco(176 + k * 6, cy + 2, 1, k % 2 ? hex('#d8c060') : hex('#c8c8d0'));
  const tk = Math.min(30, Math.round(lin(t, P2, FIN) * 30 + VENTAS3.filter((v) => t > v + 0.6).length * 4)); R.rect(198, 40 - tk, 216, 41, hex('#f8f6ee')); for (let j = 40 - tk + 2; j < 40; j += 3) R.rect(201, j, 212 - (j % 4), j, hex('#9a9890'));
  // detrás del mostrador, desenfocados: el dependiente (camisa blanca) y el cliente de cada venta, que llega y se va
  const borroso = (x, col, alto = 0) => { for (let y = 14 + alto; y < 96; y++) for (let xx = x - 18; xx <= x + 18; xx++) { const cab = Math.hypot(xx - x, y - 30 - alto) < 11, cu = y > 42 + alto && Math.abs(xx - x) < 17 - (y < 48 + alto ? 48 + alto - y : 0); if ((cab || cu) && ((xx + y) % 2 === 0 || cab) && !(xx > 160 && y > 38)) R.pset(xx, y, mez(R.pget(xx, y), hex(col), 0.82)); } };
  borroso(118, '#f0ece4', 4);
  const vi = VENTAS3.findIndex((v) => t >= v - 0.5 && t < v + 1.2);
  if (vi >= 0) { const v = VENTAS3[vi], cx = Math.round(lerp(-30, 40, lin(t, v - 0.5, v)) + lerp(0, -80, lin(t, v + 0.8, v + 1.2))); borroso(cx, ['#c86a6a', '#6a8ac8', '#c8a050'][vi], 10); }
  // el montón de cajas del dependiente, en su lado del mostrador
  for (let k = 0; k < 3; k++) T.PIEZAS_AT.cajaCartucho(R, 140, 100 - k * 1, { color: 'naranja', icono: 'foso', s: 1 });
  // cada venta: la mano del dependiente asoma por el canto con la caja, la empuja hacia aquí y la mano del niño
  // (jersey azul) la coge desde abajo y se la lleva
  if (vi >= 0) { const v = VENTAS3[vi], a1 = lin(t, v - 0.3, v + 0.05), a2 = lin(t, v + 0.1, v + 0.5), a3 = lin(t, v + 0.6, v + 1.1);
    const bx = 104, by = Math.round(a3 > 0 ? lerp(158, 200, a3) : a2 > 0 ? lerp(108, 158, a2 * a2 * (3 - 2 * a2)) : lerp(98, 108, a1));
    if (by < 196) T.PIEZAS_AT.cajaCartucho(R, bx, by, { color: 'naranja', icono: 'foso', s: 2 });
    if (a2 < 0.6) { const wy = Math.round(a2 > 0 ? lerp(by - 12, 92, a2 / 0.6) : by - 12); T.brazo(R, bx + 4, 80, bx + 2, wy, '#e8e4d8', 1, { sombra: false }); }
    if (t > v + 0.45) { const wy = a3 > 0 ? by - 2 : Math.round(lerp(196, 164, lin(t, v + 0.45, v + 0.6))); T.brazo(R, bx - 2, 200, bx - 6, wy, '#3a6ad8', 1, { sombra: false }); } }
  // un brillo en la cifra al llegar al millón y medio
  if (t > MEDIO + 0.5 && t < COPIAS + 0.7) for (let r = 2; r < 6; r++) { const c = hex('#fff6c0'); R.pset(258 + r, 50, c); R.pset(258 - r, 50, c); R.pset(258, 50 + r, c); R.pset(258, 50 - r, c); }
};

// ── 3 · el salón en Navidad: el regalo y los fosos ──────────────────────────────────────────────────────────────
const VA = NAVIDAD + 0.35, ENCIENDE = CONFUSO - 0.55;
const arbol = (t) => {
  const x = 262, base = 152;
  R.rect(x - 6, base - 6, x + 6, base, hex('#a83a2a')); R.rect(x - 6, base - 6, x + 6, base - 5, hex('#d85a3a'));
  for (let k = 0; k < 4; k++) { const y0 = base - 14 - k * 12, w = 18 - k * 4; R.poligono([[x - w, y0 + 4], [x + w, y0 + 4], [x, y0 - 12]], hex('#1a4a2a')); R.poligono([[x - w + 2, y0 + 2], [x + w - 2, y0 + 2], [x, y0 - 11]], hex('#2a6a3a'));
    for (let i = -w + 4; i < w - 3; i += 3) R.pset(x + i, y0 + 1 - (i % 2), hex('#3a8a4a')); }
  // las luces de colores que se encienden por turnos y el espumillón
  for (let k = 0; k < 16; k++) { const lx = x - 14 + ((k * 7) % 28), ly = base - 18 - Math.floor(k / 3) * 9; if (Math.abs(lx - x) > 16 - Math.floor(k / 3) * 3) continue; R.pset(lx, ly, (k + Math.floor(t * 3)) % 3 ? [hex('#f04a4a'), hex('#f0d040'), hex('#4a8af0'), hex('#f07ad8')][k % 4] : hex('#3a2a20')); }
  for (let i = -12; i <= 12; i++) R.pset(x + i, base - 26 + Math.round(i * i / 40), hex('#e8e0c0'));
  const st = parp(t, 4); R.poligono([[x - 4, base - 64], [x + 4, base - 64], [x, base - 71]], st ? hex('#fff2a0') : hex('#f0c040')); R.poligono([[x - 4, base - 68], [x + 4, base - 68], [x, base - 61]], st ? hex('#fff2a0') : hex('#f0c040'));
  // regalos que quedan bajo el árbol
  for (const [gx, w, hgt, c, c2] of [[244, 10, 8, '#3a6ad8', '#f0d040'], [276, 12, 10, '#d83a3a', '#ffffff'], [286, 8, 6, '#3a9a4a', '#f07ad8']]) { R.rect(gx - 1, base - hgt - 1, gx + w + 1, base, K); R.rect(gx, base - hgt, gx + w, base, hex(c)); R.rect(gx + (w >> 1), base - hgt, gx + (w >> 1) + 1, base, hex(c2)); R.rect(gx, base - (hgt >> 1), gx + w, base - (hgt >> 1), hex(c2)); }
};
const pantallaTele = (t) => (R2, t2, rect) => {
  if (t < ENCIENDE) { juego(rect, t, { apagada: true }); return; }
  const on = lin(t, ENCIENDE, ENCIENDE + 0.25);
  let st = { s: 1, hud: 5, suelo: 15, pant: 2, piezas: 0, r: 3, marco: hex('#1a1410'), mi: 6, pose: 'anda' };
  const W = rect[2] - rect[0] + 1, fc = Math.round(0.56 * W);
  if (t < CAE) st.mi = lerp(3, fc - 4, lin(t, ENCIENDE + 0.3, CAE - 0.2));
  else if (t < SALE) { const u = lin(t, CAE, CAE + 0.5); st.mi = fc - 1; st.mj = Math.round(14 + u * 12); st.pose = u < 1 ? 'cae' : 'quieto'; }
  else if (t < OTRA) { const u = lin(t, SALE, SALE + 0.6); st.mi = u < 1 ? fc - 6 : lerp(fc - 7, fc - 1, lin(t, SALE + 0.6, OTRA)); st.mj = Math.round(26 - u * 12); st.pose = u < 1 ? 'sube' : 'anda'; }
  else { const u = lin(t, OTRA, OTRA + 0.5); st.mi = fc - 1; st.mj = Math.round(14 + u * 12); st.pose = u < 1 ? 'cae' : 'quieto'; }
  juego(rect, t, st);
  if (on < 1) { const [x0, y0, x1, y1] = rect, cyy = (y0 + y1) >> 1, hh2 = Math.round((y1 - y0) * on / 2); for (let y = y0; y <= y1; y++) if (Math.abs(y - cyy) > hh2) R.rect(x0, y, x1, y, hex('#0a0a10')); R.rect(x0, cyy, x1, cyy, BL); }
};
const p3 = (t) => {
  T.atari(R, t, { encuadre: 'salon77', pantalla: pantallaTele(t) });
  // la guirnalda de luces en la barra de la cortina y una corona en la pared
  for (let x = 158; x <= 234; x += 2) { const y = 24 + Math.round(Math.sin((x - 158) / 76 * Math.PI) * 4); R.pset(x, y, hex('#2a6a2a')); if (x % 8 === 0) R.pset(x, y + 1, [hex('#f04a4a'), hex('#f0d040'), hex('#4a8af0')][((x >> 3) + Math.floor(t * 2.5)) % 3]); }
  R.disco(132, 60, 7, hex('#2a6a3a')); R.disco(132, 60, 4, hex('#c8a878')); for (let k = 0; k < 8; k++) { const an = k / 8 * 6.28; R.pset(Math.round(132 + Math.cos(an) * 6), Math.round(60 + Math.sin(an) * 6), k % 2 ? hex('#d83a3a') : hex('#3a8a4a')); } R.rect(130, 66, 134, 68, hex('#d83a3a'));
  arbol(t);
  // el perro bajo el árbol: mueve la cola, y ladra cuando el niño se enfada
  const ladra = t > OTRA + 0.35 && t < OTRA + 1.2, dx = 140, dy = 156, cola = Math.floor(t * (ladra ? 12 : 5)) % 2;
  R.rect(dx, dy - 6, dx + 12, dy - 2, K); R.rect(dx + 1, dy - 5, dx + 11, dy - 3, hex('#c8904a')); R.rect(dx - 4, dy - 10 - (ladra ? 1 : 0), dx + 2, dy - 4, K); R.rect(dx - 3, dy - 9 - (ladra ? 1 : 0), dx + 1, dy - 5, hex('#c8904a')); R.pset(dx - 2, dy - 8 - (ladra ? 1 : 0), K); R.rect(dx - 1, dy - 11 - (ladra ? 1 : 0), dx, dy - 9, hex('#8a5a2a'));
  R.rect(dx + 12, dy - 7 - cola, dx + 14, dy - 6 - cola, hex('#c8904a')); for (const lx of [dx + 1, dx + 10]) R.rect(lx, dy - 2, lx + 1, dy, hex('#8a5a2a'));
  if (ladra && parp(t, 10)) { R.linea(dx - 6, dy - 9, dx - 9, dy - 11, BL); R.linea(dx - 6, dy - 7, dx - 10, dy - 7, BL); }
  // los padres, junto al sofá, con sus tazas; la madre hace la foto en «Christmas»
  const foto = t > NAVIDAD - 0.4 && t < NAVIDAD + 0.6;
  const pa = R.actor(AT.padre77, 168, 154, t, { dir: -1, sostiene: t < OTRA + 0.2 ? true : undefined, dedo: t > OTRA + 0.25, triste: t > OTRA + 0.2, sonrisa: t > ABRE && t < CAE, sorpresa: t > CAE && t < CAE + 0.5 });
  if (t < OTRA + 0.2) { const [mx, my] = pa.mano; R.rect(mx - 2, my - 4, mx + 2, my, K); R.rect(mx - 1, my - 3, mx + 1, my - 1, hex('#e8e4d8')); }
  const ma = R.actor(AT.madre77, 194, 154, t, { dir: -1, sostiene: foto ? [184, 132] : true, sonrisa: t < CAE, sorpresa: t > CAE && t < CAE + 0.5, habla: t > SALE && t < OTRA && parp(t, 8) });
  if (foto) { const [mx, my] = ma.mano; R.rect(mx - 5, my - 4, mx + 3, my + 1, K); R.rect(mx - 4, my - 3, mx + 2, my, hex('#3a3a40')); R.disco(mx - 1, my - 1, 1, hex('#8ab8e8')); if (t > NAVIDAD && t < NAVIDAD + 0.15) for (let k = 0; k < 8; k++) { const an = k / 8 * 6.28; R.linea(mx - 4, my - 4, Math.round(mx - 4 + Math.cos(an) * 9), Math.round(my - 4 + Math.sin(an) * 9), hex('#fffbe0')); } }
  else { const [mx, my] = ma.mano; R.rect(mx - 2, my - 4, mx + 2, my, K); R.rect(mx - 1, my - 3, mx + 1, my - 1, hex('#d84a3a')); }
  // el niño: el regalo, el papel roto, el salto, corre a la tele con el mando
  const corre = lin(t, VA, ENCIENDE - 0.1), nx = Math.round(lerp(214, 94, corre));
  const abierto = t > ABRE, juega = t > ENCIENDE - 0.1;
  const salta = t > NAVIDAD - 0.15 && t < NAVIDAD + 0.35 ? Math.round(Math.sin(lin(t, NAVIDAD - 0.15, NAVIDAD + 0.35) * Math.PI) * 6) : 0;
  const enfado = t > OTRA + 0.2;
  const o = { dir: juega ? -1 : corre > 0 ? -1 : 1, anda: corre > 0 && corre < 1, salto: salta, sonrisa: (abierto && t < CONFUSO) || (t > SALE + 0.2 && t < OTRA), sorpresa: (t > CAE && t < CAE + 0.6) || t < ABRE && t > ABRE - 0.3, enfado,
    brazos: enfado && t < OTRA + 1.0, sostiene: enfado && t < OTRA + 1.0 ? undefined : salta ? [nx + 16, 116] : juega ? [nx - 4, 140] : [nx + 15, 142] };
  const ni = R.actor(AT.nino77, nx, 154, t, o);
  if (!(enfado && t < OTRA + 1.0)) { const [mx, my] = ni.mano;
    if (!abierto) { const sh = Math.round(Math.sin(t * 30)); R.rect(mx - 6 + sh, my - 9, mx + 6 + sh, my + 1, K); R.rect(mx - 5 + sh, my - 8, mx + 5 + sh, my, hex('#d83a3a')); R.rect(mx + sh, my - 8, mx + 1 + sh, my, hex('#f0d040')); R.rect(mx - 5 + sh, my - 5, mx + 5 + sh, my - 4, hex('#f0d040')); R.rect(mx - 2 + sh, my - 11, mx + 3 + sh, my - 9, hex('#f0d040')); }
    else if (!juega) T.PIEZAS_AT.cajaCartucho(R, mx, my + 4, { color: 'naranja', icono: 'foso' });
    else { T.PIEZAS_AT.joystick(R, mx, my + 7, { inclina: Math.floor(t * 4) % 2 ? -1 : 1, pulsado: parp(t, 9) }); R.linea(mx, my + 7, 110, 128, K); } }
  if (enfado && t > OTRA + 0.3) T.PIEZAS_AT.joystick(R, nx + 20, 156, { inclina: 1 });
  // el papel del regalo: estalla en «opened» y queda en la moqueta
  const pd = t - ABRE; if (pd > 0) for (let k = 0; k < 14; k++) { const u = Math.min(1, pd / 0.7), an = -Math.PI * (0.15 + 0.7 * hh(k, 1, 3)), v = 30 + hh(k, 2, 3) * 30;
    const x = Math.round(229 + Math.cos(an) * v * u * 0.8), y = Math.round(140 + Math.sin(an) * v * u + u * u * 30); const yy = Math.min(155 + (k % 3), y); R.rect(x, yy, x + 2, yy + 1, k % 3 ? hex('#d83a3a') : hex('#f0d040')); }
  if (t > CONFUSO - 0.1 && t < CAE - 0.2) R.bocadillo(nx + 7, 124, { icono: '?' });
  if (t > OTRA + 0.25 && t < OTRA + 1.0) R.bocadillo(nx + 7, 120, { icono: '!' });
  T.atariDelante(R, t, { encuadre: 'salon77' });
};

// ── 4 · la juguetería: las devoluciones ────────────────────────────────────────────────────────────────────────
const pila = (n) => { for (let k = 0; k < n; k++) T.PIEZAS_AT.cajaCartucho(R, 294 + (k % 2) * 13, 112 - Math.floor(k / 2) * 12, { color: 'naranja', icono: 'foso' }); };
const DEJA1 = DEVUEL, GUARDA1 = DEVUEL + 0.9, DEJA2 = FIN - 1.85, GUARDA2 = FIN - 0.95;
const p4 = (t) => {
  T.tiendas(R, t, { encuadre: 'jugueteria82', devoluciones: true });
  // el montón de devoluciones crece encima del que pinta el decorado
  pila((t > GUARDA1 ? 1 : 0) + (t > GUARDA2 ? 1 : 0));
  // el dependiente detrás del mostrador: recoge cada caja y la pone en el montón
  const recoge1 = t > DEJA1 + 0.3 && t < GUARDA1, recoge2 = t > DEJA2 + 0.3 && t < GUARDA2;
  const gira = (t > GUARDA1 - 0.4 && t < GUARDA1) || (t > GUARDA2 - 0.4 && t < GUARDA2);
  const de = R.actor(AT.dependiente, 262, 150, t, { dir: gira ? 1 : -1, triste: t > DEJA1, sostiene: recoge1 || recoge2 ? (gira ? [288, 112] : [252, 136]) : undefined, habla: t > P4 + 0.3 && t < DEJA1 - 0.2 && parp(t, 7) });
  if ((recoge1 || recoge2) && t > (recoge1 ? DEJA1 : DEJA2) + 0.45) T.PIEZAS_AT.cajaCartucho(R, de.mano[0], de.mano[1] + 6, { color: 'naranja', icono: 'foso' });
  // la caja apoyada en el mostrador hasta que la recoge
  const enMostrador = (t > DEJA1 && t < DEJA1 + 0.45) || (t > DEJA2 && t < DEJA2 + 0.45);
  // el padre: entra con la caja, la deja en el mostrador en «returns» (enfadado) y se va
  const e1 = lin(t, P4, DEJA1 - 0.4), s1 = lin(t, DEJA1 + 0.9, DEJA1 + 3.2), px = Math.round(s1 > 0 ? lerp(222, -20, s1) : lerp(-20, 222, e1));
  const pa = R.actor(AT.comprador, px, 158, t, { dir: s1 > 0 ? -1 : 1, anda: (e1 > 0 && e1 < 1) || (s1 > 0 && s1 < 1), enfado: t > DEJA1 - 0.6 && t < DEJA1 + 0.9, habla: t > DEJA1 - 0.5 && t < DEJA1 + 0.6 && parp(t, 9), sostiene: t < DEJA1 ? (e1 >= 1 ? [244, 138] : true) : undefined });
  if (t < DEJA1) T.PIEZAS_AT.cajaCartucho(R, pa.mano[0], pa.mano[1] + 6, { color: 'naranja', icono: 'foso' });
  // la madre y su niño en pijama, con otra caja, esperan y luego la devuelven
  const e2 = lin(t, DEJA1 - 0.1, DEJA1 + 1.2), avanza = lin(t, DEJA2 - 0.75, DEJA2 - 0.15), mx = Math.round(avanza > 0 ? lerp(178, 222, avanza) : lerp(-20, 178, e2));
  const mo = R.actor(AT.espectadora, mx, 158, t, { dir: 1, anda: (e2 > 0 && e2 < 1) || (avanza > 0 && avanza < 1), triste: t > DEJA2 - 0.3, sostiene: t < DEJA2 ? (avanza >= 1 ? [244, 138] : true) : undefined, habla: t > DEJA2 - 0.2 && t < DEJA2 + 0.6 && parp(t, 8) });
  if (t < DEJA2) T.PIEZAS_AT.cajaCartucho(R, mo.mano[0], mo.mano[1] + 6, { color: 'naranja', icono: 'foso' });
  R.actor(AT.ninoNavidad, mx - 16, 160, t, { dir: 1, anda: (e2 > 0 && e2 < 1) || (avanza > 0 && avanza < 1), triste: true });
  T.tiendasDelante(R, t, { encuadre: 'jugueteria82' });
  if (enMostrador) T.PIEZAS_AT.cajaCartucho(R, 250, 142, { color: 'naranja', icono: 'foso' });
  // el sello de devolución que pone el dependiente sobre la caja
  if ((t > DEJA1 + 0.15 && t < DEJA1 + 0.45) || (t > DEJA2 + 0.15 && t < DEJA2 + 0.45)) R.bocadillo(268, 116, { icono: 'X' });
};
const efectos = [[0.4, 'maquina'], [SEGURO, 'pop'], [MILL, 'campana'], [CARTS - 0.6, 'motor'],
  [VENTAS3[0] + 0.6, 'campana'], [VENTAS3[1] + 0.6, 'campana'], [VENTAS3[2] + 0.6, 'campana'], [MEDIO + 0.5, 'brillo'],
  [ABRE, 'papel'], [NAVIDAD, 'flash'], [ENCIENDE, 'interruptor'], [CONFUSO, 'pop'], [CAE + 0.1, 'boing'], [SALE + 0.1, 'bip'], [OTRA + 0.1, 'boing'], [OTRA + 0.4, 'guau'],
  [DEJA1, 'toc'], [DEJA1 + 0.2, 'sello'], [GUARDA1, 'toc'], [DEJA2, 'toc'], [GUARDA2, 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1982 });
''')

E['at-defensa'] = ('La defensa', '''// AT-DEFENSA (frase 9), hoy (2026). Cuatro planos, todos en la charla de Warshaw (fondos locales):
// 1. (0–5,9 s) el escenario: Warshaw de hoy, con barba, entra con el micro y saluda; en «humor» el público se ríe; en
//    «fastest game» señala la pantalla, donde un cartucho pasa volando con el cronómetro; en «history» sale una medalla
//    con el 1 y el público aplaude. Corta en «nobody».
// 2. (5,9–10,1) la sala desde el fondo: filas de cabezas y móviles, Warshaw pequeño en el escenario; la pantalla pone
//    las cinco semanas que se llenan una a una («five weeks») y la estrella del éxito tachada; risas. En la fila de
//    delante, dos aficionados con gorra se miran en «some fans». Corta en «fans».
// 3. (10,1–14,4) la pantalla de cerca: a la izquierda el código (filas de cifras) donde un número cambia en «tweaked
//    the code»; a la derecha el juego: Bip pisa el borde del foso y ya no se cae («harder to fall»): visto bueno; el
//    puntero rojo de Warshaw lo señala y los dos aficionados de delante asienten. Corta en «discovered».
// 4. (14,4–20,1) la mesa del escenario: Warshaw juega con la tele de tubo al juego retocado: Bip salta por encima de
//    los fosos («change», «game», «better»), coge las tres piezas y la casita se enciende en «remembered»; el público
//    de delante aplaude con las manos en alto.''', AYUDAS + r'''
const d = (f) => en('defensa', f);
const P2 = d(0.3009), P3 = d(0.54), P4 = d(0.7818), FIN = E.duracion;
const DEFIENDE = d(0.0596), HUMOR = d(0.1114), RAPIDO = d(0.1957), HISTORIA = d(0.2508);
const EXITO = d(0.3701), CINCO = d(0.3937), SEMANAS = d(0.4106), ANOS = d(0.4623), FANS = d(0.5197);
const RETOCA = d(0.541), CODIGO = d(0.5737), DIFICIL = d(0.6175), FOSOS = d(0.6884), DESCUBRE = d(0.739);
const CAMBIO = d(0.8065), JUEGO = d(0.8504), MEJOR = d(0.9021), RECUERDA = d(0.9561);

// piezas del escenario: el telón de terciopelo con pliegues, la tarima con vetas, las cabezas del público
const telon = (x0, y0, x1, y1, c = ['#3a1a5a', '#5a2a7a', '#7a3a9a']) => { const C3 = c.map(hex); for (let x = x0; x <= x1; x++) { const f = Math.sin(x * 0.45), i = f > 0.55 ? 2 : f > -0.35 ? 1 : 0; for (let y = y0; y <= y1; y++) R.pset(x, y, (y + x) % 7 === 0 && i === 1 ? C3[2] : C3[i]); } };
const tarima = (y0, y1) => { for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(y / 5) % 2, junta = y % 5 === 0 || (x + tabla * 37) % 64 === 0; R.pset(x, y, junta ? hex('#3a2414') : Math.sin(x * 0.11 + y) > 0.75 ? hex('#8a5a32') : hh(x >> 2, y, 9) < 0.15 ? hex('#6a4224') : hex('#7a4c2a')); } };
const PELO = ['#2a1c14', '#6a3a1c', '#c8902a', '#1a1a1e', '#8a8a96', '#a83a1a', '#4a2a14'].map(hex), GORRA = ['#d83a3a', '#3a6ad8', '#2a8a4a', '#e8b020'].map(hex), ROPA = ['#3a4a6a', '#6a3a4a', '#3a6a5a', '#5a5a66', '#8a6a3a'].map(hex);
// una cabeza del público vista por detrás (cx, base de los hombros), con su gorra o su móvil; o.rie: rebota; o.aplaude
const cabeza = (cx, y, k, t, o = {}) => {
  const bot = o.rie ? Math.round(Math.abs(Math.sin(t * 9 + k)) * 1.5) : 0, yy = y - bot, pelo = PELO[k % PELO.length], ropa = ROPA[(k * 3) % ROPA.length];
  R.rect(cx - 8, yy - 5, cx + 8, y + 6, K); R.rect(cx - 7, yy - 4, cx + 7, y + 6, ropa); R.rect(cx - 7, yy - 4, cx + 7, yy - 3, mez(ropa, BL, 0.25));
  R.disco(cx, yy - 10, 6, K); R.disco(cx, yy - 10, 5, pelo); R.pset(cx - 2, yy - 13, mez(pelo, BL, 0.3)); R.pset(cx - 6, yy - 9, hex('#e8b088')); R.pset(cx + 6, yy - 9, hex('#e8b088'));
  if (k % 4 === 1) { R.rect(cx - 6, yy - 16, cx + 5, yy - 12, GORRA[k % 4]); R.rect(cx - 6, yy - 16, cx + 5, yy - 16, mez(GORRA[k % 4], BL, 0.3)); }
  if (o.movil) { const mx = cx + 6, my = yy - 22; R.rect(mx - 1, my + 4, mx + 1, yy - 6, ropa); R.rect(mx - 3, my - 3, mx + 3, my + 5, K); R.rect(mx - 2, my - 2, mx + 2, my + 4, parp(t + k, 3) ? hex('#a8d8f0') : hex('#c8e8ff')); }
  if (o.aplaude) { const p = Math.floor(t * 8 + k) % 2; for (const s of [-1, 1]) { const hx = cx + s * (4 - p * 2), hy = yy - 18; R.rect(hx - 1, hy + 2, hx + 1, yy - 4, ropa); R.disco(hx, hy, 2, K); R.disco(hx, hy, 1, hex('#f6c290')); } }
};
const fila = (y, x0, paso, n, k0, t, o = {}) => { for (let i = 0; i < n; i++) { const k = k0 + i; cabeza(x0 + i * paso + ((k * 5) % 3), y + ((k * 7) % 3), k, t, { rie: o.rie, aplaude: o.aplaude && (k % 3 !== 0), movil: o.movil && k % 5 === 2 }); } };
// los focos de colores del techo con su haz y las motas
const foco = (x, y, col, t, ang, largo = 120) => { R.rect(x - 4, y - 4, x + 4, y + 3, K); R.rect(x - 3, y - 3, x + 3, y + 2, hex('#2a2a30')); R.rect(x - 2, y + 2, x + 2, y + 3, hex(col));
  for (let i = 4; i < largo; i++) { const w = 1 + i * 0.16, cx = x + Math.sin(ang) * i, cy = y + Math.cos(ang) * i; for (let j = -w; j <= w; j++) { const px = Math.round(cx + j * Math.cos(ang)), py = Math.round(cy - j * Math.sin(ang)); if ((px + py) % 3 === 0 && !(px > 272 && py < 48) && !(px > 16 && px < 174 && py < 16)) R.pset(px, py, mez(R.pget(px, py), hex(col), 0.3)); } } };

// ── 1 · el escenario ───────────────────────────────────────────────────────────────────────────────────────────
const escenario = () => {
  R.rect(0, 0, 319, 179, hex('#0c0a14'));
  // techo oscuro con la parrilla de focos (la esquina de Atom, lisa)
  for (let y = 0; y < 20; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hex('#100c1a'));
  R.rect(0, 20, 268, 22, hex('#4a4a56')); for (let x = 0; x < 268; x += 8) R.linea(x, 20, x + 8, 22, hex('#2a2a34'));
  // el telón del fondo y los laterales con pliegues
  telon(0, 23, 319, 132);
  telon(0, 23, 40, 150, ['#5a0a1a', '#8a1a2a', '#b02a3a']); telon(280, 50, 319, 150, ['#5a0a1a', '#8a1a2a', '#b02a3a']);
  R.rect(0, 23, 268, 30, hex('#6a0a1a')); for (let x = 0; x < 260; x += 10) R.disco(x + 5, 30, 4, hex('#8a1a2a'));
  R.rect(270, 20, 319, 49, hex('#100c1a')); for (let x = 270; x < 320; x++) R.pset(x, 49, hex('#2a2234'));
  // la pantalla grande con su marco
  R.rect(92, 34, 228, 110, K); R.rect(94, 36, 226, 108, hex('#2a2a34'));
  // altavoces a los lados del escenario
  for (const x0 of [44, 254]) { R.rect(x0, 86, x0 + 22, 132, hex('#1a1a20')); R.rect(x0 + 1, 87, x0 + 21, 131, hex('#2a2a32')); for (const [cy, r] of [[98, 6], [118, 9]]) { R.disco(x0 + 11, cy, r, K); R.disco(x0 + 11, cy, r - 2, hex('#3a3a44')); R.disco(x0 + 11, cy, 2, hex('#5a5a66')); } }
  tarima(132, 156);
  R.rect(0, 156, 319, 162, hex('#1a1014')); R.rect(0, 156, 319, 156, hex('#a87a4a'));
  // la sala, abajo: negra con las butacas
  R.rect(0, 163, 319, 179, hex('#0e0a12'));
  // el pie de micro y un taburete
  R.rect(216, 118, 218, 150, hex('#3a3a40')); R.linea(210, 151, 224, 151, hex('#3a3a40')); R.rect(234, 132, 246, 134, hex('#8a5a32')); R.linea(236, 134, 233, 150, hex('#3a3a40')); R.linea(244, 134, 247, 150, hex('#3a3a40'));
  // una botella de agua en el taburete
  R.rect(238, 124, 241, 131, hex('#a8d8f0')); R.rect(238, 123, 241, 123, hex('#3a6ad8'));
};
const p1 = (t) => {
  capa('escenario', escenario);
  // los focos que barren
  foco(60, 22, '#f8d870', t, 0.25 + Math.sin(t * 0.7) * 0.15, 120); foco(140, 22, '#a8d8f8', t, 0.05 + Math.sin(t * 0.5 + 1) * 0.1, 110); foco(230, 22, '#f8a8d8', t, -0.3 + Math.sin(t * 0.6 + 2) * 0.12, 120);
  // la pantalla: primero Bip y el 1982; en «fastest» el cartucho pasa volando con el cronómetro; en «history», la medalla
  R.recorte([94, 36, 226, 108]); degr(94, 36, 226, 108, [hex('#141850'), hex('#2a2a78'), hex('#3a3a8a')]);
  for (let k = 0; k < 18; k++) { const x = 94 + Math.floor(hh(k, 1, 5) * 132), y = 36 + Math.floor(hh(k, 2, 5) * 72); if (Math.sin(t * 3 + k) > 0) R.pset(x, y, hex('#a8a8e8')); }
  R.recorte(null);
  if (t < RAPIDO - 0.15) { bipGrande(160, 92, 4, t, { anda: false }); dig('1982', 136, 42, 3, hex('#f0d040'), K); }
  else { const u = lin(t, RAPIDO - 0.15, RAPIDO + 0.5), x = Math.round(lerp(60, 150, u));
    for (let k = 0; k < 6; k++) R.rect(Math.max(96, x - 50 + k * 4), 64 + k * 5, Math.max(96, x - 6), 65 + k * 5, hex('#a8c8f8'));
    if (x > 96) T.PIEZAS_AT.cartucho(R, x, 92, { color: 'naranja', icono: 'foso', s: 3 });
    // el cronómetro
    R.disco(206, 58, 13, K); R.disco(206, 58, 12, BL); R.rect(204, 42, 208, 45, K); const an = t * 12; R.linea(206, 58, Math.round(206 + Math.cos(an) * 9), Math.round(58 + Math.sin(an) * 9), hex('#d83a3a'));
    if (t > HISTORIA - 0.1) { const s = lin(t, HISTORIA - 0.1, HISTORIA + 0.2); const r = Math.round(4 + 8 * s); R.linea(118, 40, 126, 52, hex('#d83a3a')); R.linea(134, 40, 126, 52, hex('#3a6ad8')); R.disco(126, 60, r + 1, K); R.disco(126, 60, r, hex('#f0c040')); R.disco(126, 60, Math.max(1, r - 3), hex('#f8d870')); if (s >= 1) dig('1', 125, 56, 2, hex('#8a5a10')); if (parp(t, 9)) R.pset(122, 55, BL); }
  }
  // Warshaw de hoy entra con el micro, saluda, se ríe, señala la pantalla y levanta los brazos
  const ent = lin(t, 0.1, DEFIENDE - 0.1), wx = Math.round(lerp(-16, 150, ent));
  const senala = t > RAPIDO - 0.2 && t < HISTORIA - 0.1, celebra = t > HISTORIA && t < HISTORIA + 0.8;
  const w = R.actor(AT.warshawHoy, wx, 152, t, { dir: senala ? -1 : 1, anda: ent > 0 && ent < 1, sonrisa: t > HUMOR - 0.3, habla: !senala && !celebra && t > DEFIENDE && parp(t, 8), dedo: senala || (t > DEFIENDE + 0.1 && t < HUMOR - 0.4), brazos: celebra, sostiene: senala || celebra || (t > DEFIENDE + 0.1 && t < HUMOR - 0.4) ? undefined : [wx + 13, 134] });
  if (!(senala || celebra || (t > DEFIENDE + 0.1 && t < HUMOR - 0.4))) { const [mx, my] = w.mano; R.rect(mx - 1, my - 1, mx + 1, my + 4, hex('#2a2a30')); R.disco(mx, my - 2, 2, hex('#5a5a66')); R.pset(mx - 1, my - 3, hex('#9a9aa8')); }
  // el público de delante: se ríe en «humor» y aplaude en «history»
  const rie = (t > HUMOR && t < HUMOR + 1.3) || t > HISTORIA - 0.1;
  fila(172, 6, 22, 15, 0, t, { rie, aplaude: t > HISTORIA && t < HISTORIA + 1.4, movil: true });
};

// ── 2 · la sala desde el fondo ─────────────────────────────────────────────────────────────────────────────────
const sala = () => {
  R.rect(0, 0, 319, 179, hex('#0a0810'));
  // el techo con sus filas de focos pequeños (lejos) y las paredes con apliques
  for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x * 3 + y * 11) % 37 === 0 && !(x > 270 && y < 48) && !(x > 16 && x < 174 && y < 16) ? hex('#2a2440') : hex('#120e1c'));
  for (let x = 0; x < 320; x++) { const yl = Math.round(30 + Math.abs(x - 160) * -0.04); R.pset(x, yl, hex('#2a2440')); }
  for (const [x, s] of [[20, 1], [300, -1]]) for (let k = 0; k < 3; k++) { const ax = x + s * k * 14, ay = 60 + k * 18; R.rect(ax - 2, ay, ax + 2, ay + 4, hex('#3a3040')); R.disco(ax, ay - 1, 2, hex('#f8d8a0')); }
  // el escenario lejos (x 86–234): telón, pantalla, tarima
  telon(86, 36, 234, 96, ['#3a1a5a', '#5a2a7a', '#7a3a9a']);
  R.rect(86, 34, 234, 37, hex('#6a0a1a')); R.rect(80, 34, 88, 104, hex('#8a1a2a')); R.rect(232, 34, 240, 104, hex('#8a1a2a'));
  R.rect(116, 40, 204, 86, K); R.rect(118, 42, 202, 84, hex('#141850'));
  for (let y = 96; y < 104; y++) for (let x = 80; x <= 240; x++) R.pset(x, y, y % 3 === 0 ? hex('#5a3a20') : hex('#7a4c2a'));
  R.rect(80, 104, 240, 106, hex('#2a1810'));
  // las paredes laterales en perspectiva
  R.poligono([[0, 30], [80, 34], [80, 110], [0, 140]], hex('#1a1424')); R.poligono([[320, 30], [240, 34], [240, 110], [320, 140]], hex('#1a1424'));
  for (let k = 0; k < 6; k++) { R.linea(k * 14, 31 + k, k * 14, 138 - k * 5, hex('#241c30')); R.linea(319 - k * 14, 31 + k, 319 - k * 14, 138 - k * 5, hex('#241c30')); }
  // la señal de salida (un muñequito que corre, sin letras)
  R.rect(8, 92, 22, 100, hex('#1a5a2a')); R.rect(9, 93, 21, 99, hex('#2ab84a')); R.disco(13, 94, 1, BL); R.linea(13, 95, 15, 97, BL); R.linea(15, 97, 17, 99, BL); R.linea(15, 97, 12, 99, BL); R.linea(14, 96, 18, 95, BL);
  // las luces del pasillo en el suelo
  for (let k = 0; k < 6; k++) R.rect(156 - k, 112 + k * 12, 158 + k, 113 + k * 12, hex('#f8c860'));
};
const p2 = (t) => {
  capa('sala', sala);
  // la pantalla del fondo: cinco semanas que se llenan, y la estrella del éxito tachada
  for (let k = 0; k < 5; k++) { const x = 124 + k * 15, lleno = t > CINCO - 0.6 + k * 0.15; R.rect(x, 50, x + 12, 62, hex('#3a3a8a')); R.rect(x + 1, 51, x + 11, 61, lleno ? hex('#f0d040') : hex('#141850')); if (lleno) for (let j = 0; j < 3; j++) R.rect(x + 2, 53 + j * 3, x + 10, 53 + j * 3, hex('#c8a020')); }
  dig('5', 156, 66, 3, hex('#ffffff'), K);
  if (t > EXITO - 0.2) { const sx = 186, sy = 74; R.poligono([[sx - 6, sy], [sx + 6, sy], [sx, sy - 9]], hex('#f0c040')); R.poligono([[sx - 6, sy - 6], [sx + 6, sy - 6], [sx, sy + 3]], hex('#f0c040')); if (t > SEMANAS) R.icono('X', sx - 2, sy - 6, hex('#e83a3a'), K); }
  // Warshaw, pequeñito en el escenario, que pasea y gesticula (lejos)
  const fx = Math.round(150 + Math.sin(t * 0.8) * 14), bot = Math.floor(t * 4) % 2;
  R.rect(fx - 2, 88, fx + 2, 96, hex('#3a3a46')); R.disco(fx, 85, 2, hex('#f6c290')); R.rect(fx - 2, 83, fx + 2, 84, hex('#8a8a96')); R.pset(fx + 3, 89 - bot * 2, hex('#f6c290')); R.rect(fx - 2, 96, fx - 1, 99, hex('#2a2a30')); R.rect(fx + 1, 96, fx + 2, 99, hex('#2a2a30'));
  // el haz del foco que lo sigue
  for (let y = 36; y < 100; y++) { const w = 2 + (y - 36) * 0.12; for (let x = Math.round(fx - w); x <= Math.round(fx + w); x++) if ((x + y) % 3 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#fff2c0'), 0.25)); }
  // las filas de cabezas, de lejos (pequeñas) a cerca (con las del primer plano en otra pasada)
  const rie = t > SEMANAS - 0.1 && t < SEMANAS + 1.4;
  for (let f = 0; f < 4; f++) { const y = 112 + f * 12, n = 14 + f * 2, paso = 300 / n; for (let i = 0; i < n; i++) { const k = f * 31 + i, x = Math.round(10 + i * paso + (k % 3)); const b = rie ? Math.round(Math.abs(Math.sin(t * 9 + k))) : 0; const r = 2 + f; if (Math.abs(x - 157) < 4 + f) continue;
    R.disco(x, y - b, r + 1, K); R.disco(x, y - b, r, PELO[k % PELO.length]); R.rect(x - r - 1, y - b + r, x + r + 1, y + r + 3, ROPA[k % ROPA.length]); if (k % 9 === 4) { R.rect(x + r, y - 6 - b - f, x + r + 2 + (f >> 1), y - 2 - b, parp(t + k, 2) ? hex('#a8d8f0') : hex('#d8f0ff')); } } }
  // la última fila, cerca: respaldos de butacas rojas y los dos aficionados con gorra que se miran en «some fans»
  const mira = t > ANOS - 0.2, fa = R.actor(AT.publico2014, 118, 182, t, { dir: mira ? 1 : -1, sonrisa: true, habla: t > FANS - 0.5 && parp(t, 8) });
  R.actor(AT.publico2014b, 150, 182, t, { dir: mira ? -1 : 1, sonrisa: true, dedo: t > FANS - 0.3 });
  for (let x = 0; x < 320; x += 30) { R.rect(x + 1, 166, x + 27, 179, K); R.rect(x + 2, 167, x + 26, 179, hex('#8a1a2a')); R.rect(x + 2, 167, x + 26, 168, hex('#b02a3a')); for (let y = 170; y < 179; y += 3) R.rect(x + 4, y, x + 24, y, hex('#7a1424')); }
  if (t < ANOS) { fila(176, 200, 26, 5, 40, t, { rie, movil: true }); } else { fila(176, 200, 26, 5, 40, t, { rie: false, movil: true }); }
  fila(176, 4, 26, 3, 50, t, { rie, movil: false });
  if (t > FANS - 0.4) R.bocadillo(fa.cabeza[0] + 10, 158, { icono: '!' });
};

// ── 3 · la pantalla de cerca: el código y el foso retocado ─────────────────────────────────────────────────────
const COD = Array.from({ length: 11 }, (_, j) => Array.from({ length: 4 }, (_, i) => String(Math.floor(hh(i, j, 77) * 90 + 10))));
const p3 = (t) => {
  R.rect(0, 0, 319, 179, hex('#0c0a14'));
  telon(0, 0, 14, 179, ['#5a0a1a', '#8a1a2a', '#b02a3a']); telon(272, 48, 319, 179, ['#5a0a1a', '#8a1a2a', '#b02a3a']);
  for (let y = 0; y < 48; y++) for (let x = 272; x < 320; x++) R.pset(x, y, hex('#100c1a'));
  // el marco de la pantalla
  R.rect(16, 18, 270, 150, K); R.rect(18, 20, 268, 148, hex('#1a1a28'));
  // a la izquierda, el código: filas de cifras; la fila que se retoca brilla y cambia
  R.rect(22, 24, 130, 144, hex('#0a1410'));
  const fil = Math.floor(lin(t, P3, RETOCA) * 5);
  COD.forEach((row, j) => { const y = 28 + j * 10, sel = j === 6, cambia = sel && t > CODIGO;
    if (sel && t > RETOCA - 0.2) R.rect(23, y - 2, 129, y + 6, parp(t, 6) && t < DIFICIL ? hex('#3a3a10') : hex('#1a3a1a'));
    dig(String(j + 10), 26, y, 1, hex('#3a6a4a'));
    row.forEach((n, i) => dig(cambia && i === 2 ? '01' : n, 46 + i * 20, y, 1, cambia && i === 2 ? hex('#f8e060') : hex('#5af07a'))); });
  // el cursor que parpadea
  const cy = 28 + Math.min(6, fil + (t > RETOCA ? 6 - fil : 0)) * 10; if (parp(t, 5)) R.rect(124, cy - 1, 126, cy + 5, hex('#5af07a'));
  // a la derecha, el juego: Bip pisa el borde del foso y ya no se cae
  const gx0 = 138, gx1 = 264, gy0 = 24, gy1 = 144;
  const fosoC = Math.round(0.56 * Math.ceil((gx1 - gx0 + 1) / 3));
  const andar = lin(t, P3 + 0.2, DIFICIL - 0.2), cruza = lin(t, DIFICIL + 0.1, FOSOS + 0.1);
  let st = { s: 3, pant: 2, piezas: 0, r: 0, borde: t > CODIGO + 0.1, hud: 6 };
  if (t < DIFICIL) { // la repetición de antes: cae (en gris)
    const u = andar; st.mi = lerp(4, fosoC - 3, Math.min(1, u * 1.4)); if (u > 0.72) { st.mi = fosoC - 3; st.mj = Math.round(lerp(25, 37, lin(u, 0.72, 1))); st.pose = 'cae'; } }
  else { st.mi = lerp(fosoC - 7, fosoC + 9, cruza); st.pose = cruza < 1 ? 'anda' : 'quieto'; if (Math.abs(st.mi - fosoC) < 7) st.mj = 24 - Math.round((1 - ((st.mi - fosoC) / 7) ** 2) * 3); }
  juego([gx0, gy0, gx1, gy1], t, st);
  if (t < DIFICIL && andar > 0.85) R.icono('X', 196, 60, hex('#e83a3a'), K, 2);
  if (t > FOSOS - 0.1) T.visto(R, 236, 50, 2);
  // el reflejo de la sala en la pantalla y la línea del proyector
  for (let k = 0; k < 40; k++) R.pset(30 + k * 3, 22 + (k % 2), mez(R.pget(30 + k * 3, 22), BL, 0.2));
  // el puntero láser de Warshaw que señala el número y luego el borde del foso
  const pu = t < DIFICIL ? [lerp(140, 92, lin(t, RETOCA - 0.4, RETOCA)), lerp(120, 88, lin(t, RETOCA - 0.4, RETOCA))] : [lerp(92, 206, lin(t, DIFICIL - 0.1, DIFICIL + 0.3)), lerp(88, 104, lin(t, DIFICIL - 0.1, DIFICIL + 0.3))];
  const lx = Math.round(pu[0] + Math.sin(t * 13) * 1), ly = Math.round(pu[1] + Math.cos(t * 11) * 1); R.disco(lx, ly, 2, hex('#ff8a8a')); R.pset(lx, ly, hex('#ff2a2a'));
  // abajo: el borde del escenario, Warshaw que señala y las cabezas de los aficionados que asienten
  tarima(150, 160); R.rect(0, 160, 319, 179, hex('#0e0a12'));
  R.actor(AT.warshawHoy, 280, 168, t, { dir: -1, dedo: true, sonrisa: t > DIFICIL, habla: parp(t, 7) && t < FOSOS });
  for (let i = 0; i < 9; i++) { const k = 60 + i, asiente = t > FOSOS && Math.floor(t * 4 + i) % 2 === 0; cabeza(20 + i * 30, 182 + (asiente ? 1 : 0), k, t, { rie: t > DESCUBRE - 0.5, aplaude: t > FOSOS + 0.4 && i % 3 === 1 }); }
};

// ── 4 · la mesa del escenario: el juego retocado ────────────────────────────────────────────────────────────────
const mesa = () => {
  R.rect(0, 0, 319, 179, hex('#0c0a14'));
  telon(0, 18, 319, 140);
  for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hex('#100c1a'));
  R.rect(268, 0, 319, 49, hex('#100c1a')); for (let x = 268; x < 320; x++) R.pset(x, 49, hex('#2a2234'));
  R.rect(0, 16, 262, 18, hex('#4a4a56')); for (let x = 0; x < 262; x += 8) R.linea(x, 16, x + 8, 18, hex('#2a2a34'));
  // la pancarta de pictogramas (cartucho, mando, estrella), sin letras
  R.rect(30, 34, 140, 58, hex('#1a1a28')); R.rect(32, 36, 138, 56, hex('#e8b020'));
  T.PIEZAS_AT.cartucho(R, 52, 54, { color: 'naranja', icono: 'foso' }); R.icono('mando', 76, 40, hex('#3a2a10'), hex('#c89818'), 2); R.icono('estrella', 104, 40, hex('#d83a3a'), hex('#c89818'), 2); bipGrande(128, 54, 2, 0, {});
  tarima(140, 166);
  R.rect(0, 166, 319, 179, hex('#0e0a12'));
  // la mesa con mantel y la tele de tubo encima
  R.rect(150, 128, 300, 132, K); R.rect(152, 129, 298, 131, hex('#3a3a8a')); for (let x = 152; x < 298; x += 6) R.rect(x, 132, x + 2, 150, hex('#2a2a6a')); R.rect(150, 132, 300, 150, hex('#30307a')); for (let x = 152; x < 300; x += 6) R.rect(x, 132, x, 150, hex('#24245a'));
};
const SALTOS4 = [CAMBIO, JUEGO + 0.1, MEJOR - 0.05];
const p4 = (t) => {
  capa('mesa', mesa);
  foco(80, 18, '#f8d870', t, 0.35 + Math.sin(t * 0.7) * 0.1, 140); foco(200, 18, '#f8a8d8', t, -0.1 + Math.sin(t * 0.5) * 0.12, 120);
  // la tele de tubo grande (mueble de madera) con el juego retocado: Bip salta por encima de los fosos
  R.rect(164, 46, 276, 128, K); for (let y = 47; y < 128; y++) for (let x = 165; x < 276; x++) R.pset(x, y, Math.sin(x * 0.2 + Math.sin(y * 0.15) * 2) > 0.8 ? hex('#6a4224') : hex('#8a5a32'));
  R.rect(165, 47, 275, 48, hex('#b8834a')); R.rect(172, 54, 252, 120, K); R.rect(173, 55, 251, 119, hex('#24222c'));
  R.rect(256, 56, 272, 118, hex('#3a3a44')); R.disco(264, 66, 4, K); R.disco(264, 66, 3, hex('#c8ccd8')); R.disco(264, 80, 4, K); R.disco(264, 80, 3, hex('#c8ccd8')); R.pset(264 + Math.round(Math.cos(t) * 2), 66 + Math.round(Math.sin(t) * 2), K);
  for (let y = 92; y < 116; y += 3) R.rect(258, y, 270, y, K); R.disco(262, 88, 1, parp(t, 2) ? hex('#f04a3a') : hex('#6a1a1a'));
  R.linea(210, 46, 196, 26, hex('#c8ccd8')); R.linea(228, 46, 244, 26, hex('#c8ccd8')); R.rect(206, 42, 232, 46, K); R.disco(196, 26, 1, hex('#e8e8f0')); R.disco(244, 26, 1, hex('#e8e8f0'));
  R.rect(170, 128, 176, 132, K); R.rect(264, 128, 270, 132, K);
  { const rect = [175, 57, 249, 117], W = rect[2] - rect[0] + 1, GW = Math.ceil(W / 2), FOS = PANTS[1].fosos.map((f) => Math.round(f * GW));
    const KF = [[P4, 0], [SALTOS4[0], FOS[0]], [SALTOS4[1], FOS[1]], [SALTOS4[2], FOS[2]], [FIN, GW + 6]];
    let mi = 0; for (let k = 0; k < KF.length - 1; k++) if (t >= KF[k][0]) mi = lerp(KF[k][1], KF[k + 1][1], lin(t, KF[k][0], KF[k + 1][0]));
    let mj, pose = 'anda';
    for (const fx of FOS) { const dd = mi - fx; if (Math.abs(dd) < 5) { mj = Math.round(17 - (1 - (dd / 5) ** 2) * 5); pose = 'salta'; } }
    const pz = SALTOS4.filter((s) => t > s + 0.3).length;
    juego(rect, t, { s: 2, hud: 5, suelo: 18, pant: 1, mi, mj, pose, piezas: pz, casa: t > RECUERDA, puntos: 2000 + pz * 500 + Math.floor((t - P4) * 4) * 10, r: 6, marco: hex('#24222c') });
    if (t > RECUERDA) for (let k = 0; k < 14; k++) { const an = k / 14 * 6.28 + t, rr = ((t - RECUERDA) * 30) % 24; R.pset(Math.round(212 + Math.cos(an) * rr), Math.round(74 + Math.sin(an) * rr * 0.6), [hex('#f8e060'), hex('#f07aa8'), hex('#7ae8f8')][k % 3]); } }
  // la consola y el cable del mando
  T.PIEZAS_AT.consolaVieja(R, 150, 128, {});
  // Warshaw juega con el mando, sonríe, y levanta los brazos al final
  const celebra = t > RECUERDA + 0.1;
  const w = R.actor(AT.warshawHoy, 126, 156, t, { dir: 1, sonrisa: true, habla: t > MEJOR && t < RECUERDA && parp(t, 7), brazos: celebra && Math.floor((t - RECUERDA) * 3) % 2 === 0, salto: celebra ? Math.round(Math.abs(Math.sin((t - RECUERDA) * 7)) * 3) : 0, sostiene: celebra ? undefined : [146, 136] });
  if (!celebra) { const salta = SALTOS4.some((s) => Math.abs(t - s) < 0.2); T.PIEZAS_AT.joystick(R, w.mano[0], w.mano[1] + 8, { inclina: salta ? 1 : Math.floor(t * 3) % 2 ? 0 : 1, pulsado: salta }); R.linea(w.mano[0] + 4, w.mano[1] + 8, 154, 124, K); }
  // las cabezas del público de delante: aplauden en «a lot better» y celebran en «remembered»
  fila(180, 8, 24, 14, 80, t, { rie: t > MEJOR - 0.2, aplaude: t > MEJOR - 0.1, movil: t > RECUERDA - 0.4 });
};
const efectos = [[0.5, 'publico'], [HUMOR + 0.1, 'publico'], [RAPIDO, 'whoosh'], [HISTORIA, 'campana'], [HISTORIA + 0.2, 'palmada'],
  [CINCO, 'pop'], [SEMANAS, 'publico'], [FANS - 0.3, 'golpecito'],
  [RETOCA, 'tecleo'], [CODIGO, 'bip'], [DIFICIL + 0.3, 'pop'], [FOSOS, 'brillo'],
  [CAMBIO, 'boing'], [JUEGO + 0.1, 'boing'], [MEJOR - 0.05, 'brillo'], [MEJOR + 0.1, 'palmada'], [RECUERDA, 'publico']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
''')
