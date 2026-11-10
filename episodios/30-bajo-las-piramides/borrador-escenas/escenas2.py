E = {}

# utilidades comunes de este grupo (cada escena las lleva dentro: no hay fichero compartido). El plano azul LOCAL copia
# el código del decorado C (gz-comun.js, c_PZ, c_planoFondo, c_pluma, c_holo): mismo azul noche, rejilla, cian que brilla
# y barrido de holograma, para que el corte entre el decorado y el inserto no cambie de color.
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

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['gz-salas'] = ('Salas', '''// GZ-SALAS (frase 5), 2025, sin cartela. Lo que DICEN los italianos, todo en plano azul. Cuatro planos:
// 1. (0 → «chambers») C plano/corte/general: Malanga entra por la tarima y Biondi, con el portátil, lanza las ondas de
//    radar desde el satélite; en «base» un visor se cierra sobre la base de Kefrén y en «five» se encienden las salas.
// 2. («chambers» → «Further») LOCAL las cinco salas de cerca bajo la base: se encienden una a una (cifras 1–5 y la
//    cuenta en la leyenda) siguiendo el cursor; en «linked» se trazan los pasillos y en «passageways» corre la luz.
// 3. («Further» → «they say») LOCAL los ocho pozos en perspectiva: en «eight» salen las ocho bocas (1–8), en «round»
//    brillan, en «hollow» se vacían por dentro y bajan rectos hasta «down»; Mei, en la tarima, los señala y los cuenta.
// 4. («they say» → fin) LOCAL un solo pozo enorme: desde «spiral» la rampa se enrosca hacia abajo girando, una
//    figurita baja por ella y en «thread» se dibuja al lado un tornillo gigante con la misma rosca, que gira en «screw».''', HELP + r'''
const sa = (f) => en('salas', f);
const P2 = sa(0.210), P3 = sa(0.466), P4 = sa(0.714);
const BASE = sa(0.133), CINCO = sa(0.185), CAMARAS = sa(0.214), UNIDAS = sa(0.311), PASILLOS = sa(0.396);
const OCHO = sa(0.499), REDONDOS = sa(0.519), HUECOS = sa(0.539), POZOS = sa(0.564), RECTO = sa(0.604), ABAJO = sa(0.621);
const ESPIRAL = sa(0.760), RAMPA = sa(0.785), BAJA = sa(0.857), ROSCA = sa(0.909), TORNILLO = sa(0.965);

// 1 · el corte general: las ondas de radar y las cinco salas que se encienden
const p1 = (t) => {
  const sal = tramo(t, CINCO - 0.25, P2 - 0.1);
  T.plano(R, t, { encuadre: 'corte', salas: sal, pozos: 0, espiral: 0, cubos: 0, hondo: 0, regla: 0 });
  // el haz del satélite (radar arriba a la izquierda) baja hasta Kefrén a pulsos
  const lanza = 0.1;
  if (t > lanza) for (let k = 0; k < 9; k++) { const u = ((t - lanza) * 1.6 + k / 9) % 1, x = Math.round(lerp(40, 158, u)), y = Math.round(lerp(30, 44, u)); R.pset(x, y, k % 3 ? PZ.co : PZ.br); R.pset(x + 1, y, PZ.hal2); }
  // las ondas que entran en la roca (recortadas a la roca del corte)
  R.recorte([13, 52, 267, 156]);
  if (t > lanza + 0.3) for (let k = 0; k < 5; k++) {
    const e = ((t - lanza - 0.3) * 0.55 + k * 0.2) % 1, r = 6 + e * 104, c = e < 0.45 ? PZ.ci : e < 0.75 ? PZ.co : PZ.hal2;
    for (let a = 0.05; a < Math.PI - 0.05; a += 1.2 / r) { const x = Math.round(160 + Math.cos(a) * r), y = Math.round(51 + Math.sin(a) * r * 0.7); if ((Math.round(a * r) & 3) < 3) { R.pset(x, y, c); if (e < 0.45) R.pset(x, y + 1, PZ.hal2); } }
  }
  // los ecos: puntitos que se encienden donde pasa la onda (lo que dicen haber visto) y suben al satélite
  if (t > lanza + 0.6) for (let k = 0; k < 14; k++) { const fx = 120 + h(k, 1) * 80, fy = 56 + h(k, 2) * 90, e = ((t - lanza) * 0.9 + h(k, 3)) % 1;
    if (e < 0.5) { R.pset(Math.round(fx), Math.round(fy), e < 0.15 ? PZ.br : PZ.ci); if (e < 0.15) { R.pset(Math.round(fx) + 1, Math.round(fy), PZ.co); R.pset(Math.round(fx) - 1, Math.round(fy), PZ.co); } } }
  R.recorte(null);
  // el visor que se cierra sobre la base en «base»
  const v = tramo(t, BASE - 0.15, BASE + 0.6);
  if (v > 0 && t < P2) {
    const x0 = Math.round(lerp(96, 121, sube(v))), x1 = Math.round(lerp(224, 199, sube(v))), y0 = Math.round(lerp(40, 49, sube(v))), y1 = Math.round(lerp(72, 62, sube(v)));
    const c = v < 1 || Math.floor(t * 6) % 2 ? PZ.br : PZ.ci;
    for (const [x, y, dx, dy] of [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]]) { R.linea(x, y, x + 6 * dx, y, c); R.linea(x, y, x, y + 4 * dy, c); }
  }
  // Biondi con el portátil lanza el barrido; Malanga entra y señala la base
  const b = R.actor(EL.biondi, 34, 172, t, { dir: 1, sostiene: [52, 157], sonrisa: t > CAMARAS - 0.3 });
  portatil(b);
  const u = tramo(t, 0.2, 1.7), mx = Math.round(lerp(300, 232, sube(u)));
  R.actor(EL.malanga, mx, 172, t, { dir: -1, anda: u > 0 && u < 1, dedo: t > BASE - 0.2 && t < CAMARAS - 0.1, habla: t > 1.9 && t < BASE - 0.2 && Math.floor(t * 7) % 2 === 0, sorpresa: t > CAMARAS - 0.1 });
  T.planoDelante(R, t, {});
};

// 2 · LOCAL las cinco salas de cerca, bajo la base de la pirámide
const CX = [64, 112, 160, 208, 256], SY0 = 84, SY1 = 106;
const fondoSalas = () => fondoAzul('salas', false, () => {
  // la base de Kefrén en corte: hiladas punteadas dentro del trapecio
  R.poligono([[34, 66], [286, 66], [244, 20], [76, 20]], (x, y) => (y % 4 === 0 && (x >> 1) % 3 !== 0 ? PZ.rjM : (x + y) % 9 === 0 ? PZ.rj : PZ.f2));
  for (let y = 24; y < 66; y += 4) { const xa = Math.round(76 - (y - 20) * 0.913), xb = Math.round(244 + (y - 20) * 0.913); R.linea(xa + 2, y, xb - 2, y, (y >> 2) % 2 ? PZ.rjM : PZ.rj); for (let x = xa + 4 + ((y >> 2) & 1) * 5; x < xb - 2; x += 10) R.linea(x, y + 1, x, y + 3, PZ.rj); }
  roca(6, 67, 314, 170, [118, 140, 160]);
  // la leyenda de la cuenta (abajo a la izquierda): la casilla de la sala
  R.poligono([[10, 132], [46, 132], [46, 166], [10, 166]], (x, y) => ((x + y) % 3 ? PZ.f1 : PZ.f0)); R.linea(10, 132, 46, 132, PZ.rjC); R.linea(10, 166, 46, 166, PZ.rjC); R.linea(10, 132, 10, 166, PZ.rjC); R.linea(46, 132, 46, 166, PZ.rjC);
});
const LUZ = CX.map((_, k) => CAMARAS + 0.05 + k * 0.3);
const p2 = (t) => {
  fondoSalas(); senal(t, 172);
  const P = pluma();
  P.poli([[34, 66], [76, 20], [244, 20], [286, 66]], 'c', 0, 3);
  P.l(6, 66, 314, 66, 'c'); P.cotaH(34, 286, 72, 'd');
  // los pasillos que se trazan en «linked» (dos líneas por pasillo) y la luz que corre en «passageways»
  for (let k = 0; k < 4; k++) { const u = tramo(t, UNIDAS + k * 0.28, UNIDAS + 0.35 + k * 0.28), xa = CX[k] + 18, xb = CX[k + 1] - 18;
    P.parte(xa, 92, xb, 92, u, 'c'); P.parte(xa, 97, xb, 97, u, 'c'); }
  // las salas: apagadas en punteado hasta que se encienden, cada una con su cifra
  let lit = 0;
  CX.forEach((cx, k) => {
    const on = t > LUZ[k], fl = tramo(t, LUZ[k], LUZ[k] + 0.35);
    if (on) { lit++; R.poligono([[cx - 17, SY0 + 1], [cx + 17, SY0 + 1], [cx + 17, SY1 - 1], [cx - 17, SY1 - 1]], (x, y) => (b4(x, y) < 0.35 ? PZ.hal : PZ.f3)); }
    P.caja(cx - 18, SY0, cx + 18, SY1, on ? (fl < 1 ? 'b' : 'c') : 'd', on ? 0 : 4);
    if (on) { P.caja(cx - 14, SY0 + 4, cx + 14, SY1 - 4, 'd'); P.l(cx - 6, SY1 - 4, cx - 6, SY1 - 10, 'e'); P.l(cx + 6, SY1 - 4, cx + 6, SY1 - 10, 'e'); P.l(cx - 6, SY1 - 10, cx + 6, SY1 - 10, 'e');
      P.n(k + 1, cx - 2, SY0 - 4, fl < 1 ? PZ.br : PZ.ci);
      if (fl < 1) R.anillo(cx, (SY0 + SY1) >> 1, Math.round(12 + fl * 16), fl < 0.5 ? PZ.br : PZ.co, 2); }
  });
  // la luz que recorre las cinco salas por los pasillos
  if (t > PASILLOS) { const u = ((t - PASILLOS) * 0.7) % 1, x = Math.round(lerp(CX[0], CX[4], u)); R.disco(x, 94, 3, PZ.hal2); R.disco(x, 94, 1, PZ.br); }
  // el cursor que va de sala en sala
  const kk = Math.max(0, Math.min(4, Math.floor((t - CAMARAS) / 0.3))), u = tramo(t, P2 + 0.1, CAMARAS), cxk = t < CAMARAS ? lerp(30, CX[0], sube(u)) : CX[kk];
  const cy = 120 + Math.round(Math.sin(t * 5) * 1);
  P.l(cxk, cy - 4, cxk, cy - 9, 'b'); P.flecha(cxk, cy - 10, 0, -1, 'b'); P.l(cxk - 3, cy, cxk + 3, cy, 'c');
  // la cuenta en la leyenda: el icono de sala y la cifra
  P.caja(15, 140, 27, 146, 'c'); P.n(lit, 36, 152, lit === 5 ? PZ.br : PZ.ci);
  // al final, las bocas de lo que hay más abajo, apenas (lo que viene)
  const f = tramo(t, PASILLOS - 0.3, P3);
  for (let k = 0; k < 8; k++) { const x = 52 + k * 31; P.l(x, 114, x, 164, 'D', 6); if (f > 0) P.parte(x, 112, x, 112 + 50, f, 'd', 4); }
  P.cotaV(280, 84, 106, 'd'); P.l(20, 66, 20, 106, 'D', 4); P.l(16, 84, 24, 84, 'D'); P.l(16, 106, 24, 106, 'D');
  P.pintar(t);
  holo(t, 171);
};

// 3 · LOCAL los ocho pozos en perspectiva, con Mei en la tarima
const PZX = [...Array(8)].map((_, i) => 46 + i * 26), PZY = (i) => 54 - i * 2;
const fondoOcho = () => fondoAzul('ocho', true, () => {
  // el plano del suelo bajo la pirámide, en perspectiva, con su rejilla
  R.poligono([[22, 62], [250, 62], [272, 30], [48, 30]], (x, y) => ((x + y) % 4 === 0 ? PZ.rjM : PZ.f2));
  for (let k = 1; k < 8; k++) { const y = 30 + k * 4; R.linea(Math.round(48 - (y - 30) * 0.8125), y, Math.round(272 - (y - 30) * 0.6875), y, PZ.rj); }
  roca(6, 63, 314, 156, [96, 128]);
});
const p3 = (t) => {
  fondoOcho(); senal(t);
  const P = pluma();
  P.poli([[22, 62], [250, 62], [272, 30], [48, 30]], 'd');
  // la huella de Kefrén y su contorno, encima del plano
  P.poli([[118, 50], [196, 50], [208, 36], [130, 36]], 'c'); P.l(118, 50, 164, 22, 'c'); P.l(196, 50, 164, 22, 'c'); P.l(208, 36, 164, 22, 'd'); P.l(130, 36, 164, 22, 'D');
  // los ocho pozos: bocas que salen en «eight», brillan en «round», se vacían en «hollow» y bajan hasta «down»
  PZX.forEach((cx, i) => {
    const ap = tramo(t, OCHO - 0.05 + i * 0.07, OCHO + 0.25 + i * 0.07);
    if (ap < 1) for (let a = 0; a < 6.283; a += 0.5) P.p(Math.round(cx + Math.cos(a) * 8), Math.round(PZY(i) + Math.sin(a) * 3), 'D');
    if (ap <= 0) return;
    const yt = PZY(i), r = 8, ry = 3, largo = tramo(t, POZOS - 0.4 + i * 0.06, ABAJO + 0.1 + i * 0.04), yb = Math.round(yt + 6 + largo * (128 - yt));
    const hueco = tramo(t, HUECOS, HUECOS + 0.5);
    if (largo > 0 && hueco > 0) R.poligono([[cx - r + 1, yt], [cx + r - 1, yt], [cx + r - 1, yb], [cx - r + 1, yb]], (x, y) => (b4(x, y) < 0.5 + hueco * 0.5 ? PZ.f0 : PZ.f1));
    if (largo > 0) { P.l(cx - r, yt, cx - r, yb, 'c', yb > 120 ? 0 : 0); P.l(cx + r, yt, cx + r, yb, 'c'); if (hueco > 0) P.l(cx - 3, yt + 2, cx - 3, yb, 'D', 4);
      if (largo >= 1) { P.flecha(cx, 140 - Math.round((t * 6 + i) % 4), 0, 1, 'b'); } else P.p(cx, yb, 'b'); }
    const brilla = t > REDONDOS && t < REDONDOS + 0.5;
    for (let a = 0; a < 6.283; a += 0.25) { const x = cx + Math.cos(a) * r * ap, y = yt + Math.sin(a) * ry * ap; P.p(Math.round(x), Math.round(y), Math.sin(a) > 0 ? (brilla ? 'b' : 'c') : 'd'); }
    const nu = tramo(t, OCHO + i * 0.07, OCHO + 1.2 + i * 0.07);
    if (nu > 0 && nu < 1) P.n(i + 1, cx - 2, yt - 6, PZ.br);
  });
  // la cifra 8 grande a la izquierda, que se queda
  const c8 = tramo(t, OCHO + 0.6, OCHO + 0.9);
  if (c8 > 0) { R.numero('8', 22, 104, { tam: 16, color: PZ.br, contorno: false, sombra: false }); R.anillo(29, 96, 13, PZ.co, 2); }
  P.pintar(t);
  holo(t);
  // Mei en la tarima los cuenta con el dedo y se vuelve hacia nosotros en «straight down»
  R.actor(EL.mei, 262, 172, t, { dir: -1, dedo: t > OCHO - 0.1 && t < RECTO, habla: t > RECTO && t < P4 - 0.3 && Math.floor(t * 7) % 2 === 0, sorpresa: t > HUECOS && t < HUECOS + 0.5 });
  T.planoDelante(R, t, {});
};

// 4 · LOCAL un pozo enorme con la rampa en espiral y el tornillo gigante al lado
const PCX = 106, PYA = 34;
const fondoPozo = () => fondoAzul('pozo', false, () => {
  // la base de la pirámide arriba y la superficie
  R.poligono([[36, 34], [176, 34], [164, 20], [48, 20]], (x, y) => (y % 4 === 0 && (x >> 1) % 3 !== 0 ? PZ.rjM : PZ.f2));
  roca(6, 35, 200, 170, [80, 130]);
  // la regla de profundidad (marcas sin cifras)
  for (let y = 40; y < 170; y += 6) R.linea(10, y, y % 30 === 4 ? 18 : 14, y, PZ.rjC);
  R.linea(10, 38, 10, 170, PZ.rjM);
});
const p4 = (t) => {
  fondoPozo(); senal(t, 172);
  const P = pluma();
  P.poli([[36, 34], [48, 20], [164, 20], [176, 34]], 'c', 0, 3); P.l(6, 34, 200, 34, 'c');
  // el hueco del pozo (oscuro) y la rampa que se enrosca hacia abajo desde «spiral»
  R.poligono([[PCX - 11, PYA + 1], [PCX + 11, PYA + 1], [PCX + 11, 171], [PCX - 11, 171]], (x, y) => (b4(x, y) < 0.7 ? PZ.f0 : PZ.f1));
  const ymax = lerp(PYA, 172, sube(tramo(t, ESPIRAL - 0.25, BAJA + 0.3)));
  espiral(P, PCX, PYA + 4, 172, 34, 24, t, true, 1, ymax);
  P.l(PCX - 12, PYA, PCX - 12, 171, 'c'); P.l(PCX + 12, PYA, PCX + 12, 171, 'c');
  for (let a = 0; a < 6.283; a += 0.2) P.p(Math.round(PCX + Math.cos(a) * 12), Math.round(PYA + Math.sin(a) * 3), Math.sin(a) > 0 ? 'c' : 'd');
  espiral(P, PCX, PYA + 4, 172, 34, 24, t, false, 3, ymax);
  // el tornillo gigante, con la misma rosca, que se dibuja en «thread» y gira en «screw»
  const tu = tramo(t, ROSCA - 0.5, TORNILLO - 0.1), TX = 236, gira = t > TORNILLO ? (t - TORNILLO) * 2.4 : 0;
  if (tu > 0) {
    P.parte(TX - 18, 40, TX + 18, 40, tu * 3, 'c'); P.parte(TX - 18, 40, TX - 14, 30, tu * 3 - 0.3, 'c'); P.parte(TX + 18, 40, TX + 14, 30, tu * 3 - 0.3, 'c'); P.parte(TX - 14, 30, TX + 14, 30, tu * 3 - 0.6, 'c');
    const ang = gira * 1.3, sx = Math.round(Math.cos(ang) * 9);
    if (tu > 0.4) P.l(TX - sx, 34, TX + sx, 34, 'b');
    const lar = tramo(tu, 0.3, 1);
    P.parte(TX - 9, 40, TX - 9, 150, lar, 'c'); P.parte(TX + 9, 40, TX + 9, 150, lar, 'c'); P.parte(TX - 9, 150, TX, 162, lar * 2 - 1, 'c'); P.parte(TX + 9, 150, TX, 162, lar * 2 - 1, 'c');
    for (let y = 44; y < 40 + lar * 110; y += 10) { const d = ((gira * 24 / 6.283 * 10 / 24) % 10 + 10) % 10; const yy = Math.round(y + d); if (yy > 148) continue; P.l(TX - 9, yy, TX + 9, yy - 6, 'e'); P.l(TX - 9, yy, TX - 12, yy - 2, 'd'); }
  }
  // la planta del pozo vista desde arriba (a la derecha), con la rampa que gira, hasta que llega el tornillo
  const pl = 1 - tramo(t, ROSCA - 0.1, ROSCA + 0.3);
  if (pl > 0) { const cx = 236, cy = 92, k = pl < 1 ? 'd' : 'c';
    P.caja(200, 52, 272, 132, 'D'); for (let a = 0; a < 6.283; a += 0.3) P.p(Math.round(cx + Math.cos(a) * 10), Math.round(cy + Math.sin(a) * 10), k);
    let q = null; for (let a = 0; a < 6.283 * 2.2; a += 0.15) { const rr = 14 + a * 1.6, x = Math.round(cx + Math.cos(a - t * 2.4) * rr), y = Math.round(cy + Math.sin(a - t * 2.4) * rr); if (q && a < 6.283 * 2.2 * tramo(t, ESPIRAL - 0.4, RAMPA + 0.4)) P.l(q[0], q[1], x, y, k); q = [x, y]; }
    P.flecha(cx + 36, cy - 30, 1, 0, 'b'); }
  // el «=» entre el pozo y el tornillo
  if (t > TORNILLO - 0.2) { const on = Math.floor(t * 5) % 2 ? 'b' : 'c'; P.l(166, 92, 182, 92, on); P.l(166, 97, 182, 97, on); }
  P.pintar(t);
  // la figurita que baja por la rampa (solo se ve en las vueltas de delante)
  const s = tramo(t, RAMPA, sa(1) + 0.9);
  if (s > 0) {
    // va siempre por la vuelta de delante: baja con la rosca mientras gira (como quien baja una escalera de caracol)
    const fi = Math.PI / 2 - 0.45, yv = (tt) => PYA + 4 + 24 * (fi + tt * 2.4) / 6.2832, n = Math.floor((yv(RAMPA) - (PYA + 14)) / 24), y = yv(t) - 24 * n, x = PCX + 34 * Math.cos(fi);
    if (y < ymax) figurita(x, y - 1, t, true);
    if (t < RAMPA + 1.4) marca(x, y - 4, 7, t); }
  holo(t, 171);
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  año: 2025,
  efectos: [[0.6, 'zumbido'], [BASE, 'bip'], [LUZ[0], 'pop'], [LUZ[4], 'pop'], [UNIDAS, 'brillo'], [OCHO, 'pop'], [POZOS, 'whoosh'], [ESPIRAL, 'zumbido'], [TORNILLO, 'brillo']],
});
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['gz-cubos'] = ('Cubos', '''// GZ-CUBOS (frase 6), 2025, sin cartela. Lo que DICEN los italianos, en plano azul. Cuatro planos:
// 1. (0 → «more») C plano/corte/pozos (o.baja): en «go down» la cámara baja por los pozos con la rosca girando; la
//    regla de profundidad llega a 650 en «650» y late; Biondi baja con el portátil y Malanga se asombra.
// 2. («more» → «two») C plano/mataha/regla (sin lupa): en «four times» se apilan al lado cuatro pirámides fantasma
//    contadas 1–4 hasta la cota 650 que Mei va contando con el dedo; en «At the bottom» laten los cubos del fondo.
// 3. («two» → «And») LOCAL los dos cubos enormes que se dibujan arista a arista desde «cube»; una figurita diminuta
//    llega andando a la esquina y una lupa la enseña (escala); cotas 80 y 90 en «80» y en «90».
// 4. («And» → fin) LOCAL lo que se pierde hacia abajo: una sonda de holograma baja entre galerías y salas que se van
//    apagando; la regla cuenta hasta 2000 en «two kilometers» y abajo queda una «?».''', HELP + r'''
const cu = (f) => en('cubos', f);
const P2 = cu(0.243), P3 = cu(0.468), P4 = cu(0.747);
const VAN = cu(0.073), M650 = cu(0.124), CUATRO = cu(0.274), PIR = cu(0.363), FONDO = cu(0.420);
const CUBO = cu(0.513), OCHENTA = cu(0.604), NOVENTA = cu(0.632), LADO = cu(0.700);
const HONDO = cu(0.771), ESTRUCT = cu(0.819), DOSK = cu(0.928), KM = cu(0.947);

// 1 · corte/pozos: la cámara baja por los pozos hasta 650
const p1 = (t) => {
  const baja = 0.25 + 0.75 * sube(tramo(t, VAN - 0.5, M650 + 0.05));
  T.plano(R, t, { encuadre: 'corte', camara: 'pozos', baja, cubos: 0 });
  // la cifra de la regla late en «650»
  if (t > M650) { marca(17, 99, 12, t); }
  const b = R.actor(EL.biondi, 232, 172, t, { dir: -1, sostiene: [218, 157], habla: t > M650 + 0.4 && Math.floor(t * 7) % 2 === 0 });
  portatil(b);
  R.actor(EL.malanga, 44, 172, t, { dir: 1, dedo: t > VAN - 0.3 && t < M650 - 0.2, sorpresa: t > M650 - 0.1 && t < M650 + 1.2, sonrisa: t > M650 + 1.2 });
  T.planoDelante(R, t, {});
};

// 2 · mataha/regla: cuatro pirámides fantasma apiladas hasta los 650 m
const TX = 212, TW = 16, TH = 21;
const p2 = (t) => {
  T.plano(R, t, { encuadre: 'mataha', camara: 'regla', lupa: 0 });
  const P = pluma();
  P.l(168, 46, TX + TW + 10, 46, 'd', 4);
  for (let k = 0; k < 5; k++) {
    const u = tramo(t, CUATRO - 0.3 + k * 0.32, CUATRO + 0.05 + k * 0.32); if (u <= 0) continue;
    const yb = 46 + TH * (k + 1), y0 = yb - TH, parcial = k === 4;
    const ya = parcial ? yb - Math.round(TH * 0.4) : y0;
    if (parcial) { P.parte(TX - TW, Math.min(yb, 138), TX + TW, Math.min(yb, 138), u, 'd', 4); }
    else { P.parte(TX - TW, yb, TX, y0, u * 2, 'c'); P.parte(TX, y0, TX + TW, yb, u * 2 - 1, 'c'); P.parte(TX - TW, yb, TX + TW, yb, u, 'd'); P.n(k + 1, TX - TW - 8, yb - 6, u < 1 ? PZ.br : PZ.ci); }
  }
  if (t > PIR) { P.cotaV(TX + TW + 6, 46, 138, 'c'); P.n('650', TX + TW + 10, 96, PZ.br); P.l(112, 138, TX + TW + 6, 138, 'd', 4); }
  // en «At the bottom» laten los cubos del fondo de los pozos
  if (t > FONDO) { const c = Math.floor(t * 5) % 2 ? PZ.br : PZ.ci; for (const [x, y, dx, dy] of [[42, 132, 1, 1], [99, 132, -1, 1], [42, 153, 1, -1], [99, 153, -1, -1]]) { R.linea(x, y, x + 5 * dx, y, c); R.linea(x, y, x, y + 4 * dy, c); } }
  P.pintar(t);
  R.actor(EL.mei, 264, 172, t, { dir: -1, dedo: t > CUATRO - 0.3 && t < PIR + 0.4, sonrisa: t > PIR + 0.4 });
  R.actor(EL.malanga, 30, 172, t, { dir: 1, sorpresa: t > FONDO && t < FONDO + 0.8, habla: t > P2 + 0.3 && t < CUATRO - 0.2 && Math.floor(t * 7) % 2 === 0 });
  T.planoDelante(R, t, {});
};

// 3 · LOCAL los dos cubos enormes, la figurita y su lupa
const fondoCubos = () => fondoAzul('cubos', false, () => {
  roca(6, 18, 314, 170, [52, 160]);
  // la galería que une los pozos (arriba) y la boca de cada pozo
  R.poligono([[20, 40], [262, 40], [262, 46], [20, 46]], (x, y) => ((x + y) % 2 ? PZ.f1 : PZ.f0));
});
const p3 = (t) => {
  fondoCubos(); senal(t, 172);
  const P = pluma();
  P.l(20, 40, 262, 40, 'c'); P.l(20, 46, 262, 46, 'c');
  for (let k = 0; k < 8; k++) { const x = 36 + k * 30; P.l(x - 4, 16, x - 4, 40, 'd'); P.l(x + 4, 16, x + 4, 40, 'd'); }
  // los cubos, arista a arista desde «cube» (80 px de lado: 1 m por píxel)
  const ua = tramo(t, CUBO - 0.35, CUBO + 1.2), ub = tramo(t, CUBO - 0.05, CUBO + 1.5);
  if (t > P3 + 0.2) { P.l(80, 46, 80, 64, 'd', 4); P.l(208, 46, 208, 64, 'd', 4); }
  if (ua < 1) { P.caja(40, 64, 120, 144, 'D', 6); P.l(40, 64, 60, 50, 'D', 6); P.l(120, 64, 140, 50, 'D', 6); P.l(60, 50, 140, 50, 'D', 6); P.l(140, 50, 140, 130, 'D', 6); }
  if (ub < 1) { P.caja(168, 64, 248, 144, 'D', 6); P.l(168, 64, 188, 50, 'D', 6); P.l(248, 64, 268, 50, 'D', 6); P.l(188, 50, 268, 50, 'D', 6); P.l(268, 50, 268, 130, 'D', 6); }
  cubo(P, 40, 64, 80, 20, -14, ua); cubo(P, 168, 64, 80, 20, -14, ub);
  // el escáner que barre los cubos mientras se dibujan
  if (t > P3 && t < CUBO + 1.6) { const sx2 = Math.round(lerp(30, 280, ((t - P3) * 0.5) % 1)); P.l(sx2, 48, sx2, 150, 'd', 3); }
  if (t > OCHENTA) { P.cotaH(40, 120, 152, 'c'); P.n('80', 73, 162, t < OCHENTA + 0.6 ? PZ.br : PZ.ci); }
  if (t > NOVENTA) { P.cotaV(256, 64, 144, 'c'); P.n('90', 260, 108, t < NOVENTA + 0.6 ? PZ.br : PZ.ci); }
  P.pintar(t);
  // la figurita que llega a la esquina del primer cubo y mira arriba
  const w = tramo(t, P3 + 0.3, CUBO + 0.6), fx = lerp(12, 46, w);
  figurita(fx, 144, t, w > 0 && w < 1);
  if (t > CUBO + 0.8 && t < OCHENTA) R.icono('!', Math.round(fx) - 1, 128, PZ.br, PZ.f0);
  // la lupa que la enseña en grande (en «80», cuando se lee el tamaño)
  const l = tramo(t, OCHENTA - 0.6, OCHENTA);
  if (l > 0) {
    const lx = 90, ly = 112, r = Math.round(4 + l * 13);
    R.linea(Math.round(fx), 141, lx - 9, ly + 9, PZ.co);
    R.recorte([lx - r, ly - r, lx + r, ly + r]);
    R.disco(lx, ly, r, PZ.f1);
    if (l >= 1) { const ox = lx - 3, oy = ly + 9; R.disco(ox + 3, oy - 15, 3, PZ.br); R.poligono([[ox, oy - 11], [ox + 6, oy - 11], [ox + 6, oy - 4], [ox, oy - 4]], PZ.ci); R.linea(ox + 1, oy - 4, ox + 1, oy, PZ.ci); R.linea(ox + 5, oy - 4, ox + 5, oy, PZ.ci); R.linea(ox - 1, oy - 10, ox - 3, oy - 13, PZ.ci); }
    R.recorte(null);
    R.anillo(lx, ly, r, PZ.br); R.anillo(lx, ly, r + 1, PZ.co); R.linea(lx + r - 2, ly + r - 2, lx + r + 6, ly + r + 6, PZ.ci); R.linea(lx + r - 1, ly + r - 2, lx + r + 7, ly + r + 6, PZ.co);
  }
  holo(t, 171);
};

// 4 · LOCAL lo que se pierde hacia abajo: la sonda baja y la regla llega a 2000
const CAM = 300;
const p4 = (t) => {
  fondoAzul('hondo', false, () => roca(40, 16, 260, 170, []));
  const u = tramo(t, P4 + 0.1, KM), cam = sube(u) * 0.4 * CAM + u * 0.6 * CAM, Y = (y) => Math.round(y - cam + 20);
  R.recorte([0, 16, 319, 171]);
  const P = pluma();
  const tipo = (y) => (y < 250 ? 'c' : y < 380 ? 'd' : 'D'), pt = (y) => (y < 300 ? 0 : y < 400 ? 6 : 10);
  // los fondos de los dos cubos
  for (const x0 of [44, 172]) { if (Y(60) < -20) break; P.l(x0, Y(-40), x0, Y(60), 'c'); P.l(x0 + 80, Y(-40), x0 + 80, Y(60), 'c'); P.l(x0, Y(60), x0 + 80, Y(60), 'c'); P.l(x0 + 80, Y(60), x0 + 100, Y(46), 'd'); P.l(x0 + 100, Y(-40), x0 + 100, Y(46), 'd'); }
  // los pozos que siguen bajando y las galerías con salas a cada nivel
  for (const x of [70, 104, 198, 232]) for (let y = 60; y < 500; y += 20) { const sy = Y(y); if (sy < -24 || sy > 190) continue; P.l(x, sy, x, sy + 19, tipo(y), pt(y) || 4); }
  [[120, 0], [190, 1], [260, 2], [330, 3], [400, 4], [470, 5]].forEach(([y, n]) => {
    const sy = Y(y); if (sy < -30 || sy > 200) return;
    P.l(50, sy, 252, sy, tipo(y), pt(y)); P.l(50, sy + 5, 252, sy + 5, tipo(y), pt(y));
    for (let k = 0; k < 3; k++) { const x0 = 58 + k * 66 + (n % 2) * 18, w = 24 + ((k + n) % 3) * 8, hh = 12 + ((k * 2 + n) % 3) * 5; P.caja(x0, sy + 8, x0 + w, sy + 8 + hh, tipo(y + 10), pt(y + 10)); if (n < 2) P.l(x0 + 4, sy + 8 + hh - 4, x0 + w - 4, sy + 8 + hh - 4, 'D'); }
    // la escalera en zigzag que baja al nivel siguiente
    for (let s = 0; s < 6; s++) { const a = sy + 6 + s * 12; P.l(150 + (s % 2 ? 12 : -12), a, 150 + (s % 2 ? -12 : 12), a + 12, tipo(y + 20), pt(y + 20) || 0); }
  });
  P.pintar(t);
  R.recorte(null);
  // lo que se pierde en la oscuridad: cada vez más tapado hacia abajo
  for (let y = 104; y < 172; y++) { const a = (y - 104) / 68 * (0.45 + u * 0.4); for (let x = 7; x < 314; x++) if (b4(x, y) < a) { const c = R.pget(x, y); if (c !== PZ.f0) R.pset(x, y, (x + y) % 5 ? PZ.f0 : PZ.f1); } }
  // la sonda de holograma que baja colgada de su cable, con su cono de luz
  const sx = 152, sy = 50 + Math.round(Math.sin(t * 2) * 1.5);
  R.linea(sx, 16, sx, sy - 6, PZ.co);
  for (let y = sy + 8; y < sy + 90; y++) { const w = (y - sy - 8) * 0.5; for (let x = Math.round(sx - w); x <= sx + w; x++) if ((x + y + Math.floor(t * 10)) % 3 === 0) tin(x, y, PZ.ci, 0.35 * (1 - (y - sy) / 90)); }
  R.poligono([[sx - 7, sy - 8], [sx + 7, sy - 8], [sx + 7, sy + 5], [sx - 7, sy + 5]], PZ.f1); R.anillo(sx, sy - 1, 9, PZ.hal2, 2);
  for (const [a, b, c2, d] of [[sx - 7, sy - 8, sx + 7, sy - 8], [sx - 7, sy + 5, sx + 7, sy + 5], [sx - 7, sy - 8, sx - 7, sy + 5], [sx + 7, sy - 8, sx + 7, sy + 5]]) R.linea(a, b, c2, d, PZ.ci);
  R.linea(sx - 4, sy - 11, sx + 4, sy - 11, PZ.co); R.linea(sx - 4, sy - 11, sx - 7, sy - 8, PZ.co); R.linea(sx + 4, sy - 11, sx + 7, sy - 8, PZ.co);
  for (let k = -4; k <= 4; k += 4) R.linea(sx + k, sy - 6, sx + k, sy + 3, PZ.hal2);
  R.disco(sx, sy + 7, 2, Math.floor(t * 6) % 2 ? PZ.br : PZ.ci); R.pset(sx - 5, sy - 6, Math.floor(t * 3) % 2 ? PZ.mg : PZ.mgO);
  // la regla de la izquierda: marcas que suben y la cifra de profundidad
  R.linea(30, 16, 30, 170, PZ.rjC);
  for (let y = 0; y < 420; y += 20) { const s = Y(y); if (s > 16 && s < 170) { R.linea(26, s, 34, s, PZ.co); } }
  const prof = u >= 0.995 ? 2000 : Math.round(lerp(650, 2000, u) / 10) * 10;
  R.poligono([[4, 92], [44, 92], [44, 106], [4, 106]], PZ.f0); R.linea(4, 92, 44, 92, PZ.co); R.linea(4, 106, 44, 106, PZ.co); R.linea(4, 92, 4, 106, PZ.co); R.linea(44, 92, 44, 106, PZ.co);
  R.numero(String(prof), 24, 103, { centro: true, fina: true, color: t > DOSK ? PZ.br : PZ.ci });
  if (t > DOSK) marca(24, 99, 14, t);
  // abajo, la «?» que queda en la oscuridad
  const q = tramo(t, KM + 0.2, KM + 0.8);
  if (q > 0) R.icono('?', 145, 128 + Math.round(Math.sin(t * 3) * 2), q < 1 || Math.floor(t * 3) % 2 ? PZ.ci : PZ.co, PZ.f0, 3);
  senal(t, 172);
  holo(t, 171);
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  año: 2025,
  efectos: [[VAN, 'whoosh'], [M650, 'bip'], [CUATRO, 'pop'], [PIR, 'pop'], [FONDO, 'bip'], [CUBO, 'lapiz'], [OCHENTA, 'brillo'], [HONDO, 'whoosh'], [DOSK, 'bip']],
});
''')

# ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['gz-leyendas'] = ('Leyendas', '''// GZ-LEYENDAS (frase 7), 2025 (y 1933 en el despacho de Cayce), sin cartela. Cuatro planos:
// 1. (0 → «and the hall») C plano/keops/leyenda: Malanga abre en la tarima un libro viejo; en «legends» salen de él
//    símbolos que suben hacia la Esfinge de holograma; en «halls» se dibuja la sala de columnas; Mei la señala.
// 2. («and» → «Soon») LOCAL el despacho de Edgar Cayce en los años treinta (estilo real): Cayce en el diván, en trance,
//    habla con los ojos cerrados desde «Edgar»; la taquígrafa escribe; en «placed by the Sphinx» se abre encima un
//    bocadillo en plano azul con la Esfinge y la puerta bajo sus patas; la lámpara, el reloj y el mar por la ventana.
// 3. («Soon» → «their drawings») B italia/video/general: una creadora de vídeos habla a su cámara; en «entire city»
//    abre los brazos y en «city» la pantalla verde se vuelve una ciudad bajo Giza en plano azul; en «Giza» la señala.
// 4. («their drawings» → fin) B italia/video/movil: las pantallas del mundo se van encendiendo con los dibujos; la
//    gente de la cocina, del metro y del bar se asombra; junto al pin de Italia cuentan los días 1, 2, 3.''', HELP + r'''
const le = (f) => en('leyendas', f);
const P2 = le(0.268), P3 = le(0.594), P4 = le(0.823);
const LEYENDAS = le(0.063), SALAS = le(0.119), LIBROS = le(0.238), REG = le(0.312), EDGAR = le(0.427), SITUA = le(0.486), ESFINGE = le(0.541);
const ENTERA = le(0.700), CIUDAD = le(0.725), GIZA = le(0.770), DIBUJOS = le(0.834), MUNDO = le(0.907), DIAS = le(0.966);

// 1 · keops/leyenda: el libro de Malanga y los símbolos que vuelan a la Esfinge
const GLIFOS = [
  ['.###.', '##.##', '#...#', '#...#', '#...#'], ['#####', '.#.#.', '.#.#.', '.#.#.', '#####'], ['.###.', '#.#.#', '.###.', '.....', '.....'],
  ['....#', '...##', '..###', '.####', '#####'], ['..#..', '.###.', '#####', '.....', '.....'], ['.###.', '#####', '#####', '.###.', '.....']];
const glifo = (g, x, y, c) => g.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') { const X = Math.round(x) + i * 2, Y = Math.round(y) + j * 2; R.rect(X, Y, X + 1, Y + 1, c); R.pset(X + 2, Y + 1, PZ.hal); } });
const DEST = [[150, 120], [176, 112], [206, 120], [230, 130], [118, 100], [196, 60]];
const p1 = (t) => {
  T.plano(R, t, { encuadre: 'keops', camara: 'leyenda', simbolos: tramo(t, 0.3, P2 - 0.2) });
  // los símbolos que salen del libro en «legends» y vuelan en arco hasta la Esfinge y la sala
  DEST.forEach(([dx, dy], k) => {
    const u = tramo(t, LEYENDAS + k * 0.25, LEYENDAS + 1.4 + k * 0.25); if (u <= 0) return;
    const x = lerp(66, dx, u), y = lerp(146, dy, u) - Math.sin(u * Math.PI) * 30;
    glifo(GLIFOS[k], x, y, u < 1 ? PZ.br : (Math.floor(t * 4 + k) % 3 ? PZ.ci : PZ.co));
    if (u < 1) { tin(x - 2, y + 2, PZ.ci, 0.5); tin(x - 4, y + 4, PZ.co, 0.4); }
  });
  // Malanga con el libro: cerrado al principio, abierto desde «books» (las hojas pasan)
  const a = R.actor(EL.malanga, 38, 172, t, { dir: 1, sostiene: [58, 152], habla: t > 0.4 && t < LEYENDAS && Math.floor(t * 7) % 2 === 0, sonrisa: t > LIBROS });
  const [bx, by] = a.mano, abre = t > LEYENDAS - 0.3;
  if (!abre) { R.rect(bx - 1, by - 8, bx + 7, by + 1, hex('#3a1e10')); R.rect(bx, by - 7, bx + 6, by, hex('#7a3a1e')); R.rect(bx + 6, by - 7, bx + 6, by, hex('#e8dcb8')); R.pset(bx + 3, by - 4, hex('#d8a83a')); }
  else {
    R.rect(bx - 6, by - 6, bx + 10, by + 1, hex('#3a1e10')); R.rect(bx - 5, by - 5, bx + 1, by, hex('#efe2c0')); R.rect(bx + 3, by - 5, bx + 9, by, hex('#efe2c0')); R.linea(bx + 2, by - 6, bx + 2, by + 1, hex('#7a3a1e'));
    for (let j = 0; j < 3; j++) { R.linea(bx - 4, by - 4 + j * 2, bx, by - 4 + j * 2, hex('#a89870')); R.linea(bx + 4, by - 4 + j * 2, bx + 8, by - 4 + j * 2, hex('#a89870')); }
    const f = Math.floor((t - LEYENDAS) * 3) % 4; if (t < LIBROS + 0.6 && f < 2) { R.linea(bx + 2, by - 6, bx + (f ? 8 : 5), by - 10, hex('#f6ecd0')); R.linea(bx + 2, by, bx + (f ? 8 : 5), by - 4, hex('#d8c8a0')); }
    tin(bx + 2, by - 8, PZ.ci, 0.4); tin(bx + 1, by - 10, PZ.ci, 0.3);
  }
  R.actor(EL.mei, 268, 172, t, { dir: -1, dedo: t > SALAS - 0.2 && t < REG, habla: t > REG && Math.floor(t * 7) % 2 === 0, sorpresa: t > LEYENDAS + 0.4 && t < SALAS - 0.2 });
  T.planoDelante(R, t, {});
};

// 2 · LOCAL el despacho de Cayce (años treinta): diván, lámpara de pie, librería, reloj, ventana al mar
const MAD = ['#2a160c', '#4a2a16', '#6a3e20', '#844e2a'].map(hex);
const madera = (x0, y0, x1, y1, cols, a = 9, vert = false, sem = 1) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const p = vert ? x - x0 : y - y0, q = vert ? y : x, tabla = Math.floor(p / a), en2 = p % a;
    let k = 1 + (h(tabla, sem, 3) > 0.6 ? 1 : 0);
    const veta = Math.sin(q * 0.11 + tabla * 2.3 + Math.sin(q * 0.031 + tabla) * 3 + en2 * 0.9);
    if (veta > 0.82) k = Math.max(0, k - 1); else if (veta < -0.9) k = Math.min(cols.length - 1, k + 1);
    if (en2 === 0) k = 0; else if (en2 === 1) k = Math.min(cols.length - 1, k + 1);
    R.pset(x, y, cols[k]);
  }
};
const LOMOS = ['#8a2a2a', '#2a4a7a', '#3a6a3a', '#7a5a2a', '#5a2a5a', '#a86a2a', '#2a5a5a', '#6a6a6a'].map(hex), ORO = hex('#d8a83a');
const libros = (x0, y1, x1, sem) => { let x = x0; while (x < x1 - 2) { const w = 2 + Math.floor(h(x, sem, 13) * 3), al = 9 + Math.floor(h(x, sem, 14) * 5), c = LOMOS[Math.floor(h(x, sem, 15) * LOMOS.length)];
  R.rect(x, y1 - al, x + w - 1, y1, c); R.rect(x, y1 - al, x, y1, mez(c, K, 0.4)); R.rect(x, y1 - al, x + w - 1, y1 - al, mez(c, hex('#ffffff'), 0.25)); if (al > 10) R.rect(x, y1 - 3, x + w - 1, y1 - 3, ORO); x += w + (h(x, sem, 16) < 0.1 ? 1 : 0); } };
const PAPEL = ['#d8c8a0', '#e4d6b0', '#ecdfbc'].map(hex);
const fondoDespacho = () => capa('despacho', () => {
  // el papel pintado crema a rayas finas con un motivo pequeño (tranquilo arriba a la derecha y bajo la barra del año)
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) {
    let c = PAPEL[1 + (x % 12 < 2 ? 1 : 0)];
    const quieto = (x > 268 && y < 50) || y < 16;
    if (!quieto && x % 12 === 6 && y % 14 === 7) c = hex('#b89a6a');
    if (!quieto && (x % 12 === 5 || x % 12 === 7) && y % 14 === 7) c = hex('#c8b080');
    if (h(x, y, 4) > 0.985) c = PAPEL[0];
    R.pset(x, y, c);
  }
  // la moldura de arriba y el friso de madera con cuarterones abajo
  R.rect(0, 0, 319, 15, hex('#2e1a0e')); R.rect(0, 15, 268, 15, hex('#462a16'));
  R.rect(0, 16, 268, 18, MAD[3]); R.rect(0, 19, 268, 19, MAD[1]); R.rect(268, 16, 270, 19, MAD[0]);
  madera(0, 120, 319, 152, MAD, 7, true, 4);
  for (let x = 6; x < 320; x += 38) { R.rect(x, 126, x + 30, 146, MAD[1]); R.rect(x + 1, 127, x + 29, 145, MAD[2]); R.rect(x + 1, 127, x + 29, 127, MAD[3]); R.rect(x + 1, 145, x + 29, 145, MAD[0]); }
  R.rect(0, 118, 319, 120, MAD[0]); R.rect(0, 117, 319, 117, MAD[3]);
  // el suelo de tablas y la alfombra oriental
  madera(0, 153, 319, 179, ['#3a2210', '#5a3618', '#6e4422', '#80522a'].map(hex), 5, false, 9);
  R.rect(0, 152, 319, 153, hex('#1e120a'));
  R.poligono([[120, 160], [300, 160], [312, 178], [108, 178]], (x, y) => { const i = (x - 108) % 10, j = (y - 160) % 6; return (i + j) % 7 === 0 ? hex('#e0b860') : (i === 0 || j === 0) ? hex('#3a1a2a') : (x + y) % 5 === 0 ? hex('#5a1e28') : hex('#7a2a32'); });
  R.rect(120, 160, 300, 160, hex('#e0b860')); R.rect(108, 177, 312, 177, hex('#e0b860'));
  // la librería a la izquierda del diván
  R.rect(86, 30, 140, 152, MAD[0]); madera(88, 32, 138, 150, MAD, 50, true, 2);
  for (let k = 0; k < 4; k++) { const y = 56 + k * 30; R.rect(88, y, 138, y + 2, MAD[3]); R.rect(88, y + 3, 138, y + 3, MAD[0]); libros(90, y - 1, 137, k + 3); }
  R.rect(90, 140, 136, 150, MAD[1]); R.rect(111, 143, 115, 145, ORO);
  // el reloj de pared (la esfera; el péndulo se mueve en la escena)
  R.rect(226, 30, 246, 70, MAD[0]); R.rect(228, 32, 244, 68, MAD[2]); R.disco(236, 42, 7, hex('#f2ead6')); R.anillo(236, 42, 7, ORO); R.rect(230, 52, 242, 66, hex('#2a1810'));
  for (let k = 0; k < 12; k++) R.pset(Math.round(236 + Math.cos(k * 0.5236) * 5), Math.round(42 + Math.sin(k * 0.5236) * 5), K);
  // un cuadro pequeño con un paisaje de Kentucky (colinas) sobre el diván
  R.rect(166, 40, 204, 66, hex('#8a6a2a')); R.rect(168, 42, 202, 64, hex('#9ac0d8')); R.poligono([[168, 64], [168, 54], [184, 48], [202, 56], [202, 64]], hex('#5a8a4a')); R.poligono([[176, 64], [190, 54], [202, 60], [202, 64]], hex('#3a6a3a')); R.rect(166, 40, 204, 40, hex('#c8a04a'));
  // el respaldo del diván (detrás de Cayce): terciopelo verde con capitoné y la madera torneada
  R.rect(150, 104, 252, 134, hex('#1e3a2a')); R.rect(152, 106, 250, 132, hex('#2e5a3e'));
  for (let x = 160; x < 250; x += 12) for (let y = 112; y < 132; y += 8) { R.pset(x + ((y >> 3) & 1) * 6, y, hex('#1e3a2a')); R.pset(x + 1 + ((y >> 3) & 1) * 6, y - 1, hex('#4a7a5a')); }
  R.rect(150, 104, 252, 105, hex('#4a7a5a')); R.rect(144, 100, 152, 140, MAD[1]); R.rect(250, 100, 258, 140, MAD[1]); R.disco(148, 100, 4, MAD[2]); R.disco(254, 100, 4, MAD[2]);
  // la mesita con el vaso de agua y la libreta de reserva (a la derecha)
  R.rect(262, 128, 290, 131, MAD[2]); R.rect(262, 131, 290, 132, MAD[0]); R.rect(266, 132, 268, 152, MAD[1]); R.rect(284, 132, 286, 152, MAD[1]);
  R.rect(270, 120, 274, 127, hex('#bcd8e4')); R.rect(271, 122, 273, 127, hex('#8ab8d0')); R.rect(278, 125, 288, 127, hex('#f2ead6'));
});
// la ventana al mar (Virginia Beach): cielo tramado, nubes de tres tonos que se mueven, olas, una gaviota, cortinas
const ventana = (t) => {
  const x0 = 18, y0 = 30, x1 = 74, y1 = 100;
  R.rect(x0 - 3, y0 - 3, x1 + 3, y1 + 4, MAD[1]); R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 3, MAD[2]);
  const CIE = ['#7ab4e0', '#94c4e8', '#b0d4ee', '#cce2f2'].map(hex);
  for (let y = y0; y < 78; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono(CIE, (y - y0) / 48 * 3, x, y));
  R.recorte([x0, y0, x1, 77]);
  for (const [cx, cy, s, v] of [[30, 40, 1, 2.0], [62, 50, 0.8, 3.2], [44, 60, 0.6, 4.5]]) { const x = ((cx + t * v) % 90) + x0 - 16;
    for (const [c, dy] of [[hex('#a8bccc'), 1], [hex('#dfe8f0'), 0], [hex('#ffffff'), -1]]) { R.disco(Math.round(x), cy + dy, Math.round(4 * s), c); R.disco(Math.round(x + 5 * s), cy + 1 + dy, Math.round(3 * s), c); R.disco(Math.round(x - 5 * s), cy + 1 + dy, Math.round(3 * s), c); } }
  const gx = Math.round(x0 + ((t * 9) % 70)), gy = 46 + Math.round(Math.sin(t * 1.3) * 3), ala = Math.sin(t * 9) > 0;
  R.pset(gx, gy, hex('#3a3a46')); R.pset(gx - 1, gy - (ala ? 1 : 0), hex('#3a3a46')); R.pset(gx + 1, gy - (ala ? 1 : 0), hex('#3a3a46')); R.pset(gx - 2, gy - (ala ? 2 : 0), hex('#3a3a46')); R.pset(gx + 2, gy - (ala ? 2 : 0), hex('#3a3a46'));
  R.recorte(null);
  for (let y = 78; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let c = y < 90 ? (y < 82 ? hex('#2a6a9a') : hex('#3a7ab0')) : y < 94 ? hex('#e8f2f6') : hex('#e8d4a0');
    if (y < 90 && Math.sin(x * 0.6 + y * 1.7 - t * 3) > 0.85) c = hex('#cfe6f2');
    if (y >= 90 && y < 94 && Math.sin(x * 0.4 - t * 2) > 0.2 && y === 90 + Math.round(1.5 + Math.sin(x * 0.3 - t * 2) * 1.5)) c = hex('#f8fcff');
    if (y >= 94 && h(x, y, 2) > 0.9) c = hex('#c8b480');
    R.pset(x, y, c);
  }
  R.rect(x0 - 2, 64, x1 + 2, 65, MAD[3]); R.rect(45, y0, 46, y1, MAD[3]); R.rect(x0 - 5, y1 + 4, x1 + 5, y1 + 6, MAD[3]); R.rect(x0 - 5, y1 + 7, x1 + 5, y1 + 7, MAD[0]);
  // las cortinas de terciopelo granate que se mecen
  for (const [xa, d] of [[8, 1], [76, -1]]) for (let y = 24; y < 112; y++) { const o = Math.round(Math.sin(t * 1.4 + y * 0.08) * (y - 24) / 50); for (let i = 0; i < 9; i++) { const x = xa + i + o * d; R.pset(x, y, (i + (y >> 4)) % 3 === 0 ? hex('#5a1a22') : i % 3 === 1 ? hex('#a83a44') : hex('#82262e')); } }
  R.rect(4, 22, 90, 24, MAD[3]); R.disco(4, 23, 2, ORO); R.disco(90, 23, 2, ORO);
};
const DIVAN = () => {
  // el asiento y el frente del diván (delante de Cayce: se ven cabeza, hombros y pecho)
  R.rect(146, 136, 256, 152, hex('#1e3a2a')); R.rect(148, 136, 254, 141, hex('#4a7a5a')); R.rect(148, 142, 254, 150, hex('#2e5a3e'));
  for (let x = 152; x < 252; x += 10) R.pset(x, 146, hex('#1e3a2a'));
  R.rect(144, 132, 152, 152, MAD[1]); R.rect(250, 132, 258, 152, MAD[1]); R.rect(146, 152, 150, 158, MAD[0]); R.rect(252, 152, 256, 158, MAD[0]);
  R.rect(154, 128, 170, 137, hex('#e8dcc0')); R.rect(155, 129, 169, 130, hex('#f6ecd6')); R.rect(154, 136, 170, 137, hex('#b8a888'));
  R.poligono([[214, 134], [248, 134], [250, 150], [216, 150]], (x, y) => ((x + y) % 4 === 0 ? hex('#8a6a3a') : hex('#b08a4a')));
};
const p2 = (t) => {
  fondoDespacho(); ventana(t);
  // el péndulo del reloj
  const pa = Math.sin(t * 3.2) * 0.35; R.linea(236, 52, Math.round(236 + Math.sin(pa) * 9), Math.round(52 + Math.cos(pa) * 9), ORO); R.disco(Math.round(236 + Math.sin(pa) * 9), Math.round(52 + Math.cos(pa) * 9), 2, ORO);
  const ma = t * 0.4, ho = t * 0.03; R.linea(236, 42, Math.round(236 + Math.sin(ma) * 5), Math.round(42 - Math.cos(ma) * 5), K); R.linea(236, 42, Math.round(236 + Math.sin(ho) * 3), Math.round(42 - Math.cos(ho) * 3), K);
  // la lámpara de pie con flecos (a la derecha) que alumbra con un parpadeo leve
  const lx = 300, br = 0.18 + Math.sin(t * 7) * 0.02 + (h(Math.floor(t * 6), 3) > 0.92 ? -0.06 : 0);
  for (let y = 70; y < 170; y++) { const w = (y - 70) * 0.35; for (let x = Math.round(lx - w); x <= Math.min(319, lx + w); x++) if (b4(x, y) < br * (1 - (y - 70) / 110)) tin(x, y, hex('#fff0b0'), 0.25); }
  R.rect(lx - 1, 72, lx + 1, 170, hex('#5a4020')); R.rect(lx - 6, 168, lx + 6, 171, hex('#3a2810'));
  R.poligono([[lx - 7, 56], [lx + 7, 56], [lx + 12, 70], [lx - 12, 70]], (x, y) => ((x + y) % 3 ? hex('#f0d890') : hex('#e0c070')));
  for (let x = lx - 12; x <= lx + 12; x += 2) R.linea(x, 71, x + Math.round(Math.sin(t * 2 + x) * 0.6), 73, hex('#c89a3a'));
  // la taquígrafa en su mesita a la izquierda: escribe y levanta la vista en «Sphinx»
  const sorp = t > ESFINGE && t < ESFINGE + 0.9;
  const tq = R.actor(EL.nill, 54, 149, t, { dir: 1, sostiene: [74, 141], sorpresa: sorp, delante: undefined, pal: { H: hex('#3a2418'), h: hex('#5a3a24'), C: hex('#3a4a6a'), c: hex('#2a3650') } });
  // la mesa delante de ella (con la libreta y el lápiz)
  R.rect(44, 143, 104, 147, MAD[2]); R.rect(44, 143, 104, 143, MAD[3]); R.rect(44, 148, 104, 149, MAD[0]); R.rect(46, 150, 102, 158, MAD[1]); R.rect(48, 151, 100, 157, MAD[2]); R.rect(72, 153, 76, 154, ORO); R.rect(48, 158, 51, 170, MAD[1]); R.rect(97, 158, 100, 170, MAD[1]);
  R.rect(66, 139, 90, 143, hex('#f4ecd8')); R.rect(78, 139, 78, 143, hex('#c8bca0')); R.rect(92, 137, 98, 143, hex('#2a2a34')); R.rect(93, 136, 97, 136, hex('#5a5a66'));
  const esc = tramo(t, P2 + 0.4, P3 - 0.2);
  for (let j = 0; j < 3; j++) { const n = Math.round(Math.max(0, Math.min(1, esc * 3 - j)) * 10); for (let i = 0; i < n; i++) R.pset(67 + i + (j > 1 ? 12 : 0), 140 + Math.min(j, 1) + (j > 1 ? 0 : 0) + (j === 1 ? 1 : 0), (i + j) % 3 ? hex('#4a4a5a') : hex('#8a8a96')); }
  if (tq && tq.mano && !sorp) { const [mx, my] = tq.mano, d = Math.round(Math.sin(t * 14) * 1); R.linea(mx + d, my, mx + 4 + d, my - 4, hex('#e8b830')); R.pset(mx + 4 + d, my - 4, K); }
  // Cayce en trance en el diván: habla con los ojos cerrados desde «Edgar»
  R.actor(EL.cayceTrance, 190, 141, t, { dir: -1, habla: t > EDGAR && Math.floor(t * 5) % 3 !== 0 });
  DIVAN();
  // el gato que dormita en la alfombra y levanta la cabeza en «Sphinx»
  T.gato(R, 130, 172, t, { dir: 1 });
  // la visión, en plano azul, recortada a su bocadillo: la Esfinge y la puerta bajo sus patas
  const v = tramo(t, SITUA - 0.5, SITUA + 0.4);
  if (v > 0) {
    for (const [cx, cy, r] of [[192, 112, 2], [186, 104, 3], [178, 95, 4]]) if (v > (112 - cy) / 20) { R.disco(cx, cy, r + 1, PZ.co); R.disco(cx, cy, r, PZ.f2); }
    const bx0 = 110, by0 = 24, bx1 = Math.round(lerp(150, 262, sube(v))), by1 = Math.round(lerp(40, 90, sube(v)));
    R.rect(bx0 - 2, by0 - 2, bx1 + 2, by1 + 2, PZ.co); R.rect(bx0 - 1, by0 - 1, bx1 + 1, by1 + 1, PZ.hal2);
    R.recorte([bx0, by0, bx1, by1]);
    R.poligono([[bx0, by0], [bx1, by0], [bx1, by1], [bx0, by1]], (x, y) => { if ((x - bx0) % 8 === 0 || (y - by0) % 8 === 0) return (x + y) % 2 ? PZ.rj : PZ.f3; return tono([PZ.f0, PZ.f1, PZ.f2, PZ.f3], 2.2 - (y - by0) / 40, x, y); });
    const P = pluma();
    const sx = 120, sy = 72, d = tramo(t, SITUA, ESFINGE + 0.3);
    const S = 1.45, X = (a) => Math.round(sx + a * S), Yy = (b) => Math.round(sy + b * S);
    const ESF = [[0, 0], [0, -3], [14, -3], [16, -7], [18, -15], [16, -17], [17, -20], [16, -23], [19, -28], [28, -29], [33, -21], [31, -14], [35, -11], [62, -13], [72, -9], [78, -3], [84, 0], [0, 0]].map(([a, b]) => [X(a), Yy(b)]);
    for (let i = 0; i < ESF.length - 1; i++) P.parte(ESF[i][0], ESF[i][1], ESF[i + 1][0], ESF[i + 1][1], d * (ESF.length - 1) - i, 'c');
    if (d > 0.5) { P.l(X(21), Yy(-26), X(30), Yy(-22), 'd'); P.l(X(22), Yy(-23), X(31), Yy(-18), 'd'); P.l(X(20), Yy(-20), X(29), Yy(-16), 'd'); P.p(X(19), Yy(-21), 'b'); P.l(X(6), Yy(-3), X(6), Yy(-1), 'd'); P.l(X(40), Yy(-12), X(66), Yy(-10), 'D'); P.l(X(64), Yy(-4), X(74), Yy(-4), 'd'); }
    if (t > ESFINGE) { const on = Math.floor(t * 4) % 2; P.caja(sx + 10, sy + 3, sx + 17, sy + 15, on ? 'b' : 'c'); P.l(sx + 13, sy + 1, sx + 13, sy + 3, 'd'); P.l(sx + 17, sy + 9, sx + 30, sy + 9, 'd', 2); P.caja(sx + 30, sy + 4, sx + 96, sy + 16, 'c'); for (let k = 0; k < 7; k++) P.l(sx + 38 + k * 9, sy + 6, sx + 38 + k * 9, sy + 14, 'e'); }
    P.pintar(t);
    holo(t, by1, bx0, bx1, false, by0);
    R.recorte(null);
  }
};

// 3 · italia/video: la creadora de vídeos y la ciudad bajo Giza en la pantalla verde
const p3 = (t) => {
  T.italia(R, t, { encuadre: 'video' });
  // la ciudad en plano azul que sustituye a la pantalla verde (recortada a la tela), con barrido de izquierda a derecha
  const c = tramo(t, CIUDAD - 0.4, CIUDAD + 0.5);
  if (c > 0) {
    const X0 = 215, Y0 = 25, X1 = 265, Y1 = 100, xc = Math.round(lerp(X0, X1, c));
    R.recorte([X0, Y0, xc, Y1]);
    R.poligono([[X0, Y0], [X1, Y0], [X1, Y1], [X0, Y1]], (x, y) => ((x - X0) % 6 === 0 || (y - Y0) % 6 === 0 ? PZ.rj : tono([PZ.f0, PZ.f1, PZ.f2], 2 - (y - Y0) / 40, x, y)));
    const P = pluma();
    P.l(X0, 44, X1, 44, 'c'); P.l(232, 44, 240, 34, 'c'); P.l(240, 34, 248, 44, 'c');
    for (let k = 0; k < 4; k++) { const y = 52 + k * 12; P.l(X0 + 2, y, X1 - 2, y, 'd'); for (let i = 0; i < 4; i++) { const x = X0 + 4 + i * 12 + (k % 2) * 5; P.caja(x, y + 2, x + 6, y + 9, (i + k) % 3 ? 'c' : 'm'); } }
    P.l(240, 44, 240, 98, 'b', 3);
    P.pintar(t);
    R.recorte(null);
    if (c < 1) { R.linea(xc, Y0, xc, Y1, PZ.br); R.linea(xc + 1, Y0, xc + 1, Y1, PZ.ci); }
  }
  const ab = t > ENTERA - 0.1 && t < CIUDAD + 0.3;
  R.actor(EL.turista2, 130, 152, t, { dir: 1, habla: !ab && Math.floor(t * 7) % 2 === 0, brazos: ab, dedo: t > GIZA - 0.1 && t < P4 - 0.2, sonrisa: ab });
  T.italiaDelante(R, t, { encuadre: 'video' });
};

// 4 · italia/video/movil: las pantallas del mundo y los días que cuentan
const p4 = (t) => {
  const n = tramo(t, P4 + 0.1, MUNDO + 0.5);
  T.italia(R, t, { encuadre: 'video', camara: 'movil', n });
  const r1 = DIBUJOS + 0.4, r2 = MUNDO - 0.2, r3 = MUNDO + 0.4;
  R.actor(EL.chicaHoy, 70, 146, t, { dir: -1, sorpresa: t > r1 && t < r1 + 0.8, sonrisa: t > r1 + 0.8, dedo: t > r1 + 1.2 && t < r1 + 2.2 });
  R.actor(EL.joven, 186, 146, t, { dir: -1, sorpresa: t > r2 && t < r2 + 0.9, sonrisa: t > r2 + 0.9 });
  R.actor(EL.oficinista2, 232, 146, t, { dir: 1, sorpresa: t > r3 && t < r3 + 0.9, habla: t > r3 + 0.9 && Math.floor(t * 7) % 2 === 0 });
  // los días, junto al pin de Italia
  const dia = t < DIBUJOS ? 0 : t < MUNDO ? 1 : t < DIAS ? 2 : 3;
  if (dia) { R.rect(182, 20, 196, 34, hex('#f2eee2')); R.rect(182, 20, 196, 23, hex('#c83a3a')); R.rect(182, 34, 196, 34, hex('#8a8a96')); R.numero(String(dia), 189, 33, { centro: true, color: K, sombra: false }); }
  T.italiaDelante(R, t, { encuadre: 'video', camara: 'movil' });
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  año: (t) => (t >= P2 && t < P3 ? 1933 : 2025),
  efectos: [[LEYENDAS, 'brillo'], [LIBROS, 'papel'], [P2 + 0.5, 'lapiz'], [SITUA, 'brillo'], [P2 + 2.6, 'tic'], [CIUDAD, 'whoosh'], [DIBUJOS + 0.4, 'bip'], [MUNDO - 0.2, 'bip'], [MUNDO + 0.4, 'pop']],
});
''')
