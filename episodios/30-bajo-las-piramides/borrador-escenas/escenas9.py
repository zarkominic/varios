E = {}

# Utilidades de este grupo. El plano azul LOCAL copia el código del decorado C (copiado de escenas2.py, HELP: mismo
# azul noche, rejilla, cian que brilla y barrido de holograma); EXTRA añade cielos, nubes y piezas pequeñas del grupo.
HELP = r'''
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

EXTRA = r'''
const BL = hex('#fbf6e6');
const RA = (...c) => c.map(hex);
// cielo tramado de varios tonos hasta y1 (con un poco de ruido para que no salgan franjas)
const cieloT = (y1, r, y0 = 0) => { for (let y = y0; y < y1; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(r, (y - y0) / (y1 - y0) * (r.length - 0.6) + (h(x >> 3, y >> 2, 3) - 0.5) * 0.35, x, y)); };
// nubes de tres tonos a tres velocidades (filas [x0, y, ancho, velocidad])
const aparato = (m) => { R.rect(m[0] - 3, m[1] - 4, m[0] + 3, m[1] + 1, K); R.rect(m[0] - 2, m[1] - 3, m[0] + 2, m[1], hex('#9a9aa2')); R.rect(m[0] - 1, m[1] - 2, m[0] + 1, m[1] - 1, hex('#3a6ab0')); };
const tableta = (m) => { R.rect(m[0] - 4, m[1] - 4, m[0] + 3, m[1] + 1, K); R.rect(m[0] - 3, m[1] - 3, m[0] + 2, m[1], hex('#3a6ad8')); R.pset(m[0] - 2, m[1] - 2, hex('#c8e0ff')); };
const nubes = (t, filas, A = 400) => { for (const [x0, y, w, v] of filas) R.nube(((x0 + t * v) % A + A) % A - 40, y, w); };
// estrellas que titilan (no entran en la zona de Atom ni en la barra del año)
const estrellas = (t, x0, y0, x1, y1, n, k = 0) => { for (let i = 0; i < n; i++) { const x = Math.round(x0 + h(i, 1, 40 + k) * (x1 - x0)), y = Math.round(y0 + h(i, 2, 40 + k) * (y1 - y0));
  if ((x > 272 && y < 48) || (x > 16 && x < 174 && y < 16)) continue; const b = Math.sin(t * (1.5 + h(i, 3, k) * 3) + i) > 0.6; R.pset(x, y, b ? hex('#fffbe0') : hex('#8a96c8')); if (b && i % 7 === 0) { R.pset(x - 1, y, hex('#5a6aa0')); R.pset(x + 1, y, hex('#5a6aa0')); R.pset(x, y - 1, hex('#5a6aa0')); R.pset(x, y + 1, hex('#5a6aa0')); } } };
// madera con vetas (tablero) en [x0, y0, x1, y1]
const madera = (x0, y0, x1, y1, r = RA('#6a3e1e', '#7e4c26', '#925a2e', '#a86a38', '#bc7c44')) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
  const v = 2 + Math.sin(x * 0.05 + Math.sin(y * 0.3 + x * 0.013) * 2.2 + y * 0.9) * 1.2 + (h(x >> 2, y, 21) - 0.5) * 0.6 - (y - y0) / Math.max(1, y1 - y0) * 0.8; R.pset(x, y, tono(r, v, x, y)); } };
// la marca de «comprobado» (un visto verde) de tamaño s
const visto = (x, y, s = 1, c = hex('#4ade6a'), o = hex('#14401e')) => { const P = [[0, 3], [1, 4], [2, 5], [3, 4], [4, 3], [5, 2], [6, 1], [7, 0]];
  for (const [i, j] of P) for (let a = -1; a <= s; a++) for (let b = -1; b <= s; b++) R.pset(x + i * s + a, y + j * s + b, o);
  for (const [i, j] of P) for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) R.pset(x + i * s + a, y + j * s + b, c); };
// el «?» grande que late, con contorno
const preguntaG = (x, y, esc, t, c = PZ.br, s = PZ.f0) => { const b = Math.round(Math.sin(t * 4) * 1); R.icono('?', x, y + b, c, s, esc); };
// Atom dentro del plano (como en gz-hola): con su halo
const atomEn = (x, y, t, e = 0.4, r = 12) => {
  for (let j = -20; j <= 20; j++) for (let i = -20; i <= 20; i++) { const g = 1 - Math.hypot(i, j) / (r + 6); if (g > 0.3 && ((i + j) & 1 || g > 0.6)) R.pset(x + i, y + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(x, y, t, { r, orbita: R.PAL.ATOM[7], energia: e });
};
const suave = (u) => u * u * (3 - 2 * u);
// un rectángulo que respeta R.recorte (R.rect no lo hace)
const rc = (x0, y0, x1, y1, c) => { for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, c); };
'''

# ───────────────────────────────────────────────────────────── gz-cierre ──
E['gz-cierre'] = ('Cierre', '''// GZ-CIERRE (frase 30), hoy (barra 2026), sin cartela. Dos planos:
// 1. (LOCAL) el portátil en una mesa de noche: en la pantalla, la miniatura del vídeo (la pirámide con los pozos azules y
//    el «?») y debajo los comentarios, burbujas con un avatar y un icono, que van subiendo; el primero sale en «comments»
//    y en «down there» uno con la flecha hacia abajo y el «?». El gato da un zarpazo a la burbuja que sube, la taza humea,
//    por la ventana pasa un avión con su luz. Corta en «Meanwhile».
// 2. hoy/estudio/mesa (gag 9): entra la mano canónica, levanta la punta de la pirámide de pisapapeles («looking»), coge la
//    linterna de la mesa, la mete por el hueco en «pyramid» y la enciende; en «Oh!» algo brilla dentro y el lápiz perdido
//    salta del hueco y cae rodando en la mesa en «pencil». Atom, en su esquina, se alegra.''', HELP + EXTRA + r'''
const P2 = en('cierre', .404), coment = en('cierre', .091), abajo = en('cierre', .276);
const mirando = en('cierre', .517), coge = en('cierre', .64), piram = en('cierre', .727), oh = en('cierre', .809), lapiz = en('cierre', .920);
const comp0 = R.companero; R.companero = (t, e) => comp0(t, t > oh ? 0.9 : t > piram ? 0.5 : (e ?? 0));
// ── plano 1: el portátil de noche ──
const PARED = RA('#1a1630', '#221c3c', '#2a2448', '#342c54');
const fondo1 = () => capa('c1', () => {
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { let v = 1.6 - y / 120 * 0.8 + (h(x >> 4, y >> 4, 2) - 0.5) * 0.3; if ((x + (y >> 3) * 4) % 16 === 0 && y % 2) v += 0.7; R.pset(x, y, tono(PARED, v, x, y)); }
  // la ventana (el marco; el cielo y la ciudad se pintan con t)
  R.rect(8, 10, 84, 92, hex('#0c0a16')); R.rect(10, 12, 82, 90, hex('#5a4a3a')); R.rect(12, 14, 80, 88, hex('#0e1430'));
  // el cuadro de las pirámides en la pared
  R.rect(242, 54, 274, 80, hex('#0c0a16')); R.rect(243, 55, 273, 79, hex('#b88a3a')); R.rect(245, 57, 271, 77, hex('#e8a860'));
  for (let y = 57; y < 70; y++) for (let x = 245; x <= 271; x++) R.pset(x, y, tono(RA('#f0c070', '#e8a860', '#d88a50'), (y - 57) / 6, x, y));
  R.poligono([[248, 76], [256, 64], [264, 76]], hex('#a8642a')); R.poligono([[256, 76], [263, 67], [270, 76]], hex('#8a4e22')); R.linea(256, 64, 264, 76, hex('#7a4018'));
  R.rect(245, 76, 271, 77, hex('#c8904a'));
  // la mesa: tablero de nogal con vetas
  madera(0, 120, 319, 179); R.rect(0, 120, 319, 121, hex('#c88a50')); R.rect(0, 122, 319, 122, hex('#4a2a14'));
  // el bote de los lápices (vacío: solo una regla y un pincel) y la libreta
  R.rect(22, 132, 38, 158, K); R.rect(23, 133, 37, 157, hex('#3a6a8a')); R.rect(23, 133, 26, 157, hex('#5a8aaa')); R.rect(23, 154, 37, 157, hex('#2a4a66'));
  R.rect(27, 112, 29, 133, K); R.rect(28, 113, 28, 132, hex('#e8d090')); for (let y = 115; y < 132; y += 3) R.pset(28, y, hex('#8a6a3a'));
  R.linea(33, 133, 35, 118, hex('#6a3a1a')); R.rect(34, 114, 36, 118, hex('#2a2a2a'));
  R.poligono([[40, 168], [76, 164], [80, 176], [44, 179]], K); R.poligono([[41, 168], [75, 165], [78, 175], [45, 178]], hex('#f2ead6'));
  for (let i = 0; i < 4; i++) R.linea(46, 170 + i * 2, 74, 167 + i * 2, hex('#b8c8e0'));
});
const p1 = (t) => {
  fondo1();
  // por la ventana: cielo, estrellas, la luna y la ciudad con ventanas que se encienden; pasa un avión
  R.recorte([12, 14, 80, 88]);
  estrellas(t, 12, 14, 80, 60, 26, 3); R.disco(66, 26, 6, hex('#f6f0d0')); R.disco(64, 25, 5, hex('#fffbe8')); R.pset(67, 28, hex('#d8d0b0'));
  for (let i = 0; i < 9; i++) { const x0 = 10 + i * 8, alto = 18 + Math.round(h(i, 4, 8) * 22); R.poligono([[x0, 88], [x0, 88 - alto], [x0 + 7, 88 - alto], [x0 + 7, 88]], hex('#141a30'));
    for (let y = 92 - alto; y < 86; y += 4) for (let x = x0 + 2; x < x0 + 6; x += 3) if (h(x, y + Math.floor(t * 0.6 + i), 9) > 0.55) R.pset(x, y, hex('#f0c060')); }
  { const ax = Math.round(90 - ((t * 9) % 120)), ay = 40; R.linea(ax, ay, ax + 4, ay, hex('#8a8aa8')); if (Math.floor(t * 3) % 2) R.pset(ax, ay, hex('#ff5050')); }
  R.recorte(null);
  // el flexo con su cono de luz sobre la mesa
  R.linea(296, 126, 286, 96, K); R.linea(297, 126, 287, 96, hex('#2a2a3a')); R.linea(286, 96, 270, 104, K); R.rect(288, 124, 304, 128, K); R.rect(289, 125, 303, 127, hex('#3a3a4a'));
  R.poligono([[262, 100], [276, 98], [278, 108], [264, 110]], K); R.poligono([[263, 101], [275, 99], [277, 107], [265, 109]], hex('#3a6a6a'));
  for (let y = 110; y < 178; y++) for (let x = 230; x < 319; x++) { const d = Math.abs(x - (268 + (y - 110) * 0.15)) / (8 + (y - 110) * 0.55); if (d < 1 && (x + y) % 2 === 0) tin(x, y, hex('#ffe0a0'), 0.18 * (1 - d)); }
  // la taza que humea
  { const tx = 52; R.rect(tx, 140, tx + 16, 158, K); R.rect(tx + 1, 141, tx + 15, 157, hex('#e8e0d0')); R.rect(tx + 1, 141, tx + 5, 157, BL); R.rect(tx + 1, 143, tx + 15, 143, hex('#c84a3a')); R.rect(tx + 16, 145, tx + 20, 153, K); R.rect(tx + 17, 146, tx + 18, 152, hex('#e8e0d0'));
    for (let k = 0; k < 4; k++) { const f = (t * 0.7 + k / 4) % 1; R.pset(Math.round(tx + 6 + k * 2 + Math.sin(t * 3 + k + f * 4) * 2), Math.round(138 - f * 22), mez(hex('#2a2448'), hex('#d8d0e8'), 0.75 * (1 - f))); } }
  // la planta en su maceta, junto a la ventana
  R.rect(2, 106, 18, 122, K); R.rect(3, 107, 17, 121, hex('#b8603a')); R.rect(3, 107, 17, 109, hex('#d8784a'));
  for (let k = 0; k < 7; k++) { const a = -1.2 + k * 0.4 + Math.sin(t * 1.3 + k) * 0.05; R.linea(10, 107, Math.round(10 + Math.cos(a - 1.57) * 14), Math.round(107 + Math.sin(a - 1.57) * 14), k % 2 ? hex('#3a8a4a') : hex('#5aaa5a')); }
  // la pirámide de pisapapeles, pequeña, junto a la libreta
  T.PIEZAS_GZ.piramidePisapapeles(R, 100, 176, { s: 1 });
  // el portátil: pantalla grande
  const X0 = 96, X1 = 226, Y0 = 22, Y1 = 142;
  R.rect(X0 - 2, Y0 - 2, X1 + 2, Y1 + 2, K); R.rect(X0 - 1, Y0 - 1, X1 + 1, Y1 + 1, hex('#3a3a46')); R.rect(X0, Y0, X1, Y1, hex('#1c1c26')); R.pset(161, Y0 - 1, hex('#5a5a6a'));
  const S0 = [X0 + 4, Y0 + 4, X1 - 4, Y1 - 4];
  R.rect(S0[0], S0[1], S0[2], S0[3], hex('#e6e8f0'));
  // la miniatura del vídeo: plano azul con la pirámide, los pozos y el «?»
  const v0 = [S0[0] + 4, S0[1] + 4, S0[2] - 4, S0[1] + 46];
  R.rect(v0[0], v0[1], v0[2], v0[3], PZ.f2); for (let x = v0[0]; x <= v0[2]; x += 6) for (let y = v0[1]; y <= v0[3]; y += 2) R.pset(x, y, PZ.rj); for (let y = v0[1]; y <= v0[3]; y += 6) for (let x = v0[0]; x <= v0[2]; x += 2) R.pset(x, y, PZ.rj);
  R.poligono([[134, 52], [150, 34], [166, 52]], hex('#d8a050')); R.poligono([[150, 34], [166, 52], [150, 52]], hex('#a8783a'));
  R.linea(110, 52, 210, 52, PZ.ci);
  for (let i = 0; i < 4; i++) { const x = 140 + i * 7; R.linea(x, 53, x, 66, PZ.ci); for (let y = 54 + ((Math.floor(t * 6) + i) % 3); y < 66; y += 3) R.pset(x + 1, y, PZ.br); }
  R.icono('?', 186, 36, PZ.br, PZ.f0, 2);
  { const u = (t / 10) % 1; R.rect(v0[0], v0[3] + 2, v0[2], v0[3] + 3, hex('#b8bcc8')); R.rect(v0[0], v0[3] + 2, Math.round(v0[0] + (v0[2] - v0[0]) * (0.62 + u * 0.3)), v0[3] + 3, hex('#3aa8d8')); }
  // los comentarios: burbujas con avatar e icono; suben uno a uno
  const tipos = [['?', '#e8a030'], ['pir', '#3a8ad8'], ['!', '#d84a6a'], ['?', '#4aa86a'], ['abajo', '#8a5ad8'], ['?', '#d8a03a'], ['!', '#3ab8b8'], ['pir', '#c86a3a']];
  const tiempos = [-1.2, -0.6, coment, coment + 0.55, abajo - 0.2, abajo + 0.45, abajo + 0.9, abajo + 1.3];
  const L0 = v0[3] + 6, LH = 15, vis = 4;
  let n = 0; for (const tt of tiempos) if (t >= tt) n++;
  const ult = tiempos[n - 1], des = Math.round((1 - suave(Math.min(1, (t - ult) / 0.3))) * LH);
  R.recorte([S0[0], L0, S0[2], S0[3]]);
  for (let k = Math.max(0, n - vis - 1); k < n; k++) { const fila = k - (n - vis), y = L0 + fila * LH + des; if (y > S0[3] + 2) continue;
    const [ic, col] = tipos[k % tipos.length], ax = S0[0] + 8, ay = y + 7;
    R.disco(ax, ay, 5, K); R.disco(ax, ay, 4, hex(col)); R.pset(ax - 2, ay - 1, K); R.pset(ax + 1, ay - 1, K); R.linea(ax - 1, ay + 2, ax + 1, ay + 2, K);
    const bx0 = ax + 9, bx1 = bx0 + 30 + (k * 7) % 22; rc(bx0, y + 2, bx1, y + 12, hex('#9aa0b4')); rc(bx0 + 1, y + 3, bx1 - 1, y + 11, BL); R.pset(bx0 - 1, y + 8, hex('#9aa0b4'));
    if (ic === '?' || ic === '!') R.icono(ic, bx0 + 4, y + 3, hex(col), hex('#d8dae6'));
    else if (ic === 'pir') { R.poligono([[bx0 + 4, y + 10], [bx0 + 8, y + 4], [bx0 + 12, y + 10]], hex('#d8a050')); R.linea(bx0 + 8, y + 4, bx0 + 12, y + 10, hex('#a8783a')); }
    else { R.linea(bx0 + 7, y + 3, bx0 + 7, y + 10, hex(col)); R.linea(bx0 + 4, y + 7, bx0 + 7, y + 10, hex(col)); R.linea(bx0 + 10, y + 7, bx0 + 7, y + 10, hex(col)); R.icono('?', bx0 + 13, y + 3, hex(col), hex('#d8dae6')); }
    for (let i = 0; i < 2; i++) R.linea(bx0 + 22, y + 5 + i * 3, bx1 - 3 - i * 4, y + 5 + i * 3, hex('#c8ccd8'));
    // el corazón con su cuenta de puntos
    const corazon = k === n - 1 && t - ult < 0.5 ? hex('#ff5a7a') : hex('#e88aa0'); R.pset(S0[2] - 10, y + 6, corazon); R.pset(S0[2] - 8, y + 6, corazon); R.linea(S0[2] - 11, y + 7, S0[2] - 7, y + 7, corazon); R.linea(S0[2] - 10, y + 8, S0[2] - 8, y + 8, corazon); R.pset(S0[2] - 9, y + 9, corazon); }
  R.recorte(null);
  // reflejo en la pantalla y la base del portátil con el teclado
  for (let i = 0; i < 18; i++) tin(S0[2] - 30 + i, S0[1] + 2 + i * 2, BL, 0.18);
  R.poligono([[X0 - 10, 160], [X1 + 10, 160], [X1 + 2, Y1 + 3], [X0 - 2, Y1 + 3]], K); R.poligono([[X0 - 8, 159], [X1 + 8, 159], [X1 + 1, Y1 + 4], [X0 - 1, Y1 + 4]], hex('#9a9aa8'));
  for (let r = 0; r < 3; r++) for (let x = X0 + 4 + r * 2; x < X1 - 4 - r * 2; x += 5) R.rect(x, Y1 + 6 + r * 4, x + 3, Y1 + 8 + r * 4, hex('#4a4a56'));
  R.rect(X0 - 10, 160, X1 + 10, 162, hex('#6a6a78')); R.rect(150, 158, 172, 159, hex('#7a7a88'));
  // el gato, junto a la taza: mira la burbuja que sube y le da un zarpazo
  // el gato dormido, enroscado bajo el flexo: respira, mueve la cola; abre un ojo y levanta la oreja en «down there»
  { const gx = 268, gy = 158, r = Math.sin(t * 2.2) * 1.2, oj = t > abajo - 0.1 && t < abajo + 1.2, G = RA('#5a3a20', '#8a5a2e', '#b87a40', '#d89a58', '#ecc088');
    R.poligono(Array.from({ length: 24 }, (_, i) => { const a = i / 24 * 6.283; return [gx + Math.cos(a) * (28 + r), gy + 2 + Math.sin(a) * (13 + r * 0.6)]; }), K);
    R.poligono(Array.from({ length: 24 }, (_, i) => { const a = i / 24 * 6.283; return [gx + Math.cos(a) * (27 + r), gy + 2 + Math.sin(a) * (12 + r * 0.6)]; }), (x, y) => tono(G, 3.2 - (y - gy + 12) / 9 + (Math.sin((x - gx) * 0.5) > 0.6 ? -1 : 0), x, y));
    // la cola, que se mueve
    const ca = Math.sin(t * 1.6) * 6; R.linea(gx + 24, gy + 8, gx + 10, gy + 14 + Math.round(ca / 3), K); for (let i = 0; i < 14; i++) R.disco(Math.round(gx + 24 - i * 2.2 + Math.sin(i * 0.4 + t) * 1), Math.round(gy + 10 + i * 0.3 + ca * i / 30), 2.2, i % 4 < 2 ? hex('#b87a40') : hex('#6a4420'));
    // la cabeza con las orejas
    const hx = gx - 22, hy = gy - 2 + Math.round(r * 0.5); R.disco(hx, hy, 9, K); R.disco(hx, hy, 8, (x, y) => tono(G, 3 - (y - hy + 8) / 6, x, y));
    const ore = oj ? -3 : 0; R.poligono([[hx - 8, hy - 4], [hx - 6, hy - 13 + ore], [hx - 1, hy - 7]], K); R.poligono([[hx - 7, hy - 5], [hx - 6, hy - 11 + ore], [hx - 2, hy - 7]], hex('#d89a58')); R.pset(hx - 6, hy - 8 + ore, hex('#e8a0a0'));
    R.poligono([[hx + 1, hy - 7], [hx + 5, hy - 13], [hx + 8, hy - 4]], K); R.poligono([[hx + 2, hy - 7], [hx + 5, hy - 11], [hx + 7, hy - 5]], hex('#d89a58'));
    if (oj) { R.rect(hx - 5, hy - 1, hx - 2, hy + 1, K); R.rect(hx - 4, hy - 1, hx - 3, hy, hex('#8ad848')); } else R.linea(hx - 5, hy, hx - 2, hy, K);
    R.linea(hx + 2, hy, hx + 5, hy, K); R.pset(hx, hy + 3, hex('#e86a7a')); R.linea(hx - 10, hy + 3, hx - 14, hy + 2, hex('#f4e8d0')); R.linea(hx - 10, hy + 4, hx - 14, hy + 5, hex('#f4e8d0'));
    if (!oj) for (let k = 0; k < 2; k++) { const z = (t * 0.5 + k * 0.5) % 1; R.anillo(hx - 6 + Math.round(z * 8), Math.round(hy - 14 - z * 14), 1 + Math.round(z * 2), mez(hex('#2a2448'), hex('#c8d8f0'), 1 - z)); } }
};
// ── plano 2: el gag de la linterna ──
const p2 = (t) => {
  const MANGA = '#3a6ad8';
  const lev = tramo(t, mirando - 0.1, mirando + 0.45), lleva = tramo(t, coge + 0.1, piram), enc = t > piram + 0.25;
  const o = { encuadre: 'estudio', camara: 'mesa', abre: lev, lapiz: false, linterna: t < coge ? true : false };
  T.hoy(R, t, o);
  // la goma de borrar que la mano deja calzando la punta levantada
  if (lev >= 1) { R.rect(178, 112, 185, 129, K); R.rect(179, 113, 184, 128, hex('#e88a9a')); R.rect(179, 113, 180, 128, hex('#f8b8c0')); R.rect(179, 121, 184, 128, hex('#5a7ad8')); }
  // el hueco: oscuro; con la linterna, se ilumina y dentro brilla el lápiz
  const hx = 168, hy = 129;
  if (lev > 0.5) { R.disco(hx, hy, 9 * lev, hex('#120c08')); R.disco(hx, hy + 1, 7 * lev, hex('#22160c'));
    if (enc) { const g = tramo(t, piram + 0.25, oh); R.halo(hx, hy, 14, [hex('#5a4020'), hex('#b8903a'), hex('#ffe8a0')], 1.2 * g); } }
  // el lápiz: brilla dentro en «Oh!» y salta, cae y rueda hasta parar en «pencil»
  const sal = tramo(t, oh + 0.15, lapiz - 0.05), rueda = tramo(t, lapiz - 0.05, lapiz + 0.6);
  if (t > oh - 0.1) {
    let lx, ly;
    if (sal < 1) { lx = lerp(hx - 6, 132, sal); ly = lerp(hy + 2, 176, sal) - Math.sin(sal * Math.PI * 0.85) * 22; }
    else { lx = lerp(132, 150, suave(rueda)); ly = 176 - Math.abs(Math.sin(rueda * Math.PI * 2)) * 4 * (1 - rueda); }
    if (sal <= 0) R.recorte([hx - 9, hy - 6, hx + 9, hy + 3]);
    if (sal >= 1) R.halo(Math.round(lx), Math.round(ly) - 4, 20, [hex('#6a4a2a'), hex('#b8903a'), hex('#ffe8a0')], 0.7 * (1 - tramo(t, lapiz + 0.8, lapiz + 1.8) * 0.6));
    T.PIEZAS_GZ.lapiz(R, Math.round(lx), Math.round(ly + (sal <= 0 ? -2 + tramo(t, oh - 0.1, oh + 0.15) * -3 : 0)), { s: 3, dir: sal > 0 && sal < 1 && Math.sin(sal * 9) > 0 ? -1 : 1 });
    R.recorte(null);
    // los destellos del hallazgo
    if (t > oh && t < lapiz + 1.6) for (let k = 0; k < 6; k++) { const a = k * 1.047 + t * 3, r = 12 + Math.sin(t * 9 + k) * 3, cx = sal < 1 ? hx : Math.round(lx), cy = sal < 1 ? hy - 4 : Math.round(ly) - 4;
      R.pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.7), k % 2 ? hex('#fff4b0') : BL); }
  }
  // la mano canónica: entra por la derecha, levanta la punta, coge la linterna y la mete por el hueco
  const entra = tramo(t, P2 + 0.05, mirando - 0.1);
  let wx, wy;
  if (t < mirando - 0.1) { wx = lerp(340, 186, suave(entra)); wy = lerp(150, 112, suave(entra)); }
  else if (t < coge - 0.35) { wx = 186; wy = 112 - lev * 16; }
  else if (t < coge) { const u = tramo(t, coge - 0.35, coge); wx = lerp(186, 236, suave(u)); wy = lerp(96, 142, suave(u)); }
  else { wx = lerp(236, 196, suave(lleva)); wy = lerp(142, 122, suave(lleva)) - (t > lapiz + 0.4 ? 0 : 0); }
  const hombro = [Math.round(wx + 24), 206];
  // la linterna en la mano (apuntando al hueco, hacia la izquierda), por debajo de los dedos
  if (t >= coge) T.PIEZAS_GZ.linterna(R, Math.round(wx - 10), Math.round(wy + 7), { s: 2, dir: -1, encendida: enc, haz: false });
  T.hoyDelante(R, t, o);
  T.brazo(R, hombro[0], hombro[1], Math.round(wx), Math.round(wy), MANGA, -1, { codo: [Math.round(wx + 30), Math.round(wy + 36)] });
};
const efectos = [[coment, 'pop'], [coment + 0.7, 'golpecito'], [abajo - 0.15, 'pop'], [mirando + 0.05, 'toc'], [coge, 'golpecito'], [piram + 0.25, 'interruptor'], [oh, 'brillo'], [oh + 0.2, 'boing'], [lapiz, 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2]], { efectos, año: 2026 });
''')

# ───────────────────────────────────────────────────────────── gz-mataha ──
E['gz-mataha'] = ('Hawara 2008', '''// GZ-MATAHA (frase 26), Hawara 2008 (barra 2008), sin cartela. Cuatro planos:
// 1. (LOCAL) el campamento de 2008 sobre la losa de Hawara: el todoterreno con el portón abierto en primer término, el
//    belga baja una caja y la lleva, el geofísico desenrolla el cable; en «Belgian» sube la bandera belga y en «Egyptian»
//    la egipcia; al fondo, los campos verdes del Fayum, palmeras, el alminar del pueblo y la pirámide de adobe, diminuta.
//    Nubes, milanos. Corta en «scanned».
// 2. (LOCAL) el escaneo en corte: arriba, la losa con los electrodos en fila y el cable; el geofísico pone en marcha el
//    aparato y bajan los pulsos por la tierra (en estilo real: arena, grava, arcilla); en «according to its organizers»
//    el belga mira su tableta y el subsuelo se vuelve plano azul (según ellos): rejilla, barrido y un «?». Corta en «saw».
// 3. plano/mataha: en «walls» los muros enterrados se dibujan en la rejilla bajo la losa; el belga, en la tarima, señala;
//    el geofísico mira con su aparato. Corta en «never».
// 4. (LOCAL) la mesa de campo en la tienda: el portátil con la rejilla azul y un «?» grande que late; al lado, la tablilla de
//    «otros equipos» con tres casillas vacías y un 0 que parpadean en «independently confirmed»; en «might be there» el
//    «?» crece; en «nobody has proven» el belga baja los hombros. La lámpara se mece, la lona ondea.''', HELP + EXTRA + r'''
const P2 = en('mataha', .229), P3 = en('mataha', .438), P4 = en('mataha', .691);
const belga = en('mataha', .133), egip = en('mataha', .170), segun = en('mataha', .338), muros = en('mataha', .448), cimiento = en('mataha', .591);
const indep = en('mataha', .720), conf = en('mataha', .752), algo = en('mataha', .844), nadie = en('mataha', .937);
const CIELO = RA('#5c96d8', '#74a6de', '#8cb6e4', '#a6c6ea', '#c2d6ec', '#dcdcd0');
const ARENA = RA('#a8885a', '#bc9a68', '#ceac78', '#dcbc88', '#e8cc9a');
// los pliegues de una bandera: colores en franjas (vert: verticales) que ondean
const bandera = (x, y, u, cols, vert, t) => { if (u <= 0) return; const yy = Math.round(lerp(y + 26, y, u)); R.rect(x - 1, y - 2, x, y + 34, K); R.rect(x, y - 1, x, y + 34, hex('#c8c8c8'));
  for (let i = 0; i < 14; i++) for (let j = 0; j < 9; j++) { const ondula = Math.round(Math.sin(i * 0.6 - t * 6) * 1.2 * i / 14), c = vert ? cols[Math.min(2, Math.floor(i / 14 * 3))] : cols[Math.min(2, Math.floor(j / 9 * 3))];
    R.pset(x + 1 + i, yy + j + ondula, (i + j) % 5 === 0 ? mez(hex(c), K, 0.15) : hex(c)); } };
// ── plano 1: el campamento ──
const fondo1 = () => capa('m1', () => {
  cieloT(78, CIELO);
  // la franja del Fayum: campos verdes, palmeras, casas y el alminar
  for (let y = 70; y < 84; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#4a7a3a', '#5e8e44', '#78a050', '#94b060'), 1.6 + Math.sin(x * 0.07 + y) * 0.8 + (h(x >> 3, y, 4) - 0.5), x, y));
  for (let i = 0; i < 22; i++) { const px = Math.round(60 + h(i, 1, 9) * 250), py = 72 + Math.round(h(i, 2, 9) * 4); R.linea(px, py, px + 1, py - 9, hex('#6a4a2a')); for (const d of [-4, -2, 2, 4]) R.linea(px + 1, py - 9, px + 1 + d, py - 7 + Math.abs(d) / 3, hex('#3a6a2a')); }
  for (let i = 0; i < 6; i++) { const x0 = 196 + i * 14, hh = 5 + (i % 3) * 2; R.rect(x0, 76 - hh, x0 + 10, 76, hex('#d8c4a0')); R.rect(x0, 76 - hh, x0 + 10, 76 - hh, hex('#a88a60')); R.pset(x0 + 3, 73 - hh + 4, hex('#3a2a1a')); R.pset(x0 + 7, 73 - hh + 4, hex('#3a2a1a')); }
  R.rect(262, 52, 265, 74, hex('#e8dcc4')); R.rect(261, 50, 266, 52, hex('#c8b490')); R.rect(263, 46, 264, 49, hex('#e8dcc4')); R.pset(263, 45, hex('#5a8a5a'));
  // la pirámide de adobe, lejos y gastada
  R.poligono([[4, 80], [26, 60], [32, 58], [56, 80]], hex('#8a7058')); R.poligono([[30, 58], [56, 80], [34, 80]], hex('#6e5844')); for (let y = 62; y < 80; y += 3) R.linea(20 - (y - 62) / 2, y, 44 + (y - 62) / 2, y, hex('#7a6250'));
  // la losa y la llanura de esquirlas
  for (let y = 80; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 1.4 + (y - 80) / 100 * 2 + (h(x >> 2, y >> 1, 5) - 0.5) * 0.9; R.pset(x, y, tono(ARENA, v, x, y)); if (h(x, y, 7) > 0.985 - (y - 80) / 4000) { R.pset(x, y, hex('#f4ecd8')); if (y > 110) R.pset(x + 1, y, hex('#b8a080')); } }
  for (let i = 0; i < 14; i++) { const x = Math.round(h(i, 3, 2) * 300), y = 96 + Math.round(h(i, 4, 2) * 70), w = 3 + (i % 4); R.rect(x, y, x + w, y + 1, hex('#e8dcc0')); R.rect(x, y + 2, x + w, y + 2, hex('#9a8060')); }
  // la cerca de alambre con postes
  for (let x = 6; x < 320; x += 26) { R.rect(x, 86, x + 1, 98, hex('#5a4a3a')); } R.linea(0, 89, 319, 89, hex('#8a8a8a')); R.linea(0, 94, 319, 94, hex('#7a7a7a'));
  // la tienda del campamento
  R.poligono([[66, 112], [94, 86], [122, 112]], K); R.poligono([[68, 111], [94, 88], [120, 111]], hex('#d8c8a0')); R.poligono([[94, 88], [120, 111], [94, 111]], hex('#b8a47a'));
  R.poligono([[88, 111], [94, 98], [100, 111]], hex('#4a3a2a')); R.linea(94, 86, 94, 111, hex('#8a7a5a'));
  // el todoterreno de espaldas, con el portón abierto: cajas dentro
  const jx = 214, jy = 160;
  R.rect(jx - 2, jy - 62, jx + 92, jy + 2, K); R.rect(jx, jy - 60, jx + 90, jy - 18, hex('#e8e6de')); R.rect(jx, jy - 60, jx + 90, jy - 56, hex('#c8c6be'));
  R.rect(jx + 6, jy - 54, jx + 84, jy - 24, hex('#2a2a30')); R.rect(jx + 8, jy - 52, jx + 82, jy - 26, hex('#3a3a44'));
  for (const [cx, cw, cc] of [[12, 22, '#e8b830'], [36, 18, '#3a6ab0'], [56, 24, '#5a5a62']]) { R.rect(jx + cx, jy - 44, jx + cx + cw, jy - 27, K); R.rect(jx + cx + 1, jy - 43, jx + cx + cw - 1, jy - 28, hex(cc)); R.rect(jx + cx + cw / 2 - 2, jy - 45, jx + cx + cw / 2 + 2, jy - 44, K); }
  R.rect(jx, jy - 18, jx + 90, jy - 6, hex('#b8b6ae')); R.rect(jx + 2, jy - 16, jx + 10, jy - 12, hex('#e83a2a')); R.rect(jx + 80, jy - 16, jx + 88, jy - 12, hex('#e83a2a')); R.rect(jx + 34, jy - 15, jx + 56, jy - 10, hex('#f0e8c0'));
  R.rect(jx - 4, jy - 6, jx + 94, jy - 2, hex('#3a3a40'));
  for (const wx of [jx + 4, jx + 72]) { R.rect(wx, jy - 4, wx + 14, jy + 6, K); R.rect(wx + 2, jy - 2, wx + 12, jy + 4, hex('#2a2a2a')); }
  // el portón abierto hacia arriba
  R.poligono([[jx + 2, jy - 62], [jx + 88, jy - 62], [jx + 82, jy - 80], [jx + 8, jy - 80]], K); R.poligono([[jx + 4, jy - 63], [jx + 86, jy - 63], [jx + 80, jy - 78], [jx + 10, jy - 78]], hex('#d8d6ce'));
  R.poligono([[jx + 14, jy - 66], [jx + 76, jy - 66], [jx + 72, jy - 75], [jx + 18, jy - 75]], hex('#5a7a9a'));
  // la rueda de repuesto y la sombra
  for (let y = jy + 3; y < jy + 9; y++) for (let x = jx - 6; x < jx + 98; x++) if ((x + y) % 2 === 0) tin(x, y, K, 0.35);
});
const p1 = (t) => {
  fondo1();
  nubes(t, [[20, 22, 26, 2], [150, 40, 34, 3.5], [240, 58, 20, 6]]);
  T.bandada(R, t, { tipo: 'milano', n: 2, y: 34, cada: 7 });
  // las banderas suben en «Belgian» y en «Egyptian»
  bandera(134, 70, tramo(t, belga - 0.3, belga + 0.5), ['#1a1a1a', '#f0d020', '#e02a2a'], true, t);
  bandera(156, 70, tramo(t, egip - 0.2, egip + 0.6), ['#d0202a', '#f6f6f6', '#1a1a1a'], false, t);
  // un coche pasa lejos por la carretera del Fayum, con su polvo
  { const cx = Math.round(((t * 18) % 360) - 20); R.rect(cx, 76, cx + 6, 78, hex('#c84a3a')); for (let k = 1; k < 5; k++) tin(cx - k * 3, 77 - (k % 2), hex('#e8dcc0'), 0.5 - k * 0.1); }
  // el geofísico desenrolla el cable hacia la izquierda
  const u = tramo(t, 0.3, P2 - 0.4), gx = Math.round(lerp(176, 64, u));
  R.disco(188, 150, 6, K); R.disco(188, 150, 5, hex('#e8a030')); R.disco(188, 150, 2, hex('#5a3a1a')); R.pset(Math.round(188 + Math.cos(t * 6) * 4), Math.round(150 + Math.sin(t * 6) * 4), hex('#5a3a1a'));
  for (let x = gx + 8; x < 188; x++) R.pset(x, 157 + Math.round(Math.sin(x * 0.3) * 0.6), hex('#2a2a2a'));
  for (let x = 176; x > gx + 8; x -= 26) { R.rect(x, 150, x, 157, hex('#8a8a90')); R.pset(x, 149, hex('#e83a2a')); }
  R.actor(EL.geofisico2008, gx, 160, t, { dir: -1, anda: u > 0 && u < 1, sonrisa: u >= 1 });
  // el belga baja una caja del todoterreno y la lleva hacia la tienda
  const v = tramo(t, 0.8, P2 - 0.2), bx = Math.round(lerp(236, 132, v));
  const B = R.actor(EL.belga2008, bx, 168, t, { dir: -1, anda: v > 0 && v < 1, sostiene: true, habla: v >= 1 });
  R.rect(B.mano[0] - 7, B.mano[1] - 4, B.mano[0] + 3, B.mano[1] + 3, K); R.rect(B.mano[0] - 6, B.mano[1] - 3, B.mano[0] + 2, B.mano[1] + 2, hex('#e8b830')); R.rect(B.mano[0] - 6, B.mano[1] - 3, B.mano[0] + 2, B.mano[1] - 3, hex('#f8d860'));
};
// ── plano 2: el escaneo en corte ──
const SUP = 62;
const fondo2 = () => capa('m2', () => {
  cieloT(SUP, RA('#7aa8de', '#90b8e4', '#a8c8ea', '#c8d8e8', '#e0dccc'));
  R.poligono([[0, SUP], [0, SUP - 8], [40, SUP - 10], [90, SUP - 6], [140, SUP - 9], [200, SUP - 5], [260, SUP - 8], [320, SUP - 6], [320, SUP]], hex('#c8b088'));
  // la tierra en estratos (estilo real): arena, grava, arcilla, roca
  const CAPAS = [[SUP, RA('#d8b884', '#c8a470', '#e4c898')], [SUP + 18, RA('#b89060', '#a07a50', '#c8a070')], [SUP + 52, RA('#9a6a48', '#86583a', '#ae7c58')], [SUP + 86, RA('#7a6a5a', '#665848', '#8e7e6c')]];
  for (let y = SUP; y < 180; y++) for (let x = 0; x < 320; x++) { let k = 0; for (let i = 0; i < CAPAS.length; i++) if (y >= CAPAS[i][0] + Math.round(Math.sin(x * 0.04 + i) * 3)) k = i;
    R.pset(x, y, tono(CAPAS[k][1], 1 + (h(x >> 1, y >> 1, k + 11) - 0.5) * 1.6, x, y)); }
  for (let i = 0; i < 90; i++) { const x = Math.round(h(i, 1, 13) * 320), y = SUP + 20 + Math.round(h(i, 2, 13) * 96), r = 1 + Math.round(h(i, 3, 13) * 2); R.disco(x, y, r + 0.5, hex('#5a4a3a')); R.disco(x, y, r - 0.3, hex('#d8c8b0')); }
  R.linea(0, SUP, 319, SUP, hex('#f0dcb0')); R.linea(0, SUP + 1, 319, SUP + 1, hex('#8a6a48'));
  // la losa de Petrie: un filo de piedra bajo la superficie
  for (let x = 20; x < 300; x++) { R.pset(x, SUP + 6, hex('#e8e0cc')); R.pset(x, SUP + 7, hex('#b8ac94')); if (x % 23 === 0) R.rect(x, SUP + 4, x, SUP + 8, hex('#8a7e6a')); }
});
const ELEC = [40, 72, 104, 136, 168, 200, 232, 264];
const p2 = (t) => {
  fondo2();
  nubes(t, [[40, 30, 22, 3], [200, 26, 28, 5]]);
  // la zona que «según ellos» ya es plano azul: se abre desde la tableta del belga en «according to its organizers»
  const az = tramo(t, segun - 0.1, segun + 1.0), cx = 236, cy = 118, rr = az * 150;
  if (az > 0) {
    for (let y = SUP + 9; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - cx) / 1.4, y - cy); if (d > rr) continue;
      const g = (x % 8 === 0 || y % 8 === 0) && (x + y) % 2 === 0; R.pset(x, y, g ? PZ.rj : tono([PZ.f1, PZ.f2, PZ.f3], 1.2 + (h(x >> 3, y >> 3, 2) - 0.5), x, y));
      if (d > rr - 2) R.pset(x, y, PZ.ci); }
    const P = pluma(); R.recorte([0, SUP + 9, 319, 179]);
    for (let k = 0; k < 3; k++) { const yy = SUP + 30 + k * 28; if (rr > 60 + k * 30) P.l(60, yy, 290, yy, 'D', 4); }
    P.pintar(t); R.recorte(null);
    if (az > 0.6) preguntaG(150, 108, 3, t);
  }
  // los electrodos en fila, con el cable, y sus pulsos que bajan
  R.linea(30, SUP - 3, 274, SUP - 3, hex('#2a2a2a'));
  const marcha = en('mataha', .229) + 0.4;
  for (let i = 0; i < ELEC.length; i++) { const x = ELEC[i]; R.rect(x, SUP - 6, x, SUP + 6, hex('#9a9aa2')); R.rect(x - 1, SUP - 7, x + 1, SUP - 6, hex('#c84a3a'));
    const on = t > marcha && Math.floor(t * 4 + i * 0.5) % ELEC.length === i; if (on) { R.pset(x, SUP - 8, hex('#ffe060')); R.pset(x - 1, SUP - 8, hex('#ffb030')); R.pset(x + 1, SUP - 8, hex('#ffb030')); }
    if (t > marcha) for (let k = 0; k < 2; k++) { const f = ((t - marcha) * 0.6 + i * 0.13 + k * 0.5) % 1, r = 6 + f * 60; R.recorte([0, SUP + 9, 319, 179]);
      for (let a = 0.35; a < 2.8; a += 0.04) { const px = Math.round(x + Math.cos(a) * r), py = Math.round(SUP + 4 + Math.sin(a) * r * 0.8); const dentro = az > 0 && Math.hypot((px - cx) / 1.4, py - cy) < rr; tin(px, py, dentro ? PZ.br : hex('#fffae0'), 0.9 * (1 - f)); }
      R.recorte(null); } }
  // los dos del equipo: el geofísico enciende el aparato, el belga mira la tableta y habla
  const G = R.actor(EL.geofisico2008, 76, SUP - 1, t, { dir: 1, sostiene: t < marcha ? [92, SUP - 14] : true, sorpresa: t > marcha && t < marcha + 0.5 });
  aparato(G.mano); if (t > marcha) R.pset(G.mano[0] + 1, G.mano[1] - 2, Math.floor(t * 5) % 2 ? hex('#5ae070') : hex('#2a6a3a'));
  const bv = tramo(t, P2 + 0.1, segun - 0.4);
  R.actor(EL.belga2008, Math.round(lerp(300, 226, bv)), SUP - 1, t, { dir: -1, anda: bv > 0 && bv < 1, habla: t > segun && t < P3 - 0.3 && Math.sin(t * 9) > -0.3, dedo: t > segun + 0.9 && t < P3 - 0.1 });
};
// ── plano 3: el plano azul de Hawara ──
const p3 = (t) => {
  const o = { encuadre: 'mataha', muros: tramo(t, muros - 0.2, cimiento + 0.4) };
  T.plano(R, t, o);
  R.actor(EL.belga2008, 52, 172, t, { dir: 1, dedo: t > muros - 0.2 && t < cimiento + 0.6, habla: t > muros && Math.sin(t * 8) > 0 && t < P4 - 0.3, sonrisa: t > cimiento + 0.6 });
  const G = R.actor(EL.geofisico2008, 248, 172, t, { dir: -1, sostiene: true, sorpresa: t > muros && t < muros + 0.7 });
  aparato(G.mano); R.pset(G.mano[0], G.mano[1] - 2, Math.floor(t * 5) % 2 ? PZ.br : PZ.co);
  T.planoDelante(R, t, o);
};
// ── plano 4: la mesa de campo en la tienda ──
const LONA = RA('#8a7a5a', '#a08e68', '#b8a47a', '#ccb88c', '#dccaa0');
const fondo4 = () => capa('m4', () => {
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { let v = 2.2 + (h(x >> 4, y >> 5, 6) - 0.5) * 0.8 - Math.abs(x - 160) / 260 + (x % 64 < 2 ? -1.2 : 0) + (y % 40 === 0 ? -0.6 : 0); R.pset(x, y, tono(LONA, v, x, y)); }
  // la abertura de la tienda (la puerta) con la noche del desierto y la pirámide lejos
  R.rect(14, 22, 74, 128, hex('#3a2e20'));
  // el mástil
  R.rect(158, 0, 161, 128, K); R.rect(159, 0, 160, 128, hex('#8a6a3a'));
  // la tablilla de los otros equipos: tres casillas vacías
  R.rect(222, 46, 262, 98, K); R.rect(223, 47, 261, 97, hex('#b8844a')); R.rect(226, 52, 258, 94, hex('#f2ead6')); R.rect(236, 44, 248, 50, hex('#9a9aa2'));
  for (let k = 0; k < 3; k++) { R.rect(230, 58 + k * 11, 237, 65 + k * 11, hex('#3a3a46')); R.rect(231, 59 + k * 11, 236, 64 + k * 11, hex('#f2ead6')); R.linea(240, 61 + k * 11, 254, 61 + k * 11, hex('#b8c0d0')); R.linea(240, 63 + k * 11, 250, 63 + k * 11, hex('#b8c0d0')); }
  // el plano de la losa a lápiz, clavado en la lona, y la mochila colgada
  R.rect(88, 26, 146, 66, K); R.rect(89, 27, 145, 65, hex('#f2ead6')); for (let x = 92; x < 144; x += 6) R.linea(x, 30, x, 62, hex('#c8d0dc')); for (let y = 30; y < 64; y += 6) R.linea(92, y, 142, y, hex('#c8d0dc'));
  R.poligono([[96, 60], [118, 34], [140, 60]], hex('#e0d0b0')); R.linea(96, 60, 118, 34, hex('#5a4a3a')); R.linea(118, 34, 140, 60, hex('#5a4a3a')); R.linea(96, 60, 140, 60, hex('#5a4a3a'));
  for (const [x, y] of [[104, 52], [124, 46], [132, 56]]) { R.anillo(x, y, 3, hex('#c84a3a')); } R.pset(117, 27, hex('#e83a2a')); R.pset(144, 28, hex('#3a6ab0'));
  R.rect(286, 60, 312, 98, K); R.rect(287, 61, 311, 97, hex('#3a6a4a')); R.rect(287, 61, 311, 66, hex('#4a8a5a')); R.rect(290, 76, 308, 92, hex('#2a5a3a')); R.rect(297, 56, 301, 60, K); R.rect(292, 98, 294, 106, hex('#2a5a3a'));
  for (let y = 0; y < 128; y += 2) { R.pset(64 * 1 + ((y >> 1) % 2), y, hex('#6a5a3e')); R.pset(256 + ((y >> 1) % 2), y, hex('#6a5a3e')); }
  // el suelo de esterilla
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#6a4a2a', '#7e5a34', '#946a3e', '#a87a48'), 1.6 + ((x + y * 2) % 6 < 3 ? 0.5 : -0.3) + (y - 128) / 40, x, y));
  // la caja de transporte y el carrete en el suelo
  R.rect(12, 140, 52, 170, K); R.rect(13, 141, 51, 169, hex('#e8b830')); R.rect(13, 141, 51, 144, hex('#f8d860')); R.rect(28, 136, 36, 141, K);
  R.disco(290, 160, 12, K); R.disco(290, 160, 11, hex('#e8a030')); R.disco(290, 160, 7, hex('#2a2a2a')); R.disco(290, 160, 3, hex('#9a9aa2'));
});
const p4 = (t) => {
  fondo4();
  // por la abertura: el desierto al anochecer, la pirámide de adobe, estrellas, la lona que ondea
  R.recorte([14, 22, 74, 127]);
  for (let y = 22; y < 128; y++) R.linea(14, y, 74, y, tono(RA('#2a2a5a', '#5a4a7a', '#a8687a', '#e8a070'), (y - 22) / 70 * 3.4, 14, y));
  for (let y = 22; y < 128; y++) for (let x = 14; x <= 74; x++) R.pset(x, y, tono(RA('#2a2a5a', '#4a3a6a', '#8a5a7a', '#d08a70', '#e8a868'), (y - 22) / 68 * 4.2, x, y));
  estrellas(t, 14, 22, 74, 60, 10, 5);
  R.poligono([[20, 100], [40, 84], [62, 100]], hex('#4a3a3a')); R.poligono([[40, 84], [62, 100], [46, 100]], hex('#3a2a30'));
  for (let y = 100; y < 128; y++) R.linea(14, y, 74, y, tono(RA('#5a4030', '#6a4a36', '#7a5a40'), (y - 100) / 10, 14, y));
  R.recorte(null);
  const ond = Math.sin(t * 2.4) * 3;
  R.poligono([[14, 20], [74, 20], [74 + ond, 64], [62, 26], [26, 26], [14 - ond * 0.5, 70]], hex('#a08e68')); R.linea(74, 20, 74 + Math.round(ond), 64, hex('#6a5a3e')); R.linea(14, 20, 14 - Math.round(ond / 2), 70, hex('#6a5a3e'));
  // la lámpara que se mece en el mástil, con su halo y una polilla
  const a = Math.sin(t * 1.3) * 0.18, lx = Math.round(160 + Math.sin(a) * 26), ly = Math.round(10 + Math.cos(a) * 26);
  R.linea(160, 10, lx, ly - 4, K); R.halo(lx, ly + 2, 30, [hex('#8a7048'), hex('#c8a060'), hex('#f0d090')], 0.6);
  R.rect(lx - 3, ly - 4, lx + 3, ly + 4, K); R.rect(lx - 2, ly - 3, lx + 2, ly + 3, hex('#ffe890')); R.rect(lx - 2, ly - 3, lx - 1, ly + 3, BL);
  { const mx = Math.round(lx + Math.cos(t * 5) * 9), my = Math.round(ly + Math.sin(t * 7) * 6); R.pset(mx, my, hex('#5a4a3a')); R.pset(mx + (Math.floor(t * 20) % 2 ? 1 : -1), my - 1, hex('#8a7a6a')); }
  // el 0 de la tablilla y sus casillas que parpadean en «independently confirmed»
  const pid = t > indep - 0.1 && t < conf + 1.0 && Math.floor(t * 5) % 2;
  for (let k = 0; k < 3; k++) if (pid) { R.rect(230, 58 + k * 11, 237, 58 + k * 11, hex('#e83a2a')); R.rect(230, 65 + k * 11, 237, 65 + k * 11, hex('#e83a2a')); }
  R.rect(264, 100, 282, 120, K); R.rect(265, 101, 281, 119, hex('#f2ead6')); R.numero('0', 273, 118, { tam: 16, color: pid ? hex('#e83a2a') : hex('#5a3a2a'), centro: true });
  // los dos detrás de la mesa
  R.actor(EL.geofisico2008, 82, 130, t, { dir: 1, habla: t > P4 + 0.3 && t < indep && Math.sin(t * 8) > 0, dedo: t > algo && t < nadie });
  const enc = t > nadie;
  const Bg = R.actor(EL.belga2008, 196, 130, t, { dir: -1, sostiene: !enc, triste: enc, sorpresa: t > algo && t < algo + 0.6 }); if (!enc) tableta(Bg.mano);
  // la mesa plegable con el portátil: la rejilla azul y el «?»
  R.rect(84, 124, 236, 130, K); R.rect(85, 125, 235, 128, hex('#a8743a')); R.rect(85, 125, 235, 125, hex('#c8904a')); R.linea(92, 130, 112, 176, K); R.linea(228, 130, 208, 176, K); R.linea(112, 130, 92, 176, K); R.linea(208, 130, 228, 176, K);
  R.rect(104, 70, 186, 122, K); R.rect(106, 72, 184, 120, hex('#3a3a46'));
  const s0 = [109, 75, 181, 117]; R.rect(s0[0], s0[1], s0[2], s0[3], PZ.f2);
  for (let y = s0[1]; y <= s0[3]; y++) for (let x = s0[0]; x <= s0[2]; x++) if ((x - s0[0]) % 6 === 0 || (y - s0[1]) % 6 === 0) R.pset(x, y, PZ.rj);
  for (const [x0, y0, x1, y1] of [[113, 80, 135, 96], [139, 80, 177, 88], [139, 92, 177, 104], [113, 100, 135, 113], [139, 108, 159, 114]]) { R.linea(x0, y0, x1, y0, PZ.ci); R.linea(x1, y0, x1, y1, PZ.ci); R.linea(x1, y1, x0, y1, PZ.ci); R.linea(x0, y1, x0, y0, PZ.ci); }
  { const ys = s0[3] - Math.round((t * 14) % 31); R.linea(s0[0], ys, s0[2], ys, PZ.br); }
  const gq = tramo(t, algo - 0.1, algo + 0.6); preguntaG(Math.round(136 - gq * 4), Math.round(80 - gq * 2), 3 + Math.round(gq), t);
  R.rect(98, 120, 192, 124, K); R.rect(99, 121, 191, 123, hex('#8a8a96'));
  // los papeles que la brisa levanta y el termo
  const pa = Math.sin(t * 3) * 1.5; R.poligono([[196, 122], [222, 120 + pa], [224, 124], [198, 124]], hex('#f2ead6')); R.linea(200, 122, 218, 121, hex('#9aa0b4'));
  R.rect(220, 108, 228, 124, K); R.rect(221, 109, 227, 123, hex('#3a8a5a')); R.rect(221, 109, 227, 111, hex('#9a9aa2'));
};
const año = 2008;
const efectos = [[0.9, 'golpecito'], [belga, 'viento'], [P2 + 0.4, 'interruptor'], [P2 + 1.2, 'bip'], [segun, 'zumbido'], [muros, 'brillo'], [indep, 'aviso'], [algo, 'pop'], [nadie + 0.2, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

# ───────────────────────────────────────────────────────────── gz-promesa ──
E['gz-promesa'] = ('La promesa', '''// GZ-PROMESA (frase 27), hoy (barra 2026), sin cartela. Cuatro planos:
// 1. (LOCAL) la estantería de maquetas del estudio de Atom: Atom baja de su esquina y mira las maquetas; en «hidden room»
//    se abre una puertecita escondida en la maqueta de la pirámide, con luz dentro; en «promise» se abren más: el cofre,
//    un libro que gira como palanca y la esfinge. Corta en «that».
// 2. (LOCAL) Giza vista desde arriba: las tres pirámides, la Esfinge y la meseta cuadriculada con estacas numeradas; los
//    investigadores diminutos miden, pasa un dron con su sombra y la fila de camellos; en «something left to discover» un
//    cuadro sin medir late con un «?»; en «most studied» la cuadrícula se llena de marcas. Corta en «And».
// 3. keops/reina/galeria: la japonesa y la francesa miran arriba; en «comes true» la francesa salta y en «2017» se
//    enciende el gran vacío, con la cifra. Corta en «and 2023».
// 4. (LOCAL) el atril con el ramo de micrófonos y la pantalla: en «2023» sale el pasillo de 2023; en «every new
//    announcement» llegan más micrófonos, los flashes saltan y la pantalla pasa a plano azul con «?». Corta al final.''', HELP + EXTRA + r'''
const P2 = en('promesa', .256), P3 = en('promesa', .534), P4 = en('promesa', .768);
const grip = en('promesa', .045), oculta = en('promesa', .153), promesa = en('promesa', .209), algo = en('promesa', .291), estudiado = en('promesa', .417);
const cierto = en('promesa', .641), a2017 = en('promesa', .723), a2023 = en('promesa', .794), nuevo = en('promesa', .907), posible = en('promesa', .959);
const comp0 = R.companero; R.companero = (t, e) => { if (t >= P2) comp0(t, e); };
// ── plano 1: la estantería de maquetas ──
const PAP = RA('#c8b48a', '#d6c29a', '#e2d0aa', '#ecdcb8');
const fondo1 = () => capa('p1', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 2 + (h(x >> 3, y >> 3, 1) - 0.5) * 0.4; if (!(x > 272 && y < 50) && y > 16 && (x % 24 === 12 && y % 24 < 14 || (y % 24 === 6 && Math.abs(x % 24 - 12) < 5 - Math.abs(y % 24 - 6)))) v -= 0.9; if (y > 168) v = 0.6 + (x % 16 < 1 ? -0.6 : 0); R.pset(x, y, tono(PAP, v, x, y)); }
  R.linea(0, 168, 319, 168, hex('#8a6a3a'));
  // la maceta con la kentia a la derecha
  R.rect(284, 146, 310, 172, K); R.rect(285, 147, 309, 171, hex('#b8603a')); R.rect(285, 147, 309, 150, hex('#d8784a'));
  for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.4, L = 30 + (k % 3) * 8; let px = 297, py = 147; for (let i = 0; i < L; i++) { const ang = a + i * 0.012 * (k < 4 ? -1 : 1); px += Math.cos(ang) * 1; py += Math.sin(ang) * 1; if (py < 52) break; R.pset(Math.round(px), Math.round(py), i % 3 ? hex('#3a7a3a') : hex('#5a9a4a')); if (i % 3 === 0) { R.pset(Math.round(px) + 2, Math.round(py) + 2, hex('#4a8a3a')); R.pset(Math.round(px) - 2, Math.round(py) + 2, hex('#2a6a2a')); } } }
  // el mueble: tres baldas de nogal
  R.rect(14, 42, 268, 172, K); madera(16, 44, 266, 170, RA('#4a2a14', '#5a3418', '#6a3e1e', '#7e4c26')); R.rect(22, 50, 260, 164, K); madera(23, 51, 259, 163, RA('#3a2010', '#4a2a14', '#5a3418'));
  for (const y of [90, 128, 164]) { R.rect(16, y, 266, y + 5, K); madera(17, y + 1, 265, y + 4, RA('#8a5a2e', '#a86a38', '#bc7c44')); R.linea(17, y + 1, 265, y + 1, hex('#d89a58')); }
  // libros en la balda de arriba
  let bx = 26; for (let i = 0; i < 16; i++) { const w = 4 + (i * 7) % 4, hh = 26 + (i * 5) % 12, c = ['#8a2a2a', '#2a4a8a', '#3a7a4a', '#c8963a', '#5a3a7a', '#2a6a7a'][i % 6]; if (i === 9) { bx += 30; continue; }
    R.rect(bx, 90 - hh, bx + w, 89, K); R.rect(bx + 1, 91 - hh, bx + w - 1, 89, hex(c)); R.rect(bx + 1, 94 - hh, bx + w - 1, 95 - hh, hex('#e8c860')); bx += w + 1; }
  // el globo terráqueo, la vasija, el escarabeo (balda de abajo)
  R.disco(52, 146, 13, K); R.disco(52, 146, 12, (x, y) => (h(x >> 2, y >> 2, 4) > 0.55 ? hex('#5a9a4a') : hex('#3a7ab8'))); R.rect(50, 159, 54, 164, K); R.rect(44, 162, 60, 164, hex('#8a6a3a'));
  R.poligono([[224, 164], [220, 150], [226, 140], [238, 140], [244, 150], [240, 164]], K); R.poligono([[225, 163], [222, 150], [227, 141], [237, 141], [242, 150], [239, 163]], hex('#b8603a')); R.linea(222, 150, 242, 150, hex('#2a2a2a'));
  R.disco(250, 126, 5, K); R.disco(250, 126, 4, hex('#3a8a8a')); R.linea(250, 122, 250, 128, K);
});
const p1 = (t) => {
  fondo1();
  // la maqueta de la pirámide (balda del medio), con su puertecita escondida
  const px = 142, py = 128;
  R.poligono([[px - 34, py], [px, py - 34], [px + 34, py]], K); R.poligono([[px - 32, py - 1], [px, py - 32], [px, py - 1]], hex('#e8c27a')); R.poligono([[px, py - 32], [px + 32, py - 1], [px, py - 1]], hex('#b88a4a'));
  for (let y = py - 28; y < py; y += 4) { R.linea(px - (y - py + 32) + 1, y, px - 1, y, hex('#c8a060')); R.linea(px + 1, y, px + (y - py + 32) - 1, y, hex('#9a7038')); }
  const d1 = tramo(t, oculta - 0.2, oculta + 0.5); R.rect(px - 7, py - 14, px - 1, py - 4, K);
  if (d1 > 0) { R.rect(px - 6, py - 13, px - 2, py - 5, hex('#fff0a0')); R.halo(px - 4, py - 9, 14 * d1, [hex('#c8a060'), hex('#f0d080'), hex('#fff4c0')], 0.9); }
  R.rect(px - 6 - Math.round(d1 * 7), py - 13, px - 2 - Math.round(d1 * 7), py - 5, hex('#d8b06a'));
  // la esfinge de escayola: se le abre una trampilla en el lomo
  const d2 = tramo(t, promesa - 0.1, promesa + 0.4);
  R.rect(196, 112, 236, 127, K); R.rect(197, 113, 235, 127, hex('#e0d0b0')); R.rect(226, 102, 236, 116, K); R.rect(227, 103, 235, 115, hex('#e0d0b0')); R.rect(226, 102, 236, 106, hex('#3a6ab0')); R.pset(232, 108, K);
  if (d2 > 0) { R.rect(204, 111, 214, 113, hex('#ffe890')); R.halo(209, 108, 10 * d2, [hex('#c8a060'), hex('#ffe890')], 0.8); }
  R.rect(204, 111 - Math.round(d2 * 6), 214, 112 - Math.round(d2 * 6), hex('#c8b48a'));
  // el cofre de juguete (balda de abajo): la tapa se levanta
  const d3 = tramo(t, promesa + 0.2, promesa + 0.6);
  R.rect(104, 146, 136, 163, K); R.rect(105, 147, 135, 162, hex('#8a4a1e')); R.rect(105, 152, 135, 153, hex('#e8b830')); R.rect(118, 150, 122, 156, hex('#e8b830'));
  if (d3 > 0) R.halo(120, 146, 16 * d3, [hex('#c8a060'), hex('#ffe890')], 0.9);
  R.poligono([[104, 146], [136, 146], [136 - d3 * 4, 146 - 8 - d3 * 8], [104 + d3 * 4, 146 - 8 - d3 * 8]].map(([x, y]) => [Math.round(x), Math.round(y)]), K);
  R.poligono([[105, 145], [135, 145], [135 - d3 * 4, 146 - 7 - d3 * 8], [105 + d3 * 4, 146 - 7 - d3 * 8]].map(([x, y]) => [Math.round(x), Math.round(y)]), hex('#a85a26'));
  // el libro que hace de palanca (el hueco de la balda de arriba): gira
  const d4 = tramo(t, promesa + 0.4, promesa + 0.8), lx = 172;
  R.poligono([[lx, 89], [lx + 6, 89], [lx + 6 + d4 * 14, 62 + d4 * 6], [lx + d4 * 14, 62 + d4 * 6]].map(([x, y]) => [Math.round(x), Math.round(y)]), K);
  R.poligono([[lx + 1, 88], [lx + 5, 88], [lx + 5 + d4 * 14, 63 + d4 * 6], [lx + 1 + d4 * 14, 63 + d4 * 6]].map(([x, y]) => [Math.round(x), Math.round(y)]), hex('#c84a3a'));
  if (d4 > 0.8) { R.rect(162, 66, 170, 88, hex('#3a2a1a')); R.rect(163, 67, 169, 87, hex('#ffe890')); }
  // Atom baja de su esquina, mira las maquetas, rebota en «grip» y en «promise»
  const u0 = tramo(t, 0, grip + 0.3), u1 = tramo(t, oculta - 0.4, oculta + 0.1), u2 = tramo(t, promesa + 0.3, P2);
  let ax = lerp(297, 196, suave(u0)), ay = lerp(24, 60, suave(u0));
  if (u1 > 0) { ax = lerp(196, 160, suave(u1)); ay = lerp(60, 82, suave(u1)); }
  if (u2 > 0) { ax = lerp(160, 210, suave(u2)); ay = lerp(82, 70, suave(u2)); }
  const sal = (t > grip && t < grip + 0.6) || (t > promesa && t < promesa + 0.6) ? Math.round(Math.abs(Math.sin(t * 10)) * 5) : 0;
  atomEn(Math.round(ax), Math.round(ay - sal + Math.sin(t * 2.6) * 1.5), t, sal > 0 || d1 > 0.5 ? 0.8 : 0.4);
  // los «?» y «!» de Atom
  if (t > oculta && t < promesa) R.icono('!', Math.round(ax) + 16, Math.round(ay) - 22, hex('#ffe890'), K, 2);
  // motas en la luz
  T.motas(R, t, 30, 260, 50, 170, 12, hex('#fff4d0'));
};
// ── plano 2: Giza desde arriba ──
const ARENA = RA('#c8a470', '#d6b27c', '#e2c08a', '#ecd09c');
const PIRS = [[96, 112, 34], [182, 132, 28], [246, 160, 12]];
const piramideArriba = (cx, cy, r) => { const N = [cx, cy - r], E2 = [cx + r, cy], S2 = [cx, cy + r], W = [cx - r, cy];
  const a = [cx - r, cy - r], b = [cx + r, cy - r], c = [cx + r, cy + r], d = [cx - r, cy + r];
  R.poligono([[a[0] + 3, a[1] + 4], [b[0] + 6, b[1] + 4], [c[0] + 6, c[1] + 6], [d[0] + 3, d[1] + 6]], hex('#a8844e'));
  R.poligono([a, b, [cx, cy]], hex('#f0d8a0')); R.poligono([b, c, [cx, cy]], hex('#c8a068')); R.poligono([c, d, [cx, cy]], hex('#a07848')); R.poligono([d, a, [cx, cy]], hex('#e0c088'));
  for (let k = 4; k < r; k += 4) { R.linea(cx - k, cy - k, cx + k, cy - k, hex('#d8bc84')); R.linea(cx + k, cy - k, cx + k, cy + k, hex('#a88050')); R.linea(cx + k, cy + k, cx - k, cy + k, hex('#886038')); R.linea(cx - k, cy + k, cx - k, cy - k, hex('#c8a870')); }
  R.linea(a[0], a[1], c[0], c[1], hex('#8a6a3a')); R.linea(b[0], b[1], d[0], d[1], hex('#8a6a3a')); };
const fondo2 = () => capa('p2', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(ARENA, 1.8 + Math.sin(x * 0.12 + y * 0.31 + Math.sin(y * 0.05) * 3) * 0.5 + (h(x >> 2, y >> 2, 8) - 0.5) * 0.8, x, y));
  // la carretera asfaltada y el aparcamiento
  for (let y = 0; y < 180; y++) for (let x = 16; x < 24; x++) R.pset(x + Math.round(y * 0.1), y, (y % 10 < 5 && x === 20) ? hex('#e8e0c0') : hex('#5a5a62'));
  for (const [cx, cy, r] of PIRS) piramideArriba(cx, cy, r);
  // mastabas en filas
  for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) { const x = 34 + i * 12, y = 34 + j * 12; R.rect(x, y, x + 8, y + 6, hex('#a8844e')); R.rect(x, y, x + 7, y + 5, hex('#dcc08a')); R.rect(x, y + 5, x + 7, y + 5, hex('#b8945a')); }
  // la Esfinge vista desde arriba en su foso
  R.rect(118, 156, 156, 176, hex('#b8945a')); R.rect(122, 162, 148, 170, hex('#e0c890')); R.rect(148, 161, 154, 171, hex('#e8d0a0')); R.rect(124, 160, 128, 172, hex('#d8bc84'));
});
const p2 = (t) => {
  fondo2();
  // la cuadrícula de cuerdas con estacas numeradas; se llena de marcas en «most studied»
  const lleno = tramo(t, estudiado - 0.3, estudiado + 1.2);
  const celdas = [];
  for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) celdas.push([150 + i * 22, 22 + j * 22, i, j]);
  const hueco = 7;   // la celda sin medir
  R.linea(150, 88, 260, 88, hex('#f6f2e6')); R.linea(260, 50, 260, 88, hex('#f6f2e6'));
  celdas.forEach(([x, y, i, j], k) => { R.linea(x, y, x + 22, y, hex('#f6f2e6')); R.linea(x, y, x, y + 22, hex('#f6f2e6'));
    R.rect(x - 1, y - 1, x, y, hex('#c84a3a'));
    if (k !== hueco && h(k, 3, 2) < lleno) { for (let q = 0; q < 3; q++) R.pset(x + 5 + q * 5, y + 8 + (q % 2) * 4, hex('#3a6ab0')); R.linea(x + 3, y + 16, x + 8, y + 16, hex('#3a6ab0')); } });
  for (let k = 0; k < 5; k++) R.numero(String(k + 1), 158 + k * 22, 98, { fina: true, color: hex('#5a3a1a') });
  // la celda sin medir: late con un «?»
  { const [x, y] = celdas[hueco]; const on = tramo(t, algo - 0.2, algo + 0.3); if (on > 0) { const b = Math.sin(t * 5) > 0; R.rect(x + 1, y + 1, x + 21, y + 1, b ? hex('#ffe860') : hex('#e8a030')); R.rect(x + 1, y + 21, x + 21, y + 21, b ? hex('#ffe860') : hex('#e8a030')); R.rect(x + 1, y + 1, x + 1, y + 21, b ? hex('#ffe860') : hex('#e8a030')); R.rect(x + 21, y + 1, x + 21, y + 21, b ? hex('#ffe860') : hex('#e8a030'));
    R.icono('?', x + 6, y + 4, hex('#ffe860'), K, 2); } }
  // investigadores diminutos (vistos desde arriba: sombrero y sombra) que van de estaca en estaca
  for (let k = 0; k < 7; k++) { const ruta = [[60 + k * 30, 140], [64 + k * 30, 120 + (k % 3) * 10]], f = (Math.sin(t * 0.8 + k * 1.7) + 1) / 2;
    const x = Math.round(lerp(ruta[0][0], ruta[1][0], f) + (k > 3 ? 120 : 0)), y = Math.round(lerp(ruta[0][1], ruta[1][1], f) - (k > 3 ? 80 : 0));
    R.disco(x + 2, y + 2, 2, hex('#a8844e')); R.disco(x, y, 2.5, K); R.disco(x, y, 2, hex(['#f0f0e8', '#e8a030', '#3a6ab0', '#c84a3a', '#5a9a4a'][k % 5])); R.pset(x, y, hex('#fffbe8'));
    if (k % 2) { R.linea(x + 2, y, x + 9, y + 3, hex('#f8e858')); } }
  // la fila de camellos y el autobús de turistas
  for (let k = 0; k < 4; k++) { const x = Math.round(((t * 6 + k * 9) % 360) - 20), y = 172 - Math.round(x * 0.04); R.disco(x + 2, y + 2, 2.5, hex('#a8844e')); R.rect(x - 3, y - 1, x + 3, y + 1, K); R.rect(x - 2, y - 1, x + 2, y, hex('#a8743a')); R.pset(x + 4, y, hex('#8a5a2a')); }
  { const by = Math.round(((t * 14) % 260) - 30); R.rect(17, by, 23, by + 14, K); R.rect(18, by + 1, 22, by + 13, hex('#e8e8e8')); R.rect(18, by + 2, 22, by + 3, hex('#5a8ad8')); }
  // el dron, con su sombra en la arena
  { const dx = Math.round(lerp(-20, 340, (t - P2) / 5.2)), dy = 70 + Math.round(Math.sin(t) * 6); R.disco(dx + 10, dy + 14, 3, hex('#a8844e'));
    R.rect(dx - 3, dy - 1, dx + 3, dy + 1, K); for (const [ox, oy] of [[-5, -3], [5, -3], [-5, 3], [5, 3]]) { R.linea(dx, dy, dx + ox, dy + oy, K); R.linea(dx + ox - 2 + (Math.floor(t * 20) % 2), dy + oy, dx + ox + 2 - (Math.floor(t * 20) % 2), dy + oy, hex('#c8c8d0')); }
    if (Math.floor(t * 4) % 2) R.pset(dx, dy, hex('#ff4040')); }
};
// ── plano 3: el vacío de 2017 se enciende ──
const p3 = (t) => {
  const o = { encuadre: 'reina', camara: 'galeria', vacio: tramo(t, a2017 - 0.6, a2017 + 0.3) };
  T.keops(R, t, o);
  const salto = t > cierto && t < cierto + 0.5 ? Math.round(Math.sin((t - cierto) / 0.5 * Math.PI) * 6) : 0;
  R.actor(EL.cientificoJapones, 36, 166, t, { dir: 1, dedo: t > P3 + 0.3, sorpresa: t > a2017 });
  R.actor(EL.cientificaFrancesa, 66, 166, t, { dir: 1, salto, brazos: t > cierto && t < cierto + 0.7, sonrisa: t > cierto });
  T.keopsDelante(R, t, o);
  if (t > a2017) { const u = tramo(t, a2017, a2017 + 0.3); R.numero('2017', 186, 66 + Math.round((1 - u) * 6), { tam: 16, color: hex('#fff4c8') }); }
};
// ── plano 4: el atril y la pantalla ──
const fondo4 = () => capa('p4', () => {
  // el telón azul con su dibujo de rombos
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 1.4 + Math.sin(x * 0.28) * 0.6 + (((x >> 3) + (y >> 3)) % 2 ? 0.2 : -0.2); R.pset(x, y, tono(RA('#14203e', '#1c2c52', '#263a66', '#30487a'), v, x, y)); }
  // la tarima
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#3a2a1a', '#4a3420', '#5e4228'), 1 + (y - 150) / 20 + (x % 40 < 1 ? -1 : 0), x, y));
  R.linea(0, 150, 319, 150, hex('#8a6a3a'));
  // el marco de la pantalla
  R.rect(146, 46, 304, 136, K); R.rect(148, 48, 302, 134, hex('#2a2a32')); R.rect(220, 136, 230, 150, hex('#2a2a32'));
  // los focos del techo
  for (const x of [40, 120, 200]) { R.rect(x - 4, 0, x + 4, 6, K); R.rect(x - 3, 1, x + 3, 5, hex('#5a5a66')); }
});
const p4 = (t) => {
  fondo4();
  for (const x of [40, 120, 200]) for (let y = 7; y < 150; y++) { const w = (y - 7) * 0.22; for (let xx = Math.round(x - w); xx <= x + w; xx++) if ((xx + y) % 3 === 0) tin(xx, y, hex('#fff4c8'), 0.1); }
  // la pantalla: el pasillo de 2023 y, en «new announcement», el plano azul con «?»
  const S = [150, 50, 300, 132], azul = t > nuevo + 0.1, glitch = t > nuevo - 0.1 && t < nuevo + 0.3;
  R.recorte(S);
  if (!azul) {
    for (let y = S[1]; y <= S[3]; y++) for (let x = S[0]; x <= S[2]; x++) R.pset(x, y, tono(RA('#3a2a1a', '#5a4428', '#7a6038', '#9a7a4a', '#b8945a'), 2.2 - Math.hypot(x - 225, y - 96) / 40 + (((x >> 3) + (y >> 2)) % 3 === 0 ? -0.6 : 0), x, y));
    R.poligono([[190, 72], [225, 52], [260, 72], [252, 76], [225, 62], [198, 76]], hex('#c8a46a')); R.linea(190, 72, 225, 52, hex('#e8c88a')); R.linea(225, 52, 260, 72, hex('#8a6a3a'));
    R.poligono([[212, 86], [238, 86], [238, 112], [212, 112]], hex('#1a120a')); R.poligono([[216, 90], [234, 90], [234, 108], [216, 108]], hex('#0a0604'));
    R.linea(200, 76, 212, 86, hex('#e8c88a')); R.linea(250, 76, 238, 86, hex('#8a6a3a')); R.linea(200, 124, 212, 112, hex('#8a6a3a')); R.linea(250, 124, 238, 112, hex('#8a6a3a'));
    R.halo(225, 99, 12, [hex('#5a4020'), hex('#a8803a')], 0.6);
    if (t > a2023 - 0.2) R.numero('2023', 158, 128, { tam: 16, color: hex('#fff4c8') });
  } else {
    for (let y = S[1]; y <= S[3]; y++) for (let x = S[0]; x <= S[2]; x++) R.pset(x, y, ((x - S[0]) % 8 === 0 || (y - S[1]) % 8 === 0) ? PZ.rj : PZ.f2);
    R.poligono([[196, 82], [225, 58], [254, 82]], PZ.f3); R.linea(196, 82, 225, 58, PZ.ci); R.linea(225, 58, 254, 82, PZ.br); R.linea(160, 82, 290, 82, PZ.ci);
    for (let i = 0; i < 6; i++) { const x = 205 + i * 8; R.linea(x, 83, x, 128, PZ.ci); for (let y = 84 + ((Math.floor(t * 6) + i) % 4); y < 128; y += 4) R.pset(x + 1, y, PZ.br); }
    preguntaG(268, 56, 3, t);
  }
  if (glitch) for (let y = S[1]; y < S[3]; y += 3) { const d = Math.round(Math.sin(y * 1.7 + t * 40) * 6); for (let x = S[0]; x < S[2]; x += 2) R.pset(x + d, y, h(x, y, Math.floor(t * 30)) > 0.5 ? PZ.ci : K); }
  { const ys = S[1] + Math.round((t * 30) % 82); for (let x = S[0]; x <= S[2]; x += 2) tin(x, ys, BL, 0.15); }
  R.recorte(null);
  // el atril de madera
  R.rect(44, 92, 112, 154, K); madera(46, 94, 110, 152, RA('#5a3418', '#6a3e1e', '#7e4c26', '#925a2e')); R.rect(40, 88, 116, 94, K); R.rect(41, 89, 115, 93, hex('#a86a38'));
  R.disco(78, 122, 9, hex('#c8a040')); R.disco(78, 122, 7, hex('#e8c860')); R.poligono([[73, 126], [78, 117], [83, 126]], hex('#a8803a'));
  // el ramo de micrófonos: tres al principio y cuatro más en «every new announcement»
  const mics = [[66, '#2a2a2a'], [78, '#c84a3a'], [90, '#3a6ab0'], [58, '#e8b830'], [98, '#5a9a4a'], [72, '#8a5ad8'], [84, '#e86a2a']];
  mics.forEach(([x, c], k) => { const t0 = k < 3 ? -1 : nuevo - 0.3 + (k - 3) * 0.18, u = tramo(t, t0, t0 + 0.3); if (u <= 0) return;
    const bx = Math.round(lerp(k % 2 ? 340 : -20, x, suave(u))), by = 84 - (k % 3) * 2; R.linea(bx, by, 78, 92, hex('#5a5a62'));
    R.rect(bx - 3, by - 6, bx + 3, by, K); R.rect(bx - 2, by - 5, bx + 2, by - 1, hex(c)); R.pset(bx - 1, by - 5, hex('#ffffff')); });
  // el público: una fila de cabezas que se mueven
  for (let k = 0; k < 14; k++) { const x = 8 + k * 23 + (k % 2) * 4, y = 170 + (k % 3) + Math.round(Math.sin(t * 2 + k) * 0.8), c = ['#3a2a1a', '#8a6a3a', '#1a1a1a', '#c89a5a', '#5a3a2a'][k % 5];
    if (x > 18 && x < 46 || x > 116 && x < 150) continue; R.disco(x, y, 7, K); R.disco(x, y, 6, hex(c)); R.rect(x - 9, y + 5, x + 9, 179, K); R.rect(x - 8, y + 6, x + 8, 179, hex(['#3a4a6a', '#6a3a3a', '#3a5a4a', '#5a5a66'][k % 4])); }
  // la prensa delante: dos periodistas con el móvil en alto y flashes
  const P = R.actor(EL.periodista2025, 24, 172, t, { dir: 1, sostiene: [36, 140], sorpresa: t > nuevo && t < nuevo + 0.6 });
  R.rect(P.mano[0] - 2, P.mano[1] - 7, P.mano[0] + 3, P.mano[1] + 1, K); R.rect(P.mano[0] - 1, P.mano[1] - 6, P.mano[0] + 2, P.mano[1], hex('#3a3a46'));
  const Q = R.actor(EL.periodista1, 124, 172, t, { dir: 1, sostiene: [140, 144], habla: t > a2023 && t < nuevo && Math.sin(t * 8) > 0 });
  R.rect(Q.mano[0] - 2, Q.mano[1] - 5, Q.mano[0] + 4, Q.mano[1] + 1, K); R.rect(Q.mano[0] - 1, Q.mano[1] - 4, Q.mano[0] + 3, Q.mano[1], hex('#5a5a66'));
  const flash = (t > a2023 && t < a2023 + 0.12) || (t > nuevo + 0.2 && t < nuevo + 0.32) || (t > posible && t < posible + 0.1);
  if (flash) { R.halo(P.mano[0], P.mano[1] - 4, 20, [hex('#8a8aa8'), hex('#e8e8ff'), BL], 1.2); R.halo(Q.mano[0], Q.mano[1] - 4, 16, [hex('#8a8aa8'), BL], 1); }
};
const efectos = [[0.3, 'whoosh'], [oculta, 'cerrojo'], [promesa, 'brillo'], [promesa + 0.6, 'pop'], [algo, 'pop'], [estudiado, 'tic'], [cierto, 'palmada'], [a2017, 'brillo'], [a2023, 'flash'], [nuevo - 0.1, 'zumbido'], [nuevo + 0.2, 'flash'], [posible, 'flash']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
''')

# ───────────────────────────────────────────────────────────── gz-camino ──
E['gz-camino'] = ('El camino', '''// GZ-CAMINO (frase 28), hoy (barra 2026), sin cartela. El veredicto, que se lee sin palabras. Cinco planos:
// 1. (LOCAL) la encrucijada en el desierto: un viajero llega al cruce en «path»; a la izquierda, un camino de losas
//    hasta Keops con la boca del pasillo encendida y tres hitos (detector, radar, cámara) que se encienden en «measured» y
//    «techniques»; a la derecha, un camino de puntos cian que baja a un holograma de pozos (plano azul) con su «?». El
//    viajero mira a un lado y a otro. Corta en «checked».
// 2. keops/anuncio: la francesa sube al estrado con la revista y se la da al japonés (comprobado: un visto); el ministro
//    habla; en «looked inside» la pantalla del pasillo se marca con un ojo y otro visto. Prensa con flashes. Corta en
//    «The 600-meter».
// 3. (LOCAL, plano azul) la señal que se lee como pozos: el satélite manda una onda que entra en una caja y sale
//    convertida en ocho pozos bajo la silueta de Kefrén; en «600» sale la cota; en «new way of reading signals» la onda
//    se ve pasar por la caja; el «?» al lado. Corta en «that no other team».
// 4. (LOCAL) la sala de revisión: Conyers, Parcak y Hawass, tras la mesa, miran la proyección azul de los pozos con su «?»;
//    el panel de confirmaciones marca 0 y parpadea en «confirmed»; en «don't accept» niegan con la cabeza, con calma, y
//    siguen con sus papeles. Corta en «Maybe».
// 5. (LOCAL) el tablero de pruebas: a la izquierda, la foto del pasillo de 2023 con sus tres vistos (medido, publicado,
//    mirado); a la derecha, la lámina azul de los pozos con tres casillas vacías y un «?» grande. En «Maybe that will change
//    one day» la mano canónica acerca un visto a la lámina… y en «Today» lo retira; el «?» se queda.''', HELP + EXTRA + r'''
const P2 = en('camino', .212), P3 = en('camino', .454), P4 = en('camino', .632), P5 = en('camino', .862);
const camino = en('camino', .040), vacio = en('camino', .079), medido = en('camino', .141), tecnicas = en('camino', .185);
const cientificos = en('camino', .257), miro = en('camino', .391), seis = en('camino', .459), ahora = en('camino', .543), leer = en('camino', .600);
const confirmado = en('camino', .692), especialistas = en('camino', .749), noacepta = en('camino', .812), undia = en('camino', .885), hoy2 = en('camino', .939);
const VERDE = hex('#4ade6a');
// iconos pequeños de lo comprobado: detector, revista, ojo
const icDetector = (x, y) => { R.rect(x, y, x + 10, y + 7, K); R.rect(x + 1, y + 1, x + 9, y + 6, hex('#9a9aa2')); R.rect(x + 2, y + 2, x + 8, y + 4, K); R.pset(x + 3, y + 3, hex('#5ae070')); R.pset(x + 6, y + 3, hex('#f0a030')); };
const icRevista = (x, y) => { R.rect(x, y, x + 8, y + 10, K); R.rect(x + 1, y + 1, x + 7, y + 9, hex('#f2ead6')); R.rect(x + 1, y + 1, x + 7, y + 3, hex('#c84a3a')); R.linea(x + 2, y + 6, x + 6, y + 6, hex('#9aa0b4')); R.linea(x + 2, y + 8, x + 5, y + 8, hex('#9aa0b4')); };
const icOjo = (x, y, c = BL) => { R.linea(x, y + 3, x + 3, y, K); R.linea(x + 3, y, x + 7, y, K); R.linea(x + 7, y, x + 10, y + 3, K); R.linea(x, y + 3, x + 3, y + 6, K); R.linea(x + 3, y + 6, x + 7, y + 6, K); R.linea(x + 7, y + 6, x + 10, y + 3, K);
  R.rect(x + 2, y + 2, x + 8, y + 4, c); R.disco(x + 5, y + 3, 2, hex('#3a6ab0')); R.pset(x + 5, y + 3, K); R.pset(x + 4, y + 2, BL); };
// ── plano 1: la encrucijada ──
const CIELO = RA('#5a92d4', '#6ea2dc', '#86b2e2', '#a0c4e8', '#bed4e8', '#dcdccc');
const ARENA = RA('#b8925e', '#c8a26c', '#d8b47c', '#e6c48e', '#f0d4a2');
const fondo1 = () => capa('c1', () => {
  cieloT(74, CIELO);
  // Keops lejos a la izquierda, con la cara norte al sol
  R.poligono([[18, 76], [82, 22], [146, 76]], hex('#c8a46a')); R.poligono([[82, 22], [146, 76], [82, 76]], hex('#a8844e'));
  for (let y = 26; y < 76; y += 3) { const w = (y - 22) * 64 / 54; R.linea(Math.round(82 - w), y, 82, y, hex('#b8945a')); R.linea(82, y, Math.round(82 + w), y, hex('#987440')); }
  R.poligono([[76, 52], [82, 46], [88, 52]], hex('#8a6a3a'));
  // la llanura
  for (let y = 74; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(ARENA, 1 + (y - 74) / 106 * 3 + Math.sin(x * 0.09 + y * 0.4) * 0.3 + (h(x >> 2, y >> 1, 3) - 0.5) * 0.7, x, y));
  for (let i = 0; i < 40; i++) { const x = Math.round(h(i, 1, 5) * 320), y = 80 + Math.round(h(i, 2, 5) * 96), w = 1 + Math.round((y - 74) / 30); R.rect(x, y, x + w, y, hex('#8a6a42')); R.rect(x, y - 1, x + w - 1, y - 1, hex('#f4e0b8')); }
  // el camino de losas: del primer término al cruce y, a la izquierda, hasta Keops
  const losa = (pts) => { R.poligono(pts, (x, y) => tono(RA('#9a8a76', '#b4a48c', '#ccbca2', '#ddd0b8'), 1.6 + (h(x >> 2, y >> 1, 9) - 0.5) + ((((y - 74) * 2) | 0) % 9 === 0 || ((x + (y >> 2) * 5) % 13 === 0) ? -1.4 : 0), x, y)); };
  losa([[130, 180], [196, 180], [172, 126], [150, 126]]);
  losa([[150, 128], [172, 128], [100, 86], [86, 86], [82, 80], [88, 80]]);
  R.linea(130, 180, 150, 126, hex('#6a5a46')); R.linea(196, 180, 172, 126, hex('#6a5a46')); R.linea(150, 128, 86, 86, hex('#6a5a46')); R.linea(172, 128, 100, 86, hex('#6a5a46'));
  // el cartel de piedra del cruce (sin letras: un mojón)
  R.rect(157, 108, 165, 126, K); R.rect(158, 109, 164, 125, hex('#c8b8a0')); R.rect(158, 109, 164, 111, hex('#e8dcc4'));
});
const p1 = (t) => {
  fondo1();
  // las nubes pasan por detrás de Keops: solo en el cielo libre de la derecha
  R.recorte([172, 0, 319, 72]); nubes(t, [[150, 22, 24, 2], [260, 40, 30, 3], [200, 58, 20, 5]], 360); R.recorte(null);
  T.bandada(R, t, { tipo: 'milano', n: 3, y: 30, cada: 8 });
  // la boca del pasillo de Keops: encendida, cálida, con su halo que late
  R.halo(82, 49, 9 + Math.sin(t * 3), [hex('#a8844e'), hex('#e8b860'), hex('#fff0a0')], 1); R.rect(80, 48, 84, 52, hex('#fff4c0'));
  // a la derecha, el holograma de los pozos: una ventana de plano azul sobre el desierto, y el camino de puntos cian
  const H0 = [196, 54, 292, 140];
  R.recorte(H0);
  for (let y = H0[1]; y <= H0[3]; y++) for (let x = H0[0]; x <= H0[2]; x++) R.pset(x, y, ((x - H0[0]) % 8 === 0 || (y - H0[1]) % 8 === 0) && (x + y) % 2 === 0 ? PZ.rjM : tono([PZ.f1, PZ.f2, PZ.f3], 1.4 - (y - H0[1]) / 90, x, y));
  const P = pluma();
  P.poli([[218, 80], [244, 60], [270, 80]], 'c'); P.l(200, 80, 288, 80, 'c');
  for (let i = 0; i < 6; i++) { const x = 226 + i * 7; P.parte(x, 81, x, 134, tramo(t, 0.2 + i * 0.1, 1.4 + i * 0.1), 'c'); }
  P.pintar(t); holo(t, H0[3], H0[0], H0[2], false, H0[1]);
  R.recorte(null);
  R.linea(H0[0] - 1, H0[1] - 1, H0[2] + 1, H0[1] - 1, PZ.ci); R.linea(H0[0] - 1, H0[3] + 1, H0[2] + 1, H0[3] + 1, PZ.ci); R.linea(H0[0] - 1, H0[1], H0[0] - 1, H0[3], PZ.co); R.linea(H0[2] + 1, H0[1], H0[2] + 1, H0[3], PZ.co);
  for (let k = 0; k < 18; k++) { const u = k / 18, x = Math.round(lerp(172, 236, u)), y = Math.round(lerp(128, 142, u) + Math.sin(u * 3) * 4); if ((k + Math.floor(t * 6)) % 3) { R.pset(x, y, PZ.ci); R.pset(x + 1, y, PZ.br); } }
  preguntaG(252, 96, 3, t);
  // los tres hitos del camino de losas: se encienden en «measured», «techniques» y al final
  const hitos = [[132, 116, medido, icDetector], [114, 104, tecnicas, icDetector], [98, 94, P2 - 0.4, icOjo]];
  hitos.forEach(([x, y, t0, ic]) => { R.rect(x, y, x + 1, y + 10, hex('#6a5a46')); ic(x - 4, y - 9); if (t > t0) visto(x - 4, y - 19, 1); });
  // el viajero llega al cruce en «path» y mira a uno y otro lado
  const u = tramo(t, 0, camino + 0.3), x = Math.round(lerp(150, 160, u)), y = Math.round(lerp(196, 146, u));
  const mira = t < vacio ? 1 : t < medido ? -1 : t < tecnicas + 0.6 ? 1 : -1;
  R.actor(EL.turista1, x - 7, y, t, { dir: mira, anda: u < 1, dedo: t > medido && t < medido + 1.2, sorpresa: t > tecnicas + 0.6 && t < tecnicas + 1.2 });
};
// ── plano 2: el anuncio, comprobado ──
const p2 = (t) => {
  const o = { encuadre: 'anuncio' };
  T.keops(R, t, o);
  // la prensa
  for (let k = 0; k < 4; k++) { const x = 206 + k * 26, fl = Math.sin(t * 3 + k * 2) > 0.97; const A = R.actor([EL.periodista1, EL.periodista2025, EL.periodista1, EL.periodista2025][k], x, 172, t, { dir: -1, sostiene: true });
    R.rect(A.mano[0] - 3, A.mano[1] - 5, A.mano[0] + 1, A.mano[1], K); R.rect(A.mano[0] - 2, A.mano[1] - 4, A.mano[0], A.mano[1] - 1, hex('#5a5a66')); if (fl) R.halo(A.mano[0] - 1, A.mano[1] - 3, 10, [hex('#c8c8e8'), BL], 1.2); }
  // el ministro habla tras el atril; la francesa sube con la revista y se la da al japonés
  R.actor(EL.ministro2023, 105, 147, t, { dir: 1, habla: Math.sin(t * 7) > 0 && t < cientificos, sonrisa: t > miro });
  const u = tramo(t, P2, cientificos - 0.1), fx = Math.round(lerp(186, 82, suave(u))), da = t > cientificos;
  const F = R.actor(EL.cientificaFrancesa, fx, 147, t, { dir: -1, anda: u > 0 && u < 1, sostiene: !da, sonrisa: da });
  const J = R.actor(EL.cientificoJapones, 56, 147, t, { dir: 1, sostiene: da, sonrisa: da });
  const M = da ? J.mano : F.mano; T.PIEZAS_GZ.revista(R, M[0], M[1] + 6, { s: 1 });
  if (da) { const b = tramo(t, cientificos, cientificos + 0.3); visto(56, 104 - Math.round(b * 4), 2); }
  T.keopsDelante(R, t, o);
  // en «looked inside»: el ojo y el visto sobre la pantalla del pasillo
  if (t > miro - 0.2) { const b = tramo(t, miro - 0.2, miro + 0.2); icOjo(198, 62); R.anillo(226, 96, 14 + Math.round(Math.sin(t * 6)), hex('#fff4c0'), 2); if (b >= 1) visto(240, 58, 2); }
};
// ── plano 3: la señal que se lee como pozos (plano azul) ──
const p3 = (t) => {
  fondoAzul('c3', false);
  const P = pluma();
  // el satélite arriba a la izquierda
  const sx = 46, sy = 40; P.caja(sx - 5, sy - 4, sx + 5, sy + 4, 'c'); P.caja(sx - 24, sy - 3, sx - 8, sy + 3, 'd'); P.caja(sx + 8, sy - 3, sx + 24, sy + 3, 'd'); P.l(sx - 8, sy, sx - 5, sy, 'c'); P.l(sx + 5, sy, sx + 8, sy, 'c');
  for (let i = sx - 22; i < sx - 8; i += 4) P.l(i, sy - 3, i, sy + 3, 'D'); for (let i = sx + 10; i < sx + 24; i += 4) P.l(i, sy - 3, i, sy + 3, 'D');
  // la onda: baja del satélite y corre hacia la caja que «lee»
  const fase = t * 8; let py = null;
  for (let x = sx; x < 132; x++) { const y = Math.round(80 + Math.sin(x * 0.35 - fase) * (5 + Math.sin(x * 0.07) * 3)); if (py !== null) P.l(x - 1, py, x, y, x % 40 < 20 ? 'c' : 'b'); py = y; }
  P.l(sx, sy + 4, sx, 74, 'd', 3);
  // la caja que convierte (con sus engranajes que giran)
  P.caja(132, 66, 162, 94, 'c'); const g = t * 3; for (const [cx, cy, r] of [[142, 76, 5], [152, 86, 4]]) for (let k = 0; k < 6; k++) { const a = g * (r === 5 ? 1 : -1.3) + k * 1.047; P.l(cx, cy, Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), 'e'); }
  if (t > leer - 0.3 && t < leer + 1.2) P.caja(129, 63, 165, 97, 'b');
  P.l(162, 80, 178, 80, 'c'); P.flecha(178, 80, 1, 0, 'c');
  // Kefrén en silueta, el suelo y los ocho pozos que salen de la caja
  P.poli([[200, 70], [234, 36], [268, 70]], 'w'); P.l(182, 70, 300, 70, 'c');
  for (let i = 0; i < 8; i++) { const x = 205 + i * 8; P.parte(x, 71, x, 160, tramo(t, P3 + 0.1 + i * 0.12, P3 + 1.6 + i * 0.12), 'c'); }
  // la cota de 600 m
  if (t > seis - 0.2) { P.cotaV(300, 71, 160, 'b'); }
  P.pintar(t);
  for (let i = 0; i < 8; i++) { const x = 205 + i * 8; for (let y = 74 + ((Math.floor(t * 6) + i) % 4); y < 160 * Math.min(1, tramo(t, P3 + 0.1 + i * 0.12, P3 + 1.6 + i * 0.12)); y += 4) R.pset(x + 1, y, PZ.br); }
  if (t > seis - 0.2) R.numero('600', 262, 120, { tam: 8, color: PZ.br });
  if (t > ahora) preguntaG(96, 112, 3, t);
  figurita(190, 70, t, true);
  senal(t, 172); holo(t, 179);
};
// ── plano 4: la sala de revisión ──
const fondo4 = () => capa('c4', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#5a6a5a', '#6a7a68', '#7a8a76', '#8a9a84'), 2 + (h(x >> 4, y >> 3, 2) - 0.5) * 0.5 + (y > 108 ? -1 : 0) + (y > 108 && x % 18 === 0 ? -1 : 0), x, y));
  R.linea(0, 108, 319, 108, hex('#c8b890'));
  // la librería
  R.rect(4, 22, 66, 108, K); madera(5, 23, 65, 107, RA('#4a2a14', '#5a3418', '#6a3e1e'));
  for (const yb of [48, 76, 104]) { R.rect(5, yb, 65, yb + 2, hex('#a86a38')); let bx = 8; for (let i = 0; i < 9; i++) { const w = 4 + (i * 3 + yb) % 4, hh = 16 + (i * 5 + yb) % 8; R.rect(bx, yb - hh, bx + w, yb - 1, K); R.rect(bx + 1, yb - hh + 1, bx + w - 1, yb - 1, hex(['#8a2a2a', '#2a4a8a', '#3a7a4a', '#c8963a', '#5a3a7a'][(i + yb) % 5])); bx += w + 1; } }
  // la pantalla de proyección
  R.rect(84, 24, 236, 106, K); R.rect(86, 26, 234, 104, hex('#e8e8ec')); R.rect(84, 20, 236, 24, hex('#5a5a66'));
  // la ventana a la derecha (por debajo de la esquina de Atom)
  R.rect(250, 52, 306, 104, K); R.rect(252, 54, 304, 102, hex('#e8e0d0'));
  // el panel de confirmaciones en la pared
  R.rect(240, 110, 274, 136, K); R.rect(241, 111, 273, 135, hex('#2a2a32')); R.rect(243, 113, 271, 133, hex('#1a1a20'));
  // la mesa larga (se pinta delante de ellos, más abajo) y el suelo
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#5a4a3a', '#6a5a46', '#7a6a52'), 1 + (y - 150) / 30 + ((x + y * 3) % 20 < 1 ? -1 : 0), x, y));
});
const p4 = (t) => {
  fondo4();
  // por la ventana: el cielo y los tejados de una ciudad, con nubes
  R.recorte([252, 54, 304, 102]);
  for (let y = 54; y < 103; y++) R.linea(252, y, 304, y, tono(CIELO, (y - 54) / 48 * 4, 252, y));
  for (let y = 54; y < 103; y++) for (let x = 252; x <= 304; x++) R.pset(x, y, tono(CIELO, (y - 54) / 48 * 4, x, y));
  R.nube(Math.round(((t * 4) % 90) + 236), 66, 10);
  for (let i = 0; i < 6; i++) { const x0 = 252 + i * 9, hh = 10 + (i * 7) % 14; R.poligono([[x0, 102], [x0, 102 - hh], [x0 + 8, 102 - hh], [x0 + 8, 102]], hex(['#b88a6a', '#c8a888', '#a87a5a'][i % 3])); for (let y = 105 - hh; y < 100; y += 4) R.pset(x0 + 3, y, hex('#3a4a6a')); }
  R.recorte(null); R.linea(278, 54, 278, 102, hex('#e8e0d0')); R.linea(252, 78, 304, 78, hex('#e8e0d0'));
  // la proyección: el plano azul de los pozos con su «?»
  const S = [88, 28, 232, 102]; R.recorte(S);
  for (let y = S[1]; y <= S[3]; y++) for (let x = S[0]; x <= S[2]; x++) R.pset(x, y, ((x - S[0]) % 8 === 0 || (y - S[1]) % 8 === 0) ? PZ.rj : PZ.f2);
  const P = pluma(); P.poli([[128, 52], [156, 32], [184, 52]], 'w'); P.l(96, 52, 226, 52, 'c'); for (let i = 0; i < 8; i++) P.l(130 + i * 7, 53, 130 + i * 7, 98, 'c'); P.pintar(t);
  preguntaG(200, 60, 3, t); holo(t, 102, 88, 232, false, 28);
  R.recorte(null);
  // el proyector en la mesa con su haz
  for (let y = 102; y < 126; y++) { const w = (126 - y) * 1.2; for (let x = Math.round(160 - w); x <= 160 + w; x++) if ((x + y) % 4 === 0) tin(x, y, hex('#e8f4ff'), 0.12); }
  // el panel de confirmaciones: 0, que parpadea en «confirmed»
  const pid = t > confirmado - 0.3 && t < confirmado + 1.0 && Math.floor(t * 5) % 2;
  R.numero('0', 257, 132, { tam: 16, color: pid ? hex('#ff7a7a') : hex('#c83a3a'), centro: true });
  // los tres especialistas tras la mesa: miran la proyección; en «don't accept» niegan con la cabeza y vuelven a sus papeles
  const niega = (k) => { const a = noacepta - 0.1 + k * 0.1; return t > a && t < a + 0.65 ? (Math.floor((t - a) * 3) % 2 ? 1 : -1) : null; };
  const miran = t > especialistas - 0.2;
  [[EL.conyers, 72, 1], [EL.parcak, 148, -1], [EL.hawass, 214, -1]].forEach(([el, x, d0], k) => {
    const d = niega(k) ?? (miran ? (x < 150 ? 1 : -1) : d0);
    R.actor(el, x, 126, t, { dir: d, habla: k === 1 && t > P4 + 0.4 && t < confirmado && Math.sin(t * 8) > 0 });
  });
  // la mesa con papeles, tazas y el proyector
  R.rect(40, 122, 236, 128, K); madera(41, 123, 235, 127, RA('#6a3e1e', '#7e4c26', '#925a2e')); R.rect(48, 128, 228, 168, K); madera(49, 129, 227, 167, RA('#4a2a14', '#5a3418', '#6a3e1e'));
  for (let x = 60; x < 220; x += 40) { R.rect(x, 134, x + 28, 160, hex('#3a2010')); R.rect(x + 1, 135, x + 27, 159, hex('#5a3418')); R.disco(x + 14, 147, 2, hex('#c8963a')); }
  R.rect(150, 114, 170, 122, K); R.rect(151, 115, 169, 121, hex('#3a3a46')); R.disco(160, 118, 2, hex('#e8f4ff'));
  for (const [x, c] of [[66, '#f2ead6'], [108, '#e8e0f0'], [180, '#f2ead6'], [204, '#f0e8d0']]) { R.poligono([[x, 122], [x + 18, 121], [x + 20, 116], [x + 2, 117]], hex(c)); R.linea(x + 4, 118, x + 16, 118, hex('#9aa0b4')); }
  for (const x of [96, 134]) { R.rect(x, 114, x + 6, 122, K); R.rect(x + 1, 115, x + 5, 121, BL); for (let k = 0; k < 2; k++) { const f = (t * 0.8 + k * 0.5) % 1; R.pset(x + 3 + Math.round(Math.sin(t * 3 + k) * 1), Math.round(112 - f * 10), mez(hex('#7a8a76'), BL, 1 - f)); } }
  // una ayudante que llega con una carpeta
  { const u = ((t - P4) / 5.3), x = Math.round(lerp(330, 248, Math.min(1, u * 1.4))); const Ed = R.actor(EL.editora2, x, 172, t, { dir: -1, anda: u * 1.4 < 1, sostiene: true }); T.PIEZAS_GZ.carpeta(R, Ed.mano[0] - 2, Ed.mano[1] + 6, {}); }
};
// ── plano 5: el tablero de pruebas ──
const fondo5 = () => capa('c5', () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#c8bca0', '#d4c8ae', '#ded4bc'), 1.4 + (h(x >> 4, y >> 4, 7) - 0.5) * 0.4 + (y % 16 === 0 ? -0.6 : 0), x, y));
  R.rect(8, 46, 312, 174, K); madera(9, 47, 311, 173, RA('#6a3e1e', '#7e4c26', '#925a2e', '#a86a38'));
  for (let y = 53; y < 168; y++) for (let x = 15; x < 306; x++) R.pset(x, y, tono(RA('#a8744a', '#b88458', '#c89466', '#d4a474'), 1.6 + (h(x, y, 3) - 0.5) * 2.2, x, y));
  // la foto del pasillo de 2023 (estilo real) con su chincheta
  R.rect(30, 60, 118, 128, K); R.rect(31, 61, 117, 127, BL);
  for (let y = 65; y < 117; y++) for (let x = 35; x < 114; x++) R.pset(x, y, tono(RA('#3a2a1a', '#5a4428', '#7a6038', '#9a7a4a', '#b8945a'), 2.4 - Math.hypot(x - 74, y - 96) / 26 + (((x >> 3) + (y >> 2)) % 3 === 0 ? -0.5 : 0), x, y));
  R.poligono([[50, 80], [74, 66], [98, 80], [92, 84], [74, 74], [56, 84]], hex('#c8a46a')); R.poligono([[64, 90], [84, 90], [84, 110], [64, 110]], hex('#1a120a')); R.poligono([[68, 94], [80, 94], [80, 106], [68, 106]], hex('#0a0604'));
  R.linea(56, 84, 64, 90, hex('#e8c88a')); R.linea(92, 84, 84, 90, hex('#8a6a3a'));
  R.disco(74, 62, 3, K); R.disco(74, 62, 2, hex('#3a8a4a'));
  // la lámina de plano azul con su chincheta
  R.rect(190, 58, 290, 132, K); R.rect(191, 59, 289, 131, PZ.f2);
  for (let y = 59; y < 132; y++) for (let x = 191; x < 290; x++) if ((x - 191) % 8 === 0 || (y - 59) % 8 === 0) R.pset(x, y, PZ.rj);
  R.disco(240, 60, 3, K); R.disco(240, 60, 2, hex('#c84a3a'));
  // el hilo rojo entre las dos chinchetas (sin cruzar la zona de Atom)
  R.linea(77, 62, 237, 60, hex('#c83a3a'));
  // el reloj de pared, arriba
  R.disco(200, 24, 13, K); R.disco(200, 24, 12, hex('#f2ead6')); R.anillo(200, 24, 11, hex('#8a6a3a'));
  for (let k = 0; k < 12; k++) R.pset(Math.round(200 + Math.cos(k * 0.5236) * 9), Math.round(24 + Math.sin(k * 0.5236) * 9), K);
});
const p5 = (t) => {
  fondo5();
  // el reloj anda
  { const a = t * 1.0 - 1.57, b = t * 0.08 - 0.5; R.linea(200, 24, Math.round(200 + Math.cos(a) * 9), Math.round(24 + Math.sin(a) * 9), hex('#c83a3a')); R.linea(200, 24, Math.round(200 + Math.cos(b) * 6), Math.round(24 + Math.sin(b) * 6), K); }
  // los pozos de la lámina, en su código
  const P = pluma(); P.poli([[214, 82], [240, 64], [266, 82]], 'w'); P.l(196, 82, 284, 82, 'c'); for (let i = 0; i < 7; i++) P.l(219 + i * 7, 83, 219 + i * 7, 126, 'c'); P.pintar(t);
  // los tres vistos del pasillo (medido, publicado, mirado) y las tres casillas vacías de los pozos
  for (let k = 0; k < 3; k++) { const x = 34 + k * 30, y = 136; R.rect(x, y, x + 24, y + 26, K); R.rect(x + 1, y + 1, x + 23, y + 25, hex('#f2ead6')); [icDetector, icRevista, icOjo][k](x + 7, y + 3); visto(x + 4, y + 15, 2); }
  for (let k = 0; k < 3; k++) { const x = 196 + k * 30, y = 136; R.rect(x, y, x + 24, y + 26, K); R.rect(x + 1, y + 1, x + 23, y + 25, hex('#f2ead6')); for (let i = 0; i < 22; i += 3) { R.pset(x + 2 + i, y + 18, hex('#9a9aa2')); R.pset(x + 2 + i, y + 23, hex('#9a9aa2')); } }
  // notas clavadas entre las dos láminas
  for (const [x, y, c, ic] of [[132, 70, '#f8e868', 'pir'], [150, 100, '#a8e0f8', 'ojo'], [128, 128, '#f8b8c8', '?']]) { const sw = Math.round(Math.sin(t * 2 + x) * 0.6);
    R.rect(x, y + sw, x + 24, y + 22 + sw, K); R.rect(x + 1, y + 1 + sw, x + 23, y + 21 + sw, hex(c)); R.disco(x + 12, y + 2 + sw, 2, hex('#3a6ab0'));
    if (ic === 'pir') { R.poligono([[x + 5, y + 18], [x + 12, y + 8], [x + 19, y + 18]], hex('#c8964a')); } else if (ic === 'ojo') icOjo(x + 7, y + 10); else R.icono('?', x + 10, y + 8, hex('#c83a5a'), hex('#e898a8')); }
  // el «?» grande sobre la lámina: se queda
  preguntaG(238, 88, 4, t, PZ.br, PZ.f0);
  // la mano canónica acerca un visto a la primera casilla vacía… y lo retira en «Today»
  const ida = tramo(t, P5 + 0.2, undia), vuelta = tramo(t, hoy2, hoy2 + 0.7);
  const u = suave(ida) * (1 - suave(vuelta));
  if (u > 0.01) { const wx = Math.round(lerp(330, 214, u)), wy = Math.round(lerp(196, 160, u) + (u > 0.95 ? Math.sin(t * 8) * 1.5 : 0));
    // el visto en la punta de los dedos
    R.rect(wx - 18, wy - 14, wx - 4, wy - 2, K); R.rect(wx - 17, wy - 13, wx - 5, wy - 3, BL); visto(wx - 15, wy - 11, 1);
    T.brazo(R, wx + 30, 206, wx, wy, '#5a6a8a', -1, { codo: [wx + 28, wy + 30] }); }
};
const efectos = [[camino - 0.2, 'whoosh'], [medido, 'bip'], [tecnicas, 'bip'], [P2 + 0.3, 'publico'], [cientificos, 'papel'], [cientificos + 0.4, 'brillo'], [miro, 'flash'], [P3 + 0.2, 'zumbido'], [seis, 'pop'], [leer, 'maquina'], [confirmado - 0.1, 'aviso'], [noacepta, 'papel'], [P5 + 0.3, 'whoosh'], [undia, 'tic'], [hoy2 + 0.1, 'whoosh'], [hoy2 + 0.9, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2026 });
''')

# ───────────────────────────────────────────────────────────── gz-secretos ──
E['gz-secretos'] = ('Dos secretos', '''// GZ-SECRETOS (frase 29), hoy (barra 2026), sin cartela. Tres planos:
// 1. giza/meseta de noche (la tercera hora de la meseta): el espectáculo de luz barre las pirámides; dos turistas
//    sentados lo miran y uno hace una foto; pasa el camellero. En «two kinds of secrets» se encienden dos luces: una
//    cálida en la cara de Keops y otra cian, con un «?», en Kefrén. Corta en «the one someone has already seen».
// 2. (LOCAL) corte nocturno: Keops en piedra, a la izquierda, con el pasillo de 2023 que se enciende en «already seen» y
//    un ojo encima; Kefrén a la derecha, con los pozos en holograma bajo el suelo que parpadean en «says they've seen» y
//    un bocadillo con «?». Estrellas, una estrella fugaz. Corta en «Both».
// 3. (LOCAL) una puerta de piedra con una escalera que baja, de noche: la linterna espera apagada junto a la puerta;
//    en «someone goes down» llega el técnico, la coge, la enciende en «flashlight» (el haz alumbra los escalones) y en
//    «shows us» se vuelve hacia nosotros, sonríe, y baja por la escalera.''', HELP + EXTRA + r'''
const P2 = en('secretos', .312), P3 = en('secretos', .649);
const dos = en('secretos', .153), secretos = en('secretos', .221), visto2 = en('secretos', .374), dice = en('secretos', .526), dicho = en('secretos', .583);
const alguien = en('secretos', .761), baja = en('secretos', .803), linterna = en('secretos', .875), ensena = en('secretos', .941);
// ── plano 1: la meseta de noche ──
const p1 = (t) => {
  const o = { encuadre: 'meseta', hora: 'noche' };
  T.giza(R, t, o);
  // las dos luces: cálida en Keops (lo visto) y cian con «?» en Kefrén (lo que se dice)
  const u = tramo(t, dos - 0.2, dos + 0.4), late = t > secretos && t < secretos + 0.8 ? 1.5 : 0;
  if (u > 0) { R.halo(246, 88, (13 + late * 3) * u, [hex('#6a4a2a'), hex('#e8a040'), hex('#fff0a0')], 1.3); R.disco(246, 88, 3, hex('#fff8d0'));
    R.halo(140, 72, (13 + late * 3) * u, [hex('#123a62'), hex('#2a8ab6'), hex('#c8fbff')], 1.3); R.disco(140, 72, 3, PZ.br);
    for (const [cx, cy, c] of [[246, 88, hex('#ffe8a0')], [140, 72, PZ.br]]) R.anillo(cx, cy, 6 + ((t * 8) % 10), c, 3);
    if (u > 0.6) R.icono('?', 134, 46, PZ.br, PZ.f0, 2); }
  // los dos turistas sentados en una manta miran el espectáculo; uno hace una foto
  R.rect(14, 160, 70, 166, K); R.rect(15, 161, 69, 165, hex('#c84a3a')); for (let x = 17; x < 69; x += 6) R.rect(x, 161, x + 2, 165, hex('#e8b830'));
  const A = R.actor(EL.turista1, 22, 163, t, { dir: 1, sostiene: t > dos - 0.3, sorpresa: t > dos && t < dos + 0.6 });
  if (t > dos - 0.3) { R.rect(A.mano[0] - 1, A.mano[1] - 6, A.mano[0] + 3, A.mano[1], K); R.rect(A.mano[0], A.mano[1] - 5, A.mano[0] + 2, A.mano[1] - 1, hex('#3a3a46')); if (t > secretos && t < secretos + 0.12) R.halo(A.mano[0] + 1, A.mano[1] - 4, 14, [hex('#8a8aa8'), BL], 1.2); }
  R.actor(EL.turista2, 46, 163, t, { dir: 1, dedo: t > dos && t < secretos + 1, sonrisa: t > secretos });
  // el camellero cruza a la derecha
  const cx = Math.round(lerp(300, 200, tramo(t, 0, P2))); R.actor(EL.camellero, cx, 162, t, { dir: -1, anda: true });
  T.gizaDelante(R, t, o);
};
// ── plano 2: el corte nocturno ──
const SUELO = 104;
const fondo2 = () => capa('s2', () => {
  for (let y = 0; y < SUELO; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#0a0e24', '#10163a', '#18204a', '#22305a'), y / SUELO * 3.2 + (h(x >> 3, y >> 3, 2) - 0.5) * 0.3, x, y));
  // Keops en piedra, a la izquierda (luz de luna por la derecha)
  for (let y = 26; y <= SUELO; y++) { const w = Math.round((y - 26) * 76 / (SUELO - 26)); for (let x = 86 - w; x <= 86 + w; x++) { const blo = ((y >> 2) % 2 ? (x + 4) : x) % 10 === 0 || y % 4 === 0;
    R.pset(x, y, tono(RA('#2a2a3a', '#3a3a4e', '#4e4c62', '#64627a'), (x > 86 ? 2.2 : 1.2) + (h(x >> 2, y >> 2, 5) - 0.5) * 0.8 - (blo ? 0.9 : 0), x, y)); } }
  // Kefrén a la derecha, con su caliza arriba
  for (let y = 34; y <= SUELO; y++) { const w = Math.round((y - 34) * 70 / (SUELO - 34)); for (let x = 234 - w; x <= 234 + w; x++) { const blo = y % 4 === 0 || (((y >> 2) % 2 ? x + 5 : x) % 10 === 0);
    R.pset(x, y, tono(RA('#2a2a3a', '#3a3a4e', '#4e4c62', '#64627a', '#7a788e'), (x > 234 ? 2.2 : 1.2) + (y < 48 ? 1.4 : 0) + (h(x >> 2, y >> 2, 6) - 0.5) * 0.8 - (blo ? 0.9 : 0), x, y)); } }
  // el suelo en corte: roca oscura con estratos
  const EST = [RA('#5a4630', '#6a5238', '#7a6042'), RA('#3e3024', '#4a3a2a', '#584632'), RA('#4a3e34', '#58483c', '#665446'), RA('#2e241c', '#3a2e24', '#46382c')];
  for (let y = SUELO; y < 180; y++) for (let x = 0; x < 320; x++) { const yy = y - SUELO + Math.sin(x * 0.05) * 4 + Math.sin(x * 0.13) * 1.5, k = Math.max(0, Math.min(3, Math.floor(yy / 19))), borde = Math.abs(yy - Math.round(yy / 19) * 19) < 0.8 && yy > 2;
    R.pset(x, y, borde ? hex('#1a120c') : tono(EST[k], 1.2 + (h(x >> 1, y >> 1, k + 3) - 0.5) * 1.6 + (((x >> 2) + (y >> 1)) % 7 === 0 ? -0.8 : 0), x, y)); }
  R.linea(0, SUELO, 319, SUELO, hex('#8a7a5a')); R.linea(0, SUELO + 1, 319, SUELO + 1, hex('#2a2018'));
  for (let i = 0; i < 26; i++) { const x = Math.round(h(i, 1, 21) * 320), y = SUELO + 8 + Math.round(h(i, 2, 21) * 66), r = 2 + Math.round(h(i, 3, 21) * 3); R.disco(x, y, r + 1, hex('#1a120c')); R.disco(x, y, r, hex('#6a5a4a')); R.disco(x - 1, y - 1, Math.max(1, r - 2), hex('#8a7a62')); }
});
const p2 = (t) => {
  fondo2();
  estrellas(t, 0, 0, 320, 70, 70, 8); T.fugaz(R, t, 3);
  R.disco(206, 26, 7, hex('#f6f0d0')); R.disco(208, 25, 6, hex('#10163a'));
  // el pasillo de 2023, dentro de Keops, sobre la entrada norte: se enciende en «already seen», con el ojo encima
  const a = tramo(t, visto2 - 0.4, visto2 + 0.2);
  R.poligono([[46, 74], [56, 66], [66, 74]], hex('#7a7890')); R.rect(48, 74, 64, 84, hex('#0a0a12'));
  if (a > 0) { R.halo(56, 80, 28 * a, [hex('#5a3a1a'), hex('#c8903a'), hex('#ffe8a0')], 1); R.rect(50, 76, 62, 83, mez(hex('#0a0a12'), hex('#ffd880'), a));
    R.linea(50, 76, 56, 80, hex('#a87a3a')); R.linea(62, 76, 56, 80, hex('#a87a3a')); }
  if (a >= 1) { const b = Math.round(Math.sin(t * 4)); R.linea(46, 54 + b, 50, 50 + b, K); R.linea(50, 50 + b, 62, 50 + b, K); R.linea(62, 50 + b, 66, 54 + b, K); R.linea(46, 54 + b, 50, 58 + b, K); R.linea(50, 58 + b, 62, 58 + b, K); R.linea(62, 58 + b, 66, 54 + b, K);
    R.rect(49, 52 + b, 63, 56 + b, BL); R.disco(56, 54 + b, 2.5, hex('#3a6ab0')); R.pset(56, 54 + b, K); visto(70, 48, 1); }
  // bajo Kefrén, los pozos en holograma: parpadean en «says they've seen»
  const z = [168, SUELO + 2, 300, 176], on = tramo(t, dice - 0.3, dicho), fl = on > 0 && on < 1 && h(Math.floor(t * 14), 3) > 0.6;
  if (on <= 0 || fl) { R.recorte(z); for (let y = z[1]; y <= z[3]; y += 2) for (let x = z[0]; x <= z[2]; x += 2) if ((x - z[0]) % 8 === 0 || (y - z[1]) % 8 === 0) tin(x, y, PZ.co, 0.18); R.recorte(null); }
  if (on > 0 && !fl) {
    R.recorte(z);
    for (let y = z[1]; y <= z[3]; y++) for (let x = z[0]; x <= z[2]; x++) if (((x - z[0]) % 8 === 0 || (y - z[1]) % 8 === 0) && (x + y) % 2 === 0) R.pset(x, y, PZ.rjM); else if ((x + y) % 3 === 0) tin(x, y, PZ.f3, 0.6);
    const P = pluma(); for (let i = 0; i < 8; i++) { const x = 206 + i * 8; P.parte(x, SUELO + 2, x, 172, on * 1.2 - i * 0.02, 'c'); } P.l(z[0], SUELO + 3, z[2], SUELO + 3, 'c'); P.pintar(t);
    holo(t, z[3], z[0], z[2], false, z[1]); R.recorte(null);
    preguntaG(276, 128, 3, t);
  }
  // el bocadillo de «lo que se dice», que sale del pie de Kefrén
  if (t > dice - 0.2) { const g = tramo(t, dice - 0.2, dice + 0.1), bx = 272, by = 66;
    R.disco(bx, by, 11 * g + 1, PZ.co); R.disco(bx, by, 11 * g, PZ.f2); R.disco(262, 82, 2 * g, PZ.co); R.disco(258, 90, 1.5 * g, PZ.co);
    if (g >= 1) R.icono('?', bx - 4, by - 7, PZ.br, PZ.f0, 2); }
};
// ── plano 3: la puerta con la escalera que baja ──
const fondo3 = () => capa('s3', () => {
  for (let y = 0; y < 40; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#0a0e24', '#10163a', '#18204a'), y / 40 * 2.4, x, y));
  // el muro de sillares a la luz de la luna
  for (let y = 40; y < 150; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 40) / 14), jy = (y - 40) % 14 === 0, jx = (x + fila * 17) % 34 === 0;
    R.pset(x, y, tono(RA('#22283e', '#2e3550', '#3c4462', '#4a5476', '#5a6488'), 2.2 + (h(x >> 2, y >> 2, 4) - 0.5) * 1.0 - (jy || jx ? 1.5 : 0) + (x - 160) / 400, x, y)); }
  R.poligono([[0, 40], [0, 34], [60, 36], [140, 33], [220, 37], [320, 34], [320, 40]], hex('#3a4260'));
  // la puerta: un vano trapezoidal con dintel y la escalera que baja hacia lo oscuro
  R.poligono([[118, 150], [126, 56], [194, 56], [202, 150]], K);
  for (let y = 58; y < 150; y++) { const w0 = 127 + (y - 58) * 0.08, w1 = 193 - (y - 58) * 0.08; for (let x = Math.round(w0); x <= w1; x++) R.pset(x, y, tono(RA('#020208', '#06060e', '#0e0e18'), (y - 58) / 92 * 1.8, x, y)); }
  for (let k = 0; k < 7; k++) { const y = 150 - k * 10, w = 36 - k * 4; R.rect(160 - w, y - 2, 160 + w, y, tono(RA('#0e0e18', '#1c1c2a', '#2a2a3c'), 2 - k * 0.3, 0, 0)); R.linea(160 - w, y - 2, 160 + w, y - 2, hex('#3a3a50')); }
  R.rect(110, 46, 210, 56, K); R.rect(111, 47, 209, 55, hex('#5a6488')); R.linea(111, 47, 209, 47, hex('#7a84a8'));
  // grietas, sillares que faltan y la sombra de la luna en diagonal
  for (const [x0, y0, n] of [[30, 60, 14], [244, 90, 18], [84, 110, 10], [270, 56, 12]]) { let x = x0, y = y0; for (let i = 0; i < n; i++) { const nx = x + (h(i, x0, 2) > 0.5 ? 1 : -1), ny = y + 1; R.pset(nx, ny, hex('#141826')); x = nx; y = ny; } }
  for (const [x, y] of [[48, 82], [236, 124], [282, 68]]) { R.rect(x, y, x + 16, y + 12, hex('#141826')); R.rect(x + 1, y + 9, x + 15, y + 12, hex('#3a4260')); }
  for (let y = 40; y < 150; y++) for (let x = 0; x < 110; x++) if (x < (150 - y) * 0.9 && (x + y) % 2 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#0a0e24'), 0.35));
  // el suelo de arena con huellas
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(RA('#3a3a4a', '#4a4a5a', '#5a5a6a', '#6a6878'), 1.4 + (y - 150) / 20 + (h(x >> 1, y, 7) - 0.5) * 0.8, x, y));
  for (let k = 0; k < 9; k++) { const x = 300 - k * 14, y = 168 - (k % 2) * 4; R.rect(x, y, x + 3, y + 1, hex('#2a2a38')); }
  // una piedra caída y unas matas
  R.disco(40, 164, 9, K); R.disco(40, 164, 8, hex('#4a5476')); R.disco(38, 161, 4, hex('#5a6488'));
  for (const mx of [72, 250, 286]) for (let d = -3; d <= 3; d++) R.linea(mx, 160, mx + d * 2, 152 + Math.abs(d), hex('#3a5a3a'));
});
const p3 = (t) => {
  fondo3();
  estrellas(t, 0, 0, 320, 34, 30, 11);
  // el haz de la linterna ilumina los escalones
  const encendida = t > linterna, ux = tramo(t, alguien - 0.8, baja - 0.1), entra = tramo(t, ensena + 0.35, E.duracion);
  let x = Math.round(lerp(330, 206, suave(ux))), suelo = 154;
  if (entra > 0) { x = Math.round(lerp(206, 160, entra)); suelo = 154 + Math.round(entra * 8); }
  if (encendida) { R.recorte([126, 58, 194, 150]); R.halo(160, 132 + Math.round(entra * 10), 30, [hex('#2a2010'), hex('#8a6a30'), hex('#f0d080')], 1.1); R.recorte(null); }
  // la polilla y la linterna que espera en el escalón (apagada)
  const mx = Math.round(170 + Math.cos(t * 4) * 14), my = Math.round(120 + Math.sin(t * 6) * 10); R.pset(mx, my, hex('#8a8aa0')); R.pset(mx + (Math.floor(t * 18) % 2 ? 1 : -1), my - 1, hex('#c8c8d8'));
  const tiene = t > baja;
  if (!tiene) T.PIEZAS_GZ.linterna(R, 214, 152, { s: 2, dir: -1, encendida: false });
  // el técnico llega, la coge, la enciende y en «shows us» se vuelve hacia nosotros y señala abajo
  const vuelve = t > ensena - 0.1 && t < ensena + 0.3;
  const A = R.actor(EL.tecnicoEgipcio, x, suelo, t, { dir: vuelve ? 1 : -1, anda: (ux > 0 && ux < 1) || entra > 0, sostiene: tiene, sonrisa: vuelve, sorpresa: t > linterna && t < linterna + 0.4 });
  if (tiene) T.PIEZAS_GZ.linterna(R, A.mano[0] + (vuelve ? 6 : -6), A.mano[1] + 6, { s: 2, dir: vuelve ? 1 : -1, encendida, haz: encendida && !vuelve });
  // el marco de la puerta delante cuando baja
  if (entra > 0) { R.poligono([[110, 150], [118, 150], [126, 56], [118, 56]], hex('#3c4462')); }
};
const efectos = [[dos, 'brillo'], [secretos, 'flash'], [visto2, 'brillo'], [dice, 'zumbido'], [baja, 'golpecito'], [linterna, 'interruptor'], [ensena + 0.3, 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')
