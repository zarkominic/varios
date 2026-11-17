E = {}

# piezas de las dos escenas: tramas, cielo de noche en búfer, nubes de tres tonos, globos con icono, chapas con número,
# polillas, murciélagos, luciérnagas y el lápiz en la mano (con T.brazo, nunca un brazo propio)
PRE = r'''
const K = hex('#17151d'), BL = hex('#f6f2ea');
const cl = (u) => Math.max(0, Math.min(1, u));
const ease = (u) => { u = cl(u); return u * u * (3 - 2 * u); };
const hs = (a, b, k = 0) => { const s = Math.sin(a * 127.1 + b * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const tono = (cs, f, x, y) => cs[Math.max(0, Math.min(cs.length - 1, Math.floor(cl(f) * (cs.length - 1) + bay(x, y))))];
const mez = (a, b, k) => { let r = 0; for (const sh of [0, 8, 16]) r |= Math.round(((a >>> sh) & 255) * (1 - k) + ((b >>> sh) & 255) * k) << sh; return (r | 0xff000000) >>> 0; };
const tinta = (x, y, c, f) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mez(R.pget(x, y), c, f)); };
const tranquila = (x, y) => (x >= 274 && y <= 48) || (x >= 16 && x <= 174 && y <= 22);
// una curva de tiempo por puntos [[t, v], …] con entrada y salida suaves
const curva = (t, pts) => { if (t <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (t <= pts[i][0]) { const [a, va] = pts[i - 1], [b, vb] = pts[i]; return va + (vb - va) * ease((t - a) / Math.max(1e-6, b - a)); } return pts[pts.length - 1][1]; };
// un búfer que se pinta una vez (lo fijo de un fondo local) y se copia en cada fotograma
const fijo = (() => { const B = {}; return (k, f) => { if (!B[k]) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); B[k] = b; } R.copiar(B[k]); }; })();
// cielo de noche tramado (cinco tonos, estrellas de tres tamaños, una Vía Láctea tenue)
const NOCHE = ['#070a1a', '#0c1228', '#121a38', '#1a2448', '#24305a', '#2e3c6a'].map(hex);
const cieloNoche = (x0, y0, x1, y1, sem, via = true) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let f = (y - y0) / Math.max(1, y1 - y0) * 0.95; if (via) { const d = Math.abs((x - x0) * 0.42 - (y - y0) - 40 + Math.sin(x * 0.05) * 8); if (d < 26) f += (1 - d / 26) * 0.22 * (0.6 + hs(x >> 2, y >> 2, sem) * 0.6); } R.pset(x, y, tono(NOCHE, f, x, y)); }
  for (let k = 0; k < (x1 - x0) * (y1 - y0) / 90; k++) { const x = x0 + Math.floor(hs(k, 1, sem) * (x1 - x0)), y = y0 + Math.floor(hs(k, 2, sem) * (y1 - y0)); if (tranquila(x, y) && hs(k, 3, sem) > 0.3) continue; const b = hs(k, 4, sem);
    R.pset(x, y, b > 0.9 ? hex('#ffffff') : b > 0.6 ? hex('#c8d4f0') : b > 0.3 ? hex('#8a9ac8') : hex('#5a6a98'));
    if (b > 0.965 && !tranquila(x, y)) { R.pset(x - 1, y, hex('#6a7ab0')); R.pset(x + 1, y, hex('#6a7ab0')); R.pset(x, y - 1, hex('#6a7ab0')); R.pset(x, y + 1, hex('#6a7ab0')); } }
};
// estrellas que titilan (encima del cielo fijo)
const titilan = (t, x0, y0, x1, y1, n, sem) => { for (let k = 0; k < n; k++) { const x = x0 + Math.floor(hs(k, 5, sem) * (x1 - x0)), y = y0 + Math.floor(hs(k, 6, sem) * (y1 - y0)); if (tranquila(x, y)) continue; const s = Math.sin(t * (2 + hs(k, 7, sem) * 3) + k); if (s > 0.7) { R.pset(x, y, BL); if (s > 0.93) { R.pset(x - 1, y, hex('#8a9ac8')); R.pset(x + 1, y, hex('#8a9ac8')); } } } };
// nubes de noche de tres tonos a tres velocidades (luz de luna arriba, sombra abajo)
const NUBE = [hex('#2a3458'), hex('#3c4874'), hex('#5a6894'), hex('#8a96b8')];
const nubes = (t, x0, x1, y0, y1, n, sem, P = NUBE) => {
  const an = x1 - x0 + 90;
  for (let k = 0; k < n; k++) { const capa = k % 3, v = [1.1, 2.2, 3.6][capa], w = 14 + hs(k, 1, sem) * 20 + capa * 4, hh = 3 + hs(k, 2, sem) * 3 + capa;
    const cx = x0 - 45 + ((hs(k, 3, sem) * an + t * v) % an), cy = y0 + hs(k, 4, sem) * (y1 - y0);
    for (let dy = -hh; dy <= hh; dy++) for (let dx = -w; dx <= w; dx++) { const d = (dx / w) ** 2 + (dy / hh) ** 2 + Math.sin(dx * 0.6 + k) * 0.08; if (d > 1) continue;
      const x = Math.round(cx + dx), y = Math.round(cy + dy); if (x < x0 || x > x1 || y < y0 || y > y1 || tranquila(x, y)) continue;
      if (d > 0.8 && bay(x, y) > 0.5) continue; const f = (dy + hh) / (2 * hh); R.pset(x, y, f < 0.25 ? P[3] : f < 0.55 ? P[2] : f < 0.85 ? P[1] : P[0]); } }
};
// una chapa redonda con su número (1, 2, 3…) que sale con un saltito
const chapa = (x, y, n, e = 1, c = hex('#2a2a40'), fondo = BL) => { if (e <= 0) return; const r = Math.round(6 * Math.min(1, e * 1.4)); R.disco(x, y + 1, r + 1, K); R.disco(x, y, r + 1, K); R.disco(x, y, r, fondo); if (e > 0.5) R.numero(String(n), x + 1, y + 4, { centro: true, color: c, sombra: false }); };
// un bocadillo blanco con un icono ('?', '!', 'reloj', 'X'…) que sale con un saltito
const globo = (x, y, ic, c, e = 1, G = 1) => { if (e <= 0) return; if (G > 1) { const r = Math.round(9 * Math.min(1, e * 1.3)); R.disco(x, y, r + 1, K); R.disco(x, y, r, BL); R.linea(x - 6, y + r, x - 4, y + r + 3, K); R.pset(x - 5, y + r, BL); if (e > 0.6) R.icono(ic, x - (ic === '!' ? 3 : 5), y - 6, c, null, 2); return; } const r = Math.round(6 * Math.min(1, e * 1.3)); R.disco(x, y, r + 1, K); R.disco(x, y, r, BL); R.pset(x - 4, y + r + 1, K); R.pset(x - 3, y + r, BL); R.pset(x - 3, y + r + 1, K); if (e > 0.6) R.icono(ic, x - (ic === '?' || ic === 'X' ? 2 : ic === '!' ? 1 : 3), y - 3 - (ic === 'reloj' ? 1 : 0), c, null, 1); };
const destello = (x, y, r, c = BL) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } };
const polilla = (cx, cy, t, k, r = 6) => { const a = t * (5 + k) + k * 2.1, x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a * 1.3) * r * 0.6); R.pset(x, y, hex('#e8dcc0')); if (Math.sin(t * 40 + k) > 0) { R.pset(x - 1, y - 1, hex('#bfb090')); R.pset(x + 1, y - 1, hex('#bfb090')); } };
const murcielago = (x, y, t, k) => { x = Math.round(x); y = Math.round(y); if (tranquila(x, y)) return; const ar = Math.sin(t * 22 + k * 2) > 0, N = hex('#0a0810');
  R.rect(x - 1, y, x + 1, y + 1, N); R.pset(x - 1, y - 1, N); R.pset(x + 1, y - 1, N);
  if (ar) { R.linea(x - 2, y, x - 5, y - 3, N); R.linea(x + 2, y, x + 5, y - 3, N); } else { R.linea(x - 2, y + 1, x - 6, y + 2, N); R.linea(x + 2, y + 1, x + 6, y + 2, N); } };
const luciernagas = (t, x0, x1, y0, y1, n, sem) => { for (let k = 0; k < n; k++) { const s = Math.sin(t * (1.5 + hs(k, 1, sem)) + k * 2); if (s < 0.2) continue; const x = Math.round(x0 + hs(k, 2, sem) * (x1 - x0) + Math.sin(t * 0.7 + k) * 6), y = Math.round(y0 + hs(k, 3, sem) * (y1 - y0) + Math.cos(t * 0.9 + k) * 3); R.pset(x, y, s > 0.75 ? hex('#f8ff9a') : hex('#a8c050')); if (s > 0.85) { tinta(x - 1, y, hex('#f8ff9a'), 0.4); tinta(x + 1, y, hex('#f8ff9a'), 0.4); } } };
// vapor de una taza
const vapor = (t, x, y, k = 0) => { for (let i = 0; i < 4; i++) { const q = (t * 0.7 + i / 4 + k * 0.13) % 1; tinta(x + Math.sin(q * 6 + i + k) * 1.6, y - q * 11, hex('#f0f0f4'), 0.55 * (1 - q)); } };
// un lápiz (de color c) en línea de la mano (hx, hy) a la punta (px, py)
const lapiz = (hx, hy, px, py, c) => { const L = Math.hypot(hx - px, hy - py), ux = (hx - px) / L, uy = (hy - py) / L;
  for (let s = 0; s <= L; s += 0.5) { const x = px + ux * s, y = py + uy * s; const col = s < 2 ? hex('#3a3a48') : s < 5 ? hex('#e8c89a') : c; R.pset(Math.round(x), Math.round(y), col); R.pset(Math.round(x - uy), Math.round(y + ux), s < 5 ? hex('#c8a070') : mez(c, K, 0.35)); } };
// la madera de una mesa con vetas y nudos (en un búfer)
const madera = (x0, y0, x1, y1, sem, C = ['#4a2c18', '#5e3a20', '#70482a', '#86583a', '#9a6a46'].map(hex)) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = Math.sin(y * 0.55 + Math.sin(x * 0.045 + y * 0.02) * 2.4 + hs(y >> 3, 1, sem) * 3) * 0.5 + 0.5; const f = 0.25 + v * 0.45 + (hs(x >> 4, y >> 1, sem) - 0.5) * 0.1; R.pset(x, y, tono(C, f, x, y)); }
  for (let k = 0; k < 5; k++) { const cx = x0 + hs(k, 1, sem + 3) * (x1 - x0), cy = y0 + hs(k, 2, sem + 3) * (y1 - y0); for (let a = 0; a < 6.28; a += 0.2) { R.pset(Math.round(cx + Math.cos(a) * 4), Math.round(cy + Math.sin(a) * 1.6), C[0]); } R.pset(Math.round(cx), Math.round(cy), C[0]); }
};
'''

E['wo-sagitario'] = ('Sagitario', '''// WO-SAGITARIO (frase 14), año 1977. Un canal estrechísimo junto al hidrógeno; casi todo en el cielo emite ancho,
// como estática; algo tan estrecho se parecía a nuestras emisoras; venía de Sagitario. Cuatro planos:
// 1. (0) la radio antigua de cerca (2.º uso, otro estado: la aguja aparcada a la izquierda): una mano entra con una
//    lupa por la derecha, pasa por encima de las manchas anchas (dentro de la lupa se ven el doble de anchas) y en
//    «very narrow» se para sobre la raya fina del 1420: dentro, una sola raya de un píxel entre las manchas; en
//    «hydrogen» el átomo de encima se enciende con un halo y su electrón deja estela. Una polilla ronda el cristal.
// 2. («Almost everything», 5,25) el espacio (2.º uso): de la nube, del magnetar y de dos galaxias lejanas salen ondas
//    ANCHAS hechas de siete colores a la vez (el arco iris de frecuencias), cada vez más; en «many frequencies» se
//    llenan y en «static» todo chisporrotea con nieve de estática un momento.
// 3. («In 1977», 10,36) el estudio de una emisora de 1977 por dentro: discos en la estantería, el corcho, el reloj,
//    la mesa con dos platos y el mezclador, el magnetófono, el bastidor del transmisor con su osciloscopio; por la
//    ventana (recortada) el pueblo de noche y la torre con su luz roja. El locutor pone la aguja en el disco, el piloto
//    rojo de «en el aire» se enciende, habla al micro («something that narrow»: en el osciloscopio, un solo pico fino
//    que late) y en «transmitters» señala la ventana: la torre emite anillos finos de un solo color. El gato duerme
//    en el bastidor y mueve la cola; pasa un coche por la carretera.
// 4. («It came from», 15,3) el cielo de verano sobre el campo de Ohio: entran dos voluntarios por el camino (ella con
//    un mapa del cielo, él con la linterna); en «direction» él apunta arriba y un trazo de puntos sube desde la gran
//    oreja diminuta; en «Sagittarius» las líneas de la tetera se encienden y ella sonríe.''', PRE + r'''
const ts = (s) => en('sagitario', (s - 0.5) / 17.244);
const P2 = ts(5.25), P3 = ts(10.36), P4 = ts(15.3);
// ── 1 · la lupa sobre el dial ─────────────────────────────────────────────────────────────────────────────────────
const NARROW = ts(1.9), HIDRO = ts(3.9), SINGLE = ts(1.2);
const p1 = (t) => {
  const o = { encuadre: 'sagitario', camara: 'dial', aguja: 0 };
  const g = T.cielo2(R, t, o);
  // la lupa: entra por la derecha, pasa por las manchas y se para sobre la raya
  const lx = curva(t, [[0, 330], [0.6, 262], [SINGLE + 0.2, 214], [NARROW + 0.15, 168], [NARROW + 0.5, 171], [P2, 171]]), ly = curva(t, [[0, 104], [0.6, 86], [NARROW + 0.5, 82], [P2, 82]]);
  const r = 15, cx = Math.round(lx), cy = Math.round(ly);
  // lo que se ve dentro: el doble de grande (leído del dial ya pintado)
  const vis = []; for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) vis.push([cx + x, cy + y, R.pget(Math.round(cx + x / 2), Math.round(cy + y / 2))]);
  for (const [x, y, c] of vis) R.pset(x, y, mez(c, BL, 0.06));
  // el reflejo del cristal de la lupa
  for (let i = 0; i < 7; i++) { tinta(cx - 9 + i, cy - 8 - Math.round(i * 0.3), BL, 0.35); tinta(cx - 10 + i, cy - 7 - Math.round(i * 0.3), BL, 0.2); }
  // el aro de latón con su luz y su sombra
  for (let a = 0; a < 6.283; a += 0.02) { const x = Math.round(cx + Math.cos(a) * (r + 1)), y = Math.round(cy + Math.sin(a) * (r + 1)); R.pset(x, y, Math.sin(a + 2.2) > 0.3 ? hex('#f4d888') : hex('#b0882e')); R.pset(Math.round(cx + Math.cos(a) * (r + 2)), Math.round(cy + Math.sin(a) * (r + 2)), K); R.pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), hex('#7a5a1e')); }
  // en «narrow» dos corchetes ámbar a los lados de la raya (dentro de la lupa)
  const mk = tramo(t, NARROW + 0.3, NARROW + 0.7);
  if (mk > 0 && Math.abs(cx - 171) < 4) for (const s of [-1, 1]) { const x = cx + s * Math.round(lerp(10, 4, ease(mk))); R.linea(x, cy - 8, x, cy + 8, hex('#ffb43a')); R.linea(x, cy - 8, x - s * 2, cy - 8, hex('#ffb43a')); R.linea(x, cy + 8, x - s * 2, cy + 8, hex('#ffb43a')); }
  // el mango y la mano canónica (T.brazo desde abajo a la derecha, fuera del cuadro)
  const hx = cx + 24, hy = cy + 46;
  for (let s = 0; s <= 1; s += 0.04) { const x = Math.round(lerp(cx + 11, hx, s)), y = Math.round(lerp(cy + 11, hy, s)); R.disco(x, y, 2, K); }
  for (let s = 0; s <= 1; s += 0.04) { const x = Math.round(lerp(cx + 11, hx, s)), y = Math.round(lerp(cy + 11, hy, s)); R.pset(x, y, hex('#3a2418')); R.pset(x - 1, y, hex('#6a4430')); }
  T.brazo(R, hx + 30, Math.max(198, hy + 60), hx + 6, hy + 2, '#3a5a8a', -1, { codo: [hx + 22, hy + 32] });
  // en «hydrogen» el átomo se enciende: halo y estela del electrón
  const at = tramo(t, HIDRO - 0.1, HIDRO + 0.5), [ax, ay] = [170, 62];
  if (at > 0) { const k = Math.min(1, at * 1.6); for (let rr = 4; rr <= 12; rr++) for (let a = 0; a < 6.283; a += 0.12) if (bay(Math.round(ax + Math.cos(a) * rr), Math.round(ay + Math.sin(a) * rr * 0.7)) < k * (1 - (rr - 4) / 9)) tinta(ax + Math.cos(a) * rr, ay + Math.sin(a) * rr * 0.7, hex('#ffe88a'), 0.5);
    for (let i = 0; i < 6; i++) { const a = t * 6 - i * 0.25; tinta(ax + Math.cos(a) * 9, ay + Math.sin(a) * 4, hex('#9ae8ff'), 0.8 - i * 0.12); }
    if (at < 1) destello(ax, ay - 1, Math.round(2 + at * 4), hex('#fff6c8')); }
  // una polilla que ronda el cristal iluminado
  polilla(70 + Math.sin(t * 0.5) * 20, 66, t, 1, 9);
};
// ── 2 · todo el cielo emite ancho, como estática ───────────────────────────────────────────────────────────────────
const MANY = ts(7.5), STATIC = ts(9.4);
const ARCO = ['#ff5a5a', '#ff9a3a', '#ffe05a', '#7ae86a', '#5ad8ff', '#5a8aff', '#c07aff'].map(hex);
const FUENTES = [[118, 104, 1.0, 0], [262, 72, 0.8, 1], [36, 44, 0.55, 2], [214, 150, 0.6, 3]];
const galaxia = (x, y, t, k) => { for (let i = 0; i < 26; i++) { const a = i * 0.5 + t * 0.2 + k, rr = i * 0.32; tinta(x + Math.cos(a) * rr * 1.6, y + Math.sin(a) * rr * 0.7, hex('#c8d0ff'), 0.6); tinta(x - Math.cos(a) * rr * 1.6, y - Math.sin(a) * rr * 0.7, hex('#c8d0ff'), 0.6); } R.disco(x, y, 1.4, hex('#fff4d0')); };
const p2 = (t) => {
  const o = { encuadre: 'hidrogeno' };
  T.cielo2(R, t, o);
  galaxia(36, 44, t, 0); galaxia(214, 150, t, 2);
  // las ondas anchas: arcos de siete colores juntos (ancho = muchas frecuencias), cada vez más
  const mucho = curva(t, [[P2, 0.35], [MANY, 0.7], [MANY + 0.9, 1]]);
  for (const [fx, fy, fu, k] of FUENTES) {
    for (let n = 0; n < 4; n++) { const per = 2.2, q = ((t - P2) / per + n / 4 + k * 0.17) % 1; if (q < 0 || n / 4 > mucho) continue; const rr = 10 + q * 120 * fu, alfa = (1 - q) * (0.55 + mucho * 0.35);
      for (let a = -0.9; a <= 0.9; a += 0.6 / rr) { const ang = (k === 1 ? Math.PI : 0) + a + (k === 2 ? 0.8 : k === 3 ? -0.8 : 0);
        for (let b = 0; b < 7; b++) { const x = Math.round(fx + Math.cos(ang) * (rr + b)), y = Math.round(fy + Math.sin(ang) * (rr + b) * 0.8); if (x < 0 || x > 319 || y < 0 || y > 179 || tranquila(x, y)) continue; if (bay(x, y) > alfa + 0.15) continue; tinta(x, y, ARCO[b], 0.75); } } } }
  // la estática: nieve que chisporrotea en «static»
  const st = tramo(t, STATIC - 0.15, STATIC + 0.9), am = st > 0 && st < 1 ? Math.sin(st * Math.PI) : 0;
  if (am > 0) { const fr = Math.floor(t * 24); for (let k = 0; k < 2600 * am; k++) { const x = Math.floor(hs(k, fr, 31) * 320), y = Math.floor(hs(k, fr, 32) * 180); if (tranquila(x, y)) continue; R.pset(x, y, hs(k, fr, 33) > 0.5 ? hex('#e8ecf8') : hex('#8a90a8')); }
    for (let k = 0; k < 6 * am; k++) { const y = Math.floor(hs(k, fr, 34) * 160) + 24, x0 = Math.floor(hs(k, fr, 35) * 200), L = 30 + Math.floor(hs(k, fr, 36) * 90); for (let x = x0; x < Math.min(319, x0 + L); x++) if (!tranquila(x, y) && bay(x, y) < 0.6) tinta(x, y, hex('#dce4ff'), 0.6); } }
};
// ── 3 · la emisora de 1977 por dentro ────────────────────────────────────────────────────────────────────────────
const AGUJA = ts(10.6), AIRE = ts(12.0), HABLA0 = ts(12.08), ESTRECHO = ts(12.58), TRANS = ts(14.38);
const WIN = [150, 24, 262, 98];
const estudioFijo = () => {
  // la pared de placas acústicas (agujeritos y juntas), tranquila arriba a la derecha y bajo el año
  for (let y = 0; y <= 104; y++) for (let x = 0; x <= 319; x++) { const jx = x % 18 === 0, jy = y % 18 === 0, calma = tranquila(x, y); let c = (x + y * 3) % 7 === 0 && !jx && !jy && !calma ? hex('#b8a888') : hex('#d6c8a8'); if (jx || jy) c = hex('#a89878'); if (hs(x >> 3, y >> 3, 5) > 0.92 && !calma) c = mez(c, hex('#8a7a5a'), 0.15); R.pset(x, y, c); }
  // el friso de madera de nogal (con vetas) y su moldura
  madera(0, 105, 319, 150, 11, ['#3e2614', '#52331c', '#664226', '#7a5232', '#8e6440'].map(hex));
  for (let x = 0; x < 320; x++) { R.pset(x, 104, hex('#2a1a0e')); R.pset(x, 105, hex('#a07850')); if (x % 40 === 0) R.linea(x, 106, x, 150, hex('#2e1c10')); }
  // la moqueta de los setenta (naranja tostado, tramada) con una alfombra
  for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(['#5a2e14', '#7a4220', '#8e5228', '#a46432'].map(hex), 0.3 + hs(x, y, 9) * 0.4 + (y - 151) / 60, x, y));
  for (let x = 0; x < 320; x++) R.pset(x, 151, hex('#2a1a0e'));
  for (let y = 164; y < 180; y++) for (let x = 30; x < 140; x++) if (((x >> 2) + (y >> 2)) % 2) R.pset(x, y, mez(R.pget(x, y), hex('#c8a040'), 0.25));
  // la estantería de discos: cuatro baldas con fundas de colores (lomos sin letras) y alguna inclinada
  R.rect(2, 26, 62, 150, hex('#2e1c10')); R.rect(4, 28, 60, 148, hex('#5a3a22'));
  for (let b = 0; b < 4; b++) { const yb = 56 + b * 30; R.rect(3, yb, 61, yb + 2, hex('#8a6440')); R.linea(3, yb + 3, 61, yb + 3, hex('#2a1a0e'));
    let x = 6; while (x < 58) { const w = 2 + Math.floor(hs(x, b, 21) * 2), hgt = 18 + Math.floor(hs(x, b, 22) * 6), c = hex(['#c83a2a', '#e8b030', '#3a7ac8', '#f0ece0', '#2a2a30', '#5aa85a', '#e86a9a', '#8a5ac8'][Math.floor(hs(x, b, 23) * 8)]);
      if (hs(x, b, 24) > 0.9 && x < 50) { for (let j = 0; j < hgt; j++) R.linea(x + Math.round(j * 0.35), yb - 1 - j, x + Math.round(j * 0.35) + 2, yb - 1 - j, c); x += 8; continue; }
      R.rect(x, yb - hgt, x + w - 1, yb - 1, c); R.linea(x + w - 1, yb - hgt, x + w - 1, yb - 1, mez(c, K, 0.4)); R.pset(x, yb - hgt, mez(c, BL, 0.4)); x += w; } }
  // el corcho con papeles de colores, una foto de la torre y chinchetas
  R.rect(72, 30, 122, 74, hex('#5a3a20')); for (let y = 32; y <= 72; y++) for (let x = 74; x <= 120; x++) R.pset(x, y, tono(['#a8743a', '#c08a4a', '#d4a060'].map(hex), hs(x, y, 13), x, y));
  for (const [x, y, w, hh, c] of [[78, 36, 14, 10, '#f4f0e0'], [96, 34, 10, 14, '#f8e870'], [110, 40, 9, 9, '#9ad0f0'], [80, 52, 12, 16, '#f0f0f0'], [98, 54, 16, 12, '#f4c8d8']]) { R.rect(x + 1, y + 1, x + w, y + hh, hex('#6a4a28')); R.rect(x, y, x + w - 1, y + hh - 1, hex(c)); for (let j = 3; j < hh - 2; j += 2) R.linea(x + 2, y + j, x + w - 3, y + j, hex('#a8a8b8')); R.pset(x + (w >> 1), y + 1, hex('#e83a3a')); }
  R.rect(81, 53, 90, 66, hex('#1a2448')); R.linea(85, 55, 85, 65, hex('#a8a8b8')); R.linea(83, 65, 85, 55, hex('#a8a8b8')); R.linea(87, 65, 85, 55, hex('#a8a8b8')); R.pset(85, 55, hex('#ff3a3a'));
  // el marco de la ventana (nogal oscuro) y su alféizar
  R.rect(WIN[0] - 4, WIN[1] - 4, WIN[2] + 4, WIN[3] + 6, hex('#2a1a0e')); R.rect(WIN[0] - 3, WIN[1] - 3, WIN[2] + 3, WIN[3] + 3, hex('#5a3a22'));
  R.rect(WIN[0] - 6, WIN[3] + 3, WIN[2] + 6, WIN[3] + 6, hex('#8a6440')); R.linea(WIN[0] - 6, WIN[3] + 7, WIN[2] + 6, WIN[3] + 7, hex('#2a1a0e'));
  // la mesa de mezclas: tablero inclinado, frente de nogal con rejilla, y el mueble del magnetófono
  R.rect(80, 134, 216, 162, hex('#2a1a0e')); madera(81, 141, 215, 161, 17); R.rect(81, 135, 215, 140, hex('#3a3a44')); R.linea(81, 135, 215, 135, hex('#6a6a7a'));
  for (let x = 90; x < 210; x += 4) R.linea(x, 146, x, 156, hex('#3a2414'));
  R.rect(124, 124, 168, 136, hex('#1e1e26')); R.rect(125, 125, 167, 135, hex('#4a4a56')); R.linea(125, 125, 167, 125, hex('#7a7a8a'));
  R.rect(220, 118, 260, 162, hex('#2a1a0e')); madera(221, 140, 259, 161, 19); R.rect(221, 119, 259, 139, hex('#c8c4b8')); R.linea(221, 119, 259, 119, hex('#f0ece0')); R.rect(226, 133, 254, 137, hex('#2a2a30'));
  // el bastidor del transmisor
  R.rect(262, 56, 318, 162, hex('#1a1c22')); R.rect(264, 58, 316, 160, hex('#6a707a')); for (let y = 58; y <= 160; y++) R.pset(264, y, hex('#9aa0aa'));
  R.rect(268, 62, 310, 88, K); R.rect(270, 64, 308, 86, hex('#0a2a14'));
  for (let x = 270; x <= 308; x += 6) for (let y = 64; y <= 86; y += 2) R.pset(x, y, hex('#14401e')); for (let y = 64; y <= 86; y += 6) for (let x = 270; x <= 308; x += 2) R.pset(x, y, hex('#14401e'));
  for (const x of [270, 290]) { R.rect(x, 94, x + 16, 104, K); R.rect(x + 1, 95, x + 15, 103, hex('#f0dca0')); for (let i = 0; i < 5; i++) R.pset(x + 3 + i * 3, 96, hex('#3a3a30')); }
  for (let i = 0; i < 5; i++) { R.disco(272 + i * 9, 114, 2.5, K); R.disco(272 + i * 9, 114, 1.6, hex('#b8bcc4')); }
  for (let y = 130; y <= 156; y += 3) R.linea(268, y, 312, y, hex('#3a3e46'));
  for (const yy of [92, 108, 126]) R.linea(264, yy, 316, yy, hex('#4a4e58'));
  for (const [x, y] of [[266, 60], [314, 60], [266, 158], [314, 158]]) R.pset(x, y, hex('#c8ccd4'));
};
const p3 = (t) => {
  fijo('estudio', estudioFijo);
  // por la ventana: el cielo, las nubes, el pueblo, la carretera y la torre (todo recortado al hueco)
  R.recorte(WIN);
  for (let y = WIN[1]; y <= WIN[3]; y++) for (let x = WIN[0]; x <= WIN[2]; x++) R.pset(x, y, tono(NOCHE, (y - WIN[1]) / 80 + 0.05, x, y));
  for (let k = 0; k < 60; k++) { const x = WIN[0] + Math.floor(hs(k, 1, 41) * 112), y = WIN[1] + Math.floor(hs(k, 2, 41) * 50); R.pset(x, y, Math.sin(t * 3 + k) > 0.8 ? BL : hex('#8a9ac8')); }
  nubes(t, WIN[0], WIN[2], WIN[1] + 4, WIN[1] + 40, 6, 7);
  for (let x = WIN[0]; x <= WIN[2]; x++) { const a = Math.round(8 + Math.sin(x * 0.05) * 4 + Math.sin(x * 0.17) * 2); R.linea(x, WIN[3] - 14 - a, x, WIN[3], hex('#0e1426')); }
  for (let k = 0; k < 18; k++) { const x = WIN[0] + 4 + Math.floor(hs(k, 3, 43) * 104), y = WIN[3] - 10 - Math.floor(hs(k, 4, 43) * 10); R.pset(x, y, Math.sin(t * 0.7 + k * 3) > -0.6 ? hex('#ffd890') : hex('#8a6a40')); }
  for (let x = WIN[0]; x <= WIN[2]; x++) { R.pset(x, WIN[3] - 4, hex('#2a2a34')); R.pset(x, WIN[3] - 3, hex('#3a3a46')); }
  { const cx = WIN[2] + 20 - ((t - P3) * 30) % 150; for (let i = 0; i < 8; i++) tinta(cx - 6 - i, WIN[3] - 4, hex('#fff0b0'), 0.6 - i * 0.07); R.rect(Math.round(cx), WIN[3] - 6, Math.round(cx) + 7, WIN[3] - 3, hex('#4a1a1a')); R.pset(Math.round(cx), WIN[3] - 4, hex('#fff8d0')); R.pset(Math.round(cx) + 7, WIN[3] - 4, hex('#ff3a3a')); }
  // la torre de celosía con su luz roja que parpadea
  const TX = 234, TY = 32;
  for (let y = TY; y <= WIN[3] - 4; y++) { const w = Math.round((y - TY) * 0.14); R.pset(TX - w, y, hex('#8a92a8')); R.pset(TX + w, y, hex('#8a92a8')); if ((y - TY) % 6 === 0) R.linea(TX - w, y, TX + w, y, hex('#5a627a')); if ((y - TY) % 6 === 3) { R.pset(TX, y, hex('#5a627a')); } }
  const roja = Math.sin(t * 4) > 0; R.disco(TX, TY - 1, 1.5, roja ? hex('#ff3a3a') : hex('#6a1a1a')); if (roja) { tinta(TX - 2, TY - 1, hex('#ff5a5a'), 0.5); tinta(TX + 2, TY - 1, hex('#ff5a5a'), 0.5); }
  // en «transmitters» la torre emite anillos finos de UN solo color
  const em = tramo(t, TRANS - 0.1, TRANS + 0.3);
  if (em > 0 || t > ESTRECHO) for (let n = 0; n < 3; n++) { const q = ((t - ESTRECHO) * (em > 0 ? 0.9 : 0.35) + n / 3) % 1, rr = 4 + q * 46; if (q < 0) continue; for (let a = 0; a < 6.283; a += 1 / rr) { const x = Math.round(TX + Math.cos(a) * rr), y = Math.round(TY + Math.sin(a) * rr * 0.75); if (bay(x, y) < (1 - q) * (em > 0 ? 1 : 0.45)) R.pset(x, y, hex('#ff7a5a')); } }
  // el reflejo del cristal y el parteluz
  for (let i = 0; i < 30; i++) { tinta(WIN[0] + 10 + i, WIN[3] - 6 - i * 2, BL, 0.12); tinta(WIN[0] + 14 + i, WIN[3] - 6 - i * 2, BL, 0.08); }
  R.recorte(null);
  R.rect(205, WIN[1], 207, WIN[3], hex('#5a3a22')); R.linea(205, WIN[1], 205, WIN[3], hex('#2a1a0e'));
  // el piloto «en el aire» (rojo, con un micrófono pintado, sin letras) sobre la ventana
  const aire = t > AIRE;
  R.rect(190, 8, 224, 18, K); R.rect(191, 9, 223, 17, aire ? hex('#ff3a2a') : hex('#5a1a14'));
  R.disco(207, 12, 2, aire ? BL : hex('#8a3a30')); R.linea(207, 14, 207, 16, aire ? BL : hex('#8a3a30')); R.linea(205, 16, 209, 16, aire ? BL : hex('#8a3a30'));
  if (aire) for (let y = 4; y <= 30; y++) for (let x = 180; x <= 234; x++) { const d = Math.hypot((x - 207) / 30, (y - 13) / 14); if (d < 1 && d > 0.5 && bay(x, y) < (1 - d) * 0.9) tinta(x, y, hex('#ff5a3a'), 0.25); }
  // el reloj de pared con su segundero
  { const cx = 138, cy = 44; R.disco(cx, cy, 9, K); R.disco(cx, cy, 8, hex('#f4f0e0')); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; R.pset(Math.round(cx + Math.cos(a) * 6.5), Math.round(cy + Math.sin(a) * 6.5), hex('#3a3a48')); }
    R.linea(cx, cy, cx + 3, cy - 4, K); R.linea(cx, cy, cx - 1, cy - 6, K); const s = t * Math.PI / 30 * 6; R.linea(cx, cy, Math.round(cx + Math.sin(s) * 7), Math.round(cy - Math.cos(s) * 7), hex('#c83a2a')); }
  // los platos: discos que giran (con su brillo) y el brazo; el mezclador con faders y vúmetros
  const giraA = t > AGUJA + 0.4 ? (t - AGUJA) * 9 : 0;
  for (const [px, gira] of [[96, giraA], [196, t * 9]]) { R.rect(px - 15, 130, px + 15, 135, hex('#c8c4b8')); R.linea(px - 15, 130, px + 15, 130, hex('#f0ece0')); for (let y = -3; y <= 3; y++) for (let x = -12; x <= 12; x++) if ((x / 12) ** 2 + (y / 3.4) ** 2 <= 1) R.pset(px + x, 131 + y, (x * x + y * y * 12) < 6 ? hex('#e83a2a') : ((Math.round(Math.hypot(x, y * 3.5)) % 3) ? hex('#1a1a20') : hex('#2e2e38')));
    const a = gira; R.pset(Math.round(px + Math.cos(a) * 9), Math.round(131 + Math.sin(a) * 2.6), hex('#8a8aa0')); R.pset(Math.round(px + Math.cos(a + 0.2) * 8), Math.round(131 + Math.sin(a + 0.2) * 2.3), hex('#6a6a80')); }
  { const bajado = t > AGUJA + 0.3; R.linea(110, 129, bajado ? 101 : 108, bajado ? 132 : 126, hex('#d0d4dc')); R.disco(110, 129, 1.5, hex('#8a8e98')); R.linea(196 + 14, 129, 202, 132, hex('#d0d4dc')); }
  for (let i = 0; i < 6; i++) { const x = 129 + i * 7, f = Math.round(3 + Math.sin(t * (0.6 + i * 0.3) + i) * (i === 2 && t > HABLA0 ? 3 : 1)); R.linea(x, 128, x, 134, hex('#1a1a20')); R.rect(x - 1, 128 + f - 1, x + 1, 128 + f, hex('#e8e8f0')); }
  for (const vx of [152, 160]) { R.rect(vx - 3, 120, vx + 3, 125, K); R.rect(vx - 2, 121, vx + 2, 124, hex('#f0c060')); const a = -1.2 + Math.abs(Math.sin(t * 7 + vx)) * (t > HABLA0 ? 1.8 : 0.8); R.linea(vx, 124, Math.round(vx + Math.sin(a) * 3), Math.round(124 - Math.cos(a) * 3), K); }
  // el magnetófono: dos bobinas que giran y la cinta
  for (const [bx, sg] of [[230, 1], [250, 1]]) { R.disco(bx, 126, 6, hex('#2a2a30')); R.disco(bx, 126, 5, hex('#8a8e98')); R.disco(bx, 126, 1.5, hex('#2a2a30')); for (let k = 0; k < 3; k++) { const a = t * 4 * sg + k * 2.094; R.linea(bx, 126, Math.round(bx + Math.cos(a) * 4), Math.round(126 + Math.sin(a) * 4), hex('#4a4a56')); } }
  R.linea(230, 132, 250, 132, hex('#5a3a22'));
  // el osciloscopio: UN pico fino que late (en «that narrow» se rodea con dos corchetes)
  { const pk = 1 + 0.25 * Math.sin(t * 6) + (t > TRANS ? 0.4 * Math.max(0, Math.sin((t - TRANS) * 9)) : 0);
    for (let x = 270; x <= 308; x++) { const d = x - 289, y = Math.round(84 - 18 * pk * Math.exp(-d * d / 0.8) - (hs(x, Math.floor(t * 12), 3) - 0.5) * 1.2); R.pset(x, y, hex('#7aff9a')); tinta(x, y + 1, hex('#3ac85a'), 0.5); }
    const b = tramo(t, ESTRECHO, ESTRECHO + 0.4); if (b > 0) for (const s of [-1, 1]) { const x = 289 + s * Math.round(lerp(10, 5, ease(b))); R.linea(x, 65, x, 69, hex('#f0e070')); R.linea(x, 65, x - s * 2, 65, hex('#f0e070')); } }
  for (let i = 0; i < 6; i++) R.pset(268 + i * 8, 120, Math.sin(t * (3 + i) + i) > 0 ? hex(['#ff3a3a', '#5aff7a', '#f0d040'][i % 3]) : hex('#2a2a30'));
  for (const vx of [278, 298]) { const a = -0.8 + Math.abs(Math.sin(t * 5 + vx)) * 1.4; R.linea(vx, 103, Math.round(vx + Math.sin(a) * 6), Math.round(103 - Math.cos(a) * 6), K); }
  // el gato duerme en el bastidor y mueve la cola
  { const gx = 266, gy = 55, G = hex('#e8a04a'), GS = hex('#b86e2a'); R.rect(gx, gy - 6, gx + 14, gy, K); R.rect(gx + 1, gy - 5, gx + 13, gy, G); R.rect(gx + 1, gy - 1, gx + 13, gy, GS); for (let i = 3; i < 13; i += 3) R.pset(gx + i, gy - 5, GS);
    R.disco(gx + 15, gy - 4, 3, K); R.disco(gx + 15, gy - 4, 2.2, G); R.pset(gx + 14, gy - 7, K); R.pset(gx + 17, gy - 7, K); R.pset(gx + 16, gy - 4, K); R.pset(gx + 14, gy - 4, K);
    const c = Math.sin(t * 2.2); for (let i = 0; i < 7; i++) R.pset(gx - i, gy - 1 - Math.round(Math.max(0, c) * i * 0.6), K); for (let i = 0; i < 6; i++) R.pset(gx - i, gy - 2 - Math.round(Math.max(0, c) * i * 0.6), G);
    const ore = Math.sin(t * 1.1) > 0.5; R.pset(gx + 14, gy - 7 - (ore ? 1 : 0), K); }
  // la taza de café con vapor sobre la mesa
  R.rect(206, 128, 211, 134, K); R.rect(207, 129, 210, 133, hex('#e8e0d0')); R.pset(212, 130, K); R.pset(212, 132, K); vapor(t, 208, 127, 1);
  // el locutor: pone la aguja (sostiene) y luego habla al micro; en «transmitters» señala la ventana
  const pone = t > P3 + 0.15 && t < AGUJA + 0.5, senala = t > TRANS - 0.05;
  const a = R.actor(EL.operadorRadio, 58, 162, t, { dir: 1, sostiene: pone ? [92, 132] : false, habla: t > HABLA0 && t < TRANS - 0.1 && Math.sin(t * 9) > -0.3, dedo: senala, sonrisa: senala || (t > AIRE && t < HABLA0 + 0.3), salto: t > AIRE && t < AIRE + 0.18 ? 1 : 0,
    pal: { C: hex('#8a4a2a'), c: hex('#6a3420'), F: hex('#3a3a54'), G: hex('#6a3420'), o: hex('#e8c060') } });
  // el micrófono de pie delante de la boca
  R.linea(80, 162, 80, 147, hex('#5a5e68')); R.linea(76, 162, 84, 162, hex('#3a3e46')); R.linea(80, 147, 77, 145, hex('#8a8e98')); R.rect(73, 142, 77, 147, K); R.rect(74, 143, 76, 146, hex('#9aa0aa')); R.pset(75, 144, hex('#d0d4dc'));
  if (senala) for (let i = 0; i < 3; i++) { const q = ((t - TRANS) * 2 + i / 3) % 1; R.pset(Math.round(84 + q * 12), Math.round(134 - q * 10), hex('#fff0b0')); }
};
// ── 4 · venía de Sagitario ──────────────────────────────────────────────────────────────────────────────────────
const DIR = ts(16.35), SAGI = ts(16.85);
const p4 = (t) => {
  const o = { encuadre: 'sagitario', lineas: ease(tramo(t, SAGI - 0.05, SAGI + 0.8)) };
  const g = T.cielo2(R, t, o);
  // la dirección: un trazo de puntos que sube desde la gran oreja diminuta hacia la tetera
  const d = tramo(t, DIR - 0.1, SAGI + 0.4), [tx0, ty0, tx1, ty1] = g.tetera, cx = (tx0 + tx1) / 2, cy = (ty0 + ty1) / 2;
  if (d > 0) for (let s = 0; s <= d; s += 0.02) { const x = lerp(52, cx - 10, s), y = lerp(146, cy + 6, s) - Math.sin(s * Math.PI) * 10; if (((Math.floor(s * 50 - t * 8) % 3) + 3) % 3 === 0) { tinta(x, y, hex('#ffd25a'), 0.9); tinta(x + 1, y, hex('#ffd25a'), 0.5); } }
  if (d >= 1) { const e = tramo(t, SAGI + 0.4, SAGI + 1.0); if (e > 0 && e < 1) destello(cx, cy, Math.round(3 + e * 5), hex('#fff2b0')); }
  // los dos voluntarios entran por el camino; él con la linterna, ella con el mapa del cielo
  const w = tramo(t, P4 + 0.05, DIR - 0.15), xa = Math.round(lerp(64, 112, ease(w))), xb = Math.round(lerp(84, 138, ease(w))), anda = w > 0 && w < 1;
  const ella = R.actor(EL.voluntaria2WO, xa, 174, t, { dir: 1, anda, sostiene: true, sorpresa: t > SAGI && t < SAGI + 0.6, sonrisa: t > SAGI + 0.6 });
  if (ella && ella.mano) { const [mx, my] = ella.mano; R.rect(mx - 4, my - 6, mx + 4, my + 1, K); R.rect(mx - 3, my - 5, mx + 3, my, hex('#1a2a5a')); R.pset(mx - 1, my - 3, BL); R.pset(mx + 1, my - 4, BL); R.pset(mx + 2, my - 2, BL); R.pset(mx - 2, my - 1, hex('#ffd25a')); }
  const apunta = t > DIR - 0.05;
  const el = R.actor(EL.voluntario1WO, xb, 174, t, { dir: 1, anda, dedo: apunta, sostiene: apunta ? false : true, habla: t > DIR && t < SAGI + 0.5 });
  if (el && el.mano && !apunta) { const [mx, my] = el.mano; R.rect(mx - 1, my - 2, mx + 4, my + 1, K); R.rect(mx, my - 1, mx + 3, my, hex('#c83a2a')); R.pset(mx + 4, my - 1, hex('#fff6c8'));
    for (let i = 1; i < 16; i++) for (let j = -Math.floor(i / 4); j <= Math.floor(i / 4); j++) if (bay(mx + 4 + i, my + i + j) < 0.35 - i * 0.015) tinta(mx + 4 + i, my + Math.round(i * 0.9) + j, hex('#fff2b0'), 0.5); }
  if (apunta) { const [hx, hy] = el.cabeza; for (let i = 0; i < 3; i++) { const q = ((t - DIR) * 1.5 + i / 3) % 1; tinta(hx + 10 + q * 14, hy - 4 - q * 12, hex('#ffd25a'), 0.8); } }
  T.cielo2Delante(R, t, o);
};
const efectos = [[0.55, 'whoosh'], [HIDRO, 'brillo'], [P2 + 0.3, 'zumbido'], [STATIC, 'zumbido'], [AGUJA + 0.3, 'golpecito'], [AIRE, 'interruptor'], [TRANS, 'bip'], [SAGI + 0.1, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1977 });
''')

E['wo-segunda'] = ('La segunda oreja', '''// WO-SEGUNDA (frases 15–17), año 1977 y, desde «Years later», 1994. Las dos bocinas, una sola vez, dos sitios
// posibles, sesenta días sin nada y lo que dijo Ehman. Ocho planos:
// 1. (0) el carro de las bocinas de noche (2.º uso): en «two feed horns» salen sus chapas 1 y 2; en «little ears»
//    entran ondas a las dos; GAG 5: en «ears» la de la izquierda da un respingo (y un «!») y en «side by side» la de
//    la derecha se inclina hacia ella, esperando (un reloj encima). Polillas en la lámpara y un murciélago.
// 2. («which looked», 6,33) la deriva (2.º uso): de la gran oreja diminuta salen DOS haces lado a lado (1 y 2); el
//    punto cruza el 1 en «same patch», un arco con un 3 y un reloj une los haces en «three minutes apart» y el punto
//    llega al 2, donde se le espera con un anillo de puntos; en «fixed in the sky» le cae una chincheta encima.
// 3. («the signal», 11,6) la gráfica sobre la mesa (2.º uso; el 1.º en wo-escala): la campana del 1 se dibuja; al
//    lado, una tira de papel del 2 con la campana esperada en gris: la mano traza con el lápiz y la raya sale plana
//    («only once»); en el silencio la mano espera dando golpecitos y sale un «?».
// 4. («In other words», 16,85) el cronómetro de tres minutos sobre la mesa de los voluntarios, fuera, de noche, con
//    el curvo al fondo: la aguja da la vuelta; en «switched on» la luz del cielo se enciende y en la esfera nace un
//    arco ámbar; en «switched off» se apaga; en «no one knows how long» tres arcos de puntos de largos distintos y un
//    «?» sobre la luz, que titila.
// 5. («the log», 23,9) la carta del cielo de papel azul sobre la mesa de la caseta, con el listado al lado (que se
//    resalta en «the log») y el termo: en «which of the two horns» sale una nota con las dos bocinas, 1 ? 2; en «two
//    possible spots» la mano dibuja con el lápiz rojo dos círculos junto al asa de la tetera, uno y otro.
// 6. («For about sixty days», 30,3) la franja del cielo con el calendario (1.º uso del episodio): las hojas pasan de 1
//    a 60, la luna cambia de fase, dos voluntarios con auriculares escuchan junto a la mesita; un zorro cruza; en
//    «Nothing» se encogen de hombros y se quedan tristes.
// 7. («Years later», 35,15) el despacho (2.º uso, 1994; distinto: ordenador beige en el escritorio): Ehman entra con
//    un papel; en «Ehman» se vuelve y habla; en «common sense» levanta el dedo; sigue explicándolo con calma.
// 8. («they'd have sent», 40,3) un faro de noche en la costa: destella una y otra vez (1, 2, 3, 4, 5 suben y se
//    apagan) mientras un barquito pasa y el mar se mueve: lo que quiere oírse se repite.''', PRE + r'''
const tr = (s) => en('receptores', (s - 0.9) / 14.012), td = (s) => en('dos', (s - 16.956) / 12.952), tz = (s) => en('sesenta', (s - 30.408) / 11.802);
const P2 = tr(6.33), P3 = tr(11.6), P4 = td(16.85), P5 = td(23.9), P6 = tz(30.3), P7 = tz(35.15), P8 = tz(40.3);
// ── 1 · las dos bocinas ───────────────────────────────────────────────────────────────────────────────────────────
const DOS = tr(2.79), OREJAS = tr(4.1), EARS = tr(4.67), SIDE = tr(5.0);
const p1 = (t) => {
  const o = { encuadre: 'caseta', camara: 'bocinas', respingo: tramo(t, EARS - 0.05, EARS + 0.9), espera: ease(tramo(t, SIDE, P2 - 0.1)) };
  const g = T.oreja(R, t, o), [ex, ey] = g.bocinaE, [wx, wy] = g.bocinaO;
  // un murciélago que cruza alto y las polillas de la lámpara
  murcielago(330 - ((t * 38) % 380), 40 + Math.sin(t * 3) * 6, t, 0); for (let k = 0; k < 3; k++) polilla(266, 98, t, k, 5 + k * 2);
  // «little ears»: ondas finas que entran a las dos bocas
  const oy = tramo(t, OREJAS - 0.3, EARS + 0.4);
  if (oy > 0 && oy < 1) for (const [bx, by] of [[ex, ey], [wx, wy]]) for (let k = 0; k < 3; k++) { const rr = 18 - ((t * 20 + k * 6) % 18); for (let a = -2.6; a <= -0.5; a += 0.09) { const x = Math.round(bx + Math.cos(a) * rr), y = Math.round(by + Math.sin(a) * rr); if (bay(x, y) < 0.7 * Math.sin(oy * Math.PI)) R.pset(x, y, hex('#bfe8ff')); } }
  // las chapas 1 y 2 sobre cada bocina
  chapa(ex - 16, ey - 24, 1, tramo(t, DOS - 0.05, DOS + 0.25)); chapa(wx + 4, wy - 26, 2, tramo(t, DOS + 0.2, DOS + 0.5));
  // el gag: «!» en la que oye; un reloj encima de la que espera
  globo(ex + 8, ey - 38, '!', hex('#d82a2a'), tramo(t, EARS + 0.05, EARS + 0.3), 2);
  globo(wx + 22, wy - 40, 'reloj', hex('#3a6ac8'), tramo(t, SIDE + 0.5, SIDE + 0.8), 2);
  T.orejaDelante(R, t, o);
};
// ── 2 · dos haces, el mismo trozo de cielo con tres minutos de diferencia ─────────────────────────────────────────
const MISMO = tr(7.0), APART = tr(8.13), FIJO = tr(10.31);
const p2 = (t) => {
  const u = curva(t, [[P2, 0.36], [MISMO, 0.5], [APART + 0.5, 0.628], [P3, 0.72]]);
  const o = { encuadre: 'cinta', u };
  const g = T.oreja(R, t, o);
  // el segundo haz, lado a lado con el primero (inclinado hacia el este)
  const hz2 = (y) => { const c = 162 + (100 - y) * 0.36, w = 3 + (108 - y) * 0.075; return [c - w, c + w]; };
  for (let y = 22; y < 100; y++) { const [a, b] = hz2(y); for (let x = Math.floor(a); x <= Math.ceil(b); x++) { const e = 1 - Math.abs(x - (a + b) / 2) / ((b - a) / 2 + 0.5); if (bay(x, y) < (0.3 + e * 0.35) * (0.5 + (y - 22) / 156)) tinta(x, y, hex('#9ac8f0'), 0.35); }
    const pul = Math.floor(t * 8 + y * 0.3) % 6 === 0; R.pset(Math.round(a), y, pul ? hex('#e0f0ff') : hex('#5a8ac0')); R.pset(Math.round(b), y, pul ? hex('#e0f0ff') : hex('#5a8ac0')); }
  chapa(160, 30, 1, 1); chapa(Math.round((hz2(30)[0] + hz2(30)[1]) / 2), 30, 2, 1);
  // el punto en el segundo haz: donde DEBERÍA brillar otra vez (un anillo de puntos que late)
  const [px, py] = g.punto, [a2, b2] = hz2(py);
  if (px >= a2 - 2 && px <= b2 + 2) for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283 + t * 2; if (k % 2) R.pset(Math.round(px + Math.cos(a) * 8), Math.round(py + Math.sin(a) * 8), hex('#ffe680')); }
  // «three minutes apart»: un arco de puntos de haz a haz con el 3 y el reloj
  const ar = tramo(t, APART - 0.2, APART + 0.5);
  if (ar > 0) { const xa = 160, xb = Math.round((a2 + b2) / 2); for (let s = 0; s <= ar; s += 0.03) { const x = lerp(xa, xb, s), y = py + 11 + Math.sin(s * Math.PI) * 8; if (Math.floor(s * 33) % 2 === 0) { R.pset(Math.round(x), Math.round(y), hex('#ffd25a')); R.pset(Math.round(x), Math.round(y) + 1, hex('#b08020')); } }
    if (ar >= 1) { const mx = Math.round((xa + xb) / 2); chapa(mx - 5, py + 28, 3, 1, hex('#8a5a10'), hex('#fff2b0')); R.icono('reloj', mx + 4, py + 24, hex('#ffd25a'), K, 1); } }
  // «fixed in the sky»: una chincheta cae y se clava en el punto (y viaja con él)
  const ch = tramo(t, FIJO - 0.3, FIJO + 0.1);
  if (ch > 0) { const y = Math.round(lerp(py - 30, py - 3, ease(ch))); R.linea(px + 1, y, px + 3, y - 5, hex('#c8ccd4')); R.disco(px + 4, y - 7, 2.5, K); R.disco(px + 4, y - 7, 2, hex('#e83a3a')); R.pset(px + 3, y - 8, hex('#ffb0a0')); if (ch >= 1 && t < FIJO + 0.4) destello(px, py, 4, hex('#ffffff')); }
};
// ── 3 · una campana sola; el 2 se queda plano ─────────────────────────────────────────────────────────────────────
const TWICE = tr(12.79), ONCE = tr(13.71), FIN1 = tr(14.45);
const S2 = [234, 58, 304, 146];
const p3 = (t) => {
  const o = { encuadre: 'cinta', camara: 'haz', u: ease(tramo(t, P3 + 0.05, TWICE)) };
  T.oreja(R, t, o);
  chapa(62, 46, 1, 1);
  // la tira de papel milimetrado del 2, con su cinta adhesiva y su sombra
  R.rect(S2[0] + 2, S2[1] + 2, S2[2] + 2, S2[3] + 2, hex('#3a2414'));
  for (let y = S2[1]; y <= S2[3]; y++) for (let x = S2[0]; x <= S2[2]; x++) { let c = hex('#f4efe0'); if ((x - S2[0]) % 6 === 0 || (y - S2[1]) % 6 === 0) c = hex('#d4e4dc'); if ((x - S2[0]) % 24 === 0 || (y - S2[1]) % 24 === 0) c = hex('#a8ccc4'); R.pset(x, y, c); }
  for (const [x, y] of [[S2[0] - 3, S2[1] - 2], [S2[2] - 9, S2[1] - 2]]) for (let j = 0; j < 6; j++) for (let i = 0; i < 12; i++) tinta(x + i, y + j, hex('#f0e8b0'), 0.55);
  const AX = 136, X0 = 244, X1 = 296;
  R.linea(X0, 68, X0, AX, hex('#3a3a48')); R.linea(X0, AX, X1, AX, hex('#3a3a48')); for (let x = X0; x <= X1; x += 9) R.pset(x, AX + 1, hex('#3a3a48'));
  chapa(256, 72, 2, 1);
  // la campana que se esperaba, en gris de lápiz y de puntos
  for (let x = X0 + 2; x <= X1; x += 2) { const y = Math.round(AX - 46 * Math.exp(-(((x - 270) / 10) ** 2))); R.pset(x, y, hex('#9a9aa8')); R.pset(x, y + 1, hex('#c8c8d0')); }
  // la raya de verdad: el lápiz la traza y sale plana
  const tr2 = tramo(t, TWICE + 0.05, FIN1), cx = Math.round(lerp(X0 + 1, X1 - 2, tr2));
  if (tr2 > 0) { R.linea(X0 + 1, AX - 3, cx, AX - 3, hex('#f0a030')); R.linea(X0 + 1, AX - 2, cx, AX - 2, hex('#c87818')); }
  const golpe = t > FIN1 ? Math.max(0, Math.sin((t - FIN1) * 9)) * 2 : 0;
  const tipX = tr2 > 0 ? cx : X0 + 6, tipY = Math.round(AX - 3 - (tr2 > 0 ? 0 : 6) - golpe);
  const wx = tipX + 14, wy = tipY - 6;
  lapiz(wx - 6, wy - 1, tipX, tipY, hex('#c8a040'));
  T.brazo(R, wx + 30, 196, wx, wy, '#3a5a8a', -1, { codo: [wx + 24, wy + 30] });
  globo(S2[2] - 18, S2[1] + 20, '?', hex('#3a6ac8'), tramo(t, FIN1 + 0.9, FIN1 + 1.2));
};
// ── 4 · tres minutos: se encendió o se apagó ──────────────────────────────────────────────────────────────────────
const SOMETIME = td(18.04), ON = td(20.26), ON0 = td(19.75), OFF0 = td(20.6), OFF = td(21.06), NADIE = td(21.88);
const CW = [72, 98], LZ = [236, 52];
const relojFijo = () => {
  cieloNoche(0, 0, 319, 128, 51);
  // el curvo de la gran oreja al fondo (silueta con costillas de luna), el campo y el bosque
  for (let x = 0; x < 320; x++) { const yb = 126 + Math.round(Math.sin(x * 0.07) * 2); const ar = Math.round(6 + Math.sin(x * 0.11) * 2 + hs(x >> 2, 1, 4) * 3); R.linea(x, yb - ar, x, 132, hex('#0a0e1c')); }
  for (let x = 150; x < 320; x++) { const top = 92 + Math.round(((x - 235) / 85) ** 2 * 12); for (let y = top; y <= 128; y++) R.pset(x, y, (x % 9 === 0) ? hex('#3a4666') : ((y - top) % 7 === 0 ? hex('#2a3452') : hex('#1c2440'))); R.pset(x, top, hex('#8a9ab8')); }
  for (let x = 156; x < 320; x += 14) R.linea(x, 128, x, 134, hex('#2a3452'));
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(['#0c1810', '#14241a', '#1c3222', '#26402c'].map(hex), (y - 132) / 60 + hs(x, y, 3) * 0.25, x, y));
  for (let x = 0; x < 320; x += 5) for (let k = 0; k < 4; k++) R.pset(x + (k & 1), 136 + k * 3, hex('#2e4a32'));
  // la caseta con la ventana encendida, abajo a la derecha
  R.rect(268, 112, 318, 150, hex('#2a2a34')); for (let y = 112; y < 150; y += 4) for (let x = 268; x < 318; x++) if ((x + (y / 4 & 1) * 6) % 12 === 0 || (y - 112) % 4 === 0) R.pset(x, y, hex('#1a1a22'));
  R.rect(266, 109, 320, 112, hex('#3a3a46')); R.rect(280, 120, 296, 132, hex('#ffd890')); R.linea(288, 120, 288, 132, hex('#8a6a3a')); R.linea(280, 126, 296, 126, hex('#8a6a3a'));
  // la mesa plegable de los voluntarios en primer término, con tablero de listones
  madera(0, 136, 170, 150, 61); R.linea(0, 136, 170, 136, hex('#c09060')); R.linea(0, 151, 170, 151, K);
  for (const x of [10, 150]) { R.rect(x, 152, x + 3, 180, K); R.rect(x + 1, 152, x + 2, 180, hex('#5a3a22')); }
  for (let y = 152; y < 180; y++) for (let x = 0; x < 172; x++) if (bay(x, y) < 0.35) R.pset(x, y, mez(R.pget(x, y), K, 0.3));
  // el termo, la linterna (encendida, apoyada) y el cuaderno
  R.rect(132, 104, 146, 136, K); R.rect(133, 105, 145, 135, hex('#c83a2a')); for (let y = 108; y < 135; y += 5) R.linea(133, y, 145, y, hex('#8a2418')); for (let x = 135; x < 145; x += 4) R.linea(x, 105, x, 135, hex('#e8e0c0')); R.rect(131, 100, 147, 104, hex('#c8c8d0')); R.linea(133, 105, 133, 135, hex('#ff7a6a'));
  R.rect(8, 128, 40, 136, K); R.rect(9, 129, 39, 135, hex('#f0ead8')); for (let x = 12; x < 38; x += 3) R.pset(x, 131, hex('#9a9ab0')); R.linea(24, 129, 24, 135, hex('#c8c0a8'));
  R.rect(152, 128, 166, 134, K); R.rect(153, 129, 165, 133, hex('#4a4a56')); R.rect(150, 127, 153, 135, hex('#8a8e98')); R.rect(166, 129, 168, 133, hex('#fff2b0'));
};
const angulo = (t) => { if (t < SOMETIME - 0.6) return 0; if (t < ON0) return cl((t - (SOMETIME - 0.6)) / (ON0 - SOMETIME + 0.4)) * 6.283;
  if (t < OFF0) return cl((t - ON0) / (OFF0 - ON0 + 0.05)) * 6.283; if (t < NADIE - 0.1) return cl((t - OFF0) / (NADIE - OFF0 - 0.1)) * 6.283; return ((t - NADIE) / 2.4 % 1) * 6.283; };
const p4 = (t) => {
  fijo('reloj', relojFijo);
  titilan(t, 0, 0, 319, 120, 40, 52); nubes(t, 0, 319, 30, 84, 6, 53);
  for (let k = 0; k < 2; k++) murcielago(340 - ((t * (30 + k * 12) + k * 140) % 380), 70 + k * 18 + Math.sin(t * 4 + k) * 5, t, k);
  luciernagas(t, 176, 318, 140, 176, 10, 55);
  vapor(t, 139, 98, 2); polilla(160, 124, t, 2, 6);
  // el haz tenue de la oreja hacia la luz
  for (let s = 0; s < 1; s += 0.012) { const x = lerp(235, LZ[0], s), y = lerp(110, LZ[1] + 8, s); if (bay(Math.round(x), Math.round(y)) < 0.25) tinta(x, y, hex('#5a8ac0'), 0.5); }
  // el cronómetro de mesa, grande, con su soporte
  const [cx, cy] = CW, rr = 30, ang = angulo(t);
  R.rect(cx - 12, cy + 26, cx + 12, cy + 38, K); R.rect(cx - 11, cy + 27, cx + 11, cy + 37, hex('#8a8e98')); R.linea(cx - 11, cy + 27, cx + 11, cy + 27, hex('#c8ccd4'));
  R.disco(cx + 2, cy + 2, rr + 4, hex('#05070e')); R.disco(cx, cy, rr + 4, K); R.disco(cx, cy, rr + 3, hex('#c8ccd4')); R.disco(cx, cy, rr + 1, hex('#8a8e98')); R.disco(cx, cy, rr, hex('#f4efe0'));
  R.rect(cx - 3, cy - rr - 10, cx + 3, cy - rr - 4, K); R.rect(cx - 2, cy - rr - 9, cx + 2, cy - rr - 4, hex('#c8ccd4')); R.rect(cx - 5, cy - rr - 12, cx + 5, cy - rr - 9, K); R.rect(cx - 4, cy - rr - 11, cx + 4, cy - rr - 10, hex('#e8ecf0'));
  for (let i = 0; i < 60; i++) { const a = i / 60 * 6.283 - Math.PI / 2, l = i % 20 === 0 ? 6 : i % 5 === 0 ? 4 : 2; R.linea(Math.round(cx + Math.cos(a) * (rr - 1)), Math.round(cy + Math.sin(a) * (rr - 1)), Math.round(cx + Math.cos(a) * (rr - l)), Math.round(cy + Math.sin(a) * (rr - l)), i % 20 === 0 ? K : hex('#6a6a7a')); }
  for (const [n, a] of [[1, 120], [2, 240], [3, 0]]) { const r2 = rr - 13, aa = a * Math.PI / 180 - Math.PI / 2; R.numero(String(n), Math.round(cx + Math.cos(aa) * r2) + 1, Math.round(cy + Math.sin(aa) * r2) + 4, { centro: true, color: K, sombra: false }); }
  // el arco ámbar: cuánto tiempo estuvo encendida la luz en cada caso
  const arco = (a0, a1, r0, c, punto = 0) => { for (let a = a0; a <= a1; a += 0.03) for (let w = 0; w < 3; w++) { if (punto && Math.floor(a / 0.12) % 2) continue; const aa = a - Math.PI / 2; R.pset(Math.round(cx + Math.cos(aa) * (r0 - w)), Math.round(cy + Math.sin(aa) * (r0 - w)), c); } };
  let luz = 0;
  if (t >= SOMETIME - 0.6 && t < ON0) { arco(0, ang, rr - 18, hex('#9ac8f0')); luz = 0.35 + 0.25 * Math.sin(t * 9); }
  else if (t >= ON0 && t < OFF0) { const aOn = cl((ON - ON0) / (OFF0 - ON0 + 0.05)) * 6.283; if (ang > aOn) { arco(aOn, ang, rr - 18, hex('#ffb43a')); luz = 1; } }
  else if (t >= OFF0 && t < NADIE - 0.1) { const aOff = cl((OFF - OFF0) / (NADIE - OFF0 - 0.1)) * 6.283; arco(0, Math.min(ang, aOff), rr - 18, hex('#ffb43a')); luz = ang < aOff ? 1 : 0; }
  else if (t >= NADIE - 0.1) { const e = tramo(t, NADIE - 0.1, NADIE + 0.9); arco(0.3, 0.3 + 2.4 * e, rr - 17, hex('#ffb43a'), 1); arco(2.0, 2.0 + 0.9 * e, rr - 20, hex('#7ae86a'), 1); arco(3.6, 3.6 + 2.1 * e, rr - 23, hex('#e86ab8'), 1); luz = Math.sin(t * 5) > 0.2 ? 0.6 : 0.15; }
  // la aguja roja y su eje
  { const aa = ang - Math.PI / 2; R.linea(cx, cy, Math.round(cx + Math.cos(aa) * (rr - 3)), Math.round(cy + Math.sin(aa) * (rr - 3)), hex('#d82a2a')); R.linea(cx, cy, Math.round(cx - Math.cos(aa) * 5), Math.round(cy - Math.sin(aa) * 5), hex('#d82a2a')); R.disco(cx, cy, 2, K); R.pset(cx, cy, hex('#e8e8f0')); }
  for (let i = 0; i < 8; i++) tinta(cx - 18 + i, cy - 20 + Math.round(i * 0.4), BL, 0.3);
  // la luz del cielo: se enciende, se apaga, titila
  const [lx, ly] = LZ; R.disco(lx, ly, 3, hex('#2a3458'));
  if (luz > 0) { for (let k = 0; k < 3; k++) for (let a = 0; a < 6.283; a += 0.1) { const r3 = 4 + k * 3; if (bay(Math.round(lx + Math.cos(a) * r3), Math.round(ly + Math.sin(a) * r3)) < luz * (0.9 - k * 0.25)) tinta(lx + Math.cos(a) * r3, ly + Math.sin(a) * r3, hex('#fff2b0'), 0.6); } R.disco(lx, ly, 2.2, luz > 0.5 ? hex('#ffffff') : hex('#c8d4f0')); if (luz > 0.9) destello(lx, ly, 6, hex('#fff6d0')); }
  else { R.pset(lx, ly, hex('#5a6a98')); }
  for (const tt of [ON, OFF]) { const e = tramo(t, tt, tt + 0.35); if (e > 0 && e < 1) { for (let a = 0; a < 6.283; a += 0.08) R.pset(Math.round(lx + Math.cos(a) * (4 + e * 14)), Math.round(ly + Math.sin(a) * (4 + e * 14)), hex('#ffd25a')); } }
  globo(lx + 14, ly - 14, '?', hex('#3a6ac8'), tramo(t, NADIE + 0.3, NADIE + 0.6));
};
// ── 5 · dos sitios posibles en la carta del cielo ─────────────────────────────────────────────────────────────────
const LOG = td(24.33), CUAL = td(25.55), SO = td(27.55), C1 = td(27.97), C2 = td(28.61);
const CH = [96, 26, 262, 172];
const TETERA = [[180, 122], [194, 110], [206, 120], [208, 146], [182, 146], [166, 126], [170, 140], [226, 128]];
const LINEAS_T = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 5], [5, 6], [6, 4], [2, 7], [7, 3]];
const PUNTOS = [[150, 120], [140, 133]];
const cartaFijo = () => {
  madera(0, 0, 319, 179, 71);
  // la luz cálida de la lámpara que entra por arriba a la derecha
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 300, y + 10) / 260; if (d < 1 && bay(x, y) < (1 - d) * 0.6) R.pset(x, y, mez(R.pget(x, y), hex('#ffd890'), 0.22)); }
  // la sombra y el papel azul de la carta, con su margen, la cuadrícula y las estrellas
  R.rect(CH[0] + 3, CH[1] + 3, CH[2] + 3, CH[3] + 3, hex('#2a1a0e'));
  for (let y = CH[1]; y <= CH[3]; y++) for (let x = CH[0]; x <= CH[2]; x++) { const m = x < CH[0] + 3 || x > CH[2] - 3 || y < CH[1] + 3 || y > CH[3] - 3; let c = m ? hex('#e8e4d8') : tono(['#14204a', '#1a2a5a', '#22346a'].map(hex), 0.4 + hs(x >> 2, y >> 2, 7) * 0.3, x, y);
    if (!m && ((x - CH[0]) % 22 === 0 || (y - CH[1]) % 22 === 0) && (x + y) % 2 === 0) c = hex('#3a5a9a'); R.pset(x, y, c); }
  for (let y = CH[1] + 4; y < CH[3] - 3; y++) for (let x = CH[0] + 4; x < CH[2] - 3; x++) { const d = Math.abs((x - CH[0]) * 0.6 + (y - CH[1]) - 120); if (d < 20 && bay(x, y) < (1 - d / 20) * 0.35) R.pset(x, y, hex('#3a4a82')); }
  for (let k = 0; k < 160; k++) { const x = CH[0] + 5 + Math.floor(hs(k, 1, 73) * (CH[2] - CH[0] - 10)), y = CH[1] + 5 + Math.floor(hs(k, 2, 73) * (CH[3] - CH[1] - 10)), b = hs(k, 3, 73); R.pset(x, y, b > 0.8 ? BL : b > 0.4 ? hex('#a8b8e0') : hex('#6a7ab0')); if (b > 0.94) R.disco(x, y, 1, BL); }
  for (const [a, b] of LINEAS_T) R.linea(TETERA[a][0], TETERA[a][1], TETERA[b][0], TETERA[b][1], hex('#7ab0e8'));
  for (const [x, y] of TETERA) { R.disco(x, y, 1.6, BL); R.pset(x - 1, y - 1, hex('#ffffff')); }
  // el listado a la izquierda, debajo de la carta (canon: T.piezaListado; la secuencia se ve, rodeada)
  // (se pinta en cada fotograma porque se resalta)
  // el termo, la taza y el bote de lápices a la derecha
  R.rect(268, 62, 290, 150, K); R.rect(269, 63, 289, 149, hex('#3a6a4a')); for (let y = 66; y < 149; y += 6) R.linea(269, y, 289, y, hex('#2a5038')); for (let x = 272; x < 289; x += 5) R.linea(x, 63, x, 149, hex('#e8d890')); R.linea(270, 63, 270, 149, hex('#7ab08a')); R.rect(266, 54, 292, 62, hex('#c8c8d0')); R.linea(266, 54, 292, 54, hex('#f0f0f4'));
  R.rect(294, 136, 314, 156, K); R.rect(295, 137, 313, 155, hex('#f0e8d8')); R.rect(295, 137, 313, 139, hex('#5a3a22')); R.rect(314, 141, 318, 151, K); R.rect(315, 142, 317, 150, hex('#f0e8d8'));
  R.rect(298, 90, 314, 118, K); R.rect(299, 91, 313, 117, hex('#c8a040')); for (const [x, c] of [[301, '#c83a2a'], [305, '#3a6ac8'], [309, '#2a2a30']]) { R.linea(x, 76 + (x % 5), x, 91, hex(c)); R.pset(x, 75 + (x % 5), hex('#e8c89a')); }
  // la goma y la regla junto a la carta
  R.rect(268, 160, 312, 165, K); R.rect(269, 161, 311, 164, hex('#e8d8a0')); for (let x = 271; x < 311; x += 3) R.pset(x, 161, K);
};
const p5 = (t) => {
  fijo('carta', cartaFijo);
  T.piezaListado(R, 4, 26, { w: 86, hh: 146, rodea: 1, wow: 1, resalta: ease(tramo(t, LOG - 0.1, LOG + 0.5)), sombra: true });
  // la carta va encima del listado: se vuelve a poner su borde izquierdo (el listado queda debajo)
  for (let y = CH[1]; y <= CH[3]; y++) { R.pset(CH[0], y, hex('#e8e4d8')); R.pset(CH[0] + 1, y, hex('#e8e4d8')); R.pset(CH[0] - 1, y, hex('#8a7a5a')); }
  // la nota: las dos bocinas, 1 ? 2 (pegada en la esquina de la carta)
  const nt = ease(tramo(t, CUAL - 0.1, CUAL + 0.3));
  if (nt > 0) { const x0 = 104, y0 = Math.round(lerp(10, 36, nt)); R.rect(x0 + 2, y0 + 2, x0 + 52, y0 + 32, hex('#2a1a0e')); R.rect(x0, y0, x0 + 50, y0 + 30, hex('#f8e870')); R.linea(x0, y0, x0 + 50, y0, hex('#fff8b0'));
    for (const [bx, n] of [[x0 + 10, 1], [x0 + 38, 2]]) { R.poligono([[bx - 4, y0 + 18], [bx + 4, y0 + 18], [bx + 7, y0 + 6], [bx - 7, y0 + 6]], hex('#6a7080')); R.linea(bx - 7, y0 + 6, bx + 7, y0 + 6, hex('#b8c0c8')); R.numero(String(n), bx + 1, y0 + 28, { centro: true, color: K, sombra: false }); }
    if (nt >= 1) R.icono('?', x0 + 23, y0 + 9, hex('#c83a2a'), null, 1); }
  // los dos círculos de lápiz rojo junto al asa de la tetera
  const c1 = tramo(t, C1 - 0.1, C1 + 0.45), c2 = tramo(t, C2 - 0.05, C2 + 0.5);
  const circ = (cx, cy, e) => { for (let a = 0; a < e * 6.6; a += 0.06) { const aa = a - 0.6, r = 7 + (a > 6 ? 0.6 : 0); R.pset(Math.round(cx + Math.cos(aa) * r), Math.round(cy + Math.sin(aa) * r), hex('#ff4a3a')); R.pset(Math.round(cx + Math.cos(aa) * (r + 0.6)), Math.round(cy + Math.sin(aa) * (r + 0.6)), hex('#c82a1a')); } };
  if (c1 > 0) circ(PUNTOS[0][0], PUNTOS[0][1], c1); if (c2 > 0) circ(PUNTOS[1][0], PUNTOS[1][1], c2);
  // la mano con el lápiz rojo: espera abajo, en «so there are» sube, dibuja un círculo y otro, y se retira
  let tip;
  if (t < SO) tip = [212, 172]; else if (t < C1 - 0.1) tip = [lerp(212, PUNTOS[0][0] + 7 * Math.cos(-0.6), ease(tramo(t, SO, C1 - 0.1))), lerp(172, PUNTOS[0][1] + 7 * Math.sin(-0.6), ease(tramo(t, SO, C1 - 0.1)))];
  else if (c1 < 1) { const a = c1 * 6.6 - 0.6; tip = [PUNTOS[0][0] + Math.cos(a) * 7, PUNTOS[0][1] + Math.sin(a) * 7]; }
  else if (t < C2 - 0.05) { const e = ease(tramo(t, C1 + 0.45, C2 - 0.05)); tip = [lerp(PUNTOS[0][0] + 7 * Math.cos(6), PUNTOS[1][0] + 7 * Math.cos(-0.6), e), lerp(PUNTOS[0][1] + 7 * Math.sin(6), PUNTOS[1][1] + 7 * Math.sin(-0.6), e)]; }
  else if (c2 < 1) { const a = c2 * 6.6 - 0.6; tip = [PUNTOS[1][0] + Math.cos(a) * 7, PUNTOS[1][1] + Math.sin(a) * 7]; }
  else { const e = ease(tramo(t, C2 + 0.6, C2 + 1.4)); tip = [lerp(PUNTOS[1][0] + 7, 214, e), lerp(PUNTOS[1][1], 174, e)]; }
  const [px, py] = tip.map(Math.round), wx = px + 15, wy = py + 9;
  lapiz(wx - 6, wy - 2, px, py, hex('#d83a2a'));
  { const sy = Math.max(194, wy + 52); T.brazo(R, wx + 22, sy, wx, wy, '#5a4a7a', -1, { codo: [wx + 16, Math.round((wy + sy) / 2)] }); }
  // vida: el vapor de la taza y una mariquita que pasea por la mesa
  vapor(t, 304, 134, 3);
  { const q = ((t - P5) * 6) % 70, x = Math.round(318 - q), y = 170 + Math.round(Math.sin(q * 0.3)); R.disco(x, y, 2, K); R.disco(x, y, 1.5, hex('#e83a2a')); R.pset(x, y, K); R.pset(x - 2, y, K); }
};
// ── 6 · sesenta días mirando la franja: nada ──────────────────────────────────────────────────────────────────────
const NOTHING = tz(34.37), ESCUCHAN = tz(32.09);
const p6 = (t) => {
  const dias = Math.max(1, Math.min(60, Math.floor(curva(t, [[P6 + 0.2, 1], [NOTHING - 0.2, 60]]))));
  const o = { encuadre: 'caminos', camara: 'franja', dias };
  T.cielo2(R, t, o);
  // la luna cambia de fase con los días y las nubes pasan (en el hueco entre la franja y el horizonte)
  { const mx = 150, my = 94, f = (dias % 29.5) / 29.5; R.disco(mx, my, 6, hex('#e8e4d0')); const sx = Math.cos(f * 6.283) * 6; for (let y = -6; y <= 6; y++) for (let x = -6; x <= 6; x++) { if (x * x + y * y > 36) continue; const lim = Math.sqrt(36 - y * y), sombra = f < 0.5 ? x < lerp(lim, -lim, f * 2) : x > lerp(lim, -lim, (f - 0.5) * 2) * -1; if (sombra) R.pset(mx + x, my + y, hex('#1a2244')); } R.pset(mx - 2, my - 1, hex('#c8c4b0')); R.pset(mx + 1, my + 2, hex('#c8c4b0')); }
  nubes(t, 0, 204, 70, 116, 7, 81);
  for (let k = 0; k < 2; k++) murcielago(210 - ((t * (26 + k * 10) + k * 90) % 230), 80 + k * 16 + Math.sin(t * 4 + k) * 4, t, k);
  luciernagas(t, 4, 200, 146, 172, 12, 83);
  // el zorro cruza por delante de la oreja
  { const q = tramo(t, P6 + 0.6, P6 + 4.0); if (q > 0 && q < 1) { const x = Math.round(lerp(-12, 124, q)), y = 170, p = Math.floor(t * 10) % 2, Z = hex('#d8742a'), ZS = hex('#9a4a1a');
    R.rect(x, y - 5, x + 9, y - 2, Z); R.rect(x, y - 2, x + 9, y - 2, ZS); R.rect(x + 9, y - 7, x + 12, y - 3, Z); R.pset(x + 13, y - 4, K); R.pset(x + 10, y - 8, K); R.pset(x + 12, y - 8, K); R.pset(x + 11, y - 5, K);
    for (let i = 0; i < 6; i++) R.pset(x - 1 - i, y - 4 + Math.round(i * 0.3), i > 3 ? BL : Z); R.pset(x + 1 + p, y - 1, K); R.pset(x + 1 + p, y, K); R.pset(x + 7 - p, y - 1, K); R.pset(x + 7 - p, y, K); } }
  // la mesita con el receptor portátil (luz que late) y el cable
  R.rect(158, 156, 184, 158, K); R.rect(159, 156, 183, 157, hex('#8a6440')); R.linea(160, 159, 160, 174, K); R.linea(182, 159, 182, 174, K);
  R.rect(162, 146, 180, 155, K); R.rect(163, 147, 179, 154, hex('#4e5a52')); R.rect(165, 149, 171, 152, hex('#f0e0a8')); R.pset(176, 149, Math.sin(t * 5) > 0 ? hex('#ff5a3a') : hex('#6a2a1a')); R.disco(176, 152, 1.5, K);
  const nada = t > NOTHING - 0.05, encoge = t > NOTHING - 0.05 && t < NOTHING + 0.5;
  const a = R.actor(EL.voluntario1WO, 140, 174, t, { dir: 1, tocado: 'auriculares', sostiene: !nada && t > ESCUCHAN - 0.6 ? [168, 150] : false, brazos: encoge, triste: nada && !encoge, sonrisa: t < ESCUCHAN - 0.6 });
  const b = R.actor(EL.voluntaria2WO, 188, 174, t, { dir: -1, tocado: 'auriculares', sostiene: !encoge, triste: nada, habla: t > ESCUCHAN && t < NOTHING - 0.4 && Math.sin(t * 7) > 0.3 });
  if (b && b.mano && !encoge) { const [mx, my] = b.mano; R.rect(mx - 5, my - 4, mx + 1, my + 3, K); R.rect(mx - 4, my - 3, mx, my + 2, hex('#f0ead8')); for (let j = -2; j < 2; j += 2) R.linea(mx - 3, my + j, mx - 1, my + j, hex('#8a8ab0')); }
  if (nada) globo(178, 136, 'X', hex('#8a8a9a'), tramo(t, NOTHING + 0.1, NOTHING + 0.4));
  T.cielo2Delante(R, t, o);
};
// ── 7 · Ehman, años después ──────────────────────────────────────────────────────────────────────────────────────
const NOMBRE = tz(36.22), SENSE = tz(37.22), SERES = tz(39.08);
const p7 = (t) => {
  const o = { encuadre: 'despacho' };
  T.hoy(R, t, o);
  const w = tramo(t, P7 + 0.05, NOMBRE - 0.3), x = Math.round(lerp(30, 112, ease(w))), anda = w > 0 && w < 1, dedo = t > SENSE - 0.05 && t < SENSE + 0.9;
  const e = R.actor(EL.ehmanWO, x, 156, t, { dir: t > NOMBRE - 0.3 ? -1 : 1, anda, dedo, sostiene: !dedo, habla: t > NOMBRE && Math.sin(t * 8) > -0.4 && !(t > SERES + 0.5 && t < SERES + 0.9), sonrisa: t > SERES + 0.5 });
  if (e && e.mano && !dedo) { const [mx, my] = e.mano; R.rect(mx - 4, my - 6, mx + 3, my + 3, K); R.rect(mx - 3, my - 5, mx + 2, my + 2, hex('#f4f0e0')); for (let j = -4; j < 2; j += 3) R.linea(mx - 3, my + j, mx + 2, my + j, hex('#bfe8c8')); }
  if (dedo) globo(x + 2, 116, '!', hex('#3a8a4a'), tramo(t, SENSE, SENSE + 0.3));
  T.hoyDelante(R, t, o);
  // el ordenador beige de los noventa sobre el escritorio (pantalla con renglones de puntos y un cursor)
  R.rect(232, 98, 262, 122, K); R.rect(233, 99, 261, 121, hex('#d8d0b8')); R.rect(236, 102, 258, 116, K); R.rect(237, 103, 257, 115, hex('#0a2a14'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 9 - (j * 2) % 5; i++) R.pset(239 + i * 2, 105 + j * 3, hex('#5aff7a'));
  if (Math.floor(t * 2) % 2) R.rect(239 + 18, 114, 240 + 18, 114, hex('#9affaa'));
  R.rect(242, 122, 252, 126, hex('#b8b098')); R.rect(228, 124, 266, 127, K); R.rect(229, 124, 265, 126, hex('#d8d0b8')); for (let i = 231; i < 264; i += 2) R.pset(i, 125, hex('#8a8470'));
  R.pset(259, 119, Math.sin(t * 3) > 0 ? hex('#5aff7a') : hex('#2a5a2a'));
};
// ── 8 · lo habrían mandado muchas veces: el faro ───────────────────────────────────────────────────────────────────
const SENT = tz(40.64), PER = 0.82;
const FX = 240, FY = 46;
const faroFijo = () => {
  cieloNoche(0, 0, 319, 112, 91);
  // la luna y su reflejo
  R.disco(62, 46, 7, hex('#f0ecd8')); R.disco(64, 44, 2, hex('#d8d4c0')); R.pset(59, 48, hex('#d8d4c0'));
  // el mar (tramado, con crestas) y la costa lejana
  for (let x = 0; x < 320; x++) { const a = Math.round(3 + Math.sin(x * 0.04) * 3 + hs(x >> 3, 2, 92) * 2); R.linea(x, 112 - a, x, 112, hex('#0a0e1c')); }
  for (let y = 113; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(['#0a1430', '#10204a', '#16285a', '#1e3468'].map(hex), (y - 113) / 80 + hs(x >> 2, y, 93) * 0.2, x, y));
  // el acantilado a la derecha con hierba arriba
  const ROCA = ['#16161e', '#202028', '#2c2c36', '#3a3a46', '#4e4e5c', '#6a6a7a'].map(hex);
  const topA = (x) => Math.round(116 - Math.min(18, (x - 176) * 0.5) + Math.sin(x * 0.2) * 2);
  for (let x = 172; x < 320; x++) { const top = topA(Math.max(176, x)); for (let y = top; y < 180; y++) {
      // estratos inclinados, bloques con su cara de luna (a la izquierda) y grietas
      const e = (y + x * 0.28) / 9, fe = e - Math.floor(e), bq = Math.floor(e), col = Math.floor((x + bq * 7) / 13), fx = ((x + bq * 7) % 13) / 13;
      let f = 0.35 + (hs(col, bq, 94) - 0.5) * 0.3 + (1 - fx) * 0.18 - (y - top) * 0.002;
      if (fe < 0.12) f = 0.08; else if (fe < 0.22) f += 0.2; if (fx < 0.08) f = 0.12;
      if (hs(x, y, 95) > 0.93) f += 0.15;
      R.pset(x, y, tono(ROCA, f, x, y)); }
    // la hierba de arriba con matas, en tres verdes
    for (let j = 0; j < 4; j++) R.pset(x, top + j, j === 0 ? hex('#5a8a3a') : j < 2 ? hex('#3a6a2a') : (hs(x, j, 96) > 0.5 ? hex('#2a4a22') : ROCA[1]));
    if (hs(x, 1, 97) > 0.55) { R.pset(x, top - 1, hex('#4a7a32')); if (hs(x, 2, 97) > 0.7) R.pset(x, top - 2, hex('#6a9a4a')); } }
  // las rocas sueltas al pie, con su filo de luna
  for (let k = 0; k < 9; k++) { const x = 164 + k * 8 + Math.round(hs(k, 1, 98) * 4), y = 168 + (k % 3) * 4, r = 3 + (k % 2) * 2; R.disco(x, y, r, ROCA[1]); R.disco(x - 1, y - 1, r - 1, ROCA[2]); for (let a = 3.4; a < 4.8; a += 0.2) R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), ROCA[4]); }
  // la valla de madera del borde y el sendero con escalones hasta la casa
  for (let x = 196; x < 256; x += 8) { const y = topA(x); R.linea(x, y - 7, x, y, hex('#6a5038')); R.pset(x, y - 7, hex('#9a7a58')); }
  for (let x = 196; x < 256; x++) { const y = topA(x); R.pset(x, y - 6, hex('#8a6a4a')); R.pset(x, y - 3, hex('#6a5038')); }
  for (let k = 0; k < 6; k++) { const x = 300 - k * 6, y = 112 + k * 3; R.rect(x - 3, y, x + 3, y + 1, hex('#8a8478')); R.pset(x - 3, y + 2, ROCA[0]); }
  // el faro: torre blanca con bandas rojas, galería, linterna y cúpula
  for (let y = FY + 12; y <= 102; y++) { const w = Math.round(7 + (y - FY - 12) * 0.1), banda = Math.floor((y - FY - 12) / 11) % 2 === 1; for (let x = FX - w; x <= FX + w; x++) { const l = (x - FX + w) / (2 * w); R.pset(x, y, banda ? (l > 0.7 ? hex('#8a1e1e') : hex('#c83a2a')) : (l > 0.7 ? hex('#a8a8b8') : hex('#e8e8f0'))); } R.pset(FX - w - 1, y, K); R.pset(FX + w + 1, y, K); }
  R.rect(FX - 3, 88, FX + 1, 101, hex('#3a2a20'));
  R.rect(FX - 11, FY + 10, FX + 11, FY + 12, K); for (let x = FX - 11; x <= FX + 11; x += 3) R.linea(x, FY + 7, x, FY + 10, K); R.linea(FX - 11, FY + 7, FX + 11, FY + 7, K);
  R.rect(FX - 7, FY - 2, FX + 7, FY + 7, K); R.rect(FX - 6, FY - 1, FX + 6, FY + 6, hex('#3a3a2a'));
  R.poligono([[FX - 9, FY - 2], [FX + 9, FY - 2], [FX, FY - 10]], K); R.poligono([[FX - 8, FY - 3], [FX + 8, FY - 3], [FX, FY - 9]], hex('#8a1e1e')); R.pset(FX, FY - 11, K);
  // la casa del farero con la ventana encendida
  R.rect(256, 90, 300, 112, K); R.rect(257, 91, 299, 111, hex('#d8d4c8')); R.poligono([[252, 91], [304, 91], [278, 76]], K); R.poligono([[254, 90], [302, 90], [278, 78]], hex('#5a3a3a'));
  R.rect(286, 80, 291, 88, K); R.rect(287, 81, 290, 88, hex('#7a5a4a')); R.rect(264, 96, 274, 104, K); R.rect(265, 97, 273, 103, hex('#ffd890')); R.linea(269, 97, 269, 103, hex('#8a6a3a')); R.rect(282, 99, 290, 111, hex('#5a3a22'));
};
const p8 = (t) => {
  fijo('faro', faroFijo);
  titilan(t, 0, 0, 319, 100, 30, 95); nubes(t, 0, 319, 26, 80, 6, 96);
  // las olas: crestas que se mueven y el reflejo de la luna que tiembla
  for (let k = 0; k < 110; k++) { const y = 114 + Math.floor(hs(k, 1, 97) * 64), w = 2 + Math.floor((y - 112) / 9), x0 = ((hs(k, 2, 97) * 200 + t * (4 + (y - 112) * 0.2)) % 200) - 10; for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 172) continue; R.pset(x, y, hs(k, 3, 97) > 0.5 ? hex('#5a7ab8') : hex('#3a5a98')); } }
  for (let y = 116; y < 178; y += 2) { const w = 2 + Math.round(Math.sin(t * 3 + y) * 2); const x = 62 + Math.round(Math.sin(t * 2 + y * 0.4) * 3); R.linea(x - w, y, x + w, y, hex('#d8d4b8')); }
  // el barquito con su farol que pasa
  { const bx = Math.round(170 - ((t - P8) * 9) % 220), by = 138; R.poligono([[bx - 8, by], [bx + 8, by], [bx + 5, by + 4], [bx - 6, by + 4]], K); R.linea(bx, by, bx, by - 10, K); R.poligono([[bx + 1, by - 9], [bx + 1, by - 2], [bx + 7, by - 2]], hex('#d8d4c8')); R.pset(bx - 4, by - 2, hex('#ffd25a')); tinta(bx - 4, by + 6, hex('#ffd25a'), 0.4); }
  // la espuma que rompe contra las rocas del pie
  for (let k = 0; k < 14; k++) { const q = ((t * 0.7 + hs(k, 1, 99)) % 1), x = Math.round(160 + hs(k, 2, 99) * 30 + q * 6), y = Math.round(176 - Math.sin(q * Math.PI) * (6 + hs(k, 3, 99) * 10)); if (q < 0.85) { R.pset(x, y, BL); if (hs(k, 4, 99) > 0.5) R.pset(x + 1, y, hex('#c8d8f0')); } }
  for (let x = 150; x < 196; x++) { const y = 177 + Math.round(Math.sin(x * 0.5 + t * 4) * 1.2); R.pset(x, y, hex('#e8f0ff')); if ((x + Math.floor(t * 6)) % 4 === 0) R.pset(x, y - 1, hex('#a8c0e8')); }
  // dos gaviotas dormidas en las rocas, una mueve la cabeza
  for (const [gx, gy, k] of [[178, 160, 0], [204, 165, 1]]) { R.rect(gx - 2, gy - 2, gx + 2, gy, hex('#e8e8f0')); R.pset(gx - 3, gy - 1, hex('#8a8a98')); const mira = k === 0 && Math.sin(t * 1.4) > 0.3 ? 1 : 0; R.pset(gx + 2 + mira, gy - 3, hex('#f0f0f8')); R.pset(gx + 3 + mira, gy - 3, hex('#f0a030')); }
  // la boya lejana que parpadea
  R.pset(120, 120, Math.sin(t * 2.4) > 0.6 ? hex('#5aff7a') : hex('#1a3a2a'));
  // el humo de la chimenea
  for (let i = 0; i < 5; i++) { const q = (t * 0.4 + i / 5) % 1; tinta(288 + q * 10 + Math.sin(q * 5 + t) * 2, 78 - q * 22, hex('#8a8ea8'), 0.5 * (1 - q)); }
  // la luz del faro: el haz que barre y el destello hacia nosotros una y otra vez, contados
  const ang = (t - SENT) / PER * 6.283 + Math.PI;
  for (const s of [0, Math.PI]) { const a = ang + s, vis = Math.cos(a); if (vis > -0.2) { const L = 230 * (0.5 + 0.5 * Math.abs(Math.sin(a))), dir = Math.sin(a) > 0 ? 1 : -1; for (let i = 8; i < L; i += 1) { const w = i * 0.08; for (let j = -w; j <= w; j += 1) { const x = Math.round(FX + dir * i), y = Math.round(FY + 2 + j + i * 0.04); if (x < 0 || x > 319 || tranquila(x, y)) continue; if (bay(x, y) < 0.55 * (1 - i / L) * (0.4 + 0.6 * vis)) tinta(x, y, hex('#ffe890'), 0.6); } } } }
  const fase = (t - SENT) / PER, n = Math.floor(fase) + 1, fr = fase - Math.floor(fase);
  const brillo = t >= SENT - 0.05 ? Math.max(0, 1 - fr * 3) : 0.2;
  R.rect(FX - 6, FY - 1, FX + 6, FY + 6, mez(hex('#8a7a3a'), hex('#fffbe0'), brillo));
  if (brillo > 0.2) { for (let k = 1; k < 4; k++) for (let a = 0; a < 6.283; a += 0.08) { const r3 = 6 + k * 5 * brillo; if (bay(Math.round(FX + Math.cos(a) * r3), Math.round(FY + 2 + Math.sin(a) * r3)) < brillo * (1 - k * 0.22)) tinta(FX + Math.cos(a) * r3, FY + 2 + Math.sin(a) * r3, hex('#fff6c8'), 0.6); } destello(FX, FY + 2, Math.round(4 + brillo * 8), hex('#ffffff')); }
  // cada destello, su número que sube y se apaga (1, 2, 3, 4, 5…)
  if (t >= SENT - 0.05) for (let k = Math.max(1, n - 1); k <= n; k++) { const q = fase - (k - 1); if (q < 0 || q > 1.3) continue; const y = Math.round(FY + 6 - q * 22); if (q < 1) chapa(212 - (k % 2) * 8, y - 2, k, 1, hex('#8a5a10'), q < 0.6 ? hex('#fff2b0') : hex('#e8c878')); }
};
const año = (t) => (t < P7 ? 1977 : 1994);
const efectos = [[DOS, 'pop'], [EARS + 0.02, 'boing'], [SIDE + 0.55, 'tic'], [MISMO, 'brillo'], [APART + 0.4, 'tic'], [FIJO - 0.05, 'golpecito'], [TWICE + 0.1, 'lapiz'], [FIN1 + 0.4, 'golpecito'], [FIN1 + 0.95, 'pop'],
  [SOMETIME - 0.6, 'tic'], [ON, 'interruptor'], [OFF, 'interruptor'], [NADIE + 0.35, 'pop'], [LOG, 'papel'], [CUAL, 'pop'], [C1, 'lapiz'], [C2, 'lapiz'], [P6 + 0.3, 'papel'], [NOTHING + 0.1, 'viento'],
  [SENSE, 'pop'], [SENT, 'brillo'], [SENT + 1.4, 'ola']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { efectos, año });
''')
