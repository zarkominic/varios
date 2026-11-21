import re

# Grupo S7 del ep45: vd-enemigos (frases 22–26) y vd-espejos (frase 27, PAUSA que congela el último plano de vd-enemigos).
# «@s» en el cuerpo es un instante en segundos de escena; se escribe como en('marca', fracción) de la frase que suena
# (las marcas reales de atomo/plato/escenas/marcas-ep45.json).
_MARCAS = {
    'vd-enemigos': [('espejo', 0.5, 38.768), ('familia', 39.168, 73.158), ('ironman', 73.558, 114.486),
                    ('pantera', 114.886, 152.522), ('mefisto', 152.922, 183.516)],
    'vd-espejos': [('fijate6', 0.2, 40.296)],
}


def _t(esc, cuerpo):
    marcas = _MARCAS[esc]

    def en(s):
        k, a, b = marcas[0]
        for m in marcas:
            if s >= m[1] - 0.05:
                k, a, b = m
        return "en('%s', %.4f)" % (k, (s - a) / (b - a))
    return re.sub(r'@(-?\d+(?:\.\d+)?)', lambda m: en(float(m.group(1))), cuerpo)


_IMPORTS = r'''
import * as DO from '/atomo/plato/escenas/do-comun.js';
import * as DD from '/atomo/plato/escenas/dd-comun.js';
import * as CF from '/atomo/plato/escenas/cf-comun.js';
import * as JM from '/atomo/plato/escenas/jm-comun.js';
import * as AA from '/atomo/plato/escenas/at-comun.js';
import * as AK from '/atomo/plato/escenas/ak-comun.js';
import { PIEZAS_DO } from '/atomo/plato/kits/pixel-chibi.js';
'''

# ── utilidades: búferes, tramas, luz, fantasma, corazón, nube, bocadillo, llamas, la mano roja, cristales ──────────────
_UTIL = r'''
const VD = T.VD, K = hex('#140f1c'), H = hex, BL = hex('#f4f0e6');
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const mez = (c1, c2, a) => { a = a < 0 ? 0 : a > 1 ? 1 : a; const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const ease = (u) => u * u * (3 - 2 * u);
const voz = (t) => E.energia(t);
const CACHE = new Map(), VIVO = new Map();
// lo fijo en su búfer (una vez); lo vivo en un búfer que se repinta (para recortarlo a un hueco)
const fijo = (k, f) => { if (!CACHE.has(k)) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); CACHE.set(k, b); } return CACHE.get(k); };
const enBufer = (k, f) => { if (!VIVO.has(k)) VIVO.set(k, R.nuevo()); const b = VIVO.get(k), prev = R.usar(b); f(); R.usar(prev); return b; };
const trozo = (b, x0, y0, x1, y1, dx = 0) => { const D = R.buf; x0 = Math.max(0, Math.round(x0)); x1 = Math.min(319, Math.round(x1));
  for (let y = Math.max(0, Math.round(y0)); y <= Math.min(179, Math.round(y1)); y++) { const i = y * 320, d = typeof dx === 'function' ? dx(y) : dx; for (let x = x0; x <= x1; x++) { const xs = Math.min(319, Math.max(0, x - d)); D[i + x] = b[i + xs]; } } };
const pausa = (t, a, b) => T.AT.pausa(R, tramo(t, a, a + 0.3) * (1 - tramo(t, b - 0.3, b)));
// un actor por su centro (R.actor toma la x de la izquierda de su rejilla de 15 px)
const ac = (d, cx, s, t, o = {}) => R.actor(d, Math.round(cx) - 7, Math.round(s), t, o);
const ir = (t, t0, t1, x0, x1) => { const u = tramo(t, t0, t1); return { x: lerp(x0, x1, u), anda: u > 0.001 && u < 0.999, dir: x1 >= x0 ? 1 : -1, u }; };
// luz suave que tiñe lo que hay debajo (con caída)
const brillo = (cx, cy, r, col, a = 0.5) => { if (a <= 0.01) return; cx = Math.round(cx); cy = Math.round(cy); const rr = Math.ceil(r);
  for (let dy = -rr; dy <= rr; dy++) { const y = cy + dy; if (y < 0 || y > 179) continue; for (let dx = -rr; dx <= rr; dx++) { const d = Math.hypot(dx, dy) / r, x = cx + dx; if (d >= 1 || x < 0 || x > 319) continue; R.pset(x, y, mez(R.pget(x, y), col, a * (1 - d) * (1 - d * 0.3))); } } };
// lo que pinta f, mezclado con trama al a (0–1) dentro del rectángulo (aparecer, desaparecer, la mujer invisible)
const fantasma = (f, a, x0, y0, x1, y1) => { if (a <= 0.02) return; if (a >= 0.98) { f(); return; } const D = R.buf; if (!VIVO.has('_tmp')) VIVO.set('_tmp', R.nuevo());
  const b = VIVO.get('_tmp'); b.set(D); const prev = R.usar(b); f(); R.usar(prev);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (bay(x, y) < a) D[y * 320 + x] = b[y * 320 + x]; };
const CORA = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'];
const corazon = (x, y, c = H('#e8304a'), s = 1) => { x = Math.round(x); y = Math.round(y);
  CORA.forEach((f, j) => [...f].forEach((ch, i) => { if (ch === '#') R.rect(x + i * s - 1, y + j * s - 1, x + i * s + s, y + j * s + s, K); }));
  CORA.forEach((f, j) => [...f].forEach((ch, i) => { if (ch === '#') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); })); R.rect(x + s, y + s, x + 2 * s - 1, y + 2 * s - 1, H('#ffc0c8')); };
// la nube gris con lluvia (la pena de que te gane alguien cercano)
const nubeGris = (x, y, t, s = 1, lluvia = true) => { x = Math.round(x); y = Math.round(y); const P = [[0, 1, 5], [7, -2, 6], [14, 1, 5], [7, 3, 5]];
  for (const [dx, dy, r] of P) R.disco(x + dx * s, y + dy * s, r * s + 1, K); for (const [dx, dy, r] of P) R.disco(x + dx * s, y + dy * s, r * s, H('#6a6e82'));
  for (const [dx, dy, r] of P.slice(0, 3)) R.disco(x + dx * s - 1, y + dy * s - 2, Math.max(1, r * s - 3), H('#9094a8'));
  if (lluvia) for (let k = 0; k < 5; k++) { const f = (t * 1.6 + k * 0.23) % 1, xx = x - 2 * s + k * 4 * s, yy = y + 6 * s + Math.round(f * 12 * s); R.linea(xx, yy, xx, yy + 2 * s, H('#7ab0e8')); } };
// el bocadillo de hablar (sin letras: tres puntos que corren)
const bocadillo = (x, y, t, k = 0) => { x = Math.round(x); y = Math.round(y); R.rect(x - 1, y - 1, x + 15, y + 9, K); R.rect(x, y, x + 14, y + 8, BL); R.rect(x, y + 7, x + 14, y + 8, H('#d8d4cc'));
  R.pset(x + 3, y + 9, BL); R.pset(x + 2, y + 10, K); R.pset(x + 4, y + 10, K); R.pset(x + 3, y + 11, K); const n = Math.floor(t * 5 + k) % 4;
  for (let i = 0; i < 3; i++) if (i < n) R.rect(x + 3 + i * 4, y + 3, x + 4 + i * 4, y + 4, K); };
// las llamas de la Antorcha Humana: lenguas que tiemblan alrededor del cuerpo (se pintan antes del actor) y chispas
const llamas = (cx, suelo, t, a = 1) => { const C = [H('#c8301a'), H('#f0701a'), H('#f8c030'), H('#fff4b0')];
  brillo(cx, suelo - 14, 26, H('#ff8a2a'), 0.35 * a);
  for (let k = 0; k < 12; k++) { const x = cx - 10 + k * 1.8, f = 0.5 + 0.5 * Math.sin(t * 13 + k * 2.1), alto = (k > 2 && k < 9 ? 33 : 22) + f * 6;
    for (let j = 0; j < 4; j++) R.linea(Math.round(x), suelo - 4 - j * 4, Math.round(x + Math.sin(t * 9 + k) * 1.5), Math.round(suelo - alto * (1 - j * 0.16)), C[j]); }
  for (let k = 0; k < 4; k++) { const f = (t * 1.3 + k * 0.27) % 1; R.pset(Math.round(cx - 6 + k * 4 + Math.sin(t * 5 + k) * 3), Math.round(suelo - 34 - f * 14), f < 0.5 ? C[3] : C[1]); } };
// la mano de luz roja de Mefisto (sin cara): palma, cuatro dedos y el pulgar, con su resplandor; cierra 0–1 encoge los dedos
const manoRoja = (cx, cy, s, t, a = 1, cierra = 0) => { if (a <= 0.02) return; const R0 = H('#7a0e10'), R1 = H('#e8281e'), R2 = H('#ff7a4a'), R3 = H('#ffd0a0');
  brillo(cx, cy - 8 * s, 40 * s, H('#ff2a1a'), 0.35 * a);
  const pinta = () => { const late = Math.sin(t * 3) * 0.6, D = [[-7.5, 0.92, -0.16], [-2.5, 1.1, -0.04], [2.5, 1.04, 0.06], [7.5, 0.82, 0.17]];
    const forma = (c, g) => { R.disco(cx, cy + 2 * s, 9 * s + g, c); R.disco(cx, cy + 8 * s, 7 * s + g, c);
      D.forEach(([dx, l, inc]) => { const L = 16 * s * l * (1 - cierra * 0.65) + late, x0 = cx + dx * s, y0 = cy - 3 * s, x1 = x0 + inc * L, y1 = y0 - L, hw = Math.floor(1.5 * s + g);
        for (let w = -hw; w <= hw; w++) R.linea(x0 + w, y0, x1 + w, y1, c); R.disco(x1, y1, 1.5 * s + g, c); });
      for (let w = -Math.floor(1.6 * s + g); w <= Math.floor(1.6 * s + g); w++) R.linea(cx - 8 * s, cy + 4 * s + w, cx - 16 * s + cierra * 6 * s, cy - 3 * s + w, c); };
    forma(R0, 1); forma(R1, 0); D.forEach(([dx, l, inc]) => { const L = 16 * s * l * (1 - cierra * 0.65) + late, x0 = cx + dx * s, y0 = cy - 3 * s; R.linea(x0, y0, x0 + inc * L, y0 - L + 1, R2); });
    R.disco(cx - 1 * s, cy + 3 * s, 5 * s, R2); R.disco(cx - 2 * s, cy + 2 * s, 2 * s, R3);
    for (let k = 0; k < 6; k++) { const f = (t * 0.8 + k / 6) % 1; R.pset(Math.round(cx - 14 * s + k * 5 * s + Math.sin(t * 2 + k) * 2), Math.round(cy - 10 * s - f * 30 * s), f < 0.5 ? R3 : R2); } };
  fantasma(pinta, a, Math.round(cx - 30 * s), Math.round(cy - 40 * s), Math.round(cx + 30 * s), Math.round(cy + 20 * s)); };
// un cristal de vibranio (prisma de seis caras): on 1 azul que brilla, 0 gris apagado
const cristal = (x, base, alto, w, on, t, k = 0) => { x = Math.round(x); base = Math.round(base); const top = base - alto;
  const c0 = mez(H('#3a3848'), H('#1a4ac8'), on), c1 = mez(H('#545264'), H('#3a8af0'), on), c2 = mez(H('#76748a'), H('#a8e4ff'), on);
  R.poligono([[x - w, base], [x - w, top + w], [x, top], [x + w, top + w], [x + w, base]], K);
  R.poligono([[x - w + 1, base - 1], [x - w + 1, top + w], [x, top + 1], [x, base - 1]], c1); R.poligono([[x + 1, top + 2], [x + w - 1, top + w], [x + w - 1, base - 1], [x + 1, base - 1]], c0);
  R.linea(x - w + 2, top + w, x - w + 2, base - 3, c2); R.linea(x, top + 2, x - w + 2, top + w, c2);
  if (on > 0.5 && Math.sin(t * 3 + k * 1.7) > 0.7) { const sy = top + 3 + Math.round((Math.sin(k * 3) * 0.5 + 0.5) * (alto - 8)); R.pset(x - 1, sy, BL); R.pset(x - 2, sy, c2); R.pset(x, sy, c2); R.pset(x - 1, sy - 1, c2); R.pset(x - 1, sy + 1, c2); } };
// sillería y chapa para los fondos propios
const silleria = (x0, y0, x1, y1, c0, a = 6, l = 12, sem = 0) => { for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / a), jy = (y - y0) % a;
  for (let x = x0; x <= x1; x++) { const xs = x - x0 + (f % 2) * (l >> 1), v = h2(Math.floor(xs / l), f, sem); let c = mez(c0, v > 0.5 ? H('#f0f0f0') : K, Math.abs(v - 0.5) * 0.32);
    if (jy === a - 1 || xs % l === 0) c = mez(c0, K, 0.5); else if (jy === 0) c = mez(c, H('#ffffff'), 0.14); else if (h2(x, y, sem + 3) > 0.94) c = mez(c, K, 0.18); else if (h2(x, y, sem + 7) > 0.97) c = mez(c, H('#ffffff'), 0.12); R.pset(x, y, c); } } };
const chapa = (x0, y0, x1, y1, c0, pw = 32, ph = 24, sem = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = Math.floor((x - x0) / pw), j = Math.floor((y - y0) / ph), lx = (x - x0) % pw, ly = (y - y0) % ph;
  let c = mez(c0, H('#ffffff'), (h2(i, j, sem) - 0.5) * 0.12 + 0.04 + (bay(x, y) < 0.3 && (x + y) % 7 === 0 ? 0.04 : 0));
  if (lx === 0 || ly === 0) c = mez(c0, K, 0.45); else if (lx === 1 || ly === 1) c = mez(c0, H('#ffffff'), 0.16); else if ((lx === 3 || lx === pw - 3) && (ly === 3 || ly === ph - 3)) c = mez(c0, H('#ffffff'), 0.35); else if ((lx === 4 || lx === pw - 2) && (ly === 4 || ly === ph - 2)) c = mez(c0, K, 0.35);
  R.pset(x, y, c); } };
// un hueco de pantalla: fondo en degradado vertical con líneas de barrido (con pset: respeta R.recorte)
const pantallaFondo = (x0, y0, x1, y1, ca, cb, t) => { for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0), barre = ((y + Math.floor(t * 20)) % 3 === 0);
  for (let x = x0; x <= x1; x++) { let c = u > bay(x, y) * 0.9 + 0.05 ? cb : ca; if (barre) c = mez(c, K, 0.12); R.pset(x, y, c); } } };
const vidrio = (x0, y0, x1, y1, t, a = 0.18) => { const off = Math.round((t * 30) % ((x1 - x0) + (y1 - y0) + 60)) - 30;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = (x - x0) + (y - y0) - off; if (d >= 0 && d < 7) R.pset(x, y, mez(R.pget(x, y), H('#ffffff'), a)); } };
const chispasC = (cx, cy, t, col, n = 8, r = 14, sem = 0) => { for (let k = 0; k < n; k++) { const f = (t * 0.9 + k / n + sem) % 1, a = k * 2.4 + sem * 7; R.pset(Math.round(cx + Math.cos(a) * r * f), Math.round(cy + Math.sin(a) * r * f - f * 6), f < 0.5 ? BL : col); } };
const humo = (cx, cy, u, c = H('#8a8a92')) => { if (u <= 0 || u >= 1) return; for (let k = 0; k < 6; k++) { const a = k * 1.05, r = 2 + u * 7; R.disco(Math.round(cx + Math.cos(a) * u * 9), Math.round(cy + Math.sin(a) * u * 6 - u * 10), Math.round(r * (1 - u * 0.4)), mez(c, H('#e8e8ec'), u)); } };
'''

# ── EL ÚLTIMO PLANO DE VD-ENEMIGOS (la sala con la pantalla roja), que vd-espejos congela ─────────────────────────────
_SALA = r'''
// la sala de los enemigos con la pantalla roja: la mano de Mefisto en la grande, Strange en la de arriba a la derecha y la
// tira de abajo en rojo; Doom delante; TT: { ini, roja, str, gira } (instantes de la escena)
const salaFinal = (t, TT) => {
  const ons = [0, 5].concat(t > TT.str ? [3] : []), o = { encuadre: 'trono', camara: 'enemigos', pantallas: ons }; const g = T.latveria(R, t, o);
  const [P0, , , P3, P4, P5] = g.pantallas, roja = tramo(t, TT.roja, TT.roja + 0.8);
  // la grande: el infierno estilizado en rojo, con la mano de luz que sube y late
  R.recorte([P0.x0 + 2, P0.y0 + 2, P0.x1 - 2, P0.y1 - 2]);
  pantallaFondo(P0.x0 + 2, P0.y0 + 2, P0.x1 - 2, P0.y1 - 2, mez(H('#3a0a10'), H('#200810'), 1 - roja), mez(H('#8a1a14'), H('#200810'), 1 - roja), t);
  for (let x = P0.x0 + 2; x <= P0.x1 - 2; x++) { const yy = P0.y1 - 8 + Math.round(Math.sin(x * 0.3 + t * 2) * 2 + Math.sin(x * 0.11) * 3); R.linea(x, yy, x, P0.y1 - 2, mez(H('#2a0808'), H('#e8501a'), (x * 7 % 5) / 10 * roja)); }
  manoRoja(160, 82 - Math.round(roja * 6), 1, t, roja, 0.15 + 0.15 * Math.sin(t * 1.4));
  R.recorte(null);
  // la de Strange: su capa roja delante de un círculo de luz dorada que gira
  if (t > TT.str) { const u = tramo(t, TT.str, TT.str + 0.5); R.recorte([P3.x0 + 2, P3.y0 + 2, P3.x1 - 2, P3.y1 - 2]);
    pantallaFondo(P3.x0 + 2, P3.y0 + 2, P3.x1 - 2, P3.y1 - 2, H('#1e1430'), H('#3a2050'), t);
    for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2 + t * 1.2; R.pset(Math.round(246 + Math.cos(a) * 13), Math.round(44 + Math.sin(a) * 9), H(k % 2 ? '#f8c840' : '#e88a20')); }
    if (u > 0.3) ac(EL.strange, 246, 61, t, { dir: -1, dedo: Math.sin(t * 2) > 0 }); R.recorte(null); }
  // la tira de abajo: la onda roja que late
  R.recorte([P5.x0 + 1, P5.y0 + 1, P5.x1 - 1, P5.y1 - 1]); R.rect(P5.x0 + 1, P5.y0 + 1, P5.x1 - 1, P5.y1 - 1, H('#200608'));
  for (let x = P5.x0 + 1; x <= P5.x1 - 1; x++) R.pset(x, Math.round(113 + Math.sin(x * 0.4 - t * 5) * 3 * (0.4 + roja * 0.6)), H('#ff4a2a')); R.recorte(null);
  // Doom mira la roja y, en «went down with him», aparta la mirada y se va hacia la izquierda
  T.latveriaDelante(R, t, o);
  // el resplandor rojo en el filo de la mesa y en el suelo; Doom, delante de la mesa, se da la vuelta y se va
  if (roja > 0) for (let x = 60; x <= 260; x += 2) R.pset(x, 146, mez(R.pget(x, 146), H('#ff5a3a'), 0.5 * roja));
  const v = ir(t, TT.gira, TT.gira + 1.6, 160, 122);
  brillo(160, 176, 40, H('#ff3a2a'), 0.25 * roja);
  ac(EL.doom, v.x, 177, t, { dir: t > TT.gira ? -1 : 1, anda: v.anda, quieto: false });
};
'''

_ENEM2 = r'''
// ── 9 · el desfile: llegan los Cuatro ──────────────────────────────────────────────────────────────────────────────────
const cuatro = (cx, suelo, t, o = {}) => { // los cuatro en fila: la Mole, Reed, Sue y la Antorcha (con sus llamas)
  const xs = [cx - 33, cx - 11, cx + 11, cx + 33];
  llamas(xs[3], suelo, t, 0.7);
  ac(VD.moleVD, xs[0], suelo, t, { dir: 1, sonrisa: true, brazos: o.brazos, dedo: o.dedo && o.k % 2 === 0, salto: o.salto ?? 0 });
  ac(EL.reed, xs[1], suelo, t, { dir: 1, sonrisa: true, brazos: o.brazos, dedo: o.dedo && o.k % 2 === 1 });
  ac(EL.sue, xs[2], suelo, t, { dir: -1, sonrisa: true, brazos: o.brazos, dedo: o.dedo && o.k % 2 === 0 });
  ac(EL.johnny, xs[3], suelo, t, { dir: -1, sonrisa: true, brazos: o.brazos, dedo: o.dedo && o.k % 2 === 1, habla: Math.sin(t * 12) > 0 });
  return xs; };
const p9 = (t) => {
  const ts = @42.6, av = t < ts ? -60 : 0, o = { encuadre: 'ciudad', avance: av, carroza: t < ts ? 160 + 60 * ts : 160 }; const g = DO.sesenta(R, t, o);
  const cx = g.carroza ? (g.carroza.x0 + g.carroza.x1) / 2 : 160, fam = t > @45.05;
  cuatro(cx, g.carroza ? g.carroza.cubierta : 142, t, { dedo: t > @42.4 && !fam, k: Math.floor(t * 2), brazos: fam });
  if (fam) corazon(cx - 6, 92 - Math.round(tramo(t, @45.05, @45.5) * 6 + Math.sin(t * 3)), H('#e8304a'), 2);
  DO.h_confeti(R, t, { n: 1 });
};

// ── 10 · la carroza de cerca: la Mole se ríe del globo de Doom ─────────────────────────────────────────────────────────
const globoDoom = (x, y, s, t) => { x = Math.round(x); y = Math.round(y); const r = Math.max(2, Math.round(11 * s));
  R.linea(x, y + r, x + Math.round(Math.sin(t * 2) * 3), y + r + 22, H('#e8e8e8'));
  R.disco(x, y, r + 1, K); R.disco(x, y, r, H('#2e7a3e')); R.disco(x - Math.round(r * 0.3), y - Math.round(r * 0.3), Math.max(1, Math.round(r * 0.4)), H('#4a9a5a'));
  if (s > 0.4) { const w = Math.round(r * 0.7); R.rect(x - w, y - w + 1, x + w, y + w, K); R.rect(x - w + 1, y - w + 2, x + w - 1, y + w - 1, H('#a8acbc')); R.rect(x - w + 2, y - w + 4, x - 1, y - w + 5, K); R.rect(x + 1, y - w + 4, x + w - 2, y - w + 5, K); R.rect(x - 1, y + 1, x, y + w - 2, H('#6a6e80')); R.rect(x - w + 2, y + w - 3, x + w - 2, y + w - 3, K); } };
const birrete = (x, y) => { R.poligono([[x - 7, y], [x, y - 4], [x + 7, y], [x, y + 3]], K); R.rect(x - 4, y + 1, x + 4, y + 4, K); R.linea(x + 5, y, x + 7, y + 6, H('#e8c040')); };
const p10 = (t) => {
  const o = { encuadre: 'ciudad', camara: 'desfile' }; const g = DO.sesenta(R, t, o), s = g.suelo ?? 151;
  const flex = t > @47.5 && t < @48.8, rie = t > @51.5 && t < @53.0, pincha = t > @52.4 && t < @52.9;
  llamas(98, s, t, 0.7);
  ac(EL.johnny, 98, s, t, { dir: 1, sonrisa: true, habla: Math.sin(t * 12) > 0 });
  ac(EL.sue, 128, s, t, { dir: 1, sonrisa: true, dedo: t > @49.0 && t < @50.0 });
  ac(EL.reed, 222, s, t, { dir: -1, sonrisa: true, dedo: t > @50.2 && t < @51.0 });
  const mx = lerp(186, 166, tramo(t, @47.2, @47.7));
  ac(VD.moleVD, mx, s, t, { dir: -1, sonrisa: true, brazos: flex, dedo: pincha, salto: rie && Math.sin(t * 18) > 0 ? 2 : 0 });
  if (flex) chispasC(mx, s - 24, t, H('#f8c040'), 6, 12);
  const bu = tramo(t, @49.7, @50.0) * (1 - tramo(t, @51.0, @51.3)); if (bu > 0) { R.disco(mx + 12, s - 44, 10 * bu + 1, K); R.disco(mx + 12, s - 44, 10 * bu, BL); R.pset(mx + 4, s - 33, BL); R.pset(mx + 2, s - 31, BL); if (bu > 0.8) birrete(mx + 12, s - 45); }
  // el globo con la cara de Doom entra flotando; la Mole se ríe y lo pincha: se deshincha y se va silbando
  const en1 = tramo(t, @50.6, @51.6), sale = tramo(t, @52.6, @53.5);
  if (en1 > 0) { const gx = lerp(-20, mx - 26, en1) + sale * 220, gy = 70 + Math.sin(t * 2) * 3 - sale * 70 + Math.sin(sale * 30) * 6 * sale; globoDoom(gx, gy, 1 - sale * 0.6, t); if (sale > 0) for (let k = 0; k < 4; k++) R.pset(Math.round(gx - 14 - k * 5), Math.round(gy + Math.sin(k + t * 20) * 3), BL); }
  if (rie) for (let k = 0; k < 3; k++) { const f = (t * 2 + k / 3) % 1; R.pset(Math.round(mx + 10 + k * 3), Math.round(s - 32 - f * 10), H('#f8e040')); }
  DO.h_confeti(R, t, { n: 0.6 });
};

// ── 11 · la cocina: la Antorcha no para de hablar ──────────────────────────────────────────────────────────────────────
const p11 = (t) => {
  const o = { encuadre: 'cocina' }; DO.lago(R, t, o);
  // el calendario de la pared, con el año de los Cuatro
  R.rect(152, 24, 187, 58, K); R.rect(153, 25, 186, 57, H('#f4f0e6')); R.rect(153, 25, 186, 33, H('#c8302a')); R.numero('62', 170, 50, { tam: 16, centro: true });
  const s = 160, tapa = t > @55.4;
  llamas(138, s, t, 1);
  ac(EL.johnny, 138, s, t, { dir: 1, habla: Math.sin(t * 14) > -0.2, sonrisa: true, dedo: Math.sin(t * 3) > 0.6 });
  ac(VD.moleVD, 190, s, t, { dir: t > @55.4 && t < @56.6 ? 1 : -1, triste: tapa, sorpresa: t > @56.8 && t < @57.4, salto: t > @56.8 && t < @57.1 ? 2 : 0 });
  for (let k = 0; k < 4; k++) { const t0 = @53.8 + k * 0.95; if (t > t0 && t < t0 + 1.4) bocadillo(140 + (k % 2) * 12 - (k > 1 ? 18 : 0), 112 - Math.round(tramo(t, t0, t0 + 0.3) * 4) - (k % 2) * 6, t, k); }
  // la tetera pita en «never stops talking»
  if (t > @56.8) { const u = tramo(t, @56.8, @57.8); for (let k = 0; k < 5; k++) { const f = (u + k / 5) % 1; R.disco(Math.round(232 + f * 10 + Math.sin(k + t * 6) * 2), Math.round(78 - f * 22), 1 + Math.round(f * 3), mez(H('#ffffff'), H('#c8d0d8'), f)); } }
  DO.lagoDelante(R, t, o);
};

// ── 12 · la azotea de cerca: la mujer invisible ────────────────────────────────────────────────────────────────────────
const p12 = (t) => {
  const o = { encuadre: 'cielo', camara: 'familia' }; DO.sesenta(R, t, o); const s = 165;
  const va = 1 - tramo(t, @60.1, @60.8), vuelve = tramo(t, @61.3, @61.9);
  fantasma(() => ac(EL.sue, 120, s, t, { dir: 1, sonrisa: true, dedo: t > @59.2 && t < @60.0 }), va, 100, 120, 140, s + 2);
  if (t > @60.1 && t < @61.0) chispasC(120, s - 14, t, H('#a8d8ff'), 10, 16);
  fantasma(() => ac(EL.sue, 204, s, t, { dir: 1, sonrisa: true }), vuelve, 184, 120, 224, s + 2);
  ac(EL.reed, 226, s, t, { dir: -1, sorpresa: t > @61.3 && t < @61.8, sonrisa: t > @61.8 || t < @60.0, habla: t > @58.3 && t < @59.0 });
  if (vuelve > 0.8) corazon(211, 118 - Math.round(Math.sin(t * 3)), H('#e8304a'), 2);
};

// ── 13 · la sala del consejo: el respeto ───────────────────────────────────────────────────────────────────────────────
const p13 = (t) => {
  const o = { encuadre: 'consejo' }; DO.multiverso(R, t, o); const s = 164;
  const d = ir(t, @62.4, @63.2, 96, 140), e = ir(t, @62.6, @63.4, 210, 170), mano = t > @63.4 && t < @65.6;
  ac(EL.doom, d.x, s, t, { dir: 1, anda: d.anda, sostiene: mano ? [154, 146] : undefined });
  ac(EL.sue, e.x, s, t, { dir: -1, anda: e.anda, sostiene: mano ? [156, 146] : undefined, sonrisa: t > @63.8 });
  if (mano) { const u = tramo(t, @63.5, @64.2); T.AT.anillo(R, 155, 146, 10, 6, t, u); brillo(155, 146, 14, H('#f8e080'), 0.4 * u); }
  ac(EL.reed, 262, s, t, { dir: -1, sorpresa: t > @64.6 && t < @65.6, dedo: t > @65.8 });
  DO.multiversoDelante(R, t, o);
};

// ── 14 · la noche del parto (2002): la luz cálida y Doom en la puerta ─────────────────────────────────────────────────
const p14 = (t) => {
  const o = { encuadre: 'cuarto', camara: 'puerta', noche: true, puerta: 0.55 + 0.15 * tramo(t, @71.2, @71.8) }; DO.latveria(R, t, o); const s = 164; T.tinte(R, 0, 179, [14, 18, 44], 0.38);
  const parpa = t > @70.0 && t < @71.2 ? 0.5 + 0.5 * Math.sin(t * 22) : 1, oro = tramo(t, @71.9, @72.6);
  brillo(148, 120, 46, H('#ffc870'), (0.22 + 0.3 * oro) * parpa);
  // Reed da vueltas delante de la puerta; la Mole y la Antorcha esperan
  const ida = (t * 0.55) % 2, rx = t < @71.4 ? lerp(70, 116, ida < 1 ? ease(ida) : ease(2 - ida)) : 116;
  ac(EL.reed, rx, s, t, { dir: t < @71.4 ? (ida < 1 ? 1 : -1) : 1, anda: t < @71.4, triste: t < @71.6, sorpresa: t > @71.5 && t < @72.3, sonrisa: t > @72.3 });
  ac(VD.moleVD, 210, s, t, { dir: -1, triste: t < @72.3, sonrisa: t > @72.3 });
  ac(EL.johnny, 44, s, t, { dir: 1, triste: t < @72.3, sonrisa: t > @72.3 });
  const dv = tramo(t, @71.2, @71.7);
  if (dv > 0) { brillo(148, 132, 22, H('#5af07a'), 0.45 * dv * (1 - oro * 0.6)); fantasma(() => ac(EL.doom, 148, 145, t, { dir: 1 }), dv, 130, 110, 166, 147); }
  if (oro > 0) { chispasC(148, 112, t, H('#ffe8a0'), 10, 20); if (oro > 0.6) corazon(142, 92 - Math.round(Math.sin(t * 3)), H('#e8304a'), 2); }
  DO.latveriaDelante(R, t, o);
};

// ── 15 · la azotea al atardecer: llega Iron Man ────────────────────────────────────────────────────────────────────────
const propulsor = (x, y, t) => { for (let k = 0; k < 3; k++) { const l = 4 + Math.round(Math.sin(t * 30 + k) * 2); R.linea(x + k * 4 - 4, y, x + k * 4 - 4, y + l, H(k === 1 ? '#fff4b0' : '#f8a030')); } };
const p15 = (t) => {
  const o = { encuadre: 'torre', luz: 'atardecer', pantalla: 'tierra' }; DO.washington(R, t, o); const s = 166;
  // Iron Man entra en la sala de control de la torre y se planta ante la pared de pantallas; brilla su pecho y un barrido
  // de luz le recorre la armadura («metal into his skin»); al final señala la Tierra de la pantalla
  const a = ir(t, @73.5, @75.0, -10, 120), r = ac(EL.ironman, a.x, s, t, { dir: 1, anda: a.anda, dedo: t > @79.0 });
  if (t > @75.4 && t < @77.2) { const u = Math.sin(tramo(t, @75.4, @77.2) * Math.PI); brillo(r.cabeza[0], r.cabeza[1] + 14, 10, H('#a8f0ff'), 0.8 * u); R.pset(r.cabeza[0], r.cabeza[1] + 14, BL); }
  const sc = tramo(t, @78.1, @78.9); if (sc > 0 && sc < 1) { const yy = Math.round(lerp(s - 26, s, sc)); for (let xx = r.cabeza[0] - 8; xx <= r.cabeza[0] + 8; xx++) R.pset(xx, yy, mez(R.pget(xx, yy), H('#ffffff'), 0.85)); }
  if (t > @79.0) chispasC(160, 50, t, H('#8ae8ff'), 6, 16);
  DO.washingtonDelante(R, t, o);
};

// ── 16 · la calle nevada: proteger a los demás ─────────────────────────────────────────────────────────────────────────
const maceta = (x, y) => { x = Math.round(x); y = Math.round(y); R.poligono([[x - 5, y - 6], [x + 5, y - 6], [x + 4, y], [x - 4, y]], K); R.poligono([[x - 4, y - 5], [x + 4, y - 5], [x + 3, y - 1], [x - 3, y - 1]], H('#c8603a')); R.rect(x - 5, y - 7, x + 5, y - 6, H('#e8804a'));
  R.disco(x, y - 10, 4, H('#2e7a3e')); R.disco(x - 2, y - 11, 2, H('#4aa85a')); R.pset(x + 1, y - 13, H('#e84a6a')); R.pset(x - 2, y - 9, H('#f8e040')); };
const p16 = (t) => {
  const o = { encuadre: 'nieve', camara: 'calle' }; DO.multiverso(R, t, o); const s = 164;
  const n = ir(t, @79.7, @80.8, 60, 150);
  const cae = tramo(t, @80.4, @81.15), coge = t > @81.15;
  const im = ir(t, @80.5, @81.15, 340, 176), r = ac(EL.ironman, im.x, coge ? s : lerp(120, s, tramo(t, @80.5, @81.15)), t, { dir: -1, sostiene: coge ? [170, s - 20] : undefined });
  if (!coge && t > @80.5) propulsor(Math.round(im.x), Math.round(lerp(120, s, tramo(t, @80.5, @81.15))) + 1, t);
  ac(EL.nino62, n.x, s, t, { dir: 1, anda: n.anda, sorpresa: t > @80.6 && t < @81.6, sonrisa: t > @81.6 });
  if (!coge) { if (t > @80.4) maceta(166, lerp(70, 120, cae)); else maceta(166, 70); } else maceta(r.mano[0], r.mano[1] + 2);
  if (t < @80.4) { R.rect(156, 72, 178, 73, H('#5a3a2a')); }
  if (coge && t < @81.6) chispasC(170, s - 24, t, H('#f8e040'), 6, 10);
  DO.multiversoDelante(R, t, o);
};

// ── 17 · el vacío del tiempo (1981): caen hacia el remolino ────────────────────────────────────────────────────────────
const p17 = (t) => {
  const o = { encuadre: 'arbol', ramas: tramo(t, @83.6, @86.2) }; DO.tiempo(R, t, o); const s = 166;
  const rem = tramo(t, @87.0, @87.8), cx = 160, cy = 64;
  if (rem > 0) { for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2 + t * 3, r = (8 + (k % 4) * 7) * rem; R.linea(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.6), Math.round(cx + Math.cos(a + 0.4) * r), Math.round(cy + Math.sin(a + 0.4) * r * 0.6), H(['#f8e080', '#c88af8', '#8ac8ff', '#ffffff'][k % 4])); }
    brillo(cx, cy, 30 * rem, H('#ffffff'), 0.5 * rem); }
  const tira = tramo(t, @88.3, @89.25);
  const pos = (x0, y0, lado) => { const a = tira * 5 * lado, r = (1 - tira); return [lerp(cx, x0, r) + Math.cos(a) * 10 * tira, lerp(cy + 12, y0, r) + Math.sin(a) * 6 * tira]; };
  const [dx, dy] = pos(104, s, 1), [ix, iy] = pos(216, s, -1), gira = tira > 0 ? (Math.floor(t * 8) % 2 ? 1 : -1) : 0;
  fantasma(() => ac(EL.doom, dx, dy, t, { dir: gira || 1, sorpresa: tira > 0, dedo: t > @84.3 && t < @86.0 }), 1 - tramo(t, @88.9, @89.25), 0, 0, 319, 179);
  fantasma(() => ac(EL.ironman, ix, iy, t, { dir: -gira || -1, dedo: t > @85.3 && t < @86.8 }), 1 - tramo(t, @88.9, @89.25), 0, 0, 319, 179);
  T.AT.luciernaga(R, 250 + Math.sin(t * 2) * 6 - tira * 60, 120 - tira * 40, t, { dir: -1, brillo: 0.8, cara: rem > 0 ? 'sorpresa' : 'normal' });
  DO.tiempoDelante(R, t, o);
};

// ── 18 · el bosque del cuento con Camelot: Iron Man del lado del rey ───────────────────────────────────────────────────
const p18 = (t) => {
  const o = { encuadre: 'bosque', criaturas: false }; CF.cuento(R, t, o); const s = 152;
  const a = ir(t, @89.4, @90.9, 30, 140), b = ir(t, @93.1, @93.9, 140, 206);
  ac(VD.arturoVD, 180, s, t, { dir: t > @93.6 ? 1 : -1, dedo: t > @90.7 && t < @91.8, sonrisa: t > @91.5 });
  ac(EL.ironman, t > @93.1 ? b.x : a.x, s, t, { dir: t > @93.9 ? -1 : 1, anda: a.anda || b.anda });
  if (t > @93.9) { const u = tramo(t, @93.9, @94.3); chispasC(193, s - 30, t, H('#f8e080'), 6, 10 * u); }
  CF.cuentoDelante(R, t, o);
};

// ── 19 · las ruinas nevadas: Doom y Morgana ────────────────────────────────────────────────────────────────────────────
const p19 = (t) => {
  const o = { encuadre: 'ruinas' }; DD.wundagore(R, t, o); const s = 160;
  const d = ir(t, @94.7, @95.8, 170, 112), orbe = tramo(t, @96.3, @97.2), verde = tramo(t, @98.9, @99.5);
  ac(VD.morganaVD, 56, s, t, { dir: 1, brazos: t > @96.3, dedo: t < @96.3 && Math.sin(t * 3) > 0, sonrisa: t > @97.0 });
  ac(EL.doom, d.x, s, t, { dir: -1, anda: d.anda, dedo: t > @98.9 });
  if (orbe > 0) { const r = 4 + orbe * 5 + verde * 3, oy = 128 + Math.round(Math.sin(t * 2) * 2);
    brillo(84, oy, 26 + verde * 8, H('#c86af8'), 0.45 * orbe); if (verde > 0) brillo(90, oy, 22, H('#5af07a'), 0.4 * verde);
    R.disco(84, oy, r + 1, K); R.disco(84, oy, r, mez(H('#8a3ac8'), H('#3ac86a'), verde * 0.5)); R.disco(83, oy - 1, Math.max(1, r - 3), H('#e8b8ff'));
    for (let k = 0; k < 10; k++) { const a = t * 4 + k * 0.63; R.pset(Math.round(84 + Math.cos(a) * (r + 5)), Math.round(oy + Math.sin(a) * (r + 3)), k % 2 && verde > 0 ? H('#7af89a') : H('#e8a8ff')); } }
  DD.wundagoreDelante(R, t, o);
};

// ── 20 · el caldero de Morgana: la puerta del infierno en el líquido ───────────────────────────────────────────────────
const cocinaBruja = () => fijo('cocinaBruja', () => {
  silleria(0, 0, 319, 179, H('#4a3e44'), 8, 18, 11);
  R.rect(0, 0, 319, 8, H('#241c22'));
  // la campana del hogar, la repisa con tarros y velas, las hierbas colgadas
  R.poligono([[70, 10], [250, 10], [234, 62], [86, 62]], H('#3a2e34')); for (let y = 12; y < 62; y += 6) R.linea(80 + (y - 10) * 0.3, y, 240 - (y - 10) * 0.3, y, H('#2a2026'));
  R.rect(84, 60, 236, 66, H('#5a3e2a')); R.rect(84, 60, 236, 61, H('#8a6a4a'));
  R.rect(10, 70, 64, 73, H('#5a3e2a')); R.rect(10, 70, 64, 70, H('#8a6a4a'));
  for (let k = 0; k < 5; k++) { const x = 14 + k * 10, h = 8 + (k % 3) * 3; R.rect(x, 69 - h, x + 6, 69, K); R.rect(x + 1, 70 - h, x + 5, 68, H(['#5a8a6a', '#8a4a6a', '#c8a04a', '#4a6a9a', '#7a5a3a'][k])); R.rect(x + 1, 70 - h, x + 2, 68, H('#ffffff') & 0x55ffffff | 0xaa000000); }
  for (let k = 0; k < 4; k++) { const x = 258 + k * 14; R.linea(x, 10, x, 22, H('#5a3e2a')); R.disco(x, 26, 4, H(['#5a7a3a', '#7a8a4a', '#6a5a8a', '#4a7a4a'][k])); R.disco(x - 1, 25, 2, H('#8aaa5a')); }
  R.rect(256, 8, 318, 10, H('#5a3e2a'));
  // la mesa de delante con un libro abierto y una calavera de cabra no: un búho de barro y un frasco
  R.rect(0, 150, 319, 179, H('#3a2a20')); for (let y = 150; y < 180; y += 4) R.linea(0, y, 319, y, H('#2a1e16')); R.rect(0, 150, 319, 151, H('#6a4a30'));
  R.rect(14, 128, 60, 150, K); R.rect(15, 129, 36, 149, H('#e8dcc0')); R.rect(38, 129, 59, 149, H('#e0d4b8')); for (let y = 133; y < 148; y += 3) { R.linea(18, y, 33, y, H('#8a7a6a')); R.linea(41, y, 56, y, H('#8a7a6a')); } R.rect(36, 129, 37, 149, H('#8a6a4a'));
  R.disco(282, 140, 8, K); R.disco(282, 140, 7, H('#8a6a4a')); R.disco(279, 137, 2, H('#f8e040')); R.disco(285, 137, 2, H('#f8e040')); R.pset(279, 137, K); R.pset(285, 137, K); R.rect(276, 147, 288, 150, H('#6a4a30'));
});
const p20 = (t) => {
  R.copiar(cocinaBruja());
  // el fuego bajo el caldero y su luz
  brillo(160, 150, 70, H('#ff8a2a'), 0.35 + 0.05 * Math.sin(t * 9));
  for (let k = 0; k < 14; k++) { const x = 118 + k * 6, f = 0.5 + 0.5 * Math.sin(t * 12 + k * 1.7), h = 10 + f * 8; R.linea(x, 158, x + Math.round(Math.sin(t * 8 + k) * 2), Math.round(158 - h), H(k % 3 ? '#f8a030' : '#f8e070')); R.linea(x + 1, 158, x + 1, Math.round(158 - h * 0.5), H('#c8401a')); }
  for (let k = 0; k < 6; k++) { R.disco(112 + k * 19, 160, 6, K); R.disco(112 + k * 19, 159, 5, H('#5a5a64')); }
  // el caldero, visto un poco desde arriba: cuerpo de hierro con remaches, borde y la boca con el líquido
  R.disco(160, 124, 50, K); R.disco(160, 124, 48, H('#2a2a32')); R.disco(148, 116, 32, H('#34343e')); R.disco(140, 108, 12, H('#4a4a56'));
  for (let k = 0; k < 9; k++) { const a = Math.PI * (0.15 + k * 0.09); R.pset(Math.round(160 + Math.cos(a) * 44), Math.round(124 + Math.sin(a) * 40), H('#6a6a76')); }
  R.rect(118, 166, 126, 172, K); R.rect(194, 166, 202, 172, K);
  const dentro = (x, y) => ((x - 160) / 54) ** 2 + ((y - 88) / 13) ** 2 < 1;
  for (let y = 72; y <= 104; y++) for (let x = 100; x <= 220; x++) { const d = ((x - 160) / 60) ** 2 + ((y - 88) / 17) ** 2; if (d < 1 && !dentro(x, y)) R.pset(x, y, d < 0.86 || y > 90 ? (y > 88 ? H('#3a3a44') : H('#5a5a66')) : K); }
  for (let x = 104; x <= 216; x += 2) { const y = Math.round(88 - Math.sqrt(Math.max(0, 1 - ((x - 160) / 60) ** 2)) * 17); R.pset(x, y + 1, H('#8a8a96')); }
  const vis = tramo(t, @100.3, @101.0), rojo = tramo(t, @102.6, @103.0), al = tramo(t, @101.9, @102.4);
  for (let y = 75; y <= 101; y++) for (let x = 106; x <= 214; x++) { if (!dentro(x, y)) continue; const w = Math.sin(x * 0.18 + t * 3) + Math.sin(y * 0.9 - t * 2.2);
    let c = w > 1.3 ? H('#d8a8ff') : w > 0.2 ? H('#8a4ac0') : H('#5a2a8a');
    // la visión: la puerta del infierno en rojo, en el centro del líquido
    const dv = ((x - 160) / 30) ** 2 + ((y - 88) / 9) ** 2;
    if (vis > 0 && dv < 1 && bay(x, y) < vis * (1.1 - dv)) { c = mez(H('#4a0a10'), H('#c8281a'), (y - 79) / 18 + rojo * 0.4); if (Math.abs(x - 160) < 8 && y > 81) c = (x === 160) ? H('#ff8a4a') : H('#2a0608'); if (Math.abs(x - 160) === 8 && y > 81) c = H('#7a2a1a'); }
    R.pset(x, y, c); }
  if (al > 0) { R.disco(160, Math.round(92 - al * 5), 2, BL); R.pset(160, Math.round(88 - al * 5), BL); brillo(160, 88 - al * 5, 10, H('#ffffff'), 0.7 * al); }
  for (let k = 0; k < 5; k++) { const f = (t * 0.9 + k / 5) % 1; R.disco(Math.round(118 + k * 20 + Math.sin(t * 2 + k) * 4), Math.round(80 - f * 44), 1 + Math.round(f * 3), mez(H('#c8a8e8'), H('#5a4a6a'), f)); }
  for (let k = 0; k < 4; k++) { const f = (t * 1.5 + k / 4) % 1, bx = 122 + k * 24; if (f < 0.35 && dentro(bx, 92)) { R.disco(bx, 92, Math.round(f * 7), H('#e8b8ff')); R.pset(bx, 92, H('#5a2a8a')); } }
  if (t > @102.6 && t < @103.2) brillo(160, 86, 56, H('#ff3a1a'), 0.45 * (1 - tramo(t, @102.9, @103.2)));
  // la cuchara de palo remueve sola, con la magia morada de Morgana
  const a = t * 2.2, bx = 160 + Math.round(Math.cos(a) * 36), by = 90 + Math.round(Math.sin(a) * 7), tx = bx + 10, ty = by - 30;
  for (let w = -1; w <= 1; w++) R.linea(bx + w, by, tx + w, ty, K); R.linea(bx, by, tx, ty, H('#a8804a')); R.linea(bx + 1, by, tx + 1, ty, H('#6a4a2a'));
  chispasC(tx, ty, t, H('#e8a8ff'), 8, 12); brillo(tx, ty, 12, H('#c86af8'), 0.35);
};

// ── 21 · el plató: este diciembre ──────────────────────────────────────────────────────────────────────────────────────
const cascoRojo = (x, y) => { x = Math.round(x); y = Math.round(y); R.disco(x, y, 6, K); R.disco(x, y, 5, H('#b82a24')); R.rect(x - 3, y - 2, x + 3, y + 4, H('#e8c040')); R.rect(x - 2, y, x - 1, y, K); R.rect(x + 1, y, x + 2, y, K); R.pset(x - 2, y - 3, H('#ff8a7a')); };
const p21 = (t) => {
  const o = { encuadre: 'plato', mascara: tramo(t, @104.6, @105.3) }; const g = DD.plato(R, t, o); const s = g.suelo ?? 160;
  // un técnico enfoca la máscara y otro cruza con un cable
  const a = ir(t, @104.0, @106.0, 60, 198); ac(EL.tecnico, a.x, s, t, { dir: 1, anda: a.anda, dedo: t > @104.3 && t < @105.4 && !a.anda });
  const b = ir(t, @106.8, @109.8, 240, 120); ac(EL.tecnica, b.x, s + 6, t, { dir: -1, anda: b.anda, sostiene: true });
  DD.platoDelante(R, t, o);
  // el calendario de mesa: diciembre y el 18
  const c = tramo(t, @106.4, @106.8); if (c > 0) { const y = 120 + Math.round((1 - c) * 8); R.rect(62, y, 84, y + 18, K); R.rect(63, y + 1, 83, y + 17, BL); R.rect(63, y + 1, 83, y + 5, H('#c8302a')); R.numero('12', 73, y + 5, { tam: 8, centro: true }); R.numero('18', 73, y + 16, { tam: 8, centro: true });
    if (t > @106.9) T.AT.anillo(R, 73, y + 12, 9, 7, t, tramo(t, @106.9, @107.4)); }
  // el casco rojo y dorado aparece en la silla del director en «Iron Man»
  fantasma(() => cascoRojo(168, 134), tramo(t, @108.8, @109.3), 160, 126, 176, 142);
};

// ── 22 · la máscara de cerca: «11» años, la mano que se la pone ────────────────────────────────────────────────────────
const p22 = (t) => {
  const o = { encuadre: 'plato', camara: 'mascara' }; const g = DD.plato(R, t, o);
  // la claqueta en el banco con el 11
  const c = tramo(t, @110.5, @110.9), cy = 142 + Math.round((1 - c) * 40);
  R.rect(22, cy, 74, cy + 26, K); R.rect(23, cy + 1, 73, cy + 25, H('#2a2a30')); for (let k = 0; k < 6; k++) R.poligono([[24 + k * 9, cy - 6], [30 + k * 9, cy - 6], [27 + k * 9, cy], [21 + k * 9, cy]], H(k % 2 ? '#f4f0e6' : '#2a2a30'));
  R.linea(22, cy - 7, 74, cy - 7, K); R.numero('11', 48, cy + 21, { tam: 16, centro: true });
  if (c >= 1 && t < @112.0) T.AT.anillo(R, 48, cy + 13, 22, 14, t, tramo(t, @110.9, @111.5));
  // el casco rojo y dorado en el banco: en «putting on Doom's mask» su luz se apaga y pasa, en chispas, a la máscara
  const pasa = tramo(t, @112.3, @113.4), [mx, my] = g.mascara ?? [150, 86];
  brillo(240, 146, 26, H('#ff8a4a'), 0.4 * (1 - pasa)); T.AT.escalado(R, () => cascoRojo(6, 6), 13, 13, 226, 132, 2);
  if (pasa > 0 && pasa < 1) for (let k = 0; k < 6; k++) { const f = Math.min(1, Math.max(0, pasa * 1.3 - k * 0.05)), x = lerp(238, mx + 10, f), y = lerp(140, my, f) - Math.sin(f * Math.PI) * 30; R.pset(Math.round(x), Math.round(y), k % 2 ? H('#f8e080') : BL); R.pset(Math.round(x) + 1, Math.round(y), H('#e8c040')); }
  if (pasa >= 1) { brillo(mx, my, 40, H('#a8f0b8'), 0.25 + 0.05 * Math.sin(t * 4)); chispasC(mx, my - 10, t, H('#a8f0b8'), 8, 26); }
};

// ── 23 · la orilla de Wakanda: Pantera Negra ───────────────────────────────────────────────────────────────────────────
const p23 = (t) => {
  const o = { encuadre: 'wakanda', camara: 'agua' }; DO.mundo(R, t, o); const s = 162;
  const p = ir(t, @114.9, @116.6, 330, 250);
  ac(VD.panteraVD, p.x, s, t, { dir: -1, anda: p.anda, dedo: t > @118.0 && t < @119.2 });
  ac(EL.chicaHoy, 208, s, t, { dir: 1, sonrisa: t > @117.4, dedo: t > @117.5 && t < @118.6 });
  ac(EL.chicoHoy, 224, s + 4, t, { dir: 1, sonrisa: t > @117.4, salto: t > @117.6 && t < @118.2 && Math.sin(t * 14) > 0 ? 2 : 0 });
  if (t > @117.6 && t < @119.0) corazon(212, 122 - Math.round(tramo(t, @117.6, @118.0) * 6), H('#e8304a'), 1);
  if (t > @120.2) { const u = tramo(t, @120.2, @121.0); for (let k = 0; k < 3; k++) T.AT.anillo(R, 120, 156, 6 + k * 6 * u, 2 + k * 2 * u, t, u); }
  DO.k_mundoDelante(R, t, o);
};

// ── 24 · dos reyes: Latveria de noche y Wakanda de día ─────────────────────────────────────────────────────────────────
const casita = (x, y) => { R.poligono([[x - 7, y], [x, y - 7], [x + 7, y]], K); R.poligono([[x - 5, y - 1], [x, y - 5], [x + 5, y - 1]], H('#c8302a')); R.rect(x - 5, y, x + 5, y + 7, K); R.rect(x - 4, y, x + 4, y + 6, H('#f0e0c0')); R.rect(x - 1, y + 3, x + 1, y + 6, H('#6a4a2a')); };
const p24 = (t) => {
  const A = enBufer('izq', () => { T.latveria(R, t, { encuadre: 'doomstadt' }); ac(EL.doom, 96, 170, t, { dir: 1, dedo: t > @124.6 }); T.latveriaDelante(R, t, { encuadre: 'doomstadt' }); });
  const B = enBufer('der', () => { DO.mundo(R, t, { encuadre: 'wakanda' }); ac(VD.panteraVD, 224, 162, t, { dir: -1, dedo: t > @124.6 }); DO.k_mundoDelante(R, t, { encuadre: 'wakanda' }); });
  const mitad = 160;
  trozo(A, 0, 0, mitad - 2, 179); trozo(B, mitad + 2, 0, 319, 179);
  R.rect(mitad - 1, 0, mitad + 1, 179, H('#e8c040')); R.rect(mitad, 0, mitad, 179, H('#fff4b0'));
  // pequeño, rico, orgulloso: tres medallas en la raya
  const med = (t0, y, f) => { const u = tramo(t, t0, t0 + 0.25); if (u <= 0) return; const r = Math.round(11 * (u < 1 ? 1 + Math.sin(u * Math.PI) * 0.3 : 1)); R.disco(mitad, y, r + 1, K); R.disco(mitad, y, r, H('#2a2a40')); R.disco(mitad, y, r - 2, H('#3a3a5a')); f(y); };
  med(@123.15, 62, (y) => casita(mitad, y - 2));
  med(@124.05, 92, (y) => R.icono('bolsa', mitad - 7, y - 7, H('#e8c040'), K, 2));
  med(@124.75, 122, (y) => R.icono('corona', mitad - 7, y - 7, H('#f8d040'), K, 2));
};

// ── 25 · el claro de la selva: le siguen por amor ──────────────────────────────────────────────────────────────────────
const p25 = (t) => {
  const o = { encuadre: 'claro' }; JM.selva(R, t, o); const s = 150;
  const p = ir(t, @125.85, @128.6, 236, 110);
  const seg = [[EL.chicaHoy, 22, 0], [EL.chicoHoy, 40, 0.15], [EL.nino62, 56, 0.3]];
  seg.forEach(([d, dx, dt], k) => { const q = ir(t, @126.1 + dt, @128.9 + dt, 236 + dx + 30, 110 + dx); ac(d, q.x, s + (k === 2 ? 2 : 0), t, { dir: -1, anda: q.anda, sonrisa: true, salto: k === 2 && q.anda && Math.sin(t * 12) > 0 ? 2 : 0 });
    if (t > @127.3 + dt * 2 && t < @129.6 + dt) corazon(q.x - 3, 104 - Math.round(Math.sin(t * 3 + k) * 2), H('#e8304a'), 1); });
  ac(VD.panteraVD, p.x, s, t, { dir: -1, anda: p.anda, sonrisa: t > @128.4, dedo: t > @128.9 });
  JM.selvaDelante(R, t, o);
};

// ── 26 · sobre la selva (2010): las naves de Doom ──────────────────────────────────────────────────────────────────────
const nave = (x, y, s, t, k) => { x = Math.round(x); y = Math.round(y); const w = Math.round(16 * s), h = Math.round(5 * s);
  R.poligono([[x - w, y], [x - w + 4, y - h], [x + w - 6, y - h], [x + w, y], [x + w - 4, y + h], [x - w + 4, y + h]], K);
  R.poligono([[x - w + 2, y], [x - w + 5, y - h + 1], [x + w - 6, y - h + 1], [x + w - 2, y], [x + w - 5, y + h - 1], [x - w + 5, y + h - 1]], H('#4a5a50'));
  R.poligono([[x - w + 5, y - h + 1], [x + w - 6, y - h + 1], [x + w - 3, y - 1], [x - w + 3, y - 1]], H('#6a7a70'));
  R.rect(x - 3, y - h - 2, x + 5, y - h, K); R.rect(x - 2, y - h - 1, x + 4, y - h, H('#5af07a'));
  R.disco(x - 4, y + 1, Math.max(2, Math.round(2.5 * s)), H('#2e7a3e')); R.disco(x - 4, y + 1, 1, H('#e8c040'));
  for (let j = 0; j < 3; j++) R.pset(x - w - 1 - j - Math.round(Math.sin(t * 30 + j + k) * 1), y + (j % 2), H(j ? '#f8a030' : '#fff4b0'));
  if (Math.sin(t * 6 + k) > 0.5) R.pset(x + w - 3, y + h - 2, H('#ff4a3a')); };
const p26 = (t) => {
  const o = { encuadre: 'caida' }; JM.selva(R, t, o);
  [[0, 60, 1.6, 0], [0.25, 44, 1.1, 1], [0.4, 74, 1.0, 2]].forEach(([dt, y, s, k]) => { const x = lerp(-10 + k * 30, 300 + k * 26, Math.min(1, Math.max(0, (t - @130.2) / (@134.3 - @130.2)))), yy = y + Math.sin(t * 1.5 + k) * 2;
    for (let j = -16; j <= 16; j++) R.pset(Math.round(x + j * s + 20), Math.round(yy + 70 + (k * 6)), mez(R.pget(Math.round(x + j * s + 20), Math.round(yy + 70 + k * 6)), K, 0.35));
    nave(x, yy, s, t, k); if (k === 0 && t > @133.0 && t < @133.8) brillo(x, yy, 18, H('#5af07a'), 0.5); });
  JM.selvaDelante(R, t, o);
};

// ── 27 y 29 · la cueva del vibranio ────────────────────────────────────────────────────────────────────────────────────
const CRIS = [[18, 150, 46, 7], [34, 156, 30, 5], [52, 146, 38, 6], [214, 148, 42, 7], [232, 156, 28, 5], [250, 150, 50, 8], [272, 154, 36, 6], [296, 150, 44, 7], [302, 160, 24, 4], [6, 160, 26, 4],
  [96, 110, 20, 4], [110, 114, 14, 3], [196, 108, 22, 4], [212, 114, 14, 3], [150, 104, 16, 3], [170, 106, 18, 4]];
const cueva = () => fijo('cueva', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h2(x >> 2, y >> 2, 13) * 0.6 + h2(x >> 3, y >> 3, 14) * 0.4, vena = Math.abs(Math.sin(x * 0.05 + y * 0.09 + Math.sin(y * 0.03) * 2)) < 0.05;
    let c = mez(H('#1a1a2a'), H('#3a3a52'), n * 0.9 + (y > 120 ? 0.1 : 0)); if (vena) c = mez(c, H('#3a6ac8'), 0.6); if ((x * 7 + y * 13) % 97 === 0) c = H('#6ab8ff'); R.pset(x, y, c); }
  // el suelo de losas talladas y el camino
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const f = (y - 132) / 48, w = 24 + f * 60; if (Math.abs(x - 160) < w) { const xx = Math.floor((x - 160) / (10 + f * 14)), yy = Math.floor(Math.pow(f, 0.7) * 6); let c = mez(H('#4a4a5e'), H('#5e5e74'), h2(xx, yy, 3)); if (Math.abs(((x - 160) / (10 + f * 14)) % 1) < 0.06 || (Math.pow(f, 0.7) * 6) % 1 < 0.08) c = H('#2a2a3a'); R.pset(x, y, c); } }
  // estalactitas y el arco tallado del fondo con sus glifos de pantera (sin letras)
  for (let k = 0; k < 18; k++) { const x = 8 + k * 18 + (k % 3) * 3, l = 8 + (k * 7 % 13); if (x > 270) continue; R.poligono([[x - 4, 0], [x + 4, 0], [x, l]], H('#2a2a3e')); R.linea(x - 1, 0, x, l - 2, H('#4a4a62')); }
  R.rect(118, 44, 202, 132, K); R.rect(120, 46, 200, 132, H('#4a4458')); R.rect(126, 52, 194, 132, H('#0a0a14'));
  R.poligono([[118, 46], [160, 26], [202, 46]], H('#4a4458')); R.disco(160, 38, 6, H('#2a2a3e')); R.disco(160, 38, 4, H('#3a8af0'));
  for (const x of [122, 196]) for (let y = 56; y < 128; y += 12) { R.rect(x - 1, y, x + 3, y + 6, H('#2a2a3e')); R.pset(x + 1, y + 3, H('#6ab8ff')); }
  for (let y = 52; y < 132; y++) for (let x = 126; x <= 194; x++) R.pset(x, y, mez(H('#0a0a14'), H('#1a3a8a'), Math.max(0, 1 - Math.hypot(x - 160, y - 132) / 70) * 0.8));
});
const cuevaViva = (t, luzFn) => {
  R.copiar(cueva());
  const glow = CRIS.map((c, k) => luzFn(c, k));
  CRIS.forEach(([x, b, h, w], k) => { if (glow[k] > 0.05) brillo(x, b - h / 2, h * 0.9, H('#3a8af0'), 0.35 * glow[k]); });
  CRIS.forEach(([x, b, h, w], k) => cristal(x, b, h, w, glow[k], t, k));
  for (let k = 0; k < 14; k++) { const f = (t * 0.25 + k / 14) % 1, x = (k * 53) % 300 + 10; R.pset(Math.round(x + Math.sin(t + k) * 4), Math.round(170 - f * 150), mez(H('#6ab8ff'), H('#1a1a2a'), f)); }
};
const p27 = (t) => {
  const pulso = tramo(t, @136.6, @137.4) * (1 - tramo(t, @138.4, @139.4));
  cuevaViva(t, (c, k) => 0.75 + 0.25 * Math.sin(t * 2 + k) * 0.5 + pulso * 0.25);
  const d = ir(t, @134.35, @135.5, 150, 160), coge = t > @135.6;
  const r = ac(EL.doom, d.x, 162, t, { dir: 1, anda: d.anda, sostiene: coge ? [176, 134 - Math.round(tramo(t, @135.6, @136.2) * 6)] : t > @135.3 ? [178, 146] : undefined });
  if (coge) { const [mx, my] = r.mano; cristal(mx, my + 2, 12, 3, 1, t, 99); brillo(mx, my - 4, 16, H('#6ab8ff'), 0.5); chispasC(mx, my - 4, t, H('#a8e4ff'), 6, 10); }
  if (pulso > 0) brillo(160, 130, 120, H('#3a8af0'), 0.18 * pulso);
};
const p29 = (t) => {
  const ola = (x) => 1 - tramo(t, @145.0 + (319 - x) / 319 * 2.4, @145.4 + (319 - x) / 319 * 2.4);
  cuevaViva(t, ([x]) => ola(x) * 0.95);
  const oscuro = tramo(t, @145.0, @147.6); T.tinte(R, 0, 179, [6, 8, 20], 0.35 * oscuro);
  const suyo = 1 - tramo(t, @146.2, @147.0);
  const r = ac(EL.doom, 160, 162, t, { dir: t > @147.6 ? -1 : 1, sostiene: [176, 128], sorpresa: t > @146.3 && t < @147.4, enfado: t > @147.4 });
  const [mx, my] = r.mano; cristal(mx, my + 2, 12, 3, suyo, t, 99); if (suyo > 0) brillo(mx, my - 4, 16, H('#6ab8ff'), 0.5 * suyo);
  if (suyo < 1 && suyo > 0) chispasC(mx, my - 4, t, H('#8a8a9a'), 6, 10);
};

// ── 28 · la terraza de Wakanda: T'Challa decide ────────────────────────────────────────────────────────────────────────
const p28 = (t) => {
  const o = { encuadre: 'wakanda' }; DO.mundo(R, t, o); const s = 162;
  const r = ac(EL.doom, 104, s, t, { dir: 1, sostiene: [120, 136], sorpresa: t > @143.8 && t < @144.6 });
  const [mx, my] = r.mano; cristal(mx, my + 2, 12, 3, 1, t, 99); brillo(mx, my - 4, 14, H('#6ab8ff'), 0.4);
  const p = ir(t, @139.7, @140.6, 250, 214);
  ac(VD.panteraVD, p.x, s, t, { dir: -1, anda: p.anda, dedo: t > @140.4 && t < @144.8, habla: t > @141.0 && t < @142.4 ? voz(t) > 0.2 : false });
  const on = tramo(t, @143.6, @144.6); if (on > 0) { for (let k = 0; k < 3; k++) { const u = Math.min(1, on * 1.4 - k * 0.2); if (u > 0) T.AT.anillo(R, 212, 128, 8 + u * 40, 5 + u * 24, t, u); } brillo(212, 128, 24, H('#6ab8ff'), 0.5 * on); }
  DO.k_mundoDelante(R, t, o);
};

// ── 30 · la puerta de la ruina: la piedra gris al suelo ────────────────────────────────────────────────────────────────
const p30 = (t) => {
  const o = { encuadre: 'claro', camara: 'ruina' }; JM.selva(R, t, o); const s = 156;
  const sal = ir(t, @149.0, @150.4, 160, 118), tira = t > @150.9, tu = tramo(t, @150.9, @151.3);
  const r = ac(EL.doom, sal.x, t < @149.6 ? lerp(146, s, tramo(t, @149.0, @149.6)) : s, t, { dir: t > @151.6 ? 1 : -1, anda: sal.anda || (t > @151.6 && t < @152.8), sostiene: tira ? undefined : [sal.x - 14, 132], enfado: t > @150.6 });
  const [mx, my] = tira ? [lerp(sal.x - 14, 86, tu), lerp(132, s - 2, tu * tu)] : r.mano;
  R.disco(Math.round(mx), Math.round(my), 4, K); R.disco(Math.round(mx), Math.round(my), 3, H('#6a6a76')); R.pset(Math.round(mx) - 1, Math.round(my) - 1, H('#9a9aa6'));
  if (tu >= 1) humo(86, s - 2, tramo(t, @151.3, @152.2), H('#a89a80'));
  JM.selvaDelante(R, t, o);
};

// ── 31 · la mesa de mando de cerca: Atom apaga a los enemigos ──────────────────────────────────────────────────────────
const MON = [[18, 52], [70, 52], [122, 52], [174, 52], [226, 52]];
const mesaMando = () => fijo('mesaMando', () => {
  chapa(0, 0, 319, 122, H('#2e3440'), 36, 30, 21); R.rect(0, 0, 319, 6, H('#1a1e26'));
  for (const [x, y] of MON) { R.rect(x - 2, y - 2, x + 46, y + 36, K); R.rect(x - 1, y - 1, x + 45, y + 35, H('#4a5464')); R.rect(x, y, x + 44, y + 34, H('#10141a')); R.rect(x + 20, y + 36, x + 24, y + 44, H('#3a4250')); }
  R.rect(278, 52, 318, 120, K); R.rect(279, 53, 317, 119, H('#3a4250')); for (let y = 58; y < 116; y += 8) R.rect(284, y, 312, y + 4, H('#2a303a'));
  R.rect(0, 122, 319, 179, H('#3a4250')); R.rect(0, 122, 319, 125, H('#7a8494')); R.rect(0, 126, 319, 128, H('#2a303a'));
  for (let y = 132; y < 180; y += 3) R.linea(0, y, 319, y, H('#343b48'));
  for (let k = 0; k < 9; k++) { const x = 14 + k * 34; R.rect(x, 136, x + 22, 150, K); R.rect(x + 1, 137, x + 21, 149, H('#262c36')); }
});
const p31 = (t) => {
  R.copiar(mesaMando());
  const quien = [() => ac(EL.reed, 40, 84, t, { sonrisa: true }), () => ac(VD.moleVD, 92, 84, t, { sonrisa: true }), () => { llamas(144, 84, t, 0.7); ac(EL.johnny, 144, 84, t, {}); }, () => ac(EL.ironman, 196, 84, t, {}), () => ac(VD.panteraVD, 248, 84, t, {})];
  const fondos = [['#cfe4f0', '#9ac0dc'], ['#f0c890', '#c88a50'], ['#f8d080', '#e8803a'], ['#e8c8a0', '#a85a3a'], ['#c8b0e0', '#6a4a9a']];
  const apaga = [@155.35, @155.6, @155.85, @156.1, @156.35];
  MON.forEach(([x, y], k) => { const off = t > apaga[k]; R.recorte([x, y, x + 44, y + 34]);
    if (!off) { pantallaFondo(x, y, x + 44, y + 34, H(fondos[k][0]), H(fondos[k][1]), t); quien[k](); }
    else { const u = tramo(t, apaga[k], apaga[k] + 0.25); if (u < 1) { R.rect(x, y, x + 44, y + 34, K); for (let xx = x; xx <= x + 44; xx++) R.pset(xx, y + 17, BL); R.linea(x + 22 - Math.round((1 - u) * 22), y + 17, x + 22 + Math.round((1 - u) * 22), y + 17, BL); } else R.rect(x, y, x + 44, y + 34, H('#0a0c10')); }
    R.recorte(null); vidrio(x, y, x + 44, y + 34, t + k, 0.1); R.pset(x + 42, y + 37, off ? H('#5a1a1a') : H('#3ae87a')); });
  // los pilotos de la mesa
  for (let k = 0; k < 9; k++) { const x = 14 + k * 34, on = Math.sin(t * 3 + k * 1.9) > 0; R.rect(x + 3, 140, x + 7, 144, on ? H(['#3ae87a', '#e8c03a', '#e84a3a'][k % 3]) : H('#3a4250')); R.rect(x + 12, 140, x + 18, 146, H('#8a94a4')); }
  // Atom, de pie en la mesa, habla con nosotros y pulsa los botones
  const n = apaga.filter((a) => t > a - 0.2).length, xa = n === 0 ? lerp(150, 40, tramo(t, @153.8, @155.0)) : MON[Math.min(4, n - 1)][0] + 22, pulsa = n > 0 && t < @156.6;
  const ax = n === 0 ? xa : lerp(n > 1 ? MON[n - 2][0] + 22 : 40, xa, tramo(t, apaga[n - 1] - 0.2, apaga[n - 1] - 0.02));
  T.AT.atom(R, ax, 136, t, { s: 2, dir: n > 0 || t > @155.0 ? 1 : -1, pose: t < @154.3 ? 'saluda' : n === 0 && t < @155.0 ? 'camina' : pulsa ? 'senala' : 'brazos', cara: t > @156.4 ? 'guino' : 'normal', habla: voz(t) });
};

// ── 32 · el camino del infierno: la mano roja y la luz de su madre ─────────────────────────────────────────────────────
const p32 = (t) => {
  const o = { encuadre: 'camino', alma: t < @158.9 ? 0.25 + 0.1 * tramo(t, @157.6, @158.6) : 0 }; T.infierno(R, t, o); const s = 152;
  const sube = tramo(t, @156.85, @157.8), cierra = tramo(t, @158.5, @159.1);
  manoRoja(245, Math.round(lerp(150, 78, sube)), 1.3, t, sube, cierra);
  if (cierra > 0 && cierra < 1) brillo(245, 66, 16, H('#ffffff'), 0.5 * (1 - cierra));
  const n = ir(t, @156.85, @157.9, 40, 96);
  ac(VD.victorNinoVD, n.x, s, t, { dir: 1, anda: n.anda, sorpresa: t > @157.5 && t < @158.6, triste: t > @158.6 });
  T.infiernoDelante(R, t, o);
};

// ── 33 · la forja: un invento que no sirve contra él ───────────────────────────────────────────────────────────────────
const aparato = (x, y, t, roto) => { x = Math.round(x); y = Math.round(y); R.rect(x - 7, y - 8, x + 7, y, K); R.rect(x - 6, y - 7, x + 6, y - 1, H('#7a7e8c')); R.rect(x - 6, y - 7, x + 6, y - 6, H('#a8acbc'));
  R.linea(x + 3, y - 8, x + 6, y - 15, K); R.disco(x + 6, y - 16, 2, roto ? H('#3a3a3a') : H('#5af07a')); R.rect(x - 4, y - 5, x - 1, y - 3, roto ? H('#2a2a2a') : (Math.sin(t * 8) > 0 ? H('#5af07a') : H('#2a8a3a'))); };
const p33 = (t) => {
  const o = { encuadre: 'forja' }; T.tibet(R, t, o); const s = 150;
  const golpes = t < @161.5, roto = t > @162.2;
  const r = ac(EL.doom, 132, s, t, { dir: 1, sostiene: golpes ? [150, 124 + (Math.floor(t * 4) % 2) * 8] : undefined, enfado: roto, dedo: t > @163.0 && t < @163.8 });
  aparato(165, 136, t, roto);
  if (golpes) { const [mx, my] = r.mano; R.linea(mx, my, mx + 6, my + 6, H('#5a3e2a')); R.rect(mx + 4, my + 4, mx + 10, my + 8, K); R.rect(mx + 5, my + 5, mx + 9, my + 7, H('#8a8a96')); }
  if (t > @161.5 && t < @162.2) { chispasC(171, 120, t, H('#5af07a'), 10, 14); brillo(171, 120, 20, H('#5af07a'), 0.5); }
  humo(170, 118, tramo(t, @162.2, @163.4), H('#5a5a62'));
  const nino = tramo(t, @163.9, @164.5) * (1 - tramo(t, @165.2, @165.8)); fantasma(() => ac(VD.victorNinoVD, 104, s, t, { dir: 1, triste: true }), nino * 0.7, 90, 110, 120, s + 2);
  T.tibetDelante(R, t, o);
};

// ── 34 · el santuario: Strange le tiende la mano ───────────────────────────────────────────────────────────────────────
const p34 = (t) => {
  const o = { encuadre: 'santuario', luz: 'noche' }; DO.multiverso(R, t, o); const s = 152;
  const d = ir(t, @165.9, @167.2, -10, 116);
  ac(EL.doom, d.x, s, t, { dir: 1, anda: d.anda, dedo: t > @169.4 });
  const mano = t > @167.3 && t < @169.0;
  ac(EL.strange, 200, s, t, { dir: -1, sostiene: mano ? [184, 136] : undefined, dedo: t > @169.4, habla: t > @167.4 && t < @168.4 ? voz(t) > 0.2 : false });
  if (mano) { chispasC(184, 134, t, H('#f8c840'), 8, 12); brillo(184, 134, 14, H('#f8c840'), 0.4); }
  if (t > @168.2 && t < @168.9) brillo(160, 100, 60, H('#ff3a1a'), 0.18);
  DO.multiversoDelante(R, t, o);
};

// ── 35 · la pared del portal: el más poderoso de la Tierra ─────────────────────────────────────────────────────────────
const copa = (x, y) => { x = Math.round(x); y = Math.round(y); R.poligono([[x - 8, y - 10], [x + 8, y - 10], [x + 5, y], [x - 5, y]], K); R.poligono([[x - 7, y - 9], [x + 7, y - 9], [x + 4, y - 1], [x - 4, y - 1]], H('#e8c040'));
  R.rect(x - 1, y, x + 1, y + 5, H('#c8a030')); R.rect(x - 5, y + 5, x + 5, y + 7, K); R.rect(x - 4, y + 5, x + 4, y + 6, H('#e8c040')); R.linea(x - 5, y - 8, x - 3, y - 2, H('#fff4b0')); R.numero('1', x, y - 2, { tam: 8, centro: true }); };
const p35 = (t) => {
  const o = { encuadre: 'santuario', camara: 'portal', hechizo: tramo(t, @170.5, @171.6) * 0.5, hechizoX: 236 }; DO.multiverso(R, t, o); const s = 160;
  ac(EL.strange, 236, s, t, { dir: -1, brazos: t > @170.5 && t < @172.6, dedo: t > @174.6, sonrisa: t > @175.8 });
  const dg = t > @171.9 && t < @173.8;
  ac(EL.doom, 84, s, t, { dir: 1, brazos: dg, dedo: t > @174.6 });
  if (dg) { chispasC(84, 120, t, H('#5af07a'), 12, 18); brillo(84, 122, 22, H('#5af07a'), 0.4); }
  // la copa del «1» va de uno a otro
  const lado = Math.sin((t - @172.6) * 2.4), cx = t > @172.6 ? 160 + lado * 46 : 160, cy = 80 + Math.sin(t * 2) * 3;
  if (t > @172.4) { brillo(cx, cy, 18, H('#f8e080'), 0.4); copa(cx, cy); }
  if (t > @175.0 && t < @176.2) chispasC(160, 70, t, H('#8ac8ff'), 8, 16);
  DO.multiversoDelante(R, t, o);
};

// ── 36 · la sala: la pantalla roja; Doom aparta la mirada ──────────────────────────────────────────────────────────────
const TT36 = { ini: @177.0, roja: @177.1, str: @177.5, gira: @181.1 };
const p36 = (t) => salaFinal(t, TT36);

const efectos = [[@1.0, 'pasos'], [@2.8, 'interruptor'], [@3.6, 'zumbido'], [@5.4, 'pasos'], [@7.9, 'brillo'], [@9.8, 'pasos'], [@11.1, 'bip'], [@16.15, 'zumbido'],
  [@17.3, 'brillo'], [@21.25, 'pop'], [@22.3, 'puerta'], [@24.6, 'pasos'], [@25.95, 'pop'], [@28.85, 'chof'], [@30.75, 'pasos'], [@32.45, 'golpecito'], [@33.55, 'carro'], [@34.4, 'golpecito'],
  [@37.5, 'viento'], [@38.4, 'pasos'], [@40.3, 'publico', { dur: 3 }], [@42.6, 'campana'], [@45.1, 'pop'], [@47.6, 'publico', { dur: 2 }], [@51.6, 'boing'], [@52.65, 'whoosh'],
  [@54.0, 'pop'], [@56.85, 'silbato'], [@60.15, 'brillo'], [@61.6, 'pop'], [@62.6, 'pasos'], [@63.55, 'campana'], [@67.2, 'pasos'], [@71.3, 'puerta'], [@72.0, 'brillo'],
  [@73.8, 'pasos'], [@75.5, 'bip'], [@78.2, 'brillo'], [@80.8, 'whoosh'], [@81.2, 'golpecito'], [@84.3, 'zumbido'], [@87.1, 'whoosh'], [@88.4, 'rafaga'],
  [@90.8, 'campana'], [@93.2, 'pasos'], [@96.35, 'brillo'], [@98.95, 'zumbido'], [@100.1, 'burbujas'], [@102.0, 'brillo'], [@104.65, 'interruptor'], [@106.45, 'pop'], [@108.85, 'brillo'],
  [@110.55, 'pop'], [@112.4, 'brillo'], [@115.1, 'pasos'], [@117.6, 'pajaros'], [@123.15, 'pop'], [@124.05, 'pop'], [@124.75, 'pop'], [@126.0, 'pasos'], [@127.4, 'pop'],
  [@130.4, 'jet'], [@133.0, 'zumbido'], [@134.5, 'pasos'], [@135.65, 'brillo'], [@140.0, 'pasos'], [@143.65, 'zumbido'], [@145.1, 'interruptor'], [@147.0, 'cuelga'],
  [@149.2, 'pasos'], [@151.0, 'golpecito'], [@153.2, 'bip'], [@155.35, 'interruptor'], [@156.1, 'interruptor'], [@156.9, 'trueno'], [@158.6, 'cuelga'], [@161.4, 'golpecito'], [@161.6, 'vapor'],
  [@164.0, 'brillo'], [@166.1, 'pasos'], [@167.35, 'brillo'], [@170.55, 'brillo'], [@171.95, 'zumbido'], [@174.9, 'campana'], [@177.2, 'zumbido'], [@181.2, 'pasos']];
const AÑOS = { 13: 2002, 16: 1981, 17: 1981, 18: 1981, 19: 1981, 20: 2026, 21: 2026, 25: 2010, 26: 2010, 27: 2010, 28: 2010, 29: 2010 };
const planos = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30, p31, p32, p33, p34, p35, p36];
const cual = (t) => { let k = 0; while (k + 1 < P.length && t >= P[k + 1]) k++; return k; };
T.rodar(E, R, planos.map((f, i) => [P[i], f]), { efectos, año: (t) => AÑOS[cual(t)] ?? null });
'''

E = {}

E['vd-enemigos'] = ('Sus enemigos', '''// VD-ENEMIGOS (frases 22–26), sin cartela. 36 planos de 3,6–6,9 s, cortados en la palabra inglesa:
// 1 «And to understand Doom» la sala de los enemigos: Doom entra y se planta; las seis pantallas se encienden una a una en
//   «enemies» (Reed, la Mole, la Antorcha, Iron Man, Pantera Negra y la onda roja);
// 2 «mirror» el pasillo del castillo con el espejo dorado: Doom se mira; en «The first» el cristal ondula y el reflejo
//   es Reed, que sonríe; Doom da un paso atrás;
// 3 «is Reed Richards» la pantalla grande de cerca: Reed en su laboratorio saluda y le tiende la mano; detrás de él, las
//   siluetas de su familia; Doom (de espaldas, abajo) se enfada y la imagen se rasga;
// 4 «Reed is everything» el mirador de Battleworld: Doom y Reed frente a frente, como en un espejo; en «brilliant»
//   levantan el dedo a la vez; Atom luciérnaga entre los dos;
// 5 «but he has a family» el cuarto del bebé: Reed entra, Sue mece la cuna; en «friends» asoman la Antorcha y la Mole;
// 6 «which is the ability to make a mistake» el laboratorio: el matraz de Reed echa humo; pide perdón a Sue y sigue;
// 7 «That's why, every time Doom loses» la azotea: el robot de Doom se desmonta ante Reed; en el cielo, las X de sus
//   derrotas; Doom patalea;
// 8 «He's losing to the life» Nueva York nevada: Doom mira una ventana con una familia; en «never had» se va;
// 9 «hates… the Fantastic Four» el desfile: la carroza del 4 llega con los cuatro, que saludan; confeti;
// 10 «There's Ben Grimm» la carroza de cerca: la Mole saca músculo; el globo con la máscara de Doom; la Mole se ríe y lo
//   pincha (se va silbando);
// 11 «There's Johnny» la cocina: la Antorcha en llamas habla sin parar; la Mole se tapa los oídos; la tetera pita;
// 12 «And above all there's Sue» la azotea de cerca: Sue se vuelve invisible y aparece junto a Reed; corazón;
// 13 «for whom Doom feels a respect» la sala blanca del consejo: Doom le tiende la mano a Sue y ella la estrecha;
// 14 «when a very difficult birth» el cuarto del bebé de noche (2002): Reed espera ante la puerta con la luz cálida; en
//   «it was Doom» Doom aparece en la puerta con su luz verde y la luz se vuelve dorada; corazón;
// 15 «Then there's Iron Man» la sala de control de la torre de cristal: Iron Man entra, le brilla el pecho y un barrido
//   de luz le recorre la armadura en «metal into his skin»; señala la Tierra;
// 16 «protect other people» la calle nevada: cae una maceta sobre un niño e Iron Man la atrapa;
// 17 «In 1981» el vacío del tiempo: Doom e Iron Man caen girando hacia el remolino (1981);
// 18 «King Arthur» el bosque del cuento con Camelot al fondo: Iron Man se pone junto al rey Arturo;
// 19 «Doom allies with the sorceress» las ruinas nevadas: Morgana y Doom juntan su magia;
// 20 «Once again, get his mother out of hell» el caldero: en el líquido, la puerta roja y la lucecita blanca;
// 21 «a detail… this December» el plató: se enciende el foco sobre la máscara; el calendario del 18; el casco rojo en la
//   silla (2026);
// 22 «for 11 years… putting on Doom's mask» la máscara de cerca: el «11» en la claqueta; la mano de manga roja y dorada
//   llega a la capucha;
// 23 «And there's Black Panther» la orilla de Wakanda: Pantera Negra pasea y la gente le saluda;
// 24 «because he's also the king» dos mitades: Latveria de noche y Wakanda de día; pequeño, rico, orgulloso;
// 25 «but his people follow him» el claro de la selva: la gente le sigue contenta; corazones;
// 26 «In 2010… Doom invades» sobre la selva: tres naves verdes de Doom cruzan (2010);
// 27 «seizes its vibranium» la cueva del vibranio: Doom entra y coge un cristal azul;
// 28 «T'Challa does something» la terraza de Wakanda: Pantera alza el brazo; una onda azul sale de él;
// 29 «renders… useless» la cueva: los cristales se apagan uno a uno; Doom, con el suyo gris;
// 30 «so no one can use it» la puerta de la ruina: Doom sale con la piedra gris y la tira al suelo;
// 31 «But if you ask me» la mesa de mando de cerca: Atom apaga uno a uno los monitores de los enemigos;
// 32 «Mephisto, the demon» el camino del infierno: la mano de luz roja sube tras la puerta y se cierra sobre la luz blanca;
// 33 «can't defeat with inventions» la forja: el invento de Doom chisporrotea y se apaga; en «a boy», su sombra de niño;
// 34 «And the only one who helped him» el santuario: Doom entra; Strange le tiende la mano;
// 35 «Doctor Strange, the sorcerer» la pared del portal: los dos hacen magia; la copa del «1» va de uno a otro;
// 36 «went down with him» la sala: la grande en rojo con la mano de Mefisto, Strange en otra; Doom aparta la mirada.''', _t('vd-enemigos', _IMPORTS + _UTIL + _SALA + r'''
const P = [0, @5.0, @10.8, @16.9, @22.15, @27.55, @31.65, @36.4, @40.05, @46.8, @53.6, @58.1, @62.4, @66.9, @73.5, @79.7, @83.5, @89.3, @94.6, @99.9, @104.0,
  @109.95, @114.8, @121.7, @125.8, @130.2, @134.3, @139.7, @144.8, @149.0, @152.85, @156.75, @161.3, @165.9, @170.2, @177.0];

// ── 1 · la sala de los enemigos: las pantallas se encienden ─────────────────────────────────────────────────────────────
const ENC = [@2.8, @3.25, @3.6, @3.95, @4.3, @4.6];
// lo que sale en cada pantalla (fondo y quién), recortado a su hueco
const enPantalla = (p, i, t, quien, ca, cb, sueloDentro, o = {}) => { R.recorte([p.x0 + 2, p.y0 + 2, p.x1 - 2, p.y1 - 2]);
  pantallaFondo(p.x0 + 2, p.y0 + 2, p.x1 - 2, p.y1 - 2, H(ca), H(cb), t);
  for (let x = p.x0 + 2; x <= p.x1 - 2; x += 6) R.linea(x, p.y1 - 6, x, p.y1 - 2, mez(H(cb), K, 0.25));
  if (quien) quien(); R.recorte(null);
  const u = tramo(t, ENC[i], ENC[i] + 0.25); if (u < 1) { const cy = Math.round((p.y0 + p.y1) / 2), hh = Math.round((p.y1 - p.y0) / 2 * u); for (let x = p.x0 + 2; x <= p.x1 - 2; x++) { R.pset(x, cy - hh, BL); R.pset(x, cy + hh, BL); } } };
// el laboratorio de Reed en pequeño (w × h en el origen), para pegarlo a escala 2 en una pantalla con T.AT.escalado
const miniLab = (t, w, h, o = {}) => {
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { let c = (x % 6 === 0 || y % 6 === 0) ? H('#b8ccd8') : mez(H('#e4eef4'), H('#d4e0ea'), h2(x >> 1, y >> 1, 4) * 0.7); if (y >= h - 7) c = ((x + (y >> 1)) % 4 < 2) ? H('#8a9aa8') : H('#76869a'); if (y === h - 7) c = H('#5a6a78'); R.pset(x, y, c); }
  const wx = w - 21; R.rect(wx - 1, 2, w - 3, 19, H('#5a6a78')); for (let y = 3; y <= 18; y++) for (let x = wx; x <= w - 4; x++) R.pset(x, y, mez(H('#7ac0f0'), H('#c8e8ff'), (y - 3) / 15));
  for (const [dx, hh] of [[1, 9], [5, 13], [10, 7], [14, 11]]) { R.rect(wx + dx, 18 - hh, wx + dx + 3, 18, H('#5a7a98')); for (let y = 19 - hh; y < 18; y += 3) R.pset(wx + dx + 1, y, Math.sin(t * 2 + dx + y) > 0.3 ? H('#f8e8a0') : H('#3a5a78')); }
  R.rect(wx + 8, 2, wx + 9, 19, H('#5a6a78')); const nx = Math.round((t * 3) % 24); R.pset(wx + nx % 17, 6, BL); R.pset(wx + nx % 17 + 1, 6, BL);
  R.rect(1, 9, 15, 9, H('#8a6a4a')); R.rect(1, 17, 15, 17, H('#8a6a4a'));
  for (let k = 0; k < 4; k++) { const c = H(['#e84a3a', '#3ac87a', '#3a8ae8', '#f8c040'][k]); R.rect(2 + k * 3, 6, 3 + k * 3, 8, c); R.rect(2 + k * 3, 14, 3 + k * 3, 16, H(['#c84ae8', '#3ac8c8', '#e8803a', '#3ac87a'][k])); }
  if (w > 60) { R.rect(20, 3, 46, 17, H('#8a6a4a')); R.rect(21, 4, 45, 16, H('#2a4a3a')); for (let k = 0; k < 3; k++) for (let x = 23; x < 43 - k * 4; x++) R.pset(x, 6 + k * 4 + Math.round(Math.sin(x * 0.8 + k) * 0.7), H('#e8f0e0')); R.pset(43, 15, H('#f8e040')); }
  const mx = Math.round(w * 0.3), mx1 = Math.round(w * 0.64); R.rect(mx, h - 15, mx1, h - 14, H('#a88a5a')); R.rect(mx, h - 13, mx1, h - 13, H('#6a4a2a')); R.rect(mx + 1, h - 12, mx + 1, h - 8, H('#5a4028')); R.rect(mx1 - 1, h - 12, mx1 - 1, h - 8, H('#5a4028'));
  for (let k = 0; k < 3; k++) { const x = mx + 3 + k * 5; R.rect(x, h - 19, x + 2, h - 16, H(['#3ac87a', '#e84a3a', '#3a8ae8'][k])); if (Math.sin(t * 5 + k) > 0.4) R.pset(x + 1, h - 20 - (Math.floor(t * 6 + k) % 3), BL); }
  if (o.fam > 0) fantasma(() => { ac(EL.sue, w - 14, h - 2, t, { dir: -1, sonrisa: true }); PIEZAS_DO.franklin(R, w - 8, h - 2); }, o.fam, w - 24, 0, w - 1, h - 1);
  return ac(EL.reed, Math.round(w * 0.46), h - 2, t, o.reed ?? {});
};
const p1 = (t) => {
  const ons = ENC.map((e, i) => (t > e ? i : -1)).filter((i) => i >= 0), o = { encuadre: 'trono', camara: 'enemigos', pantallas: ons.length ? ons : [-1] }, g = T.latveria(R, t, o), S = g.pantallas;
  if (t > ENC[0]) { T.AT.escalado(R, () => miniLab(t, 48, 33, { reed: { dir: 1, sonrisa: true, dedo: t > @4.0 && t < @4.8 } }), 48, 33, 112, 32, 2); vidrio(112, 32, 207, 97, t, 0.12);
    const u = tramo(t, ENC[0], ENC[0] + 0.25); if (u < 1) { const hh = Math.round(33 * u); R.rect(112, 32, 207, 65 - hh, K); R.rect(112, 66 + hh, 207, 97, K); R.rect(112, 65 - hh, 207, 65 - hh, BL); R.rect(112, 66 + hh, 207, 66 + hh, BL); } }
  if (t > ENC[1]) enPantalla(S[1], 1, t, () => { ac(VD.moleVD, 71, 61, t, { sonrisa: true }); }, '#f0c890', '#c88a50', 61);
  if (t > ENC[2]) enPantalla(S[2], 2, t, () => { llamas(71, 99, t, 0.8); ac(EL.johnny, 71, 99, t, { habla: Math.sin(t * 9) > 0 }); }, '#f8d080', '#e8803a', 99);
  if (t > ENC[3]) enPantalla(S[3], 3, t, () => { ac(EL.ironman, 246, 61, t, { dir: -1 }); }, '#e8c8a0', '#a85a3a', 61);
  if (t > ENC[4]) enPantalla(S[4], 4, t, () => { ac(VD.panteraVD, 246, 99, t, { dir: -1 }); }, '#c8b0e0', '#6a4a9a', 99);
  if (t > ENC[5]) { const p = S[5]; R.recorte([p.x0 + 1, p.y0 + 1, p.x1 - 1, p.y1 - 1]); R.rect(p.x0 + 1, p.y0 + 1, p.x1 - 1, p.y1 - 1, H('#200608')); for (let x = p.x0 + 1; x <= p.x1 - 1; x++) R.pset(x, Math.round(113 + Math.sin(x * 0.4 - t * 5) * 3), H('#ff4a2a')); R.recorte(null); }
  // Doom entra por la izquierda y se planta delante de la grande; mira de una pantalla a otra
  T.latveriaDelante(R, t, o);
  const v = ir(t, @0.5, @2.4, -14, 160);
  brillo(160, 176, 30, H('#a8d8ff'), 0.12 * ons.length / 6);
  ac(EL.doom, v.x, 177, t, { dir: v.anda ? 1 : (t > @3.6 && t < @4.4 ? -1 : 1), anda: v.anda, dedo: t > @4.7 });
};

// ── 2 · el pasillo del castillo y el espejo ────────────────────────────────────────────────────────────────────────────
const pasillo = () => fijo('pasillo', () => {
  silleria(0, 0, 319, 139, H('#4a4c58'), 7, 16, 3);
  // el techo de vigas y la cornisa (arriba, tranquilo)
  R.rect(0, 0, 319, 9, H('#2a2430')); for (let x = 6; x < 320; x += 38) { R.rect(x, 0, x + 8, 12, H('#3a2a22')); R.rect(x + 1, 0, x + 7, 10, H('#5a3e2a')); R.rect(x + 1, 11, x + 7, 12, H('#2a1a14')); }
  R.rect(0, 13, 319, 15, H('#5a5a66')); R.rect(0, 16, 319, 16, H('#2a2a34'));
  // el zócalo y el suelo de losas en perspectiva con la alfombra verde
  R.rect(0, 132, 319, 139, H('#3a3a46')); R.rect(0, 132, 319, 132, H('#6a6a78'));
  for (let y = 140; y < 180; y++) { const f = (y - 140) / 40, ancho = 18 + f * 26; for (let x = 0; x < 320; x++) { const col = Math.floor((x - 160) / ancho + 100), fila = Math.floor(Math.pow(f, 0.8) * 6);
    let c = mez(H('#5a5a64'), H('#7a7a84'), h2(col, fila, 2) * 0.7); if (Math.abs(((x - 160) / ancho) % 1) < 0.04 || Math.abs((Math.pow(f, 0.8) * 6) % 1) < 0.07) c = H('#3a3a44'); if (h2(x, y, 5) > 0.95) c = mez(c, K, 0.2); R.pset(x, y, c); } }
  for (let y = 140; y < 180; y++) { const f = (y - 140) / 40, w = 22 + f * 40; for (let x = Math.round(160 - w); x <= Math.round(160 + w); x++) { const borde = Math.abs(x - 160) > w - 3; R.pset(x, y, borde ? H('#c8a040') : mez(H('#1e5a2a'), H('#2e7a3e'), ((x + y) % 5) / 8)); } }
  // el estandarte verde con el aro de cuatro puntas (sin letras)
  R.rect(16, 24, 46, 26, H('#c8a040')); R.rect(18, 26, 44, 104, H('#1e5a2a')); R.rect(20, 26, 22, 104, H('#2e7a3e'));
  R.poligono([[18, 104], [31, 112], [44, 104]], H('#1e5a2a')); R.disco(31, 58, 8, H('#c8a040')); R.disco(31, 58, 5, H('#1e5a2a'));
  for (const [dx, dy] of [[0, -12], [0, 12], [-12, 0], [12, 0]]) R.linea(31, 58, 31 + dx, 58 + dy, H('#c8a040'));
  // la armadura vacía en su peana (a la derecha, bajo la esquina de Atom)
  R.rect(280, 136, 310, 146, H('#3a3a46')); R.rect(282, 134, 308, 136, H('#6a6a78'));
  R.rect(288, 98, 302, 134, H('#8a8e9c')); R.rect(289, 99, 293, 133, H('#b8bccc')); R.rect(290, 86, 300, 98, H('#9a9eac')); R.rect(292, 90, 298, 91, K); R.rect(286, 100, 288, 120, H('#6a6e7c')); R.rect(302, 100, 304, 120, H('#6a6e7c'));
  // el espejo: marco dorado con remate, el cristal y su luna
  R.rect(114, 22, 206, 142, K); R.rect(116, 24, 204, 140, H('#b8862a')); R.rect(118, 26, 202, 138, H('#e8c050')); R.rect(121, 29, 199, 135, H('#a8761a'));
  R.poligono([[116, 24], [160, 6], [204, 24]], H('#b8862a')); R.poligono([[124, 24], [160, 10], [196, 24]], H('#e8c050')); R.disco(160, 16, 4, H('#2e7a3e')); R.disco(160, 16, 2, H('#7ae88a'));
  for (let y = 30; y < 136; y += 9) { R.pset(118, y, H('#fff0a0')); R.pset(202, y, H('#7a5010')); }
  // el banco de piedra y el candelabro de pie (izquierda)
  R.rect(60, 120, 98, 132, H('#3a3a46')); R.rect(60, 118, 98, 121, H('#6a6a78')); R.rect(64, 122, 94, 130, H('#4a4a56'));
});
const ESP = [124, 33, 196, 134];
// lo que se ve en el espejo: el pasillo reflejado (más azul y oscuro) y el reflejo (Doom o, desde «The first», Reed)
const reflejo = (t, dx) => enBufer('espejo', () => {
  silleria(ESP[0], ESP[1], ESP[2], ESP[3], H('#3a4050'), 7, 16, 9);
  for (let y = 112; y <= ESP[3]; y++) for (let x = ESP[0]; x <= ESP[2]; x++) R.pset(x, y, mez(H('#4a4e5a'), H('#2a6a3a'), Math.abs(x - 160) < (y - 100) * 0.9 ? 0.6 : 0));
  brillo(ESP[0] + 8, 70, 18, H('#ff9a3a'), 0.4 + 0.1 * Math.sin(t * 9));
  const reed = t > @8.3, x = 160 + (dx - 96) * 0.35;
  if (!reed) ac(EL.doom, x, 128, t, { dir: -1, quieto: false });
  else ac(EL.reed, 160, 128, t, { dir: -1, sonrisa: true, dedo: t > @9.0 && t < @9.8 });
  if (t > @7.8 && t < @8.6) brillo(160, 90, 30, H('#a8e0ff'), 0.6 * Math.sin((t - @7.8) / 0.8 * Math.PI));
  // la luna del cristal: un brillo frío que baja en diagonal
  vidrio(ESP[0], ESP[1], ESP[2], ESP[3], t * 0.4, 0.2);
});
const p2 = (t) => {
  R.copiar(pasillo());
  for (const [x, y] of [[54, 70], [266, 70]]) { const f = Math.sin(t * 11 + x) * 0.5 + 0.5; brillo(x, y, 34, H('#ff9a3a'), 0.28 + 0.06 * f);
    R.rect(x - 2, y + 2, x + 2, y + 12, H('#3a2a22')); R.rect(x - 4, y, x + 4, y + 2, H('#6a4a2a')); R.disco(x, y - 3, 3, H('#e8601a')); R.disco(x + Math.round(Math.sin(t * 13 + x)), y - 5, 2, H('#f8c040')); R.pset(x, y - 8 - Math.round(f * 2), H('#fff0a0')); }
  const v = ir(t, @5.1, @7.0, -12, 96), atras = ir(t, @9.7, @10.3, 96, 78), x = t > @9.7 ? atras.x : v.x;
  const ola = Math.sin(Math.min(1, Math.max(0, (t - @7.8) / 0.9)) * Math.PI) * 3;
  const b = reflejo(t, x); trozo(b, ESP[0], ESP[1], ESP[2], ESP[3], ola > 0.05 ? (y) => Math.round(Math.sin(y * 0.45 + t * 14) * ola) : 0);
  brillo(160, 50, 20, H('#ffffff'), 0.08);
  ac(EL.doom, x, 156, t, { dir: 1, anda: v.anda || atras.anda, sorpresa: t > @8.3 && t < @9.6 });
  if (t > @8.3 && t < @8.9) R.icono('!', Math.round(x) - 2, 116, H('#f8e040'), K);
};

// ── 3 · la pantalla grande de cerca: Reed ──────────────────────────────────────────────────────────────────────────────
const salaCerca = () => fijo('salaCerca', () => {
  chapa(0, 0, 319, 139, H('#3a4450'), 40, 28, 4);
  R.rect(0, 0, 319, 6, H('#1e242c'));
  // el marco de la pantalla grande, con remaches y cables que cuelgan
  R.rect(30, 14, 258, 136, K); R.rect(32, 16, 256, 134, H('#5a6474')); R.rect(34, 18, 254, 132, H('#2a323e')); R.rect(36, 20, 252, 130, H('#141a22'));
  for (let x = 40; x < 252; x += 14) { R.pset(x, 17, H('#a8b0c0')); R.pset(x, 133, H('#a8b0c0')); }
  for (const x of [8, 16, 22]) for (let y = 0; y < 120; y++) R.pset(x + Math.round(Math.sin(y * 0.05 + x) * 2), y, y % 9 === 0 ? H('#1a1a1a') : H(x === 16 ? '#8a2a2a' : '#2a2a30'));
  // los manómetros de la derecha (bajo la esquina de Atom)
  for (const [x, y] of [[282, 66], [300, 96], [278, 112]]) { R.disco(x, y, 9, K); R.disco(x, y, 8, H('#c8ccd4')); R.disco(x, y, 6, H('#f4f0e6')); for (let k = 0; k < 8; k++) R.pset(Math.round(x + Math.cos(k * 0.6 + 2.6) * 5), Math.round(y + Math.sin(k * 0.6 + 2.6) * 5), K); }
  R.rect(262, 120, 318, 139, H('#2a323e')); for (let x = 266; x < 316; x += 6) R.rect(x, 124, x + 3, 136, H('#4a5464'));
  // la consola de delante
  R.rect(0, 140, 319, 179, H('#1e242c')); R.rect(0, 140, 319, 143, H('#6a7484')); R.rect(0, 144, 319, 146, H('#3a4450'));
  chapa(0, 147, 319, 179, H('#2a323e'), 52, 33, 8);
  for (let x = 10; x < 310; x += 18) { R.rect(x, 152, x + 10, 158, K); R.rect(x + 1, 153, x + 9, 157, H('#4a5464')); }
  R.rect(110, 162, 210, 176, K); R.rect(111, 163, 209, 175, H('#0e2a1a'));
});
const p3 = (t) => {
  R.copiar(salaCerca());
  // los cables y pilotos vivos
  for (let x = 10; x < 310; x += 18) { const on = Math.sin(t * 3 + x * 0.7) > 0.2; R.rect(x + 3, 154, x + 7, 156, on ? H(['#3ae87a', '#e8c03a', '#e84a3a'][(x / 18 | 0) % 3]) : H('#2a3a2a')); }
  for (let x = 112; x < 208; x++) R.pset(x, Math.round(169 + Math.sin(x * 0.3 - t * 6) * 4), H('#3ae87a'));
  for (const [x, y, k] of [[282, 66, 0], [300, 96, 1], [278, 112, 2]]) { const a = 2.4 + Math.sin(t * (1.3 + k) + k) * 0.8 + (k === 0 ? tramo(t, @15.0, @16.0) * 1.2 : 0); R.linea(x, y, Math.round(x + Math.cos(a) * 5), Math.round(y + Math.sin(a) * 5), H('#c8302a')); }
  // dentro de la pantalla: Reed saluda, habla y le tiende la mano; detrás, su familia en siluetas
  const b = enBufer('reedLab', () => {
    R.rect(0, 0, 319, 179, H('#141a22'));
    const tiende = t > @12.9 && t < @15.4;
    T.AT.escalado(R, () => miniLab(t, 107, 54, { fam: tramo(t, @14.8, @15.8) * 0.8, reed: { dir: 1, dedo: t > @11.1 && t < @12.6, sostiene: tiende ? [64, 38] : undefined, sonrisa: t > @11.3, habla: t > @11.3 && t < @12.9 ? voz(t) > 0.2 : false } }), 107, 54, 37, 21, 2);
  });
  const rasga = t > @16.1 ? Math.sin((t - @16.1) * 30) * 6 * (1 - tramo(t, @16.3, @16.8)) : 0;
  trozo(b, 37, 21, 251, 129, rasga ? (y) => ((y >> 3) % 2 ? Math.round(rasga) : -Math.round(rasga)) : 0);
  for (let y = 21; y <= 129; y += 2) for (let x = 37; x <= 251; x += 1) if ((x + y) % 2 === 0) R.pset(x, y, mez(R.pget(x, y), K, 0.08));
  vidrio(37, 21, 251, 129, t, 0.12);
  // Doom de espaldas, abajo a la derecha, ante la consola: se enfada y señala
  ac(EL.doom, 232, 172, t, { dir: -1, quieto: false, dedo: t > @15.6 && t < @16.6, enfado: t > @14.8 });
  brillo(232, 150, 26, H('#a8d8ff'), 0.18);
};

// ── 4 · el mirador de Battleworld: como en un espejo ──────────────────────────────────────────────────────────────────
const p4 = (t) => {
  const o = { encuadre: 'planeta' }; T.battleworld(R, t, o);
  const eje = tramo(t, @17.1, @17.9);
  if (eje > 0) for (let y = 128; y < 172; y++) if ((y + Math.floor(t * 8)) % 4 < 2 && y < 128 + 44 * eje) R.pset(160, y, mez(R.pget(160, y), H('#a8e8ff'), 0.7));
  const a = ir(t, @16.95, @17.9, 60, 90), b = ir(t, @16.95, @17.9, 260, 230), dedo = t > @21.2;
  ac(EL.doom, a.x, 160, t, { dir: 1, anda: a.anda, dedo, sorpresa: t > @18.1 && t < @19.2 });
  ac(EL.reed, b.x, 160, t, { dir: -1, anda: b.anda, dedo, sonrisa: true });
  if (dedo) { const u = tramo(t, @21.2, @21.5); for (const x of [a.x + 8, b.x - 8]) { R.icono('!', Math.round(x) - 2, Math.round(118 - u * 4), H('#f8e040'), K); chispasC(x, 126, t, H('#f8e040'), 6, 10); } }
  T.AT.luciernaga(R, 160 + Math.sin(t * 1.3) * 10, 108 + Math.sin(t * 2.1) * 3, t, { dir: Math.sin(t * 1.3) > 0 ? 1 : -1, brillo: 0.8, cara: t > @21.2 ? 'sorpresa' : 'normal' });
  T.battleworldDelante(R, t, o);
};

// ── 5 · el cuarto del bebé: la familia de Reed ─────────────────────────────────────────────────────────────────────────
const p5 = (t) => {
  const puerta = tramo(t, @22.2, @22.7) * (1 - tramo(t, @26.0, @26.8) * 0.5), o = { encuadre: 'cuarto', puerta }; DO.latveria(R, t, o);
  PIEZAS_DO.franklin(R, 144, 126 - (t > @23.4 && Math.sin(t * 8) > 0 ? 1 : 0));
  // Reed entra por la puerta y va hacia la cuna; Sue la mece y le sonríe
  const u = tramo(t, @22.5, @24.0), rx = lerp(27, 104, u), rs = lerp(131, 158, Math.min(1, u * 1.6));
  ac(EL.reed, rx, rs, t, { dir: 1, anda: u > 0.01 && u < 0.99, sonrisa: u > 0.6, dedo: t > @24.2 && t < @25.0 });
  ac(EL.sue, 206 + Math.round(Math.sin(t * 2.2) * 2), 158, t, { dir: -1, sonrisa: true, habla: t > @23.0 && t < @23.8 });
  // los amigos que le siguen: la Antorcha y la Mole asoman por la puerta en «friends»
  const v = tramo(t, @24.4, @25.6); if (v > 0) { ac(EL.johnny, lerp(27, 62, v), lerp(131, 150, v), t, { dir: 1, anda: v < 1, sonrisa: true }); }
  const w = tramo(t, @24.8, @26.2); if (w > 0) ac(VD.moleVD, lerp(24, 40, w), lerp(131, 140, w), t, { dir: 1, anda: w < 1, sonrisa: true });
  DO.latveriaDelante(R, t, o);
  const c = tramo(t, @25.9, @26.3); if (c > 0) corazon(141, Math.round(92 - c * 6 + Math.sin(t * 3)), H('#e8304a'), 2);
};

// ── 6 · el laboratorio: el error, el perdón y seguir ───────────────────────────────────────────────────────────────────
const p6 = (t) => {
  const o = { encuadre: 'laboratorio', relojes: [1961, 1962, 1963] }; DO.lago(R, t, o);
  const err = @28.85, sigue = ir(t, @30.7, @31.6, 70, 112);
  const r = ac(EL.reed, t > @30.7 ? sigue.x : 70, 146, t, { dir: t > @29.9 ? 1 : 1, anda: sigue.anda, sorpresa: t > err && t < err + 0.9, triste: t > @29.8 && t < @30.6, sonrisa: t > @30.6,
    sostiene: t < @30.6 ? [84, 126] : undefined });
  if (t < @30.6) { const [mx, my] = r.mano; const lleno = t < err ? H('#3ae87a') : H('#6a6a5a'); R.rect(mx - 2, my - 7, mx + 2, my, K); R.rect(mx - 1, my - 4, mx + 1, my - 1, lleno); R.rect(mx - 1, my - 6, mx + 1, my - 5, H('#c8e8f0'));
    if (t < err) for (let k = 0; k < 3; k++) { const f = (t * 2 + k / 3) % 1; R.pset(mx + Math.round(Math.sin(k + t * 5)), my - 8 - Math.round(f * 6), H('#a8f8c8')); } }
  humo(84, 116, tramo(t, err, err + 1.4), H('#4a4a50'));
  if (t > err && t < err + 0.25) brillo(84, 120, 18, H('#fff0a0'), 0.7);
  if (t > err && t < @30.6) { R.pset(r.cabeza[0] - 2, r.cabeza[1] + 6, K); R.pset(r.cabeza[0] + 3, r.cabeza[1] + 4, K); }
  // Sue, en los ordenadores, se vuelve y le perdona
  ac(EL.sue, 262, 146, t, { dir: -1, sorpresa: t > err + 0.1 && t < err + 0.8, sonrisa: t > @30.3, habla: t > @29.8 && t < @30.4 });
  if (t > @30.1 && t < @31.2) corazon(250, 104, H('#e8304a'), 1);
  DO.lagoDelante(R, t, o);
};

// ── 7 · la azotea: cada vez que pierde ─────────────────────────────────────────────────────────────────────────────────
const robotito = (x, suelo, t, roto) => { x = Math.round(x); const p = Math.floor(t * 6) % 2;
  if (roto <= 0) { R.rect(x - 6, suelo - 20, x + 6, suelo - 6, K); R.rect(x - 5, suelo - 19, x + 5, suelo - 7, H('#7a7e8c')); R.rect(x - 4, suelo - 18, x + 4, suelo - 13, H('#9aa0ae')); R.rect(x - 3, suelo - 16, x - 2, suelo - 15, H('#3ae87a')); R.rect(x + 2, suelo - 16, x + 3, suelo - 15, H('#3ae87a'));
    R.rect(x - 4, suelo - 6, x - 2, suelo - p, K); R.rect(x + 2, suelo - 6, x + 4, suelo - 1 + p, K); R.rect(x - 7, suelo - 24, x + 7, suelo - 21, H('#1e5a2a')); R.pset(x, suelo - 26, H('#e8c040')); return; }
  const u = Math.min(1, roto); [[-5, -14, -12, -6], [4, -16, 10, -9], [0, -22, 2, -30], [-2, -6, -8, 0], [3, -6, 9, 0]].forEach(([a, b, c, d], k) => { const xx = x + a + (c - a) * u * 1.6, yy = suelo + b + (d - b) * u + Math.sin(u * Math.PI) * -10 * (k % 2 + 0.5);
    R.rect(Math.round(xx) - 2, Math.min(suelo - 2, Math.round(yy)) - 2, Math.round(xx) + 2, Math.min(suelo - 2, Math.round(yy)) + 1, K); R.rect(Math.round(xx) - 1, Math.min(suelo - 2, Math.round(yy)) - 1, Math.round(xx) + 1, Math.min(suelo - 2, Math.round(yy)), H(k === 2 ? '#1e5a2a' : '#8a8e9c')); }); };
const p7 = (t) => {
  const o = { encuadre: 'cielo' }; DO.sesenta(R, t, o);
  // las derrotas, en X rojas que salen una a una en el cielo («every time»)
  for (let k = 0; k < 6; k++) { const t0 = @32.4 + k * 0.45; if (t > t0) R.icono('X', 60 + k * 16, 52 + (k % 2) * 3, H('#e8302a'), H('#5a1410'), 2); }
  const anda = ir(t, @31.7, @33.4, 120, 186), roto = tramo(t, @33.5, @34.3);
  robotito(anda.x, 166, t, t > @33.5 ? 0.2 + roto : 0);
  ac(EL.reed, 214, 166, t, { dir: -1, dedo: t > @33.3 && t < @33.8, sonrisa: t > @34.0 });
  const pat = t > @34.3 && t < @35.6;
  ac(EL.doom, 82, 166, t, { dir: 1, enfado: t > @33.5, salto: pat && Math.sin(t * 16) > 0 ? 2 : 0, dedo: t > @35.6 });
  if (t > @33.5 && t < @33.8) brillo(190, 150, 16, H('#fff0a0'), 0.6);
  if (pat) for (let k = 0; k < 3; k++) R.pset(78 + k * 4, 168 + (Math.floor(t * 16) + k) % 2, H('#b8a890'));
};

// ── 8 · Nueva York nevada: la ventana de una familia ───────────────────────────────────────────────────────────────────
const p8 = (t) => {
  const o = { encuadre: 'nieve' }; DO.multiverso(R, t, o);
  // la ventana cálida de la familia (dentro de la fachada): la madre alza al niño y el padre los abraza
  const [x0, y0, x1, y1] = [192, 90, 232, 120]; R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 3, K); R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 2, H('#8a5a3a')); R.rect(x0 - 1, y1 + 1, x1 + 1, y1 + 2, H('#e8ecf4'));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(H('#f8d890'), H('#e8a050'), (y - y0) / (y1 - y0) * 0.7 + bay(x, y) * 0.2));
  R.rect(x0 + 2, y0 + 2, x0 + 6, y0 + 6, H('#c86a3a')); R.rect(x1 - 6, y0 + 1, x1 - 3, y0 + 8, H('#3a8a4a'));
  const alza = tramo(t, @37.0, @37.6), abraza = tramo(t, @37.4, @38.0), sil = H('#5a3a2a');
  R.disco(206, y1 - 15, 4, sil); R.rect(202, y1 - 11, 210, y1, sil); R.disco(Math.round(lerp(222, 215, abraza)), y1 - 17, 4, sil); R.rect(Math.round(lerp(218, 211, abraza)), y1 - 13, Math.round(lerp(226, 219, abraza)), y1, sil);
  R.disco(206, Math.round(y1 - 15 - alza * 7) - 6, 3, sil); R.rect(203, Math.round(y1 - 15 - alza * 7) - 3, 209, Math.round(y1 - 15 - alza * 7) + 2, sil);
  R.rect(x0 + 20, y0, x0 + 20, y1, H('#6a4028')); R.rect(x0, y0 + 14, x1, y0 + 14, H('#6a4028'));
  if (abraza > 0.5) corazon(206, y0 - 12 - Math.round(Math.sin(t * 3)), H('#e8304a'), 2);
  brillo(212, 105, 40, H('#f8c070'), 0.22); brillo(212, 150, 34, H('#f8c070'), 0.2);
  // Doom, bajo la farola, mira la ventana; en «never had» se da la vuelta y se va
  const va = ir(t, @38.2, @40.0, 150, 96);
  ac(EL.doom, t > @38.2 ? va.x : 150, 156, t, { dir: t > @38.2 ? -1 : 1, anda: va.anda });
  DO.multiversoDelante(R, t, o);
};
''' + _ENEM2))

E['vd-espejos'] = ('Fíjate: los espejos', '''// VD-ESPEJOS (frase 27), LA PAUSA «fíjate» de la comparación con los cercanos (Tesser, 1988). Congela el último plano
// de vd-enemigos (la sala con la pantalla roja) en gris azulado. Siete planos de 4,6–6,7 s, cortados en la palabra inglesa:
// 1 «And notice this» la sala congelada: Atom al doble entra, señala las pantallas (la órbita las rodea) y en «not
//   others» saca a color dos micrófonos;
// 2 «In 1988» la consulta: Atom se tumba en el diván; sale la ficha «1988»; el psicólogo (Tesser) le cuenta la idea: en
//   su bocadillo, dos monigotes juntos y un corazón que se agrieta en «felt»;
// 3 «what hurts most» la pantalla del Pong de cerca: gana un desconocido («?»); Atom luciérnaga se encoge de hombros;
// 4 «being outdone by someone close» el bar: dos amigos juegan al Pong; gana ella en «the thing we care about most» y
//   a él se le parte el corazón;
// 5 «If a stranger sings better» el escenario: canta un desconocido; Atom aplaude y sonríe («doesn't matter»);
// 6 «But if it's your classmate» el atril con micrófonos: canta su compañero; Atom se sorprende, se pone triste y en
//   «wound» le sale la nube gris con lluvia;
// 7 «Doom's enemies are all like that» la sala congelada otra vez: salen a color tres cartas (el genio, el rey y el
//   hechicero) y en «beat him» la nube sobre Doom; vuelve el color.''', _t('vd-espejos', _IMPORTS + _UTIL + _SALA + r'''
const P2 = @6.1, P3 = @12.4, P4 = @17.0, P5 = @23.3, P6 = @27.8, P7 = @33.8;
// la sala de vd-enemigos en su último instante (183,70 s), con sus instantes escritos en segundos
const TTF = { ini: 177.0, roja: 177.1, str: 177.5, gira: 181.1 }, FZ = 183.70;
const congelado = () => fijo('congelado', () => salaFinal(FZ, TTF));
const pop = (t, t0) => { const u = tramo(t, t0, t0 + 0.25); return u <= 0 ? 0 : 1; };
// un micrófono (7 × 14): rejilla, aro de color y mango
const micro = (aro) => () => { R.disco(3, 3, 3, K); R.disco(3, 3, 2, H('#c8ccd4')); R.pset(2, 2, BL); R.pset(4, 4, H('#8a8e9a')); R.rect(1, 6, 5, 7, K); R.rect(2, 6, 4, 7, H(aro)); R.rect(2, 8, 4, 13, K); R.rect(3, 8, 3, 12, H('#4a4a54')); };
// una carta con un personaje (22 × 30): marco de color y fondo claro
const carta = (d, marco, fondo, o = {}) => (t) => () => { R.rect(0, 0, 21, 29, K); R.rect(1, 1, 20, 28, H(marco)); R.rect(2, 2, 19, 27, H(fondo)); R.rect(2, 22, 19, 27, mez(H(fondo), K, 0.15)); if (o.antes) o.antes(t); ac(d, 11, 27, t, { sonrisa: true, ...(o.a ?? {}) }); };
const notas = (x, y, t, n = 3) => { for (let k = 0; k < n; k++) { const f = (t * 0.7 + k / n) % 1, xx = Math.round(x + k * 6 + Math.sin(t * 3 + k) * 3), yy = Math.round(y - f * 26); if (f > 0.85) continue;
  R.rect(xx, yy, xx + 1, yy + 1, H('#f8e060')); R.rect(xx + 1, yy - 5, xx + 1, yy, H('#f8e060')); R.pset(xx + 2, yy - 5, H('#f8e060')); R.pset(xx + 3, yy - 4, H('#f8e060')); } };

// ── 1 · la sala congelada: los dos micrófonos ──────────────────────────────────────────────────────────────────────────
const f1 = (t) => {
  R.copiar(congelado()); pausa(t, 0, P2 - 0.05);
  const anda = tramo(t, @0.2, @1.0), x = lerp(344, 236, anda), senala = t > @1.3 && t < @3.4, saca = t > @4.2;
  T.AT.atom(R, x, 176, t, { s: 2, dir: -1, pose: anda < 1 ? 'camina' : saca ? 'brazos' : senala ? 'senala' : 'quieto', cara: t > @4.4 ? 'sonrisa' : senala ? 'guino' : 'normal', habla: voz(t) });
  const u = tramo(t, @2.2, @3.0); if (u > 0 && t < @4.4) T.AT.anillo(R, 160, 66, 58, 42, t, u);
  // los dos micrófonos salen a color a los lados de Atom: el dorado (el desconocido) y el azul (el compañero)
  if (saca) { const v = tramo(t, @4.2, @4.6); [[194, '#e8c040', 0], [266, '#3a8ae8', 0.1]].forEach(([mx, c, d]) => { const y = 108 + Math.round((1 - v) * 14) + Math.round(Math.sin(t * 2.2 + mx) * 1.5);
    T.AT.escalado(R, micro(c), 7, 14, mx - 7, y, 2); if (t < @5.6) T.AT.anillo(R, mx, y + 14, 14, 18, t, tramo(t, @4.4 + d, @4.9 + d)); }); }
};

// ── 2 · la consulta (1988): el psicólogo y la idea ─────────────────────────────────────────────────────────────────────
const tiza = H('#3a3a46'), tizaR = H('#e8304a');
const muneco = (x, y, c = tiza) => { for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(Math.round(x + Math.cos(a) * 3), Math.round(y + Math.sin(a) * 3), c); }
  R.linea(x, y + 4, x, y + 11, c); R.linea(x, y + 6, x - 4, y + 9, c); R.linea(x, y + 6, x + 4, y + 9, c); R.linea(x, y + 11, x - 3, y + 16, c); R.linea(x, y + 11, x + 3, y + 16, c); };
const f2 = (t) => {
  const o = { encuadre: 'consulta' }; const g = T.estudio(R, t, o);
  // Atom, el paciente, en el diván; el psicólogo detrás del escritorio escribe y le cuenta la idea
  const ab = ir(t, P2, P2 + 0.9, 140, 74);
  T.AT.atom(R, ab.x, ab.u < 1 ? 160 : 126, t, { dir: 1, pose: ab.anda ? 'camina' : t > @11.6 ? 'piensa' : 'quieto', cara: t > @11.6 ? 'triste' : t > @9.0 ? 'sorpresa' : 'normal' });
  const r = ac(EL.cientifico, 252, g.detras ?? 134, t, { dir: -1, habla: t > @8.0 && t < @12.2 ? voz(t) > 0.2 : false, dedo: t > @10.4 && t < @11.4 });
  T.estudioDelante(R, t, o);
  // la ficha del año, en «1988»
  const u = tramo(t, @6.7, @7.0); if (u > 0) { const y = 40 + Math.round((1 - u) * 8); R.rect(204, y, 242, y + 18, K); R.rect(205, y + 1, 241, y + 17, H('#f4f0e6')); R.rect(205, y + 1, 241, y + 4, H('#c8302a')); R.numero('1988', 223, y + 15, { tam: 8, centro: true }); }
  if (t > @9.0 && t < @10.3) T.AT.anillo(R, 252, 112, 14, 18, t, tramo(t, @9.0, @9.5));
  // el bocadillo de la idea: dos monigotes juntos y el corazón que se agrieta
  const b = tramo(t, @10.3, @10.7); if (b > 0) { const bx = 130, by = 26, w = Math.round(64 * b), h = Math.round(40 * b);
    R.rect(bx - 1, by - 1, bx + w + 1, by + h + 1, K); R.rect(bx, by, bx + w, by + h, BL); for (let k = 0; k < 3; k++) R.disco(bx + w + 6 + k * 8, by + h + 4 + k * 6, 2 - (k > 1 ? 1 : 0), BL);
    if (b >= 1) { muneco(bx + 14, by + 12); muneco(bx + 50, by + 12); corazon(bx + 29, by + 14, tizaR, 1);
      if (t > @11.6) { R.linea(bx + 32, by + 14, bx + 31, by + 16, K); R.linea(bx + 31, by + 16, bx + 33, by + 18, K); } } }
};

// ── 3 · la pantalla del Pong: te gana cualquiera ───────────────────────────────────────────────────────────────────────
const f3 = (t) => {
  const o = { encuadre: 'bar72', camara: 'pantalla' }; AA.atari(R, t, o);
  const q = tramo(t, @14.6, @14.9); if (q > 0) { R.icono('?', 232, 34 + Math.round((1 - q) * 6), H('#f8f4ec'), K, 2); }
  const x = lerp(-10, 92, tramo(t, P3, P3 + 1.2));
  T.AT.luciernaga(R, x + Math.sin(t * 2) * 3, 140 + Math.sin(t * 2.6) * 3, t, { dir: 1, brillo: 0.9, cara: t > @15.3 ? 'sonrisa' : 'normal' });
  if (t > @15.3 && t < @16.4) for (const d of [-1, 1]) R.icono('?', Math.round(x + d * 12) - 3, 118, H('#a8d8ff'), K);
  AA.atariDelante(R, t, o);
};

// ── 4 · el bar: te gana alguien cercano, en lo tuyo ────────────────────────────────────────────────────────────────────
const f4 = (t) => {
  const o = { encuadre: 'bar72' }; AA.atari(R, t, o); const s = 152;
  const gana = t > @20.4, dur = t > @20.8;
  ac(EL.senor30, 200, 140, t, { dir: -1, sostiene: true });
  ac(EL.chico, 78, s, t, { dir: 1, dedo: !dur && Math.sin(t * 6) > 0, triste: dur, sorpresa: t > @20.4 && t < @20.8 });
  ac(EL.chica, 140, s, t, { dir: -1, dedo: !gana && Math.sin(t * 6 + 1) > 0, brazos: gana, salto: gana && Math.sin(t * 14) > 0 ? 2 : 0, sonrisa: true });
  if (t > @17.6 && t < @19.4) corazon(105, 112 - Math.round(Math.sin(t * 3)), H('#e8304a'), 1);
  if (dur) { const u = tramo(t, @21.4, @21.8); corazon(72, 100, H('#8a8a96'), 2); if (u > 0) { R.linea(78, 100, 76, 104, K); R.linea(76, 104, 79, 107, K); R.linea(79, 107, 77, 111, K); } }
  AA.atariDelante(R, t, o);
};

// ── 5 · el escenario: canta un desconocido ─────────────────────────────────────────────────────────────────────────────
const pie = (x, s) => { R.linea(x, s, x, s - 22, H('#2a2a30')); R.linea(x - 4, s, x + 4, s, H('#2a2a30')); R.linea(x, s - 22, x - 4, s - 26, H('#2a2a30')); R.disco(x - 5, s - 27, 2, H('#c8ccd4')); };
const f5 = (t) => {
  const o = { encuadre: 'auditorio', camara: 'pantalla' }; DO.escenario(R, t, o); const s = 146;
  pie(156, s);
  ac(EL.senor30, 146, s, t, { dir: 1, habla: Math.sin(t * 9) > -0.3, brazos: t > @26.0 && t < @26.8, sonrisa: true });
  notas(150, 112, t);
  const a = ir(t, P5, P5 + 1.0, 250, 214);
  T.AT.atom(R, a.x, s, t, { dir: -1, pose: a.anda ? 'camina' : t > @25.0 && t < @27.0 ? 'brazos' : 'saluda', cara: t > @24.0 ? 'sonrisa' : 'normal' });
  if (t > @27.1 && t < @27.8) for (let k = 0; k < 4; k++) R.pset(206 + k * 4, 112 - (Math.floor(t * 8) + k) % 3, H('#f8e060'));
  DO.escenarioDelante(R, t, o);
};

// ── 6 · el atril: canta tu compañero ───────────────────────────────────────────────────────────────────────────────────
const f6 = (t) => {
  const o = { encuadre: 'ordenador', camara: 'globo' }; AK.hoy(R, t, o); const s = 162;
  // el compañero canta delante de la pizarra con el micrófono en la mano; dos compañeros le aplauden
  const r = ac(EL.estudiante, 124, s, t, { dir: -1, sostiene: [112, 136], habla: Math.sin(t * 9) > -0.3, sonrisa: true });
  { const [mx, my] = r.mano; R.disco(mx + 1, my - 4, 2, K); R.disco(mx + 1, my - 4, 1, H('#c8ccd4')); R.rect(mx, my - 2, mx + 1, my + 2, K); }
  notas(104, 110, t, 4);
  ac(EL.chica, 88, s, t, { dir: 1, sonrisa: true, brazos: Math.sin(t * 7) > 0.3 });
  const triste = t > @30.2, nube = tramo(t, @31.7, @32.0);
  T.AT.atom(R, 166, s, t, { dir: -1, pose: triste ? 'quieto' : 'saluda', cara: t > @28.8 && t < @30.2 ? 'sorpresa' : triste ? 'triste' : 'sonrisa' });
  if (nube > 0) { nubeGris(158, Math.round(106 - (1 - nube) * 6), t, 1, true); if (t < @32.2) brillo(166, 110, 22, H('#ffffff'), 0.5); }
  AK.hoyDelante(R, t, o);
};

// ── 7 · la sala congelada otra vez: genios, reyes y hechiceros ─────────────────────────────────────────────────────────
const CARTAS = [[@34.9, carta(EL.reed, '#3a6ac8', '#dcecf8'), 14], [@35.7, carta(VD.panteraVD, '#e8c040', '#efe2f8'), 64], [@36.1, carta(EL.strange, '#c8302a', '#f8e4d8'), 114]];
const f7 = (t) => {
  R.copiar(congelado()); pausa(t, P7 - 0.05, E.duracion);
  CARTAS.forEach(([t0, c, x]) => { const u = tramo(t, t0, t0 + 0.3); if (u <= 0) return; const y = 40 + Math.round((1 - u) * 20) + Math.round(Math.sin(t * 2 + x) * 1.5);
    T.AT.escalado(R, c(t), 22, 30, x, y, 2); if (t < t0 + 1.2) T.AT.anillo(R, x + 22, y + 30, 28, 36, t, tramo(t, t0 + 0.1, t0 + 0.6)); });
  const r = T.AT.atom(R, 262, 176, t, { s: 2, dir: -1, pose: t < @34.8 ? 'quieto' : t < @36.6 ? 'senala' : 'brazos', cara: t > @37.6 ? 'triste' : 'normal', habla: voz(t) });
  const n = tramo(t, @37.6, @38.0); if (n > 0) nubeGris(112, Math.round(128 - (1 - n) * 6), t, 1, true);
};

const efectos = [[0.05, 'tapestop'], [@2.2, 'brillo'], [@4.3, 'pop'], [@6.7, 'pop'], [@8.2, 'tecleo'], [@10.35, 'pop'], [@11.6, 'golpecito'], [@12.6, 'bip'], [@14.6, 'pop'], [@17.3, 'bip'],
  [@20.4, 'palmada'], [@21.4, 'golpecito'], [@23.5, 'publico', { dur: 2.5 }], [@27.2, 'palmada'], [@28.9, 'palmada'], [@31.75, 'trueno'], [@33.85, 'tapestop'],
  [@34.9, 'pop'], [@35.7, 'pop'], [@36.1, 'pop'], [@37.65, 'lluvia', { dur: 1.5 }], [E.duracion - 0.3, 'interruptor']];
T.rodar(E, R, [[0, f1], [P2, f2], [P3, f3], [P4, f4], [P5, f5], [P6, f6], [P7, f7]], { efectos, año: (t) => (t >= P2 && t < P7 ? 1988 : null) });
'''))
