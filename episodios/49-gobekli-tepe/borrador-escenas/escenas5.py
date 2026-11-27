E = {}

# ── utilidades (las del 49, como en escenas4) y lo mío común a las dos escenas ──
UTIL = r'''
const ri = Math.round, H = (s) => hex(s), K = T.C.k;
const B4M = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4M[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const cl = (u) => Math.max(0, Math.min(1, u)), ease = (u) => u * u * (3 - 2 * u);
const ps = (x, y, c) => R.pset(ri(x), ri(y), c);
const rr = (x0, y0, x1, y1, c) => R.rect(ri(Math.min(x0, x1)), ri(Math.min(y0, y1)), ri(Math.max(x0, x1)), ri(Math.max(y0, y1)), c);
const tine = (x, y, c, a) => { x = ri(x); y = ri(y); if (x < 0 || y < 0 || x > 319 || y > 179) return; const B = R.buf, i = y * 320 + x; B[i] = mez(B[i], c, a); };
const pal = (a) => a.map((c) => H(c));
const rmp = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return ramp[Math.max(0, Math.min(ramp.length - 1, l))]; };
// aparece con un rebote (0 antes de a; 1 al final)
const pop = (t, a, d = 0.3) => { const u = Math.max(0, Math.min(1, (t - a) / d)); return u <= 0 ? 0 : u < 1 ? 1 - Math.pow(1 - u, 3) * Math.cos(u * 7) : 1; };
// las cifras de 3 × 5 (etiquetas, hojas de resultados), sin letras
const DIG = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001001001001', 8: '111101111101111', 9: '111101111001111' };
const cifras = (s, x, y, c, n = 99) => { let k = 0; for (const ch of String(s)) { if (k++ >= n) break; const g = DIG[ch]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } };
// una nube de tres tonos (sombra, cuerpo, luz) hecha de bollos, con el borde tramado
const BOLLOS = [[-0.36, 0.08, 0.26], [-0.12, -0.12, 0.33], [0.16, -0.06, 0.3], [0.38, 0.1, 0.22], [0.02, 0.14, 0.3], [-0.24, 0.16, 0.2]];
const nube = (cx, cy, w, cs) => {
  const x0 = ri(cx - w * 0.65), x1 = ri(cx + w * 0.65), y0 = ri(cy - w * 0.48), y1 = ri(cy + w * 0.36);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    let d = 9; for (const [a, b, r] of BOLLOS) { const q = ((x - cx - a * w) ** 2 + ((y - cy - b * w) * 1.5) ** 2) / (r * w) ** 2; if (q < d) d = q; }
    if (d > 1 || (d > 0.8 && b4(x, y) < (d - 0.8) * 5)) continue;
    const v = (y - (cy - w * 0.3)) / (w * 0.5) + (d > 0.7 ? 0.25 : 0);
    R.pset(x, y, v > 0.82 ? cs[0] : v > 0.42 + b4(x, y) * 0.2 ? cs[1] : cs[2]); }
};
// un pájaro lejano que bate las alas
const pajaro = (x, y, t, c, k = 0) => { x = ri(x); y = ri(y); const f = Math.floor(t * 6 + k * 1.7) % 3; ps(x, y, c); if (f === 0) { ps(x - 1, y - 1, c); ps(x + 1, y - 1, c); ps(x - 2, y - 1, c); ps(x + 2, y - 1, c); } else if (f === 1) { ps(x - 1, y, c); ps(x + 1, y, c); ps(x - 2, y - 1, c); ps(x + 2, y - 1, c); } else { ps(x - 1, y + 1, c); ps(x + 1, y + 1, c); ps(x - 2, y + 1, c); ps(x + 2, y + 1, c); } };
// la sombra blanda en el suelo
const sombraS = (cx, cy, w, a = 0.35) => { for (let i = -w; i <= w; i++) { const k = 1 - (i / (w + 1)) ** 2; tine(cx + i, cy, K, a * k); if (Math.abs(i) < w * 0.7) tine(cx + i, cy + 1, K, a * 0.6 * k); } };
// destello de cuatro puntas
const destello = (x, y, r, c = H('#fff8d0')) => { x = ri(x); y = ri(y); for (let k = 1; k <= r; k++) { ps(x + k, y, c); ps(x - k, y, c); ps(x, y + k, c); ps(x, y - k, c); } ps(x, y, H('#ffffff')); };

// ── lo mío, común a las dos escenas ──
const GB = T.GB;
// un fondo fijo se pinta una vez y se guarda (después solo se copia: una pasada por fotograma)
const CAPAS = {};
const capa = (k, f) => { const B = R.buf; if (CAPAS[k]) { B.set(CAPAS[k]); return; } f(); CAPAS[k] = B.slice(); };
// degradado tramado por filas entre los tonos de una rampa (de arriba abajo), de y0 a y1
const degradado = (y0, y1, ramp, x0 = 0, x1 = 319) => { for (let y = y0; y <= y1; y++) { const v = (y - y0) / Math.max(1, y1 - y0) * (ramp.length - 1); for (let x = x0; x <= x1; x++) R.pset(x, y, rmp(ramp, v, x, y)); } };
// el cielo vivo: nubes de tres tonos a tres velocidades (las de lejos más lentas) y pájaros (nunca en la esquina de Atom)
const NUB = pal(['#8ea4c0', '#d6e0ec', '#fbfdff']);
const nubesVivas = (t, yTope, cs = NUB, k0 = 0) => {
  for (const [x0, y, w, v] of [[40, yTope - 18, 46, 1.2], [210, yTope - 26, 34, 0.7], [130, yTope - 8, 28, 2.1], [300, yTope - 12, 40, 1.6]]) {
    const x = ((x0 + t * v * 3 + k0 * 70) % 420) - 50; if (x > 250 && y < 50) continue; nube(x, y, w, cs); }
};
const pajaros = (t, y0, c, n = 4) => { for (let k = 0; k < n; k++) { const x = ((k * 83 + t * (9 + k * 2)) % 360) - 20, y = y0 + (k % 3) * 5 + Math.sin(t * 1.3 + k) * 2; if (x > 268 && y < 50) continue; pajaro(x, y, t, c, k); } };
// el suelo con su textura: tierra en dos tonos con terrones, guijarros con luz y sombra y matas
const tierra = (y0, y1, ramp, sem = 1) => { for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) {
  const n = h2(x >> 1, y >> 1, sem) * 0.9 + h2(x >> 3, y >> 2, sem + 1) * 0.8 + (y - y0) / (y1 - y0 + 1) * 0.9; R.pset(x, y, rmp(ramp, n, x, y)); } };
const guijarro = (x, y, r, cs) => { x = ri(x); y = ri(y); R.disco(x + 1, y + 1, r, cs[0]); R.disco(x, y, r, cs[1]); if (r > 1) R.disco(x - 1, y - 1, Math.max(1, r - 1), cs[2]); ps(x - 1, y - 1, cs[3]); };
const mata = (x, y, n, alto, t, cs) => { for (let j = 0; j < n; j++) { const a = (j / Math.max(1, n - 1) - 0.5) * 1.6, al = alto * (0.6 + h2(x, j, 9) * 0.5), w = Math.sin(t * 1.7 + x * 0.05 + j) * al / 12;
  const ex = ri(x + Math.sin(a) * al * 0.5 + w), ey = ri(y - Math.cos(a) * al); R.linea(ri(x), ri(y), ex, ey, j % 3 ? cs[1] : cs[0]); ps(ex, ey, cs[2]); } };
// una espiga de escanda silvestre: tallo que se curva con el viento, espiga de granos en espiga y barbas largas
const ESP = pal(['#6a4a18', '#a8782c', '#d8a848', '#f0d27a', '#fff0b8']);
const espiga = (x, yb, alto, inc, cs = ESP, g = 1, sinCabeza = false) => {
  const top = [x + inc, yb - alto], n = Math.max(2, Math.ceil(alto));
  for (let i = 0; i <= n; i++) { const u = i / n, xx = x + inc * u * u, yy = yb - alto * u; ps(xx, yy, u > 0.6 ? cs[2] : cs[1]); if (g > 1) ps(xx + 1, yy, cs[0]); }
  if (sinCabeza) return top;
  const L = Math.round(7 * g), dx = inc / alto * 2;
  for (let j = 0; j < L; j++) { const cx = top[0] + dx * j * 0.5, cy = top[1] - j; const lado = j % 2 ? 1 : -1;
    ps(cx, cy, cs[1]); ps(cx + lado, cy, cs[2]); if (g > 1) { ps(cx + lado * 2, cy, cs[3]); ps(cx - lado, cy - 1, cs[2]); }
    if (j % 2 === 0) { const bl = Math.round(3 + 3 * g); for (let b = 1; b <= bl; b++) ps(cx + lado * (1 + b * 0.35) + inc * 0.04 * b, cy - b, b > bl - 2 ? cs[4] : cs[3]); } }
  ps(top[0] + dx * L * 0.5, top[1] - L, cs[3]);
  return top;
};
// una cesta de mimbre (vista de frente) con lo que lleve dentro
const cesta = (x, y, w, hh, dentro) => { x = ri(x); y = ri(y); const W2 = ri(w / 2);
  R.poligono([[x - W2 - 1, y - hh - 1], [x + W2 + 1, y - hh - 1], [x + W2 - 2, y + 1], [x - W2 + 2, y + 1]], K);
  if (dentro) dentro(x, y - hh);
  R.poligono([[x - W2, y - hh], [x + W2, y - hh], [x + W2 - 3, y], [x - W2 + 3, y]], (xx, yy) => ((xx + (yy >> 1)) % 4 < 2) ^ ((yy % 3) === 0) ? H('#b88a4a') : H('#8a6230'));
  R.linea(x - W2, y - hh, x + W2, y - hh, H('#d8aa62')); R.linea(x - W2 + 1, y - hh + 1, x + W2 - 1, y - hh + 1, H('#6a4422')); };
// esquinas doradas que laten alrededor de lo que se nombra
const esquinas = (x0, y0, x1, y1, t, a = 1) => { if (a <= 0) return; const l = ri(1 + Math.sin(t * 7) * 1.2), L = ri(4 + 3 * a), c = H('#ffd860'), c2 = H('#7a5410');
  for (const [qx, qy, sx, sy] of [[x0 - l, y0 - l, 1, 1], [x1 + l, y0 - l, -1, 1], [x0 - l, y1 + l, 1, -1], [x1 + l, y1 + l, -1, -1]]) {
    R.linea(qx + sx, qy + sy, qx + sx * L + sx, qy + sy, c2); R.linea(qx + sx, qy + sy, qx + sx, qy + sy * L + sy, c2); R.linea(qx, qy, qx + sx * L, qy, c); R.linea(qx, qy, qx, qy + sy * L, c); } };
// un bocadillo propio (blanco con su rabito) para meter un dibujo dentro
const bocata = (cx, cy, w, hh, u, dentro) => { if (u <= 0) return; const s = Math.min(1, u), W2 = ri(w / 2 * s), H2 = ri(hh / 2 * s); cx = ri(cx); cy = ri(cy);
  rr(cx - W2 - 1, cy - H2, cx + W2 + 1, cy + H2, K); rr(cx - W2, cy - H2 - 1, cx + W2, cy + H2 + 1, K); rr(cx - W2, cy - H2, cx + W2, cy + H2, H('#fbfbf4'));
  rr(cx - W2, cy + H2 - 1, cx + W2, cy + H2, H('#d8dcd4')); R.poligono([[cx - 3, cy + H2], [cx + 3, cy + H2], [cx - 4, cy + H2 + 5]], K); R.poligono([[cx - 2, cy + H2], [cx + 2, cy + H2], [cx - 3, cy + H2 + 3]], H('#fbfbf4'));
  if (s >= 1 && dentro) dentro(cx, cy); };
// una oveja de dibujo (para el bocadillo del animal doméstico que no hay)
const oveja = (x, y) => { R.disco(x, y, 5, K); R.disco(x, y, 4, H('#f4f2ea')); R.disco(x - 2, y - 1, 2, H('#ffffff')); rr(x + 3, y - 4, x + 7, y, K); rr(x + 4, y - 3, x + 6, y - 1, H('#3a3430')); for (const i of [-3, -1, 2, 4]) rr(x + i, y + 4, x + i, y + 7, K); };
// la piedra de juguete con forma de T y la casita de adobe (de juguete), para el estudio
const casita = (x, y, w, hh, k) => { x = ri(x); y = ri(y);
  rr(x - w - 1, y - hh - 1, x + w + 1, y, K); rr(x - w, y - hh, x + w, y - 1, H(k % 2 ? '#c89a68' : '#d4a874')); rr(x - w, y - hh, x + w, y - hh + 1, H('#e8c490')); rr(x + w - 2, y - hh, x + w, y - 1, H('#a87a4a'));
  rr(x - w - 2, y - hh - 3, x + w + 2, y - hh - 1, K); rr(x - w - 1, y - hh - 2, x + w + 1, y - hh - 2, H('#8a6a4a'));
  for (let j = y - hh + 4; j < y - 2; j += 4) R.linea(x - w + 1, j, x + w - 3, j, H('#b8885a'));
  rr(x - 2, y - hh + 3, x + 1, y - hh + 6, K); rr(x - 1, y - hh + 4, x, y - hh + 5, H('#3a2a1a'));
  R.linea(x + w - 5, y - hh - 9, x + w - 5, y - hh - 2, H('#6a4a2a')); R.linea(x + w - 3, y - hh - 9, x + w - 3, y - hh - 2, H('#6a4a2a')); for (let j = y - hh - 8; j < y - hh - 2; j += 2) R.linea(x + w - 5, j, x + w - 3, j, H('#8a6a3a')); };
// el humo que sube de una chimenea o de una hoguera
const humo = (x, y, t, n = 5, alto = 30, a = 0.5) => { for (let k = 0; k < n; k++) { const u = (t * 0.4 + k / n) % 1; for (let q = 0; q < 3; q++) tine(x + Math.sin(u * 5 + k) * 4 + q, y - u * alto, H('#d8dcdc'), a * (1 - u)); } };
// un globo terráqueo que gira (continentes que pasan) con su brillo
const globo = (cx, cy, r, t) => { cx = ri(cx); cy = ri(cy); R.disco(cx + 1, cy + 1, r + 1, K); R.disco(cx, cy, r + 1, K);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = (i * i + j * j) / (r * r); if (d > 1) continue;
    const lon = Math.asin(i / Math.sqrt(Math.max(1e-6, r * r - j * j))) + t * 0.8, lat = j / r, tierraV = Math.sin(lon * 2.1) + Math.sin(lon * 3.7 + lat * 4) * 0.6 + Math.cos(lat * 5) * 0.4 > 0.7;
    const luz = 1.6 - (i + j) / r * 0.9 - d * 0.6; R.pset(cx + i, cy + j, tierraV ? rmp(pal(['#2a5a2a', '#4a8a3a', '#7ab04a', '#a8d06a']), luz, i, j) : rmp(pal(['#1a3a7a', '#2a5aa8', '#4a82d0', '#7aacec']), luz, i, j)); }
  ps(cx - ri(r * 0.4), cy - ri(r * 0.5), H('#ffffff')); ps(cx - ri(r * 0.4) + 1, cy - ri(r * 0.5), H('#dfeeff')); };
// una hoja de periódico que vuela (sin letras: una foto del pilar y renglones grises)
const hoja = (x, y, a) => { x = ri(x); y = ri(y); const w = 6, hh = 8, c = Math.cos(a), s = Math.sin(a), P = (u, v) => [x + u * c - v * s, y + u * s + v * c];
  R.poligono([P(-w - 1, -hh - 1), P(w + 1, -hh - 1), P(w + 1, hh + 1), P(-w - 1, hh + 1)], K); R.poligono([P(-w, -hh), P(w, -hh), P(w, hh), P(-w, hh)], H('#f2eee2'));
  const [a1, b1] = P(-3, -5); rr(a1, b1, a1 + 2, b1 + 4, H('#b8a888')); rr(a1 - 1, b1, a1 + 3, b1, H('#b8a888'));
  for (let k = 0; k < 3; k++) { const [p, q] = P(1, -4 + k * 3), [p2, q2] = P(5, -4 + k * 3); R.linea(ri(p), ri(q), ri(p2), ri(q2), H('#8a8a8a')); }
  for (let k = 0; k < 2; k++) { const [p, q] = P(-4, 3 + k * 3), [p2, q2] = P(5, 3 + k * 3); R.linea(ri(p), ri(q), ri(p2), ri(q2), H('#8a8a8a')); } };
// el icono del pilar en T y el de la casa (para el bocadillo de Schmidt)
const iconoT = (x, y, c = H('#c8b890')) => { rr(x - 4, y - 7, x + 4, y - 4, K); rr(x - 3, y - 6, x + 3, y - 5, c); rr(x - 2, y - 4, x + 2, y + 3, K); rr(x - 1, y - 4, x + 1, y + 2, c); };
const iconoCasa = (x, y) => { R.poligono([[x - 5, y - 2], [x, y - 7], [x + 5, y - 2]], K); R.poligono([[x - 3, y - 2], [x, y - 5], [x + 3, y - 2]], H('#c84a3a')); rr(x - 4, y - 2, x + 4, y + 3, K); rr(x - 3, y - 2, x + 3, y + 2, H('#e8c48a')); rr(x - 1, y, x, y + 2, H('#6a4422')); };
const flecha = (x0, y, x1, c = H('#3a3a3a')) => { R.linea(x0, y, x1, y, c); ps(x1 - 1, y - 1, c); ps(x1 - 1, y + 1, c); ps(x1 - 2, y - 2, c); ps(x1 - 2, y + 2, c); };
'''

# ── el último plano de gb-cazadores (el banquete). gb-banquete lo congela: es este MISMO bloque, copiado literal ──
BANQ = r'''
// BANQ · el banquete junto al recinto al atardecer (último plano de gb-cazadores; gb-banquete lo congela con este MISMO
// bloque, literal). Los de las cuerdas llegan con los rollos de cuero al hombro; la cocinera reparte papilla del cuenco
// grande; uno suelta su rollo («ropes») y todos acaban con su cuenco en la mano. El niño corre con el odre.
const cuenquito = (x, y) => { x = ri(x); y = ri(y); rr(x - 4, y - 3, x + 4, y + 1, K); rr(x - 3, y - 2, x + 3, y, H('#b89870')); rr(x - 3, y - 3, x + 3, y - 2, H('#f0e2b8')); ps(x - 2, y - 3, H('#ffffff')); rr(x + 2, y - 1, x + 3, y, H('#8a7050')); };
const rollo = (x, y) => { x = ri(x); y = ri(y); for (const [r, c] of [[6, K], [5, H('#7a4a26')], [4, H('#a86a3a')], [3, H('#7a4a26')], [2, H('#c88a52')], [1, H('#5a3418')]]) R.disco(x, y, r, c); ps(x - 3, y - 3, H('#e0a86a')); };
const piel = (x, y, w, c1, c2) => { R.poligono([[x - w, y], [x - w + 3, y - 4], [x + w - 2, y - 5], [x + w + 1, y - 1], [x + w - 3, y + 3], [x - w + 2, y + 3]], K);
  R.poligono([[x - w + 1, y], [x - w + 3, y - 3], [x + w - 2, y - 4], [x + w, y - 1], [x + w - 3, y + 2], [x - w + 2, y + 2]], (xx, yy) => h2(xx, yy, 3) > 0.6 ? c2 : c1); };
const banqPlano = (t, enC) => {
  const LLEGAN = enC(0.876), FEED = enC(0.9145), HUND = enC(0.922), PULL = enC(0.9562), ROPES = enC(0.978);
  T.recinto(R, t, { encuadre: 'banquete' });
  // el suelo de delante: pieles tendidas, cuencos, guijarros, una lasca y un hueso de gacela roído
  piel(118, 172, 16, H('#a87a4a'), H('#8a5a32')); piel(232, 170, 13, H('#c8a070'), H('#9a7448'));
  for (const [x, y, r] of [[60, 160, 2], [256, 162, 2], [96, 176, 1], [206, 177, 1], [150, 158, 1]]) guijarro(x, y, r, pal(['#4a3a2a', '#8a7a62', '#b0a088', '#e0d4bc']));
  rr(244, 176, 252, 177, K); rr(245, 175, 251, 175, H('#efe6cc')); ps(244, 174, H('#efe6cc')); ps(252, 174, H('#efe6cc'));
  cuenquito(132, 170); cuenquito(222, 168);
  // el cuenco grande con su papilla, la cocinera detrás que reparte
  const dar = tramo(t, FEED - 0.1, FEED + 0.6);
  const ck = R.actor(GB.cazadoraGB, 212, 160, t, { dir: -1, sonrisa: true, habla: t > LLEGAN + 0.6 && t < FEED && Math.sin(t * 8) > 0, sostiene: dar > 0 && dar < 1 ? [ri(lerp(204, 176, dar)), 146] : true });
  if (dar === 0) cuenquito(ck.mano[0], ck.mano[1] - 1);
  T.d_cuenco(R, 182, 172, { lleno: 1, t, cuchara: true });
  // los tres de las cuerdas llegan con los rollos de cuero al hombro
  const quien = [[GB.cazadorGB, 78, 0], [GB.cazador2GB, 104, 0.35], [GB.cazadora2GB, 136, 0.7]];
  quien.forEach(([def, xf, d], k) => {
    const u = tramo(t, LLEGAN + d, LLEGAN + d + 1.6), x = ri(lerp(-24 - k * 10, xf, ease(u))), anda = u > 0 && u < 1;
    const suelta = k === 0 && t > ROPES - 0.15, recibe = k === 0 ? dar >= 1 : t > HUND + k * 0.35, come = recibe && Math.floor(t * 2 + k) % 3 === 0;
    const a = R.actor(def, x, 160 + k % 2 * 4, t, { dir: 1, anda, sonrisa: recibe, habla: come, sostiene: recibe ? [x + 9, 144 + k % 2 * 4] : anda || !suelta ? true : undefined, brazos: k === 1 && t > PULL && t < PULL + 0.7 });
    if (recibe) cuenquito(a.mano[0], a.mano[1]); else if (!suelta) rollo(a.mano[0] - 2, a.mano[1] - 5);
    if (k === 0 && suelta) rollo(x - 8, 166 + ri(Math.min(0, (t - ROPES) * 30 - 6)));
  });
  if (dar > 0 && dar < 1) cuenquito(lerp(204, 176, dar), 146);
  // el niño cruza con el odre de agua
  const n = tramo(t, LLEGAN + 0.4, LLEGAN + 3.2), nx = ri(lerp(300, 236, ease(n)));
  const ni = R.actor(GB.ninoGB, nx, 174, t, { dir: -1, anda: n > 0 && n < 1, sonrisa: true, sostiene: true });
  R.disco(ni.mano[0] - 1, ni.mano[1] + 2, 3, K); R.disco(ni.mano[0] - 1, ni.mano[1] + 2, 2, H('#8a5a32')); ps(ni.mano[0] - 2, ni.mano[1] + 1, H('#c88a52'));
  // «cientos»: el 100 sobre los que comen
  const c = pop(t, HUND, 0.35); if (c > 0 && t < ROPES) R.numero('100', 108, ri(120 - c * 6), { centro: true });
  T.recintoDelante(R, t, { encuadre: 'banquete' });
};
'''

E['gb-cazadores'] = ('Cazadores y recolectores', '''// GB-CAZADORES (frases 14–15: «huesos» y «trigo»). Doce planos, cortados en la palabra de la voz inglesa:
// 1 (0, 2004) · el tamiz de la excavación de cerca, sobre la pared de la zanja con el relleno de cascotes: las manos de la
//   arqueóloga lo sacuden, la tierra cae a la lona y quedan una clavija de cuerno de gacela, un colmillo de jabalí y una
//   muela de uro; en «tell», «same», «story» salen sus etiquetas 1, 2, 3; brillan en «belong».
// 2 («gazelles», −9600) · la estepa: esquinas doradas sobre las gacelas, los uros («aurochs») y los jabalíes («boars»);
//   dos cazadores llegan agachados por la senda y señalan; en «domesticated» un bocadillo con una oveja tachada.
// 3 («and the seeds») · las espigas de cerca: una se desgrana sola en «seeds»; la hoz de sílex siega un puñado en
//   «cereals» y la mano lo lleva a la cesta en «gathered».
// 4 («The people who raised») · el pilar sobre troncos: llegan un cazador y una recolectora; alzan el arco en «hunter» y
//   la cesta de espigas en «gatherers»; el niño corre con el odre.
// 5 («and Schmidt», 2008) · fondo local: el borde de la excavación con la lona y tres pilares; Schmidt habla a la prensa,
//   el bocadillo pilar → casa en «phrase» con su flash, y en «around the world» las hojas de periódico rodean un globo.
// 6 («First») · la mesa del estudio: el pilar de juguete cae en «temple» (9600), las casitas en «then the city» (7400);
//   Atom señala uno y otro (el año pasa de −9600 a −7400).
// 7 («a detail») · fondo local, desde el aire: el cerro (chincheta roja en «detail») y el campo volcánico de los Karacadağ
//   (chincheta azul en «more»); la regla se tiende en «some 30 kilometers» y salen las huellas de un día de camino.
// 8 («a single day's walk») · el trigal con los Karacadağ: dos vuelven del monte por la senda; el sol de un día dibuja su
//   arco; en «rise» se paran y señalan los montes; la línea de luz une las laderas con el cerro.
// 9 («And in 1997», 1997) · fondo local, el laboratorio de genética: el calendario de 1997 se enciende; la genetista
//   señala el monitor, donde el árbol de ADN se dibuja y se junta en un punto con el monte en «origin»; su compañero
//   llega con los sobres de semillas, se sorprende y piensa en la espiga («einkorn»).
// 10 («one of the first») · fondo local, la mesa de cerca: la lupa recorre la espiga de escanda, que brilla en
//   «domesticated»; la otra mano clava la chincheta roja en las laderas de la foto en «slopes».
// 11 («It's as if») · fondo local: el cerro con el recinto y, al lado, la parcela: la sembradora echa semilla, los brotes
//   salen en «born», ella señala las piedras en «next to the stones», el niño espanta a los cuervos en «landscape» y en
//   «era» ya son espigas.
// 12 («when someone needed») · el banquete al atardecer (BANQ): llegan los de las cuerdas con los rollos al hombro, la
//   cocinera reparte la papilla en «feed», «100» en «hundreds», uno suelta su rollo en «ropes»; gb-banquete lo congela.''', UTIL + BANQ + r'''
// los instantes de cada palabra de la voz inglesa
const W = { AND: en('huesos', 0.0000), THE: en('huesos', 0.0038), BONES: en('huesos', 0.0084), COMING: en('huesos', 0.0175), OUT: en('huesos', 0.0267), OF: en('huesos', 0.0358), THE2: en('huesos', 0.0396), EARTH: en('huesos', 0.0435), TELL: en('huesos', 0.0534), THE3: en('huesos', 0.0625), SAME: en('huesos', 0.0686), STORY: en('huesos', 0.0808), BECAUSE: en('huesos', 0.1182), THEY: en('huesos', 0.1304), BELONG: en('huesos', 0.1380), TO: en('huesos', 0.1525), GAZELLES: en('huesos', 0.1616), AIR: en('huesos', 0.2150), ROCKS: en('huesos', 0.2241), AND2: en('huesos', 0.2355), WILD: en('huesos', 0.2432), BOARS: en('huesos', 0.2554), WITH: en('huesos', 0.2942), NOT: en('huesos', 0.2996), A: en('huesos', 0.3080), SINGLE: en('huesos', 0.3141), DOMESTICATED: en('huesos', 0.3270), ANIMAL: en('huesos', 0.3567), AND3: en('huesos', 0.3895), THE4: en('huesos', 0.3941), SEEDS: en('huesos', 0.3979), ARE: en('huesos', 0.4101), WILD2: en('huesos', 0.4170), CEREALS: en('huesos', 0.4307), PEOPLE: en('huesos', 0.4597), GATHERED: en('huesos', 0.4719), ON: en('huesos', 0.4901), THE5: en('huesos', 0.5115), STEPPE: en('huesos', 0.5184), THE6: en('huesos', 0.5839), PEOPLE2: en('huesos', 0.5900), WHO: en('huesos', 0.6014), RAISED: en('huesos', 0.6106), GOBEKLI: en('huesos', 0.6251), TEEP: en('huesos', 0.6525), WERE: en('huesos', 0.6662), HUNTER: en('huesos', 0.6800), GATHERERS: en('huesos', 0.6944), AND4: en('huesos', 0.7402), SCHMITT: en('huesos', 0.7478), SUMMED: en('huesos', 0.7638), IT: en('huesos', 0.7783), UP: en('huesos', 0.7813), IN: en('huesos', 0.7867), A2: en('huesos', 0.7912), PHRASE: en('huesos', 0.7951), THAT: en('huesos', 0.8065), WENT: en('huesos', 0.8263), AROUND: en('huesos', 0.8339), THE7: en('huesos', 0.8507), WORLD: en('huesos', 0.8583), FIRST: en('huesos', 0.8888), CAME: en('huesos', 0.8995), THE8: en('huesos', 0.9117), TEMPLE: en('huesos', 0.9186), THEN: en('huesos', 0.9658), THE9: en('huesos', 0.9742), CITY: en('huesos', 0.9826), AND5: en('trigo', 0.0000), THERES: en('trigo', 0.0031), A3: en('trigo', 0.0093), DETAIL: en('trigo', 0.0118), THAT2: en('trigo', 0.0236), MAKES: en('trigo', 0.0348), THE10: en('trigo', 0.0423), STORY2: en('trigo', 0.0479), EVEN: en('trigo', 0.0597), MORE: en('trigo', 0.0728), STRIKING: en('trigo', 0.0803), BECAUSE2: en('trigo', 0.1126), SOME: en('trigo', 0.1201), N30: en('trigo', 0.1275), KILOMETERS: en('trigo', 0.1375), AWAY: en('trigo', 0.1524), A4: en('trigo', 0.1860), SINGLE2: en('trigo', 0.1891), DAYS: en('trigo', 0.1985), WALK: en('trigo', 0.2140), RISE: en('trigo', 0.2395), THE11: en('trigo', 0.2495), KARAKADA: en('trigo', 0.2569), MOUNTAINS: en('trigo', 0.2725), AND6: en('trigo', 0.3198), IN2: en('trigo', 0.3297), N1997: en('trigo', 0.3353), A5: en('trigo', 0.3888), DNA: en('trigo', 0.3919), STUDY: en('trigo', 0.4044), TRACED: en('trigo', 0.4218), THE12: en('trigo', 0.4324), ORIGIN: en('trigo', 0.4405), OF2: en('trigo', 0.4529), ENCORN: en('trigo', 0.4591), ONE: en('trigo', 0.4896), OF3: en('trigo', 0.4940), THE13: en('trigo', 0.4977), FIRST2: en('trigo', 0.5014), DOMESTICATED2: en('trigo', 0.5077), CEREALS2: en('trigo', 0.5307), IN3: en('trigo', 0.5494), THE14: en('trigo', 0.5543), WORLD2: en('trigo', 0.5574), TO2: en('trigo', 0.5823), EXACTLY: en('trigo', 0.5885), THOSE: en('trigo', 0.6041), SLOPES: en('trigo', 0.6134), ITS: en('trigo', 0.6725), AS: en('trigo', 0.6918), IF: en('trigo', 0.6943), FARMING: en('trigo', 0.6993), HAD: en('trigo', 0.7099), BEEN: en('trigo', 0.7173), BORN: en('trigo', 0.7229), RIGHT: en('trigo', 0.7360), NEXT: en('trigo', 0.7491), TO3: en('trigo', 0.7590), THE15: en('trigo', 0.7671), STONES: en('trigo', 0.7708), IN4: en('trigo', 0.7982), THE16: en('trigo', 0.8032), SAME2: en('trigo', 0.8063), LANDSCAPE: en('trigo', 0.8150), AND7: en('trigo', 0.8343), THE17: en('trigo', 0.8536), SAME3: en('trigo', 0.8579), ERA: en('trigo', 0.8660), WHEN: en('trigo', 0.8760), SOMEONE: en('trigo', 0.8903), NEEDED: en('trigo', 0.8996), TO4: en('trigo', 0.9077), FEED: en('trigo', 0.9145), HUNDREDS: en('trigo', 0.9220), OF4: en('trigo', 0.9388), PEOPLE3: en('trigo', 0.9463), PULLING: en('trigo', 0.9562), ON2: en('trigo', 0.9699), ROPES: en('trigo', 0.9780) };
const enC = (f) => en('trigo', f);
const P2 = W.GAZELLES, P3 = W.AND3, P4 = W.THE6, P5 = W.AND4, P6 = W.FIRST - 0.12, P7 = W.A3 - 0.05, P8 = W.A4, P9 = W.AND6, P10 = W.ONE, P11 = W.ITS, P12 = W.WHEN;
const TIERRA = pal(['#3a2416', '#5a3a22', '#7a5232', '#9a6e44', '#b88a58']);
const PIEDRA = pal(['#5a5246', '#8a8274', '#b4ac9a', '#ddd6c2']);

// ── 1 · el tamiz de la excavación (2004): la tierra se cuela y quedan los huesos de los animales ────────────────────
const hueso1 = (x, y) => { // la clavija de cuerno de una gacela: un cono curvo y estriado
  for (let i = 0; i < 26; i++) { const u = i / 26, cx = x + i, cy = y - Math.sin(u * 2.4) * 7, r = 4.5 - u * 3.6;
    R.disco(ri(cx), ri(cy) + 1, Math.max(1, ri(r)), K); }
  for (let i = 0; i < 26; i++) { const u = i / 26, cx = x + i, cy = y - Math.sin(u * 2.4) * 7, r = 3.5 - u * 3; if (r < 0.6) continue;
    R.disco(ri(cx), ri(cy), Math.max(1, ri(r)), i % 3 === 0 ? H('#c8b48a') : H('#e8dab8')); ps(ri(cx), ri(cy - r + 1), H('#fff6e0')); }
  rr(x - 3, y - 4, x - 1, y + 4, H('#d0bc94')); };
const colmillo = (x, y) => { // el colmillo de jabalí: una media luna blanca con su raíz
  for (let a = 0; a <= 26; a++) { const u = a / 26, ang = Math.PI * (0.15 + u * 0.8), cx = x + Math.cos(ang) * 12, cy = y - Math.sin(ang) * 9, r = 3 - u * 2.2;
    R.disco(ri(cx), ri(cy), Math.max(1, ri(r + 1)), K); }
  for (let a = 0; a <= 26; a++) { const u = a / 26, ang = Math.PI * (0.15 + u * 0.8), cx = x + Math.cos(ang) * 12, cy = y - Math.sin(ang) * 9, r = 2.2 - u * 1.8;
    R.disco(ri(cx), ri(cy), Math.max(0, ri(r)), u < 0.3 ? H('#d8c49a') : H('#f8f4ea')); if (a % 4 === 0) ps(ri(cx), ri(cy - 1), H('#ffffff')); } };
const muela = (x, y) => { // la muela de un uro: un bloque con sus pliegues de esmalte
  rr(x - 9, y - 8, x + 9, y + 3, K); rr(x - 8, y - 7, x + 8, y + 2, H('#e4d8bc')); rr(x - 8, y - 7, x + 8, y - 6, H('#fbf4e0'));
  for (const i of [-5, -1, 3, 6]) R.linea(x + i, y - 5, x + i - 1, y + 1, H('#9a8660')); rr(x - 8, y + 1, x + 8, y + 2, H('#b8a47c'));
  for (const i of [-6, 4]) { rr(x + i, y + 3, x + i + 3, y + 7, K); rr(x + i + 1, y + 3, x + i + 2, y + 6, H('#c8b48a')); } };
const etiqueta = (x, y, n, u) => { if (u <= 0) return; y = ri(y - u * 2); rr(x - 5, y - 4, x + 5, y + 4, K); rr(x - 4, y - 3, x + 4, y + 3, H('#f8f4e4')); rr(x - 4, y - 3, x + 4, y - 3, H('#e84a3a')); cifras(String(n), x - 1, y - 1, K); R.linea(x - 4, y + 4, x - 8, y + 9, H('#8a8a8a')); };
const tamizFondo = () => {
  degradado(0, 30, pal(['#86acd6', '#9cbce0', '#b2cce6', '#c8dcea', '#dce6ea']));
  // la loma de enfrente, al otro lado de la zanja, y la cubierta de lona de la excavación
  for (let x = 0; x < 320; x++) { const y = ri(29 + Math.sin(x * 0.02) * 3 + Math.sin(x * 0.07) * 1); for (let yy = y; yy < 44; yy++) R.pset(x, yy, rmp(pal(['#a89a72', '#c0b088', '#d4c49a']), (yy - y) / 6 + h2(x, yy, 5) * 0.8, x, yy)); }
  for (const px of [190, 262]) { rr(px, 20, px + 2, 44, K); rr(px + 1, 20, px + 1, 43, H('#8a6a44')); }
  R.poligono([[178, 20], [270, 17], [270, 24], [180, 27]], K); R.poligono([[180, 21], [269, 18], [269, 23], [181, 26]], (x, y) => (x + y) % 9 < 1 ? H('#d8d4c8') : H('#f4f2ea'));
  for (let x = 182; x < 270; x += 3) ps(x, ri(26 - (x - 180) * 0.03), H('#b8b4a8'));
  // la carretilla y los cubos en el borde de la zanja
  R.poligono([[40, 36], [64, 36], [60, 42], [44, 42]], K); R.poligono([[41, 37], [63, 37], [59, 41], [45, 41]], H('#4a6a8a')); R.disco(46, 43, 2, K); R.linea(64, 37, 72, 34, K);
  for (const [x, c] of [[88, '#e8a030'], [96, '#3a7ac8'], [104, '#e8a030']]) { rr(x, 34, x + 6, 43, K); rr(x + 1, 35, x + 5, 42, H(c)); rr(x + 1, 35, x + 5, 35, H('#ffffff')); }
  for (let x = 0; x < 320; x += 7) mata(x + (x * 13) % 5, 44, 3, 3 + (x % 4), 0, pal(['#7a6a3a', '#9a8a4a', '#c8b870']));
  // la pared de la zanja: la tierra de arriba con raíces, el relleno de cascotes de caliza (lo que enterró los recintos) y la capa de ceniza
  for (let y = 44; y < 180; y++) for (let x = 0; x < 320; x++) {
    const b1 = 62 + Math.sin(x * 0.05) * 3, b2 = 132 + Math.sin(x * 0.03 + 1) * 4, b3 = 140 + Math.sin(x * 0.03 + 1) * 4;
    let ramp = y < b1 ? pal(['#4a2e1c', '#6a4228', '#8a5a36']) : y < b2 ? pal(['#6a4a30', '#8a6440', '#a47c52']) : y < b3 ? pal(['#5a5650', '#7a766c', '#9a968a']) : pal(['#4a3424', '#6a4a32', '#86603e']);
    R.pset(x, y, rmp(ramp, h2(x >> 1, y >> 1, 7) * 1.3 + h2(x >> 3, y >> 3, 8) * 0.9, x, y)); }
  for (let k = 0; k < 18; k++) { const x = (k * 53) % 320, y = 46 + (k * 7) % 14; R.linea(x, y, x + 3 + k % 4, y + 6 + k % 5, H('#2a1a10')); }
  // los cascotes de caliza del relleno, con su luz y su sombra, y alguna lasca de sílex
  for (let k = 0; k < 60; k++) { const x = h2(k, 1, 11) * 320, y = 66 + h2(k, 2, 11) * 62, w = 3 + h2(k, 3, 11) * 6, hh = 2 + h2(k, 4, 11) * 4;
    R.poligono([[x - w, y], [x - w * 0.4, y - hh], [x + w * 0.6, y - hh * 0.8], [x + w, y + 1], [x, y + hh * 0.6]], K);
    R.poligono([[x - w + 1, y], [x - w * 0.4, y - hh + 1], [x + w * 0.6 - 1, y - hh * 0.8 + 1], [x + w - 1, y + 1], [x, y + hh * 0.6 - 1]], (xx, yy) => rmp(PIEDRA, 2.6 - (yy - (y - hh)) / (hh * 1.5) * 2 + h2(xx, yy, 12) * 0.5, xx, yy)); }
  for (let k = 0; k < 14; k++) { const x = h2(k, 5, 13) * 320, y = 136 + h2(k, 6, 13) * 6; ps(x, y, H('#1a1a1a')); ps(x + 1, y, H('#2a2a2a')); }
  // el cordel de nivel con sus clavos, las etiquetas de los estratos y la cinta métrica
  R.linea(0, 58, 320, 56, H('#f0e8d0')); for (const x of [12, 160, 308]) { rr(x, 55, x + 1, 59, K); ps(x, 55, H('#c8c8c8')); }
  for (const [x, y, n] of [[24, 70, 3], [290, 98, 4], [24, 132, 5]]) { rr(x - 5, y - 4, x + 5, y + 4, K); rr(x - 4, y - 3, x + 4, y + 3, H('#f8f4e4')); cifras(String(n), x - 1, y - 2, K); rr(x, y - 6, x, y - 4, H('#c8c8c8')); }
  for (let y = 60; y < 180; y++) { const c = Math.floor((y - 60) / 6) % 2 ? H('#e83a2a') : H('#f8f4ea'); ps(306, y, K); ps(307, y, c); ps(308, y, c); ps(309, y, K); }
  // la lona del suelo donde cae la tierra cernida y el cubo azul con su número
  R.poligono([[30, 168], [290, 164], [300, 180], [20, 180]], K); R.poligono([[31, 169], [289, 165], [298, 180], [22, 180]], (x, y) => (x * 3 + y * 7) % 23 < 2 ? H('#3a5a8a') : H('#4a72a8'));
  // la paleta y la brocha sobre la lona
  R.poligono([[110, 174], [122, 170], [124, 173], [112, 177]], K); R.poligono([[111, 174], [121, 171], [122, 173], [112, 176]], H('#b8bcc4')); rr(124, 170, 132, 173, K); rr(125, 171, 131, 172, H('#8a5a34'));
  rr(196, 171, 210, 174, K); rr(197, 172, 205, 173, H('#c8a060')); rr(206, 170, 212, 175, K); rr(207, 171, 211, 174, H('#e8dcc0'));
};
const p1 = (t) => {
  capa('tamiz', tamizFondo);
  const sac = t < W.BECAUSE ? Math.sin(t * 22) * 2.2 * (1 - tramo(t, W.BECAUSE - 0.4, W.BECAUSE)) : 0, dx = ri(sac);
  // el montón que va cayendo a la lona
  const queda = 1 - ease(tramo(t, 0.3, W.STORY + 0.4));
  const cae = tramo(t, 0.2, 0.4) * (1 - tramo(t, W.BECAUSE - 0.3, W.BECAUSE));
  if (cae > 0) for (let k = 0; k < 46; k++) { const x = 62 + (k * 37) % 196 + dx, y = 159 + ((t * 70 + k * 11) % 18); ps(x, y, k % 3 ? H('#8a5a36') : H('#6a4228')); if (k % 4 === 0) ps(x, y + 1, H('#a47c52')); }
  const mont = 0.35 + 0.65 * (1 - queda * 0.2); for (let i = -40; i <= 40; i++) { const hh = ri((1 - (i / 40) ** 2) * 6 * mont + (1 - queda) * 2); for (let j = 0; j < hh; j++) ps(160 + i * 2.4, 178 - j, rmp(TIERRA, 2.4 - j * 0.3 + h2(i, j, 21), i, j)); }
  // el tamiz: el marco de madera en perspectiva y la malla de alambre
  const X = (u, v) => [lerp(lerp(76, 244, u), lerp(54, 266, u), v) + dx, lerp(112, 158, v)];
  R.poligono([X(0, 0), X(1, 0), X(1, 1), X(0, 1)], H('#2e2014'));
  for (let i = 1; i < 30; i++) { const [a, b] = X(i / 30, 0), [c, d] = X(i / 30, 1); R.linea(ri(a), ri(b), ri(c), ri(d), H('#8a8a84')); }
  for (let j = 1; j < 12; j++) { const [a, b] = X(0, j / 12), [c, d] = X(1, j / 12); R.linea(ri(a), ri(b), ri(c), ri(d), H('#9a9a94')); }
  // los huesos que salen de la tierra (y la tierra que los tapa todavía)
  hueso1(96 + dx, 132); colmillo(160 + dx, 141); muela(214 + dx, 134);
  if (queda > 0) for (let j = -16; j <= 10; j++) for (let i = -82; i <= 82; i++) { const e = (i / 82) ** 2 + ((j + 3) / 15) ** 2; if (e > queda * 1.05) continue;
    if (e > queda * 0.85 && b4(i, j) < 0.5) continue; ps(160 + i + dx, 134 + j, rmp(TIERRA, 3.2 - (j + 16) / 12 + h2(i >> 1, j, 22) * 0.9, i, j)); }
  // el canto del marco por delante, con sus vetas y sus esquinas
  for (const [p, q] of [[[0, 0], [1, 0]], [[0, 1], [1, 1]], [[0, 0], [0, 1]], [[1, 0], [1, 1]]]) { const [a, b] = X(...p), [c, d] = X(...q);
    for (let w = -2; w <= 2; w++) R.linea(ri(a), ri(b) + w, ri(c), ri(d) + w, w === -2 || w === 2 ? K : w < 0 ? H('#d8a868') : H('#a87440')); }
  // las etiquetas con su número que dicen qué es cada uno
  etiqueta(124 + dx, 114, 1, pop(t, W.TELL, 0.3)); etiqueta(180 + dx, 118, 2, pop(t, W.SAME, 0.3)); etiqueta(234 + dx, 116, 3, pop(t, W.STORY, 0.3));
  if (t > W.BELONG && t < W.BELONG + 0.8) { destello(108 + dx, 124, 3); destello(170 + dx, 130, 2); destello(220 + dx, 126, 3); }
  // las manos de la arqueóloga en las esquinas del marco
  const [lx, ly] = X(0, 0.92), [rx, ry] = X(1, 0.92);
  T.brazo(R, 34 + dx, 204, lx + 4, ly + 1, '#d86a4a', 1);
  T.brazo(R, 286 + dx, 204, rx - 4, ry + 1, '#d86a4a', -1);
};

// ── 2 · la estepa: gacelas, uros y jabalíes; los cazadores al acecho; ningún animal doméstico ───────────────────────
const lanza = (x, y, c = 1) => { x = ri(x); y = ri(y); R.linea(x, y + 10, x + 2 * c, y - 18, K); R.linea(x + 1, y + 10, x + 1 + 2 * c, y - 18, H('#8a6234')); R.poligono([[x + 2 * c - 2, y - 18], [x + 2 * c + 2, y - 18], [x + 2 * c, y - 24]], K); ps(x + 2 * c, y - 20, H('#9aa0a8')); ps(x + 2 * c, y - 22, H('#d0d4da')); };
const huellas = () => { for (let k = 0; k < 9; k++) { const x = 40 + k * 26 + (k % 2) * 6, y = 160 + (k % 3) * 5; ps(x, y, H('#4a2e1c')); ps(x + 2, y, H('#4a2e1c')); ps(x, y + 1, H('#5a3a22')); ps(x + 2, y + 1, H('#5a3a22')); } };
const p2 = (t) => {
  T.neolitico(R, t, {});
  // la senda: huellas de pezuña, guijarros, una rama seca y la cesta que alguien dejó
  huellas();
  for (const [x, y, r] of [[30, 172, 2], [118, 168, 1], [176, 176, 2], [262, 170, 1], [212, 160, 1]]) guijarro(x, y, r, pal(['#3a2a1a', '#7a6a52', '#a89a7e', '#d8ccb0']));
  R.linea(86, 176, 110, 172, K); R.linea(86, 175, 110, 171, H('#8a6a44')); R.linea(98, 173, 102, 168, H('#8a6a44'));
  // el carcaj tumbado con sus flechas, un odre y lascas de sílex
  R.poligono([[236, 170], [262, 164], [264, 168], [238, 174]], K); R.poligono([[237, 170], [261, 165], [262, 167], [238, 172]], H('#8a5a32')); for (let k = 0; k < 3; k++) { R.linea(262, 165 + k, 270, 162 + k * 2, H('#d8c8a0')); ps(271, 162 + k * 2, H('#c83a3a')); }
  R.disco(292, 172, 4, K); R.disco(292, 172, 3, H('#9a6a3a')); ps(291, 170, H('#c89a5a')); rr(295, 167, 297, 169, K);
  for (const [x, y] of [[150, 170], [156, 172], [282, 162]]) { R.poligono([[x, y], [x + 3, y - 2], [x + 4, y + 1]], K); ps(x + 2, y - 1, H('#c8ccd4')); }
  cesta(60, 170, 14, 8, (x, y) => { for (let k = -5; k <= 5; k += 2) espiga(x + k, y + 4, 6, k * 0.3, ESP, 1); });
  // lo que se nombra, con sus esquinas
  esquinas(24, 94, 112, 110, t, tramo(t, W.GAZELLES, W.GAZELLES + 0.2) - tramo(t, W.AIR + 0.4, W.AIR + 0.6));
  esquinas(146, 82, 206, 95, t, tramo(t, W.AIR, W.AIR + 0.2) - tramo(t, W.WILD + 0.6, W.WILD + 0.8));
  esquinas(218, 108, 266, 123, t, tramo(t, W.WILD, W.WILD + 0.2) - tramo(t, W.WITH + 0.4, W.WITH + 0.6));
  // dos cazadores llegan agachados por la senda y señalan lo que se caza
  const u = tramo(t, P2 + 0.1, W.AIR), x1 = ri(lerp(344, 178, ease(u))), x2 = ri(lerp(372, 214, ease(u)));
  const s1 = t > W.AIR && t < W.WILD + 0.2, s2 = t > W.WILD && t < W.WITH + 0.3, bur = pop(t, W.DOMESTICATED - 0.1, 0.3);
  const a = R.actor(GB.cazadorGB, x1, 160, t, { dir: -1, anda: u > 0 && u < 1, dedo: s1, sostiene: s1 ? undefined : true, sorpresa: t > W.ANIMAL && t < W.AND3 });
  if (!s1) lanza(a.mano[0], a.mano[1], -1);
  const b = R.actor(GB.cazador2GB, x2, 158, t, { dir: -1, anda: u > 0 && u < 1, dedo: s2, sonrisa: bur > 0, habla: t > W.WITH && t < W.ANIMAL && Math.sin(t * 9) > 0 });
  // el bocadillo: una oveja tachada (no hay ni un animal domesticado)
  bocata(b.cabeza[0] + 4, b.cabeza[1] - 16, 26, 16, bur, (cx, cy) => { oveja(cx - 1, cy); if (t > W.SINGLE) R.icono('X', cx - 4, cy - 4, H('#e83a3a'), K, 2); });
  T.neoliticoDelante(R, t, {});
};

// ── 3 · las espigas de cerca: los granos se desgranan solos (trigo silvestre); la hoz de sílex siega un puñado ──────
const espFondo = () => {
  degradado(0, 80, pal(['#7ea6d4', '#94b6dc', '#aac6e2', '#c2d6e6', '#d8e2e4', '#dfe4e2']));
  // los Karacadağ lejos, oscuros, con bruma al pie
  for (let x = 0; x < 320; x++) { const yl = ri(72 - Math.sin(x * 0.04) * 3 - Math.sin(x * 0.13)); for (let yy = yl; yy < 82; yy++) R.pset(x, yy, rmp(pal(['#9ea4b0', '#b0b4b8', '#c4c4bc', '#d4d0c0']), (yy - yl) / 3 + h2(x, yy, 30) * 0.6, x, yy)); }
  for (let x = 110; x < 320; x++) { const y = ri(70 - Math.max(0, (x - 130) * 0.16) - Math.sin(x * 0.05) * 3 - Math.sin(x * 0.17) * 1.2); if (y > 70) continue; for (let yy = Math.max(0, y); yy < 82; yy++) R.pset(x, yy, rmp(pal(['#3a3a44', '#4e4c54', '#66626a', '#9a98a0', '#c8c8c8']), (yy - y) / 4 + h2(x >> 1, yy, 31) * 0.8, x, yy)); }
  // la llanura lejana y el trigal del medio, en tres tonos
  for (let y = 78; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y - 78) / 102; R.pset(x, y, rmp(pal(['#5a4218', '#7a5a24', '#9a7432', '#b88e42', '#d4ac5e']), 3.4 - v * 3 + Math.sin(x * 0.7 + y * 0.3) * 0.5 + h2(x, y >> 1, 32) * 0.7, x, y)); }
  for (let k = 0; k < 140; k++) { const x = h2(k, 1, 33) * 320, y = 84 + h2(k, 2, 33) * 40; espiga(x, y + 8, 7 + (y - 84) * 0.12, 0.6, ESP, 1); }
  // el claro ya segado de delante: tierra con rastrojo, gavillas atadas y una piedra
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const borde = 152 + Math.sin(x * 0.08) * 2; if (y < borde) continue; R.pset(x, y, rmp(pal(['#5a3a1e', '#7a5530', '#9a7444', '#b89058']), 2.4 - (y - 152) / 30 + h2(x >> 1, y >> 1, 34) * 0.9, x, y)); }
  for (let k = 0; k < 90; k++) { const x = ri(h2(k, 3, 35) * 320), y = ri(156 + h2(k, 4, 35) * 22); R.linea(x, y, x + (k % 3) - 1, y - 3 - (k % 3), H('#d8b868')); ps(x + (k % 3) - 1, y - 4 - (k % 3), H('#f0d890')); }
  for (const x of [262, 292]) { for (let k = -4; k <= 4; k++) espiga(x + k, 174, 20 + Math.abs(k), k * 0.8, ESP, 1); rr(x - 5, 164, x + 5, 165, H('#6a4a22')); }
  guijarro(236, 170, 3, pal(['#3a3028', '#6a6052', '#9a9080', '#d0c8b8']));
  // un pistachero lejano y gacelas diminutas
  for (const [x, y] of [[44, 84], [250, 86]]) { R.linea(x, y, x, y - 6, H('#4a3424')); R.disco(x, y - 8, 4, H('#4a6a32')); R.disco(x - 1, y - 9, 3, H('#6a8a42')); }
};
const hoz = (hx, hy, ang) => { // la hoz: mango de hueso y una fila de dientes de sílex
  const c = Math.cos(ang), s = Math.sin(ang), P = (u, v) => [ri(hx + u * c - v * s), ri(hy + u * s + v * c)];
  for (let i = -4; i < 20; i++) { const [x, y] = P(i, 0); R.disco(x, y, 2, K); }
  for (let i = -4; i < 20; i++) { const [x, y] = P(i, 0); ps(x, y, i < 6 ? H('#e8dcc0') : H('#c8b896')); }
  for (let i = 6; i < 20; i += 3) { const [x, y] = P(i, -3), [x2, y2] = P(i + 2, -4); R.poligono([[x, y + 1], [x2, y2], [x2 + 1, y2 + 2]], K); ps(x, y, H('#9aa0a8')); ps(x2, y2 + 1, H('#d8dce2')); } };
const KK = [K, K, K, K, K];
const espigaK = (x, yb, alto, inc, g, cs = ESP) => { espiga(x + 1, yb, alto, inc, KK, g); espiga(x - 1, yb, alto, inc, KK, g); return espiga(x, yb, alto, inc, cs, g); };
const ESPV = pal(['#7a5418', '#c08a2c', '#f0c050', '#ffe080', '#fff6c8']);
const p3 = (t) => {
  capa('espigas', espFondo); nubesVivas(t, 40, NUB, 1); pajaros(t, 30, H('#3a3a44'), 3);
  const viento = (x) => Math.sin(t * 1.6 + x * 0.03) * 3 + Math.sin(t * 2.9 + x * 0.11);
  // las espigas grandes de los lados (el centro es el claro segado)
  for (let k = 0; k < 24; k++) { const x = 4 + k * 13.5 + (k % 3) * 2, alto = 70 + (k * 37) % 40; if (x > 92 && x < 232) continue; espiga(x, 182, alto, viento(x), ESP, 2); }
  // la que se desgrana sola en «seeds» (el trigo silvestre suelta el grano): los granos caen saltando
  const dx0 = 214, dg = tramo(t, W.SEEDS - 0.05, W.SEEDS + 1.3), top = espigaK(dx0, 182, 92, viento(dx0) * 0.6, 2, dg > 0 ? ESPV : ESP);
  for (let k = 0; k < 8; k++) { const tk = dg * 1.5 - k * 0.07; if (tk <= 0) continue; const x = top[0] + (k - 4) * 1.5 + tk * (k - 3.5) * 7, y = top[1] + 4 + k * 1.5 + tk * tk * 70; if (y < 178) { rr(x - 2, y - 1, x + 2, y + 1, K); rr(x - 1, y, x + 1, y, H('#f0c050')); } }
  if (dg > 0 && dg < 0.35) destello(top[0] + 4, top[1] - 4, 4);
  // el puñado del centro: antes de segar, de pie; la hoz lo siega en «cereals»; la mano lo levanta y lo lleva a la cesta
  const ent = ease(tramo(t, P3 - 0.1, P3 + 0.5)), siega = tramo(t, W.CEREALS - 0.1, W.CEREALS + 0.25), lleva = ease(tramo(t, W.GATHERED - 0.2, W.STEPPE - 0.1));
  const sube = ease(tramo(t, W.CEREALS + 0.2, W.CEREALS + 0.7)) * 10, enCesta = t > W.STEPPE;
  let hx = lerp(126, 150, ent), hy = lerp(204, 152, ent) - sube; hx = lerp(hx, 76, lleva); hy = lerp(hy, 140, lleva);
  // la cesta, abajo a la izquierda, que se llena
  cesta(64, 178, 52, 24, (x, y) => { for (let k = -20; k <= 20; k += 4) espiga(x + k, y + 6, 10 + (k % 8 === 0 ? 4 : 0), k * 0.2, ESP, 2); if (enCesta) for (let k = -8; k <= 8; k += 4) espigaK(x + k + 3, y + 4, 26, k * 0.4, 2, ESPV); });
  for (let j = 0; j < 5; j++) { const al = 86 + (j % 3) * 6, inc = viento(150 + j * 4) * 0.8 + (j - 2) * 2;
    if (siega === 0) espigaK(142 + j * 4, 182, al, inc, 2, ESPV);
    else if (!enCesta) espigaK(hx + 4 + (j - 2) * 2, hy + 16, 62 + (j % 3) * 4, (j - 2) * 4 + Math.sin(t * 3 + j) * 1.5, 2, ESPV); }
  if (siega > 0) for (let j = 0; j < 5; j++) { const x0 = 142 + j * 4; espiga(x0, 182, 14, 0, ESP, 2, true); ps(x0, 168, H('#fff0b8')); }
  if (!enCesta) T.brazo(R, hx - 24, 208, hx, hy, '#8a5a34', 1);
  // la hoz en la mano derecha: espera, siega de derecha a izquierda a ras del rastrojo y se retira
  const sx = lerp(206, 136, siega) + tramo(t, W.CEREALS + 0.3, W.PEOPLE) * 56, sy = 168 + 3 * Math.sin(siega * Math.PI);
  const hent = ease(tramo(t, P3, P3 + 0.5)), hsal = tramo(t, W.STEPPE + 0.3, W.THE6);
  const rx = lerp(250, sx, hent) + hsal * 40, ry = lerp(206, sy, hent) + hsal * 40;
  hoz(rx - 8, ry - 4, Math.PI + 0.2);
  T.brazo(R, rx + 30, 210, rx, ry, '#8a5a34', -1);
  if (siega > 0 && siega < 1) for (let k = 0; k < 6; k++) destello(140 + k * 4, 166 + (k % 2), 2, H('#fff0b8'));
  for (const x of [2, 8, 312, 318]) espiga(x, 182, 54, viento(x) + (x < 100 ? 2 : -2), ESP, 2);
};

// ── 4 · el transporte del pilar: los que lo levantaron eran cazadores y recolectores ─────────────────────────────────
const arco = (x, y, d) => { x = ri(x); y = ri(y); for (let j = -9; j <= 9; j++) { const xx = x + d * ri(Math.cos(j / 9 * 1.3) * 4); ps(xx + d, y + j, K); ps(xx, y + j, H('#8a5a2a')); } R.linea(x, y - 8, x, y + 8, H('#e8dcc0')); };
const p4 = (t) => {
  T.neolitico(R, t, { encuadre: 'cantera', camara: 'troncos', avance: 0.3 + 0.18 * tramo(t, P4, P5) });
  for (const [x, y, r] of [[40, 172, 2], [150, 176, 2], [270, 168, 1], [210, 178, 1]]) guijarro(x, y, r, pal(['#4a4236', '#8a8270', '#b8b09c', '#e4dcc8']));
  // llegan el cazador (con el arco) y la recolectora (con la cesta de espigas en alto) y se unen a los que tiran
  const u = tramo(t, P4 + 0.1, W.HUNTER - 0.2), x1 = ri(lerp(-20, 122, ease(u))), x2 = ri(lerp(-58, 80, ease(u)));
  const alzaA = t > W.HUNTER - 0.1, alzaC = t > W.GATHERERS - 0.05;
  const a = R.actor(GB.cazadorGB, x1, 164, t, { dir: 1, anda: u > 0 && u < 1, sostiene: alzaA ? [x1 + 10, 136] : true, sonrisa: alzaA });
  arco(a.mano[0] + 1, a.mano[1] - (alzaA ? 2 : 0), 1);
  const c = R.actor(GB.cazadoraGB, x2, 170, t, { dir: 1, anda: u > 0 && u < 1, sostiene: alzaC ? [x2 + 4, 140] : true, sonrisa: alzaC });
  cesta(c.mano[0] + 2, c.mano[1] + 2, 14, 7, (x, y) => { for (let k = -5; k <= 5; k += 2) espiga(x + k, y + 4, 8, k * 0.4, ESP, 1); });
  if (alzaA && t < W.HUNTER + 0.5) destello(a.mano[0] + 6, a.mano[1] - 10, 3);
  if (alzaC && t < W.GATHERERS + 0.5) destello(c.mano[0] + 6, c.mano[1] - 8, 3);
  // el niño corre hacia la fila con el odre
  const n = tramo(t, P4 + 0.8, P5 - 0.4), nx = ri(lerp(330, 238, ease(n)));
  const ni = R.actor(GB.ninoGB, nx, 176, t, { dir: -1, anda: n > 0 && n < 1, sostiene: true, sonrisa: true });
  R.disco(ni.mano[0] - 1, ni.mano[1] + 2, 3, K); R.disco(ni.mano[0] - 1, ni.mano[1] + 2, 2, H('#8a5a32'));
  T.neoliticoDelante(R, t, { encuadre: 'cantera', camara: 'troncos' });
};

// ── 5 · 2008: Schmidt en el borde de la excavación lo resume para la prensa; la frase da la vuelta al mundo ─────────
const digFondo = () => {
  degradado(0, 70, pal(['#80a8d6', '#96b8de', '#aec8e4', '#c6d8e8', '#dce4e6']));
  // la llanura de Harrán lejos y la loma
  // la llanura de Harrán: parcelas de 2008 en franjas (barbecho, trigo verde, rastrojo, algodón), la carretera y los postes
  const PARC = [pal(['#9a8a62', '#ac9c72', '#bcae84']), pal(['#6a8a3a', '#7e9e46', '#94b45a']), pal(['#c8b07a', '#d6c08a', '#e2cf9c']), pal(['#8a6e4a', '#9e8058', '#b09468']), pal(['#5e7e36', '#729242', '#8aa852'])];
  for (let x = 0; x < 320; x++) { const y = ri(64 + Math.sin(x * 0.03) * 2); for (let yy = y; yy < 94; yy++) { const fila = Math.floor((yy - 64) / 6), col = Math.floor((x + fila * 23) / (38 + fila * 6)), k = (col * 7 + fila * 3) % 5;
    const surco = (x + yy * 2) % 4 === 0; R.pset(x, yy, (yy - 64) % 6 === 0 ? H('#7a6a48') : rmp(PARC[k], 1 + (surco ? -0.8 : 0) + h2(x, yy, 41) * 0.8 - (yy - 64) / 40, x, yy)); } }
  for (let x = 0; x < 320; x++) { R.pset(x, 80, H('#5a5a58')); R.pset(x, 81, H('#7a7a76')); R.pset(x, 82, H('#5a5a58')); }
  for (const x of [20, 92, 164, 236, 308]) { R.linea(x, 80, x, 66, H('#4a3a2a')); R.linea(x - 3, 68, x + 3, 68, H('#4a3a2a')); }
  for (let x = 20; x < 308; x++) { const k = (x - 20) % 72, y = 68 + ri(Math.sin(k / 72 * Math.PI) * 3); R.pset(x, y, H('#3a3a3a')); }
  for (const x of [52, 120, 200, 270]) { R.linea(x, 64, x, 58, H('#5a4a34')); R.disco(x, 56, 3, H('#4a6a32')); ps(x - 1, 55, H('#6a8a42')); }
  // el foso de la excavación: el muro de piedra seca en arco, el suelo del recinto y los tres pilares en T que asoman
  for (let y = 92; y < 150; y++) for (let x = 0; x < 320; x++) { const arc = 100 + Math.abs(x - 160) * 0.08; if (y < arc) { R.pset(x, y, rmp(pal(['#b8a882', '#ccbc94', '#dccca2']), h2(x, y, 42) * 2 + 0.4, x, y)); continue; }
    const hil = Math.floor((y - arc) / 5), off = (hil % 2) * 6, piedra = ((x + off) % 12) < 11 && ((y - arc) % 5) < 4;
    R.pset(x, y, y < 132 ? (piedra ? rmp(PIEDRA, 2.2 - ((y - arc) % 5) * 0.4 + h2(x >> 1, hil, 43) * 0.7, x, y) : H('#4a3a2a')) : rmp(pal(['#6a5238', '#7e6444', '#947a56']), h2(x >> 1, y >> 1, 44) * 2, x, y)); }
  for (const [x, e] of [[78, 0.9], [160, 1.05], [244, 0.9]]) T.d_pilar(R, x, 146, { escala: e, brazos: x === 160, luz: 0.6, sem: x });
  // el borde: tierra pisada con las herramientas (cubos, una criba apoyada, la escalera y la cinta de seguridad)
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#8a6a46', '#a4825a', '#bc9a6e', '#d2b284']), 2.6 - (y - 150) / 18 + h2(x >> 1, y >> 1, 45) * 0.9, x, y));
  R.linea(0, 151, 320, 151, H('#5a4028'));
  for (let x = 0; x < 320; x += 2) ps(x, 154 + ri(Math.sin(x * 0.04) * 1), Math.floor(x / 8) % 2 ? H('#e83a2a') : H('#f8f4ea'));
  for (const x of [6, 120, 300]) { rr(x, 148, x + 1, 160, K); ps(x, 148, H('#c8c8c8')); }
  for (const [x, c] of [[262, '#3a7ac8'], [272, '#e8a030']]) { rr(x, 164, x + 7, 174, K); rr(x + 1, 165, x + 6, 173, H(c)); rr(x + 1, 165, x + 6, 165, H('#ffffff')); }
  R.linea(290, 140, 298, 176, K); R.linea(300, 140, 308, 176, K); for (let k = 0; k < 6; k++) R.linea(291 + k * 1.4, 144 + k * 6, 301 + k * 1.4, 144 + k * 6, H('#8a6a44'));
  for (const [x, y, r] of [[30, 170, 2], [90, 176, 1], [200, 172, 2], [240, 178, 1]]) guijarro(x, y, r, PIEDRA);
  // la cubierta de lona sobre postes, que da sombra al foso
  for (const px of [12, 120, 228]) { rr(px, 44, px + 2, 100, K); rr(px + 1, 44, px + 1, 99, H('#8a6a44')); }
  R.poligono([[0, 38], [246, 34], [246, 44], [0, 48]], K); R.poligono([[0, 39], [245, 35], [245, 43], [0, 47]], (x, y) => (x % 18) < 1 ? H('#c8c4b8') : y < 41 ? H('#fbfaf4') : H('#e4e0d4'));
  for (let x = 0; x < 246; x += 18) for (let k = 0; k < 4; k++) ps(x + 4 + k * 3, ri(47 - x * 0.016 + Math.sin(k) ), H('#b8b4a8'));
};
const camara = (x, y) => { x = ri(x); y = ri(y); rr(x - 5, y - 4, x + 5, y + 3, K); rr(x - 4, y - 3, x + 4, y + 2, H('#2a2a30')); R.disco(x + 1, y - 0, 2, H('#6a8ab0')); ps(x, y - 1, H('#ffffff')); rr(x - 4, y - 5, x - 2, y - 4, K); };
const p5 = (t) => {
  capa('dig', digFondo); nubesVivas(t, 30, NUB, 2); pajaros(t, 24, H('#3a3a44'), 2);
  // el microbús de los visitantes que pasa por la carretera y su polvo
  const bx = ri(((t - P5) * 22 + 40) % 380) - 30; rr(bx, 74, bx + 14, 80, K); rr(bx + 1, 75, bx + 13, 79, H('#f4f4f0')); rr(bx + 2, 76, bx + 12, 77, H('#5a8ab8')); ps(bx + 3, 80, K); ps(bx + 11, 80, K); for (let k = 1; k < 5; k++) tine(bx - k * 3, 79 - (k % 2), H('#d8ccb0'), 0.5 - k * 0.1);
  // dos excavadores en el fondo del recinto, entre los pilares: uno rasca con la paleta, otro sube un cubo
  const g1 = Math.floor(t * 3) % 2; R.actor(GB.arqueologoGB, 118, 148, t, { dir: 1, sostiene: [128, 140 + g1 * 2] }); rr(127 + 0, 140 + g1 * 2, 131, 141 + g1 * 2, H('#b8bcc4'));
  const cu = (Math.sin(t * 1.4) + 1) / 2; const ar = R.actor(GB.arqueologaGB, 204, 148, t, { dir: -1, sostiene: [196, ri(128 + cu * 8)] }); rr(ar.mano[0] - 3, ar.mano[1], ar.mano[0] + 3, ar.mano[1] + 6, K); rr(ar.mano[0] - 2, ar.mano[1] + 1, ar.mano[0] + 2, ar.mano[1] + 5, H('#e8a030'));
  // la periodista con el micro, el cámara con su cámara, Schmidt que habla
  const fr = W.PHRASE, gira = tramo(t, W.WENT - 0.1, W.WORLD + 0.4);
  const s = R.actor(GB.schmidtGB, 104, 168, t, { dir: 1, habla: Math.sin(t * 8) > -0.2, dedo: t > fr - 0.2 && t < fr + 0.8, sonrisa: t > W.WORLD });
  R.actor(EL.periodista2025, 138, 170, t, { dir: -1, sorpresa: t > fr && t < fr + 0.6 });
  const cm = R.actor(EL.camarografo, 176, 172, t, { dir: -1, sostiene: [164, 150] });
  camara(cm.mano[0] - 2, cm.mano[1] - 2);
  const fl = (t > fr && t < fr + 0.12) || (t > W.WORLD && t < W.WORLD + 0.12);
  if (fl) for (let y = 120; y < 180; y++) for (let x = 100; x < 240; x++) { const d = Math.hypot(x - 160, (y - 148) * 1.6) / 70; if (d < 1) tine(x, y, H('#ffffff'), 0.55 * (1 - d)); }
  // el bocadillo: el pilar → la casa (primero el templo, después la ciudad)
  bocata(s.cabeza[0] - 6, s.cabeza[1] - 20, 34, 16, pop(t, fr, 0.35) * (1 - tramo(t, W.FIRST - 0.4, W.FIRST - 0.2)), (cx, cy) => { iconoT(cx - 9, cy + 2); flecha(cx - 3, cy, cx + 4, H('#3a3a3a')); iconoCasa(cx + 10, cy + 1); });
  // el globo que gira con las hojas de periódico que le dan la vuelta
  const g = pop(t, W.WENT - 0.2, 0.4);
  if (g > 0) { const gx = 236, gy = 100, r = ri(17 * g); globo(gx, gy, r, t);
    for (let k = 0; k < 5; k++) { const a = gira * 6.3 + k * 1.25 + t * 1.2, px = gx + Math.cos(a) * 30, py = gy + Math.sin(a) * 10; if (Math.sin(a) < 0 === false || k % 2) hoja(px, py, a * 0.5); else hoja(px, py, a * 0.5); } }
  // las hojas salen de la cámara hacia el globo
  for (let k = 0; k < 3; k++) { const u = tramo(t, W.WENT - 0.3 + k * 0.2, W.WORLD + k * 0.2); if (u > 0 && u < 1) hoja(lerp(164, 236, u), lerp(146, 100, u) - Math.sin(u * Math.PI) * 30, u * 8); }
};

// ── 6 · en el estudio: primero el templo, luego la ciudad (Atom pone el pilar de juguete y después las casitas) ─────
const p6 = (t) => {
  T.estudio(R, t, { camara: 'mesa' });
  // el pilar cae en «first came the temple»; las casitas, una a una, en «then the city»
  const cP = pop(t, W.TEMPLE - 0.15, 0.35);
  if (cP > 0) { const y = ri(lerp(70, 148, Math.min(1, cP))); T.d_pilar(R, 148, y, { escala: 0.9, brazos: true, luz: 0.6, sem: 7 }); }
  if (t > W.TEMPLE && t < W.TEMPLE + 0.5) for (let k = 0; k < 8; k++) tine(140 + k * 4, 146 - (k % 3), H('#e8dcc0'), 0.6);
  const casas = [[180, 150, 9, 10], [200, 150, 8, 13], [219, 151, 9, 9], [190, 138, 7, 8], [210, 136, 7, 9]];
  casas.forEach(([x, y, w, hh], k) => { const c = pop(t, W.THEN + k * 0.18, 0.3); if (c > 0) casita(x, ri(lerp(y - 40, y, Math.min(1, c))), w, hh, k); });
  if (t > W.CITY + 0.2) humo(200, 124, t, 4, 18, 0.45);
  // los números de cada cosa
  const n1 = pop(t, W.TEMPLE + 0.2, 0.3); if (n1 > 0) R.numero('9600', 148, ri(92 - n1 * 4), { centro: true });
  const n2 = pop(t, W.CITY + 0.1, 0.3); if (n2 > 0) R.numero('7400', 200, ri(110 - n2 * 4), { centro: true });
  if (n2 > 0) for (let x = 160; x < 184; x += 3) ps(x, 98 + ri((x - 160) * 0.3), H('#ffe070'));
  // Atom entra, deja paso, señala el pilar y después las casas
  const u = tramo(t, P6, W.TEMPLE - 0.2), ax = ri(lerp(-20, 116, ease(u)));
  T.AT.atom(R, ax, 152, t, { s: 2, dir: 1, pose: u < 1 ? 'camina' : t < W.THEN ? 'senala' : t < W.CITY + 0.6 ? 'brazos' : 'senala', cara: t > W.CITY ? 'sonrisa' : 'normal', habla: Math.sin(t * 12) > 0 ? 1 : 0 });
  T.estudioDelante(R, t, { camara: 'mesa' });
};

// ── 7 · desde el aire: el cerro de los pilares y los montes Karacadağ, a treinta kilómetros ─────────────────────────
const aireFondo = () => {
  // la llanura de caliza y estepa con su textura de parcelas naturales, cauces secos y matas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h2(x >> 2, y >> 2, 51) * 0.9 + h2(x >> 4, y >> 3, 52) * 1.1 + h2(x, y, 53) * 0.4;
    R.pset(x, y, rmp(pal(['#8a7a4e', '#a8965e', '#c0ac72', '#d4c288', '#e2d29c']), 1.6 + n * 0.9 - (y < 24 && x < 200 ? 0.3 : 0), x, y)); }
  // el Éufrates lejos a la izquierda, con su verde de orilla
  for (let y = 0; y < 180; y++) { const x = ri(12 + Math.sin(y * 0.05) * 6 + Math.sin(y * 0.13) * 2); for (let i = -6; i <= 6; i++) R.pset(x + i, y, Math.abs(i) > 3 ? H('#6a8a42') : Math.abs(i) > 2 ? H('#2a5a8a') : (y + i) % 7 === 0 ? H('#8ab8e8') : H('#3a72b0')); }
  // el campo volcánico de los Karacadağ: coladas oscuras, conos con su cráter y laderas con trigo silvestre (motas doradas)
  for (let y = 30; y < 180; y++) for (let x = 150; x < 320; x++) { const dx = (x - 262) / 78, dy = (y - 112) / 64, d = dx * dx + dy * dy + (h2(x >> 3, y >> 3, 54) - 0.5) * 0.45 + Math.sin(Math.atan2(dy, dx) * 7) * 0.12; if (d > 1) continue;
    const ray = (h2(x >> 2, y >> 2, 55) - 0.5) * 0.9 + Math.sin(Math.atan2(dy, dx) * 5 + d * 6) * 0.25, v = 1.1 + (1 - d) * 1.5 + ray - (x - 262 + y - 112) / 110;
    R.pset(x, y, d > 0.82 && h2(x, y, 56) > 0.55 ? rmp(pal(['#a08a4a', '#c8a850', '#e0c070']), 1 + h2(x, y, 57), x, y) : rmp(pal(['#1e1c22', '#2e2c32', '#423e44', '#5a5458', '#767076']), v, x, y)); }
  for (const [x, y, r] of [[262, 108, 7], [236, 132, 5], [288, 86, 5], [214, 98, 4], [282, 140, 4]]) { R.disco(x + 1, y + 1, r + 1, H('#141216')); R.disco(x, y, r, H('#5e5458')); R.disco(x - 1, y - 1, r - 1, H('#7a6e70')); R.disco(x + 1, y + 1, Math.max(1, r - 3), H('#2a2226')); }
  // pistacheros y almendros sueltos con su sombra, afloramientos de caliza y cauces secos que serpentean
  for (let k = 0; k < 70; k++) { const x = ri(h2(k, 1, 91) * 300 + 10), y = ri(h2(k, 2, 91) * 170 + 5); const dx = (x - 262) / 78, dy = (y - 112) / 64; if (dx * dx + dy * dy < 1.1 || (x < 200 && y < 26)) continue;
    R.disco(x + 1, y + 1, 2, H('#6a5a34')); R.disco(x, y, 2, H('#3e5a2a')); ps(x - 1, y - 1, H('#6a8a3a')); }
  for (let k = 0; k < 26; k++) { const x = ri(h2(k, 3, 92) * 220 + 30), y = ri(h2(k, 4, 92) * 140 + 34), w = 3 + ri(h2(k, 5, 92) * 5); for (let i = -w; i <= w; i++) for (let j = -2; j <= 2; j++) if (h2(x + i, y + j, 93) > 0.35 && i * i / (w * w) + j * j / 5 < 1) R.pset(x + i, y + j, j < 0 ? H('#ece2c4') : H('#c8bc98')); }
  for (const [x0, y0, a] of [[40, 150, -0.4], [110, 40, 0.5], [150, 170, -0.7], [30, 60, 0.2]]) { let x = x0, y = y0; for (let k = 0; k < 70; k++) { x += Math.cos(a + Math.sin(k * 0.3) * 0.8); y += Math.sin(a + Math.sin(k * 0.3) * 0.8); R.pset(ri(x), ri(y), H('#8a7448')); R.pset(ri(x), ri(y) + 1, H('#e4d6aa')); } }
  // el cerro de los pilares: una loma clara con los recintos (anillos de piedra con sus pilares) y la cantera
  for (let y = 70; y < 130; y++) for (let x = 40; x < 120; x++) { const d = ((x - 78) / 38) ** 2 + ((y - 98) / 26) ** 2; if (d > 1) continue; R.pset(x, y, rmp(pal(['#b0a070', '#ccbc8a', '#e4d6a6', '#f2e8c4']), 3 - d * 2.2 - (x - 78) / 60 + h2(x, y, 58) * 0.5, x, y)); }
  for (const [cx, cy, r] of [[70, 96, 6], [84, 102, 5], [78, 88, 4], [92, 92, 4]]) { for (let a = 0; a < 6.28; a += 0.25) ps(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.8, H('#7a6a4a')); ps(cx, cy, H('#4a3e2a')); ps(cx + 1, cy - 1, H('#fff6dc')); }
  // un cauce seco que baja de los montes hacia la llanura
  for (let x = 120; x < 220; x++) { const y = ri(150 - (x - 120) * 0.25 + Math.sin(x * 0.12) * 3); R.pset(x, y, H('#7a6a44')); R.pset(x, y + 1, H('#e8dcb0')); }
};
const P_CERRO = [78, 96], P_MONTE = [226, 110];
const chinche = (x, y, u, c) => { if (u <= 0) return; const s = Math.min(1, u), alto = ri((1 - s) * 20); R.disco(x + 2, y + 1, 2, H('#2a2a2a')); R.linea(x, y, x, y - 6 - alto, K); R.disco(x, y - 8 - alto, 4, K); R.disco(x, y - 8 - alto, 3, H(c)); ps(x - 1, y - 10 - alto, H('#ffffff')); };
const p7 = (t) => {
  capa('aire', aireFondo);
  // las sombras de las nubes que pasan por encima del paisaje, y la bandada de grullas
  for (const [x0, y0, w, v] of [[0, 40, 60, 6], [160, 130, 50, 5], [260, 60, 40, 7]]) { const cx = ((x0 + t * v) % 420) - 60;
    for (let y = y0 - 18; y < y0 + 18; y++) for (let x = ri(cx - w); x < cx + w; x++) { if (x < 0 || x > 319 || y < 0 || y > 179) continue; const d = ((x - cx) / w) ** 2 + ((y - y0) / 16) ** 2 + h2(x >> 2, y >> 2, 59) * 0.2; if (d < 1 && b4(x, y) < 0.55) tine(x, y, H('#1a2a3a'), 0.3); } }
  for (let k = 0; k < 7; k++) { const x = ((t * 14 + 40) % 380) - 30 - Math.abs(k - 3) * 6, y = 150 - (k - 3) * 4 + Math.abs(k - 3) * 2; if (x > 0 && x < 320) { ps(x, y, H('#2a2a2a')); ps(x - 1, y - 1, H('#e8e8e8')); ps(x + 1, y - 1, H('#e8e8e8')); } }
  // las gacelas diminutas que cruzan la llanura y el humo del cerro
  for (let k = 0; k < 5; k++) { const x = 140 + ((t * 5 + k * 9) % 60), y = 60 + k * 3; ps(x, y, H('#8a5a2a')); ps(x + 1, y, H('#e8d8b8')); }
  humo(84, 88, t, 4, 16, 0.4);
  // los dos lugares con su chincheta, la regla de treinta y las huellas de un día de camino
  const c1 = pop(t, W.DETAIL, 0.4), c2 = pop(t, W.MORE, 0.4), regla = tramo(t, W.SOME - 0.1, W.KILOMETERS + 0.2), n30 = pop(t, W.N30, 0.35);
  if (c1 > 0 && t > W.DETAIL + 0.4 && t < W.STRIKING) for (let a = 0; a < 6.28; a += 0.2) { const r = 10 + (t * 20 % 10); tine(P_CERRO[0] + Math.cos(a) * r, P_CERRO[1] + Math.sin(a) * r * 0.7, H('#ffffff'), 0.7); }
  if (regla > 0) { const x1 = lerp(P_CERRO[0], P_MONTE[0], regla), y1 = lerp(P_CERRO[1], P_MONTE[1], regla);
    for (let k = 0; k <= 1; k += 1 / 120) { if (k > regla) break; const x = lerp(P_CERRO[0], P_MONTE[0], k), y = lerp(P_CERRO[1], P_MONTE[1], k); ps(x, y + 1, K); ps(x, y, Math.floor(k * 30) % 2 ? H('#f8f4ea') : H('#e83a2a')); }
    rr(ri(x1) - 1, ri(y1) - 3, ri(x1), ri(y1) + 3, K); }
  if (n30 > 0) R.numero('30', 152, ri(84 - n30 * 4), { tam: 16, centro: true });
  const hu = tramo(t, W.AWAY - 0.2, P8);
  for (let k = 0; k < 14; k++) { if (k / 14 > hu) break; const x = lerp(P_CERRO[0] + 6, P_MONTE[0] - 6, k / 14), y = lerp(P_CERRO[1], P_MONTE[1], k / 14) + 6 + (k % 2) * 2; rr(ri(x), ri(y), ri(x) + 1, ri(y) + 1, H('#3a2a1a')); }
  chinche(P_CERRO[0], P_CERRO[1], c1, '#e83a3a'); chinche(P_MONTE[0], P_MONTE[1], c2, '#3a7ae8');
  if (c1 > 0) iconoT(P_CERRO[0] - 12, P_CERRO[1] - 10, H('#f2e8c4'));
};

// ── 8 · el trigal con los Karacadağ detrás: un día de camino; la línea de luz une las laderas con el cerro ─────────
const p8 = (t) => {
  T.neolitico(R, t, { camara: 'trigo', camino: t > W.WALK - 0.2 });
  // dos que vuelven del monte por la senda con su cesta y su lanza; en «rise» se paran y miran atrás, a los montes
  const u = tramo(t, P8, W.RISE - 0.1), v = tramo(t, W.MOUNTAINS + 0.2, P9 + 0.2), mira = t > W.RISE - 0.1 && t < W.MOUNTAINS + 0.2;
  const x1 = ri(lerp(330, 210, ease(u)) - v * 70), x2 = ri(lerp(356, 236, ease(u)) - v * 70);
  const a = R.actor(GB.cazadora2GB, x1, 156, t, { dir: mira ? 1 : -1, anda: (u > 0 && u < 1) || (v > 0 && v < 1), dedo: mira, sonrisa: mira, sostiene: mira ? undefined : true });
  if (!mira) cesta(a.mano[0] - 1, a.mano[1] + 4, 12, 6, (x, y) => { for (let k = -4; k <= 4; k += 2) espiga(x + k, y + 4, 6, k * 0.3, ESP, 1); });
  const b = R.actor(GB.cazador2GB, x2, 160, t, { dir: mira ? 1 : -1, anda: (u > 0 && u < 1) || (v > 0 && v < 1), sostiene: true, sorpresa: mira });
  lanza(b.mano[0], b.mano[1], mira ? 1 : -1);
  T.neoliticoDelante(R, t, { camara: 'trigo' });
};

// ── 9 · 1997, el laboratorio de genética: el árbol de ADN del trigo escanda lleva a los Karacadağ ───────────────────
const labFondo = () => {
  // la pared verde pálida con su trama, el techo con el fluorescente y el zócalo de azulejos
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 6 ? (y === 5 ? H('#a8b0a8') : H('#e8ece4')) : y > 86 ? (((x % 10) === 0 || ((y - 87) % 10) === 0) ? H('#b8c4bc') : rmp(pal(['#dce6e0', '#eef4f0', '#f8fcf8']), 1 + h2(x >> 3, (y - 87) >> 3, 61) * 1.5, x, y)) : rmp(pal(['#a8c2b2', '#b8d0c0', '#c6dacc', '#d2e2d6']), 1.4 + h2(x >> 1, y >> 2, 62) * 0.8 + (y - 6) / 160, x, y));
  rr(200, 0, 262, 4, K); rr(201, 0, 261, 3, H('#f8fff8'));
  // el corcho con sus cosas: la foto de los montes con su chincheta, el árbol impreso y una espiga
  rr(28, 26, 112, 80, K); rr(29, 27, 111, 79, H('#6a4a2a')); for (let y = 29; y < 78; y++) for (let x = 31; x < 110; x++) R.pset(x, y, rmp(pal(['#a87a4a', '#c0905a', '#d4a46a']), h2(x, y, 63) * 2.4, x, y));
  rr(36, 32, 66, 54, K); rr(37, 33, 65, 53, H('#f4f4f0')); for (let y = 35; y < 52; y++) for (let x = 39; x < 64; x++) R.pset(x, y, y < 44 - Math.max(0, 8 - Math.abs(x - 56)) * 0.9 ? H('#8ab4e0') : y < 46 ? H('#3a3840') : H('#c8a850'));
  R.disco(51, 32, 2, H('#e83a3a')); ps(50, 31, H('#ffffff'));
  rr(72, 34, 104, 74, K); rr(73, 35, 103, 73, H('#fbfbf6')); for (let k = 0; k < 6; k++) { R.linea(76, 39 + k * 6, 86 + (k % 3) * 3, 39 + k * 6, H('#4a4a4a')); } R.linea(86, 39, 86, 69, H('#4a4a4a')); R.linea(92, 42, 92, 66, H('#4a4a4a')); R.linea(86, 54, 98, 54, H('#4a4a4a'));
  espiga(46, 76, 14, 1, ESP, 1); R.linea(40, 62, 56, 62, H('#e8e0c8'));
  // el calendario de 1997, el reloj, la estantería de frascos y el cartel de la doble hélice
  rr(122, 28, 152, 66, K); rr(123, 29, 151, 65, H('#fbfbf6')); rr(123, 29, 151, 37, H('#c83a3a')); cifras('1997', 130, 31, H('#ffffff'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) rr(126 + i * 4, 41 + j * 6, 127 + i * 4, 42 + j * 6, H('#9a9a9a'));
  R.disco(176, 40, 9, K); R.disco(176, 40, 8, H('#fbfbf6')); R.disco(176, 40, 7, H('#f0f0ea')); for (let k = 0; k < 12; k++) ps(176 + ri(Math.cos(k * 0.52) * 6), 40 + ri(Math.sin(k * 0.52) * 6), H('#4a4a4a'));
  rr(196, 56, 272, 58, K); rr(197, 56, 271, 57, H('#8a6a44'));
  [[200, '#7a4a1a', 12], [208, '#3a6ab0', 9], [216, '#e8e8e0', 13], [224, '#7a4a1a', 8], [232, '#3a8a5a', 11], [242, '#d8c040', 6], [252, '#e8e8e0', 10], [262, '#7a4a1a', 12]].forEach(([x, c, hh]) => { rr(x, 55 - hh, x + 6, 55, K); rr(x + 1, 56 - hh, x + 5, 54, H(c)); rr(x + 1, 56 - hh, x + 2, 54, H('#ffffff')); rr(x + 2, 53 - hh, x + 4, 55 - hh, K); });
  rr(280, 52, 312, 98, K); rr(281, 53, 311, 97, H('#1e2a4a')); for (let y = 56; y < 95; y++) { const a = Math.sin(y * 0.3) * 9; ps(296 + a, y, H('#ff6a6a')); ps(296 - a, y, H('#6ab4ff')); if (y % 4 === 0) R.linea(ri(296 - a), y, ri(296 + a), y, H('#8a9ab8')); }
  // la encimera gris moteada con su canto y los armarios de debajo
  for (let y = 108; y < 120; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 108 ? K : y > 116 ? H('#6a6e70') : rmp(pal(['#9aa0a2', '#b4babc', '#cad0d0']), 1.2 + h2(x, y, 64) * 1.2, x, y));
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, ((x % 64) < 1 || y === 120) ? H('#4a4e50') : rmp(pal(['#c8ccc4', '#d6dad2', '#e2e6de']), 1.4 - (y - 120) / 80 + h2(x >> 2, y >> 2, 65) * 0.5, x, y));
  for (let k = 0; k < 5; k++) { const x0 = k * 64 + 4; rr(x0, 124, x0 + 56, 125, H('#f2f6ee')); rr(x0, 124, x0, 168, H('#f2f6ee')); rr(x0 + 56, 124, x0 + 56, 168, H('#9aa098')); rr(x0, 168, x0 + 56, 168, H('#9aa098'));
    rr(k * 64 + 50, 132, k * 64 + 56, 134, K); rr(k * 64 + 51, 132, k * 64 + 55, 133, H('#a8acb0'));
    rr(x0 + 6, 128, x0 + 18, 135, K); rr(x0 + 7, 129, x0 + 17, 134, H('#fbfbf2')); cifras(String(k + 11), x0 + 8, 130, H('#3a3a3a')); }
  // el carro con el termo de nitrógeno, las cajas de sobres y el cable por el suelo
  rr(30, 140, 92, 143, K); rr(31, 141, 91, 142, H('#a8acb0')); rr(30, 164, 92, 166, K); rr(32, 143, 33, 166, H('#6a6e70')); rr(89, 143, 90, 166, H('#6a6e70')); for (const x of [34, 88]) { R.disco(x, 169, 2, K); ps(x, 169, H('#8a8a8a')); }
  rr(40, 112, 60, 140, K); rr(41, 113, 59, 139, H('#c8ced2')); rr(41, 113, 44, 139, H('#eef2f4')); rr(45, 108, 55, 113, K); rr(46, 109, 54, 112, H('#8a9096')); rr(44, 124, 56, 128, H('#3a6ab0'));
  for (const [x, c] of [[66, '#c8a46a'], [78, '#b8945a']]) { rr(x, 150, x + 11, 163, K); rr(x + 1, 151, x + 10, 162, H(c)); rr(x + 1, 151, x + 10, 152, H('#e0c08a')); cifras('5', x + 4, 155, H('#5a3a1a')); }
  for (let x = 100; x < 300; x++) { const y = 175 + ri(Math.sin(x * 0.06) * 1.5); R.pset(x, y, H('#2a2a2e')); }
  rr(0, 172, 320, 180, H('#7a7e78')); for (let x = 0; x < 320; x += 16) R.linea(x, 172, x, 180, H('#6a6e68'));
  // la cubeta de electroforesis, la centrífuga, la gradilla con tubos, la pipeta y el teclado
  rr(52, 94, 102, 108, K); rr(53, 95, 101, 107, H('#3a3448')); rr(54, 96, 100, 106, H('#4a2a6a'));
  rr(226, 92, 256, 108, K); rr(227, 93, 255, 107, H('#e8e8e2')); R.disco(241, 96, 10, K); R.disco(241, 96, 9, H('#d0d4d6')); rr(227, 100, 255, 107, H('#dcdcd6')); rr(229, 103, 233, 105, H('#3a3a3a'));
  rr(264, 100, 300, 108, K); rr(265, 101, 299, 107, H('#3a7ac8')); for (let i = 0; i < 7; i++) { rr(267 + i * 5, 86, 270 + i * 5, 101, K); rr(268 + i * 5, 87, 269 + i * 5, 100, H('#eaf6fa')); rr(268 + i * 5, 94, 269 + i * 5, 100, i % 2 ? H('#e8c040') : H('#8ad0a0')); }
  R.linea(110, 106, 120, 88, K); R.linea(111, 106, 121, 88, H('#e8e8e0')); rr(118, 86, 122, 90, H('#c83a3a'));
  rr(148, 108, 202, 113, K); rr(149, 109, 201, 112, H('#d8d0b8')); for (let i = 0; i < 12; i++) ps(151 + i * 4, 110, H('#8a8470'));
};
const p9 = (t) => {
  capa('lab97', labFondo);
  // el monitor de tubo con el árbol que se dibuja: las ramas se juntan y llevan a un punto, que se enciende con el monte
  rr(150, 70, 202, 106, K); rr(151, 71, 201, 105, H('#d8d0b8')); rr(151, 103, 201, 105, H('#b8b098')); rr(166, 106, 186, 109, H('#a8a088'));
  rr(155, 74, 197, 100, K); rr(156, 75, 196, 99, H('#0e2a1a'));
  const dib = tramo(t, W.DNA - 0.1, W.ORIGIN + 0.2), ori = t > W.ORIGIN, G = H('#5aff8a');
  const hojas = [77, 80, 83, 86, 89, 92, 95, 97];
  hojas.forEach((y, k) => { const len = ri(Math.min(1, dib * 2.2) * 10); R.linea(158, y, 158 + len, y, G); });
  if (dib > 0.45) { const u = Math.min(1, (dib - 0.45) * 3); for (const [y0, y1, x] of [[77, 80, 168], [83, 86, 168], [89, 92, 168], [95, 97, 168]]) { R.linea(x, y0, x, y1, G); R.linea(x, ri((y0 + y1) / 2), x + ri(u * 8), ri((y0 + y1) / 2), G); } }
  if (dib > 0.75) { const u = Math.min(1, (dib - 0.75) * 4); R.linea(176, 78, 176, 90, G); R.linea(176, 84, 176 + ri(u * 6), 84, G); R.linea(176, 87, 176, 96, G); R.linea(176, 91, 176 + ri(u * 6), 91, G); }
  if (dib >= 1) { R.linea(182, 84, 182, 91, G); R.linea(182, 87, 188, 87, G); }
  if (ori) { const on = Math.floor(t * 5) % 2; R.disco(190, 87, 2, on ? H('#ff4a4a') : H('#ffd040')); R.poligono([[186, 82], [190, 77], [194, 82]], H('#3a3a44')); ps(190, 78, H('#ffffff')); }
  for (let y = 75; y < 100; y += 2) for (let x = 156; x < 197; x++) tine(x, y, H('#000000'), 0.18);
  // la cubeta brilla con sus bandas, la centrífuga gira, el reloj corre
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) if (h2(i, j, 66) > 0.35) rr(57 + i * 7, 98 + j * 2, 61 + i * 7, 98 + j * 2, (Math.sin(t * 3 + i) > 0.8) ? H('#c8a0ff') : H('#9a6ae8'));
  // el vapor frío del termo
  for (let k = 0; k < 5; k++) { const v = (t * 0.6 + k / 5) % 1; for (let q = 0; q < 3; q++) tine(50 + Math.sin(v * 6 + k) * 3 + q, 106 - v * 24, H('#ffffff'), 0.55 * (1 - v)); }
  const g = t * 9; ps(241 + ri(Math.cos(g) * 6), 96 + ri(Math.sin(g) * 6), H('#3a3a3a')); ps(241 - ri(Math.cos(g) * 6), 96 - ri(Math.sin(g) * 6), H('#3a3a3a')); if (Math.floor(t * 2) % 2) ps(252, 104, H('#5aff5a'));
  R.linea(176, 40, 176 + ri(Math.cos(t * 1.05 - 1.57) * 6), 40 + ri(Math.sin(t * 1.05 - 1.57) * 6), H('#c83a3a')); R.linea(176, 40, 180, 38, K);
  // el 1997 del calendario se ilumina
  const cal = pop(t, W.N1997, 0.3); if (cal > 0 && t < W.N1997 + 1.4) esquinas(121, 27, 153, 67, t, 1);
  // la genetista señala la pantalla; su compañero llega con la bandeja de sobres de semillas y se sorprende
  const se = R.actor(GB.laboratorioGB, 132, 162, t, { dir: 1, dedo: t > W.TRACED - 0.2, habla: t > W.STUDY && t < W.ORIGIN && Math.sin(t * 9) > 0, sonrisa: t > W.ENCORN });
  const u = tramo(t, P9 + 0.2, W.STUDY), x2 = ri(lerp(340, 236, ease(u)));
  const co = R.actor(EL.cientifico, x2, 166, t, { dir: -1, anda: u > 0 && u < 1, sostiene: true, sorpresa: t > W.ORIGIN && t < W.ENCORN + 0.4, sonrisa: t > W.ENCORN + 0.4 });
  rr(co.mano[0] - 9, co.mano[1] - 1, co.mano[0] + 3, co.mano[1] + 1, K); rr(co.mano[0] - 8, co.mano[1] - 1, co.mano[0] + 2, co.mano[1], H('#a8b0b4'));
  for (let k = 0; k < 3; k++) { rr(co.mano[0] - 7 + k * 3, co.mano[1] - 5, co.mano[0] - 5 + k * 3, co.mano[1] - 1, K); ps(co.mano[0] - 6 + k * 3, co.mano[1] - 4, H('#e8dcb0')); ps(co.mano[0] - 6 + k * 3, co.mano[1] - 3, H('#c8a850')); }
  if (t > W.ENCORN) { const b = pop(t, W.ENCORN, 0.3); bocata(co.cabeza[0], co.cabeza[1] - 14, 18, 18, b, (cx, cy) => espiga(cx, cy + 7, 8, 0.5, ESP, 1)); }
  // el taburete y la papelera, por delante
  rr(196, 160, 214, 163, K); rr(197, 161, 213, 162, H('#3a5a8a')); rr(204, 163, 206, 178, K);
  rr(20, 160, 36, 178, K); rr(21, 161, 35, 177, H('#7a8a7a')); rr(21, 161, 35, 162, H('#9aaa9a'));
};

// ── 10 · la mesa del laboratorio de cerca: la espiga de escanda bajo la lupa; la chincheta en las laderas ───────────
const mesaFondo = () => {
  for (let y = 0; y < 74; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#a8c2b2', '#b8d0c0', '#c6dacc', '#d2e2d6']), 1.6 + h2(x >> 1, y >> 2, 71) * 0.8 - y / 120, x, y));
  // los botes de la balda (izquierda) y el borde del corcho (derecha), por debajo de la barra del año
  rr(10, 56, 140, 58, K); rr(11, 56, 139, 57, H('#8a6a44'));
  [[16, '#7a4a1a', 14], [30, '#eaeae2', 10], [42, '#3a6ab0', 16], [58, '#7a4a1a', 12], [72, '#3a8a5a', 9], [86, '#eaeae2', 15], [102, '#d8c040', 11], [118, '#7a4a1a', 13]].forEach(([x, c, hh]) => { rr(x, 55 - hh, x + 9, 55, K); rr(x + 1, 56 - hh, x + 8, 54, H(c)); rr(x + 1, 56 - hh, x + 2, 54, H('#ffffff')); rr(x + 2, 53 - hh, x + 7, 55 - hh, K); rr(x + 3, 51 - hh, x + 6, 53 - hh, H('#2a2a2a')); });
  rr(170, 26, 262, 74, K); rr(171, 27, 261, 74, H('#6a4a2a')); for (let y = 29; y < 74; y++) for (let x = 173; x < 260; x++) R.pset(x, y, rmp(pal(['#a87a4a', '#c0905a', '#d4a46a']), h2(x, y, 72) * 2.4, x, y));
  rr(180, 32, 212, 70, K); rr(181, 33, 211, 69, H('#fbfbf6')); for (let k = 0; k < 8; k++) R.linea(184, 37 + k * 4, 196 + (k * 5) % 12, 37 + k * 4, H('#4a4a4a')); R.linea(196, 37, 196, 65, H('#4a4a4a')); R.linea(203, 45, 203, 57, H('#4a4a4a')); R.linea(196, 51, 208, 51, H('#4a4a4a'));
  rr(220, 34, 254, 62, K); rr(221, 35, 253, 61, H('#f2e8c8')); for (let k = 0; k < 4; k++) R.linea(224, 40 + k * 5, 250, 40 + k * 5, H('#c8b890'));
  // la encimera: el canto y la superficie moteada
  for (let y = 74; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 78 ? (y === 74 ? K : H('#5a5e60')) : rmp(pal(['#8a9092', '#a2a8aa', '#b8bec0', '#ccd2d2']), 2.2 - (y - 78) / 120 + h2(x, y, 73) * 0.9 + h2(x >> 3, y >> 3, 74) * 0.4, x, y));
  // la bandeja blanca con su papel, las placas de Petri con granos y números, las pinzas y el cuaderno de cuadros
  rr(20, 124, 154, 174, K); rr(21, 125, 153, 173, H('#f4f6f4')); rr(21, 170, 153, 173, H('#d0d4d0')); rr(26, 129, 148, 168, H('#fdfdf8'));
  for (const [x, y, n] of [[46, 98, 1], [84, 100, 2]]) { R.disco(x, y, 13, H('#7a8488')); R.disco(x, y, 12, H('#e8f2f4')); R.disco(x, y, 10, H('#f8fcfc')); for (let k = 0; k < 9; k++) { const gx = x - 6 + (k * 5) % 12, gy = y - 4 + (k * 7) % 9; rr(gx, gy, gx + 2, gy + 1, K); ps(gx + 1, gy, n === 1 ? H('#d8a848') : H('#c89038')); } ps(x - 7, y - 7, H('#ffffff')); ps(x - 6, y - 8, H('#ffffff')); rr(x + 8, y + 8, x + 15, y + 14, K); rr(x + 9, y + 9, x + 14, y + 13, H('#fbfbf6')); cifras(String(n), x + 10, y + 9, K); }
  R.linea(160, 150, 188, 140, K); R.linea(160, 151, 188, 142, K); R.linea(161, 150, 187, 141, H('#c8ccd0'));
  // la regleta de enchufes con sus cables, debajo de la esquina de Atom
  rr(272, 64, 312, 70, K); rr(273, 65, 311, 69, H('#eeeee6')); for (let k = 0; k < 4; k++) { rr(277 + k * 9, 66, 280 + k * 9, 68, H('#3a3a3a')); } R.linea(286, 70, 290, 88, H('#2a2a2e')); R.linea(304, 70, 300, 88, H('#2a2a2e'));
  rr(250, 88, 312, 126, K); rr(251, 89, 311, 125, H('#fbfbf2')); for (let y = 92; y < 124; y += 4) R.linea(252, y, 310, y, H('#c8d4e8')); for (let x = 256; x < 311; x += 4) R.linea(x, 90, x, 124, H('#dde6f2')); R.linea(256, 120, 270, 110, H('#3a5aa8')); R.linea(270, 110, 282, 114, H('#3a5aa8')); R.linea(282, 114, 300, 98, H('#3a5aa8'));
  // la caja de puntas de pipeta y el lápiz
  rr(166, 94, 210, 118, K); rr(167, 95, 209, 117, H('#3a6ab0')); for (let j = 0; j < 4; j++) for (let i = 0; i < 8; i++) { ps(170 + i * 5, 98 + j * 5, H('#f4f4e8')); ps(171 + i * 5, 98 + j * 5, H('#c8d8f0')); } rr(167, 113, 209, 117, H('#2a4a88'));
  R.linea(214, 118, 240, 110, K); R.linea(214, 119, 240, 111, H('#e8c040')); ps(241, 110, H('#3a3a3a'));
  // la foto de las laderas de los Karacadağ, sobre la mesa
  rr(196, 132, 262, 172, K); rr(197, 133, 261, 171, H('#fbfbf6'));
  for (let y = 136; y < 166; y++) for (let x = 200; x < 258; x++) { const cima = 148 - Math.max(0, 16 - Math.abs(x - 238) * 0.6) * 0.8 + Math.sin(x * 0.3) * 0.6;
    R.pset(x, y, y < cima ? rmp(pal(['#7aa6d6', '#98bce2', '#b8d2ea']), (y - 136) / 6, x, y) : y < cima + 8 ? rmp(pal(['#2e2c32', '#423e44', '#5a5458']), 1 + h2(x, y, 75), x, y) : rmp(pal(['#a8822e', '#c8a248', '#e2c46a']), 1 + h2(x, y, 76) * 1.4, x, y)); }
};
const espigaGrande = (x, y, t, brillo) => { // la espiga de escanda tumbada en la bandeja: tallo, raquis y espiguillas en espiga con sus barbas
  R.linea(x - 46, y + 4, x - 2, y, K); R.linea(x - 46, y + 3, x - 2, y - 1, H('#a8782c')); R.linea(x - 30, y + 2, x - 40, y - 6, H('#a8782c')); R.linea(x - 40, y - 6, x - 52, y - 9, H('#c8a050'));
  for (let i = 13; i >= 0; i--) { const gx = x + i * 4, lado = i % 2 ? 1 : -1, gy = y + lado * 2, c1 = brillo ? H('#f8d060') : H('#d8a848'), c2 = brillo ? H('#fff0a0') : H('#f0cc70');
    for (let b = 2; b < 14; b++) ps(gx + 2 + b, gy + lado * (1 + b * 0.55), b > 10 ? H('#c8a050') : H('#a87a2c'));
    R.poligono([[gx - 3, gy], [gx, gy - 3 * lado], [gx + 5, gy - lado], [gx + 2, gy + 2 * lado]], K); R.poligono([[gx - 2, gy], [gx, gy - 2 * lado], [gx + 4, gy - lado], [gx + 2, gy + lado]], c1); ps(gx, gy - lado, c2); }
  R.linea(x - 2, y, x + 56, y, H('#8a6020'));
};
const p10 = (t) => {
  capa('mesa97', mesaFondo);
  const br = t > W.DOMESTICATED2 && t < W.CEREALS2 + 0.8;
  espigaGrande(66, 148, t, br);
  if (br) { destello(80, 138, 3); destello(108, 154, 2); destello(124, 140, 3); }
  // la lupa, en la mano izquierda, recorre la espiga
  const lu = tramo(t, P10 - 0.1, W.WORLD2), sal = tramo(t, W.WORLD2, W.TO2 + 0.2);
  const mx = lerp(40, 124, ease(lu)), my = 144 + sal * 50;
  if (sal < 1) { T.AT.lupa(R, mx, my, 2, 1); T.brazo(R, mx - 30, 208, mx - 4, my + 12, '#f2f2ee', 1); }
  // la mano derecha llega con la chincheta roja y la clava en las laderas de la foto en «slopes»
  const ll = ease(tramo(t, W.TO2, W.SLOPES - 0.1)), cl2 = t > W.SLOPES, va = tramo(t, W.SLOPES + 0.6, P11 - 0.3);
  const px = 222, py = 158;
  if (cl2) { R.disco(px + 2, py + 1, 2, H('#2a2a2a')); R.disco(px, py - 2, 4, K); R.disco(px, py - 2, 3, H('#e83a3a')); ps(px - 1, py - 3, H('#ffffff'));
    const r = tramo(t, W.SLOPES, W.SLOPES + 0.8); if (r < 1) for (let a = 0; a < 6.28; a += 0.3) tine(px + Math.cos(a) * r * 14, py - 2 + Math.sin(a) * r * 9, H('#ffffff'), 0.8 * (1 - r)); }
  if (ll > 0 && va < 1) { const hx = lerp(280, px + 8, ll) + va * 50, hy = lerp(204, py + 4, ll) + va * 40;
    if (!cl2) { R.disco(ri(hx) - 8, ri(hy) - 4, 4, K); R.disco(ri(hx) - 8, ri(hy) - 4, 3, H('#e83a3a')); }
    T.brazo(R, hx + 34, 210, hx, hy, '#f2f2ee', -1); }
};

// ── 11 · como si la agricultura hubiera nacido al lado de las piedras: la parcela que brota junto al recinto ────────
const juntoFondo = () => {
  degradado(0, 94, pal(['#7ea6d4', '#94b6dc', '#aac6e2', '#c2d6e6', '#dae2e2', '#e0e2dc']));
  // los Karacadağ: conos de escoria con su cráter, coladas de basalto y la luz por la izquierda; bruma al pie
  const perfil = (x) => 86 - Math.max(0, (x - 140) * 0.17) - Math.max(0, 9 - Math.abs(x - 214) * 0.5) - Math.max(0, 7 - Math.abs(x - 262) * 0.45) - Math.max(0, 6 - Math.abs(x - 178) * 0.6) - Math.sin(x * 0.09) * 1.2;
  for (let x = 0; x < 320; x++) { const yl = ri(84 - Math.sin(x * 0.04) * 3 - Math.sin(x * 0.11) * 1); for (let yy = yl; yy < 94; yy++) R.pset(x, yy, rmp(pal(['#a8aab0', '#b8b8b4', '#c8c4b4']), (yy - yl) / 5 + h2(x, yy, 88) * 0.6, x, yy)); }
  for (let x = 140; x < 320; x++) { const y = ri(perfil(x)), pend = perfil(x + 2) - perfil(x - 2); for (let yy = y; yy < 94; yy++) {
    const colada = Math.sin(x * 0.21 + yy * 0.5) > 0.82, v = 2.2 + pend * 0.35 - (yy - y) * 0.02 + h2(x >> 1, yy >> 1, 81) * 0.9 - (colada ? 0.9 : 0) + (yy > 86 ? (yy - 86) * 0.25 : 0);
    R.pset(x, yy, rmp(pal(['#24222a', '#34323a', '#46434c', '#5c5862', '#7c7880', '#a8a49c']), v, x, yy)); } }
  for (const [x, y] of [[214, 0], [262, 0], [178, 0]]) { const yy = ri(perfil(x)); rr(x - 3, yy, x + 3, yy + 1, H('#1a181e')); ps(x - 2, yy - 1, H('#7c7880')); }
  // la estepa y, a la izquierda, el cerro con el recinto: el muro en arco y sus pilares
  for (let y = 88; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#8a7a46', '#a8945a', '#c0aa6e', '#d4be84']), 2.6 - (y - 88) / 70 + h2(x >> 1, y >> 1, 82) * 0.9, x, y));
  for (let y = 82; y < 150; y++) for (let x = 0; x < 150; x++) { const top = 150 - 62 * Math.sqrt(Math.max(0, 1 - ((x - 60) / 92) ** 2)); if (y < top) continue;
    R.pset(x, y, rmp(pal(['#9a8a5a', '#b4a272', '#ccba8a', '#e0d0a0']), 3 - (y - top) / 30 - (x - 60) / 120 + h2(x >> 1, y >> 1, 83) * 0.6, x, y)); }
  for (let x = 14; x < 120; x++) { const y = ri(108 + Math.abs(x - 66) * 0.12); for (let j = 0; j < 6; j++) R.pset(x, y + j, (((x + (j % 2) * 3) % 6) < 5 && j % 3 < 2) ? rmp(PIEDRA, 2.2 - j * 0.3 + h2(x, j, 84) * 0.6, x, y + j) : H('#5a4a34')); }
  for (const [x, e] of [[30, 0.55], [56, 0.7], [82, 0.7], [106, 0.55]]) T.d_pilar(R, x, 110, { escala: e, brazos: e > 0.6, luz: 0.7, sem: x });
  // a la derecha, la parcela: surcos de tierra removida con su canto y unas piedras que la marcan
  for (let y = 132; y < 168; y++) for (let x = 156; x < 312; x++) { const s = (y - 132) % 6; R.pset(x, y, s === 0 ? H('#4a2e1c') : s < 3 ? rmp(TIERRA, 2.6 + h2(x, y, 85), x, y) : rmp(TIERRA, 1.6 + h2(x, y, 86), x, y)); }
  for (let k = 0; k < 14; k++) guijarro(158 + k * 11, 131 + (k % 2), 2, PIEDRA);
  for (let k = 0; k < 6; k++) guijarro(152, 136 + k * 6, 2, PIEDRA);
  for (let x = 0; x < 320; x += 9) if (x < 150 || x > 314) mata(x, 172 + (x % 7), 4, 5, 0, pal(['#6a5a2a', '#8a7a3a', '#c8b870']));
  // la estepa: matas, piedras, almendros y pistacheros sueltos, el sendero que baja del cerro a la parcela
  for (let k = 0; k < 40; k++) { const x = ri(h2(k, 1, 87) * 320), y = ri(96 + h2(k, 2, 87) * 80); if (x > 150 && x < 316 && y > 126 && y < 172) continue; if (x < 140 && y < 150 && y > 150 - 62 * Math.sqrt(Math.max(0, 1 - ((x - 60) / 92) ** 2))) continue;
    if (k % 3 === 0) guijarro(x, y, 1 + (k % 2), PIEDRA); else mata(x, y, 4, 3 + (k % 4), 0, pal(['#6a5a2a', '#8a7a3a', '#c8b870'])); }
  for (const [x, y, r] of [[176, 104, 5], [232, 100, 4], [300, 106, 5], [142, 112, 4]]) { R.linea(x, y, x, y + 6, H('#4a3424')); R.disco(x + 1, y + 1, r, H('#3a4a24')); R.disco(x, y, r, H('#4a6a32')); R.disco(x - 1, y - 1, r - 2, H('#6a8a42')); tine(x + 3, y + 7, K, 0.3); }
  for (let k = 0; k < 320; k++) { const x = ri(h2(k, 5, 89) * 320), y = ri(94 + h2(k, 6, 89) * 86); if (x > 150 && x < 316 && y > 126 && y < 172) continue; R.linea(x, y, x + (k % 3) - 1, y - 2 - (k % 2), k % 4 ? H('#8a7a40') : H('#a89a56')); ps(x + (k % 3) - 1, y - 3, H('#d8c888')); }
  for (let k = 0; k < 40; k++) { const u = k / 40, x = ri(lerp(120, 156, u) + Math.sin(u * 6) * 4), y = ri(lerp(146, 150, u)); R.pset(x, y, H('#d8c8a0')); R.pset(x + 1, y, H('#c8b890')); R.pset(x, y + 1, H('#b8a880')); }
};
const p11 = (t) => {
  capa('junto', juntoFondo); nubesVivas(t, 44, NUB, 3); nubesVivas(t * 0.6, 62, pal(['#9aaec6', '#dbe4ee', '#f4f8fc']), 5); pajaros(t, 40, H('#3a3a44'), 3);
  // gacelas que pastan lejos, al pie de los montes, y una que levanta la cabeza
  for (let k = 0; k < 5; k++) { const x = ri(196 + k * 11 + Math.sin(t * 0.3 + k) * 3), y = 98 + (k % 2) * 2, ca = Math.sin(t * 1.5 + k * 2) > 0.5 ? -1 : 0; rr(x, y, x + 4, y + 1, H('#a86a3a')); ps(x + 1, y + 2, H('#5a3a1a')); ps(x + 4, y + 2, H('#5a3a1a')); ps(x + 5, y - 1 + ca, H('#a86a3a')); ps(x + 1, y + 1, H('#f0e0c8')); }
  humo(60, 98, t, 4, 20, 0.35);
  // los brotes: salen en «born», crecen verdes y en «era» ya son espigas doradas
  const b = tramo(t, W.BORN - 0.1, W.STONES), d = tramo(t, W.LANDSCAPE, W.ERA + 0.2);
  for (let j = 0; j < 6; j++) for (let i = 0; i < 16; i++) { const x = 162 + i * 9 + (j % 2) * 4, y = 136 + j * 6, u = cl(b * 1.6 - (15 - i) * 0.04 - j * 0.05); if (u <= 0) continue;
    const alto = 2 + u * 8 + d * 6, inc = Math.sin(t * 1.8 + x * 0.05) * u * 1.4;
    if (d > 0.3) espiga(x, y, alto, inc, ESP, 1); else { R.linea(x, y, ri(x + inc), ri(y - alto), H('#3a7a2a')); ps(ri(x + inc), ri(y - alto), H('#8ad04a')); ps(ri(x + inc) - 1, ri(y - alto) + 1, H('#5aa83a')); } }
  if (t > W.BORN - 0.1 && t < W.BORN + 0.6) for (let k = 0; k < 5; k++) destello(176 + k * 28, 128 + (k % 2) * 8, 2);
  // la sembradora: recorre los surcos echando semilla; en «next to the stones» se vuelve y señala el recinto
  const u = tramo(t, P11 + 0.1, W.RIGHT - 0.1), x = ri(lerp(318, 206, u)), señ = t > W.RIGHT - 0.1 && t < W.LANDSCAPE;
  const s = R.actor(GB.cazadoraGB, x, 152, t, { dir: señ ? -1 : -1, anda: u > 0 && u < 1, dedo: señ || (u > 0 && u < 1 && Math.floor(t * 2) % 2 === 0), sonrisa: t > W.LANDSCAPE });
  if (u > 0 && u < 1) for (let k = 0; k < 5; k++) { const v = (t * 2 + k / 5) % 1; ps(x - 6 - v * 10, 132 + v * v * 18, H('#e8c060')); }
  if (señ) esquinas(18, 62, 120, 112, t, tramo(t, W.RIGHT, W.RIGHT + 0.2));
  // el niño con su vara espanta a los cuervos que picotean las semillas (salen volando en «landscape»)
  const sp = tramo(t, W.LANDSCAPE - 0.4, W.LANDSCAPE + 0.4), nx = ri(lerp(320, 270, sp));
  R.actor(GB.ninoGB, nx, 176, t, { dir: -1, anda: sp > 0 && sp < 1, brazos: sp >= 1 && t < W.ERA, sonrisa: sp >= 1 });
  for (let k = 0; k < 4; k++) { const vu = tramo(t, W.LANDSCAPE + k * 0.08, W.LANDSCAPE + 1.4 + k * 0.1), bx = 236 + k * 14 - vu * (40 + k * 20), by = 150 + (k % 2) * 4 - vu * (90 + k * 10);
    if (vu === 0) { const pic = Math.floor(t * 4 + k) % 2; rr(bx - 2, by - 3 + pic, bx + 2, by, K); ps(bx + 3, by - 2 + pic * 2, H('#e8c060')); ps(bx - 1, by - 2 + pic, H('#3a3a44')); } else if (by > 50) pajaro(bx, by, t, K, k); }
  // dos de los del recinto, en el cerro, que bajan a ver
  const w = tramo(t, W.SAME2, W.ERA), wx = ri(lerp(124, 146, w));
  R.actor(GB.cazadorGB, wx, 132, t, { dir: 1, anda: w > 0 && w < 1, sonrisa: w >= 1, dedo: w >= 1 });
  for (let x = 0; x < 34; x += 3) mata(x, 182, 5, 9, t, pal(['#6a5a2a', '#8a7a3a', '#d8c878']));
  for (let x = 292; x < 320; x += 3) mata(x, 182, 5, 9, t, pal(['#6a5a2a', '#8a7a3a', '#d8c878']));
};

// ── 12 · el banquete junto al recinto (el bloque BANQ; gb-banquete lo congela) ──────────────────────────────────────
const p12 = (t) => banqPlano(t, enC);

const año = (t) => t < P2 ? 2004 : t < P5 ? -9600 : t < P6 ? 2008 : t < P7 ? (t < W.THEN ? -9600 : Math.round(lerp(-9600, -7400, tramo(t, W.THEN, W.CITY + 0.4)))) : t < P9 ? -9600 : t < P11 ? 1997 : -9600;
const efectos = [[0.4, 'rafaga'], [W.TELL, 'pop'], [W.BELONG, 'brillo'],
  [P2 + 0.2, 'pasos'], [W.AIR, 'golpecito'], [W.DOMESTICATED - 0.1, 'boing'],
  [W.SEEDS, 'pop'], [W.CEREALS, 'whoosh'], [W.STEPPE, 'papel'],
  [P4 + 0.3, 'pasos'], [W.GATHERERS, 'brillo'],
  [W.PHRASE, 'flash'], [W.WORLD, 'whoosh'],
  [W.TEMPLE, 'toc'], [W.THEN, 'pop'], [W.CITY + 0.1, 'pop'],
  [W.DETAIL, 'toc'], [W.MORE, 'toc'], [W.N30, 'lapiz'],
  [P8 + 0.3, 'pasos'], [W.KARAKADA, 'brillo'],
  [W.N1997, 'papel'], [W.TRACED, 'bip'], [W.ORIGIN, 'bip'],
  [W.DOMESTICATED2, 'brillo'], [W.SLOPES, 'toc'],
  [W.BORN, 'brillo'], [W.LANDSCAPE + 0.1, 'pajaros'],
  [P12 + 0.4, 'pasos'], [W.FEED, 'burbujas'], [W.ROPES, 'chof']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11], [P12, p12]], { efectos, año });
''')

E['gb-banquete'] = ('Fíjate: el banquete', '''// GB-BANQUETE (frase 16, PAUSA «fijate3»): el banquete de gb-cazadores congelado en gris azulado (el MISMO bloque BANQ,
// copiado literal, en su último instante) y Atom al doble, a color, con sus objetos. GAG DE LA PAPILLA SIN SAL. Seis planos:
// 1 · el banquete congelado entero: ⏸; Atom entra y abre los brazos en «beautiful». Corta en «For».
// 2 · de cerca el muro con los pilares: «100» en «hundred», una fila de cabecitas; el sol sale y se pone en «weeks»; Atom
//   muerde una lasca de caliza en «can't eat» (X) y en «feed them» pone cara triste. Corta en «so».
// 3 · de cerca las molineras: la piedra de moler a color en «grinding stones», que muele; por miles, filas de piedras
//   diminutas y el número que cuenta hasta 1000. Corta en «along».
// 4 · de cerca el cuenco: la papilla burbujea en «porridge», espuma en «beer» con su «?»; GAG: Atom la prueba en «may»,
//   le falta sal (cara triste y bocadillo con salero), saca un salero y echa; sonríe. Corta en «It's».
// 5 · de cerca la cesta: el objeto de la pausa (muela, cuenco y espigas) a color; en «feasts» una fila de cuencos; en
//   «tend wild wheat» Atom coge un manojo de espigas. Corta en «to plant».
// 6 · el banquete de lejos: en «plant it nearby» las espigas se hacen un campo sembrado; en «change … forever» nacen
//   casitas de adobe con su humo; Atom saluda y guiña.''', UTIL + BANQ + r'''
// los instantes de cada palabra de la voz inglesa
const W = { AND: en('fijate3', 0.0000), NOTICE: en('fijate3', 0.0044), THIS: en('fijate3', 0.0125), BECAUSE: en('fijate3', 0.0355), HERES: en('fijate3', 0.0449), THE: en('fijate3', 0.0561), MOST: en('fijate3', 0.0592), BEAUTIFUL: en('fijate3', 0.0648), IDEA: en('fijate3', 0.0760), OF: en('fijate3', 0.0922), ALL: en('fijate3', 0.1009), FOR: en('fijate3', 0.1552), A: en('fijate3', 0.1583), HUNDRED: en('fijate3', 0.1633), PEOPLE: en('fijate3', 0.1714), TO: en('fijate3', 0.1820), WORK: en('fijate3', 0.1876), FOR2: en('fijate3', 0.1950), WEEKS: en('fijate3', 0.2031), ON: en('fijate3', 0.2119), SOMETHING: en('fijate3', 0.2193), YOU: en('fijate3', 0.2312), CANT: en('fijate3', 0.2399), EAT: en('fijate3', 0.2536), SOMEONE: en('fijate3', 0.2773), HAS: en('fijate3', 0.2829), TO2: en('fijate3', 0.2916), FEED: en('fijate3', 0.2972), THEM: en('fijate3', 0.3066), SO: en('fijate3', 0.3328), AT: en('fijate3', 0.3390), GOBEKLI: en('fijate3', 0.3440), TIPI: en('fijate3', 0.3602), GRINDING: en('fijate3', 0.3726), STONES: en('fijate3', 0.3814), TURN: en('fijate3', 0.3982), UP: en('fijate3', 0.4094), BY: en('fijate3', 0.4138), THE2: en('fijate3', 0.4194), THOUSANDS: en('fijate3', 0.4219), ALONG: en('fijate3', 0.4511), WITH: en('fijate3', 0.4592), LARGE: en('fijate3', 0.4667), STONE: en('fijate3', 0.4767), VESSELS: en('fijate3', 0.4923), WHERE: en('fijate3', 0.5072), PORRIDGE: en('fijate3', 0.5172), OR: en('fijate3', 0.5484), EVEN: en('fijate3', 0.5540), SOMETHING2: en('fijate3', 0.5608), LIKE: en('fijate3', 0.5695), BEER: en('fijate3', 0.5783), MAY: en('fijate3', 0.6138), HAVE: en('fijate3', 0.6200), BEEN: en('fijate3', 0.6231), MADE: en('fijate3', 0.6281), ITS: en('fijate3', 0.6667), POSSIBLE: en('fijate3', 0.6842), THAT: en('fijate3', 0.6979), THE3: en('fijate3', 0.7060), NEED: en('fijate3', 0.7091), TO3: en('fijate3', 0.7147), FEED2: en('fijate3', 0.7210), THOSE: en('fijate3', 0.7297), FEASTS: en('fijate3', 0.7365), PUSHED: en('fijate3', 0.7509), PEOPLE2: en('fijate3', 0.7608), TO4: en('fijate3', 0.7727), TEND: en('fijate3', 0.7795), WILD: en('fijate3', 0.7870), WHEAT: en('fijate3', 0.8020), TO5: en('fijate3', 0.8281), PLANT: en('fijate3', 0.8319), IT: en('fijate3', 0.8400), NEARBY: en('fijate3', 0.8437), AND2: en('fijate3', 0.8549), WITHOUT: en('fijate3', 0.8743), KNOWING: en('fijate3', 0.8923), IT2: en('fijate3', 0.9048), TO6: en('fijate3', 0.9222), CHANGE: en('fijate3', 0.9260), THE4: en('fijate3', 0.9366), WAY: en('fijate3', 0.9447), HUMANITY: en('fijate3', 0.9497), LIVED: en('fijate3', 0.9671), FOREVER: en('fijate3', 0.9783) };
const enC = (f) => 26.837 + (58.984 - 26.837) * f;   // en('trigo', f) de gb-cazadores (sus marcas: 26,837 → 58,984)
const TF = 59.2;                                      // el último instante de gb-cazadores, el que se congela
const P2 = W.FOR, P3 = W.SO, P4 = W.ALONG, P5 = W.ITS, P6 = W.TO5;
// la voz: Atom mueve la boca mientras dice cada trozo de frase
const TROZOS = [[0, 0.105], [0.155, 0.31], [0.333, 0.44], [0.451, 0.63], [0.667, 0.81], [0.828, 1]];
const habla = (t) => TROZOS.some(([a, b]) => t > en('fijate3', a) && t < en('fijate3', b)) ? (Math.sin(t * 15) > -0.2 ? 1 : 0) : 0;
const AT = T.AT;
let FZ = null;
const congelado = () => { if (!FZ) { banqPlano(TF, enC); FZ = R.buf.slice(); } };
const vista = (x0, y0, z) => { congelado(); const B = R.buf; if (z === 1) { B.set(FZ); return; }
  for (let y = 0; y < 180; y++) { const sy = (y0 + Math.floor(y / z)) * 320; for (let x = 0; x < 320; x++) B[y * 320 + x] = FZ[sy + x0 + Math.floor(x / z)]; } };
const viñeta = (a = 0.3) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.max(Math.abs(x - 160) / 160, Math.abs(y - 96) / 96); if (d > 0.74 && b4(x, y) < (d - 0.74) * 3) tine(x, y, H('#10141e'), a); } };
const pausa = (u = 1) => AT.pausa(R, u);
const salero = (x, y, ang) => { x = ri(x); y = ri(y); rr(x - 3, y - 9, x + 3, y, K); rr(x - 2, y - 8, x + 2, y - 1, H('#f8f8f4')); rr(x - 2, y - 8, x - 1, y - 1, H('#ffffff')); rr(x - 3, y - 11, x + 3, y - 9, K); rr(x - 2, y - 10, x + 2, y - 10, H('#c8ccd0')); ps(x - 1, y - 10, K); ps(x + 1, y - 10, K); };
const cuchara = (x, y) => { x = ri(x); y = ri(y); R.linea(x, y, x + 6, y - 10, K); R.linea(x + 1, y, x + 7, y - 10, H('#a87440')); R.disco(x - 1, y + 2, 2, K); R.disco(x - 1, y + 2, 1, H('#e8d8a8')); };

// ── 1 · el banquete congelado entero: ⏸; Atom entra y abre los brazos («la idea más bonita») ──────────────────────
const p1 = (t) => {
  vista(0, 0, 1); pausa(tramo(t, 0, 0.35));
  const u = tramo(t, 0.4, W.BEAUTIFUL - 0.1), x = ri(lerp(340, 246, ease(u)));
  AT.atom(R, x, 178, t, { s: 2, dir: -1, pose: u > 0 && u < 1 ? 'camina' : t < W.ALL ? 'brazos' : 'senala', cara: t > W.BEAUTIFUL ? 'sonrisa' : 'normal', habla: habla(t) });
  if (t > W.BEAUTIFUL && t < W.ALL + 0.6) for (let k = 0; k < 4; k++) destello(x - 20 + k * 14, 112 - (k % 2) * 8 - ri(Math.sin(t * 4 + k) * 2), 2);
  viñeta(0.22);
};

// ── 2 · de cerca, el muro con los pilares: cien personas, semanas de trabajo en algo que no se come ─────────────────
const p2 = (t) => {
  vista(96, 18, 2); pausa(1); viñeta();
  const n = pop(t, W.HUNDRED, 0.35); if (n > 0) R.numero('100', 150, ri(60 - n * 6), { tam: 16, centro: true });
  if (t > W.PEOPLE - 0.1) for (let k = 0; k < 10; k++) { const c = pop(t, W.PEOPLE + k * 0.06, 0.25); if (c > 0) { const x = 106 + k * 9, y = 82; R.disco(x, y, 3, K); R.disco(x, y, 2, H('#c88a52')); rr(x - 2, y + 2, x + 2, y + 8, K); rr(x - 1, y + 3, x + 1, y + 7, H('#8a5a34')); } }
  // «semanas»: el sol que sale y se pone varias veces sobre el muro
  const sem = tramo(t, W.WEEKS - 0.2, W.SOMETHING + 0.2);
  if (sem > 0 && sem < 1) { const a = sem * Math.PI * 3, sx = 260 + Math.cos(a) * 30, sy = 40 - Math.abs(Math.sin(a)) * 20; R.disco(ri(sx), ri(sy), 5, H('#ffd040')); R.disco(ri(sx) - 1, ri(sy) - 1, 2, H('#fffbe0')); }
  // Atom muerde una lasca de caliza en «can't eat» (¡crac!) y pone cara de que eso no se come; en «feed them» se frota la tripa
  const coge = t > W.SOMETHING - 0.3 && t < W.THEM, muerde = t > W.CANT && t < W.SOMEONE;
  const a = AT.atom(R, 60, 178, t, { s: 2, dir: 1, pose: coge ? 'sostiene' : t < W.SOMETHING - 0.3 ? 'senala' : 'piensa', cara: muerde ? 'sorpresa' : t > W.SOMEONE ? 'triste' : 'sonrisa', habla: habla(t) });
  if (coge) { const [mx, my] = a.mano, by = muerde ? my - 14 : my - 4; R.poligono([[mx - 4, by], [mx + 3, by - 4], [mx + 6, by + 2], [mx, by + 5]], K); R.poligono([[mx - 3, by], [mx + 3, by - 3], [mx + 5, by + 2], [mx, by + 4]], H('#d8ceb4')); ps(mx + 1, by - 2, H('#f4ecd8'));
    if (muerde) { const c = pop(t, W.CANT + 0.1, 0.2); if (c > 0) R.icono('X', ri(mx + 10), ri(by - 20), H('#e83a3a'), K, 2); for (let k = 0; k < 3; k++) destello(mx + 8 + k * 4, by - 8 + k * 3, 1); } }
};

// ── 3 · de cerca, las molineras: la piedra de moler a color, y luego por miles ──────────────────────────────────────
const p3 = (t) => {
  vista(0, 64, 2); pausa(1); viñeta();
  const aq = pop(t, W.GRINDING - 0.1, 0.35);
  if (aq > 0) { const m = T.d_moler(R, 150, 166, { escala: 2, moliendo: true, t, harina: true, espigas: true }); if (aq < 1) destello(150, 120, 4); }
  // por miles: filas de piedras de moler diminutas que aparecen hasta el fondo, y el número que cuenta
  const mil = tramo(t, W.THOUSANDS - 0.2, W.ALONG - 0.1);
  for (let k = 0; k < 18; k++) { if (k / 18 > mil) break; const fila = k % 3, x = 30 + ((k / 3) | 0) * 50 + fila * 16, y = 118 - fila * 14; T.d_moler(R, x, y, { escala: 1, sombra: false }); }
  if (mil > 0) R.numero(String(ri(1000 * Math.min(1, mil * 1.2))), 160, 52, { tam: 16, centro: true });
  AT.atom(R, 270, 178, t, { s: 2, dir: -1, pose: t < W.STONES ? 'quieto' : t < W.THOUSANDS ? 'senala' : 'brazos', cara: t > W.THOUSANDS ? 'sorpresa' : 'sonrisa', habla: habla(t) });
};

// ── 4 · de cerca, el cuenco grande: la papilla burbujea, quizá cerveza; GAG: Atom la prueba y le falta sal ──────────
const p4 = (t) => {
  vista(150, 70, 2); pausa(1); viñeta();
  const cu = T.d_cuenco(R, 150, 172, { escala: 2, lleno: 1, t, cuchara: t < W.MAY - 0.6 });
  const [px, py] = cu.papilla;
  // «porridge»: la papilla burbujea fuerte; «beer»: espuma blanca que sube y se derrama un poco
  if (t > W.PORRIDGE) for (let k = 0; k < 6; k++) { const v = (t * 1.6 + k / 6) % 1; R.disco(ri(px - 24 + k * 9), ri(py - 2 - v * 6), v < 0.8 ? 2 : 1, H('#f4e6b8')); ps(ri(px - 25 + k * 9), ri(py - 3 - v * 6), H('#ffffff')); }
  const es = tramo(t, W.BEER - 0.2, W.BEER + 0.6) * (1 - tramo(t, W.MADE, W.ITS));
  if (es > 0) for (let i = -30; i <= 30; i++) { const hh = ri(es * (5 + Math.sin(i * 0.7 + t * 6) * 2)); for (let j = 0; j < hh; j++) ps(px + i, py - 2 - j, j === hh - 1 ? H('#ffffff') : H('#f4eedc')); }
  if (es > 0.5) { const q = pop(t, W.BEER + 0.1, 0.3); if (q > 0) R.icono('?', px + 40, ri(py - 40 - q * 4), H('#ffe070'), K, 2); }
  // Atom coge la cuchara, la prueba («may have been made») y le falta sal: saca un salero de hoy y echa un poco
  const prueba = t > W.MAY - 0.6, sabe = t > W.MAY + 0.1, sala = tramo(t, W.MADE + 0.2, W.ITS - 0.1);
  const a = AT.atom(R, 62, 178, t, { s: 2, dir: 1, pose: prueba ? 'sostiene' : 'senala', cara: sala > 0.6 ? 'sonrisa' : sabe ? 'triste' : 'sonrisa', habla: habla(t) });
  if (prueba && sala === 0) { const lleva = tramo(t, W.MAY - 0.6, W.MAY - 0.1); cuchara(lerp(px - 20, a.mano[0] + 2, lleva), lerp(py - 4, a.mano[1] - 4, lleva)); }
  if (sabe && sala === 0) { const b = pop(t, W.MAY + 0.15, 0.25); bocata(a.centro[0] + 18, a.centro[1] - 38, 22, 18, b, (cx, cy) => { salero(cx, cy + 6, 0); R.icono('?', cx + 5, cy - 6, H('#e83a3a'), K); }); }
  if (sala > 0) { const sx = lerp(a.mano[0], px - 6, Math.min(1, sala * 2)), sy = lerp(a.mano[1] - 6, py - 22, Math.min(1, sala * 2)) + (sala > 0.5 ? Math.sin(t * 30) * 2 : 0); salero(sx, sy, 0);
    if (sala > 0.5) for (let k = 0; k < 8; k++) { const v = (t * 3 + k / 8) % 1; ps(sx + (k % 3) - 1, sy + 2 + v * 14, H('#ffffff')); } }
};

// ── 5 · de cerca, la cesta de espigas: alimentar los banquetes empujó a cuidar el trigo silvestre ───────────────────
const p5 = (t) => {
  vista(160, 84, 2); pausa(1); viñeta();
  const ob = pop(t, W.ITS + 0.1, 0.35);
  if (ob > 0) T.pausa(R, 196, 172, t, { cual: 'banquete', s: 2, campo: 0 });
  // en «feasts» un rayo de comida: cuenquitos que suben como una fila (los banquetes) y en «tend wild wheat» Atom coge espigas
  const fe = tramo(t, W.FEASTS - 0.1, W.PUSHED + 0.4);
  for (let k = 0; k < 5; k++) { const c = pop(t, W.FEASTS + k * 0.1, 0.25); if (c > 0 && t < W.TEND) cuenquito(96 + k * 16, 44 + (k % 2) * 4 - ri(c * 3)); }
  const coge = t > W.TEND - 0.2;
  const a = AT.atom(R, 66, 178, t, { s: 2, dir: 1, pose: coge ? 'sostiene' : fe > 0 ? 'senala' : 'quieto', cara: coge ? 'sonrisa' : 'normal', habla: habla(t) });
  if (coge) { for (let k = -2; k <= 2; k++) espiga(a.mano[0] + k * 3, a.mano[1] + 6, 26 + Math.abs(k) * -2, k * 1.2 + Math.sin(t * 2 + k) * 0.8, ESP, 2); if (t < W.WHEAT + 0.5) destello(a.mano[0] + 4, a.mano[1] - 26, 3); }
};

// ── 6 · el banquete de lejos: las espigas se convierten en un campo sembrado al lado; para siempre ──────────────────
const p6 = (t) => {
  vista(64, 40, 2); pausa(1); viñeta(0.25);
  const campo = ease(tramo(t, W.PLANT - 0.1, W.KNOWING + 0.4));
  T.pausa(R, 176, 170, t, { cual: 'banquete', s: 2, campo });
  // «change the way humanity lived forever»: tras el campo nacen casitas de adobe con su humo
  for (let k = 0; k < 3; k++) { const c = pop(t, W.CHANGE + k * 0.3, 0.3); if (c > 0) { const x = 262 + k * 24, y = 166 - (k % 2) * 6; casita(x, ri(lerp(y - 20, y, Math.min(1, c))), 10, 12 + (k % 2) * 3, k); if (t > W.FOREVER) humo(x + 5, y - 22, t, 3, 14, 0.4); } }
  if (t > W.HUMANITY && t < W.FOREVER + 0.8) destello(176, 104, 4);
  AT.atom(R, 58, 178, t, { s: 2, dir: 1, pose: t < W.PLANT ? 'sostiene' : t < W.CHANGE ? 'senala' : t < W.FOREVER ? 'brazos' : 'saluda', cara: t > W.FOREVER ? 'guino' : 'sonrisa', habla: habla(t) });
};

const efectos = [[0.15, 'tapestop'], [W.BEAUTIFUL, 'brillo'],
  [W.HUNDRED, 'pop'], [W.CANT + 0.1, 'masca'],
  [W.GRINDING, 'pop'], [W.THOUSANDS, 'golpecito'],
  [W.PORRIDGE, 'burbujas'], [W.MAY - 0.1, 'masca'], [W.MAY + 0.2, 'boing'], [W.MADE + 0.6, 'golpecito'],
  [W.FEASTS, 'pop'], [W.TEND, 'brillo'],
  [W.PLANT, 'whoosh'], [W.CHANGE, 'pop'], [W.FOREVER, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: -9600 });
''')
