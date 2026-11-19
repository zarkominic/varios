E = {}

# piezas comunes de las tres escenas (van al principio de cada cuerpo)
COMUN = r'''
import * as DO from '/atomo/plato/escenas/do-comun.js';
const K = hex('#141018'), BL = hex('#f4f0e6'), AMA = hex('#ffe070'), AMAL = hex('#fff6c8'), VERDE = hex('#5aff7a'), MANGA = '#3a4a8a';
const H = (s) => hex(s), HS = (...a) => a.map(hex);
const mez = (c1, c2, a) => { a = Math.max(0, Math.min(1, a)); const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const azar = (a, b = 0, c = 0) => { const s = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453; return s - Math.floor(s); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], b4 = (x, y) => B4[((y & 3) << 2) | (x & 3)] / 16;
// color de una rampa con trama ordenada (v de 0 a n−1)
const rampa = (cs, v, x, y) => { const n = cs.length - 1; v = Math.max(0, Math.min(n, v)); const i = Math.floor(v); return cs[Math.min(n, i + (v - i > b4(x, y) ? 1 : 0))]; };
const pinta = (x0, y0, x1, y1, f) => { x0 = Math.max(0, Math.round(x0)); y0 = Math.max(0, Math.round(y0)); x1 = Math.min(319, Math.round(x1)); y1 = Math.min(179, Math.round(y1));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = f(x, y); if (c != null) R.pset(x, y, c); } };
const caja = (x0, y0, x1, y1, c, b = K) => { R.rect(x0, y0, x1, y1, b); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
const velo = (x0, y0, x1, y1, col, a) => pinta(x0, y0, x1, y1, (x, y) => mez(R.pget(x, y), col, a));
// la barra del año (y sus cifras) y la esquina de Atom: ahí, poco contraste
const calma = (x, y) => (x >= 18 && x <= 172 && y <= 15) || (x >= 18 && x <= 48 && y <= 21) || (x >= 276 && y <= 46);
const FIJ = {};
const fijo = (clave, dib) => { if (!FIJ[clave]) { const b = R.nuevo(), prev = R.usar(b); R.recorte(null); dib(); R.recorte(null); R.usar(prev); FIJ[clave] = b; } return FIJ[clave]; };
const inter = (a, b) => (b ? [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3])] : a);
// la imagen única que forman los once pósters: la ciudad en ruinas del decorado, fija (es papel impreso)
const CIU = () => fijo('ciu', () => { const o = { encuadre: 'campo', doom: 1 }; T.batalla(R, 6.3, o); T.batallaDelante(R, 6.3, o); });
// el centro de cada uno de los once marcos de la pared (B_MARCOS): diez de 28 px y el de Doom, el sexto, de 24
const CX = (k) => (k < 5 ? 16.5 + 29 * k : k === 5 ? 159.5 : 186.5 + 29 * (k - 6));
// copia escalada de la ciudad (ventana de alto sh desde sy0, centrada en cx) en [x0, y0, x1, y1]
const trozo = (cx, sy0, sh, x0, y0, x1, y1, o = {}) => {
  const C = CIU(), w = x1 - x0 + 1, hh = y1 - y0 + 1, sw = o.sw ?? sh * w / hh, sx0 = Math.max(0, Math.min(320 - sw, cx - sw / 2)), luz = o.luz ?? 0;
  for (let j = 0; j < hh; j++) { const sy = Math.min(179, Math.max(0, Math.floor(sy0 + j * sh / hh)));
    for (let i = 0; i < w; i++) { const sx = Math.min(319, Math.floor(sx0 + i * sw / w)); let c = C[sy * 320 + sx];
      if (luz > 0) c = mez(c, AMAL, luz); else if (luz < 0) c = mez(c, K, -luz);
      if (o.bajo !== false && j > hh * 0.72 && b4(x0 + i, y0 + j) < (j / hh - 0.72) * 2) c = mez(c, K, 0.35);
      R.pset(x0 + i, y0 + j, c); } }
  return { sx0, sw, sh, sy0, w, hh };
};
// un personaje del reparto a escala s (1 o 2), recortado a clip; (xl, gy): borde izquierdo y suelo como en R.actor
const BUFA = R.nuevo();
const escalado = (def, xl, gy, s, t, o = {}, clip = null, tinte = null) => {
  R.recorte(null); const prev = R.usar(BUFA); BUFA.fill(0); const r = R.actor(def, 20, 44, t, o); R.usar(prev); R.recorte(clip);
  const x0 = xl - 12 * s, y0 = gy - 40 * s;
  for (let j = 0; j < 48; j++) for (let i = 2; i < 50; i++) { const c0 = BUFA[j * 320 + i]; if (!c0) continue;
    for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) { const px = x0 + (i - 8) * s + a, py = y0 + (j - 4) * s + b, c = tinte ? tinte(c0, px, py) : c0; if (c) R.pset(px, py, c); } }
  R.recorte(null);
  return { mano: [x0 + (r.mano[0] - 8) * s, y0 + (r.mano[1] - 4) * s], cabeza: [x0 + (r.cabeza[0] - 8) * s, y0 + (r.cabeza[1] - 4) * s] };
};
// Rondador Nocturno mayor (Doomsday): pelo blanco, abrigo largo oscuro, la cola y dos espadas a la espalda
const RM = Object.assign({}, EL.rondador, { cuerpo: EL.gambito.cuerpo, ceja: H('#c8ccd8'), detras: (c) => { EL.rondador.detras(c); EL.deadpool.detras(c); },
  pal: { ...EL.rondador.pal, H: H('#eef0f6'), h: H('#aeb4c6'), C: H('#2c2634'), c: H('#1a1620'), W: H('#7a1a26'), G: EL.rondador.pal.S, I: H('#5a4630'), F: H('#2a2430'), n: H('#141018'), J: H('#4a3424'), j: H('#4c4660'), Z: H('#e8ecf4') } });
for (const k of ['altoCuerpo', 'brazoCol', 'brazoFilas', 'dxCuerpo']) if (EL.gambito[k] !== undefined) RM[k] = EL.gambito[k];
// las dos espadas de Rondador mayor, cruzadas a la espalda: se pintan ANTES que él (xl, gy y s como en escalado)
const espadas = (xl, gy, s, dir = 1) => { const pts = [];
  for (const [a, b, c, d] of [[3, 13, -5, 31], [12, 13, 20, 31]]) { const x0 = xl + (dir > 0 ? a : 15 - a) * s, y0 = gy - b * s, x1 = xl + (dir > 0 ? c : 15 - c) * s, y1 = gy - d * s;
    for (let k = -1; k <= s; k++) R.linea(x0 + k, y0, x1 + k, y1, k === -1 || k === s ? K : k === 0 ? H('#f4f6fa') : H('#b8bcc8'));
    R.rect(x1 - s, y1 - s, x1 + s, y1, H('#4a3424')); pts.push([x1, y1]); }
  return pts; };
// las once parejas, en el orden de los marcos (el del gancho): la sexta es Doom solo
const PAR = [[EL.thor, EL.steve], [EL.sam, EL.ciclope], [EL.magneto, EL.shuri], [EL.xavier, EL.reed], [EL.loki, EL.mistica], [EL.doom],
  [EL.bucky, EL.shangchi], [EL.antman, EL.guardian], [EL.sue, EL.namor], [EL.gambito, EL.yelena], [RM, EL.mbaku]];
// el póster k en [x0, y0, x1, y1] con su borde blanco: el trozo k de la ciudad y la pareja a escala s. o.luz (−1–1);
// o.op [opA, opB]: opciones de cada actor; o.pers false: sin gente; o.sombra false; o.clip: recorte extra; o.tinte
// devuelve las manos y cabezas de los dos (para pintar lo que sostienen)
const poster = (k, x0, y0, x1, y1, t, o = {}) => {
  const cl = o.clip, den = (x, y) => !cl || (x >= cl[0] && x <= cl[2] && y >= cl[1] && y <= cl[3]);
  if (o.sombra !== false) pinta(x0 + 2, y0 + 2, x1 + 2, y1 + 2, (x, y) => (x > x1 || y > y1) && den(x, y) ? mez(R.pget(x, y), K, 0.45) : null);
  const bc = o.borde ?? BL, bs = mez(bc, K, 0.22);
  pinta(x0, y0, x1, y1, (x, y) => den(x, y) && (x <= x0 + 1 || x >= x1 - 1 || y <= y0 + 1 || y >= y1 - 1) ? (x === x1 || y === y1 ? bs : bc) : null);
  const clip = inter([x0 + 2, y0 + 2, x1 - 2, y1 - 2], cl), [ix0, iy0, ix1, iy1] = [x0 + 2, y0 + 2, x1 - 2, y1 - 2];
  R.recorte(clip); trozo(CX(k), 34, 124, ix0, iy0, ix1, iy1, { luz: o.luz ?? 0 }); R.recorte(null);
  const res = [];
  if (o.pers !== false) { const ds = PAR[k], s = o.s ?? 1, cx = (ix0 + ix1) / 2, gy = iy1 - 2 * s;
    ds.forEach((d, i) => { const si = (o.ss && o.ss[i]) || s, xl = ds.length === 1 ? cx - 7.5 * s : i ? cx - 2 * s : cx - 13 * s, xi = Math.round(xl + (15 * s - 15 * si) / 2), gi = Math.round(gy + ((o.dy && o.dy[i]) || 0));
      if (o.pre) o.pre(i, xi, gi, si);
      res.push(escalado(d, xi, gi, si, t, { dir: ds.length === 1 ? 1 : i ? -1 : 1, ...((o.op && o.op[i]) || {}) }, clip, (o.tintes && o.tintes[i]) || o.tinte)); }); }
  return res;
};
// una franja de luz que cruza el rectángulo en diagonal (u 0–1)
const barre = (x0, y0, x1, y1, u, a = 0.55) => { if (u <= 0 || u >= 1) return; const p = -12 + u * (x1 - x0 + (y1 - y0) * 0.5 + 24);
  pinta(x0, y0, x1, y1, (x, y) => { const d = Math.abs((x - x0) + (y - y0) * 0.5 - p); return d < 5 ? mez(R.pget(x, y), AMAL, a * (1 - d / 5)) : null; }); };
// el contorno que parpadea alrededor de un póster
const contorno = (x0, y0, x1, y1, t, col = AMA) => { const c = Math.floor(t * 8) % 2 ? col : AMAL;
  for (let x = x0 - 1; x <= x1 + 1; x++) { R.pset(x, y0 - 1, c); R.pset(x, y1 + 1, c); } for (let y = y0; y <= y1; y++) { R.pset(x0 - 1, y, c); R.pset(x1 + 1, y, c); } };
// una nube de humo que se abre y se deshace (u 0–1)
const humo = (cx, cy, u, c1, c2, n = 9, R0 = 14) => { if (u <= 0 || u >= 1) return;
  for (let i = 0; i < n; i++) { const a = i * 2.4 + 0.3, x = cx + Math.cos(a) * u * R0 * (0.5 + azar(i, 2)), y = cy + Math.sin(a) * u * R0 * 0.7 * (0.5 + azar(i, 3)) - u * 6, rr = (1 - u * 0.5) * (4 + azar(i, 4) * 5);
    pinta(x - rr, y - rr, x + rr, y + rr, (px, py) => { const d = Math.hypot(px - x, py - y) / rr; return d < 1 && b4(px, py) < (1 - u) * 1.4 - d * 0.4 ? (d < 0.55 ? c2 : c1) : null; }); } };
const chispa = (x, y, t, c = AMAL) => { x = Math.round(x); y = Math.round(y); R.pset(x, y, c); if (Math.floor(t * 12) % 2) { R.pset(x - 1, y, c); R.pset(x + 1, y, c); R.pset(x, y - 1, c); R.pset(x, y + 1, c); } else { R.pset(x - 2, y, c); R.pset(x + 2, y, c); R.pset(x, y - 2, c); R.pset(x, y + 2, c); } };
// una estrella de cinco puntas de 7 px
const ESTRELLA = ['...#...', '..###..', '#######', '.#####.', '..###..', '.##.##.', '##...##'];
const estrella = (x, y, c, s = 1) => ESTRELLA.forEach((f, j) => { for (let i = 0; i < 7; i++) if (f[i] === '#') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); });
// el escudo redondo de Steve (r 3 o más)
const escudo = (x, y, r = 3) => { R.disco(x, y, r + 1, K); R.disco(x, y, r, H('#c8303a')); R.disco(x, y, r - 1, H('#f2eee2')); if (r > 3) R.disco(x, y, r - 2, H('#c8303a')); R.disco(x, y, Math.max(1, r - 3), H('#2a4fa8')); R.pset(x, y, H('#f2eee2')); };
// insignia redonda con una cifra (el «1» del primer Capitán, el «4» de los 4 Fantásticos)
const insignia = (x, y, txt, col, u) => { if (u <= 0) return; const r = Math.round(9 * Math.min(1, u * 1.4) - Math.max(0, u * 1.4 - 1) * 4); R.disco(x + 1, y + 2, r, K); R.disco(x, y, r, K); R.disco(x, y, r - 1, col); R.anillo(x, y, r - 3, mez(col, AMAL, 0.4)); if (u > 0.5) R.numero(txt, x + 1, y + 5, { centro: true, color: AMAL }); };
'''

E['dd-posters'] = ('Once pósters', '''// DD-POSTERS (frases 14–15), 2026. Ocho planos, cortados en la palabra:
// 1. «November 18»: en el cuarto del fan, el corcho del mapa con dos hojas de calendario (18 → 18, la flecha de un mes,
//    la estrella del estreno); en «eleven posters» se clavan las once miniaturas y sale el «11»; el fan, con el móvil, salta.
// 2. «Ten pair up» (marcos, 2.º uso): los once llegan uno a uno a la pared; el último se cae, la mano lo vuelve a clavar;
//    en «Doom alone» el del centro se enciende en verde y Doom levanta los brazos; el último se vuelve a caer (gag 3).
// 3. «And if you put them side by side»: inserto de la mesa de luz: las once tiras se juntan y en «single image» las
//    juntas desaparecen; dos manos las empujan; la taza humea.
// 4. «a city in ruins»: la ciudad entera en la pantalla gigante de la Comic-Con; en «giant robots» los ojos de los
//    Centinelas; en «Doom in the middle», el anillo verde y la ovación.
// 5. «The pairs seem chosen»: la taquilla del cine: el cartel de la izquierda se enciende en «Thor» (rayo) con Thor y
//    Steve; un chico lo señala; en «first Captain America», la insignia del «1». El de la derecha, tapado («?»).
// 6. «Sam Wilson»: el andén del metro: dos cajas de luz; Sam abre las alas, Cíclope dispara el visor; en «Magneto» se
//    enciende la segunda (Magneto y Shuri); viajeros; el tren entra por delante al final.
// 7. «Professor X»: la rueda de prensa: el expositor sube con el Profesor X (sentado) y Mr. Fantástico; flashes; el «4».
// 8. «Four»: la estantería del fan: la mano deja en el suelo la ciudad entera enmarcada; la caja del 4 se enciende.''', COMUN + r'''
const P = (f) => en('posters', f), PJ = (f) => en('parejas', f);
// ── 1. El cuarto del fan: el calendario y las once miniaturas ──
const CORCHO = HS('#7a5a32', '#946c3c', '#ae8248', '#c49a5a');
const hoja = (x0, y0, cab, num) => {
  R.rect(x0 + 1, y0 + 1, x0 + 33, y0 + 35, mez(CORCHO[0], K, 0.5)); caja(x0, y0, x0 + 32, y0 + 34, BL); R.rect(x0 + 1, y0 + 1, x0 + 31, y0 + 7, cab); R.rect(x0 + 1, y0 + 8, x0 + 31, y0 + 8, mez(cab, K, 0.45));
  for (const dx of [8, 24]) { R.rect(x0 + dx, y0 - 2, x0 + dx + 1, y0 + 2, H('#8a8a94')); R.pset(x0 + dx, y0 - 2, H('#d8d8e0')); }
  for (let f = 0; f < 3; f++) for (let c = 0; c < 6; c++) R.rect(x0 + 3 + c * 5, y0 + 22 + f * 4, x0 + 5 + c * 5, y0 + 23 + f * 4, f === 1 && c === 3 ? mez(cab, BL, 0.4) : H('#c4bcac'));
  R.numero(num, x0 + 17, y0 + 18, { centro: true, color: H('#2a2430'), sombra: false });
};
const circulo = (cx, cy, rx, ry, u, c) => { const n = Math.floor(u * 44); for (let i = 0; i < n; i++) { const a = -2.2 + i / 44 * Math.PI * 2.2, x = Math.round(cx + Math.cos(a) * rx), y = Math.round(cy + Math.sin(a) * ry); R.pset(x, y, c); R.pset(x + 1, y, c); } };
const p1 = (t) => {
  const o = { encuadre: 'cuarto' }, g = DO.hoy(R, t, o) || {}, [mx0, my0, mx1, my1] = g.mapa ?? [170, 18, 266, 104], su = g.suelo ?? 166;
  const x0 = mx0 + 4, y0 = my0 + 4, x1 = mx1 - 4, y1 = my1 - 4;
  pinta(x0, y0, x1, y1, (x, y) => rampa(CORCHO, 1.3 + (azar(x, y) - 0.5) * 1.8 + (azar(x >> 2, y >> 2, 3) - 0.5) * 0.7 - (y > y1 - 3 ? 0.8 : 0), x, y));
  hoja(x0 + 4, y0 + 5, H('#c8303a'), '18'); hoja(x0 + 52, y0 + 5, H('#2a5ac8'), '18');
  // «18»: el rotulador rojo lo rodea; «one month»: la flecha a la hoja de diciembre; «premiere»: la estrella
  circulo(x0 + 21, y0 + 19, 11, 7, tramo(t, P(.022), P(.06)), H('#e8303a'));
  const fl = tramo(t, P(.095), P(.125)); if (fl > 0) { const xa = x0 + 38, xb = Math.round(lerp(xa, x0 + 50, fl)); R.linea(xa, y0 + 30, xb, y0 + 30, H('#e8303a')); R.linea(xa, y0 + 31, xb, y0 + 31, H('#a81e28')); if (fl >= 1) { R.linea(xb, y0 + 30, xb - 3, y0 + 27, H('#e8303a')); R.linea(xb, y0 + 31, xb - 3, y0 + 34, H('#e8303a')); } }
  const es = tramo(t, P(.151), P(.17)); if (es > 0) { estrella(x0 + 74, y0 + 2 - Math.round((1 - es) * 4), K); estrella(x0 + 73, y0 + 1 - Math.round((1 - es) * 4), AMA); }
  // «eleven posters»: las once miniaturas se clavan de izquierda a derecha, y el «11»
  for (let i = 0; i < 11; i++) { const ap = tramo(t, P(.205) + i * 0.06, P(.205) + i * 0.06 + 0.12); if (ap <= 0) continue;
    const tx = x0 + 1 + i * 8, ty = y0 + 46 - Math.round((1 - ap) * 3); R.rect(tx + 1, ty + 1, tx + 7, ty + 18, mez(CORCHO[0], K, 0.5)); caja(tx, ty, tx + 6, ty + 17, BL, BL);
    R.recorte([tx + 1, ty + 1, tx + 5, ty + 16]); trozo(CX(i), 34, 124, tx + 1, ty + 1, tx + 5, ty + 16); R.recorte(null); R.pset(tx + 3, ty, H(['#e8303a', '#2a5ac8', '#f0c830', '#3ac85a'][i % 4])); }
  const on = tramo(t, P(.228), P(.245)); if (on > 0) R.numero('11', x0 + 44, y1 - 1 + Math.round((1 - on) * 6), { tam: 16, centro: true });
  // el fan entra con el móvil, lo mira, vibra («!») y salta de alegría
  const ent = tramo(t, 0.3, 2.2), fx = Math.round(lerp(300, 214, ent)), aviso = t > P(.2) && t < P(.24), salta = t > P(.24) + 0.4;
  const r = R.actor(EL.chico, fx, su, t, { dir: -1, anda: ent > 0 && ent < 1, sostiene: !salta && ent >= 1 ? true : false, sorpresa: t > P(.228), brazos: salta, salto: salta ? Math.round(Math.abs(Math.sin((t - P(.24)) * 9)) * 4) : 0, sonrisa: salta });
  if (!salta && ent >= 1) { const [hx, hy] = r.mano; caja(hx - 2, hy - 5, hx + 1, hy + 1, aviso && Math.floor(t * 10) % 2 ? H('#9ae8ff') : H('#3a6ac8')); if (aviso) { R.pset(hx - 4, hy - 4, AMAL); R.pset(hx + 3, hy - 4, AMAL); } }
  if (aviso) R.icono('!', fx + 6, su - 36, AMA, K);
  DO.hoyDelante(R, t, o);
};
// ── 2. La pared de Atom: los once llegan; el último se cae dos veces; Doom solo ──
const p2 = (t) => {
  const a0 = P(.303), a1 = P(.43), c1 = P(.442), pin = P(.497), dm = P(.53), c2 = P(.574);
  const n = t < a0 ? 0 : Math.min(11, 1 + Math.floor(10.999 * tramo(t, a0, a1)));
  const cae = t >= c1 && t < pin ? Math.max(0.001, tramo(t, c1, c1 + 0.8)) : t >= c2 ? Math.max(0.001, tramo(t, c2, c2 + 0.6)) : 0;
  const o = { encuadre: 'campo', camara: 'marcos', n, cae, doom: t > dm ? 1 : 0.4 }, g = T.batalla(R, t, o), pies = g.pies ?? 154;
  for (let k = 0; k < n; k++) { if (k === n - 1 && cae > 0) continue; const xs = g.sitios?.[k] ?? [], ak = a0 + k * (a1 - a0) / 10, rec = t - ak < 0.7;
    PAR[k].forEach((d, i) => { if (xs[i] == null) return; const ve = t > P(.385) && t < P(.45);
      R.actor(d, xs[i], pies, t, { dir: k === 5 ? 1 : i ? -1 : 1, brazos: k === 5 && t > dm, sonrisa: rec || (ve && (k + i) % 2 === 0), dedo: rec && i === 0, habla: ve && (k + i) % 3 === 0 && Math.sin(t * 9 + k) > 0 }); }); }
  T.batallaDelante(R, t, o);
  // la llegada: un destello en el marco que acaba de entrar
  if (n > 0 && t < a1 + 0.3) { const k = n - 1, [x0, y0, x1, y1] = B_M(k), u = ((t - a0) * 10 / (a1 - a0)) % 1; if (u < 0.5) barre(x0, y0, x1, y1, u * 2, 0.4); }
  // «Doom alone»: el marco del centro late en verde
  if (t > dm - 0.15 && t < c2 + 0.6) { const [x0, y0, x1, y1] = B_M(5); contorno(x0, y0, x1, y1, t, VERDE); R.anillo(160, 100, 18 + 6 * tramo(t, dm, dm + 0.5), mez(VERDE, K, 0.2 + 0.6 * tramo(t, dm, dm + 0.5)), 2); }
  // la mano de Atom vuelve a clavar el último (desde el borde derecho, solo la mano)
  const m = tramo(t, pin - 0.35, pin - 0.05) - tramo(t, pin + 0.15, pin + 0.45); if (m > 0) T.mano(R, Math.round(lerp(336, 304, m)), 56, -1, MANGA);
};
const B_M = (k) => { let x = 3; for (let i = 0; i < k; i++) x += (i === 5 ? 24 : 28) + 1; return [x, 46, x + (k === 5 ? 24 : 28) - 1, 160]; };
// ── 3. La mesa de luz: las once tiras se juntan en una sola imagen ──
const MADERA = HS('#3e2818', '#54361e', '#6a4628', '#7e5632', '#946a3e');
const MESA = () => fijo('mesaluz', () => {
  pinta(0, 0, 319, 179, (x, y) => { const tabla = Math.floor((y + 6) / 26), j = (y + 6) % 26; if (j === 0) return calma(x, y) ? MADERA[1] : MADERA[0];
    const veta = Math.sin(x * 0.045 + tabla * 2.3 + Math.sin(y * 0.35 + tabla) * 1.6) * 0.7 + (azar(x >> 3, tabla, 1) - 0.5) * 0.5;
    return rampa(MADERA, 2.2 + (calma(x, y) ? veta * 0.25 : veta) + (j === 1 ? 0.6 : j === 25 ? -0.6 : 0) + (azar(x, y) - 0.5) * 0.4, x, y); });
  // la alfombrilla de corte (verde con cuadrícula) bajo la mesa de luz, abajo a la izquierda
  pinta(0, 118, 46, 179, (x, y) => (x % 8 === 3 || y % 8 === 2) ? H('#5aa86a') : rampa(HS('#1e5a3a', '#2a6a44', '#34784e'), 1 + (azar(x, y) - 0.5), x, y));
  // la mesa de luz: carcasa gris con bisel y su sombra
  pinta(38, 50, 280, 160, (x, y) => mez(R.pget(x, y), K, 0.5));
  caja(32, 44, 274, 154, H('#9a9ea8')); R.rect(33, 45, 273, 46, H('#d8dce4')); R.rect(33, 152, 273, 153, H('#5a5e68')); R.rect(272, 45, 273, 153, H('#6a6e78'));
  for (const [x, y] of [[36, 48], [270, 48], [36, 150], [270, 150]]) { R.pset(x, y, H('#5a5e68')); R.pset(x + 1, y, H('#d8dce4')); }
  pinta(40, 52, 266, 146, (x, y) => { const d = Math.hypot((x - 153) / 120, (y - 99) / 52); if ((x - 40) % 14 === 0 || (y - 52) % 14 === 0) return H('#c8e4f0'); return rampa(HS('#bcdcec', '#d4ecf6', '#e8f6fc', '#f8fdff'), 3.2 - d * 1.6 + (azar(x, y) - 0.5) * 0.2, x, y); });
  R.rect(40, 52, 266, 52, H('#8a9aa8')); R.rect(40, 52, 40, 146, H('#8a9aa8'));
  // el interruptor con su piloto y el cable que baja por la derecha
  caja(250, 148, 262, 153, H('#3a3e48')); for (let y = 154; y < 180; y++) { const x = 256 + Math.round(Math.sin(y * 0.3) * 3 + (y - 154) * 0.6); R.pset(x, y, K); R.pset(x + 1, y, H('#3a3a44')); }
  // la regla metálica, las tijeras, el rollo de cinta, el lápiz y la caja de chinchetas
  caja(120, 160, 246, 167, H('#c8ccd4')); R.rect(121, 161, 245, 161, H('#eef0f4')); for (let x = 124; x < 244; x += 4) R.rect(x, 162, x, x % 20 === 4 ? 165 : 163, H('#3a3e48'));
  R.linea(64, 170, 96, 160, K); R.linea(64, 169, 96, 159, H('#d0d4dc')); R.linea(66, 162, 96, 166, K); R.linea(66, 161, 96, 165, H('#b8bcc4'));
  R.disco(58, 172, 4, K); R.disco(58, 172, 3, H('#e8303a')); R.disco(58, 172, 1, MADERA[2]); R.disco(54, 164, 4, K); R.disco(54, 164, 3, H('#e8303a')); R.disco(54, 164, 1, MADERA[2]);
  R.disco(14, 34, 9, K); R.disco(14, 34, 8, H('#d8cca0')); R.disco(14, 34, 5, H('#b8a878')); R.disco(14, 34, 3, MADERA[1]); R.linea(22, 34, 30, 40, H('#e8dcb0'));
  R.linea(284, 120, 312, 92, K); R.linea(284, 121, 312, 93, H('#f0c830')); R.linea(285, 121, 313, 93, H('#c89a20')); R.pset(284, 121, H('#f6c290')); R.pset(283, 122, K); R.rect(311, 91, 313, 93, H('#e8a0a0'));
  caja(288, 140, 312, 156, H('#e0d8c8')); for (let k = 0; k < 10; k++) R.pset(291 + (k % 5) * 4, 145 + Math.floor(k / 5) * 5, H(['#e8303a', '#2a5ac8', '#f0c830', '#3ac85a'][k % 4]));
  // la nota amarilla con la fecha
  R.rect(287, 63, 313, 85, mez(MADERA[0], K, 0.4)); caja(286, 62, 312, 84, H('#f6e078'), H('#c8a838')); R.rect(287, 63, 311, 65, H('#e8cc58'));
});
const p3 = (t) => {
  R.copiar(MESA()); const s0 = P(.613), s1 = P(.66), u = tramo(t, s0, s1), gap = 9 * (1 - u * u * (3 - 2 * u)), sj = tramo(t, P(.728), P(.75));
  R.numero('12', 300, 74, { centro: true, color: H('#a8302a'), sombra: false }); R.numero('18', 300, 83, { centro: true, color: H('#a8302a'), sombra: false });
  // el halo de la luz en la mesa
  // las tiras: cada una el trozo de su marco, separadas y desalineadas, que se juntan
  const X0 = 56, Y0 = 62, Y1 = 138, W = 198, sx0 = 2, sw = 317, sh = 124, k2x = (sx) => X0 + (sx - sx0) * W / sw;
  for (let k = 0; k < 11; k++) { const [a, , b] = B_M(k), bx0 = Math.round(k2x(k === 0 ? sx0 : a)), bx1 = Math.round(k2x(k === 10 ? sx0 + sw : b + 1)) - 1;
    const dx = Math.round((k - 5) * gap), dy = Math.round((azar(k, 9) - 0.5) * 12 * gap / 9), x0 = bx0 + dx, x1 = bx1 + dx, y0 = Y0 + dy, y1 = Y1 + dy;
    if (gap > 0.5) pinta(x0 + 2, y0 + 2, x1 + 2, y1 + 2, (x, y) => (x > x1 || y > y1) ? mez(R.pget(x, y), K, 0.35) : null);
    R.recorte([x0, y0, x1, y1]);
    const C = CIU(); for (let y = y0; y <= y1; y++) { const sy = Math.min(179, Math.floor(34 + (y - y0) * sh / (Y1 - Y0 + 1))); for (let x = x0; x <= x1; x++) { const sx = Math.min(319, Math.floor(sx0 + (x - dx - X0) * sw / W)); R.pset(x, y, mez(C[sy * 320 + sx], AMAL, 0.06)); } }
    // el filo blanco de cada tira, que se borra en «single image»
    if (sj < 1) { const c = mez(BL, R.pget(x0, y0), sj); R.linea(x0, y0, x0, y1, c); R.linea(x1, y0, x1, y1, c); R.linea(x0, y0, x1, y0, c); R.linea(x0, y1, x1, y1, c); }
    R.recorte(null); }
  // «single image»: el destello que recorre la imagen entera
  barre(X0, Y0, X0 + W, Y1, tramo(t, P(.728), P(.77)), 0.5);
  if (sj >= 1) { const v = 0.5 + 0.5 * Math.sin(t * 4); R.anillo(160, 113, 9 + v * 2, mez(VERDE, K, 0.3), 2); }
  // dos manos empujan las tiras desde los lados (solo la mano, cerca del borde)
  const mm = tramo(t, s0 - 0.5, s0) - tramo(t, s1 + 0.3, s1 + 0.8);
  if (mm > 0) { const xl = X0 - 5 * gap - 2, xr = X0 + W + 5 * gap + 2; T.mano(R, Math.round(lerp(-12, xl, mm)), 104, 1, MANGA); T.mano(R, Math.round(lerp(332, xr, mm)), 96, -1, MANGA); }
  // el vapor de la taza (la taza asoma abajo a la derecha)
  R.disco(300, 176, 11, K); R.disco(300, 176, 10, H('#f2eee2')); R.disco(300, 176, 7, H('#5a3a24')); R.disco(298, 174, 2, H('#7a5a3a'));
  for (let k = 0; k < 4; k++) { const f = (t * 0.7 + k / 4) % 1; R.pset(Math.round(300 + Math.sin(t * 2.5 + k * 2) * 3), Math.round(164 - f * 18), f > 0.6 ? H('#8a8a90') : H('#d8d8e0')); }
};
// ── 4. La Comic-Con: la ciudad entera en la pantalla gigante ──
const PANTALLAS = [[95, 25, 225, 81], [13, 47, 61, 75], [259, 53, 307, 81]];
const p4 = (t) => {
  const ov = tramo(t, P(.947), P(.98)), o = { ovacion: ov }; DO.escenario(R, t, o);
  const z = tramo(t, P(.791), P(1.08)), sh = lerp(132, 104, z), sy0 = lerp(30, 50, z);
  PANTALLAS.forEach(([x0, y0, x1, y1], i) => { R.recorte([x0, y0, x1, y1]); const g = trozo(160, sy0, sh, x0, y0, x1, y1, { bajo: false });
    pinta(x0, y0, x1, y1, (x, y) => (y & 1) ? mez(R.pget(x, y), K, 0.12) : null);
    const pos = (cx, cy) => [x0 + (cx - g.sx0) * g.w / g.sw, y0 + (cy - sy0) * g.hh / sh];
    // «giant robots in the smoke»: los ojos de los tres Centinelas se encienden
    const ro = tramo(t, P(.867), P(.89)) * (1 - tramo(t, P(.94), P(.96)));
    if (ro > 0) for (const [cx, cy] of [[52, 62], [212, 58], [258, 66]]) { const [ex, ey] = pos(cx, cy); if (i === 0) R.halo(ex, ey, 4 + ro * 3, HS('#5a1010', '#c8202a', '#ff6a5a'), 0.9); R.pset(Math.round(ex), Math.round(ey), H('#ffd0c0')); R.pset(Math.round(ex) + 1, Math.round(ey), H('#ff5040')); }
    // «Doom in the middle»: el anillo verde que se abre en el centro
    const dmu = tramo(t, P(.947), P(.99)); if (dmu > 0) { const [dx, dy] = pos(160, 112); const rr = (i === 0 ? 6 : 3) + dmu * (i === 0 ? 10 : 5); R.anillo(dx, dy, rr, mez(VERDE, K, dmu * 0.5)); if (i === 0) R.anillo(dx, dy, rr - 3, VERDE); }
    R.recorte(null); });
  DO.escenarioDelante(R, t, o);
};
// ── 5. La taquilla: Thor y Steve ──
const p5 = (t) => {
  const o = { encuadre: 'nyhoy', camara: 'taquilla', corona: 0 }, g = DO.mundo(R, t, o) || {}, su = g.suelo ?? 160;
  const [ax0, ax1, ay0, ay1] = g.cartelGuante ?? [34, 82, 72, 132], [bx0, bx1, by0, by1] = g.cartelArana ?? [266, 314, 72, 132];
  const TH = PJ(.13), lit = tramo(t, TH - 0.1, TH + 0.2), rayo = t > TH && t < TH + 0.45, prim = tramo(t, PJ(.258), PJ(.29));
  const L = [30, 58, 94, 138]; caja(L[0] - 4, L[1] - 4, L[2] + 4, L[3] + 4, H('#c89a20'), K); R.rect(L[0] - 3, L[1] - 3, L[2] + 3, L[1] - 3, H('#ffe070')); R.rect(L[0] - 1, L[1] - 1, L[2] + 1, L[3] + 1, K);
  for (let i = 0; i < 18; i++) { const per = 2 * (L[2] - L[0] + L[3] - L[1]) + 16, d = (i / 18) * per, w = L[2] - L[0] + 8, h2 = L[3] - L[1] + 8; let bx, by; if (d < w) { bx = L[0] - 4 + d; by = L[1] - 4; } else if (d < w + h2) { bx = L[2] + 4; by = L[1] - 4 + d - w; } else if (d < 2 * w + h2) { bx = L[2] + 4 - (d - w - h2); by = L[3] + 4; } else { bx = L[0] - 4; by = L[3] + 4 - (d - 2 * w - h2); }
    const on = (i + Math.floor(t * (lit > 0 ? 8 : 2))) % 3 !== 0; R.disco(Math.round(bx), Math.round(by), 1, on ? H('#fff6c8') : H('#a8862a')); }
  const res = poster(0, L[0], L[1], L[2], L[3], t, { s: 2, luz: rayo && Math.floor(t * 14) % 2 ? 0.35 : lerp(-0.55, 0, lit), sombra: false, op: [{ brazos: rayo }, { sostiene: true, sonrisa: t > PJ(.16) }] });
  if (res[1]) escudo(Math.round(res[1].mano[0]), Math.round(res[1].mano[1]), 6);
  if (rayo) { R.recorte([L[0] + 2, L[1] + 2, L[2] - 2, L[3] - 2]); let x = res[0]?.cabeza[0] ?? 50, y = L[1] + 2; while (y < (res[0]?.cabeza[1] ?? 100) - 4) { const nx = x + (azar(Math.floor(t * 20), y) - 0.5) * 6, ny = y + 4; R.linea(x, y, nx, ny, AMAL); R.linea(x + 1, y, nx + 1, ny, AMA); x = nx; y = ny; } R.recorte(null); }
  insignia(L[2] - 10, L[1] + 11, '1', H('#2a4fa8'), prim);
  // el cartel de la derecha, tapado con papel de estraza y una «?»
  pinta(bx0 + 4, by0 + 4, bx1 - 4, by1 - 4, (x, y) => rampa(HS('#8a6a44', '#a8865a', '#c0a06e'), 1.4 + (azar(x >> 1, y, 4) - 0.5) * 1.2 + Math.sin(x * 0.7 + y * 0.2) * 0.3, x, y));
  R.linea(bx0 + 4, by0 + 20, bx1 - 4, by0 + 26, H('#7a5a38')); R.icono('?', Math.round((bx0 + bx1) / 2) - 5, by0 + 20, AMAL, K, 2);
  // la cola: tres esperan; un chico llega corriendo, señala el cartel y se asombra con el «1»
  R.actor(EL.espectadora, 236, su, t, { dir: -1 }); R.actor(EL.espectador, 254, su, t, { dir: -1, habla: Math.sin(t * 5) > 0.3 }); R.actor(EL.chica, 274, su, t, { dir: -1, sonrisa: t > TH });
  const ck = tramo(t, TH - 0.8, TH + 0.5), kx = Math.round(lerp(150, 98, ck));
  R.actor(EL.chico, kx, su, t, { dir: -1, anda: ck > 0 && ck < 1, dedo: t > PJ(.16), sorpresa: prim > 0, salto: prim > 0 && prim < 1 ? 2 : 0 });
  DO.k_mundoDelante(R, t, o);
};
// ── 6. El andén del metro: Sam y Cíclope, Magneto y Shuri ──
const TEJA = HS('#b8b098', '#ccc6b2', '#dedacb', '#eeebe2');
const METRO = () => fijo('metro', () => {
  // el techo de hormigón con la tubería y las vigas
  pinta(0, 0, 319, 23, (x, y) => rampa(HS('#16181e', '#1e2128', '#262a32', '#30343e'), 1.3 + (azar(x >> 1, y >> 1, 5) - 0.5) * (calma(x, y) ? 0.25 : 1) + (y > 20 ? -0.8 : 0), x, y));
  for (let x = 50; x < 276; x++) { R.pset(x, 16, H('#4a505c')); R.pset(x, 17, H('#6a7080')); R.pset(x, 18, H('#3a3e48')); if (x % 30 === 0) R.rect(x, 13, x + 1, 19, H('#2a2e36')); }
  // la pared de azulejo blanco, con juntas, suciedad que sube del suelo y la franja de mosaico
  pinta(0, 24, 277, 127, (x, y) => { const tx = x % 8, ty = (y - 24) % 5; if (tx === 7 || ty === 4) return y > 112 ? H('#7a7464') : H('#9a968a');
    const sucio = (y - 24) / 104 * 1.1 + (azar(x >> 3, (y - 24) / 5 | 0, 7) - 0.5) * 0.7; return rampa(TEJA, 3.1 - sucio * 1.4 - (ty === 3 ? 0.7 : 0) + (ty === 0 ? 0.3 : 0), x, y); });
  pinta(0, 28, 277, 33, (x, y) => (y === 28 || y === 33) ? H('#3a1e1e') : ((x >> 2) + (y & 1)) % 3 === 0 ? H('#2a7a6a') : H('#8a2a2a'));
  pinta(0, 114, 277, 127, (x, y) => (x % 8 === 7 || (y - 114) % 5 === 4) ? H('#3a1414') : rampa(HS('#5a1e1e', '#7a2a2a', '#9a3a34'), 1.2 + (azar(x >> 3, y, 2) - 0.5), x, y));
  // las dos cajas de luz (marco de aluminio) y el plano de las líneas (sin letras)
  for (const [x0, y0, x1, y1] of [[22, 38, 102, 116], [150, 38, 230, 116]]) { R.rect(x0 - 3, y0 - 3, x1 + 4, y1 + 4, K); R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, H('#a8acb6')); R.rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, H('#e4e6ec')); R.rect(x1 + 3, y0 - 1, x1 + 3, y1 + 3, mez(TEJA[0], K, 0.5)); }
  caja(110, 46, 140, 96, H('#e8e4d8')); R.rect(110, 46, 140, 50, H('#2a2e36'));
  for (const [c, pts] of [['#e8303a', [[114, 58], [124, 66], [124, 90]]], ['#2a7ac8', [[114, 80], [136, 72]]], ['#3ac85a', [[120, 54], [134, 88]]], ['#f0a020', [[136, 56], [128, 76], [116, 92]]]]) { for (let i = 1; i < pts.length; i++) { R.linea(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], H(c)); R.linea(pts[i - 1][0] + 1, pts[i - 1][1], pts[i][0] + 1, pts[i][1], H(c)); } for (const [x, y] of pts) { R.disco(x, y, 2, K); R.disco(x, y, 1, BL); } }
  // la columna de hierro verde con remaches
  for (const xc of [4, 242]) { R.rect(xc, 22, xc + 8, 150, H('#1e3a2e')); R.rect(xc + 1, 22, xc + 2, 150, H('#3a6a52')); R.rect(xc + 7, 22, xc + 8, 150, H('#142a20')); for (let y = 30; y < 150; y += 10) { R.pset(xc + 4, y, H('#5a8a72')); R.pset(xc + 4, y + 1, K); } R.rect(xc - 2, 22, xc + 10, 25, H('#1e3a2e')); }
  // la boca del túnel a la derecha (la esquina de Atom queda en su arco oscuro)
  pinta(278, 0, 319, 179, (x, y) => rampa(HS('#08090c', '#101218', '#181b22'), 0.8 + (azar(x >> 2, y >> 2, 8) - 0.5) * 0.6 + (x < 284 ? 1 : 0), x, y));
  for (let y = 24; y < 156; y++) { R.pset(278, y, H('#4a4e58')); R.pset(279, y, H('#2a2e36')); }
  R.disco(300, 98, 3, K); R.disco(300, 98, 2, H('#3a0a0a'));
  // el reloj de pared (las agujas van aparte)
  R.disco(262, 58, 9, K); R.disco(262, 58, 8, H('#f2eee2')); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; R.pset(Math.round(262 + Math.cos(a) * 6.5), Math.round(58 + Math.sin(a) * 6.5), K); }
  // el andén: losas de hormigón con manchas y chicles, la banda amarilla con botones y el borde
  pinta(0, 128, 277, 151, (x, y) => { if ((x + (y - 128) * 2) % 40 === 0 || y === 140) return H('#5a5a5e'); const v = 1.6 + (azar(x >> 2, y >> 1, 3) - 0.5) * 0.7 - (y - 128) * 0.02; return azar(x, y, 6) > 0.993 ? H('#2a2a2e') : rampa(HS('#5a5c62', '#6e7076', '#84868c', '#9a9ca2'), v, x, y); });
  pinta(0, 150, 277, 155, (x, y) => y === 155 ? K : ((x % 4 === 1) && (y === 152)) ? H('#c8a018') : H('#f0c830'));
  // la vía: el foso oscuro, traviesas, los dos raíles con brillo y un charco
  pinta(0, 156, 319, 179, (x, y) => rampa(HS('#0a0a0c', '#141418', '#1e1e24'), 0.9 + (azar(x >> 1, y, 9) - 0.5) * 0.8, x, y));
  for (let x = 4; x < 320; x += 14) R.rect(x, 168, x + 8, 171, H('#2a2420'));
  for (const yr of [166, 174]) { R.rect(0, yr, 319, yr + 1, H('#5a5e68')); R.rect(0, yr, 319, yr, H('#c8ccd4')); }
  pinta(60, 176, 110, 178, (x, y) => b4(x, y) < 0.4 ? H('#2a3a5a') : null);
  // el banco de listones y la papelera
  caja(108, 132, 142, 136, H('#8a5a34')); R.rect(109, 133, 141, 133, H('#a87444')); R.rect(110, 137, 111, 146, K); R.rect(139, 137, 140, 146, K);
  caja(222, 128, 236, 148, H('#3a4a3e')); for (let x = 224; x < 236; x += 3) R.rect(x, 130, x, 146, H('#2a362e')); R.rect(221, 126, 237, 128, H('#5a6a5e'));
});
const p6 = (t) => {
  R.copiar(METRO()); const SAM = PJ(.351), CYC = PJ(.468), MAG = PJ(.581), SHU = PJ(.631), TREN = PJ(.665);
  // las agujas del reloj y los fluorescentes que zumban (uno parpadea)
  R.linea(262, 58, Math.round(262 + Math.cos(t * 0.3) * 5), Math.round(58 + Math.sin(t * 0.3) * 5), K); R.linea(262, 58, Math.round(262 + Math.cos(t * 0.03 - 1) * 3), Math.round(58 + Math.sin(t * 0.03 - 1) * 3), K);
  for (const [lx, fl] of [[70, 1], [190, Math.sin(t * 23) > -0.7 || Math.sin(t * 3) > 0 ? 1 : 0]]) { caja(lx - 22, 21, lx + 22, 25, H('#3a3e48')); R.rect(lx - 20, 23, lx + 20, 24, fl ? H('#f6faff') : H('#8a8e98')); if (fl) pinta(lx - 26, 26, lx + 26, 34, (x, y) => b4(x, y) < 0.3 - (y - 26) * 0.035 ? mez(R.pget(x, y), BL, 0.5) : null); }
  // la caja de la izquierda: Sam (alas en «Sam») y Cíclope (el visor dispara en «Cyclops»)
  const A = [22, 38, 102, 116], B = [150, 38, 230, 116];
  const ra = poster(1, ...A, t, { s: 2, luz: 0.08, sombra: false, op: [{ salto: t > SAM && t < SAM + 0.8 ? Math.round(Math.sin((t - SAM) * 8) * 2 + 2) : 0, sonrisa: true }, { dedo: t > CYC - 0.2 && t < CYC + 0.9 }] });
  if (t > CYC && t < CYC + 0.7 && ra[1]) { const [hx, hy] = ra[1].cabeza; R.recorte([A[0] + 2, A[1] + 2, A[2] - 2, A[3] - 2]); for (let k = 0; k < 3; k++) R.linea(Math.round(hx - 10), Math.round(hy + 10 + k), A[0] + 2, Math.round(hy + 4 + k * 2), k === 1 ? H('#ffd0d0') : H('#ff3a3a')); R.recorte(null); }
  // la de la derecha se enciende en «Magneto»: Magneto levanta la mano y una tuerca flota; Shuri, garras moradas
  const on = t > MAG ? (t < MAG + 0.4 ? (Math.floor(t * 16) % 2 ? 0.05 : -0.6) : 0.08) : -0.7;
  const rb = poster(2, ...B, t, { s: 2, luz: on, sombra: false, op: [{ dedo: t > MAG + 0.3 }, { sonrisa: t > SHU }] });
  if (t > MAG + 0.4 && rb[0]) { const [hx, hy] = rb[0].mano, fy = Math.round(hy - 6 + Math.sin(t * 4) * 2); R.recorte([B[0] + 2, B[1] + 2, B[2] - 2, B[3] - 2]); R.rect(hx - 2, fy - 2, hx + 2, fy + 2, K); R.rect(hx - 1, fy - 1, hx + 1, fy + 1, H('#a8acb8')); R.pset(hx, fy, K); R.anillo(hx, fy, 5, H('#c8a0ff'), 2); R.recorte(null); }
  if (t > SHU && t < SHU + 0.8 && rb[1]) for (let k = 0; k < 3; k++) chispa(rb[1].mano[0] + k * 3 - 3, rb[1].mano[1] - 2 + k, t + k, H('#c89aff'));
  // los viajeros: una lee el móvil en el banco, un señor cruza, un chico señala la caja de Sam y se asombra
  const r1 = R.actor(EL.senora30, 116, 141, t, { dir: 1, sostiene: true }); caja(r1.mano[0] - 2, r1.mano[1] - 4, r1.mano[0] + 1, r1.mano[1] + 1, H('#3a6ac8'));
  const w = tramo(t, SAM + 0.3, MAG + 1.2); R.actor(EL.senor30, Math.round(lerp(-16, 300, w)), 150, t, { dir: 1, anda: w > 0 && w < 1 });
  R.actor(EL.chico, 64, 148, t, { dir: -1, dedo: t > CYC - 0.3 && t < CYC + 1.4, sorpresa: t > CYC && t < CYC + 1.6, sonrisa: t > MAG });
  // el tren entra por la boca del túnel, por delante de todos
  const fa = tramo(t, TREN - 0.7, TREN); if (fa > 0) R.halo(300, 150, 10 + fa * 20, HS('#2a2a1a', '#a89a50', '#fff4c0'), 0.7 * fa);
  const tx = Math.round(lerp(330, 120, tramo(t, TREN, TREN + 1.6) ** 0.7));
  if (tx < 330) { R.rect(tx, 110, 340, 168, K); pinta(tx + 1, 111, 319, 167, (x, y) => { const lx = x - tx; if (y < 114) return H('#d8dce4'); if (y > 150 && y < 156) return H('#2a5ac8'); if (y >= 120 && y <= 140 && lx % 34 > 4 && lx % 34 < 28) return y < 124 ? H('#fff6c8') : rampa(HS('#c8b878', '#e8d898', '#fff4c0'), 1.5 + Math.sin(lx * 0.3) * 0.5, x, y); return rampa(HS('#8a8e98', '#a8acb6', '#c8ccd4'), 1.4 + (y < 128 ? 0.4 : -0.2) + (lx % 34 === 0 ? -1.2 : 0), x, y); });
    for (let k = 0; k < 5; k++) { const wx = tx + k * 34; if (wx + 28 > 319) break; escalado([EL.espectador, EL.senora30, EL.chica, EL.senor30, EL.chico][k], wx + 9, 150, 1, t, { dir: -1 }, [wx + 5, 124, Math.min(319, wx + 27), 140], (c) => mez(c, H('#e8d898'), 0.25)); }
    R.rect(tx, 110, tx + 1, 168, H('#e8ecf4')); R.disco(tx + 4, 160, 2, H('#fff6c8')); }
};
// ── 7. La rueda de prensa: el Profesor X y Mr. Fantástico ──
const p7 = (t) => {
  const PX = PJ(.74), MR = PJ(.829), F4 = PJ(.934), sube = tramo(t, PX + 0.05, PX + 0.65), fl = 0.25 + 0.65 * tramo(t, PX + 0.6, MR);
  const o = { encuadre: 'prensa', flashes: fl }, g = DO.escenario(R, t, o) || {}, su = g.suelo ?? 122;
  // el expositor enrollable: la base, el mástil y el póster que sube de la caja
  const x0 = 186, x1 = 246, base = su - 4, top = Math.round(lerp(base - 2, 34, sube));
  R.rect(215, top, 216, base, H('#5a5e68'));
  const rp = poster(3, x0, top, x1, top + (base - 34), t, { s: 2, luz: 0.05, sombra: false, clip: [x0, 0, x1, base - 1], pre: (i, xl, gy, sc) => { if (i) return; R.recorte([x0 + 2, Math.max(0, top + 2), x1 - 2, base - 1]); const wx = xl + 6 * sc, wy = gy - 5 * sc; R.disco(wx, wy, 6 * sc, K); R.disco(wx, wy, 6 * sc - 2, H('#5a5e68')); R.disco(wx, wy, 6 * sc - 4, H('#2a2e36')); R.disco(wx, wy, 2, H('#c8ccd4')); for (let a = 0; a < 6; a++) R.linea(wx, wy, Math.round(wx + Math.cos(a + t * 0.2) * (6 * sc - 3)), Math.round(wy + Math.sin(a + t * 0.2) * (6 * sc - 3)), H('#8a8e98')); R.recorte(null); }, op: [{ sonrisa: t > PX + 0.8 }, { brazos: t > MR && t < MR + 1.2, sonrisa: t > MR }] });
  caja(x0 - 3, base - 2, x1 + 3, base + 3, H('#8a8e9a')); R.rect(x0 - 2, base - 1, x1 + 2, base - 1, H('#c8ccd4')); R.rect(x0, base + 4, x0 + 3, base + 5, K); R.rect(x1 - 3, base + 4, x1, base + 5, K);
  insignia(x1 - 8, top + 12, '4', H('#2a5ac8'), tramo(t, F4, F4 + 0.3));
  // el portavoz tras el atril (asoman cabeza y hombros): habla y en «Mr.» señala el expositor
  R.actor(EL.ejecutivoDD ?? EL.agente, 153, su, t, { dir: 1, habla: Math.sin(t * 8) > 0 && t < F4 + 0.5, dedo: t > MR - 0.2 && t < F4 + 0.4, sonrisa: t > F4 });
  DO.escenarioDelante(R, t, o);
};
// ── 8. La estantería del fan: la ciudad entera, enmarcada; la caja del 4 ──
const p8 = (t) => {
  const o = { encuadre: 'cuarto', camara: 'estanteria' }, g = DO.hoy(R, t, o) || {}, su = g.suelo ?? 172, cj = g.cajas?.[4] ?? [214, 74];
  const c0 = 36.95, lleva = tramo(t, c0, c0 + 1.0), suelta = t > c0 + 1.15, vuelve = tramo(t, c0 + 1.25, c0 + 1.8);
  // el cuadro con la ciudad entera
  const fx = Math.round(suelta ? 246 : lerp(330, 246, lleva)), fy = Math.round(suelta ? su - 30 : lerp(su - 46, su - 30, lleva));
  if (lleva > 0) { R.rect(fx + 2, fy + 2, fx + 58, fy + 32, mez(H('#2a2018'), K, 0.4)); caja(fx, fy, fx + 56, fy + 30, H('#6a4a2a')); R.rect(fx + 1, fy + 1, fx + 55, fy + 1, H('#946a3e')); caja(fx + 3, fy + 3, fx + 53, fy + 27, BL, BL);
    R.recorte([fx + 5, fy + 5, fx + 51, fy + 25]); trozo(160, 34, 124, fx + 5, fy + 5, fx + 51, fy + 25, { bajo: false }); R.recorte(null); barre(fx + 5, fy + 5, fx + 51, fy + 25, tramo(t, c0 + 1.0, c0 + 1.8), 0.4); }
  if (lleva > 0 && vuelve < 1) T.mano(R, Math.round(suelta ? lerp(fx + 60, 344, vuelve) : fx + 60), fy + 14 - (suelta ? 0 : 0), -1, MANGA);
  // la caja del 4 se enciende y late
  const c4 = tramo(t, c0 + 1.8, c0 + 2.3); if (c4 > 0) { const v = 0.6 + 0.4 * Math.sin(t * 5); R.halo(cj[0], cj[1], 12 + 6 * c4 * v, HS('#0a1430', '#2a5ac8', '#9ac8ff'), 0.5 * c4); chispa(cj[0] + 13, cj[1] - 16, t, AMAL); chispa(cj[0] - 12, cj[1] + 10, t + 0.3, AMAL); }
  DO.hoyDelante(R, t, o);
};
const efectos = [[P(.024), 'lapiz'], [P(.151), 'brillo'], [P(.2), 'bip'], [P(.228), 'pop'],
  [P(.303), 'papel'], [P(.442), 'whoosh'], [P(.497), 'golpecito'], [P(.53), 'zumbido'], [P(.574), 'whoosh'],
  [P(.62), 'papel'], [P(.728), 'brillo'], [P(.867), 'zumbido'], [P(.95), 'publico'],
  [PJ(.13), 'trueno'], [PJ(.26), 'pop'], [PJ(.351), 'whoosh'], [PJ(.581), 'interruptor'], [PJ(.665), 'motor'],
  [PJ(.75), 'whoosh'], [PJ(.8), 'flash'], [PJ(.934), 'pop'], [PJ(.981) + 1.2, 'golpecito']];
T.rodar(E, R, [[0, p1], [P(.296), p2], [P(.602), p3], [P(.791), p4], [PJ(0), p5], [PJ(.351), p6], [PJ(.74), p7], [PJ(.981), p8]], { efectos, año: 2026 });
''')

E['dd-parejas'] = ('Diez parejas', '''// DD-PAREJAS (frases 16–17), 2026. Seis planos, cortados en la palabra:
// 1. «Loki is with Mystique»: la valla de obra de una calle de Nueva York con tres pósters pegados; cada uno se
//    enciende en su nombre (Loki y Mística, Bucky y Shang-Chi, Ant-Man y el Guardián Rojo: Ant-Man encoge); el
//    que pega carteles alisa el último; pasa una señora; el taxi cruza por delante y la paloma se va.
// 2. «the Invisible Woman»: la pantalla de la Comic-Con de cerca: Sue aparece de lo invisible, Namor sale del agua;
//    entra el segundo, Gambito (la carta rosa) y Yelena; la ovación.
// 3. «the tenth pair»: la terraza de Wakanda: un póster tapado con una tela morada en un caballete; la tela ondea en
//    «surprise» y en «Nightcrawler» estalla el humo morado: Rondador mayor y M'Baku; M'Baku levanta los brazos.
// 4. «first official image» (batalla 'pareja'): el póster de cerca; a su lado, la polaroid de 2003 (el Rondador joven);
//    en «2003» sale el número grande, que rueda a «2026» con una flecha al póster.
// 5. «older, white hair, swords, long coat»: la mansión de la escuela con la lona de Rondador colgada; tres alumnos
//    señalan el pelo, las espadas y el abrigo, que se encienden por turno; en «someone is missing» uno se vuelve: «?».
// 6. «Beast» (batalla 'ausente'): la silueta recortada de la Bestia; una «?» azul late; la mano de Atom pega una nota
//    con «?» en el hueco en «without a poster».''', COMUN + r'''
const A = (f) => en('resto', f), B = (f) => en('rondador', f);
// un taxi amarillo (sin letreros): x a la izquierda, y del suelo
const taxi = (x, y, t) => { x = Math.round(x);
  R.rect(x + 2, y - 3, x + 50, y - 1, mez(H('#1e1e24'), K, 0.3));
  caja(x, y - 15, x + 50, y - 4, H('#f0c020')); R.rect(x + 1, y - 14, x + 49, y - 13, H('#ffe070')); R.rect(x + 1, y - 7, x + 49, y - 6, H('#c89a10'));
  caja(x + 12, y - 23, x + 38, y - 14, H('#f0c020')); caja(x + 15, y - 21, x + 24, y - 15, H('#9ac8e8')); caja(x + 26, y - 21, x + 35, y - 15, H('#9ac8e8')); R.pset(x + 16, y - 20, BL);
  caja(x + 21, y - 26, x + 29, y - 23, H('#fff6c8')); for (let i = 0; i < 12; i++) R.pset(x + 6 + i * 3, y - 9, i % 2 ? K : BL);
  for (const wx of [x + 11, x + 39]) { R.disco(wx, y - 3, 4, K); R.disco(wx, y - 3, 2, H('#8a8e98')); R.pset(wx + Math.round(Math.cos(t * 20) * 1.5), y - 3 + Math.round(Math.sin(t * 20) * 1.5), K); }
  R.rect(x, y - 12, x + 1, y - 10, H('#fff6c8')); R.rect(x + 49, y - 12, x + 50, y - 10, H('#e8303a')); };
// ── 1. La valla de obra: tres pósters ──
const VERDEV = HS('#1a3026', '#22402e', '#2a4e38', '#345e44');
const VALLA = () => fijo('valla', () => {
  // dos edificios arriba: ladrillo a la izquierda (escalera de incendios), piedra clara a la derecha; la barra y Atom, tranquilos
  pinta(0, 0, 150, 43, (x, y) => { const f = Math.floor(y / 4), jx = (x + (f & 1) * 4) % 8; const tr = calma(x, y); if (!tr && (y % 4 === 3 || jx === 7)) return H('#5a2a20'); return rampa(HS('#6a2e22', '#82402c', '#9a5034'), 1.1 + (tr ? 0 : (azar(x >> 3, f, 1) - 0.5) * 0.9) - (y > 38 ? 0.6 : 0), x, y); });
  pinta(151, 0, 319, 43, (x, y) => { const tr = calma(x, y); if (!tr && (y % 7 === 6)) return H('#a8987a'); return rampa(HS('#b4a486', '#c8b898', '#dccdae'), 1.3 + (tr ? 0 : (azar(x >> 4, y / 7 | 0, 2) - 0.5) * 0.6) - (y > 38 ? 0.6 : 0), x, y); });
  for (const wx of [56, 98, 128]) { caja(wx, 22, wx + 14, 38, H('#2a3a4a')); R.rect(wx + 1, 23, wx + 13, 24, H('#5a7a9a')); R.rect(wx + 7, 23, wx + 7, 37, H('#e8e0d0')); R.linea(wx + 2, 36, wx + 6, 26, H('#7a9aba')); R.rect(wx - 1, 38, wx + 15, 39, H('#c8b8a0')); }
  for (const wx of [176, 214, 250]) { caja(wx, 20, wx + 16, 38, H('#1e2a36')); R.rect(wx + 1, 21, wx + 15, 22, H('#4a6a8a')); R.rect(wx + 8, 21, wx + 8, 37, H('#d8ccb0')); R.rect(wx - 1, 38, wx + 17, 39, H('#8a7a60')); if (wx === 214) { R.rect(wx + 2, 24, wx + 6, 36, H('#e8b860')); R.rect(wx + 10, 24, wx + 14, 36, H('#c8a050')); } }
  R.rect(150, 0, 151, 43, H('#3a2a20'));
  // la escalera de incendios de hierro negro
  for (const py of [24, 40]) { R.rect(88, py, 146, py + 1, K); for (let x = 88; x <= 146; x += 3) R.rect(x, py - 5, x, py, K); R.rect(88, py - 6, 146, py - 6, K); }
  R.linea(96, 40, 112, 25, K); R.linea(97, 40, 113, 25, H('#2a2a30')); for (let k = 0; k < 6; k++) R.linea(97 + k * 2.6, 38 - k * 2.4, 101 + k * 2.6, 38 - k * 2.4, K);
  // el techo verde del andamio de la acera
  pinta(0, 40, 319, 45, (x, y) => y === 45 ? K : y === 40 ? H('#4a7a5a') : rampa(VERDEV, 2 - (y - 40) * 0.3 + (x % 40 === 0 ? -1 : 0), x, y));
  for (let x = 6; x < 320; x += 40) { R.rect(x, 46, x + 1, 50, H('#5a5e68')); }
  // la valla: tableros de contrachapado pintado de verde, juntas, tornillos, desconchones y restos de carteles viejos
  pinta(0, 46, 319, 133, (x, y) => { const tab = Math.floor(x / 40), lx = x % 40; if (lx === 0) return K; if (lx === 1) return H('#3e6a50');
    let v = 1.9 + Math.sin(y * 0.6 + tab * 3 + Math.sin(x * 0.15) * 2) * 0.25 + (azar(x >> 1, y >> 2, tab) - 0.5) * 0.4 - (y - 46) * 0.006;
    if (azar(x >> 2, y >> 2, 11) > 0.965) return rampa(HS('#8a6a44', '#a8865a'), 0.6 + azar(x, y), x, y);
    return rampa(VERDEV, v, x, y); });
  for (let x = 0; x < 320; x += 40) for (const y of [50, 129]) { R.pset(x + 4, y, H('#8a8e98')); R.pset(x + 36, y, H('#8a8e98')); R.pset(x + 4, y + 1, K); R.pset(x + 36, y + 1, K); }
  for (const [x, y, w, hh, c] of [[96, 60, 16, 22, '#e8e0d0'], [104, 100, 12, 18, '#c84a4a'], [198, 64, 14, 20, '#e8d8a0'], [306, 84, 12, 30, '#9ac8e8'], [6, 104, 14, 22, '#e8e0d0']]) {
    pinta(x, y, x + w, y + hh, (px, py) => (px - x) + (py - y) * 0.4 + azar(px >> 1, py >> 1, 4) * 6 < w + 2 ? (b4(px, py) < 0.15 ? mez(H(c), K, 0.3) : H(c)) : null); }
  pinta(0, 128, 319, 133, (x, y) => (Math.floor((x + y) / 5) % 2) ? H('#f0c830') : H('#1e1e24'));
  // la acera: losas con juntas, chicles y una grieta; la boca de riego roja; la bolsa de basura; el cubo de cola con su brocha
  pinta(0, 134, 319, 152, (x, y) => { if (x % 46 === 0 || y === 143) return H('#7a7a80'); return azar(x, y, 3) > 0.992 ? H('#3a3a40') : rampa(HS('#8a8a90', '#9e9ea4', '#b2b2b8', '#c4c4ca'), 2 - (y - 134) * 0.05 + (azar(x >> 3, y >> 2, 5) - 0.5) * 0.6, x, y); });
  R.linea(150, 136, 170, 150, H('#5a5a60'));
  caja(110, 136, 118, 150, H('#c8303a')); R.rect(108, 140, 120, 142, H('#a8202a')); R.rect(112, 133, 116, 136, H('#c8303a')); R.pset(111, 137, H('#ff6a5a'));
  R.disco(298, 145, 8, K); R.disco(298, 145, 7, H('#1e1e24')); R.pset(295, 141, H('#5a5a6a')); R.pset(296, 142, H('#4a4a5a')); R.rect(297, 136, 299, 138, H('#2a2a30'));
  caja(208, 138, 222, 150, H('#c8ccd4')); R.rect(209, 139, 221, 141, H('#f2eee2')); R.linea(214, 138, 226, 126, H('#8a5a34')); R.rect(224, 122, 230, 126, H('#d8c8a0'));
  // el bordillo, la calzada con la doble línea amarilla, la tapa de alcantarilla y un charco
  R.rect(0, 152, 319, 153, H('#d8d8dc')); R.rect(0, 154, 319, 155, H('#6a6a70'));
  pinta(0, 156, 319, 179, (x, y) => { if ((y === 170 || y === 172) && x % 24 < 18) return H('#f0c020'); return rampa(HS('#2a2a30', '#34343a', '#3e3e46'), 1.2 + (azar(x >> 1, y >> 1, 6) - 0.5) * 0.9, x, y); });
  R.disco(60, 164, 6, K); R.disco(60, 164, 5, H('#4a4a52')); for (let k = -4; k <= 4; k += 2) R.linea(56, 164 + k * 0.5, 64, 164 + k * 0.5, H('#2a2a30'));
  pinta(220, 174, 270, 178, (x, y) => b4(x, y) < 0.45 ? H('#5a6a8a') : null);
});
const PA = [24, 52, 88, 128], PB = [126, 52, 190, 128], PC = [226, 52, 290, 128];
const q1 = (t) => {
  R.copiar(VALLA()); const LO = A(0), BU = A(.103), AN = A(.22), TX = A(.25);
  const enc = (k, X, t0) => { const u = tramo(t, t0 - 0.05, t0 + 0.9); return { luz: u > 0 && u < 1 ? 0.12 : 0.02, u }; };
  const ea = enc(4, PA, LO), eb = enc(6, PB, BU), ec = enc(7, PC, AN);
  const ra = poster(4, ...PA, t, { s: 2, luz: ea.luz, op: [{ sonrisa: t > LO }, { dedo: t > LO + 0.3 && t < LO + 1.2 }] }); barre(...PA, ea.u, 0.5);
  if (ea.u > 0 && ea.u < 1 && ra[0]) { chispa(ra[0].cabeza[0] - 4, ra[0].cabeza[1] - 4, t, AMA); chispa(ra[0].cabeza[0] + 12, ra[0].cabeza[1] - 4, t + 0.2, AMA); }
  const rb = poster(6, ...PB, t, { s: 2, luz: eb.luz, op: [{ dedo: t > BU && t < BU + 1 }, { brazos: t > A(.146) && t < A(.146) + 0.8 }] }); barre(...PB, eb.u, 0.5);
  if (t > A(.146) && t < A(.146) + 0.8 && rb[1]) for (let k = 0; k < 5; k++) chispa(rb[1].cabeza[0] + Math.cos(t * 9 + k * 1.3) * 12, rb[1].cabeza[1] + 8 + Math.sin(t * 9 + k * 1.3) * 6, t + k, H('#ffd040'));
  const enco = t > AN && t < AN + 0.8;
  const rc = poster(7, ...PC, t, { s: 2, ss: [enco ? 1 : 2, 2], luz: ec.luz, op: [{ sonrisa: true }, { sonrisa: t > A(.268) }] }); barre(...PC, ec.u, 0.5);
  if (enco && rc[0]) for (let k = 0; k < 4; k++) chispa(rc[0].cabeza[0] + Math.cos(k * 1.6 + t * 6) * 9, rc[0].cabeza[1] + 6 + Math.sin(k * 1.6 + t * 6) * 9, t + k, H('#ff6a5a'));
  // el que pega carteles: alisa el póster de la derecha con la brocha de mango largo y se aparta
  const al = t < 1.6, px = Math.round(lerp(204, 186, tramo(t, 1.6, 2.4))), r = R.actor(EL.tecnico, px, 150, t, { dir: 1, sostiene: al ? [px + 18, 132] : false, anda: t > 1.6 && t < 2.4, sonrisa: t > 2.4 });
  if (al) { const by = Math.round(96 + Math.sin(t * 7) * 14), [hx, hy] = r.mano; R.linea(hx, hy, 236, by, H('#8a5a34')); R.linea(hx + 1, hy, 237, by, H('#6a4428')); caja(232, by - 4, 242, by + 2, H('#d8c8a0')); for (let k = 0; k < 5; k++) R.pset(233 + k * 2, by + 3, H('#b8a880')); }
  // una señora cruza con su bolso; la paloma picotea y vuela cuando pasa el taxi
  const w = tramo(t, 0.1, 4.5); R.actor(EL.senora30, Math.round(lerp(300, 40, w)), 151, t, { dir: -1, anda: w > 0 && w < 1 });
  const vu = tramo(t, TX - 0.2, TX + 0.6), pgx = Math.round(150 + vu * 40), pgy = Math.round(149 - vu * 50 - (vu === 0 && Math.sin(t * 6) > 0.5 ? 1 : 0));
  R.rect(pgx, pgy - 3, pgx + 4, pgy - 1, H('#7a7e8a')); R.pset(pgx + 5, pgy - 4, H('#5a5e6a')); R.pset(pgx + 6, pgy - 4, H('#f0a020')); R.pset(pgx + 1, pgy - 2, H('#4a8a7a'));
  if (vu > 0) { const a = Math.floor(t * 14) % 2; R.linea(pgx, pgy - 3, pgx - 3, pgy - 6 + a * 4, H('#9a9eaa')); R.linea(pgx + 4, pgy - 3, pgx + 7, pgy - 6 + a * 4, H('#9a9eaa')); } else { R.pset(pgx, pgy, H('#f0a020')); R.pset(pgx + 3, pgy, H('#f0a020')); }
  // el taxi cruza por delante, de derecha a izquierda
  const tu = tramo(t, TX - 0.4, A(.36)); if (tu > 0 && tu < 1) taxi(lerp(330, -60, tu), 176, t);
};
// ── 2. La pantalla de la Comic-Con de cerca: Sue y Namor, Gambito y Yelena ──
const q2 = (t) => {
  const SU = A(.363), NA = A(.443), GA = A(.509), YE = A(.556), ov = 0.3 + 0.7 * tramo(t, YE + 0.3, YE + 0.9), o = { camara: 'pantalla', ovacion: ov };
  const g = DO.escenario(R, t, o) || {}, [x0, y0, x1, y1] = g.pantalla ?? [39, 19, 241, 109];
  R.recorte([x0, y0, x1, y1]);
  pinta(x0, y0, x1, y1, (x, y) => { const a = Math.atan2(y - 64, x - 140) + t * 0.15, d = Math.hypot(x - 140, (y - 64) * 1.6) / 120; return rampa(HS('#0a0e24', '#141c3e', '#1e2a5a', '#2a3a7a'), 2.6 - d * 2 + (Math.sin(a * 8) > 0.6 ? 0.6 : 0) + (azar(x, y) > 0.995 ? 2 : 0), x, y); });
  // el primero entra por la izquierda; Sue se hace visible (trama) y Namor sale del agua; el segundo, por la derecha
  const ua = tramo(t, SU - 0.15, SU + 0.3), ub = tramo(t, GA - 0.2, GA + 0.25), xa = Math.round(lerp(x0 - 90, 56, ua)), xb = Math.round(lerp(x1 + 10, 150, ub));
  const vis = tramo(t, SU, SU + 0.6), sale = tramo(t, NA - 0.2, NA + 0.35);
  if (ua > 0) { poster(8, xa, 24, xa + 74, 104, t, { s: 2, clip: [x0, y0, x1, y1], dy: [0, Math.round((1 - sale) * 40)], op: [{ sonrisa: vis >= 1 }, { brazos: sale > 0.6 && t < NA + 1.2, sonrisa: true }],
      tintes: [(c, x, y) => vis >= 1 ? c : b4(x, y) < vis ? c : (b4(x + 1, y) < 0.15 ? mez(c, H('#9ad8ff'), 0.6) : 0), null] });
    if (sale > 0 && sale < 1) { R.recorte([xa + 2, 26, xa + 72, 102]); for (let k = 0; k < 10; k++) { const a = k * 0.62 + 0.4, d = sale * 18; R.disco(Math.round(xa + 48 + Math.cos(a) * d), Math.round(98 - Math.abs(Math.sin(a)) * d * 1.4 + sale * sale * 10), 1, H('#9ad8ff')); } R.recorte([x0, y0, x1, y1]); } }
  if (ub > 0) { const rg = poster(9, xb, 24, xb + 74, 104, t, { s: 2, clip: [x0, y0, x1, y1], op: [{ sonrisa: true }, { dedo: t > YE && t < YE + 0.9, sonrisa: t > YE }] });
    if (rg[0] && t > GA) { const [hx, hy] = rg[0].mano; for (let k = 0; k < 3; k++) chispa(hx + 2 + Math.cos(t * 8 + k * 2) * 4, hy - 2 + Math.sin(t * 8 + k * 2) * 4, t + k * 0.3, H('#ff8ad8')); } }
  pinta(x0, y0, x1, y1, (x, y) => (y & 1) ? mez(R.pget(x, y), K, 0.1) : null);
  R.recorte(null);
  DO.escenarioDelante(R, t, o);
};
// ── 3. La terraza de Wakanda: el décimo póster, tapado; el humo morado ──
const q3 = (t) => {
  const SP = A(.725), NI = A(.796), MB = A(.891), WK = A(.949), o = { encuadre: 'wakanda' }, g = DO.mundo(R, t, o) || {}, su = g.suelo ?? 162;
  // el caballete de madera
  const X0 = 128, Y0 = 72, X1 = 192, Y1 = 150;
  R.linea(136, Y1 - 4, 122, su, K); R.linea(137, Y1 - 4, 123, su, H('#8a5a34')); R.linea(184, Y1 - 4, 198, su, K); R.linea(183, Y1 - 4, 197, su, H('#8a5a34'));
  R.linea(160, Y0 - 6, 160, su - 4, H('#6a4428')); caja(X0 - 4, Y1 - 1, X1 + 4, Y1 + 3, H('#8a5a34'));
  const rev = t > NI + 0.05;
  if (rev) poster(10, X0, Y0, X1, Y1, t, { s: 2, op: [{ sonrisa: t > NI + 0.5 }, { brazos: t > MB && t < MB + 1.5, sonrisa: t > MB }] });
  else { // la tela morada con triángulos dorados, que ondea en «surprise»
    const on = tramo(t, SP - 0.1, SP + 0.4) * (1 - tramo(t, NI - 0.4, NI)) * 0.8 + 0.2;
    pinta(X0 - 3, Y0 - 3, X1 + 3, Y1 + 6, (x, y) => { const off = Math.sin(y * 0.18 - t * 6) * on * 2.5 * (y - Y0) / (Y1 - Y0), lx = x - off; if (lx < X0 - 3 || lx > X1 + 3) return null;
      const pl = Math.sin((lx - X0) * 0.25 + Math.sin(y * 0.1 + t * 3) * on * 2), tri = ((lx + y) % 14 < 2 && y % 14 > 4 && y % 14 < 10) || (y % 28 === 0);
      return tri ? H('#e8b830') : rampa(HS('#2a1240', '#3e1a5e', '#56287a', '#6e3896'), 1.6 + pl * 0.8, x, y); });
    R.icono('?', 155, 98, AMAL, K, 2); R.numero('10', 160, 132, { centro: true, color: H('#e8b830') }); }
  // «Nightcrawler»: el humo morado y negro (el teletransporte)
  humo(160, 108, tramo(t, NI - 0.05, NI + 0.9), H('#2a1a3a'), H('#6a4a8a'), 12, 26);
  // dos chicos de Wakanda miran: se asombran con el humo; en «Wakanda» uno señala la ciudad
  R.actor(EL.chica, 76, su, t, { dir: 1, sorpresa: t > NI && t < NI + 1.2, sonrisa: t > NI + 1.2, dedo: t > WK - 0.2 });
  R.actor(EL.chico, 230, su, t, { dir: -1, sorpresa: t > NI && t < NI + 1.4, habla: t > MB && Math.sin(t * 8) > 0, salto: t > NI && t < NI + 0.4 ? 2 : 0 });
  DO.k_mundoDelante(R, t, o);
};
// ── 4. El póster de cerca; la polaroid de 2003 que rueda a 2026 ──
const q4 = (t) => {
  const FI = B(.018), Y3 = B(.289), RO = B(.33), o = { encuadre: 'pareja', k: 10 }, g = T.batalla(R, t, o), [mx0, my0, mx1, my1] = g.marco ?? [100, 24, 220, 168], clip = [mx0 + 2, my0 + 2, mx1 - 2, my1 - 2];
  const fl = t > FI && t < FI + 0.25;
  espadas(134, my1 - 6, 2);
  escalado(RM, 134, my1 - 6, 2, t, { dir: 1, sonrisa: t > B(.149), dedo: t > B(.149) && t < B(.149) + 1 }, clip, fl ? (c) => mez(c, BL, 0.6) : null);
  escalado(EL.mbaku, 158, my1 - 6, 2, t, { dir: -1, habla: Math.sin(t * 6) > 0.4 && t < Y3, sonrisa: t > Y3 }, clip, fl ? (c) => mez(c, BL, 0.6) : null);
  T.batallaDelante(R, t, o);
  barre(mx0, my0, mx1, my1, tramo(t, FI, FI + 0.7), 0.6);
  // la polaroid de 2003 en la pared, con el Rondador joven (pelo oscuro, sin abrigo) entre humo
  const px0 = 22, py0 = 30, cl2 = [px0 + 4, py0 + 4, px0 + 50, py0 + 48];
  R.rect(px0 + 2, py0 + 2, px0 + 56, py0 + 64, mez(H('#2a3040'), K, 0.4)); caja(px0, py0, px0 + 54, py0 + 62, BL, H('#c8c2b4'));
  pinta(...cl2, (x, y) => rampa(HS('#141830', '#1e2448', '#2a3460', '#3a4a7a'), 2.2 - Math.hypot(x - px0 - 27, y - py0 - 18) / 20 + (azar(x, y) > 0.97 ? 1 : 0), x, y));
  R.recorte(cl2); for (let k = 0; k < 5; k++) { const a = k * 1.25 + t * 0.4; R.disco(Math.round(px0 + 27 + Math.cos(a) * 14), Math.round(py0 + 36 + Math.sin(a) * 5), 4, H('#4a3a5a')); } R.recorte(null);
  escalado(EL.rondador, px0 + 20, py0 + 48, 2, t, { dir: 1, sonrisa: true }, cl2, (c) => mez(c, H('#c8a878'), 0.18));
  R.numero('2003', px0 + 28, py0 + 59, { centro: true, color: H('#3a3046'), sombra: false });
  R.pset(px0 + 27, py0 - 1, H('#e8303a')); R.pset(px0 + 28, py0 - 1, H('#e8303a')); R.pset(px0 + 27, py0, K);
  if (t > Y3 - 0.1 && t < RO + 1.2) contorno(px0, py0, px0 + 54, py0 + 62, t);
  // «2003»: el número grande, que rueda a «2026», con la flecha al póster
  const ap = tramo(t, Y3, Y3 + 0.25); if (ap > 0) { const bx = 52, by = 128, ro = tramo(t, RO, RO + 0.5);
    caja(bx - 34, by - 21, bx + 34, by + 4, H('#1e2030')); R.numero('20', bx - 16, by, { tam: 16, centro: true });
    R.recorte([bx - 1, by - 19, bx + 33, by + 2]); R.numero('03', bx + 16, Math.round(by - ro * 22), { tam: 16, centro: true }); R.numero('26', bx + 16, Math.round(by + 22 - ro * 22), { tam: 16, centro: true }); R.recorte(null);
    const fl2 = tramo(t, RO + 0.3, RO + 0.6); if (fl2 > 0) { const xe = Math.round(lerp(bx + 36, mx0 - 4, fl2)); R.linea(bx + 36, by - 9, xe, by - 9, AMA); R.linea(bx + 36, by - 8, xe, by - 8, H('#c89a20')); if (fl2 >= 1) { R.linea(xe, by - 9, xe - 4, by - 13, AMA); R.linea(xe, by - 8, xe - 4, by - 4, AMA); } } }
};
// ── 5. La mansión: la lona con Rondador mayor; los alumnos señalan pelo, espadas y abrigo ──
const q5 = (t) => {
  const WH = B(.427), SW = B(.485), CO = B(.531), MI = B(.606), o = { encuadre: 'mansion' }, g = DO.vacio(R, t, o) || {}, su = g.suelo ?? 166;
  // la lona colgada de la cornisa, con sus cuerdas, que se mece un poco con el viento
  const X0 = 52, Y0 = 70, X1 = 104, Y1 = 150, cl = [X0 + 2, Y0 + 2, X1 - 2, Y1 - 2];
  R.linea(X0 + 2, Y0, X0 - 2, Y0 - 8, H('#c8b898')); R.linea(X1 - 2, Y0, X1 + 2, Y0 - 8, H('#c8b898'));
  pinta(X0 + 3, Y1 + 1, X1 + 3, Y1 + 3, (x, y) => mez(R.pget(x, y), K, 0.35));
  caja(X0, Y0, X1, Y1, H('#1e1830'), BL); pinta(...cl, (x, y) => rampa(HS('#2a3260', '#4a5a8a', '#7a8ab8', '#a8b8dc', '#ccd8f0'), 0.4 + (y - Y0) / (Y1 - Y0) * 3.6 - Math.abs(x - 78) * 0.02 + (azar(x, y) > 0.985 && y < Y0 + 30 ? 1.5 : 0), x, y));
  R.recorte(cl); for (let k = 0; k < 5; k++) { const a = k * 1.25 + t * 0.4; R.disco(Math.round(78 + Math.cos(a) * 18), Math.round(132 + Math.sin(a) * 4), 4, H('#3a2a4a')); } R.recorte(null);
  const pu = espadas(64, Y1 - 6, 2); const r = escalado(RM, 64, Y1 - 6, 2, t, { dir: 1, sonrisa: t > CO }, cl, (c, x, y) => c);
  for (let y = Y0 + 2; y < Y1 - 1; y += 2) { const v = Math.sin(y * 0.2 - t * 3); if (v > 0.85) for (let x = X0 + 2; x < X1 - 1; x++) R.pset(x, y, mez(R.pget(x, y), BL, 0.12)); }
  for (const x of [X0 + 2, X1 - 2]) { R.disco(x, Y0 + 2, 1, H('#c8c8d0')); }
  // los tres rasgos: el pelo blanco, las espadas y el abrigo largo
  const [hx, hy] = r.cabeza, mk = (t0) => tramo(t, t0, t0 + 0.25) * (1 - tramo(t, t0 + 1.1, t0 + 1.4));
  const a1 = mk(WH), a2 = mk(SW), a3 = mk(CO);
  if (a1 > 0) R.anillo(hx, hy + 2, 6 + 6 * a1, AMA, 0);
  if (a2 > 0) for (const [sx, sy] of pu) { chispa(sx, sy, t, AMAL); R.anillo(sx, sy, 3 + 4 * a2, AMA); }
  if (a3 > 0) { const gy = Y1 - 6; contorno(64 - 1, gy - 14 * 2, 64 + 15 * 2, gy, t); barre(64, gy - 28, 94, gy, a3, 0.5); }
  // tres alumnos en el césped; cada uno señala un rasgo; en «someone is missing» el del medio se vuelve: «?»
  const vuelve = t > MI;
  R.actor(EL.chica, 116, su, t, { dir: -1, dedo: a1 > 0, sonrisa: t > WH && t < MI });
  R.actor(EL.chico, 140, su, t, { dir: vuelve ? 1 : -1, dedo: a2 > 0, sorpresa: vuelve });
  R.actor(EL.espectadora, 164, su, t, { dir: -1, dedo: a3 > 0, habla: t > MI && Math.sin(t * 7) > 0 });
  if (vuelve) { const u = tramo(t, MI, MI + 0.3); R.icono('?', 141, su - 42 - Math.round((1 - u) * 4), AMA, K, 2); }
};
// ── 6. La silueta de la Bestia: la nota con «?» ──
const q6 = (t) => {
  const BE = B(.745), WI = B(.923), o = { encuadre: 'pareja', camara: 'ausente' }, g = T.batalla(R, t, o), [sx, sy] = g.silueta ?? [160, 118];
  T.batallaDelante(R, t, o);
  // «Beast»: pelos azules que brillan por el filo del recorte y una «?» que late
  const be = tramo(t, BE, BE + 0.4);
  if (be > 0) { for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2 + t * 0.3; chispa(sx + Math.cos(a) * (30 + 6 * Math.sin(k)), sy - 4 + Math.sin(a) * 38, t + k * 0.13, k % 2 ? H('#6a9aff') : H('#2a4ae8')); }
    const v = Math.floor(t * 3) % 2; if (t < WI) R.icono('?', sx - 7, sy - 28 - v, H('#6a9aff'), K, 2); }
  // la mano de Atom pega una nota azul con «?» en el hueco y se va
  const pe = WI + 0.6, m = tramo(t, WI - 0.1, pe) - tramo(t, pe + 0.4, pe + 1.0), puesta = t > pe;
  const nx = Math.round(puesta ? sx - 11 : lerp(330, sx - 11, tramo(t, WI - 0.1, pe))), ny = sy - 30;
  if (t > WI - 0.1) { R.rect(nx + 1, ny + 1, nx + 23, ny + 23, mez(H('#2a2e3a'), K, 0.4)); caja(nx, ny, nx + 22, ny + 22, H('#8ac8f0'), H('#5a9ac8')); R.rect(nx + 1, ny + 1, nx + 21, ny + 3, H('#6ab0e0')); R.icono('?', nx + 4, ny + 6, H('#1e3a6a'), H('#5a9ac8'), 2); }
  if (m > 0) T.mano(R, nx + 30, ny + 12, -1, MANGA);
};
const efectos = [[A(.0) + 0.05, 'papel'], [A(.146), 'brillo'], [A(.22), 'pop'], [A(.25), 'coche'],
  [A(.363), 'whoosh'], [A(.443), 'chof'], [A(.6), 'publico'],
  [A(.725), 'viento'], [A(.796), 'whoosh'], [A(.891), 'palmada'],
  [B(.018), 'flash'], [B(.289), 'pop'], [B(.33), 'tic'],
  [B(.485), 'brillo'], [B(.606), 'pop'],
  [B(.745), 'zumbido'], [B(.923) + 0.6, 'golpecito']];
T.rodar(E, R, [[0, q1], [A(.333), q2], [A(.641), q3], [B(0), q4], [B(.369), q5], [B(.694), q6]], { efectos, año: 2026 });
''')

E['dd-mascara'] = ('Máscara nueva', '''// DD-MASCARA (frases 18–19), 2026. Cinco planos, cortados en la palabra:
// 1. «That same day came a video»: el plató de las sillas, de cerca: la capa verde en la silla; el panel cuenta «1:30» en
//    «minute and a half»; un técnico cruza con un rollo de cable; en «The Return» la capa brilla en verde.
// 2. «It opens with Robert Downey Jr.»: el plató con croma: Downey (de paisano) entra, la claqueta suena; habla con la
//    script; en «until» el teléfono de la mesa vibra; él se vuelve, la llamada pregunta «?» y el foco se enciende sobre
//    la máscara en «come back».
// 3. «Marvel posted it»: una azotea de Nueva York al atardecer: la valla de la azotea de enfrente cambia a la máscara;
//    una chica le hace una foto (flash) y un chico la señala; palomas.
// 4. «New mask. Same task.»: la máscara de cerca; en «New mask» un golpe de luz la recorre, los ojos se encienden en «Same task»;
//    en «master manipulator» baja una cruceta de marioneta con dos peones colgados, en un guante verde.
// 5. «how much he loves this role»: el camerino: espejo con bombillas, la máscara en la mano; dibuja un corazón en el
//    aire en «loves»; llaman a la puerta y alguien se asoma.''', COMUN + r'''
const M1 = (f) => en('return', f), M2 = (f) => en('lema', f);
// ── 1. El plató de las sillas: la capa en la silla ──
const m1 = (t) => {
  const MI = M1(.095), BH = M1(.151), RT = M1(.288), o = { encuadre: 'plato', camara: 'silla', contador: t > MI ? '1:30' : undefined };
  const g = DO.escenario(R, t, o) || {}, su = g.suelo ?? 156, [cx, cy] = g.silla ?? [168, 154];
  const w = tramo(t, 0.3, BH + 2.4), tx = Math.round(lerp(290, 200, w)), r = R.actor(EL.tecnico, tx, su, t, { dir: -1, anda: w > 0 && w < 1, sostiene: true });
  R.disco(r.mano[0], r.mano[1], 4, K); R.disco(r.mano[0], r.mano[1], 3, H('#2a2a30')); R.disco(r.mano[0], r.mano[1], 1, H('#e8b830'));
  for (let x = r.mano[0] + 3; x < 330; x += 2) R.pset(x, r.mano[1] + 2 + Math.round(Math.sin(x * 0.2) * 1.5 + (x - r.mano[0]) * 0.3), K);
  const rt = tramo(t, RT, RT + 0.5); if (rt > 0) { R.halo(cx, cy - 26, 14 + 8 * rt, HS('#04140a', '#1e6a32', '#5aff7a'), 0.5 * rt); for (let k = 0; k < 6; k++) chispa(cx + Math.cos(k * 1.05 + t * 2) * 16, cy - 26 + Math.sin(k * 1.05 + t * 2) * 12, t + k * 0.2, VERDE); }
  DO.escenarioDelante(R, t, o);
};
// ── 2. El plató: Downey entra; el teléfono ──
const m2 = (t) => {
  const RB = M1(.411), PE = M1(.614), LE = M1(.667), UN = M1(.758), AS = M1(.845), BK = M1(.92);
  const o = { encuadre: 'plato', telefono: t > UN && t < AS ? 1 : 0, mascara: tramo(t, BK, BK + 0.35) }, g = T.plato(R, t, o), su = g.suelo ?? 160, [tfx, tfy] = g.telefono ?? [76, 133];
  // la script con la claqueta: la cierra cuando entra Downey
  const cl = t > RB - 0.1 && t < RB + 0.15, r2 = R.actor(EL.tecnica ?? EL.chica, 176, su, t, { dir: -1, sostiene: t < RB + 1.2, sonrisa: t > RB + 0.5 });
  if (t < RB + 1.2) { const [hx, hy] = r2.mano; caja(hx - 7, hy - 3, hx, hy + 2, K); for (let k = 0; k < 3; k++) R.rect(hx - 6 + k * 2, hy - 2, hx - 6 + k * 2, hy + 1, BL); const ab = cl ? 0 : 4; R.linea(hx - 7, hy - 4, hx, hy - 4 - ab, BL); R.linea(hx - 7, hy - 5, hx, hy - 5 - ab, K); }
  // Downey entra desde la derecha, se para junto a la mesa, habla; en «peace» sonríe; en «leaving» mira la máscara;
  // el teléfono vibra en «until»: se vuelve, se inclina; en «come back» el foco se enciende y mira la máscara
  const an = tramo(t, RB - 0.4, RB + 1.6), x = Math.round(lerp(236, 104, an)), mira = (t > LE && t < UN) || t > BK;
  R.actor(EL.rdj, x, su, t, { dir: an < 1 ? -1 : mira ? 1 : -1, anda: an > 0 && an < 1, habla: an >= 1 && t < UN && Math.sin(t * 7) > 0, sonrisa: (t > PE && t < UN) || t > BK + 0.3, dedo: t > PE - 0.2 && t < PE + 0.6, sorpresa: t > UN + 0.2 && t < AS + 0.6 });
  // la llamada: ondas y luego la «?» sobre el teléfono
  if (t > AS && t < BK + 0.6) { const v = Math.floor(t * 4) % 2; R.icono('?', tfx - 4, tfy - 22 - v, AMAL, K, 2); for (let k = 0; k < 2; k++) R.anillo(tfx, tfy - 2, 5 + ((t * 6 + k * 3) % 6), mez(AMAL, K, 0.3), 2); }
  T.platoDelante(R, t, o);
};
// ── 3. La azotea: la valla cambia a la máscara ──
const m3 = (t) => {
  const MV = M2(0), MO = M2(.096), o = { encuadre: 'nyhoy' }, g = DO.mundo(R, t, o) || {}, su = g.suelo ?? 164, [vx0, vx1, vy0, vy1] = g.valla ?? [128, 172, 74, 98];
  const sw = tramo(t, MV, MV + 0.35);
  if (sw > 0) { R.recorte([vx0, vy0, vx1, vy1]);
    pinta(vx0, vy0, vx1, vy1, (x, y) => sw < 1 && azar(y, Math.floor(t * 20)) < 0.5 ? (azar(x, y, Math.floor(t * 20)) > 0.5 ? H('#d8dce4') : H('#2a2e36')) : rampa(HS('#04140a', '#0a2a14', '#14421e'), 1.4 - Math.hypot(x - vx0 - 12, y - vy0 - 12) / 14 + (azar(x, y) > 0.97 ? 1 : 0), x, y));
    if (sw >= 1) { DO.e_mascara(R, vx0 + 12, vy0 + 13, 2, { ojos: 0.5 + 0.5 * Math.sin(t * 3), brillo: (t * 0.5) % 1 }); const p = tramo(t, MV + 0.4, M2(.224));
      estrella(vx0 + 25, vy0 + 4, AMA); R.rect(vx0 + 25, vy1 - 5, vx1 - 3, vy1 - 4, H('#2a4a32')); R.rect(vx0 + 25, vy1 - 5, Math.round(vx0 + 25 + (vx1 - vx0 - 28) * p), vy1 - 4, VERDE);
      R.poligono([[vx0 + 30, vy0 + 12], [vx0 + 30, vy0 + 19], [vx0 + 36, vy0 + 15]], AMAL); }
    R.recorte(null); }
  // una chica hace una foto con el móvil (flash); un chico señala la valla
  const r = R.actor(EL.chica, 150, su, t, { dir: 1, sostiene: t > MV + 0.3 }); if (t > MV + 0.3) { const [hx, hy] = r.mano; caja(hx - 1, hy - 5, hx + 2, hy + 1, H('#2a2a30')); if (t > MO && t < MO + 0.15) { R.halo(hx + 1, hy - 3, 12, HS('#8a8a90', '#e8e8f0', '#ffffff'), 1); } }
  R.actor(EL.chico, 118, su, t, { dir: 1, dedo: t > MV + 0.2 && t < MO + 1.2, sorpresa: t > MV && t < MV + 0.8, sonrisa: t > MO });
  DO.k_mundoDelante(R, t, o);
};
// ── 4. La máscara de cerca: la mano, los ojos y la marioneta ──
const m4 = (t) => {
  const SA = M2(.312), MA = M2(.596);
  const NM = M2(.224), o = { encuadre: 'plato', camara: 'mascara', mano: 0 }, g = T.plato(R, t, o), [mx, my] = g.mascara ?? [150, 86], [hx, hy] = g.mano ?? [mx + 46, 96];
  // «Same task»: los ojos se encienden en verde
  const oj = tramo(t, SA, SA + 0.3) * (1 - tramo(t, MA + 0.4, MA + 1)); if (oj > 0) for (const dx of [-10, 10]) { R.halo(mx + dx, my - 7, 5 + 3 * oj, HS('#04140a', '#1e8a3a', '#9aff9a'), 0.8 * oj); R.rect(mx + dx - 3, my - 7, mx + dx + 3, my - 7, VERDE); }
  T.platoDelante(R, t, o);
  const fo = tramo(t, NM, NM + 0.6); if (fo > 0 && fo < 1) { barre(mx - 34, my - 50, mx + 34, my + 40, fo, 0.5); if (fo < 0.3) for (let k = 0; k < 8; k++) chispa(mx + Math.cos(k * 0.8) * (30 + fo * 40), my + Math.sin(k * 0.8) * (40 + fo * 40), t + k, AMAL); }
  // «master manipulator»: el guante verde baja la cruceta con dos peones de ajedrez colgados
  const ba = tramo(t, MA - 0.5, MA + 0.1), cy = Math.round(lerp(-30, 40, ba));
  if (ba > 0) { const cx = 62, inc = Math.sin(t * 3) * 0.25;
    const ext = [[-22, 0], [22, 0], [0, -10], [0, 10]].map(([dx, dy]) => [cx + dx * Math.cos(inc) - dy * Math.sin(inc), cy + dx * Math.sin(inc) * 0.6 + dy]);
    const peon = (px, py, c, cs) => { R.disco(px, py - 17, 4, K); R.disco(px, py - 17, 3, c); R.pset(px - 1, py - 18, mez(c, BL, 0.6)); R.rect(px - 4, py - 13, px + 4, py - 11, K); R.rect(px - 3, py - 12, px + 3, py - 12, cs); R.rect(px - 3, py - 11, px + 3, py - 4, K); R.rect(px - 2, py - 11, px + 2, py - 4, c); R.rect(px - 2, py - 11, px - 1, py - 4, mez(c, BL, 0.3)); R.rect(px - 6, py - 4, px + 6, py, K); R.rect(px - 5, py - 3, px + 5, py - 1, cs); R.rect(px - 5, py - 3, px + 5, py - 3, c); };
    const pa = [Math.round(cx - 20 + Math.sin(t * 4) * 4), Math.round(cy + 78 + Math.abs(Math.sin(t * 4)) * 6)], pb = [Math.round(cx + 20 + Math.sin(t * 4 + 2) * 4), Math.round(cy + 84 + Math.abs(Math.sin(t * 4 + 2)) * 6)];
    for (const [ex, ey] of ext) { const tg = ex < cx ? pa : pb; R.linea(Math.round(ex), Math.round(ey), tg[0], tg[1] - 20, H('#c8ccd4')); }
    R.linea(Math.round(ext[0][0]), Math.round(ext[0][1]), Math.round(ext[1][0]), Math.round(ext[1][1]), H('#8a5a34')); R.linea(Math.round(ext[2][0]), Math.round(ext[2][1]), Math.round(ext[3][0]), Math.round(ext[3][1]), H('#6a4428'));
    peon(pa[0], pa[1], H('#f2eee2'), H('#c8c2b4')); peon(pb[0], pb[1], H('#2a2430'), H('#4a4458'));
    T.mano(R, cx - 4, cy - 2, 1, '#2a5a32'); }
};
// ── 5. El camerino: el corazón en el aire ──
const PAPEL = HS('#16302e', '#1e3c3a', '#264a46', '#2e5852');
const CAMERINO = () => fijo('camerino', () => {
  // el papel pintado de rayas verde azulado con flores pequeñas, la moldura y el techo
  pinta(0, 0, 319, 149, (x, y) => { if (y < 14) return rampa(HS('#0e0c12', '#16141c', '#1e1c26'), 1 + (azar(x >> 2, y >> 1) - 0.5) * 0.4, x, y); if (y === 14 || y === 17) return H('#6a5a3a'); if (y < 18) return H('#8a7a4a');
    const tr = calma(x, y), raya = Math.floor(x / 9) % 2, flor = !tr && x % 18 === 4 + (y % 36 < 18 ? 0 : 9) && y % 18 === 9;
    if (flor) return H('#8a7a4a'); return rampa(PAPEL, (raya ? 2.1 : 1.5) - (tr ? 0.3 : 0) + (azar(x, y) - 0.5) * 0.3 - Math.max(0, (y - 120) * 0.02), x, y); });
  // el burro de vestuario: la barra, la capa verde, una túnica y el peto de armadura en su soporte
  R.rect(8, 36, 80, 37, H('#8a8e98')); R.rect(10, 36, 11, 150, H('#6a6e78')); R.rect(77, 36, 78, 150, H('#6a6e78')); R.rect(6, 148, 14, 150, K); R.rect(73, 148, 82, 150, K);
  pinta(16, 40, 44, 118, (x, y) => { const lx = x - 16, w = 6 + (y - 40) * 0.15; if (Math.abs(lx - 14) > w) return null; return rampa(HS('#14361e', '#1e4a2a', '#2a5e36', '#3a7a46'), 1.6 + Math.sin(lx * 0.8) * 0.9, x, y); });
  R.linea(30, 37, 26, 41, H('#c8ccd4')); R.linea(30, 37, 34, 41, H('#c8ccd4'));
  pinta(48, 40, 70, 104, (x, y) => { const w = 7 + (y - 40) * 0.05; if (Math.abs(x - 59) > w) return null; return rampa(HS('#3a2a1a', '#4a3a24', '#5e4a30'), 1.4 + Math.sin(x * 0.9) * 0.6, x, y); });
  R.linea(59, 37, 55, 41, H('#c8ccd4')); R.linea(59, 37, 63, 41, H('#c8ccd4'));
  R.rect(43, 132, 44, 150, H('#5a5e68')); R.rect(36, 149, 52, 150, K); pinta(32, 112, 56, 134, (x, y) => { const d = Math.hypot((x - 44) / 12, (y - 120) / 14); if (d > 1) return null; return rampa(HS('#5a5e68', '#8a8e98', '#b8bcc6', '#e0e4ec'), 3 - d * 2 - (x - 44) * 0.06, x, y); });
  // el espejo con bombillas (las bombillas van aparte) y el tocador de madera con cajones
  caja(100, 26, 230, 112, H('#d8c89a'), H('#8a7a4a')); caja(106, 32, 224, 106, H('#1e2a2a'));
  pinta(107, 33, 223, 105, (x, y) => { const d = (x - 107) * 0.4 + (y - 33); return rampa(HS('#2a3a3a', '#3a4c4c', '#4e6262', '#6a8080'), 1.6 - (y - 33) * 0.008 + ((d % 46) < 5 ? 1.4 : 0) + (azar(x, y) - 0.5) * 0.2, x, y); });
  pinta(80, 112, 250, 118, (x, y) => y === 112 ? H('#c89a5a') : rampa(MADERA2, 2 + Math.sin(x * 0.12 + y) * 0.5, x, y));
  pinta(84, 119, 246, 149, (x, y) => (x === 84 || x === 246 || y === 149 || x === 165) ? K : rampa(MADERA2, 1.4 + Math.sin(x * 0.08 + Math.sin(y * 0.3) * 2) * 0.5 + (azar(x >> 2, y, 1) - 0.5) * 0.4, x, y));
  for (const [x, y] of [[124, 132], [206, 132]]) { R.rect(x - 4, y, x + 4, y + 1, H('#e8c870')); R.pset(x - 4, y + 1, H('#8a6a2a')); }
  // en el tocador: el vaso con brochas, la polvera, el peine, la botella de agua, el guion grapado y una planta
  caja(90, 102, 98, 112, H('#c8d8e0')); for (const [dx, c] of [[1, '#c84a8a'], [4, '#e8b860'], [6, '#5a3a24']]) { R.linea(91 + dx, 102, 89 + dx * 1.4, 94, H(c)); R.pset(89 + dx * 1.4, 93, K); }
  R.disco(114, 110, 4, K); R.disco(114, 110, 3, H('#e8b8a0')); R.disco(113, 109, 1, BL); R.rect(124, 109, 140, 111, K); for (let x = 125; x < 140; x += 2) R.pset(x, 108, K);
  caja(222, 96, 228, 112, H('#9ac8e8')); R.rect(223, 93, 227, 96, H('#2a5ac8')); R.rect(223, 100, 227, 104, H('#e8f4fc'));
  caja(196, 104, 218, 112, H('#f2eee2')); for (let k = 0; k < 3; k++) R.rect(199, 106 + k * 2, 214 - k * 3, 106 + k * 2, H('#8a8e98')); R.rect(197, 104, 200, 105, H('#c8ccd4'));
  caja(236, 102, 246, 112, H('#b85a34')); for (const [dx, dy] of [[-4, -8], [0, -12], [4, -9], [-2, -5], [3, -4]]) R.disco(241 + dx, 102 + dy, 3, H('#3a8a4a')); R.pset(240, 92, H('#6ac87a'));
  // el soporte de la máscara (una cabeza de maniquí), la silla de director y la puerta con la estrella
  R.rect(158, 104, 162, 112, H('#5a5e68')); R.rect(154, 111, 166, 112, K);
  caja(176, 120, 204, 128, H('#c8303a')); R.rect(178, 128, 179, 150, H('#8a5a34')); R.rect(201, 128, 202, 150, H('#8a5a34')); R.linea(178, 150, 202, 128, H('#6a4428')); R.linea(178, 128, 202, 150, H('#6a4428')); caja(176, 104, 204, 112, H('#c8303a'));
  caja(262, 50, 308, 150, H('#5a3a24')); pinta(264, 52, 306, 148, (x, y) => rampa(MADERA2, 1.5 + Math.sin(y * 0.15 + x * 0.05) * 0.4 + ((x === 285) ? -1 : 0), x, y)); caja(268, 58, 302, 96, H('#4a2e1c')); caja(268, 104, 302, 142, H('#4a2e1c'));
  estrella(279, 66, H('#c89a20'), 2); R.disco(268, 102, 2, H('#e8c870'));
  // el suelo de tablas y la alfombra
  pinta(0, 150, 319, 179, (x, y) => { const tb = Math.floor((y - 150) / 6); if ((y - 150) % 6 === 5 || (x + tb * 37) % 64 === 0) return H('#2a1a10'); return rampa(MADERA2, 1.6 + Math.sin(x * 0.06 + tb * 2) * 0.5 + (azar(x >> 3, tb, 4) - 0.5) * 0.5 - (y - 150) * 0.02, x, y); });
  pinta(110, 160, 230, 176, (x, y) => { const d = Math.hypot((x - 170) / 60, (y - 168) / 8); if (d > 1) return null; return d > 0.85 ? H('#c89a20') : rampa(HS('#5a1a24', '#7a2430', '#9a3a44'), 1.5 + Math.sin(d * 14) * 0.8, x, y); });
});
const MADERA2 = HS('#4a2e1c', '#5e3c24', '#74502e', '#8a623a');
const corazon = (cx, cy, s, u, c) => { const n = Math.floor(u * 60); for (let i = 0; i < n; i++) { const a = i / 60 * Math.PI * 2, x = 16 * Math.sin(a) ** 3, y = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)); const px = Math.round(cx + x * s), py = Math.round(cy + y * s); R.pset(px, py, c); R.pset(px + 1, py, c); }
  return u > 0 && u < 1 ? [cx + 16 * Math.sin(u * Math.PI * 2) ** 3 * s, cy - (13 * Math.cos(u * Math.PI * 2) - 5 * Math.cos(4 * Math.PI * u) - 2 * Math.cos(6 * Math.PI * u) - Math.cos(8 * Math.PI * u)) * s] : null; };
const m5 = (t) => {
  R.copiar(CAMERINO()); const t0 = M2(.672), HA = M2(.727), LO = M2(.845), ROL = M2(.893), KN = ROL + 1.0;
  // las bombillas del espejo, con su halo (una parpadea)
  for (let k = 0; k < 11; k++) for (const [bx, by] of [[104 + k * 12, 29], [104 + k * 12, 109]]) { const off = k === 7 && by === 29 && Math.sin(t * 17) > 0.6; R.disco(bx, by, 2, off ? H('#8a7a5a') : H('#fff6c8')); if (!off) R.pset(bx - 1, by - 1, BL); }
  for (let k = 0; k < 6; k++) for (const bx of [103, 227]) { R.disco(bx, 41 + k * 12, 2, H('#fff6c8')); }
  // el reflejo de Downey en el espejo (más oscuro), recortado al cristal
  const dx = 140, sostiene = t > t0 + 0.4, mira = t > ROL + 0.3;
  escalado(EL.rdj, 132, 117, 1, t, { dir: mira ? -1 : 1, sostiene, dedo: false, sonrisa: t > LO }, [107, 33, 223, 105], (c) => mez(c, H('#2a3a3a'), 0.45));
  // la máscara en su soporte; Downey la coge y la mira
  if (!sostiene) DO.e_mascara(R, 160, 99, 1, { ojos: 0.3 });
  const dibuja = tramo(t, HA + 0.3, LO + 0.15), r = R.actor(EL.rdj, dx, 160, t, { dir: mira ? -1 : 1, sostiene: sostiene && !(dibuja > 0 && dibuja < 1) ? true : false, dedo: dibuja > 0 && dibuja < 1, sonrisa: t > LO, habla: t > HA - 0.4 && t < HA + 0.6 && Math.sin(t * 8) > 0 });
  if (sostiene && !(dibuja > 0 && dibuja < 1)) DO.e_mascara(R, r.mano[0] + (mira ? -2 : 2), r.mano[1] - 3, 1, { ojos: 0.4, brillo: (t * 0.5) % 1 });
  // «loves»: un corazón dibujado en el aire que se queda latiendo y suelta corazones pequeños
  const late = 1 + 0.08 * Math.sin(t * 9) * (t > LO + 0.2 ? 1 : 0), punta = corazon(172, 92, 0.85 * (dibuja >= 1 ? late : 1), dibuja, H('#ff6a8a'));
  if (punta) chispa(punta[0], punta[1], t, AMAL);
  if (dibuja >= 1) { corazon(172, 92, 0.85 * late - 0.08, 1, H('#ffb0c4')); const su = tramo(t, ROL, ROL + 1.6); if (su > 0 && su < 1) for (let k = 0; k < 3; k++) { const x = 160 + k * 12, y = Math.round(80 - su * 40 - k * 4); R.pset(x, y, H('#ff6a8a')); R.pset(x + 2, y, H('#ff6a8a')); R.rect(x - 1, y + 1, x + 3, y + 1, H('#ff6a8a')); R.pset(x + 1, y + 2, H('#ff6a8a')); } }
  // llaman a la puerta: se abre un poco y asoma alguien del equipo
  const ab = tramo(t, KN + 0.2, KN + 0.7); if (ab > 0) { const w = Math.round(ab * 14); R.rect(264, 52, 264 + w, 148, H('#0e0c12')); R.actor(EL.tecnica ?? EL.chica, 262, 150, t, { dir: 1, dedo: ab >= 1, sonrisa: true }); R.rect(264 + w, 52, 266 + w, 148, H('#3a2414')); }
  if (t > KN - 0.1 && t < KN + 0.3) for (let k = 0; k < 3; k++) R.anillo(258, 100, 3 + k * 3, mez(AMAL, K, 0.4), 2);
};
const efectos = [[M1(.095), 'bip'], [M1(.288), 'brillo'],
  [M1(.411) - 0.1, 'golpecito'], [M1(.758), 'ring'], [M1(.92), 'interruptor'],
  [M2(0), 'zumbido'], [M2(.096), 'flash'],
  [M2(.312), 'zumbido'], [M2(.596), 'tic'],
  [M2(.845), 'brillo'], [M2(.893) + 1.0, 'toc']];
T.rodar(E, R, [[0, m1], [M1(.369), m2], [M1(.958), m3], [M2(.224), m4], [M2(.672), m5]], { efectos, año: 2026 });
''')
