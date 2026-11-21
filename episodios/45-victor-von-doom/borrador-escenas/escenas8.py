# Borrador de escenas del ep45, grupo S8: vd-sanjuan y vd-duelo (formato del 11: E[id] = (título, cabecera, cuerpo)).
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


E = {}

# ── lo común a las dos escenas: utilidades, texturas, piezas, la figura de luz y el último plano de vd-sanjuan (el
# abismo por el que sube Cynthia), que vd-duelo congela ──────────────────────────────────────────────────────────
COMUN = r'''
const VD = T.VD, K = hex('#160f1c'), H = (s) => hex(s), ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const hh = (x, y, k = 0) => { const v = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return v - Math.floor(v); };
const rgb = (c) => [c & 255, (c >> 8) & 255, (c >> 16) & 255];
const mez = (a, b, u) => { u = cl(u); const A = rgb(a), B = rgb(b); return (0xff000000 | (Math.round(A[2] + (B[2] - A[2]) * u) << 16) | (Math.round(A[1] + (B[1] - A[1]) * u) << 8) | Math.round(A[0] + (B[0] - A[0]) * u)) >>> 0; };
const lum = (c) => 0.3 * (c & 255) + 0.59 * ((c >> 8) & 255) + 0.11 * ((c >> 16) & 255);
const voz = (t) => E.energia(t);
const CACHE = new Map();
const horno = (k, f) => { if (!CACHE.has(k)) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); CACHE.set(k, b); } return CACHE.get(k); };
const ps = (x, y, c) => R.pset(Math.round(x), Math.round(y), c);
const dentroP = (P, x, y) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
// lo que se pinta aparte (para recortarlo o teñirlo): un búfer marcado
const MK = 0xff00ff01 >>> 0, TMP = R.nuevo();
const aparte = (f) => { TMP.fill(MK); const prev = R.usar(TMP); const r = f(); R.usar(prev); return r; };
const pegar = (x0, y0, x1, y1, fn) => { for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) { const c = TMP[y * 320 + x]; if (c !== MK) { const d = fn ? fn(x, y, c) : c; if (d != null) R.pset(x, y, d); } } };
// degradado vertical con trama de Bayer
const rampa = (x0, y0, x1, y1, cs) => { const n = cs.length - 1; for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), u = f - i; for (let x = x0; x <= x1; x++) R.pset(x, y, u > bay(x, y) ? cs[i + 1] : cs[i]); } };
// una luz (o una sombra) que se funde con lo que hay debajo
const luz = (cx, cy, rx, ry, col, a) => { for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, cx + rx); x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d >= 1) continue; const g = (1 - d) * a; if (g > bay(x, y) * 0.35) R.pset(x, y, mez(R.pget(x, y), col, Math.min(1, g))); } };
// pared de bloques (juntas, tono de cada bloque y poros)
const bloques = (x0, y0, x1, y1, [cL, c, cS], k = 0, w = 16, h = 8) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / h), off = fila % 2 ? w / 2 : 0, jy = (y - y0) % h;
  for (let x = x0; x <= x1; x++) { const bx = Math.floor((x - x0 + off) / w), jx = (x - x0 + off) % w; let col;
    if (jy === h - 1 || jx === w - 1) col = cS; else if (jy === 0 || jx === 0) col = cL; else { col = c; const q = hh(bx, fila, k); if (q > 0.72) col = mez(c, cS, 0.22); else if (q < 0.18) col = mez(c, cL, 0.2); if (hh(x, y, k + 3) > 0.94) col = mez(col, cS, 0.45); }
    R.pset(x, y, col); } } };
// tablas de madera con vetas, juntas y nudos (horizontales)
const tablas = (x0, y0, x1, y1, [cL, c, cS], h = 9, k = 0) => { for (let y = y0; y <= y1; y++) { const j = Math.floor((y - y0) / h), jy = (y - y0) % h;
  for (let x = x0; x <= x1; x++) { let col = c; const g = Math.sin(x * 0.06 + j * 3.1 + Math.sin(x * 0.011 + j * 1.7) * 4 + jy * 0.8);
    if (jy === 0) col = cS; else if (jy === 1) col = mez(c, cL, 0.35); else if (g > 0.84) col = mez(c, cS, 0.42); else if (g < -0.88) col = mez(c, cL, 0.3);
    if ((x + j * 61) % 113 === 0) col = cS; R.pset(x, y, col); } } };
// roca con estratos y poros (para polígonos: devuelve el color de (x, y)); P = [luz, medio, sombra, hondo]
const rocaC = (P, k = 0) => (x, y) => { const e = Math.sin(y * 0.42 + Math.sin(x * 0.05 + k) * 2.2), n = hh(x >> 1, y >> 1, k);
  if (e > 0.88) return P[0]; if (e < -0.9) return P[2]; if (n > 0.93) return P[3]; if (n < 0.08) return P[0]; return (x * 3 + y * 5 + k) % 23 === 0 ? P[2] : P[1]; };
const basalto = (P, k = 0) => (x, y) => { const c = Math.floor((x + Math.sin(y * 0.05 + k) * 3) / 11), jx = ((x + Math.sin(y * 0.05 + k) * 3) % 11 + 11) % 11, w = 11;
  const jy = (y + c * 9 + Math.round(jx * (hh(c, 1, k) - 0.5) * 1.4)) % (20 + Math.floor(hh(c, 2, k) * 14)); if (jx < 1) return P[3]; if (jy === 0) return P[3]; if (jy === 1) return P[0];
  const u = jx / w, n = hh(x >> 1, y >> 1, k); let col = u < 0.3 ? P[0] : u < 0.72 ? P[1] : P[2]; if (n > 0.93) col = P[2]; if (n < 0.05) col = P[0]; return col; };
const filo = (pts, col) => { for (let i = 0; i < pts.length - 1; i++) R.linea(Math.round(pts[i][0]), Math.round(pts[i][1]), Math.round(pts[i + 1][0]), Math.round(pts[i + 1][1]), col); };
// nube de tres tonos (con recorte opcional [x0, y0, x1, y1])
const nube = (x, y, w, tono, clip) => { x = Math.round(x); y = Math.round(y); const n = Math.max(3, Math.round(w / 9));
  const d = (cx, cy, r, c) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r + r) { const X = cx + i, Y = cy + j; if (!clip || (X >= clip[0] && X <= clip[2] && Y >= clip[1] && Y <= clip[3])) R.pset(X, Y, c); } };
  for (let k = 0; k < n; k++) d(x + Math.round((k + 0.5) * w / n), y + 2, Math.round(w / n * (0.62 + 0.3 * Math.sin(k * 2.3 + w))), tono[2]);
  for (let k = 0; k < n; k++) d(x + Math.round((k + 0.5) * w / n) - 1, y, Math.round(w / n * (0.55 + 0.3 * Math.sin(k * 2.3 + w))), tono[1]);
  for (let k = 1; k < n - 1; k++) d(x + Math.round((k + 0.3) * w / n) - 1, y - 2, Math.max(1, Math.round(w / n * (0.42 + 0.3 * Math.sin(k * 1.7 + w)))), tono[0]); };
const perfil = (x, sem, base, amp) => base - amp * (0.55 * Math.abs(Math.sin(x * 0.021 + sem)) + 0.3 * Math.abs(Math.sin(x * 0.053 + sem * 2.1)) + 0.15 * (0.5 + 0.5 * Math.sin(x * 0.13 + sem * 3.7)));
// estrellas que titilan (fuera de la barra del año y de la esquina de Atom)
const libre = (x, y) => !(x > 274 && y < 48) && !(x > 16 && x < 174 && y < 22);
const estrellas = (x0, y0, x1, y1, n, k, t, ok = () => true) => { for (let i = 0; i < n; i++) { const x = Math.round(x0 + hh(i, 1, k) * (x1 - x0)), y = Math.round(y0 + hh(i, 2, k) * (y1 - y0)); if (!libre(x, y) || !ok(x, y)) continue;
  const b = Math.sin(t * (1.5 + hh(i, 3, k) * 3) + i) > 0.6; R.pset(x, y, b ? H('#ffffff') : hh(i, 4, k) > 0.5 ? H('#a8b0e0') : H('#7880b0')); if (b && hh(i, 5, k) > 0.8) { R.pset(x - 1, y, H('#8890c8')); R.pset(x + 1, y, H('#8890c8')); } } };
// un pájaro (o un murciélago) que aletea
const pajaro = (x, y, t, col) => { x = Math.round(x); y = Math.round(y); const a = Math.floor(t * 9 + x) % 2; R.pset(x, y, col); R.pset(x + 1, y, col); R.pset(x + 2, y - 1 + a * 2, col); R.pset(x - 1, y - 1 + a * 2, col); R.pset(x + 3, y - 2 + a * 3, col); R.pset(x - 2, y - 2 + a * 3, col); };
// una llama (de vela, antorcha u hoguera) con su núcleo; s escala
const llama = (x, y, t, s = 1, k = 0) => { const h = (5 + Math.sin(t * 13 + k) * 1.2) * s, w = 2.2 * s;
  for (let j = 0; j < h; j++) { const u = j / h, a = w * (1 - u) * (0.6 + 0.4 * Math.sin(u * 3)), dx = Math.sin(t * 9 + j * 0.6 + k) * u * s; for (let i = -a; i <= a; i++) { const c = Math.abs(i) < a * 0.45 && u < 0.6 ? H('#fff4b0') : Math.abs(i) < a * 0.75 ? H('#f8b030') : H('#e0502a'); ps(x + i + dx, y - j, c); } } };
const chispas = (x, y, t, n, alto, k = 0) => { for (let i = 0; i < n; i++) { const ph = (t * (0.6 + hh(i, 2, k) * 0.5) + hh(i, 1, k)) % 1, X = x + (hh(i, 3, k) - 0.5) * 14 + Math.sin(t * 3 + i) * 3 * ph, Y = y - ph * alto; if (ph < 0.9) ps(X, Y, ph < 0.3 ? H('#fff0a0') : ph < 0.6 ? H('#f8a030') : H('#c04a2a')); } };

// LA FIGURA DE LUZ: un chibi pintado aparte y vuelto luz blanca (sin rasgos), con su halo y sus chispas que suben
const LUZB = [H('#c8d0f8'), H('#e4eaff'), H('#f6f8ff'), H('#ffffff')];
const figuraLuz = (def, x, suelo, t, o = {}, f = 1) => {
  if (f <= 0) return null;
  x = Math.round(x); suelo = Math.round(suelo);
  luz(x + 7, suelo - 13, 22, 26, H('#eef2ff'), 0.6 * f);
  const r = aparte(() => R.actor(def, x, suelo, t, o));
  pegar(x - 12, suelo - 46, x + 27, suelo + 2, (X, Y, c) => { const l = lum(c), col = l < 45 ? LUZB[1] : l < 120 ? LUZB[2] : LUZB[3]; return f >= 1 ? col : mez(R.pget(X, Y), col, f); });
  for (let i = 0; i < 9; i++) { const ph = (t * 0.8 + hh(i, 3)) % 1, X = Math.round(x + 7 + (hh(i, 4) - 0.5) * 22 + Math.sin(t * 2 + i) * 2), Y = Math.round(suelo - 2 - ph * 44); if ((1 - ph) * f > bay(X, Y) + 0.1) R.pset(X, Y, ph < 0.4 ? LUZB[3] : LUZB[1]); }
  return r;
};
// el alma de Strange: una bolita de luz azulada con su halo y su estela (de (ax, ay) viene)
const orbe = (x, y, t, f = 1, ax, ay) => { if (f <= 0) return; luz(x, y, 9, 9, H('#d8f0ff'), 0.55 * f);
  if (ax != null) for (let i = 1; i < 7; i++) { const u = i / 7, X = x + (ax - x) * u * 0.5, Y = y + (ay - y) * u * 0.5; if ((1 - u) * f > bay(Math.round(X), Math.round(Y)) + 0.1) ps(X, Y, H('#a8e0ff')); }
  R.disco(x, y, 3.2, H('#7ac8f0')); R.disco(x - 0.4, y - 0.4, 2.2, H('#c8f0ff')); ps(x - 1, y - 1, H('#ffffff')); const g = Math.sin(t * 8) > 0; if (g) { ps(x + 4, y - 3, H('#ffffff')); ps(x - 4, y + 2, H('#c8f0ff')); } };
// el bocadillo de un número (lo que se debe: «1»)
const bocaNum = (x, y, n) => { R.rect(x - 7, y - 11, x + 7, y + 2, K); R.rect(x - 6, y - 10, x + 6, y + 1, H('#f4f0e6')); R.pset(x - 1, y + 3, K); R.pset(x, y + 4, K); R.pset(x - 1, y + 2, H('#f4f0e6')); R.numero(n, x, y, { centro: true }); };

// ── EL ABISMO (el último plano de vd-sanjuan, que vd-duelo congela): una grieta de roca roja que se abre arriba a la
// noche; Doom y Strange en la repisa; la luz de Cynthia sube y sale a las estrellas ─────────────────────────────────
const ROJ = [H('#c8583a'), H('#8a2a24'), H('#561618'), H('#2a0a10')], ROJL = [H('#e8784a'), H('#b04030'), H('#7a2420'), H('#3a1014')];
const muroIzq = [[0, 0], [118, 0], [112, 18], [124, 40], [108, 62], [114, 90], [96, 118], [86, 150], [0, 150]];
const muroDer = [[320, 0], [206, 0], [214, 20], [200, 44], [216, 70], [206, 96], [226, 124], [236, 150], [320, 150]];
const abismoFondo = () => horno('abismo', () => {
  // la noche arriba, por la grieta: azul hondo con estrellas fijas
  rampa(0, 0, 319, 70, [H('#06081c'), H('#0e1434'), H('#1a1e48'), H('#3a2440')]);
  // el fondo de la grieta: montes rojos lejanos, cascadas de luz y un lago de lava
  rampa(0, 70, 319, 150, [H('#3a1420'), H('#5a1a1e'), H('#8a2a1e'), H('#c84a24')]);
  for (let x = 90; x < 240; x++) { const y1 = Math.round(perfil(x, 2.2, 104, 30)); for (let y = y1; y < 150; y++) R.pset(x, y, rocaC([H('#7a3030'), H('#5a2028'), H('#3e161e'), H('#2a0e14')], 3)(x, y)); R.pset(x, y1, H('#a84a3a')); }
  for (let x = 90; x < 240; x++) { const y1 = Math.round(perfil(x, 5.1, 126, 22)); for (let y = y1; y < 150; y++) R.pset(x, y, rocaC(ROJ, 4)(x, y)); R.pset(x, y1, ROJ[0]); }
  for (let x = 96; x < 232; x++) for (let y = 140; y < 150; y++) R.pset(x, y, ((x + y * 3) % 9 < 2) ? H('#f8c050') : (y < 143 ? H('#e86a2a') : H('#c84a24')));
  // los muros de la grieta, a los lados, con estratos y filos de luz
  R.poligono(muroIzq, basalto([H('#a84a34'), H('#6e2622'), H('#4a1618'), H('#220a0e')], 1)); filo(muroIzq.slice(1, 8), ROJL[0]);
  R.poligono(muroDer, basalto([H('#a84a34'), H('#6e2622'), H('#4a1618'), H('#220a0e')], 2)); filo(muroDer.slice(1, 8), ROJL[0]);
  for (const [x, y] of [[60, 70], [36, 120], [270, 90], [250, 130]]) for (let j = 0; j < 14; j++) ps(x + Math.sin(j * 0.8) * 2, y + j, j % 3 ? H('#e8803a') : H('#f8c060'));
  // la esquina de Atom y la de la barra del año, roca oscura y tranquila
  const osc = basalto([H('#4a1a1c'), H('#381216'), H('#2e0e12'), H('#200a0e')], 9);
  R.poligono([[0, 0], [118, 0], [112, 18], [0, 24]], osc); R.poligono([[320, 0], [206, 0], [214, 20], [210, 48], [320, 52]], osc);
  // salientes con raíces y cadenas rotas colgando
  for (const [x, y, d] of [[110, 64, -1], [210, 46, 1], [100, 112, -1], [224, 110, 1]]) { R.poligono([[x, y], [x + d * 22, y - 3], [x + d * 26, y + 4], [x + d * 4, y + 6]], rocaC(ROJL, 5)); R.linea(x, y, x + d * 24, y - 2, ROJL[0]); }
  for (const [x, y0, n] of [[30, 30, 9], [292, 62, 7]]) for (let i = 0; i < n; i++) { const y = y0 + i * 4; R.rect(x - 1, y, x + 1, y + 2, H('#2a1a1a')); R.pset(x, y + 1, H('#6a4a3a')); }
  // la repisa de abajo, de roca, con grietas de luz y piedras sueltas
  const rep = [[0, 150], [60, 146], [120, 150], [200, 148], [260, 145], [320, 150], [320, 180], [0, 180]];
  R.poligono(rep, rocaC([H('#8a3a2a'), H('#5e2220'), H('#3e1418'), H('#220a10')], 7)); filo(rep.slice(0, 6), H('#c86a40'));
  for (let i = 0; i < 26; i++) { const x = Math.round(hh(i, 9) * 320), y = Math.round(156 + hh(i, 8) * 22); R.rect(x, y, x + 2, y + 1, H('#2a0c10')); R.pset(x, y, H('#a8503a')); }
});
const abismo = (t, TT, o = {}) => {
  R.copiar(abismoFondo());
  estrellas(110, 0, 214, 40, 26, 41, t, (x, y) => x > 120 && x < 206);
  // las grietas de la repisa laten
  for (let i = 0; i < 6; i++) { const x0 = 20 + i * 52, l = 0.5 + 0.5 * Math.sin(t * 2 + i); for (let j = 0; j < 10; j++) ps(x0 + j * 1.6, 160 + Math.sin(j + i) * 2 + j * 0.8, l > 0.6 ? H('#f8a040') : H('#a84a24')); }
  // cascadas de luz al fondo y brasas que suben
  for (const cx of [128, 196]) for (let y = 96; y < 142; y++) if ((y - Math.floor(t * 30) + cx) % 6 < 2) ps(cx + Math.sin(y * 0.2), y, H('#f8c060'));
  chispas(160, 150, t, 16, 120, 3);
  // murciélagos que salen por la grieta, una piedra que cae
  for (let k = 0; k < 3; k++) { const ph = (t * 0.22 + k * 0.33) % 1; pajaro(150 + k * 14 + Math.sin(t + k) * 8, 120 - ph * 120, t + k, H('#1a0a10')); }
  { const ph = (t * 0.5) % 1; ps(222 - ph * 4, 60 + ph * 90, H('#5a2a24')); ps(223 - ph * 4, 60 + ph * 90, H('#3a1418')); }
  // la luz de Cynthia sube desde la repisa hasta la grieta
  const s = ease(cl((t - TT.sube) / 4.6)), y = lerp(148, 34, s), x = 154 + Math.sin(t * 1.3) * 3 * s;
  if (!o.sinLuz && t > TT.sube - 0.2) { luz(160, y - 14, 70, 60, H('#f4e8ff'), 0.28 * cl((t - TT.sube + 0.2) / 0.6)); figuraLuz(VD.cynthiaVD, x, y, t, { brazos: true }, cl((t - TT.sube + 0.2) / 0.5)); }
  // Doom y Strange en la repisa: Doom alza la mano hacia ella; en «searching» la baja
  const alza = t > TT.sube + 0.25 && t < TT.busca;
  R.actor(EL.strange, 186, 152, t, { dir: -1, sorpresa: t > TT.sube && t < TT.sube + 1.2 });
  R.actor(EL.doom, 116, 152, t, { dir: 1, dedo: alza });
  // la primera estrella que se enciende arriba cuando ella sale
  const e = cl((t - TT.sube - 4.4) / 0.6); if (e > 0) { luz(160, 18, 14, 10, H('#ffffff'), 0.6 * e); R.rect(159, 14, 161, 22, H('#ffffff')); R.rect(156, 17, 164, 19, H('#ffffff')); }
};
'''

E['vd-sanjuan'] = ('La noche de San Juan', '''// VD-SANJUAN (frases 28–29), sin cartela; sin año hasta «1989» y 1989 desde ahí. Diez planos, cortados en la palabra:
// 1. «one night a year» el balcón del castillo en la noche de San Juan: abajo, en el pueblo, bailan alrededor de la
//    hoguera y las coronas de velas bajan por el río; Doom se asoma; en «that boy again» le sale el recuerdo (su madre y
//    él, niño, de la mano) y alza la mano hacia él;
// 2. «because every Midsummer's Eve» el claro del bosque con el círculo de piedras: Doom entra; en «Midsummer» florece
//    el helecho; en «a path opens» el suelo se abre en un camino de luz roja que baja;
// 3. «and Doom crosses it alone» la boca de la cueva: Doom baja solo por el sendero de luz; en «no robots» un robot da
//    un paso y Doom lo para con la mano; en «army» los soldados saludan; en «mother's soul» la lucecita blanca al fondo;
// 4. «And every year» la cámara del castillo: Doom vuelve por la puerta con las manos vacías ante el retrato de su
//    madre; marca otra raya en la pared; en «next year» la ventana pasa un año entero y vuelve a salir;
// 5. «Until in 1989» la calle de Nueva York nevada (1989): el quiosco con su «1989»; el niño abre su cómic; pasa un
//    taxi; Doom sube la escalinata y llama a la puerta de Strange;
// 6. «he gets Doctor Strange» la cripta de Strange: Doom entra; en «owes him a favor» el «1»; en «go down into hell»
//    el círculo del suelo se enciende y los dos se hunden en él; Atom luciérnaga los sigue;
// 7. «And then Doom does something terrible» el trono de Mefisto: sube la mano roja; en «offers» Doom señala a Strange
//    y su alma sale hacia la mano; en «his mother's» la luz de ella aparece en el trono;
// 8. «But it's she» la puerta: se abre y sale la luz con forma de mujer; en «refuses» niega y alza la mano; el alma
//    de Strange vuelve a él;
// 9. «to suffer in her place» la pared de los contratos: ella se lleva la mano al pecho; en «free» arde su contrato;
// 10. «and rises to heaven» el abismo: la luz sube y sale a las estrellas; Doom alza la mano y la baja en «searching»
//    (vd-duelo lo congela).
// Sonido: aldea y brillo; trueno al abrirse; pasos; puerta; coche; toc; zumbido de la mano; cerrojo; brillo al arder.''', _en('vd-sanjuan', COMUN + r'''
const P2 = @T(4.40), P3 = @T(8.60), P4 = @T(14.60), P5 = @T(19.70), P6 = @T(24.40), P7 = @T(29.20), P8 = @T(36.30), P9 = @T(41.20), P10 = @T(46.40);

// ── 1 · el balcón del castillo: la noche de San Juan en el pueblo ─────────────────────────────────────────────────
const fondoBalcon = () => horno('balcon', () => {
  rampa(0, 0, 319, 100, [H('#080c24'), H('#10183a'), H('#1c2152'), H('#302c5e'), H('#4a3460')]);
  for (let i = 0; i < 110; i++) { const x = Math.floor(hh(i, 1) * 320), y = Math.floor(hh(i, 2) * 84); if (!libre(x, y)) continue; R.pset(x, y, hh(i, 3) > 0.85 ? H('#e8ecff') : hh(i, 3) > 0.5 ? H('#8890c0') : H('#5a6098')); }
  // la luna con su halo y sus mares
  R.halo?.(236, 34, 20, [H('#1c2152'), H('#2a2e64'), H('#3a3e78')]);
  R.disco(236, 34, 9, H('#f0ecd8')); R.disco(238, 32, 7, H('#f8f6e8')); R.disco(233, 36, 2, H('#d8d0b8')); R.disco(239, 38, 1.5, H('#d8d0b8')); R.disco(240, 30, 1, H('#e0d8c0'));
  // los montes lejanos en tres capas, con nieve en las cumbres
  for (const [sem, base, amp, c, cN] of [[1.1, 92, 34, H('#3e4676'), H('#a8b0d0')], [3.7, 106, 26, H('#2a3058'), H('#7a82a8')], [6.2, 120, 18, H('#1a1e3a'), null]]) for (let x = 0; x < 320; x++) { const y1 = Math.round(perfil(x, sem, base, amp)); for (let y = y1; y < 140; y++) R.pset(x, y, cN && y < base - amp * 0.6 && y < y1 + 5 ? (y < y1 + 2 || bay(x, y) < 0.5 ? cN : mez(cN, c, 0.5)) : c); }
  // el valle: prados oscuros con trama, el río y el pueblo
  for (let y = 118; y < 180; y++) for (let x = 120; x < 320; x++) R.pset(x, y, bay(x, y) < 0.2 + hh(x >> 2, y >> 2, 6) * 0.2 ? H('#1e3a2a') : H('#16301f'));
  for (let x = 120; x < 320; x++) { const yc = 170 + Math.sin(x * 0.03) * 2; for (let y = Math.round(yc - 3); y <= Math.round(yc + 3); y++) R.pset(x, y, (x + y * 2) % 7 === 0 ? H('#4a5a8a') : H('#22305a')); R.pset(x, Math.round(yc - 4), H('#3a4a3a')); }
  // las casas del pueblo: paredes encaladas, tejados, ventanas encendidas, una iglesia con cúpula de cebolla
  const casas = [[130, 22, 18, H('#8a3a2a')], [156, 18, 14, H('#5a3a2a')], [262, 20, 16, H('#8a3a2a')], [286, 24, 20, H('#6a4430')], [306, 16, 12, H('#8a3a2a')]];
  for (const [x, w, h, tj] of casas) { const b = 140; R.rect(x, b - h, x + w, b, H('#c8bca0')); R.rect(x + w - 3, b - h, x + w, b, H('#a89c84')); R.poligono([[x - 3, b - h], [x + w / 2, b - h - 10], [x + w + 3, b - h]], tj); R.linea(x - 3, b - h, x + w / 2, b - h - 10, H('#a84a32'));
    for (let i = x + 3; i < x + w - 3; i += 7) { R.rect(i, b - h + 4, i + 3, b - h + 8, H('#f8c860')); R.pset(i + 1, b - h + 6, H('#c88a30')); } R.rect(x + 2, b - 6, x + 5, b, H('#4a2a1a')); }
  R.rect(176, 104, 196, 140, H('#d0c4a8')); R.rect(192, 104, 196, 140, H('#a89c84')); R.disco(186, 98, 7, H('#3a7a4a')); R.disco(185, 97, 5, H('#4a9a5a')); R.rect(185, 86, 186, 91, H('#e8c050')); R.rect(183, 88, 188, 88, H('#e8c050'));
  R.rect(182, 110, 189, 118, H('#f8c860')); R.rect(185, 110, 185, 118, H('#4a2a1a')); R.rect(183, 128, 189, 140, H('#4a2a1a'));
  // la explanada de la hoguera (tierra batida)
  for (let y = 146; y < 166; y++) for (let x = 184; x < 270; x++) if (Math.hypot((x - 226) / 44, (y - 156) / 10) < 1) R.pset(x, y, bay(x, y) < 0.3 ? H('#4a3a2a') : H('#3a2c20'));
  // EL CASTILLO, delante a la izquierda: el muro de la torre y la balaustrada del balcón
  bloques(0, 0, 44, 179, [H('#6a6a7a'), H('#4e4e5e'), H('#2e2e3c')], 3, 14, 7);
  R.rect(44, 0, 46, 179, H('#24242e')); R.rect(10, 60, 30, 92, H('#1c1c26')); R.rect(12, 62, 28, 90, H('#f0b850')); R.rect(19, 62, 20, 90, H('#2e2e3c')); R.rect(12, 75, 28, 76, H('#2e2e3c')); R.poligono([[10, 60], [20, 52], [30, 60]], H('#1c1c26'));
  R.rect(46, 148, 142, 151, H('#8a8a98')); R.rect(46, 148, 142, 148, H('#b0b0c0')); R.rect(46, 152, 142, 153, H('#3a3a48'));
  for (let x = 50; x < 140; x += 9) { R.rect(x, 154, x + 4, 169, H('#6a6a7a')); R.rect(x + 3, 154, x + 4, 169, H('#4a4a58')); R.rect(x - 1, 158, x + 5, 160, H('#7a7a8a')); R.pset(x, 155, H('#9a9aaa')); }
  bloques(46, 170, 144, 179, [H('#6a6a7a'), H('#4e4e5e'), H('#2e2e3c')], 8, 12, 5);
});
const p1 = (t) => {
  R.copiar(fondoBalcon());
  const vuelve = @T(2.70), nino = @T(3.30);
  // nubes que pasan por delante de la luna, en tres tonos y tres velocidades
  for (const [x0, y, w, v] of [[40, 30, 46, 2.2], [210, 52, 34, 3.6], [320, 18, 28, 1.4]]) { const x = ((x0 + t * v) % 380) - 40; nube(x, y, w, [H('#4a4a78'), H('#363866'), H('#262a52')], [47, 0, 272, 120]); }
  // el río: las coronas de flores con su vela bajan despacio
  for (let k = 0; k < 4; k++) { const x = 130 + ((k * 52 + t * 6) % 200), y = 170 + Math.sin(x * 0.03) * 2; R.disco(x, y, 2.5, H('#3a6a3a')); ps(x - 2, y, H('#e85a6a')); ps(x + 2, y - 1, H('#f0d060')); llama(x, y - 2, t, 0.5, k); luz(x, y - 2, 6, 4, H('#f8c860'), 0.4); }
  // la hoguera de San Juan con sus chispas y su luz
  luz(226, 140, 46, 30, H('#f8a040'), 0.35);
  const baila = (k) => { const a = t * 1.3 + k * 2.1, x = 226 + Math.cos(a) * 28 - 7, s = 157 + Math.sin(a) * 5; return [x, s, Math.sin(a), -Math.sin(a) > 0 ? 1 : -1]; };
  const gente = [VD.romaniVD, VD.romaniMujerVD, VD.valeriaVD];
  for (let k = 0; k < 3; k++) { const [x, s, z, d] = baila(k); if (z < 0) R.actor(gente[k], x, s, t, { dir: d, anda: true, sonrisa: true }); }
  for (let i = 0; i < 6; i++) { const a = i / 6 * 6.28; R.linea(226, 150, Math.round(226 + Math.cos(a) * 9), Math.round(158 + Math.sin(a) * 2), H('#4a2a1a')); }
  llama(222, 154, t, 2.4, 1); llama(230, 154, t, 2.0, 3); llama(226, 152, t, 3.0, 2); chispas(226, 136, t, 14, 40, 5);
  for (let k = 0; k < 3; k++) { const [x, s, z, d] = baila(k); if (z >= 0) R.actor(gente[k], x, s, t, { dir: d, anda: true, sonrisa: true }); }
  // un chico salta la hoguerita pequeña, una y otra vez
  { const ph = (t / 2.2) % 1, x = lerp(256, 300, ph), sal = Math.max(0, Math.sin(ph * Math.PI)) * 7; llama(284, 172, t, 1.2, 7); R.actor(EL.chicoPueblo ?? EL.chico, x - 7, 176, t, { dir: 1, anda: sal < 1, salto: Math.round(sal), sonrisa: true }); }
  // la bandera verde de la torre se mece
  R.rect(112, 40, 113, 148, H('#4a4a58')); for (let i = 0; i < 26; i++) for (let j = 0; j < 14; j++) { const y = 42 + j + Math.round(Math.sin(t * 4 - i * 0.35) * (i / 26) * 2.5); R.pset(114 + i, y, j === 0 || j === 13 ? H('#1e5a2a') : Math.sin(t * 4 - i * 0.35) > 0.5 ? H('#3a8a4a') : H('#2e7a3e')); }
  // la antorcha del muro
  R.rect(34, 102, 36, 112, H('#4a2a1a')); llama(35, 102, t, 1.4, 4); luz(35, 98, 16, 14, H('#f8b050'), 0.35);
  // Doom se asoma a la balaustrada; en «that boy again» le sale el recuerdo y alza la mano hacia él
  const llega = tramo(t, 0, 1.1), dx = Math.round(lerp(52, 70, llega));
  R.actor(EL.doom, dx, 155, t, { dir: 1, anda: llega > 0 && llega < 1, dedo: t > nino + 0.2 });
  R.rect(46, 148, 142, 151, H('#8a8a98')); R.rect(46, 148, 142, 148, H('#b0b0c0')); R.rect(46, 152, 142, 153, H('#3a3a48'));
  for (let x = 50; x < 140; x += 9) { R.rect(x, 154, x + 4, 169, H('#6a6a7a')); R.rect(x + 3, 154, x + 4, 169, H('#4a4a58')); R.rect(x - 1, 158, x + 5, 160, H('#7a7a8a')); }
  // el recuerdo: un círculo cálido sobre el humo con su madre y él, niño, de la mano
  const r = 26 * ease(tramo(t, nino - 0.2, nino + 0.4)), cx = 188, cy = 64;
  if (t > vuelve) for (let i = 0; i < 3; i++) { const u = cl((t - vuelve - i * 0.2) / 0.3); if (u > 0) R.disco(lerp(dx + 10, cx - 20, (i + 1) / 4), lerp(124, cy + 26, (i + 1) / 4), 1.5 + i, H('#f0d8a8')); }
  if (r > 1) {
    aparte(() => { rampa(cx - 28, cy - 28, cx + 28, cy + 28, [H('#f8e8c0'), H('#f0d098'), H('#d8a868')]);
      for (let x = cx - 28; x <= cx + 28; x++) for (let y = cy + 12; y <= cy + 28; y++) R.pset(x, y, (x + y) % 5 === 0 ? H('#e8e0d0') : H('#f4f0e8'));
      for (let i = 0; i < 8; i++) R.pset(cx - 24 + i * 7, cy - 20 + ((i * 13 + Math.floor(t * 6)) % 30), H('#ffffff'));
      R.actor(VD.cynthiaVD, cx - 16, cy + 18, t, { dir: 1, sonrisa: true, sostiene: [cx - 2, cy + 6] });
      R.actor(VD.victorNinoVD, cx + 1, cy + 18, t, { dir: -1, sonrisa: true, salto: Math.round(Math.abs(Math.sin(t * 5))) }); });
    pegar(cx - r, cy - r, cx + r, cy + r, (x, y, c) => Math.hypot(x + 0.5 - cx, y + 0.5 - cy) < r - 1 ? mez(c, H('#c8945a'), 0.22) : null);
    for (let a = 0; a < 80; a++) { const p = a / 80 * 6.28; ps(cx + Math.cos(p) * r, cy + Math.sin(p) * r, a % 2 ? H('#f8e8c0') : H('#c8945a')); }
  }
};

// ── 2 · el claro del bosque: el helecho florece y se abre el camino ───────────────────────────────────────────────
const fondoClaro = () => horno('claro', () => {
  rampa(0, 0, 319, 100, [H('#070b20'), H('#0e1636'), H('#1a2650'), H('#2e3c66'), H('#46507a')]);
  for (let i = 0; i < 1100; i++) { const u = hh(i, 41), x = u * 320, y = 74 - u * 58 + (hh(i, 42) - 0.5) * 30 * hh(i, 43); if (!libre(x, y)) continue; R.pset(x | 0, y | 0, hh(i, 44) > 0.85 ? H('#dce2ff') : hh(i, 44) > 0.5 ? H('#5a6a9a') : H('#3a4a7a')); }
  for (let i = 0; i < 70; i++) { const x = Math.floor(hh(i, 11) * 320), y = Math.floor(hh(i, 12) * 70); if (!libre(x, y)) continue; R.pset(x, y, hh(i, 13) > 0.7 ? H('#e0e4ff') : H('#6a72a8')); }
  // tres filas de pinos, de lejos a cerca
  const pino = (x, base, h, c, cS) => { const n = Math.max(3, Math.round(h / 10)); R.rect(x - 1, base - h * 0.2, x + 1, base, H('#2a1a12'));
    for (let k = 0; k < n; k++) { const y = base - h * 0.18 - k * (h * 0.8 / n), w = (n - k) * h * 0.09 + 2; R.poligono([[x - w, y], [x, y - h * 0.8 / n - 4], [x + w, y]], c); R.linea(Math.round(x), Math.round(y - h * 0.8 / n - 4), Math.round(x + w), Math.round(y), cS); } };
  for (let i = 0; i < 22; i++) pino(i * 15 + (i % 2) * 6, 100, 40 + (i % 3) * 8, H('#26365c'), H('#3e5280'));
  for (let i = 0; i < 18; i++) pino(i * 19 + 8, 110, 50 + (i % 4) * 6, H('#182842'), H('#2a3e5e'));
  for (let i = 0; i < 14; i++) { const x = i * 24 + 6; if (x > 90 && x < 230) continue; pino(x, 124, 70 + (i % 2) * 12, H('#0e1a24'), H('#1a2c34')); }
  // el suelo del claro: musgo, helechos y florecillas
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const v = R.vnoise(x * 0.07, y * 0.14), n = hh(x >> 1, y >> 1, 4), d = (y - 112) / 68;
    let c = v + d * 0.3 > 0.62 + bay(x, y) * 0.2 ? H('#2c4c34') : v > 0.35 ? H('#22402c') : H('#1a3424'); if (n > 0.9) c = H('#3e6a44'); if (n < 0.06) c = H('#122418');
    const sy = 158 - x * 0.12 + Math.sin(x * 0.08) * 2; if (x < 150 && Math.abs(y - sy) < 3 + x * 0.02) c = bay(x, y) < 0.4 ? H('#5a4a3a') : H('#4a3c2e');
    R.pset(x, y, c); }
  for (let i = 0; i < 22; i++) { const x = Math.round(hh(i, 81) * 300 + 10), y = Math.round(118 + hh(i, 82) * 56); if (Math.abs(x - 166) < 50 && Math.abs(y - 142) < 14) continue;
    for (let k = -3; k <= 3; k++) for (let j = 0; j < 7 - Math.abs(k); j++) R.pset(x + k + Math.round(k * j * 0.15), y - j, j % 2 ? H('#3e7a44') : H('#2e6236')); }
  for (let i = 0; i < 7; i++) { const x = Math.round(hh(i, 91) * 280 + 20), y = Math.round(150 + hh(i, 92) * 24); R.rect(x, y - 2, x, y, H('#e8e0d0')); R.rect(x - 2, y - 4, x + 2, y - 3, H('#c83a2a')); R.pset(x - 1, y - 4, H('#ffffff')); R.pset(x + 1, y - 3, H('#ffffff')); }
  for (let i = 0; i < 9; i++) { const x = Math.round(hh(i, 95) * 300 + 10), y = Math.round(130 + hh(i, 96) * 44); R.rect(x - 2, y - 1, x + 2, y + 1, H('#5a5e6a')); R.rect(x - 1, y - 2, x + 1, y - 2, H('#7a7e8a')); }
  for (let i = 0; i < 40; i++) { const x = Math.round(hh(i, 21) * 320), y = Math.round(116 + hh(i, 22) * 62); R.pset(x, y, hh(i, 23) > 0.5 ? H('#c8c0f0') : H('#f0e0a0')); R.pset(x, y + 1, H('#2a4a2a')); }
  // el círculo de piedras (dos al fondo, cuatro delante), con musgo y su sombra
  for (const [x, b, w, h] of [[118, 128, 10, 26], [152, 124, 9, 22], [190, 125, 9, 24], [224, 129, 10, 26], [92, 150, 13, 34], [244, 152, 13, 36]]) {
    const pts = [[x - w / 2, b], [x - w / 2 + 1, b - h + 5], [x - 1, b - h], [x + w / 2 - 1, b - h + 3], [x + w / 2, b]];
    for (let i = -w; i <= w; i++) R.pset(x + i, b + 1, H('#0e1a12'));
    R.poligono(pts, rocaC([H('#8a90a0'), H('#646a7c'), H('#444a5a'), H('#2e3240')], x)); filo(pts.slice(0, 3), H('#a8b0c0'));
    for (let j = 0; j < 4; j++) R.pset(x - w / 2 + 1 + j, b - 3 - (j % 2), H('#3a6a3a')); }
});
const p2 = (t) => {
  R.copiar(fondoClaro());
  const florece = @T(5.20), abre = @T(6.30), cx = 166, cy = 142;
  estrellas(0, 0, 320, 70, 18, 7, t);
  for (const [x0, y, w, v] of [[30, 40, 44, 2.0], [190, 26, 36, 3.2], [300, 58, 52, 1.2]]) nube(((x0 + t * v) % 400) - 50, y, w, [H('#5a6488'), H('#3e4870'), H('#2e365c')], [0, 22, 272, 92]);
  for (let k = 0; k < 2; k++) pajaro(((t * 9 + k * 140) % 360) - 20, 34 + k * 12 + Math.sin(t + k) * 3, t + k, H('#0e1226'));
  // el búho en la rama seca, que parpadea y gira la cabeza hacia la luz
  R.linea(0, 74, 44, 68, H('#2a1a12')); R.linea(0, 75, 44, 69, H('#1a100a'));
  { const x = 28, y = 64, gira = t > abre ? 1 : 0; R.disco(x, y, 5, H('#6a5040')); R.disco(x, y - 6, 4, H('#7a6048')); R.pset(x - 3, y - 10, H('#6a5040')); R.pset(x + 3, y - 10, H('#6a5040'));
    const ab = (t * 0.7) % 3 > 0.12; R.pset(x - 2 + gira, y - 6, ab ? H('#f0c040') : H('#4a3020')); R.pset(x + 2 + gira, y - 6, ab ? H('#f0c040') : H('#4a3020')); R.pset(x + gira, y - 4, H('#d8a040')); R.pset(x - 1, y + 4, H('#e0a040')); R.pset(x + 1, y + 4, H('#e0a040')); }
  // las luciérnagas
  for (let i = 0; i < 10; i++) { const x = 40 + hh(i, 31) * 250 + Math.sin(t * 0.7 + i) * 10, y = 96 + hh(i, 32) * 50 + Math.cos(t * 0.9 + i * 2) * 6; if (Math.sin(t * 3 + i * 1.7) > -0.2) { ps(x, y, H('#e8f880')); luz(x, y, 3, 3, H('#c8f060'), 0.5); } }
  // el helecho del centro: su yema brilla; en «Midsummer» florece (oro y rojo)
  const fl = ease(tramo(t, florece - 0.3, florece + 0.5)), op = ease(tramo(t, abre - 0.1, abre + 0.9));
  for (const [dx, d] of [[-1, -1], [1, 1], [0, -1], [0, 1]]) for (let j = 0; j < 12; j++) { const x = cx + dx * 2 + d * j * 0.9, y = cy - j * 0.8 + j * j * 0.05 * (1 + op * 4); ps(x, y, H('#3a7a3a')); if (j % 2) ps(x + d, y + 1, H('#4a9a4a')); }
  if (op < 0.95) { const fy = cy - 12 - op * 30, a = 1 - op; luz(cx, fy, 10 + fl * 8, 10 + fl * 8, H('#f8c040'), 0.5 * a + 0.2 * fl);
    if (fl > 0) for (let k = 0; k < 6; k++) { const p = k / 6 * 6.28 + t * 0.5; R.disco(cx + Math.cos(p) * 3 * fl, fy + Math.sin(p) * 3 * fl, 1.8 * fl, k % 2 ? H('#f8c040') : H('#e84a2a')); }
    R.disco(cx, fy, 1.5 + fl, H('#fff4b0')); }
  // en «a path opens» el suelo se raja y se abre un camino de luz roja que baja
  if (op > 0) {
    for (let k = 0; k < 7; k++) { const a = k / 7 * 6.28 + 0.3, L = 20 + op * 36; for (let i = 0; i < L; i += 1) { const x = cx + Math.cos(a) * i * 1.6 + Math.sin(i * 0.7 + k) * 1.5, y = cy + Math.sin(a) * i * 0.32; ps(x, y, i < L * 0.6 ? H('#f8a040') : H('#a83a24')); } }
    const rx = 40 * op, ry = 9 * op;
    for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d >= 1) continue;
      const esc = Math.floor((y - (cy - ry)) / 3) % 2, c = d > 0.86 ? H('#2a0a10') : esc ? H('#e86a2a') : H('#f8b040'); R.pset(x, y, ((x + Math.floor(t * 12)) % 9 === 0 && d < 0.8) ? H('#fff0b0') : c); }
    // la columna de luz y su resplandor en las piedras
    for (let y = 0; y < cy; y++) for (let x = Math.round(cx - rx * 0.8); x <= cx + rx * 0.8; x++) { const g = op * 0.5 * (y / cy) * (1 - Math.abs(x - cx) / (rx * 0.8 + 1)); if (g > bay(x, y) + 0.12 && libre(x, y)) R.pset(x, y, mez(R.pget(x, y), H('#e85a2a'), g)); }
    luz(cx, cy - 10, 110, 50, H('#e8502a'), 0.3 * op); chispas(cx, cy, t, 18, 70, 9);
  }
  // Doom llega desde la izquierda y se para al borde; da un paso cuando se abre
  const a1 = tramo(t, P2, P2 + 1.9), a2 = tramo(t, abre + 1.0, abre + 1.8), x = Math.round(lerp(-16, 96, ease(a1)) + a2 * 14);
  R.actor(EL.doom, x, 150, t, { dir: 1, anda: (a1 > 0 && a1 < 1) || (a2 > 0 && a2 < 1), dedo: t > abre + 0.2 && t < abre + 1.0 });
  // delante: helechos y hierbas que se mecen
  for (let i = 0; i < 12; i++) { const x0 = i < 6 ? i * 8 : 260 + (i - 6) * 10, b = 180, h = 14 + (i % 3) * 5, s = Math.sin(t * 1.6 + i) * 2; for (let j = 0; j < h; j++) { const x = x0 + s * j / h + (i % 2 ? j * 0.4 : -j * 0.4); ps(x, b - j, j % 3 ? H('#2a5a32') : H('#3e7a44')); if (j % 3 === 0) { ps(x - 1, b - j + 1, H('#24502c')); ps(x + 1, b - j + 1, H('#24502c')); } } }
};

// ── 3 · la boca de la cueva: Doom baja solo; los robots y el ejército se quedan arriba ──────────────────────────
const HUECO = [[8, 108], [12, 76], [26, 56], [48, 50], [66, 60], [76, 82], [74, 108]];
const SENDA = [[70, 108], [110, 118], [150, 126], [180, 140], [214, 150], [250, 160], [300, 172]];
const enSenda = (u) => { const n = SENDA.length - 1, f = cl(u) * n, i = Math.min(n - 1, Math.floor(f)), v = f - i; return [lerp(SENDA[i][0], SENDA[i + 1][0], v), lerp(SENDA[i][1], SENDA[i + 1][1], v)]; };
const fondoCueva = () => horno('cueva', () => {
  // la bóveda roja con estalactitas; lejos, montes rojos, cascadas y un río de luz
  rampa(0, 0, 319, 120, [H('#1e080c'), H('#3a1016'), H('#5a1a1c'), H('#8a2e22'), H('#b84a2a')]);
  for (const [sem, base, amp, P] of [[2.4, 96, 30, [H('#6a2a2a'), H('#4e1e22'), H('#3a141a'), H('#2a0c12')]], [4.8, 118, 24, ROJ]]) for (let x = 60; x < 320; x++) { const y1 = Math.round(perfil(x, sem, base, amp)); for (let y = y1; y < 180; y++) R.pset(x, y, rocaC(P, sem)(x, y)); R.pset(x, y1, P[0]); }
  for (let x = 120; x < 320; x++) { const yc = 132 + Math.sin(x * 0.04) * 3; for (let y = Math.round(yc - 2); y <= Math.round(yc + 2); y++) R.pset(x, y, (x * 3 + y) % 7 < 2 ? H('#f8d060') : H('#e8702a')); }
  // la pared de la izquierda con la boca, por la que se ve la noche del bosque
  R.poligono([[0, 0], [100, 0], [96, 30], [84, 46], [90, 120], [70, 180], [0, 180]], rocaC(ROJ, 11));
  R.poligono(HUECO, (x, y) => (y < 80 ? (bay(x, y) < 0.3 ? H('#14203e') : H('#0c1430')) : bay(x, y) < 0.4 ? H('#1e3626') : H('#16301f')));
  for (let i = 0; i < 12; i++) { const x = 16 + Math.round(hh(i, 51) * 54), y = 58 + Math.round(hh(i, 52) * 22); if (dentroP(HUECO, x, y)) R.pset(x, y, H('#c8ccf0')); }
  for (const [x, h] of [[22, 16], [36, 20], [60, 14]]) R.poligono([[x - 3, 94], [x - 2, 94 - h], [x + 2, 94 - h + 2], [x + 3, 94]], H('#3a4256'));
  filo(HUECO, H('#e8784a'));
  // estalactitas del techo (fuera de la esquina de Atom y de la barra)
  for (let i = 0; i < 18; i++) { const x = 6 + i * 17 + Math.round(hh(i, 61) * 6), L = 8 + Math.round(hh(i, 62) * 16); if (x > 268 || (x > 14 && x < 176)) continue; R.poligono([[x - 4, 0], [x + 4, 0], [x, L]], rocaC(ROJL, i)); }
  for (let i = 0; i < 7; i++) { const x = 180 + i * 13, L = 6 + (i % 3) * 5; if (x > 268) continue; R.poligono([[x - 3, 0], [x + 3, 0], [x, L]], rocaC(ROJL, i)); }
  // el sendero de losas oscuras con juntas de luz
  for (let i = 0; i < SENDA.length - 1; i++) { const [ax, ay] = SENDA[i], [bx, by] = SENDA[i + 1], w0 = 4 + i * 1.6, w1 = 4 + (i + 1) * 1.6;
    R.poligono([[ax, ay - w0], [bx, by - w1], [bx, by + w1], [ax, ay + w0]], (x, y) => ((x + y * 2) % 11 === 0 || (y % 5 === 0) ? H('#e8803a') : (hh(x >> 2, y >> 2, 3) > 0.5 ? H('#3a1a1e') : H('#2e1418')))); }
  // la roca de delante a la derecha (tapa el pie de la senda)
  const del = [[320, 120], [290, 132], [276, 152], [260, 180], [320, 180]]; R.poligono(del, rocaC(ROJL, 21)); filo(del.slice(0, 4), H('#f0905a'));
});
const p3 = (t) => {
  R.copiar(fondoCueva());
  const robots = @T(10.40), ejercito = @T(11.60), madre = @T(13.30);
  // humo que pasa y brasas que suben; cascadas de luz al fondo
  for (const [x0, y, w, v] of [[0, 40, 40, 3], [160, 62, 50, 5], [260, 30, 30, 2]]) { const x = ((x0 + t * v) % 400) - 60; nube(x, y, w, [H('#8a3a34'), H('#6a2a2a'), H('#4e1e22')], [100, 0, 268, 120]); }
  for (const cx of [212, 244]) for (let y = 80; y < 130; y++) if ((y - Math.floor(t * 30) + cx) % 6 < 2) ps(cx + Math.sin(y * 0.2), y, H('#f8c060'));
  chispas(200, 170, t, 14, 150, 13);
  // la ola de luz que recorre el sendero
  for (let k = 0; k < 2; k++) { const u = ((t * 0.25 + k * 0.5) % 1); const [x, y] = enSenda(u); luz(x, y, 10, 4, H('#f8c060'), 0.6); }
  // al fondo, en «mother's soul», la lucecita blanca tras los montes
  const m = cl((t - madre) / 0.5) * (0.7 + 0.3 * Math.sin(t * 4)); if (m > 0) { luz(256, 84, 16, 14, H('#ffffff'), 0.7 * m); R.disco(256, 84, 2.2 * m, H('#ffffff')); }
  // en la boca: dos robots de hierro y dos soldados; uno de los robots da un paso y vuelve
  const paso = tramo(t, robots - 0.3, robots + 0.2) * (1 - tramo(t, robots + 1.0, robots + 1.5));
  aparte(() => { R.actor(EL.doom, 14, 108, t, { dir: 1, quieto: true }); R.actor(EL.doom, Math.round(30 + paso * 12), 108, t, { dir: 1, anda: paso > 0 && paso < 1 }); R.actor(VD.soldadoVD, 46, 108, t, { dir: 1, dedo: t > ejercito }); R.actor(VD.soldadoVD, 58, 108, t, { dir: 1, dedo: t > ejercito + 0.2 }); });
  pegar(0, 40, 100, 108, (x, y, c) => dentroP(HUECO, x + 0.5, y + 0.5) ? c : null);
  for (const [x, k] of [[21, 0], [37 + Math.round(paso * 12), 1]]) if ((t * 0.6 + k) % 2.2 > 0.15) { ps(x - 2, 90, H('#ff4040')); ps(x + 1, 90, H('#ff4040')); }
  // Doom baja solo por la senda; en «no robots» se vuelve y alza la mano; luego sigue y mira la luz del fondo
  const u1 = tramo(t, P3 + 0.1, robots - 0.1), u2 = tramo(t, robots + 1.3, madre - 0.1), u = lerp(0.04, 0.38, ease(u1)) + 0.34 * ease(u2) + 0.08 * tramo(t, madre + 0.6, P4);
  const [dx, dy] = enSenda(u), vuelta = t > robots - 0.1 && t < robots + 1.3;
  R.actor(EL.doom, Math.round(dx - 7), Math.round(dy + 2), t, { dir: vuelta ? -1 : 1, anda: (u1 > 0 && u1 < 1) || (u2 > 0 && u2 < 1) || (t > madre + 0.6 && t < P4), dedo: (vuelta && t > robots) || (t > madre && t < madre + 0.6) });
  const del = [[320, 120], [290, 132], [276, 152], [260, 180], [320, 180]]; R.poligono(del, rocaC(ROJL, 21)); filo(del.slice(0, 4), H('#f0905a'));
  // Atom luciérnaga se queda en la boca, con los robots
  T.AT.luciernaga(R, 70 + Math.sin(t * 1.5) * 4, 70 + Math.cos(t * 2) * 3, t, { cara: t > robots ? 'sorpresa' : 'normal', dir: 1 });
};

// ── 4 · la cámara del castillo: vuelve con las manos vacías; pasa el año y vuelve a salir ─────────────────────────
const fondoCamara = () => horno('camara', () => {
  bloques(0, 0, 319, 150, [H('#5a5a6a'), H('#44444e'), H('#2a2a34')], 13, 18, 9);
  // el suelo de losas con la alfombra verde
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const j = Math.floor((y - 150) / 6), w = 14 + j * 3, jx = (x + j * 7) % w; R.pset(x, y, (y - 150) % 6 === 0 || jx === 0 ? H('#26262e') : hh(Math.floor((x + j * 7) / w), j, 5) > 0.6 ? H('#4a4a54') : H('#3e3e48')); }
  for (let y = 158; y < 176; y++) for (let x = 60; x < 300; x++) { const bx = (x - 60) % 16, by = y - 158, rombo = Math.abs(bx - 8) + Math.abs(by - 8.5) < 5; R.pset(x, y, y === 158 || y === 175 ? H('#c8a040') : y === 160 || y === 173 ? H('#1e5a2a') : rombo ? (Math.abs(bx - 8) + Math.abs(by - 8.5) < 2 ? H('#c8a040') : H('#3a8a4a')) : (x + y) % 6 === 0 ? H('#1e5a2a') : H('#2e7a3e')); }
  for (let x = 60; x < 300; x += 3) { R.pset(x, 176, H('#c8a040')); R.pset(x + 1, 177, H('#a88a30')); }
  // la chimenea de piedra bajo las rayas, con su repisa (el fuego lo pinta la escena)
  R.rect(258, 112, 314, 150, H('#5a5a68')); bloques(260, 114, 312, 150, [H('#7a7a88'), H('#5e5e6c'), H('#3a3a46')], 31, 10, 6); R.rect(254, 108, 318, 112, H('#6a4024')); R.rect(254, 108, 318, 108, H('#8a5a34'));
  R.rect(270, 124, 302, 150, H('#140c0c')); R.poligono([[270, 124], [286, 118], [302, 124]], H('#140c0c'));
  R.rect(274, 146, 298, 148, H('#3a2a2a')); for (const x of [276, 284, 292]) R.rect(x, 143, x + 5, 145, H('#5a3a22'));
  R.rect(260, 102, 266, 107, H('#c8a040')); R.rect(300, 100, 304, 107, H('#8a8a98'));
  // la puerta de roble con herrajes (cerrada; la abre la escena)
  R.rect(12, 74, 54, 150, H('#1c1418')); R.poligono([[12, 76], [33, 60], [54, 76]], H('#1c1418'));
  // el ventanal en arco (el cielo lo pinta la escena)
  R.rect(116, 26, 186, 118, H('#2a2a34')); R.poligono([[116, 30], [151, 12], [186, 30]], H('#2a2a34'));
  R.rect(112, 118, 190, 124, H('#6a6a78')); R.rect(112, 118, 190, 118, H('#8a8a98'));
  // el tapiz verde con la máscara (sin letras) a la izquierda del ventanal
  R.rect(70, 30, 100, 92, H('#1e5a2a')); for (let y = 30; y < 92; y++) for (let x = 70; x <= 100; x++) if ((x + y) % 4 === 0) R.pset(x, y, H('#2e7a3e')); R.rect(70, 30, 100, 31, H('#c8a040')); R.rect(70, 91, 100, 92, H('#c8a040'));
  for (let x = 72; x < 100; x += 4) R.rect(x, 93, x + 1, 97, H('#c8a040')); T.c_mascara(R, 85, 60, 0, 1, 0);
  // el retrato de su madre con marco dorado
  R.rect(206, 44, 252, 100, H('#8a6a20')); R.rect(208, 46, 250, 98, H('#e8c050')); R.rect(211, 49, 247, 95, H('#3a2a3a'));
  for (let y = 49; y <= 95; y++) for (let x = 211; x <= 247; x++) R.pset(x, y, mez(H('#5a3a4a'), H('#2a1e2a'), (y - 49) / 46));
  R.recorte([211, 49, 247, 95]); R.actor(VD.cynthiaVD, 222, 104, 0, { dir: 1, quieto: true, sonrisa: true }); R.recorte(null);
  // la mesita con la vela, bajo el retrato
  R.rect(212, 122, 246, 125, H('#6a4024')); R.rect(214, 126, 216, 150, H('#4a2a18')); R.rect(242, 126, 244, 150, H('#4a2a18')); R.rect(212, 122, 246, 122, H('#8a5a34'));
  // las rayas de la pared: un año, una raya (de cinco en cinco)
  for (let i = 0; i < 31; i++) { const g = Math.floor(i / 5), k = i % 5, x = 262 + (g % 2) * 26 + k * 4, y = 60 + Math.floor(g / 2) * 16; if (k < 4) R.linea(x, y, x, y + 10, H('#a8a8b8')); else R.linea(x - 17, y + 8, x - 1, y + 2, H('#a8a8b8')); }
});
const p4 = (t) => {
  R.copiar(fondoCamara());
  const vacias = @T(16.30), otro = @T(18.00), intenta = @T(18.70);
  // el ventanal: en «next year» pasa un año entero (la noche, el sol que cruza, la noche otra vez)
  const ciclo = ease(tramo(t, otro, intenta + 0.4)), dia = Math.sin(ciclo * Math.PI);
  R.recorte([118, 14, 184, 117]);
  for (let y = 12; y <= 117; y++) { const c = mez(mez(H('#0c1430'), H('#1c2a5a'), (y - 12) / 100), mez(H('#5aa0e0'), H('#c8e0f0'), (y - 12) / 100), dia); for (let x = 118; x <= 184; x++) if (y > 30 || Math.hypot(x - 151, (y - 30) * 1.8) < 35) R.pset(x, y, c); }
  if (dia < 0.4) estrellas(118, 14, 184, 80, 14, 55, t);
  { const a = ciclo * Math.PI, sx = 151 - Math.cos(a) * 30, sy = 92 - Math.sin(a) * 60; if (ciclo > 0 && ciclo < 1) { R.disco(sx, sy, 6, H('#f8e070')); R.disco(sx, sy, 4, H('#fff8c0')); } else R.disco(170, 40, 5, H('#f0ecd8')); }
  for (let x = 118; x <= 184; x++) { const y1 = Math.round(perfil(x, 1.7, 112, 16)); for (let y = y1; y <= 117; y++) R.pset(x, y, mez(H('#1a2038'), H('#4a6a8a'), dia)); }
  for (const [x0, y, w, v] of [[0, 50, 20, 4], [40, 70, 16, 6]]) nube(((x0 + t * v * (1 + ciclo * 20)) % 90) + 104, y, w, dia > 0.5 ? [H('#ffffff'), H('#e0e8f0'), H('#c0c8d8')] : [H('#3a4068'), H('#2a3058'), H('#202648')], [118, 14, 184, 117]);
  R.recorte(null);
  R.rect(150, 14, 152, 117, H('#2a2a34')); R.rect(118, 66, 184, 67, H('#2a2a34'));
  // el haz de luz del ventanal en el suelo (de día), con polvo que flota
  if (dia > 0.05) { for (let y = 124; y < 176; y++) for (let x = 0; x < 320; x++) { const xl = 120 + (y - 124) * 0.9, xr = 186 + (y - 124) * 1.2; if (x > xl && x < xr && bay(x, y) < 0.3 * dia) R.pset(x, y, mez(R.pget(x, y), H('#f8e8b0'), 0.4)); } }
  for (let i = 0; i < 6; i++) ps(130 + hh(i, 71) * 60 + Math.sin(t + i) * 4, 70 + ((t * 4 + i * 17) % 60), H('#c8c0a0'));
  // la antorcha de la pared y la vela bajo el retrato (en «next year» se consume y se vuelve a encender)
  R.rect(102, 104, 104, 114, H('#4a2a18')); llama(103, 104, t, 1.3, 2); luz(103, 98, 18, 16, H('#f8b050'), 0.3);
  { const h = Math.round(lerp(12, 2, tramo(t, otro, intenta)) + 10 * tramo(t, intenta, intenta + 0.3)); R.rect(227, 121 - h, 231, 121, H('#f0ecd8')); R.rect(230, 121 - h, 231, 121, H('#c8c0a8')); if (t < intenta - 0.3 || t > intenta) { llama(229, 121 - h, t, 1, 5); luz(229, 116 - h, 16, 14, H('#f8c060'), 0.35); } }
  // la puerta: se abre cuando entra y cuando vuelve a salir
  const ab = Math.max(tramo(t, P4, P4 + 0.4) * (1 - tramo(t, P4 + 1.4, P4 + 1.9)), tramo(t, intenta + 0.4, intenta + 0.8));
  R.rect(16, 78, 50, 150, H('#0c0a10')); { const w = Math.round(34 * (1 - ab * 0.8)); R.rect(16, 78, 16 + w, 150, H('#5a3a22')); for (let x = 16; x < 16 + w; x += 6) R.rect(x, 78, x, 150, H('#3a2414')); for (const y of [88, 136]) R.rect(16, y, 16 + w, y + 2, H('#2a2a30')); R.disco(16 + w - 4, 116, 2, H('#c8a040')); }
  // Doom entra con las manos vacías, se planta ante el retrato, marca la raya, y en «tries again» vuelve a salir
  const ent = tramo(t, P4 + 0.3, P4 + 1.5), sal = tramo(t, intenta, P5 + 0.2);
  const x = Math.round(t < intenta ? lerp(18, 192, ease(ent)) : lerp(192, 24, ease(sal)));
  R.actor(EL.doom, x, 156, t, { dir: t < intenta ? 1 : -1, anda: (ent > 0 && ent < 1) || (sal > 0 && sal < 1), brazos: t > vacias - 0.2 && t < vacias + 0.6, dedo: t > vacias + 0.7 && t < otro });
  // la raya nueva: una chispa verde la graba en la piedra
  const r = tramo(t, vacias + 0.8, vacias + 1.3); if (r > 0) { R.linea(304, 92, 304, 92 + Math.round(10 * r), H('#e8f0e0')); if (r < 1) { luz(304, 92 + 10 * r, 6, 6, H('#80ff90'), 0.7); ps(304, 92 + 10 * r, H('#ffffff')); } }
  llama(282, 144, t, 1.6, 1); llama(290, 144, t, 1.9, 2); llama(286, 143, t, 2.2, 3); luz(286, 136, 30, 18, H('#f8a040'), 0.35); chispas(286, 138, t, 6, 16, 2);
  // un cuervo en el alféizar que ladea la cabeza
  { const x = 168, y = 116, l = Math.sin(t * 2) > 0 ? 1 : 0; R.rect(x - 4, y - 4, x + 3, y, H('#14121a')); R.rect(x + 2, y - 7 - l, x + 5, y - 3 - l, H('#14121a')); ps(x + 4, y - 6 - l, H('#e8e8f0')); ps(x + 6, y - 5 - l, H('#c8a040')); R.rect(x - 7, y - 3, x - 4, y - 2, H('#14121a')); }
};

// ── 5 · Nueva York nevada, 1989: el quiosco, el taxi y la puerta de Strange ──────────────────────────────────────
const fondoCalle = () => horno('calle', () => {
  rampa(0, 0, 319, 100, [H('#0a0e22'), H('#141a36'), H('#22284a'), H('#3a3a5a')]);
  // los edificios del fondo con ventanas encendidas
  for (const [x, w, h, c] of [[0, 34, 76, H('#22263a')], [34, 40, 92, H('#1c2032')], [74, 30, 70, H('#262a3e')], [104, 44, 100, H('#1e2234')], [148, 26, 80, H('#24283c')]]) { R.rect(x, 140 - h, x + w, 140, c); R.rect(x, 140 - h, x + w, 140 - h + 1, mez(c, H('#ffffff'), 0.15));
    for (let y = 140 - h + 6; y < 128; y += 8) for (let i = x + 3; i < x + w - 3; i += 6) { const on = hh(i, y, 3) > 0.45; R.rect(i, y, i + 2, y + 3, on ? (hh(i, y, 4) > 0.5 ? H('#f8d080') : H('#e0b060')) : H('#141826')); } }
  // la fachada de la casa de Strange: ladrillo, cornisa, ventanas con cortinas y luz cálida, la escalinata
  for (let y = 24; y < 152; y++) for (let x = 168; x < 320; x++) { const fila = Math.floor(y / 4), off = fila % 2 ? 4 : 0; R.pset(x, y, y % 4 === 3 || (x + off) % 8 === 7 ? H('#4a2a24') : hh((x + off) >> 3, fila, 7) > 0.7 ? H('#7a4232') : H('#6a382a')); }
  for (let y = 24; y < 52; y++) for (let x = 268; x < 320; x++) R.pset(x, y, (x + y) % 2 ? H('#5a302a') : H('#56302a'));
  R.rect(166, 20, 320, 26, H('#3a2a2a')); R.rect(166, 20, 320, 21, H('#6a5048'));
  for (const [x, y] of [[184, 40], [214, 40], [184, 84], [266, 84], [296, 84]]) { R.rect(x - 1, y - 1, x + 17, y + 26, H('#e0d8c8')); R.rect(x, y, x + 16, y + 25, H('#f8c870')); R.rect(x, y, x + 4, y + 25, H('#a83a3a')); R.rect(x + 12, y, x + 16, y + 25, H('#a83a3a')); R.rect(x + 8, y, x + 8, y + 25, H('#5a3a2a')); R.rect(x, y + 12, x + 16, y + 12, H('#5a3a2a')); R.rect(x - 2, y + 26, x + 18, y + 27, H('#c8c0b0')); }
  // la ventana redonda de arriba (celosía de rombos, sin dibujos)
  R.disco(242, 54, 15, H('#e0d8c8')); R.disco(242, 54, 13, H('#f0b860')); for (let i = -13; i <= 13; i += 4) { R.linea(242 + i - 9, 45, 242 + i + 9, 63, H('#6a3a2a')); R.linea(242 + i + 9, 45, 242 + i - 9, 63, H('#6a3a2a')); }
  R.anillo?.(242, 54, 14, H('#c8c0b0'));
  // la puerta de doble hoja con su montante y los peldaños con barandilla
  R.rect(228, 92, 256, 132, H('#e0d8c8')); R.rect(230, 94, 254, 132, H('#3a1e14')); R.poligono([[228, 94], [242, 82], [256, 94]], H('#e0d8c8')); R.rect(232, 88, 252, 93, H('#f0c060'));
  for (let i = 0; i < 4; i++) { const y = 132 + i * 5; R.rect(220 - i * 4, y, 264 + i * 4, y + 4, H('#8a8290')); R.rect(220 - i * 4, y, 264 + i * 4, y, H('#d8d8e8')); }
  for (const x0 of [212, 266]) { const d = x0 < 240 ? -1 : 1; for (let i = 0; i <= 18; i++) { const x = x0 + d * i, y = 126 + i * 1.2; if (i % 4 === 0) R.rect(x, y, x, y + 12, H('#1a1a22')); ps(x, y, H('#2a2a34')); } }
  // la acera con nieve y el bordillo; la calzada con rodadas
  for (let y = 152; y < 162; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 18 === 0 || y === 152) ? H('#a8acc0') : bay(x, y) < 0.5 ? H('#d8dcec') : H('#c8ccdc'));
  R.rect(0, 162, 319, 163, H('#5a5a6a'));
  for (let y = 164; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y === 169 || y === 175) && x % 4 < 3 ? H('#2a2c36') : bay(x, y) < 0.25 ? H('#6a6c7c') : H('#4a4c5a'));
  // la farola
  R.rect(149, 60, 151, 152, H('#1a1a22')); R.rect(144, 56, 156, 60, H('#1a1a22')); R.rect(146, 60, 154, 64, H('#f8e8a0'));
  // el quiosco: tejadillo de rayas, revistas colgadas y el mostrador
  R.rect(20, 92, 102, 152, H('#2e5a3a')); R.rect(20, 92, 102, 94, H('#1e3a26'));
  for (let x = 16; x < 106; x++) for (let y = 86; y < 94; y++) R.pset(x, y, Math.floor(x / 6) % 2 ? H('#e8e0d0') : H('#c83a3a'));
  R.rect(26, 104, 96, 130, H('#1a2a1e'));
  for (let i = 0; i < 9; i++) { const x = 28 + i * 7.6, c = [H('#e84a3a'), H('#3a8ae8'), H('#f0c040'), H('#4ac85a'), H('#e87ac8'), H('#f0f0f0'), H('#e8802a'), H('#8a5ae8'), H('#3ac8c8')][i]; R.rect(x, 106, x + 6, 116, c); R.rect(x + 1, 108, x + 5, 110, H('#f8f8f8')); R.rect(x + 2, 112, x + 4, 114, K); R.pset(x + 3, 105, H('#c8c8c8')); }
  R.rect(22, 130, 100, 152, H('#3a6a4a')); R.rect(22, 130, 100, 131, H('#5a8a6a'));
  for (let i = 0; i < 5; i++) { const x = 26 + i * 15; R.rect(x, 134, x + 11, 146, [H('#e8e0d0'), H('#d8d0c0'), H('#f0e8d8'), H('#e0d8c8'), H('#e8e0d0')][i]); R.rect(x + 1, 136, x + 10, 136, H('#8a8a9a')); R.rect(x + 1, 139, x + 8, 139, H('#8a8a9a')); }
});
const p5 = (t) => {
  R.copiar(fondoCalle());
  const anio = @T(20.40), comic = @T(22.40), llama_ = @T(23.80);
  // la luz de la farola y la nieve que cae
  luz(150, 70, 30, 40, H('#f8e8a0'), 0.25);
  // el rótulo del quiosco: en «1989» se encienden las bombillas y el número
  const on = t > anio; R.rect(30, 95, 92, 103, on ? H('#f8f0c0') : H('#2a3a2e')); R.numero('1989', 61, 102, { centro: true, color: on ? H('#c83a3a') : H('#5a6a5a'), sombra: false });
  for (let i = 0; i < 8; i++) R.pset(32 + i * 8, 94, on && (Math.floor(t * 6) + i) % 2 ? H('#fff0a0') : H('#8a8a6a'));
  // el quiosquero dentro y el niño que lee su cómic (en «comic» lo abre)
  R.recorte([26, 100, 96, 130]); R.actor(EL.neoyorquino2 ?? EL.vecino, 54, 134, t, { dir: 1, habla: Math.sin(t * 2) > 0.6 }); R.recorte(null);
  R.rect(22, 130, 100, 131, H('#5a8a6a'));
  const abre = t > comic; const kn = R.actor(EL.nino85 ?? EL.chico, 108, 158, t, { dir: -1, sostiene: true, sorpresa: t > comic && t < comic + 0.8, sonrisa: t > comic + 0.8 });
  { const [mx, my] = kn.mano; if (abre) { R.rect(mx - 9, my - 7, mx, my + 2, H('#f0ecd8')); R.rect(mx - 9, my - 7, mx - 9, my + 2, K); R.rect(mx - 7, my - 5, mx - 3, my - 2, H('#3a8a4a')); R.rect(mx, my - 7, mx + 8, my + 2, H('#f0ecd8')); R.rect(mx + 2, my - 5, mx + 6, my, H('#e84a3a')); R.rect(mx, my - 7, mx, my + 2, H('#c8c0a8')); }
    else { R.rect(mx - 4, my - 7, mx + 3, my + 2, K); R.rect(mx - 3, my - 6, mx + 2, my + 1, H('#2e7a3e')); R.rect(mx - 2, my - 4, mx + 1, my - 2, H('#a8acbc')); } }
  // Doom llega por la acera, sube la escalinata y llama
  const a = tramo(t, P5 + 0.2, comic + 0.1), b = tramo(t, comic + 0.1, llama_ - 0.3);
  const x = Math.round(t < comic + 0.1 ? lerp(-16, 214, ease(a)) : lerp(214, 236, b)), s = Math.round(t < comic + 0.1 ? 156 : lerp(156, 134, b));
  R.actor(EL.doom, x, s, t, { dir: 1, anda: (a > 0 && a < 1) || (b > 0 && b < 1), dedo: t > llama_ && t < llama_ + 0.5 });
  // la puerta se entreabre y sale luz cálida
  const ab = tramo(t, llama_ + 0.4, llama_ + 0.8); if (ab > 0) { R.rect(244, 94, 244 + Math.round(ab * 8), 132, H('#f8d080')); luz(246, 112, 16, 20, H('#f8c060'), 0.4 * ab); }
  // los copos y un taxi amarillo que pasa por delante; un coche más tarde al otro lado
  for (let i = 0; i < 46; i++) { const x = (hh(i, 1, 9) * 340 + Math.sin(t + i) * 6 - t * 4) % 330, y = (hh(i, 2, 9) * 180 + t * (14 + (i % 3) * 6)) % 180; if (libre(x, y)) ps(x < 0 ? x + 320 : x, y, i % 3 ? H('#e8ecf8') : H('#ffffff')); }
  const coche = (cx, col, d) => { cx = Math.round(cx); const y = 172; R.rect(cx - 20, y - 8, cx + 20, y + 2, K); R.rect(cx - 19, y - 7, cx + 19, y + 1, col); R.rect(cx - 11, y - 14, cx + 10, y - 7, K); R.rect(cx - 10, y - 13, cx + 9, y - 8, col); R.rect(cx - 8, y - 12, cx - 1, y - 8, H('#8ab0d0')); R.rect(cx + 1, y - 12, cx + 7, y - 8, H('#8ab0d0'));
    R.disco(cx - 12, y + 2, 3.5, K); R.disco(cx + 12, y + 2, 3.5, K); R.disco(cx - 12, y + 2, 1.5, H('#8a8a9a')); R.disco(cx + 12, y + 2, 1.5, H('#8a8a9a')); R.rect(d > 0 ? cx + 18 : cx - 19, y - 5, d > 0 ? cx + 19 : cx - 18, y - 3, H('#fff8c0')); luz(d > 0 ? cx + 30 : cx - 30, y - 3, 12, 4, H('#fff0b0'), 0.4); };
  const tx = lerp(360, -60, tramo(t, anio + 0.3, anio + 2.6)); if (tx < 350 && tx > -50) { coche(tx, H('#f0c030'), -1); R.rect(Math.round(tx) - 4, 154, Math.round(tx) + 3, 157, H('#e8e0b0')); }
  const c2 = lerp(-60, 360, tramo(t, llama_ - 0.6, llama_ + 1.6)); if (c2 > -50 && c2 < 350) coche(c2, H('#3a5a9a'), 1);
};

// ── 6 · la cripta de Strange: el favor, y bajan al infierno por el círculo ──────────────────────────────────────
const fondoCripta = () => horno('cripta', () => {
  bloques(0, 0, 319, 140, [H('#5a4a52'), H('#463840'), H('#2a2028')], 17, 14, 7);
  // dos arcos con estanterías de libros y velas
  for (const x0 of [14, 226]) { R.rect(x0, 40, x0 + 80, 140, H('#1e161c')); R.poligono([[x0, 42], [x0 + 40, 22], [x0 + 80, 42]], H('#1e161c'));
    for (let k = 0; k < 4; k++) { const y = 58 + k * 20; R.rect(x0 + 4, y + 14, x0 + 76, y + 16, H('#6a4024')); R.rect(x0 + 4, y + 14, x0 + 76, y + 14, H('#8a5a34'));
      for (let i = 0; i < 12; i++) { const x = x0 + 6 + i * 6, h = 9 + (i * 7 + k * 3) % 5; if (hh(i, k, x0) > 0.86) continue; R.rect(x, y + 14 - h, x + 4, y + 13, [H('#8a2a2a'), H('#2a4a7a'), H('#4a6a2a'), H('#8a6a2a'), H('#5a2a6a')][(i + k) % 5]); R.rect(x + 1, y + 15 - h, x + 1, y + 12, H('#c8a040')); } } }
  // la pared del centro: un tapiz con un ojo de luz (símbolo nuestro) y una lámpara colgada
  R.rect(126, 20, 196, 104, H('#5a1a2a')); for (let y = 20; y < 104; y++) for (let x = 126; x <= 196; x++) if ((x + y * 3) % 7 === 0) R.pset(x, y, H('#6a2232')); R.rect(126, 20, 196, 22, H('#c8a040')); R.rect(126, 102, 196, 104, H('#c8a040'));
  R.disco(161, 60, 16, H('#c8a040')); R.disco(161, 60, 14, H('#3a1420')); R.poligono([[147, 60], [161, 52], [175, 60], [161, 68]], H('#e8e0c8')); R.disco(161, 60, 4, H('#3a8a6a')); R.disco(161, 60, 2, K);
  // el suelo de losas con el círculo grabado
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const j = Math.floor((y - 140) / 7), w = 18 + j * 4, jx = (x + j * 9) % w; R.pset(x, y, (y - 140) % 7 === 0 || jx === 0 ? H('#2a2028') : hh(Math.floor((x + j * 9) / w), j, 2) > 0.6 ? H('#5a4c54') : H('#4c4048')); }
  for (let a = 0; a < 360; a++) { const p = a / 360 * 6.28; for (const [rx, ry] of [[70, 13], [60, 11]]) R.pset(Math.round(160 + Math.cos(p) * rx), Math.round(160 + Math.sin(p) * ry), H('#8a7a6a')); }
  for (let k = 0; k < 12; k++) { const p = k / 12 * 6.28, x = Math.round(160 + Math.cos(p) * 65), y = Math.round(160 + Math.sin(p) * 12); R.rect(x - 1, y - 1, x + 1, y, H('#8a7a6a')); }
});
const p6 = (t) => {
  R.copiar(fondoCripta());
  const favor = @T(26.20), baja = @T(27.60), hunde = @T(28.10);
  // velas en las estanterías y la lámpara que se mece
  for (const [x, y] of [[30, 70], [74, 90], [246, 70], [292, 110], [262, 90]]) { R.rect(x - 1, y - 4, x + 1, y + 1, H('#f0ecd8')); llama(x, y - 4, t, 0.8, x); luz(x, y - 7, 10, 8, H('#f8c060'), 0.3); }
  { const sw = Math.sin(t * 1.3) * 5; R.linea(161, 0, Math.round(161 + sw), 10, H('#2a2028')); R.rect(Math.round(157 + sw), 10, Math.round(165 + sw), 16, H('#c8a040')); luz(161 + sw, 14, 22, 14, H('#f8d080'), 0.3); llama(161 + sw, 12, t, 0.7, 3); }
  // el círculo: en «go down into hell» se enciende, gira y se abre a la luz roja
  const g = tramo(t, baja - 0.2, baja + 0.4), h = ease(tramo(t, hunde, P7 + 0.2));
  if (g > 0) { for (let y = 147; y <= 173; y++) for (let x = 90; x <= 230; x++) { const d = Math.hypot((x - 160) / 70, (y - 160) / 13); if (d < 1) R.pset(x, y, d < 0.86 * g ? ((x + y + Math.floor(t * 14)) % 5 === 0 ? H('#fff0b0') : d < 0.5 ? H('#f8a040') : H('#e8602a')) : R.pget(x, y)); }
    for (let k = 0; k < 16; k++) { const p = k / 16 * 6.28 + t * 2, x = 160 + Math.cos(p) * 66, y = 160 + Math.sin(p) * 12; ps(x, y, H('#fff8c0')); ps(x + 1, y, H('#f8c060')); }
    luz(160, 120, 90, 60, H('#f8803a'), 0.3 * g); chispas(160, 160, t, 20, 90, 4); }
  // Doom entra; Strange se vuelve de la estantería; en «owes him a favor» el «1»; en «go down» se hunden los dos
  const ent = tramo(t, P6, P6 + 1.2), dx = Math.round(lerp(40, 124, ease(ent)));
  aparte(() => {
    R.actor(EL.doom, dx, 160 + Math.round(h * 30), t, { dir: 1, anda: ent > 0 && ent < 1, dedo: t > favor && t < baja });
    R.actor(EL.strange, 182, 160 + Math.round(h * 30), t, { dir: t > P6 + 0.6 ? -1 : 1, habla: t > favor + 0.4 && t < baja && voz(t) > 0.2, brazos: t > baja - 0.1 && t < hunde + 0.8, sonrisa: t > favor + 0.3 && t < baja });
  });
  pegar(0, 100, 319, 179, (x, y, c) => (h > 0 && y > 160 - (1 - Math.min(1, Math.abs(x - 160) / 70)) * 2) ? null : c);
  if (t > favor && t < baja) { const y = 120 - Math.round(ease(tramo(t, favor, favor + 0.3)) * 6); R.rect(dx - 4, y - 24, dx + 18, y, K); R.rect(dx - 3, y - 23, dx + 17, y - 1, H('#f4f0e6')); R.poligono([[dx + 2, y], [dx + 8, y], [dx + 4, y + 5]], H('#f4f0e6')); R.numero('1', dx + 8, y - 4, { tam: 16, centro: true }); }
  // Atom luciérnaga mira desde el arco y, al final, baja tras ellos
  const ay = lerp(70, 166, ease(tramo(t, hunde + 0.4, P7))), ax = lerp(110, 150, ease(tramo(t, hunde + 0.4, P7)));
  T.AT.luciernaga(R, ax + Math.sin(t * 2) * 3, ay + Math.cos(t * 2.4) * 2, t, { cara: t > baja ? 'sorpresa' : 'normal', dir: 1, brillo: 1 - tramo(t, P7 - 0.3, P7) });
};

// ── 7 · el trono de Mefisto: Doom ofrece el alma de Strange ───────────────────────────────────────────────────────
const p7 = (t) => {
  const terrible = @T(30.30), ofrece = @T(32.30), alma = @T(33.20), madre = @T(34.60);
  const o = { encuadre: 'trono', mefisto: ease(tramo(t, P7 + 0.4, terrible + 0.4)) }; T.infierno(R, t, o);
  // en «his mother's» la luz de ella aparece sentada en el trono vacío, como prenda
  const m = tramo(t, madre - 0.3, madre + 0.5); if (m > 0) figuraLuz(VD.cynthiaVD, 153, 126, t, { dir: 1, triste: true }, m * 0.9);
  // Doom y Strange, a la izquierda del trono; en «offers» Doom se vuelve y señala a Strange; su alma sale hacia la mano
  const v = t > ofrece - 0.2;
  R.actor(EL.strange, 44, 152, t, { dir: 1, sorpresa: t > alma });
  R.actor(EL.doom, Math.round(lerp(64, 84, tramo(t, P7, P7 + 1.2))), 152, t, { dir: v ? -1 : 1, anda: t > P7 && t < P7 + 1.2, dedo: v });
  const s = ease(tramo(t, alma, madre + 0.6)); if (t > alma - 0.1) { const x = lerp(52, 190, s), y = lerp(136, 70, s) - Math.sin(s * Math.PI) * 20; orbe(x, y, t, 1, 52, 136); }
  T.infiernoDelante(R, t, o);
  // Atom luciérnaga, al otro lado, se tapa: no le gusta lo que ve
  T.AT.luciernaga(R, 250 + Math.sin(t * 1.4) * 3, 108 + Math.cos(t * 1.8) * 3, t, { cara: t > ofrece ? 'triste' : 'normal', dir: -1 });
};

// ── 8 · la puerta: sale ella y se niega ───────────────────────────────────────────────────────────────────────────
const p8 = (t) => {
  const ella = @T(37.40), niega = @T(39.00), vuelve = @T(39.60);
  const o = { encuadre: 'camino', camara: 'puerta', abierta: ease(tramo(t, P8 + 0.2, ella)) * 0.7 }; T.infierno(R, t, o);
  // ella sale por la rendija y baja al escalón; en «refuses» niega con la cabeza y alza la mano
  const sale = ease(tramo(t, ella - 0.4, ella + 0.6)), ng = t > niega && t < niega + 0.9 ? (Math.sin(t * 16) > 0 ? -1 : 1) : 1;
  figuraLuz(VD.cynthiaVD, 159, Math.round(lerp(124, 140, sale)), t, { dir: t > niega + 0.9 ? -1 : ng, dedo: t > niega + 0.4 }, sale);
  // Doom, con el alma de Strange en la mano; al negarse ella, el alma vuelve a Strange
  const st = R.actor(EL.strange, 200, 152, t, { dir: -1, sorpresa: t > ella && t < vuelve, sonrisa: t > vuelve + 0.8 });
  const d = R.actor(EL.doom, Math.round(lerp(112, 106, tramo(t, niega, niega + 0.4))), 152, t, { dir: 1, sostiene: t < vuelve ? [124, 134] : false, triste: true });
  const r = ease(tramo(t, vuelve, vuelve + 1.0)); orbe(lerp(126, 207, r), lerp(132, 138, r) - Math.sin(r * Math.PI) * 16, t, 1 - tramo(t, vuelve + 0.9, vuelve + 1.2), 126, 132);
  T.infiernoDelante(R, t, o);
};

// ── 9 · la pared de los contratos: «in her place»; en «free» arde su contrato ─────────────────────────────────────
const p9 = (t) => {
  const pecho = @T(42.60), gesto = @T(44.10), libre_ = @T(45.60);
  const o = { encuadre: 'trono', camara: 'contratos', contratos: 0.42 * ease(tramo(t, libre_ - 0.3, libre_ + 1.0)) }; const g = T.infierno(R, t, o);
  // ella en el suelo de obsidiana, ante el anillo: se lleva la mano al pecho y luego la alza hacia su contrato
  figuraLuz(VD.cynthiaVD, 126, 152, t, { dir: 1, sostiene: t > pecho - 0.2 && t < gesto ? true : false, dedo: t > gesto }, 1);
  if (t > libre_) luz(118, 62, 30, 30, H('#80ff90'), 0.4 * (1 - tramo(t, libre_ + 0.6, P10)));
  R.actor(EL.doom, 40, 152, t, { dir: 1, sorpresa: t > libre_ });
  R.actor(EL.strange, 70, 152, t, { dir: 1, sonrisa: t > libre_ + 0.3, habla: t > pecho && t < pecho + 0.6 });
  T.infiernoDelante(R, t, o);
};

// ── 10 · el abismo: ella sube a las estrellas ─────────────────────────────────────────────────────────────────────
const TT = { sube: @T(46.60), busca: @T(50.30) };
const p10 = (t) => abismo(t, TT);

const efectos = [[@T(0.30), 'aldea'], [@T(3.30), 'brillo'], [@T(5.30), 'brillo'], [@T(6.40), 'trueno'], [@T(9.00), 'pasos'], [@T(10.60), 'golpecito'],
  [@T(14.80), 'puerta'], [@T(16.90), 'lapiz'], [@T(18.10), 'whoosh'], [@T(19.00), 'pasos'], [@T(20.80), 'coche'], [@T(22.40), 'papel'], [@T(23.80), 'toc'],
  [@T(24.60), 'pasos'], [@T(27.70), 'zumbido'], [@T(29.80), 'zumbido'], [@T(33.30), 'brillo'], [@T(36.60), 'cerrojo'], [@T(37.60), 'brillo'], [@T(39.70), 'whoosh'],
  [@T(45.70), 'flash'], [@T(46.80), 'brillo'], [@T(51.00), 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10]],
  { efectos, año: (t) => (t >= @T(20.40) ? 1989 : null) });
'''))

E['vd-duelo'] = ('Fíjate: el duelo', '''// VD-DUELO (frase 30), LA PAUSA «fíjate» del duelo prolongado; año 2022 mientras se habla del manual. Cinco planos:
// 1. el abismo de vd-sanjuan CONGELADO en gris azulado; Atom al doble entra, señala en «notice this» y en «2022» saca a
//    color el manual gordo con su «2022»;
// 2. el escritorio de la consulta: el manual abierto; en «grief» Atom vuelca el reloj de arena y la arena no cae; en
//    «a year later» el calendario pasa sus hojas hasta el 13;
// 3. la salita: la butaca vacía junto a la ventana; en «the person they lost» su silueta de puntos aparece y se va; en
//    «revolves around» Atom da la vuelta a la butaca con su órbita;
// 4. la mesa de Victor: la máscara en su soporte; en «almost all the time» se encienden una a una las velas de los años;
//    en «most striking» Atom «!»;
// 5. el abismo congelado otra vez: la luz de ella sigue subiendo, a color, libre; en «doesn't free himself» la órbita
//    rodea a Doom, gris; en «the mask» Atom se pone su máscara pequeña; vuelve el color.
// Sonido: un golpe seco al congelarse y un clic al salir; pop del libro, papel, golpecito, pasos, brillo.''', _en('vd-duelo', COMUN + r'''
const P2 = @T(4.20), P3 = @T(10.00), P4 = @T(15.60), P5 = @T(21.70);
const TT = { sube: 46.60, busca: 50.30 };   // los de vd-sanjuan (el plano congelado es su último instante, 51,60 s)
const congelado = () => horno('congelado', () => abismo(51.60, TT));
const congeladoSin = () => horno('congeladoSin', () => abismo(51.60, TT, { sinLuz: true }));
const pausa = (t, a, b) => T.AT.pausa(R, tramo(t, a, a + 0.3) * (1 - tramo(t, b - 0.3, b)));
// el manual (16 × 20): tapas azules, lomo, cantos de páginas
const manual = () => { R.rect(0, 0, 15, 19, K); R.rect(1, 1, 14, 18, H('#2a5aa8')); R.rect(1, 1, 3, 18, H('#1a3a78')); R.rect(5, 4, 12, 4, H('#e8c050')); R.rect(5, 15, 12, 15, H('#e8c050')); R.disco(9, 9.5, 2.6, H('#f0f0f0')); R.disco(9, 9.5, 1.4, H('#2a5aa8')); R.rect(14, 2, 14, 17, H('#f0ecd8')); };
// la máscara pequeña de Atom (la del acto 4)
const mascarita = () => { T.c_mascara(R, 6, 7, 0, 1, 0); };

// ── 1 · la pausa: Atom y el manual de 2022 ───────────────────────────────────────────────────────────────────────
const q1 = (t) => {
  R.copiar(congelado()); pausa(t, 0, 999);
  const fijate = @T(0.30), anio = @T(1.80);
  const anda = tramo(t, 0, 1.0), x = lerp(350, 262, anda);
  const a = T.AT.atom(R, x, 176, t, { s: 2, pose: anda < 1 ? 'camina' : t > anio - 0.3 ? 'sostiene' : t > fijate + 0.3 ? 'senala' : 'quieto', dir: -1, cara: t > anio ? 'sonrisa' : 'normal', habla: voz(t) });
  if (t > fijate + 0.3 && t < anio) T.AT.anillo(R, 124, 140, 16, 20, t, tramo(t, fijate + 0.3, fijate + 0.9));
  const ul = tramo(t, anio - 0.2, anio + 0.3);
  if (ul > 0) { const y = 72 + Math.round((1 - ul) * 20) + Math.round(Math.sin(t * 2.4) * 1.5); luz(222, y + 30, 40, 40, H('#f8e8b0'), 0.4 * ul); T.AT.escalado(R, manual, 16, 20, 198, y, 3); R.numero('2022', 222, y - 8, { tam: 16, centro: true }); T.AT.anillo(R, 222, y + 30, 36, 40, t, tramo(t, anio + 0.3, anio + 1.0)); }
};

// ── 2 · el escritorio de la consulta: el reloj de arena que no corre y el calendario ─────────────────────────────
const reloj = (x, y, vuelta, t, sc = 1) => { // reloj de arena de 14 × 24 centrado en (x, y); vuelta 0–1 (gira); la arena se queda arriba
  const a = vuelta * Math.PI, c = Math.cos(a) * sc, sn = Math.sin(a) * sc, P = (i, j) => [x + i * c - j * sn, y + i * sn + j * c];
  const pol = (pts, col) => R.poligono(pts.map(([i, j]) => P(i, j)), col);
  pol([[-8, -13], [8, -13], [8, -11], [-8, -11]], H('#6a4024')); pol([[-8, 11], [8, 11], [8, 13], [-8, 13]], H('#6a4024'));
  pol([[-6, -11], [6, -11], [1, -1], [1, 1], [6, 11], [-6, 11], [-1, 1], [-1, -1]], H('#d8ecf4'));
  // la arena: arriba antes de girar; tras girar, queda arriba también (pegada: no corre)
  const top = vuelta < 0.5 ? -1 : 1; pol(top < 0 ? [[-5, -10], [5, -10], [1, -3], [-1, -3]] : [[-5, 10], [5, 10], [1, 3], [-1, 3]], H('#e8b850'));
  pol(top < 0 ? [[-5, -10], [5, -10], [4, -8], [-4, -8]] : [[-5, 10], [5, 10], [4, 8], [-4, 8]], H('#c89030'));
  for (const s of [-1, 1]) pol([[s * 7, -11], [s * 8, -11], [s * 8, 11], [s * 7, 11]], H('#4a2a18'));
  const [gx, gy] = P(-3, -6); ps(gx, gy, H('#ffffff')); };
const q2 = (t) => {
  const o = { encuadre: 'consulta', camara: 'escritorio' }; const g = T.estudio(R, t, o);
  const [x0, y0, x1, y1] = g.escritorio ?? [100, 112, 218, 165];
  const duelo = @T(5.80), anio = @T(8.70);
  // el manual abierto sobre el secante (las hojas pasan en «included»); queda el dibujo de un corazón partido
  const bx = x0 + 2, by = y1 - 30, hoja = Math.floor(tramo(t, P2 + 0.4, @T(5.30)) * 5);
  R.rect(bx - 1, by - 1, bx + 45, by + 27, K); R.rect(bx, by, bx + 21, by + 26, H('#f8f4ec')); R.rect(bx + 23, by, bx + 44, by + 26, H('#f0ecdc')); R.rect(bx + 22, by, bx + 22, by + 26, H('#a8a090'));
  R.rect(bx - 1, by + 27, bx + 45, by + 28, H('#2a5aa8'));
  for (let j = by + 4; j < by + 24; j += 3) R.rect(bx + 3, j, bx + 18, j, H('#b8b8c8'));
  if (hoja < 5) { const px = bx + 22 + Math.round((hoja % 2 ? -1 : 1) * 11); R.rect(Math.min(px, bx + 22), by - 2, Math.max(px, bx + 22), by + 25, H('#ffffff')); }
  else { const hx = bx + 33, hy = by + 12; for (const [i, j] of [[-6, -3], [-5, -5], [-3, -6], [-1, -5], [0, -3], [1, -5], [3, -6], [5, -5], [6, -3], [5, 0], [3, 3], [1, 5], [0, 6], [-1, 5], [-3, 3], [-5, 0]]) R.disco(hx + i, hy + j, 1.3, H('#c83a4a')); R.linea(hx, hy - 3, hx - 2, hy + 1, H('#f0ecdc')); R.linea(hx - 2, hy + 1, hx + 1, hy + 5, H('#f0ecdc')); }
  // el reloj de arena, grande: en «grief» Atom lo vuelca y la arena se queda arriba, pegada
  const v = ease(tramo(t, duelo - 0.2, duelo + 0.5));
  reloj(bx + 60, y1 - 21, v, t, 1.5);
  // el calendario de mesa: en «a year later» pasan las hojas 1…12 y queda el 13, en rojo
  const cx = bx + 76, cy = y1 - 30, n = 1 + Math.floor(ease(tramo(t, anio - 0.3, anio + 0.8)) * 12);
  R.rect(cx - 1, cy - 1, cx + 21, cy + 25, K); R.rect(cx, cy, cx + 20, cy + 24, H('#f8f4ec')); R.rect(cx, cy, cx + 20, cy + 5, H('#c83a3a')); for (const i of [5, 14]) R.rect(cx + i, cy - 3, cx + i + 1, cy + 1, H('#8a8a9a'));
  if (n > 1 && n < 13) R.rect(cx, cy + 6, cx + 20, cy + 6 + ((Math.floor(t * 20)) % 2) * 8, H('#e8e4d8'));
  R.numero(String(n), cx + 10, cy + 19, { centro: true, color: n > 12 ? H('#c83a3a') : H('#2a2a3a'), sombra: false });
  // Atom en el canto del secante: lo vuelca, se sorprende («?») y en «a year later» señala el calendario
  T.AT.atom(R, bx + 108, y1, t, { pose: t > duelo - 0.3 && t < duelo + 0.6 ? 'sostiene' : t > anio ? 'senala' : 'quieto', dir: -1, cara: t > duelo + 0.8 && t < anio ? 'sorpresa' : 'normal', habla: voz(t) });
  if (t > duelo + 1.0 && t < anio - 0.4) R.bocadillo(bx + 108, y1 - 32, { icono: '?' });
};

// ── 3 · la salita: la butaca vacía junto a la ventana ─────────────────────────────────────────────────────────────
const fondoSalita = () => horno('salita', () => {
  // papel pintado de rayas con florecillas, friso de madera y suelo de tablas
  for (let y = 0; y < 116; y++) for (let x = 0; x < 320; x++) { let c = (x % 14) < 7 ? H('#8a6a7a') : H('#7e5e70'); if ((x % 14) === 3 && (y % 12) === 6) c = H('#c8a0b0'); if (x > 270 && y < 48) c = (x % 14) < 7 ? H('#866676') : H('#806070'); R.pset(x, y, c); }
  tablas(0, 116, 319, 140, [H('#8a5a3a'), H('#6a4028'), H('#3a2014')], 6, 3); R.rect(0, 116, 319, 117, H('#a87a4a'));
  tablas(0, 140, 319, 179, [H('#9a6a42'), H('#7a4e30'), H('#4a2c18')], 8, 5);
  // la alfombra redonda
  for (let y = 150; y < 178; y++) for (let x = 100; x < 280; x++) { const d = Math.hypot((x - 190) / 88, (y - 164) / 13); if (d < 1) R.pset(x, y, d > 0.9 ? H('#c8a040') : d > 0.6 ? H('#8a2a3a') : (x + y) % 4 === 0 ? H('#b84a5a') : H('#a83a4a')); }
  // la ventana con su marco y cortinas (el exterior lo pinta la escena)
  R.rect(136, 28, 216, 108, H('#e8e0d0')); R.rect(140, 32, 212, 104, H('#1a2440')); R.rect(134, 106, 218, 110, H('#d8d0c0'));
  // el cuadro del paisaje, el reloj de pared y la lámpara de pie
  R.rect(40, 40, 82, 72, H('#8a6a20')); R.rect(42, 42, 80, 70, H('#7ab0d8')); R.rect(42, 58, 80, 70, H('#5a8a4a')); R.poligono([[46, 60], [58, 48], [70, 60]], H('#6a7a8a')); R.disco(72, 50, 3, H('#f8e080'));
  R.rect(244, 120, 248, 150, H('#3a2a1a')); R.rect(238, 150, 254, 152, H('#3a2a1a')); R.poligono([[234, 100], [258, 100], [252, 86], [240, 86]], H('#f0d8a0'));
  // la balda con la foto de quien falta (una mujer, sin rasgos) y libros; la estantería de la derecha
  R.rect(30, 92, 92, 94, H('#6a4024')); R.rect(30, 92, 92, 92, H('#8a5a34'));
  R.rect(36, 76, 52, 91, H('#c8a040')); R.rect(38, 78, 50, 89, H('#e8d8c8')); R.disco(44, 82, 3, H('#5a3a4a')); R.rect(40, 85, 48, 89, H('#6a1e3a'));
  for (let i = 0; i < 6; i++) R.rect(58 + i * 5, 80 + (i % 2) * 2, 61 + i * 5, 91, [H('#8a2a2a'), H('#2a4a7a'), H('#4a6a2a'), H('#8a6a2a'), H('#5a2a6a'), H('#2a6a6a')][i]);
  R.rect(264, 52, 314, 150, H('#4a2a18')); R.rect(266, 54, 312, 150, H('#2a1810'));
  for (let k = 0; k < 4; k++) { const y = 74 + k * 24; R.rect(266, y, 312, y + 2, H('#6a4024'));
    for (let i = 0; i < 8; i++) { const x = 268 + i * 5.6, h = 12 + (i * 3 + k) % 6; if (hh(i, k, 7) > 0.84) continue; R.rect(x, y - h, x + 4, y - 1, [H('#8a2a2a'), H('#2a4a7a'), H('#4a6a2a'), H('#8a6a2a'), H('#5a2a6a')][(i + k) % 5]); R.rect(x + 1, y - h + 2, x + 3, y - h + 2, H('#c8a040')); } }
  // la mesita con la taza fría y las gafas sobre un libro
  R.rect(110, 128, 132, 131, H('#6a4024')); R.rect(112, 132, 114, 152, H('#4a2a18')); R.rect(128, 132, 130, 152, H('#4a2a18'));
  R.rect(113, 124, 127, 127, H('#2a5a8a')); R.rect(113, 124, 127, 124, H('#3a7aa8')); R.rect(118, 118, 123, 123, H('#f0ecd8')); R.rect(124, 119, 125, 121, H('#f0ecd8')); R.pset(114, 122, H('#c8a040')); R.pset(117, 122, H('#c8a040')); R.pset(115, 122, H('#c8a040'));
});
const butaca = (x, y) => { // de orejas, de terciopelo granate con botones; (x, y) = esquina de abajo a la izquierda
  R.rect(x + 4, y - 48, x + 40, y - 18, K); R.rect(x + 5, y - 47, x + 39, y - 18, H('#8a2a3a')); for (const [i, j] of [[12, -40], [22, -40], [32, -40], [17, -32], [27, -32]]) R.pset(x + i, y + j, H('#5a1a28'));
  R.rect(x, y - 30, x + 8, y - 8, K); R.rect(x + 1, y - 29, x + 7, y - 8, H('#9a3442')); R.rect(x + 36, y - 30, x + 44, y - 8, K); R.rect(x + 37, y - 29, x + 43, y - 8, H('#7a2232'));
  R.rect(x + 6, y - 20, x + 38, y - 10, K); R.rect(x + 7, y - 19, x + 37, y - 11, H('#a83a4a')); R.rect(x + 7, y - 19, x + 37, y - 18, H('#c85a6a'));
  R.rect(x + 2, y - 8, x + 42, y - 5, H('#5a1a28')); for (const i of [3, 39]) R.rect(x + i, y - 5, x + i + 2, y, H('#3a2014'));
  // el chal doblado sobre el brazo
  R.rect(x + 34, y - 30, x + 44, y - 26, H('#e8d8a0')); for (let i = x + 35; i < x + 44; i += 2) R.pset(i, y - 25, H('#c8b080')); };
const q3 = (t) => {
  R.copiar(fondoSalita());
  const perdida = @T(11.40), gira = @T(13.80);
  // fuera, el atardecer de invierno con nieve; las cortinas que se mecen
  R.recorte([140, 32, 212, 104]);
  for (let y = 32; y <= 104; y++) for (let x = 140; x <= 212; x++) R.pset(x, y, bay(x, y) < (y - 32) / 72 ? H('#6a5a8a') : H('#3a4070'));
  for (let x = 140; x <= 212; x++) { const y1 = Math.round(88 - Math.abs(Math.sin(x * 0.2)) * 4 - (x > 170 && x < 190 ? 10 : 0)); for (let y = y1; y <= 104; y++) R.pset(x, y, y === y1 ? H('#e8ecf8') : H('#2a2a44')); }
  for (let i = 0; i < 20; i++) ps(140 + ((hh(i, 1, 3) * 72 + Math.sin(t + i) * 3) % 72), 32 + ((hh(i, 2, 3) * 72 + t * 10) % 72), H('#f0f4ff'));
  R.recorte(null);
  R.rect(175, 32, 177, 104, H('#e8e0d0')); R.rect(140, 66, 212, 68, H('#e8e0d0'));
  for (const [x0, d] of [[128, 1], [210, -1]]) for (let y = 24; y < 114; y++) { const w = 12 + Math.round(Math.sin(t * 1.2 + y * 0.05) * 1.5 * (y / 114)); for (let i = 0; i < w; i++) R.pset(d > 0 ? x0 + i : x0 + 10 - i, y, i % 4 === 0 ? H('#4a6a5a') : H('#5a8a6a')); }
  R.rect(124, 22, 224, 24, H('#c8a040'));
  // la lámpara encendida y el reloj de pared que avanza
  luz(246, 94, 30, 24, H('#f8d890'), 0.3);
  { const cx = 100, cy = 50; R.disco(cx, cy, 9, H('#6a4024')); R.disco(cx, cy, 7, H('#f0ecd8')); const a = t * 0.8; R.linea(cx, cy, Math.round(cx + Math.sin(a) * 5), Math.round(cy - Math.cos(a) * 5), K); R.linea(cx, cy, cx, cy - 3, K); R.rect(cx - 1, cy + 9, cx + 1, cy + 16, H('#6a4024')); R.disco(cx + Math.sin(t * 3) * 3, cy + 18, 2, H('#c8a040')); }
  // el gato dormido en la alfombra, que respira y mueve la cola
  { const x = 122, y = 170, r = Math.sin(t * 2) > 0 ? 1 : 0; R.disco(x, y - 3, 6 + r * 0.4, H('#2a2a30')); R.disco(x + 6, y - 5, 3.4, H('#2a2a30')); R.pset(x + 5, y - 9, H('#2a2a30')); R.pset(x + 8, y - 9, H('#2a2a30')); R.pset(x + 7, y - 5, H('#5a5a62'));
    const c = Math.sin(t * 1.3) * 3; R.linea(x - 6, y - 1, x - 11, Math.round(y - 3 + c), H('#2a2a30')); R.pset(x - 2, y - 7, H('#4a4a52')); }
  // Atom da la vuelta a la butaca: lo de detrás antes, lo de delante después
  const u = tramo(t, gira, gira + 1.6), an = -Math.PI / 2 + u * Math.PI * 2, ax = u > 0 && u < 1 ? 196 + Math.cos(an + Math.PI) * 52 : 140, az = Math.sin(an + Math.PI);
  const atom = () => T.AT.atom(R, ax, 160 + az * 6, t, { pose: u > 0 && u < 1 ? 'camina' : t > perdida - 0.2 && t < gira ? 'senala' : 'quieto', dir: u > 0 && u < 1 ? (Math.cos(an) > 0 ? 1 : -1) : 1, cara: 'triste', habla: voz(t) * 0.6 });
  if (u > 0 && u < 1 && az < 0) atom();
  butaca(174, 156);
  // en «the person they lost» su silueta de puntos en la butaca, que aparece y se va
  const si = tramo(t, perdida - 0.2, perdida + 0.4) * (1 - tramo(t, perdida + 1.4, perdida + 2.2));
  if (si > 0) { aparte(() => R.actor(VD.cynthiaVD, 189, 140, t, { dir: -1, quieto: true })); pegar(180, 100, 215, 142, (x, y, c) => ((x + y) % 2 === 0 && bay(x, y) < si) ? H('#f0e0f0') : null); }
  if (!(u > 0 && u < 1 && az < 0)) atom();
  if (u > 0) T.AT.anillo(R, 196, 140, 56, 22, t, ease(cl(u * 1.1)));
};

// ── 4 · la mesa de Victor: la máscara y las velas de los años ─────────────────────────────────────────────────────
const fondoMesa = () => horno('mesaVictor', () => {
  bloques(0, 0, 319, 130, [H('#4a4a58'), H('#383844'), H('#22222c')], 29, 16, 8);
  for (let y = 0; y < 50; y++) for (let x = 270; x < 320; x++) R.pset(x, y, mez(R.pget(x, y), H('#383844'), 0.6));
  // el tapiz verde con ribete dorado detrás de la máscara, y dos cadenas que lo cuelgan
  R.rect(124, 76, 196, 140, H('#14401e')); for (let y = 76; y < 140; y++) for (let x = 124; x <= 196; x++) if ((x * 2 + y) % 6 === 0) R.pset(x, y, H('#1e5a2a')); R.rect(124, 76, 196, 77, H('#c8a040')); R.rect(124, 139, 196, 140, H('#c8a040')); R.rect(124, 76, 125, 140, H('#c8a040')); R.rect(195, 76, 196, 140, H('#c8a040'));
  for (const x of [130, 190]) for (let y = 74; y < 77; y++) R.pset(x, y, H('#8a8a98'));
  // la balda larga de las velas, con sus ménsulas
  R.rect(20, 70, 260, 73, H('#5a3a24')); R.rect(20, 70, 260, 70, H('#7a5234')); for (const x of [30, 140, 250]) R.poligono([[x - 3, 74], [x + 3, 74], [x, 84]], H('#3a2414'));
  // la ventana con barrotes a la derecha
  R.rect(266, 64, 304, 120, H('#1c1c26')); R.rect(270, 68, 300, 116, H('#101a34')); for (const x of [278, 286, 294]) R.rect(x, 68, x, 116, H('#2a2a34'));
  // la mesa de roble con el paño verde
  tablas(0, 130, 319, 179, [H('#8a5a34'), H('#6a4024'), H('#3a2010')], 7, 9);
  for (let y = 132; y < 160; y++) for (let x = 100; x < 222; x++) R.pset(x, y, y === 159 ? H('#c8a040') : (x + y) % 5 === 0 ? H('#2e7a3e') : H('#1e5a2a'));
  for (let x = 102; x < 222; x += 6) R.rect(x, 160, x + 2, 164, H('#c8a040'));
  // el soporte de hierro de la máscara
  R.rect(158, 104, 162, 150, H('#3a3a44')); R.rect(159, 104, 159, 150, H('#6a6a78')); R.rect(146, 148, 174, 152, H('#2a2a34')); R.rect(146, 148, 174, 148, H('#5a5a68'));
  // papeles, el compás y un libro cerrado
  R.rect(40, 140, 72, 150, H('#e8e0c8')); R.rect(44, 143, 66, 143, H('#a8a090')); R.rect(44, 146, 60, 146, H('#a8a090')); R.linea(232, 146, 246, 136, H('#a8a8b8')); R.linea(240, 146, 246, 136, H('#a8a8b8'));
  R.rect(250, 140, 286, 152, H('#6a1e2a')); R.rect(250, 140, 286, 141, H('#8a2a3a')); R.rect(252, 142, 284, 150, H('#5a1a24')); R.rect(284, 141, 286, 151, H('#e8e0c8'));
});
const q4 = (t) => {
  R.copiar(fondoMesa());
  const casi = @T(17.20), notable = @T(20.40);
  // la nieve tras los barrotes
  R.recorte([270, 68, 300, 116]); for (let i = 0; i < 10; i++) ps(270 + (hh(i, 4) * 30 + Math.sin(t + i) * 2) % 30, 68 + (hh(i, 5) * 48 + t * 9) % 48, H('#e8ecf8')); R.recorte(null);
  for (const x of [278, 286, 294]) R.rect(x, 68, x, 116, H('#3a3a44'));
  // las velas de los años: en «almost all the time» se encienden una a una
  const n = Math.floor(tramo(t, casi, casi + 2.4) * 22);
  for (let i = 0; i < 22; i++) { const x = 26 + i * 10.6, h = 6 + (i * 5) % 5; R.rect(x - 1, 70 - h, x + 1, 69, H('#f0ecd8')); R.rect(x + 1, 70 - h, x + 1, 69, H('#c8c0a8')); ps(x, 70 - h - 1, K);
    if (i < n) { llama(x, 70 - h - 1, t, 0.8, i); luz(x, 64 - h, 8, 7, H('#f8c060'), 0.3); } }
  // la máscara de hierro en su soporte, con el reflejo de las velas que tiembla
  T.c_mascara(R, 160, 104, 0, 3, t); if (n > 0) for (let i = 0; i < 3; i++) ps(150 + i * 10, 88 + Math.round(Math.sin(t * 9 + i) * 0.6), H('#f8e0a0'));
  // una polilla que ronda las velas
  { const a = t * 2.1, x = 120 + Math.cos(a) * 60, y = 52 + Math.sin(a * 1.7) * 8, f = Math.floor(t * 14) % 2; ps(x, y, H('#d8c8a0')); ps(x - 1, y - f, H('#e8d8b0')); ps(x + 1, y - f, H('#e8d8b0')); }
  // Atom (al doble) sobre la mesa mira las velas encenderse, y en «most striking» se vuelve a la máscara: «!»
  const mira = t > notable - 0.2;
  T.AT.atom(R, 76, 158, t, { s: 2, pose: t > notable ? 'senala' : t > casi ? 'piensa' : 'quieto', dir: mira ? 1 : t > casi ? (Math.floor(tramo(t, casi, casi + 2.4) * 3) % 2 ? 1 : -1) : 1, cara: t > notable ? 'sorpresa' : 'triste', habla: voz(t) });
  if (t > notable && t < notable + 1.3) R.bocadillo(76, 92, { icono: '!' });
};

// ── 5 · la pausa otra vez: ella sube a color; Doom se queda gris con su máscara ───────────────────────────────────
const q5 = (t) => {
  R.copiar(congeladoSin()); pausa(t, P5 - 0.6, E.duracion);
  const libera = @T(22.90), el = @T(24.30), mascara = @T(26.20);
  // la luz de ella, a color, sigue subiendo y sale a las estrellas
  const s = ease(tramo(t, P5, libera + 1.4)), y = lerp(34, -20, s);
  figuraLuz(VD.cynthiaVD, 154, y, t, { brazos: true }, 1 - tramo(t, libera + 1.2, libera + 1.6));
  if (t > libera + 0.6) { const e = tramo(t, libera + 0.6, libera + 1.2); luz(160, 18, 16, 12, H('#ffffff'), 0.7 * e); R.rect(159, 13, 161, 23, H('#ffffff')); R.rect(155, 17, 165, 19, H('#ffffff')); }
  // en «doesn't free himself» la órbita rodea a Doom, que sigue gris
  if (t > el - 0.2) T.AT.anillo(R, 124, 140, 15, 19, t, tramo(t, el - 0.2, el + 0.5));
  // Atom, al doble: en «the mask» se pone su máscara pequeña (le deja ver con un ojo)
  const a = T.AT.atom(R, 236, 176, t, { s: 2, pose: t > mascara - 0.4 && t < mascara + 0.4 ? 'sostiene' : t < el + 1.2 ? 'senala' : 'quieto', dir: -1, cara: t > mascara + 0.4 ? 'guino' : 'triste', habla: voz(t) });
  const pone = tramo(t, mascara - 0.4, mascara + 0.4);
  if (pone > 0) { const [mx, my] = a.mano, [cx, cy] = a.centro; const x = lerp(mx - 12, cx - 12, ease(pone)), yy = lerp(my - 30, cy - 15, ease(pone)); T.AT.escalado(R, mascarita, 12, 15, x, yy, 2); }
};

const efectos = [[0.05, 'tapestop'], [@T(1.80), 'pop'], [@T(4.90), 'papel'], [@T(5.90), 'golpecito'], [@T(8.80), 'papel'], [@T(11.50), 'brillo'],
  [@T(13.90), 'pasos'], [@T(17.30), 'brillo'], [@T(20.50), 'boing'], [@T(23.00), 'brillo'], [@T(26.20), 'golpecito'], [E.duracion - 0.3, 'interruptor']];
T.rodar(E, R, [[0, q1], [P2, q2], [P3, q3], [P4, q4], [P5, q5]], { efectos, año: (t) => (t >= @T(1.70) && t < P4 ? 2022 : null) });
'''))
