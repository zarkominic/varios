E = {}

# ayudas comunes a las tres escenas (cada escena es un .html suelto: se copian en cada cuerpo)
AY = r'''
const K = T.C.k, BL = hex('#ffffff');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (p, q, u) => { let r = 0; for (const s of [0, 8, 16]) { const ca = (p >>> s) & 255, cb = (q >>> s) & 255; r += Math.round(ca + (cb - ca) * u) * (1 << s); } return (0xff000000 + r) >>> 0; };
// resplandor: mezcla un disco con un color, en escalones con trama
const luz = (cx, cy, r, col, a) => { cx = Math.round(cx); cy = Math.round(cy);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d >= 1) continue; const x = cx + i, y = cy + j; if (x < 0 || y < 0 || x > 319 || y > 179) continue;
    const lv = a * (1 - d) ** 1.3 * 6; let l = Math.floor(lv); if (lv - l > (((x & 1) * 2 + (y & 1) * 3) % 4 + 0.5) / 4) l++; if (l <= 0) continue; R.pset(x, y, mez(R.pget(x, y), col, Math.min(0.85, l / 6))); } };
// el bocadillo redondeado con su rabito (x, y: la punta del rabito); devuelve el centro
const bocadillo = (x, y, w = 10, h = 18) => { x = Math.round(x); y = Math.round(y); const x0 = x - w, x1 = x + w, y1 = y - 4, y0 = y1 - h;
  R.rect(x0 + 1, y0, x1 - 1, y1, K); R.rect(x0, y0 + 1, x1, y1 - 1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, BL); R.rect(x0 + 2, y1 - 1, x1 - 1, y1 - 1, hex('#d0d0dc'));
  for (let k = 0; k < 4; k++) { R.pset(x - 1 + (k >> 1), y1 + k, K); R.pset(x + (k >> 1), y1 + k, k < 3 ? BL : K); R.pset(x + 1 + (k >> 1), y1 + k, K); }
  return [x, Math.round((y0 + y1) / 2)]; };
const globo = (x, y, ic, col = K) => { const [cx, cy] = bocadillo(x, y); R.icono(ic, cx - 5, cy - 7, col, hex('#c8c8d0'), 2); };
const chispa = (x, y, c = hex('#fff6c8')) => { x = Math.round(x); y = Math.round(y); R.pset(x, y, BL); for (const [i, j] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(x + i, y + j, c); R.pset(x + 2, y, hex('#e8c060')); R.pset(x - 2, y, hex('#e8c060')); R.pset(x, y + 2, hex('#e8c060')); R.pset(x, y - 2, hex('#e8c060')); };
const destello = (x, y, u, r0 = 4, r1 = 18, c = hex('#fff2b0')) => { if (u <= 0 || u >= 1) return; const r = r0 + (r1 - r0) * u;
  for (let k = 0; k < 16; k++) { if ((k + Math.floor(u * 5)) % 3 === 0) continue; const a = k / 16 * Math.PI * 2; R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r * 0.85), u < 0.6 ? c : hex('#e8c060')); } };
// un corazón de píxeles (escala s), con contorno
const CORA = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'];
const corazon = (x, y, s = 1, c = hex('#e83a5a')) => { x = Math.round(x); y = Math.round(y);
  CORA.forEach((f, j) => { for (let i = 0; i < 7; i++) if (f[i] === '#') R.rect(x + i * s - 1, y + j * s - 1, x + i * s + s, y + j * s + s, K); });
  CORA.forEach((f, j) => { for (let i = 0; i < 7; i++) if (f[i] === '#') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, j === 1 && i === 1 ? hex('#ffb0c0') : c); }); };
const suave = (u) => u * u * (3 - 2 * u);
const salto = (u, h) => Math.round(Math.sin(Math.PI * Math.max(0, Math.min(1, u))) * h);
'''

# ══════════════════════════════════════════════════════════════════════════════════════
E['si-hoy'] = ('Hoy', '''// SI-HOY (frases 64–65), cartela «2026», año 2026. Tres planos:
// 1. «hoy cuarto general» (tras la cartela): el chico despierta el ordenador moderno con el ratón (la pantalla se
//    enciende) y juega la aventura antigua: el caballerito cruza el camino de su pantalla; en «computers» llega al
//    castillo, fuegos de píxeles en la pantalla y el chico levanta los brazos; luego mira el mapa dibujado a mano de la
//    pared y lo señala. Corta en «fans».
// 2. inserto, fondo local: el corcho del cuarto con el mapa hecho a mano (salas numeradas, el lago, calaveras donde se
//    muere, la ruta roja ya hecha); una mano con un lápiz rojo sigue la ruta y, en «staying alive», la desvía alrededor
//    de la calavera del pasillo y pinta un corazón en la sala del tesoro; otra mano sube un móvil, en «online» le hace
//    la foto (destello) y del móvil salen corazones mientras el contador sube. Corta en «Some».
// 3. «hoy cuarto, cámara album»: el chico, detrás del escritorio, repasa con el dedo los cromos de muertes, que se
//    encienden uno a uno en «collect every possible death»; en «one by one» la mano de un amigo trae el último cromo
//    (la calavera dorada con gafas) desde el montón y lo pega en su hueco; en «cards» destello y el chico lo celebra.''', AY + r'''
const a = (f) => en('hoy', f), b = (f) => en('cromos', f);
// palabras (s de escena): modern 3.76, computers 4.12, fans 5.30, share 5.96, maps 6.26, tips 6.76, staying 7.22,
// alive 7.50, online 9.98, Some 11.00, collect 11.52, death 12.68, one by one 14.33, cards 15.96
const P2 = a(0.569), P3 = b(0.167);
const ENCIENDE = 1.45, JUEGO0 = a(0.06), COMPUTERS = a(0.392), MIRA = a(0.44);
const LAPIZ0 = a(0.66), ALIVE = a(0.75), ONLINE = b(0.017);
const COLLECT = b(0.243), DEATH = b(0.415), UNO = b(0.655), CARDS = b(0.893);

// ── 1 · el cuarto: juega una aventura antigua en el ordenador de hoy ──
const p1 = (t) => {
  const jue = tramo(t, JUEGO0, COMPUTERS);
  const op = { encuadre: 'cuarto', camara: 'general', juego: jue };
  const G = T.hoy(R, t, op), S = G.suelo ?? 141;
  // la pantalla dormida hasta que mueve el ratón; luego se enciende con una raya de luz
  if (t < ENCIENDE + 0.3) {
    const v = tramo(t, ENCIENDE, ENCIENDE + 0.3), h = Math.round(v * 15);
    for (let y = 90; y <= 120; y++) for (let x = 26; x <= 90; x++) if (Math.abs(y - 105) >= h) R.pset(x, y, (x + y) % 9 === 0 ? hex('#141a2a') : hex('#0a0d16'));
    if (t < ENCIENDE) { R.pset(31 + Math.round(Math.sin(t * 2) * 0), 116, Math.floor(t * 2) % 2 ? hex('#e8a040') : hex('#5a3a18')); R.linea(30, 94, 36, 92, hex('#2a3348')); }
    else for (let x = 26; x <= 90; x++) { R.pset(x, 105 - h, BL); R.pset(x, 105 + h, BL); }
  }
  // fuegos de píxeles en la pantalla cuando el caballerito llega al castillo
  const fu = tramo(t, COMPUTERS, COMPUTERS + 1.2);
  if (fu > 0 && fu < 1) for (let k = 0; k < 3; k++) { const cx = 48 + k * 16, cy = 98 + (k % 2) * 4, r = 2 + fu * 7 + k; for (let i = 0; i < 8; i++) { const an = i / 8 * Math.PI * 2 + k; const x = Math.round(cx + Math.cos(an) * r), y = Math.round(cy + Math.sin(an) * r * 0.8); if (x > 26 && x < 90 && y > 90 && y < 120) R.pset(x, y, [hex('#f8e040'), hex('#f05a8a'), hex('#5ae8f0')][k]); } }
  // el chico: mueve el ratón, teclea, celebra y señala el mapa de la pared
  const raton = t > 0.9 && t < ENCIENDE + 0.2, teclea = t > JUEGO0 && t < COMPUTERS - 0.05, cel = t > COMPUTERS && t < MIRA;
  const golpe = Math.floor(t * 8) % 2;
  const m = R.actor(EL.chico, 109, S, t, { dir: t > MIRA ? 1 : -1, sostiene: raton ? [104, 133] : teclea ? [100 + golpe * 3, 130 + golpe] : undefined,
    brazos: cel, sonrisa: cel || t > MIRA, sorpresa: t > ENCIENDE && t < ENCIENDE + 0.5, dedo: t > MIRA + 0.25, salto: cel ? salto(tramo(t, COMPUTERS, COMPUTERS + 0.4), 2) : 0 });
  T.j_hoyDelante(R, t, op);
  // la mano encima del ratón / del teclado se ve por encima del escritorio
  if (raton) { const [mx, my] = m.mano; R.rect(mx - 2, my - 1, mx + 2, my + 1, K); R.rect(mx - 1, my, mx + 1, my, hex('#f6c290')); }
  // el «!» del mapa: lo que va a mirar
  if (t > MIRA + 0.3) { const u = tramo(t, MIRA + 0.3, MIRA + 0.6); globo(130, 32 + Math.round((1 - u) * 6), '!', hex('#c8303a')); }
};

// ── 2 · inserto: el corcho con el mapa hecho a mano; la ruta, el truco y la foto para internet ──
let F2 = null;
// salas del mapa [x0, y0, x1, y1] y la ruta ya trazada antes (de la sala 1 a la 7)
const SALAS = [[76, 34, 104, 54], [122, 32, 154, 52], [174, 36, 208, 58], [78, 72, 110, 98], [126, 66, 164, 96], [182, 74, 220, 102], [90, 112, 130, 136], [170, 112, 210, 136]];
const RUTA0 = [[90, 46], [90, 64], [94, 86], [100, 104], [108, 124]];
const RUTA1 = [[110, 124], [126, 128], [134, 138], [150, 141], [166, 138], [174, 130], [190, 124]];
const punteado = (pts, u, col) => { let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let rest = L * u, s = 0, fin = pts[0];
  for (let i = 1; i < pts.length && rest > 0; i++) { const d = seg[i - 1], f = Math.min(1, rest / d); for (let k = 0; k <= d * f; k++) { if ((s + k) % 5 < 3) { const x = Math.round(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k / d), y = Math.round(pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k / d); R.rect(x, y, x + 1, y, col); } }
    fin = [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f]; s += d; rest -= d; }
  return fin; };
const lapiz = (x, y) => { // la punta en (x, y); el lápiz rojo sube hacia la derecha y abajo
  for (let i = 0; i < 22; i++) { const px = x + Math.round(i * 0.45), py = y + i; R.rect(px - 2, py, px + 2, py, K); }
  for (let i = 1; i < 21; i++) { const px = x + Math.round(i * 0.45), py = y + i; const c = i < 4 ? hex('#e8c890') : i > 18 ? hex('#f0a0b0') : i > 16 ? hex('#c8c8d0') : hex('#d84a3a'); R.rect(px - 1, py, px + 1, py, c); if (i >= 4 && i <= 16) R.pset(px - 1, py, hex('#f07a5a')); }
  R.pset(x, y, hex('#3a2a2a')); R.pset(x, y + 1, hex('#c83a2a')); };
const nota = (x, y, col, dibujo, alza = 0) => { R.rect(x + 2, y + 2, x + 17, y + 17, hex('#7a5430')); R.rect(x, y, x + 15, y + 15 - alza, col); R.rect(x, y, x + 15, y + 1, mez(col, K, 0.12));
  if (alza > 0) { R.rect(x + 1, y + 15 - alza, x + 15, y + 15, mez(col, K, 0.25)); } dibujo(x, y); };
const fondo2 = () => {
  if (F2) return F2;
  F2 = R.nuevo(); const prev = R.usar(F2);
  // la pared azul del cuarto, con papel de rayas y su textura
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const r = hh(x, y); R.pset(x, y, ((x >> 2) & 3) === 0 ? hex('#2e3e62') : r < 0.08 ? hex('#33456c') : r > 0.94 ? hex('#25334f') : hex('#2a3a5c')); }
  // el corcho con su marco de madera
  R.rect(8, 18, 268, 152, hex('#4a2e16'));
  for (let y = 19; y <= 151; y++) for (let x = 9; x <= 267; x++) { const borde = x < 13 || x > 263 || y < 23 || y > 147; if (borde) { R.pset(x, y, y < 21 || x < 11 ? hex('#b07a44') : x > 265 || y > 149 ? hex('#5a3a1e') : (x + y * 3) % 11 === 0 ? hex('#7a4e28') : hex('#8a5a32')); continue; }
    const r = hh(x, y, 2); R.pset(x, y, r < 0.12 ? hex('#a87840') : r < 0.2 ? hex('#d8ac6c') : r > 0.96 ? hex('#8a6030') : hex('#c4955a')); }
  // las cosas clavadas: una foto del castillo, un tique, una ficha con casillas, dos fotos pequeñas
  const chinche = (x, y, c) => { R.disco(x, y, 2, K); R.disco(x, y, 1, c); R.pset(x - 1, y - 1, BL); };
  { const x = 16, y = 28; R.rect(x + 2, y + 2, x + 34, y + 38, hex('#7a5430')); R.rect(x, y, x + 32, y + 36, hex('#f4f2ea')); R.rect(x + 3, y + 3, x + 29, y + 27, hex('#7ab8e8'));
    R.rect(x + 3, y + 21, x + 29, y + 27, hex('#5aa84a')); R.rect(x + 10, y + 11, x + 22, y + 22, hex('#a8a8b8')); R.rect(x + 9, y + 8, x + 12, y + 12, hex('#9898a8')); R.rect(x + 20, y + 8, x + 23, y + 12, hex('#9898a8')); R.rect(x + 15, y + 16, x + 17, y + 22, hex('#4a3a2a'));
    R.disco(x + 25, y + 7, 2, hex('#f8e070')); chinche(x + 16, y + 2, hex('#e84a3a')); }
  { const x = 18, y = 72; R.rect(x + 1, y + 1, x + 31, y + 15, hex('#7a5430')); R.rect(x, y, x + 30, y + 14, hex('#f0a040')); for (let i = 0; i < 30; i += 3) R.pset(x + i, y + 14, hex('#c4955a')); R.rect(x + 22, y, x + 22, y + 14, hex('#c87a20'));
    R.numero('26', x + 4, y + 10, { fina: true, color: hex('#6a3a10'), sombra: false }); chinche(x + 26, y + 3, hex('#3a8ae8')); }
  { const x = 16, y = 96; R.rect(x + 2, y + 2, x + 38, y + 46, hex('#7a5430')); R.rect(x, y, x + 36, y + 44, hex('#f8f8f2'));
    for (let r = 0; r < 6; r++) { const yy = y + 6 + r * 7; R.rect(x + 3, yy, x + 33, yy, hex('#9ab0d8')); R.rect(x + 4, yy - 4, x + 7, yy - 1, hex('#5a5a6a')); R.rect(x + 5, yy - 3, x + 6, yy - 2, BL);
      if (r < 4) { R.pset(x + 5, yy - 2, hex('#2a9a4a')); R.pset(x + 6, yy - 3, hex('#2a9a4a')); R.pset(x + 7, yy - 4, hex('#2a9a4a')); }
      R.rect(x + 10, yy - 2, x + 10 + 8 + (r * 7) % 15, yy - 2, hex('#7a7a8a')); }
    chinche(x + 18, y + 2, hex('#f8d040')); }
  for (const [x, y, c] of [[238, 30, hex('#e8a0c8')], [240, 82, hex('#8ad0a0')]]) { R.rect(x + 2, y + 2, x + 22, y + 30, hex('#7a5430')); R.rect(x, y, x + 20, y + 28, hex('#f4f2ea')); R.rect(x + 2, y + 2, x + 18, y + 20, c);
    R.disco(x + 10, y + 12, 4, hex('#f6c290')); R.rect(x + 6, y + 4, x + 14, y + 8, y > 50 ? hex('#3a2a20') : hex('#c87a3a')); R.pset(x + 8, y + 12, K); R.pset(x + 12, y + 12, K); R.rect(x + 9, y + 14, x + 11, y + 14, hex('#a83a3a')); chinche(x + 10, y + 1, hex('#5ac85a')); }
  // el mapa hecho a mano: papel con pliegues, sombra y borde roto abajo
  const X0 = 62, Y0 = 26, X1 = 232, Y1 = 146;
  R.rect(X0 + 3, Y0 + 3, X1 + 3, Y1 + 3, hex('#7a5430'));
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { if (y > Y1 - 3 && hh(x, 0, 5) * 3 < y - (Y1 - 3)) continue; const r = hh(x, y, 7), pl = x === 148 || y === 86;
    R.pset(x, y, pl ? hex('#d8c8a0') : x === 149 || y === 87 ? hex('#fbf2d8') : r < 0.07 ? hex('#e2d2ac') : (x - X0 < 3 || X1 - x < 3 || y - Y0 < 3) ? hex('#e8d8b0') : hex('#f0e4c4')); }
  // la esquina de abajo a la derecha, doblada
  for (let i = 0; i < 9; i++) for (let j = 0; j <= i; j++) R.pset(X1 - 8 + i, Y1 - 8 + (8 - j) - 1, j === i ? hex('#c8b890') : hex('#e0d0a8'));
  // salas a lápiz, pasillos dobles y números
  const PL = hex('#5a4c44');
  SALAS.forEach(([x0, y0, x1, y1], k) => { R.linea(x0, y0, x1, y0 + 1, PL); R.linea(x1, y0 + 1, x1 - 1, y1, PL); R.linea(x1 - 1, y1, x0 + 1, y1, PL); R.linea(x0 + 1, y1, x0, y0, PL);
    R.numero(String(k + 1), x0 + 4, y0 + 8, { fina: true, color: hex('#4a3c34'), sombra: false }); });
  const pas = (x0, y0, x1, y1) => { const hor = Math.abs(x1 - x0) > Math.abs(y1 - y0); for (const d of [-2, 2]) R.linea(x0 + (hor ? 0 : d), y0 + (hor ? d : 0), x1 + (hor ? 0 : d), y1 + (hor ? d : 0), hex('#7a6c60')); };
  pas(104, 44, 122, 42); pas(154, 42, 174, 46); pas(90, 54, 90, 72); pas(140, 52, 140, 66); pas(164, 84, 182, 86); pas(100, 98, 104, 112); pas(130, 124, 170, 124); pas(200, 102, 194, 112);
  // el lago de la sala 5, las calaveras (donde se muere) y la X del tesoro
  R.disco(146, 84, 9, hex('#7ab0d8')); R.disco(140, 82, 6, hex('#7ab0d8')); R.disco(148, 82, 5, hex('#a8d0f0')); for (let i = 0; i < 5; i++) R.pset(138 + i * 3, 86 + (i % 2), hex('#5a90c0'));
  for (const [x, y] of [[188, 42], [204, 82], [74 + 66, 56 + 4], [146, 118]]) R.icono('calavera', x, y, K, hex('#c8b890'));
  R.linea(184, 118, 194, 128, hex('#d83a2a')); R.linea(194, 118, 184, 128, hex('#d83a2a')); R.linea(185, 118, 195, 128, hex('#d83a2a')); R.linea(195, 118, 185, 128, hex('#d83a2a'));
  // flechas y estrellitas a lápiz
  R.linea(212, 64, 222, 64, PL); R.pset(220, 63, PL); R.pset(220, 65, PL); for (const [x, y] of [[116, 104], [214, 120]]) { R.pset(x, y, PL); R.pset(x - 1, y, PL); R.pset(x + 1, y, PL); R.pset(x, y - 1, PL); R.pset(x, y + 1, PL); }
  // las chinchetas de las cuatro esquinas
  chinche(X0 + 4, Y0 + 4, hex('#e84a3a')); chinche(X1 - 4, Y0 + 4, hex('#3a8ae8')); chinche(X0 + 4, Y1 - 6, hex('#f8d040')); chinche(X1 - 10, Y1 - 12, hex('#5ac85a'));
  // la ruta antigua, de la entrada a la sala 7
  punteado(RUTA0, 1, hex('#c83a2a'));
  // a la derecha de la pared: un póster pequeño y unos cascos colgados
  { const x = 278, y = 60; R.rect(x - 1, y - 1, x + 33, y + 43, K); R.rect(x, y, x + 32, y + 42, hex('#1e2a4a')); for (let i = 0; i < 14; i++) R.pset(x + 2 + (i * 7) % 29, y + 2 + (i * 5) % 20, hex('#c8d0f0'));
    R.disco(x + 24, y + 9, 4, hex('#f0eac8')); R.poligono([[x + 2, y + 41], [x + 12, y + 24], [x + 20, y + 32], [x + 30, y + 22], [x + 30, y + 41]], hex('#2a3a2a'));
    R.rect(x + 13, y + 26, x + 15, y + 34, hex('#a8a8b8')); R.pset(x + 14, y + 25, hex('#e84a3a')); }
  { const x = 292; R.rect(x, 112, x + 2, 114, hex('#a8a8b8')); R.anillo(x + 1, 126, 9, K); R.anillo(x + 1, 126, 8, hex('#3a3a48'));
    R.rect(x - 10, 124, x - 6, 136, K); R.rect(x - 9, 125, x - 7, 135, hex('#e84a5a')); R.rect(x + 8, 124, x + 12, 136, K); R.rect(x + 9, 125, x + 11, 135, hex('#e84a5a')); }
  // el escritorio blanco de abajo, con sus cosas
  R.rect(0, 153, 319, 179, hex('#e4e6ee')); R.rect(0, 153, 319, 154, hex('#f6f7fb')); R.rect(0, 155, 319, 155, hex('#b8bccb'));
  for (let i = 0; i < 40; i++) R.pset(Math.floor(hh(i, 3) * 320), 158 + Math.floor(hh(i, 4) * 20), hex('#d4d6e0'));
  // lápices de colores sueltos, la goma, el bote y la figurita del caballero
  for (const [x, y, c] of [[24, 166, hex('#3a8ae8')], [40, 170, hex('#f8d040')], [58, 164, hex('#5ac85a')]]) { R.linea(x, y, x + 16, y - 3, K); R.linea(x, y + 1, x + 16, y - 2, c); R.linea(x, y + 2, x + 16, y - 1, K); R.pset(x - 1, y + 1, hex('#e8c890')); }
  R.rect(80, 166, 90, 171, K); R.rect(81, 167, 89, 170, hex('#f0a0b0')); R.rect(81, 167, 84, 170, hex('#5a8ad8'));
  { const x = 296; R.rect(x - 1, 140, x + 13, 168, K); R.rect(x, 141, x + 12, 167, hex('#3a5ab0')); R.rect(x, 141, x + 2, 167, hex('#5a7ad0')); for (const [i, c] of [[2, '#e84a3a'], [5, '#f8d040'], [8, '#5ac85a'], [11, '#3a8ae8']]) { R.rect(x + i - 1, 128 + i % 3, x + i, 140, K); R.rect(x + i, 129 + i % 3, x + i, 140, hex(c)); } }
  R.usar(prev);
  return F2;
};
const movil = (x0, y0, t, foto, likes) => {
  R.rect(x0 - 1, y0 - 1, x0 + 44, y0 + 76, K); R.rect(x0, y0, x0 + 43, y0 + 75, hex('#2a2a36')); R.rect(x0 + 1, y0 + 1, x0 + 42, y0 + 1, hex('#5a5a6a')); R.rect(x0 + 42, y0 + 2, x0 + 42, y0 + 74, hex('#1a1a22'));
  const sx0 = x0 + 3, sy0 = y0 + 7, sx1 = x0 + 40, sy1 = y0 + 66;
  if (!foto) { // la cámara en vivo: el mapa visto por el móvil, con los corchetes de enfoque
    R.rect(sx0, sy0, sx1, sy1, hex('#c4955a')); R.rect(sx0 + 3, sy0 + 8, sx1 - 3, sy1 - 10, hex('#f0e4c4'));
    for (let k = 0; k < 6; k++) { const x = sx0 + 6 + (k % 3) * 10, y = sy0 + 12 + Math.floor(k / 3) * 16; R.rect(x, y, x + 7, y, hex('#5a4c44')); R.rect(x, y + 7, x + 7, y + 7, hex('#5a4c44')); R.rect(x, y, x, y + 7, hex('#5a4c44')); R.rect(x + 7, y, x + 7, y + 7, hex('#5a4c44')); }
    for (let i = 0; i < 7; i++) R.pset(sx0 + 8 + i * 3, sy0 + 34 + (i % 2), hex('#c83a2a'));
    const p = Math.floor(t * 3) % 2 ? hex('#ffffff') : hex('#f8e070');
    for (const [cx, cy, dx, dy] of [[sx0 + 4, sy0 + 6, 1, 1], [sx1 - 4, sy0 + 6, -1, 1], [sx0 + 4, sy1 - 8, 1, -1], [sx1 - 4, sy1 - 8, -1, -1]]) { R.rect(Math.min(cx, cx + dx * 4), cy, Math.max(cx, cx + dx * 4), cy, p); R.rect(cx, Math.min(cy, cy + dy * 4), cx, Math.max(cy, cy + dy * 4), p); }
    R.disco(x0 + 21, sy1 + 4, 3, BL); R.disco(x0 + 21, sy1 + 4, 2, hex('#d84a3a'));
  } else { // publicado: la foto del mapa, el corazón y el contador
    R.rect(sx0, sy0, sx1, sy1, hex('#f4f4f8')); R.rect(sx0, sy0, sx1, sy0 + 5, hex('#3a6ac8')); R.disco(sx0 + 4, sy0 + 2, 2, hex('#f8d040'));
    R.rect(sx0 + 2, sy0 + 8, sx1 - 2, sy0 + 36, hex('#c4955a')); R.rect(sx0 + 4, sy0 + 10, sx1 - 4, sy0 + 34, hex('#f0e4c4'));
    for (let k = 0; k < 4; k++) { const x = sx0 + 6 + (k % 2) * 14, y = sy0 + 12 + Math.floor(k / 2) * 11; R.rect(x, y, x + 9, y, hex('#5a4c44')); R.rect(x, y + 7, x + 9, y + 7, hex('#5a4c44')); R.rect(x, y, x, y + 7, hex('#5a4c44')); R.rect(x + 9, y, x + 9, y + 7, hex('#5a4c44')); }
    for (let i = 0; i < 8; i++) R.pset(sx0 + 9 + i * 3, sy0 + 21 + ((i >> 1) % 2) * 3, hex('#c83a2a'));
    corazon(sx0 + 3, sy0 + 41, 1); R.numero(String(likes), sx0 + 14, sy0 + 47, { fina: true, color: hex('#2a2a36'), sombra: false });
    for (let r = 0; r < 2; r++) R.rect(sx0 + 3, sy0 + 52 + r * 4, sx1 - 6 - r * 8, sy0 + 52 + r * 4, hex('#c8c8d4'));
  }
  R.rect(x0 + 18, y0 + 2, x0 + 25, y0 + 3, hex('#111118')); R.pset(x0 + 29, y0 + 3, hex('#3a5a8a')); R.rect(x0 + 17, y0 + 70, x0 + 26, y0 + 71, hex('#5a5a6a'));
};
const p2 = (t) => {
  R.copiar(fondo2());
  // la luz del flexo (de arriba a la derecha) que tiembla un poco, y la tira de luces de colores del marco
  luz(250, 10, 70, hex('#ffe8b0'), 0.18 + 0.02 * Math.sin(t * 3));
  for (let k = 0; k < 22; k++) { const x = 14 + k * 12, y = 17 + Math.round(Math.sin(k * 0.9) * 1.5) + (k % 2); R.pset(x, y - 1, hex('#1a1a22')); const c = [hex('#f8e040'), hex('#f05a8a'), hex('#5ae8f0'), hex('#8af05a')][(k + Math.floor(t * 2)) % 4]; R.rect(x - 1, y, x + 1, y + 2, c); R.pset(x, y + 1, BL); }
  for (let x = 10; x < 268; x++) R.pset(x, 16 + Math.round(Math.sin(x * 0.26) * 1.2), hex('#1a1a22'));
  // las notas adhesivas que ya estaban (trucos de otros): una se levanta con la corriente
  const ondea = Math.round((Math.sin(t * 2.2) * 0.5 + 0.5) * 4);
  nota(210, 28, hex('#f8e070'), (x, y) => { R.icono('!', x + 6, y + 4, hex('#c8303a'), hex('#f8e070')); });
  nota(222, 90, hex('#f0a0c8'), (x, y) => { R.icono('calavera', x + 4, y + 4, K, hex('#f0a0c8')); R.linea(x + 3, y + 3, x + 12, y + 12, hex('#d83a2a')); }, ondea);
  nota(48, 120, hex('#a8e8a0'), (x, y) => { R.linea(x + 3, y + 8, x + 11, y + 8, hex('#2a6a3a')); R.linea(x + 8, y + 5, x + 11, y + 8, hex('#2a6a3a')); R.linea(x + 8, y + 11, x + 11, y + 8, hex('#2a6a3a')); });
  // la taza que humea en el escritorio
  { const x = 262; R.rect(x - 1, 158, x + 13, 172, K); R.rect(x, 159, x + 12, 171, hex('#f4f4f8')); R.rect(x + 2, 161, x + 10, 163, hex('#e84a5a')); R.anillo(x + 14, 165, 3, K);
    for (let k = 0; k < 3; k++) { const u = ((t * 0.6 + k / 3) % 1), y = Math.round(156 - u * 22), xx = Math.round(x + 6 + Math.sin(u * 6 + k) * 3); if (u < 0.85) { R.pset(xx, y, hex('#c8d0e0')); R.pset(xx, y - 1, hex('#a8b0c4')); } } }
  // la ruta nueva: el lápiz rojo sigue el pasillo y en «staying alive» rodea la calavera; corazón en el tesoro
  const ur = tramo(t, LAPIZ0, ALIVE + 0.15);
  const fin = punteado(RUTA1, suave(ur), hex('#d83a2a'));
  const cor = tramo(t, ALIVE + 0.2, ALIVE + 0.5);
  if (cor > 0) { corazon(196, 112 - Math.round(salto(cor, 3)), 1); if (cor < 1) destello(199, 115, cor, 3, 12); }
  // la mano con el lápiz: entra por abajo, traza y se va
  const ent = tramo(t, P2 + 0.15, LAPIZ0), sal = tramo(t, ALIVE + 0.6, ALIVE + 1.2);
  if (ent > 0 && sal < 1) {
    const [px, py] = ur > 0 ? fin : [110, 124], dy = Math.round((1 - suave(ent)) * 70 + suave(sal) * 70), wob = ur > 0 && ur < 1 ? Math.round(Math.sin(t * 30)) : 0;
    const tx = px + wob, ty = py + dy; lapiz(tx, ty);
    T.brazo(R, tx + 70, ty + 90, tx + 14, ty + 18, '#3e8a6a', -1, { codo: [tx + 40, ty + 44] });
  }
  // el móvil sube por abajo, hace la foto en «online» y salen corazones
  const sube = tramo(t, ALIVE + 0.9, ALIVE + 1.7), foto = t > ONLINE;
  if (sube > 0) {
    const x0 = 140, y0 = Math.round(lerp(190, 96, suave(sube))), likes = Math.floor(128 * tramo(t, ONLINE + 0.2, P3 - 0.1) ** 0.6);
    movil(x0, y0, t, foto, likes);
    T.brazo(R, x0 - 30, y0 + 120, x0 + 2, y0 + 50, '#7a4ab0', 1, { codo: [x0 - 18, y0 + 82] });
    const dc = tramo(t, ONLINE, ONLINE + 0.25); if (dc > 0 && dc < 1) { const a2 = 1 - dc; for (let y = 0; y < 180; y += 1) for (let x = (y & 1); x < 320; x += 2) if (a2 > 0.5 || (x + y) % 4 === 0) R.pset(x, y, BL); }
    if (foto) for (let k = 0; k < 7; k++) { const u = (t - ONLINE - 0.25 - k * 0.14) / 1.1; if (u <= 0 || u >= 1) continue; corazon(x0 + 18 + Math.round(Math.sin(u * 5 + k) * 12) + (k % 3 - 1) * 10, y0 - 6 - Math.round(u * 60), 1, [hex('#e83a5a'), hex('#f05a8a'), hex('#d83a7a')][k % 3]); }
  }
};

// ── 3 · el álbum de cromos de muertes: el último, el de la calavera dorada ──
const CROMOS = []; for (const y of [126, 147]) for (const x of [76, 103, 130, 165, 192, 219]) if (!(x === 219 && y === 147)) CROMOS.push([x, y]);
const p3 = (t) => {
  const pega = tramo(t, UNO, UNO + 1.1);
  const op = { encuadre: 'cuarto', camara: 'album', pega };
  const G = T.hoy(R, t, op), S = G.suelo ?? 121;
  const fiesta = t > CARDS;
  R.actor(EL.chico, 153, S, t, { dir: 1, dedo: t > COLLECT - 0.3 && t < DEATH + 0.4, sonrisa: fiesta || t < UNO, sorpresa: t > UNO + 0.2 && t < CARDS, brazos: fiesta, salto: fiesta ? salto(tramo(t, CARDS, CARDS + 0.45), 3) : 0, habla: t > P3 && t < COLLECT && Math.sin(t * 14) > 0 });
  const D = T.j_hoyDelante(R, t, op);
  // los cromos se encienden uno a uno en «collect every possible death»
  const kk = Math.floor((t - COLLECT) / ((DEATH - COLLECT) / CROMOS.length));
  if (t > COLLECT && kk < CROMOS.length) for (let k = 0; k <= kk; k++) { const [x, y] = CROMOS[k], c = k === kk ? BL : hex('#f8e070');
    if (k === kk || k > kk - 3) { R.rect(x - 1, y - 1, x + 24, y - 1, c); R.rect(x - 1, y + 19, x + 24, y + 19, c); R.rect(x - 1, y - 1, x - 1, y + 19, c); R.rect(x + 24, y - 1, x + 24, y + 19, c); }
    if (k === kk) chispa(x + 22, y + 1); }
  // la mano del amigo trae el último cromo desde el montón y lo pega
  const llega = tramo(t, UNO - 0.7, UNO), vuelve = tramo(t, UNO + 1.25, UNO + 1.8);
  if (llega > 0 && vuelve < 1) {
    const [cx, cy] = D?.carta ?? [lerp(273, 231, pega), lerp(146, 156, pega)];
    const off = Math.round((1 - suave(llega)) * 60 + suave(vuelve) * 60);
    const wx = cx + 13 + off, wy = cy + 2 + Math.round(off * 0.7);
    T.brazo(R, 296 + off, 214, wx, wy, '#3e6ab0', -1);
  }
  if (fiesta) { const u = tramo(t, CARDS, CARDS + 0.6); destello(231, 156, u, 4, 26); for (let k = 0; k < 4; k++) chispa(231 + Math.round(Math.cos(t * 3 + k * 1.6) * 18), 156 + Math.round(Math.sin(t * 3 + k * 1.6) * 12)); }
};
const efectos = [[0.95, 'golpecito'], [ENCIENDE, 'interruptor'], [JUEGO0 + 0.1, 'tecleo'], [COMPUTERS, 'bip'],
  [LAPIZ0, 'lapiz'], [ALIVE + 0.2, 'pop'], [ONLINE, 'flash'], [ONLINE + 0.45, 'bip'],
  [COLLECT, 'brillo'], [UNO, 'papel'], [CARDS, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { cartela: '2026', efectos, año: 2026 });
''')

# ══════════════════════════════════════════════════════════════════════════════════════
E['si-reglas'] = ('Dos maneras', '''// SI-REGLAS (frases 66–67), sin cartela; año 1995 (los noventa) y 2026. Tres planos:
// 1. «casa jugadores 1995, cámara sofa»: dos chicos en el sofá; en «two ways» cada uno levanta su caja de juego: la del
//    sol (aquí no te mueres) y la de la calavera y el castillo; en «adventure» se miran y sonríen; el gato bosteza.
//    Corta en «LucasArts».
// 2. «muerte dividido, cámara cerca»: a la izquierda (nunca morías) un lobo llega gruñendo hasta graham y en «never
//    died» se sienta y menea la cola: corazón; a la derecha (Sierra), en «Sierra's» el disquete corre al pedestal y en
//    «saved» guarda (destello y ✓); en «every two minutes» sale el reloj con un «2», rosella da golpecitos con el pie y
//    el disquete vuelve a guardar. Corta en «and both».
// 3. «reino lago, cámara orilla, luz tarde»: graham salta de piedra en piedra; en «wrong» resbala y cae al agua (chof);
//    sale chorreando, se sacude y en «journey» vuelve a saltar sonriendo; el gnomo asoma y aplaude.''', AY + r'''
const a = (f) => en('dos', f), b = (f) => en('viaje', f);
// palabras: two 2.64, adventure 3.66, LucasArts 4.83, never died 5.75–5.93, Sierra's 6.97, saved 8.24, two 8.86,
// minutes 9.10, and both 10.93, same thing 12.15, Getting 13.32, wrong 13.72, journey 14.58
const P2 = a(0.414), P3 = b(0);
const DOS = a(0.15), AVENT = a(0.273), NUNCA = a(0.525), SIERRA = a(0.673), GUARDA = a(0.826), DOSMIN = a(0.901), OTRA = a(0.97);
const MISMO = b(0.292), GETTING = b(0.571), WRONG = b(0.667), VIAJE = b(0.872);

// ── 1 · el sofá de 1995: dos maneras de vivir una aventura ──
const caja = (x, y, tipo, t) => { // caja de juego de 12 × 16, sin letras
  R.rect(x - 1, y - 1, x + 12, y + 16, K);
  if (tipo === 'sol') { R.rect(x, y, x + 11, y + 15, hex('#5ab0f0')); R.rect(x, y + 11, x + 11, y + 15, hex('#5ac85a')); R.disco(x + 6, y + 6, 3, hex('#f8d040')); R.pset(x + 5, y + 5, BL);
    for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2 + t * 2; R.pset(Math.round(x + 6 + Math.cos(an) * 5), Math.round(y + 6 + Math.sin(an) * 5), hex('#fff0a0')); } }
  else { R.rect(x, y, x + 11, y + 15, hex('#3a2a5a')); R.rect(x + 2, y + 8, x + 9, y + 13, hex('#7a7a8a')); R.rect(x + 2, y + 6, x + 3, y + 8, hex('#7a7a8a')); R.rect(x + 8, y + 6, x + 9, y + 8, hex('#7a7a8a')); R.rect(x + 5, y + 10, x + 6, y + 13, hex('#2a1a3a'));
    R.rect(x + 4, y + 1, x + 7, y + 4, hex('#f4f0e8')); R.pset(x + 5, y + 2, K); R.pset(x + 6, y + 2, K); R.pset(x + 4, y + 5, hex('#f4f0e8')); R.pset(x + 7, y + 5, hex('#f4f0e8')); R.pset(x + 1, y + 14, hex('#e84a3a')); }
  R.rect(x + 11, y, x + 11, y + 15, mez(R.pget(x + 11, y + 4), K, 0.3)); };
const p1 = (t) => {
  const o = { encuadre: 'jugadores', camara: 'sofa', epoca: 1995 };
  T.casa(R, t, o);
  const S = 152, sube1 = t > DOS - 0.1, sube2 = t > DOS + 0.2, miran = t > AVENT;
  T.gato(R, 152, 140, t);
  const A = R.actor(EL.adolescente, 75, S, t, { dir: miran ? 1 : 1, sostiene: sube1 ? [94, 132 - (t < DOS + 0.4 ? Math.round(tramo(t, DOS - 0.1, DOS + 0.3) * 4) : 4)] : undefined, sonrisa: miran || t < 1.2, habla: t > 1.4 && t < DOS - 0.2 && Math.sin(t * 15) > 0, dedo: t > AVENT + 0.6 && t < P2 - 0.2 });
  const B = R.actor(EL.nina, 203, S, t, { dir: -1, sostiene: sube2 ? [200, 132 - (t < DOS + 0.6 ? Math.round(tramo(t, DOS + 0.2, DOS + 0.6) * 4) : 4)] : undefined, sonrisa: miran, sorpresa: t > DOS && t < DOS + 0.5, habla: t > AVENT + 0.4 && t < AVENT + 1.1 && Math.sin(t * 14) > 0 });
  if (sube1) { const [mx, my] = A.mano; caja(mx - 5, my - 14, 'sol', t); }
  if (sube2) { const [mx, my] = B.mano; caja(mx - 7, my - 14, 'calavera', t); }
  T.a_casaDelante(R, t, o);
  if (t > AVENT && t < AVENT + 0.8) { const u = tramo(t, AVENT, AVENT + 0.8); destello(100, 116, u, 3, 14); destello(206, 116, u, 3, 14); }
};

// ── 2 · las dos reglas, una al lado de la otra ──
const LOBO = [
  '..................k..k....',
  '.................kMkkMk...',
  '.................kMMMMk...',
  '................kMMMMMMk..',
  '................kMeMMMMLkk',
  '..kk............kMMMMLLLLk',
  '.kMMk..........kMMMMMLLLk.',
  'kMMk.kkkkkkkkkkMMMMMMkkk..',
  'kMk.kMMMMMMMMMMMMMMMMk....',
  '.k.kMMMMMMMMMMMMMMMMMMk...',
  '...kmMMMMMMMMMMMMMMMMmk...',
  '...kmmMMMLLLLLLLLMMMmmk...',
  '....kmmkkkkkkkkkkkmmk.....'];
const PATAS_L = [['....kmk.kmk....kmk.kmk....', '....kmk.kmk....kmk.kmk....', '....kkk.kkk....kkk.kkk....'],
                 ['...kmk...kmk..kmk...kmk...', '..kmk.....kmk.kmk....kmk..', '..kkk.....kkk.kkk....kkk..']];
const spr = (rows, x, y, dir, pal, i0 = 0, i1 = 99) => { const w = rows.reduce((m, r) => Math.max(m, r.length), 0); rows.forEach((r, j) => { for (let i = Math.max(0, i0); i < Math.min(r.length, i1 + 1); i++) { const ch = r[i]; if (ch !== '.' && pal[ch] !== undefined) R.pset(x + (dir > 0 ? i : w - 1 - i), y + j, pal[ch]); } }); };
const lobo = (x, suelo, t, o = {}) => {
  const dir = o.dir ?? 1, f = o.anda ? Math.floor(t * 10) % 2 : 0, y = suelo - 16 - (o.anda && f ? 1 : 0);
  const pal = { k: K, M: hex('#8a8a9a'), m: hex('#5e5e70'), L: hex('#d0d0da'), e: hex('#f0c830') };
  const cola = Math.sin(t * (o.menea ? 22 : o.anda ? 14 : 5)) > 0 ? 1 : 0;
  for (let i = 3; i < 23; i++) R.pset(x + i, suelo, hex('#3a5a2a'));
  spr(LOBO.slice(0, 8), x, y - cola - (o.menea ? 1 : 0), dir, pal, 0, 4);
  spr(LOBO.slice(7), x, y + 7, dir, pal);
  spr(PATAS_L[f], x, y + 13, dir, pal);
  spr(LOBO.slice(0, 8), x, y + (o.gruñe ? 1 : 0), dir, pal, 14, 25);
  if (o.lengua) { const hx = dir > 0 ? x + 24 : x + 1; R.rect(hx, y + 8, hx + 1, y + 9, hex('#e8607a')); }
};
const p2 = (t) => {
  const G = T.muerte(R, t, { encuadre: 'dividido', camara: 'cerca', brillo: Math.max(tramo(t, GUARDA, GUARDA + 0.6), tramo(t, OTRA, OTRA + 0.6)) % 1 });
  const S = G.suelo ?? 162;
  // izquierda: el lobo llega gruñendo y, en «never died», se sienta y menea la cola
  const lx = Math.round(lerp(-30, 96, suave(tramo(t, P2 + 0.05, NUNCA - 0.1)))), manso = t > NUNCA;
  lobo(lx, S, t, { dir: 1, anda: t > P2 + 0.05 && t < NUNCA - 0.1, gruñe: !manso && Math.sin(t * 20) > 0, menea: manso, lengua: manso });
  R.actor(EL.graham, 128, S, t, { dir: -1, sorpresa: t > P2 + 0.4 && t < NUNCA, sonrisa: manso, dedo: t > NUNCA + 0.3 && t < SIERRA, salto: t > NUNCA + 0.2 && t < NUNCA + 0.6 ? salto(tramo(t, NUNCA + 0.2, NUNCA + 0.6), 3) : 0 });
  if (!manso && t > P2 + 0.5) globo(126, 128, '!', hex('#c8303a'));
  if (manso) { const u = tramo(t, NUNCA, NUNCA + 0.5); corazon(112, 118 - Math.round(u * 12), 2); }
  // derecha: el disquete corre al pedestal y guarda; rosella espera
  const corre = tramo(t, SIERRA, GUARDA - 0.15), su = tramo(t, GUARDA - 0.5, GUARDA - 0.1);
  const dx = Math.round(lerp(232, 284, suave(corre)) + (su > 0 ? lerp(0, 12, su) : 0)), dy = su > 0 ? Math.round(lerp(S, 129, su) - Math.sin(su * Math.PI) * 8) : S;
  const g1 = tramo(t, GUARDA, GUARDA + 0.7), g2 = tramo(t, OTRA, OTRA + 0.7), guarda = g2 > 0 ? g2 : g1 < 1 ? g1 : 0;
  T.disquete(R, dx, dy, t, { s: 1.5, dir: 1, corre: corre > 0 && corre < 1 ? 1 : 0, guarda, expresion: t > GUARDA ? 'feliz' : 'normal' });
  const pie = t > DOSMIN + 0.1 && t < OTRA + 0.3;
  R.actor(EL.rosella, 196, S, t, { dir: 1, dedo: t > SIERRA && t < GUARDA, sonrisa: t > OTRA + 0.5 || (t > GUARDA && t < DOSMIN), enfado: pie, salto: pie && Math.floor(t * 8) % 2 ? 1 : 0 });
  // el reloj del «cada dos minutos»
  const rl = tramo(t, DOSMIN, DOSMIN + 0.3);
  if (rl > 0) { const x = 256, y = 92 - Math.round(rl * 6); R.disco(x, y, 9, K); R.disco(x, y, 8, hex('#f4f0e2')); R.disco(x, y, 1, K);
    const an = t * 6; R.linea(x, y, Math.round(x + Math.cos(an) * 6), Math.round(y + Math.sin(an) * 6), hex('#c8303a')); R.linea(x, y, x, y - 5, K);
    R.numero('2', x + 12, y + 6, { tam: 16 }); }
};

// ── 3 · la orilla del lago al atardecer: equivocarse es parte del viaje ──
const PIEDRAS = [[72, 138], [104, 132], [138, 127]];
const p3 = (t) => {
  const o = { encuadre: 'lago', camara: 'orilla', luz: 'tarde' };
  T.reino(R, t, o);
  // las piedras para cruzar, con ondas
  for (const [x, y] of PIEDRAS) { R.rect(x - 7, y - 1, x + 7, y + 2, K); R.rect(x - 6, y - 1, x + 6, y + 1, hex('#8a8090')); R.rect(x - 5, y - 1, x + 4, y - 1, hex('#b0a8b8')); R.pset(x + 5, y + 1, hex('#5a5068'));
    const r = 8 + ((t * 4 + x) % 4); R.linea(x - r, y + 3, x - r + 3, y + 3, hex('#c8a8b8')); R.linea(x + r - 3, y + 3, x + r, y + 3, hex('#c8a8b8')); }
  const S = 160;
  // la ruta de graham: anda a la orilla, salta a la 1, a la 2, resbala y cae; sale, se sacude y vuelve a saltar
  const anda = tramo(t, P3, P3 + 1.0), s1 = tramo(t, MISMO - 0.1, MISMO + 0.3), s2 = tramo(t, GETTING, GETTING + 0.3), cae = tramo(t, GETTING + 0.3, WRONG);
  const fuera = tramo(t, WRONG + 0.35, WRONG + 0.85), sac = t > WRONG + 0.9 && t < VIAJE + 0.35, re = tramo(t, VIAJE + 0.55, VIAJE + 0.95);
  let gx, gy, op = {};
  if (t < MISMO - 0.1) { gx = lerp(14, 56, suave(anda)); gy = S; op = { anda: anda > 0 && anda < 1 }; }
  else if (t < GETTING) { gx = lerp(56, PIEDRAS[0][0] - 7, s1); gy = lerp(S, PIEDRAS[0][1], s1) - salto(s1, 10); }
  else if (t < GETTING + 0.3) { gx = lerp(PIEDRAS[0][0] - 7, PIEDRAS[1][0] - 7, s2); gy = lerp(PIEDRAS[0][1], PIEDRAS[1][1], s2) - salto(s2, 10); }
  else if (t < WRONG + 0.35) { gx = PIEDRAS[1][0] - 7 + Math.round(Math.sin(t * 40) * cae * 2) + Math.round(cae * 6); gy = PIEDRAS[1][1] + Math.round(tramo(t, WRONG - 0.05, WRONG + 0.2) * 30); op = { sorpresa: true }; }
  else if (t < WRONG + 0.85) { gx = lerp(98, 56, fuera); gy = lerp(140, S, fuera); op = { anda: true, triste: true }; }
  else if (t < VIAJE + 0.55) { gx = 56; gy = S; op = sac ? { dir: Math.floor(t * 12) % 2 ? 1 : -1, triste: t < VIAJE - 0.2 } : { sonrisa: true, dedo: true }; if (t > VIAJE - 0.2 && !sac) op = { sonrisa: true, dedo: true }; if (t > VIAJE - 0.2 && sac) op.sonrisa = true; }
  else { gx = lerp(56, PIEDRAS[0][0] - 7, re); gy = lerp(S, PIEDRAS[0][1], re) - salto(re, 10); op = { sonrisa: true }; }
  const mojado = t > WRONG && t < VIAJE + 0.4;
  const enAgua = t > WRONG - 0.05 && t < WRONG + 0.85;
  if (enAgua) R.recorte([0, 0, 319, t < WRONG + 0.35 ? PIEDRAS[1][1] + 2 : 139]);
  R.actor(EL.graham, Math.round(gx), Math.round(gy), t, { dir: 1, ...op });
  if (enAgua) R.recorte(null);
  // el chof: corona de agua y gotas
  const ch = tramo(t, WRONG, WRONG + 0.7);
  if (ch > 0 && ch < 1) { const x = PIEDRAS[1][0] + 2, y = PIEDRAS[1][1] + 4;
    for (let k = 0; k < 12; k++) { const vx = (k - 5.5) * 7, h0 = 22 - Math.abs(k - 5.5) * 2.5, px = Math.round(x + vx * ch), py = Math.round(y - h0 * Math.sin(ch * Math.PI)); R.rect(px, py, px + 1, py + 1, k % 3 ? hex('#c8e8f8') : BL); }
    const r = Math.round(4 + ch * 18); R.linea(x - r, y + 1, x + r, y + 1, hex('#e8f4ff')); R.linea(x - r + 2, y + 2, x + r - 2, y + 2, hex('#a8c8e8')); }
  // burbujas mientras está debajo
  if (t > WRONG + 0.1 && t < WRONG + 0.45) for (let k = 0; k < 3; k++) { const u = ((t * 3 + k * 0.33) % 1); R.anillo(PIEDRAS[1][0] + (k - 1) * 4, Math.round(PIEDRAS[1][1] + 2 - u * 6), 1, BL); }
  // gotas que caen de graham mojado, y las que salen volando al sacudirse
  if (mojado && t > WRONG + 0.35) { const hx = Math.round(gx) + 7, hy = Math.round(gy) - 24;
    for (let k = 0; k < 5; k++) { const u = ((t * 2.5 + k * 0.2) % 1); R.pset(hx - 6 + k * 3, Math.round(hy + 6 + u * 22), hex('#8ac8f0')); }
    if (sac) for (let k = 0; k < 10; k++) { const u = ((t * 4 + k * 0.1) % 1), s = k % 2 ? 1 : -1; R.rect(Math.round(hx + s * (8 + u * 18)), Math.round(hy + 6 + (k % 5) * 3 - u * 4), Math.round(hx + s * (8 + u * 18)) + 1, Math.round(hy + 6 + (k % 5) * 3 - u * 4), hex('#a8d8f8')); }
    R.rect(hx - 6, Math.round(gy) + 1, hx + 6, Math.round(gy) + 1, hex('#5a8ab0')); }
  if (t > WRONG + 0.1 && t < WRONG + 0.9) globo(Math.round(gx) + 7, 104, '!', hex('#3a5ab0'));
  // el gnomo asoma por su puerta con el chof y aplaude cuando graham lo vuelve a intentar
  const gn = tramo(t, WRONG + 0.15, WRONG + 0.6);
  if (gn > 0) R.actor(EL.gnomo, Math.round(lerp(204, 194, gn)), 158, t, { dir: -1, sorpresa: t < WRONG + 1.2, sonrisa: t > WRONG + 1.2, brazos: t > VIAJE + 0.55 && Math.floor(t * 6) % 2 === 0, habla: t > VIAJE && t < VIAJE + 0.5 });
  T.reinoDelante(R, t, o);
};
const efectos = [[DOS, 'whoosh'], [AVENT + 0.1, 'brillo'],
  [NUNCA, 'guau'], [SIERRA + 0.1, 'whoosh'], [GUARDA, 'interruptor'], [DOSMIN, 'tic'], [OTRA, 'interruptor'],
  [MISMO + 0.3, 'toc'], [GETTING + 0.3, 'toc'], [WRONG, 'chof'], [VIAJE + 0.95, 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P3 ? 1995 : 2026) });
''')

# ══════════════════════════════════════════════════════════════════════════════════════
E['si-cierre'] = ('Cierre', '''// SI-CIERRE (frases 68–69), sin cartela, año 2026. Dos planos:
// 1. «reino castillo, cámara puente, luz tarde»: graham y el disquete llegan a la orilla; el disquete mira el foso (los
//    cocodrilos asoman los ojos) y en «Just in case» guarda con un clic (destello y ✓); en «save» le levanta el pulgar a
//    graham, que cruza el puente de puntillas con los brazos en cruz; un cocodrilo salta y muerde el aire por debajo.
//    Corta en «bridge».
// 2. «reino lago general, luz tarde»: el atardecer sobre el castillo lejano; graham y el disquete llegan por la orilla, se
//    vuelven y saludan en «What do you want me to explain next?»; el disquete guarda una última vez; bandadas y
//    luciérnagas.''', AY + r'''
const a = (f) => en('puente', f), b = (f) => en('adios', f);
// palabras: Sierra game 0.88, Just in case 2.02–2.38, save 3.61, cross 4.45, bridge 4.99, What 6.38, explain 7.14, next 7.46
const P2 = a(0.968);
const JUST = a(0.299), SAVE = a(0.612), CROSS = a(0.778), QUE = b(0), NEXT = b(0.594);

// ── 1 · ante el puente: guardar por si acaso y cruzar de puntillas ──
const p1 = (t) => {
  const o = { encuadre: 'castillo', camara: 'puente', luz: 'tarde' };
  T.reino(R, t, o);
  const S = 128;
  // el cocodrilo que salta y muerde el aire bajo el puente cuando pasa graham
  const cs = tramo(t, CROSS - 0.3, CROSS + 0.45);
  if (cs > 0 && cs < 1) { const x = 150, y = 150 - salto(cs, 18), boca = Math.sin(cs * Math.PI * 4) > 0 ? 3 : 0;
    R.rect(x - 1, y - 5 - boca, x + 21, y + 6, K); R.rect(x, y - 4 - boca, x + 20, y - 1 - boca, hex('#4a8a3a')); R.rect(x, y + 1, x + 20, y + 5, hex('#3a7a2a'));
    for (let i = 2; i < 20; i += 3) { R.pset(x + i, y - boca, BL); R.pset(x + i + 1, y, BL); } R.rect(x + 14, y - 7 - boca, x + 17, y - 5 - boca, hex('#f8e040')); R.pset(x + 16, y - 6 - boca, K);
    R.rect(x - 8, y + 2, x, y + 5, hex('#3a7a2a')); R.linea(x - 14, y + 8, x - 4, y + 3, hex('#e8f4ff')); R.linea(x + 24, y + 8, x + 32, y + 3, hex('#e8f4ff')); }
  // el disquete: llega corriendo, mira el foso, guarda en «Just in case» y le da el pulgar a graham en «save»
  const dl = tramo(t, 0.1, 1.1), g = tramo(t, JUST + 0.1, JUST + 0.8);
  const dx = Math.round(lerp(-14, 50, suave(dl)));
  const d = T.disquete(R, dx, S, t, { s: 1.5, dir: t > SAVE - 0.3 ? -1 : 1, corre: dl > 0 && dl < 1 ? 1 : 0, guarda: g > 0 && g < 1 ? g : 0, expresion: t > JUST + 0.4 ? 'feliz' : t > 1.3 ? 'susto' : 'normal', saluda: t > SAVE && t < CROSS + 0.4 ? 'mano' : undefined });
  if (t > 1.3 && t < JUST) globo(dx + 2, S - 30, '?', hex('#3a5ab0'));
  if (g >= 1 && t < SAVE + 0.6) { T.visto(R, dx - 6, S - 40, 1); }
  // graham: llega andando, espera, y cruza de puntillas con los brazos en cruz
  const ga = tramo(t, 0.4, 1.6), cr = tramo(t, SAVE + 0.3, P2 + 0.1), duda = t > CROSS - 0.3 && t < CROSS + 0.25;
  const gx = t < SAVE + 0.3 ? Math.round(lerp(-20, 22, suave(ga))) : Math.round(lerp(22, 188, cr) - (duda ? 0 : 0));
  R.actor(EL.graham, gx, S, t, { dir: 1, anda: (ga > 0 && ga < 1) || (cr > 0 && cr < 1 && !duda), brazos: cr > 0 && cr < 1, sorpresa: duda, sonrisa: t > JUST + 0.5 && !duda, salto: cr > 0 && cr < 1 && !duda ? Math.round(Math.abs(Math.sin(t * 9))) : 0 });
  T.reinoDelante(R, t, o);
};

// ── 2 · el atardecer: graham y el disquete saludan ──
const p2 = (t) => {
  const o = { encuadre: 'lago', camara: 'general', luz: 'tarde' };
  T.reino(R, t, o);
  // dos bandadas lejanas cruzan el cielo del atardecer
  for (let k = 0; k < 5; k++) { const x = Math.round(lerp(40, 250, ((t - P2) * 0.09 + k * 0.03) % 1)) + k * 6, y = 52 + (k % 2) * 4 + Math.round(Math.sin(t * 2 + k) * 1), al = Math.floor(t * 6 + k) % 2;
    R.pset(x - 2, y - al, hex('#3a2a3a')); R.pset(x - 1, y - 1 + al, hex('#3a2a3a')); R.pset(x, y, hex('#3a2a3a')); R.pset(x + 1, y - 1 + al, hex('#3a2a3a')); R.pset(x + 2, y - al, hex('#3a2a3a')); }
  // luciérnagas junto a los juncos
  for (let k = 0; k < 7; k++) { const x = Math.round(30 + k * 38 + Math.sin(t * 0.9 + k * 2) * 8), y = Math.round(150 + Math.cos(t * 1.1 + k) * 5), on = Math.sin(t * 3 + k * 1.7) > 0.2; if (on) { R.pset(x, y, hex('#f8ff9a')); R.pset(x + 1, y, hex('#c8e070')); } }
  const S = 168, ll = tramo(t, P2, QUE - 0.15);
  const gx = Math.round(lerp(-20, 118, suave(ll))), dx = Math.round(lerp(-44, 158, suave(ll)));
  const hola = t > QUE, onda = Math.floor(t * 5) % 2 === 0;
  R.actor(EL.graham, gx, S, t, { dir: hola ? 1 : 1, anda: ll > 0 && ll < 1, sonrisa: true, dedo: hola && onda && t < NEXT + 0.6, brazos: t > NEXT + 0.6, habla: false });
  const g = tramo(t, NEXT, NEXT + 0.7);
  T.disquete(R, dx, S, t, { s: 1.5, dir: -1, corre: ll > 0 && ll < 1 ? 0.6 : 0, expresion: 'feliz', saluda: hola && t < NEXT ? 'mano' : undefined, guarda: g > 0 && g < 1 ? g : 0, salto: t > NEXT + 0.7 ? salto(tramo(t, NEXT + 0.7, NEXT + 1.1), 4) : 0 });
  if (g >= 1) T.visto(R, dx - 6, S - 40, 1);
  T.reinoDelante(R, t, o);
};
const efectos = [[0.3, 'whoosh'], [JUST + 0.15, 'interruptor'], [CROSS - 0.1, 'chof'], [QUE, 'brillo'], [NEXT, 'interruptor']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 2026 });
''')
