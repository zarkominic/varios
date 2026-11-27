E = {}

# ── lo común a las dos escenas: utilidades de pintura (tramas, mezclas, cifras de 3 × 5, nubes, pájaros) ──
UTIL = r'''
const ri = Math.round, H = (s) => hex(s), K = T.C.k;
const B4M = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const b4 = (x, y) => (B4M[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const h2 = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const cl = (u) => Math.max(0, Math.min(1, u)), ease = (u) => u * u * (3 - 2 * u);
const ps = (x, y, c) => R.pset(ri(x), ri(y), c);
const rr = (x0, y0, x1, y1, c) => R.rect(ri(Math.min(x0, x1)), ri(Math.min(y0, y1)), ri(Math.max(x0, x1)), ri(Math.max(y0, y1)), c);
const tine = (x, y, c, a) => { x = ri(x); y = ri(y); if (x < 0 || y < 0 || x > 319 || y > 179) return; const B = R.buf, i = y * 320 + x; B[i] = mez(B[i], c, a); };
const pal = (a) => a.map((c) => H(c));
const rmp = (ramp, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return ramp[Math.max(0, Math.min(ramp.length - 1, l))]; };
// aparece con un rebote (0 antes de a; 1 al final)
const pop = (t, a, d = 0.3) => { const u = Math.max(0, Math.min(1, (t - a) / d)); return u <= 0 ? 0 : u < 1 ? 1 - Math.pow(1 - u, 3) * Math.cos(u * 7) : 1; };
// las cifras de 3 × 5 (etiquetas, hojas de resultados), sin letras
const DIG = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001001001001', 8: '111101111101111', 9: '111101111001111' };
const cifras = (s, x, y, c, n = 99) => { let k = 0; for (const ch of String(s)) { if (k++ >= n) break; const g = DIG[ch]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } };
// una nube de tres tonos (sombra, cuerpo, luz) hecha de bollos, con el borde tramado
const BOLLOS = [[-0.36, 0.08, 0.26], [-0.12, -0.12, 0.33], [0.16, -0.06, 0.3], [0.38, 0.1, 0.22], [0.02, 0.14, 0.3], [-0.24, 0.16, 0.2]];
const nube = (cx, cy, w, cs) => {
  const x0 = ri(cx - w * 0.65), x1 = ri(cx + w * 0.65), y0 = ri(cy - w * 0.48), y1 = ri(cy + w * 0.36);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    let d = 9; for (const [a, b, r] of BOLLOS) { const q = ((x - cx - a * w) ** 2 + ((y - cy - b * w) * 1.5) ** 2) / (r * w) ** 2; if (q < d) d = q; }
    if (d > 1 || (d > 0.8 && b4(x, y) < (d - 0.8) * 5)) continue;
    const v = (y - (cy - w * 0.3)) / (w * 0.5) + (d > 0.7 ? 0.25 : 0);
    R.pset(x, y, v > 0.82 ? cs[0] : v > 0.42 + b4(x, y) * 0.2 ? cs[1] : cs[2]); }
};
// un pájaro lejano que bate las alas
const pajaro = (x, y, t, c, k = 0) => { x = ri(x); y = ri(y); const f = Math.floor(t * 6 + k * 1.7) % 3; ps(x, y, c); if (f === 0) { ps(x - 1, y - 1, c); ps(x + 1, y - 1, c); ps(x - 2, y - 1, c); ps(x + 2, y - 1, c); } else if (f === 1) { ps(x - 1, y, c); ps(x + 1, y, c); ps(x - 2, y - 1, c); ps(x + 2, y - 1, c); } else { ps(x - 1, y + 1, c); ps(x + 1, y + 1, c); ps(x - 2, y + 1, c); ps(x + 2, y + 1, c); } };
// la sombra blanda en el suelo
const sombraS = (cx, cy, w, a = 0.35) => { for (let i = -w; i <= w; i++) { const k = 1 - (i / (w + 1)) ** 2; tine(cx + i, cy, K, a * k); if (Math.abs(i) < w * 0.7) tine(cx + i, cy + 1, K, a * 0.6 * k); } };
// destello de cuatro puntas
const destello = (x, y, r, c = H('#fff8d0')) => { x = ri(x); y = ri(y); for (let k = 1; k <= r; k++) { ps(x + k, y, c); ps(x - k, y, c); ps(x, y + k, c); ps(x, y - k, c); } ps(x, y, H('#ffffff')); };
// el bulto de carbón: un trozo negro con facetas y brillos grafito
const carbon = (x, y, s = 1) => { x = ri(x); y = ri(y);
  const P = [[-3, -1], [-1, -3], [2, -3], [4, -1], [3, 2], [-2, 2]].map(([a, b]) => [x + a * s, y + b * s]);
  R.poligono(P.map(([a, b]) => [a + 1, b + 1]), K); R.poligono(P, H('#2c2826'));
  R.poligono([[x - 1 * s, y - 2 * s], [x + 2 * s, y - 2 * s], [x + 1 * s, y]], H('#4a4440')); ps(x + s, y - 2 * s, H('#9a948c')); ps(x - 2 * s, y, H('#5e5852')); ps(x + 2 * s, y + s, H('#1a1614')); };
// el hueso (una falange de gacela): blanco hueso con sus cabezas
const hueso = (x, y) => { x = ri(x); y = ri(y); rr(x - 5, y - 2, x + 5, y + 1, K); rr(x - 4, y - 1, x + 4, y, H('#e8dcc0')); for (const s of [-1, 1]) { rr(x + s * 5 - 1, y - 3, x + s * 5 + 1, y + 2, K); ps(x + s * 5, y - 2, H('#f4ecd8')); ps(x + s * 5, y + 1, H('#c8b898')); ps(x + s * 5, y - 1, H('#e8dcc0')); ps(x + s * 5, y, H('#d8ccb0')); } rr(x - 3, y, x + 3, y, H('#c8b898')); };
// la bolsita de muestras: plástico transparente con su cierre rojo y la etiqueta con el número
const bolsa = (x, y, n, dentro = []) => { x = ri(x); y = ri(y);
  for (let j = 0; j < 14; j++) for (let i = 0; i < 12; i++) tine(x - 6 + i, y - 7 + j, H('#eaf4fa'), 0.38);
  R.linea(x - 7, y - 8, x - 7, y + 7, H('#5a6a78')); R.linea(x + 6, y - 8, x + 6, y + 7, H('#5a6a78')); R.linea(x - 7, y + 7, x + 6, y + 7, H('#5a6a78'));
  R.linea(x - 6, y - 8, x + 5, y - 8, H('#c83a3a')); R.linea(x - 6, y - 7, x + 5, y - 7, H('#e85a4a'));
  for (const f of dentro) f();
  rr(x - 4, y + 1, x + 3, y + 5, H('#f4f0e4')); cifras(n, x - 3, y + 1, K, 2); ps(x - 5, y - 4, H('#ffffff')); ps(x - 5, y - 3, H('#ffffff'));
};
'''

# ── el último plano de gb-fechas (el laboratorio). gb-carbono lo congela: es este MISMO bloque, copiado literal ──
LAB = r'''
// LAB · el laboratorio del carbono 14 (último plano de gb-fechas; gb-carbono lo congela con este bloque, literal).
// La máquina acaba la medida (o.muestra 0,62 → 1): el haz cruza, la pantalla se pone verde y sale «9500»; la técnica
// lo mira y abre el libro de texto (una espiga con su flecha: «la agricultura viene después»); el arqueólogo entra con
// la caja de bolsitas, señala la pantalla y se encoge de hombros con la técnica, que se queda con el «?».
const libro = (x, y, abierto) => { x = ri(x); y = ri(y);
  if (!abierto) { rr(x - 5, y - 4, x + 5, y + 3, K); rr(x - 4, y - 3, x + 4, y + 2, H('#3a6ab0')); rr(x - 4, y + 2, x + 4, y + 2, H('#f4f0e4')); ps(x - 3, y - 2, H('#6a9ad8')); return; }
  rr(x - 10, y - 6, x + 10, y + 3, K); rr(x - 9, y - 5, x - 1, y + 2, H('#f6f2e6')); rr(x + 1, y - 5, x + 9, y + 2, H('#ece6d6')); R.linea(x, y - 5, x, y + 2, H('#b8b0a0'));
  // la espiga dibujada en la página de la izquierda y la flecha que dice «más tarde» en la otra
  R.linea(x - 5, y + 1, x - 5, y - 4, H('#8a6a2a')); for (let k = 0; k < 3; k++) { ps(x - 6, y - 3 + k, H('#d8a840')); ps(x - 4, y - 3 + k, H('#e0b850')); } ps(x - 5, y - 5, H('#e0b850'));
  R.linea(x + 3, y - 1, x + 7, y - 1, H('#c83a3a')); ps(x + 6, y - 2, H('#c83a3a')); ps(x + 6, y, H('#c83a3a'));
  R.linea(x + 3, y + 1, x + 8, y + 1, H('#9a9488')); R.linea(x + 3, y - 4, x + 6, y - 4, H('#9a9488'));
};
const cajaBolsas = (x, y) => { x = ri(x); y = ri(y); rr(x - 6, y - 5, x + 6, y + 3, K); rr(x - 5, y - 4, x + 5, y + 2, H('#c8a46a')); rr(x - 5, y - 4, x + 5, y - 3, H('#e0c08a')); ps(x - 3, y - 6, H('#eaf4fa')); ps(x - 2, y - 6, H('#c83a3a')); ps(x + 1, y - 6, H('#eaf4fa')); ps(x + 2, y - 6, H('#c83a3a')); cifras('23', x - 3, y - 2, H('#5a3a1a')); };
const labPlano = (t, enC) => {
  const L0 = enC(0.8336), TEXTO = enC(0.9046), CAMPO = enC(0.9383), NACIDO = enC(0.9728);
  const g = T.arqueologos(R, t, { encuadre: 'laboratorio', muestra: 0.62 + 0.38 * tramo(t, L0, L0 + 1.1) });
  // en el suelo: el cable del detector que serpentea, la caja de cartón con las bolsitas de otros yacimientos y la fregona
  for (let x = 30; x < 300; x++) { const y = 172 + Math.round(Math.sin(x * 0.05) * 2 + Math.sin(x * 0.013) * 3); R.pset(x, y, K); R.pset(x, y - 1, H('#3a3a44')); }
  rr(20, 152, 44, 170, K); rr(21, 153, 43, 169, H('#c8a46a')); rr(21, 153, 43, 155, H('#e0c08a')); rr(30, 153, 33, 169, H('#d8b878')); for (const [i, c] of [[24, '#c83a3a'], [28, '#eaf4fa'], [36, '#c83a3a'], [40, '#eaf4fa']]) rr(i, 149, i + 2, 152, H(c)); cifras('17', 35, 160, H('#5a3a1a'));
  rr(284, 150, 300, 172, K); rr(285, 151, 299, 171, H('#e8c020')); rr(285, 151, 299, 152, H('#f8e060')); R.linea(292, 112, 296, 151, H('#9a7a50')); rr(289, 160, 295, 164, H('#3a8ad8'));
  const listo = g.listo;
  if (listo) { const [nx, ny] = g.numero; R.numero('9500', nx, ny, { centro: true }); }
  // el 9500 grande que sube de la pantalla en cuanto se enciende
  const sube = pop(t, L0 + 1.0, 0.45); if (sube > 0) R.numero('9500', 200, ri(lerp(118, 88, sube)), { tam: 16, centro: true });
  // el arqueólogo entra con la caja de bolsitas y se para junto al banco
  const u = tramo(t, L0 + 0.1, L0 + 2.0), ax = ri(lerp(-22, 92, ease(u)));
  const señala = t > CAMPO - 0.2 && t < NACIDO - 0.1, hombros = t > NACIDO - 0.1;
  const a = R.actor(EL.arqueologoGB, ax, 160, t, { dir: 1, anda: u > 0 && u < 1, sostiene: señala || hombros ? undefined : [ax + 13, 146], dedo: señala, brazos: hombros, sonrisa: u >= 1 && !hombros, sorpresa: hombros });
  if (!señala && !hombros) cajaBolsas(a.mano[0], a.mano[1]); else { sombraS(ax + 22, 161, 7, 0.4); cajaBolsas(ax + 22, 158); }
  // la técnica: mira la pantalla, coge el libro de texto y lo abre; compara y se queda con la duda
  const abre = t > TEXTO + 0.25, mira = t < TEXTO - 0.3 ? 1 : (t > CAMPO + 0.4 && t < NACIDO - 0.2) ? 1 : -1;
  const b = R.actor(EL.laboratorioGB, 150, 160, t, { dir: mira, sorpresa: listo && t < TEXTO - 0.3 || t > NACIDO, sostiene: t > TEXTO - 0.3 ? (mira > 0 ? [168, 140] : [138, 140]) : undefined, dedo: t <= TEXTO - 0.3 && listo });
  if (t > TEXTO - 0.3) libro(b.mano[0], b.mano[1] - 2, abre);
  else libro(122, 108, false);   // el libro, en el banco, antes de cogerlo
  if (t > NACIDO + 0.05) R.bocadillo(b.cabeza[0], b.cabeza[1] - 4, { icono: '?' });
  if (t > CAMPO + 0.1 && t < NACIDO - 0.1) R.bocadillo(a.cabeza[0], a.cabeza[1] - 4, { icono: '!' });
  return g;
};
'''

W_FECHAS = r'''const W = { AND: en('carbon', 0.0000), QUESTION: en('carbon', 0.0241), CHANGES: en('carbon', 0.0462), EVERYTHING: en('carbon', 0.0613), BECAUSE: en('carbon', 0.0944), SENDS: en('carbon', 0.1275), CHARCOAL: en('carbon', 0.1378), BONE: en('carbon', 0.1667), FROM: en('carbon', 0.1764), EARTH: en('carbon', 0.2032), PILLARS: en('carbon', 0.2349), ANALYSIS: en('carbon', 0.2563), AND3: en('carbon', 0.2921), DATES: en('carbon', 0.3045), COME: en('carbon', 0.3148), BACK: en('carbon', 0.3245), SO: en('carbon', 0.3355), OLD: en('carbon', 0.3507), HARD: en('carbon', 0.3734), BELIEVE: en('carbon', 0.3872), FIRST: en('carbon', 0.4030), THE5: en('carbon', 0.4375), ENCLOSURES: en('carbon', 0.4513), WENT: en('carbon', 0.4754), UP: en('carbon', 0.4857), N9500: en('carbon', 0.5016), BC: en('carbon', 0.5470), THATS: en('carbon', 0.6221), N6: en('carbon', 0.6538), YEARS: en('carbon', 0.6779), STONEHENGE: en('carbon', 0.7000), N7: en('carbon', 0.7482), PYRAMIDS: en('carbon', 0.7992), GIZA: en('carbon', 0.8212), AT2: en('carbon', 0.8336), TEXTBOOKS: en('carbon', 0.9046), FARMING: en('carbon', 0.9383), BORN: en('carbon', 0.9728) };'''

E['gb-fechas'] = ('Las fechas', '''// GB-FECHAS (frase 12, «carbon»), 1998 → −9500 → 1998. Seis planos, cortados en la palabra:
// 1 · LA CASA DE LA EXCAVACIÓN (1998, monitor de tubo, catas y andamio por la ventana): Schmidt, tras la mesa de los hallazgos,
//   mira un trozo de carbón; «?» en «question»; lo alza en «changes everything»; la arqueóloga llega con una bolsita abierta y
//   él lo mete en «sends». Corta en «charcoal».
// 2 · FONDO LOCAL «el pie del pilar en la cata»: el pilar con brazos y zorro medio enterrado ante el muro de piedra seca; una
//   mano con la paleta saca el carbón de la capa de ceniza («charcoal») y lo echa a la bolsita «23»; luego el hueso («bone»);
//   en «analysis» la bolsa se cierra. Un escarabajo, la cuerda de la cuadrícula, un trabajador con su cubo arriba. Corta en «And».
// 3 · FONDO LOCAL «el sobre de los resultados en la mesa»: la mano saca la hoja del sobre de correo aéreo («the dates come
//   back»); las cifras (11 600, 11 500…) se marcan en amarillo en «so old»; la mano da dos golpecitos en «hard to believe» y
//   salen «!» y «?»; la pata del gato entra y empuja el lápiz. Corta en «The first».
// 4 · FONDO LOCAL «la línea del tiempo, de cerca» (−9500): la regla de madera de los años sobre la estepa; dos cazadores
//   levantan un pilar en T junto al hito del 9500 («went up»); al quedar de pie sale el «9500» grande («9500») y la cazadora y el
//   niño lo celebran en «BC». Gacelas, nubes, pájaros. Corta en «That's».
// 5 · FONDO LOCAL «la línea del tiempo, de lejos»: toda la regla de 9500 a 2000; Stonehenge sale del pilar y se aleja a la
//   derecha hasta el 3000 mientras la flecha cuenta «6000» («Stonehenge»); luego las pirámides hasta su sitio con «7000»
//   («Giza»); el niño corre detrás y se queda sin aliento. Corta en «at a time».
// 6 · EL LABORATORIO (1998): la máquina acaba, «9500» en la pantalla y en grande; la técnica abre el libro de texto (la espiga
//   «después») en «textbooks», el arqueólogo señala en «farming» y los dos se encogen de hombros con el «?» en «born yet».''', UTIL + LAB + W_FECHAS + r'''
const enC = (f) => en('carbon', f);
const P2 = W.CHARCOAL, P3 = W.AND3, P4 = W.THE5, P5 = W.THATS, P6 = W.AT2;

// ── 1 · la casa de la excavación ───────────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  T.arqueologos(R, t, { encuadre: 'casa', anos: 1998 });
  const u = tramo(t, 0.4, 2.6), ax = ri(lerp(336, 248, ease(u)));
  const mete = tramo(t, W.SENDS - 0.05, W.SENDS + 0.55);
  const alza = t > W.CHANGES - 0.1;
  // la mano de Schmidt: mira el carbón a la altura del pecho, lo alza, y lo lleva a la bolsa
  const sx = 196, m0 = [sx + 16, 136], m1 = [sx + 17, 126], m2 = [sx + 22, 133];
  const mano = mete > 0 ? [lerp(m1[0], m2[0], ease(mete)), lerp(m1[1], m2[1], ease(mete))] : alza ? [lerp(m0[0], m1[0], ease(tramo(t, W.CHANGES - 0.1, W.CHANGES + 0.3))), lerp(m0[1], m1[1], ease(tramo(t, W.CHANGES - 0.1, W.CHANGES + 0.3)))] : m0;
  const s = R.actor(EL.schmidtGB, sx, 150, t, { dir: 1, sostiene: [ri(mano[0]), ri(mano[1])], sorpresa: t > W.CHANGES && t < W.EVERYTHING + 0.4, sonrisa: t > W.EVERYTHING + 0.4 });
  const a = R.actor(EL.arqueologaGB, ax, 150, t, { dir: -1, anda: u > 0 && u < 1, sostiene: u >= 1 ? [ax - 4, 134] : undefined, sonrisa: mete >= 1 });
  T.arqueologosDelante(R, t, { encuadre: 'casa', anos: 1998, ordena: 1 });
  const dentro = mete >= 1 ? [() => carbon(a.mano[0] - 1, a.mano[1] + 2, 1.2)] : [];
  if (u >= 1) bolsa(a.mano[0] - 1, a.mano[1] + 1, '23', dentro);
  if (mete < 1) carbon(s.mano[0] + 2, s.mano[1] - 3, 1.5);
  if (t > W.QUESTION && t < W.EVERYTHING + 0.3) R.bocadillo(s.cabeza[0], s.cabeza[1] - 4, { icono: t > W.CHANGES + 0.1 ? '!' : '?' });
  if (t > W.EVERYTHING && t < W.SENDS - 0.2 && Math.floor(t * 6) % 2) destello(s.mano[0] + 4, s.mano[1] - 5, 2);
};

// ── 2 · el pie del pilar en la cata (fondo local) ───────────────────────────────────────────────────────────────────
let BG2 = null;
const PIEDRA = pal(['#5e5242', '#7e7058', '#a09074', '#bcae90', '#d8ccae']);
const TIERRA = pal(['#4a3022', '#68442c', '#865a38', '#a07248', '#b88c5e']);
const llena2 = (x) => 142 + Math.round(Math.sin(x * 0.045) * 3 + Math.sin(x * 0.11 + 1) * 1.5 + (x > 200 ? (x - 200) * 0.06 : 0));
const fondo2 = () => {
  if (!BG2) {
    BG2 = R.nuevo(); const prev = R.usar(BG2);
    // el cielo de verano, tramado, que se blanquea hacia el borde de la cata, y la sierra lejana
    const CI = pal(['#5a90cc', '#6fa0d6', '#88b4e0', '#a6c8e6', '#c4dcea']);
    for (let y = 0; y < 32; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(CI, y / 32 * 4.2, x, y));
    for (let x = 0; x < 320; x++) { const yy = 25 + Math.round(Math.sin(x * 0.03) * 2 + Math.sin(x * 0.09 + 2) * 1.5); for (let y = yy; y < 32; y++) R.pset(x, y, (x + y) & 1 ? H('#9aaac0') : H('#a8b6c8')); }
    // el borde de la cata: tierra con hierba seca, sacos terreros, el cubo de goma y la carretilla
    for (let y = 32; y < 42; y++) for (let x = 0; x < 320; x++) { const v = (y - 32) / 10 * 3 + (h2(x, y, 3) - 0.5) * 1.4; R.pset(x, y, rmp(TIERRA, 4 - v, x, y)); }
    for (let x = 0; x < 320; x += 2) { const hh = 2 + Math.floor(h2(x, 1, 4) * 4); for (let k = 0; k < hh; k++) R.pset(x + (k > 2 ? 1 : 0), 33 - k, k > 1 ? H('#c8b070') : H('#9a8450')); }
    for (const [x0, n] of [[8, 4], [186, 3]]) for (let k = 0; k < n; k++) { const x = x0 + k * 14; R.rect(x, 34, x + 13, 42, K); R.rect(x + 1, 35, x + 12, 41, H('#cbb88a')); R.rect(x + 1, 35, x + 12, 36, H('#e0d0a6')); R.rect(x + 1, 40, x + 12, 41, H('#a8946a')); for (let i = 2; i < 12; i += 3) R.pset(x + i, 38, H('#b8a47a')); }
    R.rect(244, 30, 256, 42, K); R.rect(245, 31, 255, 41, H('#2e2e34')); R.rect(245, 31, 255, 32, H('#4a4a54')); R.rect(246, 33, 247, 40, H('#3c3c44'));
    // el muro de piedra seca del recinto: lajas irregulares de caliza con barro entre medias, luz arriba a la izquierda
    for (let y = 42; y < 160; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(pal(['#3a2c20', '#4e3c2a', '#625038']), 1 + (h2(x, y, 14) - 0.5) * 1.6, x, y));
    let y = 43, fila = 0;
    while (y < 160) { const alto = 4 + Math.floor(h2(fila, 2, 5) * 6); let x = -Math.floor(h2(fila, 3, 5) * 14);
      while (x < 320) { const an = 8 + Math.floor(h2(x, fila, 6) * 18), dy = Math.floor(h2(x, fila, 15) * 3) - 1, al = alto - Math.floor(h2(x, fila, 16) * 2), tono = (h2(x, fila, 17) - 0.5) * 1.2;
        const x0 = x + 1, x1 = Math.min(319, x + an - 2), y0 = y + dy + 1, y1 = Math.min(159, y + dy + al - 1);
        for (let j = y0; j <= y1; j++) for (let i = Math.max(0, x0); i <= x1; i++) { if ((i === x0 || i === x1) && (j === y0 || j === y1)) continue;
          const v = 2.1 + tono + (j === y0 ? 1.3 : 0) + (i === x0 ? 0.5 : 0) - (j === y1 ? 1.1 : 0) - (i === x1 ? 0.7 : 0) + (h2(i, j, 7) - 0.5) * 0.8 - (y > 104 ? 0.3 : 0) + (h2(i >> 2, j >> 1, 18) > 0.85 ? -0.7 : 0);
          R.pset(i, j, rmp(PIEDRA, v, i, j)); }
        if (h2(x, fila, 19) > 0.7) R.pset(Math.min(319, x0 + 3), y0 + 1, H('#e8dcc0'));
        x += an; }
      y += alto; fila++; }
    // la sombra del borde sobre el muro (el sol de la tarde) y unas raíces que cuelgan
    for (let x = 0; x < 320; x++) { const s = 6 + Math.round(Math.sin(x * 0.02) * 2); for (let k = 0; k < s; k++) tine(x, 42 + k, K, 0.4 - k * 0.05); }
    for (const x0 of [40, 170, 286]) { let x = x0; for (let j = 42; j < 62 + (x0 % 7); j++) { x += Math.round(Math.sin(j * 0.5 + x0) * 0.6); R.pset(x, j, H('#4a3424')); } }
    // el pilar con brazos, manos, cinturón y zorro
    T.d_pilar(R, 96, 250, { escala: 3, relieves: ['zorro'], luz: 0.7, sombra: false });
    // el relleno de tierra por delante, en capas: tierra rojiza, la lente de ceniza gris con carbones, tierra parda con piedras
    for (let x = 0; x < 320; x++) { const y0 = llena2(x);
      for (let y = y0; y < 180; y++) { const capa = y - y0, ceniza = capa > 7 && capa < 15 + Math.round(Math.sin(x * 0.07) * 2) && x > 24 && x < 300;
        let v = 3.3 - capa * 0.03 + Math.sin((y + Math.sin(x * 0.05) * 3) * 0.42) * 0.55 + (h2(x, y, 8) - 0.5) * 1.1 - (capa < 2 ? -0.6 : 0);
        let c = rmp(TIERRA, v, x, y);
        if (ceniza) c = rmp(pal(['#2e2a28', '#4a4440', '#66605a', '#847e76']), 1.8 + (h2(x, y, 9) - 0.5) * 1.8, x, y);
        if (h2(x, y, 10) > 0.975) c = ceniza ? K : H('#d8ccb0');
        R.pset(x, y, c); } }
    for (let k = 0; k < 34; k++) { const x = 4 + Math.floor(h2(k, 1, 12) * 310), yy = llena2(x) + 18 + Math.floor(h2(k, 2, 12) * 44), w = 3 + Math.floor(h2(k, 3, 12) * 5), hh = 2 + Math.floor(h2(k, 4, 12) * 3);
      if (Math.abs(x - 214) < 22 && yy < 172) continue; R.rect(x, yy, x + w, yy + hh, K); R.rect(x, yy, x + w - 1, yy + hh - 1, H('#b0a286')); R.rect(x, yy, x + w - 1, yy, H('#d8ccae')); R.pset(x + w - 1, yy + hh - 1, H('#7e7058')); }
    for (const [x, y] of [[60, 160], [140, 166], [282, 162]]) { let xx = x; for (let j = 0; j < 14; j++) { xx += Math.sin(j * 0.8 + x) > 0 ? 1 : 0; R.pset(xx, y + j * 0.6, H('#3a2416')); } }
    // la cuerda de la cuadrícula con su estaca, y la regla de escala roja y blanca clavada
    R.linea(0, 140, 319, 132, H('#e8e0c8')); R.linea(0, 141, 319, 133, H('#a89a7a'));
    R.rect(300, 110, 303, 150, K); R.rect(301, 111, 302, 149, H('#c8a46a'));
    for (let k = 0; k < 6; k++) R.rect(14, 128 + k * 7, 18, 134 + k * 7, k & 1 ? H('#f4f0e4') : H('#c83a3a')); R.rect(13, 127, 13, 172, K); R.rect(19, 127, 19, 172, K);
    // el cubo de goma y la brocha, en la esquina de delante
    R.rect(272, 156, 304, 180, K); R.rect(273, 157, 303, 180, H('#2e2e34')); R.rect(273, 157, 303, 159, H('#4a4a54')); for (let x = 276; x < 302; x += 5) R.rect(x, 161, x, 179, H('#3a3a42'));
    R.rect(24, 170, 48, 173, K); R.rect(25, 171, 40, 172, H('#a8743e')); R.rect(41, 169, 50, 174, K); R.rect(42, 170, 49, 173, H('#d8c8a0')); for (let x = 43; x < 49; x++) R.pset(x, 174, H('#8a7a5a'));
    R.usar(prev);
  }
  R.buf.set(BG2);
};
// la bolsita grande (de cerca)
const bolsaG = (x, y, n, dentro = [], cerrada = 0) => { x = ri(x); y = ri(y);
  for (let j = 0; j < 26; j++) for (let i = 0; i < 22; i++) tine(x - 11 + i, y - 13 + j, H('#eaf4fa'), 0.4);
  R.linea(x - 12, y - 14, x - 12, y + 13, H('#4a5a68')); R.linea(x + 11, y - 14, x + 11, y + 13, H('#4a5a68')); R.linea(x - 12, y + 13, x + 11, y + 13, H('#4a5a68'));
  for (const f of dentro) f();
  const bo = ri(lerp(-17, -14, cerrada)); rr(x - 11, y + bo, x + 10, y + bo + 1, H('#c83a3a')); rr(x - 11, y + bo, x + 10, y + bo, H('#e85a4a'));
  rr(x - 8, y + 3, x + 7, y + 11, K); rr(x - 7, y + 4, x + 6, y + 10, H('#f4f0e4')); cifras(n, x - 4, y + 5, K, 2);
  R.linea(x - 10, y - 10, x - 10, y - 2, H('#ffffff'));
};
const huesoG = (x, y) => { x = ri(x); y = ri(y); rr(x - 9, y - 3, x + 9, y + 2, K); rr(x - 8, y - 2, x + 8, y + 1, H('#e8dcc0')); rr(x - 8, y + 1, x + 8, y + 1, H('#c8b898'));
  for (const s of [-1, 1]) { rr(x + s * 9 - 2, y - 5, x + s * 9 + 2, y + 4, K); rr(x + s * 9 - 1, y - 4, x + s * 9 + 1, y + 3, H('#f0e6d0')); ps(x + s * 9 - 1, y - 4, H('#ffffff')); ps(x + s * 9 + 1, y + 3, H('#c8b898')); } };
const p2 = (t) => {
  fondo2();
  const r = t - P2;
  for (const [k, v, y, w, cs] of [[0, 3, 10, 34, pal(['#a8bcd4', '#d6e2ee', '#f6f9fb'])], [1, 5, 18, 26, pal(['#b4c6da', '#e0e8f0', '#fafcfd'])], [2, 8, 6, 20, pal(['#bccbdc', '#e6edf3', '#ffffff'])]]) nube(((t * v + k * 130) % 400) - 40, y, w, cs);
  for (let k = 0; k < 3; k++) pajaro(((t * (16 + k * 4) + k * 90) % 360) - 20, 8 + k * 5 + Math.sin(t * 2 + k) * 2, t, H('#2a2a34'), k);
  // el trabajador que pasa por el borde con el cubo de tierra, de derecha a izquierda
  const wx = ri(lerp(236, -24, tramo(r, 0.1, 4.3)));
  const w = R.actor(EL.arqueologoGB, wx, 41, t, { dir: -1, anda: true, sostiene: [wx - 3, 31] });
  rr(w.mano[0] - 4, w.mano[1] - 1, w.mano[0] + 3, w.mano[1] + 5, K); rr(w.mano[0] - 3, w.mano[1], w.mano[0] + 2, w.mano[1] + 4, H('#2e2e34')); rr(w.mano[0] - 3, w.mano[1] - 1, w.mano[0] + 2, w.mano[1] - 1, H('#86603e'));
  // la etiqueta que cuelga de la cuerda y se mece
  const ex = 252, ey = 133 + Math.round(Math.sin(t * 3) * 1); R.linea(ex, 133, ex + Math.round(Math.sin(t * 3)), ey + 3, H('#8a8070')); rr(ex - 5, ey + 3, ex + 5, ey + 11, K); rr(ex - 4, ey + 4, ex + 4, ey + 10, H('#f4f0e4')); cifras('23', ex - 3, ey + 5, H('#3a3a44'));
  // el escarabajo que recorre la capa de ceniza, y migas de tierra que caen del borde
  const bx = ri(300 - ((t * 9) % 140)), by = llena2(bx) + 5; rr(bx - 2, by - 1, bx + 2, by + 1, K); ps(bx - 1, by - 1, H('#4a6a3a')); ps(bx, by - 1, H('#5a8a46')); ps(bx + ((Math.floor(t * 8) & 1) ? -3 : 3), by + 1, K);
  for (let k = 0; k < 3; k++) { const u = (t * 0.7 + k * 0.33) % 1, x = 150 + k * 60; ps(x, 44 + u * 76, H('#86603e')); ps(x + 1, 45 + u * 76, H('#68442c')); }
  // el carbón (en la ceniza) y el hueso, a la bolsita «23»; en «analysis» se cierra
  const BX = 214, BY = 164;
  const cA = tramo(t, P2 + 0.1, P2 + 0.7), cB = tramo(t, P2 + 0.8, P2 + 1.35);
  const hA = tramo(t, W.BONE + 0.35, W.BONE + 0.95), hB = tramo(t, W.BONE + 1.05, W.BONE + 1.7);
  const cierra = tramo(t, W.ANALYSIS - 0.1, W.ANALYSIS + 0.4);
  const carbonEn = [158, llena2(158) + 10], huesoEn = [262, llena2(262) + 12];
  let hx, hy, lleva = null;
  if (cB < 1) { const a = ease(cA), b = ease(cB); hx = lerp(lerp(250, carbonEn[0] + 24, a), BX + 22, b); hy = lerp(lerp(176, carbonEn[1] + 4, a), BY - 16 - Math.sin(b * Math.PI) * 6, b); if (cA >= 1) lleva = 'c'; }
  else if (hB < 1) { const a = ease(hA), b = ease(hB); hx = lerp(lerp(BX + 22, huesoEn[0] + 24, a), BX + 22, b); hy = lerp(lerp(BY - 16, huesoEn[1] + 4, a), BY - 16 - Math.sin(b * Math.PI) * 6, b); if (hA >= 1) lleva = 'h'; }
  else { hx = lerp(BX + 22, BX + 30, cierra); hy = lerp(BY - 16, BY - 8, cierra); }
  if (cA < 1) { carbon(carbonEn[0], carbonEn[1], 2); if (t > P2 - 0.1 && Math.floor(t * 5) % 2) destello(carbonEn[0] + 7, carbonEn[1] - 7, 2); }
  if (hA < 1) huesoG(huesoEn[0], huesoEn[1]);
  const dentro = []; if (cB >= 1) dentro.push(() => carbon(BX - 4, BY - 3, 1.6)); if (hB >= 1) dentro.push(() => huesoG(BX + 1, BY - 6));
  bolsaG(BX, BY, '23', dentro, cierra);
  if (cierra >= 1 && t < W.ANALYSIS + 0.9) destello(BX + 12, BY - 16, 3);
  // la paleta de punta (acero) en la mano, y el brazo canónico que entra desde abajo a la derecha
  const px = ri(hx - 13), py = ri(hy + 1);
  R.poligono([[px - 16, py + 1], [px - 4, py - 4], [px + 1, py + 1], [px - 4, py + 6]], K); R.poligono([[px - 14, py + 1], [px - 4, py - 3], [px, py + 1], [px - 4, py + 5]], H('#a8acb4')); R.linea(px - 12, py + 1, px - 4, py - 2, H('#e8ecf2'));
  if (lleva === 'c') carbon(px - 8, py - 3, 1.6); if (lleva === 'h') huesoG(px - 8, py - 4);
  T.brazo(R, ri(hx + 34), 204, ri(hx), ri(hy), '#5a7a9a', -1, { codo: [ri(hx + 24), ri(Math.min(192, hy + 22))] });
};

// ── 3 · el sobre de los resultados sobre la mesa (fondo local, desde arriba) ─────────────────────────────────────────
let BG3 = null;
const MAD = pal(['#4a2c18', '#6a4024', '#86542e', '#a06a3a', '#b8824a']);
const fondo3 = () => {
  if (!BG3) {
    BG3 = R.nuevo(); const prev = R.usar(BG3);
    // las tablas de la mesa con vetas, nudos y las juntas
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(y / 30), yy = y % 30;
      const veta = Math.sin((x + tabla * 57) * 0.05 + Math.sin(y * 0.3 + tabla) * 1.3 + yy * 0.35) * 0.5 + Math.sin(x * 0.013 + tabla * 2) * 0.4;
      let v = 2.3 + veta + (h2(x >> 1, y, 13) - 0.5) * 0.5 - (yy === 0 ? 2.4 : 0) - (yy === 1 ? 0.8 : 0) + (yy === 2 ? 0.6 : 0);
      for (const [nx, ny] of [[60, 108], [250, 138], [120, 18]]) { const d = Math.hypot(x - nx, (y - ny) * 2); if (d < 6) v -= (6 - d) * 0.35; }
      R.pset(x, y, rmp(MAD, v, x, y)); }
    // la luz cálida del flexo, en el centro
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 180, (y - 100) * 1.3) / 150; if (d < 1 && b4(x, y) < (1 - d) * 0.5) R.pset(x, y, mez(R.pget(x, y), H('#ffd890'), 0.18)); }
    // la regla, el cuaderno de campo, la foto del pilar con su clip, las gafas, el tampón y la bolsita «23» ya vacía
    R.rect(22, 160, 108, 167, K); R.rect(23, 161, 107, 166, H('#e8d8a8')); for (let x = 26; x < 106; x += 4) R.rect(x, 161, x, x % 20 === 2 ? 164 : 162, H('#5a4a2a'));
    R.rect(236, 18, 272, 62, K); R.rect(237, 19, 271, 61, H('#f2eee0')); for (let y = 24; y < 60; y += 4) R.linea(240, y, 268, y, H('#c8d0dc')); R.linea(243, 19, 243, 61, H('#e8a0a0'));
    for (let k = 0; k < 5; k++) R.linea(246, 26 + k * 8, 250 + ((k * 13) % 16), 26 + k * 8, H('#5a6a8a'));
    R.rect(282, 70, 312, 102, K); R.rect(283, 71, 311, 101, H('#f6f6f0')); R.rect(285, 73, 309, 94, H('#c8b890')); for (let y = 73; y < 95; y++) for (let x = 285; x < 310; x++) if (b4(x, y) < (y - 73) / 40) R.pset(x, y, H('#a89870'));
    T.d_pilar(R, 297, 92, { escala: 0.32, sombra: false }); R.rect(292, 68, 294, 76, H('#9aa2b0'));
    for (const cx of [254, 274]) { R.disco(cx, 132, 8, K); R.disco(cx, 132, 6, H('#9a7a50')); R.disco(cx, 132, 5, mez(H('#9a7a50'), H('#e8f0f8'), 0.5)); R.pset(cx - 2, 130, H('#ffffff')); }
    R.linea(262, 131, 266, 131, K); R.linea(246, 130, 230, 120, K); R.linea(282, 130, 298, 118, K);
    R.rect(22, 116, 46, 134, K); R.rect(23, 117, 45, 133, H('#3a3a46')); R.rect(25, 119, 43, 131, H('#5a3a6a')); R.rect(50, 120, 58, 136, K); R.rect(51, 121, 57, 135, H('#8a5a34')); R.rect(51, 121, 57, 124, H('#2a2a2a'));
    R.usar(prev);
  }
  R.buf.set(BG3);
};
const HOJA = ['11600', '11500', '11400', '11550', '11300'];
const p3 = (t) => {
  fondo3();
  // el vaso de té turco (de tulipán) de pie en su platillo de borde azul, con la cucharilla, el terrón y el vapor
  const tx = 74, ty = 58;
  for (let j = -6; j <= 6; j++) for (let i = -17; i <= 17; i++) { const e = (i / 17) ** 2 + (j / 6) ** 2; if (e < 1) R.pset(tx + i, ty + j, e > 0.82 ? K : e > 0.62 ? H('#3a6ab8') : j < 0 ? H('#f6f4ee') : H('#d8d4cc')); }
  const ola = t > W.HARD && t < W.HARD + 0.6 ? (Math.floor(t * 18) & 1) : 0;
  for (let j = -26; j <= 0; j++) { const v = -j / 26, w = Math.round(5 + 3 * Math.sin(v * Math.PI * 0.95) - (v > 0.55 ? (v - 0.55) * 6 : 0) + (v > 0.85 ? (v - 0.85) * 14 : 0));
    for (let i = -w - 1; i <= w + 1; i++) { const borde = Math.abs(i) > w, te = j > -21 + ola;
      R.pset(tx + i, ty - 1 + j, borde ? K : te ? (i < -w + 2 ? H('#c85a26') : i > w - 2 ? H('#6a1c0c') : H('#a83a16')) : H('#d8e4ec')); } }
  R.linea(tx - 3, ty - 24, tx - 3, ty - 4, H('#ffd8b8')); ps(tx + 4, ty - 22, H('#ffffff')); R.linea(tx - 7, ty - 27, tx + 7, ty - 27, H('#e8f0f4'));
  R.linea(tx + 11, ty + 1, tx + 24, ty + 6, K); R.linea(tx + 11, ty, tx + 23, ty + 5, H('#c8ccd4')); rr(tx + 22, ty + 4, tx + 26, ty + 7, H('#c8ccd4'));
  rr(tx - 15, ty - 2, tx - 11, ty + 2, K); rr(tx - 14, ty - 1, tx - 12, ty + 1, H('#ffffff'));
  for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1; for (let q = 0; q < 3; q++) tine(tx + Math.sin(u * 6 + k) * 4 + q, ty - 30 - u * 22, H('#ffffff'), 0.45 * (1 - u)); }
  // la hoja de resultados que sale del sobre y se queda en el centro, con sus cifras y sus barras
  const SX = 40, SY = 74, sale = ease(tramo(t, P3 + 0.1, W.COME + 0.55)), hx = ri(lerp(SX + 2, 140, sale)), hy = ri(lerp(SY - 30, 52, sale));
  rr(hx + 2, hy + 2, hx + 82, hy + 112, H('#3a2414')); rr(hx - 1, hy - 1, hx + 80, hy + 110, K); rr(hx, hy, hx + 79, hy + 109, H('#fbf9f2'));
  rr(hx + 6, hy + 6, hx + 30, hy + 9, H('#2a5aa8')); rr(hx + 6, hy + 12, hx + 72, hy + 12, H('#b8c0cc'));
  HOJA.forEach((n, k) => { const y = hy + 20 + k * 16, marca = tramo(t, W.SO + k * 0.16, W.SO + k * 0.16 + 0.25);
    if (marca > 0) rr(hx + 5, y - 2, hx + 5 + ri(28 * marca), y + 6, H('#fff27a'));
    cifras(n, hx + 7, y, K); rr(hx + 32, y + 1, hx + 32 + 8 + ((k * 7) % 20), y + 3, H('#7a8aa0')); ps(hx + 74, y + 2, H('#c83a3a')); });
  // el sobre de correo aéreo con su sello (la hoja sale de él)
  if (sale < 0.5) { rr(SX - 2, SY - 2, SX + 70, SY + 44, K); rr(SX - 1, SY - 1, SX + 69, SY + 43, H('#f4f0e2'));
    for (let i = 0; i < 74; i += 2) { const c = (i >> 2) & 1 ? H('#c83a3a') : H('#2a5aa8'); ps(SX - 1 + i, SY - 1, c); ps(SX - 1 + i, SY + 43, c); }
    for (let j = 0; j < 46; j += 2) { const c = (j >> 2) & 1 ? H('#c83a3a') : H('#2a5aa8'); ps(SX - 1, SY - 1 + j, c); ps(SX + 69, SY - 1 + j, c); }
    rr(SX + 52, SY + 3, SX + 64, SY + 15, K); rr(SX + 53, SY + 4, SX + 63, SY + 14, H('#5a9a6a')); rr(SX + 55, SY + 6, SX + 61, SY + 12, H('#e8c060')); cifras('50', SX + 54, SY + 7, K);
    R.linea(SX + 6, SY + 26, SX + 36, SY + 26, H('#8a8478')); R.linea(SX + 6, SY + 31, SX + 30, SY + 31, H('#8a8478')); }
  else { const ex = 24, ey = 92; rr(ex - 2, ey - 2, ex + 52, ey + 30, K); rr(ex - 1, ey - 1, ex + 51, ey + 29, H('#f4f0e2'));
    for (let i = 0; i < 54; i += 2) { const c = (i >> 2) & 1 ? H('#c83a3a') : H('#2a5aa8'); ps(ex - 1 + i, ey - 1, c); ps(ex - 1 + i, ey + 29, c); }
    R.poligono([[ex - 1, ey - 1], [ex + 51, ey - 1], [ex + 25, ey + 12]], H('#e6e0ce')); rr(ex + 38, ey + 3, ex + 47, ey + 12, K); rr(ex + 39, ey + 4, ex + 46, ey + 11, H('#5a9a6a')); }
  // el lápiz, que la pata del gato empuja y hace rodar
  const pata = Math.sin(Math.PI * tramo(t, W.FIRST - 0.35, W.FIRST + 0.45)), lap = ease(tramo(t, W.FIRST + 0.05, W.FIRST + 0.9));
  const lx = ri(60 + lap * 36), ly = 146; for (let k = 0; k < 34; k++) { const c = k < 4 ? H('#f0c0a0') : k > 30 ? H('#e88a9a') : (((k + Math.floor(lap * 9)) & 1) ? H('#e8b830') : H('#d8a020')); rr(lx + k, ly - 1, lx + k, ly + 1, c); } rr(lx, ly - 2, lx + 34, ly - 2, K); rr(lx, ly + 2, lx + 34, ly + 2, K); ps(lx - 1, ly, H('#3a3a3a'));
  if (pata > 0) { const px = ri(-6 + pata * 64); for (let j = -6; j <= 6; j++) for (let i = -44; i <= 0; i++) { if (i < -3 || (i / 9) ** 2 + (j / 6) ** 2 < 1) R.pset(px + i, ly + j, Math.abs(j) > 4 ? K : (i + j * 2) % 7 === 0 ? H('#c86a2a') : H('#e8a050')); } for (const j of [-3, 0, 3]) ps(px + 2, ly + j, H('#f0b8b0')); }
  // la mano sujeta la hoja por abajo; en «hard to believe» da dos golpecitos en la última cifra
  const toc = t > W.HARD - 0.05 && t < W.BELIEVE + 0.25 ? Math.abs(Math.sin((t - W.HARD) * 14)) * 3 : 0;
  const ir = ease(tramo(t, W.OLD, W.HARD - 0.1));
  const mx = sale < 1 ? hx + 60 : lerp(hx + 60, hx + 34, ir), my = sale < 1 ? hy + 112 : lerp(hy + 112, hy + 92, ir) - toc;
  T.brazo(R, ri(mx + 30), 204, ri(mx), ri(my), '#a8b8c8', -1, { codo: [ri(mx + 22), ri(Math.min(194, my + 26))] });
  if (t > W.HARD + 0.05) R.icono('!', hx + 60, hy + 70, H('#c83a3a'), K, 2);
  if (t > W.BELIEVE + 0.05) R.icono('?', hx + 66, hy + 24, H('#2a5aa8'), K, 2);
};

// ── 4 · la línea del tiempo, de cerca, en el 9500 (fondo local) ─────────────────────────────────────────────────────
const CIELO = pal(['#4c86c8', '#5e96d2', '#78a8dc', '#94bce2', '#b2d0e6', '#cde0e8', '#e2eae4']);
const ESTEPA = pal(['#6a6034', '#86783e', '#a09048', '#b8a456', '#cbb868', '#ddca80']);
const arbolito = (x, y, s = 1) => { rr(x - 1, y - 6 * s, x, y, H('#4a3424')); for (let j = -6; j <= 6; j++) for (let i = -9; i <= 9; i++) { const e = (i / (9 * s)) ** 2 + (j / (6 * s)) ** 2; if (e < 1) R.pset(x + i, y - 9 * s + j, e > 0.75 ? H('#3a5030') : j < -2 && i < 2 ? H('#7a9a50') : H('#56743c')); } };
const gacela = (x, y, t, dir = 1, k = 0, corre = false) => { x = ri(x); y = ri(y); const X = (i) => x + dir * i, f = Math.floor(t * (corre ? 10 : 2) + k) % 2, come = !corre && Math.sin(t * 0.9 + k * 2) > 0.3;
  rr(X(-4), y - 6, X(3), y - 4, H('#b8783e')); rr(X(-4), y - 4, X(3), y - 4, H('#f0e0c8')); ps(X(-5), y - 6, H('#3a2414'));
  const hy = come ? y - 3 : y - 9; R.linea(X(3), y - 6, X(4), hy + 1, H('#b8783e')); rr(X(4), hy, X(6), hy + 1, H('#b8783e')); ps(X(4), hy - 1, H('#2a1a10')); ps(X(4), hy - 2, H('#2a1a10')); ps(X(5), hy - 2, H('#2a1a10'));
  for (const [i, ff] of [[-3, f], [-2, 1 - f], [2, f], [3, 1 - f]]) R.linea(X(i), y - 3, X(i + (corre ? (ff ? 1 : -1) : 0)), y, H('#7a4a24')); };
let BG4 = null;
const X4 = (año) => 120 + (9500 - año) / 10;
const fondo4 = () => {
  if (!BG4) {
    BG4 = R.nuevo(); const prev = R.usar(BG4);
    for (let y = 0; y < 86; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(CIELO, y / 86 * 6.4, x, y));
    // la sierra azulada, la loma parda de enfrente y la llanura
    for (let x = 0; x < 320; x++) { const a = 62 + Math.round(Math.sin(x * 0.021 + 1) * 6 + Math.sin(x * 0.07) * 2.5 + h2(x >> 2, 0, 20) * 2); for (let y = a; y < 86; y++) R.pset(x, y, rmp(pal(['#7a8aa8', '#8c9ab4', '#9eaabe', '#b4bcc8']), 3 - (y - a) * 0.08 + (h2(x, y, 21) - 0.5) * 0.8 - (Math.sin(x * 0.2 + y * 0.6) > 0.7 ? 1 : 0), x, y)); }
    for (let x = 0; x < 320; x++) { const a = 76 + Math.round(Math.sin(x * 0.03 + 3) * 4 + Math.sin(x * 0.11) * 1.5); for (let y = a; y < 92; y++) R.pset(x, y, rmp(pal(['#8a8458', '#9e9660', '#b2a86c']), 1.4 + (h2(x, y, 22) - 0.5) * 1.4 - (y - a) * 0.05, x, y)); }
    for (let y = 88; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 4.6 - (y - 88) / 92 * 2.4 + (h2(x, y, 23) - 0.5) * 1.1 + Math.sin(x * 0.04 + y * 0.2) * 0.25; R.pset(x, y, rmp(ESTEPA, v, x, y)); }
    // matas, hierba y piedras de la estepa (más grandes cuanto más cerca)
    for (let k = 0; k < 260; k++) { const y = 92 + Math.floor(h2(k, 1, 24) ** 0.7 * 86), x = Math.floor(h2(k, 2, 24) * 320), s = (y - 88) / 92, n = 1 + Math.floor(s * 5);
      for (let q = 0; q < n; q++) R.linea(x + q - (n >> 1), y, x + q - (n >> 1) + (q - (n >> 1)) * 0.4, y - 1 - Math.floor(s * 4 * h2(k, q, 25)), q & 1 ? ESTEPA[1] : ESTEPA[0]); }
    for (let k = 0; k < 30; k++) { const y = 96 + Math.floor(h2(k, 3, 26) * 80), x = Math.floor(h2(k, 4, 26) * 320), s = 1 + Math.floor((y - 90) / 30); if (y > 140 && y < 166) continue; R.rect(x, y, x + s * 2, y + s, K); R.rect(x, y, x + s * 2 - 1, y + s - 1, H('#cbbd9e')); R.pset(x, y, H('#ece0c4')); }
    for (const [x, y, s] of [[24, 90, 0.8], [58, 92, 1], [214, 90, 0.8], [254, 93, 1.1], [292, 91, 0.9]]) arbolito(x, y, s);
    // la regla del tiempo: un larguero de madera con marcas cada 100 años y la cifra de cada 500 grabada en dorado
    R.rect(0, 148, 319, 164, K); for (let y = 149; y < 164; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(MAD, 2.4 + (y === 149 ? 1.8 : 0) - (y > 161 ? 1.2 : 0) + Math.sin(x * 0.09 + y * 0.8) * 0.35 + (h2(x >> 1, y, 27) - 0.5) * 0.5, x, y));
    for (let a = 11000; a >= 7500; a -= 100) { const x = ri(X4(a)); if (x < 0 || x > 319) continue; R.rect(x, 149, x, a % 500 ? 150 : 152, H('#e8d8a8')); }
    for (let a = 11000; a >= 7500; a -= 500) { const x = ri(X4(a)); if (x < -20 || x > 340 || a === 9500) continue; R.numero(String(a), x, 161, { centro: true }); }
    // la sombra del larguero en la hierba
    for (let x = 0; x < 320; x++) { tine(x, 165, K, 0.4); tine(x, 166, K, 0.2); }
    R.usar(prev);
  }
  R.buf.set(BG4);
};
const p4 = (t) => {
  fondo4();
  for (const [k, v, y, w, cs] of [[0, 2, 22, 46, pal(['#9cb4d0', '#d4e0ec', '#f8fafc'])], [1, 4, 36, 32, pal(['#a8bcd6', '#dce6ef', '#fcfdfe'])], [2, 7, 50, 22, pal(['#b4c6da', '#e2eaf2', '#ffffff'])]]) nube(((t * v + k * 140) % 420) - 50, y, w, cs);
  for (let k = 0; k < 4; k++) pajaro(((t * (12 + k * 3) + k * 70) % 360) - 20, 26 + k * 6 + Math.sin(t + k) * 2, t, H('#3a3a44'), k);
  for (let k = 0; k < 4; k++) gacela(150 + k * 26 + Math.sin(t * 0.3 + k) * 3 + t * 1.5, 100 + (k & 1) * 3, t, k & 1 ? -1 : 1, k);
  // el pilar que se levanta junto al hito del 9500
  const sube = ease(tramo(t, P4 + 0.2, W.N9500 - 0.05)), ang = lerp(82, 0, sube), PX = ri(X4(9500));
  const pl = T.d_pilar(R, PX, 146, { escala: 1.3, inclinado: ang, relieves: ['zorro'], sombra: sube >= 1, luz: 0.5 });
  // la cuerda del cazador de la izquierda a la cabeza del pilar, y la pértiga del de la derecha bajo la cabeza
  const tira = sube < 1;
  const c1 = R.actor(EL.cazadorGB, PX - 50 - (tira ? Math.round(Math.sin(t * 9)) : 0), 146, t, { dir: 1, sostiene: tira ? [PX - 36, 124] : undefined, brazos: t > W.BC && t < W.BC + 1.2, sonrisa: !tira });
  if (tira) R.linea(c1.mano[0], c1.mano[1], pl.cabeza[0], pl.cabeza[1], H('#c8a870'));
  const cx2 = ri(lerp(PX + 54, PX + 24, sube));
  const c2 = R.actor(EL.cazador2GB, cx2, 146, t, { dir: -1, anda: tira && sube > 0, sostiene: tira ? [cx2 - 4, 126] : undefined, dedo: !tira && t < W.BC, sonrisa: !tira });
  if (tira) { const [ax, ay] = pl.arriba; R.linea(c2.mano[0], c2.mano[1], ri(lerp(c2.mano[0], ax, 0.92)), ri(lerp(c2.mano[1], ay, 0.92)) + 3, H('#7a5232')); }
  // la cifra del 9500 en el larguero se enciende cuando el pilar queda de pie, y sale grande arriba
  const en9 = pop(t, W.N9500, 0.35);
  R.numero('9500', PX, 161, { centro: true, color: en9 > 0 && Math.floor(t * 6) % 3 ? H('#fff8c0') : undefined });
  if (en9 > 0) { R.numero('9500', PX, ri(lerp(70, 52, en9)), { tam: 16, centro: true }); if (t < W.N9500 + 0.8) for (const [dx, dy] of [[-40, -6], [40, -10], [-30, 12]]) destello(PX + dx, 46 + dy, 2); }
  // la cazadora y el niño, a la derecha, que miran y lo celebran en «BC»
  const sal = t > W.BC && t < W.BC + 1.4 ? Math.abs(Math.sin((t - W.BC) * 7)) * 4 : 0;
  R.actor(EL.cazadoraGB, 230, 146, t, { dir: -1, brazos: t > W.BC, sonrisa: t > W.N9500, sorpresa: t > W.N9500 - 0.4 && t < W.N9500 });
  R.actor(EL.ninoGB, 254, 146, t, { dir: -1, salto: ri(sal), brazos: t > W.BC, sonrisa: t > W.N9500 });
  if (sube > 0.95 && sube < 1) sombraS(PX, 147, 14, 0.5);
  // la hierba de delante, que se mece con el viento
  for (let k = 0; k < 28; k++) { const x = 4 + k * 11.5 + (k % 3) * 2, h = 7 + (k % 4) * 2, w = Math.sin(t * 2.2 + k * 0.7) * 2; for (let j = 0; j < h; j++) { const xx = x + w * (j / h) ** 2; ps(xx, 179 - j, j > h - 3 ? H('#ddca80') : (k & 1) ? H('#9a8a48') : H('#b8a456')); ps(xx + 2, 179 - j * 0.7, H('#86783e')); } }
};

// ── 5 · la línea del tiempo, de lejos: de 9500 a 2000 (fondo local) ─────────────────────────────────────────────────
let BG5 = null;
const X5 = (año) => 26 + (9500 - año) / 26.5;
// Stonehenge en pequeño (al doble): el círculo de trilitos de arenisca gris con sus dinteles y la hierba
const piedraSH = (x, y) => { x = ri(x); y = ri(y);
  for (let i = -16; i <= 16; i++) { ps(x + i, y + 1, H('#4a6a30')); ps(x + i, y, h2(i, 0, 50) > 0.5 ? H('#6a8a40') : H('#5a7a38')); }
  for (const [dx, dy, al, w] of [[-14, -2, 14, 2], [-8, -4, 17, 2], [-2, -5, 18, 2], [4, -5, 18, 2], [10, -4, 17, 2], [15, -2, 13, 2], [-10, 2, 13, 3], [8, 2, 13, 3]]) {
    rr(x + dx - 1, y + dy - al - 1, x + dx + w, y + dy, K); rr(x + dx, y + dy - al, x + dx + w - 1, y + dy - 1, H('#a8a8a0')); rr(x + dx, y + dy - al, x + dx, y + dy - 1, H('#c8c8c0')); ps(x + dx + w - 1, y + dy - 2, H('#7a7a74')); }
  for (const [a, b, yy] of [[-15, -6, -18], [-9, 1, -22], [3, 13, -22], [9, 17, -17]]) { rr(x + a - 1, y + yy - 2, x + b + 1, y + yy + 1, K); rr(x + a, y + yy - 1, x + b, y + yy, H('#b8b8b0')); rr(x + a, y + yy - 1, x + b, y + yy - 1, H('#d8d8d0')); } };
// las tres pirámides de Guiza (al doble), con su cara en sombra
const piramides = (x, y) => { x = ri(x); y = ri(y);
  for (let i = -24; i <= 24; i++) ps(x + i, y + 1, H('#c8a870'));
  for (const [dx, w] of [[-12, 12], [3, 17], [17, 9]]) { for (let j = 0; j <= w; j++) { R.linea(x + dx - j, y - w + j, x + dx, y - w + j, ((j >> 1) & 1) ? H('#e8c878') : H('#f0d488')); R.linea(x + dx + 1, y - w + j, x + dx + j, y - w + j, H('#b8904a')); }
    R.linea(x + dx - w - 1, y + 1, x + dx, y - w - 1, K); R.linea(x + dx + 1, y - w - 1, x + dx + w + 1, y + 1, K); } };
const fondo5 = () => {
  if (!BG5) {
    BG5 = R.nuevo(); const prev = R.usar(BG5);
    const CT = pal(['#5a8ccc', '#6c9cd4', '#88b0dc', '#a6c4e2', '#c6d8e4', '#e2e4d8', '#f0e4c4']);
    for (let y = 0; y < 66; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(CT, y / 66 * 6.3, x, y));
    for (let x = 0; x < 320; x++) { const a = 52 + Math.round(Math.sin(x * 0.015) * 5 + Math.sin(x * 0.06 + 2) * 2); for (let y = a; y < 68; y++) R.pset(x, y, rmp(pal(['#8a96b0', '#9ca6bc', '#b2b8c6']), 2 - (y - a) * 0.06 + (h2(x, y, 30) - 0.5), x, y)); }
    for (let y = 66; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 4.4 - (y - 66) / 114 * 2.2 + (h2(x, y, 31) - 0.5) * 1.1 + Math.sin(x * 0.05 - y * 0.25) * 0.3; R.pset(x, y, rmp(ESTEPA, v, x, y)); }
    // un río que serpentea por la llanura lejana y unos sotos
    for (let x = 0; x < 320; x++) { const y = 74 + Math.round(Math.sin(x * 0.03) * 3); R.pset(x, y, H('#8ab0d0')); R.pset(x, y + 1, H('#6a90b8')); if (h2(x, 0, 32) > 0.7) R.pset(x, y - 1, H('#c8dcea')); }
    for (let k = 0; k < 14; k++) { const x = Math.floor(h2(k, 1, 33) * 320), y = 70 + Math.floor(h2(k, 2, 33) * 8); R.rect(x, y - 3, x + 4, y, H('#4e6a38')); R.pset(x + 1, y - 3, H('#6a8a48')); }
    for (let k = 0; k < 300; k++) { const y = 80 + Math.floor(h2(k, 1, 34) * 100), x = Math.floor(h2(k, 2, 34) * 320); if (y > 112 && y < 128) continue; const n = 1 + Math.floor((y - 80) / 30); for (let q = 0; q < n; q++) R.linea(x + q, y, x + q, y - 1 - (q & 1), q & 1 ? ESTEPA[1] : ESTEPA[0]); }
    // la regla larga, con las cifras de los milenios debajo
    R.rect(0, 114, 319, 124, K); for (let y = 115; y < 124; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rmp(MAD, 2.6 + (y === 115 ? 1.6 : 0) - (y > 121 ? 1.2 : 0) + Math.sin(x * 0.11 + y) * 0.4, x, y));
    for (let a = 9500; a >= 1700; a -= 100) { const x = ri(X5(a)); if (x > 319) continue; R.rect(x, 115, x, a % 1000 ? 116 : 119, H('#e8d8a8')); }
    for (let a = 9000; a >= 2000; a -= 1000) { const x = ri(X5(a)); R.numero(String(a), x, 134 + ((a / 1000) & 1) * 9, { centro: true, fina: true }); }
    // las piedras de Göbekli al principio de la regla: un círculo de pilares en T, en pequeño, con su muro
    for (let x = 4; x < 52; x++) for (let y = 104; y < 113; y++) R.pset(x, y, rmp(PIEDRA, 2 + (h2(x >> 1, y >> 1, 35) - 0.5) * 2 - (y === 112 ? 1 : 0), x, y));
    for (const [dx, s] of [[-14, 0.55], [14, 0.55], [-7, 0.62], [7, 0.62], [0, 0.8]]) T.d_pilar(R, X5(9500) + dx, 112 - (s > 0.7 ? 0 : 2), { escala: s, sombra: false, brazos: s > 0.7 });
    R.usar(prev);
  }
  R.buf.set(BG5);
};
const p5 = (t) => {
  fondo5();
  for (const [k, v, y, w, cs] of [[0, 3, 18, 40, pal(['#a6b8d0', '#dae2ec', '#fafbfc'])], [1, 5, 32, 26, pal(['#b0c0d6', '#e0e6ee', '#ffffff'])], [2, 8, 10, 18, pal(['#b8c8da', '#e6ecf2', '#ffffff'])]]) nube(((t * v + k * 150) % 420) - 50, y, w, cs);
  for (let k = 0; k < 3; k++) pajaro(((t * (14 + k * 3) + k * 110) % 360) - 20, 22 + k * 7, t, H('#3a3a44'), k);
  const x9 = ri(X5(9500));
  R.numero('9500', x9 + 2, 50, { centro: true, color: H('#ffe070') });
  // Stonehenge sale del círculo y se aleja hasta el 3000 con la flecha que cuenta hasta 6000; luego las pirámides, 7000
  const uS = ease(tramo(t, W.N6 - 0.1, W.STONEHENGE + 0.25)), sx = lerp(x9 + 30, X5(3000), uS);
  const uP = ease(tramo(t, W.N7 - 0.1, W.GIZA + 0.25)), px = lerp(x9 + 30, X5(2560), uP);
  const flecha = (x0, x1, y) => { x0 = ri(x0); x1 = ri(x1); R.linea(x0, y - 1, x1, y - 1, K); R.linea(x0, y, x1, y, H('#ffe070')); R.linea(x0, y + 1, x1, y + 1, H('#a07818')); R.linea(x0, y + 2, x1, y + 2, K); for (let k = 1; k < 4; k++) { ps(x1 - k, y - k, H('#ffe070')); ps(x1 - k, y + k, H('#ffe070')); } ps(x0, y - 2, K); ps(x0, y + 3, K); };
  if (uP > 0) { rr(ri(px) - 1, 78, ri(px) + 1, 114, K); rr(ri(px), 79, ri(px), 113, H('#a08060')); flecha(x9 + 22, px - 26, 66); R.numero(String(Math.round(7000 * uP / 100) * 100), ri((x9 + 22 + px - 26) / 2), 62, { centro: true }); piramides(px, 78); }
  if (uS > 0) { rr(ri(sx) - 1, 102, ri(sx) + 1, 114, K); rr(ri(sx), 103, ri(sx), 113, H('#a08060')); flecha(x9 + 22, sx - 20, 92); R.numero(String(Math.round(6000 * uS / 100) * 100), ri((x9 + 22 + sx - 20) / 2), 88, { centro: true }); piedraSH(sx, 102); }
  if (uS >= 1 && t < W.STONEHENGE + 0.9) destello(sx + 14, 78, 3);
  if (uP >= 1 && t < W.GIZA + 0.9) destello(px + 16, 56, 3);
  // el cazador junto a sus piedras, que hace visera y mira lejos; el niño corre detrás de Stonehenge y se cansa
  R.actor(EL.cazador2GB, 6, 148, t, { dir: 1, dedo: t > W.N6 && t < W.PYRAMIDS, sorpresa: t > W.GIZA, sonrisa: t < W.N6 });
  const corre = tramo(t, W.N6, W.N6 + 2.6), nx = ri(lerp(30, 150, corre)), cansado = corre >= 1;
  R.actor(EL.ninoGB, nx, 170, t, { dir: 1, anda: corre > 0 && !cansado, triste: cansado, salto: corre > 0 && !cansado ? (Math.floor(t * 8) & 1) : 0 });
  if (cansado && t < W.N7 + 1.6) for (let k = 0; k < 3; k++) { const u = (t * 1.4 + k / 3) % 1; tine(nx + 15 + u * 6, 150 - u * 8, H('#ffffff'), 0.7 * (1 - u)); }
  // gacelas que cruzan corriendo por delante
  for (let k = 0; k < 3; k++) gacela(((t * 38 + k * 30) % 420) - 60, 160 + k * 5, t, 1, k, true);
};

// ── 6 · el laboratorio ──────────────────────────────────────────────────────────────────────────────────────────────
const p6 = (t) => labPlano(t, enC);

const efectos = [[W.QUESTION, 'pop'], [W.SENDS + 0.4, 'papel'], [P2 + 0.6, 'golpecito'], [P2 + 1.5, 'pop'], [W.BONE + 1.0, 'golpecito'], [W.ANALYSIS + 0.1, 'papel'],
  [P3 + 0.25, 'papel'], [W.HARD, 'golpecito'], [W.FIRST + 0.1, 'miau'], [P4 + 0.3, 'pasos'], [W.N9500 - 0.05, 'boom'], [W.N9500 + 0.15, 'brillo'], [W.BC + 0.05, 'palmada'],
  [W.N6, 'whoosh'], [W.N7, 'whoosh'], [P6 + 0.2, 'maquina'], [P6 + 1.0, 'bip'], [W.TEXTBOOKS + 0.3, 'papel']];
const año = (t) => (t >= P4 && t < P6) ? -9500 : 1998;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año });
''')

W_CARBONO = r'''const W = { NOTICE: en('fijate2', 0.0039), THAT: en('fijate2', 0.0326), BECAUSE: en('fijate2', 0.0535), MAGIC: en('fijate2', 0.0776), EVERYTHING: en('fijate2', 0.1121), ALIVE: en('fijate2', 0.1232), TAKES: en('fijate2', 0.1369), CARBON: en('fijate2', 0.1682), N14: en('fijate2', 0.1839), KIND: en('fijate2', 0.2432), BREAKS: en('fijate2', 0.2712), SLOWLY: en('fijate2', 0.2954), AND2: en('fijate2', 0.3280), LIVING: en('fijate2', 0.3449), DIES: en('fijate2', 0.3606), STOPS: en('fijate2', 0.3788), SO: en('fijate2', 0.4310), EVERY: en('fijate2', 0.4375), N5: en('fijate2', 0.4492), YEARS: en('fijate2', 0.4962), OR: en('fijate2', 0.5366), HALF: en('fijate2', 0.5757), WHAT: en('fijate2', 0.5959), HAD: en('fijate2', 0.6051), BY: en('fijate2', 0.6514), MEASURING: en('fijate2', 0.6644), LEFT: en('fijate2', 0.7061), CHARCOAL: en('fijate2', 0.7400), CAMPFIRE: en('fijate2', 0.7713), YOU: en('fijate2', 0.8079), LONG: en('fijate2', 0.8228), BURNED: en('fijate2', 0.8476), LIKE: en('fijate2', 0.8620), HOURGLASS: en('fijate2', 0.8900), STARTED: en('fijate2', 0.9226), RUNNING: en('fijate2', 0.9369), FIRE: en('fijate2', 0.9656), WENT: en('fijate2', 0.9754), OUT: en('fijate2', 0.9852) };'''

E['gb-carbono'] = ('El carbono 14', '''// GB-CARBONO (frase 13, PAUSA «fijate2»): el laboratorio de gb-fechas congelado en gris azulado (el MISMO bloque LAB, copiado
// literal, en su último instante) y Atom al doble, a color, con sus objetos. GAG DE LA TARTA: la parte por la mitad, y otra
// vez, y otra, hasta una miga (5730). Seis planos, cortados en la palabra:
// 1 · El laboratorio congelado entero (el último fotograma de gb-fechas): ⏸; Atom entra andando, saca una varita en «because»
//   y en «magic» chisporrotea, se le dobla la estrella y sale la «X»; la tira. Corta en «Everything».
// 2 · Congelado, de cerca, la ventana y el banco: un arbolito en su maceta y una gacela de madera, a color, respiran motas
//   verdes con su «14»; en «carbon-14» Atom coge una y sale el «14» grande; en «breaks down very slowly» la mota parpadea y se
//   apaga despacio. Corta en «and when».
// 3 · Congelado, de cerca, el tanque y la pantalla del 9500: en «dies» el arbolito se marchita y las motas rebotan con su «X»;
//   en «so every» Atom saca el reloj de arena y la tarta; en «5,700» el cuchillo la parte por la mitad y sale «5730». Corta en «or».
// 4 · Congelado, la campana y la fuente de iones: la tarta al triple; en «half» Atom señala la mitad y en «what it had» se
//   dibuja de puntos la que falta; en «measuring» otro corte, y en «left» otro. Corta en «charcoal».
// 5 · Congelado y a oscuras, el pupitre: una hoguera a color que alumbra el laboratorio; Atom alza un trozo de carbón en
//   «charcoal»; la tarta (pequeña) se parte otra vez en «how long ago». Corta en «like».
// 6 · Congelado, el pupitre y el termo: la hoguera se apaga en «the fire went out» (humo) y el reloj brilla en «hourglass»;
//   el último corte deja una miga, que Atom se come al final.''', UTIL + LAB + W_CARBONO + r'''
const enC = (f) => 0.5 + (29.53 - 0.5) * f;   // en('carbon', f) de gb-fechas (sus marcas: 0,5 → 29,53)
const TF = 29.74;                              // el último instante de gb-fechas, el que se congela
const P2 = W.EVERYTHING, P3 = W.AND2, P4 = W.OR, P5 = W.CHARCOAL, P6 = W.LIKE;
// la voz: Atom mueve la boca mientras dice cada trozo de frase
const TROZOS = [[0.0, 0.0776 + 0.012], [0.1121, 0.2045], [0.2347, 0.3030], [0.3280, 0.4160], [0.4310, 0.5180], [0.5366, 0.6170], [0.6514, 0.7930], [0.8079, 0.8560], [0.8620, 1.0]];
const habla = (t) => TROZOS.some(([a, b]) => t > en('fijate2', a) && t < en('fijate2', b)) ? (Math.sin(t * 15) > -0.2 ? 1 : 0) : 0;
const AT = T.AT;
// el fotograma congelado, guardado una vez
let FZ = null;
const congelado = () => { if (!FZ) { labPlano(TF, enC); FZ = R.buf.slice(); } };
// una vista del congelado: entero (z 1) o de cerca (z 2, el recuadro de 160 × 90 que empieza en x0, y0)
const vista = (x0, y0, z) => { congelado(); const B = R.buf; if (z === 1) { B.set(FZ); return; }
  for (let y = 0; y < 180; y++) { const sy = (y0 + Math.floor(y / z)) * 320; for (let x = 0; x < 320; x++) B[y * 320 + x] = FZ[sy + x0 + Math.floor(x / z)]; } };
// el viñeteado suave de los bordes (deja tranquila la esquina de Atom)
const viñeta = (a = 0.35) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.max(Math.abs(x - 160) / 160, Math.abs(y - 96) / 96); if (d > 0.72 && b4(x, y) < (d - 0.72) * 3) tine(x, y, H('#10141e'), a); } };
const pausa = (u = 1) => { AT.pausa(R, u); };

// el arbolito en su maceta (a color): de 0 a 1 se marchita (las hojas caen y se ponen pardas)
const arbol = (x, y, t, seco = 0) => { x = ri(x); y = ri(y);
  R.poligono([[x - 12, y - 16], [x + 12, y - 16], [x + 9, y], [x - 9, y]], K); R.poligono([[x - 11, y - 15], [x + 11, y - 15], [x + 8, y - 1], [x - 8, y - 1]], H('#c86a3a'));
  rr(x - 12, y - 19, x + 12, y - 15, K); rr(x - 11, y - 18, x + 11, y - 16, H('#e08a52')); rr(x - 8, y - 12, x - 6, y - 3, H('#e08a52')); rr(x + 5, y - 13, x + 8, y - 2, H('#a0502a'));
  const cae = seco * 6; R.linea(x, y - 19, x + ri(seco * 3), y - 44 + cae, H('#5a3a22')); R.linea(x + 1, y - 19, x + 1 + ri(seco * 3), y - 44 + cae, H('#7a5232'));
  R.linea(x, y - 30, x - 8, y - 38 + cae * 1.4, H('#5a3a22')); R.linea(x + 1, y - 34, x + 9, y - 42 + cae * 1.4, H('#5a3a22'));
  const VERDE = pal(['#2a4a24', '#3e6a30', '#5a8a3e', '#86b450']), PARDO = pal(['#4a3420', '#6a4a2a', '#8a6a3a', '#a88a4a']);
  for (let j = -14; j <= 12; j++) for (let i = -20; i <= 20; i++) { const e = (i / 20) ** 2 + ((j + 1) / 13) ** 2 + (h2(i >> 1, j >> 1, 40) - 0.5) * 0.35; if (e > 1) continue;
    if (seco > 0 && h2(i, j, 41) < seco * 0.55) continue;
    const ramp = h2(i, j, 42) < seco ? PARDO : VERDE, v = 2.4 - (j + 14) / 26 * 1.6 + (i < -4 && j < -2 ? 0.8 : 0) - (e > 0.8 ? 1.2 : 0) + Math.sin(t * 2 + i * 0.3) * 0.15;
    R.pset(x + i + ri(Math.sin(t * 1.6 + j * 0.3) * (1 - seco) * 0.6), y - 46 + j + ri(cae * (j + 14) / 26), rmp(ramp, v, x + i, j)); }
  if (seco > 0.2) for (let k = 0; k < 4; k++) { const u = (seco * 2 + k * 0.23) % 1; rr(x - 14 + k * 9, y - 36 + u * 34, x - 13 + k * 9, y - 35 + u * 34, PARDO[2]); }
};
// la gacela de madera (un juguete tallado, a color), de pie sobre su peana
const gacelaM = (x, y, t) => { x = ri(x); y = ri(y); const ca = Math.sin(t * 2.4) > 0.6 ? 1 : 0;
  rr(x - 16, y - 4, x + 16, y, K); rr(x - 15, y - 3, x + 15, y - 1, H('#6a4428')); rr(x - 15, y - 3, x + 15, y - 3, H('#8a5a34'));
  for (const i of [-10, -7, 7, 10]) { rr(x + i - 1, y - 17, x + i + 1, y - 4, K); rr(x + i, y - 16, x + i, y - 5, H('#b8783e')); }
  for (let j = -8; j <= 8; j++) for (let i = -14; i <= 14; i++) { const e = (i / 14) ** 2 + (j / 7) ** 2; if (e < 1) R.pset(x + i, y - 22 + j, e > 0.78 ? K : j > 2 ? H('#f0e0c8') : j < -3 && i < 4 ? H('#d89858') : H('#c07a40')); }
  R.poligono([[x + 10, y - 26], [x + 14, y - 36 - ca], [x + 19, y - 36 - ca], [x + 15, y - 24]], K); R.poligono([[x + 11, y - 26], [x + 14, y - 35 - ca], [x + 18, y - 35 - ca], [x + 14, y - 25]], H('#c07a40'));
  rr(x + 13, y - 40 - ca, x + 22, y - 34 - ca, K); rr(x + 14, y - 39 - ca, x + 21, y - 35 - ca, H('#c07a40')); ps(x + 18, y - 38 - ca, K); ps(x + 21, y - 36 - ca, H('#3a2414'));
  for (const d of [0, 3]) { R.linea(x + 14 + d, y - 40 - ca, x + 12 + d, y - 49 - ca, K); R.linea(x + 15 + d, y - 40 - ca, x + 13 + d, y - 48 - ca, H('#3a2a1a')); }
  R.linea(x - 14, y - 26, x - 17, y - 23, K); };
// una mota de carbono 14: punto verde que brilla con su «14» al lado
const mota = (x, y, t, k, a = 1) => { x = ri(x); y = ri(y); const l = Math.sin(t * 6 + k) > 0;
  for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j) / 6; if (d < 1 && b4(x + i, y + j) < (1 - d) * 0.6) tine(x + i, y + j, H('#7affa8'), 0.5); }
  R.disco(x, y, 3, K); R.disco(x, y, 2 + (l ? 1 : 0), H('#4ae87a')); R.disco(x - 1, y - 1, 1, H('#e8fff0'));
  if (a > 0.5) R.numero('14', x + 5, y - 3, { fina: true, color: H('#c8ffd8') }); };
// el reloj de arena y la tarta (T.pausa 'reloj'), con la sombra y el «5730»
const reloj = (x, y, t, mitades, s = 2, numero) => T.pausa(R, x, y, t, { cual: 'reloj', mitades, s, numero });
// la hoguera a color: piedras, leños y llamas (b 0–1: de llama viva a brasa y humo)
const hoguera = (x, y, t, b = 1) => { x = ri(x); y = ri(y);
  for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2, px = x + Math.cos(a) * 16, py = y + Math.sin(a) * 5; rr(px - 3, py - 2, px + 3, py + 2, K); rr(px - 2, py - 1, px + 2, py + 1, H('#8a8478')); ps(px - 1, py - 1, H('#b8b2a4')); }
  for (const [a, b2] of [[-10, 8], [-8, 10]]) { R.linea(x + a, y - 2, x + b2, y + 2, K); R.linea(x + a, y - 3, x + b2, y + 1, H('#5a3a22')); }
  rr(x - 9, y - 1, x + 9, y + 1, H('#3a2a20')); for (let k = 0; k < 7; k++) ps(x - 7 + k * 2, y, Math.sin(t * 7 + k) > 0 ? H('#ff6a2a') : H('#a83a1a'));
  if (b > 0.05) for (let j = 0; j < 24 * b; j++) { const w = (1 - j / (24 * b)) * 8 * b, sway = Math.sin(t * 9 + j * 0.4) * (j / 10); for (let i = -w; i <= w; i++) { const e = Math.abs(i) / (w + 0.01); R.pset(ri(x + i + sway), y - 2 - j, e > 0.7 ? H('#e84a1a') : e > 0.35 ? H('#ffa03a') : H('#fff0a0')); } }
  if (b < 0.6) for (let k = 0; k < 6; k++) { const u = (t * 0.5 + k / 6) % 1; for (let q = 0; q < 3; q++) tine(x + Math.sin(u * 5 + k) * 6 + q, y - 6 - u * 46, H('#c8ccd4'), 0.6 * (1 - u) * (1 - b)); }
};
const luzHoguera = (x, y, r, a) => { for (let yy = Math.max(0, y - r); yy <= Math.min(179, y + r); yy++) for (let xx = Math.max(0, x - r); xx <= Math.min(319, x + r); xx++) { const d = Math.hypot(xx - x, (yy - y) * 1.3) / r; if (d < 1) { const k = (1 - d) ** 2 * a; if (k > b4(xx, yy) * 0.5) tine(xx, yy, H('#ffb050'), Math.min(0.6, k)); } } };

// ── 1 · el laboratorio congelado, entero: Atom entra y la varita «mágica» falla ─────────────────────────────────────
const p1 = (t) => {
  vista(0, 0, 1); pausa(tramo(t, 0, 0.35));
  const u = tramo(t, 0.35, 1.7), x = ri(lerp(-30, 58, ease(u)));
  const varita = t > W.BECAUSE, falla = t > W.MAGIC, tira = tramo(t, W.MAGIC + 0.55, W.MAGIC + 1.05);
  const a = AT.atom(R, x, 178, t, { s: 2, dir: 1, pose: u > 0 && u < 1 ? 'camina' : varita && tira < 1 ? 'sostiene' : 'brazos', cara: falla ? (tira > 0 ? 'guino' : 'sorpresa') : 'sonrisa', habla: habla(t) });
  if (varita && tira < 1) { const [mx, my] = a.mano, dob = falla ? cl((t - W.MAGIC) * 4) : 0;
    R.linea(ri(mx), ri(my), ri(mx + 12), ri(my - 14 + dob * 8), K); R.linea(ri(mx + 1), ri(my), ri(mx + 13), ri(my - 14 + dob * 8), H('#3a2a4a'));
    const sx = ri(mx + 13 + dob * 3), sy = ri(my - 17 + dob * 12);
    R.poligono([[sx, sy - 5], [sx + 2, sy - 1], [sx + 6, sy], [sx + 2, sy + 2], [sx, sy + 6], [sx - 2, sy + 2], [sx - 6, sy], [sx - 2, sy - 1]], K);
    R.poligono([[sx, sy - 4], [sx + 1, sy - 1], [sx + 4, sy], [sx + 1, sy + 1], [sx, sy + 4], [sx - 1, sy + 1], [sx - 4, sy], [sx - 1, sy - 1]], falla ? H('#a8a070') : H('#ffe060'));
    if (!falla && Math.floor(t * 8) % 2) destello(sx + 6, sy - 6, 2);
    if (falla) { for (let k = 0; k < 5; k++) { const v = (t - W.MAGIC) * 1.6 + k * 0.2; tine(sx + Math.sin(k * 2) * 5 * v, sy - v * 10, H('#c8ccd4'), cl(0.8 - v * 0.6)); }
      const pX = pop(t, W.MAGIC + 0.08, 0.25); if (pX > 0) R.icono('X', sx - 5 + 2, sy - 26, H('#e83a3a'), K, 2); } }
  if (tira > 0 && tira < 1) { const vx = ri(lerp(a.mano[0], -20, tira)), vy = ri(a.mano[1] - Math.sin(tira * Math.PI) * 40); R.linea(vx, vy, vx + 10, vy - 6, H('#3a2a4a')); ps(vx + 11, vy - 7, H('#a8a070')); }
  viñeta(0.25);
};

// ── 2 · la ventana y el banco, de cerca: todo lo vivo respira carbono 14 ─────────────────────────────────────────────
const p2 = (t) => {
  vista(4, 30, 2); pausa(1); viñeta();
  const AX = 120, GX = 210;
  sombraS(AX, 178, 18, 0.4); arbol(AX, 177, t, 0);
  sombraS(GX, 177, 16, 0.4); gacelaM(GX, 176, t);
  // las motas bajan del aire hacia las hojas y hacia el hocico de la gacela
  const entra = tramo(t, W.TAKES - 0.3, W.TAKES + 0.4);
  if (entra > 0) for (let k = 0; k < 8; k++) { const u = (t * 0.32 + k / 8) % 1, haciaG = k & 1, tx = haciaG ? GX + 18 : AX + ((k * 7) % 24) - 12, ty = haciaG ? 140 : 132 + (k % 3) * 4;
    const sx = 40 + k * 34, sy = 26 + (k % 3) * 8; if (u < 0.9) mota(lerp(sx, tx, u) + Math.sin(u * 9 + k) * 4, lerp(sy, ty, u), t, k, u < 0.6 ? 1 : 0); }
  // Atom coge una mota y la enseña: el «14» grande; en «breaks down very slowly» parpadea y se apaga despacio
  const coge = t > W.CARBON - 0.2, apaga = tramo(t, W.BREAKS, W.SLOWLY + 0.6);
  const a = AT.atom(R, 272, 178, t, { s: 2, dir: -1, pose: coge && apaga < 1 ? 'sostiene' : 'senala', cara: apaga > 0 ? 'sorpresa' : 'sonrisa', habla: habla(t) });
  if (coge) { const [mx, my] = a.mano, on = apaga < 1 && (apaga === 0 || Math.floor(t * (8 - apaga * 6)) % 2 === 0);
    if (apaga < 1) { R.disco(ri(mx - 2), ri(my - 8), 5, K); R.disco(ri(mx - 2), ri(my - 8), 4, on ? H('#5aff8a') : H('#3a8a5a')); R.disco(ri(mx - 3), ri(my - 9), 2, H('#e8fff0')); }
    else { R.disco(ri(mx - 2), ri(my - 8), 3, K); R.disco(ri(mx - 2), ri(my - 8), 2, H('#8a9098')); for (let k = 0; k < 4; k++) { const v = (t - W.SLOWLY - 0.6) * 2; if (v < 1) tine(mx - 2 + Math.cos(k * 1.6) * v * 10, my - 8 + Math.sin(k * 1.6) * v * 10, H('#c8ffd8'), 0.8 * (1 - v)); } }
    const g = pop(t, W.N14, 0.35); if (g > 0) R.numero('14', ri(mx - 4), ri(my - 18 - g * 6), { tam: 16, centro: true, color: apaga >= 1 ? H('#9aa0a8') : undefined }); }
};

// ── 3 · el tanque y la pantalla del 9500, de cerca: lo vivo muere; el reloj y el primer corte de la tarta ─────────────
const p3 = (t) => {
  vista(148, 40, 2); pausa(1); viñeta();
  const seco = ease(tramo(t, W.DIES - 0.1, W.STOPS + 0.6));
  sombraS(54, 178, 18, 0.4); arbol(54, 177, t, seco);
  // las motas que llegan y ahora rebotan, con su «X»
  for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1, ty = 122; let x = 30 + k * 20, y = lerp(30, ty, Math.min(1, u * 1.4)); if (u > 0.7) { const r = (u - 0.7) / 0.3; y = ty - Math.sin(r * Math.PI) * 16; x += r * 30; }
    if (t > W.STOPS) { mota(x, y, t, k, 0); if (u > 0.7 && u < 0.85) R.icono('X', ri(x) - 2, ri(y) - 12, H('#e83a3a'), K); } else if (u < 0.7) mota(x, y, t, k, 1); }
  // el reloj y la tarta caen en «so every»; el cuchillo la parte en «5,700»
  const cae = pop(t, W.SO, 0.35), mit = tramo(t, W.N5 + 0.05, W.YEARS + 0.3);
  if (cae > 0) reloj(206, ri(lerp(60, 172, cae)), t, mit, 2);
  const a = AT.atom(R, 112, 178, t, { s: 2, dir: t > W.SO - 0.3 ? 1 : -1, pose: t > W.SO - 0.3 && t < W.N5 ? 'sostiene' : t >= W.N5 ? 'senala' : 'quieto', cara: seco > 0.3 && t < W.SO ? 'triste' : mit > 0.9 ? 'sonrisa' : 'normal', habla: habla(t) });
};

// ── 4 · la campana y la fuente de iones, de cerca: la tarta al triple, la mitad, y otro corte, y otro ──────────────────
const p4 = (t) => {
  vista(0, 84, 2); pausa(1); viñeta();
  const mit = 1 + tramo(t, W.MEASURING, W.MEASURING + 1.0) + tramo(t, W.LEFT + 0.1, W.CHARCOAL - 0.05);
  const r = reloj(196, 176, t, mit, 3, true);
  // en «what it had» se dibuja de puntos la tarta entera que había
  if (t > W.WHAT - 0.1 && t < W.BY) { const [cx, cy] = r.tarta, n = 64; for (let k = 0; k < n; k++) { if ((k + Math.floor(t * 10)) % 3) continue; const a = k / n * Math.PI * 2; ps(cx + Math.cos(a) * 46, cy + 6 + Math.sin(a) * 21, H('#ffe070')); } }
  const s1 = t > W.HALF - 0.1 && t < W.MEASURING;
  AT.atom(R, 52, 178, t, { s: 2, dir: 1, pose: s1 ? 'senala' : t > W.MEASURING ? 'sostiene' : 'quieto', cara: t > W.LEFT ? 'sorpresa' : 'normal', habla: habla(t) });
  if (s1 && t > W.HALF) { const g = pop(t, W.HALF, 0.3); R.numero('1', ri(r.tarta[0] - 6), ri(r.tarta[1] - 30 - g * 4), { tam: 16, centro: true }); R.linea(ri(r.tarta[0]) - 3, ri(r.tarta[1]) - 22, ri(r.tarta[0]) + 9, ri(r.tarta[1]) - 22, H('#ffe070')); R.numero('2', ri(r.tarta[0] + 4), ri(r.tarta[1] - 6), { tam: 16, centro: true }); }
};

// ── 5 · a oscuras, el pupitre: la hoguera a color alumbra el laboratorio; el carbón; la tarta se parte otra vez ────────
const p5 = (t) => {
  vista(60, 88, 2); pausa(1);
  for (let i = 0; i < 320 * 180; i++) R.buf[i] = mez(R.buf[i], H('#0c1020'), 0.55);
  const FX = 176, FY = 168, viva = 0.7 + 0.3 * ease(tramo(t, W.CAMPFIRE - 0.2, W.CAMPFIRE + 0.4)) + Math.sin(t * 11) * 0.04;
  luzHoguera(FX, FY - 10, 110, 0.9 * viva);
  hoguera(FX, FY, t, viva);
  reloj(64, 172, t, 3 + tramo(t, W.LONG - 0.2, W.BURNED), 1, false);
  const a = AT.atom(R, 262, 178, t, { s: 2, dir: -1, pose: 'sostiene', cara: t > W.BURNED ? 'guino' : 'sonrisa', habla: habla(t) });
  const alza = ease(tramo(t, P5, P5 + 0.4)); carbon(a.mano[0] - 4, a.mano[1] - 5 - alza * 3, 2.4);
  if (alza > 0 && t < P5 + 1.2 && Math.floor(t * 6) % 2) destello(a.mano[0] - 10, a.mano[1] - 12, 2);
  viñeta(0.4);
};

// ── 6 · el pupitre y el termo, de cerca: la hoguera se apaga, el reloj corre; la última miga ───────────────────────────
const p6 = (t) => {
  vista(160, 88, 2); pausa(1); viñeta();
  const b = 1 - ease(tramo(t, W.FIRE - 0.2, W.OUT + 0.3));
  if (b > 0.1) luzHoguera(64, 160, 70, 0.6 * b);
  hoguera(64, 172, t, b);
  const mit = 4 + tramo(t, W.STARTED - 0.2, W.FIRE);
  const r = reloj(214, 172, t, mit, 2, true);
  if (t > W.HOURGLASS && t < W.HOURGLASS + 1.0 && Math.floor(t * 8) % 2) destello(r.reloj[0] + 10, r.reloj[1] - 20, 3);
  // Atom coge la miga y se la come
  const coge = tramo(t, W.OUT - 0.1, W.OUT + 0.35);
  const a = AT.atom(R, 128, 178, t, { s: 2, dir: 1, pose: t < W.HOURGLASS ? 'senala' : coge > 0 ? 'sostiene' : 'brazos', cara: coge >= 1 ? 'sonrisa' : t > W.FIRE ? 'sorpresa' : 'normal', habla: coge > 0.9 ? (Math.floor(t * 8) & 1) : habla(t) });
  if (coge > 0 && coge < 1) { const mx = lerp(r.tarta[0], a.mano[0], coge), my = lerp(r.tarta[1] + 4, a.mano[1], coge); rr(mx - 2, my - 2, mx + 2, my + 2, K); rr(mx - 1, my - 1, mx + 1, my + 1, H('#e8c080')); }
};

const efectos = [[0.05, 'tapestop'], [W.BECAUSE + 0.1, 'brillo'], [W.MAGIC + 0.08, 'chof'], [W.TAKES, 'brillo'], [W.N14, 'pop'], [W.SLOWLY + 0.3, 'tic'],
  [W.DIES + 0.1, 'chof'], [W.SO + 0.3, 'golpecito'], [W.N5 + 0.2, 'golpecito'], [W.YEARS + 0.35, 'brillo'], [W.HALF, 'pop'], [W.MEASURING + 0.15, 'golpecito'], [W.LEFT + 0.25, 'golpecito'],
  [W.CAMPFIRE, 'vapor'], [W.LONG, 'golpecito'], [W.HOURGLASS, 'brillo'], [W.FIRE, 'vapor'], [W.OUT + 0.4, 'masca']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 1998 });
''')
