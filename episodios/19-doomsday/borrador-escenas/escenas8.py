E = {}

# ── piezas comunes de este grupo (van dentro de cada escena) ──────────────────────────────────────────────────────────
COMUN = r'''
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (BY[((y | 0) & 3) * 4 + ((x | 0) & 3)] + 0.5) / 16;
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const ease = (u) => u * u * (3 - 2 * u);
const K = hex('#140e1c'), BLANCO = hex('#ffffff');
// la esquina de Atom y la barra del año: fondo tranquilo
const tranquila = (x, y) => (x >= 270 && y <= 48) || (y <= 16 && x >= 16 && x <= 174);
// polígono con su contorno negro
const pol = (pts, c) => { R.poligono(pts, K); const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length, cy = pts.reduce((a, p) => a + p[1], 0) / pts.length;
  R.poligono(pts.map(([x, y]) => { const d = Math.hypot(x - cx, y - cy) || 1; return [x - (x - cx) / d * 1.3, y - (y - cy) / d * 1.3]; }), c); };
const estrella5 = (cx, cy, r, c) => { const p = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); } R.poligono(p, c); };
const chispa = (x, y, t, k, c) => { const f = Math.sin(t * 6 + k * 1.7); if (f > 0.25) { R.pset(x, y, c); if (f > 0.8) { R.pset(x - 1, y, c); R.pset(x + 1, y, c); R.pset(x, y - 1, c); R.pset(x, y + 1, c); } } };
// los juguetes de Franklin: 0 pato, 1 pelota, 2 cubo, 3 cohete, 4 osito
function juguete(k, x, y, t) {
  x = Math.round(x); y = Math.round(y);
  if (k === 0) { R.disco(x, y, 3.4, K); R.disco(x, y, 2.6, hex('#ffd83a')); R.disco(x + 2, y - 3, 2.4, K); R.disco(x + 2, y - 3, 1.6, hex('#ffd83a')); R.pset(x + 2, y - 4, K); R.rect(x + 4, y - 3, x + 5, y - 2, hex('#f08a2a')); R.pset(x - 1, y - 1, hex('#fff6b0')); R.pset(x - 2, y + 1, hex('#e8a820')); }
  else if (k === 1) { R.disco(x, y, 3.8, K); R.disco(x, y, 3, hex('#e83a3a')); for (let i = -3; i <= 3; i++) R.pset(x + i, y, BLANCO); R.pset(x - 1, y - 2, hex('#ffb0b0')); R.pset(x, y + 2, hex('#a82020')); }
  else if (k === 2) { R.rect(x - 3, y - 3, x + 3, y + 3, K); R.rect(x - 2, y - 2, x + 2, y + 2, hex('#3a8ae8')); R.rect(x - 2, y - 2, x + 2, y - 2, hex('#8ac0ff')); R.rect(x + 2, y - 1, x + 2, y + 2, hex('#2a5ab0')); R.pset(x, y, hex('#ffd83a')); R.pset(x - 1, y, hex('#ffd83a')); R.pset(x, y - 1, hex('#ffd83a')); }
  else if (k === 3) { R.rect(x - 2, y - 5, x + 2, y + 4, K); R.rect(x - 1, y - 4, x + 1, y + 3, hex('#f4f4f8')); R.rect(x - 1, y - 4, x + 1, y - 3, hex('#e83a3a')); R.pset(x, y - 5, hex('#e83a3a')); R.rect(x - 3, y + 2, x - 2, y + 4, hex('#e83a3a')); R.rect(x + 2, y + 2, x + 3, y + 4, hex('#e83a3a')); R.pset(x, y, hex('#3ab0a8')); if (Math.floor(t * 12) % 2) R.pset(x, y + 5, hex('#ffb83a')); }
  else { R.disco(x, y + 2, 3.2, K); R.disco(x, y + 2, 2.4, hex('#b07a40')); R.disco(x, y - 3, 2.8, K); R.disco(x, y - 3, 2, hex('#b07a40')); R.disco(x - 2, y - 5, 1.3, K); R.disco(x + 2, y - 5, 1.3, K); R.pset(x - 2, y - 5, hex('#b07a40')); R.pset(x + 2, y - 5, hex('#b07a40')); R.pset(x - 1, y - 3, K); R.pset(x + 1, y - 3, K); R.pset(x, y - 2, hex('#5a3a1a')); R.pset(x, y + 2, hex('#e8c890')); }
}
let jb = null;
function juguete2(k, x, y, t) {   // el juguete al doble (pixel a pixel), para que se lea a 640 px
  if (!jb) jb = R.nuevo(); jb.fill(0); const prev = R.usar(jb); juguete(k, 12, 12, t); R.usar(prev);
  for (let j = 4; j < 20; j++) for (let i = 4; i < 20; i++) { const c = jb[j * 320 + i]; if (!c) continue; const px = Math.round(x + (i - 12) * 2), py = Math.round(y + (j - 12) * 2); R.pset(px, py, c); R.pset(px + 1, py, c); R.pset(px, py + 1, c); R.pset(px + 1, py + 1, c); }
}
'''

# el espacio pintado en la escena (fondo local): nebulosa tramada con vetas, estrellas, galaxias; planetas que giran
ESPACIO = r'''
const ESP = {};
function fondoEspacio(clave, P) {
  if (ESP[clave]) return ESP[clave];
  const b = R.nuevo(), prev = R.usar(b);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const d = bay(x, y), g = y / 179;
    const n = 0.5 + 0.5 * (0.55 * Math.sin(x * 0.019 + y * 0.011 + P.f) + 0.3 * Math.sin(x * 0.043 - y * 0.029 + 1.7 + P.f * 2) + 0.15 * Math.sin(x * 0.12 + y * 0.083 + P.f));
    let neb = Math.max(0, n - 0.42) * 2.4 * (0.55 + 0.45 * Math.cos((g - P.banda) * 2.6));
    const veta = Math.sin(x * 0.03 + Math.sin(y * 0.045 + P.f) * 2.2 - y * 0.02);
    if (veta > 0.86) neb *= 0.3; else if (veta > 0.76) neb *= 0.65;
    { const dx = Math.max(0, 270 - x), dy = Math.max(0, y - 48), dd = Math.hypot(dx, dy); if (dd < 26) neb *= 0.3 + 0.7 * dd / 26; }
    let c = g * 0.8 + 0.25 * Math.sin(x * 0.008 + P.f) > d * 0.7 + 0.2 ? P.b1 : P.b0;
    if (neb > 0.12 + d * 0.3) c = P.n0;
    if (neb > 0.42 + d * 0.3) c = P.n1;
    if (neb > 0.74 + d * 0.25) c = P.n2;
    R.pset(x, y, c);
  }
  for (const [gx, gy, gr, k] of P.galaxias) for (let j = -gr; j <= gr; j++) for (let i = -gr * 2; i <= gr * 2; i++) {
    const e = (i / (gr * 2)) ** 2 + (j / gr) ** 2; if (e > 1) continue; const a = Math.atan2(j * 2, i), rr = Math.sqrt(e);
    if (rr < 0.25 || (Math.sin(a * 2 - rr * 9 + k) > 0.3 && bay(gx + i, gy + j) > rr * 0.9)) R.pset(gx + i, gy + j, rr < 0.2 ? P.e2 : rr < 0.5 ? P.e1 : P.n2);
  }
  for (let k = 0; k < 430; k++) { const x = Math.floor(h(k, 1, P.s) * 320), y = Math.floor(h(k, 2, P.s) * 180); if (tranquila(x, y)) continue; const v = h(k, 3, P.s);
    R.pset(x, y, v > 0.93 ? P.e2 : v > 0.6 ? P.e1 : P.e0); if (v > 0.985) { R.pset(x - 1, y, P.e1); R.pset(x + 1, y, P.e1); R.pset(x, y - 1, P.e1); R.pset(x, y + 1, P.e1); } }
  R.usar(prev); ESP[clave] = b; return b;
}
function vidaEspacio(t, P, s = 0) {
  for (let k = 0; k < 46; k++) { const x = Math.floor(h(k, 5, P.s + s) * 320), y = Math.floor(h(k, 6, P.s + s) * 180); if (tranquila(x, y)) continue; const v = Math.sin(t * (2 + h(k, 7) * 3) + k);
    if (v > 0.2) { R.pset(x, y, P.e2); if (v > 0.85) { R.pset(x - 1, y, P.e1); R.pset(x + 1, y, P.e1); R.pset(x, y - 1, P.e1); R.pset(x, y + 1, P.e1); } } }
  const ft = (t + s) % 5; if (ft < 0.6) { const k = Math.floor((t + s) / 5), x0 = 40 + h(k, 1, 9) * 180, y0 = 30 + h(k, 2, 9) * 50, u = ft / 0.6;
    for (let i = 0; i < 14; i++) { const x = x0 + u * 70 - i * 2, y = y0 + u * 28 - i * 0.8; if (!tranquila(x, y)) R.pset(x, y, i < 3 ? P.e2 : i < 8 ? P.e1 : P.e0); } }
}
function roca(x, y, r, k, P) {
  x = Math.round(x); y = Math.round(y);
  for (let j = -r - 2; j <= r + 2; j++) for (let i = -r - 2; i <= r + 2; i++) { const a = Math.atan2(j, i), rr = r * (0.82 + 0.18 * Math.sin(a * 3 + k) + 0.08 * Math.sin(a * 7 + k * 2)), d = Math.hypot(i, j);
    if (d > rr + 1) continue; if (d > rr) { R.pset(x + i, y + j, K); continue; } const l = (-i - j) / (r * 1.4); R.pset(x + i, y + j, l > 0.35 ? P.rocaL : l > -0.2 + bay(x + i, y + j) * 0.3 ? P.roca : P.rocaS); }
  R.pset(x - Math.round(r * 0.3), y - Math.round(r * 0.2), P.rocaS); R.pset(x + Math.round(r * 0.25), y + Math.round(r * 0.3), P.rocaS); R.pset(x + Math.round(r * 0.3) - 1, y + Math.round(r * 0.3) - 1, P.rocaL);
}
const PAL828 = { mar1: hex('#3ab0a8'), mar2: hex('#24807e'), costa: hex('#f8e0b8'), tierra1: hex('#f0b888'), tierra2: hex('#d88a5a'), verde: hex('#8ac88a'), hielo: hex('#f4f8fc'), nube: hex('#fbfbff'),
  noche: hex('#142838'), nocheT: hex('#20384a'), luces: hex('#ffd870'), halo: hex('#9ae8e0'), anillo1: hex('#f0c8a0'), anillo2: hex('#c8906a'), anillo3: hex('#fff0d8') };
// un planeta que gira: mares y continentes de ruido, casquetes, nubes más rápidas, luz arriba a la izquierda, noche con luces
function planeta(cx, cy, r, t, P, o = {}) {
  const giro = t * (o.giro ?? 0.06), Lx = -0.62, Ly = -0.5, Lz = 0.6;
  const y0 = Math.max(0, Math.floor(cy - r - 3)), y1 = Math.min(179, Math.ceil(cy + r + 3));
  for (let y = y0; y <= y1; y++) { const dy = (y + 0.5 - cy) / r; if (Math.abs(dy) > 1 + 3 / r) continue;
    const w = Math.sqrt(Math.max(0, 1 - Math.min(1, dy * dy))), xa = Math.max(0, Math.floor(cx - r * w - 4)), xb = Math.min(319, Math.ceil(cx + r * w + 4));
    for (let x = xa; x <= xb; x++) { const dx = (x + 0.5 - cx) / r, q = dx * dx + dy * dy, d = bay(x, y);
      if (q > 1) { const e = (Math.sqrt(q) - 1) * r; if (e < 3 && d > e / 3 && dx * Lx + dy * Ly > -0.3) R.pset(x, y, e < 1 ? P.halo : mez(R.pget(x, y), P.halo, 0.45)); continue; }
      const z = Math.sqrt(1 - q), lon = Math.atan2(dx, z) + giro, lat = Math.asin(dy);
      const f = Math.sin(3 * lon + 1.3) * Math.cos(2 * lat) + 0.6 * Math.sin(5 * lon + 2 * lat + 0.7) + 0.35 * Math.sin(11 * lon - 5 * lat + 2);
      const nb = Math.sin(4 * (lon + t * 0.025) + 3 * lat) + 0.6 * Math.sin(9 * (lon + t * 0.025) - 7 * lat + 1) + 0.25 * Math.sin(23 * lon + 11 * lat);
      const luz = dx * Lx + dy * Ly + z * Lz;
      let c, tierra = false;
      if (Math.abs(lat) > 1.22 - 0.05 * Math.sin(lon * 5)) c = P.hielo;
      else if (f > 0.5) { tierra = true; c = f > 1.15 ? P.tierra2 : f > 0.8 && Math.sin(lon * 13 + lat * 9) > 0.2 ? P.verde : P.tierra1; }
      else if (f > 0.38) c = P.costa; else c = f < -0.7 ? P.mar2 : P.mar1;
      if (nb > 1.0 + d * 0.3) c = P.nube;
      if (luz < -0.12 + d * 0.22) c = tierra && nb < 0.8 && h(x >> 1, y >> 1, 3) > 0.78 ? (Math.sin(t * 3 + x) > -0.6 ? P.luces : P.nocheT) : (c === P.nube ? P.nocheT : P.noche);
      else if (luz < 0.2 + d * 0.22) c = mez(c, P.noche, 0.45);
      else if (luz > 0.82 + d * 0.12) c = mez(c, BLANCO, 0.28);
      if (q > 0.9) c = mez(c, P.halo, (q - 0.9) * 4);
      R.pset(x, y, c);
    }
  }
}
// el anillo de la 828: elipse inclinada (ang), aplastada (k), de ra·r a rb·r; mitad 'atras' (no tapa el planeta) o 'delante'
function anillo(cx, cy, r, P, mitad, ang, k, ra, rb) {
  ra *= r; rb *= r; const ca = Math.cos(ang), sa = Math.sin(ang), ext = rb + 2;
  const x0 = Math.max(0, Math.floor(cx - ext)), x1 = Math.min(319, Math.ceil(cx + ext)), ey = ext * (Math.abs(sa) + k) + 2, y0 = Math.max(0, Math.floor(cy - ey)), y1 = Math.min(179, Math.ceil(cy + ey));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const X = x + 0.5 - cx, Y = y + 0.5 - cy, u = X * ca + Y * sa, v = (-X * sa + Y * ca) / k, rho = Math.hypot(u, v);
    if (rho < ra || rho > rb) continue; const delante = v > 0; if ((mitad === 'delante') !== delante) continue; if (mitad === 'atras' && X * X + Y * Y < r * r) continue;
    const band = (rho - ra) / (rb - ra), d = bay(x, y); if (band > 0.46 && band < 0.53) continue; if (band > 0.86 && d > 0.5) continue;
    let c = band < 0.3 ? P.anillo1 : band < 0.72 ? P.anillo2 : P.anillo1; if (Math.sin(rho * 1.7) > 0.6) c = P.anillo3;
    if (!delante && u > 0 && v > -r * 0.3) c = mez(c, P.noche, 0.5);
    R.pset(x, y, mez(R.pget(x, y), c, 0.85)); }
}
'''

E['do-828'] = ('La Tierra 828', '''// DO-828 (frases 48–49), 2025. Cinco planos:
// 1. (fondo local, el espacio de cerca) la nave del 4 entra por la derecha, la estrella con el 4 brilla en «Fantastic
//    Four» y en «First Steps» enciende los motores y se va a la izquierda; al fondo, la 828 pequeña con su anillo;
// 2. (fondo local, la 828 como horizonte) en «another Earth» la nave despega del planeta y deja su estela; en «Earth-828»
//    sale la placa con el 828; la estación-rueda gira y una luna asoma;
// 3. (fondo local, la esquina de los sesenta) cafetería googie, el monorraíl pasa por arriba; en «finned cars» un coche
//    rosa con aletas aparca y la vecina lo saluda, otro turquesa cruza; un robot pasea un caniche;
// 4. (sesenta ciudad 'desfile') en «Monorails and robots» un robot limpia una ventana; Reed salta y saluda en «Reed»;
//    en «Sue Storm» Sue aparece de invisible y saluda;
// 5. (sesenta ciudad 'general') en «Johnny» Johnny se enciende, vuela y escribe un 4 de fuego en el cielo; en «Ben Grimm»
//    la Cosa salta y la carroza retumba; en «most famous heroes» todos saludan y llueve confeti.''',
COMUN + ESPACIO + r'''
const a = (f) => en('828', f), b = (f) => en('sesenta', f);
const P2 = a(0.608), P3 = b(0) - 0.15, P4 = b(0.321), P5 = b(0.670);
const A = { cuatro: a(0.099), pasos: a(0.267), otra: a(0.673), tierra: a(0.852), n828: a(0.896) };
const B = { sesenta: b(0.107), aletas: b(0.229), coches: b(0.258), mono: b(0.327), robots: b(0.383), reed: b(0.502), sue: b(0.593), johnny: b(0.705), ben: b(0.757), famosos: b(0.835), heroes: b(0.882) };

// ── la nave del 4: cohete de los sesenta que mira a la izquierda (morro en x − 46, tobera en x + 44) ──
function nave(x, y, t, o = {}) {
  x = Math.round(x); y = Math.round(y);
  const CR = [hex('#f4f8fc'), hex('#d0dae6'), hex('#a8b4c4'), hex('#7a869a'), hex('#525c70')], NAR = hex('#e8603a'), NARS = hex('#a83a24'), NARL = hex('#ff9a6a'), TUR = hex('#3ab0a8'), TURS = hex('#1e7a76');
  const L = o.llama ?? 0.4, fl = Math.sin(t * 41) * 2 + Math.sin(t * 23 + 1) * 2, ll = 8 + L * 34 + fl * (0.5 + L);
  for (let i = 0; i < ll; i++) { const w = 5.5 * (1 - i / ll) * (0.85 + 0.15 * Math.sin(t * 30 + i * 0.7));
    for (let j = -Math.ceil(w); j <= Math.ceil(w); j++) { if (Math.abs(j) > w) continue; R.pset(x + 46 + i, y + j, Math.abs(j) < w * 0.4 && i < ll * 0.45 ? BLANCO : Math.abs(j) < w * 0.75 ? hex('#ffd860') : hex('#ff7a2a')); } }
  for (let k = 0; k < 10; k++) { const u = (t * 2.5 + k / 10) % 1; R.pset(x + 47 + u * (ll + 18), y + Math.round(Math.sin(k * 3.1 + t * 9) * 6 * u), u < 0.5 ? hex('#ffd860') : hex('#ff7a2a')); }
  pol([[x + 20, y - 8], [x + 34, y - 26], [x + 44, y - 26], [x + 42, y - 7]], NARS);   // la aleta del fondo
  for (let i = -46; i <= 44; i++) {
    const hh = i < -20 ? 11 * Math.pow((i + 47) / 27, 0.62) : i > 32 ? 11 - (i - 32) * 0.35 : 11, H = Math.round(hh);
    for (let j = -H - 1; j <= H + 1; j++) { let c;
      if (Math.abs(j) > H) c = K; else { const v = j / (H + 0.01), d = bay(x + i, y + j);
        c = v < -0.62 ? CR[0] : v < -0.15 + d * 0.15 ? CR[1] : v < 0.35 + d * 0.15 ? CR[2] : v < 0.72 ? CR[3] : CR[4];
        if (i < -31) c = v < -0.5 ? NARL : v < 0.4 ? NAR : NARS; else if (i < -29) c = K; else if (j >= 2 && j <= 4) c = j === 4 ? TURS : TUR;
        if (i === -6 || i === 30 || i === 38) c = mez(c, K, 0.35); if ((i === -12 || i === 26) && j % 3 === 0) c = mez(c, K, 0.5); }
      R.pset(x + i, y + j, c); }
  }
  R.linea(x - 47, y - 1, x - 47, y + 1, K);
  if (o.brillo > 0 && o.brillo < 1) { const bx = Math.round(-40 + o.brillo * 80); for (let j = -10; j <= -1; j++) { R.pset(x + bx + Math.round(j * 0.4), y + j, BLANCO); R.pset(x + bx + 1 + Math.round(j * 0.4), y + j, CR[0]); } }
  // los ojos de buey, con los cuatro dentro (Reed, Sue, Johnny y Ben)
  [['#4a3020', '#f6c290'], ['#f0d070', '#f6c290'], ['#f0c860', '#f6c290'], ['#e8823a', '#e8823a']].forEach(([pelo, piel], k) => {
    const px = x - 25 + k * 9, py = y - 3; R.disco(px, py, 3.7, K); R.disco(px, py, 2.8, hex('#2a4a6a')); R.rect(px - 1, py - 1, px, py + 1, hex(piel)); R.rect(px - 1, py - 2, px, py - 2, hex(pelo));
    if (k === 3) R.pset(px, py, hex('#a8501e')); R.pset(px + 1, py - 2, hex('#cfe8ff')); R.pset(px + 2, py - 1, hex('#cfe8ff')); });
  // la estrella con el 4
  const sx = x + 14, sy = y - 1;
  estrella5(sx, sy + 0.5, 10, K); estrella5(sx, sy + 0.5, 8.4, o.destello ? hex('#fff2a0') : BLANCO);
  R.numero('4', sx + 1, sy + 4, { centro: true, color: hex('#2a5ad8') });
  pol([[x + 24, y + 8], [x + 36, y + 26], [x + 45, y + 26], [x + 43, y + 7]], NAR);   // la aleta de delante
  pol([[x + 28, y + 2], [x + 48, y + 5], [x + 48, y + 9], [x + 32, y + 7]], NARL);
  R.rect(x + 41, y - 6, x + 46, y + 6, K); R.rect(x + 42, y - 5, x + 45, y + 5, hex('#5a6070')); R.rect(x + 42, y - 5, x + 45, y - 4, hex('#9aa4b4'));
  R.linea(x - 47, y - 2, x - 55, y - 5, K); if (Math.floor(t * 3) % 2) R.pset(x - 56, y - 5, hex('#ff5a5a'));
}
function naveMini(x, y, ux, uy, t) {   // la nave lejos (unos 20 px), apuntando hacia (ux, uy): casco de cromo, morro y aletas naranjas, llama
  const f = 6 + Math.sin(t * 40) * 2; for (let i = 0; i < f; i++) R.disco(x - ux * (18 + i), y - uy * (18 + i), Math.max(0.6, 2.6 - i * 0.35), i < 2 ? BLANCO : i < 4 ? hex('#ffd860') : hex('#ff7a2a'));
  for (const sg of [-1, 1]) { R.linea(x - ux * 12, y - uy * 12, x - ux * 18 + uy * sg * 6, y - uy * 18 - ux * sg * 6, K); R.linea(x - ux * 13, y - uy * 13, x - ux * 17 + uy * sg * 5, y - uy * 17 - ux * sg * 5, hex('#e8603a')); }
  for (let i = 0; i < 17; i++) R.disco(x - ux * i, y - uy * i, i < 3 ? 1.6 + i * 0.5 : 3.2, K);
  for (let i = 0; i < 17; i++) R.disco(x - ux * i, y - uy * i, i < 3 ? 0.8 + i * 0.4 : 2.2, i < 4 ? hex('#e8603a') : hex('#d0dae6'));
  for (let i = 4; i < 16; i++) R.pset(Math.round(x - ux * i + uy * 1), Math.round(y - uy * i - ux * 1), BLANCO);
  R.pset(Math.round(x - ux * 8), Math.round(y - uy * 8), hex('#3ab0a8')); R.pset(Math.round(x - ux * 11), Math.round(y - uy * 11), hex('#3ab0a8'));
}
function satelite(x, y, t) {
  x = Math.round(x); y = Math.round(y);
  for (const [dx, dy] of [[-7, 5], [-6, 7], [6, 6], [5, 8]]) R.linea(x, y, x + dx, y + dy, hex('#9aa4b4'));
  R.disco(x, y, 3.4, K); R.disco(x, y, 2.5, hex('#c8d0dc')); R.pset(x - 1, y - 1, BLANCO); if (Math.floor(t * 2) % 2) R.pset(x + 1, y + 1, hex('#ff5a5a'));
}
const PE = { b0: hex('#070a1e'), b1: hex('#0e1434'), n0: hex('#1a2456'), n1: hex('#2a3a7a'), n2: hex('#4a5aa8'), e0: hex('#5a6a9a'), e1: hex('#aab8e0'), e2: BLANCO, f: 0.7, banda: 0.55, s: 11,
  galaxias: [[52, 44, 5, 1], [214, 160, 4, 2]], roca: hex('#7a7488'), rocaL: hex('#aaa6b8'), rocaS: hex('#4a4658') };
const p1 = (t) => {
  R.copiar(fondoEspacio('azul', PE)); vidaEspacio(t, PE);
  const sube = Math.max(0, t - A.pasos), vel = 30 + sube * 140;
  for (let k = 0; k < 24; k++) { const len = Math.min(34, 3 + h(k, 3) * 8 * (vel / 60)), x = ((h(k, 1, 4) * 380 + t * vel * (0.6 + h(k, 2) * 0.8)) % 380) - 30, y = 20 + Math.floor(h(k, 5, 4) * 156);
    if (tranquila(x, y) || tranquila(x + len, y)) continue; R.linea(x, y, x + len, y, h(k, 6) > 0.5 ? PE.e1 : PE.e0); }
  // de donde viene: la 828 pequeña con su anillo
  anillo(262, 132, 24, PAL828, 'atras', -0.32, 0.32, 1.35, 1.95); planeta(262, 132, 24, t, PAL828, { giro: 0.12 }); anillo(262, 132, 24, PAL828, 'delante', -0.32, 0.32, 1.35, 1.95);
  satelite(96 + t * 5, 146 + Math.sin(t) * 2, t);
  const entra = ease(tramo(t, 0.15, A.cuatro - 0.05)), nx = lerp(392, 176, entra) - sube * sube * 26, ny = 88 + Math.sin(t * 1.6) * 2 - sube * 4;
  nave(nx, ny, t, { llama: t < A.pasos ? 0.3 : Math.min(1.3, 0.3 + sube * 1.4), brillo: tramo(t, A.cuatro, A.cuatro + 0.8), destello: t > A.cuatro && t < A.cuatro + 0.9 && Math.floor(t * 10) % 2 === 0 });
  if (t > A.cuatro && t < A.cuatro + 0.9) { const g = tramo(t, A.cuatro, A.cuatro + 0.9); for (let k = 0; k < 8; k++) { const an = k * 0.785 + g, r = 12 + g * 10; R.pset(Math.round(nx + 15 + Math.cos(an) * r), Math.round(ny + Math.sin(an) * r), k % 2 ? hex('#fff2a0') : BLANCO); } }
  roca(((t * 7 + 30) % 380) - 30, 166, 7, 1, PE); roca(((t * 4 + 300) % 380) - 30, 172, 4, 2, PE); roca(((t * 11 + 150) % 380) - 30, 30, 3, 3, PE);
};
const PP = { ...PE, b0: hex('#060a1c'), b1: hex('#0c1230'), n0: hex('#1a2a52'), n1: hex('#244a72'), n2: hex('#3a6a98'), f: 2.1, banda: 0.3, s: 23, galaxias: [[176, 40, 4, 3]] };
function rueda(x, y, r, t) {   // la estación espacial de rueda, que gira
  const g = t * 0.6;
  for (let k = 0; k < 4; k++) { const an = g + k * Math.PI / 2; R.linea(x, y, x + Math.cos(an) * r, y + Math.sin(an) * r * 0.45, hex('#8a94a8')); }
  for (let k = 0; k < 90; k++) { const an = k / 90 * Math.PI * 2, px = x + Math.cos(an) * r, py = y + Math.sin(an) * r * 0.45; R.disco(px, py, 1.6, K); }
  for (let k = 0; k < 90; k++) { const an = k / 90 * Math.PI * 2, px = Math.round(x + Math.cos(an) * r), py = Math.round(y + Math.sin(an) * r * 0.45); R.pset(px, py, Math.sin(an) < 0 ? hex('#e8eef4') : hex('#a8b4c4')); if (k % 9 === 0) R.pset(px, py, Math.sin(t * 3 + k) > 0 ? hex('#ffd870') : hex('#5a6478')); }
  R.disco(x, y, 3, K); R.disco(x, y, 2, hex('#d0dae6')); R.pset(x - 1, y - 1, BLANCO);
}
const p2 = (t) => {
  R.copiar(fondoEspacio('azul2', PP)); vidaEspacio(t, PP, 3);
  // una luna con cráteres
  R.disco(46, 94, 10, K); R.disco(46, 94, 9, hex('#a8a4b4')); R.disco(43, 91, 5, hex('#c8c4d4')); R.disco(50, 97, 2.5, hex('#7a7688')); R.disco(42, 98, 1.6, hex('#7a7688')); R.disco(49, 89, 1.3, hex('#8a8698'));
  rueda(232, 66, 15, t);
  anillo(150, 372, 270, PAL828, 'atras', -0.16, 0.75, 1.36, 1.5);
  planeta(150, 372, 270, t, PAL828, { giro: 0.012 });
  // la nave despega del horizonte y deja su estela
  const u = tramo(t, P2 + 0.25, A.n828 + 0.6), ruta = (v) => { const e = ease(v); return [lerp(236, 196, e) - Math.sin(e * Math.PI) * 6 - e * e * 70, lerp(118, 30, e)]; };
  if (u > 0) { for (let k = 0; k < 40; k++) { const v = u * k / 40, [sx, sy] = ruta(v), viejo = (u - v); if (viejo < 0.04) continue; R.disco(sx + Math.sin(k * 2.3) * viejo * 4, sy + viejo * 2, 1 + viejo * 3, mez(hex('#e8eef4'), hex('#3a4a7a'), Math.min(0.8, viejo * 1.4))); }
    if (u < 1) { const [x1, y1] = ruta(u), [x0, y0] = ruta(Math.max(0, u - 0.02)), d = Math.hypot(x1 - x0, y1 - y0) || 1; naveMini(x1, y1, (x1 - x0) / d, (y1 - y0) / d, t); } }
  // la placa del 828
  const pl = tramo(t, A.tierra - 0.1, A.tierra + 0.2);
  if (pl > 0) { const hh = Math.round(15 * ease(pl)), cy = 58;
    for (let k = 0; k < 14; k++) { const v = k / 14; if (pl >= 1 && k % 2 === 0) R.linea(lerp(112, 132, v), lerp(66, 100, v), lerp(112, 132, v + 0.035), lerp(66, 100, v + 0.035), hex('#cfe8ff')); }
    R.rect(28, cy - hh - 1, 114, cy + hh + 1, K); R.rect(29, cy - hh, 113, cy + hh, hex('#d0dae6')); R.rect(29, cy - hh, 113, cy - hh, BLANCO); R.rect(31, cy - hh + 2, 111, cy + hh - 2, hex('#3ab0a8'));
    R.rect(33, cy - hh + 4, 109, cy + hh - 4, hex('#16243a')); for (const [rx, ry] of [[31, cy - hh + 1], [111, cy - hh + 1], [31, cy + hh - 1], [111, cy + hh - 1]]) R.pset(rx, ry, hex('#5a6478'));
    if (pl >= 1) R.numero('828', 71, cy + 8, { tam: 16, centro: true, n: Math.round(tramo(t, A.n828 - 0.1, A.n828 + 0.3) * 60) });
    if (t > A.n828 + 0.3 && t < A.n828 + 1.2) { const g = tramo(t, A.n828 + 0.3, A.n828 + 1.2); for (let k = 0; k < 10; k++) { const an = k * 0.628, r = 30 + g * 18; R.pset(Math.round(71 + Math.cos(an) * r * 1.4), Math.round(cy + Math.sin(an) * r * 0.7), k % 2 ? hex('#fff2a0') : BLANCO); } } }
};

// ── la esquina de los sesenta (fondo local) ──
let bCalle = null;
const CIELO60 = ['#6ec8d0', '#8ed8d4', '#b8e4cc', '#f4dcb4', '#f8c8a0'].map(hex);
function fondoCalle() {
  if (bCalle) return bCalle; bCalle = R.nuevo(); const prev = R.usar(bCalle);
  for (let y = 0; y < 104; y++) for (let x = 0; x < 320; x++) { const v = y / 100 * 4.4 + (bay(x, y) - 0.5) * 0.9; R.pset(x, y, CIELO60[Math.max(0, Math.min(4, Math.floor(v)))]); }
  // torres pastel lejanas, con ventanas
  for (const [x0, y0, w, c] of [[0, 62, 24, '#c8b8e0'], [28, 74, 18, '#b8d8e8'], [96, 52, 20, '#e8c0c8'], [120, 66, 16, '#c8e0c8'], [176, 58, 22, '#d8c8e8'], [204, 76, 16, '#c0d8e0'], [240, 66, 24, '#e8d0b8'], [270, 60, 22, '#c8d8f0'], [296, 72, 24, '#e8c8d8']]) {
    const C1 = hex(c), CS = mez(C1, hex('#7a7aa0'), 0.28), y1 = Math.max(y0, x0 >= 266 ? 52 : y0);
    R.rect(x0, y1, x0 + w, 104, CS); R.rect(x0 + 1, y1 + 1, x0 + w - 1, 104, C1); R.rect(x0 + Math.round(w * 0.65), y1 + 1, x0 + w - 1, 104, mez(C1, hex('#7a7aa0'), 0.16)); R.rect(x0 + 1, y1 + 1, x0 + w - 1, y1 + 1, mez(C1, BLANCO, 0.5));
    for (let y = y1 + 4; y < 104; y += 4) for (let x = x0 + 3; x < x0 + w - 2; x += 3) R.pset(x, y, h(x, y, 2) > 0.72 ? hex('#fff4c8') : mez(C1, hex('#4a5a8a'), 0.32)); }
  // la torre-platillo
  R.rect(150, 36, 155, 104, K); R.rect(151, 36, 154, 104, hex('#e8eef4')); R.rect(153, 36, 154, 104, hex('#a8b4c4'));
  for (let i = -18; i <= 18; i++) { const hh = Math.round(4.6 * Math.sqrt(1 - (i / 18.5) ** 2)); for (let j = -hh - 1; j <= hh + 1; j++) R.pset(152 + i, 32 + j, Math.abs(j) > hh ? K : j < -1 ? hex('#f4f8fc') : j < 1 ? hex('#3ab0a8') : hex('#a8b4c4')); }
  for (let i = -14; i <= 14; i += 4) R.pset(152 + i, 32, hex('#fff4a0')); R.linea(152, 27, 152, 20, K); R.pset(152, 19, hex('#f0603a'));
  // el monorraíl: viga y pilares
  for (const px of [40, 200, 300]) { R.rect(px - 3, 60, px + 3, 104, K); R.rect(px - 2, 60, px + 2, 104, hex('#e0e6ee')); R.rect(px + 1, 60, px + 2, 104, hex('#a8b4c4')); R.rect(px - 8, 59, px + 8, 62, K); R.rect(px - 7, 60, px + 7, 61, hex('#c8d0dc')); }
  R.rect(0, 54, 319, 59, K); R.rect(0, 55, 319, 57, hex('#f0f4f8')); R.rect(0, 58, 319, 58, hex('#a8b4c4')); for (let x = 6; x < 320; x += 12) R.pset(x, 56, hex('#c8d0dc'));
  // a la izquierda, un muro de ladrillo con hiedra; entre la cafetería y el edificio, el callejón con su valla
  for (let y = 96; y < 140; y++) for (let x = 0; x < 14; x++) R.pset(x, y, (y % 6 === 0 || (x + (Math.floor(y / 6) % 2) * 4) % 8 === 0) ? hex('#a8685a') : hex('#d88a74'));
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 31) * 14), y = 96 + Math.floor(h(k, 2, 31) * 30); R.pset(x, y, h(k, 3) > 0.5 ? hex('#3a8a4a') : hex('#5aaa5a')); }
  for (let y = 96; y < 140; y++) for (let x = 206; x < 227; x++) R.pset(x, y, y < 112 ? hex('#a8b8c8') : hex('#8a96a8'));
  for (let x = 206; x < 227; x += 3) R.rect(x, 116, x, 139, hex('#d0dae6')); R.rect(206, 116, 226, 116, hex('#e8eef4')); R.rect(206, 127, 226, 127, hex('#c8d0dc'));
  R.rect(210, 128, 220, 139, K); R.rect(211, 129, 219, 139, hex('#5a8a6a')); R.rect(211, 129, 219, 130, hex('#7aaa8a'));   // el cubo de basura
  // la cafetería googie: tejado en bumerán, cristaleras, puerta con ojo de buey
  R.rect(14, 90, 206, 140, K); R.rect(15, 91, 205, 139, hex('#f4e8d8'));
  for (let x = 15; x <= 205; x++) for (let y = 128; y <= 139; y++) R.pset(x, y, (x + y) % 9 < 1 ? hex('#2a8a84') : hex('#3ab0a8'));
  R.rect(15, 126, 205, 127, hex('#d0dae6')); R.rect(15, 126, 205, 126, BLANCO);
  for (let k = 0; k < 7; k++) { const sx = 26 + k * 28, sy = 133; R.pset(sx, sy, hex('#ffd860')); R.pset(sx - 2, sy, hex('#fff4c8')); R.pset(sx + 2, sy, hex('#fff4c8')); R.pset(sx, sy - 2, hex('#fff4c8')); R.pset(sx, sy + 2, hex('#fff4c8')); R.pset(sx - 1, sy - 1, hex('#ffd860')); R.pset(sx + 1, sy + 1, hex('#ffd860')); }
  // la cristalera, con la barra y los taburetes dentro
  R.rect(20, 96, 152, 124, K); R.rect(21, 97, 151, 123, hex('#fbf2dc'));
  R.rect(21, 97, 151, 103, hex('#e8d8b8')); for (let x = 24; x < 150; x += 10) { R.rect(x, 98, x + 6, 101, hex('#c8a878')); R.pset(x + 2, 99, hex('#f0c070')); R.pset(x + 4, 99, hex('#e8603a')); }
  R.rect(21, 114, 151, 117, hex('#e8603a')); R.rect(21, 114, 151, 114, hex('#ff9a6a')); R.rect(21, 118, 151, 123, hex('#d0dae6')); for (let x = 24; x < 150; x += 7) R.rect(x, 118, x, 123, hex('#a8b4c4'));
  for (let x = 28; x < 150; x += 16) { R.rect(x - 2, 119, x + 2, 120, hex('#e83a4a')); R.rect(x, 121, x, 123, hex('#8a94a8')); }
  R.rect(126, 104, 134, 113, hex('#a8b4c4')); R.rect(127, 105, 133, 112, hex('#d0dae6')); R.pset(128, 106, BLANCO);   // la cafetera
  for (let x = 43; x < 152; x += 22) { R.rect(x, 97, x + 1, 123, hex('#c8d0dc')); R.rect(x, 97, x, 123, BLANCO); }
  for (let x = 22; x < 150; x += 3) R.pset(x + 1, 97 + ((x * 7) % 26), mez(hex('#fbf2dc'), BLANCO, 0.7));
  R.linea(22, 122, 40, 98, hex('#ffffff')); R.linea(66, 122, 82, 100, hex('#ffffff'));
  // la puerta
  R.rect(158, 98, 178, 140, K); R.rect(159, 99, 177, 139, hex('#cfe8ee')); R.rect(159, 99, 177, 100, hex('#d0dae6')); R.disco(168, 110, 5, K); R.disco(168, 110, 4, hex('#9ad0d8')); R.pset(166, 108, BLANCO);
  R.rect(174, 118, 175, 126, hex('#d0dae6')); R.rect(159, 128, 177, 139, hex('#3ab0a8'));
  // el tejado en bumerán, con su canto turquesa y los focos
  R.poligono([[4, 86], [210, 66], [216, 72], [10, 94]], K); R.poligono([[6, 87], [208, 68], [212, 72], [11, 92]], hex('#f8a8b8'));
  R.poligono([[8, 91], [211, 71], [212, 73], [10, 93]], hex('#3ab0a8')); for (let x = 20; x < 205; x += 14) R.pset(x, Math.round(92 - (x - 10) * 0.105), hex('#fff4a0'));
  R.linea(6, 87, 208, 68, hex('#ffd0d8'));
  for (const sx of [30, 120, 190]) { R.rect(sx, Math.round(92 - (sx - 10) * 0.105), sx + 1, 90, hex('#a8b4c4')); }
  // el edificio de la derecha (menta), con toldo a rayas y escaparate de televisores
  R.rect(226, 56, 319, 140, K); R.rect(227, 57, 319, 139, hex('#b8e4cc'));
  for (let y = 57; y < 116; y += 3) for (let x = 227; x < 320; x++) if ((x + y * 3) % 11 === 0) R.pset(x, y, hex('#a0d4b8'));
  for (const wy of [62, 88]) for (const wx of [234, 262, 290]) { R.rect(wx, wy, wx + 20, wy + 18, K); R.rect(wx + 1, wy + 1, wx + 19, wy + 17, hex('#7ab8d0')); R.rect(wx + 1, wy + 1, wx + 19, wy + 6, hex('#a8d8e8'));
    R.rect(wx + 1, wy + 1, wx + 4, wy + 17, hex('#f0a8b8')); R.rect(wx + 16, wy + 1, wx + 19, wy + 17, hex('#f0a8b8')); R.rect(wx - 1, wy + 18, wx + 21, wy + 19, hex('#e8eef4')); }
  for (let x = 227; x < 320; x++) for (let y = 114; y <= 122; y++) R.pset(x, y, y === 122 ? K : Math.floor((x - 227) / 6) % 2 ? hex('#f0f0f4') : hex('#e8603a'));
  R.rect(232, 124, 314, 139, K); R.rect(233, 125, 313, 138, hex('#2a3448'));
  for (let k = 0; k < 4; k++) { const tx = 236 + k * 20; R.rect(tx, 127, tx + 15, 137, hex('#b07a40')); R.rect(tx + 1, 128, tx + 11, 134, hex('#1a2030')); R.rect(tx + 13, 129, tx + 14, 130, hex('#e8c890')); }
  // la acera, el bordillo y la calle
  R.rect(0, 140, 319, 151, hex('#d8d0c4')); R.rect(0, 140, 319, 140, hex('#efe8dc')); for (let x = 0; x < 320; x += 18) R.rect(x, 141, x, 151, hex('#b8b0a4'));
  for (let k = 0; k < 90; k++) R.pset(Math.floor(h(k, 1, 21) * 320), 141 + Math.floor(h(k, 2, 21) * 10), hex('#c4bcb0'));
  R.rect(0, 152, 319, 152, hex('#f0e8dc')); R.rect(0, 153, 319, 155, hex('#8a8278'));
  for (let y = 156; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x, y, 22) > 0.92 ? hex('#6c6a7a') : h(x, y, 23) > 0.95 ? hex('#4a4858') : y > 174 ? hex('#4e4c5c') : hex('#5c5a6a'));
  for (let x = 4; x < 320; x += 26) R.rect(x, 166, x + 11, 167, hex('#f0c850'));
  R.disco(262, 174, 5, K); R.disco(262, 174, 4, hex('#4a4858')); R.linea(259, 174, 265, 174, hex('#6c6a7a')); R.linea(262, 171, 262, 177, hex('#6c6a7a'));
  for (let i = 0; i < 14; i++) R.pset(70 + i, 160 + Math.round(Math.sin(i * 0.9) * 1.5), hex('#3e3c4a'));
  R.poligono([[150, 176], [176, 175], [182, 178], [146, 179]], hex('#7a8aa8'));   // un charco que refleja el cielo
  // buzón, parquímetros y una jardinera
  R.rect(28, 126, 40, 149, K); R.rect(29, 127, 39, 148, hex('#3a5ab0')); R.rect(29, 127, 39, 131, hex('#5a7ad0')); R.rect(31, 133, 37, 134, K); R.rect(30, 145, 31, 149, K); R.rect(37, 145, 38, 149, K);
  for (const px of [112, 194]) { R.rect(px, 136, px + 1, 150, hex('#5a6070')); R.rect(px - 2, 128, px + 3, 136, K); R.rect(px - 1, 129, px + 2, 135, hex('#c8d0dc')); R.rect(px, 130, px + 1, 132, hex('#2a3448')); }
  R.rect(298, 131, 312, 150, K); R.rect(299, 132, 311, 149, hex('#e8603a')); R.rect(299, 132, 311, 133, hex('#ff9a6a'));   // la boca de riego
  R.rect(236, 140, 262, 150, K); R.rect(237, 141, 261, 149, hex('#c8a878'));
  for (let k = 0; k < 9; k++) { const fx = 239 + k * 3; R.rect(fx, 134 + (k % 3), fx + 1, 140, hex('#3a8a4a')); R.pset(fx, 133 + (k % 3), [hex('#f05a7a'), hex('#ffd83a'), BLANCO][k % 3]); }
  R.usar(prev); return bCalle;
}
function nube60(x, y, w, c1, c2, c3) {
  for (let k = 0; k < 5; k++) { const cx = x + k * w / 5, r = w * (0.16 + 0.1 * Math.sin(k * 2.1 + w)); R.disco(cx, y - r * 0.4, r, c2); }
  for (let k = 0; k < 5; k++) { const cx = x + k * w / 5 - 1, r = w * (0.13 + 0.08 * Math.sin(k * 2.1 + w)); R.disco(cx, y - r * 0.6 - 1, r, c1); }
  for (let i = 0; i <= w; i++) { if (bay(x + i, y) > 0.4) R.pset(x + i, y, c3); R.pset(x + i, y + 1, c3); }
}
function cocheAletas(x, yr, col, dir, t, gira, conductor) {
  x = Math.round(x); const X = (i) => x + dir * i, C1 = hex(col), CS = mez(C1, K, 0.3), CL = mez(C1, BLANCO, 0.4), CR = hex('#e8eef4'), CRS = hex('#9aa4b4');
  for (let i = -30; i <= 30; i++) R.pset(X(i), yr + 4, mez(hex('#5c5a6a'), K, 0.5));   // la sombra
  pol([[X(-34), yr - 3], [X(-36), yr - 21], [X(-24), yr - 13], [X(33), yr - 12], [X(36), yr - 6], [X(34), yr - 1]], C1);   // la carrocería con la aleta
  R.linea(X(-33), yr - 19, X(-25), yr - 13, CL); R.linea(X(-22), yr - 12, X(30), yr - 12, CL);
  pol([[X(-14), yr - 12], [X(-8), yr - 22], [X(10), yr - 22], [X(18), yr - 12]], CL);   // la cabina
  R.poligono([[X(-11), yr - 13], [X(-6), yr - 20], [X(1), yr - 20], [X(1), yr - 13]].map(([px, py]) => [px, py]), hex('#bfe4f0')); R.poligono([[X(3), yr - 13], [X(3), yr - 20], [X(9), yr - 20], [X(15), yr - 13]], hex('#9ad0e0'));
  if (conductor) { const cx = X(5) - 2; R.rect(cx, yr - 18, cx + 3, yr - 15, hex('#f6c290')); R.rect(cx, yr - 19, cx + 3, yr - 18, hex(conductor)); R.pset(dir > 0 ? cx + 3 : cx, yr - 17, K); }
  R.rect(Math.min(X(-30), X(30)), yr - 7, Math.max(X(-30), X(30)), yr - 7, CR); R.rect(Math.min(X(-30), X(30)), yr - 6, Math.max(X(-30), X(30)), yr - 6, CRS);   // la lanza de cromo
  R.rect(Math.min(X(30), X(36)), yr - 4, Math.max(X(30), X(36)), yr - 2, CR); R.rect(Math.min(X(-36), X(-30)), yr - 4, Math.max(X(-36), X(-30)), yr - 2, CR);   // parachoques
  R.rect(Math.min(X(34), X(35)), yr - 10, Math.max(X(34), X(35)), yr - 8, hex('#fff4a0')); R.rect(Math.min(X(-36), X(-35)), yr - 18, Math.max(X(-36), X(-35)), yr - 15, hex('#ff3a3a'));
  for (const wx of [-20, 20]) { const cx = X(wx); R.disco(cx, yr, 5.2, K); R.disco(cx, yr, 4.2, hex('#2a2834')); R.disco(cx, yr, 3, hex('#f4f4f8')); R.disco(cx, yr, 2, hex('#c8d0dc'));
    const an = gira * (dir > 0 ? 1 : -1); R.pset(Math.round(cx + Math.cos(an) * 1.6), Math.round(yr + Math.sin(an) * 1.6), K); R.pset(Math.round(cx - Math.cos(an) * 1.6), Math.round(yr - Math.sin(an) * 1.6), K); }
  R.rect(Math.min(X(14), X(26)), yr - 6, Math.max(X(14), X(26)), yr - 3, CS);   // el faldón de la rueda de atrás
  R.rect(Math.min(X(-26), X(-14)), yr - 6, Math.max(X(-26), X(-14)), yr - 4, CS);
}
function robotPerro(x, y, t, anda) {   // un robot de hojalata que pasea un caniche (pies en y)
  x = Math.round(x); const p = anda ? Math.floor(t * 6) % 2 : 0;
  R.rect(x - 2, y - 4, x - 1, y - p, K); R.rect(x + 2, y - 4, x + 3, y - 1 + p, K);
  R.rect(x - 4, y - 14, x + 5, y - 4, K); R.rect(x - 3, y - 13, x + 4, y - 5, hex('#c8d0dc')); R.rect(x - 3, y - 13, x - 2, y - 5, BLANCO); R.rect(x + 3, y - 13, x + 4, y - 5, hex('#9aa4b4'));
  R.rect(x - 1, y - 11, x + 2, y - 9, hex('#2a3448')); R.pset(x, y - 10, Math.floor(t * 4) % 2 ? hex('#ff5a5a') : hex('#5aff8a')); R.pset(x + 1, y - 10, hex('#ffd860'));
  R.disco(x + 0.5, y - 17, 4, K); R.disco(x + 0.5, y - 17, 3, hex('#9ad0e0')); R.rect(x - 1, y - 18, x + 2, y - 17, hex('#2a3448')); R.pset(x + 2, y - 18, hex('#5affd0')); R.pset(x - 1, y - 19, BLANCO);
  R.linea(x, y - 21, x, y - 24, K); R.pset(x, y - 25, Math.floor(t * 3) % 2 ? hex('#ff5a5a') : hex('#ffd860'));
  // la correa y el caniche
  const dx = x + 13, dy = y, s = anda ? Math.round(Math.sin(t * 12)) : 0;
  R.linea(x + 5, y - 8, dx - 1, dy - 7, hex('#e83a6a'));
  R.rect(dx - 1, dy - 3 + s, dx, dy, K); R.rect(dx + 5, dy - 3 - s, dx + 6, dy, K);
  R.disco(dx + 3, dy - 5, 3.4, K); R.disco(dx + 3, dy - 5, 2.6, hex('#f8c8d8')); R.disco(dx + 7, dy - 9, 2.8, K); R.disco(dx + 7, dy - 9, 2, hex('#f8c8d8')); R.pset(dx + 8, dy - 9, K); R.pset(dx + 9, dy - 8, K);
  R.disco(dx - 1, dy - 7, 1.6, hex('#f8c8d8')); R.pset(dx - 2, dy - 8, K); R.pset(dx + 6, dy - 12, hex('#f8c8d8'));
}
const p3 = (t) => {
  R.copiar(fondoCalle());
  // nubes de tres tonos a tres velocidades (lejos de Atom) y pájaros
  for (const [x0, y, w, v] of [[20, 30, 34, 3], [140, 22, 46, 1.6], [200, 44, 24, 5]]) nube60(((x0 + t * v) % 300) - 40, y, w, BLANCO, hex('#eef4f8'), hex('#c8d8e8'));
  for (let k = 0; k < 3; k++) { const bx = ((t * 14 + k * 9 + 30) % 230), by = 34 + k * 3 + Math.sin(t * 2 + k) * 2, al = Math.floor(t * 6 + k) % 2; R.pset(bx, by, K); R.pset(bx - 1, by - al, K); R.pset(bx + 1, by - al, K); R.pset(bx - 2, by - 1 + al, K); R.pset(bx + 2, by - 1 + al, K); }
  // el monorraíl pasa por arriba
  const mx = lerp(-130, 340, tramo(t, P3 + 0.2, P4 - 0.1));
  for (let k = 0; k < 3; k++) { const x0 = Math.round(mx - k * 38); if (x0 < -40 || x0 > 330) continue;
    R.rect(x0 - 34, 44, x0, 57, K); R.rect(x0 - 33, 45, x0 - 1, 56, hex('#f4f8fc')); R.rect(x0 - 33, 53, x0 - 1, 54, hex('#3ab0a8')); R.rect(x0 - 33, 55, x0 - 1, 56, hex('#a8b4c4'));
    for (let w = x0 - 30; w < x0 - 3; w += 6) { R.rect(w, 47, w + 3, 50, hex('#2a4a6a')); if (h(w, k) > 0.4) R.rect(w + 1, 48, w + 2, 50, hex('#f6c290')); }
    if (k === 0) { R.poligono([[x0, 44], [x0 + 8, 52], [x0 + 6, 57], [x0, 57]], K); R.poligono([[x0, 45], [x0 + 7, 52], [x0 + 5, 56], [x0, 56]], hex('#9ad0e0')); } }
  // el letrero de neón (sin letras): mástil, óvalo turquesa con la estrella atómica y una flecha de bombillas hacia la puerta
  R.rect(214, 66, 219, 140, K); R.rect(215, 66, 218, 140, hex('#d0dae6')); R.rect(217, 66, 218, 140, hex('#a8b4c4'));
  for (let j = -15; j <= 15; j++) for (let i = -11; i <= 11; i++) { const e = (i / 11.5) ** 2 + (j / 15.5) ** 2; if (e > 1) continue; R.pset(216 + i, 82 + j, e > 0.8 ? K : e > 0.62 ? hex('#f8a8b8') : hex('#2a8a84')); }
  const on = Math.floor(t * 2.5) % 3 !== 0;
  for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4 + 0.2; R.linea(216, 82, 216 + Math.cos(an) * 8, 82 + Math.sin(an) * 8, on ? hex('#5affe0') : hex('#8ad8d0')); }
  for (let k = 0; k < 3; k++) { const an = t * 2 + k * 2.09; R.pset(Math.round(216 + Math.cos(an) * 9), Math.round(82 + Math.sin(an) * 5), hex('#fff4a0')); } R.disco(216, 82, 2.2, on ? BLANCO : hex('#f8a8b8'));
  for (let k = 0; k < 16; k++) { const ang = k / 15, px = Math.round(lerp(206, 182, ang)), py = Math.round(lerp(100, 104, ang) - Math.sin(ang * Math.PI) * 4); R.disco(px, py, 1.2, K); R.pset(px, py, (k + Math.floor(t * 10)) % 4 === 0 ? hex('#fff4a0') : hex('#e85a7a')); }
  R.poligono([[178, 104], [184, 99], [184, 109]], (Math.floor(t * 10) % 4 === 0) ? hex('#fff4a0') : hex('#e85a7a'));
  // dentro de la cafetería: clientes en la barra y una camarera que va y viene
  for (let k = 0; k < 5; k++) { const cx = 28 + k * 24, cy = 108 + (Math.sin(t * 3 + k * 2) > 0.7 ? 1 : 0); R.rect(cx - 2, cy, cx + 2, cy + 5, K); R.rect(cx - 1, cy + 1, cx + 1, cy + 4, hex('#f6c290')); R.rect(cx - 2, cy, cx + 2, cy + 1, hex(['#4a3020', '#f0d070', '#2c2232', '#a8743c', '#e8603a'][k])); R.rect(cx - 2, cy + 6, cx + 2, cy + 8, hex(['#3a8ae8', '#e83a6a', '#3ab0a8', '#f0c850', '#8a5ac8'][k])); }
  { const wx = Math.round(90 + Math.sin(t * 0.9) * 40); R.rect(wx - 2, 104, wx + 2, 110, K); R.rect(wx - 1, 105, wx + 1, 109, hex('#f6c290')); R.rect(wx - 2, 103, wx + 2, 104, hex('#e8603a')); R.rect(wx - 2, 110, wx + 2, 113, hex('#f8a8b8')); }
  // el robot de casa: limpia una ventana del edificio de la derecha
  { const rx = 270 + Math.round(Math.sin(t * 2.4) * 3), ry = 104; R.rect(rx - 4, ry - 10, rx + 4, ry, K); R.rect(rx - 3, ry - 9, rx + 3, ry - 1, hex('#c8d0dc')); R.disco(rx, ry - 13, 3.6, K); R.disco(rx, ry - 13, 2.6, hex('#9ad0e0')); R.pset(rx + 1, ry - 13, hex('#5affd0'));
    const px = rx + 7 + Math.round(Math.sin(t * 7) * 3); R.linea(rx + 3, ry - 7, px, ry - 12, hex('#5a6070')); R.rect(px - 1, ry - 15, px + 1, ry - 11, hex('#ffd860')); }
  // la tele del escaparate: brillos que cambian
  for (let k = 0; k < 4; k++) { const tx = 237 + k * 20, f = Math.floor(t * 2 + k) % 3; R.rect(tx, 128, tx + 10, 134, [hex('#7ab8d0'), hex('#a8d8e8'), hex('#5a8ab0')][f]); R.rect(tx + 2, 130 + f, tx + 8, 130 + f, BLANCO); }
  // por la acera: el robot con el caniche, la vecina que espera y una niña con globo
  const ra = tramo(t, P3, P4); robotPerro(lerp(-10, 120, ra), 148, t, ra > 0 && ra < 1);
  const llega = tramo(t, P3 + 0.6, B.aletas + 0.1);
  R.actor(EL.dama, 168, 149, t, { dir: -1, dedo: t > B.aletas && t < B.coches + 0.6, sonrisa: t > B.aletas, habla: t > B.coches + 0.6 && Math.sin(t * 8) > 0 });
  const nn = tramo(t, P3 + 1, P4); const nx = Math.round(lerp(330, 196, nn)); R.actor(EL.nina, nx, 150, t, { dir: -1, anda: nn > 0 && nn < 1, sostiene: [nx - 2, 130] });
  R.linea(nx - 2, 129, nx - 2, 112, hex('#5a5a6a')); R.disco(nx - 2 + Math.sin(t * 2), 106, 5, K); R.disco(nx - 2 + Math.sin(t * 2), 106, 4, hex('#e83a6a')); R.pset(nx - 4 + Math.round(Math.sin(t * 2)), 104, hex('#ffa0c0'));
  // los coches con aletas: uno turquesa cruza por el carril de atrás y uno rosa aparca delante
  const cb = tramo(t, B.aletas - 0.3, P4); if (cb > 0 && cb < 1) cocheAletas(lerp(370, -60, cb), 160, '#5ad0c8', -1, t, t * 9, '#2c2232');
  const xa = lerp(-80, 126, 1 - (1 - llega) ** 2); cocheAletas(xa, 172, '#f8a0bc', 1, t, (1 - (1 - llega) ** 2) * 30, '#4a3020');
  if (t > B.coches + 0.1 && t < B.coches + 0.7) { R.icono('!', Math.round(xa) + 8, 140, hex('#ffd860'), K, 1); }
};

// ── el desfile ──
let tb = null;
function aparece(def, x, suelo, t, o, u) {   // Sue: invisible (solo el filo que brilla) → visible, tramada
  if (!tb) tb = R.nuevo(); tb.fill(0); const prev = R.usar(tb); R.actor(def, x, suelo, t, o); R.usar(prev);
  for (let y = Math.max(0, suelo - 42); y <= Math.min(179, suelo + 2); y++) for (let xx = Math.max(1, x - 14); xx <= Math.min(318, x + 30); xx++) { const c = tb[y * 320 + xx]; if (!c) continue;
    if (bay(xx, y) < u) R.pset(xx, y, c);
    else if ((!tb[y * 320 + xx - 1] || !tb[y * 320 + xx + 1] || !tb[(y - 1) * 320 + xx]) && Math.sin(t * 9 + y * 0.7) > -0.2) R.pset(xx, y, mez(R.pget(xx, y), hex('#bfeaff'), 0.75)); }
  if (u > 0 && u < 1) for (let k = 0; k < 10; k++) chispa(x + 7 + Math.round(Math.cos(k * 0.63 + t * 3) * (12 + k % 3 * 3)), suelo - 14 + Math.round(Math.sin(k * 0.63 + t * 3) * 14), t, k, hex('#bfeaff'));
}
const p4 = (t) => {
  const s = T.sesenta(R, t, { encuadre: 'ciudad', camara: 'desfile', avance: 0, confeti: 0.6 }), su = s.suelo ?? 150;
  // en la ventana de ladrillo, un robot de casa limpia el cristal con su plumero (entra en «robots»)
  { const rx = Math.round(lerp(14, 32, tramo(t, B.robots - 0.6, B.robots))), ry = 43; R.rect(rx - 4, ry - 9, rx + 4, ry, K); R.rect(rx - 3, ry - 8, rx + 3, ry - 1, hex('#c8d0dc')); R.rect(rx - 3, ry - 8, rx - 2, ry - 1, BLANCO);
    R.disco(rx, ry - 12, 3.6, K); R.disco(rx, ry - 12, 2.6, hex('#9ad0e0')); R.rect(rx - 1, ry - 13, rx + 1, ry - 12, hex('#2a3448')); R.pset(rx + 1, ry - 13, hex('#5affd0')); R.linea(rx, ry - 16, rx, ry - 18, K); R.pset(rx, ry - 19, Math.floor(t * 3) % 2 ? hex('#ff5a5a') : hex('#ffd860'));
    const px = rx + 6 + Math.round(Math.sin(t * 8) * 3), py = ry - 12 + Math.round(Math.cos(t * 8) * 3); R.linea(rx + 3, ry - 6, px, py + 3, hex('#5a6070')); R.disco(px, py, 2.4, hex('#f8a8c8')); R.pset(px - 1, py - 1, BLANCO); }
  const rs = tramo(t, B.reed - 0.05, B.reed + 0.6), salto = Math.round(Math.sin(rs * Math.PI) * 10);
  R.actor(EL.reed, 110, su, t, { dir: 1, salto, brazos: rs > 0 && rs < 1, sonrisa: true, dedo: t < B.reed - 0.1 && Math.sin(t * 3) > 0, habla: t > B.reed + 0.6 && t < B.sue - 0.2 && Math.sin(t * 8) > 0 });
  const u = tramo(t, B.sue - 0.15, B.sue + 0.55);
  aparece(EL.sue, 145, su, t, { dir: -1, sonrisa: u > 0.5, brazos: u >= 1 && Math.sin(t * 5) > -0.3 }, u);
  R.actor(EL.johnny, 180, su, t, { dir: -1, sonrisa: true, dedo: Math.sin(t * 2.2) > 0.3, sorpresa: u > 0 && u < 1 });
  R.actor(EL.cosa, 218, su, t, { dir: -1, sonrisa: true, habla: Math.sin(t * 5) > 0.5 && t < P4 + 1.5, brazos: t > B.sue + 0.6 && Math.sin(t * 4) > 0 });
  T.h_confeti(R, t, { n: 12, semilla: 7 });
};
// ── el desfile por la avenida: Johnny escribe un 4 de fuego ──
const RUTA4 = [[90, 84], [90, 26], [58, 62], [108, 62]];
const largo4 = RUTA4.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - RUTA4[i][0], p[1] - RUTA4[i][1]), 0);
const en4 = (d) => { for (let i = 1; i < RUTA4.length; i++) { const L = Math.hypot(RUTA4[i][0] - RUTA4[i - 1][0], RUTA4[i][1] - RUTA4[i - 1][1]); if (d <= L) return [lerp(RUTA4[i - 1][0], RUTA4[i][0], d / L), lerp(RUTA4[i - 1][1], RUTA4[i][1], d / L)]; d -= L; } return RUTA4[RUTA4.length - 1]; };
const p5 = (t) => {
  const cx = Math.round(150 + (t - P5) * 4);
  const s = T.sesenta(R, t, { encuadre: 'ciudad', camara: 'general', carroza: cx, avance: 4, confeti: t > B.famosos ? 1 : 0.35 }), su0 = s.suelo ?? 142;
  const bs = tramo(t, B.ben + 0.05, B.ben + 0.65), aterriza = t > B.ben + 0.65 && t < B.ben + 0.85, su = su0 + (aterriza ? 1 : 0);
  const fiesta = t > B.famosos;
  R.actor(EL.reed, cx - 36, su, t, { dir: 1, sonrisa: true, brazos: fiesta && Math.sin(t * 5) > -0.4, dedo: !fiesta && t > B.johnny + 0.9, sorpresa: t > B.johnny && t < B.johnny + 0.8 });
  R.actor(EL.sue, cx - 18, su, t, { dir: 1, sonrisa: true, brazos: fiesta && Math.sin(t * 5 + 1) > -0.4, dedo: !fiesta && Math.sin(t * 2) > 0.4 });
  R.actor(EL.cosa, cx + 20, su0, t, { dir: -1, salto: Math.round(Math.sin(bs * Math.PI) * 12), brazos: (bs > 0 && bs < 1) || (fiesta && Math.sin(t * 4) > 0), sonrisa: true });
  if (aterriza) for (let k = -3; k <= 3; k++) R.pset(cx + 27 + k * 4, su0 + 1, hex('#ffd860'));
  // Johnny: en la carroza; se enciende, vuela al cielo y escribe el 4
  const fuego = t > B.johnny, sube = ease(tramo(t, B.johnny + 0.2, B.johnny + 0.8)), traza = tramo(t, B.johnny + 0.8, B.heroes - 0.1);
  if (fuego) { const d = traza * largo4;
    // la estela de fuego que queda escrita
    for (let i = 0; i <= d; i += 0.7) { const [fx, fy] = en4(i), viejo = (d - i) / 60, fl = Math.sin(t * 20 + i * 1.3);
      R.disco(fx, fy, 2.6 - Math.min(1, viejo), viejo > 1.4 ? hex('#c83a1a') : hex('#ff7a2a')); if (fl > -0.2) R.pset(fx + Math.round(fl), fy - 2, viejo > 1 ? hex('#ff9a3a') : hex('#ffd860')); if (viejo < 0.3) R.pset(fx, fy, BLANCO); }
    if (traza >= 1) for (let k = 0; k < 12; k++) chispa(Math.round(en4(k / 12 * largo4)[0] + Math.sin(k) * 5), Math.round(en4(k / 12 * largo4)[1] - 4), t, k, hex('#fff2a0'));
    let jx, jy; if (traza <= 0) { jx = lerp(cx + 7, RUTA4[0][0], sube); jy = lerp(su - 12, RUTA4[0][1], sube); } else if (traza < 1) [jx, jy] = en4(traza * largo4); else { jx = RUTA4[3][0] + 6 + Math.sin(t * 2) * 4; jy = RUTA4[3][1] - 6 + Math.cos(t * 2.4) * 3; }
    if (t < B.johnny + 0.25) { const g = tramo(t, B.johnny, B.johnny + 0.25); R.disco(cx + 7, su - 12, 6 + g * 8, mez(hex('#ffd860'), BLANCO, 1 - g)); }
    R.actor(EL.antorcha, Math.round(jx) - 7, Math.round(jy) + 12, t, { dir: traza > 0 && traza < 1 && en4(traza * largo4 + 1)[0] < jx ? -1 : 1, brazos: traza >= 1, sonrisa: true });
  } else R.actor(EL.johnny, cx, su, t, { dir: -1, sonrisa: true, habla: Math.sin(t * 7) > 0 });
  T.h_confeti(R, t, { n: fiesta ? 16 : 10, semilla: 7 });
};
const efectos = [[0.35, 'whoosh'], [A.cuatro, 'brillo'], [A.pasos, 'jet'], [P2 + 0.3, 'whoosh'], [A.n828, 'sello'], [P3 + 0.6, 'maquina'], [B.aletas - 0.3, 'coche'], [B.coches + 0.1, 'claxon'],
  [B.reed, 'boing'], [B.sue, 'brillo'], [B.johnny, 'rafaga'], [B.ben + 0.65, 'golpecito'], [B.famosos, 'publico'], [B.heroes, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2025 });
''')

E['do-galactus'] = ('Galactus', '''// DO-GALACTUS (frases 50–51), 2025. Tres planos:
// 1. (sesenta cielo 'familia') en la azotea, Sue con Franklin en brazos y Reed; en «Franklin» los juguetes salen de la
//    caja y flotan (gag 7); en «Galactus arrives» el gigante morado sube detrás de la ciudad; se queda mirando el pato que
//    flota (los ojos lo siguen); en «devours planets» se traga una luna que pasaba;
// 2. (fondo local, el espacio morado) Galactus se acerca a la 828; en «enormous power» el poder de Franklin late y manda
//    ondas; en «They refuse» la cúpula de fuerza de Sue salta y lo rebota; en «whole family» cuatro chispas la rodean;
// 3. (sesenta cielo 'general') los cuatro en la azotea: se abre el portal azul; en «banish» el campo de fuerza, las llamas
//    de Johnny y los puñetazos de la Cosa lo empujan y Galactus se va por el portal; en «Earth-828 is saved» el portal se
//    cierra y la familia lo celebra.''',
COMUN + ESPACIO + r'''
const a = (f) => en('franklin', f), b = (f) => en('expulsar', f);
const G2 = a(0.6398), G3 = b(0.245);
const A = { franklin: a(0.2026), galactus: a(0.2588), llega: a(0.305), devora: a(0.51), planetas: a(0.547), nino: a(0.7077), nota: a(0.7967), poder: a(0.8297) };
const B = { niega: b(0), familia: b(0.173), destierra: b(0.3635), galactus: b(0.425), universo: b(0.672), tierra: b(0.8056), salva: b(0.927) };
const CIAN = hex('#9af0ff');
// ── 1. la azotea de cerca ──
function caja(x, y) {   // la caja de juguetes de madera (pie en y)
  R.rect(x - 1, y - 13, x + 21, y, K); R.rect(x, y - 12, x + 20, y - 1, hex('#c8884a')); for (let j = y - 10; j < y - 1; j += 3) R.rect(x, j, x + 20, j, hex('#a8683a'));
  R.rect(x, y - 12, x + 20, y - 11, hex('#e8a868')); estrella5(x + 10, y - 6, 3.6, hex('#ffd83a')); R.rect(x - 2, y - 16, x + 22, y - 13, K); R.rect(x - 1, y - 15, x + 21, y - 14, hex('#e8a868'));
}
const SALIDA = [[100, 146], [106, 147], [112, 146], [98, 145], [116, 144]];
const g1 = (t) => {
  const sube = ease(tramo(t, A.galactus, A.llega + 1.2));
  const s = T.sesenta(R, t, { encuadre: 'cielo', camara: 'familia', gigante: sube }), su = s.suelo ?? 165;
  // la luna que pasa y se traga
  const lu = tramo(t, A.devora - 0.5, A.planetas + 0.15);
  if (s.galactus && lu < 1) { const [bx, by] = [s.galactus.x + 2, s.galactus.y + 3 * s.galactus.s], mx = lerp(112, bx, ease(lu)), my = lerp(34, by, ease(lu)) - Math.sin(lu * Math.PI) * 10, r = 6 * (1 - lu * 0.7);
    R.disco(mx, my, r + 1, K); R.disco(mx, my, r, hex('#d8d4e4')); R.disco(mx - r * 0.3, my - r * 0.3, r * 0.45, hex('#f0eef8')); R.disco(mx + r * 0.35, my + r * 0.2, Math.max(1, r * 0.25), hex('#a8a4b8')); }
  if (s.galactus && t > A.planetas + 0.1 && t < A.planetas + 0.9) { const g = tramo(t, A.planetas + 0.1, A.planetas + 0.9); for (let k = 0; k < 6; k++) R.pset(Math.round(s.galactus.x + 2 + Math.cos(k) * (6 + g * 10)), Math.round(s.galactus.y + 18 - g * 6 + Math.sin(k * 2) * 4), hex('#d8d4e4')); }
  caja(92, su);
  const sue = R.actor(EL.sue, 128, su, t, { dir: 1, sostiene: [146, su - 14], sonrisa: t < A.llega, sorpresa: t > A.llega && t < A.planetas + 0.3, enfado: t > A.planetas + 0.3 });
  T.PIEZAS_DO.franklin(R, sue.mano[0] - 4, sue.mano[1] + 6);
  R.actor(EL.reed, 166, su, t, { dir: -1, sonrisa: t < A.llega, habla: t < A.franklin && Math.sin(t * 7) > 0, sorpresa: t > A.llega, dedo: t > A.llega + 0.3 && t < A.devora });
  if (t > A.llega && t < A.llega + 0.9) R.icono('!', 172, su - 40, hex('#ffd860'), K, 1);
  // los juguetes flotan alrededor de Franklin, con chispas
  const fx = sue.mano[0], fy = sue.mano[1] - 22;
  for (let k = 0; k < 5; k++) { const u = ease(tramo(t, A.franklin + k * 0.18, A.franklin + 1 + k * 0.18)), an = k * 1.256 + t * 0.7, ox = fx + Math.cos(an) * (30 + (k % 2) * 8), oy = fy + Math.sin(an) * 10 + Math.sin(t * 2 + k) * 2;
    let x = lerp(SALIDA[k][0], ox, u), y = lerp(SALIDA[k][1], oy, u) - Math.sin(u * Math.PI) * 10;
    if (k === 0 && t > A.llega + 0.8) { const v = ease(tramo(t, A.llega + 0.8, A.devora - 0.3)) * (1 - ease(tramo(t, A.planetas + 0.4, G2))); x = lerp(x, 176, v); y = lerp(y, 92, v); }
    if (u > 0) { chispa(Math.round(x - 5), Math.round(y + 4), t, k, CIAN); chispa(Math.round(x + 5), Math.round(y - 4), t, k + 3, BLANCO); }
    juguete2(k, x, y, t); if (k === 0) s.pato = [x, y]; }
  if (t > A.franklin) for (let k = 0; k < 6; k++) chispa(fx - 2 + Math.round(Math.cos(t * 3 + k) * 7), fy + 12 + Math.round(Math.sin(t * 3 + k) * 5), t, k, CIAN);
  // Galactus se queda mirando el pato: las pupilas lo siguen
  if (s.galactus && sube > 0.6 && s.pato) { const gs = s.galactus.s, x0 = s.galactus.x - 12 * gs, y0 = s.galactus.y - 9.5 * gs;
    for (const c of [10, 13]) { const ex = x0 + c * gs + gs / 2, ey = y0 + 9 * gs + gs / 2, d = Math.hypot(s.pato[0] - ex, s.pato[1] - ey) || 1; R.disco(ex + (s.pato[0] - ex) / d * 1.5, ey + (s.pato[1] - ey) / d * 1.5, 1.4, K); }
    if (t > A.planetas + 0.5 && t < G2) R.icono('?', s.galactus.x + 26, s.galactus.y - 34, hex('#ffd860'), K, 2); }
};
// ── 2. Galactus en el espacio, ante la 828 ──
const PM = { b0: hex('#0c0618'), b1: hex('#1a0c2e'), n0: hex('#2e1450'), n1: hex('#4a1e72'), n2: hex('#7a3aa0'), e0: hex('#6a5a8a'), e1: hex('#c8b0e8'), e2: BLANCO, f: 3.3, banda: 0.35, s: 37,
  galaxias: [[200, 30, 4, 2], [40, 150, 5, 4]], roca: hex('#7a6a88'), rocaL: hex('#a89ab8'), rocaS: hex('#4a3a58') };
let tg = null;
function galactusLuz(cx, pie, s, t, brillo) {   // Galactus con luz de contorno (le da la 828 por la derecha), sombra tramada y aura
  if (!tg) tg = R.nuevo(); tg.fill(0); const prev = R.usar(tg); T.PIEZAS_DO.galactus(R, cx, pie, { s }); R.usar(prev);
  const x0 = Math.max(1, Math.round(cx - 12 * s) - 3), x1 = Math.min(318, Math.round(cx + 12 * s) + 3), y0 = Math.max(1, pie - 35 * s - 3), y1 = Math.min(178, pie);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = tg[y * 320 + x];
    if (!c) { let cerca = 0; for (let d = 1; d <= 3 && !cerca; d++) if (tg[y * 320 + x - d] || tg[y * 320 + x + d] || tg[(y - d) * 320 + x] || tg[(y + d) * 320 + x]) cerca = d;
      if (cerca && bay(x, y) < 0.55 - cerca * 0.14 + Math.sin(t * 3 + y * 0.2) * 0.08) R.pset(x, y, mez(R.pget(x, y), hex('#b06ae8'), 0.6)); continue; }
    const u = (x - cx) / (12 * s), bb = bay(x, y);
    let k = c; if (c === K) k = c; else if (!tg[y * 320 + x + 1] || !tg[y * 320 + x + 2]) k = mez(c, hex('#ffe8c8'), 0.55); else if (!tg[y * 320 + x - 1]) k = mez(c, hex('#2a0c40'), 0.45);
    else if (u < -0.15 && bb < 0.25 + (-u - 0.15) * 0.8) k = mez(c, hex('#1a0828'), 0.38); else if (u > 0.2 && bb < (u - 0.2) * 0.5) k = mez(c, hex('#ffd8f0'), 0.22);
    if (k !== K && tg[(y - s) * 320 + x] === K && bb < 0.5) k = mez(k, BLANCO, 0.18);
    if (c !== K) { const ry = (y - (pie - 35 * s)) % (2 * s), rx = (x - Math.round(cx - 12 * s)) % (3 * s); if (ry === 0 && bb < 0.6) k = mez(k, K, 0.16); else if (ry === 1 && bb < 0.4) k = mez(k, BLANCO, 0.1); if (rx === 0 && y > pie - 22 * s && bb < 0.5) k = mez(k, K, 0.12); if (h(x, y, 5) > 0.95) k = mez(k, BLANCO, 0.14); }
    R.pset(x, y, k); }
  // los ojos
  const ex = cx - 12 * s + 10 * s, ey = pie - 35 * s + 9 * s; for (const dx of [0, 3 * s]) { R.rect(ex + dx, ey, ex + dx + s - 1, ey + s - 1, brillo > 0.5 ? CIAN : hex('#e8f0ff')); if (brillo > 0) for (let k = 0; k < 4; k++) R.pset(ex + dx + s + k * 2, ey + Math.round(s / 2) - k, mez(R.pget(ex + dx + s + k * 2, ey + 1), CIAN, brillo)); }
}
const g2 = (t) => {
  R.copiar(fondoEspacio('morado', PM)); vidaEspacio(t, PM, 2);
  const avanza = ease(tramo(t, G2, B.niega)), rebota = ease(tramo(t, B.niega + 0.05, B.niega + 0.8));
  const gx = Math.round(70 + 62 * avanza - 34 * rebota + (rebota > 0 && rebota < 0.5 ? Math.sin(t * 50) * 2 : 0)), gy = 212 + Math.round(Math.sin(t * 0.9) * 2);
  roca(((t * 6 + 200) % 380) - 30, 150, 6, 2, PM); roca(((t * 3 + 90) % 380) - 30, 40, 3, 5, PM);
  anillo(250, 110, 30, PAL828, 'atras', -0.3, 0.3, 1.35, 1.95); planeta(250, 110, 30, t, PAL828, { giro: 0.1 }); anillo(250, 110, 30, PAL828, 'delante', -0.3, 0.3, 1.35, 1.95);
  // el poder de Franklin: una lucecita que late en la 828 y ondas hacia Galactus
  const late = tramo(t, A.nota - 0.3, A.nota + 0.2), sx = 240, sy = 100;
  if (late > 0) { const p = 1.5 + Math.sin(t * 9) * 1 + late; R.disco(sx, sy, p + 1.5, mez(hex('#5ad0ff'), BLANCO, 0.3)); R.disco(sx, sy, p, BLANCO);
    for (let k = 0; k < 4; k++) R.linea(sx - 6 - k, sy + (k - 1.5) * 3, sx - 2, sy, CIAN);
    for (let w = 0; w < 3; w++) { const r = ((t - A.poder + w * 0.5) % 1.5) * 70; if (t < A.poder || t > B.niega || r < 8) continue;
      for (let an = 2.2; an < 4.1; an += 0.02) { const px = sx + Math.cos(an) * r, py = sy + Math.sin(an) * r * 0.9; if (!tranquila(px, py) && bay(px, py) < 0.7 - r / 140) R.pset(px, py, CIAN); } } }
  galactusLuz(gx, gy, 4, t, tramo(t, A.poder - 0.2, A.poder + 0.3) * (1 - rebota * 0.6));
  // la cúpula de fuerza de Sue: salta en «They refuse» y le rebota
  const cu = tramo(t, B.niega - 0.05, B.niega + 0.25);
  if (cu > 0) { const r = 52 * ease(cu) + (rebota > 0 && rebota < 1 ? Math.sin(t * 30) * 1.5 * (1 - rebota) : 0);
    for (let y = Math.max(0, Math.floor(110 - r - 1)); y <= Math.min(179, 110 + r + 1); y++) for (let x = Math.max(0, Math.floor(250 - r - 1)); x <= Math.min(319, 250 + r + 1); x++) { const d = Math.hypot(x + 0.5 - 250, y + 0.5 - 110); if (d > r || tranquila(x, y)) continue;
      const hexa = (Math.abs(Math.sin((x + y * 0.58) * 0.32)) < 0.12 || Math.abs(Math.sin((x - y * 0.58) * 0.32)) < 0.12 || Math.abs(Math.sin(y * 0.37)) < 0.1);
      if (d > r - 1.5) R.pset(x, y, BLANCO); else if (d > r - 3) R.pset(x, y, mez(R.pget(x, y), hex('#7ad8ff'), 0.7)); else if (hexa && Math.sin(t * 4 + d * 0.2) > -0.3) R.pset(x, y, mez(R.pget(x, y), hex('#bfeaff'), 0.35)); else if (bay(x, y) < 0.2) R.pset(x, y, mez(R.pget(x, y), hex('#7ad8ff'), 0.35)); }
    if (rebota > 0 && rebota < 0.7) for (let k = 0; k < 9; k++) { const an = Math.PI + (k - 4) * 0.12; R.pset(Math.round(250 + Math.cos(an) * (r + 3 + rebota * 8)), Math.round(110 + Math.sin(an) * (r + 3 + rebota * 8)), BLANCO); } }
  // la familia unida: cuatro chispas de colores que dan vueltas a la cúpula
  if (t > B.familia) { const u = tramo(t, B.familia, B.familia + 0.4); ['#7ad8ff', '#ff8a2a', '#e8823a', '#3a6ae8'].forEach((c, k) => { for (let j = 0; j < 7; j++) { const an = t * 3 + k * Math.PI / 2 - j * 0.07, r = 58 * u; const px = 250 + Math.cos(an) * r, py = 110 + Math.sin(an) * r * 0.8; if (!tranquila(px, py)) R.disco(px, py, j === 0 ? 2.2 : 1.4 - j * 0.15, j === 0 ? BLANCO : hex(c)); } }); }
};
// ── 3. la azotea entera: lo echan por el portal ──
function rayo(x0, y0, x1, y1, w, c1, c2, t, onda) {
  const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0))), ux = (x1 - x0) / n, uy = (y1 - y0) / n, nx = -uy, ny = ux;
  for (let i = 0; i <= n; i++) { const ww = w * (0.5 + 0.5 * i / n) + Math.sin(t * 22 - i * onda) * 0.9; for (let s = -ww; s <= ww; s += 0.5) { const px = x0 + ux * i + nx * s, py = y0 + uy * i + ny * s; if (tranquila(px, py)) continue; const e = Math.abs(s) / ww;
    R.pset(px, py, e < 0.3 ? BLANCO : e < 0.68 ? c1 : mez(R.pget(px, py), c2, 0.55)); } }
}
const g3 = (t) => {
  const por = ease(tramo(t, G3 + 0.1, G3 + 0.9)), ex = ease(tramo(t, B.galactus - 0.2, B.universo + 0.3)), cierra = tramo(t, B.tierra - 0.15, B.tierra + 0.5);
  const s = T.sesenta(R, t, { encuadre: 'cielo', camara: 'general', gigante: 1, portal: ex >= 1 ? 1 - cierra : por, expulsa: ex }), su = s.suelo ?? 166;
  const empuja = t > B.destierra && ex < 1, fiesta = t > B.tierra;
  const ue = ex * ex * (3 - 2 * ex), g = ex < 1 ? [190 - 120 * ue, 68 - 14 * ue + 10 * (1 - ue * 0.94)] : null;
  // Reed con Franklin en brazos; Sue con las dos manos arriba; la Cosa da puñetazos al aire; Johnny llega volando
  const reed = R.actor(EL.reed, 104, su, t, { dir: 1, sostiene: [120, su - 14], sonrisa: fiesta, salto: fiesta ? Math.round(Math.abs(Math.sin((t - B.tierra) * 5)) * 4) : 0, sorpresa: t < B.destierra });
  T.PIEZAS_DO.franklin(R, reed.mano[0] - 4, reed.mano[1] + 6); if (empuja) for (let k = 0; k < 4; k++) chispa(reed.mano[0] + Math.round(Math.cos(t * 4 + k * 1.6) * 8), reed.mano[1] - 4 + Math.round(Math.sin(t * 4 + k * 1.6) * 6), t, k, CIAN);
  R.actor(EL.sue, 132, su, t, { dir: 1, brazos: empuja || fiesta, enfado: empuja, sonrisa: fiesta, salto: fiesta ? Math.round(Math.abs(Math.sin((t - B.tierra) * 5 + 1)) * 4) : 0 });
  const golpe = empuja && Math.floor(t * 3) % 2 === 0;
  R.actor(EL.cosa, 160, su, t, { dir: 1, brazos: golpe || fiesta, dedo: empuja && !golpe, enfado: empuja, sonrisa: fiesta, salto: fiesta ? Math.round(Math.abs(Math.sin((t - B.tierra) * 5 + 2)) * 4) : 0 });
  const jl = ease(tramo(t, G3, G3 + 0.8)), jx = Math.round(lerp(330, 194, jl) + (fiesta ? Math.sin(t * 3) * 10 : 0)), jy = Math.round(lerp(96, 112, jl) + Math.sin(t * 2.4) * 2);
  // los poderes: el campo de fuerza, las llamas y las ondas de los puñetazos
  if (empuja && g) { const u = tramo(t, B.destierra, B.destierra + 0.3);
    rayo(139, su - 27, lerp(139, g[0], u), lerp(su - 27, g[1], u), 3.2, hex('#9ae0ff'), hex('#5ab0ff'), t, 0.3);
    rayo(jx + 7, jy - 10, lerp(jx + 7, g[0] + 6, u), lerp(jy - 10, g[1] - 4, u), 2.4, hex('#ffb83a'), hex('#ff5a1a'), t, 0.6);
    for (let w = 0; w < 3; w++) { const v = ((t * 1.5 + w / 3) % 1); const cx = lerp(167, g[0], v), cy = lerp(su - 30, g[1], v), r = 3 + v * 7; for (let an = 0; an < 6.28; an += 0.25) { const px = cx + Math.cos(an) * r, py = cy + Math.sin(an) * r * 0.6; if (!tranquila(px, py)) R.pset(px, py, v < 0.5 ? hex('#ffb070') : hex('#e8823a')); } } }
  R.actor(EL.antorcha, jx, jy + 12, t, { dir: -1, brazos: empuja || fiesta, sonrisa: fiesta, enfado: empuja });
  if (fiesta && t < B.tierra + 1.2) for (let k = 0; k < 10; k++) chispa(70 + Math.round(Math.cos(k * 0.63) * (20 + (t - B.tierra) * 20)), 54 + Math.round(Math.sin(k * 0.63) * (14 + (t - B.tierra) * 14)), t, k, hex('#bfeaff'));
};
const efectos = [[A.franklin + 0.1, 'brillo'], [A.galactus + 0.2, 'trueno'], [A.planetas, 'masca'], [A.planetas + 0.6, 'boing'], [A.poder, 'zumbido'], [B.niega + 0.05, 'boing'], [B.familia, 'whoosh'],
  [G3 + 0.2, 'viento'], [B.destierra, 'rafaga'], [B.galactus + 0.8, 'whoosh'], [B.universo, 'boom'], [B.tierra, 'brillo']];
T.rodar(E, R, [[0, g1], [G2, g2], [G3, g3]], { efectos, año: 2025 });
''')

E['do-poscreditos'] = ('A mitad de los créditos', '''// DO-POSCREDITOS (frases 52–53), 2025. Cuatro planos:
// 1. (latveria cuarto 'general') el cuarto de Franklin; en «four years later» el calendario de la pared pierde tres hojas
//    y se queda en 4; en «Sue finds» se abre la puerta y Sue entra; en «a stranger» ve a Franklin jugando con un hombre de
//    capa verde, de espaldas, y se sorprende («!»);
// 2. (latveria cuarto 'puerta') Sue en el umbral; delante, el desconocido de espaldas junto a Franklin y sus juguetes que
//    flotan; en «green cloak» la capa ondea con el aire de la puerta; en «metal mask in his hand» levanta la máscara, que brilla;
// 3. (fondo local, los créditos) la pantalla con los créditos que suben, con caritas; las palomitas buscan: la fila de la
//    capucha sin cara pasa en «never see his face», en «isn't even listed» su nombre está vacío («?»); en «Kevin Feige» se
//    enciende la fila de la gorra y las palomitas la señalan;
// 4. (fondo local, el escenario) Feige con su gorra entra en «The Head of Marvel Studios» y saluda; en «leads directly into»
//    una flecha dorada va de la máscara de la pantalla al cartel del 2026, que destella en «Doomsday»; flashes del público.''',
COMUN + r'''
const a = (f) => en('desconocido', f), b = (f) => en('feige', f);
const C2 = a(0.538), C3 = b(0) - 0.08, C4 = b(0.511);
const A = { cuatro: a(0.175), sue: a(0.311), franklin: a(0.3564), desconocido: a(0.439), capa: a(0.711), mascara: a(0.865), mano: a(0.943) };
const B = { cara: b(0.068), downey: b(0.148), listado: b(0.235), kevin: b(0.386), jefe: b(0.5215), marvel: b(0.546), dicho: b(0.697), lleva: b(0.808), doomsday: b(0.925) };
// el desconocido de espaldas: capucha sin cara y la capa por encima del cuerpo
const CAB_ESP = ['...kkkkkkkk....', '..kVVVVVVVVk...', '.kVVvVVVVVVVk..', 'kVVVVVVVVVVVVk.', 'kVVVVVVvVVVVVk.', 'kVvVVVVvVVVVVk.', 'kVvVVVVvVVVvVk.', 'kVvVVVVVVVVvVk.',
  'kVVVVVVVVVVvVk.', 'kVVVVVVVVVVVVk.', '.kVVVVVVVVVVk..', '..kVvVVVVVvk...', '...kkkkkkkk....'];
const CAPA_ESP = ['..kkkkkkkkkkkk...', '.kQQQQQQQQQQQQk..', '.kQqQQQQQQQQQQk..', 'kQQqQQQQQQqQQQQk.', 'kQqQQQQQQQqQQQQk.', 'kQqQQQQQQQqQQQQk.', 'kQqQQQQQQQqQQQQk.', 'kQqQQQQQQQQqQQQk.',
  'kQqQQQQQQQQqQQQk.', 'kQqqQQQQQQQqqQQk.', 'kqQqQQQQQQQqqQqk.', '.kkkkkkkkkkkkkk..'];
let ONDA = 0;
const doomEsp = { ...EL.doom, cab: CAB_ESP, detras: null, delante: (c) => { c.cuerpo.rej(CAPA_ESP, -1, -1);
  for (let i = 0; i < 16; i++) { const d = Math.round(Math.sin(c.t * 7 + i * 0.6) * ONDA); if (d > 0) for (let j = 0; j < d; j++) c.cuerpo.px(i, 11 + j, j === d - 1 ? K : hex('#1e5a2a')); } } };
function desconocido(x, suelo, t, alza) {   // de espaldas, con la máscara de metal en la mano
  const ob = R.actor(doomEsp, x, suelo, t, { dir: 1, sostiene: [x + 21, Math.round(lerp(suelo - 8, suelo - 17, alza))] });
  T.e_mascara(R, ob.mano[0] + 2, ob.mano[1] + 4, 1, { brillo: (t * 0.5) % 1 });
  return ob;
}
function calendario(x, y, t) {   // 22 × 30, en la pared: hojas con 1, 2, 3 y 4 que se arrancan
  R.rect(x - 1, y - 1, x + 22, y + 30, K); R.rect(x, y, x + 21, y + 29, hex('#e8e0d0')); R.rect(x, y, x + 21, y + 6, hex('#e8603a')); R.rect(x, y, x + 21, y, hex('#ff9a6a'));
  for (const rx of [5, 16]) { R.rect(x + rx, y - 3, x + rx + 1, y + 1, hex('#8a94a8')); }
  const k = Math.min(3, Math.floor(tramo(t, A.cuatro - 0.1, A.cuatro + 0.75) * 4)); R.numero(String(k + 1), x + 11, y + 26, { tam: 16, centro: true, rampa: undefined });
  for (let j = y + 8; j < y + 29; j += 4) R.pset(x + 1, j, hex('#c8c0b0'));
  for (let i = 0; i < 3; i++) { const t0 = A.cuatro - 0.1 + (i + 1) * 0.2125, u = tramo(t, t0, t0 + 0.9); if (u <= 0 || u >= 1) continue;
    const px = x + 4 + u * 26 * (i % 2 ? -1 : 1), py = y + 10 + u * u * 70, w = Math.round(8 * Math.abs(Math.cos(u * 9))); R.rect(px - w, py - 6, px + w, py + 6, K); if (w > 1) R.rect(px - w + 1, py - 5, px + w - 1, py + 5, hex('#f4ecdc')); if (w > 3) R.numero(String(i + 1), px, py + 4, { centro: true, color: hex('#2a2430') }); }
}
const c1 = (t) => {
  const abre = ease(tramo(t, A.sue - 0.5, A.sue + 0.1));
  const s = T.latveria(R, t, { encuadre: 'cuarto', camara: 'general', puerta: abre }), su = s.suelo ?? 158;
  calendario(164, 56, t);
  // Franklin juega con sus cubos, que flotan; el desconocido de espaldas lo mira
  ONDA = 0;
  for (let k = 0; k < 3; k++) { const an = t * 1.2 + k * 2.09; juguete([2, 0, 4][k], 246 + Math.cos(an) * 12, su - 22 + Math.sin(an) * 4 + Math.sin(t * 2 + k) * 2, t); chispa(246 + Math.round(Math.cos(an + 0.4) * 14), su - 18 + Math.round(Math.sin(an) * 4), t, k, hex('#9af0ff')); }
  desconocido(210, su, t, 0);
  T.PIEZAS_DO.franklin(R, 242, su + (Math.sin(t * 6) > 0.6 ? -1 : 0));
  // Sue entra por la puerta
  if (t > A.sue - 0.1) { const w = ease(tramo(t, A.sue, A.desconocido - 0.1)); const sx = Math.round(lerp(20, 60, w)), sy = Math.round(lerp(131, su, w));
    R.actor(EL.sue, sx, sy, t, { dir: 1, anda: w > 0 && w < 1, sonrisa: t < A.desconocido - 0.2, sorpresa: t > A.desconocido - 0.2 });
    if (t > A.desconocido && t < A.desconocido + 0.9) R.icono('!', sx + 4, sy - 40, hex('#ffd860'), K, 1); }
  T.latveriaDelante(R, t, { encuadre: 'cuarto', camara: 'general', puerta: abre });
};
const c2 = (t) => {
  const s = T.latveria(R, t, { encuadre: 'cuarto', camara: 'puerta', puerta: 0.92 }), su = s.suelo ?? 164;
  R.actor(EL.sue, 141, 145, t, { dir: -1, sorpresa: true, manos: t > A.mascara && t < A.mano + 0.4 });
  ONDA = 3 * tramo(t, A.capa - 0.2, A.capa + 0.3) * (1 - tramo(t, A.mascara, A.mascara + 1.2)) + 1;
  for (let k = 0; k < 6; k++) { const u = ((t * 0.5 + k / 6) % 1); if (t > A.capa - 0.2) R.pset(Math.round(lerp(140, 70, u)), Math.round(150 + Math.sin(u * 9 + k) * 6), mez(hex('#fff4c8'), hex('#5a4a3a'), u)); }
  for (let k = 0; k < 4; k++) { const an = t * 1.1 + k * 1.57; juguete([1, 3, 2, 0][k], 150 + Math.cos(an) * 16, su - 18 + Math.sin(an) * 5 + Math.sin(t * 2 + k) * 2, t); }
  T.PIEZAS_DO.franklin(R, 146, su + 4 + (Math.sin(t * 6) > 0.6 ? -1 : 0));
  const alza = ease(tramo(t, A.mascara - 0.3, A.mascara + 0.3));
  const ob = desconocido(96, su + 6, t, alza);
  if (t > A.mano - 0.1 && t < A.mano + 0.7) { const g = tramo(t, A.mano - 0.1, A.mano + 0.7), mx = ob.mano[0] + 2, my = ob.mano[1] + 2; for (let k = 0; k < 4; k++) { const r = 2 + g * 5; R.pset(mx + Math.round(Math.cos(k * 1.57) * r), my + Math.round(Math.sin(k * 1.57) * r), BLANCO); } R.pset(mx, my, BLANCO); }
  T.latveriaDelante(R, t, { encuadre: 'cuarto', camara: 'puerta', puerta: 0.92 });
};
// ── 3. los créditos (fondo local): la sala a oscuras con la pantalla ──
let bCred = null;
function fondoCreditos() {
  if (bCred) return bCred; bCred = R.nuevo(); const prev = R.usar(bCred);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 18 ? (bay(x, y) < 0.3 && (x + y) % 7 === 0 ? hex('#1e1a2a') : hex('#16121e')) : hex('#1a1622'));
  for (let x = 0; x < 320; x += 20) R.rect(x, 0, x, 17, hex('#221e2e'));
  // el marco de la pantalla y el telón rojo a los lados
  R.rect(16, 18, 232, 132, K); R.rect(18, 20, 230, 130, hex('#08080e'));
  for (const [x0, x1] of [[0, 16], [232, 252]]) for (let x = x0; x <= x1; x++) for (let y = 16; y < 140; y++) { const f = Math.sin((x - x0) * 0.9); R.pset(x, y, f > 0.55 ? hex('#c83a4a') : f > -0.2 ? hex('#a8283a') : f > -0.7 ? hex('#7a1a2a') : hex('#4a0e1a')); }
  for (let x = 0; x <= 252; x++) for (let y = 14; y < 20; y++) { if (x > 16 && x < 232 && y > 17) continue; R.pset(x, y, y === 19 ? hex('#4a0e1a') : (x + y) % 6 < 3 ? hex('#c83a4a') : hex('#a8283a')); }
  // la pared de la derecha: paneles de madera con vetas, la puerta de salida con su piloto verde y el aplique
  for (let y = 16; y < 140; y++) for (let x = 253; x < 320; x++) { const v = Math.sin(y * 0.3 + Math.sin(x * 0.7) * 2) > 0.85; R.pset(x, y, (x - 253) % 22 === 0 ? hex('#1a0e0a') : v ? hex('#4a2a1e') : hex('#3a2016')); }
  R.rect(262, 92, 300, 140, K); R.rect(263, 93, 299, 140, hex('#241a22')); R.rect(264, 118, 298, 120, hex('#8a94a8')); R.rect(264, 118, 298, 118, hex('#c8d0dc'));
  R.rect(270, 80, 292, 89, K); R.rect(271, 81, 291, 88, hex('#2ad06a'));
  { const x = 278, y = 81; for (const [i, j] of [[2, 0], [1, 1], [2, 1], [3, 1], [2, 2], [1, 3], [3, 3], [0, 4], [4, 4], [6, 2], [7, 2], [8, 2], [7, 1], [7, 3]]) R.pset(x + i, y + j + 1, BLANCO); }
  // las filas de butacas
  for (const [y0, alto, ancho, sep] of [[140, 16, 22, 4], [156, 24, 30, 5]]) { for (let x = -10; x < 330; x += ancho + sep) { const x1 = x + ancho;
      R.rect(x, y0 + 3, x1, y0 + alto + 10, K); R.disco(x + 4, y0 + 4, 4, K); R.disco(x1 - 4, y0 + 4, 4, K); R.rect(x + 1, y0 + 4, x1 - 1, y0 + alto + 10, hex('#8a1e2e')); R.disco(x + 4, y0 + 4, 3, hex('#8a1e2e')); R.disco(x1 - 4, y0 + 4, 3, hex('#8a1e2e')); R.rect(x + 4, y0 + 1, x1 - 4, y0 + 3, hex('#8a1e2e'));
      R.rect(x + 3, y0 + 2, x1 - 3, y0 + 2, hex('#c83a4a')); for (let j = y0 + 6; j < y0 + alto + 8; j += 3) R.rect(x + 3, j, x1 - 3, j, hex('#7a1626')); R.rect(x1 - 3, y0 + 4, x1 - 1, y0 + alto + 10, hex('#5a0e1a'));
      R.rect(x1 + 1, y0 + alto - 4, x1 + sep - 1, y0 + alto + 10, hex('#2a2430')); } }
  R.usar(prev); return bCred;
}
const CARAS = [['#4a3020', '#f6c290', 0], ['#f0d070', '#f6c290', 0], ['#f0c860', '#f6c290', 0], ['#e8823a', '#e8823a', 0], ['#6a3aa8', '#b89ad8', 1], ['#c8d0dc', '#e8eef4', 0], [null, null, 2], ['#f0d070', '#f6c290', 0], [null, null, 3], ['#4a3020', '#f6c290', 0]];
function cara(k, x, y, t, luz) {
  const [pelo, piel, tipo] = CARAS[k];
  for (let j = -1; j <= 9; j++) for (let i = -1; i <= 9; i++) R.pset(x + i, y + j, (i < 0 || j < 0 || i > 8 || j > 8) ? hex('#3a3646') : hex('#20202c'));
  if (tipo === 2) { for (let j = 1; j <= 8; j++) for (let i = 1; i <= 7; i++) { const e = ((i - 4) / 3.6) ** 2 + ((j - 5) / 4.4) ** 2; if (e < 1) R.pset(x + i, y + j, e > 0.55 ? hex('#2e7a3e') : hex('#0a0a10')); } return; }
  if (tipo === 3) { for (let i = 2; i <= 6; i++) for (let j = 3; j <= 7; j++) R.pset(x + i, y + j, hex('#f6c290')); for (let i = 1; i <= 7; i++) R.pset(x + i, y + 2, hex('#2a3a6a')); for (let i = 1; i <= 8; i++) R.pset(x + i, y + 3, i > 5 ? hex('#2a3a6a') : hex('#f6c290')); R.pset(x + 3, y + 5, K); R.pset(x + 5, y + 5, K); for (let i = 2; i <= 6; i++) R.pset(x + i, y + 7, hex('#8a8a8a')); return; }
  for (let i = 2; i <= 6; i++) for (let j = 3; j <= 7; j++) R.pset(x + i, y + j, hex(piel)); for (let i = 1; i <= 7; i++) R.pset(x + i, y + 2, hex(pelo)); R.pset(x + 1, y + 3, hex(pelo)); R.pset(x + 7, y + 3, hex(pelo));
  if (tipo === 1) { R.pset(x, y + 1, hex(pelo)); R.pset(x + 8, y + 1, hex(pelo)); R.pset(x, y, hex(pelo)); R.pset(x + 8, y, hex(pelo)); }
  R.pset(x + 3, y + 5, K); R.pset(x + 5, y + 5, K); R.pset(x + 4, y + 7, hex('#c86a5a'));
}
const c3 = (t) => {
  R.copiar(fondoCreditos());
  // el haz del proyector, por encima de las cabezas, con motas
  for (let y = 0; y < 136; y++) { const u = y / 136, xa = lerp(238, 60, u), xb = lerp(262, 222, u); for (let x = Math.ceil(xa); x <= xb; x++) if (!tranquila(x, y) && bay(x, y) < 0.1 + 0.05 * Math.sin(t * 2 + y * 0.1)) R.pset(x, y, mez(R.pget(x, y), hex('#e8e0ff'), 0.25)); }
  // los créditos que suben (recortados a la pantalla)
  R.recorte([20, 22, 228, 128]);
  const v = 10, y0 = -20.3 - (t - C3) * v;
  for (let y = 22; y <= 128; y++) for (let x = 20; x <= 228; x++) { const d = Math.hypot((x - 124) / 1.6, y - 74); if (bay(x, y) < 0.09 * (1 - d / 70) + (h(x, y, Math.floor(t * 12)) > 0.997 ? 1 : 0)) R.pset(x, y, hex('#2a2a3a')); }
  if (Math.floor(t * 3) % 4 === 0) { const sx = 40 + Math.floor(h(Math.floor(t * 3), 1) * 170); R.linea(sx, 22, sx + 2, 128, hex('#24242e')); }
  for (let i = 0; i < 10; i++) { const y = Math.round(y0 + i * 20); if (y < 8 || y > 132) continue; const luz = i === 9 && t > B.kevin;
    const lr = 26 + (i * 17) % 22; for (let x = 116 - lr; x < 116; x++) for (let j = 3; j <= 5; j++) R.pset(x, y + j, hex('#8a8a9e'));
    cara(i, 120, y, t, luz);
    if (i === 8) { for (let x = 136; x < 200; x++) if (x % 4 < 2) { R.pset(x, y + 2, hex('#8a8a9a')); R.pset(x, y + 7, hex('#8a8a9a')); } for (const xx of [136, 199]) for (let j = 2; j <= 7; j++) R.pset(xx, y + j, hex('#8a8a9a')); }
    else for (let x = 136; x < 136 + 40 + (i * 13) % 26; x++) for (let j = 2; j <= 6; j++) R.pset(x, y + j, luz ? (Math.sin(t * 8) > 0 ? hex('#ffd860') : hex('#fff2a0')) : (j === 2 ? BLANCO : hex('#e0e0ea')));
    if (luz) for (let k = 0; k < 7; k++) chispa(132 + k * 12, y + 1 + (k % 2) * 7, t, k, hex('#fff2a0')); }
  R.recorte(null);
  if (t > B.listado) { const y = Math.round(y0 + 8 * 20), e = Math.min(1, (t - B.listado) * 6); R.icono('?', 160, y - 3 - Math.round((1 - e) * 4), hex('#ffd860'), K, 2); }
  // el público: cabezas a contraluz, y las palomitas, que buscan y se dan la vuelta
  for (const [x, y] of [[24, 140], [78, 141], [134, 139], [214, 140], [300, 141]]) { R.disco(x, y, 6, hex('#0e0c14')); R.rect(x - 7, y + 4, x + 7, y + 10, hex('#0e0c14')); R.rect(x - 3, y - 6, x + 3, y - 6, hex('#5a5a7a')); }
  const gira = t > B.listado;
  T.palomitas(R, 186, 166, t, { espalda: !gira, dir: -1, expresion: gira && t < B.kevin ? 'susto' : 'normal', señala: t > B.kevin + 0.3 ? [150, Math.round(y0 + 9 * 20 + 6)] : undefined });
  for (let k = 0; k < 6; k++) R.pset(30 + k * 54, 177, Math.sin(t * 2 + k) > 0 ? hex('#ffb83a') : hex('#8a5a1a'));
};
// ── 4. el escenario (fondo local): Feige señala la flecha de la máscara al cartel ──
let bEsc = null;
function fondoEscenario() {
  if (bEsc) return bEsc; bEsc = R.nuevo(); const prev = R.usar(bEsc);
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const f = Math.sin(x * 0.42 + Math.sin(y * 0.03) * 0.6); R.pset(x, y, y < 20 ? hex('#0e1020') : f > 0.6 ? hex('#3a4a8a') : f > 0 ? hex('#2a3670') : f > -0.6 ? hex('#1e2856') : hex('#141c3e')); }
  for (let x = 0; x < 320; x++) for (let y = 20; y < 26; y++) R.pset(x, y, (x + y) % 8 < 4 ? hex('#4a5aa8') : hex('#3a4a8a'));
  // la celosía de focos (lejos de Atom)
  R.rect(0, 20, 262, 20, hex('#5a6070')); R.rect(0, 25, 262, 25, hex('#5a6070')); for (let x = 0; x < 262; x += 6) R.linea(x, 20, x + 5, 25, hex('#5a6070'));
  // la pantalla grande: marco y dos paneles
  R.rect(110, 28, 266, 114, K); R.rect(112, 30, 264, 112, hex('#2a2e3e')); R.rect(114, 32, 184, 110, hex('#0e2016')); R.rect(194, 32, 262, 110, hex('#0a0a12'));
  for (let y = 32; y <= 110; y++) for (let x = 114; x <= 184; x++) if (bay(x, y) < 0.12 + 0.1 * (1 - Math.hypot(x - 149, y - 70) / 50)) R.pset(x, y, hex('#1e4a2e'));
  // el cartel del 2026: relámpagos verdes, la silueta con capucha y la fecha
  for (let y = 32; y <= 110; y++) for (let x = 194; x <= 262; x++) if (bay(x, y) < 0.25 * (1 - (y - 32) / 90)) R.pset(x, y, hex('#1a3a22'));
  for (const [x0, k] of [[204, 1], [250, 2]]) { let x = x0, y = 32; while (y < 70) { const nx = x + (h(y, k) - 0.5) * 8, ny = y + 5; R.linea(x, y, nx, ny, hex('#5aff8a')); x = nx; y = ny; } }
  R.disco(228, 64, 15, K); R.disco(228, 64, 14, hex('#1e5a2a')); R.rect(214, 64, 242, 96, K); R.rect(215, 64, 241, 96, hex('#1e5a2a')); for (let j = 66; j < 96; j += 4) R.linea(216 + (j % 8), j, 218 + (j % 8), j + 3, hex('#2e7a3e'));
  R.rect(221, 58, 235, 74, hex('#8c90a4')); R.rect(221, 58, 235, 59, hex('#c8ccd8')); R.rect(223, 63, 226, 64, K); R.rect(230, 63, 233, 64, K); R.rect(227, 64, 229, 69, hex('#6a6e80')); for (let i = 222; i < 235; i += 2) R.pset(i, 71, K);
  R.numero('2026', 228, 107, { centro: true });
  // el suelo del escenario: tablas con vetas y su brillo; el borde con luces
  for (let y = 114; y < 150; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y - 114) / 6), veta = Math.sin(x * 0.08 + tabla * 2 + Math.sin(x * 0.3) * 0.5) > 0.8; R.pset(x, y, (y - 114) % 6 === 5 ? hex('#3a2416') : veta ? hex('#6a4428') : tabla % 2 ? hex('#8a5a34') : hex('#7a4e2c')); }
  R.rect(0, 150, 319, 154, K); R.rect(0, 151, 319, 152, hex('#2a2430'));
  for (let y = 155; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hex('#0e0c14'));
  R.usar(prev); return bEsc;
}
const c4 = (t) => {
  R.copiar(fondoEscenario());
  // dos focos que barren el escenario
  for (const [fx, fase] of [[60, 0], [200, 2]]) { const cx = 150 + Math.sin(t * 0.7 + fase) * 90; R.rect(fx - 3, 26, fx + 3, 31, K); R.rect(fx - 2, 27, fx + 2, 30, hex('#5a6070'));
    for (let y = 32; y < 150; y++) { const u = (y - 32) / 118, xa = lerp(fx - 2, cx - 26, u), xb = lerp(fx + 2, cx + 26, u); for (let x = Math.ceil(xa); x <= xb; x++) if (!tranquila(x, y) && bay(x, y) < 0.16) R.pset(x, y, mez(R.pget(x, y), hex('#fff4c8'), 0.35)); } }
  // la máscara en la pantalla, que brilla
  T.e_mascara(R, 149, 70, 3, { capucha: true, brillo: (t * 0.4) % 1, ojos: 0.5 + 0.5 * Math.sin(t * 3) });
  // la flecha dorada de la máscara al cartel
  const fl = tramo(t, B.lleva - 0.1, B.doomsday - 0.1);
  if (fl > 0) { const P = (u) => [lerp(166, 210, u), 50 - Math.sin(u * Math.PI) * 18]; const n = Math.round(fl * 50);
    for (let i = 0; i <= n; i++) { const [x, y] = P(i / 50); R.disco(x, y, 2.6, K); } for (let i = 0; i <= n; i++) { const [x, y] = P(i / 50); R.disco(x, y, 1.6, hex('#ffd860')); R.pset(x, y - 1, hex('#fff2a0')); }
    if (fl > 0.9) { const [x, y] = P(1); R.poligono([[x - 4, y - 7], [x + 6, y + 2], [x - 6, y + 4]], K); R.poligono([[x - 3, y - 5], [x + 4, y + 2], [x - 4, y + 3]], hex('#ffd860')); } }
  if (t > B.doomsday && t < B.doomsday + 0.8 && Math.floor(t * 10) % 2 === 0) for (let x = 194; x <= 262; x++) { R.pset(x, 32, BLANCO); R.pset(x, 110, BLANCO); }
  // el atril con su micrófono (sin letras), a la izquierda
  R.rect(28, 118, 48, 148, K); R.rect(29, 119, 47, 147, hex('#3a3e52')); R.rect(29, 119, 47, 121, hex('#6a7090')); R.rect(31, 124, 45, 140, hex('#2a2e40')); estrella5(38, 131, 4, hex('#8a94b8'));
  R.linea(44, 118, 50, 110, hex('#9aa4b4')); R.disco(51, 109, 1.6, K); if (Math.floor(t * 2) % 2) R.pset(47, 117, hex('#ff3a3a'));
  // Feige entra, saluda, habla y señala
  const w = ease(tramo(t, C4 + 0.05, B.marvel + 0.8)), fx = Math.round(lerp(-14, 70, w));
  for (let y = 136; y < 150; y++) for (let x = fx - 10; x < fx + 26; x++) { const e = ((x - fx - 7) / 18) ** 2 + ((y - 145) / 5) ** 2; if (e < 1 && bay(x, y) < 0.5) R.pset(x, y, mez(R.pget(x, y), hex('#fff4c8'), 0.4)); }
  R.actor(EL.feige, fx, 146, t, { dir: 1, anda: w > 0 && w < 1, brazos: w >= 1 && t < B.dicho, habla: t > B.dicho && t < B.lleva && Math.sin(t * 8) > 0, dedo: t > B.lleva - 0.1, sonrisa: true });
  // el público, a contraluz, con móviles que hacen fotos
  for (let k = 0; k < 16; k++) { const x = 8 + k * 20 + (k % 2) * 6, y = 166 + (k % 3) * 4 + (Math.sin(t * 3 + k) > 0.8 ? -1 : 0); R.disco(x, y, 6.6, hex('#0a0810')); R.disco(x, y, 6, hex('#262236')); R.rect(x - 8, y + 4, x + 8, 180, hex('#262236')); R.linea(x - 8, y + 4, x - 8, 180, hex('#0a0810')); R.rect(x - 3, y - 6, x + 3, y - 6, hex('#7a7aa8')); R.pset(x - 4, y - 5, hex('#5a5a88')); R.pset(x + 4, y - 5, hex('#5a5a88')); R.rect(x - 7, y + 4, x - 4, y + 4, hex('#5a5a88'));
    if (k % 3 === 1) { const ph = x + 6, py = y - 12, fl2 = (t > B.doomsday && t < B.doomsday + 1 && h(k, Math.floor(t * 8)) > 0.5) || h(k, Math.floor(t * 2)) > 0.93; R.rect(ph - 1, py, ph + 3, py + 6, K); R.rect(ph, py + 1, ph + 2, py + 5, fl2 ? BLANCO : hex('#4a8ae8')); if (fl2) { R.pset(ph + 1, py - 2, BLANCO); R.pset(ph - 2, py + 3, BLANCO); R.pset(ph + 4, py + 3, BLANCO); } } }
};
const efectos = [[A.cuatro, 'papel'], [A.sue - 0.5, 'puerta'], [A.desconocido, 'aviso'], [C2 + 0.4, 'tic'], [A.capa, 'viento'], [A.mascara, 'brillo'],
  [C3 + 0.3, 'maquina'], [B.listado, 'pop'], [B.kevin, 'brillo'], [C4 + 0.3, 'publico'], [B.lleva, 'whoosh'], [B.doomsday, 'boom'], [B.doomsday + 0.3, 'flash']];
T.rodar(E, R, [[0, c1], [C2, c2], [C3, c3], [C4, c4]], { efectos, año: 2025 });
''')
