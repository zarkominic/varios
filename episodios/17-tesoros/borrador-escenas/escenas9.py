E = {}

# ayudas comunes a las dos escenas (cada escena es un .html suelto: se copian en cada cuerpo)
AY = r'''
const K = T.C.k, BL = hex('#ffffff');
const hh = (x, y, s) => { let n = (x * 374761393 + y * 668265263 + s * 982451653) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const mez = (p, q, u) => { let r = 0; for (const s of [0, 8, 16]) { const ca = (p >>> s) & 255, cb = (q >>> s) & 255; r += Math.round(ca + (cb - ca) * u) * (1 << s); } return (0xff000000 + r) >>> 0; };
// rampa con tramado: v 0–(n-1) con decimales
const tono = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > (((x & 1) * 2 + (y & 1) * 3) % 4 + 0.5) / 4) l++; return ramp[Math.max(0, Math.min(ramp.length - 1, l))]; };
const rampa = (...cs) => cs.map(hex);
// resplandor: mezcla un disco con un color, en escalones (pixel art), más fuerte en el centro
const luz = (cx, cy, r, col, a) => { cx = Math.round(cx); cy = Math.round(cy);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d >= 1) continue; const x = cx + i, y = cy + j; if (x < 0 || y < 0 || x > 319 || y > 179) continue;
    const lv = a * (1 - d) ** 1.3 * 6; let l = Math.floor(lv); if (lv - l > (((x & 1) * 2 + (y & 1) * 3) % 4 + 0.5) / 4) l++; if (l <= 0) continue; R.pset(x, y, mez(R.pget(x, y), col, Math.min(0.85, l / 6))); } };
// el bocadillo redondeado con su rabito (x, y: la punta del rabito); devuelve el centro
const bocadillo = (x, y, w = 10, h = 18) => { x = Math.round(x); y = Math.round(y); const x0 = x - w, x1 = x + w, y1 = y - 4, y0 = y1 - h;
  R.rect(x0 + 1, y0, x1 - 1, y1, K); R.rect(x0, y0 + 1, x1, y1 - 1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, BL); R.rect(x0 + 2, y1 - 1, x1 - 1, y1 - 1, hex('#d0d0dc'));
  for (let k = 0; k < 4; k++) { R.pset(x - 1 + (k >> 1), y1 + k, K); R.pset(x + (k >> 1), y1 + k, k < 3 ? BL : K); R.pset(x + 1 + (k >> 1), y1 + k, K); }
  return [x, Math.round((y0 + y1) / 2)]; };
const globo = (x, y, ic, col = K) => { const [cx, cy] = bocadillo(x, y); R.icono(ic, cx - 5, cy - 7, col, hex('#c8c8d0'), 2); };
// anillo de chispas que se abre (u 0–1)
const destello = (x, y, u, r0 = 4, r1 = 18, c = hex('#fff2b0')) => { if (u <= 0 || u >= 1) return; const r = r0 + (r1 - r0) * u;
  for (let k = 0; k < 16; k++) { if ((k + Math.floor(u * 5)) % 3 === 0) continue; const a = k / 16 * Math.PI * 2; R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r * 0.85), u < 0.6 ? c : hex('#e8c060')); } };
// una estrellita de brillo (cruz de 5 px)
const chispa = (x, y, c = hex('#fff6c8')) => { x = Math.round(x); y = Math.round(y); R.pset(x, y, BL); for (const [i, j] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(x + i, y + j, c); R.pset(x + 2, y, hex('#e8c060')); R.pset(x - 2, y, hex('#e8c060')); R.pset(x, y + 2, hex('#e8c060')); R.pset(x, y - 2, hex('#e8c060')); };
// el sombrero vaquero de Fenn como pictograma (cx, cy: el centro), para bocadillos y el mapa
const sombrero = (cx, cy, s = 1) => { cx = Math.round(cx); cy = Math.round(cy); const A = hex('#7a5a3a'), AL = hex('#a8804c'), AS = hex('#4a321e');
  R.rect(cx - 7 * s, cy + 1 * s, cx + 7 * s, cy + 3 * s, K); R.rect(cx - 6 * s, cy + 2 * s - (s > 1 ? 1 : 0), cx + 6 * s, cy + 2 * s, A);
  R.rect(cx - 4 * s, cy - 4 * s, cx + 4 * s, cy + 1 * s, K); R.rect(cx - 3 * s, cy - 3 * s, cx + 3 * s, cy + 1 * s, A); R.rect(cx - 3 * s, cy - 3 * s, cx - 2 * s, cy, AL);
  R.rect(cx - 3 * s, cy, cx + 3 * s, cy, AS); R.pset(cx, cy - 3 * s, AS); R.rect(cx - 7 * s, cy + 1 * s, cx - 6 * s, cy + 1 * s, AL); R.rect(cx + 6 * s, cy + 1 * s, cx + 7 * s, cy + 1 * s, AL); };
// recorre una polilínea por su largo (u 0–1): devuelve [x, y, dx]
const por = (pts, u) => { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let r = Math.max(0, Math.min(1, u)) * tot; for (let i = 0; i < L.length; i++) { if (r <= L[i] || i === L.length - 1) { const f = L[i] ? Math.min(1, r / L[i]) : 0, A = pts[i], B = pts[i + 1]; return [A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, B[0] - A[0]]; } r -= L[i]; }
  return [...pts[pts.length - 1], 0]; };
// un personaje sentado en un escalón, de perfil (x: borde izquierdo del sprite; yA: la cara de arriba del escalón). El
// cuerpo de la cintura arriba es el del actor (recortado en la cadera); el muslo sale hacia delante sobre el escalón y la
// pierna cuelga por su cara, con la bota. Devuelve lo que devuelve R.actor.
const sentado = (def, x, yA, t, o = {}) => { const d = o.piernas ?? o.dir ?? 1, F = hex(o.pierna ?? '#7a6a4a'), f = hex(o.piernaS ?? '#5a4e34'), G = hex(o.bota ?? '#3a2618');
  R.recorte([0, 0, 319, yA]); const r = R.actor(def, x, yA + 6, t, o); R.recorte(null);
  const X = (i) => (d > 0 ? x + i : x + 14 - i), rr = (i0, y0, i1, y1, c) => R.rect(Math.min(X(i0), X(i1)), y0, Math.max(X(i0), X(i1)), y1, c);
  for (const [o2, c, cs] of [[-2, f, f], [0, F, f]]) { const q = (i) => i + o2;
    rr(q(3), yA, q(16), yA + 3, K); rr(q(4), yA + 1, q(15), yA + 2, c); rr(q(4), yA + 2, q(15), yA + 2, cs);
    rr(q(12), yA + 3, q(16), yA + 8, K); rr(q(13), yA + 3, q(15), yA + 7, c); rr(q(15), yA + 3, q(15), yA + 7, cs);
    rr(q(12), yA + 7, q(19), yA + 10, K); rr(q(13), yA + 8, q(18), yA + 9, G); rr(q(13), yA + 8, q(15), yA + 8, mez(G, BL, 0.25)); }
  return r; };
'''

# ══════════════════════════════════════════════════════════════════════════════════════
E['te-encontrado'] = ('Encontrado', '''// TE-ENCONTRADO (frases 55–56), 2020. Tres planos:
// 1. «hoy rocosas, cámara rocas»: el buscador entra barriendo con el detector, que pita cada vez más; junto al hueco, el
//    estudiante mete la mano y, en «found», saca el cofre de bronce y lo alza; el detector se vuelve loco («!»)… y el
//    bocadillo del estudiante enseña el sombrero de Fenn: ya tiene dueño (gag 8); el buscador se desinfla. Corta en «set».
// 2. el mapa del Oeste: chincheta en Wyoming, el coche con el cofre en la baca baja por la ruta punteada (Casper,
//    Denver) hasta Santa Fe en el mismo día; en «Fenn» cae la chincheta y sale el sombrero. Corta en «treasure».
// 3. fondo local: el portal de adobe de Fenn en Santa Fe (vigas, ristras de chiles, ventana turquesa con el gato,
//    puerta azul, mesa con manta, el colibrí en el bebedero, una lagartija): Fenn abre el cofre, que brilla; el
//    estudiante llega y se dan la mano en «know for sure»; en «real» el cofre destella; Fenn explica y en «found» el
//    estudiante salta de alegría.''', AY + r'''
const a = (f) => en('encontrado', f), b = (f) => en('unico', f);
const P2 = a(0.632), P3 = b(0.097);
const hallado = a(0.374), dueno = a(0.52), sale = a(0.6), fenn = a(0.933);
const abre = b(0.16), conoce = b(0.33), real = b(0.483), hombre = b(0.675), hallar = b(0.907);

// ── 1 · las rocas: el detector pita por fin por algo de verdad… y el cofre ya tiene dueño (gag 8) ──
const p1 = (t) => {
  const G = T.hoy(R, t, { encuadre: 'rocosas', camara: 'rocas', cofre: tramo(t, 0.4, hallado) }), S = G.suelo, [hx, hy] = G.hueco;
  // el estudiante, junto al hueco: mira, mete la mano, saca el cofre, lo alza y se lo lleva
  const ex = 202, saca = tramo(t, hallado - 0.05, hallado + 0.4), arriba = t > hallado + 0.45 && t < sale, va = tramo(t, sale, P2 + 0.4);
  const sx = Math.round(ex + va * 70);
  if (t < hallado - 0.05) {
    T.cofre(R, hx, hy, t, { bronce: true, s: 1.3 });
    R.actor(EL.estudiante, ex, S, t, { dir: 1, sostiene: t > hallado - 1.5 ? [hx - 8, hy - 5] : undefined, dedo: t > 0.5 && t < hallado - 1.6, sorpresa: t > hallado - 0.6 });
  } else if (!arriba && t < sale) {
    const cx = Math.round(lerp(hx, ex + 26, saca)), cy = Math.round(lerp(hy, S - 14, saca));
    T.cofre(R, cx, cy, t, { bronce: true, s: 1.3, brillo: saca });
    R.actor(EL.estudiante, ex, S, t, { dir: 1, sostiene: [cx - 8, cy - 6], sonrisa: true });
  } else if (arriba) {
    // con el cofre en alto, sobre la cabeza, y un saltito
    const sal = Math.round(Math.abs(Math.sin((t - hallado) * 7)) * 2 * (t < dueno + 0.3 ? 1 : 0));
    R.actor(EL.estudiante, ex, S, t, { dir: -1, brazos: true, sonrisa: true, salto: sal });
    T.cofre(R, ex + 7, S - 25 - sal, t, { bronce: true, s: 1.3, brillo: 0.6 + 0.4 * Math.sin(t * 6) });
    if (Math.floor(t * 6) % 2) chispa(ex + 1, S - 40 - sal); else chispa(ex + 15, S - 36 - sal);
  } else {
    const r = R.actor(EL.estudiante, sx, S, t, { dir: 1, anda: va > 0 && va < 1, sostiene: [sx + 20, S - 12], sonrisa: true });
    T.cofre(R, r.mano[0] + 7, r.mano[1] + 7, t, { bronce: true, s: 1.3, brillo: 0.3 });
  }
  // el bocadillo del estudiante: el sombrero de Fenn (ya tiene dueño)
  if (t > dueno && t < P2 - 0.15) { const u = tramo(t, dueno, dueno + 0.15); const [cx, cy] = bocadillo(ex - 16, S - 34, Math.round(12 * u) || 1, Math.round(16 * u) || 1); if (u >= 1) sombrero(cx, cy + 1); }
  // el buscador entra barriendo; el detector pita cada vez más y se desinfla cuando ve el bocadillo
  const u = tramo(t, 0.1, 2.6), bx = Math.round(lerp(-16, 98, 1 - (1 - u) ** 1.5));
  const pita = Math.min(1, 0.15 + tramo(t, 0.5, hallado) * 0.85) * (1 - 0.9 * tramo(t, dueno + 0.3, dueno + 0.9));
  const sorp = t > hallado + 0.15 && t < dueno + 0.4, triste = t > dueno + 0.45;
  const baja = tramo(t, dueno + 0.4, dueno + 0.9);
  const ba = R.actor(EL.buscador, bx, S, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [bx + 15, S - 12 + Math.round(baja * 3)], sorpresa: sorp, triste });
  T.detector(R, ba.mano[0], ba.mano[1], t, { dir: 1, suelo: S, barre: u < 1 ? 1 : 0.25 * (1 - baja), pita, largo: 20 - Math.round(baja * 4) });
  if (t > hallado + 0.2 && t < dueno + 0.2) globo(bx + 8, S - 27, '!', hex('#c8303a'));
  if (t > dueno + 0.7 && t < P2 - 0.1) { R.pset(bx + 4, S - 29, hex('#9ab8e0')); R.pset(bx + 4, S - 28, hex('#5a8ac8')); }   // una gotita de sudor
};

// ── 2 · el mapa: de Wyoming a Santa Fe en el mismo día ──
const RUTA = [[-110.4, 44.4], [-108.6, 43.1], [-106.3, 42.85], [-104.8, 41.1], [-104.99, 39.74], [-104.6, 38.25], [-104.5, 37.17], [-105.2, 36.3], [-105.94, 35.69]];
const coche = (x, y, d, t) => { x = Math.round(x); y = Math.round(y); const X = (i) => x + d * i, Cc = hex('#c8503a'), CS = hex('#8a3424'), CL = hex('#e8805a');
  // la sombra, la carrocería, la ventanilla, las ruedas y el cofre en la baca
  for (let i = -6; i <= 7; i++) R.pset(X(i), y + 4, hex('#3a2a1a'));
  R.rect(Math.min(X(-7), X(7)), y - 2, Math.max(X(-7), X(7)), y + 2, K); R.rect(Math.min(X(-6), X(6)), y - 1, Math.max(X(-6), X(6)), y + 1, Cc); R.rect(Math.min(X(-6), X(6)), y + 1, Math.max(X(-6), X(6)), y + 1, CS);
  R.rect(Math.min(X(-4), X(3)), y - 5, Math.max(X(-4), X(3)), y - 2, K); R.rect(Math.min(X(-3), X(2)), y - 4, Math.max(X(-3), X(2)), y - 2, hex('#9ad0e8')); R.pset(X(-1), y - 4, CL); R.pset(X(-1), y - 3, CL); R.pset(X(-3), y - 4, BL);
  R.pset(X(6), y - 1, hex('#fff2a0'));
  const g = Math.floor(t * 8) % 2; for (const w of [-4, 4]) { R.rect(X(w) - 1, y + 2, X(w) + 1, y + 3, K); R.pset(X(w), y + 2, g ? hex('#8a8a94') : K); }
  R.rect(Math.min(X(-3), X(1)), y - 9, Math.max(X(-3), X(1)), y - 6, K); R.rect(Math.min(X(-2), X(0)), y - 8, Math.max(X(-2), X(0)), y - 7, hex('#d8b468')); R.pset(X(-1), y - 8, hex('#f0d898')); R.pset(X(-1), y - 6, hex('#4a7a62')); };
// las Rocosas grabadas en el papel: una cordillera de picos con su sombra, del norte al sur, al oeste de la ruta
const SIERRA = [[-114.5, 48.6], [-113.2, 46.6], [-111.3, 45.4], [-110.0, 43.6], [-109.0, 42.6], [-107.2, 41.2], [-106.4, 39.9], [-106.2, 38.6], [-106.6, 37.4], [-106.4, 36.4]];
const montes = (P, t) => { const pts = SIERRA.map((p) => P(p));
  for (let k = 0; k <= 26; k++) { const [x, y] = por(pts, k / 26), cx = Math.round(x + (k % 2 ? 5 : -4)), cy = Math.round(y + (k % 3) * 2), hgt = 5 + (k % 3) * 2;
    if (cx < 24 || cx > 296 || cy < 38 || cy > 166) continue;
    for (let j = 0; j <= hgt; j++) { const w = Math.round(j * 0.8); for (let i = -w; i <= w; i++) R.pset(cx + i, cy - hgt + j, j === hgt ? hex('#6a5a3a') : i < 0 ? hex('#e8dcc0') : hex('#b8a47c')); R.pset(cx - w - 1, cy - hgt + j, hex('#6a5a3a')); R.pset(cx + w + 1, cy - hgt + j, hex('#6a5a3a')); }
    if (hgt > 6) { R.pset(cx, cy - hgt + 1, BL); R.pset(cx - 1, cy - hgt + 2, BL); } } };
const p2 = (t) => {
  const P = T.mapa(R, t, { zoom: 1.8, centro: [-108.5, 39.6] });
  montes(P, t);
  const pts = RUTA.map((p) => P(p)), [wx, wy] = pts[0], [fx, fy] = pts[pts.length - 1];
  const v = tramo(t, P2 + 0.55, fenn - 0.1), ve = v * v * (3 - 2 * v);
  // la ruta punteada que va quedando detrás del coche
  for (let k = 0; k <= 200; k++) { const u = k / 200; if (u > ve) break; const [x, y] = por(pts, u); if (k % 4 < 2) { R.rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y) + 1, hex('#c8302a')); R.rect(Math.round(x), Math.round(y) + 2, Math.round(x) + 1, Math.round(y) + 2, hex('#5a1a14')); } }
  // las dos chinchetas: Wyoming (al empezar) y Santa Fe (en «Fenn»)
  T.chincheta(R, Math.round(wx), Math.round(wy), t, undefined, { baja: tramo(t, P2 + 0.05, P2 + 0.45) });
  if (v <= 0) { T.cofre(R, Math.round(wx) - 12, Math.round(wy) + 3, t, { bronce: true, s: 1, brillo: 0.5 }); }
  const fb = tramo(t, fenn - 0.25, fenn + 0.15); if (fb > 0) T.chincheta(R, Math.round(fx), Math.round(fy), t, hex('#2a6ac8'), { baja: fb });
  // el sol que cruza: sale por Wyoming y se pone en Santa Fe (el mismo día)
  { const s = tramo(t, P2 + 0.3, fenn + 0.6), sx = Math.round(lerp(292, 196, s)), sy = Math.round(150 - Math.sin(s * Math.PI) * 96);
    if (s > 0 && s < 1) { const c = s < 0.75 ? hex('#f8c838') : hex('#f08838'); luz(sx, sy, 9, hex('#fff0a0'), 0.35); R.disco(sx, sy, 4, K); R.disco(sx, sy, 3, c); R.pset(sx - 1, sy - 1, hex('#fff8d0'));
      for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2 + t; R.pset(Math.round(sx + Math.cos(an) * 6), Math.round(sy + Math.sin(an) * 6), c); } } }
  // el coche con el cofre, y su polvo
  if (v > 0) { const [x, y, dx] = por(pts, ve), d = dx >= 0 ? 1 : -1;
    for (let k = 1; k <= 4; k++) { const [qx, qy] = por(pts, Math.max(0, ve - k * 0.012)); if (Math.sin(t * 9 + k) > -0.2) R.pset(Math.round(qx) - d, Math.round(qy) - 2 - (k >> 1), hex('#d8c8a8')); }
    coche(x, y - 3, d, t); }
  // en Santa Fe: el sombrero de Fenn que asoma, y un destello cuando llega el cofre
  const sm = tramo(t, fenn + 0.1, fenn + 0.4); if (sm > 0) sombrero(fx + 14, fy - 10 - Math.round((1 - sm) * 6), 1);
  destello(fx, fy - 4, tramo(t, fenn + 0.5, fenn + 1.3), 3, 20);
  if (t > fenn + 1.3) { const k = Math.floor(t * 3) % 3; chispa(fx - 10 + k * 3, fy - 16 + (k % 2) * 4); }
};

// ── 3 · el portal de Fenn en Santa Fe (fondo local) ──
const ADOBE = rampa('#8a5236', '#a8683e', '#c08250', '#d49a64', '#e4b47c', '#f0c894');
const ZOCLO = rampa('#6a2e1e', '#8a3e26', '#a8502e', '#c0643a');
const MAD = rampa('#2e1c10', '#4a2e1a', '#6a4426', '#8a5c34', '#a87a48');
const LOSA = rampa('#6a5a48', '#8a7660', '#a89478', '#c4b094', '#dccaa8');
let BP = null;
const portalFijo = () => {
  const b = R.nuevo(), prev = R.usar(b), { pset, rect, disco, linea } = R;
  // la pared de adobe: revoco ondulado con paja, manchas, grietas, y la luz que entra de la izquierda
  for (let y = 0; y < 152; y++) for (let x = 0; x < 320; x++) {
    let v = 3.1 + Math.sin(x * 0.09 + y * 0.05) * 0.25 + (hh(x >> 3, y >> 3, 3) - 0.5) * 0.7 + (hh(x, y, 4) - 0.5) * 0.5 - y / 152 * 0.6;
    if (hh(x >> 1, y >> 1, 5) < 0.03) v += 0.9; if (hh(x, y, 6) < 0.02) v -= 1;
    // las sombras de las vigas, en diagonal
    if (y > 24 && ((x - y * 0.55 + 400) % 44) < 9 && y < 140) v -= 0.9;
    pset(x, y, tono(ADOBE, v, x, y)); }
  // grietas finas
  for (const [x0, y0, n] of [[22, 30, 14], [128, 112, 12], [270, 96, 16], [196, 34, 10]]) { let x = x0, y = y0; for (let j = 0; j < n; j++) { pset(x, y, ADOBE[0]); pset(x + 1, y, ADOBE[1]); y++; if (hh(x, j, 9) < 0.45) x += hh(j, x, 10) < 0.5 ? 1 : -1; } }
  // el zócalo pintado (terracota) con su filo y desconchones
  for (let y = 138; y < 152; y++) for (let x = 0; x < 320; x++) { let v = 2 + (hh(x >> 2, y, 11) - 0.5) * 0.8 - (y - 138) / 14 * 0.6; if (hh(x >> 1, y >> 1, 12) < 0.05) { pset(x, y, ADOBE[3]); continue; } pset(x, y, y === 138 ? ZOCLO[3] : tono(ZOCLO, v, x, y)); }
  // las vigas: sus cabezas redondas, con los anillos y la grieta, y la sombra debajo
  for (let k = 0; k < 7; k++) { const cx = 26 + k * 40, cy = 26; if (cx > 270) continue;
    for (let j = -6; j <= 8; j++) for (let i = -6; i <= 14; i++) { const x = cx + i + 4, y = cy + j + 6; if (y < 152 && hh(x, y, 13) < 0.7) pset(x, y, mez(R.pget(x, y), ADOBE[0], 0.35)); }
    disco(cx, cy, 6, K); disco(cx, cy, 5, MAD[2]); disco(cx - 1, cy - 1, 3, MAD[3]); R.anillo(cx, cy, 3, MAD[1]); pset(cx, cy, MAD[1]); pset(cx - 3, cy - 3, MAD[4]); linea(cx + 1, cy - 4, cx + 3, cy, MAD[0]); }
  // la ventana honda con marco turquesa (x 26–78, y 50–104): el derrame del muro, el marco, la repisa
  rect(24, 48, 80, 108, ADOBE[1]); rect(26, 50, 78, 106, ADOBE[4]); for (let y = 50; y < 106; y++) pset(26, y, ADOBE[5]);
  rect(30, 54, 74, 102, K); rect(31, 55, 73, 101, hex('#3aa8a0')); rect(31, 55, 73, 56, hex('#6ad0c4')); rect(31, 55, 32, 101, hex('#6ad0c4'));
  rect(34, 58, 50, 77, K); rect(54, 58, 70, 77, K); rect(34, 80, 50, 99, K); rect(54, 80, 70, 99, K);
  rect(20, 104, 84, 108, K); rect(21, 104, 83, 106, ADOBE[5]); rect(21, 107, 83, 107, ADOBE[1]);
  // la maceta de geranios en la repisa
  rect(36, 96, 46, 104, K); rect(37, 97, 45, 103, ZOCLO[2]); rect(37, 97, 45, 98, ZOCLO[3]);
  for (let k = 0; k < 12; k++) { const x = 34 + Math.round(hh(k, 1, 20) * 14), y = 86 + Math.round(hh(k, 2, 20) * 9); disco(x, y, 2, k % 3 ? hex('#3a7a3a') : hex('#5a9a4a')); }
  for (let k = 0; k < 5; k++) { const x = 35 + Math.round(hh(k, 3, 21) * 12), y = 84 + Math.round(hh(k, 4, 21) * 6); disco(x, y, 1, hex('#e83a4a')); pset(x, y, hex('#ff8a8a')); }
  // el farol de hojalata picada, colgado junto a la puerta
  linea(118, 34, 118, 42, K); rect(113, 42, 123, 44, K); rect(112, 45, 124, 60, K); rect(113, 45, 123, 59, hex('#8a8a94'));
  for (let y = 47; y < 58; y += 3) for (let x = 115; x < 122; x += 3) pset(x + ((y >> 1) & 1), y, hex('#3a3a46'));
  rect(113, 45, 114, 59, hex('#c8c8d0')); rect(114, 61, 122, 63, K); pset(118, 64, K);
  // la puerta azul tallada (x 150–192, y 52–150): dintel con zapatas, cuarterones, herrajes
  rect(144, 44, 198, 52, K); for (let x = 145; x < 198; x++) for (let y = 45; y < 52; y++) pset(x, y, tono(MAD, 2.4 + (hh(x >> 2, y, 22) - 0.5) + (y === 45 ? 1 : 0), x, y));
  for (const zx of [144, 192]) { rect(zx, 52, zx + 6, 56, K); rect(zx + 1, 52, zx + 5, 55, MAD[2]); }
  rect(148, 52, 194, 152, K); rect(150, 54, 192, 152, MAD[1]);
  const AZ = rampa('#1e3a6a', '#2a5090', '#3a6aa8', '#5a8ac8', '#8ab0e0');
  for (let y = 55; y < 152; y++) for (let x = 151; x < 192; x++) { const borde = x === 171 || x === 170; pset(x, y, borde ? AZ[0] : tono(AZ, 2 + (hh(x, y >> 1, 23) - 0.5) * 0.8 - (x > 171 ? 0.4 : 0), x, y)); }
  for (const [x0, y0, x1, y1] of [[154, 60, 167, 96], [174, 60, 188, 96], [154, 102, 167, 146], [174, 102, 188, 146]]) {
    rect(x0, y0, x1, y1, AZ[0]); rect(x0 + 1, y0 + 1, x1, y1, AZ[3]); rect(x0 + 2, y0 + 2, x1 - 1, y1 - 1, AZ[2]);
    for (let y = y0 + 5; y < y1 - 3; y += 6) { pset(x0 + 4, y, AZ[1]); pset(x1 - 4, y, AZ[1]); pset((x0 + x1) >> 1, y + 3, AZ[4]); } }
  for (const y of [70, 128]) { rect(150, y, 162, y + 2, K); rect(151, y, 161, y + 1, hex('#3a3a3a')); disco(160, y + 1, 1, hex('#5a5a5a')); }
  rect(176, 98, 178, 106, K); disco(177, 100, 2, K); pset(177, 100, hex('#8a8a8a'));
  // el nicho con su vasija (sobre la mesa)
  for (let y = 66; y < 92; y++) for (let x = 278; x < 302; x++) { const dx = (x - 290) / 12, top = 66 + Math.round(12 - Math.sqrt(Math.max(0, 1 - dx * dx)) * 12); if (y < top) continue; pset(x, y, y === top || x === 278 ? ADOBE[0] : x > 296 ? ADOBE[3] : ADOBE[1]); }
  rect(276, 92, 304, 94, ADOBE[5]); rect(276, 95, 304, 95, ADOBE[0]);
  disco(290, 84, 6, K); disco(290, 84, 5, hex('#c87a4a')); rect(286, 77, 294, 78, K); rect(287, 76, 293, 76, hex('#a85a34'));
  for (let x = 285; x < 296; x++) if ((x >> 1) % 2) pset(x, 84, K); for (let x = 285; x < 296; x++) if ((x >> 1) % 2 === 0) pset(x, 86, hex('#f0e0c0'));
  pset(287, 81, hex('#f0b080')); pset(288, 81, hex('#f0b080'));
  // la mesa de madera (x 198–280, tablero y 136) con la manta de rayas que cuelga por delante
  rect(198, 134, 282, 138, K); for (let x = 199; x < 282; x++) { pset(x, 135, MAD[4]); pset(x, 136, MAD[3]); pset(x, 137, MAD[2]); }
  for (const lx of [202, 274]) { rect(lx, 139, lx + 5, 162, K); for (let y = 139; y < 162; y++) for (let x = lx + 1; x < lx + 5; x++) pset(x, y, tono(MAD, 2.2 + (x === lx + 1 ? 0.8 : 0) - (y - 139) / 30, x, y)); }
  const MANTA = [hex('#e8dcc0'), hex('#c8303a'), hex('#1c1c24'), hex('#e8dcc0'), hex('#3a6aa8'), hex('#c8303a')];
  for (let y = 138; y < 156; y++) for (let x = 214; x < 268; x++) { const fr = Math.floor((y - 138) / 3), dx = Math.abs(x - 241); let c = MANTA[fr % MANTA.length]; if ((y - 138) % 3 === 1 && (dx + (y >> 1)) % 6 < 2) c = hex('#e8b830'); if (y === 155 && x % 2) c = hex('#e8dcc0'); pset(x, y, c); }
  for (let y = 138; y < 156; y++) { pset(213, y, K); pset(268, y, K); } for (let x = 213; x < 269; x++) pset(x, 156, x % 2 ? K : hex('#c8b890'));
  // el suelo de losas irregulares (y 152–180), con sus juntas, y la luz de la tarde
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) {
    const rx = (x + (Math.floor(y / 9) % 2) * 17) % 34, ry = (y - 152) % 9;
    const junta = rx === 0 || ry === 0 || (hh(Math.floor((x + (Math.floor(y / 9) % 2) * 17) / 34), Math.floor(y / 9), 30) < 0.3 && rx === 17);
    let v = 2.2 + (hh(Math.floor((x + (Math.floor(y / 9) % 2) * 17) / 34), Math.floor(y / 9), 31) - 0.5) * 1.1 + (hh(x, y, 32) - 0.5) * 0.5 + (y - 152) / 28 * 0.4;
    if (((x - (y - 152) * 1.4 + 300) % 260) > 150) v -= 0.6;
    pset(x, y, junta ? LOSA[0] : tono(LOSA, v, x, y)); }
  for (let x = 0; x < 320; x++) { pset(x, 152, ADOBE[0]); pset(x, 153, mez(R.pget(x, 153), K, 0.35)); }
  // la sombra de la mesa en el suelo
  for (let y = 162; y < 168; y++) for (let x = 200 + (y - 162); x < 286 + (y - 162); x++) if ((x + y) % 2) pset(x, y, mez(R.pget(x, y), K, 0.3));
  // la alfombra de rayas bajo los dos (x 40–196, y 160–176)
  for (let y = 162; y < 176; y++) for (let x = 44 + (176 - y) / 2; x < 196 - (176 - y) / 2; x++) { const xi = Math.round(x), fr = Math.floor((xi - 44) / 6); let c = [hex('#a8402e'), hex('#e8d0a0'), hex('#2a3a5a'), hex('#e8d0a0'), hex('#c87a3a')][fr % 5]; if (y === 162 || y === 175) c = hex('#6a2a1e'); if ((xi + y) % 7 === 0) c = mez(c, K, 0.2); pset(xi, y, c); }
  // la olla grande con el agave, delante a la derecha (x 284–318)
  for (let y = 140; y < 180; y++) for (let x = 282; x < 320; x++) { const dy = (y - 162) / 20, w = 16 * Math.sqrt(Math.max(0, 1 - dy * dy)) + 2; if (Math.abs(x - 301) > w) continue; const e = Math.abs(x - 301) > w - 1; pset(x, y, e ? K : tono(rampa('#6a2e1a', '#8a4226', '#a85a32', '#c87a4a'), 2.4 - (x - 290) / 14 + (y > 156 && y < 160 ? -1 : 0), x, y)); }
  for (let x = 286; x < 317; x++) if (x % 4 < 2) pset(x, 157, hex('#2a1a12'));
  for (let k = 0; k < 9; k++) { const an = -Math.PI / 2 + (k - 4) * 0.32, L = 18 + (k % 3) * 6; for (let i = 0; i < L; i++) { const x = Math.round(301 + Math.cos(an) * i), y = Math.round(142 + Math.sin(an) * i * 0.9); if (y < 46) break; pset(x, y, i < L - 3 ? hex('#4a7a5a') : hex('#8ab090')); pset(x + 1, y, i < L * 0.6 ? hex('#2a5a3a') : hex('#4a7a5a')); } }
  // el poste del portal, delante a la izquierda, con su zapata
  for (let y = 0; y < 180; y++) for (let x = 0; x < 12; x++) pset(x, y, x === 11 ? K : tono(MAD, 2.2 + (x < 4 ? 1 : 0) - (x > 8 ? 0.8 : 0) + (hh(x, y >> 2, 40) - 0.5) * 0.6, x, y));
  rect(0, 10, 22, 18, K); rect(0, 11, 21, 16, MAD[2]); rect(0, 11, 21, 11, MAD[4]); rect(12, 17, 18, 20, K); rect(12, 17, 17, 19, MAD[1]);
  R.usar(prev); return b; };
const ristra = (x0, y0, n, t, k) => { // la ristra de chiles que se mece colgada de la viga
  const sw = Math.sin(t * 1.4 + k) * 1.5; R.linea(x0, y0 - 4, x0, y0, hex('#c8b890'));
  for (let i = 0; i < n; i++) { const y = y0 + i * 3, x = Math.round(x0 + sw * i / n);
    for (const s of [-1, 1, 0]) { const cx = x + s * 3 + (i % 2 ? s : 0), cy = y + (s === 0 ? 1 : 0); R.rect(cx - 1, cy, cx + 1, cy + 5, K); R.rect(cx, cy + 1, cx, cy + 4, (i + s) % 3 ? hex('#c8202a') : hex('#e83a2a')); R.pset(cx, cy + 1, hex('#ff7a6a')); R.pset(cx, cy, hex('#3a7a3a')); } }
  const yb = y0 + n * 3 + 2, xb = Math.round(x0 + sw); R.rect(xb - 1, yb, xb + 1, yb + 3, K); R.pset(xb, yb + 1, hex('#a81a20')); };
const p3 = (t) => {
  if (!BP) BP = portalFijo(); R.copiar(BP);
  // por la ventana: el cielo de la tarde, la mesa lejana y nubes que pasan (recortado a los cristales)
  for (const [x0, y0, x1, y1] of [[35, 59, 49, 76], [55, 59, 69, 76], [35, 81, 49, 98], [55, 81, 69, 98]]) {
    R.recorte([x0, y0, x1, y1]);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let c = y < 70 ? hex('#7ab8e8') : y < 84 ? hex('#a8d0f0') : hex('#e8d0a8'); if (y >= 84 && y > 86 + Math.sin(x * 0.3) * 2) c = (x + y) % 3 ? hex('#c88a5a') : hex('#a86a44'); if (y >= 92) c = (x * 7 + y) % 5 ? hex('#8a9a5a') : hex('#6a7a44'); R.pset(x, y, c); }
    for (let k = 0; k < 3; k++) { const cx = ((t * (3 + k * 2) + k * 30) % 70) + 22, cy = 62 + k * 7; for (let i = -6; i <= 6; i++) for (let j = -2; j <= 2; j++) if (i * i / 36 + j * j / 4 < 1) R.pset(Math.round(cx + i), cy + j, j < 0 ? BL : hex('#d8e4f0')); }
    R.recorte(null); }
  for (const [x0, y0, x1, y1] of [[35, 59, 49, 76], [55, 59, 69, 76]]) { R.pset(x0 + 2, y0 + 2, BL); R.pset(x0 + 3, y0 + 2, BL); R.pset(x0 + 2, y0 + 3, BL); }
  // el gato dormido en la repisa, con la cola que se mueve
  { const gx = 58, gy = 103; R.disco(gx + 6, gy - 3, 4, K); R.rect(gx, gy - 5, gx + 12, gy, K); R.rect(gx + 1, gy - 4, gx + 11, gy, hex('#4a4a52')); R.disco(gx + 6, gy - 3, 3, hex('#4a4a52')); R.rect(gx + 2, gy - 4, gx + 8, gy - 4, hex('#6a6a74'));
    R.pset(gx + 9, gy - 7, K); R.pset(gx + 11, gy - 7, K); R.rect(gx + 9, gy - 6, gx + 12, gy - 3, K); R.rect(gx + 10, gy - 5, gx + 11, gy - 3, hex('#4a4a52')); R.pset(gx + 10, gy - 4, hex('#2a2a30'));
    const c = Math.sin(t * 2.2) * 2; for (let i = 0; i < 6; i++) R.pset(gx - i, gy - 1 + Math.round(i > 2 ? c * (i - 2) / 3 : 0), i % 2 ? hex('#4a4a52') : K); }
  // las dos ristras de chiles, el bebedero del colibrí y el colibrí que va y viene
  ristra(66, 34, 11, t, 0); ristra(106, 34, 9, t, 1.7); ristra(212, 34, 9, t, 3.1);
  { const fx = 252, fy = 70; R.linea(fx, 33, fx, fy - 8, hex('#3a3a46')); R.rect(fx - 3, fy - 8, fx + 3, fy + 2, K); R.rect(fx - 2, fy - 7, fx + 2, fy + 1, hex('#d84a5a')); R.rect(fx - 2, fy - 7, fx - 2, fy + 1, hex('#ff9aa8')); R.rect(fx - 5, fy + 2, fx + 5, fy + 4, K); R.rect(fx - 4, fy + 3, fx + 4, fy + 3, hex('#e8b830'));
    const ph = (t * 0.45) % 1, en0 = ph < 0.5, hxp = en0 ? fx - 9 : Math.round(fx - 9 - (ph - 0.5) * 60 + Math.sin(ph * 30) * 3), hyp = en0 ? fy + 2 + Math.round(Math.sin(t * 9)) : Math.round(fy - 6 - Math.sin((ph - 0.5) * 6) * 16);
    R.rect(hxp - 2, hyp - 1, hxp + 2, hyp + 1, K); R.rect(hxp - 1, hyp, hxp + 1, hyp, hex('#3a9a6a')); R.pset(hxp + 1, hyp - 1, hex('#c8303a')); R.linea(hxp + 3, hyp, hxp + 5, hyp, K); R.pset(hxp - 3, hyp + 1, K);
    const ala = Math.floor(t * 20) % 2; R.pset(hxp, hyp - 2 - ala, hex('#b8d8c8')); R.pset(hxp - 1, hyp - 2 - ala, hex('#b8d8c8')); }
  // la lagartija que sube por la pared, se para y sigue
  { const u = (t * 0.06) % 1, lx = Math.round(122 + Math.sin(u * 6) * 4), ly = Math.round(130 - u * 60 - (Math.sin(t * 2) > 0.3 ? 0 : 0)); const G2 = hex('#6a7a3a');
    R.linea(lx, ly, lx, ly + 7, K); R.linea(lx + 1, ly, lx + 1, ly + 6, G2); R.pset(lx, ly - 1, K); R.pset(lx + 1, ly - 1, K); const p = Math.floor(t * 4) % 2; R.pset(lx - 1, ly + 1 + p, K); R.pset(lx + 2, ly + 2 - p, K); R.pset(lx - 1, ly + 5 - p, K); R.pset(lx + 2, ly + 4 + p, K); R.pset(lx + (Math.floor(t * 2) % 2), ly + 9, K); }
  // las motas de polvo en la luz
  for (let k = 0; k < 10; k++) { const x = Math.round(40 + hh(k, 1, 50) * 140 + Math.sin(t * 0.5 + k) * 6), y = Math.round(40 + hh(k, 2, 50) * 90 + Math.sin(t * 0.4 + k * 2) * 5); if (Math.sin(t * 1.6 + k) > 0.2) R.pset(x, y, hex('#fff0c8')); }
  const S = 166;
  // el cofre en la mesa: Fenn lo abre y brilla
  const ab = tramo(t, abre - 0.4, abre + 0.5), br = tramo(t, abre, abre + 0.8);
  const cf = T.cofre(R, 226, 136, t, { bronce: true, s: 2, abre: ab, brillo: Math.min(1, br * (0.75 + 0.25 * Math.sin(t * 5))) });
  if (br > 0) { luz(226, 112, 26, hex('#ffe8a0'), 0.25 * br); if (Math.floor(t * 5) % 3 === 0) chispa(214 + (Math.floor(t * 5) * 7) % 26, 100 - (Math.floor(t * 5) * 3) % 10); }
  destello(226, 110, tramo(t, real - 0.1, real + 0.7), 6, 34);
  // Fenn, junto a la mesa: abre el cofre, se vuelve, da la mano, explica, sonríe
  const fxp = 184, vuelto = t > conoce - 0.55;
  const choca = t > conoce - 0.15 && t < hombre - 0.3, sh = choca ? Math.round(Math.sin(t * 18)) : 0;
  const fo = { dir: vuelto ? -1 : 1, sonrisa: t > real - 0.3, habla: t > hombre - 0.4 && t < hallar - 0.3 && Math.sin(t * 7) > 0, dedo: t > hombre && t < hallar - 0.5 };
  if (!vuelto && t < abre + 0.6) fo.sostiene = [fxp + 21, 140];
  if (choca) { delete fo.dedo; fo.sostiene = [176, S - 12 + sh]; }
  R.actor(EL.fenn, fxp, S, t, fo);
  // el estudiante llega con su mochila y le da la mano
  const w = tramo(t, P3 + 0.1, conoce - 0.25), ex = Math.round(lerp(64, 158, 1 - (1 - w) ** 1.4));
  const so = { dir: 1, anda: w > 0 && w < 1, sonrisa: t > conoce - 0.6, salto: Math.round(Math.max(0, Math.sin((t - hallar) * 9)) * 4 * (t > hallar && t < hallar + 0.7 ? 1 : 0)) };
  if (choca) so.sostiene = [176, S - 12 + sh]; else if (t > hallar - 0.15) so.brazos = true;
  // la mochila a la espalda (por detrás del cuerpo)
  R.rect(ex - 3, S - 21, ex + 2, S - 11, K); R.rect(ex - 2, S - 20, ex + 1, S - 12, hex('#e8783a')); R.rect(ex - 2, S - 20, ex - 2, S - 12, hex('#f8a060')); R.rect(ex - 2, S - 15, ex + 1, S - 15, hex('#a84a1a'));
  R.actor(EL.estudiante, ex, S, t, so);
  if (choca) chispa(176, S - 20 - Math.round(tramo(t, conoce - 0.1, conoce + 0.5) * 6));
};
const efectos = [[1.2, 'bip'], [2.5, 'bip'], [hallado + 0.45, 'brillo'], [dueno, 'pop'],
  [P2 + 0.25, 'pop'], [P2 + 0.6, 'coche'], [fenn, 'pop'],
  [abre - 0.2, 'puerta'], [abre + 0.4, 'brillo'], [conoce, 'palmada'], [real, 'brillo'], [hallar, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2020 });
''')

# ══════════════════════════════════════════════════════════════════════════════════════
E['te-cierre'] = ('El tesoro de verdad', '''// TE-CIERRE (frases 57–59), del Temple a hoy. Cuatro planos:
// 1. fondo local (inserto en la mesa de roble del Temple: vela, tintero y pluma, barra de lacre, matriz del sello,
//    reloj de arena, monedas): la mano de manga blanca desliza la carta sellada; brilla en «letter»; en «worth money» se
//    convierte en un billete (con la cruz en el óvalo) de izquierda a derecha; una mano de hoy se lo lleva. Corta en «An».
// 2. «hoy tienda, cámara cerca» (el datáfono): la mano trae el billete, que en «idea» se vuelve tarjeta; en «pay» paga
//    sin contacto (palomita, tique); en «coins» una moneda rueda del platillo y se tumba. Corta en «And».
// 3. «hoy escalón, general», atardecer: el buscador llega con el detector, sube al primer escalón y se sienta; lo deja a
//    su lado; en «step» el detector pita bajito y él lo mira y sonríe; un conejo en el prado. Corta en «There's».
// 4. «hoy escalón, cerca»: sentado frente al sol; el detector pita otra vez; en «find» se vuelve hacia el este (la
//    izquierda), donde sale la primera estrella, y sonríe; en «explain next» señala al este.''', AY + r'''
const a = (f) => en('papel', f), b = (f) => en('escalon', f), c = (f) => en('adios', f);
const P2 = a(0.576), P3 = b(0), P4 = b(0.754);
const carta = a(0.274), vale = a(0.304), sinSer = a(0.437), idea = a(0.59), paga = a(0.796), monedas = a(0.911);
const sube = b(0.18), sienta = b(0.25), paso = b(0.539), este = b(0.631), algo = b(0.81), hallar = b(0.93), sig = c(0.3);

// ── 1 · la mesa del Temple: la carta sellada se vuelve billete ──
const ROBLE = rampa('#2a1a10', '#3e2616', '#56361e', '#6e4828', '#8a5e36', '#a87a4a');
let BM = null;
const mesaFija = () => {
  const bf = R.nuevo(), prev = R.usar(bf), { pset, rect, disco, linea } = R;
  // los tablones con vetas, nudos y juntas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const tb = Math.floor((y + 6) / 34), yy = (y + 6) % 34;
    let v = 2.6 + Math.sin(x * 0.045 + tb * 3 + Math.sin(x * 0.013 + tb) * 3 + yy * 0.25) * 0.7 + (hh(x >> 2, y, 60 + tb) - 0.5) * 0.6 - Math.hypot(x - 170, y - 90) / 260;
    const nx = 60 + tb * 97 % 260, ny = tb * 34 + 14, dn = Math.hypot((x - nx) * 0.7, y - ny); if (dn < 5) v = 0.6 + dn * 0.3; else if (dn < 9) v -= 0.4 * Math.sin(dn * 1.5);
    pset(x, y, yy === 0 ? ROBLE[0] : yy === 1 ? ROBLE[1] : tono(ROBLE, v, x, y)); }
  for (let k = 0; k < 14; k++) { const x = Math.round(hh(k, 1, 61) * 310), y = Math.round(hh(k, 2, 61) * 170); pset(x, y, ROBLE[0]); pset(x + 1, y, ROBLE[0]); }   // clavos
  // el candelero de latón con la vela (x 30–48, la llama se pinta aparte)
  disco(40, 124, 11, K); disco(40, 124, 10, hex('#8a6a24')); disco(39, 123, 8, hex('#c8a040')); disco(37, 121, 3, hex('#f0d878'));
  rect(35, 78, 45, 122, K); rect(36, 78, 44, 121, hex('#f0e4c0')); rect(36, 78, 37, 121, BL); rect(43, 78, 44, 121, hex('#c8b890'));
  for (const [x, y, l] of [[38, 80, 9], [42, 81, 14]]) { rect(x, y, x + 1, y + l, hex('#f8f0d8')); disco(x, y + l, 1, hex('#f8f0d8')); }
  rect(32, 118, 48, 122, K); rect(33, 118, 47, 120, hex('#c8a040'));
  // el tintero con la pluma
  disco(68, 160, 9, K); disco(68, 160, 8, hex('#1c1c2a')); disco(66, 158, 3, hex('#4a4a6a')); rect(63, 148, 73, 152, K); rect(64, 149, 72, 151, hex('#2a2a3a'));
  for (let i = 0; i < 34; i++) { const x = 68 + Math.round(i * 0.55), y = 150 - i; pset(x, y, K); pset(x + 1, y, i > 8 ? hex('#f0ece0') : hex('#c8c0a8')); if (i > 10 && i < 32) { pset(x + 2 + (i % 2), y, hex('#e8e4d8')); pset(x - 1 - ((i >> 1) % 2), y + 1, hex('#d8d4c8')); } }
  // la barra de lacre y la matriz del sello
  for (let i = 0; i < 22; i++) { pset(244 + i, 160 - (i >> 2), K); pset(244 + i, 161 - (i >> 2), hex('#a8303a')); pset(244 + i, 162 - (i >> 2), hex('#c8404a')); pset(244 + i, 163 - (i >> 2), K); }
  disco(262, 128, 8, K); disco(262, 128, 7, hex('#a88a3a')); disco(261, 127, 4, hex('#d8b858')); rect(259, 108, 265, 124, K); rect(260, 108, 264, 124, hex('#5a3418')); rect(260, 108, 261, 124, hex('#8a5428')); disco(262, 107, 4, K); disco(262, 107, 3, hex('#6a4020'));
  // las monedas, un montón y sueltas
  for (let k = 0; k < 6; k++) { const y = 156 - k * 2; for (let i = -6; i <= 6; i++) for (let j = -2; j <= 2; j++) if (i * i / 36 + j * j / 4 <= 1) pset(292 + i, y + j, j === -2 || Math.abs(i) === 6 ? hex('#8a6a1a') : j < 0 ? hex('#f0d060') : hex('#c8a030')); }
  for (const [x, y] of [[276, 168], [306, 172], [228, 150]]) { disco(x, y, 4, hex('#8a6a1a')); disco(x, y, 3, hex('#e8c048')); pset(x - 1, y - 1, hex('#fff0a0')); R.anillo(x, y, 2, hex('#b89028')); }
  // la bolsa de cuero con su cordón, abierta, y las monedas que se salen (arriba, en el centro)
  { const bx = 200, by = 34; for (let y = by - 12; y <= by + 10; y++) for (let x = bx - 14; x <= bx + 14; x++) { const dy = (y - by) / 11, w = 13 * Math.sqrt(Math.max(0, 1 - dy * dy * 0.8)) * (y < by - 6 ? 0.6 : 1); const e = Math.abs(x - bx) - w; if (e > 0) continue; pset(x, y, e > -1 || y === by + 10 ? K : tono(rampa('#4a2a14', '#6a3e1e', '#8a5428', '#a86a34'), 2.2 - (x - bx) / 10 + (hh(x, y, 66) - 0.5) * 0.6, x, y)); }
    rect(bx - 8, by - 7, bx + 8, by - 6, hex('#c8a060')); pset(bx - 9, by - 7, K); pset(bx + 9, by - 6, K); linea(bx + 8, by - 6, bx + 16, by - 2, hex('#c8a060')); linea(bx + 16, by - 2, bx + 18, by + 4, hex('#c8a060'));
    for (const [x, y] of [[bx + 20, by + 6], [bx + 27, by + 9], [bx + 24, by + 14], [bx + 33, by + 12]]) { disco(x, y, 3, hex('#8a6a1a')); disco(x, y, 2, hex('#e8c048')); pset(x - 1, y - 1, hex('#fff0a0')); } }
  // la llave de hierro y la cinta roja
  rect(96, 160, 124, 161, K); disco(92, 160, 4, K); disco(92, 160, 2, ROBLE[3]); rect(118, 162, 120, 165, K); rect(123, 162, 124, 166, K);
  for (let i = 0; i < 40; i++) { const x = 130 + i, y = 168 + Math.round(Math.sin(i * 0.3) * 3); pset(x, y, hex('#a8202a')); pset(x, y + 1, hex('#e84a4a')); }
  R.usar(prev); return bf; };
// la carta sellada (pergamino doblado) y el billete, como funciones de color (para el barrido que convierte una en otro)
const CX0 = 92, CY0 = 48, CX1 = 228, CY1 = 134;
const PERG = rampa('#a8885a', '#c8a878', '#dcc092', '#ead2a6', '#f4e2bc');
const colCarta = (x, y) => { const i = x - CX0, j = y - CY0, W = CX1 - CX0, H = CY1 - CY0;
  if (i === 0 || j === 0 || i === W || j === H) return K;
  let v = 3 + (hh(x >> 1, y >> 1, 70) - 0.5) * 0.8 - (i < 4 || j < 4 || i > W - 4 || j > H - 4 ? 0.9 : 0) + (i - W / 2) / W * -0.4;
  if (i === Math.round(W / 3) || i === Math.round(W * 2 / 3)) v -= 1.1; if (i === Math.round(W / 3) + 1 || i === Math.round(W * 2 / 3) + 1) v += 0.6;
  // los renglones de trazos (sin letras)
  if (j > 10 && j < H - 26 && (j - 10) % 7 === 0 && i > 10 && i < W - 10) { const s = Math.floor((i + j * 3) / 7); if (hh(s, j, 71) > 0.22 && ((i * 5 + j) % 7) > 0) return hex('#4a3420'); }
  return tono(PERG, v, x, y); };
const VERDE = rampa('#4a6a4a', '#6a8a64', '#8aa680', '#aac29c', '#c8dabc', '#e0ecd4');
const BX0 = 92, BY0 = 56, BX1 = 228, BY1 = 126;
const colBillete = (x, y) => { if (y < BY0 || y > BY1) return null; const i = x - BX0, j = y - BY0, W = BX1 - BX0, H = BY1 - BY0;
  if (i === 0 || j === 0 || i === W || j === H) return K;
  const bo = i < 6 || j < 6 || i > W - 6 || j > H - 6;
  if (bo) return ((i + j) % 4 < 2) ? VERDE[1] : VERDE[2];
  if (i === 6 || j === 6 || i === W - 6 || j === H - 6) return VERDE[0];
  // la guilloche: ondas finas en todo el billete
  const g = Math.sin(i * 0.5 + Math.sin(j * 0.35) * 2) + Math.sin(j * 0.6 - i * 0.12);
  let v = 4 + (g > 1.3 ? -1.4 : g < -1.5 ? -0.8 : 0) - (hh(x, y, 72) < 0.05 ? 1 : 0);
  // el óvalo de la izquierda con la roseta
  const ox = (i - 38) / 22, oy = (j - H / 2) / 24, d = ox * ox + oy * oy;
  if (d < 1) { if (d > 0.82) return VERDE[0]; const an = Math.atan2(oy, ox), r = Math.sqrt(d); v = 3.5 + Math.sin(an * 12 + r * 14) * 0.9; }
  return tono(VERDE, v, x, y); };
// la cruz de lacre (el sello de la carta) y su gemela verde en el óvalo del billete
const cruz = (cx, cy, r, c0, c1, cL) => { R.disco(cx, cy, r + 1, K); R.disco(cx, cy, r, c0); R.disco(cx - 1, cy - 1, r - 2, c1); R.anillo(cx, cy, r - 1, mez(c0, K, 0.3));
  const a = Math.round(r * 0.6); for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) R.poligono([[cx, cy], [cx + dx * a + dy * 2, cy + dy * a + dx * 2], [cx + dx * a - dy * 2, cy + dy * a - dx * 2]], mez(c0, K, 0.45));
  R.pset(cx - 2, cy - r + 2, cL); R.pset(cx - 3, cy - r + 3, cL); };
const p1 = (t) => {
  if (!BM) BM = mesaFija(); R.copiar(BM);
  // la vela: la llama que tiembla, su luz cálida y una polilla que da vueltas
  const fl = Math.sin(t * 13) + Math.sin(t * 7.7);
  luz(40, 70, 46, hex('#ffd890'), 0.32 + fl * 0.02);
  R.rect(39, 74, 40, 78, K); R.disco(40, 71 - (fl > 0.6 ? 1 : 0), 3, hex('#f0a030')); R.disco(40, 70 - (fl > 0.6 ? 1 : 0), 2, hex('#ffe070')); R.pset(40, 67 - (fl > 1 ? 1 : 0), hex('#fff8d0')); R.pset(40 + (fl > 0 ? 1 : 0), 65, hex('#f0a030'));
  for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1; R.pset(Math.round(40 + Math.sin(u * 9 + t) * 2 * u), Math.round(62 - u * 26), mez(hex('#8a7a6a'), ROBLE[3], u)); }
  { const an = t * 3.1, mx = Math.round(40 + Math.cos(an) * 16), my = Math.round(66 + Math.sin(an * 1.3) * 9), al = Math.floor(t * 16) % 2; R.pset(mx, my, hex('#d8c8a8')); R.pset(mx - 1, my - al, hex('#b8a888')); R.pset(mx + 1, my - al, hex('#b8a888')); }
  // el reloj de arena (x 286–302, y 62–108) con la arena que cae
  { const x0 = 286, x1 = 302, y0 = 62, y1 = 108, ym = 85, ar = hex('#e8c878');
    R.rect(x0 - 2, y0 - 3, x1 + 2, y0, K); R.rect(x0 - 1, y0 - 2, x1 + 1, y0 - 1, ROBLE[4]); R.rect(x0 - 2, y1, x1 + 2, y1 + 3, K); R.rect(x0 - 1, y1 + 1, x1 + 1, y1 + 2, ROBLE[4]);
    R.rect(x0 - 2, y0, x0 - 1, y1, ROBLE[2]); R.rect(x1 + 1, y0, x1 + 2, y1, ROBLE[2]);
    const lleno = 0.35 + 0.4 * ((t / 30) % 1);
    for (let y = y0 + 1; y < y1; y++) { const d = Math.abs(y - ym) / (ym - y0), w = Math.round(1 + d * 6); for (let x = 294 - w; x <= 294 + w; x++) { let col = mez(ROBLE[3], hex('#d8e8f0'), 0.45);
        if (y < ym && y > ym - (ym - y0) * (1 - lleno)) col = ar; if (y > ym && y > y1 - (y1 - ym) * lleno) col = ar; R.pset(x, y, col); }
      R.pset(294 - w - 1, y, K); R.pset(294 + w + 1, y, K); R.pset(294 - w, y, hex('#f0f8ff')); }
    for (let y = ym; y < y1 - (y1 - ym) * lleno; y++) if ((y + Math.floor(t * 20)) % 3) R.pset(294, y, ar); }
  // la mano de manga blanca (un templario) desliza la carta hasta el centro
  const en0 = tramo(t, 0.15, 1.25), sale0 = tramo(t, 1.35, 2.0), dx = Math.round((1 - (1 - en0) ** 2) * 0 + (1 - en0) * 170);
  // la carta y el billete: el barrido de izquierda a derecha en «worth money»
  const bar = tramo(t, vale - 0.05, sinSer - 0.2), wx = Math.round(lerp(CX0 - 6, CX1 + 6, bar)), toma = tramo(t, sinSer + 0.3, P2 + 0.2), ox = Math.round(toma ** 1.5 * 200), oy = Math.round(toma * -10);
  const sombra = (x0, y0, x1, y1) => { for (let y = y0 + 3; y <= y1 + 3; y++) for (let x = x0 + 4; x <= x1 + 4; x++) if (x >= 0 && x < 320 && y < 180 && (x > x1 || y > y1)) R.pset(x, y, mez(R.pget(x, y), K, 0.4)); };
  if (bar < 1) { sombra(CX0 + dx, CY0, Math.min(319, CX1 + dx), CY1);
    for (let y = CY0; y <= CY1; y++) for (let x = Math.max(CX0, wx); x <= CX1; x++) { const X = x + dx; if (X > 319) continue; R.pset(X, y, colCarta(x, y)); }
    if (wx < 160) { cruz(160 + dx, 116, 9, hex('#a8202a'), hex('#c8303a'), hex('#ff8a8a')); for (const [i, j] of [[-10, 2], [9, 4], [-3, 9]]) { R.pset(160 + dx + i, 116 + j, hex('#a8202a')); R.pset(160 + dx + i, 117 + j, hex('#7a1a1a')); } }
    // brilla en «letter»
    const g = tramo(t, carta - 0.3, carta + 0.2) - tramo(t, vale - 0.1, vale + 0.1); if (g > 0) for (let k = 0; k < 6; k++) chispa(CX0 + 10 + k * 24, CY0 - 2 + (k % 2) * (CY1 - CY0 + 4), hex('#fff0b0')); }
  if (bar > 0) { if (bar >= 1) sombra(BX0 + ox, BY0 + oy, Math.min(319, BX1 + ox), BY1 + oy);
    for (let y = BY0; y <= BY1; y++) for (let x = BX0; x <= Math.min(BX1, wx); x++) { const X = x + ox, Y = y + oy; if (X > 319 || X < 0) continue; const col = colBillete(x, y); if (col) R.pset(X, Y, col); }
    if (wx > 152) { cruz(130 + ox, 91 + oy, 9, hex('#4a6a4a'), hex('#6a8a64'), hex('#c8dabc')); }
    if (wx > 210) { R.numero('100', 196 + ox, 76 + oy, { color: hex('#3a5a3a'), sombra: false }); R.numero('100', 160 + ox, 118 + oy, { color: hex('#3a5a3a'), sombra: false, fina: true }); }
    // las chispas del filo que avanza
    if (bar < 1) for (let k = 0; k < 7; k++) chispa(wx + ((k * 3 + Math.floor(t * 12)) % 5) - 2, CY0 + 6 + k * 12 + (Math.floor(t * 10 + k) % 3)); }
  // las manos: la del templario trae la carta; la de hoy (vaquera) se lleva el billete
  if (en0 > 0 && sale0 < 1) { const hx = CX1 + dx + 6 + Math.round(sale0 * 60), hy = 104 + Math.round(sale0 * 30); T.brazo(R, hx + 40, hy + 44, hx, hy, '#f2eee2', -1, { codo: [hx + 30, hy + 18] }); }
  const vm = tramo(t, sinSer - 0.25, sinSer + 0.3); if (vm > 0) { const hx = Math.round(lerp(330, BX1 - 4, vm)) + ox, hy = 100 + oy; T.brazo(R, hx + 42, hy + 40, hx, hy, '#3a5a8a', -1, { codo: [hx + 28, hy + 14] }); }
};

// ── 2 · el datáfono: el billete se vuelve tarjeta y paga sin monedas ──
const tarjeta = (x, y, t) => { x = Math.round(x); y = Math.round(y); // 26 × 16, centrada en (x, y)
  R.rect(x - 13, y - 8, x + 13, y + 8, K); R.rect(x - 12, y - 7, x + 12, y + 7, hex('#2a3a6a')); R.rect(x - 12, y - 7, x + 12, y - 6, hex('#4a6aa8'));
  for (let i = -12; i <= 12; i++) if ((i + 13) % 6 < 3) R.pset(x + i, y + 4 - Math.round((i + 12) / 8), hex('#3a5090'));
  R.rect(x - 9, y - 3, x - 4, y + 1, K); R.rect(x - 8, y - 2, x - 5, y, hex('#e8c048')); R.pset(x - 7, y - 1, hex('#a8802a'));
  for (let k = 1; k <= 3; k++) R.anillo(x + 6, y - 1, k, hex('#c8d8f0'), 0); R.rect(x + 1, y - 5, x + 5, y + 3, hex('#2a3a6a')); R.pset(x + 6, y - 1, hex('#c8d8f0'));
  R.rect(x - 9, y + 4, x - 7, y + 4, hex('#c8c8d0')); R.rect(x - 5, y + 4, x - 3, y + 4, hex('#c8c8d0')); R.rect(x - 1, y + 4, x + 1, y + 4, hex('#c8c8d0')); };
const billeteChico = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 15, y - 8, x + 15, y + 8, K); R.rect(x - 14, y - 7, x + 14, y + 7, hex('#aac29c')); R.rect(x - 12, y - 5, x + 12, y + 5, hex('#c8dabc'));
  R.disco(x - 6, y, 4, hex('#6a8a64')); R.disco(x - 6, y, 2, hex('#aac29c')); R.rect(x + 2, y - 3, x + 11, y - 2, hex('#6a8a64')); R.rect(x + 2, y + 1, x + 9, y + 1, hex('#8aa680')); };
const p2 = (t) => {
  const pago = tramo(t, paga - 0.15, paga + 0.9);
  const G = T.hoy(R, t, { encuadre: 'tienda', camara: 'cerca', importe: 12, pago });
  // la mano baja desde arriba con el billete, que en «idea» se vuelve tarjeta; la acerca al lector, paga y se va arriba
  const llega = tramo(t, P2 - 0.1, idea - 0.15), cambia = tramo(t, idea - 0.1, idea + 0.25), acerca = tramo(t, idea + 0.5, paga - 0.1), vuelve = tramo(t, paga + 1.1, monedas + 0.3);
  const ll = 1 - (1 - llega) ** 2, hx = Math.round(lerp(244, 192, acerca)), hy = Math.round(lerp(-30, 30, ll) + acerca * 6 - vuelve * 70 + Math.sin(t * 2) * (acerca > 0 && acerca < 1 ? 0 : 1));
  const ox = hx - 16, oy = hy + 8;   // el objeto, por debajo y a la izquierda del puño
  if (hy > -20) { if (cambia < 0.5) billeteChico(ox, oy); else tarjeta(ox, oy, t);
    if (cambia > 0 && cambia < 1) { destello(ox, oy, cambia, 4, 22); chispa(ox - 8, oy - 6); chispa(ox + 9, oy + 5); }
    T.brazo(R, hx + 14, hy - 44, hx, hy, '#3a5a8a', -1); }
  // la moneda que rueda del platillo y se tumba («sin llevar monedas»)
  const mr = tramo(t, monedas - 0.5, monedas + 0.4); if (mr > 0) { const mx = Math.round(66 + mr * 30), wob = mr < 1 ? Math.abs(Math.sin(mr * 14)) * 3 : 0, my = 150 - (mr < 1 ? 1 : 0);
    if (mr < 1) { R.rect(mx - 1, my - 7, mx + 1, my, K); R.rect(mx, my - 6, mx, my - 1, hex('#f0d060')); R.pset(mx + (Math.floor(t * 12) % 2), my - 4, hex('#fff0a0')); }
    else { for (let i = -5; i <= 5; i++) for (let j = -2; j <= 2; j++) if (i * i / 25 + j * j / 4 <= 1) R.pset(mx + i, my - 2 + j, j === -2 || Math.abs(i) === 5 ? hex('#8a6a1a') : j < 0 ? hex('#f0d060') : hex('#c8a030')); } }
};

// ── 3 · el escalón al atardecer: llega, se sienta, el detector pita bajito ──
const conejo = (x, y, t, salta) => { x = Math.round(x); y = Math.round(y - salta); const Cn = hex('#8a6a4a'), CL = hex('#b8946a');
  R.rect(x, y - 4, x + 6, y, K); R.rect(x + 1, y - 3, x + 5, y - 1, Cn); R.rect(x + 1, y - 3, x + 3, y - 3, CL); R.rect(x + 5, y - 7, x + 8, y - 3, K); R.rect(x + 6, y - 6, x + 7, y - 4, Cn);
  R.pset(x + 6, y - 9, K); R.pset(x + 6, y - 8, Cn); R.pset(x + 7, y - 9, K); R.pset(x + 7, y - 8, CL); R.pset(x + 7, y - 5, K); R.pset(x - 1, y - 3, BL); R.pset(x - 1, y - 2, BL); };
const p3 = (t) => {
  const G = T.hoy(R, t, { encuadre: 'escalon' });
  // un conejo en el prado: brinca, se para, olfatea
  { const ph = (t - P3) * 0.9, k = Math.floor(ph), f = ph - k, x = 30 + Math.min(k, 4) * 10 + (k < 4 ? f * 10 : 0), s = k < 4 ? Math.round(Math.sin(f * Math.PI) * 4) : 0; conejo(x, 164, t, s); }
  // el buscador llega con el detector al hombro, sube al primer escalón y se sienta
  const u = tramo(t, P3, sube - 0.05), bx = Math.round(lerp(-16, 120, u)), up = tramo(t, sube, sube + 0.35), bj = tramo(t, sienta, sienta + 0.4);
  const pita = t > paso - 0.2 && t < este + 0.4 ? 0.35 : 0;
  const mira = t > paso + 0.1 && t < P4;
  if (bj < 0.5) {
    const S = Math.round(157 - up * 8) - Math.round(Math.sin(up * Math.PI) * 4);
    const r = R.actor(EL.buscador, bx, S, t, { dir: 1, anda: u > 0 && u < 1, sostiene: [bx + 14, S - 15] });
    // el detector al hombro: la vara hacia atrás
    T.detector(R, r.mano[0], r.mano[1], t, { dir: -1, suelo: S - 2, largo: 14 });
  } else {
    T.detector(R, 150, 140, t, { dir: 1, tumbado: true, pita: pita * tramo(t, sienta + 0.4, sienta + 0.6) });
    sentado(EL.buscador, 120, 141, t, { dir: 1, sonrisa: t > este - 0.1, sorpresa: t > paso && t < este - 0.1, sostiene: t > sienta + 0.3 && t < sienta + 0.9 ? [146, 138] : undefined });
    if (mira && t < este) { const [cx, cy] = bocadillo(140, 114, 8, 14); R.icono('?', cx - 2, cy - 4, K, hex('#c8c8d0'), 1); }
  }
};

// ── 4 · de cerca: mira al este y sonríe ──
const p4 = (t) => {
  const G = T.hoy(R, t, { encuadre: 'escalon', camara: 'cerca' });
  // la primera estrella al este (izquierda), que se enciende y titila
  const es = tramo(t, hallar - 0.3, hallar + 0.6); if (es > 0) { const x = 40, y = 52, tw = Math.sin(t * 6) > 0; luz(x, y, 8, hex('#fff6d0'), 0.3 * es); R.pset(x, y, BL); if (es > 0.5) { R.pset(x - 1, y, hex('#fff0c0')); R.pset(x + 1, y, hex('#fff0c0')); R.pset(x, y - 1, hex('#fff0c0')); R.pset(x, y + 1, hex('#fff0c0')); if (tw) { R.pset(x - 2, y, hex('#e8d8a0')); R.pset(x + 2, y, hex('#e8d8a0')); R.pset(x, y - 2, hex('#e8d8a0')); R.pset(x, y + 2, hex('#e8d8a0')); } } }
  // el detector a su lado, que pita bajito en «something»
  const pita = t > algo - 0.2 && t < hallar ? 0.3 : 0;
  T.detector(R, 134, 132, t, { dir: 1, tumbado: true, pita });
  const vuelto = t > hallar - 0.15, sx = 106;
  sentado(EL.buscador, sx, 133, t, { dir: vuelto ? -1 : 1, piernas: 1, sonrisa: t > hallar + 0.2, dedo: t > sig - 0.1 && t < sig + 1.5, sorpresa: t > algo && t < hallar - 0.15 });
  // las rayitas de la sonrisa (contento) cuando mira al este
  if (t > hallar + 0.4 && t < sig - 0.2 && Math.floor(t * 3) % 2) { R.pset(sx - 3, 106, hex('#ffe8a0')); R.pset(sx - 5, 104, hex('#ffe8a0')); R.pset(sx - 4, 109, hex('#ffe8a0')); }
};
const efectos = [[0.3, 'papel'], [carta - 0.1, 'brillo'], [vale, 'whoosh'], [sinSer + 0.3, 'papel'],
  [idea, 'brillo'], [paga, 'bip'], [paga + 0.7, 'maquina'], [monedas - 0.1, 'golpecito'],
  [sube, 'golpecito'], [paso, 'bip'],
  [algo, 'bip'], [hallar + 0.1, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < a(0.36) ? 1150 : 2026) });
''')
