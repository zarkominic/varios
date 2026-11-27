import re

# Las marcas de la voz inglesa (inicio y fin de cada frase, en s desde el principio de la escena): los instantes se
# escriben como @T(segundos) y se convierten en en('marca', fracción) de la frase que toca.
FRASES = {
    'gb-1963': [('prospeccion', 1.5, 34.625), ('campesinos', 35.025, 65.089)],
    'gb-schmidt': [('schmidt', 1.5, 29.773)],
}


def marcas(id_, cuerpo):
    fr = FRASES[id_]

    def una(m):
        s = float(m.group(1))
        k, a, b = fr[0]
        for (k2, a2, b2) in fr:
            if s >= a2 - 0.45:
                k, a, b = k2, a2, b2
        return "en('%s', %.4f)" % (k, (s - a) / (b - a))
    return re.sub(r'@T\(([0-9.]+)\)', una, cuerpo)


# Lo que comparten las dos escenas: tramas, cielos, nubes de tres tonos, tierra arada, losas de caliza, matas.
AUX = r'''
const K = T.C.k, H = (s) => hex(s), ri = Math.round;
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], di = (x, y) => (BY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const rampa = (ram, v, x, y) => { const n = ram.length - 1; v = Math.max(0, Math.min(n, v)); const i = Math.floor(v); return ram[Math.min(n, (v - i) > di(x, y) ? i + 1 : i)]; };
const RAM = (...a) => a.map(H);
// lo fijo de cada plano va en su búfer (se pinta una vez); capaB lo devuelve sin copiarlo
const CAPAS = new Map();
const capaB = (clave, fn) => { let b = CAPAS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); fn(); R.usar(prev); R.recorte(null); CAPAS.set(clave, b); } return b; };
const capa = (clave, fn) => R.copiar(capaB(clave, fn));
const tiñe = (x0, y0, x1, y1, c, a) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) R.pset(x, y, mez(R.pget(x, y), c, a)); };
const trama = (x0, y0, x1, y1, c, a, k = 0) => { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (hh(x, y, k) < a) R.pset(x, y, c); };
// cielo tramado por bandas (ram de arriba abajo) hasta hor, con el sol (x, y, r) y su halo
const cieloT = (hor, ram, sol, cs) => {
  for (let y = 0; y < hor; y++) for (let x = 0; x < 320; x++) {
    let v = (y / hor) * (ram.length - 1) + (hh(x >> 3, y >> 2, 3) - 0.5) * 0.3;
    if (sol) { const d = Math.hypot(x - sol[0], (y - sol[1]) * 1.2); if (d < sol[2] * 4) v += (1 - d / (sol[2] * 4)) * 1.6; }
    R.pset(x, y, rampa(ram, v, x, y));
  }
  if (sol) { const [sx, sy, sr] = sol; R.disco(sx, sy, sr + 2, cs[0]); R.disco(sx, sy, sr, cs[1]); R.disco(sx - 2, sy - 2, Math.max(1, sr - 4), cs[2] ?? cs[1]); }
};
// una nube de tres tonos: sombra abajo, cuerpo y luz arriba; base plana
const nube3 = (x, y, w, c3) => {
  const [cl, cm, cs] = c3, n = Math.max(2, Math.round(w / 8));
  for (let k = 0; k < n; k++) { const u = n === 1 ? 0.5 : k / (n - 1), cx = ri(x + (k + 0.5) * w / n), r = ri(2 + (1 - Math.abs(u - 0.5) * 1.6) * w / 7 + hh(k, w) * 2);
    R.disco(cx, ri(y + 1), r, cs); }
  for (let k = 0; k < n; k++) { const u = n === 1 ? 0.5 : k / (n - 1), cx = ri(x + (k + 0.5) * w / n), r = ri(1 + (1 - Math.abs(u - 0.5) * 1.6) * w / 7 + hh(k, w) * 2);
    R.disco(cx, ri(y - 1), r, cm); R.disco(cx - 1, ri(y - 3), Math.max(1, r - 2), cl); }
  for (let xx = ri(x); xx < ri(x + w); xx++) { R.pset(xx, ri(y + 3), cs); R.pset(xx, ri(y + 4), cs); }
};
// nubes que cruzan a su velocidad (lista: [x0, y, ancho, v px/s]), solo sobre el cielo (hasta hor)
const nubes = (t, hor, c3, lista) => { R.recorte([0, 0, 319, hor - 1]); for (const [x0, y, w, v] of lista) nube3(((x0 + t * v) % (340 + w)) - w, y, w, c3); R.recorte(null); };
// tierra arada vista de cerca: surcos en perspectiva entre y0 e y1 (más estrechos arriba)
const arada = (y0, y1, ram, N = 12, sem = 0, x0 = 0, x1 = 319) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0);
  for (let x = x0; x <= x1; x++) { const ph = Math.pow(u, 0.75) * N + Math.sin(x * 0.045 + sem) * 0.1 + (hh(x >> 1, y, sem) - 0.5) * 0.14, f = ph - Math.floor(ph);
    let v = f < 0.45 ? 3.3 - f * 1.6 : f < 0.72 ? 2.1 : 0.9 + (f - 0.72) * 3.5; v += (hh(x, y, sem + 1) - 0.5) * 0.9 - (1 - u) * 0.5;
    R.pset(x, y, rampa(ram, v, x, y)); } } };
// terrones, guijarros y lascas de sílex sueltos (más grandes abajo)
const guijarros = (x0, y0, x1, y1, n, sem, pal) => { for (let k = 0; k < n; k++) {
  const x = ri(x0 + hh(k, 1, sem) * (x1 - x0)), y = ri(y0 + hh(k, 2, sem) * (y1 - y0)), u = (y - y0) / Math.max(1, y1 - y0), r = Math.max(1, ri((0.6 + u * 1.8) * (0.5 + hh(k, 3, sem)))), c = pal[k % pal.length];
  for (let j = -r; j <= 0; j++) for (let i = -r * 2; i <= r * 2; i++) { if ((i / (r * 2)) ** 2 + (j / Math.max(1, r)) ** 2 > 1) continue; R.pset(x + i, y + j, j === -r || (i < 0 && j < -r / 2) ? c[2] : c[1]); }
  for (let i = -r * 2 + 1; i <= r * 2 - 1; i++) R.pset(x + i, y + 1, c[0]);
  if (c[3] && hh(k, 4, sem) > 0.5) R.pset(x - r, y - r, c[3]);
} };
const P_TIERRA = [RAM('#5a3020', '#9a5634', '#c07a52'), RAM('#6a6a70', '#8e8c90', '#c0bcb8'), RAM('#3a3a44', '#5a5a66', '#9a9aa8', '#ffffff'), RAM('#7a6a50', '#b4a07e', '#e0d4b8')];
// matas de hierba seca y cardos que se mecen
const mata = (x, y, t, h = 6, c = RAM('#7a7a34', '#a8a044', '#d4c46a')) => { for (let k = -2; k <= 2; k++) { const sw = Math.sin(t * 2.2 + x * 0.3 + k) * h / 7; R.linea(x + k, y, ri(x + k * 1.5 + sw), y - h + Math.abs(k), c[(k + 4) % 3]); } };
const cardo = (x, y, t, h = 9) => { const sw = ri(Math.sin(t * 1.8 + x) * 1.2); R.linea(x, y, x + sw, y - h, H('#6a7a4a')); R.linea(x - 2, y - 3, x, y - 5, H('#6a7a4a')); R.linea(x + 2, y - 4, x, y - 6, H('#7a8a5a'));
  R.disco(x + sw, y - h - 1, 2, H('#7a4a8a')); R.pset(x + sw, y - h - 2, H('#b07ac0')); R.pset(x + sw - 1, y - h + 1, H('#5a7a3a')); R.pset(x + sw + 1, y - h + 1, H('#5a7a3a')); };
// UNA LOSA DE CALIZA ROTA: pts = contorno de la cara de arriba; e = grueso de la cara de delante (más oscura, con
// estratos); textura de vetas, poros y líquenes; el filo de arriba con luz; grietas [[x0, y0, x1, y1], …]
const MK1 = H('#fe01fd'), MK2 = H('#fd02fc');
const CALR = RAM('#5e503a', '#86745a', '#ad9a7a', '#cdbd9c', '#e4d8bc', '#f4ecd8');
const losa = (pts, e, sem, o = {}) => {
  const ram = o.ram ?? CALR, xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const X0 = Math.max(0, Math.floor(Math.min(...xs)) - 1), X1 = Math.min(319, Math.ceil(Math.max(...xs)) + 1), Y0 = Math.max(0, Math.floor(Math.min(...ys)) - 1), Y1 = Math.min(179, Math.ceil(Math.max(...ys)) + e + 1);
  if (o.sombra !== false) { const sh = o.cs ?? H('#4a2a1a'); const sp = pts.map(([x, y]) => [x + (o.sx ?? 3), y + e + (o.sy ?? 2)]); for (let yy = Y0; yy <= Math.min(179, Y1 + 4); yy++) for (let xx = X0; xx <= Math.min(319, X1 + 4); xx++) if (dentro(sp, xx + 0.5, yy + 0.5)) R.pset(xx, yy, mez(R.pget(xx, yy), sh, 0.45)); }
  R.poligono(pts.map(([x, y]) => [x, y + e]), MK2); for (let k = 1; k < e; k++) R.poligono(pts.map(([x, y]) => [x, y + k]), MK2);
  R.poligono(pts, MK1);
  const W = X1 - X0 + 1, Hh = Y1 - Y0 + 1, m = new Uint8Array(W * Hh);
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const c = R.pget(x, y); m[(y - Y0) * W + x - X0] = c === MK1 ? 1 : c === MK2 ? 2 : 0; }
  const g = (x, y) => (x < X0 || x > X1 || y < Y0 || y > Y1) ? 0 : m[(y - Y0) * W + x - X0];
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const k = g(x, y); if (!k) continue;
    if (!g(x - 1, y) || !g(x + 1, y) || !g(x, y + 1) || (k === 1 && !g(x, y - 1) && false)) { R.pset(x, y, o.borde ?? ram[0]); continue; }
    if (k === 2) { let v = 1.6 + (hh(x, y, sem) - 0.5) * 0.9 + (((y - Y0) % 3) === 0 ? -0.6 : 0) + (g(x, y - 1) === 1 ? 1.2 : 0) + (o.luz ?? 0) * 0.5; R.pset(x, y, rampa(ram, v, x, y)); continue; }
    let v = 3.2 + 0.4 * Math.sin(x * 0.27 + 2.2 * Math.sin(y * 0.19 + sem)) + (hh(x, y, sem) - 0.5) * 0.8 - (x - X0) / W * 0.5 + (o.luz ?? 0);
    if (!g(x, y - 1)) { R.pset(x, y, o.filo ?? ram[ram.length - 1]); continue; } if (!g(x - 1, y - 1) || !g(x, y - 2)) v += 1;
    const q = hh(x, y, sem + 7); if (q < 0.035) v -= 1.6; else if (q > 0.985) v += 0.8;
    const lq = hh(x >> 1, y >> 1, sem + 3);
    if (o.liquen !== false && lq < 0.045) { R.pset(x, y, lq < 0.02 ? H('#c8a040') : H('#8a9a6a')); continue; }
    R.pset(x, y, rampa(ram, v, x, y));
  }
  for (const [a, b, c, d] of o.grietas ?? []) { R.linea(a, b, c, d, ram[0]); R.linea(a + 1, b + 1, c + 1, d + 1, ram[Math.min(ram.length - 1, 4)]); }
};
const dentro = (pts, x, y) => { let s = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) s = !s; } return s; };
// un personaje de rodillas (ante una losa): se recorta por encima del suelo y se le ponen las rodillas y la bota
const deRodillas = (def, x, suelo, t, o = {}) => {
  R.recorte([0, 0, 319, suelo - 4]); const r = R.actor(def, x, suelo + 5, t, o); R.recorte(null);
  const d = o.dir ?? 1, pan = o.pantalon ?? H('#5a4c36'), panS = mez(pan, K, 0.35), xr = d > 0 ? x + 9 : x + 1;
  for (let j = suelo - 4; j <= suelo - 1; j++) for (let i = 0; i < 6; i++) R.pset(xr + i, j, j === suelo - 4 || i === 0 || i === 5 ? K : j === suelo - 1 ? panS : pan);
  const xb = d > 0 ? x + 1 : x + 9; for (let i = 0; i < 6; i++) { R.pset(xb + i, suelo - 2, K); R.pset(xb + i, suelo - 1, i === 0 || i === 5 ? K : H('#3a2a1c')); R.pset(xb + i, suelo, K); }
  return r;
};
// lo que pinta fn dentro del recuadro, teñido de c (a contraluz): solo sus píxeles, no el recuadro
const silueta = (x0, y0, x1, y1, fn, c, a) => { x0 = Math.max(0, x0); y0 = Math.max(0, y0); x1 = Math.min(319, x1); y1 = Math.min(179, y1); const sv = [];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { sv.push(R.pget(x, y)); R.pset(x, y, MK1); }
  const r = fn(); let i = 0; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++, i++) { const p = R.pget(x, y); R.pset(x, y, p === MK1 ? sv[i] : mez(p, c, a)); } return r; };
// un moral pequeño a lo lejos (se pinta después de las nubes, para que no pasen por delante): tronco en (x, base)
const moral = (x, base, s, t, c = RAM('#24401e', '#34562a', '#4a7038', '#62883e'), tr = H('#4a3424')) => { R.rect(x - 1, base - ri(9 * s), x, base, tr);
  for (const [dx, dy, r, k] of [[-5, -10, 5, 0], [5, -10, 5, 0], [0, -14, 6, 1], [-3, -16, 4, 2], [3, -12, 3, 3], [-6, -12, 2, 2]]) R.disco(ri(x + dx * s), ri(base + dy * s), Math.max(1, ri(r * s)), c[k]);
  for (let k = 0; k < 4; k++) R.pset(ri(x + (k - 1.5) * 3 * s + Math.sin(t * 2 + k)), ri(base - 15 * s + (k % 2) * 2), c[3]); };
// el mango y la cabeza de una herramienta desde la mano (mx, my) hacia (ax, ay)
const herramienta = (mx, my, ax, ay, cab) => { R.linea(mx, my + 1, ax, ay + 1, K); R.linea(mx, my, ax, ay, H('#a87a48')); R.linea(mx + 1, my, ax + 1, ay, H('#7a5430')); if (cab) cab(ax, ay); };
'''

E = {}

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['gb-1963'] = ('La colina de las losas rotas', '''// GB-1963 (frases 5–6), 1963 → 1993, cartela «1963». Doce planos:
// 1. el campamento al pie del cerro (tienda): el prospector sale de la tienda con su taza, la prospectora llega del jeep
//    y señala el cerro, el chófer revisa una rueda;  2. el mapa de la meseta de Şanlıurfa sobre la mesa: una mano clava
//    la banderita de Turquía («Istanbul») y la de EE. UU. («Chicago») y el lápiz traza la ruta por los campos;
// 3. el cerro de 1963 de lejos: el equipo cruza la llanura; ella señala un montículo, recoge una lasca de sílex y él
//    señala la loma: «?» sobre el cerro;  4. en lo alto, junto al moral: llegan, ella señala el árbol, él ve las losas;
// 5. la losa rota de cerca entre los surcos: la mano con la brocha le quita la tierra («poking out»);  6. el cuaderno:
//    el lápiz dibuja tres lápidas («gravestones») y una marca;  7. el cuaderno cerrado entra en la estantería del archivo
//    («move on») y pasan los años: el sol cruza una y otra vez, el polvo, la araña y su tela;  8. el cerro en otoño, años
//    después: el tractor ara alrededor de las piedras, un campesino aparta una losa a empujones;  9. GAG: Atom empuja una
//    losa y el que resbala es él; el campesino la parte con la maza («breaking») y siembra;  10. el pueblo y el cerro
//    redondo detrás: el niño lo señala («Göbekli Tepe»), el abuelo lo explica y Atom se da palmadas en la barriga
//    («Potbelly»);  11. de noche, la tierra entre las losas respira una luz cálida («holding something inside»);
// 12. al alba, una lagartija sobre una losa; la sombra larga de alguien con sombrero llega («someone») y la lagartija huye.''', AUX + r'''
const GB = T.GB;
const P2 = @T(4.92), P3 = @T(10.9), P4 = @T(16.22), P5 = @T(22.02), P6 = @T(26.54), P7 = @T(31.36), P8 = @T(38.27), P9 = @T(43.58), P10 = @T(49.28), P11 = @T(55.58), P12 = @T(61.3);
const MANGA = '#9a8a5c';
// ── 1 · el campamento ──
const p1 = (t) => {
  T.arqueologos(R, t, { encuadre: 'tienda' });
  const u = tramo(t, 0.5, 2.3), x = ri(lerp(58, 100, u));
  if (u <= 0) { R.recorte([54, 108, 74, 150]); R.actor(GB.prospectorGB, 58, 150, t, { dir: 1, quieto: true }); R.recorte(null); }
  else { const r = R.actor(GB.prospectorGB, x, 150, t, { dir: 1, anda: u < 1, sostiene: u >= 1 ? [x + 16, 134] : false, sonrisa: t > @T(2.42) });
    if (u >= 1) { const [hx, hy] = r.mano; R.rect(hx - 1, hy - 5, hx + 2, hy - 1, K); R.rect(hx, hy - 4, hx + 1, hy - 2, H('#e8e4dc')); if (Math.sin(t * 5) > 0) R.pset(hx + 1, hy - 7, H('#e8e8e8')); R.pset(hx, hy - 9 + ri(Math.sin(t * 3)), H('#d8d8d8')); } }
  // la prospectora llega del jeep y señala el cerro al decir el año
  const v = tramo(t, 0.2, 2.2), xa = ri(lerp(248, 204, v));
  R.actor(GB.prospectora2GB, xa, 151, t, { dir: v < 1 ? -1 : 1, anda: v > 0 && v < 1, dedo: t > @T(2.6) && t < @T(4.2), habla: t > @T(2.9) && t < @T(3.8) && Math.sin(t * 9) > 0 });
  // el chófer revisa la rueda del jeep (se agacha y se levanta)
  const ag = Math.sin(t * 1.6) > 0.2; if (ag) deRodillas(GB.prospectorGB, 282, 152, t, { dir: -1, pal: { C: '#7a8a5a', c: '#5a6a40' }, tocado: 'gorraPlana', sostiene: [281, 141] });
  else R.actor(GB.prospectorGB, 282, 152, t, { dir: -1, pal: { C: '#7a8a5a', c: '#5a6a40' }, tocado: 'gorraPlana' });
  T.arqueologosDelante(R, t, { encuadre: 'tienda' });
};
// ── 2 · el mapa de la meseta: las banderitas de las dos universidades y la ruta ──
const bandera = (x, y, tipo, s = 1) => {
  R.linea(x, y, x, y - 12, K); R.linea(x + 1, y, x + 1, y - 12, H('#c8c8cc')); R.disco(x, y - 13, 1, H('#e8c040'));
  const fx = x + 2, fy = y - 12, w = 10, h = 7; R.rect(fx - 1, fy - 1, fx + w, fy + h, K);
  if (tipo === 'tr') { R.rect(fx, fy, fx + w - 1, fy + h - 1, H('#d8302a')); R.disco(fx + 4, fy + 3, 2, H('#f4f4f0')); R.disco(fx + 5, fy + 3, 2, H('#d8302a')); R.pset(fx + 4, fy + 3, H('#d8302a')); R.pset(fx + 7, fy + 3, H('#f4f4f0')); R.pset(fx + 7, fy + 2, H('#f4f4f0')); R.pset(fx + 7, fy + 4, H('#f4f4f0')); R.pset(fx + 6, fy + 3, H('#f4f4f0')); R.pset(fx + 8, fy + 3, H('#f4f4f0')); }
  else { for (let j = 0; j < h; j++) R.rect(fx, fy + j, fx + w - 1, fy + j, j % 2 ? H('#f4f4f0') : H('#c8302a')); R.rect(fx, fy, fx + 4, fy + 3, H('#2a3a8a')); R.pset(fx + 1, fy + 1, H('#f4f4f0')); R.pset(fx + 3, fy + 2, H('#f4f4f0')); }
  R.rect(fx, fy + h, fx + w, fy + h, mez(H('#000000'), H('#000000'), 0));
};
const RUTA = [[100, 112], [108, 120], [122, 124], [138, 118], [150, 108], [142, 100], [130, 98], [124, 96]];
const p2 = (t) => {
  T.hoy(R, t, { encuadre: 'karahan', camara: 'mapa', encendidas: 0 });
  const ist = @T(6.74), chi = @T(7.5), ruta0 = @T(8.46), ruta1 = @T(10.5);
  // la ruta por los campos, que se va dibujando a lápiz con sus huellas, y las crucecitas de los montículos
  const ur = tramo(t, ruta0, ruta1), n = (RUTA.length - 1) * ur;
  for (let i = 0; i < RUTA.length - 1; i++) { if (i >= n) break; const f = Math.min(1, n - i), [a, b] = RUTA[i], [c, d] = RUTA[i + 1], L = Math.hypot(c - a, d - b);
    for (let s2 = 0; s2 <= L * f; s2 += 4) { const x = ri(a + (c - a) * s2 / L), y = ri(b + (d - b) * s2 / L), lado = (Math.floor(s2 / 4) % 2) ? 1 : -1; R.rect(x - 1, y + lado - 1, x, y + lado, H('#2a2a36')); } }
  if (n > 0 && n < RUTA.length - 1) { const i = Math.floor(n), f = n - i, [a, b] = RUTA[i], [c, d] = RUTA[i + 1]; const x = ri(a + (c - a) * f), y = ri(b + (d - b) * f); R.disco(x, y, 3, K); R.disco(x, y, 2, H('#e8402e')); }
  for (const [k, [mx, my]] of [[2, [124, 130]], [4, [158, 110]], [6, [136, 90]]]) if (n > k) { R.linea(mx - 3, my - 3, mx + 3, my + 3, H('#c8302a')); R.linea(mx - 3, my + 3, mx + 3, my - 3, H('#c8302a')); R.linea(mx - 2, my - 3, mx + 4, my + 3, H('#c8302a')); }
  // las dos banderitas del equipo (Estambul y Chicago), clavadas abajo en el mapa
  const b1 = tramo(t, ist - 0.45, ist), b2 = tramo(t, chi - 0.45, chi);
  if (b1 > 0) bandera(84, ri(lerp(178, 152, b1)), 'tr');
  if (b2 > 0) bandera(100, ri(lerp(178, 152, b2)), 'us');
  // la mano que las clava: entra por abajo, clava una, vuelve a por la otra y se va
  let wx = null, wy = 0;
  if (t > P2 + 0.2 && t < ist + 0.35) { const e = tramo(t, P2 + 0.2, ist - 0.45); wx = lerp(70, 86, e); wy = lerp(200, 166, e) - 14 * b1; }
  else if (t >= ist + 0.35 && t < chi + 0.6) { const e = tramo(t, ist + 0.35, chi - 0.45), s3 = tramo(t, chi, chi + 0.6); wx = lerp(86, 102, e); wy = lerp(152, 166, e) - 14 * b2 + s3 * 40; }
  if (wx !== null) T.brazo(R, ri(wx) + 26, 198, ri(wx) + 2, ri(wy) + 4, MANGA, -1, {});
};
// ── 3 · el cerro de 1963 de lejos: el equipo cruza la llanura ──
const p3 = (t) => {
  T.colina(R, t, { epoca: 1963 });
  const mound = @T(11.68), chip = @T(12.76), rise = @T(14.12), hide = @T(15.44);
  const u = tramo(t, P3, @T(15.8)), xa = ri(lerp(96, 176, u)), xb = ri(lerp(118, 214, tramo(t, P3, chip - 0.3)));
  // ella delante: señala el montículo, se agacha a por la lasca y la levanta a la luz
  const coge = t > chip - 0.3 && t < chip + 0.5, ensena = t >= chip + 0.5 && t < rise + 0.6;
  let rb;
  if (coge) rb = deRodillas(GB.prospectora2GB, xb, 150, t, { dir: 1, sostiene: [xb + 17, 147], pantalon: H('#8a7a54') });
  else rb = R.actor(GB.prospectora2GB, xb, 150, t, { dir: 1, anda: t < chip - 0.3, dedo: t > mound - 0.1 && t < mound + 0.8, sostiene: ensena ? [xb + 15, 128] : false, sonrisa: ensena });
  if (ensena || coge) { const [hx, hy] = rb.mano; R.poligono([[hx - 1, hy - 4], [hx + 3, hy - 6], [hx + 4, hy - 2], [hx, hy - 1]], H('#4a4a58')); R.pset(hx + 2, hy - 5, H('#c8c8d8')); if (ensena && Math.sin(t * 8) > 0.3) { R.pset(hx + 5, hy - 8, H('#ffffff')); R.pset(hx + 6, hy - 9, H('#fff4c8')); } }
  // él detrás con el cuaderno, que señala la loma
  const ra = R.actor(GB.prospectorGB, xa, 151, t, { dir: 1, anda: u > 0 && u < 1 && !(t > rise && t < rise + 1.2), dedo: t > rise && t < rise + 1.2, sostiene: t > rise && t < rise + 1.2 ? false : [xa + 15, 138] });
  if (!(t > rise && t < rise + 1.2)) { const [hx, hy] = ra.mano; R.rect(hx - 1, hy - 6, hx + 4, hy + 1, K); R.rect(hx, hy - 5, hx + 3, hy, H('#3a5a3a')); }
  // el chófer espera junto al jeep y bebe de la cantimplora
  R.actor(GB.prospectorGB, 84, 151, t, { dir: 1, pal: { C: '#7a8a5a', c: '#5a6a40' }, tocado: 'gorraPlana', sostiene: Math.sin(t * 0.9) > 0.3 ? [96, 132] : false });
  // la loma que «parece esconder algo»: la interrogación sobre la cima
  const q = tramo(t, hide - 0.2, hide + 0.2); if (q > 0) R.icono('?', 196, ri(lerp(56, 46, q)), H('#fff4c8'), K, 2);
  T.colinaDelante(R, t, {});
};
// ── 4 · en lo alto, junto al moral ──
const p4 = (t) => {
  T.colina(R, t, { camara: 'losas', epoca: 1963 });
  const hill = @T(19.12), tree = @T(20.18), top = @T(21.26);
  const ua = tramo(t, P4 + 0.2, top), xa = ri(lerp(306, 206, ua)), ub = tramo(t, P4 + 0.3, hill + 0.4), xb = ri(lerp(322, 244, ub));
  R.actor(GB.prospectora2GB, xb, 152, t, { dir: -1, anda: ub > 0 && ub < 1, dedo: t > tree - 0.2 && t < tree + 1.1, habla: t > tree && t < tree + 0.8 && Math.sin(t * 9) > 0 });
  const mira = t > top + 0.1; R.actor(GB.prospectorGB, xa, 150, t, { dir: -1, anda: ua > 0 && ua < 1, sorpresa: mira, sostiene: [xa - 2, 138] });
  if (mira) { R.pset(xa + 2, 116, K); R.pset(xa + 1, 114, K); }
  T.colinaDelante(R, t, { camara: 'losas' });
};
// ── 5 · la losa rota de cerca, entre los surcos ──
const TIERRA = RAM('#3e2216', '#6a3a22', '#8e5032', '#b06a44', '#cc8a5e');
const LOSA_A = [[70, 72], [148, 58], [222, 66], [252, 94], [238, 126], [166, 138], [96, 132], [64, 104]];
const p5 = (t) => {
  capa('c5', () => {
    arada(0, 179, TIERRA, 7, 2);
    guijarros(0, 0, 319, 179, 70, 5, P_TIERRA);
    for (let k = 0; k < 60; k++) { const x = ri(hh(k, 7) * 320), y = ri(hh(k, 8) * 180), a = hh(k, 9) * 3; R.linea(x, y, ri(x + Math.cos(a) * 6), ri(y + Math.sin(a) * 3), H(k % 2 ? '#d8c070' : '#b09850')); }
    losa([[8, 140], [46, 130], [66, 146], [50, 162], [14, 160]], 5, 3, { grietas: [[30, 136, 40, 156]] });
    losa([[256, 108], [292, 100], [312, 118], [292, 132], [262, 128]], 5, 8, {});
    losa(LOSA_A, 9, 1, { grietas: [[150, 60, 140, 92], [140, 92, 160, 120], [200, 70, 214, 100]] });
  });
  // la tierra que tapa el borde de la losa: la brocha la va quitando de izquierda a derecha
  const b0 = @T(23.3), b1 = @T(25.9), ub = tramo(t, b0, b1);
  for (let k = 0; k < 26; k++) { const x = 160 + hh(k, 1, 4) * 90, y = 112 + hh(k, 2, 4) * 26, r = 3 + ri(hh(k, 3, 4) * 5); if (!dentro(LOSA_A, x, y)) continue; const quita = (x - 160) / 90;
    if (ub > quita + 0.05) continue; const pv = ub > quita - 0.1 ? 1 - (ub - quita + 0.1) / 0.15 : 1; R.disco(ri(x), ri(y), Math.max(1, ri(r * pv)), TIERRA[2]); R.disco(ri(x) - 1, ri(y) - 1, Math.max(1, ri(r * pv) - 2), TIERRA[3]); }
  // la sombra del sombrero del prospector, que se inclina sobre la losa
  const inc = Math.sin(t * 0.8) * 4; for (let y = 0; y < 70; y++) for (let x = 0; x < 90; x++) { const d = ((x - 22 - inc) / 46) ** 2 + ((y - 18) / 30) ** 2; if (d < 1 && di(x, y) < 0.55) R.pset(x, y, mez(R.pget(x, y), K, 0.35)); }
  // un escarabajo que cruza y unas matas
  const ex = ri(330 - ((t - P5) * 22) % 380), ey = 162 + ri(Math.sin(t) * 2); R.rect(ex, ey, ex + 4, ey + 2, H('#1a1a24')); R.pset(ex + 1, ey, H('#4a6a8a')); for (const i of [0, 2, 4]) R.pset(ex + i, ey + 3 - (Math.floor(t * 10 + i) % 2), K);
  for (const [x, y, h] of [[20, 70, 7], [300, 160, 8], [272, 30, 6], [40, 30, 5], [120, 168, 7]]) mata(x, y, t, h);
  // la mano con la brocha
  if (t > P5 + 0.2) {
    const ent = tramo(t, P5 + 0.2, b0), sal = tramo(t, b1 + 0.1, P6), bx = 162 + ub * 88 + Math.sin(t * 14) * 6, by = 126 + Math.sin(ub * 7) * 4;
    const wx = ri(lerp(360, bx + 14, ent) + sal * 90), wy = ri(lerp(190, by - 4, ent) + sal * 40);
    // la brocha: mango de madera y cerdas
    const tx = wx - 16, ty = wy + 8; herramienta(wx - 4, wy, tx, ty, (ax, ay) => { R.rect(ax - 4, ay - 1, ax, ay + 3, K); R.rect(ax - 3, ay, ax - 1, ay + 2, H('#e8d8a0')); R.pset(ax - 4, ay + 4, H('#c8b880')); R.pset(ax - 2, ay + 4, H('#c8b880')); });
    T.brazo(R, wx + 30, 198, wx, wy, MANGA, -1, {});
    if (ub > 0 && ub < 1) for (let k = 0; k < 6; k++) { const f = (t * 2 + k / 6) % 1; R.pset(ri(tx - 6 - f * 12 + Math.sin(k * 3) * 4), ri(ty + 2 - f * 10 - k), mez(TIERRA[4], H('#ffffff'), 0.3)); }
  }
};
// ── 6 · el cuaderno: tres lápidas ──
const MADERA = RAM('#3a2214', '#5a3820', '#7a5030', '#9a6a40', '#b48454');
const mesaMadera = (sem) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y + 6) / 34), yy = (y + 6) % 34;
  let v = 2.2 + 0.5 * Math.sin(x * 0.08 + tabla * 2 + 2.5 * Math.sin(y * 0.25 + x * 0.01 + tabla)) + (hh(x >> 2, y, sem) - 0.5) * 0.6; if (yy === 0) v = 0; else if (yy === 1) v = 3.6;
  const nd = Math.hypot((x - (60 + tabla * 97) % 300) / 2, y - (tabla * 34 + 14)); if (nd < 4) v -= 1.4 - nd * 0.2; R.pset(x, y, rampa(MADERA, v, x, y)); } };
const PAPEL = RAM('#b8a888', '#d8cca8', '#ece2c4', '#f6f0dc');
const LAP = H('#4a4a56');
const lapida = (x, y, f) => { const pts = []; for (let i = 0; i <= 14; i++) pts.push([x, y + 20 - i]); for (let a = 0; a <= 16; a++) pts.push([x + 8 - Math.cos(a / 16 * Math.PI) * 8, y + 6 - Math.sin(a / 16 * Math.PI) * 7]); for (let i = 0; i <= 14; i++) pts.push([x + 16, y + 6 + i]);
  const n = ri(pts.length * f); for (let i = 0; i < n; i++) { R.pset(ri(pts[i][0]), ri(pts[i][1]), LAP); R.pset(ri(pts[i][0]) + 1, ri(pts[i][1]), LAP); } if (f >= 1) { R.linea(x - 4, y + 21, x + 20, y + 21, LAP); R.linea(x + 8, y + 4, x + 8, y + 14, LAP); R.linea(x + 5, y + 8, x + 11, y + 8, LAP); for (let j = y + 6; j < y + 20; j += 3) R.pset(x + 13, j, LAP); } };
const p6 = (t) => {
  capa('c6', () => {
    mesaMadera(4);
    // la sombra del cuaderno, las tapas de tela verde y las dos páginas con su lomo
    for (let y = 30; y < 170; y++) for (let x = 46; x < 282; x++) R.pset(x, y, mez(R.pget(x, y), K, 0.4));
    R.rect(40, 22, 278, 164, K); R.rect(41, 23, 277, 163, H('#2e4a34')); R.rect(41, 23, 277, 24, H('#4a6a4e'));
    for (let y = 26; y <= 160; y++) for (let x = 46; x <= 272; x++) { const sp = Math.abs(x - 159); let v = 2.6 - (sp < 10 ? (10 - sp) * 0.18 : 0) - (y > 156 ? 0.6 : 0) + (hh(x >> 1, y >> 1, 2) - 0.5) * 0.3; if (x === 159) v = 0.2; R.pset(x, y, rampa(PAPEL, v, x, y)); }
    for (let y = 40; y <= 154; y += 8) { R.linea(52, y, 152, y, H('#a8c0d8')); R.linea(166, y, 268, y, H('#a8c0d8')); }
    R.linea(64, 28, 64, 158, H('#e0a0a0')); R.linea(178, 28, 178, 158, H('#e0a0a0'));
    // la página de la izquierda: el cerro con su moral y las losas, a lápiz
    for (let x = 70; x <= 148; x++) { const y = ri(120 - Math.sin((x - 70) / 78 * Math.PI) * 30); R.pset(x, y, LAP); if (x % 5 === 0) R.pset(x, y + 3, LAP); }
    R.linea(108, 90, 108, 76, LAP); for (let a = 0; a < 24; a++) R.pset(ri(108 + Math.cos(a / 24 * 6.28) * 9), ri(70 + Math.sin(a / 24 * 6.28) * 6), LAP);
    for (const [x, y] of [[92, 98], [118, 96], [128, 102], [100, 104]]) R.rect(x, y, x + 5, y + 2, LAP);
    for (let x = 72; x < 146; x += 4) R.pset(x, 134, LAP);
    R.numero('1963', 70, 46, { color: LAP, sombra: false });
    // la página de la derecha: lo apuntado (un montículo, una lasca, una loma) con sus cuentas
    R.linea(184, 50, 190, 44, LAP); R.linea(190, 44, 196, 50, LAP); R.numero('12', 202, 52, { color: LAP, sombra: false });
    R.poligono([[186, 64], [192, 60], [194, 66], [188, 68]], LAP); R.numero('37', 202, 68, { color: LAP, sombra: false });
    for (let x = 184; x < 198; x++) R.pset(x, ri(84 - Math.sin((x - 184) / 14 * Math.PI) * 4), LAP); R.numero('5', 202, 84, { color: LAP, sombra: false });
    // la brújula, el sombrero y la taza
    R.disco(22, 150, 13, K); R.disco(22, 150, 12, H('#b08a3a')); R.disco(22, 150, 10, H('#f0e8d0')); R.linea(22, 142, 22, 150, H('#c8302a')); R.linea(22, 150, 22, 158, H('#3a3a46')); R.disco(22, 150, 1, K);
    R.disco(300, 150, 13, K); R.disco(300, 150, 12, H('#e8e4dc')); R.disco(300, 150, 9, H('#5a3418')); R.disco(298, 148, 3, H('#7a4a28'));
    for (let y = 0; y < 22; y++) for (let x = 0; x < 34; x++) { const d = ((x - 4) / 30) ** 2 + ((y - 172 + 160) / 16) ** 2; }
  });
  // la luz que se cuela por la lona de la tienda: unas manchas de sombra que se mecen
  for (let k = 0; k < 3; k++) { const cx = 90 + k * 80 + Math.sin(t * 0.7 + k) * 10, cy = 40 + k * 30; for (let y = cy - 8; y < cy + 8; y++) for (let x = ri(cx) - 14; x < cx + 14; x++) if (((x - cx) / 14) ** 2 + ((y - cy) / 8) ** 2 < 1 && di(x, y) < 0.3) R.pset(x, y, mez(R.pget(x, y), K, 0.12)); }
  // el vapor de la taza
  for (let k = 0; k < 4; k++) { const f = (t * 0.6 + k / 4) % 1; R.pset(ri(300 + Math.sin(f * 6 + k) * 3), ri(140 - f * 24), mez(H('#ffffff'), H('#a08060'), f)); }
  // una hormiga que recorre el canto del cuaderno
  const hx = ri(46 + ((t - P6) * 18) % 230); R.rect(hx, 165, hx + 3, 166, K); R.pset(hx + 4, 165, K);
  // las tres lápidas que se dibujan, la hierba y la marca
  const g = @T(28.94), md = @T(29.96), ok = @T(31.0);
  const L = [[188, 112, g - 0.45], [214, 110, g], [240, 114, g + 0.45]];
  let px = 230, py = 130;
  for (const [x, y, a] of L) { const f = tramo(t, a, a + 0.42); if (f > 0) lapida(x, y, f); if (f > 0 && f < 1) { const i = Math.min(1, f); px = x + 8 + Math.cos(i * 6) * 8; py = y + 8 + Math.sin(i * 6) * 8; } }
  const fm = tramo(t, md, md + 0.5); if (fm > 0) { for (let x = 184; x < 184 + 80 * fm; x += 3) R.linea(x, 135, x + 1, 132, H('#5a7a3a')); if (fm < 1) { px = 184 + 80 * fm; py = 134; } }
  const fo = tramo(t, ok, ok + 0.35); if (fo > 0) { R.linea(250, 140, ri(254), ri(140 + 5 * Math.min(1, fo * 2)), H('#c8302a')); R.linea(251, 140, 255, ri(140 + 5 * Math.min(1, fo * 2)), H('#c8302a')); if (fo > 0.5) { R.linea(254, 145, ri(254 + 10 * (fo - 0.5) * 2), ri(145 - 12 * (fo - 0.5) * 2), H('#c8302a')); R.linea(255, 145, ri(255 + 10 * (fo - 0.5) * 2), ri(145 - 12 * (fo - 0.5) * 2), H('#c8302a')); } if (fo < 1) { px = 254; py = 144; } }
  if (t < L[0][2] - 0.3) { const e = tramo(t, P6, L[0][2] - 0.3); px = lerp(260, 196, e); py = lerp(190, 120, e); }
  if (t > ok + 0.4) { const e = tramo(t, ok + 0.4, P7); px = lerp(264, 300, e); py = lerp(144, 196, e); }
  // la mano con el lápiz
  const wx = ri(px + 10), wy = ri(py + 8); R.linea(wx - 2, wy - 1, ri(px), ri(py), K); R.linea(wx - 1, wy - 2, ri(px) + 1, ri(py) - 1, H('#e8b830')); R.pset(ri(px), ri(py), H('#2a2a30'));
  T.brazo(R, wx + 28, 200, wx, wy, MANGA, -1, {});
};
// ── 7 · el cuaderno entra en la estantería del archivo y pasan los años ──
const LOMOS = ['#7a2a24', '#2a3a5a', '#5a6a3a', '#6a4a2a', '#3a3a3a', '#8a6a3a', '#4a2a4a'];
const p7 = (t) => {
  const mueve = @T(33.84), años = @T(35.28), ua = tramo(t, @T(35.02), P8 - 0.1);
  capa('c7', () => {
    // la pared de yeso con grietas y una mancha de humedad
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 2.2 + (hh(x >> 2, y >> 2, 1) - 0.5) * 0.5 + (hh(x, y, 2) - 0.5) * 0.5 - y / 180 * 0.4; const m = Math.hypot((x - 40) / 30, (y - 150) / 24); if (m < 1) v -= (1 - m) * 0.8; R.pset(x, y, rampa(RAM('#6a6052', '#8c8270', '#aca08a', '#c6bca4', '#d8d0ba'), v, x, y)); }
    R.linea(252, 0, 258, 12, H('#7a7060')); R.linea(258, 12, 255, 22, H('#7a7060'));
    // la ventana de la izquierda (el hueco lo pinta la vida)
    R.rect(6, 34, 62, 104, K); R.rect(7, 35, 61, 103, H('#8a6a44')); R.rect(10, 38, 58, 100, H('#3a4a5a')); R.rect(33, 38, 35, 100, H('#8a6a44')); R.rect(10, 68, 58, 70, H('#8a6a44')); R.rect(4, 104, 64, 108, H('#a8885a')); R.rect(4, 108, 64, 109, K);
    // la estantería: postes y baldas de madera
    for (const x of [76, 188, 300]) { R.rect(x - 3, 36, x + 3, 179, K); R.rect(x - 2, 36, x + 2, 179, H('#7a5434')); R.rect(x - 2, 36, x - 1, 179, H('#9a6e44')); }
    for (const y of [40, 80, 120, 160]) { R.rect(73, y, 303, y + 5, K); R.rect(74, y + 1, 302, y + 3, H('#8a6038')); R.rect(74, y + 1, 302, y + 1, H('#b0844e')); R.rect(74, y + 6, 302, y + 8, mez(H('#6a5c4a'), K, 0.4)); }
    // carpetas, cajas numeradas, planos enrollados y legajos
    const fila = (y, xs) => { let x = xs[0]; for (let k = 0; x < xs[1]; k++) { const w = 7 + ri(hh(k, y) * 4), h = 26 + ri(hh(k, y, 2) * 8), c = H(LOMOS[(k + y) % LOMOS.length]);
      R.rect(x, y - h, x + w, y - 1, K); R.rect(x + 1, y - h + 1, x + w - 1, y - 1, c); R.rect(x + 1, y - h + 1, x + 1, y - 1, mez(c, H('#ffffff'), 0.25)); R.rect(x + 2, y - h + 6, x + w - 2, y - h + 9, H('#e8dcc0')); R.rect(x + 2, y - 8, x + w - 2, y - 7, mez(c, K, 0.4)); x += w + 1; } };
    fila(80, [80, 140]); fila(120, [80, 120]); fila(160, [194, 260]); fila(120, [190, 280]);
    const caja = (x, y, n) => { R.rect(x, y - 24, x + 32, y - 1, K); R.rect(x + 1, y - 23, x + 31, y - 1, H('#b08a5a')); R.rect(x + 1, y - 23, x + 31, y - 21, H('#c8a070')); R.rect(x + 8, y - 17, x + 24, y - 8, H('#f0e8d4')); R.numero(n, x + 16, y - 9, { color: H('#3a3a46'), sombra: false, centro: true }); };
    caja(146, 80, '61'); caja(194, 80, '62'); caja(230, 80, '64'); caja(268, 80, '58'); caja(80, 160, '12'); caja(116, 160, '27'); caja(266, 160, '33');
    for (const [x, y] of [[152, 117], [160, 113], [168, 117]]) { R.disco(x, y - 2, 4, K); R.disco(x, y - 2, 3, H('#e8dcc0')); R.disco(x, y - 2, 1, H('#a89878')); }
    R.rect(126, 104, 150, 119, K); R.rect(127, 105, 149, 119, H('#e8e0cc')); for (let y = 107; y < 119; y += 2) R.linea(127, y, 149, y, H('#c8c0a8'));
    R.rect(194, 40 + 6, 230, 40 + 8, K);
  });
  // la ventana: el cielo que pasa del día a la noche una y otra vez mientras corren los años
  const dia = ua > 0 ? 0.5 + 0.5 * Math.cos((t - años) * 7) : 1;
  const cielo = mez(H('#1a2040'), H('#8ab8e0'), dia); R.rect(10, 38, 32, 67, cielo); R.rect(36, 38, 58, 67, cielo); R.rect(10, 71, 32, 100, mez(cielo, H('#6a7a5a'), 0.3)); R.rect(36, 71, 58, 100, mez(cielo, H('#6a7a5a'), 0.3));
  if (ua > 0) { const sx = ri(10 + ((t - años) * 7 / 6.28 % 1) * 48); if (dia > 0.4) R.disco(sx, 50, 3, H('#fff4c8')); else R.pset(sx, 46, H('#f0f0f0')); }
  // el hueco de luz de la ventana que cruza la estantería
  if (ua > 0 && dia > 0.3) { const px = ri(80 + ((t - años) * 7 / 6.28 % 1) * 200); for (let y = 40; y < 170; y++) for (let x = px - 16 + ri((y - 40) * 0.3); x < px + 16 + ri((y - 40) * 0.3); x++) if (x > 64 && x < 319 && di(x, y) < 0.45 * dia) R.pset(x, y, mez(R.pget(x, y), H('#fff0c8'), 0.28)); }
  if (ua > 0 && dia < 0.5) tiñe(0, 0, 319, 179, H('#101830'), (0.5 - dia) * 0.7);
  // el cuaderno que entra en su hueco, en la balda de en medio
  const ent = tramo(t, P7 + 0.3, mueve - 0.2), nx = ri(lerp(330, 285, ent)), ny = 119;
  R.rect(nx, ny - 30, nx + 9, ny, K); R.rect(nx + 1, ny - 29, nx + 8, ny, H('#2e4a34')); R.rect(nx + 1, ny - 29, nx + 2, ny, H('#4a6a4e')); R.rect(nx + 3, ny - 22, nx + 7, ny - 18, H('#e8dcc0'));
  if (t < mueve + 0.7) { const s = tramo(t, mueve, mueve + 0.7), wx = ri(nx + 18 + s * 40), wy = ri(ny - 14); T.brazo(R, wx + 40, wy + 22, wx, wy, MANGA, -1, {}); }
  // el polvo que se posa, la telaraña que crece y la araña que baja
  if (ua > 0) {
    for (let k = 0; k < 160 * ua; k++) { const x = 74 + ri(hh(k, 1, 9) * 228), y = [41, 81, 121, 161][k % 4] - 1; R.pset(x, y, H('#d8d0c0')); }
    for (let k = 0; k < 40 * ua; k++) R.pset(nx + 1 + ri(hh(k, 3) * 8), ny - 30, H('#cfc6b4'));
    const tw = tramo(t, años + 0.6, P8 - 0.3); if (tw > 0) { const cx = 296, cy = 87; for (let a = 0; a < 6; a++) { const ang = Math.PI * (0.5 + a / 10), L = 22 * tw; R.linea(cx, cy, ri(cx + Math.cos(ang) * L * 1.3), ri(cy + Math.sin(ang) * L * 0.9), H('#e8e8e8')); }
      for (let r = 5; r < 22 * tw; r += 5) for (let a = 0; a < 6; a++) { const a1 = Math.PI * (0.5 + a / 10), a2 = Math.PI * (0.5 + (a + 1) / 10); R.linea(ri(cx + Math.cos(a1) * r * 1.3), ri(cy + Math.sin(a1) * r * 0.9), ri(cx + Math.cos(a2) * r * 1.3), ri(cy + Math.sin(a2) * r * 0.9), H('#d8d8d8')); } }
    const ay = ri(lerp(87, 104, tramo(t, años, años + 1.2)) + Math.sin(t * 3) * 2); R.linea(276, 87, 276, ay, H('#e8e8e8')); R.disco(276, ay, 2, K); for (const s of [-1, 1]) { R.pset(276 + s * 3, ay - 1, K); R.pset(276 + s * 3, ay + 1, K); }
  }
};
// ── 8 · años después: el cerro en otoño, el tractor ara y el campesino aparta una losa ──
const p8 = (t) => {
  T.colina(R, t, { epoca: 1994, estacion: 'otono' });
  const empuja = @T(42.6), way = @T(41.94);
  // el niño que echa la semilla al vuelo detrás
  const xn = ri(lerp(40, 112, tramo(t, P8, P9))); const rn = R.actor(GB.ninoGB, xn, 150, t, { dir: 1, anda: true, sostiene: Math.sin(t * 4) > 0 ? [xn + 14, 132] : false });
  for (let k = 0; k < 6; k++) { const f = (t * 1.5 + k / 6) % 1; R.pset(ri(xn + 14 + f * 12), ri(132 + f * 18 - Math.sin(f * 3) * 6), H('#e8d090')); }
  // la losa que estorba y el campesino que llega y la empuja a un lado
  const us = tramo(t, empuja, empuja + 1.0), sx = ri(lerp(180, 134, us));
  losa([[sx, 142], [sx + 6, 138], [sx + 34, 138], [sx + 38, 142], [sx + 34, 146], [sx + 4, 146]], 5, 6, { grietas: [[sx + 16, 139, sx + 20, 146]] });
  if (us > 0 && us < 1) for (let k = 0; k < 8; k++) R.pset(sx + 38 + ri(hh(k, ri(t * 10)) * 10), 150 - ri(hh(k, 2, ri(t * 10)) * 6), H('#c8a070'));
  const uc = tramo(t, P8 + 0.3, way - 0.2), xc = us > 0 ? sx + 38 : ri(lerp(320, 218, uc));
  R.actor(GB.campesinoGB, xc, 150, t, { dir: -1, anda: (uc > 0 && uc < 1) || (us > 0 && us < 1), sostiene: t > way - 0.2 ? [xc - 2, 141] : false, enfado: us > 0 && us < 1, sonrisa: us >= 1 });
  T.colinaDelante(R, t, {});
};
// ── 9 · GAG: Atom empuja una losa y el que resbala es él; el campesino la parte y siembra ──
const p9 = (t) => {
  capa('c9', () => {
    cieloT(78, RAM('#4a86c8', '#5b95d2', '#70a5da', '#88b5e0', '#a2c4e4', '#c8d8e0'), [236, 30, 8], RAM('#fffbe0', '#fff4c8', '#ffffff'));
    // la sierra, el cerro redondo con el moral a lo lejos y los campos
    for (let x = 0; x < 320; x++) { const yh = 70 - ri(5 * Math.sin(x * 0.03) + 3 * Math.sin(x * 0.11 + 1)); for (let y = yh; y < 80; y++) R.pset(x, y, rampa(RAM('#8a92a8', '#a0a8ba', '#b4bac8'), 1 + (y - yh) * 0.12 + (hh(x, y) - 0.5) * 0.4, x, y)); }
    for (let x = 200; x < 300; x++) { const yh = ri(80 - Math.sqrt(Math.max(0, 1 - ((x - 250) / 50) ** 2)) * 18); for (let y = yh; y < 82; y++) R.pset(x, y, rampa(RAM('#8a5a3a', '#a8704a', '#c08a5e'), 1.2 + (hh(x, y, 4) - 0.5) + (x < 250 ? 0.4 : -0.3), x, y)); }
    R.linea(250, 62, 250, 56, H('#4a3424')); R.disco(250, 54, 5, H('#3a5a30')); R.disco(249, 53, 3, H('#5a8040'));
    const bandas = RAM('#c8b070', '#a8643e', '#d8c890', '#8a5a34', '#b8a860', '#9a6a40');
    for (let y = 80; y < 118; y++) for (let x = 0; x < 320; x++) { const b = Math.floor(((y - 80) ** 1.3) / 9 + x / 140 + Math.sin(x * 0.02) * 0.6); const c = bandas[((b % 6) + 6) % 6]; R.pset(x, y, hh(x, y, 5) < 0.18 ? mez(c, K, 0.15) : c); }
    for (let x = 0; x < 320; x += 1) { const y = ri(96 + Math.sin(x * 0.04) * 2); if (hh(x, 1) < 0.7) R.pset(x, y, H('#9a8a70')); }
    arada(118, 179, TIERRA, 9, 6);
    guijarros(0, 120, 319, 179, 40, 2, P_TIERRA);
    // el murete de piedra seca del fondo del campo y un pistachero
    for (let x = 0; x < 320; x += 5) { const y = 114 + ri(Math.sin(x * 0.03) * 1.5), w = 4 + ri(hh(x, 2) * 2); R.rect(x, y - 3, x + w, y, H('#6a5a44')); R.rect(x + 1, y - 2, x + w - 1, y - 1, rampa(CALR, 2 + hh(x, 3) * 2, x, y)); }
    R.rect(58, 96, 60, 112, H('#4a3424')); for (const [dx, dy, r, c] of [[-6, -2, 6, '#3a5a2a'], [6, -2, 6, '#3a5a2a'], [0, -6, 7, '#4a6a34'], [-2, -8, 4, '#5e8040'], [3, -4, 3, '#6e9048']]) R.disco(59 + dx, 96 + dy, r, H(c));
  });
  nubes(t, 78, RAM('#ffffff', '#e8eef4', '#b8c8d8'), [[20, 34, 40, 3], [180, 30, 54, 1.6], [110, 52, 26, 5]]);
  moral(250, 62, 0.8, t);
  // el tractor lejos, que va por la linde
  const tx = ri(20 + ((t * 9) % 300)); R.rect(tx, 104, tx + 6, 108, H('#c8402e')); R.rect(tx + 4, 101, tx + 6, 104, H('#902a1e')); R.disco(tx + 1, 108, 2, K); R.pset(tx + 6, 109, K); R.pset(tx - 2 - ri(Math.sin(t * 5)), 102, H('#d8c8a8'));
  const push0 = P9 + 0.1, slip = @T(44.72), cae = slip + 0.45, llega = @T(45.68), golpe = @T(46.42), siembra = @T(47.67);
  // los pájaros del campo, que levantan el vuelo con el mazazo
  const vu = tramo(t, golpe, golpe + 2.2); for (let k = 0; k < 6; k++) { const bx = 40 + k * 22 + vu * (40 + k * 10), by = 128 + (k % 3) * 4 - vu * (60 + k * 6); const a = vu > 0 && Math.sin(t * 20 + k) > 0; R.pset(ri(bx), ri(by), H('#3a2e28')); R.pset(ri(bx) + 1, ri(by), H('#3a2e28')); if (vu > 0) { R.pset(ri(bx) - 1, ri(by) + (a ? -1 : 1), H('#3a2e28')); R.pset(ri(bx) + 2, ri(by) + (a ? -1 : 1), H('#3a2e28')); } else if (Math.sin(t * 3 + k) > 0.6) R.pset(ri(bx) + 1, ri(by) + 1, H('#3a2e28')); }
  // la losa, entera o partida en dos
  const parte = tramo(t, golpe, golpe + 0.35), lx = 138;
  if (parte <= 0) losa([[lx, 132], [lx + 8, 124], [lx + 50, 124], [lx + 56, 132]], 18, 4, { grietas: [[lx + 20, 126, lx + 24, 132]] });
  else { const d = ri(parte * 7); losa([[lx - d, 132], [lx + 8 - d, 124], [lx + 26 - d, 124], [lx + 22 - d, 132]], 18, 4, { grietas: [] }); losa([[lx + 28 + d, 132], [lx + 30 + d, 124], [lx + 50 + d, 124], [lx + 56 + d, 132]], 18, 5, { grietas: [] });
    for (let k = 0; k < 10; k++) { const f = tramo(t, golpe, golpe + 0.8), a = hh(k, 1) * Math.PI; R.pset(ri(lx + 27 + Math.cos(a) * f * 30), ri(126 - Math.sin(a) * f * 22 + f * f * 26), H('#e4d8bc')); }
    const pf = tramo(t, golpe, golpe + 1.2); if (pf < 1) for (let k = 0; k < 14; k++) { const a = hh(k, 4) * 6.28, r = 4 + pf * 16; R.disco(ri(lx + 27 + Math.cos(a) * r), ri(140 + Math.sin(a) * r * 0.4), Math.max(1, ri(3 * (1 - pf))), H('#d8c4a0')); } }
  for (let x = lx - 6; x < lx + 64; x++) { R.pset(x, 150, TIERRA[1]); if (hh(x, 3) < 0.6) R.pset(x, 149, TIERRA[2]); }
  // Atom: empuja con todas sus fuerzas, resbala hacia atrás y se cae sentado
  if (t < slip) { const tiem = ri(Math.sin(t * 40)); const r = T.AT.atom(R, 128 + tiem, 150, t, { dir: 1, pose: 'sostiene', cara: 'normal' });
    if (t > push0 + 0.3) for (let k = 0; k < 3; k++) { const f = (t * 2 + k / 3) % 1, sx = ri(126 - f * 8 - k * 2), sy = ri(128 - f * 8 + f * f * 16); R.rect(sx, sy, sx + 1, sy + 2, H('#8ad0ff')); R.pset(sx, sy - 1, H('#d0f0ff')); }
    for (let k = 0; k < 3; k++) R.linea(116, 136 + k * 4, 112 - ri(Math.sin(t * 20 + k) * 2), 136 + k * 4, H('#ffffff')); }
  else if (t < cae) { const f = tramo(t, slip, cae), ax = ri(lerp(128, 100, f)); T.AT.atom(R, ax, 150, t * 3, { dir: 1, pose: 'camina', cara: 'sorpresa' }); for (let k = 0; k < 6; k++) R.disco(ax + 6 + k * 5, 149 - (k % 2) * 2, 3 - (k >> 1), H('#d8b888')); R.icono('!', ax - 4, 108, H('#fff4c8'), K, 2); for (let k = 0; k < 3; k++) R.linea(ax + 10, 132 + k * 5, ax + 22, 132 + k * 5, H('#ffffff')); }
  else { R.recorte([0, 0, 319, 147]); T.AT.atom(R, 100, 155, t, { dir: 1, pose: t > siembra ? 'saluda' : 'quieto', cara: t > siembra ? 'sonrisa' : t > golpe ? 'sorpresa' : 'normal' }); R.recorte(null); R.rect(94, 147, 106, 149, H('#e8e0c8')); R.rect(94, 149, 106, 149, K);
    if (t < cae + 1.2) for (let k = 0; k < 3; k++) { const a = t * 6 + k * 2.1; R.pset(ri(100 + Math.cos(a) * 8), ri(128 + Math.sin(a) * 2), H('#ffe040')); } }
  // el campesino llega con la maza, la levanta y golpea; luego siembra al vuelo
  const uc = tramo(t, @T(45.0), llega), xc = ri(lerp(330, 198, uc));
  if (t > @T(45.0)) {
    const arriba = t > llega && t < golpe, abajo = t >= golpe && t < golpe + 0.5, sembrando = t > siembra - 0.4;
    const r = R.actor(GB.campesinoGB, xc, 150, t, { dir: -1, anda: uc < 1, sostiene: sembrando ? (Math.sin(t * 6) > 0 ? [xc - 4, 128] : [xc + 1, 136]) : arriba ? [xc + 4, 118] : abajo ? [xc - 6, 134] : [xc - 2, 140] });
    const [mx, my] = r.mano;
    const maza = (ax, ay) => { R.rect(ax - 3, ay - 2, ax + 3, ay + 2, K); R.rect(ax - 2, ay - 1, ax + 2, ay + 1, H('#8a8a90')); R.pset(ax - 2, ay - 1, H('#c8c8d0')); };
    if (!sembrando) { if (arriba) herramienta(mx, my, mx - 4, my - 14, maza); else if (abajo) herramienta(mx, my, mx - 14, my - 4, maza); else herramienta(mx, my, mx - 6, my + 8, maza); }
    else { herramienta(214, 150, 222, 132, null); R.rect(219, 128, 225, 132, K); R.rect(220, 129, 224, 131, H('#8a8a90'));
      R.rect(mx + 2, my - 1, mx + 7, my + 5, K); R.rect(mx + 3, my, mx + 6, my + 4, H('#d8c8a0'));
      for (let k = 0; k < 10; k++) { const f = (t * 1.6 + k / 10) % 1; R.pset(ri(mx - 2 - f * (30 + k * 3)), ri(my + f * 30 - Math.sin(f * 3) * 10), H('#f0e0a0')); } }
  }
  for (const [x, y, h] of [[14, 176, 9], [62, 170, 7], [276, 178, 10], [302, 168, 7], [240, 158, 6]]) mata(x, y, t, h);
  cardo(30, 179, t, 12); cardo(292, 179, t, 10);
};
// ── 10 · el pueblo, con el cerro redondo detrás ──
const CASA = RAM('#7a6448', '#9a8058', '#b89c70', '#d0b88a', '#e4d0a4');
const casa = (x0, y0, x1, y1, sem, o = {}) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const fila = Math.floor((y - y0) / 5), xx = x + (fila % 2) * 4; const junta = (y - y0) % 5 === 0 || xx % 9 === 0;
    let v = 2.3 + (hh(xx >> 3, fila, sem) - 0.5) * 1.0 + (hh(x, y, sem) - 0.5) * 0.4 - (x - x0) / (x1 - x0) * 0.4 - (junta ? 0.9 : 0); R.pset(x, y, rampa(CASA, v, x, y)); }
  R.rect(x0 - 2, y0 - 4, x1 + 2, y0 - 1, K); R.rect(x0 - 1, y0 - 3, x1 + 1, y0 - 2, H('#c8b080')); R.rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, H('#5a4a34'));
  for (let x = x0; x < x1; x += 4) if (hh(x, y0) < 0.5) R.pset(x, y0 - 5, H('#a89070'));
  R.rect(x1 - 1, y0, x1, y1, mez(CASA[1], K, 0.3));
  if (o.puerta) { const [px, pw] = o.puerta; R.rect(px - 1, y1 - 24, px + pw, y1, K); R.rect(px, y1 - 23, px + pw - 1, y1, H(o.color ?? '#3a6a8a')); for (let j = y1 - 21; j < y1; j += 4) R.linea(px + 1, j, px + pw - 2, j, mez(H(o.color ?? '#3a6a8a'), K, 0.3)); R.pset(px + pw - 3, y1 - 11, H('#e8c040')); }
  for (const [wx, wy] of o.ventanas ?? []) { R.rect(wx - 1, wy - 1, wx + 8, wy + 8, K); R.rect(wx, wy, wx + 7, wy + 7, H('#2a3440')); R.rect(wx + 3, wy, wx + 4, wy + 7, H('#8a6a44')); R.rect(wx, wy + 3, wx + 7, wy + 4, H('#8a6a44')); R.rect(wx - 1, wy + 8, wx + 8, wy + 9, H('#d8c8a0')); }
};
const p10 = (t) => {
  capa('c10', () => {
    cieloT(84, RAM('#4a86c8', '#5b95d2', '#70a5da', '#88b5e0', '#a2c4e4', '#c8d8e0'), [246, 26, 7], RAM('#fffbe0', '#fff4c8', '#ffffff'));
    for (let x = 0; x < 320; x++) { const yh = 74 - ri(4 * Math.sin(x * 0.025 + 2) + 2 * Math.sin(x * 0.09)); for (let y = yh; y < 92; y++) R.pset(x, y, rampa(RAM('#8a92a8', '#a0a8ba', '#b4bac8'), 1 + (y - yh) * 0.1 + (hh(x, y) - 0.5) * 0.4, x, y)); }
    // el cerro redondo de la barriga, con el moral en lo alto y las losas
    for (let x = 90; x < 300; x++) { const q = (x - 195) / 105, yh = ri(92 - Math.sqrt(Math.max(0, 1 - q * q)) * 40); for (let y = yh; y < 96; y++) { const f = Math.pow((y - yh) / 40, 0.8) * 7 + Math.sin(x * 0.05) * 0.2, ff = f - Math.floor(f); R.pset(x, y, rampa(RAM('#6a3e26', '#8e5434', '#b06c44', '#c88a5c', '#dca878'), 2.3 - q * 0.9 + (ff < 0.4 ? 0.5 : -0.3) + (hh(x, y, 4) - 0.5) * 0.6, x, y)); } }
    for (const [x, y] of [[176, 56], [184, 54], [206, 55], [214, 58], [196, 60]]) { R.rect(x, y, x + 4, y + 1, H('#e4d8bc')); R.rect(x, y + 2, x + 4, y + 2, H('#8a7a5a')); }
    // las terrazas y el sendero que sube por la falda
    for (let k = 0; k < 4; k++) { const y = 70 + k * 6; for (let x = 120 + k * 4; x < 270 - k * 4; x += 3) if (R.pget(x, y) !== 0 && hh(x, k) < 0.8) R.pset(x, y, H('#e4d0a8')); }
    for (let k = 0; k < 40; k++) R.pset(ri(150 + k * 1.1), ri(94 - k * 0.9), H('#e8d4a8'));
    // los campos entre el pueblo y el cerro (hasta la calle)
    for (let y = 92; y < 146; y++) for (let x = 0; x < 320; x++) { if (R.pget(x, y) !== 0 && y < 96 && x > 90 && x < 300 && y >= ri(92 - Math.sqrt(Math.max(0, 1 - ((x - 195) / 105) ** 2)) * 40)) continue; const b = Math.floor(x / 46 + (y - 92) / 6); R.pset(x, y, y > 112 ? rampa(RAM('#8a6a4a', '#a8865e', '#c4a276', '#d8bc90'), 1.6 + (hh(x >> 1, y >> 1, 7) - 0.5) * 1.2, x, y) : rampa(RAM('#9a6a40', '#b8a060', '#c8b070', '#d8c890'), (b % 4) + (hh(x, y, 2) - 0.5) * 0.8, x, y)); }
    // un muro de corral al fondo de la calle, con su portillo, y la tapia de la huerta
    for (let x = 128; x < 222; x += 6) for (let j = 0; j < 3; j++) { const y = 140 - j * 4; R.rect(x + (j % 2) * 3, y - 3, x + 5 + (j % 2) * 3, y, H('#6a5a44')); R.rect(x + 1 + (j % 2) * 3, y - 2, x + 4 + (j % 2) * 3, y - 1, rampa(CASA, 2 + hh(x, j) * 2, x, y)); }
    for (let x = 74; x < 84; x++) for (let y = 120; y < 146; y++) R.pset(x, y, rampa(CASA, 1.5 + (hh(x, y >> 2) - 0.5), x, y));
    for (const [x, y] of [[178, 124], [190, 126], [204, 122]]) { R.rect(x - 1, y - 10, x + 1, y, H('#4a3424')); R.disco(x, y - 12, 5, H('#4a6a34')); R.disco(x - 1, y - 13, 3, H('#6a8a44')); }
    // las casas de techo plano, de adobe y piedra, con su pretil, la leña y la escalera
    casa(4, 104, 72, 146, 1, { puerta: [30, 12], ventanas: [[12, 114], [52, 114]], color: '#3a6a8a' });
    casa(232, 100, 316, 146, 2, { puerta: [276, 13], ventanas: [[244, 112], [298, 112]], color: '#4a7a4a' });
    casa(84, 116, 128, 146, 3, { ventanas: [[100, 124]] });
    for (let k = 0; k < 4; k++) { R.rect(10 + k * 9, 96, 17 + k * 9, 100, K); R.rect(11 + k * 9, 97, 16 + k * 9, 99, H('#8a6a44')); }
    for (let j = 0; j < 7; j++) R.rect(222, 102 + j * 6, 230, 102 + j * 6, H('#8a6a44')); R.linea(222, 100, 222, 146, H('#6a4a2a')); R.linea(230, 100, 230, 146, H('#6a4a2a'));
    // el horno de pan (tandır) de barro
    for (let y = 130; y <= 146; y++) for (let x = 140; x <= 164; x++) { const q = ((x - 152) / 12) ** 2 + ((y - 146) / 16) ** 2; if (q < 1) R.pset(x, y, rampa(RAM('#7a5236', '#9a6a46', '#b88a60'), 1.5 - (x - 152) / 12 + (hh(x, y) - 0.5) * 0.5, x, y)); }
    R.rect(149, 129, 155, 131, K);
    // la calle de tierra con piedras
    for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rampa(RAM('#8a6a4a', '#a8865e', '#c4a276', '#d8bc90'), 2 + (hh(x >> 1, y >> 1, 7) - 0.5) * 1.2 - (y - 146) / 40, x, y));
    guijarros(0, 150, 319, 179, 30, 8, [RAM('#6a5a44', '#9a8a70', '#c8b898')]);
  });
  nubes(t, 84, RAM('#ffffff', '#e8eef4', '#b8c8d8'), [[0, 34, 46, 2.4], [150, 40, 34, 4], [240, 30, 50, 1.4]]);
  moral(195, 54, 1.25, t);
  T.bandada(R, t, { tipo: 'golondrina', n: 4, y: 46, cada: 6 });
  // el humo del horno, la ropa tendida que ondea, las gallinas y el burro
  for (let k = 0; k < 6; k++) { const f = (t * 0.5 + k / 6) % 1; R.disco(ri(152 + Math.sin(f * 5 + k) * 3 + f * 8), ri(126 - f * 30), f < 0.4 ? 1 : 2, mez(H('#e8e4dc'), H('#b8b4ac'), f)); }
  R.linea(244, 86, 244, 99, H('#4a3a2a')); R.linea(304, 86, 304, 99, H('#4a3a2a')); R.linea(244, 87, 304, 89, H('#4a3a2a'));
  for (const [i, c] of [[0, '#c8402e'], [1, '#e8e0c8'], [2, '#3a6aa8'], [3, '#e8c040'], [4, '#8a5aa8']]) { const x = 250 + i * 11, y = 88 + ri(i * 0.4), w = ri(Math.sin(t * 4 + i) * 2); R.rect(x, y, x + 7, y + 7 + (i % 2) * 2, K); R.rect(x + 1, y + 1, x + 6 + w * 0, y + 6 + (i % 2) * 2, H(c)); R.pset(x + 7 + w, y + 7, H(c)); }
  for (let k = 0; k < 3; k++) { const gx = ri(40 + k * 26 + Math.sin(t * 0.5 + k) * 10), gy = 164 + k * 3, pic = Math.sin(t * 5 + k * 2) > 0.5; R.rect(gx, gy - 4, gx + 5, gy, K); R.rect(gx + 1, gy - 3, gx + 4, gy - 1, H(k === 1 ? '#a8643e' : '#f0ece0')); R.pset(gx + (pic ? 6 : 5), gy - (pic ? 2 : 5), H('#d8302a')); R.pset(gx + 6, gy - (pic ? 1 : 4), H('#e8a030')); }
  const bx = 266, by = 160; R.rect(bx, by - 12, bx + 22, by - 5, K); R.rect(bx + 1, by - 11, bx + 21, by - 6, H('#7a7070')); R.rect(bx + 20, by - 18, bx + 27, by - 9, K); R.rect(bx + 21, by - 17, bx + 26, by - 10, H('#7a7070')); const ore = Math.sin(t * 1.3) > 0.7; R.rect(bx + 22, by - 22 + (ore ? 1 : 0), bx + 23, by - 18, H('#5a5050'));
  for (const lx of [bx + 2, bx + 6, bx + 16, bx + 20]) R.rect(lx, by - 5, lx + 1, by, H('#5a5050')); const cola = ri(Math.sin(t * 3) * 2); R.linea(bx, by - 10, bx - 3 + cola, by - 3, H('#4a4040'));
  // el niño señala el cerro y el abuelo se lo explica
  const name = @T(51.4), means = @T(53.42), pot = @T(54.62);
  R.actor(GB.ninoGB, 172, 158, t, { dir: 1, dedo: t > name - 0.2 && t < means, habla: t > name && t < name + 0.9 && Math.sin(t * 10) > 0, sonrisa: t > pot });
  R.actor(GB.campesinoGB, 200, 160, t, { dir: -1, habla: t > means - 0.6 && t < pot + 0.6 && Math.sin(t * 8) > 0, dedo: t > means && t < pot - 0.1, sonrisa: t > pot });
  // GAG: Atom, sobre el pretil, se da palmadas en la barriga redonda
  const pat = t > pot && t < P11 - 0.1 && Math.floor(t * 6) % 2 === 0;
  T.AT.atom(R, 110, 116, t, { dir: 1, pose: pat ? 'sostiene' : t > pot ? 'quieto' : 'saluda', cara: t > pot ? 'sonrisa' : 'normal' });
};
// ── 11 · de noche, la tierra entre las losas respira una luz cálida ──
const NOCHE = RAM('#0e1230', '#161c42', '#1e2650', '#28325e', '#36426e');
const TN = RAM('#100e18', '#1c1a28', '#2a2838', '#3a3848', '#4c4a5c');
const CALN = RAM('#22242e', '#343846', '#4a5062', '#62697c', '#7c8496', '#98a0b0');
const GRIETAS = [[[60, 150], [96, 138], [130, 142], [160, 128], [196, 132]], [[196, 132], [232, 118], [270, 122], [310, 108]], [[160, 128], [150, 104], [176, 90], [210, 84]], [[96, 138], [70, 116], [40, 104]]];
const p11 = (t) => {
  capa('c11', () => {
    cieloT(58, NOCHE, null, null);
    for (let k = 0; k < 70; k++) R.pset(ri(hh(k, 1, 3) * 320), ri(hh(k, 2, 3) * 54), k % 5 ? H('#8a90b0') : H('#d8dcf0'));
    for (let x = 0; x < 320; x++) { const yh = 54 - ri(2 * Math.sin(x * 0.04)); for (let y = yh; y < 60; y++) R.pset(x, y, H('#181a2c')); }
    arada(60, 179, TN, 11, 3);
    guijarros(0, 62, 319, 179, 50, 4, [RAM('#14121c', '#2a2838', '#4a4a5c'), RAM('#1a1a24', '#3a3c4c', '#5a5e70')]);
    losa([[112, 92], [150, 84], [182, 88], [190, 100], [160, 108], [118, 104]], 5, 2, { ram: CALN, cs: H('#08080e'), liquen: false });
    losa([[210, 128], [250, 120], [286, 126], [282, 142], [240, 146], [214, 140]], 7, 5, { ram: CALN, cs: H('#08080e'), liquen: false });
    losa([[26, 128], [62, 122], [84, 132], [70, 146], [30, 144]], 6, 7, { ram: CALN, cs: H('#08080e'), liquen: false });
    losa([[120, 150], [170, 146], [186, 160], [150, 172], [116, 164]], 8, 9, { ram: CALN, cs: H('#08080e'), liquen: false });
    // el moral de noche a la izquierda (la luna le da en el borde de la derecha)
    R.rect(42, 60, 47, 112, H('#1a1410')); R.rect(46, 60, 47, 112, H('#3a3040')); R.linea(44, 70, 30, 56, H('#1a1410')); R.linea(46, 66, 64, 52, H('#1a1410'));
    for (let y = 22; y < 74; y++) for (let x = 0; x < 104; x++) { const d = Math.hypot((x - 48) / 52, (y - 48) / 26) + (hh(x >> 2, y >> 2, 6) - 0.5) * 0.35 + Math.sin(x * 0.3 + y * 0.2) * 0.04; if (d > 1) continue; const lunar = (x - 48) / 52 - (y - 48) / 52;
      R.pset(x, y, rampa(RAM('#0a1412', '#122220', '#1a302c', '#2a4448', '#3e5a64'), 1.4 + lunar * 1.6 + (hh(x, y, 2) - 0.5) * 1.1 - (d > 0.85 ? 0.6 : 0), x, y)); }
  });
  // la luna con su halo y unas nubes oscuras que pasan por delante
  R.disco(238, 28, 10, H('#2a3460')); R.disco(238, 28, 8, H('#e8ecf4')); R.disco(241, 26, 2, H('#c0c8d8')); R.disco(235, 31, 1, H('#c0c8d8'));
  nubes(t, 56, RAM('#4a5478', '#2e3658', '#1c2240'), [[60, 30, 44, 3.5], [220, 40, 36, 2.2], [140, 20, 30, 5]]);
  for (let k = 0; k < 70; k += 7) if (Math.sin(t * 3 + k) > 0.7) R.pset(ri(hh(k, 1, 3) * 320), ri(hh(k, 2, 3) * 54), H('#ffffff'));
  // las luces del pueblo en el horizonte
  for (let k = 0; k < 7; k++) R.pset(110 + k * 9 + (k % 2) * 3, 56 + (k % 3), Math.sin(t * 2 + k * 3) > -0.6 ? H('#ffd080') : H('#806040'));
  // la luz cálida que sale de las grietas entre las losas y late, cada vez más fuerte
  const sube = tramo(t, @T(57.14), @T(61.3)), late = 0.5 + 0.5 * Math.sin(t * 2.6), g = 0.15 + 0.75 * sube * (0.6 + 0.4 * late);
  for (const L of GRIETAS) for (let i = 0; i < L.length - 1; i++) { const [a, b] = L[i], [c, d] = L[i + 1], n = Math.ceil(Math.hypot(c - a, d - b));
    for (let s = 0; s <= n; s++) { const x = ri(a + (c - a) * s / n + Math.sin(s * 0.7) * 1.5), y = ri(b + (d - b) * s / n);
      R.pset(x, y, mez(H('#3a2a20'), H('#ffc060'), g)); if (g > 0.3) { R.pset(x, y - 1, mez(R.pget(x, y - 1), H('#ff9a40'), g * 0.5)); R.pset(x, y + 1, mez(R.pget(x, y + 1), H('#ff9a40'), g * 0.4)); } } }
  if (g > 0.35) for (let k = 0; k < 10; k++) { const f = (t * 0.4 + k / 10) % 1, L = GRIETAS[k % 4][1]; R.pset(ri(L[0] + Math.sin(k + t) * 6), ri(L[1] - f * 20), mez(H('#ffd890'), H('#3a2a20'), f)); }
  // el búho en la rama, que parpadea y gira la cabeza
  const ox = 62, oy = 50, gira = Math.sin(t * 0.8) > 0.6 ? 1 : 0; R.rect(ox - 4, oy - 6, ox + 4, oy + 4, K); R.rect(ox - 3, oy - 5, ox + 3, oy + 3, H('#6a5a48')); R.rect(ox - 3, oy - 1, ox + 3, oy + 3, H('#8a7a60'));
  const parp = (t * 0.7) % 3 < 0.12; for (const e of [-2, 1]) { R.rect(ox + e + gira, oy - 4, ox + e + gira + 1, oy - 3, parp ? H('#6a5a48') : H('#ffd040')); if (!parp) R.pset(ox + e + gira, oy - 3, K); } R.pset(ox + gira, oy - 2, H('#c89a40')); R.pset(ox - 3, oy - 7, K); R.pset(ox + 3, oy - 7, K);
  // un erizo que cruza
  const ex = ri(340 - ((t - P11) * 16)); for (let i = 0; i < 10; i++) for (let j = 0; j < 5; j++) if (((i - 5) / 5) ** 2 + ((j - 5) / 5) ** 2 < 1) R.pset(ex + i, 170 + j, (i + j) % 2 ? H('#4a4038') : H('#6a5a4a')); R.pset(ex - 1, 174, H('#2a2420')); R.pset(ex + 1, 175 - (Math.floor(t * 8) % 2), K); R.pset(ex + 7, 175 - (Math.floor(t * 8 + 1) % 2), K);
  for (const [x, y, h] of [[300, 178, 9], [8, 176, 8], [196, 178, 7]]) mata(x, y, t, h, RAM('#2a2a34', '#3a3a48', '#4e5062'));
};
// ── 12 · al alba: una lagartija sobre la losa; llega la sombra de alguien con sombrero ──
const ALBA = RAM('#3a4a80', '#5a5a92', '#8a6a9a', '#c48a9a', '#eca888', '#f8c890', '#ffe0a8');
const p12 = (t) => {
  capa('c12', () => {
    cieloT(102, ALBA, [196, 100, 12], RAM('#ffe8b0', '#fff4d0', '#ffffff'));
    for (let x = 0; x < 320; x++) { const yh = 96 - ri(4 * Math.sin(x * 0.03 + 1) + 2 * Math.sin(x * 0.13)); for (let y = yh; y < 106; y++) R.pset(x, y, rampa(RAM('#4a3a5a', '#5e4a68', '#7a5e78'), 1 + (y - yh) * 0.15 + (hh(x, y) - 0.5) * 0.4, x, y)); }
    arada(104, 154, RAM('#2a1c24', '#4a2e30', '#6a4038', '#94603e', '#c88a58'), 9, 1);
    // la losa de delante, rasante, con la luz del alba en su filo
    losa([[-10, 150], [60, 138], [180, 136], [300, 142], [330, 150], [330, 190], [-10, 190]], 0, 11, { sombra: false, luz: -0.2, ram: RAM('#5a4a46', '#7e6a5e', '#a48a78', '#c4a690', '#e0c4a4', '#f8e0bc'), filo: H('#fff0c8'), grietas: [[60, 150, 96, 176], [210, 144, 230, 166], [230, 166, 262, 178], [120, 140, 112, 158], [290, 150, 300, 172]] });
    // la luz rasante del alba en la losa: más clara arriba, en sombra hacia nosotros, con hoyos y conchas de caracol
    for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const c = R.pget(x, y); R.pset(x, y, mez(c, H('#3a2a3a'), Math.max(0, (y - 146) / 34) * 0.45)); }
    for (let k = 0; k < 18; k++) { const x = ri(hh(k, 1, 12) * 320), y = 146 + ri(hh(k, 2, 12) * 30), r = 1 + ri(hh(k, 3, 12) * 2.5); R.disco(x, y, r, H('#6a5450')); R.disco(x - 1, y - 1, Math.max(1, r - 1), H('#4a3a3a')); R.pset(x + r, y + 1, H('#f0d8b8')); }
    for (const [x, y] of [[40, 160], [262, 150], [196, 170]]) { R.disco(x, y, 2, K); R.disco(x, y, 1, H('#e8dcc8')); R.pset(x + 1, y - 1, H('#ffffff')); }
  });
  nubes(t, 100, RAM('#ffe0b0', '#e8a090', '#8a6a90'), [[10, 40, 60, 2], [170, 60, 44, 3.5], [250, 30, 40, 1.3]]);
  T.bandada(R, t, { tipo: 'ibis', n: 3, y: 64, cada: 9, d: -1 });
  // la silueta que llega por el horizonte y su sombra larga que baja hacia nosotros
  const some = @T(63.14), uf = tramo(t, P12 + 0.3, some + 0.4), fx = ri(lerp(-16, 92, uf));
  if (uf > 0) { silueta(fx - 2, 70, fx + 18, 105, () => R.actor(GB.schmidtGB, fx, 104, t, { dir: 1, anda: uf < 1 }), H('#2a1c30'), 0.86);
    const L = 30 + uf * 60; for (let y = 105; y < Math.min(180, 105 + L); y++) { const f = (y - 105) / L, cx = fx + 7 + f * 36, w = 4 + f * 8; for (let x = ri(cx - w); x <= cx + w; x++) if (di(x, y) < 0.7) R.pset(x, y, mez(R.pget(x, y), H('#1a1028'), 0.5)); }
    const hy = ri(105 + L), hx = ri(fx + 7 + 36); if (hy < 192) for (let y = hy - 10; y < hy + 2; y++) for (let x = hx - 13; x < hx + 14; x++) if (((x - hx) / 13) ** 2 + ((y - hy + 4) / 5) ** 2 < 1 && di(x, y) < 0.7) R.pset(x, y, mez(R.pget(x, y), H('#1a1028'), 0.5)); }
  // la lagartija que toma el sol, levanta la cabeza y huye
  const huye = tramo(t, some + 0.6, some + 1.3), lx = ri(150 + huye * 200), ly = 152 - ri(huye * 4), cab = Math.sin(t * 1.4) > 0.3 ? -1 : 0, pata = Math.floor(t * 14) % 2;
  R.rect(lx - 1, ly - 1, lx + 16, ly + 3, K); R.rect(lx, ly, lx + 15, ly + 2, H('#5e6e40')); R.rect(lx + 2, ly, lx + 13, ly, H('#9aaa62')); for (let i = 2; i < 14; i += 3) R.pset(lx + i, ly + 1, H('#3e4a2a'));
  R.rect(lx + 15, ly - 1 + cab, lx + 20, ly + 2 + cab, K); R.rect(lx + 16, ly + cab, lx + 19, ly + 1 + cab, H('#7a8a50')); R.pset(lx + 18, ly + cab, H('#f0d040'));
  const cola = ri(Math.sin(t * 3) * 2); R.linea(lx - 1, ly + 1, lx - 9, ly + 3 + cola, K); R.linea(lx - 9, ly + 3 + cola, lx - 15, ly + 2 + cola, K); R.linea(lx - 1, ly, lx - 9, ly + 2 + cola, H('#6a7a48'));
  for (const i of [2, 12]) { R.rect(lx + i, ly + 3, lx + i + 1, ly + 4 + (huye > 0 ? pata : 0), K); R.rect(lx + i + 1, ly - 2 - (huye > 0 ? 1 - pata : 0), lx + i + 2, ly - 1, K); }
  if (!huye && Math.sin(t * 5) > 0.5) R.pset(lx + 17, ly + 3 + cab, H('#e8c8a0'));
  for (const [x, y, h] of [[20, 140, 8], [280, 142, 9], [110, 138, 6]]) mata(x, y, t, h, RAM('#3a2a2a', '#6a4a3a', '#e8a870'));
};
const año = (t) => t < @T(35.0) ? 1963 : t < P8 ? Math.round(lerp(1963, 1979, tramo(t, @T(35.0), P8))) : t < P9 ? Math.round(lerp(1979, 1988, tramo(t, P8, P9))) : t < P10 ? Math.round(lerp(1988, 1993, tramo(t, P9, P10))) : 1993;
const efectos = [[@T(0.6), 'pasos'], [@T(6.74), 'golpecito'], [@T(7.5), 'golpecito'], [@T(8.6), 'lapiz'], [@T(12.76), 'pop'], [@T(15.44), 'brillo'], [@T(17.0), 'pasos'],
  [@T(23.4), 'papel'], [@T(28.5), 'lapiz'], [@T(31.0), 'lapiz'], [@T(33.6), 'golpecito'], [@T(35.4), 'tic'], [@T(38.9), 'motor'], [@T(42.6), 'golpecito'],
  [@T(44.72), 'whoosh'], [@T(45.2), 'boing'], [@T(46.42), 'toc'], [@T(46.6), 'pajaros'], [@T(54.7), 'toc'], [@T(55.05), 'toc'], [@T(59.8), 'zumbido'], [@T(63.2), 'pasos']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11], [P12, p12]], { cartela: '1963', efectos, año });
''')

E['gb-schmidt'] = ('Klaus Schmidt', '''// GB-SCHMIDT (frase 7), 1994, cartela «1994». Cinco planos:
// 1. la carretera de tierra al pie de la meseta: llega el dolmuş, se baja Klaus Schmidt con su mochila, mira el cerro
//    redondo y lo señala («Klaus Schmidt»); el dolmuş se va;  2. el recuerdo (tono cálido, viñeta): la excavación de
//    Nevalı Çori, junto al Éufrates, con su pilar en T empotrado en el banco; Schmidt lo limpia y el pilar se ilumina al
//    decir «T-shaped pillars»;  3. en lo alto del cerro (losas, otoño de 1994): se arrodilla ante la losa grande y
//    aparta la tierra: sale la cabeza del pilar con el zorro; la lápida tachada («aren't gravestones»); se queda quieto;
// 4. el corte de la colina: bajo Schmidt, diminuto en la superficie, el pilar entero enterrado y otros pilares en
//    círculo que se encienden uno a uno («huge pillars buried»); el reloj con «1» («the first minute»);  5. al atardecer,
//    Schmidt en lo alto junto al moral: da dos pasos para irse («walk away»), se para, vuelve y se queda.''', AUX + r'''
const GB = T.GB;
const S2 = @T(6.54), S3 = @T(12.8), S4 = @T(18.66), S5 = @T(24.44);
// ── 1 · la carretera y el dolmuş ──
const OTO = RAM('#5a8ac0', '#6a98c8', '#80a8d0', '#98b8d6', '#b4c8d8', '#d0d8d8');
const dolmus = (x, y, t, mueve, puerta) => {
  // y = el suelo de las ruedas; mide 66 × 30
  R.rect(x, y - 30, x + 66, y - 6, K); R.rect(x + 1, y - 29, x + 65, y - 7, H('#eeeee6')); R.rect(x + 1, y - 29, x + 65, y - 27, H('#ffffff')); R.rect(x + 1, y - 14, x + 65, y - 11, H('#2a8a8a')); R.rect(x + 1, y - 10, x + 65, y - 7, H('#c8ccd0'));
  R.rect(x + 3, y - 33, x + 60, y - 30, K); R.rect(x + 4, y - 32, x + 59, y - 31, H('#5a5a60')); R.rect(x + 12, y - 37, x + 24, y - 33, K); R.rect(x + 13, y - 36, x + 23, y - 33, H('#a8643e')); R.rect(x + 30, y - 36, x + 40, y - 33, K); R.rect(x + 31, y - 35, x + 39, y - 33, H('#3a6aa8'));
  for (let k = 0; k < 5; k++) { const wx = x + 4 + k * 11; R.rect(wx, y - 25, wx + 8, y - 17, K); R.rect(wx + 1, y - 24, wx + 7, y - 18, H('#3a5068')); R.pset(wx + 2, y - 23, H('#7aa0c0')); if (k > 0 && k < 4) { R.rect(wx + 3, y - 22, wx + 5, y - 18, H('#2a2a30')); R.rect(wx + 3, y - 23, wx + 5, y - 22, H('#c89a70')); } }
  R.rect(x + 59, y - 25, x + 65, y - 16, K); R.rect(x + 60, y - 24, x + 64, y - 17, H('#7aa0c0'));
  const pd = x + 46; if (puerta) { R.rect(pd, y - 24, pd + 8, y - 7, K); R.rect(pd + 1, y - 23, pd + 7, y - 8, H('#2a2a30')); }
  R.rect(x + 64, y - 12, x + 66, y - 9, H('#ffe080')); R.rect(x, y - 12, x + 1, y - 9, H('#d8302a'));
  for (const wx of [x + 12, x + 52]) { R.disco(wx, y - 4, 5, K); R.disco(wx, y - 4, 4, H('#242222')); R.disco(wx, y - 4, 2, H('#8a8a86')); const a = mueve ? t * 14 : 0; R.pset(ri(wx + Math.cos(a) * 2), ri(y - 4 + Math.sin(a) * 2), H('#3a3a3a')); }
};
const s1 = (t) => {
  capa('s1', () => {
    cieloT(74, OTO, [70, 34, 7], RAM('#fffbe0', '#fff4c8', '#ffffff'));
    for (let x = 0; x < 320; x++) { const yh = 66 - ri(4 * Math.sin(x * 0.028 + 1) + 2 * Math.sin(x * 0.1)); for (let y = yh; y < 78; y++) R.pset(x, y, rampa(RAM('#8a92a8', '#a0a8ba', '#b4bac8'), 1 + (y - yh) * 0.12 + (hh(x, y) - 0.5) * 0.4, x, y)); }
    // el cerro redondo a lo lejos, con su moral
    for (let x = 196; x < 300; x++) { const q = (x - 248) / 52, yh = ri(84 - Math.sqrt(Math.max(0, 1 - q * q)) * 22); for (let y = yh; y < 86; y++) R.pset(x, y, rampa(RAM('#8a5a3a', '#a8704a', '#c08a5e', '#d4a274'), 1.6 - q * 0.8 + (hh(x, y, 4) - 0.5) * 0.7, x, y)); }
    // los campos de otoño en franjas, con muretes
    const bandas = RAM('#a8643e', '#c8a868', '#8a5a34', '#b89a5e', '#9a6a40', '#d0b070');
    for (let y = 78; y < 136; y++) for (let x = 0; x < 320; x++) { if (y < 86 && x > 196 && x < 300 && R.pget(x, y) !== 0 && y >= ri(84 - Math.sqrt(Math.max(0, 1 - ((x - 248) / 52) ** 2)) * 22)) continue; const b = Math.floor(((y - 78) ** 1.25) / 8 + x / 120 + Math.sin(x * 0.015) * 0.7), c = bandas[((b % 6) + 6) % 6]; R.pset(x, y, hh(x, y, 5) < 0.2 ? mez(c, K, 0.18) : hh(x, y, 6) < 0.05 ? mez(c, H('#ffffff'), 0.2) : c); }
    for (const yy of [92, 108, 124]) for (let x = 0; x < 320; x++) if (hh(x >> 1, yy) < 0.75) { R.pset(x, yy + ri(Math.sin(x * 0.05) * 1.5), H('#a89a80')); R.pset(x, yy + 1 + ri(Math.sin(x * 0.05) * 1.5), H('#6a5e4a')); }
    // la cuneta y la carretera de tierra con sus rodadas y un charco
    for (let y = 136; y < 168; y++) for (let x = 0; x < 320; x++) { const r = (y > 146 && y < 149) || (y > 157 && y < 160); R.pset(x, y, rampa(RAM('#8a6a4a', '#a8865e', '#c4a276', '#d8bc90'), 2.1 + (hh(x >> 1, y >> 1, 7) - 0.5) * 1.1 - (r ? 1 : 0) - (y < 139 ? 0.8 : 0), x, y)); }
    for (let y = 151; y < 156; y++) for (let x = 226; x < 258; x++) if (((x - 242) / 16) ** 2 + ((y - 153.5) / 2.6) ** 2 < 1) R.pset(x, y, (y === 151) ? H('#c8d8e8') : H('#7a9ab8'));
    for (let y = 168; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rampa(RAM('#6a6a34', '#8a8a44', '#aaa058', '#c8bc70'), 1.6 + (hh(x, y, 3) - 0.5) * 1.6, x, y));
    guijarros(0, 138, 319, 166, 26, 3, [RAM('#6a5a44', '#9a8a70', '#c8b898')]);
    // el mojón de piedra con su número de kilómetro
    R.rect(20, 124, 34, 150, K); R.rect(21, 125, 33, 150, H('#e8e4dc')); R.rect(21, 125, 33, 132, H('#c8302a')); R.rect(30, 125, 33, 150, H('#c8c4bc')); R.numero('15', 27, 144, { color: H('#2a2a30'), sombra: false, centro: true });
    // los postes del teléfono y sus cables
    for (const px of [74, 186, 298]) { R.rect(px - 1, 70, px + 1, 138, K); R.rect(px, 70, px, 138, H('#6a4a2a')); R.rect(px - 8, 74, px + 8, 75, H('#5a3e24')); R.pset(px - 7, 73, H('#e8e8f0')); R.pset(px + 7, 73, H('#e8e8f0')); }
    for (const [a, b] of [[-38, 74], [74, 186], [186, 298], [298, 410]]) for (const dy of [-7, 7]) for (let x = Math.max(0, a); x <= Math.min(319, b); x++) { const f = (x - a) / (b - a); R.pset(x, ri(73 + Math.sin(f * Math.PI) * 6), H('#3a3a40')); }
  });
  nubes(t, 74, RAM('#ffffff', '#e8eef4', '#b8c8d8'), [[30, 36, 44, 2.2], [190, 32, 56, 1.2], [120, 54, 24, 4.5]]);
  moral(248, 63, 0.9, t);
  // los pájaros en el cable, que se cambian de sitio
  for (let k = 0; k < 4; k++) { const f = (k + 1) / 6, x = ri(74 + f * 112), y = ri(73 + Math.sin(f * Math.PI) * 6) - 2, salta = Math.sin(t * 1.3 + k * 2) > 0.92; R.rect(x, y - (salta ? 2 : 0), x + 2, y + 1 - (salta ? 2 : 0), H('#2a2a30')); R.pset(x + 3, y - (salta ? 2 : 0), H('#2a2a30')); }
  // el dolmuş llega, se para, se abre la puerta, baja Schmidt y el dolmuş se va
  const llega = tramo(t, 0.2, 2.6), sale = tramo(t, @T(5.0), S2 + 0.3), bx = ri(lerp(336, 132, 1 - (1 - llega) ** 2) - sale * sale * 260);
  const baja = tramo(t, @T(3.0), @T(4.0)), anda = tramo(t, @T(4.1), @T(5.4)), point = @T(5.82);
  dolmus(bx, 150, t, llega < 1 || sale > 0, llega >= 1 && sale === 0 && t > @T(2.6));
  if (sale > 0 || llega < 1) for (let k = 0; k < 10; k++) { const f = (t * 1.4 + k / 10) % 1; R.disco(ri(bx + 66 + f * 30 + (sale > 0 ? 0 : 0)), ri(148 - f * 8), 1 + ri(f * 3), mez(H('#d8c098'), H('#b8a078'), f)); }
  if (baja > 0) { const xs = ri(lerp(bx + 46, 176, anda)), ys = ri(lerp(150, 164, baja));
    const r = R.actor(GB.schmidtGB, xs, ys, t, { dir: anda > 0 && anda < 1 ? 1 : 1, anda: (baja > 0 && baja < 1) || (anda > 0 && anda < 1), dedo: t > point - 0.1 && t < S2 - 0.3, sonrisa: t > point });
    // la mochila
    R.rect(xs - 2, ys - 18, xs + 2, ys - 9, K); R.rect(xs - 1, ys - 17, xs + 1, ys - 10, H('#6a7a4a')); }
  for (const [x, y, h] of [[10, 178, 8], [60, 176, 6], [150, 179, 9], [210, 177, 7], [304, 178, 8]]) mata(x, y, t, h);
  cardo(270, 179, t, 11); cardo(116, 179, t, 9);
};
// ── 2 · el recuerdo: Nevalı Çori ──
const s2 = (t) => {
  capa('s2', () => {
    cieloT(52, OTO, [250, 26, 7], RAM('#fffbe0', '#fff4c8', '#ffffff'));
    for (let x = 0; x < 320; x++) { const yh = 44 - ri(6 * Math.sin(x * 0.02) + 3 * Math.sin(x * 0.09 + 2)); for (let y = yh; y < 60; y++) R.pset(x, y, rampa(RAM('#7a6a5a', '#9a8a70', '#b4a488'), 1 + (y - yh) * 0.1 + (hh(x, y) - 0.5) * 0.5, x, y)); }
    // el Éufrates en el fondo del valle
    for (let y = 60; y < 70; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rampa(RAM('#2a5a7a', '#3a7a9a', '#5a9ab8', '#9ac8e0'), 1.4 + (hh(x >> 2, y, 3) - 0.5) * 1.2 + (y === 60 ? 1.4 : 0), x, y));
    // el suelo de la excavación y la casa rectangular con sus muros de piedra seca
    for (let y = 70; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rampa(RAM('#8a6a48', '#a8865e', '#c4a276', '#dcc094'), 2.2 + (hh(x >> 1, y >> 1, 4) - 0.5) * 1.0 - (y - 70) / 160, x, y));
    for (let y = 104; y < 160; y++) { const xl = ri(60 - (y - 104) * 0.5), xr = ri(260 + (y - 104) * 0.5); for (let x = xl; x <= xr; x++) R.pset(x, y, rampa(RAM('#b8a888', '#d0c4a4', '#e4dabe', '#f0e8d4'), 2 + (hh(x, y, 9) - 0.5) * 1.1 + (hh(x >> 2, y >> 2, 2) < 0.08 ? -1.2 : 0), x, y)); }
    const piedras = (pts, alto) => { for (const [x0, y0, x1] of pts) for (let x = x0; x < x1; x += 7) for (let j = 0; j < alto; j += 4) { const w = 5 + ri(hh(x, j) * 3); R.rect(x, y0 - j - 4, x + w, y0 - j - 1, K); R.rect(x + 1, y0 - j - 3, x + w - 1, y0 - j - 1, rampa(CALR, 2.2 + hh(x, j, 3) * 1.4, x, j)); R.rect(x + 1, y0 - j - 3, x + w - 1, y0 - j - 3, CALR[4]); } };
    piedras([[56, 104, 262]], 18);
    R.rect(60, 104, 260, 112, K); R.rect(61, 105, 259, 111, H('#c8b890')); R.rect(61, 105, 259, 105, H('#e8dcc0'));
    for (let y = 104; y < 162; y += 4) { const xl = ri(60 - (y - 104) * 0.5), xr = ri(260 + (y - 104) * 0.5); for (const x of [xl - 6, xr]) { R.rect(x, y, x + 6, y + 3, K); R.rect(x + 1, y + 1, x + 5, y + 2, rampa(CALR, 2.5 + hh(x, y) * 1.2, x, y)); } }
    // la cuadrícula de cuerdas y estacas, cubos, un tamiz y sacos
    for (const [a, b, c, d] of [[60, 132, 260, 132], [160, 112, 160, 160]]) R.linea(a, b, c, d, H('#f0e8d0'));
    for (const [x, y] of [[60, 132], [260, 132], [160, 160]]) { R.rect(x - 1, y - 6, x, y, K); R.pset(x, y - 6, H('#d8302a')); }
    for (const [x, y] of [[214, 152], [228, 150]]) { R.rect(x, y - 8, x + 8, y, K); R.rect(x + 1, y - 7, x + 7, y - 1, H('#2a2a30')); R.rect(x + 1, y - 7, x + 7, y - 6, H('#4a4a52')); }
    for (const [x, y] of [[20, 120], [34, 124]]) { R.rect(x, y - 12, x + 10, y, K); R.rect(x + 1, y - 11, x + 9, y - 1, H('#e8dcc0')); R.rect(x + 1, y - 11, x + 9, y - 10, H('#c8bca0')); }
    // las escombreras de tierra a los lados y el toldo de lona sobre palos
    for (const [cx, w, hgt] of [[18, 30, 22], [300, 34, 26]]) for (let x = cx - w; x <= cx + w; x++) { const yh = ri(96 - Math.sqrt(Math.max(0, 1 - ((x - cx) / w) ** 2)) * hgt); for (let y = yh; y < 100; y++) R.pset(x, y, rampa(RAM('#7a5a3e', '#9a7656', '#b8946c', '#d0ae84'), 2 - (x - cx) / w + (hh(x, y, 5) - 0.5) * 0.9, x, y)); }
    for (const x of [214, 258]) { R.rect(x, 70, x + 1, 102, H('#5a3e24')); } R.poligono([[208, 70], [264, 66], [268, 74], [210, 78]], H('#c8b890')); R.linea(208, 70, 264, 66, H('#e8dcc0')); R.linea(210, 78, 268, 74, H('#8a7a5a'));
    R.disco(296, 160, 9, K); R.disco(296, 160, 8, H('#a87a48')); R.disco(296, 160, 6, H('#5a5a60')); for (let k = -6; k <= 6; k += 2) { R.linea(290, 160 + k * 0.5, 302, 160 + k * 0.5, H('#3a3a40')); }
  });
  // el pilar en T empotrado en el banco del fondo
  const tpil = @T(10.96), luz = tramo(t, tpil - 0.3, tpil + 0.3);
  const g = T.d_pilar(R, 160, 112, { escala: 1, luz: 0.5 + luz * 0.4, sem: 3 });
  if (luz > 0) { const p = (0.5 + 0.5 * Math.sin(t * 6)) * luz; for (const [a, b, c, d] of [[146, 48, 176, 48], [146, 48, 146, 58], [176, 48, 176, 58], [150, 58, 150, 112], [171, 58, 171, 112], [146, 58, 150, 58], [171, 58, 176, 58]]) R.linea(a, b, c, d, mez(H('#ffd070'), H('#fff8e0'), p)); }
  // Schmidt (de joven) lo limpia con la brocha y lo señala; un obrero lleva un cubo; el agua brilla
  const xs = 128, sen = t > @T(10.0) && t < S3 - 0.4;
  const r = R.actor(GB.schmidtGB, xs, 128, t, { dir: 1, pal: { H: '#5a4232', h: '#7a5a44' }, dedo: sen, sostiene: sen ? false : [xs + 17, 104 + ri(Math.sin(t * 9) * 3)], sonrisa: t > tpil });
  if (!sen) { const [mx, my] = r.mano; herramienta(mx, my, mx + 4, my - 4, (ax, ay) => { R.rect(ax, ay - 2, ax + 2, ay + 1, K); R.pset(ax + 1, ay - 1, H('#e8d8a0')); }); }
  const uo = ((t - S2) * 0.18) % 1, xo = ri(lerp(320, 190, uo)); R.actor(GB.campesinoGB, xo, 166, t, { dir: -1, anda: true, sostiene: [xo - 3, 152] }); R.rect(xo - 7, 150, xo - 1, 157, K); R.rect(xo - 6, 151, xo - 2, 156, H('#2a2a30'));
  for (let k = 0; k < 8; k++) if (Math.sin(t * 3 + k * 2) > 0.6) R.pset(ri(20 + k * 38 + Math.sin(t + k) * 6), 63 + (k % 3) * 2, H('#e8f4ff'));
  for (let k = 0; k < 8; k++) { const f = (t * 0.15 + k / 8) % 1; R.pset(ri(120 + k * 10 + Math.sin(t + k) * 6), ri(110 - f * 50), mez(H('#fff0c0'), H('#c8a070'), f)); }
  // el recuerdo: tono cálido y viñeta redonda
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 175, (y - 92) / 108); let c = mez(R.pget(x, y), H('#d8a868'), 0.22); if (d > 0.82) c = mez(c, H('#2a1a10'), Math.min(0.85, (d - 0.82) * 3.2) * (di(x, y) < 0.8 ? 1 : 0.7)); R.pset(x, y, c); }
};
// ── 3 · en lo alto: la cabeza del pilar sale de la tierra ──
const s3 = (t) => {
  const sees = @T(13.2), cab0 = @T(13.9), grav = @T(15.48), tops = @T(17.32), cab1 = @T(17.6);
  const u = tramo(t, cab0, cab1);
  T.colina(R, t, { camara: 'losas', epoca: 1994, estacion: 'otono', cabeza: u });
  const ua = tramo(t, S3, sees + 0.2), xs = ri(lerp(236, 198, ua));
  if (t < cab0 - 0.3) R.actor(GB.schmidtGB, xs, 150, t, { dir: -1, anda: ua < 1, sorpresa: t > sees + 0.2 });
  else { const cepilla = u > 0 && u < 1; const r = deRodillas(GB.schmidtGB, 198, 150, t, { dir: -1, sostiene: cepilla ? [186 + ri(Math.sin(t * 8) * 4), 136] : [190, 132], sorpresa: t > tops, pantalon: H('#5a5040') });
    const [mx, my] = r.mano; if (t < tops) herramienta(mx, my, mx - 5, my + 4, (ax, ay) => { R.rect(ax - 2, ay, ax + 1, ay + 2, K); R.pset(ax - 1, ay + 1, H('#e8d8a0')); });
    if (cepilla) for (let k = 0; k < 5; k++) { const f = (t * 2.5 + k / 5) % 1; R.pset(ri(180 - f * 14 + k), ri(134 - f * 10), H('#c8a070')); } }
  // «no son lápidas»: la lápida tachada
  const q = tramo(t, grav - 0.15, grav + 0.2) * (1 - tramo(t, grav + 1.3, grav + 1.6));
  if (q > 0) { const lx = 228, ly = ri(lerp(104, 96, q)); R.rect(lx - 1, ly - 1, lx + 11, ly + 14, K); R.rect(lx, ly + 2, lx + 10, ly + 13, H('#d8d0c0')); R.rect(lx + 2, ly, lx + 8, ly + 1, H('#d8d0c0')); R.rect(lx, ly + 2, lx + 1, ly + 13, H('#a8a090')); R.icono('X', lx - 2, ly - 2, H('#e8402e'), K, 2); }
  // el brillo del zorro cuando se ve entero
  if (t > tops) for (let k = 0; k < 4; k++) { const a = t * 3 + k * 1.57, f = (t * 1.5 + k / 4) % 1; R.pset(ri(170 + Math.cos(a) * 18), ri(130 + Math.sin(a) * 6 - f * 4), H('#fff4c8')); }
  T.colinaDelante(R, t, { camara: 'losas' });
};
// ── 4 · el corte de la colina: el pilar entero bajo tierra y los demás en círculo ──
const s4 = (t) => {
  const TL = [RAM('#3a2216', '#5a3420', '#7a4a2e', '#9a6440'), RAM('#7a6a54', '#9a8a70', '#b8a888', '#d0c4a4'), RAM('#9a907a', '#b8ae96', '#d4ccb4', '#e8e0cc')];
  const lleno = capaB('s4b', () => {
    for (let y = 56; y < 180; y++) for (let x = 0; x < 320; x++) { const k = y < 72 ? 0 : y < 160 ? 1 : 2, v = 1.8 + (hh(x >> 1, y >> 1, k + 2) - 0.5) * 1.3 + (k === 1 && hh(x >> 2, y >> 2, 6) < 0.12 ? 1.2 : 0) + ((y % 13) === 0 && k === 1 ? -0.7 : 0); R.pset(x, y, rampa(TL[k], v, x, y)); }
    guijarros(0, 74, 319, 178, 140, 11, [RAM('#5a4a36', '#8a7a60', '#b8a888'), RAM('#4a3a2a', '#7a6a50', '#a89878'), RAM('#3a3a44', '#5a5a66', '#9a9aa8', '#ffffff')]);
  });
  capa('s4', () => {
    cieloT(52, OTO, null, null);
    for (let x = 0; x < 320; x++) { const yh = 42 - ri(3 * Math.sin(x * 0.03)); for (let y = yh; y < 52; y++) R.pset(x, y, rampa(RAM('#8a92a8', '#a0a8ba', '#b4bac8'), 1 + (y - yh) * 0.12, x, y)); }
    R.copiar(lleno);
    cieloT(52, OTO, null, null); for (let x = 0; x < 320; x++) { const yh = 42 - ri(3 * Math.sin(x * 0.03)); for (let y = yh; y < 52; y++) R.pset(x, y, rampa(RAM('#8a92a8', '#a0a8ba', '#b4bac8'), 1 + (y - yh) * 0.12, x, y)); }
    // la superficie arada con su línea de surcos y el moral
    for (let y = 52; y < 58; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rampa(TL[0], 2.6 + ((x >> 2) % 2 ? 0.6 : -0.4) - (y - 52) * 0.2 + (hh(x, y) - 0.5) * 0.5, x, y));
    R.rect(38, 26, 42, 56, H('#4a3424')); for (const [dx, dy, r, c] of [[-10, 0, 9, '#2e4a28'], [10, 0, 9, '#2e4a28'], [0, -2, 10, '#3a5a30'], [-4, -4, 6, '#4a7038'], [5, 0, 5, '#5a8040']]) R.disco(40 + dx, 30 + dy, r, H(c));
    // las raíces del moral que bajan
    for (const [a, b, c, d] of [[40, 58, 24, 90], [24, 90, 14, 120], [42, 58, 58, 84], [58, 84, 66, 110], [40, 58, 40, 96]]) { R.linea(a, b, c, d, H('#5a3a24')); R.linea(a + 1, b, c + 1, d, H('#3a2416')); }
    // el muro de piedra seca del recinto, en arco detrás de los pilares
    for (let x = 0; x < 320; x += 7) { const yc = ri(122 - Math.sin(x / 320 * Math.PI) * 10); for (let j = 0; j < 36; j += 5) { const w = 5 + ri(hh(x, j) * 3); R.rect(x, yc + j, x + w, yc + j + 4, H('#4a3e30')); R.rect(x + 1, yc + j + 1, x + w - 1, yc + j + 3, rampa(CALR, 1.8 + hh(x, j, 4) * 1.4, x, j)); R.rect(x + 1, yc + j + 1, x + w - 1, yc + j + 1, CALR[3]); } }
    // los pilares del círculo (más lejos, más pequeños) y el central, entero, con la cabeza a ras de suelo
    T.d_pilar(R, 58, 172, { escala: 1.15, sem: 5, sombra: false });
    T.d_pilar(R, 246, 176, { escala: 1.2, sem: 7, sombra: false });
    T.d_pilar(R, 298, 168, { escala: 0.95, sem: 9, sombra: false });
    T.d_pilar(R, 150, 178, { escala: 1.95, sem: 3, luz: 0.4, sombra: false });
    // piedras, un hueso y lascas en el relleno
    guijarros(0, 60, 319, 178, 110, 6, [RAM('#6a5a44', '#9a8a70', '#c8b898'), RAM('#3a3a44', '#5a5a66', '#9a9aa8', '#ffffff')]);
    for (let k = 0; k < 6; k++) { const y = 76 + k * 13; for (let x = 0; x < 320; x++) if (hh(x >> 2, y, k) < 0.6 && R.pget(x, y) !== 0) R.pset(x, y + ri(Math.sin(x * 0.02 + k) * 2), mez(R.pget(x, y), H('#4a3a2a'), 0.35)); }
    R.rect(96, 150, 106, 151, H('#e8e0cc')); R.disco(96, 150, 1, H('#e8e0cc')); R.disco(106, 150, 1, H('#e8e0cc'));
  });
  // la lente que destapa el corte (antes de abrirse, la tierra llena)
  const ab = tramo(t, S4 + 0.1, @T(20.4)), rr = ab * 240;
  if (ab < 1) { const B = R.buf; for (let y = 58; y < 180; y++) for (let x = 0; x < 320; x++) { if (Math.hypot(x - 150, (y - 60) * 1.1) > rr) B[y * 320 + x] = lleno[y * 320 + x]; } for (let a = 0; a < 90; a++) { const ang = a / 90 * Math.PI; R.pset(ri(150 + Math.cos(ang) * rr), ri(60 + Math.sin(ang) * rr / 1.1), H('#ffe0a0')); } }
  // los demás pilares se encienden uno a uno
  const enc = [[58, 106, @T(19.66)], [246, 104, @T(20.6)], [298, 110, @T(21.4)]];
  for (const [x, y, a] of enc) { const f = tramo(t, a, a + 0.4); if (f > 0) { const p = f * (0.6 + 0.4 * Math.sin(t * 4 + x)); for (let k = -16; k <= 16; k++) { R.pset(x + k, y - 1, mez(R.pget(x + k, y - 1), H('#ffd070'), p * 0.7)); } R.pset(x, y - 3, H('#fff4c8')); } }
  // Schmidt diminuto, de rodillas en la superficie, junto a la cabeza que asoma
  deRodillas(GB.schmidtGB, 162, 54, t, { dir: -1, sostiene: [158, 48 + ri(Math.sin(t * 7))], pantalon: H('#5a5040') });
  // la lombriz y el polvo
  const lx = ri(230 + Math.sin(t * 0.7) * 10), ly = 80; for (let i = 0; i < 8; i++) R.pset(lx + i, ly + ri(Math.sin(t * 5 + i) * 1.2), H('#d07a7a'));
  nubes(t, 52, RAM('#ffffff', '#e8eef4', '#b8c8d8'), [[40, 24, 40, 2.6], [200, 30, 48, 1.4]]);
  // «en el primer minuto»: el reloj con su «1»
  const mi = tramo(t, @T(22.6), @T(23.0)); if (mi > 0) { R.icono('reloj', 194, 22, H('#fff4c8'), K, 2); R.numero('1', 222, 36, { tam: 8 }); }
};
// ── 5 · al atardecer: se queda ──
const OCASO = RAM('#2a2a5a', '#4a3a72', '#7a4a7a', '#b85a6a', '#e07a5a', '#f8a860', '#ffd08a');
const s5 = (t) => {
  capa('s5', () => {
    cieloT(132, OCASO, [236, 118, 14], RAM('#ffd890', '#fff0c0', '#fffbe8'));
    for (let x = 0; x < 320; x++) { const yh = 118 - ri(4 * Math.sin(x * 0.03 + 2) + 2 * Math.sin(x * 0.12)); for (let y = yh; y < 134; y++) R.pset(x, y, rampa(RAM('#4a3050', '#5e3a58', '#7a4a60'), 1 + (y - yh) * 0.1 + (hh(x, y) - 0.5) * 0.4, x, y)); }
    // la cima del cerro, oscura, con el borde encendido por el sol
    for (let x = 0; x < 320; x++) { const q = (x - 150) / 230, yh = ri(132 - Math.sqrt(Math.max(0, 1 - q * q)) * 10); for (let y = yh; y < 180; y++) R.pset(x, y, y === yh ? H('#f8a860') : y === yh + 1 ? H('#a85a4a') : rampa(RAM('#1e1420', '#2a1c28', '#3a2830', '#4a3438'), 1.6 - (y - yh) / 60 + (hh(x >> 1, y >> 1, 2) - 0.5) * 0.9 + (((y - yh) % 7) < 2 ? 0.4 : 0), x, y)); }
    for (const [x, w] of [[90, 12], [186, 16], [230, 8]]) { const q = (x - 150) / 230, yh = ri(132 - Math.sqrt(1 - q * q) * 10); R.rect(x, yh - 3, x + w, yh, H('#2a1c24')); R.rect(x, yh - 3, x + w, yh - 3, H('#e8905a')); }
    // los surcos con su filo de luz, las piedras y los cardos a contraluz delante
    for (let y = 140; y < 180; y += 5) for (let x = 0; x < 320; x++) if (hh(x >> 1, y, 3) < 0.75) R.pset(x, y + ri(Math.sin(x * 0.04 + y) * 1.2), mez(H('#3a2830'), H('#c8704a'), 0.35 - (y - 140) / 160));
    for (let k = 0; k < 22; k++) { const x = ri(hh(k, 1, 4) * 320), y = 144 + ri(hh(k, 2, 4) * 34), r = 1 + ri(hh(k, 3, 4) * 3); R.disco(x, y, r, H('#150e16')); R.linea(x - r + 1, y - r, x + r - 1, y - r, H('#d8805a')); }
    for (const [x, y, h] of [[20, 180, 22], [36, 180, 14], [290, 180, 26], [306, 180, 16], [250, 180, 12]]) { R.linea(x, y, x, y - h, H('#150e16')); R.linea(x - 3, y - h / 2, x, y - h / 2 - 3, H('#150e16')); R.linea(x + 3, y - h / 2 + 2, x, y - h / 2 - 1, H('#150e16')); R.disco(x, y - h - 2, 3, H('#150e16')); R.pset(x + 2, y - h - 4, H('#e8905a')); R.pset(x + 3, y - h - 2, H('#e8905a')); }
  });
  nubes(t, 130, RAM('#ffd8a0', '#e8907a', '#7a4a6a'), [[0, 60, 70, 1.2], [170, 84, 56, 2], [90, 40, 40, 3.2], [250, 70, 44, 1.6]]);
  T.bandada(R, t, { tipo: 'ibis', n: 5, y: 50, cada: 7, d: -1 });
  // el moral a contraluz (después de las nubes) con el borde encendido
  R.rect(202, 96, 205, 124, H('#1a1018')); R.linea(204, 108, 194, 98, H('#1a1018')); R.linea(204, 104, 214, 96, H('#1a1018'));
  for (const [dx, dy, r] of [[-12, 0, 11], [12, 0, 11], [0, -6, 13], [-6, -12, 8], [8, -12, 7], [-16, 6, 6], [16, 6, 6]]) R.disco(203 + dx, 92 + dy + ri(Math.sin(t * 1.5 + dx) * 0.6), r, H('#24162a'));
  for (let a = 0; a < 50; a++) { const ang = -Math.PI / 2 + a / 50 * Math.PI * 0.9, rr = 13 + Math.sin(a * 1.7) * 2; R.pset(ri(209 + Math.cos(ang) * rr), ri(88 + Math.sin(ang) * rr), H(a % 3 ? '#c86a5a' : '#f8a860')); }
  // las primeras estrellas
  const st = tramo(t, @T(27.4), S5 + 6); for (let k = 0; k < 22 * st; k++) if (Math.sin(t * 3 + k) > -0.3) R.pset(ri(hh(k, 1, 8) * 270), ri(18 + hh(k, 2, 8) * 40), H('#fff8e0'));
  // las hojas que caen del moral
  for (let k = 0; k < 6; k++) { const f = (t * 0.25 + k / 6) % 1; R.pset(ri(196 + k * 6 + f * 40 + Math.sin(t * 2 + k) * 4), ri(96 + f * 40), H(k % 2 ? '#e8a040' : '#c86a3a')); }
  // Schmidt: da dos pasos para irse, se para, vuelve y se queda
  const walk = @T(26.34), then = @T(27.06), vuelve = @T(27.7), queda = @T(28.5);
  const u1 = tramo(t, walk, then), u2 = tramo(t, vuelve, queda), xs = ri(166 - u1 * 22 + u2 * 22), ys = 132;
  const dir = t > walk && t < vuelve - 0.25 ? -1 : 1;
  silueta(xs - 2, ys - 34, xs + 18, ys + 1, () => R.actor(GB.schmidtGB, xs, ys, t, { dir, anda: (u1 > 0 && u1 < 1) || (u2 > 0 && u2 < 1), quieto: t > queda + 0.6, sonrisa: t > queda }), H('#3a2034'), 0.38);
  for (let j = ys - 26; j < ys; j++) if (R.pget(xs + 14, j) !== R.pget(xs + 15, j)) R.pset(xs + 15, j, H('#f8a860'));
  for (let x = xs + 15; x > xs - 50; x--) if (hh(x, 1) < 0.85) R.pset(x, ys + 1, mez(R.pget(x, ys + 1), K, 0.5));
};
const año = (t) => (t >= S2 && t < S3) ? 1988 : 1994;
const efectos = [[0.4, 'motor'], [@T(3.1), 'puerta'], [@T(5.1), 'arranque'], [@T(10.96), 'brillo'], [@T(13.3), 'pasos'], [@T(14.2), 'papel'], [@T(15.5), 'pop'], [@T(17.32), 'brillo'],
  [@T(18.8), 'whoosh'], [@T(22.84), 'tic'], [@T(26.4), 'pasos'], [@T(27.8), 'pasos']];
T.rodar(E, R, [[0, s1], [S2, s2], [S3, s3], [S4, s4], [S5, s5]], { cartela: '1994', efectos, año });
''')

for _k in list(E):
    _t, _c, _b = E[_k]
    E[_k] = (_t, _c, marcas(_k, _b))
