E = {}

# Utilidades comunes (se repiten en cada cuerpo: cada escena es un .html independiente)
UTIL = r'''
const K = T.C.k, C = T.C, PZ = T.PIEZAS_DU;
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const RA = (...c) => c.map(hex);
const tono = (r, v, x, y) => r[Math.max(0, Math.min(r.length - 1, Math.floor(v + BY[(y & 3) * 4 + (x & 3)] / 16)))];
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lin = (t, a0, a1) => cl((t - a0) / (a1 - a0));
// lo fijo de un plano se pinta una vez en su búfer y se copia en cada fotograma
const fijo = (pinta) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); } R.copiar(b); }; };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const baña = (x0, y0, x1, y1, col, a, f = null) => { for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) { const k = f ? f(x, y) : 1; if (k > 0) R.pset(x, y, mez(R.pget(x, y), col, a * k)); } };
const elipse = (cx, cy, rx, ry, col, a) => baña(cx - rx, cy - ry, cx + rx, cy + ry, col, a, (x, y) => { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; return d < 1 ? 1 - d * d : 0; });
const ovalo = (cx, cy, rx, ry, col) => { for (let y = Math.ceil(cy - ry); y <= cy + ry; y++) { const w = rx * Math.sqrt(Math.max(0, 1 - ((y - cy) / ry) ** 2)); R.rect(Math.round(cx - w), y, Math.round(cx + w), y, col); } };
const relleno = (x0, y0, x1, y1, r, v0, amp = 0.6, k = 0) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono(r, v0 + (h(x >> 1, y >> 1, k) - 0.5) * amp, x, y)); };
// madera con vetas (tablas horizontales de alto ht)
const madera = (x0, y0, x1, y1, r, ht = 12, k = 0) => { for (let y = y0; y <= y1; y++) { const tb = Math.floor((y - y0) / ht), fy = (y - y0) % ht;
  for (let x = x0; x <= x1; x++) { const v = 1.6 + Math.sin(x * 0.045 + tb * 1.7 + Math.sin(y * 0.55 + tb) * 1.4) * 0.8 + (h(x >> 2, y, k + tb) - 0.5) * 0.5 - (fy === 0 ? 1.6 : 0) + (fy === 1 ? 0.6 : 0);
    R.pset(x, y, tono(r, v, x, y)); }
  if (fy === 0) for (let x = x0 + ((tb * 53) % 70); x <= x1; x += 70 + (tb % 3) * 9) R.pset(x, y + 4, r[0]); } };
const BL = hex('#f6f6f6'), ORO = hex('#f0c040'), OROL = hex('#f6e08a'), OROS = hex('#9a7420'), ROJO = hex('#d8303a');
// un globo de cómic blanco con su pico hacia abajo (para un símbolo)
const globo = (cx, cy, w, hh, px = 0) => { const x0 = Math.round(cx - w / 2), x1 = Math.round(cx + w / 2), y0 = Math.round(cy - hh / 2), y1 = Math.round(cy + hh / 2);
  R.rect(x0 - 1, y0, x1 + 1, y1, K); R.rect(x0, y0 - 1, x1, y1 + 1, K); R.rect(x0, y0, x1, y1, BL); R.rect(x0, y1, x1, y1, hex('#d0d4e0'));
  R.poligono([[cx + px - 3, y1 + 1], [cx + px + 3, y1 + 1], [cx + px, y1 + 6]], K); R.poligono([[cx + px - 2, y1], [cx + px + 2, y1], [cx + px, y1 + 4]], BL); };
// el decorado de cartón piedra: un bastidor pintado (una muralla con su arco y sus almenas, pintura plana) sobre un
// carrito, con el canto de contrachapado y el tornapuntas de madera detrás; (x, y) = la esquina de abajo a la izquierda
const bastidor = (x, y, k = 0) => { x = Math.round(x);
  const w = 40, hh = 52, F = hex(k ? '#c8a47a' : '#d8b070'), FS = hex(k ? '#a8845a' : '#b88a4c'), FL = hex('#ecd098'), J = hex('#8e6434'), MAD = hex('#c89858'), MADS = hex('#8a6234'), OSC = hex('#4a3424');
  R.linea(x + w + 15, y - 1, x + w - 2, y - hh + 9, K); R.linea(x + w + 14, y - 1, x + w - 3, y - hh + 9, MAD); R.linea(x + w + 13, y - 1, x + w - 4, y - hh + 9, K);
  R.linea(x + w, y - 15, x + w + 9, y - 15, K); R.linea(x + w, y - 14, x + w + 9, y - 14, MADS);
  R.rect(x - 3, y - 5, x + w + 17, y - 2, K); R.rect(x - 2, y - 4, x + w + 16, y - 3, MAD); R.rect(x - 2, y - 3, x + w + 16, y - 3, MADS);
  for (const rx of [x + 3, x + w + 11]) { R.disco(rx, y - 1, 2, K); R.pset(rx, y - 1, hex('#9aa0b0')); }
  for (let i = 0; i < 4; i++) { R.rect(x + i * 11 - 1, y - hh - 7, x + i * 11 + 7, y - hh, K); R.rect(x + i * 11, y - hh - 6, x + i * 11 + 6, y - hh, F); R.rect(x + i * 11, y - hh - 6, x + i * 11 + 1, y - hh, FL); }
  R.rect(x - 1, y - hh - 1, x + w + 3, y - 5, K); R.rect(x, y - hh, x + w, y - 6, F);
  for (let j = y - hh; j <= y - 6; j++) for (let i = x; i <= x + w; i++) { const fj = j - (y - hh), b = fj % 8 === 7 || (i - x + (fj >> 3) * 5) % 10 === 0; if (b) R.pset(i, j, J); else if (h(i - x, fj, 31 + k) < 0.14) R.pset(i, j, FS); }
  R.rect(x, y - hh, x + 1, y - 6, FL); R.rect(x + w + 1, y - hh, x + w + 2, y - 6, MAD); R.rect(x + w + 2, y - hh, x + w + 2, y - 6, MADS);
  R.disco(x + 20, y - 27, 9, K); R.rect(x + 11, y - 27, x + 29, y - 6, K); R.disco(x + 20, y - 27, 7, OSC); R.rect(x + 13, y - 27, x + 27, y - 6, OSC);
  for (let j = y - 30; j <= y - 6; j += 3) R.pset(x + 14 + ((j * 7) % 12), j, hex('#6a4c34'));
};
'''

# ─────────────────────────────────────────────────────────────── du-lynch ──
E['du-lynch'] = ('La película de Lynch', '''// DU-LYNCH (frase 24), cartela 1984. Cuatro planos (las cuatro vistas de salas(), una vez cada una):
// 1. salas 'subasta'/rodaje (1983): el rodaje de Lynch en el desierto, con decorados de cartón piedra: un operario empuja
//    un bastidor pintado hasta su marca, el de la claqueta la cierra («His Dune») y se aparta, dos extras entran al
//    decorado y Lynch les marca la acción; a la derecha De Laurentiis sacude la hucha y las monedas vuelan hacia el
//    decorado (lo que costó). Corta en «about».
// 2. salas 'sala'/butacas (1984, lleno 0.3): la sala medio vacía; en la pantalla (nunca una imagen de la película) una
//    balanza: en «$40» cae la saca del coste y el brazo se vence; en «$31» caen las entradas al otro platillo y no
//    alcanza. Dos espectadores se levantan y se van por la salida. Corta en «Lynch».
// 3. salas 'sala'/butacas con frente: true: las caras. Lynch se va hundiendo en la butaca y en «total failure» se lleva
//    las manos a la cabeza (el gesto del kit; no hay opción de taparse la cara); De Laurentiis le mira; a su lado Herbert come palomitas tan contento. Corta en «Herbert».
// 4. salas 'sala'/general (fachada de 1984, cola 0.3): Herbert sale del cine, un lector le enseña su libro y en «liked»
//    le sale el visto bueno; por detrás Lynch sale con la cabeza gacha y se va deprisa calle abajo.''', UTIL + r'''
const a = (f) => en('lynch', f);
const P2 = a(0.237), P3 = a(0.569) - 0.1, P4 = a(0.827) - 0.1;
const clac = a(0.008), t40 = a(0.257), t31 = a(0.491), hunde = a(0.656), tapa = a(0.736), gusta = a(0.913);

// ── 1. el rodaje, con cartón piedra ─────────────────────────────────────────────────────────────
const O1 = { encuadre: 'subasta', camara: 'rodaje' };
const p1 = (t) => {
  T.salas(R, t, O1);
  const S = 150;
  // el bastidor que ya está en su sitio y el que llega empujado
  bastidor(188, 147, 1);
  const fx = lerp(64, 102, tramo(t, 1.3, 3.4));
  bastidor(fx, 148, 0);
  R.actor(EL.operarioDU, fx - 15, S, t, { dir: 1, anda: t < 3.4, sostiene: t < 3.4 ? [fx - 1, S - 14] : false, sonrisa: t > 3.5 });
  // los dos extras entran al decorado y se colocan ante el arco
  const e1 = lerp(250, 150, tramo(t, 1.6, 3.9)), e2 = lerp(274, 168, tramo(t, 2.0, 4.3));
  R.actor(EL.estudiante2DU, e1, S - 1, t, { dir: -1, anda: t > 1.6 && t < 3.9, brazos: t > 4.3 });
  R.actor(EL.voluntario2DU, e2, S, t, { dir: -1, anda: t > 2.0 && t < 4.3, sorpresa: t > 4.4 });
  // Lynch dirige: habla y marca con el dedo
  R.actor(EL.lynch, 120, S + 2, t, { dir: 1, habla: Math.sin(t * 9) > -0.2, dedo: t > clac + 0.5 && (t < 3.2 || t > 4.2) });
  // el de la claqueta: la cierra y se aparta
  const cx = lerp(140, 210, tramo(t, clac + 0.5, clac + 2.4));
  const op = R.actor(EL.operadorDU, cx, S + 3, t, { dir: t < clac + 0.5 ? -1 : 1, anda: t > clac + 0.5 && t < clac + 2.4, sostiene: true });
  PZ.claqueta?.(R, op.mano[0] + (t < clac + 0.5 ? -4 : 4), op.mano[1] + 10, { abierta: t < clac });
  if (t >= clac && t < clac + 0.25) for (let k = 0; k < 4; k++) R.linea(op.mano[0] - 12 - k, op.mano[1] - 12 + k * 3, op.mano[0] - 16 - k, op.mano[1] - 14 + k * 3, BL);
  // De Laurentiis y la hucha: las monedas salen volando hacia el decorado
  const dl = R.actor(EL.deLaurentiis, 224, S + 2, t, { dir: -1, sostiene: [224, S - 12 + Math.round(Math.sin(t * 14) * 1.5)], triste: t > 3.2 });
  PZ.hucha?.(R, dl.mano[0] - 9, dl.mano[1] + 8, { dir: -1 });
  for (let k = 0; k < 7; k++) { const u = ((t - 1.5) * 0.9 - k * 0.19) % 1.4; if (u < 0 || u > 1 || t < 1.5) continue;
    const mx = Math.round(lerp(dl.mano[0] - 12, 120 + k * 9, u)), my = Math.round(lerp(dl.mano[1], 118, u) - Math.sin(u * Math.PI) * 26);
    R.disco(mx, my, 2, K); R.disco(mx, my, 1, Math.floor(t * 10 + k) % 2 ? ORO : OROL); }
  T.salasDelante(R, t, O1);
};

// ── 2. la sala medio vacía y la balanza en la pantalla ───────────────────────────────────────
const O2 = { encuadre: 'sala', camara: 'butacas', pantalla: false, lleno: 0.3, luz: 0.55, epoca: 1984 };
const NOCHE = RA('#141a3a', '#1c2450', '#263066', '#32407c');
const saca = (x, y) => { x = Math.round(x); y = Math.round(y);   // la saca del dinero: tela verde, el nudo y una moneda
  R.disco(x, y - 9, 10, K); R.rect(x - 4, y - 23, x + 4, y - 16, K); R.disco(x, y - 9, 9, hex('#4a9a5a')); R.rect(x - 3, y - 22, x + 3, y - 17, hex('#4a9a5a')); R.rect(x - 5, y - 18, x + 5, y - 17, hex('#2e6a3c'));
  R.disco(x - 3, y - 12, 4, hex('#6ab87a')); R.disco(x + 1, y - 8, 4, K); R.disco(x + 1, y - 8, 3, ORO); R.rect(x + 1, y - 10, x + 1, y - 6, OROS); R.rect(x - 9, y - 1, x + 9, y, K); };
const entradas = (x, y) => { x = Math.round(x); y = Math.round(y);   // un montoncito de entradas rosas con su muesca
  for (const [dx, dy, c] of [[-7, 0, '#e88aa8'], [3, 0, '#f0a8c0'], [-2, -6, '#e88aa8']]) { R.rect(x + dx - 7, y + dy - 6, x + dx + 7, y + dy, K); R.rect(x + dx - 6, y + dy - 5, x + dx + 6, y + dy - 1, hex(c)); R.rect(x + dx - 2, y + dy - 5, x + dx - 2, y + dy - 1, BL); R.pset(x + dx + 2, y + dy - 3, K); R.pset(x + dx + 4, y + dy - 3, K); } };
const balanza = (t) => {
  const [x0, y0, x1, y1] = [34, 24, 268, 108];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, tono(NOCHE, 0.4 + (y - y0) / 34 + Math.sin(x * 0.05 + t * 0.6) * 0.25, x, y));
  for (let k = 0; k < 14; k++) { const sx = x0 + 6 + Math.round(h(k, 1, 7) * 220), sy = y0 + 4 + Math.round(h(k, 2, 7) * 30); if (Math.sin(t * 2 + k) > 0) R.pset(sx, sy, hex('#8a9ad8')); }
  const cx = 151, py = 38, u40 = lin(t, t40, t40 + 0.35), u31 = lin(t, t31, t31 + 0.35);
  // el ángulo: se vence hacia el 40 y, al caer el 31, se queda a medias, con su vaivén
  const obj = u40 >= 1 ? (u31 >= 1 ? 0.11 : 0.22) : 0, desde = u31 >= 1 ? t31 + 0.35 : t40 + 0.35;
  const th = u40 < 1 ? Math.sin(t * 3) * 0.015 : obj + (u31 >= 1 ? 0.11 : -0.22) * Math.exp(-(t - desde) * 3.2) * Math.cos((t - desde) * 9);
  const L = 62, ax = Math.round(cx - Math.cos(th) * L), ay = Math.round(py + Math.sin(th) * L), bx = Math.round(cx + Math.cos(th) * L), by = Math.round(py - Math.sin(th) * L);
  // el pie y el fuste
  R.rect(cx - 3, py, cx + 3, y1 - 6, K); R.rect(cx - 2, py, cx + 1, y1 - 6, ORO); R.rect(cx - 2, py, cx - 2, y1 - 6, OROL); R.rect(cx + 1, py, cx + 2, y1 - 6, OROS);
  R.poligono([[cx - 22, y1 - 1], [cx + 22, y1 - 1], [cx + 14, y1 - 8], [cx - 14, y1 - 8]], K); R.poligono([[cx - 20, y1 - 2], [cx + 20, y1 - 2], [cx + 13, y1 - 7], [cx - 13, y1 - 7]], ORO); R.linea(cx - 12, y1 - 7, cx + 12, y1 - 7, OROL);
  // el brazo
  for (const d of [-2, 2]) R.linea(ax, ay + d, bx, by + d, K); for (const d of [-1, 0, 1]) R.linea(ax, ay + d, bx, by + d, d < 0 ? OROL : d ? OROS : ORO);
  R.disco(cx, py, 5, K); R.disco(cx, py, 4, ORO); R.disco(cx - 1, py - 1, 1, OROL);
  // los platillos con sus cadenas y su carga
  for (const [ex, ey, u, lado] of [[ax, ay, u40, 0], [bx, by, u31, 1]]) {
    const pyl = ey + 26;
    R.linea(ex, ey, ex - 20, pyl, hex('#c8c8d8'), 2); R.linea(ex, ey, ex + 20, pyl, hex('#c8c8d8'), 2); R.disco(ex, ey, 2, K); R.pset(ex, ey, OROL);
    R.poligono([[ex - 24, pyl], [ex + 24, pyl], [ex + 16, pyl + 6], [ex - 16, pyl + 6]], K); R.poligono([[ex - 22, pyl + 1], [ex + 22, pyl + 1], [ex + 15, pyl + 5], [ex - 15, pyl + 5]], ORO); R.linea(ex - 21, pyl + 1, ex + 21, pyl + 1, OROL);
    if (u > 0) { const cae = -Math.min(pyl - 44, Math.round((1 - u * u) * 44)); if (lado === 0) saca(ex - 10, pyl + cae); else entradas(ex - 10, pyl + cae);
      if (u >= 1) R.numero(lado === 0 ? '40' : '31', ex + 2, pyl - 2, { tam: 16 }); }
  }
};
const p2 = (t) => {
  const g = T.salas(R, t, O2);
  balanza(t);
  // dos espectadores se levantan y se van hacia la salida
  for (const [quien, x0, sale] of [[EL.lector2DU, 150, P2 + 1.6], [EL.estudiante3DU, 96, P2 + 2.7]]) {
    if (t < sale) continue; const x = x0 + (t - sale) * 52; if (x > 292) continue;
    R.actor(quien, x, 124, t, { dir: 1, anda: true, triste: true }); }
  T.salasDelante(R, t, O2);
};

// ── 3. las caras: Lynch se tapa la suya, Herbert come palomitas ───────────────────────────────
const O3 = { encuadre: 'sala', camara: 'butacas', frente: true, lleno: 0.3, reservados: [4, 5, 6, 7], luz: 0.6, epoca: 1984 };
const p3 = (t) => {
  const g = T.salas(R, t, O3), A = g?.asientos ?? [...Array(13)].map((_, k) => [15 + 23 * k, 159]);
  const baja = Math.round(5 * tramo(t, hunde, tapa)), tapado = t > tapa;
  const [dx, dy] = A[4], [lx, ly] = A[5], [hx, hy] = A[7];
  R.actor(EL.deLaurentiis, dx, dy, t, { dir: 1, triste: t > hunde, sorpresa: t > tapa && t < tapa + 0.5 });
  R.actor(EL.lynch, lx, ly + baja, t, { dir: 1, triste: true, brazos: tapado });
  if (!tapado && t > hunde) { R.pset(lx + 14, ly + baja - 24 + Math.round(((t * 3) % 1) * 4), hex('#8ac8f0')); R.pset(lx + 14, ly + baja - 25 + Math.round(((t * 3) % 1) * 4), hex('#8ac8f0')); }   // la gota de apuro
  // Herbert: el cubo de palomitas en el regazo y la mano que va y viene
  const come = (t * 0.9) % 1, boca = come > 0.55 && come < 0.85;
  const hb = R.actor(EL.herbertMayor, hx, hy, t, { dir: t > tapa + 0.3 && t < tapa + 1.1 ? -1 : 1, sonrisa: !boca, habla: boca, sostiene: boca ? [hx + 9, hy - 15] : [hx + 15, hy - 9] });
  { const bx = hx + 13, by = hy - 7; R.rect(bx - 1, by - 1, bx + 9, by + 2, K); for (let i = 0; i < 9; i++) R.rect(bx + i, by, bx + i, by + 2, i % 3 === 0 ? ROJO : BL);
    for (const [i, j] of [[1, -2], [3, -3], [5, -2], [7, -3], [4, -4]]) { R.pset(bx + i, by + j, hex('#f8eec0')); R.pset(bx + i + 1, by + j, hex('#f0d890')); } }
  if (boca) R.pset(hb.mano[0], hb.mano[1] - 3, hex('#f8eec0'));
  // la nubecilla negra de Lynch (crece mientras se hunde y llueve cuando se tapa la cara) y las chispas de Herbert
  { const u = tramo(t, hunde - 0.9, tapa), nx = lx + 7 + Math.round(Math.sin(t * 2) * 1.5), ny = ly - 38 + baja;
    if (u > 0) { const r = Math.round(2 + u * 3); for (const [dx, dy, rr] of [[-5, 1, r - 1], [0, -1, r], [5, 1, r - 1]]) R.disco(nx + dx, ny + dy, rr + 1, K); for (const [dx, dy, rr] of [[-5, 1, r - 1], [0, -1, r], [5, 1, r - 1]]) R.disco(nx + dx, ny + dy, rr, hex('#5a6072')); R.disco(nx - 1, ny - 2, Math.max(1, r - 2), hex('#7a8296'));
      if (tapado) { for (let k = 0; k < 4; k++) { const f = (t * 2.2 + k * 0.27) % 1; R.pset(nx - 6 + k * 4, ny + 6 + Math.round(f * 5), hex('#8ac8f0')); } } }
    for (let k = 0; k < 4; k++) { const an = t * 1.3 + k * 1.57, sx = Math.round(hx + 8 + Math.cos(an) * 13), sy = Math.round(hy - 30 + Math.sin(an) * 5); if (Math.sin(t * 6 + k * 2) > -0.2) { R.pset(sx, sy, OROL); R.pset(sx - 1, sy, ORO); R.pset(sx + 1, sy, ORO); R.pset(sx, sy - 1, ORO); R.pset(sx, sy + 1, ORO); } } }
  T.salasDelante(R, t, O3);
};

// ── 4. la fachada: Herbert sale contento ──────────────────────────────────────────────────────
const O4 = { encuadre: 'sala', camara: 'general', epoca: 1984, cola: 0.3 };
const p4 = (t) => {
  T.salas(R, t, O4);
  const S = 147;
  // el lector que espera con su libro
  const ve = t > P4 + 0.8;
  const lec = R.actor(EL.lector1DU, 52, S, t, { dir: 1, sostiene: ve ? [70, S - 20] : true, sonrisa: ve, salto: ve && t < P4 + 1.2 ? Math.round(Math.sin((t - P4 - 0.8) / 0.4 * Math.PI) * 3) : 0 });
  PZ.libro?.(R, lec.mano[0] + 3, lec.mano[1] + 6, {});
  // Lynch sale después y se va calle abajo
  const sl = P4 + 1.7; if (t > sl) { const x = 156 + (t - sl) * 52; if (x < 322) R.actor(EL.lynch, x, S - 1, t, { dir: 1, anda: true, triste: true }); }
  // Herbert sale por la puerta, va hacia el lector y da su visto bueno
  const hx = lerp(150, 86, tramo(t, P4 + 0.1, gusta - 0.2)), llega = t > gusta - 0.2;
  const hb = R.actor(EL.herbertMayor, hx, S + 1, t, { dir: -1, anda: !llega, sonrisa: true, dedo: t > gusta && t < gusta + 1.6, habla: llega && t < gusta });
  if (t > gusta) { const u = lin(t, gusta, gusta + 0.2), gy = Math.round(S - 44 - u * 4); globo(hx + 9, gy, 22, 16, -2); T.visto(R, hx + 3, gy - 2, 1); }
  T.salasDelante(R, t, O4);
};

const efectos = [[1.4, 'carro'], [clac, 'toc'], [t40 + 0.35, 'golpecito'], [t31 + 0.35, 'golpecito'], [P2 + 1.6 + 142 / 52, 'puerta'], [(Math.ceil(P3 * 0.9 - 0.55) + 0.55) / 0.9 + 0.05, 'masca'], [tapa + 0.05, 'palmada'], [P4 + 0.15, 'puerta'], [gusta, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, cartela: '1984', año: (t) => (t < P2 ? 1983 : 1984) });
''')

# ─────────────────────────────────────────────────────────────── du-adios ──
E['du-adios'] = ('Adiós a Herbert', '''// DU-ADIOS (frase 25), 1986. Solo el hecho y con ternura. Tres planos:
// 1. casa 'cuarto'/general (1986): el cuarto al atardecer, la silla vacía y la máquina con su funda. El flexo, que seguía
//    encendido, se apaga despacio en «died»; un pájaro cruza la ventana hacia el sol; en la mesa, al reloj de arena se le
//    acaba la arena y en «65» queda la cifra. Corta en «And for decades».
// 2. (LOCAL) la balda de honor de cerca, con los seis libros numerados, los sujetalibros, el trofeo y la hierba de playa
//    en un jarrón; debajo, la cómoda con la tele pequeña. Pasan los años (la barra corre de 1986 a 2016): la luz de la
//    ventana cruza la pared tres veces, se hace de noche y de día, el polvo se posa y una telaraña crece; en «TV
//    miniseries» la tele se enciende (dunas abstractas nuestras) y en «2000» se apaga. Corta en «The book».
// 3. (LOCAL) el almacén de latas de película: nuestro libro, que brilla, junto a la claqueta con su telaraña; una araña
//    baja por su hilo y en «could», «not» y «right» tres latas reciben su X.''', UTIL + r'''
const b = (f) => en('adios', f);
const P2 = b(0.394) - 0.1, P3 = b(0.842);
const muere = b(0.042), t65 = b(0.290), tele0 = b(0.517), tele1 = b(0.66), x1 = b(0.900), x2 = b(0.923), x3 = b(0.961);

// ── 1. el cuarto de 1986 ────────────────────────────────────────────────────────────────────────
const O1 = { encuadre: 'cuarto', camara: 'general', epoca: 1986 };
const p1 = (t) => {
  T.casa(R, t, O1);
  // un pájaro cruza la ventana hacia el sol (recortado a su hueco)
  R.recorte([107, 37, 167, 89]);
  { const u = lin(t, 0.9, 4.6), x = Math.round(lerp(104, 172, u)), y = Math.round(lerp(74, 44, u) + Math.sin(u * 9) * 2), al = Math.sin(t * 11) > 0 ? -1 : 1;
    if (u > 0 && u < 1) { R.pset(x, y, K); R.pset(x + 1, y, K); R.pset(x - 1, y + al, K); R.pset(x - 2, y + al * 2, K); R.pset(x + 2, y + al, K); R.pset(x + 3, y + al * 2, K); } }
  R.recorte(null);
  T.casaDelante(R, t, O1);
  // el flexo, todavía encendido, se apaga despacio
  const luz = 1 - tramo(t, muere, muere + 1.1);
  if (luz > 0.02) { elipse(128, 140, 26, 6, hex('#fff0b0'), 0.55 * luz); baña(108, 122, 150, 141, hex('#fff0b0'), 0.22 * luz, (x, y) => (Math.abs(x - (114 + (y - 124) * 0.8)) < 4 + (y - 122) * 0.9 ? 1 : 0)); R.disco(115, 127, 1, mez(hex('#8a7a50'), hex('#fff8d0'), luz)); }
  // el reloj de arena: los últimos granos
  const niv = Math.max(0, 0.34 * (1 - lin(t, 0.2, t65)));
  PZ.relojArena?.(R, 142, 143, { nivel: niv, t });
  if (t > t65) R.numero('65', 142, 119, { centro: true, n: Math.round(lin(t, t65, t65 + 0.4) * 16) });
};

// ── 2. la balda de honor, y los años que pasan ───────────────────────────────────────────────
const LIB = ['#c8742a', '#2e5a8a', '#3a7a52', '#8a2a34', '#d8a838', '#4a3a7a'];
const PAPELP = RA('#7a4e2c', '#94603a', '#ac7444', '#c48a52'), NOGAL = RA('#3a2212', '#523018', '#6e4222', '#8a5a30', '#a8743e');
const fondoBalda = fijo(() => {
  // la pared de arriba, lisa, con su moldura; debajo el papel pintado de rayas con rombos
  relleno(0, 0, 319, 21, RA('#5e3c22', '#6a4428', '#764c2e'), 1.2, 0.5, 3);
  R.rect(0, 22, 319, 25, K); R.rect(0, 22, 319, 22, hex('#d8a45c')); R.rect(0, 23, 319, 24, hex('#8a5e36'));
  for (let y = 26; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(PAPELP, 1.1 + ((x >> 3) & 1) * 0.8 + (h(x >> 1, y >> 1, 5) - 0.5) * 0.5 + (y - 26) / 400, x, y));
  for (let gy = 34, f = 0; gy < 150; gy += 18, f++) for (let gx = 12 + (f % 2) * 8; gx < 320; gx += 16) { if (gx > 266 && gy < 52) continue;
    for (let d = -2; d <= 2; d++) R.rect(gx - (2 - Math.abs(d)), gy + d, gx + (2 - Math.abs(d)), gy + d, hex('#d09a5c')); R.pset(gx, gy, hex('#7a4e2c')); }
  // el marco con la foto de la avioneta sobre las dunas (a la izquierda, sobre la tele)
  R.rect(10, 38, 54, 76, K); R.rect(11, 39, 53, 75, hex('#8a5a30')); R.rect(11, 39, 53, 39, hex('#c8944c')); R.rect(14, 42, 50, 72, K);
  for (let y = 43; y <= 71; y++) for (let x = 15; x <= 49; x++) { const d = 62 + Math.sin(x * 0.3) * 3; R.pset(x, y, y > d ? tono(RA('#b89460', '#d0b078', '#e6cc94'), 1.2 + Math.sin((x + y) * 0.7) * 0.6, x, y) : tono(RA('#9ab8c8', '#b8d0d8', '#d8e4e0'), (y - 43) / 9, x, y)); }
  R.linea(32, 34, 28, 38, hex('#3a2a1a')); R.linea(32, 34, 36, 38, hex('#3a2a1a')); R.disco(32, 33, 1, hex('#d8a840'));
  // la cómoda: el tablero y los cajones con sus tiradores
  R.rect(0, 150, 319, 150, K); madera(0, 151, 319, 156, NOGAL.slice(2), 6, 2); R.rect(0, 151, 319, 151, hex('#c8944c')); R.rect(0, 157, 319, 157, K);
  madera(0, 158, 319, 179, NOGAL, 11, 4);
  for (let x = 6; x < 320; x += 104) { R.rect(x, 161, x + 96, 161, K); R.rect(x, 161, x, 179, K); R.rect(x + 96, 161, x + 96, 179, K); R.rect(x + 1, 162, x + 95, 162, hex('#a8743e')); R.rect(x + 40, 168, x + 56, 171, K); R.rect(x + 41, 169, x + 55, 170, hex('#d8a840')); R.rect(x + 41, 169, x + 55, 169, hex('#f4d880')); }
  // la sombra de la balda y la balda con sus escuadras
  baña(64, 122, 292, 128, K, 0.3);
  for (const x of [92, 262]) { R.poligono([[x - 4, 122], [x + 4, 122], [x + 4, 126], [x, 138], [x - 4, 126]], K); R.poligono([[x - 3, 122], [x + 3, 122], [x + 3, 126], [x, 136], [x - 3, 126]], hex('#6e4222')); R.linea(x - 2, 123, x - 2, 127, hex('#a8743e')); }
  R.rect(62, 115, 294, 122, K); R.rect(63, 116, 293, 117, hex('#d8a45c')); madera(63, 118, 293, 121, NOGAL.slice(1), 4, 6);
  // los sujetalibros de latón y los seis libros, con su número en el lomo
  for (const [x, d] of [[68, 1], [241, -1]]) { R.rect(x, 78, x + 8, 115, K); R.rect(x + 1, 79, x + 7, 114, hex('#d8a840')); R.rect(d > 0 ? x + 1 : x + 6, 79, d > 0 ? x + 2 : x + 7, 114, hex('#f4d880')); R.rect(d > 0 ? x + 6 : x + 1, 79, d > 0 ? x + 7 : x + 2, 114, hex('#a87820')); R.disco(x + 4, 90, 2, hex('#a87820')); }
  LIB.forEach((c0, i) => { const c = hex(c0), x = 78 + i * 27, hh = (18 - (i % 3)) * 4, y0 = 115 - hh;
    R.rect(x, y0, x + 26, 115, K); R.rect(x + 1, y0 + 1, x + 25, 114, c); R.rect(x + 1, y0 + 1, x + 4, 114, mez(c, BL, 0.35)); R.rect(x + 21, y0 + 1, x + 25, 114, mez(c, K, 0.3));
    for (let y = y0 + 2; y < 114; y += 2) for (let xx = x + 5; xx < 21; xx++) if (h(xx, y, 9 + i) < 0.1) R.pset(xx, y, mez(c, K, 0.18));
    for (const dy of [8, 14]) { R.rect(x + 4, y0 + dy, x + 22, y0 + dy + 1, hex('#f4e0a0')); R.rect(x + 4, y0 + dy + 2, x + 22, y0 + dy + 2, mez(c, K, 0.35)); }
    // el emblema: una duna y, en el primero, las dos lunas
    R.disco(x + 13, y0 + 32, 7, mez(c, K, 0.4)); for (let xx = -6; xx <= 6; xx++) { const yy = y0 + 35 - Math.round(Math.cos(xx * 0.3) * 3); R.rect(x + 13 + xx, yy, x + 13 + xx, y0 + 37 - (Math.abs(xx) > 4 ? 2 : 0), hex('#f4c078')); }
    R.disco(x + 10, y0 + 28, 1, hex('#f8eec8')); if (i === 0) R.pset(x + 15, y0 + 27, hex('#f8eec8'));
    R.numero(String(i + 1), x + 14, 109, { centro: true }); R.rect(x + 4, 111, x + 22, 112, mez(c, K, 0.4)); });
  // sobre la cómoda: el manuscrito atado, el reloj de arena ya vacío, las gafas, el globo terráqueo
  PZ.manuscrito?.(R, 104, 150, {}); PZ.relojArena?.(R, 136, 150, { nivel: 0 });
  { const x = 160, y = 146; R.rect(x, y, x + 6, y + 3, K); R.rect(x + 10, y, x + 16, y + 3, K); R.rect(x + 1, y + 1, x + 5, y + 2, hex('#b8d0e0')); R.rect(x + 11, y + 1, x + 15, y + 2, hex('#b8d0e0')); R.rect(x + 7, y + 1, x + 9, y + 1, K); R.pset(x - 1, y, K); R.pset(x + 17, y, K); }
  { const gx = 214, gy = 134; R.rect(gx - 7, 148, gx + 7, 150, K); R.rect(gx - 6, 148, gx + 6, 149, hex('#d8a840')); R.rect(gx - 1, 144, gx + 1, 148, hex('#a87820')); R.disco(gx, gy, 12, K); R.disco(gx, gy, 11, hex('#5a8ab0')); R.disco(gx - 3, gy - 3, 5, hex('#d8b070')); R.disco(gx + 4, gy + 3, 4, hex('#c89a58')); R.disco(gx - 5, gy + 5, 2, hex('#d8b070')); R.disco(gx - 5, gy - 6, 2, hex('#8ab0d0'));
    for (let an = -1.2; an < 1.3; an += 0.1) R.pset(Math.round(gx + 13 * Math.cos(an)), Math.round(gy + 13 * Math.sin(an)), hex('#d8a840')); }
  // el jarrón de la hierba (la mata se pinta viva, encima) y el pie del trofeo
  { const x = 300, y = 150; R.rect(x - 6, y - 14, x + 6, y, K); R.rect(x - 5, y - 13, x + 5, y - 1, hex('#4a7a8a')); R.rect(x - 5, y - 13, x - 3, y - 1, hex('#7aa8b4')); R.rect(x - 5, y - 9, x + 5, y - 8, hex('#e8dcc0')); R.rect(x - 4, y - 16, x + 4, y - 14, K); R.rect(x - 3, y - 15, x + 3, y - 15, hex('#7aa8b4')); }
  // la tele pequeña, apagada, con sus antenas
  R.linea(26, 94, 34, 108, K); R.linea(46, 92, 38, 108, K); R.disco(26, 94, 1, hex('#c8c8d8')); R.disco(46, 92, 1, hex('#c8c8d8'));
  R.rect(8, 108, 60, 148, K); R.rect(9, 109, 59, 147, hex('#4a4a56')); R.rect(9, 109, 59, 110, hex('#7a7a88')); R.rect(9, 144, 59, 147, hex('#32323c'));
  R.rect(12, 112, 46, 142, K); R.rect(13, 113, 45, 141, hex('#1e2630')); R.linea(15, 116, 22, 114, hex('#3a4654'));
  for (const y of [116, 124]) { R.disco(53, y, 3, K); R.disco(53, y, 2, hex('#9a9aa8')); R.pset(53, y - 1, BL); } for (let y = 131; y < 142; y += 2) R.rect(50, y, 56, y, hex('#2a2a34'));
  R.rect(12, 148, 16, 150, K); R.rect(52, 148, 56, 150, K);
});
const p2 = (t) => {
  fondoBalda();
  const u = lin(t, P2, P3), ciclo = (u * 3) % 1;
  PZ.hierba?.(R, 300, 135, { t, s: 1, n: 1 }); PZ.hierba?.(R, 296, 136, { t: t + 1, s: 1, n: 1 });
  PZ.trofeoNebula?.(R, 264, 115, { t, s: 1 }); PZ.trofeoHugo?.(R, 280, 115, { t, s: 1 });
  // la tele: se enciende con nuestras dunas abstractas y se apaga
  const on = t > tele0 && t < tele1;
  if (on) { const e = lin(t, tele0, tele0 + 0.18); R.recorte([13, 113, 45, 141]);
    for (let y = 113; y <= 141; y++) for (let x = 13; x <= 45; x++) { if (Math.abs(y - 127) > e * 15) continue; const d1 = 128 + Math.sin(x * 0.25 + t * 2) * 4, d2 = 134 + Math.sin(x * 0.18 - t * 1.4 + 2) * 3;
      R.pset(x, y, y > d2 ? hex('#e09848') : y > d1 ? hex('#b06a2c') : (y & 1) ? hex('#2c3a78') : hex('#34448a')); }
    R.disco(38, 119, 2, hex('#f8eec8')); R.pset(31, 117, hex('#f8eec8')); for (let x = 13; x <= 45; x++) R.pset(x, 113 + Math.round((t * 30) % 28), hex('#8a9ad8')); R.recorte(null);
    elipse(30, 150, 30, 5, hex('#8a9ad8'), 0.3); R.pset(53, 137, hex('#5ae06a')); }
  else if (t >= tele1 && t < tele1 + 0.3) { const e = 1 - lin(t, tele1, tele1 + 0.3); R.rect(29 - Math.round(e * 14), 127, 29 + Math.round(e * 14), 127, BL); }
  // el polvo que se posa en los cantos y la telaraña que crece bajo la balda
  for (let k = 0; k < Math.round(u * 70); k++) { const x = 79 + Math.round(h(k, 1, 61) * 160), i = Math.min(5, Math.floor((x - 78) / 27)), y0 = 115 - (18 - (i % 3)) * 4; R.pset(x, y0 + (k % 2), hex('#e8e0d0')); }
  for (let k = 0; k < Math.round(u * 26); k++) R.pset(64 + Math.round(h(k, 2, 62) * 228), 115, hex('#e8e0d0'));
  { const n = Math.round(u * 6), ox = 262, oy = 123; for (let k = 0; k < n; k++) { const an = 0.2 + k * 0.26, l = 10 + k * 2; R.linea(ox, oy, Math.round(ox - Math.cos(an) * l), Math.round(oy + Math.sin(an) * l), hex('#d8d8e0'), 2); }
    for (let r = 5; r < 5 + n * 2; r += 4) for (let an = 0.2; an < 0.2 + (n - 1) * 0.26; an += 0.12) R.pset(Math.round(ox - Math.cos(an) * r), Math.round(oy + Math.sin(an) * r), hex('#d8d8e0')); }
  // los días: la luz de la ventana cruza la pared y la noche llega y se va
  const lx = -70 + ciclo * 1.7 * 300, dia = ciclo < 0.6;
  if (dia) baña(lx - 10, 30, lx + 70, 148, hex('#ffd890'), 0.3, (x, y) => { const q = x - lx - (y - 30) * 0.22; return q > 0 && q < 46 && y < 142 && Math.abs(q - 23) > 1 && Math.abs(y - 86) > 1 ? 1 : 0; });
  const noche = ciclo < 0.55 ? 0 : Math.sin((ciclo - 0.55) / 0.45 * Math.PI);
  if (noche > 0.03) baña(0, 0, 319, 179, hex('#141c44'), 0.5 * noche);
  // motas de polvo
  for (let k = 0; k < 12; k++) { const x = Math.round((h(k, 3, 63) * 320 + t * (3 + k % 3)) % 320), y = Math.round(34 + h(k, 4, 63) * 100 + Math.sin(t * 0.8 + k) * 4); R.pset(x, y, hex('#f4e0b0')); }
};

// ── 3. el almacén de las latas: el libro y la claqueta con telaraña ─────────────────────────
const ACERO = RA('#2c3344', '#3e475c', '#566078', '#7a8498', '#a4acbc');
// una lata de película tumbada, de canto (x, y = esquina de abajo a la izquierda), con su etiqueta
const lataCanto = (x, y, w, k) => { R.rect(x, y - 6, x + w, y, K); R.rect(x + 1, y - 5, x + w - 1, y - 1, ACERO[2 + (k % 2)]); R.rect(x + 1, y - 5, x + w - 1, y - 5, ACERO[4]); R.rect(x + 1, y - 1, x + w - 1, y - 1, ACERO[1]);
  const lx = x + 4 + (k * 5) % (w - 16); R.rect(lx, y - 4, lx + 9, y - 2, hex(['#e8dcc0', '#d8b070', '#b8c8d8'][k % 3])); R.pset(lx + 2, y - 3, K); R.pset(lx + 4, y - 3, K); R.pset(lx + 7, y - 3, hex('#c83a3a')); };
// una lata de pie, de cara: el aro, los radios y la etiqueta redonda
const lataCara = (cx, cy, r, k) => { R.disco(cx, cy, r, K); R.disco(cx, cy, r - 1, ACERO[3]); R.disco(cx + 1, cy + 1, r - 2, ACERO[2]); R.disco(cx, cy, r - 3, ACERO[3]);
  for (let an = k; an < k + 6.28; an += 1.05) R.linea(cx, cy, Math.round(cx + Math.cos(an) * (r - 3)), Math.round(cy + Math.sin(an) * (r - 3)), ACERO[1]);
  for (let an = 3.4; an < 4.6; an += 0.08) R.pset(Math.round(cx + Math.cos(an) * (r - 1)), Math.round(cy + Math.sin(an) * (r - 1)), ACERO[4]);
  R.disco(cx, cy, 7, K); R.disco(cx, cy, 6, hex('#e8dcc0')); R.disco(cx, cy, 6 - 5, hex('#e8dcc0')); };
const X3 = [[44, 157], [84, 157], [124, 157]];
const fondoLatas = fijo(() => {
  // la pared de bloques
  const MURO = RA('#1a1e2c', '#222838', '#2a3144', '#343c52');
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 14), j = y % 14 === 0 || (x + (f % 2) * 16) % 32 === 0; R.pset(x, y, tono(MURO, (j && y > 22 ? 0.5 : 1.5) + (h(x >> 1, y >> 1, 21) - 0.5) * 0.9 + (h(x >> 4, f, 22) - 0.5) * 0.5, x, y)); }
  // el rayo de luz de un ventanuco alto (queda fuera de cuadro)
  baña(0, 20, 319, 179, hex('#f0c880'), 0.2, (x, y) => { const q = x - 40 - (y - 20) * 0.75; return q > 0 && q < 90 ? 1 - Math.abs(q - 45) / 60 : 0; });
  // los largueros de la estantería, perforados, y las tres baldas de chapa
  for (const x of [8, 304]) { R.rect(x, 48, x + 6, 179, K); R.rect(x + 1, 49, x + 5, 179, ACERO[2]); R.rect(x + 1, 49, x + 1, 179, ACERO[3]); for (let y = 54; y < 179; y += 7) R.rect(x + 3, y, x + 3, y + 2, ACERO[0]); }
  for (const y of [52, 124, 174]) { R.rect(4, y, 315, y + 4, K); R.rect(5, y + 1, 314, y + 1, ACERO[4]); R.rect(5, y + 2, 314, y + 3, ACERO[2]); for (let x = 12; x < 312; x += 9) R.pset(x, y + 3, ACERO[0]); baña(14, y + 5, 304, y + 9, K, 0.35); }
  // la balda de arriba: pilas bajas de latas de canto (nada bajo el año ni tras Atom)
  for (const [x, n, w] of [[22, 2, 34], [62, 3, 30], [98, 1, 36], [140, 3, 34], [180, 2, 30], [216, 3, 36], [258, 1, 30]]) for (let k = 0; k < n; k++) lataCanto(x + (k % 2) * 2, 51 - k * 6, w, x + k);
  // la balda de en medio: latas de cara a la izquierda, una pila a la derecha con una bobina suelta
  lataCara(34, 106, 16, 0.3); lataCara(62, 109, 13, 1.1);
  for (let k = 0; k < 5; k++) lataCanto(244 + (k % 2) * 3, 123 - k * 6, 44 - (k % 3) * 3, k + 3);
  { const cx = 268, cy = 80; R.disco(cx, cy, 13, K); R.disco(cx, cy, 12, hex('#3a3a46')); R.disco(cx, cy, 9, hex('#6a4a2a')); R.disco(cx, cy, 8, hex('#4a3420')); for (let an = 0; an < 6.28; an += 2.09) R.disco(Math.round(cx + Math.cos(an) * 5), Math.round(cy + Math.sin(an) * 5), 2, ACERO[0]); R.disco(cx, cy, 2, ACERO[4]);
    for (let i = 0; i < 16; i++) { const y = 92 + i * 2, x = 280 + Math.round(Math.sin(i * 0.7) * 4); R.rect(x, y, x + 4, y + 1, hex('#3a2a1a')); R.pset(x + 1, y, hex('#c8a060')); R.pset(x + 3, y, hex('#c8a060')); } }
  // la balda de abajo: las tres latas grandes (las que reciben la X), el cajón de madera y otra pila
  X3.forEach(([cx, cy], k) => lataCara(cx, cy, 16, k * 0.7 + 0.2));
  { const x0 = 150, y0 = 138; R.rect(x0, y0, x0 + 66, 173, K); madera(x0 + 1, y0 + 1, x0 + 65, 172, RA('#6a4a26', '#84602f', '#a07a3e', '#b8934e'), 9, 31); for (const x of [x0 + 1, x0 + 60]) R.rect(x, y0 + 1, x + 5, 172, hex('#84602f')); R.rect(x0 + 6, y0 + 1, x0 + 6, 172, K); R.rect(x0 + 59, y0 + 1, x0 + 59, 172, K);
    R.icono('camara', x0 + 26, y0 + 12, hex('#3a2a1a'), hex('#b8934e'), 2); for (let k = 0; k < 14; k++) R.linea(x0 + 8 + k * 4, y0 - 1, x0 + 6 + k * 4 + (k % 3) * 2, y0 - 5 - (k % 4), hex('#d8c070')); }
  for (let k = 0; k < 6; k++) lataCanto(232 + (k % 2) * 2, 173 - k * 6, 60 - (k % 3) * 4, k + 9);
  // la telaraña grande de la esquina de arriba a la izquierda de la balda de en medio
  for (let k = 0; k < 6; k++) { const an = k * 0.3, l = 26; R.linea(15, 57, Math.round(15 + Math.cos(an) * l), Math.round(57 + Math.sin(an) * l), hex('#8a92a8'), 2); }
  for (let r = 8; r < 26; r += 6) for (let an = 0; an < 1.5; an += 0.07) R.pset(Math.round(15 + Math.cos(an) * r), Math.round(57 + Math.sin(an) * r), hex('#8a92a8'));
});
const p3 = (t) => {
  fondoLatas();
  // nuestro libro, que brilla, y la claqueta con su telaraña
  const lat = 0.5 + 0.5 * Math.sin(t * 2.4);
  elipse(112, 96, 36, 38, hex('#ffd880'), 0.2 + 0.16 * lat);
  PZ.libro?.(R, 112, 124, { s: 2 });
  for (let k = 0; k < 4; k++) { const an = t * 0.7 + k * 1.57, x = Math.round(112 + Math.cos(an) * 26), y = Math.round(98 + Math.sin(an) * 30); if (Math.sin(t * 5 + k * 2) > 0) { R.pset(x, y, OROL); R.pset(x - 1, y, ORO); R.pset(x + 1, y, ORO); R.pset(x, y - 1, ORO); R.pset(x, y + 1, ORO); } }
  PZ.claqueta?.(R, 188, 124, { s: 3 });
  // la pizarra, limpia: solo sus renglones y casillas de tiza (a escala 3 las rayas de la pieza parecían un signo)
  { const G = hex('#c8ccd8'), GS = hex('#8a90a0'); R.rect(158, 88, 217, 120, hex('#22222c')); for (const y of [97, 108]) { R.rect(160, y, 215, y, G); R.rect(160, y + 1, 215, y + 1, G); R.rect(160, y + 2, 215, y + 2, GS); } for (const x of [178, 197]) R.rect(x, 110, x + 1, 119, G); for (const [x, w] of [[162, 22], [190, 16]]) R.rect(x, 92, x + w, 92, GS); }
  { const ox = 221, oy = 123, G = hex('#c8d0e0'); for (let k = 0; k < 7; k++) { const an = Math.PI + k * 0.262, l = 30 + (k % 2) * 4; R.linea(ox, oy, Math.round(ox + Math.cos(an) * l), Math.round(oy + Math.sin(an) * l), G, k % 2 ? 2 : 0); }
    for (let r = 8; r <= 28; r += 5) for (let k = 0; k < 6; k++) { const a0 = Math.PI + k * 0.262, a1 = a0 + 0.262, rr = r - 2; R.linea(Math.round(ox + Math.cos(a0) * r), Math.round(oy + Math.sin(a0) * r), Math.round(ox + Math.cos((a0 + a1) / 2) * rr), Math.round(oy + Math.sin((a0 + a1) / 2) * rr), G); R.linea(Math.round(ox + Math.cos((a0 + a1) / 2) * rr), Math.round(oy + Math.sin((a0 + a1) / 2) * rr), Math.round(ox + Math.cos(a1) * r), Math.round(oy + Math.sin(a1) * r), G); } }
  // hilos de telaraña de la claqueta a la balda de arriba y la araña que baja por el suyo
  R.linea(158, 68, 150, 57, hex('#9aa2b8'), 2); R.linea(220, 68, 232, 57, hex('#9aa2b8'), 2);
  { const y = Math.round(lerp(60, 92, tramo(t, P3, P3 + 2.2)) + Math.sin(t * 3) * 2), x = 150; R.linea(x, 57, x, y - 2, hex('#b8c0d0')); R.disco(x, y, 2, K); R.pset(x, y - 1, hex('#c83a3a'));
    const pt = Math.sin(t * 10) > 0 ? 1 : 0; for (const d of [-1, 1]) { R.linea(x + d * 2, y - 1, x + d * 4, y - 3 + pt, K); R.linea(x + d * 2, y, x + d * 5, y, K); R.linea(x + d * 2, y + 1, x + d * 4, y + 3 - pt, K); } }
  // las tres X sobre las latas grandes
  [x1, x2, x3].forEach((tx, k) => { if (t < tx) return; const [cx, cy] = X3[k], e = lin(t, tx, tx + 0.15), s = e < 1 ? 3 : 2; R.icono('X', cx - (5 * s >> 1), cy - (5 * s >> 1) - 1, ROJO, hex('#5a1418'), s); });
  // motas en el rayo de luz y una polilla
  for (let k = 0; k < 16; k++) { const u = (t * 0.06 + h(k, 1, 24)) % 1, y = Math.round(24 + u * 150), x = Math.round(48 + (y - 20) * 0.75 + h(k, 2, 24) * 80 + Math.sin(t + k) * 3); if (x < 316) R.pset(x, y, hex('#f4e0b0')); }
  { const x = Math.round(214 + Math.cos(t * 2.1) * 22), y = Math.round(140 + Math.sin(t * 3.3) * 9); R.pset(x, y, hex('#d8d0c0')); R.pset(x + (Math.sin(t * 24) > 0 ? 1 : -1), y - 1, hex('#f0e8d8')); }
};

const efectos = [[muere, 'interruptor'], [tele0, 'interruptor'], [tele1, 'interruptor'], [x1, 'toc'], [x2, 'toc'], [x3, 'toc']];
const año = (t) => (t < P2 ? 1986 : t < tele1 ? Math.round(lerp(1986, 2000, lin(t, P2, b(0.62)))) : t < P3 ? Math.round(lerp(2000, 2016, lin(t, tele1, P3))) : 2016);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')

# ─────────────────────────────────────────────────────────── du-villeneuve ──
E['du-villeneuve'] = ('Villeneuve y el desierto de verdad', '''// DU-VILLENEUVE (frases 26–27), cartela 2021. Cinco planos:
// 1. libros 'imprenta'/libreria (1980): el adolescente entra en la librería (campanilla), ve la pila («!»), coge nuestro
//    libro, lo abre en «read the novel» y de las páginas le sale un planeta con dos lunas; da un bote. Detrás, la
//    dependienta atiende y un cliente curiosea. Corta en «His idea».
// 2. (LOCAL) la mesa de trabajo de Villeneuve, con el corcho de bocetos: su mano da un toque al libro («simple»); el
//    libro intenta entrar en UNA lata de película y no cabe: rebota («Don't squeeze… one movie», con su X); la mano
//    línea de puntos del corte baja por el lomo y el libro se parte en dos («split»); sobre cada mitad, una claqueta con su 1 y su 2 («two»).
//    Corta en «And instead».
// 3. salas 'subasta'/rodaje (2021, sin lo de delante): dos operarios se llevan el bastidor de cartón piedra al camión
//    («instead of building the desert in a studio»); Villeneuve entra con la claqueta, señala las rocas de verdad («went
//    looking for it») y la cierra en «He filmed». Corta en «Wadi».
// 4. (LOCAL) el mapa de papel de Oriente Próximo (costas de verdad): la chincheta de Wadi Rum cae en «Wadi Rum», su
//    ficha con las rocas rojas; la ruta de puntos cruza Arabia y en «dunes of Abu Dhabi» cae la segunda, con su ficha de
//    dunas. Corta en «The sand».
// 5. (LOCAL) las dunas al atardecer (un solo sol, la Tierra): la cámara de cine grande en primer término, Villeneuve
//    pequeño en la duna deja caer arena de la mano («real sand»), el equipo lejos bajo su sombrilla, el viento peina
//    las crestas y la avioneta de Herbert cruza el cielo («from a small plane») con su sombra por las dunas.''', UTIL + r'''
import { equirect, mapaPapel, PAPEL } from '/atomo/plato/escenas/ov-mapas.js';
const c = (f) => en('villeneuve', f), d = (f) => en('desierto', f);
const P2 = c(0.537) - 0.1, P3 = d(0), P4 = d(0.392), P5 = d(0.709) - 0.02;
const ve = c(0.136), coge = c(0.251), abre = c(0.348), idea = c(0.40), bote = c(0.447);
const simple = c(0.598), aprieta = c(0.661), una = c(0.763), rebota = c(0.787), parte = c(0.865), mitad = c(0.913), dos = c(0.951);
const busca = d(0.177), filma = d(0.287), jordania = d(0.473), dunas = d(0.561), abu = d(0.616), avion = d(0.800), real = d(0.884);

// ── 1. la librería de 1980 ──────────────────────────────────────────────────────────────────────
const O1 = { encuadre: 'imprenta', camara: 'libreria', cartel: false };
const p1 = (t) => {
  T.libros(R, t, O1);
  const S = 154;
  // la lámpara de globo de x 82 cae justo bajo la cifra de 1980: se tapa con la pared de al lado
  for (let y = 0; y <= 26; y++) for (let xx = 73; xx <= 91; xx++) R.pset(xx, y, R.pget(xx + 40, y));
  // la pila de la mesa central: tres tumbados y uno de pie (el que se lleva)
  for (let k = 0; k < 3; k++) { const y = 134 - k * 3; R.rect(144 + (k % 2), y - 3, 166 + (k % 2), y, K); R.rect(145 + (k % 2), y - 2, 165 + (k % 2), y - 1, hex(k === 1 ? '#e09848' : '#1c2450')); R.rect(162 + (k % 2), y - 2, 165 + (k % 2), y - 1, hex('#efe6d0')); }
  if (t < coge) PZ.libro?.(R, 155, 125, {});
  PZ.libro?.(R, 190, 132, {});
  // la dependienta tras el mostrador y un cliente que curiosea en la estantería
  R.actor(EL.lector3DU, 250, 146, t, { dir: -1, habla: t > 1.6 && t < 3.0, sonrisa: t > 3.0 });
  const cx = t < 4.4 ? 214 : lerp(214, 228, tramo(t, 4.4, 5.4));
  R.actor(EL.lector1DU, cx, S - 2, t, { dir: 1, anda: t > 4.4 && t < 5.4, dedo: t > 2.6 && t < 3.8 });
  // el adolescente: entra, ve la pila, coge el libro, lo abre y alucina
  const x = lerp(84, 114, tramo(t, 1.3, ve - 0.1)), anda = t < ve - 0.1, lee = t > abre;
  const sb = t > bote && t < bote + 0.5 ? Math.round(Math.sin((t - bote) / 0.5 * Math.PI) * 4) : 0;
  const j = R.actor(EL.villeneuveJoven, x, S, t, { dir: 1, anda, sorpresa: (t > ve && t < coge) || (t > idea && t < idea + 0.6), sonrisa: t > coge, sostiene: t > coge ? (lee ? [x + 17, S - 13] : true) : t > coge - 0.35 ? [x + 22, S - 20] : false, salto: sb });
  if (t > ve && t < coge - 0.3) R.bocadillo(x + 8, S - 32 - sb);
  if (t > coge) { if (lee) PZ.libro?.(R, x + 31, S - 5 - sb, { abierto: true }); else PZ.libro?.(R, j.mano[0] + 6, j.mano[1] + 9, {}); }
  // lo que sale del libro: un planeta naranja con sus dos lunas y chispas
  if (t > idea) { const u = lin(t, idea, idea + 0.5), px = x + 31, py = Math.round(S - 26 - u * 20 - sb + Math.sin(t * 3) * 1.5), r = Math.round(2 + u * 5);
    R.disco(px, py, r + 1, K); R.disco(px, py, r, hex('#e09848')); R.disco(px - 1, py - 1, Math.max(1, r - 3), hex('#f4c078')); if (r > 4) R.linea(px - 4, py + 2, px + 3, py + 3, hex('#b06a2c'));
    if (u >= 1) { for (const [k, rr] of [[0, 12], [2.6, 15]]) { const an = t * 1.6 + k, mx = Math.round(px + Math.cos(an) * rr), my = Math.round(py + Math.sin(an) * rr * 0.45); R.disco(mx, my, 2, K); R.disco(mx, my, 1, hex('#f8eec8')); }
      for (let k = 0; k < 5; k++) { const an = k * 1.26 + t * 0.8, sx = Math.round(px + Math.cos(an) * 20), sy = Math.round(py + Math.sin(an) * 12); if (Math.sin(t * 6 + k * 2) > 0) { R.pset(sx, sy, OROL); R.pset(sx - 1, sy, ORO); R.pset(sx + 1, sy, ORO); R.pset(sx, sy - 1, ORO); R.pset(sx, sy + 1, ORO); } } } }
  T.librosDelante(R, t, O1);
};

// ── 2. la mesa de trabajo: el libro que no cabe en una lata y se parte en dos ───────────────
const MESA = RA('#4a2c16', '#623c1e', '#7c5028', '#966636', '#b08046');
const fondoMesa = fijo(() => {
  // la pared, lisa arriba, y el corcho con los bocetos (formas nuestras: dunas, lunas, flechas, muestras de color)
  relleno(0, 0, 319, 95, RA('#22303a', '#2a3a46', '#324452', '#3a4e5e'), 1.3, 0.7, 41);
  for (let y = 22; y < 96; y += 3) for (let x = (y % 2) * 5; x < 320; x += 11) if (h(x, y, 42) < 0.3 && !(x > 268 && y < 50)) R.pset(x, y, hex('#42586a'));
  R.rect(36, 24, 264, 88, K); R.rect(37, 25, 263, 87, hex('#8a5e36')); R.rect(37, 25, 263, 25, hex('#c8944c')); R.rect(40, 28, 260, 84, K);
  for (let y = 29; y <= 83; y++) for (let x = 41; x <= 259; x++) R.pset(x, y, tono(RA('#a87a48', '#b88a54', '#c89a62', '#d4aa72'), 1.4 + (h(x, y, 43) - 0.5) * 1.6, x, y));
  const ficha = (x, y, w, hh, k) => { R.rect(x + 1, y + 1, x + w + 1, y + hh + 1, hex('#7a5a34')); R.rect(x - 1, y - 1, x + w, y + hh, K); R.rect(x, y, x + w - 1, y + hh - 1, hex('#f0e8d4'));
    if (k === 0) { for (let i = 1; i < w - 1; i++) { const yy = y + hh - 4 - Math.round(Math.sin(i / (w - 2) * Math.PI) * (hh - 9)); R.rect(x + i, yy, x + i, y + hh - 2, hex('#e09848')); R.pset(x + i, yy, hex('#b06a2c')); } R.disco(x + w - 6, y + 4, 2, hex('#c8c0a8')); R.pset(x + 5, y + 3, hex('#c8c0a8')); }
    else if (k === 1) { for (let i = 0; i < 4; i++) R.rect(x + 2 + i * Math.floor((w - 3) / 4), y + 2, x + i * Math.floor((w - 3) / 4) + Math.floor((w - 3) / 4), y + hh - 3, hex(['#e09848', '#b06a2c', '#1c2450', '#7a9a52'][i])); }
    else if (k === 2) { R.disco(x + (w >> 1), y + (hh >> 1), Math.min(w, hh) / 2 - 3, hex('#e09848')); R.disco(x + (w >> 1) - 2, y + (hh >> 1) - 2, 2, hex('#f4c078')); R.disco(x + w - 5, y + 4, 1, K); }
    else { for (let j = 3; j < hh - 2; j += 3) R.rect(x + 2, y + j, x + w - 3 - ((j * 5) % 7), y + j, hex('#8a8474')); R.linea(x + 3, y + hh - 4, x + w - 5, y + 4, hex('#c83a3a')); }
    R.disco(x + (w >> 1), y, 1, hex(['#c83a3a', '#3a6ab0', '#e8c040'][k % 3])); };
  [[46, 33, 30, 20, 0], [82, 31, 22, 16, 3], [48, 58, 24, 22, 2], [78, 52, 30, 14, 1], [226, 32, 30, 22, 0], [228, 60, 28, 20, 3], [196, 34, 24, 16, 1], [200, 56, 22, 24, 2], [112, 32, 26, 12, 3], [168, 31, 22, 12, 1]].forEach(([x, y, w, hh, k]) => ficha(x, y, w, hh, k));
  for (const [x0, y0, x1, y1] of [[76, 44, 82, 38], [224, 54, 214, 46], [108, 60, 100, 66]]) R.linea(x0, y0, x1, y1, hex('#c83a3a'), 2);
  // el tablero de la mesa
  R.rect(0, 94, 319, 95, K); R.rect(0, 96, 319, 97, MESA[4]); madera(0, 98, 319, 179, MESA, 16, 44);
  elipse(160, 150, 120, 34, hex('#ffe0a0'), 0.22);
  // a la izquierda, al fondo: el taco de páginas del guion con su clip; a la derecha: las viñetas del storyboard, el lápiz
  for (let k = 0; k < 5; k++) { R.rect(10 + k % 2, 112 - k * 2, 52 + k % 2, 114 - k * 2, K); R.rect(11 + k % 2, 112 - k * 2, 51 + k % 2, 113 - k * 2, k === 4 ? BL : hex('#e0d8c4')); } for (let j = 0; j < 3; j++) R.rect(16, 100 + j * 2, 40 - j * 5, 100 + j * 2, hex('#8a8474'));
  for (const [x, y, k] of [[228, 126, 0], [262, 120, 1], [244, 148, 2]]) { R.poligono([[x + 2, y + 24], [x + 34, y + 22], [x + 36, y + 2], [x + 4, y + 4]], hex('#5a3a1e')); R.poligono([[x, y + 22], [x + 32, y + 20], [x + 34, y], [x + 2, y + 2]], K); R.poligono([[x + 1, y + 21], [x + 31, y + 19], [x + 33, y + 1], [x + 3, y + 3]], BL);
    R.rect(x + 5, y + 5, x + 29, y + 15, K); R.rect(x + 6, y + 6, x + 28, y + 14, hex(k === 1 ? '#3a4e7a' : '#f0c890')); for (let i = 0; i < 23; i++) { const yy = y + 12 - Math.round(Math.sin(i / 22 * Math.PI + k) * 3); R.rect(x + 6 + i, yy, x + 6 + i, y + 14, hex(k === 1 ? '#b06a2c' : '#e09848')); } R.rect(x + 5, y + 17, x + 22, y + 17, hex('#8a8474')); }
  R.linea(212, 170, 236, 176, K); R.linea(212, 169, 236, 175, hex('#e8c040')); R.linea(236, 175, 239, 176, hex('#f0d8b0')); R.pset(240, 176, K); R.rect(209, 168, 211, 170, hex('#e88a8a'));
  // la taza de café (el vapor va vivo)
  { const x = 296, y = 108; ovalo(x + 2, y + 12, 12, 3, mez(MESA[1], K, 0.4)); R.rect(x - 8, y - 4, x + 8, y + 10, K); R.rect(x - 7, y - 3, x + 7, y + 9, hex('#e8e4dc')); R.rect(x - 7, y - 3, x - 5, y + 9, BL); R.rect(x + 5, y - 3, x + 7, y + 9, hex('#b8b4ac')); ovalo(x, y - 4, 8, 2, K); ovalo(x, y - 4, 7, 1, hex('#4a2a16')); R.rect(x + 9, y, x + 12, y + 1, K); R.rect(x + 12, y + 1, x + 13, y + 5, K); R.rect(x + 9, y + 6, x + 12, y + 7, K); R.rect(x - 7, y + 3, x + 7, y + 4, hex('#3a6ab0')); }
});
// la lata de película abierta, en tres cuartos, con su bobina dentro y la tapa apoyada detrás
const lata = (cx, cy) => { cx = Math.round(cx); cy = Math.round(cy);
  ovalo(cx + 4, cy + 3, 32, 9, mez(MESA[1], K, 0.45));
  ovalo(cx - 22, cy - 22, 24, 10, K); ovalo(cx - 22, cy - 22, 23, 9, hex('#8a94a8')); ovalo(cx - 22, cy - 23, 19, 7, hex('#a4acbc')); ovalo(cx - 22, cy - 23, 8, 3, hex('#e8dcc0'));
  ovalo(cx, cy - 2, 30, 11, K); R.rect(cx - 30, cy - 12, cx + 30, cy - 2, K); ovalo(cx, cy - 12, 30, 11, K);
  ovalo(cx, cy - 2, 29, 10, hex('#566078')); R.rect(cx - 29, cy - 12, cx + 29, cy - 2, hex('#7a8498')); R.rect(cx - 29, cy - 12, cx - 22, cy - 2, hex('#a4acbc')); R.rect(cx + 20, cy - 12, cx + 29, cy - 2, hex('#566078'));
  ovalo(cx, cy - 12, 29, 10, hex('#a4acbc')); ovalo(cx, cy - 12, 26, 8, K); ovalo(cx, cy - 11, 25, 7, hex('#2a2a34')); ovalo(cx, cy - 11, 21, 6, hex('#4a3420')); ovalo(cx, cy - 11, 16, 4, hex('#3a2818')); ovalo(cx, cy - 11, 6, 2, hex('#a4acbc')); R.pset(cx, cy - 11, K); };
// el libro grande, pintado una vez en un búfer para poder partirlo
let BUF = null; const LX0 = 132, LX1 = 188, LY0 = 76, LY1 = 151;
const libroBuf = () => { if (BUF) return; BUF = R.nuevo(); const prev = R.usar(BUF); PZ.libro?.(R, 160, 150, { s: 3 }); R.usar(prev); };
// pinta el libro desplazado; sep > 0: partido por la mitad en zigzag, cada mitad hacia su lado
const pintaLibro = (dx, dy, sep = 0) => { libroBuf(); dx = Math.round(dx); dy = Math.round(dy); sep = Math.round(sep);
  ovalo(160 + dx - sep, 152 + dy * 0.2, 30 + (sep ? -8 : 0), 4, mez(MESA[1], K, 0.45)); if (sep) ovalo(160 + dx + sep + 8, 152, 22, 4, mez(MESA[1], K, 0.45));
  for (let y = LY0; y <= LY1; y++) { const m = 160 + ((y >> 2) & 1 ? 3 : -2); for (let x = LX0; x <= LX1; x++) { const p = BUF[y * 320 + x]; if (!p) continue; const iz = x <= m; R.pset(x + dx + (sep ? (iz ? -sep : sep) : 0), y + dy, p); }
    if (sep) { R.pset(m + dx - sep + 1, y + dy, BL); R.pset(m + dx + sep, y + dy, BL); R.pset(m + dx + sep - 1, y + dy, hex('#cfc4a8')); } } };
const p2 = (t) => {
  fondoMesa();
  // el vapor del café
  for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1; for (let i = 0; i < 3; i++) R.pset(Math.round(294 + k * 3 + Math.sin(u * 6 + k * 2 + i) * 2), Math.round(102 - u * 16 - i), hex('#c8d0d8')); }
  // la lata: tiembla cuando el libro la aprieta
  const apr = t > aprieta + 0.35 && t < rebota, tem = apr ? Math.round(Math.sin(t * 40) * 1.5) : 0;
  lata(62 + tem, 152);
  // el libro: va hacia la lata, aprieta, rebota, vuelve y se parte
  const ida = tramo(t, aprieta, aprieta + 0.4), vuelta = tramo(t, rebota, rebota + 0.55);
  const dx = t < rebota ? -ida * 50 + (apr ? Math.round(Math.sin(t * 30) * 1.5) - 2 : 0) : -50 * (1 - vuelta);
  const dy = t > rebota && t < rebota + 0.55 ? -Math.sin((t - rebota) / 0.55 * Math.PI) * 16 : t > simple && t < simple + 0.25 ? 1 : 0;
  const sep = t > mitad ? 20 * tramo(t, mitad, mitad + 0.45) : 0;
  pintaLibro(dx, dy, sep);
  // la X sobre la lata: no cabe
  if (t > una && t < parte) { const e = lin(t, una, una + 0.15); R.icono('X', 50, 100 - Math.round(e * 4), ROJO, hex('#5a1418'), 4); }
  if (t > rebota && t < rebota + 0.3) for (let k = 0; k < 5; k++) { const an = -0.9 + k * 0.45, r = 8 + (t - rebota) * 50; R.linea(Math.round(98 + Math.cos(an) * r), Math.round(120 + Math.sin(an) * r), Math.round(98 + Math.cos(an) * (r + 5)), Math.round(120 + Math.sin(an) * (r + 5)), BL); }
  // las dos claquetas con su número
  [[dos, 122, '1'], [dos + 0.3, 200, '2']].forEach(([t0, x, n]) => { if (t < t0) return; const e = lin(t, t0, t0 + 0.2), y = 70 - Math.round(Math.sin(e * Math.PI) * 5);
    R.rect(x - 22, y - 23, x + 22, y + 3, K); R.rect(x - 21, y - 22, x + 21, y + 2, hex('#22303a')); PZ.claqueta?.(R, x - 8, y, { abierta: e < 1 }); R.numero(n, x + 6, y - 2, { tam: 16 }); });
  // la mano de Villeneuve entra por abajo y da un toque al libro («simple»)
  const M = '#3a4252';
  if (t < aprieta) { const u = Math.sin(lin(t, simple - 0.45, simple + 0.5) * Math.PI), wx = lerp(214, 200, u), wy = lerp(184, 146, u); if (u > 0.02) T.brazo(R, 228, 196, wx, wy, M, -1); }
  // el corte: una línea de puntos baja por el lomo y salta una chispa
  if (t > parte && t < mitad + 0.1) { const yb = Math.round(lerp(LY0, LY1, lin(t, parte, mitad))); for (let y = LY0 - 2; y <= yb; y++) if ((y >> 1) & 1) { R.pset(160, y, BL); R.pset(161, y, BL); }
    for (let k = 0; k < 6; k++) { const an = k * 1.05 + t * 9; R.linea(160, yb, Math.round(160 + Math.cos(an) * 5), Math.round(yb + Math.sin(an) * 5), k % 2 ? OROL : BL); } }
};

// ── 3. el desierto de verdad: fuera el cartón piedra ────────────────────────────────────────
const O3 = { encuadre: 'subasta', camara: 'rodaje', delante: false };
const p3 = (t) => {
  T.salas(R, t, O3);
  const S = 150;
  // el bastidor, que se lo llevan al camión
  const fx = lerp(128, 300, tramo(t, P3 + 0.2, P3 + 3.6));
  if (fx < 296) { R.actor(EL.operarioDU, fx + 52, S - 1, t, { dir: 1, anda: true }); bastidor(fx, 148, 0); R.actor(EL.voluntario1DU, fx - 15, S, t, { dir: 1, anda: true, sostiene: [fx - 1, S - 14] }); }
  // la operadora espera junto a los raíles
  R.actor(EL.operadorDU, 196, S + 1, t, { dir: -1, habla: t > busca + 0.6 && t < filma, sonrisa: t > filma, brazos: t > filma + 0.1 && t < filma + 0.9 });
  // Villeneuve entra con la claqueta, señala las rocas y la cierra
  const vx = lerp(60, 132, tramo(t, P3, busca - 0.3)), anda = t < busca - 0.3, senala = t > busca && t < filma - 0.25;
  const v = R.actor(EL.villeneuve, vx, S + 2, t, { dir: senala ? -1 : 1, anda, sonrisa: !anda && !senala, sostiene: true, habla: senala });
  PZ.claqueta?.(R, v.mano[0] + (senala ? -5 : 5), v.mano[1] + 10, { abierta: t < filma });
  if (t >= filma && t < filma + 0.25) for (let k = 0; k < 4; k++) R.linea(v.mano[0] + 16 + k, v.mano[1] - 12 + k * 3, v.mano[0] + 20 + k, v.mano[1] - 14 + k * 3, BL);
  if (senala) for (let k = 0; k < 3; k++) { const u = ((t - busca) * 1.6 + k * 0.33) % 1; R.anillo(58, 70, Math.round(4 + u * 12), u < 0.7 ? OROL : ORO, 2); }
  T.salasDelante(R, t, O3);
};

// ── 4. el mapa: Wadi Rum y las dunas de Abu Dabi ─────────────────────────────────────────────
const PM = equirect([20, 14, 300, 170], [26, 62, 14.5, 34.5]);
const WR = PM([35.4, 29.6]).map(Math.round), AD = PM([53.8, 23.1]).map(Math.round);
const RUTA = [[35.4, 29.6], [39, 28.6], [43, 27], [47, 25.4], [50.5, 24], [53.8, 23.1]].map((p) => PM(p).map(Math.round));
const fondoMapa = fijo(() => {
  mapaPapel(R, 0, PM, { mundo: true, reticula: 5, rosa: [262, 146], mesa: 6 });
  // el punteado del desierto, las dunas del sur de Arabia y los montes junto al mar Rojo y en Irán
  const esTierra = (x, y) => { const p = R.pget(x, y); return p === PAPEL.tierra || p === PAPEL.tierraS; };
  for (let y = 16; y < 166; y++) for (let x = 22; x < 298; x++) if (esTierra(x, y) && h(x, y, 71) < 0.045) R.pset(x, y, hex('#c0a070'));
  for (let k = 0; k < 46; k++) { const [x, y] = PM([44 + h(k, 1, 72) * 12, 17.5 + h(k, 2, 72) * 6.5]).map(Math.round); if (esTierra(x, y) && esTierra(x + 5, y)) { R.pset(x, y, PAPEL.costa); R.pset(x + 1, y - 1, PAPEL.costa); R.pset(x + 2, y - 1, PAPEL.costa); R.pset(x + 3, y, PAPEL.costa); R.pset(x + 4, y + 1, hex('#c0a070')); } }
  const sierra = (pts) => { for (let i = 1; i < pts.length; i++) for (let u = 0; u < 1; u += 0.34) { const [x, y] = PM([lerp(pts[i - 1][0], pts[i][0], u), lerp(pts[i - 1][1], pts[i][1], u)]).map(Math.round); if (!esTierra(x, y)) continue; R.pset(x - 2, y + 1, PAPEL.frontera); R.pset(x - 1, y, PAPEL.costa); R.pset(x, y - 1, PAPEL.costa); R.pset(x + 1, y, PAPEL.frontera); R.pset(x + 2, y + 1, PAPEL.frontera); } };
  sierra([[36.2, 28], [38, 25], [40, 22], [42, 19], [43.5, 16.5]]); sierra([[46, 34], [48.5, 32], [51, 30], [53.5, 28.5], [56.5, 27.6]]); sierra([[56.5, 24.5], [58, 23.3], [59, 22.5]]);
  for (let k = 0; k < 90; k++) { const x = 24 + Math.round(h(k, 1, 73) * 270), y = 18 + Math.round(h(k, 2, 73) * 146); if ([0, 3, 6, -3].every((q) => R.pget(x + q, y) === PAPEL.mar || R.pget(x + q, y) === PAPEL.marS)) { R.pset(x, y, PAPEL.reticula); R.pset(x + 1, y - 1, PAPEL.reticula); R.pset(x + 2, y, PAPEL.reticula); R.pset(x + 3, y + 1, PAPEL.reticula); R.pset(x + 4, y, PAPEL.reticula); } }
  for (const [lo, la] of [[40.5, 30.6], [44.8, 24.6], [49.5, 20.2], [38.6, 20.6], [29.3, 25.4], [55.6, 31.2]]) { const [x, y] = PM([lo, la]).map(Math.round); R.linea(x, y, x, y - 5, PAPEL.costa); for (const [dx, dy] of [[-3, -4], [-2, -6], [2, -6], [3, -4], [-1, -7], [1, -7]]) R.pset(x + dx, y + dy, hex('#6a8a52')); R.pset(x, y - 6, hex('#6a8a52')); }
  const rio = (pts) => { for (let i = 1; i < pts.length; i++) { const [ax, ay] = PM(pts[i - 1]).map(Math.round), [bx, by] = PM(pts[i]).map(Math.round); R.linea(ax, ay, bx, by, hex('#5a82a8')); } };
  rio([[31.2, 31.2], [31.2, 29.8], [30.9, 28], [31.3, 26.4], [32.7, 25.8], [32.9, 24], [32.4, 22], [31.3, 21.6], [30.6, 19.6], [32.5, 18.6], [33.9, 17.7], [32.6, 15.6]]);
  rio([[41, 34.4], [43.5, 33.4], [44.4, 32.5], [46, 31.4], [47.4, 31], [48.2, 30.2]]); rio([[43.2, 34.4], [44.4, 33.3], [45.6, 32.4], [46.8, 31.6], [47.4, 31]]);
});
const fichaMapa = (x, y, tipo, e) => { const w = 34, hh = 22; y -= Math.round((1 - e) * 5);
  R.rect(x + 2, y + 2, x + w + 2, y + hh + 2, hex('#6a5a44')); R.rect(x - 1, y - 1, x + w + 1, y + hh + 1, K); R.rect(x, y, x + w, y + hh, hex('#f8f0dc'));
  if (tipo === 0) { R.rect(x + 1, y + 1, x + w - 1, y + 12, hex('#b8d4e8')); for (const [a, b2, top] of [[2, 11, 5], [13, 20, 2], [22, 32, 7]]) { R.rect(x + a, y + top, x + b2, y + hh - 4, hex('#c8603c')); R.rect(x + a, y + top, x + a + 1, y + hh - 4, hex('#e08a5a')); R.rect(x + b2 - 2, y + top, x + b2, y + hh - 4, hex('#964428')); for (let j = top + 3; j < hh - 4; j += 4) R.rect(x + a + 2, y + j, x + b2 - 3, y + j, hex('#a85030')); }
    R.rect(x + 1, y + hh - 4, x + w - 1, y + hh - 1, hex('#e0a868')); }
  else { R.rect(x + 1, y + 1, x + w - 1, y + 10, hex('#b8d4e8')); R.disco(x + 26, y + 6, 3, hex('#f8e8a0')); for (let i = 1; i < w; i++) { const y1 = y + 13 - Math.round(Math.sin(i * 0.2 + 1) * 4), y2 = y + 17 - Math.round(Math.sin(i * 0.26 + 3) * 3); R.rect(x + i, y1, x + i, y + hh - 1, hex('#e8b060')); R.pset(x + i, y1, hex('#f8d890')); R.rect(x + i, y2, x + i, y + hh - 1, hex('#d09040')); R.pset(x + i, y2, hex('#f0c070')); } }
  R.icono('camara', x + w - 9, y + hh - 9, K, hex('#f8f0dc')); };
const p4 = (t) => {
  fondoMapa();
  // el sol de la ventana que cruza el papel, con la sombra de unas hojas
  baña(20, 14, 300, 166, hex('#fff0c0'), 0.14, (x, y) => { const q = x - 60 - (y - 14) * 0.5 - Math.sin(t * 0.4) * 6; return q > 0 && q < 70 && Math.sin((x + y) * 0.2 + Math.sin(t * 1.3) * 1.5) > -0.6 ? 1 : 0; });
  // la ruta de puntos de una a otra
  const ur = lin(t, jordania - 0.1, dunas + 0.1); if (ur > 0) R.ruta(RUTA, ur, hex('#c83a3a'), { grueso: false });
  // Wadi Rum: la chincheta cae y sale su ficha de rocas rojas
  const b1 = lin(t, P4 + 0.08, P4 + 0.5); T.chincheta(R, WR[0], WR[1], t, C.rojo, { baja: b1, pulso: t > jordania - 0.1 && t < jordania + 0.9 });
  if (b1 >= 1) { const e = lin(t, P4 + 0.5, P4 + 0.75); fichaMapa(WR[0] - 16, WR[1] + 12, 0, e); }
  // Abu Dabi: la segunda, con su ficha de dunas
  const b2 = lin(t, dunas, dunas + 0.42); T.chincheta(R, AD[0], AD[1], t, hex('#e8a030'), { baja: b2, pulso: t > abu - 0.1 });
  if (b2 >= 1) { const e = lin(t, dunas + 0.42, dunas + 0.67); fichaMapa(AD[0] - 18, AD[1] + 12, 1, e); }
  // un dhow en el mar de Arabia y otro en el mar Rojo
  for (const [lo0, la0, lo1, la1, k] of [[58.8, 21.2, 56.6, 17.2, 0], [37.6, 22.4, 39.4, 19.4, 1]]) { const u = (t * 0.035 + k * 0.4) % 1, [x, y0] = PM([lerp(lo0, lo1, u), lerp(la0, la1, u)]).map(Math.round), y = y0 + (Math.sin(t * 2 + k) > 0 ? 0 : 1);
    R.rect(x - 4, y, x + 4, y + 1, PAPEL.costa); R.pset(x - 5, y - 1, PAPEL.costa); R.pset(x + 5, y - 1, PAPEL.costa); R.linea(x, y - 1, x, y - 8, PAPEL.costa); R.poligono([[x + 1, y - 8], [x + 1, y - 2], [x + 6, y - 2]], hex('#f8f0dc')); R.pset(x - 7 - (Math.floor(t * 3) % 2), y + 1, hex('#c8dce8')); R.pset(x - 9, y + 1, hex('#c8dce8')); }
  // la mariquita que recorre el canto de la mesa
  { const x = Math.round(40 + ((t * 9) % 240)), y = 175; R.rect(x, y, x + 3, y + 2, K); R.rect(x + 1, y, x + 2, y + 1, ROJO); R.pset(x + 4, y + 1, K); if (Math.sin(t * 20) > 0) { R.pset(x, y + 3, K); R.pset(x + 3, y + 3, K); } else R.pset(x + 2, y + 3, K); }
};

// ── 5. las dunas de verdad, al atardecer ─────────────────────────────────────────────────────
const CIELO = RA('#3a2a5e', '#5a3266', '#8a3c62', '#c0504a', '#e0783a', '#f0a440', '#f8cc68');
const cresta = [(x) => 104 + Math.sin(x * 0.021 + 1) * 5 + Math.sin(x * 0.05) * 2, (x) => 122 + Math.sin(x * 0.017 + 3.6) * 9 + Math.sin(x * 0.043 + 1) * 3, (x) => 150 + Math.sin(x * 0.013 + 0.6) * 10 + Math.sin(x * 0.037 + 2) * 3];
const DUNA = [RA('#5a2e3e', '#7a3c40', '#964a3c'), RA('#7a3a2c', '#a85430', '#cc7434', '#e89444'), RA('#6a3020', '#964a26', '#c06a2c', '#e08c3c', '#f4b45c')];
let BUFD = null;
const fondoCielo = fijo(() => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(CIELO, Math.pow(y / 112, 1.25) * 6.2 + (h(x >> 2, y >> 1, 81) - 0.5) * 0.5, x, y));
  // el sol, uno solo, con su halo
  for (let r = 34; r > 14; r -= 5) for (let y = 60; y < 120; y++) for (let x = 170; x < 262; x++) { const dd = Math.hypot(x - 216, y - 96); if (dd < r && BY[(y & 3) * 4 + (x & 3)] < 6 + (34 - r) / 3) R.pset(x, y, hex(r > 24 ? '#f8b850' : '#fcd880')); }
  R.disco(216, 96, 14, hex('#fff0b8')); R.disco(216, 96, 12, hex('#fffbe0'));
});
const dunasBuf = () => { if (BUFD) return; BUFD = R.nuevo(); const prev = R.usar(BUFD);
  for (let k = 0; k < 3; k++) for (let x = 0; x < 320; x++) { const y0 = Math.round(cresta[k](x)), pend = cresta[k](x + 2) - cresta[k](x - 2), r = DUNA[k];
    for (let y = y0; y < 180; y++) { const dy = y - y0, luz = cl(pend * 1.5, -0.7, 1.1), ond = k ? Math.sin(dy * (k === 2 ? 0.7 : 1.1) + Math.sin(x * 0.06 + k) * 2.5 + x * 0.05) * 0.55 : 0;
      R.pset(x, y, tono(r, r.length * 0.5 + luz * Math.max(0, 1 - dy / (k === 2 ? 26 : 14)) + ond - dy / (k === 2 ? 60 : 90) + (h(x, y, 82 + k) - 0.5) * 0.5, x, y)); }
    R.pset(x, y0, pend > 0.15 ? hex(k === 2 ? '#fcd890' : k ? '#f0b060' : '#b05a44') : r[0]); }
  // el equipo, lejos, en la duna de en medio: la sombrilla, el trípode y dos siluetas
  { const x = 268, y = Math.round(cresta[1](268)) + 3; R.linea(x, y, x, y - 12, K); R.poligono([[x - 8, y - 11], [x + 8, y - 11], [x, y - 16]], hex('#f0e8d8')); R.poligono([[x - 8, y - 11], [x, y - 11], [x, y - 16]], hex('#c83a3a'));
    for (const [dx, c0] of [[-12, '#2a2a3a'], [11, '#3a2a2a']]) { R.rect(x + dx, y - 7, x + dx + 2, y, hex(c0)); R.disco(x + dx + 1, y - 9, 1, hex('#e8b890')); }
    R.linea(x - 20, y, x - 18, y - 6, K); R.linea(x - 16, y, x - 18, y - 6, K); R.rect(x - 20, y - 9, x - 16, y - 7, K); }
  // huellas en la duna de delante
  for (let i = 0; i < 14; i++) { const x = 150 + i * 8, y = Math.round(cresta[2](x)) + 10 + (i % 2) * 2 + Math.round(i * 0.4); R.rect(x, y, x + 2, y, hex('#964a26')); R.pset(x + 1, y + 1, hex('#f4b45c')); }
  R.usar(prev); };
const nubeT = (cx, cy, w, c) => { cx = Math.round(cx); ovalo(cx, cy + 1, w * 0.5, 3, c[0]); ovalo(cx + w * 0.3, cy + 3, w * 0.3, 2, c[0]); ovalo(cx - w * 0.08, cy - 1, w * 0.4, 2, c[1]); ovalo(cx + w * 0.2, cy, w * 0.26, 2, c[1]); ovalo(cx - w * 0.12, cy - 2, w * 0.24, 1, c[2]); ovalo(cx + w * 0.22, cy - 1, w * 0.12, 1, c[2]); };
const p5 = (t) => {
  fondoCielo(); dunasBuf();
  // nubes de tres tonos a tres velocidades (por debajo de la zona de Atom) y una bandada
  for (const [x0, y, w, v, k] of [[30, 58, 46, 2.2, 0], [150, 72, 60, 1.4, 1], [250, 64, 38, 3, 2], [90, 84, 34, 1, 3], [-40, 46, 30, 1.7, 4]]) { const x = ((x0 + t * v + 60) % 400) - 60; if (y < 52 && x > 236) continue; nubeT(x, y, w, RA('#7a3058', '#c8584e', '#f09a58')); }
  for (let k = 0; k < 5; k++) { const x = Math.round(150 - t * 7 + k * 7), y = Math.round(40 + Math.abs(k - 2) * 3 + Math.sin(t + k) * 1), al = Math.sin(t * 8 + k) > 0 ? -1 : 1; R.pset(x, y, K); R.pset(x - 1, y + al, K); R.pset(x + 1, y + al, K); }
  // la avioneta de Herbert cruza el cielo
  const ua = lin(t, P5 + 0.3, P5 + 4.6), ax = lerp(-30, 224, ua), ay = lerp(64, 50, ua) + Math.sin(t * 2) * 1.5;
  PZ.avioneta?.(R, Math.round(ax), Math.round(ay), { helice: true, t });
  // las dunas, por delante del cielo
  for (let i = 0; i < 57600; i++) { const p = BUFD[i]; if (p) R.pset(i % 320, (i / 320) | 0, p); }
  // la sombra de la avioneta por las dunas
  { const sx = Math.round(ax + 20), sy = Math.round(cresta[1](sx) + 9); if (sx > 0 && sx < 319) baña(sx - 9, sy - 2, sx + 9, sy + 2, K, 0.3, (x, y) => (((x - sx) / 9) ** 2 + ((y - sy) / 2) ** 2 < 1 ? 1 : 0)); }
  // el viento peina las crestas
  for (let k = 0; k < 46; k++) { const cr = cresta[1 + (k % 2)], x = Math.round((k * 43 + t * (26 + (k % 5) * 6)) % 340) - 10, y = Math.round(cr(x) - 1 - (k % 3) - Math.sin(t * 3 + k) * 1); R.pset(x, y, hex('#fce0a0')); if (k % 3 === 0) R.pset(x + 1, y, hex('#f4c078')); }
  // Villeneuve, pequeño, en la duna: llega, se para y deja caer la arena de la mano
  const S = Math.round(cresta[2](200)) + 6, vx = lerp(246, 192, tramo(t, P5, P5 + 1.5)), anda = t < P5 + 1.5, cae = t > real - 0.3;
  const sy = Math.round(cresta[2](vx + 7)) + 6;
  const v = R.actor(EL.villeneuve, vx, sy, t, { dir: -1, anda, sonrisa: true, sostiene: anda ? false : [vx - 6, sy - 14 - (cae ? 0 : 3)] });
  if (!anda) { const [mx, my] = v.mano; if (!cae) { R.rect(mx - 2, my - 3, mx + 1, my - 2, hex('#f4b45c')); R.pset(mx - 1, my - 4, hex('#fcd890')); }
    else { const n = Math.min(14, Math.round((t - real + 0.3) * 40)); for (let i = 0; i < n; i++) R.rect(mx - 1 - ((i + Math.floor(t * 20)) % 3 === 0 ? 1 : 0), my + 3 + i, mx - (i % 2), my + 3 + i, (i + Math.floor(t * 20)) % 2 ? hex('#fff0c0') : hex('#fcd890'));
      const m = Math.min(4, Math.round((t - real) * 3)); if (n >= 14) for (let j = 0; j <= m + 1; j++) R.rect(mx - 2 - j, my + 17 - (m + 1 - j), mx + 1 + j, my + 17 - (m + 1 - j), j ? hex('#fcd890') : hex('#fff0c0')); } }
  // la cámara de cine, grande, en primer término, con el piloto rojo y un brillo en el cristal
  ovalo(70, 176, 54, 5, hex('#4a2014'));
  PZ.camaraCine?.(R, 66, 177, { s: 3 });
  if (Math.sin(t * 6) < 0) R.rect(45, 93, 47, 95, hex('#4a1418'));
  for (const cx of [48, 81]) for (let k = 0; k < 3; k++) { const an = t * 4 + k * 2.09; R.disco(Math.round(cx + Math.cos(an) * 7), Math.round(66 + Math.sin(an) * 7), 1, hex('#c8ccd8')); }
  // arena que pasa por delante
  for (let k = 0; k < 18; k++) { const x = Math.round((k * 61 + t * (60 + (k % 4) * 14)) % 360) - 20, y = 150 + ((k * 13) % 28) + Math.round(Math.sin(t * 2 + k) * 2); R.pset(x, y, hex('#fce0a0')); R.pset(x + 1, y, hex('#f4c078')); }
};

const efectos = [[1.45, 'campana'], [abre, 'papel'], [idea, 'brillo'], [simple, 'golpecito'], [rebota, 'boing'], [mitad, 'papel'], [dos, 'toc'], [dos + 0.3, 'toc'],
  [P3 + 0.3, 'carro'], [filma, 'toc'], [P4 + 0.5, 'golpecito'], [dunas + 0.42, 'golpecito'], [P5 + 0.2, 'viento'], [avion - 0.6, 'motor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, cartela: '2021', año: (t) => (t < P2 ? 1980 : 2021) });
''')
