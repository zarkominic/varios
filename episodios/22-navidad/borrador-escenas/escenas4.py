# Borrador de escenas del ep22 (grupo S4): nv-teorias, nv-saturnales, nv-lutero.
# Los instantes se escriben @(s) con s = segundos de la palabra dentro de la escena (linea.json); al cargar el módulo se
# convierten en en('<marca>', fracción) de su frase, que es lo que queda en el .html.
import re

MARCAS = {'teorias': (0.5, 21.278), 'saturnales': (0.5, 16.332), 'lutero': (0.9, 20.873)}


def _en(k, cuerpo):
    a, b = MARCAS[k]
    return re.sub(r'@\(([-0-9.]+)\)', lambda m: f"en('{k}', {round((float(m.group(1)) - a) / (b - a), 4)})", cuerpo)


# piezas comunes de las tres escenas (fondos locales en búfer, nubes de tres tonos, brillos)
COMUN = r'''
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const H = (c) => hex(c), K = hex('#1a1420');
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], umbral = (x, y) => (BAY[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
const capas = new Map();
const capa = (clave, dibuja) => { let b = capas.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); capas.set(clave, b); } return b; };
const fondo = (clave, dibuja) => R.copiar(capa(clave, dibuja));
// halo: mezcla col sobre lo que ya hay, más fuerte en el centro
const halo = (cx, cy, r, col, a) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d < 1) { const x = cx + i, y = cy + j; R.pset(x, y, mez(R.pget(x, y), col, a * (1 - d) ** 1.4)); } } };
// nube de tres tonos (sombra, medio, luz)
const nube3 = (x, y, w, cs) => { x = Math.round(x); const n = Math.max(2, Math.round(w / 7));
  for (let i = 0; i < n; i++) { const r = 3 + Math.round(3 * Math.sin((i + 0.5) / n * Math.PI)); R.disco(x + i * 7, y + 2, r, cs[0]); }
  for (let i = 0; i < n; i++) { const r = 2 + Math.round(3 * Math.sin((i + 0.5) / n * Math.PI)); R.disco(x + i * 7, y, r, cs[1]); }
  for (let i = 0; i < n; i++) { const r = Math.round(2 * Math.sin((i + 0.5) / n * Math.PI)); if (r > 0) R.disco(x + i * 7 - 1, y - 2, r, cs[2]); } };
const pajaro = (x, y, t, k, c) => { const a = Math.sin(t * 11 + k) > 0; x = Math.round(x); y = Math.round(y); R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : -1), c); R.pset(x + 2, y - (a ? 2 : -1), c); };
// madera con vetas, nudos y juntas (tablas horizontales de alto h)
const madera = (x0, y0, x1, y1, h, base, veta, luz, junta, k = 0) => { R.rect(x0, y0, x1, y1, base);
  for (let y = y0; y <= y1; y++) { const tabla = Math.floor((y - y0) / h), dy = (y - y0) % h; if (dy === 0) { R.rect(x0, y, x1, y, junta); continue; } if (dy === 1) { R.rect(x0, y, x1, y, luz); continue; }
    for (let x = x0; x <= x1; x++) { const v = Math.sin(x * 0.045 + tabla * 7 + Math.sin(x * 0.013 + tabla) * 3 + dy * 0.9); if (v > 0.93) R.pset(x, y, veta); else if (hh(x >> 1, y, k + tabla) < 0.05) R.pset(x, y, veta); } }
  for (let n = 0; n < (x1 - x0) / 40; n++) { const nx = x0 + Math.round(hh(n, 1, k) * (x1 - x0)), ny = y0 + Math.round(hh(n, 2, k) * (y1 - y0)); R.disco(nx, ny, 2, veta); R.pset(nx, ny, junta); } };
// estrella de cinco puntas grande (relleno y contorno)
const estrella5 = (cx, cy, r, col, borde) => { const P = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; P.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
  R.poligono(P.map(([x, y]) => [x + 1, y + 1]), borde); R.poligono(P.map(([x, y]) => [x - 1, y]), borde); R.poligono(P.map(([x, y]) => [x, y - 1]), borde); R.poligono(P, col); };
'''

E = {}

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nv-teorias'] = ('Dos teorías', '''// NV-TEORIAS (frase 12), 354. Cuatro planos:
// 1. (fondo local) el Circo Máximo al amanecer del 25 de diciembre, la fiesta del Sol: dos cuadrigas pasan entre el
//    gentío; dos cristianos llegan por delante y, en «replace», él alza una estrella y otra se enciende junto al sol;
// 2. (copista) corta en «But»: el copista entra por la puerta, deja el códice y escribe; en su globo, el calendario del
//    25 («conceived»), el «=» («same day») y el otro 25 («died»): la concepción y la muerte el mismo día;
// 3. (fondo local) corta en «March»: la rueda del año en el muro pintado; marzo se enciende con su «25» y la aguja salta
//    nueve meses (1…9, en «nine months later») hasta diciembre, que se enciende con su «25»;
// 4. (templo, altar) corta en «Historians»: el escriba de un lado y el copista del otro discuten, cada uno con su
//    platillo (el sol y el calendario); la balanza va de un lado a otro y en «nobody knows» tiembla sin decidirse y sale
//    el «?»; los dos se encogen de hombros.''', _en('teorias', COMUN + r'''
const P2 = @(6.51), P3 = @(12.07), P4 = @(16.73);
// ── 1 · el Circo Máximo al amanecer ──
const CIELO = ['#2c2a62', '#3e3474', '#5a3e80', '#7e4a86', '#a8587e', '#d07074', '#ee9472', '#fbbc84', '#ffdca0'].map(H);
const TUNICAS = ['#ece4d4', '#c84a3a', '#3a6aa8', '#e0b040', '#6a9a5a', '#a8506a', '#f6f2ea', '#8a6a4a', '#5a8ac0'].map(H);
const PIEL = [H('#f0c090'), H('#d0946a'), H('#a8704a')];
const circo = () => { const { rect, pset, disco, linea, poligono } = R;
  for (let y = 0; y < 82; y++) { const u = y / 82 * (CIELO.length - 1), i = Math.floor(u), fr = u - i; for (let x = 0; x < 320; x++) pset(x, y, fr > umbral(x, y) ? CIELO[Math.min(CIELO.length - 1, i + 1)] : CIELO[i]); }
  halo(244, 70, 40, H('#ffd890'), 0.55); disco(244, 70, 14, H('#ffc860')); disco(244, 70, 12, H('#ffe7a8')); disco(241, 67, 6, H('#fff6dc'));
  // colinas lejanas (Albanos) con la luz del alba en el filo
  for (let x = 0; x < 320; x++) { const top = Math.round(72 + 3 * Math.sin(x * 0.03) + 2 * Math.sin(x * 0.11 + 1)); rect(x, top, x, 88, H('#86608c')); pset(x, top, H('#c08494')); if (hh(x, 3) < 0.3) pset(x, top + 2 + Math.round(hh(x, 4) * 6), H('#765482')); }
  // el acueducto, a contraluz, por la derecha
  rect(150, 70, 319, 73, H('#7a5470')); rect(150, 70, 319, 70, H('#c88a8a'));
  for (let x = 152; x < 320; x += 12) { rect(x, 74, x + 3, 88, H('#6e4a66')); pset(x + 3, 74, H('#b07a84')); for (let a = 0; a <= 8; a++) { const yy = 74 + Math.round(4 - Math.sqrt(16 - ((a - 4) / 4 * 4) ** 2)); pset(x + 4 + a, yy, H('#6e4a66')); } }
  // el Palatino: palacios sobre la colina con sus columnas, tejados y ventanas
  for (let x = 0; x < 150; x++) { const top = Math.round(60 + 4 * Math.sin(x * 0.05) + (x > 120 ? (x - 120) * 0.5 : 0)); rect(x, top, x, 88, H('#5a3c5e')); }
  for (const [x0, y0, x1] of [[6, 42, 30], [32, 34, 60], [62, 44, 84], [86, 38, 112], [114, 48, 136]]) {
    rect(x0, y0, x1, 64, H('#74506c')); rect(x1 - 2, y0, x1, 64, H('#b8787c')); poligono([[x0 - 2, y0], [x1 + 2, y0], [(x0 + x1) / 2, y0 - 6]], H('#8a4650')); linea(x0 - 2, y0, (x0 + x1) / 2, y0 - 6, H('#c06a6a'));
    for (let x = x0 + 2; x < x1 - 2; x += 3) { rect(x, y0 + 3, x, y0 + 12, H('#9a7488')); }
    for (let x = x0 + 3; x < x1 - 3; x += 5) for (let y = y0 + 16; y < 60; y += 7) { pset(x, y, hh(x, y) < 0.35 ? H('#ffd890') : H('#3e2a44')); pset(x, y + 1, hh(x, y) < 0.35 ? H('#e8a860') : H('#3e2a44')); } }
  for (const [x, s] of [[2, 1], [142, 1.2], [148, 0.9], [298, 1], [308, 1.2]]) { const hgt = Math.round(22 * s); for (let j = 0; j < hgt; j++) { const w = Math.round(Math.sin((j + 1) / hgt * Math.PI) * 3 * s); rect(x - w, 84 - j, x + w, 84 - j, H('#2e2438')); } }
  // las gradas del otro lado: pórtico de arriba, gentío en cuatro filas y la arcada de abajo
  rect(0, 84, 319, 85, H('#ecd8bc')); rect(0, 86, 319, 86, H('#7a5a5a')); rect(0, 87, 319, 92, H('#4e3848'));
  for (let x = 0; x < 320; x += 8) { rect(x, 87, x + 1, 92, H('#efe0c6')); pset(x + 1, 87, H('#fff4dc')); }
  for (let y = 93; y < 110; y++) { const r = (y - 93) % 4; for (let x = 0; x < 320; x++) {
    if (r === 3) { pset(x, y, x % 9 === 0 ? H('#a89070') : H('#d8c4a4')); continue; }
    if (r === 0) { pset(x, y, x % 2 === 0 && hh(x, y, 5) < 0.85 ? PIEL[Math.floor(hh(x, y, 6) * 3)] : H('#9a8268')); continue; }
    pset(x, y, TUNICAS[Math.floor(hh(x >> 1, y >> 2, 7) * TUNICAS.length)]); if (hh(x, y, 8) < 0.12) pset(x, y, H('#6a5a4a')); } }
  rect(0, 110, 319, 120, H('#c8b090')); rect(0, 110, 319, 110, H('#e8d4b0'));
  for (let x = 4; x < 320; x += 16) { rect(x, 113, x + 7, 120, H('#3a2a2a')); rect(x + 1, 112, x + 6, 112, H('#3a2a2a')); rect(x - 2, 110, x - 1, 120, H('#dcc6a2')); }
  for (let x = 20; x < 320; x += 32) { rect(x - 1, 110, x + 2, 115, H('#b8302a')); pset(x, 116, H('#b8302a')); pset(x + 1, 115, H('#f0c040')); }
  // la pista de atrás y la espina con el obelisco, la estatua del Sol, los huevos, los delfines y las metas
  for (let y = 121; y < 126; y++) for (let x = 0; x < 320; x++) pset(x, y, hh(x, y, 9) < 0.25 ? H('#c8945e') : H('#dcae74'));
  for (let y = 126; y < 135; y++) for (let x = 0; x < 320; x++) pset(x, y, hh(x, y, 9) < 0.25 ? H('#c8945e') : H('#dcae74'));
  rect(22, 124, 298, 125, H('#f6f0e2')); rect(24, 126, 296, 133, H('#e2d8c4')); rect(24, 134, 296, 134, H('#a49882'));
  for (let x = 30; x < 296; x += 20) { rect(x, 127, x + 14, 127, H('#c8bca6')); rect(x, 132, x + 14, 132, H('#c8bca6')); rect(x, 127, x, 132, H('#c8bca6')); rect(x + 14, 127, x + 14, 132, H('#f4eee0')); }
  for (let x = 26; x < 294; x++) if (x % 3) pset(x, 123, H('#5a8ac0'));
  poligono([[156, 124], [164, 124], [162, 54], [158, 54]], H('#c8a888')); poligono([[160, 124], [164, 124], [162, 54], [160, 54]], H('#e8c8a0')); poligono([[157, 54], [163, 54], [160, 48]], H('#f0c050')); pset(160, 49, H('#fff0b0'));
  for (let y = 60; y < 120; y += 5) { pset(159, y, H('#9a7a60')); pset(161, y + 2, H('#b08a68')); }
  rect(230, 96, 234, 124, H('#e8dcc8')); rect(233, 96, 234, 124, H('#b8ac98')); rect(228, 94, 236, 95, H('#f4ecdc'));
  disco(232, 88, 7, H('#a87a18')); disco(232, 88, 6, H('#f0c040')); disco(230, 86, 2, H('#fff0a0'));
  for (const [x0, x1] of [[62, 86], [94, 118]]) { rect(x0, 110, x0 + 1, 124, H('#6a4a30')); rect(x1 - 1, 110, x1, 124, H('#6a4a30')); rect(x0, 110, x1, 111, H('#8a6a40')); }
  for (let k = 0; k < 7; k++) { rect(64 + k * 3, 107, 65 + k * 3, 109, H('#f4ecdc')); pset(64 + k * 3, 107, H('#ffffff')); rect(96 + k * 3, 108, 98 + k * 3, 109, H('#c09040')); pset(98 + k * 3, 107, H('#c09040')); }
  for (const x of [44, 132, 192, 266]) { rect(x - 2, 118, x + 2, 124, H('#d8ccb6')); rect(x - 1, 110, x + 1, 117, H('#9a7a40')); pset(x, 109, H('#c8a050')); }
  for (const x0 of [28, 286]) for (let k = 0; k < 3; k++) poligono([[x0 + k * 3 - 1, 124], [x0 + k * 3 + 2, 124], [x0 + k * 3 + 0.5, 108]], H('#e0b040'));
  // la pista de delante: arena rastrillada con surcos y huellas
  for (let y = 135; y < 156; y++) for (let x = 0; x < 320; x++) { const n = hh(x >> 1, y, 10); pset(x, y, n < 0.18 ? H('#cf9c62') : n > 0.94 ? H('#f4cc94') : H('#e4b67a')); }
  for (let k = 0; k < 46; k++) { const y = 136 + Math.floor(hh(k, 1, 11) * 19), x0 = Math.floor(hh(k, 2, 11) * 300), L = 10 + Math.floor(hh(k, 3, 11) * 40); rect(x0, y, x0 + L, y, H('#d4a46a')); }
  for (const yb of [142, 151]) for (let x = 0; x < 320; x++) { const y = yb + Math.round(Math.sin(x * 0.04 + yb) * 1); pset(x, y, H('#c08c56')); if (x % 11 < 2) pset(x, y + 1, H('#b47e4a')); }
  // la barrera de mármol con guirnaldas y el graderío de delante
  rect(0, 156, 319, 157, H('#f4ecdc')); rect(0, 158, 319, 166, H('#d8cdb8')); rect(0, 167, 319, 167, H('#9a8e78'));
  for (let x = 0; x < 320; x += 40) { rect(x + 3, 159, x + 37, 159, H('#b4a890')); rect(x + 3, 165, x + 37, 165, H('#eee6d4')); rect(x + 3, 159, x + 3, 165, H('#b4a890')); rect(x + 37, 159, x + 37, 165, H('#eee6d4'));
    for (let a = 0; a <= 34; a++) { const y = 159 + Math.round(Math.sin(a / 34 * Math.PI) * 4); pset(x + 3 + a, y, H('#2a5a2a')); pset(x + 3 + a, y + 1, a % 3 ? H('#3a7a3a') : H('#5a9a4a')); }
    for (const e of [3, 37]) { rect(x + e - 1, 158, x + e + 1, 160, H('#c8302a')); pset(x + e, 161, H('#c8302a')); } }
  for (let y = 168; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, (y - 168) % 6 === 0 ? H('#c0ac8e') : (y - 168) % 6 === 5 ? H('#7a6a54') : hh(x, y, 12) < 0.1 ? H('#968468') : H('#a89478'));
};
const NUBE_ALBA = [H('#8a5a86'), H('#e08a8a'), H('#ffd0a8')];
const carroPolvo = (x, suelo, t, mueve) => { if (!mueve) return; for (let k = 0; k < 6; k++) { const px = Math.round(x + 14 + k * 7 + Math.sin(t * 20 + k) * 2), py = suelo - 2 - k, r = 1 + Math.round(k * 0.6); R.disco(px, py, r, k % 2 ? H('#f4dcb0') : H('#e8c898')); } };
const p1 = (t) => { fondo('circo', circo);
  for (const [x0, y, w, v] of [[30, 26, 46, 2], [190, 36, 30, 3.5], [120, 44, 56, 1.4], [300, 30, 34, 2.6]]) nube3(((x0 + t * v) % 400) - 40, y, w, NUBE_ALBA);
  for (let k = 0; k < 4; k++) pajaro(((40 + t * 16 + k * 41) % 360) - 20, 48 + k * 3 + Math.sin(t * 1.3 + k) * 3, t, k, H('#3a2a40'));
  for (let k = 0; k < 12; k++) { const a = -Math.PI + (k + 0.5) * Math.PI / 12 + Math.sin(t * 0.6) * 0.05, L = 20 + 4 * Math.sin(t * 3 + k * 1.7); for (let r = 16; r < L; r++) { const x = Math.round(244 + Math.cos(a) * r), y = Math.round(70 + Math.sin(a) * r); if (y < 72) R.pset(x, y, mez(R.pget(x, y), H('#fff0c0'), 0.55)); } }
  for (let k = 0; k < 8; k++) { const x = 18 + k * 40, w = Math.round(Math.sin(t * 6 + k) * 1.5); R.rect(x, 78, x, 84, H('#5a4050')); R.rect(x + 1, 78 + (w > 0 ? 1 : 0), x + 5, 80, k % 2 ? H('#c8302a') : H('#f0c040')); R.pset(x + 6, 79 + w, k % 2 ? H('#c8302a') : H('#f0c040')); }
  const xA = Math.round(lerp(350, -90, tramo(t, @(0.1), @(3.0)))), xB = Math.round(lerp(400, -60, tramo(t, @(0.4), @(3.6)))), xD = Math.round(lerp(360, -80, tramo(t, @(3.1), @(6.5))));
  const ola = (x) => Math.max(0, 1 - Math.abs(x - 160) / 140);
  for (let k = 0; k < 110; k++) { const x = Math.floor(hh(k, 1, 7) * 320), y = 93 + Math.floor(hh(k, 2, 7) * 4) * 4; if (Math.sin(t * 7 + k) > 0.6 - ola(xA) * 1.2) { R.pset(x, y - 1, PIEL[k % 3]); R.pset(x, y - 2, PIEL[k % 3]); } }
  R.carro(xA, 146, t, { dir: -1, galopa: true, conductor: EL.romanoPileo });
  carroPolvo(xA, 146, t, xA > -90 && xA < 360);
  R.carro(xB, 155, t, { dir: -1, galopa: true, color: H('#e8e0d0'), sombra: H('#a8a090'), conductor: EL.romanoPileo2 });
  carroPolvo(xB, 155, t, xB > -80 && xB < 380);
  R.carro(xD, 146, t, { dir: -1, galopa: true, color: H('#5a3a2a'), sombra: H('#3a2418'), conductor: EL.romanoPileo2 }); carroPolvo(xD, 146, t, xD > -80 && xD < 360);
  // el gentío de delante, que se levanta cuando pasan los carros
  for (let k = 0; k < 11; k++) { const cx = 6 + k * 13, cy = 172 + (k % 2) * 3, sube = Math.abs(xA - cx) < 50 || Math.abs(xB - cx) < 50 || Math.abs(xD - cx) < 50 || Math.sin(t * 3 + k * 2) > 0.9;
    R.rect(cx - 6, cy + 3, cx + 6, 180, K); R.rect(cx - 5, cy + 4, cx + 5, 180, TUNICAS[(k * 3) % TUNICAS.length]); R.rect(cx - 5, cy + 4, cx - 4, 180, mez(TUNICAS[(k * 3) % TUNICAS.length], H('#ffffff'), 0.3));
    if (sube) { R.rect(cx + 5, cy - 7, cx + 7, cy + 4, K); R.rect(cx + 6, cy - 6, cx + 6, cy + 3, PIEL[k % 3]); }
    R.disco(cx, cy, 5, K); R.disco(cx, cy, 4, PIEL[k % 3]); R.rect(cx - 4, cy - 4, cx + 4, cy - 2, k % 3 ? H('#3a2418') : H('#6a4a2a')); }
  // los dos cristianos llegan por delante; en «replace», la estrella
  const u = tramo(t, @(2.9), @(4.3)), v = tramo(t, @(3.05), @(4.4)), xC = Math.round(lerp(340, 196, u)), xR = Math.round(lerp(322, 170, v));
  const alza = tramo(t, @(4.58), @(4.95));
  R.actor(EL.romana, xR, 178, t, { dir: -1, anda: v > 0 && v < 1, dedo: t > @(5.2), sonrisa: t > @(4.8) });
  const c = R.actor(EL.cristianoRico, xC, 178, t, { dir: -1, anda: u > 0 && u < 1, sostiene: alza > 0 ? [xC - 6, 146 - Math.round(alza * 10)] : undefined, sonrisa: alza > 0.5 });
  if (alza > 0) { const [mx, my] = c.mano; R.linea(mx, my, mx, my - 6, H('#6a4a2a')); estrella5(mx, my - 11, 6, H('#f8d048'), K); R.pset(mx - 1, my - 13, H('#fff6c0')); }
  const s = tramo(t, @(4.58), @(5.0)); if (s > 0) { const sx = 196, sy = 40; halo(sx, sy, Math.round(8 + 14 * s), H('#fff2c0'), 0.75); const tw = 8 + Math.round(3 * Math.sin(t * 9)); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let r = 6; r < 6 + tw * s; r++) R.pset(sx + dx * r, sy + dy * r, H('#fff8d8')); for (const [dx, dy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) for (let r = 5; r < 5 + tw * s * 0.5; r++) R.pset(sx + dx * r, sy + dy * r, H('#ffe8a0')); estrella5(sx, sy, Math.round(3 + 5 * s), H('#fff0a0'), H('#c89020')); }
};
// ── 2 · el copista ──
const p2 = (t) => { const g = T.epoca(R, t, { encuadre: 'copista' });
  const u = tramo(t, P2 + 0.15, @(8.2)), x = Math.round(lerp(290, 140, u)), escribe = u >= 1;
  const a = R.actor(EL.copista, x, g.suelo, t, { dir: escribe ? 1 : -1, anda: u > 0 && u < 1, sorpresa: t > @(6.89) && t < @(7.5), sonrisa: t > @(11.6),
    sostiene: escribe ? [167 + Math.round(Math.sin(t * 8) * 2), 131 + (Math.floor(t * 4) % 2)] : true });
  if (!escribe) { const [mx, my] = a.mano; R.rect(mx - 4, my - 4, mx + 2, my + 1, K); R.rect(mx - 3, my - 3, mx + 1, my, H('#7a3a24')); R.pset(mx - 1, my - 2, H('#e0b040')); }
  T.epocaDelante(R, t, { encuadre: 'copista' });
  // el globo de lo que pensaban: 25 (la concepción) = 25 (la muerte)
  const b = tramo(t, @(8.35), @(8.9)); if (b > 0) {
    for (const [k, px, py] of [[0, 150, 124], [1, 156, 114], [2, 162, 102]]) if (b > k * 0.25) { R.disco(px, py, 2 + k, K); R.disco(px, py, 1 + k, H('#f6f0e2')); }
    if (b > 0.7) { const X0 = 122, Y0 = 22, X1 = 240, Y1 = 92;
      for (let x = X0; x <= X1; x += 10) for (const y of [Y0, Y1]) { R.disco(x, y, 8, K); } for (let y = Y0; y <= Y1; y += 10) for (const x of [X0, X1]) R.disco(x, y, 8, K);
      for (let x = X0; x <= X1; x += 10) for (const y of [Y0, Y1]) R.disco(x, y, 7, H('#f6f0e2')); for (let y = Y0; y <= Y1; y += 10) for (const x of [X0, X1]) R.disco(x, y, 7, H('#f6f0e2'));
      R.rect(X0, Y0, X1, Y1, H('#f6f0e2')); for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) if (hh(x, y, 20) < 0.06) R.pset(x, y, H('#e8e0cc'));
      const c1 = tramo(t, @(9.73), @(9.95)), c2 = tramo(t, @(11.41), @(11.63)), ig = tramo(t, @(10.71), @(10.9));
      if (c1 > 0) { T.PIEZAS_NV.calendario(R, 152, 88 - Math.round((1 - c1) * 6), { dia: 25, s: 2 }); estrella5(152, 33, 5, H('#f0c040'), K); }
      if (ig > 0) { R.rect(176, 52, 186, 54, K); R.rect(176, 60, 186, 62, K); R.rect(177, 53, 185 - Math.round((1 - ig) * 8), 53, H('#3a5ab0')); R.rect(177, 61, 185 - Math.round((1 - ig) * 8), 61, H('#3a5ab0')); }
      if (c2 > 0) { T.PIEZAS_NV.calendario(R, 210, 88 - Math.round((1 - c2) * 6), { dia: 25, s: 2 }); R.rect(209, 26, 211, 38, K); R.rect(206, 29, 214, 31, K); R.rect(210, 27, 210, 37, H('#c89a40')); R.rect(207, 30, 213, 30, H('#c89a40')); }
    } }
};
// ── 3 · la rueda del año ──
const MESES = [ // pictogramas de 7 × 7: enero copo, febrero lluvia, marzo flor, abril brote, mayo pájaro, junio sol, julio espiga, agosto hoz, septiembre uvas, octubre ánfora, noviembre olivo, diciembre acebo
  [['#7aa8d8', '..#....', '#.#.#..', '.###...', '#####..', '.###...', '#.#.#..', '..#....']],
  [['#4a7ac0', '.#...#.', '.#...#.', '...#...', '...#...', '#....#.', '#....#.', '...#...']],
  [['#e85a8a', '..##...', '.####..', '..##...', '...#...', '.#.#...', '..##...', '...#...']],
  [['#5a9a3a', '...##..', '..###..', '.#.#...', '...#...', '.##....', '...#...', '...#...']],
  [['#6a4a8a', '.......', '..##...', '.####.#', '######.', '..###..', '...#...', '.......']],
  [['#e8a020', '#..#..#', '.#.#.#.', '..###..', '###.###', '..###..', '.#.#.#.', '#..#..#']],
  [['#c89a30', '.#.#.#.', '..###..', '.#.#.#.', '..###..', '...#...', '...#...', '...#...']],
  [['#8a8a9a', '..###..', '.#...#.', '#......', '#......', '.#.....', '..##...', '...#...']],
  [['#7a3a8a', '..##...', '.####..', '######.', '.####..', '..##...', '...#...', '.......']],
  [['#b8603a', '..###..', '...#...', '.#####.', '#######', '.#####.', '..###..', '...#...']],
  [['#4a6a3a', '#......', '.#..#..', '..##.#.', '...#...', '.#..#..', '#....#.', '......#']],
  [['#2a7a3a', '.#...#.', '###.###', '.##.##.', '..#R#..', '.RR.RR.', '..#.#..', '.......']],
];
const CX = 160, CY = 94, RR = 58, ang = (i) => -Math.PI / 2 + (i + 0.5) * Math.PI / 6;
const muro = () => { const { rect, pset, disco, linea } = R;
  // el techo de vigas, la cornisa con dentículos, el muro rojo pompeyano con paneles y el zócalo negro con la greca
  madera(0, 0, 319, 15, 8, H('#3a2620'), H('#2a1a16'), H('#4a3228'), H('#1a100c'), 3);
  rect(0, 16, 319, 17, H('#e8dcc4')); rect(0, 18, 319, 21, H('#c8b898')); for (let x = 0; x < 320; x += 4) rect(x, 18, x + 1, 20, H('#8a7a5e')); rect(0, 22, 319, 22, H('#6a5a44'));
  for (let y = 23; y < 150; y++) for (let x = 0; x < 320; x++) { const n = hh(x >> 1, y >> 1, 21); pset(x, y, n < 0.08 ? H('#82241e') : n > 0.95 ? H('#ac3a30') : H('#9a2e26')); }
  for (const [x0, x1] of [[8, 78], [242, 312]]) { rect(x0, 30, x1, 142, H('#1e1414')); rect(x0 + 2, 32, x1 - 2, 140, H('#a23228')); rect(x0 + 4, 34, x1 - 4, 34, H('#d8a040')); rect(x0 + 4, 138, x1 - 4, 138, H('#d8a040')); rect(x0 + 4, 34, x0 + 4, 138, H('#d8a040')); rect(x1 - 4, 34, x1 - 4, 138, H('#d8a040')); }
  for (const x of [84, 236]) { rect(x - 1, 26, x + 1, 146, H('#d8a040')); for (let y = 30; y < 146; y += 12) { disco(x, y, 2, H('#e8c060')); pset(x, y, H('#fff0a0')); } }
  // pajaritos y guirnaldas pintados en los paneles de los lados
  for (const [x, y] of [[30, 64], [56, 110], [262, 100], [290, 126]]) { rect(x - 3, y, x + 2, y + 2, H('#e8e0d0')); pset(x + 3, y, H('#e8e0d0')); pset(x - 4, y - 1, H('#e8e0d0')); pset(x + 3, y - 1, H('#d8a040')); pset(x + 2, y - 1, K); }
  for (const x0 of [12, 246]) for (let a = 0; a <= 62; a++) { const y = 46 + Math.round(Math.sin(a / 62 * Math.PI) * 8); pset(x0 + a, y, H('#3a7a3a')); if (a % 4 === 0) pset(x0 + a, y + 1, H('#e8c060')); }
  // en cada panel, un paisajito pintado en su óvalo y un candelabro pintado encima y debajo
  for (const [cx, cy] of [[43, 94], [277, 98]]) {
    for (let j = -20; j <= 20; j++) for (let i = -26; i <= 26; i++) { const d = (i / 26) ** 2 + (j / 20) ** 2; if (d > 1) continue; let c;
      if (d > 0.84) c = d > 0.93 ? '#1e1414' : '#d8a040'; else if (j < -2 + Math.round(Math.sin(i * 0.25) * 3)) c = j < -11 ? '#9ac0d4' : (umbral(cx + i, cy + j) < 0.5 ? '#c8dce0' : '#b4d0dc'); else if (j < 8) c = hh(cx + i, cy + j, 24) < 0.3 ? '#4e7e42' : '#6a9a52'; else c = (j + i) % 5 === 0 ? '#e8f4f8' : '#7ab0c0'; pset(cx + i, cy + j, H(c)); }
    rect(cx + 2, cy - 6, cx + 14, cy + 1, H('#f0e8d8')); for (let x = cx + 3; x < cx + 14; x += 3) rect(x, cy - 5, x, cy, H('#b8ac98')); R.poligono([[cx + 1, cy - 6], [cx + 15, cy - 6], [cx + 8, cy - 10]], H('#c86a4a'));
    for (let j = 0; j < 13; j++) { const w = Math.round(Math.sin((j + 1) / 13 * Math.PI) * 2); rect(cx - 12 - w, cy + 4 - j, cx - 12 + w, cy + 4 - j, H('#2a5a3a')); }
    for (const [dx, dy] of [[-4, -12], [0, -14], [4, -12]]) pset(cx + dx, cy + dy, H('#3a3a4a'));
    rect(cx, 56, cx, 72, H('#d8a040')); for (const y of [56, 62, 68]) { rect(cx - 3, y, cx + 3, y, H('#d8a040')); pset(cx - 3, y - 1, H('#e8c060')); pset(cx + 3, y - 1, H('#e8c060')); }
    rect(cx, 116, cx, 128, H('#d8a040')); R.disco(cx, 131, 3, H('#d8a040')); rect(cx - 4, 134, cx + 4, 134, H('#d8a040')); }
  for (let k = 0; k < 14; k++) { let x = 12 + hh(k, 5, 25) * 296, y = 26 + hh(k, 6, 25) * 110; if (x > 96 && x < 224) continue; for (let q = 0; q < 6; q++) { pset(Math.round(x), Math.round(y), H('#7a1e1a')); x += hh(k, q, 26) - 0.3; y += 1; } }
  rect(0, 150, 319, 179, H('#221a1a')); rect(0, 150, 319, 151, H('#d8a040'));
  for (let x = 0; x < 320; x += 12) { rect(x, 154, x + 9, 154, H('#c89038')); rect(x + 9, 154, x + 9, 160, H('#c89038')); rect(x + 3, 160, x + 9, 160, H('#c89038')); rect(x + 3, 157, x + 3, 160, H('#c89038')); rect(x + 3, 157, x + 6, 157, H('#c89038')); }
  for (let k = 0; k < 30; k++) { let x = hh(k, 1, 22) * 320, y = 164 + hh(k, 2, 22) * 14; for (let s = 0; s < 18; s++) { pset(Math.round(x), Math.round(y), H('#4a3e3a')); x += 1; y += Math.sin(s * 0.7 + k) * 0.8; } }
  // la rueda de piedra: anillo con marcas, doce sectores con su mes y el cubo de bronce
  disco(CX + 3, CY + 4, RR + 2, H('#5a1a16')); disco(CX, CY, RR + 1, K); disco(CX, CY, RR, H('#e2d4b4'));
  for (let j = -RR; j <= RR; j++) for (let i = -RR; i <= RR; i++) { const d = Math.hypot(i, j); if (d <= RR && d > RR - 7 && hh(CX + i, CY + j, 23) < 0.25) pset(CX + i, CY + j, H('#c4b48e')); }
  disco(CX, CY, RR - 8, K);
  for (let j = -50; j <= 50; j++) for (let i = -50; i <= 50; i++) { const d = Math.hypot(i, j); if (d <= RR - 9) { let a = Math.atan2(j, i) + Math.PI / 2; if (a < 0) a += Math.PI * 2; const s = Math.floor(a / (Math.PI / 6)); pset(CX + i, CY + j, s % 2 ? H('#eee2c6') : H('#dccca8')); } }
  for (let s = 0; s < 12; s++) { const a = -Math.PI / 2 + s * Math.PI / 6; linea(CX + Math.cos(a) * 20, CY + Math.sin(a) * 20, CX + Math.cos(a) * (RR - 9), CY + Math.sin(a) * (RR - 9), H('#8a7a5a')); }
  for (let s = 0; s < 60; s++) { const a = -Math.PI / 2 + s * Math.PI / 30, r0 = s % 5 ? RR - 3 : RR - 6; linea(CX + Math.cos(a) * r0, CY + Math.sin(a) * r0, CX + Math.cos(a) * (RR - 1), CY + Math.sin(a) * (RR - 1), H('#8a7a5a')); }
  MESES.forEach(([[col, ...f]], i) => { const x = Math.round(CX + Math.cos(ang(i)) * 37) - 3, y = Math.round(CY + Math.sin(ang(i)) * 37) - 3;
    f.forEach((fila, j) => { for (let q = 0; q < 7; q++) if (fila[q] === '#') { pset(x + q + 1, y + j + 1, H('#b8a682')); pset(x + q, y + j, H(col)); } else if (fila[q] === 'R') pset(x + q, y + j, H('#c8302a')); }); });
};
const p3 = (t) => { fondo('muro', muro);
  // la lucerna colgada, que se mece y alumbra el muro
  const m = Math.sin(t * 1.4) * 2, lx = Math.round(42 + m), ly = 134; R.linea(42, 23, lx, ly - 6, H('#5a4a30'));
  halo(lx, ly - 6, 18, H('#ffc870'), 0.35); R.rect(lx - 7, ly - 4, lx + 5, ly + 1, K); R.rect(lx - 6, ly - 3, lx + 4, ly, H('#b08a3a')); R.rect(lx - 6, ly - 3, lx + 4, ly - 3, H('#e0b860')); R.rect(lx + 5, ly - 3, lx + 8, ly - 2, H('#b08a3a'));
  const fl = Math.sin(t * 13) > 0; R.pset(lx + 8, ly - 4, H('#ffe090')); R.pset(lx + 8 + (fl ? 1 : 0), ly - 5, H('#fff4c0')); R.pset(lx + 7, ly - 4, H('#ff9a30'));
  // la hiedra del borde que se mece y el gorrión de la cornisa
  for (let k = 0; k < 9; k++) { const y = 24 + k * 13, x = 3 + Math.round(Math.sin(t * 1.6 + k) * 1.5); R.linea(1, y - 6, x, y, H('#2a5a2a')); R.disco(x + 1, y, 2, k % 2 ? H('#3a7a3a') : H('#4a9a4a')); R.pset(x + 2, y - 1, H('#7ac06a')); }
  const gx = Math.round(250 + Math.floor(t * 0.8) % 3 * 6 + (Math.sin(t * 9) > 0.8 ? 1 : 0)), salta = (t * 0.8) % 1 > 0.85 ? 2 : 0; R.rect(gx - 3, 13 - salta, gx + 2, 15 - salta, H('#7a5a3a')); R.pset(gx + 3, 13 - salta, H('#5a3a2a')); R.pset(gx + 2, 13 - salta, K); R.pset(gx - 4, 14 - salta, H('#5a3a2a'));
  // el haz de luz con motas
  for (let k = 0; k < 14; k++) { const x = Math.round(250 + ((k * 23 + t * 4) % 50)), y = Math.round(40 + ((k * 37 + t * 6) % 90)); if (Math.sin(t * 2 + k) > 0) R.pset(x, y, H('#f0b0a0')); }
  // marzo se enciende con su 25; la aguja salta nueve meses hasta diciembre, que se enciende con el suyo
  const mar = tramo(t, @(12.07), @(12.4)), salto = Math.min(9, Math.floor(tramo(t, @(13.39), @(15.05)) * 9.999)), dic = tramo(t, @(15.11), @(15.4));
  const enciende = (i, col, a) => { for (let j = -50; j <= 50; j++) for (let q = -50; q <= 50; q++) { const d = Math.hypot(q, j); if (d > 21 && d < RR - 9) { let an = Math.atan2(j, q) + Math.PI / 2; if (an < 0) an += Math.PI * 2; if (Math.floor(an / (Math.PI / 6)) === i) R.pset(CX + q, CY + j, mez(R.pget(CX + q, CY + j), col, a)); } } };
  if (mar > 0) enciende(2, H('#8ae07a'), 0.45 * mar);
  for (let k = 1; k <= salto; k++) enciende(2 + k, H('#ffe08a'), k === salto && dic === 0 ? 0.45 : 0.15);
  if (dic > 0) enciende(11, H('#ffd040'), 0.5 + 0.15 * Math.sin(t * 8));
  const a0 = ang(2) + salto * Math.PI / 6 + (salto < 9 ? Math.sin(t * 30) * 0.02 * (salto > 0 ? 1 : 0) : 0);
  for (let k = 0; k < salto * 6; k++) { const a = ang(2) + k / 6 * Math.PI / 6; if (k % 2 === 0) R.disco(Math.round(CX + Math.cos(a) * (RR + 6)), Math.round(CY + Math.sin(a) * (RR + 6)), 1, H('#ffe08a')); }
  // la aguja de bronce
  const tx = CX + Math.cos(a0) * 48, ty = CY + Math.sin(a0) * 48, nx = -Math.sin(a0), ny = Math.cos(a0);
  R.poligono([[CX + nx * 5 + 1, CY + ny * 5 + 2], [CX - nx * 5 + 1, CY - ny * 5 + 2], [tx + 1, ty + 2]], H('#5a1a16'));
  R.poligono([[CX + nx * 5, CY + ny * 5], [CX - nx * 5, CY - ny * 5], [tx, ty]], K); R.poligono([[CX + nx * 4, CY + ny * 4], [CX - nx * 3, CY - ny * 3], [tx - Math.cos(a0) * 2, ty - Math.sin(a0) * 2]], H('#c89a40'));
  R.disco(CX, CY, 20, K); R.disco(CX, CY, 19, H('#a87a28')); R.disco(CX, CY, 16, H('#c89a40')); R.disco(CX - 5, CY - 5, 4, H('#e8c060'));
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; R.pset(Math.round(CX + Math.cos(a) * 18), Math.round(CY + Math.sin(a) * 18), H('#e8c060')); }
  if (salto > 0) R.numero(String(salto), CX + 1, CY + 8, { tam: 16, centro: true });
  // las etiquetas del 25
  const etiqueta = (x, y, e) => { if (e <= 0) return; const yy = y + Math.round((1 - e) * 4); R.rect(x - 11, yy - 7, x + 11, yy + 6, K); R.rect(x - 10, yy - 6, x + 10, yy + 5, H('#f6ecd0')); R.rect(x - 10, yy + 5, x + 10, yy + 5, H('#c8b48a')); R.numero('25', x + 1, yy + 3, { color: H('#a0201a'), sombra: false, centro: true }); };
  etiqueta(Math.round(CX + Math.cos(ang(2)) * 76), Math.round(CY + Math.sin(ang(2)) * 76), tramo(t, @(12.23), @(12.5)));
  etiqueta(Math.round(CX + Math.cos(ang(11)) * 76), Math.round(CY + Math.sin(ang(11)) * 76) + 2, tramo(t, @(15.41), @(15.7)));
  if (dic > 0 && dic < 1) halo(Math.round(CX + Math.cos(ang(11)) * 37), Math.round(CY + Math.sin(ang(11)) * 37), 16, H('#fff4c0'), 0.8 * (1 - dic));
};
// ── 4 · la balanza que no se decide ──
const p4 = (t) => {
  const d1 = tramo(t, @(17.0), @(17.5)) - tramo(t, @(18.1), @(18.5)), d2 = tramo(t, @(18.3), @(18.8)), nadie = tramo(t, @(19.85), @(20.4));
  const bal = (nadie > 0 ? (1 - nadie) : 1) * (-0.4 * d1 + 0.4 * d2) + Math.sin(t * 1.7) * 0.05;
  const g = T.roma(R, t, { encuadre: 'templo', camara: 'altar', balanza: bal, tiembla: t > @(19.85) ? 1 : 0.2 });
  const habla1 = t > @(16.9) && t < @(18.2), habla2 = t > @(18.2) && t < @(19.6), encoge = t > @(20.5);
  R.actor(EL.caligrafo, habla1 ? 74 : 70, g.suelo, t, { dir: 1, habla: habla1 && Math.sin(t * 9) > 0, dedo: habla1, enfado: habla2, sorpresa: t > @(19.85) && !encoge, brazos: encoge && t < @(21.6) });
  R.actor(EL.copista, habla2 ? 228 : 232, g.suelo, t, { dir: -1, habla: habla2 && Math.sin(t * 9) > 0, dedo: habla2, enfado: habla1, sorpresa: t > @(19.85) && !encoge, brazos: encoge && t < @(21.6) });
  const [[xl, yl], [xr, yr]] = g.platos;
  R.disco(xl, yl - 8, 7, K); R.disco(xl, yl - 8, 6, H('#f0c040')); R.disco(xl - 2, yl - 10, 2, H('#fff0a0'));
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + t * 0.5; R.linea(Math.round(xl + Math.cos(a) * 8), Math.round(yl - 8 + Math.sin(a) * 8), Math.round(xl + Math.cos(a) * 10), Math.round(yl - 8 + Math.sin(a) * 10), H('#f0b030')); }
  T.PIEZAS_NV.calendario(R, xr, yr - 1, { dia: 25 });
  T.romaDelante(R, t, { encuadre: 'templo', camara: 'altar', balanza: bal });
  // lo que dice cada uno, en su bocadillo: el sol y el 25
  const bocata = (x, y, tipo) => { R.rect(x - 10, y - 9, x + 10, y + 8, K); R.rect(x - 9, y - 8, x + 9, y + 7, H('#f6f0e2')); R.rect(x - 2, y + 8, x + 1, y + 9, K); R.pset(x - 1, y + 10, K); R.rect(x - 1, y + 7, x, y + 8, H('#f6f0e2'));
    if (tipo) { R.disco(x, y - 1, 4, H('#a87a18')); R.disco(x, y - 1, 3, H('#f0c040')); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; R.pset(Math.round(x + Math.cos(a) * 6), Math.round(y - 1 + Math.sin(a) * 6), H('#e0a020')); } }
    else { R.rect(x - 6, y - 6, x + 6, y + 5, K); R.rect(x - 5, y - 5, x + 5, y + 4, H('#ffffff')); R.rect(x - 5, y - 5, x + 5, y - 3, H('#c8302a')); R.numero('25', x + 1, y + 4, { color: K, sombra: false }); } };
  if (habla1) bocata(90, 120, true); if (habla2) bocata(226, 120, false);
  const q = tramo(t, @(20.17), @(20.45)); if (q > 0) { const r = Math.round(4 + 10 * Math.min(1, q * 1.2)), y = 30 + Math.round(Math.sin(t * 3) * 1);
    R.disco(160, y, r + 1, K); R.disco(160, y, r, H('#f6f0e2')); if (q > 0.5) R.icono('?', 155, y - 7, H('#c8302a'), K, 2); }
};
const efectos = [[@(0.6), 'carro'], [@(1.6), 'publico'], [@(4.6), 'brillo'], [P2 + 0.3, 'puerta'], [@(9.73), 'pop'], [@(11.41), 'pop'], [@(12.1), 'brillo'], [@(13.4), 'tic'], [@(15.15), 'brillo'], [@(19.9), 'boing'], [@(20.2), 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 354 });
'''))

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nv-saturnales'] = ('Saturnales', '''// NV-SATURNALES (frase 13), 354. Tres planos:
// 1. (calle) la calle en Saturnales de noche: dos romanos con píleo se cruzan y él le regala una figurita de barro; un
//    pregonero entra con el calendario en su pértiga y los días del 17 al 23 se marcan en rojo («17th» … «23rd»);
// 2. (banquete) corta en «and most historians»: el banquete; llega el tercero y se sienta, brindan en «feasts», ella le pasa
//    una figurita en «small gifts» y ríen todos en «mood»;
// 3. (fondo local, la mesa) corta en «but there's no proof»: a un lado las Saturnales (figurita, píleo, calendario del 17 al
//    23), al otro un arbolito de Navidad; un sello cae en medio («no proof») con su «≠» y la flecha que va de un lado al
//    otro («copied») rebota y se tacha.''', _en('saturnales', COMUN + r'''
const Q2 = @(6.56), Q3 = @(13.37);
const figurita = (x, y, s = 1) => { // figurita de barro (sigillaria) con la base en (x, y)
  const p = (i, j, c) => R.rect(x + i * s, y - j * s, x + i * s + s - 1, y - j * s + s - 1, c);
  for (let j = 0; j < 9; j++) for (let i = -2; i <= 2; i++) { const dentro = j < 2 ? true : j < 6 ? Math.abs(i) <= 1 : j < 8 ? Math.abs(i) <= 1 : Math.abs(i) <= 0; if (dentro) p(i, j, i < 0 ? H('#d8844a') : H('#b8603a')); }
  p(-2, 0, H('#8a4024')); p(2, 0, H('#8a4024')); p(0, 7, H('#f0a870')); p(-1, 4, H('#8a4024')); p(1, 4, H('#8a4024')); };
// ── 1 · la calle ──
const p1 = (t) => { const g = T.roma(R, t, { encuadre: 'calle' });
  const u = tramo(t, @(0.3), @(2.3)), v = tramo(t, @(0.6), @(2.5)), xA = Math.round(lerp(-14, 100, u)), xB = Math.round(lerp(330, 122, v));
  const da = tramo(t, @(2.9), @(3.5)), regalo = t > @(2.75);
  const a = R.actor(EL.romanoPileo, xA, g.suelo, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: u >= 1, sostiene: regalo && da < 1 ? [xA + 22, g.suelo - 14] : undefined, habla: u >= 1 && t < @(2.8) && Math.sin(t * 9) > 0 });
  const b = R.actor(EL.romana, xB, g.suelo, t, { dir: -1, anda: v > 0 && v < 1, sonrisa: da >= 1, sorpresa: da > 0 && da < 1, sostiene: da >= 1 ? true : undefined });
  if (regalo && da < 1) { const [mx, my] = a.mano, [bx, by] = b.mano; figurita(Math.round(lerp(mx, bx, da)), Math.round(lerp(my, by, da) - Math.sin(da * Math.PI) * 6)); }
  else if (da >= 1) figurita(b.mano[0], b.mano[1]);
  // el pregonero con el calendario en la pértiga: del 17 al 23
  const w = tramo(t, @(3.6), @(4.5)), xP = Math.round(lerp(336, 214, w)), marca = Math.floor(tramo(t, @(4.66), @(5.74)) * 6.999);
  const p = R.actor(EL.romanoPileo2, xP, g.suelo, t, { dir: -1, anda: w > 0 && w < 1, sostiene: [xP - 4, g.suelo - 20], habla: w >= 1 && Math.sin(t * 8) > 0, dedo: t > @(5.9) });
  const [hx, hy] = p.mano; R.rect(hx, hy - 18, hx + 1, hy + 2, H('#5a3a20')); R.pset(hx, hy - 18, H('#8a5a30'));
  T.PIEZAS_NV.calendario(R, hx + 1, hy - 16, { s: 2, marca: t > @(4.66) ? [17, 17 + marca] : [0, -1] });
  if (t > @(4.66)) { const x0 = hx + 1 - 21, y0 = hy - 16 - 44; for (let d = 17; d <= 17 + marca; d++) { const c = (d - 1) % 7, f = Math.floor((d - 1) / 7), cx = x0 + (4 + c * 2) * 2, cy = y0 + (8 + f * 2) * 2; R.rect(cx - 1, cy - 1, cx + 2, cy + 2, H('#d8201a')); } }
  if (marca === 6 && t < @(6.3)) halo(hx + 1, hy - 38, 22, H('#ffd0a0'), 0.3);
};
// ── 2 · el banquete ──
const p2 = (t) => { const g = T.roma(R, t, { encuadre: 'calle', camara: 'banquete' }), [s1, s2, s3] = g.sitios;
  const u = tramo(t, Q2 + 0.1, @(8.3)), x3 = Math.round(lerp(330, s3, u));
  const brinda = t > @(10.41) && t < @(11.5), pasa = tramo(t, @(11.45), @(12.0)), rien = t > @(12.23);
  const a = R.actor(EL.romanoPileo, s1, g.suelo, t, { dir: 1, habla: t > @(6.7) && t < @(9.1) && Math.sin(t * 9) > 0, sonrisa: rien || brinda, sostiene: brinda ? [s1 + 18, g.suelo - 22] : undefined, salto: rien && t < @(12.8) ? Math.round(Math.abs(Math.sin(t * 10)) * 2) : 0 });
  if (brinda) { const [mx, my] = a.mano; R.rect(mx - 2, my - 6, mx + 2, my, K); R.rect(mx - 1, my - 5, mx + 1, my - 1, H('#b8603a')); R.pset(mx, my - 5, H('#7a1a2a')); }
  const b = R.actor(EL.romana, s2, g.suelo, t, { dir: pasa > 0 ? 1 : -1, sonrisa: rien || brinda, habla: t > @(9.2) && t < @(10.3) && Math.sin(t * 8) > 0, sostiene: pasa > 0 && pasa < 1 ? true : undefined, dedo: t > @(7.6) && t < @(8.6) });
  const c = R.actor(EL.romanoPileo2, x3, g.suelo, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: rien || pasa >= 1, sostiene: pasa >= 1 ? true : undefined, sorpresa: pasa > 0.6 && pasa < 1 });
  if (pasa > 0 && pasa < 1) { const [bx, by] = b.mano, [cx, cy] = c.mano; figurita(Math.round(lerp(bx, cx, pasa)), Math.round(lerp(by, cy, pasa) - Math.sin(pasa * Math.PI) * 8)); }
  else if (pasa >= 1) figurita(c.mano[0], c.mano[1]);
  T.romaDelante(R, t, { encuadre: 'calle', camara: 'banquete' });
};
// ── 3 · la mesa: Saturnales ≠ Navidad ──
const mesa = () => { const { rect, pset, disco, linea } = R;
  madera(0, 0, 319, 179, 30, H('#8a5a34'), H('#6a4224'), H('#a26c40'), H('#3a2414'), 31);
  // el paño de las Saturnales (rojo con greca) a la izquierda y el de la Navidad (verde con cenefa) a la derecha
  rect(10, 26, 146, 168, H('#3a1410')); rect(11, 27, 145, 167, H('#9a2a24')); for (let y = 27; y < 168; y++) for (let x = 11; x < 146; x++) if (hh(x, y, 32) < 0.07) pset(x, y, H('#82201c'));
  for (let x = 14; x < 142; x += 8) { rect(x, 30, x + 5, 30, H('#e0b040')); rect(x + 5, 30, x + 5, 33, H('#e0b040')); rect(x + 2, 33, x + 5, 33, H('#e0b040')); rect(x, 163, x + 5, 163, H('#e0b040')); rect(x, 160, x, 163, H('#e0b040')); rect(x, 160, x + 3, 160, H('#e0b040')); }
  rect(174, 26, 310, 168, H('#0e2a16')); rect(175, 27, 309, 167, H('#1e5a32')); for (let y = 27; y < 168; y++) for (let x = 175; x < 310; x++) if (hh(x, y, 33) < 0.07) pset(x, y, H('#174a28'));
  for (let x = 178; x < 306; x += 6) { disco(x, 31, 1, H('#e8e0d0')); disco(x + 3, 163, 1, H('#c8302a')); }
  // nueces, castañas y migas sobre la madera
  for (let k = 0; k < 18; k++) { const x = Math.round(hh(k, 1, 34) * 316), y = Math.round(hh(k, 2, 34) * 176); if ((x > 6 && x < 150) || (x > 170 && x < 314)) if (y > 22 && y < 172) continue; disco(x, y, 2, H('#5a3418')); pset(x - 1, y - 1, H('#8a5a30')); }
};
const p3 = (t) => { fondo('mesa', mesa);
  // la lucerna con su llama y la polilla
  halo(36, 52, 22, H('#ffc870'), 0.3); R.rect(22, 50, 46, 58, K); R.rect(23, 51, 45, 57, H('#c07a40')); R.rect(23, 51, 45, 52, H('#e09a5a')); R.disco(46, 54, 3, K); R.disco(46, 54, 2, H('#c07a40'));
  const fl = Math.sin(t * 13) > 0; R.rect(48, 50, 49, 53, H('#ff9a30')); R.pset(48 + (fl ? 1 : 0), 48, H('#ffe090')); R.pset(48, 49, H('#fff4c0'));
  const pa = t * 3; R.pset(Math.round(48 + Math.cos(pa) * 9), Math.round(44 + Math.sin(pa * 1.3) * 6), H('#d8ccb0'));
  // las Saturnales: figuritas de barro, el píleo, velas de cera de regalo, monedas y el calendario del 17 al 23
  figurita(46, 126, 4); figurita(76, 118, 3);
  R.poligono([[84, 82], [118, 82], [108, 50], [94, 50]], K); R.poligono([[86, 81], [116, 81], [107, 52], [95, 52]], H('#e8dcc0')); R.poligono([[86, 81], [96, 81], [99, 52], [95, 52]], H('#f6eedc')); R.rect(86, 76, 116, 81, H('#c8b898')); R.rect(86, 76, 116, 76, H('#d8ccb0')); R.pset(101, 54, H('#ffffff'));
  for (let k = 0; k < 3; k++) { const y = 140 + k * 4; R.rect(22, y - 1, 58, y + 2, K); R.rect(23, y, 57, y + 1, k === 1 ? H('#e8d8a0') : H('#f4ecc8')); R.pset(58, y, H('#3a2a1a')); }
  T.PIEZAS_NV.monedas(R, 132, 98, { s: 2 });
  T.PIEZAS_NV.calendario(R, 104, 160, { s: 2, marca: [17, 23] });
  for (const [x, y] of [[26, 98], [134, 62], [136, 150], [70, 154]]) { R.disco(x, y, 4, K); R.disco(x, y, 3, H('#7a4a24')); R.pset(x - 1, y - 2, H('#aa7440')); R.pset(x, y, H('#5a3418')); }
  // la Navidad: el arbolito en su maceta, los regalos, la vela, el acebo y las galletas
  const ax = 236, ay = 120; R.rect(ax - 9, ay, ax + 9, ay + 16, K); R.rect(ax - 8, ay + 1, ax + 8, ay + 15, H('#b8603a')); R.rect(ax - 8, ay + 1, ax - 6, ay + 15, H('#d8844a')); R.rect(ax - 9, ay, ax + 9, ay + 2, H('#8a4024'));
  for (let j = 0; j < 4; j++) { const y0 = ay - 4 - j * 15, w = 30 - j * 6; R.poligono([[ax - w - 1, y0 + 1], [ax + w + 1, y0 + 1], [ax, y0 - 22]], K); R.poligono([[ax - w, y0], [ax + w, y0], [ax, y0 - 20]], j % 2 ? H('#2a7a3a') : H('#1e6a30')); R.poligono([[ax - w, y0], [ax - 3, y0], [ax, y0 - 20]], H('#3a8a4a')); for (let q = -w + 4; q < w - 2; q += 5) R.pset(ax + q, y0 - 1, H('#145a26')); }
  for (const [dx, dy, c] of [[-16, -12, '#c8302a'], [12, -20, '#f0c040'], [-8, -30, '#3a6ab0'], [14, -38, '#c8302a'], [-12, -46, '#f0c040'], [5, -58, '#c8302a'], [-22, -8, '#f0c040'], [20, -8, '#3a6ab0']]) { R.disco(ax + dx, ay + dy, 3, K); R.disco(ax + dx, ay + dy, 2, H(c)); if (Math.sin(t * 4 + dx) > 0.6) R.pset(ax + dx - 1, ay + dy - 1, H('#ffffff')); }
  estrella5(ax, ay - 86, 7, H('#f8d048'), K); if (Math.sin(t * 5) > 0) R.pset(ax - 1, ay - 89, H('#ffffff'));
  for (const [gx, gy, c1, c2] of [[196, 150, '#c8302a', '#f0c040'], [284, 138, '#3a6ab0', '#f6f0e2']]) { R.rect(gx - 12, gy - 12, gx + 12, gy + 8, K); R.rect(gx - 11, gy - 11, gx + 11, gy + 7, H(c1)); R.rect(gx - 1, gy - 11, gx + 1, gy + 7, H(c2)); R.rect(gx - 11, gy - 3, gx + 11, gy - 1, H(c2)); R.disco(gx - 3, gy - 13, 3, H(c2)); R.disco(gx + 3, gy - 13, 3, H(c2)); R.pset(gx, gy - 12, K); }
  T.PIEZAS_NV.vela(R, 292, 166, { t, s: 2 }); T.PIEZAS_NV.acebo(R, 200, 58, { s: 2 }); T.PIEZAS_NV.acebo(R, 286, 52, { s: 2, dir: -1 });
  for (const [cx, cy] of [[270, 160], [252, 164]]) { R.disco(cx, cy, 5, K); R.disco(cx, cy, 4, H('#b8743a')); R.pset(cx - 2, cy - 1, H('#f8f4ec')); R.pset(cx + 2, cy - 1, H('#f8f4ec')); R.pset(cx, cy + 2, H('#f8f4ec')); }
  // la raya del medio, el sello que cae con su «≠» y la flecha que rebota
  const raya = tramo(t, Q3, @(13.85)); for (let y = 8; y < 8 + 166 * raya; y++) if (y % 8 < 5) R.rect(159, y, 160, y, H('#f0e6d0'));
  const baja = tramo(t, @(13.6), @(14.03)), sube = tramo(t, @(14.35), @(14.9)), marca = t > @(14.03);
  if (marca) { for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) { const d = Math.hypot(i, j); if (d > 12 && d < 16 && hh(i, j, 35) > 0.12) R.pset(160 + i, 94 + j, H('#c8201a')); }
    for (const yy of [88, 98]) R.rect(150, yy, 170, yy + 2, H('#c8201a')); for (let d = -1; d <= 1; d++) R.linea(170 + d, 80, 150 + d, 108, H('#c8201a')); }
  if (baja > 0 && sube < 1) { const sx = Math.round(lerp(lerp(260, 160, baja), 270, sube)), sy = Math.round(lerp(lerp(-10, 72, baja), -30, sube)) + (t > @(14.03) && t < @(14.25) ? 3 : 0);
    R.rect(sx - 12, sy, sx + 12, sy + 10, K); R.rect(sx - 11, sy + 1, sx + 11, sy + 8, H('#8a5a34')); R.rect(sx - 11, sy + 1, sx + 11, sy + 2, H('#a87448')); R.rect(sx - 11, sy + 9, sx + 11, sy + 9, H('#c8201a'));
    R.rect(sx - 4, sy - 10, sx + 4, sy, K); R.rect(sx - 3, sy - 9, sx + 3, sy - 1, H('#6a4224')); R.disco(sx, sy - 13, 5, K); R.disco(sx, sy - 13, 4, H('#8a5a34')); R.pset(sx - 2, sy - 15, H('#c08a5a'));
    T.brazo(R, sx + 70, sy - 70, sx + 9, sy - 12, '#6a4a8a', -1, { codo: [sx + 46, sy - 22] }); }
  const fl2 = tramo(t, @(15.27), @(15.7)), reb = tramo(t, @(15.95), @(16.6)); if (fl2 > 0) { const xf = Math.round(lerp(96, 140, fl2) - reb * 24), ya = 106;
    for (let x = 96; x < xf; x += 6) { R.rect(x, ya - 2, x + 3, ya + 2, K); R.rect(x, ya - 1, x + 3, ya + 1, H('#f6ecd0')); } R.poligono([[xf - 1, ya - 8], [xf - 1, ya + 8], [xf + 9, ya]], K); R.poligono([[xf, ya - 6], [xf, ya + 6], [xf + 7, ya]], H('#f6ecd0'));
    if (t > @(15.95)) R.icono('X', xf - 2, ya - 8, H('#c8201a'), K, 3); }
};
const efectos = [[@(0.9), 'publico'], [@(3.0), 'pop'], [@(4.66), 'papel'], [Q2 + 0.4, 'publico'], [@(10.45), 'toc'], [@(11.5), 'pop'], [@(12.3), 'palmada'], [@(14.03), 'sello'], [@(15.3), 'whoosh'], [@(15.95), 'golpecito']];
T.rodar(E, R, [[0, p1], [Q2, p2], [Q3, p3]], { efectos, año: 354 });
'''))

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nv-lutero'] = ('El árbol de Lutero', '''// NV-LUTERO (frase 14). Cuatro planos:
// 1. (imprenta, hacia 1845) el impresor tira de la barra y saca el pliego recién impreso; en «heard» lo enseña: un monje y
//    un árbol con velas, la estampa que hizo famosa la leyenda; el aprendiz se asombra;
// 2. (bosque) corta en «Martin»: un vecino con farol cruza el bosque nevado y piensa en la leyenda; en el globo, el monje
//    pone velas al abeto («tree with candles»); en «no evidence» el globo se deshace en humo y el vecino sigue su camino;
// 3. (copista) corta en «One»: el escribano de Sélestat entra y anota; la página grande: el abeto («tree»), el 1521
//    («1521») y las monedas;
// 4. (bosque, guardas) corta en «when»: los guardas se calientan en el brasero; el escribano llega y les paga en «paid»;
//    en «protect» uno va a la cerca con su pértiga y el otro alza el farol; un zorro que husmeaba sale corriendo.''', _en('lutero', COMUN + r'''
const L2 = @(4.50), L3 = @(10.92), L4 = @(16.16);
const estampa = (x, y, w, h) => { // el pliego con la estampa: el monje y el abeto con velas
  R.rect(x - 1, y - 1, x + w, y + h, K); R.rect(x, y, x + w - 1, y + h - 1, H('#f4ecd8')); R.rect(x + 2, y + 2, x + w - 3, y + h - 3, H('#e8dcc0'));
  const ax = x + Math.round(w * 0.62), ay = y + h - 5; for (let j = 0; j < 3; j++) { const yy = ay - 3 - j * 6, ww = 7 - j * 2; R.poligono([[ax - ww, yy], [ax + ww, yy], [ax, yy - 8]], H('#2a6a3a')); }
  R.rect(ax - 1, ay - 3, ax + 1, ay, H('#6a4a2a')); for (const [dx, dy] of [[-4, -5], [3, -6], [-2, -11], [2, -15], [0, -20]]) { R.pset(ax + dx, ay + dy, H('#f0c040')); R.pset(ax + dx, ay + dy - 1, H('#ff9a30')); }
  const mx = x + Math.round(w * 0.28); R.rect(mx - 2, ay - 9, mx + 2, ay, H('#2a2430')); R.disco(mx, ay - 11, 2, H('#e8b890')); R.pset(mx + 3, ay - 6, H('#e8b890'));
  for (let k = 0; k < 3; k++) R.rect(x + 3, y + h - 3 + 0, x + 3, y + h - 3, H('#c8b898')); };
// ── 1 · la imprenta ──
const p1 = (t) => { const tira = tramo(t, @(0.5), @(1.2)) - tramo(t, @(1.3), @(1.9));
  const g = T.epoca(R, t, { encuadre: 'imprenta', tira });
  const [bx, by] = g.prensa.barra;
  // dos pliegos con un Santa rojo tendidos en la cuerda (el mito de antes), que se mecen; en «myth», el «?»
  for (const [x0, y0, k] of [[58, 34, 0], [146, 31, 1]]) { const m = Math.round(Math.sin(t * 2.2 + k * 2) * 1.5);
    R.rect(x0 - 1 + m, y0 + 2, x0 + 13 + m, y0 + 19, K); R.rect(x0 + m, y0 + 3, x0 + 12 + m, y0 + 18, H('#f4ecd8')); R.rect(x0 + 5, y0, x0 + 7, y0 + 3, H('#8a6a40'));
    const sx = x0 + 6 + m, sy = y0 + 6; R.rect(sx - 3, sy + 3, sx + 3, sy + 10, H('#c8302a')); R.rect(sx - 3, sy + 7, sx + 3, sy + 7, H('#f6f0e2')); R.disco(sx, sy + 1, 2, H('#f0c090')); R.rect(sx - 2, sy - 2, sx + 2, sy - 1, H('#c8302a')); R.pset(sx + 3, sy - 2, H('#ffffff')); R.rect(sx - 2, sy + 3, sx + 2, sy + 4, H('#ffffff')); R.rect(sx - 2, sy + 10, sx - 1, sy + 11, K); R.rect(sx + 1, sy + 10, sx + 2, sy + 11, K); }
  if (t > @(2.34) && t < @(3.5)) R.bocadillo(166, 30 + Math.round(Math.sin(t * 6)), { icono: '?' });
  const u = tramo(t, @(2.0), @(2.7)), x = Math.round(lerp(196, 172, u)), ensena = tramo(t, @(3.7), @(4.1));
  const i = R.actor(EL.impresor, x, g.suelo, t, { dir: u > 0 && u < 1 ? -1 : u >= 1 ? 1 : -1, anda: u > 0 && u < 1, sostiene: u === 0 ? [bx, by] : u >= 1 ? [x + 22, g.suelo - 26 - Math.round(ensena * 8)] : true, sonrisa: ensena > 0.5, habla: t > @(2.8) && t < @(3.6) && Math.sin(t * 9) > 0 });
  if (u > 0) { const [mx, my] = i.mano; estampa(mx - (u >= 1 ? 2 : 10), my - 26 - Math.round(ensena * 4), 24 + Math.round(ensena * 6), 26 + Math.round(ensena * 6)); }
  const ap = tramo(t, @(0.2), @(1.0)), xa = Math.round(lerp(70, 92, ap));
  R.actor(EL.aprendiz, xa, g.suelo, t, { dir: 1, anda: ap > 0 && ap < 1, sorpresa: t > @(4.04), sonrisa: t > @(2.7) && t < @(4.0), dedo: t > @(4.2) });
  T.epocaDelante(R, t, { encuadre: 'imprenta', tira });
};
// ── 2 · el bosque y la leyenda que se hace humo ──
const p2 = (t) => { const g = T.epoca(R, t, { encuadre: 'bosque' });
  const u = tramo(t, L2, @(5.9)), w = tramo(t, @(10.0), L3 + 0.3), xv = Math.round(lerp(-14, 92, u) + w * 120);
  // la liebre que cruza la nieve
  const lh = tramo(t, @(6.4), @(8.6)); if (lh > 0 && lh < 1) { const lx = Math.round(lerp(330, 220, lh)), sl = Math.abs(Math.sin(lh * 30)) * 4, ly = 172 - Math.round(sl);
    R.rect(lx - 4, ly - 4, lx + 3, ly, H('#c8c0b0')); R.rect(lx - 4, ly - 1, lx + 3, ly, H('#a8a090')); R.rect(lx - 5, ly - 7, lx - 3, ly - 3, H('#c8c0b0')); R.pset(lx - 5, ly - 9, H('#c8c0b0')); R.pset(lx - 4, ly - 9, H('#a8a090')); R.pset(lx - 5, ly - 5, K); R.pset(lx + 3, ly - 3, H('#ffffff')); }
  const humo = tramo(t, @(9.08), @(10.1));
  const a = R.actor(EL.vecino, xv, g.suelo, t, { dir: 1, anda: (u > 0 && u < 1) || (w > 0 && w < 1), sostiene: true, sonrisa: t > @(6.2) && t < @(9.0), sorpresa: humo > 0 && w === 0 });
  { const [mx, my] = a.mano; R.rect(mx - 3, my, mx + 3, my + 8, K); R.rect(mx - 2, my + 1, mx + 2, my + 7, H('#ffd870')); R.rect(mx - 2, my + 1, mx + 2, my + 1, H('#6a5a40')); R.rect(mx - 2, my + 7, mx + 2, my + 7, H('#6a5a40')); halo(mx, my + 4, 12, H('#ffd890'), 0.3); }
  // el globo: la leyenda del monje que pone velas al abeto
  const nace = tramo(t, @(4.6), @(5.3)); if (nace > 0 && humo < 1) {
    const X0 = 128, Y0 = 44, X1 = 214, Y1 = 98, fuera = humo;
    for (const [k, px, py] of [[0, xv + 12, 128], [1, xv + 22, 118], [2, xv + 30, 106]]) if (nace > k * 0.25 && fuera < 0.5) { R.disco(px, py, 2 + k, K); R.disco(px, py, 1 + k, H('#f6f0e2')); }
    if (nace > 0.7) {
      const borde = []; for (let x = X0; x <= X1; x += 9) borde.push([x, Y0], [x, Y1]); for (let y = Y0 + 9; y < Y1; y += 9) borde.push([X0, y], [X1, y]);
      borde.forEach(([x, y], k) => { const dy = Math.round(-fuera * (16 + (k % 5) * 6)), dx = Math.round(Math.sin(k * 2.1) * fuera * 10), r = Math.max(0, Math.round(8 * (1 - fuera * 0.7))); if (hh(k, 3, 40) > fuera * 1.1) { R.disco(x + dx, y + dy, r + 1, fuera > 0 ? H('#5a6280') : K); R.disco(x + dx, y + dy, r, fuera > 0 ? mez(H('#f6f0e2'), H('#8a90a8'), fuera) : H('#f6f0e2')); } });
      R.recorte([X0, Y0, X1, Y1]);
      for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { if (hh(x, y, 41) < fuera * 1.05) continue; const tabla = (x - X0) % 12; R.pset(x, y, y > 88 ? (hh(x >> 2, y, 42) < 0.2 ? H('#4a3018') : H('#5a3a22')) : tabla === 0 ? H('#4a2e18') : hh(x, y >> 3, 43) < 0.05 ? H('#6a4428') : H('#7a5030')); }
      if (fuera < 0.6) {
        R.rect(136, 54, 154, 72, K); R.rect(137, 55, 153, 71, H('#2a3460')); R.rect(144, 55, 145, 71, H('#5a3a22')); R.rect(137, 62, 153, 63, H('#5a3a22')); for (let k = 0; k < 5; k++) R.pset(138 + ((k * 7 + Math.floor(t * 6)) % 15), 56 + ((k * 5 + Math.floor(t * 9)) % 15), H('#eef4fa'));
        const ax = 186, ay = 88; R.rect(ax - 5, ay - 2, ax + 5, ay + 6, K); R.rect(ax - 4, ay - 1, ax + 4, ay + 5, H('#8a5a34'));
        for (let j = 0; j < 4; j++) { const y0 = ay - 2 - j * 8, ww = 14 - j * 3; R.poligono([[ax - ww - 1, y0 + 1], [ax + ww + 1, y0 + 1], [ax, y0 - 12]], K); R.poligono([[ax - ww, y0], [ax + ww, y0], [ax, y0 - 11]], j % 2 ? H('#2a7a3a') : H('#1e6a30')); }
        const VELAS = [[-9, -6], [8, -7], [-6, -14], [6, -15], [-3, -22], [3, -24], [0, -32]], n = Math.floor(tramo(t, @(6.08), @(6.9)) * 7.99);
        VELAS.forEach(([dx, dy], k) => { const vx = ax + dx, vy = ay + dy; R.rect(vx, vy - 2, vx, vy, H('#f4ecd8')); if (k < n) { R.pset(vx, vy - 3, Math.sin(t * 12 + k) > 0 ? H('#ffe090') : H('#ff9a30')); R.pset(vx, vy - 4, H('#fff4c0')); halo(vx, vy - 3, 5, H('#ffd890'), 0.3); } });
        const pone = t > @(5.2) && t < @(7.0), mx = Math.round(lerp(150, 162, tramo(t, @(4.8), @(5.4))));
        R.actor(EL.monje, mx, 96, t, { dir: 1, sostiene: pone ? [ax - 10, ay - 10 - Math.round(tramo(t, @(5.2), @(6.9)) * 12)] : undefined, sonrisa: t > @(6.9) });
      }
      R.recorte(null);
      if (fuera > 0) for (let k = 0; k < 14; k++) { const px = Math.round(X0 + hh(k, 1, 44) * (X1 - X0)), py = Math.round(lerp(Y1, Y0 - 30, fuera) - hh(k, 2, 44) * 30 * fuera), r = Math.round(2 + 4 * hh(k, 3, 44) * (1 - fuera * 0.5)); R.disco(px, py, r, mez(H('#8a90a8'), H('#2a3060'), fuera * 0.7)); }
    } }
  T.epocaDelante(R, t, { encuadre: 'bosque' });
};
// ── 3 · el registro de 1521 ──
const p3 = (t) => { const g = T.epoca(R, t, { encuadre: 'copista' });
  const u = tramo(t, L3 + 0.1, @(12.0)), x = Math.round(lerp(-14, 140, u)), escribe = u >= 1;
  R.actor(EL.escribanoParl, x, g.suelo, t, { dir: 1, anda: u > 0 && u < 1, sostiene: escribe ? [166 + Math.round(Math.sin(t * 9) * 2), 131 + (Math.floor(t * 4) % 2)] : undefined, sonrisa: t > @(15.0) });
  T.epocaDelante(R, t, { encuadre: 'copista' });
  // la página del libro de cuentas, grande, a la derecha
  const pg = tramo(t, @(12.1), @(12.5)); if (pg > 0) { const X0 = 204, Y0 = 46, X1 = 272, Y1 = 124, dy = Math.round((1 - pg) * 10);
    for (let k = 0; k < 6; k++) R.pset(Math.round(lerp(190, X0, k / 6)), Math.round(lerp(128, Y1 + dy, k / 6)), H('#f4ecd8'));
    R.rect(X0 + 3, Y0 + 3 + dy, X1 + 3, Y1 + 3 + dy, H('#2a2420')); R.rect(X0 - 1, Y0 - 1 + dy, X1 + 1, Y1 + 1 + dy, K); R.rect(X0, Y0 + dy, X1, Y1 + dy, H('#efe2c0'));
    for (let y = Y0 + dy; y <= Y1 + dy; y++) for (let xx = X0; xx <= X1; xx++) if (hh(xx, y, 45) < 0.06) R.pset(xx, y, H('#e0d0a8'));
    R.rect(X0 + 4, Y0 + 4 + dy, X0 + 9, Y0 + 11 + dy, H('#b8302a')); R.rect(X0 + 5, Y0 + 5 + dy, X0 + 8, Y0 + 10 + dy, H('#e0b040'));
    const renglon = tramo(t, @(11.72), @(16.0)); for (let k = 0; k < 6; k++) { const L = Math.round((44 - (k * 7) % 13) * Math.min(1, Math.max(0, renglon * 6 - k))); if (L > 0) R.rect(X0 + 6, Y0 + 98 - 46 + k * 5 + dy + 12, X0 + 6 + L, Y0 + 98 - 46 + k * 5 + dy + 12, H('#6a5a48')); }
    const ab = tramo(t, @(12.98), @(13.5)); if (ab > 0) { const ax = X0 + 20, ay = Y0 + 50 + dy; for (let j = 0; j < 3; j++) { const yy = ay - j * 9, ww = 10 - j * 3, hgt = Math.round(11 * Math.min(1, ab * 3 - j)); if (hgt > 0) R.poligono([[ax - ww, yy], [ax + ww, yy], [ax, yy - hgt]], j % 2 ? H('#2a7a3a') : H('#1e5a30')); } R.rect(ax - 1, ay, ax + 1, ay + 4, H('#6a4a2a')); }
    const mo = tramo(t, @(15.3), @(15.6)); if (mo > 0) T.PIEZAS_NV.monedas(R, X0 + 50, Y0 + 50 + dy - Math.round((1 - mo) * 4), { s: 2 });
    const an = tramo(t, @(14.84), @(15.1)); if (an > 0) { R.numero('1521', Math.round((X0 + X1) / 2) + 1, Y0 + 26 + dy, { tam: 16, centro: true }); if (an < 1) halo(Math.round((X0 + X1) / 2), Y0 + 18 + dy, 26, H('#fff4c0'), 0.6 * (1 - an)); }
  }
};
// ── 4 · los guardas y la paga ──
const p4 = (t) => { const g = T.epoca(R, t, { encuadre: 'bosque', camara: 'guardas' });
  // el zorro que husmea en la cerca y huye
  const zv = tramo(t, @(17.2), @(17.8)), zh = tramo(t, @(19.3), @(20.2)); if (zv > 0 && zh < 1) { const zx = Math.round(lerp(4, 46, zv) - zh * 70), zy = 166, run = zh > 0 ? Math.round(Math.abs(Math.sin(t * 20)) * 2) : 0;
    R.rect(zx - 6, zy - 6 - run, zx + 4, zy - 2 - run, H('#c86a2a')); R.rect(zx - 6, zy - 3 - run, zx + 4, zy - 2 - run, H('#f0e0d0')); R.rect(zx + 4, zy - 9 - run, zx + 8, zy - 5 - run, H('#c86a2a')); R.pset(zx + 5, zy - 10 - run, H('#c86a2a')); R.pset(zx + 7, zy - 10 - run, H('#c86a2a')); R.pset(zx + 8, zy - 6 - run, K); R.pset(zx + 6, zy - 8 - run, K);
    R.rect(zx - 11, zy - 6 - run, zx - 6, zy - 4 - run, H('#c86a2a')); R.pset(zx - 11, zy - 6 - run, H('#ffffff')); for (const dx of [-5, -2, 1, 3]) R.rect(zx + dx, zy - 2, zx + dx, zy - (run ? 1 : 0), H('#3a2418')); }
  const e = tramo(t, L4 + 0.1, @(17.4)), sale = tramo(t, @(18.4), @(19.8)), xe = Math.round(lerp(-14, 160, e) - sale * 190);
  const pasa = tramo(t, @(17.54), @(17.95)), va = tramo(t, @(18.48), @(19.3)), x2 = Math.round(lerp(238, 112, va));
  const ge = R.actor(EL.escribanoParl, xe, g.suelo, t, { dir: sale > 0 ? -1 : 1, anda: (e > 0 && e < 1) || (sale > 0 && sale < 1), sostiene: pasa < 1 && e > 0.2 ? [xe + 22, g.suelo - 14] : undefined, habla: e >= 1 && t < @(18.3) && Math.sin(t * 9) > 0 });
  const g1 = R.actor(EL.guarda, 188, g.suelo, t, { dir: -1, sostiene: pasa >= 1 && t < @(19.0) ? true : t > @(19.0) ? [182, g.suelo - 28] : undefined, sonrisa: pasa >= 1 && t < @(19.4), habla: t > @(17.95) && t < @(18.4) && Math.sin(t * 8) > 0 });
  R.actor(EL.guarda2, x2, g.suelo, t, { dir: va > 0 ? -1 : -1, anda: va > 0 && va < 1, sorpresa: t > @(19.3) && t < @(19.9), dedo: t > @(19.9) && t < @(21.0) });
  const bolsa = (x, y) => T.PIEZAS_NV.bolsa(R, x, y, {});
  if (e > 0.2 && pasa < 1) { const [ax, ay] = ge.mano, [bx, by] = g1.mano; bolsa(Math.round(lerp(ax, bx, pasa)), Math.round(lerp(ay, by, pasa) + 5 - Math.sin(pasa * Math.PI) * 6)); }
  else if (pasa >= 1 && t < @(19.0)) { bolsa(g1.mano[0], g1.mano[1] + 5); if (t < @(18.2)) for (let k = 0; k < 4; k++) { const a = t * 6 + k * 1.6; R.pset(Math.round(g1.mano[0] + Math.cos(a) * 7), Math.round(g1.mano[1] - 2 + Math.sin(a) * 5), H('#ffe890')); } }
  if (t > @(19.0)) { const [fx, fy] = g1.mano; R.rect(fx - 3, fy, fx + 3, fy + 8, K); R.rect(fx - 2, fy + 1, fx + 2, fy + 7, H('#ffd870')); R.rect(fx - 2, fy + 1, fx + 2, fy + 1, H('#3a3a3a')); halo(fx, fy + 4, 22, H('#ffd890'), 0.35); }
  T.epocaDelante(R, t, { encuadre: 'bosque', camara: 'guardas' });
};
const efectos = [[@(0.6), 'maquina'], [@(4.1), 'papel'], [L2 + 0.3, 'viento'], [@(6.1), 'brillo'], [@(9.1), 'whoosh'], [L3 + 0.3, 'puerta'], [@(12.98), 'lapiz'], [@(14.84), 'brillo'], [@(17.6), 'tic'], [@(19.35), 'whoosh']];
T.rodar(E, R, [[0, p1], [L2, p2], [L3, p3], [L4, p4]], { efectos, año: (t) => t < L2 ? 1845 : 1521 });
'''))
