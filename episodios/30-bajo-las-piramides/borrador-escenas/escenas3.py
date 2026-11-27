E = {}

# Grupo S3 del ep30: gz-radar, gz-vibra y gz-articulo.
# AZUL: el código del plano azul de lo que DICEN los italianos (copiado del decorado C, como en escenas2.py: fondo azul
# noche tramado, rejilla de 8/32 px, líneas cian con halo y brillo que corre, magenta para lo «nuevo», barrido de holograma)
AZUL = r'''
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };
const tin = (x, y, c, a) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c, a)); };
const K = hex('#1a1420');
const CAPAS = {};
const capa = (k, dib) => { if (!CAPAS[k]) { const b = R.nuevo(), prev = R.usar(b); dib(); R.usar(prev); CAPAS[k] = b; } R.copiar(CAPAS[k]); };
const sube = (u) => u * u * (3 - 2 * u);
const PZ = Object.fromEntries(Object.entries({
  f0: '#050c22', f1: '#08142e', f2: '#0c1a3a', f3: '#102248', f4: '#162d58', rj: '#132c56', rjM: '#1c3c70', rjC: '#2a568e',
  hal: '#113a62', hal2: '#1a5a88', co: '#2a8ab6', ci: '#5ae0f0', br: '#c8fbff', mg: '#e67ad8', mgO: '#8a4096', mgH: '#3a1c58',
  bl: '#f6f9ff', blO: '#a6b4d4', blH: '#34446c' }).map(([k, v]) => [k, hex(v)]));
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const tono = (r, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return r[l < 0 ? 0 : l >= r.length ? r.length - 1 : l]; };
const ras = (x0, y0, x1, y1, fn) => {
  x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
  const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1, dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
  let e = dx + dy, i = 0;
  for (;;) { fn(x0, y0, i++); if (x0 === x1 && y0 === y1) break; const e2 = 2 * e; if (e2 >= dy) { e += dy; x0 += sx; } if (e2 <= dx) { e += dx; y0 += sy; } }
};
// la pluma del plano (la del decorado C): halos primero y núcleos después, con el brillo que corre por las líneas.
// Tipos: 'c' cian, 'b' brillo, 'e' cian sin halo, 'd' cian apagado, 'D' rejilla clara, 'm' magenta, 'w' blanco (lo real)
const pluma = () => {
  const L = [], N = [];
  const P = {
    l(x0, y0, x1, y1, k = 'c', pt = 0) { L.push([x0, y0, x1, y1, k, pt]); },
    p(x, y, k = 'c') { L.push([x, y, x, y, k, 0]); },
    caja(x0, y0, x1, y1, k = 'c', pt = 0) { P.l(x0, y0, x1, y0, k, pt); P.l(x1, y0, x1, y1, k, pt); P.l(x1, y1, x0, y1, k, pt); P.l(x0, y1, x0, y0, k, pt); },
    poli(pts, k = 'c', pt = 0, n = pts.length) { for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; P.l(a[0], a[1], b[0], b[1], k, pt); } },
    parte(x0, y0, x1, y1, u, k = 'c', pt = 0) { if (u <= 0) return; u = Math.min(1, u); P.l(x0, y0, x0 + (x1 - x0) * u, y0 + (y1 - y0) * u, k, pt); if (u < 1) P.p(Math.round(x0 + (x1 - x0) * u), Math.round(y0 + (y1 - y0) * u), 'b'); },
    flecha(x, y, dx, dy, k = 'c') { if (dy) { P.l(x - 2, y - 2 * dy, x, y, k); P.l(x + 2, y - 2 * dy, x, y, k); } else { P.l(x - 2 * dx, y - 2, x, y, k); P.l(x - 2 * dx, y + 2, x, y, k); } },
    cotaH(x0, x1, y, k = 'c') { P.l(x0 + 1, y, x1 - 1, y, k); P.flecha(x0 + 1, y, -1, 0, k); P.flecha(x1 - 1, y, 1, 0, k); P.l(x0, y - 3, x0, y + 3, 'd'); P.l(x1, y - 3, x1, y + 3, 'd'); },
    cotaV(x, y0, y1, k = 'c') { P.l(x, y0 + 1, x, y1 - 1, k); P.flecha(x, y0 + 1, 0, -1, k); P.flecha(x, y1 - 1, 0, 1, k); P.l(x - 3, y0, x + 3, y0, 'd'); P.l(x - 3, y1, x + 3, y1, 'd'); },
    n(txt, x, y, col = PZ.ci) { N.push([String(txt), Math.round(x), Math.round(y), col]); },
    pintar(t) {
      const tenue = h(Math.floor(t * 9), 7) > 0.94;
      const HALO = { c: PZ.hal, b: PZ.hal2, m: PZ.mgH, w: PZ.blH };
      const NUC = { e: tenue ? PZ.co : PZ.ci, c: tenue ? PZ.co : PZ.ci, b: tenue ? PZ.ci : PZ.br, d: PZ.co, D: PZ.rjC, m: tenue ? PZ.mgO : PZ.mg, w: PZ.bl };
      for (const [x0, y0, x1, y1, k, pt] of L) { const hc = HALO[k]; if (!hc) continue;
        ras(x0, y0, x1, y1, (x, y, i) => { if (pt && i % pt >= pt / 2) return; R.pset(x + 1, y, hc); R.pset(x - 1, y, hc); R.pset(x, y + 1, hc); R.pset(x, y - 1, hc); }); }
      const fase = Math.floor(t * 30); let s = 0;
      for (const [x0, y0, x1, y1, k, pt] of L) { const c = NUC[k], corre = k === 'c' || k === 'm' || k === 'w';
        ras(x0, y0, x1, y1, (x, y, i) => { if (pt && i % pt >= pt / 2) return; R.pset(x, y, corre && ((s + i + 4000 - fase) % 83) < 3 ? (k === 'm' ? PZ.bl : PZ.br) : c); });
        s += 23; }
      for (const [txt, x, y, col] of N) R.numero(txt, x, y, { fina: true, color: tenue ? PZ.co : col });
    },
  };
  return P;
};
// el fondo del plano azul (como c_planoFondo): degradado tramado, motas, rejilla de 8/32 px con cruces, marco con
// reglillas (sin la esquina de Atom), cajetín sin letras y, si tarima, la tarima del holograma (pies en y 172)
const fondoAzul = (k, tarima, extra) => capa(k, () => {
  const F = [PZ.f0, PZ.f1, PZ.f2, PZ.f3], yMax = tarima ? 160 : 180, yF = tarima ? 156 : 172;
  for (let y = 0; y < yMax; y++) for (let x = 0; x < 320; x++) {
    const d = Math.hypot((x - 160) / 190, (y - 86) / 120);
    let c = tono(F, 0.5 + 1.0 * (1 - y / 200) + 1.3 * (1 - d) - (y % 3 === 0 ? 0.35 : 0), x, y);
    if (h(x, y, 3) > 0.993) c = PZ.f4;
    const gx = (x + 16) % 32 === 0, gy = (y + 16) % 32 === 0;
    if (gx || gy) c = (gx && gy) ? PZ.rjC : PZ.rjM;
    else if ((x % 8 === 0 || y % 8 === 0) && (x + y) % 2 === 0) c = PZ.rj;
    if (((x + 16) % 32 === 0 && Math.abs((y + 16) % 32 - 16) === 14) || ((y + 16) % 32 === 0 && Math.abs((x + 16) % 32 - 16) === 14)) c = PZ.rjC;
    if (y < 15 && x > 18 && x < 172 && (gx || gy)) c = PZ.rjM;
    R.pset(x, y, c);
  }
  if (tarima) for (let y = 146; y < 160; y++) for (let x = 6; x < 314; x++) if ((y - 146) / 14 > b4(x, y) + 0.25 && y % 2 === 0) R.pset(x, y, (x + y) % 4 === 0 ? PZ.f4 : PZ.f3);
  const M = PZ.rjC;
  R.linea(4, 4, 270, 4, PZ.rjM); R.linea(4, 4, 4, yF, M); R.linea(4, yF, 315, yF, M); R.linea(315, 50, 315, yF, M);
  for (let x = 12; x < 270; x += 8) R.pset(x, 5, x % 32 === 12 ? M : PZ.rjM);
  for (let y = 12; y < yF; y += 8) { R.pset(5, y, M); if (y % 32 === 12) R.pset(6, y, M); }
  for (let x = 8; x < 312; x += 8) { R.pset(x, yF - 1, M); if (x % 32 === 8) R.pset(x, yF - 2, M); }
  for (const [x, y, dx, dy] of [[4, 4, 1, 1], [4, yF, 1, -1], [315, yF, -1, -1]]) { R.linea(x, y, x + 9 * dx, y, PZ.co); R.linea(x, y, x, y + 9 * dy, PZ.co); }
  const c0 = yF - 24;
  R.poligono([[262, c0], [313, c0], [313, yF - 1], [262, yF - 1]], (x, y) => ((x + y) % 2 ? PZ.f1 : PZ.f0));
  R.linea(262, c0, 313, c0, M); R.linea(262, c0, 262, yF - 1, M); R.linea(262, c0 + 11, 313, c0 + 11, PZ.rjM); R.linea(288, c0, 288, yF - 1, PZ.rjM);
  for (let k2 = 0; k2 < 3; k2++) R.linea(266, c0 + 3 + k2 * 3, 266 + [18, 12, 15][k2], c0 + 3 + k2 * 3, k2 ? PZ.rjC : PZ.co);
  R.poligono([[272, c0 + 21], [277, c0 + 14], [282, c0 + 21]], PZ.hal2); R.linea(272, c0 + 21, 277, c0 + 14, PZ.co); R.linea(277, c0 + 14, 282, c0 + 21, PZ.co);
  R.anillo(300, c0 + 6, 4, PZ.rjC); R.linea(300, c0 + 1, 300, c0 + 11, PZ.rjM); R.linea(295, c0 + 6, 305, c0 + 6, PZ.rjM); R.poligono([[298, c0 + 6], [300, c0 + 1], [302, c0 + 6]], PZ.co);
  for (let k2 = 0; k2 < 4; k2++) R.linea(292, c0 + 15 + k2 * 2, 292 + [18, 10, 14, 6][k2], c0 + 15 + k2 * 2, PZ.rjC);
  if (tarima) {
    for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) {
      const u = (y - 160) / 20; let c = tono([PZ.f0, PZ.f1, PZ.f2], 1.6 - u * 1.2 + 0.4 * (1 - Math.abs(x - 160) / 160), x, y);
      const z = (y - 70) / 90, rx = (x - 160) / z;
      if (Math.abs(((rx % 24) + 24) % 24) < 1 / z * 0.9) c = PZ.rjM;
      R.pset(x, y, c);
    }
    for (const y of [163, 167, 172]) R.linea(0, y, 319, y, PZ.rjM);
    R.linea(0, 160, 319, 160, PZ.co); R.linea(0, 161, 319, 161, PZ.hal);
  }
  extra && extra();
});
// la roca en corte (rayado en diagonal con estratos punteados)
const roca = (x0, y0, x1, y1, estratos = []) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const k = (x + y) % 7; if (k === 0 && h(x >> 2, y >> 2, 5) > 0.22) R.pset(x, y, PZ.rj); else if (k === 3 && h(x, y, 6) > 0.86) R.pset(x, y, PZ.f4);
  }
  for (const ey of estratos) for (let x = x0; x <= x1; x++) { const y = Math.round(ey + Math.sin(x * 0.07 + ey) * 1.5); if ((x >> 1) % 4 !== 3) R.pset(x, y, PZ.rjM); }
};
// la tira de señal que vibra (a la derecha, x 288–314, y 52–100) y los pilotos del cajetín
const senal = (t, yF = 156) => {
  R.linea(288, 52, 314, 52, PZ.rjC); R.linea(288, 100, 314, 100, PZ.rjC); R.linea(288, 52, 288, 100, PZ.rjM);
  for (let k = 0; k < 3; k++) { const y0 = 60 + k * 15; let py = y0;
    for (let x = 290; x < 313; x++) { const y = Math.round(y0 + Math.sin(x * (0.5 + k * 0.25) - t * (4 + k)) * (2 + k) * (0.6 + 0.4 * Math.sin(t * 0.7 + k))); R.linea(x - 1, py, x, y, k === 1 ? PZ.ci : PZ.co); py = y; } }
  for (let k = 0; k < 3; k++) R.pset(306 + k * 3, yF - 4, (Math.floor(t * 2 + k * 0.7) % 3) === k ? PZ.ci : PZ.hal2);
};
// el barrido de holograma que sube (salta la esquina de Atom) y algún salto de fila
const MAS = new Map();
const holo = (t, yTope = 159, xa = 0, xb = 319, salto = true, yMin = 0) => {
  if (!MAS.size) for (const [a, b] of [[PZ.f0, PZ.f1], [PZ.f1, PZ.f2], [PZ.f2, PZ.f3], [PZ.f3, PZ.f4], [PZ.f4, PZ.rjM], [PZ.rj, PZ.rjM], [PZ.rjM, PZ.rjC], [PZ.rjC, PZ.co], [PZ.hal, PZ.hal2], [PZ.hal2, PZ.co], [PZ.co, PZ.ci], [PZ.ci, PZ.br], [PZ.mgH, PZ.mgO], [PZ.mgO, PZ.mg]]) MAS.set(a, b);
  const B = R.buf, ys = Math.round(yTope - ((t * 20) % (yTope + 30)));
  for (let y = Math.max(yMin, ys); y <= Math.min(yTope, ys + 5); y++) {
    const r = y * 320;
    for (let x = xa; x <= xb; x++) { if (y < 46 && x > 274) continue; const c = B[r + x], m = MAS.get(c); if (m !== undefined) B[r + x] = (y === ys && (x & 1)) ? (MAS.get(m) ?? m) : m; }
  }
  const g = Math.floor(t * 8);
  if (salto && h(g, 3) > 0.9) { const y0 = 20 + Math.floor(h(g, 4) * 130), n = 1 + Math.floor(h(g, 5) * 3), d = h(g, 6) > 0.5 ? 2 : 1;
    for (let y = y0; y < Math.min(yTope, y0 + n); y++) B.copyWithin(y * 320 + d, y * 320, y * 320 + 320 - d); }
};
// una rampa en espiral alrededor de un pozo (la del decorado C): detras = solo las vueltas de atrás
const espiral = (P, cx, ya, yb, r, p, t, detras, grueso = 1, ymax = 1e9, vel = 2.4) => {
  let q = null;
  for (let y = ya; y <= Math.min(yb, ymax); y += 0.35) {
    const a = (y - ya) / p * 6.2832 - t * vel, s = Math.sin(a), x = Math.round(cx + r * Math.cos(a)), yy = Math.round(y);
    if ((s > 0) === detras) { q = null; continue; }
    if (q && (q[0] !== x || q[1] !== yy)) {
      if (detras) P.l(q[0], q[1], x, yy, 'D');
      else for (let g = 0; g < grueso; g++) P.l(q[0], q[1] + g, x, yy + g, g === 0 ? (Math.abs(Math.cos(a)) < 0.3 ? 'b' : 'e') : g === grueso - 1 ? 'd' : 'e');
    }
    if (!q || q[0] !== x || q[1] !== yy) q = [x, yy];
  }
};
// un cubo en alambre dibujado arista a arista hasta la fracción u
const cubo = (P, x0, y0, s, dx, dy, u, k = 'c') => {
  const A = [[x0, y0], [x0 + s, y0], [x0 + s, y0 + s], [x0, y0 + s]], Bk = A.map(([x, y]) => [x + dx, y + dy]);
  const ar = [[A[3], A[2], k], [A[2], A[1], k], [A[1], A[0], k], [A[0], A[3], k], [A[0], Bk[0], k], [A[1], Bk[1], k], [A[2], Bk[2], k],
    [Bk[0], Bk[1], 'd'], [Bk[1], Bk[2], 'd'], [Bk[2], Bk[3], 'D'], [Bk[3], Bk[0], 'D'], [A[3], Bk[3], 'D']];
  const n = u * ar.length;
  for (let i = 0; i < ar.length && i < n; i++) { const [a, b, kk] = ar[i]; P.parte(a[0], a[1], b[0], b[1], n - i, kk); }
};
// la figurita de holograma (para la escala): 3 × 7 px, con las piernas que andan
const figurita = (x, y, t, anda, c = PZ.br, c2 = PZ.ci) => {
  x = Math.round(x); y = Math.round(y);
  R.rect(x - 1, y - 7, x, y - 6, c); R.rect(x - 1, y - 5, x + 1, y - 3, c2); R.pset(x - 1, y - 4, c);
  const f = anda ? Math.floor(t * 6) % 2 : 0;
  R.pset(x - 1 + (f ? -1 : 0), y - 2, c2); R.pset(x - 1 + (f ? -1 : 0), y - 1, c2); R.pset(x + 1 + (f ? 1 : 0), y - 2, c2); R.pset(x + 1 + (f ? 1 : 0), y - 1, c2);
};
// el anillo que late alrededor de algo para que se lea (en código de plano)
const marca = (x, y, r, t, c = PZ.br) => { const rr = r + Math.round(Math.sin(t * 6) * 1.2); R.anillo(Math.round(x), Math.round(y), rr, c, 2); R.anillo(Math.round(x), Math.round(y), rr + 2, PZ.hal2, 3); };
// el portátil del ingeniero en la mano que devuelve R.actor
const portatil = (a) => { if (a && a.mano) T.PIEZAS_GZ.portatil(R, a.mano[0] + 2, a.mano[1] + 5, { pantalla: 'azul' }); };
'''

# COMUN: lo de este grupo para los fondos propios en estilo real (búferes fijos, zonas tranquilas, nubes de tres tonos)
COMUN = r'''
const H = (s) => s.split(' ').map(hex);
const W = hex('#ffffff');
// la zona de Atom y la barra del año se quedan tranquilas: lo que se mueve no entra ahí
const libre = (x, y) => !((x >= 274 && y <= 47) || (x >= 16 && x <= 174 && y <= 16));
const ps = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (libre(x, y)) R.pset(x, y, c); };
// un búfer fijo (se dibuja una vez) que se devuelve sin copiar
const FIJO = {};
const fijo = (k, f) => { if (!FIJO[k]) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); FIJO[k] = b; } return FIJO[k]; };
const ease = (u) => u * u * (3 - 2 * u);
// ruido suave (bilineal) para manchas grandes sin cuadros
const sn = (x, y, s, k = 0) => { const gx = x / s, gy = y / s, i = Math.floor(gx), j = Math.floor(gy), u = ease(gx - i), v = ease(gy - j); return lerp(lerp(h(i, j, k), h(i + 1, j, k), u), lerp(h(i, j + 1, k), h(i + 1, j + 1, k), u), v); };
// rectángulo con borde oscuro y relleno (con función de color opcional)
const caja = (x0, y0, x1, y1, c, borde = K) => { R.rect(x0, y0, x1, y1, borde); if (typeof c === 'function') { for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) R.pset(x, y, c(x, y)); } else R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
// una nube de tres bultos en tres tonos (P: sombra, medio, luz)
const nube = (cx, cy, w, sem, P) => {
  const a = Math.round(w * 0.34);
  for (let j = -a; j <= Math.round(a * 0.45); j++) for (let i = -w; i <= w; i++) {
    const d = Math.min(Math.hypot(i / (w * 0.55), (j + a * 0.25) / (a * 0.95)), Math.hypot((i + w * 0.45) / (w * 0.5), (j - a * 0.05) / (a * 0.62)), Math.hypot((i - w * 0.42) / (w * 0.52), (j - a * 0.1) / (a * 0.58)));
    if (d > 1) continue;
    const v = (j / a) * 1.1 + d * 0.45 - 0.25 + (h((i + sem * 13) >> 1, j >> 1, sem) - 0.5) * 0.45;
    ps(cx + i, cy + j, v > 0.4 ? P[0] : v > -0.12 ? P[1] : P[2]);
  }
};
'''

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['gz-radar'] = ('El radar del satélite', '''// GZ-RADAR (frase 8), 2025, sin cartela. Cómo se mira desde el espacio: el radar del satélite. Tres planos:
// 1. (0 → «the kind») LOCAL Kefrén de noche desde su pie, la «montaña de piedra»: un turista la barre de abajo arriba
//    con la linterna; en «space» los dos miran al cielo y ella lo señala con un «?»; el camellero llega y se para; el
//    satélite cruza como una estrella y en «radar» lanza un barrido cian que baja por la piedra.
// 2. («the kind» → «The satellite») LOCAL Giza vista desde arriba (las tres pirámides, la Esfinge, la calzada, las
//    mastabas, el pueblo y los campos): en «map» una línea de barrido la va convirtiendo en imagen de radar (grano gris);
//    en «night» se hace de noche y se encienden las luces, pero el radar sigue; en «clouds» pasan nubes y el radar las
//    atraviesa (solo su contorno punteado); en «clear skies» vuelve el sol.
// 3. («The satellite» → fin) F hoy/orbita/general: el satélite llega a su sitio; en «sends radio waves» bajan las ondas
//    hacia Giza; en «listens» saca la trompetilla de oído enorme y la apunta a la pirámide (gag 3); en «echo» el eco
//    ámbar entra en la trompetilla y salta un «!».''', AZUL + COMUN + r'''
const ra = (f) => en('radar', f);
const P2 = ra(0.3151), P3 = ra(0.6427);
const ESPACIO = ra(0.1299), SAT = ra(0.2239), RADAR = ra(0.2557), MAPA = ra(0.3676), NOCHE = ra(0.4547), NUBES = ra(0.5030), CLARO = ra(0.5597);
const ENVIA = ra(0.6862), ABAJO = ra(0.7788), ESCUCHA = ra(0.8610), ECO = ra(0.9080), VUELVE = ra(0.9660);

// ── 1 · LOCAL Kefrén de noche desde su pie: la «montaña de piedra» ──
// la pirámide desde abajo: la arista casi en el centro (A arriba, C abajo), la cara de la izquierda a la luz de la luna
// y la de la derecha en sombra; hiladas en perspectiva (más juntas arriba), sillares, desconchones y el remate liso
const PA = [206, 26], PC = [140, 186], PL = [-90, 150], PR = [420, 152];
const fondo1 = () => capa('kefren1', () => {
  // el cielo de noche tramado con estrellas y la Vía Láctea
  const F = H('#04061a #070c26 #0c1434 #121c44 #1a2650');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let v = 0.6 + (y / 180) * 3 + (h(x >> 4, y >> 4, 2) - 0.5) * 0.5;
    const d = Math.abs(x - (250 - y * 0.9)) / 18;
    if (d < 1 && libre(x, y)) v += (1 - d) * 1.1 * (0.5 + h(x >> 2, y >> 2, 5) * 0.9);
    let c = tono(F, v, x, y); const s = h(x, y, 1);
    if (s > 0.9955) c = s > 0.999 ? W : hex('#9ab8ff'); else if (d < 1 && s > 0.98 && libre(x, y)) c = hex('#4a5aa0');
    R.pset(x, y, c);
  }
  // la luna arriba a la izquierda (fuera de la barra del año), con su halo y sus mares
  for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i, j); if (d > 7 && d < 14 && (i + j) % 2 === 0) R.pset(44 + i, 46 + j, mez(R.pget(44 + i, 46 + j), hex('#5a6aa8'), (14 - d) / 14)); }
  R.disco(44, 46, 6, hex('#e8ecf6')); R.disco(46, 44, 2, hex('#c8ccdc')); R.pset(41, 48, hex('#c8ccdc')); R.pset(42, 49, hex('#c8ccdc')); R.disco(42, 44, 1, hex('#ffffff'));
  // las dos caras
  const LUZ = H('#3a3e5a #545a7a #6e7696 #8a92b0 #a8b0c8 #c8cee0'), SOM = H('#10121e #181c2c #22283a #2e3448 #3c4458');
  const cara = (B0, B1, P, base) => {
    const pt = (u, v) => [lerp(lerp(B0[0], B1[0], u), PA[0], v), lerp(lerp(B0[1], B1[1], u), PA[1], v)];
    R.poligono([B0, B1, PA], (x, y) => tono(P, base + (h(x >> 2, y >> 1, 4) - 0.5) * 0.9 + (h(x, y, 5) - 0.5) * 0.5, x, y));
    const N = 42;
    for (let k = 1; k < N; k++) {
      const v = 1 - Math.pow(1 - k / N, 1.25), [x0, y0] = pt(0, v), [x1, y1] = pt(1, v), [x2, y2] = pt(0, v + 0.6 / N), [x3, y3] = pt(1, v + 0.6 / N);
      if (v > 0.86) { if (k % 3 === 0) R.linea(x0, y0, x1, y1, P[Math.max(0, base - 1)] ); continue; }   // el remate de caliza lisa
      R.linea(x0, y0, x1, y1, P[0]); R.linea(x2, y2, x3, y3, P[Math.min(P.length - 1, Math.round(base) + 1)]);
      // las juntas entre sillares, a tresbolillo
      const vn = 1 - Math.pow(1 - (k + 1) / N, 1.25);
      for (let u = (k % 2) * 0.03; u < 1; u += 0.06 + h(k, u * 50, 6) * 0.03) { const [a, b] = pt(u, v), [c2, d2] = pt(u, vn); R.linea(a, b, c2, d2, P[0]); }
    }
    // desconchones (huecos de sillares que faltan) y arena en las hiladas de abajo
    for (let k = 0; k < 26; k++) { const u = h(k, 1, base), v = h(k, 2, base) * 0.7, [x, y] = pt(u, v), w = 2 + Math.round(h(k, 3) * 3); R.rect(x, y, x + w, y + 1, P[0]); R.rect(x, y + 2, x + w, y + 2, P[Math.min(P.length - 1, Math.round(base) + 2)]); }
  };
  cara(PL, PC, LUZ, 3); cara(PC, PR, SOM, 2);
  // la arista: el canto de luz
  R.linea(PA[0], PA[1], PC[0], PC[1], hex('#c8cee0')); R.linea(PA[0] + 1, PA[1] + 1, PC[0] + 1, PC[1], hex('#0a0c16'));
  // la arena delante, con ondas y huellas
  const ARN = H('#2a2430 #3a3240 #4a4050 #5c5262 #6e6474');
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) {
    const borde = 158 + Math.sin(x * 0.04) * 3 + Math.sin(x * 0.13) * 1.5; if (y < borde) continue;
    R.pset(x, y, tono(ARN, 2.6 - (y - borde) * 0.03 + Math.sin(x * 0.4 + y * 0.9) * 0.4 + (h(x, y, 7) - 0.5) * 0.6 + (x < 128 ? 0.5 : 0), x, y));
  }
  for (let k = 0; k < 12; k++) { const x = 96 + k * 13, y = 170 + (k % 2) * 3; R.pset(x, y, hex('#1c1822')); R.pset(x + 1, y, hex('#1c1822')); }
  // sillares caídos al pie
  for (const [x, y, w] of [[14, 162, 18], [268, 160, 20], [298, 168, 16]]) {
    R.poligono([[x, y + 3], [x + 4, y], [x + w + 4, y], [x + w, y + 3]], (xx, yy) => tono(LUZ, 3.2 + (h(xx, yy, 3) - 0.5), xx, yy));
    R.poligono([[x, y + 3], [x + w, y + 3], [x + w, y + 11], [x, y + 11]], (xx, yy) => tono(LUZ, 1.6 + (h(xx >> 1, yy, 4) - 0.5) * 1.2, xx, yy));
    R.poligono([[x + w, y + 3], [x + w + 4, y], [x + w + 4, y + 8], [x + w, y + 11]], (xx, yy) => tono(SOM, 2.2 + (h(xx, yy, 5) - 0.5), xx, yy));
    R.linea(x, y + 3, x + w, y + 3, hex('#c8cee0')); R.linea(x, y + 11, x + w, y + 11, K); R.linea(x + 3, y + 6, x + 7, y + 9, LUZ[0]); R.linea(x + w - 6, y + 4, x + w - 4, y + 8, LUZ[0]);
  }
});
const p1 = (t) => {
  fondo1();
  // nubes finas de noche que pasan a tres velocidades; murciélagos; la luz de colores que recorre la cara
  for (const [x0, y0, w, v, k] of [[20, 64, 22, 3, 1], [200, 52, 16, 5, 2], [-60, 96, 26, 2, 3]]) { const x = ((x0 + t * v) % 380) - 30; nube(x, y0, w, k, H('#141a34 #1e2848 #2c3a62')); }
  for (let k = 0; k < 2; k++) { const a = t * (1.1 + k * 0.3) + k * 2, x = Math.round(92 + Math.cos(a) * 26 + k * 10), y = Math.round(84 + Math.sin(a * 1.7) * 10), b = Math.floor(t * 9 + k) % 2; ps(x, y, K); ps(x - 1, y - b, K); ps(x + 1, y - b, K); ps(x - 2, y - 1 + b, K); ps(x + 2, y - 1 + b, K); }
  { const cx = 80 + Math.sin(t * 0.5) * 30, cy = 122 - Math.cos(t * 0.5) * 8; for (let y = 98; y < 156; y++) for (let x = 30; x < 140; x++) { const d = Math.hypot((x - cx) / 32, (y - cy) / 18); if (d < 1 && (x + y) % 2 === 0 && y > lerp(PA[1], PL[1], (PA[0] - x) / (PA[0] - PL[0])) && x < lerp(PA[0], PC[0], (y - PA[1]) / (PC[1] - PA[1]))) R.pset(x, y, mez(R.pget(x, y), hex('#b06ae8'), (1 - d) * 0.55)); } }
  // el satélite: una estrella que se mueve por el cielo de la derecha; en «radar» lanza el barrido sobre la piedra
  const su = tramo(t, 2.4, 6.5), sx = Math.round(lerp(204, 316, su)), sy = Math.round(lerp(58, 84, su));
  if (su > 0 && su < 1) { R.icono('satelite', sx - 3, sy - 3, hex('#e8ecff'), K); ps(sx, sy, hex('#ffe890')); if (t > SAT && Math.floor(t * 6) % 2) { ps(sx, sy - 1, hex('#5ae0f0')); ps(sx, sy + 1, hex('#5ae0f0')); ps(sx - 2, sy, hex('#5ae0f0')); ps(sx + 2, sy, hex('#5ae0f0')); } }
  const bar = tramo(t, RADAR - 0.1, RADAR + 1.1);
  if (bar > 0 && bar < 1) {
    for (let k = 0; k < 3; k++) { const f = (t * 1.4 + k / 3) % 1, cx = lerp(sx, 200, f), cy = lerp(sy, 70, f), rr = 3 + f * 9; for (let a = -0.9; a <= 0.9; a += 0.1) ps(cx - Math.sin(a + 0.6) * rr, cy + Math.cos(a + 0.6) * rr * 0.5, hex('#5ae0f0')); }
    // la franja de barrido baja por las dos caras, con un brillo cian
    const yb = Math.round(lerp(24, 160, bar));
    for (let x = 0; x < 320; x++) for (let y = yb - 2; y <= yb; y++) { const c = R.pget(x, y); if (!libre(x, y) || y > 158) continue; const dentro = x < PA[0] ? y > lerp(PA[1], PL[1], (PA[0] - x) / (PA[0] - PL[0])) : y > lerp(PA[1], PR[1], (x - PA[0]) / (PR[0] - PA[0])); if (dentro) R.pset(x, y, mez(c, hex('#5ae0f0'), y === yb ? 0.8 : 0.35)); }
  }
  // los turistas al pie: él barre la cara con la linterna (la «montaña de piedra»); en «space» los dos miran arriba y
  // ella señala el cielo con su «?»; el camellero llega por la izquierda y se para a mirar
  const haz = ease(tramo(t, 0.6, 2.6)), mira = t > ESPACIO - 0.2;
  const t1 = R.actor(EL.turista1, 214, 174, t, { dir: -1, sostiene: true, sorpresa: t > RADAR && t < RADAR + 1.2 });
  const [mx, my] = t1.mano;
  if (t > 0.6) {
    const ex = lerp(196, 168, haz), ey = lerp(134, 52, haz), r = 6 + haz * 6;
    for (let y = Math.round(ey - r); y <= my; y++) for (let x = Math.round(Math.min(mx, ex) - r); x <= Math.max(mx, ex) + r; x++) {
      const u = (y - my) / (ey - my); if (u < 0 || u > 1) continue; const cxl = lerp(mx, ex, u), w = 1 + u * r; if (Math.abs(x - cxl) > w || (x + y) % 2) continue; if (libre(x, y)) R.pset(x, y, mez(R.pget(x, y), hex('#fff4b0'), 0.25));
    }
    for (let j = -r; j <= r; j++) for (let i = -r * 1.4; i <= r * 1.4; i++) { const d = Math.hypot(i / 1.4, j) / r; if (d < 1) { const x = Math.round(ex + i), y = Math.round(ey + j); if (libre(x, y)) R.pset(x, y, mez(R.pget(x, y), hex('#fff0b0'), (1 - d) * 0.6)); } }
  }
  T.PIEZAS_GZ.linterna(R, mx - 6, my + 3, { dir: -1, encendida: t > 0.6, haz: false });
  R.actor(EL.turista2, 240, 175, t, { dir: -1, dedo: mira && t < RADAR + 1.6, sonrisa: t > RADAR + 0.6 });
  if (mira && t < RADAR) R.icono('?', 244, Math.round(134 + Math.sin(t * 5) * 1.5), W, K, 2);
  const cu = tramo(t, 0.3, 3.4), cx = Math.round(lerp(-16, 52, cu));
  R.actor(EL.camellero, cx, 176, t, { dir: 1, anda: cu > 0 && cu < 1, sorpresa: t > RADAR + 0.2 && t < RADAR + 1.4 });
  T.viento(R, t, { y0: 166, y1: 178, fuerza: 0.6, color: hex('#6e6474') });
};

// ── 2 · Giza desde arriba, que se vuelve imagen de radar ──
const KH = [208, 62, 22], KF = [152, 102, 20], MK = [102, 140, 10];
const RUTA = [[330, 142], [292, 140], [262, 134], [236, 136], [200, 140], [168, 134], [132, 124], [96, 118], [64, 104], [44, 82], [34, 56], [-12, 40]];
const enRuta = (s) => { const L = []; let tot = 0; for (let i = 1; i < RUTA.length; i++) { const l = Math.hypot(RUTA[i][0] - RUTA[i - 1][0], RUTA[i][1] - RUTA[i - 1][1]); L.push(l); tot += l; }
  let d = ((s % 1) + 1) % 1 * tot; for (let i = 0; i < L.length; i++) { if (d <= L[i]) { const u = d / L[i]; return [lerp(RUTA[i][0], RUTA[i + 1][0], u), lerp(RUTA[i][1], RUTA[i + 1][1], u), RUTA[i + 1][0] < RUTA[i][0] ? -1 : 1]; } d -= L[i]; } return RUTA[RUTA.length - 1]; };
const PIR = H('#4a3820 #6e5434 #9a7e52 #c4a874 #e4cc9a #f4e4bc');
const pirTop = (cx, cy, r, casquete = 0) => {
  // la sombra hacia el norte (el sol, alto y al sur)
  for (let j = 1; j <= Math.round(r * 0.35); j++) for (let x = cx - r + j; x <= cx + r - j; x++) R.pset(x, cy - r - j, mez(R.pget(x, cy - r - j), hex('#3a2a18'), 0.55));
  for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) {
    const dx = x - cx, dy = y - cy, ax = Math.abs(dx), ay = Math.abs(dy), cara = ay >= ax ? (dy > 0 ? 'S' : 'N') : (dx > 0 ? 'E' : 'W');
    const anillo = Math.max(ax, ay);
    let v = { S: 4.0, E: 3.0, W: 2.5, N: 1.4 }[cara] - (anillo % 2 === 0 ? 0.45 : 0) + (h(x, y, 9) - 0.5) * 0.6;
    if (ax === ay) v += 0.9;
    if (anillo < casquete) v += 0.7;
    if (anillo === r) v = { S: 2.2, E: 1.6, W: 1.4, N: 0.6 }[cara];
    R.pset(x, y, tono(PIR, v, x, y));
  }
  R.pset(cx, cy, PIR[5]);
};
const mapaDia = () => fijo('mapa', () => {
  const ARE = H('#9a7040 #b4844c #c89a5c #d8ae6e #e6c286 #f0d49c'), CAL = H('#8a7458 #a08a6a #b8a07c #ccb690 #dccaa4');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const mv = 1 - Math.hypot((x - 160) / 125, (y - 96) / 84) + (sn(x, y, 22, 12) - 0.5) * 0.6 + (sn(x, y, 5, 13) - 0.5) * 0.16, meseta = mv > 0 && x < 262;
    const duna = Math.sin(x * 0.32 + y * 0.12 + Math.sin(y * 0.05) * 3) * 0.35;
    let c = meseta ? tono(CAL, 2.3 + (sn(x, y, 14, 2) - 0.5) * 1.6 + (h(x, y, 3) - 0.5) * 0.7, x, y)
      : tono(ARE, 2.7 + duna + (sn(x, y, 30, 4) - 0.5) * 1.8 + (h(x, y, 5) - 0.5) * 0.6, x, y);
    if (!libre(x, y)) c = tono(ARE, 3 + (h(x >> 3, y >> 3, 6) - 0.5) * 0.6, x, y);
    R.pset(x, y, c);
  }
  // el uadi seco que baja a la izquierda y unas rocas
  for (let y = 18; y < 180; y++) { const x = Math.round(26 + Math.sin(y * 0.06) * 10 + y * 0.1); for (let i = -2; i <= 2; i++) if (libre(x + i, y)) R.pset(x + i, y, Math.abs(i) === 2 ? hex('#a87c48') : hex('#c4965a')); }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 7) * 300 + 10), y = Math.round(h(k, 2, 7) * 150 + 22); if (libre(x, y) && x < 262) { R.pset(x, y, hex('#6a5434')); R.pset(x + 1, y, hex('#e8d4a4')); R.pset(x, y + 1, hex('#4a3a24')); } }
  // rodadas de los coches y sendas de los turistas (por debajo de las pirámides)
  for (let k = 0; k < 6; k++) { let x = 30 + k * 44, y = 176; for (let q = 0; q < 150; q++) { x += Math.sin(q * 0.07 + k * 1.7) * 0.9 + 0.3; y -= 0.95; for (const dx of [0, 2]) if (libre(x + dx, y) && y > 18) R.pset(Math.round(x + dx), Math.round(y), (q + k) % 9 < 7 ? hex('#a8824e') : hex('#c8a46a')); } }
  // los campos verdes y el canal del valle del Nilo (abajo a la derecha)
  for (let y = 150; y < 180; y++) for (let x = 196; x < 320; x++) { if (y - 150 < (x - 196) * 0.25) continue; const cx = Math.floor((x - 196) / 14), cy = Math.floor((y - 150) / 9); const P = [H('#2e6a2a #3a7e32 #4a923a'), H('#5a8a2a #6e9e34 #82b23e'), H('#3a5a24 #4a6e2c #5a8236')][(cx + cy * 2) % 3]; R.pset(x, y, (x - 196) % 14 === 0 || (y - 150) % 9 === 0 ? hex('#5a4a2a') : tono(P, 1 + (y % 2) * 0.6 + (h(x >> 1, y, 4) - 0.5), x, y)); }
  for (let x = 196; x < 320; x++) { const y = Math.round(160 + (x - 196) * 0.05 + Math.sin(x * 0.1) * 1.5); R.pset(x, y, hex('#2a5a9a')); R.pset(x, y + 1, hex('#3a7ab8')); }
  // el pueblo al pie de la meseta: manzanas de azoteas con sombras, depósitos, árboles
  for (let by = 52; by < 180; by += 9) for (let bx = 266; bx < 320; bx += 10) {
    if (by > 150 && bx < 290) continue;
    for (let k = 0; k < 4; k++) { const x0 = bx + (k % 2) * 4, y0 = by + Math.floor(k / 2) * 3, roof = H('#c8b8a0 #b0a088 #d8ccb4 #a89070 #e0d0b8')[Math.floor(h(bx + k, by, 3) * 5)];
      R.rect(x0, y0, x0 + 3, y0 + 2, roof); R.rect(x0, y0 + 3, x0 + 3, y0 + 3, hex('#5a4a38')); if (h(x0, y0, 4) > 0.6) R.pset(x0 + 1, y0 + 1, hex('#3a3a46')); }
    if (h(bx, by, 5) > 0.7) { R.disco(bx + 8, by + 2, 1, hex('#3a6a2a')); R.pset(bx + 8, by + 1, hex('#5a8a3a')); }
    R.rect(bx - 1, by, bx - 1, by + 8, hex('#8a7a66')); R.rect(bx - 1, by + 8, bx + 9, by + 8, hex('#8a7a66'));
  }
  // la carretera con su borde, el aparcamiento con autobuses
  for (let i = 1; i < RUTA.length; i++) { const [a, b] = RUTA[i - 1], [c2, d2] = RUTA[i]; for (let o = -2; o <= 2; o++) R.linea(a, b + o, c2, d2 + o, Math.abs(o) === 2 ? hex('#8a8070') : hex('#5a5658')); R.linea(a, b, c2, d2, hex('#6e6a68'), 4); }
  caja(244, 122, 272, 132, (x, y) => ((x + y) % 5 === 0 ? hex('#8a8680') : hex('#6e6a68')));
  for (let k = 0; k < 5; k++) { const x = 246 + k * 5; R.rect(x, 124, x + 3, 130, K); R.rect(x, 124, x + 2, 129, H('#f4f0e6 #e8c040 #d84a3a #f4f0e6 #3a8ac8')[k]); R.pset(x + 1, 126, hex('#8a8a96')); }
  // las mastabas en filas (al oeste y al este de Keops)
  for (const [x0, y0, x1, y1] of [[150, 26, 182, 54], [240, 30, 262, 90]]) for (let y = y0; y < y1; y += 6) for (let x = x0; x < x1; x += 8) { if (!libre(x, y)) continue; R.rect(x, y, x + 5, y + 3, hex('#8a7254')); R.rect(x, y, x + 5, y + 2, hex('#cbb38a')); R.pset(x + 2, y + 1, hex('#e0cca4')); }
  // la calzada de Kefrén a la Esfinge, el recinto de la Esfinge y el templo del valle
  R.linea(172, 102, 228, 112, hex('#e8d4a4')); R.linea(172, 103, 228, 113, hex('#a88a5e'));
  caja(226, 104, 248, 120, (x, y) => tono(CAL, 1.2 + (h(x, y, 8) - 0.5) * 0.8, x, y));
  for (let i = 0; i < 14; i++) for (let j = -2; j <= 2; j++) R.pset(230 + i, 112 + j, tono(PIR, 3 - Math.abs(j) * 0.5 + (i > 10 ? 0.8 : 0), 230 + i, 112 + j));
  R.rect(242, 110, 244, 114, hex('#e4cc9a')); R.pset(243, 112, hex('#4a3820'));
  caja(250, 106, 260, 118, (x, y) => tono(CAL, 2 + ((x + y) % 3 === 0 ? -0.6 : 0), x, y));
  // las pirámides (de arriba: cuatro caras, hiladas, aristas) con sus reinas
  pirTop(...KH); pirTop(KF[0], KF[1], KF[2], 5); pirTop(...MK);
  for (const [x, y] of [[238, 50], [238, 62], [238, 74]]) pirTop(x, y, 4);
  for (const [x, y] of [[90, 158], [102, 158], [114, 158]]) pirTop(x, y, 3);
});
// la misma vista como imagen de radar: grises con grano (las caras que miran al satélite, claras)
const G6 = H('#0e1012 #2e3236 #565a5e #868a8e #babec2 #eef2f4');
const mapaRadar = () => fijo('radar', () => { const D = mapaDia(); for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const c = D[y * 320 + x], l = ((c & 255) * 0.3 + ((c >>> 8) & 255) * 0.59 + ((c >>> 16) & 255) * 0.11) / 255; R.pset(x, y, tono(G6, l * 7.2 - 1.8 + (h(x, y, 11) - 0.5) * 1.7, x, y)); } });
const mapaNoche = () => fijo('noche', () => {
  const D = mapaDia();
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, mez(D[y * 320 + x], hex('#0a1430'), 0.74));
  for (let by = 52; by < 180; by += 3) for (let bx = 266; bx < 320; bx += 2) if (h(bx, by, 21) > 0.82 && !(by > 150 && bx < 290)) R.pset(bx, by, h(bx, by, 22) > 0.5 ? hex('#ffd870') : hex('#ffb040'));
  for (let i = 1; i < RUTA.length; i++) { const [a, b] = RUTA[i - 1], [c2, d2] = RUTA[i], n = Math.hypot(c2 - a, d2 - b); for (let s = 0; s < n; s += 7) { const x = Math.round(lerp(a, c2, s / n)), y = Math.round(lerp(b, d2, s / n)) - 3; if (libre(x, y)) R.pset(x, y, hex('#ffe8a0')); } }
  for (const [x, y, c] of [[236, 104, '#5ad8f0'], [246, 120, '#e84aa8'], [226, 120, '#ffd060']]) { R.pset(x, y, hex(c)); R.pset(x + 1, y, hex(c)); }
});
// una nube vista desde arriba: el cuerpo en tres tonos y su sombra en el suelo
const NUBEA = [[0, 0, 13], [-12, 3, 9], [12, 2, 10], [-4, -6, 8], [6, 7, 8]];
const nubeArriba = (cx, cy, xs, t) => {
  for (const [dx, dy, r] of NUBEA) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { if (i * i + j * j > r * r) continue; const x = Math.round(cx + dx + i + 8), y = Math.round(cy + dy + j + 10); if (x >= xs && libre(x, y) && x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, mez(R.pget(x, y), hex('#2a2018'), 0.4)); }
  for (const [dx, dy, r] of NUBEA) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) {
    const d = Math.hypot(i, j) / r; if (d > 1) continue; const x = Math.round(cx + dx + i), y = Math.round(cy + dy + j);
    if (!libre(x, y)) continue;
    if (x < xs) { if (d > 0.88 && (x + y) % 2 === 0) R.pset(x, y, hex('#d8f4ff')); continue; }   // el radar la atraviesa: solo el contorno
    R.pset(x, y, tono(H('#a8b4c8 #d0d8e6 #eef2f8 #ffffff'), 2.6 - d * 1.6 - (j + i * 0.3) / r * 0.8 + (h(x >> 1, y >> 1, 3) - 0.5) * 0.5, x, y));
  }
};
const p2 = (t) => {
  const D = mapaDia(), RD = mapaRadar(), N = mapaNoche(), B = R.buf;
  const nt = tramo(t, NOCHE - 0.3, NOCHE + 0.2) * (1 - tramo(t, CLARO, CLARO + 0.5));
  const xs = Math.round(lerp(-6, 326, tramo(t, P2 + 0.3, P3 - 0.35)));
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const i = y * 320 + x;
    B[i] = x < xs ? RD[i] : nt <= 0 ? D[i] : nt >= 1 ? N[i] : mez(D[i], N[i], nt);
  }
  // autobuses y coches por la carretera (de noche, con faros); la caravana de camellos; un milano que planea
  for (let k = 0; k < 4; k++) {
    const [x, y, d] = enRuta(t * 0.03 + k * 0.27), bx = Math.round(x), by = Math.round(y) - 1;
    if (bx < xs + 2 || !libre(bx, by)) continue;
    const bus = k % 2 === 0;
    R.rect(bx - 3, by - 1, bx + (bus ? 4 : 2), by + 2, K); R.rect(bx - 2, by, bx + (bus ? 3 : 1), by + 1, bus ? hex('#f4f0e6') : hex('#d84a3a'));
    if (nt > 0.5) { R.pset(bx + (d > 0 ? 5 : -4), by, hex('#fff4b0')); R.pset(bx + (d > 0 ? 6 : -5), by, hex('#ffe890')); }
  }
  for (let k = 0; k < 5; k++) { const x = Math.round(64 + t * 2.2 - k * 6), y = Math.round(154 - k * 1.2 - t * 0.4); if (x > xs + 1 && libre(x, y)) { R.pset(x + 1, y + 2, mez(R.pget(x + 1, y + 2), K, 0.5)); R.rect(x, y, x + 2, y, nt > 0.5 ? hex('#5a4a3a') : hex('#8a5a2a')); R.pset(x + 2, y - 1, hex('#6a4220')); } }
  { const a = t * 0.6, x = Math.round(120 + Math.cos(a) * 30), y = Math.round(70 + Math.sin(a) * 14); if (x > xs && libre(x, y)) { const b = Math.sin(t * 8) > 0 ? 1 : 0; R.linea(x - 3, y + b, x + 3, y + b, hex('#4a3a2a')); R.pset(x, y - 1, hex('#4a3a2a')); R.pset(x, y + 1, hex('#4a3a2a')); } }
  // las nubes (en «clouds») que cruzan; del lado del radar solo queda su contorno
  const nu = tramo(t, NUBES - 0.5, P3);
  if (nu > 0 && nu < 1) for (const [x0, y0, v] of [[-40, 60, 1], [-110, 120, 0.9], [-20, 150, 1.1], [-160, 40, 1]]) nubeArriba(x0 + nu * 360 * v, y0, xs, t);
  // la línea de barrido del radar con su halo
  if (xs > -4 && xs < 324) for (let y = 28; y < 180; y++) { if (!libre(xs, y)) continue; R.pset(xs, y, hex('#c8fbff')); R.pset(xs - 1, y, hex('#5ae0f0')); if (libre(xs - 2, y)) R.pset(xs - 2, y, mez(R.pget(xs - 2, y), hex('#5ae0f0'), 0.5)); if (y % 6 === 0) { R.pset(xs + 1, y, hex('#5ae0f0')); R.pset(xs + 2, y, hex('#2a8ab6')); } }
};

// ── 3 · la órbita: ondas, eco y la trompetilla ──
const p3 = (t) => {
  const o = { encuadre: 'orbita', satX: Math.round(lerp(132, 112, ease(tramo(t, P3, P3 + 2.4)))), ondas: tramo(t, ENVIA, ABAJO), trompetilla: ease(tramo(t, ESCUCHA - 0.1, ESCUCHA + 0.5)) };
  const r = T.hoy(R, t, o);
  // el eco que entra en la trompetilla: un anillo ámbar que se cierra en la boca y el «!» de que lo ha oído
  if (r.boca && t > ECO) { const f = ((t - ECO) * 1.6) % 1, [bx, by] = r.boca; R.anillo(Math.round(bx), Math.round(by), Math.round(10 - f * 8), f < 0.5 ? hex('#ffd060') : hex('#f0a030'), 2); }
  const ex = tramo(t, VUELVE - 0.2, VUELVE + 0.1) * (1 - tramo(t, E.duracion - 0.5, E.duracion));
  if (ex > 0 && r.satelite) R.icono('!', Math.round(r.satelite[0] + 30), Math.round(r.satelite[1] - 8 - ex * 4), hex('#ffe890'), K, 2);
};

const efectos = [[0.6, 'interruptor'], [SAT, 'bip'], [RADAR, 'zumbido'], [P2 + 0.35, 'maquina'], [NOCHE, 'tic'], [NUBES, 'viento'], [ENVIA, 'bip'], [ESCUCHA, 'boing'], [ECO + 0.1, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2025 });
''')

E['gz-vibra'] = ('Vibra', '''// GZ-VIBRA (frase 9), 2025, sin cartela. El truco de Biondi: no es que el radar atraviese la roca, es que la pirámide
// vibra. Cuatro planos:
// 1. (0 → «It's») LOCAL plano azul (lo que dice Biondi): la cara de Kefrén de cerca, en corte, cruza el cuadro en
//    diagonal; Biondi entra por la derecha de la tarima; el satélite manda pulsos que chocan con la cara y vuelven; en «isn't… goes through» una flecha punteada intenta entrar en la roca y le sale
//    una X; en «rock» las aristas empiezan a temblar.
// 2. («It's» → «His») A giza/meseta de día (o.vibra): en «vibrates» Kefrén tiembla un poco (rayitas a los lados); el
//    turista hace una foto en «tiny bit»; en «wind» una racha le arranca el sombrero a la turista y lo lleva por la
//    arena; en «tremors» tiembla el suelo, saltan piedrecitas y los tres dan un respingo; el camellero llega y se para.
// 3. («His» → pausa tras «inside») LOCAL plano azul: Biondi con su portátil; Kefrén pequeña con anillos de vibración;
//    las ondas viajan a un monitor de trazas; en «read those vibrations» se encienden los picos y en «what's inside»
//    salen dentro las manchas magenta y una tomografía se rellena en el monitor.
// 4. (pausa → fin) F hoy/estudio (gag 4, sin Atom de personaje): una mano canónica con un mazo de goma sube desde abajo
//    y da golpecitos en la pared (macizo) y luego en la puerta empapelada; en «hollow» suena hueco, la puerta se abre
//    y dentro está el armario con la ropa que se mece; la mano se retira y sale volando un calcetín.''', AZUL + COMUN + r'''
const va = (f) => en('vibra', f);
const P2 = va(0.245), P3 = va(0.5843), P4 = va(0.818);
const BIONDI = va(0.056), NO = va(0.1106), ATRAVIESA = va(0.1596), ROCA = va(0.203);
const VIBRA = va(0.2953), POCO = va(0.343), VIENTO = va(0.4595), TEMBLOR = va(0.538);
const LEE = va(0.657), VIBRACIONES = va(0.688), DENTRO = va(0.769);
const GOLPEA = va(0.8465), PARED = va(0.8887), HUECO = va(0.9457);
const ROJO = hex('#ff5a6a');

// ── 1 · plano azul: el radar no atraviesa la roca, rebota (la cara de Kefrén de cerca, en corte) ──
// la ladera de la cara cruza el cuadro en diagonal: la roca abajo a la derecha con sus hiladas y sillares escalonados
const LA = [24, 146], LB = [268, 50], yLad = (x) => LA[1] + (x - LA[0]) * (LB[1] - LA[1]) / (LB[0] - LA[0]);
const sateliteAzul = (P, x, y) => {
  P.caja(x - 6, y - 5, x + 6, y + 5, 'c'); P.l(x - 3, y - 2, x + 3, y - 2, 'd'); P.l(x - 3, y + 1, x + 3, y + 1, 'd');
  for (const s of [-1, 1]) { const a = x + s * 8, b = x + s * 26; P.l(x + s * 6, y, a, y, 'd'); P.caja(Math.min(a, b), y - 4, Math.max(a, b), y + 4, 'c'); for (let k = 1; k < 4; k++) P.l(Math.min(a, b) + k * 4.5, y - 3, Math.min(a, b) + k * 4.5, y + 3, 'D'); }
  P.l(x, y + 5, x, y + 9, 'c'); P.l(x - 4, y + 9, x + 4, y + 9, 'b');
};
const p1 = (t) => {
  fondoAzul('vib1', true);
  const P = pluma();
  // la roca (tramada como en el decorado) bajo la ladera y hasta el corte vertical de la derecha
  R.poligono([LA, LB, [LB[0], 146], [LA[0], 146]], (x, y) => ((x + y) % 4 === 0 ? PZ.hal : (x * 5 + y * 3) % 11 === 0 ? PZ.f4 : PZ.f3));
  // hiladas horizontales y juntas de sillares a tresbolillo; los escalones del núcleo bajo el revestimiento
  for (let y = 54; y < 146; y += 8) { const x0 = LA[0] + (y - LA[1]) * (LB[0] - LA[0]) / (LB[1] - LA[1]); P.l(x0 + 6, y, LB[0] - 2, y, 'D');
    for (let x = Math.ceil(x0) + 8 + ((y / 8) % 2) * 9; x < LB[0] - 4; x += 18) P.l(x, y + 1, x, y + 7, 'D', 2);
    P.l(x0 + 2, y, x0 + 6, y, 'd'); P.l(x0 + 6, y, x0 + 6, y + 8, 'd'); }
  const tb = tramo(t, ROCA - 0.2, ROCA + 0.4), dx = tb > 0 ? Math.round(Math.sin(t * 38) * tb) : 0;
  P.l(LA[0] + dx, LA[1], LB[0] + dx, LB[1], 'c'); P.l(LA[0] - 3 + dx, LA[1] - 2, LB[0] - 3 + dx, LB[1] - 2, 'd', 3);
  P.l(LB[0], LB[1], LB[0], 146, 'd', 2); P.l(14, 146, 300, 146, 'c');
  if (tb > 0) for (let k = 0; k < 9; k++) { const x = LA[0] + 20 + k * 26, y = yLad(x), s = Math.sin(t * 30 + k) > 0; P.p(x - 2, Math.round(y) - 4 - (s ? 1 : 0), 'b'); P.p(x + 2, Math.round(y) - 5 - (s ? 0 : 1), 'b'); }
  // el satélite arriba a la izquierda y los pulsos que bajan, chocan con la cara y vuelven (eco)
  const S = [68, 40], I = [150, Math.round(yLad(150))];
  sateliteAzul(P, S[0], S[1]);
  if (t > 0.6) {
    const dxx = I[0] - S[0], dyy = I[1] - (S[1] + 10), L = Math.hypot(dxx, dyy), ux = dxx / L, uy = dyy / L;
    for (let k = 0; k < 3; k++) {
      const f = ((t - 0.6) * 0.75 + k / 3) % 1;
      for (const [pos, kk] of [[f, 'c'], [1 - ((f + 0.5) % 1), 'b']]) { const cx = S[0] + dxx * pos, cy = S[1] + 10 + dyy * pos, r = 4 + pos * 7, sg = kk === 'c' ? 1 : -1;
        for (let a = -1; a <= 1; a += 0.22) P.p(Math.round(cx - ux * r * sg * (1 - Math.cos(a)) - uy * r * Math.sin(a)), Math.round(cy - uy * r * sg * (1 - Math.cos(a)) + ux * r * Math.sin(a)), kk); }
    }
    const ch = (t * 3) % 1; for (let a = 0; a < 6.28; a += 0.7) P.p(Math.round(I[0] + Math.cos(a) * (2 + ch * 5)), Math.round(I[1] + Math.sin(a) * (2 + ch * 5)), ch < 0.5 ? 'b' : 'c');
  }
  // «isn't… goes through»: la flecha punteada que intenta entrar en la roca, y su X justo bajo la superficie
  const fl = tramo(t, NO, ATRAVIESA + 0.3);
  if (fl > 0) { P.parte(I[0] + 2, I[1] + 3, 176, 118, fl, 'm', 3); if (fl >= 1) P.flecha(176, 118, 1, 0, 'm'); }
  P.pintar(t);
  const xx = tramo(t, ATRAVIESA + 0.25, ATRAVIESA + 0.45);
  if (xx > 0) { const s = 2 + (xx < 1 ? 1 : 0); R.icono('X', 168 - s * 2, 108 - s * 2, ROJO, PZ.f0, s); }
  // Biondi entra por la derecha de la tarima y lo explica señalando la cara
  const u = ease(tramo(t, 0, 1.3)), bx = Math.round(lerp(330, 238, u));
  R.actor(EL.biondi, bx, 172, t, { dir: -1, anda: u > 0 && u < 1, dedo: t > BIONDI + 0.3 && t < ROCA + 0.5, habla: t > 1.3 && Math.sin(t * 7) > 0, sonrisa: t > ROCA + 0.5 });
  senal(t); holo(t, 171);
};

// ── 2 · la meseta de día: Kefrén vibra con el viento y los temblores ──
const sombrero = (x, y, giro) => {
  x = Math.round(x); y = Math.round(y); const w = Math.round(6 * Math.abs(Math.cos(giro))) + 1;
  R.rect(x - w - 1, y, x + w + 1, y + 2, K); R.rect(x - w, y + 1, x + w, y + 1, hex('#e8c87a'));
  R.rect(x - 3, y - 3, x + 3, y, K); R.rect(x - 2, y - 2, x + 2, y, hex('#f0d890')); R.rect(x - 2, y - 1, x + 2, y - 1, hex('#c83a3a'));
};
const p2 = (t) => {
  const vb = Math.max(0, Math.min(1, 0.4 * tramo(t, VIBRA - 0.2, VIBRA + 0.3) + 0.6 * tramo(t, TEMBLOR - 0.25, TEMBLOR + 0.15) - 0.55 * tramo(t, TEMBLOR + 0.7, P3)));
  const o = { encuadre: 'meseta', hora: 'dia', vibra: vb };
  T.giza(R, t, o);
  // las rayitas de vibración a los lados de Kefrén
  if (vb > 0.12) { const fa = Math.floor(t * 12) % 2; for (const [x, y, s] of [[110, 58, -1], [102, 72, -1], [94, 86, -1], [192, 58, 1], [200, 72, 1], [208, 86, 1]]) for (let a = 0; a < 2; a++) { const xx = x + s * (a * 4 + fa); for (let j = -3; j <= 3; j++) { const px = xx + s * Math.round(Math.cos(j / 3 * 1.2) * 2); R.pset(px + s, y + j + 1, hex('#a88a5e')); R.pset(px, y + j, hex('#fffaf0')); } } }
  // el viento en «wind»: rachas de arena
  T.viento(R, t, { y0: 140, y1: 168, fuerza: 0.4 + 1.4 * tramo(t, VIENTO - 0.2, VIENTO + 0.3) * (1 - tramo(t, VIENTO + 1.4, VIENTO + 2.2)), color: hex('#f0dcac') });
  // en «tremors», el suelo: salto y piedrecitas que botan
  const sal = t > TEMBLOR && t < TEMBLOR + 0.7 ? Math.round(Math.abs(Math.sin((t - TEMBLOR) * 18)) * 2) : 0;
  if (sal) for (let k = 0; k < 8; k++) { const x = 20 + k * 37, y = 164 - Math.round(Math.abs(Math.sin((t - TEMBLOR) * 14 + k)) * 4); R.pset(x, y, hex('#8a6a3e')); R.pset(x + 1, y, hex('#b8965e')); }
  // el camellero llega por la izquierda y se para a mirar
  const cu = tramo(t, P2, P2 + 2.4), cx = Math.round(lerp(-16, 50, cu));
  R.actor(EL.camellero, cx, 162, t, { dir: 1, anda: cu > 0 && cu < 1, salto: sal, sorpresa: sal > 0 || (t > TEMBLOR && t < TEMBLOR + 1) });
  // el turista hace la foto en «tiny bit»
  const t1 = R.actor(EL.turista1, 212, 163, t, { dir: -1, sostiene: true, salto: sal, sorpresa: t > TEMBLOR && t < TEMBLOR + 1 });
  { const [mx, my] = t1.mano; R.rect(mx - 6, my - 3, mx + 1, my + 2, K); R.rect(mx - 5, my - 2, mx, my + 1, hex('#3a3a46')); R.pset(mx - 6, my - 1, hex('#8ab8ff')); R.pset(mx - 2, my - 3, hex('#c8ccd8'));
    if (t > POCO && t < POCO + 0.18) { for (const [a, b] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) for (let k = 1; k < 7; k++) R.pset(mx - 7 + a * k, my - 1 + b * k, W); R.disco(mx - 7, my - 1, 2, W); } }
  // la turista: en «wind» se le vuela el sombrero, que rueda por la arena hacia la izquierda
  const t2 = R.actor(EL.turista2, 246, 164, t, { dir: -1, salto: sal, sorpresa: (t > VIENTO && t < VIENTO + 1.2) || (t > TEMBLOR && t < TEMBLOR + 1), dedo: t > VIENTO + 1.2 && t < TEMBLOR - 0.2 });
  const [hx, hy] = t2.cabeza, vu = t - VIENTO;
  if (vu < 0) sombrero(hx, hy - 1, 0);
  else if (vu < 4) sombrero(hx - vu * 64, Math.min(150, hy - 1 - Math.sin(Math.min(vu, 1) * Math.PI) * 18 + vu * 6) + (vu > 1 ? Math.abs(Math.sin(vu * 6)) * -3 : 0), vu * 9);
  T.gizaDelante(R, t, o);
  // el temblor sacude el cuadro un píxel
  if (sal) { const B = R.buf, d = Math.floor(t * 30) % 2 ? 1 : -1; for (let y = 0; y < 180; y++) { const r = y * 320; if (d > 0) B.copyWithin(r + 1, r, r + 319); else B.copyWithin(r, r + 1, r + 320); } }
};

// ── 3 · plano azul: leer las vibraciones para ver lo de dentro ──
const QS = { ax: 112, ay: 54, yb: 132, hw: 50 };
const p3 = (t) => {
  fondoAzul('vib3', true);
  const P = pluma(), xl = (y, e = 1) => QS.ax - (y - QS.ay) / (QS.yb - QS.ay) * QS.hw * e, xr = (y, e = 1) => QS.ax + (y - QS.ay) / (QS.yb - QS.ay) * QS.hw * e;
  R.poligono([[QS.ax, QS.ay], [xr(QS.yb), QS.yb], [xl(QS.yb), QS.yb]], (x, y) => ((x + y) % 4 === 0 ? PZ.hal : (x * 5 + y * 3) % 11 === 0 ? PZ.f4 : PZ.f3));
  for (let y = QS.ay + 3; y < QS.yb; y++) for (let x = Math.ceil(xl(y)) + 1; x < xr(y); x++) if ((x + y) % 7 === 0 && h(x >> 2, y >> 2, 6) > 0.35) R.pset(x, y, PZ.rjM);
  P.l(xl(QS.yb), QS.yb, QS.ax, QS.ay, 'c'); P.l(QS.ax, QS.ay, xr(QS.yb), QS.yb, 'c'); P.l(14, QS.yb, 176, QS.yb, 'c');
  for (let y = QS.ay + 9; y < QS.yb; y += 9) P.l(xl(y) + 2, y, xr(y) - 2, y, 'D', 4);
  // los anillos de vibración alrededor de la pirámide (el contorno que late hacia fuera)
  for (let k = 0; k < 3; k++) { const f = (t * 0.9 + k / 3) % 1, e = 8 + f * 22, cy = QS.yb;
    if (f > 0.85) continue;
    P.l(xl(cy) - e, cy, QS.ax, QS.ay - e * 1.2, f < 0.5 ? 'd' : 'D', 3); P.l(QS.ax, QS.ay - e * 1.2, xr(cy) + e, cy, f < 0.5 ? 'd' : 'D', 3); }
  // las tres ondas que viajan al monitor
  for (let k = 0; k < 3; k++) { const y0 = 72 + k * 16; let py = y0;
    for (let x = Math.round(xr(y0)) + 4; x < 184; x++) { const y = Math.round(y0 + Math.sin(x * 0.45 - t * 9 + k) * (1.5 + k * 0.5)); if (x % 2 === 0) P.l(x - 1, py, x, y, k === 1 ? 'b' : 'c'); py = y; } }
  // el monitor de trazas, con sus filas que corren y los picos que se encienden en «read those vibrations»
  P.caja(184, 32, 270, 126, 'c'); P.caja(186, 34, 268, 124, 'D');
  const pico = tramo(t, VIBRACIONES - 0.2, VIBRACIONES + 0.4);
  for (let r = 0; r < 5; r++) { const y0 = 42 + r * 11; let py = y0;
    for (let x = 190; x < 266; x++) { const ph = x * 0.6 + t * 10 + r * 2, env = 0.6 + 2.4 * Math.max(0, Math.sin((x - 190) * 0.09 - t * 1.5 + r)) ** 3, y = Math.round(y0 + Math.sin(ph) * env * (0.5 + 0.5 * tramo(t, LEE - 0.3, LEE + 0.3)));
      P.l(x - 1, py, x, y, pico > 0 && env > 2 ? 'b' : r % 2 ? 'd' : 'c'); py = y; } }
  // en «what's inside»: la tomografía que se rellena abajo en el monitor y las manchas magenta dentro de la pirámide
  const den = tramo(t, DENTRO - 0.3, DENTRO + 0.6);
  P.l(188, 98, 266, 98, 'D');
  for (let j = 0; j < 6; j++) for (let i = 0; i <= j * 2; i++) { const k = j * j + i, cx = 227 - j * 4 + i * 4, cy = 100 + j * 4; if (k / 36 > den) continue; const mg = (j === 3 && i === 3) || (j === 4 && i === 6) || (j === 5 && i === 2);
    R.rect(cx, cy, cx + 2, cy + 2, mg ? PZ.mg : (i + j) % 2 ? PZ.co : PZ.hal2); }
  if (den > 0) for (const [x0, y0, x1, y1] of [[100, 96, 112, 102], [118, 110, 128, 115], [96, 120, 104, 125]]) { const m = Math.min(1, den * 1.5); if (m <= 0) continue;
    R.poligono([[x0, y0], [x1 + 1, y0], [x1 + 1, y1 + 1], [x0, y1 + 1]], (x, y) => ((x + y) % 2 ? PZ.mgH : PZ.f2)); P.caja(x0, y0, x1, y1, 'm');
    if (den < 1) { const r = 3 + den * 10; for (let a = 0; a < 6.28; a += 0.35) P.p(Math.round((x0 + x1) / 2 + Math.cos(a) * r), Math.round((y0 + y1) / 2 + Math.sin(a) * r * 0.7), 'm'); } }
  P.pintar(t);
  // Biondi a la izquierda con su portátil: teclea, lo cuenta y sonríe al ver lo de dentro
  const b = R.actor(EL.biondi, 22, 172, t, { dir: 1, sostiene: true, habla: t > LEE - 0.4 && t < DENTRO && Math.sin(t * 7) > 0, sonrisa: t > DENTRO });
  portatil(b);
  if (t > DENTRO + 0.2 && Math.floor(t * 4) % 2) R.icono('!', 34, 128, PZ.br, PZ.f0, 1);
  senal(t); holo(t, 171);
};

// ── 4 · el estudio: los golpecitos en la pared y el armario (gag 4) ──
const K1 = [104, 118], K2 = [124, 112], K3 = [132, 104];
const golpes = [[GOLPEA, K1], [GOLPEA + 0.4, K1], [PARED + 0.25, K2], [HUECO, K3]];
const mazo = (gx, gy, hx, hy) => {
  // el mango de madera (de la mano G a la cabeza Hd), con su luz, y la cabeza de goma roja de lado
  const dx = hx - gx, dy = hy - gy, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  for (let s = -1.5; s <= 1.5; s += 0.5) R.linea(Math.round(gx - ux * 5 + nx * s), Math.round(gy - uy * 5 + ny * s), Math.round(hx + nx * s), Math.round(hy + ny * s), Math.abs(s) > 1 ? K : s < 0 ? hex('#e0b070') : hex('#9a6a32'));
  const pts = [[-7, -4], [7, -4], [7, 4], [-7, 4]].map(([a, b]) => [hx + nx * a + ux * b, hy + ny * a + uy * b]);
  R.poligono(pts.map(([x, y]) => [Math.round(x), Math.round(y)]), (x, y) => { const s = (x - hx) * ux + (y - hy) * uy; return s < -2 ? hex('#e86a5a') : s > 2 ? hex('#8a1e26') : hex('#c8303a'); });
  for (let i = 0; i < 4; i++) R.linea(Math.round(pts[i][0]), Math.round(pts[i][1]), Math.round(pts[(i + 1) % 4][0]), Math.round(pts[(i + 1) % 4][1]), K);
  for (const sg of [-1, 1]) R.linea(Math.round(hx + nx * 7 * sg - ux * 3), Math.round(hy + ny * 7 * sg - uy * 3), Math.round(hx + nx * 7 * sg + ux * 3), Math.round(hy + ny * 7 * sg + uy * 3), hex('#5a141a'));
};
const calcetin = (x, y, g) => { x = Math.round(x); y = Math.round(y); const d = g ? -1 : 1;
  R.rect(x - 3, y - 10, x + 3, y + 1, K); R.rect(x - 2, y - 9, x + 2, y, W); for (const j of [-8, -5, -2]) R.rect(x - 2, y + j, x + 2, y + j, hex('#c83a3a')); R.rect(x - 2, y - 9, x + 2, y - 9, hex('#3a6ad8'));
  const x2 = Math.min(x + d, x + d * 7), x3 = Math.max(x + d, x + d * 7); R.rect(x2, y - 3, x3, y + 2, K); R.rect(x2 + 1, y - 2, x3 - 1, y + 1, W); R.rect(x2 + (d > 0 ? 3 : 1), y - 2, x3 - (d > 0 ? 1 : 3), y + 1, hex('#c83a3a')); };
const p4 = (t) => {
  const abre = ease(tramo(t, HUECO + 0.12, HUECO + 0.6)), o = { encuadre: 'estudio', armario: abre };
  T.hoy(R, t, o); T.hoyDelante(R, t, o);
  // dónde golpea la cabeza del mazo y cuánto está echada hacia atrás
  let W0 = K1; if (t > GOLPEA + 0.55) W0 = [lerp(K1[0], K2[0], ease(tramo(t, GOLPEA + 0.55, PARED))), lerp(K1[1], K2[1], ease(tramo(t, GOLPEA + 0.55, PARED)))];
  if (t > PARED + 0.4) W0 = [lerp(K2[0], K3[0], ease(tramo(t, PARED + 0.4, HUECO - 0.35))), lerp(K2[1], K3[1], ease(tramo(t, PARED + 0.4, HUECO - 0.35)))];
  let atras = 0.25; for (const [tk] of golpes) { const d = Math.abs(t - (tk - 0.14)); if (t < tk + 0.05 && t > tk - 0.3) atras = Math.max(0, Math.min(1, 1 - d / 0.14)); if (t >= tk && t < tk + 0.05) atras = 0; }
  const sube = 1 - ease(tramo(t, P4, P4 + 0.4)), baja = ease(tramo(t, HUECO + 0.1, HUECO + 0.45)), dy = Math.round((sube + baja) * 80);
  const hd = [W0[0] + 5 + atras * 7, W0[1] - 1 - atras * 2 + dy], g = [W0[0] + 22 + atras * 6, W0[1] + 26 + dy];
  // los golpes: polvo en la pared maciza; en la puerta, en «hollow», los anillos de hueco
  for (const [tk, k] of golpes) { const u = (t - tk) / 0.5; if (u > 0 && u < 1) { if (k === K3) { for (let q = 0; q < 3; q++) { const r = Math.round(3 + (u + q * 0.3) * 14); if ((u + q * 0.3) < 1) { R.anillo(k[0], k[1], r, hex('#5a3a1a')); R.anillo(k[0], k[1], r + 1, q % 2 ? hex('#ffe890') : W); } } } else for (let q = 0; q < 4; q++) R.pset(k[0] - 1 - q, Math.round(k[1] - 2 + q * 2 + u * 10), hex('#d8c8a0')); } }
  if (dy < 70) { mazo(g[0], g[1], hd[0], hd[1]); T.brazo(R, g[0] + 34, g[1] + 62, g[0] + 6, g[1] + 2, '#3a5a8a', -1, { codo: [g[0] + 30, g[1] + 32] }); }
  // el calcetín que sale volando del armario abierto y cae al suelo
  const cu = tramo(t, HUECO + 0.45, HUECO + 1.2);
  if (cu > 0) calcetin(lerp(140, 98, cu), cu < 1 ? 92 - Math.sin(cu * Math.PI) * 26 + cu * 66 : 158 - Math.abs(Math.sin((t - HUECO - 1.2) * 9)) * 3 * Math.max(0, 1 - (t - HUECO - 1.2) * 2), cu > 0.5);
};

const efectos = [[0.7, 'bip'], [ATRAVIESA + 0.25, 'aviso'], [POCO, 'flash'], [VIENTO, 'rafaga'], [TEMBLOR, 'boom'], [LEE, 'bip'], [DENTRO, 'brillo'],
  [GOLPEA, 'toc'], [GOLPEA + 0.4, 'toc'], [PARED + 0.25, 'golpecito'], [HUECO, 'golpecito'], [HUECO + 0.15, 'puerta'], [HUECO + 1.2, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2025 });
''')
E['gz-articulo'] = ('El artículo de 2022', '''// GZ-ARTICULO (frase 10), 2022, sin cartela. El precedente: el artículo de 2022 sobre Keops. Cuatro planos:
// 1. (0 → «published») LOCAL el laboratorio de radar en Italia: muro de pantallas (radar con grano, trazas, la órbita,
//    el espectro), ventana a las colinas con cipreses, consola; Biondi trabaja tras la consola; Malanga entra por la
//    puerta con unos papeles; en «2022» el calendario de la pared pasa la hoja de 2021 a 2022; en «Malanga» levanta los
//    papeles y Biondi sonríe.
// 2. («published» → pausa tras «Khufu») LOCAL la revista en la mesa del laboratorio: una mano la pone en su atril
//    (portada sin letras: banda azul, «2022», la pirámide en plano azul); en «peer-reviewed» llegan volando tres notas de
//    revisión con su visto verde; en «same method» el portátil enseña el satélite y sus ondas; en «Great Pyramid» la
//    imagen de la portada se enciende con un barrido.
// 3. (pausa → pausa tras «discovered») C plano/keops/general: en «known chambers» se marcan en blanco la Cámara del Rey,
//    la de la Reina y la Gran Galería; en «others nobody had discovered» se encienden una a una las salas y pozos
//    magenta; Malanga las señala y Biondi, con el portátil, asiente.
// 4. (pausa → fin) LOCAL el claustro de la universidad: Malanga clava la portada en el tablón en «proof»; en «method
//    worked» Biondi lo celebra con un salto; una estudiante se para y aplaude, otro pasa con sus libros y una paloma
//    echa a volar; en el silencio del final, siguen su camino.''', AZUL + COMUN + r'''
const ar = (f) => en('articulo', f);
const P2 = ar(0.2512), P3 = ar(0.6037), P4 = ar(0.8598);
const ANO = ar(0.0927), BIONDI = ar(0.161), MALANGA = ar(0.218), PARES = ar(0.294), PAPER = ar(0.3576), METODO = ar(0.434), GRAN = ar(0.496), KEOPS = ar(0.5585);
const CONOCIDAS = ar(0.6738), OTRAS = ar(0.7494), DESCUB = ar(0.8299), PRUEBA = ar(0.9098), FUNCIONA = ar(0.9488);
const AZULR = hex('#1e4a8a'), ORO2 = hex('#e8c040'), PAPEL = hex('#f4f0e6');

// la portada de la revista de 2022 (la misma de la retirada: banda azul con el emblema dorado y «2022», la pirámide en
// plano azul con sus salas, rayas grises), de w × hh; luz 0–1 enciende la imagen con un barrido
const portada = (x0, y0, w, hh, t, luz = 0) => {
  x0 = Math.round(x0); y0 = Math.round(y0);
  R.rect(x0 + 3, y0 + 3, x0 + w + 3, y0 + hh + 3, hex('#00000040') & 0 || mez(R.pget(x0 + w, y0 + hh), K, 0.5));
  R.rect(x0, y0, x0 + w, y0 + hh, K); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, PAPEL);
  const bh = Math.max(5, Math.round(hh * 0.16));
  R.rect(x0 + 2, y0 + 2, x0 + w - 2, y0 + 1 + bh, AZULR); R.rect(x0 + 2, y0 + 2, x0 + w - 2, y0 + 2, hex('#3a6aaa'));
  const er = Math.max(2, Math.round(bh * 0.35)); R.disco(x0 + 3 + er, y0 + 2 + Math.round(bh / 2), er, ORO2); if (er > 2) R.disco(x0 + 3 + er, y0 + 2 + Math.round(bh / 2), er - 2, AZULR);
  if (w >= 40) R.numero('2022', x0 + w - 25, y0 + Math.round(bh / 2) + 5, { fina: true, color: PAPEL, sombra: false });
  const ix0 = x0 + 4, iy0 = y0 + bh + 4, ix1 = x0 + w - 4, iy1 = y0 + Math.round(hh * 0.8);
  for (let y = iy0; y <= iy1; y++) for (let x = ix0; x <= ix1; x++) R.pset(x, y, (x - ix0) % 8 === 0 || (y - iy0) % 8 === 0 ? hex('#1a3462') : (x + y) % 2 ? hex('#0c1a3a') : hex('#102248'));
  const cx = (ix0 + ix1) >> 1, ap = iy0 + 3, ba = iy1 - 3, hw = Math.round((ba - ap) * 0.62), L = luz > 0 ? hex('#c8fbff') : hex('#5ae0f0');
  R.linea(cx, ap, cx - hw, ba, L); R.linea(cx, ap, cx + hw, ba, L); R.linea(cx - hw, ba, cx + hw, ba, L);
  const s = (ba - ap) / 60;
  for (const [dx, dy, ww] of [[-6, 38, 8], [4, 26, 9], [-2, 48, 6]]) { const xx = Math.round(cx + dx * s * 1.6), yy = Math.round(ap + dy * s), w2 = Math.max(3, Math.round(ww * s * 1.6)); R.rect(xx, yy, xx + w2, yy, L); R.rect(xx, yy + 3, xx + w2, yy + 3, L); R.rect(xx, yy, xx, yy + 3, L); R.rect(xx + w2, yy, xx + w2, yy + 3, L); }
  for (const [dx, dy] of [[-10, 20], [12, 44]]) { const xx = Math.round(cx + dx * s * 1.6), yy = Math.round(ap + dy * s); R.rect(xx, yy, xx + Math.max(2, Math.round(4 * s)), yy + 2, hex('#e67ad8')); }
  if (luz > 0) { const yb = Math.round(lerp(iy1, iy0, (t * 0.9) % 1)); for (let x = ix0; x <= ix1; x++) R.pset(x, yb, mez(R.pget(x, yb), hex('#c8fbff'), 0.6 * luz)); }
  for (let j = Math.round(hh * 0.84); j < hh - 2; j += 3) R.rect(x0 + 4, y0 + j, x0 + w - 6 - ((j * 7) % 9), y0 + j, hex('#8a8a96'));
};
// los papeles que lleva alguien en la mano
const papeles = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 4, y - 10, x + 4, y + 1, K); R.rect(x - 3, y - 9, x + 3, y, W); R.rect(x - 2, y - 11, x + 5, y - 1, K); R.rect(x - 1, y - 10, x + 4, y - 2, PAPEL); for (const j of [-8, -6, -4]) R.rect(x, y + j, x + 3, y + j, hex('#8a8a96')); };

// ── 1 · el laboratorio de radar (Italia, 2022) ──
const PAR = H('#8e9a8c #a4ae9e #b8c2b0 #c8d0be #d6dccc');
const lab = () => fijo('lab', () => {
  for (let y = 0; y < 134; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(PAR, 2.6 + (sn(x, y, 26, 3) - 0.5) * 0.9 + (h(x, y, 4) - 0.5) * 0.45 - (y < 8 ? 0.6 : 0), x, y));
  // el zócalo de azulejo verde y la bandeja de cables con su canaleta
  for (let y = 112; y < 134; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 9 === 0 || (y - 112) % 7 === 0) ? hex('#5a6e62') : tono(H('#6e8a7a #7e9a88 #90aa98'), 1.2 + (h(x / 9 | 0, (y - 112) / 7 | 0, 5) - 0.5) + ((y - 112) % 7 === 1 ? 0.6 : 0), x, y));
  R.rect(0, 110, 319, 111, hex('#4a5a50'));
  // la ventana con persiana: cielo, colinas con cipreses y tejados
  caja(12, 28, 78, 100, (x, y) => tono(H('#5a9ae0 #7ab4ec #9ccaf4 #c0dcf8'), (y - 28) / 30 * 3 + (h(x, y, 2) - 0.5) * 0.4, x, y), hex('#e8ece8'));
  R.poligono([[13, 76], [30, 66], [48, 70], [66, 62], [77, 68], [77, 99], [13, 99]], (x, y) => tono(H('#4a7a3a #5e8e46 #74a254 #8ab464'), 2 + (h(x >> 1, y >> 1, 3) - 0.5) * 1.2 - (y - 62) * 0.03, x, y));
  for (const [x, y, hh] of [[24, 70, 14], [52, 66, 18], [58, 68, 12], [70, 64, 16]]) for (let j = 0; j < hh; j++) { const w = Math.round(Math.sin(j / hh * Math.PI) * 2.2); R.rect(x - w, y + j - hh + 8, x + w, y + j - hh + 8, j % 3 ? hex('#1e4a28') : hex('#2e5e34')); }
  for (let k = 0; k < 6; k++) { const x = 14 + k * 11, y = 86 + (k % 2) * 3; R.poligono([[x, y], [x + 6, y - 5], [x + 12, y], [x + 12, y + 9], [x, y + 9]], (xx, yy) => yy < y + 1 ? hex('#a8481e') : (xx + yy) % 4 ? hex('#e8d4b0') : hex('#d4bc94')); R.linea(x, y, x + 6, y - 5, hex('#c8582a')); R.linea(x + 6, y - 5, x + 12, y, hex('#c8582a')); R.rect(x + 3, y + 3, x + 4, y + 5, hex('#5a4a3a')); }
  R.rect(44, 52, 49, 84, hex('#c8a078')); R.rect(44, 52, 45, 84, hex('#e0bc94')); R.poligono([[43, 52], [46.5, 44], [50, 52]], hex('#a8481e')); R.rect(45, 56, 48, 59, hex('#3a2a1a'));
  for (let y = 29; y < 48; y += 3) { R.rect(13, y, 77, y + 1, hex('#e8e4d8')); R.rect(13, y + 2, 77, y + 2, hex('#b8b4a8')); }
  R.rect(44, 48, 45, 66, hex('#8a8478'));
  R.rect(10, 100, 80, 104, K); R.rect(11, 100, 79, 102, hex('#f0f2ee')); R.rect(11, 103, 79, 103, hex('#a8aca8'));
  // el radiador
  caja(16, 112, 74, 128, (x, y) => (x - 16) % 4 === 0 ? hex('#a8aaa8') : hex('#e4e6e2'));
  // el calendario (la hoja se pasa en la escena) y el póster del satélite
  caja(86, 30, 110, 64, PAPEL); R.rect(87, 31, 109, 37, hex('#c8303a')); R.rect(97, 28, 99, 32, hex('#5a5a66'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) R.rect(89 + i * 3, 50 + j * 3, 90 + i * 3, 51 + j * 3, (i + j) % 5 ? hex('#a8a8b0') : hex('#c8303a'));
  caja(86, 70, 110, 104, hex('#0c1430'));
  for (let k = 0; k < 18; k++) R.pset(88 + Math.floor(h(k, 1) * 20), 72 + Math.floor(h(k, 2) * 30), W);
  R.rect(94, 84, 101, 89, hex('#e0b438')); R.rect(88, 85, 93, 88, hex('#3a62b8')); R.rect(102, 85, 107, 88, hex('#3a62b8')); R.rect(94, 90, 101, 91, hex('#8a8a96'));
  R.poligono([[87, 104], [98, 96], [109, 104]], hex('#c89a5c'));
  // el muro de pantallas (los bastidores; el contenido lo pone la escena)
  caja(116, 26, 262, 96, hex('#2a2a32')); for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) caja(119 + i * 48, 29 + j * 33, 162 + i * 48, 59 + j * 33, hex('#0a0e16'), hex('#4a4a56'));
  R.rect(116, 96, 262, 98, hex('#5a5a66'));
  // la puerta de la derecha (la hoja la pinta la escena) con su marco
  caja(268, 48, 312, 134, hex('#e8eef0'), hex('#8a8e92')); R.rect(270, 50, 310, 134, hex('#c8d4dc'));
  // el suelo de linóleo con baldosas y reflejos
  for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) { const z = (y - 120) / 60, rx = (x - 160) / z; const lin = Math.abs(((rx % 26) + 26) % 26) < 1 / z || (y - 134) % Math.max(3, Math.round(4 + (y - 134) * 0.3)) === 0; R.pset(x, y, lin ? hex('#8a8478') : tono(H('#a49c8c #b4ac9a #c4bca8 #d2cab6'), 1.8 + (h(x >> 1, y, 6) - 0.5) * 0.5 + (Math.abs(x - 190) < 60 && y < 150 ? 0.6 : 0), x, y)); }
  // la planta en su maceta
  caja(70, 150, 90, 170, (x, y) => (y % 4 === 0 ? hex('#a8481e') : hex('#c85a2a')));
  for (let k = 0; k < 40; k++) { const a = h(k, 1) * 6.28, r = 4 + h(k, 2) * 18, x = Math.round(80 + Math.cos(a) * r * 0.7), y = Math.round(132 + Math.sin(a) * r * 0.9); if (y < 150) { R.disco(x, y, 2, hex('#2e6a2e')); R.pset(x - 1, y - 1, hex('#5aa04a')); } }
  R.linea(80, 150, 80, 128, hex('#5a3a1a'));
});
const SCR = (i, j) => [120 + i * 48, 30 + j * 33, 161 + i * 48, 58 + j * 33];
const pantallasLab = (t) => {
  // 0,0: imagen de radar con grano y la línea que barre; 1,0: trazas; 2,0: la órbita con el satélite;
  // 0,1: espectro de barras; 1,1: Giza en radar desde arriba; 2,1: números que cambian
  { const [a, b, c2, d2] = SCR(0, 0), yb = a + ((t * 20) % (c2 - a)); for (let y = b; y <= d2; y++) for (let x = a; x <= c2; x++) { const v = h(x, y + Math.floor(t * 3), 3) * 0.6 + (Math.abs(x - 140) + Math.abs(y - 44) < 9 ? 0.5 : 0); R.pset(x, y, x > yb ? hex('#10141a') : v > 0.7 ? hex('#d0d4d8') : v > 0.45 ? hex('#7a7e86') : hex('#2a2e34')); } R.rect(Math.round(yb), b, Math.round(yb), d2, hex('#5ae0f0')); }
  { const [a, b, c2, d2] = SCR(1, 0); for (let k = 0; k < 3; k++) { let py = b + 6 + k * 9; for (let x = a + 1; x <= c2; x++) { const y = Math.round(b + 6 + k * 9 + Math.sin(x * 0.5 - t * 6 + k) * 2.5 * Math.sin(x * 0.07 + k)); R.linea(x - 1, py, x, y, k === 1 ? hex('#f0d040') : hex('#56f07a')); py = y; } } }
  { const [a, b, c2, d2] = SCR(2, 0); R.rect(a, b, c2, d2, hex('#0a1430')); for (let x = a; x <= c2; x++) { const y = Math.round((b + d2) / 2 + Math.sin((x - a) / (c2 - a) * 6.28) * 8); R.pset(x, y, hex('#2a5a9a')); }
    const u = (t * 0.12) % 1, sx = Math.round(a + u * (c2 - a)), sy = Math.round((b + d2) / 2 + Math.sin(u * 6.28) * 8); R.rect(sx - 1, sy - 1, sx + 1, sy + 1, hex('#ffe890')); R.disco(a + 10, d2 - 6, 3, hex('#3a8a3a')); }
  { const [a, b, c2, d2] = SCR(0, 1); for (let i = 0; i < 10; i++) { const hh = Math.round(4 + Math.abs(Math.sin(t * 3 + i * 1.3)) * (d2 - b - 6)); R.rect(a + 2 + i * 4, d2 - hh, a + 4 + i * 4, d2, i % 3 === 0 ? hex('#f0a030') : hex('#5ad8f0')); } }
  { const [a, b, c2, d2] = SCR(1, 1); for (let y = b; y <= d2; y++) for (let x = a; x <= c2; x++) R.pset(x, y, h(x, y, 7) > 0.6 ? hex('#6a6e74') : hex('#3a3e44')); for (const [x, y, r] of [[150, 76, 6], [137, 83, 5], [130, 89, 3]]) { R.rect(x - r, y - r, x + r, y + r, hex('#a8acb0')); R.linea(x - r, y - r, x + r, y + r, hex('#e0e4e8')); R.linea(x + r, y - r, x - r, y + r, hex('#1a1e24')); } }
  { const [a, b, c2, d2] = SCR(2, 1); R.rect(a, b, c2, d2, hex('#0a1a10')); for (let k = 0; k < 3; k++) R.numero(String(Math.floor(h(Math.floor(t * 2), k, 9) * 900 + 100)), a + 3, b + 8 + k * 9, { fina: true, color: hex('#56f07a'), sombra: false }); }
};
const p1 = (t) => {
  R.copiar(lab());
  // las nubes y los pájaros en la ventana (recortados al cristal)
  R.recorte([13, 48, 77, 70]);
  for (const [x0, y0, w, v, k] of [[10, 54, 10, 3, 1], [50, 50, 7, 5, 2]]) nube(((x0 + t * v) % 90) + 6, y0, w, k, H('#c8d4e4 #e4ecf6 #ffffff'));
  { const x = Math.round(((t * 9) % 80) + 8), y = 58 + Math.round(Math.sin(t * 2) * 2), b = Math.floor(t * 8) % 2; R.pset(x, y, K); R.pset(x - 1, y - b, K); R.pset(x + 1, y - b, K); }
  R.recorte(null);
  pantallasLab(t);
  // el reloj de pared
  { const cx = 246, cy = 14; R.disco(cx, cy, 7, K); R.disco(cx, cy, 6, W); const a = t * 6.28 / 6, b = t * 6.28 / 60; R.linea(cx, cy, Math.round(cx + Math.sin(a) * 5), Math.round(cy - Math.cos(a) * 5), hex('#c8303a')); R.linea(cx, cy, Math.round(cx + Math.sin(b + 2) * 4), Math.round(cy - Math.cos(b + 2) * 4), K); }
  // el calendario: en «2022» la hoja de 2021 sube y deja ver la de 2022
  const fl = tramo(t, ANO - 0.1, ANO + 0.3);
  R.numero('2022', 89, 47, { fina: true, color: hex('#1a1420'), sombra: false });
  if (fl < 1) { const y1 = Math.round(lerp(64, 38, fl)); R.rect(87, 38, 109, y1, PAPEL); R.rect(87, y1, 109, y1, hex('#a8a8b0')); if (y1 > 52) for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) R.rect(89 + i * 3, 40 + j * 3, 90 + i * 3, 41 + j * 3, hex('#c8c8d0')); }
  // la puerta se abre para Malanga y se cierra
  const pa = ease(tramo(t, 0.25, 0.8)) - ease(tramo(t, 2.0, 2.6)), dw = Math.round(40 * (1 - pa * 0.8));
  R.rect(270, 50, 310, 134, hex('#e8e4d8')); R.rect(270, 50, 310, 52, hex('#c8c4b8'));
  caja(270, 50, 270 + dw, 134, (x, y) => tono(H('#7a5a3a #8e6a44 #a27c52'), 1.2 + ((x - 270) % 6 === 0 ? -0.8 : 0) + (h(x, y >> 2, 3) - 0.5) * 0.5, x, y));
  if (dw > 12) { caja(274, 58, 270 + dw - 4, 82, hex('#a8c8d8')); R.rect(270 + dw - 6, 92, 270 + dw - 3, 94, hex('#e0b438')); }
  // Malanga aparece en el hueco de la puerta abierta (detrás de la consola) y baja hacia delante
  const mu = ease(tramo(t, 0.75, 3.6)), arriba = t > MALANGA - 0.1;
  const mx = Math.round(mu < 0.25 ? lerp(290, 274, mu / 0.25) : lerp(274, 202, (mu - 0.25) / 0.75)), ms = Math.round(mu < 0.25 ? lerp(134, 150, mu / 0.25) : lerp(150, 176, (mu - 0.25) / 0.75));
  const malanga = () => { if (t < 0.6) return; const m = R.actor(EL.malanga, mx, ms, t, { dir: -1, anda: mu > 0 && mu < 1, sostiene: arriba ? [mx - 4, ms - 32] : true, habla: arriba && Math.sin(t * 7) > 0, sonrisa: arriba }); papeles(m.mano[0], m.mano[1] + 2); };
  if (ms < 152) malanga();
  // Biondi detrás de la consola: teclea, y en «Biondi» levanta la vista y sonríe
  R.actor(EL.biondi, 150, 139, t, { dir: t > BIONDI ? 1 : -1, sonrisa: t > MALANGA, habla: t > BIONDI && t < MALANGA && Math.sin(t * 7) > 0 });
  // la consola delante (tablero claro, teclados, taza que humea, lámpara) y su frente con rejillas
  R.rect(96, 132, 296, 137, K); R.rect(97, 133, 295, 135, hex('#d8dcd8')); R.rect(97, 136, 295, 136, hex('#a8aca8'));
  for (let y = 138; y < 166; y++) for (let x = 98; x < 295; x++) R.pset(x, y, (x - 98) % 50 === 0 ? K : (y - 138) % 9 === 0 && (x % 50) > 10 && (x % 50) < 40 ? hex('#4a5058') : tono(H('#5a6270 #6a7280 #7a8290'), 1.4 + (h(x >> 2, y >> 2, 4) - 0.5) * 0.4, x, y));
  R.rect(96, 137, 97, 166, K); R.rect(295, 137, 296, 166, K); R.rect(96, 166, 296, 167, K);
  for (const x of [112, 200, 246]) { R.rect(x, 128, x + 28, 132, K); R.rect(x + 1, 129, x + 27, 131, hex('#3a3a46')); for (let i = 0; i < 9; i++) R.pset(x + 2 + i * 3, 130, hex('#8a8a96')); }
  { R.rect(278, 124, 286, 132, K); R.rect(279, 125, 285, 131, W); R.rect(286, 126, 288, 129, K); for (let k = 0; k < 3; k++) { const f = (t * 0.7 + k / 3) % 1; ps(282 + Math.sin(f * 9 + k) * 2, 122 - f * 14, f < 0.5 ? hex('#ffffff') : hex('#c8ccd0')); } }
  R.linea(104, 132, 104, 112, K); R.linea(104, 112, 110, 106, K); R.poligono([[107, 104], [115, 104], [113, 109], [109, 109]], hex('#c8303a'));
  // Malanga entra con los papeles y los levanta en «Malanga»
  if (ms >= 152) malanga();
};

// ── 2 · la revista en su atril, en la mesa del laboratorio ──
const mesa2 = () => fijo('mesa2', () => {
  // la pared de arriba: la ventana a la izquierda, el corcho con láminas a la derecha
  for (let y = 0; y < 60; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(PAR, 2.4 + (sn(x, y, 20, 7) - 0.5) * 0.8 + (h(x, y, 8) - 0.5) * 0.4, x, y));
  caja(4, 4, 70, 56, (x, y) => tono(H('#5a9ae0 #7ab4ec #9ccaf4'), (y - 4) / 26 * 2 + (h(x, y, 2) - 0.5) * 0.4, x, y), hex('#e8ece8'));
  R.poligono([[5, 40], [24, 32], [46, 36], [69, 30], [69, 55], [5, 55]], (x, y) => tono(H('#4a7a3a #5e8e46 #74a254'), 1.4 + (h(x >> 1, y >> 1, 3) - 0.5), x, y));
  for (const [x, y, hh] of [[16, 40, 14], [36, 34, 16], [58, 34, 12]]) for (let j = 0; j < hh; j++) { const w = Math.round(Math.sin(j / hh * Math.PI) * 2.2); R.rect(x - w, y + j - hh + 8, x + w, y + j - hh + 8, j % 3 ? hex('#1e4a28') : hex('#2e5e34')); }
  R.rect(37, 4, 38, 56, hex('#e8ece8')); R.rect(4, 30, 70, 31, hex('#e8ece8'));
  caja(186, 18, 270, 58, (x, y) => tono(H('#a8743c #b88448 #c89858'), 1.2 + (h(x, y, 4) - 0.5) * 1.4, x, y), hex('#6a4422'));
  for (const [x, y, w, hh, c] of [[192, 22, 18, 14, '#f4f0e6'], [214, 24, 22, 16, '#e8f0f8'], [240, 21, 24, 18, '#f4f0e6'], [200, 40, 20, 14, '#fff8d0']]) { caja(x, y, x + w, y + hh, hex(c), hex('#8a8a96')); R.disco(x + (w >> 1), y + 1, 1, hex('#c8303a')); }
  for (let x = 195; x < 208; x++) R.pset(x, 32 - Math.round(Math.abs(Math.sin(x * 0.7)) * 5), hex('#3a6ad8'));
  R.linea(218, 36, 226, 28, hex('#c8303a')); R.linea(226, 28, 232, 36, hex('#c8303a')); R.linea(218, 36, 232, 36, hex('#c8303a'));
  for (let k = 0; k < 4; k++) R.rect(244, 26 + k * 3, 244 + 10 + (k * 5) % 9, 26 + k * 3, hex('#8a8a96'));
  R.linea(204, 44, 216, 50, hex('#5a5a66')); R.linea(204, 50, 216, 44, hex('#5a5a66'));
  // el canto de la mesa y el tablero en perspectiva (laminado claro con brillo y rayas)
  R.rect(0, 60, 319, 63, hex('#5a5e66')); R.rect(0, 60, 319, 60, hex('#9aa0a8'));
  for (let y = 64; y < 180; y++) for (let x = 0; x < 320; x++) { const z = (y - 40) / 140, sheen = Math.exp(-(((x - 160 - (y - 64) * 0.4) / 60) ** 2)) * 0.8; R.pset(x, y, tono(H('#9a9688 #aaa696 #bab6a6 #cac6b6 #dad6c8'), 1.6 + z * 0.8 + sheen + (h(x >> 2, y, 3) - 0.5) * 0.35 + ((x + y * 3) % 97 === 0 ? -1 : 0), x, y)); }
  // los papeles impresos, la regla, el bolígrafo, las gafas, el lápiz USB y la maceta
  R.poligono([[22, 128], [92, 120], [100, 166], [30, 176]], hex('#d8d4c8')); R.poligono([[26, 124], [94, 116], [102, 160], [34, 170]], PAPEL);
  for (let k = 0; k < 8; k++) R.linea(34 + k * 0.6, 130 + k * 4, 84 + k * 0.6, 124 + k * 4, k === 3 ? hex('#3a6ad8') : hex('#9a9aa6'));
  R.rect(80, 116, 86, 118, hex('#a8acb0'));
  R.linea(20, 112, 110, 100, hex('#e8c040')); R.linea(20, 113, 110, 101, hex('#a87a18')); for (let k = 0; k < 18; k++) R.pset(22 + k * 5, 112 - Math.round(k * 0.67), K);
  R.linea(112, 170, 140, 150, K); R.linea(113, 170, 141, 150, hex('#3a6ad8')); R.pset(141, 150, hex('#e8e8f0'));
  for (const cx of [218, 236]) { R.anillo(cx, 160, 7, K); R.anillo(cx, 160, 6, hex('#3a3a46')); R.pset(cx - 3, 157, W); } R.linea(225, 159, 229, 159, K); R.linea(211, 158, 200, 150, K); R.linea(243, 158, 254, 152, K);
  R.rect(150, 168, 160, 172, K); R.rect(151, 169, 159, 171, hex('#c8303a')); R.rect(160, 169, 164, 171, hex('#a8acb0'));
  caja(286, 74, 306, 96, (x, y) => (y % 4 === 0 ? hex('#a8481e') : hex('#c85a2a'))); for (let k = 0; k < 24; k++) { const a = h(k, 3) * 3.14 + 3.14, r = 3 + h(k, 4) * 12; R.disco(Math.round(296 + Math.cos(a) * r), Math.round(72 + Math.sin(a) * r * 0.8), 2, k % 3 ? hex('#3a7a3a') : hex('#5aa04a')); }
  // el atril de metacrilato (la revista se pone encima en la escena)
  R.poligono([[120, 132], [196, 132], [204, 142], [112, 142]], hex('#c8dce8')); R.linea(112, 142, 204, 142, hex('#7a8a96')); R.linea(120, 132, 196, 132, W);
  R.linea(126, 132, 136, 52, hex('#d8eaf4')); R.linea(190, 132, 180, 52, hex('#d8eaf4'));
});
const portatil2 = (t, act) => {
  R.poligono([[206, 112], [292, 112], [300, 132], [198, 132]], hex('#8a8e96')); R.linea(198, 132, 300, 132, K); for (let j = 0; j < 3; j++) for (let i = 0; i < 12; i++) R.rect(212 + i * 6 + j * 1, 115 + j * 5, 215 + i * 6 + j * 1, 117 + j * 5, hex('#3a3e46'));
  caja(212, 68, 286, 112, hex('#2a2e36'), K); R.rect(215, 71, 283, 109, hex('#0a1430'));
  for (let k = 0; k < 14; k++) R.pset(216 + Math.floor(h(k, 5) * 66), 72 + Math.floor(h(k, 6) * 36), hex('#5a6aa8'));
  // el satélite y, en «same method», sus ondas que bajan a una pirámide
  const sx = 232, sy = 80; R.rect(sx - 3, sy - 2, sx + 3, sy + 2, hex('#e0b438')); R.rect(sx - 12, sy - 1, sx - 5, sy + 1, hex('#3a62b8')); R.rect(sx + 5, sy - 1, sx + 12, sy + 1, hex('#3a62b8'));
  R.poligono([[256, 106], [266, 92], [276, 106]], hex('#c89a5c')); R.linea(256, 106, 266, 92, hex('#e8d4a4'));
  if (act > 0) for (let k = 0; k < 3; k++) { const f = (t * 1.1 + k / 3) % 1, cx = lerp(sx, 266, f), cy = lerp(sy + 4, 92, f); for (let a = -0.8; a <= 0.8; a += 0.2) R.pset(Math.round(cx + Math.cos(a + 0.6) * (3 + f * 4)), Math.round(cy + Math.sin(a + 0.6) * (3 + f * 4)), hex('#5ae0f0')); }
};
const nota = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x + 2, y + 2, x + 26, y + 18, hex('#6a6a60')); caja(x, y, x + 24, y + 16, W, hex('#8a8a96')); for (const j of [4, 8, 12]) R.rect(x + 3, y + j, x + 12, y + j, hex('#a8a8b0')); T.visto(R, x + 14, y + 4, 1); };
const p2 = (t) => {
  R.copiar(mesa2());
  // nubes en la ventana, la taza que humea, el portátil
  R.recorte([5, 5, 69, 30]); nube(((t * 4) % 90) - 10, 16, 9, 2, H('#c8d4e4 #e4ecf6 #ffffff')); R.recorte(null);
  R.rect(100, 76, 112, 92, K); R.rect(101, 77, 111, 91, hex('#c8303a')); R.rect(112, 80, 115, 86, K); for (let k = 0; k < 4; k++) { const f = (t * 0.6 + k / 4) % 1; ps(104 + Math.sin(f * 8 + k) * 3 + k, 74 - f * 20, f < 0.5 ? W : hex('#d8dce0')); }
  portatil2(t, tramo(t, METODO - 0.1, METODO + 0.2));
  // las tres notas de revisión que llegan volando en «peer-reviewed» y se apilan
  for (let k = 0; k < 3; k++) { const u = tramo(t, PARES - 0.25 + k * 0.2, PARES + 0.15 + k * 0.2); if (u <= 0) continue; const e = ease(u); nota(lerp(-40, 40 + k * 3, e), lerp(70, 88 - k * 4, e) - Math.sin(u * Math.PI) * 12); }
  // la revista: la mano la sube y la deja en el atril en «published»; en «Great Pyramid» la imagen se enciende
  const u = ease(tramo(t, P2 - 0.05, P2 + 0.6)), rx = lerp(250, 128, u), ry = lerp(200, 44, u);
  portada(rx, ry, 60, 86, t, tramo(t, GRAN - 0.2, GRAN + 0.2) * (1 - tramo(t, KEOPS + 0.4, KEOPS + 0.9)));
  const sale = ease(tramo(t, P2 + 0.7, P2 + 1.2));
  if (sale < 1) { const wx = Math.round(rx + 58 + sale * 60), wy = Math.round(ry + 70 + sale * 80); T.brazo(R, wx + 30, wy + 46, wx, wy, '#3a5a8a', -1, { codo: [wx + 28, wy + 20] }); }
  if (t > GRAN && t < KEOPS + 0.6) { const r = 10 + Math.round(Math.sin(t * 6) * 1.5); R.anillo(158, 92, r, hex('#c8fbff')); R.anillo(158, 92, r + 2, hex('#2a8ab6'), 3); }
};

// ── 3 · el corte de Keops en plano azul: lo conocido y lo «nuevo» ──
const p3 = (t) => {
  const o = { encuadre: 'keops', nuevas: ease(tramo(t, OTRAS - 0.15, DESCUB)) };
  const r = T.plano(R, t, o);
  const kn = tramo(t, CONOCIDAS - 0.2, CONOCIDAS + 0.25) * (1 - tramo(t, OTRAS + 0.4, OTRAS + 1));
  if (kn > 0) for (const [x, y, rr] of [[...(r.camaraRey || [176, 94]), 9], [...(r.camaraReina || [157, 117]), 8], [147, 104, 13]]) { const q = Math.round(rr * (1.6 - kn * 0.6)); R.anillo(x, y, q, hex('#f6f9ff')); R.anillo(x, y, q + 1, hex('#a6b4d4'), 3); }
  const b = R.actor(EL.biondi, 40, 172, t, { dir: 1, sostiene: true, sonrisa: t > DESCUB, habla: t > CONOCIDAS && t < OTRAS && Math.sin(t * 7) > 0 });
  portatil(b);
  R.actor(EL.malanga, 248, 172, t, { dir: -1, dedo: t > CONOCIDAS - 0.2 && t < DESCUB + 0.3, habla: t > OTRAS && t < DESCUB && Math.sin(t * 6) > 0, sonrisa: t > DESCUB });
  T.planoDelante(R, t, o);
};

// ── 4 · el claustro de la universidad: la portada en el tablón ──
const OCRE = H('#a8784a #bc8c58 #cca068 #dab27a #e6c48e');
const claustro = () => fijo('claustro', () => {
  // el patio al sol, detrás de los arcos: cielo, el muro del fondo con su tejado, cipreses, césped y la fuente
  for (let y = 0; y < 132; y++) for (let x = 0; x < 206; x++) R.pset(x, y, tono(H('#5a9ae0 #7ab4ec #9ccaf4 #c0dcf8'), (y - 20) / 30 * 3 + (h(x, y, 2) - 0.5) * 0.4, x, y));
  for (let y = 66; y < 104; y++) for (let x = 0; x < 206; x++) R.pset(x, y, y < 70 ? ((x >> 2) % 2 ? hex('#a8481e') : hex('#c85a2a')) : tono(OCRE, 2.6 + (h(x >> 1, y >> 1, 3) - 0.5) * 0.8, x, y));
  for (let x = 8; x < 206; x += 26) { caja(x, 78, x + 8, 92, hex('#4a3a2a'), hex('#7a5a3a')); R.rect(x + 4, 78, x + 4, 92, hex('#7a5a3a')); }
  for (const [x, hh] of [[30, 44], [92, 52], [170, 46]]) for (let j = 0; j < hh; j++) { const w = Math.round(Math.sin(j / hh * Math.PI) * 4); R.rect(x - w, 104 - hh + j, x + w, 104 - hh + j, j % 3 ? hex('#1e4a28') : hex('#2e5e34')); R.pset(x - w + 1, 104 - hh + j, hex('#3e7244')); }
  for (let y = 104; y < 132; y++) for (let x = 0; x < 206; x++) R.pset(x, y, tono(H('#3e7a32 #4e8e3c #62a24a #7ab45a'), 1.8 + (h(x, y >> 1, 4) - 0.5) + ((x + y * 2) % 7 === 0 ? 0.8 : 0), x, y));
  R.rect(110, 112, 146, 126, K); R.rect(111, 113, 145, 125, hex('#c8c4b8')); R.rect(113, 114, 143, 118, hex('#3a7ab8')); R.rect(124, 98, 132, 113, hex('#c8c4b8')); R.rect(124, 98, 125, 113, hex('#e8e4d8'));
  // el pórtico: la pared alta, los arcos de medio punto con su moldura y las columnas con capitel y basa
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) {
    const enArco = x < 206 && (() => { const i = Math.floor((x - 4) / 50), cx = 4 + i * 50 + 25, lx = x - (cx - 25); if (lx < 6 || lx > 44) return false; if (y > 54) return true; return Math.hypot(lx - 25, y - 54) < 19; })();
    if (enArco && y < 132) continue;
    R.pset(x, y, tono(OCRE, 3 + (sn(x, y, 18, 5) - 0.5) * 0.9 + (h(x, y, 6) - 0.5) * 0.4 - (y > 120 ? 0.6 : 0), x, y));
  }
  for (let i = 0; i < 4; i++) { const cx = 4 + i * 50 + 25; for (let a = 3.14; a <= 6.29; a += 0.02) { R.pset(Math.round(cx + Math.cos(a) * 20), Math.round(54 + Math.sin(a) * 20), hex('#8a6038')); R.pset(Math.round(cx + Math.cos(a) * 21), Math.round(54 + Math.sin(a) * 21), hex('#f0d8a8')); } }
  for (let i = 0; i < 5; i++) { const x = 4 + i * 50; caja(x - 3, 54, x + 9, 132, (xx, yy) => tono(H('#c8b490 #dccaa4 #ecdcba #f6ecd2'), xx < x + 1 ? 3 : xx > x + 5 ? 0.8 : 2, xx, yy), hex('#8a6038')); caja(x - 6, 50, x + 12, 55, hex('#ecdcba'), hex('#8a6038')); caja(x - 6, 128, x + 12, 133, hex('#dccaa4'), hex('#8a6038')); }
  R.rect(0, 0, 319, 2, hex('#8a6038'));
  // la cornisa sobre los arcos, con su moldura y unas manchas del revoque
  R.rect(0, 26, 272, 29, hex('#f0d8a8')); R.rect(0, 30, 272, 31, hex('#8a6038')); for (let x = 2; x < 270; x += 6) R.rect(x, 32, x + 2, 33, hex('#a8784a'));
  for (let k = 0; k < 9; k++) { const x = Math.round(190 + h(k, 1, 9) * 120), y = Math.round(36 + h(k, 2, 9) * 80); if (libre(x, y) && !(x > 214 && x < 278 && y > 46 && y < 110)) { R.rect(x, y, x + 3 + (k % 3), y + 1, hex('#cca068')); R.pset(x + 1, y + 2, hex('#a8784a')); } }
  // el tablón de corcho con hojas clavadas (sin letras) y el aplique
  caja(218, 80, 274, 130, (x, y) => tono(H('#a8743c #b88448 #c89858'), 1.2 + (h(x, y, 4) - 0.5) * 1.4, x, y), hex('#6a4422'));
  for (const [x, y, w, hh, c] of [[222, 84, 12, 16, '#f4f0e6'], [258, 85, 12, 13, '#fff8d0'], [222, 106, 13, 19, '#e8f0f8'], [258, 104, 12, 18, '#f4f0e6']]) { caja(x, y, x + w, y + hh, hex(c), hex('#8a8a96')); for (let j = 4; j < hh - 2; j += 3) R.rect(x + 2, y + j, x + w - 3, y + j, hex('#a8a8b0')); R.disco(x + (w >> 1), y + 1, 1, hex('#3a6ad8')); }
  R.rect(290, 66, 296, 74, hex('#3a3a46')); R.poligono([[286, 74], [300, 74], [297, 80], [289, 80]], hex('#f0d890'));
  // el banco de madera, y el suelo de barro cocido en perspectiva con las manchas de sol de los arcos
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const z = (y - 110) / 70, rx = (x - 160) / z, lin = Math.abs(((rx % 22) + 22) % 22) < 0.9 / z || (y - 132) % Math.max(3, Math.round(3 + (y - 132) * 0.28)) === 0;
    let v = 2 + (h(x >> 2, y >> 1, 7) - 0.5) * 0.6; const sx = x - (y - 132) * 0.9; if (sx < 206 && sx > 0 && ((sx - 4) % 50 + 50) % 50 > 9) v += 1.2;
    R.pset(x, y, lin ? hex('#7a3a1e') : tono(H('#9a4a28 #b45a32 #c86e40 #da8654 #e8a070'), v, x, y)); }
  caja(282, 134, 318, 140, hex('#8e6a44'), hex('#4a3020')); R.rect(286, 140, 288, 152, hex('#4a3020')); R.rect(312, 140, 314, 152, hex('#4a3020'));
});
const paloma = (x, y, t, vuela) => { x = Math.round(x); y = Math.round(y); const a = vuela ? Math.floor(t * 12) % 2 : 0;
  R.rect(x - 3, y - 3, x + 2, y, hex('#8a8e9a')); R.rect(x - 2, y - 3, x + 1, y - 2, hex('#a8acb8')); R.rect(x + 2, y - 5, x + 4, y - 3, hex('#6a6e7a')); R.pset(x + 4, y - 4, K); R.pset(x + 5, y - 4, hex('#e8a030'));
  if (vuela) { R.linea(x - 2, y - 3, x - 5, y - 8 + a * 6, hex('#6a6e7a')); R.linea(x, y - 3, x + 2, y - 8 + a * 6, hex('#8a8e9a')); } else { R.pset(x - 1, y + 1, hex('#e8584a')); R.pset(x + 1, y + 1, hex('#e8584a')); } };
const p4 = (t) => {
  R.copiar(claustro());
  // la fuente que salpica y las nubes del patio
  R.recorte([0, 3, 205, 66]); for (const [x0, y0, w, v, k] of [[20, 20, 14, 3, 1], [120, 34, 10, 5, 2], [200, 14, 9, 7, 3]]) nube(((x0 + t * v) % 260) - 30, y0, w, k, H('#c8d4e4 #e4ecf6 #ffffff')); R.recorte(null);
  for (let k = 0; k < 8; k++) { const f = (t * 1.3 + k / 8) % 1, x = 128 + Math.sin(k * 2.3) * f * 9, y = 98 - Math.sin(f * Math.PI) * 10 + f * 14; ps(x, y, f < 0.6 ? W : hex('#9ac8f0')); }
  // la portada: Malanga la trae, en «proof» la clava en el tablón, y se queda allí con su chincheta roja
  const mu = ease(tramo(t, P4 - 0.1, PRUEBA - 0.4)), mx = Math.round(lerp(176, 226, mu)), clava = t > PRUEBA - 0.05;
  // al final, Malanga va hacia Biondi, se dan la mano y se van juntos por la derecha
  const SAL = FUNCIONA + 1.5, MANO = SAL + 0.7, VAN = MANO + 0.9, va2 = tramo(t, VAN, E.duracion + 0.6);
  const ida = ease(tramo(t, SAL, MANO)), mx2 = Math.round(lerp(mx, 252, ida) + va2 * 120), estrecha = t > MANO && t < VAN;
  const sube = ease(tramo(t, PRUEBA - 0.5, PRUEBA - 0.05));
  const m = R.actor(EL.malanga, mx2, 160, t, { dir: 1, anda: (mu > 0 && mu < 1) || (ida > 0 && ida < 1) || va2 > 0, sostiene: estrecha ? [266, 146] : !clava ? [mx + 12, Math.round(lerp(150, 140, sube))] : t < PRUEBA + 0.4 ? [mx + 12, 140] : false, sonrisa: t > FUNCIONA, habla: t > PRUEBA + 0.4 && t < FUNCIONA + 0.6 && Math.sin(t * 7) > 0 });
  if (clava) { const pu = ease(tramo(t, PRUEBA - 0.05, PRUEBA + 0.15)); portada(lerp(m.mano[0] - 2, 238, pu), lerp(m.mano[1] - 22, 102, pu), 18, 23, t, 0); if (pu >= 1) { R.disco(247, 103, 1, hex('#c8303a')); R.pset(247, 102, hex('#ff8a8a')); if (t < PRUEBA + 0.4) for (const [a, b] of [[-6, -2], [6, -2], [-5, 4], [5, 4]]) R.pset(247 + a, 106 + b, W); } }
  else portada(m.mano[0] - 2, m.mano[1] - 22, 18, 23, t, 0);
  // Biondi: en «method worked» salta con los brazos arriba
  const sb = t > FUNCIONA && t < FUNCIONA + 0.9 ? Math.round(Math.abs(Math.sin((t - FUNCIONA) * 7)) * 5) : 0;
  R.actor(EL.biondi, Math.round(276 + va2 * 120), 162, t, { dir: va2 > 0 ? 1 : -1, anda: va2 > 0, brazos: t > FUNCIONA && t < FUNCIONA + 1.4, sostiene: estrecha ? [268, 146] : false, salto: sb, sonrisa: t > PRUEBA, habla: t < PRUEBA && Math.sin(t * 6) > 0.3 });
  // la estudiante que se para y aplaude, el estudiante que pasa con sus libros por el pórtico
  const eu = tramo(t, P4, P4 + 2.6), ev = tramo(t, FUNCIONA + 1.4, E.duracion), ex = Math.round(lerp(-18, 120, ease(eu)) + ev * 220), para = eu >= 1 && ev <= 0;
  R.actor(EL.chica, ex, 150, t, { dir: 1, anda: !para, brazos: para && t > FUNCIONA && Math.floor(t * 6) % 2 === 0, sonrisa: para });
  const sx = Math.round(lerp(330, -30, tramo(t, P4 + 0.6, E.duracion - 0.2)));
  const st = R.actor(EL.estudiante, sx, 174, t, { dir: -1, anda: true, sostiene: true });
  R.rect(st.mano[0] - 4, st.mano[1] - 3, st.mano[0] + 3, st.mano[1] + 3, K); R.rect(st.mano[0] - 3, st.mano[1] - 2, st.mano[0] + 2, st.mano[1] + 2, hex('#3a6ad8')); R.rect(st.mano[0] - 3, st.mano[1] - 2, st.mano[0] + 2, st.mano[1] - 2, PAPEL);
  // la paloma picotea y echa a volar con el salto
  const vu = tramo(t, FUNCIONA + 0.1, FUNCIONA + 2.2);
  paloma(lerp(150, 330, vu), 170 - vu * 120 - (vu > 0 ? 0 : Math.abs(Math.sin(t * 3)) * 1), t, vu > 0);
};

const efectos = [[0.3, 'puerta'], [ANO, 'papel'], [P2 + 0.5, 'papel'], [PARES, 'whoosh'], [METODO, 'bip'], [GRAN, 'brillo'], [CONOCIDAS, 'tic'], [OTRAS + 0.2, 'pop'], [PRUEBA, 'tic'], [FUNCIONA, 'palmada'], [FUNCIONA + 0.2, 'whoosh'], [FUNCIONA + 1.6, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2022 });
''')
