E = {}

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nv-grabado'] = ('El grabado', '''// NV-GRABADO (frase 15), 1848 → 1850, sin cartela. Cuatro planos:
// 1. Windsor, el salón (0 → «London»): los niños entran corriendo hacia el árbol de velas; el príncipe Alberto cuelga
//    una bola roja; la reina lo señala; junto a la chimenea un pintor dibuja la escena en su caballete («a picture»): el
//    boceto se va completando; el spaniel mueve la cola;
// 2. el árbol de cerca («London newspaper» → «two»): la escena se vuelve un grabado de periódico en sepia («newspaper
//    showed»); dentro de la estampa la reina señala («Queen Victoria»), Alberto se inclina («Prince Albert») y los niños
//    saltan («around a tree»); un rodillo de tinta pasa por delante y deja la página impresa («Windsor Castle»);
// 3. el taller del grabador americano en 1850 («two years later» → «The»): el aprendiz entra con el periódico de Londres
//    («American magazine»), el grabador lo coge, se vuelve al tablero y lo copia («reprinted»: la estampa aparece en su
//    plancha), y a «one small change» se para, levanta el dedo y salta un «!»;
// 4. inserto: la revista abierta sobre la mesa del grabador con la estampa al doble; entra una lupa («The Queen's
//    crown») que aumenta la cabeza de la reina: la corona se deshace en polvo («was gone»); la vela tiembla.''', r'''
const g = (f) => en('grabado', f);
const P2 = g(0.2577), P3 = g(0.6072), P4 = g(0.8972);
const foto = g(0.1064), anyo = g(0.1754), papel = g(0.2729), reina = g(0.3388), alberto = g(0.4173), alrededor = g(0.4591), castillo = g(0.5249);
const revista = g(0.6933), reimprime = g(0.7313), cambio = g(0.7921), corona = g(0.9289), ido = g(0.9694);
const K = T.C.k;
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / (a1 - a0)));
const spr = (filas, x, y, pal, s = 1) => filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = pal[f[i]]; if (c != null) R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); } });

// ── la estampa de Windsor: se pinta una vez en tres búferes (el periódico de Londres; la revista americana con
// corona y sin ella), con la reina y Alberto juntos delante del árbol
let B1 = null, B2 = null, B3 = null, CORONA = [70, 140];
const estampa = () => {
  if (B1) return;
  const pinta = (c, rev) => {
    const o = { encuadre: 'windsor', camara: 'arbol' };
    T.epoca(R, 2.2, o);
    R.actor(EL.ninaVictoriana, 50, 166, 2.2, { dir: 1, sonrisa: true });
    R.actor(EL.victoria, 70, 166, 2.2, { dir: 1, sonrisa: true, corona: c });
    R.actor(EL.alberto, 90, 166, 2.2, { dir: -1, sonrisa: true });
    R.actor(EL.ninoVictoriano, 110, 166, 2.2, { dir: -1, sonrisa: true });
    T.epocaDelante(R, 2.2, { ...o, grabado: 1, revista: rev });
  };
  B1 = R.nuevo(); B2 = R.nuevo(); B3 = R.nuevo();
  const prev = R.usar(B1); pinta(true, false); R.usar(B2); pinta(true, true); R.usar(B3); pinta(false, true); R.usar(prev);
  // dónde está la corona: lo que cambia entre los dos búferes de la revista
  let x0 = 320, y0 = 180, x1 = 0, y1 = 0;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (B2[y * 320 + x] !== B3[y * 320 + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  if (x1 >= x0) CORONA = [(x0 + x1) >> 1, (y0 + y1) >> 1];
};
const px1 = (x, y) => B1[y * 320 + x];

// ── 1. el salón de Windsor
const p1 = (t) => {
  T.epoca(R, t, { encuadre: 'windsor' });
  // el caballete del pintor (delante de la chimenea): patas, lienzo y el boceto que avanza
  const cx0 = 58, cy0 = 112, cw = 26, ch = 20, u = lin(t, foto - 1.2, P2 - 0.4);
  R.linea(cx0 + 3, cy0 + ch, cx0 - 1, 160, K); R.linea(cx0 + 4, cy0 + ch, cx0, 160, hex('#8a5a30'));
  R.linea(cx0 + cw - 3, cy0 + ch, cx0 + cw + 1, 160, K); R.linea(cx0 + cw - 4, cy0 + ch, cx0 + cw, 160, hex('#8a5a30'));
  R.linea(cx0 + 13, cy0 - 4, cx0 + 13, 158, K); R.rect(cx0 - 2, cy0 + ch + 1, cx0 + cw + 2, cy0 + ch + 3, K); R.rect(cx0 - 1, cy0 + ch + 2, cx0 + cw + 1, cy0 + ch + 2, hex('#a8743c'));
  R.rect(cx0 - 1, cy0 - 1, cx0 + cw + 1, cy0 + ch + 1, K); R.rect(cx0, cy0, cx0 + cw, cy0 + ch, hex('#f4ecd8'));
  for (let y = cy0 + 2; y < cy0 + ch; y += 3) R.rect(cx0 + 1, y, cx0 + 2, y, hex('#e0d4b8'));
  // el boceto: el árbol, la mesa y las figuras, trazo a trazo
  const ax = cx0 + 13, top = cy0 + 3;
  for (let j = 0; j < 12; j++) { if (j / 12 > u * 1.6) break; const w = Math.round(j * 0.6); R.rect(ax - w, top + j, ax + w, top + j, j % 3 === 2 ? hex('#3a6a3a') : hex('#5a8a4a')); }
  if (u > 0.55) { R.rect(ax - 8, top + 13, ax + 8, top + 14, hex('#8a5a3a')); }
  if (u > 0.7) { R.rect(cx0 + 3, top + 9, cx0 + 4, top + 15, hex('#3a3a5a')); R.pset(cx0 + 3, top + 8, hex('#e8b830')); }
  if (u > 0.85) { R.rect(cx0 + cw - 4, top + 9, cx0 + cw - 3, top + 15, hex('#24304a')); }
  for (const [k, v] of [[0, 0.2], [1, 0.4], [2, 0.6]]) if (u > v) R.pset(ax - 3 + k * 3, top + 4 + k * 2, hex('#c8303a'));
  // el pintor: dibuja con el lápiz en el lienzo, de arriba abajo
  const pin = R.actor(EL.impresor, 34, 160, t, { dir: 1, sostiene: [cx0 - 1, Math.round(cy0 + 6 + Math.abs(Math.sin(t * 3)) * 8)], habla: false });
  R.linea(pin.mano[0] - 1, pin.mano[1] + 2, pin.mano[0] + 3, pin.mano[1] - 3, K); R.pset(pin.mano[0] + 3, pin.mano[1] - 3, hex('#3a3a5a'));
  // los niños entran corriendo y saltan delante del árbol
  const n1 = lin(t, 0.2, 1.8), n2 = lin(t, 0.5, 2.3);
  const salta = (t0) => (t > t0 && t < t0 + 0.5 ? Math.round(Math.sin((t - t0) / 0.5 * Math.PI) * 4) : 0);
  R.actor(EL.ninaVictoriana, Math.round(lerp(-18, 132, n1)), 160, t, { dir: 1, anda: n1 > 0 && n1 < 1, sonrisa: true, salto: salta(foto + 0.1), dedo: t > foto + 0.7 });
  R.actor(EL.ninoVictoriano, Math.round(lerp(330, 228, n2)), 160, t, { dir: -1, anda: n2 > 0 && n2 < 1, sonrisa: true, salto: salta(foto + 0.3) });
  // la reina señala el árbol; Alberto cuelga una bola roja en una rama
  R.actor(EL.victoria, 106, 160, t, { dir: 1, sonrisa: true, dedo: t > anyo - 0.2 && t < P2 - 0.3 });
  const cuelga = lin(t, 0.9, 2.0), bx = 182, by = 96;
  const al = R.actor(EL.alberto, 204, 160, t, { dir: -1, sonrisa: cuelga >= 1, sostiene: cuelga < 1 ? [Math.round(lerp(196, bx, cuelga)), Math.round(lerp(128, by + 2, cuelga))] : false });
  const [bxx, byy] = cuelga < 1 ? [al.mano[0], al.mano[1] - 2] : [bx, by];
  R.linea(bxx, byy - 3, bxx, byy - 1, hex('#e8b830')); R.disco(bxx, byy + 1, 2, K); R.disco(bxx, byy + 1, 1, hex('#d8303a')); R.pset(bxx - 1, byy, hex('#ffb0b0'));
  if (cuelga >= 1 && t < 2.4) for (const [dx, dy] of [[-4, -2], [4, -2], [0, -5]]) R.pset(bx + dx, by + dy, hex('#fff4c0'));
  T.epocaDelante(R, t, { encuadre: 'windsor' });
};

// ── 2. el árbol de cerca: se vuelve grabado de periódico
const p2 = (t) => {
  const gr = lin(t, papel, papel + 0.9), o = { encuadre: 'windsor', camara: 'arbol', grabado: gr };
  T.epoca(R, t, o);
  const salta = (t0, k) => (t > t0 + k && t < t0 + k + 0.45 ? Math.round(Math.sin((t - t0 - k) / 0.45 * Math.PI) * 4) : 0);
  R.actor(EL.ninaVictoriana, 26, 166, t, { dir: 1, sonrisa: true, salto: salta(alrededor, 0) });
  R.actor(EL.victoria, 48, 166, t, { dir: 1, sonrisa: true, dedo: t > reina && t < reina + 1.5 });
  R.actor(EL.ninoVictoriano, 252, 166, t, { dir: -1, sonrisa: true, salto: salta(alrededor, 0.25) });
  const inclina = t > alberto && t < alberto + 0.9;
  R.actor(EL.alberto, 272, 166 + (inclina ? 1 : 0), t, { dir: -1, sonrisa: true, habla: inclina, brazos: inclina && t < alberto + 0.4 });
  T.epocaDelante(R, t, o);
  // el rodillo de tinta pasa de izquierda a derecha y deja la página impresa (a «Windsor Castle»)
  const r = lin(t, castillo - 0.3, castillo + 0.9);
  if (r > 0 && r < 1) {
    const x = Math.round(lerp(-30, 350, r));
    R.rect(x - 8, 4, x + 8, 175, hex('#1a1416'));
    for (let y = 6; y < 174; y += 4) R.rect(x - 7, y, x + 7, y + 1, y % 8 ? hex('#2e2628') : hex('#463a3c'));
    R.rect(x - 7, 4, x - 6, 175, hex('#5a4e50'));
    R.rect(x - 10, 0, x + 10, 3, K); R.rect(x - 9, 1, x + 9, 2, hex('#8a6a3a')); R.rect(x - 10, 176, x + 10, 179, K); R.rect(x - 9, 177, x + 9, 178, hex('#8a6a3a'));
    for (let y = 8; y < 172; y += 9) R.pset(x - 9 - (y % 3), y, hex('#2a2224'));
  }
};

// ── 3. el taller del grabador americano (1850)
const p3 = (t) => {
  estampa();
  const geo = T.epoca(R, t, { encuadre: 'estudio', gordo: 0.2 });
  const S = geo.suelo, [hx0, hy0, hx1, hy1] = geo.tablero.hoja;
  // el aprendiz entra con el periódico doblado bajo el brazo y se lo da
  const ent = lin(t, P3 + 0.2, revista + 0.1), da = t > revista + 0.5;
  const ax = Math.round(lerp(-20, 92, ent)) - (da ? Math.round(lin(t, cambio + 0.3, P4) * 6) : 0);
  const ap = R.actor(EL.aprendiz, ax, S, t, { dir: 1, anda: ent > 0 && ent < 1, sonrisa: da, sostiene: !da ? [ax + 17, S - 14] : false, habla: t > revista && t < revista + 0.5 });
  const papelito = (x, y) => { R.rect(x - 1, y - 6, x + 9, y + 1, K); R.rect(x, y - 5, x + 8, y, hex('#e8dcc0')); for (let yy = y - 4; yy < y; yy += 2) R.rect(x + 1, yy, x + 7, yy, hex('#8a7a5a')); R.rect(x + 1, y - 5, x + 4, y - 3, hex('#5a4a3a')); };
  if (!da) papelito(ap.mano[0] - 2, ap.mano[1] + 2);
  // el grabador: se vuelve, coge el periódico, vuelve al tablero y copia; a «one small change» levanta el dedo
  const mira = t > revista - 0.4 && t < reimprime;
  const graba = t >= reimprime && t < cambio;
  const gr = R.actor(EL.impresor, 124, S, t, { dir: mira ? -1 : 1, sonrisa: t > cambio, habla: mira, dedo: t > cambio + 0.2 && t < cambio + 1.4,
    sostiene: mira && da ? [112, S - 14] : graba ? [Math.round(160 + ((t * 9) % 1) * 30), Math.round(126 + Math.sin(t * 7) * 6)] : false });
  if (mira && da) papelito(gr.mano[0] - 8, gr.mano[1] + 2);
  T.epocaDelante(R, t, { encuadre: 'estudio', gordo: 0.2 });
  // la estampa de Windsor aparece en la plancha mientras la copia (la mitad del tamaño, de izquierda a derecha)
  const w = hx1 - hx0 - 1, hh = hy1 - hy0 - 1, prog = lin(t, reimprime, cambio + 0.2);
  R.rect(hx0, hy0, hx1, hy1, K); R.rect(hx0 + 1, hy0 + 1, hx1 - 1, hy1 - 1, hex('#efe3c6'));
  for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) {
    if (i > prog * w) break;
    const bx = Math.min(319, 20 + Math.round(i * 280 / w)), by = Math.min(179, 40 + Math.round(j * 130 / hh));
    R.pset(hx0 + 1 + i, hy0 + 1 + j, px1(bx, by));
  }
  if (graba) { const ix = hx0 + 1 + Math.round(prog * w); R.linea(ix, hy0 + 2, ix + 4, hy0 - 6, K); R.linea(ix + 1, hy0 + 2, ix + 5, hy0 - 6, hex('#c8ccd8')); }
  if (t > cambio + 0.25) { const b = Math.min(1, (t - cambio - 0.25) / 0.2); R.icono('!', gr.cabeza[0] - 1, gr.cabeza[1] - 16 + Math.round((1 - b) * 4), hex('#f0c040'), K, 2); }
};

// ── 4. inserto: el periódico de Londres y la revista americana, lado a lado sobre la mesa del grabador
// recorte de la estampa (x 44..112, y 118..170 del búfer) al doble: 136 × 104 en cada página
const RX = 44, RY = 118, RW = 68, RH = 52;
let FONDO4 = null;
const pagina = (x0, y0, rev) => {
  const w = RW * 2 + 12, hh = RH * 2 + 26;
  R.rect(x0 + 3, y0 + 3, x0 + w + 3, y0 + hh + 3, hex('#2a1a0e'));
  R.rect(x0, y0, x0 + w, y0 + hh, K); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, rev ? hex('#f4ead2') : hex('#e2ddd0'));
  if (rev) { for (let x = x0 + 3; x < x0 + w - 2; x += 3) { R.pset(x, y0 + 3, hex('#3a5a8a')); R.pset(x, y0 + hh - 3, hex('#3a5a8a')); } for (let y = y0 + 3; y < y0 + hh - 2; y += 3) { R.pset(x0 + 3, y, hex('#3a5a8a')); R.pset(x0 + w - 3, y, hex('#3a5a8a')); } R.rect(x0 + 40, y0 + 7, x0 + w - 40, y0 + 9, hex('#8a3a3a')); }
  else { R.rect(x0 + 6, y0 + 5, x0 + w - 6, y0 + 9, hex('#2a2a2a')); R.rect(x0 + 6, y0 + 11, x0 + w - 6, y0 + 11, hex('#5a5a5a')); }
  for (let y = y0 + RH * 2 + 18; y < y0 + hh - 3; y += 3) R.rect(x0 + 8, y, x0 + w - 8 - ((y * 11) % 24), y, hex('#8a8478'));
  return [x0 + 6, y0 + 14];
};
const mesa4 = () => {
  FONDO4 = R.nuevo(); const prev = R.usar(FONDO4);
  // la mesa de nogal: tablas con vetas, juntas y nudos
  const mad = [hex('#6a4426'), hex('#5a3a1e'), hex('#7a5232'), hex('#3a2412')];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const tabla = Math.floor((y + 4) / 30), yy = (y + 4) % 30;
    const v = Math.sin(x * 0.045 + tabla * 7 + Math.sin(x * 0.013 + tabla) * 3 + yy * 0.18) + Math.sin(x * 0.21 + y * 0.05 + tabla) * 0.25;
    R.pset(x, y, yy === 0 ? mad[3] : yy === 1 ? mad[1] : v > 0.95 ? mad[2] : v < -0.85 ? mad[1] : mad[0]);
  }
  for (const [nx, ny] of [[40, 30], [300, 70], [250, 22], [18, 172]]) { R.disco(nx, ny, 3, mad[1]); R.disco(nx, ny, 1, mad[3]); }
  // arriba: la regla, las tijeras, el buril, el tintero con la pluma y las gafas (fuera de la esquina de Atom)
  R.rect(176, 22, 262, 27, K); R.rect(177, 23, 261, 26, hex('#d8b878')); for (let x = 179; x < 261; x += 3) R.rect(x, 23, x, x % 15 === 14 ? 25 : 24, hex('#5a3a1e'));
  R.linea(30, 24, 56, 30, K); R.linea(30, 30, 56, 22, K); R.linea(31, 24, 56, 29, hex('#c8ccd8')); R.linea(31, 29, 56, 23, hex('#c8ccd8'));
  for (const [cx, cy] of [[26, 23], [26, 31]]) { R.disco(cx, cy, 3, K); R.disco(cx, cy, 2, hex('#2a2a3a')); R.disco(cx, cy, 1, mad[0]); }
  R.linea(116, 40, 146, 32, K); R.linea(116, 39, 140, 33, hex('#c8ccd8')); R.disco(146, 32, 3, K); R.disco(146, 32, 2, hex('#8a5a2a'));
  R.rect(66, 22, 84, 38, K); R.rect(67, 23, 83, 37, hex('#1a1a2a')); R.rect(68, 24, 74, 26, hex('#5a5a7a')); R.rect(70, 19, 80, 22, K); R.rect(71, 20, 79, 21, hex('#2a2a3a'));
  R.linea(76, 20, 104, 34, K); R.linea(76, 19, 104, 33, hex('#f6f2e6')); for (let k = 0; k < 12; k++) { R.linea(90 + k, 24 + k * 0.45, 92 + k, 28 + k * 0.45, hex('#e8e2d0')); }
  for (const cx of [214, 228]) { R.disco(cx, 36, 5, K); R.disco(cx, 36, 4, hex('#c8d8e0')); R.disco(cx - 1, 35, 2, hex('#f0f8ff')); } R.linea(219, 35, 223, 35, K); R.linea(209, 34, 196, 30, K); R.linea(233, 34, 246, 30, K);
  // la taza de té en su plato (arriba, entre las gafas y la esquina de Atom)
  R.disco(262, 38, 8, K); R.disco(262, 38, 7, hex('#f0ece0')); R.disco(262, 38, 5, hex('#d8d0c0')); R.rect(256, 28, 268, 38, K); R.rect(257, 29, 267, 37, hex('#f4f2ec')); R.rect(257, 29, 267, 30, hex('#7a4a22')); R.rect(259, 33, 265, 33, hex('#3a5aa8')); R.rect(269, 31, 271, 35, K); R.pset(270, 33, hex('#f4f2ec'));
  // la página del periódico de Londres (fija, a la izquierda)
  const [ix, iy] = pagina(8, 46, false);
  for (let j = 0; j < RH; j++) for (let i = 0; i < RW; i++) R.rect(ix + i * 2, iy + j * 2, ix + i * 2 + 1, iy + j * 2 + 1, B1[(RY + j) * 320 + RX + i]);
  R.usar(prev);
};
const p4 = (t) => {
  estampa(); if (!FONDO4) mesa4();
  R.copiar(FONDO4);
  // la revista americana entra desliza por la derecha y se queda al lado
  const llega = lin(t, P4 + 0.05, P4 + 0.6), x0 = Math.round(lerp(330, 160, 1 - (1 - llega) ** 2));
  const [ix, iy] = pagina(x0, 46, true);
  const [cx, cy] = CORONA, borra = lin(t, ido - 0.25, ido + 0.25);
  for (let j = 0; j < RH; j++) for (let i = 0; i < RW; i++) {
    const bx = RX + i, by = RY + j; let c = B2[by * 320 + bx];
    if (borra > 0) { const d = B3[by * 320 + bx]; if (d !== c) { const hsh = ((bx * 73856093) ^ (by * 19349663)) >>> 0; if ((hsh % 100) / 100 < borra) c = d; } }
    R.rect(ix + i * 2, iy + j * 2, ix + i * 2 + 1, iy + j * 2 + 1, c);
  }
  // el polvo dorado de la corona que se deshace (a «was gone»)
  const hx = ix + (cx - RX) * 2, hy = iy + (cy - RY) * 2;
  if (borra > 0) for (let k = 0; k < 12; k++) { const u = (t - ido + 0.25) * 0.8 - (k % 4) * 0.06; if (u <= 0 || u > 1) continue; R.pset(hx - 5 + (k * 5) % 12 + Math.round(Math.sin(k + t * 4) * 2), hy + Math.round(u * 26) + (k % 3), k % 2 ? hex('#e8c050') : hex('#a87a28')); }
  // los dos círculos rojos: primero la corona de Londres («The Queen's crown»), luego el hueco en la americana («gone»)
  const aro = (ax, ay, u) => { for (let a = 0; a < Math.PI * 2 * u; a += 0.03) { const x = Math.round(ax + Math.cos(a - 1.6) * 13), y = Math.round(ay + Math.sin(a - 1.6) * 10); R.rect(x, y, x + 1, y + 1, hex('#d8202a')); } };
  const lx = 14 + (cx - RX) * 2, ly = 60 + (cy - RY) * 2;
  aro(lx, ly + 2, lin(t, corona - 0.4, corona + 0.2));
  aro(hx, hy + 2, lin(t, ido - 0.1, ido + 0.4));
  if (t > ido + 0.5) { const b = Math.min(1, (t - ido - 0.5) / 0.25); R.icono('?', hx + 16, hy - 20 + Math.round((1 - b) * 4), hex('#d8202a'), K, 2); }
  // el vapor del té que sube (por debajo de la esquina de Atom)
  for (let k = 0; k < 6; k++) { const u = (t * 0.45 + k / 6) % 1; R.pset(Math.round(262 + Math.sin(u * 7 + k + t) * 3), Math.round(27 - u * 18), u < 0.5 ? hex('#f0ece0') : hex('#c8b8a0')); }
};
const efectos = [[foto, 'lapiz'], [2.0, 'golpecito'], [papel + 0.1, 'papel'], [alrededor + 0.1, 'pop'], [castillo, 'maquina'], [revista + 0.5, 'papel'], [reimprime + 0.2, 'lapiz'], [cambio + 0.25, 'pop'], [P4 + 0.1, 'papel'], [corona, 'lapiz'], [ido, 'brillo']];
const año = (t) => (t < P3 ? 1848 : 1850);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nv-muerdago'] = ('El muérdago', '''// NV-MUERDAGO (frase 16), sin cartela. Cuatro planos:
// 1. el robledal de noche (0 → «and»): un escritor romano llega con su tablilla y apunta lo que ve («A Roman writer
//    said»); el druida levanta la hoz de oro hacia la mata de la rama baja («Druids cut it») y la corta: la mata cae en el
//    paño blanco que sostiene el otro druida; la hoz brilla («golden sickle»); niebla, búho y hojas que caen;
// 2. Islandia, con la aurora («and in a Norse myth» → «But»): un narrador junto a una piedra rúnica la señala; las runas
//    se encienden («Norse myth»), el ramito de muérdago tallado brilla y sale volando como un dardo («the weapon») hacia
//    el sol tallado, que se apaga («the god Baldur»); dos cuervos cruzan el cielo; los caballos pastan;
// 3. la cocina inglesa del XVIII («kissing underneath» → «servants»): la criada llega con su jarra y el criado con la
//    leña, se paran bajo el muérdago («underneath»), miran arriba, se miran y se acercan: sale un corazón («servants»);
//    la cocinera remueve el caldero y se vuelve a mirarlos; el asador gira;
// 4. gag 4 (fondo local, la mesa de la cocina de cerca): la galleta entra, se pone bajo el muérdago con los ojos
//    cerrados esperando el beso («England») y le cae una baya en la cabeza (boing): se asusta y mira arriba.''', r'''
const m = (f) => en('muerdago', f);
const P2 = m(0.3557), P3 = m(0.6055), P4 = m(0.8605);
const romano = m(0.1555), druidas = m(0.2244), corta = m(0.2550), dorada = m(0.2983), nordico = m(0.3850), arma = m(0.4551), mata = m(0.4933), baldur = m(0.5469);
const debajo = m(0.6368), reciente = m(0.7043), criados = m(0.8458), inglaterra = m(0.9516);
const K = T.C.k;
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / (a1 - a0)));
const spr = (filas, x, y, pal, s = 1) => filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = pal[f[i]]; if (c != null) R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); } });
const CORAZON = ['.kk.kk.', 'kRWkRRk', 'kRRRRRk', '.kRRRk.', '..kRk..', '...k...'];
const PALC = { k: K, R: hex('#e0304a'), W: hex('#ffb0c0') };

// ── 1. el robledal: la hoz de oro
const p1 = (t) => {
  const cortada = t > corta + 0.12, o = { encuadre: 'robledal', cortado: cortada };
  const geo = T.epoca(R, t, o); const S = geo.suelo, mx = geo.muerdago.x, my = geo.muerdago.y;
  // el escritor romano llega por la izquierda y escribe en su tablilla
  const ll = lin(t, 0.3, romano), rx = Math.round(lerp(-18, 54, ll));
  const ro = R.actor(EL.caligrafo, rx, S, t, { dir: 1, anda: ll > 0 && ll < 1, sostiene: ll >= 1 ? [rx + 17, S - 13 + Math.round(Math.sin(t * 8) > 0.6 ? 1 : 0)] : false, sorpresa: t > corta && t < corta + 0.8 });
  if (ll >= 1) { const [hx, hy] = ro.mano; R.rect(hx - 1, hy - 6, hx + 7, hy + 2, K); R.rect(hx, hy - 5, hx + 6, hy + 1, hex('#8a5a2a')); R.rect(hx + 1, hy - 4, hx + 5, hy, hex('#3a2a1a')); for (let k = 0; k < Math.min(3, Math.floor((t - romano) * 2)); k++) R.rect(hx + 2, hy - 3 + k, hx + 4, hy - 3 + k, hex('#d8c890')); }
  // un tercer druida con la antorcha, al fondo a la derecha: la llama y su luz tiemblan
  const an = R.actor(EL.druida, 214, S - 6, t, { dir: -1, sostiene: [206, S - 30], sonrisa: t > corta + 0.6 });
  { const [hx, hy] = an.mano, fl = Math.sin(t * 13) + Math.sin(t * 7.7); R.halo(hx, hy - 6, 22, hex('#ffb050'), 0.16); R.rect(hx - 1, hy - 4, hx + 1, hy + 8, K); R.rect(hx, hy - 3, hx, hy + 7, hex('#6a3a1a'));
    R.disco(hx, hy - 6, 3, hex('#e86a20')); R.disco(hx, hy - 7 - (fl > 0.8 ? 1 : 0), 2, hex('#ffc040')); R.pset(hx + (fl > 0 ? 1 : -1), hy - 11, hex('#fff0a0')); }
  // el druida que sostiene el paño blanco
  const paño = R.actor(EL.druida, 120, S, t, { dir: 1, sostiene: [mx - 14, my + 14], sonrisa: t > corta + 0.6 });
  const [px, py] = paño.mano;
  R.poligono([[px - 6, py], [px + 8, py - 1], [px + 7, py + 9 + Math.round(Math.sin(t * 3))], [px - 5, py + 10]], K);
  R.poligono([[px - 5, py + 1], [px + 7, py], [px + 6, py + 8 + Math.round(Math.sin(t * 3))], [px - 4, py + 9]], hex('#f4f2ea'));
  R.linea(px - 2, py + 2, px - 1, py + 8, hex('#c8c4b8')); R.linea(px + 3, py + 1, px + 3, py + 8, hex('#c8c4b8'));
  // el druida de la hoz: la levanta («Druids»), corta («cut») y la hoz brilla («golden»)
  const sube = lin(t, druidas - 0.3, druidas + 0.2), golpe = lin(t, corta - 0.05, corta + 0.15);
  const objetivo = sube <= 0 ? false : [Math.round(mx + 6 - golpe * 6), Math.round(lerp(my + 18, my - 6, sube) + golpe * 12)];
  const dr = R.actor(EL.druida, 170, S, t, { dir: -1, sostiene: objetivo, sonrisa: t > dorada });
  if (objetivo) { const [hx, hy] = dr.mano;
    // la hoz de oro (media luna) en la mano
    for (let a = 0.2; a < 2.9; a += 0.08) { const x = Math.round(hx - 3 + Math.cos(a + 1.4) * 6), y = Math.round(hy - 6 + Math.sin(a + 1.4) * -6); R.pset(x, y, K); R.pset(x, y + 1, hex('#f0c040')); }
    R.rect(hx - 1, hy - 1, hx + 1, hy + 3, hex('#6a3a1a'));
    if (t > dorada && t < dorada + 0.7) { const s = Math.floor((t - dorada) * 10) % 2 ? 3 : 2; const sx = hx - 6, sy = hy - 12; R.rect(sx - s, sy, sx + s, sy, hex('#fff4c0')); R.rect(sx, sy - s, sx, sy + s, hex('#fff4c0')); }
  }
  // la mata cortada cae en el paño
  if (cortada) { const u = lin(t, corta + 0.12, corta + 0.75), x = Math.round(lerp(mx, px + 1, u)), y = Math.round(lerp(my + 6, py + 6, u * u));
    T.PIEZAS_NV.muerdago(R, x, y, {}); }
  T.epocaDelante(R, t, o);
};

// ── 2. Islandia: la piedra rúnica del mito de Báldur
const p2 = (t) => {
  T.mundo(R, t, { encuadre: 'islandia' });
  const S = 166;
  // la piedra rúnica: granito gris con musgo, la banda de la serpiente con runas, el sol tallado y el ramito
  const sx = 112, sy = 74, sw = 40, sh = 92;
  R.poligono([[sx + 4, sy + sh], [sx + 2, sy + 20], [sx + 8, sy + 4], [sx + 20, sy], [sx + 32, sy + 4], [sx + sw - 2, sy + 18], [sx + sw, sy + sh]], K);
  R.poligono([[sx + 5, sy + sh - 1], [sx + 3, sy + 20], [sx + 9, sy + 5], [sx + 20, sy + 1], [sx + 31, sy + 5], [sx + sw - 3, sy + 19], [sx + sw - 1, sy + sh - 1]], hex('#8a8a90'));
  for (let y = sy + 4; y < sy + sh; y++) for (let x = sx + 3; x < sx + sw; x++) { const v = Math.sin(x * 1.7 + y * 0.9) * Math.sin(y * 0.37 + x * 0.21); if (R.pget(x, y) === hex('#8a8a90')) { if (v > 0.55) R.pset(x, y, hex('#a0a0a6')); else if (v < -0.6) R.pset(x, y, hex('#6e6e76')); } }
  for (let y = sy + 10; y < sy + sh; y++) { const x = sx + sw - 4 - Math.round((y - sy) * 0.03); R.pset(x, y, hex('#5e5e66')); R.pset(x + 1, y, hex('#5e5e66')); }
  for (const [mx, my] of [[sx + 6, sy + sh - 4], [sx + 10, sy + sh - 2], [sx + 30, sy + sh - 3], [sx + 8, sy + 30], [sx + 34, sy + 50]]) { R.disco(mx, my, 2, hex('#4a6a3a')); R.pset(mx - 1, my - 1, hex('#7a9a5a')); }
  // la banda (serpiente) que rodea la cara de la piedra, con runas que se encienden una a una
  const on = lin(t, nordico - 0.1, nordico + 1.1);
  const banda = []; for (let y = sy + 14; y < sy + sh - 6; y += 6) banda.push([sx + 7, y]); for (let y = sy + sh - 10; y > sy + 14; y -= 6) banda.push([sx + sw - 8, y]);
  R.linea(sx + 8, sy + 12, sx + 8, sy + sh - 6, hex('#5a5a62')); R.linea(sx + sw - 7, sy + 12, sx + sw - 7, sy + sh - 6, hex('#5a5a62'));
  R.linea(sx + 8, sy + 12, sx + 20, sy + 8, hex('#5a5a62')); R.linea(sx + 20, sy + 8, sx + sw - 7, sy + 12, hex('#5a5a62'));
  banda.forEach(([x, y], k) => { const c = k / banda.length < on ? (Math.sin(t * 6 + k) > -0.3 ? hex('#f0c040') : hex('#c89030')) : hex('#4e4e56'); R.rect(x - 1, y, x - 1, y + 3, c); R.pset(x, y + 1, c); R.pset(x - 2, y + (k % 2 ? 2 : 0), c); });
  // el sol tallado (Báldur): se apaga a «Baldur»
  const scx = sx + 20, scy = sy + 30, apaga = lin(t, baldur - 0.1, baldur + 0.7), solc = apaga < 1 ? (on > 0.5 ? hex('#f8d050') : hex('#c8c8b0')) : hex('#5a5a62');
  if (on > 0.5 && apaga < 1) R.halo(scx, scy, 16, hex('#ffd860'), 0.25 * (1 - apaga));
  R.disco(scx, scy, 7, K); R.disco(scx, scy, 6, apaga < 0.5 ? solc : hex('#6e6e76')); R.disco(scx, scy, 3, apaga < 0.5 ? hex('#fff0a0') : hex('#5e5e66'));
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + t * 0.3 * (1 - apaga); R.linea(Math.round(scx + Math.cos(a) * 8), Math.round(scy + Math.sin(a) * 8), Math.round(scx + Math.cos(a) * 11), Math.round(scy + Math.sin(a) * 11), apaga < 0.5 ? solc : hex('#5e5e66')); }
  // el ramito de muérdago tallado: brilla a «weapon» y vuela como un dardo hacia el sol
  const vu = lin(t, arma + 0.2, mata + 0.2), dx0 = sx + 20, dy0 = sy + 66;
  const dx = Math.round(lerp(dx0, scx, vu)), dy = Math.round(lerp(dy0, scy + 8, vu));
  if (vu < 1) { const brilla = t > arma - 0.1;
    if (brilla) R.halo(dx, dy, 10, hex('#e8ffd0'), 0.3);
    R.linea(dx, dy + 8, dx, dy - 2, K); R.linea(dx + 1, dy + 8, dx + 1, dy - 2, hex('#6a8a3a'));
    for (const [a, b] of [[-4, 2], [4, 2], [-3, 6], [4, 6]]) { R.linea(dx, dy + b, dx + a, dy + b - 3, K); R.pset(dx + a, dy + b - 3, hex('#9ac85a')); }
    for (const [a, b] of [[-1, -3], [2, -2], [0, 0]]) { R.pset(dx + a, dy + b, brilla ? hex('#ffffff') : hex('#e8e8d8')); }
  } else if (t < baldur + 0.6) { for (let k = 0; k < 6; k++) R.pset(scx - 6 + k * 2 + Math.round(Math.sin(t * 20 + k)), scy + 10 + (k % 2), hex('#c8c8b0')); }
  // el narrador (abrigo de lana) junto a la piedra: cuenta y señala
  R.actor(EL.muchachoYule, 160, S, t, { dir: -1, habla: Math.sin(t * 7) > -0.2 && t < baldur + 0.8, dedo: t > nordico - 0.2 && t < baldur + 0.6, sorpresa: t > baldur + 0.6 });
  R.actor(EL.ninaCatalana, 186, S, t, { dir: -1, sorpresa: t > arma && t < mata + 0.6, sonrisa: t > baldur + 0.8 });
  // dos cuervos cruzan el cielo
  for (const [k, d] of [[0, 0], [1, 0.5]]) { const u = lin(t, P2 + 0.3 + d, P3 - 0.2 + d), x = Math.round(lerp(-10, 330, u)), y = Math.round(52 + k * 7 + Math.sin(u * 9) * 3), a = Math.sin(t * 10 + k) > 0;
    if (u > 0 && u < 1) { R.rect(x - 2, y, x + 2, y + 1, K); R.pset(x + 3, y, K); R.pset(x - 3, y - (a ? 2 : -1), K); R.pset(x - 2, y - (a ? 1 : 0), K); R.pset(x + 1, y - (a ? 2 : -1), K); R.pset(x, y - (a ? 1 : 0), K); } }
  T.mundoDelante(R, t, { encuadre: 'islandia' });
};

// ── 3. la cocina inglesa: los criados bajo el muérdago
const p3 = (t) => {
  const o = { encuadre: 'robledal', camara: 'cocina' };
  const geo = T.epoca(R, t, o); const S = geo.suelo, MX = geo.muerdago.x;
  // la cocinera remueve el caldero y se vuelve a mirarlos
  const coc = R.actor(EL.vecina, 90, S, t, { dir: t > criados - 0.4 ? 1 : -1, sostiene: t > criados - 0.4 ? false : [80, Math.round(S - 14 + Math.sin(t * 5) * 3)], sonrisa: t > criados });
  if (t <= criados - 0.4) { const [hx, hy] = coc.mano; R.linea(hx, hy, hx - 9, hy + 6, K); R.linea(hx, hy - 1, hx - 9, hy + 5, hex('#a8743c')); }
  // la criada con la jarra y el criado con la leña llegan bajo el muérdago
  const a = lin(t, P3 + 0.1, debajo + 0.2), b = lin(t, P3 + 0.2, debajo + 0.35);
  const junta = lin(t, criados - 0.3, criados + 0.2);
  const mira = t > debajo + 0.4 && t < reciente, sonr = t > reciente;
  const xa = Math.round(lerp(104, 141, a) + junta * 3), xb = Math.round(lerp(330, 178, b) - junta * 3);
  const ca = R.actor(EL.criada, xa, S, t, { dir: 1, anda: a > 0 && a < 1, sorpresa: mira, sonrisa: sonr, sostiene: a < 1 ? true : false });
  if (a < 1) { const [hx, hy] = ca.mano; R.rect(hx - 1, hy - 6, hx + 5, hy + 2, K); R.rect(hx, hy - 5, hx + 4, hy + 1, hex('#c8a060')); R.rect(hx + 1, hy - 5, hx + 1, hy + 1, hex('#e8c890')); R.pset(hx + 5, hy - 4, K); }
  const cb = R.actor(EL.criado, xb, S, t, { dir: -1, anda: b > 0 && b < 1, sorpresa: mira, sonrisa: sonr, sostiene: b < 1 ? true : false });
  if (b < 1) { const [hx, hy] = cb.mano; for (const dy of [-4, -1, 2]) { R.rect(hx - 7, hy + dy, hx + 1, hy + dy + 2, K); R.rect(hx - 6, hy + dy + 1, hx, hy + dy + 1, hex('#8a5a2a')); R.pset(hx - 6, hy + dy + 1, hex('#d8b070')); } }
  // los dos miran arriba (las «!» pequeñas) y luego el corazón que sube entre ellos
  if (mira) for (const x of [xa + 7, xb + 7]) R.icono('!', x - 1, S - 40, hex('#f0c040'), K);
  if (t > criados) { const u = lin(t, criados, criados + 1.6), y = Math.round(S - 36 - u * 14); spr(CORAZON, MX - 4, y, PALC, u < 0.15 ? 1 : 2); }
  T.epocaDelante(R, t, o);
};

// ── 4. gag 4: la galleta bajo el muérdago (fondo local: la mesa de la cocina de cerca)
let FONDO4 = null;
const cocinaCerca = () => {
  FONDO4 = R.nuevo(); const prev = R.usar(FONDO4);
  // la pared encalada con textura y manchas, la viga de arriba
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.31 + y * 0.17) * Math.sin(x * 0.07 - y * 0.23) + ((x * 13 + y * 7) % 11 === 0 ? 0.6 : 0); R.pset(x, y, v > 0.5 ? hex('#ece0c4') : v < -0.55 ? hex('#cfc0a0') : hex('#e0d2b2')); }
  for (let x = 0; x < 320; x += 1) R.pset(x, 148 + (x % 5 === 0 ? 1 : 0), hex('#b8a888'));
  R.rect(0, 0, 319, 16, K); for (let y = 1; y < 16; y++) R.rect(0, y, 319, y, y < 4 ? hex('#7a5232') : y > 12 ? hex('#3a2412') : hex('#5a3a1e'));
  for (let x = 6; x < 320; x += 23) { R.linea(x, 6, x + 14, 6 + (x % 3), hex('#4a2e16')); }
  // el aparador con la loza azul (izquierda)
  { const x0 = 8, x1 = 112, y0 = 34, y1 = 150; R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#6a4426'));
    for (const y of [70, 106]) { R.rect(x0 + 1, y, x1 - 1, y + 3, K); R.rect(x0 + 2, y + 1, x1 - 2, y + 2, hex('#8a5a32')); }
    for (const [yb, n] of [[70, 6], [106, 5]]) for (let k = 0; k < n; k++) { const cx = x0 + 12 + k * (92 / n), cy = yb - 16; R.disco(cx, cy, 8, K); R.disco(cx, cy, 7, hex('#f4f2ec')); R.disco(cx, cy, 5, hex('#3a5aa8')); R.disco(cx, cy, 3, hex('#f4f2ec')); R.pset(cx, cy, hex('#3a5aa8')); R.pset(cx - 4, cy - 4, hex('#ffffff')); }
    for (let k = 0; k < 6; k++) { const cx = x0 + 12 + k * 16; R.rect(cx - 4, 120, cx + 4, 130, K); R.rect(cx - 3, 121, cx + 3, 129, k % 2 ? hex('#3a5aa8') : hex('#f0ece0')); R.pset(cx + 5, 124, K); R.pset(cx + 5, 126, K); }
    R.rect(x0 + 1, 134, x1 - 1, y1 - 1, hex('#5a3a1e')); for (const cx of [36, 84]) { R.rect(cx - 16, 136, cx + 16, 148, K); R.rect(cx - 15, 137, cx + 15, 147, hex('#6a4426')); R.disco(cx, 142, 1, hex('#d8a840')); } }
  // los cazos de cobre colgados (derecha) y la ventanita emplomada
  for (let k = 0; k < 4; k++) { const cx = 196 + k * 16, cy = 120 + (k % 2) * 4; R.linea(cx, 98, cx, cy - 7, K); R.disco(cx, cy, 6, K); R.disco(cx, cy, 5, hex('#c86a3a')); R.disco(cx - 2, cy - 2, 2, hex('#f0a070')); R.rect(cx - 1, cy - 12, cx + 1, cy - 6, hex('#8a4a2a')); }
  R.rect(190, 96, 262, 98, K); R.rect(191, 97, 261, 97, hex('#7a5232'));
  { const x0 = 220, y0 = 30, x1 = 262, y1 = 84; R.rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, K); R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, hex('#6a4426')); R.rect(x0, y0, x1, y1, hex('#20304e'));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (((x - x0) + (y - y0)) % 10 === 0 || ((x - x0) - (y - y0) + 100) % 10 === 0) R.pset(x, y, hex('#5a5a62'));
    R.rect(x0, y1 - 8, x1, y1, hex('#e8eef6')); R.rect(x0 - 4, y1 + 3, x1 + 4, y1 + 6, K); R.rect(x0 - 3, y1 + 4, x1 + 3, y1 + 5, hex('#8a5a32')); }
  // la mesa: tablas gruesas con vetas, el pan, la jarra, el queso, la vela y las manzanas
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const yy = y - 150, v = Math.sin(x * 0.05 + Math.floor(x / 64) * 5 + yy * 0.3 + Math.sin(x * 0.02) * 2); R.pset(x, y, yy === 0 ? K : yy === 1 ? hex('#a87a4a') : x % 64 === 0 ? hex('#3a2412') : v > 0.9 ? hex('#7a5232') : v < -0.85 ? hex('#4e3218') : hex('#5e3e20')); }
  R.disco(40, 156, 13, K); R.disco(40, 156, 12, hex('#c8903a')); R.disco(40, 153, 9, hex('#e0aa50')); for (const dx of [-6, 0, 6]) R.linea(40 + dx - 2, 148, 40 + dx + 2, 152, hex('#a87030')); R.rect(26, 160, 54, 170, hex('#5e3e20'));
  R.rect(270, 128, 290, 160, K); R.rect(271, 129, 289, 159, hex('#a8b8c8')); R.rect(271, 129, 274, 159, hex('#d8e4ee')); R.rect(268, 126, 292, 130, K); R.rect(269, 127, 291, 129, hex('#8898a8')); R.rect(290, 134, 296, 150, K); R.rect(291, 136, 294, 148, hex('#a8b8c8'));
  for (const [ax, ay, c] of [[240, 160, '#c8303a'], [252, 162, '#a8c838'], [232, 165, '#c8303a']]) { R.disco(ax, ay, 5, K); R.disco(ax, ay, 4, hex(c)); R.pset(ax - 2, ay - 2, hex('#ffffff')); R.linea(ax, ay - 5, ax + 1, ay - 7, hex('#5a3a1e')); }
  R.poligono([[70, 168], [96, 162], [104, 172], [76, 176]], K); R.poligono([[72, 168], [96, 163], [102, 171], [77, 174]], hex('#f0d060')); for (const [hx, hy] of [[82, 168], [92, 167]]) R.pset(hx, hy, hex('#c8a030'));
  // la cuerda y el lazo rojo del muérdago (la rama se pinta encima)
  R.linea(160, 16, 160, 34, K); R.linea(161, 16, 161, 34, hex('#c8b890'));
  // los manojos de hierbas secas de la viga y la balda de los tarros (derecha, por debajo de la esquina de Atom)
  for (const [hx, c] of [[186, '#7a8a3a'], [200, '#8a6a3a'], [126, '#6a7a4a'], [100, '#9a7a4a']]) { R.linea(hx, 16, hx, 22, K); for (let k = 0; k < 7; k++) { R.linea(hx, 22, hx - 4 + k + (k % 2), 36 + (k % 3) * 2, k % 2 ? hex(c) : hex('#4a5a2a')); } R.rect(hx - 2, 21, hx + 2, 23, hex('#a83a2a')); }
  R.rect(276, 100, 319, 103, K); R.rect(277, 101, 319, 102, hex('#8a5a32'));
  for (const [jx, c, hh] of [[282, '#c8a060', 14], [296, '#5a7a9a', 18], [310, '#a8603a', 12]]) { R.rect(jx - 5, 99 - hh, jx + 5, 99, K); R.rect(jx - 4, 100 - hh, jx + 4, 98, hex(c)); R.rect(jx - 4, 100 - hh, jx + 4, 101 - hh, hex('#e8dcc0')); R.pset(jx - 3, 102 - hh, hex('#ffffff')); }
  R.usar(prev);
};
const p4 = (t) => {
  if (!FONDO4) cocinaCerca();
  R.copiar(FONDO4);
  // la nieve tras la ventanita (recortada a su hueco)
  R.recorte([220, 30, 262, 75]); for (let k = 0; k < 18; k++) { const x = 220 + ((k * 23 + Math.floor(t * 9) * 0 + Math.round(t * 6 + k * 3)) % 43), y = 30 + Math.round((t * 14 + k * 11) % 46); R.pset(x, y, hex('#e8eef6')); } R.recorte(null);
  // el muérdago grande con su lazo, que se mece
  const sw = Math.round(Math.sin(t * 1.6) * 1.5);
  R.rect(153 + sw, 34, 167 + sw, 40, K); R.rect(154 + sw, 35, 166 + sw, 39, hex('#d8303a')); R.rect(158 + sw, 35, 162 + sw, 39, hex('#a81a2a'));
  R.linea(156 + sw, 40, 150 + sw, 50, hex('#d8303a')); R.linea(164 + sw, 40, 170 + sw, 50, hex('#d8303a'));
  T.PIEZAS_NV.muerdago(R, 160 + sw, 86, { s: 3 });
  // la galleta entra, espera con los ojos cerrados, le cae la baya y se asusta
  const ent = lin(t, P4 + 0.2, P4 + 1.3), gx = Math.round(lerp(-30, 160, ent)), gy = 166;
  const cae = inglaterra + 0.55, golpe = cae + 0.45;
  const cara = t > golpe ? 'susto' : ent >= 1 && t > P4 + 1.4 ? 'feliz' : 'normal';
  T.galleta(R, gx, gy + (t > golpe && t < golpe + 0.25 ? 2 : 0), t, { s: 3, cara, corre: ent > 0 && ent < 1 });
  if (cara === 'feliz') { const u = (t * 1.1) % 1; spr(['.k.k.', 'kRkRk', 'kRRRk', '.kRk.', '..k..'], gx + 10, gy - 58 - Math.round(u * 10), { k: K, R: hex('#e0304a') }, 1); }
  // la baya: se suelta, cae y rebota
  const top = gy - 51;
  const by = t < cae ? 94 + (t > cae - 0.5 ? Math.round(Math.sin(t * 40)) : 0) : t < golpe ? Math.round(lerp(94, top + 2, ((t - cae) / 0.45) ** 2)) : null;
  if (by != null) T.PIEZAS_NV.baya(R, 162 + sw * (t < cae ? 1 : 0), by, { s: 2 });
  else { const u = lin(t, golpe, golpe + 0.7), bx = Math.round(lerp(162, 204, u)), byy = Math.round(top + 2 - Math.sin(u * Math.PI) * 20 + u * (gy - top - 2)); T.PIEZAS_NV.baya(R, bx, Math.min(gy, byy), { s: 2 }); }
  if (t > golpe && t < golpe + 1.3) { for (let k = 0; k < 3; k++) { const a = t * 5 + k * 2.1, x = Math.round(gx + Math.cos(a) * 16), y = Math.round(top - 4 + Math.sin(a) * 4); R.rect(x - 2, y, x + 2, y, hex('#f0c040')); R.rect(x, y - 2, x, y + 2, hex('#f0c040')); R.pset(x, y, hex('#ffffff')); } }
  if (t > golpe + 0.6) R.icono('!', gx + 20, top - 18, hex('#f0c040'), K, 2);
  // la vela de la mesa
  R.rect(304, 140, 309, 162, K); R.rect(305, 141, 308, 161, hex('#f0e6cc')); const fl = Math.sin(t * 11) > 0.3 ? 1 : 0; R.disco(306, 136 - fl, 2, hex('#f0a030')); R.pset(306, 133 - fl, hex('#fff4c0'));
};
const efectos = [[romano + 0.2, 'lapiz'], [corta, 'whoosh'], [dorada, 'brillo'], [nordico, 'viento'], [arma + 0.2, 'whoosh'], [P3 + 0.1, 'puerta'], [criados, 'pop'], [inglaterra + 0.55 + 0.45, 'boing']];
const año = (t) => (t < P2 ? 77 : t < P3 ? 1220 : 1750);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nv-jingle'] = ('Jingle Bells', '''// NV-JINGLE (frase 17), 1857 → 1965, sin cartela. Cuatro planos:
// 1. la carrera de trineos de 1857 (0 → «It»): dos trineos de caballos corren por el camino nevado; a «Jingle Bells» los
//    cascabeles suenan y salen notas de los arneses; el público de detrás de la cerca se vuelve a mirarlos y vitorea;
// 2. la meta («written in 1857» → «once»): el autor canta su partitura en primer plano y salen notas; el trineo cruza la
//    meta y rompe la cinta («sleigh races»), la tribuna vitorea, una dama agita el pañuelo y los niños saltan; a
//    «doesn't mention Christmas» al autor le sale un bocadillo con un abeto tachado (la canción no la nombra);
// 3. la Gemini 6A en órbita, 1965 («Even so» → «aboard»): la cápsula se mece sobre la Tierra que gira; a «played from
//    space» salen notas por la ventanilla y flotan girando en la ingravidez; la Gemini 7 lejos;
// 4. la cabina («aboard Gemini 6A» → fin): un astronauta saca la armónica diminuta y toca («harmonica»); el otro hace
//    sonar los cascabeles («a few bells»); las notas flotan y dan vueltas por la cabina; el lápiz atado flota.''', r'''
const j = (f) => en('jingle', f);
const P2 = j(0.2530), P3 = j(0.4950), P4 = j(0.7907);
const jingle = j(0.1313), nunca = j(0.1758), anyo = j(0.2848), carreras = j(0.3556), menciona = j(0.4183), espacio = j(0.6381), desde = j(0.7053), armonica = j(0.8979), cascabeles = j(0.9592);
const K = T.C.k;
const lin = (t, a0, a1) => Math.max(0, Math.min(1, (t - a0) / (a1 - a0)));
const spr = (filas, x, y, pal, s = 1) => filas.forEach((f, jj) => { for (let i = 0; i < f.length; i++) { const c = pal[f[i]]; if (c != null) R.rect(x + i * s, y + jj * s, x + i * s + s - 1, y + jj * s + s - 1, c); } });
const NOTA = ['...kk..', '...kOk.', '...kOOk', '...kOkk', '...kOk.', '.kkkOk.', 'kOOOOk.', 'kOOOk..', '.kkk...'];
const NOTA2 = ['..kkkkk', '..kOOOk', '..kOkOk', '..kOkOk', '.kkOkOk', 'kOOkOkk', 'kOkOOk.', '.kkkk..'];
const notaPal = (c) => ({ k: K, O: hex(c) });
const COLN = ['#f0c040', '#ffffff', '#e86a6a', '#8ad0ff'];
// una nota que sale de (x0, y0) en t0 y sube flotando; vida: cuánto dura
const nota = (t, t0, x0, y0, k, vida = 2.2, vx = 6, vy = -14, s = 1) => {
  const u = (t - t0) / vida; if (u < 0 || u > 1) return;
  const x = Math.round(x0 + vx * u * vida + Math.sin(u * 7 + k) * 3), y = Math.round(y0 + vy * u * vida);
  spr(k % 2 ? NOTA2 : NOTA, x, y, notaPal(COLN[k % 4]), s);
};

// ── 1. la carrera de 1857
const p1 = (t) => {
  const o = { encuadre: 'trineos', carrera: false };
  T.hoy(R, t, o);
  const xa = Math.round(lerp(70, 392, lin(t, 0, P2 + 0.5))), xb = Math.round(lerp(40, 360, lin(t, 0, P2 + 0.3)));
  T.e_trineo(R, xb, 128, t, { dir: 1, color: hex('#2a5aa8'), caballo: hex('#3a2a20') });
  T.e_trineo(R, xa, 139, t, { dir: 1, color: hex('#c0302a') });
  // las notas que salen de los cascabeles a «Jingle Bells»
  for (let k = 0; k < 5; k++) { nota(t, jingle - 0.1 + k * 0.4, xa - 12, 116, k, 1.8, -14, -18, 2); nota(t, jingle + 0.1 + k * 0.4, xb - 12, 104, k + 1, 1.8, -14, -18, 2); }
  // el público detrás de la cerca: se vuelve con los trineos y vitorea al pasar
  const gente = [[EL.senor1857, 34], [EL.dama1857, 58], [EL.ninoVictoriano, 112], [EL.ninaVictoriana, 132], [EL.senor1857, 222], [EL.dama1857, 250], [EL.ninaVictoriana, 290]];
  gente.forEach(([d, x], k) => { const pasa = Math.abs(xa - 20 - x) < 46; R.actor(d, x, 160, t, { dir: xa - 20 > x ? 1 : -1, brazos: pasa && Math.sin(t * 9 + k) > -0.2, sonrisa: true, salto: pasa && k % 3 === 2 ? Math.round(Math.abs(Math.sin(t * 10)) * 3) : 0 }); });
  T.hoyDelante(R, t, o);
};

// ── 2. la meta y el autor con su partitura
const p2 = (t) => {
  const cruce = lin(t, carreras - 1.2, carreras + 0.9), o = { encuadre: 'trineos', camara: 'meta', cruce, cinta: lin(t, carreras + 0.25, carreras + 0.5) };
  const geo = T.hoy(R, t, o); const S = geo.suelo;
  // la dama del pañuelo y los niños de la meta
  const llega = t > carreras + 0.3;
  const dm = R.actor(EL.dama1857, 136, S, t, { dir: 1, sostiene: [150, Math.round(S - 26 + (llega ? Math.sin(t * 14) * 3 : 0))], sonrisa: true });
  { const [hx, hy] = dm.mano, f = llega ? Math.round(Math.sin(t * 14) * 2) : 0; R.poligono([[hx, hy - 1], [hx + 7, hy - 3 + f], [hx + 8, hy + 3 + f], [hx + 1, hy + 4]], K); R.poligono([[hx + 1, hy], [hx + 6, hy - 2 + f], [hx + 7, hy + 2 + f], [hx + 1, hy + 3]], hex('#e83a4a')); }
  for (const [d, x, k] of [[EL.ninoVictoriano, 214, 0], [EL.ninaVictoriana, 254, 1]]) R.actor(d, x, S, t, { dir: -1, brazos: llega, sonrisa: llega, salto: llega && t < carreras + 2 ? Math.round(Math.abs(Math.sin(t * 9 + k)) * 4) : 0 });
  // el autor con la partitura: canta (salen notas) y luego el bocadillo del abeto tachado
  const au = R.actor(EL.senor1857, 52, S, t, { dir: 1, habla: t < carreras + 0.3 && Math.sin(t * 8) > -0.3, sostiene: [68, S - 18 + (t > anyo && t < anyo + 1 ? -3 : 0)], sonrisa: t > carreras, sorpresa: t > menciona && t < menciona + 0.6 });
  { const [hx, hy] = au.mano; R.rect(hx - 1, hy - 10, hx + 11, hy + 2, K); R.rect(hx, hy - 9, hx + 10, hy + 1, hex('#f2ead6')); for (let y = hy - 8; y < hy; y += 2) R.rect(hx + 1, y, hx + 9, y, hex('#7a6a5a')); for (const [nx, ny] of [[hx + 2, hy - 7], [hx + 5, hy - 4], [hx + 8, hy - 6]]) { R.pset(nx, ny, K); R.pset(nx + 1, ny, K); R.pset(nx + 1, ny - 1, K); R.pset(nx + 1, ny - 2, K); } }
  for (let k = 0; k < 4; k++) nota(t, P2 + 0.2 + k * 0.5, 64, S - 36, k, 1.6, 6, -16, 2);
  if (t > menciona) {
    const u = lin(t, menciona, menciona + 0.25), bx = 30, by = S - 72, w = 30, hh = 26;
    if (u > 0) { R.rect(bx - 1, by - 1, bx + w + 1, by + hh + 1, K); R.rect(bx, by, bx + w, by + hh, hex('#ffffff')); for (const [cx, cy] of [[bx + 16, by + hh + 4], [bx + 20, by + hh + 9]]) { R.disco(cx, cy, 2, K); R.disco(cx, cy, 1, hex('#ffffff')); }
      // el abeto con su estrella
      for (let jj = 0; jj < 16; jj++) { const ww = Math.round(jj * 0.5); R.rect(bx + 15 - ww, by + 5 + jj, bx + 15 + ww, by + 5 + jj, jj % 4 === 3 ? hex('#2a6a3a') : hex('#3a8a4a')); }
      R.rect(bx + 14, by + 21, bx + 16, by + 23, hex('#6a3a1a')); R.pset(bx + 15, by + 4, hex('#f0c040')); R.pset(bx + 13, by + 12, hex('#e83a4a')); R.pset(bx + 17, by + 16, hex('#f0c040'));
      if (t > menciona + 0.35) for (let k = -1; k <= 1; k++) { R.linea(bx + 4 + k, by + 3, bx + w - 4 + k, by + hh - 3, hex('#d8202a')); R.linea(bx + w - 4 + k, by + 3, bx + 4 + k, by + hh - 3, hex('#d8202a')); } }
  }
  T.hoyDelante(R, t, o);
};

// ── 3. la Gemini 6A en órbita
const p3 = (t) => {
  const cx = Math.round(168 + Math.sin(t * 0.6) * 3), cy = Math.round(54 + Math.sin(t * 0.9) * 2);
  const geo = T.hoy(R, t, { encuadre: 'espacio', capsula: [cx, cy] });
  // las notas salen por la ventanilla y flotan girando (recortadas a la zona libre)
  R.recorte([96, 26, 272, 104]);
  for (let k = 0; k < 9; k++) { const t0 = espacio - 0.3 + k * 0.4, u = (t - t0) / 3.4; if (u < 0 || u > 1) continue;
    const a = -2.6 + (k % 5) * 0.55, x = Math.round(cx - 34 + Math.cos(a) * u * 80 + Math.sin(t * 2 + k) * 4), y = Math.round(cy - 10 + Math.sin(a) * u * 40 + Math.cos(t * 1.7 + k) * 3);
    spr(k % 2 ? NOTA2 : NOTA, x, y, notaPal(COLN[k % 4]), 2); }
  R.recorte(null);
};

// ── 4. la cabina: la armónica y los cascabeles
const p4 = (t) => {
  const o = { encuadre: 'espacio', camara: 'cabina' };
  const geo = T.hoy(R, t, o); const S = geo.suelo, [xa, xb] = geo.actores;
  const sube = lin(t, P4 + 0.4, armonica - 0.6), toca = t > armonica - 0.6;
  const a1 = R.actor(EL.astronauta, xa, S, t, { dir: 1, sonrisa: true, salto: toca && Math.sin(t * 9) > 0.4 ? 1 : 0, sostiene: [Math.round(lerp(xa + 16, xa + 12, sube)), Math.round(lerp(S - 14, S - 21, sube))] });
  { const [hx, hy] = a1.mano; T.PIEZAS_NV.armonica(R, hx + 4, hy + 4 + (toca && Math.sin(t * 12) > 0 ? 1 : 0), { s: 2 }); }
  const sacude = t > cascabeles - 0.3;
  const saluda = t > P4 + 0.2 && t < P4 + 1.4;
  const a2 = R.actor(EL.astronauta2, xb, S, t, { dir: -1, sonrisa: true, dedo: saluda, salto: sacude && Math.sin(t * 9) > 0.4 ? 1 : 0, habla: !sacude && !saluda && t < cascabeles - 1.5 && Math.sin(t * 6) > 0, sostiene: saluda ? false : [xb - 4 + (sacude ? Math.round(Math.sin(t * 22) * 2) : 0), S - 20 + (sacude ? Math.round(Math.cos(t * 22) * 2) : 0)] });
  if (!saluda) { const [hx, hy] = a2.mano; T.PIEZAS_NV.cascabeles(R, hx - 6, hy + 4, { t: sacude ? t : undefined }); }
  else T.PIEZAS_NV.cascabeles(R, xb - 14, S - 22 + Math.round(Math.sin(t * 2.2) * 2), {});   // flotan a su lado mientras saluda
  T.hoyDelante(R, t, o);
  // las notas en ingravidez: salen de la armónica y de los cascabeles, flotan y dan vueltas
  for (let k = 0; k < 10; k++) { const t0 = armonica - 0.4 + k * 0.4, u = (t - t0) / 4; if (u < 0 || u > 1) continue;
    const ox = a1.mano[0] + 8, oy = a1.mano[1] - 4, a = k * 1.9 + t * 0.5, rr = u * 46;
    const x = Math.round(ox + u * 70 + Math.cos(a) * rr * 0.4), y = Math.round(oy - 6 + Math.sin(a) * rr * 0.5);
    if (y > 78 && y < 130 && x > 40 && x < 266) spr(k % 2 ? NOTA2 : NOTA, x, y, notaPal(COLN[k % 4]), k % 3 ? 2 : 1); }
  for (let k = 0; k < 5; k++) { const t0 = cascabeles + k * 0.35, u = (t - t0) / 2.6; if (u < 0 || u > 1) continue;
    const x = Math.round(a2.mano[0] - 10 - u * 50 + Math.sin(t * 3 + k) * 4), y = Math.round(a2.mano[1] - 8 - u * 24 + Math.cos(t * 2 + k) * 3);
    if (y > 78 && x > 40) spr(k % 2 ? NOTA : NOTA2, x, y, notaPal(COLN[(k + 2) % 4]), 2); }
};
const efectos = [[0.4, 'carro'], [jingle, 'campana'], [jingle + 1.2, 'publico'], [carreras + 0.3, 'publico'], [menciona + 0.3, 'pop'], [P3 + 0.3, 'whoosh'], [espacio, 'brillo'], [armonica - 0.5, 'golpecito'], [cascabeles, 'campana']];
const año = (t) => (t < P3 ? 1857 : 1965);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')
