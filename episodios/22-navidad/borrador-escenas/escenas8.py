E = {}

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nv-tio'] = ('El Tió', '''// NV-TIO (frase 24), Cataluña hoy, sin cartela. Tres planos:
// 1. (cataluna general) la cocina con el hogar: tres niños entran y se juntan alrededor del Tió; la abuela pone un plato
//    en la mesa de atrás; en «log» la niña aplaude y en «face» señala la cara del tronco;
// 2. (cataluna 'tio', corta en «feeding») la niña le echa una piel de naranja que se come («feeding for weeks»); en
//    «tap» los dos niños le dan golpecitos con palos y cantan (notas); en «help» entra la abuela y la manta empieza a subir;
// 3. (fondo local: a ras de las rajolas, corta en «gives») el brazo de la abuela levanta la manta y salen turrones y
//    caramelos; la galleta sale de entre los dulces (gag 6); en «polite» los niños se ríen, la galleta se asusta con un
//    «!» y se escapa corriendo.''', r'''
const P2 = en('tio', 0.351), P3 = en('tio', 0.712);
const tronco = en('tio', 0.260), cara = en('tio', 0.296), come = en('tio', 0.371), golpe = en('tio', 0.444), canta = en('tio', 0.532);
const ayuda = en('tio', 0.646), mayores = en('tio', 0.681), dulce = en('tio', 0.756), galle = en('tio', 0.797), letra = en('tio', 0.842), educada = en('tio', 0.909), fin = en('tio', 0.962);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
Object.assign(R.ICONOS, { nota: ['..##.', '..#.#', '..#..', '..#..', '.##..', '###..', '.#...'] });
const NOTAS = [hex('#f0c040'), hex('#f05a7a'), hex('#5ac0f0')];
// notas que suben de la boca de quien canta (x, y: la boca; desde t0)
const notas = (x, y, t, t0, k = 0) => { if (t < t0) return; for (let i = 0; i < 3; i++) { const u = ((t - t0) * 0.7 + i / 3 + k * 0.17) % 1; R.icono('nota', Math.round(x + Math.sin(u * 6 + i) * 3 + i * 2), Math.round(y - u * 26), NOTAS[(i + k) % 3], hex('#3a1a10')); } };
// el palo en la mano (de la mano hacia la punta), con su contorno
const palo = (m, px, py) => { R.linea(m[0], m[1] + 1, px, py + 1, hex('#2a1608')); R.linea(m[0], m[1], px, py, hex('#9a6a38')); R.pset(px, py, hex('#5a3a1a')); };
// el golpecito: el brazo sube y baja; devuelve si toca ahora
const golpea = (t, t0, fase) => t > t0 ? ((t - t0) * 1.8 + fase) % 1 : 0.7;
const chispa = (x, y, c) => { R.pset(x, y - 2, c); R.pset(x, y + 2, c); R.pset(x - 2, y, c); R.pset(x + 2, y, c); R.pset(x, y, hex('#ffffff')); };
const NINO2 = { C: '#3a8a4a', c: '#2a6a34' };
// la guirnalda de pino con lazos y naranjas secas colgada de la pared (plano 2) y la ristra de ajos junto al cuadro
const guirnalda = (t) => {
  for (let x = 56; x <= 230; x++) { const y = Math.round(32 + Math.sin((x - 56) / 174 * Math.PI * 3) ** 2 * 10); R.linea(x, y - 2, x - 1, y - 5, hex('#1e5a2a')); R.linea(x, y + 2, x - 1, y + 5, x % 3 ? hex('#2e7a3a') : hex('#14401e')); R.pset(x, y, hex('#3a2a1a')); }
  for (const x of [56, 114, 172, 230]) { const y = 32; R.disco(x, y, 3, hex('#8a1414')); R.disco(x, y, 2, hex('#d02a2a')); R.linea(x, y + 2, x - 3, y + 9, hex('#d02a2a')); R.linea(x, y + 2, x + 3, y + 9, hex('#a01818')); }
  for (const x of [85, 143, 201]) { const y = Math.round(32 + Math.sin((x - 56) / 174 * Math.PI * 3) ** 2 * 10) + 3 + Math.round(Math.sin(t * 1.5 + x) * 0.6); R.disco(x, y, 3, hex('#a84a0a')); R.disco(x, y, 2, hex('#f0901a')); R.pset(x - 1, y - 1, hex('#ffc060')); R.pset(x, y, hex('#f8e0a0')); }
  R.rect(150, 50, 151, 54, hex('#140c08'));
  for (let k = 0; k < 6; k++) { const px = 150 + Math.round(Math.sin(k * 1.7 + t * 0.8) * 1.5), py = 58 + k * 5; R.disco(px, py, 3, hex('#8a7a6a')); R.disco(px, py, 2, hex('#f0ece0')); R.pset(px - 1, py - 1, hex('#ffffff')); R.pset(px, py + 2, hex('#c8b8a0')); }
};

const p1 = (t) => {
  T.mundo(R, t, { encuadre: 'cataluna' });
  T.gato(R, 20, 160, t, { dir: 1 });
  // la abuela trae un plato a la mesa de atrás y se vuelve a mirar
  const ua = tramo(t, 0.4, 2.6), xa = Math.round(lerp(250, 200, ua)), deja = t > 2.9;
  const a = R.actor(EL.adultoCatalan, xa, 150, t, { dir: deja ? -1 : -1, anda: ua > 0 && ua < 1, sostiene: deja ? null : [xa - 4, 135], sonrisa: t > cara });
  if (!deja) { R.disco(a.mano[0] - 3, a.mano[1] - 1, 4, hex('#140c08')); R.disco(a.mano[0] - 3, a.mano[1] - 1, 3, hex('#f0ece0')); R.disco(a.mano[0] - 3, a.mano[1] - 1, 1, hex('#3a6ab0')); }
  else { R.rect(184, 115, 194, 116, hex('#140c08')); R.rect(185, 114, 193, 114, hex('#f0ece0')); R.pset(189, 114, hex('#3a6ab0')); }
  // la niña entra por la izquierda, aplaude en «log» y señala la cara en «face»
  const un = tramo(t, 0.5, 3.9), xn = Math.round(lerp(-16, 104, un)), aplaude = t > tronco - 0.1 && t < cara - 0.1;
  R.actor(EL.ninaCatalana, xn, 170, t, { dir: 1, anda: un > 0 && un < 1, brazos: aplaude && Math.floor(t * 8) % 2 === 0, dedo: t > cara, sonrisa: t > tronco - 0.2, habla: t > cara + 0.3 && Math.sin(t * 9) > 0 });
  // los dos niños entran por la derecha, por detrás de la mesa de delante
  const u1 = tramo(t, 1.0, reune1), x1 = Math.round(lerp(336, 186, u1));
  R.actor(EL.ninoCatalan, x1, 172, t, { dir: -1, anda: u1 > 0 && u1 < 1, sonrisa: t > cara, sorpresa: t > cara - 0.3 && t < cara + 0.2 });
  const u2 = tramo(t, 1.8, reune2), x2 = Math.round(lerp(340, 206, u2));
  R.actor(EL.ninoCatalan, x2, 176, t, { dir: -1, anda: u2 > 0 && u2 < 1, pal: NINO2, salto: t > cara + 0.2 && t < cara + 0.6 ? 2 : 0, sonrisa: true });
  T.mundoDelante(R, t, { encuadre: 'cataluna' });
};
const reune1 = en('tio', 0.210) + 0.6, reune2 = en('tio', 0.260) + 0.4;

const p2 = (t) => {
  const lev = tramo(t, mayores, P3) * 0.35;
  T.mundo(R, t, { encuadre: 'cataluna', camara: 'tio', manta: lev });
  guirnalda(t);
  const S = 174;
  // la niña: la piel de naranja en la mano, la lanza a la boca del Tió en «feeding»; luego canta
  const lanza = come - 0.45;
  const n = R.actor(EL.ninaCatalana, 50, S, t, { dir: 1, sostiene: t < lanza ? [66, 154] : null, dedo: t > lanza && t < come + 0.6, sonrisa: t > come, habla: t > canta && Math.sin(t * 8) > -0.2 });
  if (t < lanza) { R.disco(n.mano[0] + 2, n.mano[1] - 1, 2.5, hex('#a84a0a')); R.disco(n.mano[0] + 2, n.mano[1] - 1, 1.8, hex('#f0901a')); }
  else if (t < come + 0.1) { const u = tramo(t, lanza, come + 0.1), px = lerp(70, 112, u), py = lerp(152, 138, u) - Math.sin(u * Math.PI) * 18; R.disco(Math.round(px), Math.round(py), 2.5, hex('#a84a0a')); R.disco(Math.round(px), Math.round(py), 1.8, hex('#f0901a')); }
  else if (t < come + 1.2) { const m = Math.floor((t - come) * 8) % 2; for (const [dx, dy] of [[-3, 0], [4, -1], [1, 3]]) R.pset(112 + dx * (1 + m), 140 + dy + m, hex('#f0901a')); }
  notas(64, S - 20, t, canta, 0);
  // los dos niños con palos: uno a la izquierda (al lomo de abajo) y otro a la derecha (al extremo de atrás)
  const ga = golpea(t, golpe, 0), gb = golpea(t, golpe + 0.25, 0.5);
  const arribaA = ga < 0.5, mA = R.actor(EL.ninoCatalan, 70, S, t, { dir: 1, pal: NINO2, sostiene: arribaA ? [84, 146] : [86, 156], sonrisa: t > golpe, habla: t > canta && Math.sin(t * 8 + 1) > -0.2, sorpresa: t > come - 0.1 && t < come + 0.4 });
  palo(mA.mano, mA.mano[0] + (arribaA ? 6 : 13), mA.mano[1] + (arribaA ? -12 : 3));
  if (t > golpe && !arribaA && ga < 0.62) chispa(mA.mano[0] + 14, mA.mano[1] + 3, hex('#fff0a0'));
  const arribaB = gb < 0.5, mB = R.actor(EL.ninoCatalan, 226, S, t, { dir: -1, sostiene: arribaB ? [222, 146] : [219, 156], sonrisa: true, habla: t > canta && Math.sin(t * 8 + 2) > -0.2 });
  palo(mB.mano, mB.mano[0] - (arribaB ? 6 : 12), mB.mano[1] + (arribaB ? -12 : 2));
  if (t > golpe && !arribaB && gb < 0.62) chispa(mB.mano[0] - 13, mB.mano[1] + 2, hex('#fff0a0'));
  notas(234, S - 20, t, canta + 0.3, 1);
  // la abuela entra por la derecha en «help» y le guiña a los niños
  const ua = tramo(t, ayuda - 0.3, mayores), xa = Math.round(lerp(336, 262, ua));
  R.actor(EL.adultoCatalan, xa, S + 2, t, { dir: -1, anda: ua > 0 && ua < 1, dedo: t > mayores, sonrisa: true });
};

// el fondo local del plano 3: la pared encalada con el zócalo de rajoles pintadas, la balda con los platos y la ristra
// de pimientos, y el suelo de rajolas en perspectiva, con la luz del fuego que viene de la izquierda
let FT = null;
const fondoTio = () => {
  if (FT) return FT;
  FT = R.nuevo(); const prev = R.usar(FT);
  const cal = [hex('#e0cca8'), hex('#c8b08c'), hex('#f0dcb8'), hex('#a88e6e')];
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { const n = hh(x >> 1, y >> 1, 3), m = hh(x >> 3, y >> 3, 4); let c = n < 0.12 ? cal[1] : n > 0.9 ? cal[2] : cal[0]; if (m < 0.08 && n < 0.5) c = cal[3]; const f = Math.hypot(x + 40, (y - 120) * 1.3) / 420; if (hh(x, y, 5) < f * 0.8) c = cal[1]; R.pset(x, y, c); }
  // la viga de arriba (lejos de Atom: la esquina de la derecha queda en cal)
  for (let x = 0; x < 268; x++) for (let y = 16; y < 24; y++) R.pset(x, y, y === 16 || y === 23 ? hex('#2a180c') : (hh(x >> 2, y, 6) < 0.3 ? hex('#4a2e1c') : hex('#6a4630')));
  for (let x = 0; x < 268; x += 34) R.rect(x, 24, x + 1, 26, hex('#2a180c'));
  // la balda con los platos de loza azul y amarilla, el porrón y dos ollas de barro
  R.rect(150, 52, 252, 54, hex('#2a180c')); R.rect(150, 51, 252, 51, hex('#a06a3e'));
  for (const bx of [156, 248]) { R.linea(bx, 55, bx + 4, 60, hex('#2a180c')); }
  for (let k = 0; k < 4; k++) { const px = 166 + k * 18; R.disco(px, 42, 8, hex('#140c08')); R.disco(px, 42, 7, hex('#f0ece0')); R.disco(px, 42, 5, k % 2 ? hex('#3a6ab0') : hex('#d8a030')); R.disco(px, 42, 3, hex('#f0ece0')); R.disco(px, 42, 1, k % 2 ? hex('#3a6ab0') : hex('#c83a3a')); }
  for (const [ox, oh] of [[234, 12], [246, 9]]) { R.disco(ox, 51 - oh / 2, oh / 2 + 1, hex('#140c08')); R.disco(ox, 51 - oh / 2, oh / 2, hex('#b85a34')); R.rect(ox - 2, 50 - oh, ox + 2, 50 - oh, hex('#8a3e22')); R.pset(ox - 2, 49 - oh / 2, hex('#d8784a')); }
  // la ristra de pimientos rojos colgada de un clavo y la rama de pino con el lazo
  R.rect(110, 26, 111, 30, hex('#140c08'));
  for (let k = 0; k < 9; k++) { const px = 110 + Math.round(Math.sin(k * 1.3) * 2), py = 32 + k * 5; R.disco(px, py, 3, hex('#5a0a0a')); R.disco(px, py, 2, k % 3 ? hex('#d02a2a') : hex('#a01818')); R.pset(px - 1, py - 1, hex('#f05a4a')); R.pset(px, py - 3, hex('#3a5a2a')); }
  for (let k = 0; k < 22; k++) { const px = 36 + k * 2, py = 40 + Math.round(Math.sin(k * 0.3) * 3); R.linea(px, py, px - 2, py - 4, hex('#1e5a2a')); R.linea(px, py, px - 2, py + 4, hex('#2e7a3a')); }
  R.linea(34, 40, 82, 40, hex('#5a3a1a')); R.disco(58, 41, 3, hex('#c83a3a')); R.linea(58, 43, 54, 50, hex('#c83a3a')); R.linea(58, 43, 62, 50, hex('#a02020'));
  // el zócalo de rajoles pintadas (azul y blanco, una flor en cada una)
  for (let y = 84; y < 100; y++) for (let x = 0; x < 320; x++) { const i = x % 12, j = (y - 84) % 8; let c = i === 0 || j === 0 ? hex('#8a7a6a') : hex('#f2eee2'); const ci = Math.abs(i - 6), cj = Math.abs(j - 4); if (i && j && ci + cj <= 2) c = (ci + cj === 0) ? hex('#d8a030') : hex('#2a5aa8'); if (i && j && (ci === 4 && cj === 2)) c = hex('#6a9ad8'); R.pset(x, y, c); }
  R.rect(0, 100, 319, 101, hex('#5a2e1a'));
  // el suelo de rajolas en perspectiva
  for (let y = 102; y < 180; y++) { const d = (y - 102) / 78, fh = 4 + d * 9, fi = Math.floor(Math.pow(d, 0.75) * 9), fr = (Math.pow(d, 0.75) * 9) % 1; for (let x = 0; x < 320; x++) { const xx = (x - 160) / (0.55 + d * 0.45) + 160, w = 22, jx = ((xx + (fi % 2) * 11) % w + w) % w, col = Math.floor((xx + (fi % 2) * 11) / w);
      let c = jx < 1.3 || fr < 0.07 ? hex('#5a2e1a') : hh(col, fi, 7) < 0.3 ? hex('#8a3e22') : hh(col, fi, 8) > 0.85 ? hex('#d8784a') : hex('#b85a34');
      if (c !== hex('#5a2e1a') && hh(x, y, 9) < 0.06) c = hex('#a04a2a');
      const e = Math.hypot((x + 30) / 200, (y - 140) / 60); if (e > 1.1 && hh(x, y, 10) < (e - 1.1) * 0.9) c = hex('#6a3420'); R.pset(x, y, c); } }
  // una grieta y una escoba apoyada en la pared (a la derecha)
  for (let k = 0; k < 14; k++) R.pset(250 + k * 2, 130 + Math.round(Math.sin(k) * 2) + k, hex('#4a2414'));
  R.usar(prev); return FT;
};

// el Tió grande del plano 3: cara a la izquierda (x, base), tronco hacia la derecha, manta levantada lev 0–1
const CT = { k: hex('#140c08'), tr: hex('#8a6a4a'), trS: hex('#5a4028'), trL: hex('#b08a62'), corte: hex('#e0c08a'), corteS: hex('#b8905a'), anillo: hex('#a07a4a'), bar: hex('#d02a2a'), barS: hex('#8a1414'), barL: hex('#f05a4a'), manta: hex('#c83030'), mantaS: hex('#8a1a1a'), mantaL: hex('#f0e0c0'), ojo: hex('#1a1008'), mej: hex('#f08a7a') };
const tioGrande = (x, base, s, t, lev) => {
  const r = 9 * s, L = 40 * s, fy = base - r - 5 * s, by = base - r, cyA = (xx) => fy + (by - fy) * ((xx - x) / L);
  for (const du of [4, 11]) { const lx = x + du * s; for (let k = -1; k <= 2; k++) R.linea(lx + k, fy + r * 0.6, lx - 2 * s + k, base, k === -1 || k === 2 ? CT.k : CT.trS); }
  const cuerpo = [[x, fy - r], [x + L, by - r], [x + L, by + r], [x, fy + r]];
  for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.poligono(cuerpo.map(([a, b]) => [a + dx, b + dy]), CT.k);
  R.poligono(cuerpo, (xx, yy) => { const cy = cyA(xx), v = (yy - cy) / r, veta = Math.floor((yy + Math.sin(xx * 0.12) * 2) / 3), n = hh(veta, Math.floor(xx / 7), 11); if (hh(xx, yy, 12) < 0.025) return CT.k; return v < -0.55 ? (n < 0.5 ? CT.trL : CT.tr) : v > 0.45 ? (n < 0.3 ? CT.k : CT.trS) : n < 0.25 ? CT.trS : n > 0.85 ? CT.trL : CT.tr; });
  R.disco(x + L, by, r, CT.k); R.disco(x + L, by, r - 1, (xx, yy) => { const d = Math.hypot(xx - x - L, yy - by) / r; return d > 0.86 ? CT.trS : Math.floor(d * 6) % 2 && d > 0.25 ? CT.anillo : CT.corteS; });
  // los dulces escondidos debajo de la manta (asoman cuando sube)
  // la manta a cuadros, con flecos: la esquina de la derecha sube con la mano
  const x0 = x + 15 * s, x1 = x + 41 * s, RT = [x1 + 10 * lev, cyA(x1) - r - 2 - 34 * lev], RB = [x1 + 3 + 16 * lev, cyA(x1) + r + 3 - 30 * lev];
  const LT = [x0, cyA(x0) - r - 2], LB = [x0 - 2, cyA(x0) + r + 3];
  const m = [LT, RT, RB, LB];
  for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.poligono(m.map(([a, b]) => [a + dx, b + dy]), CT.k);
  R.poligono(m, (xx, yy) => { const a = Math.floor((xx - x0) / 7), b = Math.floor((yy + (xx - x0) * (RT[1] - LT[1]) / (RT[0] - LT[0]) * -1) / 7); const f = (xx - x0) % 7 === 0 || (yy + 300) % 7 === 0; return f ? CT.mantaL : (a + b) % 2 ? CT.manta : CT.mantaS; });
  for (let i = 0; i <= 16; i++) { const u = i / 16, fx = Math.round(lerp(LB[0], RB[0], u)), fy2 = Math.round(lerp(LB[1], RB[1], u)); R.rect(fx, fy2 + 1, fx, fy2 + 3 + Math.round(Math.sin(t * 3 + i) * 0.6), CT.mantaL); }
  // la cara en el corte: anillos, ojos que parpadean, nariz roja, sonrisa y mejillas
  R.disco(x, fy, r + 1, CT.k); R.disco(x, fy, r, (xx, yy) => { const d = Math.hypot(xx - x, yy - fy) / r; return d > 0.88 ? CT.trS : Math.floor(d * 6) % 2 && d > 0.3 ? CT.anillo : (xx < x - r * 0.3 ? CT.corte : CT.corteS); });
  const parp = (t % 3.1) < 0.14;
  for (const dx of [-0.35, 0.35]) { const ex = Math.round(x + dx * r), ey = Math.round(fy - r * 0.2); if (parp) R.rect(ex - 3, ey, ex + 3, ey, CT.ojo); else { R.disco(ex, ey, 3.2, CT.ojo); R.pset(ex - 1, ey - 1, hex('#ffffff')); } }
  R.disco(x, Math.round(fy + r * 0.1), 3.5, CT.k); R.disco(x, Math.round(fy + r * 0.1), 2.6, CT.bar); R.pset(x - 1, Math.round(fy + r * 0.05) - 1, CT.barL);
  for (let i = -6; i <= 6; i++) { const yy = Math.round(fy + r * 0.42 + (1 - (i / 6) ** 2) * r * 0.2); R.pset(x + i * 2, yy, CT.ojo); R.pset(x + i * 2 + 1, yy, CT.ojo); }
  for (const dx of [-0.58, 0.58]) R.disco(Math.round(x + dx * r), Math.round(fy + r * 0.3), 3, CT.mej);
  const pts = [[x - r * 0.8, fy - r * 0.6], [x + r * 0.7, fy - r * 0.82], [x + 16 * s, fy - r * 0.95 + 2 * s], [x + 20 * s, fy - r * 0.3], [x + 15 * s, fy - r * 0.45], [x + r * 0.3, fy - r * 0.38]];
  for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.poligono(pts.map(([a, b]) => [a + dx, b + dy]), CT.k);
  R.poligono(pts, (xx, yy) => (yy > fy - r * 0.52 && xx < x + r * 0.6 ? CT.barS : xx > x + 12 * s ? CT.barS : yy < fy - r * 0.78 ? CT.barL : CT.bar));
  return RT;
};

// los dulces que salen de debajo de la manta: dónde caen (dx, dy desde la boca de la manta), tipo y cuándo
const DULCES = [[0, 0, 'turron', 0], [26, 4, 'caramelos', 0.15], [-22, 10, 'caramelos', 0.3], [44, 12, 'caramelos', 0.45], [8, 16, 'caramelos', 0.55], [60, 2, 'turron', 0.7]];
const p3 = (t) => {
  R.copiar(fondoTio());
  // la luz del fuego (fuera, a la izquierda) que tiembla en la pared y en el suelo
  // el hogar a la izquierda: la jamba de piedra y las llamas que bailan, con chispas
  for (let y = 24; y < 102; y++) for (let x = 0; x < 14; x++) R.pset(x, y, y < 60 ? hex('#2a1e18') : hex('#140c08'));
  for (let x = 0; x < 14; x++) { const hgt = 22 * (0.6 + 0.4 * Math.sin(x * 0.9 + t * 9) * Math.sin(x * 0.3 - t * 5)); for (let j = 0; j < hgt; j++) { const q = j / hgt; R.pset(x, 100 - j, q < 0.3 ? hex('#ffe070') : q < 0.7 ? hex('#ff8a20') : hex('#d8401a')); } }
  for (let k = 0; k < 4; k++) { const u = (t * 0.9 + k / 4) % 1; R.pset(Math.round(4 + k * 3 + Math.sin(t * 3 + k) * 2), Math.round(76 - u * 40), hex('#ffe070')); }
  for (let y = 18; y < 104; y++) for (let x = 14; x < 26; x++) { const b = Math.floor((y + (Math.floor(y / 9) % 2) * 4) / 9); R.pset(x, y, (y % 9 === 0 || x === 14 || x === 25) ? hex('#3a2e24') : hh(b, x >> 2, 13) < 0.4 ? hex('#6a5444') : hex('#9a8270')); }
  T.gato(R, 300, 99, t, { dir: -1 });
  const lev = tramo(t, P3 + 0.15, dulce - 0.05);
  const RT = tioGrande(140, 168, 3, t, lev);
  // los dulces salen y se desparraman por el suelo
  const bx = 228, by = 156;
  for (const [dx, dy, tipo, d] of DULCES) { const u = tramo(t, dulce + d - 0.2, dulce + d + 0.35); if (u <= 0) continue; const x = Math.round(lerp(bx - 10, bx + dx, u)), y = Math.round(lerp(by - 6, by + 12 + dy, u) - Math.sin(u * Math.PI) * 8); T.PIEZAS_NV.dulces(R, x, y, { s: 2, tipo: tipo === 'turron' ? 'turron' : undefined }); }
  // la galleta sale de entre los dulces (gag 6), se asusta con la letra de la canción y se escapa
  if (t > galle - 0.2) {
    const ug = tramo(t, galle - 0.2, galle + 0.5), sale = tramo(t, educada + 0.9, fin + 1.6);
    const gx = Math.round(lerp(226, 250, ug) + sale * 110), gy = Math.round(lerp(150, 172, ug) - Math.sin(ug * Math.PI) * 26);
    const susto = t > educada && t < educada + 0.9;
    T.galleta(R, gx, gy, t, { s: 2, cara: susto ? 'susto' : 'feliz', corre: sale > 0 && sale < 1 });
    if (susto) R.bocadillo(gx, gy - 38, { icono: '!' });
  }
  // el brazo de la abuela entra por la derecha y sube la manta por la esquina
  const sube = tramo(t, P3 - 0.3, P3 + 0.15);
  { const hx = Math.round(lerp(340, RT[0] + 3, sube)), hy = Math.round(lerp(130, RT[1] + 2, sube)); T.brazo(R, 348, 122, hx, hy, '#3a7a5a', -1, { codo: [Math.round((348 + hx) / 2 + 4), Math.round((122 + hy) / 2 + 12)] }); }
  // los niños a la izquierda cantan; en «polite» se ríen y dan saltitos
  const rie = t > educada - 0.1;
  R.actor(EL.ninaCatalana, 22, 176, t, { dir: 1, habla: !rie && Math.sin(t * 8) > -0.2, sonrisa: true, salto: rie && Math.floor(t * 5) % 2 ? 2 : 0, sorpresa: t > dulce && t < dulce + 0.5 });
  R.actor(EL.ninoCatalan, 48, 178, t, { dir: 1, pal: NINO2, habla: !rie && Math.sin(t * 8 + 1) > -0.2, sonrisa: true, salto: rie && Math.floor(t * 5 + 1) % 2 ? 2 : 0, dedo: t > galle && t < galle + 1.2 });
  if (!rie) { notas(32, 154, t, P3 - 0.5, 0); notas(58, 156, t, P3 - 0.2, 1); }
};
const efectos = [[tronco, 'palmada'], [come + 0.1, 'masca'], [golpe + 0.28, 'toc'], [golpe + 0.53, 'toc'], [golpe + 1.95, 'toc'], [P3 + 0.3, 'whoosh'], [dulce, 'pop'], [galle + 0.3, 'boing'], [educada + 0.05, 'pop'], [fin + 0.3, 'whoosh']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nv-japon'] = ('Japón', '''// NV-JAPON (frase 25), Japón, sin cartela. Tres planos:
// 1. (japon general) la calle en Nochebuena: el tren pasa, la cola de gente con abrigo avanza hacia la tienda de pollo;
//    un taxi cruza por delante; en «fried chicken» sale un cliente con su cubeta y se va contento;
// 2. (japon 'mostrador', corta en «It») la freidora con la cesta que sube; en «1974» cae la hoja del calendario y
//    aparece el 1974 (la barra del año dice 1974); el dependiente trae la cubeta al mostrador y una mano se la lleva;
// 3. (fondo local: un salón japonés de noche, corta en «and today») la madre rodea el 24 en el calendario («order…
//    weeks in advance»); el padre abre la puerta corredera y trae la cubeta a la mesa; el niño lo celebra.''', r'''
const P2 = en('japon', 0.381), P3 = en('japon', 0.758);
const pollo = en('japon', 0.301), campana = en('japon', 0.481), ano = en('japon', 0.541), kentucky = en('japon', 0.640), navidad = en('japon', 0.701);
const pide = en('japon', 0.853), cubo = en('japon', 0.897), semanas = en('japon', 0.916), antes = en('japon', 0.957);
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const K = hex('#14121c');
// la cubeta que se sostiene (centro x, base y)
const cubeta = (x, y, s = 1) => T.PIEZAS_NV.cubeta(R, x, y, { s });
// un taxi japonés (verde oscuro, con su luz en el techo) que cruza por delante
const taxi = (x, y) => {
  R.rect(x, y - 10, x + 44, y - 3, K); R.rect(x + 9, y - 17, x + 33, y - 10, K);
  R.rect(x + 1, y - 9, x + 43, y - 4, hex('#2a5a4a')); R.rect(x + 1, y - 9, x + 43, y - 9, hex('#4a8a72')); R.rect(x + 10, y - 16, x + 32, y - 11, hex('#2a5a4a'));
  R.rect(x + 12, y - 15, x + 20, y - 11, hex('#8ab8d8')); R.rect(x + 22, y - 15, x + 30, y - 11, hex('#8ab8d8')); R.pset(x + 13, y - 15, hex('#d8f0ff'));
  R.rect(x + 17, y - 20, x + 25, y - 18, K); R.rect(x + 18, y - 19, x + 24, y - 18, hex('#f0d040'));
  R.rect(x + 42, y - 8, x + 43, y - 6, hex('#fff0a0')); R.rect(x + 1, y - 8, x + 2, y - 6, hex('#e83a2a')); R.rect(x + 3, y - 5, x + 41, y - 5, hex('#1a3a30'));
  for (const wx of [x + 10, x + 34]) { R.disco(wx, y - 2, 4, K); R.disco(wx, y - 2, 2, hex('#6a6a7a')); }
  for (let k = 0; k < 18; k++) R.pset(x + 46 + k * 2, y - 7 + (k % 3 === 0 ? 1 : 0), hex('#fff0a0'));
};
const COLA = [[EL.japonesa, { C: '#8a3a3a', c: '#6a2a2a' }], [EL.japones, {}], [EL.japonesa, {}], [EL.japones, { C: '#4a5a3a', c: '#344228' }], [EL.japonesa, { C: '#3a4a7a', c: '#2a365a' }], [EL.japones, { C: '#6a4a3a', c: '#4a3428' }]];

const p1 = (t) => {
  T.mundo(R, t, { encuadre: 'japon' });
  // la cola avanza un paso en «minority»; el primero entra por la puerta
  const paso = tramo(t, 2.6, 3.4);
  COLA.forEach(([d, pal], k) => { const x0 = 228 + k * 15, x = Math.round(x0 - paso * 15); if (k === 0 && paso > 0.5) return; R.actor(d, x, 158, t, { dir: -1, pal, anda: paso > 0 && paso < 1, habla: k === 2 && t > 0.8 && t < 2.2 && Math.sin(t * 8) > 0, dedo: k === 3 && t > 4.4 && t < 5.4, sonrisa: k % 2 === 0 }); });
  // el cliente sale con su cubeta en «fried chicken» y se va calle abajo
  const us = tramo(t, pollo - 0.5, P2 + 0.3);
  if (t > pollo - 0.6) { const x = Math.round(lerp(206, 96, us)); const a = R.actor(EL.japones, x, 160, t, { dir: -1, pal: { C: '#2a2a2a', c: '#1a1a1a' }, anda: us > 0 && us < 1, sostiene: [x - 3, 150], sonrisa: true }); cubeta(a.mano[0] - 2, a.mano[1] + 7, 1); }
  // un taxi cruza por delante de la cola
  const ut = (t - 0.4) / 3.2; if (ut > 0 && ut < 1) taxi(Math.round(lerp(-60, 330, ut)), 177);
};

const p2 = (t) => {
  T.mundo(R, t, { encuadre: 'japon', camara: 'mostrador' });
  // el calendario de la pared: en «1974» cae la hoja del mes y queda el año
  const cae = tramo(t, ano - 0.3, ano + 0.4);
  T.PIEZAS_NV.calendario(R, 156, 112, { s: 2, dia: 1974 });
  if (cae < 1) { const y = Math.round(112 + cae * 60), dx = Math.round(cae * 14); R.recorte([0, 0, 319, 141]); T.PIEZAS_NV.calendario(R, 156 + dx, y, { s: 2 }); R.recorte(null); }
  if (t > ano + 0.2 && t < ano + 1.4) for (let k = 0; k < 8; k++) { const a = k * 0.785 + t, r = 26 + Math.sin(t * 9 + k) * 2; R.pset(Math.round(156 + Math.cos(a) * r), Math.round(90 + Math.sin(a) * r * 0.9), hex('#fff0a0')); }
  // la dependienta de la freidora sube la cesta del aceite y la sacude
  const sube = Math.max(0, Math.sin((t - P2) * 1.6)), cy = Math.round(128 - sube * 8);
  const d1 = R.actor(EL.japonesa, 104, 148, t, { dir: -1, pal: { C: '#c8303a', c: '#8a1a24' }, sostiene: [96, cy], sonrisa: true, habla: t > P2 + 2.6 && t < P2 + 3.4 && Math.sin(t * 9) > 0 });
  { const [mx, my] = d1.mano; R.rect(mx - 6, my - 1, mx - 1, my, K); R.rect(mx - 18, my - 1, mx - 6, my + 6, K); for (let i = mx - 17; i < mx - 6; i += 2) for (let j = 0; j < 6; j += 2) R.pset(i, my + j, hex('#c8c8d0')); for (let i = mx - 16; i < mx - 7; i += 3) R.disco(i, my + 2, 1.5, hex('#d8902a')); if (sube > 0.6) for (let k = 0; k < 3; k++) R.pset(mx - 14 + k * 3, my + 8 + Math.floor(t * 10 + k) % 4, hex('#f0c040')); }
  // el dependiente trae la cubeta en «Kentucky» y la deja en el mostrador; en «Christmas» el cliente se la lleva
  const ut = tramo(t, campana, kentucky), deja = t > kentucky, coge = navidad - 0.1;
  const xd = Math.round(lerp(290, 190, ut)), d2 = R.actor(EL.japones, xd, 148, t, { dir: -1, pal: { C: '#c8303a', c: '#8a1a24' }, anda: ut > 0 && ut < 1, sostiene: deja ? null : [xd - 4, 132], sonrisa: deja, dedo: deja && t < navidad + 0.4 });
  T.mundoDelante(R, t, { encuadre: 'japon', camara: 'mostrador' });
  if (!deja) cubeta(d2.mano[0] - 2, d2.mano[1] + 8, 1.4);
  else if (t < coge) cubeta(178, 142, 1.6);
  // los clientes delante del mostrador (asoman la cabeza): uno habla, otro espera; el del centro coge la cubeta y se va
  R.actor(EL.japonesa, 34, 186, t, { dir: 1, pal: { C: '#3a4a7a', c: '#2a365a' }, habla: t > P2 + 2.4 && t < P2 + 3.6 && Math.sin(t * 9) > 0, sonrisa: true });
  R.actor(EL.japones, 270, 188, t, { dir: -1, pal: { C: '#4a5a3a', c: '#344228' }, sorpresa: t > ano && t < ano + 0.6, sonrisa: t > ano + 0.6 });
  const vase = tramo(t, navidad + 0.4, P3 + 0.4), xc = Math.round(lerp(172, 40, vase)), alza = t > coge - 0.5 && t < coge + 0.5;
  const cl = R.actor(EL.japones, xc, 186, t, { dir: -1, pal: { C: '#2a2a2a', c: '#1a1a1a' }, salto: alza ? 4 : 0, sostiene: t > coge - 0.5 ? [xc - 2, alza ? 160 : 170] : null, anda: vase > 0 && vase < 1, sonrisa: t > coge });
  if (t > coge) cubeta(cl.mano[0] - 1, cl.mano[1] + 8, 1.6);
  if (t > coge && t < coge + 1.0) for (let k = 0; k < 5; k++) { const a = k * 1.26 + t * 3; R.pset(Math.round(cl.mano[0] + Math.cos(a) * 14), Math.round(cl.mano[1] - 2 + Math.sin(a) * 9), hex('#fff0a0')); }
};

// el fondo local del plano 3: un salón japonés de noche (vigas, la hornacina con el rollo de un monte y la luna, el
// arbolito con luces, el calendario de pared, las puertas correderas de papel con la ciudad encendida detrás, el tatami)
let FJ = null;
const fondoJapon = () => {
  if (FJ) return FJ;
  FJ = R.nuevo(); const prev = R.usar(FJ);
  // la pared de barro claro, con su textura
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) { const n = hh(x >> 1, y >> 1, 21); R.pset(x, y, n < 0.15 ? hex('#c8b48e') : n > 0.88 ? hex('#ecdcb8') : hex('#dccaa2')); }
  // las vigas y los pilares de madera
  const mad = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, x === x0 || y === y0 ? hex('#2a1a10') : hh(x >> 1, y >> 3, 22) < 0.3 ? hex('#5a3a22') : hex('#7a5232')); };
  mad(0, 18, 270, 23); mad(0, 112, 319, 118); for (const px of [10, 112, 168, 268]) mad(px, 18, px + 5, 118);
  // la hornacina: el rollo colgado con el monte y la luna, el jarrón con la rama y la tarima
  mad(118, 98, 166, 104); R.rect(122, 30, 162, 97, hex('#a8946e'));
  R.rect(132, 32, 152, 86, K); R.rect(133, 33, 151, 85, hex('#f0e8d4'));
  for (let x = 133; x <= 151; x++) { const ym = 70 - Math.max(0, 10 - Math.abs(x - 142) * 1.2); for (let y = Math.round(ym); y <= 85; y++) R.pset(x, y, y < ym + 3 ? hex('#6a7a8a') : hex('#9aa8b4')); }
  R.disco(146, 44, 3, hex('#e85a3a')); R.rect(131, 31, 153, 32, hex('#5a3a22')); R.rect(131, 86, 153, 88, hex('#5a3a22'));
  R.poligono([[150, 98], [156, 98], [157, 88], [149, 88]], K); R.poligono([[151, 97], [155, 97], [156, 89], [150, 89]], hex('#3a5a8a'));
  R.linea(153, 88, 158, 74, hex('#3a2a1a')); R.linea(153, 88, 146, 78, hex('#3a2a1a')); for (const [bx, by] of [[158, 74], [146, 78], [156, 79], [149, 82]]) { R.disco(bx, by, 1.5, hex('#f0a0b8')); R.pset(bx, by, hex('#ffffff')); }
  // las puertas correderas (shoji): la izquierda fija; la derecha se abre en la escena
  // el tatami: esteras con su trenzado y sus bordes oscuros
  for (let y = 119; y < 180; y++) for (let x = 0; x < 320; x++) { const d = (y - 119) / 61, xx = (x - 160) / (0.6 + d * 0.4) + 160, mx = ((xx % 96) + 96) % 96, borde = mx < 3 || (y > 146 && y < 150);
    let c = borde ? hex('#2a3a2a') : ((y + (x >> 2)) % 3 === 0 ? hex('#a8a46a') : hh(x >> 1, y, 23) < 0.2 ? hex('#b0aa72') : hex('#c4bc84')); if (!borde && (x + y) % 41 === 0) c = hex('#8a8658'); R.pset(x, y, c); }
  R.usar(prev); return FJ;
};
// las puertas correderas con la ciudad de noche detrás (abre 0–1: la de la derecha se desliza)
const shoji = (t, abre) => {
  const x0 = 174, x1 = 266, y0 = 24, y1 = 111;
  // la noche detrás: cielo, bloques con ventanas encendidas que parpadean, nieve
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y < 60 ? hex('#1a2448') : hex('#24305a'));
  for (const [bx, bw, top] of [[176, 20, 54], [198, 26, 44], [226, 18, 60], [246, 22, 50]]) { R.poligono([[bx, top], [bx + bw, top], [bx + bw, y1], [bx, y1]], hex('#121830')); for (let y = top + 3; y < y1 - 2; y += 5) for (let x = bx + 2; x < bx + bw - 2; x += 4) if (hh(x, y, 24) < 0.5) R.pset(x, y, Math.sin(t * 1.5 + x * y) > 0.9 ? hex('#ffe08a') : hex('#e0a050')); }
  for (let k = 0; k < 14; k++) { const x = x0 + Math.round(hh(k, 1, 25) * 92), y = y0 + Math.round(((t * 9 + hh(k, 2, 25) * 90) % 88)); R.pset(x + Math.round(Math.sin(t + k) * 2), y, hex('#e8eef8')); }
  R.recorte(null);
  // los paneles de papel con su enrejado (iluminados desde dentro)
  const panel = (px, w) => { R.rect(px, y0, px + w, y1, hex('#3a2414')); R.rect(px + 2, y0 + 2, px + w - 2, y1 - 2, hex('#f4ecd8')); for (let x = px + 2; x < px + w - 2; x += 8) R.rect(x, y0 + 2, x, y1 - 2, hex('#6a4a2a')); for (let y = y0 + 2; y < y1 - 2; y += 11) R.rect(px + 2, y, px + w - 2, y, hex('#6a4a2a')); for (let y = y0 + 3; y < y1 - 2; y += 2) if (hh(px, y, 26) < 0.3) R.rect(px + 3, y, px + w - 3, y, hex('#e8dcc0')); };
  panel(x0, 46); panel(Math.round(x0 + 46 + abre * 42), 46);
};
const p3 = (t) => {
  R.copiar(fondoJapon());
  const abre = tramo(t, cubo - 0.6, cubo) - tramo(t, antes + 0.3, antes + 1.0);
  shoji(t, abre);
  // el calendario de diciembre: en «order» la madre rodea el 24
  T.PIEZAS_NV.calendario(R, 62, 100, { s: 3, marca: t > pide + 0.3 ? [24, 24] : undefined });
  if (t > pide - 0.4) { const u = tramo(t, pide - 0.4, pide + 0.3); for (let a = 0; a < u * 6.28; a += 0.15) { const x = Math.round(CAL24[0] + Math.cos(a) * 6), y = Math.round(CAL24[1] + Math.sin(a) * 5); R.pset(x, y, hex('#e8303a')); R.pset(x + 1, y, hex('#e8303a')); } }
  // el arbolito con luces y la lámpara de papel (andon) que da luz al suelo
  { const tx = 290, tb = 110; R.rect(tx - 1, tb - 4, tx + 1, tb, hex('#5a3a22')); R.poligono([[tx, tb - 30], [tx - 12, tb - 4], [tx + 12, tb - 4]], hex('#1e5a2a')); for (let k = 0; k < 10; k++) { const lx = tx + Math.round((hh(k, 1, 27) - 0.5) * 18 * (hh(k, 2, 27))), ly = tb - 8 - Math.round(hh(k, 2, 27) * 18); if (Math.sin(t * 3 + k * 1.7) > -0.2) R.pset(lx, ly, [hex('#f0c040'), hex('#f05a7a'), hex('#5ac0f0')][k % 3]); } R.pset(tx, tb - 31, hex('#ffe08a')); }
  { const ax = 26, ab = 154; R.rect(ax - 7, ab - 26, ax + 7, ab, K); R.rect(ax - 6, ab - 25, ax + 6, ab - 2, hex('#f8e0a0')); for (let y = ab - 22; y < ab - 2; y += 6) R.rect(ax - 6, y, ax + 6, y, hex('#a07a4a')); R.rect(ax, ab - 25, ax, ab - 2, hex('#a07a4a')); const fl = 0.5 + 0.5 * Math.sin(t * 6); if (fl > 0.3) R.rect(ax - 2, ab - 14, ax + 2, ab - 10, hex('#fff8d0')); for (let k = 0; k < 30; k++) { const a = hh(k, 1, 28) * 6.28, r = 10 + hh(k, 2, 28) * 16; R.pset(Math.round(ax + Math.cos(a) * r * 1.4), Math.round(ab + 2 + Math.abs(Math.sin(a)) * r * 0.3), hex('#e8d890')); } }
  // los cojines (zabuton) junto a la mesa
  for (const zx of [128, 270]) { R.poligono([[zx - 12, 168], [zx + 12, 168], [zx + 15, 178], [zx - 15, 178]], K); R.poligono([[zx - 11, 169], [zx + 11, 169], [zx + 14, 177], [zx - 14, 177]], hex('#4a5a9a')); R.pset(zx, 173, hex('#f0d8a0')); }
  // la madre rodea el 24 y va a la mesa; el padre entra por la corredera con la cubeta y la deja; el niño lo celebra
  const vm = tramo(t, pide + 0.6, semanas + 0.4), xm = Math.round(lerp(92, 150, vm)), sm = Math.round(lerp(130, 160, vm));
  R.actor(EL.japonesa, xm, sm, t, { dir: t < pide + 0.6 ? -1 : 1, anda: vm > 0 && vm < 1, dedo: t > pide - 0.6 && t < pide + 0.5, sonrisa: t > pide, brazos: t > antes && t < antes + 0.6 });
  const nino = R.actor(EL.ninoCatalan, 196, 157, t, { dir: t > cubo ? 1 : -1, pal: { H: '#1c1424', h: '#3a3046', C: '#e8a030', c: '#b87a20' }, sinObjeto: true, sonrisa: t > cubo, salto: t > semanas + 0.7 && Math.floor(t * 6) % 2 ? 3 : 0, brazos: t > semanas + 0.7, sorpresa: t > cubo - 0.2 && t < cubo + 0.4, habla: t < pide && Math.sin(t * 8) > 0 });
  const up = tramo(t, cubo - 0.1, semanas + 0.6), xp = Math.round(lerp(232, 226, up)), sp = Math.round(lerp(124, 162, up)), deja = t > semanas + 0.6;
  const pa = (t > cubo - 0.4) ? R.actor(EL.japones, xp, sp, t, { dir: -1, anda: up > 0 && up < 1, sostiene: deja ? null : [xp - 3, sp - 14], sonrisa: true, dedo: deja && t < antes + 0.8 }) : null;
  if (pa && !deja) cubeta(pa.mano[0] - 2, pa.mano[1] + 9, 1.4);
  // la mesa baja (kotatsu) con su colcha, las mandarinas, el té que humea y la cubeta
  const kx0 = 150, kx1 = 254, ky = 150;
  R.rect(kx0 - 6, ky, kx1 + 6, ky + 4, K); R.rect(kx0 - 5, ky + 1, kx1 + 5, ky + 3, hex('#7a5232')); R.rect(kx0 - 5, ky + 1, kx1 + 5, ky + 1, hex('#a07a4a'));
  R.poligono([[kx0 - 4, ky + 4], [kx1 + 4, ky + 4], [kx1 + 12, ky + 26], [kx0 - 12, ky + 26]], K);
  R.poligono([[kx0 - 3, ky + 5], [kx1 + 3, ky + 5], [kx1 + 11, ky + 25], [kx0 - 11, ky + 25]], (x, y) => ((Math.floor(x / 6) + Math.floor(y / 4)) % 2 ? hex('#a83a3a') : hex('#c84a4a')));
  for (let x = kx0 - 10; x < kx1 + 10; x += 9) R.disco(x, ky + 16, 1, hex('#f0d8a0'));
  R.disco(166, ky - 2, 6, K); R.disco(166, ky - 2, 5, hex('#3a5a8a')); R.rect(160, ky - 2, 172, ky, hex('#3a5a8a'));
  for (const [ox, oy] of [[163, ky - 5], [168, ky - 6], [166, ky - 8]]) { R.disco(ox, oy, 2.5, hex('#c86010')); R.disco(ox, oy, 2, hex('#f0901a')); R.pset(ox - 1, oy - 1, hex('#ffc060')); }
  R.rect(240, ky - 7, 246, ky - 1, K); R.rect(241, ky - 6, 245, ky - 1, hex('#5a7a5a'));
  for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; R.pset(243 + Math.round(Math.sin(t * 2 + k) * 2), Math.round(ky - 9 - u * 12), hex('#f0f0f0')); }
  if (deja) cubeta(214, ky, 1.6);
  if (deja && t < antes + 1.4) for (let k = 0; k < 6; k++) { const a = k * 1.05 + t * 2; R.pset(Math.round(214 + Math.cos(a) * 15), Math.round(ky - 12 + Math.sin(a) * 8), hex('#fff0a0')); }
  // el gato duerme en la colcha
  T.gato(R, 104, 172, t, { dir: 1 });
};
const CAL24 = [57, 78];
const efectos = [[0.6, 'coche'], [2.7, 'toc'], [pollo - 0.4, 'puerta'], [P2 + 0.4, 'burbujas'], [ano - 0.2, 'papel'], [kentucky + 0.05, 'toc'], [navidad, 'bip'], [pide - 0.3, 'lapiz'], [cubo - 0.5, 'puerta'], [semanas + 0.6, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t >= P2 && t < P3 ? 1974 : 2026) });
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['nv-playa'] = ('La playa y la Befana', '''// NV-PLAYA (frase 26), Australia e Italia, sin cartela. Cuatro planos:
// 1. (australia general) la playa en Navidad: un surfista corre al agua con su tabla en «beach», una niña hace un
//    castillo, la pelota rueda, las banderas ondean;
// 2. (australia 'parrilla', corta en «summer») Santa en bañador da la vuelta a las salchichas en «barbecue», se pone
//    crema en la nariz en «sunscreen» y en «flip-flops» sale de detrás de la parrilla en chanclas;
// 3. (italia general, corta en «And») los tejados de noche con la luna: la Befana cruza en escoba por delante de la luna,
//    aterriza en el caballete y se mete por la chimenea en «brings»;
// 4. (italia 'chimenea', corta en «brings») baja por el hogar con un poco de hollín, llena los calcetines de dulces en
//    «Sweets», echa el carbón en uno en «coal», que brilla de azúcar en «sugar», y se pone a barrer.''', r'''
const P2 = en('playa', 0.213), P3 = en('playa', 0.412), P4 = en('playa', 0.705);
const playa = en('playa', 0.101), parrilla = en('playa', 0.244), crema = en('playa', 0.286), santa = en('playa', 0.325), chanclas = en('playa', 0.355);
const italia = en('playa', 0.460), enero = en('playa', 0.489), befana = en('playa', 0.554), escoba = en('playa', 0.671);
const ultimos = en('playa', 0.727), dulces = en('playa', 0.814), buenos = en('playa', 0.849), resto = en('playa', 0.910), carbon = en('playa', 0.938), azucar = en('playa', 0.975);
const K = hex('#14121c');
// la escoba de la Befana bajo ella (x: el centro, y: el palo), con chispitas detrás
const escobaVuela = (x, y, t, dir = 1) => { T.PIEZAS_NV.escoba(R, x, y + 6, { dir: -dir }); for (let k = 0; k < 6; k++) { const u = (t * 2 + k / 6) % 1; R.pset(Math.round(x - dir * (16 + u * 26)), Math.round(y + 1 + Math.sin(t * 7 + k) * 3 + u * 2), u < 0.5 ? hex('#fff0a0') : hex('#f0c040')); } };

const p1 = (t) => {
  T.mundo(R, t, { encuadre: 'australia' });
  // el surfista corre hacia el agua con la tabla en «beach»; otra surfista llega andando
  const us = tramo(t, 0.5, playa + 1.6), xs = Math.round(lerp(40, 226, us));
  R.actor(EL.surfista, xs, Math.round(lerp(150, 124, us)), t, { dir: 1, anda: us > 0 && us < 1, sonrisa: true, salto: us > 0.2 && us < 1 && Math.floor(t * 6) % 2 ? 1 : 0 });
  const u2 = tramo(t, 0.2, P2), x2 = Math.round(lerp(330, 206, u2));
  R.actor(EL.surfista2, x2, 162, t, { dir: -1, anda: u2 > 0 && u2 < 1, sonrisa: true, dedo: u2 >= 1 });
  // la niña del castillo: pone la última torre y aplaude en «summer»
  const torre = tramo(t, 2.4, 3.2);
  R.actor(EL.ninaCatalana, 140, 166, t, { dir: -1, pal: { C: '#2a9ac8', c: '#1a7aa8', F: '#2a9ac8' }, sostiene: torre < 1 ? [134, 160] : null, brazos: t > 3.6 && Math.floor(t * 6) % 2 === 0, sonrisa: t > 3.2 });
  if (torre < 1) { const a = 0; R.rect(132 - 3, 156, 132 + 1, 160, hex('#c8a46a')); } else { R.rect(124, 140, 128, 145, hex('#14121c')); R.rect(125, 141, 127, 145, hex('#f0d8a0')); R.pset(126, 139, hex('#e03a2a')); }
};

const p2 = (t) => {
  T.mundo(R, t, { encuadre: 'australia', camara: 'parrilla' });
  // una bañista pasa por la orilla con su tabla
  { const u = (t - P2) / 4.2, x = Math.round(lerp(-20, 150, u)); R.actor(EL.surfista2, x, 118, t, { dir: 1, anda: true, pal: { C: '#3aa070', c: '#2a7a50' } }); }
  // Santa en bañador junto a la parrilla: da la vuelta a las salchichas con las pinzas en «barbecue»; en «sunscreen»,
  // crema en la nariz; en «flip-flops» da un saltito y se le ven las chanclas
  const xs = 106, ys = 168, pinzas = t < crema - 0.3 || t > crema + 0.9, bote = !pinzas;
  const voltea = pinzas && t > parrilla - 0.2 && Math.sin((t - parrilla) * 6) > 0;
  const salta = t > chanclas - 0.1 && t < chanclas + 0.9;
  const s = R.actor(EL.santaPlaya, xs, ys, t, { dir: 1, sostiene: pinzas ? [xs + 22, voltea ? 147 : 152] : [xs + 15, 146], sonrisa: true, sorpresa: t > crema && t < crema + 0.35, salto: salta ? Math.round(Math.abs(Math.sin((t - chanclas) * 7)) * 4) : 0, habla: t > chanclas + 1 && Math.sin(t * 8) > 0 });
  if (pinzas) { const [mx, my] = s.mano, px = 146, py = voltea ? 136 : 140; R.linea(mx, my, px, py, hex('#4a4e58')); R.linea(mx, my + 1, px, py + 2, hex('#b8bcc4')); if (voltea) { R.rect(px - 2, py - 3, px + 5, py - 1, K); R.rect(px - 1, py - 2, px + 4, py - 2, hex('#d07a40')); } }
  if (bote) { const [mx, my] = s.mano; R.rect(mx - 1, my - 7, mx + 2, my, K); R.rect(mx, my - 6, mx + 1, my - 1, hex('#f8f6f0')); R.rect(mx, my - 3, mx + 1, my - 3, hex('#f0a030')); if (t > crema - 0.1 && t < crema + 0.3) for (let k = 0; k < 3; k++) R.pset(mx - 1 - k, my - 8 - k, hex('#ffffff')); }
  if (t > crema) { const nx = s.cabeza[0] + 5, ny = s.cabeza[1] + 7; R.rect(nx - 1, ny - 1, nx + 1, ny, hex('#ffffff')); }
  // las chanclas: en «flip-flops», un destello alrededor de los pies
  if (t > chanclas - 0.1 && t < chanclas + 1.2) for (let k = 0; k < 6; k++) { const a = k * 1.05 + t * 4; R.pset(Math.round(xs + 7 + Math.cos(a) * 11), Math.round(ys - 1 + Math.sin(a) * 3), hex('#fff0a0')); }
  T.mundoDelante(R, t, { encuadre: 'australia', camara: 'parrilla' });
  // una gaviota llega volando, se posa en la nevera y mira las salchichas
  { const u = tramo(t, P2 + 0.5, P2 + 2.0), gx = Math.round(lerp(-10, 50, u)), gy = Math.round(lerp(96, 134, u)), p = u < 1 && Math.floor(t * 8) % 2;
    R.rect(gx, gy - 3, gx + 5, gy - 1, hex('#f8f6f0')); R.rect(gx + 1, gy - 1, gx + 4, gy - 1, hex('#c8c8cc')); R.pset(gx + 6, gy - 4, hex('#f8f6f0')); R.pset(gx + 7, gy - 4, hex('#f0a020')); R.pset(gx + 5, gy - 4, K);
    if (u < 1) { R.linea(gx + 1, gy - 3, gx - 2, gy - (p ? 7 : 1), hex('#c8c8cc')); } else { R.pset(gx + 2, gy, hex('#f0a020')); R.pset(gx + 4, gy, hex('#f0a020')); } }
};

// la Befana: vuela en escoba por delante de la luna, aterriza en el caballete y se mete por la chimenea
let BI = null;
const ATERRIZA = en('playa', 0.608) - 0.1;
const p3 = (t) => {
  if (!BI) BI = R.nuevo();
  const prev = R.usar(BI); T.mundo(R, t, { encuadre: 'italia' }); R.usar(prev); R.copiar(BI);
  // el vuelo por tramos: entra por la izquierda, cruza por delante de la luna en «January 6th», gira y baja al caballete
  const RUTA = [[P3 + 0.1, -30, 66], [enero, 70, 52], [befana, 150, 70], [ATERRIZA, 172, 139]];
  if (t < ATERRIZA) {
    let k = 0; while (k < RUTA.length - 2 && t > RUTA[k + 1][0]) k++;
    const [ta, xa, ya] = RUTA[k], [tb, xb, yb] = RUTA[k + 1], u = Math.max(0, Math.min(1, (t - ta) / (tb - ta)));
    const x = Math.round(lerp(xa, xb, u)), y = Math.round(lerp(ya, yb, u) - Math.sin(u * Math.PI) * (k === 1 ? 10 : 0));
    escobaVuela(x + 7, y + 1, t, 1);
    R.actor(EL.befana, x, y, t, { dir: 1, sonrisa: true, dedo: t > enero - 0.3 && t < enero + 0.9 });
    if (t > enero - 0.4 && t < enero + 0.5) for (let j = 0; j < 8; j++) { const a = j * 0.785; R.pset(Math.round(x + 7 + Math.cos(a) * 18), Math.round(y - 12 + Math.sin(a) * 18), hex('#fff8d0')); }
  } else {
    // en el caballete: camina a la chimenea, salta y se mete por ella (la chimenea la tapa)
    const w = tramo(t, ATERRIZA + 0.1, ATERRIZA + 0.7), salta = tramo(t, escoba - 0.5, escoba + 0.5);
    const xb = Math.round(lerp(172, 180, w) + (salta < 0.45 ? salta / 0.45 * 9 : 9));
    const yb = Math.round(salta < 0.45 ? lerp(139, 112, salta / 0.45) - Math.sin(salta / 0.45 * Math.PI) * 10 : 112 + (salta - 0.45) / 0.55 * 36);
    if (salta < 1) {
      R.actor(EL.befana, xb, yb, t, { dir: 1, anda: w > 0 && w < 1, sostiene: [xb + 15, yb - 11], sonrisa: true, brazos: false });
      R.linea(xb + 16, yb - 20, xb + 16, yb, hex('#6a3a1a')); R.linea(xb + 17, yb - 20, xb + 17, yb, hex('#3a1a0a'));
      for (let k = -2; k <= 2; k++) R.linea(xb + 16 + k, yb - 21, xb + 16 + k * 2, yb - 26, hex('#c8a040'));
    }
    // la chimenea de delante, repintada encima para que la Befana se meta dentro
    if (salta > 0.45) for (let y = 113; y < 180; y++) for (let x = 182; x < 210; x++) R.pset(x, y, BI[y * 320 + x]);
    if (salta > 0.55 && salta < 1) for (let k = 0; k < 5; k++) R.pset(190 + k * 3, 110 - Math.floor((t * 20 + k * 3) % 8), hex('#8a8a92'));
  }
  // un gato en el tejado se despierta y la mira pasar
  T.gato(R, 268, 140, t, { dir: -1 });
};

const p4 = (t) => {
  const ll = tramo(t, dulces, buenos + 0.3), cb = t > carbon ? 3 : -1;
  T.mundo(R, t, { encuadre: 'italia', camara: 'chimenea', llenos: ll, carbon: cb });
  // la Befana baja por el hogar (del hueco de arriba al suelo) con una nube de hollín
  // la guirnalda de rama de pino con naranjas secas sobre la pared y el reloj de pared que hace tictac
  for (let x = 24; x <= 256; x++) { const y = Math.round(28 + Math.sin((x - 24) / 232 * Math.PI * 4) ** 2 * 8); R.linea(x, y - 2, x - 1, y - 5, hex('#1e5a2a')); R.linea(x, y + 2, x - 1, y + 5, x % 3 ? hex('#2e7a3a') : hex('#14401e')); }
  for (const x of [53, 111, 169, 227]) { const y = 30 + Math.round(Math.sin(t * 1.3 + x) * 0.6); R.disco(x, y, 3, hex('#a84a0a')); R.disco(x, y, 2, hex('#f0901a')); R.pset(x, y, hex('#f8e0a0')); }
  { const cx = 262, cy = 70; R.disco(cx, cy, 9, K); R.disco(cx, cy, 8, hex('#8a5a3a')); R.disco(cx, cy, 6, hex('#f0ece0')); for (let k = 0; k < 12; k++) R.pset(Math.round(cx + Math.cos(k * 0.52) * 5), Math.round(cy + Math.sin(k * 0.52) * 5), K); const a = t * 6.28 / 6; R.linea(cx, cy, Math.round(cx + Math.cos(a) * 5), Math.round(cy + Math.sin(a) * 5), hex('#c82a2a')); R.linea(cx, cy, cx, cy - 4, K); R.linea(cx, cy + 9, cx + Math.round(Math.sin(t * 3.14) * 4), cy + 20, K); R.disco(cx + Math.round(Math.sin(t * 3.14) * 4), cy + 21, 2, hex('#d8a030')); }
  const sale = tramo(t, P4 - 0.25, P4 + 0.3), baja = sale, xb = Math.round(152 + sale * 14);
  const yb = Math.round(lerp(100, 166, sale) - Math.sin(sale * Math.PI) * 16);
  // los dulces que vuelan del saco a los calcetines (y el carbón al último)
  const escoba2 = t > azucar - 0.2;
  const b = R.actor(EL.befana, xb + (t > carbon + 0.5 ? Math.round(Math.sin((t - carbon) * 5) * 10) : 0), yb, t, { dir: t > dulces - 0.4 && t < resto ? 1 : -1, sorpresa: baja > 0.8 && t < P4 + 1.1, sonrisa: t > P4 + 1.1, anda: false, dedo: t > ultimos && t < ultimos + 1.0, brazos: t > dulces - 0.2 && t < buenos + 0.3, sostiene: escoba2 ? [xb + 2, 156] : null });
  if (sale > 0.8 && t < P4 + 2.4) for (let k = 0; k < 12; k++) { const u = (t - P4 - 0.75) * 0.7 + k / 12; const a = k * 0.52; R.pset(Math.round(xb + 7 + Math.cos(a) * (6 + u * 18)), Math.round(162 - Math.abs(Math.sin(a)) * (3 + u * 10)), k % 2 ? hex('#5a5a62') : hex('#8a8a92')); }
  // el saco de tela a sus pies
  if (sale >= 1) T.PIEZAS_NV.bolsa(R, xb + 22, 166, { s: 1 });
  [108, 142, 176, 210].forEach((cx, k) => { const t0 = dulces - 0.3 + k * 0.15, u = tramo(t, t0, t0 + 0.55); if (u <= 0 || u >= 1 || k === 3 && false) return; const x = lerp(xb + 22, cx + 2, u), y = lerp(150, 80, u) - Math.sin(u * Math.PI) * 20; R.disco(Math.round(x), Math.round(y), 1.6, [hex('#f04a8a'), hex('#3ac0e0'), hex('#f8c020'), hex('#7ad040')][k]); });
  { const u = tramo(t, carbon - 0.4, carbon + 0.15); if (u > 0 && u < 1) { const x = lerp(xb + 22, 212, u), y = lerp(150, 80, u) - Math.sin(u * Math.PI) * 24; T.PIEZAS_NV.carbon(R, Math.round(x), Math.round(y), { s: 1 }); } }
  if (t > azucar - 0.1) for (let k = 0; k < 8; k++) { const a = k * 0.785 + t * 3, r = 6 + Math.sin(t * 8 + k) * 2; R.pset(Math.round(210 + Math.cos(a) * r), Math.round(80 + Math.sin(a) * r), hex('#ffffff')); }
  // al final, barre con la escoba (polvo que se levanta)
  if (escoba2) { const m = b.mano, sw = Math.sin(t * 9) * 4; R.linea(m[0], m[1] - 8, Math.round(m[0] + sw), m[1] + 8, hex('#6a3a1a')); R.poligono([[m[0] + sw - 4, m[1] + 8], [m[0] + sw + 4, m[1] + 8], [m[0] + sw + 3, m[1] + 13], [m[0] + sw - 3, m[1] + 13]], hex('#c8a040')); for (let k = 0; k < 4; k++) R.pset(Math.round(m[0] + sw + (k - 2) * 3), m[1] + 12 - (Math.floor(t * 10 + k) % 4), hex('#b8b0a0')); }
};
const efectos = [[0.8, 'ola'], [playa + 0.2, 'whoosh'], [3.2, 'palmada'], [parrilla, 'vapor'], [crema + 0.05, 'chof'], [chanclas, 'toc'], [P3 + 0.4, 'whoosh'], [befana + 1.4, 'toc'], [escoba + 0.8, 'whoosh'], [P4 + 0.8, 'chof'], [dulces, 'pop'], [carbon + 0.1, 'toc'], [azucar, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
''')
