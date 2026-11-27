E = {}

# Lo común de las tres escenas: mezcla de colores, oscurecer una zona, cielo tramado, fondo fijo en búfer, bolsas
# numeradas y la cámara de televisión al hombro.
COMUN = r'''
import { ELENCO_AT as A } from '/atomo/plato/kits/pixel-chibi.js';
const PZ = T.PIEZAS_AT, H = R.hash2;
const mez = (c, d, k) => { const r = (c & 255) * (1 - k) + (d & 255) * k, g = ((c >> 8) & 255) * (1 - k) + ((d >> 8) & 255) * k, b = ((c >> 16) & 255) * (1 - k) + ((d >> 16) & 255) * k; return (0xff000000 | (Math.round(b) << 16) | (Math.round(g) << 8) | Math.round(r)) >>> 0; };
const NEGRO = hex('#0c0a12'), BLANCO = hex('#ffffff'), K = hex('#1c1a22');
const oscurece = (x0, y0, x1, y1, k, col = NEGRO) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(R.pget(x, y), col, k)); };
// cielo tramado (trama 4×4 entre tonos) en [x0, y0, x1, y1]
const cieloT = (x0, y0, x1, y1, cols) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, R.tone4(cols, (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), x, y)); };
const AZULES = ['#3e8ad0', '#5aa2dc', '#7cb8e6', '#a4d0ee', '#cce4f2'].map(hex);
// lo fijo de un plano se pinta una vez en su búfer y se copia en cada fotograma
const fijo = (fn) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); fn(); R.usar(prev); } R.copiar(b); }; };
// un pájaro que aletea
const ave = (x, y, t, k = 0) => { const al = Math.sin(t * 9 + k) > 0 ? 1 : 0; const c = hex('#2a2a36'); R.pset(x, y, c); R.pset(x - 1, y - al, c); R.pset(x - 2, y - 1 - al, c); R.pset(x + 1, y - al, c); R.pset(x + 2, y - 1 - al, c); };
// la bolsa de hallazgos con su cierre de color y la etiqueta (x centro, y arriba; 9 × 12)
const bolsa = (x, y, col = '#d8443a', dentro = '#8a6a4a') => {
  R.rect(x - 4, y, x + 4, y + 11, K); R.rect(x - 3, y + 1, x + 3, y + 10, hex('#dce8ec')); R.rect(x - 3, y + 1, x + 3, y + 2, hex(col));
  R.rect(x - 2, y + 4, x + 2, y + 6, BLANCO); R.pset(x - 1, y + 5, K); R.pset(x + 1, y + 5, K); R.rect(x - 2, y + 7, x + 2, y + 9, hex(dentro)); R.pset(x + 3, y + 3, BLANCO);
};
// la cámara de televisión al hombro (la mano en x, y)
const camaraTV = (x, y, dir, t) => {
  const x0 = dir > 0 ? x - 5 : x - 10; R.rect(x0, y - 9, x0 + 15, y - 2, K); R.rect(x0 + 1, y - 8, x0 + 14, y - 3, hex('#3a3a46')); R.rect(x0 + 1, y - 8, x0 + 14, y - 8, hex('#6a6a78'));
  R.rect(x0 + 4, y - 11, x0 + 10, y - 10, K); const lx = dir > 0 ? x0 + 16 : x0 - 4; R.rect(lx, y - 8, lx + 3, y - 3, K); R.rect(lx + 1, y - 7, lx + 2, y - 4, hex('#4a6a9a')); R.pset(lx + 1, y - 7, hex('#bcd8f0'));
  if (Math.sin(t * 6) > 0) R.pset(dir > 0 ? x0 + 2 : x0 + 13, y - 10, hex('#ff3a3a'));
};
'''

E['at-arqueologos'] = ('Arqueólogos', '''// AT-ARQUEOLOGOS (frase 22), 2014. Cuatro planos:
// 1. la carpa de los arqueólogos: uno limpia con el pincel un cartucho; la arqueóloga entra con una bolsa numerada y la
//    deja en la mesa; el cámara de la productora entra por la derecha y graba («production company»);
// 2. corta en «dig»: la pared de la fosa con sus capas (tierra, basura, periódicos, cajas, cemento) y la cuadrícula de
//    cuerdas; la arqueóloga, subida a un tablón, limpia un cartucho de la pared («excavation site») y el arqueólogo
//    pone una etiqueta numerada en cada capa («each layer»); un cubo sube por la cuerda;
// 3. corta en «checked»: la mesa de cerca: la mano con la lupa recorre la fecha del periódico de 1983 («dates») y luego
//    el cartucho que salió con él («boxes»);
// 4. corta en «And that's how»: dentro de la carpa, los periódicos de la fosa colgados de una cuerda por fechas; la
//    arqueóloga cuelga la bolsa con el cartucho junto al último («cartridges») y sale «1983» con el visto bueno.''', COMUN + r'''
const a = (f) => en('arqueologos', f);
const P2 = a(0.2335), P3 = a(0.5124), P4 = a(0.7661);
const camara = a(0.1235), deja = a(0.20), sitio = a(0.29), capa = a(0.414), fechas = a(0.548), cajas = a(0.70), confirma = a(0.811), cartuchos = a(0.849), tarde83 = a(0.915);

// ── 1 · la carpa ─────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  T.desierto(R, t, { encuadre: 'carpa' });
  // el arqueólogo limpia con el pincel el cartucho del centro de la mesa
  const cep = Math.round(Math.sin(t * 11) * 2);
  const rb = R.actor(A.arqueologo, 154, 160, t, { dir: -1, sostiene: [146 + cep, 147], sonrisa: t > sitio - 1.4 });
  // la arqueóloga entra con la bolsa numerada y la deja en la mesa
  const u = tramo(t, 0.3, 2.9), xa = Math.round(lerp(-18, 102, u));
  const ra = R.actor(A.arqueologa, xa, 160, t, { dir: 1, anda: u > 0 && u < 1, sostiene: t < deja, dedo: t > deja + 0.3, habla: t > deja + 0.3 && Math.sin(t * 7) > 0 });
  // el cámara de la productora entra por la derecha y graba
  const v = tramo(t, camara - 0.8, camara + 0.9), xc = Math.round(lerp(336, 190, v));
  const rc = R.actor(A.espectador, xc, 160, t, { dir: -1, anda: v > 0 && v < 1, sostiene: [xc - 3, 138] });
  T.desiertoDelante(R, t, { encuadre: 'carpa' });
  // encima del tablero: el cartucho sucio, el pincel, el polvo y la bolsa
  PZ.cartucho(R, 134, 153, { color: 'naranja', icono: 'foso' });
  for (let k = 0; k < 9; k++) { const x = 129 + Math.round(H(k, 1) * 10), y = 140 + Math.round(H(k, 2) * 12); if (H(k, 3) > Math.min(0.9, tramo(t, 0.5, P2) * 0.9)) R.pset(x, y, hex('#8a6a4a')); }
  const [mx, my] = rb.mano; R.linea(mx - 1, my, mx - 7, my + 2, hex('#8a5a2e')); R.rect(mx - 10, my + 1, mx - 7, my + 3, hex('#e8d8b0')); R.pset(mx - 10, my + 3, K);
  for (let k = 0; k < 5; k++) { const f = (t * 1.3 + k * 0.21) % 1; R.pset(140 + Math.round(Math.sin(k * 3 + t) * 4), 146 - Math.round(f * 14), mez(hex('#d8b47a'), BLANCO, f * 0.5)); }
  if (t < deja) bolsa(ra.mano[0] + 3, ra.mano[1] - 4); else bolsa(118, 141);
  camaraTV(rc.mano[0], rc.mano[1], -1, t);
};

// ── 2 · la pared de la fosa, con sus capas y la cuadrícula ──────────────────────────────────────
const CAPAS = [[40, '#c8a46a', '#a8844a', '#e4c890'], [56, '#7a5e42', '#54402c', '#a08260'], [72, '#cec6b4', '#8e887a', '#efe9da'],
  [87, '#5e4632', '#40301f', '#806248'], [118, '#d4bc8c', '#b49c6c', '#ecdcb0'], [133, '#9a9a96', '#6a6a66', '#bcbcb6']].map(([y, ...c]) => [y, ...c.map(hex)]);
const bordeCapa = (k, x) => CAPAS[k][0] + Math.round(Math.sin(x * 0.045 + k * 1.7) * 2 + Math.sin(x * 0.13 + k) * 1.2);
const ETQ = [[48, '1'], [64, '2'], [79, '3'], [102, '4'], [125, '5'], [141, '6']];
const zanja = fijo(() => {
  cieloT(0, 0, 319, 30, AZULES);
  // la sierra a lo lejos y el llano
  for (let x = 0; x < 320; x++) { const s = 25 - Math.round(Math.sin(x * 0.03) * 2 + Math.sin(x * 0.11 + 1) * 1.5 + (x > 150 && x < 230 ? 1.5 : 0)); for (let y = s; y < 33; y++) R.pset(x, y, y < s + 2 ? hex('#a08292') : H(x, y) < 0.2 ? hex('#7a5e72') : hex('#8a6e80')); }
  for (let y = 31; y < 41; y++) for (let x = 0; x < 320; x++) R.pset(x, y, R.tone4([hex('#c09868'), hex('#d8b47a'), hex('#e8cc98')], 1 + Math.sin(x * 0.2 + y) * 0.5 + (H(x, y) - 0.5), x, y));
  for (let k = 0; k < 14; k++) { const x = 8 + k * 23 + Math.round(H(k, 9) * 8); R.rect(x, 33, x + 3, 34, hex('#7a8a4a')); R.pset(x + 1, 32, hex('#9aaa5a')); }
  // la pared: seis capas con sus texturas
  for (let x = 0; x < 320; x++) for (let y = 39; y < 150; y++) {
    let k = 0; for (let j = 0; j < CAPAS.length; j++) if (y >= bordeCapa(j, x)) k = j;
    if (y < bordeCapa(0, x)) continue;
    const [, b, s, l] = CAPAS[k], n = H(x, y), bord = y === bordeCapa(k, x);
    let c = bord ? s : n < 0.18 ? s : n > 0.86 ? l : b;
    if (k === 1 && H(x >> 1, y >> 1) > 0.9) c = [hex('#b8bcc8'), hex('#f0ece0'), hex('#4a8a4a'), hex('#c84a3a'), hex('#e0c040')][Math.floor(H(x >> 1, (y >> 1) + 7) * 5)];
    if (k === 2) c = (y + Math.round(Math.sin(x * 0.07) * 1.5)) % 3 === 0 ? s : (H(x >> 3, y) > 0.8 ? hex('#b8b0a0') : l);
    if (k === 2 && (x % 11 === 3) && (y % 3 === 1)) c = hex('#5a5650');
    if (k === 4 && H(x, y + 3) > 0.96) c = hex('#8a7a62');
    if (k === 5) { if (H(x >> 1, y >> 1) > 0.88) c = hex('#c8c4b8'); if (Math.abs(Math.sin(x * 0.07 + y * 0.02) * 10 - (y - 140)) < 0.6) c = hex('#4a4a48'); }
    R.pset(x, y, c);
  }
  // en la capa de las cajas: cajas aplastadas y cartuchos; en la de los periódicos, periódicos doblados que asoman
  for (let i = 0; i < 15; i++) { const x = 12 + i * 21 + Math.round(H(i, 4) * 8), y = 110 + Math.round(H(i, 5) * 5); if (x > 70 && x < 112) continue; PZ.cajaCartucho(R, x, y, { color: ['rojo', 'azul', 'verde', 'naranja', 'morado', 'amarillo'][i % 6], icono: ['foso', 'nave', 'flor'][i % 3] }); }
  for (let i = 0; i < 9; i++) { const x = 20 + i * 36; if (x > 66 && x < 116) continue; { const x = 20 + i * 36 + Math.round(H(i, 6) * 6); PZ.cartucho(R, x, 117, { color: ['naranja', 'gris', 'rojo'][i % 3], icono: 'foso' }); } }
  for (let i = 0; i < 7; i++) { const x = 6 + i * 46 + Math.round(H(i, 8) * 10), y = 74 + Math.round(H(i, 9) * 4); R.rect(x, y, x + 15, y + 8, hex('#8e887a')); R.rect(x + 1, y + 1, x + 14, y + 7, hex('#efe9da')); R.rect(x + 2, y + 2, x + 13, y + 2, hex('#3a3a40')); for (let r = 4; r < 7; r++) R.rect(x + 2, y + r, x + 12 - (r % 2) * 4, y + r, hex('#9a968c')); }
  // las latas y botellas de la capa de basura
  for (let i = 0; i < 10; i++) { const x = 10 + i * 32 + Math.round(H(i, 11) * 10), y = 61 + Math.round(H(i, 12) * 6); R.rect(x, y, x + 4, y + 6, hex('#3a3a40')); R.rect(x + 1, y + 1, x + 3, y + 5, i % 2 ? hex('#c84a3a') : hex('#b8bcc8')); R.pset(x + 1, y + 1, BLANCO); }
  // la cuadrícula: cuerdas blancas de estaca a estaca y la línea de nivel
  for (const x of [64, 128, 192, 256]) { R.rect(x - 1, 30, x + 1, 42, hex('#8a5a2e')); R.rect(x - 1, 30, x - 1, 42, hex('#b8834a')); for (let y = 41; y < 150; y++) { R.pset(x, y, hex('#f4f0e4')); R.pset(x + 1, y, mez(R.pget(x + 1, y), NEGRO, 0.35)); } }
  for (let x = 0; x < 320; x++) { const y = 95 + Math.round(Math.sin((x % 64) / 64 * Math.PI) * 1.5); R.pset(x, y, hex('#f4f0e4')); R.pset(x, y + 1, mez(R.pget(x, y + 1), NEGRO, 0.35)); }
  // la regla de escala apoyada en la pared
  for (let k = 0; k < 8; k++) R.rect(290, 92 + k * 7, 293, 98 + k * 7, k % 2 ? hex('#f4f0e4') : hex('#c83a3a')); R.rect(289, 92, 289, 149, K);
  // el suelo de la fosa: tierra apisonada, huellas, el cubo de herramientas y la criba
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const n = H(x, y); R.pset(x, y, y === 150 ? hex('#5a4630') : n < 0.15 ? hex('#7a6044') : n > 0.9 ? hex('#b89a70') : (x + y * 2) % 23 === 0 ? hex('#6a5038') : hex('#9a7c56')); }
  for (let k = 0; k < 12; k++) { const x = 20 + k * 25 + Math.round(H(k, 13) * 9), y = 158 + Math.round(H(k, 14) * 16); R.rect(x, y, x + 3, y + 1, hex('#6a5038')); R.rect(x + 1, y + 3, x + 3, y + 3, hex('#6a5038')); }
  R.rect(22, 160, 38, 176, K); R.rect(23, 161, 37, 175, hex('#2a6ac8')); R.rect(23, 161, 37, 162, hex('#5a9ae8')); R.rect(24, 158, 36, 160, hex('#8a6a4a')); R.linea(26, 156, 30, 150, hex('#8a5a2e')); R.linea(33, 157, 36, 151, hex('#c8ccd8'));
  R.rect(250, 158, 284, 160, hex('#8a5a2e')); R.rect(250, 150, 252, 172, hex('#5e3a1c')); R.rect(282, 150, 284, 172, hex('#5e3a1c'));
  for (let x = 253; x < 282; x++) for (let y = 151; y < 158; y++) R.pset(x, y, (x + y) % 2 ? hex('#8a8a96') : hex('#5a5a66'));
  for (let k = 0; k < 6; k++) PZ.cartucho(R, 258 + k * 4, 157, { color: 'gris' });
  // el tablón sobre dos borriquetas
  R.rect(70, 130, 140, 134, K); R.rect(71, 131, 139, 133, hex('#b8834a')); R.rect(71, 131, 139, 131, hex('#d8a86a'));
  for (const x of [76, 132]) { R.linea(x - 4, 156, x, 134, K); R.linea(x + 4, 156, x, 134, K); R.linea(x - 3, 156, x, 135, hex('#8a5a2e')); R.linea(x + 3, 156, x, 135, hex('#8a5a2e')); }
});
const p2 = (t) => {
  zanja();
  // nubes de tres tonos a tres velocidades por encima de la sierra, y dos pájaros
  for (const [x0, y, w, v] of [[30, 16, 16, 1.4], [150, 13, 12, 2.4], [230, 18, 14, 3.6]]) { const x = ((x0 + t * v) % 360) - 20; if (x < 262 || x > 340) R.nube(x, y, w); }
  ave(Math.round(80 + t * 6) % 300, 22, t); ave(Math.round(96 + t * 6) % 300, 24, t, 2);
  // las cintas de las estacas que ondean
  for (const x of [64, 128, 192, 256]) for (let i = 0; i < 6; i++) R.pset(x + 2 + i, 31 + Math.round(Math.sin(t * 8 + i * 0.9 + x) * (i / 3)), hex('#ff5aa0'));
  // la excavadora pequeña y el público asomado al borde de arriba
  R.rect(14, 24, 30, 30, hex('#e0b030')); R.rect(16, 30, 32, 32, K); const br = Math.sin(t * 1.2) * 0.5 + 0.5; R.linea(28, 24, 38, Math.round(18 + br * 6), hex('#c89a20')); R.linea(38, Math.round(18 + br * 6), 44, Math.round(24 + br * 8), hex('#c89a20'));
  for (let k = 0; k < 7; k++) { const x = 156 + k * 13, y = 28 + Math.round(Math.sin(t * 2 + k) * 0.6); R.rect(x, y, x + 4, y + 3, hex(['#3a2a1a', '#8a5a2a', '#1a1a1a', '#d8b860'][k % 4])); R.rect(x, y + 4, x + 4, y + 7, hex(['#d84a3a', '#3a9a6a', '#e8c040', '#2a6ac8', '#8a5ab8'][k % 5])); }
  // el cubo que sube por la cuerda
  const cu = (t * 0.22) % 1, cy = Math.round(150 - cu * 112); R.linea(160, 30, 160, cy - 6, hex('#d8c8a0')); R.rect(156, cy - 6, 164, cy, K); R.rect(157, cy - 5, 163, cy - 1, hex('#e07a2a')); R.rect(157, cy - 6, 163, cy - 6, hex('#8a6a4a'));
  // la arqueóloga, en el tablón, limpia un cartucho de la pared
  const lim = tramo(t, P2 + 0.3, sitio);
  PZ.cartucho(R, 88, 119, { s: 2, color: 'naranja', icono: 'foso' });
  for (let k = 0; k < 60; k++) if (H(k, 21) > lim) { const x = 77 + Math.round(H(k, 22) * 21), y = 90 + Math.round(H(k, 23) * 28); R.rect(x, y, x + 1, y + 1, hex(H(k, 24) > 0.5 ? '#5e4632' : '#40301f')); }
  const cep = Math.round(Math.sin(t * 12) * 2), ra = R.actor(A.arqueologa, 104, 130, t, { dir: -1, sostiene: t < sitio + 0.5 ? [98, 108 + cep] : true, sonrisa: t > sitio });
  if (t < sitio + 0.5) { const [mx, my] = ra.mano; R.linea(mx, my, mx - 5, my - 1, hex('#8a5a2e')); R.rect(mx - 8, my - 2, mx - 5, my, hex('#e8d8b0')); }
  for (let k = 0; k < 6; k++) { const f = (t * 1.6 + k * 0.17) % 1; if (t < sitio + 0.6) R.pset(90 + Math.round(H(k, 31) * 8), 112 + Math.round(f * 18), hex('#a8844a')); }
  if (t > sitio && t < sitio + 0.9) for (const [dx, dy] of [[-15, -14], [15, -12], [-16, 4], [16, 6], [0, -19]]) { R.pset(88 + dx, 104 + dy, hex('#fff6c0')); R.pset(88 + dx + 1, 104 + dy, hex('#e8c040')); R.pset(88 + dx - 1, 104 + dy, hex('#e8c040')); R.pset(88 + dx, 104 + dy + 1, hex('#e8c040')); R.pset(88 + dx, 104 + dy - 1, hex('#e8c040')); }
  // el arqueólogo pone una etiqueta numerada en cada capa
  const yo = capa - 0.9;
  const rb = R.actor(A.arqueologo, 206, 172, t, { dir: 1, dedo: t > yo && t < yo + 2.4, sostiene: t < yo || t > yo + 2.4, sonrisa: t > yo + 2.4 });
  if (t < yo || t > yo + 2.4) { const [mx, my] = rb.mano; R.rect(mx - 1, my - 7, mx + 6, my + 1, K); R.rect(mx, my - 6, mx + 5, my, hex('#f0ece0')); R.rect(mx + 1, my - 7, mx + 4, my - 7, hex('#c8ccd8')); for (let r = 0; r < 3; r++) R.rect(mx + 1, my - 4 + r * 2, mx + 4, my - 4 + r * 2, hex('#8a8a96')); }
  ETQ.forEach(([y, n], i) => {
    const e = tramo(t, yo + i * 0.38, yo + i * 0.38 + 0.22); if (e <= 0) return;
    const x = 232, s = e < 1 ? 1 : 0; R.pset(x + 4, y - 6, hex('#5a5a66'));
    R.rect(x - 1 - s, y - 5 - s, x + 9 + s, y + 5 + s, K); R.rect(x - s, y - 4 - s, x + 8 + s, y + 4 + s, hex('#fffbe8'));
    R.numero(n, x + 4, y + 4, { centro: true, fina: true, color: hex('#c83a3a'), sombra: false });
  });
};

// ── 3 · la mesa de cerca: la lupa sobre la fecha del periódico y sobre el cartucho ──────────────────────────
const lupa = (cx, cy, t, dentro) => {
  R.disco(cx, cy, 13, K); R.disco(cx, cy, 12, hex('#c8a040')); R.disco(cx, cy, 10, K);
  dentro(cx, cy);
  for (let y = -9; y <= 9; y++) for (let x = -9; x <= 9; x++) { const d = Math.hypot(x, y); if (d <= 9.5 && x + y < -10 && d > 7) R.pset(cx + x, cy + y, mez(R.pget(cx + x, cy + y), BLANCO, 0.5)); }
  R.pset(cx - 5, cy - 6, BLANCO); R.pset(cx - 6, cy - 5, BLANCO);
};
const p3 = (t) => {
  T.desierto(R, t, { encuadre: 'carpa', camara: 'mesa' });
  // la arqueóloga, detrás de la mesa, mira y asiente
  const guarda = []; for (let y = 70; y <= 81; y++) for (let x = 230; x <= 256; x++) guarda.push(R.pget(x, y));
  R.actor(A.arqueologa, 236, 80, t, { dir: -1, habla: t > cajas && Math.sin(t * 7) > 0, sonrisa: t > cajas + 0.3, dedo: t > fechas + 0.3 && t < cajas - 0.4 });
  { let i = 0; for (let y = 70; y <= 81; y++) for (let x = 230; x <= 256; x++) R.pset(x, y, guarda[i++]); }
  // la lupa entra desde abajo, se para en la fecha y luego va al cartucho
  const ent = tramo(t, P3 + 0.1, fechas), va = tramo(t, cajas - 0.7, cajas + 0.1);
  const fx = 202, fy = 92, cxL = 250, cyL = 112;
  const lx = Math.round(lerp(lerp(60, fx, ent), cxL, va) + Math.sin(t * 2.3) * 1.2), ly = Math.round(lerp(lerp(200, fy, ent), cyL, va) + Math.cos(t * 1.9));
  lupa(lx, ly, t, (cx, cy) => {
    for (let y = -9; y <= 9; y++) for (let x = -9; x <= 9; x++) if (Math.hypot(x, y) <= 9.5) R.pset(cx + x, cy + y, mez(R.pget(cx + Math.round(x / 2), cy + Math.round(y / 2)), hex('#fff8e0'), 0.12));
    if (va < 0.5 && ent > 0.9) R.numero('83', cx, cy + 4, { centro: true, color: hex('#2a2a36'), sombra: false });
  });
  // el mango y la mano canónica
  const hx = lx + 9, hy = ly + 9; R.linea(lx + 8, ly + 8, hx + 6, hy + 6, K); R.linea(lx + 9, ly + 8, hx + 7, hy + 6, hex('#8a5a2e'));
  T.brazo(R, Math.min(330, hx + 70), 200, hx + 5, hy + 8, '#5a7a4a', -1, { codo: [hx + 40, hy + 40] });
  if (t > fechas && t < fechas + 0.8 && va === 0) for (const [dx, dy] of [[-16, -6], [16, -8], [-15, 8], [15, 9]]) R.pset(fx + dx, fy + dy, hex('#fff6c0'));
};

// ── 4 · los periódicos colgados por fechas y la bolsa del cartucho ──────────────────────────────────
const PAPELES = [[78, '3.83'], [104, '6.83'], [130, '8.83'], [156, '9.83'], [182, '10.83'], [208, '11.83']];
const cuerdaY = (x) => 118 + Math.round(Math.sin(Math.max(0, Math.min(1, (x - 64) / 196)) * Math.PI) * 4);
const carpaDentro = fijo(() => {
  // la lona: paños con costuras, pliegues y el techo inclinado
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) {
    const pl = Math.sin(x * 0.11 + Math.sin(y * 0.04) * 1.5) * 0.5 + 0.5, techo = y < 26;
    let v = (techo ? 0.6 : 1.6) + pl * 0.9 + (y > 110 ? -0.4 : 0) - (x > 266 && y < 48 ? pl * 0.6 : 0);
    R.pset(x, y, R.tone4([hex('#a89470'), hex('#c8b890'), hex('#e0d2ae'), hex('#f0e6c8')], v, x, y));
  }
  for (let x = 0; x < 320; x++) { R.pset(x, 26, hex('#8a7a58')); R.pset(x, 27, hex('#b8a880')); }
  for (const x of [44, 114, 184, 254]) for (let y = 28; y < 128; y++) { R.pset(x, y, hex('#a89470')); if (y % 6 < 2) R.pset(x + 1, y, hex('#8a7a58')); }
  // el faldón enrollado y la ventana a la excavación (x 196–262, y 40–92)
  R.recorte([196, 40, 262, 92]);
  for (let y = 40; y <= 92; y++) for (let x = 196; x <= 262; x++) R.pset(x, y, y < 68 ? R.tone4(AZULES, (y - 40) / 28 * 4, x, y) : y < 74 ? (y < 70 - Math.round(Math.sin(x * 0.1) * 2) ? hex('#8a6e80') : hex('#a08292')) : R.tone4([hex('#c09868'), hex('#d8b47a'), hex('#e8cc98')], 1 + Math.sin(x * 0.3) * 0.6, x, y));
  for (let y = 80; y < 93; y++) for (let x = 200; x < 246; x++) if (y > 84 - Math.round(Math.sin((x - 200) / 46 * Math.PI) * 6)) R.pset(x, y, H(x, y) < 0.3 ? hex('#8a6a4a') : hex('#a8844a'));
  R.recorte(null);
  R.rect(194, 38, 264, 40, hex('#8a7a58')); R.rect(194, 92, 264, 94, hex('#8a7a58')); R.rect(192, 32, 266, 38, hex('#c8b890')); for (let x = 194; x < 266; x += 4) R.pset(x, 35, hex('#a89470')); R.rect(192, 37, 266, 38, hex('#8a7a58'));
  for (const x of [204, 254]) R.rect(x, 30, x + 1, 40, hex('#8a5a2e'));
  // el suelo de lona azul con costuras, arena y ojales
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const n = H(x, y), ar = Math.sin(x * 0.05 + y * 0.2) + Math.sin(x * 0.13) > 1.2; R.pset(x, y, y === 128 ? hex('#1e3a6a') : ar && n < 0.6 ? (n < 0.3 ? hex('#d8b47a') : hex('#a8b4b0')) : n < 0.12 ? hex('#2a4e8a') : (y - 128) % 26 === 0 ? hex('#2a4e8a') : hex('#3a64a8')); }
  for (let x = 10; x < 320; x += 30) R.rect(x, 130, x + 1, 131, hex('#c8ccd8'));
  // a la izquierda, cajas de plástico numeradas con cajas de cartuchos, la criba y la pala apoyadas
  for (const [x, y, c, n] of [[4, 132, '#2a6ac8', '14'], [4, 112, '#d84a3a', '15'], [34, 132, '#3a9a4a', '16'], [34, 112, '#e8c040', '17']]) {
    R.rect(x, y - 20, x + 28, y, K); R.rect(x + 1, y - 19, x + 27, y - 1, hex(c)); R.rect(x + 1, y - 19, x + 27, y - 18, mez(hex(c), BLANCO, 0.4)); R.rect(x + 3, y - 8, x + 25, y - 7, mez(hex(c), NEGRO, 0.35));
    R.rect(x + 8, y - 15, x + 20, y - 11, BLANCO); R.numero(n, x + 14, y - 11, { centro: true, fina: true, color: K, sombra: false });
  }
  for (let k = 0; k < 4; k++) PZ.cajaCartucho(R, 10 + k * 12, 92, { color: ['naranja', 'azul', 'rojo', 'verde'][k], icono: 'foso' });
  R.disco(70, 116, 13, K); R.disco(70, 116, 12, hex('#8a5a2e')); for (let y = -10; y <= 10; y++) for (let x = -10; x <= 10; x++) if (Math.hypot(x, y) < 10.5) R.pset(70 + x, 116 + y, (x + y) % 2 ? hex('#8a8a96') : hex('#3a3a44'));
  PZ.pala(R, 60, 140, {});
  // a la derecha, la nevera y el termo
  R.rect(270, 140, 312, 168, K); R.rect(271, 141, 311, 167, hex('#d84a3a')); R.rect(271, 141, 311, 146, BLANCO); R.rect(286, 138, 296, 140, K); R.rect(271, 160, 311, 167, mez(hex('#d84a3a'), NEGRO, 0.3));
  R.rect(248, 148, 256, 168, K); R.rect(249, 149, 255, 167, hex('#3a9a6a')); R.rect(249, 149, 255, 152, hex('#c8ccd8'));
  // la pizarra con el corte de la fosa (las seis capas, la cuadrícula y sus números) en su caballete
  for (const [x0, x1] of [[78, 70], [170, 178]]) R.linea(x0, 98, x1, 128, K);
  R.rect(68, 32, 182, 100, K); R.rect(69, 33, 181, 99, hex('#c8ccd8')); R.rect(71, 35, 179, 97, hex('#f8f8f2'));
  CAPAS.forEach(([, b, s2, l], k) => { const y0 = 40 + k * 9; for (let y = y0; y < y0 + 9; y++) for (let x = 86; x < 172; x++) R.pset(x, y, y === y0 ? s2 : (x + y) % 5 === 0 ? l : b); R.numero(String(k + 1), 79, y0 + 8, { centro: true, fina: true, color: hex('#2a2a36'), sombra: false }); });
  for (let x = 86; x < 172; x += 14) R.rect(x, 40, x, 93, hex('#f4f0e4'));
  R.rect(140, 59, 152, 66, hex('#efe9da')); R.rect(141, 61, 151, 61, hex('#3a3a40')); PZ.cartucho(R, 120, 74, { color: 'naranja' });
  R.rect(72, 98, 178, 99, hex('#8a8a96')); R.rect(150, 96, 160, 97, hex('#2a6ac8'));
  // la mesa plegable bajo la ventana, con el termo y la cámara
  R.rect(198, 100, 264, 103, K); R.rect(199, 100, 263, 101, hex('#d8d4cc')); for (const x of [202, 258]) R.linea(x, 104, x + (x < 230 ? 6 : -6), 128, K);
  R.rect(246, 86, 252, 100, K); R.rect(247, 87, 251, 99, hex('#3a9a6a')); R.rect(247, 87, 251, 89, hex('#c8ccd8'));
  R.rect(254, 92, 263, 99, K); R.rect(255, 93, 262, 98, hex('#3a3a46')); R.disco(258, 95, 2, hex('#6a8ab0'));
  // los dos postes de la cuerda
  for (const x of [62, 262]) { R.rect(x, 104, x + 3, 170, K); R.rect(x + 1, 105, x + 2, 169, hex('#8a5a2e')); R.rect(x - 3, 168, x + 6, 171, K); }
  for (let x = 64; x <= 262; x++) R.pset(x, cuerdaY(x), hex('#f4f0e4'));
});
const periodico = (x, y, fecha, t, k) => {
  const sw = Math.round(Math.sin(t * 1.7 + k) * 1.2);
  R.rect(x - 11 + sw, y, x + 11 + sw, y + 27, hex('#8e887a')); R.rect(x - 10 + sw, y + 1, x + 10 + sw, y + 26, hex('#efe6cc'));
  R.rect(x - 9 + sw, y + 3, x + 9 + sw, y + 4, hex('#2a2a36')); R.rect(x - 9 + sw, y + 14, x - 1 + sw, y + 21, hex('#8a8a96')); R.rect(x - 8 + sw, y + 18, x - 2 + sw, y + 21, hex('#d8b47a'));
  for (let r = 0; r < 4; r++) R.rect(x + 1 + sw, y + 14 + r * 2, x + 9 + sw, y + 14 + r * 2, hex('#aaa496'));
  R.rect(x - 10 + sw, y + 6, x + 10 + sw, y + 12, hex('#fffbe8')); R.numero(fecha, x + sw, y + 12, { centro: true, fina: true, color: hex('#c83a3a'), sombra: false });
  R.rect(x - 1, y - 3, x + 1, y + 2, hex('#b8834a'));
};
const p4 = (t) => {
  carpaDentro();
  // la vida: la excavadora lejos, por la ventana; las bombillas que se mecen; el ventilador
  R.recorte([196, 40, 262, 92]); const br = Math.sin(t * 1.3) * 0.5 + 0.5; R.rect(222, 70, 238, 76, hex('#e0b030')); R.rect(220, 76, 240, 79, K); R.linea(236, 70, 248, Math.round(62 + br * 6), hex('#c89a20')); R.linea(248, Math.round(62 + br * 6), 254, Math.round(70 + br * 8), hex('#c89a20'));
  R.nube(((t * 3) % 100) + 186, 50, 12); R.recorte(null);
  for (let k = 0; k < 7; k++) { const x = 16 + k * 38, sw = Math.round(Math.sin(t * 1.5 + k) * 1), y = 30 + Math.round(Math.sin(k / 6 * Math.PI) * 5); R.linea(x - 19, y - 2, x, y, K); R.rect(x - 1 + sw, y + 1, x + 1 + sw, y + 4, hex('#fff0a0')); R.pset(x + sw, y + 5, hex('#ffffff')); if (Math.sin(t * 13 + k * 5) > 0.97) R.pset(x + sw, y + 3, hex('#c8a040')); }
  const fa = t * 14; R.disco(290, 126, 8, K); R.disco(290, 126, 7, hex('#c8ccd8')); for (let k = 0; k < 3; k++) R.linea(290, 126, 290 + Math.round(Math.cos(fa + k * 2.1) * 6), 126 + Math.round(Math.sin(fa + k * 2.1) * 6), hex('#5a5a66')); R.rect(289, 134, 291, 140, K);
  // el portátil de la mesa, con su gráfica que cambia
  R.rect(206, 86, 236, 100, K); R.rect(207, 87, 235, 96, hex('#1e2c3e')); R.rect(204, 97, 238, 100, hex('#8a8a96'));
  for (let x = 209; x < 234; x++) R.pset(x, 94 - Math.round((Math.sin(x * 0.5 + t * 2) * 0.5 + 0.5) * 5), hex('#5adc5a'));
  // los periódicos colgados por fechas
  PAPELES.forEach(([x, f], k) => periodico(x, cuerdaY(x) + 2, f, t, k));
  // la arqueóloga cruza con la bolsa del cartucho y la cuelga al final, junto al de noviembre
  const u = tramo(t, P4 + 0.1, confirma + 0.2), xa = Math.round(lerp(40, 222, u));
  const cuelga = t > cartuchos;
  const ra = R.actor(A.arqueologa, xa, 170, t, { dir: 1, anda: u > 0 && u < 1, sostiene: cuelga ? false : u >= 1 ? [238, 146] : true, sonrisa: cuelga, brazos: t > tarde83 + 0.2 && t < tarde83 + 1.4 });
  const bx = 238, by = cuerdaY(bx) + 6;
  if (cuelga) { R.linea(bx, cuerdaY(bx), bx, by, hex('#c8a040')); R.rect(bx - 1, cuerdaY(bx) - 2, bx + 1, cuerdaY(bx) + 2, hex('#b8834a')); }
  const [mx, my] = ra.mano, gx = cuelga ? bx : mx + 2, gy = cuelga ? by : my - 12;
  R.rect(gx - 6, gy, gx + 6, gy + 16, K); R.rect(gx - 5, gy + 1, gx + 5, gy + 15, hex('#dce8ec')); R.rect(gx - 5, gy + 1, gx + 5, gy + 2, hex('#d8443a'));
  PZ.cartucho(R, gx, gy + 15, { color: 'naranja', icono: 'foso' }); R.pset(gx + 4, gy + 4, BLANCO);
  // el arqueólogo compara con su tablilla y celebra
  const rb = R.actor(A.arqueologo, 150, 172, t, { dir: 1, sostiene: t < confirma, dedo: t > confirma && t < tarde83, brazos: t > tarde83 + 0.1 && t < tarde83 + 1.5, salto: t > tarde83 + 0.1 && t < tarde83 + 0.6 ? Math.round(Math.sin(tramo(t, tarde83 + 0.1, tarde83 + 0.6) * Math.PI) * 4) : 0, sonrisa: t > tarde83 });
  if (t < confirma) { const [hx, hy] = rb.mano; R.rect(hx - 1, hy - 7, hx + 6, hy + 1, K); R.rect(hx, hy - 6, hx + 5, hy, hex('#f0ece0')); for (let r = 0; r < 3; r++) R.rect(hx + 1, hy - 4 + r * 2, hx + 4, hy - 4 + r * 2, hex('#8a8a96')); }
  // «1983» con el visto bueno
  const e = tramo(t, tarde83, tarde83 + 0.3);
  if (e > 0) {
    const y = Math.round(lerp(52, 80, e)); R.rect(72, y - 21, 180, y + 5, K); R.rect(73, y - 20, 179, y + 4, hex('#fffbe8')); R.rect(73, y - 20, 179, y - 19, hex('#e8c040'));
    R.numero('1983', 114, y, { tam: 16, centro: true }); if (e >= 1) T.visto(R, 152, y - 14, 2);
  }
};

const efectos = [[camara + 0.7, 'bip'], [deja, 'papel'], [sitio, 'brillo'], [capa - 0.9, 'golpecito'], [fechas, 'toc'], [cajas + 0.1, 'toc'], [cartuchos, 'papel'], [tarde83, 'sello']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2014 });
''')

E['at-heller'] = ('Heller', '''// AT-HELLER (frase 23), 2014 (el plano 2, 1983). Cuatro planos:
// 1. la excavación de 2014: Heller, ya mayor, llega a la valla y habla a la reportera y a las cámaras; flash en su
//    nombre; señala hacia la fosa en «burial»;
// 2. corta en «said»: 1983, el cemento cae sobre las cajas; un marcador baja de 5,000,000 («millones») a 728,000
//    («728,000»); en «not millions», la cifra de la leyenda cae tachada;
// 3. corta en «and that ET»: el hangar con las mesas de cartuchos ordenados (unos 1.300); los naranjas, los del juego,
//    se encienden («only a part»); el marcador de la pared cuenta hasta 1,300 y la arqueóloga coloca los últimos;
// 4. corta en «some went»: la pantalla del ordenador: un museo recibe un cartucho, la subasta en línea sube y el mazo
//    golpea (el gato salta: gag), y las monedas van al pueblo, que se ilumina («the city»).''', COMUN + r'''
const h = (f) => en('heller', f);
const P2 = h(0.2099), P3 = h(0.471), P4 = h(0.7487);
const nombre = h(0.091), entierro = h(0.176), n728 = h(0.239), noMill = h(0.42), et = h(0.486), parte = h(0.577), n1300 = h(0.629), recup = h(0.701);
const museos = h(0.776), subasta = h(0.85), online = h(0.877), dinero = h(0.928), ciudad = h(0.977);

// ── 1 · la excavación: Heller ante las cámaras ─────────────────────────────────────────────────
const p1 = (t) => {
  T.desierto(R, t, { encuadre: 'excavacion14' });
  const u = tramo(t, 0.2, 1.9), xh = Math.round(lerp(270, 198, u));
  R.actor(A.heller, xh, 160, t, { dir: -1, anda: u > 0 && u < 1, habla: t > 1.9 && Math.sin(t * 8) > -0.2, dedo: t > entierro - 0.4 && t < entierro + 0.9, sonrisa: t < 1.9 });
  const rr = R.actor(EL.periodista2000, 166, 160, t, { dir: 1, sostiene: [182, 143 + Math.round(Math.sin(t * 1.3))], sonrisa: true });
  const [mx, my] = rr.mano; R.rect(mx, my - 1, mx + 5, my, K); R.rect(mx + 5, my - 3, mx + 8, my + 1, K); R.rect(mx + 6, my - 2, mx + 7, my, hex('#8a8a96')); R.rect(mx + 1, my - 2, mx + 3, my - 1, hex('#d84a3a'));
  const rf = R.actor(A.espectadora, 238, 160, t, { dir: -1, sostiene: [228, 141] });
  const [fx, fy] = rf.mano; R.rect(fx - 5, fy - 5, fx + 2, fy, K); R.rect(fx - 4, fy - 4, fx + 1, fy - 1, hex('#3a3a46')); R.rect(fx - 6, fy - 4, fx - 5, fy - 2, K); R.pset(fx - 1, fy - 6, hex('#c8ccd8'));
  T.desiertoDelante(R, t, { encuadre: 'excavacion14' });
  for (const [fl, x, y] of [[nombre, fx - 4, fy - 6], [nombre + 1.3, fx - 4, fy - 6]]) if (t > fl && t < fl + 0.22) { R.disco(x, y, 5, hex('#fffbe0')); for (let i = 3; i < 11; i++) { R.pset(x - i, y, BLANCO); R.pset(x + i, y, BLANCO); R.pset(x, y - i, BLANCO); R.pset(x, y + i, BLANCO); } }
};

// ── 2 · 1983: el cemento y el marcador que baja ────────────────────────────────────────────────────
const fmt = (n) => n.toLocaleString('en-US');
const marcador = (x0, y0, x1, y1) => {
  R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, K); R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, hex('#c8a040')); R.rect(x0, y0, x1, y1, hex('#141a2e'));
  for (let x = x0 + 1; x < x1; x++) for (let y = y0 + 1; y < y1; y++) if ((x + y) % 4 === 0) R.pset(x, y, hex('#1c2440'));
  for (const [x, y] of [[x0 + 2, y0 + 2], [x1 - 2, y0 + 2], [x0 + 2, y1 - 2], [x1 - 2, y1 - 2]]) R.pset(x, y, hex('#f0d880'));
};
const p2 = (t) => {
  T.desierto(R, t, { encuadre: 'vertedero83', camara: 'cemento', cemento: tramo(t, P2 - 0.2, P3 + 0.3) });
  // el marcador colgado de la grúa: «5,000,000» (la leyenda) que baja a «728,000»
  const cae = tramo(t, n728, n728 + 1.3), v = Math.round(lerp(5000000, 728000, cae) / 1000) * 1000;
  const sw = Math.round(Math.sin(t * 1.4) * 1.5);
  R.linea(120 + sw, 14, 120 + sw, 20, K); R.linea(240 + sw, 14, 240 + sw, 20, K);
  marcador(96 + sw, 20, 264 + sw, 46);
  R.numero(fmt(v), 180 + sw, 42, { tam: 16, centro: true, rampa: cae >= 1 ? undefined : undefined });
  if (cae > 0 && cae < 1) for (let k = 0; k < 4; k++) R.pset(110 + sw + k * 44, 24 + ((t * 40 + k * 7) % 18), hex('#5adc5a'));
  // en «not millions» la cifra de la leyenda cae, tachada
  const ta = tramo(t, noMill - 0.2, noMill + 0.3);
  if (ta > 0) {
    const y = Math.round(lerp(44, 74, ta)), x0 = 128; R.rect(x0, y - 13, x0 + 104, y + 5, K); R.rect(x0 + 1, y - 12, x0 + 103, y + 4, hex('#efe6cc')); R.rect(x0 + 1, y - 12, x0 + 103, y - 11, hex('#c8a040'));
    R.numero('5,000,000', x0 + 52, y + 1, { centro: true, color: hex('#3a3640'), sombra: false });
    if (t > noMill + 0.3) for (let k = 0; k <= 1; k++) R.linea(x0 + 4, y - 3 + k, x0 + 100, y - 4 + k, hex('#d8303a'));
    if (t > noMill + 0.3) R.icono('X', x0 + 106, y - 10, hex('#ff3a3a'), K, 2);
  }
};

// ── 3 · el hangar con las mesas de cartuchos ordenados ─────────────────────────────────────────────
const COLS = ['naranja', 'rojo', 'azul', 'verde', 'morado', 'amarillo', 'gris', 'turquesa'];
const ETIQ = { naranja: '#e07a2a', rojo: '#d84a3a', azul: '#3a6ac8', verde: '#3a9a4a', morado: '#8a5ab8', amarillo: '#e8c040', gris: '#9a9aa6', turquesa: '#3ab8b0' };
const colorDe = (i, j) => { const n = H(i, j + 40); return n < 0.22 ? 'naranja' : COLS[1 + Math.floor(H(i, j + 41) * 7)]; };
const hangar = fijo(() => {
  // el techo con las cerchas (las cerchas no pasan por la esquina de Atom)
  for (let y = 0; y < 24; y++) for (let x = 0; x < 320; x++) R.pset(x, y, R.tone4([hex('#1e222c'), hex('#2a2e3a'), hex('#363c4a')], 0.6 + y / 24 * 1.4, x, y));
  for (let x = 0; x < 268; x++) { R.pset(x, 15, hex('#5a6070')); R.pset(x, 23, hex('#5a6070')); const z = x % 16; R.pset(x, 15 + Math.round(z < 8 ? z : 16 - z), hex('#4a5060')); }
  // la pared de chapa ondulada
  for (let y = 24; y < 104; y++) for (let x = 0; x < 320; x++) { const r = x % 6, n = H(x, y); let c = r === 0 ? hex('#6a7888') : r < 3 ? hex('#a8b4c0') : r === 3 ? hex('#8a98a8') : hex('#98a6b4'); if (y === 62 || y === 63) c = hex('#6a7888'); if (n > 0.985) c = hex('#b88a5a'); if (x > 270 && y < 50) c = r === 0 ? hex('#7a8898') : hex('#94a2b0'); R.pset(x, y, c); }
  for (let x = 3; x < 320; x += 12) { R.pset(x, 26, hex('#d8e0e8')); R.pset(x, 60, hex('#d8e0e8')); R.pset(x, 65, hex('#d8e0e8')); }
  // el portón abierto al desierto (x 214–270, y 44–104)
  R.recorte([214, 44, 270, 103]);
  for (let y = 44; y < 104; y++) for (let x = 214; x <= 270; x++) R.pset(x, y, y < 72 ? R.tone4(AZULES, (y - 44) / 28 * 4, x, y) : y < 80 ? (y < 76 - Math.round(Math.sin(x * 0.12) * 3) ? hex('#a08292') : hex('#c0a090')) : R.tone4([hex('#c09868'), hex('#d8b47a'), hex('#e8cc98')], 1 + Math.sin(x * 0.4 + y) * 0.5, x, y));
  R.recorte(null);
  R.rect(210, 36, 274, 44, K); for (let y = 37; y < 44; y++) R.rect(211, y, 273, y, y % 2 ? hex('#8a98a8') : hex('#6a7888')); R.rect(210, 44, 213, 104, hex('#4a5464')); R.rect(271, 44, 274, 104, hex('#4a5464'));
  // a la izquierda, la estantería con cajas numeradas; el extintor; el reloj
  R.rect(6, 34, 62, 104, K); for (const y of [56, 80, 102]) R.rect(7, y, 61, y + 1, hex('#e07a2a'));
  for (let s = 0; s < 3; s++) for (let k = 0; k < 3; k++) { const x = 9 + k * 18, y = 36 + s * 24, c = ['#2a6ac8', '#d84a3a', '#3a9a4a', '#e8c040'][(s + k) % 4]; R.rect(x, y + 4, x + 15, y + 19, K); R.rect(x + 1, y + 5, x + 14, y + 18, hex(c)); R.rect(x + 1, y + 5, x + 14, y + 6, mez(hex(c), BLANCO, 0.4)); R.rect(x + 4, y + 10, x + 11, y + 14, BLANCO); R.numero(String(20 + s * 3 + k), x + 8, y + 14, { centro: true, fina: true, color: K, sombra: false }); }
  R.rect(70, 74, 76, 94, K); R.rect(71, 76, 75, 93, hex('#d8303a')); R.rect(72, 72, 74, 75, K); R.pset(72, 77, hex('#ff8a8a'));
  // el suelo de hormigón pulido, juntas, manchas y la línea amarilla
  for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) { const n = H(x, y); let c = n < 0.1 ? hex('#7a7e86') : n > 0.94 ? hex('#b4b8c0') : hex('#969aa2'); if ((x - 160) * (y - 90) % 900 === 0 || (y - 104) % 19 === 0) c = hex('#80848c'); if (Math.hypot(x - 80, (y - 116) * 2.2) < 26 || Math.hypot(x - 160, (y - 116) * 2.2) < 26) c = mez(c, BLANCO, 0.18); if (y === 176 || y === 177) c = (x >> 3) % 2 ? hex('#e8c040') : hex('#2a2a30'); R.pset(x, y, c); }
  for (const [x, y, r] of [[40, 172, 7], [250, 140, 5]]) for (let j = -r; j <= r; j++) for (let i = -2 * r; i <= 2 * r; i++) if (Math.hypot(i / 2, j) < r && H(x + i, y + j) < 0.6) R.pset(x + i, y + j, hex('#7a7c82'));
  // la mesa del fondo, con dos filas de cartuchos
  mesaCart(14, 206, 98, 104, 2, 0);
});
// una mesa vista desde arriba con su rejilla de cartuchos (x0–x1, tablero y0–y1, filas)
function mesaCart(x0, x1, y0, y1, filas, id, t = 0, opts = {}) {
  R.rect(x0, y0 - 1, x1, y1 + 3, K); R.rect(x0 + 1, y0, x1 - 1, y1, hex('#e8e4dc')); R.rect(x0 + 1, y1 + 1, x1 - 1, y1 + 2, hex('#a8a49c'));
  for (const x of [x0 + 4, x1 - 6]) { R.rect(x, y1 + 3, x + 2, y1 + 3 + (y1 - y0) + 8, K); R.rect(x + 1, y1 + 3, x + 1, y1 + 3 + (y1 - y0) + 7, hex('#8a8e96')); }
  const n = Math.floor((x1 - x0 - 6) / 6), dy = (y1 - y0) / filas;
  for (let j = 0; j < filas; j++) for (let i = 0; i < n; i++) {
    const idx = j * n + i; if (opts.lleno != null && idx >= opts.lleno) continue;
    const x = x0 + 4 + i * 6, y = Math.round(y0 + 1 + j * dy), c = colorDe(i + id * 97, j), base = hex(ETIQ[c]);
    const brilla = c === 'naranja' && opts.realza > 0 && Math.sin(t * 9 + i) > -0.3;
    const ap = opts.realza > 0 && c !== 'naranja';
    R.rect(x, y, x + 4, y + Math.max(2, Math.round(dy) - 2), ap ? hex('#5a5a62') : K); R.rect(x + 1, y, x + 3, y + 1, brilla ? hex('#fff0a0') : ap ? mez(base, hex('#9a9aa2'), 0.6) : base);
    if (brilla) { R.rect(x - 1, y - 1, x + 5, y - 1, hex('#ffd060')); }
  }
}
const p3 = (t) => {
  hangar();
  // fuera, por el portón: la excavadora lejos y el operario que pasa con la carretilla
  R.recorte([214, 44, 270, 103]);
  const br = Math.sin(t * 1.1) * 0.5 + 0.5; R.rect(246, 74, 262, 80, hex('#e0b030')); R.rect(244, 80, 264, 83, K); R.linea(248, 74, 238, Math.round(68 + br * 6), hex('#c89a20')); R.linea(238, Math.round(68 + br * 6), 232, Math.round(74 + br * 8), hex('#c89a20'));
  R.nube(((t * 4) % 90) + 200, 52, 12);
  const uo = tramo(t, P3, P4 - 0.3), xo = Math.round(lerp(284, 196, uo)); R.actor(A.operario, xo, 102, t, { dir: -1, anda: uo > 0 && uo < 1 }); R.rect(xo - 10, 92, xo - 2, 100, hex('#3a6ac8')); R.rect(xo - 10, 100, xo - 2, 101, K);
  R.recorte(null);
  // los fluorescentes y el reloj
  for (const x of [60, 140]) { R.linea(x, 14, x, 26, K); R.linea(x + 40, 14, x + 40, 26, K); R.rect(x - 2, 26, x + 42, 29, K); R.rect(x - 1, 27, x + 41, 28, Math.sin(t * 23 + x) > 0.93 ? hex('#c8d8e0') : hex('#f4fbff')); }
  R.disco(186, 40, 7, K); R.disco(186, 40, 6, BLANCO); R.linea(186, 40, 186 + Math.round(Math.cos(t * 0.5) * 4), 40 + Math.round(Math.sin(t * 0.5) * 4), K); R.linea(186, 40, 186 + Math.round(Math.cos(t * 6) * 5), 40 + Math.round(Math.sin(t * 6) * 5), hex('#d8303a'));
  // el marcador de la pared: cuenta hasta 1,300
  const cu = tramo(t, n1300 - 0.2, n1300 + 0.7), cnt = Math.round(cu * 1300 / 10) * 10;
  marcador(92, 34, 168, 56); if (cu > 0) R.numero(fmt(cnt), 130, 53, { tam: 16, centro: true, color: cu >= 1 ? undefined : hex('#5adc5a') }); else for (let k = 0; k < 4; k++) if (Math.sin(t * 4) > 0) R.rect(104 + k * 16, 44, 114 + k * 16, 46, hex('#3a5a3a'));
  // detrás de la mesa del medio: el arqueólogo cuenta los cartuchos
  const ua = tramo(t, P3 + 0.3, P4 - 0.4), xa = Math.round(lerp(40, 170, ua));
  R.actor(A.arqueologo, xa, 134, t, { dir: 1, anda: Math.sin(t * 2.2) > 0.2 && ua < 1, dedo: true, habla: t > et && t < parte + 0.4 && Math.sin(t * 8) > 0 });
  mesaCart(6, 230, 120, 132, 3, 1, t, { realza: t > et + 0.2 && t < parte + 1 });
  // detrás de la mesa de delante: la arqueóloga trae una caja de cartuchos y coloca los últimos
  const ub = tramo(t, P3 + 0.2, n1300 - 0.4), xb = Math.round(lerp(-18, 150, ub)), pon = t > n1300 - 0.4;
  const rb = R.actor(A.arqueologa, xb, 160, t, { dir: 1, anda: ub > 0 && ub < 1, sostiene: pon ? [xb + 18, 148 + Math.round(Math.abs(Math.sin(t * 6)) * 3)] : true, sonrisa: t > recup });
  const n = Math.floor((318 - 0 - 6) / 6), total = n * 4, lleno = Math.round(total - 22 + tramo(t, n1300 - 0.3, recup) * 22);
  mesaCart(0, 318, 150, 166, 4, 2, t, { realza: t > et + 0.2 && t < parte + 1, lleno });
  const [mx, my] = rb.mano; if (!pon) { R.rect(mx - 6, my - 8, mx + 6, my, K); R.rect(mx - 5, my - 7, mx + 5, my - 1, hex('#c8a06a')); for (let k = 0; k < 4; k++) R.rect(mx - 4 + k * 3, my - 9, mx - 3 + k * 3, my - 7, hex(ETIQ[COLS[k]])); }
  else { R.rect(mx - 1, my - 3, mx + 3, my, K); R.rect(mx, my - 3, mx + 2, my - 2, hex(ETIQ.naranja)); }
};

// ── 4 · la pantalla: el museo, la subasta y el dinero para el pueblo ──────────────────────────────────
const SC = [68, 28, 212, 100];
const despacho = fijo(() => {
  // la pared de noche, con un papel de rayas tenues (la esquina de Atom, lisa)
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) { const r = x % 14; R.pset(x, y, x > 266 && y < 50 ? hex('#2a2e46') : r === 0 ? hex('#22263c') : r < 7 ? hex('#2e3250') : hex('#2a2e48')); }
  for (let x = 0; x < 320; x++) { R.pset(x, 112, hex('#4a3a2a')); R.pset(x, 113, hex('#6a5038')); }
  // la ventana al pueblo de noche (x 8–58, y 26–90)
  R.rect(6, 24, 60, 92, K); R.rect(7, 25, 59, 91, hex('#8a6a4a'));
  R.recorte([9, 27, 57, 89]); cieloT(9, 27, 57, 89, ['#0e1230', '#16204a', '#1e2c5e', '#2a3a70'].map(hex)); R.disco(46, 38, 5, hex('#f4f0d8')); R.disco(48, 37, 4, hex('#16204a')); R.recorte(null);
  R.rect(32, 25, 33, 91, hex('#8a6a4a')); R.rect(7, 57, 59, 58, hex('#8a6a4a'));
  // la balda con cajas de juegos y el cuadro del desierto
  R.rect(214, 44, 266, 46, hex('#8a5a2e')); R.rect(214, 46, 266, 47, K);
  for (let k = 0; k < 4; k++) PZ.cajaCartucho(R, 224 + k * 13, 44, { color: ['naranja', 'azul', 'rojo', 'verde'][k], icono: ['foso', 'nave', 'flor', 'foso'][k] });
  R.rect(222, 56, 264, 88, K); R.rect(223, 57, 263, 87, hex('#c8a040')); R.recorte([225, 59, 261, 85]); cieloT(225, 59, 261, 74, AZULES); for (let y = 70; y < 86; y++) for (let x = 225; x < 262; x++) R.pset(x, y, y < 74 - Math.round(Math.sin(x * 0.2) * 2) ? hex('#a08292') : hex('#d8b47a')); R.recorte(null);
  // la mesa de madera con vetas
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.3 + x * 0.01) * 2); R.pset(x, y, y < 120 ? hex('#3a2416') : y > 172 ? hex('#4a2e1a') : v > 0.85 ? hex('#5e3a22') : v < -0.7 ? hex('#a06a3a') : hex('#8a5a32')); }
  // el monitor
  R.rect(116, 108, 164, 118, K); R.rect(117, 109, 163, 116, hex('#2a2a30')); R.rect(134, 100, 146, 109, K); R.rect(135, 100, 145, 108, hex('#3a3a44'));
  R.rect(60, 20, 220, 106, K); R.rect(61, 21, 219, 105, hex('#26262c')); R.rect(61, 21, 219, 21, hex('#4a4a56')); R.pset(140, 103, hex('#5adc5a'));
  // el teclado, la libreta con notas, el bote de lápices
  R.rect(84, 124, 198, 138, K); R.rect(85, 125, 197, 137, hex('#3a3a44')); for (let j = 0; j < 4; j++) for (let i = 0; i < 18; i++) R.rect(87 + i * 6, 126 + j * 3, 90 + i * 6, 127 + j * 3, (i + j) % 7 === 0 ? hex('#6a6a78') : hex('#8a8a98'));
  R.rect(210, 150, 246, 170, K); R.rect(211, 151, 245, 169, hex('#f0e6b0')); for (let r = 0; r < 5; r++) R.rect(214, 154 + r * 3, 240 - (r % 2) * 8, 154 + r * 3, hex('#8ab0d8'));
  R.rect(14, 122, 26, 140, K); R.rect(15, 123, 25, 139, hex('#3a6ac8')); for (const [x, c] of [[17, '#d84a3a'], [20, '#e8c040'], [23, '#3a9a4a']]) R.rect(x, 114 + (x % 3) * 2, x + 1, 123, hex(c));
  R.rect(228, 128, 262, 146, K); R.rect(229, 129, 261, 145, hex('#2a3a5a'));
});
const pantalla = (t) => {
  R.recorte(SC);
  R.rect(68, 28, 212, 100, hex('#f4f4f0')); R.rect(68, 28, 212, 35, hex('#c8ccd8')); for (const [x, c] of [[72, '#d84a3a'], [77, '#e8c040'], [82, '#3a9a4a']]) R.disco(x, 31, 1, hex(c)); R.rect(92, 30, 200, 33, BLANCO); R.rect(94, 31, 130, 32, hex('#a8acb8'));
  if (t < subasta - 0.3) {
    // el museo que recibe un cartucho
    R.rect(68, 36, 212, 100, hex('#e8f0f8'));
    const mx = 120; R.poligono([[mx - 30, 56], [mx, 42], [mx + 30, 56]], hex('#8a8a96')); R.rect(mx - 30, 56, mx + 30, 58, hex('#6a6a78'));
    for (let k = 0; k < 5; k++) R.rect(mx - 26 + k * 13, 60, mx - 22 + k * 13, 86, hex('#a8acb8')); R.rect(mx - 32, 86, mx + 32, 90, hex('#6a6a78'));
    const ab = tramo(t, museos - 0.3, museos + 0.2); R.rect(mx - 6, 70, mx + 6, 86, mez(hex('#3a3a44'), hex('#fff0a0'), ab));
    const u = tramo(t, P4 + 0.3, museos), cx = Math.round(lerp(196, mx, u)); if (u < 1) { R.rect(cx - 9, 72, cx + 9, 86, K); R.rect(cx - 8, 73, cx + 8, 85, hex('#c8a06a')); PZ.cartucho(R, cx, 82, { color: 'naranja', icono: 'foso' }); }
    if (ab > 0) for (const [dx, dy] of [[-16, -4], [16, -6], [0, -14]]) R.pset(mx + dx, 64 + dy, hex('#e8c040'));
  } else if (t < dinero) {
    // la subasta: la foto del cartucho sucio y la puja que sube
    R.rect(74, 40, 128, 96, K); R.rect(75, 41, 127, 95, hex('#d8b47a')); PZ.cartucho(R, 101, 90, { s: 3, color: 'naranja', icono: 'foso' });
    for (let k = 0; k < 40; k++) R.pset(85 + Math.round(H(k, 1) * 32), 47 + Math.round(H(k, 2) * 44), hex(H(k, 3) > 0.5 ? '#8a6a4a' : '#5e4632'));
    const p = Math.round(lerp(100, 1537, tramo(t, subasta - 0.2, online + 0.3)));
    R.numero('$' + p, 170, 66, { tam: 16, centro: true });
    for (let k = 0; k < 3; k++) if (Math.sin(t * 6 - k) > 0) R.poligono([[146 + k * 20, 82], [151 + k * 20, 76], [156 + k * 20, 82]], hex('#3a9a4a'));
    // el mazo que golpea en «online»
    const g = t < online ? -0.8 : t < online + 0.15 ? lerp(-0.8, 0.3, tramo(t, online, online + 0.15)) : 0.3 - tramo(t, online + 0.15, online + 0.6) * 1.1;
    const px = 190, py = 92, hx = px + Math.round(Math.cos(g - 1.2) * 14), hy = py + Math.round(Math.sin(g - 1.2) * 14);
    R.rect(180, 92, 204, 96, hex('#5e3a1c')); R.linea(px + 6, py + 2, hx, hy, hex('#8a5a2e')); R.rect(hx - 4, hy - 3, hx + 4, hy + 3, K); R.rect(hx - 3, hy - 2, hx + 3, hy + 2, hex('#a06a3a'));
    if (t > online && t < online + 0.3) for (const [dx, dy] of [[-10, -4], [10, -4], [-6, -8], [6, -8]]) R.pset(px + dx, py + dy, hex('#e8c040'));
  } else {
    // el dinero que va al pueblo
    R.rect(68, 36, 212, 100, hex('#1e2c5e'));
    const luz = tramo(t, ciudad - 0.3, ciudad + 0.2);
    for (let k = 0; k < 6; k++) { const x = 150 + k * 9, hh = 10 + (k % 3) * 5; R.rect(x, 92 - hh, x + 7, 92, hex('#3a3e5a')); for (let j = 0; j < hh - 4; j += 4) R.rect(x + 2, 92 - hh + 2 + j, x + 3, 92 - hh + 3 + j, mez(hex('#2a2e46'), hex('#ffd860'), H(k, j) < 0.3 + luz * 0.7 ? 1 : 0)); }
    R.rect(196, 58, 206, 66, hex('#8a8a96')); R.rect(200, 66, 202, 92, hex('#6a6a78')); R.rect(68, 92, 212, 100, hex('#2a3a2a'));
    for (let k = 0; k < 5; k++) { const f = ((t - dinero) * 0.9 + k * 0.2) % 1, x = Math.round(lerp(80, 176, f)), y = Math.round(lerp(50, 70, f) - Math.sin(f * Math.PI) * 14); R.disco(x, y, 4, K); R.disco(x, y, 3, hex('#e8c040')); R.pset(x - 1, y - 1, hex('#fff0a0')); }
  }
  R.recorte(null);
};
// el gato gris atigrado que duerme hecho una bola en la mesa (despierto: las orejas tiesas, los ojos abiertos)
const gato = (x, y, t, despierto) => {
  const G = hex('#8a8a96'), g = hex('#5a5a66'), L = hex('#c8c8d0');
  for (let j = 0; j < 9; j++) for (let i = 0; i < 22; i++) { const d = Math.hypot((i - 11) / 11, (j - 5) / 5); if (d < 1) R.pset(x + i, y - 9 + j, d > 0.86 ? K : (i % 5 === 0 && j < 6) ? g : j < 2 ? L : G); }
  const cy = y - (despierto ? 14 : 8), cx = x + 2 + (despierto ? 0 : 0); R.disco(cx + 3, cy + 3, 5, K); R.disco(cx + 3, cy + 3, 4, G); R.pset(cx + 1, cy, L);
  R.poligono([[cx - 1, cy], [cx + 1, cy - 5 - (despierto ? 2 : 0)], [cx + 3, cy - 1]], K); R.poligono([[cx + 4, cy - 1], [cx + 6, cy - 5 - (despierto ? 2 : 0)], [cx + 8, cy]], K);
  R.pset(cx + 1, cy - 2, hex('#e0a0a0')); R.pset(cx + 6, cy - 2, hex('#e0a0a0'));
  if (despierto) { R.pset(cx + 1, cy + 3, hex('#e8e040')); R.pset(cx + 5, cy + 3, hex('#e8e040')); R.pset(cx + 1, cy + 4, K); R.pset(cx + 5, cy + 4, K); }
  else { R.linea(cx, cy + 3, cx + 2, cy + 3, K); R.linea(cx + 4, cy + 3, cx + 6, cy + 3, K); }
  const tl = Math.round(Math.sin(t * 2) * 2); R.linea(x + 21, y - 3, x + 26, y - 6 + tl, K); R.linea(x + 21, y - 4, x + 25, y - 7 + tl, G);
};
const p4 = (t) => {
  despacho();
  // la vida: estrellas y el pueblo que se ilumina por la ventana; el vapor de la taza
  R.recorte([9, 27, 57, 89]);
  for (let k = 0; k < 10; k++) if (Math.sin(t * 2 + k * 1.7) > -0.2) R.pset(11 + Math.round(H(k, 5) * 44), 29 + Math.round(H(k, 6) * 22), hex('#f4f0d8'));
  const luz = tramo(t, ciudad - 0.3, ciudad + 0.2);
  for (let k = 0; k < 6; k++) { const x = 10 + k * 8, hh = 8 + (k % 3) * 6; R.rect(x, 89 - hh, x + 6, 89, hex('#141830')); for (let j = 2; j < hh - 2; j += 4) R.pset(x + 2 + (j % 3), 89 - hh + j, H(k, j) < 0.35 + luz * 0.6 ? hex('#ffd860') : hex('#1e2440')); }
  R.rect(44, 62, 50, 68, hex('#8a8a96')); R.rect(46, 68, 47, 89, hex('#6a6a78'));
  R.recorte(null);
  R.rect(40, 124, 54, 140, K); R.rect(41, 125, 53, 139, hex('#e8e4dc')); R.rect(54, 128, 57, 135, K); R.rect(41, 125, 53, 127, hex('#5e3a22'));
  for (let k = 0; k < 4; k++) { const f = (t * 0.6 + k * 0.25) % 1; R.pset(46 + Math.round(Math.sin(f * 7 + k) * 2), 122 - Math.round(f * 16), mez(hex('#2a2e48'), hex('#c8ccd8'), 1 - f)); }
  pantalla(t);
  // el ratón y la mano canónica que pulsa en «online»
  const cl = t > online - 0.05 && t < online + 0.15 ? 1 : 0, mxr = 244 + Math.round(Math.sin(t * 0.9) * 3);
  R.rect(mxr - 10, 134 + cl, mxr - 2, 144, K); R.rect(mxr - 9, 135 + cl, mxr - 3, 143, hex('#d8d8e0')); R.rect(mxr - 6, 135 + cl, mxr - 6, 138, K);
  T.brazo(R, 340, 186, mxr, 140 + cl, '#3a5a8a', -1, { codo: [300, 176] });
  // el gato que dormía en la mesa salta con el mazo (gag)
  const sa = tramo(t, online + 0.05, online + 0.35) - tramo(t, online + 0.6, online + 1.0);
  gato(282, 162 - Math.round(sa * 14), t, sa > 0.05);
  if (sa > 0.3) R.icono('!', 292, 128 - Math.round(sa * 14), hex('#e8c040'), K, 2);
};

const año = (t) => t >= P2 && t < P3 ? 1983 : 2014;
const efectos = [[nombre, 'flash'], [entierro, 'whoosh'], [n728, 'tic'], [noMill + 0.3, 'boing'], [et, 'brillo'], [n1300 - 0.2, 'bip'], [recup, 'toc'], [museos, 'brillo'], [online, 'golpecito'], [online + 0.3, 'miau'], [ciudad, 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

E['at-documental'] = ('Documental', '''// AT-DOCUMENTAL (frase 24), 2014 y hoy. Tres planos:
// 1. el estreno del documental: se abre el telón de la pantalla («premiered»), el presentador lo anuncia y se va; en la
//    pantalla la excavadora en el desierto y el cartucho en la arena; en «Game Over» el muñequito del juego cae en el
//    foso (el hilo de gags) y el público aplaude;
// 2. corta en «and one of»: el museo: la vitrina central está a oscuras; en «collection» el conservador enciende su foco;
//    una niña y su padre llegan y la niña señala el cartucho («Smithsonian»);
// 3. corta en «The game»: la vitrina de cerca: un visitante saca el móvil; en «worst» su pantalla enseña una X roja; en
//    «museum piece» hace la foto con flash y el cartucho brilla bajo su foco.''', COMUN + r'''
const d = (f) => en('documental', f);
const P2 = d(0.2896), P3 = d(0.7193);
const estreno = d(0.037), gameOver = d(0.226), coleccion = d(0.457), smith = d(0.509), gran = d(0.582), peor = d(0.811), pieza = d(0.937);

// ── 1 · el estreno ───────────────────────────────────────────────────────────────────────────
const SCR = [64, 22, 236, 94];
const sala = fijo(() => {
  // la pared acolchada (rombos) y el techo oscuro
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) { const q = ((x + y) % 16 === 0 || (x - y + 320) % 16 === 0); let c = y < 16 ? hex('#140e1a') : q ? hex('#24182c') : hex('#2e2038'); if (x > 266 && y < 48) c = hex('#1a1220'); if ((x + y) % 16 === 8 && (x - y + 320) % 16 === 8) c = hex('#4a3458'); R.pset(x, y, c); }
  // los apliques con su abanico de luz
  for (const x of [44, 276]) { if (x > 266) continue; R.rect(x - 3, 52, x + 3, 58, hex('#c8a040')); for (let j = 0; j < 30; j++) for (let i = -j; i <= j; i++) if (((x + i + j) & 1) === 0 && H(x + i, j) < 0.5) R.pset(x + i, 50 - j, mez(R.pget(x + i, 50 - j), hex('#f0c070'), 0.18 * (1 - j / 30))); }
  // los cortinajes de los lados (el derecho empieza debajo de la esquina de Atom)
  const cortina = (x0, x1, y0) => { for (let y = y0; y < 128; y++) for (let x = x0; x < x1; x++) { const f = Math.sin((x - x0) * 0.55) * 0.5 + 0.5; R.pset(x, y, R.tone4([hex('#4a0e18'), hex('#7a1a28'), hex('#a8283a'), hex('#c8404e')], 0.4 + f * 2.4, x, y)); } };
  cortina(0, 40, 0); cortina(262, 320, 52); R.rect(262, 48, 320, 52, hex('#c8a040')); R.rect(262, 52, 320, 53, hex('#7a5a18'));
  // la salida: un pictograma verde sin letras
  R.rect(286, 60, 304, 70, K); R.rect(287, 61, 303, 69, hex('#2aa85a')); R.rect(293, 62, 295, 64, BLANCO); R.linea(294, 64, 292, 68, BLANCO); R.linea(294, 65, 298, 67, BLANCO); R.linea(294, 65, 290, 66, BLANCO);
  // el marco de la pantalla y la tarima con las candilejas
  R.rect(58, 16, 242, 100, K); R.rect(60, 18, 240, 98, hex('#3a3a44'));
  for (let y = 100; y < 112; y++) for (let x = 40; x < 262; x++) R.pset(x, y, y === 100 ? hex('#c8a040') : (x + Math.round(Math.sin(y) * 3)) % 9 === 0 ? hex('#5e3a1c') : hex('#7a4a24'));
  R.rect(40, 112, 262, 114, K);
  // el patio de butacas: el suelo oscuro y tres filas de respaldos rojos
  for (let y = 114; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x + y) % 5 === 0 ? hex('#1a1220') : hex('#221828'));
});
const FILAS = [[146, 19, 4], [170, 21, 13]];
const pantallaDoc = (t) => {
  const [x0, y0, x1, y1] = SCR; R.recorte(SCR);
  if (t < gameOver - 0.1) {
    // la excavadora en el desierto
    cieloT(x0, y0, x1, y0 + 34, AZULES);
    for (let x = x0; x <= x1; x++) { const s = y0 + 30 - Math.round(Math.sin(x * 0.04) * 3 + Math.sin(x * 0.13) * 1.5); for (let y = s; y <= y0 + 40; y++) R.pset(x, y, hex('#a08292')); for (let y = y0 + 40; y <= y1; y++) R.pset(x, y, R.tone4([hex('#c09868'), hex('#d8b47a'), hex('#e8cc98')], 1 + Math.sin(x * 0.2 + y * 0.5) * 0.6, x, y)); }
    R.nube(((t * 5) % 200) + 50, y0 + 10, 16);
    if (t < 2.6) { const br = Math.sin(t * 2) * 0.5 + 0.5; R.rect(170, 52, 200, 64, hex('#e0b030')); R.rect(186, 46, 198, 54, hex('#e0b030')); R.rect(188, 47, 196, 52, hex('#8ab0e0')); R.rect(166, 64, 204, 70, K); for (let i = 0; i < 6; i++) R.disco(170 + i * 6, 67, 2, hex('#5a5a66'));
      R.linea(172, 54, 146, Math.round(36 + br * 10), hex('#c89a20')); R.linea(173, 55, 147, Math.round(37 + br * 10), hex('#c89a20')); R.linea(146, Math.round(36 + br * 10), 132, Math.round(56 + br * 14), hex('#c89a20'));
      R.rect(124, Math.round(54 + br * 14), 136, Math.round(62 + br * 14), hex('#8a8a96'));
      for (let k = 0; k < 8; k++) R.pset(110 + k * 4 + Math.round(Math.sin(t * 3 + k) * 2), 80 + (k % 3), hex('#3a2a1a')); }
    else { PZ.cartucho(R, 150, 88, { s: 3, color: 'naranja', icono: 'foso' }); for (let k = 0; k < 30; k++) R.pset(134 + Math.round(H(k, 4) * 32), 50 + Math.round(H(k, 5) * 38), hex('#8a6a4a')); for (let y = 82; y < 95; y++) for (let x = 120; x < 182; x++) if (y > 86 + Math.sin(x * 0.2) * 2) R.pset(x, y, hex('#d8b47a')); }
  } else {
    // «Game Over»: el muñequito del juego cae en el foso
    R.rect(x0, y0, x1, y1, hex('#141428'));
    R.rect(x0, 76, x1, 94, hex('#3a9a4a')); R.rect(x0, 76, x1, 77, hex('#7adc5a')); R.rect(136, 76, 168, 94, NEGRO);
    for (let k = 0; k < 20; k++) R.pset(x0 + Math.round(H(k, 7) * 170), y0 + Math.round(H(k, 8) * 40), hex('#c8ccd8'));
    const c = tramo(t, gameOver, gameOver + 0.7), gx = Math.round(lerp(96, 147, Math.min(1, c * 1.5))), gy = Math.round(c < 0.66 ? 76 : lerp(76, 104, (c - 0.66) / 0.34));
    R.rect(gx - 1, gy - 15, gx + 9, gy, K); R.rect(gx, gy - 9, gx + 8, gy - 1, hex('#5adc5a')); R.rect(gx + 1, gy - 14, gx + 7, gy - 10, hex('#f0c090')); R.pset(gx + 5, gy - 12, K); R.rect(gx, gy - 15, gx + 8, gy - 14, hex('#3a2a1a'));
    if (c > 0.66) for (let k = 0; k < 3; k++) R.pset(gx + 2 + k * 2, gy - 18 - k, hex('#ffe060'));
  }
  R.recorte(null);
};
const p1 = (t) => {
  sala();
  pantallaDoc(t);
  // el telón de la pantalla se abre en «premiered»
  const ab = tramo(t, 0.4, estreno + 0.2), w = Math.round(lerp(88, 4, ab));
  for (const [xa, xb] of [[60, 60 + w], [240 - w, 240]]) for (let y = 18; y < 99; y++) for (let x = xa; x < xb; x++) { const f = Math.sin((x - xa) * 0.6) * 0.5 + 0.5; R.pset(x, y, R.tone4([hex('#4a0e18'), hex('#7a1a28'), hex('#a8283a'), hex('#c8404e')], 0.4 + f * 2.4, x, y)); }
  R.rect(56, 14, 244, 19, hex('#7a1a28')); for (let x = 56; x < 245; x += 6) R.rect(x, 19, x + 2, 21, hex('#c8a040'));
  // el haz del proyector, con motas
  for (let y = 22; y < 124; y += 1) { const f = (y - 22) / 102, xl = Math.round(lerp(70, 156, f)), xr = Math.round(lerp(230, 164, f)); for (let x = xl; x <= xr; x++) if (((x + y) & 1) === 0 && (x < 60 || x > 240 || y > 98)) R.pset(x, y, mez(R.pget(x, y), hex('#e8e0c8'), 0.12)); }
  for (let k = 0; k < 10; k++) { const f = (t * 0.08 + H(k, 1)) % 1, y = Math.round(100 + f * 22), x = Math.round(lerp(150, 170, H(k, 2)) + Math.sin(t + k) * 3); R.pset(x, y, hex('#fff6d8')); }
  // el presentador sale a la tarima, presenta y se va
  const ent = tramo(t, 0.1, 0.9), sal = tramo(t, estreno + 1.1, estreno + 2.3), xp = Math.round(lerp(lerp(30, 140, ent), -20, sal));
  if (xp > -18) R.actor(EL.periodista2000, xp, 110, t, { dir: sal > 0 ? -1 : 1, anda: (ent > 0 && ent < 1) || (sal > 0 && sal < 1), brazos: t > estreno - 0.1 && t < estreno + 1.0, sonrisa: true });
  // las candilejas
  for (let x = 48; x < 258; x += 14) { R.rect(x, 108, x + 3, 110, K); R.pset(x + 1, 107, Math.sin(t * 3 + x) > 0.6 ? hex('#fff0a0') : hex('#e8c040')); }
  // el público de espaldas: tres filas; aplauden en «Game Over»
  for (const [y, paso, off] of FILAS) {
    // el respaldo corrido de la fila
    R.rect(0, y - 1, 319, y + 1, K); R.rect(0, y + 2, 319, 179, hex('#3a0e18'));
    for (let x = -6 + off; x < 330; x += paso) {
      const k = Math.abs(Math.round(x * 7 + y)), hueco = k % 7 === 3;
      // la butaca
      R.rect(x - 2, y - 4, x + 14, y + 14, K); R.rect(x - 1, y - 3, x + 13, y + 14, hex('#8a1e2c')); R.rect(x - 1, y - 3, x + 13, y - 2, hex('#c8404e')); R.rect(x + 6, y - 3, x + 6, y + 14, hex('#5a0e18'));
      if (hueco) continue;
      // la cabeza de espaldas (pelo, orejas) y los hombros; a veces se vuelve a hablar con el de al lado
      const pelo = hex(['#3a2a1a', '#1a1a1a', '#8a5a2a', '#d8b860', '#5a3a24', '#b8b8c0'][k % 6]), ropa = hex(['#3a6ac8', '#3a9a4a', '#e07a2a', '#5a5a66', '#8a5ab8'][k % 5]);
      const gira = Math.sin(t * 0.8 + k) > 0.85 ? (k % 2 ? 1 : -1) : 0, bota = Math.round(Math.max(0, Math.sin(t * 1.3 + k)) * 0.6);
      R.rect(x, y - 6, x + 12, y + 2, K); R.rect(x + 1, y - 5, x + 11, y + 2, ropa); R.rect(x + 1, y - 5, x + 11, y - 5, mez(ropa, BLANCO, 0.3));
      R.disco(x + 6, y - 11 - bota, 6, K); R.disco(x + 6, y - 11 - bota, 5, pelo); R.pset(x + 4, y - 14 - bota, mez(pelo, BLANCO, 0.3));
      R.pset(x + 1, y - 10 - bota, hex('#e0a878')); R.pset(x + 11, y - 10 - bota, hex('#e0a878'));
      if (gira) { R.rect(x + 6 + gira * 3, y - 11 - bota, x + 6 + gira * 5, y - 8 - bota, hex('#f0c090')); R.pset(x + 6 + gira * 4, y - 10 - bota, K); }
      if (t > gameOver && t < gameOver + 1.8 && (Math.floor(t * 8) + k) % 2 === 0) { R.rect(x - 1, y - 16, x + 2, y - 12, hex('#f0c090')); R.rect(x + 10, y - 16, x + 13, y - 12, hex('#f0c090')); R.pset(x, y - 17, K); R.pset(x + 12, y - 17, K); }
    }
  }
};

// ── 2 · el museo: el foco se enciende sobre la vitrina ───────────────────────────────────────────────
const p2 = (t) => {
  T.hoy(R, t, { encuadre: 'museo', documental: t < gran ? 0 : 2 });
  // la vitrina a oscuras hasta que el conservador enciende su foco en «collection»
  const on = tramo(t, coleccion, coleccion + 0.25); if (on < 1) { oscurece(132, 84, 188, 157, 0.6 * (1 - on), hex('#0a0e1e')); for (let y = 12; y < 84; y++) { const w = Math.round(4 + (y - 12) * 0.26); oscurece(160 - w, y, 160 + w, y, 0.35 * (1 - on), hex('#1a2440')); } }
  if (t > coleccion && t < coleccion + 0.5) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; R.pset(160 + Math.round(Math.cos(a) * 16), 104 + Math.round(Math.sin(a) * 12), hex('#fff6c0')); }
  // el conservador entra con los guantes blancos, enciende el foco y presenta
  const u = tramo(t, P2 + 0.1, coleccion - 0.6), xc = Math.round(lerp(330, 196, u));
  R.actor(EL.tecnico, xc, 162, t, { dir: -1, anda: u > 0 && u < 1, dedo: t > coleccion - 0.5 && t < coleccion + 0.3, brazos: t > smith - 0.1 && t < smith + 1.2, sonrisa: t > coleccion });
  // la niña y su padre llegan por la izquierda; ella señala el cartucho
  const v = tramo(t, P2 + 0.6, smith - 0.3), xn = Math.round(lerp(-20, 112, v)), xpa = Math.round(lerp(-40, 88, v));
  R.actor(A.publico2014b, xpa, 164, t, { dir: 1, anda: v > 0 && v < 1, sonrisa: t > smith + 0.4, habla: t > gran && Math.sin(t * 7) > 0 });
  R.actor(EL.nina, xn, 166, t, { dir: 1, anda: v > 0 && v < 1, dedo: t > smith, sorpresa: t > smith && t < smith + 1.2, salto: t > smith && t < smith + 0.4 ? 2 : 0 });
  T.hoyDelante(R, t, { encuadre: 'museo' });
};

// ── 3 · la vitrina de cerca: la foto con el móvil ────────────────────────────────────────────────────
const p3 = (t) => {
  T.hoy(R, t, { encuadre: 'museo', camara: 'vitrina' });
  // el brillo del cartucho en «museum piece»
  const br = tramo(t, pieza, pieza + 0.3) - tramo(t, pieza + 1.2, pieza + 2);
  if (br > 0) for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + t, r = 34 + Math.sin(t * 5 + k) * 3; const x = 150 + Math.round(Math.cos(a) * r), y = 94 + Math.round(Math.sin(a) * r * 0.9); R.pset(x, y, hex('#fff6c0')); R.pset(x + 1, y, hex('#e8c040')); R.pset(x - 1, y, hex('#e8c040')); R.pset(x, y + 1, hex('#e8c040')); R.pset(x, y - 1, hex('#e8c040')); }
  // el móvil del visitante sube desde abajo a la derecha
  const sube = tramo(t, P3 + 0.2, peor - 0.4), mx = 250, my = Math.round(lerp(236, 150, sube) + Math.sin(t * 1.7));
  R.rect(mx - 15, my - 46, mx + 13, my + 2, K); R.rect(mx - 14, my - 45, mx + 12, my + 1, hex('#3a3a44')); R.rect(mx - 14, my - 45, mx + 12, my - 45, hex('#6a6a78'));
  const sx0 = mx - 12, sy0 = my - 42, sx1 = mx + 10, sy1 = my - 4; R.rect(sx0, sy0, sx1, sy1, hex('#1e2c5e'));
  R.recorte([sx0, sy0, sx1, sy1]);
  for (let y = sy0; y <= sy1; y++) for (let x = sx0; x <= sx1; x++) if (y > sy1 - 10) R.pset(x, y, hex('#d8b47a'));
  PZ.cartucho(R, mx - 1, sy1 - 4, { s: 2, color: 'naranja', icono: 'foso' });
  if (t > peor && t < pieza) R.icono('X', mx - 8, sy0 + 2, hex('#ff3a3a'), K, 2);
  if (t > pieza) for (const [dx, dy] of [[-8, 6], [6, 4], [-1, 2]]) { R.rect(mx + dx - 1, sy0 + dy, mx + dx + 1, sy0 + dy, hex('#e8c040')); R.rect(mx + dx, sy0 + dy - 1, mx + dx, sy0 + dy + 1, hex('#e8c040')); }
  R.recorte(null);
  T.brazo(R, 344, 214, mx + 6, my - 2, '#8a5ab8', -1, { codo: [300, 200] });
  // el flash
  const fl = tramo(t, pieza, pieza + 0.05) - tramo(t, pieza + 0.1, pieza + 0.35);
  if (fl > 0) { oscurece(0, 0, 319, 179, 0.5 * fl, hex('#ffffff')); R.disco(mx + 7, my - 42, 3, BLANCO); }
};

const año = (t) => t < P3 ? 2014 : 2026;
const efectos = [[0.45, 'whoosh'], [gameOver + 0.15, 'publico'], [coleccion, 'interruptor'], [smith, 'boing'], [peor, 'bip'], [pieza, 'flash']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')
