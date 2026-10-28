E = {}

# piezas que usan las dos escenas (cada escena es su propia página, así que van en las dos)
COMUN = r'''
const suave = (u) => u * u * (3 - 2 * u);
const cl = (v, a0, b0) => Math.max(a0, Math.min(b0, v));
const lin = (t, a0, b0) => cl((t - a0) / Math.max(1e-6, b0 - a0), 0, 1);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const K = T.C.k;
const mezcla = (c1, c2, f) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * f) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * f) << 8) | Math.round(r1 + ((c2 & 255) - r1) * f)) >>> 0; };
const tine = (x, y, c, f) => { x |= 0; y |= 0; if (x < 0 || x > 319 || y < 0 || y > 179) return; const B = R.buf, i = y * 320 + x; B[i] = mezcla(B[i], c, f); };
// sombra blanda en el suelo (elipse)
const sombra = (cx, cy, rx, ry, f = 0.32, c = hex('#1a1020')) => { for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) if ((x * x) / (rx * rx) + (y * y) / (ry * ry) <= 1) tine(cx + x, cy + y, c, f * (1 - 0.4 * Math.abs(x) / rx)); };
// un fondo fijo: se pinta una vez en su búfer y se copia en cada fotograma (R.usar(b) … R.usar(prev))
const fijo = (pinta) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); } R.copiar(b); }; };
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const umbral = (x, y) => (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
// degradado tramado (Bayer) entre varios colores, de arriba abajo
const degradado = (x0, y0, x1, y1, cols) => { for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), i = Math.floor(f), fr = f - i; for (let x = x0; x <= x1; x++) R.pset(x, y, cols[Math.min(cols.length - 1, i + (fr > umbral(x, y) ? 1 : 0))]); } };
// nube de tres tonos (sombra, cuerpo, luz) con el borde tramado y la base plana; ok(x, y): dónde se ve el cielo
const nubeM = (cx, cy, w, cs, ok = () => true) => {
  const bolas = [[0, 0, 0.32], [-0.32, 0.06, 0.24], [0.3, 0.05, 0.26], [-0.1, -0.12, 0.26], [0.14, -0.08, 0.22]];
  const capa = (dx0, dy0, esc, c) => { for (const [bx, by, br] of bolas) { const X = cx + bx * w + dx0, Y = cy + by * w + dy0, r = br * w * esc;
    for (let y = Math.floor(Y - r); y <= Math.ceil(Y + r); y++) { if (y > cy + w * 0.2 + dy0) continue; for (let x = Math.floor(X - r); x <= Math.ceil(X + r); x++) { const d = Math.hypot(x + 0.5 - X, y + 0.5 - Y) / r; if (d > 1 || (d > 0.84 && umbral(x, y) < 0.5)) continue; if (x >= 0 && x < 320 && y >= 0 && y < 180 && ok(x, y)) R.pset(x, y, c); } } } };
  capa(0, 1, 1, cs[0]); capa(0, 0, 0.9, cs[1]); capa(-1, -2, 0.62, cs[2]);
};
// recorrido por fotogramas clave [t, x, suelo, dir?]: dónde está, si anda y hacia dónde mira
const ruta = (t, kf) => { if (t <= kf[0][0]) return { x: kf[0][1], s: kf[0][2], mv: false, d: kf[0][3] ?? 1 };
  for (let i = 0; i + 1 < kf.length; i++) if (t < kf[i + 1][0]) { const [t0, x0, s0] = kf[i], [t1, x1, s1] = kf[i + 1], u = (t - t0) / (t1 - t0);
    return { x: Math.round(lerp(x0, x1, u)), s: Math.round(lerp(s0, s1, u)), mv: x1 !== x0 || s1 !== s0, d: kf[i][3] ?? (x1 < x0 ? -1 : 1) }; }
  const k = kf[kf.length - 1]; return { x: k[1], s: k[2], mv: false, d: k[3] ?? 1 }; };
// un punto de una parábola entre dos puntos (alto: cuánto sube en el medio)
const parab = (u, x0, y0, x1, y1, alto) => [lerp(x0, x1, u), lerp(y0, y1, u) - alto * 4 * u * (1 - u)];
const pajaro = (x, y, t, k, c) => { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 9 + k) > 0 ? 1 : 0; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - 1 + a, c); R.pset(x + 2, y - 1 + a, c); };
'''

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['fa-primero'] = ('El primer pase', '''// FA-PRIMERO (frase 11), 1906, cartela «1906». Cuatro planos:
// 1. el mapa de papel: la chincheta azul cae en Saint Louis; a «against Carroll College» se dibuja la vía del tren con sus
//    traviesas y un trenecito sube echando humo hasta Waukesha (Wisconsin), donde cae la chincheta naranja con los dos
//    banderines; sobre el papel, el balón de 1906, un reloj de bolsillo que hace tic, un lápiz y una mosca que pasea;
// 2. (corta en «His») el campo de 1906: las dos líneas frente a frente, el árbitro pita y el centro pasa el balón a
//    Robinson, que retrocede y arma el brazo («threw»); Schneider sale corriendo; Cochems lo señala desde la banda; a
//    «forward passes» aparece la flecha de tiza hacia delante, el defensa se queda con un «?» y el público se anima;
// 3. (corta en «The one that») la grada de frente, con el público de bombín: un vendedor de cacahuetes pasa, el fotógrafo
//    dispara el magnesio a «the first»; a «fell to the ground» el balón gordo cae y bota torcido delante de la grada
//    («X»), el perro ladra, un rival lo recoge a «cost them the ball» y se va corriendo; Robinson llega tarde, triste;
// 4. (corta en «But later on») travelling lateral: Robinson lanza otra vez, la cámara sigue el balón en espiral por encima
//    de las líneas de cal (5, 10, 15, 20) y Schneider lo atrapa con las dos manos a «hands»; el público salta y agita los
//    sombreros; el defensa se tira tarde.''', COMUN + r'''
const a = (s) => en('primero', (s - 1.5) / 20.475);
const P2 = a(5.83), P3 = a(11.37), P4 = a(17.40), FIN = E.duracion;
const AZ = hex('#2a4a8a'), NAR = hex('#e07a2a'), BL = hex('#f2eee2');

// ── 1 · el mapa: Saint Louis → Waukesha ─────────────────────────────────────────────────────────────────────────────
const MZ = { zoom: 3.4, centro: [-88.9, 41.1], rosa: false };
const VIA = [[-90.20, 38.63], [-89.65, 39.80], [-88.99, 40.48], [-88.08, 41.52], [-87.63, 41.88], [-87.91, 43.04], [-88.23, 43.01]];
const via0 = a(3.49), via1 = a(4.85), pinSL = 1.8, pinWK = a(4.65);
const largos = (pts) => { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return L; };
const enCamino = (pts, L, d) => { d = cl(d, 0, L[L.length - 1]); let i = 1; while (i < L.length - 1 && L[i] < d) i++;
  const u = (d - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]); return [lerp(pts[i - 1][0], pts[i][0], u), lerp(pts[i - 1][1], pts[i][1], u), Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0])]; };
const TINTA = hex('#4a3424');
const CIUDADES = [[-87.63, 41.88], [-89.59, 40.69], [-86.16, 39.77], [-85.67, 42.96], [-91.53, 41.66], [-89.40, 43.07], [-87.91, 43.04]];
// la lupa de latón apoyada en el papel, con el cristal que aclara y agranda un poco lo de debajo y su brillo
const lupa = (x, y, t) => { sombra(x + 4, y + 5, 14, 5, 0.25); R.linea(x - 9, y + 9, x - 22, y + 24, K); R.linea(x - 10, y + 9, x - 23, y + 24, hex('#5a3a22')); R.linea(x - 10, y + 10, x - 22, y + 25, hex('#3a2416'));
  for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { const d = Math.hypot(i, j); if (d < 9) tine(x + i, y + j, hex('#ffffff'), 0.16 + (i + j < -6 ? 0.2 : 0)); else if (d < 10.5) R.pset(x + i, y + j, d < 9.8 ? hex('#e8c060') : hex('#8a6a20')); }
  if (Math.sin(t * 2) > 0.3) { R.pset(x - 4, y - 5, BL); R.pset(x - 5, y - 4, BL); } };
// el reloj de bolsillo sobre el papel: caja dorada, esfera, la cadena y la aguja de los segundos que salta
const relojBolsillo = (x, y, t) => {
  for (let k = 0; k < 18; k++) { const cx = Math.round(x - 10 - k * 1.6), cy = Math.round(y + 6 + Math.sin(k * 0.7) * 3); R.pset(cx, cy, hex('#a87a28')); if (k % 2) R.pset(cx, cy - 1, hex('#e8c060')); }
  sombra(x + 2, y + 3, 10, 4, 0.3); R.disco(x, y, 9, K); R.disco(x, y, 8, hex('#c89a38')); R.disco(x - 1, y - 1, 6, hex('#e8c060')); R.disco(x, y, 6, hex('#f4ecd8'));
  R.rect(x - 1, y - 12, x + 1, y - 9, K); R.pset(x, y - 11, hex('#e8c060'));
  for (let k = 0; k < 12; k++) { const an = k / 12 * 6.283; R.pset(Math.round(x + Math.cos(an) * 5), Math.round(y + Math.sin(an) * 5), hex('#6a5a4a')); }
  R.linea(x, y, x + 2, y - 3, K); const s = Math.floor(t) / 60 * 6.283 * 4; R.linea(x, y, Math.round(x + Math.sin(s) * 5), Math.round(y - Math.cos(s) * 5), hex('#b83a2a')); R.pset(x - 3, y - 4, BL);
};
const lapiz = (x, y) => { sombra(x + 14, y + 4, 16, 2, 0.25); for (let k = 0; k < 30; k++) { const px = x + k, py = y - Math.round(k * 0.3); R.pset(px, py - 1, K); R.pset(px, py, hex('#e8b830')); R.pset(px, py + 1, hex('#b88a20')); R.pset(px, py + 2, K); }
  R.linea(x - 1, y, x - 5, y + 1, hex('#e8c8a0')); R.pset(x - 6, y + 1, hex('#3a3a46')); R.rect(x + 28, y - 10, x + 31, y - 7, hex('#d88a8a')); };
const mosca = (x, y, t, vuela) => { x = Math.round(x); y = Math.round(y); R.rect(x, y, x + 2, y + 1, K); R.pset(x + 3, y, K);
  const al = vuela ? (Math.sin(t * 60) > 0 ? hex('#e8f0f8') : hex('#a8b8c8')) : hex('#c8d4e0'); R.pset(x, y - 1, al); R.pset(x + 1, y - 1 - (vuela ? 1 : 0), al);
  if (!vuela) { const p = Math.floor(t * 12) % 2; R.pset(x + p, y + 2, K); R.pset(x + 2 - p, y + 2, K); } };
// el trenecito de juguete que sube por la vía: locomotora negra con su quitapiedras rojo y dos vagones que siguen el trazado
const tren = (pts, L, d, t, humea) => {
  for (const k of [2, 1]) { const [cx, cy] = enCamino(pts, L, d - k * 7); const X = Math.round(cx), Y = Math.round(cy); R.rect(X - 3, Y - 2, X + 2, Y + 1, K); R.rect(X - 2, Y - 1, X + 1, Y, k === 1 ? hex('#8a3a24') : hex('#3a5a2a')); R.pset(X - 1, Y - 1, hex('#e8c060')); }
  const [x, y, an] = enCamino(pts, L, d), X = Math.round(x), Y = Math.round(y), dir = Math.cos(an) >= -0.2 ? 1 : -1;
  R.rect(X - 3, Y - 3, X + 3, Y + 1, K); R.rect(X - 2, Y - 2, X + 2, Y, hex('#3a3a46')); R.pset(X - dir, Y - 2, hex('#6a6a7a')); R.rect(X + dir * 2, Y - 5, X + dir * 2, Y - 3, K); R.pset(X + dir * 4, Y + 1, hex('#c83a2a')); R.pset(X - dir * 2, Y - 1, hex('#f0d070'));
  for (let k = 0; k < 5; k++) { const v = (t * (humea ? 1.8 : 0.7) + k / 5) % 1; const px = X + dir * 2 - dir * v * 7, py = Y - 6 - v * 10; const c = mezcla(hex('#7a7a84'), hex('#e8dcbc'), v);
    if (humea || v < 0.5) { R.disco(px, py, 0.8 + v * 2, c); } }
};
const banderin = (x, y, t, c, k) => { R.linea(x, y, x, y - 12, hex('#5a3a22')); const o = Math.round(Math.sin(t * 6 + k) * 1.2);
  R.poligono([[x + 1, y - 12], [x + 10, y - 9 + o], [x + 1, y - 6]], K); R.poligono([[x + 1, y - 11], [x + 8, y - 9 + o], [x + 1, y - 7]], c); R.pset(x + 2, y - 9, BL); R.pset(x + 3, y - 9, BL); };
const p1 = (t) => {
  const P = T.mapa(R, t, { ...MZ, desde: 'medioeste', u: lin(t, 2.0, 3.3) });
  lupa(70, 62, t);
  const pts = VIA.map((q) => P(q)), L = largos(pts), tot = L[L.length - 1], p = suave(lin(t, via0, via1));
  // las cosas sobre el papel, con su sombra: el balón de 1906, el lápiz y el reloj
  sombra(58, 157, 14, 3, 0.3); T.balon(R, 56, 150, t, { epoca: '1906', s: 1.6, ang: -0.32 });
  lapiz(186, 162); relojBolsillo(262, 144, t);
  R.recorte([24, 18, 296, 166]);
  if (p > 0) { for (let d = 0; d <= tot * p; d += 1) { const [x, y, an] = enCamino(pts, L, d); R.pset(Math.round(x), Math.round(y), TINTA);
    if (Math.round(d) % 4 === 0) { const nx = -Math.sin(an) * 2, ny = Math.cos(an) * 2; R.linea(Math.round(x + nx), Math.round(y + ny), Math.round(x - nx), Math.round(y - ny), TINTA); } }
    tren(pts, L, tot * p, t, p < 1); }
  for (const q of CIUDADES) { const [x, y] = P(q).map(Math.round); R.disco(x, y, 2, TINTA); R.pset(x, y, hex('#e8dcbc')); }
  const [sx, sy] = pts[0], [wx, wy] = pts[pts.length - 1];
  // el círculo de lápiz rojo alrededor de Waukesha, trazado a mano
  const ci = lin(t, pinWK + 0.3, pinWK + 0.9); for (let k = 0; k < 70 * ci; k++) { const an = k / 70 * 7 - 1.4, r = 11 + Math.sin(k * 0.4) * 0.6; R.pset(Math.round(wx + Math.cos(an) * r * 1.3), Math.round(wy - 3 + Math.sin(an) * r), hex('#c83a2a')); }
  T.chincheta(R, Math.round(sx), Math.round(sy), t, AZ, { baja: lin(t, pinSL - 0.3, pinSL), pulso: t > pinSL && t < via0 + 0.4 });
  if (t > pinWK - 0.3) T.chincheta(R, Math.round(wx), Math.round(wy), t, NAR, { baja: lin(t, pinWK - 0.3, pinWK), pulso: t > pinWK });
  if (t > pinWK + 0.15) { const e = lin(t, pinWK + 0.15, pinWK + 0.45); banderin(Math.round(wx) + 6, Math.round(wy) + 2 - Math.round((1 - e) * 4), t, AZ, 0); banderin(Math.round(wx) + 17, Math.round(wy) + 3 - Math.round((1 - e) * 4), t, NAR, 2); }
  R.recorte(null);
  // la mosca pasea por el papel y sale volando cuando llega el tren
  const vu = lin(t, pinWK + 0.2, pinWK + 0.9), m = lin(t, 1.6, 4.0);
  mosca(lerp(lerp(292, 232, m), 340, vu), lerp(lerp(118, 104, m) + Math.round(Math.sin(t * 3) * 2), 150, vu), t, vu > 0 || (t > 2.6 && t < 2.9));
};

// ── 2 · el campo de 1906: el saque y el brazo armado ──────────────────────────────────────────────────────────────
const snap = a(6.45), atras = a(6.95), arma = a(7.55), fwd = a(9.77), choca = a(10.21);
const pelo = (c) => ({ H: hex(c), h: hex(c) });
const ARB = { C: hex('#f2eee2'), c: hex('#c8c0b0'), F: hex('#2a2430') };
const p2 = (t) => {
  T.campo1906(R, t, { animo: 0.2 + 0.7 * lin(t, fwd, fwd + 0.8) });
  const lista = [], emp = lin(t, snap, snap + 0.3), jit = t > snap ? Math.round(Math.sin(t * 11)) : 0;
  // las dos líneas frente a frente sobre la línea de cal del centro (x 160): Saint Louis de azul, Carroll a rayas
  [[136, '#5a3418'], [148, '#2c2232'], [160, '#a8743c']].forEach(([s, H], k) => {
    lista.push([s, () => R.actor(EL.robinson, 142 - k * 2 + Math.round(emp * 3) + (k % 2 ? jit : 0), s, t, { dir: 1, pal: pelo(H), enfado: t > snap })]);
    lista.push([s, () => R.actor(EL.jugador1905, 164 + k * 2 - Math.round(emp * 2) - (k % 2 ? 0 : jit), s, t, { dir: -1, enfado: t > snap, salto: t > choca && t < choca + 0.25 && k !== 1 ? 2 : 0 })]);
  });
  const rb = ruta(t, [[0, 112, 152, 1], [atras, 112, 152, 1], [atras + 0.55, 98, 154, 1]]);
  lista.push([rb.s, () => R.actor(EL.robinson, rb.x, rb.s, t, { dir: 1, anda: rb.mv, dedo: t > arma, sonrisa: t > fwd + 0.3 })]);
  const sc = ruta(t, [[0, 150, 131, 1], [snap + 0.1, 150, 131, 1], [snap + 2.4, 238, 131, 1]]);
  lista.push([sc.s, () => R.actor(EL.schneider, sc.x, sc.s, t, { dir: t > snap + 2.4 ? -1 : 1, anda: sc.mv, dedo: t > fwd - 0.2, habla: t > fwd - 0.2 && Math.sin(t * 8) > 0 })]);
  lista.push([134, () => R.actor(EL.cochems, 196, 134, t, { dir: -1, pal: ARB, habla: t > snap - 0.1 && t < snap + 0.4 })]);
  const df = ruta(t, [[0, 226, 152, -1], [snap + 0.15, 226, 152, -1], [snap + 1.1, 244, 150, -1]]);
  lista.push([df.s, () => R.actor(EL.jugador1905, df.x, df.s, t, { dir: -1, anda: df.mv, pal: pelo('#3a2418'), sorpresa: t > fwd + 0.15 })]);
  lista.push([174, () => R.actor(EL.cochems, 30, 174, t, { dir: 1, habla: t < atras + 0.5 && Math.sin(t * 7) > 0, dedo: t > a(6.91) && t < a(9.2), brazos: t > choca, sonrisa: t > choca })]);
  lista.sort((p, q) => p[0] - q[0]).forEach(([, f]) => f());
  // el balón: en el suelo delante del centro, el pase hacia atrás entre las piernas, en las manos y arriba, armado
  const cx = 142 - 2 + Math.round(emp * 3) + 15, s0 = 148;
  if (t < snap) T.balon(R, cx + 2, s0 - 2, t, { epoca: '1906', s: 1, ang: 0 });
  else if (t < snap + 0.35) { const u = lin(t, snap, snap + 0.35), [bx, by] = parab(u, cx, s0 - 4, rb.x + 12, rb.s - 12, 6); T.balon(R, bx, by, t, { epoca: '1906', s: 1, ang: -0.4, giro: u }); }
  else if (t < arma) T.balon(R, rb.x + 12, rb.s - 12, t, { epoca: '1906', s: 1, ang: -0.2 });
  else { const finta = t > a(10.6) && t < a(10.9) ? 3 : 0; T.balon(R, rb.x + 15 + finta, rb.s - 30, t, { epoca: '1906', s: 1, ang: -0.5 }); }
  // la flecha de tiza hacia delante: el pase adelante, nuevo en 1906
  const fl = lin(t, fwd, fwd + 0.55);
  if (fl > 0) { const x0 = rb.x + 20, y0 = rb.s - 30, x1 = x0 + 130, y1 = y0 - 2, n = Math.round(60 * fl); let last = [x0, y0];
    for (let i = 0; i <= n; i++) { const u = i / 60, [px, py] = parab(u, x0, y0, x1, y1, 22); if (i % 5 < 3) { const X = Math.round(px), Y = Math.round(py); R.rect(X - 1, Y - 2, X + 1, Y + 2, K); R.rect(X - 1, Y - 1, X + 1, Y, BL); } last = [px, py]; }
    if (fl >= 1) { const [hx, hy] = last; const X = Math.round(hx), Y = Math.round(hy); R.poligono([[X + 7, Y + 1], [X - 4, Y - 7], [X - 4, Y + 9]], K); R.poligono([[X + 5, Y + 1], [X - 3, Y - 5], [X - 3, Y + 7]], BL); } }
  if (t > fwd + 0.2) R.bocadillo(df.x + 7, df.s - 28, { icono: '?' });
};

// ── 3 · la grada de frente: el público de bombín, el magnesio y el pase que cae ─────────────────────────────────────
const CIELO3 = ['#4a78cc', '#5a88d6', '#6e9ade', '#86ace4', '#a2c2ec'].map(hex), SKY3 = new Uint8Array(57600);
const BANCOS = [58, 70, 82, 94, 106], POSTES = [2, 68, 134, 200, 266];
const gradaFija = fijo(() => {
  const P = R.pset;
  degradado(0, 0, 319, 70, CIELO3);
  // a lo lejos, a la derecha: la arboleda y el tejado de una granja
  for (let x = 274; x < 320; x++) { const y0 = 92 + Math.round(Math.sin(x * 0.3) * 2 + hh(x, 3) * 2); for (let y = y0; y < 122; y++) P(x, y, (y - y0 < 2) ? hex('#5a8a54') : umbral(x, y) < 0.5 ? hex('#3e6a42') : hex('#467448')); }
  // el tejado de tejuelas de la grada (x 0–274)
  for (let y = 21; y <= 35; y++) { const fila = Math.floor((y - 21) / 3); for (let x = 0; x <= 274; x++) { let c = fila % 2 ? hex('#8a3a2a') : hex('#7e3426');
    if ((y - 21) % 3 === 0) c = hex('#a8503a'); else if ((x + fila * 3) % 7 === 0) c = hex('#5a2218'); else if (hh(x, y, 4) < 0.06) c = hex('#9a4a34'); P(x, y, c); } }
  R.rect(0, 20, 274, 20, K);
  // el frontón blanco con la cenefa de festón
  R.rect(0, 36, 274, 39, hex('#e8e2d2')); R.rect(0, 36, 274, 36, hex('#fbf8ee')); R.rect(0, 40, 274, 40, hex('#a8a090'));
  for (let x = 0; x <= 274; x++) { const k = x % 6; if (k > 0 && k < 5) P(x, 41, hex('#d8d0c0')); if (k > 1 && k < 4) P(x, 42, hex('#d8d0c0')); if (x % 12 === 6) P(x, 38, hex('#b8b0a0')); }
  // el fondo de la grada: tablas oscuras, más en sombra arriba
  for (let y = 41; y <= 112; y++) for (let x = 0; x <= 274; x++) { let c = x % 9 === 0 ? hex('#2a1c14') : hex('#3e2c20'); if (y < 52) c = mezcla(c, hex('#1a100a'), (52 - y) / 14); if (hh(x >> 1, y, 5) < 0.04) c = hex('#4a3626'); if (R.pget(x, y) === hex('#d8d0c0')) continue; P(x, y, c); }
  // el murete de delante de la grada
  for (let y = 112; y <= 120; y++) for (let x = 0; x <= 274; x++) P(x, y, y === 112 ? hex('#b8845a') : y < 116 ? (hh(x >> 3, 1, 6) < 0.5 ? hex('#8a5a36') : hex('#825432')) : (hh(x >> 3, 2, 6) < 0.5 ? hex('#6e4628') : hex('#684224')));
  for (let x = 4; x <= 274; x += 16) { P(x, 114, K); P(x, 118, K); } R.rect(0, 116, 274, 116, hex('#5a3a20'));
  // el roble de la derecha (sin tapar la zona de Atom)
  for (let y = 62; y < 124; y++) for (let x = 290; x < 303; x++) P(x, y, x < 293 ? hex('#3a2416') : x > 299 ? hex('#2a1a10') : (hh(x, y >> 1, 7) < 0.3 ? hex('#4a3020') : hex('#5a3a26')));
  for (const [bx, by, r] of [[300, 70, 18], [282, 80, 12], [314, 86, 11], [296, 88, 10]]) R.disco(bx, by, r, (x, y, d) => d > 0.8 && umbral(x, y) < 0.5 ? hex('#2e5a2e') : (y - by) < -r * 0.3 && hh(x, y, 8) < 0.6 ? hex('#5a9a48') : hh(x, y, 9) < 0.3 ? hex('#3a6e36') : hex('#4a8040'));
  // la hierba delante: segada a franjas, matas, calvas, la línea de banda y las marcas de yarda
  for (let y = 121; y < 180; y++) for (let x = 0; x < 320; x++) { const franja = Math.floor((x + (y - 121) * 0.25) / 48) % 2; let c = franja ? hex('#5a9a46') : hex('#4e8e3c');
    const r = hh(x, y, 10); if (r < 0.08) c = hex('#3e7a32'); else if (r > 0.94) c = hex('#72b056'); P(x, y, c); }
  for (const [cx, cy, rx, ry] of [[96, 156, 15, 4], [214, 172, 18, 4], [168, 146, 8, 2]]) for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) if ((x * x) / (rx * rx) + (y * y) / (ry * ry) < 1 - hh(x, y, 11) * 0.3) P(cx + x, cy + y, umbral(cx + x, cy + y) < 0.5 ? hex('#8a7048') : hex('#9a805a'));
  for (let x = 0; x < 320; x++) if (hh(x >> 2, 9, 12) > 0.08) { P(x, 130, hex('#f2f2ea')); P(x, 131, hex('#d8dccc')); }
  for (let x = 20; x < 320; x += 44) { P(x, 138, hex('#e8ecdc')); P(x, 139, hex('#e8ecdc')); P(x, 140, hex('#e8ecdc')); }
  // la cuerda con sus estacas
  for (let k = 0; k * 44 + 10 < 320; k++) { const x = k * 44 + 10; R.rect(x, 116, x + 1, 126, hex('#6a4a2a')); P(x, 116, hex('#9a7048')); }
  for (let x = 10; x < 318; x++) { const f = ((x - 10) % 44) / 44, y = 118 + Math.round(Math.sin(f * Math.PI) * 2); P(x, y, hex('#e8dcc0')); P(x, y + 1, hex('#8a7a5a')); }
  // el banco del equipo con los jerséis colgados y una manta; el cubo del agua con su cazo
  R.rect(58, 140, 120, 142, hex('#9a6a40')); R.rect(58, 143, 120, 143, hex('#6a4426')); for (const x of [62, 116]) R.rect(x, 144, x + 2, 152, hex('#5a3a22'));
  for (const [x, c] of [[66, '#2a4a8a'], [80, '#2a4a8a'], [100, '#8a6a4a']]) { R.rect(x, 137, x + 9, 147, K); R.rect(x + 1, 138, x + 8, 146, hex(c)); if (c === '#2a4a8a') R.rect(x + 1, 141, x + 8, 141, BL); }
  R.rect(30, 150, 42, 163, K); R.rect(31, 151, 41, 162, hex('#8a5a32')); R.rect(31, 153, 41, 153, hex('#5a5a62')); R.rect(31, 159, 41, 159, hex('#5a5a62')); R.rect(31, 151, 41, 151, hex('#6aa0c8')); R.linea(40, 150, 46, 142, hex('#8a8a92'));
  // la cámara de cajón sobre su trípode, con el paño negro
  R.linea(256, 134, 244, 163, K); R.linea(256, 134, 256, 165, K); R.linea(256, 134, 268, 163, K); R.linea(257, 134, 245, 163, hex('#7a5a3a')); R.linea(257, 134, 269, 163, hex('#7a5a3a'));
  R.rect(246, 121, 264, 135, K); R.rect(247, 122, 263, 134, hex('#7a4a24')); R.rect(247, 122, 263, 123, hex('#a06a3a')); R.disco(247, 128, 4, K); R.disco(247, 128, 3, hex('#c8a040')); R.disco(246, 128, 1.5, hex('#2a3046'));
  R.poligono([[262, 122], [272, 126], [270, 142], [262, 138]], hex('#1c1820')); R.linea(264, 124, 268, 138, hex('#3a3440'));
  // la bocina sobre el banco, los programas tirados en la hierba y las cáscaras de cacahuete
  R.poligono([[104, 134], [118, 130], [118, 139]], K); R.poligono([[105, 134], [117, 131], [117, 138]], hex('#c8a040')); R.rect(102, 133, 105, 135, hex('#8a6a20'));
  for (const [x, y, k] of [[150, 166, 0], [228, 150, 1], [40, 172, 2], [190, 140, 3]]) { R.poligono([[x, y], [x + 7, y - 1 - k % 2], [x + 8, y + 3], [x + 1, y + 4]], hex('#e8e2d2')); R.linea(x + 2, y + 1, x + 6, y + 1, hex('#8a8a92')); R.linea(x + 2, y + 2, x + 5, y + 2, hex('#b83a2a')); }
  for (let k = 0; k < 24; k++) { const x = 20 + Math.round(hh(k, 1, 14) * 240), y = 124 + Math.round(hh(k, 2, 14) * 8); P(x, y, hex('#c89a5a')); P(x + 1, y, hex('#a87a40')); }
  for (let i = 0; i < 57600; i++) SKY3[i] = CIELO3.includes(R.buf[i]) ? 1 : 0;
});
const ROPA = ['#2a2430', '#3a3446', '#4a3a2a', '#2e3a4a', '#5a4a3a', '#3a2a2a'].map(hex), BLUSA = ['#f2eee2', '#e8d0d8', '#d8e0f0', '#e8e0c0'].map(hex), PELO = ['#3a2418', '#6a4a2a', '#1c1424', '#a8743c', '#8c8ca0'];
const SOMBRERO = ['#c8a0c8', '#e8d090', '#a8c8e8', '#f0e8e0'].map(hex);
const publico = (t, animo) => {
  BANCOS.forEach((yb, r) => {
    for (let c = 0; ; c++) { const x = 4 + c * 11 + (r % 2) * 5; if (x > 264) break; if (hh(c, r, 7) < 0.1) continue;
      const v = hh(c, r, 8), tipo = v < 0.45 ? 'calvo' : v < 0.72 ? 'rizos' : 'mujer', k = c * 7 + r * 13;
      const rie = animo > 0.3 && hh(c, r, 9) < animo + 0.2, saluda = hh(c, r, 10) < animo * 0.4 && Math.sin(t * 3 + c) > -0.2;
      const y = yb - 11 - (rie && Math.sin(t * 8 + c * 1.3) > 0.6 ? 1 : 0);
      const pal = T.tela(tipo === 'mujer' ? '' + ['#f2eee2', '#e8d0d8', '#d8e0f0', '#e8e0c0'][k % 4] : ['#2a2430', '#3a3446', '#4a3a2a', '#2e3a4a', '#5a4a3a', '#3a2a2a'][k % 6], '#1c1820', { H: PELO[k % 5], W: PELO[(k + 2) % 5], V: PELO[k % 5] });
      R.busto(tipo, pal, x, y, t, { rie, saluda });
      const lev = saluda ? 2 : 0;
      if (tipo === 'calvo' || (tipo === 'rizos' && k % 3)) { R.rect(x + 2, y - 2 - lev, x + 6, y - lev, hex('#1c1820')); R.pset(x + 3, y - 2 - lev, hex('#4a4450')); R.rect(x + 1, y + 1 - lev, x + 7, y + 1 - lev, hex('#1c1820')); }
      else if (tipo === 'rizos') { R.rect(x + 2, y - 1 - lev, x + 6, y - lev, hex('#e8cc80')); R.rect(x + 2, y - lev, x + 6, y - lev, hex('#8a2a2a')); R.rect(x, y + 1 - lev, x + 8, y + 1 - lev, hex('#d8b868')); }
      else { const sc = SOMBRERO[k % 4]; R.rect(x - 1, y + 1, x + 9, y + 2, sc); R.rect(x + 2, y - 1, x + 6, y, sc); R.pset(x + 6, y - 1, hex('#d84a6a')); R.pset(x + 7, y, hex('#f8a0b0')); }
    }
    R.rect(0, yb, 274, yb, hex('#9a7048')); R.rect(0, yb + 1, 274, yb + 1, hex('#5a3a22'));
  });
  for (const px of POSTES) { R.rect(px - 1, 40, px + 5, 118, K); R.rect(px, 40, px + 4, 118, hex('#e8e2d2')); R.rect(px + 3, 40, px + 4, 118, hex('#b8b0a0')); R.linea(px - 8, 42, px, 50, hex('#e8e2d2')); R.linea(px + 12, 42, px + 4, 50, hex('#e8e2d2')); }
  // los banderines de tres colores bajo el frontón, que ondean
  for (let x = 0; x < 272; x += 8) { const o = Math.round(Math.sin(t * 3 + x * 0.09)), c = [hex('#c83a2a'), BL, AZ][(x / 8) % 3];
    R.poligono([[x, 43], [x + 6, 43], [x + 3 + o, 49]], c); R.pset(x + 3 + o, 49, K); }
  R.linea(0, 43, 274, 43, hex('#6a5a4a'));
};
// el perro de la banda (trota, se sienta, ladra), de perfil
const perro = (x, y, t, dir, corre, ladra) => { x = Math.round(x); y = Math.round(y); const X = (i) => x + dir * i, f = corre ? Math.floor(t * 10) % 2 : 0, M = hex('#a8743c'), m = hex('#7a4a24');
  sombra(x, y + 1, 7, 1, 0.3);
  for (let i = -4; i <= 4; i++) { R.pset(X(i), y - 6, K); R.pset(X(i), y - 2, K); for (let j = -5; j <= -3; j++) R.pset(X(i), y + j, j === -5 ? hex('#c8925a') : M); }
  R.rect(Math.min(X(4), X(8)), y - 10, Math.max(X(4), X(8)), y - 6, K); R.rect(Math.min(X(5), X(7)), y - 9, Math.max(X(5), X(7)), y - 7, M); R.pset(X(9), y - 7, K); R.pset(X(7), y - 9, K); R.pset(X(5), y - 11, m); R.pset(X(4), y - 10, m);
  if (ladra) R.pset(X(9), y - 6, hex('#d84a4a'));
  const col = Math.round(Math.sin(t * (corre ? 16 : 9)) * 1.5); R.pset(X(-5), y - 6 + col, M); R.pset(X(-6), y - 7 + col, M);
  for (const [i, o] of [[-3, f], [-1, 1 - f], [2, f], [4, 1 - f]]) { R.pset(X(i) + (corre ? o * dir : 0), y - 1, m); R.pset(X(i) + (corre ? o * dir : 0), y, K); }
};
const cae = a(14.96), suelo3 = a(15.44), coge = a(16.04), flash = a(13.27);
const p3 = (t) => {
  gradaFija();
  const ok = (x, y) => SKY3[y * 320 + x] === 1;
  for (const [x0, y, w, v, c] of [[20, 10, 36, 1.4, 0], [150, 6, 46, 0.8, 1], [260, 52, 24, 2.2, 2]]) nubeM(((x0 + t * v) % 380) - 30, y, w, ['#c8d4e4', '#eef2f8', '#ffffff'].map(hex), ok);
  for (let k = 0; k < 3; k++) { const x = ((k * 97 + t * 16) % 360) - 20, y = 10 + k * 3 + Math.sin(t * 2 + k) * 2; if (ok(Math.round(cl(x, 0, 319)), Math.round(y))) pajaro(x, y, t, k, hex('#3a3a46')); }
  const animo = t < suelo3 ? 0.45 + 0.3 * lin(t, flash, flash + 0.4) - 0.3 * lin(t, flash + 0.6, flash + 1.4) : 0.05 + 0.15 * lin(t, coge + 0.8, coge + 1.6);
  publico(t, animo);
  // el vendedor de cacahuetes pasa por delante de la grada; se para con el fogonazo
  const ve = ruta(t, [[P3, 4, 128, 1], [flash - 0.2, 96, 128, 1], [flash + 0.7, 96, 128, 1], [P4, 196, 128, 1]]);
  R.actor(EL.obrero, ve.x, ve.s, t, { dir: 1, anda: ve.mv, sorpresa: t > flash && t < flash + 0.7, pal: { C: hex('#f2eee2'), c: hex('#c8c0b0') } });
  R.rect(ve.x + 11, ve.s - 14, ve.x + 21, ve.s - 12, K); R.rect(ve.x + 12, ve.s - 15, ve.x + 20, ve.s - 13, hex('#c89a5a')); for (let i = 0; i < 4; i++) R.pset(ve.x + 13 + i * 2, ve.s - 16, hex('#e8d0a0'));
  // los reservas de Saint Louis junto al banco: aplauden, se lamentan con el balón perdido y uno lo señala
  for (const [x, H, k] of [[70, '#5a3418', 0], [94, '#a8743c', 1]]) R.actor(EL.robinson, x, 153, t, { dir: 1, pal: pelo(H), habla: t < suelo3 && Math.sin(t * 6 + k * 2) > 0.3, sonrisa: t < suelo3, triste: t > suelo3 + 0.2, dedo: k === 1 && t > suelo3 + 0.1 && t < coge + 0.6, sorpresa: t > suelo3 && t < suelo3 + 0.3 });
  // el fotógrafo detrás de la cámara, con la bandeja de magnesio en alto
  R.actor(EL.periodista, 270, 166, t, { dir: -1, dedo: t > flash - 1.2 && t < flash + 0.8, sorpresa: t > flash && t < flash + 0.5 });
  if (t > flash - 1.2 && t < flash + 0.8) { R.rect(262, 133, 274, 134, K); R.rect(263, 132, 273, 132, hex('#8a8a92')); R.linea(268, 134, 270, 138, K); }
  // el balón que cae delante de la grada, bota torcido y se queda; el rival lo recoge y se lo lleva
  const rv = ruta(t, [[coge - 0.6, 340, 162, -1], [coge, 192, 162, -1], [coge + 0.3, 192, 162, -1], [P4, 340, 176, 1]]);
  const rb = ruta(t, [[cae, -24, 168, 1], [coge + 0.2, 116, 168, 1], [P4, 124, 168, 1]]);
  let bx = null, by = 0, ang = 0;
  if (t > cae && t < suelo3) { const u = lin(t, cae, suelo3); bx = lerp(-10, 150, u); by = lerp(70, 156, u * u); ang = 0.5 + u * 2; }
  else if (t >= suelo3 && t < coge + 0.15) { const u = lin(t, suelo3, suelo3 + 0.45), w = lin(t, suelo3 + 0.45, suelo3 + 0.65);
    bx = lerp(150, 176, u) + lerp(0, 10, w); by = 156 - 16 * 4 * u * (1 - u) - 4 * 4 * w * (1 - w); ang = 2.5 + u * 3 + w + Math.sin(t * 12) * 0.2 * (1 - lin(t, suelo3 + 0.65, coge)); bx = Math.min(bx, 188); }
  else if (t >= coge + 0.15 && rv.x < 330) { bx = rv.x + 2; by = rv.s - 12; ang = 0.3; }
  if (t > coge - 0.6) R.actor(EL.jugador1905, rv.x, rv.s, t, { dir: rv.d, anda: rv.mv, sonrisa: t > coge + 0.2 });
  if (t > cae) R.actor(EL.robinson, rb.x, rb.s, t, { dir: 1, anda: rb.mv, triste: t > coge + 0.3, sorpresa: t > suelo3 && t < coge + 0.3 });
  // el perro del cubo: se levanta, ladra al bote y sigue al rival
  const pg = ruta(t, [[suelo3 + 0.1, 52, 162, 1], [coge + 0.1, 150, 164, 1], [P4, 330, 166, 1]]);
  perro(pg.x, pg.s, t, 1, pg.mv, t > suelo3 + 0.1 && t < suelo3 + 0.7 && Math.sin(t * 20) > 0);
  if (bx !== null) { sombra(Math.round(bx), 160, 6, 1, 0.3 * lin(by, 110, 156)); T.balon(R, bx, by, t, { epoca: '1906', s: 1.2, ang }); }
  if (t > suelo3 && t < coge + 0.4) { const e = lin(t, suelo3, suelo3 + 0.15); R.icono('X', 176 - 5, 128 - Math.round(e * 4), hex('#d83a2a'), K, 2); }
  // el fogonazo del magnesio y su humo, que sube
  // la hierba alta de delante, que se mece
  for (let k = 0; k < 46; k++) { const x = k * 7 + Math.round(hh(k, 1, 13) * 5), h0 = 4 + Math.round(hh(k, 2, 13) * 4); for (let b = 0; b < 3; b++) { const o = Math.round(Math.sin(t * 2.2 + k * 0.7 + b) * 1.5); R.linea(x + b * 2, 179, x + b * 2 + o, 179 - h0 + b, b === 1 ? hex('#72b056') : hex('#3e7a32')); } }
  if (t > flash && t < flash + 0.18) { const r = 4 + (t - flash) * 70; R.disco(268, 128, r + 3, hex('#fff4c0')); R.disco(268, 128, r, hex('#ffffff')); T.tinte(R, 0, 179, [255, 250, 230], 0.45 * (1 - (t - flash) / 0.18)); }
  if (t > flash) for (let k = 0; k < 6; k++) { const v = lin(t, flash + k * 0.08, flash + 1.8 + k * 0.08); if (v <= 0 || v >= 1) continue; const px = 268 + Math.sin(k * 2.1) * 6 + v * 10, py = 126 - v * 50 - k * 2; for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { const d = Math.hypot(i, j) / (3 + v * 5); if (d < 1) tine(px + i * (1 + v), py + j, hex('#e8e4dc'), 0.55 * (1 - v) * (1 - d)); } }
};

// ── 4 · travelling: el pase de veinte yardas a Schneider ─────────────────────────────────────────────────────────────
const CAM = 130, T0 = a(18.15), T1 = a(20.5), YARDA = 11, LINEA0 = 85;
const WF = 320 + Math.ceil(CAM * 0.35) + 2, WM = 320 + Math.ceil(CAM * 0.7) + 2, WN = 320 + CAM + 2;
const capa = (ancho, pinta) => { const out = new Uint32Array(ancho * 180); for (let ox = 0; ox < ancho; ox += 320) { const b = R.nuevo(), prev = R.usar(b); pinta(ox); R.usar(prev);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320 && ox + x < ancho; x++) out[y * ancho + ox + x] = b[y * 320 + x]; } return out; };
const pon = (L, ancho, off, y0, y1) => { const B = R.buf, o = Math.max(0, Math.round(off)); for (let y = y0; y <= y1; y++) { const r = y * ancho + o, d = y * 320; for (let x = 0; x < 320; x++) { const c = L[r + x]; if (c) B[d + x] = c; } } };
const CIELO4 = ['#4a78cc', '#5a88d6', '#70a0e0', '#8cb6ea', '#aacaf0', '#c8dcf2'].map(hex);
const cielo4 = fijo(() => degradado(0, 0, 319, 100, CIELO4));
let F4 = null, M4 = null, N4 = null;
const LX = (k, y) => LINEA0 + k * 5 * YARDA + (y - 104) * 0.16;
const prepara4 = () => {
  F4 = capa(WF, (ox) => { const X = (x) => x - ox, P = R.pset;
    for (let wx = ox; wx < ox + 320; wx++) { const x = X(wx), yh = Math.round(72 + 5 * Math.sin(wx * 0.021) + 3 * Math.sin(wx * 0.05 + 1)); for (let y = yh; y <= 100; y++) P(x, y, y === yh ? hex('#8aa880') : umbral(x, y) < 0.35 ? hex('#5e7e60') : hex('#6a8a6a')); }
    for (let wx = 0; wx < WF; wx += 7) { const r = 4 + Math.round(hh(wx, 1, 20) * 4), cy = 80 + Math.round(hh(wx, 2, 20) * 4); R.disco(X(wx), cy, r, (x, y, d) => d > 0.75 && umbral(x, y) < 0.5 ? hex('#2e5232') : (y < cy - r * 0.3 ? hex('#5a8a4a') : hex('#3e6a3e'))); }
    // el pueblo: el granero rojo, la iglesia con su aguja, el depósito del agua y las casas blancas
    const gx = X(60); R.rect(gx, 66, gx + 24, 84, K); R.rect(gx + 1, 67, gx + 23, 84, hex('#a83a2a')); for (let i = 1; i < 23; i += 3) R.rect(gx + i, 67, gx + i, 84, hex('#8a2e22')); R.poligono([[gx - 2, 67], [gx + 4, 58], [gx + 20, 58], [gx + 26, 67]], hex('#4a4a52')); R.rect(gx + 9, 74, gx + 15, 84, hex('#f2eee2')); R.linea(gx + 9, 74, gx + 15, 84, hex('#a83a2a')); R.linea(gx + 15, 74, gx + 9, 84, hex('#a83a2a'));
    const ix = X(150); R.rect(ix - 1, 61, ix + 13, 84, K); R.rect(ix, 62, ix + 12, 84, hex('#e8e2d2')); R.rect(ix + 9, 62, ix + 12, 84, hex('#c8c0b0')); R.rect(ix + 4, 70, ix + 7, 76, hex('#6a8ac8')); R.rect(ix + 3, 50, ix + 9, 62, hex('#f2eee2')); R.rect(ix + 3, 50, ix + 3, 62, K); R.rect(ix + 9, 50, ix + 9, 62, K); R.poligono([[ix + 3, 50], [ix + 6, 36], [ix + 9, 50]], hex('#4a4a52')); R.pset(ix + 6, 35, hex('#c8a040')); R.rect(ix + 5, 54, ix + 7, 57, hex('#3a3a46'));
    const dx = X(232); for (const i of [0, 4, 8, 12]) R.linea(dx + i, 82, dx + 4 + i * 0.5, 58, hex('#5a4a3a')); R.rect(dx, 46, dx + 16, 58, K); R.rect(dx + 1, 47, dx + 15, 57, hex('#8a6a4a')); for (let i = 2; i < 15; i += 3) R.rect(dx + i, 47, dx + i, 57, hex('#6a4e36')); R.poligono([[dx - 1, 47], [dx + 8, 40], [dx + 17, 47]], hex('#5a5a62'));
    for (const [hx0, c] of [[270, '#f2eee2'], [300, '#e8dcc0'], [338, '#f2eee2'], [372, '#d8c8b0']]) { const hx = X(hx0); R.rect(hx, 68, hx + 18, 84, K); R.rect(hx + 1, 69, hx + 17, 84, hex(c)); R.poligono([[hx - 2, 69], [hx + 9, 59], [hx + 20, 69]], hex('#4a3a3a')); R.rect(hx + 4, 72, hx + 7, 76, hex('#4a6a9a')); R.rect(hx + 11, 72, hx + 14, 76, hex('#4a6a9a')); R.rect(hx + 14, 58, hx + 16, 63, hex('#6a3a2a')); }
  });
  M4 = capa(WM, (ox) => { const X = (x) => x - ox, P = R.pset;
    for (let wx = ox; wx < ox + 320; wx++) { const x = X(wx), f = (wx % 30) / 30, y = 99 + Math.round(Math.sin(f * Math.PI) * 2); P(x, y, hex('#e8dcc0')); P(x, y + 1, hex('#8a7a5a')); if (wx % 30 === 0) { R.rect(x, 94, x + 1, 104, hex('#6a4a2a')); P(x, 94, hex('#9a7048')); } }
    // los coches de caballos aparcados (por delante del público)
    for (const bx0 of [44, 330]) { const bx = X(bx0); R.caballo(bx - 30, 104, 0, { dir: 1 }); R.rect(bx, 86, bx + 20, 96, K); R.rect(bx + 1, 87, bx + 19, 95, hex('#2a2430')); R.rect(bx - 1, 84, bx + 21, 86, hex('#1c1820')); R.rect(bx + 2, 89, bx + 8, 93, hex('#4a4456'));
      for (const wx2 of [bx + 3, bx + 17]) { R.disco(wx2, 99, 5, K); R.disco(wx2, 99, 4, hex('#8a2a2a')); R.disco(wx2, 99, 2, K); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283; R.pset(Math.round(wx2 + Math.cos(an) * 3), Math.round(99 + Math.sin(an) * 3), hex('#c8a060')); } } }
  });
  N4 = capa(WN, (ox) => { const X = (x) => x - ox, P = R.pset;
    for (let y = 100; y < 180; y++) for (let wx = ox; wx < ox + 320; wx++) { const x = X(wx), franja = Math.floor((wx + (y - 100) * 0.3) / 40) % 2; let c = y < 103 ? hex('#5e9a4a') : franja ? hex('#5a9a46') : hex('#4e8e3c'); const r = hh(wx, y, 21);
      if (r < 0.07) c = hex('#3e7a32'); else if (r > 0.95) c = hex('#74b058'); else if (y > 140 && r > 0.9 && (y & 1)) c = hex('#66a64e'); P(x, y, c); }
    for (const [cx, cy, rx, ry] of [[150, 134, 14, 3], [330, 166, 20, 4], [60, 172, 16, 4], [250, 118, 10, 2], [420, 140, 12, 3]]) for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) if ((x * x) / (rx * rx) + (y * y) / (ry * ry) < 1 - hh(x, y, 22) * 0.35) P(X(cx + x), cy + y, umbral(cx + x, cy + y) < 0.5 ? hex('#8a7048') : hex('#9a805a'));
    for (let wx = ox; wx < ox + 320; wx++) if (hh(wx >> 2, 3, 23) > 0.06) { P(X(wx), 103, hex('#f2f2ea')); P(X(wx), 104, hex('#d8dccc')); }
    for (let k = -2; k <= 7; k++) for (let y = 105; y < 180; y++) { const x = Math.round(LX(k, y)); if (hh(k, y >> 1, 24) < 0.1) continue; P(X(x), y, hex('#f2f2ea')); P(X(x + 1), y, y > 140 ? hex('#f2f2ea') : hex('#d8dccc')); }
    for (let k = -2; k <= 30; k++) { const x = LINEA0 + k * YARDA; P(X(x + 6), 108, hex('#e8ecdc')); P(X(x + 6), 109, hex('#e8ecdc')); }
    for (let k = 0; k < 260; k++) { const wx = Math.round(hh(k, 1, 26) * (WN - 4)), y = 108 + Math.round(hh(k, 2, 26) * 70), hb = 2 + Math.round((y - 100) / 26) + Math.round(hh(k, 3, 26) * 2); if (wx < ox - 4 || wx > ox + 324) continue;
      for (let b = -1; b <= 1; b++) R.linea(X(wx + b * 2), y, X(wx + b * 3), y - hb - (b === 0 ? 1 : 0), b === 0 ? hex('#78b45a') : hex('#3a7030')); }
    for (let k = 0; k < 50; k++) { const wx = Math.round(hh(k, 4, 27) * (WN - 4)), y = 112 + Math.round(hh(k, 5, 27) * 64); if (wx < ox - 4 || wx > ox + 324) continue; R.rect(X(wx), y, X(wx) + 2, y, hex('#6a5034')); R.pset(X(wx) + 1, y - 1, hex('#8a6a44')); }
    R.rect(X(14), 150, X(26), 164, K); R.rect(X(15), 151, X(25), 163, hex('#8a5a32')); R.rect(X(15), 154, X(25), 154, hex('#5a5a62')); R.rect(X(15), 151, X(25), 151, hex('#6aa0c8'));
  });
};
const figura = (x, y, k, t, salta) => { const j = salta ? Math.round(Math.abs(Math.sin(t * 9 + k)) * 2) : 0; y -= j; x = Math.round(x);
  const dama = k % 4 === 1, ropa = ROPA[k % 6], piel = [hex('#f6c290'), hex('#e0a878'), hex('#a8704a')][k % 3];
  if (dama) { R.rect(x - 2, y - 6, x + 4, y, K); R.rect(x - 1, y - 6, x + 3, y, BLUSA[k % 4]); R.rect(x - 1, y - 8, x + 3, y - 6, BLUSA[(k + 1) % 4]); }
  else { R.pset(x, y, K); R.pset(x, y - 1, K); R.pset(x + 2, y, K); R.pset(x + 2, y - 1, K); R.rect(x - 1, y - 8, x + 3, y - 2, ropa); R.pset(x + 1, y - 8, BL); }
  R.rect(x, y - 11, x + 2, y - 9, piel);
  const lev = salta ? 2 : 0;
  if (dama) { R.rect(x - 2, y - 11, x + 4, y - 11, SOMBRERO[k % 4]); R.rect(x, y - 12, x + 2, y - 12, SOMBRERO[k % 4]); if (k % 8 === 1) { R.rect(x - 3, y - 16, x + 5, y - 15, hex('#f2eee2')); R.linea(x + 1, y - 15, x + 1, y - 9, K); } }
  else if (k % 3 === 0) { R.rect(x - 1, y - 12 - lev, x + 3, y - 12 - lev, hex('#d8b868')); R.rect(x, y - 13 - lev, x + 2, y - 13 - lev, hex('#e8cc80')); }
  else { R.rect(x - 1, y - 12 - lev, x + 3, y - 12 - lev, hex('#1c1820')); R.rect(x, y - 14 - lev, x + 2, y - 13 - lev, hex('#1c1820')); }
  if (salta) { R.pset(x - 2, y - 10 - j % 2, piel); R.pset(x + 4, y - 10 - (j + 1) % 2, piel); }
};
const p4 = (t) => {
  if (!F4) prepara4();
  const cam = CAM * suave(lin(t, T0 + 0.1, T1 + 0.15));
  cielo4();
  for (const [x0, y, w, v, k] of [[30, 16, 46, 0.5, 0], [200, 8, 58, 0.5, 0], [120, 36, 30, 1.2, 1], [330, 30, 34, 1.2, 1], [70, 56, 20, 2.2, 2], [250, 62, 18, 2.2, 2], [170, 50, 16, 2.2, 2]]) { const x = ((x0 - cam * (0.08 + k * 0.06) + t * v) % 420 + 420) % 420 - 50; nubeM(x, y, w, k === 0 ? ['#b8c8dc', '#e4ecf6', '#ffffff'].map(hex) : ['#c8d4e4', '#eef2f8', '#ffffff'].map(hex), (px, py) => py < 96); }
  for (let k = 0; k < 4; k++) { const x = ((k * 83 + t * 18 - cam * 0.2) % 340 + 340) % 340 - 10, y = 26 + k * 6 + Math.sin(t * 2 + k) * 2; if (!(x > 270 && y < 46)) pajaro(x, y, t, k, hex('#3a3a46')); }
  pon(F4, WF, cam * 0.35, 30, 100);
  // el humo de las chimeneas del pueblo
  for (const hx0 of [270, 300, 338]) { const hx = hx0 + 15 - cam * 0.35; for (let k = 0; k < 4; k++) { const v = (t * 0.5 + k / 4) % 1; tine(hx + v * 8, 56 - v * 14, hex('#e8e8ee'), 0.6 * (1 - v)); tine(hx + v * 8 + 1, 56 - v * 14, hex('#e8e8ee'), 0.4 * (1 - v)); } }
  // el público de pie tras la cuerda, al otro lado del campo (salta y agita los sombreros con la recepción)
  const salta = t > T1 + 0.1;
  for (let k = 0; k < 58; k++) { const wx = 4 + k * 8 + Math.round(hh(k, 1, 25) * 4); if ((wx > 10 && wx < 76) || (wx > 296 && wx < 356)) continue; const x = wx - cam * 0.7; if (x < -6 || x > 326) continue; figura(x, 98 + (k % 2) * 2, k, t, salta && hh(k, 2, 25) < 0.8); }
  pon(M4, WM, cam * 0.7, 80, 106);
  pon(N4, WN, cam, 100, 179);
  const S = (wx) => wx - cam;
  // los números de las yardas aparecen cuando el balón pasa por encima de cada línea
  const u = lin(t, T0, T1), RH = [85, 131], SH = [299, 118], [bwx, bwy] = parab(u, RH[0], RH[1], SH[0], SH[1], 64);
  for (let k = 1; k <= 4; k++) { const lx = LX(k, 120); if (t > T0 && bwx >= lx) { const e = lin(t, T0 + (lx - RH[0]) / (SH[0] - RH[0]) * (T1 - T0), T0 + (lx - RH[0]) / (SH[0] - RH[0]) * (T1 - T0) + 0.25); R.numero(String(k * 5), Math.round(S(lx)) + 2, 126 - Math.round(e * 4), { centro: true }); } }
  const lista = [];
  // los bloqueos delante de Robinson
  for (const [wx, s, k] of [[112, 150, 0], [118, 168, 1]]) { const j = Math.round(Math.sin(t * 10 + k)); lista.push([s, () => R.actor(EL.robinson, Math.round(S(wx + j)), s, t, { dir: 1, enfado: true, pal: pelo(k ? '#5a3418' : '#a8743c') })]); lista.push([s, () => R.actor(EL.jugador1905, Math.round(S(wx + 13 - j)), s, t, { dir: -1, enfado: true })]); }
  lista.push([160, () => R.actor(EL.robinson, Math.round(S(70)), 160, t, { dir: 1, dedo: t < T0, sonrisa: t > T0 + 0.3 })]);
  const sc = ruta(t, [[P4, 250, 146, 1], [T1 - 0.5, 292, 146, 1], [T1 + 0.25, 292, 146, -1], [FIN, 352, 147, 1]]);
  lista.push([146, () => R.actor(EL.schneider, Math.round(S(sc.x)), sc.s, t, { dir: t > T1 - 0.5 && t < T1 + 0.25 ? -1 : 1, anda: sc.mv, brazos: t > T1 - 0.45 && t < T1 + 0.2, sonrisa: t > T1, habla: t > T1 + 0.5 && Math.sin(t * 8) > 0 })]);
  const df = ruta(t, [[P4, 410, 162, -1], [T1 + 0.3, 330, 156, -1], [FIN, 334, 158, -1]]);
  lista.push([df.s, () => R.actor(EL.jugador1905, Math.round(S(df.x)), df.s, t, { dir: -1, anda: df.mv, salto: t > T1 + 0.3 && t < T1 + 0.65 ? Math.round(4 * Math.sin(lin(t, T1 + 0.3, T1 + 0.65) * Math.PI)) : 0, sorpresa: t > T1 + 0.3, triste: t > T1 + 1 })]);
  lista.sort((p, q) => p[0] - q[0]).forEach(([, f]) => f());
  // el balón: armado en la mano de Robinson, el vuelo en espiral con su sombra, y en el pecho de Schneider
  if (t < T0) T.balon(R, S(85), 131, t, { epoca: '1906', s: 1.2, ang: -0.5 });
  else if (t < T1) { const [nx, ny] = parab(Math.min(1, u + 0.02), RH[0], RH[1], SH[0], SH[1], 64); sombra(Math.round(S(bwx)), Math.round(lerp(160, 150, u)), 5, 1, 0.3);
    T.balon(R, S(bwx), bwy, t, { epoca: '1906', s: 1.3, ang: Math.atan2(ny - bwy, nx - bwx), gira: 3, estela: true }); }
  else { const ch = t < T1 + 0.25 ? [sc.x + 7, sc.s - 26] : [sc.x + 12, sc.s - 12]; T.balon(R, S(ch[0]), ch[1], t, { epoca: '1906', s: 1.2, ang: t < T1 + 0.25 ? 0 : -0.3 }); }
};

const efectos = [[1.8, 'pop'], [via0, 'vapor'], [pinWK, 'pop'], [snap, 'silbato'], [fwd, 'lapiz'], [flash, 'flash'], [suelo3, 'golpecito'], [suelo3 + 0.2, 'guau'], [T0, 'whoosh'], [T1, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1906', año: 1906, efectos });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['fa-cedar'] = ('Cedar Point', '''// FA-CEDAR (frases 12–13), 1913. Cuatro planos:
// 1. el cuarto de la residencia de Notre Dame: el calendario de la pared pierde sus hojas de 1906 a 1913 («Seven years
//    later») y la cúpula dorada brilla por la ventana («Notre Dame»); Dorais coge el balón del escritorio y lo lanza a la
//    maleta abierta («Dorais»); Rockne abre la puerta y descuelga el salvavidas («Rockne»);
// 2. (corta en «spent») la playa de Cedar Point, con el hotel, el muelle y la torre: un bañista se apura en el agua, Rockne
//    pita y lo señala («lifeguards»), Dorais corre a la orilla y le lanza el aro con su cuerda («Cedar Point»), tira de él
//    hasta la orilla y el bañista saluda («Ohio»);
// 3. (corta en «Throwing») la arena al atardecer, junto al muelle: Dorais y Rockne se lanzan el balón entre turnos; a «only a
//    few afternoons» el sol cae tres veces deprisa (tres marcas en la arena) mientras siguen los pases; un cangrejo
//    cruza; las gaviotas, el vapor y los balandros al fondo;
// 4. (corta en «The ball») el balón de 1913 de cerca, sobre la arena dorada: la mano de Dorais apenas lo abarca y lo ajusta;
//    a «fatter and rounder than today's» se dibuja encima la silueta, más estrecha, del balón de hoy; a «hard to grip with
//    one hand» se le escurre dos veces; lo vuelve a coger y lo lanza.''', COMUN + r'''
const c = (s) => en('cedar', (s - 0.5) / 17.342), m = (s) => en('melon', (s - 18.642) / 5.312);
const C2 = c(5.08), C3 = c(11.81), C4 = m(18.64), FIN = E.duracion;
const BL = hex('#f2eee2'), ROJO = hex('#c84a3a');
const hojas = [0, 1, 2, 3, 4, 5, 6].map((k) => c(0.55) + k * (c(2.0) - c(0.55)) / 7);
const año = (t) => 1906 + hojas.filter((x) => t >= x).length;

// ── 1 · el cuarto de la residencia de Notre Dame ────────────────────────────────────────────────────────────────────
const cuarto = fijo(() => {
  const P = R.pset;
  // el papel pintado a rayas con su rombo, la moldura de arriba y la de los cuadros
  for (let y = 0; y < 104; y++) for (let x = 0; x < 320; x++) { let col = (x % 12) < 6 ? hex('#d6c49a') : hex('#cdb98c');
    if ((x % 12 === 3 && y % 10 === 5) || (x % 12 === 9 && y % 10 === 0)) col = hex('#a88e5e'); else if (((x % 12 === 2 || x % 12 === 4) && y % 10 === 5) || (x % 12 === 3 && (y % 10 === 4 || y % 10 === 6))) col = hex('#bba578');
    if (y < 6) col = y === 5 ? hex('#8a6a44') : hex('#e2d4ae'); if (y === 6) col = hex('#6a4a2c'); if (y === 16 || y === 17) col = y === 16 ? hex('#9a7048') : hex('#6a4a2c');
    if (hh(x >> 1, y >> 1, 30) < 0.03) col = mezcla(col, hex('#8a7048'), 0.3); P(x, y, col); }
  // el zócalo de madera con sus cuarterones
  for (let y = 104; y < 128; y++) for (let x = 0; x < 320; x++) { let col = hh(x >> 2, y, 31) < 0.15 ? hex('#6e4428') : hex('#7a4a2a'); if (y === 104 || y === 105) col = hex('#a8744a'); if (y === 106) col = hex('#4a2c18'); if (y > 125) col = hex('#4a2c18');
    const k = x % 40; if (y > 109 && y < 122 && (k === 4 || k === 36)) col = hex('#5a361e'); if (y > 109 && y < 122 && (k === 5 || k === 37)) col = hex('#9a6a42'); if ((y === 110 || y === 121) && k > 4 && k < 36) col = y === 110 ? hex('#5a361e') : hex('#9a6a42'); P(x, y, col); }
  // el suelo de tablas con sus vetas y clavos
  for (let y = 128; y < 180; y++) { const tabla = Math.floor((y - 128) / 7); for (let x = 0; x < 320; x++) { const junta = (x + tabla * 53) % 96 === 0; let col = tabla % 2 ? hex('#8a5a36') : hex('#946240');
    if ((y - 128) % 7 === 0 || junta) col = hex('#5a361e'); else if (hh(x >> 3, y, 32) < 0.12 || Math.sin(x * 0.11 + tabla * 2 + y * 0.6) > 0.96) col = hex('#7a4c2c'); else if (hh(x, y, 33) > 0.97) col = hex('#a87048');
    if (((x + tabla * 53) % 96 === 3 || (x + tabla * 53) % 96 === 92) && (y - 128) % 7 === 3) col = hex('#3a2414'); P(x, y, col); } }
  // la mancha de sol de la ventana en el suelo
  R.poligono([[50, 130], [104, 130], [130, 172], [72, 172]], (x, y) => mezcla(R.pget(x, y), hex('#f0d8a0'), 0.22));
  // la alfombra trenzada ovalada
  for (let y = -11; y <= 11; y++) for (let x = -62; x <= 62; x++) { const d = Math.sqrt((x * x) / (62 * 62) + (y * y) / (11 * 11)); if (d > 1) continue; const anillo = Math.floor(d * 7), tr = (x + y * 2 + anillo) % 3 === 0;
    const AN = [hex('#8a2a2a'), hex('#c8a060'), hex('#2a4a6a'), hex('#6a3a2a'), hex('#c8a060'), hex('#8a2a2a'), hex('#2a4a6a')][anillo]; P(150 + x, 166 + y, tr ? mezcla(AN, K, 0.25) : AN); }
  // el escritorio con la lámpara de petróleo, los libros, el tintero y la foto
  R.rect(4, 104, 72, 108, K); R.rect(5, 104, 71, 106, hex('#8a5a36')); R.rect(5, 104, 71, 104, hex('#b07a4a'));
  R.rect(6, 108, 70, 146, K); R.rect(7, 109, 69, 146, hex('#6e4428')); for (const [y0, y1] of [[111, 124], [127, 144]]) { R.rect(10, y0, 66, y1, hex('#5a361e')); R.rect(11, y0 + 1, 65, y1 - 1, hex('#7a4c2c')); R.rect(35, Math.round((y0 + y1) / 2), 41, Math.round((y0 + y1) / 2) + 1, hex('#c8a040')); }
  R.rect(6, 146, 9, 152, K); R.rect(67, 146, 70, 152, K);
  R.rect(10, 102, 20, 104, hex('#c8a040')); R.rect(11, 94, 19, 102, hex('#d8b858')); R.rect(12, 95, 18, 101, hex('#e8d090')); R.rect(13, 86, 17, 94, hex('#d8e8f0')); R.rect(14, 86, 14, 93, BL);
  for (const [y, col] of [[100, '#2a4a6a'], [97, '#8a2a2a'], [94, '#3a5a2a']]) { R.rect(24, y, 38, y + 3, K); R.rect(25, y, 37, y + 2, hex(col)); R.rect(25, y + 1, 37, y + 1, hex('#e8d8b0')); }
  R.rect(42, 99, 46, 103, K); R.rect(43, 100, 45, 103, hex('#2a2a3a')); R.linea(45, 99, 50, 90, hex('#f2eee2')); R.linea(46, 99, 51, 91, hex('#c8c0b0'));
  R.rect(60, 90, 70, 103, K); R.rect(61, 91, 69, 102, hex('#c8a040')); R.rect(62, 92, 68, 101, hex('#d8d0b8')); R.rect(63, 96, 67, 100, hex('#6a6a7a')); R.disco(65, 95, 1, hex('#8a7a6a'));
  // la cama de hierro con el edredón de retales
  R.rect(252, 104, 302, 126, K); for (let y = 105; y < 126; y++) for (let x = 253; x < 302; x++) { const q = ((x - 253) >> 3) + ((y - 105) >> 2) * 3; P(x, y, y > 119 ? (x % 4 === 0 ? hex('#c8c0b0') : BL) : [hex('#8a2a2a'), hex('#e8d8b0'), hex('#2a4a6a'), hex('#c8a060'), hex('#6a8a4a'), hex('#e8d8b0')][q % 6]); if ((x - 253) % 8 === 0 || (y - 105) % 4 === 0) if (y < 120) P(x, y, hex('#5a4a3a')); }
  R.rect(286, 98, 312, 106, K); R.rect(287, 99, 311, 105, BL); R.rect(287, 104, 311, 105, hex('#c8c0b0'));
  for (const x of [300, 306, 312, 318]) R.rect(x, 78, x + 1, 130, K); R.rect(298, 78, 319, 80, K); R.rect(298, 92, 319, 93, K); for (const x of [298, 318]) { R.disco(x + 1, 76, 2, hex('#c8a040')); R.pset(x, 75, hex('#f0d878')); }
  R.rect(254, 126, 256, 140, K); R.rect(296, 126, 298, 140, K); sombra(278, 141, 30, 2, 0.35);
  // la maleta abierta en el suelo, con la ropa de socorrista dentro
  R.rect(150, 122, 196, 142, K); R.rect(151, 123, 195, 141, hex('#b8a888')); for (let x = 151; x < 196; x += 4) R.rect(x, 123, x + 1, 141, hex('#a89878'));
  R.rect(148, 140, 198, 158, K); R.rect(149, 141, 197, 157, hex('#7a4a24')); R.rect(149, 141, 197, 142, hex('#9a6234')); R.rect(149, 155, 197, 157, hex('#5a3418'));
  R.rect(152, 142, 194, 147, BL); R.rect(152, 145, 194, 145, ROJO); R.rect(170, 142, 186, 146, hex('#2a3458'));
  for (const x of [160, 186]) { R.rect(x, 141, x + 3, 157, hex('#5a3418')); R.rect(x + 1, 151, x + 2, 152, hex('#c8a040')); } for (const [x, y] of [[148, 140], [197, 140], [148, 157], [197, 157]]) R.rect(x - 1, y - 1, x + 1, y + 1, hex('#c8a040'));
  sombra(173, 159, 26, 2, 0.35);
  // el marco de la puerta, el colgador con el canotier y el gancho del salvavidas
  R.rect(210, 40, 252, 128, K); R.rect(211, 41, 251, 127, hex('#6a4228')); R.rect(213, 43, 249, 43, hex('#8a5a36'));
  R.rect(198, 102, 204, 104, hex('#c8a040')); R.rect(186, 102, 190, 104, hex('#c8a040'));
  R.rect(181, 103, 195, 104, hex('#d8b868')); R.rect(184, 100, 192, 102, hex('#e8cc80')); R.rect(184, 102, 192, 102, hex('#2a3458'));
  // el banderín azul y oro (sin letras) y la foto del equipo
  R.rect(110, 24, 156, 72, K); R.rect(111, 25, 155, 71, hex('#f2eee2')); R.rect(111, 25, 155, 33, hex('#8a2a2a')); for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) R.rect(115 + i * 6, 52 + j * 5, 117 + i * 6, 53 + j * 5, hex('#a89878'));
  R.pset(133, 22, K); R.linea(126, 25, 133, 22, hex('#6a5a4a')); R.linea(140, 25, 133, 22, hex('#6a5a4a'));
});
const ventana = (t) => {
  R.recorte([31, 21, 95, 83]);
  degradado(31, 21, 95, 70, ['#6a9ae0', '#86b0e8', '#a6c6f0', '#c8dcf4'].map(hex));
  for (const [x0, y, w, v] of [[20, 30, 22, 2.2], [70, 40, 16, 3.4], [50, 26, 12, 1.4]]) nubeM(((x0 + t * v) % 100) + 10, y, w, ['#c8d4e4', '#eef2f8', '#ffffff'].map(hex));
  R.poligono([[31, 72], [60, 66], [95, 70], [95, 83], [31, 83]], hex('#5a9a46')); for (let x = 31; x < 96; x++) if (hh(x, 1, 34) < 0.4) R.pset(x, 74 + Math.round(hh(x, 2, 34) * 6), hex('#4a8a3a'));
  // el edificio principal con la cúpula dorada y la estatua; la aguja de la basílica a la derecha
  R.poligono([[46, 74], [46, 58], [82, 58], [82, 74]], K); R.poligono([[47, 74], [47, 59], [81, 59], [81, 74]], hex('#e8dcc0')); for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) R.disco(50 + i * 6, 63 + j * 6, 0.9, hex('#4a5a7a'));
  R.poligono([[56, 59], [56, 50], [72, 50], [72, 59]], hex('#e8dcc0')); R.linea(56, 50, 72, 50, K);
  R.disco(64, 50, 7.5, (x, y, d) => y > 50 ? hex('#e8dcc0') : d > 0.8 ? hex('#a87a20') : x < 62 && y < 47 ? hex('#fff0a0') : umbral(x, y) < 0.4 ? hex('#c8962a') : hex('#e8b840'));
  R.linea(64, 42, 64, 37, hex('#e8b840')); R.pset(63, 38, hex('#e8b840')); R.pset(65, 38, hex('#e8b840')); R.pset(64, 36, hex('#fff0a0'));
  R.poligono([[86, 74], [86, 52], [90, 52], [90, 74]], hex('#c8b898')); R.poligono([[86, 52], [88, 38], [90, 52]], hex('#8a8a92'));
  for (const [tx, ty, r] of [[38, 66, 9], [94, 64, 8]]) { const o = Math.round(Math.sin(t * 1.4 + tx) * 1); R.disco(tx + o, ty, r, (x, y, d) => d > 0.8 && umbral(x, y) < 0.5 ? hex('#2e5a2e') : y < ty - 3 ? hex('#5a9a48') : hex('#3e7a3a')); }
  // el brillo de la cúpula a «Notre Dame»
  const g = lin(t, c(1.46), c(1.9)) * (1 - lin(t, c(2.1), c(2.6))); if (g > 0) { const r = Math.round(1 + g * 4); for (let i = -r; i <= r; i++) { R.pset(60 + i, 46, hex('#ffffff')); R.pset(60, 46 + i, hex('#ffffff')); } }
  // un gorrión en el alféizar de fuera, que da saltitos
  const sx = 70 + Math.round(Math.sin(t * 0.9) * 8), sj = Math.sin(t * 7) > 0.6 ? 1 : 0; R.rect(sx, 80 - sj, sx + 2, 81 - sj, hex('#7a5a3a')); R.pset(sx + 3, 80 - sj, hex('#5a3a24')); R.pset(sx - 1, 81 - sj, hex('#5a3a24'));
  R.recorte(null);
  for (let k = 0; k < 2; k++) for (let i = 0; i < 26; i++) tine(40 + k * 32 + i, 70 - i * 1.8, hex('#ffffff'), 0.12);
  // el marco de la ventana, los parteluces y el alféizar
  R.rect(28, 18, 98, 20, K); R.rect(28, 84, 98, 84, K); R.rect(29, 19, 97, 20, hex('#f2eee2')); R.rect(28, 18, 30, 84, hex('#e8e2d2')); R.rect(96, 18, 98, 84, hex('#d8d0c0')); R.rect(62, 21, 64, 83, hex('#e8e2d2')); R.rect(31, 51, 95, 53, hex('#e8e2d2')); R.rect(64, 21, 64, 83, hex('#b8b0a0')); R.rect(31, 53, 95, 53, hex('#b8b0a0'));
  R.rect(24, 84, 102, 88, K); R.rect(25, 84, 101, 86, hex('#f2eee2')); R.rect(25, 87, 101, 87, hex('#b8b0a0'));
  R.rect(80, 78, 88, 84, K); R.rect(81, 79, 87, 84, hex('#b8603a')); R.disco(84, 75, 3, hex('#3e7a3a')); R.pset(83, 74, hex('#e83a4a')); R.pset(85, 75, hex('#e83a4a'));
  // las cortinas que se mecen con la brisa y la barra de latón
  for (const lado of [-1, 1]) { const x0 = lado < 0 ? 18 : 108, xi = lado < 0 ? 34 : 92;
    for (let y = 18; y < 94; y++) { const o = Math.round(Math.sin(t * 1.6 + y * 0.08) * (y - 18) / 76 * 3), xa = Math.min(x0, xi + o * -lado), xb = Math.max(x0, xi + o * -lado);
      for (let x = xa; x <= xb; x++) { const pl = (x - xa) % 5; R.pset(x, y, x === xa || x === xb ? K : pl === 0 ? hex('#6a1e1e') : pl === 2 ? hex('#b84a40') : hex('#8a2a2a')); } } }
  R.rect(14, 15, 112, 16, hex('#c8a040')); R.rect(14, 17, 112, 17, hex('#8a6a20')); R.disco(14, 16, 2, hex('#e8c060')); R.disco(112, 16, 2, hex('#e8c060'));
};
const reloj = (t) => { const x = 231, y = 30; R.disco(x, y, 8, K); R.disco(x, y, 7, hex('#6a4228')); R.disco(x, y, 5.5, hex('#f4ecd8')); for (let k = 0; k < 12; k++) { const an = k / 12 * 6.283; R.pset(Math.round(x + Math.cos(an) * 4.5), Math.round(y + Math.sin(an) * 4.5), hex('#6a5a4a')); }
  R.linea(x, y, x + 3, y - 1, K); R.linea(x, y, x, y - 4, K); const s = Math.floor(t) / 60 * 6.283 * 5; R.linea(x, y, Math.round(x + Math.sin(s) * 4), Math.round(y - Math.cos(s) * 4), hex('#b83a2a')); };
const banderin = (t) => { const o = Math.round(Math.sin(t * 1.2) * 1.5); R.rect(160, 22, 161, 42, hex('#5a3a22')); R.poligono([[162, 22], [206, 31 + o], [162, 40]], hex('#c8a040')); R.poligono([[163, 24], [201, 31 + o], [163, 38]], hex('#1c2440')); R.linea(163, 31, 190, 31 + o, hex('#c8a040')); };
const puerta = (ab) => { R.rect(214, 44, 248, 127, hex('#2a1e18')); R.rect(214, 110, 248, 127, hex('#3a2a1e')); R.disco(222, 66, 3, hex('#f0c060')); for (let r = 4; r < 10; r++) for (let k = 0; k < 20; k++) { const an = k / 20 * 6.283; tine(222 + Math.cos(an) * r, 66 + Math.sin(an) * r, hex('#f0c060'), 0.12); }
  const w = Math.round(34 * (1 - ab)) + (ab > 0 ? 3 : 0); if (w > 0) { const x0 = 248 - w; R.rect(x0, 44, 248, 127, hex('#8a5a36')); R.rect(x0, 44, x0, 127, K); if (w > 12) { for (const [y0, y1] of [[50, 82], [90, 122]]) { R.rect(x0 + 4, y0, 245, y1, hex('#6e4428')); R.rect(x0 + 5, y0 + 1, 244, y1 - 1, hex('#7e4e2e')); } R.disco(x0 + 3, 88, 1.5, hex('#e8c060')); } } };
const salvavidas = (x, y, r = 6) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r + 0.4 || d < r * 0.5) continue; const an = Math.atan2(j, i), seg = Math.floor((an + Math.PI) / (Math.PI / 2)) % 2;
  R.pset(x + i, y + j, d > r - 0.6 || d < r * 0.5 + 0.6 ? K : seg ? ROJO : BL); } };
const hojaCae = (t, k) => { const t0 = hojas[k], f = lin(t, t0, t0 + 0.9); if (f <= 0) return; const fx = 116 + k * 4 + Math.sin(f * 5 + k) * 8 * (1 - f), fy = lerp(40, 160 + (k % 3) * 3, f * f), sk = f < 1 ? Math.round(Math.sin(f * 9 + k) * 3) : 0, h = f < 1 ? 6 : 2;
  R.poligono([[fx, fy], [fx + 9, fy + sk], [fx + 9, fy + sk + h], [fx, fy + h]].map(([x, y]) => [Math.round(x), Math.round(y)]), K); R.poligono([[fx + 1, fy + 1], [fx + 8, fy + sk + 1], [fx + 8, fy + sk + h - 1], [fx + 1, fy + h - 1]].map(([x, y]) => [Math.round(x), Math.round(y)]), BL); };
const lanza1 = c(3.7), cae1 = c(4.05), coge1 = c(2.6), ab0 = c(2.58), aro = c(4.54);
const p1 = (t) => {
  cuarto(); ventana(t); reloj(t); banderin(t); puerta(lin(t, ab0, ab0 + 0.35));
  // el calendario: el año grande y las hojas que se arrancan y caen al suelo
  R.numero(String(año(t)), 133, 47, { centro: true });
  for (let k = 0; k < 7; k++) hojaCae(t, k);
  // la llama de la lámpara
  if (Math.sin(t * 13) > -0.4) R.pset(15, 92, hex('#f8d060')); R.pset(15, 93, hex('#e88a2a'));
  // el salvavidas: en su gancho hasta que Rockne lo descuelga y lo levanta
  const ro = ruta(t, [[ab0 + 0.3, 226, 128, -1], [c(3.9), 202, 132, -1]]);
  if (t < aro) salvavidas(201, 111);
  if (t > ab0 + 0.25) R.actor(EL.rockne, ro.x, ro.s, t, { dir: -1, anda: ro.mv, tocado: 'gorra', dedo: t > aro, sonrisa: t > aro - 0.3, habla: t > aro + 0.3 && Math.sin(t * 8) > 0 });
  if (t >= aro) { const e = lin(t, aro, aro + 0.25); salvavidas(Math.round(lerp(201, ro.x, e)), Math.round(lerp(111, ro.s - 30, e))); }
  // Dorais coge el balón del escritorio, va hacia la maleta y lo lanza dentro
  const dr = ruta(t, [[coge1 + 0.2, 50, 168, 1], [lanza1 - 0.15, 108, 168, 1]]);
  R.actor(EL.dorais, dr.x, dr.s, t, { dir: 1, anda: dr.mv, sorpresa: t > c(0.9) && t < c(1.8), sonrisa: t > cae1, dedo: t > lanza1 - 0.1 && t < lanza1 + 0.35 });
  if (t < coge1) T.balon(R, 54, 101, t, { epoca: '1913', s: 1, ang: 0.1 });
  else if (t < lanza1) { const e = lin(t, coge1, coge1 + 0.2); T.balon(R, lerp(54, dr.x + 12, e), lerp(101, dr.s - 12, e), t, { epoca: '1913', s: 1, ang: -0.2 }); }
  else if (t < cae1) { const u = lin(t, lanza1, cae1), [bx, by] = parab(u, dr.x + 14, dr.s - 26, 174, 146, 16); T.balon(R, bx, by, t, { epoca: '1913', s: 1, ang: -0.6 + u * 1.6 }); }
  else { T.balon(R, 174, 146 - Math.round(Math.max(0, Math.sin((t - cae1) * 18)) * 2 * (1 - lin(t, cae1, cae1 + 0.4))), t, { epoca: '1913', s: 1, ang: 0.15 }); R.rect(149, 148, 197, 149, hex('#7a4a24')); }
};

// ── 2 · la playa de Cedar Point: el rescate ─────────────────────────────────────────────────────────────────────────
const pita = c(7.78), lanzaAro = c(8.72), llega = c(9.25), ohio = c(10.81);
const banista = (x, y, t, apuro, saluda) => { x = Math.round(x); y = Math.round(y); const piel = hex('#f0b888');
  for (let k = 0; k < 2; k++) { const r = ((t * (apuro ? 1.8 : 0.9) + k * 0.5) % 1) * 7 + 3; for (let an = 0; an < 6.283; an += 0.3) if (Math.sin(an) > -0.2) R.pset(Math.round(x + Math.cos(an) * r), Math.round(y + 3 + Math.sin(an) * r * 0.3), hex('#e0f0f8')); }
  R.rect(x - 3, y + 2, x + 3, y + 3, hex('#3a6a9a')); R.rect(x - 2, y + 2, x + 2, y + 2, hex('#5a8ab8'));
  R.disco(x, y - 1, 2.6, K); R.disco(x, y - 1, 2, piel); R.rect(x - 2, y - 4, x + 2, y - 3, ROJO); R.pset(x - 1, y - 4, BL); R.pset(x + 1, y - 4, BL); R.pset(x + 1, y - 1, K);
  if (apuro) { const f = Math.sin(t * 14) > 0; R.linea(x - 2, y + 1, x - 4, y - (f ? 5 : 2), piel); R.linea(x + 2, y + 1, x + 4, y - (f ? 2 : 5), piel); }
  else if (saluda) { const f = Math.sin(t * 9) > 0; R.linea(x + 2, y, x + 4 + (f ? 1 : 0), y - 6, piel); }
};
const p2 = (t) => {
  T.cedarPoint(R, t);
  // el bañista en apuros, delante del muelle; con el aro, Dorais tira de él hasta la orilla
  const tira = lin(t, llega + 0.2, ohio), bx = lerp(228, 214, tira) + Math.sin(t * 2) * (t < llega ? 1 : 0), by = lerp(97, 104, tira) + Math.sin(t * 3) * 0.8;
  const dr = ruta(t, [[C2, 116, 152, 1], [c(7.95), 116, 152, 1], [lanzaAro - 0.08, 190, 132, 1]]);
  const tirando = t > llega + 0.2 && t < ohio, hx = dr.x + 14 - (tirando ? Math.round((Math.sin(t * 9) + 1) * 1.5) : 0), hy = dr.s - 13;
  // el aro: en la mano, en el aire o en el agua con el bañista
  let ax, ay; if (t < lanzaAro) { ax = hx + 2; ay = hy; } else if (t < llega) { const u = lin(t, lanzaAro, llega); [ax, ay] = parab(u, hx + 2, hy, bx - 4, by + 1, 14); } else { ax = bx - 4; ay = by + 1; }
  banista(bx, by, t, t < llega, t > ohio - 0.2);
  if (t >= lanzaAro) { const n = 24; for (let i = 0; i <= n; i++) { const u = i / n, px = lerp(hx, ax, u), py = lerp(hy, ay, u) + Math.sin(u * Math.PI) * (t < llega ? 2 : 4 - (tirando ? 2 : 0)); R.pset(Math.round(px), Math.round(py), hex('#e8dcc0')); R.pset(Math.round(px), Math.round(py) + 1, hex('#8a7a5a')); } }
  salvavidas(Math.round(ax), Math.round(ay), 3);
  if (t > llega && t < llega + 0.5) { const e = lin(t, llega, llega + 0.5); for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI + Math.PI; R.pset(Math.round(ax + Math.cos(an) * (2 + e * 6)), Math.round(ay - 2 + Math.sin(an) * (2 + e * 7) + e * e * 6), BL); } }
  R.actor(EL.doraisPlaya, dr.x, dr.s, t, { dir: 1, anda: dr.mv, enfado: tirando, sonrisa: t > ohio, dedo: t > lanzaAro - 0.15 && t < lanzaAro + 0.3 });
  // Rockne en la arena junto a la torre: otea, pita y señala
  R.actor(EL.rocknePlaya, 236, 158, t, { dir: 1, dedo: t > pita - 0.1 && t < lanzaAro + 0.6, sorpresa: t > pita - 0.6 && t < pita, brazos: t > ohio + 0.1, sonrisa: t > ohio });
  if (t > pita && t < pita + 0.6) { R.pset(251, 140, hex('#e8e8f0')); R.pset(252, 140, hex('#c8c8d0')); for (let k = 0; k < 3; k++) { const v = ((t - pita) * 3 + k / 3) % 1; R.pset(Math.round(254 + v * 6), Math.round(138 - k * 2 - v * 2), BL); } }
  if (t > pita + 0.1 && t < lanzaAro) R.bocadillo(Math.round(bx), Math.round(by) - 9, { icono: '!' });
};

// ── 3 · la arena al atardecer: los pases entre turnos ───────────────────────────────────────────────────────────────
const CIELO3 = ['#2e3a7a', '#4a4a90', '#7a5a9a', '#b86a8a', '#e88a6a', '#f4a860', '#f8c870'].map(hex), SKY3 = new Uint8Array(57600);
const atardecer = fijo(() => {
  const P = R.pset;
  degradado(0, 0, 319, 78, CIELO3);
  // la otra orilla, a la izquierda: el cabo con el hotel y la montaña rusa en sombra, con sus ventanas encendidas
  for (let x = 0; x < 130; x++) { const yh = 74 - Math.round(Math.max(0, 1 - x / 130) * 3); for (let y = yh; y <= 78; y++) P(x, y, hex('#3a2e4a')); }
  R.rect(14, 64, 62, 74, hex('#3a2e4a')); R.rect(30, 58, 40, 64, hex('#3a2e4a')); R.poligono([[28, 58], [35, 52], [42, 58]], hex('#3a2e4a')); for (let i = 0; i < 9; i++) for (let j = 0; j < 2; j++) if (hh(i, j, 40) < 0.6) P(17 + i * 5, 67 + j * 4, hex('#f8d070'));
  for (let x = 70; x < 112; x++) { const y = Math.round(66 + Math.abs(Math.sin(x * 0.12)) * 6); P(x, y, hex('#3a2e4a')); if (x % 4 === 0) R.linea(x, y, x, 74, hex('#3a2e4a')); }
  // el lago: degradado con los reflejos, las crestas y los surcos
  const LAGO = ['#d8907a', '#b87484', '#8a5e8a', '#6a5284', '#56507e', '#4c587e'].map(hex);
  for (let y = 79; y < 124; y++) { const f = (y - 79) / 44 * (LAGO.length - 1), i = Math.floor(f), fr = f - i;
    for (let x = 0; x < 320; x++) { let col = LAGO[Math.min(LAGO.length - 1, i + (fr > umbral(x, y) ? 1 : 0))];
      const ola = Math.sin(x * (0.05 + (y - 79) * 0.004) + y * 1.9 + Math.sin(y * 0.7) * 2);
      if (ola > 0.93) col = mezcla(col, hex('#f8c890'), 0.55); else if (ola < -0.95) col = mezcla(col, hex('#2a2a54'), 0.35); P(x, y, col); } }
  R.rect(0, 78, 319, 78, hex('#f0b07a'));
  // la arena cálida: ondas del viento, huellas, conchas, algas
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { const f = (y - 120) / 60; let col = umbral(x, y) < f * 0.6 ? hex('#c08a58') : hex('#d8a46a'); if (Math.sin(x * 0.09 + y * 0.9 + Math.sin(x * 0.03) * 3) > 0.92) col = hex('#b07a4a'); else if (hh(x, y, 42) > 0.985) col = hex('#f0c890'); P(x, y, col); }
  for (let k = 0; k < 14; k++) { const x = 30 + k * 16, y = 172 - k * 2 + (k % 2) * 3; R.rect(x, y, x + 2, y + 1, hex('#a06a40')); R.pset(x + 1, y + 2, hex('#a06a40')); }
  for (let k = 0; k < 18; k++) { const x = Math.round(hh(k, 1, 43) * 310) + 4, y = 128 + Math.round(hh(k, 2, 43) * 48); if (hh(k, 3, 43) < 0.5) { P(x, y, hex('#f8e8e0')); P(x + 1, y, hex('#e8b8a8')); P(x, y - 1, hex('#fff4f0')); } else { R.linea(x, y, x + 4, y + 1, hex('#4a5a2a')); R.pset(x + 2, y - 1, hex('#5a6a32')); } }
  // el tronco varado, el castillo de arena, el cubo rojo
  R.rect(2, 168, 56, 177, K); for (let y = 169; y < 177; y++) for (let x = 3; x < 56; x++) P(x, y, y < 171 ? hex('#a89a8a') : (x + y * 3) % 9 === 0 ? hex('#5a4a3a') : hex('#7a6a5a')); R.disco(20, 172, 2, hex('#5a4a3a'));
  R.rect(134, 144, 162, 156, K); R.rect(135, 145, 161, 156, hex('#c89a62')); for (const x of [134, 146, 156]) { R.rect(x, 136, x + 7, 145, K); R.rect(x + 1, 137, x + 6, 145, hex('#d8aa70')); for (let i = 0; i < 7; i += 2) P(x + i + 1, 136, hex('#d8aa70')); } R.rect(147, 150, 151, 156, hex('#7a5a3a'));
  R.rect(170, 148, 180, 158, K); R.rect(171, 149, 179, 158, hex('#c83a2a')); R.rect(171, 149, 179, 150, hex('#e85a4a')); R.linea(170, 148, 175, 143, hex('#5a5a62')); R.linea(175, 143, 180, 148, hex('#5a5a62'));
  // la caseta de baño a rayas, a la izquierda, y la barca boca abajo, a la derecha
  R.rect(0, 62, 28, 150, K); for (let y = 63; y < 150; y++) for (let x = 0; x < 28; x++) P(x, y, Math.floor(x / 4) % 2 ? hex('#e8d8c8') : hex('#b8402e')); R.poligono([[0, 62], [14, 50], [30, 62]], hex('#5a3a2a')); R.rect(6, 104, 20, 150, hex('#2a1e1e')); R.rect(24, 63, 28, 150, hex('#5a2a2a'));
  R.poligono([[262, 160], [270, 140], [320, 138], [320, 160]], K); R.poligono([[264, 159], [271, 141], [320, 139], [320, 159]], hex('#e8e0d8')); R.rect(268, 150, 320, 152, hex('#3a7a5a')); R.rect(270, 141, 320, 142, hex('#c8c0b8'));
  // las sombras largas del atardecer, hacia la izquierda
  for (const [x0, y0, l] of [[148, 157, 40], [175, 159, 16], [290, 161, 28]]) for (let i = 0; i < l; i++) for (let j = 0; j < 3; j++) tine(x0 - i, y0 + j + Math.round(i * 0.15), hex('#5a2a3a'), 0.25);
  for (let i = 0; i < 57600; i++) SKY3[i] = CIELO3.includes(R.buf[i]) ? 1 : 0;
});
const PASES = [[c(11.95), c(12.65), 0], [c(12.9), c(13.55), 1], [c(13.95), c(14.6), 0], [c(15.05), c(15.45), 1], [c(15.55), c(15.95), 0], [c(16.05), c(16.45), 1], [c(16.55), c(16.95), 0], [c(17.05), c(17.45), 1]];
const lapso0 = c(14.98), lapso1 = c(17.74), CICLO = (lapso1 - lapso0) / 3;
const p3 = (t) => {
  atardecer();
  const ok = (x, y) => SKY3[y * 320 + x] === 1;
  const ciclo = t > lapso0 && t < lapso1 ? ((t - lapso0) / CICLO) % 1 : -1;
  const sx = 204 + (ciclo >= 0 ? ciclo * 8 : 0), sy = ciclo >= 0 ? lerp(52, 92, ciclo) : 60;
  for (let r = 16; r > 9; r--) for (let k = 0; k < 60; k++) { const an = k / 60 * 6.283, x = Math.round(sx + Math.cos(an) * r), y = Math.round(sy + Math.sin(an) * r); if (y < 78 && x >= 0 && x < 320 && ok(x, y)) tine(x, y, hex('#ffe8a0'), 0.18); }
  R.disco(sx, sy, 9, (x, y, d) => (y < 78 && ok(x, y)) ? (d < 0.7 ? hex('#fff4c8') : hex('#ffd878')) : R.pget(x, y));
  for (const [x0, y, w, v, k] of [[10, 24, 40, 1.0, 0], [150, 14, 52, 0.6, 1], [100, 46, 24, 1.8, 2], [240, 60, 20, 1.3, 3]]) { const x = ((x0 + t * v) % 380) - 30; nubeM(x, y, w, ['#a85a7a', '#e89a8a', '#ffd0a0'].map(hex), ok); }
  // el camino de brillos del sol en el agua
  for (let y = 80; y < 120; y++) { const w = 4 + (y - 80) * 0.5; for (let x = Math.round(sx - w); x <= sx + w; x++) if (hh(x, y, Math.floor(t * 6)) > 0.82) R.pset(x, y, hh(x, y, 44) > 0.5 ? hex('#fff0b0') : hex('#f8c070')); }
  // el vapor del horizonte, los balandros y las gaviotas
  const vx = 120 + t * 1.5; R.rect(vx, 74, vx + 14, 77, hex('#2a2238')); R.rect(vx + 3, 69, vx + 5, 74, hex('#2a2238')); R.rect(vx + 8, 69, vx + 10, 74, hex('#2a2238')); for (let k = 0; k < 8; k++) { const v = (t * 0.6 + k / 8) % 1; tine(vx + 4 - v * 18, 66 - v * 6, hex('#5a4a6a'), 0.5 * (1 - v)); tine(vx + 4 - v * 18, 67 - v * 6, hex('#5a4a6a'), 0.35 * (1 - v)); }
  for (const [x0, v, y] of [[60, 2.2, 88], [250, -1.4, 84]]) { const x = Math.round(((x0 + t * v) % 360 + 360) % 360 - 20), b = Math.round(Math.sin(t * 2 + x0)); R.poligono([[x, y - 12 + b], [x, y - 1 + b], [x + 8, y - 1 + b]], hex('#3a2e4a')); R.poligono([[x - 1, y - 9 + b], [x - 1, y - 1 + b], [x - 5, y - 1 + b]], hex('#4a3a5a')); R.rect(x - 4, y + b, x + 8, y + 1 + b, hex('#2a2238')); }
  for (let k = 0; k < 3; k++) { const x = ((k * 110 + t * 15) % 360) - 20, y = 50 + k * 7 + Math.sin(t * 2 + k) * 3; if (!(x > 270 && y < 46)) R.gaviota(Math.round(x), Math.round(y), t, k); }
  // la orilla: la espuma que sube y baja, y la arena mojada
  const ola = Math.sin(t * 1.1) * 2;
  for (let x = 30; x < 320; x++) { const ys = Math.round(121 + 1.5 * Math.sin(x * 0.045 + 1) + ola); for (let y = ys + 2; y < ys + 6; y++) tine(x, y, hex('#6a4a4a'), 0.25 * (1 - (y - ys - 2) / 4)); if (hh(x >> 1, Math.floor(t * 3), 45) > 0.15) R.pset(x, ys, hex('#fff0e8')); if (hh(x, Math.floor(t * 3), 46) > 0.5) R.pset(x, ys + 1, hex('#f0c8c0')); }
  // la hierba de duna que se mece
  for (const [gx, gy] of [[36, 150], [46, 154], [300, 170], [252, 176], [118, 178]]) for (let k = 0; k < 5; k++) { const o = Math.round(Math.sin(t * 2.4 + k + gx) * 2); R.linea(gx + k * 2 - 4, gy, gx + k * 3 - 6 + o, gy - 7 - (k % 2) * 3, k % 2 ? hex('#7a8a3a') : hex('#5a6a2a')); }
  // un cangrejo cruza de lado y se para
  const cx = Math.round(100 + 60 * suave(lin(t, c(12.2), c(13.4))) + 40 * suave(lin(t, c(14.2), c(15.0)))), cm = (t > c(12.2) && t < c(13.4)) || (t > c(14.2) && t < c(15.0)), cy = 174;
  R.rect(cx, cy - 2, cx + 4, cy, hex('#c83a2a')); R.pset(cx + 1, cy - 3, K); R.pset(cx + 3, cy - 3, K); const pz = Math.sin(t * 6) > 0 ? 1 : 0; R.pset(cx - 1, cy - 3 - pz, hex('#e85a4a')); R.pset(cx + 5, cy - 3 - (1 - pz), hex('#e85a4a')); if (cm) { const f = Math.floor(t * 14) % 2; R.pset(cx - 1 + f, cy + 1, hex('#8a2a1a')); R.pset(cx + 4 - f, cy + 1, hex('#8a2a1a')); }
  // las marcas de los tres atardeceres en la arena
  for (let k = 0; k < 3; k++) if (t > lapso0 + CICLO * (k + 1) - 0.12) { const x = 196 + k * 5; R.linea(x, 162, x + 1, 171, hex('#8a5a3a')); R.linea(x + 1, 162, x + 2, 171, hex('#f0c890')); }
  // Dorais y Rockne con sus sombras largas; los pases
  const D = [66, 160], Rk = [236, 154];
  sombra(D[0] - 4, D[1] + 1, 12, 2, 0.35, hex('#5a2a3a')); sombra(Rk[0] - 4, Rk[1] + 1, 12, 2, 0.35, hex('#5a2a3a'));
  let pase = null, ultimo = 1; for (const p of PASES) { if (t >= p[0] && t < p[1]) pase = p; if (t >= p[1]) ultimo = p[2]; }
  const agarra = pase ? 1 - pase[2] : ultimo;   // 0: lo tiene Dorais; 1: Rockne
  const lanzaD = pase && pase[2] === 0 && t < pase[0] + 0.25, lanzaR = pase && pase[2] === 1 && t < pase[0] + 0.25;
  const recibeD = PASES.some((p) => p[2] === 1 && t > p[1] - 0.3 && t < p[1] + 0.15), recibeR = PASES.some((p) => p[2] === 0 && t > p[1] - 0.3 && t < p[1] + 0.15);
  R.actor(EL.doraisPlaya, D[0], D[1], t, { dir: 1, dedo: lanzaD, brazos: recibeD && !lanzaD, sonrisa: t > c(14.0) });
  R.actor(EL.rocknePlaya, Rk[0], Rk[1], t, { dir: -1, dedo: lanzaR, brazos: recibeR && !lanzaR, sonrisa: true, habla: t > c(17.8) && Math.sin(t * 8) > 0 });
  const MD = [D[0] + 15, D[1] - 29], MR = [Rk[0], Rk[1] - 29];
  if (pase) { const u = lin(t, pase[0], pase[1]), [x0, y0] = pase[2] === 0 ? MD : MR, [x1, y1] = pase[2] === 0 ? [Rk[0] + 7, Rk[1] - 28] : [D[0] + 7, D[1] - 28], [bx, by] = parab(u, x0, y0, x1, y1, pase[1] - pase[0] > 0.5 ? 28 : 18);
    const [nx, ny] = parab(Math.min(1, u + 0.03), x0, y0, x1, y1, pase[1] - pase[0] > 0.5 ? 28 : 18); T.balon(R, bx, by, t, { epoca: '1913', s: 1.1, ang: Math.atan2(ny - by, nx - bx), gira: 2 }); }
  else if (agarra === 0) T.balon(R, D[0] + 12, D[1] - 12, t, { epoca: '1913', s: 1.1, ang: -0.2 + (t > c(17.8) ? Math.sin(t * 3) * 0.2 : 0), giro: t > c(17.8) ? t * 0.5 : 0 });
  else T.balon(R, Rk[0] + 2, Rk[1] - 12, t, { epoca: '1913', s: 1.1, ang: 0.2 });
  // el lapso: la luz se apaga y vuelve con cada atardecer
  if (ciclo >= 0) { const f = Math.sin(ciclo * Math.PI); if (f > 0.05) T.tinte(R, 0, 179, [60, 40, 90], 0.28 * f); }
};

// ── 4 · el balón gordo de 1913 en la mano de Dorais ──────────────────────────────────────────────────────────────────
const MANO_B = R.nuevo();
// la mano canónica (T.mano) sin su manga recta: se pinta aparte y se copia solo la mano, para ponerle un brazo de verdad
const manoSola = (hx, hy) => { const prev = R.usar(MANO_B); R.rect(hx - 4, hy - 5, hx + 11, hy + 4, 0); T.mano(R, hx, hy, 1, '#c84a3a'); R.usar(prev);
  const B = R.buf; for (let y = hy - 4; y <= hy + 3; y++) for (let x = hx; x <= hx + 10; x++) { if (x < 0 || x > 319 || y < 0 || y > 179) continue; const v = MANO_B[y * 320 + x]; if (v) B[y * 320 + x] = v; } };
// el antebrazo desnudo (camiseta de tirantes) que entra en diagonal desde abajo: se estrecha hacia la muñeca, con luz,
// sombra, dos pliegues y la correa de cuero del reloj (el puño) con su sombra
const brazo = (x0, y0, x1, y1) => { const L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L, nx = -uy, ny = ux;
  for (let s = 0; s <= L; s += 0.5) { const w = lerp(4.2, 3.0, s / L), cx = x0 + ux * s, cy = y0 + uy * s;
    for (let q = -w - 0.6; q <= w + 0.6; q += 0.5) { const x = Math.round(cx + nx * q), y = Math.round(cy + ny * q); let col;
      if (Math.abs(q) > w) col = K; else { const f = (q + w) / (2 * w); col = f < 0.28 ? hex('#f8d0a0') : f < 0.62 ? hex('#eab080') : hex('#c8805a'); }
      const r = s / L; if (Math.abs(q) <= w && ((r > 0.3 && r < 0.33) || (r > 0.55 && r < 0.575)) && q > 0) col = hex('#a8603e');
      if (Math.abs(q) <= w && r > 0.84 && r < 0.92) col = q < -w * 0.3 ? hex('#8a5a32') : hex('#5a3418');
      if (Math.abs(q) <= w && r >= 0.92 && r < 0.95 && q > 0) col = hex('#b07050'); R.pset(x, y, col); } } };
const PUNTO = (u, s) => { const L = 6.1 * s, W = 3.5 * s; return W * Math.max(0, 1 - Math.pow(Math.abs(u) / L, 1.6)); };
const silueta = (cx, cy, ang, s, t) => { const L = 6.1 * s, ca = Math.cos(ang), sa = Math.sin(ang);
  for (let k = 0; k < 2; k++) for (let i = 0; i <= 80; i++) { const u = -L + 2 * L * i / 80, v = (k ? 1 : -1) * PUNTO(u, s); if ((i + Math.floor(t * 8)) % 4 === 0) continue; const x = Math.round(cx + u * ca - v * sa), y = Math.round(cy + u * sa + v * ca); R.pset(x, y + 1, K); R.pset(x, y, BL); } };
const entra = C4, ajusta = m(19.6), hoy = m(20.24), hoy1 = m(22.3), resbala = m(22.44), lanza = m(24.62);
const p4 = (t) => {
  T.cedarPoint(R, t, { encuadre: 'cerca', luz: 'tarde' });
  const e = suave(lin(t, entra, entra + 0.6));
  // el ajuste: los cordones ruedan bajo los dedos; el resbalón: el balón se escurre dos veces
  let bx = 168, by = 150 + (1 - e) * 60, ang = -0.12, giro = 0.1, hx = 153, hy = by - 9;
  const aj = suave(lin(t, ajusta, ajusta + 0.8)); ang += aj * 0.18; giro += aj * 0.25; hx += Math.round(Math.sin(aj * Math.PI) * 2);
  const r1 = Math.sin(lin(t, resbala, resbala + 0.5) * Math.PI), r2 = Math.sin(lin(t, m(23.1), m(23.65)) * Math.PI);
  bx += Math.round(r1 * 4 + r2 * 5); by += Math.round(r2 * 2); ang += r1 * 0.12 - r2 * 0.18 + (r1 + r2 > 0.1 ? Math.sin(t * 30) * 0.04 : 0);
  if (t > resbala + 0.45 && t < resbala + 0.55) hy -= 1; if (t > m(23.6) && t < m(23.72)) hy -= 1;
  // el lanzamiento: atrás y adelante, y el balón se va girando
  const at = suave(lin(t, m(24.1), m(24.45))), ad = suave(lin(t, m(24.45), lanza + 0.1)), sale = lin(t, lanza, lanza + 0.7);
  const dx = Math.round(-6 * at + 30 * ad), dy = Math.round(5 * at - 14 * ad); bx += dx; by += dy; hx += dx; hy = by - 9 - (hy < by - 9 ? 1 : 0);
  const ox = Math.round(60 * suave(lin(t, lanza + 0.1, FIN))), oy = Math.round(50 * suave(lin(t, lanza + 0.25, FIN)));
  const x0 = 122 + dx + ox, y0 = 184 + oy, wx = hx - 1 + ox, wy = hy + 1 + oy;
  // las sombras en la arena
  if (sale < 1) sombra(bx + 10, 168, 20, 3, 0.3, hex('#5a3a2a'));
  for (let i = 0; i < 36; i++) for (let j = 0; j < 4; j++) tine(x0 + 14 + i * 0.6 + j, 182 - i * 0.55, hex('#5a3a2a'), 0.18);
  // el brazo va por detrás del balón (la mano lo coge por arriba, desde atrás): primero el brazo, luego el balón, luego la mano
  brazo(x0, y0, wx, wy);
  if (sale > 0) { const [fx, fy] = parab(sale, bx, by, 360, 70, 30); T.balon(R, fx, fy, t, { epoca: '1913', s: 3.2, ang: -0.4, gira: 2.5, estela: true }); }
  else T.balon(R, bx, by, t, { epoca: '1913', s: 3.2, ang, giro });
  manoSola(hx + ox, hy + oy);
  // una gota del lago que cae de los dedos al escurrirse
  if (t > resbala + 0.1 && t < resbala + 0.6) { const v = lin(t, resbala + 0.1, resbala + 0.6); R.pset(hx + 6, Math.round(hy + 5 + v * 20), hex('#c8e8f8')); R.pset(hx + 6, Math.round(hy + 4 + v * 20), BL); }
  // la silueta del balón de hoy encima: más estrecho y más puntiagudo
  if (t > hoy && t < hoy1) silueta(bx, by, ang, 3.2, t);
  if (t > hoy && t < hoy + 0.5) { const r = Math.round(lin(t, hoy, hoy + 0.25) * 4); for (let i = -r; i <= r; i++) { R.pset(bx + 20 + i, by, BL); R.pset(bx + 20, by + i, BL); } }
};

const efectos = [[hojas[0], 'papel'], [c(1.6), 'brillo'], [ab0, 'puerta'], [cae1, 'toc'], [pita, 'silbato'], [lanzaAro, 'whoosh'], [llega, 'chof'], [PASES[0][1], 'palmada'], [PASES[2][1], 'palmada'],
  [lapso0 + CICLO - 0.1, 'tic'], [lapso0 + 2 * CICLO - 0.1, 'tic'], [lapso0 + 3 * CICLO - 0.1, 'tic'], [hoy, 'brillo'], [resbala + 0.1, 'golpecito'], [lanza, 'whoosh']];
T.rodar(E, R, [[0, p1], [C2, p2], [C3, p3], [C4, p4]], { año: (t) => (t < C2 ? año(t) : 1913), efectos });
''')
