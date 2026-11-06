E = {}

# piezas comunes a las cuatro escenas (cada .html lleva su copia)
H = r'''
const C = T.C, PZ = T.PIEZAS_HP;
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / (a1 - a0)));
const suave = (u) => u * u * (3 - 2 * u);
const parp = (t, v = 7) => Math.sin(t * v) > 0;
const hs = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
// rectángulo que respeta R.recorte (para lo que va dentro de una pantalla o un cristal)
const rr = (x0, y0, x1, y1, c) => { x0 = Math.round(x0); x1 = Math.round(x1); for (let y = Math.round(y0); y <= Math.round(y1); y++) R.linea(x0, y, x1, y, c); };
const mez = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };
const tine = (x, y, c, a) => { const p = R.pget(x, y); if (p) R.pset(x, y, mez(p, c, a)); };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const b4 = (x, y) => B4[((y & 3) << 2) | (x & 3)];
const K = hex('#14101c');
// una nota musical insinuada (cabeza, plica y corchete), con su contorno
const nota = (x, y, c, k = 0) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 1, y - 1, x + 4, y + 3, K); R.rect(x + 2, y - 8, x + 4, y, K); if (k % 2 === 0) R.rect(x + 4, y - 8, x + 6, y - 4, K);
  R.rect(x, y, x + 3, y + 2, c); R.pset(x, y, hex('#fff8dc')); R.rect(x + 3, y - 7, x + 3, y, c); if (k % 2 === 0) { R.pset(x + 4, y - 7, c); R.pset(x + 5, y - 6, c); R.pset(x + 5, y - 5, c); } };
// un haz de luz: tiñe el triángulo (x0, y0)–(xa, ya)–(xb, yb) hacia c, más fuerte cerca del foco
const haz = (x0, y0, xa, ya, xb, yb, c, a) => {
  const mnx = Math.max(0, Math.floor(Math.min(x0, xa, xb))), mxx = Math.min(319, Math.ceil(Math.max(x0, xa, xb))), mny = Math.max(0, Math.floor(Math.min(y0, ya, yb))), mxy = Math.min(179, Math.ceil(Math.max(y0, ya, yb)));
  const s = (px, py, ax, ay, bx, by) => (px - bx) * (ay - by) - (ax - bx) * (py - by);
  for (let y = mny; y <= mxy; y++) for (let x = mnx; x <= mxx; x++) {
    const d1 = s(x, y, x0, y0, xa, ya), d2 = s(x, y, xa, ya, xb, yb), d3 = s(x, y, xb, yb, x0, y0);
    if ((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0)) continue;
    const dd = Math.hypot(x - x0, y - y0) / Math.hypot((xa + xb) / 2 - x0, (ya + yb) / 2 - y0);
    tine(x, y, c, a * (1 - dd * 0.6) * (b4(x, y) < 0.85 ? 1 : 0.5));
  }
};
const lechuzaCarta = (x, y, t, s = 1) => { PZ.carta(R, Math.round(x), Math.round(y + 6 * s), { s }); PZ.lechuza(R, Math.round(x), Math.round(y), { vuela: true, t, s }); };
'''

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['hp-leavesden'] = ('Leavesden', '''// HP-LEAVESDEN (frase 6), 2026. Tres planos:
// 1. el decorado del Gran Comedor en el estudio (cámara 'mesa'): la cámara de cine en su trípode y la vía del travelín, el
//    director detrás que señala el decorado a «Leavesden», un foco de pie que se enciende a «England» y baña la mesa; detrás
//    de la mesa una montadora pone platos de oro y un carpintero clava; un técnico entra con el sombrero seleccionador y lo
//    deja en el taburete a «made»; corta al acabar «made»;
// 2. la escalinata del castillo (exterior 'cerca'): el técnico de sonido acerca la pértiga a la puerta; a «something» las
//    hojas se abren y salen notas insinuadas («sounds different»: se sorprende); a «first second» la snitch sale volando con
//    ellas y la anotadora la señala a «music»; corta antes de «by John Williams»;
// 3. la sala común: el compositor de pelo largo toca el piano de cola; a «anymore» la partitura vieja sale volando del atril
//    y la snitch se posa en él; a «Hans Zimmer» coge la batuta, el chico del timbal da el golpe y estallan las notas; la
//    violinista toca, el fuego y la nieve se mueven.''', H + r'''
const a = (f) => en('estudio', f);
const P2 = a(.372), P3 = a(.735);
const rueda = a(.01), estudio = a(.072), inglaterra = a(.189), peliculas = a(.305), hecho = a(.35);
const algo = a(.425), suena = a(.447), distinto = a(.487), primero = a(.586), musica = a(.686);
const john = a(.756), yaNo = a(.821), hans = a(.920), zimmer = a(.951);

// ── piezas del plató ──
// el foco de pie con viseras (mira a dir): trípode, mástil, la cabeza y el cable; on: encendido
const foco = (x, suelo, dir, on, t) => {
  const g = hex('#2a2a34'), gl = hex('#5a5a6a'), hy = suelo - 54;
  for (const dx of [-9, 0, 9]) { R.linea(x, suelo - 22, x + dx, suelo, K); R.linea(x + 1, suelo - 22, x + dx + 1, suelo, g); }
  R.rect(x - 1, hy + 8, x + 1, suelo - 20, K); R.rect(x, hy + 8, x, suelo - 20, gl); R.rect(x - 3, suelo - 24, x + 3, suelo - 21, K);
  R.rect(x - 7, hy - 4, x + 7, hy + 7, K); R.rect(x - 6, hy - 3, x + 6, hy + 6, g); R.rect(x - 6, hy - 3, x + 6, hy - 3, gl);
  for (let k = -5; k <= 5; k += 2) R.pset(x + k, hy + 1, hex('#1a1a22'));
  const lx = dir > 0 ? x + 7 : x - 9; R.rect(lx, hy - 3, lx + 2, hy + 6, K); R.rect(lx + (dir > 0 ? 0 : 1), hy - 2, lx + (dir > 0 ? 1 : 2), hy + 5, on ? hex('#fff4c8') : hex('#3a3a46'));
  R.linea(lx + (dir > 0 ? 2 : 0), hy - 4, lx + (dir > 0 ? 6 : -4), hy - 8, K); R.linea(lx + (dir > 0 ? 2 : 0), hy + 7, lx + (dir > 0 ? 6 : -4), hy + 11, K);
  R.rect(x - 2, hy - 7, x + 2, hy - 5, K); R.linea(x, suelo - 20, x + 4 * -dir, suelo, hex('#1a1a20'));
  if (on && Math.sin(t * 31) > 0.9) R.pset(lx + 1, hy, C.blanco);
};
// la cámara de cine en su cabeza de trípode, mirando a la izquierda: dos bobinas que giran y el piloto rojo
const camaraCine = (x, suelo, t, gira) => {
  const g = hex('#22222c'), gl = hex('#4a4a58'), y0 = suelo - 34;
  for (const dx of [-10, 1, 11]) { R.linea(x + 6, y0 + 16, x + 6 + dx, suelo, K); R.linea(x + 7, y0 + 16, x + 7 + dx, suelo, hex('#6a5034')); }
  R.rect(x + 2, y0 + 13, x + 12, y0 + 16, K); R.rect(x + 3, y0 + 14, x + 11, y0 + 15, gl);
  R.rect(x - 6, y0, x + 18, y0 + 13, K); R.rect(x - 5, y0 + 1, x + 17, y0 + 12, g); R.rect(x - 5, y0 + 1, x + 17, y0 + 1, gl); R.rect(x + 2, y0 + 5, x + 12, y0 + 9, hex('#30303c'));
  R.rect(x - 16, y0 + 3, x - 6, y0 + 10, K); R.rect(x - 15, y0 + 4, x - 7, y0 + 9, hex('#3a3a46')); R.rect(x - 19, y0 + 2, x - 15, y0 + 11, K); R.rect(x - 18, y0 + 3, x - 16, y0 + 10, hex('#5a6a8a')); R.pset(x - 17, y0 + 4, hex('#c8d8f0'));
  for (const [bx, by] of [[x - 1, y0 - 7], [x + 13, y0 - 7]]) { R.disco(bx, by, 7, K); R.disco(bx, by, 6, hex('#30303a')); R.disco(bx, by, 2, gl);
    for (let k = 0; k < 3; k++) { const an = t * gira * 5 + k * 2.09; R.linea(bx, by, Math.round(bx + Math.cos(an) * 5), Math.round(by + Math.sin(an) * 5), hex('#6a6a7a')); } }
  R.rect(x + 18, y0 + 4, x + 22, y0 + 6, K); R.rect(x + 20, y0 + 6, x + 22, y0 + 12, K);   // el asa de atrás
  if (gira && parp(t, 6)) { R.rect(x + 14, y0 + 3, x + 16, y0 + 4, hex('#ff3040')); }
};
// la vía del travelín por el primer término
const via = (x0, x1, y) => { R.rect(x0, y, x1, y + 1, hex('#8a8a96')); R.rect(x0, y + 4, x1, y + 5, hex('#8a8a96')); R.rect(x0, y + 2, x1, y + 2, hex('#2a2a32')); R.rect(x0, y + 6, x1, y + 6, hex('#2a2a32'));
  for (let x = x0 + 3; x < x1; x += 9) { R.rect(x, y - 1, x + 3, y + 7, hex('#5a3e26')); R.rect(x, y - 1, x + 3, y - 1, hex('#7a5a3a')); } };
// un plato dorado sobre la mesa
const plato = (x, y) => { R.rect(x - 4, y, x + 4, y + 1, hex('#8a5a14')); R.rect(x - 3, y - 1, x + 3, y, hex('#f0c040')); R.pset(x - 2, y - 1, hex('#fff0a0')); };

const p1 = (t) => {
  const o = { encuadre: 'comedor', camara: 'mesa' };
  T.hogwarts(R, t, o);
  // el haz del foco de la izquierda, que se enciende a «England», sobre la mesa
  const enc = t > inglaterra;
  foco(300, 146, -1, enc, t);
  // detrás de la mesa: la montadora pone platos (uno en cada sitio) y el carpintero clava el respaldo
  const pasos = [1.0, 2.2, 3.4], px = [70, 92, 114];
  let k = 0; while (k < 3 && t > pasos[k] + 0.6) k++;
  const mx = Math.round(lerp(k > 0 ? px[k - 1] - 12 : 40, px[Math.min(k, 2)] - 12, lin(t, (pasos[k] ?? 9) - 0.5, (pasos[k] ?? 9))));
  const anda = k < 3 && t > (pasos[k] ?? 9) - 0.5 && t < (pasos[k] ?? 9);
  const m = R.actor(EL.operario ?? EL.alumna, mx, 146, t, { dir: 1, anda, sostiene: k < 3 ? [mx + 20, 132] : undefined, habla: t > 3.9 && t < 4.6 && parp(t, 8) });
  if (k < 3 && !anda) plato(m.mano[0] + 2, m.mano[1] - 1);
  const golpe = Math.sin(t * 9) > 0.2 && t < hecho;
  const c = R.actor(EL.obrero, 182, 146, t, { dir: 1, sostiene: [200, golpe ? 134 : 124], sorpresa: t > hecho && t < hecho + 0.6 });
  { const [hx, hy] = c.mano; R.linea(hx, hy, hx + 2, hy - 6, hex('#7a5a3a')); R.rect(hx - 1, hy - 8, hx + 5, hy - 6, K); R.rect(hx, hy - 7, hx + 4, hy - 7, hex('#9a9aa8')); }
  T.hogwartsDelante(R, t, o);
  for (let j = 0; j < 3; j++) if (t > pasos[j] + 0.4) plato(px[j], 135);
  if (enc) haz(290, 90, 110, 130, 190, 179, hex('#fff0c0'), 0.3);
  // delante: la vía, la cámara que rueda desde «filmed» y el director que señala el decorado
  via(176, 319, 172);
  camaraCine(244, 172, t, t > rueda ? 1 : 0);
  R.actor(EL.director, 276, 176, t, { dir: -1, dedo: (t > estudio && t < estudio + 1.3) || (t > peliculas && t < peliculas + 0.6), habla: t > estudio && t < inglaterra + 0.6 && parp(t, 7), sonrisa: t > hecho });
  // el técnico trae el sombrero y lo deja en el taburete a «made»
  const u = suave(lin(t, 0.4, 3.6)), tx = Math.round(lerp(-18, 132, u));
  const deja = lin(t, hecho - 0.35, hecho);
  const tc = R.actor(EL.tecnico, tx, 176, t, { dir: 1, anda: u > 0 && u < 1, sostiene: deja < 1 ? [tx + 22, 148] : undefined, sonrisa: t > hecho + 0.1 });
  if (deja < 1) { const [hx, hy] = tc.mano; PZ.sombrero(R, Math.round(lerp(hx + 4, 160, deja)), Math.round(lerp(hy + 4, 165, deja)), { t }); }
  else PZ.sombrero(R, 160, 165, { t, canta: t > hecho + 0.3 && t < hecho + 0.7 });
};

const p2 = (t) => {
  const abre = suave(lin(t, algo, algo + 0.9));
  T.exterior(R, t, { encuadre: 'castillo', camara: 'cerca', puertas: abre });
  // la luz y las notas que salen por la puerta desde «sounds different»
  for (let i = 0; i < 12; i++) {
    const ti = suena + i * 0.28, s = (t - ti) / 2.4; if (s <= 0 || s >= 1) continue;
    const lado = i % 2 ? 1 : -1, x = 160 + lado * (8 + s * (46 + (i % 3) * 18)) + Math.sin(t * 3 + i) * 3, y = 118 - s * (52 + (i % 4) * 10);
    nota(x, y, i % 3 === 0 ? hex('#fff0b0') : hex('#f0c040'), i);
  }
  // el técnico de sonido con la pértiga: la acerca a la puerta y se sorprende
  const sube = suave(lin(t, P2 + 0.2, suena));
  const tec = R.actor(EL.tecnico, 82, 176, t, { dir: 1, sostiene: [104, 150], sorpresa: t > distinto && t < distinto + 1.2, sonrisa: t > musica });
  { const [hx, hy] = tec.mano, ex = Math.round(lerp(122, 140, sube)), ey = Math.round(lerp(150, 112, sube));
    const bx = Math.round(hx - (ex - hx) * 0.35), by = Math.round(hy - (ey - hy) * 0.35);
    R.linea(bx, by + 1, ex, ey + 1, K); R.linea(bx, by, ex, ey, hex('#8a8a96')); R.linea(bx, by - 1, ex, ey - 1, K);
    R.rect(ex - 2, ey - 3, ex + 8, ey + 3, K); R.rect(ex - 1, ey - 2, ex + 7, ey + 2, hex('#8a8478'));
    for (let k = 0; k < 6; k++) R.pset(ex + k + 1, ey + ((k + Math.floor(t * 6)) % 3) - 1, hex('#b8b0a0')); }
  // la anotadora con su libreta: se sorprende con la snitch y la señala a «music»
  R.actor(EL.guionista, 222, 176, t, { dir: -1, sorpresa: t > primero && t < musica, dedo: t > musica, habla: t > musica + 0.2 && parp(t, 8) });
  // la snitch sale por la puerta en «first second» y revolotea sobre la anotadora
  const v = lin(t, primero - 0.2, primero + 1.1);
  if (v > 0) { const sx = lerp(160, 236, suave(v)), sy = lerp(112, 120, v) - Math.sin(v * Math.PI) * 30;
    T.snitch(R, Math.round(sx), Math.round(sy), t, { vuela: v >= 1 ? 0.6 : 0, cara: v < 0.7 ? 'susto' : 'feliz' }); }
};

const p3 = (t) => {
  T.hogwarts(R, t, { encuadre: 'sala' });
  // las notas del piano que suben (y la ráfaga de «Zimmer»)
  for (let i = 0; i < 14; i++) {
    const ti = P3 - 1 + i * 0.36, s = (t - ti) / 2.6; if (s <= 0 || s >= 1) continue;
    nota(152 + s * (30 + (i % 3) * 22) + Math.sin(t * 2.5 + i) * 4, 112 - s * 70 + (i % 2) * 6, i % 3 ? hex('#f0c040') : hex('#fff0b0'), i);
  }
  for (let i = 0; i < 10; i++) { const s = (t - zimmer) / 1.6 - i * 0.05; if (s <= 0 || s >= 1) continue;
    const an = -Math.PI * (0.15 + i * 0.075); nota(92 + Math.cos(an) * s * 90, 148 + Math.sin(an) * s * 80, i % 2 ? hex('#ffd36a') : hex('#fff8dc'), i); }
  // el piano de cola de perfil: patas, lira, cuerpo lacado, la tapa levantada y el atril
  const negro = hex('#16141e'), lac = hex('#2c2838'), brillo = hex('#5a5470');
  for (const lx of [134, 194]) { R.rect(lx - 1, 144, lx + 2, 168, K); R.rect(lx, 145, lx + 1, 166, lac); R.rect(lx - 2, 167, lx + 3, 169, hex('#c8a040')); }
  R.rect(156, 146, 162, 162, K); R.rect(157, 147, 161, 161, lac); R.rect(155, 162, 163, 164, hex('#c8a040'));
  R.poligono([[128, 134], [206, 134], [212, 138], [206, 146], [128, 146]], K); R.poligono([[129, 135], [205, 135], [210, 138], [205, 145], [129, 145]], lac);
  R.rect(129, 135, 205, 135, brillo); R.rect(132, 140, 200, 140, negro);
  R.poligono([[134, 133], [204, 133], [178, 100]], K); R.poligono([[137, 132], [201, 132], [178, 103]], hex('#24202e')); R.linea(140, 131, 177, 105, brillo);
  R.linea(186, 133, 184, 112, hex('#c8a040'));
  R.rect(122, 136, 131, 140, K); for (let k = 0; k < 8; k++) R.pset(123 + k, 137, k % 3 === 2 ? K : hex('#f4f0e4')); R.rect(123, 138, 130, 139, hex('#f4f0e4'));
  // el atril y su partitura (la vieja sale volando a «anymore»)
  R.linea(134, 134, 138, 118, K); R.rect(130, 116, 146, 128, K); R.rect(131, 117, 145, 127, hex('#3a2a1c'));
  const vuela = lin(t, yaNo - 0.1, yaNo + 1.2);
  const hoja = (x, y, an, col) => { const c = Math.cos(an), s = Math.sin(an); const pts = [[-6, -5], [6, -5], [6, 5], [-6, 5]].map(([i, j]) => [Math.round(x + i * c - j * s), Math.round(y + i * s + j * c)]); R.poligono(pts, K); R.poligono(pts.map(([px, py]) => [px + (px < x ? 1 : -1), py + (py < y ? 1 : -1)]), col);
    for (let j = -2; j <= 3; j += 2) R.pset(Math.round(x + j * s * -1), Math.round(y + j * c), hex('#6a5a3a')); };
  if (vuela <= 0) hoja(138, 122, 0, hex('#e8d8a8'));
  else { hoja(138, 122, 0, hex('#f8f4ea')); if (vuela < 1) hoja(lerp(138, 186, vuela), 122 - Math.sin(vuela * Math.PI) * 26 + vuela * 46, vuela * 7, hex('#e8d8a8')); else hoja(188, 168, 0.4, hex('#e8d8a8')); }
  if (vuela > 0) for (let k = 0; k < 4; k++) R.pset(134 + k * 3, 120 + (k % 2) * 3, hex('#3a3a6a'));
  // el compositor toca de pie; a «Hans» coge la batuta y dirige
  const dirige = t > hans;
  R.actor(EL.compositor, 104, 168, t, { dir: 1, sinObjeto: !dirige, sostiene: dirige ? undefined : [126 + (Math.sin(t * 13) > 0 ? 2 : -1), 138 + (Math.sin(t * 17) > 0 ? 1 : 0)], dedo: dirige, sonrisa: t > yaNo, habla: false });
  // el chico del timbal: espera, y golpea a «Zimmer»
  const golpe = t > zimmer - 0.08 && t < zimmer + 0.25;
  const dr = R.actor(EL.alumno, 56, 172, t, { dir: 1, sostiene: [80, golpe ? 152 : 140], sorpresa: t > zimmer + 0.3 && t < zimmer + 1, sonrisa: t > zimmer + 1 });
  { const [hx, hy] = dr.mano; R.linea(hx, hy, hx + 5, hy + 3, hex('#e8d8b8')); R.disco(hx + 6, hy + 4, 1, hex('#f4f0e4')); }
  R.poligono([[72, 154], [96, 154], [92, 166], [76, 166]], K); R.poligono([[73, 155], [95, 155], [91, 165], [77, 165]], hex('#c8783a')); R.linea(76, 157, 90, 157, hex('#f0a868'));
  R.rect(72, 152, 96, 154, K); R.rect(73, 152, 95, 153, hex('#f0ead8')); for (const lx of [77, 91]) R.linea(lx, 166, lx + (lx < 84 ? -3 : 3), 172, K);
  if (golpe || (t > zimmer && t < zimmer + 0.6)) { const r = 4 + (t - zimmer) * 30; for (let k = 0; k < 10; k++) { const an = -Math.PI * k / 9; R.pset(Math.round(84 + Math.cos(an) * r), Math.round(152 + Math.sin(an) * r * 0.6), hex('#fff0b0')); } }
  // la violinista
  const vi = R.actor(EL.alumna, 222, 170, t, { dir: -1, sostiene: [214, 152], sonrisa: true });
  { const [hx, hy] = vi.mano; R.rect(hx - 6, hy - 3, hx, hy + 1, K); R.rect(hx - 5, hy - 2, hx - 1, hy, hex('#a8521e')); const b = Math.sin(t * 8) * 4; R.linea(Math.round(hx - 10 + b), hy - 6, Math.round(hx + 2 + b), hy - 2, hex('#e8d8b8')); }
  // la snitch entra por el ventanal y se posa en el atril a «anymore»
  const llega = lin(t, P3 + 0.15, yaNo + 0.4);
  const sx = Math.round(lerp(196, 138, suave(llega))), sy = Math.round(lerp(60, 115, suave(llega)) - Math.sin(llega * Math.PI) * 12) - (t > zimmer && t < zimmer + 0.5 ? 6 : 0);
  T.snitch(R, sx, sy, t, { vuela: llega < 1 ? 0.5 : 0, cara: t > zimmer && t < zimmer + 0.6 ? 'susto' : llega >= 1 ? 'feliz' : 'normal' });
  T.hogwartsDelante(R, t, { encuadre: 'sala' });
};

const efectos = [[inglaterra, 'interruptor'], [1.7, 'golpecito'], [hecho, 'toc'], [algo + 0.05, 'puerta'], [primero, 'brillo'], [yaNo, 'papel'], [yaNo + 0.5, 'brillo'], [zimmer, 'boom']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['hp-trailer'] = ('Tráiler', '''// HP-TRAILER (frase 7), 2026. Tres planos:
// 1. el salón, cámara del sofá: la fan enciende la tele con el mando a «first teaser»; en la pantalla, el expreso rojo cruza
//    la nieve echando vapor; la niña entra con su taza a «March» y a «watched» el contador de reproducciones sube hasta
//    277000000 a «million»; a «277» todos se sorprenden y saltan las palomitas; corta en «million»;
// 2. el callejón Diagon: a «times» se desenrolla sobre la calle un estandarte con 277000000; los magos llegan, se paran y
//    miran arriba; a «most-watched» y a «history» estallan fuegos dorados y la gente aplaude; a «second one arrived» llega
//    una lechuza con un rollo y una bruja lo coge; corta antes de «Hermione»;
// 3. el espejo de cerca: Harry entra y se mira; el cristal enseña el segundo tráiler: Hermione en la ventanilla del expreso,
//    el sombrero seleccionador que canta a «Sorting Hat», el ajedrez gigante (un caballo derriba un peón) a «chess» y, a
//    «Mirror of Erised», su propio reflejo con sus padres detrás, que le ponen la mano en el hombro: Harry sonríe.''', H + r'''
const a = (f) => en('trailer', f);
const P2 = a(.329), P3 = a(.680);
const primer = a(.006), marzo = a(.074), hbo = a(.140), visto = a(.205), cifra = a(.252), millon = a(.329);
const veces = a(.348), mas = a(.447), historia = a(.529), segundo = a(.581), llega = a(.605);
const hermione = a(.683), expreso = a(.733), sombrero = a(.803), ajedrez = a(.856), espejo = a(.931);

// lo que sale en la tele: el expreso rojo cruzando la nieve de noche
const teaser = (t, cl, u) => {
  const [x0, y0, x1, y1] = cl;
  for (let y = y0; y <= y1; y++) { const v = (y - y0) / (y1 - y0); for (let x = x0; x <= x1; x += 1) R.pset(x, y, v < 0.55 ? mez(hex('#0c1030'), hex('#2a3270'), v / 0.55 + (b4(x, y) - 0.5) * 0.2) : mez(hex('#c8d4ea'), hex('#8a9ac0'), (v - 0.55) * 1.6 + (b4(x, y) - 0.5) * 0.2)); }
  for (let k = 0; k < 14; k++) { const sx = x0 + Math.round(hs(k, 1) * (x1 - x0)), sy = y0 + Math.round(hs(k, 2) * 18); if (Math.sin(t * 3 + k) > -0.3) R.pset(sx, sy, hex('#e8f0ff')); }
  R.disco(x0 + 16, y0 + 9, 4, hex('#f4f0d8')); R.disco(x0 + 18, y0 + 8, 3, hex('#d8d4b8'));
  // las colinas y los pinos
  for (let x = x0; x <= x1; x++) { const hy = Math.round(y0 + 25 + Math.sin(x * 0.09) * 3 + Math.sin(x * 0.23) * 2); R.linea(x, hy, x, y0 + 26 + 4, hex('#3a4a7a')); R.pset(x, hy, hex('#e8eef8')); }
  for (let k = 0; k < 6; k++) { const px = x0 + 6 + k * 15, py = y0 + 30; R.poligono([[px, py - 9], [px - 4, py], [px + 4, py]], hex('#1a2a3a')); R.pset(px, py - 9, hex('#e8eef8')); }
  // el tren: locomotora roja y dos vagones con las ventanillas encendidas
  const tx = Math.round(lerp(x1 + 10, x0 - 120, u)), ty = y0 + 33;
  rr(tx - 4, ty + 7, tx + 112, ty + 7, hex('#2a2a32'));
  rr(tx, ty - 6, tx + 22, ty + 5, K); rr(tx + 1, ty - 5, tx + 21, ty + 4, hex('#c8202a')); rr(tx + 1, ty - 5, tx + 21, ty - 5, hex('#f05a5a')); rr(tx + 4, ty - 12, tx + 8, ty - 6, K); rr(tx + 5, ty - 11, tx + 7, ty - 6, hex('#3a3a3a'));
  rr(tx + 14, ty - 10, tx + 21, ty - 5, K); rr(tx + 15, ty - 9, tx + 20, ty - 5, hex('#a81a22')); R.pset(tx + 1, ty - 1, hex('#fff4a0')); R.pset(tx, ty - 1, hex('#fff4a0'));
  for (let w = 0; w < 2; w++) { const wx = tx + 25 + w * 44; rr(wx, ty - 7, wx + 40, ty + 5, K); rr(wx + 1, ty - 6, wx + 39, ty + 4, hex('#b81c26')); for (let k = 0; k < 5; k++) rr(wx + 3 + k * 7, ty - 4, wx + 7 + k * 7, ty - 1, hex('#ffd870')); }
  for (let k = 0; k < 9; k++) { const wx = tx + 4 + k * 12; R.disco(wx, ty + 6, 2, K); R.pset(wx, ty + 6, hex('#8a8a96')); }
  for (let k = 0; k < 5; k++) { const s = ((t * 0.9 + k * 0.2) % 1), vx = tx + 6 + s * 30, vy = ty - 14 - s * 10; R.disco(Math.round(vx), Math.round(vy), Math.round(2 + s * 3), mez(hex('#f0f0f4'), hex('#8a94b8'), s)); }
};
// el contador de reproducciones (franja oscura con el triángulo de «play»)
const contador = (t, cl, n) => {
  const [x0, , x1, y1] = cl; rr(x0, y1 - 12, x1, y1, hex('#0a0a14'));
  R.poligono([[x0 + 4, y1 - 9], [x0 + 4, y1 - 3], [x0 + 9, y1 - 6]], hex('#ff4040'));
  T.a_cifras(R, String(n), Math.round((x0 + x1) / 2 + 6), y1 - 2);
};

const p1 = (t) => {
  const tele = t > primer + 0.15, n = Math.floor(277e6 * suave(lin(t, visto, millon - 0.1)));
  const o = { encuadre: 'salon', camara: 'sofa', pantalla: (R2, tt, cl) => { if (!tele) { rr(cl[0], cl[1], cl[2], cl[3], hex('#0a0c14')); R.linea(cl[0] + 8, cl[1] + 6, cl[0] + 20, cl[1] + 30, hex('#1a1e2a')); return; }
    teaser(tt, cl, lin(tt, primer + 0.2, millon + 1.2)); if (tt > visto - 0.2) contador(tt, cl, n); } };
  T.hoy(R, t, o);
  // la fan en el sofá con el mando; el amigo con las palomitas
  const sorpresa = t > cifra && t < cifra + 1.0;
  const f = R.actor(EL.adolescente, 105, 118, t, { dir: 1, sostiene: t < hbo + 0.8 ? [128, 98] : undefined, dedo: t > hbo && t < visto, sorpresa, sonrisa: t > cifra + 1.0 });
  if (t < hbo + 0.8) { const [hx, hy] = f.mano; R.rect(hx, hy - 2, hx + 5, hy, K); R.rect(hx + 1, hy - 1, hx + 4, hy - 1, hex('#3a3a46')); if (t > primer - 0.1 && t < primer + 0.25) { R.pset(hx + 6, hy - 2, hex('#ff3040')); for (let k = 1; k < 9; k++) R.pset(hx + 6 + k * 8, hy - 3 - k, hex('#ff8080')); } }
  R.actor(EL.chico, 153, 118, t, { dir: 1, sorpresa, habla: t > marzo && t < hbo + 0.6 && parp(t, 8), sonrisa: t > cifra + 1.0, brazos: t > millon - 0.5 && t < millon });
  // la niña entra con su taza a «March» y se queda junto al sofá
  const u = suave(lin(t, marzo - 0.3, hbo + 0.6)), nx = Math.round(lerp(-16, 40, u));
  const ni = R.actor(EL.nina, nx, 148, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true, sorpresa, salto: sorpresa ? Math.round(Math.abs(Math.sin((t - cifra) * 9)) * 3) : 0 });
  { const [hx, hy] = ni.mano; R.rect(hx - 1, hy - 4, hx + 3, hy, K); R.rect(hx, hy - 3, hx + 2, hy - 1, hex('#e8e0d0')); R.pset(hx + 4, hy - 2, K); if (parp(t, 3)) R.pset(hx + 1, hy - 6, hex('#d8d8e0')); }
  T.hoyDelante(R, t, o);
  // las palomitas saltan del cuenco a «277»
  for (let k = 0; k < 7; k++) { const s = lin(t, cifra + 0.05 + k * 0.04, cifra + 0.7 + k * 0.04); if (s <= 0 || s >= 1) continue;
    const x = 80 + (k - 3) * 3 * s * 3, y = 150 - Math.sin(s * Math.PI) * (16 + k * 2); R.rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y) + 1, hex('#fff4d0')); R.pset(Math.round(x), Math.round(y) + 1, hex('#e8c060')); }
};

const p2 = (t) => {
  T.diagon(R, t, { encuadre: 'calle' });
  // el estandarte con la cifra, que se desenrolla a «times»
  const des = suave(lin(t, veces - 0.1, veces + 0.6));
  R.linea(92, 30, 228, 30, hex('#3a2a1a')); R.linea(92, 31, 228, 31, hex('#6a4a2a'));
  if (des > 0) {
    const yb = Math.round(34 + des * 22);
    R.rect(110, 31, 210, yb, K); R.rect(111, 32, 209, yb - 1, hex('#4a1a5a')); R.rect(111, 32, 209, 33, hex('#6a2a7a')); R.rect(113, 34, 207, 34, hex('#e8b830')); if (des > 0.9) R.rect(113, yb - 3, 207, yb - 3, hex('#e8b830'));
    for (let x = 112; x < 209; x += 6) R.pset(x, yb + 1, hex('#e8b830'));
    R.rect(108, 29, 212, 32, K); R.rect(109, 30, 211, 31, hex('#8a5a2a'));
    if (des > 0.95) { R.poligono([[118, 41], [118, 49], [124, 45]], hex('#ff4a4a')); T.a_cifras(R, '277000000', 168, 50); }
  }
  // los fuegos dorados a «most-watched» y a «history»
  for (const [t0, cx, cy] of [[mas, 84, 46], [historia, 236, 44], [historia + 0.5, 140, 26]]) {
    const s = (t - t0) / 1.1; if (s <= 0 || s >= 1) continue;
    for (let k = 0; k < 14; k++) { const an = k * Math.PI / 7, r = s * 20; const x = Math.round(cx + Math.cos(an) * r), y = Math.round(cy + Math.sin(an) * r + s * s * 8);
      R.pset(x, y, s < 0.6 ? hex('#fff4b0') : hex('#f0a030')); if (s < 0.5) R.pset(Math.round(cx + Math.cos(an) * r * 0.7), Math.round(cy + Math.sin(an) * r * 0.7), hex('#ffd36a')); }
  }
  // los magos llegan, se paran, miran arriba y aplauden
  const gente = [[EL.alumno, -16, 62, 1, 0.0], [EL.costurera, 330, 238, -1, 0.3], [EL.alumna, -16, 96, 1, 0.6], [EL.escribano, 330, 200, -1, 0.9], [EL.neville, -16, 128, 1, 1.2]];
  gente.forEach(([def, x0, x1, d, dt], k) => {
    const u = suave(lin(t, P2 + dt, P2 + dt + 1.8)), x = Math.round(lerp(x0, x1, u));
    R.actor(def, x, 160 + (k % 2) * 6, t, { dir: d, anda: u > 0 && u < 1, sorpresa: t > veces + 0.3 && t < mas, brazos: (t > historia && t < historia + 0.9 && (k % 2 === 0)) || (t > mas && t < mas + 0.5 && k === 3), sonrisa: t > mas, dedo: k === 1 && t > veces + 0.5 && t < mas });
  });
  // la lechuza llega con un rollo nuevo a «arrived» y la bruja lo coge
  const l = lin(t, segundo - 0.4, llega + 0.4);
  const coge = t > llega + 0.4;
  const bruja = R.actor(EL.mcgonagall ?? EL.alumna, 166, 170, t, { dir: -1, brazos: l > 0.6 && !coge, sostiene: coge ? true : undefined, sonrisa: coge });
  if (l > 0 && l < 1) { const lx = lerp(340, 178, l), ly = lerp(60, 132, l) - Math.sin(l * Math.PI) * 14; PZ.carta(R, Math.round(lx), Math.round(ly + 7)); PZ.lechuza(R, Math.round(lx), Math.round(ly), { vuela: true, t }); }
  if (l >= 1) { const ox = Math.round(lerp(178, 360, lin(t, llega + 0.5, llega + 1.6))), oy = Math.round(lerp(132, 70, lin(t, llega + 0.5, llega + 1.6))); if (ox < 340) PZ.lechuza(R, ox, oy, { vuela: true, t }); }
  if (coge) { const [hx, hy] = bruja.mano; PZ.carta(R, hx, hy + 3); }
  T.diagonDelante(R, t, { encuadre: 'calle' });
};

// lo que enseña el espejo: el segundo tráiler y, al final, el deseo de Harry
const reflejo = (R2, t, cl) => {
  const [x0, y0, x1, y1] = cl, cx = (x0 + x1) >> 1;
  const fase = t < sombrero - 0.1 ? 0 : t < ajedrez - 0.1 ? 1 : t < espejo - 0.1 ? 2 : 3;
  if (fase === 0) {
    // el expreso en la estación de noche, con Hermione que saluda desde la ventanilla del medio
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(hex('#141836'), hex('#3a3058'), (y - y0) / (y1 - y0) + (b4(x, y) - 0.5) * 0.15));
    for (let k = 0; k < 3; k++) { const ax = x0 + 20 + k * 44; for (let i = -22; i <= 22; i++) { const yy = Math.round(y0 + 30 - Math.sqrt(Math.max(0, 484 - i * i)) * 0.9); R.pset(ax + i, yy, hex('#5a5a7a')); R.pset(ax + i, yy + 1, hex('#2a2a40')); } R.linea(ax - 22, y0 + 30, ax - 22, y0 + 46, hex('#4a4a68')); }
    for (const lx of [x0 + 30, x0 + 90]) { R.linea(lx, y0, lx, y0 + 12, hex('#2a2a3a')); R.disco(lx, y0 + 15, 3, hex('#ffe8a0')); for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) if (i * i + j * j < 81 && b4(lx + i, y0 + 15 + j) < 0.35) tine(lx + i, y0 + 15 + j, hex('#ffe8a0'), 0.35); }
    const u = suave(lin(t, hermione - 0.2, expreso + 0.1)), tx = Math.round(lerp(x0 + 70, x0 - 14, u)), ty = y0 + 42;
    rr(tx, ty - 4, tx + 150, ty + 2, K); rr(tx + 1, ty - 3, tx + 149, ty + 1, hex('#3a2a2a'));
    rr(tx, ty, tx + 150, ty + 46, K); rr(tx + 1, ty + 1, tx + 149, ty + 45, hex('#a81a24')); rr(tx + 1, ty + 1, tx + 149, ty + 2, hex('#d84a4a')); rr(tx + 1, ty + 34, tx + 149, ty + 35, hex('#e8b830')); rr(tx + 1, ty + 40, tx + 149, ty + 40, hex('#e8b830'));
    for (let k = 0; k < 4; k++) { const wx = tx + 8 + k * 36; rr(wx - 1, ty + 7, wx + 25, ty + 29, K); rr(wx, ty + 8, wx + 24, ty + 28, hex('#f4d890')); rr(wx, ty + 8, wx + 4, ty + 28, hex('#2a6a3a')); rr(wx + 20, ty + 8, wx + 24, ty + 28, hex('#2a6a3a')); rr(wx, ty + 8, wx + 24, ty + 9, hex('#7a1a1a')); }
    const hx = tx + 8 + 36 + 5;
    if (hx > x0 + 1 && hx + 15 < x1 - 1) { R.actor(EL.hermione, hx, ty + 38, t, { dir: 1, sonrisa: true, dedo: t > expreso - 0.2 && Math.sin(t * 9) > -0.4 }); rr(tx + 1, ty + 29, tx + 149, ty + 45, hex('#a81a24')); rr(tx + 1, ty + 34, tx + 149, ty + 35, hex('#e8b830')); rr(tx + 1, ty + 40, tx + 149, ty + 40, hex('#e8b830')); rr(hx - 5, ty + 29, hx + 19, ty + 29, K); }
    for (let k = 0; k < 6; k++) { const wx = tx + 6 + k * 26; R.disco(wx, ty + 46, 3, K); R.pset(wx, ty + 46, hex('#8a8a96')); }
    rr(x0, y1 - 9, x1, y1, hex('#5a5260')); rr(x0, y1 - 9, x1, y1 - 8, hex('#e8b830')); for (let x = x0; x <= x1; x += 9) R.pset(x, y1 - 4, hex('#3a3440'));
    for (let k = 0; k < 6; k++) { const s2 = ((t * 0.5 + k / 6) % 1), vx = Math.round(x1 - 8 - s2 * 60), vy = Math.round(y0 + 38 - s2 * 30), rad = Math.round(4 + s2 * 7);
      for (let j = -rad; j <= rad; j++) for (let i = -rad; i <= rad; i++) if (i * i + j * j <= rad * rad && b4(vx + i, vy + j) < 0.6 - s2 * 0.4) tine(vx + i, vy + j, hex('#f0f0f8'), 0.7); }
  } else if (fase === 1) {
    // el sombrero seleccionador que canta en el taburete, con las velas
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(hex('#2a1a3a'), hex('#0e0a1a'), (y - y0) / (y1 - y0) + (b4(x, y) - 0.5) * 0.2));
    for (let k = 0; k < 9; k++) { const vx = x0 + 8 + k * 13, vy = y0 + 10 + (k % 3) * 9 + Math.round(Math.sin(t * 2 + k) * 2); rr(vx, vy, vx + 1, vy + 5, hex('#f4ecd8')); R.pset(vx, vy - 1, parp(t + k, 11) ? hex('#ffd36a') : hex('#fff4b0')); }
    rr(cx - 14, y1 - 30, cx + 14, y1 - 26, K); rr(cx - 13, y1 - 29, cx + 13, y1 - 27, hex('#7a4a2a')); for (const lx of [cx - 11, cx + 10]) rr(lx, y1 - 26, lx + 1, y1, hex('#4a2a18'));
    PZ.sombrero(R, cx, y1 - 30, { t, canta: true, s: 3 });
    for (let k = 0; k < 3; k++) { const s = ((t - sombrero) * 0.8 + k * 0.33) % 1; nota(cx + 30 + s * 16, y1 - 70 - s * 30, hex('#f0c040'), k); }
  } else if (fase === 2) {
    // el ajedrez gigante: el caballo blanco derriba al peón negro
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(hex('#1a1a2a'), hex('#3a3046'), (y - y0) / (y1 - y0) + (b4(x, y) - 0.5) * 0.2));
    const hz = y0 + 52;
    for (let j = 0; j < 5; j++) for (let i = -6; i < 6; i++) { const ya = hz + j * j * 2.2 + j * 6, yb = hz + (j + 1) * (j + 1) * 2.2 + (j + 1) * 6; const wa = 10 + j * 4, wb = 10 + (j + 1) * 4;
      R.poligono([[cx + i * wa, ya], [cx + (i + 1) * wa, ya], [cx + (i + 1) * wb, yb], [cx + i * wb, yb]], (i + j) & 1 ? hex('#d8d0c0') : hex('#3a3440')); }
    const pieza = (x, y, blanca, tipo, cae = 0) => { const c0 = blanca ? hex('#f0ece0') : hex('#2a2430'), c1 = blanca ? hex('#b8b0a0') : hex('#4a4458');
      const dx = Math.round(cae * 10), dy = Math.round(cae * cae * 6);
      rr(x - 9 + dx, y - 5 + dy, x + 9 + dx, y, K); rr(x - 8 + dx, y - 4 + dy, x + 8 + dx, y - 1, c1);
      rr(x - 5 + dx, y - 24 + dy, x + 5 + dx, y - 5, K); rr(x - 4 + dx, y - 23 + dy, x + 4 + dx, y - 5, c0);
      if (tipo === 'peon') { R.disco(x + dx, y - 28 + dy, 6, K); R.disco(x + dx, y - 28 + dy, 5, c0); }
      else { R.poligono([[x - 6 + dx, y - 24], [x + 7 + dx, y - 40], [x + 9 + dx, y - 30], [x + 2 + dx, y - 24]], K); R.poligono([[x - 4 + dx, y - 25], [x + 6 + dx, y - 38], [x + 7 + dx, y - 30], [x + 1 + dx, y - 25]], c0); R.pset(x + 5 + dx, y - 34, K); } };
    const sal = suave(lin(t, ajedrez + 0.2, ajedrez + 0.8)), cae = lin(t, ajedrez + 0.75, ajedrez + 1.2);
    pieza(cx + 34, y1 - 22, false, 'peon', cae); pieza(Math.round(lerp(cx - 30, cx + 18, sal)), Math.round(y1 - 10 - Math.sin(sal * Math.PI) * 18), true, 'caballo');
    pieza(cx - 46, y1 - 40, false, 'peon'); pieza(cx + 50, y1 - 46, true, 'peon');
  } else {
    // el espejo de Oesed: Harry se ve con sus padres detrás
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(hex('#2a2238'), hex('#4a3a3a'), (y - y0) / (y1 - y0) + (b4(x, y) - 0.5) * 0.2));
    rr(x0, y1 - 18, x1, y1, hex('#3a2e2a')); for (let x = x0; x <= x1; x += 12) R.linea(x, y1 - 18, x - 6, y1, hex('#2a201c'));
    const g = suave(lin(t, espejo - 0.1, espejo + 0.7)), fy = y1 - 6;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = Math.hypot(x - cx, (y - fy + 20) * 1.3) / 60; if (d < 1 && b4(x, y) < g * (1 - d)) tine(x, y, hex('#ffcf7a'), 0.45); }
    if (g > 0.3) { R.actor(EL.alumno, cx - 26, fy - 8, t, { dir: 1, sonrisa: true, pal: { H: '#1c1820', h: '#3a3448' } }); R.actor(EL.alumna, cx + 12, fy - 8, t, { dir: -1, sonrisa: true, pal: { H: '#b8401a', h: '#e0602a' } }); }
    R.actor(EL.harry, cx - 7, fy, t, { dir: 1, sorpresa: g > 0 && g < 0.8, sonrisa: g >= 0.8 });
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (b4(x, y) < 0.5 * g) tine(x, y, hex('#ffd890'), 0.18);
  }
  // el cambio de imagen: un barrido de luz
  for (const tc of [sombrero - 0.1, ajedrez - 0.1, espejo - 0.1]) { const s = (t - tc) / 0.35; if (s > 0 && s < 1) { const bx = Math.round(lerp(x0 - 20, x1 + 20, s)); for (let y = y0; y <= y1; y++) for (let x = bx - 8; x <= bx + 8; x++) if (x >= x0 && x <= x1) tine(x, y, hex('#fff8e0'), 0.75 - Math.abs(x - bx) * 0.08); } }
};

const p3 = (t) => {
  T.hogwarts(R, t, { encuadre: 'espejo', camara: 'cerca', reflejo });
  // Harry entra con su vela, se para delante del espejo y reacciona a cada cosa
  const u = suave(lin(t, P3 - 0.1, P3 + 1.4)), hx = Math.round(lerp(-18, 66, u));
  R.actor(EL.harry, hx, 176, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: (t > sombrero && t < sombrero + 0.7) || (t > espejo && t < espejo + 0.6), dedo: t > ajedrez + 0.1 && t < ajedrez + 1.1, sonrisa: t > espejo + 0.6 || (t > expreso && t < sombrero) });
};

const efectos = [[primer, 'bip'], [primer + 0.7, 'silbato'], [cifra + 0.08, 'pop'], [veces, 'papel'], [mas + 0.05, 'pop'], [historia + 0.1, 'publico'], [llega + 0.4, 'papel'],
  [hermione + 0.2, 'vapor'], [sombrero - 0.1, 'brillo'], [ajedrez + 0.78, 'toc'], [espejo - 0.1, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['hp-poster'] = ('Póster', '''// HP-POSTER (frase 8), 2026. Dos planos:
// 1. lo alto de la torre de noche (cámara 'almenas'): sobre las almenas, unas gafas redondas gigantes; a «first poster» un
//    barrido de luz las descubre y los dos alumnos del adarve se sorprenden; a «castle» se encienden una a una las ventanas
//    del castillo que reflejan los cristales; a «reflected» llega la snitch, se mira en el cristal derecho (su reflejo le
//    devuelve la sonrisa) y a «glasses» le da un golpecito; la alumna se acerca y señala; corta en «and»;
// 2. el lago (cámara 'lago'): las barcas con farol cruzan en una sola fila a «one line»; a «everyone» salen del castillo
//    lechuzas con cartas hacia todas partes; en el embarcadero tres alumnos las miran y a «name» brilla sobre el castillo
//    un rayo dorado, la cicatriz, y lo celebran.''', H + r'''
const a = (f) => en('poster', f);
const P2 = a(.584);
const poster = a(.138), harry = a(.225), castillo = a(.352), refleja = a(.394), gafas = a(.527);
const linea = a(.648), todos = a(.775), mundo = a(.847), nombre = a(.942);

// las gafas gigantes: dos cristales que reflejan el castillo de noche (con sus ventanas que se encienden) y el lago
const TORRES = [[-0.62, 0.11, -0.12], [-0.36, 0.09, 0.02], [-0.12, 0.14, -0.42], [0.16, 0.1, -0.22], [0.42, 0.12, -0.05], [0.66, 0.08, 0.1]];
const alto = (u) => { let v = Math.abs(u) < 0.8 ? 0.18 : 0.4; for (const [uc, w, top] of TORRES) { if (Math.abs(u - uc) <= w) v = Math.min(v, top); const cw = w * 1.15, du = Math.abs(u - uc); if (du <= cw) v = Math.min(v, top - 0.24 * (1 - du / cw)); } return v; };
const HZ = 0.42;
const lente = (cx, cy, r, t, luces, esp, revela) => {
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) {
    if (i * i + j * j > r * r) continue; const x = cx + i, y = cy + j; if (x > revela) continue;
    const u = (esp ? -i : i) / r, v = j / r; let c;
    if (v <= HZ) { c = mez(hex('#0a0e2c'), hex('#2e3a7a'), (v + 1) / 1.42 + (b4(x, y) - 0.5) * 0.18); if (v > alto(u)) c = (hs(Math.round(u * 40), Math.round(v * 40)) > 0.85) ? hex('#2a2a40') : hex('#1a1a30'); }
    else { const w = Math.sin(v * 40 + t * 3) * 0.03, vr = 2 * HZ - v; c = mez(hex('#16244e'), hex('#0a1230'), (v - HZ) * 1.6 + (b4(x, y) - 0.5) * 0.2); if (vr > alto(u + w) && vr < HZ) c = hex('#121630'); if (Math.abs(Math.sin(v * 50 - t * 2 + u * 6)) > 0.96) c = hex('#4a5a9a'); }
    R.pset(x, y, c);
  }
  if (cx - r > revela) return;
  // la luna y su reflejo, estrellas
  const mu = esp ? -0.45 : 0.45; R.disco(Math.round(cx + mu * r), Math.round(cy - 0.62 * r), 2, hex('#f4f0d8'));
  for (let k = 0; k < 6; k++) { const sx = Math.round(cx + (hs(k, 3) - 0.5) * r * 1.3), sy = Math.round(cy - r * (0.3 + hs(k, 4) * 0.5)); if (Math.hypot(sx - cx, sy - cy) < r - 2 && Math.sin(t * 4 + k * 2) > -0.2) R.pset(sx, sy, hex('#e8f0ff')); }
  // las ventanas: se encienden una a una desde «castle»
  let k = 0;
  for (const [uc, w, top] of TORRES) for (let f = 0; f < 3; f++) {
    const wu = esp ? -uc : uc, wx = Math.round(cx + wu * r), wy = Math.round(cy + (top + 0.08 + f * 0.12) * r); k++;
    if ((top + 0.08 + f * 0.12) > HZ - 0.04) continue;
    const on = t > luces + k * 0.07 && (Math.sin(t * 1.3 + k * 2.1) > -0.9);
    R.pset(wx, wy, on ? hex('#ffd860') : hex('#2a2a44')); R.pset(wx, wy + 1, on ? hex('#e8a830') : hex('#2a2a44'));
    if (on) { const ry = Math.round(cy + (2 * HZ - (top + 0.08 + f * 0.12)) * r); if (Math.hypot(wx - cx, ry - cy) < r - 1) R.pset(wx, ry, hex('#a88a40')); }
  }
  // el brillo del cristal que lo cruza despacio
  const off = ((t * 12) % (2 * r + 60)) - r - 30;
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { if (i * i + j * j > r * r) continue; const d = Math.abs((i + j) * 0.7 - off); if (d < 2.5) tine(cx + i, cy + j, hex('#e8f4ff'), 0.4 - d * 0.1); }
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i + r * 0.45, j + r * 0.45); if (d < r * 0.22 && i * i + j * j < r * r) tine(cx + i, cy + j, hex('#ffffff'), 0.22); }
};
const montura = (cx, cy, r, revela) => {
  for (let j = -r - 4; j <= r + 4; j++) for (let i = -r - 4; i <= r + 4; i++) { const d = Math.hypot(i, j); if (d <= r || d > r + 4) continue; const x = cx + i; if (x > revela) continue;
    const an = Math.atan2(j, i); R.pset(x, cy + j, d > r + 3.2 || d < r + 0.8 ? K : (an < -1.2 && an > -2.8 ? hex('#6a6478') : an > 0.6 && an < 2.4 ? hex('#1a1820') : hex('#2e2a38'))); }
};
const GL = [123, 53], GR = [197, 53], GRAD = 31;
const gafasGigantes = (t, luces, revela, snitchRefl) => {
  const r = GRAD;
  // la sombra que echan en las almenas
  for (let y = 86; y <= 93; y++) for (let x = 86; x <= 234; x++) if (x <= revela && (Math.abs(x - GL[0]) < 32 || Math.abs(x - GR[0]) < 32)) tine(x, y, hex('#000010'), 0.4 - (y - 86) * 0.04);
  lente(GL[0], GL[1], r, t, luces, false, revela); lente(GR[0], GR[1], r, t, luces + 0.3, true, revela);
  if (snitchRefl) snitchRefl();
  montura(GL[0], GL[1], r, revela); montura(GR[0], GR[1], r, revela);
  // el puente y las patillas
  if (revela > 154) for (let k = 0; k <= 12; k++) { const x = 154 + k, y = Math.round(46 - Math.sin(k / 12 * Math.PI) * 5); R.rect(x, y - 2, x, y + 1, K); R.pset(x, y - 1, hex('#5a5468')); R.pset(x, y, hex('#2e2a38')); }
  if (revela > 88) { R.linea(89, 42, 74, 49, K); R.linea(89, 43, 74, 50, hex('#3e3a4a')); R.linea(89, 44, 74, 51, K); }
  if (revela > 232) { R.linea(231, 42, 246, 49, K); R.linea(231, 43, 246, 50, hex('#3e3a4a')); R.linea(231, 44, 246, 51, K); }
  // el filo del barrido que las descubre
  if (revela < 240) for (let y = 16; y < 92; y++) { const x = revela + Math.round(Math.sin(y * 0.5) * 2); if (Math.hypot(x - GL[0], y - GL[1]) < r + 5 || Math.hypot(x - GR[0], y - GR[1]) < r + 5) { R.pset(x, y, hex('#fff4b0')); if (y % 5 === 0) R.pset(x + 2, y - 1, hex('#ffd36a')); } }
};

const p1 = (t) => {
  const o = { encuadre: 'torre', camara: 'almenas' };
  T.exterior(R, t, o);
  const revela = Math.round(lerp(84, 242, suave(lin(t, poster - 0.05, poster + 0.75))));
  // la snitch llega a «reflected», se para junto al cristal derecho, se mira y a «glasses» le da un golpecito
  const v = lin(t, castillo - 0.3, refleja + 0.3), tap = t > gafas && t < gafas + 0.25 ? 4 : 0;
  const sx = Math.round(lerp(330, 252 - tap, suave(v))), sy = Math.round(lerp(40, 82, suave(v)) + (v >= 1 ? Math.sin(t * 3) * 2 : 0));
  const cara = t > gafas && t < gafas + 0.6 ? 'susto' : v >= 1 ? 'feliz' : 'normal';
  gafasGigantes(t, castillo, revela, v >= 0.85 ? () => { const rx = 186, ry = 72 + Math.round(sy - 82);
    PZ.snitch(R, rx, ry, { t: t + 0.05, cara, s: 2 }); for (let j = ry - 20; j <= ry + 2; j++) for (let i = rx - 21; i <= rx + 21; i++) if (Math.hypot(i - GR[0], j - GR[1]) < GRAD) tine(i, j, hex('#3a4a8a'), 0.3); } : null);
  if (v > 0) PZ.snitch(R, sx, sy, { t, cara, s: 2, dir: -1 });
  if (t > gafas && t < gafas + 0.5) { const s2 = (t - gafas) / 0.5; for (let k = 0; k < 6; k++) { const an = k * 1.05; R.pset(Math.round(230 + Math.cos(an) * s2 * 9), Math.round(72 + Math.sin(an) * s2 * 9), hex('#fff8d0')); } }
  // la lechuza de la almena de la derecha se asusta con el barrido y vuelve a posarse
  { const asus = t > poster && t < poster + 0.9; PZ.lechuza(R, 274, asus ? 82 - Math.round(Math.sin((t - poster) / 0.9 * Math.PI) * 8) : 86, { vuela: asus, t }); }
  // los dos alumnos del adarve: se sorprenden con el póster; ella se acerca y señala el castillo de los cristales
  // el alumno mira por el telescopio desde «castle» y luego señala
  const mira = t > castillo - 0.1 && t < refleja + 0.5;
  const al = R.actor(EL.alumno, 82, 168, t, { dir: 1, sorpresa: t > poster + 0.2 && t < castillo - 0.1, sonrisa: t > refleja + 0.5, dedo: t > refleja + 0.5 && t < gafas + 0.6, sostiene: mira ? [104, 150] : undefined });
  { const lat = hex('#c8a040'), lo = hex('#7a5a1a'); for (const dx of [-8, 0, 8]) { R.linea(112, 152, 112 + dx, 168, K); R.linea(113, 152, 113 + dx, 168, hex('#5a3e26')); }
    for (let k = -1; k <= 1; k++) R.linea(100, 149 + k, 128, 134 + k, k ? K : lat); R.linea(102, 149, 126, 136, lo); R.rect(126, 131, 131, 137, K); R.rect(127, 132, 130, 136, lat); R.pset(128, 133, hex('#fff0b0')); R.rect(97, 147, 101, 151, K); R.rect(98, 148, 100, 150, lo); }
  const u = suave(lin(t, harry, castillo + 0.4)), ax = Math.round(lerp(290, 206, u));
  R.actor(EL.alumna, ax, 168, t, { dir: -1, anda: u > 0 && u < 1, sorpresa: t > poster + 0.2 && t < harry, dedo: t > castillo + 0.5 && t < gafas, sonrisa: t > gafas + 0.3 });
  T.exteriorDelante(R, t, o);
};

const p2 = (t) => {
  const o = { encuadre: 'anden', camara: 'lago', barcas: lin(t, P2 - 1.2, P2 + 4.6) };
  T.hogwarts(R, t, o);
  // las lechuzas salen del castillo a «everyone», cada una con su carta, hacia todas partes (crecen al acercarse)
  const rutas = [[196, 40, -24, 40], [214, 50, 120, 196], [206, 36, 250, 200], [222, 30, 340, 70], [190, 52, 30, 150], [230, 46, 330, 160], [200, 44, 100, -20]];
  rutas.forEach(([x0, y0, x1, y1], k) => { const s = (t - todos - k * 0.14) / 1.8; if (s <= 0 || s >= 1) return; const e = s * s; lechuzaCarta(lerp(x0, x1, e), lerp(y0, y1, e) - Math.sin(s * Math.PI) * 8, t + k, s > 0.55 ? 2 : 1); });
  // a «name», el rayo dorado sobre el castillo
  const g = lin(t, nombre - 0.15, nombre + 0.3);
  if (g > 0) { const x = 132, y = 22; for (let j = -6; j < 36; j++) for (let i = -6; i < 34; i++) { const d = Math.hypot(i - 14, j - 14); if (d < 20 && b4(x + i, y + j) < 0.5 * g * (1 - d / 20)) tine(x + i, y + j, hex('#ffe8a0'), 0.5); }
    R.icono('rayo', x, y, hex('#ffd36a'), K, 4); if (parp(t, 9)) { R.pset(x + 26, y + 2, hex('#ffffff')); R.pset(x + 2, y + 24, hex('#fff8d0')); } }
  // los alumnos del embarcadero: señalan la fila de barcas, miran las lechuzas y celebran el rayo
  const al = [[EL.alumno, 20, 1], [EL.alumna, 46, 1], [EL.neville, 74, 1]];
  al.forEach(([def, x, d], k) => R.actor(def, x, 149, t, { dir: d, dedo: (k === 1 && t > linea - 0.2 && t < todos) || (k === 0 && t > mundo && t < nombre), sorpresa: t > todos + 0.2 && t < mundo + 0.3 && k !== 0, brazos: t > nombre + 0.15, salto: k === 2 && t > nombre + 0.15 ? Math.round(Math.abs(Math.sin((t - nombre) * 8)) * 4) : 0, sonrisa: t > nombre }));
  T.hogwartsDelante(R, t, o);
};

const efectos = [[poster, 'brillo'], [castillo + 0.2, 'campana'], [refleja + 0.3, 'whoosh'], [gafas + 0.02, 'golpecito'], [linea, 'ola'], [todos + 0.1, 'whoosh'], [nombre, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 2026 });
''')

# ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['hp-coste'] = ('Coste', '''// HP-COSTE (frase 9), 2026. Tres planos:
// 1. el banco de los duendes: el contable entra con su libreta a «small project» junto a un montoncito de monedas; el duende
//    del mostrador le echa monedas y desde «spent nearly» la montaña crece; a «$200 million» aparece la cifra dorada y el
//    contable se sorprende y apunta; corta en «halfway»;
// 2. el monitor del plató: la barra de rodaje avanza hasta la mitad a «halfway»; el director señala, levanta la claqueta y
//    la cierra a «Season 2»: en la pantalla cae un 2 dorado y a «Chamber of Secrets» aparece la puerta redonda de la
//    serpiente, a la que se le encienden los ojos; el contable apunta; corta en «is already»;
// 3. el corcho: la fan, subida a la escalera, clava la ficha del 2 a «underway»; le vibra el móvil a «HBO warns»; a «won't»
//    tacha el «+1» (un año) y a «every year» da la vuelta al reloj de arena, que empieza a correr; suspira.''', H + r'''
const a = (f) => en('coste', f);
const P2 = a(.412), P3 = a(.710);
const pequeno = a(.029), segun = a(.115), cuentas = a(.221), gastado = a(.295), dolares = a(.336), millones = a(.382);
const mitad = a(.412), rodaje = a(.494), temporada = a(.554), dos = a(.572), camara = a(.628), secretos = a(.664);
const enMarcha = a(.738), aunque = a(.801), avisa = a(.854), no = a(.906), cadaAno = a(.949);

// la montaña de monedas (cima en base − h), con su brillo
const montana = (cx, base, h, t) => {
  const top = base - h;
  for (let y = Math.round(top); y <= base; y++) { const w = Math.round((y - top) * 1.5 + 3);
    for (let x = cx - w; x <= cx + w; x++) { const e = x === cx - w || x === cx + w || y === Math.round(top); const n = hs(x >> 1, y >> 1, 3);
      R.pset(x, y, e ? K : n > 0.82 ? hex('#fff0a0') : n > 0.45 ? hex('#f0c040') : n > 0.15 ? hex('#d09a28') : hex('#8a5a14')); } }
  for (let k = 0; k < 14; k++) { const yy = Math.round(top + 4 + hs(k, 1) * (h - 4)), ww = (yy - top) * 1.5, xx = Math.round(cx + (hs(k, 2) - 0.5) * 2 * ww * 0.8); if (h > 6) PZ.moneda(R, xx, yy + 3); }
  for (let k = 0; k < 4; k++) { const s = Math.sin(t * 5 + k * 1.7); if (s > 0.6) { const xx = Math.round(cx + (hs(k, 7) - 0.5) * h * 1.6), yy = Math.round(top + 3 + hs(k, 8) * h * 0.7); R.pset(xx, yy - 2, hex('#ffffff')); R.pset(xx - 2, yy, hex('#ffffff')); R.pset(xx + 2, yy, hex('#ffffff')); R.pset(xx, yy + 2, hex('#ffffff')); R.pset(xx, yy, hex('#fffbe0')); } }
  R.rect(cx - Math.round(h * 1.5 + 3) - 2, base + 1, cx + Math.round(h * 1.5 + 3) + 2, base + 2, hex('#3a2a20'));
};

const p1 = (t) => {
  const o = { encuadre: 'banco' };
  T.diagon(R, t, o);
  const h = lerp(5, 9, lin(t, 0.6, gastado)) + 4 * lin(t, 3.3, 3.8) + 42 * suave(lin(t, gastado - 0.1, millones + 0.2));
  const cx = 128, base = 168;
  montana(cx, base, h, t);
  // las monedas que lanza el duende, más deprisa desde «spent»
  const lanz = []; for (let s = 0.9; s < P2; s += s < gastado ? 0.42 : 0.13) lanz.push(s);
  lanz.forEach((s0, k) => { const u = (t - s0) / 0.55; if (u <= 0 || u >= 1) return; const tx = cx + (hs(k, 9) - 0.5) * 20, ty = base - h;
    PZ.moneda(R, Math.round(lerp(200, tx, u)), Math.round(lerp(110, ty, u) - Math.sin(u * Math.PI) * 26)); });
  // el contable entra, apunta en su libreta y se sorprende con la cifra
  const u = suave(lin(t, 0.2, pequeno + 1.2)), x = Math.round(lerp(-18, 28, u));
  R.actor(EL.contable, x, 162, t, { dir: 1, anda: u > 0 && u < 1, habla: t > segun && t < cuentas + 0.6 && parp(t, 8), dedo: (t > segun + 0.2 && t < cuentas) || t > millones, sorpresa: t > dolares && t < millones + 0.1 });
  // el duende detrás del mostrador lanza las monedas
  const lanza = lanz.some((s0) => t > s0 - 0.12 && t < s0 + 0.08);
  R.actor(EL.duende, 208, 126, t, { dir: -1, sostiene: [196, lanza ? 106 : 116], habla: t > gastado && parp(t, 9), sonrisa: t > dolares });
  T.diagonDelante(R, t, o);
  // un duende trae una carretilla de monedas, la vuelca en el montón y se vuelve
  { const ida = suave(lin(t, 0.5, 2.9)), vuelta = suave(lin(t, 4.6, 6.6)), bx = Math.round(lerp(-44, 66, ida) - vuelta * 120), vuelca = lin(t, 3.0, 3.5) * (1 - lin(t, 4.2, 4.6));
    const dir = t > 4.6 ? -1 : 1, an = t > 4.6 && t < 6.6;
    R.actor(EL.duende, bx, 176, t, { dir, anda: (ida > 0 && ida < 1) || an, sonrisa: t > 3.5, salto: vuelca > 0 && vuelca < 1 ? 1 : 0 });
    const wx = dir > 0 ? bx + 14 : bx - 34, ty = 160 - Math.round(vuelca * 4);
    R.linea(dir > 0 ? bx + 12 : bx + 2, 166, dir > 0 ? wx + 4 : wx + 16, ty + 3, K);
    R.poligono([[wx, ty], [wx + 20, ty - Math.round(vuelca * 6)], [wx + 17, ty + 8], [wx + 3, ty + 8]], K); R.poligono([[wx + 1, ty + 1], [wx + 19, ty + 1 - Math.round(vuelca * 6)], [wx + 16, ty + 7], [wx + 4, ty + 7]], hex('#6a7480'));
    const ll = t < 3.2 ? 1 : 0; if (ll) for (let k = 0; k < 6; k++) PZ.moneda(R, wx + 4 + k * 3, ty + 1 - (k % 2));
    R.disco(wx + (dir > 0 ? 18 : 2), 171, 4, K); R.disco(wx + (dir > 0 ? 18 : 2), 171, 2, hex('#8a6038')); R.linea(wx + 3, ty + 8, wx + 4, 174, K); }
  for (let k = 0; k < 8; k++) { const u = (t - 3.05 - k * 0.05) / 0.45; if (u <= 0 || u >= 1) continue; PZ.moneda(R, Math.round(lerp(98, 112 + k * 2, u)), Math.round(lerp(156, 166 - h * 0.6, u) - Math.sin(u * Math.PI) * 10)); }
  // la cifra: $200000000
  const c = suave(lin(t, dolares - 0.1, dolares + 0.35));
  if (c > 0) { const y = Math.round(lerp(112, 96, c)); R.rect(74, y - 12, 182, y + 3, K); R.rect(75, y - 11, 181, y + 2, hex('#2a1a3a')); R.rect(75, y - 11, 181, y - 11, hex('#e8b830')); R.rect(75, y + 2, 181, y + 2, hex('#a87a18'));
    R.numero('$', 84, y + 1, { tam: 8 }); T.a_cifras(R, '200000000', 134, y + 1); }
};

// la claqueta en la mano: cuerpo negro con el 2 y el palo de rayas que se abre (abre 0–1)
const claqueta = (x, y, abre) => {
  R.rect(x - 7, y - 4, x + 8, y + 7, K); R.rect(x - 6, y - 3, x + 7, y + 6, hex('#22222a')); R.rect(x - 6, y - 3, x + 7, y - 3, hex('#4a4a58'));
  R.numero('2', x + 1, y + 6, { tam: 8, centro: true });
  const an = -abre * 0.5, c = Math.cos(an), s = Math.sin(an), P = (i, j) => [Math.round(x - 7 + i * c - j * s), Math.round(y - 5 + i * s + j * c)];
  R.poligono([P(0, -3), P(16, -3), P(16, 0), P(0, 0)], K);
  for (let i = 0; i < 16; i += 4) R.poligono([P(i, -2), P(i + 2, -2), P(i + 2, -1), P(i, -1)], hex('#f4f0e4'));
};
const pantalla = (t) => (R2, tt, cl) => {
  const [x0, y0, x1, y1] = cl, cx = (x0 + x1) >> 1;
  if (tt < camara - 0.15) {
    // la escena que se está rodando: el Gran Comedor con las velas, y la barra del rodaje que llega a la mitad
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(hex('#141030'), hex('#3a2a4a'), (y - y0) / (y1 - y0) + (b4(x, y) - 0.5) * 0.2));
    for (let k = 0; k < 18; k++) { const sx = x0 + Math.round(hs(k, 11) * (x1 - x0)), sy = y0 + 2 + Math.round(hs(k, 12) * 14); if (Math.sin(tt * 3 + k) > 0) R.pset(sx, sy, hex('#e8f0ff')); }
    for (let k = 0; k < 12; k++) { const vx = x0 + 6 + k * 10, vy = y0 + 14 + (k % 3) * 5 + Math.round(Math.sin(tt * 2 + k) * 1.5); rr(vx, vy, vx, vy + 3, hex('#f4ecd8')); R.pset(vx, vy - 1, parp(tt + k, 12) ? hex('#ffd36a') : hex('#fff4b0')); }
    for (const [ax, bx] of [[cx - 34, cx - 60], [cx + 34, cx + 60]]) { R.poligono([[ax - 4, y0 + 34], [ax + 4, y0 + 34], [bx + 8, y1 - 12], [bx - 8, y1 - 12]], hex('#6a4224')); R.linea(ax, y0 + 34, bx, y1 - 12, hex('#e8b830')); }
    rr(cx - 30, y0 + 28, cx + 30, y0 + 32, hex('#7a4a2a'));
    for (let k = 0; k < 5; k++) { const px = cx - 24 + k * 12; R.disco(px, y0 + 26, 2, hex('#f6c290')); }
    const p = 0.5 * suave(lin(tt, mitad - 0.3, rodaje + 0.4));
    rr(x0 + 8, y1 - 9, x1 - 8, y1 - 4, hex('#e8eef6')); rr(x0 + 9, y1 - 8, x1 - 9, y1 - 5, hex('#1a1a24')); rr(x0 + 9, y1 - 8, Math.round(x0 + 9 + (x1 - x0 - 18) * p), y1 - 5, hex('#f0c040'));
    const mx = Math.round(x0 + 9 + (x1 - x0 - 18) * p); R.poligono([[mx - 3, y1 - 13], [mx + 3, y1 - 13], [mx, y1 - 9]], hex('#ff4040'));
    R.linea(cx, y1 - 11, cx, y1 - 2, hex('#e8eef6'));
    if (tt > temporada - 0.2) { const s = suave(lin(tt, temporada - 0.2, dos)); R.numero('2', cx, Math.round(lerp(y0 - 4, y0 + 40, s)), { tam: 32, centro: true }); if (tt > dos && tt < dos + 0.4) for (let k = 0; k < 8; k++) R.pset(Math.round(cx + Math.cos(k * 0.8) * (tt - dos) * 60), Math.round(y0 + 24 + Math.sin(k * 0.8) * (tt - dos) * 40), hex('#fff4b0')); }
  } else {
    // la cámara secreta: el muro de piedra verde y la puerta redonda con la serpiente; a «Secrets» le brillan los ojos
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const fila = Math.floor((y - y0) / 7), junta = (y - y0) % 7 === 0 || (x + fila * 9) % 18 === 0; R.pset(x, y, junta ? hex('#0e1a14') : mez(hex('#1e3a2a'), hex('#2a4a36'), hs(x >> 2, y >> 2, 5) * 0.6)); }
    const r = 24, cy = (y0 + y1) >> 1; R.disco(cx, cy, r + 3, K); R.disco(cx, cy, r + 2, hex('#5a6a5a')); R.disco(cx, cy, r, hex('#3a4a3e'));
    for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; R.disco(Math.round(cx + Math.cos(an) * (r - 3)), Math.round(cy + Math.sin(an) * (r - 3)), 2, hex('#7a8a6a')); }
    for (let k = 0; k <= 60; k++) { const s = k / 60, an = s * Math.PI * 3.2, rad = (r - 7) * (1 - s * 0.75); const px = Math.round(cx + Math.cos(an) * rad), py = Math.round(cy + Math.sin(an) * rad); R.disco(px, py, 1, hex('#2a8a4a')); R.pset(px, py - 1, hex('#6ad08a')); }
    const ojo = tt > secretos ? (parp(tt, 10) ? hex('#ffe040') : hex('#ff8030')) : hex('#2a3a2a'); R.pset(cx + 2, cy - 1, ojo); R.pset(cx + 4, cy - 1, ojo);
    if (tt > secretos) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (Math.hypot(x - cx - 3, y - cy + 1) < 10 && b4(x, y) < 0.3) tine(x, y, hex('#ffe060'), 0.25);
    R.numero('2', x1 - 10, y0 + 14, { tam: 16, centro: true });
    const temb = tt < camara + 0.4 ? Math.round(Math.sin(tt * 60)) : 0; if (temb) R.linea(cx - r, cy + r + 1, cx + r, cy + r + 1, hex('#0e1a14'));
  }
};

const p2 = (t) => {
  const o = { encuadre: 'plato', camara: 'monitor', pantalla: pantalla(t) };
  T.hoy(R, t, o);
  // el contable apunta; el director señala la barra, levanta la claqueta y la cierra a «Season 2»
  R.actor(EL.contable, 12, 164, t, { dir: 1, habla: t > mitad + 0.3 && t < rodaje && parp(t, 8), sorpresa: t > dos && t < dos + 0.7, dedo: t > camara + 0.3, sonrisa: t > secretos + 0.3 });
  const conClaq = t > rodaje + 0.1;
  const d = R.actor(EL.director, 70, 164, t, { dir: 1, dedo: t > mitad && t < rodaje, habla: t > mitad && t < rodaje && parp(t, 7), sostiene: conClaq ? [90, 136] : undefined, sonrisa: t > dos });
  if (conClaq) { const ab = t < temporada - 0.3 ? lin(t, rodaje + 0.1, rodaje + 0.5) : 1 - lin(t, dos - 0.12, dos); const [hx, hy] = d.mano; claqueta(hx + 6, hy - 6, ab); }
};

const p3 = (t) => {
  T.hoy(R, t, { encuadre: 'corcho' });
  // las fichas: el 2 (llega en la mano y se clava a «underway»), el +1 (un año) y el reloj de arena
  const clava = t > enMarcha;
  const ficha2 = (x, y) => { R.rect(x + 2, y + 2, x + 28, y + 34, hex('#3a2a1a')); R.rect(x, y, x + 26, y + 32, K); R.rect(x + 1, y + 1, x + 25, y + 31, hex('#f4ecd4'));
    R.numero('2', x + 14, y + 22, { tam: 16, centro: true }); for (let k = 0; k < 14; k++) R.pset(x + 6 + k, y + 27 + Math.round(Math.sin(k * 0.9) * 1.5), hex('#2a8a4a')); R.pset(x + 20, y + 26, hex('#2a8a4a')); };
  if (clava) { ficha2(194, 84); R.disco(207, 85, 2, K); R.disco(207, 85, 1, hex('#e83030')); }
  R.rect(226, 86, 252, 102, K); R.rect(227, 87, 251, 101, hex('#c8e0f0')); R.numero('+1', 240, 98, { tam: 8, centro: true }); R.disco(239, 87, 1, hex('#3a6ad8'));
  // la X roja que tacha el +1 a «won't»
  const x1 = lin(t, no, no + 0.3), x2 = lin(t, no + 0.35, no + 0.65);
  for (let k = 0; k <= 22 * x1; k++) R.rect(228 + k, 88 + Math.round(k * 0.6), 229 + k, 89 + Math.round(k * 0.6), hex('#e02828'));
  for (let k = 0; k <= 22 * x2; k++) R.rect(250 - k, 88 + Math.round(k * 0.6), 251 - k, 89 + Math.round(k * 0.6), hex('#e02828'));
  // el reloj de arena colgado: a «every year» da la vuelta y la arena empieza a correr
  const gira = lin(t, cadaAno - 0.1, cadaAno + 0.35), hy0 = 106, hx0 = 239, sq = Math.abs(Math.cos(gira * Math.PI));
  R.rect(228, 104, 251, 127, K); R.rect(229, 105, 250, 126, hex('#e8dcc0')); R.disco(239, 105, 1, hex('#3a6ad8'));
  { const hh = Math.max(1, Math.round(9 * sq)); R.rect(hx0 - 6, hy0 + 10 - hh - 1, hx0 + 6, hy0 + 10 - hh, hex('#6a4224')); R.rect(hx0 - 6, hy0 + 10 + hh, hx0 + 6, hy0 + 11 + hh, hex('#6a4224'));
    for (let j = -hh + 1; j < hh; j++) { const w = Math.max(1, Math.round(Math.abs(j) / hh * 5)); R.rect(hx0 - w, hy0 + 10 + j, hx0 + w, hy0 + 10 + j, hex('#d8eef8')); }
    if (gira >= 1) { const corre = lin(t, cadaAno + 0.35, cadaAno + 6); for (let j = -hh + 1; j < 0; j++) { const w = Math.max(0, Math.round(Math.abs(j) / hh * 5) - 1); if (-j < (1 - corre) * hh) R.rect(hx0 - w, hy0 + 10 + j, hx0 + w, hy0 + 10 + j, hex('#e8b830')); }
      for (let j = 1; j < hh; j++) { const w = Math.max(0, Math.round(j / hh * 5) - 1); if (hh - j < corre * hh + 1) R.rect(hx0 - w, hy0 + 10 + j, hx0 + w, hy0 + 10 + j, hex('#e8b830')); } if (parp(t, 20)) R.linea(hx0, hy0 + 10, hx0, hy0 + 16, hex('#e8b830')); }
    else for (let j = 1; j < hh; j++) { const w = Math.max(0, Math.round(j / hh * 5) - 1); R.rect(hx0 - w, hy0 + 10 + j, hx0 + w, hy0 + 10 + j, hex('#e8b830')); } }
  // la escalera de tijera y la fan subida en ella
  const ma = hex('#8a6038'), md = hex('#5a3a22');
  R.linea(186, 128, 196, 160, K); R.linea(187, 128, 197, 160, md);
  const f = R.actor(EL.adolescente, 170, 138, t, { dir: 1, sostiene: !clava ? [196, 104] : t > avisa + 0.2 && t < no + 0.8 ? [226, 98] : undefined,
    dedo: t > enMarcha && t < enMarcha + 0.3, sorpresa: t > aunque + 0.1 && t < avisa + 0.1, triste: t > cadaAno + 0.4, sonrisa: t > enMarcha + 0.3 && t < aunque });
  if (!clava) { const [hx, hy] = f.mano; ficha2(hx - 4, hy - 26); }
  if (t > avisa + 0.2 && t < no + 0.8) { const [hx, hy] = f.mano; const tx = t > no ? Math.round(lerp(hx, hx + 4, lin(t, no, no + 0.6))) : hx; R.linea(tx, hy, tx + 4, hy - 4, K); R.linea(tx + 1, hy, tx + 4, hy - 3, hex('#e02828')); }
  if (t > aunque && t < avisa + 0.2) { R.bocadillo?.(184, 108, { icono: '!' }); const vx = 172 + (parp(t, 40) ? 1 : 0); R.rect(vx, 128, vx + 3, 133, K); R.rect(vx + 1, 129, vx + 2, 132, hex('#6ab0f0')); }
  for (const y of [136, 146, 156]) { R.rect(166 + (y - 136) * 0.2, y, 188 + (y - 136) * 0.3, y + 2, K); R.rect(167 + (y - 136) * 0.2, y + 1, 187 + (y - 136) * 0.3, y + 1, ma); }
  R.linea(168, 128, 160, 160, K); R.linea(169, 128, 161, 160, ma); R.linea(184, 128, 190, 160, K); R.linea(183, 128, 189, 160, ma); R.rect(166, 126, 187, 129, K); R.rect(167, 127, 186, 128, ma);
};

const efectos = [[pequeno + 0.2, 'carro'], [gastado + 0.1, 'campana'], [dolares, 'brillo'], [mitad + 0.3, 'tic'], [dos - 0.02, 'toc'], [camara, 'cerrojo'], [enMarcha, 'golpecito'], [aunque + 0.05, 'zumbido'], [no, 'lapiz'], [cadaAno + 0.2, 'tic']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')
