E = {}

# Grupo 5 del ep27: ts-viaje, ts-cartucho y ts-reuniones (acto 3, Moscú en 1989).
# Lo común de las tres escenas (cada .html es una página aparte): el reparto, el ruido, los búferes y las texturas de
# los fondos locales (madera, papel pintado, parqué, la vista de Moscú nevada por una ventana, el vaso de té, la tiza).
COMUN = r'''
import { ELENCO_TS as TS } from '/atomo/plato/kits/pixel-chibi.js';
const PZ = T.PIEZAS_TS, K = hex('#0c0a12'), BL = hex('#ffffff'), P = (s) => hex(s);
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const capa = (() => { const m = {}; return (clave, dibuja) => { if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; } R.copiar(m[clave]); }; })();
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const tinte = (x, y, c, a) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mez(R.pget(x, y), c, a)); };
const zona = (x0, y0, x1, y1, c, a) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) tinte(x, y, c, a); };
const caja = (x0, y0, x1, y1, c, b = K) => { R.rect(x0, y0, x1, y1, b); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
const sube = (u) => 1 - (1 - u) * (1 - u);
// madera: tablas con vetas, juntas escalonadas y algún nudo; c = [medio, luz, sombra, junta]; o.hz false: tablas verticales
const madera = (x0, y0, x1, y1, c, o = {}) => { const [M, L, S, D] = c.map(P), alto = o.alto ?? 9, hz = o.hz !== false, k0 = o.k ?? 0;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const a = hz ? y - y0 : x - x0, b = hz ? x : y, tb = Math.floor(a / alto), r = a - tb * alto, off = Math.floor(h(tb, k0, 3) * 200), corte = Math.floor((b + off) / 96);
    if (r === alto - 1 || (b + off) % 96 === 0) { R.pset(x, y, D); continue; }
    const v = Math.sin(b * 0.05 + tb * 2.3 + corte * 1.7 + Math.sin(b * 0.017 + tb + corte) * 2.6 + r * 0.7), n = h(x >> 1, y, tb + k0);
    const nudo = Math.hypot(((b + off) % 96) - 48, r - alto / 2) < 2.2 && h(tb, corte, 8) > 0.6;
    R.pset(x, y, nudo ? D : v > 0.86 ? S : (v < -0.93 || r === 0) ? L : n > 0.95 ? S : n < 0.03 ? L : M);
  } };
// papel pintado: listas finas y rombos con su florecita; c = [fondo, dibujo, luz]
const papel = (x0, y0, x1, y1, c, o = {}) => { const [F, M, L] = c.map(P), pw = o.pw ?? 14, ph = o.ph ?? 16;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const i = ((x - x0) % pw + pw) % pw, j = ((y - y0) % ph + ph) % ph, d = Math.abs(i - pw / 2) + Math.abs(j - ph / 2);
    R.pset(x, y, d === 0 ? L : (d === 3 || i === 0 || (d === 1 && j !== ph / 2)) ? M : h(x, y, 5) > 0.95 ? M : F); } };
// parqué de espiga; c = [medio, luz, sombra, junta]
const parquet = (x0, y0, x1, y1, c) => { const [M, L, S, D] = c.map(P);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const k = Math.floor(x / 6), q = (k % 2 ? x : -x) + y, s = ((q % 12) + 12) % 12, xi = ((x % 6) + 6) % 6, alt = (k + Math.floor(q / 12)) % 2;
    R.pset(x, y, s === 0 || xi === 0 ? D : alt ? (h(x, y >> 1) > 0.86 ? S : M) : (h(x, y >> 1) > 0.86 ? M : L)); } };
// la vista de Moscú nevada por el hueco de una ventana (recortada al hueco): el cielo según la hora (0 mañana gris,
// 0,5 tarde naranja, 1 noche), nubes de tres tonos, los tejados nevados con sus chimeneas que echan humo, una cúpula,
// ventanas que se encienden al caer la tarde y la nieve que cae
const cieloH = (hora) => { const A = [[P('#7c8ea8'), P('#c4ccd8')], [P('#6a5a8c'), P('#f0a468')], [P('#0e1432'), P('#2a3866')]];
  const u = Math.max(0, Math.min(1, hora)) * 2, i = Math.min(1, Math.floor(u)), f = u - i; return [mez(A[i][0], A[i + 1][0], f), mez(A[i][1], A[i + 1][1], f)]; };
const vista = (x0, y0, x1, y1, t, hora = 0.2, o = {}) => {
  const [c0, c1] = cieloH(hora), noche = Math.max(0, (hora - 0.55) / 0.45), hy = y1 - (o.alto ?? Math.round((y1 - y0) * 0.42));
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, hy - y0); for (let x = x0; x <= x1; x++) R.pset(x, y, ((x + y) & 1) && h(x, y, 2) > u * 0.9 - 0.1 ? mez(c0, c1, Math.min(1, u * 0.9)) : mez(c0, c1, Math.min(1, u))); }
  // nubes de nieve de tres tonos a tres velocidades
  const nub = [mez(c1, BL, 0.35), mez(c0, c1, 0.6), mez(c0, K, 0.12)];
  for (let k = 0; k < 4; k++) { const w = 14 + k * 5, vel = 1.2 + k * 0.9, cx = x0 + ((h(k, 4) * 300 + t * vel) % (x1 - x0 + 2 * w)) - w, cy = y0 + 6 + k * 5;
    for (let j = -5; j <= 3; j++) for (let i = -w; i <= w; i++) { const d = (i * i) / (w * w) + (j * j) / 25; if (d > 1 - h(i >> 2, k) * 0.25) continue; R.pset(Math.round(cx + i), cy + j, j > 1 ? nub[2] : j < -2 ? nub[0] : nub[1]); } }
  // la luna de noche
  if (noche > 0.5 && o.luna !== false) { const lx = x0 + Math.round((x1 - x0) * 0.75), ly = y0 + 9; R.disco(lx, ly, 4, P('#f4f0d8')); R.disco(lx + 2, ly - 1, 3, mez(c0, c1, 0.2)); }
  // los tejados: dos filas de casas con su nieve, chimeneas y ventanas
  const fachada = [mez(P('#8a8478'), P('#2a2c3c'), noche), mez(P('#6e6a62'), P('#1e2030'), noche)], nieveT = mez(P('#f2f6fc'), P('#9aa6c8'), noche);
  for (let fila = 0; fila < 2; fila++) { let x = x0 - 6 + Math.floor(h(fila, 9) * 10);
    while (x < x1) { const w = 12 + Math.floor(h(x, fila, 1) * 12), alto = (fila ? 10 : 18) + Math.floor(h(x, fila, 2) * 12), base = y1 + 1, top = base - alto - (fila ? 0 : 8);
      for (let y = top; y <= base; y++) for (let i = 0; i < w; i++) { const X = x + i; if (X < x0 || X > x1) continue;
        let col = fachada[fila]; if (y < top + 2) col = nieveT; else if (i === 0 || i === w - 1) col = mez(fachada[fila], K, 0.25);
        else if ((y - top) % 5 === 3 && i % 4 === 2) { const on = h(X, y, 7 + Math.floor(t * 0.15)) < 0.25 + noche * 0.5; col = on && noche > 0.15 ? mez(P('#ffd27a'), P('#ffb050'), h(X, y)) : mez(P('#3a3e4e'), P('#5a6070'), 1 - noche); }
        R.pset(X, y, col); }
      // la chimenea y su humo
      if (h(x, fila, 6) > 0.5) { const cx = x + Math.floor(w / 2); for (let y = top - 4; y < top; y++) { R.pset(cx, y, fachada[fila]); R.pset(cx + 1, y, mez(fachada[fila], K, 0.3)); }
        for (let k = 0; k < 6; k++) { const u = ((t * 0.25 + k / 6 + h(x, 3)) % 1), px = Math.round(cx + u * 9 + Math.sin(t + k) * 1.5), py = Math.round(top - 6 - u * 16); tinte(px, py, mez(P('#d8dce4'), P('#4a5068'), noche), 0.55 * (1 - u)); tinte(px + 1, py, mez(P('#d8dce4'), P('#4a5068'), noche), 0.35 * (1 - u)); } }
      x += w + (fila ? 0 : 3); } }
  // una cúpula de cebolla lejana con su cruz de estrella
  if (o.cupula !== false) { const cx = x0 + Math.round((x1 - x0) * (o.cupula ?? 0.3)), by = y1 - 22;
    for (let y = -10; y <= 0; y++) { const w = Math.round(Math.sin((y + 11) / 11 * Math.PI * 0.85) * 5); for (let i = -w; i <= w; i++) R.pset(cx + i, by + y, i < -1 ? P('#e8c060') : i > 2 ? P('#a8782a') : P('#d0a040')); }
    for (let y = 1; y <= 22; y++) for (let i = -4; i <= 4; i++) R.pset(cx + i, by + y, i === 4 ? mez(fachada[0], K, 0.3) : fachada[0]);
    R.pset(cx, by - 11, P('#e8c060')); R.pset(cx, by - 12, P('#e8c060')); R.pset(cx, by - 14, P('#e83a2a')); R.pset(cx - 1, by - 13, P('#e83a2a')); R.pset(cx + 1, by - 13, P('#e83a2a')); }
  // la nieve
  for (let k = 0; k < (o.copos ?? 40); k++) { const w = x1 - x0 + 1, hh = y1 - y0 + 1, x = x0 + Math.floor((h(k, 1) * w + Math.sin(t * 0.9 + k) * 3 + t * 4) % w), y = y0 + Math.floor((h(k, 2) * hh + t * (9 + h(k, 3) * 10)) % hh);
    R.pset(x, y, h(k, 5) > 0.5 ? P('#ffffff') : P('#dce4f0')); }
  R.recorte(null);
};
// el vaso de té en su soporte de metal (y = la base), con el vapor que sube
const te = (x, y, t, vapor = true) => {
  R.rect(x - 3, y - 10, x + 3, y - 1, K); R.rect(x - 2, y - 9, x + 2, y - 5, P('#c87a2a')); R.rect(x - 2, y - 10, x + 2, y - 10, P('#e8eef4')); R.pset(x - 2, y - 8, P('#f0b060'));
  R.rect(x - 3, y - 5, x + 3, y, P('#a8a8b4')); R.rect(x - 3, y - 5, x + 3, y - 5, P('#d8d8e0')); for (let i = -2; i <= 2; i += 2) R.pset(x + i, y - 3, P('#6a6a78')); R.rect(x - 3, y, x + 3, y, K);
  for (const [i, j] of [[4, -7], [5, -6], [5, -5], [5, -4], [4, -3]]) R.pset(x + i, y + j, K);
  if (vapor) for (let k = 0; k < 3; k++) { const u = ((t * 0.7 + k / 3) % 1), py = Math.round(y - 12 - u * 12), px = Math.round(x + Math.sin(t * 2.2 + k * 2) * 2 * u); tinte(px, py, BL, 0.55 * (1 - u)); tinte(px + 1, py - 1, BL, 0.35 * (1 - u)); }
};
// cifras de 3 × 5 (para libros de cuentas, notas y relojes)
const DIG = { 0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['##.', '..#', '.#.', '#..', '###'], 3: ['##.', '..#', '.#.', '..#', '##.'], 4: ['#.#', '#.#', '###', '..#', '..#'],
  5: ['###', '#..', '##.', '..#', '##.'], 6: ['.##', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'], 8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '##.'] };
const cifras = (s, x, y, c) => { for (const ch of String(s)) { const g = DIG[ch]; if (g) g.forEach((f, j) => { for (let i = 0; i < 3; i++) if (f[i] === '#') R.pset(x + i, y + j, c); }); x += 4; } };
// un trazo de tiza (o de rotulador) por la polilínea pts, hasta la fracción u; devuelve dónde va la punta
const trazo = (pts, u, c, g = 1, k = 7) => { if (u <= 0) return null; let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); L += l; }
  let rest = L * Math.min(1, u), fin = pts[0];
  for (let i = 1; i < pts.length && rest > 0; i++) { const l = seg[i - 1], f = Math.min(1, rest / l), [ax, ay] = pts[i - 1], bx = ax + (pts[i][0] - ax) * f, by = ay + (pts[i][1] - ay) * f, n = Math.ceil(l * f) + 1;
    for (let s = 0; s <= n; s++) { const x = Math.round(ax + (bx - ax) * s / n), y = Math.round(ay + (by - ay) * s / n); for (let a = 0; a < g; a++) for (let b = 0; b < g; b++) if (h(x + a, y + b, k) > 0.16) R.pset(x + a, y + b, c); }
    rest -= l; fin = [bx, by]; }
  return fin; };
// destellos en cruz (lo que encaja brilla un momento)
const destello = (x, y, u, c = P('#fff4c0')) => { if (u <= 0 || u >= 1) return; const r = Math.round(2 + u * 5), a = 1 - u; for (let i = -r; i <= r; i++) { tinte(x + i, y, c, a * (1 - Math.abs(i) / (r + 1))); tinte(x, y + i, c, a * (1 - Math.abs(i) / (r + 1))); } };
'''

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['ts-viaje'] = ('El viaje', '''// TS-VIAJE (frase 13), febrero de 1989, cartela «1989». Cinco planos:
// 1. (inserto) la maleta abierta sobre la cama de Rogers en Tokio: el neceser y la consola de bolsillo caen y encajan
//    justos en su hueco (la consola, en «Tetris»); el abrigo de invierno cae encima, la tapa se cierra de golpe y
//    rebota abierta (gag 4); las manos de Rogers aprietan el abrigo, que no cabe. Corta en «but» (tras la cartela).
// 2. (inserto) el corcho de la cadena: cinco contratos clavados (Moscú 1984, Budapest 1986, Londres 1987, EE. UU. y
//    Japón 1988); la mano clava el último; el hilo rojo los une y en «anyone» la casilla de bolsillo de cada uno se
//    rodea en rojo con su «?»; en «chain» el hilo se tensa. Corta en «February».
// 3. la Plaza Roja nevada de noche: Rogers, con el abrigo puesto y el gorro de piel, cruza con la maleta; el avión
//    cruza el cielo en «flew»; deja la maleta y saca una foto de turista (flash en «tourist»). Corta en «and».
// 4. la puerta del edificio gris de Elorg: Rogers sube los escalones y llama en «offices»; la puerta se abre, asoma un
//    funcionario y el guardia se vuelve con enfado y lo señala en «appointment». Corta en «Soviet».
// 5. (inserto) la mesa del vestíbulo: la lupa del guardia recorre el pasaporte y se para en la foto en «serious»; la
//    otra mano descuelga el teléfono negro en «trouble».''', COMUN + r'''
const v = (f) => en('viaje', f);
const P2 = v(.194), P3 = v(.4224), P4 = v(.635), P5 = v(.8475);
const CONSOLA = v(.072), ABRIGO = v(.0834), CIERRA = v(.1112), REBOTA = v(.129);
const NADIE = v(.307), CADENA = v(.348), AVION = v(.526), FOTO = v(.596), LLAMA = v(.721), CITA = v(.777), SERIO = v(.9415), LIO = v(.9676);
const MANGA_R = '#c8403a';   // Rogers en casa, con su camisa hawaiana

// ── 1 · la maleta sobre la cama
const camaFondo = () => {
  // la colcha de felpilla granate, acolchada en rombos con su botón, y sus arrugas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const a = ((x + y) % 24 + 24) % 24, b = ((x - y) % 24 + 24) % 24, n = h(x >> 1, y >> 1, 2), arruga = Math.sin(x * 0.045 + Math.sin(y * 0.05) * 2) * Math.sin(y * 0.03 + 1);
    let c = n > 0.6 ? P('#8e2c30') : P('#842628');
    if (a === 0 || b === 0) c = P('#5e1a1e'); else if (a === 1 || b === 1) c = P('#a03c42');
    if (a === 12 && b === 12) c = P('#e8c070'); else if ((a === 11 || a === 13) && (b === 11 || b === 13)) c = P('#6a1e22');
    if (arruga > 0.82) c = mez(c, P('#c05058'), 0.35); else if (arruga < -0.85) c = mez(c, K, 0.25);
    R.pset(x, y, c);
  }
  // la almohada a rayas
  for (let y = 18; y <= 62; y++) for (let x = 2; x <= 60; x++) { const e = ((x - 31) / 30) ** 4 + ((y - 40) / 23) ** 4; if (e > 1) continue; R.pset(x, y, e > 0.82 ? P('#b8bcc8') : (x % 7 === 0) ? P('#a8c0e0') : h(x, y, 3) > 0.9 ? P('#dce2ec') : P('#eef0f6')); }
  zona(4, 63, 60, 66, K, 0.3);
  // el gorro de piel (se lo pondrá en Moscú), el pasaporte y la cámara de fotos
  for (let y = 72; y <= 96; y++) for (let x = 6; x <= 58; x++) { const d = ((x - 32) / 26) ** 2 + ((y - 84) / 12) ** 2; if (d > 1) continue; R.pset(x, y, d > 0.8 ? P('#5a3c24') : h(x, y, 4) > 0.55 ? P('#8a6440') : h(x, y, 5) > 0.4 ? P('#a07a50') : P('#74522e')); }
  caja(24, 102, 46, 132, P('#1e2a52')); R.rect(25, 103, 27, 131, P('#2a3a6a')); R.rect(31, 112, 39, 120, P('#c8a040')); R.pset(35, 116, P('#f0d070')); R.rect(30, 124, 40, 125, P('#c8a040'));
  caja(12, 142, 52, 162, P('#2a2a30')); R.rect(13, 143, 51, 146, P('#4a4a54')); R.disco(32, 153, 7, K); R.disco(32, 153, 6, P('#3a3a44')); R.disco(32, 153, 4, P('#1a2a4a')); R.pset(30, 151, P('#8ab0e0')); R.rect(44, 144, 48, 147, P('#d8d8e0'));
  R.linea(12, 150, 6, 170, P('#3a2a20')); R.linea(52, 150, 60, 170, P('#3a2a20'));
  zona(13, 163, 53, 165, K, 0.3);
  // la mesilla de noche con la lámpara, el despertador, la guía con la cúpula y el billete de avión
  madera(262, 50, 319, 179, ['#7a4a2a', '#9a6438', '#5a321c', '#3a2010'], { alto: 11, k: 4 });
  R.rect(262, 50, 262, 179, K); zona(254, 50, 261, 179, K, 0.35);
  for (let y = 54; y <= 102; y++) for (let x = 266; x <= 318; x++) { const d = Math.hypot(x - 292, y - 78); if (d < 26) tinte(x, y, P('#ffe2a0'), 0.35 * (1 - d / 26)); }
  R.disco(292, 78, 14, K); R.disco(292, 78, 13, P('#f2e2b8')); R.disco(292, 78, 9, P('#e4cc98')); R.disco(292, 78, 4, P('#fff6d8'));
  for (let a = 0; a < 6.28; a += 0.4) R.pset(Math.round(292 + Math.cos(a) * 11), Math.round(78 + Math.sin(a) * 11), P('#d0b880'));
  caja(270, 136, 300, 170, P('#2a4a3a')); R.rect(271, 137, 273, 169, P('#1e3a2c'));
  for (let y = -7; y <= 0; y++) { const w = Math.round(Math.sin((y + 8) / 8 * Math.PI * 0.85) * 4); for (let i = -w; i <= w; i++) R.pset(286 + i, 154 + y, P('#e8b040')); }
  R.rect(284, 155, 288, 162, P('#e8b040')); R.pset(286, 145, P('#e83a2a'));
  caja(302, 140, 319, 176, P('#f2eee2')); R.rect(303, 141, 318, 147, P('#c8302a')); cifras('89', 306, 152, P('#3a3a44')); for (let x = 304; x < 318; x += 2) R.pset(x, 166, P('#3a3a44'));
};
const reloj = (x, y, t) => { R.disco(x, y - 9, 3, P('#c8a040')); R.disco(x + 7, y - 9, 3, P('#c8a040')); R.disco(x + 3, y, 9, K); R.disco(x + 3, y, 8, P('#c83a3a')); R.disco(x + 3, y, 6, P('#f6f2e4'));
  for (let k = 0; k < 12; k += 3) R.pset(Math.round(x + 3 + Math.cos(k / 12 * 6.283) * 5), Math.round(y + Math.sin(k / 12 * 6.283) * 5), K);
  const a = t * 1.047 - 1.57; R.linea(x + 3, y, Math.round(x + 3 + Math.cos(a) * 5), Math.round(y + Math.sin(a) * 5), P('#c83a3a')); R.linea(x + 3, y, x + 3, y - 4, K); R.linea(x + 3, y, x + 6, y, K); };
// el abrigo de invierno pardo con el cuello de piel; sy < 1 lo aplasta, > 1 lo hincha
const abrigo = (cx, cy, sx, sy, t) => {
  const W = 66 * sx, H = 30 * sy;
  for (let y = Math.round(-H); y <= Math.round(H); y++) for (let x = Math.round(-W); x <= Math.round(W); x++) {
    const X = x / W, Y = y / H, e = Math.abs(X) ** 3 + Math.abs(Y) ** 3; if (e > 1) continue;
    let c = e > 0.82 ? P('#3e2e22') : X + Y < -0.6 ? P('#8a7058') : X + Y > 0.7 ? P('#4e3c2e') : P('#6a5442');
    if (Math.abs(Math.sin(x * 0.22 + y * 0.1)) < 0.05 && e < 0.7) c = P('#4e3c2e');
    if (Y < -0.45 && Math.abs(X) < 0.55) c = h(cx + x, cy + y, 4) > 0.5 ? P('#e0d0b0') : P('#c4b08c');   // el cuello de piel
    R.pset(Math.round(cx + x), Math.round(cy + y), c);
  }
  for (const j of [-0.15, 0.2, 0.55]) { R.disco(Math.round(cx - 6 * sx), Math.round(cy + j * H), 2, K); R.pset(Math.round(cx - 6 * sx), Math.round(cy + j * H) - 1, P('#8a7a6a')); }
  R.linea(Math.round(cx - 2 * sx), Math.round(cy - 0.4 * H), Math.round(cx - 2 * sx), Math.round(cy + H * 0.9), P('#3e2e22'));
};
const p1 = (t) => {
  capa('cama', camaFondo);
  reloj(276, 112, t);
  // la maleta de cuero: el cuerpo con su forro de raso y las cosas que ya encajan
  caja(64, 86, 256, 174, P('#7a4a2a'), P('#2a160a')); R.rect(66, 88, 254, 89, P('#9a6438')); R.rect(66, 171, 254, 172, P('#5a321c'));
  for (let x = 70; x <= 250; x += 4) { R.pset(x, 90, P('#c89a6a')); R.pset(x, 170, P('#c89a6a')); }
  for (const [x, y] of [[64, 86], [248, 86], [64, 168], [248, 168]]) { R.rect(x, y, x + 8, y + 6, P('#c8a040')); R.rect(x + 1, y + 1, x + 7, y + 1, P('#f0d070')); }
  for (let y = 92; y <= 166; y++) for (let x = 70; x <= 250; x++) R.pset(x, y, (x + (y >> 2)) % 9 === 0 ? P('#b49060') : h(x, y, 2) > 0.9 ? P('#d8bc8c') : P('#c8a878'));
  zona(70, 92, 250, 95, K, 0.3);
  // camisas: la de rayas y la hawaiana
  caja(74, 96, 128, 131, P('#a8c0e0')); for (let x = 76; x < 128; x += 4) R.linea(x, 97, x, 130, P('#7a98c8')); R.poligono([[94, 97], [101, 104], [108, 97]], P('#eef0f6')); for (let y = 107; y < 130; y += 6) R.pset(101, y, P('#eef0f6'));
  caja(74, 134, 128, 163, P('#c8403a')); for (let k = 0; k < 14; k++) { const x = 77 + Math.floor(h(k, 1) * 48), y = 137 + Math.floor(h(k, 2) * 24); R.pset(x, y, P('#f6e6a0')); R.pset(x + 1, y, P('#f0a030')); R.pset(x, y + 1, P('#f0a030')); }
  R.poligono([[94, 135], [101, 141], [108, 135]], P('#963028'));
  // el pantalón doblado y los calcetines en rollo
  caja(132, 96, 177, 118, P('#c8b080')); R.linea(133, 107, 176, 107, P('#a89060')); R.rect(133, 97, 176, 98, P('#d8c498'));
  for (const [x, c] of [[140, '#2a3a6a'], [154, '#7a7a86'], [168, '#a83a3a']]) { R.disco(x, 129, 7, K); R.disco(x, 129, 6, P(c)); R.disco(x, 129, 3, mez(P(c), K, 0.35)); R.pset(x - 2, 126, mez(P(c), BL, 0.4)); }
  // tres cartuchos de pie
  for (const x of [142, 156, 170]) PZ.cartucho(R, x, 163, { color: x === 156 ? '#e8b040' : '#3a8a9a' });
  // el neceser cae y encaja
  const un = tramo(t, 1.35, 1.8), ny = Math.round(lerp(-40, 109, un * un));
  if (un > 0) { caja(181, ny - 13, 245, ny + 13, P('#2a6a4a')); for (let x = 183; x < 245; x += 6) R.linea(x, ny - 12, x, ny + 12, P('#3a8a5a')); for (let y = ny - 10; y < ny + 13; y += 6) R.linea(182, y, 244, y, P('#1e4e36')); R.rect(184, ny - 12, 242, ny - 11, P('#c8c8d0')); R.rect(210, ny - 14, 216, ny - 12, P('#c8a040')); }
  destello(213, 96, tramo(t, 1.8, 2.2));
  // la consola de bolsillo cae despacio y encaja justa en su hueco (en «Tetris»)
  const uc = tramo(t, CONSOLA - 0.9, CONSOLA), cy = Math.round(lerp(-30, 160, uc * uc)), lista = t >= CONSOLA;
  R.rect(184, 130, 242, 162, P('#a88c5c')); zona(184, 130, 242, 132, K, 0.3);
  if (uc > 0) PZ.consolaBolsillo(R, 213, cy, { s: 2, encendida: lista && Math.floor(t * 4) % 2 === 0 });
  if (lista) { const f = tramo(t, CONSOLA, CONSOLA + 0.6); destello(186, 132, f); destello(240, 132, tramo(t, CONSOLA + 0.1, CONSOLA + 0.7)); destello(213, 160, tramo(t, CONSOLA + 0.2, CONSOLA + 0.8)); }
  // el abrigo cae, la tapa se cierra de golpe y rebota abierta (gag 4)
  const ua = tramo(t, ABRIGO, ABRIGO + 0.35), cierra = tramo(t, CIERRA, REBOTA), reb = tramo(t, REBOTA, REBOTA + 0.3);
  let c = 0; if (t >= CIERRA) c = cierra * cierra; if (t >= REBOTA) c = 1 - 0.7 * sube(reb) - 0.06 * Math.sin((t - REBOTA) * 18) * Math.exp(-(t - REBOTA) * 4);
  const aprieta = tramo(t, REBOTA + 0.35, REBOTA + 0.55) - tramo(t, REBOTA + 0.75, REBOTA + 0.95);
  if (ua > 0) { const ay = Math.round(lerp(-50, 126, ua * ua)), sy = t >= REBOTA ? 1.12 + 0.05 * Math.sin(t * 9) - 0.12 * aprieta : t >= CIERRA ? 1 - 0.3 * cierra : 1;
    abrigo(160, ay - (t >= REBOTA ? 6 : 0), 1.02, sy, t);
    if (t >= REBOTA) { for (let y = 160; y <= 179; y++) for (let x = 196; x <= 208; x++) R.pset(x, y + Math.round(Math.sin(t * 6) * (y - 160) * 0.05), x === 196 || x === 208 ? K : (y > 174 ? P('#c4b08c') : P('#6a5442'))); } }
  // la tapa: por dentro (forro con el bolsillo) mientras está alzada; por fuera (cuero con las correas) cuando tapa
  const yf = Math.round(lerp(22, 172, c));
  if (yf < 86) { caja(64, yf, 256, 87, P('#7a4a2a'), P('#2a160a'));
    if (86 - yf > 6) { R.rect(70, yf + 4, 250, 84, P('#c8a878')); for (let x = 72; x < 250; x += 9) R.linea(x, yf + 4, x, 84, P('#b49060'));
      const yb = Math.round(lerp(yf + 4, 84, 0.45)); R.rect(74, yb, 246, 83, P('#a88458')); R.linea(74, yb, 246, yb, P('#e8d8b0')); for (let x = 80; x < 246; x += 3) R.pset(x, yb + 1, P('#7a5a34'));
      for (let x = 70; x <= 250; x++) for (let y = yf + 4; y < yb; y++) if (((x - y * 2) % 37 + 37) % 37 < 3) R.pset(x, y, P('#dcc49a'));
      if (yb - yf > 20) { R.linea(76, yf + 6, 150, yb - 2, P('#7a5a34')); R.linea(244, yf + 6, 170, yb - 2, P('#7a5a34')); R.disco(160, Math.round((yf + yb) / 2), 3, P('#c8a040')); caja(222, yf + 8, 236, yf + 18, P('#f2eee2')); R.linea(229, yf + 4, 229, yf + 8, P('#3a2a1a')); cifras('89', 225, yf + 11, P('#c8302a')); }
      if (84 - yb > 10) { caja(150, yb + 3, 190, Math.min(83, yb + 16), P('#e8dcc0')); R.linea(162, yb + 4, 162, Math.min(82, yb + 15), P('#c8b890')); R.linea(176, yb + 4, 176, Math.min(82, yb + 15), P('#c8b890')); } } }
  else if (yf > 88) { caja(64, 86, 256, yf, P('#8a5430'), P('#2a160a')); R.rect(66, 88, 254, 90, P('#a86e40'));
    for (let y = 90; y < yf - 1; y++) for (let x = 66; x <= 254; x++) if (h(x >> 1, y >> 1, 9) > 0.92) R.pset(x, y, P('#74482a'));
    for (const x of [104, 214]) { R.rect(x, 86, x + 10, yf, P('#4a2a18')); R.rect(x + 1, 86, x + 9, yf, P('#6a3e22')); if (yf > 140) { R.rect(x - 1, yf - 18, x + 11, yf - 12, P('#c8a040')); R.rect(x + 3, yf - 17, x + 7, yf - 13, P('#4a2a18')); } }
    if (yf > 120) { R.rect(146, yf - 4, 174, yf - 1, K); R.rect(148, yf - 9, 172, yf - 5, P('#4a2a18')); R.rect(150, yf - 8, 170, yf - 6, P('#2a160a')); } }
  // las manos de Rogers aprietan el abrigo hinchado, que no cabe
  if (aprieta > 0) { const y = Math.round(lerp(196, 168, aprieta)); T.brazo(R, 112, 214, 126, y, MANGA_R, 1, {}); T.brazo(R, 214, 214, 196, y, MANGA_R, -1, {}); }
};

// ── 2 · el corcho de la cadena de contratos
const CARTAS = [[44, '1984', [1, 0, 0]], [104, '1986', [1, 0, 0]], [164, '1987', [1, 0, 0]], [224, '1988', [1, 1, 0]], [284, '1988', [1, 1, 0]]];
const corchoFondo = () => {
  for (let y = 0; y < 46; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x >> 1, y >> 1, 4) > 0.82 ? P('#d6c6a2') : h(x, y, 6) > 0.97 ? P('#b8a884') : P('#e2d4b2'));
  // el cuadro del monte Fuji y el enchufe
  caja(196, 12, 240, 40, P('#f2eee2'), P('#3a2a1a')); R.rect(199, 15, 237, 37, P('#8ab0d8'));
  R.poligono([[200, 37], [218, 20], [236, 37]], P('#5a6a8a')); R.poligono([[213, 25], [218, 20], [223, 25], [220, 26], [218, 24], [216, 26]], P('#f4f8ff')); R.disco(230, 21, 2, P('#e83a2a'));
  zona(197, 41, 241, 42, K, 0.25);
  caja(132, 16, 174, 44, P('#f6f2e6'), P('#5a4a3a')); R.rect(133, 17, 173, 22, P('#c8302a')); cifras('1989', 145, 18, P('#f6f2e6'));
  for (let k = 0; k < 28; k++) { const i = k % 7, j = Math.floor(k / 7); R.rect(135 + i * 5, 25 + j * 5, 137 + i * 5, 27 + j * 5, k === 20 ? P('#c8302a') : i > 4 ? P('#e8a0a0') : P('#a8a8b4')); }
  R.rect(66, 22, 70, 30, P('#c8a040')); R.poligono([[60, 30], [76, 30], [72, 22], [64, 22]], P('#f2e2b8')); for (let y = 31; y < 46; y++) for (let x = 50; x < 88; x++) { const d = Math.hypot(x - 68, (y - 30) * 1.5); if (d < 20) tinte(x, y, P('#fff0c0'), 0.3 * (1 - d / 20)); }
  caja(110, 30, 120, 40, P('#efe8d8')); R.pset(113, 34, K); R.pset(117, 34, K); R.pset(113, 36, K); R.pset(117, 36, K);
  madera(4, 46, 315, 153, ['#8a5a32', '#a8743e', '#6a4224', '#3e2614'], { alto: 6, k: 2 });
  for (let y = 52; y <= 147; y++) for (let x = 10; x <= 309; x++) { const n = h(x, y, 1), g = h(x >> 3, y >> 3, 2);
    R.pset(x, y, n > 0.9 ? P('#7a5430') : n > 0.68 ? P('#9a6e40') : n < 0.1 ? P('#d0a670') : g > 0.75 ? P('#c09464') : P('#b88a58')); }
  zona(10, 52, 309, 54, K, 0.3); zona(10, 52, 12, 147, K, 0.25);
  // agujeros de chinchetas viejas y papelitos clavados
  for (let k = 0; k < 30; k++) R.pset(14 + Math.floor(h(k, 3) * 290), 56 + Math.floor(h(k, 4) * 88), P('#4a2e18'));
  caja(14, 56, 30, 70, P('#f0e070')); cifras('16', 17, 58, P('#3a3a8a')); for (let x = 17; x < 28; x += 2) R.pset(x, 66, P('#3a3a8a'));
  caja(292, 130, 306, 146, P('#a8d8f0')); R.linea(294, 140, 304, 134, P('#2a4a8a')); R.linea(294, 134, 304, 140, P('#2a4a8a'));
  // la mesa de debajo: la taza de café, el teléfono gris, la consola tapada con su paño y un bolígrafo
  madera(0, 154, 319, 179, ['#5a3a22', '#74502e', '#422a18', '#2a1a0e'], { alto: 13, k: 5 }); R.rect(0, 154, 319, 155, P('#86603a'));
  PZ.consolaBolsillo(R, 70, 176, { pano: true }); caja(118, 160, 150, 176, P('#c8c8c4')); R.rect(122, 158, 146, 162, P('#a8a8a4')); R.disco(134, 168, 5, P('#7a7a76')); R.disco(134, 168, 2, P('#c8c8c4'));
  R.linea(170, 170, 196, 164, P('#2a3a8a')); R.linea(170, 171, 196, 165, P('#1a2a6a'));
  caja(250, 158, 266, 176, P('#e8e4dc')); R.rect(251, 159, 265, 161, P('#5a3418')); R.rect(266, 163, 270, 170, K); R.rect(267, 164, 269, 169, P('#e8e4dc'));
};
const p2 = (t) => {
  capa('corcho', corchoFondo);
  // la sombra del ventilador del techo que barre el corcho
  const ang = t * 3.2;
  for (let y = 46; y <= 153; y += 1) for (let x = 4; x <= 315; x += 1) { const a = Math.atan2(y + 70, x - 160) - ang, s = Math.cos(a * 3); if (s > 0.93) tinte(x, y, K, 0.12); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.7 + k / 3) % 1; tinte(Math.round(258 + Math.sin(t * 2 + k) * 2), Math.round(156 - u * 14), BL, 0.5 * (1 - u)); }
  // los cinco contratos clavados; el último lo trae la mano y lo clava
  const llega = tramo(t, P2 + 0.05, P2 + 0.55), clava = tramo(t, P2 + 0.55, P2 + 0.8);
  CARTAS.forEach(([x, año, cas], i) => {
    const ult = i === 4, cx = ult ? Math.round(lerp(352, x, sube(llega))) : x; if (ult && llega <= 0) return;
    zona(cx - 20, 75, cx + 24, 131, K, 0.25); PZ.contrato(R, cx, 128, { s: 2, casillas: cas, firma: true });
    caja(cx - 13, 131, cx + 13, 141, i % 2 ? P('#f8e888') : P('#f8c8a0')); cifras(año, cx - 8, 134, P('#2a2a5a'));
    if (!ult || clava >= 1) T.chincheta(R, cx, 78, t, P('#d8302a'), { baja: ult ? clava : 1 });
  });
  if (llega > 0 && clava < 1) { const x = Math.round(lerp(352, 284, sube(llega))) + 20; T.brazo(R, x + 40, 128, x + 2, 104, '#c8403a', -1, {}); }
  // el hilo rojo que une la cadena (y se tensa en «chain»)
  const hilo = tramo(t, P2 + 0.9, NADIE - 0.2), tira = Math.exp(-Math.max(0, t - CADENA) * 5) * (t > CADENA ? 1 : 0);
  for (let i = 0; i < 4; i++) { const u = Math.max(0, Math.min(1, hilo * 4 - i)); if (u <= 0) continue; const [a] = CARTAS[i], [b] = CARTAS[i + 1], comba = 7 - 6 * tira * Math.abs(Math.cos((t - CADENA) * 30));
    const pts = []; for (let s = 0; s <= 12; s++) { const f = s / 12; pts.push([a + (b - a) * f, 78 + Math.sin(f * Math.PI) * comba]); }
    const fin = trazo(pts, u, P('#e0302a'), 1, 99); trazo(pts.map(([x, y]) => [x, y + 1]), u, P('#8a1a1a'), 1, 98); if (u < 1 && fin) R.disco(Math.round(fin[0]), Math.round(fin[1]), 2, P('#e0302a')); }
  // la casilla de bolsillo de cada contrato, vacía: se rodea en rojo y sale su «?» (en «anyone»)
  CARTAS.forEach(([x], i) => { const q = tramo(t, NADIE - 0.45 + i * 0.1, NADIE - 0.3 + i * 0.1); if (q <= 0) return;
    const bx = x - 22 + 7, by = 72 + 41, r = Math.round(4 + 4 * q); for (let a = 0; a < 6.283 * q; a += 0.12) { R.pset(Math.round(bx + Math.cos(a) * (r + 1.5)), Math.round(by + Math.sin(a) * r), P('#e0302a')); R.pset(Math.round(bx + Math.cos(a) * (r + 2.5)), Math.round(by + Math.sin(a) * (r + 1)), P('#e0302a')); }
    if (q >= 1) { const sal = Math.round(Math.max(0, 1 - (t - NADIE + 0.3 - i * 0.1) * 4) * -4); R.icono('?', bx + 10, by - 9 + sal, P('#e0302a'), K, 2); } });
};

// ── 3 · la Plaza Roja: Rogers llega con el abrigo puesto
const esCielo = (x, y) => { const c = R.pget(x, y), r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255; return b > r + 14 && r + g + b < 330; };
const avion = (t) => { const u = tramo(t, AVION - 1.7, AVION + 1.7); if (u <= 0 || u >= 1) return; const x = Math.round(lerp(-30, 236, u)), y = Math.round(lerp(64, 30, u));
  const px = (i, j, c) => { const X = x + 15 - i, Y = y + j; if (X >= 0 && X < 320 && Y >= 0 && Y < 180 && esCielo(X, Y)) R.pset(X, Y, c); };
  for (let i = 4; i < 70; i++) { const X = x - i, Y = y + Math.round(i * 34 / 266); if (X < 320 && X >= 0 && esCielo(X, Y)) tinte(X, Y, P('#c8d0e0'), 0.42 * (1 - i / 70)); }
  for (let i = 0; i <= 15; i++) { px(i, 0, P('#e8ecf2')); px(i, 1, i < 2 ? P('#c8ccd8') : P('#9aa2b4')); if (i % 2 === 0 && i > 2 && i < 12) px(i, 0, P('#3a4a6a')); }
  px(0, 1, P('#e8ecf2')); for (let j = -3; j < 0; j++) { px(13, j, P('#c8ccd8')); px(14, j, P('#9aa2b4')); } px(14, -3, P('#c83a3a'));
  for (const [i, j] of [[5, 2], [6, 2], [7, 3], [8, 3], [9, 4]]) px(i, j, P('#7a8296'));
  if (Math.floor(t * 3) % 2) px(7, -1, P('#ff4a3a')); if (Math.floor(t * 5) % 3 === 0) px(9, 4, BL); };
const p3 = (t) => {
  T.moscu(R, t, { encuadre: 'plaza' });
  avion(t);
  const u = tramo(t, P3 + 0.1, FOTO - 0.9), x = Math.round(lerp(-18, 132, u)), foto = t > FOTO - 0.55;
  if (foto) { zona(x - 22, 156, x - 4, 158, K, 0.3); PZ.maleta(R, x - 12, 157); }
  const a = R.actor(TS.rogersAbrigo, x, 156, t, { dir: 1, anda: u > 0 && u < 1, sostiene: foto ? [x + 15, 135] : [x + 14, 146], sonrisa: t > FOTO + 0.3, sorpresa: t > AVION - 0.2 && t < AVION + 0.6 });
  if (!foto) PZ.maleta(R, a.mano[0] + 1, a.mano[1] + 15);
  else { const [mx, my] = a.mano; caja(mx - 3, my - 4, mx + 4, my + 1, P('#2a2a30')); R.pset(mx + 4, my - 2, P('#8ab0e0')); R.rect(mx - 2, my - 5, mx, my - 5, P('#d8d8e0'));
    const f = tramo(t, FOTO, FOTO + 0.35); if (f > 0 && f < 1) { R.disco(mx + 4, my - 2, Math.round(3 + f * 6), P('#ffffff')); zona(0, 0, 319, 179, BL, 0.3 * (1 - f)); } }
  T.moscuDelante(R, t, { encuadre: 'plaza' });
};

// ── 4 · la puerta de Elorg
const p4 = (t) => {
  const abre = tramo(t, LLAMA + 0.35, LLAMA + 0.9);
  T.moscu(R, t, { encuadre: 'plaza', camara: 'puerta', puerta: abre });
  // el funcionario que asoma por la hoja abierta
  if (abre > 0.6) { R.recorte([150, 92, 194, 146]); R.actor(TS.burocrata, 176, 146, t, { dir: -1, sorpresa: t > CITA - 0.4 }); R.recorte(null); }
  const u = tramo(t, P4 + 0.05, P4 + 1.0), w = tramo(t, P4 + 1.0, P4 + 1.45);
  const x = Math.round(lerp(lerp(52, 118, u), 134, w)), s = Math.round(lerp(164, 146, w)), deja = t > LLAMA - 0.5;
  if (deja) PZ.maleta(R, 126, 152);
  const llama = t > LLAMA - 0.35 && t < LLAMA + 0.2 && Math.floor(t * 9) % 2 === 0;
  const a = R.actor(TS.rogersAbrigo, x, s, t, { dir: 1, anda: (u > 0 && u < 1) || (w > 0 && w < 1), dedo: llama, sostiene: deja ? false : [x + 14, s - 10], sorpresa: t > CITA + 0.15, habla: t > LLAMA + 0.9 && t < CITA && Math.sin(t * 8) > 0 });
  if (!deja) PZ.maleta(R, a.mano[0] + 1, a.mano[1] + 15);
  // el guardia: mira la calle, se vuelve al oír la puerta y señala a Rogers con enfado
  const vuelve = t > LLAMA + 0.2, gx = Math.round(lerp(208, 196, tramo(t, CITA, CITA + 0.5)));
  R.actor(TS.guardia, gx, 164, t, { dir: vuelve ? -1 : 1, sorpresa: vuelve && t < CITA, enfado: t >= CITA, dedo: t > CITA + 0.1, anda: t > CITA && t < CITA + 0.5 });
  if (t > CITA && t < CITA + 1.6) R.icono('!', gx + 5, 124 - Math.round(Math.max(0, 1 - (t - CITA) * 5) * 4), P('#e83a2a'), K, 2);
  T.moscuDelante(R, t, { encuadre: 'plaza', camara: 'puerta' });
};

// ── 5 · la mesa del vestíbulo: la lupa sobre el pasaporte
const vestFondo = () => {
  for (let y = 0; y < 66; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 2, y, 3); R.pset(x, y, n > 0.8 ? P('#566854') : h(x, y, 4) > 0.96 ? P('#3e4c3c') : P('#4e5e4c')); }
  R.rect(0, 15, 319, 17, P('#5a3a22')); R.rect(0, 15, 319, 15, P('#7a5432'));
  // el tablero de llaves con sus ganchos y sus números
  madera(30, 22, 100, 58, ['#7a4a2a', '#9a6438', '#5a321c', '#3a2010'], { alto: 7, k: 6 }); R.rect(30, 22, 100, 22, K); R.rect(30, 58, 100, 58, K);
  for (let k = 0; k < 6; k++) { const x = 37 + k * 11; R.pset(x, 27, P('#c8c8d0')); R.pset(x, 28, P('#9a9aa4')); if (k !== 3) { R.rect(x - 1, 29, x + 1, 36, P('#c8a040')); R.disco(x, 38, 2, P('#c8a040')); } cifras(String(k + 1), x - 1, 46, P('#f2e8c8')); }
  // el reloj de pared y la ventanita con reja (la noche nevada)
  R.disco(196, 33, 12, K); R.disco(196, 33, 11, P('#d8c8a0')); R.disco(196, 33, 9, P('#f6f0e0')); for (let k = 0; k < 12; k++) R.pset(Math.round(196 + Math.cos(k * 0.5236) * 7), Math.round(33 + Math.sin(k * 0.5236) * 7), K);
  caja(230, 20, 268, 60, P('#1a2240'), P('#e8e4dc')); for (let x = 238; x < 268; x += 8) R.rect(x, 21, x, 59, P('#3a3a44')); R.rect(231, 40, 267, 40, P('#3a3a44')); R.rect(229, 60, 269, 62, P('#f2f0ec'));
  // la mesa de madera barnizada, con el cartapacio verde
  madera(0, 64, 319, 179, ['#5a321c', '#74442a', '#422414', '#2a160a'], { alto: 16, k: 8 }); R.rect(0, 64, 319, 65, P('#8a5a34')); zona(0, 66, 319, 69, K, 0.35);
  caja(94, 86, 300, 174, P('#2e5a42'), P('#1a3426')); for (let y = 88; y < 173; y++) for (let x = 96; x < 299; x++) if (h(x, y, 2) > 0.9) R.pset(x, y, P('#386a4e'));
  for (const [x, y, sx, sy] of [[94, 86, 1, 1], [300, 86, -1, 1], [94, 174, 1, -1], [300, 174, -1, -1]]) for (let i = 0; i < 12; i++) for (let j = 0; j < 12 - i; j++) R.pset(x + i * sx, y + j * sy, (i + j) % 5 === 0 ? P('#3a2010') : P('#5a3018'));
  // la luz del flexo desde arriba a la izquierda
  for (let y = 70; y < 180; y++) for (let x = 60; x < 260; x++) { const d = Math.hypot(x - 150, (y - 120) * 1.6); if (d < 100) tinte(x, y, P('#fff0c0'), 0.16 * (1 - d / 100)); }
  // el libro de registro abierto con sus renglones y cifras
  caja(84, 96, 150, 152, P('#efe6cc'), P('#5a4a32')); R.rect(117, 97, 117, 151, P('#c8b890')); zona(118, 97, 122, 151, K, 0.12);
  for (let y = 102; y < 150; y += 6) { R.linea(87, y, 115, y, P('#9ab0d0')); R.linea(120, y, 148, y, P('#9ab0d0')); }
  for (let k = 0; k < 7; k++) { cifras(String(1000 + Math.floor(h(k, 9) * 8999)), 88, 97 + k * 6 + 1, P('#3a3a6a')); cifras(String(10 + Math.floor(h(k, 8) * 89)), 121, 97 + k * 6 + 1, P('#3a3a6a')); }
  R.linea(130, 160, 156, 154, P('#c8302a')); R.linea(130, 161, 156, 155, P('#7a1a1a'));
  // la gorra de plato del guardia: la copa verde, la franja roja y la estrella
  R.disco(278, 92, 22, K); R.disco(278, 92, 21, P('#5a6448')); R.disco(278, 92, 15, P('#6a7458')); for (let a = 0; a < 6.28; a += 0.05) { R.pset(Math.round(278 + Math.cos(a) * 18), Math.round(92 + Math.sin(a) * 18), P('#b02a34')); R.pset(Math.round(278 + Math.cos(a) * 19), Math.round(92 + Math.sin(a) * 19), P('#b02a34')); }
  R.disco(278, 78, 3, P('#f0c040')); R.pset(278, 74, P('#f0c040')); R.disco(272, 86, 4, P('#7a8468'));
  // el teléfono negro de disco
  R.poligono([[12, 168], [20, 136], [56, 136], [64, 168]], K); R.poligono([[14, 166], [21, 138], [55, 138], [62, 166]], P('#2a2a32')); R.rect(16, 160, 60, 166, P('#1a1a20'));
  R.disco(38, 154, 9, P('#1a1a20')); R.disco(38, 154, 8, P('#e8e4d8')); for (let k = 0; k < 10; k++) R.disco(Math.round(38 + Math.cos(k * 0.55 - 1) * 6), Math.round(154 + Math.sin(k * 0.55 - 1) * 6), 1, P('#2a2a32')); R.disco(38, 154, 3, P('#c8302a'));
  for (let y = 168; y < 180; y++) R.pset(64 + Math.round(Math.sin(y * 1.3) * 2) + (y - 168), y, P('#1a1a20'));
  // el vaso de té (sin vapor: lo pinta el plano) y el cenicero
  R.disco(70, 82, 8, P('#8a8a94')); R.disco(70, 82, 6, P('#5a5a64')); R.rect(70, 80, 80, 81, P('#e8e4d8')); R.pset(80, 80, P('#e86a3a'));
};
const pasaporte = () => {
  // el pasaporte abierto: tapas azul marino, la página de la foto y la del visado con su sello rojo
  caja(148, 108, 246, 160, P('#1e2a52'), K); caja(151, 110, 197, 158, P('#e4ecd8'), P('#9aa890')); caja(199, 110, 243, 158, P('#e4ecd8'), P('#9aa890'));
  for (let y = 112; y < 157; y++) for (let x = 152; x < 243; x++) if (x !== 198 && Math.abs(Math.sin(x * 0.4 + Math.sin(y * 0.3) * 2)) < 0.12) R.pset(x, y, P('#c8d8bc'));
  // la foto de Rogers: el pelo oscuro y el bigote
  caja(156, 116, 176, 140, P('#c8ccd0'), P('#6a6a70')); R.rect(160, 120, 172, 123, P('#2a1e1a')); R.rect(161, 124, 171, 134, P('#e8b088')); R.rect(160, 124, 160, 128, P('#2a1e1a')); R.rect(172, 124, 172, 128, P('#2a1e1a'));
  R.pset(164, 127, K); R.pset(168, 127, K); R.rect(163, 130, 169, 131, P('#2a1e1a')); R.rect(158, 135, 174, 139, P('#4a3a30'));
  for (let y = 144; y < 156; y += 4) R.linea(156, y, 194, y, P('#9aa890')); cifras('1946', 157, 145, P('#3a3a5a'));
  // el visado de turista: sello rojo rectangular y uno morado redondo
  for (let y = 116; y < 140; y++) for (let x = 204; x < 238; x++) if ((x === 204 || x === 237 || y === 116 || y === 139 || y === 121) && h(x, y, 3) > 0.15) R.pset(x, y, P('#c8302a'));
  cifras('02', 208, 126, P('#c8302a')); cifras('89', 222, 126, P('#c8302a')); for (let x = 208; x < 234; x += 3) R.pset(x, 134, P('#c8302a'));
  for (let a = 0; a < 6.28; a += 0.08) if (h(Math.round(a * 10), 1) > 0.2) R.pset(Math.round(224 + Math.cos(a) * 9), Math.round(149 + Math.sin(a) * 7), P('#6a3a9a')); R.disco(224, 149, 1, P('#6a3a9a'));
};
const p5 = (t) => {
  capa('vest', vestFondo);
  const a = t * 1.0; R.linea(196, 33, Math.round(196 + Math.cos(a) * 7), Math.round(33 + Math.sin(a) * 7), P('#c8302a')); R.linea(196, 33, 196, 27, K); R.linea(196, 33, 201, 35, K);
  for (let k = 0; k < 8; k++) R.pset(232 + Math.floor((h(k, 1) * 34 + t * 3) % 34), 22 + Math.floor((h(k, 2) * 36 + t * 10) % 36), P('#dce4f0'));
  for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1; tinte(Math.round(80 + Math.sin(t * 2 + k) * 2 + u * 3), Math.round(78 - u * 18), P('#c8c8d0'), 0.5 * (1 - u)); }
  te(52, 96, t);
  pasaporte();
  // la lupa: entra por abajo, recorre el visado y se para en la foto en «serious»
  const e1 = tramo(t, P5 + 0.1, P5 + 0.6), e2 = tramo(t, P5 + 0.9, SERIO - 0.5), e3 = tramo(t, SERIO - 0.5, SERIO);
  let lx = lerp(260, 222, sube(e1)), ly = lerp(196, 130, sube(e1)); lx = lerp(lx, 214, e2); ly = lerp(ly, 146, e2); lx = lerp(lx, 166, sube(e3)); ly = lerp(ly, 128, sube(e3));
  if (t > SERIO) { lx += Math.sin(t * 13) * 0.6; ly += Math.cos(t * 11) * 0.5; }
  lx = Math.round(lx); ly = Math.round(ly);
  const RL = 13, muestra = []; for (let j = -RL; j <= RL; j++) for (let i = -RL; i <= RL; i++) muestra.push(R.pget(lx + Math.round(i / 2), ly + Math.round(j / 2)));
  for (let j = -RL; j <= RL; j++) for (let i = -RL; i <= RL; i++) { const d = Math.hypot(i, j); if (d > RL) continue; const c = muestra[(j + RL) * (2 * RL + 1) + (i + RL)]; R.pset(lx + i, ly + j, d > RL - 2 ? P('#c8ccd8') : i + j < -12 ? mez(c, BL, 0.35) : c); }
  for (let a = 0; a < 6.283; a += 0.05) R.pset(Math.round(lx + Math.cos(a) * (RL + 1)), Math.round(ly + Math.sin(a) * (RL + 1)), K);
  for (let k = 0; k < 26; k++) { const x = lx + 10 + k * 0.8, y = ly + 10 + k * 0.7; R.rect(Math.round(x) - 1, Math.round(y) - 1, Math.round(x) + 1, Math.round(y) + 1, k < 6 ? P('#9a9aa4') : P('#5a3018')); }
  T.brazo(R, lx + 52, 214, lx + 30, ly + 32, '#5a6448', -1, {});
  // la otra mano descuelga el auricular en «trouble»
  const coge = tramo(t, LIO - 0.25, LIO + 0.1), alza = tramo(t, LIO, LIO + 0.35);
  const hy = Math.round(132 - 14 * sube(alza));
  R.rect(14, hy, 62, hy + 5, K); R.rect(15, hy + 1, 61, hy + 4, P('#2a2a32')); R.rect(12, hy - 2, 22, hy + 7, K); R.rect(54, hy - 2, 64, hy + 7, K); R.rect(13, hy - 1, 21, hy + 6, P('#3a3a44')); R.rect(55, hy - 1, 63, hy + 6, P('#3a3a44')); R.rect(16, hy + 1, 60, hy + 1, P('#6a6a78')); R.rect(14, hy, 20, hy, P('#7a7a88')); R.rect(56, hy, 62, hy, P('#7a7a88'));
  if (alza > 0) for (let y = hy + 7; y < 140; y++) R.pset(17 + Math.round(Math.sin(y * 1.4) * 2), y, P('#1a1a20'));
  if (coge > 0) T.brazo(R, 0, 214, Math.round(lerp(10, 30, coge)), Math.round(lerp(196, hy + 14, sube(coge))), '#5a6448', 1, {});
};

const efectos = [[CONSOLA, 'golpecito'], [REBOTA, 'boing'], [P2 + 0.8, 'golpecito'], [NADIE, 'pop'], [AVION, 'jet'], [FOTO, 'flash'], [LLAMA, 'toc'], [LLAMA + 0.4, 'puerta'], [CITA, 'silbato'], [LIO, 'cuelga']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { cartela: '1989', efectos, año: 1989 });
''')

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['ts-cartucho'] = ('El cartucho', '''// TS-CARTUCHO (frase 14), febrero de 1989. Cinco planos:
// 1. la sala de reuniones de Elorg: Rogers entra desde el pasillo y el guardia se queda en la puerta; Bélikov frunce
//    el ceño en «suspicion»; Rogers explica y en «luck» saca del bolsillo el cartucho; los soviéticos se sorprenden.
//    Corta en «He».
// 2. la mesa de cerca: la mano de Rogers deja el cartucho genérico bajo la lámpara en «cartridge» (golpe) y luego la
//    consola de bolsillo en «console»; Bélikov y el otro funcionario se miran sorprendidos. Corta en «Elorg».
// 3. (inserto) el archivo de Elorg: la mano de Bélikov saca el contrato del cajón; en «authorized» y en «version» las
//    casillas de las consolas se tachan en rojo; la otra mano pone el cartucho al lado en «Instead». Corta en «the Soviets».
// 4. (inserto) la pizarra: la tiza dibuja el cartucho, la flecha, las monedas («money») y el «?» («game»); en
//    «permission» tacha la flecha con una X roja. Corta en «and».
// 5. junto al ventanal nevado: Rogers habla con la mano en el pecho («the only one»); Bélikov se vuelve en «truth»,
//    asiente y sonríe por primera vez.''', COMUN + r'''
const c = (f) => en('cartucho', f);
const P2 = c(.231), P3 = c(.4487), P4 = c(.6463), P5 = c(.8542);
const RECELO = c(.0595), ROGERS = c(.1004), ERROR = c(.1421), SUERTE = c(.199);
const CARTUCHO = c(.2843), CONSOLA = c(.4025);
const NUNCA = c(.486), VERSION = c(.5197), ECHAR = c(.5797);
const DINERO = c(.7512), JUEGO = c(.7867), PERMISO = c(.8142);
const SOLO = c(.9129), VERDAD = c(.9741);
const TRAJE_B = '#5a5046';                          // la manga de Bélikov
const BURO2 = { H: P('#9a9aa6'), h: P('#b8b8c4'), C: P('#4a5a6a'), c: P('#3a4856'), o: P('#2a4a6a'), F: P('#4a5a6a') };   // el otro funcionario, canoso

// ── 1 · la sala de reuniones
const p1 = (t) => {
  const o = { encuadre: 'elorg', hora: 0.15 };
  T.moscu(R, t, o);
  const saca = t > SUERTE - 0.15;
  R.actor(TS.burocrata, 85, 131, t, { dir: 1, pal: BURO2, sorpresa: saca && t < SUERTE + 0.9, habla: t > ROGERS && t < ERROR && Math.sin(t * 7) > 0.3 });
  R.actor(TS.belikov, 129, 131, t, { dir: -1, enfado: t > RECELO && !saca, sorpresa: saca });
  R.actor(TS.burocrata, 199, 131, t, { dir: t > ERROR - 0.4 && t < SUERTE ? 1 : -1, sorpresa: saca && t < SUERTE + 0.7, sonrisa: t > SUERTE + 0.7 });
  // el guardia se queda en la puerta, vigilando
  const g = tramo(t, 1.0, 1.8); if (g > 0) { R.recorte([14, 84, 46, 131]); R.actor(TS.guardia, Math.round(lerp(-6, 22, g)), 131, t, { dir: 1, anda: g < 1, enfado: g >= 1 }); R.recorte(null); }
  T.moscuDelante(R, t, o);
  // Rogers entra desde el pasillo y se planta delante de la mesa
  const u = tramo(t, 0.05, 1.2), x = Math.round(lerp(20, 34, u)), s = Math.round(lerp(134, 172, u));
  const a = R.actor(TS.rogersAbrigo, x, s, t, { dir: 1, anda: u > 0 && u < 1, habla: t > ROGERS - 0.2 && t < ERROR && Math.sin(t * 8) > 0, dedo: t > ROGERS && t < ERROR - 0.1,
    sostiene: t > ERROR ? (saca ? [x + 16, s - 19] : [x + 12, s - 9]) : false, sonrisa: t > SUERTE + 0.3 });
  if (saca) { PZ.cartucho(R, a.mano[0], a.mano[1] + 6, { color: '#3a8a9a' }); destello(a.mano[0], a.mano[1] - 6, tramo(t, SUERTE - 0.1, SUERTE + 0.4)); }
};

// ── 2 · la mesa de cerca: el cartucho bajo la lámpara
const p2 = (t) => {
  const o = { encuadre: 'elorg', camara: 'mesa', hora: 0.25, dia: 14 };
  T.moscu(R, t, o);
  const golpe = t > CARTUCHO, mira = t > CONSOLA + 0.15;
  R.actor(TS.burocrata, 112, 120, t, { dir: 1, pal: BURO2, sorpresa: golpe && !mira, habla: mira && Math.sin(t * 7) > 0, sonrisa: false });
  R.actor(TS.belikov, 196, 120, t, { dir: mira ? -1 : 1, enfado: !golpe, sorpresa: golpe });
  T.moscuDelante(R, t, { ...o, cartucho: false, contrato: true, casillas: [1, 0, 0] });
  // el cartucho sube desde abajo en la mano y cae sobre el tapete en «cartridge»
  const u = tramo(t, CARTUCHO - 0.75, CARTUCHO), cy = Math.round(lerp(214, 164, sube(u))), sale = tramo(t, CARTUCHO + 0.3, CARTUCHO + 0.75);
  if (u > 0) {
    if (golpe) { zona(226, 162, 254, 166, K, 0.35); for (let k = 0; k < 6; k++) { const f = tramo(t, CARTUCHO, CARTUCHO + 0.5), a = k * 1.05; if (f > 0 && f < 1) tinte(Math.round(238 + Math.cos(a) * (14 + f * 10)), Math.round(162 + Math.sin(a) * 3 * f), P('#e8f0d0'), 0.6 * (1 - f)); } }
    PZ.cartucho(R, 238, cy, { s: 2, color: '#3a8a9a' });
    if (golpe) { const b = (t * 0.6) % 1, bx = Math.round(226 + b * 30); for (let j = 0; j < 30; j++) { const x = bx - Math.round(j * 0.4); if (x > 225 && x < 250) tinte(x, cy - 33 + j, BL, 0.35); } }
    if (sale < 1) { const wy = Math.round(lerp(cy - 8, 200, sale)); T.brazo(R, 282, 222, 258, wy, '#4a3a30', -1, {}); }
  }
  // la consola de bolsillo, en «console»
  const v = tramo(t, CONSOLA - 0.6, CONSOLA), vy = Math.round(lerp(204, 177, sube(v))), vs = tramo(t, CONSOLA + 0.25, CONSOLA + 0.7);
  if (v > 0) { PZ.consolaBolsillo(R, 186, vy, { encendida: t > CONSOLA + 0.2 && Math.floor(t * 3) % 2 === 0 }); if (vs < 1) T.brazo(R, 226, 222, 206, Math.round(lerp(vy - 4, 200, vs)), '#4a3a30', -1, {}); }
};

// ── 3 · el archivo: el contrato sin consola
const archFondo = () => {
  for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x >> 2, y >> 1, 3) > 0.85 ? P('#46503e') : P('#3e463a'));
  R.rect(0, 18, 272, 22, P('#5a3a22')); R.rect(0, 18, 272, 18, P('#8a5a34'));
  for (let y = 22; y < 180; y++) for (let x = 272; x < 320; x++) R.pset(x, y, h(x >> 2, y >> 1, 3) > 0.85 ? P('#46503e') : P('#3e463a'));
  // el fichero de roble: cuatro filas de cajones con su tarjetero de latón y su tirador
  madera(0, 22, 271, 102, ['#8a5a32', '#a8743e', '#6a4224', '#3e2614'], { alto: 20, k: 3 });
  for (let r = 0; r < 4; r++) for (let k = 0; k < 7; k++) { const x0 = 2 + k * 38, y0 = 23 + r * 20; R.rect(x0, y0, x0 + 36, y0, P('#3e2614')); R.rect(x0, y0, x0, y0 + 18, P('#3e2614')); R.rect(x0 + 1, y0 + 1, x0 + 35, y0 + 1, P('#b07c48'));
    caja(x0 + 12, y0 + 4, x0 + 24, y0 + 9, P('#f2e8c8'), P('#c8a040')); if (h(r, k) > 0.45) cifras(String(10 + r * 7 + k), x0 + 14, y0 + 5, P('#5a4a32'));
    R.rect(x0 + 15, y0 + 12, x0 + 21, y0 + 14, P('#c8a040')); R.rect(x0 + 15, y0 + 14, x0 + 21, y0 + 14, P('#7a5a20')); }
  // el extintor y el helecho de la derecha
  caja(282, 60, 296, 98, P('#c8302a')); R.rect(284, 62, 286, 96, P('#e85a4a')); R.rect(285, 54, 293, 60, K); R.linea(293, 56, 302, 70, K);
  for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.33; for (let s = 0; s < 22; s++) { const x = Math.round(300 + Math.cos(a) * s), y = Math.round(126 + Math.sin(a) * s + s * s * 0.02); R.pset(x, y, s % 3 ? P('#3a7a3a') : P('#5a9a4a')); } }
  caja(290, 126, 312, 150, P('#a85a3a')); R.rect(291, 127, 311, 129, P('#c8704a'));
  // el cajón abierto: los lados, el fondo y las carpetas colgantes de atrás
  for (let y = 103; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x >> 2, y >> 2, 6) > 0.8 ? P('#2a1a10') : P('#22150c'));
  R.poligono([[40, 104], [280, 104], [300, 180], [20, 180]], P('#6a4224'));
  R.poligono([[50, 108], [270, 108], [286, 180], [34, 180]], P('#3a2414'));
  carpetas(108, 140);
  // la luz del flexo, desde arriba a la derecha
  for (let y = 22; y < 180; y++) for (let x = 120; x < 300; x++) { const d = Math.hypot(x - 230, (y - 60) * 0.8); if (d < 120) tinte(x, y, P('#ffe8b0'), 0.12 * (1 - d / 120)); }
};
// las carpetas colgantes vistas desde arriba (filas de y0 a y1), con sus pestañas de colores
const carpetas = (y0, y1) => { for (let y = y0; y <= y1; y += 4) { const l = lerp(52, 36, (y - 104) / 76), r = lerp(268, 284, (y - 104) / 76);
  for (let x = Math.round(l); x <= Math.round(r); x++) { R.pset(x, y, P('#d8c090')); R.pset(x, y + 1, P('#b89a68')); R.pset(x, y + 2, P('#5a4020')); }
  const tx = Math.round(l + 10 + h(y, 1) * (r - l - 30)); R.rect(tx, y - 2, tx + 10, y, [P('#c8302a'), P('#3a6ac8'), P('#e8c040'), P('#4a9a5a')][Math.floor(h(y, 2) * 4)]); } };
const p3 = (t) => {
  capa('archivo', archFondo);
  // motas de polvo en la luz
  for (let k = 0; k < 14; k++) { const x = Math.round(150 + h(k, 1) * 140 + Math.sin(t * 0.6 + k) * 6), y = Math.round(30 + ((h(k, 2) * 140 + t * 4 * (0.5 + h(k, 3))) % 140)); tinte(x, y, P('#fff4d0'), 0.6); }
  // el contrato sube del cajón en la mano de Bélikov
  const u = tramo(t, P3 + 0.1, P3 + 0.65), base = Math.round(lerp(200, 150, sube(u))), x0 = 150 - 33, y0 = base - 84;
  PZ.contrato(R, 150, base, { s: 3, casillas: [1, 0, 0], firma: true, sello: true });
  // las X rojas: la consola de salón en «authorized», la de bolsillo en «version»
  for (const [k, tk] of [[1, NUNCA], [2, VERSION]]) { const f = tramo(t, tk - 0.12, tk); if (f <= 0) continue; const cx = x0 + 11, cy = y0 + (14 + (k - 1) * 5 + 1.5) * 3, r = Math.round(9 * f);
    for (let d = -r; d <= r; d++) for (let g = -1; g <= 1; g++) { R.pset(cx + d, cy + d + g, P('#d8202a')); R.pset(cx + d, cy - d + g, P('#d8202a')); } }
  carpetas(144, 176);
  R.poligono([[20, 168], [300, 168], [304, 180], [16, 180]], P('#8a5a32')); R.rect(16, 168, 304, 169, P('#b07c48')); caja(140, 172, 180, 178, P('#c8a040'));
  T.brazo(R, 78, 216, 106, Math.min(196, base - 8), TRAJE_B, 1, {});
  // la otra mano trae el cartucho y lo deja al lado de la casilla tachada
  const v = tramo(t, ECHAR - 0.55, ECHAR), vy = Math.round(lerp(214, 150, sube(v)));
  if (v > 0) { PZ.cartucho(R, 210, vy, { s: 2, color: '#3a8a9a' }); destello(200, vy - 30, tramo(t, ECHAR, ECHAR + 0.5)); T.brazo(R, 252, 218, 228, vy - 6, TRAJE_B, -1, {}); }
};

// ── 4 · la pizarra: alguien gana dinero con su juego
const pizFondo = () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x >> 2, y >> 1, 3) > 0.85 ? P('#6e7e70') : h(x, y, 4) > 0.97 ? P('#62725e') : P('#7a8a7c'));
  R.rect(0, 14, 319, 15, P('#5a6a5c'));
  // el mapa enrollado colgado de su barra, el reloj de pared, el gráfico del plan con sus barras y el aplique
  R.rect(30, 16, 156, 19, P('#6a4224')); R.rect(30, 16, 156, 16, P('#8a5a32')); R.disco(30, 18, 2, P('#c8a040')); R.disco(156, 18, 2, P('#c8a040'));
  for (let y = 20; y < 30; y++) for (let x = 36; x < 150; x++) R.pset(x, y, y === 20 || y === 29 ? P('#8a7a5a') : y < 23 ? P('#f2e8c8') : y > 26 ? P('#b8a87a') : P('#e0d4a8'));
  R.linea(92, 30, 92, 38, P('#3a2a1a')); R.disco(92, 40, 2, P('#c8a040'));
  R.disco(196, 32, 13, K); R.disco(196, 32, 12, P('#3a2a1a')); R.disco(196, 32, 10, P('#f6f0e0')); for (let k = 0; k < 12; k++) R.pset(Math.round(196 + Math.cos(k * 0.5236) * 8), Math.round(32 + Math.sin(k * 0.5236) * 8), K);
  caja(222, 18, 270, 50, P('#f6f2e6'), P('#5a3a1a')); R.rect(224, 20, 268, 23, P('#c8302a'));
  for (let k = 0; k < 6; k++) { const hh = 6 + k * 4; R.rect(228 + k * 7, 47 - hh, 232 + k * 7, 47, k === 5 ? P('#c8302a') : P('#3a6ac8')); } R.linea(226, 47, 266, 47, K);
  R.rect(10, 30, 14, 40, P('#c8a040')); R.disco(12, 28, 4, P('#fff0c0')); for (let y = 20; y < 56; y++) for (let x = 0; x < 30; x++) { const d = Math.hypot(x - 12, y - 30); if (d < 18) tinte(x, y, P('#fff0c0'), 0.25 * (1 - d / 18)); }
  // la pizarra con su marco y la repisa
  madera(2, 54, 317, 158, ['#6a4224', '#8a5a32', '#4a2a18', '#2a160a'], { alto: 5, k: 8 });
  for (let y = 59; y <= 150; y++) for (let x = 7; x <= 312; x++) { const g = h(x >> 4, y >> 3, 1), n = h(x, y, 2), arco = Math.abs(Math.sin(Math.hypot(x - 90, y - 60) * 0.08));
    R.pset(x, y, n > 0.93 ? P('#3c4e44') : (g > 0.7 && arco < 0.25) ? P('#384a40') : g > 0.85 ? P('#33453b') : P('#2c3c34')); }
  // lo que quedó de otras reuniones, medio borrado
  const viejo = P('#4e6258'); cifras('1988', 18, 64, viejo); cifras('1989', 18, 72, viejo); for (let k = 0; k < 9; k++) R.linea(18 + k * 4, 82, 20 + k * 4, 90, viejo); R.linea(16, 87, 54, 84, viejo);
  trazo([[110, 64], [150, 64], [150, 86], [110, 86], [110, 64]], 1, viejo, 1, 3); trazo([[150, 75], [190, 75]], 1, viejo, 1, 3); trazo([[194, 66], [222, 66], [222, 84], [194, 84], [194, 66]], 1, viejo, 1, 3);
  cifras('3', 128, 72, viejo); cifras('7', 206, 72, viejo); trazo([[244, 70], [262, 84], [280, 70], [298, 84]], 1, viejo, 1, 3); cifras('12', 254, 92, viejo); cifras('40', 282, 92, viejo);
  R.rect(0, 152, 319, 158, P('#5a3a22')); R.rect(0, 152, 319, 152, P('#8a5a34')); R.rect(0, 158, 319, 159, K);
  for (const [x, c, l] of [[60, '#f2f2ea', 7], [72, '#f2f2ea', 4], [250, '#e8806a', 6], [264, '#f0e070', 5]]) R.rect(x, 150, x + l, 151, P(c));
  caja(150, 146, 176, 152, P('#4a3a2a')); R.rect(151, 150, 175, 151, P('#d8d8d0'));
  madera(0, 166, 319, 179, ['#5a3a22', '#74502e', '#422a18', '#2a1a0e'], { alto: 7, k: 9 });
  R.rect(286, 162, 300, 179, P('#8a8a94')); for (let x = 287; x < 300; x += 3) R.rect(x, 163, x + 1, 178, P('#a8a8b4'));
};
const TIZA = P('#e8ece0'), TIZA_R = P('#ec7a64');
const DIBUJO = [
  [[[36, 112], [62, 112], [62, 144], [36, 144], [36, 112]], 0.20, 0.55, TIZA], [[[41, 117], [57, 117], [57, 128], [41, 128], [41, 117]], 0.55, 0.75, TIZA],
  [[[39, 138], [42, 138], [45, 138], [48, 138], [51, 138], [54, 138], [57, 138]], 0.75, 0.9, TIZA],
  [[[72, 128], [110, 128]], 0.95, 1.3, TIZA], [[[102, 121], [110, 128], [102, 135]], 1.3, 1.45, TIZA],
];
const p4 = (t) => {
  capa('pizarra', pizFondo);
  const s = (a) => P4 + a;
  // cada trazo: [puntos, empieza, acaba, color] (en segundos desde el corte)
  const trazos = [...DIBUJO];
  const saco = []; for (let k = 0; k <= 30; k++) { const a = -Math.PI / 3 + k / 30 * (5 * Math.PI / 3); saco.push([131 + Math.cos(a) * 13, 133 + Math.sin(a) * 11]); }
  const t0 = DINERO - 0.8 - P4;
  trazos.push([[[124, 120], [120, 113], [126, 116], [131, 111], [136, 116], [142, 113], [138, 120]], t0, t0 + 0.15, TIZA], [saco, t0 + 0.15, t0 + 0.5, TIZA], [[[124, 121], [138, 121]], t0 + 0.5, t0 + 0.55, TIZA]);
  trazos.push([[[135, 127], [130, 125], [127, 129], [135, 133], [132, 138], [127, 136]], t0 + 0.6, t0 + 0.75, TIZA], [[[131, 123], [131, 140]], t0 + 0.75, t0 + 0.8, TIZA]);
  const t1 = JUEGO - 0.55 - P4;
  trazos.push([[[150, 128], [186, 128]], t1, t1 + 0.22, TIZA], [[[178, 121], [186, 128], [178, 135]], t1 + 0.22, t1 + 0.3, TIZA]);
  trazos.push([[[196, 116], [202, 110], [212, 110], [216, 116], [214, 122], [206, 126], [206, 134]], t1 + 0.32, t1 + 0.52, TIZA], [[[205, 140], [207, 141]], t1 + 0.54, t1 + 0.56, TIZA]);
  const t2 = PERMISO - 0.35 - P4;
  trazos.push([[[66, 114], [116, 144]], t2, t2 + 0.15, TIZA_R], [[[66, 144], [116, 114]], t2 + 0.18, t2 + 0.33, TIZA_R]);
  let punta = null;
  for (const [pts, a, b, col] of trazos) { const u = tramo(t, s(a), s(b)); if (u <= 0) continue; const f = trazo(pts, u, col, col === TIZA_R ? 2 : 2, 11); if (u < 1) punta = f; }
  // la mano con la tiza sigue la punta; entre trazo y trazo, va al siguiente
  if (!punta) { let prox = null, ult = null; for (const [pts, a, b] of trazos) { if (s(b) <= t) ult = [pts[pts.length - 1], s(b)]; else if (!prox && s(a) > t) prox = [pts[0], s(a)]; }
    if (ult && prox) { const f = tramo(t, ult[1], prox[1]); punta = [lerp(ult[0][0], prox[0][0], sube(f)), lerp(ult[0][1], prox[0][1], sube(f)) - Math.sin(f * Math.PI) * 4]; }
    else if (ult) { const f = tramo(t, ult[1] + 0.3, ult[1] + 0.9), g = Math.sin((t - ult[1]) * 14) > 0 && t < ult[1] + 0.3; punta = [lerp(ult[0][0], 330, f) + 0, lerp(ult[0][1], 210, f) + (g ? 1 : 0)]; }
    else if (prox) { const f = tramo(t, P4, prox[1]); punta = [lerp(120, prox[0][0], sube(f)), lerp(210, prox[0][1], sube(f))]; } }
  if (punta) { const [px, py] = punta.map(Math.round), roja = t > s(t2) - 0.3; R.rect(px, py - 1, px + 4, py + 1, roja ? TIZA_R : TIZA); T.brazo(R, px + 34, 222, px + 12, py + 10, TRAJE_B, -1, {}); }
};

// ── 5 · junto al ventanal: la única verdad
const ventFondo = () => {
  papel(0, 0, 319, 150, ['#d8c8a0', '#c8b488', '#ece0bc'], { pw: 16, ph: 18 });
  R.rect(0, 136, 319, 150, P('#6a4224')); R.rect(0, 136, 319, 137, P('#8a5a34')); for (let x = 0; x < 320; x += 32) R.rect(x, 138, x, 149, P('#4a2a18'));
  parquet(0, 151, 319, 179, ['#8a5a32', '#a06a3a', '#74482a', '#4a2a18']);
  // la alfombra roja con su cenefa
  for (let y = 158; y < 180; y++) for (let x = 54; x < 270; x++) { const b = x < 58 || x > 265 || y < 162; R.pset(x, y, b ? (((x + y) >> 1) % 3 ? P('#e8c060') : P('#7a1e22')) : (Math.abs(((x - 162) % 18) - 9) + Math.abs(((y - 170) % 10) - 5) === 6 ? P('#e8c060') : h(x, y) > 0.9 ? P('#8a2428') : P('#a8343a'))); }
  // la estantería de la izquierda con archivadores, libros y un busto
  madera(4, 30, 70, 150, ['#5a3a22', '#74502e', '#422a18', '#2a1a0e'], { alto: 30, k: 11 });
  for (let r = 0; r < 4; r++) { const y0 = 34 + r * 29; zona(8, y0, 66, y0 + 24, K, 0.4); let x = 9; while (x < 64) { const w = 3 + Math.floor(h(x, r) * 4), hh = 14 + Math.floor(h(x, r, 2) * 9), col = [P('#7a2a2a'), P('#2a4a6a'), P('#5a6a3a'), P('#8a6a3a'), P('#4a3a5a')][Math.floor(h(x, r, 3) * 5)];
      R.rect(x, y0 + 24 - hh, x + w - 1, y0 + 24, col); R.rect(x, y0 + 26 - hh, x + w - 1, y0 + 26 - hh, P('#e8c060')); R.rect(x + w - 1, y0 + 24 - hh, x + w - 1, y0 + 24, mez(col, K, 0.4)); x += w + (h(x, r, 4) > 0.85 ? 4 : 0); } }
  // el ventanal: marco blanco, alféizar, radiador, cortinas (dinámicas) y la barra
  caja(94, 26, 234, 126, P('#e8e4dc'), P('#8a8478')); R.rect(92, 122, 236, 128, P('#f2f0ec')); R.rect(92, 128, 236, 129, P('#9a968c'));
  caja(110, 132, 218, 150, P('#c8c4bc')); for (let x = 113; x < 216; x += 5) { R.rect(x, 133, x + 2, 149, P('#e4e0d8')); R.rect(x + 3, 133, x + 3, 149, P('#9a968c')); }
  R.rect(70, 18, 258, 21, P('#c8a040')); R.disco(70, 19, 3, P('#e8c060')); R.disco(258, 19, 3, P('#e8c060'));
  // el diploma enmarcado y la planta de la derecha
  caja(268, 56, 302, 84, P('#f2eee2'), P('#c8a040')); R.rect(272, 60, 298, 62, P('#c8302a')); for (let y = 66; y < 80; y += 3) R.linea(274, y, 296, y, P('#a8a090')); R.disco(292, 78, 3, P('#c8302a'));
  caja(276, 128, 300, 150, P('#8a4a2a')); for (let k = 0; k < 11; k++) { const a = -2.9 + k * 0.26; for (let s = 0; s < 30; s++) R.pset(Math.round(288 + Math.cos(a) * s), Math.round(128 + Math.sin(a) * s * 1.1 + s * s * 0.015), s % 4 ? P('#3a7a3a') : P('#6aaa5a')); }
};
const cortina = (x0, x1, t, lado) => { for (let y = 22; y <= 152; y++) { const sw = Math.sin(t * 1.3 + y * 0.03) * (y - 22) * 0.025 * lado; for (let x = x0; x <= x1; x++) { const X = Math.round(x + sw), pl = ((x - x0) % 6); R.pset(X, y, pl === 0 ? P('#5a1a1e') : pl < 3 ? P('#9a2a30') : P('#7a2026')); } } };
const p5 = (t) => {
  capa('ventanal', ventFondo);
  vista(98, 30, 230, 121, t, 0.3, { cupula: 0.62, copos: 50 });
  R.rect(162, 30, 165, 121, P('#e8e4dc')); R.rect(98, 70, 230, 73, P('#e8e4dc')); R.rect(98, 50, 128, 52, P('#e8e4dc')); R.rect(126, 30, 128, 52, P('#e8e4dc')); R.pset(122, 44, P('#c8a040')); R.pset(122, 45, P('#c8a040'));
  for (let k = 0; k < 6; k++) tinte(104 + k * 2, 80 + k * 3, BL, 0.3);
  // la paloma que se posa en el alféizar de fuera
  const pv = tramo(t, P5 + 0.4, P5 + 1.2), px = Math.round(lerp(240, 196, pv)), py = Math.round(lerp(80, 116, sube(pv)));
  if (pv > 0) { R.recorte([98, 30, 230, 121]); R.disco(px, py, 3, P('#6a7080')); R.disco(px - 3, py - 3, 2, P('#7a8090')); R.pset(px - 5, py - 3, P('#e8a040')); R.pset(px - 3, py - 4, K); if (pv < 1 && Math.floor(t * 10) % 2) R.linea(px - 1, py - 2, px + 4, py - 6, P('#8a90a0')); R.recorte(null); }
  te(146, 122, t);
  cortina(76, 96, t, 1); cortina(232, 252, t, -1);
  R.rect(76, 22, 96, 23, P('#c8a040')); R.rect(232, 22, 252, 23, P('#c8a040'));
  // Rogers habla con la mano en el pecho; Bélikov mira la nieve, se vuelve en «truth», asiente y sonríe
  const vuelve = t > VERDAD - 0.2, asiente = (t > VERDAD + 0.45 && t < VERDAD + 0.6) || (t > VERDAD + 0.85 && t < VERDAD + 1.0);
  R.actor(TS.belikov, 182, 168, t, { dir: vuelve ? -1 : 1, sonrisa: t > VERDAD + 0.25, salto: asiente ? 1 : 0 });
  const pecho = t > SOLO - 0.1 && t < VERDAD + 0.2;
  R.actor(TS.rogersAbrigo, 128, 168, t, { dir: 1, habla: t > P5 + 0.2 && t < VERDAD && Math.sin(t * 8) > 0, dedo: t > P5 + 0.3 && t < SOLO - 0.4, sostiene: pecho ? [137, 152] : false, sonrisa: t > VERDAD + 0.5 });
};

const efectos = [[SUERTE, 'pop'], [CARTUCHO, 'golpecito'], [CONSOLA, 'toc'], [NUNCA, 'sello'], [ECHAR, 'golpecito'], [P4 + 0.25, 'lapiz'], [DINERO - 0.7, 'lapiz'], [PERMISO, 'lapiz']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 1989 });
''')

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['ts-reuniones'] = ('Las reuniones', '''// TS-REUNIONES (frase 15), febrero de 1989. Cuatro planos:
// 1. el pasillo de Elorg: la luz de la ventana pasa de la mañana a la noche mientras Rogers, con el maletín, entra una
//    y otra vez por la puerta 2 («kept coming back»); una funcionaria cruza con papeles. Corta en «He».
// 2. (inserto) la mesa de las cuentas, desde arriba: la mano de Bélikov pasa las cuentas del ábaco («how much he had
//    sold») y la de Rogers empuja el fajo de dólares al otro lado en «pay»; la luz de la ventana cruza la mesa. Corta en «and».
// 3. la sala del samovar: la puerta se abre en «visits», entra Pázhitnov y se dan la mano en «met»; hablan de juegos
//    (el bocadillo con los bloques en «games»). Corta en «like».
// 4. la mesita del rincón: los dos, sentados, apilan bloques de madera por turnos y se ríen («programmers»); la fila de
//    abajo se completa y desaparece en «friendship»; cae la noche y se enciende la lámpara.''', COMUN + r'''
const r = (f) => en('reuniones', f);
const P2 = r(.2068), P3 = r(.4532), P4 = r(.7162);
const VENDIDO = r(.2836), PAGAR = r(.3443), VISITAS = r(.507), CONOCE = r(.5701), PAJ = r(.5873), JUEGOS = r(.6932);
const PROGRAMADORES = r(.7586), AMISTAD = r(.888), DURA = r(.9293), HOY = r(.9763);
const FUNC = { H: P('#7a4a2a'), h: P('#9a6438'), C: P('#6a3a4a'), c: P('#522c3a'), o: P('#e8c060'), F: P('#5a3040') };   // la funcionaria

// ── 1 · el pasillo: Rogers vuelve una y otra vez
const p1 = (t) => {
  const pasa = (t0) => { const u = tramo(t, t0, t0 + 1.15), e = tramo(t, t0 + 1.15, t0 + 1.5); return { u, e, x: Math.round(lerp(-16, 153, u)), s: Math.round(lerp(158, 146, e)), abre: tramo(t, t0 + 0.95, t0 + 1.25) - tramo(t, t0 + 1.55, t0 + 1.8), dentro: t > t0 + 1.55 }; };
  const A = pasa(0.05), B = pasa(2.05);
  T.moscu(R, t, { encuadre: 'elorg', camara: 'pasillo', hora: 0.08 + 0.85 * tramo(t, 0.4, 3.9), puertas: [tramo(t, 2.6, 3.0) * 0.4, Math.max(A.abre, B.abre, 0), 0] });
  for (const p of [A, B]) { if (p.u <= 0 || p.dentro) continue; if (p.e > 0) R.recorte([144, 90, 176, 170]);
    const a = R.actor(TS.rogersAbrigo, p.x, p.s, t, { dir: 1, anda: (p.u > 0 && p.u < 1) || (p.e > 0 && p.e < 1), sostiene: [p.x + 14, p.s - 10], sonrisa: p === B });
    PZ.maletin(R, a.mano[0] + 1, a.mano[1] + 12); R.recorte(null); }
  // la funcionaria cruza con un montón de papeles, por delante
  const f = tramo(t, 0.3, 3.9), fx = Math.round(lerp(330, -20, f));
  const b = R.actor(TS.burocrata, fx, 168, t, { dir: -1, anda: f > 0 && f < 1, pal: FUNC, sostiene: [fx - 1, 154] });
  caja(b.mano[0] - 6, b.mano[1] - 7, b.mano[0] + 3, b.mano[1] + 1, P('#f2eee2'), P('#8a8478')); R.rect(b.mano[0] - 5, b.mano[1] - 5, b.mano[0] + 2, b.mano[1] - 5, P('#a8a090'));
};

// ── 2 · la mesa de las cuentas, desde arriba
const cuentasFondo = () => {
  madera(0, 0, 319, 179, ['#5a321c', '#6e4024', '#422414', '#2a160a'], { alto: 22, hz: false, k: 12 });
  // el camino de mesa de paño verde, arriba (tranquilo bajo el año)
  for (let y = 0; y <= 22; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 22 ? P('#e8c060') : h(x, y, 4) > 0.9 ? P('#2a4a36') : P('#22402e')); zona(0, 23, 319, 25, K, 0.35);
  // el libro de cuentas abierto: renglones azules, margen rojo y columnas de cifras
  caja(18, 50, 150, 150, P('#efe6cc'), P('#4a3a28')); R.rect(84, 51, 84, 149, P('#b8a880')); zona(85, 51, 90, 149, K, 0.12); zona(78, 51, 83, 149, K, 0.06);
  for (let y = 58; y < 148; y += 7) { R.linea(21, y, 81, y, P('#a8bcd8')); R.linea(88, y, 147, y, P('#a8bcd8')); }
  R.linea(34, 52, 34, 148, P('#e88a8a')); R.linea(100, 52, 100, 148, P('#e88a8a'));
  for (let k = 0; k < 12; k++) { cifras(String(1 + Math.floor(h(k, 3) * 28)), 23, 51 + k * 7 + 1, P('#3a3a6a')); cifras(String(1000 + Math.floor(h(k, 4) * 98000)), 40, 51 + k * 7 + 1, P('#3a3a6a')); if (k < 10) cifras(String(100 + Math.floor(h(k, 5) * 9800)), 106, 51 + k * 7 + 1, P('#3a3a6a')); }
  R.linea(104, 128, 146, 128, P('#3a3a6a')); cifras('40000', 112, 132, P('#c8302a'));
  // el lápiz, las gafas, el sello y su tampón, el cenicero con el cigarrillo
  R.linea(60, 158, 104, 146, P('#e8b040')); R.linea(60, 159, 104, 147, P('#b88020')); R.pset(58, 159, K); R.pset(105, 146, P('#e8a0a0'));
  for (const cx of [190, 206]) { R.disco(cx, 160, 6, K); R.disco(cx, 160, 5, P('#a8c0d0')); R.pset(cx - 2, 158, BL); } R.linea(196, 160, 200, 160, K); R.linea(184, 158, 176, 154, K); R.linea(212, 158, 222, 152, K);
  caja(8, 156, 38, 176, P('#2a2a3a')); R.rect(10, 158, 36, 174, P('#5a2a6a')); caja(42, 160, 54, 176, P('#7a4a2a')); R.disco(48, 158, 4, K); R.disco(48, 158, 3, P('#9a6438'));
  // el tapete de ganchillo bajo el té
  for (let y = 110; y < 170; y++) for (let x = 250; x < 314; x++) { const d = Math.hypot(x - 282, y - 140), a = Math.atan2(y - 140, x - 282), borde = 24 + 3 * Math.cos(a * 12); if (d > borde) continue;
    const fl = Math.hypot(((x - 282 + 40) % 8) - 4, ((y - 140 + 40) % 8) - 4); R.pset(x, y, d > borde - 1.5 ? P('#c8c0b0') : fl < 1.5 ? P('#e0d8c8') : fl > 3.2 ? P('#f8f4ea') : P('#efe8d8')); }
  R.disco(300, 80, 12, K); R.disco(300, 80, 11, P('#a8b8c0')); R.disco(300, 80, 7, P('#6a7a84')); R.rect(290, 78, 306, 79, P('#e8e4d8')); R.pset(306, 78, P('#e86a3a'));
};
const VARILLAS = 7, ABACO = [172, 34, 262, 106];
const p2 = (t) => {
  capa('cuentas', cuentasFondo);
  // la luz de la ventana cruza la mesa (pasan las horas): fría por la mañana, naranja por la tarde
  const lu = tramo(t, P2, P3), lx = Math.round(lerp(-30, 150, lu)), cl = mez(P('#dce8ff'), P('#ffb060'), lu);
  for (let y = 40; y < 170; y++) for (let x = lx; x < lx + 120; x++) { const sx = x - lx - (y - 40) * 0.35; if (sx < 0 || sx > 100) continue; if (Math.abs(sx - 50) < 2 || Math.abs(y - 104) < 2) continue; tinte(x, y, cl, 0.16); }
  te(282, 146, t);
  // el ábaco ruso: marco de madera, siete varillas de diez cuentas (las dos del medio, oscuras)
  const [ax0, ay0, ax1, ay1] = ABACO; caja(ax0, ay0, ax1, ay1, P('#8a5a32'), P('#2a160a')); R.rect(ax0 + 4, ay0 + 4, ax1 - 4, ay1 - 4, P('#4a2e18'));
  const cuenta = (k) => { const pasos = [[VENDIDO - 1.0, 3], [VENDIDO - 0.75, 7], [VENDIDO - 0.5, 5], [VENDIDO - 0.25, 9], [VENDIDO, 4], [PAGAR + 0.6, 6]]; let n = [2, 5, 1, 8, 0, 3, 6][k];
    pasos.forEach(([tp, v], i) => { if (i === k - 1 || (k === 0 && i === 5)) n = Math.round(lerp(n, v, tramo(t, tp - 0.15, tp))); }); return n; };
  let manoY = null;
  for (let k = 0; k < VARILLAS; k++) { const y = ay0 + 9 + k * 9; R.linea(ax0 + 4, y, ax1 - 4, y, P('#c8c8d0'));
    const n = cuenta(k); for (let b = 0; b < 10; b++) { const izq = b < n, x = izq ? ax0 + 8 + b * 6 : ax1 - 8 - (9 - b) * 6, col = b === 4 || b === 5 ? P('#2a1a10') : P('#c8843a');
      R.disco(x, y, 3, K); R.disco(x, y, 2, col); R.pset(x - 1, y - 1, b === 4 || b === 5 ? P('#5a3a2a') : P('#f0b060')); }
    if (k > 0 && t > VENDIDO - 1.0 + (k - 1) * 0.25 - 0.3 && t < VENDIDO - 1.0 + (k - 1) * 0.25 + 0.05) manoY = y; }
  // la mano de Bélikov pasa las cuentas desde la derecha
  const bm = tramo(t, P2 + 0.05, P2 + 0.4) - tramo(t, PAGAR + 0.9, PAGAR + 1.3); if (bm > 0) { const my = manoY ?? (t < VENDIDO ? ay0 + 18 : ay0 + 9); T.brazo(R, 352, my + 30, Math.round(lerp(352, ax1 + 10, bm)), my + 4, '#5a5046', -1, {}); }
  // el fajo de dólares de Rogers: entra por abajo y lo empuja al otro lado en «pay»
  const f1 = tramo(t, PAGAR - 0.9, PAGAR - 0.45), f2 = tramo(t, PAGAR - 0.35, PAGAR), f3 = tramo(t, PAGAR + 0.4, PAGAR + 0.85);
  const bx = Math.round(lerp(158, 176, sube(f2))), by = Math.round(lerp(lerp(206, 160, sube(f1)), 122, sube(f2)));
  if (f1 > 0) { for (let k = 3; k >= 0; k--) { const x = bx - 17 + k, y = by - 9 - k * 2; caja(x, y, x + 34, y + 16, P('#7aa86a'), P('#2a4a2a')); R.rect(x + 2, y + 2, x + 32, y + 2, P('#9ac88a')); }
    const x = bx - 17, y = by - 9; R.disco(x + 17, y + 8, 5, P('#5a8a4a')); R.disco(x + 17, y + 8, 4, P('#a8d098'));
    for (const [i, j] of [[1, 0], [0, 1], [1, 2], [2, 3], [1, 4], [0, 4], [1, -1], [1, 5]]) R.pset(x + 16 + i, y + 6 + j, P('#2a4a2a')); R.pset(x + 18, y + 7, P('#2a4a2a'));
    R.rect(x + 6, y, x + 9, y + 16, P('#f2eee2')); R.rect(x + 6, y, x + 9, y, P('#c8c4bc'));
    if (f3 < 1) T.brazo(R, bx + 4, 224, bx + 2, Math.round(lerp(by + 14, 214, f3)), '#4a3a30', 1, {}); }
};

// ── 3 · la sala del samovar: Pázhitnov entra y se dan la mano
const samFondo = () => {
  papel(0, 0, 319, 138, ['#c8a868', '#b8945a', '#e0c488'], { pw: 16, ph: 20 });
  R.rect(0, 22, 319, 23, P('#8a5a34'));
  madera(0, 124, 319, 140, ['#6a4224', '#8a5a32', '#4a2a18', '#2a160a'], { alto: 8, k: 13 });
  parquet(0, 141, 319, 179, ['#8a5a32', '#a06a3a', '#74482a', '#4a2a18']);
  for (let y = 150; y < 180; y++) for (let x = 76; x < 262; x++) { const b = x < 80 || x > 257 || y < 154; R.pset(x, y, b ? (((x + y) >> 1) % 3 ? P('#2a4a6a') : P('#e8d8b0')) : (Math.abs(((x - 168) % 16) - 8) + Math.abs(((y - 166) % 12) - 6) === 5 ? P('#e8d8b0') : h(x, y) > 0.9 ? P('#1e3a56') : P('#2a4a6a'))); }
  // el marco de la puerta de la izquierda
  caja(20, 58, 70, 141, P('#6a4224'), K); R.rect(22, 60, 68, 61, P('#8a5a32'));
  // el cuadro de los abedules
  caja(92, 32, 152, 74, P('#c8a040'), P('#5a3a1a')); R.rect(96, 36, 148, 70, P('#a8c8d8')); R.rect(96, 58, 148, 70, P('#7a9a4a'));
  for (const x of [102, 114, 124, 138, 144]) { R.rect(x, 38, x + 1, 68, P('#f4f4ee')); for (let y = 40; y < 68; y += 5) R.pset(x, y + (x % 3), K); }
  for (let k = 0; k < 30; k++) R.pset(97 + Math.floor(h(k, 1) * 50), 37 + Math.floor(h(k, 2) * 22), P('#e8c040'));
  // el aparador: abajo puertas con tiradores; arriba la vitrina con platos y vasos; encima, el samovar
  madera(196, 96, 306, 140, ['#5a321c', '#74442a', '#422414', '#2a160a'], { alto: 11, hz: false, k: 14 }); R.rect(196, 96, 306, 98, P('#8a5a34'));
  for (const x of [200, 252]) { caja(x, 102, x + 50, 136, P('#5a321c'), P('#2a160a')); R.rect(x + (x === 200 ? 46 : 3), 116, x + (x === 200 ? 47 : 4), 122, P('#c8a040')); }
  caja(202, 50, 300, 96, P('#3a2a20'), P('#2a160a')); R.rect(200, 48, 302, 50, P('#6a4224'));
  for (let y = 52; y < 95; y++) for (let x = 204; x < 299; x++) R.pset(x, y, x === 251 ? P('#6a4224') : y === 72 ? P('#8a6a4a') : P('#2a3a3a'));
  for (let k = 0; k < 6; k++) { const cx = 212 + k * 15; R.disco(cx, 64, 6, P('#e8e4dc')); R.disco(cx, 64, 4, P('#3a6ac8')); R.disco(cx, 64, 2, P('#e8e4dc')); }
  for (let k = 0; k < 9; k++) { const x = 208 + k * 10; R.rect(x, 82, x + 4, 92, P('#9ac0c8')); R.rect(x, 82, x, 92, BL); }
  for (let y = 54; y < 94; y++) { const x = 206 + (y - 54); if (x < 250) R.pset(x, y, P('#5a7a7a')); }
};
const samovar = (t) => {
  const cx = 238, by = 96;
  for (let y = 70; y <= 94; y++) { const w = Math.round(9 + Math.sin((y - 70) / 24 * Math.PI) * 3); for (let i = -w; i <= w; i++) R.pset(cx + i, y, i === -w || i === w ? K : i < -w * 0.4 ? P('#f0c060') : i > w * 0.5 ? P('#a8782a') : P('#d8a040')); }
  R.rect(cx - 6, 94, cx + 6, 96, P('#a8782a')); R.rect(cx - 8, 96, cx + 8, 96, K); R.rect(cx - 4, 64, cx + 4, 70, P('#c8903a')); R.rect(cx - 2, 60, cx + 2, 64, P('#a8782a'));
  R.rect(cx + 10, 84, cx + 15, 86, P('#c8903a')); R.pset(cx + 15, 87, P('#c8903a')); R.rect(cx - 14, 76, cx - 10, 78, K); R.rect(cx + 10, 76, cx + 14, 78, K);
  // la tetera de encima
  R.disco(cx, 56, 5, K); R.disco(cx, 56, 4, P('#e8e4dc')); R.disco(cx, 56, 2, P('#3a6ac8')); R.rect(cx + 4, 54, cx + 8, 55, P('#e8e4dc'));
  for (let k = 0; k < 5; k++) { const u = (t * 0.6 + k / 5) % 1; tinte(Math.round(cx + Math.sin(t * 1.7 + k) * 3 * u), Math.round(50 - u * 22), BL, 0.55 * (1 - u)); tinte(Math.round(cx + 1 + Math.sin(t * 1.7 + k) * 3 * u), Math.round(50 - u * 22), BL, 0.4 * (1 - u)); }
  for (const x of [262, 272, 282]) te(x, 96, t, false);
};
const relojPared = (x, y, t) => { caja(x - 9, y - 10, x + 9, y + 34, P('#6a4224'), K); R.disco(x, y, 7, P('#f6f0e0')); R.disco(x, y, 7, K); R.disco(x, y, 6, P('#f6f0e0'));
  R.linea(x, y, x + Math.round(Math.cos(t * 0.5) * 5), y + Math.round(Math.sin(t * 0.5) * 5), K); R.linea(x, y, x, y - 4, K);
  R.rect(x - 7, y + 10, x + 7, y + 32, P('#3a2416')); const a = Math.sin(t * 3.1) * 0.35, px = Math.round(x + Math.sin(a) * 16), py = Math.round(y + 12 + Math.cos(a) * 16); R.linea(x, y + 11, px, py, P('#c8a040')); R.disco(px, py, 2, P('#e8c060')); };
const p3 = (t) => {
  capa('samovar', samFondo);
  samovar(t); relojPared(172, 40, t);
  // la puerta acolchada se abre hacia dentro en «visits»: dentro, el pasillo en penumbra
  const ab = tramo(t, VISITAS - 0.25, VISITAS + 0.35);
  R.rect(24, 62, 66, 140, P('#2a2420')); for (let y = 62; y < 140; y++) for (let x = 24; x <= 66; x++) if (h(x >> 2, y >> 2, 3) > 0.7) R.pset(x, y, P('#3a322a')); R.rect(24, 120, 66, 140, P('#5a2a2a'));
  R.disco(52, 74, 4, P('#ffe8a0')); zona(36, 66, 64, 90, P('#ffe8a0'), 0.12);
  const ancho = Math.round(42 * (1 - 0.82 * ab)), x1 = 24 + ancho;
  for (let y = 62; y <= 140; y++) for (let x = 24; x <= x1; x++) { const i = (x - 24) / Math.max(1, ancho) * 42, j = y - 62; R.pset(x, y, x === x1 || y === 62 || y === 140 ? K : (Math.round(i) % 10 === 5 && j % 12 === 6) ? P('#c8a040') : (Math.round(i + j) % 12 === 0 || Math.round(i - j + 200) % 12 === 0) ? P('#6a1e22') : P('#8a2a30')); }
  if (ab < 0.5) { R.disco(24 + Math.round(ancho * 0.88), 102, 2, P('#e8c060')); }
  // Pázhitnov entra; Rogers, que esperaba junto al aparador, va hacia él; se dan la mano en «met»
  const pe = tramo(t, VISITAS + 0.1, CONOCE - 0.15), pxp = Math.round(lerp(36, 128, pe)), ps = Math.round(lerp(140, 166, Math.min(1, pe * 2.5)));
  const ro = tramo(t, VISITAS + 0.4, CONOCE - 0.1), rx = Math.round(lerp(208, 146, ro));
  const mano = t > CONOCE - 0.1 && t < PAJ + 0.7, sacude = Math.round(Math.sin(t * 22) * (mano ? 1.5 : 0));
  if (pe > 0) R.actor(TS.pazhitnov, pxp, ps, t, { dir: 1, anda: pe < 1, sostiene: mano ? [139, 154 + sacude] : false, sonrisa: t > CONOCE - 0.2, habla: t > PAJ + 0.8 && t < JUEGOS - 0.1 && Math.sin(t * 8) > 0, dedo: t > JUEGOS - 0.1 });
  const ya = t > VISITAS - 0.1;
  R.actor(TS.rogersAbrigo, rx, 166, t, { dir: ya ? -1 : 1, anda: ro > 0 && ro < 1, sorpresa: ya && t < VISITAS + 0.4, sostiene: mano ? [141, 154 + sacude] : false, sonrisa: t > CONOCE - 0.3, habla: t > JUEGOS + 0.1 && Math.sin(t * 8) > 0 });
  if (!ya || ro <= 0) PZ.maletin(R, 196, 166); else PZ.maletin(R, 220, 166);
  // el bocadillo con los bloques, en «games»
  const bq = tramo(t, JUEGOS - 0.2, JUEGOS + 0.1); if (bq > 0) { const bx = 132, by = 112 - Math.round((1 - bq) * 4); caja(bx - 2, by - 2, bx + 18, by + 14, BL); R.pset(bx + 6, by + 15, BL); R.pset(bx + 5, by + 16, BL); R.icono('bloques', bx + 2, by + 2, P('#9a6a38'), P('#5a3a1a'), 2); }
};

// ── 4 · la mesita del rincón: bloques, risas y amistad
const rinFondo = () => {
  for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) R.pset(x, y, h(x >> 2, y >> 1, 3) > 0.86 ? P('#bcc8a8') : h(x, y, 4) > 0.97 ? P('#a8b494') : P('#c8d4b4'));
  for (let x = 0; x < 320; x++) for (let y = 28; y < 34; y++) R.pset(x, y, (Math.abs(((x % 12) - 6)) + Math.abs(y - 31) < 3) ? P('#8a5a3a') : P('#c8d4b4'));
  madera(0, 96, 319, 150, ['#7a4a2a', '#9a6438', '#5a321c', '#3a2010'], { alto: 18, hz: false, k: 15 }); R.rect(0, 96, 319, 98, P('#a87444'));
  parquet(0, 151, 319, 179, ['#8a5a32', '#a06a3a', '#74482a', '#4a2a18']);
  // la estantería con libros, la radio y un tablero de ajedrez
  madera(6, 36, 84, 150, ['#5a3a22', '#74502e', '#422a18', '#2a1a0e'], { alto: 38, k: 16 });
  for (let r = 0; r < 3; r++) { const y0 = 40 + r * 37; zona(10, y0, 80, y0 + 32, K, 0.4); if (r === 1) continue; let x = 11; while (x < 78) { const w = 3 + Math.floor(h(x, r) * 4), hh = 18 + Math.floor(h(x, r, 2) * 12), col = [P('#7a2a2a'), P('#2a4a6a'), P('#5a6a3a'), P('#8a6a3a'), P('#4a3a5a')][Math.floor(h(x, r, 3) * 5)];
      R.rect(x, y0 + 32 - hh, x + w - 1, y0 + 32, col); R.rect(x, y0 + 34 - hh, x + w - 1, y0 + 34 - hh, P('#e8c060')); x += w; } }
  caja(14, 82, 58, 109, P('#6a3a1e')); R.rect(16, 84, 34, 107, P('#c8b488')); for (let y = 86; y < 106; y += 2) R.linea(16, y, 34, y, P('#a8946a')); caja(38, 86, 56, 96, P('#2a1a10'));
  R.disco(44, 103, 2, P('#c8a040')); R.disco(52, 103, 2, P('#c8a040'));
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) R.rect(62 + i * 4, 98 + j * 3, 65 + i * 4, 100 + j * 3, (i + j) % 2 ? P('#2a1a10') : P('#e8d8b0'));
  // el cuadro del velero
  caja(110, 40, 170, 80, P('#c8a040'), P('#5a3a1a')); R.rect(114, 44, 166, 76, P('#8ab0d8')); R.rect(114, 66, 166, 76, P('#3a6a9a'));
  R.poligono([[138, 48], [138, 66], [126, 66]], P('#f4f4ee')); R.poligono([[140, 52], [140, 66], [152, 66]], P('#e8e4dc')); R.rect(128, 66, 152, 68, P('#7a3a2a'));
  // la ventana de la derecha: marco, cortinas recogidas
  caja(224, 28, 274, 114, P('#e8e4dc'), P('#8a8478')); R.rect(220, 112, 278, 116, P('#f2f0ec'));
  for (const [x0, x1] of [[210, 226], [272, 288]]) for (let y = 24; y < 140; y++) { const w = y > 80 && y < 96 ? 0.5 : 1; for (let x = x0; x <= x1; x++) { const cx = (x0 + x1) / 2; if (Math.abs(x - cx) > (x1 - x0) / 2 * w + 1) continue; R.pset(x, y, (x - x0) % 5 === 0 ? P('#4a5a3a') : P('#6a7a4a')); } }
  // los respaldos de las sillas
  for (const x0 of [97, 210]) { R.rect(x0, 118, x0 + 20, 121, P('#4a2a18')); R.rect(x0 + 1, 118, x0 + 19, 119, P('#7a4a2a')); for (const i of [0, 6, 13, 19]) R.rect(x0 + i, 121, x0 + i + 1, 150, P('#5a321c')); }
};
const mesita = () => {
  for (let y = 149; y <= 161; y++) for (let x = 88; x <= 236; x++) { const d = ((x - 162) / 74) ** 2 + ((y - 155) / 6) ** 2; if (d > 1) continue; R.pset(x, y, d > 0.86 ? P('#3a2010') : y < 153 ? P('#9a6438') : h(x >> 2, y, 3) > 0.8 ? P('#74442a') : P('#8a5430')); }
  // el mantel de ganchillo que cuelga y el pie
  for (let y = 159; y <= 172; y++) for (let x = 92; x <= 232; x++) { const fin = 169 + Math.round(Math.sin(x * 0.5) * 2); if (y > fin) continue; R.pset(x, y, (Math.abs(Math.sin(x * 0.7)) < 0.3 || y === fin) ? P('#f4f0e4') : (y + x) % 4 === 0 ? P('#d8d0c0') : P('#ece6d6')); }
  R.rect(156, 172, 168, 179, P('#5a321c')); R.rect(156, 172, 158, 179, P('#7a4a2a'));
};
const BLOQ = [[138, 154, 13.15], [195, 154, 13.75], [157, 154, 14.4], [166, 136, 15.0], [176, 154, 15.55]];   // la 4.ª es la de arriba   // [x, base, s desde el inicio de la escena]
const p4 = (t) => {
  capa('rincon', rinFondo);
  const hora = 0.55 + 0.45 * tramo(t, P4 + 0.5, HOY), lamp = t > DURA + 0.15;
  vista(226, 30, 272, 112, t, hora, { cupula: 0.5, copos: 22 }); R.rect(248, 30, 249, 112, P('#e8e4dc')); R.rect(226, 66, 272, 67, P('#e8e4dc'));
  // la radio con el dial que brilla, y la luz de la lámpara cuando se enciende
  R.rect(39, 87, 55, 95, Math.floor(t * 2) % 2 ? P('#f0c060') : P('#e0a040')); R.pset(41 + Math.round((Math.sin(t * 0.7) + 1) * 6), 90, P('#c8302a'));
  if (lamp) { const f = tramo(t, DURA + 0.15, DURA + 0.4); for (let y = 60; y < 180; y++) for (let x = 120; x < 320; x++) { const d = Math.hypot(x - 222, (y - 118) * 1.3); if (d < 90) tinte(x, y, P('#ffd890'), 0.22 * f * (1 - d / 90)); } }
  else zona(0, 0, 319, 179, P('#1a2040'), 0.18 * tramo(t, P4 + 2.5, DURA));
  // la fila de abajo se completa en «friendship», brilla y desaparece; el bloque de arriba cae a su sitio
  const limpia = tramo(t, AMISTAD, AMISTAD + 0.35), cae = tramo(t, AMISTAD + 0.4, AMISTAD + 0.6);
  const quien = (k) => (k % 2 === 0 ? 'R' : 'P');
  const pieza = [];
  BLOQ.forEach(([x, b, tk], k) => { const tt = P4 + (tk - 13.0); if (t < tt - 0.4) return; const deja = tramo(t, tt - 0.4, tt);
    if (b === 154 && limpia >= 1) return; pieza.push({ x, b: b === 136 && limpia >= 1 ? Math.round(lerp(136, 154, cae * cae)) : b, deja, k, tt, fila: b === 154 }); });
  // los dos, sentados: Rogers a la izquierda, Pázhitnov a la derecha (se dibujan, luego la mesa, y luego otra vez de cintura para arriba)
  const turno = (k0) => { const p = pieza.find((q) => q.k % 2 === k0 && q.deja < 1); return p ? [lerp(k0 ? 202 : 125, p.x, p.deja * 0.5), 147] : null; };
  const risa = (t > PROGRAMADORES && t < PROGRAMADORES + 1.0) || (t > AMISTAD + 0.2 && t < AMISTAD + 1.1);
  const brinda = t > HOY - 0.3;
  const actores = () => { const a = R.actor(TS.rogersAbrigo, 100, 156, t, { dir: 1, sonrisa: true, habla: risa && Math.sin(t * 12) > 0, salto: risa && Math.sin(t * 9) > 0.3 ? 1 : 0, sostiene: brinda ? [124, 142] : turno(0) ?? false });
    const b = R.actor(TS.pazhitnov, 212, 156, t, { dir: -1, sonrisa: true, habla: (risa && Math.sin(t * 12 + 1) > 0) || (t > P4 + 0.2 && t < PROGRAMADORES - 0.3 && Math.sin(t * 7) > 0.2), salto: risa && Math.sin(t * 9 + 1.5) > 0.3 ? 1 : 0, sostiene: brinda ? [203, 142] : turno(1) ?? false });
    return [a, b]; };
  lampara(t, lamp); actores(); mesita(); R.recorte([0, 0, 319, 151]); const [a, b] = actores(); R.recorte(null);
  if (brinda) { te(a.mano[0] + 3, a.mano[1] + 4, t, false); te(b.mano[0] - 3, b.mano[1] + 4, t, false); }
  for (const q of pieza) { if (q.deja < 1) { const m = q.k % 2 === 0 ? a.mano : b.mano; PZ.bloques(R, Math.round(lerp(m[0] + (q.k % 2 ? -4 : 4), q.x, q.deja * q.deja)), Math.round(lerp(m[1] + 6, q.b, q.deja * q.deja)), { n: 1, s: 2 }); continue; }
    if (q.fila && limpia > 0 && Math.floor(t * 14) % 2) { R.rect(q.x - 9, q.b - 18, q.x + 8, q.b - 1, P('#fff4c0')); continue; }
    PZ.bloques(R, q.x, q.b, { n: 1, s: 2 }); if (t - q.tt < 0.3) destello(q.x, q.b - 19, (t - q.tt) / 0.3); }
  if (limpia > 0 && limpia < 1) for (const x of [138, 157, 176, 195]) destello(x, 144, limpia);
};
// la lámpara de pie, detrás de la silla de Pázhitnov (se enciende al caer la noche)
const lampara = (t, on) => { R.rect(247, 98, 248, 150, P('#8a6a3a')); R.rect(240, 149, 255, 151, P('#5a3a1a'));
  R.poligono([[236, 98], [240, 84], [256, 84], [260, 98]], on ? P('#ffe6a8') : P('#c8a878')); R.linea(236, 98, 260, 98, P('#8a6a3a')); R.linea(240, 84, 256, 84, P('#8a6a3a'));
  for (let x = 239; x < 258; x += 4) R.linea(x, 86, x - 1, 97, on ? P('#f0c880') : P('#b0946a'));
  if (on) for (let y = 70; y < 130; y++) for (let x = 216; x < 282; x++) { const d = Math.hypot(x - 248, (y - 92) * 1.2); if (d < 32 && d > 10) tinte(x, y, P('#fff0c0'), 0.28 * (1 - d / 32)); } };

const efectos = [[1.05, 'puerta'], [3.05, 'puerta'], [VENDIDO, 'tic'], [PAGAR, 'papel'], [VISITAS, 'puerta'], [CONOCE, 'palmada'], [P4 + 0.15, 'toc'], [P4 + 1.4, 'toc'], [AMISTAD, 'brillo'], [DURA + 0.15, 'interruptor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1989 });
''')
