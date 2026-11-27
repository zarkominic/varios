E = {}

# ─────────────── MS-LIBRO (frases 23–25) y MS-PRECIO (frases 26–27): grupo S7 ───────────────
# Las ayudas (AYUDAS) son las del grupo de ms-criatura (escenas6.py) más unas propias (velas, ladrillos, agua, tinta…).

CAB_LIBRO = r'''// MS-LIBRO (frases 23–25), cartela 1818; barra 1818 (el libro) / 1817 (Mary lo escribe) / 1818 / 1823. Trece planos:
// 1. (0) el Ártico (artico/general): Victor camina con su farol hacia el barco; la criatura sale de la ventisca, lejos, y
//    tiende la mano en «creates a life»; él se vuelve en «life» («!»);
// 2. («abandons») el barco de cerca (artico/barco): Victor sube por la escala sin volverse; un marinero le tiende la mano;
//    la criatura tiende la suya y en «alone» la baja, sola en el hielo;
// 3. («rejected») Ginebra de noche (fondo local): una sombra enorme pasa por la ventana; las cortinas se inflan en «ends»;
//    las cuatro velas junto a los tres retratos se apagan en «hurting», «everyone», «he» y «loves» (nada se ve);
// 4. («Mary») Marlow, 1817 (fondo local): Mary escribe a la mesita del jardín; en «mother» alza el retratito de su madre;
//    en «daughter» se va una mariposa blanca; cisnes y barca de pértiga en el Támesis;
// 5. («wrote») el manuscrito (inserto, fondo local): en «both» y «sides» aparecen los dos dibujos a tinta (Victor / la
//    criatura); el brazo canónico de Mary pasa a la izquierda en «from the one who creates»; Victor se da la vuelta en «doesn't»;
// 6. («and from the one who arrives») el mar helado (fondo local): la criatura en su témpano se aleja; mira atrás en «arrives»;
//    triste en «no one»; la bruma se la lleva en «willing»;
// 7. («On January 1st») la imprenta (imprenta/general): la hoja del 31 cae y queda el 1; el librero alza el tomito en
//    «Frankenstein»; Atom entra y en «Prometheus» recoge los tres;
// 8. («goes on sale») el escaparate: GAG, Atom sale con los tres tomitos y se le caen en «small», «volumes» y «and»; la
//    tarjeta «500» en «500»; un señor recoge uno y no encuentra el nombre: «?» en «name»;
// 9. («Mary is 20») el gabinete de lectura (fondo local): Mary entra («20»); el señor de chistera señala en «assume»; su
//    globo: un hombre en «man» y Percy en «husband»; Mary frunce el ceño;
// 10. («Five years later») la fachada del teatro de noche, 1823 (fondo local): la cola entra; el coche pasa delante; en
//    «huge hit» el niño pega la estrella al cartel y la gente alza los brazos;
// 11. («drawing crowds») la sala llena (teatro/general): ramos al escenario; la acomodadora con su vela abre el palco bajo y
//    Mary entra en «Mary goes»;
// 12. («In the playbill») el palco (teatro/palco): GAG, Atom busca con la lupa el nombre en el programa, «?» en «name»; en
//    «dash» la raya brilla con su anillo; Mary se ríe;
// 13. («Mary finds it hilarious») su cuarto de Londres (fondo local): se ríe con el programa, escribe en «writes», se
//    sorprende en «surprise» y alza la carta en «famous»; el niño aplaude con su teatrito.
'''

CUERPO_LIBRO = r'''import { b_caballo } from '/atomo/plato/escenas/te-comun.js';

const K = hex('#1a1424'), ri = Math.round, ease = (u) => u * u * (3 - 2 * u), voz = (t) => E.energia?.(t) ?? 0, MS = T.MS, AT = T.AT;
const hh = (a, b, c = 0) => { let n = (a * 374761393 + b * 668265263 + c * 1442695041) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const BAY = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const tono = (cols, v, x, y) => { const n = cols.length - 1; v = Math.max(0, Math.min(n, v)); let l = Math.floor(v); if (v - l > BAY[y & 3][x & 3] / 16) l++; return cols[Math.min(n, l)]; };
const pal = (...a) => a.map(hex);
const cl = (v) => Math.max(0, Math.min(1, v));
const capas = {};
const capa = (k, f) => { if (!capas[k]) { const b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); capas[k] = b; } return capas[k]; };
const pegar = (b) => { const D = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c) D[i] = c; } };
const tine = (x, y, c, a) => { x = ri(x); y = ri(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, a)); };
const halo = (cx, cy, r, c, a) => { cx = ri(cx); cy = ri(cy);
  for (let y = Math.max(0, cy - r); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, cx - r); x <= Math.min(319, cx + r); x++) {
    const d = Math.hypot(x - cx, y - cy) / r; if (d >= 1) continue; const q = Math.floor(((1 - d) * (1 - d)) * 4 + BAY[y & 3][x & 3] / 16) / 4; if (q > 0) R.pset(x, y, mez(R.pget(x, y), c, Math.min(0.9, q * a))); } };
const velo = (c, a, y0 = 0, y1 = 179) => { if (a <= 0) return; const B = R.buf, cr = c & 255, cg = (c >>> 8) & 255, cb = (c >>> 16) & 255;
  for (let i = y0 * 320; i < (y1 + 1) * 320; i++) { const v = B[i], r = v & 255, g = (v >>> 8) & 255, b = (v >>> 16) & 255;
    B[i] = (0xff000000 | (Math.round(b + (cb - b) * a) << 16) | (Math.round(g + (cg - g) * a) << 8) | Math.round(r + (cr - r) * a)) >>> 0; } };
// nube de bolitas en tres tonos (sombra, cuerpo, luz)
const nube = (cx, cy, w, cols, k) => { const n = Math.max(3, Math.round(w / 7)), X = (i) => ri(cx - w / 2 + (i + 0.5) * w / n), al = (i) => Math.sin(Math.PI * (i + 0.5) / n),
    r = (i) => 3 + hh(k, i, 3) * 2.5 + al(i) * Math.min(7, w * 0.09), Y = (i) => ri(cy - al(i) * w * 0.07 - hh(k, i, 4) * 2);
  for (let i = 0; i < n; i++) R.disco(X(i), Y(i) + 1, ri(r(i)), cols[0]);
  for (let i = 0; i < n; i++) R.disco(X(i), Y(i), ri(r(i) - 1), cols[1]);
  for (let i = 0; i < n; i++) R.disco(X(i) - 1, Y(i) - 2, Math.max(1, ri(r(i) - 3)), cols[2]);
  for (let x = ri(cx - w / 2); x <= ri(cx + w / 2); x++) { R.pset(x, ri(cy) + 2, cols[0]); R.pset(x, ri(cy) + 3, cols[0]); } };
// tres capas de nubes a tres velocidades
const nubes = (t, y0, y1, C3, sem = 0, v = 1) => {
  for (let k = 0; k < 3; k++) { const w = 90 + hh(k, 1, sem) * 50, x = ((hh(k, 2, sem) * 480 + t * 2 * v + k * 160) % 480) - 80; nube(x, y1 - 8 - hh(k, 3, sem) * 6, w, C3[0], k + sem); }
  for (let k = 0; k < 4; k++) { const w = 40 + hh(k, 4, sem) * 34, x = ((hh(k, 5, sem) * 420 + t * 5 * v + k * 105) % 420) - 50; nube(x, (y0 + y1) / 2 + hh(k, 6, sem) * 14 - 7, w, C3[1], k + 9 + sem); }
  for (let k = 0; k < 4; k++) { const w = 14 + hh(k, 7, sem) * 14, x = ((hh(k, 8, sem) * 380 + t * 11 * v + k * 95) % 380) - 30; nube(x, y0 + 4 + hh(k, 9, sem) * 12, w, C3[2], k + 19 + sem); } };
const ave = (x, y, t, c, f = 0) => { x = ri(x); y = ri(y); const a = Math.sin(t * 12 + f) > 0; R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : 0), c); R.pset(x + 2, y - (a ? 2 : 0), c); };
// cordillera: picos [[x, alto, semiancho]], base yb (cols: roca D, S, M, L; nieve S, M, L; bruma)
const sierra = (yb, picos, cols, nieve = 0.5, sem = 0) => {
  for (let x = 0; x < 320; x++) { let a = 0, pk = 0; for (const [px, al, w] of picos) { const v = al * (1 - Math.abs(x - px) / w); if (v > a) { a = v; pk = px; } }
    a += Math.sin(x * 0.37 + sem) * 1.3 + (hh(x >> 1, 5, sem) - 0.5) * 2.4; if (a <= 0) continue;
    const top = ri(yb - a), luz = x < pk, linea = a * nieve;
    for (let y = top; y <= yb; y++) { const alt = yb - y, borde = y === top;
      const canal = Math.sin((x + y * (luz ? 0.9 : -0.9)) * 0.55 + hh(x >> 3, 1, sem) * 6) > 0.86;
      const enNieve = alt > a - linea - (hh(x, 3, sem) * 5) + (canal ? 4 : 0);
      let c;
      if (borde) c = enNieve ? cols[6] : cols[3];
      else if (enNieve) c = canal ? cols[4] : luz ? (hh(x, y, sem) > 0.85 ? cols[5] : cols[6]) : (hh(x, y, sem) > 0.8 ? cols[4] : cols[5]);
      else c = canal ? cols[0] : luz ? tono([cols[1], cols[2], cols[3]], 1.2 + hh(x >> 1, y >> 1, sem) * 0.9, x, y) : tono([cols[0], cols[1], cols[2]], 0.9 + hh(x >> 1, y >> 1, sem), x, y);
      const br = cl((alt < 10 ? (10 - alt) / 10 : 0) * 0.7);
      R.pset(x, y, br > 0 ? mez(c, cols[7], br) : c); } } };
// un pino (cols D, S, M, L); nieve: cuánta nieve en los pisos
const pino = (x, yb, a, cols, k = 0, nieve = 0) => { x = ri(x); yb = ri(yb); R.rect(x, yb - 3, x + 1, yb, hex('#3a2a1c'));
  for (let j = 0; j < a; j++) { const piso = j % 5, w = Math.max(0, ri(j * 0.34 + piso * 0.5 - 1)), y = yb - 3 - a + j;
    for (let i = -w; i <= w + 1; i++) { let c = (i === -w || i === w + 1) && j > 2 ? cols[0] : piso === 4 ? cols[1] : i < -w * 0.25 ? cols[3] : i > w * 0.45 ? cols[1] : cols[2];
      if (nieve > 0 && piso === 0 && hh(x + i, y, k) < nieve) c = i < 0 ? hex('#f4f8ff') : hex('#c8d4e8'); R.pset(x + i, y, c); } }
  R.pset(x, yb - 3 - a, nieve > 0 ? hex('#f4f8ff') : cols[3]); };
// un árbol de copa redonda en racimos de tres tonos (cols D, S, M, L), que se mece
const copa = (cx, cy, w, h, t, cols, sem, v = 1) => {
  for (let k = 0; k < 9; k++) { const x = cx + (hh(k, 1, sem) - 0.5) * w, y = cy + (hh(k, 2, sem) - 0.5) * h, m = ri(Math.sin(t * 1.6 + k) * v * 0.8), r = ri(w * 0.2 + hh(k, 3, sem) * w * 0.08);
    R.disco(ri(x) + m, ri(y) + 1, r, cols[0]); R.disco(ri(x) + m - 1, ri(y) - 1, r - 1, cols[1]); R.disco(ri(x) + m - 2, ri(y) - 3, Math.max(1, ri(r * 0.5)), cols[2]); }
  for (let k = 0; k < w * 2; k++) { const x = cx + (hh(k, 4, sem) - 0.5) * w * 1.1, y = cy + (hh(k, 5, sem) - 0.5) * h * 1.1, m = ri(Math.sin(t * 1.6 + k) * v);
    if (Math.hypot((x - cx) / (w * 0.55), (y - cy) / (h * 0.55)) < 1) R.pset(ri(x) + m, ri(y), y < cy - h * 0.15 && x < cx ? cols[3] : k % 3 ? cols[2] : cols[0]); } };
// tablas de madera con vetas, juntas y clavos (C: D, S, M, L); w: ancho de tabla; vert: tablas en vertical
const tablas = (x0, y0, x1, y1, C, w, sem, vert = true, clavos = true) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = vert ? x - x0 : y - y0, b = vert ? y : x, k = Math.floor(a / w), i = a % w;
    if (i === 0) { R.pset(x, y, C[0]); continue; }
    const veta = Math.sin(b * 0.23 + k * 3.1 + Math.sin(b * 0.05 + k) * 2.4) > 0.8, nudo = Math.hypot((vert ? i : b % 37) - w / 2, (vert ? b % 41 : i) - (vert ? 20 : w / 2)) < 1.6 && hh(k, 9, sem) > 0.6;
    R.pset(x, y, nudo ? C[0] : tono(C, 1.6 + (hh(k, 1, sem) - 0.5) * 1.1 + (i === 1 ? 0.9 : i === w - 1 ? -0.8 : 0) + (veta ? -0.9 : 0) + hh(x >> 1, y >> 1, sem) * 0.45, x, y)); }
  if (clavos) for (let k = 0; (vert ? x0 : y0) + k * w < (vert ? x1 : y1); k++) for (const f of [0.15, 0.85]) { const p = (vert ? x0 : y0) + k * w + ri(w / 2), q = ri(vert ? y0 + (y1 - y0) * f : x0 + (x1 - x0) * f);
    if (vert) { R.pset(p, q, C[0]); R.pset(p - 1, q - 1, C[3]); } else { R.pset(q, p, C[0]); R.pset(q - 1, p - 1, C[3]); } } };
// mampostería de piedras irregulares con juntas (C: junta, S, M, L)
const piedras = (x0, y0, x1, y1, C, sem, h = 7, w = 12) => {
  for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / h), j = (y - y0) % h, off = ri(hh(f, 0, sem) * w);
    for (let x = x0; x <= x1; x++) { const k = Math.floor((x - x0 + off) / w), i = (x - x0 + off) % w, wk = w - 1 - (hh(k, f, sem) > 0.7 ? 2 : 0);
      if (j === h - 1 || i >= wk) { R.pset(x, y, C[0]); continue; }
      const v = 1.6 + (hh(k, f + 7, sem) - 0.5) * 1.3 + (j === 0 ? 0.9 : j === h - 2 ? -0.7 : 0) + (i === 0 ? 0.5 : 0) + hh(x, y, sem) * 0.4;
      R.pset(x, y, tono(C, v, x, y)); } } };
const cieloG = (k, y1, cols, sem = 7) => capa(k, () => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(cols, Math.min(1, y / y1) * (cols.length - 1) * 0.92 + hh(x >> 3, y >> 2, sem) * 0.45, x, y)); });
// un corazón pequeño (o.grieta 0–1: se agrieta; o.gris: se apaga)
const corazon = (x, y, c = hex('#e8506a'), grieta = 0) => { x = ri(x); y = ri(y); ['.kk.kk.', 'kcckcck', 'kcccccl', 'kcccccl', '.kcccl.', '..kcl..', '...k...'].forEach((f, j) => [...f].forEach((ch, i) => { if (ch !== '.') R.pset(x + i, y + j, ch === 'k' ? K : ch === 'l' ? mez(c, K, 0.35) : c); }));
  R.pset(x + 1, y + 1, mez(c, hex('#ffffff'), 0.6)); if (grieta > 0) { const n = ri(grieta * 6); for (let j = 0; j < n; j++) R.pset(x + 3 + (j % 2 ? 1 : 0), y + 1 + j, K); } };
// las ondas de una voz (paréntesis que salen de un punto hacia dir)
const ondas = (x, y, t, dir, c, n = 3) => { for (let k = 0; k < n; k++) { const u = (t * 1.6 + k / n) % 1, r = 2 + ri(u * 7); if (u > 0.85) continue;
  for (let j = -r; j <= r; j++) { const xx = ri(x + dir * Math.sqrt(Math.max(0, r * r - j * j)) * 0.7); if (Math.abs(j) < r * 0.75) tine(xx, y + j, c, 0.85 - u * 0.6); } } };
// una nota de música
const nota = (x, y, c) => { x = ri(x); y = ri(y); R.rect(x, y, x + 1, y + 1, c); R.rect(x + 1, y - 5, x + 1, y, c); R.pset(x + 2, y - 5, c); R.pset(x + 3, y - 4, c); };
// lo que se ve por un hueco: f dibuja en un búfer aparte y se pega solo dentro de [x0, y0, x1, y1] (salta(x, y): no se pega)
const TMP = R.nuevo(), TMP2 = R.nuevo();
const porHueco = (x0, y0, x1, y1, f, a = 0, salta = null) => { TMP.fill(0); const prev = R.usar(TMP); f(); R.usar(prev); const D = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const i = y * 320 + x, v = TMP[i]; if (!v) continue; if (salta && salta(x, y)) continue; D[i] = a > 0 ? mez(v, D[i], a) : v; } };
// pinta f en un búfer transparente aparte (para reflejos y sombras) y devuelve lo que devuelva f
const aparte = (f) => { TMP2.fill(0); const prev = R.usar(TMP2); const r = f(); R.usar(prev); return r; };
const spr = (g, x, y, P, dir = 1) => R.dibujo(g, ri(x), ri(y), dir, P);
// una pluma de ave en la mano (la punta en x, y), que tiembla al escribir
const pluma = (x, y, t, escribe = true) => { const m = escribe ? ri(Math.sin(t * 17) * 0.7) : 0; x = ri(x); y = ri(y) + m;
  R.linea(x, y, x + 6, y - 10, K); R.linea(x + 1, y - 2, x + 8, y - 13, hex('#f4f0e6')); R.linea(x + 2, y - 2, x + 7, y - 10, hex('#d8d0c0')); R.linea(x + 3, y - 6, x + 9, y - 13, hex('#ffffff')); R.pset(x, y, hex('#2a2030')); };

// ── ayudas propias de este grupo (S7) ──
const conAlfa = (f, a) => { if (a <= 0.02) return null; if (a >= 0.98) return f(); const r = aparte(f), D = R.buf;
  for (let i = 0; i < 57600; i++) { const v = TMP2[i]; if (v) D[i] = mez(D[i], v, a); } return r; };
const estrellas = (t, x0, y0, x1, y1, n, sem, c = hex('#eef2ff')) => { for (let k = 0; k < n; k++) { const x = ri(x0 + hh(k, 1, sem) * (x1 - x0)), y = ri(y0 + hh(k, 2, sem) * (y1 - y0)), tw = Math.sin(t * (1.3 + hh(k, 3, sem) * 3) + k * 1.7);
  if (tw < -0.4) continue; R.pset(x, y, tw > 0.6 ? c : mez(R.pget(x, y), c, 0.55)); if (tw > 0.93 && hh(k, 4, sem) > 0.55) for (const [a, b] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) tine(x + a, y + b, c, 0.5); } };
// una llama pequeña que tiembla (base en x, y) y su halo
const llama = (x, y, t, k = 0, s = 1, h = true) => { x = ri(x); y = ri(y); const f = Math.sin(t * 13 + k * 2.1) + Math.sin(t * 7.3 + k), al = ri((4 + f * 0.6) * s), dx = ri(Math.sin(t * 5 + k) * 0.7);
  if (h) halo(x, y - 2, ri(16 * s), hex('#ffd890'), 0.42);
  for (let j = 0; j < al; j++) { const u = j / al, w = u < 0.3 ? 1 : u < 0.7 ? 1 : 0; for (let i = -w; i <= w; i++) R.pset(x + i + (j > al * 0.6 ? dx : 0), y - j, j < 2 ? hex('#e86a2a') : (i === 0 && j < al - 1 ? hex('#fff6d0') : hex('#ffc24a'))); }
  R.pset(x, y + 1, hex('#2a1a10')); };
// una vela de sebo en su palmatoria de latón (base y): enc 0–1 encendida; humo tras apagarse (ap: segundos desde que se apagó)
const vela = (x, yb, t, enc = true, k = 0, al = 9, ap = -1) => { x = ri(x); yb = ri(yb);
  R.rect(x - 5, yb - 1, x + 5, yb, hex('#6a4a1a')); R.rect(x - 4, yb - 2, x + 4, yb - 2, hex('#c8a040')); R.pset(x - 3, yb - 2, hex('#f0d070')); R.rect(x - 1, yb - 5, x + 1, yb - 3, hex('#a07a28'));
  R.rect(x - 2, yb - 5 - al, x + 2, yb - 6, hex('#e8dcc0')); R.rect(x + 1, yb - 5 - al, x + 2, yb - 6, hex('#c4b494')); R.pset(x - 2, yb - 5 - al, hex('#fff8e8')); R.pset(x - 1, yb - 4 - al, hex('#fff8e8'));
  R.pset(x - 2, yb - 3 - al + 4, hex('#f4ecd8')); R.pset(x, yb - 6 - al, hex('#2a1a10'));
  if (enc) llama(x, yb - 7 - al, t, k);
  else if (ap >= 0 && ap < 2.5) for (let j = 0; j < 14; j++) { const u = j / 14, a = (1 - ap / 2.5) * (1 - u) * 0.8; tine(x + Math.sin(j * 0.6 + t * 3 + k) * (1 + j * 0.25), yb - 7 - al - j - ap * 3, hex('#c8c8d0'), a); } };
// ladrillo con juntas (C: junta, S, M, L)
const ladrillos = (x0, y0, x1, y1, C, sem, w = 9, h = 4) => { for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / h), j = (y - y0) % h;
  for (let x = x0; x <= x1; x++) { const xx = x - x0 + (f % 2) * ri(w / 2), k = Math.floor(xx / w), i = xx % w;
    if (j === h - 1 || i === w - 1) { R.pset(x, y, C[0]); continue; } R.pset(x, y, tono(C, 1.5 + (hh(k, f, sem) - 0.5) * 1.4 + (j === 0 ? 0.6 : 0) + hh(x, y, sem) * 0.4, x, y)); } } };
// adoquines redondeados (C: junta, S, M, L), con brillo de humedad
const adoquines = (x0, y0, x1, y1, C, sem, w = 7, h = 4) => { for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / h), j = (y - y0) % h, ww = w + ri((y - y0) / 12);
  for (let x = x0; x <= x1; x++) { const xx = x + (f % 2) * 3, k = Math.floor(xx / ww), i = xx % ww;
    if (j === h - 1 || i === ww - 1) { R.pset(x, y, C[0]); continue; } R.pset(x, y, tono(C, 1.3 + (hh(k, f, sem) - 0.5) * 1.2 + (j === 0 && i > 0 && i < ww - 2 ? 0.9 : 0) + (i === 0 ? -0.4 : 0), x, y)); } } };
// papel pintado de damasco: rombos y flores de lis en dos tonos (C: S, M, L)
const damasco = (x0, y0, x1, y1, C, sem, pw = 14, ph = 18) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = (x - x0) % pw, b = (y - y0) % ph, cx = pw / 2, cy = ph / 2,
  d = Math.abs(a - cx) / cx + Math.abs(b - cy) / cy, flor = d < 0.55 && !(d < 0.28 && (a + b) % 2), lin = Math.abs(d - 0.95) < 0.09;
  R.pset(x, y, flor || lin ? C[0] : tono(C.slice(1), 0.55 + hh(x >> 2, y >> 2, sem) * 0.5, x, y)); } };
// una farola de gas de 1823 (base yb): poste de hierro, la linterna y su luz
const farolGas = (x, yb, t, k = 0, alto = 50) => { x = ri(x); yb = ri(yb); const y0 = yb - alto;
  R.rect(x - 1, y0, x + 1, yb, hex('#1c1e26')); R.pset(x - 1, y0 + 4, hex('#4a4e5a')); R.rect(x - 3, yb - 3, x + 3, yb, hex('#1c1e26')); R.rect(x - 4, y0 - 2, x + 4, y0, hex('#1c1e26'));
  R.rect(x - 3, y0 - 11, x + 3, y0 - 3, hex('#1c1e26')); const on = 0.85 + Math.sin(t * 9 + k) * 0.08 + Math.sin(t * 23 + k) * 0.05;
  R.rect(x - 2, y0 - 10, x + 2, y0 - 4, mez(hex('#ffcf6a'), hex('#fff4c8'), on - 0.8)); R.pset(x, y0 - 12, hex('#1c1e26')); R.pset(x, y0 - 13, hex('#1c1e26'));
  halo(x, y0 - 7, 26, hex('#ffd890'), 0.38 * on); };
// un pájaro que cruza (n pájaros entre y0 e y1; v: velocidad)
const pajaros = (t, n, y0, y1, c, sem, v = 18, x0 = -20, x1 = 340) => { for (let k = 0; k < n; k++) { const L = x1 - x0, x = x0 + ((hh(k, 1, sem) * L + t * v * (0.7 + hh(k, 2, sem) * 0.6)) % L);
  ave(x, y0 + hh(k, 3, sem) * (y1 - y0) + Math.sin(t * 1.3 + k) * 2, t, c, k); } };
// la tinta de un dibujo: f pinta (a escala 1) dentro del recuadro [0, 0, w, h] de un búfer aparte; se pega a escala s en (bx, by)
// en tinta sepia (lo claro se queda en el papel); rev 0–1 lo revela de izquierda a derecha
const tinta = (f, w, h, bx, by, s, rev = 1, c1 = hex('#3a2616'), c2 = hex('#7a5a3a')) => { if (rev <= 0) return; TMP2.fill(0); const prev = R.usar(TMP2); f(); R.usar(prev);
  const lim = ri(w * rev);
  for (let y = 0; y < h; y++) for (let x = 0; x < lim; x++) { const v = TMP2[y * 320 + x]; if (!v) continue; const l = ((v & 255) + ((v >>> 8) & 255) + ((v >>> 16) & 255)) / 3;
    if (l > 200) continue; const c = l < 90 ? c1 : c2; for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) if (l < 90 || ((x * s + a + y * s + b) & 1)) R.pset(bx + x * s + a, by + y * s + b, c); } };
// la luz caliente de un rayo (polígono), tramado
const rayo = (pts, c, a) => { const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]), x0 = Math.max(0, Math.min(...xs)), x1 = Math.min(319, Math.max(...xs)), y0 = Math.max(0, Math.min(...ys)), y1 = Math.min(179, Math.max(...ys));
  const dentro = (x, y) => { let c2 = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c2 = !c2; } return c2; };
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (((x + y) & 1) === 0 && dentro(x, y)) tine(x, y, c, a); };
// agua con ondas que se mueven (C: S, M, L, brillo); refl: función de color reflejado o null
const agua = (y0, y1, C, t, sem, v = 1, x0 = 0, x1 = 319) => { for (let y = y0; y <= y1; y++) { const p = (y - y0) / Math.max(1, y1 - y0), per = 0.25 + p * 0.5;
  for (let x = x0; x <= x1; x++) { const o = Math.sin(x * per * 0.35 + t * 1.4 * v + y * 0.9 + hh(y, 0, sem) * 6) + Math.sin(x * 0.09 - t * 0.7 * v + y * 0.4);
    R.pset(x, y, o > 1.45 ? C[3] : o > 0.7 ? C[2] : o < -1.2 ? C[0] : tono([C[0], C[1], C[2]], 1 + p * 0.3 + hh(x >> 2, y, sem) * 0.3, x, y)); } } };
// un globo de pensamiento (cx, cy centro; w, h) con tres burbujitas hacia (px, py)
const globo = (cx, cy, w, h, px, py, a = 1) => { if (a <= 0) return; const sx = ri(w * a / 2), sy = ri(h * a / 2);
  for (let k = 0; k < 3; k++) { const u = (k + 1) / 4; R.disco(ri(lerp(px, cx, u)), ri(lerp(py, cy + sy, u)), 1 + k, K); R.disco(ri(lerp(px, cx, u)), ri(lerp(py, cy + sy, u)), k, hex('#fbf6ea')); }
  for (const [dx, dy, r] of [[-0.6, 0, 0.5], [0.6, 0, 0.5], [0, -0.45, 0.55], [0, 0.4, 0.5], [-0.3, -0.3, 0.45], [0.3, 0.3, 0.45], [0.3, -0.3, 0.45], [-0.3, 0.3, 0.45]]) R.disco(ri(cx + dx * sx), ri(cy + dy * sy), ri(r * Math.min(sx, sy) * 1.15) + 1, K);
  for (const [dx, dy, r] of [[-0.6, 0, 0.5], [0.6, 0, 0.5], [0, -0.45, 0.55], [0, 0.4, 0.5], [-0.3, -0.3, 0.45], [0.3, 0.3, 0.45], [0.3, -0.3, 0.45], [-0.3, 0.3, 0.45]]) R.disco(ri(cx + dx * sx), ri(cy + dy * sy), ri(r * Math.min(sx, sy) * 1.15), hex('#fbf6ea')); };
// marco de cuadro dorado (x0, y0, x1, y1)
const marcoOro = (x0, y0, x1, y1) => { R.rect(x0, y0, x1, y1, hex('#3a2408')); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#a07a28')); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#f0d070')); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, hex('#d8b050'));
  R.rect(x0 + 2, y0 + 2, x1 - 2, y1 - 2, hex('#6a4a14')); for (let x = x0 + 3; x < x1 - 2; x += 3) R.pset(x, y0 + 1, hex('#fff0a0')); };
// sombra suave en el suelo
const sombra = (cx, y, w, a = 0.35) => { for (let x = -w; x <= w; x++) for (let j = 0; j < 2; j++) if (Math.abs(x) < w - j * 2) tine(cx + x, y + j, K, a * (1 - Math.abs(x) / (w + 1))); };
const TL = { THATS: en('victor', 0.0000), VICTOR: en('victor', 0.0136), HERO: en('victor', 0.0422), SOMEONE: en('victor', 0.0987), CREATES: en('victor', 0.1169), LIFE: en('victor', 0.1363), ABANDONS: en('victor', 0.1526), MOMENT: en('victor', 0.1792), SEES: en('victor', 0.1948), CREATURE: en('victor', 0.2435), ALONE: en('victor', 0.2655), REJECTED: en('victor', 0.2889), ENDS: en('victor', 0.3246), HURTING: en('victor', 0.3396), EVERYONE: en('victor', 0.3506), LOVES: en('victor', 0.3785), MARY: en('victor', 0.4382), GREW: en('victor', 0.4798), MOTHER: en('victor', 0.5077), LOST: en('victor', 0.5421), DAUGHTER: en('victor', 0.5609), WROTE: en('victor', 0.5941), BOOK: en('victor', 0.6096), BOTH: en('victor', 0.6239), SIDES: en('victor', 0.6343), FROM: en('victor', 0.6850), CREATES2: en('victor', 0.7168), DOESNT: en('victor', 0.7707), CARE: en('victor', 0.7966), AND2: en('victor', 0.8226), FROM2: en('victor', 0.8401), ARRIVES: en('victor', 0.8667), WORLD: en('victor', 0.8934), NOONE: en('victor', 0.9297), WILLING: en('victor', 0.9505), CARE2: en('victor', 0.9700), THEM: en('victor', 0.9856), ON: en('enero', 0.0003), JANUARY: en('enero', 0.0070), FIRST: en('enero', 0.0284), Y1818: en('enero', 0.0852), FRANK: en('enero', 0.1622), PROMETHEUS: en('enero', 0.2684), GOES: en('enero', 0.3032), SALE: en('enero', 0.3403), THREE: en('enero', 0.3915), SMALL: en('enero', 0.4033), VOLUMES: en('enero', 0.4235), JUST: en('enero', 0.4769), N500: en('enero', 0.4904), COPIES: en('enero', 0.5196), WITHOUT: en('enero', 0.5865), NAME: en('enero', 0.6349), MARYE: en('enero', 0.6832), TWENTY: en('enero', 0.7057), MANY: en('enero', 0.7647), READERS: en('enero', 0.7765), ASSUME: en('enero', 0.7945), MAN: en('enero', 0.8721), MOST: en('enero', 0.9080), HUSBAND: en('enero', 0.9440), FIVE: en('teatro', 0.0002), LATER: en('teatro', 0.0231), LONDON: en('teatro', 0.0589), PLAY: en('teatro', 0.1030), HUGE: en('teatro', 0.1728), HIT: en('teatro', 0.1875), DRAWING: en('teatro', 0.2168), CROWDS: en('teatro', 0.2315), NIGHT: en('teatro', 0.2517), NIGHT2: en('teatro', 0.2839), MARYT: en('teatro', 0.3252), SEE: en('teatro', 0.3674), PLAYBILL: en('teatro', 0.4179), MONSTER: en('teatro', 0.4619), NONAME: en('teatro', 0.4913), NAMET: en('teatro', 0.5033), PLACE: en('teatro', 0.5519), DASH: en('teatro', 0.6052), MARYH: en('teatro', 0.6896), HILARIOUS: en('teatro', 0.7374), WRITES: en('teatro', 0.7897), FRIEND: en('teatro', 0.8163), SURPRISE: en('teatro', 0.8732), FAMOUS: en('teatro', 0.9632) };
const P = { P2: en('victor', 0.1509), P3: en('victor', 0.2857), P4: en('victor', 0.4350), P5: en('victor', 0.5908), P6: en('victor', 0.8197), P7: en('victor', 1.0096), P8: en('enero', 0.2976), P9: en('enero', 0.6770), P10: en('enero', 1.0143), P11: en('teatro', 0.2122), P12: en('teatro', 0.4041), P13: en('teatro', 0.6841) };

const penumbra = (x0, y0, x1, y1, a) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = Math.min((x - x0) / Math.max(1, x1 - x0), 1) * Math.min(1, (y1 - y) / Math.max(1, y1 - y0) + 0.3); if (u > 0) tine(x, y, K, a * u); } };
const TOMO = [hex('#7a2a22'), hex('#4e1a16')];

// ═══ 1 · el hielo del Ártico: Victor camina hacia el barco con su farol; la criatura sale de la ventisca, lejos ═══════
const p1 = (t) => {
  const o = { encuadre: 'artico' };
  T.libro(R, t, o);
  // las huellas de Victor en la nieve
  const va = tramo(t, 1.4, TL.HERO + 0.6), vx = ri(lerp(58, 124, ease(va)));
  for (let x = 50; x < vx; x += 6) { R.pset(x, 151, hex('#8aa0b8')); R.pset(x + 3, 152, hex('#8aa0b8')); R.pset(x + 1, 151, hex('#b8c8d8')); }
  // la criatura: sale de la ventisca por la izquierda y alarga la mano
  const ce = tramo(t, TL.HERO - 0.3, TL.SOMEONE + 0.4), cx = ri(lerp(-8, 20, ease(ce)));
  conAlfa(() => R.actor(MS.criaturaMS, cx, 152, t, { dir: 1, anda: ce > 0 && ce < 1, dedo: t > TL.CREATES - 0.1, triste: t < TL.CREATES - 0.1 }), tramo(t, TL.HERO - 0.3, TL.SOMEONE + 0.6));
  // Victor con el farol: se vuelve en «life» y la ve
  const mira = t > TL.LIFE - 0.15;
  const rv = R.actor(MS.victorMS, vx, 152, t, { dir: mira ? -1 : 1, anda: va > 0 && va < 1, sostiene: true, sorpresa: mira });
  const [hx, hy] = rv.mano.map(ri);
  halo(hx, hy + 4, 22, hex('#ffd890'), 0.4);
  R.rect(hx - 2, hy, hx + 2, hy + 7, K); R.rect(hx - 1, hy + 1, hx + 1, hy + 6, hex('#ffd06a')); R.pset(hx, hy + 2, hex('#fff6d0')); R.rect(hx - 1, hy - 2, hx + 1, hy - 1, K);
  if (mira) { const s = Math.min(1, (t - TL.LIFE + 0.15) / 0.25); R.icono('!', vx + (rv.mano[0] > vx ? -2 : 14), 118 - ri(s * 4), hex('#ffe070'), K, 2); }
  T.libroDelante(R, t, o);
};

// ═══ 2 · el barco de cerca: Victor sube por la escala sin volverse; la criatura se queda sola en el hielo ═══════════
const p2 = (t) => {
  const o = { encuadre: 'artico', camara: 'barco' };
  T.libro(R, t, o);
  const sube = tramo(t, TL.ABANDONS + 0.05, TL.SEES + 0.7), arriba = sube >= 1, va = tramo(t, TL.ALONE, TL.REJECTED);
  const vy = ri(lerp(160, 87, ease(sube))), vx = ri(123 + (arriba ? 14 * ease(va) : 0));
  // la criatura, a la izquierda: tiende la mano hacia él mientras sube; en «alone» la baja
  const tiende = t > TL.MOMENT - 0.2 && t < TL.ALONE;
  R.actor(MS.criaturaMS, 40, 160, t, { dir: 1, dedo: tiende, triste: t > TL.ALONE - 0.1, sorpresa: t > TL.SEES && t < TL.SEES + 0.5 });
  if (t > TL.ALONE) { const u = Math.min(1, (t - TL.ALONE) / 0.4); for (let k = 0; k < 3; k++) tine(56 + k * 2, 132 + ri(u * 4) + k, hex('#9ad0ff'), 0.0); }
  // Victor: sube sin mirar atrás; arriba se asoma un instante y se va por la cubierta
  const rv = R.actor(MS.victorMS, vx, vy, t, { dir: arriba && t < TL.ALONE ? -1 : 1, anda: (sube > 0 && sube < 1) || (va > 0 && va < 1), sorpresa: arriba && t < TL.ALONE });
  halo(vx + 8, vy - 14, 18, hex('#ffd890'), 0.28);
  // un marinero le tiende la mano desde la borda
  if (sube > 0.55 && t < TL.ALONE + 0.3) R.actor(MS.edwardMS, 140, 88, t, { dir: -1, sostiene: [133, ri(vy - 18)], habla: Math.sin(t * 9) > 0.3 });
  T.libroDelante(R, t, o);
};

// ═══ 3 · la casa de los Frankenstein en Ginebra, de noche: tres retratos y cuatro velas que se apagan una a una ═══════
const barras3 = (x, y) => x === 50 || x === 51 || y === 70 || y === 71;
const fondo3 = () => capa('p3', () => {
  damasco(0, 0, 319, 99, pal('#121c16', '#1a261e', '#1e2c24', '#24342a'), 31);
  R.rect(0, 100, 319, 103, hex('#3a2a18')); R.rect(0, 100, 319, 100, hex('#6a4a2a'));
  R.rect(0, 104, 319, 149, hex('#2a1c10'));
  for (let x = 4; x < 320; x += 46) { R.rect(x, 108, x + 40, 145, hex('#1e140a')); tablas(x + 1, 109, x + 39, 144, pal('#24160c', '#3a2616', '#4a3220', '#5a3e26'), 40, x, true, false); R.rect(x + 1, 109, x + 39, 109, hex('#6a4a2c')); }
  R.rect(0, 150, 319, 151, hex('#140c06'));
  tablas(0, 152, 319, 179, pal('#22140a', '#462c18', '#5a3a20', '#704c2a'), 7, 43, false, false);
  for (let y = 160; y <= 179; y++) for (let x = 100; x <= 280; x++) { const bx = x - 100, by = y - 160, borde = bx < 4 || bx > 176 || by < 3;
    R.pset(x, y, borde ? ((bx + by) % 4 < 2 ? hex('#6a2420') : hex('#b89048')) : tono(pal('#2a1010', '#4a1a18', '#6a2420'), 1 + Math.sin(bx * 0.4) * Math.cos(by * 0.7) * 0.9, x, y)); }
  // la ventana
  R.rect(14, 24, 88, 122, hex('#140c06')); R.rect(16, 26, 86, 120, hex('#5a3a1e')); R.rect(16, 26, 86, 27, hex('#7a5530'));
  R.rect(10, 118, 92, 124, hex('#6a4a28')); R.rect(10, 118, 92, 118, hex('#8a6a40')); R.rect(10, 124, 92, 125, hex('#1a1008'));
  // el cuadro del Mont Blanc
  marcoOro(146, 26, 240, 74);
  for (let y = 30; y <= 70; y++) for (let x = 150; x <= 236; x++) { const m = 58 - Math.max(0, 24 - Math.abs(x - 198) * 0.55) - Math.max(0, 12 - Math.abs(x - 166) * 0.6);
    R.pset(x, y, y < m ? tono(pal('#2a4a6a', '#4a6a8a', '#7a98b0'), (y - 30) / 26 * 2, x, y) : y < m + 4 && y < 62 ? hex('#d8dce4') : y < 62 ? tono(pal('#3a4a5a', '#5a6a7a'), hh(x, y, 3), x, y) : tono(pal('#1e3a22', '#2e4a2a', '#3e5a32'), hh(x >> 1, y, 5) * 2, x, y)); }
  // el reloj de pared, por debajo de la zona de Atom
  R.rect(282, 54, 306, 104, hex('#1a0e06')); R.rect(283, 55, 305, 103, hex('#4a2e18')); R.rect(283, 55, 284, 103, hex('#6a4426'));
  R.disco(294, 66, 9, hex('#c8a040')); R.disco(294, 66, 7, hex('#efe6d0'));
  for (let k = 0; k < 12; k++) R.pset(ri(294 + Math.cos(k * Math.PI / 6) * 6), ri(66 + Math.sin(k * Math.PI / 6) * 6), K);
  R.linea(294, 66, 294, 61, K); R.linea(294, 66, 297, 68, K); R.rect(287, 78, 301, 100, hex('#24160a'));
  // la silla tapizada
  R.rect(262, 104, 300, 108, hex('#3a2414')); R.rect(264, 108, 298, 134, hex('#5a2422')); for (let y = 110; y < 134; y += 6) for (let x = 268; x < 296; x += 7) R.pset(x + (y % 12 ? 3 : 0), y, hex('#c8a050'));
  R.rect(260, 134, 302, 140, hex('#6a2a26')); R.rect(260, 134, 302, 134, hex('#8a3a32')); R.rect(262, 140, 264, 152, hex('#3a2414')); R.rect(298, 140, 300, 152, hex('#3a2414'));
  // la consola
  R.rect(112, 112, 266, 118, hex('#b8b0a0')); R.rect(112, 112, 266, 112, hex('#f0ece4')); for (let x = 114; x < 266; x += 5) R.pset(x, 114 + (x % 3 ? 1 : 0), hex('#8a8478'));
  R.rect(116, 119, 262, 132, hex('#2a180c')); R.rect(117, 120, 261, 131, hex('#5a3a20')); R.rect(117, 120, 261, 120, hex('#7a5430'));
  R.rect(170, 122, 210, 129, hex('#2a180c')); R.rect(171, 123, 209, 128, hex('#4a3018')); R.pset(190, 125, hex('#f0d070'));
  for (const lx of [122, 256]) for (let j = 0; j < 18; j++) { const dx = ri(Math.sin(j / 18 * Math.PI) * 3) * (lx < 190 ? 1 : -1); R.rect(lx + dx - 1, 132 + j, lx + dx + 1, 132 + j, hex('#4a2e18')); R.pset(lx + dx - 1, 132 + j, hex('#6a4426')); }
  penumbra(250, 0, 319, 50, 0.55);
});
const retrato = (cx, cy, quien, luz) => {
  for (let y = -14; y <= 14; y++) for (let x = -10; x <= 10; x++) { const d = (x / 10.5) ** 2 + (y / 14.5) ** 2; if (d > 1) continue;
    R.pset(cx + x, cy + y, d > 0.66 ? (d > 0.92 ? hex('#3a2408') : x + y < -4 ? hex('#f0d070') : hex('#b08a30')) : tono(pal('#1a2234', '#2a3650', '#3a4a6a'), 1.2 - y / 14, cx + x, cy + y)); }
  const coat = quien === 0 ? hex('#2a2a32') : quien === 1 ? hex('#c8c0d8') : hex('#3a5a9a'), skin = hex('#f2c8a0'), pelo = quien === 0 ? hex('#a8a8b0') : quien === 1 ? hex('#5a3a22') : hex('#d8b060');
  for (let y = 4; y <= 10; y++) for (let x = -7; x <= 7; x++) if ((x / 7.5) ** 2 + ((y - 10) / 6.5) ** 2 <= 1) R.pset(cx + x, cy + y, x < -3 ? mez(coat, hex('#ffffff'), 0.15) : coat);
  R.rect(cx - 1, cy + 1, cx + 1, cy + 4, skin); R.disco(cx, cy - 3, 4, skin);
  if (quien === 1) { R.disco(cx, cy - 6, 4, pelo); R.disco(cx + 3, cy - 8, 2, pelo); R.rect(cx - 4, cy - 6, cx - 4, cy - 1, pelo); R.rect(cx + 4, cy - 6, cx + 4, cy - 1, pelo); }
  else if (quien === 0) { R.rect(cx - 4, cy - 7, cx + 4, cy - 6, pelo); R.rect(cx - 5, cy - 5, cx - 4, cy - 1, pelo); R.rect(cx + 4, cy - 5, cx + 5, cy - 1, pelo); }
  else { R.rect(cx - 4, cy - 7, cx + 4, cy - 5, pelo); R.pset(cx - 4, cy - 4, pelo); R.pset(cx + 4, cy - 4, pelo); }
  R.disco(cx, cy - 3, 4, skin); if (quien === 1) R.rect(cx - 4, cy - 7, cx + 3, cy - 6, pelo); else R.rect(cx - 4, cy - 7, cx + 4, cy - 6, pelo);
  R.pset(cx - 2, cy - 3, K); R.pset(cx + 1, cy - 3, K); R.pset(cx - 1, cy, hex('#c07a6a')); R.pset(cx, cy, hex('#c07a6a'));
  if (quien === 1) R.pset(cx, cy + 5, hex('#e8e0f0'));
  // el caballete
  R.linea(cx - 6, cy + 13, cx - 9, cy + 20, hex('#6a4a1a')); R.linea(cx + 6, cy + 13, cx + 9, cy + 20, hex('#6a4a1a'));
  if (luz > 0) tine(cx - 6, cy - 10, hex('#fff0c0'), 0.6 * luz);
};
const p3 = (t) => {
  pegar(fondo3());
  const L1 = TL.REJECTED + 0.4, L2 = TL.LOVES + 0.5, flash = Math.max(0, 1 - Math.abs(t - L1) / 0.12) + Math.max(0, 1 - Math.abs(t - L2) / 0.12);
  // por la ventana: la noche de tormenta sobre el lago, la lluvia y la sombra enorme que pasa
  porHueco(17, 27, 85, 117, () => {
    for (let y = 27; y <= 117; y++) for (let x = 17; x <= 85; x++) R.pset(x, y, tono(pal('#080c18', '#101a2c', '#1a2640'), (y - 27) / 50 * 2 + hh(x >> 2, y >> 2, 7) * 0.4, x, y));
    nubes(t, 28, 60, [pal('#141a28', '#1c2436', '#262e44'), pal('#1a2232', '#242e42', '#30384e'), pal('#202838', '#2c3648', '#3a4458')], 3, 1.5);
    for (let x = 17; x <= 85; x++) { const m = 86 - ri(Math.sin(x * 0.07) * 6 + Math.sin(x * 0.19) * 3); for (let y = m; y <= 96; y++) R.pset(x, y, hex('#0a0e1a')); }
    for (let y = 97; y <= 117; y++) for (let x = 17; x <= 85; x++) R.pset(x, y, tono(pal('#080c16', '#121c30', '#24344e'), hh(x >> 1, y, 9) + (Math.sin(x * 0.5 + t * 2 + y) > 0.85 ? 1 : 0), x, y));
    for (let k = 0; k < 4; k++) { const lx = 30 + k * 14; R.pset(lx, 99, hex('#ffd070')); R.pset(lx, 100, hex('#8a6a30')); }
    const s = tramo(t, TL.REJECTED - 0.3, TL.ENDS + 0.5); if (s > 0 && s < 1) { const sx = ri(lerp(-6, 108, s)), sy = 70 + ri(Math.abs(Math.sin(s * 14)) * 2);
      R.disco(sx, sy - 6, 9, hex('#020308')); R.disco(sx - 3, sy - 12, 7, hex('#020308')); R.rect(sx - 15, sy + 2, sx + 15, 117, hex('#020308')); R.disco(sx - 12, sy + 6, 6, hex('#020308')); R.disco(sx + 12, sy + 6, 6, hex('#020308')); }
    for (let k = 0; k < 46; k++) { const x = 17 + ((hh(k, 1, 2) * 70 + t * 22) % 70), y = 27 + ((hh(k, 2, 2) * 96 + t * 150) % 92); R.linea(ri(x), ri(y), ri(x - 1), ri(y + 4), hex('#4a5a7a')); }
    if (flash > 0) velo(hex('#dce4ff'), Math.min(0.85, flash), 27, 117);
  }, 0, barras3);
  // las cortinas de terciopelo, que el viento infla desde «ends»
  const viento = tramo(t, TL.ENDS - 0.2, TL.ENDS + 0.6);
  for (const [x0, w, lado] of [[6, 12, -1], [84, 12, 1]]) for (let y = 24; y <= 126; y++) { const ola = ri(viento * Math.sin(t * 6 + y * 0.12) * 2.4 * (y - 24) / 102), ww = w + ri(viento * (y - 24) / 102 * 5);
    for (let i = 0; i < ww; i++) { const x = (lado < 0 ? x0 + i : x0 + i) + ola * (lado < 0 ? 1 : -1) + (lado > 0 && i > w ? 0 : 0); const f = Math.sin((i + y * 0.04) * 1.3);
      R.pset(x, y, f > 0.6 ? hex('#8a2a2a') : f > -0.2 ? hex('#6a1e20') : hex('#3e1014')); } }
  R.rect(2, 21, 100, 23, hex('#a07a28')); R.rect(2, 21, 100, 21, hex('#f0d070')); R.disco(3, 22, 2, hex('#f0d070')); R.disco(99, 22, 2, hex('#f0d070'));
  // el péndulo del reloj
  const pa = Math.sin(t * 3.1) * 0.35; R.linea(294, 80, ri(294 + Math.sin(pa) * 14), ri(80 + Math.cos(pa) * 14), hex('#c8a040')); R.disco(ri(294 + Math.sin(pa) * 14), ri(80 + Math.cos(pa) * 14), 2, hex('#e8c060'));
  // las cuatro velas se apagan una a una: «hurting», «everyone», «he», «loves»
  const AP = [TL.HURTING, TL.EVERYONE, TL.EVERYONE + 0.42, TL.LOVES];
  let n = 0; for (const a of AP) if (t > a) n++;
  [130, 170, 210, 250].forEach((x, k) => vela(x, 112, t, t < AP[k], k, 9, t - AP[k]));
  // los tres retratos (el padre, Elizabeth y el pequeño William)
  [[150, 0], [190, 1], [230, 2]].forEach(([x, q]) => retrato(x, 92, q, 1 - n / 4));
  velo(hex('#04060e'), 0.1 * n);
  if (flash > 0) { velo(hex('#c8d4ff'), 0.25 * Math.min(1, flash)); rayo([[17, 27], [85, 27], [200, 179], [40, 179]], hex('#e8f0ff'), 0.3 * Math.min(1, flash)); }
};

// ═══ 4 · Marlow, 1817: el jardín junto al Támesis; Mary escribe; saca el retrato de su madre; una mariposa se va ═══════
const fondo4c = () => cieloG('p4c', 70, pal('#7a8ca6', '#93a3b9', '#aebbcb', '#c6d0da'), 4);
const fondo4 = () => capa('p4', () => {
  // la otra orilla: setos, olmos, casas y la torre de la iglesia
  for (let x = 0; x < 320; x++) { const m = 84 + ri(Math.sin(x * 0.05) * 3 + hh(x >> 2, 1, 4) * 2); for (let y = m; y <= 98; y++) R.pset(x, y, tono(pal('#2a3a26', '#3a4c30', '#4a5e38'), 1 + hh(x >> 1, y, 2) * 0.8 - (y - m) * 0.05, x, y)); }
  R.rect(196, 46, 214, 90, hex('#8a8478')); for (let y = 48; y < 90; y += 4) R.linea(196, y, 214, y, hex('#6a665e')); R.rect(196, 46, 198, 90, hex('#a8a296'));
  R.poligono([[194, 46], [205, 22], [216, 46]], hex('#5a5e66')); R.linea(205, 22, 194, 46, hex('#7a7e86')); R.rect(203, 56, 207, 64, hex('#2a2620')); R.rect(204, 18, 206, 22, hex('#c8a040'));
  for (const [x, w, c] of [[226, 22, '#b8a088'], [252, 18, '#c8b8a0'], [150, 26, '#a89078']]) { R.rect(x, 74, x + w, 90, hex(c)); R.poligono([[x - 2, 74], [x + w / 2, 64], [x + w + 2, 74]], hex('#6a3a2a')); R.rect(x + 4, 78, x + 7, 82, hex('#3a3a4a')); R.rect(x + w - 8, 78, x + w - 5, 82, hex('#3a3a4a')); }
  for (const [x, y, w] of [[18, 70, 36], [62, 74, 28], [100, 66, 40], [140, 72, 22], [176, 70, 18], [236, 66, 26], [270, 68, 34], [300, 72, 30]]) copa(x, y, w, w * 0.7, 0, pal('#22341e', '#33482a', '#46603a', '#5a7848'), x);
  // la orilla de acá: césped con flores, el camino de grava y el borde del agua
  for (let y = 124; y <= 179; y++) for (let x = 0; x < 320; x++) { const borde = y < 126 + ri(Math.sin(x * 0.2) * 1.5);
    if (borde) { R.pset(x, y, hex('#4a5a2a')); continue; }
    const camino = Math.abs(x - (250 + (y - 124) * 0.9)) < 10 + (y - 124) * 0.25;
    R.pset(x, y, camino ? tono(pal('#8a7a5a', '#a89878', '#c4b494'), 1 + hh(x, y, 8) * 1.1, x, y) : tono(pal('#3a5a26', '#4a6e2e', '#5e8438', '#74984a'), 1.4 + hh(x >> 1, y, 6) * 1.2 + (Math.sin(x * 0.8 + y) > 0.9 ? 1 : 0), x, y)); }
  for (let k = 0; k < 70; k++) { const x = ri(hh(k, 1, 9) * 320), y = ri(132 + hh(k, 2, 9) * 46); if (Math.abs(x - 250 - (y - 124) * 0.9) < 14) continue; const c = [hex('#f0e8f0'), hex('#e8c040'), hex('#d86a8a'), hex('#a8b8f0')][k % 4]; R.pset(x, y, c); R.pset(x + 1, y + 1, mez(c, K, 0.3)); }
  // los juncos del borde
  for (let k = 0; k < 40; k++) { const x = ri(hh(k, 3, 9) * 320), h = 4 + ri(hh(k, 4, 9) * 5); R.linea(x, 127, x + (k % 2 ? 1 : -1), 127 - h, hex('#5a6a2a')); }
  // el tronco del sauce
  for (let y = 40; y <= 150; y++) { const w = 6 + ri(Math.max(0, y - 120) * 0.25), cx = 34 + ri(Math.sin(y * 0.05) * 2); for (let i = -w; i <= w; i++) R.pset(cx + i, y, i < -w + 2 ? hex('#5a4a36') : i > w - 3 ? hex('#22180e') : tono(pal('#2e2216', '#3e3020', '#4e3e2a'), 1 + Math.sin(y * 0.6 + i) * 0.7, cx + i, y)); }
});
const sauce = (t) => {
  for (let k = 0; k < 16; k++) { const cx = 6 + hh(k, 1, 13) * 86, cy = 24 + hh(k, 2, 13) * 26, r = 7 + ri(hh(k, 3, 13) * 6), m = ri(Math.sin(t * 1.1 + k) * 1.2);
    R.disco(cx + m, cy + 2, r, hex('#2e4a1e')); R.disco(cx + m - 1, cy, r - 2, hex('#46682a')); }
  for (let k = 0; k < 70; k++) { const x0 = 2 + hh(k, 1, 11) * 96, y0 = 26 + hh(k, 2, 11) * 26, l = 34 + hh(k, 3, 11) * 70, sw = Math.sin(t * 1.1 + k * 0.7) * 3;
    for (let j = 0; j < l; j++) { const u = j / l, x = ri(x0 + sw * u * u + Math.sin(j * 0.15 + k) * 1.2), y = ri(y0 + j); if (y > 150) break; R.pset(x, y, j % 6 === 0 ? hex('#b8d080') : (k % 3 === 0 ? hex('#5a7c32') : hex('#729a40'))); if (j % 3 === 1) R.pset(x + 1, y, hex('#8ab050')); } }
  for (let k = 0; k < 40; k++) { const x = ri(4 + hh(k, 5, 13) * 90), y = ri(22 + hh(k, 6, 13) * 22); R.pset(x, y, hex('#c8e090')); } };
const cisne = (x, y, d, t) => { x = ri(x); y = ri(y); const W = hex('#f8f6f0'), S = hex('#c8ccd4');
  R.rect(x - 5, y - 2, x + 5, y + 1, W); R.rect(x - 4, y + 1, x + 4, y + 1, S); R.pset(x - 5 * d, y - 3, W); R.pset(x - 6 * d, y - 3, W);
  R.rect(x + 4 * d, y - 8, x + 4 * d + d, y - 2, W); R.pset(x + 5 * d, y - 9, W); R.pset(x + 6 * d, y - 9, hex('#e8803a')); R.pset(x + 5 * d, y - 9, K);
  for (let i = -6; i <= 6; i++) if ((i + ri(t * 4)) % 3 === 0) R.pset(x + i, y + 2, hex('#c8d4e0')); };
const p4 = (t) => {
  pegar(fondo4c());
  nubes(t, 8, 60, NUBES_GRIS, 4, 0.9);
  pajaros(t, 4, 22, 46, hex('#3a4250'), 4, 12, 100, 330);
  agua(96, 125, pal('#4a5a66', '#5e7080', '#7a8c9a', '#b8c8d4'), t, 4, 0.6);
  for (let x = 0; x < 320; x += 1) if (hh(x, 1, 4) > 0.5) R.pset(x, 97, hex('#3a4a3a'));
  pegar(fondo4());
  // los cisnes y la barca de pértiga que pasan por el río
  cisne(lerp(280, 150, (t - 14.9) / 5), 116, -1, t); cisne(lerp(300, 172, (t - 14.9) / 5), 120, -1, t + 1);
  { const bx = ri(lerp(60, 170, (t - 14.9) / 5)); R.rect(bx - 16, 104, bx + 16, 106, hex('#4a2e18')); R.rect(bx - 16, 104, bx + 16, 104, hex('#7a5430')); R.rect(bx + 9, 95, bx + 11, 103, hex('#3a3a5a')); R.disco(bx + 10, 93, 2, hex('#f2c8a0')); R.pset(bx + 10, 91, hex('#3a2a1a')); R.pset(bx + 11, 91, hex('#3a2a1a'));
    const pp = Math.sin(t * 1.7) * 3; R.linea(bx + 12, 96, ri(bx + 4 + pp), 110, hex('#8a6a40')); for (let i = -14; i < 14; i += 3) R.pset(bx + i, 107, hex('#a8b8c4')); }
  sauce(t);
  // Mary, sentada a la mesita del jardín: escribe; en «mother» alza el retratito de su madre y lo mira; en «daughter», triste
  const alza = t > TL.MOTHER - 0.25 && t < TL.DAUGHTER + 0.7, escribe = !alza;
  const rm = R.actor(MS.maryMS, 146, 147, t, { dir: 1, sostiene: alza ? [166, 129] : [172 + ri(Math.sin(t * 6) * 2), 139], triste: t > TL.MOTHER && t < TL.WROTE, sonrisa: t < TL.GREW - 0.4 });
  // la mesita con el mantel
  R.rect(126, 140, 206, 141, hex('#e8e4dc')); for (let y = 142; y <= 164; y++) for (let x = 124; x <= 208; x++) { const pl = Math.sin((x - 124) * 0.42 + (y - 142) * 0.05), enc = y > 150 && y < 158 && ((x + (y % 2)) % 3 === 0 || (y === 154 && x % 2 === 0));
    R.pset(x, y, enc ? hex('#d8d0c4') : pl > 0.7 ? hex('#ffffff') : pl < -0.6 ? hex('#c8c2b8') : hex('#eeeae2')); }
  for (let x = 124; x <= 208; x += 4) { R.pset(x, 165, hex('#e8e4dc')); R.pset(x + 1, 166, hex('#e8e4dc')); R.pset(x + 2, 165, hex('#e8e4dc')); } R.rect(124, 143, 125, 164, hex('#b8b2a8'));
  R.rect(128, 165, 130, 170, hex('#6a6a6a')); R.rect(202, 165, 204, 170, hex('#6a6a6a')); sombra(166, 170, 46, 0.3);
  // en la mesa: el cuaderno, el tintero, la taza con su vapor, el florero y dos libros
  R.rect(166, 136, 186, 140, hex('#2a1a10')); R.rect(167, 136, 176, 139, hex('#f4ecd8')); R.rect(177, 136, 185, 139, hex('#ece2c8')); for (let x = 168; x < 185; x += 2) R.pset(x, 137 + (x % 4 ? 1 : 0), hex('#5a4a3a'));
  R.rect(190, 134, 194, 139, K); R.rect(191, 135, 193, 138, hex('#2a2a4a'));
  R.rect(132, 135, 140, 139, hex('#f0ece4')); R.rect(140, 136, 141, 137, hex('#f0ece4')); R.rect(133, 135, 139, 135, hex('#8a5a3a'));
  for (let k = 0; k < 3; k++) { const u = ((t * 0.6 + k / 3) % 1); tine(136 + Math.sin(t * 2 + k * 2) * 2, 133 - u * 10, hex('#ffffff'), 0.6 * (1 - u)); }
  R.rect(198, 128, 203, 139, hex('#4a6a8a')); R.rect(199, 129, 200, 137, hex('#7a9aba'));
  for (const [x, y, c] of [[198, 124, '#d84a6a'], [202, 122, '#f0a0b0'], [200, 120, '#d84a6a'], [196, 121, '#e8c040']]) { R.disco(x, y, 2, hex(c)); R.pset(x - 1, y - 1, hex('#ffffff')); }
  R.rect(148, 136, 162, 139, hex('#3a4a6a')); R.rect(149, 133, 161, 135, hex('#6a2a22')); R.rect(149, 133, 161, 133, hex('#8a3a2a'));
  const [hx, hy] = rm.mano.map(ri);
  if (escribe) pluma(hx, hy + 1, t, true);
  else { R.linea(hx - 1, hy - 1, hx - 3, hy - 6, hex('#c8a040')); for (let y = -3; y <= 3; y++) for (let x = -2; x <= 2; x++) if ((x / 2.6) ** 2 + (y / 3.6) ** 2 <= 1) R.pset(hx + x, hy + y + 2, (x / 2.6) ** 2 + (y / 3.6) ** 2 > 0.6 ? hex('#e8c040') : hex('#f4e8d8'));
    R.pset(hx, hy + 1, hex('#5a3a2a')); R.pset(hx, hy + 2, hex('#e8b090')); R.pset(hx - 1, hy + 1, hex('#5a3a2a')); halo(hx, hy + 2, 10, hex('#fff0c0'), 0.35); }
  // la mariposa blanca que se va de las flores en «daughter»
  const mv = tramo(t, TL.DAUGHTER - 0.1, TL.DAUGHTER + 1.6); if (mv > 0 && mv < 1) { const x = ri(lerp(200, 262, mv) + Math.sin(mv * 20) * 4), y = ri(lerp(120, 60, mv) + Math.sin(mv * 31) * 3), a = Math.sin(t * 26) > 0;
    R.pset(x, y, K); R.pset(x - 1, y - (a ? 1 : 0), hex('#ffffff')); R.pset(x + 1, y - (a ? 1 : 0), hex('#ffffff')); R.pset(x - 2, y - (a ? 2 : 0), hex('#f4f4f0')); R.pset(x + 2, y - (a ? 2 : 0), hex('#f4f4f0')); }
};
const NUBES_GRIS = [pal('#8090a6', '#98a6ba', '#b4bfcd'), pal('#8c9aae', '#a6b2c4', '#c4ccd8'), pal('#98a6b8', '#b6c0ce', '#d4dae2')];

// ═══ 5 · el manuscrito abierto (inserto sobre su mesa): la mano de Mary escribe las dos caras de la historia ═══════
const fondo5 = () => capa('p5', () => {
  damasco(0, 0, 319, 24, pal('#141c18', '#1a241e', '#1e2a22', '#223026'), 5);
  R.rect(0, 24, 319, 27, hex('#1a0e06')); R.rect(0, 25, 319, 25, hex('#4a2e18'));
  tablas(0, 28, 319, 179, pal('#2a160a', '#4a2a14', '#5e381c', '#744826'), 11, 51, false, false);
  // los libros apilados y el retratito de la madre, a la izquierda
  for (const [y, w, c] of [[164, 40, '#6a2a22'], [156, 36, '#2a4a3a'], [149, 38, '#3a3a5a'], [143, 32, '#7a5a2a']]) { R.rect(4, y, 4 + w, y + 6, K); R.rect(5, y + 1, 3 + w, y + 5, hex(c)); R.rect(5, y + 1, 3 + w, y + 1, mez(hex(c), hex('#ffffff'), 0.25)); R.rect(4 + w - 4, y + 1, 3 + w, y + 5, hex('#ece2c8')); }
  for (let y = -11; y <= 11; y++) for (let x = -8; x <= 8; x++) { const d = (x / 8.5) ** 2 + (y / 11.5) ** 2; if (d <= 1) R.pset(22 + x, 128 + y, d > 0.7 ? (x + y < -3 ? hex('#f0d070') : hex('#a07a28')) : tono(pal('#2a2a3a', '#3a3a50'), 1 - y / 11, 22 + x, 128 + y)); }
  R.disco(22, 126, 3, hex('#f2c8a0')); R.rect(19, 121, 25, 123, hex('#6a3a22')); R.rect(18, 123, 19, 128, hex('#6a3a22')); R.rect(25, 123, 26, 128, hex('#6a3a22')); R.rect(18, 131, 26, 136, hex('#f0ece4')); R.pset(21, 126, K); R.pset(23, 126, K);
  // el tintero, la salvadera y una carta lacrada, a la derecha
  R.rect(282, 124, 300, 140, K); R.rect(283, 125, 299, 139, hex('#2a2a3a')); R.rect(285, 121, 297, 125, hex('#4a4a5a')); R.rect(287, 122, 295, 123, hex('#0a0a14')); R.pset(284, 127, hex('#8a8aa0'));
  R.rect(302, 130, 310, 144, hex('#8a6a2a')); R.rect(302, 130, 310, 131, hex('#c8a040')); for (let x = 303; x < 310; x += 2) R.pset(x, 130, hex('#3a2a10'));
  R.poligono([[276, 150], [316, 146], [318, 168], [280, 172]], hex('#e8dcc0')); R.linea(276, 150, 297, 160, hex('#c8bca0')); R.linea(316, 146, 297, 160, hex('#c8bca0')); R.disco(297, 161, 3, hex('#a02a22')); R.pset(296, 160, hex('#d04a3a'));
  // el libro abierto: tapas, cantos de las hojas y las dos páginas
  R.rect(46, 44, 274, 158, hex('#2a0e08')); R.rect(48, 46, 272, 156, hex('#5a1e16'));
  for (let k = 0; k < 4; k++) { R.rect(52 - k, 48 + k, 158, 152 - k, hex('#d8ccb0')); R.rect(162, 48 + k, 268 + k, 152 - k, hex('#d8ccb0')); R.linea(52 - k, 152 - k, 158, 152 - k, hex('#a89a7c')); R.linea(162, 152 - k, 268 + k, 152 - k, hex('#a89a7c')); }
  for (let y = 50; y <= 148; y++) for (let x = 54; x <= 266; x++) { if (x > 158 && x < 162) continue; const g = x < 160 ? (160 - x) : (x - 160), sombraG = g < 10 ? (10 - g) / 10 : 0;
    R.pset(x, y, tono(pal('#c8b894', '#e0d4b4', '#f0e6cc', '#f8f0dc'), 2.3 - sombraG * 2 - (y > 140 ? 0.3 : 0) + hh(x >> 1, y >> 1, 4) * 0.35, x, y)); }
  R.rect(159, 48, 161, 150, hex('#8a7a5a')); R.linea(160, 48, 160, 150, hex('#5a4a34'));
  // los renglones (solo trazos), dejando el hueco de cada dibujo
  for (const [x0, x1] of [[64, 152], [168, 256]]) for (let y = 56; y < 146; y += 6) { if (y > 58 && y < 116) continue; let x = x0 + (y % 12 ? 0 : 6); while (x < x1) { const w = 6 + ri(hh(x, y, 3) * 14); for (let i = 0; i < w && x + i < x1; i++) R.pset(x + i, y + ri(Math.sin((x + i) * 0.9 + y) * 0.8), hex('#4a3a2a')); x += w + 3; } }
});
const p5 = (t) => {
  pegar(fondo5());
  // la vela que tiembla y la polilla que la ronda
  vela(30, 112, t, true, 2, 14);
  { const a = t * 3.2, mx = ri(30 + Math.cos(a) * 14), my = ri(84 + Math.sin(a * 1.7) * 6); R.pset(mx, my, hex('#c8b8a0')); R.pset(mx - 1, my - (Math.sin(t * 30) > 0 ? 1 : 0), hex('#e8dcc8')); R.pset(mx + 1, my - (Math.sin(t * 30) > 0 ? 1 : 0), hex('#e8dcc8')); }
  rayo([[30, 92], [90, 50], [150, 150], [40, 160]], hex('#ffe8a0'), 0.12);
  // los dos dibujos en tinta, a escala 2: el que crea (Victor con su vela) y el que llega al mundo (la criatura)
  const iz = tramo(t, TL.BOTH - 0.1, TL.BOTH + 0.5), de = tramo(t, TL.SIDES - 0.05, TL.SIDES + 0.5), vuelve = t > TL.DOESNT;
  tinta(() => { R.linea(0, 30, 40, 30, K); R.rect(26, 20, 40, 21, K); R.rect(27, 22, 28, 30, K); R.rect(38, 22, 39, 30, K); R.rect(30, 14, 34, 19, K); R.pset(32, 13, K);
    R.actor(MS.victorMS, vuelve ? 2 + ri(Math.min(1, (t - TL.DOESNT) / 1.2) * -6) : 6, 30, t, { dir: vuelve ? -1 : 1, anda: vuelve && t < TL.DOESNT + 1.2, sostiene: !vuelve, quieto: !vuelve }); }, 41, 31, 70, 56, 2, iz);
  tinta(() => { R.linea(0, 30, 40, 30, K); for (let k = 0; k < 6; k++) R.pset(4 + k * 6, 29, K); R.disco(34, 6, 3, K); R.disco(35, 5, 2, 0);
    R.actor(MS.criaturaMS, 16, 30, t, { dir: -1, dedo: t > TL.SIDES + 0.4 && t < TL.CARE + 0.4, triste: t > TL.CARE }); }, 41, 31, 174, 56, 2, de);
  // marco de cada dibujo, a pluma
  if (iz > 0) R.rect(68, 54, 68, 54 + ri(iz * 62), hex('#4a3a2a')); if (de > 0) R.rect(256, 54, 256, 54 + ri(de * 62), hex('#4a3a2a'));
  // el brazo de Mary (canónico) con la pluma: escribe en la página de la derecha y, en «from the one who creates», pasa a la de la izquierda
  const pasa = tramo(t, TL.FROM - 0.2, TL.FROM + 0.4), alza = tramo(t, TL.DOESNT - 0.1, TL.DOESNT + 0.3) - tramo(t, TL.CARE + 0.2, TL.CARE + 0.6);
  const lin = ri(((t * 0.8) % 1) * 30), wx = ri(lerp(208 + lin, 100 + lin, ease(pasa))), wy = ri(140 - alza * 8 + Math.sin(t * 14) * (alza > 0.5 ? 0 : 0.6));
  T.brazo(R, wx + 44, 204, wx + 12, wy + 2, '#3e4a6e', -1, { codo: [wx + 40, 176] });
  pluma(wx, wy + 4, t, alza < 0.5);
};

// ═══ 6 · la criatura sobre un témpano que se aleja, de noche, hacia la bruma (el final del libro) ═══════════════════
const fondo6 = () => capa('p6', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 96 ? tono(pal('#03050f', '#070b1c', '#0c142a', '#132036'), y / 96 * 3.2 + hh(x >> 3, y >> 2, 6) * 0.4, x, y) : 0);
});
const aurora6 = (t) => { for (let x = 20; x < 268; x++) { const b = Math.sin(x * 0.045 + t * 0.35) * 0.5 + Math.sin(x * 0.11 - t * 0.6) * 0.5, top = ri(22 + Math.sin(x * 0.03 + t * 0.2) * 8 + b * 4), al = ri(26 + b * 14);
  if (b < -0.55) continue; const fa = Math.min(1, (x - 20) / 30, (268 - x) / 40);
  for (let j = 0; j < al; j++) { const u = j / al, a = (u < 0.15 ? u / 0.15 : (1 - u)) * 0.55 * fa * (0.6 + b * 0.4); if (((x + j) & 1) && a < 0.3) continue; tine(x, top + j, u < 0.5 ? hex('#5affb0') : hex('#3ac8a0'), a); }
  if ((x + ri(t * 6)) % 9 === 0) tine(x, top - 2, hex('#c890ff'), 0.4 * fa); } };
const tempano = (cx, y, w, sem) => { cx = ri(cx); y = ri(y); const h = Math.max(3, ri(w * 0.18));
  for (let j = 0; j <= h + 3; j++) { const ww = ri(w / 2 - Math.abs(j - h / 2) * 0.3 + Math.sin(j + sem) * 1.5); for (let i = -ww; i <= ww; i++) R.pset(cx + i, y + j, j < h ? (j < 2 ? hex('#f4f8ff') : i < -ww * 0.3 ? hex('#d8e6f4') : hex('#b8cce0')) : hex('#5a7a9a')); } };
const p6 = (t) => {
  pegar(fondo6());
  estrellas(t, 0, 0, 320, 90, 70, 6); aurora6(t);
  // el mar helado con el reflejo de la aurora y los témpanos que derivan
  for (let y = 96; y < 180; y++) for (let x = 0; x < 320; x++) { const o = Math.sin(x * (0.2 + (y - 96) * 0.004) + t * 1.2 + y * 0.8) + Math.sin(x * 0.07 - t * 0.5);
    const au = Math.max(0, Math.sin(x * 0.045 + t * 0.35) * 0.5 + Math.sin(x * 0.11 - t * 0.6) * 0.5) * (x > 20 && x < 268 ? 1 : 0) * (1 - (y - 96) / 84);
    R.pset(x, y, o > 1.5 ? hex('#3a5a7a') : o > 0.9 && au > 0.4 ? hex('#2a8a7a') : tono(pal('#03060e', '#08101e', '#0e1a2e', '#16243a'), 1.2 + (y - 96) / 84 * 1.4 + hh(x >> 2, y, 6) * 0.3, x, y)); }
  for (const [x0, w, h] of [[70, 40, 10], [104, 22, 6], [150, 30, 8], [248, 46, 12], [292, 30, 7]]) for (let i = 0; i < w; i++) { const hh2 = ri(h * Math.sin(i / w * Math.PI) * (0.8 + 0.2 * Math.sin(i * 0.7))); for (let j = 0; j <= hh2; j++) R.pset(x0 + i, 96 - j, i < w * 0.45 ? hex('#4a6a8a') : hex('#2a3e5a')); R.pset(x0 + i, 96 - hh2, hex('#8aa8c8')); }
  for (let k = 0; k < 14; k++) { const yy = 100 + hh(k, 1, 6) * 76, w = 6 + (yy - 96) * 0.35 * (0.5 + hh(k, 2, 6)), x = ((hh(k, 3, 6) * 380 - t * (2 + (yy - 96) * 0.05)) % 380 + 380) % 380 - 30; tempano(x, yy, w, k); }
  // el barco lejos, a la izquierda, con el ventanal de popa encendido
  R.poligono([[6, 92], [60, 92], [54, 102], [12, 102]], hex('#0a0c14')); for (let x = 12; x < 52; x += 6) { R.rect(x, 94, x + 2, 96, hex('#ffc860')); halo(x + 1, 95, 6, hex('#ffc860'), 0.25); }
  for (const [mx, h] of [[18, 52], [32, 60], [46, 48]]) { R.rect(mx, 92 - h, mx, 92, hex('#141824')); R.rect(mx - 6, 92 - h + 8, mx + 6, 92 - h + 8, hex('#141824')); }
  // el témpano de la criatura se aleja hacia la derecha y hacia el fondo
  const u = tramo(t, 26.75, 32.6), cx = lerp(112, 236, ease(u)), ty = lerp(152, 118, ease(u)), w = lerp(54, 30, u);
  const fade = 1 - tramo(t, TL.WILLING, TL.THEM + 0.6);
  conAlfa(() => { tempano(cx, ty, w, 3);
    const mira = t > TL.ARRIVES - 0.1 && t < TL.WILLING;
    R.actor(MS.criaturaMS, ri(cx - 7), ri(ty + 1), t, { dir: mira ? -1 : 1, dedo: t > TL.ARRIVES + 0.3 && t < TL.NOONE, triste: t > TL.NOONE - 0.1 });
    for (let i = -ri(w / 2); i <= ri(w / 2); i++) if (((i + ri(t * 5)) % 4) === 0) R.pset(ri(cx) + i, ri(ty + w * 0.18 + 3), hex('#8ab0d0')); }, fade);
  // la bruma de la derecha que se lo traga
  for (let y = 84; y < 150; y++) for (let x = 190; x < 320; x++) { const n = Math.sin(x * 0.05 + t * 0.4 + y * 0.12) + Math.sin(y * 0.2 - t * 0.3); const a = Math.min(1, (x - 190) / 80) * (0.25 + n * 0.12) * (1 - Math.abs(y - 116) / 34);
    if (a > 0.05 && ((x + y) & 1)) tine(x, y, hex('#8aa0b8'), a); }
};

// ═══ 7 · la imprenta, 1 de enero de 1818: el calendario pasa al 1; el librero alza el tomito; Atom recoge los tres ═══
const p7 = (t) => {
  const o = { encuadre: 'imprenta', tomos: true };
  T.ciudad(R, t, o);
  // el calendario de la pared: en «January» la hoja del 31 cae y aparece el 1
  const cae = tramo(t, TL.JANUARY - 0.05, TL.FIRST + 0.2);
  R.rect(126, 42, 146, 66, K); R.rect(127, 43, 145, 65, hex('#f4ecd8')); R.rect(127, 43, 145, 48, hex('#a02a22')); R.pset(136, 41, hex('#8a8a96')); R.rect(129, 44, 143, 44, hex('#d04a3a'));
  if (cae < 1) { R.rect(127, 49, 145, 65, hex('#f4ecd8')); R.numero('31', 136, 62, { centro: true, color: hex('#2a1a10') }); }
  R.numero('1', 136, 62, { centro: true, color: hex('#a02a22') });
  if (cae > 0 && cae < 1) { const y = ri(49 + cae * 70), x = ri(127 + Math.sin(cae * 9) * 8); R.poligono([[x, y], [x + 18, y + ri(Math.sin(cae * 12) * 3)], [x + 18, y + 14], [x, y + 14]], hex('#ece2c8')); R.linea(x, y, x + 18, y, hex('#c8bca0')); }
  // el librero, tras el mostrador: en «Frankenstein» alza el tomito; en «Prometheus» le da los tres a Atom
  const alza = t > TL.FRANK - 0.2 && t < TL.PROMETHEUS, da = t > TL.PROMETHEUS - 0.1;
  const rl = R.actor(MS.caballeroMS, 190, 144, t, { dir: 1, sostiene: alza ? [204, 112] : da ? [212, 124] : undefined, sonrisa: alza || da, habla: t > TL.ON && t < TL.FRANK - 0.3 && Math.sin(t * 9) > 0 });
  // Atom entra por la derecha y los recoge
  const ll = tramo(t, 32.7, TL.Y1818), ax = ri(lerp(318, 238, ease(ll))), coge = t > TL.PROMETHEUS + 0.15;
  const ra = AT.atom(R, ax, 152, t, { s: 2, dir: -1, pose: ll > 0 && ll < 1 ? 'camina' : coge ? 'sostiene' : t > TL.FRANK ? 'senala' : 'quieto', cara: alza ? 'sorpresa' : coge ? 'sonrisa' : 'normal', habla: voz(t) });
  T.ciudadDelante(R, t, o);
  if (alza && rl.mano) { const [hx, hy] = rl.mano.map(ri); halo(hx, hy - 4, 16, hex('#ffe0a0'), 0.45); T.d_tomito(R, hx - 4, hy + 4, TOMO, { w: 10, al: 13 });
    for (let k = 0; k < 6; k++) { const a = t * 2 + k, rr = 10 + Math.sin(t * 5 + k) * 2; tine(hx + Math.cos(a) * rr, hy - 3 + Math.sin(a) * rr * 0.7, hex('#fff6c8'), 0.8); } }
  if (coge) { const [mx, my] = ra.mano.map(ri); for (let k = 0; k < 3; k++) T.d_tomito(R, mx - 14, my - 1 - k * 7, [TOMO[0], TOMO[1]], { w: 6, al: 14, tumbado: true }); }
  else if (da && rl.mano) { const [hx, hy] = rl.mano.map(ri); for (let k = 0; k < 3; k++) T.d_tomito(R, hx - 6, hy + 4 - k * 7, TOMO, { w: 6, al: 14, tumbado: true }); }
};

// ═══ 8 · el escaparate: Atom sale con los tres tomitos y se le caen uno detrás de otro; el «500»; un señor recoge uno, «?» ═══
const p8 = (t) => {
  const o = { encuadre: 'imprenta', camara: 'escaparate', tomos: true, carro: false };
  T.ciudad(R, t, o);
  // la tarjeta del «500» en el mirador, en «500»
  const ta = tramo(t, TL.N500 - 0.1, TL.N500 + 0.25);
  if (ta > 0) { const h = ri(ta * 16); R.rect(70, 122 - h, 104, 122, K); R.rect(71, 123 - h, 103, 121, hex('#f4ecd8')); if (ta >= 1) { R.numero('500', 87, 119, { centro: true, color: hex('#a02a22') }); R.rect(74, 122, 75, 128, hex('#5a3a1a')); R.rect(99, 122, 100, 128, hex('#5a3a1a')); } }
  // el perro que pasa trotando por la acera de enfrente
  { const u = ((t - 38) / 6.5), px = ri(lerp(330, -20, u)); if (px > -20 && px < 330) { const pa = Math.floor(t * 8) % 2; R.rect(px, 168, px + 10, 172, hex('#8a5a30')); R.rect(px - 3, 165, px + 1, 169, hex('#8a5a30')); R.pset(px - 3, 166, K); R.pset(px + 11, 167, hex('#8a5a30')); R.pset(px + 12, 166, hex('#8a5a30'));
    R.rect(px + 1, 173, px + 1, 175 - pa, hex('#5a3a20')); R.rect(px + 8, 173, px + 8, 174 + pa, hex('#5a3a20')); R.pset(px - 1, 164, hex('#5a3a20')); } }
  // Atom sale por la puerta y camina hacia la izquierda con la pila; se caen en «small», «volumes» y «and»
  const sale = tramo(t, 38.2, TL.THREE + 0.2), ax = ri(lerp(198, 150, ease(sale)));
  const C1 = TL.SMALL + 0.05, C2 = TL.VOLUMES + 0.15, C3 = TL.JUST - 0.25, n = (t > C1) + (t > C2) + (t > C3);
  const piensa = t > TL.WITHOUT - 0.2;
  const ra = AT.atom(R, ax, 156, t, { s: 2, dir: -1, pose: sale > 0 && sale < 1 ? 'camina' : n < 3 ? 'sostiene' : piensa ? 'piensa' : 'brazos', cara: n >= 1 && n < 3 && t < C3 + 0.6 ? 'sorpresa' : n === 3 && !piensa ? 'triste' : 'normal', habla: voz(t) });
  const [mx, my] = ra.mano.map(ri);
  for (let k = n; k < 3; k++) T.d_tomito(R, mx - 14, my - 1 - (k - n) * 7, TOMO, { w: 6, al: 14, tumbado: true });
  const SUELO = [[118, C1], [132, C2], [104, C3]];
  SUELO.forEach(([fx, tc], k) => { if (t < tc) return; const u = Math.min(1, (t - tc) / 0.35), x = ri(lerp(mx - 14, fx, u)), y = ri(lerp(my - 1 - (2 - k) * 7, 158, u * u) - (u < 1 ? 0 : Math.max(0, 3 * Math.sin((t - tc - 0.35) * 18) * Math.exp(-(t - tc - 0.35) * 8))));
    if (k === 2 && t > TL.WITHOUT - 0.3) return; T.d_tomito(R, x, y, TOMO, { w: 6, al: 14, tumbado: true }); });
  // un señor que pasa recoge el tercero, busca el nombre y no lo encuentra: «?»
  const sp = tramo(t, TL.COPIES - 0.6, TL.WITHOUT - 0.3), sx = ri(lerp(-16, 92, ease(sp))), coge = t > TL.WITHOUT - 0.3;
  const rs = R.actor(MS.caballeroMS, sx, 157, t, { dir: 1, anda: sp > 0 && sp < 1, sostiene: coge ? [sx + 18, 134] : undefined, sorpresa: t > TL.NAME - 0.1 });
  if (coge && rs.mano) { const [hx, hy] = rs.mano.map(ri); T.d_tomito(R, hx - 2, hy + 4, TOMO, { w: 8, al: 12 }); }
  if (t > TL.NAME - 0.1) { const s = Math.min(1, (t - TL.NAME + 0.1) / 0.25); R.icono('?', sx + 4, 104 - ri(s * 6), hex('#ffe070'), K, 2); }
  T.ciudadDelante(R, t, o);
};

// ═══ 9 · el gabinete de lectura: los lectores leen el libro sin firma; Mary entra («20»); el señor cree que es de un hombre, de su marido ═══
const barras9 = (x, y) => x === 143 || x === 144 || y === 60 || y === 61;
const fondo9 = () => capa('p9', () => {
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const r = x % 12; R.pset(x, y, r < 1 ? hex('#8a6a44') : r < 6 ? tono(pal('#c8b08a', '#d4bc94', '#dcc8a2'), 1 + hh(x >> 2, y >> 2, 9) * 0.6, x, y) : tono(pal('#b89c78', '#c4aa84', '#d0b690'), 1 + hh(x >> 2, y >> 2, 8) * 0.6, x, y)); }
  R.rect(0, 112, 319, 149, hex('#3a2414')); for (let x = 2; x < 320; x += 30) { R.rect(x, 116, x + 26, 145, hex('#2a180c')); R.rect(x + 1, 117, x + 25, 144, hex('#5a3a20')); R.rect(x + 1, 117, x + 25, 117, hex('#7a5430')); }
  R.rect(0, 110, 319, 112, hex('#7a5430')); R.rect(0, 0, 319, 6, hex('#e8dcc4')); R.rect(0, 6, 319, 8, hex('#a8906a'));
  // la librería alta de la izquierda con su escalera
  R.rect(0, 14, 98, 150, hex('#2a160a')); R.rect(2, 16, 96, 148, hex('#4a2c16'));
  for (let s = 0; s < 6; s++) { const y0 = 20 + s * 21; R.rect(4, y0 + 18, 94, y0 + 20, hex('#6a4426')); let x = 5;
    while (x < 92) { const w = 3 + ri(hh(x, s, 4) * 3), al = 12 + ri(hh(x, s, 5) * 5), c = [hex('#6a2a22'), hex('#2a4a3a'), hex('#3a3a5a'), hex('#7a5a2a'), hex('#5a2a4a'), hex('#2a3a5a')][ri(hh(x, s, 6) * 5)];
      if (hh(x, s, 7) > 0.92) { R.poligono([[x, y0 + 17], [x + 3, y0 + 17], [x + 8, y0 + 17 - al + 2], [x + 5, y0 + 17 - al + 2]], c); x += 9; continue; }
      R.rect(x, y0 + 18 - al, x + w - 1, y0 + 17, c); R.rect(x, y0 + 18 - al, x, y0 + 17, mez(c, hex('#ffffff'), 0.2)); R.rect(x, y0 + 20 - al, x + w - 1, y0 + 20 - al, hex('#c8a040')); R.rect(x, y0 + 14, x + w - 1, y0 + 14, hex('#c8a040')); x += w; } }
  for (let y = 20; y < 150; y++) { R.pset(80, y, hex('#7a5430')); R.pset(92, y, hex('#7a5430')); if (y % 9 === 0) R.rect(80, y, 92, y, hex('#9a7040')); }
  // la ventana en arco
  R.rect(126, 30, 162, 112, hex('#3a2414')); R.disco(144, 30, 18, hex('#3a2414')); R.rect(122, 108, 166, 114, hex('#7a5430')); R.rect(122, 108, 166, 108, hex('#9a7040'));
  // la chimenea con su repisa y el espejo dorado encima
  R.rect(196, 90, 268, 150, hex('#c8c0b0')); R.rect(196, 90, 268, 94, hex('#e8e4dc')); R.rect(192, 88, 272, 90, hex('#f0ece4')); R.rect(210, 104, 254, 150, hex('#1a120e')); R.rect(206, 100, 258, 103, hex('#a8a090'));
  for (let y = 96; y < 150; y += 7) { R.pset(200, y, hex('#a8a090')); R.pset(264, y, hex('#a8a090')); }
  marcoOro(204, 34, 260, 84); for (let y = 38; y <= 80; y++) for (let x = 208; x <= 256; x++) { const ven = x > 214 && x < 232 && y > 44 && y < 74 && !(x === 223 || y === 58), est = x > 236 && x < 254 && y > 42 && (x - 236) % 4 === 0;
    R.pset(x, y, ven ? tono(pal('#8a929a', '#b8bec2'), hh(x >> 1, y >> 1, 2) + 0.5, x, y) : est ? [hex('#4a2a22'), hex('#2a3a2a'), hex('#3a3a4a')][(x >> 2) % 3] : tono(pal('#5a5048', '#6e6258', '#82766a'), 1 + (x - y) * 0.015 + hh(x >> 2, y >> 2, 3) * 0.3, x, y)); }
  for (let k = 0; k < 6; k++) R.linea(208 + k * 9, 80, 214 + k * 9, 38, hex('#a8a29a'));
  R.rect(214, 82, 224, 88, hex('#c8a040')); R.disco(219, 80, 4, hex('#efe6d0')); R.pset(219, 79, K); R.pset(220, 80, K); R.rect(240, 80, 246, 88, hex('#5a7a9a')); R.disco(243, 78, 3, hex('#d84a6a'));
  // la puerta de la derecha
  R.rect(274, 60, 312, 150, hex('#2a160a')); R.rect(277, 63, 309, 150, hex('#6a4426')); R.rect(280, 66, 306, 100, hex('#5a3a1e')); R.rect(280, 106, 306, 146, hex('#5a3a1e')); R.pset(304, 110, hex('#f0d070')); R.pset(304, 111, hex('#a07a28'));
  penumbra(262, 0, 319, 56, 0.45);
  // la alfombra
  for (let y = 150; y <= 179; y++) for (let x = 0; x < 320; x++) { const a = (x + (y - 150) * 2) % 24, b = (x - (y - 150) * 2 + 480) % 24; R.pset(x, y, a < 2 || b < 2 ? hex('#a8803a') : tono(pal('#3a1a2a', '#5a2234', '#6a2a3a'), 1 + hh(x >> 1, y, 4) * 0.6, x, y)); }
});
const p9 = (t) => {
  pegar(fondo9());
  porHueco(127, 13, 161, 107, () => { for (let y = 13; y <= 107; y++) for (let x = 127; x <= 161; x++) R.pset(x, y, tono(pal('#8a929a', '#a0a8ae', '#b8bec2'), (y - 13) / 70 * 2 + hh(x >> 2, y >> 2, 3) * 0.4, x, y));
    for (const [x0, x1, top] of [[124, 140, 72], [138, 156, 80], [150, 166, 66]]) { R.rect(x0, top, x1, 107, hex('#4a4e58')); R.rect(x0 + 3, top - 6, x0 + 5, top, hex('#3a3e48')); for (let k = 0; k < 6; k++) { const u = (t * 0.5 + k / 6) % 1; tine(x0 + 4 + u * 10 + Math.sin(t + k) * 2, top - 7 - u * 26, hex('#d8dce0'), 0.5 * (1 - u)); } }
    for (let y = 86; y <= 107; y += 5) for (let x = 127; x <= 161; x += 6) R.pset(x + (y % 2 ? 2 : 0), y, hex('#ffd070'));
    pajaros(t, 2, 30, 50, hex('#3a3e48'), 9, 10, 120, 170);
    for (let y = 13; y <= 107; y++) for (let x = 127; x <= 161; x++) if (((x + y + ri(t * 3)) % 5) === 0) tine(x, y, hex('#d8dce0'), 0.25); }, 0, barras9);
  // el fuego
  for (let k = 0; k < 7; k++) { const x = 218 + k * 5, al = 10 + ri((Math.sin(t * 9 + k * 1.7) + 1) * 4); for (let j = 0; j < al; j++) { const w = ri((1 - j / al) * 3); for (let i = -w; i <= w; i++) R.pset(x + i + ri(Math.sin(t * 7 + j * 0.4 + k) * (j / al) * 2), 148 - j, j < al * 0.35 ? hex('#ffe08a') : j < al * 0.7 ? hex('#f0902a') : hex('#c8401a')); } }
  R.rect(214, 146, 250, 149, hex('#3a2a20')); halo(232, 136, 40, hex('#ffb060'), 0.25);
  // el gato que duerme junto al fuego y mueve la cola
  R.rect(180, 146, 194, 150, hex('#3a3a42')); R.disco(194, 146, 3, hex('#3a3a42')); R.pset(193, 143, hex('#3a3a42')); R.pset(196, 143, hex('#3a3a42')); R.rect(182, 146, 190, 146, hex('#5a5a62'));
  { const c = Math.sin(t * 2.2) * 3; R.linea(180, 149, 174, ri(147 + c), hex('#3a3a42')); R.pset(193, 146, hex('#1a1a20')); }
  // Mary entra por la puerta («Mary is 20»)
  const me = tramo(t, TL.MARYE - 0.5, TL.TWENTY + 0.5), mx = ri(lerp(292, 244, ease(me))), oye = t > TL.ASSUME;
  R.actor(MS.maryMS, mx, 152, t, { dir: -1, anda: me > 0 && me < 1, sorpresa: t > TL.MAN - 0.1 && t < TL.MOST, enfado: t > TL.HUSBAND - 0.1, sonrisa: me >= 1 && !oye });
  if (t > TL.TWENTY - 0.15) { const s = Math.min(1, (t - TL.TWENTY + 0.15) / 0.3), y = ri(118 - s * 6); R.numero('20', mx + 8, y, { centro: true, rampa: pal('#7a4a1a', '#c88a2a', '#f0c04a', '#fff0a0') }); }
  // los lectores tras la mesa: la dama, el anciano y el señor de chistera
  const habla = t > TL.MANY - 0.2 && t < TL.HUSBAND + 0.6;
  const rd = R.actor(MS.damaMS, 168, 147, t, { dir: -1, sostiene: [162, 133], sonrisa: t > TL.HUSBAND, habla: t > TL.READERS && t < TL.ASSUME && Math.sin(t * 9) > 0 });
  const ran = R.actor(MS.ancianoMS, 128, 147, t, { dir: 1, sostiene: [146, 132], sorpresa: t > TL.MAN && t < TL.MAN + 0.6 });
  const rc = R.actor(MS.caballeroMS, 92, 147, t, { dir: 1, dedo: t > TL.ASSUME - 0.1 && t < TL.MOST, sostiene: t < TL.ASSUME - 0.1 || t > TL.MOST ? [110, 132] : undefined, habla: habla && Math.sin(t * 9) > -0.2 });
  // la mesa de lectura, delante
  R.rect(60, 138, 214, 142, hex('#2a140a')); R.rect(62, 139, 212, 141, hex('#5a2e18')); R.rect(70, 139, 204, 140, hex('#2a5a3a')); R.rect(62, 142, 212, 160, hex('#3a1e0e')); R.rect(64, 144, 210, 158, hex('#5a2e18')); R.rect(64, 144, 210, 144, hex('#7a4426'));
  for (const x of [80, 120, 160, 196]) { R.rect(x, 146, x + 10, 156, hex('#4a2614')); R.pset(x + 5, 151, hex('#f0d070')); }
  R.rect(66, 160, 70, 172, hex('#2a140a')); R.rect(204, 160, 208, 172, hex('#2a140a')); sombra(137, 173, 72, 0.35);
  vela(188, 138, t, true, 4, 8);
  // los tomitos abiertos en las manos y el periódico
  for (const r of [rd, ran, rc]) if (r && r.mano && (r !== rc || t < TL.ASSUME - 0.1 || t > TL.MOST)) { const [hx, hy] = r.mano.map(ri); R.rect(hx - 6, hy - 1, hx + 6, hy + 4, hex('#4e1a16')); R.rect(hx - 5, hy - 2, hx - 1, hy + 2, hex('#f4ecd8')); R.rect(hx + 1, hy - 2, hx + 5, hy + 2, hex('#ece2c8')); R.pset(hx, hy, hex('#2a0e08')); }
  R.rect(100, 136, 116, 139, hex('#e8e2d4')); for (let x = 101; x < 116; x += 2) R.pset(x, 137, hex('#8a8478'));
  // el globo del señor: en «man» un hombre de chistera; en «husband», Percy
  const g = tramo(t, TL.MAN - 0.2, TL.MAN + 0.15);
  if (g > 0) { globo(70, 92, 44, 36, 96, 118, g);
    if (g >= 1) { if (t < TL.MOST + 0.15) { R.rect(64, 80, 76, 82, K); R.rect(66, 72, 74, 80, K); R.disco(70, 88, 5, hex('#f2c8a0')); R.pset(72, 88, K); R.rect(62, 94, 78, 104, hex('#2a2a3a')); R.icono('?', 82, 84, hex('#a02a22'), hex('#fbf6ea'), 1); }
      else { R.actor(MS.percyMS, 62, 106, t, { dir: 1, sonrisa: true }); } } }
  // las motas en el rayo de la ventana
  rayo([[128, 60], [160, 60], [200, 150], [110, 150]], hex('#fff4d8'), 0.1);
};

// ═══ 10 · Londres, 1823: la fachada del teatro de noche, el cartel, la cola que entra y el coche que pasa ═══════════
const fondo10c = () => capa('p10c', () => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#060818', '#0c1028', '#141a38', '#1e2446'), y / 110 * 3 + hh(x >> 3, y >> 2, 2) * 0.4, x, y)); });
const fondo10 = () => capa('p10', () => {
  // las casas de ladrillo de los lados
  ladrillos(0, 40, 78, 152, pal('#2a140e', '#4a241a', '#5a2e20', '#6a3a28'), 3); ladrillos(242, 52, 319, 152, pal('#24140e', '#422218', '#52301e', '#623c28'), 5);
  R.rect(0, 36, 80, 40, hex('#8a8478')); R.rect(240, 48, 319, 52, hex('#8a8478'));
  for (const [x0, x1, y0] of [[0, 78, 40], [242, 319, 52]]) for (let k = 0; k < 4; k++) { const cx = x0 + 10 + k * 26; if (cx > x1 - 6) continue; R.rect(cx - 2, y0 - 12, cx + 2, y0, hex('#3a2014')); R.rect(cx - 3, y0 - 13, cx + 3, y0 - 12, hex('#5a3a2a')); }
  // el teatro: fachada de estuco, frontón, columnas, puertas encendidas y escalinata
  for (let y = 30; y <= 140; y++) for (let x = 80; x <= 240; x++) R.pset(x, y, tono(pal('#6a6658', '#8a8474', '#a49e8a', '#bab4a0'), 1.6 + hh(x >> 1, y >> 1, 7) * 0.5 - (y < 40 ? 0.6 : 0), x, y));
  for (let y = 44; y < 140; y += 8) R.linea(80, y, 240, y, hex('#6a6658'));
  R.poligono([[76, 46], [160, 22], [244, 46]], hex('#a49e8a')); R.poligono([[84, 44], [160, 26], [236, 44]], hex('#8a8474')); R.linea(76, 46, 160, 22, hex('#d0cab4')); R.linea(160, 22, 244, 46, hex('#6a6658'));
  R.disco(160, 36, 5, hex('#c8a040')); R.disco(160, 36, 3, hex('#8a6a20')); R.linea(156, 36, 164, 36, hex('#f0d070'));
  R.rect(74, 46, 246, 52, hex('#c8c2ac')); R.rect(74, 52, 246, 54, hex('#5a564a'));
  for (const cx of [96, 132, 188, 224]) { R.rect(cx - 6, 56, cx + 6, 60, hex('#d0cab4')); R.rect(cx - 5, 60, cx + 5, 132, hex('#c8c2ac')); for (let x = cx - 4; x <= cx + 4; x += 2) R.rect(x, 61, x, 131, hex('#a49e8a')); R.rect(cx - 5, 60, cx - 4, 132, hex('#e4dec8')); R.rect(cx - 6, 132, cx + 6, 136, hex('#d0cab4')); }
  for (const [x0, x1] of [[106, 122], [142, 178], [198, 214]]) { R.rect(x0, 92, x1, 136, hex('#3a2010')); R.rect(x0 + 1, 93, x1 - 1, 136, hex('#ffcf6a')); R.disco((x0 + x1) / 2, 92, (x1 - x0) / 2, hex('#3a2010')); R.disco((x0 + x1) / 2, 93, (x1 - x0) / 2 - 1, hex('#ffe09a')); }
  for (let k = 0; k < 4; k++) { R.rect(80 - k * 4, 136 + k * 4, 240 + k * 4, 139 + k * 4, k % 2 ? hex('#8a8474') : hex('#a49e8a')); R.rect(80 - k * 4, 136 + k * 4, 240 + k * 4, 136 + k * 4, hex('#c8c2ac')); }
  R.rect(0, 152, 319, 155, hex('#5a564e')); R.rect(0, 152, 319, 152, hex('#8a8478'));
  adoquines(0, 156, 319, 179, pal('#141620', '#22242e', '#2e303a', '#3e404a'), 3);
  // los dos carteles: la criatura con los brazos abiertos y el año
  for (const px of [82, 226]) { R.rect(px - 1, 64, px + 12, 90, K); R.rect(px, 65, px + 11, 89, hex('#7a1e1a')); R.rect(px + 4, 70, px + 7, 82, hex('#e8dcc0')); R.disco(px + 5, 69, 2, hex('#e8dcc0')); R.linea(px + 1, 72, px + 4, 74, hex('#e8dcc0')); R.linea(px + 10, 72, px + 7, 74, hex('#e8dcc0')); R.rect(px + 4, 83, px + 4, 86, hex('#e8dcc0')); R.rect(px + 7, 83, px + 7, 86, hex('#e8dcc0')); }
});
const COLA = [MS.caballeroMS, MS.damaMS, MS.felixMS, MS.agathaMS, MS.ancianoMS, MS.safieMS, MS.edwardMS, MS.claireMS];
const p10 = (t) => {
  pegar(fondo10c()); estrellas(t, 0, 0, 320, 40, 40, 10);
  R.disco(232, 22, 7, hex('#f4f0d8')); R.disco(230, 21, 5, hex('#fffbe8')); halo(232, 22, 18, hex('#d8dcff'), 0.3);
  nubes(t, 20, 46, [pal('#141830', '#1c2240', '#262c4c'), pal('#181c34', '#20264a', '#2c3256'), pal('#1c2038', '#262c4e', '#30365c')], 10, 0.8);
  pegar(fondo10());
  // las ventanas de las casas que se encienden y apagan
  for (let k = 0; k < 14; k++) { const L = k < 7, x = L ? 8 + (k % 3) * 24 : 250 + ((k - 7) % 3) * 24, y = (L ? 58 : 66) + Math.floor((k % 7) / 3) * 30; const on = Math.sin(t * 0.7 + k * 2.3) > -0.4;
    R.rect(x, y, x + 10, y + 14, K); R.rect(x + 1, y + 1, x + 9, y + 13, on ? hex('#ffcf6a') : hex('#1a2030')); R.rect(x + 5, y + 1, x + 5, y + 13, K); R.rect(x + 1, y + 7, x + 9, y + 7, K); if (on) halo(x + 5, y + 7, 9, hex('#ffcf6a'), 0.2); }
  for (const [x, y] of [[20, 40], [46, 40], [258, 52], [284, 52]]) for (let k = 0; k < 5; k++) { const u = (t * 0.4 + k / 5) % 1; tine(x + u * 14 + Math.sin(t + k) * 2, y - 14 - u * 22, hex('#6a6e80'), 0.5 * (1 - u)); }
  // las siluetas que se mueven tras las puertas
  for (let k = 0; k < 3; k++) { const x = ri(146 + ((t * 9 + k * 11) % 30)); R.rect(x, 116, x + 4, 136, hex('#8a5a2a')); R.disco(x + 2, 113, 3, hex('#8a5a2a')); }
  farolGas(64, 152, t, 1, 56); farolGas(256, 152, t, 2, 56);
  for (const x of [64, 256]) for (let y = 160; y < 178; y += 2) tine(x + Math.sin(y + t * 2) * 1.5, y, hex('#ffd890'), 0.25);
  // la cola que sube la escalinata y entra
  const vit = t > TL.HUGE - 0.1 && t < TL.HUGE + 1.2;
  COLA.forEach((d, k) => { const u = ((t - 50.5) * 0.11 + k / COLA.length) % 1, x = ri(lerp(300, 150, u)), y = ri(lerp(164, 148, Math.max(0, (u - 0.6) / 0.4)));
    if (u > 0.95) return; R.actor(d, x, y, t, { dir: -1, anda: !vit, brazos: vit && k % 2 === 0, sonrisa: vit, habla: !vit && k % 3 === 0 && Math.sin(t * 8 + k) > 0.3 }); });
  // un niño que pega una estrella en el cartel en «huge hit»
  const ni = tramo(t, TL.PLAY, TL.HUGE - 0.1), nx = ri(lerp(30, 70, ease(ni)));
  R.actor(MS.percyNinoMS, nx, 158, t, { dir: 1, anda: ni > 0 && ni < 1, brazos: t > TL.HUGE - 0.1 && t < TL.HIT + 0.5 });
  if (t > TL.HUGE) { const s = Math.min(1, (t - TL.HUGE) / 0.2); R.rect(84, 60, 92, 64, hex('#f0d070')); halo(88, 62, ri(8 + s * 8), hex('#fff0a0'), 0.5); R.icono('!', 88 + 8, 54 - ri(s * 3), hex('#ffe070'), K, 2); }
  // el coche de caballos que cruza por delante
  const cu = tramo(t, 51.0, 54.6), cx = ri(lerp(-90, 400, cu));
  if (cu > 0 && cu < 1) { b_caballo(R, cx + 60, 178, t, { dir: 1, anda: true, color: '#2a1e18' });
    R.rect(cx - 30, 140, cx + 30, 168, K); R.rect(cx - 29, 141, cx + 29, 167, hex('#2a1418')); R.rect(cx - 29, 141, cx + 29, 143, hex('#5a2a2e')); R.rect(cx - 12, 146, cx + 4, 158, hex('#ffcf6a')); R.rect(cx - 4, 146, cx - 4, 158, K);
    R.rect(cx + 30, 160, cx + 46, 162, K); R.rect(cx - 34, 136, cx + 34, 140, K);
    for (const wx of [cx - 18, cx + 20]) { R.disco(wx, 168, 10, K); R.disco(wx, 168, 9, hex('#5a2a20')); R.disco(wx, 168, 7, K); for (let a = 0; a < 6; a++) { const an = a * Math.PI / 3 + cx * 0.12; R.linea(wx, 168, ri(wx + Math.cos(an) * 7), ri(168 + Math.sin(an) * 7), hex('#8a5a3a')); } R.disco(wx, 168, 2, hex('#c8a040')); }
    R.actor(MS.caballeroMS, cx + 26, 142, t, { dir: 1 }); R.rect(cx + 26, 142, cx + 42, 146, hex('#2a1418')); }
};

// ═══ 11 · dentro del teatro: la sala llena aplaude; en «Mary goes to see it», Mary entra en el palco bajo ═══════════
const p11 = (t) => {
  const o = { encuadre: 'teatro' };
  T.ciudad(R, t, o);
  const en = tramo(t, TL.MARYT - 0.3, TL.SEE - 0.1), mx = ri(lerp(-14, 24, ease(en)));
  const ac = tramo(t, TL.MARYT - 0.9, TL.MARYT - 0.2), ux = ri(lerp(-14, 2, ease(ac)));
  if (ac > 0) { halo(ux + 22, 100, 30, hex('#ffd890'), 0.55); const ru = R.actor(MS.agathaMS, ux, 118, t, { dir: 1, sostiene: [ux + 16, 104], sonrisa: true }); llama(ru.mano[0], ru.mano[1] - 1, t, 3, 1, false); }
  R.actor(MS.maryLutoMS, mx, 118, t, { dir: 1, anda: en > 0 && en < 1, sonrisa: t > TL.SEE, sorpresa: en >= 1 && t < TL.SEE });
  // una acomodadora con su vela le abre la cortina del palco
  const ca = tramo(t, TL.MARYT - 0.6, TL.MARYT);
  for (let y = 86; y < 118; y++) { const w = ri(lerp(14, 4, ca)); for (let i = 0; i < w; i++) R.pset(i + 1, y, Math.sin(i * 1.3 + y * 0.05) > 0 ? hex('#8a1e22') : hex('#5a1216')); }
  // ramos que vuelan al escenario en «crowds»
  for (let k = 0; k < 3; k++) { const u = tramo(t, TL.CROWDS + k * 0.5, TL.CROWDS + k * 0.5 + 0.9); if (u <= 0 || u >= 1) continue; const x = ri(lerp(120 + k * 40, 150 + k * 14, u)), y = ri(lerp(150, 98, u) - Math.sin(u * Math.PI) * 26);
    R.rect(x - 1, y, x + 1, y + 5, hex('#3a6a2a')); R.disco(x, y - 1, 2, [hex('#d84a6a'), hex('#f0d070'), hex('#f4f0f0')][k]); }
  T.ciudadDelante(R, t, o);
};

// ═══ 12 · el palco: Mary mira la función; Atom busca con la lupa el nombre del monstruo en el programa y solo hay una raya ═══
const p12 = (t) => {
  const o = { encuadre: 'teatro', camara: 'palco' };
  T.ciudad(R, t, o);
  const rie = t > TL.DASH + 0.2;
  halo(120, 128, 20, hex('#ffd890'), 0.25); R.actor(MS.maryLutoMS, 112, 145, t, { dir: rie ? 1 : -1, sonrisa: rie || t < TL.PLAYBILL, sorpresa: t > TL.DASH - 0.1 && t < TL.DASH + 0.2, salto: rie && Math.sin(t * 14) > 0.4 ? 1 : 0 });
  T.ciudadDelante(R, t, o);
  // el programa grande, de pie sobre la repisa, y Atom con la lupa que baja fila a fila
  const brilla = tramo(t, TL.DASH - 0.15, TL.DASH + 0.3);
  const raya = T.d_programa(R, 214, 100, { s: 2, raya: brilla, t });
  const busca = tramo(t, TL.PLAYBILL, TL.NAMET + 0.3), ly = ri(lerp(110, 132, busca) + (busca < 1 ? Math.sin(t * 6) * 2 : 0)), lx = ri(226 + Math.sin(t * 3.4) * 6);
  const asombro = t > TL.NAMET - 0.1;
  const ra = AT.atom(R, 192, 146, t, { s: 2, dir: 1, pose: t > TL.PLAYBILL - 0.3 ? 'sostiene' : 'quieto', cara: t > TL.DASH + 0.4 ? 'guino' : asombro ? 'sorpresa' : 'normal', habla: voz(t) });
  if (t > TL.PLAYBILL - 0.3) { const [mx, my] = ra.mano.map(ri); AT.lupa(R, lerp(mx, lx - 6, Math.min(1, (t - TL.PLAYBILL + 0.3) / 0.4)), lerp(my, ly, Math.min(1, (t - TL.PLAYBILL + 0.3) / 0.4)), 2, 1); }
  if (asombro) { const s = Math.min(1, (t - TL.NAMET + 0.1) / 0.25); R.icono('?', 180, 92 - ri(s * 6), hex('#ffe070'), K, 2); }
  if (brilla > 0 && raya) { const [x0, y, x1] = raya; AT.anillo(R, ri((x0 + x1) / 2), y, ri((x1 - x0) / 2) + 6, 6, t, brilla); R.rect(x0, y - 1, x1, y + 1, mez(hex('#ffe070'), hex('#fff6c0'), (Math.sin(t * 12) + 1) / 2)); for (let k = 0; k < 5; k++) { const a = t * 3 + k * 1.3; tine(x0 + (x1 - x0) * ((k + 0.5) / 5), y - 4 + Math.sin(a) * 2, hex('#fff6c0'), 0.8 * brilla); } }
};

// ═══ 13 · su cuarto de Londres, 1823: Mary se ríe con el programa, escribe la carta a un amigo y la alza; el niño aplaude ═══
const barras13 = (x, y) => x === 59 || x === 60 || y === 66 || y === 67;
const fondo13 = () => capa('p13', () => {
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const r = (x + 3) % 16; R.pset(x, y, r < 2 ? tono(pal('#6a7a8a', '#7a8a9a'), hh(x, y >> 2, 2), x, y) : tono(pal('#8a98a6', '#9aa8b4', '#a8b4c0'), 1 + hh(x >> 2, y >> 2, 3) * 0.6 + (r === 8 ? -0.6 : 0), x, y)); }
  R.rect(0, 0, 319, 5, hex('#e8e4dc')); R.rect(0, 5, 319, 7, hex('#a8a49c'));
  R.rect(0, 120, 319, 132, hex('#6a6a72')); R.rect(0, 120, 319, 121, hex('#a8a8b0'));
  tablas(0, 132, 319, 179, pal('#2a1a0e', '#4a3018', '#5e3e22', '#74502e'), 8, 13, false, false);
  for (let y = 150; y <= 179; y++) for (let x = 30; x <= 150; x++) { const bx = x - 30, by = y - 150; R.pset(x, y, bx < 3 || bx > 117 || by < 2 ? hex('#a8803a') : tono(pal('#2a3a5a', '#3a4a6a', '#4a5a7a'), 1 + Math.sin(bx * 0.5) * Math.sin(by * 0.6) * 0.9, x, y)); }
  // la ventana con su cortina
  R.rect(28, 22, 92, 112, hex('#e8e4dc')); R.rect(30, 24, 90, 110, hex('#3a3a46'));
  R.rect(24, 108, 96, 113, hex('#e8e4dc')); R.rect(24, 113, 96, 114, hex('#8a8a92'));
  for (let y = 16; y < 116; y++) for (const [x0, w] of [[18, 12], [90, 12]]) for (let i = 0; i < w; i++) R.pset(x0 + i, y, Math.sin(i * 1.2 + y * 0.03) > 0.3 ? hex('#7a2a3a') : hex('#5a1a2a'));
  R.rect(14, 14, 106, 17, hex('#a07a28'));
  // la chimenea a la derecha (más abajo que la zona de Atom) con su repisa
  R.rect(232, 84, 300, 132, hex('#d8d0c0')); R.rect(228, 82, 304, 86, hex('#f0ece4')); R.rect(246, 98, 286, 132, hex('#1a120e')); R.rect(242, 94, 290, 97, hex('#b8b0a0'));
  R.rect(238, 72, 246, 82, hex('#c8a040')); R.disco(242, 70, 4, hex('#efe6d0')); R.pset(242, 69, K); R.pset(243, 70, K); R.rect(284, 74, 290, 82, hex('#5a7a9a'));
  marcoOro(242, 26, 276, 60); for (let y = 30; y <= 56; y++) for (let x = 246; x <= 272; x++) R.pset(x, y, tono(pal('#4a6a4a', '#6a8a5a', '#8aa8c0'), y < 44 ? 2 : 1 - (y - 44) / 14 + hh(x, y, 2) * 0.4, x, y));
  penumbra(272, 0, 319, 50, 0.5);
  // el retrato de Percy (óvalo con lazo negro) y dos apliques
  for (let y = -16; y <= 16; y++) for (let x = -12; x <= 12; x++) { const d = (x / 12.5) ** 2 + (y / 16.5) ** 2; if (d <= 1) R.pset(176 + x, 50 + y, d > 0.74 ? (x + y < -5 ? hex('#f0d070') : hex('#a07a28')) : tono(pal('#2a2a3a', '#3a3a52', '#4a4a66'), 1.2 - y / 16, 176 + x, 50 + y)); }
  R.disco(176, 46, 5, hex('#f2c8a0')); R.rect(171, 39, 181, 42, hex('#6a3a1e')); R.disco(173, 40, 3, hex('#6a3a1e')); R.disco(179, 40, 3, hex('#6a3a1e')); R.pset(174, 46, K); R.pset(178, 46, K);
  for (let y = 53; y <= 64; y++) for (let x = -8; x <= 8; x++) if ((x / 9) ** 2 + ((y - 64) / 11) ** 2 <= 1) R.pset(176 + x, y, Math.abs(x) < 2 ? hex('#f4f0e8') : hex('#2a2a36'));
  R.poligono([[168, 30], [176, 34], [184, 30], [180, 36], [172, 36]], K); R.linea(176, 34, 176, 26, hex('#c8a040'));
  for (const ax of [140, 212]) { R.rect(ax - 1, 50, ax + 1, 60, hex('#c8a040')); R.rect(ax - 4, 60, ax + 4, 61, hex('#c8a040')); vela(ax, 50, 0, false, 0, 6); }
  // la estantería pequeña junto a la mesa
  R.rect(100, 54, 140, 58, hex('#4a2c16')); for (let x = 102; x < 138; x += 4) { const c = [hex('#6a2a22'), hex('#2a4a3a'), hex('#3a3a5a'), hex('#7a5a2a')][x % 4]; R.rect(x, 44, x + 3, 53, c); R.rect(x, 46, x + 3, 46, hex('#c8a040')); }
});
const teatrito = (x, yb, t, sube) => { R.rect(x, yb - 24, x + 28, yb, K); R.rect(x + 1, yb - 23, x + 27, yb - 1, hex('#a02a22')); R.rect(x + 4, yb - 19, x + 24, yb - 4, hex('#2a1a30'));
  R.rect(x + 1, yb - 23, x + 27, yb - 21, hex('#c8a040')); R.rect(x + 4, yb - 19, x + 6, yb - 4, hex('#d04a3a')); R.rect(x + 22, yb - 19, x + 24, yb - 4, hex('#d04a3a'));
  const py = yb - 8 - ri(sube * 3 + Math.abs(Math.sin(t * 5)) * 2); R.rect(x + 12, py - 4, x + 16, py + 4, hex('#c8b890')); R.disco(x + 14, py - 6, 2, hex('#e8dca8')); R.pset(x + 13, py - 8, K); R.pset(x + 15, py - 8, K); R.linea(x + 14, yb - 24, x + 14, py - 8, hex('#d8d8d8')); };
const p13 = (t) => {
  pegar(fondo13());
  for (const ax of [140, 212]) vela(ax, 50, t, true, ax, 6);
  porHueco(31, 25, 89, 109, () => { for (let y = 25; y <= 109; y++) for (let x = 31; x <= 89; x++) R.pset(x, y, tono(pal('#060a1a', '#0c1228', '#141c36'), (y - 25) / 60 * 2 + hh(x >> 2, y >> 2, 4) * 0.4, x, y));
    estrellas(t, 31, 25, 89, 60, 14, 13); R.disco(76, 36, 5, hex('#f4f0d8'));
    for (const [x0, x1, top] of [[28, 50, 78], [48, 70, 70], [68, 92, 82]]) { R.rect(x0, top, x1, 109, hex('#0a0c16')); R.rect(x0 + 4, top - 7, x0 + 7, top, hex('#0a0c16')); for (let k = 0; k < 4; k++) R.pset(x0 + 4 + k * 5, top + 8, Math.sin(t * 0.8 + k + x0) > -0.3 ? hex('#ffd070') : hex('#2a2a3a')); }
    farolGas(40, 109, t, 3, 28); }, 0, barras13);
  // el fuego
  for (let k = 0; k < 6; k++) { const x = 254 + k * 5, al = 8 + ri((Math.sin(t * 9 + k * 1.7) + 1) * 4); for (let j = 0; j < al; j++) { const w = ri((1 - j / al) * 3); for (let i = -w; i <= w; i++) R.pset(x + i + ri(Math.sin(t * 7 + j * 0.4 + k) * (j / al) * 2), 130 - j, j < al * 0.35 ? hex('#ffe08a') : j < al * 0.7 ? hex('#f0902a') : hex('#c8401a')); } }
  halo(266, 120, 40, hex('#ffb060'), 0.22);
  // el niño (Percy Florence, 3 años) con su teatrito; aplaude en «famous»
  teatrito(46, 168, t, tramo(t, TL.FAMOUS - 0.2, TL.FAMOUS + 0.2));
  R.actor(MS.percyNinoMS, 80, 170, t, { dir: -1, brazos: t > TL.FAMOUS - 0.1, sonrisa: t > TL.HILARIOUS, salto: t > TL.FAMOUS && Math.sin(t * 12) > 0.3 ? 2 : 0 });
  // Mary tras la mesa: se ríe con el programa, escribe, se sorprende y alza la carta en «famous»
  const fase = t < TL.WRITES - 0.1 ? 0 : t < TL.FAMOUS - 0.3 ? 1 : 2;
  const rm = R.actor(MS.maryLutoMS, 170, 150, t, { dir: -1, sostiene: fase === 0 ? [158, 128 - ri(Math.abs(Math.sin(t * 7)) * 2)] : fase === 1 ? [152 + ri(((t * 0.9) % 1) * 10), 140] : [154, 122],
    sonrisa: fase !== 1 || t > TL.FRIEND, sorpresa: t > TL.SURPRISE - 0.1 && t < TL.SURPRISE + 0.6, salto: fase === 0 && t > TL.HILARIOUS - 0.2 && Math.sin(t * 15) > 0.5 ? 1 : 0, habla: fase === 0 && t < TL.HILARIOUS && Math.sin(t * 10) > 0 });
  // la mesa de escribir, delante
  R.rect(126, 142, 222, 146, hex('#2a140a')); R.rect(127, 143, 221, 145, hex('#6a3a1c')); R.rect(128, 146, 220, 162, hex('#4a2612')); R.rect(130, 148, 218, 160, hex('#5a3018')); R.rect(170, 150, 180, 156, hex('#3a1c0c')); R.pset(175, 153, hex('#f0d070'));
  R.rect(130, 162, 134, 176, hex('#2a140a')); R.rect(214, 162, 218, 176, hex('#2a140a')); sombra(174, 177, 50, 0.35);
  vela(208, 142, t, true, 6, 8); R.rect(132, 138, 140, 142, K); R.rect(133, 139, 139, 141, hex('#2a2a4a')); R.rect(186, 139, 200, 141, hex('#e8dcc0'));
  const [hx, hy] = rm.mano.map(ri);
  if (fase === 0) { T.d_programa(R, hx - 9, hy - 6, { s: 1, tumbado: true, t }); }
  else if (fase === 1) { R.rect(144, 139, 168, 141, hex('#f4ecd8')); for (let x = 146; x < Math.min(166, 146 + (t - TL.WRITES) * 6); x += 2) R.pset(x, 140, hex('#3a2a1a')); pluma(hx, hy + 1, t, true); T.d_programa(R, 186, 130, { s: 1, tumbado: true, t }); }
  else { const s = tramo(t, TL.FAMOUS - 0.3, TL.FAMOUS); R.rect(hx - 6, hy - 10, hx + 6, hy + 4, hex('#f4ecd8')); for (let y = hy - 7; y < hy + 2; y += 2) R.linea(hx - 4, y, hx + 4, y, hex('#5a4a3a'));
    halo(hx, hy - 3, ri(10 + s * 10), hex('#fff0a0'), 0.45 * s); for (let k = 0; k < 6; k++) { const a = t * 2.4 + k * 1.05, r = 14 + Math.sin(t * 5 + k) * 2; tine(hx + Math.cos(a) * r, hy - 3 + Math.sin(a) * r * 0.7, hex('#fff6c8'), 0.85 * s); }
    T.d_programa(R, 186, 130, { s: 1, tumbado: true, t }); }
};

const efectosL = [[1.5, 'viento'], [1.9, 'pasos'], [TL.LIFE, 'pop'],
  [TL.ABANDONS + 0.1, 'pasos'], [TL.ALONE, 'viento'],
  [TL.REJECTED + 0.4, 'trueno'], [TL.ENDS - 0.1, 'rafaga'], [TL.LOVES + 0.1, 'tic'],
  [15.2, 'pajaros'], [TL.MOTHER - 0.1, 'brillo'], [TL.WROTE - 0.3, 'lapiz'],
  [TL.BOTH, 'lapiz'], [TL.FROM - 0.1, 'papel'], [TL.DOESNT, 'tic'],
  [27.0, 'ola'], [TL.ARRIVES, 'viento'],
  [32.8, 'campana'], [TL.JANUARY, 'papel'], [TL.FRANK, 'brillo'], [TL.PROMETHEUS + 0.15, 'pop'],
  [38.3, 'pasos'], [TL.SMALL + 0.4, 'golpecito'], [TL.VOLUMES + 0.5, 'golpecito'], [TL.JUST + 0.1, 'golpecito'], [TL.N500, 'pop'], [TL.NAME - 0.1, 'pop'],
  [45.0, 'puerta'], [TL.TWENTY, 'pop'], [TL.MAN - 0.15, 'pop'], [TL.HUSBAND - 0.1, 'brillo'],
  [51.0, 'carro'], [TL.HUGE, 'publico'],
  [55.8, 'publico'], [TL.MARYT - 0.2, 'pasos'],
  [TL.PLAYBILL, 'papel'], [TL.NAMET, 'pop'], [TL.DASH, 'brillo'],
  [TL.MARYH, 'palmada'], [TL.WRITES, 'lapiz'], [TL.FAMOUS, 'brillo']];
const añoL = (t) => (t < P.P4 ? 1818 : t < P.P7 ? 1817 : t < P.P10 ? 1818 : 1823);
T.rodar(E, R, [[0, p1], [P.P2, p2], [P.P3, p3], [P.P4, p4], [P.P5, p5], [P.P6, p6], [P.P7, p7], [P.P8, p8], [P.P9, p9], [P.P10, p10], [P.P11, p11], [P.P12, p12], [P.P13, p13]],
  { efectos: efectosL, cartela: '1818', año: añoL });
'''

CAB_PRECIO = r'''// MS-PRECIO (frases 26–27), cartela 1818; barra 1818 / 1819 / 1820 / 1822. Nueve planos:
// 1. (0) el patio de la posada, 1818 (fondo local): el mozo lanza al techo el paquete con los tomitos en «book»; el coche del
//    correo sale en «find its way»; Percy paga al posadero en «paying»; Mary, triste en «price»;
// 2. («Imagine moving to Italy») una plaza italiana al sol (fondo local): llegan; Percy estira los brazos al sol en «health»;
//    la frutera le da una naranja a William en «cheaper»; palomas y fuente;
// 3. («far from your debts») la casa blanca (casa/general, día): Percy tira las facturas al viento; en «losing» una nube
//    tapa el sol y se vuelven tristes;
// 4. («your daughter Clara») el cuarto con las dos cunas vacías (casa/dentro): Mary entra; enciende una vela en la ventana
//    en «Clara» y otra en «William»; deja una flor en la cuna (con delicadeza, sin nada morboso);
// 5. («of all the children») el jardín de la pérgola, 1820 (fondo local): Mary triste en el banco; en «only» abre los
//    brazos; Percy Florence camina hacia ella y salta en «grow up» (corazones);
// 6. («And in July 1822») la cala de Lerici (fondo local): el marinero iza la vela; Percy y Edward bajan por el muelle,
//    suben en «sets out» y el barquito sale en «boat»; Percy saluda en «friend»; Edward señala en «Edward»;
// 7. («deckhand, and a storm») el mar en tormenta de lejos (mar/general): el barquito se pierde en la bruma; relámpago en
//    «storm»; gaviotas que huyen;
// 8. («Picture Mary waiting») la terraza (casa/general) del ocaso a la noche («days») y al día («watching»): Mary al
//    catalejo; en «a sail appears» asoma una vela (un pescador): sorpresa y luego tristeza;
// 9. («at 24») la playa gris (mar/playa): Mary de luto y su hijo de la mano miran el horizonte; «24» y «2»; la bolsa casi
//    vacía en «money»; el niño señala el mar en «country». (Lo congela ms-escribir.)
'''

CUERPO_PRECIO = r'''import { b_caballo } from '/atomo/plato/escenas/te-comun.js';

const K = hex('#1a1424'), ri = Math.round, ease = (u) => u * u * (3 - 2 * u), voz = (t) => E.energia?.(t) ?? 0, MS = T.MS, AT = T.AT;
const hh = (a, b, c = 0) => { let n = (a * 374761393 + b * 668265263 + c * 1442695041) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const BAY = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const tono = (cols, v, x, y) => { const n = cols.length - 1; v = Math.max(0, Math.min(n, v)); let l = Math.floor(v); if (v - l > BAY[y & 3][x & 3] / 16) l++; return cols[Math.min(n, l)]; };
const pal = (...a) => a.map(hex);
const cl = (v) => Math.max(0, Math.min(1, v));
const capas = {};
const capa = (k, f) => { if (!capas[k]) { const b = R.nuevo(); const prev = R.usar(b); f(); R.usar(prev); capas[k] = b; } return capas[k]; };
const pegar = (b) => { const D = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c) D[i] = c; } };
const tine = (x, y, c, a) => { x = ri(x); y = ri(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, a)); };
const halo = (cx, cy, r, c, a) => { cx = ri(cx); cy = ri(cy);
  for (let y = Math.max(0, cy - r); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, cx - r); x <= Math.min(319, cx + r); x++) {
    const d = Math.hypot(x - cx, y - cy) / r; if (d >= 1) continue; const q = Math.floor(((1 - d) * (1 - d)) * 4 + BAY[y & 3][x & 3] / 16) / 4; if (q > 0) R.pset(x, y, mez(R.pget(x, y), c, Math.min(0.9, q * a))); } };
const velo = (c, a, y0 = 0, y1 = 179) => { if (a <= 0) return; const B = R.buf, cr = c & 255, cg = (c >>> 8) & 255, cb = (c >>> 16) & 255;
  for (let i = y0 * 320; i < (y1 + 1) * 320; i++) { const v = B[i], r = v & 255, g = (v >>> 8) & 255, b = (v >>> 16) & 255;
    B[i] = (0xff000000 | (Math.round(b + (cb - b) * a) << 16) | (Math.round(g + (cg - g) * a) << 8) | Math.round(r + (cr - r) * a)) >>> 0; } };
// nube de bolitas en tres tonos (sombra, cuerpo, luz)
const nube = (cx, cy, w, cols, k) => { const n = Math.max(3, Math.round(w / 7)), X = (i) => ri(cx - w / 2 + (i + 0.5) * w / n), al = (i) => Math.sin(Math.PI * (i + 0.5) / n),
    r = (i) => 3 + hh(k, i, 3) * 2.5 + al(i) * Math.min(7, w * 0.09), Y = (i) => ri(cy - al(i) * w * 0.07 - hh(k, i, 4) * 2);
  for (let i = 0; i < n; i++) R.disco(X(i), Y(i) + 1, ri(r(i)), cols[0]);
  for (let i = 0; i < n; i++) R.disco(X(i), Y(i), ri(r(i) - 1), cols[1]);
  for (let i = 0; i < n; i++) R.disco(X(i) - 1, Y(i) - 2, Math.max(1, ri(r(i) - 3)), cols[2]);
  for (let x = ri(cx - w / 2); x <= ri(cx + w / 2); x++) { R.pset(x, ri(cy) + 2, cols[0]); R.pset(x, ri(cy) + 3, cols[0]); } };
// tres capas de nubes a tres velocidades
const nubes = (t, y0, y1, C3, sem = 0, v = 1) => {
  for (let k = 0; k < 3; k++) { const w = 90 + hh(k, 1, sem) * 50, x = ((hh(k, 2, sem) * 480 + t * 2 * v + k * 160) % 480) - 80; nube(x, y1 - 8 - hh(k, 3, sem) * 6, w, C3[0], k + sem); }
  for (let k = 0; k < 4; k++) { const w = 40 + hh(k, 4, sem) * 34, x = ((hh(k, 5, sem) * 420 + t * 5 * v + k * 105) % 420) - 50; nube(x, (y0 + y1) / 2 + hh(k, 6, sem) * 14 - 7, w, C3[1], k + 9 + sem); }
  for (let k = 0; k < 4; k++) { const w = 14 + hh(k, 7, sem) * 14, x = ((hh(k, 8, sem) * 380 + t * 11 * v + k * 95) % 380) - 30; nube(x, y0 + 4 + hh(k, 9, sem) * 12, w, C3[2], k + 19 + sem); } };
const ave = (x, y, t, c, f = 0) => { x = ri(x); y = ri(y); const a = Math.sin(t * 12 + f) > 0; R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : 0), c); R.pset(x + 2, y - (a ? 2 : 0), c); };
// cordillera: picos [[x, alto, semiancho]], base yb (cols: roca D, S, M, L; nieve S, M, L; bruma)
const sierra = (yb, picos, cols, nieve = 0.5, sem = 0) => {
  for (let x = 0; x < 320; x++) { let a = 0, pk = 0; for (const [px, al, w] of picos) { const v = al * (1 - Math.abs(x - px) / w); if (v > a) { a = v; pk = px; } }
    a += Math.sin(x * 0.37 + sem) * 1.3 + (hh(x >> 1, 5, sem) - 0.5) * 2.4; if (a <= 0) continue;
    const top = ri(yb - a), luz = x < pk, linea = a * nieve;
    for (let y = top; y <= yb; y++) { const alt = yb - y, borde = y === top;
      const canal = Math.sin((x + y * (luz ? 0.9 : -0.9)) * 0.55 + hh(x >> 3, 1, sem) * 6) > 0.86;
      const enNieve = alt > a - linea - (hh(x, 3, sem) * 5) + (canal ? 4 : 0);
      let c;
      if (borde) c = enNieve ? cols[6] : cols[3];
      else if (enNieve) c = canal ? cols[4] : luz ? (hh(x, y, sem) > 0.85 ? cols[5] : cols[6]) : (hh(x, y, sem) > 0.8 ? cols[4] : cols[5]);
      else c = canal ? cols[0] : luz ? tono([cols[1], cols[2], cols[3]], 1.2 + hh(x >> 1, y >> 1, sem) * 0.9, x, y) : tono([cols[0], cols[1], cols[2]], 0.9 + hh(x >> 1, y >> 1, sem), x, y);
      const br = cl((alt < 10 ? (10 - alt) / 10 : 0) * 0.7);
      R.pset(x, y, br > 0 ? mez(c, cols[7], br) : c); } } };
// un pino (cols D, S, M, L); nieve: cuánta nieve en los pisos
const pino = (x, yb, a, cols, k = 0, nieve = 0) => { x = ri(x); yb = ri(yb); R.rect(x, yb - 3, x + 1, yb, hex('#3a2a1c'));
  for (let j = 0; j < a; j++) { const piso = j % 5, w = Math.max(0, ri(j * 0.34 + piso * 0.5 - 1)), y = yb - 3 - a + j;
    for (let i = -w; i <= w + 1; i++) { let c = (i === -w || i === w + 1) && j > 2 ? cols[0] : piso === 4 ? cols[1] : i < -w * 0.25 ? cols[3] : i > w * 0.45 ? cols[1] : cols[2];
      if (nieve > 0 && piso === 0 && hh(x + i, y, k) < nieve) c = i < 0 ? hex('#f4f8ff') : hex('#c8d4e8'); R.pset(x + i, y, c); } }
  R.pset(x, yb - 3 - a, nieve > 0 ? hex('#f4f8ff') : cols[3]); };
// un árbol de copa redonda en racimos de tres tonos (cols D, S, M, L), que se mece
const copa = (cx, cy, w, h, t, cols, sem, v = 1) => {
  for (let k = 0; k < 9; k++) { const x = cx + (hh(k, 1, sem) - 0.5) * w, y = cy + (hh(k, 2, sem) - 0.5) * h, m = ri(Math.sin(t * 1.6 + k) * v * 0.8), r = ri(w * 0.2 + hh(k, 3, sem) * w * 0.08);
    R.disco(ri(x) + m, ri(y) + 1, r, cols[0]); R.disco(ri(x) + m - 1, ri(y) - 1, r - 1, cols[1]); R.disco(ri(x) + m - 2, ri(y) - 3, Math.max(1, ri(r * 0.5)), cols[2]); }
  for (let k = 0; k < w * 2; k++) { const x = cx + (hh(k, 4, sem) - 0.5) * w * 1.1, y = cy + (hh(k, 5, sem) - 0.5) * h * 1.1, m = ri(Math.sin(t * 1.6 + k) * v);
    if (Math.hypot((x - cx) / (w * 0.55), (y - cy) / (h * 0.55)) < 1) R.pset(ri(x) + m, ri(y), y < cy - h * 0.15 && x < cx ? cols[3] : k % 3 ? cols[2] : cols[0]); } };
// tablas de madera con vetas, juntas y clavos (C: D, S, M, L); w: ancho de tabla; vert: tablas en vertical
const tablas = (x0, y0, x1, y1, C, w, sem, vert = true, clavos = true) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = vert ? x - x0 : y - y0, b = vert ? y : x, k = Math.floor(a / w), i = a % w;
    if (i === 0) { R.pset(x, y, C[0]); continue; }
    const veta = Math.sin(b * 0.23 + k * 3.1 + Math.sin(b * 0.05 + k) * 2.4) > 0.8, nudo = Math.hypot((vert ? i : b % 37) - w / 2, (vert ? b % 41 : i) - (vert ? 20 : w / 2)) < 1.6 && hh(k, 9, sem) > 0.6;
    R.pset(x, y, nudo ? C[0] : tono(C, 1.6 + (hh(k, 1, sem) - 0.5) * 1.1 + (i === 1 ? 0.9 : i === w - 1 ? -0.8 : 0) + (veta ? -0.9 : 0) + hh(x >> 1, y >> 1, sem) * 0.45, x, y)); }
  if (clavos) for (let k = 0; (vert ? x0 : y0) + k * w < (vert ? x1 : y1); k++) for (const f of [0.15, 0.85]) { const p = (vert ? x0 : y0) + k * w + ri(w / 2), q = ri(vert ? y0 + (y1 - y0) * f : x0 + (x1 - x0) * f);
    if (vert) { R.pset(p, q, C[0]); R.pset(p - 1, q - 1, C[3]); } else { R.pset(q, p, C[0]); R.pset(q - 1, p - 1, C[3]); } } };
// mampostería de piedras irregulares con juntas (C: junta, S, M, L)
const piedras = (x0, y0, x1, y1, C, sem, h = 7, w = 12) => {
  for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / h), j = (y - y0) % h, off = ri(hh(f, 0, sem) * w);
    for (let x = x0; x <= x1; x++) { const k = Math.floor((x - x0 + off) / w), i = (x - x0 + off) % w, wk = w - 1 - (hh(k, f, sem) > 0.7 ? 2 : 0);
      if (j === h - 1 || i >= wk) { R.pset(x, y, C[0]); continue; }
      const v = 1.6 + (hh(k, f + 7, sem) - 0.5) * 1.3 + (j === 0 ? 0.9 : j === h - 2 ? -0.7 : 0) + (i === 0 ? 0.5 : 0) + hh(x, y, sem) * 0.4;
      R.pset(x, y, tono(C, v, x, y)); } } };
const cieloG = (k, y1, cols, sem = 7) => capa(k, () => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(cols, Math.min(1, y / y1) * (cols.length - 1) * 0.92 + hh(x >> 3, y >> 2, sem) * 0.45, x, y)); });
// un corazón pequeño (o.grieta 0–1: se agrieta; o.gris: se apaga)
const corazon = (x, y, c = hex('#e8506a'), grieta = 0) => { x = ri(x); y = ri(y); ['.kk.kk.', 'kcckcck', 'kcccccl', 'kcccccl', '.kcccl.', '..kcl..', '...k...'].forEach((f, j) => [...f].forEach((ch, i) => { if (ch !== '.') R.pset(x + i, y + j, ch === 'k' ? K : ch === 'l' ? mez(c, K, 0.35) : c); }));
  R.pset(x + 1, y + 1, mez(c, hex('#ffffff'), 0.6)); if (grieta > 0) { const n = ri(grieta * 6); for (let j = 0; j < n; j++) R.pset(x + 3 + (j % 2 ? 1 : 0), y + 1 + j, K); } };
// las ondas de una voz (paréntesis que salen de un punto hacia dir)
const ondas = (x, y, t, dir, c, n = 3) => { for (let k = 0; k < n; k++) { const u = (t * 1.6 + k / n) % 1, r = 2 + ri(u * 7); if (u > 0.85) continue;
  for (let j = -r; j <= r; j++) { const xx = ri(x + dir * Math.sqrt(Math.max(0, r * r - j * j)) * 0.7); if (Math.abs(j) < r * 0.75) tine(xx, y + j, c, 0.85 - u * 0.6); } } };
// una nota de música
const nota = (x, y, c) => { x = ri(x); y = ri(y); R.rect(x, y, x + 1, y + 1, c); R.rect(x + 1, y - 5, x + 1, y, c); R.pset(x + 2, y - 5, c); R.pset(x + 3, y - 4, c); };
// lo que se ve por un hueco: f dibuja en un búfer aparte y se pega solo dentro de [x0, y0, x1, y1] (salta(x, y): no se pega)
const TMP = R.nuevo(), TMP2 = R.nuevo();
const porHueco = (x0, y0, x1, y1, f, a = 0, salta = null) => { TMP.fill(0); const prev = R.usar(TMP); f(); R.usar(prev); const D = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const i = y * 320 + x, v = TMP[i]; if (!v) continue; if (salta && salta(x, y)) continue; D[i] = a > 0 ? mez(v, D[i], a) : v; } };
// pinta f en un búfer transparente aparte (para reflejos y sombras) y devuelve lo que devuelva f
const aparte = (f) => { TMP2.fill(0); const prev = R.usar(TMP2); const r = f(); R.usar(prev); return r; };
const spr = (g, x, y, P, dir = 1) => R.dibujo(g, ri(x), ri(y), dir, P);
// una pluma de ave en la mano (la punta en x, y), que tiembla al escribir
const pluma = (x, y, t, escribe = true) => { const m = escribe ? ri(Math.sin(t * 17) * 0.7) : 0; x = ri(x); y = ri(y) + m;
  R.linea(x, y, x + 6, y - 10, K); R.linea(x + 1, y - 2, x + 8, y - 13, hex('#f4f0e6')); R.linea(x + 2, y - 2, x + 7, y - 10, hex('#d8d0c0')); R.linea(x + 3, y - 6, x + 9, y - 13, hex('#ffffff')); R.pset(x, y, hex('#2a2030')); };

// ── ayudas propias de este grupo (S7) ──
const conAlfa = (f, a) => { if (a <= 0.02) return null; if (a >= 0.98) return f(); const r = aparte(f), D = R.buf;
  for (let i = 0; i < 57600; i++) { const v = TMP2[i]; if (v) D[i] = mez(D[i], v, a); } return r; };
const estrellas = (t, x0, y0, x1, y1, n, sem, c = hex('#eef2ff')) => { for (let k = 0; k < n; k++) { const x = ri(x0 + hh(k, 1, sem) * (x1 - x0)), y = ri(y0 + hh(k, 2, sem) * (y1 - y0)), tw = Math.sin(t * (1.3 + hh(k, 3, sem) * 3) + k * 1.7);
  if (tw < -0.4) continue; R.pset(x, y, tw > 0.6 ? c : mez(R.pget(x, y), c, 0.55)); if (tw > 0.93 && hh(k, 4, sem) > 0.55) for (const [a, b] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) tine(x + a, y + b, c, 0.5); } };
// una llama pequeña que tiembla (base en x, y) y su halo
const llama = (x, y, t, k = 0, s = 1, h = true) => { x = ri(x); y = ri(y); const f = Math.sin(t * 13 + k * 2.1) + Math.sin(t * 7.3 + k), al = ri((4 + f * 0.6) * s), dx = ri(Math.sin(t * 5 + k) * 0.7);
  if (h) halo(x, y - 2, ri(16 * s), hex('#ffd890'), 0.42);
  for (let j = 0; j < al; j++) { const u = j / al, w = u < 0.3 ? 1 : u < 0.7 ? 1 : 0; for (let i = -w; i <= w; i++) R.pset(x + i + (j > al * 0.6 ? dx : 0), y - j, j < 2 ? hex('#e86a2a') : (i === 0 && j < al - 1 ? hex('#fff6d0') : hex('#ffc24a'))); }
  R.pset(x, y + 1, hex('#2a1a10')); };
// una vela de sebo en su palmatoria de latón (base y): enc 0–1 encendida; humo tras apagarse (ap: segundos desde que se apagó)
const vela = (x, yb, t, enc = true, k = 0, al = 9, ap = -1) => { x = ri(x); yb = ri(yb);
  R.rect(x - 5, yb - 1, x + 5, yb, hex('#6a4a1a')); R.rect(x - 4, yb - 2, x + 4, yb - 2, hex('#c8a040')); R.pset(x - 3, yb - 2, hex('#f0d070')); R.rect(x - 1, yb - 5, x + 1, yb - 3, hex('#a07a28'));
  R.rect(x - 2, yb - 5 - al, x + 2, yb - 6, hex('#e8dcc0')); R.rect(x + 1, yb - 5 - al, x + 2, yb - 6, hex('#c4b494')); R.pset(x - 2, yb - 5 - al, hex('#fff8e8')); R.pset(x - 1, yb - 4 - al, hex('#fff8e8'));
  R.pset(x - 2, yb - 3 - al + 4, hex('#f4ecd8')); R.pset(x, yb - 6 - al, hex('#2a1a10'));
  if (enc) llama(x, yb - 7 - al, t, k);
  else if (ap >= 0 && ap < 2.5) for (let j = 0; j < 14; j++) { const u = j / 14, a = (1 - ap / 2.5) * (1 - u) * 0.8; tine(x + Math.sin(j * 0.6 + t * 3 + k) * (1 + j * 0.25), yb - 7 - al - j - ap * 3, hex('#c8c8d0'), a); } };
// ladrillo con juntas (C: junta, S, M, L)
const ladrillos = (x0, y0, x1, y1, C, sem, w = 9, h = 4) => { for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / h), j = (y - y0) % h;
  for (let x = x0; x <= x1; x++) { const xx = x - x0 + (f % 2) * ri(w / 2), k = Math.floor(xx / w), i = xx % w;
    if (j === h - 1 || i === w - 1) { R.pset(x, y, C[0]); continue; } R.pset(x, y, tono(C, 1.5 + (hh(k, f, sem) - 0.5) * 1.4 + (j === 0 ? 0.6 : 0) + hh(x, y, sem) * 0.4, x, y)); } } };
// adoquines redondeados (C: junta, S, M, L), con brillo de humedad
const adoquines = (x0, y0, x1, y1, C, sem, w = 7, h = 4) => { for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / h), j = (y - y0) % h, ww = w + ri((y - y0) / 12);
  for (let x = x0; x <= x1; x++) { const xx = x + (f % 2) * 3, k = Math.floor(xx / ww), i = xx % ww;
    if (j === h - 1 || i === ww - 1) { R.pset(x, y, C[0]); continue; } R.pset(x, y, tono(C, 1.3 + (hh(k, f, sem) - 0.5) * 1.2 + (j === 0 && i > 0 && i < ww - 2 ? 0.9 : 0) + (i === 0 ? -0.4 : 0), x, y)); } } };
// papel pintado de damasco: rombos y flores de lis en dos tonos (C: S, M, L)
const damasco = (x0, y0, x1, y1, C, sem, pw = 14, ph = 18) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = (x - x0) % pw, b = (y - y0) % ph, cx = pw / 2, cy = ph / 2,
  d = Math.abs(a - cx) / cx + Math.abs(b - cy) / cy, flor = d < 0.55 && !(d < 0.28 && (a + b) % 2), lin = Math.abs(d - 0.95) < 0.09;
  R.pset(x, y, flor || lin ? C[0] : tono(C.slice(1), 0.55 + hh(x >> 2, y >> 2, sem) * 0.5, x, y)); } };
// una farola de gas de 1823 (base yb): poste de hierro, la linterna y su luz
const farolGas = (x, yb, t, k = 0, alto = 50) => { x = ri(x); yb = ri(yb); const y0 = yb - alto;
  R.rect(x - 1, y0, x + 1, yb, hex('#1c1e26')); R.pset(x - 1, y0 + 4, hex('#4a4e5a')); R.rect(x - 3, yb - 3, x + 3, yb, hex('#1c1e26')); R.rect(x - 4, y0 - 2, x + 4, y0, hex('#1c1e26'));
  R.rect(x - 3, y0 - 11, x + 3, y0 - 3, hex('#1c1e26')); const on = 0.85 + Math.sin(t * 9 + k) * 0.08 + Math.sin(t * 23 + k) * 0.05;
  R.rect(x - 2, y0 - 10, x + 2, y0 - 4, mez(hex('#ffcf6a'), hex('#fff4c8'), on - 0.8)); R.pset(x, y0 - 12, hex('#1c1e26')); R.pset(x, y0 - 13, hex('#1c1e26'));
  halo(x, y0 - 7, 26, hex('#ffd890'), 0.38 * on); };
// un pájaro que cruza (n pájaros entre y0 e y1; v: velocidad)
const pajaros = (t, n, y0, y1, c, sem, v = 18, x0 = -20, x1 = 340) => { for (let k = 0; k < n; k++) { const L = x1 - x0, x = x0 + ((hh(k, 1, sem) * L + t * v * (0.7 + hh(k, 2, sem) * 0.6)) % L);
  ave(x, y0 + hh(k, 3, sem) * (y1 - y0) + Math.sin(t * 1.3 + k) * 2, t, c, k); } };
// la tinta de un dibujo: f pinta (a escala 1) dentro del recuadro [0, 0, w, h] de un búfer aparte; se pega a escala s en (bx, by)
// en tinta sepia (lo claro se queda en el papel); rev 0–1 lo revela de izquierda a derecha
const tinta = (f, w, h, bx, by, s, rev = 1, c1 = hex('#3a2616'), c2 = hex('#7a5a3a')) => { if (rev <= 0) return; TMP2.fill(0); const prev = R.usar(TMP2); f(); R.usar(prev);
  const lim = ri(w * rev);
  for (let y = 0; y < h; y++) for (let x = 0; x < lim; x++) { const v = TMP2[y * 320 + x]; if (!v) continue; const l = ((v & 255) + ((v >>> 8) & 255) + ((v >>> 16) & 255)) / 3;
    if (l > 200) continue; const c = l < 90 ? c1 : c2; for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) if (l < 90 || ((x * s + a + y * s + b) & 1)) R.pset(bx + x * s + a, by + y * s + b, c); } };
// la luz caliente de un rayo (polígono), tramado
const rayo = (pts, c, a) => { const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]), x0 = Math.max(0, Math.min(...xs)), x1 = Math.min(319, Math.max(...xs)), y0 = Math.max(0, Math.min(...ys)), y1 = Math.min(179, Math.max(...ys));
  const dentro = (x, y) => { let c2 = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c2 = !c2; } return c2; };
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (((x + y) & 1) === 0 && dentro(x, y)) tine(x, y, c, a); };
// agua con ondas que se mueven (C: S, M, L, brillo); refl: función de color reflejado o null
const agua = (y0, y1, C, t, sem, v = 1, x0 = 0, x1 = 319) => { for (let y = y0; y <= y1; y++) { const p = (y - y0) / Math.max(1, y1 - y0), per = 0.25 + p * 0.5;
  for (let x = x0; x <= x1; x++) { const o = Math.sin(x * per * 0.35 + t * 1.4 * v + y * 0.9 + hh(y, 0, sem) * 6) + Math.sin(x * 0.09 - t * 0.7 * v + y * 0.4);
    R.pset(x, y, o > 1.45 ? C[3] : o > 0.7 ? C[2] : o < -1.2 ? C[0] : tono([C[0], C[1], C[2]], 1 + p * 0.3 + hh(x >> 2, y, sem) * 0.3, x, y)); } } };
// un globo de pensamiento (cx, cy centro; w, h) con tres burbujitas hacia (px, py)
const globo = (cx, cy, w, h, px, py, a = 1) => { if (a <= 0) return; const sx = ri(w * a / 2), sy = ri(h * a / 2);
  for (let k = 0; k < 3; k++) { const u = (k + 1) / 4; R.disco(ri(lerp(px, cx, u)), ri(lerp(py, cy + sy, u)), 1 + k, K); R.disco(ri(lerp(px, cx, u)), ri(lerp(py, cy + sy, u)), k, hex('#fbf6ea')); }
  for (const [dx, dy, r] of [[-0.6, 0, 0.5], [0.6, 0, 0.5], [0, -0.45, 0.55], [0, 0.4, 0.5], [-0.3, -0.3, 0.45], [0.3, 0.3, 0.45], [0.3, -0.3, 0.45], [-0.3, 0.3, 0.45]]) R.disco(ri(cx + dx * sx), ri(cy + dy * sy), ri(r * Math.min(sx, sy) * 1.15) + 1, K);
  for (const [dx, dy, r] of [[-0.6, 0, 0.5], [0.6, 0, 0.5], [0, -0.45, 0.55], [0, 0.4, 0.5], [-0.3, -0.3, 0.45], [0.3, 0.3, 0.45], [0.3, -0.3, 0.45], [-0.3, 0.3, 0.45]]) R.disco(ri(cx + dx * sx), ri(cy + dy * sy), ri(r * Math.min(sx, sy) * 1.15), hex('#fbf6ea')); };
// marco de cuadro dorado (x0, y0, x1, y1)
const marcoOro = (x0, y0, x1, y1) => { R.rect(x0, y0, x1, y1, hex('#3a2408')); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#a07a28')); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#f0d070')); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, hex('#d8b050'));
  R.rect(x0 + 2, y0 + 2, x1 - 2, y1 - 2, hex('#6a4a14')); for (let x = x0 + 3; x < x1 - 2; x += 3) R.pset(x, y0 + 1, hex('#fff0a0')); };
// sombra suave en el suelo
const sombra = (cx, y, w, a = 0.35) => { for (let x = -w; x <= w; x++) for (let j = 0; j < 2; j++) if (Math.abs(x) < w - j * 2) tine(cx + x, y + j, K, a * (1 - Math.abs(x) / (w + 1))); };
const TP = { BUT: en('italia', 0.0000), BOOK: en('italia', 0.0209), FIND: en('italia', 0.0675), WAY: en('italia', 0.0875), MARY: en('italia', 0.1221), ALREADY: en('italia', 0.1373), PAYING: en('italia', 0.1574), PRICE: en('italia', 0.1879), IMAGINE: en('italia', 0.2698), MOVING: en('italia', 0.2907), ITALY: en('italia', 0.3156), SEARCH: en('italia', 0.3381), HEALTH: en('italia', 0.3678), CHEAPER: en('italia', 0.4000), LIFE: en('italia', 0.4096), FAR: en('italia', 0.4433), DEBTS: en('italia', 0.4690), LOSING: en('italia', 0.5076), THERE: en('italia', 0.5188), LESS: en('italia', 0.5598), YEAR: en('italia', 0.5839), DAUGHTER: en('italia', 0.6200), CLARA: en('italia', 0.6321), ONE: en('italia', 0.6939), SON: en('italia', 0.7332), WILLIAM: en('italia', 0.7429), THREE: en('italia', 0.7871), OF: en('italia', 0.8216), CHILDREN: en('italia', 0.8417), ONLY: en('italia', 0.8995), PERCYF: en('italia', 0.9083), FLORENCE: en('italia', 0.9228), LIVE: en('italia', 0.9573), GROW: en('italia', 0.9734), UP: en('italia', 0.9822), JULY: en('mar', 0.0101), Y1822: en('mar', 0.0238), PERCY: en('mar', 0.1108), SETS: en('mar', 0.1184), BOAT: en('mar', 0.1645), FRIEND: en('mar', 0.1952), EDWARD: en('mar', 0.2080), DECKHAND: en('mar', 0.2788), STORM: en('mar', 0.3317), CATCHES: en('mar', 0.3496), SEA: en('mar', 0.3906), PICTURE: en('mar', 0.4648), MARYW: en('mar', 0.4827), WAITING: en('mar', 0.4980), HOUSE: en('mar', 0.5279), BEACH: en('mar', 0.5552), DAYS: en('mar', 0.5850), WATCHING: en('mar', 0.6192), HORIZON: en('mar', 0.6456), SAIL: en('mar', 0.6959), APPEARS: en('mar', 0.7036), N24: en('mar', 0.7539), TWO: en('mar', 0.8077), BOY: en('mar', 0.8324), MONEY: en('mar', 0.8964), COUNTRY: en('mar', 0.9416), HERS: en('mar', 0.9808) };
const P = { Q2: en('italia', 0.2209), Q3: en('italia', 0.4397), Q4: en('italia', 0.6124), Q5: en('italia', 0.8172), Q6: en('italia', 1.0119), Q7: en('mar', 0.2600), Q8: en('mar', 0.4605), Q9: en('mar', 0.7484) };

const TOMO = [hex('#7a2a22'), hex('#4e1a16')];
const penumbra = (x0, y0, x1, y1, a) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = Math.min((x - x0) / Math.max(1, x1 - x0), 1) * Math.min(1, (y1 - y) / Math.max(1, y1 - y0) + 0.3); if (u > 0) tine(x, y, K, a * u); } };
const NUB_CL = [pal('#a8b8cc', '#c4d0de', '#e2e8f0'), pal('#b4c4d6', '#d0dae6', '#eef2f6'), pal('#c0ccdc', '#dce4ee', '#f8fafc')];
const NUB_GR = [pal('#7a8496', '#8e98a8', '#a8b0be'), pal('#848ea0', '#9aa4b4', '#b4bcc8'), pal('#909aaa', '#a8b0be', '#c4cad4')];
// un paquete de papel de estraza con su cordel (x, y: esquina de arriba); con tomos: asoman tres lomos rojos
const paquete = (x, y, w, h, tomos = false) => { x = ri(x); y = ri(y); R.rect(x, y, x + w, y + h, hex('#5a3a1a')); R.rect(x + 1, y + 1, x + w - 1, y + h - 1, hex('#b08a5a')); R.rect(x + 1, y + 1, x + w - 1, y + 1, hex('#c8a474'));
  R.rect(x + ri(w / 2), y, x + ri(w / 2), y + h, hex('#e8dcc0')); R.rect(x, y + ri(h / 2), x + w, y + ri(h / 2), hex('#e8dcc0'));
  if (tomos) for (let k = 0; k < 3; k++) { R.rect(x + 2 + k * 4, y - 6, x + 4 + k * 4, y, TOMO[0]); R.pset(x + 2 + k * 4, y - 6, hex('#a84a3a')); R.pset(x + 3 + k * 4, y - 3, hex('#e8c860')); } };
// una rueda de radios que gira
const rueda = (x, y, r, a, c = hex('#a02a22')) => { R.disco(x, y, r, K); R.disco(x, y, r - 1, c); R.disco(x, y, r - 3, K); for (let k = 0; k < 8; k++) { const an = a + k * Math.PI / 4; R.linea(x, y, ri(x + Math.cos(an) * (r - 2)), ri(y + Math.sin(an) * (r - 2)), c); } R.disco(x, y, 2, hex('#c8a040')); };

// ═══ 1 · el patio de la posada, 1818: el coche del correo sale con los paquetes del libro; Mary, con su familia y sus baúles, se queda mirándolo ═══
const fondo1c = () => cieloG('q1c', 60, pal('#8a98ac', '#a2aebe', '#bcc6d2', '#d2d8e0'), 21);
const fondo1 = () => capa('q1', () => {
  // la posada de entramado: yeso, vigas, tejado de tejas, la galería del primer piso
  for (let y = 22; y < 26; y++) R.linea(0, y, 176, y, hex('#3a2418'));
  for (let y = 26; y < 44; y++) for (let x = 0; x <= 178; x++) R.pset(x, y, ((x + (y % 4 < 2 ? 0 : 4)) % 8 === 0 || y % 4 === 3) ? hex('#3a2418') : tono(pal('#5a3226', '#7a4430', '#8a5038'), 1 + hh(x >> 3, y >> 2, 3) * 0.9, x, y));
  for (let y = 44; y < 140; y++) for (let x = 0; x <= 172; x++) R.pset(x, y, tono(pal('#c8bca4', '#dcd2bc', '#ece4d0'), 1.2 + hh(x >> 1, y >> 1, 5) * 0.6, x, y));
  for (let x = 0; x <= 172; x += 22) { R.rect(x, 44, x + 3, 139, hex('#2a1a10')); R.pset(x + 1, 60, hex('#4a3020')); }
  R.rect(0, 44, 172, 47, hex('#2a1a10')); R.rect(0, 88, 172, 92, hex('#2a1a10')); R.rect(0, 136, 172, 139, hex('#2a1a10'));
  for (let x = 0; x < 172; x += 22) { R.linea(x + 3, 47, x + 21, 87, hex('#2a1a10')); R.linea(x + 4, 47, x + 22, 87, hex('#2a1a10')); }
  // la galería con su barandilla y dos puertas
  R.rect(0, 74, 172, 76, hex('#4a3020')); for (let x = 2; x < 172; x += 5) R.rect(x, 77, x + 1, 87, hex('#4a3020'));
  for (const dx of [40, 120]) { R.rect(dx, 52, dx + 16, 87, hex('#2a1a10')); R.rect(dx + 1, 53, dx + 15, 87, hex('#5a3a22')); R.pset(dx + 13, 70, hex('#c8a040')); }
  // la planta baja: la puerta en arco y dos ventanas emplomadas
  R.rect(26, 102, 54, 139, hex('#2a1a10')); R.disco(40, 102, 14, hex('#2a1a10')); R.rect(28, 104, 52, 139, hex('#ffcf6a')); R.disco(40, 103, 12, hex('#ffcf6a')); R.rect(30, 110, 50, 139, hex('#e8a84a'));
  for (const wx of [72, 116]) { R.rect(wx, 100, wx + 30, 124, hex('#2a1a10')); for (let y = 101; y < 124; y++) for (let x = wx + 1; x < wx + 30; x++) R.pset(x, y, ((x - y) % 5 === 0 || (x + y) % 5 === 0) ? hex('#5a4a30') : hex('#e8c070')); R.rect(wx - 2, 124, wx + 32, 126, hex('#6a4a2a')); }
  // la muestra de la posada: una campana dorada pintada
  R.rect(172, 40, 194, 42, hex('#2a1a10')); R.linea(172, 50, 190, 41, hex('#2a1a10')); R.rect(178, 43, 179, 46, K); R.rect(188, 43, 189, 46, K);
  R.rect(176, 46, 192, 64, hex('#2a1a10')); R.rect(177, 47, 191, 63, hex('#2a3a5a')); R.poligono([[180, 60], [184, 50], [188, 60]], hex('#e8c040')); R.rect(179, 60, 189, 61, hex('#e8c040')); R.pset(184, 62, hex('#e8c040')); R.pset(183, 51, hex('#fff0a0'));
  // el arco de ladrillo que da a la calle y, detrás, la calle con niebla
  ladrillos(196, 52, 319, 140, pal('#3a2018', '#5a3226', '#6a3e2c', '#7a4a34'), 21);
  R.rect(196, 46, 319, 52, hex('#8a8478')); R.rect(196, 46, 319, 46, hex('#a8a296'));
  for (let y = 70; y < 140; y++) for (let x = 214; x < 262; x++) { const d = Math.hypot(x - 238, y - 92); if (y > 92 || d < 24) R.pset(x, y, tono(pal('#8a8e96', '#a4a8ae', '#bcc0c4'), 1 + (y - 70) / 70 + hh(x >> 1, y >> 1, 4) * 0.5, x, y)); }
  for (let k = 0; k < 4; k++) { const bx = 218 + k * 12, h = 20 + k * 5; R.rect(bx, 120 - h, bx + 9, 139, hex('#7a7e88')); R.rect(bx + 2, 124 - h, bx + 4, 127 - h, hex('#5a5e68')); }
  // las cuadras a la derecha: la puerta partida con el heno
  R.rect(274, 92, 312, 140, hex('#2a1a10')); R.rect(276, 94, 310, 115, hex('#1a120a')); for (let k = 0; k < 18; k++) R.linea(278 + k * 2, 115, 280 + k * 2 - ri(hh(k, 2, 3) * 4), 104 + ri(hh(k, 1, 3) * 6), hex('#c8a84a'));
  tablas(276, 116, 310, 139, pal('#2a1a10', '#4a3020', '#5a3a26', '#6a4630'), 6, 3, true, true);
  // el empedrado con charcos y paja
  adoquines(0, 140, 319, 179, pal('#2a2622', '#4a443c', '#5a544a', '#6a645a'), 21);
  for (const [cx, cy, w] of [[120, 172, 22], [250, 158, 14], [30, 166, 12]]) for (let y = -2; y <= 2; y++) for (let x = -w; x <= w; x++) if ((x / w) ** 2 + (y / 2.5) ** 2 <= 1) R.pset(cx + x, cy + y, y < 0 ? hex('#a2aebe') : hex('#7a8698'));
  for (let k = 0; k < 40; k++) { const x = ri(hh(k, 1, 7) * 320), y = ri(142 + hh(k, 2, 7) * 36); R.linea(x, y, x + 3, y - 1, hex('#c8a84a')); }
  // el abrevadero y dos barriles
  R.rect(236, 148, 268, 160, hex('#3a2a1a')); R.rect(238, 149, 266, 152, hex('#5a7a8a')); R.rect(236, 148, 268, 148, hex('#6a5038'));
  for (const bx of [160, 174]) { R.rect(bx, 120, bx + 11, 139, hex('#3a2414')); R.rect(bx + 1, 121, bx + 10, 138, hex('#6a4426')); R.rect(bx, 124, bx + 11, 125, hex('#3a3a42')); R.rect(bx, 134, bx + 11, 135, hex('#3a3a42')); R.rect(bx + 2, 121, bx + 3, 138, hex('#8a5c34')); }
});
const p1 = (t) => {
  pegar(fondo1c()); nubes(t, 4, 40, NUB_GR, 21, 0.8); pajaros(t, 3, 14, 36, hex('#3a3e48'), 21, 10, 200, 330);
  pegar(fondo1());
  for (let k = 0; k < 5; k++) { const u = (t * 0.3 + k / 5) % 1; tine(50 + u * 8 + Math.sin(t + k) * 2, 18 - u * 14, hex('#9aa0aa'), 0.4 * (1 - u)); }
  // gente que pasa por la calle, al fondo, tras el arco
  for (let k = 0; k < 2; k++) { const x = ri(214 + ((t * 7 + k * 26) % 48)); R.rect(x, 118, x + 3, 136, hex('#5a5e6a')); R.disco(x + 1, 115, 2, hex('#5a5e6a')); }
  // el coche del correo con sus dos caballos: sale en «find its way»
  const va = tramo(t, TP.FIND - 0.1, 7.0), cx = ri(lerp(166, 360, va * va)), ang = -cx * 0.12;
  R.rect(cx + 30, 156, cx + 86, 157, hex('#2a1a10')); R.rect(cx + 30, 160, cx + 86, 160, hex('#4a3020'));
  b_caballo(R, cx + 60, 168, t, { dir: 1, anda: va > 0, color: '#3a2618' }); b_caballo(R, cx + 84, 172, t, { dir: 1, anda: va > 0, color: '#6a4228' });
  R.rect(cx - 38, 120, cx + 30, 160, K); R.rect(cx - 37, 121, cx + 29, 136, hex('#1a1414')); R.rect(cx - 37, 137, cx + 29, 159, hex('#7a1e1e')); R.rect(cx - 37, 137, cx + 29, 138, hex('#a83a2e'));
  R.rect(cx - 30, 124, cx - 14, 134, hex('#c8c0a0')); R.rect(cx - 8, 124, cx + 8, 134, hex('#c8c0a0')); R.rect(cx - 7, 124, cx - 7, 134, K);
  R.disco(cx - 4, 148, 5, hex('#e8c040')); R.disco(cx - 4, 148, 3, hex('#7a1e1e')); R.rect(cx + 30, 124, cx + 40, 140, hex('#1a1414'));
  rueda(cx - 26, 164, 12, ang); rueda(cx + 20, 166, 10, ang);
  // los paquetes del techo (el de arriba, con los tres tomitos) y el que lanza el mozo en «book»
  paquete(cx - 34, 110, 16, 9); paquete(cx - 16, 112, 14, 7); paquete(cx, 108, 18, 11, true);
  const lan = tramo(t, TP.BOOK - 0.3, TP.FIND - 0.1);
  if (lan < 1) { const px = lerp(118, cx - 30, lan), py = lerp(132, 98, lan) - Math.sin(lan * Math.PI) * 24; paquete(px, py, 12, 8, true); } else paquete(cx - 30, 101, 12, 8, true);
  // el cochero en el pescante
  R.actor(MS.caballeroMS, cx + 24, 128, t, { dir: 1, habla: va > 0 && Math.sin(t * 9) > 0.4 }); R.rect(cx + 22, 128, cx + 42, 134, hex('#1a1414'));
  // el mozo que lanza el paquete
  R.actor(MS.felixMS, 106, 162, t, { dir: 1, brazos: lan > 0 && lan < 0.4, sonrisa: lan >= 1 });
  // la familia con sus baúles: William, Mary y Percy, que paga al posadero en «paying»
  for (const [bx, w, h, c] of [[2, 22, 12, '#4a2e18'], [6, 16, 8, '#6a3a22'], [40, 16, 10, '#3a3a4a']]) { R.rect(bx, 170 - h, bx + w, 170, K); R.rect(bx + 1, 171 - h, bx + w - 1, 169, hex(c)); R.rect(bx + 1, 171 - h, bx + w - 1, 171 - h, mez(hex(c), hex('#ffffff'), 0.2)); R.rect(bx + ri(w / 2), 171 - h, bx + ri(w / 2), 169, hex('#c8a040')); }
  const mira = t > TP.MARY - 0.2, paga = t > TP.PAYING - 0.2 && t < TP.PRICE + 0.4;
  R.actor(MS.percyNinoMS, 8, 174, t, { dir: 1, sonrisa: !mira, dedo: t > TP.FIND && t < TP.MARY });
  R.actor(MS.maryMS, 24, 174, t, { dir: 1, triste: t > TP.PRICE - 0.3, sorpresa: mira && t < TP.PAYING, habla: t > TP.BUT && t < TP.FIND && Math.sin(t * 9) > 0.2 });
  const rp = R.actor(MS.percyMS, 56, 174, t, { dir: 1, sostiene: paga ? [74, 152] : undefined, sonrisa: t < TP.MARY });
  R.actor(MS.ancianoMS, 80, 174, t, { dir: -1, sostiene: paga ? [76, 154] : undefined, sonrisa: paga });
  if (paga && rp.mano) { const [hx, hy] = rp.mano.map(ri); for (let k = 0; k < 2; k++) { R.disco(hx + 1, hy - 1 - k * 2, 1, hex('#e8c040')); R.pset(hx, hy - 2 - k * 2, hex('#fff0a0')); } }
};

// ═══ 2 · la plaza de una ciudad italiana al sol: llegan; Percy respira el sol en «health»; la frutera da una naranja a William en «cheaper» ═══
const fondo2c = () => cieloG('q2c', 90, pal('#3a7ac8', '#5a94d8', '#7aaee4', '#a8cceb'), 22);
const fondo2 = () => capa('q2', () => {
  // las casas de colores con postigos verdes y tejados de teja
  const CASAS = [[0, 54, 40, '#d8a860'], [54, 98, 52, '#c87a4a'], [98, 150, 36, '#e0c080'], [200, 244, 44, '#d89a6a'], [244, 320, 58, '#e8c890']];
  for (const [x0, x1, top, c] of CASAS) { for (let y = top; y < 136; y++) for (let x = x0; x < x1; x++) R.pset(x, y, tono([mez(hex(c), K, 0.2), hex(c), mez(hex(c), hex('#ffffff'), 0.2)], 1 + hh(x >> 1, y >> 1, x0) * 0.7 - (x === x0 ? 0.8 : 0), x, y));
    for (let x = x0 - 2; x < x1 + 2; x++) for (let j = 0; j < 4; j++) R.pset(x, top - 4 + j, (x + j * 2) % 4 === 0 ? hex('#7a3a22') : j < 2 ? hex('#b8582e') : hex('#9a4a28'));
    for (let wx = x0 + 6; wx < x1 - 10; wx += 16) for (let wy = top + 8; wy < 118; wy += 24) { R.rect(wx, wy, wx + 8, wy + 12, hex('#2a1e18')); R.rect(wx - 3, wy, wx - 1, wy + 12, hex('#3a7a4a')); R.rect(wx + 9, wy, wx + 11, wy + 12, hex('#3a7a4a')); for (let y = wy; y < wy + 12; y += 2) { R.pset(wx - 2, y, hex('#2a5a34')); R.pset(wx + 10, y, hex('#2a5a34')); } R.rect(wx - 1, wy + 13, wx + 9, wy + 13, hex('#e8dcc0')); } }
  // el campanile de la izquierda
  R.rect(14, 24, 32, 136, hex('#b8865a')); for (let y = 28; y < 136; y += 6) R.linea(14, y, 32, y, hex('#9a6a44')); R.rect(16, 30, 30, 44, hex('#3a2418')); R.disco(23, 30, 7, hex('#3a2418')); R.rect(21, 34, 25, 40, hex('#c8a040')); R.poligono([[12, 24], [23, 16], [34, 24]], hex('#9a4a28'));
  // la logia con sus arcos (al fondo, entre las casas)
  for (let y = 70; y < 136; y++) for (let x = 150; x < 200; x++) R.pset(x, y, tono(pal('#b8b0a0', '#d0c8b4', '#e4dcc8'), 1.2 + hh(x >> 1, y >> 1, 3) * 0.5, x, y));
  R.rect(148, 66, 202, 70, hex('#a8a090')); for (const ax of [158, 175, 192]) { R.rect(ax - 6, 96, ax + 6, 136, hex('#4a3a2e')); R.disco(ax, 96, 6, hex('#4a3a2e')); }
  // la plaza enlosada
  for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { const w = 14 + (y - 136) * 0.4, k = Math.floor((x + (Math.floor((y - 136) / 7) % 2) * 7) / w), j = (y - 136) % 7;
    R.pset(x, y, j === 6 || (x + (Math.floor((y - 136) / 7) % 2) * 7) % Math.round(w) === 0 ? hex('#8a7a62') : tono(pal('#b4a488', '#c8b89a', '#dccca8'), 1 + hh(k, Math.floor((y - 136) / 7), 4) * 0.9 + (j === 0 ? 0.5 : 0), x, y)); }
  // la fuente: pila redonda, columna y taza
  for (let y = -6; y <= 6; y++) for (let x = -34; x <= 34; x++) if ((x / 34) ** 2 + (y / 6.5) ** 2 <= 1) R.pset(160 + x, 152 + y, y < -3 ? hex('#e4dcc8') : hex('#b8b0a0'));
  R.rect(126, 152, 194, 162, hex('#a8a090')); R.rect(126, 152, 194, 153, hex('#d0c8b4')); for (let x = 128; x < 194; x += 8) R.rect(x, 154, x, 161, hex('#8a8272'));
  R.rect(156, 120, 164, 150, hex('#c8c0ac')); R.rect(156, 120, 157, 150, hex('#e4dcc8')); for (let y = -2; y <= 2; y++) for (let x = -14; x <= 14; x++) if ((x / 14) ** 2 + (y / 3) ** 2 <= 1) R.pset(160 + x, 122 + y, y < 0 ? hex('#e4dcc8') : hex('#a8a090'));
  // el puesto de fruta: toldo, cajas de limones y naranjas, la pizarrita con el «2»
  R.rect(226, 100, 228, 150, hex('#4a3020')); R.rect(292, 100, 294, 150, hex('#4a3020'));
  for (let x = 222; x <= 298; x++) for (let y = 92; y < 104; y++) R.pset(x, y, Math.floor((x - 222) / 6) % 2 ? hex('#f4ecd8') : hex('#c83a2e'));
  for (let x = 222; x <= 298; x += 6) R.disco(x + 3, 104, 3, Math.floor((x - 222) / 6) % 2 ? hex('#f4ecd8') : hex('#c83a2e'));
  R.rect(228, 132, 292, 150, hex('#6a4428')); R.rect(228, 132, 292, 133, hex('#8a5c34'));
  for (const [x0, c, cl] of [[230, '#f0c020', '#fff070'], [252, '#e8801a', '#ffb040'], [272, '#f0c020', '#fff070']]) { R.rect(x0, 124, x0 + 18, 133, hex('#8a5c34')); for (let k = 0; k < 9; k++) { const fx = x0 + 3 + (k % 4) * 4, fy = 124 - Math.floor(k / 4) * 3 + ((k % 4) % 2); R.disco(fx, fy, 2, hex(c)); R.pset(fx - 1, fy - 1, hex(cl)); } }
  R.rect(244, 136, 258, 146, hex('#3a2a1a')); R.rect(245, 137, 257, 145, hex('#2a3a30')); R.numero('2', 251, 144, { centro: true, color: hex('#f4f0e8') });
});
const p2 = (t) => {
  pegar(fondo2c());
  const sol = 0.5 + 0.5 * tramo(t, TP.HEALTH - 0.4, TP.HEALTH + 0.3);
  R.disco(212, 30, 9, hex('#fff6c8')); halo(212, 30, ri(22 + sol * 12), hex('#fff0b0'), 0.5 * sol);
  nubes(t, 14, 58, NUB_CL, 22, 0.7);
  for (let k = 0; k < 5; k++) { const u = ((t * 0.12 + k * 0.21) % 1), x = ri(lerp(-10, 330, u)), y = ri(40 + k * 6 + Math.sin(t * 2 + k) * 4); ave(x, y, t * 1.6, hex('#1e2430'), k); }
  pegar(fondo2());
  // el agua de la fuente
  for (let k = 0; k < 14; k++) { const u = ((t * 1.3 + k / 14) % 1), sx = k % 2 ? 1 : -1, x = ri(160 + sx * (3 + u * 14)), y = ri(118 + u * u * 32 - Math.sin(u * Math.PI) * 10); R.pset(x, y, hex('#d8f0ff')); R.pset(x, y + 1, hex('#7ab8e0')); }
  for (let x = 128; x < 192; x++) if (Math.sin(x * 0.6 + t * 5) > 0.5) R.pset(x, 151, hex('#e8f8ff'));
  // las palomas que picotean y echan a volar cuando llegan
  for (let k = 0; k < 4; k++) { const vu = tramo(t, 8.6 + k * 0.15, 9.8 + k * 0.15), x = ri(96 + k * 9 + vu * 60), y = ri(166 - vu * 70 - (k % 2) * 3);
    if (vu > 0 && vu < 1) ave(x, y, t * 1.5, hex('#6a6e7a'), k); else if (vu === 0) { R.rect(x, y - 3, x + 4, y, hex('#7a7e8a')); R.pset(x + (Math.sin(t * 6 + k) > 0 ? 5 : 4), y - 4, hex('#5a5e6a')); R.pset(x + 1, y - 2, hex('#a8acb8')); } }
  // la frutera
  const da = t > TP.CHEAPER - 0.3;
  R.actor(MS.safieMS, 262, 140, t, { dir: -1, sostiene: da && t < TP.FAR - 0.2 ? [238, 128] : undefined, sonrisa: true, habla: t > TP.LIFE - 0.3 && Math.sin(t * 9) > 0 });
  R.rect(228, 132, 292, 150, hex('#6a4428')); R.rect(228, 132, 292, 133, hex('#8a5c34')); R.rect(244, 136, 258, 146, hex('#3a2a1a')); R.rect(245, 137, 257, 145, hex('#2a3a30')); R.numero('2', 251, 144, { centro: true, color: hex('#f4f0e8') });
  // llegan: Percy, Mary y William
  const ll = tramo(t, 7.6, TP.SEARCH + 0.2), e = ease(ll);
  const estira = t > TP.HEALTH - 0.3 && t < TP.CHEAPER;
  R.actor(MS.percyMS, ri(lerp(-30, 92, e)), 166, t, { dir: 1, anda: ll > 0 && ll < 1, brazos: estira, sonrisa: estira || t > TP.CHEAPER, habla: t > TP.IMAGINE && t < TP.MOVING + 0.4 && Math.sin(t * 9) > 0 });
  R.actor(MS.maryMS, ri(lerp(-50, 130, e)), 168, t, { dir: 1, anda: ll > 0 && ll < 1, sonrisa: t > TP.HEALTH });
  const nx = ri(lerp(-20, 200, ease(tramo(t, 7.8, TP.CHEAPER - 0.3)))), coge = t > TP.CHEAPER + 0.1;
  const rn = R.actor(MS.percyNinoMS, nx, 168, t, { dir: 1, anda: nx > -20 && nx < 200 && t < TP.CHEAPER - 0.3, sostiene: coge ? true : undefined, sonrisa: coge, salto: coge && Math.sin(t * 10) > 0.6 ? 2 : 0 });
  const nar = (x, y) => { R.disco(x, y, 2, hex('#e8801a')); R.pset(x - 1, y - 1, hex('#ffb040')); R.pset(x, y - 2, hex('#3a7a2a')); };
  if (da && !coge) { const u = tramo(t, TP.CHEAPER - 0.3, TP.CHEAPER + 0.1); nar(ri(lerp(240, nx + 16, u)), ri(lerp(126, 152, u) - Math.sin(u * Math.PI) * 8)); }
  if (coge && rn.mano) { const [hx, hy] = rn.mano.map(ri); nar(hx, hy - 2); }
};

// ═══ 3 · la casa blanca junto al mar (casa/general, de día): Percy tira las facturas al viento en «debts»; en «losing», una nube tapa el sol ═══
const p3 = (t) => {
  const o = { encuadre: 'casa', hora: 'dia' };
  T.italia(R, t, o);
  const tira = t > TP.FAR - 0.1, nub = tramo(t, TP.LOSING - 0.2, TP.YEAR);
  const rp = R.actor(MS.percyMS, 196, 152, t, { dir: nub > 0.4 ? -1 : 1, sostiene: !tira ? true : undefined, brazos: tira && t < TP.DEBTS + 0.6, sonrisa: tira && nub < 0.3, triste: nub > 0.5 });
  R.actor(MS.maryMS, 74, 152, t, { dir: 1, sonrisa: nub < 0.3 && t > TP.DEBTS, triste: nub > 0.3 });
  R.actor(MS.percyNinoMS, 94, 152, t, { dir: 1, brazos: tira && t < TP.DEBTS + 0.8, sonrisa: nub < 0.3 });
  const hoja = (x, y, a) => { x = ri(x); y = ri(y); const w = ri(4 + Math.cos(a) * 3); R.rect(x - w, y - 3, x + w, y + 3, K); R.rect(x - w + 1, y - 2, x + w - 1, y + 2, hex('#f4ecd8')); if (w > 2) { R.linea(x - w + 2, y - 1, x + w - 2, y - 1, hex('#8a7a6a')); R.pset(x, y + 1, hex('#a02a22')); } };
  if (!tira && rp.mano) { const [hx, hy] = rp.mano.map(ri); for (let k = 0; k < 3; k++) hoja(hx + k, hy - k * 2, 0); }
  if (tira) for (let k = 0; k < 6; k++) { const u = Math.min(1.4, (t - TP.FAR - k * 0.08) / 2.4); if (u < 0) continue; const x = 212 + u * (60 + k * 22) + Math.sin(u * 8 + k) * 6, y = 132 - Math.sin(Math.min(u, 1) * 2.2) * (34 + k * 6) + u * u * 20; if (x > 330) continue; hoja(x, y, t * 6 + k); }
  T.italiaDelante(R, t, o);
  if (nub > 0) { velo(hex('#3a4a6a'), 0.32 * nub); for (let x = 0; x < 320; x++) { const y = ri(10 + Math.sin(x * 0.05 + t) * 4); if (x < lerp(-40, 320, nub)) for (let j = 0; j < 8; j++) tine(x, y + j, hex('#5a6478'), 0.4); } }
};

// ═══ 4 · el cuarto encalado (casa/dentro, cunas vacías): Mary entra despacio; enciende una vela por Clara y otra por William; deja una flor ═══
const p4 = (t) => {
  const o = { encuadre: 'casa', camara: 'dentro', cunas: 2, cunaVacia: true, hora: 'dia' };
  T.italia(R, t, o);
  const V1 = TP.CLARA, V2 = TP.WILLIAM;
  vela(142, 96, t, t > V1, 1, 7); vela(158, 96, t, t > V2, 2, 7);
  if (t > V1) halo(142, 84, 18, hex('#ffe0a0'), 0.25); if (t > V2) halo(158, 84, 18, hex('#ffe0a0'), 0.25);
  const an = tramo(t, 16.9, TP.CLARA - 0.1), mx = ri(lerp(30, 202, ease(an))), deja = t > TP.ONE - 0.5 && t < TP.SON;
  const rm = R.actor(MS.maryMS, mx, 152, t, { dir: 1, anda: an > 0 && an < 1, sostiene: deja ? [234, 136] : t > TP.WILLIAM - 0.2 && t < TP.THREE + 0.6 ? [228, 128] : undefined, triste: t > TP.DAUGHTER - 0.2 });
  const flor = (x, y) => { R.linea(x, y, x + 2, y + 4, hex('#4a7a2a')); R.disco(x, y, 2, hex('#f4f0f4')); R.pset(x, y, hex('#f0d040')); R.pset(x + 1, y + 2, hex('#6a9a3a')); };
  if (an > 0.2 && !deja && t < TP.ONE && rm.mano) { const [hx, hy] = rm.mano.map(ri); flor(hx, hy - 3); }
  if (deja && rm.mano) { const [hx, hy] = rm.mano.map(ri); flor(hx, hy - 1); }
  if (t > TP.SON) flor(240, 138);
  T.italiaDelante(R, t, o);
};

// ═══ 5 · un jardín de Florencia con pérgola, 1820: Mary, triste en el banco; Percy Florence da sus primeros pasos hacia ella y salta en «grow up» ═══
const fondo5c = () => cieloG('q5c', 96, pal('#5a8ad0', '#7aa4dc', '#9cbce6', '#c4d8ec'), 25);
const fondo5 = () => capa('q5', () => {
  // colinas de la Toscana con cipreses y una villa
  for (let x = 0; x < 320; x++) { const m = 84 + ri(Math.sin(x * 0.03) * 8 + Math.sin(x * 0.011 + 1) * 6); for (let y = m; y < 112; y++) R.pset(x, y, tono(pal('#6a8a5a', '#80a066', '#98b478'), 1.5 - (y - m) * 0.04 + hh(x >> 2, y >> 1, 3) * 0.6, x, y)); }
  for (let x = 0; x < 320; x++) { const m = 98 + ri(Math.sin(x * 0.05 + 2) * 6); for (let y = m; y < 118; y++) R.pset(x, y, tono(pal('#4a6a3a', '#5e7e44', '#72924e'), 1.4 + hh(x >> 1, y >> 1, 4) * 0.7, x, y)); }
  R.rect(120, 80, 150, 96, hex('#e8d8b0')); R.poligono([[118, 80], [135, 72], [152, 80]], hex('#b8582e')); for (let x = 124; x < 148; x += 6) R.rect(x, 84, x + 2, 88, hex('#3a5a3a'));
  for (const [x, yb, a] of [[40, 100, 22], [52, 102, 16], [196, 104, 24], [208, 102, 18], [232, 98, 20], [100, 96, 14]]) for (let j = 0; j < a; j++) { const w = ri(Math.sin(Math.min(1, (a - j) / a * 1.2) * Math.PI * 0.5) * 3); for (let i = -w; i <= w; i++) R.pset(x + i, yb - j, i < 0 ? hex('#2a4a2a') : hex('#1a3420')); }
  // el muro bajo de piedra con macetas de limoneros
  piedras(0, 112, 319, 132, pal('#8a7a62', '#a8987c', '#bcac8e', '#d0c0a0'), 25, 6, 14); R.rect(0, 110, 319, 112, hex('#d8c8a8'));
  for (const px of [34, 96, 290]) { R.poligono([[px - 9, 120], [px + 9, 120], [px + 6, 132], [px - 6, 132]], hex('#b8582e')); R.rect(px - 10, 118, px + 10, 120, hex('#c8683a'));
    copa(px, 104, 24, 18, 0, pal('#2a4a1e', '#3a6028', '#4e7a32', '#6a9a40'), px); for (let k = 0; k < 6; k++) R.disco(px - 8 + ri(hh(k, 1, px) * 16), 98 + ri(hh(k, 2, px) * 14), 1, hex('#f0d020')); }
  // el camino de grava y los bordes de hierba
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const borde = y < 140 || y > 172; R.pset(x, y, borde ? tono(pal('#4a6e2e', '#5e8438', '#74984a'), 1 + hh(x >> 1, y, 2), x, y) : tono(pal('#a8987c', '#c0b294', '#d8caa8'), 1 + hh(x, y, 5) * 1.2, x, y)); }
  // el banco de piedra
  R.rect(222, 138, 276, 143, hex('#d8d0bc')); R.rect(222, 138, 276, 138, hex('#f0e8d4')); R.rect(226, 143, 232, 156, hex('#a8a08c')); R.rect(266, 143, 272, 156, hex('#a8a08c'));
  // los postes de la pérgola
  for (const px of [6, 130, 254]) { R.rect(px, 28, px + 5, 140, hex('#e8dcc4')); R.rect(px + 4, 28, px + 5, 140, hex('#b8ac94')); }
});
const parra = (t) => { R.rect(0, 26, 262, 29, hex('#6a4a2a')); R.rect(0, 26, 262, 26, hex('#8a6440'));
  for (let x = 0; x < 262; x += 3) { const n = Math.sin(x * 0.13) + Math.sin(x * 0.07 + 1), l = 4 + ri((n + 2) * 3), m = ri(Math.sin(t * 1.3 + x * 0.1) * 1);
    for (let j = 0; j < l; j++) { const y = 28 + j, c = j < 2 ? hex('#2a4a1e') : (x + j) % 5 === 0 ? hex('#8ab84a') : hex('#4e7a32'); R.pset(x + m, y, c); R.pset(x + 1 + m, y, c); } if (hh(x, 1, 9) > 0.82) { R.disco(x + m, 30 + l, 2, hex('#5a2a5a')); R.pset(x + m - 1, 29 + l, hex('#8a5a8a')); } } };
const p5 = (t) => {
  pegar(fondo5c()); R.disco(70, 30, 8, hex('#fff6d0')); halo(70, 30, 24, hex('#fff0b0'), 0.4);
  nubes(t, 30, 70, NUB_CL, 25, 0.6); pajaros(t, 3, 40, 70, hex('#2a3040'), 25, 14, -20, 270);
  pegar(fondo5());
  for (let y = 142; y < 172; y++) for (const sx of [10, 134, 258]) { const x0 = sx + 18 + ri((y - 142) * 0.6); for (let i = 0; i < 6; i++) if (((x0 + i + y) & 1) === 0) tine(x0 + i, y, hex('#3a3020'), 0.35); }
  for (let x = 0; x < 300; x += 1) if ((x % 40) < 30) { const y = 150 + ri(Math.sin(x * 0.3) * 2); if ((x + y) % 3 === 0) tine(x + 20, y, hex('#3a3020'), 0.2); }
  parra(t);
  // una lagartija en el muro y una mariposa
  { const lx = ri(160 + Math.sin(t * 0.8) * 20), ly = 118; R.rect(lx, ly, lx + 6, ly + 1, hex('#6a8a3a')); R.linea(lx + 6, ly + 1, lx + 10, ly + 2, hex('#6a8a3a')); R.pset(lx - 1, ly, hex('#4a6a2a')); }
  { const x = ri(60 + Math.sin(t * 0.9) * 30), y = ri(80 + Math.sin(t * 1.7) * 14), a = Math.sin(t * 22) > 0; R.pset(x, y, K); R.pset(x - 1, y - (a ? 1 : 0), hex('#f0c040')); R.pset(x + 1, y - (a ? 1 : 0), hex('#f0c040')); }
  // Mary: sentada en el banco, triste; en «only» se vuelve y abre los brazos; en «grow up» le recoge y sonríe
  const llama = t > TP.ONLY - 0.2, llega = tramo(t, TP.PERCYF, TP.GROW), nx = ri(lerp(118, 214, llega)), salta = t > TP.GROW;
  R.actor(MS.maryMS, 230, 152, t, { dir: -1, brazos: llama && !salta, triste: !llama, sonrisa: llama });
  R.actor(MS.percyNinoMS, nx, 162, t, { dir: 1, anda: llega > 0 && llega < 1, brazos: salta, sonrisa: true, salto: salta ? ri(Math.abs(Math.sin((t - TP.GROW) * 8)) * 4) : 0 });
  if (salta) { const s = Math.min(1, (t - TP.GROW) / 0.3); for (let k = 0; k < 3; k++) corazon(222 + k * 8, ri(118 - s * 8 - k * 3), hex('#e8506a')); }
};

// ═══ 6 · la cala de Lerici, julio de 1822: el marinero iza la vela; Percy y Edward bajan por el muelle, suben al barquito y salen ═══
const fondo6c = () => cieloG('q6c', 96, pal('#3a7cc8', '#5a96d8', '#86b4e4', '#b4d2ee'), 26);
const fondo6 = () => capa('q6', () => {
  // las colinas con olivos y, a la derecha lejos, el castillo de Lerici en su promontorio
  for (let x = 0; x < 320; x++) { const m = 70 + ri(Math.sin(x * 0.02 + 1) * 10 + Math.sin(x * 0.07) * 4) + (x > 180 ? ri((x - 180) * 0.12) : 0); for (let y = m; y < 100; y++) R.pset(x, y, tono(pal('#4a6a46', '#5e7e52', '#7a9466'), 1.3 - (y - m) * 0.03 + hh(x >> 1, y >> 1, 6) * 0.8, x, y)); }
  for (let k = 0; k < 60; k++) { const x = ri(hh(k, 1, 26) * 300), y = ri(78 + hh(k, 2, 26) * 18); R.disco(x, y, 2, hex('#7a8e6a')); R.pset(x - 1, y - 1, hex('#a0b088')); }
  R.rect(236, 62, 262, 84, hex('#c8b898')); for (let x = 236; x < 262; x += 4) R.rect(x, 58, x + 2, 62, hex('#c8b898')); R.rect(244, 50, 254, 62, hex('#b8a888')); for (let x = 244; x < 254; x += 3) R.rect(x, 47, x + 1, 50, hex('#b8a888'));
  R.rect(236, 62, 237, 84, hex('#e8dcc0')); R.rect(247, 54, 249, 58, hex('#3a3028'));
  for (const [x, w] of [[200, 14], [216, 10], [268, 12]]) { R.rect(x, 86, x + w, 98, hex('#e8c890')); R.poligono([[x - 1, 86], [x + w / 2, 81], [x + w + 1, 86]], hex('#b8582e')); }
  // el muelle de piedra que entra en el agua por la izquierda
  piedras(0, 138, 150, 156, pal('#5a5248', '#8a8272', '#a49c8a', '#bcb4a0'), 26, 6, 12); R.rect(0, 134, 150, 138, hex('#c8c0ac')); R.rect(0, 134, 150, 134, hex('#e4dcc8'));
  for (const bx of [40, 100, 146]) { R.rect(bx, 126, bx + 4, 134, hex('#3a3a42')); R.rect(bx - 1, 125, bx + 5, 126, hex('#5a5a62')); }
  // las nasas y una red, y un ancla
  R.rect(14, 126, 30, 134, hex('#8a6a40')); for (let x = 14; x < 30; x += 2) R.linea(x, 126, x + 1, 134, hex('#5a4020'));
  for (let x = 60; x < 90; x++) for (let y = 128; y < 134; y++) if ((x + y) % 3 === 0) R.pset(x, y, hex('#6a5a4a'));
});
const barquito = (bx, by, t, vela) => { bx = ri(bx); by = ri(by); const H = hex('#1e3a2e'), HL = hex('#2e5a44');
  for (let j = 0; j < 10; j++) { const w = 38 - ri(j * j * 0.25); R.rect(bx - w, by - 10 + j, bx + w + (j < 3 ? 6 : 0), by - 10 + j, j < 2 ? HL : j === 2 ? hex('#e8dcc0') : H); }
  R.rect(bx - 38, by - 11, bx + 44, by - 11, hex('#8a6a40'));
  for (const [mx, al] of [[bx - 8, 52], [bx + 18, 40]]) { R.rect(mx, by - 11 - al, mx + 1, by - 11, hex('#5a3a1e')); const sv = ri(al * 0.85 * vela);
    for (let j = 0; j < sv; j++) { const w = ri((j / al) * 18) + 2; for (let i = 0; i < w; i++) R.pset(mx + 2 + i + ri(Math.sin(j * 0.2 + t * 3) * 0.6 * (i / w)), by - 13 - j, i > w - 3 ? hex('#c8c0b0') : hex('#f4f0e6')); } }
  R.linea(bx + 44, by - 10, bx + 18, by - 50, hex('#5a4a3a')); };
const p6 = (t) => {
  pegar(fondo6c()); nubes(t, 16, 60, NUB_CL, 26, 0.7); pajaros(t, 3, 30, 56, hex('#2a3040'), 26, 16, -20, 270);
  for (let y = 100; y < 180; y++) { const p = (y - 100) / 79; for (let x = 0; x < 320; x++) { const o = Math.sin(x * (0.11 + p * 0.09) + t * 1.1 + y * 1.7) + Math.sin(x * 0.03 - t * 0.4 + y * 0.3) * 0.3;
    R.pset(x, y, o > 1.12 ? hex('#a8d4f0') : o < -1.1 ? hex('#1a5288') : tono(pal('#5aa2d0', '#4890c2', '#3a7eb2', '#2a6aa0'), p * 2.6 + hh(x >> 2, y, 6) * 0.5, x, y)); } }
  for (let k = 0; k < 30; k++) { const x = ri(hh(k, 1, 6) * 320), y = ri(104 + hh(k, 2, 6) * 70); if (Math.sin(t * 4 + k) > 0.6) R.pset(x, y, hex('#ffffff')); }
  pegar(fondo6());
  // el barquito: el marinero iza la vela; suben en «sets out»; sale en «boat»
  const iza = tramo(t, 26.9, TP.PERCY), sal = tramo(t, TP.BOAT - 0.2, 32.9), bx = lerp(196, 286, ease(sal)), by = 160 - ri(ease(sal) * 6) + ri(Math.sin(t * 2.2) * 1.2);
  const ca = tramo(t, 26.9, TP.SETS - 0.1), dentro = t > TP.SETS + 0.1, saluda = t > TP.FRIEND - 0.1;
  const pX = dentro ? bx - 18 : ri(lerp(10, 132, ease(ca))), eX = dentro ? bx - 2 : ri(lerp(-12, 112, ease(ca)));
  R.actor(MS.felixMS, ri(bx + 20), by - 8, t, { dir: -1, sostiene: iza < 1 ? [ri(bx + 18), by - 30 + ri(Math.sin(t * 8) * 3)] : undefined, sonrisa: iza >= 1 });
  R.actor(MS.edwardMS, ri(eX), dentro ? by - 8 : 134, t, { dir: 1, anda: ca > 0 && ca < 1, dedo: t > TP.EDWARD - 0.1 && t < TP.EDWARD + 1.0, habla: ca > 0 && ca < 1 && Math.sin(t * 8) > 0.3 });
  R.actor(MS.percyMS, ri(pX), dentro ? by - 8 : 134, t, { dir: saluda ? -1 : 1, anda: ca > 0 && ca < 1, brazos: saluda, sonrisa: true });
  barquito(bx, by, t, 0.25 + 0.75 * iza);
  for (let i = -40; i < 44; i += 3) if (((i + ri(t * 6)) % 4) === 0) R.pset(ri(bx) + i, by + 1, hex('#e8f4ff'));
  if (sal > 0) for (let k = 0; k < 8; k++) { const u = k / 8; tine(bx - 42 - u * 40 * sal, by - 1 + Math.sin(k + t * 3), hex('#ffffff'), 0.6 * (1 - u)); }
};

// ═══ 7 · el mar en tormenta, de lejos: el barquito se aleja y se pierde en la bruma; relámpago en «storm» ═══
const p7 = (t) => {
  const o = { encuadre: 'mar', barco: lerp(0.08, 1, tramo(t, 32.9, 37.3)) };
  T.italia(R, t, o);
  // las gaviotas que huyen de la tormenta, hacia la orilla
  for (let k = 0; k < 3; k++) { const u = tramo(t, 33.2 + k * 0.4, 35.6 + k * 0.4); if (u <= 0 || u >= 1) continue; ave(lerp(200 + k * 20, -10, u), 70 + k * 8 + Math.sin(t * 3 + k) * 3, t * 1.4, hex('#e8ecf0'), k); }
  T.italiaDelante(R, t, o);
  const f = Math.max(0, 1 - Math.abs(t - TP.STORM - 0.05) / 0.1) + 0.6 * Math.max(0, 1 - Math.abs(t - TP.SEA) / 0.08);
  if (f > 0) { velo(hex('#dce4ff'), 0.45 * Math.min(1, f), 0, 110); let x = 250, y = 18; for (let k = 0; k < 12; k++) { const nx = x + ri((hh(k, 1, 7) - 0.5) * 12), ny = y + 7; R.linea(x, y, nx, ny, hex('#ffffff')); x = nx; y = ny; } }
};

// ═══ 8 · la terraza (casa/general) del ocaso a la noche y al día: Mary espera al catalejo; en «a sail appears», una vela… que es de un pescador ═══
const p8 = (t) => {
  const hora = t < TP.DAYS ? 'ocaso' : t < TP.WATCHING + 0.5 ? 'noche' : 'dia';
  const o = { encuadre: 'casa', hora };
  T.italia(R, t, o);
  // la vela que asoma en el horizonte en «sail appears» y se va: una barca de pescadores
  const vs = tramo(t, TP.SAIL - 0.2, 44.35);
  if (vs > 0) { const x = ri(lerp(150, 214, vs)), y = 96; R.poligono([[x, y], [x + 5, y - 10], [x + 7, y]], hex('#f4f0e6')); R.rect(x - 2, y, x + 8, y + 1, hex('#3a2a1a')); halo(x + 3, y - 4, 8, hex('#ffffff'), 0.3 * (1 - vs)); }
  const ll = tramo(t, 37.7, TP.WAITING + 0.6), mx = ri(lerp(206, 252, ease(ll))), ve = t > TP.SAIL && t < TP.SAIL + 0.9;
  R.actor(MS.percyNinoMS, 104, 152, t, { dir: 1, dedo: ve, sonrisa: ve, sorpresa: t > TP.SAIL - 0.1 && t < TP.SAIL + 0.3 });
  R.actor(MS.maryMS, mx, 152, t, { dir: 1, anda: ll > 0 && ll < 1, sostiene: ll >= 1 && !ve ? [270, 130] : undefined, sorpresa: ve, triste: t > TP.SAIL + 0.9 || (t > TP.WATCHING && !ve) });
  T.italiaDelante(R, t, o);
};

// ═══ 9 · la playa (mar/playa, cielo gris): Mary de luto y su hijo de dos años, de la mano, miran el horizonte («24», «2», la bolsa casi vacía) ═══
const p9 = (t) => {
  const o = { encuadre: 'mar', camara: 'playa', cielo: 'gris' };
  T.italia(R, t, o);
  const an = tramo(t, 44.4, TP.BOY), mx = ri(lerp(78, 126, ease(an))), nx = mx + 16, bolsa = t > TP.MONEY - 0.5 && t < TP.COUNTRY;
  R.actor(MS.percyNinoMS, nx, 154, t, { dir: 1, anda: an > 0 && an < 1, dedo: t > TP.COUNTRY && t < TP.HERS + 0.4 });
  const rm = R.actor(MS.maryLutoMS, mx, 152, t, { dir: 1, anda: an > 0 && an < 1, sostiene: bolsa ? [mx + 12, 132] : [nx + 3, 143], triste: t > TP.MONEY - 0.5 });
  if (bolsa && rm.mano) { const [hx, hy] = rm.mano.map(ri); R.icono('bolsa', hx - 3, hy - 6, hex('#8a6a4a'), K, 1); const u = tramo(t, TP.MONEY - 0.2, TP.MONEY + 0.4); if (u > 0 && u < 1) { R.disco(hx, ri(hy + 2 + u * 14), 1, hex('#e8c040')); R.disco(hx + 3, ri(hy + 2 + u * 10), 1, hex('#e8c040')); } }
  const num = (txt, x, t0) => { if (t < t0 - 0.1 || t > t0 + 2.2) return; const s = Math.min(1, (t - t0 + 0.1) / 0.3), a = Math.min(1, (t0 + 2.2 - t) / 0.4); if (a < 0.5 && (ri(t * 20) % 2)) return; R.numero(txt, x, ri(118 - s * 5), { centro: true, rampa: pal('#7a4a1a', '#c88a2a', '#f0c04a', '#fff0a0') }); };
  num('24', mx + 8, TP.N24); num('2', nx + 8, TP.TWO);
  T.italiaDelante(R, t, o);
};

const efectosP = [[1.5, 'pasos'], [TP.BOOK - 0.2, 'whoosh'], [TP.FIND, 'carro'], [TP.PAYING, 'tic'],
  [7.1, 'campana'], [8.4, 'pajaros'], [TP.HEALTH, 'brillo'], [TP.CHEAPER, 'pop'],
  [TP.FAR, 'whoosh'], [TP.LOSING, 'viento'],
  [16.9, 'pasos'], [TP.CLARA, 'brillo'], [TP.WILLIAM, 'brillo'],
  [22.0, 'pajaros'], [TP.PERCYF, 'pasos'], [TP.GROW, 'boing'],
  [26.9, 'ola'], [TP.PERCY - 0.3, 'pasos'], [TP.BOAT, 'viento'],
  [33.0, 'ola'], [TP.STORM, 'trueno'], [35.4, 'lluvia'],
  [37.8, 'pasos'], [TP.DAYS, 'campana'], [TP.SAIL, 'pop'],
  [44.5, 'ola'], [TP.N24, 'pop'], [TP.TWO, 'pop'], [TP.MONEY, 'tic'], [48.6, 'pajaros']];
const añoP = (t) => (t < P.Q4 ? 1818 : t < TP.WILLIAM ? 1818 : t < P.Q5 ? 1819 : t < P.Q6 ? 1820 : 1822);
T.rodar(E, R, [[0, p1], [P.Q2, p2], [P.Q3, p3], [P.Q4, p4], [P.Q5, p5], [P.Q6, p6], [P.Q7, p7], [P.Q8, p8], [P.Q9, p9]],
  { efectos: efectosP, cartela: '1818', año: añoP });
'''

E['ms-libro'] = ('El libro sin nombre', CAB_LIBRO, CUERPO_LIBRO)
E['ms-precio'] = ('El precio', CAB_PRECIO, CUERPO_PRECIO)
