E = {}

# Piezas pequeñas que comparten las cuatro escenas (cada escena es su propio .html y las lleva dentro). Fondos locales:
# fijo() pinta una vez en un búfer; pegar() lo pone encima saltándose lo transparente (dos recorridos por fotograma).
AUX = r'''
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bay = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const H = (s) => hex(s);
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const az = (k) => { const s = Math.sin(k * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const FIJO = {};
const fijo = (clave, pinta) => { let b = FIJO[clave]; if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); FIJO[clave] = b; } return b; };
const pegar = (b) => { const B = R.buf; for (let i = 0; i < B.length; i++) { const c = b[i]; if (c) B[i] = c; } };
// degradado tramado de arriba abajo entre los tonos de pal (y0..y1)
const degradado = (y0, y1, pal, x0 = 0, x1 = 319) => { const n = pal.length - 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, k = Math.min(n - 1, Math.floor(u)), f = u - k; for (let x = x0; x <= x1; x++) R.pset(x, y, f > bay(x, y) ? pal[k + 1] : pal[k]); } };
// nube de tres tonos (luz, cuerpo, sombra) con la base plana y el canto tramado
const nube3 = (cx, cy, w, [cL, cM, cS]) => { cx = Math.round(cx); cy = Math.round(cy);
  const B = [[0, 0, 0.3], [-0.3, 0.07, 0.22], [0.3, 0.06, 0.24], [-0.1, -0.12, 0.25], [0.14, -0.09, 0.2], [0.44, 0.1, 0.14], [-0.44, 0.1, 0.13]];
  for (const [dx, dy, r] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), Math.round(r * w), cS);
  for (const [dx, dy, r] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w - 1), Math.round(r * w * 0.86), cM);
  for (const [dx, dy, r] of B) if (dy <= 0.02) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 3), Math.round(r * w * 0.55), cL);
  const yb = Math.round(cy + w * 0.17); for (let x = Math.round(cx - w * 0.52); x <= cx + w * 0.52; x++) { R.pset(x, yb, cS); R.pset(x, yb + 1, cS); if ((x & 1) === 0) R.pset(x, yb - 1, cS); } };
const nubes = (t, lista, cols) => { for (const [x0, y, w, v] of lista) nube3(((x0 + t * v) % 420 + 420) % 420 - 50, y, w, cols); };
// pájaros pequeños que cruzan (uve que aletea)
const aves = (t, n, y0, v, col, sem = 0) => { for (let k = 0; k < n; k++) { const x = Math.round(((az(k + sem) * 400 + t * v * (0.8 + az(k + 9 + sem) * 0.4)) % 400) - 40), y = Math.round(y0 + az(k + 3 + sem) * 18 + Math.sin(t * 1.3 + k) * 2), a = Math.sin(t * 10 + k * 2) > 0 ? 1 : 0;
  if (x > 270 && y < 48) continue; R.pset(x, y, col); R.pset(x - 1, y - a, col); R.pset(x + 1, y - a, col); R.pset(x - 2, y - 2 * a + (a ? 0 : 1), col); R.pset(x + 2, y - 2 * a + (a ? 0 : 1), col); } };
// columna de humo que sube y se tuerce con el viento (lejos, gris); w: hacia dónde sopla
const humo = (x, y, t, h, c1, c2, w = -1, n = 9) => { for (let k = 0; k < n; k++) { const u = (t * 0.12 + k / n) % 1, yy = Math.round(y - u * h), xx = Math.round(x + Math.sin(u * 4 + k) * 2 + w * u * u * 26), r = Math.round(2 + u * 6);
  R.disco(xx, yy, r, u > 0.5 ? c2 : c1); R.disco(xx - w, yy - 1, Math.max(1, r - 2), u > 0.3 ? c2 : mez(c1, c2, 0.5)); } };
// gente pequeña de fondo (unos 8 px): o.vitorea levanta los brazos; o.col: casaca
const GCOL = ['#2a3a6a', '#6a5a3a', '#5a3a2a', '#3a4a3a', '#7a2a2a', '#4a4a5a', '#8a6a3a'], GPIEL = ['#f0c8a0', '#d8a078', '#a87050', '#f0c8a0'];
const gentecita = (x, y, t, k, o = {}) => { x = Math.round(x); y = Math.round(y); const c = H(o.col ?? GCOL[k % GCOL.length]), p = H(GPIEL[k % 4]), d = H('#1c1424'), b = Math.sin(t * 6 + k * 1.7) > 0.3 ? 1 : 0;
  R.pset(x - 1, y, d); R.pset(x + 1, y, d); R.rect(x - 1, y - 4, x + 1, y - 1, c); R.pset(x - 1, y - 4, mez(c, H('#ffffff'), 0.25)); R.rect(x - 1, y - 6, x + 1, y - 5, p);
  if (o.sombrero !== false) { R.rect(x - 2, y - 7, x + 2, y - 7, d); R.pset(x, y - 8, d); }
  if (o.vitorea) { R.pset(x - 2, y - 6 - b, p); R.pset(x + 2, y - 6 - b, p); R.pset(x - 2, y - 5 - b, c); R.pset(x + 2, y - 5 - b, c); } };
// un barco británico de tres palos de perfil (x, y: el centro en la línea del agua; s 1 ≈ 44 px de eslora)
// o.dir 1: proa a la derecha; o.velas 0–1 (aferradas → hinchadas); o.bruma 0–1 (lejos); o.bandera: 'roja' | 'union'
const barco = (x, y, s, t, o = {}) => {
  const d = o.dir ?? 1, v = o.velas ?? 1, br = o.bruma ?? 0, cb = H(o.colBruma ?? '#b8c4d4'), tn = (c) => (br > 0 ? mez(H(c), cb, br) : H(c));
  const bal = Math.sin(t * 1.4 + x * 0.05), X = (u) => Math.round(x + d * u * s), Y = (u) => Math.round(y + u * s + bal * 0.6 * Math.min(1, s));
  const casco = tn('#3e2616'), cascoL = tn('#6a4428'), franja = tn('#c8a040'), negro = tn('#1c1222'), vela = tn('#f2ece0'), velaS = tn('#c8bca8'), velaL = tn('#ffffff'), palo = tn('#4a3020'), cabo = tn('#5a4a3a');
  // estela y espuma
  if (o.avanza) for (let k = 1; k < 9; k++) { const xx = X(-22 - k * 4), yy = Y(1) + Math.round(k * 0.4); if (((k + Math.floor(t * 4)) & 1) === 0) { R.pset(xx, yy, tn('#e8f0f8')); R.pset(xx - d, yy, tn('#a8c0d8')); } }
  // los palos, las vergas y las velas
  const palos = [[-11, 30], [1, 35], [12, 28]];
  for (const [u, h] of palos) { R.linea(X(u), Y(-6), X(u), Y(-6 - h), palo);
    const filas = s < 0.7 ? 2 : 3;
    for (let f = 0; f < filas; f++) { const w = (11 - f * 2.5) * (u === 1 ? 1.1 : 1), top = -6 - h + 3 + f * (h / filas) , alto = (h / filas - 2) * (0.25 + 0.75 * v), hinch = v * 1.4;
      const x0 = X(u) - Math.round(w * s / 2), x1 = X(u) + Math.round(w * s / 2), y0 = Y(top), y1 = Y(top + alto);
      R.linea(x0 - 1, y0, x1 + 1, y0, palo);
      for (let yy = y0 + 1; yy <= y1; yy++) { const q = (yy - y0) / Math.max(1, y1 - y0), sx = Math.round(Math.sin(q * Math.PI) * hinch * s) * d;
        for (let xx = x0; xx <= x1; xx++) { const lado = (xx - x0) / Math.max(1, x1 - x0); R.pset(xx + sx, yy, d > 0 ? (lado > 0.72 ? velaS : lado < 0.15 ? velaL : vela) : (lado < 0.28 ? velaS : lado > 0.85 ? velaL : vela)); } }
      if (y1 > y0 + 2 && s >= 0.7) R.linea(x0, y1, x1, y1, velaS); }
    // el gallardete rojo arriba
    const gw = Math.round(6 * s), ga = Math.sin(t * 6 + u); for (let i = 0; i <= gw; i++) R.pset(X(u) - d * i, Y(-6 - h) + Math.round(Math.sin(t * 7 - i * 0.8) * 0.8 * (i / Math.max(1, gw))) + (ga > 2 ? 1 : 0), tn('#c83a2a')); }
  // foque del bauprés
  R.linea(X(20), Y(-6), X(31), Y(-12), palo); if (v > 0.2) R.poligono([[X(13), Y(-30)], [X(29), Y(-11)], [X(14), Y(-10)]], vela); R.linea(X(13), Y(-34), X(31), Y(-12), cabo); R.linea(X(-11), Y(-36), X(-23), Y(-9), cabo);
  // el casco: tablas, la franja amarilla con troneras, el castillo de popa más alto
  R.poligono([[X(-21), Y(-9)], [X(-13), Y(-9)], [X(-12), Y(-7)], [X(21), Y(-7)], [X(18), Y(0)], [X(-17), Y(0)], [X(-22), Y(-6)]], casco);
  R.linea(X(-21), Y(-9), X(-13), Y(-9), cascoL); R.linea(X(-12), Y(-7), X(21), Y(-7), cascoL);
  R.linea(X(-19), Y(-4), X(19), Y(-4), franja); if (s >= 0.9) R.linea(X(-18), Y(-3), X(18), Y(-3), franja);
  if (s >= 0.8) for (let u = -15; u <= 15; u += 4) R.pset(X(u), Y(-3), negro);
  if (s >= 1.2) for (let u = -16; u <= 17; u += 3) R.pset(X(u), Y(-1), tn('#2a1810'));
  // la bandera de popa
  const fx = X(-23), fy = Y(-15), fw = Math.max(3, Math.round(6 * s)), fh = Math.max(2, Math.round(4 * s)); R.linea(X(-22), Y(-7), fx, fy, palo);
  for (let i = 0; i < fw; i++) for (let j = 0; j < fh; j++) { const xx = fx - d * (i + 1), yy = fy + j + Math.round(Math.sin(t * 5 - i * 0.9) * 0.7);
    const canton = i < fw * 0.45 && j < fh * 0.55; R.pset(xx, yy, o.bandera === 'union' ? ((i === Math.floor(fw / 2) || j === Math.floor(fh / 2)) ? tn('#c8302a') : (i + j) % 3 === 0 ? tn('#f2eee2') : tn('#2a3a7a')) : canton ? ((i + j) % 2 ? tn('#2a3a7a') : tn('#f2eee2')) : tn('#c83a2a')); }
  // el reflejo, tembloroso
  if (o.reflejo !== false) for (let u = -16; u <= 16; u += 2) if (((u + Math.floor(t * 3)) & 3) !== 0) R.pset(X(u), Y(2) + ((u & 2) ? 1 : 0), tn('#2a2a3a'));
  return { cubierta: Y(-7), popa: [X(-21), Y(-9)], proa: [X(21), Y(-7)] };
};
// una barca de remos a la escala de los chibis (x: centro; y: línea del agua; ~80 px de eslora, proa a la izquierda con
// d -1). Se llama dos veces: antes de los actores con o.fase 'detras' (nada) y después con 'delante' (casco y remos),
// así los sentados quedan dentro. o.rema: los remos entran y salen; o.noche (0–1) oscurece. Devuelve los asientos [x, suelo].
const barcaChibi = (x, y, t, o = {}) => { const d = o.dir ?? -1, L = o.L ?? 40, bal = Math.round(Math.sin(t * 1.7 + x * 0.03) * 0.8), Y = Math.round(y) + bal, G = Y - 9, X = (u) => Math.round(x + d * u * L);
  const nn = o.noche ?? 0, tn = (c) => (nn > 0 ? mez(H(c), H('#141c3a'), nn * 0.5) : H(c));
  const asientos = [[X(0.5) - 7, Y + 2], [X(0.05) - 7, Y + 2], [X(-0.45) - 7, Y + 2]];
  if (o.fase === 'detras') return { asientos };
  // estela
  if (o.rema) for (let k = 1; k < 9; k++) { const xx = X(-1) - d * k * 5, ab = Math.round(k * 0.9); if (((k + Math.floor(t * 4)) & 1) === 0) { R.pset(xx, Y + 1 + ab, tn('#b8c8d8')); R.pset(xx, Y + 1 - Math.round(ab * 0.3), tn('#b8c8d8')); } }
  // el casco: tablas solapadas, la borda clara, la roda alta
  R.poligono([[X(-1), G], [X(1.08), G - 3], [X(0.92), Y], [X(-0.9), Y + 1]], tn('#4a2e18'));
  for (let yy = G + 1; yy <= Y; yy++) { const x0 = Math.min(X(-1), X(1.08)), x1 = Math.max(X(-1), X(1.08)); for (let xx = x0; xx <= x1; xx++) { const c = R.pget(xx, yy); if (c !== tn('#4a2e18')) continue; R.pset(xx, yy, (yy - G) % 3 === 0 ? tn('#3a2212') : (yy - G) % 3 === 1 ? tn('#6e4a2a') : az(xx * 0.7 + yy) > 0.85 ? tn('#7e5a36') : tn('#5a3a20')); } }
  R.linea(X(-1), G, X(1.08), G - 3, tn('#c8a070')); R.linea(X(-1), G + 1, X(1.08), G - 2, tn('#8a6238'));
  for (let u = -0.8; u <= 0.9; u += 0.2) R.pset(X(u), G + 1 - Math.round((u + 1) * 1.4), tn('#2a1a10'));
  // los remos de este costado: del tolete al agua
  const fase = o.rema ? (t * 1.0) % 1 : 0.7;
  for (const u of [0.32, -0.2]) { const tx = X(u), ty = G - Math.round((u + 1) * 1.4), ang = fase < 0.55 ? lerp(-0.5, 0.6, fase / 0.55) : lerp(0.6, -0.5, (fase - 0.55) / 0.45), dentro = fase < 0.55;
    const px = Math.round(tx - d * Math.sin(ang) * 16), py = dentro ? Y + 4 : Y + 1;
    R.rect(tx - 1, ty - 2, tx + 1, ty, tn('#2a1a10')); R.linea(tx, ty - 6, tx, ty, tn('#a07a52')); R.linea(tx, ty, px, py, tn('#a07a52')); R.linea(tx + 1, ty, px + 1, py, tn('#6a4a2a')); R.rect(px - 1, py - 1, px + 2, py + 1, tn('#7a5a3a'));
    if (dentro && fase > 0.15) { R.pset(px - 3, py, tn('#d8e4f0')); R.pset(px + 3, py + 1, tn('#a8c0d8')); } }
  // el agua que lame el casco
  for (let i = -L; i <= L; i += 2) R.pset(x + i + Math.round(Math.sin(t * 2 + i) * 1), Y + 2, tn('#2a3a5a'));
  return { asientos };
};
// banderas que ondean (x, y: la esquina del asta, arriba; w × h). La Union de 1606 (azul, aspa blanca, cruz roja) y la de
// las trece barras con el círculo de trece estrellas. o.d: hacia dónde ondea (1 derecha); o.u (0–1): cuánto se ha desplegado
const ondea = (x, y, w, h, t, color, o = {}) => { const d = o.d ?? 1, u = o.u ?? 1, W = Math.max(1, Math.round(w * u));
  for (let i = 0; i < W; i++) { const q = i / w, dy = Math.round(Math.sin(t * 6 - i * 0.35) * 1.6 * q), sombra = Math.sin(t * 6 - i * 0.35 + 0.8) < -0.55;
    for (let j = 0; j < h; j++) { let c = color(q, j / h); if (sombra) c = mez(c, H('#000000'), 0.22); R.pset(x + d * i, y + j + dy, c); } } };
const UNION = (q, v) => { const dx = q - 0.5, dy = v - 0.5, aspa = Math.abs(dy - dx * 0.6) < 0.09 || Math.abs(dy + dx * 0.6) < 0.09, cruzR = Math.abs(dx) < 0.06 || Math.abs(dy) < 0.1, cruzB = Math.abs(dx) < 0.1 || Math.abs(dy) < 0.17;
  return cruzR ? H('#c8202a') : cruzB || aspa ? H('#f4f0e8') : H('#1e2e7a'); };
const BARRAS = (w, h) => (q, v) => { const j = Math.floor(v * 13), cx = 0.2, cy = 7 / 13 / 2;
  if (q < 0.4 && v < 7 / 13) { const a = Math.atan2(v - cy, (q - cx) * (w / h)), r = Math.hypot((q - cx) * w, (v - cy) * h), est = r > h * 0.12 && r < h * 0.21 && ((Math.round((a + Math.PI) / (Math.PI * 2) * 13) % 13) === Math.round((a + Math.PI) / (Math.PI * 2) * 13 - 0.5 + 0.5) % 13) && Math.abs(((a + Math.PI) / (Math.PI * 2) * 13) % 1 - 0.5) < 0.2;
    return est ? H('#ffffff') : H('#1e2e6a'); }
  return j % 2 ? H('#f4f0e8') : H('#c8202a'); };
// una gallina que picotea
const gallina = (x, y, t, d = 1) => { x = Math.round(x); y = Math.round(y); const pic = Math.sin(t * 5 + x) > 0.4 ? 2 : 0, c = H('#e8dcc8'), cS = H('#b8a890');
  R.rect(x - 2, y - 4, x + 2, y - 1, c); R.rect(x - 2, y - 1, x + 2, y - 1, cS); R.pset(x - 3 * d, y - 4, cS); R.pset(x - 3 * d, y - 5, cS);
  R.pset(x + 2 * d, y - 5 + pic, c); R.pset(x + 3 * d, y - 5 + pic, c); R.pset(x + 3 * d, y - 6 + pic, H('#d83a3a')); R.pset(x + 4 * d, y - 5 + pic, H('#e8a040')); R.pset(x + 3 * d, y - 5 + pic, H('#1c1222'));
  R.pset(x, y, H('#e8a040')); R.pset(x + 1, y, H('#e8a040')); };
// un tricornio suelto (para lanzarlo al aire), de 13 px con el ribete dorado: gira con a
const tricornio = (x, y, a) => { x = Math.round(x); y = Math.round(y); const k = H('#0e0a14'), c = H('#2a2430'), l = H('#4e465c'), o = H('#d8b048'), f = Math.floor(a) % 4;
  if (f === 0 || f === 2) { R.poligono([[x - 6, y + 1], [x + 6, y + 1], [x + 3, y - 4], [x - 3, y - 4]], k); R.poligono([[x - 5, y], [x + 5, y], [x + 2, y - 3], [x - 2, y - 3]], c); R.linea(x - 6, y + 1, x + 6, y + 1, o); R.linea(x - 3, y - 3, x - 1, y - 3, l); R.pset(x + (f ? 4 : -4), y - 1, H('#e8e0cc')); }
  else { R.poligono([[x - 5, y + 3], [x + 5, y - 3], [x + 4, y - 5], [x - 6, y + 1]], k); R.linea(x - 5, y + 2, x + 4, y - 4, c); R.linea(x - 5, y + 3, x + 5, y - 3, o); R.pset(x - 1, y - 1, l); } };
// un árbol de copa redonda en tres tonos que se mece (x: el tronco; y: el pie; r: radio de la copa)
const arbolT = (x, y, r, t, pal = ['#a8c060', '#6e9a40', '#4a7230', '#2e4a22']) => { const c = pal.map(H), m = Math.round(Math.sin(t * 1.2 + x) * 1);
  R.rect(x - 2, y - r - 6, x + 2, y, H('#5a3a22')); R.linea(x - 2, y - r - 6, x - 2, y, H('#3a2414')); R.linea(x + 1, y - r, x + 1, y - 4, H('#7a5232')); R.linea(x, y - r - 2, x - 6, y - r - 8, H('#5a3a22'));
  const B = [[0, -1.6, 1], [-0.7, -1.1, 0.75], [0.7, -1.15, 0.8], [-0.3, -2.2, 0.7], [0.4, -2.1, 0.65]];
  for (const [dx, dy, k] of B) R.disco(Math.round(x + dx * r) + m, Math.round(y - r + dy * r * 0.6), Math.round(r * k * 0.62), c[3]);
  for (const [dx, dy, k] of B) R.disco(Math.round(x + dx * r) + m - 1, Math.round(y - r + dy * r * 0.6) - 1, Math.round(r * k * 0.52), c[2]);
  for (const [dx, dy, k] of B) R.disco(Math.round(x + dx * r) + m - 2, Math.round(y - r + dy * r * 0.6) - 3, Math.round(r * k * 0.3), c[1]);
  for (let k = 0; k < r * 2; k++) { const a = az(k + x) * 6.28, d = az(k * 3 + x) * r * 0.9; R.pset(Math.round(x + Math.cos(a) * d) + m, Math.round(y - r * 2 + Math.sin(a) * d * 0.6), (k + Math.floor(t * 2)) % 5 === 0 ? c[0] : c[1]); } };
// hierba en matas (en un búfer): de y0 a y1 con tonos pal, flores de colores
const hierba = (x0, y0, x1, y1, pal, flores = []) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = az(x * 7.3 + y * 13.1), u = (y - y0) / Math.max(1, y1 - y0); R.pset(x, y, n < 0.18 ? pal[2] : n > 0.86 ? pal[0] : u + (n - 0.5) * 0.6 > 0.55 ? pal[1] : pal[3] ?? pal[1]); }
  for (let k = 0; k < (x1 - x0) * (y1 - y0) / 60; k++) { const x = Math.round(x0 + az(k * 3.1) * (x1 - x0)), y = Math.round(y0 + 2 + az(k * 5.7) * (y1 - y0 - 2)); R.pset(x, y, pal[2]); R.pset(x, y - 1, pal[0]); R.pset(x - 1, y - 2, pal[0]); R.pset(x + 1, y - 2, pal[0]); }
  for (let k = 0; k < flores.length * 6; k++) { const x = Math.round(x0 + az(k * 9.3 + 1) * (x1 - x0)), y = Math.round(y0 + 3 + az(k * 4.9 + 2) * (y1 - y0 - 3)); R.pset(x, y, flores[k % flores.length]); } };
'''

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['ny-flota'] = ('La flota', '''// NY-FLOTA (frases 18–19), 1776, cartela «1776». Cuatro planos:
// 1. el plano de la bahía: estalla la guerra (chincheta azul en la isla y roja en el estrecho); una mano de casaca roja
//    señala el puerto («harbor»), la isla se enciende de oro y sale la llave («key»); asoman las primeras velas;
//    corta en «And in the summer».
// 2. la colina de Manhattan sobre el puerto lleno de velas británicas: el granjero llega andando, un continental sube
//    corriendo a avisar y en «hundreds of ships» la granjera suelta la cesta y las manzanas ruedan; corta al acabar «ships».
// 3. Brooklyn: la columna de continentales se retira por el camino junto a la casa de piedra y el molino; humo lejano y
//    las filas rojas en la loma; Washington llega a caballo («Washington»), baja la cabeza («loses») y los sigue
//    («Brooklyn»); corta en «and is trapped».
// 4. la orilla del río Este: el ejército apretado contra el agua; Washington mira por el catalejo hacia las filas
//    británicas («trapped»), lo baja, se vuelve al río y señala los botes amarrados («river»).''', AUX + r'''
const f = (k) => en('flota', k), b = (k) => en('brooklyn', k);
const P2 = f(0.601), P3 = f(1), P4 = b(0.536);
const guerra = f(0.084), quien = f(0.29), puertoT = f(0.377), llave = f(0.467), colonias = f(0.507), llegan = f(0.825), cientos = f(0.896);
const washT = b(0.131), pierde = b(0.25), brook = b(0.471), atrapado = b(0.638), rioT = b(0.933);
const ROJO = '#b8302a';

// 1 · el plano de la bahía, con la mano del oficial británico
const p1 = (t) => {
  const P = T.mapaNY(R, t, { vista: 'bahia', puerto: tramo(t, puertoT - 0.3, puertoT + 0.5), isla: tramo(t, llave - 0.25, llave + 0.6), velas: 0.14 * tramo(t, colonias + 0.2, P2) });
  const S = P.sitios;
  T.chincheta(R, S.manhattan[0] + 4, S.manhattan[1] + 14, t, H('#3a5aa8'), { baja: tramo(t, guerra - 0.25, guerra + 0.2), pulso: t > guerra + 0.3 && t < quien });
  T.chincheta(R, S.estrecho[0] + 2, S.estrecho[1] - 8, t, H('#c83a2a'), { baja: tramo(t, guerra + 0.35, guerra + 0.8), pulso: t > guerra + 0.9 });
  // la mano entra en diagonal desde abajo a la izquierda, da un toque en el puerto y se va cuando sale la llave
  const e = R.easeIO(tramo(t, quien - 0.6, puertoT - 0.1)) * (1 - R.easeIO(tramo(t, llave + 0.4, colonias + 0.6))), toque = t > puertoT - 0.1 && t < puertoT + 0.25 ? 2 : 0;
  if (e > 0) T.brazo(R, lerp(40, 82, e), lerp(214, 196, e), lerp(60, 118, e), lerp(214, 146 + toque, e), ROJO, 1, { codo: [lerp(52, 96, e), lerp(214, 178, e)] });
};

// 2 · la colina sobre el puerto lleno de velas
const p2 = (t) => {
  const r = T.guerra1776(R, t, { encuadre: 'flota' }), s = r.suelo;
  for (let k = 0; k < 3; k++) gallina(214 + k * 13 + Math.sin(t * 0.8 + k) * 5, 176 - (k % 2) * 3, t + k, k % 2 ? -1 : 1);
  // la granjera con la cesta: la suelta al ver la flota
  const suelta = tramo(t, cientos + 0.15, cientos + 0.9), gx = 150;
  const g = R.actor(EL.colona, gx, s + 4, t, { dir: 1, sostiene: suelta === 0 ? true : false, sorpresa: t > cientos, sonrisa: t < llegan - 0.4 });
  const cx = suelta === 0 ? g.mano[0] : gx + 16 + suelta * 4, cy = suelta === 0 ? g.mano[1] : lerp(g.mano[1], s + 9, Math.min(1, suelta * 2.2));
  R.rect(cx - 3, cy, cx + 3, cy + 3, H('#7a5428')); R.linea(cx - 3, cy, cx + 3, cy, H('#a87a40')); R.pset(cx - 2, cy + 2, H('#5a3a1c')); R.pset(cx + 1, cy + 2, H('#5a3a1c'));
  for (let k = 0; k < 4; k++) { const ru = suelta > 0.3 ? (suelta - 0.3) / 0.7 : 0, ax = suelta === 0 ? cx - 2 + k * 1.5 : cx + k * 3 + ru * (8 + k * 9), ay = suelta === 0 ? cy - 1 : cy + 2 - Math.abs(Math.sin(ru * 6 + k)) * 3 * (1 - ru);
    R.disco(Math.round(ax), Math.round(ay), 1, H('#d8302a')); R.pset(Math.round(ax), Math.round(ay) - 1, H('#f08060')); }
  // el granjero llega con la horca al hombro y señala el mar
  const u = tramo(t, P2 + 0.1, P2 + 2.1), fx = Math.round(lerp(-18, 98, u)), apunta = t > llegan;
  const gr = R.actor(EL.colono, fx, s + 2, t, { dir: 1, anda: u > 0 && u < 1, sostiene: !apunta, dedo: apunta, sorpresa: t > cientos + 0.1, habla: t > llegan && t < cientos });
  const [bx, by] = apunta ? [fx - 4, s - 4] : gr.mano; R.rect(bx - 2, by, bx + 2, by + 4, H('#7a5a3a')); R.rect(bx - 2, by + 1, bx + 2, by + 1, H('#4a4a52')); R.rect(bx - 1, by, bx + 1, by, H('#a8c8e0')); R.linea(bx - 2, by - 1, bx + 2, by - 1, H('#4a4a52'));
  // un continental sube corriendo a avisar
  const v = tramo(t, P2 + 1.6, llegan + 0.2), kx = Math.round(lerp(330, 196, v));
  const c = R.actor(EL.continental, kx, s + 8, t, { dir: -1, anda: v > 0 && v < 1, habla: v >= 1 && Math.sin(t * 8) > 0, dedo: v >= 1, sorpresa: t > cientos });
  if (v >= 1 && t < cientos + 1.2) R.bocadillo(kx + 7, s - 22, {});
};

// 3 · Brooklyn: la retirada por el camino de la casa de piedra
const fondo3 = () => fijo('f3', () => {
  degradado(0, 82, [H('#56688c'), H('#64769a'), H('#7486a6'), H('#8896b0'), H('#9ea8ba'), H('#b4b8c0'), H('#c4c2bc')]);
});
const frente3 = () => fijo('g3', () => {
  // la loma lejana de Brooklyn, azulada, con arboledas
  for (let x = 0; x < 320; x++) { const y = Math.round(70 - Math.sin(x * 0.018) * 6 - Math.sin(x * 0.05 + 1) * 2 - (x > 190 ? (x - 190) * 0.06 : 0)); for (let yy = y; yy <= 86; yy++) R.pset(x, yy, (yy - y) < 2 ? H('#7a90a0') : (x + yy) % 3 ? H('#6a8292') : H('#627a8a')); }
  for (let k = 0; k < 40; k++) { const x = Math.round(az(k) * 320), y = Math.round(72 - Math.sin(x * 0.018) * 6 - (x > 190 ? (x - 190) * 0.06 : 0)); R.disco(x, y, 2 + Math.round(az(k + 4) * 2), H('#5a7282')); R.pset(x - 1, y - 2, H('#7a92a2')); }
  // el prado medio con setos
  hierba(0, 86, 319, 124, [H('#8aa05a'), H('#7a9450'), H('#5e7a3e'), H('#86a058')], [H('#e8d860'), H('#f2f2e8')]);
  for (let k = 0; k < 5; k++) { const y = 92 + k * 7; for (let x = 0; x < 320; x++) if (az(x * 0.3 + k * 17) > 0.25 && ((x + k * 40) % 140) < 100) { R.pset(x, y, H('#4a6a36')); if (az(x + k) > 0.6) R.pset(x, y - 1, H('#5e7e42')); } }
  // el estanque del molino (Gowanus) a la izquierda, con aneas
  R.poligono([[0, 100], [70, 98], [112, 106], [96, 118], [0, 122]], H('#6a8aa0'));
  for (let y = 100; y < 122; y++) for (let x = 0; x < 112; x++) if (R.pget(x, y) === H('#6a8aa0')) R.pset(x, y, (y + (x >> 3)) % 4 === 0 ? H('#86a2b4') : (x + y * 3) % 7 === 0 ? H('#5a7a92') : H('#6a8aa0'));
  for (let k = 0; k < 30; k++) { const x = Math.round(60 + az(k + 70) * 56), y = Math.round(104 + az(k + 71) * 14); R.linea(x, y, x, y - 4 - Math.round(az(k) * 3), H('#5e7a3e')); R.pset(x, y - 5, H('#7a5a32')); }
  // el molino de marea: casa de tablas sobre pilotes
  R.rect(10, 80, 46, 104, H('#7a5a3a')); for (let x = 10; x <= 46; x += 3) R.linea(x, 80, x, 104, H('#5e4228')); R.poligono([[6, 81], [28, 66], [50, 81]], H('#5a3a2a')); for (let k = 0; k < 6; k++) R.linea(10 + k * 6, 79, 28, 67, H('#6e4a32'));
  R.rect(16, 86, 22, 92, H('#2a2024')); R.rect(32, 86, 38, 92, H('#2a2024')); R.rect(17, 87, 21, 89, H('#4a5a6a')); R.rect(26, 94, 32, 104, H('#3a2a1c'));
  for (const px of [12, 24, 36, 46]) R.rect(px, 104, px + 1, 112, H('#4a3220'));
  // la casa de piedra holandesa (Old Stone House): piedra de campo, frontón escalonado, tejado de tejas
  const x0 = 124, x1 = 178, yb = 122, yt = 96;
  for (let y = yt; y <= yb; y++) for (let x = x0; x <= x1; x++) { const n = az((x >> 2) * 3.7 + (y >> 1) * 11.3 + ((y >> 1) & 1) * 0.5); R.pset(x, y, (x % 4 === 0 && (y >> 1) % 2) || y % 3 === 0 ? H('#6e665c') : n < 0.33 ? H('#9a9284') : n < 0.66 ? H('#aaa294') : H('#8a8274')); }
  R.poligono([[x0 - 3, yt], [x0 + 6, yt - 9], [x1 - 14, yt - 9], [x1 - 6, yt]], H('#8a3a2a')); for (let k = 0; k < 5; k++) R.linea(x0 + 2 + k * 2, yt - 2 - k * 2 + 1, x1 - 8 - k, yt - 2 - k * 2 + 1, H('#6e2a20'));
  for (let k = 0; k < 4; k++) { R.rect(x1 - 8 + k * 0, yt - 8 - k * 4, x1 + 2 - k * 0 - k * 2, yt - 5 - k * 4 + 3, H('#a29a8c')); R.rect(x1 - 8, yt - 9 - k * 4, x1 + 2 - k * 2, yt - 9 - k * 4, H('#6e665c')); }
  R.rect(x1 - 5, yt - 26, x1 - 1, yt - 16, H('#8a8274')); R.rect(x1 - 6, yt - 27, x1, yt - 27, H('#5a544c'));
  for (const [wx, wy] of [[x0 + 6, 102], [x0 + 22, 102], [x0 + 38, 102], [x0 + 6, 112], [x0 + 38, 112]]) { R.rect(wx - 1, wy - 1, wx + 8, wy + 7, H('#3a3430')); R.rect(wx, wy, wx + 7, wy + 6, H('#2a3444')); R.rect(wx, wy + 3, wx + 7, wy + 3, H('#d8d0c0')); R.rect(wx + 3, wy, wx + 4, wy + 6, H('#d8d0c0')); R.rect(wx - 4, wy - 1, wx - 2, wy + 7, H('#3a5a3a')); R.pset(wx - 3, wy + 3, H('#2a3a2a')); }
  R.rect(x0 + 22, 110, x0 + 30, yb, H('#4a2a1c')); R.rect(x0 + 23, 111, x0 + 29, 114, H('#5a3a24')); R.pset(x0 + 28, 117, H('#c8a040'));
  // la hierba de delante (toda la franja baja), con matas, flores y piedras
  hierba(0, 124, 319, 179, [H('#a8b868'), H('#86a052'), H('#5a7a3a'), H('#7e9a4c')], [H('#e8d860'), H('#f2f2e8'), H('#d86a4a')]);
  // el camino de tierra que baja en diagonal hacia el río (a la izquierda), con rodadas y charcos
  const yc = (x) => Math.round(166 - x * 0.07 - Math.sin(x * 0.02) * 3), wc = (x) => Math.round(6 + (320 - x) * 0.018);
  for (let x = 0; x < 320; x++) { const c = yc(x), w = wc(x); for (let y = c - w; y <= Math.min(179, c + w); y++) { const n = az(x * 1.7 + y * 3.3), e = y - (c - w);
    R.pset(x, y, e < 1 ? H('#6e5a3a') : y === c - 2 || y === c + 2 ? H('#8a6e4a') : n < 0.12 ? H('#8a6e4a') : n > 0.92 ? H('#d8c4a0') : H('#b09470')); } }
  for (const [cx, cw] of [[64, 9], [232, 7]]) { const c = yc(cx) + 1; for (let x = cx - cw; x <= cx + cw; x++) for (let y = c - 1; y <= c + 1; y++) if (Math.abs(x - cx) / cw + Math.abs(y - c) / 2 < 1) R.pset(x, y, y === c - 1 ? H('#a8bccc') : H('#7a92a6')); }
  // el muro de piedra seca a lo largo del camino (por detrás) y la cerca en zigzag de la loma
  for (let x = 0; x < 196; x++) { const y = yc(x) - wc(x) - 1; R.pset(x, y, az(x) < 0.5 ? H('#8a8274') : H('#a29a8c')); R.pset(x, y - 1, (x % 4) ? H('#9a9284') : H('#6e665c')); if (x % 7 < 4) R.pset(x, y - 2, H('#b0a898')); }
  for (let k = 0; k < 13; k++) { const x = 200 + k * 9, y = 128 + Math.round(k * 0.2); R.linea(x, y, x + 9, y + 3, H('#7a5a3a')); R.linea(x, y + 4, x + 9, y + 1, H('#6a4a2a')); R.linea(x, y - 1, x + 9, y + 2, H('#9a7a52')); }
  for (const [mx, my] of [[96, 132], [108, 135], [190, 130], [300, 176], [14, 176]]) { R.disco(mx, my, 5, H('#4e6e34')); R.disco(mx - 1, my - 2, 3, H('#6a8a44')); R.pset(mx + 2, my - 1, H('#d8302a')); R.pset(mx - 3, my, H('#d8302a')); }
  // un carro volcado sin rueda junto al camino, barriles y un tambor olvidado
  R.poligono([[150, 176], [182, 172], [184, 178], [152, 179]], H('#6a4a2a')); R.linea(150, 176, 182, 172, H('#9a7a52')); R.anillo(176, 171, 5, H('#4a3220')); R.linea(171, 171, 181, 171, H('#4a3220')); R.linea(176, 166, 176, 176, H('#4a3220'));
  for (const bx of [118, 126]) { R.rect(bx, 168, bx + 6, 177, H('#8a5a32')); R.rect(bx, 170, bx + 6, 170, H('#4a4a52')); R.rect(bx, 175, bx + 6, 175, H('#4a4a52')); R.linea(bx, 168, bx, 177, H('#a87040')); }
});
const p3 = (t) => {
  R.copiar(fondo3());
  nubes(t, [[20, 18, 50, 2.0], [170, 30, 40, 3.2], [260, 52, 30, 4.4], [90, 50, 26, 4.8]], [H('#d4d6dc'), H('#b4b8c4'), H('#8e94a6')]);
  aves(t, 5, 34, -14, H('#2a2a34'), 3);
  for (const [hx, hh] of [[196, 52], [226, 46], [252, 40]]) humo(hx, 78, t, hh, H('#7e7e88'), H('#9a9aa2'), -1);
  pegar(frente3());
  // las filas rojas en la loma lejana, que bajan despacio (sin combate)
  for (let k = 0; k < 3; k++) for (let i = 0; i < 14; i++) { const x = Math.round(214 + i * 4 + k * 3 - (t - P3) * 1.2), y = Math.round(80 - (x - 190) * 0.06 + k * 2); if (x < 200) continue; R.pset(x, y, H('#c83a2a')); R.pset(x, y - 1, H('#2a2024')); if ((i + k + Math.floor(t * 2)) % 7 === 0) R.pset(x, y - 2, H('#e8e8f0')); }
  // árboles y almiares en el prado de la derecha; vacas que pastan
  for (const [hx, hy] of [[206, 116], [222, 118]]) { R.disco(hx, hy - 4, 6, H('#c8a048')); R.rect(hx - 6, hy - 4, hx + 6, hy, H('#c8a048')); R.disco(hx - 1, hy - 6, 3, H('#e0c068')); R.linea(hx, hy - 11, hx, hy - 13, H('#6a4a2a')); for (let i = -5; i <= 5; i += 2) R.pset(hx + i, hy - 1, H('#a07a30')); }
  for (let k = 0; k < 2; k++) { const vx = Math.round(274 + k * 22 + Math.sin(t * 0.3 + k) * 3), vy = 112 + k * 4, cab = Math.sin(t * 1.5 + k * 2) > 0 ? 1 : 0; R.rect(vx, vy - 5, vx + 9, vy - 2, H('#f2eee2')); R.rect(vx + 2, vy - 5, vx + 5, vy - 3, H('#5a3a2a')); R.rect(vx + 9, vy - 4 + cab, vx + 11, vy - 2 + cab, H('#f2eee2')); R.pset(vx + 11, vy - 2 + cab, H('#e8a8a0')); for (const lx of [1, 3, 7, 9]) R.pset(vx + lx, vy - 1, H('#3a2a20')); }
  arbolT(246, 118, 9, t); arbolT(92, 104, 6, t, ['#b0c468', '#7aa048', '#567a36', '#344e26']); arbolT(300, 124, 11, t);
  // la rueda del molino que gira y el agua que salta
  const a = t * 1.2; for (let k = 0; k < 6; k++) { const an = a + k * Math.PI / 3; R.linea(4, 108, Math.round(4 + Math.cos(an) * 7), Math.round(108 + Math.sin(an) * 7), H('#4a3220')); }
  R.anillo(4, 108, 7, H('#3a2414')); if (Math.floor(t * 6) % 2) { R.pset(10, 114, H('#c8dce8')); R.pset(12, 116, H('#c8dce8')); }
  // patos en el estanque
  for (let k = 0; k < 2; k++) { const x = Math.round(40 + Math.sin(t * 0.4 + k * 2) * 18 + k * 14), y = 114 + k * 3; R.rect(x, y - 2, x + 3, y, H('#8a6a44')); R.pset(x + 3, y - 3, H('#2a6a3a')); R.pset(x + 4, y - 3, H('#e8a040')); R.pset(x - 1, y + 1, H('#86a2b4')); }
  // la columna que se retira hacia la izquierda, de la loma al río
  const lista = [];
  for (let k = 0; k < 7; k++) { const s0 = ((t - P3) * 0.072 + k * 0.155) % 1.1, x = Math.round(lerp(300, -30, s0)), yc = Math.round(166 - x * 0.07 - Math.sin(x * 0.02) * 3) - 1 + (k % 2) * 3; lista.push([yc, k, x]); }
  lista.sort((p, q) => p[0] - q[0]);
  // Washington llega a pie por la loma con su ayudante, baja la cabeza y los sigue
  const w = tramo(t, washT - 1.1, washT + 0.4), sigue = tramo(t, brook, P4 + 0.3), hx = Math.round(lerp(334, 250, w) - sigue * 26);
  R.actor(EL.continental, hx + 22, 141, t, { dir: -1, anda: (w > 0 && w < 1) || (sigue > 0 && sigue < 1), triste: t > pierde });
  R.actor(EL.washington, hx, 143, t, { dir: -1, anda: (w > 0 && w < 1) || (sigue > 0 && sigue < 1), triste: t > pierde, dedo: t > pierde - 0.5 && t < pierde + 0.6 });
  for (const [yc, k, x] of lista) { const def = [EL.continental, EL.continental2][k % 2];
    const a2 = R.actor(def, x, yc, t, { dir: -1, anda: true, triste: true, sostiene: k === 2 ? true : k === 5 ? [x - 4, yc - 24] : false });
    if (k === 2) { const [mx, my] = a2.mano; R.rect(mx - 3, my, mx + 3, my + 5, H('#2a3a6a')); R.rect(mx - 3, my + 2, mx + 3, my + 2, H('#e8e0cc')); R.rect(mx - 3, my, mx + 3, my, H('#c83a2a')); R.rect(mx - 3, my + 5, mx + 3, my + 5, H('#c83a2a')); }
    if (k === 5) { const [mx, my] = a2.mano; R.linea(mx, my - 12, mx + 2, my + 14, H('#8a6a44')); R.rect(mx - 1, my - 11, mx + 2, my - 3, H('#2a3a7a')); R.pset(mx, my - 9, H('#f2eee2')); R.pset(mx + 1, my - 6, H('#f2eee2')); } }
};

// 4 · la orilla del río Este: el ejército contra el agua (la orilla en diagonal, el río arriba a la izquierda)
const ori = (x) => Math.round(172 - x * 0.3);
const fondo4 = () => fijo('f4', () => {
  degradado(0, 60, [H('#4e80c4'), H('#5e8ece'), H('#729ed6'), H('#8ab0dc'), H('#a6c2e0'), H('#c4d4e2')]);
  // el río: bandas tramadas con rizos fijos y el reflejo de Manhattan
  degradado(62, 179, [H('#86a2b8'), H('#7896ae'), H('#6a88a2'), H('#5e7c98'), H('#54728e')]);
  for (let y = 63; y < 180; y++) for (let x = 0; x < 320; x++) { const n = az(x * 0.37 + y * 5.1); if (((x + y * 3) % 11 === 0 && n > 0.4) || n > 0.97) R.pset(x, y, H('#9ab4c6')); else if ((x * 2 + y) % 13 === 0 && n < 0.3) R.pset(x, y, H('#4a6684')); }
  for (let x = 0; x < 230; x++) { const h = 3 + Math.round(az(x >> 3) * 5); for (let y = 63; y < 63 + h; y++) if ((x + y) % 2 === 0) R.pset(x, y, H('#6e7a8c')); }
});
const frente4 = () => fijo('g4', () => {
  // Manhattan al otro lado: casas, almacenes, mástiles en los muelles, la aguja de la Trinidad y un molino
  for (let x = 0; x < 236; x++) { const k = x >> 3, h = 5 + Math.round(az(k) * 7); for (let y = 61 - h; y <= 62; y++) R.pset(x, y, y === 61 - h ? H('#9a7c78') : (x & 7) === 0 ? H('#6a5a62') : ((x & 7) === 3 || (x & 7) === 5) && (y - 61 + h) % 3 === 2 ? H('#d8c8a0') : az(k + 50) > 0.5 ? H('#8a6a64') : H('#7a6e78'));
    if ((x & 7) === 2 && az(k + 9) > 0.55) { R.pset(x, 60 - h, H('#5a4a52')); R.pset(x, 59 - h, H('#5a4a52')); } }
  R.rect(84, 34, 87, 56, H('#7a6e78')); R.rect(85, 40, 86, 42, H('#3a3444')); R.poligono([[83, 35], [85, 22], [88, 35]], H('#8a7c84')); R.pset(85, 21, H('#c8a040'));
  for (const mx of [118, 126, 168, 176, 210]) { R.linea(mx, 40, mx, 62, H('#5a4a40')); R.linea(mx - 4, 46, mx + 4, 46, H('#5a4a40')); R.linea(mx - 3, 51, mx + 3, 51, H('#5a4a40')); }
  R.rect(150, 46, 154, 58, H('#8a7c84')); R.poligono([[149, 47], [152, 42], [155, 47]], H('#6a5e68'));
  R.rect(0, 62, 235, 62, H('#5a6a52'));
  // la orilla de Brooklyn en diagonal: arena, piedras, hierba
  for (let x = 0; x < 320; x++) { const y0 = Math.max(56, ori(x)); for (let y = y0; y < 180; y++) { const d = y - y0, n = az(x * 3.3 + y * 7.7);
    R.pset(x, y, d < 1 ? H('#e8dcc0') : d < 6 ? (n < 0.2 ? H('#a89870') : n > 0.85 ? H('#e8dcb8') : H('#d0c098')) : d < 8 ? H('#9a8a64') : n < 0.12 ? H('#5e7a3e') : n > 0.9 ? H('#a8b868') : (x + y) % 9 === 0 ? H('#7e9a4c') : H('#8aa456')); } }
  for (let k = 0; k < 30; k++) { const x = Math.round(az(k + 30) * 316), y = ori(x) + 2 + Math.round(az(k) * 3); if (y < 180 && y > 56) { R.disco(x, y, 1, H('#8a8274')); R.pset(x, y - 1, H('#c0b8a8')); } }
  // las alturas de Brooklyn detrás, con las tiendas del campamento
  for (let x = 222; x < 320; x++) { const y = Math.round(58 - Math.sin(x * 0.04) * 3); for (let yy = y; yy < Math.max(58, ori(x)); yy++) R.pset(x, yy, (yy - y) < 2 ? H('#9ab06a') : az(x + yy * 3) < 0.2 ? H('#6a8a4a') : H('#86a058')); }
  for (let k = 0; k < 12; k++) { const x = 232 + (k % 6) * 15 + (k > 5 ? 7 : 0), y = 74 + (k > 5 ? 9 : 0) + Math.round((k % 6) * -0.5); R.poligono([[x - 6, y], [x, y - 8], [x + 6, y]], H('#e8e0cc')); R.linea(x, y - 8, x + 6, y, H('#b8b0a0')); R.linea(x - 6, y, x, y - 8, H('#f8f4ea')); R.pset(x, y - 1, H('#4a3a2a')); R.pset(x, y - 2, H('#4a3a2a')); R.pset(x, y - 3, H('#4a3a2a')); }
  // el embarcadero de tablas que entra en el río, con sus pilotes
  for (let i = 0; i < 46; i++) { const x = 60 + i, y = ori(60) - 4 - Math.round(i * 0.5); R.rect(x, y, x, y + 2, i % 3 ? H('#9a7a52') : H('#7a5a3a')); if (i % 9 === 0) R.rect(x, y + 3, x + 1, y + 8, H('#4a3220')); }
  // barriles, cajas y leña en la orilla; una carreta con toldo
  for (const [bx, by] of [[176, 128], [184, 126], [262, 106]]) { R.rect(bx, by - 8, bx + 6, by, H('#8a5a32')); R.rect(bx, by - 6, bx + 6, by - 6, H('#4a4a52')); R.rect(bx, by - 2, bx + 6, by - 2, H('#4a4a52')); R.linea(bx, by - 8, bx, by, H('#a87040')); }
  R.rect(196, 118, 210, 124, H('#a07a4a')); R.linea(196, 118, 210, 118, H('#c8a070')); R.linea(203, 118, 203, 124, H('#6a4a2a'));
  R.poligono([[276, 100], [282, 88], [306, 88], [312, 100]], H('#e8e0cc')); R.rect(276, 100, 312, 104, H('#7a5a3a')); R.anillo(282, 106, 4, H('#3a2414')); R.anillo(306, 106, 4, H('#3a2414'));
  for (let k = 0; k < 4; k++) R.linea(232 + k * 3, 126, 244 + k * 2, 124, H('#7a5a3a'));
});
const p4 = (t) => {
  R.copiar(fondo4());
  nubes(t, [[30, 14, 44, 2.2], [160, 26, 36, 3.4], [236, 40, 22, 4.6], [100, 40, 22, 5]], [H('#ffffff'), H('#e0e8f0'), H('#b8c4d4')]);
  aves(t, 4, 26, 12, H('#3a3a44'), 7);
  // brillos del agua que corren y se apagan
  for (let k = 0; k < 46; k++) { const x = Math.round((az(k) * 340 + t * (5 + az(k + 1) * 8)) % 340) - 10, y = Math.round(66 + az(k + 2) * 112); if (y >= ori(x) - 1) continue; const L = 2 + Math.round(az(k + 3) * 4); if (Math.sin(t * 3 + k) > -0.2) R.linea(x, y, x + L, y, H('#b8d0dc')); }
  // un balandro y una gabarra que cruzan lejos
  barco(((t - P4) * 9 + 40) % 260, 70, 0.5, t, { dir: 1, bruma: 0.3, colBruma: '#a8b8c8', avanza: true });
  barco(200 - ((t - P4) * 6) % 200, 82, 0.62, t, { dir: -1, bruma: 0.2, colBruma: '#a8b8c8', velas: 0.6 });
  pegar(frente4());
  for (const [hx, hh] of [[250, 40], [290, 26]]) humo(hx, 58, t, hh, H('#8e8e96'), H('#aaaab2'), -1, 7);
  for (const [hx, hy] of [[214, 116], [300, 128]]) { for (let k = 0; k < 5; k++) { const u = (t * 0.5 + k / 5) % 1; R.disco(Math.round(hx + Math.sin(u * 5 + k) * 1.5 - u * 6), Math.round(hy - 2 - u * 16), u < 0.4 ? 1 : 2, u > 0.6 ? H('#e0e0e4') : H('#b8b8c0')); } R.pset(hx, hy, Math.sin(t * 9) > 0 ? H('#f0a040') : H('#d86030')); R.pset(hx - 1, hy + 1, H('#5a3a20')); R.pset(hx + 1, hy + 1, H('#5a3a20')); }
  // las filas británicas en la cresta, lejos y quietas como una amenaza
  for (let i = 0; i < 16; i++) { const x = Math.round(240 + i * 4 - (t - P4) * 0.8), y = Math.round(58 - Math.sin(x * 0.04) * 3) - 1; R.pset(x, y, H('#c83a2a')); R.pset(x, y - 1, H('#2a2024')); if ((i + Math.floor(t * 3)) % 6 === 0) R.pset(x, y - 2, H('#e8e8f0')); }
  // los botes amarrados al embarcadero y en la orilla
  T.barcaRemos(R, 70, 136, t, { n: 2, s: 0.9, noche: 0, remo: false, dir: -1 });
  T.barcaRemos(R, 30, 158, t, { n: 2, s: 1, noche: 0, remo: false, dir: -1 });
  // el ejército apretado en la orilla: filas de gente pequeña que se mueve y mira al río
  const gente = [];
  for (let k = 0; k < 64; k++) { const x = 150 + Math.round(az(k + 400) * 166), y = Math.round(ori(x) + 12 + az(k + 401) * 60); if (y > 178 || (x > 112 && x < 200 && y > 140)) continue; gente.push([y, x, k]); }
  gente.sort((p, q) => p[0] - q[0]);
  for (const [y, x, k] of gente) gentecita(x + Math.round(Math.sin(t * 0.7 + k) * 1.5), y, t, k, { col: k % 3 ? '#2a3a6a' : '#6a5a3a' });
  // Washington con el catalejo hacia las filas británicas; luego se vuelve al río y señala los botes
  const mira = t > P4 + 0.25 && t < rioT - 0.8, vuelve = t > rioT - 0.8, wx = 150, ws = 168;
  R.actor(EL.continental, 122, 172, t, { dir: vuelve ? -1 : 1, habla: t > atrapado + 0.2 && t < atrapado + 1.2 && Math.sin(t * 8) > 0, sorpresa: t > rioT });
  const w = R.actor(EL.washington, wx, ws, t, { dir: vuelve ? -1 : 1, sostiene: mira ? [wx + 22, ws - 20] : false, dedo: t > rioT - 0.35 });
  if (mira) { const [mx, my] = w.mano; R.linea(mx - 3, my + 1, mx + 7, my - 3, H('#8a6a2a')); R.linea(mx - 3, my, mx + 7, my - 4, H('#e8c050')); R.pset(mx + 7, my - 4, H('#fff4c0')); R.pset(mx - 3, my, H('#5a4a2a')); R.pset(mx + 2, my - 2, H('#5a4a2a')); }
};

const efectos = [[guerra, 'pop'], [puertoT, 'toc'], [llave, 'brillo'], [P2 + 0.3, 'ola'], [llegan + 0.1, 'viento'], [cientos + 0.4, 'pop'], [P3 + 0.4, 'viento'], [washT, 'golpecito'], [P4 + 0.3, 'ola'], [rioT, 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1776', efectos, año: 1776 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['ny-niebla'] = ('La niebla', '''// NY-NIEBLA (frases 20–21), 29 de agosto de 1776, sin cartela. Cuatro planos:
// 1. el río Este de noche: Washington en el embarcadero da la orden («ferries») y dos soldados suben a la barca, que se
//    va remando hacia Manhattan detrás de otras dos; corta en «across».
// 2. la barca de cerca, en silencio: los remeros reman, el gallo de la cesta se hincha para cantar y el soldado le tapa
//    el pico justo en «In silence» (gag); luego se lleva el dedo a los labios; corta en «and at dawn».
// 3. el río al alba: Washington y su ayudante bajan a la última barca, que se va, y la niebla entra por capas y la tapa
//    («fog hides the last ones»); corta al acabar «crossing».
// 4. el campamento de Brooklyn: la niebla se levanta («lifts»), entran los casacas rojas y en «empty» se quedan de
//    piedra (golpe); uno destapa la olla olvidada y no hay nadie.''', AUX + r'''
const n = (k) => en('niebla', k), v = (k) => en('vacio', k);
const P2 = n(0.367), P3 = n(0.706), P4 = v(0);
const lleva = n(0.212), silencio = n(0.602), nieblaT = n(0.792), ocultos = n(0.867);
const levanta = v(0.14), llegan = v(0.48), vacioT = v(0.773);

// 1 · el río de noche: la orden y las barcas que cruzan
const p1 = (t) => {
  T.guerra1776(R, t, { encuadre: 'rio', luz: 'noche' });
  T.barcaRemos(R, Math.round(224 - t * 34), 120, t, { n: 4, s: 0.8 });
  T.barcaRemos(R, Math.round(160 - t * 22), 134, t, { n: 5, s: 1.0, carga: true });
  // la barca del embarcadero: espera, suben dos soldados y sale remando
  const sale = tramo(t, lleva + 0.2, P2 + 0.6), bx = Math.round(166 - R.easeIO(sale) * 96), by = 163;
  const sube = (k) => tramo(t, 0.3 + k * 0.45, 1.5 + k * 0.45), bajan = (k) => tramo(t, 1.5 + k * 0.45, 2.0 + k * 0.45);
  barcaChibi(bx, by, t, { fase: 'detras' });
  const st = [bx - 22, bx + 2];
  for (let k = 0; k < 2; k++) { const u = sube(k), b2 = bajan(k), x = b2 > 0 ? Math.round(lerp(204, st[k], b2)) : Math.round(lerp(276 + k * 20, 204, u)), y = Math.round(lerp(150, by + 2, b2));
    R.actor([EL.continental, EL.continental2][k], x, y, t, { dir: -1, anda: (u > 0 && u < 1) || (b2 > 0 && b2 < 1) }); }
  R.actor(EL.continental, bx + 16, by + 2, t, { dir: 1 });
  barcaChibi(bx, by, t, { rema: sale > 0, noche: 0.7 });
  R.actor(EL.washington, 236, 150, t, { dir: -1, dedo: t > lleva - 0.3 && t < lleva + 0.9 });
  // más soldados que bajan por la orilla a esperar su turno
  for (let k = 0; k < 3; k++) { const u = tramo(t, 1 + k * 0.7, 3.4 + k * 0.7); R.actor([EL.continental2, EL.continental, EL.continental2][k], Math.round(lerp(330, 252 + k * 15, u)), 152 - k * 3, t, { dir: -1, anda: u > 0 && u < 1 }); }
};

// 2 · la barca de cerca y el gag del gallo
const fondo2 = () => fijo('nf2', () => {
  degradado(0, 70, [H('#0a0e24'), H('#0e1430'), H('#141c3e'), H('#1c264c'), H('#24305a'), H('#2e3a64')]);
  for (let k = 0; k < 70; k++) { const x = Math.round(az(k) * 320), y = Math.round(az(k + 5) * 60); if (x > 270 && y < 48) continue; R.pset(x, y, k % 5 ? H('#8a94c0') : H('#e8ecff')); }
  // la otra orilla, oscura, con ventanas encendidas
  for (let x = 0; x < 320; x++) { const k = x >> 3, h = 4 + Math.round(az(k + 20) * 7); for (let y = 66 - h; y <= 72; y++) R.pset(x, y, y === 66 - h ? H('#2a2e4a') : H('#1a1c34')); if ((x & 7) === 3 && az(k + 3) > 0.6) R.pset(x, 66 - h + 3, H('#f0b050')); }
  R.rect(212, 46, 214, 62, H('#1a1c34')); R.poligono([[211, 47], [213, 38], [215, 47]], H('#22243e'));
  degradado(73, 179, [H('#1a2444'), H('#16203e'), H('#121a36'), H('#0e1630')]);
  for (let y = 74; y < 180; y++) for (let x = 0; x < 320; x++) { const q = az(x * 0.41 + y * 3.7); if ((x + y * 5) % 13 === 0 && q > 0.5) R.pset(x, y, H('#2a3658')); }
});
const p2 = (t) => {
  R.copiar(fondo2());
  for (let k = 0; k < 14; k++) { const x = Math.round(az(k + 40) * 320), y = Math.round(az(k + 41) * 56); if (x > 270 && y < 48) continue; if (Math.sin(t * 3 + k * 1.7) > 0.6) R.pset(x, y, H('#ffffff')); }
  // la luna con su halo y su reflejo que tiembla
  R.disco(58, 26, 12, H('#1e2a50')); R.disco(58, 26, 9, H('#2a3664')); R.disco(58, 26, 7, H('#e8e4d0')); R.disco(61, 24, 2, H('#c8c4b0')); R.disco(55, 29, 1, H('#c8c4b0')); R.pset(54, 23, H('#ffffff'));
  nubes(t, [[100, 30, 30, 1.2], [230, 18, 22, 2], [10, 44, 20, 2.8]], [H('#3a4470'), H('#283258'), H('#1c2448')]);
  for (let k = 0; k < 26; k++) { const y = 76 + Math.round(az(k + 60) * 60), w = 1 + Math.round(az(k + 61) * 3 * (1 - (y - 76) / 80)), x = 58 + Math.round((az(k + 62) - 0.5) * (8 + (y - 76) * 0.25) + Math.sin(t * 2 + k) * 2); if (Math.sin(t * 4 + k * 1.3) > -0.3) R.linea(x - w, y, x + w, y, k % 3 ? H('#b8b8b0') : H('#7a7c98')); }
  for (let k = 0; k < 30; k++) { const x = Math.round((az(k) * 340 + t * (4 + az(k + 1) * 5)) % 340) - 10, y = Math.round(78 + az(k + 2) * 100); if (Math.sin(t * 2.5 + k) > 0.2) R.linea(x, y, x + 2 + (k % 3), y, H('#34406a')); }
  // otras barcas que cruzan lejos
  T.barcaRemos(R, Math.round(300 - (t - P2) * 16), 88, t, { n: 4, s: 0.6 });
  T.barcaRemos(R, Math.round(150 - (t - P2) * 10), 98, t, { n: 5, s: 0.7, carga: true });
  T.barcaRemos(R, Math.round(250 - (t - P2) * 12), 112, t, { n: 5, s: 0.8 });
  T.barcaRemos(R, Math.round(60 - (t - P2) * 8), 120, t, { n: 4, s: 0.85, carga: true });
  // la barca de cerca: se mece; los remeros detrás de la borda (se les ve de cintura para arriba)
  const bal = Math.round(Math.sin(t * 1.6) * 1.2), G = 146 + bal, fase = ((t - P2) * 0.9) % 1, tira = Math.sin(fase * Math.PI * 2);
  const remeros = [[52, EL.continental], [92, EL.continental2], [230, EL.continental], [268, EL.continental2]];
  const susto = tramo(t, silencio - 0.9, silencio - 0.05), tapa = t > silencio - 0.08, calla = t > silencio + 0.5;
  for (const [x, def] of remeros) { const inc = Math.round(tira * 2);
    R.actor(def, x + inc, G + 1, t, { dir: 1, sorpresa: susto > 0.5 && !calla, sonrisa: calla && t > silencio + 0.9, sostiene: [x + inc + 18, G - 2] }); }
  // la caja con el gallo, que se hincha para cantar; el soldado de al lado le tapa el pico
  const gx = 160, gy = G - 4, hincha = susto * (tapa ? 0.6 : 1);
  R.rect(gx - 12, gy - 4, gx + 12, gy + 6, H('#5a3a20')); R.rect(gx - 12, gy - 4, gx + 12, gy - 3, H('#8a6238')); for (let x = gx - 11; x <= gx + 11; x += 4) R.linea(x, gy - 2, x, gy + 6, H('#4a2e18')); R.linea(gx - 12, gy + 1, gx + 12, gy + 1, H('#3a2414'));
  R.rect(gx - 9, gy - 10, gx + 9, gy - 4, H('#a8804a')); for (let x = gx - 9; x <= gx + 9; x += 2) R.linea(x, gy - 10, x + 1, gy - 4, H('#7a5a30')); R.linea(gx - 9, gy - 10, gx + 9, gy - 10, H('#d8b070')); R.linea(gx - 9, gy - 7, gx + 9, gy - 7, H('#c8a060'));
  let pico = [gx - 10, gy - 30];
  { const cy = gy - 15 - Math.round(hincha * 3), cx = gx + 1;
    for (let k = 0; k < 5; k++) { const c = [H('#123024'), H('#1e4a34'), H('#2a6a48'), H('#1a2a3a'), H('#3a7a54')][k]; R.linea(cx + 5, cy - 1, cx + 12 + k, cy - 11 + k * 2 + Math.round(Math.sin(t * 4 + k)), c); R.linea(cx + 6, cy - 1, cx + 13 + k, cy - 10 + k * 2 + Math.round(Math.sin(t * 4 + k)), c); }
    R.disco(cx, cy, 7 + Math.round(hincha * 1.5), H('#8a3a1a')); R.disco(cx - 1, cy - 1, 6 + Math.round(hincha * 1.5), H('#c85a28')); R.disco(cx - 2, cy - 2, 3, H('#e88a48')); for (let k = 0; k < 4; k++) R.linea(cx - 3 + k * 2, cy + 1, cx - 1 + k * 2, cy + 4, H('#9a4420'));
    R.linea(cx - 2, cy + 6, cx - 3, gy - 10, H('#e8a040')); R.linea(cx + 2, cy + 6, cx + 3, gy - 10, H('#e8a040')); R.pset(cx - 4, gy - 10, H('#e8a040')); R.pset(cx + 4, gy - 10, H('#e8a040'));
    const nx = cx - 6, ny = cy - 9 - Math.round(hincha * 4); R.poligono([[nx - 2, ny + 2], [nx + 3, ny], [cx + 1, cy - 3], [cx - 5, cy - 1]], H('#e07a30')); for (let k = 0; k < 3; k++) R.linea(nx - 1 + k, ny + 3, nx + 2 + k, cy - 2, H('#c8a040'));
    R.disco(nx, ny - 1, 4, H('#e8b060')); R.disco(nx + 1, ny - 2, 2, H('#f8d080'));
    for (let i = -2; i <= 3; i++) { R.pset(nx + i, ny - 6 - ((i + 2) % 2), H('#e02a2a')); R.pset(nx + i, ny - 5, H('#e02a2a')); } R.pset(nx - 3, ny + 1, H('#e02a2a')); R.pset(nx - 3, ny + 2, H('#e02a2a')); R.pset(nx - 2, ny + 3, H('#b01a1a'));
    R.pset(nx - 1, ny - 2, H('#ffffff')); R.pset(nx - 2, ny - 2, tapa ? H('#ffffff') : H('#1c1222')); if (tapa) { R.pset(nx - 1, ny - 3, H('#1c1222')); R.pset(nx - 2, ny - 3, H('#ffffff')); }
    const abre = !tapa && susto > 0.55 ? 1 : 0; R.linea(nx - 4, ny - 1, nx - 7, ny - abre, H('#e8a040')); R.pset(nx - 6, ny - 1, H('#c88020')); if (abre) { R.linea(nx - 4, ny + 1, nx - 7, ny + 2, H('#c88020')); R.pset(nx - 5, ny, H('#5a1a1a')); }
    pico = [nx - 5, ny];
    if (abre && t < silencio - 0.1) { const r = Math.round((t * 8) % 3); for (const [dx, dy] of [[-10, -3], [-11, 0], [-10, 3]]) R.pset(nx + dx - r, ny + dy, H('#e8ecff')); } }
  const sx = 176, so = R.actor(EL.continental, sx, G + 1, t, { dir: -1, sostiene: tapa && !calla ? [pico[0] + 3, pico[1] + 1] : [sx - 6, G - 2], dedo: calla, sorpresa: susto > 0.4 && !tapa });
  if (tapa && !calla) { const [mx, my] = so.mano; R.rect(mx - 4, my - 2, mx + 1, my + 2, H('#f0c8a0')); R.linea(mx - 4, my + 2, mx + 1, my + 2, H('#c89878')); R.pset(mx - 4, my - 2, H('#1c1222')); }
  if (tapa && t < silencio + 0.6) for (let k = 0; k < 3; k++) R.pset(pico[0] + 2 + k * 3, pico[1] - 12 - Math.round(((t - silencio) * 6 + k) % 3), H('#c8d0e8'));
  // el casco por delante: tablas solapadas con su veta, clavos, la borda clara con luz de luna, los toletes y los remos
  R.poligono([[6, G], [312, G - 3], [300, 168 + bal], [30, 170 + bal]], H('#3a2618'));
  for (let y = G + 1; y < 170 + bal; y++) for (let x = 8; x < 312; x++) { if (R.pget(x, y) !== H('#3a2618')) continue; const f = (y - G) % 5, n2 = az(x * 0.31 + y * 1.7); R.pset(x, y, f === 0 ? H('#22140c') : f === 1 ? H('#5a3a22') : n2 > 0.9 ? H('#4e321e') : (x + y * 7) % 23 === 0 ? H('#6a4a2e') : H('#3e2a1a')); }
  for (let y = G + 3; y < 168; y += 5) for (let x = 20; x < 300; x += 24) R.pset(x + (y % 10 ? 6 : 0), y, H('#8a8a92'));
  R.rect(6, G - 1, 312, G + 1, H('#7a5a3a')); R.linea(6, G - 1, 312, G - 4, H('#b8b0a0')); R.linea(6, G + 1, 312, G - 2, H('#5a3a22'));
  for (const [x] of remeros) { const tx = x + 18, ty = G - 1 - Math.round((tx - 6) * 0.01), ang = fase < 0.55 ? lerp(-0.6, 0.5, fase / 0.55) : lerp(0.5, -0.6, (fase - 0.55) / 0.45), dentro = fase < 0.55, px = Math.round(tx - 18 + Math.sin(ang) * 16), py = dentro ? 178 : 172;
    R.rect(tx - 1, ty - 3, tx + 1, ty, H('#1c120a')); R.pset(tx, ty - 4, H('#8a8a92')); R.linea(tx, ty, px, py, H('#a07a52')); R.linea(tx + 1, ty, px + 1, py, H('#6a4a2a')); R.linea(tx - 1, ty, px - 1, py, H('#c8a070')); R.rect(px - 3, py - 2, px + 2, py + 2, H('#7a5a3a')); R.linea(px - 3, py - 2, px + 2, py - 2, H('#a07a52'));
    if (dentro && fase > 0.15) { R.pset(px - 5, py - 3, H('#c8d8e8')); R.pset(px + 4, py - 2, H('#9ab0c8')); R.pset(px - 7, py - 1, H('#9ab0c8')); } }
  // el farol tapado de la proa con su rendija y un rollo de cabo
  R.rect(14, G - 13, 21, G - 2, H('#2a2a2a')); R.rect(13, G - 14, 22, G - 14, H('#3a3a3a')); R.linea(17, G - 17, 17, G - 15, H('#4a4a4a')); if (Math.sin(t * 6) > -0.6) { R.rect(16, G - 8, 19, G - 7, H('#f0b050')); R.pset(15, G - 8, H('#a87830')); }
  R.anillo(296, G - 4, 4, H('#c8b890')); R.anillo(296, G - 4, 2, H('#a89870'));
  // el agua que lame el casco por delante
  for (let x = 0; x < 320; x += 2) { const y = 171 + bal + Math.round(Math.sin(t * 3 + x * 0.2) * 1.2); R.pset(x, y, H('#2a3a62')); R.pset(x + 1, y + 1, H('#1a2648')); if ((x + Math.floor(t * 6)) % 18 === 0) R.pset(x, y - 1, H('#5a6a98')); }
  for (let y = 173; y < 180; y++) for (let x = 0; x < 320; x++) if ((x + y * 3 + Math.floor(t * 4)) % 9 === 0) R.pset(x, y, H('#22305a'));
};

// 3 · el alba: la última barca y la niebla que la tapa
const p3 = (t) => {
  const nb = R.easeIO(tramo(t, P3 + 0.3, ocultos + 0.6));
  T.guerra1776(R, t, { encuadre: 'rio', luz: 'alba', niebla: nb });
  T.barcaRemos(R, Math.round(120 - (t - P3) * 22), 122, t, { n: 4, s: 0.8, noche: 0.25 });
  T.barcaRemos(R, Math.round(40 - (t - P3) * 14), 136, t, { n: 5, s: 0.9, noche: 0.25 });
  const sale = tramo(t, nieblaT + 0.1, P4 + 0.8), bx = Math.round(166 - R.easeIO(sale) * 110), by = 163;
  const a = tramo(t, P3 + 0.15, P3 + 1.0), bj = tramo(t, P3 + 1.05, nieblaT - 0.4), wb = tramo(t, nieblaT - 0.6, nieblaT + 0.05);
  barcaChibi(bx, by, t, { fase: 'detras' });
  // el ayudante señala la niebla que llega y baja a la barca; Washington, el último, detrás de él
  const ax = bj > 0 ? Math.round(lerp(204, bx + 2, bj)) : Math.round(lerp(256, 204, a)), ay = Math.round(lerp(150, by + 2, bj));
  R.actor(EL.continental, ax, ay, t, { dir: -1, anda: (a > 0 && a < 1) || (bj > 0 && bj < 1), dedo: a >= 1 && bj === 0 });
  const wx = wb > 0 ? Math.round(lerp(222, bx - 22, wb)) : 222, wy = Math.round(lerp(150, by + 2, wb));
  R.actor(EL.washington, wx, wy, t, { dir: -1, anda: wb > 0 && wb < 1, triste: false });
  R.actor(EL.continental2, bx + 16, by + 2, t, { dir: 1 });
  barcaChibi(bx, by, t, { rema: sale > 0, noche: 0.3 });
};

// 4 · el campamento vacío
const p4 = (t) => {
  const nb = 0.65 * (1 - R.easeIO(tramo(t, P4 + 0.1, levanta + 0.9)));
  const r = T.guerra1776(R, t, { encuadre: 'campamento', luz: 'alba', vacio: 1, niebla: nb, nieblaDelante: false }), s = r.suelo;
  aves(t, 3, 30, -10, H('#2a2430'), 11);
  // los casacas rojas entran desde la izquierda, se paran en seco y miran a todas partes
  const pasos = [[EL.ingles, 120, 0], [EL.casacaRoja, 92, 0.25], [EL.casacaRoja, 66, 0.5], [EL.casacaRoja, 150, 0.15]];
  for (const [def, xf, d] of pasos) { const u = tramo(t, P4 + 0.3 + d, llegan + 0.4 + d), x = Math.round(lerp(-22 - d * 30, xf, u)), mira = t > vacioT + 0.4 && t < vacioT + 1.6 ? (Math.floor((t - vacioT) * 2 + d * 4) % 2 ? -1 : 1) : 1;
    if (def === EL.casacaRoja && xf === 150) continue;
    R.actor(def, x, s - (xf === 66 ? 4 : 0), t, { dir: mira, anda: u > 0 && u < 1, sorpresa: t > vacioT && t < vacioT + 1.8, dedo: def === EL.ingles && t > llegan + 0.3 && t < vacioT - 0.1, enfado: t > vacioT + 1.8 }); }
  // el cuarto va a la olla olvidada y le levanta la tapa: no hay nadie
  const ox = r.olla[0], oy = r.olla[1], u4 = tramo(t, P4 + 0.6, vacioT + 0.2), kx = Math.round(lerp(-30, ox + 10, u4)), levantaTapa = tramo(t, vacioT + 0.5, vacioT + 0.9);
  const k4 = R.actor(EL.casacaRoja, kx, oy + 4, t, { dir: -1, anda: u4 > 0 && u4 < 1, sostiene: levantaTapa > 0 ? [ox + 2, oy - 8] : false, sorpresa: t > vacioT });
  if (levantaTapa > 0) { const [mx, my] = k4.mano; R.linea(mx - 4, my, mx + 2, my, H('#4a4a52')); R.linea(mx - 4, my + 1, mx + 2, my + 1, H('#2a2a32')); R.pset(mx - 1, my - 1, H('#7a7a82')); }
  if (t > vacioT + 1.0) R.bocadillo(kx + 7, oy - 26, { icono: '?' });
  if (nb > 0) T.b_niebla(R, t, nb, r.niebla);
};

const efectos = [[0.6, 'ola'], [lleva + 0.4, 'chof'], [P2 + 0.4, 'chof'], [silencio, 'golpecito'], [P3 + 0.5, 'viento'], [nieblaT + 0.4, 'chof'], [levanta, 'rafaga'], [vacioT, 'golpecito'], [vacioT + 0.6, 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1776 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['ny-harlem'] = ('Harlem Heights', '''// NY-HARLEM (frase 22), septiembre de 1776 a 1783, sin cartela. Dos planos:
// 1. los altos de Harlem en otoño: los soldados suben la loma, Washington se vuelve hacia ellos («Washington wins») y en
//    «victory» todos lanzan los tricornios al aire; el tambor redobla y la bandera ondea; abajo, los barcos británicos;
//    corta en «But».
// 2. dentro de una casa de la ciudad ocupada: por la ventana pasan casacas rojas y la bandera británica en la casa de
//    enfrente; el vecino arranca las hojas del calendario de 1776 a 1783 («seven years») mientras por la ventana pasan las
//    estaciones; en «end of the war» la bandera de enfrente baja y el vecino da un salto de alegría.''', AUX + r'''
const h = (k) => en('harlem', k);
const P2 = h(0.584), washT = h(0.282), gana = h(0.32), victoria = h(0.47), siete = h(0.737), hasta = h(0.863), fin = h(0.947);
const F0 = siete - 0.35, F1 = fin - 0.15, hojas = (t) => Math.max(0, Math.min(7, Math.floor((t - F0) / ((F1 - F0) / 7)) + (t >= F0 ? 1 : 0)));
const anyo = (t) => (t < P2 ? 1776 : 1776 + hojas(t));

// 1 · los altos de Harlem: la primera victoria
const p1 = (t) => {
  const r = T.guerra1776(R, t, { encuadre: 'altos' }), s = r.suelo;
  const tropa = [[EL.continental, 64, 0], [EL.continental, 90, 0.3], [EL.continental, 116, 0.6], [EL.continental2, 142, 0.9]];
  const lanza = (k) => tramo(t, victoria - 0.1 + k * 0.08, victoria + 1.1 + k * 0.08);
  tropa.forEach(([def, xf, d], k) => { const u = tramo(t, 0.2 + d * 0.6, 2.2 + d * 0.6), x = Math.round(lerp(-24 - k * 18, xf, u)), l = lanza(k), aire = l > 0 && l < 1;
    const a = R.actor(def, x, s + (k % 2) * 3, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > victoria - 0.15 && t < victoria + 1.6, sonrisa: t > gana, tocado: aire && def === EL.continental ? '' : undefined, salto: aire ? Math.round(Math.sin(l * Math.PI) * 3) : 0, sostiene: k === 3 && t < victoria - 0.1 ? true : false });
    if (aire && def === EL.continental) tricornio(x + 7 + Math.sin(l * 5 + k) * 4, a.cabeza[1] + 2 - Math.sin(l * Math.PI) * 40, l * 10 + k);
    // el tambor del cuarto: redobla con las baquetas
    if (k === 3 && t < victoria - 0.1) { const [mx, my] = a.mano; R.rect(mx - 3, my, mx + 3, my + 6, H('#2a3a6a')); R.linea(mx - 3, my + 3, mx + 3, my + 3, H('#e8e0cc')); R.rect(mx - 3, my, mx + 3, my, H('#c83a2a')); R.rect(mx - 3, my + 6, mx + 3, my + 6, H('#c83a2a')); R.linea(mx - 2, my - 1, mx + 2, my - 1, H('#e8dcc0')); const b = Math.floor(t * 8) % 2; R.linea(mx - 1, my - 1 - b * 2, mx - 4, my - 5, H('#8a6a44')); R.linea(mx + 1, my - 3 + b * 2, mx + 4, my - 6, H('#8a6a44')); } });
  // el abanderado junto a Washington: la bandera azul del regimiento ondea
  const fx = 214, ab = R.actor(EL.continental, fx, s - 2, t, { dir: -1, sostiene: [fx - 4, s - 20], sonrisa: t > victoria });
  { const [mx, my] = ab.mano; R.linea(mx, my - 26, mx, my + 10, H('#8a6a44')); R.pset(mx, my - 27, H('#c8a040'));
    ondea(mx - 1, my - 25, 20, 12, t, (q, v) => { const r2 = Math.hypot((q - 0.45) * 20, (v - 0.5) * 12); return r2 > 3 && r2 < 4.3 ? H('#f4f0e8') : r2 < 1.5 ? H('#e8c040') : H('#1e3a8a'); }, { d: -1 }); }
  // Washington, de espaldas mirando el río; se vuelve hacia sus hombres y levanta la mano
  const vuelto = t > washT - 0.2;
  R.actor(EL.washington, 182, s, t, { dir: vuelto ? -1 : 1, dedo: t > gana && t < victoria + 1.2, sonrisa: t > victoria });
};

// 2 · la ciudad ocupada, vista desde una casa: el calendario corre siete años
const VEN = [24, 30, 110, 112];
const fondo2 = () => fijo('hf2', () => {
  // la pared de yeso encalado con vigas, el zócalo de tablas y el suelo de tablones
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) { const n = az(x * 1.3 + y * 7.1); R.pset(x, y, n < 0.06 ? H('#c8bca0') : n > 0.94 ? H('#f2ead6') : (x * 3 + y * 5) % 37 === 0 ? H('#d8ccb0') : H('#e6dcc4')); }
  for (const vx of [0, 132, 240]) { R.rect(vx, 0, vx + 7, 123, H('#6a4a2e')); R.linea(vx + 1, 0, vx + 1, 123, H('#8a6a44')); for (let y = 4; y < 123; y += 9) R.pset(vx + 3 + (y % 2), y, H('#4a321c')); }
  R.rect(0, 0, 319, 6, H('#5a3e26')); R.linea(0, 6, 319, 6, H('#3a2414')); for (let x = 10; x < 320; x += 26) R.rect(x, 7, x + 5, 10, H('#5a3e26'));
  for (let y = 124; y < 146; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 124 ? H('#8a6a44') : y === 125 ? H('#3a2414') : x % 40 === 0 || x % 40 === 1 ? H('#4a321c') : (y - 128) % 14 === 0 ? H('#5a3e26') : x % 40 < 3 || (y > 128 && y < 140 && (x % 40 === 6 || x % 40 === 34)) ? H('#5a3e26') : H('#7a5a38'));
  for (let y = 146; y < 180; y++) { const w = 6 + Math.round((y - 146) * 0.25); for (let x = 0; x < 320; x++) { const k = Math.floor((x - 160) / (w * 2.6) + 50); R.pset(x, y, Math.abs(((x - 160) / (w * 2.6) + 50) - k) < 0.04 ? H('#4a2e18') : (y - 146) % 9 === 0 && (k % 3) === 0 ? H('#5a3a22') : az(k * 3.7) > 0.5 ? H('#8a6238') : H('#7a5430')); } }
  R.rect(0, 146, 319, 147, H('#4a2e18'));
  // la calle de fuera, por la ventana: casas de ladrillo de enfrente, adoquines, el cielo de invierno
  const [x0, y0, x1, y1] = VEN;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y < 54 ? (bay(x, y) < (y - y0) / 24 ? H('#c8d4e0') : H('#a8bcd2')) : y > 100 ? ((x + (y & 1) * 2) % 4 === 0 || y % 3 === 0 ? H('#6a6a72') : H('#8a8a92')) : H('#a8bcd2'));
  for (const [hx, hw, hy, col] of [[x0, 34, 46, '#9a4a32'], [x0 + 34, 30, 40, '#8a5a3a'], [x0 + 64, 30, 50, '#a8583a']]) {
    for (let y = hy; y <= 100; y++) for (let x = hx; x < Math.min(x1 + 1, hx + hw); x++) R.pset(x, y, (y - hy) % 3 === 0 ? H('#7a3a28') : (x + ((y - hy) / 3 | 0) * 3) % 6 === 0 ? H('#7a3a28') : H(col));
    R.poligono([[hx - 1, hy], [hx + hw / 2, hy - 8], [hx + hw, hy]], H('#4a4a5a')); for (let wy = hy + 6; wy < 92; wy += 16) for (let wx = hx + 4; wx < hx + hw - 6; wx += 11) { R.rect(wx, wy, wx + 5, wy + 8, H('#2a3444')); R.linea(wx, wy + 4, wx + 5, wy + 4, H('#e8e0cc')); R.linea(wx, wy, wx + 5, wy, H('#e8e0cc')); }
    R.rect(hx + hw / 2 - 3, 90, hx + hw / 2 + 3, 100, H('#3a2a20')); }
  // el calendario de pared: papel grueso clavado, con la cuadrícula de los días
  R.rect(148, 34, 214, 112, H('#5a4a3a')); R.rect(150, 36, 212, 110, H('#f4ecd8')); R.rect(150, 36, 212, 52, H('#b8302a')); R.linea(150, 52, 212, 52, H('#8a2420'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) { R.rect(154 + i * 8, 84 + j * 6, 159 + i * 8, 88 + j * 6, (i + j * 7) % 9 === 4 ? H('#e8a8a0') : H('#d8ccb4')); }
  R.disco(181, 33, 2, H('#8a8a92')); R.pset(180, 32, H('#d8d8e0'));
  // el reloj de pared con su péndulo, un estante con platos de peltre
  R.rect(252, 52, 278, 118, H('#4a2e18')); R.rect(254, 54, 276, 116, H('#6a4428')); R.disco(265, 66, 9, H('#3a2414')); R.disco(265, 66, 8, H('#f4ecd8')); for (let k = 0; k < 12; k++) R.pset(265 + Math.round(Math.cos(k * 0.524) * 6), 66 + Math.round(Math.sin(k * 0.524) * 6), H('#3a2a20'));
  R.rect(258, 78, 272, 112, H('#2a1a10'));
  R.rect(222, 20, 300, 23, H('#6a4a2e')); R.linea(222, 23, 300, 23, H('#3a2414')); for (const [px, pr] of [[230, 6], [246, 7], [262, 6]]) { R.disco(px, 16 - pr + 6, pr, H('#8a8a96')); R.disco(px - 1, 15 - pr + 6, pr - 2, H('#a8a8b4')); R.pset(px - 2, 12, H('#e8e8f0')); }
  R.rect(284, 10, 290, 22, H('#c8b080')); R.rect(284, 10, 290, 11, H('#8a7040'));
  // la mesa con mantel, la vela, la jarra y un libro; la alfombra; la chimenea a la derecha
  R.rect(212, 132, 300, 136, H('#6a4428')); R.linea(212, 132, 300, 132, H('#8a6238')); R.rect(216, 136, 219, 162, H('#4a2e18')); R.rect(294, 136, 297, 162, H('#4a2e18'));
  R.rect(212, 130, 254, 131, H('#e8dcc0')); for (let x = 212; x < 254; x += 3) R.pset(x, 132, H('#e8dcc0'));
  R.rect(262, 124, 268, 131, H('#8a8a96')); R.rect(263, 125, 267, 126, H('#b8b8c4')); R.rect(268, 126, 270, 129, H('#6a6a76'));
  R.rect(276, 127, 292, 131, H('#5a2a2a')); R.linea(276, 127, 292, 127, H('#8a4a3a')); R.linea(277, 129, 291, 129, H('#e8dcc0'));
  R.rect(236, 122, 238, 131, H('#f4ecd8')); R.rect(233, 130, 241, 131, H('#8a8a96'));
  for (let y = 154; y < 174; y++) for (let x = 40; x < 150; x++) { const e = Math.min(y - 154, 173 - y, x - 40, 149 - x); R.pset(x, y, e < 2 ? H('#c8a040') : (x + y) % 6 < 2 ? H('#7a2a2a') : (x - y + 200) % 8 < 2 ? H('#2a3a5a') : H('#9a3a32')); }
});
const p2 = (t) => {
  R.copiar(fondo2());
  const [x0, y0, x1, y1] = VEN, est = Math.floor(((t - P2) * 1.1 + (t > F0 ? (t - F0) * 1.8 : 0)) % 4);
  R.recorte([x0, y0, x1, y1]);
  // nubes y la bandera británica en la casa de enfrente (baja al acabar la guerra)
  nube3(((t * 4) % 120) + x0 - 20, 40, 16, [H('#f4f4f8'), H('#d8dee8'), H('#b0bccc')]);
  const baja = tramo(t, fin - 0.1, fin + 0.9); R.linea(x0 + 46, 44, x0 + 66, 34, H('#4a3a2a'));
  if (baja < 1) ondea(x0 + 62, 32 + Math.round(baja * 30), 14, 9, t, UNION, { d: 1 });
  // el árbol de la calle según la estación
  const copa = [['#6a9a40', '#4a7230'], ['#d8782a', '#a8481a'], null, ['#f0b8c8', '#8ab060']][est];
  R.linea(x0 + 12, 100, x0 + 12, 66, H('#4a3220')); R.linea(x0 + 12, 76, x0 + 4, 66, H('#4a3220')); R.linea(x0 + 12, 72, x0 + 20, 62, H('#4a3220'));
  if (copa) for (let k = 0; k < 18; k++) { const a = az(k + 3) * 6.28, d2 = az(k + 4) * 9; R.disco(Math.round(x0 + 12 + Math.cos(a) * d2), Math.round(64 + Math.sin(a) * d2 * 0.7), 2, H(copa[k % 2])); }
  // los casacas rojas que pasan desfilando, por parejas
  for (let k = 0; k < 2; k++) { const u = ((t - P2) * 0.32 + k * 0.5) % 1, x = Math.round(lerp(x0 - 20, x1 + 6, u)); R.actor(EL.casacaRoja, x, 105, t, { dir: 1, anda: true }); R.actor(EL.casacaRoja, x - 16, 106, t, { dir: 1, anda: true }); }
  // nieve, hojas o lluvia según la estación
  for (let k = 0; k < 26; k++) { const x = x0 + Math.round((az(k) * 90 + t * 6 + Math.sin(t + k) * 3) % 90), y = y0 + Math.round((az(k + 1) * 82 + t * (est === 2 ? 14 : 22)) % 82);
    if (est === 2) R.pset(x, y, H('#ffffff')); else if (est === 1 && k % 2) { R.pset(x, y, H('#d8782a')); R.pset(x + 1, y, H('#a8481a')); } else if (est === 3 && k % 3 === 0) R.pset(x, y, H('#f0b8c8')); }
  if (est === 2) for (let x = x0; x <= x1; x++) for (const hy of [46, 40, 50]) R.pset(x, hy - 1, H('#ffffff'));
  R.recorte(null);
  // el marco de la ventana: travesaños, alféizar y las cortinas que se mecen
  for (const vx of [x0 + 28, x0 + 57]) R.rect(vx, y0, vx + 1, y1, H('#e8e0cc')); for (const vy of [y0 + 27, y0 + 54]) R.rect(x0, vy, x1, vy + 1, H('#e8e0cc'));
  R.rect(x0 - 3, y0 - 3, x1 + 3, y0 - 1, H('#e8e0cc')); R.rect(x0 - 3, y0 - 3, x0 - 1, y1 + 3, H('#e8e0cc')); R.rect(x1 + 1, y0 - 3, x1 + 3, y1 + 3, H('#e8e0cc')); R.rect(x0 - 6, y1 + 1, x1 + 6, y1 + 4, H('#d8ccb0')); R.linea(x0 - 6, y1 + 4, x1 + 6, y1 + 4, H('#8a7a5a'));
  for (const [cx, d] of [[x0 - 8, 1], [x1 + 2, -1]]) for (let y = y0 - 6; y < y1 + 10; y++) { const w = 8 + Math.round(Math.sin(t * 1.3 + y * 0.12) * 1.5) + Math.round((y - y0) * 0.04); for (let i = 0; i < w; i++) R.pset(cx + d * i + (d < 0 ? 6 : 0), y, (i + Math.round(y * 0.1)) % 4 === 0 ? H('#7a2a2a') : H('#9a3a32')); }
  R.rect(x0 - 10, y0 - 8, x1 + 10, y0 - 6, H('#4a2e18'));
  // el péndulo del reloj, la vela que tiembla y el gato en la alfombra
  const pa = Math.sin(t * 3.4) * 0.35; R.linea(265, 80, Math.round(265 + Math.sin(pa) * 24), Math.round(80 + Math.cos(pa) * 24), H('#c8a040')); R.disco(Math.round(265 + Math.sin(pa) * 24), Math.round(80 + Math.cos(pa) * 24), 3, H('#e8c050'));
  R.linea(265, 66, 265 + Math.round(Math.cos(t * 0.5) * 5), 66 + Math.round(Math.sin(t * 0.5) * 5), H('#2a1a10')); R.linea(265, 66, 265, 61, H('#2a1a10'));
  const fl = Math.sin(t * 13) > 0 ? 1 : 0; R.pset(237, 120 - fl, H('#f8d060')); R.pset(237, 121, H('#f0a030')); R.pset(236, 121, H('#f8e090'));
  { const gx = 92, gy = 166, c = Math.sin(t * 2) > 0 ? 1 : 0; R.rect(gx, gy - 4, gx + 11, gy, H('#4a4a52')); R.rect(gx + 9, gy - 7, gx + 14, gy - 3, H('#4a4a52')); R.pset(gx + 10, gy - 8, H('#4a4a52')); R.pset(gx + 13, gy - 8, H('#4a4a52')); R.linea(gx + 11, gy - 5, gx + 12, gy - 5, H('#2a2a32')); R.linea(gx, gy - 1, gx - 4, gy - 3 - c, H('#4a4a52')); R.linea(gx + 1, gy - 3, gx + 8, gy - 3, H('#6a6a72')); }
  // el calendario: el año grande y las hojas que se arrancan y caen
  const n = hojas(t), y = 1776 + n;
  R.numero(String(y), 181, 74, { tam: 16, centro: true });
  for (let k = 0; k < n; k++) { const tk = F0 + k * ((F1 - F0) / 7), u = tramo(t, tk, tk + 0.9), px = Math.round(150 + k * 9 + u * (k % 2 ? 30 : -24)), py = Math.round(lerp(40, 170 - (k % 3) * 2, u)), ang = u * 8 + k;
    if (u < 1) { const w = Math.round(14 * Math.abs(Math.cos(ang))) + 2; R.rect(px - w, py, px + w, py + 8, H('#f4ecd8')); R.rect(px - w, py, px + w, py + 2, H('#b8302a')); R.linea(px - w, py + 8, px + w, py + 8, H('#c8bca0')); }
    else { R.rect(px - 10, py - 2, px + 10, py, H('#f4ecd8')); R.rect(px - 10, py - 2, px - 6, py, H('#b8302a')); R.linea(px - 10, py + 1, px + 10, py + 1, H('#8a6238')); } }
  // el vecino: mira por la ventana, va al calendario, arranca las hojas y salta de alegría al final
  const va = tramo(t, P2 + 0.9, F0 - 0.05), vx = Math.round(lerp(96, 160, va)), alegre = t > fin;
  R.actor(EL.libertad, vx, 151, t, { dir: va > 0 ? 1 : -1, anda: va > 0 && va < 1, triste: t < F0 + 0.6, dedo: t > F0 - 0.1 && t < F1 + 0.1 && Math.floor((t - F0) / ((F1 - F0) / 7) * 2) % 2 === 0, sorpresa: t > hasta && t < fin, sonrisa: alegre, salto: alegre ? Math.round(Math.abs(Math.sin((t - fin) * 7)) * 5) : 0, brazos: alegre && t < fin + 1.4 });
};

const efectos = [[0.4, 'viento'], [1.2, 'toc'], [gana, 'brillo'], [victoria, 'publico'], [P2 + 0.4, 'tic'], [F0 + 0.05, 'papel'], [F0 + (F1 - F0) * 3 / 7, 'papel'], [F0 + (F1 - F0) * 6 / 7, 'papel'], [fin + 0.1, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: anyo });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['ny-mastil'] = ('El mástil engrasado', '''// NY-MASTIL (frase 23), 25 de noviembre de 1783, cartela «1783». Tres planos:
// 1. a ras de agua: el gran barco británico suelta velas y se va hacia el estrecho; un bote con casacas rojas rema hacia
//    él y el oficial se vuelve a mirar el mástil de la Batería con una sonrisa pícara; corta en «The departing».
// 2. la Batería: un casaca roja engrasa el mástil con la brocha («greased flagpole») y se va; llega el marinero, salta,
//    sube un poco y resbala hasta abajo (gag); se sienta y se pone los tacos; la gente se ríe; corta en «climbed up».
// 3. lo alto del mástil contra el cielo y el puerto abajo: el marinero sube con los tacos, arranca la bandera británica
//    («swap»), iza la de las barras y estrellas («stars and stripes») y la multitud de abajo aplaude.''', AUX + r'''
const m = (k) => en('mastil', k);
const P2 = m(0.339), P3 = m(0.739);
const noviembre = m(0.086), clavaron = m(0.409), engrasado = m(0.529), joven = m(0.662), tacos = m(0.777), cambia = m(0.82), estrellas = m(0.89), barras = m(0.942);
const CIELO = [H('#4a7ac0'), H('#5a88c8'), H('#6c98d0'), H('#84aad8'), H('#a0bede'), H('#bccfe2'), H('#d4dce4')];
const NUB = [H('#ffffff'), H('#dfe6ee'), H('#b4c0d0')];

// 1 · el barco británico se va; el bote de los casacas rojas
const fondo1 = () => fijo('mf1', () => {
  degradado(0, 92, CIELO);
  // Staten Island y Brooklyn al fondo, el estrecho en medio
  for (let x = 0; x < 320; x++) { const y = x > 200 ? Math.round(84 - Math.sin((x - 200) * 0.03) * 7) : 92; for (let yy = y; yy < 93; yy++) R.pset(x, yy, (yy - y) < 1 ? H('#9aaac0') : (x + yy) % 4 ? H('#8a9ab2') : H('#7e8ea8')); }
  // el agua: degradado y rizos fijos
  degradado(93, 179, [H('#7a9cb8'), H('#6a8eae'), H('#5e82a4'), H('#527698'), H('#486c8e')]);
  for (let y = 94; y < 180; y++) for (let x = 0; x < 320; x++) { const n = az(x * 0.53 + y * 3.1); if ((x + y * 5) % 9 === 0 && n > 0.45) R.pset(x, y, H('#8eb0c8')); else if ((x * 3 + y) % 11 === 0 && n < 0.3) R.pset(x, y, H('#3e6084')); }
});
const frente1 = () => fijo('mg1', () => {
  // la punta de Manhattan a la izquierda: el muelle, el fuerte bajo, casas, la aguja de la Trinidad, un molino y el mástil
  for (let x = 0; x < 132; x++) { const k = x >> 3, h = 6 + Math.round(az(k + 70) * 9) - Math.round(x * 0.03); for (let y = 90 - h; y <= 92; y++) R.pset(x, y, y === 90 - h ? H('#9a6a5a') : (x & 7) === 0 ? H('#6a4a44') : ((x & 7) === 3 || (x & 7) === 5) && (y - 90 + h) % 4 === 2 ? H('#e0d4b0') : az(k + 7) > 0.5 ? H('#a85a44') : H('#8a6a5c')); }
  R.rect(0, 90, 120, 96, H('#9a9284')); for (let x = 0; x < 120; x += 5) R.linea(x, 90, x, 96, H('#7a7264')); R.linea(0, 90, 120, 90, H('#c0b8a8')); R.linea(120, 90, 132, 96, H('#9a9284'));
  R.rect(36, 52, 39, 78, H('#9a7c78')); R.poligono([[35, 53], [37, 40], [40, 53]], H('#aa8c86')); R.pset(37, 39, H('#c8a040'));
  R.rect(96, 66, 100, 80, H('#a88c76')); for (const [dx, dy] of [[-7, -7], [7, 7], [-7, 7], [7, -7]]) R.linea(98, 66, 98 + dx, 66 + dy, H('#7a6a5a'));
  R.linea(66, 38, 66, 89, H('#4a3a2a')); R.pset(66, 37, H('#d8b048'));
  for (let x = 0; x < 132; x++) if ((x + 2) % 4 === 0) { R.pset(x, 97, H('#3e5a74')); R.pset(x + 1, 98, H('#4e6a84')); }
});
const p1 = (t) => {
  R.copiar(fondo1());
  nubes(t, [[30, 20, 46, 2.4], [170, 34, 36, 3.6], [250, 56, 24, 4.8], [110, 54, 22, 5.4]], NUB);
  aves(t, 4, 28, 14, H('#3a3a44'), 21);
  // brillos que corren por el agua
  for (let k = 0; k < 44; k++) { const x = Math.round((az(k) * 340 + t * (5 + az(k + 1) * 8)) % 340) - 10, y = Math.round(96 + az(k + 2) * 82); if (Math.sin(t * 3 + k) > -0.2) R.linea(x, y, x + 2 + (k % 4), y, H('#a8c8dc')); }
  // los barcos que ya se van hacia el estrecho, pequeños
  barco(lerp(232, 262, tramo(t, 0, 6)), 90, 0.38, t, { dir: 1, bruma: 0.45, colBruma: '#b0c0d4' });
  barco(lerp(194, 230, tramo(t, 0, 6)), 94, 0.55, t, { dir: 1, bruma: 0.3, colBruma: '#b0c0d4', avanza: true });
  pegar(frente1());
  R.recorte([0, 0, 319, 89]); ondea(67, 38, 8, 5, t, UNION, { d: 1 }); R.recorte(null);
  // el gran barco británico suelta velas y empieza a moverse
  const v = R.easeIO(tramo(t, noviembre - 0.4, noviembre + 1.4)), bx = 200 + R.easeIO(tramo(t, noviembre + 0.6, P2 + 1)) * 26;
  barco(bx, 140, 2.3, t, { dir: 1, velas: 0.15 + v * 0.85, avanza: v > 0.5 });
  // gaviotas posadas en un barril que flota
  { const fx = Math.round(150 + Math.sin(t * 0.5) * 3), fy = 160 + Math.round(Math.sin(t * 1.4) * 1); R.rect(fx - 4, fy - 5, fx + 4, fy, H('#8a5a32')); R.rect(fx - 4, fy - 3, fx + 4, fy - 3, H('#4a4a52')); R.linea(fx - 5, fy + 1, fx + 5, fy + 1, H('#a8c8dc')); R.pset(fx, fy - 7, H('#f2f2f2')); R.pset(fx - 1, fy - 7, H('#f2f2f2')); R.pset(fx + 1, fy - 8, H('#f2f2f2')); R.pset(fx + 2, fy - 8, H('#e8a040')); R.pset(fx, fy - 6, H('#c8c8d0')); }
  // el bote de los casacas rojas que rema hacia el barco; el oficial se vuelve hacia el mástil y sonríe
  const u = (t - 1) * 13, x = Math.round(36 + u), y = 166, mira = t > noviembre + 1.2 && t < P2 + 0.2;
  barcaChibi(x, y, t, { fase: 'detras', dir: 1 });
  R.actor(EL.casacaRoja, x + 14, y + 2, t, { dir: -1 });
  R.actor(EL.casacaRoja, x - 6, y + 2, t, { dir: -1 });
  R.actor(EL.ingles, x - 28, y + 2, t, { dir: mira ? -1 : 1, sonrisa: mira, dedo: mira && t > noviembre + 1.6 });
  barcaChibi(x, y, t, { rema: true, dir: 1 });
};

// 2 · la Batería: el mástil engrasado
const p2 = (t) => {
  const r = T.colonial(R, t, { encuadre: 'bateria', bandera: 'britanica', altura: 1, salen: 0.35 + 0.4 * tramo(t, P2, P3 + 1), multitud: 0.8 }), s = r.suelo, M = r.mastil;
  // el brillo de la grasa que resbala por el mástil
  for (let k = 0; k < 3; k++) { const y = Math.round(M.cima + ((t * 22 + k * 40) % (M.pie - M.cima))); R.pset(M.x + 1, y, H('#f8f4e0')); R.pset(M.x + 1, y + 1, H('#c8c0a8')); }
  // los dos vecinos del banco, que se ríen del resbalón
  const risa = t > joven + 0.15 && t < tacos;
  R.actor(EL.libertad2, 238, s - 2, t, { dir: -1, sonrisa: risa || t > tacos, sorpresa: t > joven - 0.3 && t < joven + 0.15, dedo: risa });
  R.actor(EL.dama, 258, s, t, { dir: -1, sonrisa: risa, sorpresa: t > joven - 0.3 && t < joven + 0.15 });
  // el casaca roja engrasa el mástil con la brocha, señala la bandera clavada y se va con su cubo
  const fu = tramo(t, engrasado + 0.5, joven + 0.2), cx = Math.round(lerp(176, 336, fu)), pinta = t < engrasado + 0.5;
  const brocha = pinta ? [M.x - 1, Math.round(s - 30 + Math.sin(t * 7) * 9)] : false;
  const cr = R.actor(EL.casacaRoja, cx, s, t, { dir: fu > 0 ? 1 : 1, anda: fu > 0 && fu < 1, sostiene: brocha || true, dedo: false, sonrisa: t > clavaron - 0.2 });
  { const [mx, my] = cr.mano; if (pinta) { R.linea(mx, my, mx + 3, my - 2, H('#8a6a44')); R.rect(mx + 3, my - 4, mx + 5, my - 1, H('#e8dcb0')); R.pset(mx + 5, my - 3, H('#f8f4e0')); }
    else { R.rect(mx - 3, my + 1, mx + 3, my + 7, H('#5a5a64')); R.linea(mx - 3, my + 1, mx + 3, my + 1, H('#8a8a96')); R.rect(mx - 2, my + 2, mx + 2, my + 3, H('#e8dcb0')); } }
  if (pinta) { const bx = 166, by = s; R.rect(bx - 3, by - 7, bx + 3, by, H('#5a5a64')); R.linea(bx - 3, by - 7, bx + 3, by - 7, H('#8a8a96')); R.rect(bx - 2, by - 6, bx + 2, by - 5, H('#e8dcb0')); R.linea(bx - 4, by - 9, bx + 4, by - 9, H('#3a3a44')); }
  // el marinero: llega corriendo, salta al mástil, sube un poco y resbala hasta abajo; se sienta y se pone los tacos
  const llega = tramo(t, engrasado + 0.3, joven - 0.75), sube = tramo(t, joven - 0.7, joven - 0.15), cae = tramo(t, joven - 0.1, joven + 0.3);
  const sentado = t > joven + 0.3, mx2 = Math.round(lerp(-20, 182, llega));
  let x = mx2, y = s, o = { dir: 1, anda: llega > 0 && llega < 1 };
  if (sube > 0 && cae === 0) { x = M.x - 9; y = Math.round(s - 10 - sube * 54); o = { dir: 1, brazos: true, sorpresa: false, sonrisa: true }; }
  if (cae > 0) { x = M.x - 9; y = Math.round(lerp(s - 64, s, cae * cae)); o = { dir: 1, brazos: cae < 0.9, sorpresa: true }; }
  if (sentado) { x = 176; y = s + 3; o = { dir: 1, enfado: t < tacos - 0.9, sonrisa: t > tacos - 0.5, sostiene: [x + 10, s + 2] }; }
  const ma = R.actor(EL.marinero83, x, y, t, o);
  if (cae > 0 && cae < 1) for (let k = 0; k < 4; k++) R.pset(M.x + (k % 2 ? 3 : -3), Math.round(y - 20 - k * 4), H('#f8f4e0'));
  if (sentado && t < joven + 0.9) for (let k = 0; k < 5; k++) { const a = k * 1.25 + t * 3; R.pset(Math.round(x + 7 + Math.cos(a) * 9), Math.round(y - 30 + Math.sin(a) * 2), H('#f8e060')); }
  if (sentado) { const ta = tramo(t, joven + 0.55, tacos - 0.2); for (const [k, fx] of [[0, x + 3], [1, x + 9]]) if (ta > k * 0.5) { R.linea(fx, y, fx + 4, y, H('#8a8a96')); R.pset(fx, y + 1, H('#c8c8d0')); R.pset(fx + 2, y + 1, H('#c8c8d0')); R.pset(fx + 4, y + 1, H('#c8c8d0')); }
    if (ta < 1) { const [hx, hy] = ma.mano; R.linea(hx, hy, hx + 3, hy - 2, H('#6a6a76')); R.rect(hx + 2, hy - 4, hx + 4, hy - 2, H('#8a8a96')); } }
};

// 3 · lo alto del mástil: el cambio de bandera y la multitud de abajo
const MX = 128;
const fondo3 = () => fijo('mf3', () => {
  degradado(0, 128, CIELO);
  // el puerto visto desde arriba: el agua, la isla del Gobernador, Brooklyn y Nueva Jersey a lo lejos
  for (let x = 0; x < 320; x++) { const y = Math.round(118 - Math.sin(x * 0.02) * 3); for (let yy = y; yy < 129; yy++) R.pset(x, yy, (yy - y) < 1 ? H('#9aaac0') : H('#8a9ab2')); }
  degradado(129, 160, [H('#7a9cb8'), H('#6a8eae'), H('#5e82a4')]);
  for (let y = 129; y < 160; y++) for (let x = 0; x < 320; x++) if ((x + y * 5) % 9 === 0 && az(x * 0.5 + y) > 0.5) R.pset(x, y, H('#9ab8cc'));
  R.poligono([[196, 140], [214, 134], [246, 136], [252, 142], [222, 146], [200, 145]], H('#7a9a5a')); R.linea(196, 140, 214, 134, H('#9ab870')); R.rect(218, 136, 226, 140, H('#9a8a7a')); R.rect(219, 135, 225, 135, H('#7a6a5a'));
  // la Batería abajo: el parapeto, la explanada con hierba de otoño, dos cañones viejos, árboles y la peana del mástil
  for (let y = 160; y < 166; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 160 ? H('#d8d0c0') : (x + (y & 1) * 3) % 6 === 0 ? H('#8a8274') : H('#b0a898'));
  for (let y = 166; y < 180; y++) for (let x = 0; x < 320; x++) { const n = az(x * 2.1 + y * 5.3); R.pset(x, y, n < 0.15 ? H('#7a8a3a') : n > 0.88 ? H('#c8a048') : (x + y) % 7 === 0 ? H('#a08a3a') : H('#8a9a48')); }
  for (const cx of [40, 262]) { R.rect(cx - 6, 162, cx + 6, 165, H('#3a3a44')); R.disco(cx + 6, 163, 2, H('#2a2a34')); R.anillo(cx - 3, 166, 2, H('#5a3a20')); R.anillo(cx + 3, 166, 2, H('#5a3a20')); }
  for (const tx of [14, 300]) { R.linea(tx, 178, tx, 158, H('#5a3a22')); for (const [dx, dy] of [[-5, -8], [5, -10], [-3, -14], [4, -5]]) R.linea(tx, 166, tx + dx, 166 + dy - 6, H('#5a3a22')); }
  R.rect(MX - 10, 172, MX + 10, 179, H('#b0a898')); R.rect(MX - 10, 172, MX + 10, 172, H('#d8d0c0'));
});
const p3 = (t) => {
  R.copiar(fondo3());
  nubes(t, [[20, 22, 50, 2.6], [190, 40, 40, 3.8], [250, 72, 30, 5], [90, 70, 24, 5.6], [330, 96, 34, 4.2], [150, 100, 20, 6.2]], NUB);
  aves(t, 5, 52, 10, H('#4a4a58'), 31);
  for (let k = 0; k < 3; k++) { const a = t * 0.8 + k * 2.1; R.gaviota(Math.round(220 + Math.cos(a) * 40), Math.round(70 + Math.sin(a) * 14), t, k); }
  // los barcos británicos que se alejan, pequeños, en el agua de abajo
  for (let k = 0; k < 3; k++) barco(Math.round(40 + k * 60 + (t - P3) * 4), 146 + (k % 2) * 6, 0.35, t, { dir: 1, bruma: 0.35, colBruma: '#a8b8cc' });
  // la multitud de abajo, pequeña: mira hacia arriba y aplaude cuando sube la bandera
  const viva = t > barras - 0.1;
  for (let k = 0; k < 44; k++) { const x = 60 + Math.round(az(k + 300) * 200), y = 168 + Math.round(az(k + 301) * 10); if (Math.abs(x - MX) < 13) continue; gentecita(x, y, t * (viva ? 1.6 : 0.4), k, { vitorea: viva && k % 4 !== 0 }); }
  // el mástil: grueso, oscuro y brillante de grasa, la driza y el remate dorado
  for (let y = 26; y < 180; y++) { const w = y < 60 ? 2 : 3; for (let i = -w; i <= w; i++) R.pset(MX + i, y, i === -w ? H('#2a1a10') : i === w ? H('#1c120a') : i === -w + 1 ? H('#8a6a4a') : H('#4a3222')); if ((y + Math.floor(t * 16)) % 23 === 0) R.pset(MX - 1, y, H('#f8f4e0')); }
  R.disco(MX, 24, 3, H('#c89a30')); R.disco(MX - 1, 23, 1, H('#f8e090')); R.linea(MX + 4, 26, MX + 4, 180, H('#c8bca0'));
  // la bandera británica clavada arriba; el marinero la arranca y se va volando
  const arranca = tramo(t, cambia - 0.05, cambia + 1.2);
  if (arranca === 0) ondea(MX + 4, 30, 34, 20, t, UNION, { d: 1 });
  else if (arranca < 1) { const ax = MX + 6 + arranca * 120, ay = 30 + arranca * arranca * 110, w = Math.round(34 * (1 - arranca * 0.5)); ondea(Math.round(ax), Math.round(ay), w, Math.round(20 * (0.6 + 0.4 * Math.abs(Math.cos(arranca * 9)))), t * 2, UNION, { d: 1 }); }
  // la de las barras y estrellas sube por la driza y se despliega
  const iza = R.easeIO(tramo(t, estrellas - 0.25, barras - 0.05));
  if (iza > 0) ondea(MX + 4, Math.round(lerp(150, 30, iza)), 36, 20, t, BARRAS(36, 20), { d: 1, u: 0.35 + 0.65 * iza });
  // el marinero sube con los tacos (destellos de los clavos) y, arriba, cambia la bandera y saluda
  const sube = R.easeIO(tramo(t, P3 - 0.1, cambia - 0.2)), y = Math.round(lerp(212, 78, sube)), arriba = sube >= 1;
  const mar = R.actor(EL.marinero83, MX - 13, y, t, { dir: 1, brazos: !arriba, sostiene: arriba && t < barras ? [MX + 8, y - 26] : false, dedo: t > barras, sonrisa: arriba });
  if (!arriba && Math.floor(t * 8) % 2) { R.pset(MX - 4, y + 1, H('#f8f8ff')); R.pset(MX + 2, y - 1, H('#f8f8ff')); }
  R.linea(MX - 8, y, MX - 4, y, H('#8a8a96')); R.linea(MX + 1, y, MX + 4, y, H('#8a8a96'));
  if (t > barras) for (let k = 0; k < 6; k++) { const a = k * 1.05 + t * 2, rr = 12 + ((t - barras) * 20) % 14; R.pset(Math.round(MX + 22 + Math.cos(a) * rr), Math.round(40 + Math.sin(a) * rr * 0.6), k % 2 ? H('#f8e060') : H('#ffffff')); }
};

const efectos = [[1.5, 'ola'], [noviembre + 0.2, 'viento'], [P2 + 0.4, 'lapiz'], [clavaron, 'toc'], [engrasado, 'lapiz'], [joven - 0.7, 'whoosh'], [joven + 0.25, 'boing'], [joven + 0.75, 'toc'], [tacos - 0.45, 'toc'], [P3 + 0.4, 'toc'], [cambia, 'papel'], [estrellas, 'whoosh'], [barras, 'publico'], [barras + 0.15, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { cartela: '1783', efectos, año: 1783 });
''')
