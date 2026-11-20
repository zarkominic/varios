// ATOM EN ESCENA (desde la prueba de Roanoke, 20/11/2026). Atom sale de la esquina y actúa en el decorado: sigue siendo el
// átomo (núcleo con tres órbitas y sus electrones), con cara (ojos y boca, para que tenga expresión), bracitos y
// piernitas al tamaño de los chibis, guantes blancos y zapatitos rojos. Aprobado por el usuario con la hoja
// _atom-cuerpo.html («ok con atom… núcleo y órbitas más pequeños… le pondría ojos y boca»).
//
//   import * as AT from '/atomo/plato/escenas/atom-personaje.js';
//   AT.atom(R, x, suelo, t, { pose, dir, cara, s, habla })   → de pie; devuelve { mano, mano1, centro } (en el lienzo)
//   AT.luciernaga(R, x, y, t, { brillo })                     → pequeño y volando, las extremidades recogidas
//   AT.pausa(R, u)                                            → congela el mundo en gris azulado (u 0–1) con el ⏸
//   AT.anillo(R, cx, cy, rx, ry, t, u)                        → una órbita que rodea una pista (u: cuánto se ha trazado)
//   AT.lupa(R, mx, my, s)                                     → la lupa que sostiene (mx, my: la mano)
//
// Poses: quieto | camina | saluda | senala | sostiene | brazos. Caras: normal | sonrisa | sorpresa | triste | guino.
// o.habla (0–1, la energía de la voz): la boca se abre y se cierra. o.s: escala (1 = la de los chibis de la escena).
// o.extra: un electrón más, dorado (lo que Atom «se guarda»), que gira en su órbita.
import { hex, PAL } from '/atomo/plato/kits/pixel-retro.js';

const A = PAL.ATOM, K = hex('#1a1424'), CREMA = hex('#f4e6c8'), GUANTE = hex('#ffffff'), ZAP = A[6], TAU = Math.PI * 2, ORO = hex('#ffd34a');

function piezas(R) {
  const ps = (x, y, c) => R.pset(Math.round(x), Math.round(y), c);
  const orbitas = (cx, cy, t, Ro, front, o = {}) => {
    const r2 = Ro * 0.345, angs = [0, Math.PI / 3, -Math.PI / 3];
    angs.forEach((a, i) => {
      const ca = Math.cos(a), sa = Math.sin(a), n = Math.round(Ro * 8.6);
      for (let k = 0; k < n; k++) {
        const p = k / n * TAU; if ((Math.sin(p) > 0) !== front) continue;
        const ex = Ro * Math.cos(p), ey = r2 * Math.sin(p), X = Math.round(cx + ex * ca - ey * sa), Y = Math.round(cy + ex * sa + ey * ca);
        if (front && Math.hypot(X - cx + 0.5, Y - cy + 0.5) < 5.6) continue;   // por delante no tapa la cara
        if (((X + Y) & 1) === 0) ps(X, Y, o.orbita ?? A[7]);
      }
      const el = (p, c1, c2) => { if ((Math.sin(p) > 0) !== front) return; const ex = Ro * Math.cos(p), ey = r2 * Math.sin(p), X = Math.round(cx + ex * ca - ey * sa), Y = Math.round(cy + ex * sa + ey * ca);
        if (front && Math.hypot(X - cx + 0.5, Y - cy + 0.5) < 6) return;
        ps(X - 1, Y, c2); ps(X + 1, Y, c2); ps(X, Y - 1, c2); ps(X, Y + 1, c2); ps(X, Y, c1); };
      el(TAU * (0.9 + i * 0.2) * t + i * 2.1, A[4], A[5]);
      if (o.extra && i === 0) el(TAU * 0.7 * t + 3.4, hex('#fff6c0'), ORO);
    });
  };
  // el cuerpo: el núcleo (bola de 9 px) con su brillo, y la cara
  const bola = (cx, cy, t, o = {}) => {
    // cara plana para que se lean los ojos: amarillo liso, una luna naranja abajo a la derecha y el brillo arriba
    const rr = 4.9;
    for (let y = -6; y <= 6; y++) for (let x = -6; x <= 6; x++) {
      const d = Math.hypot(x + 0.5, y + 0.5); if (d > rr + 0.6) continue;
      const borde = Math.hypot(x + 1.6, y + 1.6) > rr + 0.2;
      ps(cx + x, cy + y, d > rr - 0.4 ? K : borde ? A[0] : (x + y < -5 ? A[2] : A[1]));
    }
    ps(cx - 3, cy - 3, hex('#ffffff'));
    const d = o.dir ?? 1, cara = o.cara ?? 'normal', ex = cx + (d > 0 ? 0 : -1);
    const parpadea = cara !== 'sorpresa' && ((t * 0.37 + (o.fase ?? 0)) % 1) < 0.05;
    // ojos: dos rayitas de 1 × 2 (de 2 × 2 en la sorpresa); el guiño cierra el de delante
    const ojo = (x, cerrado, grande) => { if (cerrado) { ps(x, cy, K); ps(x + 1, cy, K); return; } ps(x, cy - 1, K); ps(x, cy, K); if (grande) { ps(x + 1, cy - 1, K); ps(x + 1, cy, K); ps(x, cy - 1, hex('#ffffff')); } };
    ojo(ex - 2, parpadea, cara === 'sorpresa'); ojo(ex + 1, parpadea || cara === 'guino', cara === 'sorpresa');
    if (cara === 'triste') { ps(ex - 3, cy - 2, K); ps(ex + 2, cy - 2, K); }
    // boca
    const by = cy + 2, abierta = (o.habla ?? 0) > 0.25 && Math.floor(t * 9) % 2 === 0;
    if (cara === 'sorpresa' || abierta) { ps(ex - 1, by, K); ps(ex, by, K); ps(ex - 1, by + 1, hex('#8a2030')); ps(ex, by + 1, hex('#8a2030')); }
    else if (cara === 'sonrisa' || cara === 'guino') { ps(ex - 2, by, K); ps(ex - 1, by + 1, K); ps(ex, by + 1, K); ps(ex + 1, by, K); }
    else if (cara === 'triste') { ps(ex - 2, by + 1, K); ps(ex - 1, by, K); ps(ex, by, K); ps(ex + 1, by + 1, K); }
    else { ps(ex - 1, by, K); ps(ex, by, K); }
  };
  const brazo = (x0, y0, x1, y1) => {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
    for (let k = 0; k <= n; k++) { const x = x0 + (x1 - x0) * k / n, y = y0 + (y1 - y0) * k / n; ps(x, y - 1, K); ps(x, y + 1, K); ps(x - 1, y, K); ps(x + 1, y, K); }
    for (let k = 0; k <= n; k++) ps(x0 + (x1 - x0) * k / n, y0 + (y1 - y0) * k / n, CREMA);
    const gx = Math.round(x1), gy = Math.round(y1);
    R.rect(gx - 2, gy - 2, gx + 1, gy + 1, K); R.rect(gx - 1, gy - 1, gx, gy, GUANTE);
  };
  const pierna = (x, y, suelo, dir, dx = 0) => {
    for (let j = y; j <= suelo - 2; j++) { const xx = x + Math.round(dx * (j - y) / Math.max(1, suelo - 2 - y)); ps(xx - 1, j, K); ps(xx + 1, j, K); ps(xx, j, CREMA); }
    const xs = x + dx; R.rect(xs - 1 + (dir < 0 ? -2 : 0), suelo - 2, xs + 1 + (dir > 0 ? 2 : 0), suelo, K);
    R.rect(xs + (dir < 0 ? -2 : 0), suelo - 1, xs + (dir > 0 ? 2 : 0), suelo - 1, ZAP);
  };
  // Atom de pie a escala 1 con los pies en (x, suelo)
  const atom1 = (x, suelo, t, o = {}) => {
    const dir = o.dir ?? 1, pose = o.pose ?? 'quieto', anda = pose === 'camina';
    const bob = anda ? (Math.floor(t * 6) % 2) : Math.sin(t * 2.4 + (o.fase ?? 0)) > 0.6 ? 1 : 0;
    const cy = suelo - 10 - bob, cx = x;
    orbitas(cx, cy, t, 8, false, o);
    const paso = anda ? (Math.floor(t * 6) % 2 ? 2 : -2) : 0;
    pierna(cx - 2, cy + 4, suelo, dir, -paso); pierna(cx + 2, cy + 4, suelo, dir, paso);
    const hx = cx - 4 * dir, hy = cy + 2, fx = cx + 4 * dir, fy = cy + 2;   // los hombros bajo los ojos: el contorno del brazo no toca el ojo (se fundían en un solo negro)
    let m1 = [hx - 2 * dir, hy + 4], m2 = [fx + 2 * dir, fy + 4];
    if (anda) { m1 = [hx - 2 * dir + paso, hy + 4]; m2 = [fx + 2 * dir - paso, fy + 4]; }
    if (pose === 'saluda') m2 = [fx + 3 * dir, fy - 7 + Math.round(Math.sin(t * 9))];
    if (pose === 'senala') m2 = [fx + 6 * dir, fy - 1];
    if (pose === 'sostiene') { m1 = [cx + 3 * dir, cy + 4]; m2 = [fx + 4 * dir, fy + 2]; }
    if (pose === 'brazos') { m1 = [hx - 4 * dir, hy - 6]; m2 = [fx + 4 * dir, fy - 6]; }
    brazo(hx, hy, ...m1);
    bola(cx, cy, t, o);
    brazo(fx, fy, ...m2);
    orbitas(cx, cy, t, 8, true, o);
    return { mano: m2, mano1: m1, centro: [cx, cy] };
  };
  return { ps, orbitas, bola, brazo, pierna, atom1 };
}

const MARCA = 0xff00ff01 >>> 0;
// dibuja f a escala 1 en un recuadro libre (se guarda el lienzo, se pinta, se lee y se restaura) y lo pega a escala s
export function escalado(R, f, w, h, X, Y, s) {
  const B = R.buf, copia = B.slice();
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) B[y * 320 + x] = MARCA;
  const r = f();
  const px = []; for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const c = B[y * 320 + x]; if (c !== MARCA) px.push([x, y, c]); }
  B.set(copia);
  for (const [x, y, c] of px) R.rect(Math.round(X + x * s), Math.round(Y + y * s), Math.round(X + x * s + s - 1), Math.round(Y + y * s + s - 1), c);
  return r;
}

// Atom de pie con los pies en (x, suelo), a escala o.s (1 por omisión)
export function atom(R, x, suelo, t, o = {}) {
  const P = piezas(R), s = o.s ?? 1;
  if (s === 1) return P.atom1(Math.round(x), Math.round(suelo), t, o);
  const W = 48, H = 40, cx = 24, sy = 37;
  const r = escalado(R, () => P.atom1(cx, sy, t, o), W, H, x - cx * s, suelo - sy * s, s);
  const m = (p) => [x + (p[0] - cx) * s, suelo + (p[1] - sy) * s];
  return { mano: m(r.mano), mano1: m(r.mano1), centro: m(r.centro) };
}
// pequeño y volando (luciérnaga): solo el núcleo con su cara y sus órbitas, sin extremidades, con un halo que late
// (el usuario, 20/11/2026: «cuando flota que lleve cara también»). o.cara y o.dir como en atom(); o.brillo 0–1
export function luciernaga(R, x, y, t, o = {}) {
  const b = o.brillo ?? 1, B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], r = 12 + Math.sin(t * 3) * 1.2;
  for (let j = -15; j <= 15; j++) for (let i = -15; i <= 15; i++) { const g = 1 - Math.hypot(i, j) / r; if (g > 0 && g * g * 1.4 * b > (B4[((j & 3) << 2) | (i & 3)] + 0.5) / 16) R.pset(Math.round(x + i), Math.round(y + j), g > 0.6 ? hex('#fff0b0') : A[1]); }
  const P = piezas(R), X = Math.round(x), Y = Math.round(y);
  P.orbitas(X, Y, t, 8, false, o); P.bola(X, Y, t, o); P.orbitas(X, Y, t, 8, true, o);
}
// LA PAUSA: el mundo congelado en gris azulado (u 0–1 mezcla) y el ⏸ arriba a la izquierda, bajo la barra del año
export function pausa(R, u = 1, icono = true) {
  const B = R.buf;
  for (let i = 0; i < 320 * 180; i++) { const c = B[i], r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255, l = 0.3 * r + 0.59 * g + 0.11 * b;
    const rr = l * 0.5 + 18, gg = l * 0.55 + 22, bb = l * 0.62 + 30;
    B[i] = (0xff000000 | (Math.round(b + (bb - b) * u) << 16) | (Math.round(g + (gg - g) * u) << 8) | Math.round(r + (rr - r) * u)) >>> 0; }
  if (icono && u > 0.5) { R.rect(7, 23, 12, 34, K); R.rect(14, 23, 19, 34, K); R.rect(8, 24, 11, 33, A[4]); R.rect(15, 24, 18, 33, A[4]); }
}
// una órbita que rodea una pista: elipse punteada trazada hasta u, con un electrón que la recorre
export function anillo(R, cx, cy, rx, ry, t, u = 1) {
  const n = Math.round((rx + ry) * 4);
  for (let a = 0; a < n * u; a++) { const p = a / n * TAU - Math.PI / 2, X = Math.round(cx + Math.cos(p) * rx), Y = Math.round(cy + Math.sin(p) * ry); if ((a & 1) === 0) { R.pset(X, Y + 1, K); R.pset(X, Y, A[7]); } }
  if (u >= 1) { const p = (t * 0.8 % 1) * TAU, X = Math.round(cx + Math.cos(p) * rx), Y = Math.round(cy + Math.sin(p) * ry); R.pset(X - 1, Y, A[5]); R.pset(X + 1, Y, A[5]); R.pset(X, Y - 1, A[5]); R.pset(X, Y + 1, A[5]); R.pset(X, Y, A[4]); }
}
// la lupa que sostiene, con el mango en la mano (mx, my); s escala
export function lupa(R, mx, my, s = 1, dir = 1) {
  const L = (x0, y0, x1, y1, c) => R.linea(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), c);
  for (let w = 0; w < s; w++) { L(mx + w, my, mx + 4 * s * dir + w, my - 4 * s, K); L(mx + w + 1, my, mx + 4 * s * dir + w + 1, my - 4 * s, hex('#8a5a30')); }
  const cx = mx + 9 * s * dir, cy = my - 9 * s, rr = 5 * s;
  for (let a = 0; a < 80 * s; a++) { const p = a / (80 * s) * TAU; for (let w = 0; w < s; w++) { R.pset(Math.round(cx + Math.cos(p) * (rr + 1 + w)), Math.round(cy + Math.sin(p) * (rr + 1 + w)), K); R.pset(Math.round(cx + Math.cos(p) * (rr - w)), Math.round(cy + Math.sin(p) * (rr - w)), A[7]); } }
  for (let y = -rr + s; y <= rr - s; y++) for (let x = -rr + s; x <= rr - s; x++) if (Math.hypot(x, y) < rr - s && ((x + y) & 1)) R.pset(Math.round(cx + x), Math.round(cy + y), hex('#cfe8ff'));
  return [cx, cy];
}
