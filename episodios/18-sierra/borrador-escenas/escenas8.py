# Borrador de escenas del ep18 (grupo S8): si-gloria, si-raton, si-voces. Formato del 11 (generar-escenas.py).
E = {}

# ── piezas pequeñas que comparten las escenas (cada escena es su propia página: se repiten en cada cuerpo) ──────────
COMUN = r'''
const k_ = T.C.k, BL = T.C.blanco;
const rgb = (r, g, b) => hex('#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join(''));
const grad = (a, b, n) => Array.from({ length: n }, (_, i) => rgb(...a.map((v, j) => v + (b[j] - v) * i / (n - 1))));
const hh = (x, y, s = 0) => { const v = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v); };
const BAYER = [0, 0.5, 0.75, 0.25];
// tono tramado: elige en la rampa P con el valor v (0–1) y un tramado 2×2
const tono = (P, v, x, y) => { const f = Math.max(0, Math.min(0.999, v)) * (P.length - 1), i = Math.floor(f); return P[Math.min(P.length - 1, i + ((f - i) > BAYER[(x & 1) + 2 * (y & 1)] ? 1 : 0))]; };
// estrella de 7 px con contorno
const ESTR = ['...#...', '..###..', '#######', '.#####.', '..###..', '.##.##.', '##...##'];
const estrella = (x, y, c, cS) => { for (let j = 0; j < 7; j++) for (let i = 0; i < 7; i++) if (ESTR[j][i] === '#') for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) { const a = ESTR[j + dy]?.[i + dx]; if (a !== '#') R.pset(x - 3 + i + dx, y - 3 + j + dy, k_); }
  for (let j = 0; j < 7; j++) for (let i = 0; i < 7; i++) if (ESTR[j][i] === '#') R.pset(x - 3 + i, y - 3 + j, j > 3 || i > 4 ? cS : c); R.pset(x - 1, y - 1, BL); };
// bocadillo con ondas de voz (sin letras): esquina (x, y), w × h, la cola hacia (cx, cy)
const bocadillo = (x, y, w, h, t, cx, cy, col = hex('#3a6ac8')) => {
  const mx = Math.round(Math.max(x + 4, Math.min(x + w - 4, cx)));
  R.poligono([[mx - 3, y + h - 1], [mx + 3, y + h - 1], [cx, cy]], k_);
  R.rect(x + 1, y, x + w - 1, y + h, k_); R.rect(x, y + 1, x + w, y + h - 1, k_);
  R.rect(x + 1, y + 1, x + w - 1, y + h - 1, BL); R.rect(x + 2, y + h - 2, x + w - 2, y + h - 1, hex('#d8d4ca'));
  R.poligono([[mx - 2, y + h - 2], [mx + 2, y + h - 2], [cx + (cx < mx ? 1 : -1), cy - 2]], BL);
  const n = Math.max(1, Math.floor((h - 3) / 4));
  for (let q = 0; q < n; q++) { const yy = y + 3 + q * 4; for (let i = 3; i <= w - 3; i++) { const a = Math.sin(i * 0.9 - t * 14 + q * 1.7) * (1 - Math.abs(i - w / 2) / (w / 2)) * 1.6; R.pset(x + i, Math.round(yy + a), q === 1 ? col : k_); } }
};
'''

# ── el cuadro pintado a mano (el mismo bosque de los monitores): degradados suaves, sol con halo, castillo ──────────
PINTURA = r'''
const CIEL = grad([96, 150, 226], [250, 206, 168], 8), MONT = grad([150, 120, 190], [96, 80, 140], 5), COLI = grad([140, 200, 96], [52, 120, 64], 6);
const PRAD = grad([120, 186, 80], [56, 112, 48], 6), PINO = grad([60, 120, 80], [20, 60, 44], 5), CAMI = grad([236, 210, 150], [180, 140, 90], 5), CAST = grad([236, 232, 220], [150, 146, 156], 4);
const SOLC = grad([255, 250, 210], [255, 214, 140], 4), TEJ = grad([90, 120, 220], [50, 70, 150], 3), TRON = grad([140, 96, 60], [90, 60, 36], 3);
// el color del cuadro en (u, v) ∈ [0, 1]² (x, y para el tramado)
const pint = (u, v, x, y) => {
  const cam = 0.5 + 0.18 * (1 - v) * Math.sin(v * 5), ancho = 0.02 + 0.2 * Math.max(0, v - 0.62);
  if (v > 0.62 && Math.abs(u - cam) < ancho) return tono(CAMI, (u - cam + ancho) / (2 * ancho) * 0.6 + (v - 0.62), x, y);
  for (const [tu, tv, ts] of [[0.1, 0.88, 0.2], [0.86, 0.9, 0.24], [0.2, 0.7, 0.12], [0.72, 0.68, 0.1], [0.95, 0.6, 0.12]]) {   // pinos
    const al = ts, top = tv - al; if (v > top && v < tv + 0.04) { const w = (v - top) / al * ts * 0.36; if (Math.abs(u - tu) < w) return tono(PINO, 0.2 + (u - tu + w) / (2 * w) * 0.6 + ((v * 40) % 1 < 0.3 ? 0.2 : 0), x, y); }
    if (v >= tv && v < tv + 0.06 && Math.abs(u - tu) < 0.012) return tono(TRON, 0.5, x, y); }
  if (u > 0.28 && u < 0.4 && v > 0.36 && v < 0.5) {   // el castillo en su colina
    const torre = (u < 0.305 || u > 0.375) ? v > 0.36 : v > 0.41; if (torre) { if ((u < 0.305 || u > 0.375) && v < 0.39) return tono(TEJ, (v - 0.36) / 0.03, x, y); return tono(CAST, (u - 0.28) / 0.12 + (v > 0.45 && Math.abs(u - 0.34) < 0.01 ? 1 : 0), x, y); } }
  const mo = 0.4 + 0.06 * Math.sin(u * 7.3 + 1) + 0.03 * Math.sin(u * 19), co = 0.5 + 0.04 * Math.sin(u * 4.7 + 2.2), pr = 0.6 + 0.02 * Math.sin(u * 9);
  if (v > pr) return tono(PRAD, (v - pr) / (1 - pr) + hh(Math.floor(u * 30), Math.floor(v * 30)) * 0.15, x, y);
  if (v > co) return tono(COLI, (v - co) / (pr - co) * 0.8 + (u > 0.5 ? 0.1 : 0), x, y);
  if (v > mo) return tono(MONT, (v - mo) / (co - mo) + (Math.sin(u * 30) > 0.6 ? 0.2 : 0), x, y);
  const ds = Math.hypot(u - 0.76, (v - 0.17) * 1.3); if (ds < 0.06) return tono(SOLC, ds / 0.06, x, y); if (ds < 0.11) return tono(CIEL, 0.85 + (0.11 - ds) * 1.4, x, y);
  const nub = Math.sin(u * 9 + v * 3) + Math.sin(u * 23) * 0.4; if (v > 0.12 && v < 0.24 && nub > 1.05) return tono(grad([255, 255, 255], [214, 200, 220], 3), (v - 0.12) / 0.12, x, y);
  return tono(CIEL, v / mo, x, y);
};
const PINT = new Map();
const cuadro = (w, h) => { const kk = w + 'x' + h; if (!PINT.has(kk)) { const a = new Uint32Array(w * h); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) a[y * w + x] = pint((x + 0.5) / w, (y + 0.5) / h, x, y); PINT.set(kk, a); } return PINT.get(kk); };
'''

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['si-gloria'] = ('Quest for Glory', '''// SI-GLORIA (frases 51–53), 1989. Cuatro planos:
// 1. la plaza del gremio: Lori y Corey cruzan el mercado con un rollo de papel; al decir «Quest for Glory» Corey lo
//    levanta hacia el tablón y Lori lo señala (corta en «where»);
// 2. el tablón de cerca: Lori clava el dibujo del héroe (en «hero»); su estrella sube de nivel 1 → 2 → 3 en «better» y
//    «practice»; en «role-playing game» Corey tira un dado de veinte caras que cae en 20 y los dos lo celebran;
// 3. la puerta de la muralla (corta en «There»): el guerrero la tumba de un empujón (en «fighter»); ¡puf!, se carga la
//    partida (el disquete brilla) y el mago la abre con un rayo (en «wizard»); ¡puf!, y la ladrona se agacha con su
//    ganzúa y la abre sin ruido (en «each one solved problems in their own way»);
// 4. el camino (corta en «and you could carry»): el guerrero con su mochila cruza del mapa verde al desierto; sus tres
//    estrellas aparecen en «everything they'd learned» y cruzan la costura con él en «to the next» (del cartel 1 al 2).''',
COMUN + r'''
const a = (f) => en('cole', f), b = (f) => en('clases', f), c = (f) => en('llevar', f);
const P2 = a(0.537), P3 = b(-0.015), P4 = c(-0.01);
// el rollo de papel en la mano (abre 0–1: se desenrolla hacia abajo y deja ver el héroe a lápiz)
const rollo = (x, y, abre) => {
  const pa = T.C.papel, pS = T.C.papelS;
  if (abre > 0) { const al = Math.round(2 + abre * 11); R.rect(x - 6, y, x + 6, y + al, k_); R.rect(x - 5, y + 1, x + 5, y + al - 1, pa); R.rect(x + 3, y + 1, x + 5, y + al - 1, pS);
    if (al > 8) { R.rect(x - 1, y + 3, x + 1, y + 7, hex('#6a5a4a')); R.pset(x, y + 2, hex('#6a5a4a')); R.pset(x + 2, y + 4, hex('#8a8a94')); R.pset(x - 3, y + 6, hex('#a83a3a')); estrella(x + 3, y + 3, T.C.oro, T.C.oroS); } }
  R.rect(x - 6, y - 2, x + 6, y + 2, k_); R.rect(x - 5, y - 1, x + 5, y + 1, pa); R.rect(x - 5, y + 1, x + 5, y + 1, pS); R.pset(x - 4, y - 1, BL);
  if (abre <= 0) { R.rect(x - 1, y - 2, x, y + 2, hex('#c83a3a')); R.pset(x + 1, y + 3, hex('#c83a3a')); } };
const p1 = (t) => {
  T.fantasia(R, t, { encuadre: 'gremio' });
  const llega = a(0.40), muestra = tramo(t, a(0.41), a(0.47));
  const u = tramo(t, 0.15, llega), v = tramo(t, 0.45, llega + 0.3);
  const xc = Math.round(lerp(286, 138, u)), yc = Math.round(lerp(171, 157, u)), xl = Math.round(lerp(312, 156, v)), yl = Math.round(lerp(174, 159, v));
  const m = R.actor(EL.corey, xc, yc, t, { dir: -1, anda: u > 0 && u < 1, sostiene: muestra > 0 ? [Math.round(lerp(xc - 3, 127, muestra)), Math.round(lerp(yc - 13, 117, muestra))] : true, sonrisa: muestra >= 1 }).mano;
  rollo(m[0] - 2, m[1] - 1, tramo(t, a(0.45), a(0.5)));
  R.actor(EL.lori, xl, yl, t, { dir: -1, anda: v > 0 && v < 1, dedo: t > a(0.41), habla: t > a(0.41) && t < a(0.5) && Math.sin(t * 9) > 0, sonrisa: t > a(0.5) });
  // al pasar, las palomas de la plaza echan a volar
  const vu = tramo(t, 1.4, 3.2); if (vu > 0 && vu < 1) for (let q = 0; q < 2; q++) { const px = Math.round(170 + q * 10 + vu * 40), py = Math.round(164 - vu * 60 - q * 6), al = Math.floor(t * 12 + q) % 2;
    R.rect(px - 1, py, px + 1, py + 1, hex('#8a8a9a')); R.pset(px - 2, py - al, hex('#6a6a7a')); R.pset(px + 2, py - al, hex('#6a6a7a')); R.pset(px - 3, py - 1 - al, hex('#6a6a7a')); R.pset(px + 3, py - 1 - al, hex('#6a6a7a')); }
};
const p2 = (t) => {
  const clava = a(0.60), n2 = a(0.674), n3 = a(0.767), tira = a(0.885), cae = tira + 0.55;
  const nivel = t < n2 ? 1 : t < n3 ? 2 : 3;
  T.fantasia(R, t, { encuadre: 'gremio', camara: 'tablon', clavado: t >= clava ? 0.3 + 0.7 * tramo(t, n2 - 0.2, n3 + 0.4) : 0, nivel });
  // Lori trae el dibujo y lo clava en el hueco
  const u = tramo(t, P2 + 0.05, clava - 0.12);
  if (t < clava) { const hx = Math.round(lerp(140, 151, u)), hy = Math.round(lerp(150, 138, u));
    T.h_dibujoHeroe(R, hx + 13, hy - 3, t, { nivel: 1, chincheta: false }); R.actor(EL.lori, Math.round(lerp(112, 132, u)), 166, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [hx, hy] }); }
  else { const fiesta = t > cae && t < cae + 1.1; R.actor(EL.lori, 132, 166, t, { dir: 1, sostiene: t < clava + 0.45 ? [151, 136] : undefined, sonrisa: true, brazos: fiesta, salto: fiesta ? Math.round(Math.abs(Math.sin((t - cae) * 7)) * 3) : 0 }); }
  if (t >= clava && t < clava + 0.35) for (let q = 0; q < 6; q++) { const an = q * 1.05, r = 4 + (t - clava) * 26; R.pset(Math.round(165 + Math.cos(an) * r), Math.round(121 + Math.sin(an) * r * 0.6), q % 2 ? BL : T.C.papelS); }
  // la estrella sube de nivel: «+1» que sube y se apaga
  for (const tn of [n2, n3]) { const e = tramo(t, tn, tn + 0.9); if (e > 0 && e < 1) R.numero('+1', 190, Math.round(124 - e * 16), { centro: true }); }
  // Corey lo explica con el dedo y tira el dado de veinte caras
  const fiesta = t > cae && t < cae + 1.1;
  const cm = R.actor(EL.corey, 196, 166, t, { dir: -1, dedo: t > n2 - 0.3 && t < tira - 0.4, habla: t > n2 - 0.3 && t < n3 + 0.6 && Math.sin(t * 8) > 0, sostiene: t > tira - 0.4 && t < tira ? [190, 142] : undefined, sonrisa: t > n3, brazos: fiesta, salto: fiesta ? Math.round(Math.abs(Math.sin((t - cae) * 7 + 1)) * 3) : 0 }).mano;
  const dv = tramo(t, tira, cae);
  if (t > tira - 0.4) { const dx = t < tira ? cm[0] - 2 : Math.round(lerp(190, 222, dv)), dy = t < tira ? cm[1] - 3 : Math.round(lerp(139, 162, dv) - Math.sin(dv * Math.PI) * 22 - (t > cae ? Math.max(0, Math.sin((t - cae) * 12)) * 2 * Math.max(0, 1 - (t - cae) * 2) : 0));
    const gira = t < cae ? Math.floor(t * 14) % 2 : 0;
    R.poligono([[dx, dy - 4], [dx + 4, dy - 2], [dx + 4, dy + 2], [dx, dy + 4], [dx - 4, dy + 2], [dx - 4, dy - 2]], k_);
    R.poligono([[dx, dy - 3], [dx + 3, dy - 1], [dx + 3, dy + 1], [dx, dy + 3], [dx - 3, dy + 1], [dx - 3, dy - 1]], gira ? hex('#d8d0f0') : BL);
    R.linea(dx - 3, dy - 1, dx + 3, dy - 1, hex('#a8a0c8')); R.pset(dx, dy + 1, hex('#c83a3a'));
    if (t > cae) { const e = tramo(t, cae, cae + 0.4), by = Math.round(110 - e * 4); R.rect(193, by - 11, 215, by + 1, k_); R.rect(194, by - 10, 214, by, BL); R.poligono([[201, by], [207, by], [206, by + 5]], k_); R.rect(202, by, 205, by + 1, BL); R.numero('20', 205, by - 2, { centro: true }); } }
};
const p3 = (t) => {
  const f1 = b(0.12), golpe = f1 + 0.32, r1 = b(0.285), w1 = b(0.308), r2 = b(0.53), l0 = b(0.575), click = b(0.80);
  const tumbada = t >= golpe && t < r1;
  let abierta = 0; if (t >= w1 && t < r2) abierta = tramo(t, w1 + 0.3, w1 + 0.7); if (t >= click) abierta = tramo(t, click + 0.15, click + 0.95);
  const g = T.fantasia(R, t, { encuadre: 'camino', camara: 'puerta', abierta, tumbada });
  // el disquete guarda antes del peligro y se ilumina cuando la partida se carga
  const pulso = (t0) => (t >= t0 && t < t0 + 0.55 ? 1 - Math.abs((t - t0) / 0.55 - 0.5) * 2 : 0);
  T.disquete(R, 252, 168, t, { dir: -1, guarda: Math.max(pulso(f1 - 0.6), pulso(r1 - 0.05), pulso(r2 - 0.05)), expresion: tumbada ? 'susto' : 'normal' });
  // el mago: alza el bastón y lanza el rayo a la cerradura
  const rayo = t > w1 + 0.05 && t < w1 + 0.65;
  const mm = R.actor(EL.mago, 108, 160, t, { dir: 1, sostiene: t >= w1 && t < r2 ? [124, 124] : [122, 138], sonrisa: t > w1 + 0.7 && t < r2, habla: rayo }).mano;
  R.linea(mm[0], mm[1] - 12, mm[0], mm[1] + 9, hex('#6a4a2a')); R.linea(mm[0] + 1, mm[1] - 12, mm[0] + 1, mm[1] + 9, hex('#4a2e18'));
  R.disco(mm[0], mm[1] - 14, 2, k_); R.disco(mm[0], mm[1] - 14, 1, rayo || (t >= w1 && t < r2) ? hex('#aaf0ff') : hex('#5a8ad8'));
  if (rayo) { let px = mm[0], py = mm[1] - 14; const [qx, qy] = [160, 118]; for (let s = 1; s <= 6; s++) { const nx = Math.round(lerp(mm[0], qx, s / 6) + (s < 6 ? (hh(s, Math.floor(t * 20)) - 0.5) * 8 : 0)), ny = Math.round(lerp(mm[1] - 14, qy, s / 6) + (s < 6 ? (hh(s + 9, Math.floor(t * 20)) - 0.5) * 8 : 0));
      R.linea(px, py - 1, nx, ny - 1, hex('#fff0a0')); R.linea(px, py, nx, ny, BL); R.linea(px, py + 1, nx, ny + 1, hex('#5ae8f0')); px = nx; py = ny; }
    for (let q = 0; q < 8; q++) { const an = q * 0.8 + t * 9; R.pset(Math.round(qx + Math.cos(an) * 6), Math.round(qy + Math.sin(an) * 6), q % 2 ? BL : hex('#fff0a0')); } }
  // el guerrero: carga contra la puerta, la tumba y levanta los brazos
  const carga = tramo(t, f1, golpe), gx = t < r1 ? Math.round(lerp(138, 150, carga)) : 138;
  R.actor(EL.guerrero, gx, 160, t, { dir: 1, anda: carga > 0 && carga < 1, salto: carga > 0.5 && carga < 1 ? 2 : 0, brazos: tumbada, sonrisa: tumbada, sorpresa: t > r1 && t < r1 + 0.6 });
  if (t >= golpe && t < golpe + 0.4) for (let q = 0; q < 10; q++) { const e = (t - golpe) / 0.4, an = Math.PI + q * 0.35; R.disco(Math.round(160 + Math.cos(an) * (20 + e * 18)), Math.round(150 + Math.sin(an) * (4 + e * 6)), Math.round(3 - e * 2), q % 2 ? T.C.caminoL : T.C.camino); }
  // la ladrona: se acerca de puntillas, hurga con la ganzúa y la cerradura cede
  const lv = tramo(t, l0, l0 + 0.5), lx = Math.round(lerp(172, 164, lv)), hurga = t > l0 + 0.5 && t < click + 0.2;
  const lm = R.actor(EL.ladrona, lx, 160, t, { dir: -1, anda: lv > 0 && lv < 1, sostiene: t > l0 + 0.4 && t < click + 0.5 ? [161 + (hurga ? Math.round(Math.sin(t * 22)) : 0), 139] : undefined, sonrisa: t > click, habla: false }).mano;
  if (t > l0 + 0.4 && t < click + 0.5) { R.linea(lm[0], lm[1], lm[0] - 4, lm[1] - 2, hex('#c8ccd8')); R.pset(lm[0] - 5, lm[1] - 3, hex('#8a8a9a')); }
  if (t > click && t < click + 0.5) { const e = (t - click) / 0.5; for (let q = 0; q < 4; q++) { const an = q * 1.57 + 0.78; R.linea(Math.round(160 + Math.cos(an) * (3 + e * 4)), Math.round(137 + Math.sin(an) * (3 + e * 4)), Math.round(160 + Math.cos(an) * (5 + e * 6)), Math.round(137 + Math.sin(an) * (5 + e * 6)), T.C.oroL); } }
  // ¡puf!: la partida se carga y la puerta vuelve a estar cerrada
  for (const r of [r1, r2]) { const e = tramo(t, r - 0.12, r + 0.3); if (e > 0 && e < 1) for (let q = 0; q < 9; q++) { const an = q * 0.7, rr = 6 + e * 22; { const cx_ = Math.round(160 + Math.cos(an) * rr * 0.9), cy_ = Math.round(112 + Math.sin(an) * rr), r_ = Math.round(11 - e * 7); R.disco(cx_, cy_, r_ + 1, hex('#8a86a0')); R.disco(cx_, cy_, r_, q % 3 ? hex('#f2eee2') : hex('#d8d4e8')); R.disco(cx_ - 2, cy_ - 2, Math.max(1, r_ - 4), BL); } }
    if (e < 0.6) for (let q = 0; q < 6; q++) { const an = q * 1.05 + 0.3; R.pset(Math.round(160 + Math.cos(an) * (30 + e * 20)), Math.round(112 + Math.sin(an) * (30 + e * 20)), T.C.oroL); } }
  if (t > click + 1) { R.actor(EL.guerrero, 138, 160, t, { dir: 1, brazos: true, salto: Math.round(Math.abs(Math.sin(t * 8)) * 2) }); }
};
const p4 = (t) => {
  T.fantasia(R, t, { encuadre: 'camino' });
  // los dos carteles del camino: el juego 1 y el juego 2
  for (const [px, n] of [[64, '1'], [266, '2']]) { R.rect(px - 1, 116, px + 1, 142, k_); R.rect(px, 117, px, 142, T.C.madera); R.rect(px - 9, 104, px + 9, 120, k_); R.rect(px - 8, 105, px + 8, 119, T.C.maderaL); R.rect(px - 8, 117, px + 8, 119, T.C.madera); R.pset(px - 7, 106, T.C.pajaL); R.numero(n, px + 1, 116, { centro: true }); }
  const u = tramo(t, P4, E.duracion), x = Math.round(lerp(26, 244, u)), su = 156;
  // la mochila a la espalda (va por detrás del cuerpo)
  const bx = x - 2, by = su - 21 + (Math.floor(t * 5 + x * 0.37) % 2 ? 0 : 1);
  R.rect(bx - 1, by - 1, bx + 6, by + 11, k_); R.rect(bx, by, bx + 5, by + 10, hex('#8a5a2a')); R.rect(bx, by, bx + 5, by + 2, hex('#a8743c')); R.rect(bx + 1, by + 5, bx + 4, by + 7, hex('#6a4220')); R.rect(bx - 1, by - 3, bx + 6, by - 1, k_); R.rect(bx, by - 2, bx + 5, by - 2, hex('#d8c8a0'));
  const hm = R.actor(EL.guerrero, x, su, t, { dir: 1, anda: true, sonrisa: t > c(0.35) });
  // las estrellas de lo aprendido: aparecen una a una y giran sobre su cabeza
  const nace = [c(0.35), c(0.42), c(0.49)], cruza = c(0.84), cx = x + 7;
  nace.forEach((t0, q) => { if (t < t0) return; const e = tramo(t, t0, t0 + 0.3), an = t * 2.4 + q * 2.09, sx = Math.round(cx + Math.cos(an) * 11), sy = Math.round(su - 36 + Math.sin(an) * 3 - (1 - e) * 8);
    estrella(sx, sy, T.C.oro, T.C.oroS); if (e < 1) for (let r = 0; r < 4; r++) R.pset(sx + [5, -5, 0, 0][r], sy + [0, 0, 5, -5][r], BL); });
  const fl = tramo(t, cruza - 0.2, cruza + 0.6); if (fl > 0 && fl < 1) for (let q = 0; q < 12; q++) { const an = q * 0.52, r = 6 + fl * 26; R.pset(Math.round(cx + Math.cos(an) * r), Math.round(su - 34 + Math.sin(an) * r * 0.7), q % 2 ? T.C.oroL : BL); }
};
const efectos = [[a(0.42), 'papel'], [a(0.575), 'toc'], [a(0.674), 'pop'], [a(0.767), 'brillo'], [a(0.885) + 0.55, 'toc'],
  [b(0.12) + 0.32, 'boom'], [b(0.285) - 0.1, 'whoosh'], [b(0.308) + 0.05, 'zumbido'], [b(0.53) - 0.1, 'whoosh'], [b(0.80), 'cerrojo'], [b(0.80) + 0.2, 'puerta'],
  [c(0.35), 'brillo'], [c(0.84), 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1989 });
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['si-raton'] = ('El ratón y los 256 colores', '''// SI-RATON (frases 54–55), 1990, cartela «1990». Cuatro planos:
// 1. el estudio de 1990: el pintor pinta en su caballete; el técnico teclea y en «changes the rules» suelta el teclado
//    y coge el ratón: el teclado se duerme (luna y burbujas); un compañero entra con su taza y se sorprende;
// 2. la mesa de cerca (corta en «No more typing»; fondo local): la mano deja de teclear y el teclado bosteza y se
//    duerme; en «you play with the mouse» la mano mueve el ratón, el cursor cruza la pantalla, clic, y el caballero de
//    16 colores anda hasta el cursor;
// 3. el rincón del pintor (corta en «Its backgrounds»; fondo local): el pintor acaba el bosque a pinceladas («painted by
//    hand») y su compañera pulsa el escáner: la barra de luz pasa y el cuadro aparece en el monitor («brought into the
//    computer»);
// 4. los dos monitores (corta en «256»): la pantalla de 256 colores se enciende; el caballero, aún de píxeles gordos,
//    se vuelve suave y se mira las manos maravillado (gag 7); en «used sixteen» señala la de 16 y da un saltito.''',
COMUN + PINTURA + r'''
const a = (f) => en('raton', f), b = (f) => en('colores', f);
const P2 = a(0.583), P3 = b(-0.008), P4 = b(0.462);
const p1 = (t) => {
  const coge = a(0.345), duerme = a(0.40);
  const ur = tramo(t, coge + 0.3, P2 - 0.1);
  const g = T.estudio(R, t, { raton: t < coge ? [0.3, 0.4] : [lerp(0.3, 0.78, ur), lerp(0.4, 0.66, ur)], dormido: tramo(t, duerme, duerme + 0.9) });
  // el pintor da pinceladas en el lienzo
  const pm = R.actor(EL.dibujante, 96, 158, t, { dir: -1, sostiene: [Math.round(80 + Math.sin(t * 4.3) * 2), Math.round(86 + Math.sin(t * 2.9) * 6)] }).mano;
  R.linea(pm[0], pm[1], pm[0] - 4, pm[1] - 3, hex('#8a5a2a')); R.pset(pm[0] - 5, pm[1] - 4, hex('#3a8a4a')); R.pset(pm[0] - 5, pm[1] - 3, hex('#3a8a4a'));
  // el técnico teclea y luego coge el ratón
  const tecl = t < coge, rx = g.raton ? g.raton[0] : 134, ry = g.raton ? g.raton[1] : 128;
  R.actor(EL.tecnico, 112, 158, t, { dir: 1, sostiene: tecl ? [146 + (Math.floor(t * 8) % 2) * 3, 128] : [rx + Math.round(ur * 3), ry - 1], sonrisa: t > coge + 0.6, habla: false });
  // el compañero entra con su taza y se sorprende al ver el teclado dormido
  const v = tramo(t, 1.4, coge), x2 = Math.round(lerp(330, 246, v));
  const cm = R.actor(EL.dibujante2, x2, 158, t, { dir: -1, anda: v > 0 && v < 1, sostiene: true, sorpresa: t > duerme + 0.4 && t < duerme + 1.3, sonrisa: t > duerme + 1.3 }).mano;
  R.rect(cm[0] - 3, cm[1] - 4, cm[0] + 1, cm[1] + 1, k_); R.rect(cm[0] - 2, cm[1] - 3, cm[0], cm[1], hex('#c83a3a')); R.pset(cm[0] + 2, cm[1] - 2, k_);
  for (let q = 0; q < 2; q++) { const e = (t * 0.8 + q * 0.5) % 1; R.pset(cm[0] - 1 + Math.round(Math.sin(t * 3 + q * 2 + e * 4)), cm[1] - 6 - Math.round(e * 6), e < 0.5 ? BL : T.C.grisL); }
};
// ── plano 2: la mesa de cerca (fondo local) ──
let B2 = null;
const EGA = { cie: hex('#55ffff'), azu: hex('#5555ff'), ver: hex('#00aa00'), vec: hex('#55ff55'), mar: hex('#aa5500'), gri: hex('#aaaaaa'), grs: hex('#555555'), neg: hex('#000000'), bla: hex('#ffffff'), ama: hex('#ffff55'), roj: hex('#aa0000') };
const fondo2 = () => {
  if (!B2) { B2 = R.nuevo(); const prev = R.usar(B2); R.recorte(null);
    const pa = grad([214, 206, 186], [176, 166, 146], 4);
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { const seam = x % 64 === 0 || x % 64 === 63; R.pset(x, y, seam ? pa[3] : tono(pa, 0.25 + y / 260 + (hh(x >> 1, y >> 1) - 0.5) * 0.35, x, y)); }
    R.rect(0, 0, 319, 2, hex('#8a8474'));
    // la balda con cajas de juegos y la planta
    R.rect(0, 44, 58, 47, k_); R.rect(0, 44, 57, 45, T.C.maderaL); R.rect(0, 46, 57, 46, T.C.maderaS);
    [[2, '#c83a3a'], [9, '#2a5aa8'], [16, '#e8c040'], [23, '#3a8a4a'], [30, '#6a3a8a'], [37, '#e8803a']].forEach(([x, c], q) => { const al = 18 + (q % 3) * 3; R.rect(x, 44 - al, x + 6, 43, k_); R.rect(x + 1, 45 - al, x + 5, 43, hex(c)); R.rect(x + 2, 47 - al, x + 4, 48 - al, BL); R.pset(x + 3, 38, hex('#f2eee2')); });
    R.rect(44, 34, 54, 43, k_); R.rect(45, 35, 53, 43, hex('#c8603a')); R.rect(45, 35, 53, 36, hex('#e88a5a'));
    // el corcho con bocetos
    R.rect(204, 18, 270, 72, k_); R.rect(205, 19, 269, 71, T.C.madera); for (let y = 22; y <= 68; y++) for (let x = 208; x <= 266; x++) R.pset(x, y, hh(x, y, 3) > 0.82 ? hex('#a8743c') : hh(x, y, 5) > 0.9 ? hex('#e0b070') : hex('#c8955a'));
    R.rect(210, 24, 232, 44, k_); R.rect(211, 25, 231, 43, T.C.papel); R.linea(214, 42, 214, 32, k_); R.linea(228, 42, 228, 32, k_); R.linea(214, 32, 228, 32, k_); R.linea(220, 32, 220, 28, k_); R.linea(217, 28, 223, 28, k_); R.rect(219, 37, 222, 42, k_);
    R.rect(238, 24, 262, 38, k_); R.rect(239, 25, 261, 37, BL); ['#c83a3a', '#e8c040', '#3a8a4a', '#2a5aa8', '#e87a9a', '#6a3a8a', '#8a6a44', '#5ae8f0'].forEach((c, q) => R.rect(241 + (q % 4) * 5, 27 + Math.floor(q / 4) * 5, 244 + (q % 4) * 5, 30 + Math.floor(q / 4) * 5, hex(c)));
    R.rect(212, 48, 232, 68, k_); R.rect(213, 49, 231, 67, hex('#f0e6c8')); R.linea(215, 60, 222, 52, hex('#3a6ac8')); R.linea(222, 52, 229, 62, hex('#3a6ac8')); R.linea(224, 64, 228, 60, T.C.rojo); R.linea(224, 60, 228, 64, T.C.rojo);
    R.rect(238, 42, 262, 68, k_); R.rect(239, 43, 261, 67, T.C.papel); R.disco(250, 50, 3, k_); R.rect(248, 54, 252, 62, k_); R.linea(246, 56, 244, 60, k_); R.linea(254, 56, 257, 50, k_); R.linea(249, 62, 247, 66, k_); R.linea(251, 62, 253, 66, k_);
    for (const [x, y, c] of [[221, 23, '#c83a3a'], [250, 23, '#3a8a4a'], [222, 47, '#2a5aa8'], [250, 41, '#e8c040']]) { R.disco(x, y, 1, k_); R.pset(x, y, hex(c)); }
    // el calendario de 1990 (solo números)
    R.rect(8, 58, 40, 92, k_); R.rect(9, 59, 39, 91, BL); R.rect(9, 59, 39, 66, T.C.rojo); R.numero('90', 24, 66, { centro: true, fina: true });
    for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) { R.rect(11 + i * 5, 69 + j * 5, 13 + i * 5, 71 + j * 5, (i + j * 6) === 15 ? T.C.rojo : T.C.grisL); }
    R.disco(28, 83, 3, T.C.rojo); R.disco(28, 83, 2, BL); R.rect(27, 82, 29, 84, T.C.grisL);
    // la mesa de formica con su veta
    const me = grad([224, 214, 188], [184, 172, 146], 5);
    for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(me, (y - 100) / 110 + (Math.sin(x * 0.05 + y * 0.31) > 0.92 ? 0.15 : 0) + (hh(x >> 2, y, 7) - 0.5) * 0.12, x, y));
    R.rect(0, 98, 319, 99, hex('#6a6050')); R.rect(0, 100, 319, 101, hex('#f0e8d0'));
    // sombra del monitor y el monitor beis
    for (let y = 104; y < 116; y++) for (let x = 70 + (y - 104); x < 210 - (y - 104); x++) if ((x + y) % 2) R.pset(x, y, hex('#a89a78'));
    R.rect(104, 102, 156, 112, k_); R.rect(105, 103, 155, 111, T.C.beisS); R.rect(105, 103, 155, 104, T.C.beis);
    R.rect(62, 16, 198, 104, k_); R.rect(63, 17, 197, 103, T.C.beis); R.rect(190, 17, 197, 103, T.C.beisS); R.rect(63, 17, 197, 18, hex('#eee8d6'));
    for (let x = 80; x < 180; x += 4) R.rect(x, 19, x + 1, 20, T.C.beisS);
    R.rect(71, 25, 189, 93, k_); R.rect(72, 26, 188, 92, hex('#3a3a44')); R.rect(72, 26, 188, 26, hex('#5a5a66'));
    R.rect(66, 96, 76, 100, T.C.beisS); R.rect(170, 96, 186, 99, T.C.beisS); R.rect(160, 97, 164, 98, k_);
    R.rect(64, 20, 74, 30, k_); R.rect(65, 21, 73, 29, hex('#f8e870')); R.linea(66, 24, 72, 24, hex('#a89a40')); R.linea(66, 27, 70, 27, hex('#a89a40'));
    // el teclado (perspectiva) con sus teclas
    R.poligono([[44, 120], [172, 120], [180, 152], [36, 152]], k_); R.poligono([[45, 121], [171, 121], [178, 150], [38, 150]], T.C.beis); R.rect(38, 148, 178, 151, T.C.beisS);
    for (let j = 0; j < 5; j++) { const y = 123 + j * 5, x0 = 47 - j * 1.6, x1 = 169 + j * 1.6, n = 15; for (let i = 0; i < n; i++) { const kx = Math.round(x0 + i * (x1 - x0) / n); if (j === 4 && i > 3 && i < 11) continue; R.rect(kx, y, kx + 6, y + 3, k_); R.rect(kx + 1, y, kx + 6, y + 2, hex('#eee8d6')); R.rect(kx + 1, y + 2, kx + 6, y + 2, T.C.beisS); } }
    R.rect(66, 143, 142, 146, k_); R.rect(67, 143, 141, 145, hex('#eee8d6'));
    R.linea(108, 120, 112, 104, hex('#3a3a44')); R.linea(109, 120, 113, 104, hex('#3a3a44'));
    // la alfombrilla del ratón y su cable
    R.poligono([[206, 128], [272, 128], [278, 168], [200, 168]], k_); R.poligono([[207, 129], [271, 129], [276, 166], [202, 166]], hex('#2a4a8a'));
    for (let y = 132; y < 164; y += 3) for (let x = 210; x < 270; x += 6) R.pset(x + (y % 2) * 3, y, hex('#3a5aa0'));
    R.rect(244, 134, 266, 146, hex('#4a6ab0')); R.rect(248, 138, 252, 144, hex('#c8c4d8')); R.rect(258, 138, 262, 144, hex('#c8c4d8')); R.rect(250, 134, 260, 137, hex('#a83a3a'));
    // los disquetes, el bote de lápices, la caja del juego y el flexo
    [[12, 108, '#c83a3a'], [16, 112, '#3a8a4a'], [20, 116, '#2a5aa8']].forEach(([x, y, c]) => { R.rect(x, y, x + 22, y + 9, k_); R.rect(x + 1, y + 1, x + 21, y + 8, T.C.disco); R.rect(x + 3, y + 2, x + 15, y + 4, hex(c)); R.rect(x + 3, y + 5, x + 15, y + 5, T.C.etiqueta); R.disco(x + 18, y + 5, 2, T.C.discoL); });
    R.rect(200, 100, 212, 118, k_); R.rect(201, 101, 211, 117, hex('#3a6a8a')); R.rect(201, 101, 203, 117, hex('#5a8aaa'));
    for (const [x, c] of [[202, '#e8c040'], [205, '#c83a3a'], [208, '#3a8a4a']]) { R.linea(x, 100, x + 1, 90, k_); R.linea(x + 1, 100, x + 2, 91, hex(c)); R.pset(x + 2, 89, k_); }
    R.rect(6, 150, 48, 178, k_); R.rect(7, 151, 47, 177, hex('#2a3a7a')); R.rect(7, 151, 47, 154, hex('#3a4a9a'));
    R.rect(14, 158, 40, 174, hex('#6aa8e0')); R.rect(14, 168, 40, 174, hex('#3a8a3a')); R.rect(22, 160, 32, 168, hex('#c8c0b0')); R.rect(20, 157, 23, 162, hex('#c8c0b0')); R.rect(31, 157, 34, 162, hex('#c8c0b0')); R.rect(20, 156, 23, 157, hex('#3a5ab0')); R.rect(31, 156, 34, 157, hex('#3a5ab0')); R.rect(26, 164, 28, 168, k_);
    // el altavoz pequeño de la mesa y la foto enmarcada (el castillo al atardecer)
    R.rect(236, 88, 256, 122, k_); R.rect(237, 89, 255, 121, hex('#3a3a44')); R.rect(237, 89, 239, 121, hex('#4a4a58')); R.disco(246, 112, 6, k_); R.disco(246, 112, 5, hex('#5a5a66')); R.disco(246, 112, 2, hex('#2a2a34')); R.disco(246, 96, 3, k_); R.disco(246, 96, 2, hex('#5a5a66'));
    R.rect(280, 52, 314, 92, k_); R.rect(281, 53, 313, 91, T.C.oroS); R.rect(281, 53, 313, 54, T.C.oro); R.rect(284, 56, 310, 88, k_);
    { const P = grad([250, 170, 110], [120, 70, 140], 5); for (let y = 57; y < 88; y++) for (let x = 285; x < 310; x++) R.pset(x, y, tono(P, 1 - (y - 57) / 34, x, y)); R.rect(292, 70, 302, 87, hex('#3a3046')); R.rect(290, 66, 294, 87, hex('#3a3046')); R.rect(300, 66, 304, 87, hex('#3a3046')); R.rect(296, 76, 297, 79, hex('#f8d870')); R.rect(285, 84, 309, 87, hex('#2a3a2a')); R.disco(288, 62, 2, hex('#fff0c0')); }
    R.usar(prev); }
  R.copiar(B2);
};
const pantalla16 = (t, cur, clic, cam) => {
  R.recorte([72, 26, 188, 92]);
  for (let y = 26; y <= 92; y++) for (let x = 72; x <= 188; x++) { let c; if (y < 44) c = EGA.azu; else if (y < 56) c = ((x + y) % 2) ? EGA.cie : EGA.azu; else if (y < 64) c = EGA.ver; else c = ((x >> 1) + (y >> 1)) % 7 === 0 ? EGA.ver : EGA.vec; R.pset(x, y, c); }
  for (let x = 72; x <= 188; x++) { const m = 50 + Math.round(Math.abs(Math.sin(x * 0.08)) * 6); for (let y = m; y < 58; y++) R.pset(x, y, EGA.grs); }
  R.rect(150, 40, 166, 58, EGA.gri); R.rect(148, 36, 152, 58, EGA.gri); R.rect(164, 36, 168, 58, EGA.gri); R.rect(148, 34, 152, 36, EGA.roj); R.rect(164, 34, 168, 36, EGA.roj); R.rect(156, 50, 160, 58, EGA.neg);
  for (let x = 72; x <= 188; x++) { const cy = 70 + Math.round(Math.sin(x * 0.05) * 3); R.pset(x, cy, EGA.mar); R.pset(x, cy + 1, EGA.mar); R.pset(x, cy + 2, EGA.mar); }
  for (const tx of [80, 100, 176]) { R.rect(tx + 3, 62, tx + 5, 72, EGA.mar); for (let j = 0; j < 14; j++) R.rect(tx + 4 - (j >> 1), 48 + j, tx + 4 + (j >> 1), 48 + j, EGA.ver); }
  R.rect(((Math.floor(t * 18) % 140) + 60), 38, ((Math.floor(t * 18) % 140) + 72), 41, EGA.bla);
  const bx = 72 + ((t * 24) % 120); R.pset(Math.round(bx), 32, EGA.neg); R.pset(Math.round(bx) - 1, 31 + (Math.floor(t * 8) % 2), EGA.neg); R.pset(Math.round(bx) + 1, 31 + (Math.floor(t * 8) % 2), EGA.neg);
  // el caballero de 16 colores anda hasta donde se hizo clic
  const ga = tramo(t, clic + 0.1, clic + 1.3), gx = Math.round(lerp(86, cam - 7, ga));
  R.actor(EL.graham, gx, 86, t, { dir: 1, anda: ga > 0 && ga < 1, sonrisa: ga >= 1 });
  if (t > clic && t < clic + 0.5) { const r = 2 + (t - clic) * 16; for (let q = 0; q < 12; q++) R.pset(Math.round(cur[0] + Math.cos(q * 0.52) * r), Math.round(cur[1] + 6 + Math.sin(q * 0.52) * r * 0.5), EGA.ama); }
  const F = ['#.....', '##....', '#w#...', '#ww#..', '#www#.', '#wwww#', '#ww###', '#.#w#.', '...##.'];
  F.forEach((f, j) => { for (let i = 0; i < 6; i++) if (f[i] !== '.') R.pset(cur[0] + i, cur[1] + j, f[i] === '#' ? EGA.neg : EGA.bla); });
  R.recorte(null);
  // el brillo del cristal
  for (let q = 0; q < 14; q++) R.pset(76 + q, 30 + Math.round(q * 0.3), hex('#ffffff'));
};
const p2 = (t) => {
  fondo2();
  const deja = a(0.636), duerme = a(0.69), mueve = a(0.837), clic = a(0.92);
  // la planta de la balda se mece
  for (let q = 0; q < 4; q++) { const sw = Math.round(Math.sin(t * 1.6 + q) * 2); R.linea(48 + q * 2, 34, 46 + q * 3 + sw, 24 - q * 2, hex('#2a7a3a')); R.disco(46 + q * 3 + sw, 24 - q * 2, 2, hex('#4aa84a')); R.linea(50 + q, 43, 52 + q * 2 + sw, 54 + q * 3, hex('#2a7a3a')); R.disco(52 + q * 2 + sw, 54 + q * 3, 1, hex('#5ac85a')); }
  // la esquina del boceto que se levanta con el aire
  if (Math.sin(t * 2.3) > 0.3) { R.rect(259, 60, 261, 67, hex('#d8ccb0')); R.pset(260, 59, hex('#d8ccb0')); }
  // el piloto del monitor
  R.rect(182, 97, 184, 98, Math.sin(t * 3) > -0.6 ? hex('#5ae86a') : hex('#2a6a3a'));
  // el ratón y el cursor
  const mv = tramo(t, mueve, clic - 0.05), mx = Math.round(lerp(226, 248, mv)), my = Math.round(lerp(146, 138, mv)) + (Math.abs(t - clic) < 0.08 ? 1 : 0);
  const cur = [Math.round(lerp(100, 156, mv)), Math.round(lerp(48, 70, mv))];
  pantalla16(t, cur, clic, 156);
  R.linea(mx + 6, my, mx + 4, 118, hex('#5a5a66')); R.linea(mx + 4, 118, 196, 104, hex('#5a5a66'));
  R.rect(mx, my, mx + 12, my + 16, k_); R.rect(mx + 1, my + 1, mx + 11, my + 15, T.C.beis); R.rect(mx + 9, my + 1, mx + 11, my + 15, T.C.beisS); R.linea(mx + 1, my + 6, mx + 11, my + 6, T.C.beisS); R.linea(mx + 6, my + 1, mx + 6, my + 6, T.C.beisS);
  if (Math.abs(t - clic) < 0.12) R.rect(mx + 1, my + 1, mx + 5, my + 5, hex('#a89a78'));
  // el teclado con cara: se aburre, bosteza y se duerme
  const ojo = t < deja ? 1 : 1 - tramo(t, duerme - 0.2, duerme + 0.3), boca = t > deja && t < duerme + 0.2;
  for (const ex of [92, 122]) { if (ojo > 0.5) { const al = ojo > 0.8 ? 0 : 2; R.rect(ex - 5, 126 + al, ex + 5, 136, k_); R.rect(ex - 4, 127 + al, ex + 4, 135, BL); R.rect(ex - (t < deja ? 0 : 2), 130 + al, ex + (t < deja ? 2 : 0), 134, k_); R.pset(ex - (t < deja ? -1 : 1), 131 + al, BL); } else { R.rect(ex - 5, 131, ex + 5, 133, k_); R.linea(ex - 4, 134, ex + 4, 134, k_); } }
  if (boca) { R.disco(107, 141, 4, k_); R.disco(107, 141, 3, hex('#a83a3a')); R.rect(105, 143, 109, 143, hex('#e87a9a')); } else if (t > duerme) { R.linea(103, 141, 111, 141, k_); R.pset(102, 140, k_); R.pset(112, 140, k_); }
  if (t > duerme + 0.2) { for (let q = 0; q < 3; q++) { const e = ((t - duerme) * 0.6 + q / 3) % 1, r = 1 + Math.round(e * 3); R.disco(Math.round(114 + q * 4 + e * 10), Math.round(126 - e * 26), r + 1, k_); R.disco(Math.round(114 + q * 4 + e * 10), Math.round(126 - e * 26), r, hex('#d8eef8')); }
    const lu = tramo(t, duerme + 0.3, duerme + 0.7); if (lu > 0) { R.disco(140, 104, 7, k_); R.disco(140, 104, 6, hex('#d8eef8')); R.icono('luna', 137, 101, hex('#e8c040'), k_); } }
  // la mano: teclea, se aparta del teclado y mueve el ratón
  const va = tramo(t, deja, duerme + 0.6);
  let wx, wy;
  if (t < deja) { wx = 150 + (Math.floor(t * 9) % 2) * 3; wy = 138 + (Math.floor(t * 9) % 2); } else { wx = Math.round(lerp(150, mx + 10, va)); wy = Math.round(lerp(138, my + 6, va) - Math.sin(va * Math.PI) * 10); }
  T.brazo(R, wx + 46, 206, wx, wy, '#5a5a6a', -1, { codo: [wx + 30, 190] });
  // la taza que humea
  R.rect(282, 118, 298, 138, k_); R.rect(283, 119, 297, 137, hex('#2a6aa8')); R.rect(283, 119, 285, 137, hex('#4a8ac8')); R.rect(298, 122, 302, 132, k_); R.rect(299, 124, 300, 130, hex('#2a6aa8')); R.rect(284, 119, 296, 121, hex('#5a3418'));
  for (let q = 0; q < 3; q++) { const e = (t * 0.5 + q / 3) % 1; for (let j = 0; j < 3; j++) R.pset(Math.round(288 + q * 3 + Math.sin(t * 3 + q + e * 6 + j) * 2), Math.round(114 - e * 30 - j), e < 0.6 ? hex('#f2f2f2') : hex('#d0d0d8')); }
};
// ── plano 3: el rincón del pintor y el escáner (fondo local) ──
let B3 = null;
const fondo3 = () => {
  if (!B3) { B3 = R.nuevo(); const prev = R.usar(B3); R.recorte(null);
    const pa = grad([238, 224, 192], [206, 188, 150], 5);
    for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pa, 0.15 + y / 220 + (x % 12 < 2 ? 0.2 : 0) + (hh(x >> 1, y >> 1, 2) - 0.5) * 0.25, x, y));
    for (let y = 2; y < 100; y += 10) for (let x = 6; x < 320; x += 12) R.pset(x + ((y / 10) % 2) * 6, y, hex('#c8a87a'));
    // el friso de madera
    for (let y = 100; y < 120; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 20 === 0 ? T.C.maderaS : tono(grad([168, 116, 60], [120, 80, 40], 4), (y - 100) / 24 + (Math.sin(x * 0.3 + y * 0.9) > 0.8 ? 0.3 : 0), x, y));
    R.rect(0, 99, 319, 99, k_); R.rect(0, 100, 319, 100, T.C.maderaL); R.rect(0, 118, 319, 120, T.C.maderaD);
    // el suelo de tablas
    for (let y = 121; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor((y - 121) / 9), jun = (y - 121) % 9 === 0 || (x + tab * 37) % 70 === 0; R.pset(x, y, jun ? hex('#6a4626') : tono(grad([190, 140, 86], [150, 104, 60], 4), (y - 121) / 80 + (Math.sin(x * 0.12 + tab) > 0.85 ? 0.3 : 0) + (hh(x >> 2, y, 4) - 0.5) * 0.2, x, y)); }
    // la tela del suelo con salpicaduras
    R.poligono([[6, 160], [128, 158], [136, 179], [0, 179]], hex('#d8d0bc')); for (let x = 6; x < 128; x += 3) R.pset(x, 160 + (x % 2), hex('#b8b09a'));
    for (let q = 0; q < 45; q++) { const x = 8 + Math.floor(hh(q, 1, 8) * 120), y = 162 + Math.floor(hh(q, 2, 8) * 16), c = hex(['#c83a3a', '#3a8a4a', '#2a5aa8', '#e8c040', '#6a3a8a'][q % 5]); R.pset(x, y, c); if (q % 3 === 0) R.pset(x + 1, y, c); }
    // la balda de encima del caballete: el busto de escayola, el bote de pinceles y los libros de arte
    R.rect(4, 38, 96, 41, k_); R.rect(4, 38, 95, 39, T.C.maderaL); R.rect(4, 40, 95, 40, T.C.maderaS);
    R.disco(16, 28, 5, k_); R.disco(16, 28, 4, hex('#f2eee2')); R.disco(14, 27, 1, hex('#c8c4b8')); R.rect(13, 33, 19, 37, k_); R.rect(14, 33, 18, 37, hex('#e0dcd0'));
    R.rect(28, 28, 36, 37, k_); R.rect(29, 29, 35, 37, hex('#3a6a8a')); for (const [x, c] of [[30, '#c83a3a'], [32, '#e8c040'], [34, '#3a8a4a']]) { R.linea(x, 28, x - 1, 18, k_); R.pset(x - 1, 17, hex(c)); R.pset(x - 1, 16, hex(c)); }
    [[44, '#8a2a3a', 14], [49, '#2a4a7a', 12], [54, '#c8a040', 15], [59, '#3a6a3a', 13]].forEach(([x, c, al]) => { R.rect(x, 38 - al, x + 4, 37, k_); R.rect(x + 1, 39 - al, x + 3, 37, hex(c)); R.pset(x + 2, 41 - al, hex('#f2eee2')); });
    R.rect(70, 30, 90, 37, k_); R.rect(71, 31, 89, 37, hex('#c8603a')); for (let q = 0; q < 5; q++) R.disco(73 + q * 4, 28 - (q % 2) * 2, 2, hex(q % 2 ? '#4aa84a' : '#2a7a3a'));
    // bocetos clavados junto a la ventana
    [[112, 20, 0], [114, 52, 1]].forEach(([x, y, q]) => { R.rect(x, y, x + 24, y + 24, k_); R.rect(x + 1, y + 1, x + 23, y + 23, T.C.papel); R.disco(x + 12, y + 2, 1, T.C.rojo);
      if (q === 0) { R.linea(x + 4, y + 20, x + 12, y + 6, hex('#5a5a66')); R.linea(x + 12, y + 6, x + 20, y + 20, hex('#5a5a66')); R.linea(x + 8, y + 14, x + 16, y + 14, hex('#5a5a66')); } else { for (let i = 0; i < 4; i++) R.rect(x + 3 + i * 5, y + 8, x + 6 + i * 5, y + 15, hex(['#3a8a4a', '#2a5aa8', '#e8c040', '#c83a3a'][i])); R.linea(x + 3, y + 19, x + 21, y + 19, hex('#8a8a94')); } });
    // la ventana a la sierra (el cielo se mueve en cada fotograma)
    R.rect(144, 18, 224, 84, k_); R.rect(145, 19, 223, 83, T.C.maderaL); R.rect(149, 23, 219, 79, k_);
    R.rect(141, 84, 227, 88, k_); R.rect(142, 84, 226, 86, T.C.maderaL); R.rect(142, 87, 226, 87, T.C.maderaS);
    R.rect(150, 78, 156, 83, k_); R.rect(151, 79, 155, 83, hex('#c8603a')); R.disco(153, 76, 3, hex('#3a8a3a')); R.pset(152, 74, hex('#e87a9a'));
    // la balda con botes de pintura y el cuadro pequeño
    R.rect(230, 52, 276, 55, k_); R.rect(230, 52, 275, 53, T.C.maderaL); R.rect(230, 54, 275, 54, T.C.maderaS);
    [['#c83a3a', 233], ['#2a5aa8', 243], ['#e8c040', 253], ['#3a8a4a', 263]].forEach(([c, x]) => { R.rect(x, 40, x + 8, 51, k_); R.rect(x + 1, 41, x + 7, 51, hex('#c8ccd8')); R.rect(x + 1, 44, x + 7, 48, hex(c)); R.rect(x + 1, 41, x + 7, 42, hex('#e8ecf4')); });
    R.rect(236, 60, 270, 86, k_); R.rect(237, 61, 269, 85, T.C.oroS); R.rect(239, 63, 267, 83, k_); { const cu = cuadro(27, 19); for (let y = 0; y < 19; y++) for (let x = 0; x < 27; x++) R.pset(240 + x, 64 + y, cu[y * 27 + x]); }
    // el perchero con la bata manchada
    R.rect(284, 56, 287, 118, k_); R.rect(285, 56, 286, 118, T.C.maderaS); R.rect(280, 56, 292, 58, k_); R.poligono([[279, 60], [293, 60], [296, 96], [276, 96]], k_); R.poligono([[280, 61], [292, 61], [294, 95], [278, 95]], hex('#e8e4d8'));
    for (const [x, y, c] of [[283, 70, '#c83a3a'], [289, 78, '#2a5aa8'], [284, 88, '#3a8a4a'], [290, 66, '#e8c040']]) { R.rect(x, y, x + 1, y + 1, hex(c)); } R.linea(286, 61, 286, 95, hex('#c8c4b8'));
    // la mesa del escáner, baja
    R.poligono([[176, 148], [319, 148], [319, 160], [168, 160]], k_); for (let y = 149; y < 160; y++) for (let x = 170 + Math.round((160 - y) * 0.6); x < 320; x++) R.pset(x, y, tono(grad([210, 170, 110], [170, 128, 76], 4), (y - 149) / 14 + (Math.sin(x * 0.2 + y) > 0.9 ? 0.2 : 0), x, y));
    R.rect(168, 160, 319, 166, k_); R.rect(169, 161, 319, 165, T.C.madera); R.rect(169, 161, 319, 161, T.C.maderaL);
    for (const lx of [172, 306]) { R.rect(lx, 166, lx + 6, 179, k_); R.rect(lx + 1, 166, lx + 5, 179, T.C.maderaS); R.rect(lx + 1, 166, lx + 2, 179, T.C.madera); }
    // el escáner: la tapa levantada, el cristal y el frente con su botón
    R.rect(180, 118, 234, 148, k_); R.rect(181, 119, 233, 147, hex('#a8acb8')); R.rect(181, 119, 233, 121, hex('#c8ccd8')); R.rect(184, 124, 230, 144, hex('#e8ecf0'));
    R.poligono([[180, 147], [234, 147], [236, 156], [178, 156]], k_); R.poligono([[182, 148], [232, 148], [233, 155], [181, 155]], hex('#c8ccd8')); R.poligono([[185, 149], [229, 149], [230, 154], [184, 154]], hex('#2a3a5a'));
    R.rect(178, 156, 236, 161, k_); R.rect(179, 157, 235, 160, hex('#8a8e9a')); R.rect(182, 158, 186, 159, hex('#3a3a44'));
    // el monitor y su cable
    R.rect(244, 90, 312, 150, k_); R.rect(245, 91, 311, 149, T.C.beis); R.rect(305, 91, 311, 149, T.C.beisS); R.rect(245, 91, 311, 92, hex('#eee8d6')); R.rect(250, 96, 306, 142, k_); R.rect(251, 97, 305, 141, hex('#14161e'));
    R.rect(266, 150, 290, 154, k_); R.rect(267, 150, 289, 153, T.C.beisS); R.rect(292, 144, 300, 146, T.C.beisS);
    R.linea(236, 158, 248, 155, hex('#3a3a44')); R.linea(248, 155, 266, 153, hex('#3a3a44'));
    // los botes del suelo, el trapo y el taburete del pintor
    [[140, 162, '#c83a3a'], [154, 168, '#2a5aa8']].forEach(([x, y, c]) => { R.rect(x, y, x + 11, y + 11, k_); R.rect(x + 1, y + 1, x + 10, y + 10, hex('#c8ccd8')); R.rect(x + 1, y + 1, x + 10, y + 3, hex(c)); R.rect(x + 1, y + 6, x + 10, y + 8, hex(c)); R.linea(x + 3, y + 3, x + 3, y + 7, hex(c)); });
    R.rect(108, 157, 136, 161, k_); R.rect(109, 158, 135, 160, T.C.maderaL); R.rect(109, 160, 135, 160, T.C.maderaS);
    for (const lx of [110, 132]) { R.rect(lx - 1, 161, lx + 2, 179, k_); R.rect(lx, 161, lx + 1, 179, T.C.madera); } R.rect(111, 170, 132, 171, T.C.maderaS);
    R.usar(prev); }
  R.copiar(B3);
};
const p3 = (t) => {
  fondo3();
  const pinta = b(0.117), mano = b(0.193), trae = b(0.291), comp = b(0.371);
  // por la ventana: cielo tramado, nubes, la sierra, pinos al viento y un pájaro
  R.recorte([150, 24, 218, 78]);
  const cie = grad([110, 170, 236], [200, 226, 246], 4); for (let y = 24; y <= 78; y++) for (let x = 150; x <= 218; x++) R.pset(x, y, tono(cie, (y - 24) / 40, x, y));
  for (const [x0, y, w, v, c] of [[150, 32, 16, 2, '#ffffff'], [190, 28, 22, 1.2, '#f0f0f8'], [170, 42, 12, 3, '#e0e4f0']]) { const nx = 150 + ((x0 - 150 + t * v * 4) % 90) - 10; R.disco(Math.round(nx), y, Math.round(w / 4), hex(c)); R.disco(Math.round(nx + w / 3), y - 2, Math.round(w / 3.2), hex(c)); R.disco(Math.round(nx + w / 1.6), y, Math.round(w / 4), hex(c)); }
  for (let x = 150; x <= 218; x++) { const m = 52 + Math.round(Math.abs(Math.sin(x * 0.07)) * 10 - Math.sin(x * 0.19) * 3); for (let y = m; y <= 78; y++) R.pset(x, y, y < m + 2 ? hex('#e8ecf4') : (x + y) % 5 ? T.C.granito : T.C.granitoL); }
  for (const px of [162, 176, 200, 212]) { const sw = Math.round(Math.sin(t * 1.8 + px) * 1.2); for (let j = 0; j < 14; j++) R.linea(px - (j >> 1) + sw * (j < 6 ? 1 : 0), 64 + j, px + (j >> 1) + sw * (j < 6 ? 1 : 0), 64 + j, j % 3 ? T.C.pinoV : T.C.pinoVL); }
  const pjx = 150 + ((t * 14) % 80); R.pset(Math.round(pjx), 36, k_); R.pset(Math.round(pjx) - 1, 35 - (Math.floor(t * 8) % 2), k_); R.pset(Math.round(pjx) + 1, 35 - (Math.floor(t * 8) % 2), k_);
  R.recorte(null);
  R.rect(183, 23, 185, 79, k_); R.rect(149, 50, 219, 51, k_);
  // el reloj de pared que anda
  R.disco(254, 28, 9, k_); R.disco(254, 28, 8, BL); R.disco(254, 28, 7, hex('#f8f4e8')); for (let q = 0; q < 12; q++) R.pset(Math.round(254 + Math.cos(q * 0.52) * 6), Math.round(28 + Math.sin(q * 0.52) * 6), k_);
  R.linea(254, 28, Math.round(254 + Math.cos(t * 0.8) * 6), Math.round(28 + Math.sin(t * 0.8) * 6), T.C.rojo); R.linea(254, 28, 254, 24, k_);
  // el caballete y el lienzo grande, que se va pintando
  R.linea(64, 48, 24, 179, k_); R.linea(65, 48, 25, 179, T.C.maderaS); R.linea(66, 48, 104, 179, k_); R.linea(67, 48, 105, 179, T.C.madera); R.linea(65, 52, 65, 176, T.C.maderaD);
  const X0 = 22, Y0 = 58, W = 84, H = 78, cu = cuadro(W, H), prog = 0.74 + 0.26 * tramo(t, pinta - 0.6, mano + 0.4);
  R.rect(X0 - 2, Y0 - 2, X0 + W + 1, Y0 + H + 1, k_); R.rect(X0 - 1, Y0 - 1, X0 + W, Y0 + H, hex('#f8f4ec'));
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const blk = hh(x >> 2, y >> 2, 11) * 0.3 + (x / W) * 0.7; R.pset(X0 + x, Y0 + y, blk < prog ? cu[y * W + x] : (Math.abs(y - 46 - Math.round(Math.sin(x * 0.1) * 3)) < 1 || (Math.abs(x - 44 - (y >> 2)) < 1 && y > 48) ? hex('#a8a4a0') : hex('#f4f0e8'))); }
  R.rect(16, Y0 + H + 2, 112, Y0 + H + 5, k_); R.rect(17, Y0 + H + 3, 111, Y0 + H + 4, T.C.maderaL);
  // el pintor, subido al taburete: pinceladas con el pincel largo y, al acabar, se aparta un poco a mirarlo
  const atras = tramo(t, mano + 0.4, mano + 0.9), pinta_ = atras < 1;
  const ang = t * 6.3, fr = X0 + Math.min(W - 3, prog * W);
  const pm = R.actor(EL.dibujante, Math.round(lerp(114, 120, atras)), 158, t, { dir: -1, sostiene: pinta_ ? [104, 138] : [112, 146], sonrisa: atras >= 1 }).mano;
  const tip = pinta_ ? [Math.round(Math.min(X0 + W - 2, fr - 2 + Math.cos(ang) * 3)), Math.round(118 + Math.sin(ang * 0.8) * 12)] : [pm[0] - 4, pm[1] - 14];
  R.linea(pm[0], pm[1], tip[0] + 1, tip[1] + 2, hex('#5a3418')); R.linea(pm[0] + 1, pm[1], tip[0] + 2, tip[1] + 2, hex('#8a5a2a'));
  R.rect(tip[0] - 1, tip[1] - 1, tip[0] + 1, tip[1] + 1, hex(['#3a8a4a', '#2a5aa8', '#e8c040'][Math.floor(t * 1.5) % 3]));
  if (pinta_ && t > pinta - 0.6) for (let q = 0; q < 3; q++) { const e = (t * 2 + q / 3) % 1; R.pset(tip[0] + Math.round(e * 4), tip[1] + Math.round(e * 6), hex('#ffffff')); }
  // la compañera mira y, en «brought», pulsa el botón del escáner y señala el monitor
  const pulsa = t > trae - 0.15 && t < trae + 0.5;
  R.actor(EL.lori, 160, 176, t, { dir: t > trae - 0.6 ? 1 : -1, sostiene: pulsa ? [184, 158] : undefined, dedo: t > comp, sonrisa: t > comp + 0.3, habla: t < trae - 0.6 && Math.sin(t * 7) > 0.3, pal: { C: hex('#6a8a3a'), c: hex('#4a6a2a'), W: hex('#6a8a3a') } });
  // la foto del cuadro en el cristal y la barra de luz
  { const cuP = cuadro(22, 5); for (let y = 0; y < 5; y++) for (let x = 0; x < 22; x++) R.pset(196 + x + Math.round((5 - y) * 0.2), 149 + y, cuP[y * 22 + x]); }
  const sc = tramo(t, trae, comp + 0.2);
  if (sc > 0 && sc < 1) { const bx = Math.round(lerp(186, 228, sc)); R.linea(bx, 149, bx, 154, hex('#f0fff8')); R.linea(bx - 1, 149, bx - 1, 154, hex('#8af0c8')); R.linea(bx + 1, 149, bx + 1, 154, hex('#8af0c8')); for (let y = 124; y < 145; y++) if (y % 2) R.pset(bx, y, hex('#c8f8e8')); R.rect(182, 158, 186, 159, hex('#5ae86a')); }
  // el monitor: el cuadro entra de arriba abajo
  const ent = tramo(t, trae + 0.3, comp + 0.5), filas = Math.round(ent * 45), cuM = cuadro(55, 45);
  for (let y = 0; y < filas; y++) for (let x = 0; x < 55; x++) R.pset(251 + x, 97 + y, cuM[y * 55 + x]);
  if (ent > 0 && ent < 1) R.rect(251, 97 + filas, 305, 97 + filas, hex('#e8fff0'));
  R.rect(294, 144, 296, 145, ent > 0 ? hex('#5ae86a') : hex('#2a6a3a'));
};
const p4 = (t) => {
  const s256 = b(0.467), col = b(0.584), cuando = b(0.759), seis = b(0.903);
  const g = T.estudio(R, t, { camara: 'monitores', color: tramo(t, s256 - 0.05, col - 0.1) });
  const x = 121, su = 168, suave = t >= col, mira = t >= col && t < cuando, senala = t >= cuando && t < seis;
  const hm = R.actor(EL.graham, x, su, t, { dir: senala ? -1 : 1, sorpresa: (t > s256 && t < col) || mira, sostiene: mira ? true : undefined, dedo: senala, sonrisa: t >= seis, salto: t > seis && t < seis + 0.5 ? Math.round(Math.sin((t - seis) * 6.3) * 3) : 0 }).mano;
  if (!suave) T.f_pixelar(R, x - 2, su - 30, x + 17, su + 1);
  // al volverse suave: un destello; mientras se mira las manos, chispas alrededor de ellas
  const d = tramo(t, col - 0.05, col + 0.4); if (d > 0 && d < 1) for (let q = 0; q < 10; q++) { const an = q * 0.63, r = 6 + d * 16; R.pset(Math.round(x + 7 + Math.cos(an) * r), Math.round(su - 14 + Math.sin(an) * r), q % 2 ? hex('#fff0a0') : BL); }
  if (mira) { for (let q = 0; q < 4; q++) { const an = t * 4 + q * 1.57, r = 5 + Math.sin(t * 6 + q) * 1.5; const sx = Math.round(hm[0] + Math.cos(an) * r), sy = Math.round(hm[1] + Math.sin(an) * r); R.pset(sx, sy, ['#ff5aa8', '#5ae8f0', '#e8c040', '#8ae85a'].map(hex)[q]); R.pset(sx + 1, sy, BL); }
    const ex = tramo(t, col + 0.1, col + 0.4); if (ex > 0) R.icono('!', x + 4, Math.round(su - 40 - ex * 3), hex('#e8c040'), k_); }
  // el pintor asiente con su pincel junto al lienzo original
  const pm = R.actor(EL.dibujante, 286, su, t, { dir: -1, habla: t > col && t < cuando && Math.sin(t * 8) > 0, sonrisa: t > col, sostiene: t < col ? [Math.round(279 + Math.sin(t * 4) * 2), Math.round(140 + Math.sin(t * 3) * 3)] : undefined, dedo: t > cuando && t < seis }).mano;
  if (t < col) { R.linea(pm[0], pm[1], pm[0] - 3, pm[1] - 6, hex('#8a5a2a')); R.pset(pm[0] - 3, pm[1] - 7, hex('#3a8a4a')); R.pset(pm[0] - 4, pm[1] - 7, hex('#3a8a4a')); }
};
const efectos = [[a(0.345) + 0.3, 'golpecito'], [a(0.40) + 0.3, 'burbujas'],
  [a(0.69), 'pop'], [a(0.837), 'golpecito'], [a(0.92), 'bip'],
  [b(0.117), 'lapiz'], [b(0.291), 'zumbido'], [b(0.371) + 0.4, 'brillo'],
  [b(0.584) - 0.05, 'brillo'], [b(0.903) + 0.05, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1990', efectos, año: 1990 });
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['si-voces'] = ('Voces de verdad', '''// SI-VOCES (frases 56–57), 1991. Tres planos:
// 1. la mesa de un jugador de noche (fondo local): una mano mete el CD en la bandeja (en «CD version»), la bandeja se
//    cierra y en la pantalla el caballero habla con un bocadillo de ondas (en «speak»); los altavoces botan («real voices»);
// 2. la sala de control (corta en «Some recorded»): tras el cristal, un empleado con gafas habla al micrófono y luego
//    otro con barba (en «people who worked»); el técnico mueve los faders y levanta el dedo, contento (en «company»);
// 3. el departamento de música (corta en «Sierra had»): el compositor toca los teclados (en «music department»), los
//    altavoces botan más en «sounded better», y el técnico entra con una tarjeta de sonido en la mano y la levanta en
//    «sound card»: notas por todas partes.''',
COMUN + r'''
const a = (f) => en('voces', f), b = (f) => en('musica', f);
const P2 = a(0.571), P3 = b(-0.02);
// ── plano 1: la mesa del jugador de noche (fondo local) ──
let B1 = null;
const fondo1 = () => {
  if (!B1) { B1 = R.nuevo(); const prev = R.usar(B1); R.recorte(null);
    const pa = grad([58, 92, 100], [30, 52, 62], 5);
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { const dia = ((x + y) % 12 === 0) || ((x - y + 400) % 12 === 0); const luz = Math.max(0, 1 - Math.hypot(x - 40, (y - 70) * 1.2) / 110); R.pset(x, y, dia ? pa[3] : tono(pa, 0.35 + y / 400 - luz * 0.5 + (hh(x >> 1, y >> 1, 6) - 0.5) * 0.15, x, y)); }
    R.rect(0, 96, 319, 99, hex('#2a1e18'));
    // la ventana de noche (el pino y las estrellas se mueven en cada fotograma)
    R.rect(6, 16, 66, 72, k_); R.rect(7, 17, 65, 71, T.C.maderaS); R.rect(10, 20, 62, 68, k_);
    R.rect(4, 72, 68, 76, k_); R.rect(5, 72, 67, 74, T.C.madera);
    // el póster enmarcado: un castillo con su dragón (sin letras)
    R.rect(208, 16, 262, 66, k_); R.rect(209, 17, 261, 65, hex('#c8a040')); R.rect(212, 20, 258, 62, k_);
    { const P = grad([60, 40, 110], [230, 120, 90], 6); for (let y = 21; y < 62; y++) for (let x = 213; x < 258; x++) R.pset(x, y, tono(P, (y - 21) / 42, x, y)); }
    R.rect(226, 40, 246, 61, hex('#3a3046')); R.rect(224, 34, 230, 61, hex('#3a3046')); R.rect(242, 34, 248, 61, hex('#3a3046')); R.rect(234, 44, 238, 50, hex('#f8d870')); R.rect(235, 54, 237, 61, k_);
    for (const x of [224, 228, 242, 246]) R.pset(x, 33, hex('#3a3046'));
    R.poligono([[240, 26], [252, 22], [256, 28], [248, 28]], hex('#2a6a3a')); R.linea(252, 22, 256, 18, hex('#2a6a3a')); R.pset(254, 24, hex('#e84a3a'));
    // la estantería de CD
    R.rect(280, 52, 316, 162, k_); R.rect(281, 53, 315, 161, T.C.maderaS);
    for (let j = 0; j < 4; j++) { const y = 58 + j * 26; R.rect(282, y + 20, 314, y + 22, T.C.madera); for (let i = 0; i < 9; i++) { const x = 283 + i * 3 + (i > 5 ? 3 : 0); R.rect(x, y + 4, x + 2, y + 19, hex(['#c83a3a', '#2a5aa8', '#e8c040', '#3a8a4a', '#6a3a8a', '#e8803a', '#c8ccd8', '#e87a9a', '#5ae8f0'][(i + j * 2) % 9])); R.pset(x + 1, y + 6, BL); } }
    // la mesa de nogal
    const me = grad([120, 78, 46], [70, 44, 26], 5);
    for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { const luz = Math.max(0, 1 - Math.hypot(x - 40, (y - 120) * 1.6) / 120); R.pset(x, y, tono(me, (y - 100) / 100 + (Math.sin(x * 0.07 + Math.sin(y * 0.4) * 2) > 0.85 ? 0.25 : 0) - luz * 0.45, x, y)); }
    R.rect(0, 100, 319, 101, hex('#a8784a'));
    // el ordenador de sobremesa: la caja con las disqueteras y el lector de CD
    R.rect(78, 102, 242, 136, k_); R.rect(79, 103, 241, 135, T.C.beis); R.rect(79, 103, 241, 104, hex('#eee8d6')); R.rect(79, 131, 241, 135, T.C.beisS);
    R.rect(88, 110, 130, 116, k_); R.rect(89, 111, 129, 115, T.C.beisS); R.rect(92, 113, 126, 113, k_); R.rect(88, 120, 130, 126, k_); R.rect(89, 121, 129, 125, T.C.beisS); R.rect(96, 123, 122, 123, k_);
    R.rect(194, 109, 234, 117, k_); R.rect(195, 110, 233, 116, hex('#3a3a44')); R.rect(228, 114, 231, 115, hex('#5a5a66'));
    R.rect(140, 112, 150, 118, k_); R.rect(141, 113, 149, 117, hex('#5a5a66'));
    for (let x = 160; x < 186; x += 3) R.rect(x, 122, x + 1, 128, T.C.beisS);
    // el monitor encima
    R.rect(90, 28, 206, 102, k_); R.rect(91, 29, 205, 101, T.C.beis); R.rect(198, 29, 205, 101, T.C.beisS); R.rect(91, 29, 205, 30, hex('#eee8d6'));
    R.rect(100, 36, 196, 92, k_);
    // los dos altavoces (los conos botan en cada fotograma)
    for (const x0 of [48, 246]) { R.rect(x0, 82, x0 + 26, 132, k_); R.rect(x0 + 1, 83, x0 + 25, 131, hex('#3a3a44')); R.rect(x0 + 1, 83, x0 + 3, 131, hex('#4a4a58')); }
    // la caja del CD abierta con su portada y el disquete
    R.poligono([[14, 150], [62, 146], [66, 172], [16, 176]], k_); R.poligono([[16, 151], [61, 147], [64, 171], [18, 174]], hex('#c8d0dc'));
    { const P = grad([90, 140, 220], [240, 190, 120], 5); for (let y = 152; y < 170; y++) for (let x = 20; x < 58; x++) R.pset(x, y, tono(P, (y - 150) / 22, x, y)); R.rect(30, 158, 46, 169, hex('#c8c0b0')); R.rect(28, 155, 32, 169, hex('#c8c0b0')); R.rect(44, 155, 48, 169, hex('#c8c0b0')); R.rect(28, 154, 32, 155, hex('#3a5ab0')); R.rect(44, 154, 48, 155, hex('#3a5ab0')); R.rect(37, 164, 39, 169, k_); }
    // el teclado y el ratón, delante del ordenador
    R.poligono([[100, 146], [218, 146], [224, 170], [94, 170]], k_); R.poligono([[101, 147], [217, 147], [222, 168], [96, 168]], T.C.beis); R.rect(96, 167, 222, 169, T.C.beisS);
    for (let j = 0; j < 4; j++) { const y = 149 + j * 5, x0 = 103 - j * 1.4, x1 = 213 + j * 1.4; for (let i = 0; i < 14; i++) { const kx = Math.round(x0 + i * (x1 - x0) / 14); R.rect(kx, y, kx + 6, y + 3, k_); R.rect(kx + 1, y, kx + 6, y + 2, hex('#eee8d6')); R.rect(kx + 1, y + 2, kx + 6, y + 2, T.C.beisS); } }
    R.rect(232, 150, 244, 166, k_); R.rect(233, 151, 243, 165, T.C.beis); R.rect(241, 151, 243, 165, T.C.beisS); R.linea(233, 156, 243, 156, T.C.beisS); R.linea(238, 150, 236, 136, hex('#5a5a66'));
    R.linea(160, 146, 160, 136, hex('#5a5a66'));
    R.usar(prev); }
  R.copiar(B1);
};
// el CD: un disco plateado con los reflejos del arcoíris, achatado por la perspectiva
const cd = (x, y, t, s = 1) => { const rx = 11 * s, ry = 4 * s; for (let j = -ry - 1; j <= ry + 1; j++) for (let i = -rx - 1; i <= rx + 1; i++) { const d = (i * i) / (rx * rx) + (j * j) / (ry * ry);
  if (d > 1.25) continue; if (d > 1) { R.pset(x + i, y + j, k_); continue; } if (d < 0.05) { R.pset(x + i, y + j, hex('#3a3a44')); continue; }
  const an = Math.atan2(j * 2.6, i) + t * 2; R.pset(x + i, y + j, ['#e8ecf4', '#c8ccd8', '#ff9ad8', '#9ae8ff', '#fff09a', '#c8ccd8', '#e8ecf4', '#b8f0b8'].map(hex)[Math.floor(((an / Math.PI + 1) * 4)) & 7]); } };
const p1 = (t) => {
  fondo1();
  const mete = a(0.06), cierra = a(0.13), habla = a(0.30), voces = a(0.39);
  // por la ventana: las estrellas, la luna y el pino al viento
  R.recorte([11, 21, 61, 67]); for (let y = 21; y <= 67; y++) R.rect(11, y, 61, y, y < 44 ? hex('#141a3e') : hex('#1e2650'));
  for (let q = 0; q < 12; q++) R.pset(12 + Math.floor(hh(q, 1, 3) * 48), 22 + Math.floor(hh(q, 2, 3) * 30), Math.sin(t * 3 + q) > 0.3 ? BL : T.C.grisL);
  R.disco(48, 30, 5, hex('#f2eee2')); R.disco(50, 29, 4, hex('#141a3e'));
  { const sw = Math.round(Math.sin(t * 1.5) * 1.5); for (let j = 0; j < 30; j++) R.linea(26 - (j >> 1) + Math.round(sw * (1 - j / 30)), 38 + j, 26 + (j >> 1) + Math.round(sw * (1 - j / 30)), 38 + j, j % 4 ? hex('#0e1e1a') : hex('#1a3028')); }
  R.recorte(null); R.rect(35, 21, 36, 67, k_); R.rect(11, 44, 61, 45, k_);
  // la lámpara de la mesa, con una polilla que da vueltas
  R.rect(20, 92, 40, 98, k_); R.rect(21, 93, 39, 97, hex('#c8a040')); R.linea(30, 92, 44, 58, k_); R.linea(31, 92, 45, 58, hex('#a87a18'));
  R.poligono([[34, 48], [58, 52], [56, 64], [38, 60]], k_); R.poligono([[36, 50], [56, 53], [54, 62], [39, 59]], hex('#2a6a3a')); R.linea(39, 61, 54, 63, hex('#fff0a0'));
  { const an = t * 5, mx = Math.round(50 + Math.cos(an) * 9), my = Math.round(70 + Math.sin(an * 1.3) * 5); R.pset(mx, my, hex('#d8c8a0')); R.pset(mx - 1, my - (Math.floor(t * 14) % 2), hex('#f2eee2')); R.pset(mx + 1, my - (Math.floor(t * 14) % 2), hex('#f2eee2')); }
  // la bandeja del lector: sale, recibe el CD y se cierra
  const sale = 1 - tramo(t, cierra, cierra + 0.35), ty = 117 + Math.round(sale * 12);
  if (sale > 0) { R.poligono([[196, 117], [232, 117], [236, ty], [192, ty]], k_); R.poligono([[197, 117], [231, 117], [234, ty - 1], [194, ty - 1]], hex('#2a2a34')); }
  const dentro = t > mete;
  if (dentro && sale > 0.15) cd(214, Math.round(117 + sale * 6), t, 1.1);
  // la mano trae el CD desde abajo y lo deja en la bandeja
  const vm = tramo(t, 0, mete), vv = tramo(t, mete + 0.05, cierra);
  if (!dentro) { const cx = Math.round(lerp(262, 214, vm)), cy = Math.round(lerp(160, 123, vm)); cd(cx, cy, t, 1.4); T.brazo(R, cx + 58, 206, cx + 16, cy + 2, '#6a3a5a', -1, { codo: [cx + 44, 188] }); }
  else if (vv < 1) { const wx = Math.round(lerp(226, 280, vv)), wy = Math.round(lerp(126, 196, vv)); T.brazo(R, wx + 42, 210, wx, wy, '#6a3a5a', -1, { codo: [wx + 30, 194] }); }
  // la luz del lector parpadea al leer
  R.rect(218, 114, 222, 115, t > cierra + 0.3 && Math.floor(t * 9) % 2 ? hex('#ff5a3a') : hex('#5a2a2a'));
  R.rect(143, 114, 147, 116, Math.floor(t * 2) % 2 ? hex('#5ae86a') : hex('#2a6a3a'));
  // la pantalla: el caballero en la sala del trono; habla con un bocadillo de ondas
  R.recorte([101, 37, 195, 91]);
  { const enc = tramo(t, cierra + 0.4, cierra + 0.9), P = grad([120, 90, 150], [60, 40, 90], 5); for (let y = 37; y <= 91; y++) for (let x = 101; x <= 195; x++) R.pset(x, y, enc <= 0 ? hex('#101018') : y > 78 ? tono(grad([160, 60, 70], [110, 30, 50], 3), (y - 78) / 14, x, y) : tono(P, (y - 37) / 50 + ((x - 101) % 16 === 0 ? 0.3 : 0), x, y));
    if (enc > 0) { for (const vx of [120, 176]) { R.rect(vx, 46, vx + 8, 66, k_); R.rect(vx + 1, 47, vx + 7, 65, hex('#5ae8f0')); R.rect(vx + 4, 47, vx + 4, 65, k_); }
      for (const tx of [110, 186]) { R.rect(tx, 60, tx + 1, 78, hex('#5a3a24')); R.disco(tx, 58, 2, Math.sin(t * 12 + tx) > 0 ? hex('#ffd060') : hex('#ff9030')); }
      R.actor(EL.graham, 136, 88, t, { dir: 1, habla: t > habla && t < voces + 0.6 && Math.sin(t * 11) > -0.2, sonrisa: t > voces + 0.6 });
      R.actor(EL.reyCuento, 160, 88, t, { dir: -1, sonrisa: t > voces }); }
    if (enc < 1 && enc > 0) R.rect(101, 37 + Math.round(enc * 54), 195, 38 + Math.round(enc * 54), BL); }
  R.recorte(null);
  if (t > habla && t < voces + 1.1) bocadillo(118, 40, 28, 14, t, 143, 60);
  for (let q = 0; q < 10; q++) R.pset(104 + q, 40 + Math.round(q * 0.4), hex('#ffffff'));
  // los conos de los altavoces botan con las voces
  const bo = t > habla ? 0.4 + 0.6 * Math.max(0, Math.sin(t * 13)) * (t > voces ? 1 : 0.5) : 0;
  for (const x0 of [48, 246]) { const r = 7 + Math.round(bo * 2); R.disco(x0 + 13, 116, r + 1, k_); R.disco(x0 + 13, 116, r, hex('#5a5a66')); R.disco(x0 + 13, 116, Math.max(2, r - 4), hex('#2a2a34')); R.disco(x0 + 13, 95, 4, k_); R.disco(x0 + 13, 95, 3, hex('#5a5a66')); R.pset(x0 + 12, 94, BL);
    if (t > voces) for (let q = 1; q <= 2; q++) { const rr = 10 + q * 5 + ((t * 20) % 5); for (let an = -0.7; an <= 0.7; an += 0.12) { const s = x0 < 100 ? -1 : 1; R.pset(Math.round(x0 + 13 + s * Math.cos(an) * rr), Math.round(108 + Math.sin(an) * rr), q === 1 ? hex('#8ad0ff') : hex('#5a8ad8')); } } }
  // la taza que humea
  R.rect(72, 140, 86, 158, k_); R.rect(73, 141, 85, 157, hex('#e8e4d8')); R.rect(73, 141, 75, 157, BL); R.rect(86, 144, 90, 154, k_); R.rect(87, 146, 88, 152, hex('#e8e4d8')); R.rect(74, 141, 84, 142, hex('#5a3418'));
  for (let q = 0; q < 2; q++) { const e = (t * 0.5 + q / 2) % 1; for (let j = 0; j < 3; j++) R.pset(Math.round(77 + q * 4 + Math.sin(t * 3 + q + e * 6 + j) * 2), Math.round(136 - e * 22 - j), e < 0.6 ? hex('#f2f2f2') : hex('#a8b0c0')); }
};
const p2 = (t) => {
  const g1 = a(0.63), g2 = a(0.743), bien = a(0.91);
  const g = T.estudio(R, t, { encuadre: 'cabina', camara: 'micro', grabando: true });
  // dentro de la cabina: los dos empleados se turnan al micro
  const h1 = t > g1 - 0.1 && t < g2 - 0.15, h2 = t > g2 && t < bien + 0.3;
  R.actor(EL.dibujante2, 136, 116, t, { dir: 1, habla: h1 && Math.sin(t * 11) > -0.3, sonrisa: t > g2 });
  R.actor(EL.dibujante, 172, 116, t, { dir: -1, habla: h2 && Math.sin(t * 10) > -0.3, sonrisa: t > bien, dedo: t > bien });
  T.i_estudioDelante(R, t, { encuadre: 'cabina', camara: 'micro', grabando: true });
  if (h1) bocadillo(110, 52, 26, 14, t, 140, 82, hex('#c83a3a'));
  if (h2) bocadillo(184, 52, 26, 14, t, 180, 82, hex('#3a8a4a'));
  // el técnico mueve los faders y levanta el dedo
  const tm = R.actor(EL.tecnico, 292, 174, t, { dir: -1, sostiene: t < bien ? [Math.round(278 + Math.sin(t * 2.4) * 4), 150] : undefined, dedo: t >= bien, sonrisa: t >= bien });
  const v = tramo(t, bien, bien + 0.3); if (v > 0) { T.visto(R, 296, Math.round(132 - v * 6), 1); }
};
const p3 = (t) => {
  const dep = b(0.176), mejor = b(0.537), tarj = b(0.831);
  const g = T.estudio(R, t, { encuadre: 'musica', bota: t < mejor ? 0.5 : t < tarj ? 0.8 : 1 });
  // el compositor toca
  const toca = t > dep - 0.3;
  R.actor(EL.compositor, 206, 160, t, { dir: -1, sostiene: toca ? [Math.round(184 - Math.abs(Math.sin(t * 5)) * 14), 124 + (Math.floor(t * 8) % 2)] : undefined, sonrisa: toca, sorpresa: t > tarj && t < tarj + 0.6 });
  if (toca) for (let q = 0; q < 3; q++) { const e = (t * 0.7 + q / 3) % 1, nx = Math.round(150 - q * 20 + Math.sin(e * 6 + q) * 4), ny = Math.round(118 - e * 50); R.rect(nx, ny, nx + 2, ny + 1, k_); R.linea(nx + 2, ny + 1, nx + 2, ny - 5, k_); R.pset(nx + 3, ny - 5, k_); R.pset(nx + 1, ny, ['#c83a3a', '#2a5aa8', '#3a8a4a'].map(hex)[q]); }
  // el técnico entra con la tarjeta de sonido y la levanta
  const v = tramo(t, mejor + 0.1, tarj - 0.1), x = Math.round(lerp(-18, 58, v)), alza = t > tarj;
  const m = R.actor(EL.tecnico, x, 160, t, { dir: 1, anda: v > 0 && v < 1, sostiene: alza ? [x + 16, 118] : true, sonrisa: alza }).mano;
  const cx = m[0] + 1, cy = m[1] - 6;
  R.rect(cx - 9, cy - 5, cx + 9, cy + 5, k_); R.rect(cx - 8, cy - 4, cx + 8, cy + 3, hex('#2a7a4a')); R.rect(cx - 8, cy + 4, cx + 8, cy + 4, T.C.oro);
  for (let i = -6; i <= 6; i += 2) R.pset(cx + i, cy + 4, T.C.oroS); R.rect(cx - 6, cy - 2, cx - 1, cy + 1, k_); R.pset(cx - 5, cy - 2, BL); R.rect(cx + 2, cy - 3, cx + 4, cy - 2, k_); R.rect(cx + 5, cy, cx + 6, cy + 1, hex('#3a6ac8')); R.pset(cx + 6, cy - 3, alza && Math.floor(t * 6) % 2 ? hex('#5ae86a') : hex('#2a5a3a'));
  R.rect(cx + 9, cy - 5, cx + 10, cy + 5, hex('#c8ccd8'));
  if (alza) { const e = tramo(t, tarj, tarj + 0.6); for (let q = 0; q < 10; q++) { const an = q * 0.63 + t, r = 8 + e * 14; R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r * 0.8), q % 2 ? hex('#fff0a0') : BL); }
    for (let q = 0; q < 5; q++) { const e2 = ((t - tarj) * 0.8 + q / 5) % 1, nx = Math.round(254 - 60 * e2 + Math.sin(q * 2 + e2 * 7) * 8), ny = Math.round(100 - e2 * 60 + q * 6); R.rect(nx, ny, nx + 2, ny + 1, k_); R.linea(nx + 2, ny + 1, nx + 2, ny - 5, k_); R.pset(nx + 3, ny - 5, k_); R.pset(nx + 1, ny, ['#e8c040', '#ff5aa8', '#5ae8f0', '#8ae85a', '#c83a3a'].map(hex)[q]); } }
};
const efectos = [[a(0.06), 'golpecito'], [a(0.13), 'interruptor'], [a(0.39), 'pop'],
  [a(0.571) + 0.15, 'interruptor'], [a(0.91), 'brillo'],
  [b(0.537), 'boing'], [b(0.831), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1991 });
''')
