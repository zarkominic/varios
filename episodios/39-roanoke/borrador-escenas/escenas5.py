E = {}

# piezas comunes de las dos escenas (se pegan al principio de cada cuerpo)
COMUN = r'''
const K = hex('#17151d'), BL = hex('#f6f2ea'), H = (s) => hex(s);
const ease = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { a = Math.max(0, Math.min(1, a)); const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// un fondo fijo propio, en su búfer (se pinta una vez)
const CAPAS = new Map();
const capa = (clave, dibuja) => { let b = CAPAS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); R.recorte(null); CAPAS.set(clave, b); } R.copiar(b); };
// tramado de Bayer 4×4 y degradado vertical tramado entre varios colores
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const deg = (x0, y0, x1, y1, cols) => { const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), r = f - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, r > bay(x, y) ? cols[i + 1] : cols[i]); } };
// las zonas que se quedan tranquilas: Atom y la barra del año
const tranquilo = (x, y) => (x >= 268 && y <= 50) || (x >= 14 && x <= 176 && y <= 24);
// nube de tres tonos (sombra, cuerpo, luz)
const nube3 = (cx, cy, w, c) => {
  const b = [[0, 0, 0.3], [-0.3, 0.06, 0.22], [0.3, 0.05, 0.24], [-0.1, -0.12, 0.24], [0.14, -0.09, 0.2], [0.46, 0.1, 0.14], [-0.46, 0.1, 0.13]];
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), Math.round(r * w), c[0]);
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), Math.round(r * w * 0.9), c[1]);
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 2), Math.round(r * w * 0.58), c[2]);
};
const nubes = (t, t0, lista, c) => { for (const [x0, y, w, v] of lista) nube3(Math.round(x0 + (t - t0) * v), y, w, c); };
// mata de hierba o junco que se mece
const mata = (x, b, h, t, c, cl, k = 0, fuerza = 1) => { const m = Math.sin(t * 2.2 + x * 0.21 + k) * fuerza;
  for (let i = -2; i <= 2; i++) { const h2 = h - Math.abs(i) * 1.4, tx = Math.round(x + i * 1.6 + m * h2 * 0.25); R.linea(x + i, b, tx, Math.round(b - h2), i % 2 ? cl : c); } };
// copa redonda en racimos
const copa = (cx, cy, r, c, cl, cs, k0 = 0) => { for (let k = 0; k < 7; k++) { const a = hh(k, 1, k0) * 6.28, d = r * 0.55 * hh(k, 2, k0); R.disco(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d * 0.7 + 1), Math.round(r * 0.5), cs); }
  for (let k = 0; k < 7; k++) { const a = hh(k, 1, k0) * 6.28, d = r * 0.55 * hh(k, 2, k0); R.disco(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d * 0.7), Math.round(r * 0.45), c); }
  for (let k = 0; k < 5; k++) { const a = hh(k, 3, k0) * 3 + 3.4, d = r * 0.5 * hh(k, 4, k0); R.disco(Math.round(cx + Math.cos(a) * d - 1), Math.round(cy + Math.sin(a) * d * 0.7 - 2), Math.round(r * 0.22), cl); } };
// elipse rellena (con linea: respeta el recorte)
const elipse = (cx, cy, rx, ry, c) => { for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (dy / (ry + 0.5)) ** 2))); R.linea(Math.round(cx - w), Math.round(cy + dy), Math.round(cx + w), Math.round(cy + dy), c); } };
// pájaro lejano (una uve que aletea)
const pajaro = (x, y, t, k, c) => { x = Math.round(x); y = Math.round(y); if (tranquilo(x, y)) return; const a = Math.sin(t * 9 + k) > 0 ? -1 : 1; R.pset(x, y, c); R.pset(x - 1, y + a, c); R.pset(x - 2, y + a, c); R.pset(x + 1, y + a, c); R.pset(x + 2, y + a, c); };
// una ficha blanca que sube con el objeto ampliado (lo que no se leería a 640 px): u 0–1 la abre; la raya baja al objeto
const ficha = (cx, top, w, h, u, ax, ay, dibuja) => { if (u <= 0) return; const s = ease(Math.min(1, u * 1.6)), W = Math.max(4, Math.round(w * s)), Hh = Math.max(3, Math.round(h * s));
  const x0 = Math.round(cx - W / 2), y0 = Math.round(top + (h - Hh) / 2), x1 = x0 + W, y1 = y0 + Hh;
  if (ax != null) for (let i = 0, n = Math.max(1, Math.round(Math.hypot(ax - cx, ay - y1))); i <= n; i += 2) R.pset(Math.round(cx + (ax - cx) * i / n), Math.round(y1 + (ay - y1) * i / n), K);
  R.rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, H('#3a3440')); R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, BL); R.rect(x0 + 1, y1 - 2, x1 - 1, y1 - 1, H('#d8d0c0'));
  if (s > 0.95) dibuja(x0 + 2, y0 + 2, x1 - 2, y1 - 2); };
// bocadillo de pensamiento: nube blanca con borde y tres bolitas hacia (hx, hy)
const pensamiento = (cx, cy, w, hgt, hx, hy, u = 1) => {
  if (u <= 0) return; const s = Math.min(1, u);
  const W = Math.round(w * s), Hh = Math.round(hgt * s);
  for (const [dx, dy, r] of [[0, 0, 1], [-0.32, 0.1, 0.7], [0.34, 0.08, 0.72], [-0.12, -0.18, 0.75], [0.18, -0.16, 0.7]]) R.disco(Math.round(cx + dx * W), Math.round(cy + dy * Hh), Math.round(Math.min(W, Hh) * 0.5 * r) + 1, K);
  for (const [dx, dy, r] of [[0, 0, 1], [-0.32, 0.1, 0.7], [0.34, 0.08, 0.72], [-0.12, -0.18, 0.75], [0.18, -0.16, 0.7]]) R.disco(Math.round(cx + dx * W), Math.round(cy + dy * Hh), Math.round(Math.min(W, Hh) * 0.5 * r), BL);
  R.rect(Math.round(cx - W * 0.42), Math.round(cy - 1), Math.round(cx + W * 0.42), Math.round(cy + Hh * 0.25), BL);
  for (const [f, r] of [[0.35, 3], [0.62, 2], [0.85, 1]]) { const x = Math.round(lerp(cx - W * 0.2, hx, f)), y = Math.round(lerp(cy + Hh * 0.4, hy, f)); R.disco(x, y, r + 1, K); R.disco(x, y, r, BL); }
};
// un globo redondo con un símbolo (? !) que sale con un pequeño rebote
const globo = (x, y, u, ic, c) => { if (u <= 0) return; const s = ease(Math.min(1, u * 2)), r = Math.max(2, Math.round(8 * s + Math.sin(Math.min(1, u * 2) * 3.14) * 2));
  R.disco(x + 1, y + 1, r + 1, H('#3a3440')); R.disco(x, y, r + 1, K); R.disco(x, y, r, BL); R.poligono([[x - 3, y + r - 1], [x + 1, y + r - 1], [x - 4, y + r + 4]], BL); R.linea(x - 4, y + r + 4, x - 3, y + r, K);
  if (s > 0.9) R.icono(ic, x - 4, y - 5, c, BL, 1.4); };
// la lente de aumento: los píxeles de debajo, ampliados z veces (lo que se ve por la lupa)
const lente = (cx, cy, r, z, tinte) => { const pix = [];
  for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) if (dx * dx + dy * dy <= r * r) pix.push([cx + dx, cy + dy, R.pget(Math.round(cx + dx / z), Math.round(cy + dy / z))]);
  for (const [x, y, c] of pix) R.pset(x, y, tinte ? mez(c, tinte, 0.12) : c); };
// las escamas de hierro y las chispas que saltan de un golpe (t0 el golpe; n piezas)
const chispazo = (t, t0, x, y, n, k0, escala = 1) => { const d = t - t0; if (d < 0 || d > 0.9) return;
  for (let k = 0; k < n; k++) { const a = -Math.PI * (0.1 + 0.8 * hh(k, 1, k0)), v = (30 + 50 * hh(k, 2, k0)) * escala, px = Math.round(x + Math.cos(a) * v * d), py = Math.round(y + Math.sin(a) * v * d + 90 * d * d * escala);
    if (tranquilo(px, py)) continue; const chispa = k % 3 === 0; if (chispa && d > 0.45) continue;
    R.pset(px, py, chispa ? (d < 0.2 ? H('#fff4b0') : H('#ffa040')) : (k % 2 ? H('#a8b8c8') : H('#6a7a8a'))); if (!chispa && escala > 1.2) R.pset(px + 1, py, H('#4a5664')); } };
'''

E['rk-mapa'] = ('Mapa', '''// RK-MAPA (frases 22–23), sin cartela. Siete planos (el encargo daba cinco para 35,6 s: dos se parten):
// 1. 2012, la fachada de columnas del Museo Británico bajo la llovizna: dos investigadores cruzan la explanada y suben la
//    escalinata, ella con el paraguas y él con la carpeta plana del mapa; un taxi negro pasa; en «British Museum» las
//    palomas de la escalinata echan a volar (corta en «researchers»);
// 2. la sala del museo: la conservadora llega a la mesa de luz y señala el mapa en «map drawn by John White»; el
//    investigador enciende la mesa en «light» y manda el cabezal de rayos X en «x-rays» (corta en «Under»);
// 3. el mapa de cerca: la franja de rayos X barre la hoja, el parche se aclara en «patch» y en «star» sale la estrellita;
//    la lupa de brazo entra en «tiny» y la amplía; en «mark of a fort» una ficha con un fuertecito y «?» (corta en «It's»);
// 4. inserto: el portátil del investigador sobre la mesa del museo, con un mapa de hoy en la pantalla; en «inland» sale la
//    estrella al fondo del estrecho, en «sound» el estrecho brilla, en «roughly as far» la línea de puntos va de Roanoke a la
//    estrella y en «talked about moving» tres figuritas la recorren con «?»; la mano mueve el cursor (corta en
//    «Archaeologists»);
// 5. 2012, el Sitio X: la arqueóloga raspa junto a la cuadrícula; el voluntario clava la estaca de la «X» en «Site X»; en
//    «found fragments» los trozos destellan y ella se sorprende y los señala (corta en «English pottery»);
// 6. los trozos de cerámica en la bandeja: van a su sitio en el perfil de la jarra; en «those years» la ficha 1587, en
//    «English» la banderita de San Jorge; la mano con el cepillo (corta en «It may»);
// 7. 1588: la senda entre juncos a la orilla del estrecho: un grupo pequeño de colonos cruza el puente de troncos hacia el
//    interior; «?» en «may»; el niño se para, se vuelve a despedirse de Roanoke y corre detrás de los suyos.''', COMUN + r'''
const A = (s) => en('parche', (s - 0.5) / 19.147), B = (s) => en('sitiox', (s - 21.38) / 12.234);
const P2 = A(4.52), P3 = A(9.57), P4 = A(14.44), P5 = B(21.38), P6 = B(26.54), P7 = B(31.28);
// ── 1 · 2012: la fachada del Museo Británico con llovizna ───────────────────────────────────────────────────────────
const PIEDRA = H('#d6cdb8'), PIEDRAS = H('#b4aa94'), PIEDRAL = H('#ece6d4'), PIEDRASS = H('#8e8676');
const MUSEO = A(3.4);
const fronton = () => {
  R.poligono([[34, 55], [160, 23], [286, 55]], K); R.poligono([[37, 54], [160, 25], [283, 54]], PIEDRAL);
  R.poligono([[52, 51], [160, 30], [268, 51]], PIEDRAS); R.linea(52, 51, 160, 30, PIEDRASS); R.linea(160, 30, 268, 51, PIEDRAL);
  // las figuras del tímpano, en relieve (sin caras): de pie en el centro, recostadas hacia las esquinas
  for (let k = 0; k < 17; k++) { const x = 66 + k * 12, top = 51 - Math.round((1 - Math.abs(x - 160) / 112) * 19), alto = Math.max(3, 51 - top - 3);
    R.rect(x - 2, 51 - alto, x + 1, 50, PIEDRA); R.rect(x - 1, 51 - alto - 2, x, 51 - alto - 1, PIEDRA); R.linea(x + 1, 51 - alto, x + 1, 50, PIEDRASS); R.pset(x - 2, 51 - alto, PIEDRAL); }
  R.rect(34, 55, 286, 60, PIEDRAL); R.linea(34, 55, 286, 55, K); for (let x = 36; x < 285; x += 3) R.rect(x, 58, x + 1, 59, PIEDRAS); R.linea(34, 60, 286, 60, PIEDRASS);
};
const casas = (x0, x1, y0) => { R.rect(x0, y0, x1, 149, H('#7a4e3e')); R.rect(x0, y0 - 4, x1, y0, H('#5a3a30'));
  for (let y = y0 + 2; y < 149; y += 3) { R.linea(x0, y, x1, y, H('#6a4234')); for (let x = x0 + ((y >> 1) % 2) * 3; x < x1; x += 6) R.pset(x, y + 1, H('#6a4234')); }
  for (let wy = y0 + 8; wy < 140; wy += 22) for (let wx = x0 + 4; wx < x1 - 8; wx += 16) { R.rect(wx, wy, wx + 9, wy + 14, H('#e8e2d4')); R.rect(wx + 1, wy + 1, wx + 8, wy + 13, H('#34404e')); R.linea(wx + 5, wy + 1, wx + 5, wy + 13, H('#e8e2d4')); R.linea(wx + 1, wy + 7, wx + 8, wy + 7, H('#e8e2d4')); R.pset(wx + 2, wy + 2, H('#7a8aa0')); R.rect(wx - 1, wy + 15, wx + 10, wy + 15, PIEDRAL); } };
const p1 = (t) => {
  capa('m1', () => {
    deg(0, 0, 319, 84, [H('#7e8a9a'), H('#98a2b0'), H('#b2bac2'), H('#c6cacd')]);
    casas(0, 34, 62); casas(286, 319, 76);
    for (const x of [8, 22, 296, 310]) { R.rect(x, x < 100 ? 50 : 64, x + 5, x < 100 ? 58 : 72, H('#8a5a46')); R.rect(x + 1, x < 100 ? 47 : 61, x + 2, x < 100 ? 50 : 64, H('#c8704a')); R.rect(x + 3, x < 100 ? 48 : 62, x + 4, x < 100 ? 50 : 64, H('#c8704a')); }
    // el muro del pórtico, con hiladas
    R.rect(38, 60, 282, 126, H('#9a907c')); for (let y = 66; y < 126; y += 6) { R.linea(38, y, 282, y, H('#8a806e')); for (let x = 38 + (y % 12 ? 0 : 9); x < 282; x += 18) R.linea(x, y, x, y + 5, H('#8a806e')); }
    for (let i = 0; i < 8; i++) { const cx = Math.round(46 + i * 28.5 + 14); if (i === 3 || i === 4) continue;
      R.rect(cx - 6, 72, cx + 6, 112, PIEDRAL); R.rect(cx - 5, 73, cx + 5, 111, H('#2e3644')); R.linea(cx, 73, cx, 111, PIEDRA); for (const y of [82, 92, 102]) R.linea(cx - 5, y, cx + 5, y, PIEDRA); R.pset(cx - 3, 75, H('#6a7a90')); R.pset(cx + 2, 85, H('#6a7a90')); R.rect(cx - 7, 112, cx + 7, 113, PIEDRA); }
    R.rect(140, 74, 180, 126, PIEDRAL); R.rect(143, 77, 177, 126, PIEDRAS); R.rect(146, 80, 174, 126, H('#2a2018'));
    // las columnas jónicas
    for (let i = 0; i < 9; i++) { const x = Math.round(46 + i * 28.5);
      R.rect(x - 4, 67, x + 4, 122, PIEDRA); for (const dx of [-2, 0, 2]) R.linea(x + dx, 68, x + dx, 121, PIEDRAS); R.linea(x - 4, 67, x - 4, 122, PIEDRAL); R.linea(x + 4, 67, x + 4, 122, PIEDRASS); R.linea(x + 3, 67, x + 3, 122, PIEDRAS);
      R.rect(x - 7, 63, x + 6, 66, PIEDRAL); R.linea(x - 7, 66, x + 6, 66, PIEDRAS); R.disco(x - 6, 65, 2, PIEDRA); R.disco(x + 5, 65, 2, PIEDRA); R.pset(x - 6, 65, PIEDRASS); R.pset(x + 5, 65, PIEDRASS);
      R.rect(x - 6, 122, x + 5, 125, PIEDRAL); R.linea(x - 6, 125, x + 5, 125, PIEDRASS);
      for (let k = 0; k < 6; k++) R.pset(x - 3 + Math.floor(hh(i, k, 3) * 7), 70 + Math.floor(hh(k, i, 4) * 50), PIEDRAS); }
    R.rect(34, 60, 286, 63, PIEDRA); R.linea(34, 63, 286, 63, PIEDRASS); R.linea(34, 61, 286, 61, PIEDRAL);
    // la escalinata (cada peldaño más ancho), mojada
    for (let k = 0; k < 8; k++) { const y = 126 + k * 3, x0 = 34 - k * 3, x1 = 286 + k * 3; R.rect(x0, y, x1, y + 2, k % 2 ? PIEDRA : PIEDRAL); R.linea(x0, y + 2, x1, y + 2, PIEDRAS);
      for (let x = x0; x < x1; x += 7) if (hh(x, k, 5) > 0.6) R.pset(x, y + 1, PIEDRAS); }
    // la explanada mojada con losas y charcos, el bordillo y la calle
    R.rect(0, 150, 319, 166, H('#6c7076')); for (const y of [154, 158, 162]) { R.linea(0, y, 319, y, H('#5c6066')); for (let x = (y % 8) * 2; x < 320; x += 18) R.linea(x, y - 3, x, y, H('#5c6066')); }
    for (let k = 0; k < 120; k++) R.pset(Math.floor(hh(k, 1, 6) * 320), 150 + Math.floor(hh(k, 2, 6) * 16), H('#7a7e86'));
    for (const [x, y, w] of [[62, 160, 22], [204, 156, 30], [276, 163, 16]]) elipse(x, y, w, 2, H('#8e98a4'));
    R.rect(0, 166, 319, 168, H('#a8a8a4')); R.linea(0, 166, 319, 166, H('#c8c8c4')); R.rect(0, 169, 319, 179, H('#36383e'));
    for (let k = 0; k < 160; k++) R.pset(Math.floor(hh(k, 3, 6) * 320), 169 + Math.floor(hh(k, 4, 6) * 11), H('#44464c'));
    for (let x = 0; x < 320; x += 24) R.rect(x, 176, x + 11, 176, H('#c8c8b8'));
    // las farolas de hierro y la barandilla de la explanada
    for (const x of [22, 294]) { R.rect(x, 104, x + 1, 150, K); R.rect(x - 2, 146, x + 3, 150, K); R.rect(x - 3, 94, x + 4, 104, K); R.rect(x - 2, 96, x + 3, 102, H('#f0d890')); R.poligono([[x - 4, 94], [x + 5, 94], [x + 1, 90], [x, 90]], K); }
  });
  // las nubes (solo asoman a los lados del frontón) y el frontón encima
  nubes(t, 0, [[18, 40, 30, -2.2], [70, 30, 24, -1.4], [250, 34, 26, -3], [200, 44, 30, -1.8]], [H('#8a94a2'), H('#aab2bc'), H('#c8ced4')]);
  fronton();
  // la puerta con la luz de dentro y visitantes que cruzan
  R.rect(147, 81, 173, 126, mez(H('#c89a50'), H('#e8c070'), 0.5 + Math.sin(t * 3) * 0.1)); R.rect(147, 81, 173, 86, H('#a87a40'));
  for (let k = 0; k < 2; k++) { const x = 147 + Math.round(((t * (8 + k * 5) + k * 13) % 34)) - 4; if (x > 146 && x < 171) { R.rect(x, 113 - k, x + 2, 125, H('#4a3a2a')); R.rect(x, 110 - k, x + 2, 112 - k, H('#6a5040')); } }
  // gente pequeña con paraguas que cruza la explanada y sube a la puerta
  for (let k = 0; k < 3; k++) { const ph = ((t * (0.06 + k * 0.02) + k * 0.37) % 1), x = Math.round(k === 1 ? lerp(330, -10, ph) : lerp(-10, 330, ph)), y = 152 + k * 2, p = Math.floor(t * 5 + k) % 2;
    R.rect(x, y - 6, x + 2, y - 1, [H('#4a3a5a'), H('#7a3a2a'), H('#3a4a3a')][k]); R.pset(x + 1, y - 7, H('#f6c290')); R.pset(x + p, y, K); R.pset(x + 2 - p, y, K);
    R.linea(x + 1, y - 7, x + 1, y - 10, K); R.rect(x - 3, y - 12, x + 5, y - 11, [H('#2a3a6a'), H('#c8303a'), H('#e8c040')][k]); R.rect(x - 1, y - 13, x + 3, y - 13, [H('#2a3a6a'), H('#c8303a'), H('#e8c040')][k]); }
  // los dos investigadores cruzan la explanada y suben la escalinata
  const sube = (u) => { const x = lerp(-10, 150, u); return [Math.round(x), Math.round(x < 98 ? 162 : lerp(162, 128, (x - 98) / 52))]; };
  const u1 = ease(tramo(t, 0, P2 - 0.3) * 0.9 + 0.08), [xa, ya] = sube(u1), [xb, yb] = sube(Math.max(0, u1 - 0.12));
  const b = R.actor(EL.investigadorIA, xb, yb, t, { dir: 1, anda: u1 < 0.97, sostiene: [xb + 18, yb - 14] });
  R.rect(b.mano[0] - 1, b.mano[1] - 7, b.mano[0] + 13, b.mano[1] + 2, K); R.rect(b.mano[0], b.mano[1] - 6, b.mano[0] + 12, b.mano[1] + 1, H('#2a2a34')); R.linea(b.mano[0], b.mano[1] - 6, b.mano[0] + 12, b.mano[1] - 6, H('#4a4a5a')); R.rect(b.mano[0] + 5, b.mano[1] - 8, b.mano[0] + 7, b.mano[1] - 7, H('#8a8a96'));
  const a = R.actor(EL.investigadoraIA, xa, ya, t, { dir: 1, anda: u1 < 0.97, sostiene: [xa + 13, ya - 22], habla: t > MUSEO - 0.6 && t < MUSEO + 0.4 && Math.sin(t * 14) > 0 });
  { const [mx, my] = a.mano, cy = my - 9; R.linea(mx, my, mx, cy, K); R.poligono([[mx - 12, cy + 1], [mx - 9, cy - 5], [mx, cy - 8], [mx + 9, cy - 5], [mx + 12, cy + 1]], K); R.poligono([[mx - 11, cy], [mx - 8, cy - 5], [mx, cy - 7], [mx + 8, cy - 5], [mx + 11, cy]], H('#2a6a5a'));
    for (const dx of [-6, 0, 6]) R.linea(mx + dx, cy - 6, mx + Math.round(dx * 1.8), cy, H('#4a9a82')); R.pset(mx, cy - 8, K); }
  // las palomas de la escalinata: picotean y, en «British Museum», echan a volar
  for (let k = 0; k < 6; k++) { const x0 = 180 + k * 13 - (k % 2) * 5, y0 = 131 + (k % 3) * 4, d = t - MUSEO - k * 0.06;
    if (d < 0) { const pica = Math.sin(t * 5 + k * 2) > 0.6 ? 1 : 0; R.rect(x0, y0 - 2, x0 + 3, y0, H('#7a7e8e')); R.pset(x0 + 4, y0 - 3 + pica, H('#9a9eae')); R.pset(x0 + 5, y0 - 3 + pica, H('#c8a040')); R.pset(x0 - 1, y0 - 1, H('#5a5e6e')); R.pset(x0 + 1, y0 + 1, H('#c86a5a')); }
    else { const x = x0 + d * (30 + k * 8), y = y0 - d * (40 + k * 6); const a2 = Math.sin(t * 22 + k) > 0 ? -2 : 1; if (!tranquilo(Math.round(x), Math.round(y))) { R.rect(Math.round(x), Math.round(y), Math.round(x) + 2, Math.round(y) + 1, H('#7a7e8e')); R.linea(Math.round(x) - 3, Math.round(y) + a2, Math.round(x), Math.round(y), H('#9a9eae')); R.linea(Math.round(x) + 2, Math.round(y), Math.round(x) + 5, Math.round(y) + a2, H('#9a9eae')); } } }
  // un taxi negro pasa por la calle (por delante de todo)
  { const u = tramo(t, 0.5, 2.6); if (u > 0 && u < 1) { const x = Math.round(lerp(340, -70, u)), y = 177;
    R.rect(x, y - 11, x + 46, y - 3, K); R.rect(x + 1, y - 10, x + 45, y - 4, H('#1e1f26')); R.poligono([[x + 8, y - 11], [x + 12, y - 17], [x + 34, y - 17], [x + 38, y - 11]], H('#1e1f26')); R.rect(x + 13, y - 16, x + 21, y - 12, H('#8a9aaa')); R.rect(x + 24, y - 16, x + 33, y - 12, H('#8a9aaa'));
      R.rect(x + 22, y - 19, x + 25, y - 17, H('#e8c040')); R.linea(x + 2, y - 8, x + 44, y - 8, H('#3a3c46')); R.pset(x, y - 7, H('#fff4c8')); R.pset(x + 1, y - 7, H('#fff4c8')); R.disco(x + 9, y - 2, 3, K); R.disco(x + 37, y - 2, 3, K); R.pset(x + 9, y - 2, H('#8a8a8a')); R.pset(x + 37, y - 2, H('#8a8a8a'));
      for (let k = 0; k < 6; k++) R.pset(x + 48 + k * 3, y - 1 - (k % 2), H('#9aa4b0')); } }
  // la llovizna, los aros en los charcos
  for (let k = 0; k < 90; k++) { const x = Math.round((hh(k, 1, 9) * 360 + t * 30) % 360) - 20, y = Math.round((hh(k, 2, 9) * 200 + t * 150) % 200) - 10; if (!tranquilo(x, y) && !tranquilo(x - 1, y + 3)) R.linea(x, y, x - 1, y + 3, H('#c4ccd8')); }
  for (let k = 0; k < 5; k++) { const ph = (t * 1.3 + k * 0.37) % 1, x = [56, 70, 196, 214, 274][k], y = [160, 161, 156, 157, 163][k], r = Math.round(1 + ph * 4); R.pset(x - r, y, H('#b8c2ce')); R.pset(x + r, y, H('#b8c2ce')); }
};
// ── 2 · la sala del museo: luz y rayos X ────────────────────────────────────────────────────────────────────────────
const MAPA = A(5.54), JOHN = A(6.32), LUZ = A(7.94), RAYOS = A(8.52);
const p2 = (t) => {
  const o = { encuadre: 'sala', luz: ease(tramo(t, LUZ - 0.1, LUZ + 0.5)), rayos: tramo(t, RAYOS, P3 - 0.15) };
  T.museo(R, t, o);
  const u = ease(tramo(t, P2, P2 + 1.3)), xc = Math.round(lerp(34, 80, u));
  R.actor(EL.conservadoraRK, xc, 160, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > MAPA - 0.2 && t < JOHN + 0.9, habla: t > MAPA && t < JOHN + 0.9 && Math.sin(t * 13) > 0, sonrisa: t > LUZ + 0.4 });
  const pulsa = (t > LUZ - 0.35 && t < LUZ + 0.25) || (t > RAYOS - 0.3 && t < RAYOS + 0.3);
  R.actor(EL.investigadorIA, 240, 160, t, { dir: -1, sostiene: pulsa ? [250, t < RAYOS - 0.3 ? 134 : 128] : undefined, sorpresa: t > RAYOS + 0.5 && t < RAYOS + 1.2, habla: t < LUZ - 0.4 && t > P2 + 1.6 && Math.sin(t * 12) > 0 });
  T.museoDelante(R, t, o);
};
// ── 3 · el mapa de cerca: el parche, la estrella y la lupa de brazo ─────────────────────────────────────────────────
const PARCHE = A(10.13), ESTRELLA = A(11.79), TINY = A(10.87), FUERTE = A(13.19);
const p3 = (t) => {
  const o = { encuadre: 'sala', camara: 'mapa', parche: ease(tramo(t, PARCHE, ESTRELLA)), rayos: tramo(t, P3 + 0.05, PARCHE + 0.25) };
  const g = T.museo(R, t, o), [sx, sy] = g.estrella ?? [116, 53];
  // la lupa de brazo articulado entra desde la izquierda y se para sobre la estrella
  const u = ease(tramo(t, TINY - 0.5, TINY + 0.5)), lx = Math.round(lerp(-40, sx, u) + Math.sin(t * 1.3) * (u > 0.99 ? 1 : 0)), ly = Math.round(lerp(110, sy + 1, u)), r = 15;
  if (u > 0) {
    const bx = 0, by = 132, ex = Math.round((bx + lx) / 2 - 6), ey = Math.round(Math.max(ly, by) + 6);
    for (const [x0, y0, x1, y1] of [[bx, by, ex, ey], [ex, ey, lx - 10, ly + 10]]) { for (const d of [-2, 3]) R.linea(x0, y0 + d, x1, y1 + d, K); R.linea(x0, y0 - 1, x1, y1 - 1, H('#d8dce4')); R.linea(x0, y0, x1, y1, H('#a8aeb8')); R.linea(x0, y0 + 1, x1, y1 + 1, H('#8a909a')); R.linea(x0, y0 + 2, x1, y1 + 2, H('#5a606a')); }
    R.linea(Math.round((bx + ex) / 2), Math.round((by + ey) / 2) + 2, ex - 4, ey + 1, H('#3a3e46'));
    R.rect(0, by - 6, 6, by + 8, K); R.rect(0, by - 5, 5, by + 7, H('#4a4e58')); R.rect(0, by - 5, 5, by - 4, H('#8a909a'));
    R.disco(ex, ey, 4, K); R.disco(ex, ey, 3, H('#5a606a')); R.pset(ex - 1, ey - 1, H('#c8ccd4')); R.pset(ex, ey, H('#2a2e36'));
    lente(lx, ly, r, 2.2, H('#fff8e0'));
    R.anillo(lx, ly, r + 1, K); R.anillo(lx, ly, r + 2, H('#3a3e46')); R.anillo(lx, ly, r + 3, K);
    const on = t > ESTRELLA - 0.25; for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283; R.pset(Math.round(lx + Math.cos(a) * (r + 2)), Math.round(ly + Math.sin(a) * (r + 2)), on ? H('#fff4c0') : H('#6a6e78')); }
    R.pset(lx - 7, ly - 8, BL); R.pset(lx - 6, ly - 9, BL); R.pset(lx - 8, ly - 7, BL);
    if (t > ESTRELLA) for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283 + t * 2, d = r + 5 + Math.sin(t * 6 + k) * 2; R.pset(Math.round(lx + Math.cos(a) * d), Math.round(ly + Math.sin(a) * d), H('#fff4b0')); }
  }
  // «possibly the mark of a fort»: la ficha con el fuertecito (la empalizada) y la «?»
  ficha(196, 56, 46, 32, tramo(t, FUERTE - 0.2, FUERTE + 0.3), lx + r, ly, (x0, y0, x1, y1) => {
    const cx = x0 + 15, cy = y0 + 17;
    elipse(cx, cy + 4, 12, 3, H('#c8b080'));
    for (let k = 0; k < 11; k++) { const a = Math.PI * (1.05 + k / 10 * 0.9), x = Math.round(cx + Math.cos(a) * 11), y = Math.round(cy + 3 + Math.sin(a) * 4); R.rect(x, y - 9, x + 1, y, H('#7a5a3a')); R.pset(x, y - 10, H('#5a3e26')); }
    for (let k = 0; k < 7; k++) { const x = cx - 11 + k * 4 - (k > 3 ? 1 : 0), y = cy + 6; if (k === 3) continue; R.rect(x, y - 8, x + 1, y, H('#9a7a54')); R.pset(x, y - 9, H('#5a3e26')); }
    R.icono('?', x1 - 9, y0 + 7, H('#c8303a'), BL, 1.2);
  });
};
// ── 4 · inserto: el portátil con el mapa de hoy ─────────────────────────────────────────────────────────────────────
const INLAND = A(14.8), SOUND = A(15.5), ROUGH = A(16.84), TALK = A(18.56);
const SX0 = 64, SY0 = 27, SX1 = 256, SY1 = 121;
const AGUA = H('#2a5e8a'), AGUAL = H('#3a72a0'), TIERRA = H('#9cbc84'), TIERRAS = H('#86a870'), ARENA = H('#e8d8a4');
const SONIDO = [[92, 53], [118, 49], [150, 52], [184, 49], [212, 47], [232, 46], [232, 73], [212, 71], [184, 70], [152, 72], [122, 67], [94, 61]];
const ROANOKE = [220, 84], ESTR = [97, 51];
const camino = (u) => { const pts = [ROANOKE, [214, 72], [190, 62], [150, 60], [120, 57], ESTR]; const n = pts.length - 1, f = Math.min(n - 0.001, u * n), i = Math.floor(f), r = f - i; return [lerp(pts[i][0], pts[i + 1][0], r), lerp(pts[i][1], pts[i + 1][1], r)]; };
const p4 = (t) => {
  capa('m4', () => {
    // la pared de la sala con paneles y estantes de archivo; la mesa de nogal
    deg(0, 0, 319, 112, [H('#d4c8b0'), H('#cbbfa6'), H('#c0b49a')]);
    for (const [x0, x1] of [[60, 160], [168, 262]]) { R.rect(x0, 6, x1, 100, H('#c4b89e')); R.rect(x0 + 2, 8, x1 - 2, 98, H('#d0c4aa')); R.linea(x0, 6, x1, 6, H('#e2d8c2')); R.linea(x0, 100, x1, 100, H('#a89c84')); }
    R.rect(0, 100, 319, 112, H('#6a4a30')); R.linea(0, 100, 319, 100, H('#8a6a48'));
    R.rect(2, 24, 52, 104, H('#5a6068')); for (const y of [24, 50, 76, 102]) R.rect(2, y, 52, y + 1, H('#8a9098'));
    for (let s = 0; s < 3; s++) for (let k = 0; k < 4; k++) { const x = 5 + k * 12, y = 27 + s * 26; R.rect(x, y + 3, x + 10, y + 22, H(['#7a8aa0', '#a89a7a', '#8a7a6a', '#6a7a8a'][(k + s) % 4])); R.rect(x + 3, y + 9, x + 7, y + 12, BL); R.linea(x, y + 3, x + 10, y + 3, H('#c8ccd4')); }
    // la lámpara de mesa a la derecha (debajo de la esquina de Atom)
    for (let y = 70; y < 112; y++) for (let x = 266; x < 320; x++) { const g = 1 - Math.hypot(x - 292, (y - 70) * 0.9) / 46; if (g > 0) R.pset(x, y, mez(R.pget(x, y), H('#fff0c0'), g * 0.5)); }
    R.rect(294, 108, 314, 113, K); R.rect(295, 109, 313, 112, H('#b08a3a')); R.linea(295, 109, 313, 109, H('#e8c060'));
    for (const d of [0, 1]) { R.linea(304 + d, 108, 300 + d, 84, K); R.linea(300 + d, 84, 292 + d, 70, K); } R.linea(305, 108, 301, 84, H('#c89a40')); R.linea(301, 84, 293, 70, H('#c89a40')); R.disco(300, 84, 2, H('#8a6a2a'));
    R.poligono([[278, 72], [292, 58], [304, 66], [292, 80]], K); R.poligono([[280, 72], [292, 60], [302, 66], [292, 78]], H('#2a6a52')); R.linea(281, 71, 292, 61, H('#5aa080')); R.linea(282, 73, 291, 79, H('#fff4c0')); R.linea(283, 74, 290, 79, H('#ffe080'));
    // la mesa de nogal con vetas
    R.rect(0, 112, 319, 179, H('#5a3a24')); for (let k = 0; k < 30; k++) { const y = 114 + Math.floor(hh(k, 1, 40) * 64); for (let x = 0; x < 320; x++) if (hh(x >> 3, k, 41) < 0.75 && (x + k * 11) % 41 < 30) R.pset(x, y + Math.round(Math.sin(x * 0.04 + k) * 1.5), H('#4a2e1c')); }
    R.rect(0, 112, 319, 113, H('#7a5434'));
    // el cuaderno con renglones (sin letras) y el lápiz; los guantes blancos; la foto del mapa; la taza
    R.poligono([[4, 134], [46, 130], [52, 172], [8, 176]], K); R.poligono([[5, 135], [45, 131], [50, 171], [9, 175]], H('#f2ead8')); R.linea(27, 133, 30, 173, H('#c8bca0'));
    for (let k = 0; k < 7; k++) { R.linea(9, 141 + k * 5, 24, 140 + k * 5, H('#a8a8b8')); R.linea(31, 139 + k * 5, 46, 138 + k * 5, H('#a8a8b8')); }
    R.linea(14, 178, 44, 168, H('#e8c040')); R.linea(14, 179, 44, 169, H('#c89a20')); R.pset(13, 178, K); R.pset(45, 168, H('#e88a8a'));
    for (const [x, y] of [[56, 160], [70, 166]]) { R.disco(x, y, 6, K); R.disco(x, y, 5, BL); for (let f = 0; f < 4; f++) { R.rect(x + 4 + f * 0, y - 4 + f * 3, x + 9, y - 3 + f * 3, K); R.rect(x + 4, y - 4 + f * 3, x + 8, y - 4 + f * 3, BL); } R.pset(x - 2, y + 2, H('#d8d4cc')); }
    R.rect(262, 154, 302, 176, K); R.rect(263, 155, 301, 175, H('#efe6d0')); R.rect(266, 158, 298, 172, H('#9ac0c8')); R.poligono([[266, 158], [286, 158], [280, 166], [266, 172]], H('#b8cc98')); R.pset(276, 162, H('#c8303a'));
    R.disco(288, 140, 11, H('#3a2a1c')); R.disco(288, 139, 10, H('#e8e4dc')); R.rect(279, 124, 297, 140, K); R.rect(280, 125, 296, 139, BL); R.rect(280, 125, 282, 139, H('#d8d4cc')); R.rect(281, 126, 295, 128, H('#a8642a')); R.rect(297, 128, 301, 135, K); R.rect(298, 129, 300, 134, BL);
    // el portátil: la tapa, la pantalla (un mapa de hoy, sin rótulos) y el teclado
    R.poligono([[54, 128], [266, 128], [284, 156], [36, 156]], K); R.poligono([[56, 129], [264, 129], [281, 155], [39, 155]], H('#c4c8d0')); R.linea(39, 155, 281, 155, H('#8a8e98'));
    for (let row = 0; row < 4; row++) for (let k = 0; k < 15; k++) { const y = 132 + row * 4, x = Math.round(66 - row * 3 + k * (13 + row * 0.4)); R.rect(x, y, x + 9, y + 2, H('#3a3c44')); R.pset(x, y, H('#5a5c66')); }
    R.rect(142, 149, 178, 154, H('#b4b8c0')); R.rect(143, 150, 177, 153, H('#d0d4dc'));
    R.rect(58, 22, 262, 127, K); R.rect(59, 23, 261, 126, H('#2a2c32')); R.pset(160, 24, H('#5a5c66'));
    R.recorte([SX0, SY0, SX1, SY1]);
    for (let y = SY0; y <= SY1; y++) for (let x = SX0; x <= SX1; x++) R.pset(x, y, (x + y * 3) % 7 === 0 ? TIERRAS : TIERRA);
    for (let k = 0; k < 6; k++) for (let x = SX0; x <= SX1; x++) R.pset(x, Math.round(SY0 + 12 + k * 17 + Math.sin(x * 0.05 + k) * 4), H('#90b078'));
    R.poligono([[236, SY0], [SX1, SY0], [SX1, SY1], [244, SY1]], AGUA);
    R.poligono([[230, SY0], [236, SY0], [244, SY1], [238, SY1]], ARENA);
    R.poligono([[214, SY0], [229, SY0], [232, 48], [218, 46]], AGUA);
    R.poligono([[190, 96], [212, 70], [236, 72], [240, SY1], [176, SY1]], AGUA);
    R.poligono(SONIDO, AGUA);
    R.poligono([[216, 77], [222, 76], [224, 90], [218, 92]], TIERRA); R.linea(216, 77, 218, 92, ARENA);
    for (const [pts, w] of [[[[98, 52], [96, 42], [100, 34], [96, SY0]], 2], [[[94, 60], [84, 72], [78, 88], [66, 100]], 2], [[[150, 71], [148, 84], [154, 100]], 1]]) for (let i = 0; i < pts.length - 1; i++) for (let d = 0; d < w; d++) R.linea(pts[i][0] + d, pts[i][1], pts[i + 1][0] + d, pts[i + 1][1], AGUA);
    for (let k = 0; k < 400; k++) { const x = SX0 + Math.floor(hh(k, 1, 44) * 193), y = SY0 + Math.floor(hh(k, 2, 44) * 95); const c = R.pget(x, y); if (c === AGUA) R.pset(x, y, AGUAL); }
    for (const pts of [[[70, 116], [110, 96], [150, 88], [176, 90], [212, 92], [218, 84]], [[118, 30], [124, 46], [160, 44], [208, 40]], [[140, 116], [160, 102], [186, 100]]]) for (let i = 0; i < pts.length - 1; i++) R.linea(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], H('#e8e2c8'));
    for (const [x, y] of [[108, 44], [168, 92], [130, 94], [200, 38], [80, 104]]) { R.rect(x - 1, y - 1, x + 1, y + 1, H('#6a6a72')); R.pset(x, y, BL); }
    R.recorte(null);
  });
  // la vida de la pantalla: el estrecho brilla en «sound»
  R.recorte([SX0, SY0, SX1, SY1]);
  const su = tramo(t, SOUND - 0.1, SOUND + 1.0); if (su > 0 && su < 1) { const xs = lerp(86, 240, su); for (let y = 44; y <= 76; y++) for (let x = Math.round(xs - 8); x <= xs + 8; x++) { const c = R.pget(x, y); if (c === AGUA || c === AGUAL) R.pset(x, y, (x + y) % 2 ? H('#7ab4e0') : H('#5a9ad0')); } }
  // la línea de puntos de Roanoke a la estrella («roughly as far»)
  const ru = tramo(t, ROUGH - 0.1, ROUGH + 1.1);
  for (let i = 0; i <= 60; i++) { const f = i / 60; if (f > ru) break; if (i % 3 === 2) continue; const [x, y] = camino(f); R.rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y), H('#e8303a')); }
  // las figuritas del grupo («talked about moving»), con su «?»
  const fu = ease(tramo(t, TALK - 0.4, TALK + 1.6)) * 0.55; if (t > TALK - 0.4) for (let k = 0; k < 3; k++) { const [x, y] = camino(Math.max(0, fu - k * 0.05)); const X = Math.round(x), Y = Math.round(y) - 3, p = Math.floor(t * 6 + k) % 2;
    R.rect(X - 1, Y - 3, X + 1, Y + 1, K); R.pset(X, Y - 2, H('#f6c290')); R.pset(X, Y, [H('#c8a040'), H('#7a8aa0'), H('#a85a4a')][k]); R.pset(X - 1 + p, Y + 2, K); }
  if (t > TALK + 0.6) { const [x, y] = camino(fu); R.icono('?', Math.round(x) - 2, Math.round(y) - 16 + Math.round(Math.sin(t * 4)), H('#ffe080'), K, 1); }
  // la estrella roja y azul al fondo del estrecho («inland»)
  const iu = tramo(t, INLAND - 0.1, INLAND + 0.4);
  if (iu > 0) { const [x, y] = ESTR, l = Math.round(2 + 4 * ease(iu) + Math.sin(t * 5) * 0.6); R.poligono([[x, y - l], [x + 1, y - 1], [x + l, y], [x + 1, y + 1], [x, y + l], [x - 1, y + 1], [x - l, y], [x - 1, y - 1]], H('#c8303a')); R.poligono([[x, y - l + 2], [x + 1, y], [x, y + l - 2], [x - 1, y]], H('#2a4aa8')); R.pset(x, y, BL);
    if (iu < 1 || Math.sin(t * 4) > 0.3) R.anillo(x, y, l + 3 + Math.round((t * 6) % 3), H('#fff4b0')); }
  // la chincheta de Roanoke
  { const [x, y] = ROANOKE; R.disco(x, y - 4, 3, K); R.disco(x, y - 4, 2, H('#e83a3a')); R.pset(x - 1, y - 5, H('#ffb0a0')); R.linea(x, y - 1, x, y + 1, K); }
  // el cursor que sigue la mano
  const cu = ease(tramo(t, P4 + 0.2, INLAND)), cx = Math.round(lerp(176, ESTR[0] + 6, cu) + (t > ROUGH ? lerp(0, 90, ease(tramo(t, ROUGH, ROUGH + 1.1))) : 0)), cy = Math.round(lerp(98, ESTR[1] + 6, cu) + (t > ROUGH ? lerp(0, 18, ease(tramo(t, ROUGH, ROUGH + 1.1))) : 0));
  R.poligono([[cx, cy], [cx, cy + 8], [cx + 2, cy + 6], [cx + 4, cy + 9], [cx + 5, cy + 8], [cx + 3, cy + 5], [cx + 6, cy + 5]], K); R.poligono([[cx + 1, cy + 2], [cx + 1, cy + 6], [cx + 2, cy + 5], [cx + 4, cy + 7], [cx + 3, cy + 4], [cx + 4, cy + 4]], BL);
  R.recorte(null);
  // el reflejo del cristal; el vapor del té; la mano en el panel táctil
  for (let k = 0; k < 40; k++) { const x = 200 + k, y = SY0 + k * 2; if (y < SY1) R.pset(x, y, mez(R.pget(x, y), BL, 0.15)); }
  for (let k = 0; k < 3; k++) { const ph = (t * 0.5 + k / 3) % 1; for (let j = 0; j < 6; j++) { const x = Math.round(287 + Math.sin(ph * 8 + j * 0.6 + k) * 2 + k * 2 - 2), y = Math.round(122 - ph * 26 - j); if (!tranquilo(x, y)) R.pset(x, y, mez(H('#c0b49a'), BL, 0.6 - ph * 0.5)); } }
  const mx = Math.round(170 + (cx - 150) * 0.08), my = Math.round(152 + (cy - 70) * 0.05);
  T.brazo(R, 214, 182, mx + 10, my + 4, '#3a4a6a', -1);
};
// ── 5 · 2012: el Sitio X ─────────────────────────────────────────────────────────────────────────────────────────
const XW = B(24.62), HALL = B(25.62);
const p5 = (t) => {
  const o = { encuadre: 'sitiox', hallazgo: ease(tramo(t, HALL, HALL + 0.5)) };
  T.museo(R, t, o);
  const raspa = t < HALL, ra = R.actor(EL.arqueologaRK, 128, 160, t, { dir: 1, sostiene: raspa ? [148 + Math.round(Math.sin(t * 7) * 2), 152] : undefined, sorpresa: t > HALL + 0.1 && t < HALL + 0.7, dedo: t > HALL + 0.5 });
  if (raspa) { const [hx, hy] = ra.mano; R.linea(hx, hy, hx + 5, hy + 3, H('#7a5a3a')); R.poligono([[hx + 5, hy + 2], [hx + 11, hy + 3], [hx + 7, hy + 6]], H('#b8bcc4')); R.pset(hx + 10, hy + 3, BL); }
  // el voluntario clava la estaca de la «X» en «Site X»
  const clava = ease(tramo(t, XW - 0.35, XW)), sx = 233, sy = 160;
  const v = R.actor(EL.voluntarioRK, 238, 160, t, { dir: -1, sostiene: t < XW + 0.3 ? [sx + 2, Math.round(lerp(132, 144, clava))] : undefined, sonrisa: t > XW + 0.5, habla: t > B(23.9) && t < XW - 0.4 && Math.sin(t * 12) > 0 });
  const top = t < XW ? Math.round(lerp(126, 138, clava)) : 140, bot = t < XW ? top + 20 : sy;
  R.rect(sx, top, sx + 1, bot, H('#a07a4a')); R.pset(sx, top, H('#c89a6a')); R.linea(sx + 1, top, sx + 1, bot, H('#6a4a2a'));
  const fl = Math.sin(t * 7) > 0 ? 1 : 0; R.rect(sx + 2, top, sx + 11, top + 8 + fl, K); R.rect(sx + 2, top + 1, sx + 10, top + 7 + fl, BL); R.icono('X', sx + 4, top + 2 + fl, H('#c8303a'), BL, 1);
  if (t > XW && t < XW + 0.5) for (let k = 0; k < 6; k++) { const d = (t - XW) * 30; R.pset(Math.round(sx + Math.cos(k) * d * 0.6), Math.round(sy - Math.abs(Math.sin(k)) * d * 0.4), H('#8a6a44')); }
  T.museoDelante(R, t, o);
};
// ── 6 · los trozos de cerámica encajan ──────────────────────────────────────────────────────────────────────────
const YEARS = B(28.3), ONLY = B(29.4), ENGL = B(30.4);
const p6 = (t) => {
  const o = { encuadre: 'sitiox', camara: 'ceramica', encaja: ease(tramo(t, P6 + 0.15, ONLY)) };
  T.museo(R, t, o);
  // la mano con el cepillo de cerda entra por abajo a la derecha y acompaña los trozos
  const w = Math.sin(t * 6) * 3, hx = Math.round(262 + w), hy = Math.round(156 + Math.abs(w) * 0.5);
  R.linea(hx - 4, hy - 2, hx - 22, hy - 12, K); R.linea(hx - 4, hy - 3, hx - 22, hy - 13, H('#c8a060')); R.linea(hx - 4, hy - 1, hx - 22, hy - 11, H('#8a6a3a'));
  R.rect(hx - 30, hy - 17, hx - 22, hy - 10, K); R.rect(hx - 29, hy - 16, hx - 23, hy - 11, H('#5a4030')); for (let k = 0; k < 5; k++) R.linea(hx - 30 - (k % 2), hy - 16 + k, hx - 34, hy - 17 + k + Math.round(w * 0.3), H('#e8d8b0'));
  T.brazo(R, 304, 182, hx + 6, hy + 2, '#6a7a4a', -1);
  // «those years»: la etiqueta 1587; «English»: la banderita de San Jorge sobre la jarra
  ficha(32, 112, 44, 20, tramo(t, YEARS - 0.2, YEARS + 0.3), null, null, (x0, y0) => R.numero('1587', x0 + 20, y0 + 12, { centro: true, color: H('#3a3440') }));
  ficha(214, 22, 30, 22, tramo(t, ENGL - 0.2, ENGL + 0.3), 172, 60, (x0, y0, x1, y1) => { R.rect(x0 + 2, y0 + 2, x1 - 2, y1 - 2, BL); R.rect(x0 + 2, y0 + 2, x1 - 2, y0 + 2, H('#d8d0c0')); const mx = Math.round((x0 + x1) / 2), my = Math.round((y0 + y1) / 2); R.rect(mx - 1, y0 + 2, mx + 1, y1 - 2, H('#c8303a')); R.rect(x0 + 2, my - 1, x1 - 2, my + 1, H('#c8303a')); });
};
// ── 7 · 1588: el grupo pequeño que se va hacia el interior ──────────────────────────────────────────────────────────
const MAY = B(31.36), INL = B(32.94);
const sendaY = (x) => Math.round(lerp(148, 156, x / 320));
const p7 = (t) => {
  capa('m7', () => {
    deg(0, 0, 319, 72, [H('#86b4d8'), H('#a4c6e0'), H('#c8d8e0'), H('#ecdcb8')]);
    // la otra orilla, baja y lejana, y el agua ancha del estrecho
    for (let x = 0; x < 320; x++) { const h = 6 + Math.round(Math.sin(x * 0.07) * 2 + Math.sin(x * 0.19) * 2 + hh(x >> 2, 1, 70) * 3); R.linea(x, 70 - h, x, 72, x % 3 ? H('#5a7a72') : H('#4e6e68')); }
    deg(0, 72, 319, 116, [H('#8ab0c4'), H('#6e98b0'), H('#5a86a0')]);
    for (let k = 0; k < 40; k++) { const x = Math.floor(hh(k, 1, 71) * 300), y = 76 + Math.floor(hh(k, 2, 71) * 38); R.linea(x, y, x + 4 + (k % 4), y, H('#a8c8d8')); }
    // los cipreses en el agua con sus rodillas
    for (const [x, b, h, w] of [[214, 112, 62, 4], [246, 110, 44, 3], [196, 114, 30, 2]]) { R.rect(x - w, b - h, x + w, b, H('#6a5444')); R.linea(x - w, b - h, x - w, b, H('#8a705a')); R.rect(x - w - 3, b - 4, x + w + 3, b, H('#6a5444'));
      for (let y = b + 1; y < b + 10; y += 2) R.linea(x - w, y, x + w, y, H('#5a7a8c')); copa(x, b - h - 2, 12 + w * 2, H('#5a7a3a'), H('#8aa85a'), H('#3a5a2a'), x); }
    // la orilla de barro y juncos, el arroyo que baja y la senda
    R.poligono([[0, 112], [320, 116], [320, 180], [0, 180]], H('#8a9a5a')); deg(0, 140, 319, 179, [H('#8a9a5a'), H('#7a8c4c'), H('#6a7e42')]);
    for (let k = 0; k < 900; k++) { const x = Math.floor(hh(k, 1, 72) * 320), y = 114 + Math.floor(hh(k, 2, 72) * 66), l = 1 + Math.floor((y - 110) / 22); R.linea(x, y, x + (k % 3) - 1, y - l, k % 3 ? H('#6e8040') : H('#a8b46a')); }
    // barro y conchas junto al arroyo, un tronco de deriva, matas de espadaña
    for (const [x, y, w] of [[126, 132, 18], [210, 138, 16], [120, 170, 14], [214, 172, 20]]) { elipse(x, y, w, 3, H('#7a6a4a')); elipse(x - 2, y - 1, w - 5, 1, H('#9a8a62')); }
    R.poligono([[236, 160], [292, 154], [294, 159], [238, 165]], K); R.poligono([[237, 160], [291, 155], [292, 158], [238, 163]], H('#9a8a72')); R.linea(238, 160, 291, 155, H('#c8b898')); for (let x = 244; x < 290; x += 7) R.pset(x, 160 - Math.round((x - 236) / 10), H('#6a5a48'));
    R.disco(293, 156, 3, K); R.disco(293, 156, 2, H('#b8a888')); R.pset(293, 156, H('#7a6a58'));
    for (let k = 0; k < 18; k++) { const x = 8 + Math.floor(hh(k, 6, 72) * 300), y = 124 + Math.floor(hh(k, 7, 72) * 20); if (x > 128 && x < 210) continue; R.disco(x, y, 1, [H('#e8d860'), H('#f0f0e8'), H('#c890d8')][k % 3]); }
    R.poligono([[150, 114], [176, 114], [196, 180], [140, 180]], H('#5a86a0')); R.poligono([[154, 114], [172, 114], [190, 180], [146, 180]], H('#6e98b0'));
    for (let k = 0; k < 14; k++) R.linea(150 + k * 3, 120 + k * 4, 156 + k * 3, 120 + k * 4, H('#a8c8d8'));
    for (let x = 0; x < 320; x++) { const y = sendaY(x); R.linea(x, y - 3, x, y + 4, (x >= 138 && x <= 196) ? H('#5a86a0') : (x % 5 ? H('#c8b080') : H('#b8a070'))); }
    // el puente de dos troncos sobre el arroyo
    for (const dy of [-1, 3]) { R.linea(130, sendaY(130) + dy + 2, 204, sendaY(204) + dy + 2, K); R.linea(130, sendaY(130) + dy - 2, 204, sendaY(204) + dy - 2, K); R.linea(130, sendaY(130) + dy - 1, 204, sendaY(204) + dy - 1, H('#b08a5a')); R.linea(130, sendaY(130) + dy, 204, sendaY(204) + dy, H('#8a6a44')); R.linea(130, sendaY(130) + dy + 1, 204, sendaY(204) + dy + 1, H('#6a4a2a')); }
    for (let x = 136; x < 200; x += 7) { R.pset(x, sendaY(x) - 2, H('#5a3a20')); R.pset(x + 3, sendaY(x) + 2, H('#5a3a20')); }
    for (let x = 140; x < 200; x += 16) R.linea(x, sendaY(x) - 3, x + 1, sendaY(x) + 5, H('#c8b080'));
    for (let x = 20; x < 320; x += 13) if (x < 128 || x > 208) { R.pset(x, sendaY(x), H('#9a8458')); R.pset(x + 2, sendaY(x) + 1, H('#9a8458')); }
    for (const x of [134, 200]) { R.rect(x, sendaY(x) - 2, x + 2, sendaY(x) + 8, H('#6a4a2a')); }
    // juncos y matas del fondo
    for (let k = 0; k < 40; k++) { const x = Math.floor(hh(k, 3, 72) * 320), b = 116 + Math.floor(hh(k, 4, 72) * 20); if (x > 136 && x < 200) continue; for (let i = -1; i <= 1; i++) R.linea(x + i, b, x + i * 2, b - 8 - (k % 4), i ? H('#8a9a4a') : H('#b8b860')); }
    for (const [x, y] of [[40, 172], [92, 168], [228, 172], [270, 168]]) { R.disco(x, y, 3, H('#e8e2d0')); R.pset(x - 1, y - 1, BL); }
  });
  nubes(t, P7, [[40, 30, 30, 2.4], [120, 46, 22, 1.6], [220, 34, 26, 1.2], [70, 56, 18, 3]], [H('#c8b8a8'), H('#e8e0d8'), H('#fff8f0')]);
  // el agua que corre, la garceta que vuela, los patos
  for (let k = 0; k < 10; k++) { const x = Math.round((hh(k, 5, 73) * 320 + (t - P7) * 6) % 320), y = 78 + (k * 4) % 36; R.linea(x, y, x + 3, y, H('#d8ecf0')); }
  { const x = 30 + (t - P7) * 26, y = 52 + Math.sin(t * 2) * 3; if (!tranquilo(Math.round(x), Math.round(y))) { const a = Math.sin(t * 7) > 0 ? -3 : 1; R.rect(Math.round(x), Math.round(y), Math.round(x) + 5, Math.round(y) + 1, BL); R.linea(Math.round(x) + 1, Math.round(y), Math.round(x) - 3, Math.round(y) + a, BL); R.linea(Math.round(x) + 4, Math.round(y), Math.round(x) + 8, Math.round(y) + a, BL); R.pset(Math.round(x) + 6, Math.round(y), H('#d8a020')); } }
  for (let k = 0; k < 3; k++) { const x = Math.round(90 + k * 9 + Math.sin(t * 0.8) * 6), y = 98 + (k % 2); R.rect(x, y, x + 3, y + 1, H('#5a4a3a')); R.pset(x + 3, y - 1, H('#2a6a3a')); R.linea(x - 2, y + 2, x + 5, y + 2, H('#a8c8d8')); }
  // el grupo cruza el puente hacia la izquierda (el interior); el niño se vuelve a despedirse
  const baseEn = (tt) => Math.round(lerp(250, 40, tramo(tt, P7, P7 + 4.6))), base = baseEn(t), W0 = INL - 1.1, W1 = INL - 0.2;
  const baseNino = t < W0 ? base : t < W1 ? baseEn(W0) : baseEn(t - (W1 - W0));
  const gente = [[EL.colonoRK, 0, 'fardo'], [EL.colonaRK, 22, 'cesta'], [EL.ananiasRK, 46, 'fardo'], [EL.ninoColonoRK, 62, null]];
  for (const [def, dx, lleva] of gente) { const nino = !lleva, vuelve = nino && t > W0 && t < W1, x = (nino ? baseNino : base) + dx, y = sendaY(x + 7) - 1;
    const r = R.actor(def, x, y, t, { dir: vuelve ? 1 : -1, anda: !vuelve && x > -20, sostiene: lleva ? [x - 2, y - 15] : undefined, dedo: vuelve, sonrisa: vuelve || (nino && t > W1) });
    if (lleva === 'fardo') { const [mx, my] = r.mano; R.disco(mx - 1, my - 4, 5, K); R.disco(mx - 1, my - 4, 4, H('#c8b490')); R.linea(mx - 4, my - 6, mx + 2, my - 2, H('#8a7a5a')); }
    if (lleva === 'cesta') { const [mx, my] = r.mano; R.rect(mx - 5, my - 1, mx + 4, my + 5, K); R.rect(mx - 4, my, mx + 3, my + 4, H('#b88a4a')); R.linea(mx - 4, my + 2, mx + 3, my + 2, H('#8a6030')); R.pset(mx - 2, my - 1, H('#e8c040')); } }
  globo(base + 34, sendaY(base) - 42, tramo(t, MAY - 0.1, MAY + 0.4), '?', H('#c8303a'));
  // los juncos y las espadañas de delante, que se mecen
  for (const [x, h, k] of [[6, 30, 1], [16, 24, 2], [28, 18, 3], [296, 26, 4], [308, 34, 5], [286, 16, 6]]) { mata(x, 182, h, t, H('#6a7a3a'), H('#a0ae5a'), k, 1.2); if (k % 2) { const m = Math.round(Math.sin(t * 2.2 + x * 0.21 + k) * h * 0.25); R.rect(x + m - 1, 182 - h - 4, x + m, 182 - h + 2, H('#6a4a2a')); } }
};
const efectos = [[0.15, 'lluvia'], [0.7, 'coche'], [MUSEO, 'whoosh'], [LUZ, 'interruptor'], [RAYOS + 0.05, 'zumbido'], [PARCHE + 0.1, 'papel'], [ESTRELLA, 'brillo'], [FUERTE, 'pop'],
  [INLAND, 'bip'], [ROUGH, 'lapiz'], [XW, 'toc'], [HALL + 0.15, 'brillo'], [P6 + 0.7, 'golpecito'], [ONLY - 0.05, 'golpecito'], [ENGL, 'pop'], [MAY, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año: (t) => t < P7 ? 2012 : 1588 });
''')

E['rk-hatteras'] = ('Hatteras', '''// RK-HATTERAS (frases 24–26), cartela 2026; golpe «escamas» en el imán. Once planos (el encargo daba diez: 6,94–14,34 y
// 14,34–22,51 pasaban de 7 s y se parten):
// 1. 2026: la isla de Hatteras desde el estrecho: el faro de rayas, los robles achaparrados y las casas sobre pilotes;
//    la lancha de la arqueóloga y el voluntario cruza; él señala la isla en «Hatteras Island»; un pelícano se zambulle
//    (corta en «There»);
// 2. la excavación: «since 2009» (la barra va de 2009 a 2026): el voluntario llega con el cubo y lo vuelca en la criba en
//    «local volunteers»; la arqueóloga criba (corta en «has been digging»);
// 3. inserto: la cata de cerca, con la capa de conchas del pueblo: la paleta raspa y en «hilt» asoma la empuñadura verde
//    (corta en «pieces»);
// 4. la mesa de hallazgos: el voluntario fotografía cada pieza en su palabra (arcabuz, pizarra, anillo) y sube su ficha
//    ampliada; la arqueóloga las señala (corta en «And in 2025»);
// 5. 2025: la carpa de prensa: el arqueólogo llega con el frasquito y lo levanta en «announced»; flashes; en «smaller» la
//    ficha redonda con las escamas ampliadas (corta en «flakes»);
// 6. inserto: el yunque: el martillo cae cuatro veces sobre el hierro al rojo y saltan las escamas (corta en «They're»);
// 7. la criba de cerca: el imán baja en «magnet», se cargan las escamas, sube con su barba (golpe) y se lleva el clip de la
//    tablilla y una moneda (gag 7) (corta en «forged»);
// 8. 1590, de día: la fragua junto a una casa de esteras: un colono martillea y un croatoan aviva el fuego con el fuelle;
//    en «Croatoan village» se sonríen; un niño mira las chispas (corta en «And in 2026»);
// 9. 2026: el laboratorio: la científica llega al banco y en «bones» coge un huesecillo con pinzas; sube la ficha de los
//    huesecillos; en «people ate» piensa en la olla (corta en «According»);
// 10. inserto: sobre una estera, el plato de peltre y el cuenco de barro vierten en un tercero en «blended» (corta
//    en «even»);
// 11. inserto, 2026: la bala de plomo bajo la lupa de aro: se enciende la luz en «English», las pinzas la giran y en «no
//    one can say» sale la «?».''', COMUN + r'''
const Q = (s) => en('hatteras', (s - 1.5) / 18.898), F = (s) => en('escamas', (s - 22.508) / 19.348), U = (s) => en('huesos', (s - 42.356) / 12.712);
const P2 = Q(6.94), P3 = Q(11.34), P4 = Q(15.81), P5 = F(22.508), P6 = F(29.13), P7 = F(34.09), P8 = F(38.32), P9 = U(42.356), P10 = U(47.32), P11 = U(51.39);
// ── 1 · 2026: la isla de Hatteras desde el estrecho ─────────────────────────────────────────────────────────────────
const ISLA = Q(5.6);
const faro = (cx, base, top) => { for (let y = top; y <= base; y++) { const w = Math.round(lerp(4, 6, (y - top) / (base - top)));
    for (let x = cx - w; x <= cx + w; x++) { const banda = Math.floor((y + (x - cx) * 0.9) / 7) % 2; R.pset(x, y, y > base - 7 ? (x < cx ? H('#b85a3a') : H('#8a3a2a')) : banda ? (x > cx + w - 2 ? H('#1a1a22') : H('#2a2a34')) : (x > cx + w - 2 ? H('#c8c8cc') : H('#f2f0ea'))); } R.pset(cx - w - 1, y, K); R.pset(cx + w + 1, y, K); }
  R.rect(cx - 7, top - 3, cx + 7, top, K); R.rect(cx - 6, top - 2, cx + 6, top - 1, H('#3a3a44')); R.rect(cx - 4, top - 9, cx + 4, top - 3, K); R.rect(cx - 3, top - 8, cx + 3, top - 4, H('#d8e8f0')); R.pset(cx - 2, top - 7, BL);
  R.poligono([[cx - 5, top - 9], [cx + 5, top - 9], [cx, top - 14]], K); R.poligono([[cx - 4, top - 10], [cx + 4, top - 10], [cx, top - 13]], H('#3a3a44')); R.pset(cx, top - 15, K); };
const casita = (x, y, c, tc) => { R.rect(x, y - 8, x + 11, y - 1, c); R.poligono([[x - 2, y - 8], [x + 13, y - 8], [x + 5, y - 13]], tc); R.rect(x + 2, y - 6, x + 4, y - 4, H('#3a4a5a')); R.rect(x + 7, y - 6, x + 9, y - 4, H('#3a4a5a')); for (const dx of [1, 5, 10]) R.linea(x + dx, y, x + dx, y + 3, H('#6a5a48')); R.linea(x, y - 1, x + 11, y - 1, mez(c, K, 0.3)); };
const p1 = (t) => {
  capa('h1', () => {
    deg(0, 0, 319, 84, [H('#6aa8de'), H('#86bae6'), H('#a8cdec'), H('#cfe2ee')]);
    // la isla: dunas, robles achaparrados, casas sobre pilotes y el faro
    R.poligono([[0, 86], [60, 80], [140, 82], [230, 78], [320, 82], [320, 102], [0, 102]], H('#e4d0a0'));
    for (let x = 0; x < 320; x++) { const h = 4 + Math.round(Math.sin(x * 0.05) * 2 + hh(x >> 3, 2, 80) * 3); R.linea(x, 86 - h, x, 86, H('#d8c490')); if (x % 3 === 0) R.pset(x, 86 - h, H('#f0e2b8')); }
    for (let k = 0; k < 22; k++) { const x = 6 + k * 15 + Math.floor(hh(k, 1, 81) * 8); if (x > 182 && x < 212) continue; copa(x, 86 - Math.floor(hh(k, 2, 81) * 4), 6 + Math.floor(hh(k, 3, 81) * 4), H('#3e6a3a'), H('#6a9a4a'), H('#2a4a2a'), k + 80); }
    for (const [x, c, tc] of [[30, '#f2e8d8', '#6a7a8a'], [62, '#a8d0d8', '#5a4a3a'], [120, '#f0d8b8', '#7a4a3a'], [236, '#e8f0e8', '#4a5a6a'], [268, '#f8e0c8', '#8a5a3a']]) casita(x, 92, H(c), H(tc));
    faro(198, 94, 36); R.rect(188, 92, 208, 96, H('#e8e0d0')); R.rect(190, 86, 196, 92, H('#f2f0ea')); R.poligono([[189, 86], [197, 86], [193, 82]], H('#5a4a3a'));
    R.rect(0, 98, 319, 102, H('#f0e0b0')); for (let x = 0; x < 320; x += 4) R.pset(x + (x >> 2) % 3, 99, H('#d8c490'));
    // el estrecho: el agua verde azulada con ondas y el bajío
    deg(0, 102, 319, 179, [H('#5a9ab0'), H('#3e84a0'), H('#2e6e8e'), H('#245e7e')]);
    for (let k = 0; k < 160; k++) { const x = Math.floor(hh(k, 4, 82) * 316), y = 104 + Math.floor(hh(k, 5, 82) * 74), l = 2 + Math.floor((y - 100) / 16); R.linea(x, y, x + l, y, (k % 3) ? H('#6aaac0') : H('#1e5470')); }
    // el poste de baliza con el nido de águila pescadora; las boyas de las nasas
    R.rect(58, 96, 60, 150, H('#5a4a3a')); R.linea(58, 96, 58, 150, H('#7a6a54')); R.rect(54, 100, 64, 108, K); R.rect(55, 101, 63, 107, H('#2a8a4a')); R.rect(52, 92, 66, 96, H('#6a5a3a')); for (let x = 52; x < 66; x += 2) R.pset(x, 91, H('#8a7a5a'));
    for (let y = 151; y < 160; y += 2) R.linea(56, y, 62, y, H('#4a8aa4'));
  });
  nubes(t, 0, [[30, 28, 30, -1.4], [110, 44, 22, -2.2], [240, 50, 26, -2.8], [176, 30, 20, -1]], [H('#a8bcd0'), H('#e2eaf2'), H('#ffffff')]);
  // el águila en su nido; las gaviotas; el brillo del agua
  { const a = Math.sin(t * 2) > 0.6; R.rect(57, 87, 61, 91, H('#4a3a2a')); R.rect(58, 85, 60, 87, BL); R.pset(a ? 61 : 57, 86, K); }
  for (let k = 0; k < 4; k++) pajaro(lerp(-10, 330, ((t * 0.05 + k * 0.29) % 1)), 40 + k * 7 + Math.sin(t + k) * 3, t, k, H('#e8eef2'));
  for (let k = 0; k < 18; k++) { const x = Math.round((hh(k, 6, 83) * 320 + t * 5) % 320), y = 106 + (k * 7) % 70; if (Math.sin(t * 3 + k) > 0.4) R.rect(x, y, x + 2, y, H('#e8f6fa')); }
  for (const [x, y, c] of [[100, 132, '#e8a020'], [118, 140, '#e8e8e8'], [240, 136, '#e85a3a'], [262, 128, '#e8a020']]) { const b = Math.round(Math.sin(t * 2 + x) * 1); R.rect(x, y + b, x + 2, y + 2 + b, H(c)); R.pset(x + 1, y - 1 + b, K); R.linea(x - 2, y + 3, x + 4, y + 3, H('#7abacc')); }
  // el transbordador que cruza a lo lejos
  { const x = Math.round(lerp(300, 150, tramo(t, 0, P2))), y = 108; R.rect(x, y - 2, x + 30, y + 2, K); R.rect(x + 1, y - 1, x + 29, y + 1, BL); R.rect(x + 4, y - 4, x + 9, y - 2, H('#c8303a')); R.rect(x + 12, y - 4, x + 16, y - 2, H('#3a6ac8')); R.rect(x + 19, y - 4, x + 23, y - 2, H('#e8e8e8')); R.rect(x + 24, y - 8, x + 28, y - 2, H('#e8e8e0')); R.rect(x + 25, y - 7, x + 27, y - 6, H('#3a4a5a')); for (let k = 0; k < 8; k++) R.pset(x + 32 + k * 3, y + 2 - (k % 2), H('#d8eef4')); }
  // el pelícano que vuela y se zambulle en «Hatteras Island»
  { const d = t - (ISLA - 1.4); if (d < 1.4) { const x = Math.round(lerp(-20, 130, Math.max(0, t - (ISLA - 4.2)) / 2.8)), y = 58 + Math.round(Math.sin(t * 2) * 2), a = Math.sin(t * 6) > 0 ? -3 : 2; R.rect(x, y, x + 7, y + 2, H('#8a7a6a')); R.linea(x + 1, y, x - 5, y + a, H('#6a5a4a')); R.linea(x + 5, y, x + 11, y + a, H('#6a5a4a')); R.rect(x + 7, y - 2, x + 9, y, BL); R.linea(x + 9, y, x + 14, y + 1, H('#d8a040')); }
    else if (d < 1.9) { const u = (d - 1.4) / 0.5, x = Math.round(lerp(130, 150, u)), y = Math.round(lerp(58, 124, u * u)); R.poligono([[x, y], [x + 3, y - 8], [x + 6, y]], H('#8a7a6a')); R.linea(x + 3, y, x + 3, y + 4, H('#d8a040')); }
    else if (d < 3.0) { const u = (d - 1.9) / 1.1; for (let k = 0; k < 10; k++) { const a = Math.PI * (k / 9), r = u * 12; R.pset(Math.round(152 + Math.cos(a) * r), Math.round(124 - Math.sin(a) * r * 1.4 + u * u * 10), BL); } R.anillo(152, 126, Math.round(3 + u * 8), H('#bfe2ee')); } }
  // la lancha con la arqueóloga y el voluntario: cruza hacia la isla; él la señala en «Hatteras Island»
  const bx = Math.round(lerp(10, 136, ease(tramo(t, 0.6, P2)))), wl = 158 + Math.round(Math.sin(t * 2.4) * 1);
  for (let k = 0; k < 10; k++) { const x = bx - 6 - k * 6, y = wl + 2 + (k % 2); if (x > 0) R.linea(x, y, x + 3, y - (k % 2), H('#e8f6fa')); }
  R.actor(EL.arqueologaRK, bx + 6, wl - 2, t, { dir: 1, habla: t > Q(2.6) && t < Q(4.6) && Math.sin(t * 12) > 0, sonrisa: t > ISLA });
  R.actor(EL.voluntarioRK, bx + 26, wl - 2, t, { dir: 1, dedo: t > ISLA - 0.2, sorpresa: t > ISLA - 0.2 && t < ISLA + 0.5 });
  R.poligono([[bx - 3, wl - 9], [bx + 48, wl - 9], [bx + 44, wl + 2], [bx + 2, wl + 2]], K); R.poligono([[bx - 2, wl - 8], [bx + 47, wl - 8], [bx + 43, wl + 1], [bx + 3, wl + 1]], H('#e8ecee')); R.linea(bx - 1, wl - 5, bx + 46, wl - 5, H('#2a6aa8')); R.linea(bx - 1, wl - 4, bx + 46, wl - 4, H('#2a6aa8')); R.linea(bx + 3, wl, bx + 43, wl, H('#a8b0b8'));
  R.rect(bx - 8, wl - 13, bx - 2, wl - 4, K); R.rect(bx - 7, wl - 12, bx - 3, wl - 5, H('#3a3a44')); R.rect(bx - 6, wl - 4, bx - 4, wl + 3, K); for (let k = 0; k < 4; k++) R.pset(bx - 7 - k * 2, wl + 2 + (k % 2), BL);
};
// ── 2 · la excavación: «since 2009» ─────────────────────────────────────────────────────────────────────────────
const VOLUNT = Q(10.5), ARQ = Q(9.5), DESDE = Q(7.42);
const p2 = (t) => {
  const o = { encuadre: 'excavacion', sacude: 1 };
  T.hatteras(R, t, o);
  const u = ease(tramo(t, P2, VOLUNT - 0.6)), xv = Math.round(lerp(20, 168, u)), vuelca = tramo(t, VOLUNT - 0.3, VOLUNT + 0.2);
  const v = R.actor(EL.voluntarioRK, xv, 160, t, { dir: 1, anda: u > 0 && u < 1, sostiene: vuelca > 0 ? [198, Math.round(lerp(146, 136, vuelca))] : [xv + 18, 150], sonrisa: t > VOLUNT + 0.3 });
  { const [mx, my] = v.mano, ang = vuelca * 1.6; const cx = mx + 4, cy = my + 2;
    const pts = [[-5, -4], [5, -4], [4, 5], [-4, 5]].map(([a, b]) => [Math.round(cx + a * Math.cos(ang) - b * Math.sin(ang)), Math.round(cy + a * Math.sin(ang) + b * Math.cos(ang))]);
    R.poligono(pts.map(([a, b]) => [a, b]), K); R.poligono(pts.map(([a, b], i) => [a + (i < 2 ? 0 : 0), b]), H('#e87a20')); R.linea(pts[0][0], pts[0][1], pts[1][0], pts[1][1], H('#7a5a3a')); R.linea(mx, my, cx, cy - 6, K);
    if (vuelca > 0.5 && t < VOLUNT + 0.8) for (let k = 0; k < 10; k++) { const d = ((t * 3 + k * 0.13) % 0.5); R.pset(Math.round(pts[1][0] + 2 + (k % 3)), Math.round(pts[1][1] + d * 24), k % 2 ? H('#8a6a44') : H('#b89a6a')); } }
  R.actor(EL.arqueologaRK, 248, 160, t, { dir: -1, sostiene: [244 + Math.round(Math.sin(t * 9) * 2), 147], habla: t > ARQ - 0.3 && t < ARQ + 0.9 && Math.sin(t * 13) > 0, sonrisa: t > VOLUNT });
  T.hatterasDelante(R, t, o);
};
// ── 3 · inserto: la cata de cerca y la empuñadura ───────────────────────────────────────────────────────────────
const HILT = Q(14.86);
const VERDE = [H('#2a5a4a'), H('#4a8a6a'), H('#7ab894')];
const empunadura = (x, y) => { // la espada tumbada: hoja rota a la izquierda, guarda, puño y pomo
  R.poligono([[x - 40, y - 1], [x - 2, y - 3], [x - 2, y + 3], [x - 38, y + 2]], H('#6a3a24')); R.linea(x - 38, y - 1, x - 3, y - 2, H('#a85a30')); for (let k = 0; k < 8; k++) R.pset(x - 36 + k * 4, y + (k % 2), H('#c8783a'));
  R.rect(x - 2, y - 13, x + 3, y + 13, K); R.rect(x - 1, y - 12, x + 2, y + 12, VERDE[1]); R.linea(x - 1, y - 12, x - 1, y + 12, VERDE[2]); R.linea(x + 2, y - 12, x + 2, y + 12, VERDE[0]); R.disco(x, y - 13, 2, VERDE[1]); R.disco(x, y + 13, 2, VERDE[1]);
  R.rect(x + 3, y - 3, x + 28, y + 3, K); R.rect(x + 4, y - 2, x + 27, y + 2, VERDE[1]); for (let i = x + 5; i < x + 27; i += 3) R.linea(i, y - 2, i + 1, y + 2, VERDE[0]); R.linea(x + 4, y - 2, x + 27, y - 2, VERDE[2]);
  R.disco(x + 32, y, 5, K); R.disco(x + 32, y, 4, VERDE[1]); R.pset(x + 31, y - 2, VERDE[2]); R.pset(x + 30, y - 1, VERDE[2]); R.pset(x + 34, y + 2, VERDE[0]);
  for (let k = 0; k < 10; k++) R.pset(x - 1 + Math.floor(hh(k, 1, 90) * 32), y - 2 + Math.floor(hh(k, 2, 90) * 5), H('#a8d8b8')); };
const p3 = (t) => {
  capa('h3', () => {
    // la superficie de arena arriba (tranquila bajo el año y Atom), el cordel y la pared de la cata con sus capas
    deg(0, 0, 319, 40, [H('#e2d2a8'), H('#d8c498'), H('#ccb688')]); for (let k = 0; k < 140; k++) { const x = Math.floor(hh(k, 1, 91) * 320), y = Math.floor(hh(k, 2, 91) * 40); if (!tranquilo(x, y)) R.pset(x, y, H('#bca478')); }
    for (const [y0, y1, c, cs, k0] of [[40, 52, '#4a3424', '#3a2618', 1], [52, 70, '#7a6a5a', '#5a4a3a', 2], [70, 84, '#c8925a', '#a8723a', 3], [84, 96, '#5a4434', '#3e2e22', 4]]) {
      R.rect(0, y0, 319, y1, H(c)); for (let k = 0; k < 300; k++) R.pset(Math.floor(hh(k, 3, 91 + k0) * 320), y0 + Math.floor(hh(k, 4, 91 + k0) * (y1 - y0 + 1)), H(cs));
      for (let x = 0; x < 320; x++) R.pset(x, y0 + Math.round(Math.sin(x * 0.06 + k0) * 1.2), mez(H(c), K, 0.25)); }
    // la capa de conchas (el basurero del pueblo): ostras y almejas
    for (let k = 0; k < 46; k++) { const x = Math.floor(hh(k, 5, 92) * 316), y = 54 + Math.floor(hh(k, 6, 92) * 14); elipse(x, y, 3, 1, H('#e8e2d4')); R.pset(x - 2, y, H('#b8b0a0')); R.pset(x + 1, y - 1, BL); }
    for (let k = 0; k < 30; k++) { const x = Math.floor(hh(k, 7, 92) * 320), y = 86 + Math.floor(hh(k, 8, 92) * 10); R.rect(x, y, x + 1, y, K); }
    for (const [x, l] of [[34, 22], [118, 14], [262, 26], [300, 12]]) for (let j = 0; j < l; j++) R.pset(x + Math.round(Math.sin(j * 0.4 + x) * 2), 42 + j, H('#c8b08a'));
    for (const [x, y, n] of [[24, 46, '1'], [80, 60, '2'], [190, 76, '3'], [288, 90, '4']]) { R.rect(x - 4, y - 4, x + 5, y + 5, K); R.rect(x - 3, y - 3, x + 4, y + 4, BL); R.numero(n, x, y + 4, { centro: true, color: H('#3a3440') }); R.pset(x, y - 5, H('#c8303a')); }
    R.linea(0, 37, 319, 37, H('#f0e8d8')); R.linea(0, 38, 319, 38, H('#b8a888'));
    // el fondo de la cata: tierra raspada, conchas, carbón, un tiesto del pueblo con marcas de cuerda
    deg(0, 96, 319, 179, [H('#7a5e44'), H('#6e5440'), H('#62483a')]);
    for (let k = 0; k < 120; k++) { const x = Math.floor(hh(k, 9, 93) * 320), y = 98 + Math.floor(hh(k, 10, 93) * 80); R.linea(x, y, x + 5, y + 1, H('#86684a')); }
    for (let k = 0; k < 60; k++) { const x = Math.floor(hh(k, 11, 93) * 320), y = 98 + Math.floor(hh(k, 12, 93) * 80); R.pset(x, y, k % 4 ? H('#2a2018') : H('#d8d0c0')); }
    for (let k = 0; k < 9; k++) { const y0 = 104 + k * 8; for (let x = 0; x < 320; x += 2) if (hh(x >> 4, k, 120) > 0.35) R.pset(x, y0 + Math.round(Math.sin(x * 0.03 + k) * 2), H('#5a4232')); }
    for (const [x0, y0, l] of [[100, 100, 30], [230, 98, 24], [20, 104, 18]]) for (let j = 0; j < l; j++) R.pset(x0 + Math.round(Math.sin(j * 0.3) * 3) + j, y0 + Math.round(j * 0.4), H('#c8b08a'));
    elipse(250, 104, 16, 4, H('#3a2a20')); for (let k = 0; k < 14; k++) R.pset(236 + Math.floor(hh(k, 1, 121) * 28), 101 + Math.floor(hh(k, 2, 121) * 7), K);
    R.linea(0, 112, 319, 104, H('#f0e8d8')); R.linea(0, 113, 319, 105, H('#a89878')); R.rect(214, 104, 217, 110, H('#8a8e98')); R.pset(215, 103, H('#c8ccd4'));
    R.poligono([[96, 120], [112, 117], [114, 126], [98, 128]], K); R.poligono([[97, 121], [111, 118], [113, 125], [99, 127]], H('#a88a62')); R.linea(98, 122, 111, 119, H('#c8a87a')); for (let i = 0; i < 3; i++) R.linea(100 + i * 4, 121, 101 + i * 4, 126, H('#7a6040'));
    R.rect(266, 152, 300, 156, K); R.rect(267, 153, 299, 155, H('#d84a2a')); R.rect(290, 150, 312, 158, K); R.rect(291, 151, 311, 157, H('#e8e4dc')); R.linea(293, 153, 309, 153, H('#a8a8b8')); R.linea(293, 155, 305, 155, H('#a8a8b8'));
    R.poligono([[52, 150], [82, 146], [86, 164], [56, 168]], K); R.poligono([[53, 151], [81, 147], [85, 163], [57, 167]], H('#8a7458')); for (let i = 0; i < 6; i++) R.linea(56 + i * 5, 150, 60 + i * 5, 166, H('#6a5640')); R.linea(53, 151, 81, 147, H('#b49a78'));
    for (const [x, y] of [[240, 160], [120, 112], [286, 122], [30, 120]]) { elipse(x, y, 5, 3, H('#d8d0c0')); elipse(x - 1, y - 1, 3, 1, H('#f2eee4')); R.pset(x + 3, y + 1, H('#a8a090')); }
    // la regla de escala (negro y blanco) y el cubo naranja en la esquina
    for (let k = 0; k < 6; k++) R.rect(92 + k * 8, 172, 99 + k * 8, 175, k % 2 ? BL : K); R.rect(91, 171, 140, 171, K);
    R.poligono([[2, 132], [40, 132], [36, 179], [6, 179]], K); R.poligono([[3, 133], [39, 133], [35, 179], [7, 179]], H('#e87a20')); R.rect(3, 133, 39, 137, H('#5a4030')); R.linea(4, 140, 36, 140, H('#f09a48')); R.linea(10, 133, 21, 120, K); R.linea(21, 120, 32, 133, K);
  });
  // la empuñadura, tapada por la tierra que la paleta va quitando
  const ex = 200, ey = 132, rev = ease(tramo(t, P3 + 0.5, HILT));
  empunadura(ex, ey);
  for (let y = ey - 16; y <= ey + 16; y++) for (let x = ex - 44; x <= ex + 40; x++) { const n = hh(x >> 1, y >> 1, 94) * 0.7 + (ex + 40 - x) / 84 * 0.3; if (n > rev * 1.05) R.pset(x, y, (x + y) % 5 ? H('#6e5440') : H('#86684a')); }
  if (t > HILT) for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283 + t, d = 22 + Math.sin(t * 5 + k) * 4; R.pset(Math.round(ex + 8 + Math.cos(a) * d * 1.6), Math.round(ey + Math.sin(a) * d * 0.7), H('#fff4b0')); }
  // la luz entre las hojas que se mueve; la cinta rosa del cordel; una hormiga
  for (let k = 0; k < 7; k++) { const x = Math.round(30 + k * 44 + Math.sin(t * 0.7 + k) * 6), y = 110 + (k * 23) % 60; for (let j = 0; j < 30; j++) { const px = x + Math.floor(hh(j, k, 95) * 14), py = y + Math.floor(hh(k, j, 95) * 8); R.pset(px, py, mez(R.pget(px, py), H('#fff0c0'), 0.25)); } }
  { const fl = Math.round(Math.sin(t * 8) * 2); R.poligono([[150, 37], [158, 37 + fl], [156, 46 + fl], [150, 40]], H('#f06aa0')); }
  { const x = Math.round(300 - ((t - P3) * 9) % 120), y = 150; R.rect(x, y, x + 1, y, K); R.pset(x + 2, y, K); R.pset(x - 1, y + 1, K); R.pset(x + 3, y + 1, K); }
  // la paleta en la mano canónica: raspa de un lado a otro sobre el puño
  const ras = Math.sin(t * 8), hx = Math.round(284 - rev * 16 + ras * 5), hy = Math.round(124 + Math.abs(ras) * 2), tx = hx - 32, ty = hy + 10;
  R.linea(hx - 4, hy, hx - 14, hy + 3, K); R.linea(hx - 4, hy - 1, hx - 14, hy + 2, H('#a07040')); R.rect(hx - 17, hy + 1, hx - 14, hy + 5, H('#8a8e98'));
  R.poligono([[hx - 16, hy + 1], [tx, ty], [hx - 18, hy + 9]], K); R.poligono([[hx - 16, hy + 2], [tx + 2, ty], [hx - 18, hy + 8]], H('#b8bcc6')); R.linea(hx - 16, hy + 2, tx + 2, ty, H('#e8ecf2'));
  if (t < HILT + 0.3) for (let k = 0; k < 5; k++) { const d = (t * 4 + k * 0.2) % 1; R.pset(Math.round(tx - 2 - d * 8 * Math.sign(ras + 0.01)), Math.round(ty - d * 6 + d * d * 10), H('#86684a')); }
  T.brazo(R, 324, 136, hx + 4, hy + 2, '#b49a6a', -1);
};
// ── 4 · la mesa de hallazgos: las fotos y las fichas ────────────────────────────────────────────────────────────
const ARMAS = Q(16.28), PIZARRA = Q(17.56), ANILLO = Q(19.75);
const fichaPieza = (k, x0, y0, x1, y1) => { const cx = Math.round((x0 + x1) / 2), cy = Math.round((y0 + y1) / 2);
  if (k === 0) { R.rect(cx - 13, cy - 1, cx - 4, cy + 1, H('#7a4a2a')); R.rect(cx - 4, cy - 7, cx - 2, cy + 7, VERDE[1]); R.linea(cx - 4, cy - 7, cx - 4, cy + 7, VERDE[2]); R.rect(cx - 1, cy - 2, cx + 9, cy + 2, VERDE[1]); for (let i = cx; i < cx + 9; i += 2) R.pset(i, cy + 1, VERDE[0]); R.disco(cx + 12, cy, 3, VERDE[0]); R.disco(cx + 12, cy, 2, VERDE[1]); }
  if (k === 1) { R.rect(cx - 12, cy - 3, cx + 8, cy + 4, K); R.rect(cx - 11, cy - 2, cx + 7, cy + 3, H('#7a7e86')); R.linea(cx - 11, cy - 2, cx + 7, cy - 2, H('#a8acb4')); for (let i = 0; i < 7; i++) R.pset(cx + 7 - i, cy - 3 - Math.round(Math.sin(i * 0.6) * 5), K); R.linea(cx + 8, cy - 3, cx + 12, cy - 9, K); R.disco(cx - 6, cy, 1, H('#4a4e56')); R.pset(cx + 2, cy + 1, H('#a85a30')); R.pset(cx - 2, cy + 2, H('#a85a30')); }
  if (k === 2) { R.poligono([[cx - 13, cy - 7], [cx + 12, cy - 8], [cx + 13, cy + 7], [cx - 11, cy + 8]], K); R.poligono([[cx - 12, cy - 6], [cx + 11, cy - 7], [cx + 12, cy + 6], [cx - 10, cy + 7]], H('#4a5260')); for (let i = 0; i < 4; i++) R.linea(cx - 9, cy - 4 + i * 3, cx + 9, cy - 5 + i * 3 + (i % 2), H('#8a94a2')); R.linea(cx - 4, cy - 5, cx + 2, cy + 4, H('#b8c0cc')); }
  if (k === 3) { R.anillo(cx, cy + 1, 7, K); R.anillo(cx, cy + 1, 6, H('#c89a3a')); R.anillo(cx, cy + 1, 5, H('#e8c060')); R.anillo(cx, cy + 1, 4, K); R.disco(cx, cy - 6, 3, K); R.disco(cx, cy - 6, 2, H('#e8c060')); R.pset(cx - 1, cy - 7, BL); R.pset(cx + 4, cy - 3, BL); } };
const p4 = (t) => {
  const o = { encuadre: 'mesa', piezas: 4 };
  const g = T.hatteras(R, t, o), pz = g.piezas ?? [[154, 143], [200, 144], [240, 141], [281, 144]];
  const tiempos = [P4 + 0.05, ARMAS, PIZARRA, ANILLO];
  const foto = tiempos.findIndex((tk) => t >= tk - 0.45 && t < tk + 0.35);
  const v = R.actor(EL.voluntarioRK, 44, 162, t, { dir: 1, sostiene: [62, foto >= 0 ? 136 : 146], sonrisa: t > ANILLO + 0.4 });
  { const [mx, my] = v.mano; R.rect(mx - 1, my - 6, mx + 8, my, K); R.rect(mx, my - 5, mx + 7, my - 1, H('#3a3a44')); R.disco(mx + 5, my - 3, 2, H('#1a1a22')); R.pset(mx + 5, my - 3, H('#6a8aaa')); R.rect(mx + 1, my - 7, mx + 3, my - 6, K);
    for (let k = 0; k < 4; k++) if (t >= tiempos[k] && t < tiempos[k] + 0.12) { R.disco(mx + 2, my - 6, 4, H('#fff8e0')); for (let j = -10; j <= 10; j += 2) { R.pset(mx + 2 + j, my - 6, BL); R.pset(mx + 2, my - 6 + j, BL); } const [px, py] = pz[k]; R.anillo(px, py, 6, BL); R.anillo(px, py, 8, H('#fff4b0')); } }
  const señala = tiempos.findIndex((tk) => t >= tk - 0.1 && t < tk + 0.8);
  R.actor(EL.arqueologaRK, 100, 162, t, { dir: 1, dedo: señala >= 0, habla: señala < 0 && Math.sin(t * 11) > 0 && t < ANILLO + 0.8, sonrisa: t > ANILLO + 0.8 });
  T.hatterasDelante(R, t, o);
  // las fichas ampliadas, que suben en la palabra de cada pieza
  const cxs = [146, 192, 238, 284];
  for (let k = 0; k < 4; k++) ficha(cxs[k], 66, 40, 28, tramo(t, tiempos[k], tiempos[k] + 0.35), pz[k][0], pz[k][1] - 4, (x0, y0, x1, y1) => fichaPieza(k, x0, y0, x1, y1));
  if (t > ANILLO + 0.3) for (let k = 0; k < 4; k++) { const a = t * 3 + k * 1.57; R.pset(Math.round(284 + Math.cos(a) * 24), Math.round(80 + Math.sin(a) * 18), H('#fff4b0')); }
};
// ── 5 · 2025: la carpa de prensa y el frasquito ─────────────────────────────────────────────────────────────────
const ANUNCIA = F(27.29), PEQUE = F(28.09);
const p5 = (t) => {
  capa('h5', () => {
    deg(0, 0, 319, 70, [H('#78b0e0'), H('#94c2e8'), H('#b8d6ee')]);
    for (let x = 0; x < 320; x++) R.linea(x, 66, x, 76, x % 4 ? H('#5a9ab8') : H('#7ab4cc'));
    for (let k = 0; k < 24; k++) { const x = k * 14 + Math.floor(hh(k, 1, 96) * 8); copa(x, 66 + Math.floor(hh(k, 2, 96) * 6), 9 + Math.floor(hh(k, 3, 96) * 5), H('#3e6a3a'), H('#6a9a4a'), H('#2a4a2a'), k + 96); }
    R.rect(0, 80, 319, 179, H('#e2cc98')); deg(0, 80, 319, 179, [H('#d8c08a'), H('#e2cc98'), H('#e8d4a4')]);
    for (let k = 0; k < 500; k++) R.pset(Math.floor(hh(k, 4, 96) * 320), 80 + Math.floor(hh(k, 5, 96) * 100), k % 3 ? H('#ccb07a') : H('#f0e2bc'));
    for (let k = 0; k < 40; k++) { const x = 20 + Math.floor(hh(k, 6, 96) * 280), y = 120 + Math.floor(hh(k, 7, 96) * 56); R.rect(x, y, x + 1, y, H('#c4a670')); R.rect(x + 3, y + 2, x + 4, y + 2, H('#c4a670')); }
    for (const [x, y] of [[8, 172], [300, 176], [250, 132], [60, 124], [160, 176], [118, 166]]) for (let i = -2; i <= 2; i++) R.linea(x + i * 2, y, x + i * 3, y - 7 - Math.abs(i % 2) * 2, i % 2 ? H('#8a9a4a') : H('#b8b860'));
    for (let k = 0; k < 16; k++) elipse(10 + Math.floor(hh(k, 8, 96) * 300), 124 + Math.floor(hh(k, 9, 96) * 52), 2, 1, H('#f2eee4'));
    for (const x of [92, 232]) { elipse(x + 3, 153, 6, 3, K); elipse(x + 3, 152, 5, 2, H('#9a8a5a')); }
    R.poligono([[96, 152], [240, 152], [226, 122], [110, 122]], mez(H('#e2cc98'), H('#2a4a7a'), 0.18));
    for (const [x, c] of [[250, '#e87a20'], [262, '#e87a20'], [276, '#3a6ac8']]) { R.poligono([[x, 128], [x + 9, 128], [x + 8, 140], [x + 1, 140]], K); R.poligono([[x + 1, 129], [x + 8, 129], [x + 7, 139], [x + 2, 139]], H(c)); R.rect(x + 1, 129, x + 8, 130, H('#6a4a30')); }
    for (let x = 0; x < 320; x++) { const y = 158 + Math.round(Math.sin(x * 0.05) * 1.5); if (x % 40 < 2) R.rect(x, y - 8, x + 1, y, H('#8a6a44')); else R.pset(x, y - 6, (x >> 2) % 2 ? H('#f0d020') : K); }
    // la excavación de fondo con su cuadrícula y la camioneta
    R.rect(250, 90, 316, 104, H('#9a7a54')); for (let x = 250; x <= 316; x += 11) R.linea(x, 90, x, 104, H('#f0e8d8')); R.linea(250, 97, 316, 97, H('#f0e8d8')); R.rect(250, 90, 316, 91, H('#7a5a3a'));
    R.rect(8, 92, 52, 106, K); R.rect(9, 93, 51, 105, H('#f0f0f0')); R.rect(36, 86, 51, 93, K); R.rect(37, 87, 50, 93, H('#f0f0f0')); R.rect(40, 88, 48, 92, H('#8ab0c8')); R.disco(18, 107, 3, K); R.disco(44, 107, 3, K); R.rect(9, 99, 51, 99, H('#c8c8cc'));
    // la carpa azul: el techo con faldón festoneado, las patas, la mesa con bolsitas, el portátil y el atril con el dibujo de una escama
    R.poligono([[92, 60], [240, 60], [226, 46], [106, 46]], K); R.poligono([[94, 59], [238, 59], [225, 47], [107, 47]], H('#2a6ab8')); R.linea(108, 48, 224, 48, H('#5a9ae0'));
    for (let x = 92; x < 240; x += 10) { R.poligono([[x, 60], [x + 10, 60], [x + 5, 66]], K); R.poligono([[x + 1, 60], [x + 9, 60], [x + 5, 64]], H('#2a6ab8')); }
    for (const x of [96, 236]) { R.rect(x, 60, x + 1, 152, H('#8a8e98')); R.linea(x, 60, x, 152, H('#c8ccd4')); } for (const x of [112, 220]) R.rect(x, 64, x + 1, 120, H('#6a6e78'));
    R.rect(112, 114, 220, 118, K); R.rect(113, 114, 219, 117, BL); for (const x of [116, 216]) R.rect(x, 118, x + 1, 130, H('#8a8e98'));
    for (let k = 0; k < 5; k++) { const x = 118 + k * 9; R.rect(x, 108, x + 6, 114, H('#e8eef2')); R.rect(x, 108, x + 6, 109, H('#c8303a')); R.pset(x + 3, 111, H('#8a6a44')); }
    R.rect(168, 106, 186, 114, K); R.rect(169, 107, 185, 113, H('#3a5a8a')); R.rect(166, 113, 188, 114, H('#a8acb4'));
    R.linea(198, 114, 206, 78, H('#6a4a2a')); R.linea(214, 114, 206, 78, H('#6a4a2a')); R.rect(194, 76, 220, 98, K); R.rect(195, 77, 219, 97, BL);
    R.poligono([[200, 86], [206, 80], [214, 82], [216, 90], [208, 94], [202, 92]], H('#6a7a8a')); R.poligono([[203, 86], [207, 82], [212, 84], [213, 89], [207, 91]], H('#a8b8c8')); R.pset(209, 84, BL);
  });
  nubes(t, P5, [[40, 26, 26, 1.6], [150, 34, 20, 2.4], [230, 30, 24, 1.1]], [H('#a8bcd0'), H('#e2eaf2'), H('#ffffff')]);
  // vecinos pequeños que criban al fondo
  for (let k = 0; k < 2; k++) { const x = 262 + k * 30, y = 104, s = Math.round(Math.sin(t * 8 + k) * 1); R.rect(x, y - 7, x + 2, y - 2, [H('#c8303a'), H('#3a6ac8')][k]); R.pset(x + 1, y - 8, H('#f6c290')); R.rect(x + 3 + s, y - 5, x + 9 + s, y - 4, H('#8a6a44')); }
  // los dos arqueólogos: uno llega con el frasquito y lo levanta en «announced»; el otro habla y lo señala
  const u = ease(tramo(t, P5 + 0.1, P5 + 1.4)), xa = Math.round(lerp(150, 132, u)), alza = ease(tramo(t, ANUNCIA - 0.3, ANUNCIA + 0.2));
  const a = R.actor(EL.arqueologoNX, xa, 150, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [xa + 18, Math.round(lerp(134, 120, alza))], sonrisa: t > PEQUE });
  R.actor(EL.voluntarioRK, 176, 150, t, { dir: -1, habla: t > P5 + 1.2 && t < ANUNCIA - 0.2 && Math.sin(t * 12) > 0, dedo: t > PEQUE - 0.3, sonrisa: t > PEQUE + 0.4 });
  { const [mx, my] = a.mano; R.rect(mx - 2, my - 11, mx + 2, my, K); R.rect(mx - 1, my - 10, mx + 1, my - 1, H('#d8eef4')); R.rect(mx - 1, my - 12, mx + 1, my - 11, H('#a87a4a')); R.rect(mx - 1, my - 5, mx + 1, my - 1, H('#6a7a8a')); if (Math.sin(t * 6) > 0.3) R.pset(mx, my - 4, BL);
    // «smaller»: la ficha redonda con las escamas ampliadas
    ficha(mx + 30, my - 44, 30, 26, tramo(t, PEQUE - 0.2, PEQUE + 0.3), mx + 2, my - 8, (x0, y0, x1, y1) => { for (let k = 0; k < 9; k++) { const x = x0 + 3 + Math.floor(hh(k, 1, 97) * (x1 - x0 - 6)), y = y0 + 3 + Math.floor(hh(k, 2, 97) * (y1 - y0 - 6)); R.poligono([[x, y], [x + 3, y - 1], [x + 4, y + 2], [x + 1, y + 3]], H('#6a7a8a')); R.pset(x + 1, y, H('#c8d8e8')); } }); }
  // las cámaras de la prensa (delante): la de trípode con su piloto rojo y los dos reporteros
  { const x = 70, y = 172; for (const dx of [-8, 0, 8]) R.linea(x, y - 22, x + dx, y, K); R.rect(x - 7, y - 30, x + 7, y - 21, K); R.rect(x - 6, y - 29, x + 6, y - 22, H('#3a3a44')); R.rect(x + 7, y - 28, x + 11, y - 23, K); R.pset(x - 5, y - 28, Math.sin(t * 4) > 0 ? H('#ff3a3a') : H('#6a2a2a')); }
  const flash = (t > ANUNCIA && t < ANUNCIA + 0.1) || (t > ANUNCIA + 0.45 && t < ANUNCIA + 0.55);
  const r1 = R.actor(EL.periodistaUK, 20, 174, t, { dir: 1, sostiene: [38, 152] }), r2 = R.actor(EL.investigadoraIA, 262, 174, t, { dir: -1, sostiene: [256, 150] });
  for (const r of [r1, r2]) { const [mx, my] = r.mano; R.rect(mx - 4, my - 5, mx + 4, my, K); R.rect(mx - 3, my - 4, mx + 3, my - 1, H('#2a2a34')); R.pset(mx, my - 3, H('#6a8aaa')); if (flash) { R.disco(mx, my - 6, 4, H('#fff8e0')); for (let j = -9; j <= 9; j += 3) { R.pset(mx + j, my - 6, BL); R.pset(mx, my - 6 + j, BL); } } }
};
// ── 6 · inserto: el yunque y las escamas que saltan ─────────────────────────────────────────────────────────────
const GOLPES = [F(29.45), F(30.95), F(32.2), F(33.15)];
const p6 = (t) => {
  capa('h6', () => {
    // la pared de la herrería: tablas oscuras con herramientas colgadas (la esquina de Atom, lisa y oscura)
    deg(0, 0, 319, 140, [H('#2a201c'), H('#3a2c24'), H('#463428')]);
    for (let x = 0; x < 320; x += 16) { R.linea(x, 0, x, 140, H('#221a16')); for (let k = 0; k < 6; k++) R.pset(x + 3 + Math.floor(hh(x, k, 98) * 10), Math.floor(hh(k, x, 98) * 140), H('#4e3c2e')); }
    R.rect(90, 30, 250, 32, H('#5a4434'));
    for (const [x, l, tipo] of [[104, 34, 0], [126, 28, 1], [148, 36, 0], [174, 30, 2], [200, 34, 1], [226, 26, 0]]) { R.linea(x, 32, x, 32 + l, H('#7a6a5a')); R.linea(x + 1, 32, x + 1, 32 + l, H('#4a3e34'));
      if (tipo === 0) { R.rect(x - 4, 32 + l, x + 5, 32 + l + 5, K); R.rect(x - 3, 33 + l, x + 4, 36 + l, H('#5a5e66')); } if (tipo === 1) { R.linea(x, 32 + l, x - 4, 40 + l, K); R.linea(x + 1, 32 + l, x + 5, 40 + l, K); } if (tipo === 2) { R.disco(x, 36 + l, 4, K); R.disco(x, 36 + l, 2, H('#3a2c24')); } }
    // la fragua de ladrillo a la izquierda, con su campana
    R.rect(0, 50, 70, 150, H('#6a3a2a')); for (let y = 52; y < 150; y += 5) { R.linea(0, y, 70, y, H('#4a2a1e')); for (let x = (y % 10) ? 0 : 6; x < 70; x += 12) R.linea(x, y, x, y + 4, H('#4a2a1e')); }
    R.poligono([[0, 40], [76, 40], [64, 70], [0, 70]], H('#4a3a30')); R.linea(0, 40, 76, 40, H('#6a5848'));
    R.rect(8, 104, 62, 120, H('#1e1410'));
    // el suelo de tierra con escamas viejas, el tocón y la tina de agua
    R.rect(0, 140, 319, 179, H('#4a3a2c')); for (let k = 0; k < 400; k++) R.pset(Math.floor(hh(k, 1, 99) * 320), 140 + Math.floor(hh(k, 2, 99) * 40), k % 4 ? H('#3a2c22') : H('#6a7a8a'));
    R.rect(130, 128, 210, 168, K); R.rect(132, 128, 208, 166, H('#6a4a30')); for (let y = 132; y < 166; y += 4) R.linea(132, y, 208, y + (y % 8 ? 1 : 0), H('#5a3c26')); R.rect(132, 128, 208, 131, H('#9a7a54'));
    R.poligono([[252, 128], [304, 128], [300, 172], [256, 172]], K); R.poligono([[254, 129], [302, 129], [298, 171], [258, 171]], H('#6a4a30')); for (const y of [138, 160]) R.rect(254, y, 302, y + 2, H('#3a3a40')); R.rect(255, 130, 301, 133, H('#2a4a5a'));
    // el yunque: el cuerno a la izquierda, la mesa, la cintura y los pies
    R.poligono([[118, 104], [140, 102], [140, 112], [126, 110]], K); R.poligono([[120, 105], [140, 103], [140, 111], [128, 109]], H('#4a4e58'));
    R.rect(140, 100, 216, 112, K); R.rect(141, 101, 215, 111, H('#5a5e68')); R.rect(141, 101, 215, 103, H('#9aa0aa')); R.rect(156, 112, 200, 120, K); R.rect(157, 112, 199, 119, H('#4a4e58')); R.poligono([[146, 128], [210, 128], [200, 119], [156, 119]], K); R.poligono([[148, 127], [208, 127], [199, 120], [157, 120]], H('#4a4e58'));
  });
  // las brasas que laten y su resplandor
  for (let k = 0; k < 40; k++) { const x = 10 + Math.floor(hh(k, 3, 100) * 50), y = 106 + Math.floor(hh(k, 4, 100) * 13), f = Math.sin(t * 6 + k * 1.7); R.pset(x, y, f > 0.5 ? H('#ffe080') : f > -0.2 ? H('#ff8a30') : H('#c83a1a')); }
  for (let k = 0; k < 4; k++) { const d = (t * 0.8 + k * 0.25) % 1; R.pset(Math.round(30 + k * 6 + Math.sin(t * 3 + k) * 3), Math.round(102 - d * 40), mez(H('#ff8a30'), H('#3a2c24'), d)); }
  // el hierro al rojo sobre el yunque, sujeto con las tenazas de la mano izquierda
  const ult = GOLPES.filter((g) => t >= g).pop(), calor = 0.75 + Math.sin(t * 5) * 0.1;
  R.rect(156, 96, 214, 100, K); R.rect(157, 97, 213, 99, mez(H('#ff6a20'), H('#ffe080'), calor)); R.linea(157, 97, 213, 97, H('#fff4b0'));
  for (let y = 88; y < 108; y++) for (let x = 150; x < 220; x++) { const gl = 1 - Math.hypot(x - 185, (y - 98) * 3) / 34; if (gl > 0 && (y < 96 || y > 100)) R.pset(x, y, mez(R.pget(x, y), H('#ff8a30'), gl * 0.35)); }
  R.linea(158, 98, 46, 124, K); R.linea(158, 99, 46, 125, H('#3a3c44')); R.linea(160, 97, 48, 120, K); R.linea(160, 96, 48, 119, H('#5a5e68')); R.disco(150, 99, 2, K);
  T.brazo(R, -2, 142, 36, 124, '#7a5a3a', 1);
  // el martillo en la mano derecha: sube y cae cuatro veces (en «flakes», «fly off», «hammers» y «hot»)
  let ang = 3.92; for (const g of GOLPES) { const d = t - g; if (d > -0.35 && d <= 0) ang = lerp(3.92, 3.05, ease((d + 0.35) / 0.35)); else if (d > 0 && d < 0.4) ang = lerp(3.05, 3.92, ease(d / 0.4)); }
  const hx = 282, hy = 104, L = 82, cx = Math.round(hx + Math.cos(ang) * L), cy = Math.round(hy + Math.sin(ang) * L);
  for (const d of [-2, 2]) R.linea(hx, hy + d, cx, cy + d, K); R.linea(hx, hy - 1, cx, cy - 1, H('#c8a070')); R.linea(hx, hy, cx, cy, H('#a07a4a')); R.linea(hx, hy + 1, cx, cy + 1, H('#6a4a2a'));
  { const px = -Math.sin(ang), py = Math.cos(ang); const a = [cx + px * 10, cy + py * 10], b = [cx - px * 10, cy - py * 10], ux = Math.cos(ang) * 9, uy = Math.sin(ang) * 9;
    R.poligono([[a[0] - ux * 0.2, a[1] - uy * 0.2], [b[0] - ux * 0.2, b[1] - uy * 0.2], [b[0] + ux, b[1] + uy], [a[0] + ux, a[1] + uy]].map(([p, q]) => [Math.round(p), Math.round(q)]), K);
    R.poligono([[a[0], a[1]], [b[0], b[1]], [b[0] + ux * 0.8, b[1] + uy * 0.8], [a[0] + ux * 0.8, a[1] + uy * 0.8]].map(([p, q]) => [Math.round(p), Math.round(q)]), H('#5a5e68')); R.linea(Math.round(a[0]), Math.round(a[1]), Math.round(b[0]), Math.round(b[1]), H('#9aa0aa')); }
  T.brazo(R, 326, 124, hx + 4, hy + 1, '#7a5a3a', -1);
  // las escamas y las chispas de cada golpe
  for (const [i, g] of GOLPES.entries()) { chispazo(t, g, 184, 96, 26, 100 + i, 1.4); if (t > g && t < g + 0.08) { R.disco(184, 96, 7, H('#fff8d0')); } }
  const caidas = GOLPES.filter((g) => t > g + 0.6).length; for (let k = 0; k < caidas * 8; k++) R.pset(140 + Math.floor(hh(k, 5, 101) * 80), 130 + Math.floor(hh(k, 6, 101) * 40), k % 2 ? H('#a8b8c8') : H('#6a7a8a'));
};
// ── 7 · la criba: el imán, las escamas (golpe) y el gag del clip y la moneda ─────────────────────────────────────
const BAJA = F(34.4), POSA = F(35.15), CARGA = F(35.9), SUBE = F(36.0), ARRIBA = F(36.6), GAG = F(36.85), GAG1 = F(37.6);
const p7 = (t) => {
  const iman = ease(tramo(t, BAJA, POSA)) * (1 - ease(tramo(t, SUBE, ARRIBA)));
  const o = { encuadre: 'excavacion', camara: 'criba', iman, escamas: ease(tramo(t, POSA + 0.1, CARGA)), gag: ease(tramo(t, GAG, GAG1)) };
  const g = T.hatteras(R, t, o);
  T.brazo(R, ...g.brazo, ...g.iman, '#b49a6a', -1);
  // el golpe: la barba de escamas sale a la luz con un destello grande
  if (t > ARRIBA - 0.15 && t < ARRIBA + 0.5) { const d = (t - ARRIBA + 0.15) / 0.65; for (const [px, py] of g.polos) for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283, r = 4 + d * 14; R.pset(Math.round(px + Math.cos(a) * r), Math.round(py + 6 + Math.sin(a) * r), d < 0.5 ? BL : H('#c8d8e8')); } }
  globo(g.clip ? g.clip[0] - 18 : 214, (g.clip ? g.clip[1] : 70) - 14, tramo(t, GAG1 - 0.1, GAG1 + 0.3), '!', H('#c8303a'));
};
// ── 8 · 1590: la fragua en el pueblo de Croatoan ────────────────────────────────────────────────────────────────
const PUEBLO = F(40.64), GOLPES8 = [F(38.6), F(39.2), F(39.8), F(40.4), F(41.0), F(41.6)];
const p8 = (t) => {
  capa('h8', () => {
    deg(0, 0, 319, 66, [H('#72aade'), H('#90bce6'), H('#b4d4ec')]);
    for (let x = 0; x < 320; x++) R.linea(x, 62, x, 72, x % 5 ? H('#5a9ab0') : H('#86bccc'));
    deg(0, 72, 319, 179, [H('#c8b88a'), H('#d4c294'), H('#dccca0')]);
    for (let k = 0; k < 600; k++) R.pset(Math.floor(hh(k, 1, 102) * 320), 72 + Math.floor(hh(k, 2, 102) * 108), k % 3 ? H('#bca878') : H('#e8dcb8'));
    // los robles y la casa larga de esteras sobre arcos (como en las acuarelas de White)
    for (const [x, y, r, k] of [[22, 52, 26, 1], [60, 64, 18, 2], [250, 62, 20, 3]]) { R.rect(x - 2, y, x + 2, y + 34, H('#5a4636')); copa(x, y, r, H('#3e6a3a'), H('#6a9a4a'), H('#2a4a2a'), k + 102); }
    R.rect(20, 120, 140, 126, H('#7a6a48'));
    for (let x = 22; x < 140; x++) { const top = 84 + Math.round(((x - 80) / 60) ** 2 * 10); for (let y = top; y < 122; y++) R.pset(x, y, ((y - top) >> 2) % 2 ? H('#b89a6a') : H('#a8885a')); R.pset(x, top, H('#d8c090')); R.pset(x, top + 1, H('#c8ac78')); }
    for (let x = 30; x < 140; x += 14) R.linea(x, 84 + Math.round(((x - 80) / 60) ** 2 * 10), x, 122, H('#7a6040'));
    R.rect(64, 100, 86, 122, H('#3a2c20')); R.rect(64, 100, 86, 101, H('#6a5040'));
    R.poligono([[22, 88], [30, 92], [30, 104], [22, 100]], H('#8a7048'));
    // el secadero de maíz y el maizal a la derecha (debajo de la esquina de Atom)
    for (let k = 0; k < 18; k++) { const x = 266 + k * 3, h = 34 + (k % 4) * 4; R.linea(x, 130, x, 130 - h, H('#5a8a3a')); for (let j = 0; j < 4; j++) R.linea(x, 130 - h + 6 + j * 7, x + (j % 2 ? 4 : -4), 130 - h + 4 + j * 7, H('#7aa84a')); R.rect(x, 130 - h + 12, x + 1, 130 - h + 16, H('#e8c040')); }
    R.rect(150, 96, 152, 132, H('#6a5040')); R.rect(186, 96, 188, 132, H('#6a5040')); R.rect(146, 96, 192, 98, H('#6a5040')); for (let k = 0; k < 6; k++) { R.rect(154 + k * 5, 99, 156 + k * 5, 108, H('#e8c040')); R.pset(155 + k * 5, 99, H('#8a6a2a')); }
    // la fragua de barro y piedra; el yunque en su tocón; el fuelle de piel
    R.poligono([[196, 150], [244, 150], [238, 120], [202, 120]], K); R.poligono([[198, 149], [242, 149], [236, 121], [204, 121]], H('#9a6a4a')); for (let k = 0; k < 14; k++) R.disco(200 + Math.floor(hh(k, 3, 103) * 40), 124 + Math.floor(hh(k, 4, 103) * 24), 2, H('#8a8478'));
    R.rect(206, 118, 234, 124, H('#2a1e18'));
    R.rect(126, 140, 162, 162, K); R.rect(128, 140, 160, 160, H('#6a4a30')); R.rect(128, 140, 160, 142, H('#9a7a54'));
    R.rect(124, 132, 164, 140, K); R.rect(125, 133, 163, 139, H('#5a5e68')); R.rect(125, 133, 163, 134, H('#9aa0aa'));
    R.poligono([[244, 136], [262, 132], [264, 146], [244, 146]], K); R.poligono([[245, 137], [261, 133], [263, 145], [245, 145]], H('#a8784a')); R.linea(236, 140, 245, 140, H('#4a3a2a'));
    for (const [x, y] of [[40, 166], [90, 172], [280, 168], [180, 174]]) { elipse(x, y, 3, 1, H('#f2eee4')); }
    for (let k = 0; k < 7; k++) { const y = 150 - (k % 3) * 3, x = 4 + (k >> 1) * 4; R.linea(x, y, x + 26, y - 2, K); R.linea(x, y - 1, x + 26, y - 3, H('#8a6a44')); R.disco(x, y - 1, 1, H('#c8a070')); }
    for (const [x, y, c] of [[176, 168, '#7a5a44'], [190, 172, '#9a6a44']]) { elipse(x, y, 7, 5, K); elipse(x, y, 6, 4, H(c)); elipse(x, y - 3, 5, 1, H('#3a2a20')); for (let i = -5; i < 6; i += 2) R.pset(x + i, y + 1, H('#5a3e2c')); }
    R.rect(276, 150, 316, 162, H('#b89a6a')); for (let x = 276; x < 316; x += 3) R.linea(x, 150, x, 162, H('#a8885a')); for (let k = 0; k < 5; k++) { R.rect(280 + k * 7, 153, 284 + k * 7, 158, H('#e8c040')); R.pset(282 + k * 7, 153, H('#8a6a2a')); }
    R.linea(70, 104, 70, 134, H('#6a5040')); R.linea(120, 104, 120, 134, H('#6a5040')); for (let y = 108; y < 132; y += 4) for (let x = 72; x < 119; x += 4) { R.pset(x, y, H('#c8bca0')); R.pset(x + 2, y + 2, H('#c8bca0')); }
    for (let k = 0; k < 30; k++) { const x = 30 + k * 9 + Math.floor(hh(k, 9, 103) * 5), y = 166 + Math.floor(hh(k, 10, 103) * 10); elipse(x, y, 2, 1, H('#e8e2d4')); }
    for (let k = 0; k < 20; k++) { const x = Math.floor(hh(k, 11, 103) * 320), y = 136 + Math.floor(hh(k, 12, 103) * 40); for (let i = -1; i <= 1; i++) R.linea(x + i, y, x + i * 2, y - 4, H('#9a9a5a')); }
  });
  nubes(t, P8, [[60, 28, 24, 2], [170, 40, 20, 1.4], [230, 26, 18, 2.6]], [H('#a8bcd0'), H('#e2eaf2'), H('#ffffff')]);
  // el fuego de la fragua: llamas que bailan, humo que sube
  for (let k = 0; k < 9; k++) { const x = 208 + k * 3, h = 6 + Math.round((Math.sin(t * 9 + k * 1.3) + 1) * 4); R.linea(x, 120, x, 120 - h, k % 2 ? H('#ff8a30') : H('#ffd060')); R.pset(x, 120 - h - 1, H('#ffe8a0')); }
  for (let k = 0; k < 5; k++) { const d = (t * 0.4 + k * 0.2) % 1, x = Math.round(220 + Math.sin(t + k) * 4 + d * 14), y = Math.round(108 - d * 50); if (!tranquilo(x, y)) R.disco(x, y, 2 + Math.round(d * 3), mez(H('#9a9aa0'), H('#c8d4e0'), d)); }
  // el colono martillea; el vecino de Croatoan sopla con el fuelle; se sonríen en «Croatoan village»; el niño mira
  let golpe = 0; for (const g of GOLPES8) { const d = t - g; if (d > -0.25 && d <= 0) golpe = ease((d + 0.25) / 0.25); }
  const c = R.actor(EL.colonoRK, 106, 160, t, { dir: 1, sostiene: [128, Math.round(lerp(118, 130, golpe))], sonrisa: t > PUEBLO, habla: t > PUEBLO - 1.2 && t < PUEBLO - 0.2 && Math.sin(t * 12) > 0 });
  { const [mx, my] = c.mano; R.linea(mx, my, mx + 6, my - 6, K); R.linea(mx + 1, my, mx + 7, my - 6, H('#a07a4a')); R.rect(mx + 4, my - 10, mx + 10, my - 6, K); R.rect(mx + 5, my - 9, mx + 9, my - 7, H('#5a5e68')); }
  R.rect(132, 129, 156, 131, K); R.rect(133, 130, 155, 130, mez(H('#ff6a20'), H('#ffe080'), 0.6 + Math.sin(t * 5) * 0.2));
  for (const [i, g] of GOLPES8.entries()) chispazo(t, g, 146, 128, 14, 110 + i, 0.8);
  const fu = Math.sin(t * 5) > 0;
  R.actor(EL.croatoanRK, 252, 160, t, { dir: -1, sostiene: [250, fu ? 132 : 138], sonrisa: t > PUEBLO + 0.1 });
  R.actor(EL.ninoCroatoanRK, 52, 162, t, { dir: 1, sorpresa: GOLPES8.some((g) => t > g && t < g + 0.4), sonrisa: t > PUEBLO + 0.3 });
  // la gallina que picotea delante
  { const x = Math.round(90 + Math.sin(t * 0.6) * 10), y = 172, p = Math.sin(t * 5) > 0.5 ? 2 : 0; R.rect(x, y - 4, x + 5, y, H('#c8a070')); R.rect(x + 4, y - 6 + p, x + 6, y - 4 + p, H('#c8a070')); R.pset(x + 7, y - 5 + p, H('#d8a020')); R.pset(x + 5, y - 7 + p, H('#c8303a')); R.pset(x + 2, y + 1, H('#d8a020')); R.pset(x + 4, y + 1, H('#d8a020')); }
};
// ── 9 · 2026: el laboratorio y la bandeja de huesecillos ────────────────────────────────────────────────────────
const HUESOS = U(45.1), COMIAN = U(46.06);
const p9 = (t) => {
  const o = { encuadre: 'mesa', camara: 'laboratorio', lupa: 0 };
  const g = T.hatteras(R, t, o), bj = g.bandeja ?? [138, 136, 186, 148];
  const u = ease(tramo(t, P9 + 0.1, P9 + 1.6)), x = Math.round(lerp(10, 104, u)), coge = tramo(t, HUESOS - 0.3, HUESOS + 0.1), alza = ease(tramo(t, HUESOS + 0.3, HUESOS + 0.9));
  const r = R.actor(EL.conservadoraRK, x, 166, t, { dir: 1, anda: u > 0 && u < 1, sostiene: coge > 0 ? [Math.round(lerp(126, 132, coge)), Math.round(lerp(144, 140, coge) - alza * 12)] : undefined, sorpresa: t > HUESOS + 0.6 && t < HUESOS + 1.2, habla: t > COMIAN && Math.sin(t * 12) > 0, pal: { H: hex('#3a2418'), h: hex('#5a3a28') } });
  if (coge > 0) { const [mx, my] = r.mano, tx = Math.round(lerp(mx + 12, mx + 10, alza)), ty = my + 2; R.linea(mx + 1, my, tx, ty, H('#c8ccd4')); R.linea(mx + 1, my + 1, tx, ty + 1, H('#8a909a')); if (alza > 0.2 || coge >= 1) { R.rect(tx, ty - 1, tx + 3, ty, BL); R.pset(tx + 3, ty + 1, H('#d8d0bc')); } }
  T.hatterasDelante(R, t, o);
  ficha(Math.round((bj[0] + bj[2]) / 2) + 6, 92, 48, 30, tramo(t, HUESOS, HUESOS + 0.35), Math.round((bj[0] + bj[2]) / 2), bj[1], (x0, y0, x1, y1) => {
    const cy = Math.round((y0 + y1) / 2);
    R.disco(x0 + 8, cy, 5, K); R.disco(x0 + 8, cy, 4, H('#e8dcc0')); R.disco(x0 + 8, cy, 1, H('#a89a7a')); R.linea(x0 + 8, cy - 5, x0 + 8, cy - 8, H('#e8dcc0'));
    R.rect(x0 + 17, cy - 1, x0 + 29, cy + 1, K); R.rect(x0 + 18, cy, x0 + 28, cy, H('#f0e6d0')); R.disco(x0 + 17, cy, 2, H('#f0e6d0')); R.disco(x0 + 29, cy, 2, H('#f0e6d0')); R.pset(x0 + 17, cy - 2, K); R.pset(x0 + 29, cy + 2, K);
    for (let k = 0; k < 3; k++) { R.linea(x0 + 34 + k * 3, cy - 5, x0 + 36 + k * 3, cy + 5, H('#e8dcc0')); R.pset(x0 + 34 + k * 3, cy - 6, K); } });
  // «the animals people ate»: piensa en la olla al fuego
  pensamiento(Math.max(40, x - 6), 96, 30, 22, x + 8, 136, tramo(t, COMIAN - 0.2, COMIAN + 0.3));
  if (t > COMIAN + 0.1) { const cx = Math.max(40, x - 6), cy = 96; R.rect(cx - 7, cy - 1, cx + 7, cy + 6, K); R.rect(cx - 6, cy, cx + 6, cy + 5, H('#6a4a30')); R.rect(cx - 8, cy - 2, cx + 8, cy - 1, K); for (let k = 0; k < 3; k++) { const d = (t * 1.2 + k / 3) % 1; R.pset(cx - 3 + k * 3 + Math.round(Math.sin(t * 4 + k)), Math.round(cy - 4 - d * 6), H('#a8b0b8')); } for (let k = 0; k < 4; k++) R.pset(cx - 5 + k * 3, cy + 7, k % 2 ? H('#ff8a30') : H('#ffd060')); }
};
// ── 10 · inserto, 1590: los dos platos vierten en uno ───────────────────────────────────────────────────────────
const MEZCLA = U(49.04), AMBOS = U(50.02);
const p10 = (t) => {
  capa('h10', () => {
    // la estera de juncos en espiga, con su orla (tranquila arriba)
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = ((x + (y >> 2) * 2) >> 2) % 2; R.pset(x, y, d ? H('#c8ac78') : H('#b4965f')); }
    for (let y = 0; y < 180; y += 24) for (let x = 0; x < 320; x++) R.pset(x, y, H('#a88a58'));
    R.rect(0, 172, 319, 179, H('#7a5a34')); for (let x = 0; x < 320; x += 4) R.pset(x, 174 + (x >> 2) % 3, H('#a8885a'));
    // lo que hay alrededor: dos mazorcas, conchas, una calabaza cuchara, una cuchara de peltre, una cesta de alubias, bellotas
    for (const [x, y] of [[20, 40], [34, 46]]) { R.poligono([[x, y], [x + 22, y - 6], [x + 24, y - 2], [x + 2, y + 4]], K); R.poligono([[x + 1, y], [x + 21, y - 5], [x + 23, y - 2], [x + 2, y + 3]], H('#e8c040')); for (let i = 3; i < 21; i += 3) R.pset(x + i, y - Math.round(i / 4), H('#b88a20')); R.poligono([[x + 20, y - 6], [x + 32, y - 12], [x + 24, y - 1]], H('#c8b878')); }
    for (const [x, y] of [[280, 150], [296, 158], [24, 150]]) { elipse(x, y, 6, 4, K); elipse(x, y, 5, 3, H('#3a3a5a')); R.linea(x - 4, y - 1, x + 3, y - 2, H('#8a8ab0')); }
    R.disco(270, 70, 9, K); R.disco(270, 70, 8, H('#c8a050')); R.disco(268, 68, 3, H('#e8c070')); R.linea(278, 70, 300, 80, K); R.linea(278, 69, 300, 79, H('#a87a3a'));
    R.linea(30, 120, 52, 112, K); R.linea(30, 119, 52, 111, H('#a8acb4')); elipse(56, 110, 4, 3, H('#8a8e98'));
    elipse(36, 84, 12, 8, K); elipse(36, 84, 11, 7, H('#a87a3a')); for (let k = 0; k < 12; k++) R.pset(28 + Math.floor(hh(k, 1, 104) * 16), 80 + Math.floor(hh(k, 2, 104) * 8), k % 2 ? H('#8a2a2a') : H('#f0e8d8'));
    for (const [x, y] of [[248, 168], [262, 164], [100, 168]]) { R.disco(x, y, 2, H('#7a5a2a')); R.rect(x - 2, y - 3, x + 2, y - 2, H('#5a4020')); }
    elipse(120, 46, 16, 9, K); elipse(120, 45, 15, 8, H('#c88a4a')); elipse(118, 42, 10, 4, H('#e0a860')); for (let k = 0; k < 4; k++) R.linea(110 + k * 6, 40, 113 + k * 6, 48, H('#a8683a'));
    R.linea(196, 50, 226, 44, K); R.linea(196, 49, 226, 43, H('#d8d0c0')); R.rect(226, 41, 232, 46, K); R.rect(227, 42, 231, 45, H('#d8d0c0')); R.pset(229, 43, K);
    R.linea(196, 160, 226, 150, K); R.linea(196, 159, 222, 151, H('#8a6a44')); R.rect(222, 146, 234, 154, K); R.rect(223, 147, 233, 153, H('#c8ccd4'));
    for (const [x, y] of [[70, 162], [86, 158], [140, 168]]) { elipse(x, y, 5, 3, H('#e8e2d4')); R.linea(x - 3, y, x + 3, y - 1, H('#b8b0a0')); }
    elipse(196, 86, 8, 6, K); elipse(196, 86, 7, 5, H('#d8c070')); R.linea(196, 80, 196, 72, H('#5a8a3a')); R.pset(197, 72, H('#5a8a3a'));
  });
  // los tres recipientes: el plato de peltre (inglés), el cuenco de barro con marcas de cuerda (algonquino) y el cuenco de madera
  const m = ease(tramo(t, MEZCLA - 0.4, MEZCLA + 0.2)) * (1 - 0.6 * ease(tramo(t, AMBOS + 0.4, AMBOS + 1))), ox = Math.round(m * 16), oy = Math.round(m * -6);
  const llena = tramo(t, MEZCLA, AMBOS);
  elipse(162, 128, 30, 18, K); elipse(162, 128, 29, 17, H('#8a5a30')); elipse(162, 128, 24, 13, H('#6a4020')); for (let k = 0; k < 6; k++) R.linea(140 + k * 8, 118 + (k % 2), 144 + k * 8, 138 - (k % 2), H('#7a4a28'));
  for (let k = 0; k < Math.round(llena * 40); k++) { const a = hh(k, 1, 105) * 6.283, rr = Math.sqrt(hh(k, 2, 105)) * 20; const x = Math.round(162 + Math.cos(a) * rr), y = Math.round(128 + Math.sin(a) * rr * 0.6); R.rect(x, y, x + 1, y, [H('#e8c040'), H('#f0ead8'), H('#8a2a2a'), H('#e88a30'), H('#5a9a3a')][k % 5]); }
  const plato = (x, y) => { elipse(x, y, 34, 20, K); elipse(x, y, 33, 19, H('#9aa0a8')); elipse(x, y, 27, 15, H('#7a8088')); R.anillo; for (let k = 0; k < 10; k++) R.pset(x - 30 + k * 6, y - 15 + (k % 3), H('#d8dce4'));
    for (let k = 0; k < Math.round((1 - llena * 0.8) * 22); k++) { const px = x - 18 + Math.floor(hh(k, 3, 106) * 36), py = y - 8 + Math.floor(hh(k, 4, 106) * 16); R.rect(px, py, px + 2, py + 1, k % 3 ? H('#f0ead8') : H('#5a9a3a')); } };
  const cuenco = (x, y) => { elipse(x, y, 30, 18, K); elipse(x, y, 29, 17, H('#7a5a44')); elipse(x, y, 24, 13, H('#5a3e2c')); for (let k = 0; k < 14; k++) { const a = k / 14 * 6.283; R.pset(Math.round(x + Math.cos(a) * 27), Math.round(y + Math.sin(a) * 15.5), H('#9a7a5a')); R.pset(Math.round(x + Math.cos(a + 0.1) * 27), Math.round(y + Math.sin(a + 0.1) * 15.5), H('#4a3424')); }
    for (let k = 0; k < Math.round((1 - llena * 0.8) * 26); k++) { const px = x - 18 + Math.floor(hh(k, 5, 107) * 36), py = y - 9 + Math.floor(hh(k, 6, 107) * 18); R.rect(px, py, px + 1, py + 1, [H('#e8c040'), H('#8a2a2a'), H('#e88a30')][k % 3]); } };
  plato(62 + ox, 100 + oy); cuenco(258 - ox, 100 + oy);
  // lo que cae de los dos en el del medio
  if (m > 0.6 && llena < 1) for (let k = 0; k < 16; k++) { const d = (t * 2 + k / 16) % 1, lado = k % 2 ? 1 : -1, sx = lado < 0 ? 94 + ox : 230 - ox, x = Math.round(lerp(sx, 162 + lado * 6, d)), y = Math.round(100 + oy + d * 24 - Math.sin(d * 3.14) * 10); R.rect(x, y, x + 1, y + 1, lado < 0 ? (k % 4 ? H('#f0ead8') : H('#5a9a3a')) : [H('#e8c040'), H('#8a2a2a'), H('#e88a30')][k % 3]); }
  // el vapor que sube en dos colores y se trenza
  if (t > AMBOS - 0.2) for (let k = 0; k < 2; k++) for (let j = 0; j < 14; j++) { const d = ((t * 0.6 + j / 14) % 1), x = Math.round(162 + Math.sin(d * 9 + k * 3.14) * 7), y = Math.round(116 - d * 50); if (!tranquilo(x, y)) R.pset(x, y, k ? mez(H('#f0d8a0'), H('#c8ac78'), d) : mez(H('#e0e4ee'), H('#c8ac78'), d)); }
  // las dos manos que inclinan el plato y el cuenco: manga de lino y manga de piel de ciervo
  T.brazo(R, -6, 134, 20 + ox, 112 + oy, '#d8ceb4', 1); T.brazo(R, 326, 134, 300 - ox, 112 + oy, '#a8784a', -1);
};
// ── 11 · inserto, 2026: la bala de plomo bajo la lupa ───────────────────────────────────────────────────────────
const LUZ11 = U(51.75), EMPUJA = U(52.3), NADIE = U(53.59), DISPARO = U(54.53);
const p11 = (t) => {
  capa('h11', () => {
    // la pared de azulejos (lisa en la esquina de Atom) y la encimera blanca con la plancha de corte cuadriculada
    R.rect(0, 0, 319, 70, H('#e4e8ea')); for (let y = 0; y < 70; y += 10) for (let x = 0; x < 320; x++) if (!tranquilo(x, y)) R.pset(x, y, H('#ccd2d6')); for (let x = 0; x < 320; x += 14) for (let y = 0; y < 70; y++) if (!tranquilo(x, y)) R.pset(x, y, H('#ccd2d6'));
    R.rect(0, 66, 319, 72, H('#b8bec4')); R.rect(0, 72, 319, 179, H('#f0f2f2')); for (let k = 0; k < 200; k++) R.pset(Math.floor(hh(k, 1, 108) * 320), 72 + Math.floor(hh(k, 2, 108) * 108), H('#e2e6e8'));
    R.rect(40, 90, 260, 172, H('#3a7a5a')); for (let x = 40; x <= 260; x += 10) R.linea(x, 90, x, 172, H('#4e9a72')); for (let y = 90; y <= 172; y += 10) R.linea(40, y, 260, y, H('#4e9a72'));
    R.rect(110, 104, 190, 150, H('#f6f4ee')); for (let k = 0; k < 60; k++) R.pset(110 + Math.floor(hh(k, 3, 108) * 80), 104 + Math.floor(hh(k, 4, 108) * 46), H('#e2ded4'));
    // la regla con números, la placa de Petri, los guantes azules, la gradilla con viales, el cuaderno
    R.rect(60, 156, 180, 164, K); R.rect(61, 157, 179, 163, H('#e8d8a0')); for (let k = 0; k <= 10; k++) R.linea(62 + k * 11, 157, 62 + k * 11, k % 5 ? 159 : 161, K); for (const k of [0, 5, 10]) R.numero(String(k / 5 | 0), 62 + k * 11, 170, { centro: true, color: H('#3a3440') });
    R.anillo(20, 120, 14, H('#a8b4bc')); R.anillo(20, 120, 13, H('#e8f0f4')); for (let k = 0; k < 5; k++) R.pset(14 + k * 3, 118 + (k % 2) * 3, H('#d8d0c0'));
    for (const [x, y] of [[284, 140], [296, 150]]) { R.disco(x, y, 8, K); R.disco(x, y, 7, H('#5a8ad8')); for (let f = 0; f < 3; f++) R.rect(x + 6, y - 5 + f * 4, x + 12, y - 3 + f * 4, H('#5a8ad8')); R.pset(x - 3, y - 3, H('#8ab0ee')); }
    R.rect(8, 78, 40, 96, K); R.rect(9, 79, 39, 95, H('#c8ccd4')); for (let k = 0; k < 5; k++) { R.rect(11 + k * 6, 70, 14 + k * 6, 86, K); R.rect(12 + k * 6, 71, 13 + k * 6, 85, H('#e8f4f8')); R.rect(12 + k * 6, 79, 13 + k * 6, 85, [H('#c8303a'), H('#3a6ac8'), H('#e8c040'), H('#5aa85a'), H('#a85ad8')][k]); }
    R.rect(268, 92, 312, 124, K); R.rect(269, 93, 311, 123, H('#f2e8c8')); for (let k = 0; k < 6; k++) R.linea(273, 98 + k * 4, 306, 98 + k * 4, H('#a8a8b8')); R.rect(269, 93, 272, 123, H('#c8303a'));
  });
  // el brazo articulado de la lupa (desde el borde derecho, por debajo de Atom) y la lupa de aro
  const lx = 150, ly = 118, r = 38, on = tramo(t, LUZ11 - 0.1, LUZ11 + 0.3);
  for (const [x0, y0, x1, y1] of [[322, 80, 248, 64], [248, 64, lx + r - 2, ly - 18]]) { for (const d of [-2, 3]) R.linea(x0, y0 + d, x1, y1 + d, K); R.linea(x0, y0 - 1, x1, y1 - 1, H('#e8ecf0')); R.linea(x0, y0, x1, y1, H('#c8ccd4')); R.linea(x0, y0 + 1, x1, y1 + 1, H('#a8aeb8')); R.linea(x0, y0 + 2, x1, y1 + 2, H('#7a808a')); }
  R.disco(248, 65, 4, K); R.disco(248, 65, 3, H('#8a909a')); R.pset(247, 64, BL);
  // dentro de la lente: la tela ampliada y la bala de plomo grande (gira cuando la empujan las pinzas)
  const giro = ease(tramo(t, EMPUJA, EMPUJA + 0.6)) * 0.9;
  for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { if (dx * dx + dy * dy > r * r) continue; const x = lx + dx, y = ly + dy, tela = ((x >> 2) + (y >> 2)) % 2;
    let c = tela ? H('#f6f4ee') : H('#e8e4da'); const bx = lx + 2, by = ly + 4, d = Math.hypot(x - bx, y - by);
    if (d < 23) { const lux = 1 - Math.hypot(x - bx + 8, y - by + 9) / 30; c = mez(H('#5a5e66'), H('#b8bcc4'), Math.max(0, lux)); if (lux > 0.82) c = H('#e8ecf2'); if (hh(x >> 1, y >> 1, 109) > 0.86) c = mez(c, H('#d8dcd0'), 0.5); if (hh(x, y, 110) > 0.95) c = mez(c, K, 0.4); }
    else if (d < 25 && y > by) c = mez(c, K, 0.25);
    if (on > 0) c = mez(c, H('#fff8e0'), on * 0.15); R.pset(x, y, c); }
  { const bx = lx + 2, by = ly + 4; for (let k = -18; k <= 18; k++) { const a = giro + 0.3, x = Math.round(bx + k * Math.cos(a)), y = Math.round(by + k * Math.sin(a) * 0.4 + Math.sqrt(Math.max(0, 400 - k * k)) * 0.15); R.pset(x, y, H('#4a4e56')); } R.disco(bx - 9 + Math.round(giro * 6), by + 8, 2, H('#4a4e56')); }
  // las pinzas (ampliadas dentro de la lente)
  const pu = ease(tramo(t, EMPUJA - 0.4, EMPUJA)) * (1 - ease(tramo(t, EMPUJA + 0.8, EMPUJA + 1.3)));
  if (pu > 0) { const tx = Math.round(lerp(lx + 40, lx + 24, pu)), ty = Math.round(lerp(ly + 30, ly + 20, pu)); for (const d of [0, 4]) { R.linea(lx + 34, ly + 26 + d, tx, ty + d, K); R.linea(lx + 34, ly + 25 + d, tx, ty - 1 + d, H('#c8ccd4')); } }
  R.anillo(lx, ly, r + 1, K); R.anillo(lx, ly, r + 2, H('#e8ecf0')); R.anillo(lx, ly, r + 3, H('#c8ccd4')); R.anillo(lx, ly, r + 4, H('#a8aeb8')); R.anillo(lx, ly, r + 5, K);
  for (let k = 0; k < 24; k++) { const a = k / 24 * 6.283; R.pset(Math.round(lx + Math.cos(a) * (r + 3)), Math.round(ly + Math.sin(a) * (r + 3)), on > 0.5 ? H('#fff8d0') : H('#8a909a')); }
  for (let k = 0; k < 6; k++) { R.pset(lx - 22 + k, ly - 24 + k, BL); R.pset(lx - 23 + k, ly - 23 + k, BL); }
  // las pinzas fuera de la lente, en la mano canónica que entra por abajo a la derecha
  { const hx = Math.round(lerp(236, 222, pu)), hy = Math.round(lerp(164, 156, pu)); for (const d of [0, 3]) { R.linea(hx - 6, hy - 4 + d, lx + 34, ly + 27 + d, K); R.linea(hx - 6, hy - 5 + d, lx + 34, ly + 26 + d, H('#c8ccd4')); } T.brazo(R, 274, 186, hx + 8, hy + 2, '#e8eaf0', -1); }
  // «no one can say»: la «?»
  { const u = tramo(t, NADIE - 0.1, NADIE + 0.3); if (u > 0) { const w = t > DISPARO ? Math.round(Math.sin(t * 10) * 2) : 0; globo(232 + w, 46, u, '?', H('#c8303a')); } }
};
const efectos = [[1.5, 'motor'], [ISLA + 0.5, 'chof'], [VOLUNT, 'golpecito'], [P3 + 0.4, 'golpecito'], [HILT, 'brillo'], [ARMAS, 'flash'], [PIZARRA, 'flash'], [ANILLO, 'brillo'],
  [ANUNCIA, 'flash'], [PEQUE, 'brillo'], ...GOLPES.map((g) => [g, 'golpecito']), [POSA, 'golpecito'], [ARRIBA - 0.1, 'brillo'], [GAG + 0.3, 'tic'], [GAG1, 'pop'],
  [GOLPES8[0], 'golpecito'], [GOLPES8[3], 'golpecito'], [HUESOS, 'tic'], [COMIAN, 'pop'], [MEZCLA, 'burbujas'], [LUZ11, 'interruptor'], [EMPUJA, 'tic'], [NADIE, 'pop']];
const año = (t) => t < P2 ? 2026 : t < P3 ? (t < DESDE + 0.6 ? 2009 : Math.round(lerp(2009, 2026, ease(tramo(t, DESDE + 0.6, P3 - 0.6))))) : t < P5 ? 2026 : t < P8 ? 2025 : t < P9 ? 1590 : 2026;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11]], { efectos, cartela: '2026', año });
''')
