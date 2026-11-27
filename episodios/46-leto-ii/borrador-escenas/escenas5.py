import re

# LT-PRECIO (frases 16–18: «padre», «multitud», «alia2»), año 21, y LT-TRANVIA (frase 19: «fijate3»), la pausa del
# dilema del tranvía, que congela los planos de lt-precio. En el cuerpo de lt-precio, «@s» es un instante en segundos de
# escena (las palabras inglesas de atomo/build/largo/ep46/linea.json menos el inicio de la escena); al generar se escribe
# como en('marca', fracción) de la frase que suena, y en lt-tranvia (que dibuja los mismos planos congelados) como un
# número fijo. En lt-tranvia, «%s» es un instante de su propia frase (en('fijate3', fracción)).
_MARCAS = [('padre', 0.5, 27.287), ('multitud', 27.687, 43.893), ('alia2', 44.293, 73.419)]


def _en(s):
    k, a, b = _MARCAS[0]
    for m in _MARCAS:
        if s >= m[1] - 0.05:
            k, a, b = m
    return "en('%s', %.4f)" % (k, (s - a) / (b - a))


def _precio(cuerpo):
    return re.sub(r'@(-?\d+(?:\.\d+)?)', lambda m: _en(float(m.group(1))), cuerpo)


def _abs(cuerpo):
    return re.sub(r'@(-?\d+(?:\.\d+)?)', lambda m: m.group(1), cuerpo)


def _tranvia(cuerpo):
    a, b = 0.2, 36.692
    return re.sub(r'%(-?\d+(?:\.\d+)?)', lambda m: "en('fijate3', %.4f)" % ((float(m.group(1)) - a) / (b - a)), cuerpo)


COMUN = r'''
const LT = T.LT, PA = T.PA, AT = T.AT, H = hex, K = H('#1a1424'), ri = Math.round;
const B4M = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4M[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const ns = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h2(xi, yi), b = h2(xi + 1, yi), c = h2(xi, yi + 1), d = h2(xi + 1, yi + 1); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };
const rmp = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return ramp[Math.max(0, Math.min(ramp.length - 1, l))]; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const pal = (a) => a.map((c) => H(c));
const pp = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, H(v)]));
const ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const FIJOS = {};
const horno = (k, f) => { if (!FIJOS[k]) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); FIJOS[k] = b; } return FIJOS[k]; };
const fijo = (k, f) => R.copiar(horno(k, f));
const dentro = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180;
const ps = (x, y, c) => { x = ri(x); y = ri(y); if (dentro(x, y)) R.pset(x, y, c); };
const mezP = (x, y, c, a) => { x = ri(x); y = ri(y); if (dentro(x, y) && a > 0) R.pset(x, y, mez(R.pget(x, y), c, Math.min(1, a))); };
const sombrea = (x, y, a) => mezP(x, y, K, a);
// la zona de Atom (x 278–318, y 4–44) y la barra del año (x 20–170, y 0–20) quedan tranquilas
const tranquilo = (x, y) => (x >= 274 && y <= 48) || (x >= 16 && x <= 174 && y <= 21);
const voz2 = (t) => Math.sin(t * 9) > -0.2;
const flota = (t, k = 0) => Math.round(Math.sin(t * 2.4 + k) * 1.5);
// un búfer de trabajo (máscaras de actores, fantasmas)
let TMP = null;
const enTMP = (f) => { if (!TMP) TMP = R.nuevo(); TMP.fill(0); const prev = R.usar(TMP); const r = f(); R.usar(prev); return r; };
// un personaje de luz (el recuerdo del padre joven): translúcido y teñido
const espectro = (def, x, suelo, t, o, a, tin) => { if (a <= 0.01) return; x = ri(x); suelo = ri(suelo); enTMP(() => R.actor(def, x, suelo, t, o));
  for (let y = Math.max(0, suelo - 40); y < Math.min(180, suelo + 2); y++) for (let xx = Math.max(0, x - 12); xx < Math.min(320, x + 30); xx++) { const c = TMP[y * 320 + xx]; if (c) mezP(xx, y, mez(c, tin, 0.6), a * (0.8 + 0.2 * Math.sin(t * 6 + y * 0.7))); } };
// la venda del predicador y su bastón
const venda = (cab, dir) => { const [cx, cy] = cab, y = cy + 5; for (let i = -4; i <= 4; i++) R.pset(cx + i, y, H('#e8dcc0')); for (let i = -4; i <= 4; i++) R.pset(cx + i, y + 1, H('#c8b898')); R.pset(cx - 5 * dir, y + 1, H('#e8dcc0')); R.pset(cx - 6 * dir, y + 2, H('#c8b898')); };
const baston = (x0, y0, x1, y1) => { R.linea(ri(x0), ri(y0), ri(x1), ri(y1), K); R.linea(ri(x0) + 1, ri(y0), ri(x1) + 1, ri(y1), H('#8a6a44')); ps(x0, y0 - 1, H('#c8a070')); };
const predicador = (x, suelo, t, o = {}) => { const dir = o.dir ?? 1, conB = !o.dedo && !o.brazos && !o.sostiene;
  const a = R.actor(LT.predicadorLT, x, suelo, t, { sostiene: conB ? [x + 7 + dir * 9, suelo - 12] : o.sostiene, ...o });
  if (conB) { const [mx, my] = a.mano; baston(mx, my - 7, mx + dir, suelo); }
  venda(a.cabeza, dir); return a; };
// un pájaro (V de 5 px) que aletea
const pajaro = (x, y, t, c = K, f = 0) => { x = ri(x); y = ri(y); if (tranquilo(x, y)) return; const a = Math.sin(t * 14 + f) > 0;
  ps(x, y, c); ps(x - 1, y - (a ? 1 : 0), c); ps(x + 1, y - (a ? 1 : 0), c); ps(x - 2, y - (a ? 2 : 0), c); ps(x + 2, y - (a ? 2 : 0), c); };
// gente diminuta (3 × 6) para los planos lejanos
const gentecilla = (x, y, c, cab = H('#e8c8a0')) => { x = ri(x); y = ri(y); R.rect(x - 1, y - 4, x + 1, y, c); R.pset(x, y - 5, cab); R.pset(x - 1, y - 4, mez(c, K, 0.3)); R.pset(x - 1, y, K); R.pset(x + 1, y, K); };
// el halcón de los Atreides (7 × 5), no una letra
const HALCON = ['X.....X', 'XX.Hp.X', '.dXXXd.', '..dXd..', '..d.d..'];
const halconB = (cx, cy, o = {}) => { for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) { const ch = HALCON[j][i]; if (ch === '.') continue;
  R.pset(cx - 3 + i, cy - 2 + j, o.c ?? (ch === 'd' ? H('#a8782a') : ch === 'p' ? H('#e07a30') : ch === 'H' ? H('#fff0a0') : H('#f0c848'))); } };
// una sombra en el suelo
const sombraSuelo = (cx, cy, rx, ry, a = 0.45) => { for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 <= 1 && ((i + j) & 1) === 0) mezP(cx + i, cy + j, H('#2a1a20'), a); };

// ── paletas ──
const CN = pal(['#080a1e', '#0e1230', '#161c42', '#202852', '#2c3262', '#3c3c70', '#524a7c', '#6a5884']);   // cielo de noche
const ROCA = pal(['#7a5e58', '#644a48', '#4e3a3c', '#3a2a30', '#281e26', '#1a1420']);                       // roca de noche, de luz a sombra
const DUNA = pal(['#9a8cb8', '#7a6ea0', '#5e5688', '#464070', '#322e58', '#221e40']);                       // dunas de noche
const ARE = pal(['#f4e2b8', '#e6cc98', '#d2b47e', '#ba9a66', '#9a7c50', '#76603e', '#4e3e2a']);            // arenisca, de luz a sombra
const OCASO = pal(['#2a1e48', '#46285a', '#6a3462', '#9a4462', '#c85a5a', '#e8804e', '#f4a85a', '#f8d080']); // cielo del atardecer, de arriba abajo
const FUEGO = pal(['#fff8d8', '#ffe27a', '#ffb648', '#f07a2a', '#c84a20', '#7a2a1a']);
const CALIDO = H('#ff9a48');

// ── el cielo de noche: fijo (degradado tramado, vía láctea, estrellas) y vivo (titilan, nubes de tres tonos, una fugaz) ──
const cieloNoche = (yH, k = 1, o = {}) => {
  for (let y = 0; y < yH; y++) for (let x = 0; x < 320; x++) { const v = (y / yH) * 6.4 + (ns(x * 0.04 + k, y * 0.07) - 0.5) * 0.9; R.pset(x, y, rmp(CN, v, x, y)); }
  for (let x = 0; x < 320; x++) { const yc = (o.via ?? 10) + x * (o.incl ?? 0.22) + Math.sin(x * 0.03 + k) * 8;
    for (let dy = -13; dy <= 13; dy++) { const y = ri(yc + dy); if (y < 0 || y >= yH - 6 || tranquilo(x, y)) continue; const g = (1 - Math.abs(dy) / 13) * (0.3 + 0.6 * ns(x * 0.14, y * 0.22 + k)); if (g > b4(x, y) + 0.2) R.pset(x, y, mez(R.pget(x, y), H('#8a86b8'), 0.3 + g * 0.2)); } }
  for (let i = 0; i < 300; i++) { const x = ri(h2(i, 1, k) * 319), y = ri(h2(i, 2, k) * (yH - 6)); if (tranquilo(x, y)) continue; const b = h2(i, 3, k);
    R.pset(x, y, b > 0.9 ? H('#ffffff') : b > 0.6 ? H('#c8d0f0') : H('#7a80b0')); if (b > 0.96) { R.pset(x + 1, y, H('#8a90c0')); R.pset(x - 1, y, H('#8a90c0')); R.pset(x, y - 1, H('#8a90c0')); R.pset(x, y + 1, H('#8a90c0')); } }
};
const cieloVivo = (t, yH, k = 1, o = {}) => {
  for (let i = 0; i < 40; i++) { const x = ri(h2(i, 5, k) * 319), y = ri(h2(i, 6, k) * (yH - 8)); if (tranquilo(x, y) || (o.m && o.m(x, y))) continue; R.pset(x, y, Math.sin(t * (2 + h2(i, 7, k) * 4) + i) > 0.3 ? H('#ffffff') : H('#5a6090')); }
  const capas = [[0.5, H('#1e2248'), 0.05, o.n0 ?? 26], [1.1, H('#2e3060'), 0.07, o.n1 ?? 40], [2.0, H('#4a4676'), 0.09, o.n2 ?? 58]];
  capas.forEach(([vel, c, fr, yc], i) => { for (let y = yc - 7; y <= yc + 7; y++) for (let x = 0; x < 320; x++) { if (tranquilo(x, y) || y >= yH || y < 0 || (o.m && o.m(x, y))) continue;
    const xx = x + t * vel * 4 + i * 97, v = ns(xx * fr, y * fr * 2.2 + i * 9) - 0.58 - Math.abs(y - yc) / 18; if (v > 0 && v * 6 > b4(x, y)) R.pset(x, y, v > 0.12 ? mez(c, H('#8a84b4'), 0.35) : c); } });
  if (o.fugaz !== false) { const ft = (t + k * 3.1) % 7; if (ft < 0.6) { const u = ft / 0.6, x = 60 + u * 110 + k * 20, y = 30 + u * 24; for (let j = 0; j < 10; j++) { const X = ri(x - j * 1.6), Y = ri(y - j * 0.7); if (!tranquilo(X, Y) && Y < yH) mezP(X, Y, H('#ffffff'), (1 - j / 10) * (1 - u)); } } }
};
const lunaN = (x, y, r) => { R.halo(x, y, r * 2.6, [H('#1e2450'), H('#2a3060'), H('#3a4070')], 1.0); R.disco(x, y, r + 1, K); R.disco(x, y, r, H('#e8e4cc'));
  for (const [dx, dy, rr] of [[-3, -2, 2.2], [3, 2, 1.6], [-1, 4, 1.4], [4, -3, 1.2]]) R.disco(x + dx * r / 9, y + dy * r / 9, rr * r / 9, H('#c8c2a8'));
  for (let a = 0; a < 60; a++) { const p = a / 60 * 6.283; if (Math.cos(p - 2.4) > 0.3) ps(x + Math.cos(p) * (r - 0.5), y + Math.sin(p) * (r - 0.5), H('#a8a490')); } };
// dunas en capas: [base, amplitud, fase, oscuridad]; devuelve la cresta de cada una
const dunas = (capas, ramp = DUNA) => { const cr = [];
  capas.forEach(([base, amp, fase, osc], i) => {
    const Y = (x) => base + Math.sin(x * 0.021 + fase) * amp + Math.sin(x * 0.057 + fase * 2) * amp * 0.4 + Math.sin(x * 0.13 + fase * 3) * amp * 0.12;
    for (let x = 0; x < 320; x++) { const yc = Y(x), d = Y(x + 1) - Y(x - 1);
      for (let y = Math.max(0, ri(yc)); y < 180; y++) { const dy = y - yc;
        let v = osc + dy * 0.035 + d * 4 + (ns(x * 0.08 + i * 5, y * 0.25) - 0.5) * 0.8;
        const rip = Math.sin(x * 0.33 + dy * 1.7 + ns(x * 0.05, y * 0.1) * 5); if (rip > 0.78) v += 0.8; else if (rip < -0.88) v -= 0.5;
        if (dy < 1.2) v -= 1.4; else if (dy < 2.5) v -= 0.6;
        R.pset(x, y, rmp(ramp, v, x, y)); } }
    cr.push(Y); });
  return cr; };
// roca con estratos, grietas y vetas; luz(x, y) suma oscuridad
const roca = (pts, luz = () => 0, k = 3, ramp = ROCA) => R.poligono(pts, (x, y) => { let v = 2 + (ns(x * 0.09 + k, y * 0.3) - 0.5) * 1.6 + Math.sin(y * 0.55 + ns(x * 0.05, y * 0.05) * 6) * 0.35 + luz(x, y);
  if (h2(x >> 2, y >> 1, k) > 0.93) v += 1.1; if ((x * 7 + y * 3 + k) % 23 === 0) v -= 0.6; return rmp(ramp, v, x, y); });
// matojo seco
const matojo = (x, y, t, k = 0, c1 = H('#4a4a3a'), c2 = H('#6a6a48')) => { for (let i = 0; i < 7; i++) { const a = -2.6 + i * 0.36 + Math.sin(t * 2 + k + i) * 0.06; R.linea(ri(x), ri(y), ri(x + Math.cos(a) * (6 + (i & 1) * 3)), ri(y + Math.sin(a) * (6 + (i & 1) * 3)), i & 1 ? c1 : c2); } };
// la luz cálida de una lumbre sobre lo que hay alrededor (radio r, fuerza a)
const luzLumbre = (cx, cy, r, a, t, m) => { const fl = 0.86 + 0.14 * ns(t * 7, 3);
  for (let y = Math.max(0, ri(cy - r)); y <= Math.min(179, ri(cy + r * 0.6)); y++) for (let x = Math.max(0, ri(cx - r)); x <= Math.min(319, ri(cx + r)); x++) {
    if (m && m(x, y)) continue; const d = Math.hypot(x - cx, (y - cy) * 1.25) / (r * fl); if (d >= 1) continue; const g = (1 - d) * (1 - d) * a; if (g > b4(x, y) * 0.35) mezP(x, y, CALIDO, g); } };
// la lumbre: anillo de piedras, leños, brasas, llamas que bailan, chispas y humo
const lumbre = (cx, cy, t, s = 1, o = {}) => {
  const piedra = (an, delante) => { const x = cx + Math.cos(an) * 11 * s, y = cy + Math.sin(an) * 3.5 * s; if ((Math.sin(an) > 0) !== delante) return; R.disco(ri(x), ri(y), ri(2 * s), K); R.disco(ri(x), ri(y) - 1, ri(1.4 * s), Math.cos(an) < 0.2 ? H('#c89a70') : H('#8a6a58')); ps(x - 1, y - 2, H('#f0c8a0')); };
  for (let k = 0; k < 10; k++) piedra(k / 10 * Math.PI * 2 + 0.3, false);
  // los leños cruzados y las brasas
  R.linea(ri(cx - 8 * s), cy + 1, ri(cx + 7 * s), cy - 2, H('#2a1810')); R.linea(ri(cx - 8 * s), cy, ri(cx + 7 * s), cy - 3, H('#6a4428'));
  R.linea(ri(cx - 7 * s), cy - 2, ri(cx + 8 * s), cy + 1, H('#2a1810')); R.linea(ri(cx - 7 * s), cy - 3, ri(cx + 8 * s), cy, H('#7a5030'));
  for (let i = -6; i <= 6; i++) { const b = ns(i * 0.7, t * 3); ps(cx + i * s, cy - 1 + (i & 1), b > 0.6 ? FUEGO[1] : b > 0.4 ? FUEGO[3] : FUEGO[4]); }
  // las llamas: lenguas que suben y bailan con el ruido
  const alto = (o.alto ?? 14) * s * (o.aviva ?? 1);
  for (let i = ri(-6 * s); i <= ri(6 * s); i++) { const u = i / (6.5 * s), base = 1 - u * u, hh = alto * base * (0.55 + 0.55 * ns(i * 0.45 + 3, t * 5.5)) + Math.sin(t * 9 + i) * 0.8;
    for (let j = 0; j < hh; j++) { const v = j / Math.max(1, hh), sway = Math.sin(t * 6 + j * 0.3 + i * 0.2) * j * 0.08; const x = cx + i + sway, y = cy - 2 - j;
      if (v > 0.85 && b4(ri(x), ri(y)) > (1 - v) * 4) continue; ps(x, y, FUEGO[Math.min(5, Math.floor(v * 3.2 + Math.abs(u) * 1.6))]); } }
  for (let k = 0; k < 10; k++) piedra(k / 10 * Math.PI * 2 + 0.3, true);
  // las chispas
  for (let k = 0; k < (o.chispas ?? 8); k++) { const f = (t * (0.5 + h2(k, 1, 4) * 0.5) + h2(k, 2, 4)) % 1, x = cx + (h2(k, 3, 4) - 0.5) * 10 * s + Math.sin(t * 3 + k) * 3 * f, y = cy - alto * 0.6 - f * 34 * s; if (!tranquilo(ri(x), ri(y))) ps(x, y, f < 0.5 ? FUEGO[1] : FUEGO[3]); }
  // el humo, que sube y se lo lleva el viento
  if (o.humo !== false) for (let k = 0; k < 16; k++) { const f = (t * 0.25 + k / 16) % 1, x = cx + f * f * 40 * s + Math.sin(t + k) * 2, y = cy - alto - f * 60 * s; if (!tranquilo(ri(x), ri(y))) { mezP(x, y, H('#8a8098'), 0.35 * (1 - f)); mezP(x + 1, y, H('#8a8098'), 0.25 * (1 - f)); } }
};
// un cántaro (literjon), una cafetera de bronce, un hatillo y una manta enrollada
const cantaro = (x, y) => { for (let j = 0; j < 12; j++) { const w = j < 3 ? 2 : j < 5 ? 3 : 5 - Math.max(0, j - 9); for (let i = -w; i <= w; i++) ps(x + i, y - 12 + j, i === -w || i === w ? K : i < -1 ? H('#6a3a2a') : i > 2 ? H('#4a2a20') : H('#8a4a30')); } R.rect(x - 2, y - 13, x + 2, y - 13, K); ps(x - 2, y - 8, H('#c88a5a')); R.linea(x - 4, y - 5, x + 4, y - 5, H('#3a2018')); };
const cafetera = (x, y, t) => { R.rect(x - 3, y - 6, x + 3, y, K); R.rect(x - 2, y - 6, x + 2, y - 1, H('#c89040')); ps(x - 2, y - 5, H('#ffe0a0')); R.rect(x - 1, y - 8, x + 1, y - 7, H('#a87030')); ps(x, y - 9, K); R.linea(x + 3, y - 4, x + 6, y - 7, K); ps(x + 6, y - 8, H('#c89040'));
  for (let k = 0; k < 4; k++) { const f = (t * 0.6 + k / 4) % 1; mezP(x + 6 + Math.sin(t * 2 + k) * 1.5, y - 9 - f * 10, H('#d8d0e0'), 0.45 * (1 - f)); } };
const hatillo = (x, y, c = H('#6a5a3a')) => { R.disco(x, y - 4, 5, K); R.disco(x, y - 4, 4, c); R.linea(x - 3, y - 6, x + 3, y - 2, mez(c, K, 0.4)); ps(x - 2, y - 7, mez(c, H('#ffffff'), 0.3)); R.rect(x - 1, y - 10, x, y - 8, mez(c, K, 0.3)); };
const manta = (x, y, c1 = H('#8a3a2e'), c2 = H('#d8a040')) => { R.rect(x - 9, y - 6, x + 9, y, K); R.rect(x - 8, y - 5, x + 8, y - 1, c1); for (let i = -8; i <= 8; i += 3) R.rect(x + i, y - 5, x + i, y - 1, c2); R.disco(x + 9, y - 3, 3, K); R.disco(x + 9, y - 3, 2, mez(c1, K, 0.3)); ps(x + 9, y - 3, c2); };
// el ratoncito del desierto (el muad'dib) que salta por la arena
const raton = (x, y, t, dir = 1) => { x = ri(x); y = ri(y); const c = H('#c8a070'), s = H('#7a5a3a'); R.rect(x - 2, y - 2, x + 1, y, c); ps(x + 2 * dir, y - 2, c); ps(x + 2 * dir, y - 3, s); ps(x + 3 * dir, y - 1, K); ps(x + 2 * dir, y - 1, K);
  for (let i = 1; i <= 5; i++) ps(x - (1 + i) * dir, y - Math.round(Math.sin(i * 0.6 + t * 4) * 1), s); ps(x, y + 1, s); ps(x - 1, y + 1, s); };
// la sombra gorda del barón: cuerpo enorme y cabeza pequeña, sin cara (o.ancho: de flaca a gorda)
const baron = (cx, by, s, a, o = {}) => {
  if (a <= 0.01) return;
  const wf = o.ancho ?? 1, bw = 15 * s * wf, bh = 26 * s, hr = 6.5 * s * Math.max(0.7, Math.sqrt(wf)), cy = by - bh * 0.5, hcy = by - bh - hr * 0.6;
  for (let y = ri(hcy - hr - 1); y <= by; y++) for (let x = ri(cx - bw - 2); x <= ri(cx + bw + 2); x++) {
    if (!dentro(x, y) || (o.m && o.m(x, y)) || tranquilo(x, y)) continue;
    const dx = (x - cx) / bw, dy = (y - cy) / (bh * 0.56), d = dx * dx + dy * dy, hx = (x - cx) / hr, hy = (y - hcy) / hr, dh = hx * hx + hy * hy, m = Math.min(d, dh);
    if (m > 1.12) continue; const borde = m > 0.8; if (borde && b4(x, y) > (1.12 - m) * 2.5) continue;
    sombrea(x, y, a * (borde ? 0.55 : 0.85)); if (borde && !o.sinFilo) mezP(x, y, H('#5a1424'), a * 0.25); }
};
// el brillo de la piel de truchas: chispas gris azuladas que recorren al chibi
const brillaPiel = (x, suelo, t, a = 1) => { for (let k = 0; k < 6; k++) { const f = (t * 1.6 + k / 6) % 1, px = x + 3 + h2(k, 1, 9) * 10, py = suelo - 2 - f * 24; if (a * (1 - f) > 0.2) { ps(px, py, H('#d8e8f8')); mezP(px + 1, py, H('#8aa8c8'), 0.6 * a); } } };
'''

PRECIO = r'''
// ════════════════════ A · LA LUMBRE (fondo local): tres cámaras de la misma noche ════════════════════
// 'cerca': la lumbre al pie de dos rocas, el cielo de estrellas con la luna; los props del campamento
const hogueraCerca = () => horno('hoguera-cerca', () => {
  cieloNoche(118, 3, { via: 6, incl: 0.18 });
  lunaN(232, 62, 8);
  dunas([[96, 5, 1.0, 2.7], [108, 6, 2.4, 2.1], [128, 4, 0.6, 1.5]]);
  // la roca grande de la derecha y la pequeña de la izquierda (la luz de la luna arriba a la izquierda)
  roca([[192, 156], [198, 120], [212, 92], [234, 74], [256, 70], [270, 76], [292, 64], [320, 66], [320, 156]], (x, y) => (x > 250 ? 0.9 : 0) + (y > 130 ? 0.5 : 0) - (y < 90 ? 0.6 : 0), 5);
  roca([[0, 152], [0, 98], [14, 90], [34, 94], [52, 112], [62, 152]], (x, y) => (x > 40 ? 0.8 : 0) + (y > 130 ? 0.4 : 0), 8);
  // el suelo del campamento: arena con rizaduras y piedrecitas
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < 152 && (x < 60 || x > 196)) continue; let v = 1.6 + (y - 140) * 0.04 + (ns(x * 0.1, y * 0.3) - 0.5) * 0.9;
    const rip = Math.sin(x * 0.4 + y * 1.3 + ns(x * 0.04, y * 0.1) * 6); if (rip > 0.8) v -= 0.7; else if (rip < -0.85) v += 0.6; R.pset(x, y, rmp(DUNA, v, x, y)); }
  for (let i = 0; i < 40; i++) { const x = ri(h2(i, 1, 33) * 318), y = ri(146 + h2(i, 2, 33) * 32); R.pset(x, y, K); R.pset(x, y - 1, H('#8a7a9a')); }
  // huellas en la arena que llegan desde la izquierda
  for (let k = 0; k < 7; k++) { const x = 20 + k * 11, y = 170 - k * 1.4 + (k & 1) * 3; R.rect(x, ri(y), x + 2, ri(y) + 1, H('#2a2448')); }
  // la manta enrollada, el cántaro de agua y el hatillo
  manta(244, 166); cantaro(52, 152); hatillo(70, 166);
});
const OH = { fuego: [160, 156] };
const ph2 = (t, o = {}) => {
  R.copiar(hogueraCerca());
  cieloVivo(t, 96, 3, { m: (x, y) => x > 190 && y > 60 });
  const aviva = 1 + 0.5 * Math.max(0, 1 - Math.abs(t - @7.6) / 0.5);
  luzLumbre(160, 152, 110, 0.55, t, (x, y) => y < 64);
  // el guía, detrás de la lumbre, echa una rama en «before he speaks»
  const echa = cl((t - @7.0) / 0.5), gx = 182;
  const g = R.actor(LT.guiaLT, gx, 146, t, { dir: -1, sostiene: echa < 1 ? [gx - 2 - ri(echa * 6), 132 + ri(echa * 6)] : undefined, sonrisa: t > @9.0 });
  if (echa < 1) { const [mx, my] = g.mano; R.linea(mx, my, mx - 6, my - 4, H('#3a2418')); R.linea(mx - 1, my - 1, mx - 6, my - 5, H('#7a5030')); }
  else if (t < @7.6) { const u = cl((t - @7.0 - 0.5) / 0.4); R.linea(ri(lerp(170, 158, u)), ri(lerp(136, 150, u)), ri(lerp(164, 154, u)), ri(lerp(132, 148, u)), H('#7a5030')); }
  lumbre(160, 156, t, 1, { aviva, chispas: t > @7.6 && t < @8.6 ? 22 : 8 });
  cafetera(178, 162, t);
  // Leto llega del oscuro y se para en seco en «recognizes»: «!»; en «father, Paul» le asoma al ciego, de luz, el padre joven
  const ul = cl((t - @5.5) / 0.7), lx = ri(lerp(58, 92, ease(ul))), reco = t > @5.75;
  R.actor(LT.letoPielLT, lx, 160, t, { dir: 1, anda: ul > 0 && ul < 1, sorpresa: reco && t < @8.3, sonrisa: t > @9.1, triste: t > @10.4, quieto: o.quieto });
  if (reco && t < @7.0) R.icono('!', lx + 6, 124 - ri(Math.min(1, (t - @5.75) * 5) * 3), H('#ffe080'), K, 2);
  if (!o.sinBrillo) brillaPiel(lx, 160, t, 0.6);
  // el predicador: levanta la cara hacia él en «before he speaks»; habla en «never died»
  const px = 206, pa = predicador(px, 158, t, { dir: -1, habla: t > @9.9 && t < @11.4 && voz2(t), sorpresa: t > @6.6 && t < @8.2, triste: t > @11.4 });
  const ap = Math.min(cl((t - @8.2) / 0.6), cl((@11.6 - t) / 1.0));
  espectro(PA.paul, px, 158, t, { dir: -1, sonrisa: true, quieto: true }, ap * 0.75, H('#9ad8ff'));
  if (ap > 0) R.halo(px + 7, 140, 22, [H('#1a2440'), H('#3a5a8a')], 0.5 * ap);
  // en «sand» una ráfaga levanta la arena del suelo
  const ra = cl((t - @10.4) / 1.4); if (ra > 0 && ra < 1) for (let k = 0; k < 40; k++) { const f = (ra * 1.6 + h2(k, 1, 7)) % 1, x = -10 + f * 340, y = 150 + h2(k, 2, 7) * 28 - Math.sin(f * 7 + k) * 2; mezP(x, y, H('#b8a8d0'), 0.55 * Math.sin(ra * Math.PI)); }
};

// 'lejos': la lumbre diminuta al pie de la mesa de roca, bajo un cielo enorme; Atom luciérnaga baja a escuchar
const hogueraLejos = () => horno('hoguera-lejos', () => {
  cieloNoche(150, 7, { via: -4, incl: 0.34 });
  lunaN(62, 64, 12);
  // la mesa de roca y las dunas en cuatro términos
  dunas([[122, 6, 0.4, 3.4], [134, 8, 1.8, 2.8]]);
  roca([[178, 152], [186, 116], [196, 104], [262, 102], [272, 112], [282, 152]], (x, y) => (x > 250 ? 1.0 : 0) + (y < 108 ? -0.8 : 0) + 0.6, 11);
  for (let x = 196; x < 262; x++) R.pset(x, 104, H('#8a6e66'));
  dunas([[150, 6, 3.0, 2.3], [164, 5, 4.4, 1.6]]);
  for (let i = 0; i < 18; i++) { const x = ri(h2(i, 3, 44) * 318), y = ri(156 + h2(i, 4, 44) * 22); matojo(x, y, 0, i, H('#2a2440'), H('#3a3456')); }
});
// una figura lejana (7 × 13): cabeza, túnica y el filo de luz de la lumbre del lado que mira
const figura = (x, y, c, dir, pelo, t) => { x = ri(x); y = ri(y); const b = Math.sin(t * 2) > 0.6 ? 1 : 0;
  for (let j = 0; j < 9; j++) { const w = 2 + (j > 4 ? 1 : 0); for (let i = -w; i <= w; i++) ps(x + i, y - j, i * dir >= w - 1 ? H('#ffa860') : c); }
  R.disco(x, y - 11 + b, 3, K); R.disco(x, y - 11 + b, 2, H('#e8b088')); for (let i = -2; i <= 2; i++) ps(x + i, y - 13 + b, pelo); ps(x - dir * 2, y - 12 + b, pelo); ps(x + dir * 2, y - 11 + b, H('#ffd0a0')); };
const ph3 = (t, o = {}) => {
  R.copiar(hogueraLejos());
  cieloVivo(t, 118, 7, { n0: 30, n1: 52, n2: 76, fugaz: false });
  // una estrella fugaz en «no longer see»
  const ft = (t - @15.8) / 0.7; if (ft > 0 && ft < 1) for (let j = 0; j < 14; j++) { const X = ri(110 + ft * 90 - j * 1.6), Y = ri(40 + ft * 30 - j * 0.6); if (!tranquilo(X, Y)) mezP(X, Y, H('#ffffff'), (1 - j / 14) * (1 - ft * 0.6)); }
  luzLumbre(200, 150, 46, 0.7, t);
  // la lumbre pequeña y sus dos figuras (la del ciego, con su bastón; la del niño pelirrojo), lamidas por la luz
  lumbre(200, 153, t, 0.5, { alto: 14, chispas: 6 });
  figura(186, 154, H('#6a5a4a'), 1, H('#d8c8a8'), t); figura(214, 154, H('#2a2a3a'), -1, H('#c84a20'), t + 1);
  R.linea(181, 141, 182, 154, H('#8a6a44'));
  // la conversación: lucecitas que suben por turnos de uno y de otro
  if (t > @13.0 && t < @17.2) { const turno = Math.floor((t - @13.0) / 0.9) % 2, x = turno ? 216 : 184; for (let k = 0; k < 3; k++) { const f = ((t - @13.0) * 1.2 + k / 3) % 1; ps(x + (turno ? k * 2 : -k * 2), 136 - f * 14, H('#ffe8b0')); } }
  // el ratoncito del desierto salta por la cresta de delante
  const rx = ((t * 18) % 400) - 40, ry = 164 - Math.abs(Math.sin(t * 6)) * 4; raton(rx, ry, t, 1);
  // Atom, lucecita, baja planeando hasta la lumbre en «by the fire» y se queda a escuchar
  const ua = ease(cl((t - @12.5) / 1.6)), ax = lerp(36, 222, ua), ay = lerp(70, 136, ua) - Math.sin(ua * Math.PI) * 16 + flota(t);
  AT.luciernaga(R, ax, ay, t, { dir: 1, cara: t > @15.8 ? 'triste' : 'sonrisa', brillo: 0.8 });
};

// 'lado': de lado y a ras de suelo; la luna enorme sale tras el horizonte; cada uno sentado en su piedra
const hogueraLado = () => horno('hoguera-lado', () => {
  cieloNoche(126, 13, { via: 30, incl: -0.12 });
  lunaN(72, 112, 22);
  dunas([[112, 4, 2.0, 2.9], [122, 5, 0.4, 2.4], [140, 3, 1.3, 1.8]]);
  for (let i = 0; i < 60; i++) { const x = ri(h2(i, 1, 55) * 318), y = ri(150 + h2(i, 2, 55) * 28); R.pset(x, y, K); R.pset(x + 1, y, H('#7a6e96')); }
  for (const [x, y, k] of [[20, 168, 1], [292, 160, 2], [258, 176, 3]]) matojo(x, y, 0, k);
  cantaro(80, 166); hatillo(240, 168, H('#5a4a6a'));
});
const asiento = (x0, x1, y0, k) => roca([[x0, 176], [x0 + 2, y0 + 4], [x0 + 8, y0], [x1 - 6, y0 - 1], [x1 - 1, y0 + 5], [x1, 176]], (x, y) => (y > y0 + 8 ? 0.6 : -0.4) + (x > x1 - 8 ? 0.7 : 0), k);
const ph4 = (t, o = {}) => {
  R.copiar(hogueraLado());
  cieloVivo(t, 104, 13, { n0: 22, n1: 40, n2: 60, m: (x, y) => Math.hypot(x - 72, y - 112) < 24 });
  // «sees further than anyone»: desde los ojos de Leto, una hilera de lucecitas que corre por el horizonte hasta el borde
  const ve = cl((t - @17.8) / 0.9);
  if (ve > 0) for (let k = 0; k < 26; k++) { const u = k / 26; if (u > ve) break; const x = 214 + u * 108, y = 116 - Math.sin(u * 3) * 3; if (x < 320) { mezP(x, y, H('#9ad8ff'), 0.9 - u * 0.4); if (k % 4 === 0) mezP(x, y - 1, H('#ffffff'), 0.7); } }
  luzLumbre(160, 160, 96, 0.6, t, (x, y) => y < 96);
  // «golden path»: las chispas suben y se ordenan en un arco de oro que une a los dos
  const og = cl((t - @21.5) / 0.9);
  lumbre(160, 166, t, 1.1, { aviva: 1 + og * 0.4, chispas: 9 });
  if (og > 0) for (let k = 0; k < 60; k++) { const u = k / 60; if (u > og) break; const x = lerp(112, 210, u), y = 150 - Math.sin(u * Math.PI) * 52 + Math.sin(t * 3 + k) * 0.6; const on = (k + Math.floor(t * 8)) % 5 !== 0;
    ps(x, y, on ? H('#ffe27a') : H('#fff8d8')); ps(x, y + 1, H('#f0c848')); mezP(x, y - 1, H('#fff0a0'), 0.5); }
  // el padre, en su piedra de la izquierda, confiesa (habla) y se entristece; el hijo, en la de la derecha, alza la vista
  const pa = predicador(106, 160, t, { dir: 1, habla: t > @19.6 && t < @22.4 && voz2(t), triste: t > @22.0, sonrisa: og > 0.5 && t < @22.0 });
  const lv = R.actor(LT.letoPielLT, 202, 160, t, { dir: -1, sorpresa: t > @17.8 && t < @18.8, sonrisa: og > 0.4, quieto: o.quieto });
  if (ve > 0) { const [cx, cy] = lv.cabeza; ps(cx - 3, cy + 5, H('#9ad8ff')); ps(cx + 1, cy + 5, H('#9ad8ff')); mezP(cx - 3, cy + 4, H('#ffffff'), 0.6); }
  asiento(94, 126, 152, 21); asiento(198, 228, 152, 22);
  cafetera(184, 172, t);
  for (let k = 0; k < 3; k++) { const x = (t * 9 + k * 120) % 360 - 20; ps(x, 176 - k * 3, H('#8a80a8')); ps(x - 3, 176 - k * 3, H('#6a6090')); }
};

// 'pared': la pared de roca enorme lamida por la lumbre; las sombras de los dos, gigantes; el padre le toca la cara
const paredRoca = () => horno('pared-roca', () => {
  // la roca: losas y bloques irregulares (facetas que miran a la luz o a la sombra), grietas finas, vetas y poros
  const ROCAF = pal(['#d8a07a', '#b88060', '#966450', '#744c42', '#563634', '#3a2628', '#261a20']);
  for (let y = 0; y < 154; y++) for (let x = 0; x < 320; x++) {
    const bx = Math.floor((x + ns(x * 0.05, y * 0.05) * 14) / 26), by = Math.floor((y + ns(x * 0.04 + 7, y * 0.04) * 10 + (bx & 1) * 9) / 18);
    const cara = h2(bx, by, 63), fx = ((x + ns(x * 0.05, y * 0.05) * 14) % 26) / 26, fy = ((y + ns(x * 0.04 + 7, y * 0.04) * 10 + (bx & 1) * 9) % 18) / 18;
    let v = 1.6 + cara * 1.4 + (ns(x * 0.12, y * 0.2) - 0.5) * 0.9 + (154 - y) * 0.022;
    if (fx < 0.05 || fy < 0.07) v += 1.6; else if (fx > 0.9 || fy > 0.88) v -= 0.5;
    if (Math.sin(y * 0.9 + x * 0.05 + ns(x * 0.1, y * 0.1) * 3) > 0.92) v += 0.5; if (h2(x, y, 61) > 0.97) v += 0.9;
    if (y < 44) v += (44 - y) * 0.07;   // arriba, donde no llega la lumbre: oscuro y tranquilo (la barra del año, Atom)
    R.pset(x, y, rmp(ROCAF, v, x, y)); }
  // cornisas con matas y viejas marcas de manos en la roca (tribu fremen: solo palmas)
  for (const [x0, x1, y] of [[34, 92, 62], [216, 262, 88], [110, 150, 110]]) { R.rect(x0, y, x1, y, H('#c8906a')); R.rect(x0, y + 1, x1, y + 2, H('#3a2628')); matojo(x0 + 8, y, 0, x0, H('#3a4a3a'), H('#5a6a48')); }
  for (const [x, y] of [[236, 120], [248, 116], [60, 100]]) { R.disco(x, y, 3, H('#8a4a3a')); for (let k = -2; k <= 2; k++) R.linea(x + k * 1.2, y - 3, x + k * 1.6, y - 6 + Math.abs(k), H('#8a4a3a')); }
  // el suelo: arena con rizaduras, el bastón tumbado, las tazas
  const SUELO = pal(['#b88a6a', '#9a7058', '#7a5648', '#5a3e3a', '#3e2a2c']);
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 1.3 + (y - 150) * 0.06 + Math.abs(x - 158) * 0.006 + (ns(x * 0.1, y * 0.3) - 0.5) * 0.9; const rip = Math.sin(x * 0.35 + y * 1.4 + ns(x * 0.05, y * 0.1) * 6); if (rip > 0.8) v -= 0.6; else if (rip < -0.88) v += 0.5; R.pset(x, y, rmp(SUELO, v, x, y)); }
  for (let y = 150; y < 157; y++) for (let x = 0; x < 320; x++) if (b4(x, y) < (157 - y) / 8) R.pset(x, y, H('#3a2628'));
  for (let i = 0; i < 30; i++) { const x = ri(h2(i, 1, 64) * 318), y = ri(158 + h2(i, 2, 64) * 20); R.pset(x, y, K); R.pset(x + 1, y, H('#c89a7a')); }
  baston(60, 168, 96, 172); manta(266, 170, H('#5a3a6a'), H('#c8a040')); cantaro(30, 166);
});
const ph5 = (t, o = {}) => {
  R.copiar(paredRoca());
  const F = [158, 170], kz = 3.0;
  // las máscaras de los dos (y la del gusano) para proyectar sus sombras en la pared
  const tocar = cl((t - @25.0) / 0.6) * cl((@27.6 - t) / 0.3), px = 140, lx = 164, suelo = 164;
  const opP = { dir: 1, triste: t > @23.0 && tocar < 0.5, sonrisa: tocar > 0.5, habla: t > @22.6 && t < @24.6 && voz2(t), sostiene: tocar > 0 ? [ri(lerp(152, 165, tocar)), ri(lerp(156, 146, tocar))] : undefined, quieto: o.quieto };
  const opL = { dir: -1, sonrisa: tocar > 0.6, triste: t > @23.2 && tocar < 0.6, quieto: o.quieto };
  enTMP(() => { R.actor(LT.predicadorLT, px, suelo, t, opP); R.actor(LT.letoPielLT, lx, suelo, t, opL); });
  const gus = ease(cl((t - @26.5) / 1.0)), fl = 0.97 + 0.03 * Math.sin(t * 11);
  for (let y = 0; y < 152; y++) for (let x = 0; x < 320; x++) {
    if (tranquilo(x, y)) continue;
    const sx = ri(F[0] + (x - F[0]) / (kz * fl)), sy = ri(F[1] + (y - F[1]) / (kz * fl)); let s = sx >= 0 && sx < 320 && sy >= 0 && sy < 180 && TMP[sy * 320 + sx] ? 1 : 0;
    // en «become» la sombra del niño se vuelve la de un gusano enorme que sube por la roca, con anillos y la boca redonda
    if (!s && gus > 0) { const u = (y - 20) / 130; if (u > 0 && u < 1) { const cxw = 196 + Math.sin(u * 3.4) * 26, w = (8 + 20 * Math.sin(Math.min(1, u * 1.3) * Math.PI * 0.5)) * gus; if (y > 152 - 132 * gus && Math.abs(x - cxw) < w) s = (Math.floor(y / 9) % 2 === 0 && Math.abs(x - cxw) > w - 2) ? 0.7 : 1; }
      const hx = 196 + Math.sin(0.2 * 3.4) * 26, hy = 152 - 132 * gus, rr = Math.hypot(x - hx, (y - hy) * 1.2); if (gus > 0.6 && rr < 20 * gus) s = rr < 12 * gus && (Math.atan2(y - hy, x - hx) * 4 + 20) % 2 < 1 ? 0.4 : 1; }
    if (s) sombrea(x, y, 0.72 * s); }
  // la luz de la lumbre: cálida abajo en el centro, que tiembla
  luzLumbre(158, 168, 180, 0.55, t);
  predicador(px, suelo, t, opP);
  R.actor(LT.letoPielLT, lx, suelo, t, opL);
  if (tocar > 0.9 && gus < 0.5) for (let k = 0; k < 5; k++) { const f = (t * 0.8 + k / 5) % 1; ps(162 + Math.sin(k * 2 + t) * 4, 146 - f * 16, mez(H('#ffe8a0'), H('#ffb060'), f)); }
  if (gus > 0) brillaPiel(lx, suelo, t, gus);
  lumbre(156, 176, t, 1.3, { aviva: 1 + 0.6 * gus, humo: false, chispas: 10 });
};

// ════════════════════ B · El regreso: el desierto al ocaso, con Arrakeen en el horizonte ════════════════════
const O6 = { encuadre: 'desierto', hora: 'ocaso' };
const ciudadLejos = (t, brillo) => {
  // la silueta de Arrakeen a la derecha del horizonte: murallas, cúpulas, torres de viento y la ciudadela
  const S = H('#4a2a3a'), S2 = H('#3a2030');
  R.rect(232, 84, 319, 92, S); for (let x = 232; x < 320; x += 6) R.rect(x, 82, x + 2, 84, S);
  for (const [x, r] of [[246, 5], [268, 7], [300, 6]]) { R.disco(x, 82, r, S2); R.rect(x - r, 82, x + r, 86, S2); }
  for (const x of [254, 286, 312]) { R.rect(x, 72, x + 3, 84, S2); R.rect(x - 1, 72, x + 4, 73, S); }
  R.rect(272, 62, 280, 84, S2); R.rect(270, 60, 282, 62, S); R.disco(276, 58, 3, S2);
  for (let i = 0; i < 14; i++) { const x = 234 + ri(h2(i, 1, 66) * 84), y = 85 + ri(h2(i, 2, 66) * 5); ps(x, y, mez(H('#f8c060'), S, 1 - brillo * (0.5 + 0.5 * Math.sin(t * 3 + i)))); }
  if (brillo > 0) { ps(276, 66, H('#ffe080')); mezP(276, 65, H('#fff4c0'), brillo); }
};
const ph6 = (t, o = {}) => {
  T.planeta(R, t, O6);
  ciudadLejos(t, cl((t - @28.3) / 0.6));
  // los tres caminan juntos por la cresta hacia la ciudad: el guía delante, el ciego con la mano en su hombro, Leto al lado
  const u = (t - @27.7) * 19;
  const gx = ri(118 + u), pxx = ri(100 + u), lx = ri(74 + u);
  R.actor(LT.letoPielLT, lx, 150, t, { dir: 1, anda: true, sonrisa: t > @28.9 });
  predicador(pxx, 150, t, { dir: 1, anda: true, sostiene: [pxx + 16, 136], sonrisa: t > @28.8 });
  R.actor(LT.guiaLT, gx, 150, t, { dir: 1, anda: true, dedo: t > @28.4 && t < @29.6 });
  for (let k = 0; k < 9; k++) { const x = lx - 8 - k * 6, y = 151 + (k & 1); if (x > 0) R.rect(x, y, x + 1, y, H('#a8603a')); }
  T.planetaDelante(R, t, O6);
};

// ════════════════════ C · La plaza llena: un destello entre la multitud y el predicador ya no está ════════════════════
const O7 = { encuadre: 'balcon', camara: 'multitud' };
const pozo = (x0, x1, y0, t) => { const y1 = 152;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0); let v = 1.4 + Math.abs(u - 0.35) * 2.4 + (ns(x * 0.3, y * 0.3) - 0.5) * 0.6 + (y < y0 + 3 ? -0.6 : 0); if ((x - x0) % 14 === 0) v += 1.2; if ((y - y0) % 7 === 3) v += 0.9; R.pset(x, y, rmp(ARE, v, x, y)); }
  R.rect(x0 - 2, y0 - 2, x1 + 2, y0, ARE[3]); R.rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, ARE[0]); R.rect(x0 - 2, y0 + 1, x1 + 2, y0 + 1, ARE[5]);
  halconB(ri((x0 + x1) / 2), y0 + 10, { c: H('#a8845a') });
  for (let j = 0; j < 6; j++) { const y = y0 + 3 + ((t * 30 + j * 3) % 18); R.pset(x1 - 4, ri(y), H('#9ad0f0')); } };
const ph7 = (t, o = {}) => {
  T.ciudadela(R, t, O7);
  // el claro de losas que la gente deja alrededor del pozo (a la derecha esta vez)
  for (let y = 120; y < 160; y++) for (let x = 140; x < 290; x++) { const d = ((x - 214) / 74) ** 2 + ((y - 148) / 28) ** 2; if (d < 1) R.pset(x, y, rmp(ARE, 1.8 + ((x + (Math.floor(y / 5) & 1) * 6) % 12 === 0 || y % 5 === 0 ? 1.2 : 0) + d * 1.2 + (ns(x * 0.2, y * 0.3) - 0.5) * 0.6, x, y)); }
  const fl = cl((t - @34.15) / 0.25), fo = cl((t - @34.4) / 1.0), ido = t > @34.45;
  // los de Alia: dos capuchas oscuras que se abren paso entre la gente en «Alia's men» (y desaparecen con el destello)
  const ah = ease(cl((t - @33.3) / 0.8));
  if (!ido) for (const [x0, x1] of [[150, 184], [292, 246]]) { const x = ri(lerp(x0, x1, ah)); R.actor(PA.fremen, x, 140, t, { dir: x1 > x0 ? 1 : -1, anda: ah > 0 && ah < 1, pal: pp({ C: '#2a2030', c: '#1a1420', H: '#1a1420', h: '#2a2030' }) }); }
  // el corro que escucha: se sorprende y se agacha en el destello, luego mira el brocal vacío
  const sus = t > @34.2 && t < @36.2;
  R.actor(PA.fremenMujer, 264, 152, t, { dir: -1, sorpresa: sus, triste: t > @36.2, salto: sus ? 0 : 0 });
  R.actor(EL.ciudadanoLT, 150, 150, t, { dir: 1, sorpresa: sus, triste: t > @36.2, sonrisa: t < @33.4 });
  pozo(196, 232, 128, t);
  // el predicador en el brocal, con los brazos arriba, hablando a la multitud (hasta el destello)
  if (!ido) predicador(206, 128, t, { dir: -1, habla: voz2(t), brazos: t > @32.0 && t < @33.6, dedo: t >= @33.6 });
  // el guía, junto al pozo; tras el destello mira el brocal vacío
  R.actor(LT.guiaLT, 238, 150, t, { dir: -1, sorpresa: sus, triste: t > @36.2 });
  // Leto, al pie del pozo: se sobresalta y en «loses his father» sube la mano hacia el brocal vacío
  const llega = ease(cl((t - @35.4) / 0.9)), lx = ri(lerp(170, 184, llega));
  R.actor(LT.letoPielLT, lx, 152, t, { dir: 1, sorpresa: sus, triste: t > @36.4, anda: llega > 0 && llega < 1, sostiene: t > @36.5 ? [lx + 16, 132] : undefined, quieto: o.quieto });
  // la venda cae despacio meciéndose hasta el brocal
  if (ido) { const u = cl((t - @34.6) / 2.2), vx = 210 + Math.sin(u * 9) * 6 * (1 - u), vy = lerp(104, 125, u); R.rect(ri(vx) - 3, ri(vy), ri(vx) + 3, ri(vy), H('#e8dcc0')); R.rect(ri(vx) - 2, ri(vy) + 1, ri(vx) + 2, ri(vy) + 1, H('#c8b898')); }
  // el destello: un sol blanco entre la gente, con rayos, que lo borra todo un instante (sin armas, sin cuerpo)
  if (fl > 0 && fo < 1) { const a = Math.min(fl, 1 - fo), r = 10 + 40 * fl;
    for (let y = ri(112 - r); y <= ri(112 + r); y++) for (let x = ri(210 - r); x <= ri(210 + r); x++) { const d = Math.hypot(x - 210, (y - 112) * 1.15) / r; if (d < 1) { const g = a * Math.pow(1 - d, 1.2) * 1.6; if (g > b4(x, y) * 0.6) mezP(x, y, d < 0.35 ? H('#ffffff') : H('#fff4c8'), Math.min(1, g)); } }
    for (let k = 0; k < 12; k++) { const an = k / 12 * Math.PI * 2 + t; for (let q = 6; q < r * 1.4; q++) mezP(210 + Math.cos(an) * q, 112 + Math.sin(an) * q * 0.8, H('#ffffff'), a * (1 - q / (r * 1.4))); } }
  // las palomas del brocal echan a volar
  if (t > @34.3) for (let k = 0; k < 6; k++) { const f = (t - @34.3) * (0.8 + h2(k, 1, 3) * 0.4); pajaro(214 + k * 6 + f * 40, 118 - k * 2 - f * 46, t, H('#e8e0d0'), k); }
  else for (let k = 0; k < 4; k++) ps(222 + k * 4, 125, H('#e8e0d0'));
  T.ciudadelaDelante(R, t, O7);
};

// ════════════════════ D · La escalinata (fondo local): Leto solo, con el bastón de su padre ════════════════════
const escalinata = () => horno('escalinata', () => {
  // el cielo del atardecer tramado
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(OCASO, y / 100 * 7.4 + (ns(x * 0.03, y * 0.08) - 0.5) * 0.7, x, y));
  // la puerta de la ciudadela arriba: muro con almenas, arco apuntado de bronce con el halcón, dos antorchas
  for (let y = 36; y < 86; y++) for (let x = 104; x < 216; x++) { let v = 2.2 + (ns(x * 0.2, y * 0.3) - 0.5) * 0.8 + (x > 190 ? 0.8 : 0); if (y % 6 === 0) v += 1; if ((x + (Math.floor(y / 6) & 1) * 7) % 14 === 0) v += 1; R.pset(x, y, rmp(ARE, v, x, y)); }
  for (let x = 104; x < 216; x += 8) R.rect(x, 31, x + 4, 36, ARE[3]);
  R.poligono([[142, 86], [142, 56], [160, 44], [178, 56], [178, 86]], (x, y) => rmp(pal(['#e8c060', '#b88a3a', '#8a6228', '#5a3e1c']), 1 + (x > 168 ? 1.2 : 0) + ((x - 142) % 6 === 0 ? 1 : 0) + (ns(x * 0.3, y * 0.2) - 0.5), x, y));
  R.linea(160, 46, 160, 86, H('#4a3218')); halconB(160, 60);
  // las casas a los lados: arenisca, ventanas encendidas, torres de viento, toldos y balcones
  const casa = (x0, x1, y0, k) => { for (let y = y0; y < 160; y++) for (let x = x0; x < x1; x++) { let v = 2.6 + (ns(x * 0.15 + k, y * 0.2) - 0.5) * 0.9 + (y - y0) * 0.012; if (y % 7 === 0 && ns(x * 0.3, y) > 0.3) v += 0.6; R.pset(x, y, rmp(ARE, v, x, y)); }
    R.rect(x0, y0, x1 - 1, y0 + 1, ARE[1]); for (let x = x0 + 4; x < x1 - 6; x += 18) for (let y = y0 + 10; y < 130; y += 22) { if (h2(x, y, k) < 0.2) continue; R.rect(x, y, x + 6, y + 9, K); R.rect(x + 1, y + 1, x + 5, y + 9, h2(x, y, k + 1) > 0.4 ? H('#f8b048') : H('#3a2a2a')); R.rect(x - 1, y + 10, x + 7, y + 10, ARE[0]); } };
  casa(0, 76, 52, 1); casa(244, 320, 60, 2); casa(66, 104, 78, 3); casa(216, 254, 84, 4);
  for (const x of [20, 52]) { R.rect(x, 34, x + 7, 52, ARE[4]); R.rect(x - 1, 34, x + 8, 36, ARE[2]); for (let j = 38; j < 50; j += 3) R.rect(x + 1, j, x + 6, j, K); }
  R.rect(268, 50, 275, 60, ARE[4]); R.rect(267, 50, 276, 52, ARE[2]);
  for (const [x0, y, c] of [[2, 96, '#a83a2e'], [250, 104, '#2e5a6a']]) for (let i = 0; i < 26; i++) { R.pset(x0 + i, y + (i & 1), H(c)); R.pset(x0 + i, y + 1 + (i & 1), mez(H(c), K, 0.3)); }
  // la escalinata en perspectiva: huellas claras, tabicas oscuras, cantos gastados y grietas
  let y = 86, h = 2.2, k = 0;
  while (y < 152) { const y2 = Math.min(152, ri(y + h)), wl = lerp(126, 70, (y - 86) / 66), wr = lerp(194, 250, (y - 86) / 66);
    for (let yy = ri(y); yy < y2; yy++) for (let x = ri(wl); x <= ri(wr); x++) { const tread = yy - ri(y) < Math.max(1, (y2 - y) * 0.45); let v = tread ? 1.2 : 3.6; v += (ns(x * 0.2, yy * 0.4 + k) - 0.5) * 0.8 + (x > 190 ? 0.5 : 0); if (tread && yy === ri(y) && h2(x, k, 3) > 0.8) v += 1.5; R.pset(x, yy, rmp(ARE, v, x, yy)); }
    for (let q = 0; q < 2; q++) { const gx = ri(lerp(wl, wr, h2(k, q, 8))); if (h2(k, q, 9) > 0.5) R.linea(gx, ri(y), gx + 2, y2 - 1, ARE[5]); }
    y = y2; h *= 1.12; k++; }
  // las barandas de los lados, con farolillos
  for (const [xa, xb] of [[124, 66], [196, 254]]) { R.linea(xa, 82, xb, 150, ARE[5]); R.linea(xa, 81, xb, 149, ARE[1]); for (let u = 0.15; u < 1; u += 0.28) { const x = ri(lerp(xa, xb, u)), yy = ri(lerp(82, 150, u)); R.rect(x - 1, yy - 8, x + 1, yy, ARE[5]); } }
  // la plaza de abajo: losas en perspectiva, arena acumulada, pétalos sueltos
  for (let yy = 152; yy < 180; yy++) for (let x = 0; x < 320; x++) { const fila = Math.floor((yy - 152) / 6); let v = 1.8 + (ns(x * 0.12, yy * 0.3) - 0.5) * 0.8; if ((yy - 152) % 6 === 0) v += 1.1; if ((x + fila * 9 + ri((x - 160) * (yy - 152) * 0.01)) % 22 === 0) v += 1; if (ns(x * 0.05, yy * 0.2) > 0.7) v -= 0.8; R.pset(x, yy, rmp(ARE, v, x, yy)); }
  for (let i = 0; i < 24; i++) { const x = ri(h2(i, 1, 71) * 318), yy = ri(156 + h2(i, 2, 71) * 22); R.pset(x, yy, i % 3 ? H('#c84a3a') : H('#e8c040')); }
});
const ph8 = (t, o = {}) => {
  R.copiar(escalinata());
  // nubes de tres tonos a tres velocidades y pájaros
  [[0.6, H('#7a3a5a'), 0.05, 26], [1.2, H('#b85a5a'), 0.07, 44], [2.0, H('#e8905a'), 0.09, 64]].forEach(([vel, c, fr, yc], i) => {
    for (let y = yc - 6; y <= yc + 6; y++) for (let x = 0; x < 320; x++) { if (tranquilo(x, y) || (x > 100 && x < 220 && y > 30)) continue; const v = ns((x + t * vel * 4 + i * 77) * fr, y * fr * 2.2 + i * 9) - 0.58 - Math.abs(y - yc) / 16; if (v > 0 && v * 6 > b4(x, y)) R.pset(x, y, v > 0.12 ? mez(c, H('#f8d0a0'), 0.4) : c); } });
  for (let k = 0; k < 4; k++) pajaro(((t * (14 + k * 3) + k * 90) % 360) - 20, 28 + k * 7 + Math.sin(t + k) * 2, t, H('#3a2030'), k);
  // las antorchas de la puerta y los estandartes que se mecen
  for (const x of [134, 186]) { R.rect(x, 62, x + 1, 70, H('#4a3218')); for (let j = 0; j < 5; j++) ps(x + Math.round(Math.sin(t * 9 + j + x) * 0.8), 61 - j, FUEGO[Math.min(4, j)]); mezP(x, 64, CALIDO, 0.5); }
  for (const x of [116, 202]) for (let j = 0; j < 24; j++) { const sw = Math.round(Math.sin(t * 2 + j * 0.25 + x) * j * 0.06); for (let i = 0; i < 7; i++) ps(x + i + sw, 42 + j, (j > 20 && (i + j) % 2) ? H('#1a1620') : i === 0 || i === 6 ? H('#1a1620') : H('#2a4a3a')); if (j === 10) halconB(x + 3 + sw, 52, { c: H('#c8a040') }); }
  // dos guardias diminutos en la puerta
  for (const x of [138, 182]) { gentecilla(x, 86, H('#2a4a3a'), H('#c89a70')); ps(x + 2, 78, H('#c8c8d0')); R.linea(x + 2, 79, x + 2, 86, H('#6a5a4a')); }
  // los dos últimos peregrinos se van, uno por cada lado, en «no one left»
  const va = cl((t - @40.4) / 2.0);
  if (va < 1) { R.actor(EL.ciudadanaLT, ri(lerp(96, -24, va)), 170, t, { dir: -1, anda: va > 0, triste: true }); R.actor(PA.fremen, ri(lerp(226, 336, va)), 172, t, { dir: 1, anda: va > 0 }); }
  // una banderola suelta que el viento arrastra por la plaza
  const bf = ((t - @38.3) * 34) % 420 - 40; for (let i = 0; i < 8; i++) ps(bf - i, 176 - Math.sin(t * 6 + i * 0.7) * 2 - i * 0.2, i & 1 ? H('#2e5a6a') : H('#3a6a8a'));
  // el bastón en el suelo; en «found him again» Leto lo coge y en «walk that path» empieza a subir solo
  const coge = t > @38.75, sube = cl((t - @42.3) / 2.2);
  let yS = 168, xS = 150; if (sube > 0) { const pasos = Math.floor(sube * 7); yS = 168 - Math.min(16, pasos * 2.3 + (sube * 7 % 1) * 2.3); xS = 150 + ri(sube * 2); }
  if (!coge) baston(166, 172, 190, 168);
  const a = R.actor(LT.letoPielLT, xS, ri(yS), t, { dir: 1, anda: sube > 0 && sube < 1, triste: t > @40.0, sorpresa: t > @38.4 && t < @38.75, sostiene: coge ? [xS + 15, ri(yS) - 12] : undefined, quieto: o.quieto });
  if (coge) { const [mx, my] = a.mano; baston(mx, my - 9, mx + 1, ri(yS)); }
  sombraSuelo(xS + 7, ri(yS) + 1, 7, 1, 0.4);
};

// ════════════════════ E · El salón del trono: Leto avanza, Alia se levanta, nadie puede pararlo ════════════════════
const O9 = { encuadre: 'trono', camara: 'tarima' };
const ph9 = (t, o = {}) => {
  T.ciudadela(R, t, O9);
  // Alia en el trono: en «Alia» se levanta y da un paso al borde de la plataforma; señala a los guardias
  const lev = ease(cl((t - @45.2) / 0.7)), ax = ri(lerp(221, 206, lev));
  R.actor(LT.aliaLT, ax, ri(lerp(134, 135, lev)), t, { dir: -1, anda: lev > 0 && lev < 1, enfado: t > @45.4, dedo: t > @46.6 && t < @47.8, sorpresa: t > @48.4 });
  // Leto entra desde la izquierda y se planta al pie de la escalinata en «comes before Alia»
  const ul = ease(cl((t - @44.3) / 1.1)), un = ease(cl((t - @48.6) / 0.8)), lx = ri(lerp(-16, 140, ul) + un * 22);
  R.actor(LT.letoPielLT, lx, 150, t, { dir: 1, anda: (ul > 0 && ul < 1) || (un > 0 && un < 1), enfado: t > @47.6, quieto: o.quieto });
  // en «no one can stop him» dos guardias se le echan encima por detrás… y rebotan contra la piel
  const g = ease(cl((t - @46.9) / 0.9)), reb = cl((t - @48.25) / 0.6);
  for (const [k, x0] of [[0, -30], [1, -50]]) { const x = ri(lerp(x0, lx - 14 - k * 10, g) - Math.sin(reb * Math.PI * 0.5) * (30 + k * 10)); if (x > -20) R.actor(PA.fremen, x, 150 + k * 4, t, { dir: 1, anda: g > 0 && g < 1, sostiene: g >= 1 && reb < 0.3 ? [x + 18, 136 + k * 4] : undefined, sorpresa: reb > 0, salto: reb > 0 && reb < 1 ? ri(Math.sin(reb * Math.PI) * 6) : 0, pal: pp({ C: '#2a4a3a', c: '#1e3a2a' }) }); }
  if (reb > 0 && reb < 1) { for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2; ps(lx + 7 + Math.cos(an) * (10 + reb * 10), 138 + Math.sin(an) * (12 + reb * 8), H('#c8e0f8')); } R.icono('!', lx - 14, 112, H('#ffe080'), K, 2); }
  brillaPiel(lx, 150, t, 0.5 + reb);
  T.ciudadelaDelante(R, t, O9);
};

// ════════════════════ F · La galería (fondo local): Alia y su sombra; recupera el control un instante ════════════════════
const galeria = () => horno('galeria', () => {
  // el muro de sillares con juntas y poros; la luz de la lámpara de la izquierda lo calienta
  for (let y = 0; y < 142; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 9); let v = 3.0 + (ns(x * 0.12, y * 0.2) - 0.5) * 0.8 + Math.abs(x - 70) * 0.007 + (142 - y) * 0.006;
    if (y % 9 === 0 || (x + (fila & 1) * 11) % 22 === 0) v += 1.1; if (h2(x, y, 81) > 0.96) v += 0.8; R.pset(x, y, rmp(ARE, v, x, y)); }
  // la puerta de la izquierda (arco apuntado, el pasillo oscuro con una antorcha lejos)
  R.poligono([[4, 142], [4, 70], [20, 52], [36, 70], [36, 142]], (x, y) => rmp(pal(['#4a3a3a', '#3a2a2e', '#2a1e24', '#1a1420']), 1.6 + (142 - y) * 0.01 + (ns(x * 0.3, y * 0.2) - 0.5), x, y));
  R.disco(20, 96, 2, H('#f8a040'));
  // la ventana alta de la derecha, en arco, con su reja (lo de fuera lo pinta lo vivo)
  for (let y = 36; y < 122; y++) for (let x = 232; x < 274; x++) { const borde = x < 235 || x > 270 || y > 119; if (borde) R.pset(x, y, ARE[5]); }
  // el tapiz del desierto (bandas de colores con rombos) y la placa de bronce con el halcón
  for (let y = 40; y < 112; y++) for (let x = 154; x < 196; x++) { const b = Math.floor((y - 40) / 12); const c = pal(['#a83a2e', '#d8a040', '#2e5a6a', '#c86a2a', '#5a3a6a', '#a83a2e'])[b];
    R.pset(x, y, ((x + y) % 8 === 0 || (x - y + 400) % 8 === 0) ? mez(c, H('#f8e0a0'), 0.5) : ((x * 3 + y) % 5 === 0 ? mez(c, K, 0.25) : c)); }
  for (let x = 154; x < 196; x += 3) R.rect(x, 112, x + 1, 116, H('#d8a040')); R.rect(152, 38, 197, 39, H('#6a4a2a'));
  R.disco(94, 34, 9, K); R.disco(94, 34, 8, H('#b88a3a')); R.disco(94, 34, 6, H('#8a6228')); halconB(94, 34);
  // el suelo de losas pulidas, la alfombra, el banco con cojines y el cuenco de agua en su pedestal
  for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 142) / 7); let v = 1.8 + (ns(x * 0.1, y * 0.4) - 0.5) * 0.6 + ((x + f * 13) % 26 < 13 ? 0.6 : 0); if ((y - 142) % 7 === 0) v += 1.2; R.pset(x, y, rmp(ARE, v, x, y)); }
  for (let y = 154; y < 172; y++) for (let x = 60; x < 180; x++) { const c = (x - 60) % 20 < 2 || y === 154 || y === 171 ? H('#d8a040') : ((x + y) % 6 === 0 ? H('#5a2a2a') : H('#8a3a2e')); R.pset(x, y, c); }
  R.rect(244, 130, 312, 146, H('#5a3a24')); R.rect(244, 130, 312, 131, H('#8a5a34')); for (const [x, c] of [[252, '#2e5a6a'], [270, '#d8a040'], [290, '#a83a2e']]) { R.disco(x, 128, 6, K); R.disco(x, 128, 5, H(c)); R.pset(x - 2, 125, H('#ffffff')); }
  R.rect(212, 128, 222, 152, ARE[4]); R.rect(208, 126, 226, 128, ARE[2]); R.disco(217, 123, 7, K); R.disco(217, 123, 6, H('#b88a3a')); R.rect(212, 121, 222, 122, H('#5a9ac8'));
  // el pie de la lámpara de bronce
  R.rect(56, 92, 58, 152, H('#6a4a24')); R.rect(50, 150, 64, 152, H('#8a6228')); R.rect(48, 88, 66, 91, H('#b88a3a'));
});
const ph10 = (t, o = {}) => {
  R.copiar(galeria());
  // por la ventana: el cielo de la tarde que arde, nubes que pasan y la ciudad con sus cúpulas
  for (let y = 38; y < 120; y++) for (let x = 235; x <= 270; x++) { const arco = y > 52 || Math.hypot(x - 252.5, y - 52) < 17.5; if (!arco) continue;
    let c = rmp(OCASO, 2 + (y - 38) / 82 * 5.4 + (ns((x + t * 4) * 0.08, y * 0.15) - 0.5) * 0.8, x, y); if (y > 100 + Math.sin(x * 0.5) * 2 + (x % 9 < 3 ? -6 : 0)) c = H('#4a2a3a'); R.pset(x, y, c); }
  for (let x = 236; x < 270; x += 8) R.rect(x, 52, x, 119, ARE[5]); for (let y = 60; y < 120; y += 14) R.rect(235, y, 270, y, ARE[5]);
  // el haz de luz de la ventana sobre el suelo, con polvo
  for (let y = 120; y < 180; y++) for (let x = 0; x < 60; x++) { const xx = 238 - (y - 120) * 0.6 + x * 0.65; if (b4(ri(xx), y) < 0.35) mezP(xx, y, H('#f8c080'), 0.35); }
  for (let k = 0; k < 10; k++) { const f = (t * 0.2 + k / 10) % 1; ps(220 + h2(k, 1, 4) * 40 - f * 20, 120 + f * 50, H('#f8e0b0')); }
  // la lámpara: la llama tiembla y calienta la pared
  const fl = 0.9 + 0.1 * Math.sin(t * 13);
  for (let j = 0; j < 6; j++) ps(57 + Math.round(Math.sin(t * 10 + j) * 0.8), 86 - j, FUEGO[Math.min(4, j)]);
  luzLumbre(57, 86, 130, 0.35 * fl, t);
  // la sombra de Alia en la pared, a la derecha: la del barón, gorda; en «regains control» encoge hasta la suya, flaca
  const ctrl = ease(cl((t - @53.5) / 0.6)) * (1 - ease(cl((t - @56.2) / 0.6)) * 0.3), ax = 122;
  const late = 1 + 0.06 * Math.sin(t * 5);
  for (let y = 142; y < 151; y++) for (let x = ax + 8; x < ax + 34; x++) if (((x + y) & 1) === 0) sombrea(x, y, 0.35 * (1 - (x - ax - 8) / 26));
  baron(ax + 30, 143, lerp(2.0 * late, 1.05, ctrl), lerp(0.75, 0.55, ctrl), { ancho: lerp(1, 0.3, ctrl), m: (x, y) => y > 143 || (x > 232 && x < 274 && y > 34 && y < 122) });
  // Alia: en «lost everything» se lleva las manos a la cabeza; en «regains control» se yergue y mira la ventana, en calma
  const lost = t > @52.5 && t < @53.6;
  R.actor(LT.aliaLT, ax, 150, t, { dir: t > @54.2 ? 1 : -1, brazos: lost, triste: t < @53.6, sonrisa: t > @54.2, sorpresa: t > @53.6 && t < @54.2, quieto: o.quieto });
  if (ctrl > 0.5) for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2 + t; ps(ax + 7 + Math.cos(an) * 12, 134 + Math.sin(an) * 14, H('#fff0c0')); }
  // una mariposa nocturna ronda la lámpara
  const mx = 57 + Math.cos(t * 3) * 10, my = 82 + Math.sin(t * 5) * 5; ps(mx, my, H('#d8c8a8')); ps(mx + 1, my - (Math.sin(t * 30) > 0 ? 1 : 0), H('#a89878')); ps(mx - 1, my - (Math.sin(t * 30) > 0 ? 1 : 0), H('#a89878'));
};

// ════════════════════ G · La torre (fondo local): de cerca, la voz se va; de lejos, la luz se apaga ════════════════════
const ocasoCielo = (k) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(OCASO, y / 150 * 7.2 + (ns(x * 0.03 + k, y * 0.08) - 0.5) * 0.7, x, y)); };
const torreCerca = () => horno('torre-cerca', () => {
  ocasoCielo(2);
  R.halo(70, 132, 30, [H('#f8a85a'), H('#f8c878'), H('#fff0c0')], 1.4); R.disco(70, 132, 11, H('#fff0c0'));
  // las cúpulas y torres de viento de la ciudad, abajo, en sombra contra el sol
  const S = pal(['#7a3a4a', '#5a2a3e', '#3e1e30']);
  for (let x = 0; x < 320; x++) { const yb = 140 + Math.sin(x * 0.05) * 4 + (x % 37 < 10 ? -10 : 0); for (let y = ri(yb); y < 180; y++) R.pset(x, y, rmp(S, 1 + (y - yb) * 0.03 + (ns(x * 0.2, y * 0.2) - 0.5) * 0.5, x, y)); }
  for (const [x, r] of [[30, 12], [104, 9], [262, 14]]) { R.disco(x, 140, r, S[1]); for (let i = -r; i <= r; i++) ps(x + i, 140 - Math.sqrt(r * r - i * i), S[0]); }
  for (let i = 0; i < 26; i++) { const x = ri(h2(i, 1, 9) * 318), y = ri(150 + h2(i, 2, 9) * 26); R.rect(x, y, x + 1, y + 2, h2(i, 3, 9) > 0.4 ? H('#f8b048') : H('#2a1420')); }
  // la torre de la ciudadela: sillares, una cornisa, la cúpula y la ventana en arco de Alia
  for (let y = 36; y < 180; y++) for (let x = 150; x < 232; x++) { let v = 2.2 + (ns(x * 0.15, y * 0.2) - 0.5) * 0.8 + (x > 210 ? 1.2 : x < 160 ? -0.4 : 0); if (y % 8 === 0) v += 1; if ((x + (Math.floor(y / 8) & 1) * 9) % 18 === 0) v += 0.9; R.pset(x, y, rmp(ARE, v, x, y)); }
  R.rect(146, 48, 236, 52, ARE[1]); R.rect(146, 53, 236, 54, ARE[5]); for (let x = 146; x < 236; x += 6) R.rect(x, 44, x + 3, 48, ARE[2]);
  for (let i = -30; i <= 30; i++) { const h = Math.sqrt(900 - i * i) * 0.5; for (let y = ri(44 - h); y < 44; y++) R.pset(191 + i, y, rmp(pal(['#e8c060', '#b88a3a', '#8a6228']), 0.6 + (i > 10 ? 1.2 : 0) + ((i + 30) % 7 === 0 ? 0.8 : 0), 191 + i, y)); }
  R.rect(190, 24, 191, 30, H('#8a6228'));
  // el balconcillo bajo la ventana
  R.rect(166, 112, 216, 115, ARE[1]); R.rect(166, 116, 216, 118, ARE[5]); for (let x = 168; x < 216; x += 5) R.rect(x, 104, x + 1, 112, ARE[2]); R.rect(166, 103, 216, 104, ARE[0]);
});
const ph11 = (t, o = {}) => {
  R.copiar(torreCerca());
  // nubes de tres tonos y pájaros
  [[0.6, H('#6a3462'), 0.05, 30], [1.2, H('#c85a5a'), 0.07, 70], [2.0, H('#f4a85a'), 0.1, 104]].forEach(([vel, c, fr, yc], i) => {
    for (let y = yc - 6; y <= yc + 6; y++) for (let x = 0; x < 320; x++) { if (tranquilo(x, y) || (x >= 146 && x < 236 && y > 22)) continue; const v = ns((x + t * vel * 4 + i * 77) * fr, y * fr * 2.2 + i * 9) - 0.58 - Math.abs(y - yc) / 16; if (v > 0 && v * 6 > b4(x, y)) R.pset(x, y, v > 0.12 ? mez(c, H('#f8d0a0'), 0.4) : c); } });
  for (let k = 0; k < 3; k++) pajaro(((t * (12 + k * 4) + k * 110) % 360) - 20, 60 + k * 9, t, H('#3a2030'), k);
  // la ventana encendida (cálida) con su marco y Alia de pie dentro
  const ctrl = cl((t - @58.0) / 1.6);
  for (let y = 62; y < 104; y++) for (let x = 174; x < 208; x++) if (y > 76 || Math.hypot(x - 190.5, y - 76) < 16.5) R.pset(x, y, rmp(pal(['#fff0c0', '#f8c070', '#e8904a', '#a85a3a']), 1 + (y - 62) * 0.03 + (Math.abs(x - 191) > 12 ? 1 : 0) + ns(x * 0.2, t * 3) * 0.4, x, y));
  // la sombra del barón detrás de ella, en la ventana; en «free herself» se despega y se va hecha ceniza oscura
  if (ctrl < 1) baron(194, 104, 1.05, 0.8 * (1 - ctrl * 1.4), { m: (x, y) => !(y < 104 && x >= 174 && x < 208), sinFilo: true });
  if (ctrl > 0) for (let k = 0; k < 70; k++) { const f = cl(ctrl * 1.25 - h2(k, 1, 5) * 0.3), x = 190 + (h2(k, 2, 5) - 0.5) * 24 + f * (40 + h2(k, 3, 5) * 90), y = 86 + (h2(k, 4, 5) - 0.5) * 30 - f * (30 + h2(k, 5, 5) * 50) + Math.sin(t * 4 + k) * f * 3;
    if (f > 0 && f < 1 && !tranquilo(ri(x), ri(y))) { const a = 1 - f; if (f > 0.5 && k % 5 === 0) pajaro(x, y, t, mez(H('#2a1420'), H('#f4a85a'), f), k); else mezP(x, y, H('#2a1420'), 0.9 * a); } }
  R.actor(LT.aliaLT, 184, 104, t, { dir: 1, triste: ctrl < 0.3, sonrisa: ctrl > 0.6, brazos: ctrl > 0.15 && ctrl < 0.5, quieto: o.quieto });
  for (let x = 172; x < 210; x++) { ps(x, 61, ARE[5]); } R.rect(172, 62, 173, 104, ARE[5]); R.rect(208, 62, 209, 104, ARE[5]);
  for (let x = 168; x < 216; x += 5) R.rect(x, 104, x + 1, 112, ARE[2]); R.rect(166, 103, 216, 104, ARE[0]);
  // los estandartes de la torre se mecen al viento
  for (const x of [156, 220]) for (let j = 0; j < 30; j++) { const sw = Math.round(Math.sin(t * 2.5 + j * 0.25 + x) * j * 0.07); for (let i = 0; i < 6; i++) ps(x + i + sw, 58 + j, i === 0 || i === 5 ? H('#1a1620') : H('#2a4a3a')); if (j === 12) halconB(x + 3 + sw, 70, { c: H('#c8a040') }); }
};
const torreLejos = () => horno('torre-lejos', () => {
  cieloNoche(140, 17, { via: 0, incl: 0.3 });
  lunaN(60, 58, 9);
  // la ciudadela entera, en silueta, con sus ventanas encendidas, y la torre alta a la derecha
  const S = pal(['#3a2a48', '#2a1e3a', '#1e1630']);
  const perfil = (x) => x < 60 || x > 268 ? 999 : x > 193 && x < 213 ? 46 : 92 - (x > 90 && x < 240 ? 16 : 0) - (Math.abs(x - 150) < 18 ? 14 : 0) - ((x % 14) < 4 ? 4 : 0);
  for (let x = 0; x < 320; x++) { const yp = perfil(x); for (let y = yp; y < 150; y++) R.pset(x, y, rmp(S, 0.8 + (y - yp) * 0.02 + (ns(x * 0.2, y * 0.2) - 0.5) * 0.4 + (x > 230 ? 0.6 : 0), x, y)); }
  R.disco(203, 46, 10, S[1]); R.rect(202, 30, 203, 36, S[0]); R.rect(193, 64, 213, 66, S[0]);
  for (let i = 0; i < 46; i++) { const x = 64 + ri(h2(i, 1, 21) * 200), y = 80 + ri(h2(i, 2, 21) * 60); if (y < perfil(x) + 4) continue; R.rect(x, y, x + 1, y + 2, h2(i, 3, 21) > 0.3 ? H('#e8a048') : H('#3a2a20')); }
  // los tejados de delante: azoteas con pretil, una torre de viento, cuerdas con ropa tendida
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 150) / 6); let v = 2.6 + (ns(x * 0.12, y * 0.2) - 0.5) * 0.9 + (y - 150) * 0.03 + h2(Math.floor((x + f * 11) / 22), f, 5) * 0.8; if (y === 150 || y === 151) v -= 1.4; if ((y - 150) % 6 === 0 || (x + f * 11) % 22 === 0) v += 1.0; if (ns(x * 0.06, y * 0.2) > 0.72) v += 0.6; R.pset(x, y, rmp(DUNA, v, x, y)); }
  R.rect(20, 118, 34, 150, DUNA[4]); R.rect(18, 116, 36, 118, DUNA[2]); for (let j = 122; j < 146; j += 4) R.rect(22, j, 32, j, K);
  R.rect(286, 128, 292, 150, DUNA[4]); R.rect(284, 126, 294, 128, DUNA[2]);
  // la alfombra colgada del pretil, macetas, un cántaro y una escalera de mano
  for (let y = 150; y < 166; y++) for (let x = 58; x < 92; x++) R.pset(x, y, ((y - 150) % 5 < 2) ? H('#a83a2e') : ((x + y) % 6 === 0 ? H('#d8a040') : H('#5a3a6a')));
  for (let x = 58; x < 92; x += 3) R.pset(x, 166, H('#d8a040'));
  for (const x of [140, 178, 300]) { R.rect(x - 4, 142, x + 4, 150, K); R.rect(x - 3, 143, x + 3, 149, H('#8a4a30')); for (let k = 0; k < 5; k++) R.linea(x, 142, x - 4 + k * 2, 134 + (k & 1) * 2, H('#3a6a3a')); }
  cantaro(266, 176);
  for (let y = 120; y < 150; y += 5) R.rect(102, y, 112, y, H('#6a5a44')); R.linea(102, 118, 102, 150, H('#6a5a44')); R.linea(112, 118, 112, 150, H('#6a5a44'));
});
const ph12 = (t, o = {}) => {
  R.copiar(torreLejos());
  cieloVivo(t, 110, 17, { n0: 24, n1: 40, n2: 62, fugaz: false, m: (x, y) => y > 30 && x > 58 && x < 270 });
  // las ventanas parpadean; la de lo alto de la torre se apaga en «chooses to die»: nada más
  for (let i = 0; i < 8; i++) { const x = 70 + ri(h2(i, 5, 21) * 190), y = 96 + ri(h2(i, 6, 21) * 40); if (Math.sin(t * (0.7 + h2(i, 7, 21)) + i * 3) > 0.6) R.rect(x, y, x + 1, y + 2, H('#3a2a20')); }
  const apaga = cl((t - @61.5) / 1.1), luzT = (1 - apaga) * (0.85 + 0.15 * Math.sin(t * 7));
  if (luzT > 0.05) R.halo(203, 56, 18, [H('#3a2a48'), H('#6a4a50'), H('#a8705a')], 0.9 * luzT);
  R.poligono([[199, 62], [199, 52], [203, 48], [207, 52], [207, 62]], mez(H('#1e1630'), H('#ffd070'), luzT)); if (luzT > 0.3) { ps(201, 54, H('#fff0c0')); R.rect(203, 50, 203, 62, H('#2a1e3a')); }
  // la ropa tendida que se mece y el humo de una chimenea
  for (let x = 40; x < 140; x++) { const y = 132 + Math.sin((x - 40) / 100 * Math.PI) * 6; ps(x, y, H('#8a80a0')); }
  for (const [x, c] of [[58, '#a83a2e'], [76, '#d8c8a8'], [96, '#2e5a6a'], [116, '#d8a040']]) { const y = 132 + Math.sin((x - 40) / 100 * Math.PI) * 6, sw = Math.sin(t * 2 + x) * 1.5; R.poligono([[x, y], [x + 8, y], [x + 8 + sw, y + 10], [x + sw, y + 10]], H(c)); }
  for (let k = 0; k < 10; k++) { const f = (t * 0.3 + k / 10) % 1; mezP(289 + f * 12 + Math.sin(t + k), 124 - f * 34, H('#6a6080'), 0.4 * (1 - f)); }
  // dos vecinos en la azotea miran la torre; en «die» ella se lleva la mano al pecho y él se quita el turbante… se entristecen
  R.actor(EL.ciudadanaLT, 220, 166, t, { dir: -1, triste: t > @62.0, sorpresa: t > @61.6 && t < @62.0, sostiene: t > @62.3 ? [222, 150] : undefined, quieto: o.quieto });
  R.actor(EL.ciudadanoLT, 244, 168, t, { dir: -1, triste: t > @62.2, dedo: t > @60.8 && t < @61.6, quieto: o.quieto });
  // un gato en el pretil mueve la cola
  const gx = 160; R.rect(gx, 146, gx + 5, 149, K); R.rect(gx + 4, 143, gx + 6, 146, K); ps(gx + 4, 142, K); ps(gx + 6, 142, K); ps(gx + 5, 144, H('#e8c040')); for (let i = 0; i < 5; i++) ps(gx - 1 - i, 148 - Math.round(Math.sin(t * 3 + i * 0.6) * (i * 0.6)), K);
};

// ════════════════════ H · El trono: Leto, nueve años, se sienta ════════════════════
const O13 = { encuadre: 'trono', luz: 'dia' };
const ph13 = (t, o = {}) => {
  T.ciudadela(R, t, O13);
  // los cortesanos a los lados de la alfombra se inclinan en «empire»
  const incl = t > @68.3;
  for (const [x, def, d, s] of [[84, PA.fremen, 1, 166], [108, PA.sacerdotePA, 1, 172], [204, PA.fremenMujer, -1, 172], [228, PA.fremen, -1, 166]]) R.actor(def, x, s + (incl ? 2 : 0), t, { dir: d, triste: incl, sorpresa: t > @66.4 && t < @67.0, quieto: o.quieto });
  // Leto sube por la alfombra y la escalinata y se sienta en el trono en «throne»; un «9» en «nine years old»
  const u = cl((t - @65.3) / 1.1);
  let lx = 153, ly = 122; if (u < 1) { ly = u < 0.6 ? lerp(176, 141, u / 0.6) : lerp(141, 122, (u - 0.6) / 0.4); }
  R.actor(LT.letoPielLT, lx, ri(ly), t, { dir: 1, anda: u < 1, quieto: o.quieto || (u >= 1 && t > @67.5), sonrisa: false, triste: t > @68.4 });
  brillaPiel(lx, ri(ly), t, 0.5);
  const nv = cl((t - @66.85) / 0.4); if (nv > 0) R.numero('9', 176, ri(112 - nv * 4), { tam: 16, centro: true });
  T.ciudadelaDelante(R, t, O13);
};
// el trono de cerca y desde abajo (fondo local): enorme, y el niño pequeñito; en el suelo pulido, su reflejo es otro
const tronoCerca = () => horno('trono-cerca', () => {
  // el muro del fondo y el nicho con la celosía encendida
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { let v = 3.2 + (ns(x * 0.12, y * 0.2) - 0.5) * 0.7 + Math.abs(x - 160) * 0.006; if (y % 10 === 0 || (x + (Math.floor(y / 10) & 1) * 12) % 24 === 0) v += 1; R.pset(x, y, rmp(ARE, v, x, y)); }
  R.poligono([[96, 150], [96, 40], [160, 6], [224, 40], [224, 150]], (x, y) => { const cel = ((x + y) % 8 < 2 || (x - y + 400) % 8 < 2); return cel ? H('#7a5a2a') : rmp(pal(['#fff0c0', '#f8d088', '#e8a858']), 0.4 + (y / 150) * 1.6 + Math.abs(x - 160) * 0.01, x, y); });
  // columnas acanaladas a los lados
  for (const x0 of [20, 270]) for (let y = 50; y < 150; y++) for (let x = x0; x < x0 + 26; x++) { let v = 1.6 + ((x - x0) % 5 === 0 ? 1.2 : 0) + (x - x0 > 18 ? 1.4 : 0) + (ns(x * 0.3, y * 0.1) - 0.5) * 0.5; R.pset(x, y, rmp(ARE, v, x, y)); }
  // el trono: respaldo alto de piedra y bronce con el halcón, brazos con cabezas de halcón, asiento, peana
  R.poligono([[116, 124], [116, 48], [160, 22], [204, 48], [204, 124]], (x, y) => { const pan = (x - 116) % 22, fr = (y - 22) % 20;
    if (pan === 0 || fr === 0) return H('#e8c060'); if (pan === 1 || fr === 1) return H('#8a6228');
    const dz = Math.abs(pan - 11) + Math.abs(fr - 10); if (dz === 6) return H('#b88a3a'); if (dz < 2) return H('#3a8a8a');
    return rmp(pal(['#d8c098', '#b89a70', '#8a7048', '#5a4630']), 1.0 + (x > 186 ? 1.2 : x < 124 ? 0.6 : 0) + (pan > 18 ? 0.8 : 0) + (ns(x * 0.2, y * 0.2) - 0.5) * 0.5, x, y); });
  for (let k = 0; k < 13; k++) { const an = Math.PI + k / 12 * Math.PI; for (let q = 14; q < 30; q++) ps(160 + Math.cos(an) * q, 102 + Math.sin(an) * q * 0.9, q % 4 === 0 ? H('#fff0a0') : H('#d8a040')); }
  for (let y = 30; y < 124; y++) { const w = y < 48 ? (y - 22) * 44 / 26 : 44; ps(160 - w + 2, y, H('#e8c060')); ps(160 + w - 2, y, H('#8a6228')); }
  R.disco(160, 44, 10, K); R.disco(160, 44, 9, H('#b88a3a')); R.disco(160, 44, 7, H('#8a6228')); halconB(160, 44);
  for (const x0 of [104, 196]) { R.rect(x0, 104, x0 + 20, 128, H('#8a7048')); R.rect(x0, 104, x0 + 20, 106, H('#e8c060')); R.disco(x0 + 10, 100, 5, H('#b88a3a')); R.pset(x0 + 12, 99, K); }
  R.rect(100, 128, 220, 146, H('#8a7048')); R.rect(100, 128, 220, 130, H('#d8c098')); for (let x = 104; x < 220; x += 12) R.rect(x, 132, x + 6, 142, H('#6a5438')); R.rect(100, 145, 220, 146, H('#5a4630'));
  // los escalones pulidos (y 146–180), con su brillo y la alfombra de especia con orla de oro
  for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const e = y < 156 ? 0 : y < 168 ? 1 : 2; let v = 1.0 + e * 0.5 + ((y === 156 || y === 168) ? 1.6 : 0) + (ns(x * 0.1, y * 0.3) - 0.5) * 0.4; R.pset(x, y, rmp(ARE, v, x, y)); }
  for (let y = 146; y < 180; y++) for (let x = 140; x < 180; x++) R.pset(x, y, x < 142 || x > 177 ? H('#d8a040') : ((x + y) % 7 === 0 ? H('#5a2a2a') : H('#8a3a2e')));
});
const ph14 = (t, o = {}) => {
  R.copiar(tronoCerca());
  // los haces de luz de la celosía, con polvo
  for (let k = 0; k < 14; k++) { const f = (t * 0.15 + k / 14) % 1; ps(130 + h2(k, 1, 5) * 60 + Math.sin(t + k) * 3, 20 + f * 120, H('#fff8e0')); }
  // los pebeteros de bronce a los lados, con su llama y su humo
  for (const x of [66, 254]) { R.rect(x - 1, 120, x + 1, 150, H('#6a4a24')); R.rect(x - 8, 114, x + 8, 120, H('#b88a3a')); R.rect(x - 8, 114, x + 8, 114, H('#e8c060'));
    for (let i = -6; i <= 6; i++) { const h = (8 - Math.abs(i)) * (0.6 + 0.5 * ns(i * 0.5 + x, t * 5)); for (let j = 0; j < h; j++) ps(x + i + Math.sin(t * 7 + j) * 0.6, 113 - j, FUEGO[Math.min(5, Math.floor(j / Math.max(1, h) * 4 + Math.abs(i) * 0.2))]); }
    for (let k = 0; k < 8; k++) { const f = (t * 0.3 + k / 8) % 1; mezP(x + Math.sin(t + k) * 3 + f * 6, 104 - f * 40, H('#d8d0c8'), 0.35 * (1 - f)); } }
  // el reflejo de Leto en las losas pulidas: un niño… y en «something» se alarga y es el de un gusano con anillos
  const gus = ease(cl((t - @71.4) / 1.2));
  for (let y = 147; y < 166; y++) for (let x = 128; x < 192; x++) { const d = y - 147, u = d / 19; const wN = (u < 0.45 ? 3.5 : 2) * (1 - gus), wG = (5 + u * 12) * gus; const cx = 160 + Math.sin(u * 3) * 4 * gus;
    if (Math.abs(x - cx) < Math.max(wN, wG) && (d < 14 + gus * 6)) mezP(x, y, (gus > 0.3 && (d % 4 === 0)) ? H('#1a0e08') : H('#3a1a10'), 0.72); }
  // Leto, sentado en el trono enorme; en «but by something» se mira la mano y la piel de truchas le recorre
  const mira = t > @70.8;
  const a = R.actor(LT.letoPielLT, 153, 126, t, { dir: 1, sostiene: mira ? [170, 112] : undefined, triste: mira, sorpresa: t > @71.4 && t < @72.0, quieto: o.quieto });
  R.rect(124, 120, 196, 128, H('#8a2a2a')); R.rect(124, 120, 196, 121, H('#c84a3a')); for (let x = 126; x < 196; x += 6) ps(x, 124, H('#d8a040'));
  brillaPiel(153, 126, t, 0.4 + gus);
  // los dos guardias del pie se inclinan en «ruled»
  const inc = t > @69.9 ? 2 : 0;
  R.actor(PA.fremen, 40, 176 + inc, t, { dir: 1, triste: inc > 0, quieto: o.quieto });
  R.actor(PA.fremen, 266, 176 + inc, t, { dir: -1, triste: inc > 0, quieto: o.quieto });
};
'''

PRECIO_ROD = r'''
T.rodar(E, R, [[0, ph1], [@5.5, ph2], [@12.4, ph3], [@17.2, ph4], [@22.5, ph5], [@27.7, ph6], [@31.4, ph7], [@38.3, ph8], [@44.3, ph9], [@49.9, ph10],
  [@56.6, ph11], [@60.6, ph12], [@65.4, ph13], [@69.7, ph14]], {
  año: 21,
  efectos: [[@0.8, 'pasos'], [@5.75, 'pop'], [@7.6, 'brillo'], [@8.5, 'campana'], [@10.5, 'viento'], [@12.8, 'brillo'], [@21.7, 'campana'], [@25.6, 'brillo'], [@26.8, 'whoosh'],
    [@27.9, 'pasos'], [@31.5, 'publico'], [@34.2, 'flash'], [@34.5, 'pajaros'], [@38.8, 'toc'], [@42.5, 'pasos'], [@44.5, 'pasos'], [@48.3, 'golpecito'],
    [@53.6, 'brillo'], [@58.2, 'rafaga'], [@61.7, 'campana'], [@65.6, 'pasos'], [@66.9, 'pop'], [@71.5, 'avalancha']],
});
'''

# el plano 1 va aparte para que lt-tranvia pueda llamar a todos
PRECIO_P1 = r'''
// ════════════════════ 0 · El encuentro: planeta desierto/general de noche ════════════════════
const O1 = { encuadre: 'desierto', hora: 'noche' };
const ph1 = (t, o = {}) => {
  T.planeta(R, t, O1);
  // a lo lejos, a la derecha, la lumbre del campamento del predicador (y su humo)
  luzLumbre(262, 128, 18, 0.6, t);
  lumbre(262, 130, t, 0.3, { alto: 12, chispas: 3 });
  // Leto llega por la cresta desde la izquierda; el guía trae al ciego desde la derecha; se cruzan en «crosses paths»
  const ul = ease(cl((t - 0.3) / 3.2)), lx = ri(lerp(-16, 128, ul));
  const ug = ease(cl((t - 0.6) / 3.0)), gx = ri(lerp(320, 160, ug)), px = gx + 20;
  R.actor(LT.letoPielLT, lx, 150, t, { dir: 1, anda: ul > 0 && ul < 1, sorpresa: t > @3.4 && t < @4.6, quieto: o.quieto });
  brillaPiel(lx, 150, t, 0.5);
  predicador(px, 150, t, { dir: -1, anda: ug > 0 && ug < 1, quieto: o.quieto, sostiene: ug < 1 ? [px - 2, 137] : undefined });
  R.actor(LT.guiaLT, gx, 150, t, { dir: -1, anda: ug > 0 && ug < 1, dedo: t > @4.4 && t < @5.4, sorpresa: t > @3.6 && t < @4.4, quieto: o.quieto });
  // huellas que deja Leto en la cresta
  for (let k = 0; k < 12; k++) { const x = lx - 6 - k * 7; if (x > 0) { ps(x, 151 + (k & 1), H('#2a2448')); ps(x + 1, 151 + (k & 1), H('#2a2448')); } }
  T.planetaDelante(R, t, O1);
};
'''

TRANVIA = r'''
const voz = (t) => E.energia?.(t) ?? 0;
const atomG = (x, s, t, o = {}) => AT.atom(R, x, s, t, { s: 2, habla: voz(t), ...o });
// los congelados de lt-precio (su instante, fijo, pintado una vez)
const fz = {};
const cong = (k, f) => { if (!fz[k]) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); fz[k] = b; } R.copiar(fz[k]); AT.pausa(R, 1); };
const tranvia = (x, y, t, o) => T.pausa(R, x, y, t, { cual: 'tranvia', ...o });
// muñequitos de juguete (pinzas de madera pintadas) sobre las vías; a: 0–1 aparecen
const muneco = (x, y, c, a = 1, b = 0) => { if (a <= 0) return; x = ri(x); y = ri(y - (1 - a) * 6 - b); R.rect(x - 3, y - 9, x + 3, y, K); R.rect(x - 2, y - 8, x + 2, y - 1, c); R.rect(x - 2, y - 8, x - 2, y - 1, mez(c, H('#ffffff'), 0.35)); R.disco(x, y - 12, 3, K); R.disco(x, y - 12, 2, H('#f0c8a0')); ps(x - 1, y - 13, H('#fff0e0')); ps(x - 1, y, K); ps(x + 1, y, K); };
const COLS = pal(['#a83a2e', '#2e5a6a', '#d8a040', '#5a3a6a', '#3a8a4a']);
// las vías siguen fuera de la pieza: la recta hacia la derecha (donde esperan los cinco) y la rama que sube (donde está uno)
const vias = (p, s) => { const [X0, Y0, X1] = p.caja, yA = Y0 + 34 * s, yB = Y0 + 37 * s, L = 40;
  for (let x = X1 - 2; x < X1 + L; x++) { if ((x - X1) % (3 * s) < s) R.rect(x, ri(yA) - 1, x + 1, ri(yB) + 2, H('#6a4a2a')); ps(x, yA, H('#c8c8d0')); ps(x, yB, H('#c8c8d0')); ps(x, yA + 1, H('#6a6a78')); ps(x, yB + 1, H('#6a6a78')); }
  const uA = Y0 + 20 * s, uB = Y0 + 23 * s;
  for (let i = 0; i < L; i++) { const x = X1 - 2 + i, dy = -i * 0.48; if (i % (3 * s) < s) R.linea(x, ri(uA + dy) - 1, x, ri(uB + dy) + 2, H('#6a4a2a')); ps(x, uA + dy, H('#c8c8d0')); ps(x, uB + dy, H('#c8c8d0')); }
  return { cinco: (k) => [X1 + 4 + k * 8, ri(yB)], uno: [X1 + 22, ri(uB - 22 * 0.48)] }; };
const cinco = (v, a) => { for (let k = 0; k < 5; k++) { const [x, y] = v.cinco(k); muneco(x, y, COLS[k], typeof a === 'function' ? a(k) : a); } };
// el «=» y las cifras de las cuentas
const igual = (x, y, c = H('#ffe080')) => { R.rect(x - 5, y - 4, x + 5, y - 3, K); R.rect(x - 5, y + 1, x + 5, y + 2, K); R.rect(x - 4, y - 4, x + 4, y - 4, c); R.rect(x - 4, y + 1, x + 4, y + 1, c); };

// ── 1 · el trono congelado: Atom (al doble) entra; «?» en «dilemma» ──
const q1 = (t) => {
  if (!fz.p14) { const b = R.nuevo(), prev = R.usar(b); ph14(73.4, { quieto: true }); R.usar(prev); fz.p14 = b; }
  R.copiar(fz.p14); AT.pausa(R, tramo(t, 0, 0.35));
  const anda = tramo(t, 0.4, 1.8), x = lerp(344, 236, ease(anda));
  atomG(x, 176, t, { pose: anda < 1 ? 'camina' : t > %2.0 ? 'piensa' : 'saluda', dir: -1, cara: t > %2.1 ? 'sorpresa' : 'sonrisa' });
  if (t > %2.1 && t < %4.9) { const b = flota(t); R.icono('?', 220, 96 + b, H('#ffe080'), K, 2); }
  const ua = tramo(t, %3.6, %4.6); if (ua > 0) AT.anillo(R, 160, 112, 30, 24, t, ua);
};
// ── 2 · la escalinata congelada: «1967»; en «trolley» Atom saca las vías; en «five» cinco muñequitos en la recta ──
const q2 = (t) => {
  cong('p8', () => ph8(42.0, { quieto: true }));
  const n = tramo(t, %5.4, %5.8); if (n > 0) { R.numero('1967', 86, ri(64 - n * 4), { tam: 16, centro: true }); AT.anillo(R, 86, 54, 38, 16, t, tramo(t, %5.8, %6.8)); }
  const saca = ease(tramo(t, %8.3, %8.9));
  atomG(56, 176, t, { pose: saca > 0 ? 'senala' : 'saluda', dir: 1, cara: t > %9.8 ? 'sorpresa' : 'sonrisa' });
  if (saca > 0) { const p = tranvia(176, ri(166 + (1 - saca) * 40), t, { s: 2, palanca: 1 }), v = vias(p, 2);
    cinco(v, (k) => tramo(t, %10.0 + k * 0.12, %10.2 + k * 0.12)); if (t > %10.4) R.numero('5', v.cinco(2)[0], v.cinco(2)[1] - 22, { centro: true }); }
};
// ── 3 · el salón congelado: en «switch» Atom tira de la palanca; la rama de arriba, con UN muñequito, en «only one» ──
const q3 = (t) => {
  cong('p9', () => ph9(48.0, { quieto: true }));
  const sw = ease(tramo(t, %11.8, %12.3)), p = tranvia(140, 150, t, { s: 2, palanca: lerp(1, -1, sw) }), v = vias(p, 2);
  cinco(v, 1);
  const uno = tramo(t, %13.6, %14.0); muneco(v.uno[0], v.uno[1], H('#e86a2a'), uno);
  if (uno > 0) { AT.anillo(R, v.uno[0], v.uno[1] - 8, 12, 14, t, tramo(t, %13.9, %14.8)); R.numero('1', v.uno[0], v.uno[1] - 24, { centro: true }); }
  const [kx] = p.punto;
  AT.atom(R, kx + 16, 178, t, { s: 1.4, habla: voz(t), pose: t > %11.4 && t < %12.6 ? 'sostiene' : t > %14.9 ? 'piensa' : 'quieto', dir: -1, cara: t > %14.9 ? 'guino' : sw > 0 ? 'sonrisa' : 'normal' });
  if (t > %14.9) R.icono('?', kx + 30, 120 + flota(t), H('#ffe080'), K, 2);
};
// ── 4 · la plaza congelada: «Would you?»; en «say yes» la mayoría de la multitud se enciende de color ──
const q4 = (t) => {
  cong('p7', () => ph7(33.0, { quieto: true }));
  const si = tramo(t, %16.8, %17.7);
  if (si > 0) for (let k = 0; k < 90; k++) { if (h2(k, 1, 77) > si * 1.1) continue; const x = 10 + h2(k, 2, 77) * 300, y = 114 + h2(k, 3, 77) * 50; if (h2(k, 4, 77) < 0.12) continue;
    const bx = ri(x), by = ri(y - Math.abs(Math.sin(t * 6 + k)) * 2); R.rect(bx, by - 5, bx, by, H('#f0c8a0')); ps(bx, by - 6, H('#ffe080')); ps(bx - 1, by - 5, H('#f0c8a0')); ps(bx + 1, by - 5, H('#f0c8a0')); }
  atomG(260, 176, t, { pose: t > %16.6 ? 'brazos' : 'senala', dir: -1, cara: t > %16.6 ? 'sonrisa' : 'sorpresa' });
  if (t < %16.4) R.icono('?', 248, 100 + flota(t), H('#ffe080'), K, 2);
};
// ── 5 · la lumbre congelada: el puentecito; para salvar a los cinco, empujar con tus manos al de la barandilla ──
const q5 = (t) => {
  cong('p2', () => ph2(9.0, { quieto: true, sinBrillo: true }));
  const p = tranvia(130, 170, t, { s: 2, palanca: 1 }), [X0, Y0] = p.caja, v = vias(p, 2);
  cinco(v, 1);
  // en el puentecito, un señor (a color) mira el tranvía; Atom, detrás, alarga las manos en «push someone yourself»… y duda
  const em = ease(tramo(t, %21.1, %21.6)), duda = t > %21.9;
  R.actor(EL.ciudadanoLT, X0 + 86, Y0 + 40, t, { dir: -1, sorpresa: em > 0.5 });
  AT.atom(R, X0 + 112 - ri(em * 4) + (duda ? 3 : 0), Y0 + 40, t, { s: 1, habla: voz(t), pose: em > 0 && !duda ? 'sostiene' : duda ? 'brazos' : 'piensa', dir: -1, cara: duda ? 'sorpresa' : em > 0 ? 'triste' : 'normal' });
  if (duda) R.icono('!', X0 + 112, Y0 + 2 + flota(t), H('#ff6a4a'), K, 2);
  if (t > %19.6) R.numero('5', v.cinco(2)[0], v.cinco(2)[1] - 22, { centro: true });
};
// ── 6 · la pared congelada: Atom da un salto atrás en «pull back»; las cuentas: 5 y 1 = 5 y 1 ──
const q6 = (t) => {
  cong('p5', () => ph5(24.0, { quieto: true }));
  const s = t - %24.1, salto = s > 0 && s < 0.6 ? ri(Math.sin(s / 0.6 * Math.PI) * 16) : 0, atras = ease(cl(s / 0.6));
  atomG(lerp(200, 250, atras), 176 - salto, t, { pose: s > 0 && s < 0.8 ? 'brazos' : t > %25.8 ? 'senala' : 'sostiene', dir: -1, cara: s > 0 && s < 1.2 ? 'sorpresa' : 'normal' });
  const c1 = tramo(t, %25.9, %26.3), c2 = tramo(t, %26.6, %27.0);
  // a la izquierda, la palanca (cambiar la vía); a la derecha, la mano (empujar): las mismas cuentas, 5 y 1
  if (c1 > 0) { R.linea(52, 70, 60, 58, K); R.linea(53, 70, 61, 58, H('#a8a8b8')); R.disco(61, 57, 3, K); R.disco(61, 57, 2, H('#e83a2e')); R.rect(48, 70, 58, 72, H('#6a6a78'));
    R.numero('5', 84, 72, { tam: 16, centro: true }); R.numero('1', 110, 72, { tam: 16, centro: true }); }
  if (c2 > 0) { igual(140, 64); R.icono('mano', 170, 58, H('#f0c8a0'), K, 2); R.numero('5', 200, 72, { tam: 16, centro: true }); R.numero('1', 226, 72, { tam: 16, centro: true }); AT.anillo(R, 140, 64, 104, 22, t, tramo(t, %27.0, %27.7)); }
};
// ── 7 · la torre congelada: Leto, a color, acepta empujar; 1… y en «billions», miles de millones ──
const q7 = (t) => {
  cong('p12', () => ph12(63.0, { quieto: true }));
  const p = tranvia(110, 168, t, { s: 1.6, palanca: -1 });
  const em = ease(tramo(t, %28.5, %29.2));
  R.actor(LT.letoPielLT, 172, 168, t, { dir: -1, sostiene: em > 0 ? [ri(170 - em * 4), 154] : undefined, triste: t > %29.2, sonrisa: t < %28.4 });
  brillaPiel(172, 168, t, 0.6);
  const u1 = tramo(t, %30.2, %30.5), ub = tramo(t, %31.4, %31.8);
  if (u1 > 0 && ub <= 0) R.numero('1', 168, 92, { tam: 16, centro: true });
  if (ub > 0) { R.numero('1000000000', 168, 92, { tam: 16, centro: true, n: ri(ub * 160) }); for (let k = 0; k < 40; k++) { const f = cl(ub * 1.4 - h2(k, 1, 9) * 0.4); if (f > 0) muneco(20 + h2(k, 2, 9) * 280, 176 - h2(k, 3, 9) * 30, pal(['#a83a2e', '#2e5a6a', '#d8a040', '#5a3a6a', '#3a8a4a'])[k % 5], f); } }
  atomG(270, 176, t, { pose: ub > 0 ? 'brazos' : 'piensa', dir: -1, cara: ub > 0 ? 'sorpresa' : 'triste' });
};
// ── 8 · el desierto congelado: el tranvía de juguete se va por la vía larga; los años cuentan; la humanidad sigue ──
const q8 = (t) => {
  cong('p1', () => ph1(4.0, { quieto: true }));
  const anos = tramo(t, %32.5, %33.6); if (anos > 0) R.numero(String(Math.round(anos * 3500)), 214, 84, { tam: 16, centro: true });
  // la vía larga que se pierde en las dunas, con sus traviesas
  for (let x = 0; x < 320; x++) { const y = 168 - x * 0.06; ps(x, y, H('#c8c8d0')); ps(x, y + 3, H('#c8c8d0')); if (x % 5 === 0) R.rect(x, ri(y) - 1, x + 1, ri(y) + 4, H('#8a6a44')); }
  const tx = lerp(70, 250, ease(tramo(t, %32.6, %36.6))), ty = 168 - tx * 0.06;
  tranvia(tx + 30, ri(ty + 4), t, { s: 1, palanca: -1 });
  // en «humanity» se encienden lucecitas por todas las dunas: la gente que sigue viva
  const hu = tramo(t, %34.7, %35.9); if (hu > 0) for (let k = 0; k < 70; k++) { if (h2(k, 1, 13) > hu) continue; const x = h2(k, 2, 13) * 316, y = 96 + h2(k, 3, 13) * 46; if (!tranquilo(ri(x), ri(y))) { ps(x, y, H('#ffe080')); mezP(x + 1, y, H('#ffb040'), 0.6); } }
  atomG(40, 176, t, { pose: hu > 0 ? 'senala' : 'quieto', dir: 1, cara: hu > 0 ? 'sonrisa' : 'triste' });
};
const efectos = [[0.6, 'pasos'], [%2.1, 'pop'], [%5.5, 'brillo'], [%8.4, 'pop'], [%10.0, 'aldea', { k: 0 }], [%11.8, 'interruptor'], [%13.8, 'campana'], [%15.2, 'pop'],
  [%17.0, 'publico'], [%21.3, 'golpecito'], [%24.2, 'boing'], [%26.7, 'brillo'], [%28.6, 'golpecito'], [%31.4, 'aldea', { k: 2 }], [%32.6, 'carro'], [%34.9, 'brillo']];
T.rodar(E, R, [[0, q1], [%5.0, q2], [%11.1, q3], [%15.2, q4], [%19.2, q5], [%23.0, q6], [%27.8, q7], [%32.5, q8]], { efectos, año: null });
'''

CAB_P = '''// LT-PRECIO (frases 16–18: «padre», «multitud», «alia2»), año 21, sin cartela. Catorce planos, cortados en la voz inglesa:
// 1 (0) desierto/general de noche: Leto llega por la cresta; el guía trae al ciego; se cruzan en «crosses paths»; a lo
//   lejos, la lumbre del campamento;
// 2 («and he recognizes») la lumbre de cerca (fondo local): Leto se para en seco «!»; el guía echa una rama; en «father,
//   Paul» asoma de luz el padre joven sobre el ciego; en «sand» una ráfaga levanta la arena;
// 3 («Imagine») la lumbre de lejos bajo el cielo enorme (fondo local): lucecitas de conversación; Atom, luciérnaga, baja
//   a escuchar; una fugaz en «no longer see»;
// 4 («a son») la lumbre de lado (fondo local): en «sees further» la mirada de Leto corre por el horizonte; el padre
//   confiesa; en «golden path» las chispas se ordenan en un arco de oro;
// 5 («but couldn't») la pared de roca (fondo local): sus sombras gigantes; el padre le toca la cara en «couldn't bear»;
//   en «become» la sombra del niño es la de un gusano enorme;
// 6 («They return») desierto/general al ocaso: los tres caminan hacia Arrakeen, que se enciende en «Arrakeen»;
// 7 («crowd») ciudadela balcon/multitud (2.ª vez, a la derecha): el predicador en el brocal; capuchas oscuras en «Alia's
//   men»; en «killed» un destello entre la gente y ya no está; la venda cae; Leto tiende la mano al brocal vacío;
// 8 («when he had found him») la escalinata (fondo local): Leto coge el bastón; los últimos se van en «no one left»;
//   en «walk that path» sube solo;
// 9 («Leto comes before Alia») trono/tarima: Leto entra; Alia se levanta en «Alia»; en «no one can stop him» los guardias
//   rebotan contra su piel;
// 10 («And at the last moment») la galería (fondo local): la sombra del barón en la pared; en «regains control» encoge
//   hasta la suya y Alia se yergue;
// 11 («just long enough») la torre de cerca (fondo local): en «free herself» la sombra se despega y se va hecha ceniza;
// 12 («and chooses to die») la torre de lejos, de noche (fondo local): la ventana de lo alto se apaga; nada más;
// 13 («Leto takes the throne») trono/general de día: sube y se sienta en «throne»; «9» en «nine»; se inclinan en «empire»;
// 14 («ruled») el trono de cerca (fondo local): se mira la mano; en «something» su reflejo en las losas es el de un
//    gusano. (lo congela lt-tranvia)'''

CAB_T = '''// LT-TRANVIA (frase 19), LA PAUSA «fíjate» del dilema del tranvía, sin año. Ocho planos sobre lt-precio congelado:
// 1. el trono congelado (p14): Atom al doble entra; «?» en «dilemma»;
// 2. la escalinata congelada (p8): «1967»; en «trolley» saca T.pausa 'tranvia'; cinco muñequitos en la recta en «five»;
// 3. el salón congelado (p9): en «switch» tira de la palanca; UN muñequito en la rama de arriba en «only one»;
// 4. la plaza congelada (p7): «Would you?»; en «say yes» la multitud alza las manos, de color;
// 5. la lumbre congelada (p2): el puentecito; en «push someone yourself» Atom pone las manos tras el muñeco grande;
// 6. la pared congelada (p5): salta atrás en «pull back»; las cuentas 5 1 = 5 1 en «exactly the same»;
// 7. la torre congelada (p12): Leto a color empuja en «agrees to push»; 1… y en «billions» miles de muñequitos;
// 8. el desierto congelado (p1): el tranvía se va por la vía larga; 0→3500 en «thousands of years»; lucecitas en «humanity».'''

E = {}
E['lt-precio'] = ('El precio', CAB_P, _precio(COMUN + PRECIO_P1 + PRECIO + PRECIO_ROD))
E['lt-tranvia'] = ('El dilema del tranvía', CAB_T, _abs(COMUN + PRECIO_P1 + PRECIO) + _tranvia(TRANVIA))
