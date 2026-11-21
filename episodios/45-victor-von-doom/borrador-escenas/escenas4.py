# Borrador de escenas del ep45, grupo S4: vd-maquina y vd-culpa (formato del 11: E[id] = (título, cabecera, cuerpo)).
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

# ── lo común a las dos escenas: utilidades, texturas, piezas y el último plano de vd-maquina (el pasillo de noche),
# que vd-culpa congela ─────────────────────────────────────────────────────────────────────────────────────────────
COMUN = r'''
const K = hex('#1a1424'), H = (s) => hex(s), ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const hh = (x, y, k = 0) => { const v = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return v - Math.floor(v); };
const rgb = (c) => [c & 255, (c >> 8) & 255, (c >> 16) & 255];
const mez = (a, b, u) => { const A = rgb(a), B = rgb(b); return (0xff000000 | (Math.round(A[2] + (B[2] - A[2]) * u) << 16) | (Math.round(A[1] + (B[1] - A[1]) * u) << 8) | Math.round(A[0] + (B[0] - A[0]) * u)) >>> 0; };
const voz = (t) => E.energia(t);
const VIC = T.VD.victorJovenVD, REED = T.VD.reedJovenVD;
const VERDE = '#24503a', AZUL = '#3a5ac8';
// lo fijo de cada fondo, una vez en su búfer
const CACHE = new Map();
const horno = (k, f) => { if (!CACHE.has(k)) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); CACHE.set(k, b); } return CACHE.get(k); };
// degradado vertical con trama de Bayer
const rampa = (x0, y0, x1, y1, cs) => { const n = cs.length - 1; for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(f)), u = f - i; for (let x = x0; x <= x1; x++) R.pset(x, y, u > bay(x, y) ? cs[i + 1] : cs[i]); } };
// una luz (o una sombra) que se funde con lo que hay debajo
const luz = (cx, cy, rx, ry, col, a) => { for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, cx + rx); x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d >= 1) continue; const g = (1 - d) * a; if (g > bay(x, y) * 0.35) R.pset(x, y, mez(R.pget(x, y), col, Math.min(1, g))); } };
// pared de bloques pintados (con juntas, tono de cada bloque y poros)
const bloques = (x0, y0, x1, y1, [cL, c, cS], k = 0, w = 16, h = 8) => { for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / h), off = fila % 2 ? w / 2 : 0, jy = (y - y0) % h;
  for (let x = x0; x <= x1; x++) { const bx = Math.floor((x - x0 + off) / w), jx = (x - x0 + off) % w; let col;
    if (jy === h - 1 || jx === w - 1) col = cS; else if (jy === 0 || jx === 0) col = cL; else { col = c; const q = hh(bx, fila, k); if (q > 0.72) col = mez(c, cS, 0.22); else if (q < 0.18) col = mez(c, cL, 0.2); if (hh(x, y, k + 3) > 0.94) col = mez(col, cS, 0.45); }
    R.pset(x, y, col); } } };
// tablas de madera con vetas, juntas y nudos (horizontales)
const tablas = (x0, y0, x1, y1, [cL, c, cS], h = 9, k = 0) => { for (let y = y0; y <= y1; y++) { const j = Math.floor((y - y0) / h), jy = (y - y0) % h;
  for (let x = x0; x <= x1; x++) { let col = c; const g = Math.sin(x * 0.06 + j * 3.1 + Math.sin(x * 0.011 + j * 1.7) * 4 + jy * 0.8);
    if (jy === 0) col = cS; else if (jy === 1) col = mez(c, cL, 0.35); else if (g > 0.84) col = mez(c, cS, 0.42); else if (g < -0.88) col = mez(c, cL, 0.3);
    if ((x + j * 61) % 113 === 0) col = cS; const nk = hh(Math.floor(x / 29), j, k); if (nk > 0.9 && Math.hypot((x % 29) - 14, jy - h / 2) < 2) col = mez(c, cS, 0.6);
    R.pset(x, y, col); } } };
// nube de tres tonos
const NUB = [H('#f4f2ee'), H('#d2d6de'), H('#a8b0c0')];
const nube = (x, y, w, tono = NUB, clip) => { x = Math.round(x); y = Math.round(y); const n = Math.max(3, Math.round(w / 9));
  const d = (cx, cy, r, c) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r + r) { const X = cx + i, Y = cy + j; if (!clip || (X >= clip[0] && X <= clip[2] && Y >= clip[1] && Y <= clip[3])) R.pset(X, Y, c); } };
  for (let k = 0; k < n; k++) d(x + Math.round((k + 0.5) * w / n), y + 2, Math.round(w / n * (0.62 + 0.3 * Math.sin(k * 2.3 + w))), tono[2]);
  for (let k = 0; k < n; k++) d(x + Math.round((k + 0.5) * w / n) - 1, y, Math.round(w / n * (0.55 + 0.3 * Math.sin(k * 2.3 + w))), tono[1]);
  for (let k = 1; k < n - 1; k++) d(x + Math.round((k + 0.3) * w / n) - 1, y - 2, Math.max(1, Math.round(w / n * (0.42 + 0.3 * Math.sin(k * 1.7 + w)))), tono[0]); };
const pajaro = (x, y, t, col) => { x = Math.round(x); y = Math.round(y); const a = Math.floor(t * 9) % 2; R.pset(x, y, col); R.pset(x + 1, y, col); R.pset(x + 2, y - 1 + a * 2, col); R.pset(x - 1, y - 1 + a * 2, col); R.pset(x + 3, y - 2 + a * 3, col); R.pset(x - 2, y - 2 + a * 3, col); };
// humo en bolitas que suben y crecen
const humito = (x, y, t, sem, alto = 18, c0 = H('#b8bcc8'), c1 = H('#e8eaf0')) => { for (let k = 0; k < 5; k++) { const f = (t * 0.4 + k / 5 + sem) % 1, r = 0.8 + f * 2.4; if (f > bay(k, Math.floor(t * 8)) * 1.6) continue; R.disco(x + Math.sin(f * 5 + sem * 9) * 2, y - f * alto, r, mez(c0, c1, f)); } };
// la venda de la mejilla de Victor (después de la explosión), sobre la cara que devuelve R.actor
const venda = (r, dir) => { if (!r) return; const cx = r.cabeza[0] + (dir > 0 ? 2 : -3), cy = r.cabeza[1] + 8;
  R.rect(cx - 1, cy - 1, cx + 2, cy + 1, H('#8a8690')); R.rect(cx, cy - 1, cx + 1, cy + 1, H('#f6f4ec')); R.pset(cx - 1, cy, H('#f6f4ec')); R.pset(cx + 2, cy, H('#e8e4d8')); R.pset(cx + 1, cy, H('#d8d2c4')); };
// la maleta de cuero que lleva en la mano (el asa en la mano)
const maletaMano = (m) => { if (!m) return; const [x, y] = m.map(Math.round); R.linea(x - 2, y, x + 2, y, K); R.pset(x - 2, y + 1, K); R.pset(x + 2, y + 1, K);
  R.rect(x - 7, y + 2, x + 7, y + 11, K); R.rect(x - 6, y + 3, x + 6, y + 10, H('#8a5a32')); R.rect(x - 6, y + 3, x + 6, y + 3, H('#b07a48')); R.rect(x - 6, y + 9, x + 6, y + 10, H('#5e3a1e'));
  R.rect(x - 3, y + 3, x - 3, y + 10, H('#d8b070')); R.rect(x + 3, y + 3, x + 3, y + 10, H('#d8b070')); R.pset(x - 6, y + 3, H('#e8c060')); R.pset(x + 6, y + 3, H('#e8c060')); R.pset(x + 1, y + 6, H('#e85a4a')); R.pset(x + 2, y + 6, H('#f0e0a0')); };
// el retrato de su madre (el del libro): marco dorado ovalado, la melena negra y el chal morado; (x, y) arriba a la izquierda, 22 × 28
const retrato = (x, y, o = {}) => { x = Math.round(x); y = Math.round(y); const cx = x + 11, cy = y + 14;
  for (let j = -15; j <= 15; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i / 11.5, j / 14.5); if (d > 1) continue; const X = cx + i, Y = cy + j;
    let c; if (d > 0.93) c = K; else if (d > 0.8) c = (i + j < 0) ? H('#f0d070') : (i + j > 6 ? H('#a87a28') : H('#d8a840')); else if (d > 0.76) c = H('#5a3a18');
    else { c = j > 6 ? (Math.abs(i) < 8 ? H('#5a2a7a') : H('#3a2a4a')) : H('#3a2a4a'); const hair = Math.hypot(i / 6.5, (j + 1) / 9.5) < 1, face = Math.hypot(i / 3.6, (j + 2) / 4.6) < 1;
      if (hair) c = H('#1c1424'); if (face) c = H('#e8c098'); if (j > 6 && Math.abs(i) < 8) c = (i + j) % 3 === 0 ? H('#6a3a8a') : H('#5a2a7a'); if (j === 7 && i % 2 === 0 && Math.abs(i) < 8) c = H('#c8a040'); }
    R.pset(X, Y, c); }
  R.pset(cx - 2, cy - 2, K); R.pset(cx + 1, cy - 2, K); R.pset(cx - 1, cy + 1, H('#b8604a')); R.pset(cx, cy + 1, H('#b8604a')); R.pset(cx - 3, cy - 1, H('#f0b8a0'));
  R.pset(cx - 7, cy - 9, H('#fff0c0')); R.pset(cx - 6, cy - 10, H('#fff0c0'));
  if (o.grieta) { R.linea(cx + 2, cy - 11, cx - 1, cy - 3, H('#e8f0f8')); R.linea(cx - 1, cy - 3, cx + 3, cy + 4, H('#e8f0f8')); }
  if (o.hollin) for (let k = 0; k < 40; k++) { const a = hh(k, 1, 77) * 6.28, r = Math.sqrt(hh(k, 2, 77)) * 10; if (hh(k, 3, 77) < o.hollin) R.pset(Math.round(cx + Math.cos(a) * r * 0.8), Math.round(cy + Math.sin(a) * r), H('#2a2830')); } };
// el reverso del retrato (cartón con su pie), boca abajo sobre la mesa
const retratoReves = (x, y) => { x = Math.round(x); y = Math.round(y); const cx = x + 11, cy = y + 14;
  for (let j = -15; j <= 15; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i / 11.5, j / 14.5); if (d > 1) continue; R.pset(cx + i, cy + j, d > 0.93 ? K : d > 0.8 ? H('#a87a28') : ((i + j * 3) % 7 === 0 ? H('#8a6a48') : H('#a8885e'))); }
  R.linea(cx, cy - 2, cx + 5, cy + 12, K); R.linea(cx + 1, cy - 2, cx + 6, cy + 12, H('#5a3a18')); };
// la balanza (26 × 22): inc −1..1 (1: baja el plato derecho); en el izquierdo, la medalla; en el derecho, el dedo que señala fuera
const balanza = (inc, med = true, dedo = true) => () => { const by = 6, dy = Math.round(inc * 3), lx = 3, rx = 22, ly = by - dy, ry = by + dy;
  R.rect(7, 19, 18, 21, K); R.rect(8, 19, 17, 20, H('#8a5a32')); R.rect(8, 19, 17, 19, H('#b07a48'));
  R.rect(11, 4, 14, 19, K); R.rect(12, 4, 13, 18, H('#e8b848')); R.rect(13, 5, 13, 18, H('#a87a28'));
  R.linea(lx, ly - 1, rx, ry - 1, K); R.linea(lx, ly + 1, rx, ry + 1, K); R.linea(lx, ly, rx, ry, H('#f0c858')); R.disco(12.5, by, 1.8, K); R.pset(12, by, H('#fff0a0')); R.pset(13, by, H('#e8b848'));
  for (const [px, py, d] of [[lx, ly, -1], [rx, ry, 1]]) { R.linea(px, py, px - 3, py + 7, H('#c8c0a8')); R.linea(px, py, px + 3, py + 7, H('#c8c0a8'));
    R.rect(px - 5, py + 7, px + 5, py + 9, K); R.rect(px - 4, py + 7, px + 4, py + 8, H('#e8b848')); R.rect(px - 4, py + 8, px + 4, py + 8, H('#a87a28')); }
  if (med) { const x = lx, y = ly + 3; R.linea(x - 2, y - 2, x, y + 1, H('#c83a3a')); R.linea(x + 2, y - 2, x, y + 1, H('#3a5ac8')); R.disco(x, y + 2.5, 2.4, K); R.disco(x, y + 2.5, 1.7, H('#f0c040')); R.pset(x - 1, y + 2, H('#fff0a0')); }
  if (dedo) { const x = rx - 3, y = ry + 3; R.rect(x - 1, y, x + 3, y + 4, K); R.rect(x, y + 1, x + 2, y + 3, H('#f8f8f4')); R.rect(x + 3, y + 1, x + 7, y + 2, K); R.rect(x + 3, y + 1, x + 6, y + 1, H('#f8f8f4')); R.pset(x + 2, y + 3, H('#c8ccd8')); R.pset(x - 1, y + 2, H('#e84a3a')); } };

// ── el último plano de vd-maquina: el pasillo de la residencia, de noche. Victor, con la venda y la maleta, se va hacia
// la izquierda; se abre la 216 y sale Reed; Victor se para y se vuelve con rabia. TT: instantes (s) de vd-maquina
const pasilloFinal = (t, TT) => {
  const o = { encuadre: 'campus', camara: 'pasillo', noche: true }; T.universidad(R, t, o);
  // la 216 se abre: el cuarto de Reed encendido, la luz cálida en el suelo
  const ab = ease(tramo(t, TT.abre, TT.abre + 0.5));
  if (ab > 0) { const w = Math.round(24 * ab); R.rect(291, 56, 290 + w, 137, H('#f0c870')); for (let y = 58; y < 137; y += 9) R.rect(291, y, 290 + w, y, H('#e8b860'));
    R.rect(291, 100, 290 + Math.min(w, 10), 128, H('#c89a50')); R.rect(291, 56, 291 + Math.round(4 * (1 - ab)), 137, H('#6a4428'));
    for (let y = 138; y < 180; y++) { const s = (y - 138) * 0.55; for (let x = Math.round(291 - s); x <= Math.round(290 + w + s * 0.3); x++) if ((1 - (y - 138) / 46) * ab * 0.5 > bay(x, y) * 0.8) R.pset(x, y, mez(R.pget(x, y), H('#f0c870'), 0.35)); } }
  // Reed sale de su cuarto y alarga la mano
  const rs = tramo(t, TT.sale, TT.sale + 0.8); if (ab > 0.6) R.actor(REED, Math.round(lerp(296, 268, ease(rs))), 152, t, { dir: -1, anda: rs > 0 && rs < 1, dedo: t > TT.llama, triste: t > TT.mira + 0.4 });
  // Victor cruza con la maleta, se para y se vuelve
  const u = tramo(t, TT.ini + 0.1, TT.para), x = Math.round(lerp(236, 150, ease(u))), vuelve = t > TT.mira, dir = vuelve ? 1 : -1;
  const r = R.actor(VIC, x, 152, t, { dir, anda: u > 0 && u < 1, sostiene: dir > 0 ? [x + 13, 141] : [x + 1, 141], enfado: vuelve, salto: vuelve && t < TT.mira + 0.15 ? 1 : 0 });
  venda(r, dir); maletaMano(r?.mano);
  if (vuelve && t < TT.mira + 1.2 && t > TT.mira + 0.2) R.bocadillo(x + 8, 120, { icono: '!' });
  T.universidadDelante(R, t, o);
};
'''

# instantes del último plano de vd-maquina (s), los mismos en las dos escenas: corte en «and Victor» (69,44 s), la 216
# se abre en «going» (70,16), Reed sale y llama en «that enemy» (71,1–71,3), Victor se vuelve en «enemy» (71,3)
TT14 = '{ ini: 69.44, para: 71.0, abre: 70.16, sale: 70.55, llama: 71.1, mira: 71.3 }'

E['vd-maquina'] = ('La máquina', '''// VD-MAQUINA (frases 12–14), sin año (el pasado de Victor). Catorce planos, cortados en la palabra inglesa:
// 1. el laboratorio de noche: Victor arrastra el cable desde el banco y lo enchufa a la máquina en «machine»; las
//    bombillas se encienden y el aro empieza a girar en «other side»; Atom (luciérnaga) mira junto a la ventana;
// 2. la mesa de planos de cerca: el plano del aro, el retrato de su madre; la mano aprieta un tornillo y en «mother»
//    endereza el retrato, que brilla;
// 3. la pizarra: Victor escribe; Reed entra en «Reed», mira los cálculos, le habla en «tells him» y en «mistake» señala
//    el 0.8, que queda rodeado de tiza roja;
// 4. la consola de cerca: la mano de Reed da golpecitos en el reloj; en «turns it on» la aguja sube al rojo y en
//    «terrible» se enciende el piloto; la mano de Victor agarra la palanca, como quien protege lo suyo;
// 5. la pizarra de cerca (GAG): Atom coge una tiza para arreglar el 0.8 y en «warning» la tiza se le parte;
// 6. el muro de las sombras: la sombra de Reed señala; la de Victor se encoge en «isn't as good» y en «truly cares»
//    crece y aprieta los puños, junto al retrato de su madre clavado en la pared;
// 7. el laboratorio: Victor echa a Reed en «sends him away», se sube al cajón, baja la palanca y la máquina carga;
//    golpe en «explota+3»: destello blanco y humo, sin heridas (solo sus zapatos asoman tras el cajón);
// 8. la enfermería: Victor despierta en «wakes up» con la venda, se la toca en «scar»; la enfermera deja la carta y en
//    «expelled» se abre con su «X» roja;
// 9. la mesa de planos destrozada, de día: la mano saca el retrato boca abajo, le da la vuelta y le limpia el hollín;
// 10. el aro roto de cerca: queda una puerta de luz violeta con la silueta de su madre; en «closed again» se cierra;
// 11. su cuarto: mete el retrato en la maleta en «decision», la cierra de golpe en «shape» y mira a la ventana de Reed;
// 12. la pizarra en rojo, lo que Victor se cuenta: Reed entra a escondidas y en «sabotaged» le cambia el número;
// 13. el anuario sobre la manta: la mano rodea con lápiz rojo la foto de Reed en «enemy»;
// 14. el pasillo de noche: Victor se va con la maleta; Reed sale de la 216 y le llama; Victor se vuelve con rabia
//     (este último plano es el que congela vd-culpa).''', _en('vd-maquina', COMUN + r'''
const TT = ''' + TT14 + r''';
const P2 = @T(5.48), P3 = @T(9.66), P4 = @T(16.20), P5 = @T(20.98), P6 = @T(25.56), P7 = @T(32.07), P8 = @T(39.03), P9 = @T(45.05), P10 = @T(49.77), P11 = @T(53.76), P12 = @T(59.18), P13 = @T(64.90), P14 = @T(69.44);

// ── 1 · el laboratorio de noche: Victor enchufa la máquina ───────────────────────────────────────────────────────
const p1 = (t) => {
  const enchufa = @T(3.10), gira = @T(4.42), carga = 0.06 + 0.22 * ease(tramo(t, enchufa, gira + 0.6)) + 0.02 * Math.sin(t * 5);
  const o = { encuadre: 'laboratorio', carga }; T.universidad(R, t, o);
  // Atom, luciérnaga, junto a la ventana: se acerca a mirar cuando se enciende el aro
  const ua = tramo(t, gira - 0.4, gira + 0.8);
  T.AT.luciernaga(R, lerp(70, 112, ease(ua)) + Math.sin(t * 1.6) * 3, lerp(64, 52, ease(ua)) + Math.sin(t * 2.3) * 2, t, { dir: 1, brillo: 0.7, cara: t > gira ? 'sorpresa' : 'normal' });
  // Victor arrastra el cable desde el banco hasta la plataforma
  const u = tramo(t, 0.3, enchufa - 0.3), x = Math.round(lerp(30, 156, ease(u))), anda = u > 0 && u < 1;
  const enchu = t > enchufa - 0.3, mano = enchu ? [176, 142] : undefined;
  const r = R.actor(VIC, x, 150, t, { dir: 1, anda, sostiene: mano ?? [x + 16, 140], sonrisa: t > gira + 0.3, sorpresa: t > enchufa && t < gira });
  const m = r?.mano ?? [x + 15, 140];
  // el cable: del enchufe del banco, por el suelo, hasta la mano; con su clavija
  const cx0 = 92, cy0 = 131; let px = cx0, py = cy0;
  for (let i = 1; i <= 24; i++) { const f = i / 24, X = lerp(cx0, m[0], f), Y = Math.min(151, lerp(cy0, m[1], f) + Math.sin(f * Math.PI) * 22); R.linea(px, py + 1, X, Y + 1, K); R.linea(px, py - 2, X, Y - 2, K); R.linea(px, py, X, Y, H('#e8783a')); R.linea(px, py - 1, X, Y - 1, H('#f0a060')); px = X; py = Y; }
  R.rect(m[0] - 1, m[1] - 2, m[0] + 3, m[1] + 1, K); R.rect(m[0], m[1] - 1, m[0] + 2, m[1], H('#e8b848'));
  if (t > enchufa && t < enchufa + 0.35) for (let k = 0; k < 6; k++) { const a = k * 1.05 + t * 9, rr = 2 + (t - enchufa) * 18; R.pset(Math.round(m[0] + 2 + Math.cos(a) * rr), Math.round(m[1] + Math.sin(a) * rr), k % 2 ? H('#ffe070') : H('#ffffff')); }
  T.universidadDelante(R, t, o);
};

// ── 2 · la mesa de planos de cerca, de noche (y destrozada, en el plano 9) ─────────────────────────────────────
// fondo local: la pared de bloques con el tablero de herramientas y la ventanita, el banco de madera con la luz del
// flexo, el plano azul del aro, el chasis con la válvula, la bandeja de válvulas, la bobina de cobre y el soldador
const mesaPlanos = (roto) => horno('mesa' + roto, () => {
  const fr = roto ? [H('#6a7084'), H('#545a6e'), H('#3e4456')] : [H('#3a4058'), H('#2c3248'), H('#1e2236')];
  bloques(0, 0, 319, 47, fr, 3, 20, 10);
  // la ventanita (x 186–238, y 10–40)
  R.rect(184, 8, 240, 42, K); if (roto) rampa(187, 11, 237, 39, [H('#a8c0dc'), H('#d8e0e8'), H('#f0dcc0')]); else rampa(187, 11, 237, 39, [H('#0e1230'), H('#1a2248'), H('#2a3460')]);
  if (!roto) { for (let k = 0; k < 14; k++) R.pset(188 + Math.floor(hh(k, 1, 5) * 48), 12 + Math.floor(hh(k, 2, 5) * 16), H('#e8e8ff')); R.disco(226, 18, 4, H('#f4f0d8')); R.disco(228, 17, 3.5, H('#1a2248')); }
  for (let x = 187; x <= 237; x++) { const hgt = 32 + Math.round(3 * Math.sin(x * 0.3)) + ((x >> 3) % 2 ? -3 : 0); for (let y = hgt; y <= 39; y++) R.pset(x, y, roto ? H('#7a6a6a') : H('#141428')); }
  for (const [wx, wy] of [[196, 34], [214, 33], [230, 35]]) R.rect(wx, wy, wx + 1, wy + 1, roto ? H('#c8c0b8') : H('#f0c860'));
  R.rect(211, 11, 212, 39, H('#4a4e60')); R.rect(187, 25, 237, 26, H('#4a4e60')); R.rect(184, 40, 240, 42, H('#5a5e70')); R.rect(184, 40, 240, 40, H('#7a7e90'));
  // el tablero de herramientas (x 30–150, y 18–44)
  R.rect(28, 16, 152, 46, K); R.rect(29, 17, 151, 46, roto ? H('#9a8a6a') : H('#6a5a40')); for (let y = 20; y < 46; y += 4) for (let x = 32; x < 150; x += 4) R.pset(x, y, roto ? H('#6a5a40') : H('#3e3426'));
  const herr = (x, f) => { f(x); }; const met = roto ? H('#b8bcc8') : H('#8a8e9c'), metS = roto ? H('#7a7e8c') : H('#5a5e6c');
  herr(38, (x) => { R.rect(x, 20, x + 2, 40, K); R.rect(x, 20, x + 1, 39, met); R.disco(x + 1, 21, 3, K); R.disco(x + 1, 21, 2, met); R.rect(x, 19, x + 1, 20, K); });
  herr(52, (x) => { R.linea(x, 20, x + 6, 42, K); R.linea(x + 1, 20, x + 7, 42, met); R.linea(x + 8, 20, x + 2, 42, K); R.linea(x + 9, 20, x + 3, 42, metS); R.rect(x + 4, 30, x + 5, 31, H('#c83a3a')); });
  herr(70, (x) => { R.rect(x + 2, 22, x + 3, 42, H('#8a5a32')); R.rect(x - 2, 19, x + 7, 24, K); R.rect(x - 1, 20, x + 6, 23, met); });
  herr(86, (x) => { R.rect(x, 26, x + 2, 42, H('#c8a040')); R.rect(x, 20, x + 2, 26, K); R.rect(x + 1, 20, x + 1, 25, met); });
  herr(96, (x) => { R.rect(x, 22, x + 2, 42, H('#3a6ac8')); R.rect(x, 18, x + 2, 22, met); });
  herr(110, (x) => { R.disco(x + 6, 30, 7, K); R.disco(x + 6, 30, 6, H('#b8743a')); R.disco(x + 6, 30, 3, H('#6a5a40')); for (let a = 0; a < 6.28; a += 0.5) R.pset(Math.round(x + 6 + Math.cos(a) * 5), Math.round(30 + Math.sin(a) * 5), H('#e8a050')); });
  herr(128, (x) => { R.rect(x, 22, x + 14, 26, K); R.rect(x + 1, 23, x + 13, 25, H('#e8c060')); R.rect(x + 6, 23, x + 7, 25, H('#5ac85a')); R.rect(x + 2, 30, x + 12, 40, K); R.rect(x + 3, 31, x + 11, 39, met); });
  // el canto del banco y el tablero de madera (y 48–179)
  R.rect(0, 46, 319, 49, K); R.rect(0, 48, 319, 49, roto ? H('#8a6a48') : H('#6a4a2a'));
  tablas(0, 50, 319, 179, roto ? [H('#c8a478'), H('#a8845a'), H('#6a4a2a')] : [H('#9a7048'), H('#7a5232'), H('#4a2e1a')], 13, 2);
  // el plano azul del aro (x 96–232, y 66–150), con la esquina doblada
  const pl = roto ? [H('#4a5a7a'), H('#7a8aa8')] : [H('#2a4a8a'), H('#5a7ac8')];
  R.rect(95, 65, 233, 151, K); R.rect(96, 66, 232, 150, pl[0]);
  for (let y = 70; y < 150; y += 8) for (let x = 96; x <= 232; x++) if (x % 2) R.pset(x, y, pl[1]); for (let x = 100; x < 232; x += 8) for (let y = 66; y <= 150; y++) if (y % 2) R.pset(x, y, pl[1]);
  const tz = H('#e8f0ff'); for (let a = 0; a < 6.283; a += 0.02) { R.pset(Math.round(160 + Math.cos(a) * 30), Math.round(106 + Math.sin(a) * 26), tz); R.pset(Math.round(160 + Math.cos(a) * 23), Math.round(106 + Math.sin(a) * 20), tz); }
  for (let k = 0; k < 8; k++) { const a = k * 0.785; R.linea(160 + Math.cos(a) * 23, 106 + Math.sin(a) * 20, 160 + Math.cos(a) * 30, 106 + Math.sin(a) * 26, tz); }
  R.linea(160, 80, 160, 70, tz); R.linea(138, 86, 130, 74, tz); R.linea(182, 86, 190, 74, tz); R.rect(122, 96, 128, 116, tz); R.rect(123, 97, 127, 115, pl[0]); R.rect(192, 96, 198, 116, tz); R.rect(193, 97, 197, 115, pl[0]);
  R.linea(110, 140, 210, 140, tz); R.linea(110, 138, 110, 142, tz); R.linea(210, 138, 210, 142, tz);
  R.numero('40', 160, 148, { color: tz, sombra: false }); R.numero('0.8', 214, 80, { color: H('#f0e070'), sombra: false });
  R.poligono([[220, 66], [232, 66], [232, 78]], roto ? H('#9aa8c0') : H('#8aa0d8')); R.linea(220, 66, 232, 78, K);
  // el flexo (base x 30, y 120): brazo, cabeza y su luz
  R.disco(34, 132, 9, K); R.disco(34, 131, 8, H('#2e5a3a')); R.disco(32, 129, 3, H('#4a8a5a'));
  if (!roto) { R.linea(34, 130, 52, 84, K); R.linea(35, 130, 53, 84, H('#2e5a3a')); R.linea(52, 84, 76, 70, K); R.linea(53, 85, 77, 71, H('#2e5a3a'));
    R.poligono([[70, 62], [86, 66], [84, 78], [70, 76]], K); R.poligono([[71, 64], [84, 67], [83, 76], [71, 74]], H('#3a7a4a')); R.disco(80, 76, 3, H('#fff0b0')); }
  else { R.linea(34, 130, 62, 116, K); R.linea(35, 130, 63, 116, H('#2e5a3a')); R.poligono([[60, 108], [76, 112], [74, 124], [60, 120]], K); R.poligono([[61, 110], [74, 113], [73, 122], [61, 119]], H('#3a7a4a')); R.linea(66, 124, 72, 128, H('#c8e0ff')); }
  // la bandeja de válvulas (x 14–74, y 140–176)
  R.rect(12, 140, 76, 176, K); R.rect(13, 141, 75, 175, H('#5a5e6a')); R.rect(13, 141, 75, 142, H('#8a8e9a'));
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { const vx = 20 + i * 15, vy = 146 + j * 15; if (roto && (i + j) % 3 === 0) { R.linea(vx, vy + 6, vx + 7, vy + 9, H('#c8e0ff')); continue; }
    R.rect(vx, vy, vx + 7, vy + 11, K); R.rect(vx + 1, vy + 1, vx + 6, vy + 9, H('#a8c8d8')); R.rect(vx + 2, vy + 3, vx + 5, vy + 7, H('#5a6070')); R.rect(vx + 1, vy + 10, vx + 6, vy + 11, H('#2a2a30')); R.pset(vx + 2, vy + 1, H('#ffffff')); }
  // la bobina de cobre (x 248–276, y 112–138) y el soldador en su soporte (abajo a la derecha)
  R.rect(240, 56, 268, 82, K); for (let y = 57; y < 82; y++) R.rect(241, y, 267, y, y % 2 ? H('#c87a3a') : H('#e8a050')); R.rect(241, 56, 244, 82, H('#5a3a20')); R.rect(264, 56, 267, 82, H('#5a3a20')); R.rect(251, 57, 257, 81, H('#3a2a20'));
  R.linea(238, 172, 300, 150, K); R.linea(238, 171, 300, 149, H('#8a8e9c')); R.rect(296, 146, 310, 152, K); R.rect(297, 147, 309, 151, H('#8a3a2a')); R.rect(300, 156, 318, 166, K); R.rect(301, 157, 317, 165, H('#4a4e5a'));
  // tornillos, un lápiz y una regla
  for (let k = 0; k < 10; k++) { const x = 84 + Math.floor(hh(k, 1, 9) * 60), y = 154 + Math.floor(hh(k, 2, 9) * 20); R.rect(x, y, x + 1, y + 1, K); R.pset(x, y, H('#c8ccd8')); }
  R.linea(150, 164, 196, 172, K); R.linea(150, 163, 196, 171, H('#e8c040')); R.rect(194, 170, 197, 172, H('#e8a0a0'));
  R.rect(236, 152, 300, 156, K); R.rect(237, 153, 299, 155, H('#e8e0c8')); for (let x = 240; x < 299; x += 4) R.pset(x, 153, K);
  if (roto) { // hollín, cristales, tornillos por todas partes y el café derramado
    for (let y = 50; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 170) / 150, (y - 100) / 90); if (d < 1 && hh(x >> 2, y >> 2, 41) > 0.55 + d * 0.4 && bay(x, y) < 0.5) R.pset(x, y, mez(R.pget(x, y), H('#1e1c22'), 0.55)); }
    for (let k = 0; k < 18; k++) { const x = 90 + Math.floor(hh(k, 1, 13) * 180), y = 70 + Math.floor(hh(k, 2, 13) * 100); R.poligono([[x, y], [x + 4, y + 1], [x + 1, y + 4]], H('#c8e0f0')); R.pset(x + 1, y + 1, H('#ffffff')); }
    for (let k = 0; k < 24; k++) { const x = Math.floor(hh(k, 3, 13) * 310), y = 60 + Math.floor(hh(k, 4, 13) * 115); R.rect(x, y, x + 1, y + 1, K); R.pset(x, y, H('#c8ccd8')); }
    for (let y = 152; y < 172; y++) for (let x = 84; x < 140; x++) if (Math.hypot((x - 112) / 28, (y - 162) / 8) < 1) R.pset(x, y, (x + y) % 5 ? H('#4a2a18') : H('#6a3a20'));
    R.rect(130, 150, 146, 162, K); R.rect(131, 151, 145, 161, H('#e8e0d0')); R.rect(131, 156, 145, 157, H('#c83a3a'));
    // el plano quemado por los bordes
    for (let y = 66; y <= 150; y++) for (let x = 96; x <= 232; x++) { const e = Math.min(x - 96, 232 - x, y - 66, 150 - y) + hh(x >> 1, y >> 1, 17) * 7; if (e < 4) R.pset(x, y, e < 2 ? H('#1a1416') : H('#5a3a20')); }
  }
});
const mesaVida = (t, roto) => {
  if (!roto) { // la luz del flexo que tiembla, la taza que humea, el soldador que echa humo, una polilla
    const f = 0.42 + 0.03 * Math.sin(t * 23) * (Math.sin(t * 1.3) > 0.8 ? 1 : 0);
    luz(150, 112, 150, 72, H('#ffe0a0'), f); luz(80, 78, 10, 8, H('#fff0b0'), 0.8);
    R.rect(204, 52, 216, 66, K); R.rect(205, 53, 215, 65, H('#e8e0d0')); R.rect(205, 53, 215, 54, H('#5a3a20')); R.rect(216, 56, 219, 62, K); R.rect(217, 57, 218, 61, H('#e8e0d0')); humito(210, 50, t, 0.3, 16);
    humito(240, 170, t, 0.7, 14, H('#9a9ca8'), H('#d8dae0'));
    const pa = t * 2.1; R.pset(Math.round(80 + Math.cos(pa) * 14), Math.round(70 + Math.sin(pa * 1.7) * 7), H('#e8dcc0')); R.pset(Math.round(81 + Math.cos(pa) * 14), Math.round(70 + Math.sin(pa * 1.7) * 7) - (Math.floor(t * 20) % 2), H('#c8b898'));
    // las válvulas de la bandeja tienen el filamento encendido
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { const vx = 20 + i * 15, vy = 146 + j * 15; R.rect(vx + 3, vy + 4, vx + 4, vy + 6, Math.sin(t * 3 + i + j * 2) > 0 ? H('#ff9a3a') : H('#c85a2a')); }
  } else { // el haz de la mañana con motas, el hilo de humo del chasis y la bobina que aún suelta una chispa
    for (let y = 0; y < 180; y++) { const x0 = 190 + (y - 40) * 0.55; for (let x = Math.round(x0); x < x0 + 50; x++) if (x >= 0 && x < 320 && y > 40 && bay(x, y) < 0.22) R.pset(x, y, mez(R.pget(x, y), H('#fff4d8'), 0.25)); }
    for (let k = 0; k < 16; k++) { const f = (t * 0.05 + hh(k, 1, 31)) % 1, y = 50 + hh(k, 2, 31) * 120, x = 190 + (y - 40) * 0.55 + hh(k, 3, 31) * 48 + Math.sin(t + k) * 3; R.pset(Math.round(x), Math.round(y - f * 20), H('#fff8e8')); }
    humito(200, 116, t, 0.2, 26, H('#6a6a74'), H('#b8b8c4')); humito(160, 100, t, 0.6, 30, H('#6a6a74'), H('#b8b8c4'));
    if (Math.sin(t * 13) > 0.85) for (let k = 0; k < 3; k++) R.pset(250 + Math.floor(hh(k, Math.floor(t * 10), 3) * 26), 114 + Math.floor(hh(k, 9, Math.floor(t * 10)) * 20), k % 2 ? H('#ffd060') : H('#ffffff'));
  }
  // el chasis con la válvula (x 236–268, y 122–146)
  R.rect(236, 122, 268, 146, K); R.rect(237, 123, 267, 145, roto ? H('#6a6a74') : H('#8a8e9c')); R.rect(237, 123, 267, 124, H('#b8bcc8')); R.rect(237, 140, 267, 145, roto ? H('#4a4a54') : H('#6a6e7c'));
  for (const [sx, sy] of [[240, 127], [264, 127], [240, 137], [264, 137]]) { R.pset(sx, sy, K); R.pset(sx + 1, sy, H('#d8dce4')); }
  if (!roto) { R.rect(248, 108, 256, 123, K); R.rect(249, 109, 255, 122, H('#a8c8d8')); R.rect(250, 113, 254, 119, H('#5a6070')); R.rect(251, 115, 253, 117, Math.sin(t * 4) > 0 ? H('#ff9a3a') : H('#e86a2a')); R.pset(250, 110, H('#ffffff')); }
  else { R.linea(248, 120, 256, 116, H('#c8e0ff')); R.linea(250, 122, 253, 118, H('#c8e0ff')); }
};
const p2 = (t) => {
  R.copiar(mesaPlanos(false)); mesaVida(t, false);
  // el retrato de su madre, de pie sobre el banco (x 282–304, y 58–86): en «mother» la mano lo endereza y brilla
  const madre = @T(7.22), endereza = tramo(t, madre - 0.5, madre), brilla = tramo(t, madre, madre + 0.6) * (1 - 0.4 * tramo(t, madre + 1.6, madre + 2.4));
  R.linea(294, 86, 300, 92, K); retrato(282 - Math.round(4 * (1 - ease(endereza))), 58 + Math.round(2 * (1 - endereza)), {});
  if (brilla > 0) { luz(293, 72, 22, 22, H('#ffd890'), 0.5 * brilla); for (let k = 0; k < 5; k++) { const a = t * 2 + k * 1.26, r = 16 + Math.sin(t * 3 + k) * 2; R.pset(Math.round(293 + Math.cos(a) * r), Math.round(72 + Math.sin(a) * r * 1.2), H('#fff0c0')); } }
  // la mano de Victor: aprieta el tornillo del chasis y luego endereza el retrato
  const va = tramo(t, madre - 0.9, madre - 0.4), vuelve = tramo(t, madre + 1.2, madre + 1.9);
  const gira = Math.sin(t * 9) * (va < 0.05 ? 1 : 0);
  const wx = lerp(lerp(286, 312, ease(va)), 296, ease(vuelve)), wy = lerp(lerp(138 + gira, 90, ease(va)), 152, ease(vuelve));
  if (va < 0.5) { const tx = wx - 13, ty = wy - 1; R.linea(tx, ty, tx - 12, ty - 6, K); R.linea(tx, ty + 1, tx - 12, ty - 5, H('#c8ccd8')); R.rect(Math.round(tx - 2), Math.round(ty - 2), Math.round(tx + 2), Math.round(ty + 2), H('#c83a3a')); }
  else { R.linea(262, 156, 278, 150, K); R.linea(262, 155, 278, 149, H('#c8ccd8')); R.rect(276, 147, 282, 151, K); R.rect(277, 148, 281, 150, H('#c83a3a')); }
  T.brazo(R, 340, lerp(178, 118, ease(va)) + 40 * ease(vuelve), wx, wy, VERDE, -1, {});
};

// ── 3 · la pizarra: Reed mira los cálculos y señala el error ─────────────────────────────────────────────────
const ERR = [150, 120];
const p3 = (t) => {
  const reed = @T(9.30), mira = @T(10.68), dice = @T(11.90), senala = @T(13.60), error = @T(15.48);
  const o = { encuadre: 'laboratorio', camara: 'pizarra', error: ERR, rodea: tramo(t, error - 0.5, error + 0.3), carga: 0.25 };
  T.universidad(R, t, o);
  // Victor escribe en la parte de abajo de la pizarra, de espaldas; en «tells him» se vuelve
  const escribe = t < dice + 0.3, vx = 214;
  const rv = R.actor(VIC, vx, 150, t, { dir: escribe ? 1 : -1, sostiene: escribe ? [vx + 20, 124 + Math.round(Math.sin(t * 7) * 2)] : undefined, sorpresa: t > error - 0.2 && t < error + 0.6, enfado: t > error + 0.6 });
  if (escribe && rv?.mano) { R.rect(rv.mano[0], rv.mano[1] - 3, rv.mano[0] + 1, rv.mano[1], H('#f4f4ec')); if (Math.sin(t * 7) > 0.6) R.pset(rv.mano[0] + 2, rv.mano[1] - 2, H('#f4f4ec')); }
  // Reed entra con dos libros, se para, mira la pizarra, le habla y señala el 0.8
  const u = tramo(t, P3, mira - 0.1), rx = Math.round(lerp(-12, 126, ease(u)));
  const habla = t > dice && t < error + 0.4 && voz(t) > 0.15;
  const rr = R.actor(REED, rx, 150, t, { dir: 1, anda: u > 0 && u < 1, sostiene: t < senala ? true : undefined, dedo: t >= senala, sorpresa: t > mira && t < dice, habla, sonrisa: t > dice && t < senala });
  if (t < senala && rr?.mano) { const [mx, my] = rr.mano; R.rect(mx - 3, my - 4, mx + 3, my + 1, K); R.rect(mx - 2, my - 3, mx + 2, my - 2, H('#c83a3a')); R.rect(mx - 2, my - 1, mx + 2, my, H('#3a6ac8')); }
  if (t > mira && t < dice) R.bocadillo(rx + 8, 116, { icono: '?' });
  T.universidadDelante(R, t, o);
};

// ── 4 · la consola de mando de cerca ───────────────────────────────────────────────────────────────────────────
// fondo local: la pared con el haz de cables, la luz violeta de la máquina que entra por la derecha y el panel de
// acero remachado con los dos relojes, los interruptores con sus pilotos, la placa del «440», las franjas de peligro y
// la palanca grande del pomo rojo
const consola = () => horno('consola', () => {
  bloques(0, 0, 319, 30, [H('#343a52'), H('#283046'), H('#1a1e30')], 7, 20, 10);
  for (let k = 0; k < 4; k++) { const y = 20 + k * 3; R.rect(0, y, 262, y + 2, K); R.rect(0, y, 262, y + 1, [H('#3a3a44'), H('#8a3a2a'), H('#2a4a7a'), H('#4a4a20')][k]); }
  for (let x = 30; x < 260; x += 70) { R.rect(x, 18, x + 3, 32, K); R.rect(x + 1, 19, x + 2, 31, H('#8a8e9c')); }
  R.rect(258, 16, 272, 34, K); R.rect(259, 17, 271, 33, H('#5a5e6c')); R.rect(259, 17, 271, 18, H('#8a8e9c')); R.pset(265, 25, H('#e8c040'));
  // el panel (x 0–319, y 32–168)
  R.rect(0, 32, 319, 170, K);
  for (let y = 33; y <= 169; y++) for (let x = 0; x <= 319; x++) { let c = (y + Math.floor(hh(x >> 4, y, 3) * 3)) % 3 ? H('#6a7080') : H('#626878'); if (hh(x, y >> 1, 4) > 0.97) c = H('#7a8090'); R.pset(x, y, c); }
  R.rect(0, 33, 319, 34, H('#9aa0b0')); R.rect(0, 166, 319, 169, H('#3e4250'));
  for (let x = 6; x < 320; x += 18) for (const y of [38, 162]) { R.pset(x, y, K); R.pset(x + 1, y, H('#c8ccd8')); R.pset(x, y + 1, H('#4a4e5a')); }
  // reloj grande (90, 92) r 30 y su zona roja; reloj pequeño (176, 84) r 20
  for (const [cx, cy, r] of [[78, 92, 30], [176, 84, 20]]) { R.disco(cx, cy, r + 3, K); R.disco(cx, cy, r + 2, H('#a8acb8')); R.disco(cx - 1, cy - 1, r + 1, H('#c8ccd8')); R.disco(cx, cy, r, K); R.disco(cx, cy, r - 1, H('#f0e8d0'));
    for (let k = 0; k <= 10; k++) { const a = Math.PI * (0.8 + 1.4 * k / 10); R.linea(cx + Math.cos(a) * (r - 2), cy + Math.sin(a) * (r - 2), cx + Math.cos(a) * (r - (k % 5 ? 5 : 8)), cy + Math.sin(a) * (r - (k % 5 ? 5 : 8)), K); }
    for (let a = Math.PI * 1.85; a < Math.PI * 2.2; a += 0.01) for (let d = r - 5; d <= r - 2; d++) R.pset(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), H('#d83a3a'));
    for (let a = Math.PI * 0.8; a < Math.PI * 1.3; a += 0.01) for (let d = r - 4; d <= r - 2; d++) R.pset(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), H('#5ac86a')); }
  R.numero('0', 60, 108, { color: K, sombra: false }); R.numero('9', 98, 108, { color: H('#a82a2a'), sombra: false });
  // la placa del «440»
  R.rect(56, 130, 124, 144, K); R.rect(57, 131, 123, 143, H('#c8b070')); R.rect(57, 131, 123, 131, H('#f0e0a0')); R.numero('440', 90, 141, { color: H('#3a2a20'), sombra: false, centro: true }); R.pset(59, 137, K); R.pset(121, 137, K);
  // los interruptores (x 140–220, y 120–150)
  R.rect(138, 118, 224, 152, K); R.rect(139, 119, 223, 151, H('#4a4e5a'));
  for (let i = 0; i < 5; i++) { const x = 146 + i * 16; R.rect(x - 3, 134, x + 3, 146, K); R.rect(x - 2, 135, x + 2, 145, H('#8a8e9c')); }
  // el piloto de aviso (232, 60) y la palanca: la guía (x 244–268, y 64–150)
  R.disco(232, 60, 9, K); R.disco(232, 60, 8, H('#6a6e7a')); R.disco(232, 60, 6, K);
  R.rect(242, 62, 270, 152, K); R.rect(243, 63, 269, 151, H('#4a4e5a')); R.rect(253, 70, 259, 146, K); R.rect(254, 71, 258, 145, H('#1e2028'));
  for (let y = 70; y < 146; y += 10) { R.rect(244, y, 250, y, H('#e8c040')); }
  // las franjas de peligro y el suelo
  for (let x = 0; x < 320; x++) for (let y = 154; y < 164; y++) R.pset(x, y, Math.floor((x + y) / 6) % 2 ? H('#e8c040') : H('#1e1e24'));
  rampa(0, 170, 319, 179, [H('#2a2e3a'), H('#1a1e28')]); for (let x = 0; x < 320; x += 23) R.linea(x, 172, x + 9, 179, H('#3a3e4a'));
  R.linea(0, 176, 120, 172, K); R.linea(0, 175, 120, 171, H('#3a3a44'));
});
const p4 = (t) => {
  R.copiar(consola());
  const toca = @T(17.30), enciende = @T(17.56), terrible = @T(18.70), agarra = @T(19.40), retira = @T(19.90);
  // la luz violeta de la máquina por la derecha, que late
  luz(330, 60, 70, 90, H('#a88aff'), 0.45 + 0.15 * Math.sin(t * 4));
  // las agujas: la grande sube al rojo cuando Reed dice «turns it on»
  const sube = ease(tramo(t, enciende, terrible)), ag = Math.PI * (1.05 + 0.95 * sube) + Math.sin(t * 17) * 0.03 * (1 + sube * 3);
  R.linea(78, 92, 78 + Math.cos(ag) * 25, 92 + Math.sin(ag) * 25, K); R.linea(79, 92, 79 + Math.cos(ag) * 25, 92 + Math.sin(ag) * 25, H('#c83a3a')); R.disco(78, 92, 3, K); R.disco(78, 92, 2, H('#8a8e9c'));
  const a2 = Math.PI * (1.3 + 0.2 * Math.sin(t * 2)); R.linea(176, 84, 176 + Math.cos(a2) * 16, 84 + Math.sin(a2) * 16, K); R.disco(176, 84, 2, K);
  R.linea(56, 70, 66, 66, H('#ffffff')); R.linea(160, 70, 166, 67, H('#ffffff'));
  // pilotos que parpadean sobre los interruptores; el de aviso se enciende en «terrible»
  for (let i = 0; i < 5; i++) { const x = 146 + i * 16, on = Math.floor(t * 3 + i * 1.7) % 3 === 0; R.disco(x, 126, 3, K); R.disco(x, 126, 2, on ? [H('#5ae08a'), H('#f0c040'), H('#5ae08a'), H('#f08a3a'), H('#5ae08a')][i] : H('#2a3030')); R.rect(x - 1, 136 + (i % 2 ? 0 : 5), x + 1, 139 + (i % 2 ? 0 : 5), H('#d8dce4')); }
  const alarma = t > terrible && Math.floor(t * 6) % 2 === 0;
  R.disco(232, 60, 5, alarma ? H('#ff4a3a') : H('#6a2a2a')); R.pset(230, 58, alarma ? H('#ffd0c0') : H('#8a4a4a'));
  if (alarma) { luz(232, 60, 26, 22, H('#ff6a4a'), 0.45); R.icono('!', 226, 24, H('#ff4a3a'), K, 3); }
  // la palanca, arriba
  R.rect(254, 84, 258, 112, K); R.rect(255, 84, 257, 111, H('#c8ccd8')); R.disco(256, 80, 7, K); R.disco(256, 80, 6, H('#d83a3a')); R.disco(254, 78, 2, H('#ff9a8a'));
  // la mano de Reed da golpecitos en el cristal del reloj y se retira cuando Victor agarra la palanca
  const entra = ease(tramo(t, P4 + 0.1, toca - 0.2)), sale = ease(tramo(t, retira, retira + 0.8)), tap = (t > toca && t < terrible + 0.4) ? Math.max(0, Math.sin((t - toca) * 14)) * 3 : 0;
  const wx = lerp(lerp(-20, 36, entra), -20, sale), wy = lerp(lerp(130, 100, entra), 130, sale) - tap;
  if (wx > -14) T.brazo(R, -12, 128, wx, wy, AZUL, 1, {});
  // la mano de Victor agarra el pomo, como quien protege lo suyo
  const v = ease(tramo(t, agarra - 0.5, agarra));
  if (v > 0) T.brazo(R, 336, 112, lerp(336, 276, v), lerp(100, 82, v), VERDE, -1, {});
};

// ── 5 · la pizarra de cerca (GAG de la tiza) ───────────────────────────────────────────────────────────────────
// fondo local: la pizarra de pizarra verde con borrones, el «1.6 × 0.8 = 3.2» grande con el aro rojo de Reed, el
// boceto del aro, una matriz y otras cuentas; la repisa de madera con tizas y el borrador; abajo, la pared
const TIZA = H('#eef0e4');
const pizarraCerca = () => horno('pizarra', () => {
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { let c = H('#2c4a3c'); const n = hh(x >> 3, y >> 3, 21); if (n > 0.7) c = H('#304e40'); if (hh(x, y, 22) > 0.93) c = H('#36564a');
    const bo = Math.sin(x * 0.05 + Math.sin(y * 0.07) * 2) * Math.sin(y * 0.04 + x * 0.01); if (bo > 0.75 && bay(x, y) < 0.35) c = H('#3e5e50'); R.pset(x, y, c); }
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 60) / 50, (y - 40) / 30); if (d < 1 && bay(x, y) < (1 - d) * 0.3) R.pset(x, y, H('#4a6a5a')); }
  // números de fondo (lejos del año y de la esquina de Atom)
  const pe = (s, x, y, c = H('#b8c8bc')) => R.numero(s, x, y, { color: c, sombra: false });
  pe('3.7+1.2', 14, 40); pe('=4.9', 28, 52); pe('27×6', 14, 70); pe('2008', 196, 36); pe('9.8', 232, 120); pe('7:3', 286, 108); pe('>1000', 14, 140);
  R.linea(98, 28, 98, 52, H('#b8c8bc')); R.linea(98, 28, 100, 28, H('#b8c8bc')); R.linea(98, 52, 100, 52, H('#b8c8bc')); R.linea(140, 28, 140, 52, H('#b8c8bc')); R.linea(138, 28, 140, 28, H('#b8c8bc')); R.linea(138, 52, 140, 52, H('#b8c8bc'));
  pe('1 0 4', 104, 36); pe('3 6 2', 104, 44); pe('7 1 9', 104, 52);
  // el boceto del aro con sus antenas (250, 76)
  for (let a = 0; a < 6.283; a += 0.03) { R.pset(Math.round(250 + Math.cos(a) * 20), Math.round(76 + Math.sin(a) * 18), TIZA); R.pset(Math.round(250 + Math.cos(a) * 14), Math.round(76 + Math.sin(a) * 12), H('#c8d4c8')); }
  R.linea(250, 58, 250, 50, TIZA); R.linea(236, 64, 230, 56, TIZA); R.linea(264, 64, 270, 56, TIZA); R.linea(226, 76, 208, 76, TIZA); R.linea(212, 73, 208, 76, TIZA); R.linea(212, 79, 208, 76, TIZA);
  // una gráfica de onda (x 150–196, y 40–64)
  R.linea(150, 66, 196, 66, H('#b8c8bc')); R.linea(150, 66, 150, 40, H('#b8c8bc')); for (let x = 150; x < 196; x++) R.pset(x, Math.round(54 + Math.sin((x - 150) * 0.25) * 8 * Math.exp(-(x - 150) / 40)), H('#e8a0a0'));
  // la cuenta grande: 1.6 × 0.8 (el 0.8 rodeado de rojo) y debajo =3.2
  R.numero('1.6', 62, 108, { tam: 16, color: TIZA, sombra: false, contorno: false });
  R.linea(118, 94, 128, 104, TIZA); R.linea(119, 94, 129, 104, TIZA); R.linea(128, 94, 118, 104, TIZA); R.linea(129, 94, 119, 104, TIZA);
  R.numero('0.8', 140, 108, { tam: 16, color: TIZA, sombra: false, contorno: false });
  R.numero('=3.2', 62, 132, { tam: 16, color: H('#c8d4c8'), sombra: false, contorno: false });
  // el aro rojo de Reed alrededor del 0.8
  for (let a = 0; a < 6.283; a += 0.012) for (const d of [0, 0.6]) R.pset(Math.round(164 + Math.cos(a) * (32 + d)), Math.round(100 + Math.sin(a) * (15 + d) + Math.sin(a * 3) * 0.8), H('#e85a4a'));
  // el marco de madera y la repisa (y 146–158)
  R.rect(0, 146, 319, 158, K); tablas(0, 147, 319, 152, [H('#c89a60'), H('#a8784a'), H('#6a4a2a')], 6, 5); R.rect(0, 153, 319, 157, H('#5a3a20')); R.rect(0, 153, 319, 153, H('#7a5232'));
  // el borrador y las tizas de la repisa
  R.rect(40, 140, 64, 147, K); R.rect(41, 141, 63, 143, H('#a8784a')); R.rect(41, 144, 63, 146, H('#e8e4dc')); for (let x = 42; x < 63; x += 3) R.pset(x, 145, H('#c8c4bc'));
  for (const [x, c] of [[90, '#f4f4ec'], [104, '#f0e070'], [118, '#e85a4a'], [290, '#f4f4ec']]) { R.rect(x, 143, x + 9, 146, K); R.rect(x + 1, 144, x + 8, 145, H(c)); }
  // la pila de libros sobre la repisa donde se sube Atom (x 198–230, y 125–146)
  for (const [y0, y1, x0, x1, c] of [[139, 146, 196, 232, '#8a2a2a'], [132, 138, 199, 229, '#2a4a7a'], [125, 131, 197, 228, '#c8a040']]) { R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, H(c)); R.rect(x1 - 4, y0 + 1, x1 - 1, y1 - 1, H('#f2eee2')); R.rect(x0 + 1, y0 + 1, x1 - 5, y0 + 1, mez(H(c), H('#ffffff'), 0.3)); }
  for (let k = 0; k < 30; k++) R.pset(20 + Math.floor(hh(k, 1, 23) * 290), 146 - (k % 2), H('#c8ccc4'));
  // la pared de abajo
  bloques(0, 159, 319, 179, [H('#4a5068'), H('#3a4058'), H('#2a3046')], 9, 20, 10);
});
// la tiza en la mano de Atom (a escala 2): entera o partida
const tizaAtom = (m, rota, t) => { const [x, y] = m.map(Math.round); R.rect(x - 1, y - (rota ? 4 : 9), x + 2, y + 1, K); R.rect(x, y - (rota ? 3 : 8), x + 1, y, TIZA); R.pset(x + 1, y - (rota ? 3 : 8), H('#ffffff')); };
const p5 = (t) => {
  R.copiar(pizarraCerca());
  const coge = @T(21.82), escribe = @T(22.40), parte = @T(24.12), aviso = @T(24.82);
  // motas de polvo de tiza en la luz
  for (let k = 0; k < 14; k++) { const f = (t * 0.06 + hh(k, 1, 51)) % 1, x = 30 + hh(k, 2, 51) * 260 + Math.sin(t * 0.8 + k) * 4, y = 140 - f * 110; if (y < 22 && x < 175) continue; if (bay(Math.round(x), Math.round(y)) < 0.6) R.pset(Math.round(x), Math.round(y), H('#a8b8ac')); }
  // Atom llega por la repisa, coge la tiza blanca, se sube a los libros, intenta tachar el 0.8 y en «warning» la tiza se le parte
  const u = tramo(t, P5 + 0.05, coge - 0.35), sube = tramo(t, coge, coge + 0.3), cogida = t > coge - 0.15, rota = t > parte;
  const ax = sube > 0 ? lerp(296, 214, ease(sube)) : lerp(344, 296, ease(u)), suelo = sube > 0 ? lerp(146, 125, ease(sube)) - Math.sin(sube * Math.PI) * 10 : 146;
  const pose = u < 1 || (sube > 0 && sube < 1) ? 'camina' : !cogida ? 'quieto' : rota && t > aviso + 0.2 ? 'brazos' : 'sostiene';
  const cara = rota ? (t < parte + 0.7 ? 'sorpresa' : 'triste') : t > escribe ? 'sonrisa' : 'normal';
  if (!cogida) { R.rect(290, 143, 299, 146, K); R.rect(291, 144, 298, 145, H('#f4f4ec')); }
  const a = T.AT.atom(R, ax, suelo, t, { s: 2, pose, dir: -1, cara, habla: voz(t) * 0.5 });
  // lo que ha escrito: una raya que intenta tapar el 8 (no lo consigue)
  const raya = tramo(t, escribe, parte); if (raya > 0) R.linea(186, 106, 186 - Math.round(raya * 12), 96, TIZA);
  const m = a?.mano ?? [ax - 10, suelo - 16];
  if (cogida && sube >= 1 && pose === 'sostiene') { const tiemb = t > escribe && t < parte ? Math.round(Math.sin(t * 30)) : 0, x = Math.round(m[0]), y = Math.round(m[1]) + tiemb, L = rota ? 4 : 11;
    for (let i = 0; i <= L; i++) { const X = x - Math.round(i * 0.55), Y = y - i; R.rect(X - 2, Y - 1, X + 2, Y + 1, K); } for (let i = 0; i <= L; i++) { const X = x - Math.round(i * 0.55), Y = y - i; R.rect(X - 1, Y, X + 1, Y, i === L ? H('#ffffff') : TIZA); } }
  else if (cogida && sube < 1) { const x = Math.round(m[0]), y = Math.round(m[1]); R.rect(x - 2, y - 5, x + 2, y + 1, K); R.rect(x - 1, y - 4, x + 1, y, TIZA); }
  // el trozo que salta, cae a la repisa y rueda; la nube de polvo y el «!»
  if (rota) { const f = t - parte, x0 = m[0] - 6, y0 = m[1] - 9, vy = -30, caeY = Math.min(144, y0 + vy * f + 160 * f * f), x = x0 - 22 * f;
    if (x > 150) { const X = Math.round(x), Y = Math.round(caeY), g = Math.floor(f * 12) % 2; R.rect(X - 4 + g, Y - 2 - g, X + 4 - g, Y + 2 + g, K); R.rect(X - 3 + g, Y - 1 - g, X + 3 - g, Y + 1 + g, TIZA); }
    if (f < 0.7) for (let k = 0; k < 12; k++) { const r = 3 + f * 22, an = k * 0.52; if (bay(k, Math.floor(f * 20)) < 1 - f) R.disco(x0 + Math.cos(an) * r, y0 + Math.sin(an) * r * 0.7, 1.5, H('#dfe4d8')); }
    if (f < 1.1) R.icono('!', Math.round(ax) - 2, Math.round(suelo) - 52, H('#ffffff'), K, 2); }
};

// ── 6 · el muro de las sombras ─────────────────────────────────────────────────────────────────────────────────
// fondo local: la pared de bloques del laboratorio bañada por la luz violeta de la máquina (fuera de plano), con el
// tubo del techo, la caja de fusibles, un calendario de números, los planos clavados, la bata en su gancho, el extintor
// y el retrato de su madre clavado con una chincheta; delante, el suelo con el cable y una caja de herramientas
const muro = () => horno('muro', () => {
  bloques(0, 0, 319, 147, [H('#4a5070'), H('#3c4260'), H('#2a3048')], 11, 20, 10);
  R.rect(0, 20, 266, 25, K); R.rect(0, 21, 266, 23, H('#6a6e7c')); R.rect(0, 21, 266, 21, H('#9aa0b0')); for (let x = 40; x < 260; x += 90) { R.rect(x, 17, x + 4, 28, K); R.rect(x + 1, 18, x + 3, 27, H('#8a8e9c')); }
  R.rect(259, 20, 267, 147, K); R.rect(260, 24, 266, 147, H('#5a5e6c')); R.rect(260, 24, 260, 147, H('#8a8e9c')); R.rect(258, 19, 268, 27, K); R.rect(259, 20, 267, 26, H('#7a7e8c'));
  // la caja de fusibles (x 16–44, y 40–76)
  R.rect(14, 40, 46, 78, K); R.rect(15, 41, 45, 77, H('#7a8070')); R.rect(15, 41, 45, 42, H('#a8ae9c')); for (let i = 0; i < 3; i++) { R.rect(20 + i * 8, 50, 24 + i * 8, 66, K); R.rect(21 + i * 8, 51 + (i === 1 ? 8 : 0), 23 + i * 8, 57 + (i === 1 ? 8 : 0), H('#c8ccd8')); }
  R.icono('!', 28, 68, H('#e8c040'), K);
  // los planos clavados (x 60–118, y 36–80) y el calendario (x 124–150, y 40–74)
  R.rect(60, 36, 118, 80, K); R.rect(61, 37, 117, 79, H('#3a5a9a')); for (let a = 0; a < 6.283; a += 0.04) R.pset(Math.round(89 + Math.cos(a) * 16), Math.round(58 + Math.sin(a) * 14), H('#e8f0ff')); R.linea(66, 74, 112, 74, H('#e8f0ff')); R.disco(62, 38, 1.5, H('#e84a3a')); R.disco(116, 38, 1.5, H('#e84a3a'));
  R.rect(124, 40, 150, 74, K); R.rect(125, 41, 149, 73, H('#f2eee2')); R.rect(125, 41, 149, 47, H('#c83a3a'));
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) R.rect(127 + i * 6, 50 + j * 6, 130 + i * 6, 52 + j * 6, (i + j * 4) === 9 ? H('#c83a3a') : H('#8a8a94'));
  // la bata en su gancho (x 160–182) y el extintor (x 276–288)
  R.rect(170, 34, 172, 38, K); R.poligono([[161, 40], [181, 40], [184, 106], [158, 106]], K); R.poligono([[162, 41], [180, 41], [182, 105], [160, 105]], H('#e8e8e0')); R.linea(171, 42, 171, 104, H('#b8b8b0')); R.rect(163, 70, 168, 76, H('#c8c8c0'));
  R.rect(275, 104, 289, 140, K); R.rect(276, 105, 288, 139, H('#c83a3a')); R.rect(276, 105, 279, 139, H('#e85a4a')); R.rect(279, 98, 285, 104, K); R.rect(280, 99, 284, 103, H('#3a3a44'));
  // el suelo de linóleo (y 148–179) con el cable
  R.rect(0, 146, 319, 148, K); for (let y = 149; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, ((Math.floor(x / 16) + Math.floor((y - 149) / 8)) % 2) ? H('#2e3240') : H('#363a4a'));
  R.linea(0, 170, 320, 163, K); R.linea(0, 169, 320, 162, H('#3a3a44'));
  R.rect(14, 150, 52, 166, K); R.rect(15, 151, 51, 165, H('#c83a3a')); R.rect(15, 151, 51, 153, H('#e85a4a')); R.rect(26, 146, 40, 151, K); R.rect(27, 147, 39, 149, H('#8a8e9c'));
});
// la sombra agrandada de un personaje sobre la pared (la luz viene de delante, por la derecha)
const SB = R.nuevo();
const sombra = (def, t, o, cx, base, s, a = 0.55) => {
  const prev = R.usar(SB); SB.fill(0); R.actor(def, 16, 40, t, o); R.usar(prev);
  const col = H('#10121e');
  for (let y = 0; y < 44; y++) for (let x = 0; x < 48; x++) { if (!SB[y * 320 + x]) continue;
    const X0 = Math.round(cx + (x - 23) * s), Y0 = Math.round(base + (y - 40) * s);
    for (let j = 0; j < Math.ceil(s); j++) for (let i = 0; i < Math.ceil(s); i++) { const X = X0 + i, Y = Y0 + j; if (X < 0 || X > 319 || Y < 0 || Y > 145) continue; R.pset(X, Y, mez(R.pget(X, Y), col, a)); } } };
const p6 = (t) => {
  R.copiar(muro());
  const pequeno = @T(27.84), madre = @T(29.58), importa = @T(30.36);
  // la luz de la máquina: un charco violeta que late
  const lat = 0.5 + 0.12 * Math.sin(t * 5) + 0.05 * Math.sin(t * 13);
  luz(170, 90, 200, 120, H('#9a8ae8'), lat * 0.55);
  // el retrato de su madre, clavado (x 228–250, y 52–80); brilla en «the one thing»
  retrato(228, 52); R.disco(239, 50, 1.6, H('#e84a3a'));
  const brilla = tramo(t, madre, madre + 0.5); if (brilla > 0) luz(239, 66, 22, 22, H('#ffd890'), 0.6 * brilla);
  // las sombras: la de Reed señala; la de Victor se encoge en «isn't as good» y crece en «truly cares»
  const sv = lerp(lerp(3, 1.7, ease(tramo(t, pequeno - 0.4, pequeno + 0.5))), 3.4, ease(tramo(t, importa - 0.3, importa + 0.4))), osc = Math.sin(t * 5) * 1.2;
  const vDir = t > madre - 0.2 && t < importa ? 1 : -1, puños = t > importa;
  sombra(REED, t, { dir: 1, dedo: true }, 72 + osc, 146, 3);
  sombra(VIC, t, { dir: vDir, brazos: puños && Math.sin(t * 3) > -0.4 }, 170 + osc, 146, sv);
  // los dos, pequeños, delante
  R.actor(REED, 108, 172, t, { dir: 1, dedo: true, habla: voz(t) > 0.15 && t < madre });
  const rv = R.actor(VIC, 160, 172, t, { dir: vDir, triste: t > pequeno - 0.2 && t < madre, enfado: puños, brazos: puños && Math.sin(t * 3) > -0.4 });
  if (t > pequeno && t < madre) R.bocadillo(168, 140, { icono: '?' });
  // vida: motas en la luz y un parpadeo del tubo
  for (let k = 0; k < 10; k++) { const f = (t * 0.05 + hh(k, 1, 61)) % 1; R.pset(Math.round(200 + hh(k, 2, 61) * 100 + Math.sin(t + k) * 3), Math.round(140 - f * 100), H('#c8c0f0')); }
};

// ── 7 · el laboratorio: lo echa, baja la palanca y estalla ─────────────────────────────────────────────────────
const p7 = (t) => {
  const echa = @T(32.35), solo = @T(33.81), palanca = @T(34.20), golpe = @T(35.07), cara = @T(37.17);
  const pal = ease(tramo(t, palanca, palanca + 0.3)), carga = tramo(t, palanca + 0.25, golpe), est = tramo(t, golpe, golpe + 3.8);
  const o = { encuadre: 'laboratorio', carga, palanca: pal, estalla: est }; const g = T.universidad(R, t, o);
  // el cajón de madera junto a la consola (x 124–146, y 136–150)
  R.rect(122, 135, 147, 150, K); tablas(123, 136, 146, 149, [H('#c8a070'), H('#a8804a'), H('#6a4a2a')], 5, 8); R.linea(123, 136, 146, 149, H('#6a4a2a')); R.numero('12', 128, 148, { color: H('#3a2a1a'), sombra: false });
  // Reed se va por la izquierda
  const rs = tramo(t, echa + 0.25, solo - 0.1); if (rs < 1) R.actor(REED, Math.round(lerp(58, -20, ease(rs))), 150, t, { dir: rs > 0 ? -1 : 1, anda: rs > 0, triste: true });
  // Victor señala la puerta, se sube al cajón y baja la palanca; con el destello cae detrás del cajón
  if (t < golpe + 0.05) {
    const sube = tramo(t, solo, solo + 0.35), x = Math.round(lerp(96, 132, ease(sube))), suelo = Math.round(lerp(150, 136, ease(sube))), salto = sube > 0 && sube < 1 ? Math.round(Math.sin(sube * Math.PI) * 8) : 0;
    const ang = lerp(-0.45, 1.35, pal), tx = 150 + Math.sin(ang) * 4, ty = 120 - Math.cos(ang) * 4;
    const enPalanca = t > palanca - 0.15;
    R.actor(VIC, x, suelo, t, { dir: t < solo ? -1 : 1, dedo: t > echa - 0.1 && t < solo, enfado: t < solo, sostiene: enPalanca ? [tx, ty] : undefined, salto: salto + (t > palanca && t < palanca + 0.3 ? 1 : 0), sorpresa: t > golpe - 0.4 });
  } else if (t > cara - 0.6) { // sus zapatos asoman tras el cajón cuando se va el humo
    for (const zx of [112, 117]) { R.rect(zx, 146, zx + 4, 150, K); R.rect(zx + 1, 147, zx + 3, 149, H('#2a2a34')); }
  }
  T.universidadDelante(R, t, o);
  // el humo que lo tapa todo un momento y se va despejando
  const hu = tramo(t, golpe + 0.05, golpe + 0.8) * (1 - tramo(t, cara - 0.2, cara + 1.6));
  if (hu > 0) for (let k = 0; k < 12; k++) { const x = 80 + hh(k, 1, 71) * 120 + Math.sin(t * 0.7 + k) * 6, y = 96 + hh(k, 2, 71) * 50 - (t - golpe) * 4, r = 10 + hh(k, 3, 71) * 12;
    for (let yy = Math.floor(y - r); yy <= y + r; yy++) for (let xx = Math.floor(x - r); xx <= x + r; xx++) { const d = Math.hypot(xx - x, yy - y) / r; if (d < 1 && bay(xx, yy) < hu * (1.3 - d)) R.pset(xx, yy, d < 0.5 ? H('#9a9aa6') : H('#6a6a78')); } }
};

// ── 8 · la enfermería, por la mañana ───────────────────────────────────────────────────────────────────────────
// fondo local: pared crema arriba y azulejo verde agua abajo, la ventana con el cielo de la mañana (nubes, una rama de
// arce y pájaros, recortados a su hueco), el radiador, la cortina de la barra, la cama de hierro con su gráfica a los
// pies, la mesilla con la jarra, el vaso y las flores, el reloj, la otra cama hecha y el biombo; suelo de terrazo
const enfermeria = () => horno('enfermeria', () => {
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { let c = H('#e8e0c8'); if (hh(x >> 1, y >> 1, 81) > 0.9) c = H('#ded6be'); if ((x + y * 3) % 47 === 0) c = H('#d6ceb6'); R.pset(x, y, c); }
  R.rect(0, 0, 319, 5, H('#c8c0a8')); R.rect(0, 6, 319, 6, H('#b0a890'));
  for (let y = 100; y < 150; y++) for (let x = 0; x < 320; x++) { const jx = x % 10, jy = (y - 100) % 10; let c = jx === 0 || jy === 0 ? H('#9ab8ac') : H('#c4e0d4'); if (jx === 1 && jy > 0 && jy < 4) c = H('#e0f4ec'); R.pset(x, y, c); }
  R.rect(0, 98, 319, 100, H('#7a9a8e')); R.rect(0, 98, 319, 98, H('#e8f4ee'));
  // la ventana (x 176–244, y 22–92): el hueco se pinta cada fotograma
  R.rect(172, 18, 248, 96, K); R.rect(173, 19, 247, 95, H('#f2f2ea')); R.rect(176, 22, 244, 92, H('#88a8c8')); R.rect(170, 94, 250, 98, K); R.rect(171, 95, 249, 97, H('#f2f2ea'));
  // la maceta de la repisa
  R.rect(236, 86, 244, 94, K); R.rect(237, 87, 243, 93, H('#b8643a')); R.disco(240, 82, 5, H('#3a7a3a')); R.disco(238, 80, 3, H('#5aa85a'));
  // el radiador (x 180–240, y 108–140)
  R.rect(180, 108, 240, 142, K); for (let x = 181; x < 240; x++) R.rect(x, 109, x, 141, x % 5 === 0 ? H('#a8aca0') : x % 5 === 1 ? H('#f2f2ea') : H('#d8dcd0'));
  // el reloj (150, 30)
  R.disco(150, 30, 9, K); R.disco(150, 30, 8, H('#f8f8f0')); for (let k = 0; k < 12; k++) R.pset(Math.round(150 + Math.cos(k * 0.52) * 6), Math.round(30 + Math.sin(k * 0.52) * 6), K);
  // el biombo de la derecha (x 262–318, y 60–150): tres hojas de tela blanca en marcos de metal
  for (let i = 0; i < 3; i++) { const x = 262 + i * 19; R.rect(x, 60, x + 18, 150, K); R.rect(x + 2, 63, x + 16, 146, H('#f4f2ec')); for (let y = 64; y < 146; y += 6) R.rect(x + 2, y, x + 16, y, H('#e0dcd0')); R.rect(x + 2, 63, x + 4, 146, H('#d8d4c8')); }
  // la mesilla (x 26–58, y 118–150) con la jarra, el vaso y las flores
  R.rect(26, 116, 58, 150, K); R.rect(27, 117, 57, 149, H('#d8d4c8')); R.rect(27, 117, 57, 119, H('#f2f0e8')); R.rect(30, 126, 54, 136, H('#b8b4a8')); R.rect(40, 130, 44, 131, K);
  R.rect(30, 100, 40, 116, K); R.rect(31, 101, 39, 115, H('#c8e0f0')); R.rect(31, 106, 39, 115, H('#a8c8e0')); R.rect(38, 102, 42, 106, K);
  R.rect(46, 104, 54, 116, K); R.rect(47, 105, 53, 115, H('#e8a8c8')); for (const [fx, fy, c] of [[48, 98, '#e84a5a'], [52, 96, '#f0d040'], [50, 100, '#e86aa8']]) { R.linea(50, 104, fx, fy, H('#3a7a3a')); R.disco(fx, fy, 2, H(c)); }
  // la cama (x 62–172): cabecero de tubo, colchón y la gráfica a los pies
  R.rect(62, 96, 66, 150, K); R.rect(63, 97, 65, 149, H('#e8e8e0')); R.rect(62, 96, 76, 99, K); R.rect(63, 97, 75, 98, H('#e8e8e0'));
  R.rect(166, 120, 170, 150, K); R.rect(167, 121, 169, 149, H('#e8e8e0'));
  R.rect(171, 124, 180, 138, K); R.rect(172, 125, 179, 137, H('#f8f8f0')); R.linea(173, 134, 175, 130, H('#3a5ac8')); R.linea(175, 130, 177, 132, H('#3a5ac8')); R.linea(177, 132, 178, 127, H('#3a5ac8'));
  // el suelo de terrazo
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { let c = H('#b8b0a0'); const q = hh(x, y, 83); if (q > 0.9) c = H('#8a8278'); else if (q > 0.82) c = H('#d8d0c0'); if ((y - 150) % 12 === 0) c = H('#9a9284'); R.pset(x, y, c); }
  for (let x = 0; x < 320; x++) for (let y = 150; y < 154; y++) R.pset(x, y, mez(R.pget(x, y), K, 0.25));
  // la otra cama, hecha (x 200–262, y 130–150), asomando tras el biombo
  R.rect(232, 128, 262, 150, K); R.rect(233, 129, 262, 140, H('#f4f4ee')); R.rect(233, 140, 262, 149, H('#8ab0d0')); R.rect(233, 140, 262, 141, H('#b8d0e8'));
});
const p8 = (t) => {
  R.copiar(enfermeria());
  const despierta = @T(39.35), cicatriz = @T(40.57), carta = @T(42.33), expulsado = @T(43.19);
  // el cielo de la mañana por la ventana, con nubes, la rama y los pájaros (recortados al hueco)
  R.recorte([176, 22, 244, 92]);
  for (let y = 22; y <= 92; y++) { const u = (y - 22) / 70; for (let x = 176; x <= 244; x++) R.pset(x, y, u + (bay(x, y) - 0.5) * 0.15 < 0.5 ? H('#8ab0d8') : u + (bay(x, y) - 0.5) * 0.15 < 0.8 ? H('#b0cce4') : H('#f0dcc0')); }
  for (const [y, w, v, k] of [[34, 30, 3, 0], [50, 22, 5, 1], [70, 34, 2, 2]]) nube(((k * 61 + t * v) % 120) + 150, y, w, NUB, [176, 22, 244, 92]);
  for (let k = 0; k < 3; k++) { const x = 176 + ((t * 12 + k * 30) % 90), y = 40 + k * 6 + Math.sin(t * 2 + k) * 2; if (x < 244) pajaro(x, y, t + k, H('#3a3a44')); }
  const mec = Math.sin(t * 1.4) * 2; R.linea(244, 30, 206, 48 + mec, H('#5a3a28')); R.linea(244, 31, 206, 49 + mec, H('#5a3a28'));
  for (let k = 0; k < 9; k++) { const lx = 210 + k * 4, ly = 44 + k * -1.6 + mec * (1 - k / 9) + (k % 2 ? 3 : -2); R.disco(lx, ly, 2.4, k % 3 ? H('#e8783a') : H('#c84a2a')); }
  R.recorte(null);
  R.linea(210, 22, 210, 92, H('#f2f2ea')); R.linea(176, 56, 244, 56, H('#f2f2ea'));
  // la luz de la ventana en el suelo y el agua del radiador; la aguja del reloj
  luz(206, 160, 60, 14, H('#fff4d8'), 0.35); const ag = t * 0.6; R.linea(150, 30, 150 + Math.cos(ag) * 6, 30 + Math.sin(ag) * 6, H('#c83a3a')); R.linea(150, 30, 154, 28, K);
  // la cortina de la barra (x 0–40), que mueve el aire
  R.rect(0, 12, 176, 13, H('#a8aca0'));
  for (let x = 0; x < 42; x++) { const ond = Math.sin(x * 0.6 + t * 1.3) * 1.5; for (let y = 14; y < 146 + ond; y++) R.pset(x + Math.round(Math.sin(y * 0.03 + t) * 1.5), y, (x + Math.round(ond)) % 6 < 2 ? H('#d8dcd4') : H('#f2f4ee')); }
  // la almohada, detrás de Victor
  R.rect(66, 124, 90, 136, K); R.rect(67, 125, 89, 135, H('#f8f8f2')); R.rect(67, 133, 89, 135, H('#d8dcd8')); R.rect(70, 126, 86, 127, H('#ffffff'));
  // Victor: bajo la manta; en «wakes up» se incorpora; en «scar» se toca la venda
  const sube = ease(tramo(t, despierta, despierta + 0.6)), vx = 72, suelo = Math.round(lerp(153, 149, sube));
  const toca = t > cicatriz && t < cicatriz + 1.8;
  const r = R.actor(VIC, vx, suelo, t, { dir: 1, sorpresa: t > despierta && t < despierta + 0.9, triste: t > despierta + 0.9 && t < expulsado, enfado: t > expulsado + 0.4, sostiene: toca ? [vx + 11, suelo - 17] : undefined });
  if (sube > 0.2) venda(r, 1);
  // la almohada (detrás de la cabeza no: va delante solo por abajo) y la manta
  R.rect(66, 136, 168, 150, K); for (let y = 137; y < 150; y++) for (let x = 67; x < 168; x++) R.pset(x, y, y === 137 ? H('#f8f8f2') : y < 140 ? H('#e8ecec') : (x + Math.round(Math.sin(y * 0.4) * 2)) % 9 === 0 ? H('#7aa0c8') : H('#a8c4e0'));
  for (let y = 150; y < 154; y++) R.rect(66, y, 168, y, H('#6a8aa8'));
  // la enfermera entra con la carta, la deja sobre la manta y la carta se abre con su «X» roja
  const ue = tramo(t, carta - 0.8, carta + 0.2), ex = Math.round(lerp(330, 182, ease(ue))), deja = t > expulsado - 0.4, va = tramo(t, expulsado + 0.9, expulsado + 2.4);
  const re = R.actor(EL.enfermera, Math.round(ex + lerp(0, 160, ease(va))), 152, t, { dir: va > 0 ? 1 : -1, anda: (ue > 0 && ue < 1) || (va > 0 && va < 1), sostiene: !deja && ue > 0 ? true : undefined, sonrisa: true });
  if (!deja && re?.mano && ue > 0) { const [mx, my] = re.mano.map(Math.round); R.rect(mx - 5, my - 4, mx + 3, my + 1, K); R.rect(mx - 4, my - 3, mx + 2, my, H('#f4f0e4')); R.pset(mx - 1, my - 2, H('#c83a3a')); }
  if (deja) { const ab = ease(tramo(t, expulsado - 0.2, expulsado + 0.25)), x = 124, y = 130;
    R.rect(x - 1, y - 1, x + 22, y + 9 + Math.round(ab * 8), K); R.rect(x, y, x + 21, y + 8 + Math.round(ab * 8), H('#f4f0e4'));
    for (let k = 0; k < 4; k++) R.rect(x + 2, y + 3 + k * 3, x + 11, y + 3 + k * 3, H('#b8b4a8'));
    if (ab > 0.8) R.icono('X', x + 12, y + 2, H('#d83a3a'), H('#8a2020'), 2); }
};

// ── 9 · la mesa de planos destrozada, por la mañana ───────────────────────────────────────────────────────────
const p9 = (t) => {
  R.copiar(mesaPlanos(true)); mesaVida(t, true);
  const coge = @T(46.13), gira = @T(47.43), puerta = @T(48.43);
  const lev = ease(tramo(t, coge - 0.2, gira)), vuelta = t > gira, limpia = tramo(t, gira + 0.3, puerta + 0.2);
  const px = lerp(266, 252, lev), py = lerp(112, 86, lev);
  // el retrato: boca abajo, la mano lo levanta, le da la vuelta y le limpia el hollín; en «door» brilla
  if (!vuelta) retratoReves(px, py); else retrato(px, py, { grieta: true, hollin: 1 - limpia });
  if (t > puerta) { const b = tramo(t, puerta, puerta + 0.5); luz(px + 11, py + 14, 24, 24, H('#ffd890'), 0.5 * b); }
  const entra = ease(tramo(t, P9 + 0.2, coge)), fr = limpia > 0 && limpia < 1 ? Math.sin(t * 16) * 5 : 0;
  const wx = lerp(336, px + 30 + fr, entra), wy = lerp(170, py + 24, entra);
  T.brazo(R, 340, 160, wx, wy, VERDE, -1, {});
};

// ── 10 · el aro roto de cerca: la puerta a su madre se cierra ────────────────────────────────────────────────
// fondo local: la pared de bloques en penumbra azul, el aro grande chamuscado con sus remaches, las bombillas rotas, una
// antena doblada y el cable que cuelga; abajo, la plataforma con sus franjas, tornillos y cristales
const aroRoto = () => horno('aro', () => {
  bloques(0, 0, 319, 150, [H('#3a4260'), H('#2e3450'), H('#1e2238')], 13, 20, 10);
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, Math.floor((x + y) / 7) % 2 ? H('#a89030') : H('#1e1e24'));
  R.rect(0, 148, 319, 151, K); R.rect(0, 149, 319, 149, H('#6a6e80'));
  for (let k = 0; k < 30; k++) { const x = Math.floor(hh(k, 1, 91) * 318), y = 154 + Math.floor(hh(k, 2, 91) * 24); R.rect(x, y, x + 1, y + 1, K); R.pset(x, y, k % 3 ? H('#c8ccd8') : H('#c8e0f0')); }
  // el aro (centro 160, 92; r 66 fuera, 50 dentro)
  for (let y = 20; y < 166; y++) for (let x = 90; x < 232; x++) { const d = Math.hypot(x - 160, y - 92); if (d > 67 || d < 49) continue;
    let c = d > 65.5 || d < 50.5 ? K : (x - 160) + (y - 92) < -20 ? H('#c8ccd8') : (x - 160) + (y - 92) > 30 ? H('#5a5e6c') : H('#8a8e9c');
    const ang = Math.atan2(y - 92, x - 160), q = hh(Math.round(ang * 20), Math.round(d), 93); if (q > 0.62 && hh(x >> 2, y >> 2, 94) > 0.4) c = mez(c, H('#1a1418'), 0.65);
    R.pset(x, y, c); }
  for (let k = 0; k < 24; k++) { const a = k * 0.2618, x = Math.round(160 + Math.cos(a) * 58), y = Math.round(92 + Math.sin(a) * 58); R.pset(x, y, K); R.pset(x - 1, y - 1, H('#e8ecf4')); }
  for (let k = 0; k < 8; k++) { const a = -2.6 + k * 0.32, x = Math.round(160 + Math.cos(a) * 70), y = Math.round(92 + Math.sin(a) * 70); R.disco(x, y, 3, K); R.disco(x, y, 2, k % 3 === 1 ? H('#2a2a30') : H('#6a6a5a')); if (k % 3 === 1) R.pset(x, y - 2, H('#c8e0ff')); }
  // la antena doblada y el cable que cuelga
  R.linea(160, 26, 160, 20, K); R.linea(160, 20, 186, 16, K); R.linea(161, 26, 161, 20, H('#8a8e9c')); R.linea(161, 20, 187, 16, H('#8a8e9c')); R.disco(187, 16, 2, K);
  for (let i = 0; i < 30; i++) R.pset(Math.round(226 + Math.sin(i * 0.2) * 4), 120 + i, i % 2 ? K : H('#c83a3a'));
  // las bobinas chamuscadas a los lados
  for (const bx of [70, 236]) { R.rect(bx, 70, bx + 14, 116, K); for (let y = 71; y < 116; y++) R.rect(bx + 1, y, bx + 13, y, y % 2 ? H('#6a4a2a') : H('#8a5a32')); for (let y = 76; y < 110; y++) if (hh(bx, y, 95) > 0.5) R.rect(bx + 1, y, bx + 13, y, H('#2a1e18')); }
});
const p10 = (t) => {
  R.copiar(aroRoto());
  const abre = @T(50.77), cierra = @T(52.13);
  // dentro del aro, la oscuridad con humo que gira
  R.recorte([110, 42, 210, 142]);
  for (let k = 0; k < 10; k++) { const a = t * 0.4 + k * 0.63, r = 14 + (k % 4) * 8; R.disco(160 + Math.cos(a) * r, 92 + Math.sin(a) * r * 0.8, 6 + (k % 3) * 2, k % 2 ? H('#2a2a38') : H('#343446')); }
  R.recorte(null);
  // la puerta de luz violeta con la silueta de su madre: crece en «managed to open» y se cierra en «closed again»
  const ancho = (0.6 + 0.4 * ease(tramo(t, P10, abre))) * (1 - ease(tramo(t, cierra, cierra + 0.55))), luzU = 1 - tramo(t, cierra + 0.4, cierra + 1.4);
  if (luzU > 0) luz(160, 96, 40 * luzU + 6, 46 * luzU + 6, H('#b89aff'), 0.55 * luzU);
  const w = Math.round(14 * ancho);
  if (w > 0) { for (let y = 66; y <= 124; y++) for (let x = 160 - w; x <= 160 + w; x++) { const arco = y < 66 + 14 ? Math.hypot(x - 160, y - 80) <= 14 : true; if (!arco) continue; R.pset(x, y, Math.abs(x - 160) > w - 2 ? H('#c8b8ff') : H('#f0e8ff')); }
    if (w > 6) { const S = H('#5a3a8a'), SC = H('#6a4a9a'); // su madre: la cabeza, la melena larga que cae por los hombros y el chal que se abre hasta el bajo del vestido
      R.disco(160, 84, 4, S); for (let y = 84; y < 100; y++) { const hw = Math.min(w - 3, 4 + Math.round((y - 84) * 0.25)); R.rect(160 - hw, y, 160 + hw, y, S); }
      for (let y = 96; y < 124; y++) { const hw = Math.min(w - 3, Math.round(4 + (y - 96) * 0.32)); R.rect(160 - hw, y, 160 + hw, y, SC); R.pset(160 - hw, y, S); R.pset(160 + hw, y, S); }
      R.rect(157, 82, 163, 88, H('#8a6aba')); R.pset(158, 85, S); R.pset(161, 85, S); for (let k = -5; k <= 5; k += 2) R.pset(160 + k, 104, H('#d8c060')); } }
  // las dos hojas oscuras que se cierran
  const hoja = ease(tramo(t, cierra - 0.1, cierra + 0.45));
  if (hoja > 0 && hoja < 1) for (const s of [-1, 1]) { const x0 = 160 + s * 30, x1 = 160 + s * Math.round(30 - 28 * hoja); R.rect(Math.min(x0, x1), 64, Math.max(x0, x1), 126, H('#1a1428')); }
  if (t > cierra + 0.45 && t < cierra + 1.1) for (let k = 0; k < 10; k++) { const f = t - cierra - 0.45, a = k * 0.63; R.pset(Math.round(160 + Math.cos(a) * f * 40), Math.round(96 + Math.sin(a) * f * 30), H('#d8c8ff')); }
  // chispas de la bobina, humo que sube del borde del aro y Atom, luciérnaga, que mira desde la izquierda
  if (Math.sin(t * 11) > 0.7) for (let k = 0; k < 4; k++) R.pset(236 + Math.floor(hh(k, Math.floor(t * 20), 5) * 14), 80 + Math.floor(hh(k, 7, Math.floor(t * 20)) * 30), k % 2 ? H('#ffd060') : H('#ffffff'));
  humito(120, 46, t, 0.1, 30, H('#4a4a58'), H('#8a8a98')); humito(204, 50, t, 0.5, 30, H('#4a4a58'), H('#8a8a98'));
  T.AT.luciernaga(R, 46 + Math.sin(t * 1.2) * 3, 120 + Math.sin(t * 2) * 2, t, { dir: 1, brillo: 0.6, cara: t > cierra ? 'triste' : 'normal' });
};

// ── 11 · el cuarto de Victor, al anochecer: la maleta y la decisión ──────────────────────────────────────────
// fondo local: pared con zócalo de madera, la ventana con el cielo del anochecer, la residencia de enfrente (con la
// ventana de Reed encendida) y la torre del reloj; el banderín sin letras, el corcho, la estantería; la cama de hierro
// con la manta gris; el escritorio con el flexo, los libros, el ajedrez y la taza; el suelo de tablas con la alfombra
const cuarto = () => horno('cuarto', () => {
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { let c = (x % 24) < 1 ? H('#a8b49a') : H('#bcc8ac'); if (hh(x >> 1, y >> 1, 101) > 0.92) c = H('#b0bca0'); R.pset(x, y, c); }
  R.rect(0, 0, 319, 6, H('#8a7a5a')); R.rect(0, 7, 319, 7, H('#6a5a40'));
  tablas(0, 112, 319, 140, [H('#9a6a40'), H('#7a5030'), H('#4a2e1a')], 7, 3); R.rect(0, 110, 319, 112, H('#4a2e1a'));
  tablas(0, 141, 319, 179, [H('#a87a4a'), H('#8a5e36'), H('#5a3a20')], 8, 4);
  for (let y = 152; y < 180; y++) for (let x = 40; x < 250; x++) { const d = Math.hypot((x - 145) / 105, (y - 168) / 14); if (d < 1) R.pset(x, y, d > 0.94 ? H('#5a2a2a') : Math.floor(d * 6) % 2 ? H('#8a3a3a') : H('#c8a060')); }
  // la ventana (x 196–262, y 24–96): se pinta en vivo; marco
  R.rect(192, 20, 266, 100, K); R.rect(193, 21, 265, 99, H('#e8e4d8')); R.rect(196, 24, 262, 96, H('#3a3a5a')); R.rect(190, 98, 268, 102, K); R.rect(191, 99, 267, 101, H('#e8e4d8'));
  // las cortinas
  for (const [x0, x1] of [[182, 194], [264, 276]]) for (let y = 16; y < 108; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (x - x0) % 4 === 0 ? H('#7a2a2a') : (x - x0) % 4 === 3 ? H('#a84a3a') : H('#c85a48'));
  R.rect(178, 14, 280, 15, H('#3a2818'));
  // el banderín (sin letras) y el corcho
  R.poligono([[30, 30], [80, 38], [30, 46]], K); R.poligono([[31, 32], [76, 38], [31, 44]], H('#2a4a8a')); R.rect(31, 36, 60, 39, H('#e8c040'));
  R.rect(96, 26, 150, 66, K); R.rect(97, 27, 149, 65, H('#c89a60')); for (let k = 0; k < 40; k++) R.pset(98 + Math.floor(hh(k, 1, 103) * 50), 28 + Math.floor(hh(k, 2, 103) * 36), H('#a87a48'));
  R.rect(100, 30, 118, 46, H('#f2eee2')); for (let k = 0; k < 4; k++) R.rect(102, 33 + k * 3, 115, 33 + k * 3, H('#9a9aa4')); R.rect(122, 32, 144, 52, H('#3a5a9a')); for (let a = 0; a < 6.283; a += 0.1) R.pset(Math.round(133 + Math.cos(a) * 7), Math.round(42 + Math.sin(a) * 7), H('#e8f0ff'));
  R.rect(104, 50, 120, 62, H('#f0e070')); R.numero('214', 112, 60, { color: H('#3a2a20'), sombra: false, centro: true });
  // la estantería sobre la cama (x 20–100, y 70–76) con libros
  R.rect(18, 76, 102, 79, K); R.rect(19, 76, 101, 77, H('#8a5e36'));
  for (let x = 22, k = 0; x < 96; k++) { const w = 3 + Math.floor(hh(k, 1, 105) * 3), hgt = 10 + Math.floor(hh(k, 2, 105) * 6); R.rect(x, 76 - hgt, x + w, 75, K); R.rect(x + 1, 77 - hgt, x + w - 1, 75, [H('#8a2a2a'), H('#2a4a7a'), H('#3a6a3a'), H('#c8a040'), H('#5a3a6a')][k % 5]); x += w + 1; }
  // la cama (x 20–150, y 118–150)
  R.rect(18, 104, 22, 150, K); R.rect(19, 105, 21, 149, H('#4a4e5a')); R.rect(146, 116, 150, 150, K); R.rect(147, 117, 149, 149, H('#4a4e5a'));
  R.rect(22, 120, 146, 140, K); for (let y = 121; y < 140; y++) for (let x = 23; x < 146; x++) R.pset(x, y, y < 123 ? H('#9a9aa4') : ((x + y) % 4 === 0 ? H('#6a6a74') : H('#7a7a86')));
  R.rect(24, 114, 44, 121, K); R.rect(25, 115, 43, 120, H('#f2f2ea'));
  // el escritorio (x 210–300, y 118–150): flexo, libros, ajedrez y taza
  R.rect(206, 116, 304, 120, K); R.rect(207, 117, 303, 119, H('#8a5e36')); R.rect(210, 120, 214, 150, K); R.rect(296, 120, 300, 150, K); R.rect(211, 121, 213, 150, H('#6a4428')); R.rect(297, 121, 299, 150, H('#6a4428'));
  R.rect(244, 120, 294, 134, K); R.rect(245, 121, 293, 133, H('#7a5232')); R.rect(266, 126, 272, 127, H('#c8a040'));
  for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) R.rect(250 + i * 4, 110 + j * 2, 253 + i * 4, 111 + j * 2, (i + j) % 2 ? H('#2a2a30') : H('#e8e4d8'));
  R.rect(252, 106, 253, 109, H('#3a5ac8')); R.rect(262, 106, 263, 109, H('#f2eee2')); R.rect(270, 105, 271, 109, H('#f2eee2'));
  R.rect(218, 100, 238, 116, K); R.rect(219, 101, 237, 104, H('#2a4a7a')); R.rect(219, 105, 237, 109, H('#8a2a2a')); R.rect(219, 110, 237, 115, H('#3a6a3a'));
  R.rect(284, 106, 292, 116, K); R.rect(285, 107, 291, 115, H('#e8e0d0'));
});
const p11 = (t) => {
  R.copiar(cuarto());
  const decision = @T(54.62), forma = @T(55.42), sabe = @T(58.06);
  // por la ventana: el anochecer, la residencia de enfrente con la ventana de Reed y la torre del reloj
  R.recorte([196, 24, 262, 96]);
  for (let y = 24; y <= 96; y++) { const u = (y - 24) / 72 + (bay(196, y) - 0.5) * 0.1; for (let x = 196; x <= 262; x++) { const v = u + (bay(x, y) - 0.5) * 0.12; R.pset(x, y, v < 0.35 ? H('#3a3a6a') : v < 0.65 ? H('#7a5a8a') : H('#e89a6a')); } }
  nube((t * 3) % 100 + 170, 34, 26, [H('#a88aa8'), H('#8a6a8a'), H('#5a4a6a')], [196, 24, 262, 96]);
  R.rect(244, 36, 252, 70, H('#5a3a3a')); R.rect(243, 34, 253, 36, H('#3a2a2a')); R.disco(248, 46, 3, H('#f0e8c0')); R.pset(248, 45, K); R.pset(249, 46, K);
  for (let y = 62; y <= 96; y++) for (let x = 196; x <= 262; x++) R.pset(x, y, (y - 62) % 6 === 5 ? H('#4a2420') : H('#6a3028'));
  for (const [wx, wy, on] of [[202, 68, 1], [222, 68, 0], [202, 80, 0], [222, 80, 1], [240, 80, 0]]) { R.rect(wx, wy, wx + 12, wy + 8, K); R.rect(wx + 1, wy + 1, wx + 11, wy + 7, on ? H('#f0c860') : H('#2a2a40')); }
  // Reed en su ventana (240, 68) saluda con la mano
  R.rect(240, 68, 252, 76, K); R.rect(241, 69, 251, 75, H('#f0c860')); R.disco(246, 72, 2, H('#6a4830')); R.rect(244, 74, 248, 75, H('#3a5ac8')); if (Math.sin(t * 6) > 0 && t > sabe - 0.3) R.rect(249, 69, 250, 72, H('#e8c098'));
  R.recorte(null);
  R.rect(228, 24, 229, 96, H('#e8e4d8')); R.rect(196, 58, 262, 59, H('#e8e4d8'));
  // el flexo encendido y su luz
  R.linea(290, 116, 296, 92, K); R.linea(296, 92, 284, 84, K); R.poligono([[278, 80], [290, 82], [288, 90], [278, 88]], K); R.poligono([[279, 82], [288, 83], [287, 88], [279, 86]], H('#2e5a3a'));
  luz(270, 110, 50, 30, H('#ffe0a0'), 0.35 + 0.02 * Math.sin(t * 20));
  // la maleta abierta sobre la cama: el retrato entra en «decision», la tapa se cierra en «shape»
  const tapa = ease(tramo(t, forma - 0.3, forma)), dentro = t > decision;
  R.rect(84, 120, 130, 134, K); R.rect(85, 121, 129, 133, H('#8a5a32')); R.rect(85, 121, 129, 122, H('#b07a48'));
  if (tapa < 1) { R.rect(86, 123, 128, 132, H('#c8b08a')); R.rect(90, 124, 106, 131, H('#e8e4d8')); R.rect(108, 124, 124, 131, H('#5a6a8a')); if (dentro) retrato(104, 106 + 16, {}); }
  const th = Math.round(lerp(-22, 0, tapa)); if (tapa < 1) { R.rect(84, 120 + th, 130, 121, K); R.rect(85, 121 + th, 129, 120, H('#7a4a28')); R.rect(85, 121 + th, 129, 122 + th, H('#a8784a')); }
  else { R.rect(84, 116, 130, 121, K); R.rect(85, 117, 129, 120, H('#9a6a3a')); R.rect(103, 118, 110, 120, H('#e8c060')); R.rect(92, 117, 93, 120, H('#d8b070')); R.rect(121, 117, 122, 120, H('#d8b070')); }
  // Victor: trae el retrato del escritorio, lo mete, cierra de golpe y mira a la ventana de Reed
  const u = tramo(t, P11 + 0.1, decision - 0.2), vx = Math.round(lerp(196, 132, ease(u))), mira = t > sabe - 0.2;
  const r = R.actor(VIC, vx, 152, t, { dir: mira ? 1 : -1, anda: u > 0 && u < 1, sostiene: !dentro ? true : (t < forma + 0.1 ? [vx + 2, 120] : undefined), enfado: t > forma || mira, salto: t > forma && t < forma + 0.15 ? 1 : 0 });
  venda(r, mira ? 1 : -1);
  if (!dentro && r?.mano) { const [mx, my] = r.mano.map(Math.round); R.rect(mx - 4, my - 6, mx + 3, my + 2, K); R.rect(mx - 3, my - 5, mx + 2, my + 1, H('#d8a840')); R.rect(mx - 2, my - 4, mx + 1, my, H('#3a2a4a')); R.pset(mx - 1, my - 3, H('#e8c098')); }
  if (t > forma && t < forma + 0.3) for (let k = 0; k < 5; k++) R.pset(84 + k * 11, 113 - Math.round((t - forma) * 20), H('#d8d0c0'));
  // una polilla alrededor del flexo
  const pa = t * 2.4; R.pset(Math.round(282 + Math.cos(pa) * 10), Math.round(94 + Math.sin(pa * 1.6) * 6), H('#e8dcc0'));
};

// ── 12 · la pizarra en rojo: lo que Victor se cuenta ───────────────────────────────────────────────────────────
const p12 = (t) => {
  const decide = @T(59.34), reeds = @T(61.58), sabotea = @T(62.48), envidia = @T(64.34);
  const o = { encuadre: 'laboratorio', camara: 'pizarra', error: ERR, rodea: 0, carga: 0.15 }; T.universidad(R, t, o);
  // todo en rojo (lo imaginado); Reed, a color, resalta en su papel de villano
  T.tinte(R, 0, 179, [190, 40, 50], 0.4);
  // Reed entra de puntillas, mira a los lados, toca el número y en «sabotaged» el 0.8 cambia con un destello
  const u = tramo(t, decide - 0.1, reeds - 0.4), rx = Math.round(lerp(-18, 128, ease(u)));
  const mira = t > reeds - 0.4 && t < reeds ? (Math.floor(t * 4) % 2 ? -1 : 1) : 1;
  R.actor(REED, rx, 150, t, { dir: mira, anda: u > 0 && u < 1, dedo: t > reeds && t < sabotea + 0.6, sonrisa: t > sabotea, salto: u > 0 && u < 1 ? Math.round(Math.abs(Math.sin(t * 8)) * 2) : 0 });
  const cambia = tramo(t, sabotea - 0.2, sabotea + 0.2);
  if (cambia > 0) { for (let y = 113; y < 127; y++) for (let x = 137; x < 164; x++) if (bay(x, y) < cambia * 0.8) R.pset(x, y, H('#3e5e50')); if (cambia >= 1) R.numero('0.8', 151, 125, { color: H('#ff6a5a'), sombra: false, centro: true }); }
  if (t > sabotea && t < sabotea + 0.4) for (let k = 0; k < 8; k++) { const a = k * 0.785, f = (t - sabotea) / 0.4; R.linea(150 + Math.cos(a) * (8 + f * 6), 120 + Math.sin(a) * (6 + f * 4), 150 + Math.cos(a) * (12 + f * 10), 120 + Math.sin(a) * (9 + f * 6), H('#ffffff')); }
  // la envidia: un halo verde alrededor de Reed en «envy»
  if (t > envidia - 0.2) luz(rx + 8, 136, 18, 18, H('#6aff6a'), 0.5 * tramo(t, envidia - 0.2, envidia + 0.3));
  T.universidadDelante(R, t, o); T.tinte(R, 151, 179, [190, 40, 50], 0.4);
  // el borde de nube de lo imaginado
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 168, (y - 90) / 98) + Math.sin(Math.atan2(y - 90, x - 160) * 9 + t * 0.6) * 0.025; if (d > 0.88) R.pset(x, y, d > 0.96 || bay(x, y) < (d - 0.88) * 12 ? H('#2a0a10') : R.pget(x, y)); }
  // Victor, pequeño en la esquina, se lo imagina (a color)
  const rv = R.actor(VIC, 286, 178, t, { dir: -1, enfado: t > reeds });
  venda(rv, -1); for (const [bx, by, br] of [[284, 148, 2], [278, 140, 3], [270, 130, 4]]) { R.disco(bx, by, br + 1, K); R.disco(bx, by, br, H('#f4f2ec')); }
};

// ── 13 · el anuario sobre la manta ─────────────────────────────────────────────────────────────────────────────
// fondo local: la manta gris de lana con su trama y sus pliegues, el anuario abierto con las fotos de los
// estudiantes (renglones sin letras debajo), el retrato de su madre, el billete de tren y el rollo de venda
const anuario = () => horno('anuario', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let c = ((x >> 1) + (y >> 1)) % 2 ? H('#6a6e7a') : H('#5e626e'); const pl = Math.sin(x * 0.03 + y * 0.05) + Math.sin(y * 0.02 - x * 0.01); if (pl > 1.3) c = mez(c, H('#8a8e9a'), 0.4); if (pl < -1.3) c = mez(c, H('#3a3e4a'), 0.4); if (hh(x, y, 111) > 0.95) c = H('#7a7e8a'); R.pset(x, y, c); }
  for (let x = 0; x < 320; x++) for (let y = 170; y < 176; y++) R.pset(x, y, (x + y) % 3 ? H('#8a3a3a') : H('#6a2a2a'));
  // el anuario (x 52–252, y 28–150)
  R.rect(70, 30, 274, 152, H('#3a3e4a')); R.rect(70, 26, 274, 150, K); R.rect(71, 27, 273, 149, H('#2a4a7a'));
  for (const [x0, x1] of [[74, 170], [174, 270]]) for (let y = 30; y < 147; y++) for (let x = x0; x <= x1; x++) { const g = x0 === 74 ? (170 - x) : (x - 174); R.pset(x, y, g < 6 && bay(x, y) < (6 - g) / 8 ? H('#c8c0a8') : H('#f2ecd8')); }
  R.rect(171, 28, 173, 148, H('#8a8070'));
  const pelos = ['#1c1424', '#6a4830', '#d8b860', '#3a2a20', '#a8784a', '#2a2024'], ropas = ['#5a5a66', '#7a6a5a', '#4a5a7a', '#6a5a6a'];
  for (let p = 0; p < 2; p++) for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const x = 82 + p * 100 + i * 30, y = 36 + j * 37, k = p * 9 + i * 3 + j, reed = p === 1 && i === 2 && j === 0;
    R.rect(x, y, x + 20, y + 24, K); rampa(x + 1, y + 1, x + 19, y + 23, [H('#d8d0c0'), H('#b8b0a0')]);
    R.rect(x + 3, y + 16, x + 17, y + 23, reed ? H('#3a5ac8') : H(ropas[k % 4])); R.rect(x + 8, y + 16, x + 12, y + 18, H('#f2eee2'));
    R.disco(x + 10, y + 10, 5, reed ? H('#6a4830') : H(pelos[k % 6])); R.disco(x + 10, y + 11, 4, H('#e8c098')); R.rect(x + 6, y + 6, x + 14, y + 8, reed ? H('#6a4830') : H(pelos[k % 6]));
    R.pset(x + 8, y + 11, K); R.pset(x + 12, y + 11, K); R.pset(x + 10, y + 14, H('#b8604a'));
    R.rect(x, y + 27, x + 20, y + 27, H('#a8a090')); R.rect(x + 2, y + 30, x + 16, y + 30, H('#c8c0b0')); }
  // el billete de tren, el retrato y el rollo de venda
  R.rect(14, 60, 58, 80, K); R.rect(15, 61, 57, 79, H('#e8d8a8')); R.rect(15, 61, 22, 79, H('#c83a3a')); R.numero('14', 42, 76, { color: H('#3a2a20'), sombra: false, centro: true }); for (let y = 64; y < 78; y += 3) R.pset(23, y, K);
  retrato(24, 120); R.disco(296, 150, 12, K); R.disco(296, 150, 11, H('#f4f2ec')); R.disco(296, 150, 4, H('#d8d4c8')); for (let a = 0; a < 6.28; a += 0.7) R.pset(Math.round(296 + Math.cos(a) * 8), Math.round(150 + Math.sin(a) * 8), H('#e0dcd0')); R.rect(256, 160, 296, 168, K); R.rect(256, 161, 296, 167, H('#f4f2ec'));
});
const p13 = (t) => {
  R.copiar(anuario());
  const facil = @T(66.40), enemigo = @T(67.58), error = @T(68.52);
  const RX = 252, RY = 48;   // el centro de la foto de Reed
  // la esquina de la página que levanta la corriente
  const lev = Math.max(0, Math.sin(t * 1.7)) * 3; R.poligono([[270, 146 - lev], [262, 146], [270, 138 - lev]], H('#d8d0b8')); R.linea(262, 146, 270, 138 - lev, H('#a8a090'));
  // el aro rojo que va dibujando el lápiz
  const aro = tramo(t, enemigo - 0.3, enemigo + 0.6), sub = tramo(t, error - 0.1, error + 0.4);
  for (let a = 0; a < 6.283 * aro; a += 0.02) for (const d of [0, 0.7]) R.pset(Math.round(RX + Math.cos(a - 1.6) * (15 + d)), Math.round(RY + 2 + Math.sin(a - 1.6) * (17 + d)), H('#d83a3a'));
  if (sub > 0) for (const dy of [22, 25]) R.linea(RX - 12, RY + dy, RX - 12 + Math.round(24 * sub), RY + dy - 1, H('#d83a3a'));
  // la mano con el lápiz rojo: llega a la foto, la rodea y la subraya
  const llega = ease(tramo(t, P13 + 0.3, facil + 0.3)); let px, py;
  if (aro > 0 && aro < 1) { const a = 6.283 * aro - 1.6; px = RX + Math.cos(a) * 15; py = RY + 2 + Math.sin(a) * 17; }
  else if (sub > 0) { px = RX - 12 + 24 * sub; py = RY + 23 + (sub < 0.5 ? 0 : 3); }
  else { px = lerp(318, RX + 18, llega); py = lerp(110, RY + 20, llega) + (t > error + 0.5 ? Math.max(0, Math.sin(t * 12)) * 2 : 0); }
  const wx = px + 22, wy = py + 8;
  R.linea(px, py, wx - 10, wy - 4, K); R.linea(px + 1, py, wx - 9, wy - 4, H('#c83a3a')); R.linea(px, py + 1, wx - 10, wy - 3, H('#8a2020')); R.pset(px, py, H('#2a1a1a'));
  T.brazo(R, 342, wy + 34, wx, wy, VERDE, -1, {});
  // una polilla que pasa y su sombra
  const mx = ((t * 40) % 420) - 50; R.pset(Math.round(mx), Math.round(30 + Math.sin(t * 5) * 4), H('#d8d0b8')); R.pset(Math.round(mx) + 6, Math.round(40 + Math.sin(t * 5) * 4), H('#3a3e4a'));
};

// ── 14 · el pasillo de noche: se va, y mira atrás con rabia ────────────────────────────────────────────────────
const p14 = (t) => pasilloFinal(t, TT);

const efectos = [[@T(3.10), 'interruptor'], [@T(4.42), 'zumbido'], [@T(6.0), 'golpecito'], [@T(7.22), 'brillo'],
  [@T(9.40), 'puerta'], [@T(15.10), 'lapiz'], [@T(17.30), 'golpecito'], [@T(18.70), 'aviso'], [@T(19.40), 'cerrojo'],
  [@T(21.82), 'tic'], [@T(24.12), 'chof'], [@T(30.36), 'whoosh'], [@T(33.70), 'puerta'], [@T(34.20), 'interruptor'], [@T(34.50), 'zumbido'],
  [@T(35.07), 'boom'], [@T(36.20), 'avalancha'], [@T(42.30), 'pasos'], [@T(43.19), 'sello'], [@T(47.43), 'papel'], [@T(48.43), 'brillo'],
  [@T(52.13), 'cerrojo'], [@T(55.42), 'cerrojo'], [@T(62.48), 'lapiz'], [@T(67.30), 'lapiz'], [@T(70.16), 'puerta']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11], [P12, p12], [P13, p13], [P14, p14]], { efectos, año: null });
'''))

E['vd-culpa'] = ('Fíjate: la culpa', '''// VD-CULPA (frase 15), LA PAUSA «fíjate» del sesgo de autoservicio, sin año. Siete planos:
// 1. el pasillo de vd-maquina CONGELADO en gris azulado; Atom al doble entra, señala a Victor en «notice this», abre
//    los brazos en «all of us» y en «self-serving bias» saca a color la balanza (medalla y dedo que señala fuera);
// 2. la mesa de la consulta de cerca: la balanza grande; en «goes well» cae la medalla y baja su plato; en «own doing»
//    Atom, sobre la mesa, se señala orgulloso;
// 3. la consulta: Atom tropieza con la alfombra y se le caen los libros en «goes wrong»; señala fuera en «outside», al
//    psiquiatra en «another person» y al gato negro que cruza en «bad luck»;
// 4. la biblioteca: el informe «2004» en «2004»; en «pulled together» los estudios vuelan a la mesa y el contador
//    llega a «266» en «studies»; Atom mira con la lupa;
// 5. el parque: en «children», «adults» y «older people», cada grupo echa la culpa al de al lado y sale su balanza;
// 6. el campus: la gente con su balanza pequeña; Victor llega en «Victor» y en «extreme» la suya crece y se vuelca;
// 7. el pasillo congelado otra vez: la balanza al extremo en «enemy for life»; Atom rodea a Victor; vuelve el color.
// Sonido: un golpe seco al congelarse y un clic al salir; un pop por cada balanza.''', _en('vd-culpa', COMUN + r'''
const TT = ''' + TT14 + r''';
const P2 = @T(7.10), P3 = @T(11.26), P4 = @T(18.30), P5 = @T(24.64), P6 = @T(30.90), P7 = @T(37.58);
// el plano congelado: el último instante de vd-maquina (73,75 s)
const congelado = () => horno('congelado', () => pasilloFinal(73.75, TT));
const pausa = (t, a, b) => T.AT.pausa(R, tramo(t, a, a + 0.3) * (1 - tramo(t, b - 0.3, b)));

// ── 1 · la pausa: Atom saca la balanza ─────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  R.copiar(congelado()); pausa(t, 0, P2 - 0.05);
  const fijate = @T(0.30), todos = @T(2.20), sesgo = @T(5.62);
  const anda = tramo(t, 0, 1.0), x = lerp(340, 230, ease(anda)), senala = t > fijate + 0.6 && t < todos, abre = t > todos && t < sesgo - 1.2;
  const a = T.AT.atom(R, x, 172, t, { s: 2, pose: anda < 1 ? 'camina' : senala ? 'senala' : abre ? 'brazos' : t > sesgo - 0.4 ? 'sostiene' : 'quieto', dir: -1, cara: abre ? 'sonrisa' : t > sesgo ? 'guino' : 'normal', habla: voz(t) });
  if (senala) T.AT.anillo(R, 158, 136, 14, 18, t, tramo(t, fijate + 0.6, fijate + 1.2));
  // la balanza a color, al doble, sobre la mano de Atom
  const ub = tramo(t, sesgo - 0.2, sesgo + 0.2);
  if (ub > 0) { const y = 46 + Math.round((1 - ease(ub)) * 30) + Math.round(Math.sin(t * 2.4) * 1.5); T.AT.escalado(R, balanza(Math.sin(t * 1.5) * 0.15), 26, 22, 160, y, 2); if (t > sesgo + 0.2) T.AT.anillo(R, 186, y + 22, 34, 28, t, tramo(t, sesgo + 0.2, sesgo + 0.7)); }
};

// ── 2 · la mesa de la consulta: la medalla ─────────────────────────────────────────────────────────────────────
const p2 = (t) => {
  const o = { encuadre: 'consulta', camara: 'escritorio' }; T.estudio(R, t, o);
  const bien = @T(8.46), mio = @T(10.16);
  const cae = tramo(t, bien - 0.35, bien + 0.05), inc = cae < 1 ? 0 : -Math.min(1, (t - bien - 0.05) * 5) + Math.sin((t - bien) * 14) * 0.15 * Math.max(0, 1 - (t - bien) * 1.5);
  T.AT.escalado(R, balanza(inc, cae >= 1, true), 26, 22, 120, 92, 3);
  if (cae < 1) { const my = lerp(30, 98, cae * cae); R.linea(129, my - 6, 132, my - 2, H('#c83a3a')); R.linea(135, my - 6, 132, my - 2, H('#3a5ac8')); R.disco(132, my + 2, 7, K); R.disco(132, my + 2, 5.5, H('#f0c040')); R.disco(130, my, 2, H('#fff0a0')); }
  if (t > bien && t < bien + 0.4) for (let k = 0; k < 8; k++) { const a = k * 0.785, f = (t - bien) / 0.4; R.pset(Math.round(130 + Math.cos(a) * (10 + f * 12)), Math.round(118 + Math.sin(a) * (6 + f * 8)), H('#fff0a0')); }
  // Atom, sobre la mesa, se señala orgulloso
  const a = T.AT.atom(R, 204, 160, t, { s: 2, pose: t > mio ? 'brazos' : t > bien ? 'senala' : 'quieto', dir: -1, cara: t > bien ? 'sonrisa' : 'normal', habla: voz(t) });
  if (t > mio) T.AT.anillo(R, 204, 128, 20, 30, t, tramo(t, mio, mio + 0.5));
  T.estudioDelante(R, t, o);
};

// ── 3 · la consulta: los libros, el psiquiatra y el gato negro ──────────────────────────────────────────────────
const gatoNegro = (x, suelo, t, anda, dir) => { x = Math.round(x); const p = anda ? Math.floor(t * 8) % 2 : 0, X = (i) => x + i * dir;
  for (const [i, dl] of [[-4, p], [-2, 1 - p], [3, 1 - p], [5, p]]) R.rect(Math.min(X(i), X(i + 1)), suelo - 3 + dl, Math.max(X(i), X(i + 1)), suelo, K);
  R.rect(Math.min(X(-6), X(6)), suelo - 8, Math.max(X(-6), X(6)), suelo - 3, K); R.rect(Math.min(X(4), X(9)), suelo - 12, Math.max(X(4), X(9)), suelo - 6, K);
  R.pset(X(5), suelo - 13, K); R.pset(X(8), suelo - 13, K); R.pset(X(6), suelo - 10, H('#f0e040')); R.pset(X(8), suelo - 10, H('#f0e040'));
  const c = Math.sin(t * 4) * 2; R.linea(X(-6), suelo - 7, X(-10), suelo - 14 + c, K); R.linea(X(-10), suelo - 14 + c, X(-9), suelo - 17 + c, K); R.pset(X(-2), suelo - 7, H('#3a3a4a')); };
const p3 = (t) => {
  const o = { encuadre: 'consulta' }; const g = T.estudio(R, t, o);
  const mal = @T(11.98), fuera = @T(13.92), otro = @T(15.62), suerte = @T(17.24);
  // el psiquiatra, tras el escritorio, toma notas; se sorprende cuando Atom le señala
  R.actor(EL.psiquiatraHM, 250, g.detras ?? 134, t, { dir: -1, sorpresa: t > otro + 0.1 && t < otro + 1.2, habla: false, sostiene: t < otro ? [244, 120] : undefined });
  T.estudioDelante(R, t, o);
  // Atom llega con tres libros, tropieza en «goes wrong», se le caen y busca a quién culpar
  const u = tramo(t, P3, mal), ax = lerp(118, 158, ease(u)), tropieza = t > mal && t < mal + 0.6;
  const pose = u < 1 ? 'camina' : tropieza ? 'brazos' : t > fuera && t < fuera + 1.2 ? 'senala' : t > otro && t < otro + 1.4 ? 'senala' : t > suerte ? 'senala' : 'quieto';
  const dir = t > otro - 0.2 ? 1 : t > fuera ? -1 : 1;
  const a = T.AT.atom(R, ax, 166, t, { pose, dir, cara: tropieza ? 'sorpresa' : t > fuera ? 'guino' : 'normal', habla: voz(t) * 0.7, salto: tropieza ? 2 : 0 });
  for (let k = 0; k < 3; k++) { const c = [H('#c83a3a'), H('#3a6ac8'), H('#e8c040')][k];
    if (t < mal) { const m = a?.mano ?? [ax + 6, 150]; R.rect(m[0] - 5, m[1] - 4 - k * 3, m[0] + 5, m[1] - 2 - k * 3, K); R.rect(m[0] - 4, m[1] - 3 - k * 3, m[0] + 4, m[1] - 3 - k * 3, c); }
    else { const f = Math.min(1, (t - mal) / 0.5), x = ax + 10 + k * 9 * f, y = lerp(146 - k * 3, 170 - k, f) - Math.sin(f * Math.PI) * 14; R.rect(x - 5, y - 2, x + 5, y + 1, K); R.rect(x - 4, y - 1, x + 4, y, c); } }
  // el gato negro cruza en «bad luck»
  const ug = tramo(t, suerte - 1.0, suerte + 1.6); if (ug > 0 && ug < 1) gatoNegro(lerp(330, 196, ease(Math.min(1, ug * 1.6))) - (ug > 0.75 ? (ug - 0.75) * 300 : 0), 176, t, true, ug > 0.75 ? 1 : -1);
  if (t > suerte && t < suerte + 1) R.bocadillo(ax + 2, 128, { icono: '!' });
  if (t > fuera && t < otro - 0.1) T.AT.anillo(R, 120, 172, 18, 6, t, tramo(t, fuera, fuera + 0.4));
  if (t > otro && t < suerte - 0.2) T.AT.anillo(R, 257, 118, 14, 16, t, tramo(t, otro, otro + 0.4));
  if (ug > 0.35 && ug < 0.75) T.AT.anillo(R, 200, 168, 14, 10, t, tramo(t, suerte, suerte + 0.4));
};

// ── 4 · la biblioteca: los estudios ────────────────────────────────────────────────────────────────────────────
// fondo local: la cornisa tranquila arriba, las estanterías de libros de colores con su escalera de raíles, el
// ventanal en arco con el cielo, la pilastra de la derecha con su aplique, la mesa larga de lectura con sus lámparas
// verdes y el suelo de espiga
const biblio = () => horno('biblio', () => {
  rampa(0, 0, 319, 22, [H('#5a3a22'), H('#4a2e1a')]); R.rect(0, 22, 319, 25, K); R.rect(0, 23, 319, 23, H('#a8784a'));
  for (const [x0, x1] of [[0, 118], [202, 272]]) { R.rect(x0, 26, x1, 120, H('#3a2414'));
    for (let s = 0; s < 4; s++) { const y = 28 + s * 23; R.rect(x0, y + 20, x1, y + 22, K); R.rect(x0, y + 20, x1, y + 20, H('#8a5e36'));
      for (let x = x0 + 2, k = 0; x < x1 - 4; k++) { const w = 3 + Math.floor(hh(k, s, 121) * 4), hgt = 13 + Math.floor(hh(k, s + 9, 121) * 6), c = [H('#8a2a2a'), H('#2a4a7a'), H('#3a6a3a'), H('#c8a040'), H('#5a3a6a'), H('#a85a2a'), H('#2a6a6a')][(k + s * 3) % 7];
        R.rect(x, y + 20 - hgt, x + w, y + 19, K); R.rect(x + 1, y + 21 - hgt, x + w - 1, y + 19, c); R.pset(x + 1, y + 23 - hgt, mez(c, H('#ffffff'), 0.4)); R.rect(x + 1, y + 14, x + w - 1, y + 14, H('#e8c060')); x += w + 1; } } }
  // el ventanal en arco (x 124–196, y 30–118)
  R.rect(120, 26, 200, 120, H('#5a3a22')); R.rect(124, 30, 196, 118, H('#9ac0e0'));
  for (let y = 30; y < 118; y++) for (let x = 124; x <= 196; x++) { const u = (y - 30) / 88; R.pset(x, y, u + (bay(x, y) - 0.5) * 0.2 < 0.5 ? H('#8ab8e0') : u < 0.85 ? H('#b8d4ec') : H('#7a9a6a')); }
  for (let x = 124; x <= 196; x++) for (let y = 30; y < 50; y++) if (Math.hypot(x - 160, y - 50) > 36) R.pset(x, y, H('#5a3a22'));
  R.rect(159, 30, 161, 118, H('#5a3a22')); R.rect(124, 72, 196, 74, H('#5a3a22'));
  // la pilastra de la derecha (x 274–319) con el aplique
  R.rect(272, 26, 319, 120, H('#6a4428')); for (let y = 26; y < 120; y += 2) R.rect(276, y, 316, y, H('#5e3c22')); R.rect(272, 26, 275, 120, H('#8a5e36'));
  R.rect(292, 60, 298, 66, K); R.disco(295, 58, 4, H('#f0d890'));
  // la escalera de raíles (x 60–76)
  R.rect(0, 30, 319, 31, H('#c8a040')); for (const sx of [60, 74]) R.rect(sx, 30, sx + 2, 132, H('#6a4428')); for (let y = 40; y < 130; y += 10) R.rect(60, y, 76, y + 1, H('#8a5e36'));
  // la mesa de lectura (y 120–150) y el suelo de espiga
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const a = Math.floor((x + y) / 8), b = Math.floor((x - y + 400) / 8); R.pset(x, y, (a + b) % 2 ? H('#8a5e36') : H('#a8784a')); }
  R.rect(0, 120, 319, 150, H('#2a1a10')); R.rect(10, 122, 310, 128, K); R.rect(11, 123, 309, 126, H('#7a4a2a')); R.rect(11, 123, 309, 123, H('#a8784a')); R.rect(20, 128, 26, 150, K); R.rect(294, 128, 300, 150, K); R.rect(21, 129, 25, 150, H('#5a3a20')); R.rect(295, 129, 299, 150, H('#5a3a20'));
  for (const lx of [64, 262]) { R.rect(lx - 1, 112, lx + 1, 122, K); R.poligono([[lx - 10, 104], [lx + 10, 104], [lx + 7, 112], [lx - 7, 112]], K); R.poligono([[lx - 9, 105], [lx + 9, 105], [lx + 6, 111], [lx - 6, 111]], H('#2e7a3e')); }
});
const p4 = (t) => {
  R.copiar(biblio());
  const dosmil = @T(19.62), juntos = @T(21.38), cifra = @T(22.94), estudios = @T(23.80);
  for (const lx of [64, 262]) luz(lx, 120, 34, 10, H('#fff0b0'), 0.55);
  for (let k = 0; k < 12; k++) { const f = (t * 0.04 + hh(k, 1, 131)) % 1; R.pset(Math.round(128 + hh(k, 2, 131) * 64 + Math.sin(t + k) * 3), Math.round(110 - f * 76), H('#fff8e0')); }
  // la bibliotecaria pasa por detrás de la mesa con un libro
  const ub = tramo(t, P4, P5); R.actor(EL.bibliotecaria, Math.round(lerp(90, 250, ub)), 140, t, { dir: 1, anda: true, sostiene: true });
  R.rect(10, 128, 310, 150, H('#3a2414')); R.rect(10, 128, 310, 129, K); for (let x = 14; x < 310; x += 12) R.rect(x, 131, x + 8, 146, H('#4a2e1a'));
  // el informe de 2004 de pie sobre la mesa
  const ui = tramo(t, dosmil - 0.25, dosmil + 0.1); if (ui > 0) { const y = 122 - Math.round(ease(ui) * 34); R.rect(90, y, 138, y + 34, K); R.rect(91, y + 1, 137, y + 33, H('#2a4a7a')); R.rect(91, y + 1, 94, y + 33, H('#1c3458')); R.rect(96, y + 6, 134, y + 18, H('#f2eee2')); R.numero('2004', 115, y + 16, { color: H('#2a4a7a'), sombra: false, centro: true }); for (let k = 0; k < 3; k++) R.rect(100, y + 22 + k * 3, 130, y + 22 + k * 3, H('#8aa0c8')); }
  // los estudios vuelan de las estanterías a la mesa y se apilan; el contador llega a 266
  const n = Math.round(24 * tramo(t, juntos - 0.2, estudios)), pilas = [[176, 0], [206, 0], [236, 0]];
  for (let k = 0; k < 24; k++) { const t0 = juntos - 0.2 + k * (estudios - juntos + 0.2) / 24, f = tramo(t, t0, t0 + 0.5); if (f <= 0) continue; const p = k % 3, alt = Math.floor(k / 3), xs = hh(k, 1, 133) < 0.5 ? 40 + hh(k, 2, 133) * 70 : 210 + hh(k, 3, 133) * 50, ys = 40 + hh(k, 4, 133) * 70;
    const x = lerp(xs, pilas[p][0], f), y = lerp(ys, 120 - alt * 3, f) - Math.sin(f * Math.PI) * 20; R.rect(Math.round(x) - 7, Math.round(y) - 2, Math.round(x) + 7, Math.round(y) + 1, K); R.rect(Math.round(x) - 6, Math.round(y) - 1, Math.round(x) + 6, Math.round(y), k % 4 ? H('#f2eee2') : H('#e8d8a8')); }
  const cuenta = Math.round(266 * ease(tramo(t, juntos, cifra + 0.4)));
  if (t > juntos) { R.rect(176, 48, 252, 72, K); R.rect(177, 49, 251, 71, H('#f2eee2')); R.rect(177, 49, 251, 50, H('#c8a040')); R.numero(String(cuenta), 214, 70, { tam: 16, centro: true }); }
  // Atom, sobre la mesa, examina las pilas con la lupa
  const a = T.AT.atom(R, 276, 124, t, { pose: 'sostiene', dir: -1, cara: t > estudios ? 'sorpresa' : 'normal', habla: voz(t) * 0.6 });
  if (a?.mano) T.AT.lupa(R, a.mano[0], a.mano[1], 1, -1);
};

// ── 5 · el parque: niños, adultos y mayores ────────────────────────────────────────────────────────────────────
// fondo local: el cielo tramado con nubes de tres tonos y pájaros, la arboleda del fondo, el estanque con patos, el
// tobogán y el arenero, el banco, las farolas y el paseo de grava con matas y flores
const parque = () => horno('parque', () => {
  rampa(0, 0, 319, 88, [H('#6a9ad8'), H('#8ab4e4'), H('#b8d4ec')]);
  for (let x = 0; x < 320; x++) { const hgt = 70 + Math.round(6 * Math.sin(x * 0.09) + 4 * Math.sin(x * 0.23)); for (let y = hgt; y < 100; y++) R.pset(x, y, hh(x >> 1, y >> 1, 141) > 0.6 ? H('#3a6a3a') : H('#2e5a30')); }
  for (let k = 0; k < 9; k++) { const x = 14 + k * 36 + hh(k, 1, 143) * 10; R.disco(x, 74, 10 + hh(k, 2, 143) * 5, H('#4a7a3a')); R.disco(x - 3, 70, 6, H('#6a9a4a')); }
  for (let y = 96; y < 180; y++) for (let x = 0; x < 320; x++) { let c = (x * 7 + y * 3) % 11 === 0 ? H('#5a9a3a') : hh(x, y, 145) > 0.85 ? H('#4a8a32') : H('#6aaa44'); R.pset(x, y, c); }
  // matas, tréboles y la sombra de los árboles sobre el césped
  for (let k = 0; k < 70; k++) { const x = Math.floor(hh(k, 1, 152) * 316), y = 100 + Math.floor(hh(k, 2, 152) * 38); R.pset(x, y, H('#3a7a2a')); R.pset(x + 1, y - 1, H('#4a8a32')); R.pset(x + 2, y, H('#3a7a2a')); R.pset(x + 1, y - 2, H('#7aba54')); }
  for (let y = 98; y < 108; y++) for (let x = 0; x < 320; x++) if (Math.sin(x * 0.11) > 0.2 && bay(x, y) < 0.45) R.pset(x, y, mez(R.pget(x, y), H('#2e5a30'), 0.45));
  for (const [bx, by, r] of [[176, 132, 8], [198, 134, 6], [300, 134, 9], [6, 134, 7]]) { R.disco(bx, by, r + 1, H('#2a5a28')); R.disco(bx, by - 1, r, H('#3a7a32')); R.disco(bx - 2, by - 3, r * 0.5, H('#5a9a44')); for (let k = 0; k < 4; k++) R.pset(bx - r + 2 + k * 4, by - 2 + (k % 2) * 3, H('#e84a5a')); }
  for (let y = 140; y < 168; y++) for (let x = 0; x < 320; x++) R.pset(x, y, hh(x, y, 147) > 0.8 ? H('#b8a888') : hh(x, y, 148) > 0.6 ? H('#d8c8a8') : H('#c8b898'));
  for (let k = 0; k < 14; k++) { const x = Math.floor(hh(k, 5, 153) * 310), y = 143 + Math.floor(hh(k, 6, 153) * 22); R.disco(x, y, 1.5, H('#a89878')); R.pset(x, y - 1, H('#e8dcc0')); }
  R.rect(0, 139, 319, 139, H('#8a7a5a')); R.rect(0, 168, 319, 168, H('#8a7a5a'));
  for (let k = 0; k < 40; k++) { const x = Math.floor(hh(k, 1, 149) * 318), y = 170 + Math.floor(hh(k, 2, 149) * 9); R.pset(x, y, [H('#f0e040'), H('#e84a5a'), H('#ffffff')][k % 3]); }
  // el estanque (x 228–316, y 108–132)
  for (let y = 106; y < 134; y++) for (let x = 224; x < 320; x++) { const d = Math.hypot((x - 272) / 48, (y - 120) / 14); if (d < 1) R.pset(x, y, d > 0.9 ? H('#8a7a5a') : (y + Math.floor(x / 6)) % 5 === 0 ? H('#8ab8e0') : H('#4a7ab8')); }
  // el tobogán y el arenero (izquierda)
  R.rect(14, 96, 16, 138, K); R.rect(34, 96, 36, 138, K); for (let y = 100; y < 136; y += 6) R.rect(14, y, 36, y + 1, H('#c83a3a'));
  R.poligono([[36, 96], [42, 96], [78, 134], [70, 136]], K); R.poligono([[37, 97], [41, 97], [76, 134], [71, 135]], H('#e8c040'));
  R.rect(84, 124, 130, 138, K); R.rect(85, 125, 129, 137, H('#e8d8a8')); for (let k = 0; k < 20; k++) R.pset(86 + Math.floor(hh(k, 1, 151) * 42), 126 + Math.floor(hh(k, 2, 151) * 10), H('#c8b888')); R.rect(84, 124, 130, 125, H('#8a5e36'));
  // el banco de los mayores (x 236–286, y 140–150) y dos farolas
  R.rect(234, 132, 288, 136, K); R.rect(235, 133, 287, 135, H('#8a5e36')); R.rect(234, 140, 288, 143, K); R.rect(235, 141, 287, 142, H('#a8784a')); R.rect(238, 143, 240, 150, K); R.rect(282, 143, 284, 150, K);
  for (const fx of [140, 212]) { R.rect(fx, 82, fx + 2, 140, K); R.rect(fx - 3, 76, fx + 5, 82, K); R.rect(fx - 2, 77, fx + 4, 81, H('#f0e8c0')); }
});
const p5 = (t) => {
  R.copiar(parque());
  const ninos = @T(26.96), adultos = @T(28.08), mayores = @T(29.16);
  for (const [y, w, v, k] of [[20, 40, 4, 0], [34, 30, 7, 1], [50, 50, 2.5, 2], [26, 26, 5.5, 3], [44, 36, 3.2, 4], [58, 24, 6, 5]]) nube(((k * 97 + t * v) % 420) - 60, y, w);
  // la cometa del niño del fondo, con su cola que ondea
  { const kx = 196 + Math.sin(t * 0.7) * 6, ky = 30 + Math.sin(t * 1.1) * 4; R.poligono([[kx, ky - 6], [kx + 5, ky], [kx, ky + 7], [kx - 5, ky]], K); R.poligono([[kx, ky - 5], [kx + 4, ky], [kx, ky + 6], [kx - 4, ky]], H('#e84a3a')); R.linea(kx, ky - 5, kx, ky + 6, H('#f0d040'));
    for (let i = 0; i < 8; i++) R.pset(Math.round(kx + Math.sin(t * 4 + i * 0.8) * 2), Math.round(ky + 8 + i * 2), i % 2 ? H('#3a6ac8') : H('#f0d040')); R.linea(kx, ky + 7, 214, 96, H('#e8e4d8')); }
  // un perro cruza el paseo corriendo detrás de una pelota
  { const dx = ((t - P5) * 46) % 420 - 50, dy = 166, p = Math.floor(t * 10) % 2; R.disco(dx - 14 + Math.max(0, 6 - ((t * 3) % 2) * 6), dy - 3 - Math.abs(Math.sin(t * 6)) * 4, 2, H('#e8e040'));
    R.rect(dx - 5, dy - 7, dx + 5, dy - 3, K); R.rect(dx - 4, dy - 6, dx + 4, dy - 4, H('#a8743a')); R.rect(dx + 4, dy - 10, dx + 9, dy - 5, K); R.rect(dx + 5, dy - 9, dx + 8, dy - 6, H('#a8743a')); R.pset(dx + 7, dy - 8, K);
    for (const [lx, ph] of [[-4, p], [-1, 1 - p], [2, p], [4, 1 - p]]) R.rect(dx + lx, dy - 3, dx + lx, dy - ph, K); R.linea(dx - 5, dy - 6, dx - 8, dy - 9 + p, K); }
  for (let k = 0; k < 3; k++) pajaro(((t * 22 + k * 40) % 380) - 30, 26 + k * 5 + Math.sin(t * 2 + k) * 2, t + k, H('#2a2a34'));
  for (let k = 0; k < 3; k++) { const px = 240 + ((t * (4 + k) + k * 25) % 60), py = 116 + k * 4; R.rect(Math.round(px), py, Math.round(px) + 5, py + 2, K); R.rect(Math.round(px) + 1, py, Math.round(px) + 4, py + 1, H('#f2eee2')); R.rect(Math.round(px) + 4, py - 2, Math.round(px) + 5, py - 1, H('#2e6a3a')); R.pset(Math.round(px) + 6, py - 1, H('#e8a040')); }
  // cada grupo: uno se equivoca y señala al de al lado; arriba sale su balanza (la medalla sube, el dedo baja)
  const grupo = (a, b, xa, xb, s, t0, extra) => { const culpa = t > t0;
    R.actor(a, xa, s, t, { dir: 1, dedo: culpa, enfado: culpa });
    R.actor(b, xb, s, t, { dir: -1, sorpresa: culpa && t < t0 + 1.4, triste: t > t0 + 1.4 });
    if (extra) extra(culpa);
    const ub = tramo(t, t0 + 0.1, t0 + 0.4); if (ub > 0) T.AT.escalado(R, balanza(0.9), 26, 22, (xa + xb) / 2 - 18, 96 - Math.round(ease(ub) * 8), 1.5); };
  grupo(EL.nino62, EL.nina, 92, 112, 146, ninos, (c) => { const h = c ? Math.max(0, 6 - (t - ninos) * 20) : 6; R.poligono([[100, 146], [110, 146], [108, 146 - h], [102, 146 - h]], H('#c8a868')); });
  grupo(EL.senor30, EL.senora30, 156, 178, 154, adultos, (c) => { R.rect(170, 136, 174, 141, K); R.rect(171, 137, 173, 140, H('#f2eee2')); if (c) for (let k = 0; k < 4; k++) R.pset(172 + k, 142 + Math.min(10, Math.round((t - adultos) * 30)) - k, H('#6a3a20')); });
  grupo(EL.abuela62, EL.abuela, 244, 268, 150, mayores, (c) => { const ov = c ? Math.min(30, (t - mayores) * 40) : 0; R.disco(262 + ov, 146 + Math.min(3, ov), 3, H('#c83a3a')); R.linea(258, 140, 262 + ov, 146, H('#e85a5a')); });
};

// ── 6 · el campus: las balanzas de la gente y la de Victor ─────────────────────────────────────────────────────
const p6 = (t) => {
  const o = { encuadre: 'campus' }; T.universidad(R, t, o);
  const victor = @T(31.22), humano = @T(35.38), extremo = @T(36.60);
  const gente = [[EL.estudiante1DU, 40, 1, 0.6], [EL.chica, 300, -1, 0.9], [EL.estudiante2DU, 120, 1, 0.4], [EL.chico, 250, -1, 0.7]];
  const mira = t > extremo + 0.2;
  gente.forEach(([d, x0, dir, v], k) => { const x = Math.round(x0 + dir * (t - P6) * 10 * v * (mira ? 0 : 1) + (mira ? dir * (extremo + 0.2 - P6) * 10 * v : 0)); const r = R.actor(d, x, 152 + (k % 2) * 6, t, { dir: mira ? (x < 190 ? 1 : -1) : dir, anda: !mira, sorpresa: mira });
    T.AT.escalado(R, balanza(0.3 + Math.sin(t * 2 + k) * 0.15), 26, 22, x - 6, 152 + (k % 2) * 6 - 46, 1); });
  // Victor llega con la maleta y su balanza crece y se vuelca en «extreme»
  const u = tramo(t, victor - 0.4, victor + 1.4), vx = Math.round(lerp(330, 196, ease(u)));
  const r = R.actor(VIC, vx, 162, t, { dir: -1, anda: u > 0 && u < 1, sostiene: [vx + 1, 151], enfado: t > extremo });
  venda(r, -1); maletaMano(r?.mano);
  const s = lerp(1, 2.4, ease(tramo(t, humano - 0.3, humano + 0.6))), inc = lerp(0.3, 1, ease(tramo(t, extremo - 0.1, extremo + 0.15))) + (t > extremo + 0.15 ? Math.sin((t - extremo) * 18) * 0.12 * Math.max(0, 1 - (t - extremo) * 2) : 0);
  T.AT.escalado(R, balanza(inc), 26, 22, vx + 8 - 13 * s, 162 - 34 - 22 * s, s);
  if (t > extremo && t < extremo + 0.5) for (let k = 0; k < 6; k++) R.pset(Math.round(vx + 8 + 13 * s * 0.8 + Math.cos(k) * (t - extremo) * 30), Math.round(162 - 34 - 22 * s * 0.2 + Math.sin(k) * (t - extremo) * 20), H('#ffffff'));
  T.universidadDelante(R, t, o);
};

// ── 7 · la pausa otra vez: la balanza al extremo ───────────────────────────────────────────────────────────────
const p7 = (t) => {
  R.copiar(congelado()); pausa(t, P7, E.duracion);
  const enemigo = @T(38.44), vida = @T(39.88), error = @T(40.66);
  const a = T.AT.atom(R, 222, 172, t, { s: 2, pose: t > vida ? 'senala' : 'sostiene', dir: -1, cara: t > error ? 'triste' : 'normal', habla: voz(t) });
  const inc = lerp(0.3, 1, ease(tramo(t, enemigo - 0.2, enemigo + 0.3)));
  T.AT.escalado(R, balanza(inc + (t > enemigo + 0.3 ? Math.sin((t - enemigo) * 16) * 0.1 * Math.max(0, 1 - (t - enemigo)) : 0)), 26, 22, 160, 48, 2);
  if (t > vida) T.AT.anillo(R, 158, 136, 14, 18, t, tramo(t, vida, vida + 0.6));
};

const efectos = [[0.05, 'tapestop'], [@T(5.62), 'pop'], [@T(8.70), 'campana'], [@T(11.98), 'chof'], [@T(15.62), 'tic'], [@T(17.24), 'miau'],
  [@T(19.62), 'pop'], [@T(21.38), 'papel'], [@T(23.80), 'brillo'], [@T(26.96), 'pop'], [@T(28.08), 'pop'], [@T(29.16), 'pop'],
  [@T(36.60), 'golpecito'], [@T(37.62), 'tapestop'], [@T(38.70), 'golpecito'], [E.duracion - 0.3, 'interruptor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año: null });
'''))
