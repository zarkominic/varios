E = {}
E['vd-gancho'] = ('El gancho', '''// VD-GANCHO (frases 1–3), sin año en la infancia y 2026 en los planos de hoy. Diez planos:
// 1. de noche, el niño sube a la loma nevada frente al castillo y mira una luz roja entre las rocas; en «mother» la luz
//    estalla y él alarga la mano; un aldeano con farol baja del pueblo y se para a mirar; dos cuervos salen volando;
// 2. la tormenta: el padre cruza la nieve, que le llega a las rodillas, con el niño en brazos; tropieza en «knees»;
//    Atom de luciérnaga tirita junto a las rocas;
// 3. el pinar en la ventisca (fondo local): el padre avanza contra el viento, la bufanda le ondea; el niño esconde la
//    cara en «eyes» y el padre lo aprieta contra sí en «arms»; un búho en la rama;
// 4. la puerta del castillo: salen los soldados con antorchas y un perro; en «torches» las antorchas se avivan y en
//    «running» el primero señala hacia el monte;
// 5. la tormenta con las antorchas en la loma: el padre tiembla («shaking») y en «stops» se para y se vuelve;
// 6. el hueco entre las rocas, los dos AL DOBLE (el abrazo es la imagen central): el padre da el último paso, deja
//    al niño, se quita el abrigo («takes off his coat»), se arrodilla y lo envuelve despacio («wraps», «slowly»); el
//    vaho de los dos; baja una luz pálida y se sonríen;
// 7. el camino al amanecer (fondo local): el niño echa a andar y crece detrás de cada roca y cada pino: muchacho en
//    «Victor von Doom», joven en «everything that came after»;
// 8. la ciudad de Doom de noche: el ventanal se enciende y en «iron mask» Doom sale al balcón, oscuro contra la luz
//    verde, con la capa al viento (los vecinos se apartan); en «December 18th» Atom
//    levanta una hoja de calendario con el 18;
// 9. un cine: la cuenta atrás en la pantalla y en «face» la máscara de hierro (las palomitas de la fila de delante
//    saltan); en «Doomsday» se le encienden los ojos y su luz verde baña al público;
// 10. la sala del trono: Atom, al doble, sube por la alfombra hacia Doom y lo señala («his life»); en «from inside that mask» la máscara se cierra
//    sobre la pantalla y por sus rendijas se ve el campamento donde empezó todo.''', r'''
const g = (f) => en('giro', f), n = (f) => en('nieve', f), d = (f) => en('doom', f);
const P2 = n(0), P3 = n(0.2208), P4 = n(0.3873), P5 = n(0.6347), P6 = n(0.8041), P7 = d(0), P8 = d(0.2712), P9 = d(0.5281), P10 = d(0.7783);
const madre = g(0.8861), rodillas = n(0.1867), ojos = n(0.2737), brazosV = n(0.3375), antorchasV = n(0.498), corre = n(0.5998), tiembla = n(0.6904), para = n(0.7744);
const quita = n(0.8257), envuelve = n(0.8576), despacio = n(0.8933), mascaraV = d(0.3434), dieciocho = d(0.4646), cara = d(0.5984), doomsday = d(0.6975), vida = d(0.8456), dentro = d(0.9264);
const K = hex('#141018'), ease = (u) => u * u * (3 - 2 * u), voz = (t) => E.energia(t);
const H = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const mezcla = (c, d2, a) => { const r = c & 255, gg = (c >> 8) & 255, b = (c >> 16) & 255, r2 = d2 & 255, g2 = (d2 >> 8) & 255, b2 = (d2 >> 16) & 255;
  return (0xff000000 | (Math.round(b + (b2 - b) * a) << 16) | (Math.round(gg + (g2 - gg) * a) << 8) | Math.round(r + (r2 - r) * a)) >>> 0; };
// una luz que tiñe lo que hay alrededor (cx, cy), radio r, color col, fuerza a
const luz = (cx, cy, r, col, a) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const q = Math.hypot(i, j) / r; if (q >= 1) continue; const x = Math.round(cx + i), y = Math.round(cy + j); if (x < 0 || x > 319 || y < 0 || y > 179) continue; R.pset(x, y, mezcla(R.pget(x, y), col, a * (1 - q) * (1 - q))); } };
const NV = hex('#e8ecf4'), NVS = hex('#a8b4c8'), NVM = hex('#c8d2e2'), ABR = hex('#6a4a30'), ABRS = hex('#4e3420'), BUF = hex('#a8302a'), PIEL = hex('#e0b090');
// el niño en brazos del padre, en la mano (mx, my): el cuerpo con su abrigo pequeño, las piernas que cuelgan y la cabeza
// (tapado: la cara escondida en el pecho del padre, solo el pelo)
const nene = (mx, my, dir, tapado = false) => {
  const bx = mx - 3 * dir;
  R.disco(bx, my - 3, 4, K); R.rect(bx - 5, my - 5, bx + 5, my - 1, K);
  R.rect(bx - 4, my - 5, bx + 4, my - 2, ABR); R.rect(bx - 4, my - 2, bx + 4, my - 2, ABRS); R.pset(bx, my - 4, ABRS);
  const px = bx - 6 * dir; R.rect(Math.min(px, px + dir), my - 3, Math.max(px, px + dir), my + 2, K); R.pset(px, my - 2, hex('#3a3030')); R.pset(px + dir, my - 1, hex('#3a3030'));
  const hx = bx + 5 * dir, hy = my - 7; R.disco(hx, hy, 3, K); R.disco(hx, hy, 2, tapado ? hex('#1c1424') : PIEL);
  R.rect(hx - 2, hy - 3, hx + 2, hy - 1, hex('#1c1424')); if (!tapado) { R.pset(hx + dir, hy, K); R.pset(hx - 2 * dir, hy - 1, hex('#1c1424')); } else { R.pset(hx, hy - 1, hex('#3a3046')); }
};
// la nieve hasta las rodillas alrededor de quien camina (x es la esquina del sprite de 15 px) y su surco detrás
// (los colores salen de la nieve del propio decorado, unos píxeles más abajo: así el montón no es un recuadro blanco)
const hondo = (x, suelo, dir, t, surco = 0, alto = 7, col = 0) => {
  const base = col || R.pget(Math.round(x + 7), suelo + 4) || NVM, luzN = mezcla(base, hex('#ffffff'), 0.35), somb = mezcla(base, hex('#1a2238'), 0.25);
  for (let k = 1; k <= surco; k++) { const sx = Math.round(x + 7 - dir * (8 + k * 6)); R.rect(sx - 3, suelo - 1, sx + 3, suelo, somb); R.linea(sx - 3, suelo - 2, sx + 3, suelo - 2, luzN); }
  for (let i = -3; i <= 18; i++) { const top = suelo - alto + Math.round(Math.abs(i - 7) / 3) + (H(i + Math.floor(x), 3) > 0.7 ? 1 : 0), xx = Math.round(x + i);
    for (let y = top; y <= suelo + 1; y++) R.pset(xx, y, y === top ? luzN : y > suelo - 2 && (i < 0 || i > 15) ? somb : (H(xx, y) > 0.86 ? somb : base)); }
  for (let k = 0; k < 4; k++) { const f = (t * 1.6 + k / 4) % 1; R.pset(Math.round(x + 7 - dir * (6 + f * 16)), Math.round(suelo - alto - f * 6), f < 0.6 ? NV : NVM); }
};
// nube de tres tonos (sombra abajo, cuerpo, luz arriba) hecha de bolas; ok(x, y) dice dónde se puede pintar (el cielo)
const nube = (cx, cy, w, c0, c1, c2, ok) => {
  const bolas = [[0, 0, 0.3], [-0.34, 0.08, 0.22], [0.32, 0.06, 0.24], [-0.12, -0.14, 0.24], [0.14, -0.1, 0.2], [0.55, 0.12, 0.14], [-0.58, 0.14, 0.13]];
  for (const [dy, c, f] of [[1.5, c0, 1], [0, c1, 1], [-1.6, c2, 0.72]]) for (const [bx, by, br] of bolas) { const r = Math.max(1, Math.round(w * br * f)), X = Math.round(cx + bx * w - (c === c2 ? 1 : 0)), Y = Math.round(cy + by * w + dy);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && ok(X + i, Y + j)) R.pset(X + i, Y + j, c); }
};
// la bufanda roja de Werner que ondea al viento (cuello en cx, cy; el viento sopla hacia vx)
const bufanda = (cx, cy, vx, t) => { for (let k = 0; k < 9; k++) { const x = cx + vx * k, y = cy + Math.round(Math.sin(t * 14 - k * 0.9) * (k / 4)); R.pset(x, y, K); R.pset(x, y + 1, k % 3 ? BUF : hex('#7a1e1a')); R.pset(x, y + 2, K); } };
// una antorcha en la mano (mx, my): el palo, la llama que tiembla y su luz
const antorcha = (mx, my, t, k = 0, viva = 1) => {
  luz(mx, my - 9, 10 + Math.round(viva * 6), hex('#ff8a30'), 0.35 + viva * 0.25);
  for (let j = -6; j <= 2; j++) { R.pset(mx - 1, my + j, K); R.pset(mx, my + j, hex('#7a4a2a')); R.pset(mx + 1, my + j, K); }
  const f = Math.sin(t * 19 + k * 2.3) > 0 ? 1 : 0, s = viva > 0.5 ? 1 : 0;
  R.disco(mx, my - 9, 3 + s, hex('#c83a1a')); R.disco(mx, my - 10 - f, 2 + s, hex('#ff9a30')); R.disco(mx, my - 11 - f, 1, hex('#ffe080')); R.pset(mx + (f ? 1 : -1), my - 14 - f - s, hex('#ffc040'));
};
// copos que caen (n, velocidad, deriva) en todo el lienzo; tam 1 o 2
const copos = (t, n, v, dx, c, tam = 1, k = 0) => { for (let i = 0; i < n; i++) { const x = ((H(i, k) * 360 + t * dx + Math.sin(t * 1.3 + i) * 3) % 340 + 340) % 340 - 10, y = ((H(i, k + 1) * 200 + t * v) % 196) - 8;
  R.pset(Math.round(x), Math.round(y), c); if (tam > 1) { R.pset(Math.round(x) + 1, Math.round(y), c); R.pset(Math.round(x), Math.round(y) + 1, NVS); } } };

// un grupo dibujado al doble: dibuja() pinta en un búfer aparte (en coordenadas locales, recuadro lx0..lx1, ly0..ly1)
// y se copia a (x0, y0) con cada píxel de 2 × 2; lo vacío (0) deja ver el decorado
const BUFG = R.nuevo();
const alDoble = (dibuja, lx0, ly0, lx1, ly1, x0, y0) => {
  R.recorte(null); const prev = R.usar(BUFG); BUFG.fill(0); const out = dibuja(); R.recorte(null); R.usar(prev);
  for (let j = ly0; j <= ly1; j++) for (let i = lx0; i <= lx1; i++) { const c = BUFG[j * 320 + i]; if (!c) continue; const px = x0 + (i - lx0) * 2, py = y0 + (j - ly0) * 2;
    R.pset(px, py, c); R.pset(px + 1, py, c); R.pset(px, py + 1, c); R.pset(px + 1, py + 1, c); }
  return out;
};
// un farol de mano (mx, my: la mano), con su asa, el cristal encendido y su luz cálida
const farol = (mx, my, t) => { luz(mx, my + 4, 10, hex('#ffb050'), 0.4 + 0.1 * Math.sin(t * 9)); R.pset(mx, my, K); R.rect(mx - 2, my + 1, mx + 2, my + 7, K); R.rect(mx - 1, my + 2, mx + 1, my + 6, hex('#ffd070')); R.pset(mx, my + 3, hex('#fff4c0')); R.rect(mx - 2, my + 1, mx + 2, my + 1, hex('#3a3a44')); };

// ── 1 · la loma frente al castillo: el niño y la luz roja ───────────────────────────────────────────────────────────
const p1 = (t) => {
  const o = { encuadre: 'baron', lejos: true };
  T.latveria(R, t, o);
  // la luz roja lejana entre dos peñas, al otro lado del valle: late y en «mother» estalla
  const flare = tramo(t, madre - 0.1, madre + 0.25) * (1 - 0.6 * tramo(t, madre + 0.6, madre + 1.2)), lat = 0.5 + 0.5 * Math.sin(t * 3);
  luz(146, 114, 16 + Math.round(flare * 22), hex('#ff3a2a'), 0.45 + lat * 0.15 + flare * 0.4);
  R.disco(146, 116, 3 + Math.round(flare * 2), hex('#c81e1e')); R.disco(146, 115, 2 + Math.round(flare), hex('#ff6a4a')); R.pset(146, 114, hex('#ffd0a0'));
  for (const [x0, w, hh] of [[126, 14, 12], [152, 16, 14]]) { R.poligono([[x0, 124], [x0 + 3, 124 - hh], [x0 + w * 0.6, 122 - hh], [x0 + w, 124]], K); R.poligono([[x0 + 1, 123], [x0 + 3, 125 - hh], [x0 + w * 0.6, 123 - hh], [x0 + w - 1, 123]], hex('#3a3444'));
    R.linea(x0 + 3, 125 - hh, x0 + w * 0.6, 123 - hh, NVS); R.linea(x0 + w - 2, 123, x0 + w * 0.6 + 1, 124 - hh, hex('#6a2a3a')); }
  if (flare > 0.2) for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2 + t, r = 8 + flare * 14; R.pset(Math.round(146 + Math.cos(a) * r), Math.round(115 + Math.sin(a) * r * 0.6), hex('#ffb080')); }
  // el niño sube a la loma, se para, alarga la mano hacia la luz y se sorprende con el destello
  const u = tramo(t, 0.3, g(0.5)), x = Math.round(lerp(52, 100, ease(u)));
  R.actor(T.VD.victorNinoVD, x, 150 - Math.round(u * 2), t, { dir: 1, anda: u > 0 && u < 1, dedo: t > g(0.79) && t < madre + 0.9, sorpresa: t > madre, quieto: false });
  for (let k = 0; k < 4; k++) { const fx = Math.round(lerp(52, 100, ease(Math.min(u, k / 4)))) + 6; if (fx < x) { R.pset(fx, 150, NVS); R.pset(fx + 2, 151, NVS); } }
  // un aldeano con su farol baja del pueblo por la nieve, a la derecha, y se para a mirar el destello
  const ua = tramo(t, 0.2, madre - 0.2), vx = Math.round(lerp(334, 236, ua)), mira = t > madre;
  const rv = R.actor(T.VD.romaniVD, vx, 150, t, { dir: -1, anda: ua > 0 && ua < 1, sostiene: [vx - 1, 136], sorpresa: mira });
  if (rv?.mano) farol(rv.mano[0], rv.mano[1], t);
  // dos cuervos en el árbol seco que salen volando con el destello
  for (let k = 0; k < 2; k++) { const v = tramo(t, madre + 0.05 + k * 0.15, madre + 2.2), bx = Math.round(30 + k * 7 - v * 40 - k * v * 12), by = Math.round(118 + k * 4 - v * 70 + Math.sin(v * 9) * 3), ala = v > 0 && Math.sin(t * 22 + k) > 0;
    if (bx < -4 || by < 22) continue; R.rect(bx - 1, by, bx + 1, by + 1, K); R.pset(bx - 2, by + (v > 0 ? 0 : 1), K); R.pset(bx + 2, by, hex('#5a4a3a'));
    if (v > 0) { R.pset(bx - 1, by - (ala ? 2 : -2), K); R.pset(bx + 1, by - (ala ? 2 : -2), K); R.pset(bx, by - (ala ? 1 : -1), K); } }
  T.latveriaDelante(R, t, o);
  copos(t, 70, 16, -6, NV, 1, 3); copos(t, 18, 26, -10, NV, 2, 9);
};

// ── 2 · la tormenta: el padre cruza la nieve con el niño en brazos ─────────────────────────────────────────────────
const p2 = (t) => {
  const o = { encuadre: 'tormenta' };
  T.latveria(R, t, o);
  // Atom de luciérnaga, encogido junto a las rocas, tirita
  const tir = Math.sin(t * 46) > 0 ? 1 : -1;
  T.AT.luciernaga(R, 58 + tir, 128 + Math.sin(t * 2) * 2, t, { dir: 1, brillo: 0.55, cara: t > rodillas ? 'sorpresa' : 'triste' });
  const u = tramo(t, P2 + 0.3, rodillas - 0.1), w = tramo(t, rodillas + 0.6, P3 - 0.1), tropieza = t > rodillas - 0.1 && t < rodillas + 0.6;
  const S = 170, x = Math.round(lerp(300, 196, ease(u)) - lerp(0, 70, w)), hunde = tropieza ? 3 : 0;
  const r = R.actor(T.VD.wernerVD, x, S + hunde, t, { dir: -1, anda: (u > 0 && u < 1) || (w > 0 && w < 1), sostiene: [x + 1, S + hunde - 13], triste: true, sorpresa: tropieza });
  if (r?.mano) nene(r.mano[0], r.mano[1], -1, t > rodillas - 0.1);
  bufanda(r.cabeza[0] + 3, r.cabeza[1] + 13 + hunde, 1, t);
  hondo(x, S, -1, t, 6, 7 + hunde);
  T.latveriaDelante(R, t, o);
};

// ── 3 · el pinar en la ventisca (fondo local) ──────────────────────────────────────────────────────────────────────
let B3 = null; const HOR3 = new Int16Array(320), CIE3 = new Uint8Array(320 * 180);
const fondo3 = () => {
  if (B3) return B3;
  B3 = R.nuevo(); const prev = R.usar(B3);
  const CIE = [hex('#121a30'), hex('#1a2440'), hex('#222e4e'), hex('#2c3a5e')];
  for (let x = 0; x < 320; x++) HOR3[x] = Math.round(64 + Math.sin(x * 0.021) * 8 + Math.sin(x * 0.063 + 1) * 4 + Math.abs(Math.sin(x * 0.011 + 2)) * 6);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const u = y / 90 * 3 + (H(x >> 1, y >> 1) - 0.5) * 0.5; R.pset(x, y, CIE[Math.max(0, Math.min(3, Math.floor(u + bay(x, y) - 0.5)))]); }
  // la cordillera del fondo, con su nieve azul y las sombras de las laderas
  for (let x = 0; x < 320; x++) for (let y = HOR3[x]; y < 112; y++) { const lado = HOR3[Math.min(319, x + 1)] < HOR3[x]; const c = y < HOR3[x] + 3 ? hex('#8a98b8') : lado ? hex('#4a5878') : (H(x, y, 2) > 0.85 ? hex('#7a88a8') : hex('#5e6c8c')); R.pset(x, y, c); }
  // el bosque del medio: pinos oscuros con nieve en las ramas, en dos filas
  for (const [fila, y0, n, hh, c1, c2] of [[0, 104, 26, 26, hex('#1e3428'), hex('#9aa8c0')], [1, 116, 18, 36, hex('#142a1e'), hex('#c0cadc')]]) for (let k = 0; k < n; k++) {
    const cx = Math.round(k * (330 / n) + H(k, fila) * 10 - 6), al = hh + Math.round(H(k, fila + 5) * 12), base = y0 + Math.round(H(k, fila + 7) * 4);
    for (let j = 0; j < al; j++) { const half = Math.round((j / al) * (6 + fila * 3) + ((j % 5) < 2 ? 1 : 0)); for (let i = -half; i <= half; i++) R.pset(cx + i, base - al + j, (j % 5 === 0 && Math.abs(i) < half) ? c2 : (i < 0 ? c1 : mezcla(c1, K, 0.3))); }
    R.rect(cx - 1, base, cx + 1, base + 2, hex('#2a1e18')); }
  // el suelo nevado: de lejos más gris, cerca más claro; dunas de ventisca con su sombra, piedras, un tronco caído, una cerca
  // (de noche: la nieve azulada, más oscura lejos; ondas de ventisca con su sombra y su filo de luz, y destellos)
  const SN = [hex('#7a88a8'), hex('#8e9cba'), hex('#a4b0cc'), hex('#b8c4dc')];
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (y - 112) / 68, dn = Math.sin(x * 0.05 + y * 0.31 + Math.sin(x * 0.02) * 2) + Math.sin(x * 0.013 - y * 0.2);
    const i = Math.max(0, Math.min(3, Math.floor(u * 3.2 + bay(x, y) * 0.9)));
    R.pset(x, y, dn > 1.62 ? hex('#5e6a8a') : dn > 1.5 ? SN[Math.max(0, i - 1)] : dn > 1.38 && dn < 1.45 ? hex('#d8e0ee') : (H(x, y, 4) > 0.985 ? hex('#ffffff') : SN[i])); }
  // un arroyo helado que baja entre la nieve, con su hielo verdoso y sus grietas
  for (let y = 118; y < 180; y++) { const cx = Math.round(150 + Math.sin(y * 0.09) * 14 + (y - 118) * 0.9), w = 3 + Math.round((y - 118) / 14);
    for (let x = cx - w; x <= cx + w; x++) R.pset(x, y, x === cx - w || x === cx + w ? hex('#4a5878') : (x + y) % 7 === 0 ? hex('#e8f4ff') : hex('#7aa0b8')); if (y % 9 === 0) R.linea(cx - w + 1, y, cx + w - 1, y + 2, hex('#4a6a80')); }
  for (let k = 0; k < 22; k++) { const x = Math.round(H(k, 11) * 300 + 10), y = Math.round(120 + H(k, 12) * 56), r = 2 + Math.round(H(k, 13) * 3 * (y - 100) / 60); R.disco(x, y, r + 1, K); R.disco(x, y, r, hex('#4a4a56')); R.disco(x - 1, y - 1, Math.max(1, r - 1), hex('#6a6a78')); R.rect(x - r, y - r, x + r - 1, y - r + 1, hex('#d8e0ee')); R.linea(x + r + 1, y + 1, x + r + 4, y + 1, hex('#5e6a8a')); }
  // matas secas y juncos que asoman de la nieve
  for (let k = 0; k < 26; k++) { const x = Math.round(H(k, 51) * 300 + 10), y = Math.round(126 + H(k, 52) * 50); for (let j = 0; j < 4; j++) R.linea(x + j * 2 - 3, y, x + j * 3 - 5 + Math.round(H(k, j) * 2), y - 4 - j % 2 * 2, j % 2 ? hex('#8a7a4a') : hex('#5a4a2a')); }
  R.poligono([[34, 150], [96, 141], [98, 147], [36, 156]], K); R.poligono([[36, 150], [95, 142], [96, 146], [37, 154]], hex('#5a3a24')); for (let x = 40; x < 94; x += 6) R.pset(x, 150 - Math.round((x - 36) * 0.15), hex('#3a2416')); R.linea(36, 149, 95, 141, NV); R.linea(38, 148, 90, 141, NV); R.disco(96, 144, 3, hex('#8a6a4a')); R.disco(96, 144, 1, hex('#5a3a24'));
  for (let k = 0; k < 5; k++) { const x = 236 + k * 14, y = 118 + k * 2; R.rect(x - 1, y, x + 1, y + 13, K); R.rect(x, y + 1, x, y + 12, hex('#6a4a30')); R.rect(x - 2, y - 1, x + 2, y, NV); if (k < 4) { R.linea(x + 1, y + 4, x + 13, y + 6, hex('#4a3020')); R.linea(x + 1, y + 9, x + 13, y + 11, hex('#4a3020')); } }
  // las huellas que ya va tapando la nieve, del borde derecho hasta el centro
  for (let x = 316; x > 150; x -= 9) { R.rect(x, 156 + ((x >> 3) & 1), x + 2, 157 + ((x >> 3) & 1), NVS); }
  // el pino de primer término a la izquierda: corteza con grietas, nieve pegada del lado del viento, su rama nevada
  for (let y = 0; y < 180; y++) for (let x = 0; x <= 24 + Math.round(y / 40); x++) { const e = x === 24 + Math.round(y / 40); const v = (x * 3 + Math.floor(y / 6) * 5) % 7;
    R.pset(x, y, e ? K : v === 0 ? hex('#1e140c') : x > 18 ? hex('#5a4030') : (H(x, y >> 2) > 0.85 ? NV : hex('#3a2a1e'))); }
  for (let x = 24; x < 96; x++) { const y = 34 + Math.round((x - 24) * 0.12); R.rect(x, y, x, y + 3, (x & 3) === 0 ? K : hex('#3a2a1e')); R.rect(x, y - 3, x, y - 1, NV); R.pset(x, y - 4, (x % 5) ? NVM : NV);
    if ((x % 4) === 0) for (let j = 4; j < 9 + (x % 3); j++) R.pset(x + (j >> 2), y + j, j % 2 ? hex('#1e3428') : hex('#2e4a38')); }
  // la peña nevada de la derecha, abajo (deja tranquila la esquina de Atom)
  R.poligono([[252, 180], [262, 148], [282, 136], [306, 138], [319, 146], [319, 180]], K); R.poligono([[254, 180], [264, 149], [283, 138], [305, 140], [319, 148], [319, 180]], hex('#5a5a66'));
  R.poligono([[264, 150], [283, 139], [305, 141], [318, 149], [300, 147], [280, 146]], hex('#d8e0ee'));
  for (let y = 150; y < 180; y++) for (let x = 256; x < 320; x++) { const c = R.pget(x, y); if (c === hex('#5a5a66')) R.pset(x, y, (x * 3 + y * 5) % 11 === 0 ? hex('#6e6e7c') : (x - y * 2) % 13 === 0 ? hex('#44444e') : H(x >> 1, y >> 1, 9) > 0.8 ? hex('#4e4e5a') : c); }
  for (let k = 0; k < 6; k++) R.linea(270 + k * 8, 160 + (k & 1) * 6, 276 + k * 8, 172, hex('#3a3a46'));
  R.linea(262, 150, 256, 179, hex('#7a7a88')); R.disco(300, 168, 3, hex('#d8e0ee')); R.disco(284, 160, 2, hex('#d8e0ee'));
  for (let i = 0; i < 320 * 180; i++) { const x = i % 320, y = (i / 320) | 0; CIE3[i] = y < HOR3[x] && CIE.includes(B3[i]) ? 1 : 0; }
  R.usar(prev); return B3;
};
const p3 = (t) => {
  R.copiar(fondo3());
  // los nubarrones que corren por el cielo (solo por encima de la cordillera)
  const cielo3 = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180 && CIE3[y * 320 + x] === 1;
  for (const [y0, v, k, c0, c1, c2] of [[18, 6, 0, hex('#1e2640'), hex('#2a3452'), hex('#3a4666')], [34, 11, 1, hex('#283252'), hex('#36426a'), hex('#4a5880')], [50, 17, 2, hex('#323e60'), hex('#46547c'), hex('#5e6e98')]])
    for (let i = 0; i < 4; i++) { const w = 34 + ((i * 7 + k) % 3) * 12; nube(((i * 120 + k * 50 - t * v) % 440 + 440) % 440 - 60, y0 + (i % 2) * 4, w, c0, c1, c2, cielo3); }
  // el búho en la rama: parpadea y gira la cabeza
  const bx = 70, by = 37, gira = Math.sin(t * 0.9) > 0.3 ? 1 : 0, ab = ((t * 0.6) % 1) > 0.06;
  R.disco(bx, by - 6, 6, K); R.disco(bx, by - 6, 5, hex('#7a6a5a')); for (let k = 0; k < 5; k++) R.pset(bx - 2 + k, by - 4 + (k & 1), hex('#c8b898'));
  R.disco(bx, by - 13, 5, K); R.disco(bx, by - 13, 4, hex('#9a8a6a')); R.pset(bx - 4, by - 18, K); R.pset(bx - 3, by - 17, K); R.pset(bx + 4, by - 18, K); R.pset(bx + 3, by - 17, K);
  for (const dx of [-2, 2]) { R.disco(bx + dx + gira, by - 13, 1, ab ? hex('#ffd040') : hex('#5a4a3a')); if (ab) R.pset(bx + dx + gira, by - 13, K); }
  R.pset(bx + gira, by - 11, hex('#c89a3a')); R.rect(bx - 2, by - 1, bx - 1, by, hex('#c89a3a')); R.rect(bx + 1, by - 1, bx + 2, by, hex('#c89a3a'));
  // el padre avanza contra el viento con el niño en brazos; lo aprieta contra sí en «arms»
  const u = tramo(t, P3 + 0.2, P4 - 0.2), x = Math.round(lerp(232, 112, u)), suelo = 156, aprieta = tramo(t, brazosV - 0.3, brazosV + 0.2);
  const r = R.actor(T.VD.wernerVD, x, suelo, t, { dir: -1, anda: u > 0 && u < 1, sostiene: [x + 1 + Math.round(aprieta * 2), suelo - 13 - Math.round(aprieta * 2)], triste: true });
  if (r?.mano) nene(r.mano[0], r.mano[1], -1, t > ojos);
  bufanda(r.cabeza[0] + 3, r.cabeza[1] + 13, 1, t);
  hondo(x, suelo, -1, t, 0);
  // la nieve que se desprende de la rama del pino (cada 3 s)
  const cae = (t % 3) / 3; if (cae < 0.5) for (let k = 0; k < 8; k++) R.pset(Math.round(56 + k * 3 + cae * 20), Math.round(36 + cae * 120 + (k % 3) * 3), NV);
  // la ventisca: rayas que cruzan de izquierda a derecha y el polvo de nieve rasante
  for (let i = 0; i < 90; i++) { const v = 120 + (i % 3) * 60, x = ((H(i, 21) * 360 + t * v) % 360) - 20, y = ((H(i, 22) * 190 + t * 18) % 190) - 5, l = 2 + (i % 3) * 2;
    R.linea(Math.round(x), Math.round(y), Math.round(x + l), Math.round(y + l * 0.3), i % 3 === 2 ? NV : NVM); }
  for (let i = 0; i < 24; i++) { const x = ((H(i, 31) * 360 + t * 70) % 360) - 20, y = 140 + H(i, 32) * 36; R.pset(Math.round(x), Math.round(y + Math.sin(t * 5 + i) * 2), hex('#ffffff')); R.pset(Math.round(x) + 1, Math.round(y + Math.sin(t * 5 + i) * 2), NV); }
};

// ── 4 · la puerta del castillo: salen los soldados con antorchas ──────────────────────────────────────────────────────
const p4 = (t) => {
  const o = { encuadre: 'baron' };
  T.latveria(R, t, o);
  const viva = tramo(t, antorchasV - 0.2, antorchasV + 0.2);
  // tres soldados salen por el arco, uno detrás de otro, y bajan por el camino hacia el monte (a la izquierda)
  const sale = [P4 + 0.3, P4 + 1.3, P4 + 2.4], dest = [[96, 162], [128, 170], [62, 166]];
  sale.forEach((t0, k) => {
    const u = tramo(t, t0, t0 + 2.6 + k * 0.3), apura = tramo(t, corre, P5);
    if (u <= 0) return;
    const x = Math.round(lerp(152, dest[k][0], ease(u)) - apura * 30), y = Math.round(lerp(150, dest[k][1], ease(u)));
    const señala = k === 0 && t > corre - 0.2;
    const r = R.actor(T.VD.soldadoVD, x, y, t, { dir: -1, anda: (u < 1) || apura > 0, sostiene: señala ? undefined : [x - 2, y - 16], dedo: señala, enfado: true });
    if (!señala && r?.mano) antorcha(r.mano[0], r.mano[1], t, k, viva);
    if (señala) antorcha(x + 14, y - 14, t, k, viva);
  });
  // el perro del barón, que olfatea el camino y ladra
  const up = tramo(t, P4 + 1.0, P4 + 3.4), px = Math.round(lerp(160, 104, up) - tramo(t, corre, P5) * 40);
  if (up > 0) R.perro(px, 168, t, { dir: -1, esc: 0.6 });
  if (t > n(0.45) && t < n(0.45) + 0.6) R.icono('!', px - 10, 150, K, hex('#ffffff'));
  T.latveriaDelante(R, t, o);
  copos(t, 40, 18, -8, NV, 1, 5);
};

// ── 5 · la cresta (fondo local): el padre por el filo del monte, las antorchas suben por el valle ───────────────────
let B5 = null; const CRE = new Int16Array(320), CIE5 = new Uint8Array(320 * 180);
const cresta = (x) => Math.round(x < 100 ? 112 + (100 - x) * 0.1 : 112 + (x - 100) ** 2 / 820);
const fondo5 = () => {
  if (B5) return B5;
  B5 = R.nuevo(); const prev = R.usar(B5);
  const CIE = [hex('#0e1428'), hex('#161e38'), hex('#1e2848'), hex('#28345a')];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 224) / 1.4, y - 34) / 70; R.pset(x, y, CIE[Math.max(0, Math.min(3, Math.floor(3.2 - d * 2.4 + y / 120 + bay(x, y) * 0.9 - 0.45)))]); }
  for (let i = 0; i < 320 * 180; i++) CIE5[i] = 1;
  // las cumbres lejanas, con la luz de la luna en las aristas
  const far = (x) => Math.round(86 + Math.sin(x * 0.045) * 9 + Math.sin(x * 0.11 + 2) * 4 - Math.abs(Math.sin(x * 0.02)) * 10);
  for (let x = 0; x < 320; x++) { const pend = far(x + 4) - far(x - 4); for (let y = far(x); y < 180; y++) { CIE5[y * 320 + x] = 0; const d = y - far(x), veta = Math.sin(x * 0.35 + y * 0.8) > 0.88 && d > 5;
    R.pset(x, y, d < 2 ? hex('#a8b8d8') : veta ? hex('#2e3858') : pend > 0 ? (d + bay(x, y) * 8 < 16 ? hex('#7484aa') : hex('#4e5a7c')) : (d + bay(x, y) * 6 < 6 ? hex('#56648a') : hex('#3e4a6a'))); } }
  // el valle: el bosque oscuro con nieve en las copas y el camino en zigzag que sube
  for (let k = 0; k < 40; k++) { const cx = 150 + Math.round(H(k, 41) * 175), al = 10 + Math.round(H(k, 42) * 10), base = 112 + Math.round(H(k, 43) * 60);
    for (let j = 0; j < al; j++) { const half = Math.round(j / al * 4); for (let i = -half; i <= half; i++) R.pset(cx + i, base - al + j, j % 4 === 0 && i < 0 ? hex('#8a98b8') : i > 0 ? hex('#0e1e16') : hex('#142a1e')); } }
  for (const [x0, y0, x1, y1] of [[316, 178, 252, 160], [252, 160, 300, 142], [300, 142, 236, 126], [236, 126, 262, 114]]) { R.linea(x0, y0, x1, y1, hex('#5a6888')); R.linea(x0, y0 + 1, x1, y1 + 1, hex('#8a98b8')); }
  // la cresta de primer término: roca oscura con nieve, piedras que asoman, un árbol seco y la cornisa de nieve
  for (let x = 0; x < 320; x++) { CRE[x] = cresta(x); for (let y = CRE[x]; y < 180; y++) { CIE5[y * 320 + x] = 0; const d = y - CRE[x], rq = (xx, yy) => Math.sin(xx * 0.071 + yy * 0.113) * Math.sin(xx * 0.023 - yy * 0.171 + 1.3) + (H(xx >> 2, yy >> 2, 7) - 0.5) * 0.3 > 0.42 && yy - cresta(xx) > 6, roca = rq(x, y), filo = roca && !rq(x, y - 1);
    R.pset(x, y, d === 0 ? hex('#e8ecf4') : d < 3 ? hex('#c8d2e2') : filo ? hex('#e8ecf4') : roca ? ((x + y * 2) % 7 === 0 ? hex('#5a5a6a') : H(x, y, 5) > 0.6 ? hex('#3a3a48') : hex('#2a2a36')) : (d < 10 + Math.sin(x * 0.3) * 3 ? hex('#a4b0cc') : (H(x, y, 6) > 0.9 ? hex('#7a88a8') : hex('#8e9cba')))); } }
  for (let k = 0; k < 9; k++) { const x = 20 + k * 34 + Math.round(H(k, 77) * 10), y = cresta(x) + 10 + Math.round(H(k, 78) * 30); if (y > 176) continue; R.disco(x, y, 4, K); R.disco(x, y, 3, hex('#4a4a58')); R.rect(x - 3, y - 4, x + 2, y - 3, hex('#e8ecf4')); }
  R.linea(40, cresta(40), 34, cresta(40) - 26, K); R.linea(41, cresta(40), 35, cresta(40) - 26, hex('#4a3a2e')); R.linea(37, cresta(40) - 14, 28, cresta(40) - 20, K); R.linea(38, cresta(40) - 18, 46, cresta(40) - 25, K); R.linea(35, cresta(40) - 24, 30, cresta(40) - 30, K);
  R.usar(prev); return B5;
};
const p5 = (t) => {
  R.copiar(fondo5());
  // la luna tras los nubarrones: el halo, y las nubes que pasan por delante con el borde iluminado
  for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const q = Math.hypot(i, j); if (q <= 8) R.pset(224 + i, 34 + j, q > 7 ? hex('#c8c8b0') : hex('#f0ecd8')); }
  R.disco(221, 31, 2, hex('#d8d4c0')); R.disco(227, 37, 1, hex('#d8d4c0'));
  const cielo5 = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180 && CIE5[y * 320 + x] === 1;
  for (const [y0, v, k, c0, c1, c2] of [[24, 7, 0, hex('#222a46'), hex('#323c60'), hex('#5a6488')], [48, 12, 1, hex('#283252'), hex('#3a466c'), hex('#6a76a0')], [66, 18, 2, hex('#2e3a5c'), hex('#424e76'), hex('#7a86b0')]])
    for (let i = 0; i < 3; i++) nube(((i * 150 + k * 70 - t * v) % 470 + 470) % 470 - 70, y0 + (i % 2) * 5, 30 + ((i + k) % 3) * 10, c0, c1, c2, cielo5);
  // las antorchas que suben por el camino del valle, más cerca cuanto más avanza la frase
  const camino = [[316, 178], [252, 160], [300, 142], [236, 126], [262, 114]], pos = (f) => { const tr = Math.min(3.999, Math.max(0, f * 4)), k = Math.floor(tr), u = tr - k; return [lerp(camino[k][0], camino[k + 1][0], u), lerp(camino[k][1], camino[k + 1][1], u)]; };
  const av = 0.15 + 0.55 * tramo(t, P5, P6);
  for (let k = 0; k < 6; k++) { const f = av - k * 0.07; if (f < 0) continue; const [x, y] = pos(f), fl = Math.sin(t * 17 + k * 2) > 0 ? 1 : 0;
    luz(x, y - 4, 9, hex('#ff8a30'), 0.4); R.rect(Math.round(x) - 1, Math.round(y) - 6, Math.round(x), Math.round(y), K); R.pset(Math.round(x), Math.round(y) - 7 - fl, hex('#ffd060')); R.pset(Math.round(x) - 1, Math.round(y) - 6, hex('#ff7a2a')); R.pset(Math.round(x), Math.round(y) - 6, hex('#ff9a30')); }
  // el padre sube por el filo con el niño; tiembla; en «stops» se para en la cumbre y mira atrás, a las antorchas
  const u = tramo(t, P5 + 0.1, para), x = Math.round(lerp(214, 112, ease(u))), tb = t > tiembla - 0.2 && t < para + 0.8 ? (Math.floor(t * 22) % 2) : 0, S = cresta(x + 7), vuelve = t > para + 0.2;
  const r = R.actor(T.VD.wernerVD, x + tb, S, t, { dir: vuelve ? 1 : -1, anda: u > 0 && u < 1, sostiene: vuelve ? [x + 13, S - 13] : [x + 1, S - 13], triste: !vuelve, sorpresa: vuelve });
  if (r?.mano) nene(r.mano[0], r.mano[1], vuelve ? 1 : -1, true);
  bufanda(r.cabeza[0] + (vuelve ? -3 : 3), r.cabeza[1] + 13, 1, t);
  hondo(x + tb, S, -1, t, 3, 6);
  if (t > para && t < para + 0.8) R.icono('!', x + 4, r.cabeza[1] - 8, K, hex('#ffffff'));
  // la nieve que el viento arranca de la cresta (penacho hacia la derecha) y la ventisca
  for (let i = 0; i < 60; i++) { const f = ((t * 0.7 + H(i, 91)) % 1), x0 = 40 + H(i, 92) * 200, xx = x0 + f * 90, yy = cresta(Math.round(x0)) - f * 26 + Math.sin(t * 4 + i) * 2; if (xx < 320) R.pset(Math.round(xx), Math.round(yy), f < 0.5 ? hex('#e8ecf4') : hex('#a8b4c8')); }
  for (let i = 0; i < 70; i++) { const v = 110 + (i % 3) * 50, xx = ((H(i, 21) * 360 + t * v) % 360) - 20, yy = ((H(i, 22) * 190 + t * 24) % 190) - 5, l = 2 + (i % 3); R.linea(Math.round(xx), Math.round(yy), Math.round(xx + l), Math.round(yy + l * 0.35), i % 3 === 2 ? NV : NVM); }
};

// ── 6 · el hueco entre las rocas: el abrigo ──────────────────────────────────────────────────────────────────────────
const p6 = (t) => {
  const o = { encuadre: 'tormenta', camara: 'abrigo', amanecer: 0.15 * tramo(t, despacio, P7) };
  T.latveria(R, t, o);
  // el abrazo es la imagen central del episodio: los dos, al doble, llenan el hueco entre las rocas (x 120–200). Se
  // dibujan en un búfer en coordenadas locales (suelo LS) y se copian a 2 × 2: local (0, 0) → pantalla (118, 75)
  // (el color de la nieve del hueco se toma del decorado, para que los montones al doble no salgan más blancos)
  const LS = 40, lzv = tramo(t, despacio, despacio + 1.5), nieveH = R.pget(160, 160);
  const ar = tramo(t, P6, P6 + 0.7), rp = tramo(t, P6 + 0.7, P6 + 1.1);
  alDoble(() => {
    // el padre da el último paso dentro del hueco, se agacha y deja al niño en la nieve; se quita el abrigo, se
    // arrodilla y se lo cierra alrededor despacio; luego lo rodea con el brazo y le sonríe
    const deja = t > P6 + 0.8, sinAbrigo = t > quita, rodilla = Math.max(rp * 0.4, tramo(t, quita + 0.3, envuelve));
    const x = Math.round(lerp(12, 4, ease(ar))), suelo = LS + Math.round(rodilla * 6);
    const pal = sinAbrigo ? { C: hex('#c8b890'), c: hex('#9a8a6a'), u: hex('#b8a880') } : undefined;
    // el niño, de pie en la nieve, que tirita hasta que el abrigo lo envuelve
    const wrap = tramo(t, envuelve, despacio + 1.2), nx = 22 + (wrap < 1 && deja && Math.floor(t * 18) % 2 ? 1 : 0);
    if (deja) { const rn = R.actor(T.VD.victorNinoVD, nx, LS, t, { dir: -1, triste: wrap < 1, sonrisa: wrap >= 1 && t > despacio + 1.6, sorpresa: t > quita && t < envuelve });
      // el vaho del niño, que tiembla de frío (se acaba cuando lo envuelve)
      if (wrap < 1) for (let k = 0; k < 2; k++) { const f = (t * 1.3 + k / 2) % 1; R.pset(Math.round(rn.cabeza[0] - 3 - f * 5), Math.round(rn.cabeza[1] + 8 - f * 3), f < 0.5 ? NV : NVS); }
      // el abrigo grande del padre se cierra alrededor del niño, de un lado al otro: hombros redondos, el cuello subido
      // con la bufanda roja, los pliegues y el bajo que arrastra por la nieve
      if (wrap > 0) { const hx = rn.cabeza[0], hy = rn.cabeza[1] + 5, xl = hx - 12, xr = Math.round(xl + 25 * wrap);
        R.recorte([xl, 0, xr, 179]);
        const pts = [[hx - 5, hy + 6], [hx - 9, hy + 10], [hx - 10, LS - 6], [hx - 12, LS + 1], [hx + 12, LS + 1], [hx + 10, LS - 6], [hx + 9, hy + 10], [hx + 5, hy + 6]];
        R.poligono(pts, K); R.poligono(pts.map(([x2, y]) => [x2 + (x2 < hx ? 1 : -1), y + (y > LS - 2 ? -1 : 1)]), ABR);
        R.poligono([[hx - 8, hy + 11], [hx - 3, hy + 11], [hx - 5, LS - 1], [hx - 10, LS - 1]], hex('#7a5a3a'));
        for (const dx of [-2, 3, 7]) R.linea(hx + dx, hy + 14, hx + dx + (dx > 0 ? 1 : -1), LS - 2, ABRS);
        R.linea(hx, hy + 11, hx + 1, LS - 1, K); for (const yy of [hy + 15, hy + 21]) R.pset(hx + 2, yy, hex('#c8a040'));
        R.rect(hx - 7, hy + 7, hx + 7, hy + 9, K); R.rect(hx - 6, hy + 7, hx + 6, hy + 8, BUF); R.rect(hx - 6, hy + 8, hx + 6, hy + 8, hex('#7a1e1a')); R.rect(hx + 4, hy + 9, hx + 6, hy + 16, BUF); R.pset(hx + 5, hy + 16, hex('#7a1e1a'));
        R.linea(hx - 12, LS + 1, hx + 12, LS + 1, NVS);
        R.recorte(null); }
      hondo(nx, LS, -1, t, 0, 3, nieveH); }
    const tiene = !sinAbrigo ? null : t < envuelve ? [x + 15, LS - 16] : null;
    const r = R.actor(T.VD.wernerVD, x, suelo, t, { dir: 1, anda: ar > 0 && ar < 1, pal, sostiene: !deja ? [x + 13, LS - 13 + Math.round(rp * 4)] : tiene ? tiene : t > envuelve ? [x + 16, suelo - 15] : undefined, triste: t < despacio + 1, sonrisa: t > despacio + 1.6, quieto: false });
    if (!deja && r?.mano) nene(r.mano[0], r.mano[1], 1, true);
    if (tiene && r?.mano) { const [mx, my] = r.mano; R.poligono([[mx - 3, my], [mx + 3, my], [mx + 5, my + 14], [mx - 4, my + 14]], K); R.poligono([[mx - 2, my + 1], [mx + 2, my + 1], [mx + 4, my + 13], [mx - 3, my + 13]], ABR); R.linea(mx - 2, my + 1, mx + 2, my + 1, BUF); R.linea(mx, my + 3, mx + 1, my + 12, ABRS); }
    // el vaho del padre, más fuerte cuando ya está en camisa y tiembla
    for (let k = 0; k < 2; k++) { const f = (t * 1.1 + k / 2 + 0.3) % 1; R.pset(Math.round(r.cabeza[0] + 12 + f * 5), Math.round(r.cabeza[1] + 8 - f * 3), f < 0.5 ? NV : NVS); }
    hondo(x, suelo, 1, t, 0, 3 + Math.round(rodilla * 6), nieveH);
    return r;
  }, 0, 0, 44, 52, 118, 75);
  // la luz pálida que baja sobre los dos cuando el abrigo ya lo envuelve
  if (lzv > 0) luz(160, 128, 40, hex('#ffe8c0'), 0.35 * lzv);
  T.latveriaDelante(R, t, o);
  T.AT.luciernaga(R, 92 + Math.sin(t * 0.7) * 3, 96 + Math.sin(t * 1.9) * 3, t, { dir: 1, brillo: 0.5 + lzv * 0.3, cara: lzv > 0.5 ? 'sonrisa' : 'triste' });
};

// ── 7 · el camino al amanecer (fondo local): el niño crece mientras camina ─────────────────────────────────────────
let B7 = null; const HOR7 = new Int16Array(320);
const fondo7 = () => {
  if (B7) return B7;
  B7 = R.nuevo(); const prev = R.usar(B7);
  const CIE = [hex('#3a4a7a'), hex('#6a5a8e'), hex('#b07a9a'), hex('#e89a8a'), hex('#f8c890')];
  for (let x = 0; x < 320; x++) HOR7[x] = Math.round(74 + Math.sin(x * 0.03 + 0.5) * 9 + Math.sin(x * 0.081) * 4 + Math.max(0, 22 - Math.abs(x - 150) * 0.4));
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { const u = y / 86 * 4.2; R.pset(x, y, CIE[Math.max(0, Math.min(4, Math.floor(u + bay(x, y) - 0.5)))]); }
  // la sierra: la ladera que mira al sol (izquierda de cada cumbre) rosa, la otra en sombra lila; vetas de roca y nieve
  for (let x = 0; x < 320; x++) { const pend = HOR7[Math.min(319, x + 3)] - HOR7[Math.max(0, x - 3)];
    for (let y = HOR7[x]; y < 120; y++) { const d = y - HOR7[x], veta = Math.sin(x * 0.4 + y * 0.9) > 0.85 && d > 4;
      R.pset(x, y, d < 2 ? hex('#fff0e8') : veta ? hex('#6a5a88') : pend > 0 ? (d + bay(x, y) * 6 < 14 ? hex('#f8d0c8') : hex('#c8a8c0')) : (d + bay(x, y) * 6 < 8 ? hex('#b8a0c8') : hex('#8a78a8'))); } }
  // el bosque del medio con la nieve rosada en las puntas, y el pueblo con sus tejados en la ladera de la derecha
  for (let k = 0; k < 30; k++) { const cx = Math.round(k * 11 + H(k, 40) * 8), al = 16 + Math.round(H(k, 41) * 14), base = 112 + Math.round(H(k, 42) * 4);
    for (let j = 0; j < al; j++) { const half = Math.round(j / al * 6); for (let i = -half; i <= half; i++) R.pset(cx + i, base - al + j, j % 4 === 0 && i < 0 ? hex('#f0c8c8') : i > 0 ? hex('#1a3024') : hex('#24402e')); } }
  for (let k = 0; k < 6; k++) { const x = 232 + k * 13, y = 104 + (k % 2) * 3; R.rect(x, y, x + 10, y + 8, K); R.rect(x + 1, y + 1, x + 9, y + 7, hex('#c8a888')); R.poligono([[x - 1, y + 1], [x + 5, y - 5], [x + 11, y + 1]], hex('#a83a2a')); R.linea(x, y, x + 5, y - 5, NV); R.pset(x + 4, y + 4, hex('#ffd880')); }
  // la llanura nevada con el camino pisado (rodadas), los mojones y una cerca
  for (let y = 116; y < 180; y++) for (let x = 0; x < 320; x++) { const dn = Math.sin(x * 0.04 + y * 0.27) + Math.sin(x * 0.017 - y * 0.15);
    R.pset(x, y, dn > 1.5 ? hex('#b8b0d0') : y > 145 && y < 158 ? ((x + y * 3) % 9 === 0 ? hex('#c8b8b0') : hex('#e0d0cc')) : (H(x, y, 5) > 0.97 ? hex('#ffffff') : y < 130 ? hex('#f0dcdc') : hex('#f8ecec'))); }
  R.linea(0, 148, 319, 148, hex('#b8a8b8')); R.linea(0, 156, 319, 156, hex('#b8a8b8')); for (let x = 0; x < 320; x += 7) R.pset(x, 152, hex('#a89aa8'));
  for (let k = 0; k < 9; k++) { const x = 8 + k * 38, y = 132 + (k % 2); R.rect(x - 1, y, x + 1, y + 11, K); R.rect(x, y + 1, x, y + 10, hex('#6a4a30')); R.rect(x - 2, y - 1, x + 2, y, NV); if (k !== 5) R.linea(x + 1, y + 4, x + 37, y + 4 + (k % 2 ? -1 : 1), hex('#5a3a24')); R.linea(x + 2, y + 12, x + 12, y + 14, hex('#c0b0d0')); }
  // en primer término: matas de hierba seca, piedras con su gorro de nieve, un trineo viejo y las huellas de un zorro
  for (let k = 0; k < 34; k++) { const x = Math.round(H(k, 81) * 316), y = 162 + Math.round(H(k, 82) * 16); if (y < 166 && x > 190 && x < 240) continue;
    for (let j = 0; j < 5; j++) R.linea(x + j * 2 - 4, y, x + j * 3 - 6 + Math.round(H(k, j) * 2), y - 5 - (j % 2) * 3, j % 2 ? hex('#c8a060') : hex('#8a6a3a')); }
  for (let k = 0; k < 10; k++) { const x = Math.round(H(k, 91) * 300 + 10), y = 160 + Math.round(H(k, 92) * 18), r = 2 + (k % 3); R.disco(x, y, r + 1, K); R.disco(x, y, r, hex('#7a6a7a')); R.rect(x - r, y - r, x + r - 1, y - r + 1, hex('#fff4f0')); R.linea(x + r + 1, y + 1, x + r + 5, y + 2, hex('#b8a8c8')); }
  R.rect(262, 166, 300, 168, K); R.rect(263, 166, 299, 167, hex('#8a5a34')); R.linea(258, 171, 302, 171, K); R.linea(258, 170, 262, 166, K); R.linea(300, 166, 304, 170, K); for (const x of [268, 290]) R.rect(x, 168, x + 1, 171, K); R.rect(264, 164, 298, 165, hex('#fff4f0'));
  for (let k = 0; k < 9; k++) { const x = 20 + k * 13, y = 174 - (k % 2) * 3; R.pset(x, y, hex('#a898b8')); R.pset(x + 1, y + 1, hex('#a898b8')); R.pset(x - 1, y + 1, hex('#a898b8')); }
  R.usar(prev); return B7;
};
const p7 = (t) => {
  R.copiar(fondo7());
  // el sol que sale detrás de la sierra, nubes rosadas lentas y una bandada
  const sy = Math.round(lerp(100, 80, tramo(t, P7, P8)));
  for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) { const x = 150 + i, y = sy + j, q = Math.hypot(i, j); if (y >= HOR7[x] || q > 12) continue; R.pset(x, y, q < 7 ? hex('#fff4d0') : q < 9 ? hex('#ffd890') : (bay(x, y) < 0.5 ? hex('#f8c890') : R.pget(x, y))); }
  const cielo7 = (x, y) => x >= 0 && x < 320 && y >= 0 && y < HOR7[x];
  for (const [y0, v, k, c0, c1, c2] of [[26, 3, 0, hex('#8a6a9a'), hex('#c890b0'), hex('#f0c0c8')], [42, 5, 1, hex('#b07a9a'), hex('#e8a8b0'), hex('#f8d8c8')], [56, 8, 2, hex('#c8889a'), hex('#f0b8a8'), hex('#fff0d8')]])
    for (let i = 0; i < 3; i++) nube(((i * 150 + k * 60 + t * v) % 460) - 70, y0 + (i % 2) * 3, 26 + ((i + k) % 3) * 8, c0, c1, c2, cielo7);
  for (let k = 0; k < 6; k++) { const x = Math.round(200 - (t - P7) * 14 + (k % 3) * 7), y = 60 + (k >> 1) * 3 + (k % 2) * 2, a = Math.sin(t * 9 + k) > 0; R.pset(x, y, K); R.pset(x - 1, y - (a ? 1 : 0), K); R.pset(x + 1, y - (a ? 1 : 0), K); }
  // el humo de las chimeneas del pueblo
  for (let k = 0; k < 3; k++) for (let i = 0; i < 6; i++) { const f = ((t * 0.4 + i / 6) % 1); R.pset(Math.round(240 + k * 26 + f * 8 + Math.sin(f * 6) * 2), Math.round(98 - f * 26), f < 0.5 ? hex('#d8c8d0') : hex('#b8a8c0')); }
  // el caminante: niño con el abrigo grande, muchacho detrás de la peña, joven detrás del pino
  const u = tramo(t, P7 + 0.1, P8 - 0.1), x = Math.round(lerp(-14, 330, u)), cx = x + 7;
  for (let fx = Math.max(0, x - 120); fx < x; fx += 6) R.pset(fx + ((fx >> 1) & 2), 153 + ((fx / 6) & 1), hex('#a898b8'));
  for (let y = 158; y < 180; y++) for (let xx = 232 + (y - 158) * 2; xx < 262 + (y - 158) * 2; xx++) if (((xx + y) & 1) === 0) R.pset(xx, y, mezcla(R.pget(xx, y), hex('#8a78a8'), 0.4));
  const def = cx < 80 ? T.VD.victorNinoVD : cx < 218 ? T.VD.victorChicoVD : T.VD.victorJovenVD;
  R.actor(def, x, 152, t, { dir: 1, anda: true, sonrisa: cx > 218 });
  if (cx < 80) { R.poligono([[x + 2, 136], [x + 13, 136], [x + 14, 151], [x + 1, 151]], K); R.poligono([[x + 3, 137], [x + 12, 137], [x + 13, 150], [x + 2, 150]], ABR); R.linea(x + 3, 137, x + 12, 137, BUF); R.linea(x + 7, 139, x + 7, 150, ABRS); }
  // Atom de luciérnaga lo acompaña por encima del camino
  T.AT.luciernaga(R, x - 18 + Math.sin(t * 1.5) * 3, 118 + Math.sin(t * 2.4) * 3, t, { dir: 1, brillo: 0.7, cara: 'normal' });
  // por delante: la peña nevada con un arbusto seco y el pino grande con sus ramas bajas
  R.poligono([[56, 160], [60, 124], [72, 114], [90, 116], [102, 130], [104, 160]], K); R.poligono([[58, 159], [62, 125], [73, 116], [89, 118], [100, 131], [102, 159]], hex('#7a6a7a'));
  R.poligono([[62, 126], [73, 117], [89, 119], [99, 130], [86, 126], [74, 125]], hex('#f8ecec')); for (let k = 0; k < 5; k++) R.linea(66 + k * 7, 140 + (k & 1) * 6, 70 + k * 7, 156, hex('#5a4a5a'));
  for (let k = 0; k < 5; k++) R.linea(98, 132, 104 + k * 2, 122 + k * 2, hex('#4a3020'));
  for (let y = 0; y < 165; y++) for (let x = 204; x <= 232; x++) { const e = x === 204 || x === 232; const v = (x * 3 + Math.floor(y / 5) * 5) % 7; R.pset(x, y, e ? K : v === 0 ? hex('#24180f') : x < 210 ? hex('#7a5a48') : x > 226 ? hex('#3a2a1e') : hex('#5a4030')); }
  for (const [y, l] of [[40, 30], [70, 24], [100, 18]]) { R.rect(232, y, 232 + l, y + 2, hex('#3a2a1e')); R.rect(232, y - 2, 232 + l, y - 1, hex('#f8ecec')); for (let x = 234; x < 232 + l; x += 4) R.linea(x, y + 3, x + 1, y + 7, hex('#24402e')); }
  R.poligono([[196, 166], [204, 158], [232, 158], [242, 166]], hex('#f8ecec'));
};

// ── 8 · la ciudad de Doom: sale al balcón ──────────────────────────────────────────────────────────────────────────
const p8 = (t) => {
  const o = { encuadre: 'doomstadt' };
  const gd = T.latveria(R, t, o);
  const bx = gd.balcon ? Math.round((gd.balcon.x0 + gd.balcon.x1) / 2) : 160, byy = gd.balcon?.y ?? 60;
  const sale = tramo(t, mascaraV - 0.8, mascaraV), fl = tramo(t, mascaraV - 0.1, mascaraV + 0.2) * (1 - tramo(t, mascaraV + 0.8, mascaraV + 1.6));
  // el ventanal se enciende cuando va a salir: Doom se recorta, oscuro, contra la luz verde (así se lee de lejos)
  const enc = tramo(t, mascaraV - 1.2, mascaraV - 0.6);
  if (enc > 0) { luz(bx, byy - 12, 16, hex('#c8ffd0'), 0.55 * enc + 0.25 * fl); luz(bx, byy - 8, 30, hex('#5ae87a'), 0.25 * enc); }
  if (fl > 0) luz(bx, byy - 10, 24, hex('#a8ffb0'), 0.5 * fl);
  if (sale > 0) { const x = Math.round(bx - 7), y = Math.round(lerp(byy + 8, byy, ease(sale)));
    // la capa verde que el viento abre a su espalda
    for (let k = 0; k < 6; k++) { const cy2 = y - 12 + k * 2, ex = Math.round(4 + k * 0.6 + Math.sin(t * 7 - k * 0.8) * 1.5); R.linea(x + 2 - ex, cy2, x + 3, cy2, k % 2 ? hex('#1e5a2e') : hex('#2a7a3e')); R.pset(x + 2 - ex, cy2, K); }
    const r = R.actor(EL.doom, x, y, t, { dir: 1, dedo: t > dieciocho - 0.6 && t < dieciocho + 1.2, enfado: t > mascaraV });
    if (t > mascaraV && Math.floor(t * 3) % 4 !== 0) { R.pset(r.cabeza[0] + 1, r.cabeza[1] + 6, hex('#a8ffb0')); R.pset(r.cabeza[0] + 4, r.cabeza[1] + 6, hex('#a8ffb0')); }
    R.rect(bx - 12, byy, bx + 12, byy + 2, K); R.rect(bx - 11, byy, bx + 11, byy + 1, hex('#5a5a66')); for (let k = -10; k <= 10; k += 4) R.rect(bx + k, byy - 6, bx + k + 1, byy, hex('#3a3a44')); R.rect(bx - 12, byy - 7, bx + 12, byy - 6, hex('#3a3a44')); }
  // dos vecinos en la calle miran arriba y se apartan cuando sale
  const asusta = t > mascaraV;
  R.actor(T.VD.romaniVD, Math.round(120 - tramo(t, mascaraV, mascaraV + 1) * 18), 170, t, { dir: 1, anda: asusta && t < mascaraV + 1, sorpresa: asusta, dedo: !asusta && t > P8 + 0.6 });
  R.actor(T.VD.romaniMujerVD, Math.round(184 + tramo(t, mascaraV + 0.2, mascaraV + 1.2) * 18), 170, t, { dir: asusta ? 1 : -1, anda: asusta && t < mascaraV + 1.2, sorpresa: asusta });
  T.latveriaDelante(R, t, o);
  // Atom de luciérnaga sube por la calle y, en «December 18th», levanta una hoja de calendario con el 18
  const ua = tramo(t, P8, P8 + 1.6), ax = 238, ay = Math.round(lerp(176, 136, ease(ua))) + Math.sin(t * 2.2) * 2;
  T.AT.luciernaga(R, ax, ay, t, { dir: -1, brillo: 0.8, cara: asusta ? 'sorpresa' : 'normal' });
  const hj = tramo(t, dieciocho - 0.3, dieciocho + 0.2);
  if (hj > 0) { const cx = ax, cy = Math.round(ay - 18 - hj * 8); R.rect(cx - 10, cy - 12, cx + 10, cy + 10, K); R.rect(cx - 9, cy - 11, cx + 9, cy + 9, hex('#fbf6e8')); R.rect(cx - 9, cy - 11, cx + 9, cy - 6, hex('#c83a2a'));
    R.pset(cx - 5, cy - 13, K); R.pset(cx + 5, cy - 13, K); R.numero('18', cx + 1, cy + 7, { tam: 8, centro: true, color: K, sombra: false }); }
};

// ── 9 · el cine: la cuenta atrás y la máscara ──────────────────────────────────────────────────────────────────────
const p9 = (t) => {
  const o = { encuadre: 'sala', camara: 'butacas', pantalla: false, lleno: 0.85 };
  const gs = T.salas(R, t, o);
  const [x0, y0, x1, y1] = gs.pantalla ?? [60, 20, 260, 110], cx = Math.round((x0 + x1) / 2), cy = Math.round((y0 + y1) / 2);
  R.recorte([x0, y0, x1, y1]);
  const cuenta = tramo(t, P9, cara - 0.15);
  if (t < cara - 0.15) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (x + y) % 2 ? hex('#c8c0a8') : hex('#b8b098'));
    const num = 3 - Math.min(2, Math.floor(cuenta * 3)), a = (cuenta * 3 % 1) * Math.PI * 2;
    R.anillo(cx, cy, 22, hex('#3a3430')); R.anillo(cx, cy, 16, hex('#3a3430')); R.linea(x0, cy, x1, cy, hex('#6a6458')); R.linea(cx, y0, cx, y1, hex('#6a6458'));
    for (let r = 0; r < 22; r++) R.pset(Math.round(cx + Math.cos(a - Math.PI / 2) * r), Math.round(cy + Math.sin(a - Math.PI / 2) * r), hex('#2a2420'));
    R.numero(String(num), cx + 1, cy + 8, { tam: 16, centro: true }); }
  else { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, H(x >> 1, y >> 1, Math.floor(t * 8)) > 0.97 ? hex('#3a3a48') : ((x + y) & 3) ? hex('#10121c') : hex('#181c2a'));
    const ap = tramo(t, cara - 0.15, cara + 0.6), s = Math.max(2, Math.floor(Math.min((x1 - x0) / 14, (y1 - y0) / 17)));
    if (ap > 0) { luz(cx, cy, Math.round(20 + 20 * ap), hex('#6a7a9a'), 0.4 * ap); T.c_mascara(R, cx, cy, 0, s, t); }
    const ojo = tramo(t, doomsday - 0.1, doomsday + 0.3); if (ojo > 0) { for (const dx of [-0.22, 0.22]) { const ex = Math.round(cx + dx * 12 * s), ey = Math.round(cy - 0.12 * 15 * s); luz(ex, ey, 8 + Math.round(ojo * 6), hex('#a8ffb0'), 0.7 * ojo); R.rect(ex - s, ey, ex + s, ey, hex('#e8ffe8')); } } }
  R.recorte(null);
  T.AT.luciernaga(R, Math.round(lerp(250, 214, tramo(t, P9, P10))), Math.round(132 + Math.sin(t * 2.1) * 3), t, { dir: -1, brillo: 0.7, cara: t > cara ? 'sorpresa' : 'normal' });
  T.salasDelante(R, t, o);
  // la luz de la pantalla sobre las cabezas: cálida y parpadeante en la cuenta atrás, fría y verde con la máscara
  const pc = t < cara - 0.15 ? (Math.floor(t * 6) % 2 ? 0.16 : 0.1) : 0.12 + 0.18 * tramo(t, doomsday - 0.1, doomsday + 0.3);
  luz(cx, 150, 70, t < cara - 0.15 ? hex('#e8dcb8') : hex('#8affa8'), pc);
  // un cubo de palomitas en la fila de delante: con la máscara da un respingo y las palomitas saltan
  const sx = 96, sy = 166, bote = tramo(t, cara, cara + 1.1);
  R.poligono([[sx - 5, sy - 9], [sx + 5, sy - 9], [sx + 4, sy + 2], [sx - 4, sy + 2]], K); R.poligono([[sx - 4, sy - 8], [sx + 4, sy - 8], [sx + 3, sy + 1], [sx - 3, sy + 1]], hex('#f4ece0'));
  for (const dx of [-2, 1]) R.linea(sx + dx, sy - 8, sx + dx, sy + 1, hex('#c83a2a'));
  for (let k = 0; k < 7; k++) R.disco(sx - 4 + k * 1.4, sy - 10 - (k % 2), 1, (k % 3) ? hex('#fff4c8') : hex('#f0d070'));
  if (bote > 0 && bote < 1) for (let k = 0; k < 9; k++) { const vx2 = (H(k, 61) - 0.5) * 30, vy = 26 + H(k, 62) * 16, f = bote * 1.1, px = Math.round(sx + vx2 * f), py = Math.round(sy - 10 - vy * f + 40 * f * f);
    if (py < sy + 4) { R.pset(px, py, hex('#fff4c8')); R.pset(px + 1, py, hex('#f0d070')); } }
};

// ── 10 · la sala del trono y, por dentro, la máscara ──────────────────────────────────────────────────────────────
const p10 = (t) => {
  const cierra = tramo(t, dentro - 0.15, dentro + 0.9);
  if (cierra < 0.35) {
    const o = { encuadre: 'trono' };
    const gt = T.latveria(R, t, o);
    R.actor(EL.doom, 153, 124, t, { dir: -1, dedo: t > vida + 0.6 && t < dentro - 0.2 });
    const ua = tramo(t, P10 + 0.1, vida), ax = Math.round(lerp(58, 112, ease(ua)));
    T.AT.atom(R, ax, 172, t, { s: 2, dir: 1, pose: ua > 0 && ua < 1 ? 'camina' : t > vida && t < dentro - 0.3 ? 'senala' : 'quieto', cara: t > vida + 0.6 ? 'sorpresa' : 'normal', habla: voz(t) });
    T.latveriaDelante(R, t, o);
  } else {
    const o = { encuadre: 'campamento' };
    T.latveria(R, t, o); T.latveriaDelante(R, t, o);
  }
  if (cierra > 0) {
    // el hierro por dentro: la placa abombada (más clara arriba, donde le da la luz de las rendijas), la arista de la
    // nariz entre los ojos, el acolchado de cuero con su pespunte abajo y los remaches; las dos rendijas se cierran
    const e = ease(cierra), ry = lerp(120, 20, e), rx = lerp(230, 66, e), cy = 80, c1 = 96, c2 = 224;
    const FE = [hex('#16171d'), hex('#1e2028'), hex('#282a34'), hex('#343744'), hex('#44485a')];
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      const q1 = Math.abs(x - c1) / rx + ((y - cy) / ry) ** 2, q2 = Math.abs(x - c2) / rx + ((y - cy) / ry) ** 2, q = Math.min(q1, q2);
      if (q < 1) continue;
      let c;
      if (q < 1.1) c = y < cy ? hex('#9a9eac') : hex('#5a5e6c');
      else if (q < 1.22) c = K;
      else if (y > 126) { const dx = (x + (y - 126)) % 18, dy = (x - (y - 126) + 180) % 18; c = dx === 0 || dy === 0 ? hex('#1a120e') : (dx === 1 || dy === 1) && ((x + y) & 1) ? hex('#8a6a4a') : ((x * 3 + y) % 7 === 0 ? hex('#3a2a20') : hex('#2e2219')); if (y === 127 || y === 128) c = y === 127 ? K : hex('#5a5e6c'); }
      else { const lz = 3 - Math.min(3, Math.hypot((x - 160) / 150, (y - 70) / 90) * 3) + (Math.abs(x - 160) < 4 ? 1 : 0); c = FE[Math.max(0, Math.min(4, Math.floor(lz + bay(x, y) * 0.9)))]; if (Math.abs(x - 160) === 4 && y < 126) c = K; }
      R.pset(x, y, c);
    }
    if (cierra > 0.6) for (const [x, y] of [[24, 24], [24, 104], [112, 18], [208, 18], [296, 104], [60, 140], [260, 140], [160, 112]]) { R.disco(x, y, 3, hex('#0e0e14')); R.disco(x, y, 2, hex('#6a6e7c')); R.pset(x - 1, y - 1, hex('#c8ccd8')); }
  }
};

const efectos = [[madre, 'trueno'], [P2 + 0.2, 'viento'], [rodillas, 'pasos'], [P3 + 0.1, 'rafaga'], [P4 + 0.2, 'cerrojo'], [n(0.45), 'guau'], [antorchasV, 'whoosh'],
  [P5 + 0.1, 'viento'], [para, 'pasos'], [envuelve, 'whoosh'], [despacio + 0.4, 'brillo'], [P7 + 0.3, 'pajaros'], [mascaraV, 'trueno'], [dieciocho, 'campana'],
  [P9 + 0.1, 'tic'], [P9 + 0.6, 'tic'], [P9 + 1.1, 'tic'], [cara, 'brillo'], [cara + 0.1, 'pop'], [doomsday, 'zumbido'], [dentro + 0.85, 'cerrojo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10]], { efectos, año: (t) => (t >= P8 ? 2026 : null) });
''')

E['vd-aviso'] = ('El aviso', '''// VD-AVISO (frase 4), sin cartela; el estudio de Atom, hoy (2026). Tres planos:
// 1. la mesa del estudio de cerca: en «warning» Atom alza el cartel del ojo tapado; en «comics» se abre el tebeo de
//    arriba del montón; en «this year» la tiza escribe 2026 en la pizarra;
// 2. el estudio entero: Atom va a la puerta, señala el calendario con el 18 rodeado en «discover it yourself» y en
//    «save this video for later» cuelga el cartel en el pomo de un saltito, con un guiño;
// 3. el perchero del recibidor (fondo local): Atom entra con un abrigo pequeño de lana parda con su bufanda roja, lo
//    levanta en «save this too», lo cuelga y en «his father's coat» el abrigo se mece con una luz cálida.''', r'''
const a = (f) => en('aviso', f);
const P2 = a(0.3576), P3 = a(0.714);
const aviso = a(0.0072), comics = a(0.1842), year = a(0.3034), descubre = a(0.4419), guarda = a(0.5611), tambien = a(0.7405), abrigo = a(0.938);
const K = hex('#1a1424'), ease = (u) => u * u * (3 - 2 * u), voz = (t) => E.energia(t);
const H = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const ABR = hex('#6a4a30'), ABRS = hex('#4e3420'), ABRL = hex('#8a6440'), BUF = hex('#a8302a');
// el cartel del ojo tapado (sin letras): tarjeta blanca con borde, un ojo con pestañas y una venda oscura encima
const cartel = (x0, y0, w, hh) => {
  R.rect(x0, y0, x0 + w, y0 + hh, K); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, hex('#fbf6e8')); R.rect(x0 + 1, y0 + hh - 2, x0 + w - 1, y0 + hh - 1, hex('#e0d6bc'));
  const cx = x0 + Math.round(w / 2), cy = y0 + Math.round(hh / 2) + 1, rx = Math.round(w * 0.34), ry = Math.max(2, Math.round(hh * 0.24));
  for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) { const e = (x / rx) ** 2 + (y / ry) ** 2; if (e <= 1) R.pset(cx + x, cy + y, e > 0.62 ? K : hex('#ffffff')); }
  R.disco(cx, cy, Math.max(1, ry - 1), hex('#3a7ad8')); R.pset(cx, cy, K);
  for (let k = -2; k <= 2; k++) R.linea(cx + k * Math.round(rx / 2.5), cy - ry - 1, cx + k * Math.round(rx / 2.2), cy - ry - 3, K);
  const bh = Math.max(2, Math.round(hh * 0.18)); R.rect(x0 + 2, cy - Math.floor(bh / 2), x0 + w - 2, cy + Math.ceil(bh / 2) - 1, hex('#2a2a36'));
  R.rect(x0 + 2, cy - Math.floor(bh / 2), x0 + w - 2, cy - Math.floor(bh / 2), hex('#4a4a5a'));
  R.linea(x0 + w - 3, cy + 1, x0 + w - 1, cy + 4, hex('#2a2a36')); R.linea(x0 + w - 4, cy + 1, x0 + w - 5, cy + 4, hex('#2a2a36'));
};
// el abrigo pequeño (lana parda, la bufanda roja al cuello, botones dorados), colgado por su presilla del gancho (cx, cy),
// a escala s; ang: el vaivén (el bajo se va hacia un lado)
const abriguito = (cx, cy, s, ang = 0) => {
  const tr = ([u, v]) => [Math.round(cx + (u + ang * v * 0.22) * s), Math.round(cy + 3 * s + v * s)];
  const parte = (pts, c) => { const P = pts.map(tr), mx = P.reduce((a, p) => a + p[0], 0) / P.length, my = P.reduce((a, p) => a + p[1], 0) / P.length;
    R.poligono(P, K); R.poligono(P.map(([x, y]) => [x + Math.sign(mx - x), y + Math.sign(my - y)]), c); };
  R.linea(cx, cy, tr([-1, 0])[0], tr([-1, 0])[1], K); R.linea(cx, cy, tr([1, 0])[0], tr([1, 0])[1], K);
  parte([[-8, 4], [-5, 2], [-5, 17], [-9, 17]], ABRS); parte([[8, 4], [5, 2], [5, 17], [9, 17]], ABR);   // las mangas
  parte([[-5, 0], [5, 0], [7, 21], [-7, 21]], ABR);                                                     // el cuerpo
  const L = [tr([-4, 2]), tr([-1, 2]), tr([-2, 20]), tr([-6, 20])]; R.poligono(L, ABRL);
  for (const u of [-3, 3, 5]) { const p0 = tr([u, 6]), p1 = tr([u + (u > 0 ? 1 : -1), 20]); R.linea(p0[0], p0[1], p1[0], p1[1], ABRS); }
  { const p0 = tr([0, 2]), p1 = tr([0, 21]); R.linea(p0[0], p0[1], p1[0], p1[1], K); }
  for (const v of [7, 12, 17]) { const [x, y] = tr([1.2, v]); R.rect(x, y, x + 1, y + 1, hex('#e8c060')); R.pset(x, y, hex('#fff0a0')); }
  for (const [u, v] of [[-8.5, 16], [8.5, 16]]) { const [x, y] = tr([u, v]); R.rect(x - 1, y, x + 2, y + 1, ABRS); }
  parte([[-6, -1], [6, -1], [6, 2], [-6, 2]], BUF); { const [x0, y0] = tr([-5, 1]), [x1] = tr([5, 1]); R.linea(x0, y0, x1, y0, hex('#7a1e1a')); }
  parte([[2, 1], [4, 1], [4.5, 11], [2.5, 11]], BUF); { const [x, y] = tr([3.2, 11]); for (let k = -1; k <= 1; k++) R.linea(x + k, y + 1, x + k, y + 3, hex('#7a1e1a')); }
};

// 1 · la mesa de cerca: el cartel, los tebeos y la pizarra
const q1 = (t) => {
  const o = { encuadre: 'estudio', camara: 'mesa', pizarra: (R, t, [x0, y0, x1, y1]) => {
    const u = tramo(t, year - 0.4, year + 0.5); if (u > 0) R.numero('2026', Math.round((x0 + x1) / 2), Math.round((y0 + y1) / 2) + 5, { tam: 16, centro: true, n: Math.round(u * 64), color: hex('#e8ece0') });
    if (t > year + 0.6) for (let x = x0 + 18; x < x1 - 18; x++) R.pset(x, y1 - 3 + ((x >> 2) & 1), hex('#d8dcd0')); } };
  const gm = T.estudio(R, t, o);
  // el montón de tebeos (portadas de colores, sin letras); el de arriba se abre en «comics»
  const bx = 196, by = 146;
  [['#c83a3a', '#f0c040'], ['#3a6ac8', '#e8e8f0'], ['#2e7a3e', '#f0d080'], ['#7a3a9a', '#f0a040'], ['#e88a2a', '#3a3a6a']].forEach(([c1, c2], k) => {
    const y = by - k * 4, dx = (k % 2) * 2; R.rect(bx - 15 + dx, y - 4, bx + 15 + dx, y, K); R.rect(bx - 14 + dx, y - 3, bx + 14 + dx, y - 1, hex(c1)); R.rect(bx - 10 + dx, y - 3, bx - 4 + dx, y - 2, hex(c2)); R.rect(bx + 14 + dx, y - 3, bx + 14 + dx, y - 1, hex('#f2eee2')); });
  const ab = tramo(t, comics - 0.2, comics + 0.4), ty = by - 22;
  R.rect(bx - 15, ty - 2, bx + 15, ty + 2, K); R.rect(bx - 14, ty - 1, bx + 14, ty + 1, hex('#f2eee2'));
  if (ab < 1) { const w = Math.round(28 * (1 - ab)); R.rect(bx - 14, ty - 6, bx - 14 + w, ty - 1, K); R.rect(bx - 13, ty - 5, bx - 15 + w, ty - 2, hex('#2e7a3e')); if (w > 12) { R.disco(bx - 4, ty - 4, 2, hex('#a8acbc')); R.rect(bx - 12, ty - 5, bx - 9, ty - 2, hex('#f0d080')); } }
  else { const cols = ['#3a6ac8', '#e8b030', '#c83a3a', '#2e7a3e', '#e88a2a', '#7a3a9a'];
    for (let k = 0; k < 6; k++) { const x = bx - 13 + (k % 3) * 9 + (k > 2 ? 0 : 0), y = ty - 12 + Math.floor(k / 3) * 6; R.rect(x, y, x + 7, y + 4, K); R.rect(x + 1, y + 1, x + 6, y + 3, hex(cols[k])); R.pset(x + 2 + (k % 2), y + 2, hex('#fbf6e8')); }
    R.rect(bx - 14, ty - 13, bx + 14, ty - 13, K); R.linea(bx, ty - 13, bx, ty, hex('#c8c0a8')); }
  // Atom coge el cartel de la mesa y lo alza por encima de la cabeza en «warning»; lo deja apoyado en el reloj de arena,
  // señala los tebeos en «comics» y, en «this year», se vuelve hacia la pizarra donde la tiza escribe 2026
  const alza = tramo(t, aviso - 0.15, aviso + 0.35), deja = tramo(t, comics - 0.7, comics - 0.2), arriba = alza > 0.3 && deja < 0.4;
  const pose = arriba ? 'brazos' : t < aviso - 0.15 ? 'quieto' : deja >= 1 && t < year - 0.3 ? 'senala' : deja >= 1 ? 'brazos' : 'sostiene';
  const r = T.AT.atom(R, 154, 150, t, { s: 2, dir: deja >= 1 && t > year - 0.3 ? -1 : 1, pose, cara: t < comics ? 'sorpresa' : 'sonrisa', habla: voz(t) });
  if (arriba) { const mx = Math.round((r.mano[0] + r.mano1[0]) / 2), my = Math.round(Math.min(r.mano[1], r.mano1[1])); R.rect(mx - 1, my - 6, mx + 1, my + 2, K); R.rect(mx, my - 6, mx, my + 2, hex('#8a5a30')); cartel(mx - 24, my - 32, 48, 28); }
  else { const apoyado = t < aviso - 0.15 || deja >= 1; const x0 = apoyado ? 110 : Math.round(lerp(r.mano[0] - 24, 110, deja)), y0 = apoyado ? 120 : Math.round(lerp(r.mano[1] - 30, 120, deja));
    R.linea(x0 + 6, y0 + 28, x0 + 2, y0 + 30, K); cartel(x0, y0, 40, 26); }
  T.estudioDelante(R, t, o);
};

// 2 · el estudio entero: el calendario y el cartel en el pomo
const q2 = (t) => {
  // en la pizarra, a tiza: la máscara de hierro, una flecha y un rollo de película (lo que viene el 18)
  const o = { encuadre: 'estudio', pizarra: (R, t, [x0, y0, x1, y1]) => { const T2 = hex('#e8ece0'), T3 = hex('#b8c0b0'), mx = x0 + 26, my = Math.round((y0 + y1) / 2);
    R.linea(mx - 9, my - 12, mx + 9, my - 12, T2); R.linea(mx - 9, my - 12, mx - 11, my + 6, T2); R.linea(mx + 9, my - 12, mx + 11, my + 6, T2); R.linea(mx - 11, my + 6, mx - 4, my + 14, T2); R.linea(mx + 11, my + 6, mx + 4, my + 14, T2); R.linea(mx - 4, my + 14, mx + 4, my + 14, T2);
    R.linea(mx - 7, my - 4, mx - 2, my - 4, T2); R.linea(mx + 2, my - 4, mx + 7, my - 4, T2); R.linea(mx, my - 3, mx, my + 5, T3); R.linea(mx - 4, my + 9, mx + 4, my + 9, T2);
    R.linea(mx + 18, my, mx + 34, my, T2); R.linea(mx + 30, my - 4, mx + 34, my, T2); R.linea(mx + 30, my + 4, mx + 34, my, T2);
    const fx = mx + 50; for (let k = 0; k < 3; k++) { const yy = my - 12 + k * 9; R.linea(fx, yy, fx + 14, yy, T2); R.linea(fx, yy + 7, fx + 14, yy + 7, T2); R.linea(fx, yy, fx, yy + 7, T2); R.linea(fx + 14, yy, fx + 14, yy + 7, T2); R.pset(fx - 2, yy + 3, T3); R.pset(fx + 16, yy + 3, T3); }
    R.numero('18', fx + 8, my + 22, { tam: 8, centro: true, color: T2, sombra: false }); } };
  const gs = T.estudio(R, t, o);
  // el calendario de la puerta, con el 18 rodeado de rojo
  const kx = 10, ky = 66, hoja = Math.sin(t * 1.3) > 0.85 ? 1 : 0; R.rect(kx, ky, kx + 28, ky + 30, K); R.rect(kx + 1, ky + 1, kx + 27, ky + 29, hex('#fbf6e8')); R.rect(kx + 1, ky + 1, kx + 27, ky + 7, hex('#c83a2a')); R.rect(kx + 1, ky + 7, kx + 27, ky + 7, hex('#8a1e1a'));
  R.pset(kx + 7, ky - 1, K); R.pset(kx + 21, ky - 1, K); R.rect(kx + 1, ky + 29, kx + 27 - hoja * 3, ky + 29, hex('#e0d6bc'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) if (!(j >= 1 && j <= 2 && i >= 2 && i <= 4)) R.rect(kx + 3 + i * 4, ky + 10 + j * 5, kx + 4 + i * 4, ky + 11 + j * 5, hex('#a8a090'));
  const ro = tramo(t, descubre - 0.1, descubre + 0.5); R.numero('18', kx + 15, ky + 23, { tam: 8, centro: true, color: K, sombra: false });
  if (ro > 0) for (let k = 0; k < 32 * ro; k++) { const p = k / 32 * Math.PI * 2 - Math.PI / 2; for (const dr of [0, 1]) R.pset(Math.round(kx + 14 + Math.cos(p) * (10 + dr)), Math.round(ky + 19 + Math.sin(p) * (7 + dr)), hex('#e8302a')); }
  // Atom va hasta la puerta, señala el 18 y cuelga el cartel en el pomo con un saltito
  const ua = tramo(t, P2 + 0.1, descubre - 0.3), ax = Math.round(lerp(170, 64, ease(ua))), salto = Math.sin(Math.PI * tramo(t, guarda - 0.3, guarda + 0.3)) * 12, colgado = t > guarda;
  const r = T.AT.atom(R, ax, 160 - Math.round(salto), t, { s: 2, dir: -1, pose: ua > 0 && ua < 1 ? 'camina' : t > descubre - 0.2 && t < guarda - 0.4 ? 'senala' : !colgado ? 'sostiene' : 'quieto', cara: colgado && t > guarda + 0.4 ? 'guino' : 'normal', habla: voz(t) });
  if (!colgado) { const mx = Math.round(r.mano[0]), my = Math.round(r.mano[1]); cartel(mx - 20, my - 8, 20, 12); }
  else { const px = 36, py = 100; R.linea(px, py, px - 5, py + 6, K); R.linea(px, py, px + 5, py + 6, K); const sw = Math.round(Math.sin((t - guarda) * 6) * 2 * Math.max(0, 1 - (t - guarda) / 1.5)); cartel(px - 11 + sw, py + 6, 22, 14); }
  T.estudioDelante(R, t, o);
};

// 3 · el perchero del recibidor (fondo local)
let B3 = null;
const fondo3 = () => {
  if (B3) return B3;
  B3 = R.nuevo(); const prev = R.usar(B3);
  // la pared de ladrillo del estudio, con su moldura y su zócalo de madera; el techo de vigas arriba
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 6), off = (fila & 1) * 9, junta = y % 6 === 5 || (x + off) % 18 === 17;
    const tono = H(Math.floor((x + off) / 18), fila, 1); R.pset(x, y, junta ? hex('#5a3a30') : tono > 0.8 ? hex('#a85a42') : tono > 0.35 ? hex('#944a38') : hex('#84402f')); if (!junta && H(x, y, 2) > 0.96) R.pset(x, y, hex('#b86a50')); }
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 13 ? K : (x % 64 < 3 ? hex('#3a2416') : y < 3 ? hex('#4a2e1c') : (H(x >> 3, y, 3) > 0.9 ? hex('#5a3a24') : hex('#6a4428'))));
  for (let x = 0; x < 320; x++) { R.pset(x, 104, K); R.pset(x, 105, hex('#c89a6a')); R.pset(x, 106, hex('#8a5a3a')); }
  for (let y = 107; y < 132; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 40 === 0 ? K : x % 40 === 1 ? hex('#a87a50') : y === 131 ? K : (H(x >> 2, y, 4) > 0.9 ? hex('#6a4428') : hex('#7a5034')));
  // el suelo de tablas con su alfombra de dibujo
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((x + (y - 132) * 0.0) / 26); R.pset(x, y, (x % 26 === 0) ? hex('#4a2e1c') : (y - 132) % 12 === 0 && (tabla & 1) ? hex('#4a2e1c') : H(x >> 1, y >> 2, tabla) > 0.85 ? hex('#8a5a34') : hex('#a06a3e')); }
  for (let y = 148; y < 172; y++) for (let x = 120; x < 270; x++) { const e = y === 148 || y === 171 || x === 120 || x === 269, b = y < 151 || y > 168 || x < 124 || x > 265; R.pset(x, y, e ? K : b ? hex('#2a4a7a') : ((x + y) % 8 < 2 ? hex('#e8c060') : (x - y) % 8 < 2 ? hex('#7a2a2a') : hex('#a83a3a'))); }
  // un cuadro de un paisaje nevado (montañas y un pino), la lámpara de pared con su tulipa, el paragüero y unas botas
  R.rect(40, 34, 92, 74, K); R.rect(41, 35, 91, 73, hex('#c8903a')); R.rect(44, 38, 88, 70, K);
  for (let y = 39; y < 70; y++) for (let x = 45; x < 88; x++) R.pset(x, y, y < 54 ? (y < 46 ? hex('#4a6aa8') : hex('#7a9ac8')) : hex('#e8ecf4'));
  R.poligono([[45, 58], [58, 44], [68, 54], [76, 46], [87, 58]], hex('#6a7898')); R.poligono([[56, 46], [58, 44], [61, 47]], hex('#ffffff')); R.poligono([[74, 48], [76, 46], [78, 49]], hex('#ffffff'));
  R.poligono([[64, 68], [68, 56], [72, 68]], hex('#24402e')); R.rect(67, 68, 68, 69, hex('#4a2e1c'));
  R.rect(250, 60, 252, 80, K); R.rect(244, 54, 258, 62, K); R.poligono([[243, 62], [259, 62], [255, 52], [247, 52]], hex('#e8c060')); R.rect(246, 54, 256, 58, hex('#f8e8a0'));
  R.rect(278, 112, 300, 146, K); R.rect(279, 113, 299, 145, hex('#3a5a6a')); for (let x = 281; x < 299; x += 4) R.rect(x, 114, x + 1, 144, hex('#2a4a5a')); R.rect(278, 112, 300, 114, hex('#c8903a'));
  R.linea(284, 112, 282, 82, K); R.linea(285, 112, 283, 82, hex('#2a2a36')); R.poligono([[276, 84], [282, 78], [290, 84]], hex('#2a6a4a')); R.disco(283, 80, 1, hex('#e8c060'));
  R.linea(292, 112, 296, 86, K); R.disco(296, 85, 2, hex('#8a5a30'));
  for (const bx of [24, 40]) { R.rect(bx, 150, bx + 12, 162, K); R.rect(bx + 1, 151, bx + 8, 161, hex('#3a2416')); R.rect(bx + 1, 158, bx + 12, 161, hex('#3a2416')); R.rect(bx + 2, 151, bx + 3, 157, hex('#5a3a24')); }
  R.rect(14, 160, 60, 166, K); R.rect(15, 161, 59, 165, hex('#6a5a3a')); for (let x = 17; x < 58; x += 3) R.pset(x, 163, hex('#8a7a4a'));
  // EL PERCHERO de pie, de madera torneada, con sus cuatro ganchos; en uno ya hay un sombrero y una bufanda gris
  R.rect(194, 40, 198, 156, K); R.rect(195, 40, 197, 156, hex('#6a4428')); R.rect(195, 40, 195, 156, hex('#8a5a34'));
  for (let y = 56; y < 150; y += 22) R.rect(193, y, 199, y + 2, hex('#4a2e1c'));
  R.poligono([[180, 160], [196, 150], [212, 160]], K); R.linea(182, 159, 196, 151, hex('#8a5a34')); R.linea(196, 151, 210, 159, hex('#6a4428'));
  R.disco(196, 37, 4, K); R.disco(196, 37, 3, hex('#8a5a34')); R.pset(195, 36, hex('#c89a6a'));
  for (const [x1, d] of [[182, -1], [210, 1]]) { R.linea(196, 46, x1, 42, K); R.linea(196, 47, x1, 43, hex('#6a4428')); R.disco(x1, 41, 1, hex('#c8903a')); }
  // el gancho bajo, a la altura de un niño, de latón
  R.rect(186, 114, 194, 116, K); R.rect(187, 115, 194, 115, hex('#c8903a')); R.rect(185, 110, 187, 116, K); R.pset(186, 111, hex('#e8c060'));
  // la repisa con un farol de vela, dos libros y una caja de hojalata; un reloj de pared redondo
  R.rect(100, 70, 166, 73, K); R.rect(101, 70, 165, 71, hex('#a87a50')); for (const x of [106, 158]) { R.linea(x, 73, x + 4, 80, K); R.linea(x + 1, 73, x + 5, 80, hex('#6a4428')); }
  R.rect(108, 54, 120, 69, K); R.rect(109, 55, 119, 68, hex('#3a3a46')); R.rect(110, 57, 118, 67, hex('#f8e0a0')); R.rect(113, 61, 115, 66, hex('#fbf6e8')); R.pset(114, 60, hex('#ff9a30')); R.poligono([[107, 54], [114, 49], [121, 54]], K); R.pset(114, 47, K);
  for (const [x, w, c] of [[126, 5, '#2e5a7a'], [132, 4, '#8a2a2a']]) { R.rect(x, 56, x + w, 69, K); R.rect(x + 1, 57, x + w - 1, 69, hex(c)); R.rect(x + 1, 60, x + w - 1, 60, hex('#e8c060')); }
  R.rect(142, 60, 160, 69, K); R.rect(143, 61, 159, 68, hex('#3a6a5a')); R.rect(143, 61, 159, 62, hex('#e8c060')); R.disco(151, 65, 2, hex('#c83a2a'));
  R.disco(70, 100, 9, K); R.disco(70, 100, 8, hex('#c8903a')); R.disco(70, 100, 6, hex('#fbf6e8'));
  for (let k = 0; k < 12; k++) { const p = k / 12 * Math.PI * 2; R.pset(Math.round(70 + Math.cos(p) * 5), Math.round(100 + Math.sin(p) * 5), hex('#8a7a6a')); }
  R.poligono([[204, 34], [216, 34], [218, 40], [202, 40]], K); R.rect(205, 35, 215, 39, hex('#3a3a4a')); R.rect(200, 40, 220, 42, K); R.rect(201, 40, 219, 41, hex('#2a2a36')); R.rect(205, 38, 215, 39, hex('#7a2a2a'));
  R.rect(208, 43, 212, 82, K); R.rect(209, 43, 211, 81, hex('#8a8e9a')); for (let y = 46; y < 80; y += 5) R.rect(209, y, 211, y + 1, hex('#6a6e7a')); for (let x = 208; x <= 212; x++) R.linea(x, 82, x, 86, x % 2 ? hex('#6a6e7a') : K);
  R.usar(prev); return B3;
};
const q3 = (t) => {
  R.copiar(fondo3());
  // las agujas del reloj de pared que avanzan
  { const pm = t * 0.6, pg = t * 0.05; R.linea(70, 100, Math.round(70 + Math.sin(pm) * 5), Math.round(100 - Math.cos(pm) * 5), K); R.linea(70, 100, Math.round(70 + Math.sin(pg) * 3), Math.round(100 - Math.cos(pg) * 3), hex('#8a2a2a')); }
  // la luz de la lámpara que tiembla un poco y las motas de polvo en su cono
  for (let j = 0; j < 40; j++) for (let i = -j; i <= j; i += 2) { const x = 251 + i + (j & 1), y = 62 + j * 2; if (((x + y) & 3) === 0 && Math.sin(t * 7) > -0.95) R.pset(x, y, hex('#c86a50')); }
  for (let k = 0; k < 8; k++) { const f = (t * 0.15 + k / 8) % 1; R.pset(Math.round(244 + k * 2 + Math.sin(t + k) * 3), Math.round(140 - f * 70), hex('#f8e8a0')); }
  // Atom llega con el abrigo pequeño en brazos, lo levanta para enseñarlo en «save this too», lo cuelga de un saltito
  // en el gancho bajo y, en «his father's coat», el abrigo se mece con una luz cálida y Atom lo mira
  const ua = tramo(t, P3 + 0.05, tambien + 0.6), atras = tramo(t, tambien + 1.7, tambien + 2.4), ax = Math.round(lerp(96, 168, ease(ua)) - ease(atras) * 26), levanta = t > tambien - 0.15 && t < tambien + 1.0;
  const cuelga = tramo(t, tambien + 1.0, tambien + 1.5), colgado = t > tambien + 1.5, salto = Math.round(Math.sin(Math.PI * tramo(t, tambien + 0.95, tambien + 1.6)) * 12);
  const r = T.AT.atom(R, ax, 160 - salto, t, { s: 2, dir: atras > 0 && atras < 1 ? -1 : 1, pose: !colgado && (levanta || cuelga > 0) ? 'brazos' : (ua > 0 && ua < 1) ? 'sostiene' : atras > 0 && atras < 1 ? 'camina' : t > abrigo - 0.2 ? 'piensa' : 'quieto', cara: t > abrigo ? 'triste' : 'sonrisa', habla: voz(t) });
  const ang = colgado ? Math.sin((t - tambien - 1.5) * 3.2) * Math.max(0.2, 1 - (t - tambien - 1.5) / 2) + (t > abrigo ? Math.sin(t * 2.2) * 0.35 : 0) : 0;
  if (!colgado) { const brazos = levanta || cuelga > 0, mx = Math.round(brazos ? (r.mano[0] + r.mano1[0]) / 2 : r.mano[0]), my = Math.round(r.mano[1]);
    abriguito(Math.round(lerp(mx, 186, cuelga)), Math.round(lerp(brazos ? my - 4 : my - 6, 112, cuelga)), 1.5, 0); }
  else abriguito(186, 112, 1.5, ang);
  const lz = tramo(t, abrigo - 0.2, abrigo + 0.4); if (lz > 0) { for (let j = -24; j <= 24; j++) for (let i = -20; i <= 20; i++) { const q = Math.hypot(i / 20, j / 24); if (q < 1 && q > 0.7 && ((i + j + Math.floor(t * 4)) & 3) === 0) R.pset(186 + i, 132 + j, hex('#ffe8a0')); }
    for (let k = 0; k < 6; k++) { const f = (t * 0.5 + k / 6) % 1; R.pset(Math.round(178 + k * 3 + Math.sin(t * 2 + k) * 2), Math.round(150 - f * 40), hex('#fff0b0')); } }
};

const efectos = [[aviso + 0.1, 'papel'], [comics, 'papel'], [year - 0.3, 'lapiz'], [descubre, 'lapiz'], [guarda, 'cuelga'], [tambien, 'whoosh'], [tambien + 1.5, 'cuelga'], [abrigo, 'brillo']];
T.rodar(E, R, [[0, q1], [P2, q2], [P3, q3]], { efectos, año: 2026 });
''')
