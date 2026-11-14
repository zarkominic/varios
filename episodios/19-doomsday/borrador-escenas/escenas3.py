# Borrador de escenas del ep19, grupo S3: do-tva, do-poda, do-loki (con el movimiento ya hecho).
E = {}

# ayudas comunes (se pegan al principio de cada cuerpo)
AY = r'''
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const KK = hex('#1a1014'), BL = 0xffffffff;
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const BUF = {};
const bufer = (clave, dibuja) => { if (!BUF[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); BUF[clave] = b; } return BUF[clave]; };
const fondo = (clave, dibuja) => R.copiar(bufer(clave, dibuja));
const rampa = (x0, y0, x1, y1, cols) => { const n = cols.length - 1; for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i; for (let x = x0; x <= x1; x++) R.pset(x, y, cols[f > bay(x, y) ? i + 1 : i]); } };
const caja = (x0, y0, x1, y1, c, cl, cs) => { R.rect(x0, y0, x1, y1, KK); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, cl); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, cl); R.rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, cs); R.rect(x1 - 1, y0 + 1, x1 - 1, y1 - 1, cs); };
// aclara u oscurece por tramado lo que ya hay (luz de lámpara, sombra)
const tinta = (x0, y0, x1, y1, col, a, cx = null, cy = null, r = 0) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { let g = a; if (cx !== null) g *= Math.max(0, 1 - Math.hypot(x - cx, (y - cy) * 1.4) / r); if (g > bay(x, y)) R.pset(x, y, mez(R.pget(x, y), col, 0.35)); } };
const nubeT = (cx, cy, w, s, b, l) => { const bolas = [[0, 0, w * 0.3], [-w * 0.3, w * 0.07, w * 0.22], [w * 0.28, w * 0.06, w * 0.24], [-w * 0.1, -w * 0.12, w * 0.24]];
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx), Math.round(cy + dy + 1), Math.round(r), s);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx), Math.round(cy + dy - 1), Math.round(r * 0.9), b);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx - 1), Math.round(cy + dy - 2 - r * 0.2), Math.round(r * 0.5), l); };
const ave = (x, y, t, k, c) => { const a = Math.sin(t * 8 + k) > 0 ? 1 : 0; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x - 2, y - 1 - a, c); R.pset(x + 1, y - a, c); R.pset(x + 2, y - 1 - a, c); };
// línea gruesa con borde (w: medio grosor)
const trazo = (pts, c, w = 1, borde = KK) => { for (const [cc, ww] of [[borde, w + 1], [c, w]]) { if (cc == null) continue; for (let k = 1; k < pts.length; k++) { const [x0, y0] = pts[k - 1], [x1, y1] = pts[k], n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0))); for (let i = 0; i <= n; i++) R.disco(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, ww, cc); } } };
// curva de Bézier cuadrática en n puntos
const bez = (a, b, c, n = 16, u1 = 1) => { const p = []; for (let i = 0; i <= n; i++) { const u = i / n * u1; p.push([(1 - u) * (1 - u) * a[0] + 2 * u * (1 - u) * b[0] + u * u * c[0], (1 - u) * (1 - u) * a[1] + 2 * u * (1 - u) * b[1] + u * u * c[1]]); } return p; };
// el mundito de la punta de una rama: disco con continentes que giran, luz arriba a la izquierda, contorno y brillo
const mundito = (cx, cy, r, mar, tierra, t, k = 0) => {
  const ml = mez(mar, BL, 0.3), ms = mez(mar, KK, 0.4), tl = mez(tierra, BL, 0.3);
  R.disco(cx, cy, r + 1, KK);
  R.disco(cx, cy, r, (x, y, d) => { const lx = x - cx, ly = y - cy, g = hh(Math.floor((lx + t * 3 + k * 7) / 2), Math.floor(ly / 2), k) > 0.55; const luz = (lx + ly) / r; return g ? (luz < -0.4 ? tl : luz > 0.5 ? mez(tierra, KK, 0.35) : tierra) : (luz < -0.5 ? ml : luz > 0.45 ? ms : mar); });
  R.pset(Math.round(cx - r * 0.45), Math.round(cy - r * 0.5), BL);
};
// el vacío del fin del tiempo (morado, con nebulosa tramada, estrellas de tres tamaños e hilos dorados lejanos), en búfer
const VAC = ['#07040f', '#100822', '#1a0c32', '#261244', '#341a58'].map(hex);
const pintaVacio = (semilla, hilos = true) => {
  rampa(0, 0, 319, 179, VAC);
  for (const [cx, cy, r, c] of [[70, 60, 70, '#6a2a8a'], [250, 120, 80, '#2a3a8a'], [170, 30, 60, '#8a3a7a'], [20, 160, 50, '#3a2a7a']]) {
    const col = hex(c); for (let y = Math.max(0, cy - r); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, cx - r); x <= Math.min(319, cx + r); x++) { const g = (1 - Math.hypot(x - cx, (y - cy) * 1.5) / r) * (0.55 + 0.45 * hh(x >> 3, y >> 3, semilla)); if (g * 0.9 > bay(x, y) + 0.12) R.pset(x, y, mez(R.pget(x, y), col, 0.45)); } }
  for (let i = 0; i < 260; i++) { const x = Math.floor(hh(i, 1, semilla) * 320), y = Math.floor(hh(i, 2, semilla) * 180), b = hh(i, 3, semilla); R.pset(x, y, b > 0.9 ? BL : b > 0.6 ? hex('#b8a8e0') : hex('#5a4a8a')); if (b > 0.97) { R.pset(x + 1, y, hex('#8a7ac0')); R.pset(x - 1, y, hex('#8a7ac0')); R.pset(x, y + 1, hex('#8a7ac0')); R.pset(x, y - 1, hex('#8a7ac0')); } }
  if (hilos) for (let k = 0; k < 4; k++) { const y0 = 30 + k * 38 + hh(k, 5, semilla) * 10; for (let x = 0; x < 320; x++) { const y = y0 + Math.sin(x * 0.02 + k * 2) * 8 + Math.sin(x * 0.053 + k) * 3; if ((x + k) % 3) R.pset(x, Math.round(y), mez(R.pget(x, Math.round(y)), hex('#c8a040'), 0.35)); } }
};
// vida del vacío: estrellas que titilan y motas doradas que suben
const vidaVacio = (t, semilla, n = 26, zona = [0, 0, 319, 179]) => {
  for (let i = 0; i < n; i++) { const x = Math.floor(hh(i, 7, semilla) * 320), y = Math.floor(hh(i, 8, semilla) * 180); if (x < zona[0] || x > zona[2] || y < zona[1] || y > zona[3]) continue; if (x > 272 && y < 48) continue; const f = Math.sin(t * (2 + hh(i, 9) * 3) + i); if (f > 0.6) { R.pset(x, y, BL); R.pset(x + 1, y, hex('#d8c8ff')); R.pset(x - 1, y, hex('#d8c8ff')); R.pset(x, y - 1, hex('#d8c8ff')); R.pset(x, y + 1, hex('#d8c8ff')); } }
  for (let i = 0; i < 18; i++) { const x = Math.round(hh(i, 11, semilla) * 320 + Math.sin(t * 0.7 + i) * 6), y = Math.round(180 - ((t * (5 + hh(i, 12) * 8) + hh(i, 13) * 180) % 190)); if (x > 272 && y < 48) continue; R.pset(x, y, i % 3 ? hex('#f0c860') : hex('#fff0b0')); }
};
// tijeras de podar (largas, de jardín) en la mano (x, y): mangos de madera hacia atrás, hojas hacia dir; abre 0–1
const tijeras = (x, y, dir, abre) => {
  const a = 0.08 + abre * 0.42;
  for (const s of [-1, 1]) {
    const ang = s * a, cx = Math.cos(ang) * dir, cy = Math.sin(ang);
    trazo([[x - cx * 7, y - cy * 7 + 1], [x, y]], hex('#8a4a24'), 0.6);           // mango
    R.pset(Math.round(x - cx * 7), Math.round(y - cy * 7 + 1), hex('#c83a2a'));
    trazo([[x, y], [x + cx * 12, y + cy * 12]], hex('#c8d0d8'), 0.5);              // hoja
    R.pset(Math.round(x + cx * 6), Math.round(y + cy * 6) - 1, BL);
  }
  R.pset(Math.round(x), Math.round(y), hex('#e8b830'));
};
// la lupa en la mano (x, y): mango y aro con el cristal que brilla
const lupa = (x, y, dir) => { trazo([[x, y], [x + 4 * dir, y - 4]], hex('#6a3a1a'), 0.6); R.disco(x + 8 * dir, y - 8, 5, KK); R.disco(x + 8 * dir, y - 8, 4, hex('#c8a040')); R.disco(x + 8 * dir, y - 8, 3, hex('#a8e8d8')); R.pset(x + 7 * dir, y - 10, BL); R.pset(x + 6 * dir, y - 9, BL); };
// la carpeta de papel manila
const carpeta = (x, y) => { caja(x - 5, y - 3, x + 5, y + 4, hex('#e0b860'), hex('#f8dc90'), hex('#a8803a')); R.rect(x - 4, y - 4, x - 1, y - 3, hex('#e0b860')); R.pset(x - 3, y + 1, hex('#a8803a')); R.rect(x - 2, y + 1, x + 3, y + 1, hex('#a8803a')); };
// la puerta de luz naranja de los agentes (cx centro, suelo, a 0–1 abierta)
const puertaLuz = (cx, suelo, a, t) => {
  if (a <= 0) return; const w = Math.max(1, Math.round(10 * a)), h = 40;
  for (let r = 3; r >= 1; r--) for (let y = suelo - h - r * 2; y <= suelo; y++) for (let x = cx - w - r * 2; x <= cx + w + r * 2; x++) if ((r === 3 ? 0.3 : r === 2 ? 0.55 : 0.8) > bay(x, y)) R.pset(x, y, mez(R.pget(x, y), hex('#ffb040'), 0.5));
  R.rect(cx - w, suelo - h, cx + w, suelo, hex('#ffd890')); R.rect(cx - w + 2, suelo - h + 2, cx + w - 2, suelo - 1, hex('#fff6d8'));
  R.rect(cx - w - 1, suelo - h - 1, cx + w + 1, suelo - h - 1, hex('#f08a2a')); R.rect(cx - w - 1, suelo - h, cx - w - 1, suelo, hex('#f08a2a')); R.rect(cx + w + 1, suelo - h, cx + w + 1, suelo, hex('#f08a2a'));
  for (let k = 0; k < 6; k++) { const yy = suelo - ((t * 30 + k * 7) % h); R.pset(cx - w - 2 - (k % 2), Math.round(yy), hex('#ffe0a0')); R.pset(cx + w + 2 + (k % 2), Math.round(h - yy + suelo - h), hex('#ffe0a0')); }
};
'''

# =====================================================================================================================
E['do-tva'] = ('La oficina del tiempo', '''// DO-TVA (frases 15–16), cartela «2021». Cuatro planos:
// 1. (fondo local) el desierto al mediodía: Loki se sale del camino dorado con el cubo azul; de una puerta de luz sale un
//    agente con corbata y le señala: «alto» (corta en «branches»);
// 2. (fondo local) la mesa de la oficina de cerca: la máquina de escribir, la bandeja, la lámpara verde; cae una cápsula
//    por el tubo; la mano moja el sello y, en «office», sella el papel con un reloj rojo;
// 3. la oficina general: el agente trae a Loki por la alfombra, Loki mira asombrado a todos lados; Mobius llega con la
//    carpeta y, en «clocks», señala el gran reloj;
// 4. la consola de pantalla verde: Mobius saca una carpeta del archivador («filing cabinets»), cae una cápsula en la
//    bandeja («tubes») y el agente de la lupa vigila la única línea dorada; en «sacred» la recorre un brillo.''', AY + r'''
const a = (f) => en('oficina', f), b = (f) => en('sagrada', f);
const P2 = a(0.43), P3 = b(0), P4 = b(0.468);
const puerta = 3.0, alto = a(0.33), officeT = en('oficina', 0.935), relojT = b(0.39), cajonT = b(0.47), tuboT = b(0.58), vigila = b(0.675), sagradaT = b(0.895);
// ── 1 · el desierto ──
const DES = () => {
  rampa(0, 0, 319, 112, ['#3d74c4', '#4c82cc', '#6496d4', '#82aedc', '#a6c4e2', '#cad8e0', '#e6dcc0'].map(hex));
  for (let k = 0; k < 4; k++) R.disco(226, 30, 14 - k * 2, [hex('#c8dcec'), hex('#e8ecd8'), hex('#fff4c8'), hex('#fffbe8')][k]);
  // la sierra lejana, azulada, con nieve en las cumbres
  for (let x = 0; x < 320; x++) { const h = 96 - Math.abs(Math.sin(x * 0.031) * 12) - Math.abs(Math.sin(x * 0.083 + 1) * 6) - (x > 120 && x < 200 ? 6 : 0); for (let y = Math.round(h); y <= 136; y++) R.pset(x, y, y < h + 2 && h < 86 ? hex('#e8eaf2') : (x + y) % 7 === 0 ? hex('#8a8ab0') : hex('#9a9cbc')); if (hh(x, 1) > 0.6) R.pset(x, Math.round(h) + 3, hex('#7a7aa0')); }
  // las dunas en tres términos, con su sombra a sotavento
  const duna = (y0, amp, f, f2, c, cs, cl, k) => { for (let x = 0; x < 320; x++) { const y = Math.round(y0 - Math.abs(Math.sin(x * f + k)) * amp - Math.sin(x * f2) * 3), dy = Math.cos(x * f + k) * Math.sign(Math.sin(x * f + k)); for (let yy = y; yy < 180; yy++) R.pset(x, yy, dy < -0.2 ? cs : yy === y ? cl : c); } };
  duna(118, 10, 0.024, 0.07, hex('#d8a868'), hex('#b88450'), hex('#f0c890'), 0.4);
  duna(132, 9, 0.019, 0.05, hex('#e2ac60'), hex('#c08848'), hex('#f6d098'), 2.1);
  // la arena de cerca: rizos del viento, granos y piedrecitas
  for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) { const r = Math.sin(x * 0.18 + Math.sin(y * 0.6) * 2 + y * 0.9); R.pset(x, y, r > 0.82 ? hex('#c89048') : r < -0.9 ? hex('#f8d8a0') : hh(x, y, 4) > 0.97 ? hex('#a87038') : hex('#eab468')); }
  for (let k = 0; k < 40; k++) { const x = Math.floor(hh(k, 21) * 320), y = 120 + Math.floor(hh(k, 22) * 58); R.pset(x, y, hex('#9a6a3a')); }
  // rocas y matas secas (saxaul)
  for (const [x, y, w] of [[16, 168, 16], [290, 172, 22], [250, 138, 9], [60, 134, 7]]) { R.disco(x, y, w / 2, KK); R.disco(x, y, w / 2 - 1, hex('#8a6a5a')); R.disco(x - 2, y - 2, w / 2 - 3, hex('#b0907a')); R.rect(x - w / 2, y + 1, x + w / 2, y + 2, hex('#c08848')); }
  for (const [x, y] of [[40, 160], [270, 152], [120, 170], [200, 132]]) for (let k = 0; k < 7; k++) R.linea(x, y, x + Math.round(Math.cos(-0.4 - k * 0.38) * 7), y + Math.round(Math.sin(-0.4 - k * 0.38) * 6), k % 2 ? hex('#7a5a30') : hex('#a08048'));
};
const camello = (x, y, t) => { const p = Math.floor(t * 3) % 2, c = hex('#7a5038'); R.rect(x, y, x + 9, y + 3, c); R.rect(x + 2, y - 2, x + 3, y, c); R.rect(x + 6, y - 2, x + 7, y, c); R.rect(x + 10, y - 3, x + 11, y + 1, c); R.rect(x + 11, y - 4, x + 13, y - 3, c); for (const [i, d] of [[1, p], [3, 1 - p], [7, p], [8, 1 - p]]) R.rect(x + i, y + 4, x + i, y + 7 - d, c); };
const p1 = (t) => {
  fondo('desierto', DES);
  // nubes de tres tonos a tres velocidades y pájaros
  nubeT(40 + t * 3, 40, 34, hex('#9cb0cc'), hex('#dfe8f2'), BL); nubeT(150 + t * 5, 58, 26, hex('#a8bcd4'), hex('#e6eef6'), BL); nubeT(268 - t * 2, 68, 30, hex('#b4c4d8'), hex('#ecf0f6'), BL);
  for (let k = 0; k < 3; k++) ave(Math.round(90 + t * 9 + k * 9), 48 + (k % 2) * 3, t, k, hex('#3a4a6a'));
  // la calima sobre las dunas
  for (let k = 0; k < 16; k++) { const x = (k * 23 + Math.floor(t * 14)) % 320, y = 108 + (k % 3); R.pset(x, y, hex('#f0dcb8')); R.pset(x + 1, y, hex('#f0dcb8')); }
  camello(Math.round(300 - t * 6), 114, t); camello(Math.round(318 - t * 6), 115, t + 0.3);
  // el camino dorado del tiempo y la rama roja que se sale de él
  for (let x = 0; x < 320; x++) { const y = 160 + Math.round(Math.sin(x * 0.02) * 2); R.pset(x, y, hex('#a87018')); R.pset(x, y - 1, hex('#ffd860')); R.pset(x, y - 2, hex('#fff2b0')); if (((x - t * 40) % 40 + 40) % 40 < 3) { R.pset(x, y - 1, BL); R.pset(x, y - 3, hex('#fff2b0')); } }
  const rama = tramo(t, 0.3, 2.6), pts = bez([150, 159], [186, 158], [214, 149], 18, Math.max(0.05, rama));
  trazo(pts, hex('#ff6a3a'), 1, hex('#8a2a1a')); trazo(pts, hex('#ffc0a0'), 0, null); if (rama > 0) { const [x, y] = pts[pts.length - 1]; R.disco(x, y, 2, hex('#ffb08a')); }
  // Loki se sale del camino con el cubo azul que brilla
  const lx = Math.round(lerp(176, 206, rama)), sorp = t > puerta + 0.2;
  const L = R.actor(EL.loki, lx, 149, t, { dir: sorp ? -1 : 1, anda: rama > 0 && rama < 1, sostiene: true, sorpresa: sorp && t < alto + 0.6, enfado: t > alto + 0.6 });
  const [mx, my] = L.mano; for (let k = 0; k < 3; k++) R.anillo(mx, my - 2, 4 + k + Math.sin(t * 6) * 0.6, k ? hex('#3a8ae8') : hex('#a8e0ff'), 2);
  caja(mx - 3, my - 5, mx + 3, my + 1, hex('#3a8ae8'), hex('#c8f0ff'), hex('#1a4aa8'));
  // la puerta de luz y los agentes
  const ab = tramo(t, puerta, puerta + 0.5) - tramo(t, E.duracion - 0.5, E.duracion);
  puertaLuz(102, 156, ab, t);
  const ag = tramo(t, puerta + 0.5, alto - 0.2), ax = Math.round(lerp(95, 128, ag));
  if (t > puerta + 0.5) R.actor(EL.agenteTVA, ax, 156, t, { dir: 1, anda: ag > 0 && ag < 1, dedo: t > alto, habla: t > alto && t < alto + 1 });
  if (t > alto + 0.3) R.actor(EL.agenteTVA, 95, 156, t, { dir: 1, sostiene: true, pal: { C: hex('#5a4a3a') } });
  if (t > alto && t < alto + 1.2) R.bocadillo(ax + 12, 122, { icono: '!' });
};
// ── 2 · la mesa de la oficina de cerca ──
const MESA = () => {
  // la pared: papel pintado de los setenta (círculos naranjas sobre crema) a la izquierda, pared lisa con la luz arriba a la derecha
  for (let y = 0; y < 72; y++) for (let x = 0; x < 320; x++) { const cx = (x % 16) - 8, cy = (y % 16) - 8, d = Math.hypot(cx, cy); R.pset(x, y, x > 262 ? (y < 40 ? hex('#d8c4a0') : hex('#cdb894')) : d > 5 && d < 7 ? hex('#d8783a') : d < 3 ? hex('#c86a2a') : (x + y) % 9 ? hex('#eedcb4') : hex('#e2cfa6')); }
  rampa(262, 0, 319, 71, ['#e8d8b8', '#dcc8a4', '#cdb894', '#c4ae8a'].map(hex)); R.rect(262, 0, 263, 71, hex('#8a5a30'));
  // el friso de madera con cuarterones
  R.rect(0, 72, 319, 104, hex('#7a4a24')); R.rect(0, 72, 319, 73, hex('#a06a3a'));
  for (let x = 4; x < 320; x += 40) { caja(x, 77, x + 34, 101, hex('#6a3e1e'), hex('#8a5a30'), hex('#4a2a14')); for (let y = 80; y < 99; y += 3) R.linea(x + 4, y, x + 30, y + (y % 2), hex('#74441f')); }
  // el tablero de la mesa, en perspectiva, con vetas y el canto
  for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.3 + x * 0.01) * 2 + y * 0.6); R.pset(x, y, v > 0.85 ? hex('#5a3418') : v > 0.4 ? hex('#7a4a24') : hex('#8a5a30')); }
  R.rect(0, 104, 319, 105, hex('#b07a44')); R.rect(0, 106, 319, 106, hex('#4a2a14'));
  // el reloj de pared (la aguja va viva)
  R.disco(100, 38, 15, KK); R.disco(100, 38, 14, hex('#b07a3a')); R.disco(100, 38, 12, hex('#f6efdc')); for (let k = 0; k < 12; k++) R.pset(Math.round(100 + Math.cos(k * Math.PI / 6) * 10), Math.round(38 + Math.sin(k * Math.PI / 6) * 10), KK);
  // el corcho con papeles sin letras (rayas), fotos y una chincheta roja
  caja(140, 18, 236, 64, hex('#c8965a'), hex('#e0b07a'), hex('#9a6a3a')); for (let k = 0; k < 60; k++) R.pset(142 + Math.floor(hh(k, 31) * 92), 20 + Math.floor(hh(k, 32) * 42), hex('#a87a44'));
  for (const [x, y, w, h, c] of [[146, 24, 22, 28, '#f6f2e6'], [172, 22, 18, 22, '#f8e890'], [194, 26, 24, 30, '#f6f2e6'], [222, 22, 10, 14, '#a8c8e8'], [172, 48, 26, 12, '#f0d0d8']]) { caja(x, y, x + w, y + h, hex(c), BL, mez(hex(c), KK, 0.2)); for (let yy = y + 4; yy < y + h - 2; yy += 3) R.linea(x + 3, yy, x + w - 3 - (yy % 5), yy, hex('#8a8a9a')); R.pset(x + w / 2, y + 1, hex('#d82a2a')); }
  // el tubo neumático de latón que baja a su estación, con su ventanilla y la bandeja
  R.rect(6, 0, 16, 60, KK); R.rect(7, 0, 15, 60, hex('#c8a040')); R.rect(8, 0, 9, 60, hex('#f0d890')); R.rect(13, 0, 14, 60, hex('#8a6a20')); for (const y of [20, 40]) R.rect(5, y, 17, y + 3, hex('#8a6a20'));
  caja(-2, 58, 30, 96, hex('#b08a3a'), hex('#e0c070'), hex('#7a5a20')); caja(3, 64, 25, 82, hex('#2a3a3a'), hex('#4a6a6a'), hex('#1a2424')); R.linea(5, 66, 9, 66, hex('#9adada'));
  caja(0, 92, 30, 98, hex('#7a5a20'), hex('#a8883a'), hex('#4a3410'));
  // la máquina de escribir de color mostaza, con el papel, el rodillo y tres filas de teclas
  R.poligono([[64, 120], [150, 120], [142, 92], [72, 92]], KK); R.poligono([[66, 119], [148, 119], [141, 94], [73, 94]], hex('#c8a040'));
  R.rect(70, 82, 146, 92, KK); R.rect(71, 83, 145, 91, hex('#3a3a3a')); R.rect(72, 84, 144, 85, hex('#6a6a6a')); R.disco(66, 87, 4, KK); R.disco(66, 87, 3, hex('#3a3a3a')); R.disco(150, 87, 4, KK); R.disco(150, 87, 3, hex('#3a3a3a'));
  caja(84, 50, 132, 84, hex('#f8f6ee'), BL, hex('#d8d4c8')); for (let y = 56; y < 80; y += 4) R.linea(88, y, 128 - (y * 7) % 13, y, hex('#5a5a6a'));
  for (let f = 0; f < 3; f++) for (let k = 0; k < 10 - f; k++) { const x = 78 + f * 3 + k * 6.5, y = 98 + f * 6; R.disco(x, y, 2, KK); R.pset(x, y, hex('#e8e0c8')); R.pset(x - 1, y - 1, BL); }
  R.rect(90, 116, 124, 117, KK); R.rect(90, 115, 124, 115, hex('#e0d0a0'));
  // la lámpara verde de banquero y su luz cálida
  caja(236, 70, 274, 82, hex('#2a7a4a'), hex('#5ab07a'), hex('#1a4a2a')); R.rect(253, 82, 256, 100, hex('#c8a040')); caja(240, 98, 270, 104, hex('#c8a040'), hex('#f0d890'), hex('#8a6a20'));
  tinta(150, 84, 319, 179, hex('#ffe8a0'), 0.9, 255, 120, 90);
  // la bandeja de papeles, la almohadilla de tinta, el teléfono naranja y el papel donde va el sello
  caja(276, 108, 316, 126, hex('#8a6a3a'), hex('#b08a50'), hex('#5a4020')); for (let k = 0; k < 4; k++) R.rect(280 - k, 104 + k * 1.5, 312 - k, 105 + k * 1.5, k % 2 ? hex('#f6f2e6') : hex('#e8e4d8'));
  caja(218, 140, 244, 152, hex('#3a2a2a'), hex('#5a4a4a'), hex('#1a1010')); R.rect(221, 143, 241, 149, hex('#a8283a'));
  caja(252, 132, 296, 156, hex('#d8783a'), hex('#f0a060'), hex('#a84a1a')); R.disco(274, 140, 7, KK); R.disco(274, 140, 6, hex('#f6efdc')); for (let k = 0; k < 8; k++) R.pset(Math.round(274 + Math.cos(k * 0.78) * 4), Math.round(140 + Math.sin(k * 0.78) * 4), KK); caja(254, 124, 294, 131, hex('#d8783a'), hex('#f0a060'), hex('#a84a1a'));
  for (let k = 0; k < 30; k++) R.pset(250 - k, 152 + Math.round(Math.sin(k * 0.4) * 2 + k * 0.4), KK);
  R.poligono([[150, 132], [206, 128], [212, 170], [154, 174]], hex('#c8c0a8')); R.poligono([[151, 132], [205, 129], [210, 169], [155, 172]], hex('#f8f6ee'));
  for (let k = 0; k < 7; k++) R.linea(158 + k * 0.6, 138 + k * 4, 198 - (k * 9) % 17, 136 + k * 4, hex('#7a7a8a'));
  // la taza de café
  caja(18, 128, 32, 146, hex('#e8e4d8'), BL, hex('#a8a498')); R.rect(32, 132, 35, 140, KK); R.rect(33, 133, 34, 139, hex('#e8e4d8')); R.rect(19, 129, 31, 130, hex('#5a3418'));
};
const p2 = (t) => {
  fondo('mesa', MESA);
  // segundero del reloj
  const ang = -Math.PI / 2 + Math.floor(t) * Math.PI / 30; R.linea(100, 38, Math.round(100 + Math.cos(ang) * 10), Math.round(38 + Math.sin(ang) * 10), hex('#c82a2a')); R.linea(100, 38, 100, 30, KK); R.linea(100, 38, 106, 38, KK); R.pset(100, 38, KK);
  // la cápsula que cae por el tubo hasta la bandeja
  const c = tramo(t, P2 + 0.2, P2 + 0.8); if (c > 0 && c < 1) { const y = Math.round(lerp(-6, 76, c)); for (let yy = y - 5; yy <= y + 5; yy++) for (let xx = 8; xx <= 14; xx++) if (yy < 64 || (yy < 82 && xx > 3)) R.pset(xx, yy, xx === 8 || xx === 14 || yy === y - 5 || yy === y + 5 ? KK : xx < 10 ? hex('#f8b070') : hex('#d8783a')); }
  if (c >= 1) { R.rect(6, 88, 24, 93, KK); R.rect(7, 89, 23, 92, hex('#d8783a')); R.rect(7, 89, 23, 89, hex('#f8b070')); }
  // el vapor del café
  for (let k = 0; k < 4; k++) { const v = ((t * 0.8 + k * 0.25) % 1), x = Math.round(25 + Math.sin(v * 7 + k) * 2), y = Math.round(126 - v * 18); if (v < 0.9) R.pset(x, y, hex('#f0eee8')); }
  // la mano izquierda sujeta el papel; la derecha moja el sello y sella en «office»
  const sujeta = tramo(t, P2 + 0.6, P2 + 1.4);
  { const mx = Math.round(lerp(120, 152, sujeta)), my = Math.round(lerp(196, 160, sujeta)); T.brazo(R, mx - 34, 200, mx, my, '#3a4a6a', 1); }
  const moja = tramo(t, P2 + 1.2, P2 + 1.8) - tramo(t, P2 + 2.1, P2 + 2.6), sube = tramo(t, P2 + 2.1, P2 + 2.8), baja = tramo(t, officeT - 0.18, officeT), alza = tramo(t, officeT + 0.35, officeT + 0.8);
  let hx = lerp(262, 232, moja), hy = lerp(168, 140, moja); if (sube > 0) { hx = lerp(232, 186, sube); hy = lerp(140, 112, sube); } hy = hy + baja * 26 - alza * 22;
  hx = Math.round(hx); hy = Math.round(hy);
  if (t > officeT) { R.disco(182, 150, 7, hex('#c82a2a')); R.disco(182, 150, 5, hex('#f8f6ee')); R.icono('reloj', 179, 147, hex('#c82a2a'), hex('#f8f6ee')); }
  // el sello: la goma, la base de madera y el pomo, por debajo de la mano
  R.rect(hx - 9, hy + 10, hx + 3, hy + 12, KK); R.rect(hx - 8, hy + 11, hx + 2, hy + 11, hex('#a8283a')); caja(hx - 9, hy + 5, hx + 3, hy + 10, hex('#8a5a30'), hex('#b07a44'), hex('#5a3418')); R.rect(hx - 4, hy - 2, hx - 2, hy + 5, hex('#5a3418'));
  T.brazo(R, hx + 30, Math.max(hy + 40, 192), hx + 4, hy, '#3a4a6a', -1);
  if (t > officeT && t < officeT + 0.5) for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; R.pset(Math.round(182 + Math.cos(an) * 12), Math.round(150 + Math.sin(an) * 9), BL); }
};
// ── 3 · la oficina general ──
const p3 = (t) => {
  const g = T.tiempo(R, t, { encuadre: 'oficina' });
  const u = tramo(t, P3 + 0.1, P3 + 2.6), lx = Math.round(lerp(112, 146, u)), mira = t > P3 + 2.6 && t < relojT;
  R.actor(EL.agenteTVA, lx - 22, 162, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true });
  R.actor(EL.loki, lx, 162, t, { dir: mira ? (Math.floor((t - P3) * 1.3) % 2 ? -1 : 1) : 1, anda: u > 0 && u < 1, sorpresa: t > P3 + 1.6 });
  const v = tramo(t, P3 + 1, P3 + 3.2), mx = Math.round(lerp(236, 176, v));
  const M = R.actor(EL.mobius, mx, 162, t, { dir: -1, anda: v > 0 && v < 1, sostiene: t < relojT - 0.2, dedo: t > relojT, habla: t > P3 + 3.3 && t < relojT + 0.6 && Math.sin(t * 9) > 0 });
  if (t < relojT - 0.2) carpeta(M.mano[0], M.mano[1] + 1); else carpeta(mx + 4, 160);
  T.tiempoDelante(R, t, { encuadre: 'oficina' });
};
// ── 4 · la consola de la pantalla verde ──
const p4 = (t) => {
  T.tiempo(R, t, { encuadre: 'oficina', camara: 'pantalla', fosforo: 'verde', ramas: 0 });
  // el brillo que recorre la única línea dorada en «sacred»
  const s = tramo(t, sagradaT - 0.2, sagradaT + 1.1); if (s > 0 && s < 1) { R.recorte([112, 42, 218, 108]); const x = Math.round(lerp(108, 222, s)); for (let k = -6; k <= 6; k++) { R.pset(x + k, 75, BL); if (Math.abs(k) < 3) { R.pset(x + k, 74, hex('#fff6c0')); R.pset(x + k, 76, hex('#fff6c0')); } } R.recorte(null); }
  // la cápsula que cae por el tubo de la estación
  const c = tramo(t, tuboT - 0.5, tuboT); if (c > 0 && c < 1) { const y = Math.round(lerp(20, 112, c)); R.rect(28, y - 5, 32, y + 5, KK); R.rect(29, y - 4, 31, y + 4, hex('#d8783a')); }
  if (t >= tuboT) { R.rect(22, 112, 38, 116, KK); R.rect(23, 113, 37, 115, hex('#d8783a')); R.rect(23, 113, 37, 113, hex('#f8b070')); }
  // el agente de la lupa: se acerca a la pantalla en «watches»
  const w = tramo(t, vigila - 0.2, vigila + 0.6), ax = Math.round(lerp(66, 72, w));
  const A = R.actor(EL.agenteTVA, ax, 166, t, { dir: 1, sostiene: [ax + 18, Math.round(lerp(142, 132, w))], sonrisa: t > sagradaT, sorpresa: false });
  lupa(A.mano[0], A.mano[1], 1);
  // Mobius saca una carpeta del archivador
  const cj = tramo(t, cajonT, cajonT + 0.4) - tramo(t, tuboT + 0.8, tuboT + 1.2);
  if (cj > 0) { const dx = Math.round(cj * 10); caja(286 - dx, 120, 312 - dx, 132, hex('#8a8e88'), hex('#b8bcb4'), hex('#5a5e58')); R.rect(296 - dx, 125, 302 - dx, 126, hex('#e0c060')); for (let k = 0; k < 4; k++) R.rect(289 - dx + k * 5, 117, 291 - dx + k * 5, 120, hex('#e0b860')); }
  const coge = t > cajonT + 0.5;
  const M = R.actor(EL.mobius, 268, 166, t, { dir: coge && t > tuboT + 0.4 ? -1 : 1, sostiene: true, habla: t > vigila && t < vigila + 1.2 && Math.sin(t * 9) > 0 });
  if (coge) carpeta(M.mano[0], M.mano[1]);
  T.tiempoDelante(R, t, { encuadre: 'oficina', camara: 'pantalla' });
};
const efectos = [[puerta, 'zumbido'], [alto, 'aviso'], [P2 + 0.25, 'whoosh'], [P2 + 1.6, 'toc'], [officeT, 'sello'], [relojT, 'tic'], [cajonT, 'golpecito'], [tuboT - 0.45, 'whoosh'], [vigila, 'bip'], [sagradaT, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '2021', efectos, año: 2021 });
''')

# =====================================================================================================================
E['do-poda'] = ('Los jardineros del tiempo', '''// DO-PODA (frases 17–18), sin cartela, 2021. Cinco planos:
// 1. el árbol de cerca: el agente llega con sus tijeras de jardín, poda la rama en «prune», la rama cae y se deshace en
//    «erase»; se sacude las manos, satisfecho, y por detrás le sale otra rama (gag 2);
// 2. (fondo local) el vivero de líneas temporales: tres agentes podan arbolitos dorados a la vez; en «nobody asks why» al
//    del centro le sale un «?», el supervisor niega con la cabeza y vuelve a podar;
// 3. (fondo local) el castillo flotante en el vacío, con el remolino del tiempo: Loki cruza el puente de piedras que
//    flotan; en «man in charge» se abre el portón de luz y entra;
// 4. el despacho del fin del tiempo: el hombre de la túnica morada sonríe, abre los brazos en «He Who Remains», muerde
//    su manzana en «prunes»; en «other versions» asoman en el ventanal las siluetas con yelmo de aletas; Loki, asombrado;
// 5. (fondo local) los universos-burbuja en fila: en «conquer one universe after another» caen versiones con armadura,
//    una en cada burbuja, que se vuelve morada y levanta su banderín.''', AY + r'''
const a = (f) => en('podan', f), b = (f) => en('permanece', f);
const P2 = a(0.605), P3 = b(0) - 0.05, P4 = b(0.333), P5 = b(0.684);
const snip = a(0.345), borra = a(0.476), estricto = a(0.66), nadie = a(0.857), porque = a(0.93);
const abre = b(0.163), entra = b(0.277), descubre = b(0.344), quien = b(0.446), podaT = b(0.503), otras = b(0.64);
const reinos = b(0.785), conquista = [b(0.72), b(0.785), b(0.871), b(0.91), b(0.964)];
// ── 1 · la poda ──
const p1 = (t) => {
  const corte = tramo(t, snip, snip + 1.6), nueva = tramo(t, borra + 0.2, P2 - 0.1);
  const g = T.tiempo(R, t, { encuadre: 'arbol', camara: 'poda', corte, ramas: nueva });
  const llega = tramo(t, 0.2, 2.0), ax = Math.round(lerp(300, 225, llega));
  const abiertas = t < snip - 0.6 ? 0.2 : t < snip ? 1 : t < snip + 0.15 ? 1 - (t - snip) / 0.15 : 0.1;
  const A = R.actor(EL.agenteTVA, ax, 166, t, { dir: -1, anda: llega > 0 && llega < 1, sostiene: t < borra + 0.3 ? [ax - 2, 146] : [ax, 150], sonrisa: t > borra, habla: t > borra + 0.3 && t < borra + 0.9 && Math.sin(t * 9) > 0 });
  if (t < borra + 0.3) tijeras(A.mano[0], A.mano[1], -1, llega < 1 ? 0.1 : abiertas); else tijeras(A.mano[0], A.mano[1] + 2, -1, 0.05);
  if (t > snip && t < snip + 0.35) for (let k = 0; k < 6; k++) { const an = k * 1.05; R.pset(Math.round(g.corte[0] + Math.cos(an) * 6), Math.round(g.corte[1] + Math.sin(an) * 6), BL); }
  // otro agente lejos, en la plataforma, empuja la carretilla de ramas
  const cx = Math.round(lerp(60, 96, tramo(t, 0.5, 4.5)));
  R.actor(EL.agenteTVA, cx - 18, 166, t, { dir: 1, anda: t > 0.5 && t < 4.5, pal: { C: hex('#6a5a4a') } });
};
// ── 2 · el vivero de líneas temporales ──
const VIV = () => {
  // pared verde menta con rayas finas; arriba a la derecha, lisa y con la luz del techo
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x > 266 && y < 50 ? (y < 20 ? hex('#8ab89a') : hex('#7aa88a')) : x % 12 === 0 ? hex('#5a8a6a') : x % 12 === 6 ? hex('#86b496') : hex('#6e9e7e'));
  R.rect(0, 100, 319, 112, hex('#7a4a24')); R.rect(0, 100, 319, 101, hex('#a06a3a')); for (let x = 0; x < 320; x += 16) R.rect(x, 102, x, 112, hex('#5a3418'));
  // la pared de cajones de la izquierda
  caja(0, 24, 58, 100, hex('#8a5a30'), hex('#a8784a'), hex('#5a3418')); for (let j = 0; j < 6; j++) for (let i = 0; i < 4; i++) { const x = 3 + i * 14, y = 27 + j * 12; caja(x, y, x + 12, y + 10, hex('#c8a060'), hex('#e8c888'), hex('#8a6a3a')); R.rect(x + 4, y + 6, x + 8, y + 6, hex('#5a3418')); R.rect(x + 4, y + 3, x + 8, y + 4, hex('#f6f2e6')); }
  // el cartel de la regla: la línea recta dorada y sus ramas tachadas (sin letras)
  caja(74, 22, 176, 74, hex('#f2e8d0'), BL, hex('#c8b890')); R.rect(80, 47, 170, 49, hex('#c89020')); R.rect(80, 47, 170, 47, hex('#ffd860'));
  for (const [x, up] of [[100, -1], [124, 1], [148, -1]]) { R.linea(x, 48, x + 10, 48 + up * 14, hex('#3aa85a')); R.linea(x + 1, 48, x + 11, 48 + up * 14, hex('#3aa85a')); R.linea(x + 3, 48 + up * 4, x + 11, 48 + up * 12, hex('#d82a2a')); R.linea(x + 11, 48 + up * 4, x + 3, 48 + up * 12, hex('#d82a2a')); }
  // el tubo neumático que cruza la pared
  R.rect(0, 84, 319, 90, KK); R.rect(0, 85, 319, 89, hex('#a8d0c8')); R.rect(0, 85, 319, 85, hex('#e0f4f0')); for (let x = 30; x < 320; x += 60) R.rect(x, 83, x + 3, 91, hex('#c8a040'));
  // el gran reloj de pared
  R.disco(222, 46, 22, KK); R.disco(222, 46, 21, hex('#b07a3a')); R.disco(222, 46, 18, hex('#f6efdc')); for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6; R.rect(Math.round(222 + Math.cos(an) * 15), Math.round(46 + Math.sin(an) * 15), Math.round(222 + Math.cos(an) * 15) + (k % 3 ? 0 : 1), Math.round(46 + Math.sin(an) * 15) + (k % 3 ? 0 : 1), KK); }
  // el suelo de linóleo a cuadros en perspectiva, con brillo y hojitas caídas
  for (let y = 112; y < 180; y++) { const e = (y - 100) / 80, f = Math.floor((y - 112) / (4 + (y - 112) * 0.12)); for (let x = 0; x < 320; x++) { const xx = Math.floor((x - 160) / (14 * e + 4)); R.pset(x, y, (xx + f) % 2 ? hex('#c8b890') : hex('#a89870')); } }
  for (let y = 116; y < 130; y++) for (let x = 0; x < 320; x++) if ((130 - y) / 16 > bay(x, y)) R.pset(x, y, mez(R.pget(x, y), hex('#5a6a5a'), 0.3));
  for (let k = 0; k < 14; k++) { const x = Math.floor(hh(k, 81) * 320), y = 150 + Math.floor(hh(k, 82) * 28); R.pset(x, y, hex('#3aa85a')); R.pset(x + 1, y, hex('#8ae0a0')); }
  // el carrito de las ramas podadas, junto a la pared
  caja(276, 120, 316, 140, hex('#6a6e7a'), hex('#a8acb8'), hex('#3a3e4a')); for (let k = 0; k < 8; k++) R.linea(280 + k * 4, 120, 284 + k * 3, 110 + (k % 3) * 3, ['#4ac86a', '#e86a8a', '#6ad0e8'].map(hex)[k % 3]); R.disco(282, 143, 3, KK); R.disco(310, 143, 3, KK);
};
const arbolito = (cx, t, k, podada) => {
  // la jardinera de barro en el suelo y el arbolito dorado: tronco, la línea recta y una ramita verde que cuelga
  R.poligono([[cx - 14, 148], [cx + 14, 148], [cx + 10, 170], [cx - 10, 170]], KK); R.poligono([[cx - 13, 149], [cx + 13, 149], [cx + 9, 169], [cx - 9, 169]], hex('#c86a3a'));
  R.rect(cx - 15, 145, cx + 15, 150, KK); R.rect(cx - 14, 146, cx + 14, 149, hex('#e08a50')); R.rect(cx - 11, 152, cx - 9, 167, hex('#e89a68')); R.rect(cx + 6, 152, cx + 8, 167, hex('#a8502a'));
  R.rect(cx - 12, 146, cx + 12, 146, hex('#5a3418')); R.rect(cx - 12, 171, cx + 12, 172, hex('#7a6a50'));
  trazo([[cx, 146], [cx - 1, 128], [cx, 108]], hex('#e8b830'), 1.5, hex('#8a5a10')); trazo([[cx - 28, 108], [cx + 28, 108]], hex('#ffd860'), 1, hex('#8a5a10'));
  for (const s of [-1, 1]) { R.disco(cx + s * 28, 108, 3, hex('#8a5a10')); R.disco(cx + s * 28, 108, 2, hex('#fff2b0')); }
  const pul = ((t * 0.9 + k * 0.3) % 1); R.pset(Math.round(cx - 28 + pul * 56), 107, BL); R.pset(Math.round(cx - 27 + pul * 56), 107, BL);
  if (!podada) { trazo([[cx + 4, 110], [cx + 10, 124], [cx + 9, 140]], hex('#4ac86a'), 0.8, hex('#1a5a2a')); R.disco(cx + 9, 142, 2.5, hex('#a8f0b8')); R.pset(cx + 8, 141, BL); }
};
const p2 = (t) => {
  fondo('vivero', VIV);
  // aguja del reloj, cápsulas que corren por el tubo, lámparas que se mecen
  const an = -Math.PI / 2 + t * 0.9; R.linea(222, 46, Math.round(222 + Math.cos(an) * 14), Math.round(46 + Math.sin(an) * 14), hex('#c82a2a')); R.linea(222, 46, 222, 34, KK); R.disco(222, 46, 1, KK);
  for (let k = 0; k < 2; k++) { const x = Math.round(((t * 70 + k * 170) % 380) - 30); R.rect(x - 5, 85, x + 5, 89, KK); R.rect(x - 4, 86, x + 4, 88, hex('#d8783a')); R.rect(x - 4, 86, x + 4, 86, hex('#f8b070')); }
  for (const [lx, ph] of [[196, 0], [246, 1.4]]) { const dx = Math.round(Math.sin(t * 1.6 + ph) * 3); R.linea(lx, 0, lx + dx, 18, KK); R.poligono([[lx + dx - 8, 26], [lx + dx + 8, 26], [lx + dx + 4, 18], [lx + dx - 4, 18]], hex('#d8783a')); R.rect(lx + dx - 8, 26, lx + dx + 8, 27, KK); R.disco(lx + dx, 28, 2, hex('#fff6c8')); }
  // tres agentes podan a la vez (en «strict» y en «gardeners»); al del centro le sale el «?» en «nobody asks why»
  const cortes = [estricto, estricto + 0.62, porque + 0.9], XS = [52, 150, 246];
  const corta = (c) => t > c - 0.3 && t < c, podada = () => t > cortes[2] || cortes.some((c) => t > c && t < c + 0.45);
  XS.forEach((cx, k) => {
    const duda = k === 1 && t > nadie && t < porque + 0.8, ab = !duda && cortes.some(corta) ? 1 : 0.15;
    arbolito(cx, t, k, podada());
    const A = R.actor(EL.agenteTVA, cx + 12, 171, t, { dir: -1, sostiene: [cx + 14, 150], sorpresa: duda, pal: k === 2 ? { C: hex('#6a5a4a') } : k === 0 ? { C: hex('#4a4a5a') } : undefined });
    tijeras(A.mano[0], A.mano[1], -1, duda ? 0.1 : ab);
    if (duda && t > nadie + 0.2) R.bocadillo(cx + 20, 140, { icono: '?' });
  });
  // la ramita podada cae al suelo y queda allí
  for (const c of cortes) for (const cx of XS) { const u = Math.min(1, (t - c) / 0.5); if (u > 0) { R.disco(cx + 9 - u * 4, Math.round(140 + u * 32), 1, hex('#4ac86a')); R.pset(cx + 8 - u * 4, Math.round(139 + u * 32), hex('#a8f0b8')); } }
  // el supervisor llega por delante con la carpeta y niega con la cabeza
  const v = tramo(t, P2, P2 + 1.6), sx = Math.round(lerp(330, 196, v)), niega = t > porque && t < porque + 0.8;
  const S = R.actor(EL.mobius, sx, 179, t, { dir: niega ? (Math.floor(t * 8) % 2 ? 1 : -1) : -1, anda: v > 0 && v < 1, sostiene: true, enfado: niega });
  carpeta(S.mano[0], S.mano[1]);
};
// ── 3 · el castillo flotante ──
const CAST = () => {
  pintaVacio(3);
  // rocas lejanas que flotan
  for (const [x, y, w] of [[40, 50, 18], [120, 150, 12], [300, 120, 14]]) { R.poligono([[x - w, y], [x + w, y], [x + w / 3, y + w], [x - w / 4, y + w * 0.8]], hex('#2a1a3a')); R.rect(x - w, y - 1, x + w, y, hex('#5a4a6a')); }
  // la roca grande del castillo: cono invertido con vetas y estalactitas
  R.poligono([[148, 128], [298, 128], [262, 164], [236, 180], [206, 178], [176, 160]], KK);
  R.poligono([[150, 129], [296, 129], [260, 163], [235, 178], [207, 176], [178, 159]], hex('#4a3a5a'));
  for (let y = 130; y < 178; y++) for (let x = 150; x < 296; x++) if (R.pget(x, y) === hex('#4a3a5a')) { const v = Math.sin(x * 0.2 + y * 0.5); R.pset(x, y, x < 190 + (y - 130) * 0.3 ? hex('#6a5a7a') : v > 0.85 ? hex('#3a2a4a') : hex('#4a3a5a')); if (hh(x, y, 9) > 0.985) R.pset(x, y, hex('#e8c060')); }
  R.rect(150, 128, 296, 130, hex('#8a7a9a'));
  // el castillo: muralla con almenas, torres con tejados de cobre verde, ventanas encendidas y la cúpula
  const piedra = hex('#8a8098'), pS = hex('#5a5068'), pL = hex('#b0a8c0');
  caja(160, 84, 286, 128, piedra, pL, pS);
  for (let y = 88; y < 126; y += 5) for (let x = 162 + (y % 10 ? 0 : 5); x < 284; x += 10) R.rect(x, y, x, y + 3, pS);
  for (let x = 160; x < 286; x += 8) caja(x, 79, x + 5, 85, piedra, pL, pS);
  const torre = (x0, x1, y0, techo) => { caja(x0, y0, x1, 128, piedra, pL, pS); for (let y = y0 + 4; y < 126; y += 5) R.rect(x0 + 1, y, x1 - 1, y, mez(piedra, KK, 0.15)); R.poligono([[x0 - 3, y0 + 1], [x1 + 3, y0 + 1], [(x0 + x1) / 2, techo]], KK); R.poligono([[x0 - 2, y0], [x1 + 2, y0], [(x0 + x1) / 2, techo + 2]], hex('#3a8a7a')); R.linea((x0 + x1) / 2, techo + 3, x0 - 1, y0 - 1, hex('#6ac0a8')); };
  torre(166, 186, 56, 36); torre(254, 274, 62, 48); torre(208, 238, 30, 16);
  R.disco(223, 84, 14, KK); R.disco(223, 84, 13, hex('#3a8a7a')); R.disco(219, 80, 6, hex('#6ac0a8')); R.rect(209, 84, 237, 92, piedra);
  for (const [x, y] of [[172, 70], [180, 70], [172, 94], [216, 46], [228, 46], [216, 62], [228, 62], [260, 76], [268, 76], [196, 100], [250, 100], [276, 104]]) { caja(x - 2, y - 4, x + 2, y + 3, hex('#ffd860'), hex('#fff6c0'), hex('#c89020')); R.pset(x, y - 4, KK); }
  // el portón (cerrado) en arco
  R.disco(223, 110, 10, KK); R.rect(213, 110, 233, 128, KK); R.disco(223, 110, 9, hex('#5a3418')); R.rect(214, 110, 232, 127, hex('#5a3418')); R.rect(223, 101, 223, 127, KK); for (let y = 104; y < 127; y += 4) R.rect(214, y, 232, y, hex('#3a2010'));
};
const p3 = (t) => {
  fondo('castillo', CAST);
  // el remolino del tiempo, a la izquierda y detrás, que gira
  for (let k = 0; k < 3; k++) for (let i = 0; i < 160; i++) { const u = i / 160, an = t * 0.6 + k * 2.1 + u * 7, r = 4 + u * 46, x = Math.round(84 + Math.cos(an) * r * 1.3), y = Math.round(64 + Math.sin(an) * r * 0.6); if (x > 150 && y > 78) continue; if (u > bay(x, y) * 0.9) R.pset(x, y, u < 0.3 ? hex('#fff0c0') : u < 0.6 ? hex('#e8a0e8') : hex('#8a4ab0')); }
  R.disco(84, 64, 3, hex('#fff6d8'));
  vidaVacio(t, 3, 20);
  // el puente de losas que flotan y se mecen
  for (let k = 0; k < 9; k++) { const x = -4 + k * 24, y = 126 + Math.round(Math.sin(t * 1.4 + k) * 1.2); R.poligono([[x, y], [x + 20, y], [x + 16, y + 8], [x + 4, y + 9]], KK); R.rect(x + 1, y + 1, x + 19, y + 3, hex('#8a8098')); R.rect(x + 1, y + 1, x + 19, y + 1, hex('#b0a8c0')); R.poligono([[x + 2, y + 4], [x + 18, y + 4], [x + 15, y + 7], [x + 5, y + 8]], hex('#4a3a5a')); }
  // el portón se abre en «man in charge»: luz cálida
  const ab = tramo(t, abre, abre + 0.8);
  if (ab > 0) { const w = Math.round(9 * ab); R.rect(223 - w, 104, 223 + w, 127, hex('#fff2c0')); R.rect(223 - w + 1, 106, 223 + w - 1, 127, hex('#fffbe8')); tinta(180, 120, 260, 140, hex('#ffe8a0'), ab * 0.8, 223, 128, 36); }
  // Loki cruza el puente y entra
  const u = tramo(t, P3 + 0.1, entra + 0.3), lx = Math.round(lerp(16, 216, u));
  if (u < 1) R.actor(EL.loki, lx, 127, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > abre && t < abre + 1 });
  if (ab > 0 && u > 0.93) { R.rect(211, 100, 213, 128, KK); R.rect(233, 100, 235, 128, KK); }
};
// ── 4 · el despacho del fin del tiempo ──
const manzana = (x, y, mordida) => { R.disco(x, y, 3, KK); R.disco(x, y, 2, hex('#6ac83a')); R.pset(x - 1, y - 1, hex('#c8f0a0')); R.pset(x, y - 4, hex('#5a3418')); if (mordida) { R.pset(x + 2, y, KK); R.pset(x + 2, y - 1, hex('#f6f2c8')); R.pset(x + 3, y, 0); } };
const p4 = (t) => {
  const g = T.tiempo(R, t, { encuadre: 'fin', variantes: tramo(t, otras - 0.5, otras + 0.6) });
  const u = tramo(t, P4 + 0.05, descubre + 1.0), lx = Math.round(lerp(10, 86, u));
  R.actor(EL.loki, lx, 164, t, { dir: 1, anda: u > 0 && u < 1, enfado: t > quien && t < otras, sorpresa: t > otras });
  const brazos = t > quien && t < quien + 0.7, come = t > quien + 0.7;
  const P = R.actor(EL.permanece, 153, 164, t, { dir: -1, sonrisa: true, habla: t > descubre && t < quien && Math.sin(t * 9) > 0, brazos, sostiene: come ? [148, 146] : false, dedo: false });
  if (come) manzana(P.mano[0], P.mano[1] - 2, t > podaT);
  if (t > podaT && t < podaT + 0.5) { R.pset(P.mano[0] + 4, P.mano[1] - 6, hex('#f6f2c8')); R.pset(P.mano[0] + 6, P.mano[1] - 8, hex('#f6f2c8')); }
};
// ── 5 · un universo tras otro ──
const UNIV = [[42, 128, 24, '#5aa0e8', '#3a8a4a'], [102, 74, 22, '#f0a060', '#c86a3a'], [166, 122, 25, '#6ad0c0', '#3a7a8a'], [226, 72, 22, '#e890c0', '#8a4a8a'], [272, 136, 22, '#a8d870', '#5a8a3a']];
const p5 = (t) => {
  fondo('vacio5', () => { pintaVacio(5); for (const [x, y, w] of [[10, 176, 40], [300, 178, 30], [150, 180, 24]]) { R.disco(x, y, w / 2, KK); R.disco(x, y, w / 2 - 1, hex('#3a2a4a')); R.disco(x - 3, y - 3, w / 2 - 5, hex('#5a4a6a')); } });
  vidaVacio(t, 5, 22);
  // los hilos de luz que unen las burbujas
  for (let k = 1; k < UNIV.length; k++) { const [x0, y0] = UNIV[k - 1], [x1, y1] = UNIV[k]; const pts = bez([x0, y0], [(x0 + x1) / 2, Math.min(y0, y1) - 30], [x1, y1], 20); for (const [x, y] of pts) R.pset(Math.round(x), Math.round(y), hex('#c8a040')); }
  UNIV.forEach(([cx, cy, r, cielo, suelo], k) => {
    const cq = conquista[k], toma = tramo(t, cq, cq + 0.3), vivo = 1 - toma;
    R.disco(cx, cy, r + 1, KK);
    // dentro, un mundo: cielo, sol, colinas y una ciudad pequeña
    R.disco(cx, cy, r, (x, y) => { const h = cy + r * 0.25 + Math.sin((x - cx) * 0.25 + k) * 2, sky = y < h; let c = sky ? (y < cy - r * 0.3 ? mez(hex(cielo), BL, 0.15) : hex(cielo)) : ((x + y) % 5 ? hex(suelo) : mez(hex(suelo), KK, 0.25)); if (sky && Math.abs(x - cx + 4) % 7 < 3 && y > h - 6 - ((x * 7) % 5)) c = mez(hex(cielo), KK, 0.45); return toma > bay(x, y) ? mez(c, hex('#5a1a7a'), 0.65) : c; });
    if (vivo > 0) R.disco(cx - r * 0.4, cy - r * 0.45, 3, mez(hex('#fff6c0'), hex(cielo), toma));
    // la versión con armadura cae dentro y levanta su banderín
    const cae = tramo(t, cq - 0.45, cq);
    if (cae > 0) {
      const y = Math.round(lerp(cy - r - 40, cy + r * 0.25 + 1, cae));
      R.recorte(cae < 1 ? [0, 0, 319, 179] : [cx - r, cy - r, cx + r, cy + r]);
      const K = R.actor(EL.kang, cx - 4, y, t, { dir: k % 2 ? -1 : 1, sostiene: cae >= 1, enfado: true });
      if (cae >= 1) { const [hx, hy] = K.mano; R.linea(hx, hy + 3, hx, hy - 14, hex('#c8c0d0')); R.poligono([[hx, hy - 14], [hx + (k % 2 ? -9 : 9), hy - 11], [hx, hy - 8]], hex('#8a3ab0')); R.pset(hx + (k % 2 ? -3 : 3), hy - 11, hex('#f0c040')); }
      R.recorte(null);
    }
    // el cristal de la burbuja: brillo y reflejo
    R.anillo(cx, cy, r, toma > 0.5 ? hex('#c870f0') : hex('#c8e8ff')); R.anillo(cx, cy, r - 1, mez(hex('#c8e8ff'), KK, 0.5), 3);
    for (let i = 0; i < 6; i++) R.pset(Math.round(cx - r * 0.6 + i), Math.round(cy - r * 0.7 + i * 0.4), BL);
    if (t > cq && t < cq + 0.35) for (let i = 0; i < 10; i++) { const an = i * 0.63; R.pset(Math.round(cx + Math.cos(an) * (r + 5)), Math.round(cy + Math.sin(an) * (r + 5)), hex('#e8a0ff')); }
  });
};
const efectos = [[0.4, 'whoosh'], [snip, 'tic'], [borra, 'brillo'], [estricto, 'tic'], [nadie + 0.2, 'pop'], [porque + 0.9, 'tic'], [abre, 'puerta'], [podaT, 'masca'], [otras - 0.4, 'whoosh'], [conquista[1], 'golpecito'], [conquista[2], 'golpecito'], [conquista[4], 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2021 });
''')

# =====================================================================================================================
E['do-loki'] = ('El dios de las historias', '''// DO-LOKI (frases 19–21), sin cartela; 2021 → 2023 → 2025. Siete planos:
// 1. el árbol del tiempo: la línea sagrada se ramifica sin control («branch out of control»); los agentes de la plataforma
//    se asustan y corren;
// 2. (fondo local) las ramas de cerca: brotan burbujas-mundo; en «infinite realities» aparecen decenas de brotes; en
//    «heroes» cae un héroe en cada mundo (Spider-Man, Thor, Lobezno) y en «villains», su villano (Doom, Thanos, Magneto);
// 3. (fondo local) el telar del fin del tiempo: el gran cilindro dorado escupe hilos sin parar; los aros se ponen rojos
//    y en «break» uno salta en pedazos con chispas; Loki y Mobius, en la pasarela, lo ven; Loki da un paso al frente;
// 4. el trono en el vacío: Loki sube al estrado y en «sits» se sienta; en «holds» las hebras del árbol bajan a sus manos
//    y el árbol crece detrás; el telar roto flota al fondo;
// 5. (fondo local) de lejos: el árbol de luz enorme con mundos en las puntas y, en la base, un Loki diminuto en su trono;
//    en «tree» todo el árbol se enciende;
// 6. (fondo local) el póster de los cuernos dorados en el cuarto: las palomitas le clavan la esquina; en «confirmed» sale
//    una pegatina verde de visto bueno y en «Doomsday» la de la máscara; las palomitas saltan;
// 7. el mapa del cuarto: los cuernos en el centro del árbol de Tierras; brillan en «guardian» y en «something to say»
//    sale un «!»; las palomitas asienten.''', AY + r'''
const a = (f) => en('multiverso', f), b = (f) => en('arbol', f), c = (f) => en('hiddleston', f);
const P2 = a(0.421), P3 = a(1) + 0.5, P4 = b(0.384), P5 = b(0.806), P6 = c(0) - 0.35, P7 = c(0.63);
const control = a(0.313), nace = a(0.543), infinitas = a(0.635), heroes = a(0.838), villanos = a(0.933);
const telarT = b(0.105), rompe = b(0.244), lokiT = b(0.396), sienta = b(0.622), sostieneT = b(0.751), arbolT = b(0.964);
const confirmado = c(0.407), doomT = c(0.504), guardian = c(0.669), decir = c(0.937);
// ── 1 · la línea se ramifica sin control ──
const p1 = (t) => {
  T.tiempo(R, t, { encuadre: 'arbol', ramas: lerp(0.02, 1, tramo(t, 1.5, control + 0.7)) });
  const susto = t > control - 1.2;
  R.actor(EL.mobius, 44, 166, t, { dir: 1, sorpresa: susto, brazos: t > control && t < control + 1.1 });
  if (t > control && t < control + 1.3) R.bocadillo(52, 132, { icono: '!' });
  const u = tramo(t, 2.4, P2 - 0.3), ax = Math.round(lerp(300, 150, u));
  R.actor(EL.agenteTVA, ax, 166, t, { dir: -1, anda: u > 0 && u < 1, sorpresa: t > 2.4 });
  R.actor(EL.agenteTVA, ax + 22, 166, t, { dir: -1, anda: u > 0 && u < 1, sorpresa: t > 2.6, pal: { C: hex('#6a5a4a') } });
  const L = R.actor(EL.agenteTVA, 224, 166, t, { dir: -1, sostiene: [216, 140 - Math.round(tramo(t, 1.0, 1.8) * 8)], sorpresa: t > 1.9, pal: { C: hex('#4a4a5a') } });
  lupa(L.mano[0], L.mano[1], -1);
};
// ── 2 · las burbujas-mundo ──
const MUNDOS = [
  { x: 70, y: 74, r: 27, cielo: ['#0e1a44', '#1e3a7a', '#3a5aa0'], suelo: '#3a3a4e', heroe: 'spiderman', villano: 'doom', luna: true },
  { x: 168, y: 120, r: 28, cielo: ['#3a1a5a', '#6a3a8a', '#a86aa8'], suelo: '#7a5a4a', heroe: 'thor', villano: 'thanos' },
  { x: 238, y: 72, r: 26, cielo: ['#4a90d8', '#7ab8ec', '#c8e4f6'], suelo: '#4a9a4a', heroe: 'lobezno', villano: 'magneto', sol: true },
];
const BROTES = Array.from({ length: 26 }, (_, i) => ({ x: 12 + Math.floor(hh(i, 41) * 260), y: 24 + Math.floor(hh(i, 42) * 150), r: 2 + Math.floor(hh(i, 43) * 4), c: ['#e86a8a', '#6ad0e8', '#f0c040', '#8ae06a', '#c88af0'][i % 5], t0: hh(i, 44) }));
const p2 = (t) => {
  fondo('vacio2', () => pintaVacio(2));
  vidaVacio(t, 2, 24);
  const crece = tramo(t, P2 - 1.2, P2 + 0.3), infl = tramo(t, P2 + 0.1, nace + 0.2);
  // las ramas de luz desde abajo a la izquierda
  const tronco = bez([-6, 186], [70, 160], [130, 150], 20, crece);
  trazo(tronco, hex('#ffd860'), 3, hex('#6a4a10')); trazo(tronco, hex('#fff6c0'), 0, null);
  const ramas = [[[130, 150], [90, 130], [70, 74 + 27]], [[130, 150], [150, 150], [168, 120 + 28]], [[130, 150], [210, 140], [238, 72 + 26]]];
  ramas.forEach(([p0, p1_, p2_], k) => { const r = bez(p0, p1_, p2_, 16, tramo(t, P2 - 0.6 + k * 0.15, P2 + 0.5 + k * 0.15)); if (crece > 0.9) { trazo(r, ['#6ae08a', '#ffd860', '#6ad0e8'].map(hex)[k], 1.5, hex('#1a2a3a')); } });
  // mundos medianos en ramitas: nacen en «born»
  for (const [x, y, r, c, x0, y0, k] of [[34, 148, 9, '#e8a060', 70, 172, 1], [262, 150, 10, '#6ad0e8', 220, 150, 2], [298, 100, 8, '#e86a8a', 262, 92, 3], [118, 32, 7, '#8ae06a', 92, 50, 4], [196, 34, 8, '#f0c040', 220, 50, 5]]) { const s = tramo(t, nace - 0.6 + k * 0.15, nace + k * 0.15); if (s <= 0) continue; trazo(bez([x0, y0], [(x + x0) / 2, y0], [x, y], 10, s), hex('#c8a040'), 0.5, null); if (s > 0.9) { mundito(x, y, Math.round(r * s), hex(c), hex('#3ac85a'), t, k); R.anillo(x, y, r + 2, hex('#a8c8ff'), 2); } }
  // los brotes: decenas de realidades nuevas en «infinite realities»
  BROTES.forEach((q, i) => { const s = tramo(t, infinitas - 0.3 + q.t0 * 1.4, infinitas + q.t0 * 1.4); if (s <= 0) return; if (q.x > 268 && q.y < 50) return; R.linea(q.x, q.y, q.x - 4, q.y + 6, hex('#8a7a40')); const r = Math.max(1, Math.round(q.r * s)); R.disco(q.x, q.y, r + 1, KK); R.disco(q.x, q.y, r, hex(q.c)); R.pset(q.x - 1, q.y - 1, BL); });
  // los tres mundos con su héroe y su villano
  MUNDOS.forEach((m, k) => {
    const r = Math.round(m.r * infl); if (r < 2) return;
    R.disco(m.x, m.y, r + 1, KK);
    const cie = m.cielo.map(hex), sue = hex(m.suelo), hz = m.y + Math.round(r * 0.38);
    R.disco(m.x, m.y, r, (x, y) => { if (y >= hz + Math.round(Math.sin((x - m.x) * 0.2 + k) * 1.5)) return (x + y) % 4 ? sue : mez(sue, KK, 0.3); const u = (y - (m.y - r)) / (2 * r); let c = cie[u < 0.33 ? 0 : u < 0.6 ? 1 : 2]; if (y > hz - 9 && ((x - m.x + 40) % 9) < 5 && y > hz - 4 - ((x * 3) % 6)) c = mez(cie[0], KK, 0.4); if (m.luna === undefined && m.sol === undefined && hh(x, y, 3) > 0.97) c = BL; return c; });
    if (m.luna) { R.disco(m.x + 12, m.y - 14, 4, hex('#f6f0d0')); R.disco(m.x + 13, m.y - 15, 3, hex('#fffbe8')); for (let i = 0; i < 6; i++) R.pset(m.x - 18 + i * 6, m.y - 8 + (i % 3) * 3, hex('#f8e890')); }
    if (m.sol) { R.disco(m.x - 12, m.y - 13, 4, hex('#fff2b0')); nubeT(m.x + 8, m.y - 8, 12, hex('#b8c8e0'), hex('#eef4fa'), BL); }
    R.recorte([m.x - r, m.y - r, m.x + r, m.y + r]);
    const h = tramo(t, heroes - 0.25, heroes + 0.05), v = tramo(t, villanos - 0.25, villanos + 0.05);
    if (h > 0) R.actor(EL[m.heroe], m.x - 17, hz + 2 - Math.round((1 - h) * 40), t, { dir: 1, enfado: t > villanos, sorpresa: h < 1 });
    if (v > 0) R.actor(EL[m.villano], m.x + 2, hz + 2 - Math.round((1 - v) * 40), t, { dir: -1, enfado: true });
    R.recorte(null);
    R.anillo(m.x, m.y, r, hex('#d8f0ff')); R.anillo(m.x, m.y, r - 1, mez(hex('#d8f0ff'), KK, 0.55), 3);
    for (let i = 0; i < 7; i++) R.pset(Math.round(m.x - r * 0.62 + i), Math.round(m.y - r * 0.68 + i * 0.45), BL);
    if ((t > heroes && t < heroes + 0.3) || (t > villanos && t < villanos + 0.3)) for (let i = 0; i < 10; i++) { const an = i * 0.63 + k; R.pset(Math.round(m.x + Math.cos(an) * (r + 4)), Math.round(m.y + Math.sin(an) * (r + 4)), hex('#fff2b0')); }
  });
};
// ── 3 · el telar se rompe ──
const HILOS = Array.from({ length: 44 }, (_, i) => ({ s: hh(i, 51) > 0.5 ? 1 : -1, x1: hh(i, 52), y1: hh(i, 53), c: ['#ffd860', '#6ae08a', '#6ad0e8', '#e86a8a', '#c88af0', '#f0a060'][i % 6], t0: hh(i, 54) }));
const p3 = (t) => {
  fondo('vacio3', () => pintaVacio(4, false));
  vidaVacio(t, 4, 16);
  const carga = tramo(t, P3, rompe), roto = tramo(t, rompe, rompe + 1.6), cx = 128;
  // los hilos que salen por arriba y se abren hacia los lados
  const n = Math.round(lerp(8, 44, carga));
  for (let i = 0; i < n; i++) { const q = HILOS[i], ex = q.s > 0 ? lerp(200, 268, q.x1) : lerp(-10, 40, q.x1), ey = lerp(40, 150, q.y1), ox = cx + q.s * (4 + q.x1 * 18), pts = bez([ox, 26], [ox + q.s * 30, -10 + q.y1 * 20], [ex, ey], 18, tramo(t, P3 + q.t0 * 2.5 - 0.6, P3 + q.t0 * 2.5)); if (q.s > 0 && ey < 52) continue; for (let k = 1; k < pts.length; k++) { const [x0, y0] = pts[k - 1], [x, y] = pts[k]; if ((y < 17 && x < 178) || (x > 266 && y < 50) || (y0 < 17 && x0 < 178)) continue; R.linea(Math.round(x0), Math.round(y0) + 1, Math.round(x), Math.round(y) + 1, mez(hex(q.c), KK, 0.55)); R.linea(Math.round(x0), Math.round(y0), Math.round(x), Math.round(y), ((k + Math.floor(t * 12)) % 7) === 0 ? BL : hex(q.c)); } }
  // el cilindro del telar: cuerpo, nervios, aros que se calientan y la ranura de luz
  const W = 50, y0 = 24, y1 = 134;
  R.rect(cx - W - 1, y0, cx + W + 1, y1, KK);
  for (let y = y0 + 1; y < y1; y++) for (let x = cx - W; x <= cx + W; x++) { const u = (x - cx) / W, l = 1 - Math.abs(u + 0.35); R.pset(x, y, l > 0.85 ? hex('#a89aa8') : l > 0.5 ? hex('#7a6e86') : l > 0.2 ? hex('#5a5068') : hex('#3a3248')); if (((x - cx + Math.floor(t * 8)) % 14 + 14) % 14 === 0) R.pset(x, y, hex('#2a2238')); }
  for (let y = y0 + 8; y < y1; y += 14) { const roj = carga * (0.5 + 0.5 * Math.sin(t * 8 + y)); const col = mez(hex('#e8b830'), hex('#f03a2a'), Math.min(1, roj)); R.rect(cx - W, y, cx + W, y + 3, KK); R.rect(cx - W + 1, y + 1, cx + W - 1, y + 2, col); R.rect(cx - W + 6, y + 1, cx - W + 24, y + 1, mez(col, BL, 0.5)); }
  R.disco(cx, y0, 0, KK); for (let x = cx - W; x <= cx + W; x++) { const e = Math.round(Math.sqrt(Math.max(0, 1 - ((x - cx) / W) ** 2)) * 6); R.rect(x, y0 - e, x, y0 + e, hex('#2a2238')); R.pset(x, y0 - e, hex('#c8a040')); R.pset(x, y0 + e, hex('#8a6a20')); }
  R.disco(cx, y0, 4, hex('#fff6c0'));
  const brillo = 0.6 + 0.4 * Math.sin(t * 10); R.rect(cx - 2, y0 + 8, cx + 2, y1 - 4, mez(hex('#ffd860'), BL, brillo * 0.5)); R.rect(cx - 1, y0 + 8, cx + 1, y1 - 4, BL);
  // la grieta y el aro que salta en pedazos en «break»
  if (t > rompe - 0.4) { const g = tramo(t, rompe - 0.4, rompe); let x = cx + 18, y = 60; for (let k = 0; k < Math.round(10 * g); k++) { const nx = x + (k % 2 ? 6 : -4), ny = y + 7; R.linea(x, y, nx, ny, hex('#fff6c0')); R.linea(x + 1, y, nx + 1, ny, hex('#f03a2a')); x = nx; y = ny; } }
  if (roto > 0) {
    for (let k = 0; k < 5; k++) { const an = -0.8 + k * 0.4, d = roto * (30 + k * 8), px = Math.round(cx + 30 + Math.cos(an) * d), py = Math.round(78 + Math.sin(an) * d + roto * roto * 20); caja(px - 5, py - 2, px + 5, py + 2, hex('#c83a2a'), hex('#f8a060'), hex('#7a1a10')); }
    for (let k = 0; k < 24; k++) { const an = hh(k, 61) * 6.28, d = roto * (20 + hh(k, 62) * 50), px = Math.round(cx + 30 + Math.cos(an) * d), py = Math.round(78 + Math.sin(an) * d + roto * roto * 30); if (px > 270 && py < 50) continue; R.pset(px, py, k % 2 ? hex('#fff2b0') : hex('#f8a040')); }
    if (roto < 0.25) tinta(0, 0, 319, 179, hex('#f04a3a'), 0.35 * (1 - roto * 4));
  }
  // la pasarela de rejilla con su barandilla, y la baliza roja que gira
  for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 150 ? hex('#6a6e7a') : (x % 6 === 0 || y % 6 === 0) ? hex('#2a2a34') : hex('#4a4e5a'));
  R.rect(0, 146, 319, 146, hex('#a8acb8')); R.rect(0, 150, 319, 151, KK);
  R.rect(0, 128, 319, 129, hex('#a8acb8')); R.rect(0, 130, 319, 130, KK); for (let x = 8; x < 320; x += 30) { R.rect(x, 128, x + 2, 146, KK); R.rect(x + 1, 129, x + 1, 145, hex('#a8acb8')); }
  const bz = Math.sin(t * 7) > 0; caja(292, 118, 302, 128, KK, KK, KK); R.disco(297, 116, 4, carga > 0.3 && bz ? hex('#ff4a3a') : hex('#8a2a2a')); if (carga > 0.3 && bz) tinta(270, 96, 319, 140, hex('#ff4a3a'), 0.6, 297, 116, 26);
  // Loki y Mobius en la pasarela
  const paso = tramo(t, lokiT - 1.3, P4 - 0.1), lx = Math.round(lerp(222, 198, paso));
  R.actor(EL.loki, lx, 150, t, { dir: -1, anda: paso > 0 && paso < 1, sorpresa: t > rompe && t < lokiT - 1.3, enfado: t > lokiT - 1.3 });
  R.actor(EL.mobius, 252, 150, t, { dir: -1, sorpresa: t > rompe - 0.3, dedo: t > rompe && t < rompe + 1.6, habla: t > telarT && t < rompe - 0.5 && Math.sin(t * 9) > 0 });
};
// ── 4 · el trono ──
const p4 = (t) => {
  const crece = lerp(0.25, 1, tramo(t, sostieneT - 0.6, P5 - 0.1));
  const g = T.tiempo(R, t, { encuadre: 'fin', camara: 'trono', ramas: crece, telar: lerp(0.7, 1, tramo(t, P4, P5)) });
  const sentado = t > sienta;
  const baja = tramo(t, sostieneT - 0.6, sostieneT);
  const manos = [[Math.round(lerp(152, 151, baja)), Math.round(lerp(98, 138, baja))], [Math.round(lerp(168, 169, baja)), Math.round(lerp(98, 138, baja))]];
  // Loki: espera en el estrado mirando el árbol, se vuelve y va al trono; en «sits» se sienta
  const va = tramo(t, sienta - 1.1, sienta - 0.1), lx = Math.round(lerp(196, 153, va)), ly = Math.round(lerp(152, 150, va));
  const opc = { dir: t < sienta - 1.6 ? -1 : t < sienta ? -1 : 1, anda: va > 0 && va < 1, sorpresa: t < lokiT, sonrisa: sentado, brazos: sentado && t > sostieneT - 0.1 };
  if (sentado) { R.actor(EL.loki, 153, 150, t, opc); T.tiempoDelante(R, t, { encuadre: 'fin', camara: 'trono', manos }); }
  else { T.tiempoDelante(R, t, { encuadre: 'fin', camara: 'trono', manos }); R.actor(EL.loki, lx, ly, t, opc); }
  if (t > sostieneT && t < sostieneT + 0.4) for (const [mx, my] of manos) for (let k = 0; k < 6; k++) { const an = k * 1.05; R.pset(Math.round(mx + Math.cos(an) * 5), Math.round(my + Math.sin(an) * 5), BL); }
};
// ── 5 · de lejos: el árbol de luz ──
const SEG = []; { const X = (x) => 150 + (x - 150) * 1.75; const rama = (x, y, an, l, d, o) => { const x1 = x + Math.cos(an) * l, y1 = y + Math.sin(an) * l; SEG.push({ x: X(x), y, x1: X(x1), y1, d, o }); if (d < 6) for (const s of [-1, 1]) rama(x1, y1, an + s * (0.62 + 0.04 * d) + (hh(d, o, s) - 0.5) * 0.2, l * 0.8, d + 1, o * 2 + (s > 0 ? 1 : 0)); }; rama(150, 124, -Math.PI / 2, 26, 0, 1); }
const ARB = () => {
  pintaVacio(8);
  // trozos del telar roto que flotan
  for (const [x, y, an] of [[30, 40, 0.3], [286, 92, -0.5], [60, 132, 1.2], [250, 150, 0.8]]) { const dx = Math.cos(an) * 10, dy = Math.sin(an) * 10; trazo([[x - dx, y - dy], [x + dx, y + dy]], hex('#8a6a3a'), 1.5); R.linea(x - dx, y - dy - 1, x + dx, y + dy - 1, hex('#e8b830')); }
  // la isla de roca con el trono diminuto
  R.poligono([[104, 156], [196, 156], [180, 168], [160, 180], [128, 176], [114, 166]], KK); R.poligono([[106, 157], [194, 157], [179, 167], [160, 178], [129, 175], [115, 165]], hex('#4a3a5a'));
  for (let x = 106; x < 194; x++) { R.pset(x, 157, hex('#8a7a9a')); if (hh(x, 3) > 0.8) R.pset(x, 160 + Math.floor(hh(x, 4) * 10), hex('#e8c060')); }
  R.rect(140, 150, 160, 157, KK); R.rect(141, 151, 159, 156, hex('#6a4a18')); R.rect(141, 151, 159, 151, hex('#e8c060'));
};
const p5 = (t) => {
  fondo('arbol5', ARB);
  vidaVacio(t, 8, 18);
  const g = lerp(0.3, 1, tramo(t, P5 - 0.2, arbolT - 0.2)), luz = tramo(t, arbolT - 0.1, arbolT + 0.3) - tramo(t, arbolT + 0.6, arbolT + 1.4);
  // el tronco: dos hebras que suben de las manos de Loki y se trenzan
  for (const s of [-1, 1]) { const pts = []; for (let k = 0; k <= 20; k++) { const u = k / 20; pts.push([150 + s * (5 * (1 - u)) + Math.sin(u * 9 + s + t * 2) * 2 * (1 - u), 144 - u * 20]); } trazo(pts, hex('#6ae08a'), 1.5, hex('#1a4a2a')); }
  const vis = SEG.map((q) => { const s0 = q.d / 7, e = tramo(g, s0, s0 + 1 / 7); return e > 0 ? [q.x, q.y, q.x + (q.x1 - q.x) * e, q.y + (q.y1 - q.y) * e, e] : null; });
  // el halo verde de las ramas y luego el alma de luz
  SEG.forEach((q, i) => { const v = vis[i]; if (!v) return; const w = Math.max(0.5, 3.2 - q.d * 0.45); const n = Math.ceil(Math.hypot(v[2] - v[0], v[3] - v[1])); for (let k = 0; k <= n; k += 2) { const x = v[0] + (v[2] - v[0]) * k / Math.max(1, n), y = v[1] + (v[3] - v[1]) * k / Math.max(1, n); for (let j = 0; j < 6; j++) { const px = Math.round(x + (hh(k, j, i) - 0.5) * (w + 5) * 2), py = Math.round(y + (hh(j, k, i) - 0.5) * (w + 5) * 2); if (0.5 > bay(px, py)) R.pset(px, py, mez(R.pget(px, py), hex('#3ac88a'), 0.3)); } } });
  SEG.forEach((q, i) => { const v = vis[i]; if (!v) return; const col = q.d % 2 ? hex('#ffd860') : hex('#6ae08a'), w = Math.max(0, 2.6 - q.d * 0.42); trazo([[v[0], v[1]], [v[2], v[3]]], luz > 0.3 ? mez(col, BL, luz) : col, w, hex('#163a2a'));
    if (q.d === 6 && v[4] >= 1) mundito(Math.round(q.x1), Math.round(q.y1), 3, hex(['#3a8ae8', '#e86a8a', '#f0a040', '#6ad0c0'][q.o % 4]), hex('#3ac85a'), t, q.o); });
  // pulsos de luz que suben por las ramas
  for (let k = 0; k < 18; k++) { const q = SEG[(k * 7 + Math.floor(t * 2)) % SEG.length], u = (t * 1.5 + k * 0.3) % 1; if (tramo(g, q.d / 7, (q.d + 1) / 7) < 1) continue; const x = Math.round(q.x + (q.x1 - q.x) * u), y = Math.round(q.y + (q.y1 - q.y) * u); if (x > 268 && y < 50) continue; R.pset(x, y, BL); R.pset(x + 1, y, hex('#fff6c0')); }
  if (luz > 0) R.halo(150, 70, 90, [hex('#3a2a5a'), hex('#5a4a7a')], luz * 0.6);
  // el Loki diminuto en su trono: cuernos dorados, capa verde
  const lx = 150, ly = 150;
  R.rect(lx - 3, ly - 9, lx + 3, ly - 1, KK); R.rect(lx - 2, ly - 8, lx + 2, ly - 2, hex('#2a7a3a')); R.rect(lx - 2, ly - 12, lx + 2, ly - 9, hex('#f0c8a0')); R.rect(lx - 2, ly - 13, lx + 2, ly - 13, hex('#1c1424'));
  R.pset(lx - 3, ly - 14, hex('#f0c040')); R.pset(lx - 4, ly - 15, hex('#f0c040')); R.pset(lx + 3, ly - 14, hex('#f0c040')); R.pset(lx + 4, ly - 15, hex('#f0c040')); R.pset(lx - 4, ly - 16, hex('#fff2b0')); R.pset(lx + 4, ly - 16, hex('#fff2b0'));
  R.rect(lx - 6, ly - 4, lx - 4, ly - 1, hex('#e8c060')); R.rect(lx + 4, ly - 4, lx + 6, ly - 1, hex('#e8c060'));
};
// ── 6 · el póster de los cuernos ──
const cuernos = (cx, cy, s, oro, oroL) => {
  // el casco de cuernos: dos cuernos largos que salen de las sienes, se abren y suben curvándose; la banda y la nariguera
  const P = (d, u) => [cx + d * (6 + 22 * u - 13 * u * u) * s, cy + 2 * s - 30 * Math.pow(u, 1.15) * s];
  for (const pasada of [0, 1]) for (const d of [-1, 1]) for (let j = 0; j <= 30; j++) { const u = j / 30, [x, y] = P(d, u), r = Math.max(0.7, (3.6 - u * 2.9) * s); R.disco(x, y, r + (pasada ? 0 : 1), pasada ? (u < 0.35 ? oro : d * (x - cx) > 0 && u > 0.6 ? oroL : mez(oro, oroL, u)) : KK); }
  for (const d of [-1, 1]) for (let j = 2; j <= 24; j += 3) { const [x, y] = P(d, j / 30); R.pset(Math.round(x - d * s), Math.round(y), mez(oro, KK, 0.35)); }
  R.disco(cx, cy + 5 * s, 9 * s + 1, KK); R.disco(cx, cy + 5 * s, 9 * s, oro); R.disco(cx, cy + 7 * s, 7 * s, hex('#123a22')); R.rect(cx - 9 * s, cy + 7 * s, cx + 9 * s, cy + 15 * s, hex('#123a22'));
  R.rect(cx - 1 * s, cy + 2 * s, cx + 1 * s, cy + 11 * s, oro); R.disco(cx - 4 * s, cy + 1 * s, 1.5 * s, oroL);
};
const CUARTO = () => {
  // la pared de noche: papel azul con estrellitas; arriba a la derecha, lisa
  for (let y = 0; y < 134; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x > 268 && y < 50 ? hex('#2a2e5a') : ((x + (y >> 4) * 8) % 16 === 0 && y % 16 === 4) ? hex('#4a4e8a') : (x % 32 < 1) ? hex('#262a52') : hex('#2e3262'));
  // la ventana con la ciudad de noche y la luna
  caja(4, 26, 60, 98, hex('#5a3a2a'), hex('#8a5a3a'), hex('#3a2010'));
  rampa(8, 30, 56, 94, ['#0a1030', '#1a2450', '#2a3a6a'].map(hex)); R.disco(20, 42, 5, hex('#f6f0d0'));
  for (let x = 8; x <= 56; x += 6) { const h = 72 + Math.floor(hh(x, 1) * 14); R.rect(x, h, x + 5, 94, hex('#141a34')); for (let y = h + 3; y < 94; y += 4) if (hh(x, y) > 0.5) R.pset(x + 2, y, hex('#f8d870')); }
  R.rect(31, 30, 32, 94, hex('#5a3a2a')); R.rect(8, 61, 56, 62, hex('#5a3a2a'));
  for (const x0 of [0, 54]) for (let y = 22; y < 104; y++) for (let x = x0; x < x0 + 10; x++) R.pset(x, y, (x + Math.floor(y / 3)) % 4 ? hex('#8a2a3a') : hex('#6a1a2a'));
  // la balda con figuritas: el cubo azul, un casco, el arbolito dorado y libros
  caja(196, 64, 266, 70, hex('#8a5a30'), hex('#b07a44'), hex('#5a3418'));
  caja(200, 54, 208, 63, hex('#3a8ae8'), hex('#c8f0ff'), hex('#1a4aa8'));
  for (const [x, c] of [[214, '#d82a2a'], [219, '#3a6ac8'], [224, '#e8b830'], [229, '#3ac85a']]) caja(x, 48, x + 4, 63, hex(c), mez(hex(c), BL, 0.4), mez(hex(c), KK, 0.4));
  R.rect(242, 60, 243, 63, hex('#c89020')); R.disco(243, 56, 4, hex('#3ac85a')); R.pset(241, 54, hex('#a8f0b8'));
  caja(250, 56, 262, 63, hex('#6a6e7a'), hex('#a8acb8'), hex('#3a3e4a')); R.rect(254, 58, 258, 59, hex('#3ad0ff'));
  // el escritorio: tablero con vetas, cómics, la caja de chinchetas, la taza
  for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + y * 0.7 + Math.sin(x * 0.02) * 2); R.pset(x, y, y < 138 ? hex('#c88a4a') : v > 0.8 ? hex('#6a3e1e') : hex('#8a5a30')); }
  R.rect(0, 133, 319, 133, KK); R.rect(0, 138, 319, 138, hex('#5a3418'));
  for (let k = 0; k < 4; k++) caja(20 + k, 128 - k * 3, 62 + k, 132 - k * 3, hex(['#d82a2a', '#3a6ac8', '#e8b830', '#3ac85a'][k]), BL, KK);
  caja(76, 126, 92, 134, hex('#e8e4d8'), BL, hex('#a8a498')); for (let k = 0; k < 5; k++) R.pset(79 + k * 3, 129, hex(['#d82a2a', '#3a6ac8', '#e8b830', '#3ac85a', '#d82a2a'][k]));
  caja(294, 118, 308, 134, hex('#3a6ac8'), hex('#6a9ae8'), hex('#1a3a8a')); R.rect(308, 122, 311, 130, KK);
  // la libreta con un garabato de árbol, un lápiz, palomitas sueltas y el móvil
  R.poligono([[20, 150], [76, 146], [80, 172], [24, 176]], KK); R.poligono([[21, 151], [75, 147], [79, 171], [25, 175]], hex('#f6f2e6')); for (let k = 0; k < 6; k++) R.pset(23, 154 + k * 3, hex('#a8a498'));
  R.linea(50, 170, 50, 158, hex('#3a6ac8')); R.linea(50, 160, 42, 152, hex('#3a6ac8')); R.linea(50, 160, 58, 152, hex('#3a6ac8')); R.linea(46, 156, 44, 150, hex('#3a6ac8')); R.linea(54, 156, 57, 150, hex('#3a6ac8'));
  R.linea(86, 166, 116, 156, KK); R.linea(86, 165, 115, 155, hex('#e8b830')); R.pset(116, 155, hex('#f0a0a0'));
  for (const [x, y] of [[130, 160], [137, 166], [146, 158], [262, 168], [270, 162], [180, 170]]) { R.disco(x, y, 2, hex('#fff4c8')); R.pset(x - 1, y - 1, BL); R.pset(x + 1, y + 1, hex('#e8c870')); }
  caja(286, 150, 312, 166, hex('#1a1a24'), hex('#3a3a4a'), KK); R.rect(289, 153, 309, 163, hex('#2a3a6a')); R.rect(296, 156, 302, 160, hex('#e8b830'));
  for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) if ((y - 160) / 40 > bay(x, y)) R.pset(x, y, mez(R.pget(x, y), KK, 0.2));
  // el flexo y su luz
  R.rect(268, 128, 284, 133, KK); R.rect(269, 129, 283, 132, hex('#d8d8e0')); R.linea(276, 128, 266, 100, hex('#a8acb8')); R.linea(266, 100, 250, 96, hex('#a8acb8')); R.poligono([[240, 92], [256, 92], [252, 100], [244, 100]], hex('#e83a3a')); R.disco(248, 101, 2, hex('#fff6c8'));
};
const p6 = (t) => {
  fondo('cuarto6', CUARTO);
  tinta(150, 96, 319, 179, hex('#fff0b0'), 0.75, 248, 140, 80);
  // la guirnalda de bombillas que cambia de color
  for (let k = 0; k <= 22; k++) { const x = 68 + k * 9, y = 18 + Math.round(Math.sin(k / 22 * Math.PI) * 8); R.pset(x, y - 1, hex('#1a1a1a')); if (x < 266) { R.disco(x, y + 1, 1.5, hex(['#ff5a5a', '#5ad0ff', '#ffd85a', '#7aff7a'][(k + Math.floor(t * 2)) % 4])); } }
  for (let x = 68; x < 266; x++) R.pset(x, 17 + Math.round(Math.sin((x - 68) / 198 * Math.PI) * 8), hex('#1a1a1a'));
  // el póster: fondo verde con estrellas, el árbol de luz tenue y los cuernos dorados
  const X0 = 86, Y0 = 26, X1 = 178, Y1 = 122;
  caja(X0, Y0, X1, Y1, hex('#123a22'), hex('#2a6a42'), hex('#0a2414'));
  rampa(X0 + 2, Y0 + 2, X1 - 2, Y1 - 2, ['#0e2a1a', '#123a22', '#1e5a32'].map(hex));
  for (let k = 0; k < 30; k++) R.pset(X0 + 3 + Math.floor(hh(k, 71) * 86), Y0 + 3 + Math.floor(hh(k, 72) * 90), k % 4 ? hex('#5aa07a') : BL);
  for (const s of [-1, 1]) for (const [l, d] of [[20, 0.5], [30, 0.9], [14, 1.3]]) R.linea(132, 112, Math.round(132 + s * Math.sin(d) * l * 1.4), Math.round(112 - Math.cos(d) * l * 2.2), hex('#2a7a4a'));
  cuernos(132, 76, 1.3, hex('#e8b830'), hex('#fff0a0'));
  for (let i = 0; i < 4; i++) { const u = ((t * 0.5 + i * 0.25) % 1); R.pset(Math.round(112 + u * 40), Math.round(54 + Math.sin(u * 6 + i) * 3), BL); }
  // celo en las esquinas; la de abajo a la derecha se levanta hasta que la clavan
  for (const [x, y] of [[X0, Y0], [X1, Y0], [X0, Y1]]) R.rect(x - 3, y - 2, x + 3, y + 1, hex('#e8f0e8'));
  const clava = tramo(t, P6 + 0.6, P6 + 1.0);
  if (clava < 1) { const l = Math.round(10 * (1 - clava)); R.poligono([[X1 - l, Y1], [X1, Y1 - l], [X1 - l + 2, Y1 - l + 2]], hex('#e8e4d8')); R.poligono([[X1 - l, Y1 + 1], [X1 + 1, Y1 - l], [X1 + 1, Y1 + 1]], hex('#2e3262')); }
  else { R.disco(X1 - 2, Y1 - 2, 2, hex('#d82a2a')); R.pset(X1 - 3, Y1 - 3, BL); }
  // las pegatinas: el visto bueno en «confirmed» y la máscara en «Doomsday»
  const v1 = tramo(t, confirmado, confirmado + 0.2), v2 = tramo(t, doomT, doomT + 0.2);
  if (v1 > 0) { const r = Math.round(9 * v1); R.disco(162, 104, r + 1, KK); R.disco(162, 104, r, hex('#3ac85a')); if (v1 >= 1) { R.linea(157, 104, 160, 108, BL); R.linea(158, 104, 161, 108, BL); R.linea(160, 108, 167, 99, BL); R.linea(161, 108, 168, 99, BL); } }
  if (v2 > 0) { R.disco(104, 102, Math.round(13 * v2) + 1, KK); R.disco(104, 102, Math.round(13 * v2), hex('#2a6a3a')); R.disco(104, 102, Math.round(11 * v2), hex('#3a8a4a')); if (v2 >= 1) T.e_mascara(R, 104, 103, 2, { ojos: 1 }); }
  // las palomitas, en el escritorio: clavan la esquina, señalan y saltan de emoción
  const emo = t > confirmado;
  T.palomitas(R, 214, 138, t, { s: 2, dir: -1, señala: t < confirmado ? (t < P6 + 1.2 ? [X1, Y1] : [140, 80]) : undefined, expresion: emo ? 'emocion' : 'normal', salta: emo ? tramo(t, doomT, doomT + 0.9) : 0 });
};
// ── 7 · la figura del guardián en el escritorio ──
const FIG = () => {
  // la pared de noche desenfocada, con las bombillas de la guirnalda como círculos de luz; arriba a la derecha, lisa
  rampa(0, 0, 319, 112, ['#1e2248', '#262a56', '#2e3262', '#363a6a'].map(hex));
  for (const [x, y, r, c] of [[24, 30, 9, '#ff5a5a'], [70, 22, 8, '#5ad0ff'], [118, 34, 10, '#ffd85a'], [176, 26, 8, '#7aff7a'], [226, 40, 9, '#ff5a5a'], [44, 76, 7, '#ffd85a'], [196, 84, 8, '#5ad0ff'], [252, 70, 7, '#7aff7a']]) for (let yy = y - r; yy <= y + r; yy++) for (let xx = x - r; xx <= x + r; xx++) { const d = Math.hypot(xx - x, yy - y) / r; if (d < 1 && (1 - d) * 0.9 + 0.15 > bay(xx, yy)) R.pset(xx, yy, mez(R.pget(xx, yy), hex(c), d < 0.6 ? 0.5 : 0.3)); }
  // la esquina del póster verde y el canto de la balda
  caja(-2, 40, 60, 108, hex('#123a22'), hex('#2a6a42'), hex('#0a2414')); for (let k = 0; k < 10; k++) R.pset(4 + Math.floor(hh(k, 91) * 50), 46 + Math.floor(hh(k, 92) * 56), hex('#5aa07a'));
  caja(200, 96, 330, 104, hex('#8a5a30'), hex('#b07a44'), hex('#5a3418'));
  // el tablero del escritorio de cerca: vetas y luz del flexo
  for (let y = 110; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.03 + y * 0.45 + Math.sin(x * 0.011 + y * 0.05) * 3); R.pset(x, y, v > 0.85 ? hex('#6a3e1e') : v > 0.3 ? hex('#8a5a30') : hex('#9a6a3a')); }
  R.rect(0, 109, 319, 110, hex('#c88a4a')); tinta(60, 110, 300, 179, hex('#fff0b0'), 0.7, 160, 140, 120);
  // cómic abierto, las gafas 3D, la taza y el móvil
  R.poligono([[8, 150], [62, 144], [70, 176], [12, 180]], KK); R.poligono([[9, 151], [61, 145], [69, 175], [13, 179]], hex('#f6f2e6')); R.linea(38, 147, 41, 177, hex('#a8a498'));
  for (const [x, y, w, h, c] of [[14, 154, 20, 10, '#d82a2a'], [44, 152, 18, 12, '#3a6ac8'], [16, 168, 20, 8, '#e8b830'], [44, 166, 20, 9, '#3ac85a']]) caja(x, y, x + w, y + h, hex(c), mez(hex(c), BL, 0.3), mez(hex(c), KK, 0.3));
  R.rect(84, 160, 112, 162, KK); R.rect(86, 156, 96, 164, KK); R.rect(100, 156, 110, 164, KK); R.rect(87, 157, 95, 163, hex('#e83a3a')); R.rect(101, 157, 109, 163, hex('#3a8ae8'));
  caja(270, 120, 292, 146, hex('#e8e4d8'), BL, hex('#a8a498')); R.rect(292, 126, 297, 138, KK); R.rect(293, 127, 295, 137, hex('#e8e4d8')); R.rect(271, 121, 291, 123, hex('#5a3418'));
  // el calendario de mesa con el 18 (el estreno) y el bote de lápices
  R.poligono([[78, 146], [114, 146], [110, 116], [82, 116]], KK); R.poligono([[79, 145], [113, 145], [109, 117], [83, 117]], hex('#f6f2e6')); R.rect(83, 117, 109, 123, hex('#d82a2a')); for (const x of [88, 104]) R.rect(x, 114, x + 1, 119, hex('#3a3a4a'));
  R.numero('18', 96, 141, { centro: true, rampa: [hex('#1a1014'), hex('#3a3040')] });
  caja(244, 128, 258, 146, hex('#3a6ac8'), hex('#6a9ae8'), hex('#1a3a8a')); for (const [x, c] of [[247, '#e8b830'], [251, '#d82a2a'], [255, '#3ac85a']]) { R.rect(x, 116, x + 1, 128, hex(c)); R.pset(x, 115, KK); }
  // la figura: peana verde con filo dorado y el botón rojo
  R.disco(150, 150, 0, KK); for (let y = 140; y <= 156; y++) { const w = Math.round(34 * Math.sqrt(Math.max(0, 1 - ((y - 148) / 9) ** 2))); R.rect(150 - w, y, 150 + w, y, KK); if (w > 1) R.rect(151 - w, y, 149 + w, y, y < 146 ? hex('#2a7a4a') : hex('#1a4a2a')); }
  for (let x = 118; x <= 182; x++) R.pset(x, 146 + Math.round(Math.sqrt(Math.max(0, 1 - ((x - 150) / 32) ** 2)) * 3), hex('#e8c060'));
  // el trono de juguete
  caja(140, 106, 160, 140, hex('#c89020'), hex('#f0d060'), hex('#8a5a10')); for (let y = 110; y < 138; y += 4) R.rect(143, y, 157, y, hex('#a87018'));
};
const p7 = (t) => {
  fondo('figura', FIG);
  // el árbol de alambre con sus luces, que se encienden una a una en «guardian»
  const enc = tramo(t, guardian - 0.2, guardian + 1.2);
  const RAM = [[150, 106, 150, 70], [150, 92, 122, 70], [150, 92, 178, 70], [150, 80, 130, 52], [150, 80, 170, 52], [122, 70, 100, 58], [178, 70, 200, 58], [150, 70, 150, 40], [130, 52, 118, 36], [170, 52, 182, 36], [122, 70, 110, 80], [178, 70, 190, 80]];
  RAM.forEach(([x0, y0, x1, y1], k) => { trazo([[x0, y0], [x1, y1]], hex('#e8c060'), 0.6, hex('#6a4a10')); const on = enc * RAM.length > k; R.disco(x1, y1, 3, KK); R.disco(x1, y1, 2, on ? hex(['#6ae08a', '#ffd860', '#6ad0e8', '#e86a8a'][k % 4]) : hex('#4a4a5a')); if (on) { R.pset(x1 - 1, y1 - 1, BL); if (Math.sin(t * 6 + k) > 0.3) R.halo(x1, y1, 7, [hex('#3a5a4a'), hex('#5a8a6a')], 0.9); } });
  // la figurita de Loki en su trono (de plástico: no se mueve) y el botón
  R.actor(EL.loki, 143, 140, t, { dir: 1, quieto: true, sonrisa: true });
  R.rect(144, 133, 156, 140, hex('#e8c060')); R.rect(144, 133, 156, 133, hex('#fff0a0'));
  const pulsa = t > guardian - 0.25 && t < guardian + 0.15;
  R.rect(172, 148, 180, 151, KK); R.rect(173, pulsa ? 149 : 147, 179, 150, hex('#d82a2a')); R.pset(174, pulsa ? 149 : 147, hex('#ff8a8a'));
  // en «something to say», la figura «habla»
  if (t > decir - 0.25) { const b = tramo(t, decir - 0.25, decir), by = Math.round(lerp(100, 88, b)); caja(160, by - 18, 176, by, BL, BL, hex('#c8c8d8')); R.poligono([[162, by], [168, by], [158, by + 6]], BL); R.linea(162, by, 158, by + 6, KK); R.icono('!', 166, by - 15, hex('#d82a2a'), hex('#c8c8d8'), 2); }
  // las palomitas: llegan, pulsan el botón y asienten
  const atras = tramo(t, guardian + 0.4, guardian + 1.3), px = Math.round(lerp(196, 214, atras));
  const P = T.palomitas(R, px, 170, t, { s: 2, dir: -1, anda: atras > 0 && atras < 1, señala: t < guardian + 0.4 ? [178, 148] : undefined, asiente: t > guardian + 0.6, expresion: t > decir - 0.25 ? 'emocion' : 'normal' });
};
const año = (t) => t < P3 ? 2021 : t < P6 ? 2023 : 2025;
const efectos = [[1.6, 'zumbido'], [control, 'aviso'], [nace - 0.4, 'brillo'], [infinitas, 'pop'], [heroes, 'pop'], [villanos, 'golpecito'], [telarT, 'zumbido'], [rompe, 'trueno'], [sienta, 'golpecito'], [sostieneT, 'brillo'], [arbolT, 'brillo'], [P6 + 1.0, 'toc'], [confirmado, 'pop'], [doomT, 'brillo'], [guardian, 'bip'], [decir - 0.25, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')
