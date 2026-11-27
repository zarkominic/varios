E = {}
# Marcas reales de la voz (marcas-ep44.json): [inicio, fin] de cada frase, en segundos de su escena
M_ = {'caladan': (0.5, 18.029), 'arrakis': (18.429, 35.628), 'fremen': (36.028, 51.548), 'fijate1': (0.2, 21.434)}


def F(k, s):
    """El instante s (segundos de la escena, de linea.json) escrito como en('marca', fracción)."""
    a, b = M_[k]
    return f"en('{k}', {(s - a) / (b - a):.4f})"


def CONST(**kw):
    return 'const ' + ', '.join(f'{k} = {v}' for k, v in kw.items()) + ';\n'


# ═══════════════════════ lo común de las dos escenas (JS crudo, sin en(): solo números) ═══════════════════════
COMUN = r'''
import { c_relojArena } from '/atomo/plato/escenas/hm-comun.js';
const AT = T.AT, PA = T.PA, K = T.C.k, ri = Math.round;
const B4M = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4M[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const ns = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h2(xi, yi), b = h2(xi + 1, yi), c = h2(xi, yi + 1), d = h2(xi + 1, yi + 1); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };
const rmp = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return ramp[Math.max(0, Math.min(ramp.length - 1, l))]; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const pal = (a) => a.map((c) => hex(c));
const ease = (u) => u * u * (3 - 2 * u);
const FIJOS = {};
// lo fijo de un fondo propio, pintado una vez en su búfer (R.usar(prev), nunca R.usar() a secas)
const fijo = (k, f) => { if (!FIJOS[k]) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); FIJOS[k] = b; } R.copiar(FIJOS[k]); };
const sombrea = (x, y, a) => R.pset(x, y, mez(R.pget(x, y), K, a));
// EL GRANO DE ESPECIA AZUL (el hilo: Atom se lo guarda en el desierto y lo suelta en pa-cierre): núcleo de 3 px con su
// filo oscuro, brillo que late y un destello
const AZ = pal(['#141e4a', '#2a4ab0', '#5a8ae8', '#a8ccff', '#f0f8ff']);
const grano = (x, y, t, s = 1) => { const X = ri(x), Y = ri(y);
  R.halo(X, Y, (5.5 + Math.sin(t * 6) * 1.2) * s, [AZ[1], AZ[2], AZ[3]], 1.15);
  R.rect(X - 1, Y - 2, X + 1, Y + 2, AZ[0]); R.rect(X - 2, Y - 1, X + 2, Y + 1, AZ[0]); R.rect(X - 1, Y - 1, X + 1, Y + 1, AZ[3]); R.pset(X, Y, AZ[4]);
  if (Math.sin(t * 9) > 0.2) { R.pset(X, Y - 3, AZ[4]); R.pset(X + 3, Y, AZ[3]); R.pset(X - 3, Y, AZ[3]); } };
// Atom luciérnaga; con o.grano, el grano azul le da vueltas como un electrón más
const lucie = (x, y, t, o = {}) => { AT.luciernaga(R, x, y, t, o); if (o.grano) { const a = t * 2.4; grano(x + Math.cos(a) * 12, y + Math.sin(a) * 4, t, 0.7); } };
// EL SÍMBOLO DE LA BENE GESSERIT (nuestro, sin letras): un anillo con un ojo almendrado y su pupila, y tres rayos abajo
const simbolo = (cx, cy, s, c1, c2) => {
  const r = 10 * s;
  for (let a = 0; a < 140; a++) { const p = a / 140 * Math.PI * 2; for (let w = 0; w < Math.max(1, s); w++) R.pset(ri(cx + Math.cos(p) * (r - w)), ri(cy + Math.sin(p) * (r - w)), c1); }
  for (let i = -6 * s; i <= 6 * s; i++) { const e = Math.round(3.2 * s * Math.sqrt(Math.max(0, 1 - (i / (6.2 * s)) ** 2))); R.pset(ri(cx + i), ri(cy - e), c1); R.pset(ri(cx + i), ri(cy + e), c1); }
  R.disco(cx, cy, 1.8 * s, c2);
  for (const k of [-1, 0, 1]) R.linea(ri(cx + k * 4 * s), ri(cy + r + 2 * s), ri(cx + k * 6 * s), ri(cy + r + 6 * s), c1);
};
'''

# ═══════════════════════ la galería del mural (fondo propio): pa-caladan 10 y 11, y sus congelados en pa-profecia ═══════
MURAL = r'''
const ROCA = pal(['#120c0a', '#22160f', '#3a2618', '#563a24', '#74502f', '#94683c', '#b88a52']);
const ARENA = pal(['#3a2a1a', '#5a4228', '#7a5a36', '#9a7646', '#b89058', '#d4ac6c']);
const OCRE = hex('#d89a48'), ROJOP = hex('#a8402a'), BLANCOP = hex('#ead8b4');
const roca = (x, y, base) => { let v = base + 0.8 * Math.sin(y * 0.24 + 3.5 * ns(x * 0.015, y * 0.03)) + (ns(x * 0.12, y * 0.12) - 0.5) * 1.1 + (ns(x * 0.45, y * 0.45) - 0.5) * 0.6;
  if (Math.abs(ns(x * 0.07, y * 0.012) - 0.5) < 0.018) v -= 1.4; if (Math.abs(ns(x * 0.011 + 5, y * 0.09) - 0.5) < 0.012) v -= 1.1; const g = h2(x, y, 3); if (g < 0.025) v += 1.2; else if (g > 0.985) v -= 1; return v; };
// pigmento antiguo sobre la roca: se mezcla con la piedra y se descascarilla
const pinta = (x, y, c) => { const X = ri(x), Y = ri(y); if (h2(X, Y, 7) < 0.13) return; R.pset(X, Y, mez(R.pget(X, Y), c, 0.78)); };
const trazo = (x0, y0, x1, y1, c, g = 1) => { const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0))); for (let i = 0; i <= n; i++) for (let w = 0; w < g; w++) pinta(x0 + (x1 - x0) * i / n + w * 0.5, y0 + (y1 - y0) * i / n + w * 0.8, c); };
const aro = (cx, cy, r, c, g = 1) => { const n = Math.ceil(r * 7); for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2; for (let w = 0; w < g; w++) pinta(cx + Math.cos(a) * (r - w), cy + Math.sin(a) * (r - w), c); } };
const mancha = (cx, cy, r, c) => { for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) pinta(cx + x, cy + y, c); };
const manoPintada = (cx, cy, c) => { mancha(cx, cy, 3, c); for (const [dx, dy] of [[-4, -5], [-1.5, -6.5], [1.5, -6.5], [4, -5], [5, -1]]) { trazo(cx + dx * 0.5, cy + dy * 0.5, cx + dx, cy + dy, c, 1); } };
// EL MURO DE PETROGLIFOS (pa-caladan 10, iluminado del todo; la lámpara lo descubre): roca con vetas, los cinco planetas,
// la estrella que cae, la figura del salvador con su halo y los brazos alzados, gente arrodillada, manos y espirales
const PLANETAS10 = [[38, 44, 7], [80, 38, 5], [122, 46, 8], [164, 36, 5], [204, 44, 6]];
const SALV10 = { x: 254, y: 72 };
const muroLuz = () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    if (y < 150) { let v = roca(x, y, 3.4) - (y < 12 ? 1.2 : 0); if (Math.abs(Math.sin(x * 0.06 + y * 0.02) * 30 - ((y * 1.7) % 30)) < 0.6 && ns(x * 0.05, y * 0.05) > 0.6) v -= 1.6; R.pset(x, y, rmp(ROCA, v, x, y)); }
    else { const v = 3.2 + Math.sin(x * 0.4 + Math.sin(y * 0.7) * 2) * 0.35 + (ns(x * 0.2, y * 0.3) - 0.5) * 1.0 - (y < 154 ? 1.2 : 0); R.pset(x, y, rmp(ARENA, v, x, y)); }
  }
  // el zócalo: piedras sueltas y la sombra del pie del muro
  for (let x = 0; x < 320; x++) { R.pset(x, 150, ROCA[1]); R.pset(x, 151, ROCA[2]); if (h2(x, 3) < 0.12) { R.rect(x, 152, x + 2, 153, ROCA[3]); R.pset(x, 151, ROCA[4]); } }
  for (let k = 0; k < 9; k++) { const x = 14 + k * 37 + ri(h2(k, 5) * 14), y = 158 + ri(h2(k, 9) * 16); R.rect(x, y, x + 3, y + 1, ARENA[1]); R.rect(x, y - 1, x + 2, y - 1, ARENA[4]); }
  // los cinco planetas pintados (ocre y blanco), con un anillo al del centro
  PLANETAS10.forEach(([cx, cy, r], k) => { mancha(cx, cy, r, k % 2 ? ROJOP : OCRE); aro(cx, cy, r + 1, BLANCOP); if (k === 2) { trazo(cx - r - 5, cy + 2, cx + r + 5, cy - 2, BLANCOP); } });
  // la estrella que cae hacia el salvador
  trazo(214, 24, 244, 54, BLANCOP, 1); for (let i = 0; i < 8; i++) pinta(214 - i * 3, 24 - i * 3 + (i % 2), OCRE);
  for (const [dx, dy] of [[0, -3], [0, 3], [-3, 0], [3, 0], [-2, -2], [2, 2], [-2, 2], [2, -2]]) trazo(244, 56, 244 + dx, 56 + dy, BLANCOP);
  // el salvador: cabeza, halo, túnica y brazos alzados
  const { x: sx, y: sy } = SALV10;
  mancha(sx, sy, 5, BLANCOP); aro(sx, sy, 10, OCRE, 2);
  for (let j = 0; j < 52; j++) { const w = 4 + j * 0.3; trazo(sx - w, sy + 8 + j, sx + w, sy + 8 + j, j % 7 === 0 ? ROJOP : BLANCOP); }
  trazo(sx - 4, sy + 10, sx - 14, sy - 6, BLANCOP, 2); trazo(sx + 4, sy + 10, sx + 14, sy - 6, BLANCOP, 2);
  // la gente arrodillada que lo mira
  for (let k = 0; k < 6; k++) { const x = 100 + k * 20, y = 132 - (k % 2) * 4; mancha(x + 3, y - 10, 2, OCRE); trazo(x + 2, y - 7, x + 7, y - 2, OCRE, 2); trazo(x + 7, y - 2, x + 1, y, OCRE, 1); trazo(x + 4, y - 6, x + 9, y - 9, OCRE); }
  // manos y espirales de los Fremen
  for (const [x, y] of [[30, 96], [52, 120], [292, 128], [70, 72], [186, 96]]) manoPintada(x, y, ROJOP);
  for (const [cx, cy] of [[22, 132], [150, 98], [300, 92]]) for (let a = 0; a < 40; a++) { const r = a * 0.18, p = a * 0.42; pinta(cx + Math.cos(p) * r, cy + Math.sin(p) * r, BLANCOP); }
  // dunas pintadas (líneas onduladas) bajo los planetas
  for (let x = 20; x < 220; x++) { pinta(x, 64 + Math.sin(x * 0.12) * 2.5, OCRE); if (x % 3) pinta(x, 70 + Math.sin(x * 0.12 + 1.6) * 2, OCRE); }
};
// la luz de una lámpara sobre el muro (pa-caladan 10): un óvalo de luz cálida (rx de ancho, ry de alto, centrado algo
// por encima de la llama) con el borde tramado; fuera, casi negro; lo que Paul ya ha pasado (a su izquierda) se queda
// en penumbra, algo más claro que lo que aún no ha visto
const alumbra = (lx, ly, rx, ry, extra) => {
  const B = R.buf, cy = ly - ry * 0.42;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    // en el suelo (y ≥ 150) la luz se derrama más a lo ancho y nunca baja tanto: se leen piedras, surcos y huellas
    const sx = y >= 150 ? rx * 1.7 : rx, d = Math.hypot((x - lx) / sx, (y - cy) / ry), f = Math.max(0, Math.min(1, (1 - d) / 0.34)), pasado = Math.max(0, Math.min(1, (lx - 30 - x) / 50));
    let L = (y >= 150 ? 0.3 : 0.13) + pasado * 0.2 + (1.08 - (y >= 150 ? 0.3 : 0.13) - pasado * 0.2) * f * f * (3 - 2 * f) + (extra ? extra(x, y) : 0);
    L = Math.min(1.08, Math.floor(L * 7 + b4(x, y)) / 7);
    const i = y * 320 + x, c = B[i], w = 1 - f * 0.12, g = f * 0.04;
    B[i] = (0xff000000 | (Math.min(255, Math.round(((c >>> 16) & 255) * L * (0.85 + (1 - f) * 0.1) * w)) << 16) | (Math.min(255, Math.round(((c >>> 8) & 255) * L * (1 + g))) << 8) | Math.min(255, Math.round((c & 255) * L * (1 + f * 0.1)))) >>> 0;
  }
};
// el suelo de la galería, pintado cada fotograma antes de la luz: guijarros y piedras con su sombra, surcos de arena y
// las huellas que Paul va dejando
const PIEDRAS10 = Array.from({ length: 22 }, (_, k) => [ri(h2(k, 31) * 316), ri(156 + h2(k, 33) * 22), 1 + ri(h2(k, 35) * 3.2)]);
const suelo10 = (px) => {
  for (let x = 0; x < 320; x += 1) { const y = ri(166 + Math.sin(x * 0.07) * 3); if (x % 9 < 6) { sombrea(x, y, 0.25); R.pset(x, y - 1, mez(R.pget(x, y - 1), ARENA[5], 0.4)); } }
  for (const [x, y, r] of PIEDRAS10) { for (let i = 0; i < r * 2 + 3; i++) sombrea(x + i, y + 1, 0.35);
    for (let j = -r; j <= 0; j++) for (let i = -r; i <= r; i++) if (i * i + j * j * 2.2 <= r * r + 1) R.pset(x + i, y + j, rmp(ROCA, 4.6 - (i + j) / (r + 1) * 1.2 + (h2(x + i, y + j) - 0.5) * 0.6, x + i, y + j)); }
  for (let x = 10; x < px - 8; x += 7) { const y = 161 + ((x / 7) & 1) * 2; sombrea(x, y, 0.4); sombrea(x + 1, y, 0.4); R.pset(x, y - 1, ARENA[4]); }
};
// la lámpara de barro de los Fremen, colgada de la mano (mx, my); devuelve la llama
const lampara = (mx, my, t) => {
  const x = ri(mx), y = ri(my);
  R.linea(x, y, x, y + 3, K);
  R.rect(x - 4, y + 4, x + 4, y + 7, K); R.rect(x - 3, y + 4, x + 3, y + 6, hex('#a8683a')); R.rect(x - 3, y + 4, x + 3, y + 4, hex('#d8985a')); R.rect(x + 4, y + 3, x + 6, y + 5, K); R.pset(x + 5, y + 4, hex('#a8683a'));
  const fl = Math.sin(t * 19) * Math.sin(t * 7.3);
  R.pset(x + 5, y + 2, hex('#ffe08a')); R.pset(x + 5, y + 1, fl > 0 ? hex('#ffffff') : hex('#ffd060')); R.pset(x + 5 + (fl > 0.4 ? 1 : 0), y, hex('#ff9a3a'));
  return [x + 5, y + 1];
};
// el muro del 10 en el instante tt: Paul camina con la lámpara de izquierda a derecha y, en «prophecy», la alza ante el
// salvador, que se enciende de oro (W: { p: inicio del plano, prof: «prophecy» })
const muroCerca = (tt, W) => {
  fijo('muro10', muroLuz);
  const u = tramo(tt, W.p + 0.15, W.prof - 0.45), x = lerp(8, 212, ease(u)), alza = tramo(tt, W.prof - 0.45, W.prof);
  // dónde queda la lámpara (la mano que la sostiene) para calcular la luz antes de pintar a Paul
  const hx = x + 17, hy = 140 - alza * 12, fl = Math.sin(tt * 19) * 0.04;
  suelo10(x);
  alumbra(hx + 5, hy + 2, 46 + alza * 12 + fl * 30, 74 + alza * 26 + fl * 30, (px, py) => { const d = Math.hypot(px - (x - 16), py - 104); return d < 26 ? (1 - d / 26) * 0.3 : 0; });
  // la sombra de Paul en la arena, alargada hacia la izquierda (la lámpara la lleva delante)
  for (let i = 0; i < 18; i++) for (let j = 0; j < 3; j++) if (Math.abs(j - 1) * 6 + i < 18) sombrea(ri(x) - 2 - i, 159 + j, 0.45 - i * 0.02);
  // el salvador se enciende en «prophecy»: un filo de oro que late
  const oro = tramo(tt, W.prof, W.prof + 0.35);
  if (oro > 0) { const { x: sx, y: sy } = SALV10, G = hex('#ffd860'), pul = 0.6 + 0.4 * Math.sin(tt * 8);
    for (let a = 0; a < 90; a++) { const p = a / 90 * Math.PI * 2; if (b4(a, 3) < oro * pul) R.pset(ri(sx + Math.cos(p) * 11), ri(sy + Math.sin(p) * 11), G); }
    for (let j = 0; j < 52; j += 2) { const w = 5 + j * 0.3; if (b4(j, 1) < oro) { R.pset(ri(sx - w), sy + 8 + j, G); R.pset(ri(sx + w), sy + 8 + j, G); } } }
  const r = R.actor(PA.paul, ri(x), 160, tt, { dir: 1, anda: u > 0 && u < 1, sostiene: [ri(hx), ri(hy)], sorpresa: tt > W.prof - 0.1, habla: tt > W.prof + 0.6 && Math.sin(tt * 8) > 0 });
  const [fx, fy] = lampara(r.mano[0], r.mano[1], tt);
  R.halo(fx, fy, 6 + Math.sin(tt * 13), pal(['#c87a3a', '#ffb050', '#ffe8a0']), 1.0);
  // motas de polvo que brillan al cruzar la luz y suben con el calor de la llama
  for (let k = 0; k < 18; k++) { const f = (tt * 0.12 + k * 0.173) % 1, mx = fx + (h2(k, 41) - 0.5) * 80 + Math.sin(tt * 0.9 + k) * 4, my = fy + 20 - f * 90;
    const d = Math.hypot((mx - fx) / 44, (my - (fy - 30)) / 72); if (d < 0.9) R.pset(ri(mx), ri(my), d < 0.5 ? hex('#fff0c0') : hex('#c89a5a')); }
  return { x, fx, fy };
};

// LA GALERÍA DEL MURAL (pa-caladan 11): la sala del sietch con la gran silueta tallada del salvador en el centro; la
// sombra de Paul, echada por la lámpara del suelo, crece y encaja en ella «como una llave» (W: { p, lock })
const TALLA = { cx: 160, cy: 96 };
const segD = (x, y, ax, ay, bx, by) => { const vx = bx - ax, vy = by - ay, u = Math.max(0, Math.min(1, ((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy))); return Math.hypot(x - ax - vx * u, y - ay - vy * u); };
const dentroTalla = (x, y, cx, cy, s, brazos = true) => { const hy = cy - 44 * s; if ((x - cx) ** 2 + (y - hy) ** 2 < (8.5 * s) ** 2) return true;
  if (brazos && (segD(x, y, cx - 8 * s, cy - 30 * s, cx - 21 * s, cy - 62 * s) < 3.6 * s || segD(x, y, cx + 8 * s, cy - 30 * s, cx + 21 * s, cy - 62 * s) < 3.6 * s)) return true;
  const y0 = cy - 34 * s, y1 = cy + 40 * s; if (y < y0 || y > y1) return false; return Math.abs(x - cx) < (8 + (y - y0) / (y1 - y0) * 15) * s; };
const LAMPS11 = [[34, 64], [96, 52], [224, 52], [286, 64]];
const galeriaLuz = () => {
  const { cx, cy } = TALLA;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let luz = 0; for (const [lx, ly] of LAMPS11) luz += Math.max(0, 1 - Math.hypot(x - lx, (y - ly) * 1.2) / 70) * 1.4;
    luz += Math.max(0, 1 - Math.hypot(x - 160, y - 150) / 120) * 1.2;
    if (y < 146) { let v = roca(x, y, 1.4 + luz * 1.6) - (y < 14 ? 0.6 : 0); R.pset(x, y, rmp(ROCA, v, x, y)); }
    else { const v = 1.6 + luz * 1.3 + Math.sin(x * 0.35 + Math.sin(y * 0.6) * 2) * 0.35 + (ns(x * 0.2, y * 0.3) - 0.5) * 0.9 - (y < 150 ? 1.1 : 0); R.pset(x, y, rmp(ARENA, v, x, y)); }
  }
  // la gran talla: un hueco hundido con su filo de luz a la izquierda y la sombra a la derecha, y el halo grabado
  for (let y = 28; y < 140; y++) for (let x = 130; x < 192; x++) if (dentroTalla(x, y, cx, cy, 1)) {
    const izq = !dentroTalla(x - 1, y, cx, cy, 1), der = !dentroTalla(x + 2, y, cx, cy, 1), arr = !dentroTalla(x, y - 1, cx, cy, 1);
    R.pset(x, y, izq || arr ? ROCA[6] : der ? ROCA[0] : mez(R.pget(x, y), ROCA[1], 0.55));
  }
  for (let a = 0; a < 120; a++) { const p = a / 120 * Math.PI * 2, X = ri(cx + Math.cos(p) * 15), Y = ri(cy - 44 + Math.sin(p) * 15); R.pset(X, Y, ROCA[0]); R.pset(X, Y - 1, ROCA[6]); }
  for (let k = 0; k < 12; k++) { const p = k / 12 * Math.PI * 2; for (let d = 18; d < 24; d++) R.pset(ri(cx + Math.cos(p) * d), ri(cy - 44 + Math.sin(p) * d), d % 2 ? ROCA[0] : ROCA[5]); }
  // las cornisas laterales con nichos (cántaros y telas) y los peldaños tallados
  for (const [x0, x1] of [[6, 110], [210, 314]]) { R.rect(x0, 80, x1, 83, ROCA[1]); R.rect(x0, 79, x1, 79, ROCA[5]);
    for (let x = x0 + 8; x < x1 - 14; x += 26) { R.rect(x, 90, x + 12, 106, ROCA[0]); R.rect(x + 1, 90, x + 11, 90, ROCA[2]); const q = ((x >> 3) + (x0 > 100 ? 1 : 0)) % 4;
      if (q === 0) { R.disco(x + 6, 101, 4, K); R.disco(x + 6, 101, 3, hex('#8a4a2a')); R.rect(x + 4, 95, x + 8, 97, hex('#6a3a20')); R.pset(x + 4, 99, hex('#c87a4a')); }
      else if (q === 1) { R.rect(x + 2, 99, x + 10, 106, hex('#3a5a8a')); for (let i = x + 2; i <= x + 10; i += 2) { R.pset(i, 102, hex('#d8b060')); R.pset(i + 1, 104, hex('#8a3a2a')); } }
      else if (q === 2) { for (let j = 0; j < 3; j++) { R.rect(x + 2 + j, 104 - j * 3, x + 10 - j, 105 - j * 3, K); R.rect(x + 3 + j, 104 - j * 3, x + 9 - j, 104 - j * 3, hex('#c8985a')); } }
      else { for (let j = 0; j < 3; j++) { R.rect(x + 2, 102 - j * 4 + 1, x + 10, 104 - j * 4 + 1, hex('#e8d4a8')); R.pset(x + 2, 103 - j * 4 + 1, K); R.pset(x + 10, 103 - j * 4 + 1, K); } } } }
  // tapices de rombos colgados (azul y ocre de los Fremen)
  for (const [x0, x1] of [[112, 126], [194, 208]]) for (let y = 30; y < 74; y++) for (let x = x0; x <= x1; x++) { const d = (Math.abs((x - x0) - 7) + Math.abs((y % 14) - 7)); R.pset(x, y, x === x0 || x === x1 ? K : d < 3 ? hex('#d8a048') : d < 6 ? hex('#2e4a7a') : hex('#8a3a2a')); }
  for (const [x0, x1] of [[112, 126], [194, 208]]) for (let x = x0; x <= x1; x += 2) R.rect(x, 74, x, 77, hex('#d8a048'));
  // cántaros grandes, una estera y odres en el suelo
  for (const [x, y] of [[14, 150], [26, 154], [298, 150], [308, 156]]) { R.disco(x, y - 7, 6, K); R.disco(x, y - 7, 5, hex('#9a5a32')); R.rect(x - 2, y - 15, x + 2, y - 12, hex('#7a4426')); R.pset(x - 2, y - 9, hex('#d89a6a')); R.pset(x - 3, y - 8, hex('#d89a6a')); }
  for (let y = 164; y < 176; y++) for (let x = 104; x < 216; x++) R.pset(x, y, ((x + y) >> 2) % 3 === 0 ? hex('#8a5a2a') : (x + (y >> 1)) % 5 === 0 ? hex('#3a5a8a') : hex('#b88a4a'));
  for (let x = 104; x < 216; x++) { R.pset(x, 163, K); R.pset(x, 176, K); }
  // los soportes de las lámparas de pared (las llamas se animan aparte)
  for (const [lx, ly] of LAMPS11) { R.rect(lx - 4, ly + 4, lx + 4, ly + 7, K); R.rect(lx - 3, ly + 4, lx + 3, ly + 6, hex('#a8683a')); R.rect(lx - 1, ly + 8, lx + 1, ly + 12, ROCA[1]); }
};
const llama = (x, y, t, k) => { const f = Math.sin(t * 17 + k * 3) * Math.sin(t * 6.1 + k); R.halo(x, y - 1, 9 + f * 1.5, pal(['#8a4a20', '#d8803a', '#ffd070']), 0.9); R.pset(x, y, hex('#ffe08a')); R.pset(x, y - 1, f > 0 ? hex('#ffffff') : hex('#ffd060')); R.pset(x + (f > 0.3 ? 1 : 0), y - 2, hex('#ff9a3a')); };
// lo de la galería en el instante tt, SIN Atom (lo usa el congelado de pa-profecia)
const galeria = (tt, W) => {
  fijo('galeria11', galeriaLuz);
  LAMPS11.forEach(([x, y], k) => llama(x, y + 3, tt, k));
  const u = tramo(tt, W.p + 0.1, W.lock - 0.05), px = lerp(-16, 153, ease(u)), pcx = px + 7;
  // la sombra de Paul en el muro (de la lámpara del suelo): grande y corrida mientras se acerca, encaja en la talla
  const k = Math.abs(pcx - 160), s = 1 + Math.min(k, 140) / 260, scx = 160 + (pcx - 160) * 0.85, scy = TALLA.cy + k * 0.06, alzaB = tt > W.lock - 0.35;
  for (let y = 10; y < 146; y++) for (let x = Math.max(0, ri(scx - 34 * s)); x < Math.min(320, ri(scx + 34 * s)); x++) if (dentroTalla(x, y, scx, scy, s, alzaB)) sombrea(x, y, 0.6);
  // en «lock», el filo de la talla se enciende de oro y late
  const oro = tramo(tt, W.lock, W.lock + 0.3);
  if (oro > 0) { const G = hex('#ffd860'), G2 = hex('#c89a3a'), pul = 0.7 + 0.3 * Math.sin(tt * 7);
    for (let y = 26; y < 140; y++) for (let x = 130; x < 192; x++) if (dentroTalla(x, y, TALLA.cx, TALLA.cy, 1) && (!dentroTalla(x - 1, y, TALLA.cx, TALLA.cy, 1) || !dentroTalla(x + 1, y, TALLA.cx, TALLA.cy, 1) || !dentroTalla(x, y - 1, TALLA.cx, TALLA.cy, 1)) && b4(x, y) < oro * pul + 0.1) R.pset(x, y, (x + y) % 3 ? G : G2);
    for (let a = 0; a < 60; a++) { const p = a / 60 * Math.PI * 2 + tt; if (b4(a, 2) < oro * 0.8) R.pset(ri(TALLA.cx + Math.cos(p) * 15), ri(TALLA.cy - 44 + Math.sin(p) * 15), G); } }
  const asombro = tt > W.lock + 0.15;
  R.actor(PA.fremen, 74, 150, tt, { dir: 1, brazos: asombro && tt < W.lock + 1.4, sorpresa: asombro });
  R.actor(PA.fremenMujer, 262, 152, tt, { dir: -1, brazos: asombro && tt < W.lock + 1.6, sorpresa: asombro });
  const r1 = R.actor(PA.fremen, 34, 160, tt, { dir: 1, sostiene: true, pal: { C: '#8a7048', H: '#4a3020' }, sonrisa: asombro });
  lampara(r1.mano[0], r1.mano[1] - 3, tt);
  R.actor(PA.chani, 232, 160, tt, { dir: -1, sorpresa: asombro && tt < W.lock + 0.9, triste: tt > W.lock + 0.9, habla: !asombro && tt > W.p + 1.6 && Math.sin(tt * 7) > 0.3 });
  R.actor(PA.paul, ri(px), 158, tt, { dir: 1, anda: u > 0 && u < 1, brazos: tt > W.lock - 0.35, sorpresa: tt > W.lock - 0.2 && tt < W.lock + 0.6 });
  // la lámpara del suelo, delante de Paul, que echa la sombra
  const lx = 160, ly = 172; R.rect(lx - 5, ly - 2, lx + 5, ly + 2, K); R.rect(lx - 4, ly - 2, lx + 4, ly + 1, hex('#a8683a')); R.rect(lx - 4, ly - 2, lx + 4, ly - 2, hex('#d8985a'));
  llama(lx + 1, ly - 4, tt, 9);
  // el primer término: dos peñas oscuras en las esquinas de abajo, con el filo de la luz de la lámpara
  for (const [x0, x1, top, lado] of [[0, 26, 148, 1], [294, 320, 142, -1]]) for (let x = x0; x < x1; x++) { const u = (lado > 0 ? x - x0 : x1 - 1 - x) / (x1 - x0), yt = ri(top + u * u * 26 + Math.sin(x * 0.7) * 2);
    for (let y = yt; y < 180; y++) R.pset(x, y, y === yt ? K : y < yt + 2 && u > 0.3 ? ROCA[4] : rmp(ROCA, 1.2 + (ns(x * 0.2, y * 0.2) - 0.5) * 1.2 - (y - yt) * 0.02, x, y)); }
};
'''

# ═══════════════════════════════════════════ PA-CALADAN ═══════════════════════════════════════════
CAB_CALADAN = '''// PA-CALADAN (frases 5–7), año 0 (lo que ya se vio), sin cartela; ánimo aventura. Once planos:
// 1. «Paul is born on Caladan»: la sala del castillo; Paul niño entra corriendo hasta la ventana; en «Caladan» un
//    relámpago en el cristal; en «oceans» señala el mar; en «Duke Leto» el duque le pone la mano en el hombro; Jessica
//    sonríe; Atom luciérnaga se asusta con el rayo;
// 2. «and of Jessica… an order of women»: la sala de la conspiración: Jessica entra desde la puerta acorazada; la
//    Reverenda Madre detrás de la mesa de luz; en «Bene Gesserit» se enciende en el holograma el símbolo (anillo con un
//    ojo); en «order of women» entra otra hermana por la derecha y alrededor del símbolo aparecen las familias (nudos);
// 3. «secretly breeding noble families… horses»: inserto propio: el pergamino de linajes sobre la mesa (escudos
//    inventados, puntos de generación, ramas tachadas, sello de lacre, cinta azul, cerco de taza); un halo de oro baja de
//    nudo en nudo y deja dorado el camino; en «horses» la mano canónica de la Reverenda Madre (manga negra, T.brazo en
//    diagonal desde abajo a la derecha) trae un caballito de balancín de madera, lo posa junto al árbol, lo suelta (se
//    mece) y se retira; en «produce» el último nudo se abre como un ojo azul;
// 4. «a man who could look where they cannot, the future included»: el paseo de la muralla bajo la lluvia: Paul niño
//    llega al parapeto y señala el mar; Duncan hace la ronda; en «future» aparece en las nubes un planeta de arena;
//    gag: Atom luciérnaga calado, se sacude el agua;
// 5. «The emperor sends the Atreides to Arrakis… never rains»: desde la roca, al ocaso: baja la nave de los Atreides
//    (forma propia: lente verde bronce con cúpula, aleta, ojos de buey y el halcón) y se posa en «Arrakis» con su
//    polvareda; dos Fremen la señalan; en «never rains» las gotas de Atom se evaporan;
// 6. «where the spice is found… the most valuable substance in the universe»: fondo propio, la cresta de duna de
//    cerca (cielo tramado con nubes de bolas en tres tonos y filo de sol a tres velocidades, halcón y vencejos; matas
//    secas que se mecen, piedras con sombra, el escarabajo con su rastro, las huellas de Atom y el polvo que arranca el
//    viento de la cresta): brillan las vetas de especia; Atom encuentra un grano que brilla AZUL, lo alza en «universe» y se lo guarda
//    (desde aquí lo lleva en todos los planos: el hilo);
// 7. «but it's a trap… the duke dies»: el desierto de noche: en el horizonte la ciudad; en «trap» bajan luces rojas
//    lejanas; en «night» un resplandor rojo; en «dies» se apaga la luz verde de la torre; Paul y Jessica, en la cresta,
//    miran y se dan la vuelta (nada de combate);
// 8. «Paul and his mother flee… taken in by the Fremen»: la boca del sietch al ocaso: Paul y Jessica cruzan la arena
//    dejando huellas; Chani vigila desde la repisa; en «Fremen» salen dos de la cueva a recibirlos; gag: un ratón
//    saltarín se sube a la cabeza de Atom y mira la luna;
// 9. «Paul falls in love with Chani»: la sala del sietch: Chani llega hasta Paul junto a la alberca; en «love» un
//    corazón; gag: el destiltraje de Atom gotea y una Fremen le pone un cuenco debajo;
// 10. «he discovers something unsettling… a prophecy»: fondo propio, el muro de petroglifos a oscuras: Paul camina con
//    la lámpara y su óvalo de luz cálida (borde tramado) descubre a color planetas, gente arrodillada y manos; lo ya
//    pasado queda en penumbra; en el suelo, piedras, surcos, sus huellas, su sombra y motas en la luz; en «prophecy»
//    alza la lámpara, la luz crece y el salvador se enciende de oro;
// 11. «a savior from another world… like a key in a lock»: fondo propio, la galería del mural: Paul llega ante la gran
//    talla; su sombra crece y en «key in a lock» encaja en ella (clic); los Fremen alzan los brazos. Este último plano
//    es el que congela pa-profecia.'''

CUERPO_CALADAN = CONST(
    P2=F('caladan', 5.30), P3=F('caladan', 10.36), P4=F('caladan', 14.38), P5="en('arrakis', 0)", P6=F('arrakis', 23.13),
    P7=F('arrakis', 27.87), P8=F('arrakis', 33.11), P9=F('fremen', 38.15), P10=F('fremen', 43.19), P11=F('fremen', 47.59),
) + CONST(
    RAYO=F('caladan', 1.28), OCEANOS=F('caladan', 2.88), LETO=F('caladan', 4.20), JESSICA=F('caladan', 5.54),
    BG=F('caladan', 7.46), MUJERES=F('caladan', 8.54), CRIA=F('caladan', 10.98), FAMILIAS=F('caladan', 11.40),
    CABALLOS=F('caladan', 13.32), PRODUCE=F('caladan', 14.38),
    MIRA=F('caladan', 15.44), FUTURO=F('caladan', 17.02),
    ARRAKIS=F('arrakis', 20.07), NUNCA=F('arrakis', 22.45), SPICE=F('arrakis', 23.91), HALLA=F('arrakis', 24.43),
    VALIOSA=F('arrakis', 25.37), UNIVERSO=F('arrakis', 26.99), TRAMPA=F('arrakis', 28.23), ENEMIGOS=F('arrakis', 29.99),
    NOCHE=F('arrakis', 31.11), MUERE=F('arrakis', 32.31), HUYEN=F('arrakis', 34.35),
    FREMEN=F('fremen', 37.29), AMOR=F('fremen', 40.31), CHANI=F('fremen', 40.69), JOVEN=F('fremen', 41.71),
    INQUIETA=F('fremen', 44.41), PROFECIA=F('fremen', 46.83), LLAVE=F('fremen', 50.47),
) + r'''
// ═══ 1 · la sala del castillo de Caladan ═══
const p1 = (t) => {
  T.caladan(R, t, { camara: 'ventana' });
  // el relámpago en «Caladan», recortado al hueco de la ventana
  const rel = t > RAYO - 0.05 ? Math.max(0, 1 - (t - RAYO) * 3.2) : 0;
  if (rel > 0) { R.recorte([122, 22, 198, 109]); const W2 = hex('#e8f0ff');
    for (let y = 22; y < 110; y++) for (let x = 122; x <= 198; x++) if (b4(x, y) < rel * 0.55) R.pset(x, y, mez(R.pget(x, y), W2, 0.6));
    if (rel > 0.4) { let x = 168; for (let y = 24; y < 70; y += 3) { const nx = x + (h2(y, 4) - 0.5) * 8; R.linea(ri(x), y, ri(nx), y + 3, W2); x = nx; } }
    R.recorte(null); }
  const u = tramo(t, 0.25, 1.35), px = lerp(78, 122, ease(u));
  R.actor(PA.jessica, 186, 150, t, { dir: -1, sonrisa: t > LETO, habla: t > LETO + 0.5 && t < LETO + 1.0 && Math.sin(t * 9) > 0 });
  R.actor(PA.paulNino, ri(px), 150, t, { dir: t > LETO + 0.2 ? -1 : 1, anda: u > 0 && u < 1, sorpresa: t > RAYO && t < RAYO + 0.9, dedo: t > OCEANOS && t < LETO, sonrisa: t > LETO + 0.2 });
  R.actor(PA.leto, 150, 150, t, { dir: -1, sostiene: t > LETO ? [140, 132] : false, habla: t > LETO - 0.2 && t < LETO + 0.6 && Math.sin(t * 8) > 0, sonrisa: t > LETO + 0.6 });
  T.caladanDelante(R, t, { camara: 'ventana' });
  const v = tramo(t, 0.2, 2.0);
  lucie(lerp(96, 112, v) + Math.sin(t * 1.6) * 3, lerp(84, 96, v) + Math.sin(t * 2.4) * 2, t, { dir: 1, cara: t > RAYO && t < RAYO + 1.0 ? 'sorpresa' : t > LETO ? 'sonrisa' : 'normal', brillo: 0.85 });
};

// ═══ 2 · la sala de la Bene Gesserit: la mesa de luz y el símbolo ═══
const HOLO = pal(['#1a4a6a', '#3a8ab0', '#8ff0ff', '#e8ffff']);
const p2 = (t) => {
  T.conspiracion(R, t, { encuadre: 'sala' });
  const uj = tramo(t, P2 + 0.05, P2 + 1.5), uh = tramo(t, MUJERES - 0.4, MUJERES + 0.9);
  R.actor(PA.reverendaMadre, 119, 150, t, { dir: 1, dedo: t > BG - 0.1 && t < BG + 1.4, habla: t > JESSICA + 0.3 && Math.sin(t * 7) > 0.2 && !(t > BG - 0.1 && t < BG + 1.4) });
  R.actor(PA.jessica, ri(lerp(28, 62, ease(uj))), 150, t, { dir: 1, anda: uj > 0 && uj < 1, sonrisa: t > MUJERES });
  R.actor(PA.reverendaMadre, ri(lerp(330, 184, ease(uh))), 150, t, { dir: -1, anda: uh > 0 && uh < 1, pal: { H: '#4a2e22', h: '#6a4430' }, sonrisa: uh >= 1 });
  T.conspiracionDelante(R, t, { encuadre: 'sala' });
  // el holograma: en «Bene Gesserit» se abre el símbolo; en «order of women», las familias alrededor, unidas por hilos
  const s = tramo(t, BG - 0.15, BG + 0.35);
  if (s > 0) { const cx = 126, cy = 98, fl = Math.sin(t * 23) > 0.85 ? 1 : 0;
    R.halo(cx, cy, 22 * s, [HOLO[0], HOLO[1]], 0.6);
    simbolo(cx, cy - fl, s * 1.2, HOLO[2], HOLO[3]);
    const nf = tramo(t, MUJERES, MUJERES + 1.4) * 6;
    for (let k = 0; k < Math.floor(nf); k++) { const a = -Math.PI / 2 + (k - 2.5) * 0.55 + Math.sin(t + k) * 0.03, nx = cx + Math.cos(a) * 24, ny = cy - 6 + Math.sin(a) * 14;
      R.linea(ri(nx), ri(ny), ri(cx + Math.cos(a) * 13), ri(cy + Math.sin(a) * 13), HOLO[1], 2); R.disco(nx, ny, 2.2, HOLO[2]); R.pset(ri(nx), ri(ny), HOLO[3]); } }
  lucie(46 + Math.sin(t * 1.3) * 3, 112 + Math.sin(t * 2.1) * 2, t, { dir: 1, cara: s > 0.5 ? 'sorpresa' : 'normal', brillo: 0.8 });
};

// ═══ 3 · inserto: el pergamino de linajes sobre la mesa ═══
const PERG = pal(['#6a4a26', '#9a7642', '#c49c5c', '#dcbc7c', '#eed4a0', '#f6e6c0']);
const TINTA = hex('#3a2414');
const ESC = { rojo: '#b83a3a', azul: '#3a5ab8', verde: '#2e6a4a', oro: '#c8a040', morado: '#6a3a8a', negro: '#2a2430', teja: '#c86a2a' };
const escudo = (x, y, col, sim, luz = 0) => {
  const C1 = hex(col), CL = mez(C1, hex('#ffffff'), 0.35), S = hex('#f0e0a0');
  for (let j = -6; j <= 7; j++) { const w = j < 2 ? 5 : 5 - (j - 1) * 0.85; for (let i = -Math.ceil(w); i <= Math.ceil(w); i++) { if (Math.abs(i) > w) continue; const borde = Math.abs(i) > w - 1 || j === -6 || (j >= 2 && Math.abs(i) > w - 1.4); R.pset(x + i, y + j, borde ? K : (i < 0 && j < 0 ? CL : C1)); } }
  if (sim === 'barra') R.rect(x - 4, y - 1, x + 4, y, S);
  else if (sim === 'punto') R.disco(x + 0.5, y + 0.5, 2, S);
  else if (sim === 'cheuron') for (let i = -3; i <= 3; i++) R.pset(x + i, y + 1 - (3 - Math.abs(i)), S);
  else if (sim === 'aro') R.anillo(x + 0.5, y + 0.5, 2.6, S);
  else if (sim === 'torre') { R.rect(x - 2, y - 2, x + 2, y + 3, S); R.pset(x - 2, y - 3, S); R.pset(x, y - 3, S); R.pset(x + 2, y - 3, S); }
  else if (sim === 'ave') { for (let i = -3; i <= 3; i++) R.pset(x + i, y - 1 + Math.abs(i) * 0.6 | 0, S); R.pset(x, y + 1, S); }
  else if (sim === 'estrella') { R.rect(x - 3, y, x + 3, y, S); R.rect(x, y - 3, x, y + 3, S); R.pset(x - 1, y - 1, S); R.pset(x + 1, y + 1, S); }
  if (luz > 0) for (let j = -8; j <= 9; j++) for (let i = -7; i <= 7; i++) { const d = Math.abs(Math.hypot(i, j * 0.85) - 7.5); if (d < 0.7 && b4(x + i, y + j) < luz) R.pset(x + i, y + j, hex('#ffe070')); }
};
const G1 = [[92, 40, ESC.rojo, 'barra'], [118, 40, ESC.azul, 'punto'], [162, 40, ESC.oro, 'cheuron'], [188, 40, ESC.morado, 'aro']];
const G2 = [[105, 70, ESC.verde, 'torre'], [175, 70, ESC.negro, 'ave']];
const G3 = [[140, 100, ESC.teja, 'estrella'], [210, 100, ESC.rojo, 'aro']];
const NODO = [175, 132];
// los tramos por los que baja la luz (de generación en generación)
const RUTAS = [[[105, 45], [105, 63]], [[175, 45], [175, 63]], [[140, 75], [140, 93]], [[175, 105], [175, 126]]];
const linea2 = (x0, x1, y) => { R.linea(x0, y, x1, y, TINTA); R.linea(x0, y + 2, x1, y + 2, TINTA); };
const pergaminoFondo = () => {
  const MAD = pal(['#1e100a', '#341c10', '#4e2c18', '#6a3e22', '#86542e', '#a46e3e', '#c48c54']);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y + 6) / 34), veta = 0.55 * Math.sin(x * 0.07 + tabla * 2 + 3 * ns(x * 0.01, y * 0.12 + tabla)) + (ns(x * 0.04, y * 0.5) - 0.5) * 0.9, luz = Math.max(0, 1 - Math.hypot(x - 30, (y - 66) * 1.2) / 300);
    let v = 1.4 + luz * 3.4 + veta; if ((y + 6) % 34 === 0) v -= 2; if ((y + 6) % 34 === 1) v += 0.6; if (h2(tabla, Math.floor(x / 90)) > 0.5 && ((x + tabla * 47) % 90) === 0) v -= 1.5;
    if (Math.hypot((x - 44 - tabla * 61 % 230) * 0.6, y - (tabla * 34 + 12)) < 3) v -= 1; R.pset(x, y, rmp(MAD, v, x, y)); }
  const borde = (x, y) => Math.min(x - 64, 252 - x, y - 22, 154 - y) + (ns(x * 0.3, y * 0.3) - 0.5) * 4;
  for (let y = 18; y < 162; y++) for (let x = 58; x < 262; x++) { const b = borde(x, y); if (b < 0 && b > -6) sombrea(x + 3, y + 4, 0.35); }
  for (let y = 18; y < 160; y++) for (let x = 58; x < 258; x++) { const b = borde(x, y); if (b < 0) continue;
    const luz = 1 - Math.hypot(x - 30, y - 66) / 320, v = 1.6 + luz * 2.4 + (ns(x * 0.08, y * 0.08) - 0.5) * 0.9 + (ns(x * 0.6, y * 0.6) - 0.5) * 0.3 - (b < 3 ? 1.4 - b * 0.35 : 0) - (ns(x * 0.05 + 9, y * 0.05) > 0.72 ? 0.6 : 0);
    R.pset(x, y, rmp(PERG, v, x, y)); }
  // los rollos de los extremos
  for (const y0 of [18, 152]) for (let y = y0; y < y0 + 7; y++) for (let x = 60; x < 256; x++) R.pset(x, y, rmp(PERG, 1 + (y - y0 < 3 ? 2.4 : 1.2) + Math.sin(x * 0.5) * 0.2, x, y));
  for (const y0 of [18, 152]) { R.linea(60, y0, 255, y0, K); R.linea(60, y0 + 7, 255, y0 + 7, K); R.rect(56, y0 - 1, 59, y0 + 8, hex('#6a4426')); R.rect(256, y0 - 1, 259, y0 + 8, hex('#6a4426')); }
  // el árbol (líneas de tinta y matrimonios con doble raya)
  linea2(97, 113, 39); linea2(167, 183, 39); linea2(110, 170, 69); linea2(145, 205, 99);
  for (const [[x0, y0], [x1, y1]] of RUTAS) R.linea(x0, y0, x1, y1, TINTA);
  R.linea(105, 45, 105, 39, TINTA); R.linea(175, 45, 175, 39, TINTA); R.linea(140, 75, 140, 69, TINTA); R.linea(175, 105, 175, 99, TINTA);
  [...G1, ...G2, ...G3].forEach(([x, y, c, s]) => escudo(x, y, c, s));
  R.anillo(NODO[0] + 0.5, NODO[1] + 0.5, 5.5, TINTA);
  // manchas de tinta y renglones de adorno (sin letras: rayitas onduladas)
  for (const [x, y] of [[80, 118], [228, 62], [210, 140]]) { R.disco(x, y, 1.6, TINTA); R.pset(x + 2, y + 1, TINTA); }
  for (let k = 0; k < 3; k++) for (let x = 76; x < 128; x++) if (Math.sin(x * 0.9 + k) > -0.4) R.pset(x, 128 + k * 5 + ri(Math.sin(x * 0.5) * 0.6), mez(TINTA, PERG[3], 0.45));
  // el tintero con la pluma, el lacre y el sello, y dos libros
  R.disco(276, 74, 8, K); R.disco(276, 74, 7, hex('#1e2a3a')); R.rect(272, 62, 280, 67, K); R.rect(273, 63, 279, 66, hex('#2e3a4a')); R.pset(273, 70, hex('#8aa0c0')); R.pset(272, 72, hex('#5a7090'));
  R.linea(279, 63, 298, 48, hex('#f0f0e8')); R.linea(280, 63, 299, 48, hex('#c8c8c0')); for (let i = 0; i < 9; i++) { R.pset(286 + i * 1.5, 56 - i - 2, hex('#e8e8e0')); R.pset(287 + i * 1.5, 59 - i, hex('#b8b8b0')); }
  R.rect(270, 104, 300, 108, K); R.rect(271, 105, 299, 107, hex('#b82a2a')); R.rect(271, 105, 299, 105, hex('#e85a4a'));
  R.disco(290, 122, 6, K); R.disco(290, 122, 5, hex('#8a6a3a')); R.rect(288, 110, 292, 118, K); R.rect(289, 111, 291, 117, hex('#6a4426'));
  for (const [y0, c] of [[148, '#5a2a2a'], [160, '#2a3a5a']]) { R.rect(4, y0, 50, y0 + 11, K); R.rect(5, y0 + 1, 49, y0 + 10, hex(c)); R.rect(5, y0 + 1, 49, y0 + 1, mez(hex(c), hex('#ffffff'), 0.3)); R.rect(44, y0 + 2, 48, y0 + 9, hex('#e8d8b0')); for (let x = 10; x < 40; x += 8) R.rect(x, y0 + 3, x + 1, y0 + 8, hex('#c8a040')); }
  // más vida en el pergamino: las generaciones contadas con puntos en el margen, ramas descartadas (un círculo tachado),
  // renglones de notas sin letras, una mancha de cerco de taza, una rosa de tinta, el sello de lacre con el símbolo y la
  // cinta azul de marcapáginas que cae sobre la mesa
  const TT = mez(TINTA, PERG[3], 0.3);
  [40, 70, 100, 132].forEach((y, k) => { for (let i = 0; i <= k; i++) R.rect(70 + i * 3, y, 71 + i * 3, y + 1, TT); });
  for (const [x0, y0, x1, y1] of [[105, 75, 92, 88], [210, 107, 224, 118]]) { R.linea(x0, y0, x1, y1, TT); R.anillo(x1 + 0.5, y1 + 3.5, 3, TT); R.linea(x1 - 3, y1 + 1, x1 + 3, y1 + 7, ROJOT); R.linea(x1 + 3, y1 + 1, x1 - 3, y1 + 7, ROJOT); }
  for (let k = 0; k < 4; k++) for (let x = 196; x < 246 - k * 7; x++) if (Math.sin(x * 0.8 + k * 2) > -0.5) R.pset(x, 78 + k * 5 + ri(Math.sin(x * 0.45 + k) * 0.7), mez(TINTA, PERG[3], 0.5));
  for (let a = 0; a < 160; a++) { const p = a / 160 * Math.PI * 2, r = 7 + Math.sin(p * 3) * 0.4; if (p > 0.6 && p < 1.4) continue; const x = ri(214 + Math.cos(p) * r), y = ri(132 + Math.sin(p) * r * 0.85); R.pset(x, y, mez(R.pget(x, y), hex('#8a5a2a'), 0.35)); }
  { const cx = 100, cy = 108; for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, L = k % 2 ? 4 : 8; R.linea(cx, cy, ri(cx + Math.cos(a) * L), ri(cy + Math.sin(a) * L), mez(TINTA, PERG[3], 0.45)); } R.anillo(cx + 0.5, cy + 0.5, 3, mez(TINTA, PERG[3], 0.4)); }
  // el sello de lacre (arriba a la derecha del pergamino), con su relieve y el anillo con el ojo
  { const cx = 234, cy = 38, L1 = hex('#7a1a1a'), L2 = hex('#b02a26'), L3 = hex('#e05a48');
    for (let y = -8; y <= 8; y++) for (let x = -8; x <= 8; x++) { const d = Math.hypot(x, y) + (h2(x, y, 4) - 0.5) * 1.6 + Math.sin(Math.atan2(y, x) * 7) * 0.6; if (d > 7.2) continue;
      R.pset(cx + x, cy + y, d > 6.2 ? L1 : (x + y < -4 ? L3 : (x + y > 5 ? L1 : L2))); }
    R.anillo(cx + 0.5, cy + 0.5, 4, L1); for (let i = -2; i <= 2; i++) { R.pset(cx + i, cy - 1 + (Math.abs(i) > 1 ? 1 : 0), L1); R.pset(cx + i, cy + 1 - (Math.abs(i) > 1 ? 1 : 0), L1); } R.pset(cx, cy, L3); R.pset(cx - 3, cy - 5, hex('#ffb0a0'));
    for (let a = 0; a < 40; a++) sombrea(cx + 2 + ri(Math.cos(a / 40 * 6.28) * 8), cy + 3 + ri(Math.sin(a / 40 * 6.28) * 7), 0.2); }
  // la cinta de marcapáginas: cuelga del rollo de arriba, se posa sobre el pergamino con una onda y acaba en cola de
  // golondrina
  { const C1 = hex('#2a3a8a'), C2 = hex('#4a64c8'), C3 = hex('#8aa8f0');
    for (let i = 0; i < 44; i++) { const y = 22 + i, x = 206 + i * 0.16 + Math.sin(i * 0.16) * 2.5, cola = i > 38 ? i - 38 : 0;
      sombrea(ri(x) + 3, y + 1, 0.3); sombrea(ri(x) + 4, y + 1, 0.2);
      for (let w = -2; w <= 2; w++) { const px = ri(x + w); if (cola && Math.abs(w) < 1 + cola * 0.4) continue; R.pset(px, y, Math.abs(w) === 2 ? K : w < 0 ? C3 : w > 0 ? C1 : (Math.sin(i * 0.16) > 0.6 ? C3 : C2)); } }
    R.rect(203, 18, 212, 21, K); R.rect(204, 19, 211, 20, C2); }
};
const ROJOT = hex('#8a2a1e');
// EL CABALLITO DE MADERA (17 × 16, mira a la izquierda, hacia el árbol): madera con vetas, luz de la vela por la
// izquierda, crin y cola oscuras, ojo con su brillo y el balancín pintado de rojo; giro: se mece sobre el balancín
const CABALLO = [
  '....kk...........', '...kcck..........', '..khlcck.........', '.kehlmck.........', 'khmmmmck.........',
  '.kkkmmck......kk.', '....kmmk.....kcck', '....kmmkkkkkkkcck', '....khllllllmmkk.', '....khllvllmmdk..',
  '....kmmmmvmmddk..', '....kkdkkkkdkk...', '.....kdk..kdk....', 'kk...kdk..kdk..kk', 'krrrrrrrrrrrrrrrk', '.kkkkkkkkkkkkkkk.'];
const CAB_C = { k: K, c: hex('#2a1a10'), h: hex('#f4c888'), l: hex('#d49a58'), m: hex('#b07438'), d: hex('#7a4a22'), v: hex('#8a5428'), e: hex('#100808'), r: hex('#a83a24') };
// (x, y): el centro de abajo del balancín
const caballo = (x, y, giro = 0, sombra = true) => {
  const X = ri(x) - 8, Y = ri(y) - 15;
  if (sombra) for (let i = -9; i <= 10; i++) for (let j = 0; j < 2; j++) sombrea(ri(x) + i + 2, ri(y) + 1 + j, 0.3);
  CABALLO.forEach((fila, j) => { for (let i = 0; i < 17; i++) { const ch = fila[i]; if (ch === '.') continue; const dy = ri(giro * (i - 8) / 8);
    R.pset(X + i, Y + j + dy, CAB_C[ch]); } });
  R.pset(X + 2, Y + 3 + ri(giro * -6 / 8), hex('#ffffff')); R.pset(X + 14, Y + 14 + ri(giro * 6 / 8), hex('#e86a4a')); R.pset(X + 3, Y + 14 + ri(giro * -5 / 8), hex('#e86a4a'));
};
// la luz de oro baja por el árbol: tres tramos, cada uno con sus caminos (polilíneas); lo recorrido queda dorado
const CAMINOS = [
  [[[105, 39], [105, 63]], [[175, 39], [175, 63]]],
  [[[105, 63], [105, 69], [140, 69], [140, 93]], [[175, 63], [175, 69], [140, 69]]],
  [[[140, 99], [175, 99], [175, 126]], [[210, 99], [175, 99]]],
];
const ORO3 = pal(['#8a5a1a', '#c8902a', '#ffd860', '#fff6c8']);
const caminoOro = (pts, u, t) => {
  let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  let resta = L * u, cab = pts[0];
  for (let i = 1; i < pts.length && resta > 0; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], l = Math.hypot(x1 - x0, y1 - y0), f = Math.min(1, resta / l), n = Math.ceil(l * f);
    for (let s = 0; s <= n; s++) { const x = ri(x0 + (x1 - x0) * s / l), y = ri(y0 + (y1 - y0) * s / l), lat = y0 === y1 ? [0, 1] : [1, 0];
      R.pset(x, y, ORO3[2 + ((x + y + ri(t * 8)) % 3 === 0 ? 1 : 0)]); R.pset(x + lat[0], y + lat[1], ORO3[1]); R.pset(x - lat[0], y - lat[1], mez(R.pget(x - lat[0], y - lat[1]), ORO3[2], 0.5)); }
    cab = [x0 + (x1 - x0) * f, y0 + (y1 - y0) * f]; resta -= l; }
  return cab;
};
const p3 = (t) => {
  fijo('pergamino', pergaminoFondo);
  R.vela(30, 70, t, { r: 22 });
  // la luz de oro que baja por el linaje: escudos encendidos y el punto que viaja
  // motas de polvo que flotan en la luz de la vela
  for (let k = 0; k < 9; k++) { const f = (t * 0.07 + k * 0.137) % 1, x = 18 + h2(k, 21) * 30 + Math.sin(t * 0.8 + k) * 4, y = 96 - f * 50; R.pset(ri(x), ri(y), b4(k, 1) < 0.5 ? hex('#ffe0a0') : hex('#c89a5a')); }
  const tramos = [[P3 + 0.15, CRIA], [CRIA + 0.1, FAMILIAS + 0.4], [FAMILIAS + 0.6, PRODUCE - 0.8]];
  const luzG = [tramo(t, P3, P3 + 0.3), tramo(t, CRIA - 0.05, CRIA + 0.25), tramo(t, FAMILIAS + 0.35, FAMILIAS + 0.65)];
  // los caminos dorados (lo recorrido se queda encendido) y, delante, el halo que pasa de nudo a nudo
  tramos.forEach(([a, b], k) => { const u = tramo(t, a, b); if (u <= 0) return; for (const pts of CAMINOS[k]) { const [hx, hy] = caminoOro(pts, u, t);
    if (u < 1) { R.halo(ri(hx), ri(hy), 9 + Math.sin(t * 12) * 1.5, [ORO3[1], ORO3[2], ORO3[3]], 1.25); R.disco(hx, hy, 1.6, ORO3[3]); R.pset(ri(hx), ri(hy), hex('#ffffff'));
      for (let s = 0; s < 4; s++) { const a = t * 5 + s * 1.57 + k; R.pset(ri(hx + Math.cos(a) * 6), ri(hy + Math.sin(a) * 6), ORO3[2]); } } } });
  // cada escudo que recibe la luz se queda con un halo dorado que late
  [[G1, luzG[0]], [G2, luzG[1]], [G3, luzG[2]]].forEach(([G, l], k) => { if (l > 0) for (const [x, y] of G) R.halo(x, y, (10 + Math.sin(t * 4 + x) * 1.2) * l, [ORO3[1], ORO3[2]], 0.5); });
  G1.forEach(([x, y, c, s]) => escudo(x, y, c, s, luzG[0] * 0.9)); G2.forEach(([x, y, c, s]) => escudo(x, y, c, s, luzG[1] * 0.9)); G3.forEach(([x, y, c, s]) => escudo(x, y, c, s, luzG[2] * 0.9));
  // el último nudo se abre como un ojo azul en «produce»
  const ojo = tramo(t, PRODUCE - 0.8, PRODUCE - 0.4);
  if (ojo > 0) { const [nx, ny] = NODO; R.halo(nx, ny, 9 * ojo, [AZ[1], AZ[2], AZ[3]], 1.1); for (let i = -4; i <= 4; i++) { const e = ri(2.2 * ojo * Math.sqrt(1 - (i / 4.4) ** 2)); R.pset(nx + i, ny - e, K); R.pset(nx + i, ny + e, K); for (let j = -e + 1; j < e; j++) R.pset(nx + i, ny + j, AZ[3]); } R.disco(nx + 0.5, ny + 0.5, 1.6 * ojo, AZ[1]); R.pset(nx, ny, AZ[4]); }
  // la mano de la Reverenda Madre (manga negra, brazo canónico en diagonal desde abajo a la derecha) trae el caballito
  // cogido por el lomo, lo posa junto al árbol en «horses», lo suelta (se mece) y se retira por donde vino
  const ent = tramo(t, CABALLOS - 1.0, CABALLOS - 0.05), sal = tramo(t, P4 - 0.28, P4 + 0.3), dentroM = ent - sal;
  const HX = 240, HY = 150;
  if (t >= CABALLOS) { const bal = Math.max(0, 1 - (t - CABALLOS) * 0.9); caballo(HX, HY, Math.sin((t - CABALLOS) * 9) * 1.6 * bal); }
  if (dentroM > 0) { const k = 1 - ease(dentroM), dx = k * 34, dy = k * 82, su = t >= CABALLOS ? ease(tramo(t, CABALLOS + 0.05, CABALLOS + 0.4)) : 0, sube = su * 10, lado = su * 4;
    if (t < CABALLOS) caballo(HX + dx, HY + dy, Math.sin(t * 7) * 0.6, false);
    T.brazo(R, 276 + dx + lado * 0.3, 198 + dy, HX + 12 + dx + lado, HY - 10 + dy - sube, '#2e2838', -1, { codo: [272 + dx + lado * 0.6, 170 + dy - sube * 0.5], puno: '#e8e0d0' }); }
  lucie(36 + Math.sin(t * 1.2) * 3, 112 + Math.sin(t * 2.0) * 3, t, { dir: 1, cara: t > CABALLOS && t < CABALLOS + 0.8 ? 'sorpresa' : ojo > 0 ? 'sorpresa' : 'normal', brillo: 0.85 });
};

// ═══ 4 · el paseo de la muralla bajo la lluvia ═══
const DESIERTO = pal(['#6a3a1e', '#a8602a', '#d89048', '#f0c070', '#fff0c0']);
const p4 = (t) => {
  T.caladan(R, t, {});
  // la visión del futuro en las nubes: un planeta de arena, tramado, en «future»
  const vi = tramo(t, FUTURO - 0.1, FUTURO + 0.6) * (0.8 + 0.2 * Math.sin(t * 5));
  if (vi > 0) { const cx = 96, cy = 40, r = 13; for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) { const d = Math.hypot(x, y) / r; if (d > 1 || b4(cx + x, cy + y) > vi * 0.9) continue; R.pset(cx + x, cy + y, d > 0.92 ? hex('#fff0c0') : rmp(DESIERTO, 3.6 - (x + y) / r * 1.4 - d * 1.2 + Math.sin(y * 0.7 + x * 0.2) * 0.4, cx + x, cy + y)); }
    for (let k = 0; k < 5; k++) { const a = t * 1.5 + k * 1.26; if (b4(k, 1) < vi) R.pset(ri(cx + Math.cos(a) * 19), ri(cy + Math.sin(a) * 9), AZ[3]); } }
  const u = tramo(t, P4 + 0.05, MIRA - 0.05), px = lerp(196, 92, ease(u));
  const d = tramo(t, MIRA + 0.2, FUTURO - 0.2), dx = lerp(240, 150, ease(d));
  R.actor(PA.duncan, ri(dx), 160, t, { dir: -1, anda: d > 0 && d < 1, habla: d >= 1 && t < FUTURO + 0.2 && Math.sin(t * 8) > 0, sorpresa: t > FUTURO + 0.3 });
  R.actor(PA.paulNino, ri(px), 152, t, { dir: -1, anda: u > 0 && u < 1, dedo: (t > MIRA && t < MIRA + 1.2) || t > FUTURO + 0.1, sorpresa: t > FUTURO });
  T.caladanDelante(R, t, {});
  // gag: Atom calado; la lluvia le rebota y en la mitad del plano se sacude
  const sac = tramo(t, MIRA + 0.7, MIRA + 1.4), sx = sac > 0 && sac < 1 ? Math.sin(t * 60) * 2 : 0, ax = 140 + sx + Math.sin(t * 1.4) * 2, ay = 104 + Math.sin(t * 2.2) * 2;
  lucie(ax, ay, t, { dir: -1, cara: sac > 0 && sac < 1 ? 'triste' : t > FUTURO ? 'sorpresa' : 'triste', brillo: 0.7 });
  for (let k = 0; k < 4; k++) { const f = ((t * 2.2 + k * 0.25) % 1), x = ax - 6 + k * 4; R.pset(ri(x), ri(ay - 16 + f * 14), hex('#b8d8f0')); }
  if (sac > 0 && sac < 1) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, r = 9 + sac * 12; R.pset(ri(ax + Math.cos(a) * r), ri(ay + Math.sin(a) * r * 0.6), hex('#d8ecff')); }
};

// ═══ 5 · desde la roca, al ocaso: llega la nave de los Atreides ═══
const NV = pal(['#1e2a24', '#2e4434', '#4e6a52', '#6e8a6a', '#a8c0a0']);
const ORO = hex('#d8b048');
const HALCON = ['k...k', 'kk.kk', '.kkk.', '..k..'];
const nave = (cx, by, t, o = {}) => {
  const s = o.s ?? 1, X = (u) => cx + u * s, Y = (v) => by + v * s, f = o.fuego ?? 0, p = o.patas ?? 1;
  if (f > 0) for (const u of [-16, 0, 16]) { const L = (9 + Math.sin(t * 40 + u) * 2.5) * f * s; for (let j = 0; j < L; j++) { const w = (2.4 - j / L * 2) * s; for (let i = -w; i <= w; i++) R.pset(ri(X(u) + i), ri(Y(-1) + j), j < L * 0.3 ? hex('#ffffff') : j < L * 0.65 ? hex('#a8e0ff') : hex('#5a8ae8')); } }
  if (p > 0) for (const u of [-22, 0, 22]) { const xa = ri(X(u)), xb = ri(X(u * 1.12)), yb = ri(Y(-3 + 9 * p)); R.linea(xa, ri(Y(-4)), xb, yb, K); R.linea(xa + 1, ri(Y(-4)), xb + 1, yb, NV[3]); R.rect(xb - 3, yb, xb + 3, yb + 1, K); R.rect(xb - 2, yb, xb + 2, yb, NV[2]); }
  // la aleta de cola y la cúpula del puente (detrás del casco)
  R.poligono([[X(-24), Y(-15)], [X(-40), Y(-30)], [X(-32), Y(-31)], [X(-14), Y(-17)]], (x, y) => rmp(NV, 2.6 - (y - Y(-31)) / (16 * s), x, y));
  R.linea(ri(X(-40)), ri(Y(-30)), ri(X(-32)), ri(Y(-31)), K); R.linea(ri(X(-40)), ri(Y(-30)), ri(X(-24)), ri(Y(-15)), K);
  R.disco(X(6), Y(-19), 8 * s, K); R.disco(X(6), Y(-19), 7 * s, (x, y) => rmp(pal(['#2e4a5a', '#5a9ab0', '#a8e0e8', '#f0ffff']), 2.4 - (y - Y(-26)) / (7 * s) * 1.5 - (x - X(6)) / (7 * s) * 0.6, x, y));
  // el casco: una lente de bronce verde con paneles y luz de arriba
  const pts = []; for (let k = 0; k <= 24; k++) { const a = Math.PI + k / 24 * Math.PI; pts.push([X(Math.cos(a) * 34), Y(-8 + Math.sin(a) * 11)]); } for (let k = 0; k <= 24; k++) { const a = k / 24 * Math.PI; pts.push([X(Math.cos(a) * 34), Y(-8 + Math.sin(a) * 6)]); }
  R.poligono(pts, (x, y) => { const v = (y - Y(-19)) / (17 * s), panel = (Math.floor((x - cx) / (7 * s)) & 1) ? 0.3 : 0; return rmp(NV, 4 - v * 3.2 + panel - Math.abs(x - cx) / (34 * s) * 0.7 + (o.luzSol ?? 0) * (x < cx ? 0.5 : 0), x, y); });
  for (let k = 0; k < pts.length; k++) { const [a, b] = pts[k], [c, d] = pts[(k + 1) % pts.length]; R.linea(ri(a), ri(b), ri(c), ri(d), K); }
  R.linea(ri(X(-33)), ri(Y(-8)), ri(X(33)), ri(Y(-8)), ORO); R.linea(ri(X(-30)), ri(Y(-7)), ri(X(30)), ri(Y(-7)), hex('#8a6a28'));
  for (let k = -2; k <= 3; k++) { const x = ri(X(k * 8)), y = ri(Y(-13)); R.rect(x - 1, y - 1, x + 1, y + 1, K); R.pset(x, y, Math.sin(t * 3 + k) > -0.7 ? hex('#ffe08a') : hex('#c89a4a')); }
  R.sprite(HALCON, ri(X(-24)), ri(Y(-15)), { k: ORO });
};
const polvo = (cx, cy, t, t0, w) => { const u = t - t0; if (u < 0 || u > 3) return; const a = Math.max(0, 1 - u / 3), D = hex('#c89a5a'), DL = hex('#e8c080');
  for (let i = 0; i < 16; i++) { const sg = i % 2 ? 1 : -1, ex = Math.min(1, u * 1.4 + 0.15), px = cx + sg * (4 + ((i * 7) % w)) * ex, py = cy - (i % 3) * 3 - u * 3, r = (3 + (i % 4)) * (0.7 + u * 0.5);
    R.disco(px, py, r, (x, y) => b4(x, y) < a * 0.75 ? (b4(x, y) < a * 0.35 ? DL : D) : R.pget(x, y)); } };
const p5 = (t) => {
  const g = T.planeta(R, t, { encuadre: 'desierto', camara: 'roca', hora: 'ocaso', t0: P5 });
  const u = tramo(t, P5 + 0.1, ARRAKIS), y = lerp(-40, 104, 1 - (1 - u) ** 2.2), x = lerp(176, 206, u);
  polvo(x, 106, t, ARRAKIS - 0.25, 46);
  nave(x, y, t, { s: 0.9, fuego: t < ARRAKIS + 0.3 ? 1 - tramo(t, ARRAKIS, ARRAKIS + 0.3) : 0, patas: tramo(t, ARRAKIS - 1.0, ARRAKIS - 0.4), luzSol: 1 });
  if (t > ARRAKIS - 0.25) polvo(x, 108, t, ARRAKIS - 0.25 + 0.4, 30);
  const S = g.suelo ?? 131;
  R.actor(PA.fremen, 66, S, t, { dir: 1, dedo: t > P5 + 0.7 && t < ARRAKIS + 0.8, sorpresa: t > ARRAKIS && t < ARRAKIS + 1.0, habla: t > ARRAKIS + 1.0 && t < NUNCA && Math.sin(t * 7) > 0.3 });
  R.actor(PA.fremenMujer, 88, S, t, { dir: 1, sorpresa: t > P5 + 1.0 && t < ARRAKIS + 0.6, sonrisa: t > NUNCA, dedo: t > ARRAKIS + 0.6 && t < ARRAKIS + 1.8 });
  T.planetaDelante(R, t, { encuadre: 'desierto', camara: 'roca', hora: 'ocaso' });
  // Atom luciérnaga con las gotas de Caladan: en «never rains» se evaporan en vapor
  const ax = 128 + Math.sin(t * 1.3) * 3, ay = 98 + Math.sin(t * 2.1) * 2, ev = tramo(t, NUNCA, NUNCA + 0.6);
  lucie(ax, ay, t, { dir: 1, cara: ev > 0 ? 'sonrisa' : t > ARRAKIS - 0.4 && t < ARRAKIS + 0.8 ? 'sorpresa' : 'normal', brillo: 0.85 });
  if (ev < 1) for (let k = 0; k < 4; k++) { const f = ((t * 1.6 + k * 0.27) % 1); if (ev > 0 && f > 0.3) continue; R.pset(ri(ax - 7 + k * 5), ri(ay + 6 + f * 12), hex('#9ad0f0')); R.pset(ri(ax - 7 + k * 5), ri(ay + 7 + f * 12), hex('#5a90c0')); }
  if (ev > 0 && ev < 1) for (let k = 0; k < 6; k++) { const xx = ax - 9 + k * 3.5 + Math.sin(t * 6 + k) * 1.5, yy = ay - 8 - ev * 16 - (k % 2) * 3; R.disco(xx, yy, 1.6 + ev, (x2, y2) => b4(x2, y2) < (1 - ev) * 0.8 ? hex('#f0f0f0') : R.pget(x2, y2)); }
};

// ═══ 6 · fondo propio: la cresta de duna de cerca; Atom encuentra el grano azul ═══
const CIELO6 = pal(['#2e1a46', '#4a2a5a', '#7a3a5e', '#a8545a', '#d07a52', '#e8a05a', '#f4c478', '#fbe0a0']);
const DUNA = pal(['#4a2414', '#7a3e1e', '#a8602e', '#c88040', '#e0a058', '#f0bc74', '#fad898']);
const ESPECIA = pal(['#7a2a12', '#b84a1e', '#e0702a', '#ff9a40']);
const yCresta = (x) => 120 + 7 * Math.sin(x * 0.012 + 1) - 6 * Math.sin(x * 0.031) + 3 * Math.sin(x * 0.07);
const dunaFondo = () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c;
    const yc = yCresta(x);
    if (y >= yc) { // la cara de la duna de delante: luz de poniente, rizaduras paralelas a la cresta y vetas de especia
      const prof = y - yc, rz = Math.sin((prof * 0.95 + x * 0.06 + ns(x * 0.04, y * 0.04) * 6)) , sp = ns(x * 0.035, y * 0.07);
      // la luz del poniente baja de izquierda a derecha en un degradado suave (sin costura)
      const lado = ease(Math.min(1, Math.max(0, (x - 40) / 240)));
      let v = 4.2 - prof * 0.014 + rz * 0.55 + (ns(x * 0.3, y * 0.3) - 0.5) * 0.5 + 0.3 - lado * 0.5;
      c = rmp(DUNA, v, x, y); if (sp > 0.6 && b4(x, y) < (sp - 0.6) * 7) c = rmp(ESPECIA, 1.1 + rz * 0.9 + (ns(x * 0.3, y * 0.3) - 0.5) * 1.4 + 0.4 * (1 - lado), x, y);
      if (prof < 2) c = DUNA[6];
    } else if (y > 74) { // dunas medias y lejanas, en tres términos
      const y1 = 84 + 6 * Math.sin(x * 0.02 + 2) + 4 * Math.sin(x * 0.05), y2 = 98 + 8 * Math.sin(x * 0.017 + 4) + 3 * Math.sin(x * 0.07 + 1);
      if (y > y2) c = rmp(DUNA, 2.6 + Math.sin(x * 0.04 - y * 0.08) * 0.8 - (y - y2) * 0.02 + (Math.sin(x * 0.11 + y * 0.6) > 0.7 ? 0.5 : 0), x, y);
      else if (y > y1) c = rmp(DUNA, 3.3 + Math.sin(x * 0.03 - y * 0.05) * 0.7, x, y);
      else c = rmp(DUNA, 3.8 + Math.sin(x * 0.05) * 0.4, x, y);
    } else { // el cielo del ocaso tramado, con el sol bajo a la izquierda
      const d = Math.hypot(x - 40, (y - 70) * 1.4), v = 7.3 - (1 - y / 76) * 6.2 + Math.max(0, 1 - d / 60) * 1.6 + (ns(x * 0.02, y * 0.15) - 0.5) * 0.6;
      c = rmp(CIELO6, v, x, y);
    }
    R.pset(x, y, c);
  }
  // el sol y las mesetas lejanas en el horizonte
  R.disco(40, 74, 9, hex('#fff2c0')); R.disco(40, 74, 7, hex('#ffffff'));
  // las mesetas: canto alto encendido por el sol, laderas con estrías y talud en sombra
  const MES = pal(['#4a2840', '#5e3248', '#764058', '#9a5262', '#d07a6a']);
  for (let x = 0; x < 320; x++) { const m = (x > 60 && x < 120) ? 8 : (x > 250 && x < 300) ? 6 : (x > 160 && x < 190) ? 4 : 0, top = 76 - m - (h2(x >> 2, 1) > 0.7 ? 1 : 0);
    for (let y = top; y < 78; y++) { let v = 2.2 - (y - top) * 0.25 + (h2(x >> 1, 7) - 0.5) * 0.8 - (x % 5 === 0 ? 0.6 : 0) - (x - 40) * 0.003; if (y === top) v = m ? 4 : 3; R.pset(x, y, rmp(MES, v, x, y)); } }
  // piedras y una costilla de roca en la duna media
  const RC = pal(['#2a1810', '#4a2c1c', '#6a4028', '#8a5a36', '#b07a4a']);
  for (const [x0, y0, w, h] of [[48, 106, 22, 8], [270, 110, 30, 10], [204, 98, 14, 6]]) { for (let j = 0; j < h; j++) { const ww = w * (1 - (j / h) ** 1.6 * 0.6) * (0.5 + 0.5 * j / h + 0.5); for (let i = 0; i < ww; i++) { const x = ri(x0 - ww / 2 + i + (h - j) * 0.3), y = y0 - h + j; R.pset(x, y, rmp(RC, 3.2 - i / ww * 2.4 - j / h * 0.6 + (h2(x, y) - 0.5) * 0.8, x, y)); } }
    for (let i = -w / 2 - 3; i < w / 2 + 6; i++) sombrea(ri(x0 + i + 4), y0, 0.35); }
  // piedras en la duna de delante, con su luz por la izquierda y la sombra larga hacia la derecha
  for (const [x0, y0, w, h] of [[58, 146, 9, 4], [300, 172, 12, 5], [228, 162, 7, 3], [20, 176, 10, 4], [186, 176, 6, 3]]) {
    for (let i = 0; i < w * 2.6; i++) for (let j = 0; j < 2; j++) sombrea(x0 + i, y0 + j, 0.35 - i / (w * 9));
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const e = Math.abs(i - w / 2) / (w / 2), top = ri(h * (1 - e * e)); if (h - j > top) continue; const x = x0 - ri(w / 2) + i, y = y0 - h + j;
      R.pset(x, y, rmp(RC, 3.4 - i / w * 2.2 + (j === h - top ? 0.8 : 0) + (h2(x, y, 2) - 0.5) * 0.7, x, y)); } }
};
const NUB6 = pal(['#4a2652', '#8a4468', '#d07a72', '#ffcc8a']);
const NUBES6 = [
  { x: 10, y: 34, v: 3.0, w: 46, p: [[8, -3, 7], [18, -6, 9], [30, -4, 8], [40, -1, 6]] },
  { x: 150, y: 30, v: 3.0, w: 36, p: [[7, -2, 6], [17, -5, 8], [28, -2, 6]] },
  { x: 92, y: 50, v: 1.6, w: 30, p: [[6, -1, 5], [14, -3, 6], [23, -1, 5]] },
  { x: 230, y: 56, v: 1.6, w: 26, p: [[5, -1, 4], [13, -3, 6], [21, -1, 4]] },
  { x: 300, y: 42, v: 5.0, w: 54, p: [[8, -2, 7], [20, -6, 10], [34, -4, 9], [46, -1, 7]] },
  { x: 200, y: 66, v: 0.9, w: 22, p: [[5, 0, 4], [12, -2, 5], [18, 0, 4]] },
];
const p6 = (t) => {
  fijo('duna6', dunaFondo);
  // nubes de bolas en tres tonos (lomo morado, panza rosada y filo encendido por el sol bajo de la izquierda), a
  // varias alturas y tres velocidades; las lejanas, pequeñas y lentas; fuera de la esquina de Atom y de la barra del año
  for (const nb of NUBES6) { const x0 = ((nb.x + t * nb.v) % 400) - 60;
    if (x0 > 330 || x0 < -nb.w - 10) continue;
    const den = (x, y) => { for (const [px, py, pr] of nb.p) if ((x - x0 - px) ** 2 + ((y - nb.y - py) * 1.6) ** 2 < pr * pr) return true; return false; };
    for (let y = nb.y - 12; y <= nb.y + 3; y++) for (let x = ri(x0) - 2; x < ri(x0) + nb.w + 4; x++) { if (x < 0 || x > 319 || y < 22 || (x > 270 && y < 48) || !den(x, y)) continue;
      const v = (y - (nb.y - 10)) / 13 + (den(x - 2, y + 1) ? 0 : 0.5) + (x < 160 ? 0.15 : 0);
      let c = v > 0.95 ? NUB6[3] : v > 0.62 ? (b4(x, y) < (v - 0.62) * 3 ? NUB6[2] : NUB6[1]) : (b4(x, y) < v * 1.6 - 0.2 ? NUB6[1] : NUB6[0]);
      if (!den(x, y + 1)) c = NUB6[3]; if (!den(x, y - 1)) c = mez(c, NUB6[0], 0.4); R.pset(x, y, c); } }
  // un halcón que traza círculos y una bandada de vencejos que cruza despacio
  { const a = t * 0.9, hx = 196 + Math.cos(a) * 22, hy = 52 + Math.sin(a) * 7, al = Math.sin(t * 9) > 0 ? -1 : 0; R.pset(ri(hx), ri(hy), K); R.pset(ri(hx) - 1, ri(hy) + al, K); R.pset(ri(hx) + 1, ri(hy) + al, K); R.pset(ri(hx) - 2, ri(hy) + al - 1, K); R.pset(ri(hx) + 2, ri(hy) + al - 1, K); }
  for (let k = 0; k < 4; k++) { const bx = ri(40 + (t - P6) * 7 + k * 9 - (k % 2) * 3), by = ri(56 + (k % 2) * 4 + Math.sin(t * 2 + k) * 1.5), al = Math.sin(t * 11 + k * 2) > 0 ? 1 : 0, C2 = hex('#3a1e30');
    R.pset(bx, by, C2); R.pset(bx - 1, by - al, C2); R.pset(bx + 1, by - al, C2); if (!al) { R.pset(bx - 2, by + 1, C2); R.pset(bx + 2, by + 1, C2); } }
  { const a = t * 0.9, hx = 196 + Math.cos(a) * 22, hy = 44 + Math.sin(a) * 7, al = Math.sin(t * 9) > 0 ? -1 : 0; R.pset(ri(hx), ri(hy), K); R.pset(ri(hx) - 1, ri(hy) + al, K); R.pset(ri(hx) + 1, ri(hy) + al, K); R.pset(ri(hx) - 2, ri(hy) + al - 1, K); R.pset(ri(hx) + 2, ri(hy) + al - 1, K); }
  // la nave posada a lo lejos, con Paul y Jessica diminutos que se alejan de ella
  nave(246, 80, t, { s: 0.32, fuego: 0, patas: 1 });
  for (const [k, c] of [[0, '#d8c89a'], [1, '#2a2430']]) { const x = 232 - (t - P6) * 3 - k * 4; R.rect(ri(x), 76, ri(x) + 1, 80, hex(c)); R.pset(ri(x), 75, hex('#f6c290')); }
  // el remolino de polvo en la duna media y la arena que vuela de la cresta
  for (let k = 0; k < 16; k++) { const f = (t * 0.8 + k / 16) % 1, x = 92 + Math.sin(f * 20 + k) * (2 + f * 6) + t * 2 % 30, y = 100 - f * 26; R.pset(ri(x), ri(y), b4(k, 2) < 0.5 ? hex('#e8c08a') : hex('#c89a6a')); }
  // el polvo que el viento arranca de la cresta: velos tramados que se deshacen hacia la derecha, con sus granos
  for (let k = 0; k < 9; k++) { const x0 = ((k * 41 + 13) % 320), f0 = (t * 0.9 + k * 0.29) % 1;
    for (let i = 0; i < 34; i++) { const x = ri(x0 + i + f0 * 10), y = ri(yCresta(x0 + i) - 1 - i * 0.18 - Math.sin(i * 0.3 + t * 3 + k) * 1.2), a = (1 - i / 34) * 0.5 * Math.sin(f0 * Math.PI);
      if (x >= 0 && x < 320 && b4(x, y) < a) R.pset(x, y, mez(R.pget(x, y), hex('#fae8c0'), 0.6)); } }
  for (let k = 0; k < 36; k++) { const f = (t * 1.6 + k * 0.137) % 1, x0 = (k * 37) % 320, x = x0 + f * 30, y = yCresta(x0) - f * 7 + Math.sin(f * 9) * 1.5; if (f < 0.85) R.pset(ri(x), ri(y), k % 3 ? hex('#fae0a8') : hex('#d8a868')); }
  // matas secas que el viento mece, con su sombra
  for (const [mx, my, n] of [[34, 170, 7], [266, 156, 6], [148, 178, 5], [312, 140, 5]]) { const sw = Math.sin(t * 2.3 + mx) * 1.2;
    for (let i = 0; i < 12; i++) sombrea(mx + i, my + 1, 0.35 - i * 0.025);
    for (let k = 0; k < n; k++) { const a = -Math.PI / 2 + (k - (n - 1) / 2) * 0.38, L = 6 + (k % 3) * 2, ex = mx + Math.cos(a) * L + sw * (L / 8), ey = my + Math.sin(a) * L;
      R.linea(mx, my, ri(ex), ri(ey), k % 2 ? hex('#5a3418') : hex('#7a4e26')); R.pset(ri(ex), ri(ey), hex('#b88a50')); R.pset(ri((mx + ex) / 2) + 1, ri((my + ey) / 2), hex('#9a6a3a')); }
    R.rect(mx - 1, my - 1, mx + 1, my, hex('#3a2210')); }
  // un escarabajo cruza la duna de delante, dejando su rastro de puntitos
  { const bx = 304 - (t - P6) * 7, by = 166 + Math.sin(bx * 0.05) * 2;
    for (let i = 4; i < 60; i += 3) { const x = ri(bx + i), y = ri(166 + Math.sin((bx + i) * 0.05) * 2); if (x < 320) { sombrea(x, y + 1, 0.3); sombrea(x + 1, y - 1, 0.3); } }
    const X = ri(bx), Y = ri(by), pa = Math.sin(t * 14) > 0 ? 1 : 0; R.rect(X - 2, Y - 1, X + 1, Y + 1, hex('#1a1218')); R.pset(X - 3, Y, hex('#2a1e28')); R.pset(X - 1, Y - 1, hex('#5a4a6a'));
    R.pset(X - 2 + pa, Y + 2, K); R.pset(X + pa, Y + 2, K); R.pset(X - 1 - pa, Y - 2, K); sombrea(X + 1, Y + 2, 0.4); sombrea(X + 2, Y + 2, 0.3); }
  // las huellas de Atom en la arena, detrás de él, desde la izquierda
  { const ax0 = lerp(96, 140, ease(tramo(t, P6 + 0.1, SPICE + 0.2)));
    for (let x = 4; x < ax0 - 6; x += 6) { const y = 151 + ((x / 6) & 1) * 2; sombrea(x, y, 0.4); sombrea(x + 1, y, 0.4); R.pset(x, y - 1, hex('#fad898')); R.pset(x + 1, y - 1, hex('#fad898')); } }
  // las vetas de especia que destellan (más en «spice is found»)
  const fuerte = 1 + tramo(t, SPICE - 0.2, SPICE + 0.3) * 2 * (1 - tramo(t, VALIOSA, VALIOSA + 0.8));
  for (let k = 0; k < 26; k++) { const x = ri(h2(k, 11) * 300 + 10), y = ri(yCresta(x) + 8 + h2(k, 13) * 46), ph = Math.sin(t * (3 + k % 4) + k * 2.3); if (ph * fuerte > 0.6) { R.pset(x, y, hex('#fff0b0')); if (ph * fuerte > 1.2) { R.pset(x - 1, y, hex('#ffb060')); R.pset(x + 1, y, hex('#ffb060')); R.pset(x, y - 1, hex('#ffb060')); } } }
  // Atom llega, ve el grano azul en la arena, lo coge, lo alza en «universe» y se lo guarda
  const S = 150, u = tramo(t, P6 + 0.1, SPICE + 0.2), ax = lerp(96, 140, ease(u));
  const coge = tramo(t, HALLA + 0.25, HALLA + 0.6), alza = tramo(t, VALIOSA - 0.1, VALIOSA + 0.5), guarda = tramo(t, UNIVERSO + 0.05, UNIVERSO + 0.55);
  const pose = u > 0 && u < 1 ? 'camina' : guarda > 0 && guarda < 1 ? 'sostiene' : coge > 0 && guarda < 1 ? 'sostiene' : t > HALLA - 0.2 && t < HALLA + 0.3 ? 'senala' : 'quieto';
  const r = AT.atom(R, ax, S, t, { pose, dir: 1, cara: t > UNIVERSO + 0.6 ? 'sonrisa' : t > HALLA - 0.2 ? 'sorpresa' : 'normal', s: 1 });
  const g0 = [164, S - 2], mano = r.mano;
  let gx, gy;
  if (coge <= 0) { gx = g0[0]; gy = g0[1]; }
  else if (guarda <= 0) { const k = ease(coge); gx = lerp(g0[0], mano[0], k); gy = lerp(g0[1], mano[1], k) - alza * 16; }
  else { const k = ease(guarda); gx = lerp(mano[0], r.centro[0] + 10, k); gy = lerp(mano[1] - 16, r.centro[1], k); }
  if (guarda < 1) { grano(gx, gy, t, 1.25 + alza * 0.6);
    if (alza > 0.5 && guarda <= 0) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + t, L = 13 + Math.sin(t * 7 + k) * 3; R.linea(ri(gx + Math.cos(a) * 6), ri(gy + Math.sin(a) * 6), ri(gx + Math.cos(a) * L), ri(gy + Math.sin(a) * L), k % 2 ? AZ[3] : AZ[2]); } }
  else { const a = t * 2.4; grano(r.centro[0] + Math.cos(a) * 11, r.centro[1] + Math.sin(a) * 4, t, 0.7); }
};

// ═══ 7 · el desierto de noche: la trampa, de lejos ═══
const ciudad = (t, hor) => {
  const rojo = tramo(t, NOCHE - 0.3, NOCHE + 0.4) * (0.75 + 0.25 * Math.sin(t * 5));
  if (rojo > 0) R.halo(196, hor - 6, 34 * rojo, pal(['#3a1020', '#7a2028', '#c8382a']), 0.75);
  const SIL = hex('#1e1626'), SIL2 = hex('#2a2032');
  for (const [x0, x1, h, cup] of [[168, 180, 8, 0], [178, 194, 12, 1], [192, 198, 20, 0], [198, 214, 10, 1], [212, 222, 7, 0]]) {
    for (let x = x0; x <= x1; x++) for (let y = hor - h; y <= hor; y++) R.pset(x, y, x === x0 ? SIL2 : SIL);
    if (cup) R.disco((x0 + x1) / 2, hor - h, (x1 - x0) / 2, SIL);
    for (let x = x0 + 2; x < x1 - 1; x += 3) for (let y = hor - h + 3; y < hor - 1; y += 3) if (h2(x, y) > 0.45) R.pset(x, y, Math.sin(t * 2 + x) > -0.8 ? hex('#ffd070') : hex('#c89040')); }
  // la torre del duque con la luz verde de los Atreides, que se apaga en «dies»
  R.rect(195, hor - 26, 196, hor - 20, SIL);
  const verde = 1 - tramo(t, MUERE - 0.05, MUERE + 0.3);
  if (verde > 0) { R.halo(196, hor - 28, 5 * verde + 1, pal(['#1a4a2a', '#3ac860']), 1.1); R.pset(195, hor - 28, hex('#a8ffb8')); R.pset(196, hor - 28, hex('#a8ffb8')); }
  else R.pset(195, hor - 28, hex('#2a2a2a'));
  // las luces rojas que bajan sobre la ciudad desde «trap»
  for (let k = 0; k < 7; k++) { const a = TRAMPA + k * 0.32, u = tramo(t, a, a + 3.4); if (u <= 0) continue; const x = lerp(170 + k * 12, 182 + k * 5, u), y = lerp(18 + (k % 3) * 8, hor - 12 - (k % 2) * 4, u);
    if (Math.sin(t * 9 + k) > -0.5) { R.halo(ri(x), ri(y), 3, pal(['#5a1a1a', '#e83a2a']), 1.2); R.pset(ri(x), ri(y), hex('#ff8a7a')); } }
};
const p7 = (t) => {
  const g = T.planeta(R, t, { encuadre: 'desierto', hora: 'noche', t0: P7 });
  ciudad(t, g.hor ?? 92);
  const S = g.suelo ?? 150, vuelve = t > MUERE + 0.15;
  R.actor(PA.jessica, 122, S, t, { dir: vuelve ? -1 : 1, sorpresa: t > TRAMPA && t < TRAMPA + 1.2, triste: t > MUERE, sostiene: vuelve ? [114, S - 15] : false });
  R.actor(PA.paul, 102, S, t, { dir: vuelve && t > MUERE + 0.3 ? -1 : 1, dedo: t > ENEMIGOS - 0.3 && t < NOCHE + 0.3, triste: t > MUERE, sorpresa: t > NOCHE + 0.3 && t < MUERE });
  T.planetaDelante(R, t, { encuadre: 'desierto', hora: 'noche' });
  lucie(72 + Math.sin(t * 1.2) * 3, 116 + Math.sin(t * 2.0) * 2, t, { dir: 1, cara: t > MUERE ? 'triste' : t > TRAMPA ? 'sorpresa' : 'normal', brillo: 0.9, grano: true });
};

// ═══ 8 · la boca del sietch: la huida y los Fremen ═══
const RATON = ['..kk......', '.kak......', '.kak..kk..', 'kaaakkaak.', 'kaeaaaaak.', '.kbbaaakk.', '..kbbbk...', '..k.k.k...'];
const p8 = (t) => {
  T.sietch(R, t, { camara: 'entrada' });
  const S = 152, u = tramo(t, P8 + 0.05, FREMEN - 0.3), pj = lerp(-30, 128, u), jj = pj - 22;
  // las huellas que dejan en la arena
  for (let x = -24; x < Math.min(pj, 140); x += 5) { R.pset(x + 6, S + 1 + ((x / 5) & 1), hex('#8a5a3a')); if (x < jj) R.pset(x + 8, S + 3 + ((x / 5) & 1), hex('#8a5a3a')); }
  const llega = t > FREMEN - 0.3;
  R.actor(PA.chani, 213, 70, t, { dir: -1, dedo: t > HUYEN && t < HUYEN + 1.6, habla: t > FREMEN && Math.sin(t * 8) > 0.2 });
  const f1 = tramo(t, FREMEN - 0.6, FREMEN + 0.5);
  if (f1 > 0) R.actor(PA.fremen, ri(lerp(248, 206, ease(f1))), S, t, { dir: -1, anda: f1 < 1, dedo: f1 >= 1, sonrisa: f1 >= 1 });
  const f2 = tramo(t, FREMEN, FREMEN + 0.7);
  if (f2 > 0) R.actor(PA.fremenMujer, ri(lerp(250, 228, ease(f2))), S + 2, t, { dir: -1, anda: f2 < 1, sonrisa: f2 >= 1 });
  R.actor(PA.jessica, ri(jj), S, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: llega && t < FREMEN + 0.7, sonrisa: t > FREMEN + 0.7 });
  R.actor(PA.paul, ri(pj), S, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: llega && t < FREMEN + 0.5, sonrisa: t > FREMEN + 0.5 });
  T.sietchDelante(R, t, { camara: 'entrada' });
  // Atom de pie, con su grano; gag: el ratón saltarín le sube a la cabeza y se queda mirando la luna
  const AX = 34, AS = 172, salta = tramo(t, HUYEN - 0.4, HUYEN + 0.8), arriba = salta >= 1;
  const r = AT.atom(R, AX, AS, t, { pose: 'quieto', dir: 1, cara: salta > 0.85 && t < HUYEN + 1.6 ? 'sorpresa' : arriba ? 'sonrisa' : 'normal', s: 1 });
  { const a = t * 2.4; grano(r.centro[0] + Math.cos(a) * 11, r.centro[1] + Math.sin(a) * 4, t, 0.7); }
  const CORONA = ri(r.centro[1]) - 6;
  let mx, my;
  if (salta <= 0) { mx = -8; my = 176; }
  else if (!arriba) { const tr = salta * 3, k = Math.floor(tr), f = tr - k, x0 = [-8, 6, 18][k], x1 = [6, 18, AX + 4][k], y0 = [176, 176, 176][k], y1 = [176, 176, CORONA][k]; mx = lerp(x0, x1, f); my = lerp(y0, y1, f) - Math.sin(f * Math.PI) * (k === 2 ? 16 : 8); }
  else { mx = AX + 4; my = CORONA; }
  R.sprite(RATON, ri(mx) - 5, ri(my) - 8, { k: K, a: hex('#d8b078'), b: hex('#f4e0b8'), e: K }, false);
  { const ty = ri(my) - 1 - (arriba ? ri(Math.sin(t * 3)) : 0); R.linea(ri(mx) - 5, ri(my) - 3, ri(mx) - 11, ty, hex('#6a4a2a')); R.linea(ri(mx) - 5, ri(my) - 2, ri(mx) - 11, ty + 1, K); } R.rect(ri(mx) - 13, ri(my) - 2, ri(mx) - 11, ri(my) - 1, K);
  if (arriba && Math.floor(t * 1.5) % 3 === 0) R.pset(ri(mx) + 2, ri(my) - 9, hex('#f4e0b8'));
};

// ═══ 9 · la sala del sietch: Paul y Chani; el destiltraje de Atom gotea ═══
const p9 = (t) => {
  T.sietch(R, t, {});
  const S = 152, u = tramo(t, P9 + 0.1, AMOR - 0.4), cx = lerp(262, 140, ease(u));
  R.actor(PA.paul, 112, S, t, { dir: 1, sonrisa: t > AMOR - 0.2, habla: t > JOVEN + 0.4 && Math.sin(t * 8) > 0.3 });
  R.actor(PA.chani, ri(cx), S, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: t > AMOR - 0.2, habla: t > CHANI && t < JOVEN + 0.3 && Math.sin(t * 7) > 0 });
  // el corazón en «love»
  const co = tramo(t, AMOR, AMOR + 0.3), fu = tramo(t, AMOR + 1.6, AMOR + 2.2);
  if (co > 0 && fu < 1) { const y = ri(112 - (t - AMOR) * 5); R.icono('corazon', 129, y, hex('#e84a6a'), K, 2); }
  // gag: el destiltraje de Atom gotea; una Fremen le pone un cuenco debajo
  const AX = 74, AS = 172, gotea = t > P9 + 0.6, cuenco = tramo(t, JOVEN + 0.2, JOVEN + 0.9), puesto = t > JOVEN + 0.9;
  const fm = tramo(t, JOVEN - 0.4, JOVEN + 0.3);
  R.actor(PA.fremenMujer, ri(lerp(30, 48, ease(fm))), 168, t, { dir: 1, anda: fm > 0 && fm < 1, sorpresa: t > JOVEN - 1.0 && t < JOVEN - 0.3, sostiene: !puesto && t > JOVEN - 0.4 ? true : false, sonrisa: puesto });
  const charco = Math.min(1, Math.max(0, t - P9 - 0.6) / 3.2);
  if (!puesto) for (let i = -ri(5 + charco * 9); i <= ri(5 + charco * 9); i++) { R.pset(AX + i, AS, K); R.pset(AX + i, AS + 1, hex('#6ab0f0')); R.pset(AX + i, AS + 2, Math.abs(i) < 3 + charco * 6 ? hex('#3a7ad0') : K); if (Math.abs(i) < 2 + charco * 5) R.pset(AX + i, AS + 3, K); if (i % 4 === 0) R.pset(AX + i, AS + 1, hex('#e8f8ff')); }
  if (puesto || cuenco > 0.6) { R.rect(AX - 7, AS - 1, AX + 7, AS + 3, K); R.rect(AX - 6, AS - 1, AX + 6, AS + 2, hex('#a8683a')); R.rect(AX - 6, AS - 1, AX + 6, AS - 1, hex('#5a9ad8')); }
  const r = AT.atom(R, AX, AS - (puesto ? 3 : 0), t, { pose: t > JOVEN + 1.0 ? 'saluda' : 'quieto', dir: -1, cara: puesto ? 'guino' : gotea ? 'triste' : 'normal', s: 1 });
  const [ox, oy] = r.centro;
  // el destiltraje: capucha parda, tubo a la nariz y correas
  const TR = hex('#7a5a3a'), TR2 = hex('#5a3e24');
  for (let i = -6; i <= 6; i++) { R.pset(ri(ox + i), ri(oy + 5), TR2); R.pset(ri(ox + i), ri(oy + 6), TR); }
  for (let a = 0; a < 26; a++) { const p = Math.PI + a / 25 * Math.PI; for (const rr of [7, 8]) R.pset(ri(ox + Math.cos(p) * rr), ri(oy - 1 + Math.sin(p) * rr), TR); R.pset(ri(ox + Math.cos(p) * 9), ri(oy - 1 + Math.sin(p) * 9), K); }
  R.linea(ri(ox - 6), ri(oy + 1), ri(ox - 3), ri(oy + 2), TR2);
  { const a = t * 2.4; grano(ox + Math.cos(a) * 11, oy + Math.sin(a) * 4, t, 0.7); }
  if (gotea) for (let k = 0; k < 7; k++) { const f = ((t * 1.9 + k * 0.17) % 1), x = ox - 9 + k * 3, y = oy + 4 + f * (AS - oy - 3); R.rect(ri(x), ri(y), ri(x) + 1, ri(y) + 1, hex('#9ad0ff')); R.rect(ri(x), ri(y) + 2, ri(x) + 1, ri(y) + 2, hex('#3a7ad0')); }
  if (t > JOVEN - 1.0 && t < JOVEN - 0.2) R.icono('!', 40, 128 + ri(Math.sin(t * 9)), hex('#ffd34a'), K, 1);
  if (cuenco > 0 && !puesto) { const [hx, hy] = [lerp(54, AX, cuenco), lerp(150, AS - 1, cuenco)]; R.rect(ri(hx) - 6, ri(hy) - 1, ri(hx) + 6, ri(hy) + 3, K); R.rect(ri(hx) - 5, ri(hy) - 1, ri(hx) + 5, ri(hy) + 2, hex('#a8683a')); }
  T.sietchDelante(R, t, {});
};

// ═══ 10 · fondo propio: el muro de petroglifos ═══
const p10 = (t) => {
  const m = muroCerca(t, { p: P10, prof: PROFECIA });
  lucie(m.x - 14 + Math.sin(t * 1.5) * 3, 104 + Math.sin(t * 2.3) * 3, t, { dir: 1, cara: t > PROFECIA - 0.1 ? 'sorpresa' : t > INQUIETA ? 'triste' : 'normal', brillo: 0.6, grano: true });
};

// ═══ 11 · fondo propio: la galería del mural (el plano que congela pa-profecia) ═══
const p11 = (t) => {
  galeria(t, { p: P11, lock: LLAVE });
  lucie(108 + Math.sin(t * 1.2) * 3, 92 + Math.sin(t * 2.2) * 2, t, { dir: 1, cara: t > LLAVE ? 'sorpresa' : 'normal', brillo: 0.85, grano: true });
};

const efectos = [[0.4, 'pasos'], [RAYO, 'trueno'], [BG, 'zumbido'], [MUJERES - 0.3, 'pasos'], [CABALLOS, 'toc'], [PRODUCE - 0.4, 'brillo'],
  [P4 + 0.1, 'lluvia'], [MIRA + 0.75, 'chof'], [FUTURO, 'viento'], [P5 + 0.2, 'motor'], [ARRAKIS, 'palmada'], [NUNCA, 'vapor'],
  [HALLA + 0.3, 'pop'], [UNIVERSO + 0.1, 'brillo'], [TRAMPA + 0.1, 'zumbido'], [MUERE, 'campana'], [P8 + 0.2, 'pasos'], [HUYEN + 0.75, 'boing'],
  [P9 + 0.7, 'burbujas'], [AMOR, 'pop'], [JOVEN + 0.9, 'toc'], [P10 + 0.2, 'pasos'], [PROFECIA, 'brillo'], [LLAVE, 'cerrojo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11]], { efectos, año: 0 });
'''

E['pa-caladan'] = ('Caladan', CAB_CALADAN, COMUN + MURAL + CUERPO_CALADAN)

# ═══════════════════════════════════════════ PA-PROFECIA (PAUSA 1) ═══════════════════════════════════════════
CAB_PROFECIA = '''// PA-PROFECIA (frase 8), PAUSA «fíjate en esto» 1, año 12 (las pausas), sin cartela; ánimo aventura. Cuatro planos:
// (la pausa entra con «tapestop» y sale con «interruptor»; lo que nombra la voz sale a color, al doble)
// 1. PAUSA: la galería del mural de pa-caladan 11 CONGELADA en gris azulado (su último instante); Atom sale de su
//    luciérnaga y se pone de pie al doble; en «notice this» rodea con su órbita la talla del salvador; en «key» la talla
//    sale a color; en «desert», arriba a la derecha (x 214–266, y 30–64) se despliega una viñeta enmarcada en oro con el
//    desierto (cielo, sol que late, nubes, la gran duna con su arista curva, la ladera de luz con sus ondas y la cara de
//    sombra, la duna lejana, arena que se vuela de la cima) y una
//    X roja se traza encima en dos golpes: la profecía NO nació en el desierto;
// 2. el escritorio del estudio (a color): Atom desenrolla un pergamino con el símbolo de la Bene Gesserit; en «planted»
//    deja caer una semilla de oro, que brota; en «centuries earlier» el reloj de arena se vacía de golpe; en «scattering
//    legends» las semillas saltan del pergamino y salen volando;
// 3. PAUSA: el muro de petroglifos de pa-caladan 10 CONGELADO; las semillas de oro caen sobre los planetas pintados,
//    que salen a color uno a uno; en «help» uno pide ayuda («!»); en «recognize» una figurita a color, al doble, con
//    los brazos alzados, que sube desde detrás de un repecho de roca del muro (x 98–148, y 112) y se pone de pie en él;
//    en «heaven» nace una nube de luz bajo la barra del año (y ≈ 16–32) y de ella baja el haz hasta la figurita;
// 4. PAUSA: la galería congelada otra vez, con Atom al otro lado: en «messiah» un halo de oro sobre Paul; en «tool» el
//    símbolo de la Bene Gesserit a color dentro del halo de la talla; en «planted on purpose» una raíz de oro baja del pie
//    de la talla, por la derecha de Paul, hasta una semilla grande a medio enterrar (centro (197, 163), y ≤ 178) con el
//    símbolo a 0,8; al final vuelve el color (clic).'''

CUERPO_PROFECIA = CONST(
    Q2=F('fijate1', 5.58), Q3=F('fijate1', 10.56), Q4=F('fijate1', 15.40),
) + CONST(
    NOTICE=F('fijate1', 0.32), LLAVEW=F('fijate1', 1.92), PROFW=F('fijate1', 3.38), DESIERTOW=F('fijate1', 4.82),
    BGW=F('fijate1', 5.62), PLANTA=F('fijate1', 6.42), SIGLOS=F('fijate1', 7.00), DISPERSA=F('fijate1', 8.38), PLANETASW=F('fijate1', 9.54),
    AYUDA=F('fijate1', 11.98), RECONOCE=F('fijate1', 13.20), CIELOW=F('fijate1', 14.58),
    MESIAS=F('fijate1', 17.40), HERRAMIENTA=F('fijate1', 19.52), APROPOSITO=F('fijate1', 20.06),
) + r'''
// ── los mundos congelados: el último instante de pa-caladan 11 (la galería) y el de su plano 10 (el muro), con los
// tiempos de pa-caladan en números (sus marcas: P10 43.19, «prophecy» 46.83, P11 47.59, «lock» 50.47; dura 51.798) ──
const TA = 51.77, WA = { p: 47.59, lock: 50.47 }, TB = 47.54, WB = { p: 43.19, prof: 46.83 };
let HA = null;
const heladoA = () => { if (!HA) { const b = R.nuevo(), prev = R.usar(b); galeria(TA, WA); R.usar(prev); HA = b; } R.copiar(HA); };
// el muro del 10 en ese mismo instante: Paul ya está en la galería, así que el pasillo queda vacío, con su luz de candil
const heladoB = () => fijo('muro10', muroLuz);
const VOZ = [en('fijate1', 0), en('fijate1', 1)];
const habla = (t) => (t > VOZ[0] && t < VOZ[1] && Math.sin(t * 11) > -0.2) ? 1 : 0;
const ORO2 = pal(['#8a5a1a', '#c89a3a', '#ffd860', '#fff4c0']);
// la talla a color: su hueco en ocre cálido con el filo de oro (sobre el gris)
const tallaColor = (u, t) => { const { cx, cy } = TALLA;
  for (let y = 36; y < 140; y++) for (let x = 130; x < 192; x++) if (dentroTalla(x, y, cx, cy, 1) && b4(x, y) < u) { const borde = !dentroTalla(x - 1, y, cx, cy, 1) || !dentroTalla(x + 1, y, cx, cy, 1) || !dentroTalla(x, y - 1, cx, cy, 1);
    R.pset(x, y, borde ? ORO2[2 + ((x + y + ri(t * 6)) % 2)] : rmp(pal(['#4a2a18', '#7a4a28', '#a8683a']), 1.2 + (y - 40) / 100 + Math.sin(x * 0.4) * 0.3, x, y)); }
  for (let a = 0; a < 120; a++) { const p = a / 120 * Math.PI * 2; if (b4(a, 1) < u) R.pset(ri(cx + Math.cos(p) * 15), ri(cy - 44 + Math.sin(p) * 15), ORO2[2]); } };
// la viñeta del desierto (para la X de «desert»): un cuadrito enmarcado en oro, de 53×35, que se despliega desde su
// centro; dentro, cielo de mediodía con dos nubes que corren, el sol con su halo que late, una duna lejana y la gran
// duna con su cresta curva, la cara de luz (a la derecha, hacia el sol) con sus ondas y la cara de sombra (a la
// izquierda), y arena que se vuela de la cresta; encima, en «desert», la X roja se traza en dos golpes
const DUNA2 = pal(['#6a3418', '#8e4a22', '#b0662e', '#cc8440', '#e2a25a', '#f2c27c', '#fadca0']);
const CIELO2 = pal(['#4a82c8', '#6a9ed8', '#8ab8e2', '#b0d0e8', '#dce4d0', '#f4e4b0']);
const VX0 = 214, VY0 = 30, VX1 = 266, VY1 = 64;
// el perfil de la gran duna contra el cielo: sube suave desde la izquierda hasta la cima (247, 40) y cae de golpe a la
// derecha; la arista afilada baja de la cima hacia abajo a la izquierda en curva y separa la ladera de luz (a la
// izquierda, hacia el sol) de la cara de sombra (a la derecha)
const cresta = (x) => x < 247 ? 40 + Math.pow((247 - x) / 30, 1.6) * 12 : 40 + Math.pow((x - 247) / 16, 1.2) * 7;
const arista = (y) => 247 - Math.pow(Math.max(0, y - 40) / 21, 0.8) * 20 + Math.sin((y - 40) * 0.3) * 1.5;
const vinetaDesierto = (u, t, ux) => {
  const cy = (VY0 + VY1) / 2, h = Math.ceil(ease(u) * (VY1 - VY0) / 2 + 0.5);
  // la sombra del cuadrito en el muro
  for (let y = VY0 + 2; y <= VY1 + 2; y++) for (let x = VX0 + 2; x <= VX1 + 3; x++) if ((x > VX1 || y > VY1) && Math.abs(y - cy) <= h + 2) sombrea(x, y, 0.45);
  R.recorte([VX0, ri(cy - h), VX1, ri(cy + h)]);
  const IX0 = VX0 + 3, IY0 = VY0 + 3, IX1 = VX1 - 3, IY1 = VY1 - 3;
  const sx = 226, sy = 39 + Math.sin(t * 0.7) * 0.4;
  for (let y = IY0; y <= IY1; y++) for (let x = IX0; x <= IX1; x++) {
    const lej = 47 + 2.5 * Math.sin(x * 0.13 + 2) + Math.sin(x * 0.37);
    const cr = cresta(x), ar = arista(y);
    let c;
    if (y >= cr) {
      const luz = x < ar;
      // las ondas del viento en la ladera de luz: curvas que siguen la pendiente
      const onda = Math.sin(x * 0.55 - y * 1.25 + Math.sin(y * 0.3) * 2);
      let v = luz ? 4.7 - (y - cr) * 0.05 + (onda > 0.7 ? -1.6 : onda < -0.85 ? 0.8 : 0) - (ar - x < 3 ? -0.5 : 0) : 1.6 + (x - ar) * 0.03 + (y - cr) * 0.02;
      if (!luz && x - ar < 1.2) v = 0.4; // la sombra más honda pegada a la arista
      if (luz && ar - x < 1) v = 6; // el filo de la arista, que pilla el sol
      if (y - cr < 1) v = luz ? 6 : 2.8; // el borde de la cresta contra el cielo
      if (y > 58) v = 3.6 + (Math.sin(x * 0.8 + y * 2.3) > 0.55 ? -1 : 0) - (y - 58) * 0.1; // el llano de delante, con sus surcos
      c = rmp(DUNA2, v, x, y);
    } else if (y >= lej) { const lz = Math.sin(x * 0.13 + 2) < 0.3; c = rmp(DUNA2, (lz ? 4.4 : 3.2) - (y - lej) * 0.12, x, y); } // la duna lejana
    else { const d = Math.hypot(x - sx, y - sy); c = rmp(CIELO2, 0.6 + (y - IY0) / (lej - IY0) * 4.6 + (d < 9 ? (9 - d) * 0.25 : 0), x, y); }
    R.pset(x, y, c);
  }
  // el sol: disco blanco, su halo que late y cuatro destellos que giran
  const lat = 0.5 + 0.5 * Math.sin(t * 3.1);
  R.disco(sx, sy, 3 + lat * 0.4, hex('#fff2b0')); R.disco(sx, sy, 2, hex('#ffffff'));
  for (let k = 0; k < 4; k++) { const a = k / 4 * Math.PI * 2 + t * 0.8; R.pset(ri(sx + Math.cos(a) * 6), ri(sy + Math.sin(a) * 6), hex('#fff8d8')); }
  // dos nubecillas que corren despacio hacia la izquierda
  for (const [nx0, ny, w] of [[250, 36, 7], [238, 41, 5]]) { const nx = IX0 + ((nx0 - IX0 - t * 2.2) % 46 + 46) % 46;
    for (let i = 0; i < w; i++) { R.pset(ri(nx + i), ny, hex('#f8f4e8')); if (i > 0 && i < w - 1) R.pset(ri(nx + i), ny - 1, hex('#ffffff')); R.pset(ri(nx + i), ny + 1, hex('#c8d4e0')); } }
  // la arena que se vuela de la cresta, hacia la derecha
  for (let k = 0; k < 7; k++) { const f = (t * 0.9 + k / 7) % 1, x = 247 + f * 14, y = 40 - Math.sin(f * Math.PI) * 3 + f * 3; R.pset(ri(x), ri(y), f < 0.5 ? DUNA2[6] : DUNA2[5]); }
  // el marco: listón de oro con su bisel y el contorno negro
  for (let y = VY0; y <= VY1; y++) for (let x = VX0; x <= VX1; x++) { const dx = Math.min(x - VX0, VX1 - x), dy = Math.min(y - VY0, VY1 - y), d = Math.min(dx, dy); if (d > 2) continue;
    if (d === 0) { R.pset(x, y, K); continue; } const arriba = (y - VY0 === d) || (x - VX0 === d); R.pset(x, y, d === 2 ? ORO2[0] : rmp(ORO2, arriba ? 2.6 : 1.2, x, y) ); }
  R.pset(VX0 + 1, VY0 + 1, ORO2[3]); R.pset(VX0 + 2 + ri((t * 9) % 48), VY0 + 1, ORO2[3]);
  // la X roja: dos golpes, con su contorno oscuro para que se lea
  if (ux > 0) { const X1 = hex('#e83a3a'), X0 = hex('#5a0a0a'), g1 = Math.min(1, ux * 2), g2 = Math.max(0, ux * 2 - 1);
    const golpe = (ax, ay, bx, by, g) => { if (g <= 0) return; const ex = lerp(ax, bx, g), ey = lerp(ay, by, g); for (let w = -2; w <= 2; w++) R.linea(ax + w, ay, ex + w, ey, X0); for (let w = -1; w <= 1; w++) R.linea(ax + w, ay, ex + w, ey, X1); };
    golpe(IX0 + 3, IY0 + 2, IX1 - 3, IY1 - 2, g1); golpe(IX1 - 3, IY0 + 2, IX0 + 3, IY1 - 2, g2); }
  R.recorte(null);
};

// ═══ 1 · PAUSA: la galería congelada; la talla y la X sobre el desierto ═══
const q1 = (t) => {
  heladoA(); AT.pausa(R, tramo(t, 0.04, 0.34));
  const ua = tramo(t, NOTICE, NOTICE + 0.4); if (ua > 0) AT.anillo(R, TALLA.cx, TALLA.cy - 6, 34, 58, t, ua);
  const uc = tramo(t, LLAVEW - 0.1, LLAVEW + 0.4); if (uc > 0) tallaColor(uc, t);
  const ud = tramo(t, DESIERTOW - 0.5, DESIERTOW - 0.2);
  if (ud > 0) vinetaDesierto(ud, t, tramo(t, DESIERTOW, DESIERTOW + 0.3));
  if (t < 0.85) { const v = tramo(t, 0.05, 0.85), AX0 = 108 + Math.sin(TA * 1.2) * 3, AY0 = 92 + Math.sin(TA * 2.2) * 2; lucie(lerp(AX0, 92, v), lerp(AY0, 132, v) + Math.sin(t * 6) * 2 * v, TA + t, { dir: 1, cara: 'sorpresa', brillo: 0.85, grano: true }); return; }
  const a = tramo(t, 0.95, 1.9), x = lerp(78, 92, a);
  const pose = a > 0 && a < 1 ? 'camina' : t > DESIERTOW - 0.4 ? 'senala' : t > NOTICE && t < PROFW + 0.6 ? 'senala' : 'quieto';
  const r = AT.atom(R, x, 174 - (t < 0.95 ? (1 - tramo(t, 0.85, 0.95)) * 6 : 0), t, { s: 2, pose, dir: 1, cara: t > DESIERTOW ? 'triste' : t > LLAVEW ? 'sonrisa' : 'sorpresa', habla: habla(t) });
  { const p = t * 2.4; grano(r.centro[0] + Math.cos(p) * 22, r.centro[1] + Math.sin(p) * 8, t, 1.2); }
};

// ═══ 2 · el escritorio del estudio: el pergamino con el símbolo y las semillas ═══
const SEM = hex('#e8c040'), SEMO = hex('#8a6a1a');
const semilla = (x, y, s = 1) => { const X = ri(x), Y = ri(y); R.rect(X - s - 1, Y - 2 * s, X + s + 1, Y + 2 * s, K); R.rect(X - s, Y - 2 * s + 1, X + s, Y + 2 * s - 1, SEM); R.rect(X - s, Y - 2 * s + 1, X - s, Y, hex('#fff4c0')); R.pset(X + s, Y + 1, SEMO); };
const q2 = (t) => {
  const g = T.estudio(R, t, { encuadre: 'consulta', camara: 'escritorio' });
  T.estudioDelante(R, t, { encuadre: 'consulta', camara: 'escritorio' });
  const [x0, y0, x1, y1] = g.escritorio ?? [108, 112, 212, 166];
  // el pergamino que se desenrolla sobre el secante
  const ab = tramo(t, Q2 + 0.05, BGW + 0.3), px0 = x0 + 6, px1 = ri(lerp(px0 + 8, x1 - 6, ease(ab))), py0 = y0 + 4, py1 = y1 - 6;
  for (let y = py0; y <= py1; y++) for (let x = px0; x <= px1; x++) R.pset(x, y, rmp(PERG, 3 + (ns(x * 0.1, y * 0.1) - 0.5) * 1.2 - (y - py0 < 2 || py1 - y < 2 ? 1 : 0), x, y));
  R.rect(px1 - 1, py0 - 2, px1 + 3, py1 + 2, K); R.rect(px1, py0 - 1, px1 + 2, py1 + 1, PERG[2]); R.rect(px1, py0 - 1, px1, py1 + 1, PERG[4]);
  const cx = ri((x0 + x1) / 2) - 4, cy = ri((py0 + py1) / 2) - 2;
  if (px1 > cx + 16) simbolo(cx, cy, 1.4, hex('#8a2a1a'), hex('#5a1a10'));
  // la semilla de oro cae en «planted» y brota
  const cae = tramo(t, PLANTA - 0.35, PLANTA), brota = tramo(t, PLANTA + 0.1, SIGLOS);
  if (cae > 0) { if (brota <= 0) semilla(cx, lerp(cy - 34, cy + 4, cae * cae), 2); else { semilla(cx, cy + 4, 2); const h = brota * 9; R.linea(cx, cy + 2, cx, ri(cy + 2 - h), hex('#3a8a3a')); if (brota > 0.6) { R.pset(cx - 1, ri(cy - h + 3), hex('#5ac85a')); R.pset(cx - 2, ri(cy - h + 2), hex('#5ac85a')); R.pset(cx + 1, ri(cy - h + 4), hex('#5ac85a')); R.pset(cx + 2, ri(cy - h + 3), hex('#5ac85a')); } } }
  // el reloj de arena: en «centuries earlier» se vacía de golpe, una y otra vez
  const vac = tramo(t, SIGLOS - 0.1, DISPERSA - 0.2);
  c_relojArena(R, 236, 160, 1, t, vac > 0 ? (vac * 3) % 1 : 0.15);
  // en «scattering legends» las semillas saltan del pergamino y salen volando hacia arriba a la izquierda
  const ds = tramo(t, DISPERSA, Q3 - 0.2);
  if (ds > 0) for (let k = 0; k < 9; k++) { const f = tramo(ds, k * 0.06, k * 0.06 + 0.6); if (f <= 0 || f >= 1) continue; const x = lerp(cx, -10 + k * 22, f), y = cy - Math.sin(f * Math.PI) * (40 + k * 6) - f * 20; for (let e = 1; e < 5; e++) { const fe = Math.max(0, f - e * 0.03), xe = lerp(cx, -10 + k * 22, fe), ye = cy - Math.sin(fe * Math.PI) * (40 + k * 6) - fe * 20; R.pset(ri(xe), ri(ye), e < 3 ? hex('#ffe070') : hex('#c89a3a')); } semilla(x, y, 2); }
  // Atom al doble, de pie sobre la mesa, a la derecha del pergamino
  const pose = t > PLANTA - 0.5 && t < PLANTA + 0.2 ? 'sostiene' : t > DISPERSA && t < PLANETASW + 0.3 ? 'brazos' : t > SIGLOS && t < DISPERSA - 0.2 ? 'senala' : 'quieto';
  const r = AT.atom(R, 260, 150, t, { s: 2, pose, dir: -1, cara: t > DISPERSA ? 'sonrisa' : t > SIGLOS ? 'sorpresa' : 'normal', habla: habla(t) });
  if (t > PLANTA - 0.5 && t < PLANTA - 0.35) semilla(r.mano[0], r.mano[1]);
  { const p = t * 2.4; grano(r.centro[0] + Math.cos(p) * 22, r.centro[1] + Math.sin(p) * 8, t, 1.2); }
};

// ═══ 3 · PAUSA: el muro congelado; las semillas caen sobre los planetas ═══
// el repecho de roca del muro donde se pone la figurita: una losa saliente con su cara de luz arriba, su frente rugoso y
// la sombra que echa en el muro (se pinta antes de la pausa, así queda gris como el resto del muro congelado)
const REP = { x0: 98, x1: 148, y: 112 };
const repecho = () => { const { x0, x1, y: y0 } = REP;
  for (let y = y0 + 11; y <= y0 + 17; y++) for (let x = x0 + 4; x <= x1 - 2; x++) if (Math.abs(x - (x0 + x1) / 2) < (x1 - x0) / 2 - (y - y0 - 9) * 2.4) sombrea(x, y, 0.5 - (y - y0 - 11) * 0.07);
  for (let y = y0; y <= y0 + 11; y++) { const m = y < y0 + 4 ? 0 : (y - y0 - 4) * 1.3, xa = x0 + ri(m + Math.sin(y * 1.3) * 0.8), xb = x1 - ri(m * 0.8);
    for (let x = xa; x <= xb; x++) { const borde = x === xa || x === xb || y === y0 || y === y0 + 11;
      R.pset(x, y, borde ? K : y < y0 + 4 ? rmp(ROCA, 5.6 + (ns(x * 0.3, y) - 0.5) * 1.2 - (y - y0) * 0.3, x, y) : rmp(ROCA, roca(x, y, 3.2) - (y - y0 - 4) * 0.15, x, y)); } }
  for (const gx of [108, 121, 137]) { R.pset(gx, REP.y + 6, ROCA[1]); R.pset(gx + 1, REP.y + 7, ROCA[1]); R.pset(gx - 1, REP.y + 5, ROCA[5]); }
  R.linea(x0 + 1, y0 + 1, x1 - 1, y0 + 1, ROCA[6]); };
// la nube de luz de «heaven», bajo la barra del año: unas bolas de luz que respiran, con su halo
const nubeLuz = (cx, cy, u, t) => { if (u <= 0) return; R.halo(cx, cy, 10 * u, pal(['#8a6a3a', '#e8c070', '#fff0b8']), 0.7 * u);
  for (const [dx, dy, r] of [[-9, 1, 4], [-3, -2, 5], [4, -1, 5], [10, 1, 4], [0, 2, 4]]) { const rr = r * u + Math.sin(t * 2.2 + dx) * 0.4; R.disco(cx + dx, cy + dy, rr + 0.6, hex('#e8c070')); R.disco(cx + dx, cy + dy, rr, hex('#fff4c8')); R.disco(cx + dx - 1, cy + dy - 1, rr * 0.5, hex('#ffffff')); }
  for (let k = 0; k < 5; k++) { const a = t * 1.3 + k * 1.26; R.pset(ri(cx + Math.cos(a) * 15), ri(cy + 1 + Math.sin(a) * 3), hex('#fff8d8')); } };
const q3 = (t) => {
  heladoB(); repecho(); AT.pausa(R, 1);
  const COLS = ['#d8903a', '#5a8ae8', '#c84a3a', '#5ac87a', '#c8a0e8'];
  PLANETAS10.forEach(([px, py, pr], k) => { const ll = Q3 + 0.1 + k * 0.28, cae = tramo(t, ll, ll + 0.4);
    if (cae > 0 && cae < 1) semilla(px, lerp(-6, py - pr - 2, cae * cae), 2);
    if (cae >= 1) { const c = hex(COLS[k]); R.disco(px, py, pr + 1, K); R.disco(px, py, pr, (x, y) => rmp([mez(c, K, 0.4), c, mez(c, hex('#ffffff'), 0.4)], 1.4 - (x - px + y - py) / pr * 0.7, x, y)); semilla(px, py - pr - 1); } });
  // en «help», el planeta del centro pide ayuda; en «recognize», la figurita al doble sube desde detrás del repecho y
  // se pone de pie en él; en «heaven», nace una nube de luz bajo la barra del año y de ella baja el haz hasta la figurita
  const [hx, hy, hr] = PLANETAS10[2];
  if (t > AYUDA && t < RECONOCE) R.icono('!', hx - 3, hy - hr - 18 + ri(Math.sin(t * 9)), hex('#ffd34a'), K, 2);
  const fig = tramo(t, RECONOCE - 0.2, RECONOCE + 0.35), nb = tramo(t, CIELOW - 0.25, CIELOW + 0.1), hz = tramo(t, CIELOW, CIELOW + 0.4);
  if (hz > 0) for (let y = 30; y < REP.y; y++) { const an = 5 + (y - 30) / (REP.y - 30) * 4; for (let x = ri(hx - an); x <= ri(hx + an); x++) if (b4(x, y + ri(t * 8)) < hz * (0.75 - Math.abs(x - hx) / (an * 2))) R.pset(x, y, mez(R.pget(x, y), hex('#fff4c0'), 0.6)); }
  if (fig > 0) { R.recorte([0, 0, 319, REP.y - 1]);
    AT.escalado(R, () => { R.actor(PA.fremenMujer, 0, 26, t, { dir: 1, brazos: t > RECONOCE + 0.2, sonrisa: true }); }, 16, 28, hx - 15, REP.y - 56 + ri((1 - ease(fig)) * 56), 2);
    R.recorte(null); }
  if (hz > 0) { for (let x = hx - 10; x <= hx + 10; x++) R.pset(x, REP.y + 1, mez(R.pget(x, REP.y + 1), hex('#fff4c0'), 0.7 * hz)); // la luz que cae en el repecho
    for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + t; R.pset(ri(hx + Math.cos(a) * 18), ri(hy + 40 + Math.sin(a) * 6), hex('#fff4c0')); } }
  nubeLuz(hx - 3, 27, nb, t);
  const r = AT.atom(R, 30, 176, t, { s: 2, pose: t > Q3 + 0.2 && t < CIELOW + 0.3 ? 'senala' : 'quieto', dir: 1, cara: t > CIELOW ? 'sonrisa' : t > AYUDA ? 'sorpresa' : 'normal', habla: habla(t) });
  { const p = t * 2.4; grano(r.centro[0] + Math.cos(p) * 22, r.centro[1] + Math.sin(p) * 8, t, 1.2); }
};

// la semilla grande de oro con el símbolo de la Bene Gesserit (a 0,8, que se lea el ojo en su anillo): una almendra con
// la punta arriba, sombreada con la luz de arriba a la izquierda, su brillo, su halo que late y la arena que la entierra
const semillaBG = (cx, cy, g, t) => { const a = 11 * g, b = 14 * g, lat = 0.5 + 0.5 * Math.sin(t * 4);
  R.halo(cx, cy, (16 + lat * 2) * g, pal(['#6a4a1a', '#c89a3a', '#ffe070']), 0.55);
  const dentro = (x, y) => { const dy = (y - cy) / b; if (Math.abs(dy) > 1) return false; const w = a * Math.sqrt(1 - dy * dy) * (dy < 0 ? 1 + dy * 0.35 : 1); return Math.abs(x - cx) <= w; };
  for (let y = ri(cy - b) - 1; y <= ri(cy + b) + 1; y++) for (let x = ri(cx - a) - 1; x <= ri(cx + a) + 1; x++) { if (!dentro(x, y)) { if (dentro(x - 1, y) || dentro(x + 1, y) || dentro(x, y - 1) || dentro(x, y + 1)) R.pset(x, y, K); continue; }
    const v = 2.2 - ((x - cx) / a + (y - cy) / b) * 0.9 + (dentro(x + 1, y) && dentro(x, y + 1) ? 0 : -0.8); R.pset(x, y, rmp(ORO2, v, x, y)); }
  if (g > 0.6) { simbolo(cx, cy - 3, 0.8, hex('#7a1a10'), hex('#3a0a08')); R.pset(cx - 6, cy - 7, hex('#ffffff')); R.pset(cx - 5, cy - 8, hex('#ffffff')); R.pset(cx - 6, cy - 6, ORO2[3]); }
  // la arena que la entierra por abajo, con su sombra
  for (let y = cy + 9; y <= cy + 15; y++) for (let x = cx - 16; x <= cx + 16; x++) { const top = cy + 9 + Math.abs(x - cx) * 0.35 + Math.sin(x * 0.9) * 0.6; if (y < top) continue;
    R.pset(x, y, y < top + 1 ? hex('#e8c488') : rmp(pal(['#7a5a36', '#9a7646', '#b89058', '#d4ac6c']), 2.6 - (y - top) * 0.3 - (x > cx ? 0.5 : 0), x, y)); }
  for (let k = 0; k < 4; k++) { const f = (t * 0.7 + k / 4) % 1; R.pset(ri(cx - 12 + k * 8 + Math.sin(f * 6) * 2), ri(cy - b - 2 - f * 10), ORO2[3]); } };

// ═══ 4 · PAUSA: la galería congelada otra vez: el halo, el símbolo y la raíz; vuelve el color ═══
const q4 = (t) => {
  heladoA(); AT.pausa(R, 1 - tramo(t, E.duracion - 0.45, E.duracion - 0.08));
  const fin = 1 - tramo(t, E.duracion - 0.45, E.duracion - 0.08);
  // el halo de oro sobre Paul en «messiah» (Paul congelado ante la talla: cabeza hacia (160, 128))
  const ha = tramo(t, MESIAS - 0.2, MESIAS + 0.3) * fin;
  if (ha > 0) { for (let a = 0; a < 60; a++) { const p = a / 60 * Math.PI * 2; if (b4(a, 4) < ha) R.pset(ri(160 + Math.cos(p) * 9), ri(129 + Math.sin(p) * 3), ORO2[2 + (a % 2)]); } for (let k = 0; k < 8; k++) { const p = k / 8 * Math.PI * 2 + t * 0.6; if (ha > 0.5) R.pset(ri(160 + Math.cos(p) * 14), ri(129 + Math.sin(p) * 6), ORO2[3]); } }
  // en «tool», el símbolo de la Bene Gesserit a color dentro del halo de la talla
  const sb = tramo(t, HERRAMIENTA - 0.25, HERRAMIENTA + 0.1) * fin;
  if (sb > 0) { tallaColor(sb, t); simbolo(TALLA.cx, TALLA.cy - 44, 0.9 + sb * 0.3, hex('#8a2a1a'), hex('#e8c040')); }
  // en «planted on purpose», una raíz de oro baja del pie de la talla (por la derecha de Paul, sin taparlo) hasta una
  // semilla grande, a medio enterrar en la arena, con el símbolo de la Bene Gesserit; la semilla late
  const rz = tramo(t, APROPOSITO - 0.3, APROPOSITO + 0.5) * fin;
  if (rz > 0) { const P0 = [174, 133], P1 = [192, 136], P2 = [197, 150], n = 40, m = ri(rz * n);
    for (let i = 0; i <= m; i++) { const u = i / n, x = (1 - u) ** 2 * P0[0] + 2 * u * (1 - u) * P1[0] + u * u * P2[0] + Math.sin(i * 0.7) * 0.6, y = (1 - u) ** 2 * P0[1] + 2 * u * (1 - u) * P1[1] + u * u * P2[1];
      R.pset(ri(x), ri(y) - 1, K); R.pset(ri(x), ri(y), ORO2[2]); R.pset(ri(x), ri(y) + 1, ORO2[1]); R.pset(ri(x) + 1, ri(y) + 1, K);
      if (i % 9 === 4 && i < 34) { R.pset(ri(x) - 1, ri(y) + 2, ORO2[2]); R.pset(ri(x) - 2, ri(y) + 3, ORO2[1]); }
      if (i === m && rz < 1) R.pset(ri(x), ri(y), hex('#ffffff')); }
    const g = ease(tramo(rz, 0.8, 1)); if (g > 0) semillaBG(197, 163, g, t); }
  const r = AT.atom(R, 252, 176, t, { s: 2, pose: t > HERRAMIENTA - 0.3 && t < APROPOSITO + 0.7 ? 'senala' : t > MESIAS - 0.3 && t < MESIAS + 0.6 ? 'brazos' : 'quieto', dir: -1, cara: t > APROPOSITO + 0.5 ? 'guino' : t > HERRAMIENTA ? 'sorpresa' : 'normal', habla: habla(t) });
  { const p = t * 2.4; grano(r.centro[0] + Math.cos(p) * 22, r.centro[1] + Math.sin(p) * 8, t, 1.2); }
};

const efectos = [[0.05, 'tapestop'], [NOTICE + 0.1, 'pop'], [LLAVEW, 'brillo'], [DESIERTOW, 'pop'], [Q2 + 0.1, 'papel'], [PLANTA, 'pop'], [SIGLOS, 'tic'],
  [DISPERSA, 'whoosh'], [AYUDA, 'pop'], [CIELOW, 'brillo'], [MESIAS, 'brillo'], [APROPOSITO, 'pop'], [E.duracion - 0.3, 'interruptor']];
T.rodar(E, R, [[0, q1], [Q2, q2], [Q3, q3], [Q4, q4]], { efectos, año: 12 });
'''

E['pa-profecia'] = ('La profecía', CAB_PROFECIA, COMUN + MURAL + r'''
const PERG = pal(['#6a4a26', '#9a7642', '#c49c5c', '#dcbc7c', '#eed4a0', '#f6e6c0']);
''' + CUERPO_PROFECIA)
