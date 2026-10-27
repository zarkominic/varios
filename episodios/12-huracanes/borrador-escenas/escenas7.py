E = {}

# Lo común a las tres escenas del cierre (acto 7): utilidades, la gaviota del gancho, el WC-130J de la Fuerza Aérea, la
# escalerilla del P-3 y el avioncito visto desde arriba.
COMUN = r'''
const C = T.C, K = C.k;
const lin = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const suave = (u) => u * u * (3 - 2 * u);
const entre = (t, a, b) => t >= a && t < b;
const parp = (t, v = 7) => Math.sin(t * v) > 0;
const mezcla = (p, q, f) => { const r = p & 255, g = (p >> 8) & 255, bb = (p >> 16) & 255, r2 = q & 255, g2 = (q >> 8) & 255, b2 = (q >> 16) & 255;
  return (0xff000000 | (Math.round(bb + (b2 - bb) * f) << 16) | (Math.round(g + (g2 - g) * f) << 8) | Math.round(r + (r2 - r) * f)) >>> 0; };
const ruido = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const umbral = (x, y) => (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
// a ritmo lineal entre puntos [t, valor]
const tramos = (t, P) => { if (t <= P[0][0]) return P[0][1]; for (let i = 1; i < P.length; i++) if (t <= P[i][0]) return lerp(P[i - 1][1], P[i][1], (t - P[i - 1][0]) / (P[i][0] - P[i - 1][0])); return P[P.length - 1][1]; };
// tiñe un píxel hacia un color, con trama (a: cuánto)
const tine = (x, y, c, a) => { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, mezcla(R.pget(x, y), c, a)); };
// la zona de Atom y la de la barra del año quedan tranquilas
const tranquilo = (x, y) => (x >= 276 && y <= 46) || (x >= 18 && x <= 172 && y <= 15);
const PAL = {
  k: K, W: hex('#f4f4f0'), S: hex('#c4c8d2'), m: hex('#9aa4b4'), M: hex('#d8dee8'), A: hex('#f4cc60'), a: hex('#e0a030'), v: hex('#d8ecf6'),
  G: hex('#a2aab6'), L: hex('#cdd3dc'), g: hex('#6f7785'), w: hex('#2f3d58'), N: hex('#555d6b'), p: hex('#e2e6ec'), R: hex('#e83a3a'),
  P: hex('#f29ab8'), Q: hex('#d8628a'), Y: hex('#f6d860'), B: hex('#2a4a8a'),
};
// la gaviota del gancho, con contorno para que se vea contra las nubes: alas arriba, alas abajo; y posada (mira a la derecha)
const GAVIOTA = [
  ['k.......k', 'kmk...kmk', '.kWk.kWk.', '..kWWWkkk', '...kkk.A.'],
  ['...kkkkk.', '..kWWWkkk', '.kmWk.kA.', 'kmk......', 'k........'],
];
const POSADA = ['......kkk..', '.....kWWWk.', '.....kWkWAA', 'kk..kkWWWk.', 'kkkkmmmWWk.', '.kmmmmmWWk.', '..kkkkkkk..', '....A..A...'];
const gaviota = (x, y, pose, dir = 1) => R.dibujo(GAVIOTA[pose], Math.round(x) - 4, Math.round(y) - 2, dir, PAL);
// el WC-130J gris de los cazahuracanes de la Fuerza Aérea, de lejos (24 × 8, el morro a la derecha): ala alta, dos motores
// de este lado con su hélice borrosa, la deriva alta con la rampa que sube y la baliza roja; dir −1 lo voltea
const C130 = [
  '.kk.....................',
  '.kLk.......kkkkkkkk.....',
  '.kGLk..kkkkLLLLLLLLkk...',
  '.kGGLkkGGGGkNNkpkNNkpk..',
  'kkGGGGGGGGGGGGGGGGGGGwwk',
  '.kgGGGGGGGGGGGGGGGGGGGGk',
  '..kkgggggggGGGGgggggggk.',
  '....kkkkkkkkkkkkkkkkkk..',
];
const c130 = (x, y, dir, t, cl = null) => {
  const px = (X, Y, c) => { if (!cl || cl(X, Y)) R.pset(X, Y, c); };
  C130.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = PAL[f[i]]; if (c == null) continue; px(Math.round(x + (dir > 0 ? i : f.length - 1 - i)), Math.round(y + j), c); } });
  if ((t * 1.2) % 1 < 0.15) px(Math.round(x + (dir > 0 ? 12 : 11)), Math.round(y), PAL.R);   // la baliza
};
// el avioncito visto desde arriba (para el satélite): fuselaje, alas y cola, con su sombra; a: ángulo del morro
const avionArriba = (x, y, a, t) => {
  const ca = Math.cos(a), sa = Math.sin(a), q = (u, v) => [Math.round(x + u * ca - v * sa), Math.round(y + u * sa + v * ca)];
  for (const [dx, dy, c] of [[3, 3, hex('#2a2030')], [0, 0, null]]) {
    const col = c ?? C.blanco, P = (u, v, cc = col) => { const [X, Y] = q(u, v); R.pset(X + dx, Y + dy, c ?? cc); };
    for (let u = -4; u <= 4; u++) P(u, 0); for (let v = -5; v <= 5; v++) P(1, v, c ?? (Math.abs(v) > 3 ? hex('#c8ccd8') : C.blanco)); for (let v = -2; v <= 2; v++) P(-4, v);
    if (!c) { P(4, 0, hex('#2a4a8a')); P(0, 0, hex('#2a4a8a')); P(-1, 0, hex('#2a4a8a')); if ((t * 1.3) % 1 < 0.15) P(1, -5, hex('#e83a3a')); }
  }
};
// el personal de tierra de la NOAA: mono azul o chaleco naranja, con los cascos de protección de los oídos
const MONO = { C: hex('#3a5a8a'), c: hex('#2a4468'), W: hex('#3a5a8a'), F: hex('#2e4a74'), M: hex('#3a3e4a'), o: hex('#e8e4dc') };
const CHALECO = { C: hex('#f08a2a'), c: hex('#c8641a'), W: hex('#f08a2a'), F: hex('#3a3e4a'), M: hex('#3a3e4a'), o: hex('#f6d860') };
// la tableta en la mano (x, s: el suelo del personaje)
const tableta = (x, s, dir) => { const bx = dir > 0 ? x + 11 : x - 5; R.rect(bx, s - 13, bx + 5, s - 8, K); R.rect(bx + 1, s - 12, bx + 4, s - 9, hex('#4ab8e8')); R.pset(bx + 1, s - 12, C.blanco); };
// un destello de cuatro puntas (r: largo)
const destello = (x, y, r, c = C.blanco) => { for (let i = 1; i <= r; i++) { for (const [dx, dy] of [[i, 0], [-i, 0], [0, i], [0, -i]]) R.pset(x + dx, y + dy, i === r ? mezcla(c, C.blanco, 0.5) : c); } R.pset(x, y, C.blanco); };
'''

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-kermit'] = ('Kermit', '''// HU-KERMIT (frase 31), 2026. Cuatro planos:
// 1. el hangar de la NOAA en Lakeland: el P-3 «Kermit» espera en la plataforma con la escalerilla puesta; la tripulación
//    cruza con sus bolsas; en «the next one comes» la banda del huracán del fondo se oscurece y la tripulanta la señala;
//    sube la escalerilla y entra en «fly into it»; el tripulante sube detrás, en «Duckworth» una AT-6 amarilla pasa a lo
//    lejos hacia la tormenta y él se para a saludarla, y entra en «did»; las hélices empiezan a girar; dentro del hangar,
//    Miss Piggy en revisión con sus mecánicos;
// 2. (corta en «Because») la pista: Kermit corre por la pista a plano medio, levanta el morro y en «Kermit» despega
//    mientras la rana de la cola da su saltito (gag); el señalero de chaleco naranja le hace señas con las balizas y el
//    mecánico se tapa los oídos al paso de los motores; en «Miss Piggy», en el hangar del fondo, a la cara rosa de la cola
//    del otro P-3 le sale un corazoncito;
// 3. (corta en «along») dentro de Kermit, en la tormenta: sacudidas, relámpagos y lluvia en las ventanillas; la
//    tripulanta habla por el intercomunicador con los de la Fuerza Aérea y en «Air Force» el tripulante señala la
//    ventanilla, por la que pasa un WC-130J gris de lejos; en «Cross the eyewall again and again» las ventanillas pasan
//    de la tormenta a la pared y al ojo, las sacudidas paran y llega la luz; la tripulanta se levanta y carga una sonda en
//    el tubo;
// 4. (corta en «dropping») el ojo sobre el mar: Kermit cruza el ojo en calma y suelta la sonda por la panza; se abre el
//    paracaídas y baja, mandando sus datos en ondas («measure the storm»), hasta el mar, donde cae en «sea» con su
//    salpicadura; al fondo, el WC-130J cruza el ojo al revés y los pájaros dan vueltas.''', COMUN + r'''
const k = (f) => en('kermit', f);
// los cortes, en la palabra que toca (tiempos de cada palabra en build/largo/ep12/linea.json): «Because», «along», «dropping»
const P2 = k(0.2593), P3 = k(0.4843), P4 = k(0.7855);
const viene = k(0.0359), vuela = k(0.1087), dentroT = k(0.1359), duck = k(0.1908), hizo = k(0.2125);
const dos = k(0.2897), kermit = k(0.3870), miss = k(0.4305), piggy = k(0.4398);
const aire = k(0.5158), cazadores = k(0.5659), misisipi = k(0.6148);
const cruza = k(0.6746), pared = k(0.7083), otra = k(0.7164), otra2 = k(0.7420);
const instrumentos = k(0.8050), mide = k(0.8507), tormentaT = k(0.8800), abajo = k(0.9442), mar = k(0.9746);

// ── 1 · el hangar: la tripulación sube a Kermit ──────────────────────────────────────────────────────────────────────
// la escalerilla de aluminio con ruedas: de (94, 159) abajo a la plataforma de arriba (108–116, 146), junto a la puerta
const EX0 = 94, EY0 = 159, EX1 = 112, EY1 = 146;
const escY = (fx) => Math.round(lerp(EY0, EY1, Math.max(0, Math.min(1, (fx - EX0) / (EX1 - EX0)))));
const escalerilla = (delante) => {
  const M = C.metalL, MD = C.metalD, MS = hex('#8a94a4');
  if (!delante) {
    // el bastidor de detrás, los peldaños, la plataforma y las ruedas
    R.linea(EX0 + 2, EY0 - 1, EX1 + 2, EY1 - 1, MD); R.linea(EX0 + 4, EY0, EX1 + 4, EY1 + 2, MS);
    for (let f = 0; f <= 1; f += 1 / 7) { const x = Math.round(lerp(EX0, EX1, f)), y = Math.round(lerp(EY0, EY1, f)); R.rect(x, y, x + 3, y, M); R.pset(x, y + 1, MD); }
    R.rect(EX1 - 2, EY1, EX1 + 5, EY1, M); R.rect(EX1 - 2, EY1 + 1, EX1 + 5, EY1 + 1, MD);
    for (const x of [EX1 - 1, EX1 + 4]) R.linea(x, EY1 + 2, x, EY0, MS);
    R.linea(EX0 + 6, EY0, EX1 + 4, EY1 + 3, MS);
    for (const x of [EX0 + 1, EX1 + 3]) { R.disco(x, EY0, 1.6, K); R.pset(x, EY0, MS); }
  } else {
    // la barandilla de este lado, por delante de quien sube
    R.linea(EX0 - 1, EY0 - 9, EX1 - 1, EY1 - 10, K); R.linea(EX0 - 1, EY0 - 10, EX1 - 1, EY1 - 11, M);
    R.rect(EX1 - 1, EY1 - 11, EX1 + 5, EY1 - 11, M); R.rect(EX1 - 1, EY1 - 10, EX1 + 5, EY1 - 10, K);
    for (const f of [0, 0.5, 1]) { const x = Math.round(lerp(EX0 - 1, EX1 - 1, f)), y0 = Math.round(lerp(EY0 - 9, EY1 - 10, f)), y1 = Math.round(lerp(EY0, EY1, f)); R.linea(x, y0, x, y1, MD); }
    R.linea(EX1 + 5, EY1 - 11, EX1 + 5, EY1, MD);
  }
};
// la puerta del P-3 abierta (x 117–122, y 137–146), con la luz de dentro
const puerta = (t) => { R.rect(117, 137, 123, 146, K); R.rect(118, 138, 122, 145, hex('#f2d8a0')); R.rect(118, 138, 122, 139, hex('#fff2cc')); R.rect(121, 138, 122, 145, hex('#d8b47a')); };
// dónde va un tripulante: anda hasta el pie de la escalerilla (x0 → 87 entre t0 y t1), sube hasta arriba (t1 → t2), se
// queda en la plataforma y entra (te → te + 0,35): un paso a la puerta y se mete, por detrás del fuselaje
const camino = (t, x0, t0, t1, t2, te) => {
  if (t < t1) { const u = lin(t, t0, t1); return { x: Math.round(lerp(x0, 87, u)), s: 160, anda: u > 0 && u < 1, fase: 'suelo' }; }
  if (t < t2) { const x = Math.round(lerp(87, 105, lin(t, t1, t2))); return { x, s: escY(x + 7) + 1, anda: true, fase: 'sube' }; }
  if (t < te) return { x: 105, s: EY1 + 1, anda: false, fase: 'arriba' };
  const u = lin(t, te, te + 0.35); return { x: 105 + Math.round(u * 5), s: EY1 + 1 + Math.round(suave(u) * 28), anda: u < 1, fase: u < 1 ? 'entra' : 'dentro' };
};
// lo que lleva cada uno: la caja verde de las sondas (ella) y la bolsa azul del casco (él)
const caja = (x, s, dir) => { const bx = dir > 0 ? x + 11 : x - 6; R.rect(bx, s - 11, bx + 6, s - 6, K); R.rect(bx + 1, s - 10, bx + 5, s - 7, hex('#5e7a4a')); R.rect(bx + 1, s - 10, bx + 5, s - 10, hex('#7e9a64')); R.pset(bx + 3, s - 8, hex('#e8b830')); };
const bolsa = (x, s, dir) => { const bx = dir > 0 ? x + 11 : x - 6; R.rect(bx, s - 12, bx + 6, s - 6, K); R.rect(bx + 1, s - 11, bx + 5, s - 7, hex('#2a4a7a')); R.disco(bx + 3, s - 10, 1.5, hex('#e8e4dc')); };
const TA = { x0: 26, t0: 0.2, t1: 2.35, t2: 3.2, te: vuela + 0.05 };          // la tripulanta
const TB = { x0: -16, t0: 0.9, t1: 3.85, t2: 4.6, te: hizo - 0.02 };          // el tripulante
const p1 = (t) => {
  const tor = Math.round((0.45 + 0.3 * suave(lin(t, viene - 0.5, viene + 0.6))) * 20) / 20;
  T.aeropuertoHoy(R, t, { encuadre: 'hangar', tormenta: tor });
  // a lo lejos, en «Duckworth», una AT-6 amarilla sale de detrás del hangar y se va hacia la tormenta por encima de la
  // torre (la antena le queda delante) hasta meterse en las nubes
  { const u = lin(t, duck - 0.3, duck + 1.3);
    if (u > 0 && u < 1) { const g = []; for (let y = 34; y <= 50; y++) for (let x = 243; x <= 253; x++) g.push(R.pget(x, y));
      const cl = [227, 0, 275, 100]; R.recorte(cl); T.at6(R, Math.round(lerp(229, 262, u)), Math.round(lerp(41, 47, u)), t, { s: 0.55, dir: 1, vuelo: true, helice: 1, recorte: cl }); R.recorte(null);
      let n = 0; for (let y = 34; y <= 50; y++) for (let x = 243; x <= 253; x++) { const v = g[n++]; if ((v & 255) + ((v >> 8) & 255) + ((v >> 16) & 255) < 300) R.pset(x, y, v); } }
    else if (u >= 1 && t < duck + 1.8) { const f = lin(t, duck + 1.3, duck + 1.8), x = 268 + Math.round(f * 3), y = 44; if (umbral(x, y) > f) { R.rect(x, y, x + 2, y, C.at6); R.pset(x + 1, y + 1, C.at6S); } } }
  const a = camino(t, TA.x0, TA.t0, TA.t1, TA.t2, TA.te), b = camino(t, TB.x0, TB.t0, TB.t1, TB.t2, TB.te);
  // quien entra en el avión se pinta por detrás del fuselaje y se hunde en él
  const tras = (p, def) => { if (p.fase !== 'entra') return; R.recorte([0, 0, 319, 148]); R.actor(def, p.x, p.s, t, { dir: 1, anda: true }); R.recorte(null); };
  tras(a, EL.tripulanta); tras(b, EL.tripulante);
  // Kermit en la plataforma: las hélices arrancan cuando ya han subido los dos
  T.p3(R, 150, 160, t, { s: 2, dir: 1, helice: 0.32 * lin(t, hizo + 0.2, P2) });
  puerta(t);
  escalerilla(false);
  // la tripulanta: en «comes» señala la tormenta; sube y entra en «fly into it»
  if (a.fase !== 'entra' && a.fase !== 'dentro') { R.actor(EL.tripulanta, a.x, a.s, t, { dir: 1, anda: a.anda, dedo: entre(t, viene - 0.1, viene + 0.6), sonrisa: t > viene + 0.7 }); caja(a.x, a.s, 1); }
  // el tripulante: sube detrás; arriba, en «Duckworth», se vuelve a mirar la AT-6 y la saluda; entra en «did»
  if (b.fase !== 'entra' && b.fase !== 'dentro') { const saluda = entre(t, duck - 0.15, hizo - 0.1); R.actor(EL.tripulante, b.x, b.s, t, { dir: 1, anda: b.anda, dedo: saluda, sonrisa: saluda, habla: entre(t, 1.6, 2.4) && parp(t, 8) }); if (!saluda) bolsa(b.x, b.s, 1); }
  escalerilla(true);
  // el mecánico del morro: repasa la lista en la tableta, en «did» levanta el pulgar a la cabina y se aparta de las hélices
  { const va = lin(t, hizo + 0.35, P2 - 0.05), mx = Math.round(lerp(214, 236, va)), pulgar = entre(t, hizo - 0.05, hizo + 0.4);
    R.actor(EL.oficinista, mx, 168, t, { dir: va > 0 && va < 1 ? 1 : -1, anda: va > 0 && va < 1, dedo: pulgar || (t < duck && Math.floor(t * 1.3) % 3 === 0), sonrisa: pulgar, tocado: 'auriculares', pal: MONO });
    if (!pulgar) tableta(mx, 168, va > 0 && va < 1 ? 1 : -1); }
};

// ── 2 · la pista: Kermit despega; la rana da su saltito ──────────────────────────────────────────────────────────────
const S2 = 2, L2 = 60 * S2, TR = 1.95, TL = 2.45;   // escala; empieza a rotar y se va al aire (s desde el corte)
const kx = (q) => 34 + 30 * q + 8.5 * q * q;
const sombraP3 = (x, h) => { const f = Math.max(0, 1 - h / 70), rx = 0.46 * L2 * (0.75 + 0.25 * f), ry = 3;
  if (f <= 0) return; for (let j = -ry; j <= ry; j++) for (let i = -Math.ceil(rx); i <= rx; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2, X = Math.round(x + h * 0.35 + i), Y = 150 + j; if (d < 1 && umbral(X, Y) < (0.75 - d * 0.4) * f) R.pset(X, Y, mezcla(R.pget(X, Y), K, 0.38)); } };
// las balizas naranjas del señalero, en las manos levantadas
const balizas = (x, s, t, arriba) => { const yH = s - 25; for (const [hx, ph] of [[x - 2, 0], [x + 16, 1.6]]) { const a = arriba ? Math.sin(t * 9 + ph) * 0.6 : 0, X = hx, Y = yH + 1; R.linea(X, Y, Math.round(X + Math.sin(a) * 5), Math.round(Y - Math.cos(a) * 5), hex('#f07a1a')); R.pset(Math.round(X + Math.sin(a) * 5), Math.round(Y - Math.cos(a) * 5), hex('#ffd060')); } };
const CORAZON = ['.kk.kk.', 'kPPkPPk', 'kPPPPPk', '.kPPPk.', '..kPk..', '...k...'];
const p2 = (t) => {
  T.aeropuertoHoy(R, t, { encuadre: 'pista' });
  // en el hangar del fondo, el otro P-3 en revisión: la cara rosa de Miss Piggy en su cola y, en «Miss Piggy», un corazoncito
  { const fx = 57, fy = 97; R.rect(fx - 1, fy - 1, fx + 1, fy + 1, PAL.P); R.pset(fx, fy + 1, PAL.Q); R.rect(fx - 1, fy - 2, fx + 1, fy - 2, PAL.Y);
    const u = lin(t, miss - 0.05, piggy + 0.9); if (u > 0 && u < 1) { R.dibujo(CORAZON, fx - 3 + Math.round(Math.sin(u * 9) * 1.5), Math.round(fy - 9 - u * 12), 1, PAL); if (u < 0.3) destello(fx, fy - 4, 3); } }
  // Kermit corre, rota y se va al aire; la rana salta en «Kermit»
  const q = t - P2, x = kx(q), inc = 0.13 * suave(lin(q, TR, TL)), salto = lin(t, kermit - 0.05, kermit + 0.75);
  const o = { s: S2, dir: 1, helice: 1, inclina: inc, salto: salto > 0 && salto < 1 ? salto : 0 };
  if (q < TL) T.p3(R, x, 150, t, o);
  else { const h = 6 * (q - TL) + 9 * (q - TL) ** 2; sombraP3(x - 2.1, h); T.p3(R, x - 2.1, 150 - 15.6 - h, t, { ...o, vuelo: true, tren: 1 - lin(q, TL + 0.5, TL + 1.1) }); }
  // el señalero de chaleco naranja: balizas arriba mientras pasa; en el despegue, los brazos arriba de alegría
  const sx = 26, ss = 177, alegre = t > P2 + TL + 0.1;
  R.actor(EL.chico, sx, ss, t, { dir: 1, tocado: 'auriculares', brazos: t < P2 + TL - 0.4 || (alegre && t < P2 + TL + 0.9), dedo: entre(t, P2 + TL - 0.4, P2 + TL + 0.1), sonrisa: alegre || t > P2 + TL - 0.4, pal: CHALECO });
  if (t < P2 + TL - 0.4 || (alegre && t < P2 + TL + 0.9)) balizas(sx, ss, t, true);
  // el mecánico de la derecha se tapa los oídos cuando pasan los motores y luego saluda
  const tapa = entre(t, P2 + 2.3, P2 + 3.5), adios = t > P2 + 3.6;
  R.actor(EL.tecnico, 252, 176, t, { dir: -1, brazos: tapa, dedo: adios && Math.floor(t * 5) % 2 === 0, sorpresa: tapa, sonrisa: adios, tocado: 'auriculares', pal: MONO });
};

// ── 3 · dentro de Kermit: la tormenta, el C-130 por la ventanilla y la pared del ojo ─────────────────────────────────
const fu = (t) => suave(lin(t, cruza - 0.05, otra2 + 0.2));
const sacT = (t) => 0.85 - 0.75 * lin(t, cruza, otra2 + 0.3);
const levanta = otra2 - 0.35, enTubo = levanta + 0.55, sondaU = (t) => 0.4 * lin(t, enTubo + 0.05, P4 - 0.05);
const p3 = (t) => {
  const s = sacT(t), [dx, dy] = T.h_sacudida(t, s);
  T.p3Dentro(R, t, { fuera: fu(t), sacudida: s, sonda: sondaU(t) });
  // por la ventanilla de x 86 pasa, de lejos, el WC-130J gris de la Fuerza Aérea (vuela a la izquierda, como nosotros)
  { const u = lin(t, aire - 0.15, misisipi + 0.3); if (u > 0 && u < 1) { const wx = 86 + dx, wy = 49 + dy, cx = Math.round(lerp(wx - 30, wx + 8, u)), cy = wy - 2 + Math.round(Math.sin(t * 2.1) * 1.2);
      const dentro = (X, Y) => ((X - wx) / 8.2) ** 2 + ((Y - wy) / 10.8) ** 2 <= 1;
      c130(cx, cy, -1, t, dentro);
      // la bruma de la tormenta por delante: jirones que lo velan a ratos
      for (let j = -10; j <= 10; j++) for (let i = -8; i <= 8; i++) { const X = wx + i, Y = wy + j; if (!dentro(X, Y)) continue; const v = 0.5 + 0.5 * Math.sin((X - t * 150) * 0.09 + Y * 0.3); if (umbral(X, Y) < v * 0.35) tine(X, Y, hex('#7a8498'), 0.45); } } }
  // el tripulante, sentado al radar: en «Air Force» señala la ventanilla; en la pared, el susto; en el ojo, sonríe
  R.actor(EL.tripulante, 12 + dx, 145 + dy, t, { dir: 1, quieto: true, dedo: entre(t, aire + 0.05, cazadores + 0.6), sorpresa: entre(t, cruza, pared + 0.2), sonrisa: t > otra || entre(t, cazadores + 0.6, misisipi + 0.5), habla: entre(t, misisipi + 0.4, cruza - 0.2) && parp(t, 8) });
  // la tripulanta: habla por el intercomunicador con la Fuerza Aérea; en el ojo se levanta y carga una sonda en el tubo
  if (t < levanta) R.actor(EL.tripulanta, 162 + dx, 145 + dy, t, { dir: 1, quieto: true, habla: entre(t, P3 + 0.15, misisipi + 0.3) && parp(t, 8), dedo: entre(t, P3 + 0.1, misisipi + 0.3), sorpresa: entre(t, cruza + 0.1, pared + 0.3) });
  else { const u = lin(t, levanta + 0.15, enTubo), x = Math.round(lerp(150, 116, u)); R.actor(EL.tripulanta, x, 152 + dy, t, { dir: u < 1 ? -1 : 1, anda: u > 0 && u < 1, dedo: t > enTubo, sonrisa: t > enTubo + 0.3 }); }
};

// ── 4 · el ojo sobre el mar: la sonda cae hasta el mar ───────────────────────────────────────────────────────────────
const S4 = 1.6, L4 = 60 * S4, suelta = P4 + 0.12, cae = mar + 0.02, MARY = 152;
const kx4 = (t) => lerp(92, 200, lin(t, P4, P4 + 4.8)), ky4 = (t) => 80 + Math.sin(t * 1.3) * 1.5;
const sondaPos = (t) => { const q = t - suelta, x0 = kx4(suelta) - 0.1 * L4, y0 = ky4(suelta) + 0.06 * L4, vy = (MARY - y0 - 4.8) / (cae - suelta - 0.4);
  return [x0 + 9 * (1 - Math.exp(-q / 0.45)), q < 0.4 ? y0 + 30 * q * q : y0 + 4.8 + vy * (q - 0.4)]; };
const p4 = (t) => {
  T.ojo(R, t, { suelo: 'mar' });
  // al fondo, el C-130 de la Fuerza Aérea cruza el ojo hacia el otro lado
  c130(Math.round(lerp(250, 30, lin(t, P4, P4 + 5.4))), 46 + Math.round(Math.sin(t * 1.1)), -1, t);
  // la sonda: cae por la panza, abre el paracaídas y baja mandando datos hasta el mar
  if (t > suelta && t < cae) { const [x, y] = sondaPos(t), q = t - suelta;
    T.h_dropsonda(R, x, y, t, 1.7, lin(q, 0.3, 0.65));
    // los datos que manda: ondas que salen hacia el avión, de tres en tres
    if (t > mide - 0.3) { const [ax, ay] = [kx4(t) - 0.1 * L4, ky4(t) + 0.06 * L4], dirA = Math.atan2(ay - (y - 14), ax - x);
      for (let k2 = 0; k2 < 3; k2++) { const w = ((t - mide + 0.3) * 1.5 - k2 * 0.33); if (w < 0) continue; const f = w % 1, r = 4 + f * 14;
        for (let a = -0.55; a <= 0.55; a += 0.07) { const X = Math.round(x + Math.cos(dirA + a) * r), Y = Math.round(y - 14 + Math.sin(dirA + a) * r); if (umbral(X, Y) < 1 - f * 0.9) { R.pset(X, Y, hex('#1e6ad0')); R.pset(X, Y + 1, mezcla(R.pget(X, Y + 1), hex('#0e2a6a'), 0.4)); } } } } }
  // la salpicadura en «sea»: gotas que saltan y anillos que se abren en el agua
  if (t >= cae) { const [x] = sondaPos(cae), q = t - cae, X = Math.round(x);
    if (q < 0.45) for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * 0.33, d = q * 34; R.pset(Math.round(X + Math.cos(a) * d * 0.8), Math.round(MARY + Math.sin(a) * d + 40 * q * q), i % 2 ? C.blanco : hex('#bfe6fb')); }
    for (let r2 = 0; r2 < 2; r2++) { const w = q * 0.9 - r2 * 0.3; if (w <= 0 || w > 1) continue; const rx = 3 + w * 16, ry = rx * 0.28; for (let a = 0; a < 6.28; a += 0.08) { const px = Math.round(X + Math.cos(a) * rx), py = Math.round(MARY + 2 + Math.sin(a) * ry); if (umbral(px, py) < 1 - w) R.pset(px, py, C.blanco); } }
    if (q < 0.6) { R.rect(X - 4, MARY + 1, X + 4, MARY + 1, hex('#f07a2a')); R.pset(X - 4, MARY, hex('#f07a2a')); } }
  // Kermit cruza el ojo en calma, despacio
  T.p3(R, kx4(t), ky4(t), t, { s: S4, dir: 1, vuelo: true, sacude: 0.05, salto: entre(t, P4 + 3.4, P4 + 4.2) ? (t - P4 - 3.4) / 0.8 : 0 });
};
const efectos = [
  [viene, 'trueno'], [TA.t1 + 0.2, 'golpecito'], [TA.t1 + 0.6, 'golpecito'], [TA.te + 0.1, 'toc'],
  [TB.t1 + 0.2, 'golpecito'], [TB.te + 0.15, 'cerrojo'], [hizo + 0.35, 'motor', { dur: 0.9 }],
  [P2 + 0.3, 'motor', { dur: 2.0 }], [kermit - 0.02, 'boing'], [P2 + TL, 'whoosh'], [miss + 0.05, 'pop'],
  [aire, 'bip'], [11.1, 'trueno'], [misisipi + 0.1, 'bip'], [cruza, 'rafaga'], [pared, 'whoosh'], [otra2, 'tic'], [enTubo + 0.1, 'interruptor'],
  [suelta, 'vapor'], [suelta + 0.4, 'pop'], [mide, 'bip'], [tormentaT + 0.35, 'bip'], [abajo, 'bip'], [cae, 'chof'],
];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-curiosidad'] = ('Curiosidad', '''// HU-CURIOSIDAD (frase 32), 1943 → 2026. Tres planos:
// 1. al atardecer, entre las nubes: la AT-6 amarilla de 1943 (Duckworth y el navegante) y el P-3 de hoy vuelan juntos;
//    en «Thanks to them» el P-3 alabea para saludar y la AT-6 le contesta; en «more than eighty years» la barra del año
//    corre de 1943 a 2026 y el «83» cuenta hasta su cifra; la gaviota del gancho vuelve, aletea junto a la avioneta y en
//    «began» se posa otra vez en su lomo (gag); en «bet or no bet» aparece en el aire la copa de la leyenda con su «?», que
//    se queda ahí, y la gaviota la mira y ahueca las alas;
// 2. (corta en «with») el Centro Nacional de Huracanes: en la pared cuelga la foto de la AT-6 de 1943; en «one flight
//    over Texas» la pronosticadora la señala y brilla; en «we now see hurricanes coming» el pronosticador se vuelve a la
//    pantalla grande, donde el cono se dibuja hacia la costa, y en «days» salta el «5» de los cinco días; en «arrive» la
//    pronosticadora va hacia la pantalla y asiente;
// 3. (corta en «And the calm») el corte del huracán: el aire sube por las paredes y en «the calm in the eye» una parte
//    se desvía hacia dentro; en «mystery» aparece un «?» en la columna del ojo; en «physics» el aire baja por el centro
//    calentándose (del azul al rojo) y sube el termómetro; en «explain» el «?» se vuelve «!»; abajo, sobre el mar en calma,
//    un P-3 pequeño cruza el ojo de pared a pared.''', COMUN + r'''
const c = (f) => en('curiosidad', f);
// los cortes: «with», «And (the calm)»
const P2 = c(0.3741), P3 = c(0.7158);
const ellos = c(0.029), mas = c(0.0948), ochenta = c(0.1146), curios = c(0.1646), empezo = c(0.2265);
const apuesta = c(0.2904), noAp = c(0.3128);
const uno = c(0.3833), texas = c(0.4294);
const vemos = c(0.5137), llegar = c(0.5584), dias = c(0.5874), llegan = c(0.652);
const calma = c(0.7303), ojoT = c(0.7632), misterio = c(0.8436), fisica = c(0.9094), explicar = c(0.9529);

// ── 1 · la AT-6 de 1943 y el P-3 de hoy, juntos ──────────────────────────────────────────────────────────────────────
const VASO = ['kk.......kk', 'kv.......k.', 'kv.......k.', 'kvAAWWAAAk.', 'kAAAWWAaAk.', 'kAaAAAAAak.', 'kaaaaaaaak.', '.kkkkkkkk..'];
const cuenta = (t) => Math.round(83 * suave(lin(t, ochenta, curios + 0.5)));
const posa = empezo - 0.05;
const p1 = (t) => {
  T.cieloVuelo(R, t, { hora: 'tarde' });
  // el P-3 alabea en «Thanks to them»; la AT-6 contesta
  const al1 = lin(t, 0.45, 0.7) * (1 - lin(t, 1.25, 1.55)), al2 = lin(t, 1.3, 1.5) * (1 - lin(t, 2.1, 2.4));
  const px = 132 + Math.round(Math.sin(t * 0.6) * 2), py = 110 + Math.round(Math.sin(t * 1.2) * 1.5);
  T.p3(R, px, py, t, { s: 1.4, dir: 1, vuelo: true, sacude: 0.08, inclina: 0.07 * Math.sin(t * 7) * al1 });
  const ax = 196 + Math.round(Math.sin(t * 0.5 + 2) * 2), ay = 70 + Math.round(Math.sin(t * 1.3 + 1) * 1.5);
  T.at6(R, ax, ay, t, { s: 1.2, dir: 1, vuelo: true, helice: 1, piloto: EL.duckworth, copiloto: EL.navegante, inclina: 0.08 * Math.sin(t * 7) * al2 });
  // la gaviota: llega aleteando y se posa en el lomo de la avioneta, detrás de la cubierta (como en el gancho)
  const wx = ax - 22, wy = ay - 15, llega = lin(t, 1.5, posa);
  if (t > 1.5) {
    if (llega < 1) { const gx = lerp(306, wx, suave(llega)) + 8 * Math.sin(llega * 6) * (1 - llega), gy = lerp(96, wy, suave(llega)) - 12 * Math.sin(llega * Math.PI); gaviota(gx, gy, parp(t, 14) ? 0 : 1, -1); }
    else { const rebote = entre(t, posa, posa + 0.2) ? 1 : 0, ahueca = entre(t, noAp, noAp + 0.5) && parp(t, 18), mira = t > apuesta - 0.1 ? -1 : 1;
      if (ahueca) gaviota(wx, wy - 4, 0, mira); else R.dibujo(POSADA, wx - 5, wy - 7 - rebote, mira, PAL); }
  }
  // «83»: los años de curiosidad, que cuentan mientras la barra del año corre de 1943 a 2026
  if (t > ochenta - 0.1) { const n = cuenta(t), e = lin(t, ochenta - 0.1, ochenta + 0.2); R.numero(String(n), 74, Math.round(lerp(66, 58, e)), { tam: 16, centro: true }); if (n === 83 && t < curios + 1.2) destello(96, 40, 3, hex('#ffe08a')); }
  // la copa de la leyenda, con su «?», que se queda en el aire (con apuesta o sin ella)
  if (t > apuesta - 0.05) { const e = suave(lin(t, apuesta - 0.05, apuesta + 0.3)), tiembla = entre(t, noAp, noAp + 0.5) ? Math.round(Math.sin(t * 40)) : 0, x = 122 + tiembla, y = Math.round(lerp(90, 76, e) + Math.sin(t * 2.2) * 1.5);
    R.dibujo(VASO, x - 5, y, 1, PAL); if (e > 0.6) R.bocadillo(x, y - 4, { icono: '?' }); if (e < 0.6) destello(x, y - 2, 3); }
};

// ── 2 · el Centro Nacional de Huracanes: la foto de 1943 y el cono de cinco días ────────────────────────────────────
// la foto enmarcada de la AT-6 de 1943 en la pared (encima del cuadro del decorado, x 4–36, y 76–104)
const foto = (t) => {
  R.rect(4, 76, 36, 104, hex('#3a2418')); R.rect(5, 77, 35, 103, hex('#8a5a2a')); R.rect(5, 77, 35, 77, hex('#b07a3a')); R.rect(7, 79, 33, 101, hex('#efe6d0'));
  const cl = [9, 81, 31, 99];
  for (let y = 81; y <= 99; y++) for (let x = 9; x <= 31; x++) R.pset(x, y, y < 92 ? (y + umbral(x, y) * 4 < 87 ? hex('#a8c0d0') : hex('#c4d4dc')) : (umbral(x, y) < 0.5 ? hex('#b8a878') : hex('#a89868')));
  for (const [cx, cy, r] of [[27, 86, 4], [30, 89, 3], [24, 89, 3]]) R.disco(cx, cy, r, hex('#6a7080'));
  R.recorte(cl); T.at6(R, 19, 91, t, { s: 0.55, dir: 1, vuelo: true, helice: 0.5, recorte: cl }); R.recorte(null);
  for (let y = 81; y <= 99; y++) for (let x = 9; x <= 31; x++) if (umbral(x, y) < 0.25) tine(x, y, hex('#d8c8a0'), 0.35);   // el tono de foto antigua
};
const p2 = (t) => {
  T.centroHuracanes(R, t, { pantalla: 'isaias', crece: 1, cono: suave(lin(t, vemos - 0.1, llegan - 0.2)) });
  foto(t);
  if (entre(t, texas - 0.05, texas + 0.6)) { destello(33, 79, 3, hex('#ffe08a')); if (t > texas + 0.2) destello(8, 100, 2, hex('#ffe08a')); }
  // en «days», el «5» de los cinco días salta junto al cono
  if (t > dias - 0.05) { const e = lin(t, dias - 0.05, dias + 0.25), y = Math.round(lerp(76, 66, suave(e)) + (e >= 1 ? 0 : -Math.sin(e * Math.PI) * 3)); R.numero('5', 190, y, { tam: 16, centro: true }); }
  // la pronosticadora: señala la foto en «one flight over Texas»; luego va hacia la pantalla y asiente en «arrive»
  const va = lin(t, vemos + 0.1, vemos + 1.2), x1 = Math.round(lerp(54, 96, va));
  R.actor(EL.pronosticadora, x1, 163, t, { dir: va > 0 ? 1 : -1, anda: va > 0 && va < 1, dedo: entre(t, uno - 0.1, texas + 0.6), sonrisa: entre(t, texas, vemos) || t > llegan, habla: entre(t, P2 + 0.1, uno - 0.1) && parp(t, 8) });
  // el pronosticador: la mira, se vuelve a la pantalla en «we now see» y señala el cono mientras se dibuja
  R.actor(EL.pronosticador, 150, 162, t, { dir: t < vemos - 0.2 ? -1 : 1, dedo: entre(t, vemos, llegan + 0.3), sorpresa: entre(t, texas, texas + 0.4), sonrisa: t > llegan + 0.3, habla: entre(t, llegar, dias + 0.4) && parp(t, 8) });
};

// ── 3 · el corte: la calma del ojo es física ─────────────────────────────────────────────────────────────────────────
const corteU = (t) => tramos(t, [[P3, 0.42], [calma, 0.46], [ojoT + 0.3, 0.56], [fisica - 0.1, 0.57], [explicar + 0.25, 0.85], [P3 + 6, 0.9]]);
const p3 = (t) => {
  T.ojo(R, t, { vista: 'corte', corte: corteU(t) });
  // un P-3 pequeño cruza el ojo, de pared a pared, sobre el mar en calma
  { const x = Math.round(lerp(104, 232, lin(t, P3, P3 + 5.2))), y = 136 + Math.round(Math.sin(t * 1.4)); R.recorte([123, 0, 197, 179]); T.p3(R, x, y, t, { s: 0.5, dir: 1, vuelo: true }); R.recorte(null); }
  // el «?» en la columna del ojo («mystery») que en «explain» se vuelve «!»
  if (t > misterio - 0.05) { const e = lin(t, misterio - 0.05, misterio + 0.2), y = Math.round(84 + Math.sin(t * 2.4) * 1.5 + (1 - e) * 6);
    if (t < explicar) R.numero('?', 161, y + 16, { tam: 16, centro: true, color: hex('#eef4ff') });
    else { R.numero('!', 161, y + 16, { tam: 16, centro: true }); const b = lin(t, explicar, explicar + 0.5); if (b < 1) for (let k2 = 0; k2 < 8; k2++) { const a = k2 * Math.PI / 4, r = 12 + b * 12; R.pset(Math.round(160 + Math.cos(a) * r), Math.round(y + 8 + Math.sin(a) * r), hex('#ffe08a')); } } }
};
const año = (t) => (t < ochenta ? 1943 : t < curios + 0.5 ? Math.round(lerp(1943, 2026, suave(lin(t, ochenta, curios + 0.5)))) : 2026);
const efectos = [
  [0.5, 'whoosh'], [1.35, 'whoosh'], [ochenta + 0.05, 'tic'], [ochenta + 0.35, 'tic'], [ochenta + 0.65, 'tic'], [ochenta + 0.95, 'tic'], [curios + 0.5, 'brillo'], [posa, 'tic'], [apuesta, 'pop'], [noAp + 0.05, 'golpecito'],
  [P2 + 0.1, 'tecleo', { dur: 1.2 }], [texas, 'brillo'], [vemos, 'bip'], [dias, 'pop'], [llegan, 'bip'],
  [P3 + 0.05, 'whoosh'], [ojoT, 'whoosh'], [misterio, 'pop'], [fisica, 'vapor'], [explicar, 'brillo'],
];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')

# ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
E['hu-adios'] = ('Adiós', '''// HU-ADIOS (frase 33), 2026. Un plano: el huracán desde arriba al atardecer, en calma, que gira despacio mientras la cámara
// se acerca un poco; un avioncito (el P-3, visto desde arriba) llega volando hacia el ojo para entrar otra vez y, en
// «explain next?», sube del ojo un «?» suave que late. Atom, arriba a la derecha.''', COMUN + r'''
const a = (f) => en('adios', f);
const explica = a(0.417), siguiente = a(0.592);
const plano = (t) => {
  const zoom = 1.35 + 0.3 * suave(lin(t, 0, E.duracion)), o = { vista: 'arriba', tarde: true, zoom };
  T.ojo(R, t, o);
  const G = T.b_ojoArribaGeo(o);
  // el avioncito: llega desde abajo a la izquierda y vira hacia el ojo
  { const u = lin(t, 0, E.duracion + 0.4), x = lerp(70, G.x - G.r * 1.25, suave(u)), y = lerp(166, G.y + G.r * 0.9, suave(u)), an = Math.atan2(G.y - y, G.x - x); avionArriba(Math.round(x), Math.round(y), an, t); }
  // el «?» que sube del ojo, suave (tramado al aparecer), y late
  if (t > siguiente - 0.15) { const e = lin(t, siguiente - 0.15, siguiente + 0.45), y = Math.round(G.y - 10 - e * 4 + Math.sin(t * 3) * 1), x = Math.round(G.x - 5);
    const antes = []; for (let j = 0; j < 24; j++) for (let i = 0; i < 22; i++) antes.push(R.pget(x - 6 + i, y - 4 + j));
    R.numero('?', x + 5, y + 16, { tam: 16, centro: true, color: hex('#fff2d0') });
    let n = 0; for (let j = 0; j < 24; j++) for (let i = 0; i < 22; i++) { const X = x - 6 + i, Y = y - 4 + j, v = antes[n++]; if (umbral(X, Y) > e) R.pset(X, Y, v); } }
};
const efectos = [[0.3, 'whoosh'], [siguiente, 'brillo']];
T.rodar(E, R, [[0, plano]], { efectos, año: 2026 });
''')
