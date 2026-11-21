# Borrador de escenas del ep45, grupo S11: vd-cierre (formato del 11: E[id] = (título, cabecera, cuerpo)).
# Los instantes se escriben en el cuerpo como @T(s) (segundos desde el inicio de la escena, de las palabras inglesas de
# atomo/build/largo/ep45/linea.json) y se traducen aquí a en('marca', fracción) con las marcas reales de la voz.
import json
import os
import re

_RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
_MARCAS = json.load(open(os.path.join(_RAIZ, 'atomo/plato/escenas/marcas-ep45.json')))


def _en(id_, cuerpo):
    fr = _MARCAS[id_]['frases']
    nombres = [k for k in _MARCAS[id_]['marcas'] if not k.endswith('_fin')]

    def una(m):
        s = float(m.group(1))
        k = 0
        for i, (a, b) in enumerate(fr):
            if s >= a - 0.45:
                k = i
        a, b = fr[k]
        return "en('%s', %.4f)" % (nombres[k], (s - a) / (b - a))
    return re.sub(r'@T\(([\d.]+)\)', una, cuerpo)


CIERRE = r'''
// ── los cortes (en la palabra inglesa) y los instantes clave ─────────────────────────────────────────────────────
const P2 = @T(5.12), P3 = @T(10.48), P4 = @T(16.26), P5 = @T(22.88), P6 = @T(27.38), P7 = @T(31.46), P8 = @T(36.54),
  P9 = @T(42.20), P10 = @T(46.06), P11 = @T(49.72), P12 = @T(54.56), P13 = @T(58.86), P14 = @T(63.10);
const nadie = @T(1.14), junio = @T(3.64), despierta = @T(5.24), simbolico = @T(6.26), hell = @T(8.18), mefistoW = @T(9.50),
  tomo = @T(11.66), madre = @T(11.98), guerra = @T(13.82), dentro = @T(15.26), gano = @T(17.46), salvarse = @T(19.66),
  entrega = @T(21.20), trono = @T(21.96), primero = @T(23.56), rompe = @T(24.88), libre = @T(27.04), valeria = @T(28.22),
  sacrifico = @T(30.14), abrigo = @T(32.12), ahi = @T(35.40), peor = @T(38.06), dio = @T(39.54), queda = @T(41.28),
  igual = @T(44.36), mal = @T(47.90), chico = @T(50.70), madre2 = @T(51.96), rey = @T(53.48), dic = @T(54.84),
  cines = @T(56.74), cara = @T(57.48), pregunto = @T(59.46), recuperar = @T(61.12), perdido = @T(62.14), otro = @T(64.20),
  hazlo = @T(65.38), comentarios = @T(67.38);

const K = hex('#141018'), ease = (u) => u * u * (3 - 2 * u), voz = (t) => E.energia(t);
const H = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const cl = (v, a, b) => Math.max(a, Math.min(b, v));
const mezcla = (c, d2, a) => { const r = c & 255, gg = (c >> 8) & 255, b = (c >> 16) & 255, r2 = d2 & 255, g2 = (d2 >> 8) & 255, b2 = (d2 >> 16) & 255;
  return (0xff000000 | (Math.round(b + (b2 - b) * a) << 16) | (Math.round(gg + (g2 - gg) * a) << 8) | Math.round(r + (r2 - r) * a)) >>> 0; };
// una luz que tiñe lo que hay alrededor (cx, cy), radio r, color col, fuerza a
const luz = (cx, cy, r, col, a) => { if (a <= 0) return; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const q = Math.hypot(i, j) / r; if (q >= 1) continue; const x = Math.round(cx + i), y = Math.round(cy + j); if (x < 0 || x > 319 || y < 0 || y > 179) continue; R.pset(x, y, mezcla(R.pget(x, y), col, a * (1 - q) * (1 - q))); } };
// oscurece (sombra) los píxeles de un polígono convexo o no: prueba par-impar en su caja
const dentroPol = (P, x, y) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const sombraPol = (P, col, a, umbral = 1) => { const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]);
  for (let y = Math.max(0, Math.floor(Math.min(...ys))); y <= Math.min(179, Math.ceil(Math.max(...ys))); y++) for (let x = Math.max(0, Math.floor(Math.min(...xs))); x <= Math.min(319, Math.ceil(Math.max(...xs))); x++)
    if (bay(x, y) < umbral && dentroPol(P, x + 0.5, y + 0.5)) R.pset(x, y, mezcla(R.pget(x, y), col, a)); };
// nube de tres tonos (sombra abajo, cuerpo, luz arriba) hecha de bolas; ok(x, y) dice dónde se puede pintar
const nube = (cx, cy, w, c0, c1, c2, ok) => {
  const bolas = [[0, 0, 0.3], [-0.34, 0.08, 0.22], [0.32, 0.06, 0.24], [-0.12, -0.14, 0.24], [0.14, -0.1, 0.2], [0.55, 0.12, 0.14], [-0.58, 0.14, 0.13]];
  for (const [dy, c, f] of [[1.5, c0, 1], [0, c1, 1], [-1.6, c2, 0.72]]) for (const [bx, by, br] of bolas) { const r = Math.max(1, Math.round(w * br * f)), X = Math.round(cx + bx * w - (c === c2 ? 1 : 0)), Y = Math.round(cy + by * w + dy);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && ok(X + i, Y + j)) R.pset(X + i, Y + j, c); }
};
// murciélago pequeño que aletea
const murcielago = (x, y, t, k, c = K) => { const X = Math.round(x), Y = Math.round(y), a = Math.sin(t * 16 + k * 2) > 0;
  R.pset(X, Y, c); R.pset(X, Y + 1, c); R.pset(X - 1, Y - (a ? 1 : -1), c); R.pset(X + 1, Y - (a ? 1 : -1), c); R.pset(X - 2, Y - (a ? 2 : 0), c); R.pset(X + 2, Y - (a ? 2 : 0), c); R.pset(X - 3, Y - (a ? 1 : 1), c); R.pset(X + 3, Y - (a ? 1 : 1), c); };
// copos de nieve en capas (n, velocidad, viento, color, tamaño)
const copos = (t, n, v, vx, c, gros, seed, ymax = 180) => { for (let k = 0; k < n; k++) { const x0 = H(k, seed) * 360, f = (t * v * (0.7 + 0.6 * H(k, seed + 1)) + H(k, seed + 2)) % 1, y = f * (ymax + 10) - 6, x = ((x0 + f * vx * 60 + Math.sin(t * 2 + k) * 2) % 340 + 340) % 340 - 10;
  if (gros > 1) R.rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y) + 1, c); else R.pset(Math.round(x), Math.round(y), c); } };
const brasas = (t, n, x0, x1, y0, y1, c1, c2, seed) => { for (let k = 0; k < n; k++) { const f = (t * (0.12 + 0.1 * H(k, seed)) + H(k, seed + 1)) % 1, x = x0 + H(k, seed + 2) * (x1 - x0) + Math.sin(t * 1.5 + k) * 4, y = y1 - f * (y1 - y0);
  R.pset(Math.round(x), Math.round(y), f < 0.5 ? c1 : c2); } };
// verdes de Doom y de las almas; rojos del infierno; lava
const G = ['#06180e', '#0e2a18', '#1a4a2a', '#2e7a3e', '#6ad88a', '#a8ffc8', '#e8fff0'].map(hex);
const RJ = ['#14050a', '#2a0a10', '#4a1216', '#6a1a1a', '#8a2a1e', '#b8401e', '#e86a2a', '#ffc860'].map(hex);
const NV = hex('#e8ecf4'), NVS = hex('#a8b4c8'), NVM = hex('#c8d2e2'), ABR = hex('#6a4a30'), ABRS = hex('#4e3420'), ABRL = hex('#8a6440'), BUF = hex('#a8302a'), PIEL = hex('#e0b090');
// una mujer de luz (sin rasgos), la cabeza en (cx, cy), escala s, intensidad a: halo, chal y vestido que se deshace en chispas
const almaMujer = (cx, cy, s, a, t) => { if (a <= 0) return;
  luz(cx, cy + 8 * s, Math.round(16 * s), G[4], 0.55 * a);
  const body = [[cx - 2 * s, cy + 2 * s], [cx + 2 * s, cy + 2 * s], [cx + 4 * s, cy + 8 * s], [cx + 6 * s, cy + 15 * s], [cx + 2 * s, cy + 14 * s + Math.sin(t * 5) * s], [cx - 2 * s, cy + 15 * s], [cx - 6 * s, cy + 15 * s], [cx - 4 * s, cy + 8 * s]].map(([x, y]) => [Math.round(x), Math.round(y)]);
  if (a > 0.35) { R.poligono(body, G[5]); R.poligono([[cx - 4 * s, cy + 1 * s], [cx + 4 * s, cy + 1 * s], [cx + 5 * s, cy + 6 * s], [cx - 5 * s, cy + 6 * s]].map(([x, y]) => [Math.round(x), Math.round(y)]), G[6]);
    R.disco(Math.round(cx), Math.round(cy - s), Math.max(2, Math.round(2.6 * s)), G[6]); R.disco(Math.round(cx), Math.round(cy - s), Math.max(1, Math.round(1.6 * s)), hex('#ffffff')); }
  for (let k = 0; k < 10; k++) { const f = (t * 0.9 + k / 10) % 1; R.pset(Math.round(cx + Math.sin(k * 2.3 + t * 3) * 6 * s), Math.round(cy + (15 + f * 10) * s), f < 0.5 ? G[6] : G[4]); }
};
// la corona dorada (R.ICONOS.corona, de 7×7) a escala e, centrada en (cx, y)
const corona = (cx, y, e = 2) => R.icono('corona', Math.round(cx - 3.5 * e), Math.round(y), hex('#f0c848'), K, e);
// un pergamino pequeño en (x, y): renglones, firma y lacre
const pergamino = (x, y, w = 8, h = 10) => { R.rect(x, y, x + w, y + h, K); R.rect(x + 1, y + 1, x + w - 1, y + h - 1, hex('#f2e6c0'));
  for (let j = y + 3; j < y + h - 3; j += 2) R.linea(x + 2, j, x + w - 2 - (j % 4 ? 1 : 0), j, hex('#a89a78')); R.disco(x + w - 2, y + h - 2, 1, hex('#c82a2a')); R.rect(x, y, x + w, y, hex('#d8c898')); };

// ══ 1 · EL VACÍO ESTRELLADO: el polvo de luz se junta en la máscara y cae hacia la grieta roja ═══════════════════
let B1 = null;
const HOR1 = new Int16Array(320);
const fondo1 = () => {
  if (B1) return B1;
  B1 = R.nuevo(); const prev = R.usar(B1);
  const CI = ['#04030a', '#0a0818', '#120c24', '#1c1030', '#2a1230', '#3a1428'].map(hex);
  for (let x = 0; x < 320; x++) HOR1[x] = Math.round(160 + Math.sin(x * 0.045) * 5 + Math.sin(x * 0.13 + 1) * 2 + (H(x >> 3, 9) > 0.7 ? -3 : 0));
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const neb = Math.sin(x * 0.021 + y * 0.034) + Math.sin(x * 0.009 - y * 0.05 + 2) * 0.8 + Math.sin(x * 0.05 + 1) * 0.3;
    const u = y / 180 * 4.4 + neb * 0.45; let c = CI[cl(Math.floor(u + bay(x, y) - 0.5), 0, 5)];
    // nebulosas: una violeta a la izquierda y una verde azulada a la derecha, tramadas
    const n1 = 1 - Math.hypot((x - 70) / 70, (y - 60) / 34), n2 = 1 - Math.hypot((x - 220) / 60, (y - 100) / 30);
    if (n1 > 0 && n1 * 0.9 + Math.sin(x * 0.2 + y * 0.1) * 0.15 > bay(x, y)) c = n1 > 0.55 ? hex('#4a2a6a') : hex('#2e1c4a');
    if (n2 > 0 && n2 * 0.8 + Math.sin(x * 0.17 - y * 0.12) * 0.15 > bay(x, y)) c = n2 > 0.55 ? hex('#1e4a5a') : hex('#163042');
    R.pset(x, y, c);
  }
  // la galaxia en espiral, lejos (arriba a la izquierda, bajo la barra del año)
  for (let k = 0; k < 220; k++) { const a = k * 0.12, r = 2 + k * 0.08, br = k % 2 ? 0 : Math.PI; const x = 92 + Math.cos(a + br) * r * 1.6, y = 46 + Math.sin(a + br) * r * 0.7; R.pset(Math.round(x), Math.round(y), k < 40 ? hex('#fff0d0') : k % 3 ? hex('#a89ad8') : hex('#e8d8ff')); }
  R.disco(92, 46, 2, hex('#fff6e0'));
  // estrellas fijas de tres tamaños
  for (let k = 0; k < 180; k++) { const x = Math.floor(H(k, 1) * 320), y = Math.floor(H(k, 2) * 150); if (x > 276 && y < 46 && k % 3) continue;
    const c = H(k, 3) > 0.8 ? hex('#ffe8c0') : H(k, 3) > 0.5 ? hex('#c8d8ff') : hex('#8a8ab0'); R.pset(x, y, c);
    if (H(k, 4) > 0.93) { R.pset(x - 1, y, hex('#6a6a98')); R.pset(x + 1, y, hex('#6a6a98')); R.pset(x, y - 1, hex('#6a6a98')); R.pset(x, y + 1, hex('#6a6a98')); } }
  // el borde del mundo de abajo: roca oscura con su filo rojo, agujas y la GRIETA de luz roja en el centro
  for (let x = 0; x < 320; x++) { const hy = HOR1[x]; for (let y = hy; y < 180; y++) { const d = y - hy; R.pset(x, y, d === 0 ? RJ[4] : d === 1 ? RJ[3] : H(x >> 1, y >> 1, 5) > 0.88 ? RJ[2] : (x + y) % 7 === 0 ? RJ[1] : RJ[0]); } }
  for (const [x, h, w] of [[22, 22, 5], [44, 12, 3], [270, 26, 6], [298, 14, 4], [236, 10, 3]]) { R.poligono([[x - w, HOR1[x] + 1], [x, HOR1[x] - h], [x + w, HOR1[x] + 1]], RJ[0]); R.linea(x, HOR1[x] - h, x + w, HOR1[x], RJ[3]); }
  const gr = [[112, 172], [126, 166], [138, 170], [150, 164], [162, 168], [176, 163], [190, 169], [204, 165], [216, 171]];
  for (let i = 0; i < gr.length - 1; i++) { const [a, b] = gr[i], [c, d] = gr[i + 1]; for (let w = -2; w <= 2; w++) R.linea(a, b + w, c, d + w, Math.abs(w) === 2 ? RJ[3] : Math.abs(w) === 1 ? RJ[6] : RJ[7]); }
  R.usar(prev); return B1;
};
const motas1 = Array.from({ length: 80 }, (_, k) => ({ a: H(k, 11) * Math.PI * 2, r: 30 + H(k, 12) * 120, d: H(k, 13) * 0.6 }));
const p1 = (t) => {
  R.copiar(fondo1());
  // estrellas que titilan, una fugaz y dos jirones de nebulosa que pasan
  for (let k = 0; k < 30; k++) { const x = Math.floor(H(k, 21) * 320), y = Math.floor(H(k, 22) * 140); if (x > 276 && y < 46) continue; if (Math.sin(t * (2 + H(k, 23) * 3) + k) > 0.6) { R.pset(x, y, hex('#ffffff')); R.pset(x + 1, y, hex('#8a8ab0')); R.pset(x - 1, y, hex('#8a8ab0')); } }
  const ok = (x, y) => y > 22 && y < 150 && !(x > 274 && y < 48);
  nube(((40 + t * 3) % 380) - 30, 118, 44, hex('#1c1030'), hex('#26163a'), hex('#34204a'), ok);
  nube(((250 - t * 2) % 380 + 380) % 380 - 30, 76, 30, hex('#142838'), hex('#1a3444'), hex('#224454'), ok);
  { const f = tramo(t, 1.6, 2.3); if (f > 0 && f < 1) for (let k = 0; k < 10; k++) R.pset(Math.round(250 - f * 120 + k * 2), Math.round(30 + f * 36 - k * 0.6), k < 3 ? hex('#ffffff') : hex('#8aa0d8')); }
  // dos rocas que flotan despacio, girando
  for (const [x0, y0, v, s] of [[30, 98, 1.6, 5], [262, 128, -1.1, 4]]) { const x = x0 + t * v, y = y0 + Math.sin(t * 0.8 + x0) * 2, a = t * 0.4 + x0;
    const pts = [0, 1, 2, 3, 4].map((i) => [Math.round(x + Math.cos(a + i * 1.26) * s * (1 + 0.3 * H(i, x0))), Math.round(y + Math.sin(a + i * 1.26) * s * 0.8)]);
    R.poligono(pts, RJ[1]); R.linea(pts[0][0], pts[0][1], pts[1][0], pts[1][1], RJ[4]); R.pset(Math.round(x), Math.round(y + s), RJ[6]); }
  // la grieta late; con la caída de la máscara, más
  const cae = ease(tramo(t, 4.25, 5.1));
  luz(164, 168, 46, RJ[6], 0.22 + 0.12 * Math.sin(t * 3) + 0.4 * cae);
  // EL POLVO DE LUZ: las motas verdes, dispersas, se arremolinan desde «nobody stays dead» y se juntan en el centro
  const cx = 160, cy0 = 78;
  for (let k = 0; k < motas1.length; k++) { const m = motas1[k], u = ease(tramo(t, nadie - 0.4 + m.d, 2.9 + m.d * 0.3)); if (u >= 1 && t > 3.0) continue;
    const a = m.a + (1 - u) * 0.6 + u * 4 + t * 0.3, r = m.r * (1 - u) + 3 * u, x = cx + Math.cos(a) * r * 1.3, y = cy0 + Math.sin(a) * r * 0.55;
    const c = Math.sin(t * 6 + k) > 0.2 ? G[5] : G[4], X = Math.round(x), Y = Math.round(y), xa = cx + Math.cos(a - 0.05 - 0.1 * u) * r * 1.3, ya = cy0 + Math.sin(a - 0.05 - 0.1 * u) * r * 0.55;
    if (u > 0.05) R.linea(Math.round(xa), Math.round(ya), X, Y, G[2]); R.rect(X, Y, X + 1, Y + 1, c); R.pset(X, Y, G[6]); }
  { const g = tramo(t, nadie, 2.9) * (1 - tramo(t, 2.9, 3.3)); if (g > 0) luz(cx, cy0, 30, G[3], 0.35 * g); }
  // LA MÁSCARA se forma en un destello (2,9–3,3 s); en «June of this year» le arden los ojos verdes; luego cae a la grieta
  const forma = tramo(t, 2.85, 3.3);
  if (forma > 0) { const my = Math.round(lerp(cy0, 146, cae)), s = 3;
    luz(cx, my, Math.round(26 + 14 * (1 - forma)), G[4], 0.55 * (1 - forma) + 0.25);
    for (let k = 0; k < 14 * cae; k++) { const f = (t * 1.6 + k / 14) % 1; R.pset(Math.round(cx + Math.sin(k * 3.1) * 12), Math.round(my - 20 - f * 40 * cae), f < 0.4 ? G[5] : G[3]); }
    T.c_mascara(R, cx, my, 0, s, t); if (cae > 0) luz(cx, my + 20, 26, RJ[6], 0.4 * cae);
    const ojo = tramo(t, junio - 0.1, junio + 0.4); if (ojo > 0) for (const dx of [-0.22, 0.22]) { const ex = Math.round(cx + dx * 12 * s), ey = Math.round(my - 0.12 * 15 * s); luz(ex, ey, 6 + Math.round(ojo * 5), G[5], 0.8 * ojo); R.rect(ex - s, ey, ex + s, ey, G[6]); }
    if (forma < 1) for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2, r = 10 + forma * 26; R.pset(Math.round(cx + Math.cos(a) * r), Math.round(cy0 + Math.sin(a) * r * 0.8), G[6]); } }
  // Atom, luciérnaga, mira desde la izquierda: se asusta cuando la máscara aparece y la sigue con la vista
  T.AT.luciernaga(R, 58 + Math.sin(t * 0.9) * 4, 92 + Math.sin(t * 1.7) * 3 + cae * 10, t, { dir: 1, brillo: 0.7, cara: t > 2.9 ? 'sorpresa' : 'normal' });
};

// ══ 2 · LA CAVERNA DEL LAGO DE LAVA: Doom despierta en el islote ═════════════════════════════════════════════════
let B2 = null;
const TECHO2 = new Int16Array(320);
const fondo2 = () => {
  if (B2) return B2;
  B2 = R.nuevo(); const prev = R.usar(B2);
  const pinchos = [[16, 30, 8], [48, 22, 6], [84, 40, 9], [126, 18, 5], [176, 34, 8], [214, 26, 6], [248, 44, 9]];
  for (let x = 0; x < 320; x++) { let v = 12 + Math.sin(x * 0.05) * 4 + Math.sin(x * 0.17) * 2; for (const [px, L, w] of pinchos) v = Math.max(v, 12 + L * (1 - Math.abs(x - px) / w)); if (x > 272) v = Math.min(v, 12); TECHO2[x] = Math.round(v); }
  // la pared del fondo: estratos rojos con vetas de luz, tramada, más clara hacia el lago
  for (let y = 0; y < 116; y++) for (let x = 0; x < 320; x++) {
    const est = Math.floor((y + Math.sin(x * 0.04) * 6 + Math.sin(x * 0.11) * 2) / 9), u = y / 116 * 3 + (est & 1) * 0.4;
    let c = [RJ[1], RJ[2], RJ[3], RJ[4]][cl(Math.floor(u + bay(x, y) - 0.5), 0, 3)]; if (H(x >> 1, y >> 1, est) > 0.92) c = RJ[0];
    if ((y + Math.round(Math.sin(x * 0.04) * 6)) % 9 === 0) c = RJ[1];
    R.pset(x, y, c);
  }
  // agujas lejanas con su silueta y una cadena entre dos; la torre de Mefisto a la derecha, con su luz roja
  for (const [x, w, top] of [[60, 9, 50], [112, 6, 66], [196, 8, 58], [300, 10, 60]]) { R.poligono([[x - w, 116], [x - 2, top], [x + 2, top], [x + w, 116]], RJ[1]); R.linea(x + 2, top, x + w, 116, RJ[3]); }
  for (let i = 0; i <= 40; i++) { const x = 112 + i * 2.1, y = 72 + Math.sin(i / 40 * Math.PI) * 10; if (i % 2 === 0) R.rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y) + 1, RJ[0]); }
  R.poligono([[222, 116], [228, 60], [234, 48], [240, 60], [246, 116]], RJ[0]); R.poligono([[229, 62], [234, 50], [239, 62]], RJ[1]);
  for (const [x, y] of [[232, 70], [236, 82], [231, 94]]) { R.rect(x, y, x + 2, y + 3, RJ[6]); R.pset(x + 1, y, RJ[7]); }
  // el techo con estalactitas, oscuro, con su filo
  for (let x = 0; x < 320; x++) for (let y = 0; y <= TECHO2[x]; y++) R.pset(x, y, y === TECHO2[x] ? RJ[3] : y === TECHO2[x] - 1 ? RJ[2] : H(x >> 1, y >> 1, 7) > 0.9 ? RJ[1] : RJ[0]);
  // el lago de lava (lo anima la escena) y el ISLOTE de basalto con columnas y grietas
  const isl = [[64, 160], [70, 146], [82, 140], [118, 137], [160, 138], [188, 142], [198, 152], [194, 162], [80, 164]];
  R.poligono(isl, hex('#1e1418'));
  for (let x = 66; x < 198; x++) { let top = 180; for (let y = 130; y < 166; y++) if (dentroPol(isl, x + 0.5, y + 0.5)) { top = y; break; }
    for (let y = top; y < 166; y++) if (dentroPol(isl, x + 0.5, y + 0.5)) R.pset(x, y, y - top < 2 ? hex('#4a3a40') : (x % 9 === 0) ? K : (y - top) % 7 === 0 ? hex('#140c10') : H(x, y, 8) > 0.85 ? hex('#3a2a30') : hex('#2a1e24')); }
  for (const [a, b, c, d] of [[96, 140, 104, 150], [104, 150, 100, 158], [150, 140, 158, 152], [170, 141, 166, 150]]) { R.linea(a, b, c, d, RJ[5]); R.linea(a + 1, b, c + 1, d, RJ[3]); }
  R.usar(prev); return B2;
};
const lagoY = 118;
const p2 = (t) => {
  R.copiar(fondo2());
  const pr = B2;
  // las cascadas de lava (dos), que corren
  for (const [x0, w] of [[36, 10], [262, 8]]) for (let y = 30; y < lagoY; y++) for (let x = x0; x < x0 + w; x++) { if (y < TECHO2[x]) continue; const f = Math.sin(y * 0.35 - t * 9 + H(x, 1) * 6) + (H(x, Math.floor(y * 0.3 - t * 3)) - 0.5); R.pset(x, y, x === x0 || x === x0 + w - 1 ? RJ[3] : f > 0.9 ? RJ[7] : f > -0.2 ? RJ[6] : RJ[5]); }
  // EL LAGO: tres tonos que ondulan, brillos que corren, la luz de las cascadas
  for (let y = lagoY; y < 180; y++) for (let x = 0; x < 320; x++) {
    const d = y - lagoY, fila = Math.floor(d / (2 + d * 0.08)), v = Math.sin(x * (0.12 - d * 0.0012) + t * (1.2 + (fila % 3) * 0.3) + fila * 1.7) + Math.sin(x * 0.037 - t * 0.6 + fila) * 0.7 + (H(fila, 4) - 0.5);
    if (d === 0) { R.pset(x, y, RJ[3]); continue; }
    const c = v > 1.35 ? RJ[7] : v > 0.6 ? RJ[6] : v > -0.4 ? RJ[5] : v > -1.1 ? RJ[4] : RJ[3]; R.pset(x, y, c); }
  // la luz de las cascadas en el lago (espuma) y una costra oscura que deriva
  for (const xc of [41, 266]) for (let k = 0; k < 10; k++) { const f = (t * 1.5 + k / 10) % 1; R.pset(Math.round(xc + Math.sin(k * 2.1) * (3 + f * 10)), Math.round(lagoY + 2 + f * 4), RJ[7]); }
  for (let k = 0; k < 6; k++) { const x0 = ((t * (4 + k) + k * 61) % 360) - 20, y0 = 126 + k * 8; R.rect(Math.round(x0), y0, Math.round(x0) + 6 + k, y0 + 1, RJ[2]); R.pset(Math.round(x0) + 2, y0 - 1, RJ[3]); }
  // vuelve a poner el islote encima del lago
  for (let y = 130; y < 166; y++) for (let x = 62; x < 200; x++) { const c = pr[y * 320 + x]; if (c !== 0 && y >= 136) { const isl = [[64, 160], [70, 146], [82, 140], [118, 137], [160, 138], [188, 142], [198, 152], [194, 162], [80, 164]]; if (dentroPol(isl, x + 0.5, y + 0.5)) R.pset(x, y, c); } }
  // el humo que pasa bajo el techo, brasas que suben y murciélagos
  const ok = (x, y) => y > TECHO2[Math.max(0, Math.min(319, x))] && y < 100 && !(x > 272 && y < 46);
  nube(((t * 6 + 40) % 400) - 40, 58, 36, RJ[2], RJ[3], RJ[4], ok); nube(((t * 3.5 + 220) % 400) - 40, 80, 28, RJ[2], RJ[3], hex('#a04a2a'), ok);
  brasas(t, 22, 0, 320, 40, 176, RJ[7], RJ[6], 31);
  for (let k = 0; k < 4; k++) murcielago(((t * (18 + k * 5) + k * 90) % 360) - 20, 34 + k * 9 + Math.sin(t * 2 + k) * 4, t, k, RJ[0]);
  // EL CHARCO DE LUZ VERDE en el islote: brilla en «woke up» y Doom sale de él
  const sale = ease(tramo(t, despierta + 0.05, despierta + 1.3)), brillo = tramo(t, P2, despierta + 0.2) * (1 - 0.6 * tramo(t, despierta + 1.3, despierta + 2.6));
  luz(122, 139, 30, G[4], 0.55 * brillo);
  for (let i = -15; i <= 15; i++) for (let j = -3; j <= 3; j++) if ((i / 15) ** 2 + (j / 3) ** 2 <= 1 && bay(i + 122, j) < brillo + 0.1) R.pset(122 + i, 139 + j, (i + j + Math.floor(t * 6)) % 3 ? G[4] : G[5]);
  // Doom: sale del charco, mira a un lado («symbolic place»), al otro en «Hell» (sorpresa), anda hasta el borde y en
  // «Mephisto» señala con el puño la torre roja del fondo
  const anda = tramo(t, hell + 0.35, mefistoW - 0.1), x = Math.round(lerp(115, 150, ease(anda))), suelo = 139 + Math.round((1 - sale) * 26);
  if (sale > 0) {
    const guarda = []; if (sale < 1) for (let y = 140; y < 172; y++) for (let xx = x - 3; xx < x + 19; xx++) guarda.push(R.pget(xx, y));
    const r = R.actor(EL.doom, x, suelo, t, { dir: t < simbolico || (t > hell - 0.1) ? 1 : -1, anda: anda > 0 && anda < 1, sorpresa: t > hell - 0.05 && t < hell + 0.8, enfado: t > mefistoW - 0.2, dedo: t > mefistoW - 0.1 });
    // lo que queda bajo la superficie del charco lo tapa el islote (se copia del fondo)
    if (sale < 1) { let i = 0; for (let y = 140; y < 172; y++) for (let xx = x - 3; xx < x + 19; xx++) R.pset(xx, y, guarda[i++]); }
    if (sale < 1) for (let i = -15; i <= 15; i++) R.pset(122 + i, 139, G[5]);
  }
  // en «Mephisto», la torre roja responde: sus ventanas laten
  const tm = tramo(t, mefistoW, mefistoW + 0.6); if (tm > 0) luz(234, 80, 18, RJ[6], 0.5 * tm * (0.7 + 0.3 * Math.sin(t * 8)));
  // rocas de primer término con su filo de luz (delante)
  R.poligono([[0, 180], [0, 150], [14, 144], [30, 152], [40, 180]], K); R.linea(0, 150, 14, 144, RJ[5]); R.linea(14, 144, 30, 152, RJ[4]);
  R.poligono([[276, 180], [288, 156], [304, 150], [320, 154], [320, 180]], K); R.linea(288, 156, 304, 150, RJ[5]);
};

// ══ 3 · LA LLANURA DE LA GUERRA: la mano roja de Mefisto contra Doom y sus robots ═══════════════════════════════════
let B3 = null;
const fondo3 = () => {
  if (B3) return B3;
  B3 = R.nuevo(); const prev = R.usar(B3);
  for (let y = 0; y < 86; y++) for (let x = 0; x < 320; x++) { const u = y / 86 * 4 + Math.sin(x * 0.03 + y * 0.1) * 0.3; R.pset(x, y, [RJ[1], RJ[2], RJ[3], RJ[4], RJ[5]][cl(Math.floor(u + bay(x, y) - 0.5), 0, 4)]); }
  // montes lejanos en dos términos
  for (let x = 0; x < 320; x++) { const a = Math.round(68 + Math.sin(x * 0.04) * 6 + Math.sin(x * 0.13) * 3), b = Math.round(76 + Math.sin(x * 0.07 + 2) * 4);
    for (let y = a; y < 86; y++) R.pset(x, y, y < b ? RJ[2] : RJ[1]); R.pset(x, a, RJ[4]); }
  // la llanura en perspectiva: tierra roja con grietas de luz que van al horizonte
  const VX = 228, VY = 84;
  for (let y = 86; y < 180; y++) for (let x = 0; x < 320; x++) { const d = (y - VY) / 96; let c = H(x >> 2, y >> 1, 3) > 0.8 ? RJ[3] : d > 0.5 ? RJ[2] : RJ[1];
    if ((Math.floor((x - VX) / Math.max(1, (y - VY)) * 6) + 100) % 4 === 0 && (x + y) % 3 === 0) c = RJ[2]; R.pset(x, y, c); }
  for (const a of [-2.2, -1.2, -0.5, 0.4, 1.4]) { let x = VX, y = VY + 2; for (let k = 0; k < 60; k++) { const nx = x + a * 3 + Math.sin(k) * 2, ny = y + 3; R.linea(Math.round(x), Math.round(y), Math.round(nx), Math.round(ny), k % 5 ? RJ[5] : RJ[6]); x = nx; y = ny; if (y > 179) break; } }
  // piedras sueltas con su sombra y el abismo de donde sale la mano (derecha)
  for (let k = 0; k < 16; k++) { const x = Math.floor(H(k, 41) * 300) + 10, y = 100 + Math.floor(H(k, 42) * 76), s = 1 + Math.floor((y - 90) / 30); R.rect(x, y, x + s * 2, y + s, K); R.rect(x, y, x + s * 2 - 1, y, RJ[4]); }
  R.poligono([[196, 150], [214, 140], [262, 138], [304, 144], [312, 156], [280, 164], [220, 162]], K);
  R.linea(214, 140, 262, 138, RJ[6]); R.linea(262, 138, 304, 144, RJ[6]); R.linea(196, 150, 214, 140, RJ[5]);
  // los estandartes de Doom (los anima la escena) tienen sus mástiles; restos de muro a la izquierda
  R.poligono([[0, 120], [10, 104], [20, 108], [24, 124], [0, 128]], RJ[1]); R.linea(10, 104, 20, 108, RJ[4]);
  R.usar(prev); return B3;
};
// la mano de luz roja de Mefisto (sin cara nunca): muñeca en (cx, by), cierre 0–1 (puño), retro: retrocede
const manoRoja = (cx, by, t, cierre) => {
  const fill = hex('#c82a2a'), lz = hex('#ff6a4a'), core = hex('#ffb08a'), ol = hex('#4a0a10');
  luz(cx, by - 60, 70, hex('#ff3a2a'), 0.35);
  const palma = [[cx - 20, by], [cx + 18, by], [cx + 24, by - 40], [cx + 18, by - 62], [cx - 22, by - 62], [cx - 26, by - 40]];
  R.poligono(palma.map(([x, y]) => [x - 1, y + 1]), ol); R.poligono(palma, fill);
  const dedos = [[-17, 30, 0], [-6, 38, 1], [5, 36, 2], [15, 28, 3]];
  for (const [dx, L, k] of dedos) { const sw = Math.sin(t * 1.6 + k) * 2 * (1 - cierre), x0 = cx + dx, y0 = by - 60, x1 = x0 + sw + cierre * (-dx * 0.2), y1 = y0 - L * (1 - 0.75 * cierre);
    for (let s = 0; s <= 1; s += 0.05) { const x = lerp(x0, x1, s), y = lerp(y0, y1, s); R.disco(Math.round(x), Math.round(y), 4, ol); }
    for (let s = 0; s <= 1; s += 0.05) { const x = lerp(x0, x1, s), y = lerp(y0, y1, s); R.disco(Math.round(x), Math.round(y), 3, fill); R.pset(Math.round(x) - 1, Math.round(y), lz); }
    R.disco(Math.round(x1), Math.round(y1) - 1, 2, lz); R.linea(Math.round(x0 - 1), y0 - 2, Math.round(x1 - 1), Math.round(y1), core); }
  // el pulgar
  { const x0 = cx - 24, y0 = by - 30, x1 = cx - 40 + cierre * 20, y1 = by - 52 + cierre * 4; for (let s = 0; s <= 1; s += 0.05) R.disco(Math.round(lerp(x0, x1, s)), Math.round(lerp(y0, y1, s)), 4, ol); for (let s = 0; s <= 1; s += 0.05) R.disco(Math.round(lerp(x0, x1, s)), Math.round(lerp(y0, y1, s)), 3, fill); R.linea(x0, y0 - 2, Math.round(x1), Math.round(y1) - 2, lz); }
  // la trama de luz dentro de la palma y las líneas
  for (let y = by - 58; y < by - 4; y++) for (let x = cx - 18; x < cx + 18; x++) if (bay(x, y) < 0.12 + 0.1 * Math.sin(t * 3 + y * 0.2)) R.pset(x, y, lz);
  R.linea(cx - 16, by - 34, cx + 12, by - 44, hex('#8a1a1a')); R.linea(cx - 12, by - 20, cx + 14, by - 28, hex('#8a1a1a'));
  for (let x = cx - 20; x < cx + 18; x++) R.pset(x, by - 1, ol);
};
// un robot de Doom pequeño (gris con el visor verde) que marcha
const robot = (x, suelo, t, k) => { const p = Math.floor(t * 5 + k) % 2, X = Math.round(x), Y = suelo;
  R.rect(X - 1, Y - 3, X + 1, Y, K); R.rect(X + 3, Y - 3, X + 5, Y, K); R.pset(X + (p ? 0 : 1), Y - 1, hex('#6a6e80')); R.pset(X + (p ? 5 : 4), Y - 1, hex('#6a6e80'));
  R.rect(X - 2, Y - 11, X + 6, Y - 3, K); R.rect(X - 1, Y - 10, X + 5, Y - 4, hex('#8a8e9a')); R.rect(X - 1, Y - 10, X + 5, Y - 9, hex('#a8acbc')); R.rect(X, Y - 7, X + 4, Y - 6, G[3]);
  R.rect(X - 1, Y - 16, X + 5, Y - 11, K); R.rect(X, Y - 15, X + 4, Y - 12, hex('#a8acbc')); R.rect(X + 1, Y - 14, X + 4, Y - 13, Math.sin(t * 4 + k) > 0 ? G[5] : G[4]); };
const estandarte = (x, top, t, k, col = G[3]) => { R.rect(x, top, x + 1, top + 40, K); R.pset(x, top - 1, hex('#e8c060'));
  for (let i = 0; i < 16; i++) { const ond = Math.round(Math.sin(t * 5 - i * 0.5 + k) * (i / 6)); R.linea(x + 2 + i, top + 1 + ond, x + 2 + i, top + 14 + ond - (i > 12 ? i - 12 : 0), i === 15 ? K : i % 4 === 0 ? G[2] : col); R.pset(x + 2 + i, top + ond, K); }
  R.pset(x + 8, top + 6 + Math.round(Math.sin(t * 5 - 3 + k) * 1.2), G[5]); };
const p3 = (t) => {
  R.copiar(fondo3());
  const ok = (x, y) => y < 70 && !(x > 274 && y < 48) && !(x < 172 && y < 22);
  nube(((t * 5 + 30) % 400) - 40, 40, 40, RJ[3], RJ[4], RJ[5], ok); nube(((t * 3 + 200) % 400) - 40, 56, 30, RJ[2], RJ[3], RJ[4], ok); nube(((t * 8 + 120) % 400) - 40, 30, 22, RJ[4], RJ[5], hex('#f08a4a'), ok);
  brasas(t, 16, 160, 320, 30, 160, RJ[7], RJ[6], 51);
  // LA MANO: abierta con la luz blanca (la madre) sobre la palma; en «took his mother» los dedos se cierran sobre ella;
  // con cada rayo de Doom, retrocede un poco
  const cierre = ease(tramo(t, tomo - 0.1, madre + 0.4)), rayos = [guerra + 0.25, guerra + 0.85, dentro - 0.1], golpe = Math.max(...rayos.map((a) => Math.max(0, 1 - Math.abs(t - a - 0.12) / 0.35)));
  const hx = 258 + Math.round(golpe * 6), hy = 150 + Math.round(Math.sin(t * 1.2) * 2);
  if (cierre < 0.9) { const by = hy - 70 - Math.sin(t * 3) * 2; luz(hx, by, 16, hex('#ffffff'), 0.6); R.disco(hx, Math.round(by), 4, hex('#fff8e8')); R.disco(hx, Math.round(by), 2, hex('#ffffff')); }
  manoRoja(hx, hy, t, cierre);
  if (cierre >= 0.9) { const g = 0.5 + 0.5 * Math.sin(t * 6); for (const [dx, dy] of [[-6, -64], [3, -66], [10, -62]]) { R.pset(hx + dx, hy + dy, hex('#ffffff')); if (g > 0.5) R.pset(hx + dx + 1, hy + dy, hex('#fff0d0')); } }
  // los estandartes de Doom y sus robots, que avanzan desde la izquierda
  estandarte(30, 92, t, 0); estandarte(118, 98, t, 2);
  for (let k = 0; k < 5; k++) { const x = lerp(-50, 40, tramo(t, P3, P4 - 0.6)) + k * 16 - (k % 2) * 4, s = 150 + (k % 2) * 8; robot(x, s, t, k); }
  // DOOM: delante de sus robots; en «waged war» alza los brazos y lanza tres rayos verdes a la mano
  const dx = Math.round(lerp(60, 92, ease(tramo(t, P3, guerra - 0.5)))), lanza = t > guerra - 0.1;
  const r = R.actor(EL.doom, dx, 158, t, { dir: 1, anda: t > P3 && t < guerra - 0.5, brazos: lanza, enfado: t > madre, sorpresa: t > tomo && t < madre + 0.3 });
  for (const a of rayos) { const u = tramo(t, a, a + 0.3); if (u <= 0 || u >= 1) continue; const x0 = dx + 15, y0 = 158 - 32, x1 = hx - 8, y1 = hy - 56;
    let px = x0, py = y0; for (let i = 1; i <= 12; i++) { const nx = lerp(x0, x1, i / 12 * Math.min(1, u * 2)), ny = lerp(y0, y1, i / 12 * Math.min(1, u * 2)) + (i < 12 ? (H(i, Math.floor(t * 15)) - 0.5) * 10 : 0);
      R.linea(Math.round(px), Math.round(py), Math.round(nx), Math.round(ny), G[3]); R.linea(Math.round(px), Math.round(py) - 1, Math.round(nx), Math.round(ny) - 1, G[6]); px = nx; py = ny; }
    if (u > 0.5) { luz(x1, y1, 18, G[5], 0.7 * (1 - u)); } luz(x0, y0, 10, G[5], 0.5); }
  // el polvo del suelo que levanta la tropa (delante)
  for (let k = 0; k < 10; k++) { const f = (t * 0.7 + k / 10) % 1; R.pset(Math.round(lerp(-30, 70, tramo(t, P3, P4)) + k * 9 + f * 8), Math.round(170 - f * 6), RJ[4]); }
};

// ══ 4 · EL TRONO: Mefisto se retira y Doom sube y se sienta (decorado infierno 'trono') ═════════════════════════════
const p4 = (t) => {
  const sube = tramo(t, entrega - 0.1, trono - 0.05), sentado = t >= trono - 0.05;
  const o = { encuadre: 'trono', mefisto: 1 - ease(tramo(t, salvarse, entrega + 0.3)), rey: sentado, sentado, verde: sentado ? 0.45 * tramo(t, trono, P5) : 0 };
  T.infierno(R, t, o);
  const anda = tramo(t, P4 + 0.1, salvarse - 0.4);
  let x = Math.round(lerp(26, 146, ease(anda))), suelo = 152;
  if (sube > 0) { x = Math.round(lerp(146, 153, sube)); suelo = Math.round(lerp(152, 126, ease(sube))); }
  const r = R.actor(EL.doom, x, suelo, t, { dir: 1, anda: (anda > 0 && anda < 1) || (sube > 0 && sube < 1), dedo: t > gano - 0.1 && t < gano + 1.0, enfado: t > salvarse - 0.4 && t < entrega });
  T.infiernoDelante(R, t, o);
  // LA CORONA: en «hand over» la mano la suelta; cae girando hasta la cabeza de Doom en «throne»
  const cae = tramo(t, entrega - 0.2, trono + 0.05), hx = r?.cabeza?.[0] ?? 160, hy = (r?.cabeza?.[1] ?? 100) - 8;
  if (cae > 0) { const cx = lerp(192, hx, ease(cae)), cy = lerp(50, hy - 4, cae * cae); if (cae < 1) luz(Math.round(cx), Math.round(cy) + 6, 12, hex('#ffe890'), 0.5); corona(cx, cy, 2); }
  else { const by = 50 + Math.sin(t * 2) * 2; luz(192, Math.round(by) + 6, 10, hex('#ffe890'), 0.35 * o.mefisto); if (o.mefisto > 0.3) corona(192, by, 2); }
  if (t > trono - 0.05 && t < trono + 0.5) luz(hx, hy + 14, 30, G[5], 0.5 * (1 - tramo(t, trono, trono + 0.5)));
  // Atom luciérnaga lo mira desde la columna de la derecha
  T.AT.luciernaga(R, 254 + Math.sin(t * 1.1) * 3, 112 + Math.sin(t * 1.9) * 3, t, { dir: -1, brillo: 0.6, cara: sentado ? 'sorpresa' : 'normal' });
};

// ══ 5 · LOS CONTRATOS: Doom rompe el suyo y todos arden en verde (infierno 'trono' / 'contratos') ═══════════════════
const p5 = (t) => {
  const o = { encuadre: 'trono', camara: 'contratos', rey: true, verde: 0.45 + 0.55 * tramo(t, rompe, libre + 0.3), contratos: tramo(t, rompe + 0.25, P6 - 0.2), almas: tramo(t, libre - 0.4, P6) };
  T.infierno(R, t, o);
  const entra = tramo(t, P5, primero + 0.3), x = Math.round(lerp(-14, 40, ease(entra))), roto = t > rompe;
  const r = R.actor(EL.doom, x, 152, t, { dir: 1, anda: entra > 0 && entra < 1, sostiene: !roto ? [x + 16, 128] : undefined, brazos: t > rompe + 0.35, enfado: t < rompe });
  // el contrato de su madre en la mano: lo mira y, en «tear up», lo parte en dos; las mitades vuelan ardiendo en verde
  if (!roto && r?.mano) { const [mx, my] = r.mano; pergamino(Math.round(mx) - 2, Math.round(my) - 10, 9, 12); }
  else { const u = tramo(t, rompe, rompe + 1.2); if (u < 1) for (const s of [-1, 1]) { const px = 58 + s * 16 * u + (s > 0 ? 6 : 0), py = 118 - 30 * u + Math.sin(u * 6) * 3;
      const w = Math.max(2, Math.round(8 * (1 - u * 0.8))), hh = Math.max(4, Math.round(16 * (1 - u * 0.6))); R.rect(Math.round(px), Math.round(py), Math.round(px) + w, Math.round(py) + hh, K); R.rect(Math.round(px) + 1, Math.round(py) + 1, Math.round(px) + w - 1, Math.round(py) + hh - 1, hex('#f2e6c0'));
      for (let j = 3; j < hh - 3; j += 2) R.linea(Math.round(px) + 2, Math.round(py) + j, Math.round(px) + w - 2, Math.round(py) + j, hex('#a89a78'));
      luz(Math.round(px) + 3, Math.round(py) + hh, 12, G[4], 0.7); for (let k = 0; k < w; k++) R.linea(Math.round(px) + k, Math.round(py) + hh, Math.round(px) + k, Math.round(py) + hh - 2 - Math.round(Math.abs(Math.sin(t * 12 + k)) * 4), k % 2 ? G[5] : G[4]); for (let k = 0; k < 5; k++) R.pset(Math.round(px + H(k, 3) * 6), Math.round(py + 12 - ((t * 3 + k / 5) % 1) * 10), k % 2 ? G[5] : G[4]); } }
  T.infiernoDelante(R, t, o);
};

// ══ 6 · EL POZO DE LUZ DE LA BÓVEDA: la luz de Valeria sube libre por el óculo ═══════════════════════════════════════
let B6 = null;
const OC = [206, 36, 24];
const fondo6 = () => {
  if (B6) return B6;
  B6 = R.nuevo(); const prev = R.usar(B6);
  const [ox, oy, orr] = OC;
  // la bóveda verde: piedra en anillos alrededor del óculo, con nervios que bajan
  for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - ox, (y - oy) * 1.3), a = Math.atan2(y - oy, x - ox);
    const anillo = Math.floor((d - orr) / 14), nerv = Math.abs(((a * 12 / Math.PI) % 1 + 1) % 1 - 0.5) < 0.04;
    const u = 3.2 - d / 90 + (anillo & 1) * 0.3; let c = [G[0], G[1], G[2], G[3]][cl(Math.floor(u + bay(x, y) - 0.5), 0, 3)];
    if ((d - orr) % 14 < 1.2 || nerv) c = G[0]; if (H(x >> 1, y >> 1, anillo) > 0.93) c = G[1]; R.pset(x, y, c); }
  // el marco del óculo (dovelas claras)
  for (let k = 0; k < 64; k++) { const a = k / 64 * Math.PI * 2; for (let r = orr; r < orr + 4; r++) R.pset(Math.round(ox + Math.cos(a) * r), Math.round(oy + Math.sin(a) * r / 1.3), k % 4 === 0 ? K : r === orr ? G[5] : G[3]); }
  // las columnas raíz a los lados (trenzadas), con su luz verde de filo
  for (const [x0, w] of [[8, 34], [70, 18], [262, 22], [300, 26]]) for (let y = 0; y < 150; y++) { const ens = y > 130 ? (y - 130) * 0.8 : 0; for (let x = x0 - ens; x < x0 + w + ens; x++) { const tr = Math.sin((x - x0) * 0.5 + y * 0.18) > 0.3;
    R.pset(Math.round(x), y, x < x0 - ens + 1 ? K : x > x0 + w + ens - 2 ? G[3] : tr ? hex('#1e3a26') : hex('#122a1a')); } }
  // el trono, al fondo, ya verde, y su escalinata
  R.poligono([[190, 140], [194, 108], [198, 112], [202, 102], [206, 110], [210, 102], [214, 112], [218, 108], [222, 140]], K); R.poligono([[193, 138], [196, 112], [206, 114], [216, 112], [219, 138]], G[2]); R.rect(196, 124, 216, 128, G[3]);
  for (let k = 0; k < 4; k++) { R.rect(180 - k * 6, 140 + k * 3, 232 + k * 6, 142 + k * 3, K); R.rect(181 - k * 6, 140 + k * 3, 231 + k * 6, 140 + k * 3, G[3]); }
  // el suelo de obsidiana con su reflejo y juntas en perspectiva
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const d = (y - 150) / 30, junta = Math.abs(((x - 206) / (y - 120) * 3) % 1) < 0.06 || (y % 7 === 0);
    R.pset(x, y, junta ? G[1] : H(x >> 2, y, 6) > 0.85 ? hex('#1a3a24') : d > 0.6 ? hex('#0a1c10') : hex('#0e2416')); }
  for (let y = 140; y < 152; y++) for (let x = 0; x < 320; x++) if (x < 170 || x > 242) R.pset(x, y, y === 140 ? G[3] : (x % 24 === 0 || y === 146) ? G[1] : hex('#0e2416'));
  // charcos de luz verde en el suelo, grietas y el reflejo de las columnas
  for (const [cx, cy, rx] of [[60, 166, 16], [262, 170, 20], [150, 176, 12]]) for (let j = -3; j <= 3; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / 3) ** 2 <= 1) R.pset(cx + i, cy + j, Math.abs(j) === 3 || Math.abs(i) > rx - 2 ? G[2] : (i + j) % 5 ? G[3] : G[4]);
  for (const [x0, y0] of [[96, 154], [300, 158], [20, 150]]) { let x = x0, y = y0; for (let k = 0; k < 8; k++) { const nx = x + (H(k, x0) - 0.5) * 8, ny = y + 3; R.linea(Math.round(x), y, Math.round(nx), ny, G[3]); x = nx; y = ny; } }
  for (const [x0, w] of [[8, 34], [70, 18], [262, 22], [300, 26]]) for (let y = 152; y < 180; y += 2) for (let x = x0; x < x0 + w; x += 3) if (bay(x, y) < 0.3 * (1 - (y - 152) / 28)) R.pset(x, y, hex('#1e3a26'));
  R.usar(prev); return B6;
};
const p6 = (t) => {
  R.copiar(fondo6());
  const [ox, oy, orr] = OC;
  // por el óculo, el cielo de noche con estrellas que titilan y una nube que pasa
  R.recorte([ox - orr, oy - orr, ox + orr, oy + orr]);
  for (let y = oy - orr; y <= oy + orr; y++) for (let x = ox - orr; x <= ox + orr; x++) if (Math.hypot(x - ox, (y - oy) * 1.3) < orr) R.pset(x, y, y < oy - 6 ? hex('#0a1030') : hex('#121a44'));
  for (let k = 0; k < 18; k++) { const x = ox - orr + Math.floor(H(k, 61) * orr * 2), y = oy - orr + Math.floor(H(k, 62) * orr * 2); if (Math.hypot(x - ox, (y - oy) * 1.3) < orr - 1) R.pset(x, y, Math.sin(t * 3 + k) > 0 ? hex('#ffffff') : hex('#8a9ad8')); }
  nube(ox - 40 + ((t * 6) % 90), oy + 6, 14, hex('#1a2250'), hex('#242e60'), hex('#30407a'), (x, y) => Math.hypot(x - ox, (y - oy) * 1.3) < orr);
  R.recorte(null);
  // el haz de luz verde que baja del óculo al suelo
  const sube = ease(tramo(t, valeria - 0.3, P7 - 0.3));
  for (let y = oy + 18; y < 152; y++) { const w = 10 + (y - oy) * 0.28; for (let x = Math.round(ox - w); x <= Math.round(ox + w); x++) if (bay(x, y + Math.floor(t * 8)) < 0.14 + 0.1 * sube) R.pset(x, y, G[4]); }
  // dos faroles colgados de cadenas, con llama verde, que se mecen
  for (const [x0, len, k] of [[120, 64, 0], [160, 40, 1]]) { const a = Math.sin(t * 1.3 + k * 2) * 0.12, lx = Math.round(x0 + Math.sin(a) * len), ly = Math.round(Math.cos(a) * len) + 14;
    for (let i = 0; i < len; i += 2) R.pset(Math.round(x0 + Math.sin(a) * i), 14 + Math.round(Math.cos(a) * i), K);
    R.rect(lx - 3, ly, lx + 3, ly + 7, K); R.rect(lx - 2, ly + 1, lx + 2, ly + 6, G[2]); R.rect(lx - 1, ly + 2, lx + 1, ly + 5 - (Math.sin(t * 9 + k) > 0 ? 1 : 0), G[5]); R.poligono([[lx - 4, ly], [lx, ly - 3], [lx + 4, ly]], K); luz(lx, ly + 4, 12, G[4], 0.3); }
  // almas pequeñas que suben libres por toda la sala
  for (let k = 0; k < 16; k++) { const f = (t * (0.18 + H(k, 63) * 0.12) + H(k, 64)) % 1, x = 30 + H(k, 65) * 260 + Math.sin(t * 2 + k) * 3, y = 160 - f * 140; if (x > 274 && y < 48) continue; R.disco(Math.round(x), Math.round(y), 1, G[4]); R.pset(Math.round(x), Math.round(y), G[6]); }
  // VALERIA: una mujer de luz verde sale del trono en «Valyria» y sube por el haz hasta salir por el óculo
  const ap = tramo(t, valeria - 0.3, valeria + 0.2), vy = lerp(112, oy - 14, sube), sc = lerp(1.5, 0.7, sube);
  if (ap > 0 && vy > oy - orr + 2) almaMujer(ox, vy, sc, ap * (1 - tramo(t, P7 - 0.6, P7 - 0.1) * 0.5), t);
  // Doom, abajo y de espaldas a nosotros, alza la mano hacia ella; en «sacrificed» baja la cabeza
  const r = R.actor(EL.doom, 128, 166, t, { dir: 1, dedo: t > valeria && t < sacrifico, triste: t > sacrifico });
  luz(136, 150, 22, G[4], 0.25 + 0.2 * sube);
};

// ══ 7 · LA CORDILLERA NEVADA DE NOCHE, DE LEJOS: el padre y el niño ═══════════════════════════════════════════════
let B7 = null;
const LADERA7 = (x) => Math.round(176 - x * 0.2 + Math.sin(x * 0.05) * 3);
const fondo7 = () => {
  if (B7) return B7;
  B7 = R.nuevo(); const prev = R.usar(B7);
  const CI = ['#0a0e24', '#121a3a', '#1c2852', '#2a3a6a', '#3a4c7e'].map(hex);
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) R.pset(x, y, CI[cl(Math.floor(y / 110 * 4.6 + bay(x, y) - 0.5), 0, 4)]);
  for (let k = 0; k < 120; k++) { const x = Math.floor(H(k, 71) * 320), y = Math.floor(H(k, 72) * 80); if (x > 276 && y < 46) continue; R.pset(x, y, H(k, 73) > 0.6 ? hex('#e8ecff') : hex('#8a96c8')); }
  // la luna con su halo y sus manchas
  for (let j = -18; j <= 18; j++) for (let i = -18; i <= 18; i++) { const d = Math.hypot(i, j); if (d < 18 && d > 10 && bay(i + 230, j) < (18 - d) / 14) R.pset(230 + i, 34 + j, hex('#3a4c7e')); }
  R.disco(230, 34, 9, K); R.disco(230, 34, 8, hex('#f0f0e0')); R.disco(227, 32, 2, hex('#c8c8b8')); R.disco(233, 37, 1, hex('#c8c8b8'));
  // la cordillera lejana: tres términos con sus cumbres nevadas
  const filas = [[96, '#2e3a62', '#c8d2ea', '#e8eef8', 31, 46], [110, '#222c50', '#a8b4d0', '#d0d8ec', 47, 30], [124, '#18203e', '#8a96b8', '#b8c4dc', 59, 20]];
  for (const [base, col, niev, nievL, sd, alt] of filas) { const picos = Array.from({ length: 8 }, (_, k) => [k * 46 + H(k, sd) * 36 - 14, alt * (0.5 + H(k, sd + 1) * 0.5), 24 + H(k, sd + 2) * 22]);
    const hs = new Float32Array(321); for (let x = 0; x <= 320; x++) { let h = base; for (const [px, al, w] of picos) h = Math.min(h, base - al * Math.max(0, 1 - Math.abs(x - px) / w)); hs[x] = Math.round(h + (H(x >> 1, sd) - 0.5) * 2); }
    for (let x = 0; x < 320; x++) { const h = hs[x], alto = base - h, luzL = hs[x + 1] >= h;
      for (let y = h; y < 140; y++) { const nieve = alto > 10 && (y - h) < alto * 0.42 + (H(x, y, sd) > 0.6 ? 2 : 0); let c = nieve ? (luzL ? nievL : niev) : col;
        if (!nieve && H(x >> 1, y >> 1, sd) > 0.9) c = mezcla(hex(col), hex('#000010'), 0.25); if (!nieve && (y - h) % 9 === 0 && luzL) c = mezcla(hex(col), hex(niev), 0.25); R.pset(x, y, typeof c === 'string' ? hex(c) : c); }
      R.pset(x, h, hex(nievL)); } }
  // el valle con pinos oscuros en filas
  for (let k = 0; k < 70; k++) { const x = Math.floor(H(k, 74) * 330) - 5, y = 120 + Math.floor(H(k, 75) * 30), h = 6 + Math.floor(H(k, 76) * 6);
    R.poligono([[x - 3, y], [x, y - h], [x + 3, y]], hex('#0e1a1e')); R.pset(x, y - h + 2, hex('#a8b4c8')); }
  // la ladera de primer término, nevada, que sube hacia la derecha, con ventisqueros
  for (let x = 0; x < 320; x++) { const l = LADERA7(x); for (let y = l; y < 180; y++) R.pset(x, y, y === l ? hex('#ffffff') : H(x >> 2, y >> 1, 7) > 0.86 ? NVS : y - l > 12 && (x + y) % 5 === 0 ? NVM : NV); }
  for (const [x, w] of [[30, 20], [150, 26], [270, 18], [210, 14], [100, 12]]) for (let i = -w; i <= w; i++) { const y = LADERA7(x + i) + 8 + Math.round(Math.abs(i) * 0.15) + (x % 3) * 4; R.linea(x + i, y, x + i, y + 1, NVS); R.pset(x + i, y - 1, hex('#ffffff')); }
  // la senda de piedras que marca el camino, los postes de una cerca caída, rocas con su gorro de nieve y pinitos en la ladera
  for (let k = 0; k < 9; k++) { const x = 96 + k * 20, y = LADERA7(x) + 3; R.rect(x, y - 6, x + 1, y, hex('#3a2a20')); R.pset(x, y - 7, NV); if (k % 2) R.linea(x + 1, y - 4, x + 19, LADERA7(x + 20) - 1, hex('#5a4a3a')); }
  for (const [x, dy, w] of [[132, 14, 9], [228, 20, 12], [292, 8, 7], [70, 22, 8]]) { const y = LADERA7(x) + dy; R.poligono([[x - w, y + 4], [x - w + 2, y - 2], [x, y - 5], [x + w - 2, y - 2], [x + w, y + 4]], hex('#4a4a5a')); R.poligono([[x - w + 2, y - 2], [x, y - 5], [x + w - 2, y - 2], [x + 2, y - 1]], NV); R.pset(x - 2, y + 1, hex('#6a6a7a')); }
  for (const [x, h] of [[250, 16], [262, 11], [300, 20], [196, 9]]) { const b = LADERA7(x) + 2; R.rect(x, b - 3, x + 1, b, hex('#3a2418')); for (let j = 0; j < h; j++) { const w = Math.round((h - j) * 0.35 + (j % 5 < 2 ? 1 : 0)); R.linea(x - w, b - 3 - j, x + 1 + w, b - 3 - j, j % 5 === 0 ? NVM : hex('#14261c')); } }
  // dos pinos grandes de primer término a la izquierda, con nieve
  for (const [x, b, h] of [[18, 172, 46], [48, 170, 34]]) { R.rect(x - 1, b - 6, x + 1, b, hex('#3a2418')); for (let j = 0; j < h; j++) { const w = Math.round((h - j) * 0.32 + (j % 6 < 2 ? 2 : 0)); R.linea(x - w, b - 6 - j, x + w, b - 6 - j, j % 6 === 0 ? NVM : hex('#14261c')); } }
  R.usar(prev); return B7;
};
// el padre diminuto con el niño en brazos (de lejos, ~12 px)
const padreLejos = (x, y, t, anda) => { const X = Math.round(x), Y = Math.round(y), p = anda ? Math.floor(t * 4) % 2 : 0;
  R.rect(X - 2, Y - 3, X - 1, Y, K); R.rect(X + 1, Y - 3, X + 2, Y, K); if (p) R.pset(X + 2, Y - 1, NV); else R.pset(X - 2, Y - 1, NV);
  R.rect(X - 3, Y - 11, X + 3, Y - 3, K); R.rect(X - 2, Y - 10, X + 2, Y - 4, ABR); R.disco(X, Y - 13, 2, K); R.pset(X, Y - 13, PIEL);
  R.rect(X + 2, Y - 10, X + 5, Y - 7, K); R.rect(X + 3, Y - 9, X + 4, Y - 8, hex('#3a3046')); R.linea(X - 3, Y - 12, X - 6 - Math.round(Math.sin(t * 9)), Y - 11, BUF); };
const p7 = (t) => {
  R.copiar(fondo7());
  const ok = (x, y) => y < 84 && !(x > 274 && y < 48) && !(x < 172 && y < 22);
  nube(((t * 4 + 60) % 400) - 40, 56, 40, hex('#1c2852'), hex('#2a3a6a'), hex('#3a4c7e'), ok);
  nube(((t * 7 + 250) % 400) - 40, 40, 26, hex('#2a3a6a'), hex('#3a4c7e'), hex('#56689a'), ok);
  // las antorchas que buscan, muy lejos, en la otra loma
  for (let k = 0; k < 4; k++) { const x = 300 - ((t * 3 + k * 14) % 90), y = 118 + Math.sin(x * 0.1) * 2; R.pset(Math.round(x), Math.round(y), hex('#ffb040')); R.pset(Math.round(x), Math.round(y) - 1, hex('#ffe890')); luz(x, y, 4, hex('#ff9a30'), 0.4); }
  // EL PADRE Y EL NIÑO suben la ladera; las huellas detrás
  const u = tramo(t, P7, P8), px = lerp(92, 176, u), py = LADERA7(Math.round(px)) - 1;
  for (let k = 1; k < 12; k++) { const hx = px - k * 6; if (hx < 88) break; R.pset(Math.round(hx), LADERA7(Math.round(hx)) + (k % 2), NVS); }
  padreLejos(px, py, t, true);
  // Atom luciérnaga llega volando en «coat?», los alumbra y en «right there» los rodea con la órbita
  const va = ease(tramo(t, P7, abrigo + 0.2)), ax = lerp(-10, px - 22, va), ay = lerp(70, py - 30, va) + Math.sin(t * 2) * 2;
  luz(px, py - 8, 18, hex('#fff0b0'), 0.35 * tramo(t, abrigo, abrigo + 0.6));
  const rodea = tramo(t, ahi - 0.2, ahi + 0.5); if (rodea > 0) T.AT.anillo(R, Math.round(px), Math.round(py - 8), 16, 12, t, rodea);
  T.AT.luciernaga(R, ax, ay, t, { dir: 1, brillo: 0.8, cara: t > abrigo ? 'triste' : 'normal' });
  // la nieve que cae en tres capas
  copos(t, 40, 0.12, -0.6, hex('#8a96c8'), 1, 3); copos(t, 30, 0.2, -1, hex('#c8d2ea'), 1, 4); copos(t, 14, 0.32, -1.4, hex('#ffffff'), 2, 5);
};

// ══ 8 · EL PINO SOLO EN LA LOMA: el padre se quita el abrigo y envuelve al niño ════════════════════════════════════
let B8 = null;
const fondo8 = () => {
  if (B8) return B8;
  B8 = R.nuevo(); const prev = R.usar(B8);
  const CI = ['#141a30', '#1c2440', '#283252', '#36405e', '#46506c'].map(hex);
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) R.pset(x, y, CI[cl(Math.floor(y / 120 * 4.4 + Math.sin(x * 0.02) * 0.3 + bay(x, y) - 0.5), 0, 4)]);
  // la sierra lejana, gris azulada, con nieve en las cumbres
  for (let x = 0; x < 320; x++) { const h = Math.round(98 - Math.abs(Math.sin(x * 0.03 + 1)) * 16 - (H(x >> 3, 4) - 0.5) * 3); for (let y = h; y < 120; y++) R.pset(x, y, y - h < 4 && (x + y) % 2 ? hex('#8a96b8') : hex('#2a3454')); }
  // el valle de abajo a la izquierda: el pueblo lejano con ventanitas
  for (let x = 0; x < 200; x++) { const h = Math.round(116 + Math.sin(x * 0.05) * 3); for (let y = h; y < 140; y++) R.pset(x, y, y === h ? hex('#5a6488') : hex('#222a46')); }
  for (let k = 0; k < 14; k++) { const x = 20 + k * 11 + Math.floor(H(k, 81) * 5), y = 122 + Math.floor(H(k, 82) * 8); R.rect(x, y, x + 5, y + 4, hex('#1a1e30')); R.poligono([[x - 1, y], [x + 2, y - 3], [x + 6, y]], hex('#c8d2e2')); if (k % 3) R.pset(x + 2, y + 2, hex('#ffc860')); }
  // la loma nevada en primer término: sube de izquierda a derecha, con matas y piedras
  for (let x = 0; x < 320; x++) { const l = Math.round(150 - Math.max(0, x - 120) * 0.12 + Math.sin(x * 0.08) * 1.5); for (let y = l; y < 180; y++) R.pset(x, y, y === l ? hex('#ffffff') : H(x >> 2, y >> 1, 8) > 0.86 ? NVS : (x + y * 2) % 9 === 0 ? NVM : NV); }
  for (const [x, y] of [[40, 164], [96, 172], [300, 160], [210, 170]]) { R.rect(x, y, x + 6, y + 3, hex('#5a5a66')); R.rect(x, y, x + 6, y, NV); R.pset(x + 1, y + 1, hex('#8a8a94')); }
  for (let k = 0; k < 7; k++) { const x = 8 + k * 14, y = 160 + (k % 2); R.rect(x, y - 10 + (k === 3 ? 4 : 0), x + 1, y, hex('#3a2a20')); R.pset(x, y - 11 + (k === 3 ? 4 : 0), NV); if (k < 6 && k !== 2) { R.linea(x + 1, y - 7, x + 14, y - 6, hex('#5a4a3a')); R.linea(x + 1, y - 3, x + 14, y - 3, hex('#5a4a3a')); } }
  for (const [x0, y0, w] of [[110, 168, 40], [200, 174, 50], [20, 176, 30]]) for (let i = 0; i < w; i++) { const y = y0 - Math.round(Math.sin(i / w * Math.PI) * 3); R.pset(x0 + i, y, hex('#ffffff')); R.pset(x0 + i, y + 1, NVS); }
  for (const [x, y] of [[70, 152], [130, 154], [282, 142]]) for (let k = 0; k < 5; k++) R.linea(x + k * 2, y, x + k * 2 + (k - 2), y - 4 - (k % 2), hex('#5a4a3a'));
  // EL PINO SOLO, grande, con nieve en sus ramas
  const bx = 252, b = 140, h = 92;
  R.rect(bx - 3, b - 12, bx + 3, b, K); R.rect(bx - 2, b - 12, bx + 2, b, hex('#4a2e1c')); R.rect(bx - 2, b - 12, bx - 2, b, hex('#6a4428'));
  for (let i = 0; i < 7; i++) { const ty = b - 10 - i * 12, w = 34 - i * 4.4, hg = 20, dx = (i % 2 ? 2 : -2);
    const pts = [[bx - w + dx, ty + 3], [bx - w * 0.55, ty - 2], [bx - w * 0.3, ty + 1], [bx, ty - hg], [bx + w * 0.3, ty + 2], [bx + w * 0.6, ty - 1], [bx + w + dx, ty + 4], [bx, ty + 1]].map(([x, y]) => [Math.round(x), Math.round(y)]);
    R.poligono(pts.map(([x, y]) => [x, y + 1]), K); R.poligono(pts, i % 2 ? hex('#1c3424') : hex('#18301f'));
    for (let k = 0; k < w * 1.2; k++) { const xx = Math.round(bx - w * 0.8 + H(k, i) * w * 1.6), yy = Math.round(ty - 1 - H(k, i + 9) * hg * 0.7); if (dentroPol(pts, xx + 0.5, yy + 0.5)) R.pset(xx, yy, hex('#2a4a34')); }
    R.poligono([[Math.round(bx - w * 0.75), ty - 1], [bx, ty - hg], [Math.round(bx + w * 0.7), ty], [Math.round(bx + w * 0.35), ty - 3], [bx, ty - hg + 7], [Math.round(bx - w * 0.35), ty - 4]], NV);
    R.linea(bx - Math.round(w * 0.75), ty - 1, bx, ty - hg, hex('#ffffff')); R.linea(bx + 1, ty - hg + 2, Math.round(bx + w * 0.7), ty, NVS); }
  R.usar(prev); return B8;
};
// el niño en brazos del padre, en la mano (mx, my) (como en el gancho)
const nene = (mx, my, dir) => { const bx = mx - 3 * dir;
  R.disco(bx, my - 3, 4, K); R.rect(bx - 5, my - 5, bx + 5, my - 1, K); R.rect(bx - 4, my - 5, bx + 4, my - 2, ABR); R.rect(bx - 4, my - 2, bx + 4, my - 2, ABRS);
  const px = bx - 6 * dir; R.rect(Math.min(px, px + dir), my - 3, Math.max(px, px + dir), my + 2, K);
  const hx = bx + 5 * dir, hy = my - 7; R.disco(hx, hy, 3, K); R.disco(hx, hy, 2, hex('#1c1424')); R.pset(hx, hy - 1, hex('#3a3046')); };
const p8 = (t) => {
  R.copiar(fondo8());
  const ok = (x, y) => y < 100 && !(x > 274 && y < 48) && !(x < 172 && y < 22);
  nube(((t * 9 + 20) % 400) - 40, 40, 50, hex('#2a3452'), hex('#3a4664'), hex('#56627e'), ok); nube(((t * 5 + 220) % 400) - 40, 66, 34, hex('#36405e'), hex('#4a5676'), hex('#6a7690'), ok); nube(((t * 13 + 140) % 400) - 40, 28, 24, hex('#3a4664'), hex('#56627e'), hex('#7a86a0'), ok);
  for (let k = 0; k < 3; k++) { const x = ((t * (10 + k * 3) + k * 70) % 260) + 20, y = 52 + k * 7 + Math.sin(t * 3 + k) * 2; R.pset(Math.round(x), Math.round(y), K); R.pset(Math.round(x) - 1, Math.round(y) - (Math.sin(t * 12 + k) > 0 ? 1 : 0), K); R.pset(Math.round(x) + 1, Math.round(y) - (Math.sin(t * 12 + k) > 0 ? 1 : 0), K); }
  // las huellas que deja Werner en la nieve
  { const xe = lerp(-16, 150, ease(tramo(t, P8, peor - 0.1))); for (let k = 0; k < 14; k++) { const hx = xe + 4 - k * 9; if (hx < 0) break; R.rect(Math.round(hx), 156 + (k % 2) * 2, Math.round(hx) + 2, 157 + (k % 2) * 2, NVS); } }
  // las antorchas que suben por el valle, lejos
  for (let k = 0; k < 4; k++) { const x = 20 + ((t * 4 + k * 22) % 120), y = 132 - (x - 20) * 0.06; luz(x, y, 5, hex('#ff9a30'), 0.5); R.pset(Math.round(x), Math.round(y), hex('#ffe890')); }
  // WERNER llega con el niño en brazos; se para en «worst night», lo deja en la nieve, tiembla; en «gave his son» se
  // quita el abrigo y lo envuelve despacio; queda sin abrigo bajo la nieve
  const entra = tramo(t, P8, peor - 0.1), x = Math.round(lerp(-16, 150, ease(entra))), deja = t > peor + 0.3, sinAbrigo = t > dio;
  const pal = sinAbrigo ? { C: hex('#c8b890'), c: hex('#9a8a6a'), u: hex('#b8a880') } : undefined, tiembla = deja && Math.floor(t * 14) % 2 ? 1 : 0;
  const wrap = tramo(t, dio + 0.25, queda + 0.3);
  if (deja) { const rn = R.actor(T.VD.victorNinoVD, 170 + (wrap < 1 && Math.floor(t * 16) % 2 ? 1 : 0), 154, t, { dir: -1, triste: wrap < 1, sonrisa: wrap >= 1 && t > queda + 0.6 });
    if (wrap > 0) { const hx = rn.cabeza[0], hy = rn.cabeza[1] + 5, xl = hx - 12, xr = Math.round(xl + 25 * wrap);
      R.recorte([xl, 0, xr, 179]);
      const pts = [[hx - 5, hy + 6], [hx - 9, hy + 10], [hx - 10, 148], [hx - 12, 155], [hx + 12, 155], [hx + 10, 148], [hx + 9, hy + 10], [hx + 5, hy + 6]];
      R.poligono(pts, K); R.poligono(pts.map(([px, py]) => [px + (px < hx ? 1 : -1), py + (py > 152 ? -1 : 1)]), ABR);
      R.poligono([[hx - 8, hy + 11], [hx - 3, hy + 11], [hx - 5, 153], [hx - 10, 153]], ABRL);
      for (const dx of [-2, 3, 7]) R.linea(hx + dx, hy + 14, hx + dx + (dx > 0 ? 1 : -1), 152, ABRS);
      R.linea(hx, hy + 11, hx + 1, 153, K); for (const yy of [hy + 15, hy + 21]) R.pset(hx + 2, yy, hex('#c8a040'));
      R.rect(hx - 7, hy + 7, hx + 7, hy + 9, K); R.rect(hx - 6, hy + 7, hx + 6, hy + 8, BUF); R.rect(hx + 4, hy + 9, hx + 6, hy + 16, BUF);
      R.recorte(null); } }
  const tiene = sinAbrigo && t < dio + 0.25;
  const r = R.actor(T.VD.wernerVD, x + tiembla, 155, t, { dir: 1, anda: entra > 0 && entra < 1, pal, sostiene: !deja ? [x + 13, 140] : tiene ? [x + 15, 138] : t > dio + 0.25 && wrap < 1 ? [x + 17, 140] : undefined, triste: t > peor - 0.2, sorpresa: false });
  if (!deja && r?.mano) nene(r.mano[0], r.mano[1], 1);
  if (tiene && r?.mano) { const [mx, my] = r.mano; R.poligono([[mx - 3, my], [mx + 3, my], [mx + 5, my + 14], [mx - 4, my + 14]], K); R.poligono([[mx - 2, my + 1], [mx + 2, my + 1], [mx + 4, my + 13], [mx - 3, my + 13]], ABR); R.linea(mx - 2, my + 1, mx + 2, my + 1, BUF); }
  // su aliento de vapor, cada poco
  if (deja) { const f = (t * 0.8) % 1; if (f < 0.4) for (let k = 0; k < 3; k++) R.pset(Math.round((r?.cabeza?.[0] ?? x + 7) + 5 + f * 10 + k), Math.round((r?.cabeza?.[1] ?? 130) + 4 - f * 4), NVM); }
  const lz = tramo(t, queda, queda + 1); if (lz > 0) luz(178, 136, 26, hex('#ffe8c0'), 0.3 * lz);
  // la ventisca que pasa en tres capas, con una racha en «gave»
  const racha = 1 + 1.5 * Math.max(0, 1 - Math.abs(t - dio) / 0.8);
  copos(t, 40, 0.16, -1.2 * racha, hex('#a8b4c8'), 1, 6); copos(t, 30, 0.26, -1.8 * racha, hex('#e8ecf4'), 1, 7); copos(t, 12, 0.4, -2.4 * racha, hex('#ffffff'), 2, 8);
};

// ══ 9 · LA CALLE NEVADA DE DOOMSTADT DE NOCHE: Doom echa su capa sobre la niña ═══════════════════════════════════
let B9 = null;
const fondo9 = () => {
  if (B9) return B9;
  B9 = R.nuevo(); const prev = R.usar(B9);
  const CI = ['#0c1022', '#141a34', '#1e2648', '#2a345c'].map(hex);
  for (let y = 0; y < 90; y++) for (let x = 0; x < 320; x++) R.pset(x, y, CI[cl(Math.floor(y / 86 * 3.6 + bay(x, y) - 0.5), 0, 3)]);
  for (let k = 0; k < 60; k++) { const x = Math.floor(H(k, 91) * 320), y = Math.floor(H(k, 92) * 60); if (x > 276 && y < 46) continue; R.pset(x, y, hex('#c8d2ff')); }
  // el castillo en su colina, al fondo, con ventanas verdes
  R.poligono([[150, 92], [176, 66], [230, 62], [262, 92]], hex('#161c30'));
  for (const [x, w, top] of [[184, 12, 40], [204, 16, 32], [228, 10, 44]]) { R.rect(x, top, x + w, 70, hex('#20263c')); for (let i = 0; i <= w; i += 3) R.rect(x + i, top - 3, x + i + 1, top, hex('#20263c')); R.rect(x + 3, top + 8, x + 4, top + 11, G[4]); }
  R.rect(212, 20, 212, 32, K);
  // la fila de casas: entramado de madera, tejados con nieve, ventanas cálidas, puertas
  const casas = [[0, 46, 74, '#8a6a4a'], [48, 52, 82, '#6a5a6a'], [102, 44, 70, '#7a5a3a'], [148, 58, 86, '#5a6a6a'], [208, 50, 76, '#8a5a4a'], [260, 60, 80, '#6a5a4a']];
  for (const [x0, w, top, col] of casas) { R.rect(x0, top, x0 + w, 140, K); R.rect(x0 + 1, top + 1, x0 + w - 1, 140, hex(col));
    for (let y = top + 1; y < 140; y++) for (let x = x0 + 1; x < x0 + w; x++) if (H(x >> 1, y >> 1, x0) > 0.9) R.pset(x, y, mezcla(hex(col), K, 0.2));
    for (let x = x0 + 4; x < x0 + w; x += 12) R.rect(x, top + 2, x + 1, 140, hex('#3a2418')); R.rect(x0 + 1, top + 20, x0 + w - 1, top + 21, hex('#3a2418'));
    R.poligono([[x0 - 4, top + 1], [x0 + w / 2, top - 22], [x0 + w + 4, top + 1]], K); R.poligono([[x0 - 2, top], [x0 + w / 2, top - 20], [x0 + w + 2, top]], hex('#5a3a3a'));
    R.poligono([[x0 - 2, top], [x0 + w / 2, top - 20], [x0 + w / 2 + 3, top - 18], [x0 + 3, top]], NV); R.linea(x0 - 3, top + 1, x0 + w + 3, top + 1, NVM);
    for (let k = 0; k < 2; k++) { const wx = x0 + 6 + k * Math.round(w / 2), wy = top + 26; R.rect(wx, wy, wx + 9, wy + 10, K); R.rect(wx + 1, wy + 1, wx + 8, wy + 9, (x0 + k) % 3 ? hex('#ffc860') : hex('#2a2a3a')); R.linea(wx + 4, wy + 1, wx + 4, wy + 9, K); R.linea(wx + 1, wy + 5, wx + 8, wy + 5, K); R.rect(wx - 1, wy + 10, wx + 10, wy + 11, NV); }
    R.rect(x0 + w - 14, 116, x0 + w - 5, 140, K); R.rect(x0 + w - 13, 117, x0 + w - 6, 140, hex('#3a2418')); R.pset(x0 + w - 7, 128, hex('#e8c060')); }
  R.rect(28, 30, 34, 52, K); R.rect(29, 31, 33, 52, hex('#5a4a4a')); R.rect(178, 40, 184, 66, K); R.rect(179, 41, 183, 66, hex('#5a4a4a'));
  // la calle nevada, con roderas y adoquines que asoman
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const rod = Math.abs(y - 160 - (x % 3)) < 1 || Math.abs(y - 170) < 1; R.pset(x, y, y === 140 ? NVS : rod ? NVS : H(x >> 2, y >> 1, 9) > 0.92 ? hex('#6a6a7a') : H(x, y, 10) > 0.9 ? NVM : NV); }
  // la farola, la valla con el gato y un barril
  R.rect(232, 92, 234, 152, K); R.rect(226, 84, 240, 92, K); R.rect(228, 86, 238, 91, hex('#ffe8a0')); R.poligono([[224, 84], [233, 78], [242, 84]], K); R.rect(229, 150, 237, 153, K);
  for (let x = 280; x < 320; x += 6) { R.rect(x, 130, x + 2, 152, K); R.rect(x + 1, 131, x + 1, 152, hex('#6a4a2a')); } R.rect(278, 136, 319, 137, hex('#5a3a22')); R.rect(278, 144, 319, 145, hex('#5a3a22'));
  R.rect(14, 136, 30, 154, K); R.rect(15, 137, 29, 153, hex('#7a4a2a')); R.rect(15, 140, 29, 141, hex('#4a4a54')); R.rect(15, 148, 29, 149, hex('#4a4a54')); R.rect(15, 137, 29, 138, NV);
  R.usar(prev); return B9;
};
const p9 = (t) => {
  R.copiar(fondo9());
  // el humo de las chimeneas, la luz de la farola que tiembla y una ventana que se enciende
  for (const [cx, cy] of [[31, 28], [181, 38]]) for (let k = 0; k < 6; k++) { const f = (t * 0.3 + k / 6) % 1; R.disco(Math.round(cx + f * 14 + Math.sin(t + k) * 2), Math.round(cy - f * 22), 1 + Math.round(f * 2), mezcla(hex('#3a4060'), hex('#6a7090'), 1 - f)); }
  luz(233, 96, 34, hex('#ffd890'), 0.3 + 0.04 * Math.sin(t * 9));
  if (t > igual + 0.6) { R.rect(165, 109, 172, 117, hex('#ffc860')); R.linea(168, 109, 168, 117, K); }
  // el gato de la valla mueve la cola
  { const gx = 296, gy = 129; R.rect(gx, gy - 4, gx + 6, gy, K); R.disco(gx + 6, gy - 5, 2, K); R.pset(gx + 5, gy - 8, K); R.pset(gx + 7, gy - 8, K); R.pset(gx + 6, gy - 5, hex('#e8e060'));
    const c = Math.round(Math.sin(t * 3) * 2); R.linea(gx, gy - 2, gx - 3, gy - 6 + c, K); }
  // la niña junto a la farola, tiritando
  const tapa = tramo(t, igual, igual + 0.9), tirita = tapa < 1 && Math.floor(t * 14) % 2 ? 1 : 0;
  const rn = R.actor(T.VD.valeriaNinaVD, 206 + tirita, 156, t, { dir: -1, triste: tapa < 0.6, sonrisa: tapa >= 1, sorpresa: tapa > 0.6 && tapa < 1 });
  // DOOM llega por la calle y, en «the same», se quita la capa verde y se la echa por encima
  const entra = tramo(t, P9 + 0.05, igual - 0.5), x = Math.round(lerp(-16, 178, ease(entra)));
  const r = R.actor(EL.doom, x, 156, t, { dir: 1, anda: entra > 0 && entra < 1, sostiene: t > igual - 0.4 && tapa < 1 ? [x + 16, 132] : undefined });
  if (tapa > 0) { const hx = rn.cabeza[0], hy = rn.cabeza[1] + 3, xl = Math.round(lerp(x + 12, hx - 11, ease(tapa))), xr = Math.round(lerp(x + 18, hx + 11, ease(tapa))), top = Math.round(lerp(132, hy + 8, ease(tapa)));
    const pts = [[xl + 4, top], [xr - 4, top], [xr, top + 6], [xr + 1, 157], [xl - 1, 157], [xl, top + 6]];
    R.poligono(pts, K); R.poligono(pts.map(([px, py]) => [px + (px < (xl + xr) / 2 ? 1 : -1), py + 1]), G[3]);
    R.linea(xl + 2, top + 6, xl + 1, 155, G[2]); R.linea(Math.round((xl + xr) / 2), top + 4, Math.round((xl + xr) / 2), 155, G[2]); R.linea(xr - 2, top + 6, xr - 1, 155, hex('#4a9a5a'));
    R.disco(Math.round((xl + xr) / 2), top + 2, 1, hex('#e8c060'));
    if (tapa >= 1) luz(hx, hy + 10, 20, hex('#ffe8a0'), 0.25); }
  // la nieve que cae
  copos(t, 30, 0.12, -0.3, hex('#8a96c8'), 1, 11); copos(t, 24, 0.2, -0.5, hex('#e8ecf4'), 1, 12); copos(t, 10, 0.3, -0.8, hex('#ffffff'), 2, 13);
};

// ══ 10 · EL TALLER DE LAS MÁQUINAS DEL CASTILLO: la palanca, el humo y la «X» ═══════════════════════════════════════
let B10 = null;
const fondo10 = () => {
  if (B10) return B10;
  B10 = R.nuevo(); const prev = R.usar(B10);
  // muro de sillares grises verdosos con su trama
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 10), off = (f & 1) * 12, j = y % 10 === 9 || (x + off) % 24 === 23, tn = H(Math.floor((x + off) / 24), f, 3);
    R.pset(x, y, j ? hex('#1a2220') : tn > 0.7 ? hex('#4a5652') : tn > 0.3 ? hex('#3e4a46') : hex('#36403c')); if (!j && H(x, y, 4) > 0.95) R.pset(x, y, hex('#56625e')); }
  for (let x = 0; x < 320; x++) for (let y = 0; y < 12; y++) R.pset(x, y, y === 11 ? K : x % 40 < 3 ? hex('#2a1a10') : hex('#3a2416'));
  // la ventana de arco con la noche, a la izquierda
  R.rect(28, 30, 70, 88, K); R.disco(49, 30, 21, K);
  for (let y = 12; y < 87; y++) for (let x = 30; x < 69; x++) if (y > 30 || Math.hypot(x - 49, y - 30) < 19) R.pset(x, y, y < 60 ? hex('#141a3a') : hex('#1e2648'));
  R.disco(58, 34, 5, hex('#f0f0e0')); R.disco(56, 33, 1, hex('#c8c8b8')); R.linea(49, 12, 49, 87, K); R.linea(30, 56, 68, 56, K); R.poligono([[30, 87], [40, 74], [52, 80], [68, 70], [68, 87]], hex('#0c1020'));
  R.rect(26, 88, 72, 91, hex('#5a625e')); R.rect(26, 88, 72, 88, hex('#7a827e'));
  // el estante de herramientas
  R.rect(84, 40, 150, 42, hex('#5a3a22')); R.rect(84, 43, 150, 43, K);
  for (const [x, h, c] of [[88, 12, '#8a8e9a'], [96, 8, '#c8903a'], [104, 14, '#6a6e7a'], [114, 10, '#a8acbc'], [124, 9, '#c83a2a'], [134, 13, '#8a8e9a'], [142, 7, '#e8c060']]) { R.rect(x, 40 - h, x + 4, 39, K); R.rect(x + 1, 41 - h, x + 3, 39, hex(c)); }
  R.rect(84, 60, 150, 62, hex('#5a3a22')); for (let k = 0; k < 6; k++) { const x = 88 + k * 10; R.linea(x, 62, x, 74, K); R.rect(x - 2, 74, x + 2, 77, hex('#8a8e9a')); }
  // el suelo de losas
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 150 ? K : (x + (y >> 3) * 16) % 32 === 0 || (y - 150) % 9 === 0 ? hex('#1e2420') : H(x >> 2, y >> 2, 5) > 0.8 ? hex('#3a403c') : hex('#2e3430'));
  // LA MÁQUINA: caldera de cobre con remaches, tuberías al techo, tres esferas y la cúpula de cristal
  const mx0 = 176, mx1 = 262;
  R.rect(mx0, 60, mx1, 150, K); for (let y = 61; y < 150; y++) for (let x = mx0 + 1; x < mx1; x++) { const sh = (x - mx0) / (mx1 - mx0); R.pset(x, y, sh < 0.15 ? hex('#e8a060') : sh > 0.85 ? hex('#7a3a1a') : (y % 16 === 0) ? hex('#8a4a22') : hex('#b86a32')); }
  for (let y = 66; y < 150; y += 16) for (let x = mx0 + 4; x < mx1; x += 8) R.pset(x, y + 2, hex('#f0c080'));
  for (const px of [190, 248]) { R.rect(px - 3, 12, px + 3, 60, K); R.rect(px - 2, 12, px + 2, 60, hex('#8a8e9a')); R.rect(px - 2, 12, px - 1, 60, hex('#c8ccd8')); for (let y = 20; y < 60; y += 12) R.rect(px - 4, y, px + 4, y + 2, hex('#5a5e6a')); }
  R.rect(204, 44, 234, 60, K); R.rect(205, 45, 233, 59, hex('#5a5e6a'));
  R.rect(mx0 - 10, 100, mx0, 104, K); R.rect(mx0 - 9, 101, mx0, 103, hex('#8a8e9a'));
  R.rect(mx0 - 6, 150, mx1 + 6, 154, K);
  // el banco de trabajo, a la izquierda, con piezas
  R.rect(14, 124, 128, 128, K); R.rect(15, 124, 127, 126, hex('#8a5a34')); R.rect(15, 127, 127, 127, hex('#5a3a22'));
  for (const x of [20, 118]) { R.rect(x, 128, x + 4, 150, K); R.rect(x + 1, 128, x + 3, 150, hex('#6a4428')); }
  for (const [x, w, c] of [[30, 8, '#8a8e9a'], [44, 5, '#c8903a'], [92, 10, '#6a6e7a']]) { R.rect(x, 120, x + w, 123, K); R.rect(x + 1, 121, x + w - 1, 122, hex(c)); }
  R.linea(56, 123, 66, 119, K); R.linea(57, 123, 67, 119, hex('#c8ccd8'));
  R.usar(prev); return B10;
};
const esfera = (cx, cy, a, rojo) => { R.disco(cx, cy, 7, K); R.disco(cx, cy, 6, hex('#f2eee2')); for (let k = -3; k <= 3; k++) { const p = -Math.PI * 0.75 + k * 0.4 * 0.75; R.pset(Math.round(cx + Math.cos(p) * 5), Math.round(cy + Math.sin(p) * 5), k > 1 ? hex('#c83a2a') : K); }
  R.linea(cx, cy, Math.round(cx + Math.cos(a) * 5), Math.round(cy + Math.sin(a) * 5), rojo ? hex('#c83a2a') : K); R.pset(cx, cy, K); };
const p10 = (t) => {
  R.copiar(fondo10());
  const tira = tramo(t, P10 + 0.6, P10 + 1.0), aprieta = tramo(t, P10 + 1.0, mal), falla = t > mal, sh = !falla && aprieta > 0 ? (Math.floor(t * 20) % 2) : 0;
  // las esferas: las agujas suben al rojo
  for (const [k, cx, cy] of [[0, 196, 82], [1, 220, 76], [2, 244, 82]]) esfera(cx + sh, cy, -Math.PI * 0.75 + (falla ? 1.6 + Math.sin(t * 20 + k) * 0.2 : aprieta * 1.5 + Math.sin(t * 3 + k) * 0.1) , falla);
  // la cúpula de cristal: la luz verde que late y, al fallar, se apaga
  const dx = 219 + sh; R.disco(dx, 46, 12, K); R.disco(dx, 46, 11, hex('#5a7a8a')); for (let y = 46; y <= 58; y++) R.linea(dx - 12, y, dx + 12, y, B10[y * 320 + dx - 12]);
  if (!falla) { luz(dx, 42, 16, G[4], 0.5 + 0.3 * aprieta); R.disco(dx, 42, 3 + Math.round(aprieta * 2), G[5]); } else R.disco(dx, 42, 2, hex('#3a4a4a'));
  R.pset(dx - 5, 38, hex('#e8f8ff')); R.pset(dx - 6, 40, hex('#e8f8ff'));
  // LA PALANCA: Doom la baja (P10+0,6); la máquina tiembla; en «wrong way» echa humo negro, chispas y la «X» roja
  const ang = lerp(-1.2, 0.5, ease(tira)), lx = 166, ly = 102, tx = Math.round(lx + Math.cos(ang) * -16 + 0), ty = Math.round(ly + Math.sin(ang) * 16 - 2);
  R.linea(lx, ly, tx, ty, K); R.linea(lx + 1, ly, tx + 1, ty, hex('#8a8e9a')); R.disco(lx, ly, 2, hex('#5a5e6a'));
  const r = R.actor(EL.doom, 132, 160, t, { dir: 1, sostiene: t < mal + 0.2 ? [tx, ty + 1] : undefined, sorpresa: falla && t < mal + 0.9, triste: t > mal + 0.9 });
  R.disco(tx, ty, 2, K); R.disco(tx, ty, 1, hex('#c83a2a'));
  if (falla) { const u = tramo(t, mal, mal + 1.6);
    for (let k = 0; k < 16; k++) { const f = (t * 0.5 + k / 16) % 1, cx = 219 + Math.sin(k * 1.7) * 10 - f * 30 + Math.sin(t + k) * 3, cy = 50 + 30 * (k % 3) / 2 - f * 30 - u * 6; const rr = Math.round((3 + f * 7) * Math.min(1, u * 3));
      if (rr > 0) { R.disco(Math.round(cx), Math.round(cy + 30), rr + 1, K); R.disco(Math.round(cx), Math.round(cy + 30), rr, mezcla(hex('#2a2a30'), hex('#6a6a72'), f)); R.pset(Math.round(cx) - 1, Math.round(cy + 30) - rr + 1, hex('#8a8a92')); } }
    for (let k = 0; k < 8; k++) { const f = tramo(t, mal + k * 0.05, mal + 0.5 + k * 0.05); if (f > 0 && f < 1) R.pset(Math.round(dx + Math.cos(k) * f * 22), Math.round(46 + Math.sin(k) * f * 14 + f * f * 10), hex('#ffe060')); }
    const xs = tramo(t, mal + 0.1, mal + 0.4); if (xs > 0) { luz(dx, 24, 14, hex('#ff3a2a'), 0.4 * xs); R.icono('X', dx - 7, 16, hex('#e8302a'), K, 3); } }
  // el robotito del banco se desmonta: la cabeza salta y rueda
  { const rx = 70, ry = 123; const u = tramo(t, mal + 0.2, mal + 1.2), cae = falla ? u : 0;
    R.rect(rx, ry - 9, rx + 7, ry, K); R.rect(rx + 1, ry - 8, rx + 6, ry - 1, hex('#8a8e9a')); R.rect(rx + 2, ry - 5, rx + 5, ry - 4, G[3]);
    const hx = rx + 1 + cae * 16, hy = ry - 15 - Math.sin(cae * Math.PI) * 14 + (cae >= 1 ? 9 : cae * 9);
    R.rect(Math.round(hx), Math.round(hy), Math.round(hx) + 5, Math.round(hy) + 5, K); R.rect(Math.round(hx) + 1, Math.round(hy) + 1, Math.round(hx) + 4, Math.round(hy) + 4, hex('#a8acbc')); R.rect(Math.round(hx) + 1, Math.round(hy) + 2, Math.round(hx) + 4, Math.round(hy) + 2, falla ? hex('#3a4a4a') : G[5]);
    if (falla && u < 1) { R.linea(rx + 3, ry - 10, rx + 3 + Math.round(Math.sin(t * 30) * 2), ry - 13, hex('#e8c060')); } }
  // Atom luciérnaga, junto a la ventana, se tapa del humo
  T.AT.luciernaga(R, 100 + Math.sin(t * 1.3) * 3, 92 + Math.sin(t * 2) * 2, t, { dir: 1, brillo: 0.6, cara: falla ? 'sorpresa' : 'normal' });
};

// ══ 11 · EL REINO VERDE DESDE EL RISCO: el rey del infierno y su sombra de niño ══════════════════════════════════════
let B11 = null;
const RIS = [[164, 180], [170, 132], [182, 118], [196, 112], [250, 110], [276, 116], [292, 112], [320, 114], [320, 180]];
const fondo11 = () => {
  if (B11) return B11;
  B11 = R.nuevo(); const prev = R.usar(B11);
  for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) R.pset(x, y, [G[0], G[1], hex('#14382a'), G[2], hex('#2a5a3a')][cl(Math.floor(y / 96 * 4.6 + Math.sin(x * 0.03 + y * 0.08) * 0.3 + bay(x, y) - 0.5), 0, 4)]);
  // agujas lejanas y el castillo de Mefisto, ahora de Doom, con banderas verdes (las anima la escena)
  for (let x = 0; x < 320; x++) { const h = Math.round(82 + Math.sin(x * 0.05) * 5 + Math.sin(x * 0.17) * 2); for (let y = h; y < 100; y++) R.pset(x, y, y === h ? G[3] : hex('#0a2014')); }
  for (const [x, w, top] of [[30, 6, 48], [62, 4, 60], [100, 8, 40], [134, 5, 56], [300, 5, 64]]) { R.poligono([[x - w, 96], [x - 1, top], [x + 1, top], [x + w, 96]], hex('#0a2014')); R.linea(x + 1, top, x + w, 96, G[2]); }
  R.poligono([[86, 96], [92, 54], [100, 40], [108, 54], [114, 96]], hex('#06140c')); for (const [x, y] of [[98, 62], [102, 72], [97, 82]]) { R.rect(x, y, x + 2, y + 2, G[5]); }
  // la llanura verde con un río de luz que serpentea hacia nosotros
  for (let y = 96; y < 180; y++) for (let x = 0; x < 320; x++) { const d = (y - 96) / 84; R.pset(x, y, H(x >> 2, y >> 1, 11) > 0.82 ? hex('#1e4a2a') : d > 0.5 ? hex('#0e2416') : hex('#123020')); }
  for (let y = 96; y < 180; y++) { const cx = 110 + Math.sin(y * 0.08) * 26 - (y - 96) * 0.6, w = 1 + (y - 96) * 0.07; for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) R.pset(x, y, Math.abs(x - cx) > w - 1 ? G[3] : G[4]); }
  // en la llanura: ruinas de arcos, cadenas rotas, piedras y faroles verdes que alumbran el camino
  for (const [x, y, w, h] of [[22, 120, 14, 16], [58, 140, 18, 22], [140, 112, 10, 10]]) { R.rect(x, y - h, x + 3, y, hex('#0a2014')); R.rect(x + w - 3, y - h, x + w, y, hex('#0a2014')); for (let i = 0; i <= w; i++) R.pset(x + i, Math.round(y - h - Math.sin(i / w * Math.PI) * 4), hex('#0a2014')); R.linea(x + 3, y - h, x + 3, y, G[2]); }
  for (let k = 0; k < 30; k++) { const x = Math.floor(H(k, 121) * 160), y = 100 + Math.floor(H(k, 122) * 76), s2 = 1 + Math.floor((y - 96) / 30); R.rect(x, y, x + s2 * 2, y + s2, hex('#06140c')); R.rect(x, y, x + s2 * 2 - 1, y, G[2]); }
  for (const [x, y] of [[40, 160], [86, 128], [128, 108], [16, 150]]) { R.rect(x, y - 10, x, y, K); R.rect(x - 1, y - 13, x + 1, y - 10, K); R.pset(x, y - 12, G[5]); }
  for (let i = 0; i < 14; i++) { R.pset(70 + i * 2, 118 + Math.round(Math.sin(i / 13 * Math.PI) * 4), hex('#3a4a3e')); }
  // EL RISCO de primer término a la derecha, con estratos y su filo
  R.poligono(RIS, hex('#1a1416'));
  for (let y = 108; y < 180; y++) for (let x = 162; x < 320; x++) if (dentroPol(RIS, x + 0.5, y + 0.5)) { const e = Math.floor((y + Math.sin(x * 0.1) * 3) / 7); R.pset(x, y, (y + Math.round(Math.sin(x * 0.1) * 3)) % 7 === 0 ? K : e & 1 ? hex('#2a2024') : hex('#221a1e')); if (H(x, y, 12) > 0.94) R.pset(x, y, hex('#3a3034')); }
  for (let i = 0; i < RIS.length - 2; i++) { const [a, b] = RIS[i], [c, d] = RIS[i + 1]; R.linea(a, b, c, d, G[3]); R.linea(a, b + 1, c, d + 1, G[2]); }
  R.usar(prev); return B11;
};
const p11 = (t) => {
  R.copiar(fondo11());
  const ok = (x, y) => y < 80 && !(x > 274 && y < 48) && !(x < 172 && y < 22);
  nube(((t * 5 + 50) % 400) - 40, 40, 40, G[1], hex('#14382a'), G[2], ok); nube(((t * 3 + 230) % 400) - 40, 60, 30, hex('#14382a'), G[2], hex('#3a6a4a'), ok);
  // el río de luz que corre (destellos) y almas que suben
  for (let k = 0; k < 18; k++) { const y = 96 + ((t * 18 + k * 9) % 84), cx = 110 + Math.sin(y * 0.08) * 26 - (y - 96) * 0.6; R.pset(Math.round(cx), Math.round(y), G[6]); }
  for (let k = 0; k < 10; k++) { const f = (t * 0.15 + H(k, 111)) % 1, x = 10 + H(k, 112) * 150, y = 170 - f * 130; R.pset(Math.round(x), Math.round(y), G[5]); R.pset(Math.round(x), Math.round(y) + 1, G[3]); }
  // LA SOMBRA del rey en la llanura: en «the boy who wanted» es la de un niño envuelto en un abrigo grande
  const so = tramo(t, chico - 0.3, chico + 0.6);
  // la luz verde del río, desde abajo, alumbra la cara del risco: ahí se proyecta la sombra, grande y de pie
  luz(240, 156, 50, G[4], 0.45 + 0.05 * Math.sin(t * 2));
  if (so > 0) { const bx = 238, sw = Math.round(Math.sin(t * 1.4) * 1);
    const abrigoS = [[bx - 9, 140], [bx + 9, 140], [bx + 13, 160], [bx + 17, 178], [bx - 17, 178], [bx - 13, 160]];
    sombraPol(abrigoS.map(([x, y]) => [x + sw, y]), K, 0.72, so);
    for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) if (i * i + j * j <= 60 && bay(bx + i, 132 + j) < so) R.pset(bx + i + sw, 132 + j, mezcla(R.pget(bx + i + sw, 132 + j), K, 0.72));
    sombraPol([[bx - 10, 140], [bx + 10, 140], [bx + 10, 145], [bx - 10, 145]].map(([x, y]) => [x + sw, y]), K, 0.8, so);
    sombraPol([[bx + 6, 145], [bx + 10, 145], [bx + 12, 158], [bx + 8, 158]].map(([x, y]) => [x + sw, y]), K, 0.8, so);
    // y, en «mother», una lucecita blanca baja hasta la mano de la sombra
    const lm = tramo(t, madre2, madre2 + 0.5); if (lm > 0) { const mx = bx - 24, my = 150 + Math.sin(t * 2) * 2; luz(mx, my, 12, hex('#ffffff'), 0.55 * lm); R.disco(mx, Math.round(my), 2, hex('#fff8e8')); R.pset(mx, Math.round(my), hex('#ffffff')); } }
  // las banderas verdes del castillo: en «king of hell» se despliegan
  const ban = tramo(t, rey - 0.2, rey + 0.6);
  for (const [x, top, k] of [[94, 36, 0], [128, 50, 1], [26, 42, 2]]) { R.rect(x, top, x, top + 10, K); if (ban > 0) { const L = Math.round(10 * ban); for (let i = 0; i < L; i++) { const ond = Math.round(Math.sin(t * 6 - i * 0.6 + k) * (i / 5)); R.linea(x + 1 + i, top + ond, x + 1 + i, top + 5 + ond, i % 3 ? G[4] : G[3]); } } }
  // DOOM en el filo del risco, de cara a su reino; su estandarte a un lado; en «king» alza los brazos y la corona brilla
  estandarte(262, 70, t, 1, G[3]);
  const r = R.actor(EL.doom, 210, 113, t, { dir: -1, brazos: t > rey - 0.1, triste: t > chico && t < madre2 + 0.6 });
  if (r?.cabeza) { corona(r.cabeza[0], r.cabeza[1] - 9, 1); if (t > rey - 0.1) luz(r.cabeza[0], r.cabeza[1] - 6, 14, hex('#ffe890'), 0.5 * (1 - tramo(t, rey + 0.2, rey + 1.4))); }
  brasas(t, 14, 170, 320, 60, 140, G[5], G[4], 113);
  for (const [x, y] of [[40, 160], [86, 128], [128, 108], [16, 150]]) luz(x, y - 12, 6, G[5], 0.4 + 0.15 * Math.sin(t * 5 + x));
  for (let k = 0; k < 3; k++) murcielago(((t * (14 + k * 4) + k * 110) % 200) - 20, 30 + k * 12 + Math.sin(t * 2 + k) * 3, t, k, hex('#06140c'));
};

// ══ 12 · EL CINE (salas 'sala', 2026): el «18» y el cartel que se da la vuelta ═══════════════════════════════════════
const p12 = (t) => {
  const o = { encuadre: 'sala', epoca: 2026, cola: 0.35 + 0.3 * tramo(t, P12, P13) };
  const gs = T.salas(R, t, o);
  const [m0, m1, m2, m3] = gs.marquesina ?? [44, 36, 276, 61];
  // EL «18» en la marquesina: en «December 18th» los ledes ámbar lo escriben de izquierda a derecha
  const u = tramo(t, dic - 0.1, dic + 0.6);
  { const cx = Math.round((m0 + m2) / 2), x0 = cx - 26, x1 = cx + 26; R.rect(x0, m1 + 2, x1, m3 - 2, K); R.rect(x0 + 1, m1 + 3, x1 - 1, m3 - 3, hex('#1a1208'));
    for (let y = m1 + 4; y < m3 - 3; y += 2) for (let x = x0 + 2; x < x1 - 1; x += 2) R.pset(x, y, hex('#2a1e10'));
    if (u > 0) { R.numero('18', cx + 1, m3 - 6, { tam: 16, centro: true, n: Math.round(u * 40), color: hex('#ffb030') }); luz(cx, Math.round((m1 + m3) / 2), 30, hex('#ffb030'), 0.25 * u); }
    for (let y = m1 + 4; y < m3 - 3; y += 2) for (let x = x0 + 2; x < x1 - 1; x += 2) if (R.pget(x + 1, y + 1) !== hex('#1a1208')) R.pset(x + 1, y + 1, mezcla(R.pget(x + 1, y + 1), K, 0.4)); }
  // EL CARTEL (vitrina de la derecha): la máscara; en «another face» se da la vuelta y enseña otra cara, con «?»
  const [c0, c1, c2, c3] = (gs.carteles ?? [[240, 72, 266, 122]])[2], ccx = Math.round((c0 + c2) / 2), ccy = Math.round((c1 + c3) / 2);
  const gira = tramo(t, cara - 0.15, cara + 0.35), ancho = Math.abs(Math.cos(gira * Math.PI)), w = Math.max(1, Math.round((c2 - c0 - 2) / 2 * ancho));
  R.rect(c0 + 1, c1 + 1, c2 - 1, c3 - 1, hex('#0c0e18')); R.rect(ccx - w, c1 + 1, ccx + w, c3 - 1, gira < 0.5 ? hex('#1c2a20') : hex('#2a2a3a'));
  if (gira === 0 || gira >= 1) { if (gira === 0) { luz(ccx, ccy - 4, 14, G[4], 0.4); T.c_mascara(R, ccx, ccy - 4, 0, 1, t); R.rect(ccx - 9, c3 - 8, ccx + 9, c3 - 7, G[3]); }
    else { R.disco(ccx, ccy - 8, 7, hex('#8a8e9a')); R.rect(ccx - 9, ccy + 1, ccx + 9, c3 - 4, hex('#8a8e9a')); R.disco(ccx, ccy - 8, 5, hex('#a8acbc')); R.icono('?', ccx - 2, ccy - 12, K, hex('#e8e8f0')); R.rect(ccx - 9, c3 - 4, ccx + 9, c3 - 3, hex('#e8c060')); } }
  // Atom luciérnaga llega al cartel y se sorprende cuando gira
  const va = ease(tramo(t, P12 + 0.3, cines)), ax = lerp(300, c0 - 14, va), ay = lerp(140, ccy - 6, va) + Math.sin(t * 2) * 2;
  T.AT.luciernaga(R, ax, ay, t, { dir: -1, brillo: 0.8, cara: t > cara ? 'sorpresa' : 'sonrisa' });
  T.salasDelante(R, t, o);
};

// ══ 13 · EL PERCHERO DEL ESTUDIO (el del aviso): Atom descuelga el abrigo pequeño ══════════════════════════════════
const ABRm = ABR;
const abriguito = (cx, cy, s, ang = 0) => {
  const tr = ([u, v]) => [Math.round(cx + (u + ang * v * 0.22) * s), Math.round(cy + 3 * s + v * s)];
  const parte = (pts, c) => { const P = pts.map(tr), mx = P.reduce((a, p) => a + p[0], 0) / P.length, my = P.reduce((a, p) => a + p[1], 0) / P.length;
    R.poligono(P, K); R.poligono(P.map(([x, y]) => [x + Math.sign(mx - x), y + Math.sign(my - y)]), c); };
  R.linea(cx, cy, tr([-1, 0])[0], tr([-1, 0])[1], K); R.linea(cx, cy, tr([1, 0])[0], tr([1, 0])[1], K);
  parte([[-8, 4], [-5, 2], [-5, 17], [-9, 17]], ABRS); parte([[8, 4], [5, 2], [5, 17], [9, 17]], ABRm);
  parte([[-5, 0], [5, 0], [7, 21], [-7, 21]], ABRm);
  const L = [tr([-4, 2]), tr([-1, 2]), tr([-2, 20]), tr([-6, 20])]; R.poligono(L, ABRL);
  for (const u of [-3, 3, 5]) { const p0 = tr([u, 6]), p1 = tr([u + (u > 0 ? 1 : -1), 20]); R.linea(p0[0], p0[1], p1[0], p1[1], ABRS); }
  { const p0 = tr([0, 2]), p1 = tr([0, 21]); R.linea(p0[0], p0[1], p1[0], p1[1], K); }
  for (const v of [7, 12, 17]) { const [x, y] = tr([1.2, v]); R.rect(x, y, x + 1, y + 1, hex('#e8c060')); R.pset(x, y, hex('#fff0a0')); }
  parte([[-6, -1], [6, -1], [6, 2], [-6, 2]], BUF); { const [x0, y0] = tr([-5, 1]), [x1] = tr([5, 1]); R.linea(x0, y0, x1, y0, hex('#7a1e1a')); }
  parte([[2, 1], [4, 1], [4.5, 11], [2.5, 11]], BUF);
};
let B13 = null;
const fondo13 = () => {
  if (B13) return B13;
  B13 = R.nuevo(); const prev = R.usar(B13);
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 6), off = (fila & 1) * 9, junta = y % 6 === 5 || (x + off) % 18 === 17;
    const tono = H(Math.floor((x + off) / 18), fila, 1); R.pset(x, y, junta ? hex('#5a3a30') : tono > 0.8 ? hex('#a85a42') : tono > 0.35 ? hex('#944a38') : hex('#84402f')); if (!junta && H(x, y, 2) > 0.96) R.pset(x, y, hex('#b86a50')); }
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 13 ? K : (x % 64 < 3 ? hex('#3a2416') : y < 3 ? hex('#4a2e1c') : (H(x >> 3, y, 3) > 0.9 ? hex('#5a3a24') : hex('#6a4428'))));
  for (let x = 0; x < 320; x++) { R.pset(x, 104, K); R.pset(x, 105, hex('#c89a6a')); R.pset(x, 106, hex('#8a5a3a')); }
  for (let y = 107; y < 132; y++) for (let x = 0; x < 320; x++) R.pset(x, y, x % 40 === 0 ? K : x % 40 === 1 ? hex('#a87a50') : y === 131 ? K : (H(x >> 2, y, 4) > 0.9 ? hex('#6a4428') : hex('#7a5034')));
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(x / 26); R.pset(x, y, (x % 26 === 0) ? hex('#4a2e1c') : (y - 132) % 12 === 0 && (tabla & 1) ? hex('#4a2e1c') : H(x >> 1, y >> 2, tabla) > 0.85 ? hex('#8a5a34') : hex('#a06a3e')); }
  for (let y = 148; y < 172; y++) for (let x = 120; x < 270; x++) { const e = y === 148 || y === 171 || x === 120 || x === 269, b = y < 151 || y > 168 || x < 124 || x > 265; R.pset(x, y, e ? K : b ? hex('#2a4a7a') : ((x + y) % 8 < 2 ? hex('#e8c060') : (x - y) % 8 < 2 ? hex('#7a2a2a') : hex('#a83a3a'))); }
  // el cuadro del paisaje nevado, la lámpara de pared, el paragüero y las botas
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
  // el perchero de pie con sus ganchos, el sombrero y la bufanda gris
  R.rect(194, 40, 198, 156, K); R.rect(195, 40, 197, 156, hex('#6a4428')); R.rect(195, 40, 195, 156, hex('#8a5a34'));
  for (let y = 56; y < 150; y += 22) R.rect(193, y, 199, y + 2, hex('#4a2e1c'));
  R.poligono([[180, 160], [196, 150], [212, 160]], K); R.linea(182, 159, 196, 151, hex('#8a5a34')); R.linea(196, 151, 210, 159, hex('#6a4428'));
  R.disco(196, 37, 4, K); R.disco(196, 37, 3, hex('#8a5a34')); R.pset(195, 36, hex('#c89a6a'));
  for (const [x1] of [[182], [210]]) { R.linea(196, 46, x1, 42, K); R.linea(196, 47, x1, 43, hex('#6a4428')); R.disco(x1, 41, 1, hex('#c8903a')); }
  R.rect(186, 114, 194, 116, K); R.rect(187, 115, 194, 115, hex('#c8903a')); R.rect(185, 110, 187, 116, K); R.pset(186, 111, hex('#e8c060'));
  R.rect(100, 70, 166, 73, K); R.rect(101, 70, 165, 71, hex('#a87a50')); for (const x of [106, 158]) { R.linea(x, 73, x + 4, 80, K); R.linea(x + 1, 73, x + 5, 80, hex('#6a4428')); }
  R.rect(108, 54, 120, 69, K); R.rect(109, 55, 119, 68, hex('#3a3a46')); R.rect(110, 57, 118, 67, hex('#f8e0a0')); R.rect(113, 61, 115, 66, hex('#fbf6e8')); R.pset(114, 60, hex('#ff9a30')); R.poligono([[107, 54], [114, 49], [121, 54]], K); R.pset(114, 47, K);
  for (const [x, w, c] of [[126, 5, '#2e5a7a'], [132, 4, '#8a2a2a']]) { R.rect(x, 56, x + w, 69, K); R.rect(x + 1, 57, x + w - 1, 69, hex(c)); R.rect(x + 1, 60, x + w - 1, 60, hex('#e8c060')); }
  R.rect(142, 60, 160, 69, K); R.rect(143, 61, 159, 68, hex('#3a6a5a')); R.rect(143, 61, 159, 62, hex('#e8c060')); R.disco(151, 65, 2, hex('#c83a2a'));
  R.disco(70, 100, 9, K); R.disco(70, 100, 8, hex('#c8903a')); R.disco(70, 100, 6, hex('#fbf6e8'));
  for (let k = 0; k < 12; k++) { const p = k / 12 * Math.PI * 2; R.pset(Math.round(70 + Math.cos(p) * 5), Math.round(100 + Math.sin(p) * 5), hex('#8a7a6a')); }
  R.poligono([[204, 34], [216, 34], [218, 40], [202, 40]], K); R.rect(205, 35, 215, 39, hex('#3a3a4a')); R.rect(200, 40, 220, 42, K); R.rect(201, 40, 219, 41, hex('#2a2a36')); R.rect(205, 38, 215, 39, hex('#7a2a2a'));
  R.rect(208, 43, 212, 82, K); R.rect(209, 43, 211, 81, hex('#8a8e9a')); for (let y = 46; y < 80; y += 5) R.rect(209, y, 211, y + 1, hex('#6a6e7a')); for (let x = 208; x <= 212; x++) R.linea(x, 82, x, 86, x % 2 ? hex('#6a6e7a') : K);
  R.usar(prev); return B13;
};
const p13 = (t) => {
  R.copiar(fondo13());
  { const pm = t * 0.6, pg = t * 0.05; R.linea(70, 100, Math.round(70 + Math.sin(pm) * 5), Math.round(100 - Math.cos(pm) * 5), K); R.linea(70, 100, Math.round(70 + Math.sin(pg) * 3), Math.round(100 - Math.cos(pg) * 3), hex('#8a2a2a')); }
  for (let j = 0; j < 40; j++) for (let i = -j; i <= j; i += 2) { const x = 251 + i + (j & 1), y = 62 + j * 2; if (((x + y) & 3) === 0 && Math.sin(t * 7) > -0.95) R.pset(x, y, hex('#c86a50')); }
  for (let k = 0; k < 8; k++) { const f = (t * 0.15 + k / 8) % 1; R.pset(Math.round(244 + k * 2 + Math.sin(t + k) * 3), Math.round(140 - f * 70), hex('#f8e8a0')); }
  // la vela del farol de la repisa tiembla
  R.pset(114, 60 - (Math.sin(t * 11) > 0 ? 1 : 0), hex('#ffd060'));
  // Atom entra desde la derecha hasta el perchero, se vuelve a nosotros en «asking you», en «get back» da un saltito y
  // descuelga el abrigo pequeño, y en «lost» lo abraza
  const ua = tramo(t, P13 + 0.05, pregunto - 0.1), ax = Math.round(lerp(290, 214, ease(ua)));
  const salto = Math.round(Math.sin(Math.PI * tramo(t, recuperar - 0.25, recuperar + 0.35)) * 12), coge = t > recuperar, abraza = t > perdido - 0.2;
  const r = T.AT.atom(R, ax, 160 - salto, t, { s: 2, dir: ua < 1 ? -1 : (t > pregunto && t < recuperar - 0.5 ? 1 : -1), pose: ua > 0 && ua < 1 ? 'camina' : !coge && t > recuperar - 0.4 ? 'brazos' : coge ? 'sostiene' : t > pregunto ? 'senala' : 'quieto', cara: abraza ? 'triste' : t > pregunto && t < recuperar - 0.5 ? 'sorpresa' : 'normal', habla: voz(t) });
  const ang = !coge ? Math.sin(t * 2.2) * 0.35 : 0;
  if (!coge) abriguito(186, 112, 1.5, ang);
  else { const mx = Math.round(r.mano[0]), my = Math.round(r.mano[1]), u = tramo(t, recuperar, recuperar + 0.3); abriguito(Math.round(lerp(186, mx - 2, u)), Math.round(lerp(112, my - 10, u)), 1.5, Math.sin(t * 3) * 0.2); }
  if (abraza) { const lz = tramo(t, perdido - 0.2, perdido + 0.5); luz(ax, 132, 28, hex('#ffe8a0'), 0.3 * lz); }
};

// ══ 14 · EL ESTUDIO ENTERO (estudio 'estudio'): la mascarita, la pregunta y los comentarios ══════════════════════════
const p14 = (t) => {
  const bocas = [[comentarios - 0.6, '?', 0], [comentarios - 0.3, 'corazon', 1], [comentarios, '!', 2], [comentarios + 0.3, '?', 3]];
  const o = { encuadre: 'estudio', pizarra: (R, t, [x0, y0, x1, y1]) => { const T2 = hex('#e8ece0'), T3 = hex('#b8c0b0');
    // a tiza: la máscara pequeña → la flecha → una cara con «?» (llegar a ser otro)
    const mx = x0 + 22, my = Math.round((y0 + y1) / 2) - 4, u = tramo(t, otro - 0.3, otro + 0.6);
    if (u > 0) { R.linea(mx - 7, my - 9, mx + 7, my - 9, T2); R.linea(mx - 7, my - 9, mx - 9, my + 4, T2); R.linea(mx + 7, my - 9, mx + 9, my + 4, T2); R.linea(mx - 9, my + 4, mx, my + 11, T2); R.linea(mx + 9, my + 4, mx, my + 11, T2); R.linea(mx - 5, my - 3, mx - 2, my - 3, T2); R.linea(mx + 2, my - 3, mx + 5, my - 3, T2);
      if (u > 0.4) { R.linea(mx + 14, my, mx + 26, my, T3); R.linea(mx + 23, my - 3, mx + 26, my, T3); R.linea(mx + 23, my + 3, mx + 26, my, T3); }
      if (u > 0.8) { R.anillo(mx + 40, my, 9, T2); R.icono('?', mx + 38, my - 3, T2, hex('#2a4a3a')); } }
    // los comentarios que llegan: bocadillos de tiza con símbolos, uno tras otro
    for (const [a, ic, k] of bocas) { const v = tramo(t, a, a + 0.25); if (v <= 0) continue; const bx = x1 - 26 - (k % 2) * 22, by = y0 + 8 + k * 9;
      R.linea(bx - 9, by - 4, bx + 9, by - 4, T2); R.linea(bx - 9, by + 4, bx + 9, by + 4, T2); R.linea(bx - 9, by - 4, bx - 9, by + 4, T2); R.linea(bx + 9, by - 4, bx + 9, by + 4, T2); R.linea(bx - 6, by + 4, bx - 8, by + 7, T2);
      if (ic === 'corazon') { R.pset(bx - 2, by - 1, hex('#f08a8a')); R.pset(bx + 2, by - 1, hex('#f08a8a')); R.linea(bx - 3, by, bx + 3, by, hex('#f08a8a')); R.linea(bx - 2, by + 1, bx + 2, by + 1, hex('#f08a8a')); R.pset(bx, by + 2, hex('#f08a8a')); }
      else R.icono(ic, bx - 2, by - 3, T2, hex('#2a4a3a')); } } };
  const g = T.estudio(R, t, o);
  // Atom en el centro con el abrigo pequeño en brazos; en «someone else» se pone delante la máscara pequeña de hierro; en
  // «would you do it?» la baja y nos mira; en «the comments» señala la pizarra donde llegan los comentarios
  const pone = tramo(t, otro - 0.4, otro), quita = tramo(t, hazlo - 0.2, hazlo + 0.2), conMascara = pone > 0 && quita < 1, senala = t > comentarios - 0.9;
  const ax = 160;
  const r = T.AT.atom(R, ax, 160, t, { s: 2, dir: senala ? -1 : 1, pose: senala ? 'senala' : conMascara ? 'brazos' : 'sostiene', cara: t > hazlo + 0.2 && !senala ? 'sorpresa' : senala ? 'sonrisa' : 'normal', habla: voz(t) });
  if (!conMascara) { const mx = Math.round(senala ? r.mano1[0] : r.mano[0]), my = Math.round(senala ? r.mano1[1] : r.mano[1]); abriguito(mx + (senala ? 2 : -2), my - 12, 1.5, Math.sin(t * 2) * 0.12); }
  else { const fx = r.centro[0], fy = r.centro[1] - 2, y = Math.round(lerp(fy + 18, fy, ease(pone)) + quita * 18); T.c_mascara(R, Math.round(fx), y, 0, 1, t); abriguito(Math.round(fx) + 18, Math.round(fy) + 4, 1.2, Math.sin(t * 2) * 0.1); }
  if (t > hazlo && t < comentarios - 0.9) { const by = Math.round(r.centro[1] - 28 - Math.min(1, (t - hazlo) * 4) * 4); R.rect(ax - 6, by - 10, ax + 6, by + 2, K); R.rect(ax - 5, by - 9, ax + 5, by + 1, hex('#fbf6e8')); R.pset(ax - 1, by + 3, K); R.pset(ax, by + 3, K); R.icono('?', ax - 2, by - 7, hex('#c83a2a'), hex('#fbf6e8')); }
  T.estudioDelante(R, t, o);
};

const efectos = [
  [nadie + 0.2, 'brillo'], [2.95, 'flash'], [4.3, 'whoosh'],
  [despierta + 0.1, 'brillo'], [hell, 'trueno'], [mefistoW, 'toc'],
  [tomo + 0.1, 'golpecito'], [guerra + 0.25, 'trueno'], [guerra + 0.85, 'zumbido'], [dentro - 0.1, 'trueno'],
  [P4 + 0.3, 'pasos'], [salvarse + 0.1, 'whoosh'], [trono, 'campana'],
  [rompe, 'papel'], [rompe + 0.4, 'rafaga'], [libre, 'brillo'],
  [valeria, 'brillo'], [P7 + 0.1, 'viento'], [ahi - 0.1, 'brillo'],
  [dio + 0.2, 'whoosh'], [queda + 0.2, 'viento'],
  [igual, 'whoosh'], [P10 + 0.7, 'interruptor'], [mal, 'vapor'], [mal + 0.4, 'golpecito'],
  [rey - 0.1, 'rafaga'], [dic, 'bip'], [cara - 0.1, 'papel'],
  [recuperar, 'cuelga'], [otro - 0.2, 'toc'], [comentarios - 0.6, 'lapiz'], [comentarios, 'pop'],
];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11], [P12, p12], [P13, p13], [P14, p14]],
  { efectos, año: (t) => (t >= P7 - 0.2 && t < P11 - 0.2) ? null : 2026 });
'''

E = {}
E['vd-cierre'] = ('El cierre', '''// VD-CIERRE (frases 37–39), sin cartela; 2026 en la barra salvo en el recuerdo (la montaña, la calle y el taller).
// Catorce planos, cortados en la palabra inglesa:
// 1. el vacío estrellado: el polvo de luz verde de Doom se arremolina en «nobody stays dead» y se junta en la máscara;
//    en «June» le arden los ojos y cae hacia la grieta roja del mundo de abajo; Atom luciérnaga se asusta;
// 2. (corta en «Doom») la caverna del lago de lava: Doom sale de un charco verde en «woke up», mira a un lado y al otro
//    en «Hell» (sorpresa), anda al borde y en «Mephisto» señala la torre roja, que late;
// 3. (corta en «the same») la llanura de la guerra: la mano roja cierra el puño sobre la luz blanca en «took his
//    mother»; Doom y sus robots avanzan; en «waged war» lanza tres rayos verdes y la mano retrocede;
// 4. (corta en «and in October») el trono (infierno 'trono'): Doom cruza la sala; en «to save himself» la mano se
//    retira; en «hand over» la corona cae y Doom sube y se sienta en «throne»; la sala empieza a verdear;
// 5. (corta en «And the first thing») los contratos (infierno 'contratos'): Doom entra con el contrato; en «tear up» lo
//    parte y los pergaminos arden en verde uno tras otro; en «set free» suben las almas;
// 6. (corta en «the soul») el pozo de la bóveda: la luz de Valeria sale del trono en «Valyria» y sube por el haz hasta
//    el óculo; Doom alza la mano y en «sacrificed» baja la cabeza;
// 7. (corta en «Do you remember») la cordillera nevada de lejos: el padre con el niño sube la ladera; Atom luciérnaga
//    llega en «coat?» y los rodea con la órbita en «right there»;
// 8. (corta en «A father») el pino solo en la loma: Werner se para en «worst night», deja al niño y en «gave his son»
//    se quita el abrigo y lo envuelve; se queda sin abrigo en la ventisca;
// 9. (corta en «and a son») la calle nevada de Doomstadt: Doom llega y en «the same» echa su capa verde sobre la niña
//    que tirita; ella sonríe;
// 10. (corta en «even if») el taller del castillo: Doom baja la palanca, la máquina tiembla y en «wrong way» echa humo,
//    la «X» roja sale sobre la cúpula y el robotito se desmonta;
// 11. (corta en «Today») el reino verde desde el risco: en «the boy» su sombra en la llanura es la de un niño con
//    abrigo; en «mother», una lucecita; en «king of hell» alza los brazos y se despliegan las banderas verdes;
// 12. (corta en «and on December») el cine (salas 'sala', 2026): en «18th» los ledes escriben «18»; en «another face»
//    el cartel de la máscara se da la vuelta (otra cara, «?»); Atom luciérnaga;
// 13. (corta en «And now») el perchero del estudio: Atom llega, nos mira en «asking you» y en «get back» descuelga de un
//    salto el abrigo pequeño; en «lost» lo abraza;
// 14. (corta en «but the price») el estudio: en «someone else» Atom se pone la máscara pequeña; en «would you do it?»
//    la baja y nos mira («?»); en «the comments» señala la pizarra donde llegan los bocadillos.''', _en('vd-cierre', CIERRE))
