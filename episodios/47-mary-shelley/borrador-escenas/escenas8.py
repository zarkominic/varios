# Borrador de escenas del ep47 (grupo 8): ms-escribir y ms-cierre.
# Formato del 11: E[id] = (título, cabecera //, cuerpo). Lo genera atomo/herramientas/generar-escenas.py.
E = {}

WE = "const W = { NOTICE: en('fijate5', 0.0036), STUDY: en('fijate5', 0.0495), PUBLISHED: en('fijate5', 0.0591), Y1986: en('fijate5', 0.0809), Q2: en('fijate5', 0.1340), PSYCH: en('fijate5', 0.1376), JAMES: en('fijate5', 0.1545), ASKED: en('fijate5', 0.1949), STUDENTS: en('fijate5', 0.2058), WRITE: en('fijate5', 0.2311), FOUR: en('fijate5', 0.2510), DAYS: en('fijate5', 0.2595), ROW: en('fijate5', 0.2782), Q3: en('fijate5', 0.2999), MINUTES: en('fijate5', 0.3084), DAY: en('fijate5', 0.3307), ABOUT: en('fijate5', 0.3506), DEEPLY: en('fijate5', 0.3693), PAINFUL: en('fijate5', 0.3814), HAPPENED: en('fijate5', 0.4109), THEM: en('fijate5', 0.4303), Q4: en('fijate5', 0.4520), WHAT: en('fijate5', 0.4791), HAPP2: en('fijate5', 0.4888), HOW: en('fijate5', 0.5190), FELT: en('fijate5', 0.5322), Q5: en('fijate5', 0.5811), FIRST: en('fijate5', 0.5902), WORSE: en('fijate5', 0.6113), BUT: en('fijate5', 0.6336), FOLLOWING: en('fijate5', 0.6547), MONTHS: en('fijate5', 0.6644), WENT: en('fijate5', 0.6909), Q6: en('fijate5', 0.7054), LESS: en('fijate5', 0.7175), OFTEN: en('fijate5', 0.7326), THOSE: en('fijate5', 0.7664), WRITTEN: en('fijate5', 0.7875), TRIVIAL: en('fijate5', 0.8050), THINGS: en('fijate5', 0.8207), Q7: en('fijate5', 0.8515), PAIN: en('fijate5', 0.8575), WORDS: en('fijate5', 0.8798), GIVES: en('fijate5', 0.8937), SHAPE: en('fijate5', 0.9112), SHAPE2: en('fijate5', 0.9414), SOMETHING: en('fijate5', 0.9595), HOLD: en('fijate5', 0.9818), E1: en('escribe', 0.0000), MARY: en('escribe', 0.0220), LIFE: en('escribe', 0.0907), WRITES: en('escribe', 0.1411), NOVELS: en('escribe', 0.1572), TRAVEL: en('escribe', 0.2057), BOOKS: en('escribe', 0.2198), BIOG: en('escribe', 0.2501), E2: en('escribe', 0.3066), NOVEL: en('escribe', 0.3267), LAST: en('escribe', 0.3701), MAN: en('escribe', 0.3853), SOMEONE: en('escribe', 0.4387), LEFT: en('escribe', 0.4569), ALONE: en('escribe', 0.4720), EMPTY: en('escribe', 0.5104), WORLD: en('escribe', 0.5225), E3: en('escribe', 0.5669), EXACTLY: en('escribe', 0.5881), FELT2: en('escribe', 0.6486), AND3: en('escribe', 0.6879), WHILE: en('escribe', 0.7152), RAISES: en('escribe', 0.7364), SON: en('escribe', 0.7666), E4: en('escribe', 0.8130), PERCYS: en('escribe', 0.8383), WORK: en('escribe', 0.8645), NEVER: en('escribe', 0.9079), PEN: en('escribe', 0.9725) };"
WC = "const W = { Y1831: en('1831', 0.0047), MARY: en('1831', 0.0747), REVISES: en('1831', 0.0833), FRANK: en('1831', 0.1100), NEW: en('1831', 0.1698), EDITION: en('1831', 0.1760), C2: en('1831', 0.2036), INTRO: en('1831', 0.2208), WHERE: en('1831', 0.2452), FINALLY: en('1831', 0.2861), TELLS: en('1831', 0.3041), HOW: en('1831', 0.3238), BORN: en('1831', 0.3474), C3: en('1831', 0.3843), SUMMER: en('1831', 0.3898), RAIN: en('1831', 0.4118), GHOST: en('1831', 0.4488), GAME: en('1831', 0.4794), NIGHT: en('1831', 0.5077), SAW: en('1831', 0.5399), THING: en('1831', 0.5635), STIR: en('1831', 0.5989), C4: en('1831', 0.6445), END: en('1831', 0.6790), GOODBYE: en('1831', 0.7136), BOOK: en('1831', 0.7466), AFFECTION: en('1831', 0.7694), C5: en('1831', 0.8071), CALLS: en('1831', 0.8142), HIDEOUS: en('1831', 0.8535), PROGENY: en('1831', 0.8747), BIDS: en('1831', 0.9227), GO: en('1831', 0.9431), FORTH: en('1831', 0.9502), PROSPER: en('1831', 0.9745), C6: en('recuerdas', 0.0001), REMEMBER: en('recuerdas', 0.0111), EYES: en('recuerdas', 0.0419), DARK: en('recuerdas', 0.0718), NIGHT2: en('recuerdas', 0.1256), N18: en('recuerdas', 0.1674), GIRL: en('recuerdas', 0.2172), C7: en('recuerdas', 0.2371), LOST: en('recuerdas', 0.2650), MOTHER: en('recuerdas', 0.2909), DAUGHTER: en('recuerdas', 0.3337), IMAGINED: en('recuerdas', 0.3486), SOMEONE: en('recuerdas', 0.3755), CAME: en('recuerdas', 0.4123), LIFE: en('recuerdas', 0.4472), C8: en('recuerdas', 0.4801), WHOM: en('recuerdas', 0.4940), NOONE: en('recuerdas', 0.5059), WANTED: en('recuerdas', 0.5269), AND200: en('recuerdas', 0.6284), N200: en('recuerdas', 0.6404), YEARS: en('recuerdas', 0.6543), LATER: en('recuerdas', 0.6792), C9: en('recuerdas', 0.7260), CREATURE: en('recuerdas', 0.7330), STILL: en('recuerdas', 0.7668), ALIVE: en('recuerdas', 0.7778), FAR: en('recuerdas', 0.8286), ALIVE2: en('recuerdas', 0.8505), EVERYONE: en('recuerdas', 0.8833), DOUBTED: en('recuerdas', 0.9222), WRITTEN: en('recuerdas', 0.9690), C10: en('pregunta', -0.0004), NOW: en('pregunta', 0.0135), ASK: en('pregunta', 0.0591), WORST: en('pregunta', 0.2020), NIGHT3: en('pregunta', 0.2297), BECOME: en('pregunta', 0.2992), LASTED: en('pregunta', 0.4083), N200B: en('pregunta', 0.4579), C11: en('pregunta', 0.6206), DARE: en('pregunta', 0.6583), WRITE: en('pregunta', 0.7059), DOWN: en('pregunta', 0.7436), READ: en('pregunta', 0.8606), COMMENTS: en('pregunta', 0.9221) };"

AYUDAS = r'''
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
'''


# ─────────────────────────────────── piezas locales comunes a las dos escenas ───────────────────────────────────
LOCALES = r'''
const atomG = (x, s, t, o = {}) => AT.atom(R, x, s, t, { s: 2, habla: voz(t), ...o });
const flota = (t, k = 0) => ri(Math.sin(t * 2.2 + k) * 1.5);
const anio = (txt, x, y, u) => { if (u <= 0) return; R.numero(txt, x, y - ri((1 - ease(u)) * 6), { centro: true, tam: 16 }); };
const MAD = pal('#2a1a10', '#4a2e1c', '#6a4428', '#8a5e38');
const MADC = pal('#3a2414', '#5e3a20', '#7e5230', '#a07040');
const LIB = ['#7a2626', '#2a3a5a', '#3a5a3a', '#8a6a2a', '#5a2a4a', '#2e2a2a', '#6a4a2a', '#4a5a6a', '#8a3a2a', '#26463e'].map(hex);
const CORT = pal('#3a1218', '#5a1e26', '#7a2a32', '#9a3a40');
const ORO = hex('#d8b050'), ORO_S = hex('#8a6a28'), CREMA = hex('#efe6d0'), TINTA = hex('#1e1a22');
// papel pintado: rayas anchas con un rombito alterno (C: D, S, M, L)
const papelP = (x0, y0, x1, y1, C, sem = 0, paso = 12) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = (x - x0) % paso, col = Math.floor((x - x0) / paso);
    const mx = i - paso / 2, my = ((y - y0) + (col & 1) * 9) % 18 - 9, r = Math.abs(mx) + Math.abs(my);
    let v = 1.55 + (i === 0 ? -0.7 : i === 1 ? 0.5 : 0) + hh(x >> 1, y >> 1, sem) * 0.4;
    if (r <= 2) v = r === 2 ? 0.6 : 2.7; else if (r === 3 && (my === 0 || mx === 0)) v = 2.2;
    R.pset(x, y, tono(C, v, x, y)); } };
// friso de cuarterones de madera (C: D, S, M, L)
const paneles = (x0, y0, x1, y1, C, w = 34, sem = 0) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono(C, 1.5 + hh(x >> 2, y, sem) * 0.5 + (Math.sin(x * 0.4 + y * 0.05) > 0.85 ? -0.6 : 0), x, y));
  R.rect(x0, y0, x1, y0 + 1, C[3]); R.rect(x0, y0 + 2, x1, y0 + 2, C[0]);
  for (let k = x0 + 4; k + w - 8 < x1; k += w) { const a = k, b = k + w - 8, c = y0 + 6, d = y1 - 4;
    R.rect(a, c, b, c, C[0]); R.rect(a, c, a, d, C[0]); R.rect(a + 1, d, b, d, C[3]); R.rect(b, c + 1, b, d, C[3]);
    R.rect(a + 1, c + 1, b - 1, c + 1, C[1]); for (let y = c + 2; y < d; y++) R.pset(a + 1, y, C[1]); }
  R.rect(x0, y1, x1, y1, C[0]); };
// tarima de tablas horizontales con su perspectiva (más oscura al fondo)
const tarima = (y0, C, sem = 0, x0 = 0, x1 = 319) => { tablas(x0, y0, x1, 179, C, 6, sem, false, true); for (let y = y0; y < y0 + 8; y++) for (let x = x0; x <= x1; x++) if ((x + y) % (y - y0 + 2) === 0) tine(x, y, K, 0.35); };
// una alfombra con cenefa (cols: fondo, cenefa, dibujo)
const alfombra = (x0, y0, x1, y1, cols, sem = 0) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const bx = Math.min(x - x0, x1 - x), by = Math.min(y - y0, y1 - y), b = Math.min(bx, by * 2);
    let c = b < 2 ? cols[1] : b < 4 ? cols[2] : b < 6 ? cols[1] : cols[0];
    if (b >= 6) { const u = Math.abs(((x - x0) % 16) - 8) + Math.abs(((y - y0) % 8) - 4) * 2; if (u === 6) c = cols[2]; else if (u < 2) c = cols[1]; }
    if (hh(x, y, sem) > 0.9) c = mez(c, K, 0.2); R.pset(x, y, c); }
  for (let x = x0; x <= x1; x += 2) { R.pset(x, y0 - 1, cols[2]); R.pset(x, y1 + 1, cols[2]); } };
// una librería con sus baldas y lomos (sem cambia el reparto)
const libreria = (x0, y0, x1, y1, sem = 0, n = 4) => {
  R.rect(x0, y0, x1, y1, MAD[0]); for (let y = y0 + 1; y < y1; y++) { R.pset(x0 + 1, y, MAD[3]); R.pset(x0 + 2, y, MAD[2]); R.pset(x1 - 1, y, MAD[1]); R.pset(x1 - 2, y, MAD[2]); }
  R.rect(x0 - 1, y0, x1 + 1, y0 + 2, MAD[2]); R.rect(x0 - 1, y0, x1 + 1, y0, MAD[3]);
  const h = Math.floor((y1 - y0 - 4) / n);
  for (let k = 0; k < n; k++) { const yb = y0 + 3 + (k + 1) * h, yt = yb - h + 2;
    R.rect(x0 + 3, yt, x1 - 3, yb - 1, hex('#1c120c'));
    let x = x0 + 4; let j = 0;
    while (x < x1 - 5) { const w = 2 + ri(hh(j, k, sem) * 2.4), al = h - 3 - ri(hh(j, k + 5, sem) * 5), c = LIB[ri(hh(j, k + 9, sem) * 9)];
      if (hh(j, k + 13, sem) > 0.9) { x += 3; j++; continue; }
      R.rect(x, yb - al, x + w - 1, yb - 1, c); for (let y = yb - al; y < yb; y++) R.pset(x, y, mez(c, hex('#ffffff'), 0.25));
      R.pset(x + w - 1, yb - al, mez(c, K, 0.4)); if (al > 6) { R.rect(x, yb - al + 2, x + w - 1, yb - al + 2, ORO_S); R.rect(x, yb - 3, x + w - 1, yb - 3, ORO_S); }
      x += w + (hh(j, k + 17, sem) > 0.8 ? 1 : 0); j++; }
    R.rect(x0 + 2, yb, x1 - 2, yb + 1, MAD[2]); R.rect(x0 + 2, yb, x1 - 2, yb, MAD[3]); } };
// una vela en su palmatoria: alto (px de cera), con la llama que tiembla y su halo
const vela = (x, yb, alto, t, k = 0, halo1 = 0.5) => { x = ri(x); yb = ri(yb); alto = Math.max(2, ri(alto));
  R.rect(x - 5, yb - 1, x + 5, yb, ORO_S); R.rect(x - 4, yb - 2, x + 4, yb - 2, ORO); R.rect(x - 1, yb - 4, x + 1, yb - 3, ORO);
  R.rect(x - 1, yb - 4 - alto, x + 1, yb - 5, CREMA); for (let y = yb - 4 - alto; y < yb - 4; y++) R.pset(x + 1, y, hex('#c8bea6'));
  if (alto > 5) R.pset(x - 2, yb - 4 - alto + 3, CREMA);
  const f = Math.sin(t * 13 + k) * 0.6 + Math.sin(t * 7.3 + k * 2) * 0.4, fy = yb - 5 - alto;
  R.pset(x, fy, K); R.disco(x, fy - 2, 1, hex('#ffb040')); R.pset(x + (f > 0.3 ? 1 : 0), fy - 4, hex('#ffd870')); R.pset(x, fy - 3, hex('#fff4c0')); R.pset(x, fy - 2, hex('#fffbe8'));
  if (halo1 > 0) halo(x, fy - 2, 14 + ri(f * 2), hex('#ffd890'), halo1); };
// un reloj de pared redondo: cx, cy, r; vel: vueltas del minutero por segundo (timelapse)
const relojP = (cx, cy, r, t, vel = 1 / 3600, caja = true) => {
  if (caja) { R.rect(cx - 4, cy + r, cx + 4, cy + r + 18, MAD[1]); R.rect(cx - 3, cy + r + 1, cx + 3, cy + r + 16, hex('#1c120c'));
    const p = Math.sin(t * 3.1) * 2.4; R.linea(cx, cy + r + 1, ri(cx + p), cy + r + 12, ORO_S); R.disco(ri(cx + p), cy + r + 13, 2, ORO); }
  R.disco(cx, cy, r + 1, MAD[0]); R.disco(cx, cy, r, MAD[2]); R.disco(cx, cy, r - 2, hex('#ece4d0')); R.disco(cx - 1, cy - 1, r - 4, hex('#f6f0e2'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(ri(cx + Math.cos(a) * (r - 3)), ri(cy + Math.sin(a) * (r - 3)), K); }
  const m = (t * vel) % 1 * Math.PI * 2 - Math.PI / 2, h = (t * vel / 12 + 0.27) % 1 * Math.PI * 2 - Math.PI / 2;
  R.linea(cx, cy, ri(cx + Math.cos(m) * (r - 3)), ri(cy + Math.sin(m) * (r - 3)), K); R.linea(cx, cy, ri(cx + Math.cos(h) * (r - 5)), ri(cy + Math.sin(h) * (r - 5)), K); R.pset(cx, cy, ORO_S); };
// la vista de Londres por una ventana (se pinta en el hueco con porHueco): luz 0 noche … 1 día
const vistaLondres = (x0, y0, x1, y1, t, luz = 1, sem = 3) => {
  const CD = [pal('#1a1e34', '#262c48', '#3a3e60'), pal('#5a6a8a', '#8a98b4', '#b8c4d8')];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = (y - y0) / (y1 - y0);
    const dia = tono(pal('#8aa0c0', '#a8b8d0', '#c8d0dc', '#e0d8c8'), v * 3 + hh(x >> 3, y >> 2, sem) * 0.4, x, y), noc = tono(pal('#10142a', '#1a2040', '#2a2e54', '#3e3a5e'), v * 3 + hh(x >> 3, y >> 2, sem) * 0.4, x, y);
    R.pset(x, y, luz >= 1 ? dia : luz <= 0 ? noc : mez(noc, dia, luz)); }
  if (luz < 0.5) for (let k = 0; k < 18; k++) { const sx = x0 + ri(hh(k, 1, sem) * (x1 - x0)), sy = y0 + ri(hh(k, 2, sem) * (y1 - y0) * 0.5); if (Math.sin(t * 3 + k) > -0.5) R.pset(sx, sy, mez(hex('#fff8d8'), hex('#2a2e54'), luz * 1.6)); }
  const NC = luz > 0.5 ? [pal('#8a94a8', '#a6aec0', '#c8ccd8'), pal('#98a2b4', '#b6bdcc', '#d6dae4'), pal('#aab2c2', '#c8ced8', '#e8ecf0')] : [pal('#222642', '#2e3352', '#3c4062'), pal('#262a48', '#343a5a', '#444a6a'), pal('#2a2e4c', '#3a4062', '#4a5070')];
  for (let k = 0; k < 3; k++) { const w = 30 + hh(k, 3, sem) * 24, x = x0 + ((hh(k, 4, sem) * 200 + t * (2 + k * 2.5)) % (x1 - x0 + 70)) - 35; nube(x, y0 + 8 + k * 8, w, NC[k], k + sem); }
  // tejados y chimeneas en tres términos, con la cúpula a lo lejos
  const T3 = [hex(luz > 0.5 ? '#7a7a88' : '#2a2a3e'), hex(luz > 0.5 ? '#5a5466' : '#22223a'), hex(luz > 0.5 ? '#3e3644' : '#1a1a2c')];
  const cx = ri((x0 + x1) / 2 + 10), cy = y1 - 30; R.disco(cx, cy, 9, T3[0]); R.rect(cx - 9, cy, cx + 9, y1, T3[0]); R.rect(cx - 1, cy - 14, cx + 1, cy - 9, T3[0]); R.pset(cx, cy - 15, ORO); R.rect(cx - 3, cy - 10, cx + 3, cy - 9, T3[0]);
  for (let p = 0; p < 3; p++) { let x = x0 - 6 + ri(hh(p, 5, sem) * 8);
    while (x < x1) { const w = 14 + ri(hh(x, p, sem) * 14), h = y1 - 22 + p * 7 - ri(hh(x, p + 3, sem) * 10);
      for (let i = 0; i < w; i++) { const tech = h + Math.abs(i - w / 2) * 0.45; R.rect(x + i, ri(tech), x + i, y1, T3[p]); }
      if (hh(x, p + 6, sem) > 0.4) { const ch = x + ri(w * 0.3); R.rect(ch, h - 8, ch + 4, h, T3[p]); R.rect(ch, h - 9, ch + 1, h - 9, hex('#8a4a3a')); R.rect(ch + 3, h - 9, ch + 4, h - 9, hex('#8a4a3a'));
        for (let s = 0; s < 6; s++) { const u = (t * 0.25 + s / 6 + hh(x, 2, sem)) % 1; tine(ch + 2 + ri(u * 10 + Math.sin(t + s) * 2), h - 10 - ri(u * 22), hex(luz > 0.5 ? '#d8d8e0' : '#5a5a70'), 0.6 * (1 - u)); } }
      if (luz < 0.7 && p === 2) for (let wv = x + 3; wv < x + w - 3; wv += 6) if (hh(wv, p, sem) > 0.5) R.rect(wv, h + 6, wv + 1, h + 8, hex('#f0c060'));
      x += w + 2; } }
  for (let k = 0; k < 3; k++) { const u = (t * 0.07 + k * 0.31) % 1; ave(x0 + u * (x1 - x0 + 20) - 10, y0 + 14 + k * 6 + Math.sin(t * 2 + k) * 2, t, hex(luz > 0.5 ? '#3a3a4a' : '#8a8aa0'), k); } };
// marco de ventana de guillotina (x0..x1, y0..y1) con sus montantes; devuelve la función barras(x, y) para porHueco
const ventanaG = (x0, y0, x1, y1, C = MAD) => {
  const xm = ri((x0 + x1) / 2), ym = ri((y0 + y1) / 2), xa = ri(x0 + (x1 - x0) / 3), xb = ri(x0 + (x1 - x0) * 2 / 3);
  const barras = (x, y) => x === xa || x === xb || Math.abs(y - ym) <= 1 || y === ri((y0 + ym) / 2) || y === ri((ym + y1) / 2);
  return { barras, pinta: () => {
    R.rect(x0 - 4, y0 - 4, x1 + 4, y0 - 1, C[2]); R.rect(x0 - 4, y1 + 1, x1 + 4, y1 + 4, C[2]); R.rect(x0 - 4, y0 - 1, x0 - 1, y1 + 1, C[2]); R.rect(x1 + 1, y0 - 1, x1 + 4, y1 + 1, C[2]);
    R.rect(x0 - 4, y0 - 4, x1 + 4, y0 - 4, C[3]); R.rect(x0 - 6, y1 + 4, x1 + 6, y1 + 6, C[3]); R.rect(x0 - 6, y1 + 7, x1 + 6, y1 + 7, C[0]);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (barras(x, y)) R.pset(x, y, Math.abs(y - ym) <= 1 ? C[2] : CREMA);
    for (let y = y0; y <= y1; y++) { R.pset(x0, y, C[0]); R.pset(x1, y, C[0]); } } }; };
// cortina de terciopelo que se mece (x0..x1, y0..y1), con su alzapaño
const cortina = (x0, y0, x1, y1, t, C, k = 0) => {
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / (y1 - y0), sw = ri(Math.sin(t * 1.1 + k + u * 2) * u * 1.5), apr = y > y0 + (y1 - y0) * 0.55 && y < y0 + (y1 - y0) * 0.62;
    for (let x = x0; x <= x1; x++) { const f = Math.sin((x - x0) * 1.1 + k) ; R.pset(x + sw, y, apr ? ORO_S : tono(C, 1.5 + f * 0.9 + hh(x, y >> 2, k) * 0.3, x, y)); } }
  R.rect(x0 - 2, y0 - 3, x1 + 2, y0 - 1, ORO_S); R.rect(x0 - 2, y0 - 3, x1 + 2, y0 - 3, ORO); };
// libro cerrado de lado (lomo y canto), visto de frente: w, h; c su color; ojos: dos ojitos amarillos en la tapa
const tomo = (x, yb, w, h, c, ojos = 0, t = 0) => { x = ri(x); yb = ri(yb);
  R.rect(x, yb - h, x + w, yb, K); R.rect(x + 1, yb - h + 1, x + w - 1, yb - 1, c); R.rect(x + 1, yb - h + 1, x + 1, yb - 1, mez(c, hex('#ffffff'), 0.3));
  R.rect(x + w - 2, yb - h + 1, x + w - 1, yb - 1, mez(c, K, 0.35)); R.rect(x + 2, yb - h + 2, x + w - 3, yb - h + 2, ORO); R.rect(x + 2, yb - 2, x + w - 3, yb - 2, ORO);
  if (ojos > 0) { const cx = ri(x + w / 2), cy = ri(yb - h / 2), parp = Math.sin(t * 1.3 + x) > 0.97;
    for (const dx of [-3, 2]) { if (parp) { R.rect(cx + dx, cy, cx + dx + 1, cy, K); continue; } R.rect(cx + dx, cy - 1, cx + dx + 1, cy, hex('#f8d040')); R.pset(cx + dx + 1, cy, K); }
    if (ojos > 0.5) halo(cx, cy, 8, hex('#ffe070'), 0.3 * ojos); } };
// un fardo de papeles atado con cinta (x, yb, w, alto)
const fardo = (x, yb, w, al, cinta = hex('#a82a3a'), sem = 0) => { x = ri(x); yb = ri(yb);
  for (let j = 0; j < al; j++) { const off = ri((hh(j, 1, sem) - 0.5) * 3); R.rect(x + off, yb - j, x + w + off, yb - j, j % 3 === 0 ? hex('#c8bc9c') : hex('#ece2c8')); R.pset(x + w + off, yb - j, hex('#a89c80')); }
  R.rect(x + ri(w / 2) - 1, yb - al, x + ri(w / 2), yb, cinta); R.rect(x - 1, yb - ri(al / 2), x + w + 1, yb - ri(al / 2), cinta); R.pset(x + ri(w / 2) + 1, yb - al - 1, cinta); R.pset(x + ri(w / 2) - 2, yb - al - 1, cinta); };
// un gato dormido (enroscado) que respira y mueve la cola
const gatoD = (x, y, t, c = hex('#5a4a3e'), cl = hex('#7a6a5a')) => { x = ri(x); y = ri(y); const r = Math.sin(t * 2) > 0.6 ? 1 : 0;
  R.disco(x, y - 3, 5 + r, K); R.disco(x, y - 3, 4 + r, c); R.disco(x - 1, y - 5, 2, cl); R.disco(x + 5, y - 4, 3, K); R.disco(x + 5, y - 4, 2, c); R.pset(x + 4, y - 7, c); R.pset(x + 7, y - 7, c); R.pset(x + 5, y - 4, K); R.pset(x + 7, y - 4, K);
  const cola = Math.sin(t * 1.7); R.linea(x - 5, y - 1, x - 9, ri(y - 2 - cola * 2), c); R.pset(x - 9, ri(y - 3 - cola * 2), cl); R.rect(x - 6, y + 1, x + 7, y + 1, mez(c, K, 0.6)); };
// un pajarito (canario) en su jaula colgada: salta de un palo a otro
const jaula = (x, y, t) => { x = ri(x); y = ri(y); R.linea(x, y - 12, x, y - 4, ORO_S);
  for (let i = -8; i <= 8; i += 2) { const top = y - Math.round(Math.sqrt(Math.max(0, 64 - i * i)) * 0.6); R.linea(x + i, top, x + i, y + 14, ORO_S); }
  R.rect(x - 9, y + 14, x + 9, y + 15, ORO); R.rect(x - 8, y + 6, x + 8, y + 6, MAD[2]);
  const s = Math.floor(t * 0.8) % 3, bx = x + [-4, 2, -1][s], by = y + (s === 2 ? 13 : 5) - (((t * 0.8) % 1) < 0.15 ? 2 : 0);
  R.disco(bx, by - 2, 2, hex('#f0d040')); R.pset(bx + 2, by - 3, hex('#e88a20')); R.pset(bx + 1, by - 3, K); R.pset(bx - 2, by - 1, hex('#c8a820')); };
'''

# ─────────────────────────────────────────────── MS-ESCRIBIR (frases 28–29) ───────────────────────────────────────────────
# Los planos de ms-precio que congela la pausa: copias de escenas7.py (grupo 7); el último (la playa, p9) es IDÉNTICO.
PRECIO = r'''
// ── copias IDÉNTICAS de los planos de ms-precio (escenas7.py, grupo 7) que congela la pausa; TPp: sus instantes en segundos ──
const TPp = { BOY: 46.319, MONEY: 47.82, COUNTRY: 48.88, HERS: 49.799, N24: 44.479, TWO: 45.74 };
const llamaP = (x, y, t, k = 0, s = 1, h = true) => { x = ri(x); y = ri(y); const f = Math.sin(t * 13 + k * 2.1) + Math.sin(t * 7.3 + k), al = ri((4 + f * 0.6) * s), dx = ri(Math.sin(t * 5 + k) * 0.7);
  if (h) halo(x, y - 2, ri(16 * s), hex('#ffd890'), 0.42);
  for (let j = 0; j < al; j++) { const u = j / al, w = u < 0.3 ? 1 : u < 0.7 ? 1 : 0; for (let i = -w; i <= w; i++) R.pset(x + i + (j > al * 0.6 ? dx : 0), y - j, j < 2 ? hex('#e86a2a') : (i === 0 && j < al - 1 ? hex('#fff6d0') : hex('#ffc24a'))); }
  R.pset(x, y + 1, hex('#2a1a10')); };
const velaP = (x, yb, t, enc = true, k = 0, al = 9) => { x = ri(x); yb = ri(yb);
  R.rect(x - 5, yb - 1, x + 5, yb, hex('#6a4a1a')); R.rect(x - 4, yb - 2, x + 4, yb - 2, hex('#c8a040')); R.pset(x - 3, yb - 2, hex('#f0d070')); R.rect(x - 1, yb - 5, x + 1, yb - 3, hex('#a07a28'));
  R.rect(x - 2, yb - 5 - al, x + 2, yb - 6, hex('#e8dcc0')); R.rect(x + 1, yb - 5 - al, x + 2, yb - 6, hex('#c4b494')); R.pset(x - 2, yb - 5 - al, hex('#fff8e8')); R.pset(x - 1, yb - 4 - al, hex('#fff8e8'));
  R.pset(x - 2, yb - 3 - al + 4, hex('#f4ecd8')); R.pset(x, yb - 6 - al, hex('#2a1a10'));
  if (enc) llamaP(x, yb - 7 - al, t, k); };
// p4 de ms-precio en su último instante (las dos velas encendidas, la flor en la cuna, Mary triste)
const precioP4 = (t) => { const o = { encuadre: 'casa', camara: 'dentro', cunas: 2, cunaVacia: true, hora: 'dia' }; T.italia(R, t, o);
  velaP(142, 96, t, true, 1, 7); velaP(158, 96, t, true, 2, 7); halo(142, 84, 18, hex('#ffe0a0'), 0.25); halo(158, 84, 18, hex('#ffe0a0'), 0.25);
  R.actor(MS.maryMS, 202, 152, t, { dir: 1, triste: true });
  R.linea(240, 138, 242, 142, hex('#4a7a2a')); R.disco(240, 138, 2, hex('#f4f0f4')); R.pset(240, 138, hex('#f0d040')); R.pset(241, 140, hex('#6a9a3a'));
  T.italiaDelante(R, t, o); };
// p7 de ms-precio al final: el barco ya perdido en la bruma
const precioP7 = (t) => { const o = { encuadre: 'mar', barco: 1 }; T.italia(R, t, o); T.italiaDelante(R, t, o); };
// p8 de ms-precio al final: la terraza de día, Mary al catalejo, la vela del pescador en el horizonte
const precioP8 = (t) => { const o = { encuadre: 'casa', hora: 'dia' }; T.italia(R, t, o);
  const x = 214, y = 96; R.poligono([[x, y], [x + 5, y - 10], [x + 7, y]], hex('#f4f0e6')); R.rect(x - 2, y, x + 8, y + 1, hex('#3a2a1a'));
  R.actor(MS.percyNinoMS, 104, 152, t, { dir: 1 }); R.actor(MS.maryMS, 252, 152, t, { dir: 1, sostiene: [270, 130], triste: true }); T.italiaDelante(R, t, o); };
const precioP9 = (t) => {
  const o = { encuadre: 'mar', camara: 'playa', cielo: 'gris' };
  T.italia(R, t, o);
  const an = tramo(t, 44.4, TPp.BOY), mx = ri(lerp(78, 126, ease(an))), nx = mx + 16, bolsa = t > TPp.MONEY - 0.5 && t < TPp.COUNTRY;
  R.actor(MS.percyNinoMS, nx, 154, t, { dir: 1, anda: an > 0 && an < 1, dedo: t > TPp.COUNTRY && t < TPp.HERS + 0.4 });
  const rm = R.actor(MS.maryLutoMS, mx, 152, t, { dir: 1, anda: an > 0 && an < 1, sostiene: bolsa ? [mx + 12, 132] : [nx + 3, 143], triste: t > TPp.MONEY - 0.5 });
  if (bolsa && rm.mano) { const [hx, hy] = rm.mano.map(ri); R.icono('bolsa', hx - 3, hy - 6, hex('#8a6a4a'), K, 1); const u = tramo(t, TPp.MONEY - 0.2, TPp.MONEY + 0.4); if (u > 0 && u < 1) { R.disco(hx, ri(hy + 2 + u * 14), 1, hex('#e8c040')); R.disco(hx + 3, ri(hy + 2 + u * 10), 1, hex('#e8c040')); } }
  const num = (txt, x, t0) => { if (t < t0 - 0.1 || t > t0 + 2.2) return; const s = Math.min(1, (t - t0 + 0.1) / 0.3), a = Math.min(1, (t0 + 2.2 - t) / 0.4); if (a < 0.5 && (ri(t * 20) % 2)) return; R.numero(txt, x, ri(118 - s * 5), { centro: true, rampa: pal('#7a4a1a', '#c88a2a', '#f0c04a', '#fff0a0') }); };
  num('24', mx + 8, TPp.N24); num('2', nx + 8, TPp.TWO);
  T.italiaDelante(R, t, o);
};
const congela = (k, f, t0) => { R.copiar(capa(k, () => f(t0))); };
'''

ESCRIBIR = r'''
// ── la revista de 1986 (tapa azul con una gráfica), a escala de Atom al doble ──
const revista = (x, y, u = 1) => { x = ri(x); y = ri(y); const w = 22, h = 28;
  R.rect(x - 1, y - h - 1, x + w + 1, y + 1, K); R.rect(x, y - h, x + w, y, hex('#2a5a9a')); R.rect(x, y - h, x + w, y - h + 6, hex('#e8e0c8'));
  for (let i = 0; i < 4; i++) R.rect(x + 3 + i * 4, y - h + 2, x + 4 + i * 4, y - h + 3, hex('#2a5a9a'));
  R.rect(x + 3, y - 14, x + 19, y - 4, hex('#f4f0e4')); for (const [bx, bh] of [[5, 4], [9, 7], [13, 3], [17, 6]]) R.rect(x + bx, y - 4 - bh, x + bx + 1, y - 5, hex('#c83a3a'));
  R.linea(x + 4, y - 7, x + 18, y - 12, hex('#3a8a4a')); R.rect(x + 1, y - h + 7, x + 1, y - 1, hex('#5a8aca')); R.rect(x + 16, y - h + 8, x + 20, y - h + 12, ORO); };
// ── 1 · la playa congelada: Atom al doble entra, señala; en «published» saca la revista y en «1986» sale el año ──
const q1 = (t) => {
  congela('fzPlaya', precioP9, 50.466); AT.pausa(R, tramo(t, 0, 0.35));
  const anda = tramo(t, 0.1, 1.2), x = ri(lerp(-30, 66, anda)), saca = t > W.PUBLISHED - 0.25;
  const ra = atomG(x, 176, t, { pose: anda < 1 ? 'camina' : saca ? 'sostiene' : 'senala', dir: 1, cara: t > W.Y1986 && t < W.Y1986 + 0.9 ? 'sorpresa' : 'sonrisa' });
  if (saca && ra.mano) { const u = tramo(t, W.PUBLISHED - 0.25, W.PUBLISHED + 0.2); revista(ra.mano[0] - 4, ra.mano[1] + 10 + ri((1 - u) * 16)); }
  const u = tramo(t, W.Y1986 - 0.1, W.Y1986 + 0.3); anio('1986', 206, 78, u); if (t > W.Y1986) AT.anillo(R, 206, 70, 38, 17, t, tramo(t, W.Y1986, W.Y1986 + 0.8));
};
// ── 2 · el aula de 1986 (fondo local): entra el psicólogo, reparte las hojas; escriben; el calendario pasa del 1 al 4 ──
const AULA_V = [188, 28, 262, 90];
const aulaFondo = () => capa('aula', () => {
  // pared de bloques de hormigón pintados de crema, con sus juntas
  for (let y = 0; y < 116; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 9), j = y % 9, i = (x + (f & 1) * 10) % 20;
    const v = j === 8 || i === 19 ? 0.4 : 1.7 + (j === 0 ? 0.6 : 0) + hh(x >> 1, y >> 1, 41) * 0.45 + (hh(Math.floor((x + (f & 1) * 10) / 20), f, 42) - 0.5) * 0.5; R.pset(x, y, tono(pal('#a89c84', '#c8bc9e', '#dcd2b8', '#ece4cc'), v, x, y)); }
  R.rect(0, 0, 319, 3, hex('#e8e4d8')); R.rect(0, 4, 319, 4, hex('#a8a090'));
  // el zócalo y el linóleo a cuadros
  R.rect(0, 113, 319, 117, hex('#4a3a30')); R.rect(0, 113, 319, 113, hex('#6a5a4a'));
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const s = 1 + (y - 118) / 30, cx = Math.floor((x - 160) / (14 * s) + 100), cy = Math.floor((y - 118) / (5 + (y - 118) * 0.12));
    const a = (cx + cy) & 1; R.pset(x, y, tono(a ? pal('#8a6a4a', '#a8865e', '#c0a074') : pal('#b8aa8a', '#d2c4a2', '#e4d8b8'), 1 + hh(x >> 1, y, 43) * 0.7 + (y < 124 ? -0.5 : 0), x, y)); }
  for (let x = 60; x < 260; x += 3) tine(x + ri(Math.sin(x) * 2), 140 + ri(hh(x, 3, 44) * 6), hex('#fff8e8'), 0.25);
  // la puerta de la izquierda, con su ventanuco
  R.rect(4, 42, 34, 113, hex('#3a2a1e')); R.rect(6, 44, 32, 113, hex('#7a5a3a')); tablas(7, 45, 31, 112, pal('#4a3220', '#6a4a2e', '#7e5a38', '#9a7048'), 6, 45);
  R.rect(12, 52, 26, 72, K); R.rect(13, 53, 25, 71, hex('#9ab8c8')); R.linea(14, 70, 24, 54, hex('#c8dce4')); R.rect(28, 80, 30, 82, ORO);
  // el corcho con papeles clavados
  R.rect(84, 46, 150, 84, hex('#5a3a22')); for (let y = 48; y < 83; y++) for (let x = 86; x < 149; x++) R.pset(x, y, tono(pal('#8a5a34', '#a8744a', '#c08a5a'), 1 + hh(x, y, 46) * 1.2, x, y));
  for (const [px, py, w, h, c] of [[90, 52, 14, 16, '#f4f0e0'], [108, 50, 16, 12, '#f8e870'], [128, 54, 16, 20, '#f4f0e0'], [94, 70, 18, 10, '#a8d0f0'], [116, 66, 10, 14, '#f0b8c8'], [134, 76, 12, 6, '#f4f0e0']]) {
    R.rect(px + 1, py + 1, px + w + 1, py + h + 1, hex('#4a2a14')); R.rect(px, py, px + w, py + h, hex(c)); for (let k = py + 4; k < py + h - 1; k += 3) R.rect(px + 2, k, px + w - 3 - (k % 7), k, hex('#8a8a90')); R.disco(px + ri(w / 2), py + 1, 1, hex('#d83a3a')); }
  // la ventana grande de aluminio
  const [a, b, c, d] = AULA_V; R.rect(a - 4, b - 4, c + 4, d + 6, hex('#8a8e94')); R.rect(a - 3, b - 3, c + 3, d + 3, hex('#c4c8cc')); R.rect(a - 6, d + 4, c + 6, d + 7, hex('#d8d8d0')); R.rect(a - 6, d + 8, c + 6, d + 8, hex('#7a7a74'));
  // la estantería baja con una planta (bajo la zona de Atom)
  R.rect(280, 72, 318, 113, MADC[1]); for (let k = 0; k < 2; k++) { R.rect(282, 76 + k * 19, 316, 92 + k * 19, hex('#2a1c12')); let x = 283; for (let j = 0; x < 314; j++) { const w = 2 + ri(hh(j, k, 47) * 3), c2 = ['#c83a3a', '#2a6aaa', '#e8b830', '#3a8a4a', '#e8e0d0', '#7a3a8a'][ri(hh(j, k, 48) * 5)]; R.rect(x, 92 + k * 19 - 12 + ri(hh(j, k, 49) * 4), x + w - 1, 92 + k * 19, hex(c2)); x += w + 1; } }
  R.rect(280, 72, 318, 73, MADC[3]);
});
const aulaVista = (t) => porHueco(AULA_V[0], AULA_V[1], AULA_V[2], AULA_V[3], () => {
  for (let y = AULA_V[1]; y <= AULA_V[3]; y++) for (let x = AULA_V[0]; x <= AULA_V[2]; x++) R.pset(x, y, tono(pal('#5a9ad8', '#78b0e4', '#9ac4ec', '#c4dcf0'), (y - AULA_V[1]) / 20 + hh(x >> 3, y >> 2, 50) * 0.4, x, y));
  nubes(t, AULA_V[1], AULA_V[1] + 30, [pal('#b8c8dc', '#d8e2ee', '#f4f8fc'), pal('#c8d4e4', '#e4ecf4', '#ffffff'), pal('#d0dcea', '#eef2f8', '#ffffff')], 51, 0.6);
  // el edificio de ladrillo del campus con su torre y un árbol que se mece
  R.rect(196, 58, 250, 90, hex('#a84a3a')); for (let y = 60; y < 90; y += 3) R.rect(196, y, 250, y, hex('#8a3a2e')); for (let x = 200; x < 248; x += 8) R.rect(x, 64, x + 3, 70, hex('#e8e0c8'));
  R.rect(214, 40, 228, 58, hex('#b8584a')); R.poligono([[212, 40], [221, 30], [230, 40]], hex('#5a6a7a')); R.disco(221, 46, 3, hex('#f0ece0'));
  copa(250, 66, 26, 22, t, pal('#2a5a2a', '#3a7a3a', '#5a9a4a', '#8ac060'), 52, 1.4); R.rect(249, 80, 251, 90, hex('#4a3a2a'));
  for (let k = 0; k < 2; k++) { const u = (t * 0.1 + k * 0.5) % 1; ave(186 + u * 90, 36 + k * 8, t, hex('#2a2a3a'), k); }
}, 0, (x, y) => x === 225 || y === 59);
const PUP = [62, 118, 174, 230];   // los centros de los cuatro pupitres
const ALUM = ['estudiante1DU', 'lector2DU', 'estudiante2DU', 'estudiante3DU'];
const q2 = (t) => {
  aulaFondo(); R.copiar(capas.aula); aulaVista(t);
  const [a, b, c, d] = AULA_V; R.rect(a - 1, ri((b + d) / 2), c + 1, ri((b + d) / 2) + 1, hex('#c4c8cc')); R.rect(225, b, 225, d, hex('#c4c8cc'));
  // los fluorescentes (uno parpadea) y el reloj con su segundero
  for (const [lx, k] of [[196, 0], [238, 1]]) { const on = k === 0 || Math.sin(t * 23) > -0.7 || (t % 3) > 0.2; R.rect(lx, 6, lx + 34, 9, hex('#8a8a90')); R.rect(lx + 1, 7, lx + 33, 8, on ? hex('#fffcf0') : hex('#c8c8c0')); if (on) for (let x = lx; x <= lx + 34; x += 2) tine(x, 11, hex('#fff8e0'), 0.35); }
  relojP(172, 46, 8, t, 1 / 60, false); { const s = (t % 60) / 60 * Math.PI * 2 - Math.PI / 2; R.linea(172, 46, ri(172 + Math.cos(s) * 6), ri(46 + Math.sin(s) * 6), hex('#c83a3a')); }
  // el calendario de pared (bajo la zona de Atom): pasa del 1 al 4 en «four days»
  const dia = t < W.FOUR - 0.05 ? 1 : 1 + Math.min(3, Math.floor((t - W.FOUR + 0.05) / 0.25) + 1), hoja = t > W.FOUR - 0.05 && t < W.ROW ? ((t - W.FOUR + 0.05) % 0.25) / 0.25 : 0;
  R.rect(280, 48, 312, 70, K); R.rect(281, 49, 311, 69, hex('#f8f4ea')); R.rect(281, 49, 311, 53, hex('#c83a3a')); for (let x = 284; x < 310; x += 4) R.rect(x, 47, x, 50, hex('#8a8a90'));
  R.numero(String(dia), 296, 66, { centro: true, color: K }); if (hoja > 0) { const hy = ri(54 + hoja * -10); R.rect(281, hy, 311, hy + ri((1 - hoja) * 14), hex('#efe8da')); }
  // los pupitres: tableros, alumnos detrás (asoman), hojas y bolis
  for (const px of PUP) { R.rect(px - 22, 132, px + 22, 136, hex('#5a4a3a')); R.rect(px - 22, 132, px + 22, 132, hex('#c8a878')); R.rect(px - 21, 133, px + 21, 135, hex('#a8865a')); }
  const anda = tramo(t, W.PSYCH, W.STUDENTS + 0.6), sx = ri(lerp(10, 258, anda)), llega = (px) => sx > px + 4;
  for (let k = 0; k < 4; k++) { const px = PUP[k]; if (llega(px)) { R.rect(px + 1, 131, px + 15, 134, hex('#f8f8f0')); for (let y = 132; y <= 133; y++) R.rect(px + 3, y, px + 3 + ri(tramo(t, W.WRITE + k * 0.2, W.ROW + 0.5) * 10), y, hex('#3a4a8a')); } }
  R.recorte([0, 0, 319, 133]);
  const manos = [];
  for (let k = 0; k < 4; k++) { const px = PUP[k], escribe = t > W.WRITE + k * 0.15 && llega(px);
    const r = R.actor(EL[ALUM[k]], px - 14, 146, t, { dir: 1, sostiene: escribe ? [px + 6 + ri(Math.sin(t * 9 + k) * 2), 132] : undefined, habla: !llega(px) && k === 1 ? 0.5 : 0, sonrisa: k === 2 });
    manos.push(escribe ? r.mano : null); }
  R.recorte(null);
  for (let k = 0; k < 4; k++) if (manos[k]) { const [mx, my] = manos[k]; R.linea(mx + 1, my - 1, mx + 4, my - 5, hex('#2a3a8a')); R.pset(mx + 4, my - 6, hex('#e8e8f0')); }
  PUP.forEach((px, k) => { for (let y = 137; y <= 152; y++) for (let x = px - 20; x <= px + 20; x++) R.pset(x, y, (x === px - 20 || x === px + 20 || y === 152) ? hex('#4a4a52') : tono(pal('#6a6a74', '#80808a', '#9a9aa4', '#b4b4bc'), 1.6 + (y === 137 ? 1.4 : 0) - (x > px + 14 ? 0.7 : 0) + hh(x >> 1, y, 53 + k) * 0.4, x, y));
    for (let j = 0; j < 4; j++) R.rect(px - 14 + j * 4, 147, px - 12 + j * 4, 148, hex('#4a4a52'));
    R.rect(px + 6, 141, px + 12, 145, [hex('#e8c040'), hex('#4ac8a8'), hex('#e85a8a'), hex('#5a8ae8')][k]); R.pset(px + 7, 142, hex('#ffffff'));
    R.rect(px - 18, 152, px - 17, 166, hex('#4a4a50')); R.rect(px + 16, 152, px + 17, 166, hex('#4a4a50')); R.rect(px - 22, 166, px + 22, 167, hex('#3a3a40'));
    // la mochila de cada uno en el suelo, junto al pupitre
    const mx = px + 24, mc = [hex('#c83a3a'), hex('#2a6aaa'), hex('#3a8a4a'), hex('#e89a30')][k]; R.rect(mx - 1, 155, mx + 9, 167, K); R.rect(mx, 156, mx + 8, 166, mc); R.rect(mx + 1, 160, mx + 7, 163, mez(mc, K, 0.3)); R.rect(mx + 2, 156, mx + 6, 157, mez(mc, hex('#ffffff'), 0.3)); R.linea(mx + 2, 155, mx + 4, 152, K); R.linea(mx + 6, 155, mx + 4, 152, K); });
  // la papelera con bolas de papel y una zapatilla perdida
  R.rect(296, 150, 312, 168, hex('#5a5a62')); R.rect(297, 151, 311, 167, hex('#7a7a84')); for (let x = 299; x < 311; x += 3) R.rect(x, 153, x, 166, hex('#5a5a62')); R.disco(301, 149, 3, hex('#f4f0e4')); R.disco(307, 148, 3, hex('#e8e4d8')); R.disco(304, 146, 2, hex('#ffffff'));
  R.rect(40, 170, 50, 174, hex('#f4f4f4')); R.rect(40, 174, 51, 175, hex('#c83a3a')); R.rect(41, 171, 44, 172, hex('#2a6aaa'));
  // el psicólogo entra por la puerta y reparte; en «four days» señala el calendario
  const puerta = tramo(t, W.Q2 - 0.1, W.PSYCH + 0.3) * (1 - tramo(t, W.JAMES + 0.4, W.JAMES + 1)); if (puerta > 0) { R.rect(6, 44, 6 + ri(puerta * 12), 113, hex('#1a120c')); }
  const quieto = anda >= 1, apunta = t > W.FOUR - 0.3;
  const r = R.actor(EL.lector1DU, sx, 172, t, { dir: 1, anda: anda > 0 && anda < 1, dedo: apunta, sostiene: !apunta ? true : undefined, habla: quieto ? voz(t) : 0, sonrisa: quieto });
  if (!apunta && r.mano) { const [mx, my] = r.mano, n = 4 - PUP.filter(llega).length; for (let j = 0; j <= n; j++) R.rect(mx - 6, my - 1 - j, mx + 6, my - 1 - j, j === n ? hex('#ffffff') : hex('#d8d4c8')); }
};
// ── 3 · la casa de Italia congelada: Atom con el reloj en «15 minutes»; en «about something» sube el cuaderno; el nudo oscuro ──
const nudo = (cx, cy, t, u, c = hex('#2a2430'), s = 1.7) => { if (u <= 0) return; const n = ri(u * 90);
  for (let k = 0; k < n; k++) { const a = k * 0.73 + t * 1.3, r = (4 + (k % 9) * 1.6 * u) * s; R.linea(ri(cx + Math.cos(a) * r), ri(cy + Math.sin(a * 1.3) * r * 0.7), ri(cx + Math.cos(a + 1.9) * r), ri(cy + Math.sin(a * 1.3 + 1.9) * r * 0.7), k % 4 ? c : hex('#5a4a6a')); } };
const relojBolsillo = (x, y, t, u) => { x = ri(x); y = ri(y); R.disco(x, y, 9, K); R.disco(x, y, 8, ORO); R.disco(x, y, 6, hex('#f8f4e8')); R.rect(x - 1, y - 12, x + 1, y - 9, ORO); R.disco(x, y - 13, 2, ORO_S);
  if (u > 0) for (let a = 0; a < u * Math.PI / 2; a += 0.08) for (let r = 0; r <= 5; r++) tine(x + Math.cos(a - Math.PI / 2) * r, y + Math.sin(a - Math.PI / 2) * r, hex('#f8b040'), 0.7);
  const a = -Math.PI / 2 + u * Math.PI / 2; R.linea(x, y, ri(x + Math.cos(a) * 5), ri(y + Math.sin(a) * 5), K); R.linea(x, y, x, y - 5, K); };
const q3 = (t) => {
  congela('fzDentro', precioP4, 21.8); AT.pausa(R, 1);
  const reloj = t < W.ABOUT - 0.1, ra = atomG(56, 176, t, { pose: reloj ? 'sostiene' : t < W.DEEPLY ? 'senala' : 'quieto', dir: 1, cara: t > W.DEEPLY ? 'triste' : 'sonrisa' });
  if (reloj && ra.mano) { const u = tramo(t, W.Q3, W.DAY); relojBolsillo(ra.mano[0] + 4, ra.mano[1] - 6, t, u); anio('15', ra.mano[0] + 4, ra.mano[1] - 26, tramo(t, W.Q3 - 0.1, W.Q3 + 0.3)); }
  const sube = tramo(t, W.ABOUT - 0.3, W.ABOUT + 0.4), py = ri(172 + (1 - sube) * 50) + flota(t);
  if (sube > 0) { T.pausa(R, 150, py, t, { cual: 'cuaderno', escrito: tramo(t, W.ABOUT, W.Q4 + 2) }); }
  nudo(150, ri(lerp(120, 96, tramo(t, W.DEEPLY, W.THEM))) + flota(t, 1), t, tramo(t, W.DEEPLY - 0.1, W.PAINFUL + 0.4));
};
// ── 4 · el mar de la tormenta congelado: el cuaderno grande; de sus páginas suben el barquito («what happened») y el corazón («how it felt») ──
const corazonG = (x, y, s, c) => { ['.kk.kk.', 'kcckcck', 'kccccck', 'kccccck', '.kcccck.', '..kcck..', '...kk...'].forEach((f, j) => [...f].forEach((ch, i) => { if (ch !== '.') R.rect(ri(x + i * s), ri(y + j * s), ri(x + i * s) + s - 1, ri(y + j * s) + s - 1, ch === 'k' ? K : (i < 3 && j < 3 ? mez(c, hex('#ffffff'), 0.35) : c)); })); };
const barquito = (x, y, s) => { x = ri(x); y = ri(y); const B = [['...k....', '..kwk...', '.kwwk...', 'kwwwk...', '...k....', 'kbbbbbbk', '.kbbbbk.']];
  B[0].forEach((f, j) => [...f].forEach((ch, i) => { if (ch !== '.') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, ch === 'k' ? K : ch === 'w' ? hex('#f4f0e4') : hex('#3a6aaa')); })); };
const q4 = (t) => {
  congela('fzMar', precioP7, 37.55); AT.pausa(R, 1);
  T.pausa(R, 146, 174 + flota(t), t, { cual: 'cuaderno', s: 3, escrito: tramo(t, W.Q4 - 1, W.FELT + 0.8) });
  const u1 = tramo(t, W.WHAT - 0.1, W.HAPP2 + 0.5), u2 = tramo(t, W.HOW - 0.1, W.FELT + 0.4);
  if (u1 > 0) { barquito(96, ri(126 - u1 * 54) + flota(t), 3); if (u1 > 0.6) AT.anillo(R, 108, ri(82) + flota(t), 20, 16, t, tramo(t, W.HAPP2, W.HAPP2 + 0.6)); }
  if (u2 > 0) { corazonG(172, ri(126 - u2 * 56) + flota(t, 2), 3, hex('#e8506a')); halo(183, ri(80) + flota(t, 2), 20, hex('#ff9aa8'), 0.4 * u2); }
  atomG(262, 176, t, { pose: t > W.WHAT - 0.2 && t < W.FELT + 0.6 ? 'senala' : 'quieto', dir: -1, cara: t > W.HOW ? 'sonrisa' : 'normal' });
};
// ── 5 · la casa blanca congelada: la gráfica de cómo se sintieron (baja en «worse», sube con los meses) ──
const q5 = (t) => {
  congela('fzCasa', precioP8, 44.3); AT.pausa(R, 1);
  const X0 = 100, Y0 = 50, X1 = 262, Y1 = 126;
  R.rect(X0 + 2, Y0 + 2, X1 + 2, Y1 + 2, hex('#3a3e4e')); R.rect(X0, Y0, X1, Y1, hex('#f6f0dc'));
  for (let x = X0 + 4; x < X1; x += 6) for (let y = Y0 + 2; y < Y1; y++) R.pset(x, y, hex('#d8e4ec')); for (let y = Y0 + 4; y < Y1; y += 6) for (let x = X0 + 1; x < X1; x++) R.pset(x, y, hex('#d8e4ec'));
  R.disco(X0 + 6, Y0 + 3, 2, hex('#d83a3a')); R.disco(X1 - 6, Y0 + 3, 2, hex('#3a6ad8'));
  const ax = X0 + 12, ay = Y1 - 14; R.rect(ax, Y0 + 8, ax + 1, ay, K); R.rect(ax, ay, X1 - 8, ay + 1, K);
  // la línea: empieza a media altura, baja en «worse» y sube con los meses
  const P = (u) => { const x = ax + 4 + u * (X1 - ax - 20); const y = u < 0.22 ? lerp(80, 104, ease(u / 0.22)) : lerp(104, 60, ease((u - 0.22) / 0.78)) + Math.sin(u * 18) * 2; return [x, y]; };
  const u = t < W.WORSE + 0.3 ? 0.22 * tramo(t, W.FIRST - 0.2, W.WORSE + 0.3) : 0.22 + 0.78 * tramo(t, W.BUT, W.WENT + 0.3);
  let [lx, ly] = P(0);
  for (let s = 0.01; s <= u; s += 0.01) { const [nx, ny] = P(s); R.linea(ri(lx), ri(ly), ri(nx), ri(ny), s < 0.22 ? hex('#c83a3a') : hex('#2a8a4a')); R.linea(ri(lx), ri(ly) + 1, ri(nx), ri(ny) + 1, s < 0.22 ? hex('#c83a3a') : hex('#2a8a4a')); lx = nx; ly = ny; }
  // la carita en la punta de la línea
  const cx = ri(lx), cy = ri(ly) - 6, feliz = u > 0.4; R.disco(cx, cy, 6, K); R.disco(cx, cy, 5, feliz ? hex('#f8d040') : hex('#a8b8d8')); R.pset(cx - 2, cy - 1, K); R.pset(cx + 2, cy - 1, K);
  if (feliz) { R.pset(cx - 2, cy + 2, K); R.rect(cx - 1, cy + 3, cx + 1, cy + 3, K); R.pset(cx + 2, cy + 2, K); } else { R.pset(cx - 2, cy + 3, K); R.rect(cx - 1, cy + 2, cx + 1, cy + 2, K); R.pset(cx + 2, cy + 3, K); if (Math.sin(t * 6) > 0) R.pset(cx + 3, cy + 1, hex('#5a9ae8')); }
  // los meses: 1 … 6 bajo el eje
  for (let m = 1; m <= 6; m++) { const tm = W.FOLLOWING + (m - 1) * 0.16; if (t < tm) continue; const mx = ri(ax + 4 + (0.22 + 0.78 * (m / 6)) * (X1 - ax - 20)); R.rect(mx, ay - 2, mx, ay + 3, K); R.numero(String(m), mx, ay + 12 - ri((1 - tramo(t, tm, tm + 0.2)) * 3), { centro: true, color: hex('#3a3e4e') }); }
  atomG(52, 176, t, { pose: t < W.FIRST ? 'camina' : 'senala', dir: 1, cara: t > W.WORSE - 0.2 && t < W.BUT ? 'triste' : t > W.MONTHS ? 'sonrisa' : 'normal' });
};
// ── 6 · la sala de espera del médico (fondo local): los que escribieron su dolor van menos (2) que los de lo trivial (5) ──
const espera = () => capa('espera', () => {
  for (let y = 0; y < 92; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#94b8a8', '#a8c8b8', '#bcd8c8', '#d0e6d8'), 1.6 + hh(x >> 2, y >> 1, 61) * 0.6 + (y < 6 ? 0.8 : 0) - (x % 40 === 0 ? 0.6 : 0), x, y));
  R.rect(0, 0, 319, 3, hex('#eef2ec')); R.rect(0, 4, 319, 4, hex('#7a9a8a'));
  for (let y = 92; y < 118; y++) for (let x = 0; x < 320; x++) { const j = (y - 92) % 6 === 5 || x % 6 === 5; R.pset(x, y, j ? hex('#3e6e62') : tono(pal('#4a8a7a', '#5a9a8a', '#6eae9c'), 1 + hh(x / 6 | 0, (y - 92) / 6 | 0, 62) * 1.2 + ((x % 6 === 0 || (y - 92) % 6 === 0) ? 0.6 : 0), x, y)); }
  R.rect(0, 90, 319, 91, hex('#e8ece4')); R.rect(0, 116, 319, 117, hex('#2e4e46'));
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const s = (y - 118) / 62; R.pset(x, y, tono(pal('#7a7468', '#948e80', '#aaa494', '#c4beac'), 1.6 + hh(x, y, 63) * 0.9 - (hh(x >> 2, y >> 1, 64) > 0.92 ? 1 : 0) + s * 0.3, x, y)); }
  for (let x = 0; x < 320; x += 23) R.linea(x, 118, ri(160 + (x - 160) * 1.6), 179, hex('#857f72'));
  // la puerta de la consulta con su cruz roja
  R.rect(144, 46, 178, 117, hex('#6a6a6a')); R.rect(146, 48, 176, 117, hex('#e8e4dc')); R.rect(150, 56, 172, 76, hex('#a8c0c8')); for (let y = 57; y < 76; y += 2) R.rect(151, y, 171, y, hex('#bcd0d6'));
  R.rect(170, 84, 173, 86, ORO); R.rect(152, 34, 170, 44, hex('#f4f4f4')); R.rect(152, 34, 170, 34, hex('#c8c8c8')); R.rect(159, 36, 163, 42, hex('#d83a3a')); R.rect(155, 38, 167, 40, hex('#d83a3a'));
  // un cuadro del velero, un póster del corazón y un helecho
  R.rect(46, 30, 94, 62, MADC[2]); R.rect(49, 33, 91, 59, hex('#a8c8e0')); R.rect(49, 50, 91, 59, hex('#4a7aaa')); R.poligono([[68, 36], [68, 50], [58, 50]], hex('#f4f0e4')); R.poligono([[70, 38], [70, 50], [80, 50]], hex('#f4f0e4')); R.rect(58, 50, 82, 53, hex('#8a4a2a'));
  R.rect(214, 30, 244, 64, hex('#f4f0e4')); corazonG(220, 36, 2, hex('#d83a3a')); for (let y = 54; y < 62; y += 3) R.rect(218, y, 240, y, hex('#9a9a9a'));
  R.rect(128, 98, 140, 116, hex('#b86a3a')); R.rect(127, 96, 141, 99, hex('#d88a5a'));
  // los bancos de listones
  // la mesita baja con revistas, el paragüero, la caja de juguetes y una alfombrilla
  alfombra(132, 158, 190, 176, [hex('#c86a3a'), hex('#8a3a2a'), hex('#f0c070')], 65);
  R.rect(140, 150, 184, 153, MADC[2]); R.rect(140, 150, 184, 150, MADC[3]); R.rect(142, 154, 144, 166, MADC[1]); R.rect(180, 154, 182, 166, MADC[1]);
  for (const [x, c] of [[144, '#d83a5a'], [152, '#3a8ad8'], [161, '#f0c030'], [170, '#3aa86a']]) { R.rect(x, 146, x + 8, 149, K); R.rect(x + 1, 146, x + 7, 148, hex(c)); R.rect(x + 2, 147, x + 5, 147, hex('#ffffff')); }
  R.rect(6, 128, 16, 150, hex('#3a4a5a')); R.rect(7, 129, 15, 149, hex('#5a6a7a')); R.linea(9, 128, 8, 110, hex('#2a2a2a')); R.linea(13, 128, 15, 112, hex('#c83a3a')); R.disco(15, 111, 2, hex('#c83a3a'));
  R.rect(300, 140, 318, 156, hex('#e8b030')); R.rect(301, 141, 317, 155, hex('#f8d050')); R.rect(304, 136, 309, 140, hex('#d83a3a')); R.rect(310, 134, 315, 140, hex('#3a8ad8')); R.disco(312, 133, 2, hex('#3aa86a'));
  for (const [b0, b1] of [[16, 126], [192, 304]]) { for (let y = 118; y < 132; y += 4) { R.rect(b0, y, b1, y + 2, MADC[2]); R.rect(b0, y, b1, y, MADC[3]); } R.rect(b0, 134, b1, 137, MADC[1]); R.rect(b0, 134, b1, 134, MADC[3]); for (const lx of [b0 + 4, b1 - 6]) R.rect(lx, 118, lx + 2, 150, hex('#3a3a3e')); }
});
const ESP_IZQ = [['estudiante1DU', 66]], ESP_DER = [['lector2DU', 200], ['estudiante2DU', 222], ['alumno1', 244], ['estudiante3DU', 268]];
const libreta = (x, y, oscura) => { x = ri(x); y = ri(y); R.rect(x - 4, y - 6, x + 4, y + 4, K); R.rect(x - 3, y - 5, x + 3, y + 3, oscura ? hex('#3a3046') : hex('#f4f0e0'));
  if (oscura) { R.linea(x - 2, y - 3, x + 2, y + 1, hex('#8a7a9a')); R.linea(x + 2, y - 3, x - 2, y + 1, hex('#8a7a9a')); } else { R.disco(x, y - 1, 1, hex('#f0b020')); R.pset(x - 2, y - 1, hex('#f0b020')); R.pset(x + 2, y - 1, hex('#f0b020')); R.pset(x, y - 3, hex('#f0b020')); R.pset(x, y + 1, hex('#f0b020')); } };
const cruz = (x, y, u) => { if (u <= 0) return; y = ri(y - (1 - u) * 5); x = ri(x); R.rect(x - 4, y - 4, x + 4, y + 4, K); R.rect(x - 3, y - 3, x + 3, y + 3, hex('#ffffff')); R.rect(x - 1, y - 2, x + 1, y + 2, hex('#d83a3a')); R.rect(x - 2, y - 1, x + 2, y + 1, hex('#d83a3a')); };
const q6 = (t) => {
  espera(); R.copiar(capas.espera);
  // el ventilador del techo y las hojas del helecho que se mueven con él; el reloj
  const ang = t * 9; R.rect(258, 4, 259, 12, hex('#5a5a5a')); for (let k = 0; k < 4; k++) { const a = ang + k * Math.PI / 2, ex = ri(258 + Math.cos(a) * 16); R.linea(258, 13, ex, 13 + ri(Math.sin(a) * 2), hex('#6a5a4a')); R.linea(258, 14, ex, 14 + ri(Math.sin(a) * 2), hex('#8a7a6a')); }
  for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.33 + Math.sin(t * 2.2 + k) * 0.06; R.linea(134, 96, ri(134 + Math.cos(a) * 14), ri(96 + Math.sin(a) * 14), k % 2 ? hex('#3a7a3a') : hex('#5a9a4a')); }
  relojP(110, 40, 8, t, 1 / 60, false);
  // la enfermera abre la puerta en «doctor» y llama; uno de la derecha entra
  const abre = tramo(t, W.Q6 - 0.1, W.LESS) * (1 - tramo(t, W.THINGS + 0.2, W.THINGS + 0.6));
  if (abre > 0) { const w = ri(abre * 26); R.rect(146, 48, 146 + w, 117, hex('#3a3430')); R.rect(146 + w, 48, 148 + w, 117, hex('#c8c4bc')); if (abre > 0.6) R.actor(EL.enfermera, 150, 117, t, { dir: 1, habla: voz(t), dedo: t > W.OFTEN }); }
  for (const [n, x] of ESP_IZQ) { const r = R.actor(EL[n], x, 152, t, { dir: 1, sostiene: true, sonrisa: true }); libreta(r.mano[0], r.mano[1], true); }
  const entra = tramo(t, W.WRITTEN, W.THINGS + 0.3);
  ESP_DER.forEach(([n, x], k) => { const yendo = k === 0 && entra > 0, xx = yendo ? ri(lerp(x, 160, entra)) : x;
    if (yendo && entra >= 0.98) return;
    const tose = Math.sin(t * 3 + k * 1.7) > 0.8; const r = R.actor(EL[n], xx, 152, t, { dir: yendo ? -1 : -1, anda: yendo && entra < 1, sostiene: true, sorpresa: tose, triste: !tose });
    libreta(r.mano[0], r.mano[1], false); if (tose) { for (let j = 0; j < 3; j++) tine(r.cabeza[0] - 9 - j * 2, r.cabeza[1] + 8 - j, hex('#ffffff'), 0.7); } });
  // las visitas al médico: dos cruces a la izquierda («less often»), cinco a la derecha («trivial things»)
  for (let k = 0; k < 2; k++) cruz(64 + k * 14, 84, tramo(t, W.LESS + k * 0.25, W.LESS + k * 0.25 + 0.25));
  for (let k = 0; k < 5; k++) cruz(204 + k * 14, 84, tramo(t, W.THOSE + k * 0.3, W.THOSE + k * 0.3 + 0.25));
  if (t > W.OFTEN) R.numero('2', 71, 76, { centro: true }); if (t > W.TRIVIAL) R.numero('5', 232, 76, { centro: true });
  // un niño juega con los cubos en la alfombrilla y apila uno en «often»
  R.actor(EL.nino85, 96, 172, t, { dir: 1, sostiene: t < W.OFTEN ? [118, 160] : undefined, sonrisa: true });
  for (const [bx, by, c] of [[116, 168, '#d83a3a'], [122, 168, '#3a8ad8'], [119, 163, '#f0c030']]) { if (c === '#f0c030' && t < W.OFTEN) continue; R.rect(bx, by - 5, bx + 5, by, K); R.rect(bx + 1, by - 4, bx + 4, by - 1, hex(c)); R.pset(bx + 1, by - 4, hex('#ffffff')); }
  if (t < W.OFTEN) { R.rect(116, 152, 121, 157, K); R.rect(117, 153, 120, 156, hex('#f0c030')); }
};
// ── 7 · la consulta: del cuaderno sale el nudo; las palabras le dan forma («shape»): una cajita de luz que Atom coge («hold») ──
const caja = (x, y, t, u = 1, s = 1.6) => { x = ri(x); y = ri(y); halo(x, y - 6, ri(26 * s), hex('#ffe090'), 0.6 * u); const A = (dx, dy) => [x + ri(dx * s), y + ri(dy * s)];
  R.poligono([A(-7, -8), A(0, -12), A(7, -8), A(0, -4)], hex('#fff0b0')); R.poligono([A(-7, -8), A(0, -4), A(0, 4), A(-7, 0)], hex('#e8b040')); R.poligono([A(7, -8), A(0, -4), A(0, 4), A(7, 0)], hex('#c88a28'));
  const L = (a, b) => R.linea(a[0], a[1], b[0], b[1], K); L(A(-7, -8), A(0, -12)); L(A(0, -12), A(7, -8)); L(A(-7, -8), A(-7, 0)); L(A(7, -8), A(7, 0)); L(A(-7, 0), A(0, 4)); L(A(0, 4), A(7, 0)); L(A(0, -4), A(0, 4)); L(A(-7, -8), A(0, -4)); L(A(0, -4), A(7, -8));
  R.linea(A(-2, -9)[0], A(-2, -9)[1], A(2, -10)[0], A(2, -10)[1], hex('#ffffff'));
  for (let k = 0; k < 6; k++) { const v = (t * 0.7 + k / 6) % 1; tine(x - 5 + ((k * 7) % 11), y - 12 - v * 16, hex('#fff8c0'), 0.9 * (1 - v)); } };
const q7 = (t) => {
  const o = { encuadre: 'consulta' }; T.estudio(R, t, o); T.estudioDelante(R, t, o);
  T.pausa(R, 78, 174, t, { cual: 'cuaderno', escrito: tramo(t, W.Q7, W.WORDS + 0.4) });
  const forma = tramo(t, W.SHAPE - 0.15, W.SHAPE + 0.35), coge = tramo(t, W.SOMETHING - 0.2, W.HOLD + 0.1);
  const nx = 96, ny = 98 + flota(t);
  if (forma < 1) nudo(nx, ny, t, tramo(t, W.PAIN - 0.2, W.PAIN + 0.4) * (1 - forma * 0.9));
  if (t > W.WORDS - 0.1 && forma < 1) for (let k = 0; k < 6; k++) { const v = (t * 1.4 + k / 6) % 1, x = ri(lerp(78, nx, v) + Math.sin(v * 6 + k) * 4), y = ri(lerp(140, ny + 6, v)); R.rect(x - 3, y, x + 3, y, hex('#3a3a4a')); R.rect(x - 1, y + 2, x + 4, y + 2, hex('#3a3a4a')); }
  const ra = atomG(170, 174, t, { pose: coge > 0.5 ? 'sostiene' : t > W.PAIN ? 'senala' : 'quieto', dir: -1, cara: t > W.SHAPE ? 'sonrisa' : t > W.PAIN ? 'triste' : 'normal' });
  if (forma > 0) { const [hx, hy] = ra.mano || [150, 140]; const cxx = coge > 0 ? lerp(nx, hx - 2, ease(coge)) : nx, cyy = coge > 0 ? lerp(ny + 8, hy - 2, ease(coge)) : ny + 8; caja(cxx, cyy + (coge > 0.9 ? 0 : flota(t, 3)), t, forma); }
};
// ── 8 · el estudio de Mary en Londres, años después (fondo local, cámara de la ventana): escribe; en novels / travel books / biographies crece cada montón ──
const PAPEL_M = pal('#3e4a3e', '#4e5c4c', '#5e6e5a', '#72826c'), FRISO_M = pal('#2e1e14', '#4a3020', '#5e3e28', '#7a5434'), TARIMA_M = pal('#3a2616', '#5a3c22', '#704c2c', '#8a6038');
const VENT1 = ventanaG(184, 26, 244, 96);
const estudioV = () => capa('estV', () => {
  R.rect(0, 0, 319, 6, hex('#d8d0bc')); R.rect(0, 6, 319, 7, hex('#a89e88')); R.rect(0, 8, 319, 8, hex('#6a6252'));
  papelP(0, 9, 319, 88, PAPEL_M, 71);
  // la esquina de Atom: pared más lisa con la luz de la ventana
  for (let y = 9; y < 50; y++) for (let x = 268; x < 320; x++) R.pset(x, y, tono(PAPEL_M, 1.9 + hh(x >> 2, y >> 2, 72) * 0.3, x, y));
  paneles(0, 89, 319, 122, FRISO_M, 32, 73); tarima(123, TARIMA_M, 74);
  libreria(2, 20, 54, 150, 75, 5);
  alfombra(62, 152, 276, 172, [hex('#5a2a2a'), hex('#2a3a4a'), hex('#b89a5a')], 76);
  // el mapa de sus viajes (manchas de tierra y mar, sin letras) con la ruta punteada
  R.rect(96, 16, 162, 64, MADC[1]); R.rect(98, 18, 160, 62, hex('#d8c8a0'));
  for (let y = 19; y < 62; y++) for (let x = 99; x < 160; x++) { const v = Math.sin(x * 0.11 + y * 0.07) + Math.sin(x * 0.05 - y * 0.13) * 1.2 + (x - 130) * 0.01; R.pset(x, y, v > 0.5 ? tono(pal('#a8a070', '#c0b484', '#d4c898'), 1 + hh(x, y, 77), x, y) : tono(pal('#8aa0a8', '#a0b4b8', '#b4c4c4'), 1 + hh(x, y, 78), x, y)); }
  for (const [a, b] of [[104, 30], [118, 38], [130, 46], [142, 52], [152, 56]]) { R.rect(a, b, a + 1, b + 1, hex('#a82a2a')); } R.disco(152, 56, 2, hex('#a82a2a'));
  R.rect(126, 13, 132, 15, ORO_S);
  // el globo terráqueo en su pie, la silla y el cesto de papeles
  R.rect(286, 142, 300, 150, MAD[1]); R.rect(292, 128, 294, 142, MAD[2]); R.disco(293, 120, 10, MAD[0]); R.disco(293, 120, 9, hex('#7a9aa8'));
  for (const [x, y, r] of [[289, 116, 4], [297, 122, 3], [291, 125, 2]]) R.disco(x, y, r, hex('#b8a870')); R.linea(283, 120, 303, 120, ORO_S); R.disco(290, 117, 2, hex('#a8c4cc'));
  R.rect(126, 120, 140, 123, MAD[2]); R.rect(126, 96, 128, 150, MAD[1]); R.rect(138, 120, 140, 150, MAD[1]); R.rect(126, 98, 128, 120, MAD[2]); for (let y = 100; y < 118; y += 5) R.rect(127, y, 127, y + 2, MAD[3]);
  R.rect(252, 134, 266, 150, hex('#6a5a3a')); for (let x = 253; x < 266; x += 3) R.rect(x, 135, x + 1, 149, hex('#8a7a50')); R.disco(256, 132, 3, hex('#f4f0e4')); R.disco(262, 131, 3, hex('#e8e0cc'));
});
// los montones de libros publicados: [x, base de tomos, color, icono]
const MONTON = [[62, 3, '#9a2a2a', 'pluma'], [86, 3, '#2a5a8a', 'globo'], [110, 2, '#3a7a3a', 'retrato']];
const tomoTapa = (x, yb, w, c, ic) => { R.rect(x, yb - 6, x + w, yb, K); R.rect(x + 1, yb - 5, x + w - 1, yb - 1, hex(c)); R.rect(x + 1, yb - 5, x + w - 1, yb - 5, mez(hex(c), hex('#ffffff'), 0.3)); R.rect(x + w - 3, yb - 5, x + w - 1, yb - 1, hex('#efe6d0')); R.rect(x + w - 3, yb - 3, x + w - 1, yb - 3, hex('#c8bea6'));
  const cx = x + ri(w / 2) - 2, cy = yb - 3; if (ic === 'globo') { R.disco(cx, cy, 2, ORO); R.pset(cx, cy, hex(c)); } else if (ic === 'retrato') { R.rect(cx - 2, cy - 2, cx + 2, cy + 1, ORO); R.rect(cx - 1, cy - 1, cx + 1, cy, hex('#e8c8a0')); } else { R.linea(cx - 3, cy + 1, cx + 3, cy - 2, ORO); R.pset(cx + 3, cy - 2, hex('#ffffff')); } };
const q8 = (t) => {
  estudioV(); R.copiar(capas.estV);
  porHueco(184, 26, 244, 96, () => vistaLondres(184, 26, 244, 96, t, 0.85, 7), 0, VENT1.barras); VENT1.pinta();
  cortina(170, 18, 182, 124, t, CORT, 0); cortina(246, 18, 258, 124, t, CORT, 2);
  relojP(80, 34, 7, t, 1 / 60);
  // el escritorio junto a la ventana con sus cosas
  R.rect(160, 112, 272, 117, MAD[1]); R.rect(160, 112, 272, 112, MAD[3]); R.rect(162, 118, 270, 126, MAD[2]); R.rect(162, 126, 270, 126, MAD[0]); for (const kx of [190, 240]) { R.rect(kx, 121, kx + 3, 122, ORO); }
  for (const lx of [164, 266]) { R.rect(lx, 127, lx + 3, 150, MAD[1]); R.rect(lx, 136, lx + 3, 137, MAD[3]); }
  fardo(232, 111, 18, 6, hex('#2a2a2a'), 3); R.rect(212, 105, 220, 111, K); R.rect(213, 106, 219, 110, hex('#2a2430')); R.linea(218, 106, 226, 94, hex('#f4f0e6')); R.linea(219, 106, 227, 95, hex('#d8d0c0'));
  tomo(254, 111, 14, 6, hex('#5a2a2a')); tomo(255, 105, 12, 5, hex('#2a3a5a')); R.rect(200, 98, 208, 111, ORO_S); R.rect(201, 99, 207, 110, hex('#3a2a2a')); R.disco(204, 102, 2, hex('#e8c8a0')); R.rect(202, 105, 206, 109, hex('#5a3a2a'));
  // los montones crecen en «novels», «travel books» y «biographies»
  const tiempos = [W.NOVELS, W.TRAVEL + 0.1, W.BIOG];
  MONTON.forEach(([mx, n, c, ic], k) => { for (let j = 0; j < n; j++) tomoTapa(mx - (j % 2), 150 - j * 7, 20, ['#6a2a2a', '#2a3a5a', '#2a4a2a'][k], ic);
    const u = tramo(t, tiempos[k] - 0.15, tiempos[k] + 0.2); if (u > 0) { const yb = ri(150 - n * 7 - (1 - u) * 26); tomoTapa(mx + 1, yb, 20, c, ic); if (u > 0.9 && t < tiempos[k] + 0.6) { for (let s = 0; s < 5; s++) tine(mx - 3 + s * 6, 151 - n * 7 + ri(hh(s, k) * 3), hex('#e8dcc0'), 0.7); halo(mx + 10, 146 - n * 7, 12, hex('#fff0c0'), 0.4); } } });
  gatoD(226, 166, t);
  // Mary escribe de pie junto a la mesa; se vuelve hacia los montones mientras se nombran
  const vuelta = t > W.WRITES - 0.1 && t < W.E2 - 0.5, hojas = Math.floor(tramo(t, W.E1, W.WRITES) * 4);
  for (let j = 0; j < hojas; j++) R.rect(240 + j, 110 - j, 252 + j, 110 - j, hex('#f4f0e2'));
  R.rect(164, 110, 178, 111, hex('#f4f0e2')); for (let x = 166; x < 166 + ri(tramo(t, W.E1, W.E2) * 10); x += 2) R.pset(x, 110, TINTA);
  const r = R.actor(MS.maryLutoMS, 144, 150, t, { dir: vuelta ? -1 : 1, sostiene: vuelta ? undefined : [168 + ri(Math.sin(t * 8) * 1.5), 110], dedo: vuelta, habla: 0, sonrisa: vuelta && t > W.TRAVEL });
  if (!vuelta && r.mano) pluma(r.mano[0], r.mano[1], t);
};
// ── 9 · El último hombre (fondo local): una ciudad en ruinas al anochecer, vacía; llega alguien y se queda solo; los cuervos se van ──
const RUINA = pal('#4a3a3e', '#6a5452', '#8a6e64', '#b08a74'), RUINA_L = hex('#e0a878');
const CIELO_R = new Uint8Array(57600);
const ruinas = () => capa('ruinas', () => {
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#2e2444', '#4a3258', '#7a4462', '#b25a5a', '#e08a5a', '#f4b46a'), (y / 108) * 5.2 + hh(x >> 3, y >> 2, 81) * 0.5, x, y));
  const snap = R.buf.slice(), fin = () => { for (let i = 0; i < 57600; i++) CIELO_R[i] = R.buf[i] === snap[i] && i < 112 * 320 ? 1 : 0; };
  R.disco(234, 100, 15, hex('#f8c070')); R.disco(234, 100, 12, hex('#fde0a0'));
  // la ciudad lejana: la cúpula, campanarios, el acueducto roto
  const L = hex('#3e2a44'); R.disco(70, 84, 15, L); R.rect(55, 84, 85, 108, L); R.rect(68, 64, 72, 70, L); R.disco(70, 70, 3, L);
  for (const [x, h] of [[24, 30], [40, 22], [104, 26], [124, 18], [150, 34], [164, 20]]) { R.rect(x, 108 - h, x + 6, 108, L); R.poligono([[x - 1, 108 - h], [x + 3, 100 - h], [x + 7, 108 - h]], L); }
  for (let k = 0; k < 7; k++) { const x = 176 + k * 20; if (k === 3) continue; R.rect(x, 86, x + 4, 108, hex('#4a3048')); R.rect(x + 4, 86, x + 19, 90, hex('#4a3048')); for (let a = 0; a <= 7; a++) { const yy = 90 + ri(Math.sin(a / 7 * Math.PI) * -0 + (1 - Math.sin(a / 7 * Math.PI)) * 6); R.rect(x + 5 + a * 2, 90, x + 6 + a * 2, yy, hex('#4a3048')); } }
  // la colina con hierba y la columnata en ruinas
  for (let y = 104; y < 136; y++) for (let x = 0; x < 320; x++) { const top = 108 + Math.sin(x * 0.02) * 4; if (y < top) continue; R.pset(x, y, tono(pal('#2a3a2a', '#3e5032', '#566a3e', '#7a8a4a'), 1.4 + hh(x, y >> 1, 82) * 1.2 - (y - top) * 0.02 + (x > 180 ? 0.4 : 0), x, y)); }
  const columna = (x, yb, h, roto) => { for (let y = yb - h; y <= yb; y++) for (let i = 0; i < 9; i++) { const c = i < 2 ? RUINA[0] : i < 4 ? RUINA[1] : i < 7 ? RUINA[2] : RUINA[3]; R.pset(x + i, y, (i === 3 || i === 6) ? RUINA[0] : c); }
    R.rect(x - 2, yb - 3, x + 10, yb, RUINA[2]); R.rect(x - 2, yb - 3, x + 10, yb - 3, RUINA_L);
    if (roto) { for (let i = 0; i < 9; i++) R.rect(x + i, yb - h - ri(hh(i, x, 83) * 4), x + i, yb - h, RUINA[i < 5 ? 1 : 2]); } else { R.rect(x - 2, yb - h - 4, x + 10, yb - h, RUINA[2]); R.rect(x - 2, yb - h - 4, x + 10, yb - h - 4, RUINA_L); } };
  columna(30, 134, 66, false); columna(60, 134, 66, false); R.rect(26, 62, 74, 66, RUINA[2]); R.rect(26, 62, 74, 62, RUINA_L); for (let x = 28; x < 72; x += 4) R.pset(x, 64, RUINA[0]);
  columna(90, 134, 40, true); columna(120, 134, 22, true); columna(150, 134, 52, true);
  for (const [x, y] of [[104, 140], [134, 146], [176, 138]]) { R.rect(x, y - 6, x + 14, y, RUINA[1]); R.rect(x, y - 6, x + 14, y - 6, RUINA_L); R.rect(x + 13, y - 5, x + 14, y, RUINA[0]); }
  // cipreses oscuros en la colina y un capitel caído
  for (const [x, h] of [[214, 40], [228, 30], [276, 46], [300, 34]]) { for (let y = 0; y < h; y++) { const w = ri(Math.sin(y / h * Math.PI) * 4 + 1); R.rect(x - w, 120 - y, x + w, 120 - y, y % 5 === 0 ? hex('#1e2a1e') : hex('#2a3a26')); R.pset(x + w, 120 - y, hex('#5a5a3a')); } }
  R.rect(176, 122, 196, 132, RUINA[2]); R.rect(174, 120, 198, 123, RUINA[3]); for (let x = 178; x < 196; x += 4) R.rect(x, 124, x + 1, 131, RUINA[1]); R.disco(176, 126, 3, RUINA[1]); R.disco(196, 126, 3, RUINA[1]);
  // el empedrado roto en primer término con matas
  piedras(0, 136, 319, 179, pal('#3a2e2e', '#5a4a44', '#7a6458', '#9a8070'), 84, 8, 16);
  for (let k = 0; k < 40; k++) { const x = ri(hh(k, 1, 85) * 320), y = 138 + ri(hh(k, 2, 85) * 40); R.linea(x, y, x - 1, y - 4, hex('#4a6a32')); R.linea(x + 1, y, x + 2, y - 3, hex('#6a8a3e')); }
  R.poligono([[24, 172], [30, 158], [38, 158], [44, 172]], hex('#a85a3a')); R.rect(28, 154, 40, 158, hex('#8a4a2a')); R.linea(30, 162, 42, 162, hex('#c87a4a')); R.rect(46, 168, 60, 172, hex('#8a4a2a'));
  for (const [x, y] of [[250, 166], [272, 172], [292, 160]]) { R.rect(x, y - 3, x + 10, y, RUINA[1]); R.rect(x, y - 3, x + 10, y - 3, RUINA_L); }
  fin();
});
const NUB_OC = [pal('#5a3a5a', '#7a4a62', '#9a5a6a'), pal('#7a4a5a', '#a05e62', '#c87a6a'), pal('#a05a5a', '#d88068', '#f0a878')];
const q9 = (t) => {
  ruinas(); R.copiar(capas.ruinas);
  porHueco(0, 0, 319, 104, () => nubes(t, 18, 64, NUB_OC, 86, 0.6), 0, (x, y) => !CIELO_R[y * 320 + x]);
  // los cuervos en las columnas: picotean; en «empty world» se van volando
  const vuela = tramo(t, W.EMPTY - 0.2, W.EMPTY + 1.4);
  for (const [k, cx, cy] of [[0, 34, 61], [1, 52, 61], [2, 154, 81]]) { if (vuela <= 0) { const p = Math.sin(t * 4 + k * 2) > 0.6 ? 1 : 0; R.rect(cx, cy - 4 + p, cx + 4, cy, K); R.pset(cx + 5, cy - 3 + p * 2, hex('#3a3a3a')); R.pset(cx + 1, cy - 5 + p, K); }
    else ave(cx + vuela * (80 + k * 30), cy - vuela * (50 + k * 12), t, K, k); }
  // hojas secas que cruzan con el viento
  for (let k = 0; k < 8; k++) { const u = (t * 0.25 + k / 8) % 1; R.pset(ri(u * 340 - 10), ri(120 + Math.sin(u * 9 + k) * 12 + hh(k, 3) * 40), k % 2 ? hex('#c87a3a') : hex('#8a5a2a')); }
  // el último hombre llega despacio, se para «alone», mira a un lado y a otro
  const anda = tramo(t, W.NOVEL - 0.1, W.ALONE), x = ri(lerp(300, 196, anda)), mira = t > W.ALONE + 0.2 && t < W.EMPTY ? (Math.sin((t - W.ALONE) * 5) > 0 ? 1 : -1) : -1;
  R.actor(MS.caballeroMS, x, 156, t, { dir: anda < 1 ? -1 : mira, anda: anda > 0 && anda < 1, tocado: false, triste: t > W.ALONE });
  // la sombra larga del sol bajo
  for (let i = 0; i < 26; i++) tine(x + 8 - i, 157 + ri(i * 0.12), K, 0.25);
  // viñeta de novela: las esquinas en penumbra
  for (let y = 0; y < 180; y += 1) for (let x = 0; x < 320; x += 1) { const d = Math.hypot((x - 160) / 175, (y - 90) / 100); if (d > 0.86) { const a = Math.min(0.55, (d - 0.86) * 2.2); if (((x + y) & 1) || a > 0.3) R.pset(x, y, mez(R.pget(x, y), hex('#1a1020'), a)); } }
};
// ── 10 · el estudio, junto a la chimenea (otra cámara): mira el retrato de Percy; entra su hijo con un barquito; sonríe ──
const estudioC = () => capa('estC', () => {
  R.rect(0, 0, 319, 6, hex('#d8d0bc')); R.rect(0, 6, 319, 7, hex('#a89e88')); R.rect(0, 8, 319, 8, hex('#6a6252'));
  papelP(0, 9, 319, 88, PAPEL_M, 91); for (let y = 9; y < 48; y++) for (let x = 266; x < 320; x++) R.pset(x, y, tono(PAPEL_M, 1.8 + hh(x >> 2, y >> 2, 92) * 0.3, x, y));
  paneles(0, 89, 319, 122, FRISO_M, 32, 93); tarima(123, TARIMA_M, 94);
  alfombra(40, 152, 236, 174, [hex('#2a3a4a'), hex('#5a2a2a'), hex('#c8a860')], 95);
  // la chimenea de mármol
  const MM = pal('#8a847a', '#b0aa9e', '#cec8ba', '#e8e2d6'); for (let y = 94; y < 150; y++) for (let x = 72; x <= 152; x++) R.pset(x, y, tono(MM, 1.8 + hh(x, y, 96) * 0.6 + (Math.sin(x * 0.3 + y * 0.12) > 0.92 ? -1 : 0), x, y));
  R.rect(66, 88, 158, 94, MM[2]); R.rect(66, 88, 158, 88, MM[3]); R.rect(66, 94, 158, 94, MM[0]); R.rect(88, 104, 136, 150, hex('#14100e')); R.rect(88, 104, 136, 105, MM[0]);
  R.rect(80, 150, 144, 154, MM[1]); R.rect(80, 150, 144, 150, MM[3]); R.rect(94, 140, 130, 142, hex('#2a2a2e')); for (let x = 96; x < 130; x += 4) R.rect(x, 132, x + 1, 141, hex('#2a2a2e'));
  // el retrato oval de Percy (rizos castaños, cuello blanco) con su marco dorado
  for (let y = 30; y <= 82; y++) for (let x = 92; x <= 132; x++) { const d = Math.hypot((x - 112) / 20, (y - 56) / 26); if (d > 1) continue; R.pset(x, y, d > 0.86 ? (d > 0.93 ? ORO_S : ORO) : tono(pal('#1a1a22', '#262a34', '#323848'), 1 + (1 - d) * 1.4, x, y)); }
  R.disco(112, 74, 10, hex('#6a4a30')); R.rect(102, 74, 122, 80, hex('#6a4a30')); R.poligono([[108, 66], [112, 74], [116, 66]], hex('#f2eee2'));
  R.disco(112, 54, 8, hex('#7a5232')); R.disco(112, 57, 6, hex('#f0c8a0')); R.disco(110, 49, 3, hex('#9a7048')); R.disco(116, 50, 3, hex('#7a5232')); R.disco(106, 54, 2, hex('#7a5232')); R.pset(110, 57, K); R.pset(114, 57, K); R.pset(112, 60, hex('#c88a70'));
  R.rect(111, 24, 113, 30, ORO_S); R.disco(112, 23, 2, ORO);
  // la puerta del pasillo (cerrada en el fondo; la hoja la pinta el plano)
  R.rect(232, 44, 272, 150, MAD[0]); R.rect(234, 46, 270, 150, hex('#2a2018'));
  for (let y = 60; y < 150; y++) for (let x = 236; x < 268; x++) R.pset(x, y, tono(pal('#6a5a44', '#8a7658', '#a8926c'), 1.2 + hh(x >> 1, y >> 2, 97) * 0.6 - (y > 120 ? 0.4 : 0), x, y));
  R.rect(244, 70, 262, 72, hex('#5a4434')); for (let k = 0; k < 6; k++) R.rect(240 + k * 4, 120 - k * 8, 268, 121 - k * 8, hex('#7a5a3a')); R.disco(252, 62, 3, hex('#f8d890'));
  // el sillón de orejas y la mesita
  R.rect(166, 112, 200, 150, hex('#3a1418')); for (let y = 114; y < 148; y++) for (let x = 168; x < 198; x++) R.pset(x, y, tono(CORT, 1.4 + (x < 174 || x > 192 ? 0.8 : 0) + hh(x, y, 98) * 0.4 - (y > 132 ? 0.7 : 0), x, y)); R.rect(168, 132, 198, 134, CORT[3]);
  R.rect(206, 128, 224, 131, MAD[2]); R.rect(206, 128, 224, 128, MAD[3]); R.rect(214, 131, 216, 150, MAD[1]); R.rect(209, 150, 221, 151, MAD[1]);
  R.rect(210, 123, 216, 127, hex('#f4f0e4')); R.rect(209, 127, 217, 127, hex('#d8d0c0')); R.pset(217, 124, hex('#f4f0e4'));
  // el cuadro del lago (sin gente) y el cesto de leña con los atizadores
  R.rect(164, 30, 222, 70, ORO_S); R.rect(166, 32, 220, 68, ORO); R.rect(168, 34, 218, 66, hex('#8aa0c0'));
  for (let y = 34; y < 67; y++) for (let x = 168; x < 219; x++) { if (y > 52) R.pset(x, y, tono(pal('#3a5a7a', '#5a7a9a', '#7a9ab8'), 1 + hh(x, y, 99) + (y - 52) * 0.05, x, y)); else if (y > 44 - Math.abs(x - 190) * 0.4) R.pset(x, y, x < 190 ? hex('#d8dce8') : hex('#a8b0c4')); }
  R.rect(198, 46, 206, 52, hex('#f0ece0')); R.rect(197, 44, 207, 46, hex('#8a4a3a')); R.rect(170, 60, 182, 64, hex('#3a5a2a'));
  R.rect(40, 134, 62, 152, hex('#6a4a2a')); for (let x = 41; x < 62; x += 3) R.rect(x, 135, x + 1, 151, hex('#8a6a3a')); for (const [x, y] of [[44, 130], [52, 128], [58, 131]]) { R.disco(x, y, 3, hex('#5a3a22')); R.disco(x, y, 1, hex('#c8a070')); }
  R.rect(154, 112, 155, 150, hex('#2a2a2e')); R.disco(154, 111, 2, ORO); R.rect(158, 118, 159, 150, hex('#2a2a2e')); R.rect(156, 146, 162, 147, hex('#2a2a2e'));
  // un caballito de madera en la alfombra
  R.rect(70, 162, 86, 166, hex('#c87a3a')); R.rect(84, 156, 88, 163, hex('#c87a3a')); R.rect(86, 154, 90, 157, hex('#c87a3a')); R.pset(89, 155, K); R.rect(71, 167, 72, 172, MAD[1]); R.rect(83, 167, 84, 172, MAD[1]); R.linea(66, 173, 90, 173, MAD[2]);
});
const puertaHoja = (abre) => { const w = ri((1 - abre) * 34) + 2; R.rect(234, 46, 234 + w, 150, MAD[1]); for (let y = 50; y < 148; y += 24) R.rect(237, y, 232 + w, y + 18, MAD[2]); if (w > 8) R.disco(230 + w, 100, 1, ORO); };
const q10 = (t) => {
  estudioC(); R.copiar(capas.estC);
  // el fuego y su luz, las velas de la repisa, el reloj, el canario
  for (let k = 0; k < 7; k++) { const x = 100 + k * 4, h = 10 + ri((Math.sin(t * 9 + k * 1.7) + 1) * 4 + hh(k, 1) * 5), sw = Math.sin(t * 6 + k) * 1.5;
    for (let j = 0; j < h; j++) { const u = j / h, w = ri((1 - u) * 3.2); R.rect(ri(x - w + sw * u), 139 - j, ri(x + w + sw * u), 139 - j, u < 0.3 ? hex('#fff0a0') : u < 0.6 ? hex('#f8b040') : hex('#e0602a')); } }
  for (let k = 0; k < 4; k++) R.disco(100 + k * 9, 140, 3, hex('#3a1a0e'));
  for (let k = 0; k < 3; k++) { const v = (t * 0.8 + k / 3) % 1; R.pset(ri(104 + k * 8 + Math.sin(v * 9) * 3), ri(132 - v * 26), hex('#ffd060')); }
  halo(112, 130, 40, hex('#ffb060'), 0.35);
  vela(76, 88, 9, t, 1, 0.3); vela(148, 88, 8, t, 2, 0.3); relojP(124, 82, 4, t, 1 / 60, false);
  jaula(30, 52, t); R.linea(30, 40, 30, 20, MAD[1]); R.rect(26, 18, 34, 20, MAD[2]);
  for (let k = 0; k < 5; k++) { const v = (t * 0.6 + k / 5) % 1; tine(213 + Math.sin(v * 8 + k) * 2, 121 - v * 10, hex('#ffffff'), 0.5 * (1 - v)); }
  // la puerta se abre en «and all the while»; entra el hijo con su barquito y salta en «son»
  const abre = tramo(t, W.AND3 - 0.2, W.WHILE); puertaHoja(abre);
  const entra = tramo(t, W.WHILE - 0.2, W.RAISES + 0.4), nx = ri(lerp(246, 190, entra));
  const madreGira = t > W.WHILE;
  if (abre > 0.3) { const rn = R.actor(MS.percyNinoMS, nx, 152, t, { dir: -1, anda: entra > 0 && entra < 1, sostiene: true, sonrisa: true, salto: ri(Math.max(0, Math.sin(tramo(t, W.SON - 0.1, W.SON + 0.4) * Math.PI)) * 4) });
    if (rn.mano) { const [bx, by] = rn.mano; R.rect(bx - 5, by + 1, bx + 3, by + 3, hex('#8a4a2a')); R.rect(bx - 4, by + 4, bx + 2, by + 4, hex('#6a3a1a')); R.linea(bx - 1, by, bx - 1, by - 9, MAD[1]); R.poligono([[bx, by - 9], [bx, by - 1], [bx + 5, by - 1]], hex('#f4f0e4')); } }
  R.actor(MS.maryLutoMS, 150, 152, t, { dir: madreGira ? 1 : -1, triste: !madreGira, sonrisa: madreGira, sostiene: t > W.SON + 0.2 ? [nx + 4, 128] : undefined });
};
// ── 11 · el escritorio de noche, de cerca: cuida los papeles de Percy y no suelta la pluma (la vela baja y amanece) ──
const VENT2 = ventanaG(26, 18, 110, 98);
const nocheFondo = () => capa('estN', () => {
  papelP(0, 0, 319, 124, PAPEL_M, 101);
  for (let y = 0; y < 48; y++) for (let x = 262; x < 320; x++) R.pset(x, y, tono(PAPEL_M, 1.6 + hh(x >> 2, y >> 2, 102) * 0.3, x, y));
  R.rect(176, 34, 210, 72, ORO_S); R.rect(178, 36, 208, 70, hex('#1a1a22'));
  R.rect(136, 20, 156, 26, MAD[1]); R.rect(140, 26, 152, 30, MAD[2]); R.disco(193, 50, 6, hex('#7a5232')); R.disco(193, 52, 4, hex('#f0c8a0')); R.rect(186, 58, 200, 70, hex('#6a4a30')); R.poligono([[190, 58], [193, 64], [196, 58]], hex('#f2eee2'));
  libreria(214, 30, 262, 124, 103, 4);
});
const q11 = (t) => {
  const TL = tramo(t, W.NEVER - 0.1, W.PEN + 0.55);
  nocheFondo(); R.copiar(capas.estN);
  porHueco(26, 18, 110, 98, () => vistaLondres(26, 18, 110, 98, t, TL * 0.9, 9), 0, VENT2.barras); VENT2.pinta();
  cortina(14, 12, 24, 124, t, CORT, 1); cortina(112, 12, 122, 124, t, CORT, 3);
  relojP(146, 40, 8, t + TL * 900, 1 / 60 + TL * 0.6, false);
  // la luz: de noche manda la vela; al amanecer entra un rayo por la ventana
  velo(hex('#0e0a1a'), 0.42 * (1 - TL));
  if (TL > 0.5) for (let k = 0; k < 3; k++) for (let y = 30; y < 124; y++) tine(120 + k * 18 + (y - 30) * 0.9, y, hex('#ffd8a0'), 0.18 * (TL - 0.5) * 2);
  // el tablero del escritorio y lo que hay encima
  // el tablero en perspectiva (y 128–152) con todo lo que hay encima
  for (let y = 128; y <= 152; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(MAD, 2.1 + hh(x >> 3, y >> 1, 104) * 0.5 + (Math.sin(x * 0.09 + y * 0.35 + Math.sin(x * 0.02) * 3) > 0.82 ? -0.8 : 0) - (y < 131 ? 0.5 : 0), x, y));
  R.rect(0, 128, 319, 128, MAD[0]); R.rect(0, 152, 319, 152, MAD[3]);
  R.rect(110, 136, 132, 146, hex('#3a2a20')); R.rect(111, 137, 131, 145, hex('#2a5a3a')); R.rect(112, 138, 130, 144, hex('#3a6a4a'));
  const alto = lerp(26, 4, TL); vela(84, 144, alto, t, 0, 0.6 * (1 - TL * 0.6)); for (let k = 0; k < Math.floor(TL * 5); k++) R.rect(82 - k % 2, 141 - k, 82 - k % 2, 139, CREMA);
  tomo(14, 140, 34, 8, hex('#5a2a2a')); tomo(18, 132, 28, 7, hex('#2a3a5a')); tomo(22, 150, 40, 9, hex('#3a4a2a'));
  R.rect(196, 132, 206, 140, K); R.rect(197, 133, 205, 139, hex('#2a2430')); R.rect(199, 133, 203, 134, hex('#6a6a80')); R.linea(204, 133, 214, 120, hex('#f4f0e6')); R.linea(205, 133, 215, 121, hex('#d8d0c0'));
  R.disco(218, 146, 4, hex('#8a8a90')); R.disco(218, 146, 3, hex('#b8b8c0')); R.linea(214, 146, 224, 140, K); R.disco(226, 147, 3, hex('#b8b8c0')); R.disco(226, 147, 2, hex('#d8e0e8'));
  for (const [x, y, c] of [[244, 136, '#f0e8d4'], [252, 140, '#e8dcc0']]) { R.rect(x, y, x + 16, y + 9, hex(c)); R.disco(x + 8, y + 5, 2, hex('#a82a2a')); }
  fardo(170, 140, 22, 8, hex('#a82a3a'), 5); fardo(166, 150, 26, 6, hex('#2a4a8a'), 6);
  const pila = 4 + Math.floor(TL * 12); for (let j = 0; j < pila; j++) R.rect(272 + (j % 3), 148 - j, 300 + (j % 2), 148 - j, j % 4 ? hex('#f0e8d4') : hex('#d8ccb0'));
  R.rect(134, 134, 162, 146, hex('#f4f0e2')); R.rect(134, 146, 162, 146, hex('#c8bea6')); for (let y = 136; y <= 144; y += 2) R.rect(136, y, 136 + Math.min(24, ri(((t * 2.5 + y * 0.3) % 5) * 6)), y, TINTA);
  // Mary detrás de la mesa: asoman cabeza y hombros; la mano con la pluma sobre la hoja; en «Percy's» coge una hoja del fardo y la lee
  const lee = t > W.PERCYS - 0.15 && t < W.NEVER - 0.15;
  const ob = { dir: 1, sostiene: lee ? [150, 116] : [146 + ri(Math.sin(t * 9) * 2), 136], triste: false, sonrisa: TL > 0.8 };
  R.recorte([0, 0, 319, 128]); const r = R.actor(MS.maryLutoMS, 124, 137, t, ob); R.recorte([136, 128, 160, 142]); R.actor(MS.maryLutoMS, 124, 137, t, ob); R.recorte(null);
  if (lee && r.mano) { const [mx, my] = r.mano; R.rect(mx - 3, my - 12, mx + 7, my + 1, hex('#ece2c8')); for (let y = my - 10; y < my - 1; y += 2) R.rect(mx - 1, y, mx + 5 - (y % 3), y, hex('#6a5a5a')); }
  else if (r.mano) pluma(r.mano[0], r.mano[1], t);
  // el frente del escritorio con sus cajones y tiradores (por delante)
  for (let y = 153; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(MAD, 1.3 + hh(x >> 3, y >> 1, 105) * 0.5 + (Math.sin(x * 0.12 + y * 0.03) > 0.86 ? -0.6 : 0), x, y));
  R.rect(0, 153, 319, 154, MAD[0]); for (const [a, b] of [[16, 96], [120, 200], [224, 304]]) { R.rect(a, 158, b, 176, MAD[0]); R.rect(a + 1, 159, b - 1, 175, MAD[2]); R.rect(a + 1, 159, b - 1, 159, MAD[3]); R.rect(a + 3, 161, b - 3, 173, MAD[1]); R.rect(a + 4, 162, b - 4, 172, MAD[2]);
    const m = ri((a + b) / 2); R.rect(m - 5, 166, m + 5, 168, ORO); R.rect(m - 6, 165, m - 5, 169, ORO_S); R.rect(m + 5, 165, m + 6, 169, ORO_S); R.pset(m, 164, ORO_S); }
  for (const x of [108, 212]) { R.disco(x, 166, 4, MAD[3]); R.disco(x, 166, 2, MAD[1]); }
  velo(hex('#0e0a1a'), 0.3 * (1 - TL), 153, 179);
};
const efectos = [[0.15, 'whoosh'], [W.PUBLISHED, 'papel'], [W.Y1986, 'brillo'], [W.Q2 - 0.05, 'puerta'], [W.PSYCH + 0.1, 'pasos'], [W.ASKED, 'papel'], [W.WRITE, 'lapiz'], [W.FOUR, 'papel'],
  [W.Q3 + 0.05, 'tic'], [W.ABOUT, 'whoosh'], [W.WHAT, 'pop'], [W.HOW, 'brillo'], [W.FIRST, 'lapiz'], [W.MONTHS, 'lapiz'], [W.Q6, 'puerta'], [W.LESS, 'pop'], [W.TRIVIAL, 'pop'],
  [W.PAIN, 'whoosh'], [W.SHAPE, 'brillo'], [W.HOLD - 0.1, 'brillo'], [W.E1 + 0.2, 'lapiz'], [W.NOVELS, 'golpecito'], [W.TRAVEL + 0.1, 'golpecito'], [W.BIOG, 'golpecito'],
  [W.E2 + 0.3, 'viento'], [W.EMPTY, 'pajaros'], [W.AND3, 'puerta'], [W.WHILE + 0.1, 'pasos'], [W.E4 + 0.2, 'lapiz'], [W.PERCYS, 'papel'], [W.NEVER, 'tic']];
const año = (t) => t < W.Y1986 - 0.1 ? 1822 : t < W.E1 ? 1986 : t < W.E2 ? 1824 : t < W.E3 ? 1826 : t < W.E4 ? 1828 : 1830;
T.rodar(E, R, [[0, q1], [W.Q2, q2], [W.Q3, q3], [W.Q4, q4], [W.Q5, q5], [W.Q6, q6], [W.Q7, q7], [W.E1, q8], [W.E2, q9], [W.E3, q10], [W.E4, q11]], { efectos, año });
'''

# ──────────────────────────────────────────────── MS-CIERRE (frases 30–32) ────────────────────────────────────────────────
CIERRE = r'''
import { b_caballo } from '/atomo/plato/escenas/te-comun.js';
// ── el libro nuevo de 1831: tela roja, filetes de oro y los dos ojitos amarillos en la tapa (de frente, a escala s) ──
const libroNuevo = (x, y, s, t, abierto = 0) => { x = ri(x); y = ri(y); const w = 12 * s, h = 16 * s;
  R.rect(x - 1, y - 1, x + w + 1, y + h + 1, K); R.rect(x, y, x + w, y + h, hex('#9a2a2a')); R.rect(x, y, x + ri(s * 1.5), y + h, hex('#6a1a1a'));
  R.rect(x + 2 * s, y + s, x + w - s, y + s, ORO); R.rect(x + 2 * s, y + h - s, x + w - s, y + h - s, ORO); R.rect(x + w - s + 1, y + 1, x + w, y + h - 1, hex('#efe6d0'));
  const cx = x + ri(w / 2) + s, cy = y + ri(h * 0.45), parp = Math.sin(t * 1.4 + x * 0.1) > 0.97;
  for (const dx of [-2 * s, s]) { if (parp) { R.rect(cx + dx, cy, cx + dx + s, cy, K); continue; } R.rect(cx + dx, cy - s + 1, cx + dx + s, cy, hex('#f8d040')); R.pset(cx + dx + s, cy, K); }
  halo(cx, cy, 6 * s, hex('#ffe070'), 0.25); };
// ── 1 · la mesa de Mary en 1831, desde arriba (fondo local): tacha y corrige el libro viejo; llega el tomo nuevo en «new edition» ──
const mesa31 = () => capa('mesa31', () => {
  tablas(0, 0, 319, 179, pal('#3a2414', '#5a3a20', '#6e4a2a', '#8a603a'), 12, 111, false, false);
  // el secante de cuero verde bajo la esquina de arriba a la derecha (zona de Atom tranquila)
  for (let y = 0; y < 52; y++) for (let x = 262; x < 320; x++) R.pset(x, y, tono(pal('#1e3226', '#284034', '#304a3c'), 1.2 + hh(x >> 2, y >> 2, 114) * 0.25 + (y === 51 || x === 262 ? -1.2 : 0), x, y));
  for (let x = 264; x < 320; x += 2) R.pset(x, 49, hex('#a88a40'));
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 200, (y - 96) / 130); if (d > 0.6) tine(x, y, K, Math.min(0.4, (d - 0.6) * 0.9)); }
  // los tres tomitos viejos de 1818, apilados y gastados
  for (let k = 0; k < 3; k++) { const x = 10 + k * 3, y = 28 + k * 4; R.rect(x - 1, y - 1, x + 46, y + 62, K); R.rect(x, y, x + 45, y + 61, hex(['#4a3a2a', '#52402e', '#5a4632'][k])); R.rect(x + 2, y + 2, x + 43, y + 59, hex(['#5a4632', '#624c36', '#6a523a'][k])); R.rect(x, y, x + 6, y + 61, hex('#3a2a1e')); for (const yy of [y + 10, y + 50]) R.rect(x, yy, x + 6, yy + 1, ORO_S); }
  R.numero('3', 44, 76, { centro: true, color: ORO_S });
  // el tintero y la caja de arena; los anteojos; una carta lacrada; la miniatura de Percy
  R.disco(262, 78, 9, K); R.disco(262, 78, 8, hex('#3a3a46')); R.disco(262, 78, 5, hex('#14121a')); R.disco(260, 76, 2, hex('#6a6a80'));
  R.disco(240, 96, 5, K); R.disco(240, 96, 4, hex('#a8a090')); for (const [a, b] of [[-1, -1], [1, 0], [0, 2]]) R.pset(240 + a, 96 + b, K);
  R.disco(30, 150, 6, ORO_S); R.disco(30, 150, 5, hex('#b8c8d0')); R.disco(46, 150, 6, ORO_S); R.disco(46, 150, 5, hex('#b8c8d0')); R.linea(35, 149, 41, 149, ORO_S); R.linea(24, 148, 14, 140, ORO_S); R.linea(52, 148, 60, 140, ORO_S);
  R.rect(250, 124, 300, 152, hex('#d8ccb0')); R.rect(250, 124, 300, 124, hex('#f0e8d4')); R.linea(250, 124, 275, 140, hex('#b8ac90')); R.linea(300, 124, 275, 140, hex('#b8ac90')); R.disco(275, 140, 4, hex('#a82a2a')); R.disco(274, 139, 1, hex('#d84a4a'));
  R.rect(236, 106, 252, 122, ORO_S); for (let y = 107; y < 122; y++) for (let x = 237; x < 252; x++) if (Math.hypot((x - 244) / 7, (y - 114) / 7.5) < 1) R.pset(x, y, hex('#1a1a22')); R.disco(244, 113, 3, hex('#7a5232')); R.disco(244, 115, 2, hex('#f0c8a0')); R.rect(241, 118, 247, 121, hex('#f2eee2'));
  // el libro viejo abierto: dos páginas amarillentas con sus renglones
  R.rect(72, 34, 230, 156, hex('#3a2416')); R.rect(70, 36, 232, 158, hex('#4a2e1c'));
  for (let y = 38; y < 154; y++) for (let x = 76; x < 226; x++) { const g = Math.abs(x - 151); R.pset(x, y, g < 2 ? hex('#a89470') : tono(pal('#c8b48c', '#dccaa0', '#ece0bc', '#f6eed4'), 2.4 - (g < 10 ? (10 - g) * 0.12 : 0) - (x < 80 || x > 222 ? 0.6 : 0) + hh(x >> 2, y >> 2, 112) * 0.3, x, y)); }
  for (const [x0, x1] of [[84, 144], [158, 218]]) for (let k = 0; k < 13; k++) { const y = 48 + k * 8; let x = x0; while (x < x1 - 2) { const w = 3 + ri(hh(x, k, 113 + x0) * 9); R.rect(x, y, Math.min(x1, x + w), y, hex('#6a5a4a')); x += w + 2; } }
  R.rect(112, 40, 118, 44, hex('#a8946a')); R.numero('1', 115, 152, { centro: true, color: hex('#8a7a5a') });
});
const q21 = (t) => {
  mesa31(); R.copiar(capas.mesa31);
  // la vela vista desde arriba y el humo
  R.disco(214, 30, 7, ORO_S); R.disco(214, 30, 6, ORO); R.disco(214, 30, 3, CREMA); const f = Math.sin(t * 13) * 0.6; R.disco(214 + ri(f), 30, 2, hex('#ffd060')); R.pset(214, 30, hex('#ffffff')); halo(214, 30, 26, hex('#ffd890'), 0.4);
  for (let k = 0; k < 5; k++) { const v = (t * 0.5 + k / 5) % 1; tine(214 + Math.sin(v * 7 + k) * 4 + v * 10, 26 - v * 20, hex('#d8d0c8'), 0.4 * (1 - v)); }
  // tacha el renglón en «revises» y escribe en el margen en «Frankenstein»
  const tacha = tramo(t, W.REVISES - 0.1, W.REVISES + 0.6), margen = tramo(t, W.FRANK - 0.1, W.NEW - 0.2);
  if (tacha > 0) { R.rect(158, 71, 158 + ri(tacha * 58), 72, TINTA); }
  if (margen > 0) for (let k = 0; k < 3; k++) { const n = ri(cl(margen * 3 - k) * 10); if (n > 0) R.linea(220, 60 + k * 6, 220 + Math.min(n, 6), 60 + k * 6 - 1, TINTA); }
  // la mano de Mary (manga negra, de luto) con la pluma
  const fase = t < W.REVISES - 0.2 ? 0 : t < W.FRANK - 0.1 ? 1 : t < W.NEW - 0.2 ? 2 : 3;
  const hx = fase === 0 ? 196 + Math.sin(t * 1.2) * 2 : fase === 1 ? 158 + tacha * 58 : fase === 2 ? 224 + Math.sin(t * 20) : 210, hy = fase === 0 ? 112 : fase === 1 ? 74 : fase === 2 ? 66 + ri(margen * 12) : 100;
  T.brazo(R, 330, 210, hx + 8, hy + 6, '#22202a', -1, { codo: [300, 150] }); pluma(hx, hy, t, fase === 1 || fase === 2);
  // en «new edition» una mano entra por la izquierda y deja el tomo nuevo
  const entra = tramo(t, W.NEW - 0.35, W.EDITION + 0.25), sale = tramo(t, W.EDITION + 0.4, W.C2);
  if (entra > 0) { const bx = ri(lerp(-50, 8, entra)); libroNuevo(bx, 112, 3, t); if (sale < 1) T.brazo(R, -40, 200, ri(lerp(-20, 42, entra) - sale * 60), 150, '#4a3a5a', 1, { codo: [ri(-10 - sale * 40), 176] }); if (entra > 0.9 && t < W.EDITION + 0.6) for (let k = 0; k < 5; k++) tine(8 + k * 10, 162, hex('#e8dcc0'), 0.5); }
};
// ── 2 · la sala a oscuras (fondo local): el hijo maneja la linterna mágica; Mary cuenta cómo nació; en «born» se enciende el haz ──
const PAPEL_N = pal('#1e1a22', '#28222c', '#322a36', '#3e3442');
const salaN = () => capa('salaN', () => {
  papelP(0, 0, 319, 96, PAPEL_N, 121); paneles(0, 97, 319, 124, pal('#140e0a', '#24180e', '#302014', '#3e2a1a'), 30, 122); tarima(125, pal('#1e140c', '#2e1e12', '#3a2818', '#4a3420'), 123);
  for (let y = 0; y < 40; y++) for (let x = 266; x < 320; x++) R.pset(x, y, tono(PAPEL_N, 1.5 + hh(x >> 2, y >> 2, 124) * 0.3, x, y));
  // la sábana colgada en su bastidor
  R.rect(184, 40, 186, 150, MAD[1]); R.rect(292, 40, 294, 150, MAD[1]); R.rect(180, 38, 298, 41, MAD[2]); R.rect(180, 150, 190, 152, MAD[1]); R.rect(288, 150, 298, 152, MAD[1]);
  for (let y = 44; y < 128; y++) for (let x = 188; x < 291; x++) R.pset(x, y, tono(pal('#4a4652', '#5a5662', '#6a6672', '#7a7682'), 1.8 + Math.sin(x * 0.42 + Math.sin(y * 0.05) * 1.5) * 0.9 + (y > 120 ? -0.6 : 0) + (y < 48 ? 0.6 : 0), x, y));
  for (let k = 0; k < 6; k++) { const x = 196 + k * 17; for (let y = 44; y < 54; y++) R.pset(x + ri(Math.sin(y * 0.4) * 1), y, hex('#3a3642')); }
  // la librería en penumbra, el cuadro y el sofá
  libreria(4, 30, 30, 124, 126, 4); for (let y = 30; y < 125; y++) for (let x = 2; x < 32; x++) tine(x, y, hex('#0a0814'), 0.35);
  R.rect(162, 28, 180, 52, ORO_S); R.rect(164, 30, 178, 50, hex('#2a3448')); R.disco(171, 38, 4, hex('#c8c0a0')); R.rect(165, 44, 177, 49, hex('#3a4a3a'));
  R.rect(232, 154, 300, 170, hex('#3a1a20')); for (let y = 140; y < 170; y++) for (let x = 236; x < 298; x++) if (y < 154 || y > 158) R.pset(x, y, tono(CORT, 0.8 + (y < 154 ? 0.6 : 0) + hh(x >> 1, y, 127) * 0.4, x, y)); R.rect(234, 136, 300, 140, hex('#4a1e26'));
  for (let x = 188; x < 291; x += 4) R.pset(x, 127 + (x % 8 ? 0 : 1), hex('#3a3642'));
  // la mesita con la linterna mágica de latón
  R.rect(28, 128, 80, 131, MAD[2]); R.rect(28, 128, 80, 128, MAD[3]); R.rect(32, 132, 34, 152, MAD[1]); R.rect(74, 132, 76, 152, MAD[1]);
  R.rect(40, 106, 62, 127, K); for (let y = 107; y < 127; y++) for (let x = 41; x < 62; x++) R.pset(x, y, tono(pal('#6a4a1a', '#9a7028', '#c89a40', '#e8c060'), 1.6 + (x < 45 ? 1 : x > 57 ? -0.8 : 0) + hh(x, y, 125) * 0.3, x, y));
  R.rect(46, 94, 54, 106, K); R.rect(47, 95, 53, 105, hex('#8a6a28')); R.rect(45, 92, 55, 94, hex('#c89a40')); R.rect(62, 112, 74, 121, K); R.rect(63, 113, 73, 120, hex('#9a7028')); R.rect(72, 112, 74, 121, hex('#c89a40')); R.rect(36, 120, 40, 124, hex('#5a5a62'));
  // la ventana con las cortinas corridas y una rendija de luna; un reloj en la repisa de la chimenea apagada
  cortina(104, 18, 132, 112, 0, CORT, 4); cortina(134, 18, 160, 112, 0, CORT, 5); for (let y = 22; y < 110; y++) R.pset(133, y, hex('#8a90b8'));
  R.rect(214, 132, 226, 150, hex('#3a2018')); R.rect(210, 130, 230, 132, hex('#5a3a28'));
});
const proyeccion = (cx, cy, rx, ry, f, a = 0) => porHueco(cx - rx, cy - ry, cx + rx, cy + ry, f, a, (x, y) => Math.hypot((x - cx) / rx, (y - cy) / ry) > 1);
// las diapositivas pintadas en cristal: 0 la casa del lago con lluvia, 1 el juego de las velas, 2 la noche de los ojos
const diapo = (k, cx, cy, rx, ry, t, ojos = 0) => {
  const x0 = cx - rx, y0 = cy - ry, X = (u) => ri(x0 + u * rx * 2), Y = (v) => ri(y0 + v * ry * 2);
  if (k === 0) { for (let y = y0; y <= cy + ry; y++) for (let x = x0; x <= cx + rx; x++) { const v = (y - y0) / (2 * ry); R.pset(x, y, v < 0.55 ? tono(pal('#2a3050', '#3a4268', '#4a5480'), 2 - v * 3 + hh(x >> 2, y >> 2, 131) * 0.5, x, y) : v < 0.75 ? tono(pal('#2a4060', '#3a5478', '#4a6a90'), 1 + hh(x >> 1, y, 132), x, y) : tono(pal('#2a3a22', '#3a4a2a', '#4a5a32'), 1 + hh(x, y, 133), x, y)); }
    for (let k2 = 0; k2 < 3; k2++) nube(X(0.2 + k2 * 0.3) + ri(Math.sin(t + k2) * 4), Y(0.12 + k2 * 0.05), rx * 0.6, pal('#4a4a62', '#5a5a76', '#6e6e8a'), k2 + 40);
    R.rect(X(0.55), Y(0.36), X(0.8), Y(0.56), hex('#e8dcc0')); R.poligono([[X(0.52), Y(0.37)], [X(0.675), Y(0.26)], [X(0.83), Y(0.37)]], hex('#8a3a2a')); for (let i = 0; i < 4; i++) R.rect(X(0.58 + i * 0.055), Y(0.42), X(0.6 + i * 0.055), Y(0.48), hex('#f8d070'));
    for (let i = 0; i < 40; i++) { const u = (t * 1.6 + i * 0.137) % 1, x = X(hh(i, 1, 134)), y = Y(u); R.linea(x, y, x - 2, y + 5, hex('#a8b8e0')); }
    if (Math.sin(t * 2.3) > 0.93) velo(hex('#e8f0ff'), 0.2, Math.max(0, y0), Math.min(179, cy + ry)); }
  else if (k === 1) { for (let y = y0; y <= cy + ry; y++) for (let x = x0; x <= cx + rx; x++) R.pset(x, y, tono(pal('#2a1a1a', '#4a2a22', '#6a3a28', '#8a5030'), 1.4 + (1 - Math.hypot((x - cx) / rx, (y - cy) / ry)) * 2 + hh(x >> 2, y >> 2, 135) * 0.4, x, y));
    R.rect(X(0.2), Y(0.66), X(0.8), Y(0.72), hex('#5a3a22')); R.rect(X(0.2), Y(0.66), X(0.8), Y(0.66), hex('#8a603a'));
    for (let i = 0; i < 3; i++) { const vx = X(0.42 + i * 0.08); R.rect(vx - 1, Y(0.56), vx + 1, Y(0.66), hex('#f0e6d0')); R.disco(vx, Y(0.53), 2, hex('#ffd060')); halo(vx, Y(0.53), 16, hex('#ffc060'), 0.35); }
    for (let i = 0; i < 4; i++) { const px = X([0.14, 0.3, 0.7, 0.86][i]), py = Y(0.6); R.disco(px, py - 10, 5, hex('#140c0a')); R.rect(px - 6, py - 5, px + 6, py + 10, hex('#140c0a')); }
    const gy = Y(0.3) + ri(Math.sin(t * 3) * 4); R.disco(X(0.5), gy, 10, hex('#f4f0f8')); R.rect(X(0.5) - 10, gy, X(0.5) + 10, gy + 14, hex('#f4f0f8')); for (let i = -10; i <= 10; i += 5) R.disco(X(0.5) + i, gy + 14 + ri(Math.sin(t * 5 + i) * 1.5), 2, hex('#f4f0f8')); R.rect(X(0.5) - 4, gy - 2, X(0.5) - 2, gy + 1, K); R.rect(X(0.5) + 2, gy - 2, X(0.5) + 4, gy + 1, K); }
  else { for (let y = y0; y <= cy + ry; y++) for (let x = x0; x <= cx + rx; x++) R.pset(x, y, tono(pal('#0c0c18', '#141428', '#1e1e38', '#2a2a4a'), 1 + hh(x >> 2, y >> 2, 136) * 0.6 + (y > Y(0.7) ? 0.8 : 0), x, y));
    R.rect(X(0.14), Y(0.62), X(0.62), Y(0.76), hex('#3a3a5a')); R.rect(X(0.14), Y(0.6), X(0.62), Y(0.62), hex('#5a5a7a')); R.rect(X(0.12), Y(0.44), X(0.15), Y(0.8), hex('#2a2a40'));
    R.rect(X(0.78), Y(0.24), X(0.9), Y(0.52), hex('#1a1a30')); for (let y = Y(0.26); y < Y(0.5); y++) R.pset(X(0.84), y, hex('#c8d0f0'));
    if (ojos > 0) { const ey = Y(0.36), ex = X(0.42), ab = ri(ojos * 3); for (const dx of [-8, 6]) { R.rect(ex + dx, ey - ab, ex + dx + 5, ey + ab, hex('#f8d040')); if (ab > 1) R.rect(ex + dx + 2, ey - 1, ex + dx + 3, ey + 1, K); } halo(ex, ey, 26, hex('#ffe070'), 0.5 * ojos); } }
  // el borde de la diapositiva en penumbra
  for (let y = y0; y <= cy + ry; y++) for (let x = x0; x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d > 0.82 && d <= 1) tine(x, y, K, (d - 0.82) * 2.6); } };
const q22 = (t) => {
  salaN(); R.copiar(capas.salaN);
  const on = tramo(t, W.HOW - 0.1, W.BORN), luna = 0.5 + Math.sin(t * 0.7) * 0.2;
  for (let y = 24; y < 110; y++) tine(133, y, hex('#c8d0ff'), luna);
  // el haz de la linterna: un cono con motas, y la imagen en la sábana
  if (on > 0) { for (let x = 74; x < 188; x++) { const u = (x - 74) / 114, ya = 116 - u * 30, yb = 118 + u * 6; for (let y = ri(ya); y <= ri(yb); y++) if ((x + y) % 2 === 0) tine(x, y, hex('#fff0c0'), 0.18 * on); }
    for (let k = 0; k < 10; k++) { const v = (t * 0.15 + k / 10) % 1, x = 80 + v * 100; tine(x, 117 - (x - 74) / 114 * 20 + Math.sin(t + k * 3) * 6, hex('#ffffff'), 0.7 * on); }
    proyeccion(239, 84, 48, 38, () => diapo(0, 239, 84, 48, 38, t), 1 - on); }
  // la vela de la repisa que tiembla, el gato con los ojos que brillan
  vela(220, 130, 6, t, 4, 0.4);
  if (Math.sin(t * 0.9) < 0.9) { R.rect(256, 146, 257, 146, hex('#c8e070')); R.rect(260, 146, 261, 146, hex('#c8e070')); }
  // el hijo detrás de la linterna: levanta la mano y la enciende en «how»; Mary junto a la sábana cuenta con las hojas en la mano
  R.actor(MS.percyNinoMS, 16, 150, t, { dir: 1, sostiene: t > W.HOW - 0.4 && t < W.BORN ? [44, 112] : undefined, sonrisa: on > 0.5 });
  const rm = R.actor(MS.maryLutoMS, 160, 152, t, { dir: -1, sostiene: t < W.TELLS - 0.1 ? true : undefined, dedo: t > W.TELLS - 0.1 && t < W.BORN + 0.4, habla: t > W.WHERE ? voz(t) : 0, sonrisa: on > 0.6 });
  if (t < W.TELLS - 0.1 && rm.mano) { const [mx, my] = rm.mano, sube = ri(tramo(t, W.INTRO - 0.2, W.INTRO + 0.3) * 4); for (let j = 0; j < 4; j++) R.rect(mx - 6 + j, my - 8 - sube - j, mx + 2 + j, my - sube - j, j % 2 ? hex('#efe6d0') : hex('#d8ccb0')); }
  // los que escuchan, de espaldas, más cerca de la cámara
  R.actor(MS.caballeroMS, 92, 176, t, { dir: 1 }); R.actor(MS.damaMS, 116, 176, t, { dir: 1, sorpresa: on > 0.8 && t < W.BORN + 0.5 });
  if (t > W.BORN - 0.05 && t < W.BORN + 0.5) for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2, r = 10 + tramo(t, W.BORN - 0.05, W.BORN + 0.5) * 14; R.pset(ri(239 + Math.cos(a) * r), ri(84 + Math.sin(a) * r * 0.8), hex('#fff8d0')); }
  velo(hex('#0a0814'), 0.12 * (1 - on * 0.5));
};
// ── 3 · la sábana de cerca: las diapositivas del verano de la lluvia, del juego y de la noche; en «stir» se abren los ojos ──
const sabana = () => capa('sabana', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#141018', '#1c1620', '#241c28'), 1 + hh(x >> 2, y >> 2, 141) * 0.6, x, y));
  for (let y = 10; y < 160; y++) for (let x = 14; x < 306; x++) R.pset(x, y, tono(pal('#3a3842', '#46444e', '#52505a', '#5e5c66'), 1.8 + Math.sin(x * 0.21 + Math.sin(y * 0.03) * 2) * 0.6, x, y));
  R.rect(10, 6, 310, 9, MAD[2]); R.rect(10, 6, 310, 6, MAD[3]);
});
const cabeza = (x, y, c, k, t, sombrero = false, mono = false) => { const b = ri(Math.sin(t * 1.5 + k) * 0.6); y += b;
  R.disco(x, y, 13, c); R.rect(x - 22, y + 10, x + 22, 180, c); if (sombrero) { R.rect(x - 10, y - 26, x + 10, y - 8, c); R.rect(x - 16, y - 9, x + 16, y - 7, c); } if (mono) R.disco(x + 4, y - 13, 6, c);
  for (let a = -2.4; a < -0.7; a += 0.05) R.pset(ri(x + Math.cos(a) * 13), ri(y + Math.sin(a) * 13), hex('#8a6a4a')); };
const q23 = (t) => {
  sabana(); R.copiar(capas.sabana);
  const cx = 160, cy = 82, rx = 104, ry = 64, cambios = [W.GHOST - 0.15, W.NIGHT - 0.1];
  const k = t < cambios[0] ? 0 : t < cambios[1] ? 1 : 2, tc = k === 0 ? -9 : cambios[k - 1], u = tramo(t, tc, tc + 0.35);
  halo(cx, cy, 120, hex('#fff0c8'), 0.25);
  proyeccion(cx, cy, rx, ry, () => { if (u < 1 && k > 0) { diapo(k - 1, cx + ri(u * rx * 2.2), cy, rx, ry, t); diapo(k, cx - ri((1 - u) * rx * 2.2), cy, rx, ry, t, 0); } else diapo(k, cx, cy, rx, ry, t, k === 2 ? tramo(t, W.STIR - 0.25, W.STIR + 0.2) : 0); });
  // motas en la luz que viene de detrás
  for (let i = 0; i < 14; i++) { const v = (t * 0.2 + i / 14) % 1; tine(40 + hh(i, 2) * 240, 170 - v * 150, hex('#fff4d8'), 0.5 * Math.sin(v * Math.PI)); }
  // las cabezas del público a contraluz: el hijo da un respingo en «stir»
  const salto = ri(Math.max(0, Math.sin(tramo(t, W.STIR, W.STIR + 0.5) * Math.PI)) * 10);
  cabeza(70, 160, hex('#0c0a0e'), 1, t, true); cabeza(134, 164 - salto, hex('#100c10'), 2, t); cabeza(246, 158, hex('#0c0a0e'), 3, t, false, true);
};
// ── 4 · la calle de Londres por la mañana: en «goodbye» Mary da el paquete del libro al de la editorial; el coche se va; se despide ──
const paquete = (x, y) => { x = ri(x); y = ri(y); R.rect(x - 6, y - 4, x + 6, y + 4, K); R.rect(x - 5, y - 3, x + 5, y + 3, hex('#b8925a')); R.rect(x - 5, y - 3, x + 5, y - 3, hex('#d8b478')); R.rect(x, y - 3, x, y + 3, hex('#5a3a22')); R.rect(x - 5, y, x + 5, y, hex('#5a3a22')); R.pset(x - 1, y - 4, hex('#a82a2a')); R.pset(x + 1, y - 4, hex('#a82a2a')); };
const q24 = (t) => {
  const marcha = t > W.BOOK + 0.1, X = marcha ? ri(96 - (t - W.BOOK - 0.1) * 70) : 96;
  const o = { encuadre: 'calle', clarea: 1, carruaje: X, marcha }; T.londres(R, t, o);
  const da = tramo(t, W.GOODBYE - 0.1, W.GOODBYE + 0.35), va = tramo(t, W.GOODBYE + 0.4, W.BOOK);
  const cx = ri(lerp(188, 160, va));
  if (va < 0.98) { const rc = R.actor(MS.caballeroMS, cx, 142, t, { dir: va > 0 ? -1 : 1, anda: va > 0 && va < 1, sostiene: da > 0.5 ? true : undefined, sonrisa: true }); if (da >= 1 && rc.mano) paquete(rc.mano[0], rc.mano[1]); }
  const rm = R.actor(MS.maryLutoMS, 207, 137, t, { dir: -1, sostiene: da < 1 ? [lerp(200, 196, da), 120] : undefined, dedo: t > W.AFFECTION - 0.2, sonrisa: t > W.END });
  if (da < 1 && rm.mano) { const [mx, my] = rm.mano; paquete(lerp(mx, cx + 14, ease(da)), lerp(my, 128, ease(da))); if (t > W.END && t < W.GOODBYE) { R.pset(mx - 6, my - 8, hex('#e8506a')); R.pset(mx - 7, my - 9, hex('#e8506a')); R.pset(mx - 5, my - 9, hex('#e8506a')); } }
  // un corazoncito sube desde Mary en «affection»
  if (t > W.AFFECTION - 0.1) { const v = tramo(t, W.AFFECTION - 0.1, W.C5); corazon(206, ri(112 - v * 16), hex('#e8506a')); }
  T.londresDelante(R, t, o);
};
// ── 5 · el cruce de caminos a la salida de Londres (fondo local): el carretero alza un tomo en «Hideous Progeny» (los ojitos); en «go forth» abre la caja y los libros salen volando por los tres caminos; «prosper» ──
const CIELO_X = new Uint8Array(57600);
const cruce = () => capa('cruce', () => {
  for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#6a9ad0', '#82acd8', '#9cc0e2', '#bcd4ea', '#dce6ee'), y / 92 * 4 + hh(x >> 3, y >> 2, 171) * 0.45, x, y));
  const snap = R.buf.slice();
  // Londres lejos, a la izquierda: la cúpula y las torres en la bruma
  const L = hex('#8a9ab0'); R.disco(46, 78, 9, L); R.rect(37, 78, 55, 96, L); R.rect(45, 64, 47, 70, L); for (const [x, h] of [[14, 14], [24, 20], [64, 16], [76, 22], [90, 12]]) R.rect(x, 96 - h, x + 4, 96, L); for (let x = 0; x < 110; x++) R.rect(x, 90 + ri(Math.sin(x * 0.3) * 2), x, 96, L);
  // colinas en tres términos con setos y árboles
  for (let x = 0; x < 320; x++) { const m1 = 88 + ri(Math.sin(x * 0.02 + 1) * 6 + Math.sin(x * 0.05) * 3), m2 = 104 + ri(Math.sin(x * 0.03 + 2) * 5);
    for (let y = m1; y < 120; y++) R.pset(x, y, tono(pal('#6a8a5a', '#7e9e64', '#94b070'), 1.4 - (y - m1) * 0.03 + hh(x >> 2, y >> 1, 172) * 0.6, x, y));
    for (let y = m2; y < 180; y++) R.pset(x, y, tono(pal('#3e6a2e', '#4e7e36', '#62923e', '#7aa84a'), 1.8 + hh(x >> 1, y >> 1, 173) * 0.8 - (y - m2) * 0.008 + (Math.sin(x * 0.08 + y * 0.6) > 0.9 ? -0.8 : 0), x, y)); }
  for (let k = 0; k < 9; k++) { const x = 20 + k * 36 + ri(hh(k, 1, 174) * 12), y = 100 + ri(hh(k, 2, 174) * 6); copa(x, y, 14 + ri(hh(k, 3, 174) * 8), 10, 0, pal('#2a4a22', '#3a5e2a', '#4e7632', '#6a9040'), 175 + k, 0); R.rect(x, y + 4, x + 1, y + 9, hex('#4a3a2a')); }
  // los tres caminos que se abren desde abajo
  const camino = (xa, xb, yb, w0, w1) => { for (let y = yb; y < 180; y++) { const u = (y - yb) / (179 - yb), cx = lerp(xb, xa, u), w = lerp(w1, w0, u); for (let x = ri(cx - w); x <= ri(cx + w); x++) R.pset(x, y, tono(pal('#a8906a', '#bca47c', '#d0b88e', '#e0caa2'), 1.6 + hh(x, y, 176) * 0.9 + (Math.abs(x - cx) > w - 2 ? -0.8 : 0) + (Math.abs(x - cx + w * 0.4) < 1 || Math.abs(x - cx - w * 0.4) < 1 ? -0.6 : 0), x, y)); } };
  camino(160, 160, 118, 40, 5); camino(160, 52, 124, 30, 4); camino(160, 276, 122, 30, 4);
  // el poste indicador con tres brazos (sin letras) y el mojón
  R.rect(158, 104, 162, 150, MAD[1]); R.rect(158, 104, 159, 150, MAD[3]);
  for (const [dx, dy] of [[-1, 0], [1, 0], [1, -1]]) { const y = 108 + (dy ? -6 : 0) + (dx < 0 ? 6 : 0), x0 = dx < 0 ? 132 : 162, x1 = dx < 0 ? 158 : 188; R.rect(x0, y, x1, y + 4, MADC[2]); R.rect(x0, y, x1, y, MADC[3]); if (dx < 0) R.poligono([[x0, y], [x0 - 5, y + 2], [x0, y + 4]], MADC[2]); else R.poligono([[x1, y], [x1 + 5, y + 2], [x1, y + 4]], MADC[2]); for (let x = x0 + 3; x < x1 - 2; x += 4) R.pset(x, y + 2, MADC[0]); }
  R.rect(198, 142, 208, 156, hex('#c8c0b0')); R.disco(203, 142, 5, hex('#c8c0b0')); R.rect(206, 140, 208, 156, hex('#9a9282')); R.numero('7', 203, 154, { centro: true, color: hex('#5a5448') });
  // setos con flores en primer término
  for (let x = 0; x < 320; x += 2) { if (x > 96 && x < 226) continue; const h = 6 + ri(hh(x, 5, 177) * 6); R.rect(x, 180 - h, x + 1, 179, hex(x % 4 ? '#2e5a26' : '#3a6e2e')); if (hh(x, 6, 177) > 0.85) R.pset(x, 180 - h, hex(['#f0e070', '#f0a0c0', '#ffffff'][x % 3])); }
  for (let i = 0; i < 57600; i++) CIELO_X[i] = R.buf[i] === snap[i] && i < 96 * 320 ? 1 : 0;
});
const libroVuela = (x, y, t, k, s = 1) => { x = ri(x); y = ri(y); const a = Math.sin(t * 14 + k) > 0;
  R.rect(x - 2 * s, y - s, x + 2 * s, y + s, hex('#9a2a2a')); R.pset(x, y, hex('#f8d040'));
  R.linea(x - 2 * s, y - s, x - 5 * s, y - (a ? 4 : -1) * s, hex('#fff8ec')); R.linea(x + 2 * s, y - s, x + 5 * s, y - (a ? 4 : -1) * s, hex('#fff8ec')); };
const q25 = (t) => {
  cruce(); R.copiar(capas.cruce);
  porHueco(0, 0, 319, 95, () => { nubes(t, 14, 52, [pal('#b8c8dc', '#d4dee8', '#eef2f6'), pal('#c4d2e2', '#dee6ee', '#f6f8fa'), pal('#ccd8e6', '#e6ecf2', '#ffffff')], 178, 0.6); for (let k = 0; k < 3; k++) { const u = (t * 0.06 + k * 0.33) % 1; ave(-10 + u * 340, 30 + k * 7, t, hex('#3a3a4a'), k); } }, 0, (x, y) => !CIELO_X[y * 320 + x]);
  // el carro con su caballo que come; la caja de libros
  b_caballo(R, 214, 158, t, { dir: 1, come: true, cola: true, color: '#6a4228' });
  R.rect(232, 134, 280, 148, MAD[1]); R.rect(232, 134, 280, 135, MAD[3]); for (let x = 236; x < 280; x += 8) R.rect(x, 136, x, 147, MAD[0]); R.disco(244, 152, 7, MAD[0]); R.disco(244, 152, 5, MAD[2]); R.disco(270, 152, 7, MAD[0]); R.disco(270, 152, 5, MAD[2]); R.linea(232, 140, 214, 138, MAD[0]);
  const abre = tramo(t, W.BIDS - 0.2, W.BIDS + 0.3); R.rect(108, 144, 134, 160, MADC[1]); R.rect(108, 144, 134, 145, MADC[3]); for (let x = 112; x < 134; x += 6) R.rect(x, 146, x, 159, MADC[0]);
  for (let j = 0; j < 4; j++) R.rect(111 + j * 6, 141, 115 + j * 6, 144, hex('#9a2a2a'));
  if (abre < 1) R.rect(106, 140 - ri(abre * 10), 136, 143 - ri(abre * 10), MADC[2]); else { R.rect(104, 128, 107, 143, MADC[2]); }
  // los libros salen volando por los tres caminos desde «go forth»; brillan en «prosper»
  const vuela = (t - W.GO + 0.1);
  if (vuela > 0) for (let k = 0; k < 15; k++) { const d = k % 3, u = Math.min(1.25, (vuela - Math.floor(k / 3) * 0.18) / 2.2); if (u <= 0) continue;
    const tx = [40, 160, 290][d], ty = [96, 92, 98][d], x = lerp(122, tx, u) + Math.sin(u * 9 + k) * 4, y = lerp(138, ty, u) - Math.sin(u * Math.PI) * 26, s = u > 0.6 ? 1 : 2;
    if (u < 1.2) libroVuela(x, y, t, k, s); if (t > W.PROSPER - 0.1 && u > 0.5 && (k + ri(t * 8)) % 3 === 0) R.pset(ri(x) + 3, ri(y) - 3, hex('#fff8a0')); }
  // el carretero alza un tomo en «Hideous Progeny» y en «go forth» señala los caminos; una niña y un perro miran
  const alza = t > W.HIDEOUS - 0.25 && t < W.BIDS - 0.2;
  const rc = R.actor(EL.impresor, 136, 162, t, { dir: -1, sostiene: alza ? [130, 128] : undefined, dedo: t > W.GO - 0.2, sonrisa: true, habla: alza ? 0.5 : 0 });
  if (alza && rc.mano) { libroNuevo(rc.mano[0] - 6, rc.mano[1] - 17, 1, t); halo(rc.mano[0], rc.mano[1] - 9, 20, hex('#ffe890'), 0.45); }
  R.actor(EL.ninaVictoriana, 88, 166, t, { dir: 1, sorpresa: alza, sonrisa: t > W.GO, brazos: t > W.PROSPER - 0.2, salto: t > W.PROSPER - 0.2 ? ri(Math.abs(Math.sin(t * 7)) * 3) : 0 });
  const perro = ri(Math.sin(t * 8) * (t > W.GO ? 1 : 0)); R.rect(66, 158 - perro, 78, 163 - perro, hex('#c8a070')); R.disco(79, 156 - perro, 3, hex('#c8a070')); R.pset(80, 155 - perro, K); R.rect(68, 164, 69, 167, hex('#a88050')); R.rect(75, 164, 76, 167, hex('#a88050')); R.linea(66, 159 - perro, 62, 155 - perro + ri(Math.sin(t * 12) * 2), hex('#c8a070'));
};
// ── 6 · el cuarto del lago, la noche del principio recordada en luz cálida: los ojos en «eyes»; «18» en «18-year-old» ──
const q26 = (t) => {
  const o = { encuadre: 'cuarto', sueno: lerp(0.6, 1, tramo(t, W.C6, W.EYES + 0.05)), calido: true, vela: 0.4 }; T.lago(R, t, o);
  const llega = tramo(t, W.C6, W.EYES - 0.2), r = R.actor(MS.maryMS, ri(lerp(92, 112, llega)), 150, t, { dir: 1, anda: llega > 0 && llega < 1, sonrisa: t > W.EYES + 0.5, sorpresa: t > W.EYES - 0.2 && t < W.EYES + 0.5, salto: ri(Math.max(0, Math.sin(tramo(t, W.GIRL - 0.1, W.GIRL + 0.4) * Math.PI)) * 3) });
  T.lagoDelante(R, t, o);
  AT.luciernaga(R, 272 + Math.sin(t * 1.7) * 8, 92 + Math.cos(t * 2.1) * 5, t, { brillo: 0.8, dir: -1 });
  const u = tramo(t, W.N18 - 0.1, W.N18 + 0.3); anio('18', 120, 104, u); if (t > W.N18) AT.anillo(R, 120, 96, 16, 10, t, tramo(t, W.N18, W.N18 + 0.6));
};
// ── 7 · la vela y las sombras (fondo local): el retrato de la madre («mother»), el sonajero («daughter»); en la pared, la sombra de alguien que se levanta («came back to life») ──
const PAPEL_C = pal('#4a3428', '#5e4232', '#72523e', '#86644a');
const velaMesa = () => capa('velaMesa', () => {
  papelP(0, 0, 319, 104, pal('#3a2a22', '#56402e', '#6e543c', '#8a6a4a'), 151, 14); paneles(0, 105, 319, 116, pal('#24160e', '#3a2416', '#4a301c', '#5e3e24'), 40, 152);
  for (let y = 117; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#4a2e1c', '#6a4428', '#7e5432', '#9a6a40'), 2 + hh(x >> 3, y >> 1, 153) * 0.5 + (Math.sin(x * 0.07 + y * 0.4) > 0.86 ? -0.8 : 0) - (y < 120 ? 0.8 : 0) + (y - 117) * 0.012, x, y));
  R.rect(0, 117, 319, 117, hex('#2a180e'));
  // el tapete de encaje bajo la vela, unos libros, un jarrón con flores secas y el tintero
  for (let y = 132; y < 156; y++) for (let x = 110; x < 210; x++) { const d = Math.hypot((x - 160) / 50, (y - 144) / 11); if (d < 1) R.pset(x, y, ((x + y) % 3 === 0 || d > 0.9 || (Math.abs(d - 0.6) < 0.04)) ? hex('#c8bca4') : hex('#f0e8d8')); }
  tomo(8, 140, 46, 9, hex('#5a2a2a')); tomo(12, 131, 40, 8, hex('#2a3a5a')); tomo(10, 123, 42, 7, hex('#3a4a2a'));
  R.poligono([[64, 140], [60, 120], [66, 112], [74, 112], [80, 120], [76, 140]], hex('#4a6a7a')); R.linea(64, 118, 64, 136, hex('#6a8a9a')); for (const [dx, dy, c] of [[-8, -22, '#c8a060'], [0, -28, '#b8705a'], [8, -20, '#d8b870'], [-3, -16, '#a8885a']]) { R.linea(70, 112, 70 + dx, 112 + dy, hex('#6a5a3a')); R.disco(70 + dx, 112 + dy, 2, hex(c)); }
  R.rect(292, 128, 306, 142, K); R.rect(293, 129, 305, 141, hex('#2a2430')); R.rect(296, 129, 302, 131, hex('#6a6a80'));
});
const sombra = (cx, base, sube, t, a, S = 1.35) => { // la sombra de una figura: tumbada (sube 0) → de pie con el brazo tendido (sube 1)
  const ang = (1 - ease(sube)) * Math.PI / 2, cs = Math.cos(ang), sn = Math.sin(ang), P = (dx, dy) => [ri(cx + (dx * cs + dy * sn) * S), ri(base + (dy * cs - dx * sn) * S)];
  const pinta = (pts) => { const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]); for (let y = Math.min(...ys); y <= Math.max(...ys); y++) for (let x = Math.min(...xs); x <= Math.max(...xs); x++) { if (x < 0 || x > 319 || y < 0 || y > 179) continue;
      let dentro = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) dentro = !dentro; }
      if (dentro && ((x + y) % 2 === 0 || a > 0.4)) R.pset(x, y, mez(R.pget(x, y), hex('#1a0e0a'), a)); } };
  pinta([P(-12, 0), P(12, 0), P(14, -50), P(-14, -50)]); pinta([P(-5, -50), P(5, -50), P(5, -56), P(-5, -56)]); { const [hx, hy] = P(0, -64), r = ri(9 * S); for (let y = hy - r; y <= hy + r; y++) for (let x = hx - r; x <= hx + r; x++) if (Math.hypot(x - hx, y - hy) <= r && x >= 0 && x < 320 && y >= 0 && y < 180 && ((x + y) % 2 === 0 || a > 0.4)) R.pset(x, y, mez(R.pget(x, y), hex('#1a0e0a'), a)); }
  const brazo = Math.sin(t * 2) * 0.1 + sube * 0.9; pinta([P(10, -46), P(14, -50), P(14 + 30 * brazo, -52 - 20 * brazo), P(10 + 30 * brazo, -46 - 20 * brazo)]);
  pinta([P(-12, 0), P(-4, 0), P(-6, 22 * (1 - sube) + 4), P(-14, 22 * (1 - sube) + 4)]); pinta([P(4, 0), P(12, 0), P(14, 24 * (1 - sube) + 4), P(6, 24 * (1 - sube) + 4)]); };
const q27 = (t) => {
  velaMesa(); R.copiar(capas.velaMesa);
  const fl = Math.sin(t * 9) * 0.06 + Math.sin(t * 4.3) * 0.05;
  halo(160, 92, 150, hex('#ffc070'), 0.32 + fl); for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x += 1) { const d = Math.hypot((x - 160) / 190, (y - 96) / 120); if (d > 0.55) tine(x, y, hex('#120806'), Math.min(0.55, (d - 0.55) * 1.3)); }
  // la sombra en la pared desde «imagined someone»; se levanta en «came back to life»
  const aparece = tramo(t, W.IMAGINED - 0.1, W.SOMEONE + 0.3), sube = tramo(t, W.CAME - 0.2, W.LIFE + 0.2);
  if (aparece > 0) sombra(150 + ri(fl * 16), 116, sube, t, 0.6 * aparece, 1.22);
  // el retrato de la madre en su atril y el sonajero de plata
  // el retrato de la madre en su atril (grande) y el sonajero de plata
  const PX = 96, PY = 108; R.rect(PX - 18, PY - 26, PX + 18, PY + 22, ORO_S); for (let y = PY - 25; y < PY + 22; y++) for (let x = PX - 17; x < PX + 18; x++) { const d = Math.hypot((x - PX) / 16.5, (y - PY) / 23); if (d < 1) R.pset(x, y, d > 0.88 ? (d > 0.94 ? ORO_S : ORO) : tono(pal('#1a1a22', '#2a2a34', '#3a3a48'), 1 + (1 - d) * 1.4, x, y)); }
  R.disco(PX, PY - 6, 8, hex('#5a3a2a')); R.disco(PX, PY - 3, 6, hex('#f0c8a0')); R.rect(PX - 9, PY + 6, PX + 9, PY + 20, hex('#e8e0d0')); R.rect(PX - 9, PY + 6, PX + 9, PY + 7, hex('#c8c0b0')); R.pset(PX - 2, PY - 4, K); R.pset(PX + 2, PY - 4, K); R.pset(PX, PY, hex('#c88a70')); R.disco(PX - 6, PY - 10, 3, hex('#6a4a32'));
  R.linea(PX - 10, PY + 22, PX - 16, PY + 34, ORO_S); R.linea(PX + 10, PY + 22, PX + 16, PY + 34, ORO_S); R.linea(PX, PY + 22, PX + 2, PY + 32, ORO_S);
  const sw = Math.sin(t * 3) * (t > W.DAUGHTER ? 2.5 : 0.5), RX = 222; R.linea(RX - 6, 146, ri(RX + sw), 124, hex('#c8c8d0')); R.linea(RX - 5, 146, ri(RX + 1 + sw), 124, hex('#9a9aa8')); R.disco(ri(RX + 1 + sw), 119, 7, hex('#7a7a88')); R.disco(ri(RX + 1 + sw), 119, 6, hex('#d8d8e4')); R.disco(ri(RX - 1 + sw), 117, 2, hex('#ffffff'));
  for (let a = 0; a < 6; a++) R.pset(ri(RX + 1 + sw + Math.cos(a) * 4), ri(119 + Math.sin(a) * 4), hex('#9a9aa8')); R.disco(RX - 8, 147, 4, hex('#e8a0b0')); R.disco(RX - 8, 147, 2, hex('#f8c8d4'));
  if (t > W.MOTHER - 0.1 && t < W.MOTHER + 1.3) { halo(PX, PY, 34, hex('#fff0c0'), 0.55 * Math.sin(tramo(t, W.MOTHER - 0.1, W.MOTHER + 1.3) * Math.PI)); R.pset(PX + 12, PY - 18, hex('#ffffff')); R.pset(PX + 13, PY - 19, hex('#ffffff')); }
  if (t > W.DAUGHTER - 0.1 && t < W.DAUGHTER + 1.3) { halo(RX, 119, 26, hex('#fff0e0'), 0.55 * Math.sin(tramo(t, W.DAUGHTER - 0.1, W.DAUGHTER + 1.3) * Math.PI)); R.pset(RX + 4, 114, hex('#ffffff')); }
  // la vela grande y una polilla que la ronda
  vela(160, 144, 36, t, 7, 0.7); const pa = t * 2.6; R.pset(ri(160 + Math.cos(pa) * 20), ri(92 + Math.sin(pa * 1.3) * 10), hex('#d8ccb0')); R.pset(ri(161 + Math.cos(pa) * 20), ri(92 + Math.sin(pa * 1.3) * 10) - (Math.sin(t * 30) > 0 ? 1 : 0), hex('#b8ac90'));
  // la hoja y la mano joven de Mary que escribe desde «imagined»
  R.rect(236, 144, 300, 168, hex('#f4ecd8')); R.rect(236, 168, 300, 168, hex('#c8bea6')); const ln = tramo(t, W.IMAGINED - 0.2, W.C8); for (let k = 0; k < 6; k++) { const n = ri(cl(ln * 6 - k) * 52); if (n > 0) R.rect(240, 148 + k * 3, 240 + n, 148 + k * 3, TINTA); }
  const hx = 242 + ri(cl(ln * 6 - Math.floor(ln * 6)) * 50), hy = 148 + Math.min(5, Math.floor(ln * 6)) * 3;
  T.brazo(R, 340, 200, hx + 10, hy + 4, '#3a4a7a', -1, { codo: [316, 182] }); pluma(hx, hy, t, ln > 0 && ln < 1);
};
// ── 8 · el lago al amanecer, en calma: Felix cierra la puerta («no one wanted»); la criatura se aparta a la orilla; en «200 years later» sale el sol ──
const q28 = (t) => {
  const o = { encuadre: 'lago', tormenta: 0 }; T.lago(R, t, o);
  const sol = tramo(t, W.AND200, W.LATER + 0.6);
  velo(hex('#ff9a60'), 0.16 + sol * 0.14, 0, 92); velo(hex('#ffb070'), 0.08 + sol * 0.08, 93, 179); halo(132, 56, 80, hex('#ffd890'), 0.3 + sol * 0.45); halo(132, 50, 20, hex('#fff4d0'), 0.3 + sol * 0.5);
  for (let k = 0; k < 7; k++) { const a = -Math.PI + 0.25 + k * 0.42; if (sol > 0) for (let r = 18; r < 18 + sol * 60; r += 2) tine(ri(132 + Math.cos(a) * r), ri(62 + Math.sin(a) * r), hex('#fff0c0'), 0.25 * sol); }
  const cierra = tramo(t, W.NOONE, W.WANTED + 0.2), aparta = tramo(t, W.WANTED + 0.2, W.AND200), mira = t > W.AND200;
  if (cierra < 1) R.actor(MS.felixMS, 80, 141, t, { dir: 1, enfado: t > W.WHOM, brazos: t > W.NOONE - 0.2 && t < W.WANTED });
  if (cierra > 0) { R.rect(86, 129, 86 + ri(cierra * 7), 140, hex('#5a3a22')); }
  const cx = ri(t < W.WANTED + 0.2 ? lerp(160, 118, tramo(t, W.C8, W.WHOM + 0.2)) : lerp(118, 190, aparta));
  R.actor(MS.criaturaMS, cx, 152, t, { dir: t < W.WANTED + 0.2 ? -1 : 1, anda: (t < W.WHOM + 0.2) || (aparta > 0 && aparta < 1), triste: t > W.WANTED && !mira, sonrisa: mira && t > W.LATER });
  T.lagoDelante(R, t, o);
};
// ── 9 · una biblioteca de hoy (fondo local): una chica abre el libro y salen los ojitos («alive»); se encienden todos los ejemplares («far more alive»); los retratos de los que dudaron se llenan de telarañas ──
const ESTANTE_H = pal('#5a3a22', '#7a5230', '#9a6a40', '#b88a58');
const OJOS_LIB = [];
const biblio = () => capa('biblio', () => {
  for (let y = 0; y < 50; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(pal('#c8b89a', '#d8caae', '#e6dac0', '#f2e8d2'), 2 - y * 0.012 + hh(x >> 2, y >> 2, 161) * 0.35, x, y));
  R.rect(0, 44, 319, 47, ESTANTE_H[2]); R.rect(0, 44, 319, 44, ESTANTE_H[3]);
  for (const [b0, b1, sem] of [[0, 102, 1], [110, 212, 2], [220, 319, 3]]) {
    R.rect(b0, 48, b1, 140, ESTANTE_H[0]);
    for (let k = 0; k < 5; k++) { const yb = 66 + k * 18, yt = yb - 16; R.rect(b0 + 2, yt, b1 - 2, yb, hex('#2a1a10'));
      let x = b0 + 3, j = 0; while (x < b1 - 4) { const w = 3 + ri(hh(j, k, 162 + sem) * 3), al = 11 + ri(hh(j, k + 5, 162 + sem) * 4), c = hex(['#c83a3a', '#2a6aaa', '#e8b830', '#3a8a4a', '#e8e0d0', '#7a3a8a', '#e86a2a', '#2a8a8a', '#d85a8a', '#4a4a5a', '#9a2a2a'][ri(hh(j, k + 9, 162 + sem) * 10)]);
        const cc = mez(c, hex('#5a3a22'), 0.3); R.rect(x, yb - al, x + w - 1, yb - 1, cc); R.rect(x, yb - al, x, yb - 1, mez(c, hex('#ffffff'), 0.3)); R.rect(x + w - 1, yb - al, x + w - 1, yb - 1, mez(c, K, 0.3)); R.rect(x, yb - al + 2, x + w - 1, yb - al + 2, mez(c, K, 0.4));
        if (hh(j, k + 21, 162 + sem) > 0.86 && w >= 4) OJOS_LIB.push([x, yb - al, w, al, ((x - b0) / (b1 - b0)) * 0.3 + k * 0.08 + sem * 0.12]);
        if (hh(j, k + 31, 162 + sem) > 0.96 && x < b1 - 14) { R.rect(x + w + 1, yb - 7, x + w + 7, yb - 1, hex('#c8c0b0')); R.disco(x + w + 4, yb - 9, 3, hex('#d8d0c0')); x += 9; }
        x += w + (hh(j, k + 13, 162 + sem) > 0.85 ? 2 : 0); j++; }
      R.rect(b0 + 1, yb + 1, b1 - 1, yb + 2, ESTANTE_H[2]); R.rect(b0 + 1, yb + 1, b1 - 1, yb + 1, ESTANTE_H[3]); }
    R.rect(b0, 48, b0 + 1, 140, ESTANTE_H[3]); R.rect(b1 - 1, 48, b1, 140, ESTANTE_H[1]); }
  for (const px of [102, 212]) { R.rect(px + 1, 44, px + 7, 140, ESTANTE_H[2]); R.rect(px + 2, 44, px + 2, 140, ESTANTE_H[3]); }
  // el suelo de parqué y la mesa larga de lectura
  for (let y = 141; y < 180; y++) for (let x = 0; x < 320; x++) { const k = Math.floor((x + (Math.floor(y / 4) % 2) * 8) / 16); R.pset(x, y, tono(pal('#6a4428', '#8a5a34', '#a06c40', '#b8804c'), 1.6 + (hh(k, y >> 2, 163) - 0.5) + ((x + (Math.floor(y / 4) % 2) * 8) % 16 === 0 || y % 4 === 0 ? -0.9 : 0), x, y)); }
  R.rect(0, 140, 319, 141, ESTANTE_H[0]);
  // la escalera de la librería
  R.rect(28, 48, 30, 146, MAD[2]); R.rect(42, 48, 44, 146, MAD[2]); for (let y = 56; y < 146; y += 10) R.rect(30, y, 42, y + 1, MAD[3]); R.rect(26, 46, 46, 47, hex('#8a8a90'));
});
const retratoDuda = (x, y, k, polvo, t) => { x = ri(x); y = ri(y); const tilt = polvo > 0.6 && k === 1 ? 1 : 0;
  R.rect(x, y + tilt, x + 18, y + 22, ORO_S); R.rect(x + 2, y + 2 + tilt, x + 16, y + 20, hex('#3a3a40')); R.disco(x + 9, y + 12, 3, hex('#a8a098')); R.rect(x + 5, y + 15, x + 13, y + 20, hex('#2a2a30')); R.rect(x + 6, y + 4, x + 12, y + 9, K); R.rect(x + 4, y + 9, x + 14, y + 9, K);
  if (polvo > 0) { for (let i = 0; i < 18; i++) if (hh(i, k, 164) < polvo) tine(x + hh(i, k + 1, 165) * 18, y + hh(i, k + 2, 166) * 22, hex('#d8d8d8'), 0.6);
    for (let a = 0; a < polvo * 5; a++) { R.linea(x, y, x + 6 - a, y + a * 2, hex('#e8e8e8')); } } };
const LECT = [['chicaHoy', 104], ['chicoHoy', 140], ['nino85', 176], ['paciente', 212]];
const q29 = (t) => {
  biblio(); R.copiar(capas.biblio);
  // las lámparas que cuelgan
  for (const lx of [196, 252]) { R.linea(lx, 0, lx, 22, hex('#3a3a3a')); R.poligono([[lx - 8, 30], [lx - 4, 22], [lx + 4, 22], [lx + 8, 30]], hex('#2a5a3a')); halo(lx, 32, 22, hex('#fff0c0'), 0.4); R.rect(lx - 2, 30, lx + 2, 31, hex('#fff8d8')); }
  // los ejemplares de Frankenstein en todos los idiomas: se encienden en cascada desde «far more alive»
  const casc = tramo(t, W.FAR - 0.2, W.ALIVE2 + 1.2);
  for (const [x, y, w, al, d] of OJOS_LIB) { const on = casc > d, ym = y + ri(al / 2); if (on) { for (let yy = y; yy < y + al; yy++) for (let xx = x; xx < x + w; xx++) tine(xx, yy, hex('#ffd860'), 0.35); halo(x + w / 2, ym, 9, hex('#ffe890'), 0.35); }
    R.pset(x + 1, ym, on ? hex('#fff070') : hex('#c8a040')); R.pset(x + w - 2, ym, on ? hex('#fff070') : hex('#c8a040')); }
  // los retratos de los que dudaron, arriba: polvo y telarañas en «doubted»; la araña baja en «written»
  const polvo = tramo(t, W.DOUBTED - 0.3, W.WRITTEN + 0.3);
  for (let k = 0; k < 3; k++) retratoDuda(54 + k * 24, 20, k, polvo, t);
  if (t > W.WRITTEN - 0.2) { const ay = ri(20 + tramo(t, W.WRITTEN - 0.2, W.WRITTEN + 0.6) * 18); R.linea(84, 20, 84, ay, hex('#e8e8e8')); R.disco(84, ay + 1, 1, K); for (const dx of [-2, 2]) { R.pset(84 + dx, ay, K); R.pset(84 + dx, ay + 2, K); } }
  // la bibliotecaria empuja el carrito por detrás
  const bx = ri(300 - ((t - W.C9) * 18) % 360);
  R.actor(EL.lector3DU, bx, 150, t, { dir: -1, anda: true });
  R.rect(bx - 24, 134, bx - 4, 146, hex('#5a5a62')); for (let j = 0; j < 5; j++) R.rect(bx - 22 + j * 4, 128, bx - 20 + j * 4, 134, hex(['#c83a3a', '#2a6aaa', '#e8b830', '#3a8a4a', '#9a2a2a'][j])); R.disco(bx - 20, 148, 2, K); R.disco(bx - 8, 148, 2, K);
  // los lectores detrás de la mesa; la chica abre su libro en «alive» y salen los ojitos y la luz
  const abre = tramo(t, W.STILL - 0.2, W.ALIVE + 0.2);
  R.recorte([0, 0, 319, 150]);
  const manos = LECT.map(([n, x], k) => R.actor(EL[n], x, 158, t, { dir: k % 2 ? -1 : 1, sostiene: [x + (k % 2 ? 2 : 13), 148], sorpresa: k === 0 && abre > 0.5 && t < W.ALIVE + 0.8, sonrisa: (k === 0 && t > W.ALIVE + 0.8) || (k > 0 && casc > 0.3) }).mano);
  R.recorte(null);
  // la mesa (por delante) con los libros abiertos y el globo de los idiomas
  R.rect(60, 150, 260, 155, MAD[2]); R.rect(60, 150, 260, 150, MAD[3]); R.rect(62, 156, 258, 158, MAD[1]); for (const lx of [66, 160, 252]) { R.rect(lx, 158, lx + 4, 178, MAD[1]); R.rect(lx, 158, lx + 1, 178, MAD[2]); }
  LECT.forEach(([n, x], k) => { const bx2 = x + (k % 2 ? -4 : 6), op = k === 0 ? abre : 1; R.rect(bx2, 146, bx2 + 14, 150, hex('#f4ecd8')); R.rect(bx2 + 7, 146, bx2 + 7, 150, hex('#c8bea6')); if (k > 0) libroNuevo(bx2 + 2, 151, 0.3, t);
    if (k === 0 && op > 0) { const ex = bx2 + 7, ey = 140 - ri(op * 6); for (const dx of [-4, 2]) R.rect(ex + dx, ey, ex + dx + 2, ey + 1, hex('#f8d040')); halo(ex, ey, 18, hex('#ffe070'), 0.55 * op); } });
  R.rect(276, 120, 278, 160, MAD[1]); R.rect(268, 160, 286, 162, MAD[1]); R.disco(277, 112, 12, MAD[0]); R.disco(277, 112, 11, hex('#5a8ab8'));
  const g = t * 0.6; for (let k = 0; k < 4; k++) { const a = g + k * 1.6, cx = 277 + Math.sin(a) * 7; if (Math.cos(a) > 0) R.disco(ri(cx), 108 + k * 3 - 4, 3, hex('#7aa860')); }
  for (let k = 0; k < 9; k++) { const a = g + k * 0.7, on = casc > k / 9; if (Math.cos(a) > 0 && on) { const px = ri(277 + Math.sin(a) * 10), py = ri(104 + (k % 4) * 4); R.pset(px, py, hex('#e83a3a')); R.pset(px, py - 1, hex('#ffffff')); } }
  R.linea(265, 112, 289, 112, ORO_S);
};
// ── 10 · el estudio de Atom: cierra el libro en «now», mira a cámara; la nube oscura en «worst night» se vuelve un libro de luz en «become»; «200» ──
const pizarraOjos = (R2, t, [x0, y0, x1, y1]) => { const am = hex('#f8d870'), tiza = hex('#eef2e8'), cx = 158, cy = 60, parp = t > W.N200B && t < W.N200B + 0.15;
  for (const ex of [cx - 13, cx + 13]) { for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; R.pset(ri(ex + Math.cos(a) * 9), ri(cy + Math.sin(a) * (parp ? 1 : 5)), tiza); } if (!parp) { R.disco(ex, cy, 3, am); R.disco(ex, cy, 1, hex('#2a3a2e')); } } };
const q30 = (t) => {
  const o = { pizarra: pizarraOjos }; T.estudio(R, t, o);
  // el libro grande sobre la mesa: abierto, y se cierra en «now»
  const cierra = tramo(t, W.NOW - 0.1, W.NOW + 0.25);
  if (cierra < 1) { R.rect(226, 128, 262, 134, K); R.rect(227, 128, 243, 133, hex('#f4ecd8')); R.rect(245, 128, 261, 133, hex('#f4ecd8')); R.rect(244, 127, 244, 134, hex('#c8bea6')); const tapa = ri(cierra * 16); R.rect(261 - tapa, 124 - ri(Math.sin(cierra * Math.PI) * 8), 262, 128, hex('#9a2a2a')); }
  else { R.rect(228, 124, 260, 134, K); R.rect(229, 125, 259, 133, hex('#9a2a2a')); R.rect(229, 125, 259, 125, ORO); R.rect(229, 133, 259, 133, ORO); for (const dx of [240, 246]) { R.rect(dx, 128, dx + 1, 129, hex('#f8d040')); } if (t < W.NOW + 0.8) for (let k = 0; k < 6; k++) tine(226 + k * 7, 122 - ri(hh(k, 9) * 4), hex('#e8dcc0'), 0.6); }
  const mano = t > W.WORST - 0.2, ra = atomG(214, 172, t, { pose: t < W.NOW + 0.2 ? 'sostiene' : mano ? 'sostiene' : 'senala', dir: t < W.ASK - 0.1 ? 1 : -1, cara: t > W.LASTED ? 'sonrisa' : t > W.WORST && t < W.BECOME ? 'triste' : 'normal' });
  if (mano && ra.mano) { const [mx, my] = ra.mano, be = tramo(t, W.BECOME - 0.1, W.BECOME + 0.4), y = my - 22 + flota(t);
    if (be < 1) { nube(mx, y, 22, pal('#2a2a3a', '#3a3a4e', '#4e4e64'), 7); if (Math.sin(t * 5) > 0.7 && be < 0.5) { R.linea(mx, y + 4, mx - 3, y + 9, hex('#f8e870')); R.linea(mx - 3, y + 9, mx + 1, y + 12, hex('#f8e870')); } for (let k = 0; k < 4; k++) { const v = (t * 1.5 + k / 4) % 1; R.pset(mx - 6 + k * 4, ri(y + 4 + v * 8), hex('#8aa0d8')); } }
    if (be > 0) { libroNuevo(mx - 6, y - 8 - ri((1 - be) * 4), 1, t); halo(mx, y, 30, hex('#ffe890'), 0.5 * be); for (let k = 0; k < 6; k++) { const v = (t * 0.8 + k / 6) % 1; tine(mx - 8 + k * 3, y - 10 - v * 18, hex('#fff8c0'), 0.9 * (1 - v)); } } }
  anio('200', 160, 112, tramo(t, W.N200B - 0.1, W.N200B + 0.3)); if (t > W.N200B) AT.anillo(R, 160, 104, 30, 13, t, tramo(t, W.N200B, W.N200B + 0.8));
  T.estudioDelante(R, t, o);
};
// ── 11 · el escritorio de la consulta: Atom sobre el secante con la pluma: «write it down?»; en «comments» señala abajo y sale el bocadillo ──
const q31 = (t) => {
  const o = { encuadre: 'consulta', camara: 'escritorio' }; T.estudio(R, t, o);
  // la hoja en blanco sobre el secante; en «write» aparece la primera raya
  R.rect(122, 132, 186, 162, hex('#c8bea6')); R.rect(121, 131, 185, 161, hex('#fbf6e8')); for (let y = 138; y < 160; y += 5) R.rect(126, y, 180, y, hex('#e4dcc8'));
  const raya = tramo(t, W.WRITE - 0.1, W.DOWN + 0.4); if (raya > 0) for (let x = 128; x < 128 + raya * 44; x++) R.pset(x, 140 + ri(Math.sin(x * 0.6) * 1.2), TINTA);
  const senala = t > W.COMMENTS - 0.25, ofrece = t > W.DARE - 0.2 && t < W.WRITE - 0.1;
  const ra = atomG(200, 160, t, { pose: senala ? 'senala' : 'sostiene', dir: senala ? 1 : -1, cara: t > W.COMMENTS + 0.7 ? 'guino' : 'sonrisa' });
  if (!senala && ra.mano) { const [mx, my] = ra.mano, px = ofrece ? mx - 2 : (raya > 0 && raya < 1 ? 128 + raya * 44 : mx - 6), py = ofrece ? my - 2 : (raya > 0 && raya < 1 ? 140 : my + 2);
    for (let i = 0; i < 3; i++) R.linea(ri(px + i), ri(py), ri(px + 12 + i), ri(py - 22), i === 1 ? hex('#ffffff') : hex('#e8e0d0')); for (let j = 4; j < 20; j += 2) { R.pset(ri(px + j * 0.55 - 2), ri(py - j), hex('#d8d0c0')); R.pset(ri(px + j * 0.55 + 4), ri(py - j - 1), hex('#c8c0b0')); }
    R.linea(ri(px), ri(py), ri(px + 2), ri(py - 4), ORO); R.pset(ri(px), ri(py), TINTA); if (ofrece) halo(ri(px + 6), ri(py - 10), 18, hex('#fff8d0'), 0.45); }
  // el bocadillo de los comentarios, abajo a la derecha
  const b = tramo(t, W.COMMENTS - 0.15, W.COMMENTS + 0.2); if (b > 0) { const bx = 236, by = ri(144 + (1 - b) * 8), w = ri(48 * b), h = ri(24 * b);
    R.rect(bx - 1, by - 1, bx + w + 1, by + h + 1, K); R.rect(bx, by, bx + w, by + h, hex('#ffffff')); R.poligono([[bx + 8, by + h], [bx + 4, by + h + 8], [bx + 16, by + h]], hex('#ffffff')); R.linea(bx + 8, by + h + 1, bx + 4, by + h + 8, K);
    if (b >= 1) for (let k = 0; k < 3; k++) { const on = Math.floor(t * 4) % 3 >= k; R.disco(bx + 14 + k * 10, by + 12, 2, on ? hex('#3a6ad8') : hex('#b8c8e8')); } }
};
const efectos = [[0.3, 'papel'], [W.REVISES, 'lapiz'], [W.FRANK, 'lapiz'], [W.EDITION, 'golpecito'], [W.INTRO, 'papel'], [W.HOW, 'interruptor'], [W.BORN, 'brillo'],
  [W.SUMMER, 'lluvia'], [W.GHOST - 0.15, 'toc'], [W.NIGHT - 0.1, 'toc'], [W.STIR, 'boom'], [W.GOODBYE, 'papel'], [W.BOOK + 0.1, 'carro'], [W.AFFECTION, 'brillo'],
  [W.C5 + 0.3, 'pajaros'], [W.HIDEOUS, 'brillo'], [W.BIDS, 'toc'], [W.GO, 'whoosh'], [W.PROSPER, 'brillo'], [W.EYES, 'brillo'], [W.N18, 'pop'], [W.MOTHER, 'brillo'], [W.CAME, 'whoosh'],
  [W.NOONE, 'puerta'], [W.C8 + 0.2, 'pajaros'], [W.N200, 'campana'], [W.ALIVE, 'brillo'], [W.FAR, 'whoosh'], [W.WRITTEN, 'pop'], [W.NOW, 'golpecito'], [W.WORST, 'trueno'],
  [W.BECOME, 'brillo'], [W.N200B, 'pop'], [W.WRITE, 'lapiz'], [W.COMMENTS, 'pop']];
const año = (t) => t < W.C6 ? 1831 : t < W.N200 - 0.1 ? 1816 : t < W.C9 ? 2016 : 2026;
T.rodar(E, R, [[0, q21], [W.C2, q22], [W.C3, q23], [W.C4, q24], [W.C5, q25], [W.C6, q26], [W.C7, q27], [W.C8, q28], [W.C9, q29], [W.C10, q30], [W.C11, q31]], { efectos, cartela: '1831', año });
'''

CAB_ESCRIBIR = '''// MS-ESCRIBIR (frases 28–29). La pausa «fíjate» y después Mary escribe el resto de su vida. Once planos:
// 1. la playa de ms-precio congelada: Atom al doble entra y señala; en «published» saca la revista; «1986» en «1986»;
// 2. el aula de 1986 (fondo local): entra el psicólogo en «psychologist», reparte las hojas; escriben en «write»; el
//    calendario pasa del 1 al 4 en «four days»;
// 3. la casa de Italia congelada: «15» y el reloj de bolsillo en «15 minutes»; en «about something» sube el cuaderno que
//    se escribe solo; el nudo oscuro en «deeply painful»;
// 4. el mar de la tormenta congelado: el cuaderno grande; suben el barquito («what happened») y el corazón («how it felt»);
// 5. la casa blanca congelada: la gráfica: baja en «worse» y sube con los meses 1–6 en «following months»;
// 6. la sala de espera (fondo local): la enfermera abre en «doctor»; dos cruces en «less often», cinco en «trivial things»;
// 7. la consulta: del cuaderno sube el nudo («pain»), las palabras le dan forma («shape»): una cajita de luz que Atom coge
//    en «hold»;
// 8. el estudio de Mary en Londres (fondo local, ventana): escribe; crecen los montones en «novels», «travel books» y
//    «biographies»;
// 9. El último hombre (fondo local): ruinas al anochecer; llega alguien y se queda solo en «alone»; los cuervos se van en
//    «empty world»;
// 10. el estudio junto a la chimenea: mira el retrato de Percy («how she felt»); entra su hijo con un barquito («while»),
//     salta en «son», ella sonríe;
// 11. el escritorio de noche, de cerca: escribe; en «Percy's» lee una hoja del fardo; en «never once putting down the pen»
//     la vela baja, el reloj corre y amanece.'''

E['ms-escribir'] = ('Escribir para seguir viva', CAB_ESCRIBIR, AYUDAS + WE + "\n" + LOCALES + PRECIO + ESCRIBIR)

CAB_CIERRE = '''// MS-CIERRE (frases 30–32), cartela 1831. Once planos:
// 1. la mesa de Mary desde arriba (fondo local): tacha un renglón del libro viejo en «revises», corrige en el margen en
//    «Frankenstein»; en «new edition» una mano deja el tomo nuevo (rojo, con los dos ojitos);
// 2. la sala a oscuras (fondo local): Mary con las hojas de la introducción («adds an introduction») cuenta («tells»);
//    su hijo enciende la linterna mágica en «how it was born»: el haz y la casa del lago en la sábana;
// 3. la sábana de cerca: las diapositivas cambian en «Summer of Rain» (la casa con lluvia), «ghost story game» (velas y
//    fantasma de sábana) y «the night» (el cuarto); en «stir» se abren los ojos amarillos; el hijo da un respingo;
// 4. la calle de Londres por la mañana: en «goodbye» Mary da el paquete del libro; el coche se va en «book»; se despide
//    con un corazoncito en «affection»;
// 5. el cruce de caminos a la salida de Londres (fondo local): el carretero alza un tomo en «Hideous Progeny» (los
//    ojitos parpadean); en «bids» abre la caja y en «go forth» los libros salen volando por los tres caminos; brillan en
//    «prosper»; la niña salta;
// 6. el cuarto del lago en luz cálida: los ojos de la visión en «eyes»; Mary con dieciocho años («18»), sonríe; Atom
//    luciérnaga;
// 7. la vela y las sombras (fondo local): brilla el retrato de la madre en «mother», el sonajero en «daughter»; la sombra
//    de alguien aparece en «imagined someone» y se levanta en «came back to life»; la mano joven escribe;
// 8. el lago al amanecer: Felix cierra la puerta en «no one wanted»; la criatura se aparta a la orilla; sale el sol en
//    «200 years later» (2016);
// 9. una biblioteca de hoy (fondo local): una chica abre el libro y salen los ojitos en «alive»; todos los ejemplares se
//    encienden en «far more alive»; telarañas en los retratos de los que dudaron, y baja una araña en «written»;
// 10. el estudio de Atom: cierra el libro en «now» y mira a cámara; la nube de «worst night» se vuelve un libro de luz
//     en «become»; «200»;
// 11. el escritorio de la consulta: Atom ofrece la pluma en «dare», raya la hoja en «write it down»; en «comments» señala
//     abajo a la derecha, sale el bocadillo y guiña.'''

E['ms-cierre'] = ('El cierre', CAB_CIERRE, AYUDAS + WC + "\n" + LOCALES + CIERRE)
