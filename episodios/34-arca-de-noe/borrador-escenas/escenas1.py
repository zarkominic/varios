E = {}

COMUN = r'''
const K = hex('#17151d'), BL = hex('#f6f2ea'), ORO = hex('#ffd860'), OROL = hex('#fff4b8'), OROS = hex('#b8862a'), ROJO = hex('#d8402c'), PZ = T.PIEZAS_NX;
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const ease = (u) => u * u * (3 - 2 * u);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
// un destello de cuatro puntas
const destello = (x, y, r, c = BL) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } if (r > 1) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); R.pset(x + 1, y + 1, c); } };
// Atom cuando baja de su esquina: el resplandor tramado y el átomo
const atomAbajo = (ax, ay, t, o = {}) => {
  const r = o.r ?? 12, rr = r + 7; ax = Math.round(ax); ay = Math.round(ay);
  for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { const g = 1 - Math.hypot(i, j) / rr; if (g > 0.3 && ((i + j) & 1 || g > 0.6)) R.pset(ax + i, ay + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(ax, ay, t, { r, orbita: R.PAL.ATOM[7], energia: o.e ?? 0.4, vel: o.vel ?? 1 });
};
const chispas = (x, y, t, r, n, c) => { for (let k = 0; k < n; k++) { const an = k * Math.PI * 2 / n + t * 4, q = r + Math.sin(t * 9 + k) * 2; R.pset(Math.round(x + Math.cos(an) * q), Math.round(y + Math.sin(an) * q), c); } };
// un globo de cómic (sin letras: dentro va un dibujo), centrado en (cx, cy), con el rabito hacia abajo en tx
const globo = (cx, cy, w, h, tx) => {
  R.rect(cx - w, cy - h + 2, cx + w, cy + h - 2, K); R.rect(cx - w + 2, cy - h, cx + w - 2, cy + h, K); R.rect(cx - w + 1, cy - h + 1, cx + w - 1, cy + h - 1, K);
  R.rect(cx - w + 1, cy - h + 2, cx + w - 1, cy + h - 2, BL); R.rect(cx - w + 2, cy - h + 1, cx + w - 2, cy + h - 1, BL);
  R.rect(cx - w + 2, cy + h - 1, cx + w - 2, cy + h - 1, hex('#d8d2c4'));
  for (let k = 0; k < 5; k++) { R.rect(tx - 4 + k, cy + h + k, tx + 4 - k, cy + h + k, K); if (k < 4) R.rect(tx - 3 + k, cy + h + k - 1, tx + 3 - k, cy + h + k, BL); }
};
'''

E['nx-gancho'] = ('Gancho', '''// NX-GANCHO (frases 1–2), sin cartela. Seis planos (reparto de encuadres-ep34.md):
// 1. (2026) la ladera entera con el Ararat: dos visitantes llegan a la terraza; en «rock shaped like a ship» un trazo de
//    luz recorre el contorno de la roca y él le hace una foto; en «as long as the ark» se dibuja encima, de proa a popa,
//    la silueta de un barco de madera (vacío: una comparación), igual de larga; la regla se tiende y marca «300» (codos);
// 2. (2026) dentro de la forma: el fundador del grupo entra y señala («insist»: su globo con un barco); la geóloga da dos
//    golpes de martillo a una roca («Geologists»), se vuelve, niega con la cabeza y su globo dice: una piedra;
// 3. (2026) el corte del sondeo: en «2026» el técnico da la orden y el tubo empieza a bajar (no llega a nada); en «back
//    in the news» el arqueólogo levanta la nota de prensa (con su «?») y saltan dos destellos de cámara;
// 4. (2026) el tablero de corcho del estudio: Atom baja de su esquina y recorre las cuatro fichas: en cada casilla vacía
//    se enciende un «?» («Nobody has confirmed it»); en «why» Atom gira en el centro y vuelve a su sitio;
// 5. (1872) la tablilla sobre el fieltro: una mano la limpia con el pincel; en «surprise» un brillo la recorre y las
//    cuñas destellan; en «confirmed» cae una etiqueta con la marca de visto;
// 6. (2026) los tres libros cerrados, iguales, y la tablilla: en «older» la tablilla (solo ella) gana un halo y suelta
//    polvo; en «told by peoples» van llegando los oyentes de espaldas, de muchos lugares.''', COMUN + r'''
const w1 = (s) => en('roca', (s - 0.5) / 14.081), w2 = (s) => en('sorpresa', (s - 16.283) / 12.644);
const P2 = w1(7.1), P3 = w1(12.05), P4 = w1(16.0), P5 = w2(19.8), P6 = w2(24.05);
const comp0 = R.companero; R.companero = (t, e) => { if (t < P4 || t >= P5) comp0(t, e); };   // en el plano 4 Atom baja al tablero

// ── 1 · la ladera: una roca con forma de barco ───────────────────────────────────────────────────────────────────────
const TRAZA = w1(2.82), BARCO = w1(3.82), LARGO = w1(4.46), POSA = w1(5.46), GEN = w1(5.76);
const MAD = hex('#c48c4c'), MADS = hex('#7a4e28'), CREMA = hex('#fff0c4');
// la silueta del barco de madera (vacío: una comparación, no un hallazgo): tan larga como la roca y paralela a su eje
const MADL = hex('#e0aa6a'), CASA = hex('#d8a868'), CASAS = hex('#a87840');
const arca = (sube, a) => {
  const [x0, y0] = T.a_puntoForma(0, 0), [x1, y1] = T.a_puntoForma(1, 0), L = x1 - x0;
  for (let i = 0; i <= L; i++) {
    const s = i / L, x = x0 + i; if (s > a) break;
    const e = Math.abs(2 * s - 1), by = Math.round(lerp(y0, y1, s) - sube);
    const yb = by - Math.round(11 * e ** 4), yt = by - 15 - Math.round(4 * e ** 2.5), roda = e > 0.965, fin = i === 0 || i === L;
    for (let y = yt - (roda ? 4 : 0); y <= yb; y++) { const f = (y - yt + 40) % 4;
      R.pset(x, y, fin || y === yt - (roda ? 4 : 0) || y === yb ? CREMA : roda ? MADS : f === 3 ? MADS : f === 0 ? MADL : i % 9 === 4 && f === 1 ? MADS : MAD); }
    R.pset(x, yb + 1, K); if (!roda) R.pset(x, yt, CREMA);
    if (s > 0.22 && s < 0.78) { const c0 = yt - 9, lado = i === Math.ceil(0.22 * L + 0.01) || i === Math.floor(0.78 * L - 0.01);   // la caseta, con sus ventanucos
      for (let y = c0; y < yt; y++) R.pset(x, y, lado || y === c0 ? CREMA : i % 13 === 0 ? CASAS : y >= c0 + 3 && y <= c0 + 5 && i % 13 > 4 && i % 13 < 9 ? K : (y - c0) % 3 === 2 ? CASAS : CASA); }
    if (s > 0.2 && s < 0.8) { R.pset(x, yt - 12, CREMA); R.pset(x, yt - 11, i % 4 ? MADS : MAD); R.pset(x, yt - 10, MADS); }   // el tejado
  }
  return [x0, y0, x1, y1];
};
const p1 = (t) => {
  const o = { encuadre: 'ladera', epoca: 2026, hora: 'dia', sondeos: 0 };
  T.ladera(R, t, o);
  // con el golpe de la música (0,6 s), un brillo corre por la borda de la roca
  if (t >= 0.6 && t < 1.3) { const d = (t - 0.6) / 0.7; for (let k = -5; k <= 5; k++) { const sq = d + k * 0.012; if (sq < 0 || sq > 1) continue; const [x, y] = T.a_puntoForma(sq, 1); R.pset(x, y, k ? OROL : BL); if (!k) destello(x, y, 3, BL); } }
  // el trazo de luz que recorre el contorno de la roca en «rock shaped like a ship» y se queda punteado
  const u = tramo(t, TRAZA, BARCO + 0.2);
  if (u > 0) for (const r of [-1, 1]) for (let k = 0; k <= 116 * u; k++) { const s = k / 116, [x, y] = T.a_puntoForma(s, r), cab = u < 1 && k > 116 * u - 8, late = Math.sin(t * 5 - k * 0.25) > 0.2;
    if (cab) { R.pset(x, y, BL); R.pset(x, y - 1, OROL); R.pset(x + 1, y, OROL); R.pset(x - 1, y, OROL); R.pset(x, y + 1, ORO); }
    else if (t < LARGO + 0.3 ? (k & 1 || late) : k % 3 === 0 && late) R.pset(x, y, t < LARGO + 0.3 ? OROL : ORO); }
  if (u > 0 && u < 1) { const [hx, hy] = T.a_puntoForma(u, 1), [gx, gy] = T.a_puntoForma(u, -1); destello(hx, hy, 3, BL); destello(gx, gy, 2, OROL); }
  // la silueta del barco de madera baja y se posa encima: igual de larga
  const baja = tramo(t, LARGO, POSA), sube = lerp(41, 36, ease(baja)) + (baja >= 1 ? Math.round(Math.sin((t - POSA) * 2.2) * 1) : 0);
  if (baja > 0) {
    const [x0, y0, x1, y1] = arca(sube, baja >= 1 ? 2 : baja * 1.05);
    if (baja < 1) { const sq = Math.min(1, baja * 1.05), hx = Math.round(lerp(x0, x1, sq)), hy = Math.round(lerp(y0, y1, sq) - sube - 12); destello(hx, hy, 4, BL); destello(hx, hy + 9, 2, OROL); }
    // la regla: de punta a punta, con sus marcas, y las dos plomadas hasta la proa y la popa de la roca
    const m = tramo(t, POSA, POSA + 0.8), L = x1 - x0;
    if (m > 0) {
      for (let i = 0; i <= L * m; i++) { const s = i / L, x = x0 + i, y = Math.round(lerp(y0, y1, s) - sube) + 4; R.pset(x, y, BL); R.pset(x, y + 1, K); if (i % 23 === 0 || i === L) { R.rect(x, y - 3, x, y + 3, BL); R.pset(x + 1, y + 3, K); } else if (i % 23 === 11) R.pset(x, y - 1, BL); }
      for (let y = y0 - sube + 8; y <= y0 - 2; y++) if (Math.floor(y / 2) & 1) { R.pset(x0, Math.round(y), BL); R.pset(x0 + 1, Math.round(y), K); }
      if (m >= 1) for (let y = y1 - sube + 8; y <= y1 - 2; y++) if (Math.floor(y / 2) & 1) { R.pset(x1, Math.round(y), BL); R.pset(x1 + 1, Math.round(y), K); }
    }
    if (t >= GEN) { const q = tramo(t, GEN, GEN + 0.25), ny = Math.round(lerp(y0, y1, 0.5) - sube + 9 - Math.sin(q * Math.PI) * 3), nx = (x0 + x1) >> 1; R.rect(nx - 16, ny - 10, nx + 16, ny + 2, K); R.rect(nx - 15, ny - 9, nx + 15, ny + 1, hex('#2a2634')); R.numero('300', nx, ny, { centro: true }); }
    if (t >= POSA && t < POSA + 0.4) { const d = (t - POSA) / 0.4; for (let k = 0; k < 16; k++) { const s = k / 15; R.pset(Math.round(lerp(x0, x1, s)), Math.round(lerp(y0, y1, s) - sube + 6 + d * 5 + hh(k, 2, 3) * 3), k & 1 ? BL : OROL); } }
  }
  // los dos visitantes de la terraza: ella llega y señala; él le hace una foto en «ship»
  const lle = tramo(t, 0.15, 2.3), ex = Math.round(lerp(-18, 102, lle)), asombro = t >= POSA && t < POSA + 0.9;
  R.actor(EL.turista2NX, ex, 163, t, { dir: 1, anda: lle < 1, dedo: t >= TRAZA - 0.2 && t < LARGO, habla: t >= TRAZA - 0.2 && t < BARCO, sorpresa: asombro, sonrisa: t >= POSA + 0.9, salto: asombro ? Math.round(Math.sin((t - POSA) / 0.9 * Math.PI) * 4) : 0 });
  const foto = t >= BARCO - 0.6 && t < LARGO + 0.5, tx = 198;
  const tu = R.actor(EL.turista1NX, tx, 163, t, { dir: -1, sostiene: foto ? [tx - 3, 144] : false, sorpresa: asombro, sonrisa: !asombro && t >= BARCO + 0.2, dedo: t >= POSA + 0.9 });
  if (foto && tu && tu.mano) { const [mx, my] = tu.mano; R.rect(mx - 5, my - 4, mx + 3, my + 2, K); R.rect(mx - 4, my - 3, mx + 2, my + 1, hex('#4a4a5a')); R.rect(mx - 3, my - 5, mx - 1, my - 4, K); R.pset(mx - 3, my - 1, hex('#8ad0f0')); R.pset(mx - 2, my - 1, BL);
    if (t >= BARCO + 0.13 && t < BARCO + 0.33) { R.disco(mx - 5, my - 3, 4, BL); destello(mx - 5, my - 3, 8, BL); destello(mx - 5, my - 3, 5, OROL); } }
  T.laderaDelante(R, t, o);
};

// ── 2 · dentro de la forma: uno señala, la otra niega ────────────────────────────────────────────────────────────────
const INSIST = w1(8.13), NOE = w1(8.83), GEO = w1(10.2), GEO2 = w1(10.62), SOLO = w1(11.16);
const ROCA = ['.....kkkkkk.......', '...kkLLLLRRkkk....', '..kLLLRRRRRRRRkk..', '.kLLRRRRRkRRRRRRk.', '.kLRRRRRRRkRRRrrk.', 'kLRRRkRRRRRRRrrrrk', 'kRRRRRkRRRRRrrrrrk', 'kRRRRRRRRRRrrrrrrk', 'kRRrRRRRRrrrrrrrrk', 'kkrrrrrrrrrrrrrkkk', '..kkkkkkkkkkkkk...'];
const PIEDRA = ['...kkkkk....', '.kkLLLLRkk..', 'kLLLRRRRRRk.', 'kLRRRRRRrrrk', 'kRRRRRRrrrrk', 'kRRRrrrrrrrk', '.kkrrrrrrkk.', '...kkkkkk...'];
const PALR = { k: K, L: hex('#d89a78'), R: hex('#b06a4c'), r: hex('#7e4634') };
const p2 = (t) => {
  const o = { encuadre: 'ladera', camara: 'cerca', epoca: 2026, hora: 'dia' };
  T.ladera(R, t, o);
  // la roca que asoma del suelo, donde golpea la geóloga, y su sombra
  for (let i = 0; i < 22; i++) if (i & 1) R.pset(231 + i, 161, hex('#5a4030'));
  R.dibujo(ROCA, 232, 150, 1, PALR);
  // el fundador llega y señala: «insist it is Noah's Ark»
  const lle = tramo(t, P2 + 0.4, P2 + 1.1), cerca = tramo(t, GEO - 0.2, GEO + 0.45), fx = Math.round(lerp(34, 96, ease(lle)) + 16 * cerca), ins = (t >= INSIST - 0.1 && t < GEO - 0.3) || t >= SOLO + 0.95;
  R.actor(EL.fundadorNX, fx, 160, t, { dir: 1, anda: (lle > 0 && lle < 1) || (cerca > 0 && cerca < 1), dedo: ins, habla: ins, sonrisa: ins, salto: t >= NOE && t < NOE + 0.4 ? Math.round(Math.sin((t - NOE) / 0.4 * Math.PI) * 4) : 0 });
  if (t >= NOE - 0.05) { const q = tramo(t, NOE - 0.05, NOE + 0.15), by = Math.round(118 - q * 6); globo(fx + 9, by, 13, 10, fx + 8); R.icono('barco', fx + 3, by - 6, hex('#8a5a2c'), hex('#d8c8a8'), 2); }
  // la geóloga: dos golpes de martillo a la roca, se vuelve y niega con la cabeza
  const gx = 206, alza = tramo(t, GEO - 0.5, GEO - 0.15), gol = Math.max(0, 1 - Math.abs(t - GEO) / 0.1, 1 - Math.abs(t - GEO2) / 0.1), vuelta = t >= SOLO - 0.2;
  const niega = t >= SOLO && t < SOLO + 0.95 ? Math.round(Math.sin((t - SOLO) * Math.PI * 2 * 3.2) * 2) : 0;
  const mano = vuelta ? [gx - 6, 153] : [gx + 21, Math.round(lerp(147, 139, alza) + gol * 9)];
  const ge = R.actor(EL.geologa3NX, gx + niega, 160, t, { dir: vuelta ? -1 : 1, sostiene: mano, habla: t >= SOLO && t < SOLO + 0.95 });
  if (ge && ge.mano) { const [mx, my] = ge.mano; PZ.martillo(R, mx + (vuelta ? -4 : 3), my + (vuelta ? 4 : 7), { dir: vuelta ? -1 : 1 }); }
  for (const g0 of [GEO, GEO2]) if (t >= g0 && t < g0 + 0.4) { const d = (t - g0) / 0.4; destello(236, 149, d < 0.3 ? 3 : 1, BL);
    for (let k = 0; k < 6; k++) { const an = -0.4 - k * 0.45; R.pset(Math.round(236 + Math.cos(an) * d * (10 + k * 2)), Math.round(149 + Math.sin(an) * d * 12 + d * d * 14), k & 1 ? PALR.L : PALR.r); } }
  if (t >= SOLO - 0.05) { const q = tramo(t, SOLO - 0.05, SOLO + 0.15), by = Math.round(118 - q * 6); globo(gx + 6, by, 13, 10, gx + 8); R.dibujo(PIEDRA, gx, by - 4, 1, PALR); }
  T.laderaDelante(R, t, o);
};

// ── 3 · el sondeo: en 2026 vuelve a ser noticia ──────────────────────────────────────────────────────────────────────
const Y26 = w1(12.42), VUELVE = w1(13.6), NOTI = w1(14.08), FL2 = w1(14.75);
const p3 = (t) => {
  const baja = tramo(t, Y26 + 0.35, P4 + 0.4), o = { encuadre: 'corte', camara: 'sondeo', fondo: 0.3 * baja, trozos: 0, gira: t >= Y26 + 0.35 };
  T.ladera(R, t, o);
  // el técnico da la orden de arrancar en «2026» y vigila el tubo
  const orden = t >= Y26 - 0.1 && t < Y26 + 0.9;
  R.actor(EL.tecnicoNX, 140, 52, t, { dir: t >= NOTI - 0.2 && t < FL2 + 0.5 ? -1 : 1, dedo: orden, habla: orden, sonrisa: t >= VUELVE, sorpresa: t >= NOTI && t < NOTI + 0.4 });
  // el arqueólogo llega con la nota de prensa y la levanta en «back in the news»
  const lle = tramo(t, P3 + 0.1, VUELVE - 0.3), ax = Math.round(lerp(14, 88, lle)), alto = ease(tramo(t, VUELVE - 0.1, VUELVE + 0.3));
  const ar = R.actor(EL.arqueologoNX, ax, 52, t, { dir: lle < 1 ? 1 : -1, anda: lle > 0 && lle < 1, sostiene: lle < 1 ? [ax + 17, 40] : [ax - 4, Math.round(lerp(40, 31, alto))], habla: t >= VUELVE && t < NOTI + 0.5 });
  if (ar && ar.mano) { const [mx, my] = ar.mano; PZ.notaPrensa(R, mx + (lle < 1 ? 3 : -3), my + 6, {}); }
  // los destellos de las cámaras, desde la izquierda
  for (const [f0, fx, fy] of [[NOTI, 40, 36], [FL2, 58, 30]]) if (t >= f0 && t < f0 + 0.22) { R.disco(fx, fy, 3, BL); destello(fx, fy, 9, BL); destello(fx, fy, 5, OROL); }
  T.laderaDelante(R, t, o);
};

// ── 4 · el tablero: nadie lo ha confirmado ───────────────────────────────────────────────────────────────────────────
const NADIE = w2(16.28), CONF = w2(17.22), WHY = w2(18.28);
const CAS = [[183, 68], [131, 68], [79, 68], [27, 68]], TQ = [NADIE + 0.05, w2(16.54), w2(16.8), w2(17.22)];
const ruta4 = (t) => {   // por dónde va Atom: de su esquina a la cuarta ficha, de ficha en ficha, al centro y de vuelta
  const N = [[P4, 297, 24], [NADIE, 189, 100], [TQ[1], 137, 98], [TQ[2], 85, 100], [TQ[3], 33, 98], [WHY - 0.15, 152, 112], [WHY + 0.75, 152, 112], [P5 - 0.25, 297, 24], [P5 + 9, 297, 24]];
  for (let k = 0; k < N.length - 1; k++) if (t < N[k + 1][0]) { const u = ease(tramo(t, N[k][0], N[k + 1][0])), arco = k === 0 || k === 6 ? 0 : k === 4 ? 14 : 7; return [lerp(N[k][1], N[k + 1][1], u), lerp(N[k][2], N[k + 1][2], u) - Math.sin(u * Math.PI) * arco, k, u]; }
  return [297, 24, 9, 1];
};
const p4 = (t) => {
  const o = { encuadre: 'lista', hechas: 0 };
  T.hoy(R, t, o);
  // los «?» de las cuatro casillas vacías, uno tras otro
  CAS.forEach(([x0, y0], k) => { if (t < TQ[k]) return; const d = t - TQ[k], late = Math.sin(t * 6 - k) > 0;
    if (d < 0.5) { const r = Math.round(7 + d * 14); for (let a = 0; a < 16; a++) { const an = a * Math.PI / 8; R.pset(Math.round(x0 + 6 + Math.cos(an) * r), Math.round(y0 + 6 + Math.sin(an) * r), a & 1 ? ORO : ROJO); } }
    R.rect(x0 - 1, y0 - 1, x0 + 13, y0 - 1, late ? ROJO : hex('#f08a4a')); R.rect(x0 - 1, y0 + 13, x0 + 13, y0 + 13, late ? ROJO : hex('#f08a4a')); R.rect(x0 - 1, y0, x0 - 1, y0 + 12, late ? ROJO : hex('#f08a4a')); R.rect(x0 + 13, y0, x0 + 13, y0 + 12, late ? ROJO : hex('#f08a4a'));
    R.icono('?', x0 + 4, y0 + 3 - (d < 0.2 ? 1 : 0), ROJO, null, 1); });
  T.hoyDelante(R, t, o);
  // Atom, de ficha en ficha
  const [ax, ay, k, u] = ruta4(t), vuela = k === 0 || k === 6, gira = t >= WHY - 0.1 && t < WHY + 0.75;
  if (vuela || (k >= 1 && k <= 5 && u < 1)) for (let j = 1; j <= 6; j++) { const [qx, qy] = ruta4(t - j * 0.035); R.pset(Math.round(qx), Math.round(qy), hex('#c8f0ff')); if (j & 1) R.pset(Math.round(qx) + 1, Math.round(qy) + 1, BL); }
  if (k >= 7) comp0(t, E.energia(t)); else atomAbajo(ax, ay + (vuela ? 0 : Math.sin(t * 5) * 1.2), t, { r: Math.round(lerp(10, 12, vuela ? (k === 0 ? u : 1 - u) : 1)), e: gira || vuela ? 0.8 : 0.5, vel: gira ? 3 : 1 });
  if (gira) { chispas(ax, ay, t, 21, 10, hex('#c8f0ff')); const q = tramo(t, WHY - 0.1, WHY + 0.1); R.icono('?', Math.round(ax) + 18, Math.round(ay - 14 - q * 5), ORO, K, 2); }
};

// ── 5 · la tablilla: la sorpresa que sí está comprobada ──────────────────────────────────────────────────────────────
const SORP = w2(22.0), SI = w2(23.23);
const p5 = (t) => {
  const o = { encuadre: 'sala', camara: 'tablilla', unidos: 1, dibujo: 0 };
  const g = T.museo(R, t, o), [tx0, ty0, tx1, ty1] = g.tablilla;
  // el brillo que recorre la tablilla en «surprise» (solo dentro de ella) y los destellos que se quedan
  const q = tramo(t, SORP - 0.1, SORP + 1.0);
  if (q > 0 && q < 1) { const bx = lerp(tx0 - 26, tx1 + 26, q);
    for (let y = ty0 + 2; y <= ty1 - 2; y++) for (let d = -11; d <= 11; d++) { const x = Math.round(bx + d - (y - 84) * 0.35); if (x < tx0 + 2 || x > tx1 - 2) continue; const c = R.pget(x, y); if (((c >>> 8) & 255) >= (c & 255) + 8) continue; R.pset(x, y, mez(c, OROL, 0.62 * (1 - Math.abs(d) / 12))); } }
  // …y se queda encendida: un halo dorado sobre el fieltro, pegado a su borde roto, y destellos en las cuñas
  if (q > 0) { const lim = lerp(tx0 - 26, tx1 + 26, q) + 6, late = 0.8 + 0.2 * Math.sin(t * 3.4);
    for (let y = ty0 - 9; y <= ty1 + 9; y++) for (let x = tx0 - 9; x <= Math.min(tx1 + 9, lim); x++) { const c = R.pget(x, y); if (((c >>> 8) & 255) < (c & 255) + 8) continue;
      const d = Math.max(3.5, Math.hypot(Math.max(tx0 - x, 0, x - tx1), Math.max(ty0 - y, 0, y - ty1))); if (d < 9.5) R.pset(x, y, mez(c, d < 2 ? OROL : ORO, 0.62 * late * (1 - d / 10))); }
    for (let k = 0; k < 14; k++) { const sx = tx0 + 8 + hh(k, 1, 5) * (tx1 - tx0 - 16), sy = ty0 + 10 + hh(k, 2, 5) * (ty1 - ty0 - 20), f = (t * 1.3 + hh(k, 3, 5) * 3) % 1.5; if (sx > lim - 8) continue; if (f < 0.6) destello(sx, sy, f < 0.12 || f > 0.48 ? 1 : f < 0.22 || f > 0.38 ? 2 : 4, k % 3 ? OROL : BL); } }
  // la etiqueta con la marca de visto, en «confirmed»
  if (t >= SI - 0.25) { const c = tramo(t, SI - 0.25, SI), ey = Math.round(lerp(120, 151, c * c)), bota = t >= SI && t < SI + 0.3 ? Math.round(Math.sin((t - SI) / 0.3 * Math.PI) * 2) : 0, x0 = 196, y0 = ey - 12 - bota;
    for (let i = 0; i < 44; i++) if (i & 1) R.pset(x0 + 3 + i, 165, hex('#3a2a1a'));
    R.rect(x0 - 1, y0 - 1, x0 + 46, y0 + 25, K); R.rect(x0, y0, x0 + 45, y0 + 24, hex('#f4ecd4')); R.rect(x0, y0 + 22, x0 + 45, y0 + 24, hex('#d8ccac')); R.rect(x0 + 45, y0, x0 + 45, y0 + 24, hex('#d8ccac'));
    R.disco(x0 + 6, y0 + 12, 2, K); R.disco(x0 + 6, y0 + 12, 1, hex('#8a6a3a')); for (let i = 0; i < 12; i++) R.pset(x0 + 4 - i, y0 + 12 + Math.round(Math.sin(i * 0.6) * 2), hex('#b83a2a'));
    if (t >= SI) { T.visto(R, x0 + 16, y0 + 9, 2); if (t < SI + 0.35) { const d = (t - SI) / 0.35; for (let a = 0; a < 10; a++) { const an = a * Math.PI / 5; R.pset(Math.round(x0 + 26 + Math.cos(an) * (14 + d * 12)), Math.round(y0 + 12 + Math.sin(an) * (9 + d * 8)), a & 1 ? ORO : hex('#6ad86a')); } } } }
  // la mano que la limpia con el pincel: barre el borde, se para en «surprise» y se aparta
  const barre = t < SORP - 0.25, fuera = ease(tramo(t, SORP - 0.25, SORP + 0.25)), vai = barre ? Math.sin((t - P5) * 5.2) : 0;
  const wx = Math.round(lerp(80 + vai * 7, 62, fuera)), wy = Math.round(lerp(148 - vai * 3, 157, fuera));
  // el pincel: el mango, la virola y las cerdas, que salen del puño hacia la tablilla
  const px1 = wx + 27, py1 = wy - 15;
  for (let i = 0; i <= 20; i++) { const x = Math.round(lerp(wx + 3, px1 - 6, i / 20)), y = Math.round(lerp(wy - 1, py1 + 3, i / 20)); R.rect(x - 1, y - 2, x + 2, y + 2, K); }
  for (let i = 0; i <= 20; i++) { const x = Math.round(lerp(wx + 3, px1 - 6, i / 20)), y = Math.round(lerp(wy - 1, py1 + 3, i / 20)); R.rect(x, y - 1, x + 1, y + 1, i > 15 ? hex('#c8c8d0') : hex('#a8642a')); R.pset(x, y - 1, i > 15 ? BL : hex('#d8943a')); }
  for (let i = 0; i < 7; i++) { const x = px1 - 5 + i, y = py1 + 3 - Math.round(i * 0.55); R.rect(x - 1, y - 3, x + 1, y + 2, K); }
  for (let i = 0; i < 7; i++) { const x = px1 - 5 + i, y = py1 + 3 - Math.round(i * 0.55); R.rect(x, y - 2, x, y + 1, i > 4 ? hex('#f4e4b8') : hex('#d8b878')); }
  T.brazo(R, 26, 181, wx, wy, '#3e4e74', 1, { codo: [44, 170] });
  if (barre) for (let k = 0; k < 7; k++) { const f = (t * 1.6 + hh(k, 4, 9)) % 1; R.pset(Math.round(px1 + 2 + f * (8 + hh(k, 5, 9) * 14)), Math.round(py1 - f * (6 + hh(k, 6, 9) * 10) + f * f * 8), k & 1 ? hex('#e4c090') : hex('#c89a6a')); }
  T.museoDelante(R, t, o);
};

// ── 6 · tres libros y una tablilla más vieja ─────────────────────────────────────────────────────────────────────────
const VIEJA = w2(24.5), PUEBLOS = w2(26.45), LEJOS = w2(28.4);
const p6 = (t) => {
  const o = { encuadre: 'diluvio', camara: 'libros', cuantos: 3, tablilla: true, gente: ease(tramo(t, PUEBLOS - 0.3, LEJOS)) };
  T.relato(R, t, o);
  // el halo de la tablilla (solo ella: los tres libros quedan con la misma luz) y el polvo que suelta
  const a = tramo(t, VIEJA - 0.1, VIEJA + 0.5), X0 = 268, X1 = 302, Y0 = 95, Y1 = 138;
  if (a > 0) { const late = 0.75 + 0.25 * Math.sin((t - VIEJA) * 3.4), al = 8 * a * late;
    for (let y = Y0 - 9; y <= Y1 + 2; y++) for (let x = X0 - 9; x <= X1 + 9; x++) { const dx = Math.max(X0 - x, 0, x - X1), dy = Math.max(Y0 - y, 0, y - Y1), d = Math.hypot(dx, dy); if (d <= 0 || d > al) continue; R.pset(x, y, mez(R.pget(x, y), d < 2 ? OROL : ORO, 0.7 * (1 - d / (al + 1)))); }
    if (t < VIEJA + 0.9) { const d = (t - VIEJA + 0.1) / 1.0, r = 10 + d * 22; for (let k = 0; k < 28; k++) { const an = k * Math.PI / 14, x = Math.round(285 + Math.cos(an) * r * 0.8), y = Math.round(116 + Math.sin(an) * r); if (x > 258 && x < 318 && y < 150 && (k + Math.floor(t * 12)) & 1) R.pset(x, y, OROL); } }
    for (let k = 0; k < 5; k++) { const f = (t * 0.9 + hh(k, 1, 6) * 2) % 1.2; if (f < 0.45) destello(X0 + 4 + hh(k, 2, 6) * 26, Y0 + 5 + hh(k, 3, 6) * 34, f < 0.1 || f > 0.35 ? 1 : 2, k & 1 ? BL : OROL); }
    for (let k = 0; k < 8; k++) { const f = (t * 0.5 + hh(k, 4, 6)) % 1; R.pset(Math.round(X0 + 2 + hh(k, 5, 6) * 30 + Math.sin(t * 2 + k) * 2), Math.round(Y1 + 1 + f * 9), f < 0.6 ? hex('#e4c090') : hex('#b89a70')); } }
  T.relatoDelante(R, t, o);
};

const efectos = [[TRAZA, 'brillo'], [BARCO + 0.13, 'flash'], [POSA, 'golpecito'], [NOE, 'pop'], [GEO, 'toc'], [GEO2, 'toc'], [Y26 + 0.35, 'arranque'], [NOTI, 'flash'], [NADIE + 0.05, 'bip'], [WHY - 0.1, 'pop'], [SORP - 0.1, 'brillo'], [SI, 'sello']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: (t) => (t >= P5 && t < P6 ? 1872 : 2026) });
''')

E['nx-hola'] = ('Hola', '''// NX-HOLA (frase 3), sin cartela. Un plano: el estudio de Atom, con la pecera en el escritorio (gag 1). Atom ha bajado con
// un barquito de papel; bota en «I'm Atom»; en «explain» lo lleva sobre la pecera y lo suelta: chapuzón, el pez huye al
// fondo; en «wondered about» el pez sube, se para debajo y lo mira con desconfianza (un «?» sobre la pecera) y se aparta;
// en «Let's find out» Atom vuelve de un salto a su esquina, con su estela.''', COMUN + r'''
R.companero = () => {};   // Atom está en el plano: baja a la mesa y al final vuelve a su esquina
const wh = (s) => en('hola', (s - 0.5) / 4.588);
const ATOM = wh(0.66), EXPLICA = wh(1.36), SUELTA = wh(1.86), DUDA = wh(2.98), VAMOS = wh(4.17), CHOF = SUELTA + 0.28;
const p1 = (t) => {
  const o = { encuadre: 'estudio', pez: false };
  T.hoy(R, t, o);
  const d = T.hoyDelante(R, t, o), [wx, wy] = d.agua;
  // el pez: nada a sus cosas; con el chapuzón huye al fondo; luego sube despacio, se para debajo del barquito y lo mira
  let fx, fy, fdir, mira = false;
  if (t < CHOF) { fx = wx + Math.sin(t * 1.5) * 8; fy = wy + 11 + Math.sin(t * 2.3) * 1.5; fdir = Math.cos(t * 1.5) >= 0 ? 1 : -1; }
  else if (t < DUDA - 0.5) { const u = ease(tramo(t, CHOF, CHOF + 0.3)); fx = lerp(wx + Math.sin(CHOF * 1.5) * 8, wx - 8, u); fy = lerp(wy + 11, wy + 19, u) + Math.sin(t * 14) * 0.6; fdir = -1; }
  else if (t < VAMOS - 0.3) { const u = ease(tramo(t, DUDA - 0.5, DUDA)); fx = lerp(wx - 8, wx - 3, u); fy = lerp(wy + 19, wy + 8, u); fdir = 1; mira = true; }
  else { const u = ease(tramo(t, VAMOS - 0.3, VAMOS + 0.3)); fx = lerp(wx - 3, wx - 9, u); fy = lerp(wy + 8, wy + 13, u) + Math.sin(t * 2.3); fdir = 1; mira = true; }
  T.g_pez(R, Math.round(fx), Math.round(fy), 4, t, { dir: fdir, mira });
  if (t >= CHOF && t < DUDA - 0.5) for (let k = 0; k < 4; k++) { const f = (t - CHOF) * 1.6 - k * 0.12; if (f > 0 && f < 1) R.pset(Math.round(fx + 5 + k), Math.round(fy - f * 9), hex('#d8f4ff')); }
  // Atom: bota en «I'm Atom», lleva el barquito sobre la pecera, lo suelta y en «Let's find out» vuelve a su esquina
  const hx = 112, hy = 84, sal = t > ATOM - 0.1 && t < EXPLICA ? Math.round(Math.abs(Math.sin((t - ATOM + 0.1) * Math.PI * 2.4)) * 9 * Math.max(0.3, 1 - (t - ATOM))) : 0;
  const lleva = ease(tramo(t, EXPLICA, SUELTA - 0.1)), cx0 = lerp(hx, wx - 2, lleva), cy0 = lerp(hy, 72, lleva);
  const v = tramo(t, VAMOS + 0.15, E.duracion - 0.35), e = ease(v);
  const pos = (vv) => { const ee = ease(vv); return [lerp(118, 297, ee), lerp(76, 24, ee) - Math.sin(vv * Math.PI) * 16]; };
  const aparta = ease(tramo(t, SUELTA + 0.1, SUELTA + 0.6)), AX = 118, AY = 76;
  const [px, py] = v > 0 ? pos(v) : [lerp(cx0, AX, aparta), lerp(cy0, AY, aparta)], ax = px, ay = py - sal + (v < 1 ? Math.sin(t * 2.6) * 2 : Math.round(1.4 * Math.sin(2 * Math.PI * t / 2.6)));
  // el barquito: colgado del resplandor de Atom, cae y queda flotando en la pecera
  const cae = tramo(t, SUELTA, CHOF);
  if (cae <= 0) { const bx = Math.round(ax + 2), by = Math.round(ay + 26); for (let k = 0; k < 4; k++) R.pset(bx - 5 + k * 3, by - 12 + ((k + Math.floor(t * 8)) & 1), hex('#c8f0ff')); T.g_barquito(R, bx, by, 10, t, { quieto: true, ondas: false }); }
  else if (cae < 1) T.g_barquito(R, wx, Math.round(lerp(98, wy, cae * cae)), 10, t, { quieto: true, ondas: false });
  else { T.g_barquito(R, wx, wy, 10, t, {});
    if (t < CHOF + 0.45) { const s = (t - CHOF) / 0.45; for (let k = 0; k < 10; k++) { const an = Math.PI * (1.08 + 0.84 * k / 9), r = 5 + s * 14; R.pset(Math.round(wx + Math.cos(an) * r), Math.round(wy + Math.sin(an) * r * 1.1 + s * s * 12), k & 1 ? hex('#d8f4ff') : hex('#8ad0f0')); } } }
  // el «?» del pez, en su globo de pensar, sobre la pecera
  if (t >= DUDA - 0.05 && t < VAMOS + 0.6) { const q = tramo(t, DUDA - 0.05, DUDA + 0.15), gx = wx + 17, gy = Math.round(80 - q * 5 - Math.sin(t * 5) * 1), r = Math.round(4 + q * 7);
    R.disco(wx + 8, 93, 2, K); R.disco(wx + 8, 93, 1, BL); R.disco(wx + 11, 89, 3, K); R.disco(wx + 11, 89, 2, BL);
    R.disco(gx, gy, r + 1, K); R.disco(gx, gy, r, BL); if (q >= 1) R.icono('?', gx - 4, gy - 7, ROJO, null, 2); }
  if (v > 0 && v < 1) for (let k = 1; k <= 7; k++) { const [qx, qy] = pos(Math.max(0, v - k * 0.04)); R.pset(Math.round(qx), Math.round(qy), hex('#c8f0ff')); if (k % 2) R.pset(Math.round(qx) + 1, Math.round(qy) + 1, BL); }
  atomAbajo(ax, ay, t, { r: Math.round(lerp(12, 10, e)) + (sal > 3 ? 1 : 0), e: sal > 0 || (v > 0 && v < 1) ? 0.8 : 0.4, vel: 1 });
  if (sal > 2) chispas(ax, ay, t, 20, 10, hex('#c8f0ff'));
};
const efectos = [[ATOM, 'pop'], [CHOF, 'chof'], [DUDA, 'burbujas'], [VAMOS + 0.15, 'boing']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')
