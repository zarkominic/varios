E = {}

# Ayudas comunes (se copian en cada cuerpo): hh (ruido), mez (mezcla), K (tinta), ruta (recorridos con tiempos),
# cursor grande de los noventa (ojo, mano, boca, bota, cruz) a escala 2 con borde negro.
AYUDAS = r'''
const K = T.C.k, BL = hex('#f2eee2');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { a = Math.max(0, Math.min(1, a)); const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
// recorrido por puntos [t, x, y]: null antes del primero (o el primero con desde=false); mv: se mueve; d: hacia dónde
const ruta = (t, kf, desde = true) => { if (t < kf[0][0]) return desde ? null : { x: kf[0][1], s: kf[0][2], mv: false, d: 1 };
  for (let i = 0; i + 1 < kf.length; i++) if (t < kf[i + 1][0]) { const [t0, x0, s0] = kf[i], [t1, x1, s1] = kf[i + 1], u = (t - t0) / (t1 - t0); return { x: Math.round(lerp(x0, x1, u)), s: Math.round(lerp(s0, s1, u)), mv: x1 !== x0, d: x1 < x0 ? -1 : 1 }; }
  const [, x, s] = kf[kf.length - 1]; return { x, s, mv: false, d: 1 }; };
// el cursor único de los noventa, grande (escala e): forma 'ojo', 'mano', 'boca', 'bota', 'cruz'; clic (0–1) lo encoge y echa un destello
const CUR = {
  ojo: ['....#####....', '..##.....##..', '.#...###...#.', '#...#####...#', '#...##.##...#', '#...#####...#', '.#...###...#.', '..##.....##..', '....#####....'],
  mano: ['...#.#.#.....', '..##.#.#.#...', '..#########..', '.##########..', '###########..', '.##########..', '..########...', '...######....', '....####.....'],
  boca: ['.............', '..#########..', '.#.........#.', '#..#.#.#.#..#', '#...........#', '#..#.#.#.#..#', '.#.........#.', '..#########..', '.............'],
  bota: ['...#####.....', '...#####.....', '...#####.....', '...#####.....', '...######....', '..##########.', '.############', '.############', '..#.#.#.#.#..'],
  cruz: ['......#......', '......#......', '......#......', '.............', '###.......###', '.............', '......#......', '......#......', '......#......'],
};
const RELL = { ojo: ['....#####....', '..#########..', '.###########.', '#############', '#############', '#############', '.###########.', '..#########..', '....#####....'] };
const cursorG = (cx, cy, forma, t, clic = 0, e = 2) => {
  const f = CUR[forma] ?? CUR.cruz, w = f[0].length, hgt = f.length, s = e * (1 - 0.25 * Math.sin(Math.min(1, clic) * Math.PI)), x0 = Math.round(cx - w * s / 2), y0 = Math.round(cy - hgt * s / 2);
  const col = [hex('#ffffff'), hex('#f0e8a0'), hex('#ffffff'), hex('#c8e8ff')][Math.floor(t * 6) % 4], rell = RELL[forma];
  const lleno = (i, j) => (rell ? rell[j]?.[i] === '#' : false) || f[j]?.[i] === '#';
  const px = (i, j, c) => { for (let a = 0; a < Math.ceil(s); a++) for (let b = 0; b < Math.ceil(s); b++) R.pset(x0 + Math.floor(i * s) + a, y0 + Math.floor(j * s) + b, c); };
  for (let j = -1; j <= hgt; j++) for (let i = -1; i <= w; i++) if (!lleno(i, j) && (lleno(i - 1, j) || lleno(i + 1, j) || lleno(i, j - 1) || lleno(i, j + 1))) px(i, j, K);
  if (rell) for (let j = 0; j < hgt; j++) for (let i = 0; i < w; i++) if (rell[j][i] === '#' && f[j][i] !== '#') px(i, j, hex('#3a6ab8'));
  for (let j = 0; j < hgt; j++) for (let i = 0; i < w; i++) if (f[j][i] === '#') px(i, j, rell ? K : col);
  if (rell) { px(6, 4, BL); px(5, 3, BL); }
  if (clic > 0 && clic < 1) { const r = Math.round(6 + clic * 16); for (let a = 0; a < 6.28; a += 0.26) if (Math.floor(a * 6) % 2 === 0) R.pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.8), hex('#fff0a0')); }
};
'''

E['la-carretera'] = ('La carretera', '''// LA-CARRETERA (frases 32–33), 1993: el perro detective y el conejo hiperactivo salen a la carretera. Cinco planos:
// 1. carretera 'carretera' general: el coche de los sesenta entra por la izquierda y cruza el desierto con el perro al
//    volante; en «1993» el conejo se asoma por la ventanilla de atrás y saluda dando botes; polvo, la rodadora, el
//    halcón; en «road» el coche se pierde por la derecha. Corta en «Sam».
// 2. carretera 'coche': el coche de cerca, en marcha: el perro conduce y en «Steve Purcell's» se levanta el sombrero; el
//    conejo no para: bota en el asiento y en «duo» salta por la ventanilla con los brazos arriba y vuelve a caer. Corta
//    en «A dog».
// 3. carretera 'atraccion' general: el coche aparcado junto al dinosaurio; se abre la puerta y en «dog detective» baja
//    el perro con su traje y se coloca el sombrero en «suit»; en «hyperactive» el conejo sale disparado por la
//    ventanilla y rebota por el aparcamiento; el perro le sigue con la vista y menea la cabeza. Corta en «In».
// 4. el mapa de EE. UU. sobre la mesa: la chincheta en Nueva York; en «drive across» la ruta se dibuja hacia el oeste
//    con el cochecito encima y van saliendo las atracciones (dinosaurio, ovillo, rosquilla gigante); en «hunting for a
//    Bigfoot» aparecen delante las huellas gigantes y el coche las sigue. Corta en «Bigfoot».
// 5. carretera 'feria' carpa: la jaula vacía con los barrotes doblados; el perro y el conejo entran y siguen las huellas
//    («escaped»); en «Among» el Bigfoot sale de la carpa con los brazos arriba (el tentáculo morado disfrazado) y el
//    perro se asusta; en «each one weirder» el conejo salta y le arranca el disfraz: el morado, pillado, pone cara de
//    harto mientras el conejo agita la piel; el perro se ríe (gag 7).''', AYUDAS + r'''
const s = (f) => en('sam', f), b = (f) => en('bigfoot', f);
const P2 = s(0.329), P3 = s(0.715), P4 = b(-0.015), P5 = b(0.443);
// ── 1 · el coche cruza el desierto ─────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const cx = Math.round(lerp(-56, 372, tramo(t, 0.15, P2 + 0.2) * 0.25 + (t - 0.15) / (P2 + 0.2) * 0.75));
  const asoma = t > s(0.111) - 0.2;
  T.carretera(R, t, { encuadre: 'carretera', camara: 'general', luz: 'dia', cocheX: cx, cocheDir: 1, anda: true,
    ocupantes: ([d, a]) => {
      T.detective(R, d[0], d[1], t, { quien: 'perro', dir: 1, quieto: true });
      T.detective(R, a[0], a[1] - (asoma ? 4 + Math.round(Math.abs(Math.sin(t * 7)) * 3) : 0), t, { quien: 'conejo', dir: 1, brazos: asoma && t < s(0.111) + 1.4, sorpresa: asoma });
    } });
};
// ── 2 · el coche de cerca ──────────────────────────────────────────────────────────────────────────────────────
const p2 = (t) => {
  const SAL = s(0.621), salto = t > SAL - 0.1 && t < SAL + 0.9 ? Math.round(Math.sin(tramo(t, SAL - 0.1, SAL + 0.9) * Math.PI) * 22) : 0;
  T.carretera(R, t, { encuadre: 'carretera', camara: 'coche', luz: 'dia', velocidad: 1,
    ocupantes: ([d, a]) => {
      T.detective(R, d[0], d[1], t, { quien: 'perro', dir: 1, sorpresa: t > s(0.502) && t < s(0.502) + 0.7, habla: t > s(0.55) && t < s(0.62) && Math.sin(t * 9) > 0 });
      T.detective(R, a[0], a[1] - salto - (salto ? 0 : Math.round(Math.abs(Math.sin(t * 6)) * 3)), t, { quien: 'conejo', dir: Math.floor(t * 1.7) % 2 ? 1 : -1, brazos: salto > 6, sorpresa: salto > 0 });
    } });
};
// ── 3 · bajan en la atracción ──────────────────────────────────────────────────────────────────────────────────
const CAR = [226, 163];
const p3 = (t) => {
  T.carretera(R, t, { encuadre: 'atraccion', camara: 'general' });
  const DOG = s(0.747), SUIT = s(0.827), HYP = s(0.887);
  // el coche llega y aparca (frena con un cabeceo) antes de que bajen
  const llega = tramo(t, P3, P3 + 0.7), cxc = Math.round(lerp(330, CAR[0], llega)), cab = llega < 1 ? 0 : Math.round(Math.sin(Math.min(1, (t - P3 - 0.7) * 4) * Math.PI) * 1);
  const abre = t > DOG - 0.25 && t < DOG + 0.9;
  const pe = ruta(t, [[DOG - 0.05, 200, 172], [DOG + 0.7, 168, 172]]);
  const conej = t < HYP ? null : (() => { const u = tramo(t, HYP, HYP + 0.6); if (u < 1) return { x: Math.round(lerp(244, 150, u)), y: Math.round(lerp(140, 172, u) - Math.sin(u * Math.PI) * 30) };
    const v = t - HYP - 0.6; return { x: Math.round(140 + Math.sin(v * 3.4) * 30), y: 172 - Math.round(Math.abs(Math.sin(v * 7)) * 14) }; })();
  T.coche60(R, cxc, CAR[1] + cab, t, { dir: -1, anda: llega < 1, ocupantes: ([d, a]) => { if (!pe) T.detective(R, d[0], d[1], t, { quien: 'perro', dir: -1, quieto: true }); if (t < HYP) T.detective(R, a[0], a[1] - (t > HYP - 1 ? Math.round(Math.abs(Math.sin(t * 9)) * 3) : 0), t, { quien: 'conejo', dir: -1 }); } });
  // la puerta del conductor abierta (una hoja blanca que sobresale hacia nosotros)
  if (abre) { const x = cxc - 26; R.poligono([[x, 136], [x - 12, 140], [x - 12, 160], [x, 158]], K); R.poligono([[x - 1, 137], [x - 11, 141], [x - 11, 152], [x - 1, 150]], BL); R.poligono([[x - 1, 151], [x - 11, 153], [x - 11, 159], [x - 1, 157]], hex('#1c1c24')); R.linea(x - 9, 146, x - 6, 145, hex('#c8c8d0')); }
  if (pe) { const tip = t > SUIT && t < SUIT + 0.8; T.detective(R, pe.x, pe.s, t, { quien: 'perro', dir: conej ? (conej.x > pe.x ? 1 : -1) : -1, anda: pe.mv, sorpresa: tip, habla: t > HYP + 1.0 && Math.sin(t * 8) > 0.2 }); }
  if (conej) T.detective(R, conej.x, conej.y, t, { quien: 'conejo', dir: Math.cos((t - HYP - 0.6) * 3.4) > 0 ? 1 : -1, brazos: true, sorpresa: true });
};
// ── 4 · el mapa: de costa a costa siguiendo las huellas ───────────────────────────────────────────────────────
const RUTA = [[-74.0, 40.7], [-80.0, 40.4], [-87.6, 41.9], [-93.2, 44.9], [-100.3, 44.4], [-105.0, 39.7], [-111.8, 36.2], [-118.3, 34.1]];
const ATRA = [[0.28, 'dino'], [0.5, 'ovillo'], [0.74, 'rosca']];
const cochecito = (x, y, d) => { x = Math.round(x); y = Math.round(y); const X = (i) => x + i * d;
  R.rect(Math.min(X(-8), X(8)), y - 3, Math.max(X(-8), X(8)), y + 2, K); R.rect(Math.min(X(-7), X(7)), y - 2, Math.max(X(-7), X(7)), y + 1, hex('#1c1c24'));
  R.rect(Math.min(X(-4), X(3)), y - 6, Math.max(X(-4), X(3)), y - 3, K); R.rect(Math.min(X(-3), X(2)), y - 5, Math.max(X(-3), X(2)), y - 3, BL); R.rect(Math.min(X(-7), X(7)), y - 1, Math.max(X(-7), X(7)), y - 1, BL);
  for (const i of [-5, 5]) { R.disco(X(i), y + 2, 2, K); R.pset(X(i), y + 2, hex('#c8c8d0')); } R.pset(X(0), y - 7, hex('#e83a3a')); };
const huella = (x, y, e = 1) => { x = Math.round(x); y = Math.round(y); const c = hex('#4a2a16');
  R.disco(x, y + 1, 3 * e, K); R.disco(x, y + 1, 2 * e, c); for (let k = 0; k < 4; k++) { R.disco(x - 3 + k * 2, y - 4 * e, e, c); } R.disco(x + 1, y - 2, 2 * e, c); };
const icAtra = (q, x, y, a) => { if (a <= 0) return; x = Math.round(x); y = Math.round(y - (1 - a) * 6);
  R.disco(x + 1, y + 2, 10, mez(hex('#c8b890'), K, 0.4)); R.disco(x, y, 10, K); R.disco(x, y, 9, hex('#f6e4b4')); R.disco(x - 2, y - 2, 6, hex('#fcf4d8'));
  const PX = (i, j, c) => R.rect(x + i * 2, y + j * 2, x + i * 2 + 1, y + j * 2 + 1, c);
  if (q === 'dino') { const g = hex('#3a8a4a'), gs = hex('#2a5a2a'); for (const [i, j] of [[-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [-2, 1], [-1, 1], [0, 1], [1, -1], [1, -2], [2, -3], [3, -3], [-4, 1]]) PX(i, j, g); for (const [i, j] of [[-2, 2], [0, 2]]) PX(i, j, gs); R.pset(x + 7, y - 6, K); return; }
  if (q === 'ovillo') { R.disco(x, y, 6, hex('#8a4a1a')); R.disco(x, y, 5, hex('#c8783a')); for (let k = -4; k <= 4; k += 2) R.linea(x - 4, y + k, x + 4, y - k, hex('#8a4a1a')); R.linea(x + 5, y + 4, x + 8, y + 7, hex('#c8783a')); return; }
  R.disco(x, y, 7, hex('#8a4a1a')); R.disco(x, y, 6, hex('#e87ab8')); R.disco(x, y, 2, hex('#c8783a')); R.disco(x, y, 1, hex('#f6e4b4')); for (let k = 0; k < 6; k++) R.pset(x - 4 + k * 2, y - 3 + (k % 2) * 5, [hex('#fff0a0'), hex('#5ac8e8')][k % 2]); return;
};
const p4 = (t) => {
  const P = T.mapa(R, t, { zona: 'eeuu' });
  const pts = RUTA.map(P), u = Math.min(1, Math.max(0, (t - b(0.03)) / (b(0.47) - b(0.03))));
  T.chincheta(R, pts[0][0], pts[0][1], t, T.C.rojo, { baja: tramo(t, P4 + 0.1, P4 + 0.5) });
  if (u > 0) R.ruta(pts, u, hex('#c83a2a'), { grueso: true, continua: true });
  // dónde va el coche: a lo largo de la ruta
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  const en_ = (v) => { let q = tot * v; for (let i = 1; i < pts.length; i++) { if (q <= L[i - 1]) { const f = q / L[i - 1]; return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]; } q -= L[i - 1]; } return pts[pts.length - 1]; };
  for (const [v, q] of ATRA) { const [x, y] = en_(v); const tv = b(0.03) + (b(0.47) - b(0.03)) * v; icAtra(q, x + 2, y - 16, tramo(t, tv - 0.1, tv + 0.2)); }
  // las huellas gigantes que van delante del coche, desde «hunting for a Bigfoot»
  const H = b(0.347); if (t > H) for (let k = 0; k < 4; k++) { const v = Math.min(0.99, u + 0.05 + k * 0.035); if (t > H + k * 0.15) { const [x, y] = en_(v); huella(x + (k % 2 ? 4 : -4), y + (k % 2 ? 4 : -4), 1); }
 }
  const [cx, cy] = en_(u); cochecito(cx, cy - 3 + Math.round(Math.sin(t * 14)), u > 0 ? -1 : -1);
};
// ── 5 · la feria: el Bigfoot y el disfraz ──────────────────────────────────────────────────────────────────────
const piel = (x, y, t) => { x = Math.round(x); y = Math.round(y); const F = [hex('#2a160c'), hex('#4a2a16'), hex('#6e4424'), hex('#9a6a3a')];
  for (let j = -9; j <= 9; j++) for (let i = -12; i <= 12; i++) { const d = (i / 12) ** 2 + (j / 9) ** 2 + (hh(i, j, 7) - 0.5) * 0.35 + Math.sin(i * 0.9 + t * 9) * 0.05; if (d < 1) R.pset(x + i, y + j + Math.round(Math.sin(i * 0.5 + t * 10)), d > 0.8 ? F[0] : F[Math.min(3, 1 + Math.floor(hh(i, j, 3) * 2.2 + (j < 0 ? 0.6 : 0)))]); }
  R.disco(x - 4, y - 2, 2, K); R.disco(x + 4, y - 2, 2, K); };
const p5 = (t) => {
  T.carretera(R, t, { encuadre: 'feria', camara: 'carpa' });
  const ESC = b(0.528), AMONG = b(0.70), WEIRD = b(0.846);
  const pe = ruta(t, [[P5, 40, 162], [ESC - 0.1, 168, 162], [AMONG + 0.3, 168, 162], [AMONG + 0.7, 112, 162]], false);
  const co = ruta(t, [[P5 + 0.3, 30, 162], [ESC + 0.2, 206, 162], [WEIRD - 0.4, 206, 162], [WEIRD - 0.05, 196, 162]], false);
  // el Bigfoot: sale de la carpa en «Among», grande; el conejo le quita la piel en «each one weirder»
  const sale = tramo(t, AMONG - 0.1, AMONG + 0.5), quita = t > WEIRD;
  if (sale > 0) T.tentaculo(R, 160, 158 + Math.round((1 - sale) * 14), t, { color: 'morado', s: 2, dir: 1, accesorio: quita ? null : 'disfraz', brazos: 1, pose: quita ? 'normal' : 'arriba', expresion: quita ? (t > WEIRD + 0.7 ? 'harto' : 'sorpresa') : 'malvado', aplasta: quita && t < WEIRD + 0.2 ? 0.5 : 0 });
  if (pe) { const susto = t > AMONG + 0.1 && t < WEIRD + 0.2; T.detective(R, pe.x, pe.s, t, { quien: 'perro', dir: susto || pe.mv && pe.d < 0 ? (pe.mv ? -1 : 1) : 1, anda: pe.mv, sorpresa: susto || (t > ESC && t < ESC + 0.6), habla: t > WEIRD + 0.6 && Math.sin(t * 9) > 0 }); }
  if (co) { const salta = t > WEIRD - 0.35 && t < WEIRD + 0.5, hy = salta ? Math.round(Math.sin(tramo(t, WEIRD - 0.35, WEIRD + 0.5) * Math.PI) * 34) : 0;
    const r = T.detective(R, co.x, co.s - hy, t, { quien: 'conejo', dir: t > ESC + 0.2 && t < AMONG ? 1 : -1, anda: co.mv, brazos: quita, sorpresa: t > AMONG && t < WEIRD });
    if (quita) piel(co.x + 2 + Math.round(Math.sin(t * 8) * 3), co.s - hy - 40, t); }

};
const efectos = [[0.2, 'coche'], [s(0.111), 'boing'], [P2 + 0.3, 'whoosh'], [s(0.621) - 0.05, 'boing'], [P3 + 0.3, 'puerta'], [s(0.887), 'boing'],
  [P4 + 0.25, 'golpecito'], [b(0.17), 'lapiz'], [b(0.35), 'golpecito'], [b(0.70), 'boing'], [b(0.846), 'whoosh'], [b(0.92), 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 1993 });
''')

E['la-purcell'] = ('Purcell y el cursor', '''// LA-PURCELL (frases 34–36), 1990 → 1993 → 1995. Seis planos:
// 1. estudio 'dibujo' general (1990): el dibujante, en la mesa de dibujo inclinada con su cómic, entinta; en «studio»
//    una compañera entra con su taza y le saluda; en «Sam and Max» el perro y el conejo dibujados asoman en la hoja y
//    ella se ríe. Corta en «comic».
// 2. fondo local (inserto): el boletín de la empresa sobre la mesa (cabecera de pictogramas, renglones sin letras) con
//    la tira de cuatro viñetas que se va llenando en «comic strips»: el coche, el salto del conejo, el golpe y las
//    risas; en «game of their own» una mano desliza un disquete en blanco con un «?». Corta en «Here».
// 3. carretera 'atraccion' cerca (1993, la pantalla del juego): la línea de verbos abajo; en «disappears» se hunde y
//    desaparece; en «single cursor» sale el cursor único y en «changes shape» pasa de ojo a mano y a boca. Corta en
//    «and with a click».
// 4. carretera 'feria' general: clic con el ojo en «look» (el conejo mira la noria con «!»), con la mano en «pick up»
//    (coge un globo y lo sostiene) y con la boca en «talk» (le habla al perro). Corta en «soon after».
// 5. carretera 'moteros' general (1993 → 1995 en «1995»): de noche llega la banda en sus motos; el jefe se baja y señala
//    el bar en «Schafer takes». Corta en «biker gang».
// 6. carretera 'moteros' cerca: el motero de la chupa ante la puerta; en «icons» se abre el menú de la calavera (ojos,
//    boca, puño, bota), el cursor recorre ojos, boca y puño, y en «skull» elige la bota: patada a la puerta, que se abre.''', AYUDAS + r'''
const p = (f) => en('purcell', f), c = (f) => en('cursor', f), th = (f) => en('throttle', f);
const P2 = p(0.539), P3 = c(0), P4 = c(0.572), P5 = th(0.001), P6 = th(0.572);
// ── 1 · el dibujante en su mesa ────────────────────────────────────────────────────────────────────────────────
const p1 = (t) => {
  const g = T.estudio(R, t, { encuadre: 'dibujo', camara: 'general', anyo: 1990, papel: 'comic' });
  const SAM = p(0.336), STU = p(0.146);
  // la compañera entra con su taza por la derecha, saluda en «studio» y se ríe con el dibujo
  const q = ruta(t, [[0.3, 330, 152], [STU + 0.2, 214, 152], [SAM, 214, 152], [SAM + 0.8, 180, 152]], false);
  R.actor(EL.disenadora, q.x, q.s, t, { dir: -1, anda: q.mv, dedo: t > STU && t < STU + 1.0, sonrisa: t > SAM + 0.3, sorpresa: t > SAM && t < SAM + 0.3, habla: t > SAM + 0.4 && t < SAM + 1.4 && Math.sin(t * 9) > 0 });
  // el dibujante: entinta con la plumilla (la mano sobre la hoja, que va y viene)
  const pin = t < SAM - 0.2 || t > SAM + 1.6, mx = 120 + Math.round(Math.sin(t * 2.3) * 8), my = 102 + Math.round(Math.cos(t * 3.1) * 4);
  const r = R.actor(EL.disenador2, 141, 152, t, { dir: -1, sostiene: pin ? [mx, my] : true, sonrisa: !pin, habla: !pin && Math.sin(t * 8) > 0 });
  if (r.mano) { const [hx, hy] = r.mano; R.linea(hx, hy, hx - 4, hy + 4, K); R.pset(hx - 4, hy + 5, hex('#1c1c24')); }
  // el perro y el conejo dibujados que asoman por el borde del cómic en «Sam and Max»
  const a = tramo(t, SAM - 0.1, SAM + 0.4);
  if (a > 0) { R.recorte([24, 86, 138, 122]); T.detective(R, 44, 122 + Math.round((1 - a) * 18), t, { quien: 'perro', dir: 1, sorpresa: true }); T.detective(R, 62, 122 + Math.round((1 - a) * 22), t, { quien: 'conejo', dir: 1, brazos: true }); R.recorte(null); }
};
// ── 2 · el boletín con la tira ─────────────────────────────────────────────────────────────────────────────────
const MESA = ['#3a1e10', '#5a3018', '#6e3c20', '#844a28', '#9a5a30', '#b8743e'].map(hex);
const PAP = ['#a8a090', '#c8c0aa', '#e0d8c2', '#f2eee0', '#fcfaf0'].map(hex);
let fondoB = null;
const pintaBoletin = () => {
  const { rect, pset, linea, disco } = R;
  // la mesa: tablones con vetas, nudos, juntas y una quemadura
  for (let y = 0; y < 180; y++) { const j = Math.floor(y / 30), dy = y % 30; for (let x = 0; x < 320; x++) {
    const v = Math.sin(x * 0.05 + j * 2.1 + Math.sin(x * 0.013 + j) * 3 + dy * 0.35); let k = 3 + (j % 2 ? -1 : 0) + (v > 0.85 ? -1 : v < -0.88 ? 1 : 0) + (hh(x >> 1, y, j) < 0.05 ? -1 : 0);
    if (dy === 29) k = 0; else if (dy === 0) k = 4; pset(x, y, MESA[Math.max(0, Math.min(5, k))]); } }
  for (const [nx, ny] of [[22, 44], [300, 120], [12, 150]]) { for (let r = 5; r > 0; r--) disco(nx, ny, r, MESA[r % 2 ? 1 : 2]); pset(nx, ny, MESA[0]); }
  // el montón de boletines viejos a la izquierda (bordes) y la regla
  for (let k = 3; k >= 0; k--) { rect(4 + k, 26 + k * 3, 34 + k, 120 + k * 3, K); rect(5 + k, 27 + k * 3, 33 + k, 119 + k * 3, PAP[2 + (k % 2)]); rect(5 + k, 27 + k * 3, 33 + k, 30 + k * 3, hex('#c8642a')); }
  for (let y = 40; y < 118; y += 4) rect(9, y, 30, y, PAP[1]);
  rect(290, 10, 300, 110, K); rect(291, 11, 299, 109, hex('#e8c860')); for (let y = 14; y < 108; y += 4) rect(291, y, y % 12 === 2 ? 296 : 294, y, hex('#6a4a10'));
  // la sombra de la hoja y la hoja del boletín
  rect(46, 18, 284, 176, mez(MESA[2], K, 0.55));
  rect(40, 12, 278, 172, K); for (let y = 13; y < 172; y++) for (let x = 41; x < 278; x++) pset(x, y, hh(x, y, 5) < 0.08 ? PAP[2] : (x + y) % 61 === 0 ? PAP[2] : PAP[3]);
  rect(41, 13, 277, 13, PAP[4]);
  // la cabecera: banda naranja con los pictogramas de la casa (sin letras): una estrella, un mando y la mansión
  rect(48, 18, 270, 40, K); rect(49, 19, 269, 39, hex('#c8642a')); rect(49, 19, 269, 21, hex('#e8904a')); rect(49, 37, 269, 39, hex('#9a4a1a'));
  for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 2.513; linea(66, 29, Math.round(66 + Math.cos(a) * 8), Math.round(29 + Math.sin(a) * 8), hex('#fff0a0')); } disco(66, 29, 3, hex('#fff0a0'));
  for (const [x, w] of [[84, 46], [140, 30], [178, 40]]) { rect(x, 25, x + w, 30, hex('#fcfaf0')); rect(x, 31, x + w, 31, hex('#9a4a1a')); }
  rect(228, 23, 262, 35, hex('#3a2a4a')); rect(231, 26, 259, 32, hex('#8a3ac8')); disco(238, 29, 2, hex('#fff0a0')); disco(252, 29, 2, hex('#fff0a0'));
  // tres columnas de renglones sin letras con una foto (el equipo) y un dibujo
  for (let col = 0; col < 3; col++) { const x0 = 50 + col * 74; for (let y = 46; y < 98; y += 3) { const w = 64 - (hh(col, y) < 0.2 ? 18 : 0); if (!(col === 1 && y > 52 && y < 80)) rect(x0, y, x0 + w, y, PAP[1]); } }
  rect(128, 54, 184, 78, K); rect(129, 55, 183, 77, hex('#5a6a7a')); for (let k = 0; k < 4; k++) { const x = 136 + k * 12; disco(x, 64, 3, hex('#e8c8a0')); rect(x - 3, 68, x + 3, 77, [hex('#8a3a3a'), hex('#3e6a8a'), hex('#6a8a4a'), hex('#c8a040')][k]); }
  // la tira: cuatro viñetas (se pintan vacías; el dibujo va en cada fotograma)
  rect(46, 102, 272, 164, K); rect(47, 103, 271, 163, PAP[4]);
  // la taza de café con su cerco y los lápices
  disco(300, 158, 14, mez(MESA[3], K, 0.4)); disco(298, 156, 12, K); disco(298, 156, 11, hex('#e8e2d2')); disco(298, 156, 8, hex('#4a2a14')); disco(296, 154, 3, hex('#6a3a1a'));
  for (const [x0, y0, x1, y1, cc] of [[10, 150, 40, 140, '#e8c040'], [14, 160, 46, 158, '#c83a3a']]) { linea(x0, y0 + 1, x1, y1 + 1, K); linea(x0, y0, x1, y1, hex(cc)); pset(x1, y1, K); pset(x0, y0, hex('#e88a9a')); }
  for (let k = 0; k < 6; k++) pset(284 + Math.round(hh(k, 1) * 20), 120 + Math.round(hh(k, 2) * 14), hex('#e88a9a'));
};
const VIN = [[50, 106, 102, 160], [106, 106, 158, 160], [162, 106, 214, 160], [218, 106, 268, 160]];
const vineta = (k, t, a) => {
  const [x0, y0, x1, y1] = VIN[k]; R.rect(x0, y0, x1, y1, K);
  if (a <= 0) { R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, PAP[4]); return; }
  const cielo = [hex('#8ac8e8'), hex('#f0c870'), hex('#e87a6a'), hex('#a8d878')][k];
  R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, cielo); R.rect(x0 + 1, y1 - 12, x1 - 1, y1 - 1, hex('#c8a878')); R.rect(x0 + 1, y1 - 12, x1 - 1, y1 - 12, hex('#8a6a4a'));
  for (let x = x0 + 2; x < x1; x += 4) R.pset(x, y1 - 6, hex('#8a6a4a'));
  R.recorte([x0 + 1, y0 + 1, x1 - 1, y1 - 1]);
  const lt = t * 1.3 + k, cx = (x0 + x1) >> 1, by = y1 - 4;
  if (k === 0) { T.coche60(R, cx + Math.round(Math.sin(lt) * 3), by + 1, t, { s: 0.5, dir: 1, anda: true }); R.disco(x0 + 9, y0 + 10, 4, hex('#fff0a0')); }
  else if (k === 1) { T.detective(R, cx - 10, by, t, { quien: 'perro', dir: 1, sorpresa: true }); T.detective(R, cx + 10, by - Math.round(Math.abs(Math.sin(t * 6)) * 12), t, { quien: 'conejo', dir: -1, brazos: true }); }
  else if (k === 2) { T.detective(R, cx - 8, by, t, { quien: 'perro', dir: 1, habla: Math.sin(t * 9) > 0 }); T.detective(R, cx + 10, by, t, { quien: 'conejo', dir: -1, sorpresa: true }); for (let i = 0; i < 6; i++) R.linea(cx + 2, by - 24, cx + 2 + Math.round(Math.cos(i) * 7), by - 24 + Math.round(Math.sin(i) * 7), hex('#fff0a0')); }
  else { T.detective(R, cx - 10, by, t, { quien: 'perro', dir: 1, brazos: true }); T.detective(R, cx + 10, by - Math.round(Math.abs(Math.sin(t * 7)) * 6), t, { quien: 'conejo', dir: -1, brazos: true }); }
  R.recorte(null);
  if (a < 1) { const n = Math.round((1 - a) * (y1 - y0)); R.rect(x0 + 1, y1 - n, x1 - 1, y1 - 1, PAP[4]); }
};
const disquete = (x, y, t) => { x = Math.round(x); y = Math.round(y);
  R.rect(x + 3, y + 3, x + 39, y + 41, mez(MESA[2], K, 0.6)); R.rect(x, y, x + 36, y + 38, K); R.rect(x + 1, y + 1, x + 35, y + 37, hex('#2a2a3a')); R.rect(x + 1, y + 1, x + 35, y + 1, hex('#5a5a6e'));
  R.rect(x + 9, y + 1, x + 27, y + 12, hex('#a8a8b8')); R.rect(x + 9, y + 1, x + 27, y + 1, hex('#e8e8f0')); R.rect(x + 21, y + 3, x + 24, y + 10, hex('#2a2a3a'));
  R.rect(x + 5, y + 17, x + 31, y + 35, hex('#f2eee0')); R.rect(x + 5, y + 17, x + 31, y + 19, hex('#c8642a'));
  R.icono('?', x + 13, y + 21, hex('#c83a2a'), hex('#8a8aa0'), 2); };
const p2 = (t) => {
  if (!fondoB) { fondoB = R.nuevo(); const prev = R.usar(fondoB); pintaBoletin(); R.usar(prev); }
  R.copiar ? R.copiar(fondoB) : R.buf.set(fondoB);
  const v = [p(0.579), p(0.62), p(0.66), p(0.70)];
  for (let k = 0; k < 4; k++) vineta(k, t, tramo(t, v[k] - 0.1, v[k] + 0.25));
  // el vapor de la taza
  for (let k = 0; k < 6; k++) { const w = (t * 0.7 + k / 6) % 1; R.pset(Math.round(298 + Math.sin(w * 8 + k) * 4), Math.round(144 - w * 30), w < 0.5 ? hex('#e8e2d2') : hex('#a89a8a')); }
  // la mano que desliza el disquete en blanco con su «?» en «game of their own»
  const G = p(0.897), u = tramo(t, G - 0.6, G + 0.1), dx = Math.round(lerp(330, 226, u)), dy = Math.round(lerp(70, 50, u));
  if (u > 0) { disquete(dx, dy, t); if (t < G + 0.8) T.brazo(R, 336, 128, dx + 30, dy + 26, '#3e6a8a', -1, { codo: [318, 96] }); }
};
// ── 3 · la línea de verbos desaparece; el cursor único cambia de forma ─────────────────────────────────────────
const p3 = (t) => {
  T.carretera(R, t, { encuadre: 'atraccion', camara: 'cerca' });
  const DIS = c(0.109), CUR1 = c(0.311), CAM = c(0.393);
  // el perro y el conejo, protagonistas del juego, ante el ovillo
  T.detective(R, 104, 174, t, { quien: 'perro', dir: 1, sorpresa: t > DIS && t < DIS + 0.8 });
  T.detective(R, 210, 174 - Math.round(Math.abs(Math.sin(t * 5)) * 6), t, { quien: 'conejo', dir: -1, brazos: t > CAM && t < CAM + 0.6 });
  T.verbos(R, t, { aparece: 1 - tramo(t, DIS, DIS + 0.6), activo: 'mirar', inventario: true });
  if (t > CUR1) { const k = Math.floor(Math.max(0, t - CAM) / 0.42) % 3, forma = t < CAM ? 'cruz' : ['ojo', 'mano', 'boca'][k];
    const x = 160 + Math.round(Math.sin(t * 1.4) * 30), y = 96 + Math.round(Math.cos(t * 1.1) * 10);
    cursorG(x, y, forma, t, t > CAM ? ((t - CAM) / 0.42) % 1 < 0.25 ? ((t - CAM) / 0.42) % 1 * 4 : 0 : 0, tramo(t, CUR1, CUR1 + 0.25) * 3); }

};
// ── 4 · mirar, coger, hablar ───────────────────────────────────────────────────────────────────────────────────
const p4 = (t) => {
  T.carretera(R, t, { encuadre: 'feria', camara: 'general' });
  const LOOK = c(0.765), PICK = c(0.868), TALK = c(0.922);
  const globo = (x, y) => { R.linea(x, y, x + 1, y - 14, hex('#8a8a96')); R.disco(x + 1, y - 19, 5, K); R.disco(x + 1, y - 19, 4, hex('#e83a5a')); R.pset(x - 1, y - 21, BL); };
  // el vendedor de globos (pequeño) junto a las palomitas
  const vend = R.actor(EL.musico, 140, 166, t, { dir: -1, sostiene: true, sonrisa: true });
  if (t < PICK + 0.15) for (let k = 0; k < 3; k++) globo(vend.mano[0] + k * 3 - 3, vend.mano[1]);
  else for (let k = 0; k < 2; k++) globo(vend.mano[0] + k * 3 - 1, vend.mano[1]);
  T.detective(R, 200, 166, t, { quien: 'perro', dir: -1, habla: t > TALK + 0.5 && Math.sin(t * 9) > 0, sorpresa: t > TALK + 0.1 && t < TALK + 0.5 });
  const cx = t < PICK ? 176 : t < PICK + 0.25 ? Math.round(lerp(176, 162, tramo(t, PICK, PICK + 0.25))) : t < TALK ? 162 : Math.round(lerp(162, 180, tramo(t, TALK, TALK + 0.3)));
  const cr = T.detective(R, cx, 166, t, { quien: 'conejo', dir: t > LOOK - 0.2 && t < PICK ? -1 : t < TALK ? -1 : 1, sorpresa: t > LOOK && t < LOOK + 0.6, habla: t > TALK && t < TALK + 1.1, brazos: t > PICK + 0.25 && t < TALK });
  if (t > LOOK && t < LOOK + 0.8) R.bocadillo(cx - 2, 132, { icono: '!' });
  if (t > PICK + 0.15) globo(cr.mano[0], cr.mano[1]);
  // el cursor: ojo sobre la noria, mano sobre el globo, boca sobre el perro; cada clic, en su palabra
  const pos = t < LOOK - 0.6 ? [lerp(230, 82, tramo(t, P4, LOOK - 0.7)), lerp(150, 72, tramo(t, P4, LOOK - 0.7))] : t < LOOK + 0.2 ? [82, 72] : t < PICK ? [lerp(82, 146, tramo(t, LOOK + 0.2, PICK - 0.15)), lerp(72, 126, tramo(t, LOOK + 0.2, PICK - 0.15))] : t < TALK - 0.05 ? [lerp(146, 202, tramo(t, PICK + 0.05, TALK - 0.1)), lerp(126, 134, tramo(t, PICK + 0.05, TALK - 0.1))] : [202, 134];
  const forma = t < LOOK + 0.25 ? 'ojo' : t < PICK + 0.1 ? 'mano' : 'boca';
  const clic = [LOOK, PICK, TALK].map((k) => tramo(t, k - 0.12, k + 0.18)).find((v) => v > 0 && v < 1) ?? 0;
  cursorG(pos[0], pos[1], forma, t, clic);
};
// ── 5 · la banda de moteros llega al bar ───────────────────────────────────────────────────────────────────────
const chopper = (x, suelo, t, d, quien) => { x = Math.round(x); const X = (i) => x + i * d, y = suelo;
  if (quien) R.actor(quien, X(-4) - 7, y - 6, t, { dir: d, quieto: true, enfado: false, sonrisa: true });
  const rueda = (cx) => { R.disco(cx, y - 6, 7, K); R.disco(cx, y - 6, 6, hex('#2a2a32')); R.disco(cx, y - 6, 3, hex('#8a8a96')); const a = t * 18; for (let k = 0; k < 3; k++) R.pset(Math.round(cx + Math.cos(a + k * 2.1) * 5), Math.round(y - 6 + Math.sin(a + k * 2.1) * 5), hex('#c8c8d0')); };
  rueda(X(-16)); rueda(X(17));
  R.linea(X(17), y - 6, X(10), y - 26, hex('#c8c8d0')); R.linea(X(18), y - 6, X(11), y - 26, hex('#8a8a96'));
  R.linea(X(10), y - 26, X(6), y - 30, K); R.linea(X(10), y - 27, X(13), y - 30, hex('#c8c8d0'));
  R.poligono([[X(-12), y - 14], [X(8), y - 14], [X(10), y - 20], [X(2), y - 22], [X(-8), y - 18]].map(([a, b]) => [a, b]), K);
  R.poligono([[X(-11), y - 15], [X(7), y - 15], [X(9), y - 19], [X(2), y - 21], [X(-7), y - 18]], hex('#a83a2a'));
  R.linea(X(-2), y - 20, X(5), y - 20, hex('#e87a6a')); R.rect(Math.min(X(-6), X(4)), y - 12, Math.max(X(-6), X(4)), y - 7, hex('#5a5a66')); R.rect(Math.min(X(-6), X(4)), y - 12, Math.max(X(-6), X(4)), y - 12, hex('#c8c8d0'));
  R.linea(X(-14), y - 8, X(-24), y - 6, hex('#c8c8d0')); R.disco(X(13), y - 23, 2, hex('#fff0a0'));
};
const p5 = (t) => {
  T.carretera(R, t, { encuadre: 'moteros', camara: 'general' });
  const Y95 = th(0.137), SCH = th(0.312);
  // el bar: alguien asoma por la puerta con una jarra
  const a = R.actor(EL.pirata, 124, 138, t, { dir: 1, sostiene: true, sonrisa: t > SCH });
  R.rect(a.mano[0] - 2, a.mano[1] - 5, a.mano[0] + 2, a.mano[1], K); R.rect(a.mano[0] - 1, a.mano[1] - 4, a.mano[0] + 1, a.mano[1] - 1, hex('#e8a83a')); R.pset(a.mano[0] - 1, a.mano[1] - 5, BL);
  // las dos motos de la banda llegan por la carretera (delante de todo)
  const m1 = lerp(360, 150, tramo(t, P5 + 0.1, Y95 + 0.3)), m2 = lerp(420, 196, tramo(t, P5 + 0.6, Y95 + 1.0));
  const jefe = t > SCH - 0.6;
  if (jefe) { const q = ruta(t, [[SCH - 0.6, 136, 172], [SCH - 0.1, 120, 172]], false); R.actor(EL.motero, q.x, q.s, t, { dir: 1, anda: q.mv, dedo: t > SCH, enfado: true }); }
  chopper(m1, 176, t, -1, jefe ? null : EL.motero); chopper(m2, 178, t, -1, EL.motero);
  // el humo de los tubos mientras ruedan
  for (const [mx, t0, t1] of [[m1, P5 + 0.1, Y95 + 0.5], [m2, P5 + 0.6, Y95 + 1.2]]) if (t > t0 && t < t1 + 0.8) for (let k = 0; k < 5; k++) { const w = (t * 1.6 + k / 5) % 1; R.disco(Math.round(mx + 26 + w * 18), Math.round(170 - w * 8), Math.round(1 + w * 3), w < 0.5 ? hex('#8a8a9a') : hex('#4a4a5a')); }
};
// ── 6 · el menú de la calavera ─────────────────────────────────────────────────────────────────────────────────
const bota = (x, y, c1 = hex('#5a3418'), c2 = hex('#8a5a30')) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 4, y - 8, x + 2, y + 2, K); R.rect(x - 4, y + 1, x + 8, y + 6, K); R.rect(x - 3, y - 7, x + 1, y + 2, c1); R.rect(x - 3, y + 2, x + 7, y + 4, c1); R.rect(x - 3, y - 7, x - 2, y + 3, c2); R.rect(x - 3, y + 5, x + 7, y + 5, hex('#c8c8d0')); R.pset(x + 7, y + 2, c2); R.rect(x - 3, y - 4, x + 1, y - 4, hex('#c8a040')); };
const anillo = (x, y, r, t) => { for (let a = 0; a < 6.28; a += 0.12) R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), Math.floor(a * 5 + t * 12) % 2 ? hex('#f0b03a') : hex('#fff0a0')); };
const calavera = (cx, cy, e, sel, t) => {
  const HU = hex('#e8e2d0'), HS = hex('#b8ae98'), HL = hex('#fcf8ec'), Rr = Math.max(1, Math.round(22 * e)), boca = sel === 1 ? 3 + Math.round(Math.abs(Math.sin(t * 9)) * 2) : 0;
  R.disco(cx + 3, cy + 4, Rr + 1, mez(hex('#1a1424'), K, 0.5));
  // la mandíbula (baja cuando se elige la boca)
  if (e > 0.6) { const jy = cy + Math.round(13 * e) + boca; R.rect(cx - 13, jy, cx + 13, jy + 13, K); R.rect(cx - 12, jy + 1, cx + 12, jy + 12, HS); R.rect(cx - 12, jy + 1, cx + 8, jy + 10, HU); R.rect(cx - 12, jy + 1, cx + 12, jy + 3, K);
    for (let k = -10; k <= 10; k += 4) { R.rect(cx + k, jy + 1, cx + k + 2, jy + 3, HL); } if (boca) { R.rect(cx - 9, cy + 13, cx + 9, jy, hex('#4a1418')); R.rect(cx - 5, jy - 2, cx + 5, jy, hex('#e85a6a')); } }
  R.disco(cx, cy, Rr + 1, K); R.disco(cx, cy, Rr, HS); R.disco(cx - 1, cy - 1, Rr - 2, HU); R.disco(cx - 7 * e, cy - 9 * e, Math.max(1, 7 * e), HL);
  if (e < 0.9) return;
  // los dientes de arriba
  R.rect(cx - 12, cy + 13, cx + 12, cy + 16, K); for (let k = -10; k <= 10; k += 4) R.rect(cx + k, cy + 13, cx + k + 2, cy + 15, HL);
  // las cuencas: con el ojo dentro cuando se elige mirar
  for (const ex of [cx - 9, cx + 9]) { R.disco(ex, cy + 2, 7, K); R.disco(ex, cy + 2, 6, hex('#2a1a24'));
    if (sel === 0) { R.disco(ex, cy + 2, 5, BL); const m = Math.round(Math.sin(t * 3) * 2); R.disco(ex + m, cy + 2, 2, hex('#3a6ab8')); R.pset(ex + m, cy + 2, K); R.pset(ex + m - 1, cy + 1, BL); } }
  R.poligono([[cx, cy + 8], [cx - 3, cy + 12], [cx + 3, cy + 12]], K);
  // el puño (la mano canónica) a la izquierda y la bota a la derecha, cada uno en su chapa
  for (const [x, y, on] of [[cx - 36, cy + 12, sel === 2], [cx + 36, cy + 12, sel === 3]]) { R.disco(x + 1, y + 2, 10, mez(hex('#1a1424'), K, 0.5)); R.disco(x, y, 10, K); R.disco(x, y, 9, on ? hex('#5a2a1a') : hex('#2a2430')); if (on) anillo(x, y, 12, t); }
  T.mano(R, cx - 42, cy + 8, 1, '#1c1c24', { sinManga: true }); bota(cx + 35, cy + 11);
  if (sel === 0) { anillo(cx - 9, cy + 2, 9, t); anillo(cx + 9, cy + 2, 9, t); } if (sel === 1) anillo(cx, cy + 20, 11, t);
};
const p6 = (t) => {
  T.carretera(R, t, { encuadre: 'moteros', camara: 'cerca' });
  const ICO = th(0.821), SK = th(0.94), PAT = SK + 0.3;
  const sel = t < th(0.865) ? 0 : t < th(0.9) ? 1 : t < SK - 0.02 ? 2 : 3;
  // la puerta se abre de golpe con la patada: dentro, la luz cálida del bar y dos clientes que se vuelven
  const ab = tramo(t, PAT + 0.05, PAT + 0.3);
  if (ab > 0) { const D = [133, 63, 187, 141];
    for (let y = D[1]; y <= D[3]; y++) for (let x = D[0]; x <= D[2]; x++) R.pset(x, y, mez(hex('#f0b03a'), hex('#6a3a1a'), (y - D[1]) / 90 + hh(x >> 1, y >> 1, 3) * 0.15));
    for (let x = D[0]; x <= D[2]; x += 9) R.rect(x, 118, x + 1, 141, hex('#4a2410')); R.rect(D[0], 116, D[2], 119, hex('#3a1a0a'));
    R.actor(EL.pirata, 140, 128, t, { dir: 1, sorpresa: true }); R.actor(EL.motero, 164, 128, t, { dir: -1, sorpresa: t < PAT + 1, sonrisa: t > PAT + 1, dedo: t > PAT + 1 });
    if (t > PAT + 0.4 && t < PAT + 1.2) R.bocadillo(171, 96, { icono: '!' });
    const w = Math.round(54 * (1 - ab * 0.82)); R.rect(D[2] - w, D[1] - 1, D[2], D[3], K); R.rect(D[2] - w + 1, D[1], D[2] - 1, D[3], hex('#6a3a1a')); for (let y = D[1] + 4; y < D[3]; y += 8) R.rect(D[2] - w + 1, y, D[2] - 1, y, hex('#4a2410'));
    // la luz que sale al porche y a la acera
    for (let y = 142; y < 180; y++) { const a = (y - 142) * 0.9; for (let x = Math.round(133 - a); x <= Math.round(187 + a); x++) if ((x + y) % 2 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#f0b03a'), 0.35 * (1 - (y - 142) / 40))); } }
  // el motero: llega de su moto, se para en el porche ante la puerta; mira, habla, aprieta el puño y da la patada
  const q = ruta(t, [[P6 + 0.1, 30, 168], [P6 + 1.2, 80, 166], [P6 + 1.9, 108, 151]], false);
  const patada = t > PAT - 0.05 && t < PAT + 0.4;
  R.actor(EL.motero, q.x, q.s, t, { dir: 1, anda: q.mv, sorpresa: sel === 0 && t > ICO, habla: sel === 1 && Math.sin(t * 10) > 0, enfado: sel >= 2 && t < PAT + 0.4, dedo: sel === 2 && t < SK, sonrisa: t > PAT + 0.5 });
  if (patada) { const k = tramo(t, PAT - 0.05, PAT + 0.08); R.linea(q.x + 10, q.s - 6, Math.round(q.x + 10 + 12 * k), q.s - 6 - Math.round(4 * k), K); R.linea(q.x + 10, q.s - 5, Math.round(q.x + 10 + 12 * k), q.s - 5 - Math.round(4 * k), hex('#2a3a5a')); bota(q.x + 14 + Math.round(10 * k), q.s - 12 - Math.round(4 * k));
    for (let k2 = 0; k2 < 8; k2++) { const a = k2 * 0.8; R.pset(Math.round(133 + Math.cos(a) * (4 + (t - PAT) * 40)), Math.round(140 + Math.sin(a) * (3 + (t - PAT) * 20)), hex('#fff0a0')); } }
  // el menú de la calavera: se abre en «icons»; el cursor recorre ojos, boca, puño y bota
  const e = tramo(t, ICO - 0.1, ICO + 0.25) * (1 - tramo(t, PAT + 0.1, PAT + 0.4));
  if (e > 0) { const cx = 236, cy = 88; calavera(cx, cy, e, sel, t);
    if (e > 0.9) { const tg = [[cx + 9, cy + 2], [cx, cy + 20], [cx - 36, cy + 12], [cx + 36, cy + 12]][sel]; cursorG(tg[0] + 7, tg[1] + 9, 'cruz', t, sel === 3 ? tramo(t, SK - 0.05, SK + 0.3) : 0, 1.5); } }
};
const efectos = [[0.6, 'lapiz'], [p(0.336), 'pop']
, [P2 + 0.2, 'papel'], [p(0.62), 'lapiz'], [p(0.88), 'whoosh'],
  [c(0.109), 'whoosh'], [c(0.39), 'brillo'], [c(0.765), 'bip'], [c(0.868), 'bip'], [c(0.922), 'bip'],
  [P5 + 0.2, 'motor'], [th(0.137), 'motor'], [th(0.821), 'pop'], [th(0.94), 'bip'], [th(0.94) + 0.4, 'puerta']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: (t) => (t < P3 ? 1990 : t < th(0.137) ? 1993 : 1995) });
''')
