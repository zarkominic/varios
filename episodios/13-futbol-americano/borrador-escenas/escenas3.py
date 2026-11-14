E = {}

E['fa-bruto'] = ('El juego bruto', '''// FA-BRUTO (frases 7–8), 1905, cartela «1905». Seis planos:
// 1. «…go back to 1905»: el campo embarrado de una universidad del este (campo1905 'general'); la cuña de once empuja a
//    los siete de azul y choca en «1905» (salta el barro); el aguador corre por la banda con su cubo y se para a mirar,
//    el entrenador grita con el megáfono de cartón y el fotógrafo dispara el magnesio en el choque;
// 2. corta en «When»: desde la banda (campo1905 'banda'), el árbitro pita el final de la jugada; dos compañeros llevan a
//    uno que cojea hacia el banco, otro de azul se frota la cabeza y se va renqueando; en «badly hurt» llega el médico con
//    el maletín y lo atiende (sin sangre ni morbo);
// 3. corta en «and some schools»: el mapa de papel del noreste; caen las chinchetas de seis universidades con su balón de
//    color; en «Columbia» la suya late y en «stopped playing» sale volando: queda una X roja;
// 4. corta antes de «President»: el despacho de la Casa Blanca; Roosevelt, que miraba por la ventana, cruza el despacho
//    con un balón; en «loved the sport» lo lanza y lo atrapa: el golpe hace que el casco del osito del escritorio se le
//    caiga sobre los ojos (gag); en «son» se vuelve sonriendo hacia la foto del equipo de primer año colgada en la pared,
//    y entra el secretario con las cartas;
// 5. corta en «called»: la Casa Blanca por fuera; llegan los representantes, cada uno en su nombre (bufanda carmesí en
//    «Harvard», azul en «Yale», naranja en «Princeton»), se saludan y en «White House» cruzan la verja; pasan el coche de
//    caballos y el automóvil por delante;
// 6. corta tras «October 9th»: el comedor de la Casa Blanca (fondo local): el calendario en el 9, el almuerzo; el
//    mayordomo sirve, Roosevelt de pie junto al balón embarrado sobre el mantel; en «clean up the game» da un golpe en la
//    mesa y señala el balón; los tres asienten.''', r'''
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const cl = (v) => Math.max(0, Math.min(1, v));
const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
const K = T.C.k;
const a = (f) => en('bruto', f), b = (f) => en('roosevelt', f);
const P2 = a(0.292), P3 = a(0.689), P4 = b(-0.02), P5 = b(0.427), P6 = b(0.80);
const CHOQUE = a(0.181), PITA = P2 + 0.25, BADLY = a(0.592), COLUMBIA = a(0.798), STOP = a(0.882);
const GIRA = b(0.04), LANZA = b(0.156), COGE = b(0.213), SON = b(0.256), HARVARD = b(0.299), SECRE = b(0.356);
const N1 = b(0.524), N2 = b(0.594), N3 = b(0.638), CASA = b(0.70), LIMPIA = b(0.915);
// los dos equipos de 1905 (los mismos colores que el montón del decorado): naranja y negro contra azul
const NAR = pal({ C: '#d0782a', c: '#2a2430', W: '#d0782a' }), AZU = pal({ C: '#2a4a8a', c: '#c8c0a8', W: '#2a4a8a' });
const ARBITRO = { ...EL.periodista, pal: { ...EL.periodista.pal, ...pal({ C: '#e8e4d8', c: '#c8c4b8', W: '#e8e4d8' }) } };
const ENTRENADOR = { ...EL.periodista, tocado: 'gorra', pal: { ...EL.periodista.pal, ...pal({ C: '#4a3a2a', c: '#3a2c20', H: '#2a2018' }) } };
const MEDICO = { ...EL.rector, tocado: 'chistera' };
// barro en la ropa (unas manchas fijas por jugador)
const barro = (x, suelo, k) => { for (let n = 0; n < 7; n++) { const i = 2 + Math.floor(h(k, n, 1) * 11), j = 2 + Math.floor(h(k, n, 2) * 16); R.pset(x + i, suelo - j, n % 3 ? hex('#5a4028') : hex('#3e2c1c')); } };
// el silbato y el cubo, en la mano
const cubo = (x, y) => { R.rect(x, y - 6, x + 5, y, K); R.rect(x + 1, y - 5, x + 4, y - 1, hex('#8a8e96')); R.rect(x + 1, y - 5, x + 4, y - 5, hex('#b8bcc4')); R.linea(x, y - 7, x + 5, y - 7, hex('#4a4a52')); R.pset(x + 2, y - 4, hex('#6ab0d8')); };

// 1 · la cuña de 1905
const p1 = (t) => {
  const m = cl((t - 0.3) / (CHOQUE + 0.9)), golpe = Math.max(0, 1 - Math.abs(t - CHOQUE) / 0.5);
  T.campo1905(R, t, { mele: m, u: 0.35 + 0.65 * golpe });
  // el fotógrafo con su cámara de cajón en el trípode y el fogonazo de magnesio en el choque
  const fx = 22, fs = 176; R.linea(fx + 20, fs, fx + 24, fs - 14, hex('#4a3a2a')); R.linea(fx + 28, fs, fx + 24, fs - 14, hex('#4a3a2a')); R.linea(fx + 24, fs, fx + 24, fs - 14, hex('#3a2a1a'));
  R.rect(fx + 19, fs - 22, fx + 29, fs - 14, K); R.rect(fx + 20, fs - 21, fx + 28, fs - 15, hex('#5a3a22')); R.rect(fx + 20, fs - 21, fx + 28, fs - 21, hex('#7a5232')); R.rect(fx + 29, fs - 20, fx + 31, fs - 16, K); R.pset(fx + 30, fs - 18, hex('#8ab0c8'));
  R.actor(EL.periodista, fx, fs, t, { dir: 1, dedo: t > CHOQUE - 0.6 && t < CHOQUE + 0.4, sorpresa: t > CHOQUE + 0.1 && t < CHOQUE + 1.2 });
  const fl = t - CHOQUE - 0.05; if (fl > 0 && fl < 0.9) { const r = Math.round(2 + fl * 10); for (let k = 0; k < 14; k++) { const an = k / 14 * 6.28; R.pset(Math.round(fx + 16 + Math.cos(an) * r), Math.round(fs - 30 + Math.sin(an) * r * 0.7), fl < 0.3 ? T.C.blanco : hex('#c8c8c0')); } if (fl < 0.2) R.disco(fx + 16, fs - 30, 3, T.C.blanco); }
  // el aguador corre por la banda con el cubo y se para a mirar
  const u = tramo(t, 0.5, CHOQUE - 0.6), xa = Math.round(lerp(-18, 92, u));
  R.actor(EL.chico, xa, 166, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > CHOQUE && t < CHOQUE + 1.4 }); cubo(xa + 13, 160);
  // el entrenador grita a los suyos con el megáfono de cartón
  const ex = 252, es = 174, grita = Math.sin(t * 8) > -0.2;
  R.actor(ENTRENADOR, ex, es, t, { dir: -1, habla: grita, enfado: t > CHOQUE }); barro(ex, es, 9);
  R.poligono([[ex + 4, es - 17], [ex + 4, es - 14], [ex - 6, es - 11], [ex - 6, es - 20]], hex('#c8b080')); R.linea(ex - 6, es - 20, ex - 6, es - 11, hex('#8a7448')); R.linea(ex + 4, es - 17, ex - 6, es - 20, hex('#e0cc9c'));
  if (grita && Math.floor(t * 6) % 2) for (const dy of [-19, -15, -11]) R.pset(ex - 9, es + dy, hex('#e8e8e0'));
};

// 2 · después de la jugada: los doloridos y el médico
const p2 = (t) => {
  T.campo1905(R, t, { encuadre: 'banda' });
  // el árbitro pita el final de la jugada con el silbato en la boca
  const pita = t > PITA && t < PITA + 0.9;
  R.actor(ARBITRO, 170, 150, t, { dir: -1, dedo: pita, habla: pita }); if (pita) { R.rect(170, 133, 172, 134, hex('#c8c8d0')); R.pset(169, 134, K); }
  // el de azul se frota la cabeza y se va renqueando hacia la derecha
  const v = tramo(t, BADLY - 1.2, P3), xb = Math.round(lerp(236, 300, v)), cojea = v > 0 && v < 1;
  R.actor(EL.jugador1905, xb, 158 + (cojea && Math.floor(t * 3) % 2 ? 1 : 0), t, { dir: 1, pal: AZU, triste: true, dedo: !cojea, anda: cojea && Math.floor(t * 3) % 2 === 0 }); barro(xb, 158, 4);
  // dos compañeros llevan al que cojea hacia el banco
  const w = tramo(t, P2 + 0.3, BADLY), gx = Math.round(lerp(30, 118, w)), gy = Math.round(lerp(172, 164, w)), anda = w > 0 && w < 1;
  R.actor(EL.jugador1905, gx - 13, gy - 2, t, { dir: 1, pal: NAR, anda }); barro(gx - 13, gy - 2, 1);
  R.actor(EL.jugador1905, gx, gy, t, { dir: 1, pal: NAR, triste: true, anda: anda && Math.floor(t * 2.5) % 2 === 0 }); barro(gx, gy, 2);
  R.actor(EL.jugador1905, gx + 13, gy + 1, t, { dir: 1, pal: NAR, anda, habla: !anda && Math.sin(t * 6) > 0 }); barro(gx + 13, gy + 1, 3);
  // los brazos por los hombros del herido
  R.linea(gx - 1, gy - 10, gx + 3, gy - 11, NAR.C); R.linea(gx + 12, gy - 11, gx + 15, gy - 10, NAR.C);
  // el médico llega con el maletín en «badly hurt» y lo atiende
  const d = tramo(t, BADLY - 1.6, BADLY + 0.2), dx = Math.round(lerp(336, gx + 30, d));
  R.actor(MEDICO, dx, gy + 3, t, { dir: -1, anda: d > 0 && d < 1, dedo: d >= 1 && Math.sin(t * 3) > 0, habla: d >= 1 && Math.sin(t * 5) > 0.3 });
  const mx = dx - 2, my = gy - 4; R.rect(mx, my - 5, mx + 7, my, K); R.rect(mx + 1, my - 4, mx + 6, my - 1, hex('#3a2418')); R.rect(mx + 1, my - 4, mx + 6, my - 4, hex('#5a3a24')); R.rect(mx + 3, my - 7, mx + 4, my - 6, K); R.pset(mx + 5, my - 3, hex('#c8a040'));
};

// 3 · el mapa: Columbia lo deja
const U = [
  ['harvard', [-71.12, 42.37], '#a8283a'], ['yale', [-72.93, 41.31], '#1e3a8a'], ['cornell', [-76.48, 42.45], '#c83a2a'],
  ['princeton', [-74.66, 40.35], '#e8782a'], ['penn', [-75.19, 39.95], '#3a2a8a'], ['columbia', [-73.96, 40.81], '#6aa8e8'],
];
const p3 = (t) => {
  const P = T.mapa(R, t, { zoom: 4.4, centro: [-74.4, 41.1] });
  U.forEach(([id, ll, col], k) => {
    const [x, y] = P(ll).map(Math.round), cae = P3 + 0.15 + k * 0.22, col2 = hex(col);
    if (id === 'columbia' && t > STOP) {
      const sale = tramo(t, STOP, STOP + 0.4);
      if (sale < 1) T.chincheta(R, x, y, t, col2, { baja: 1 - sale });
      R.disco(x, y + 1, 1, hex('#5a4a3a'));
      const xx = tramo(t, STOP + 0.3, STOP + 0.6); if (xx > 0) R.icono('X', x - 2, y - 2 - Math.round((1 - xx) * 4), hex('#c82a2a'), hex('#5a1a1a'));
      return;
    }
    const bj = tramo(t, cae, cae + 0.3); if (bj <= 0) return;
    T.chincheta(R, x, y, t, col2, { baja: bj, pulso: id === 'columbia' && t > COLUMBIA - 0.1 });
    // el balón pequeño de su color junto a la chincheta, que se mece
    if (bj >= 1) { const dy = Math.round(Math.sin(t * 2 + k) * 0.8); R.icono('rugby', x + 5, y - 11 + dy, col2, hex('#3a2a1a')); }
  });
};

// 4 · el despacho: Roosevelt, el balón y el osito
const p4 = (t) => {
  T.casaBlanca(R, t, { encuadre: 'despacho', osito: tramo(t, COGE + 0.15, COGE + 0.7) });
  // la foto del equipo de primer año, colgada en la pared: cinco jugadores de carmesí en sepia
  R.linea(186, 60, 178, 66, hex('#8a7a4a')); R.linea(186, 60, 194, 66, hex('#8a7a4a')); R.pset(186, 60, hex('#c8a040'));
  R.rect(175, 66, 197, 83, K); R.rect(176, 67, 196, 82, hex('#c8a040')); R.rect(177, 68, 195, 81, hex('#8a6a2a')); R.rect(178, 69, 194, 80, hex('#e8d8b0'));
  R.rect(178, 76, 194, 80, hex('#a89068')); for (let k = 0; k < 5; k++) { const px = 179 + k * 3; R.pset(px, 73, hex('#5a3a24')); R.pset(px, 74, hex('#d8b894')); R.rect(px, 75, px + 1, 78, hex('#9a2a3a')); R.pset(px + 1, 73, hex('#5a3a24')); }
  R.pset(193, 70, hex('#f8f0e0'));
  // Roosevelt: miraba por la ventana, cruza con el balón, lo lanza y lo atrapa, sonríe a la foto
  const c = tramo(t, GIRA, LANZA - 0.15), x = Math.round(lerp(64, 150, c)), dir = t < GIRA ? -1 : t > SECRE + 0.5 ? -1 : 1;
  const vuela = tramo(t, LANZA, COGE), arriba = vuela > 0 && vuela < 1;
  R.actor(EL.roosevelt, x, 160, t, { dir, anda: c > 0 && c < 1, bigote: true, dedo: arriba || (t > HARVARD && t < SECRE + 0.5), sonrisa: t > SON && t < SECRE + 0.6, habla: t > SECRE + 0.6 && Math.sin(t * 6) > 0 });
  const hx = dir > 0 ? x + 13 : x + 1, hy = 152;
  if (arriba) T.balon(R, x + 17, Math.round(hy - 4 - Math.sin(Math.PI * vuela) * 26), t, { epoca: '1906', ang: vuela * 6.28 });
  else T.balon(R, hx, hy, t, { epoca: '1906', ang: dir > 0 ? 0.3 : -0.3 });
  // el secretario entra con las cartas para las universidades
  const s = tramo(t, SECRE, SECRE + 0.9), sx = Math.round(lerp(-18, 96, s));
  if (s > 0) { R.actor({ ...EL.rector, pal: { ...EL.rector.pal, ...pal({ H: '#5a3a24', h: '#7a5434' }) } }, sx, 162, t, { dir: 1, anda: s < 1, habla: s >= 1 && Math.sin(t * 7) > 0.4 });
    for (let k = 0; k < 3; k++) { R.rect(sx + 12, 145 + k * 2, sx + 18, 147 + k * 2, K); R.rect(sx + 13, 145 + k * 2, sx + 17, 146 + k * 2, hex('#f2eee2')); R.pset(sx + 15, 146 + k * 2, hex(['#a8283a', '#1e3a8a', '#e8782a'][k])); } }
};

// 5 · la Casa Blanca por fuera: llegan los tres
const REP = [
  [{ ...EL.rector, tocado: 'chistera' }, '#a8283a'],
  [{ ...EL.rector, tocado: 'fedora', pal: { ...EL.rector.pal, ...pal({ H: '#5a3a24', h: '#7a5434', C: '#3a3a4a' }) } }, '#2a4aa8'],
  [{ ...EL.rector, tocado: 'chistera', pal: { ...EL.rector.pal, ...pal({ H: '#2a2024', h: '#4a3a3a', C: '#2a2a30' }) } }, '#e8782a'],
];
const bufanda = (x, suelo, dir, col) => { const y = suelo - 13, c = hex(col); R.rect(x + 4, y, x + 10, y + 1, c); R.pset(x + 4, y + 1, K); const cx = dir > 0 ? x + 5 : x + 9; R.rect(cx, y + 2, cx + 1, y + 5, c); R.pset(cx, y + 5, hex('#f2eee2')); };
const p5 = (t) => {
  T.casaBlanca(R, t, { encuadre: 'fuera' });
  const entra = tramo(t, CASA - 0.1, CASA + 1.1);
  const rutas = [
    [[-18, 156], [112, 156], N1 - 1.3, N1], [[336, 155], [186, 155], N2 - 1.2, N2 + 0.2], [[-18, 153], [134, 153], N3 - 1.0, N3 + 0.6],
  ];
  const ps = rutas.map(([p0, p1, t0, t1], k) => {
    const u = tramo(t, t0, t1), dentro = [[146, 147], [160, 146], [172, 147]][k];
    const x = lerp(lerp(p0[0], p1[0], u), dentro[0], entra), y = lerp(p1[1], dentro[1], entra);
    return { k, x: Math.round(x), y: Math.round(y), anda: (u > 0 && u < 1) || (entra > 0 && entra < 1), dir: entra > 0 ? (dentro[0] > p1[0] ? 1 : -1) : p0[0] < p1[0] ? 1 : -1, ve: u > 0 };
  }).filter((p) => p.ve).sort((p, q) => p.y - q.y);
  for (const p of ps) {
    const [def, col] = REP[p.k], quieto = !p.anda;
    R.actor(def, p.x, p.y, t, { dir: entra > 0 || p.anda ? p.dir : p.k === 1 ? -1 : 1, anda: p.anda, habla: quieto && Math.sin(t * 5 + p.k * 2) > 0.5, dedo: quieto && p.k === 0 && t > N2 && t < N2 + 0.8 });
    bufanda(p.x, p.y, p.dir, col);
  }
};

// 6 · el comedor de la Casa Blanca (fondo local): el almuerzo del 9 de octubre
let comedor = null;
const comedorFijo = () => {
  if (comedor) return comedor;
  comedor = R.nuevo(); const prev = R.usar(comedor);
  // el papel pintado a rayas color crema con flores de lis doradas
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) { const r = (x % 14) < 5, n = h(x, y, 3); let c = r ? hex('#d8c294') : hex('#e8d6a8'); if (n < 0.08) c = r ? hex('#ccb486') : hex('#dcc89a'); if (r && (y % 12) === 5 && (x % 14) === 2) c = hex('#b8943e'); if (r && (y % 12) === 6 && (x % 14) >= 1 && (x % 14) <= 3) c = hex('#c8a450'); R.pset(x, y, c); }
  // la cornisa con dentículos y la moldura del friso
  R.rect(0, 0, 319, 6, hex('#f2eadc')); R.rect(0, 7, 319, 7, hex('#c8b898')); for (let x = 0; x < 320; x += 4) R.rect(x, 4, x + 1, 6, hex('#d8ccb4')); R.rect(0, 8, 319, 8, hex('#a89878'));
  R.rect(0, 22, 319, 23, hex('#c8a860')); R.rect(0, 24, 319, 24, hex('#8a7040'));
  // el zócalo de roble con cuarterones
  R.rect(0, 92, 319, 117, hex('#6a4428')); R.rect(0, 92, 319, 93, hex('#8a5a34')); R.rect(0, 94, 319, 94, hex('#3e2614'));
  for (let x = 6; x < 320; x += 38) { R.rect(x, 98, x + 30, 113, hex('#5a3820')); R.rect(x, 98, x + 30, 98, hex('#3e2614')); R.rect(x, 98, x, 113, hex('#3e2614')); R.rect(x + 1, 113, x + 30, 113, hex('#8a5a34')); R.rect(x + 30, 99, x + 30, 113, hex('#8a5a34')); for (let k = 0; k < 4; k++) R.linea(x + 3, 101 + k * 3, x + 27, 101 + k * 3 + (k % 2), hex('#644024')); }
  // el parqué en espiga y la alfombra roja bajo la mesa
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const c = ((x >> 3) + (y >> 2)) % 2 ? ((x + y) >> 3) % 2 : ((x - y) >> 3) % 2, n = h(x >> 1, y, 4); R.pset(x, y, c ? (n < 0.3 ? hex('#7a4a28') : hex('#8a5a30')) : (n < 0.3 ? hex('#9a6436') : hex('#a86e3c'))); }
  R.rect(0, 118, 319, 118, hex('#3e2614'));
  for (let y = 152; y < 180; y++) for (let x = 14; x < 306; x++) { const bd = y < 156 || y > 175 || x < 20 || x > 299, m = ((x >> 2) + (y >> 2)) % 3 === 0; R.pset(x, y, bd ? (((x + y) >> 1) % 3 ? hex('#c8a040') : hex('#7a1e2a')) : m ? hex('#6a1a26') : (h(x, y, 5) < 0.15 ? hex('#9a2a36') : hex('#8a2230'))); }
  // las dos ventanas con cortinas de terciopelo (el cristal se pinta en cada fotograma)
  for (const [x0, x1] of [[22, 62], [226, 260]]) {
    R.rect(x0 - 3, 30, x1 + 3, 90, hex('#f2eadc')); R.rect(x0 - 3, 90, x1 + 3, 92, hex('#c8b898'));
    for (const cx of [x0 - 12, x1 + 3]) for (let y = 26; y < 116; y++) for (let i = 0; i < 9; i++) { const f = Math.sin((i + y * 0.04) * 1.6); R.pset(cx + i, y, f > 0.5 ? hex('#a82a3a') : f > -0.3 ? hex('#8a1e2a') : hex('#5e121c')); }
    for (const cx of [x0 - 8, x1 + 7]) { R.rect(cx - 2, 70, cx + 2, 72, hex('#c8a040')); R.pset(cx, 73, hex('#e8c860')); }
    R.rect(x0 - 14, 24, x1 + 14, 26, hex('#c8a040')); R.rect(x0 - 14, 27, x1 + 14, 27, hex('#8a6a2a'));
  }
  // el aparador de caoba con la sopera y los candeleros, el retrato sin rasgos encima
  R.rect(80, 84, 128, 118, K); R.rect(81, 85, 127, 117, hex('#6a2a1c')); R.rect(81, 85, 127, 87, hex('#8a3a24'));
  for (const [x, w] of [[84, 18], [106, 18]]) { R.rect(x, 90, x + w, 100, hex('#5a2216')); R.rect(x, 90, x + w, 90, hex('#3a140c')); R.rect(x + w / 2 - 1, 95, x + w / 2 + 1, 95, hex('#c8a040')); R.rect(x, 103, x + w, 114, hex('#5a2216')); R.rect(x, 103, x + w, 103, hex('#3a140c')); R.pset(x + w / 2, 108, hex('#c8a040')); }
  R.rect(92, 75, 110, 84, K); R.rect(93, 76, 109, 83, hex('#c8ccd4')); R.rect(93, 76, 109, 77, hex('#e8ecf0')); R.rect(97, 72, 105, 75, hex('#a8acb4')); R.rect(100, 70, 102, 72, hex('#e8ecf0')); R.pset(95, 79, T.C.blanco);
  for (const cx of [85, 122]) { R.rect(cx, 74, cx + 1, 84, hex('#c8a040')); R.rect(cx - 2, 83, cx + 3, 84, hex('#a88030')); R.rect(cx, 70, cx + 1, 73, hex('#f2eee2')); }
  R.rect(84, 30, 124, 66, K); R.rect(85, 31, 123, 65, hex('#c8a040')); R.rect(87, 33, 121, 63, hex('#8a6a2a')); R.rect(88, 34, 120, 62, hex('#2a2a24'));
  for (let y = 34; y < 63; y++) for (let x = 88; x < 121; x++) if (h(x, y, 6) < 0.25) R.pset(x, y, hex('#363630'));
  R.disco(104, 44, 5, hex('#c8a888')); R.poligono([[94, 63], [96, 52], [104, 49], [112, 52], [114, 63]], hex('#1c1c20')); R.rect(102, 50, 106, 54, hex('#e8e4d8'));
  // el reloj de pared con su caja de péndulo
  R.rect(206, 30, 222, 74, K); R.rect(207, 31, 221, 73, hex('#6a3a1c')); R.disco(214, 40, 6, K); R.disco(214, 40, 5, hex('#f2eadc')); R.rect(209, 50, 219, 70, hex('#3a2010')); R.rect(209, 50, 219, 50, hex('#c8a040'));
  // los apliques de gas a los lados del retrato y el helecho en su pie, a la derecha (bajo la zona de Atom)
  for (const ax of [76, 127]) { R.rect(ax, 70, ax + 2, 76, hex('#c8a040')); R.linea(ax + 1, 76, ax + 1, 80, hex('#a88030')); R.disco(ax + 1, 66, 3, hex('#f2e8c8')); R.disco(ax + 1, 66, 2, hex('#fff8e0')); }
  R.rect(292, 88, 310, 90, hex('#5a3418')); R.rect(299, 90, 302, 116, hex('#4a2a14')); R.rect(294, 115, 307, 117, hex('#5a3418')); R.rect(294, 78, 308, 88, hex('#8a4a2a')); R.rect(294, 78, 308, 79, hex('#a85a34'));
  for (let k = 0; k < 9; k++) { const an = -2.6 + k * 0.33, L = 12 + (k % 3) * 3; for (let s = 0; s < L; s++) R.pset(Math.round(301 + Math.cos(an) * s), Math.round(78 + Math.sin(an) * s * 0.8 + (s * s) / 40), s % 3 ? hex('#3a7a3a') : hex('#5a9a4a')); }
  // la mesa: el mantel blanco con sus pliegues y el encaje
  R.rect(36, 158, 234, 162, hex('#4a2e1a'));
  R.rect(40, 136, 232, 141, hex('#f6f2e8')); R.rect(40, 136, 232, 136, hex('#fffaf0'));
  for (let y = 142; y < 159; y++) for (let x = 38; x <= 234; x++) { const f = Math.sin(x * 0.35 + (y - 142) * 0.05); R.pset(x, y, f > 0.6 ? hex('#ffffff') : f > -0.4 ? hex('#ece6d8') : hex('#d4ccbc')); }
  R.rect(38, 141, 234, 141, hex('#c8c0b0'));
  for (let x = 38; x <= 234; x += 2) { R.pset(x, 158, hex('#f6f2e8')); R.pset(x + 1, 159, hex('#e0d8c8')); }
  R.usar(prev); return comedor;
};
// lo que va encima del mantel, por delante de los comensales
const mesaEncima = (t) => {
  for (const x of [62, 112, 162, 200]) { R.rect(x - 6, 136, x + 6, 138, hex('#d8dce4')); R.rect(x - 5, 136, x + 5, 137, T.C.blanco); R.rect(x - 2, 136, x + 2, 137, hex('#e8e4d8')); R.rect(x + 8, 130, x + 9, 136, hex('#c8e0f0')); R.pset(x + 8, 131, T.C.blanco); R.pset(x - 9, 136, hex('#b8bcc4')); R.pset(x - 9, 135, hex('#b8bcc4')); }
  // los candelabros con las llamas
  for (const cx of [84, 134]) { R.rect(cx, 124, cx + 1, 137, hex('#c8a040')); R.rect(cx - 4, 128, cx + 5, 128, hex('#c8a040')); R.rect(cx - 2, 137, cx + 3, 138, hex('#a88030')); for (const dx of [-4, 0, 5]) { R.rect(cx + dx, 122, cx + dx, 127, hex('#f2eee2')); const fl = Math.sin(t * 13 + dx + cx) > 0 ? 1 : 0; R.pset(cx + dx, 121, hex('#f8c040')); R.pset(cx + dx, 120 - fl, hex('#f8e880')); } }
  // el centro de crisantemos de otoño
  R.rect(181, 132, 189, 138, hex('#c8ccd4')); for (let k = 0; k < 9; k++) { const fx = 178 + (k % 5) * 3, fy = 125 + Math.floor(k / 5) * 4 + Math.round(Math.sin(t * 1.3 + k) * 0.5); R.disco(fx, fy, 1.6, hex(['#e8a030', '#c84a2a', '#f2d860'][k % 3])); } R.pset(176, 131, hex('#4a7a3a')); R.pset(192, 131, hex('#4a7a3a'));
  // el balón embarrado, junto a Roosevelt, que da un saltito con el golpe en la mesa
  const salta = t > LIMPIA && t < LIMPIA + 0.25 ? 2 : 0;
  T.balon(R, 216, 132 - salta, t, { epoca: '1906', ang: 0.15 }); for (const [dx, dy] of [[-3, 1], [1, 2], [3, 0], [-1, 3]]) R.pset(216 + dx, 132 - salta + dy, hex('#4a3420')); R.pset(214, 137, hex('#5a4028'));
};
const p6 = (t) => {
  R.copiar(comedorFijo());
  // por las ventanas: el jardín de otoño y el cielo, recortados al cristal
  for (const [x0, x1] of [[22, 62], [226, 260]]) {
    R.recorte([x0, 30, x1, 89]);
    R.poligono([[x0, 30], [x1, 30], [x1, 70], [x0, 70]], (x, y) => (h(x >> 1, y >> 1, 7) < (y - 30) / 60 ? hex('#a8c8e8') : hex('#8ab4e0')));
    for (let k = 0; k < 2; k++) { const cx = x0 + ((t * (3 + k * 2) + k * 23 + x0) % (x1 - x0 + 30)) - 15; R.disco(cx, 40 + k * 9, 5, hex('#f2f4f8')); R.disco(cx + 5, 41 + k * 9, 4, hex('#dce4ee')); }
    R.poligono([[x0, 70], [x1, 70], [x1, 89], [x0, 89]], hex('#6a8a4a'));
    for (let k = 0; k < 3; k++) { const tx = x0 + 6 + k * 14, m = Math.round(Math.sin(t * 1.2 + k + x0) * 1.2); R.linea(tx, 89, tx, 74, hex('#4a3020')); R.disco(tx + m, 68, 7, hex('#c86a24')); R.disco(tx + m - 2, 66, 4, hex('#e89a3a')); R.disco(tx + m + 3, 71, 3, hex('#a84a1a')); }
    for (let k = 0; k < 4; k++) { const lx = x0 + ((t * 9 + k * 11) % (x1 - x0)), ly = 60 + ((t * 7 + k * 13) % 29); R.pset(Math.round(lx), Math.round(ly), hex('#e88a2a')); }
    R.recorte(null);
    const mx = (x0 + x1) >> 1; R.rect(mx - 1, 30, mx, 89, hex('#f2eadc')); R.rect(x0, 58, x1, 59, hex('#f2eadc')); R.rect(x0, 30, x0, 89, hex('#c8b898')); R.rect(x1, 30, x1, 89, hex('#c8b898'));
    R.linea(x0 + 4, 34, x0 + 9, 39, hex('#e8f0f8')); R.linea(mx + 4, 62, mx + 8, 66, hex('#e8f0f8'));
  }
  // la lámpara de araña con las velas y los cristales que destellan (fuera de la barra del año)
  R.linea(178, 0, 178, 14, hex('#8a6a2a')); R.rect(172, 15, 184, 18, hex('#c8a040')); R.rect(174, 19, 182, 22, hex('#a88030'));
  for (const dx of [-16, -8, 8, 16]) { R.linea(178, 20, 178 + dx, 26, hex('#c8a040')); R.rect(178 + dx - 1, 26, 178 + dx + 1, 27, hex('#c8a040')); R.rect(178 + dx, 22, 178 + dx, 25, hex('#f2eee2')); R.pset(178 + dx, 21, Math.sin(t * 11 + dx) > 0 ? hex('#f8e880') : hex('#f8c040')); R.pset(178 + dx, 29, Math.sin(t * 3 + dx) > 0.7 ? T.C.blanco : hex('#b8d8e8')); }
  R.pset(178, 25, Math.sin(t * 4) > 0.6 ? T.C.blanco : hex('#a8c8e0')); R.pset(178, 27, hex('#c8e0f0'));
  // el calendario del 9 de octubre (la hoja se mece con la corriente)
  const mece = Math.round(Math.sin(t * 2.1) * 0.6);
  R.pset(146, 31, K); R.linea(146, 31, 140, 35, hex('#8a7a4a')); R.linea(146, 31, 152, 35, hex('#8a7a4a')); R.rect(134, 35, 158, 66, K); R.rect(135, 36, 157, 65, hex('#f6f2e8')); R.rect(135, 36, 157, 41, hex('#a8283a')); R.rect(135, 42, 157, 42, hex('#d8d0c0'));
  for (let k = 0; k < 4; k++) R.pset(138 + k * 6, 38, hex('#f2eee2'));
  R.numero('9', 146 + mece, 61, { tam: 16, centro: true }); R.rect(136, 64, 156, 64, hex('#d8d0c0'));
  // el péndulo del reloj y sus agujas
  const pa = Math.sin(t * 3.1) * 3; R.linea(214, 51, Math.round(214 + pa), 64, hex('#c8a040')); R.disco(Math.round(214 + pa), 66, 2, hex('#e8c860'));
  R.linea(214, 40, 214, 36, K); R.linea(214, 40, 217, 41, K);
  // el vapor de la sopera
  for (let k = 0; k < 6; k++) { const u = (t * 0.5 + k / 6) % 1; R.pset(Math.round(101 + Math.sin(u * 6 + k) * 2), Math.round(69 - u * 16), u < 0.5 ? hex('#f2f2f2') : hex('#e2dccc')); }
  // el mayordomo cruza por detrás con la bandeja y se para detrás del primer invitado
  const m = tramo(t, P6 + 0.1, P6 + 1.8), mx = Math.round(lerp(-18, 52, m));
  R.actor({ ...EL.rector, pal: { ...EL.rector.pal, ...pal({ C: '#1c1c24', H: '#3a2a20', h: '#5a4030' }) } }, mx, 128, t, { dir: 1, anda: m > 0 && m < 1 });
  R.rect(mx + 12, 110, mx + 22, 111, hex('#c8ccd4')); R.rect(mx + 15, 106, mx + 19, 109, hex('#e8ecf0')); R.pset(mx + 20, 107, hex('#e8ecf0'));
  // los tres invitados sentados (asoman por encima del mantel) y Roosevelt de pie a la cabecera
  const cols = ['#a8283a', '#2a4aa8', '#e8782a'];
  [54, 104, 150].forEach((x, k) => {
    const d = REP[k][0], nod = t > LIMPIA + 0.3 && Math.floor((t - LIMPIA) * 3 + k) % 2 === 0;
    R.actor({ ...d, tocado: undefined }, x, 146 + (nod ? 1 : 0), t, { dir: 1, sorpresa: k === 1 && t > LIMPIA && t < LIMPIA + 0.6, habla: k === 2 && t < LIMPIA - 0.6 && Math.sin(t * 6) > 0.6 });
    R.rect(x + 6, 133, x + 8, 135, hex(cols[k]));
  });
  const golpe = t > LIMPIA - 0.1 && t < LIMPIA + 1.3;
  R.actor(EL.roosevelt, 232, 150, t, { dir: -1, bigote: true, habla: Math.sin(t * 7) > 0 && t < LIMPIA + 1.5, dedo: golpe });
  mesaEncima(t);
};

const efectos = [[0.5, 'silbato'], [CHOQUE, 'chof'], [PITA, 'silbato'], [STOP, 'pop'], [COGE, 'golpecito'], [COGE + 0.45, 'boing'], [LIMPIA, 'golpecito']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '1905', efectos, año: 1905 });
''')

E['fa-reglas'] = ('Las reglas nuevas', '''// FA-REGLAS (frases 9–10), del invierno de 1905 a 1906 (sin cartela; la barra pasa a 1906 en «1906»). Seis planos:
// 1. «Over that winter the colleges wrote new rules»: de noche y nevando (fondo local), el edificio de ladrillo de una
//    universidad con las ventanas encendidas; en la grande, los representantes escriben las reglas; el reloj de la torre
//    corre (pasa el invierno) y se para en las doce en «1906»; un representante llega por el camino nevado con los
//    papeles y entra (la puerta se abre y suelta luz); pasa un trineo por delante;
// 2. corta en «came»: el libro de reglas abierto (casaBlanca 'reglas'): la flecha roja del pase hacia delante se dibuja
//    sola por primera vez y llega a la punta en «forward»; el té humea al lado;
// 3. corta en «Though»: el aula del comité con la pizarra (fondo local): el que explica, subido a la tarima, señala con
//    el puntero; la tiza dibuja el pase, el balón cae corto en «missed pass» y en «cost you the ball» pasa al rival;
//    en «middle of the line» se raya la zona del centro y se tacha; los demás toman nota; nieva por la ventana;
// 4. corta tras «lines»: un campo cualquiera (westPoint 'campo'): un equipo prueba el pase con miedo: en «timidly» el
//    pasador suelta un pase cortito que cae a dos pasos, y un rival lo recoge y se va corriendo;
// 5. corta en «St. Louis»: el campo de entrenamiento cerrado con vallas de Saint Louis (campo1906 'entreno'): Cochems
//    pita, se presenta en «Eddie Cochems» y en «his weapon» Robinson lanza en espiral y Schneider la atrapa; al fondo
//    uno placa al muñeco; al final la tabla suelta de la valla se mueve;
// 6. corta en «had his players practice»: al otro lado de la valla (fondo local), en el patio del vecino: el vecino,
//    subido a un cajón, espía por el hueco; los balones pasan por encima de la valla uno tras otro (todo el verano) y él
//    se agacha y mira asombrado; su mujer tiende la ropa y las gallinas picotean.''', r'''
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const cl = (v) => Math.max(0, Math.min(1, v));
const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
const K = T.C.k;
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const trama = (x, y, f) => f * 16 > BAYER[(y & 3) * 4 + (x & 3)];
// un disco que solo pinta donde la función da color (null deja ver lo de debajo)
const discoS = (cx, cy, rr, f) => { for (let y = Math.floor(cy - rr); y <= Math.ceil(cy + rr); y++) for (let x = Math.floor(cx - rr); x <= Math.ceil(cx + rr); x++) { const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / rr; if (d <= 1) { const col = f(x, y, d); if (col != null) R.pset(x, y, col); } } };
const r = (f) => en('reglas', f), c = (f) => en('cochems', f);
const R2 = r(0.258), R3 = r(0.583), R4 = c(-0.1), R5 = c(0.317), R6 = c(0.728);
const Y1906 = r(0.205), ENTRA = r(0.16), FLECHA0 = r(0.419), FORWARD = r(0.525);
const MISSED = r(0.693), COST = r(0.741), BALL = r(0.773), COULDNT = r(0.819), MIDDLE = r(0.937);
const TIMID = c(0.13), EDDIE = c(0.481), MADE = c(0.586), WEAPON = c(0.647), PRACT = c(0.805);
const ABRIGO = { ...EL.rector, tocado: 'chistera', pal: { ...EL.rector.pal, ...pal({ C: '#2a2a34', c: '#1c1c24' }) } };

// 1 · la noche de invierno: el comité escribe las reglas (fondo local)
let invierno = null;
const inviernoFijo = () => {
  if (invierno) return invierno;
  invierno = R.nuevo(); const prev = R.usar(invierno);
  // el cielo de noche tramado, con el resplandor de la ciudad abajo
  for (let y = 0; y < 110; y++) for (let x = 0; x < 320; x++) { const f = y / 110; R.pset(x, y, trama(x, y, f * 1.6) ? (trama(x + 2, y + 1, f * 1.6 - 0.8) ? hex('#3a4272') : hex('#262e58')) : hex('#161c40')); }
  // la luna y los árboles pelados de lejos
  R.disco(258, 22, 8, hex('#2e3666')); R.disco(258, 22, 7, hex('#e8e4d0')); R.disco(260, 20, 2, hex('#cac6b2')); R.disco(255, 25, 1, hex('#cac6b2'));
  for (let x = 0; x < 320; x++) { const top = 84 + Math.round(Math.sin(x * 0.11) * 4 + Math.sin(x * 0.37) * 2 + h(x >> 2, 0, 3) * 4); for (let y = top; y < 112; y++) R.pset(x, y, (x + y) % 5 === 0 ? hex('#262c50') : hex('#1e2446')); }
  for (const tx of [14, 30, 284, 304]) { R.linea(tx, 112, tx, 74, hex('#14182e')); for (let k = 0; k < 6; k++) { const yy = 78 + k * 5, d = (k % 2 ? 1 : -1) * (6 + k); R.linea(tx, yy, tx + d, yy - 6, hex('#14182e')); } }
  // el edificio de ladrillo con el tejado nevado
  for (let y = 52; y < 140; y++) for (let x = 50; x < 270; x++) { const fila = y >> 2, jx = (x + (fila % 2) * 4) % 8; let col = (y & 3) === 3 || jx === 0 ? hex('#3a1c22') : h(x >> 3, fila, 8) < 0.3 ? hex('#5e2a2c') : hex('#6a3030'); if (y < 58) col = hex('#4a2226'); R.pset(x, y, col); }
  R.poligono([[44, 54], [276, 54], [258, 36], [62, 36]], hex('#2a2e44')); for (let y = 36; y < 54; y += 3) R.linea(62 - (y - 36), y, 258 + (y - 36), y, hex('#22263a'));
  R.poligono([[44, 54], [276, 54], [272, 50], [48, 50]], hex('#dce4f4')); R.linea(62, 36, 258, 36, hex('#e8eef8')); for (let x = 64; x < 258; x += 7) R.rect(x, 37, x + 3, 39, hex('#c8d2e8'));
  R.rect(46, 54, 274, 56, hex('#8a6a5a')); for (let x = 46; x < 274; x += 3) R.pset(x, 56, hex('#e8eef8'));
  // la torre del reloj con su cúpula nevada (por debajo de la barra del año)
  R.rect(146, 18, 174, 52, hex('#5a2a2c')); for (let y = 18; y < 52; y += 4) R.linea(146, y, 174, y, hex('#3a1c22'));
  R.poligono([[142, 20], [178, 20], [160, 6]], hex('#2a2e44')); R.poligono([[146, 20], [174, 20], [160, 9]], hex('#cfd8ec')); R.rect(142, 20, 178, 21, hex('#e8eef8'));
  R.disco(160, 33, 8, K); R.disco(160, 33, 7, hex('#f2e2a8')); R.disco(160, 33, 7, (x, y) => (Math.hypot(x - 160, y - 33) > 5.5 ? hex('#d8c27c') : hex('#f6e8b4')));
  for (let k = 0; k < 12; k++) { const an = k / 12 * 6.28; R.pset(Math.round(160 + Math.cos(an) * 5.5), Math.round(33 + Math.sin(an) * 5.5), hex('#8a6a3a')); }
  // las chimeneas con nieve
  for (const cx of [84, 232]) { R.rect(cx, 26, cx + 8, 42, hex('#5a2a2c')); R.rect(cx - 1, 25, cx + 9, 27, hex('#e8eef8')); for (let y = 28; y < 42; y += 3) R.linea(cx, y, cx + 8, y, hex('#3a1c22')); }
  // las ventanas: casi todas encendidas, con su alféizar nevado
  const ventana = (x, y, w, hh, luz) => { R.rect(x - 1, y - 1, x + w, y + hh, hex('#e8e0d0')); R.rect(x, y, x + w - 1, y + hh - 1, luz ? hex('#f2c068') : hex('#1e2440'));
    if (luz) { for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) if (h(x + i, y + j, 9) < 0.12) R.pset(x + i, y + j, hex('#f8d888')); R.rect(x, y + hh - 4, x + w - 1, y + hh - 1, hex('#d89a48')); }
    R.rect(x + (w >> 1), y, x + (w >> 1), y + hh - 1, hex('#e8e0d0')); R.rect(x, y + (hh >> 1), x + w - 1, y + (hh >> 1), hex('#e8e0d0'));
    R.rect(x - 2, y + hh, x + w + 1, y + hh + 1, hex('#eef2fa')); R.rect(x - 2, y + hh + 2, x + w + 1, y + hh + 2, hex('#9aa4c0')); };
  for (const y of [64, 98]) for (let x = 58; x < 266; x += 22) { if (x > 126 && x < 190) continue; if (y === 98 && x > 92 && x < 120) continue; ventana(x, y, 12, 18, h(x, y, 2) > 0.25); }
  ventana(150, 64, 20, 18, true);
  // el ventanal del comité (el interior se pinta en cada fotograma) con su arco de piedra
  R.rect(132, 92, 188, 128, hex('#c8bca8')); discoS(160, 94, 28, (x, y) => (y < 94 ? hex('#c8bca8') : null)); for (let k = 0; k < 9; k++) { const an = Math.PI + k / 8 * Math.PI; R.pset(Math.round(160 + Math.cos(an) * 27), Math.round(94 + Math.sin(an) * 27), hex('#9a8e7c')); }
  R.rect(126, 128, 194, 131, hex('#eef2fa')); R.rect(126, 132, 194, 132, hex('#9aa4c0'));
  // la puerta con su farol y los arbustos nevados
  R.rect(96, 108, 120, 140, hex('#c8bca8')); R.poligono([[94, 108], [122, 108], [108, 100]], hex('#c8bca8')); R.poligono([[94, 108], [122, 108], [108, 100]], (x, y) => (y < 103 ? hex('#eef2fa') : hex('#b8ac98')));
  for (const bx of [80, 128]) { R.disco(bx + 6, 136, 8, hex('#1e3a2a')); R.disco(bx + 6, 132, 7, hex('#2a4a34')); discoS(bx + 5, 129, 6, (x, y) => (y < 131 ? hex('#e8eef8') : null)); }
  // el suelo nevado: sombras azules, el camino pisado, la verja de hierro
  for (let y = 138; y < 180; y++) for (let x = 0; x < 320; x++) { const f = (y - 138) / 42, n = h(x >> 1, y >> 1, 10); R.pset(x, y, n < 0.1 ? hex('#a8b4d0') : trama(x, y, 0.35 + f * 0.5) ? hex('#d8e0f0') : hex('#bcc8e2')); }
  for (let y = 140; y < 180; y++) { const cx = 108 - (y - 140) * 2.4 + Math.sin(y * 0.15) * 3, w = 8 + (y - 140) * 0.3; for (let x = Math.round(cx - w); x < cx + w; x++) R.pset(x, y, h(x, y, 11) < 0.25 ? hex('#a0acc8') : hex('#b0bcd6')); }
  for (let k = 0; k < 26; k++) { const y = 142 + k * 1.5, x = 108 - (y - 140) * 2.4 + (k % 2 ? 3 : -3); R.pset(Math.round(x), Math.round(y), hex('#8a96b4')); }
  for (let x = 0; x < 320; x += 6) { if (x > 70 && x < 128) continue; R.rect(x, 140, x, 152, hex('#1c1c24')); R.pset(x, 139, hex('#3a3a46')); R.pset(x, 138, hex('#eef2fa')); }
  for (const yy of [142, 149]) { R.linea(0, yy, 70, yy, hex('#1c1c24')); R.linea(128, yy, 319, yy, hex('#1c1c24')); }
  // la farola de gas
  R.rect(290, 104, 292, 160, hex('#1c1c24')); R.rect(287, 158, 295, 161, hex('#1c1c24')); R.rect(286, 96, 296, 104, K); R.rect(287, 97, 295, 103, hex('#f8e0a0')); R.poligono([[285, 96], [297, 96], [291, 90]], hex('#1c1c24')); R.rect(285, 95, 297, 95, hex('#eef2fa'));
  R.usar(prev); return invierno;
};
const trineo = (x, y, t) => {
  // el caballo al trote y el trineo rojo con el cochero, de derecha a izquierda (va por delante de todo)
  const f = Math.floor(t * 8) % 2;
  R.rect(x + 2, y - 15, x + 18, y - 8, hex('#3a2418')); R.rect(x + 2, y - 15, x + 18, y - 15, hex('#5a3a24')); R.rect(x - 3, y - 20, x + 4, y - 13, hex('#3a2418')); R.rect(x - 5, y - 17, x - 2, y - 14, hex('#3a2418')); R.pset(x - 1, y - 18, K); R.rect(x + 2, y - 22, x + 4, y - 20, hex('#2a1810'));
  for (const [lx, ph] of [[4, 0], [7, 1], [14, 0], [17, 1]]) { const d = ph === f ? 2 : -1; R.linea(x + lx, y - 8, x + lx + d, y - 1, hex('#2a1810')); }
  R.linea(x + 18, y - 12, x + 26, y - 10, hex('#8a6a3a')); R.linea(x + 10, y - 13, x + 26, y - 11, hex('#c8a040'));
  R.rect(x + 24, y - 14, x + 46, y - 4, K); R.rect(x + 25, y - 13, x + 45, y - 5, hex('#a82a2a')); R.rect(x + 25, y - 13, x + 45, y - 12, hex('#c84a3a')); R.rect(x + 40, y - 20, x + 46, y - 12, hex('#8a1e1e'));
  R.linea(x + 22, y - 1, x + 48, y - 1, hex('#c8a040')); R.pset(x + 21, y - 2, hex('#c8a040')); R.pset(x + 49, y - 2, hex('#c8a040'));
  R.actor(ABRIGO, x + 28, y - 8, t, { dir: -1, quieto: true }); R.rect(x + 25, y - 13, x + 45, y - 5, hex('#a82a2a')); R.rect(x + 25, y - 13, x + 45, y - 12, hex('#c84a3a')); R.rect(x + 26, y - 11, x + 44, y - 9, hex('#4a3a6a'));
  for (let k = 0; k < 4; k++) R.pset(x + 50 + k * 3 + Math.round(Math.sin(t * 9 + k)), y - 1 - (k % 2), hex('#eef2fa'));
};
const nieve = (t, n, v) => { for (let k = 0; k < n; k++) { const cap = k % 3, sp = v * (0.6 + cap * 0.4), x = Math.round(((h(k, 1, 12) * 340 + Math.sin(t * 0.8 + k) * 6 - t * 6 * (cap + 1)) % 340 + 340) % 340) - 10, y = Math.round((h(k, 2, 12) * 190 + t * sp) % 190) - 5; R.pset(x, y, cap === 2 ? T.C.blanco : hex('#d8e0f0')); if (cap === 2) R.pset(x + 1, y, hex('#c8d0e4')); } };
const p1 = (t) => {
  R.copiar(inviernoFijo());
  for (let k = 0; k < 30; k++) { const x = Math.floor(h(k, 3, 13) * 320), y = Math.floor(h(k, 4, 13) * 70); if (Math.sin(t * 2 + k * 1.7) > 0.4 && !(x > 272 && y < 48) && !(x > 248 && x < 268 && y > 12 && y < 32) && !(x > 140 && x < 180 && y < 22)) R.pset(x, y, hex('#e8ecf8')); }
  // las nubes de noche delante de la luna, a tres velocidades
  for (const [v, y, w, col] of [[2.5, 26, 30, '#2e3660'], [4, 40, 22, '#363e6c'], [6, 18, 16, '#283058']]) { const x = ((t * v + y * 7) % 380) - 40; R.poligono([[x, y], [x + w, y], [x + w - 5, y - 4], [x + 8, y - 6]], hex(col)); R.linea(x + 8, y - 6, x + w - 5, y - 4, hex('#4a5486')); }
  // el humo de las chimeneas
  for (const cx of [88, 236]) for (let k = 0; k < 5; k++) { const u = (t * 0.35 + k / 5) % 1; R.disco(Math.round(cx + u * 14 + Math.sin(u * 5 + k)), Math.round(24 - u * 14), 1 + u * 2, u < 0.5 ? hex('#4a5070') : hex('#3a4062')); }
  // el reloj de la torre corre todo el invierno y se para en las doce en «1906»
  const vueltas = t < Y1906 ? (t / Y1906) * 5.75 : 6, am = vueltas * 6.283, ah = am / 12;
  R.linea(160, 33, Math.round(160 + Math.sin(am) * 5), Math.round(33 - Math.cos(am) * 5), K); R.linea(160, 33, Math.round(160 + Math.sin(ah) * 3), Math.round(33 - Math.cos(ah) * 3), K); R.pset(160, 33, hex('#8a6a3a'));
  if (t > Y1906 && t < Y1906 + 0.6) for (let k = 0; k < 8; k++) { const an = k / 8 * 6.28, rr = 10 + (t - Y1906) * 12; R.pset(Math.round(160 + Math.cos(an) * rr), Math.round(33 + Math.sin(an) * rr * 0.8), hex('#f8e8a0')); }
  // el ventanal: dentro, tres representantes escriben las reglas a la luz de la lámpara
  R.recorte([136, 70, 184, 127]);
  R.rect(136, 66, 184, 127, hex('#c89a58')); for (let y = 70; y < 128; y += 6) R.linea(136, y, 184, y, hex('#b88a4a'));
  R.rect(138, 72, 150, 88, hex('#5a3a20')); for (let y = 74; y < 88; y += 3) R.rect(139, y, 149, y + 1, hex(['#8a2a2a', '#2a4a7a', '#3a6a3a', '#a88030'][(y >> 1) % 4]));
  discoS(160, 70, 11, (x, y, d) => (trama(x, y, 1 - d) ? hex('#f8d888') : null));
  [138, 154, 170].forEach((x, k) => R.actor({ ...EL.rector, pal: { ...EL.rector.pal, ...pal(k === 1 ? { H: '#5a3a24', h: '#7a5434' } : k === 2 ? { H: '#2a2024', h: '#4a3a3a' } : {}) } }, x, 126, t, { dir: k === 2 ? -1 : 1, habla: Math.sin(t * 5 + k * 2) > 0.6, dedo: k === 1 && Math.sin(t * 1.7) > 0.3 }));
  R.rect(136, 116, 184, 127, hex('#5a3a20')); R.rect(136, 116, 184, 117, hex('#7a5232'));
  for (let k = 0; k < 4; k++) { const px = 140 + k * 11, lev = Math.sin(t * 3 + k) > 0.8 ? 1 : 0; R.rect(px, 114 - lev, px + 7, 115 - lev, hex('#f2eee2')); }
  R.linea(160, 104, 160, 113, hex('#c8a040')); R.rect(156, 101, 164, 104, hex('#2a7a3a')); R.rect(155, 114, 165, 115, hex('#a88030'));
  R.recorte(null);
  R.rect(159, 70, 160, 127, hex('#e8e0d0')); R.rect(136, 100, 184, 100, hex('#e8e0d0')); R.rect(135, 70, 135, 127, hex('#e8e0d0')); R.rect(185, 70, 185, 127, hex('#e8e0d0'));
  // la farola parpadea y su luz cae en la nieve
  const fl = Math.sin(t * 9) > 0.6 ? 1 : 0; discoS(291, 100, 9 + fl, (x, y, d) => (d > 0.55 && trama(x, y, (1 - d) * 0.9) && (x < 286 || x > 296 || y < 96 || y > 104) ? hex('#f2d890') : null));
  for (let x = 270; x < 314; x++) for (let y = 156; y < 168; y++) if (((x - 291) / 22) ** 2 + ((y - 162) / 6) ** 2 < 1 && trama(x, y, 0.4)) R.pset(x, y, hex('#f2e8c8'));
  // el representante llega por el camino nevado con los papeles y entra: la puerta se abre y suelta luz
  const u = tramo(t, 0.3, ENTRA), px = Math.round(u < 0.6 ? lerp(-18, 70, u / 0.6) : lerp(70, 101, (u - 0.6) / 0.4)), py = Math.round(u < 0.6 ? lerp(176, 160, u / 0.6) : lerp(160, 140, (u - 0.6) / 0.4));
  const abre = tramo(t, ENTRA - 0.5, ENTRA - 0.1) - tramo(t, ENTRA + 0.6, ENTRA + 1.0), dentro = t > ENTRA + 0.35;
  R.rect(100, 112, 116, 139, hex('#3a2014')); if (abre > 0) { const w = Math.round(abre * 14); R.rect(101, 113, 101 + w, 139, hex('#f8d888')); for (let y = 140; y < 156; y++) for (let x = 100; x < 117 + (y - 140); x++) if (trama(x, y, abre * 0.6 * (1 - (y - 140) / 16))) R.pset(x - Math.round((y - 140) * 0.3), y, hex('#f8e8b8')); }
  R.rect(100 + Math.round(abre * 14), 112, 116, 139, hex('#4a2a18')); R.rect(102 + Math.round(abre * 14), 116, 114, 124, hex('#3a2014')); R.pset(113, 126, hex('#c8a040'));
  R.rect(106, 104, 110, 108, hex('#f8d888')); R.pset(108, 103, K);
  if (!dentro) { R.actor(ABRIGO, px, py, t, { dir: 1, anda: u > 0 && u < 1 }); R.rect(px + 9, py - 12, px + 15, py - 9, hex('#f2eee2')); R.linea(px + 9, py - 11, px + 15, py - 11, hex('#c8c0b0')); R.rect(px + 9, py - 9, px + 15, py - 9, hex('#8a2a2a')); }
  // el trineo pasa por delante, y la nieve que cae sobre todo
  const s = tramo(t, 0.2, 4.4); trineo(Math.round(lerp(340, -60, s)), 176, t);
  nieve(t, 120, 14);
};

// 2 · el libro de reglas: la flecha hacia delante, por primera vez
const p2 = (t) => {
  T.casaBlanca(R, t, { encuadre: 'reglas', flecha: tramo(t, FLECHA0, FORWARD), zona: 0 });
  // la taza de té que humea en la esquina de la mesa
  R.disco(16, 112, 9, hex('#2a1c14')); R.disco(16, 112, 8, hex('#e8e4d8')); R.disco(16, 112, 6, hex('#d0ccc0')); R.disco(16, 112, 5, hex('#8a4a24')); R.pset(14, 110, hex('#b8743c')); R.rect(25, 108, 28, 114, hex('#e8e4d8')); R.rect(26, 109, 27, 113, hex('#2a1c14'));
  for (let k = 0; k < 7; k++) { const u = (t * 0.45 + k / 7) % 1; R.pset(Math.round(16 + Math.sin(u * 6 + k) * 2.5), Math.round(104 - u * 26), u < 0.4 ? hex('#e8e4dc') : hex('#b8a890')); }
  // la tinta fresca brilla en la punta de la flecha cuando llega
  const br = t - FORWARD; if (br > 0 && br < 0.8) for (let k = 0; k < 8; k++) { const an = k / 8 * 6.28, rr = 3 + br * 8; R.pset(Math.round(252 + Math.cos(an) * rr), Math.round(52 + Math.sin(an) * rr), k % 2 ? hex('#f8e8a0') : T.C.blanco); }
};

// 3 · el aula del comité y la pizarra (fondo local)
let clase = null;
const claseFijo = () => {
  if (clase) return clase;
  clase = R.nuevo(); const prev = R.usar(clase);
  // la pared de yeso verde gris con desconchones, el friso de madera machihembrada
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 20); R.pset(x, y, n < 0.06 ? hex('#8e9886') : n > 0.95 ? hex('#bcc4b4') : trama(x, y, 0.3 + y / 400) ? hex('#a4ae9c') : hex('#9aa492')); }
  R.rect(0, 0, 319, 5, hex('#d8d4c4')); R.rect(0, 6, 319, 6, hex('#8e8a7a'));
  for (let x = 0; x < 320; x++) for (let y = 120; y < 140; y++) R.pset(x, y, x % 6 === 0 ? hex('#4a3420') : x % 6 === 1 ? hex('#8a6440') : h(x, y >> 2, 21) < 0.2 ? hex('#6a4a2c') : hex('#7a5634'));
  R.rect(0, 118, 319, 119, hex('#5a3e24')); R.rect(0, 117, 319, 117, hex('#9a7450'));
  // la pizarra con su marco de roble, las sombras del borrado y la repisa con tizas
  R.rect(22, 20, 252, 116, hex('#6a4420')); R.rect(23, 21, 251, 115, hex('#8a5a2a')); R.rect(23, 21, 251, 21, hex('#a87038'));
  for (let y = 25; y < 112; y++) for (let x = 27; x < 248; x++) { const n = h(x >> 2, y >> 2, 22), m = h(x, y, 23); R.pset(x, y, n < 0.15 && m < 0.5 ? hex('#3a4c42') : m < 0.04 ? hex('#44564a') : hex('#2e3e36')); }
  for (let k = 0; k < 5; k++) { const y = 34 + k * 16; for (let x = 40 + k * 20; x < 120 + k * 22; x++) if (h(x, k, 24) < 0.5) R.pset(x, y + Math.round(Math.sin(x * 0.2) * 2), hex('#3e5046')); }
  R.rect(20, 112, 254, 116, hex('#7a4e24')); R.rect(20, 112, 254, 112, hex('#a87038')); R.rect(20, 117, 254, 117, hex('#3e2810'));
  for (const [x, w] of [[60, 5], [72, 3], [200, 4]]) R.rect(x, 110, x + w, 111, hex('#f2f2ea'));
  R.rect(226, 107, 240, 111, hex('#3a2a1c')); R.rect(226, 107, 240, 108, hex('#c8c0b0'));
  // la tarima bajo la pizarra
  R.rect(110, 138, 260, 146, hex('#5a3e24')); R.rect(110, 138, 260, 139, hex('#9a7450')); for (let x = 112; x < 260; x += 18) R.rect(x, 140, x, 146, hex('#3e2810'));
  // el reloj, la ventana con su radiador y el perchero
  R.disco(264, 30, 8, K); R.disco(264, 30, 7, hex('#f2eadc')); discoS(264, 30, 7, (x, y) => (Math.hypot(x - 264, y - 30) > 6 ? hex('#6a4420') : null)); for (let k = 0; k < 12; k++) { const an = k / 12 * 6.28; R.pset(Math.round(264 + Math.cos(an) * 5), Math.round(30 + Math.sin(an) * 5), hex('#5a5a5a')); }
  R.rect(262, 48, 312, 112, hex('#e8e0d0')); R.rect(262, 112, 314, 115, hex('#d8d0c0'));
  R.rect(266, 122, 308, 140, hex('#5a5e66')); for (let x = 268; x < 308; x += 4) { R.rect(x, 121, x + 2, 140, hex('#8a8e96')); R.rect(x, 121, x, 140, hex('#a8acb4')); } R.rect(266, 139, 308, 140, hex('#3a3e46'));
  R.rect(8, 56, 10, 138, hex('#4a3020')); R.rect(4, 136, 14, 139, hex('#4a3020')); R.rect(4, 58, 14, 59, hex('#4a3020'));
  R.poligono([[4, 60], [12, 60], [14, 96], [2, 96]], hex('#2a2a34')); R.linea(8, 62, 8, 94, hex('#1c1c24')); R.rect(2, 52, 14, 56, hex('#2a2024')); R.rect(4, 46, 12, 52, hex('#2a2024')); R.rect(4, 50, 12, 51, hex('#5a2a2a'));
  R.poligono([[10, 64], [16, 64], [18, 92], [12, 92]], hex('#5a4a3a')); for (let k = 0; k < 4; k++) R.pset(3 + k * 3, 58, hex('#e8eef8'));
  // el suelo de tablas y la mesa de la izquierda con los papeles
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { if (x >= 110 && x <= 260 && y <= 146) continue; const tb = (y - 140) >> 3, jn = (x + tb * 37) % 64 === 0; R.pset(x, y, (y - 140) % 8 === 0 || jn ? hex('#5a3e24') : h(x >> 2, y, 25) < 0.25 ? hex('#7a5634') : hex('#8a6440')); }
  R.usar(prev); return clase;
};
const tiza = (x0, y0, x1, y1, n = 0, p = 1) => { const L = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0))), m = Math.round(L * p); for (let k = 0; k <= m; k++) { if (n && (k % n) >= n / 2) continue; const x = Math.round(x0 + (x1 - x0) * k / L), y = Math.round(y0 + (y1 - y0) * k / L); if (h(x, y, 26) < 0.85) R.pset(x, y, hex('#e4e8de')); } };
const circ = (x, y, rr) => { for (let k = 0; k < 14; k++) { const an = k / 14 * 6.28; if (h(k, x, 27) < 0.9) R.pset(Math.round(x + Math.cos(an) * rr), Math.round(y + Math.sin(an) * rr), hex('#e4e8de')); } };
const cruz = (x, y, rr = 2) => { tiza(x - rr, y - rr, x + rr, y + rr); tiza(x - rr, y + rr, x + rr, y - rr); };
const p3 = (t) => {
  R.copiar(claseFijo());
  // la nieve por la ventana, recortada al cristal
  R.recorte([264, 50, 310, 110]);
  R.poligono([[264, 50], [310, 50], [310, 110], [264, 110]], (x, y) => (trama(x, y, (y - 50) / 80) ? hex('#c8d0dc') : hex('#aab4c4')));
  R.poligono([[264, 92], [310, 86], [310, 110], [264, 110]], hex('#e8eef6')); R.rect(268, 70, 276, 92, hex('#6a3030')); R.rect(290, 64, 304, 88, hex('#5e2a2c')); R.poligono([[266, 70], [278, 70], [272, 64]], hex('#e8eef8'));
  for (let k = 0; k < 24; k++) { const x = 264 + Math.round(((h(k, 5, 28) * 46) + Math.sin(t + k) * 3 + 46) % 46), y = 50 + Math.round((h(k, 6, 28) * 60 + t * (8 + (k % 3) * 4)) % 60); R.pset(x, y, T.C.blanco); }
  R.recorte(null);
  R.rect(286, 50, 287, 110, hex('#e8e0d0')); R.rect(264, 80, 310, 81, hex('#e8e0d0'));
  // el vapor del radiador y las agujas del reloj
  for (let k = 0; k < 5; k++) { const u = (t * 0.6 + k / 5) % 1; R.pset(Math.round(272 + k * 8 + Math.sin(u * 7) * 2), Math.round(119 - u * 10), hex('#c8ccd0')); }
  R.linea(264, 30, 264, 25, K); R.linea(264, 30, Math.round(264 + Math.cos(t * 0.5) * 4), Math.round(30 + Math.sin(t * 0.5) * 4), K);
  // la pizarra: el campo, la línea de melé, los dos equipos
  tiza(40, 30, 236, 30); tiza(40, 104, 236, 104); tiza(40, 30, 40, 104); tiza(236, 30, 236, 104);
  tiza(120, 32, 120, 102, 4);
  for (let k = 0; k < 7; k++) { circ(112, 41 + k * 9, 2.5); cruz(130, 41 + k * 9); }
  circ(84, 68, 2.5); cruz(200, 46); cruz(204, 88); cruz(168, 70);
  const LANZ = [84, 68], REC = [186, 50];
  circ(REC[0], REC[1], 2.5);
  // el pase de tiza: la trayectoria se dibuja y el balón cae corto en «missed pass»
  const vp = tramo(t, R3 + 0.4, MISSED + 0.1), pt = (u) => [lerp(LANZ[0], REC[0], u), lerp(LANZ[1], REC[1], u) - Math.sin(Math.PI * u) * 14];
  for (let k = 1; k <= Math.round(vp * 18); k++) { if (k % 2) continue; const [x0, y0] = pt((k - 1) / 18 * 0.7), [x1, y1] = pt(k / 18 * 0.7); tiza(x0, y0, x1, y1); }
  const bu = Math.min(0.7, vp * 0.7), [bx, by] = pt(bu), cae = tramo(t, MISSED, MISSED + 0.4);
  const BX = Math.round(bx), BY = Math.round(by + cae * 10);
  if (vp > 0) { R.rect(BX - 2, BY - 1, BX + 2, BY + 1, hex('#e4e8de')); R.pset(BX - 3, BY, hex('#e4e8de')); R.pset(BX + 3, BY, hex('#e4e8de')); R.pset(BX, BY, hex('#2e3e36')); }
  if (cae >= 1) for (const [dx, dy] of [[-5, 2], [-4, -2], [5, 2], [4, -2], [0, 4]]) R.pset(BX + dx, BY + dy, hex('#e4e8de'));
  // «cost you the ball»: un círculo alrededor del balón y la flecha que lo lleva al rival
  const pierde = tramo(t, COST, BALL);
  if (pierde > 0) { for (let k = 0; k < Math.round(pierde * 18); k++) { const an = k / 18 * 6.28; R.pset(Math.round(BX + Math.cos(an) * 7), Math.round(BY + Math.sin(an) * 5), hex('#f2d860')); }
    const fl = tramo(t, BALL - 0.2, BALL + 0.4); if (fl > 0) { tiza(BX + 6, BY, BX + 6 + fl * 24, BY + fl * 8); if (fl >= 1) { tiza(BX + 30, BY + 8, BX + 26, BY + 4); tiza(BX + 30, BY + 8, BX + 25, BY + 10); circ(168, 70, 5); } } }
  // «middle of the line»: la zona del centro se raya y se tacha
  const zr = tramo(t, COULDNT + 0.2, MIDDLE);
  if (zr > 0) { tiza(121, 56, 150, 56); tiza(121, 84, 150, 84); tiza(150, 56, 150, 84); R.recorte([121, 57, 149, 83]); for (let k = 0; k < Math.round(zr * 14); k++) tiza(121 + k * 4, 84, 121 + k * 4 - 28, 56); R.recorte(null); }
  const tx = tramo(t, MIDDLE, MIDDLE + 0.35); if (tx > 0) { const n = tx * 2; for (let g = 0; g < 2; g++) { const a1 = Math.min(1, n), a2 = Math.max(0, n - 1); R.linea(117 + g, 52, Math.round(117 + g + 37 * a1), Math.round(52 + 36 * a1), hex('#f2d860')); if (a2 > 0) R.linea(154 + g, 52, Math.round(154 + g - 37 * a2), Math.round(52 + 36 * a2), hex('#f2d860')); } }
  // el que explica, en la tarima, se mueve hacia lo que señala con el puntero
  const objetivo = t < MISSED ? [140, 60] : t < COULDNT ? [BX, BY] : [136, 70];
  const ex = Math.round(t < MISSED ? lerp(196, 170, tramo(t, R3, R3 + 0.8)) : t < COULDNT ? 170 : lerp(170, 160, tramo(t, COULDNT, COULDNT + 0.6))), es = 139;
  const habla = Math.sin(t * 7) > 0, golpe = t > MIDDLE && t < MIDDLE + 0.3 ? 3 : 0;
  R.actor({ ...EL.rector, pal: { ...EL.rector.pal, ...pal({ H: '#5a3a24', h: '#7a5434' }) } }, ex, es, t, { dir: -1, dedo: true, habla });
  const hx = ex + 1, hy = es - 29, dxp = objetivo[0] - hx, dyp = objetivo[1] - hy, L = Math.hypot(dxp, dyp), lp = Math.min(L - 2 - golpe, 46);
  const pxp = Math.round(hx + dxp / L * lp), pyp = Math.round(hy + dyp / L * lp); R.linea(hx, hy, pxp, pyp, hex('#5a3418')); R.pset(pxp, pyp, hex('#e8e4d8'));
  // polvo de tiza que cae
  for (let k = 0; k < 6; k++) { const u = (t * 0.7 + k / 6) % 1; R.pset(Math.round(pxp + Math.sin(k * 3 + t) * 3), Math.round(pyp + u * 22), hex('#bcc4b4')); }
  // los demás, en la mesa, toman nota; el de la derecha escucha
  [30, 62].forEach((x, k) => R.actor({ ...EL.rector, pal: { ...EL.rector.pal, ...pal(k ? { H: '#2a2024', h: '#4a3a3a' } : {}) } }, x, 168, t, { dir: 1, sorpresa: k === 0 && t > MISSED && t < MISSED + 0.7, habla: k === 1 && t > BALL && t < BALL + 0.8 }));
  R.rect(14, 158, 104, 162, hex('#5a3418')); R.rect(14, 158, 104, 158, hex('#8a5a34')); R.rect(18, 163, 22, 180, hex('#3e2410')); R.rect(96, 163, 100, 180, hex('#3e2410')); R.rect(14, 163, 104, 165, hex('#4a2c14'));
  for (const [px, k] of [[34, 0], [66, 1]]) { R.rect(px + 4, 155, px + 14, 157, hex('#f2eee2')); for (let j = 0; j < 3; j++) R.linea(px + 5, 156, px + 5 + ((t * 3 + j + k) % 8), 156, hex('#5a5a6a')); R.linea(px + 12 + Math.round(Math.sin(t * 9 + k)), 154, px + 15, 150, hex('#2a2430')); }
  R.rect(82, 153, 86, 157, K); R.rect(83, 154, 85, 156, hex('#2a2a4a'));
  // la papelera con bolas de papel y la cartera de cuero en el suelo
  R.rect(124, 160, 134, 174, K); R.rect(125, 161, 133, 173, hex('#8a7a5a')); for (let y = 162; y < 173; y += 3) R.linea(125, y, 133, y, hex('#6a5a3e')); R.disco(129, 159, 3, hex('#f2eee2')); R.pset(128, 158, hex('#c8c0b0'));
  for (const [x, y] of [[142, 172], [114, 176], [150, 168]]) { R.disco(x, y, 2, hex('#e8e4d8')); R.pset(x - 1, y - 1, hex('#c8c0b0')); }
  R.rect(212, 164, 228, 176, K); R.rect(213, 165, 227, 175, hex('#6a3a1c')); R.rect(213, 165, 227, 167, hex('#8a5230')); R.rect(218, 161, 222, 164, K); R.pset(220, 170, hex('#c8a040'));
  R.actor(ABRIGO, 270, 172, t, { dir: -1, sonrisa: false, habla: t > MIDDLE + 0.3 && Math.sin(t * 6) > 0 });
};

// 4 · un equipo cualquiera prueba el pase con miedo (westPoint 'campo')
const GRANA = pal({ C: '#7a2a3a', c: '#f2eee2', W: '#7a2a3a' }), VERDE = pal({ C: '#2a6a3a', c: '#c8c0a8', W: '#2a6a3a' });
const ARB = { ...EL.periodista, pal: { ...EL.periodista.pal, ...pal({ C: '#e8e4d8', c: '#c8c4b8', W: '#e8e4d8' }) } };
const p4 = (t) => {
  T.westPoint(R, t, { encuadre: 'campo', defensas: false });
  const SNAP = R4 + 0.6, SUELTA = TIMID, CAE = TIMID + 0.45, COGE2 = CAE + 0.55;
  const ys = [128, 136, 144, 152, 160];
  // las dos líneas frente a frente
  const lista = [];
  ys.forEach((y, k) => { lista.push([EL.jugador1905, 146 - (k % 2) * 2, y, { dir: 1, pal: GRANA, triste: t > CAE && k !== 2, sorpresa: t > SUELTA && t < CAE && k === 2 }]); });
  ys.forEach((y, k) => { if (k === 2 && t > CAE) return; lista.push([EL.jugador1905, 166 + (k % 2) * 2, y, { dir: -1, pal: VERDE, sonrisa: t > COGE2 }]); });
  // el pasador retrocede, duda y suelta un pase cortito
  const atras = tramo(t, SNAP, SNAP + 0.9), px = Math.round(lerp(112, 98, atras)), py = 144;
  lista.push([EL.jugador1905, px, py, { dir: 1, pal: GRANA, anda: atras > 0 && atras < 1, sorpresa: t > SNAP + 1 && t < SUELTA, dedo: t > SUELTA - 0.2 && t < SUELTA + 0.3, triste: t > CAE }]);
  // el receptor que espera solo a lo lejos
  lista.push([EL.jugador1905, 214, 126, { dir: -1, pal: GRANA, brazos: t > SNAP + 0.6 && t < CAE, triste: t > CAE }]);
  // el rival recoge el balón y se va corriendo
  const huye = tramo(t, COGE2, R5 + 0.2), rx = Math.round(lerp(130, 330, huye));
  if (t > CAE) lista.push([EL.jugador1905, t < COGE2 ? Math.round(lerp(168, 130, tramo(t, CAE, COGE2))) : rx, 146, { dir: t < COGE2 ? -1 : 1, pal: VERDE, anda: true, sonrisa: true }]);
  // el árbitro, en la banda de acá, pita la jugada
  lista.push([ARB, 236, 168, { dir: -1, dedo: t > SNAP - 0.1 && t < SNAP + 0.6, habla: t > SNAP - 0.1 && t < SNAP + 0.6 }]);
  lista.sort((p, q) => p[2] - q[2]).forEach(([d, x, y, o]) => R.actor(d, x, y, t, o));
  // el balón: en las manos, un vuelo de nada, el bote y en las manos del rival
  let bx, by;
  if (t < SUELTA) { bx = px + 14; by = py - 13; }
  else if (t < CAE) { const u = (t - SUELTA) / (CAE - SUELTA); bx = lerp(px + 14, 128, u); by = lerp(py - 13, 147, u) - Math.sin(Math.PI * u) * 8; }
  else if (t < COGE2) { const u = (t - CAE) / (COGE2 - CAE); bx = 128 + u * 4; by = 147 - Math.abs(Math.sin(u * 6)) * 4 * (1 - u); }
  else { bx = rx + 13; by = 133; }
  T.balon(R, Math.round(bx), Math.round(by), t, { epoca: '1906', ang: t > SUELTA && t < COGE2 ? t * 4 : 0 });
};

// 5 · Saint Louis: Cochems y el pase de verdad (campo1906 'entreno')
const SLU = pal({ C: '#2a4a8a', c: '#f2eee2', W: '#2a4a8a' });
const p5 = (t) => {
  T.campo1906(R, t, { encuadre: 'entreno', vecino: 0.3 * tramo(t, R6 - 0.9, R6 - 0.1) });
  const PITO = R5 + 0.35, LANZA = MADE + 0.15, ATRAPA = WEAPON + 0.35;
  // al fondo, uno placa al muñeco una y otra vez
  const pl = (t * 0.8) % 1, px = Math.round(66 - (pl > 0.7 ? (pl - 0.7) / 0.3 * 10 : 0));
  R.actor(EL.robinson, px, 150, t, { dir: -1, pal: SLU, anda: pl < 0.7 });
  // Cochems pita, se presenta y señala al receptor
  R.actor(EL.cochems, 148, 168, t, { dir: t < EDDIE ? -1 : 1, dedo: (t > PITO && t < PITO + 0.6) || (t > EDDIE && t < EDDIE + 0.8) || (t > MADE - 0.1 && t < ATRAPA), habla: t > PITO && t < PITO + 0.6 || (t > EDDIE && Math.sin(t * 6) > 0 && t < MADE), sonrisa: t > ATRAPA });
  if (t > PITO && t < PITO + 0.6) { R.rect(147, 154, 149, 155, hex('#c8c8d0')); }
  // Robinson lanza en espiral y Schneider la atrapa en carrera
  const corre = tramo(t, EDDIE - 0.3, ATRAPA), sx = Math.round(lerp(130, 236, corre)), sy = Math.round(lerp(158, 152, corre));
  R.actor(EL.robinson, 92, 160, t, { dir: 1, dedo: t > LANZA - 0.4 && t < LANZA + 0.3, sonrisa: t > ATRAPA });
  R.actor(EL.schneider, sx, sy, t, { dir: 1, anda: corre > 0 && corre < 1, brazos: t > ATRAPA - 0.3 && t < ATRAPA + 0.4, salto: t > ATRAPA + 0.3 && t < ATRAPA + 0.8 ? 3 : 0, sonrisa: t > ATRAPA });
  const vu = tramo(t, LANZA, ATRAPA);
  if (t < LANZA) T.balon(R, 105, 150, t, { epoca: '1906', ang: -0.4 });
  else if (vu < 1) T.balon(R, Math.round(lerp(106, 248, vu)), Math.round(lerp(140, 136, vu) - Math.sin(Math.PI * vu) * 34), t, { epoca: '1906', ang: -0.5 + vu * 1.0, gira: 3, estela: 0.6 });
  else T.balon(R, sx + 14, sy - 12, t, { epoca: '1906', ang: 0.2 });
};

// 6 · al otro lado de la valla: el patio del vecino (fondo local)
let patio = null;
const patioFijo = () => {
  if (patio) return patio;
  patio = R.nuevo(); const prev = R.usar(patio);
  // el cielo de verano tramado
  for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) R.pset(x, y, trama(x, y, y / 110) ? hex('#8ec0ec') : hex('#6aa4e2'));
  // los árboles y la torre de la universidad, al otro lado
  R.rect(56, 34, 78, 96, hex('#8a3a2a')); for (let y = 36; y < 96; y += 4) R.linea(56, y, 78, y, hex('#6a2a1e')); R.poligono([[52, 36], [82, 36], [67, 18]], hex('#4a4a5a')); R.rect(62, 46, 72, 58, hex('#2a2a3a')); R.rect(66, 46, 67, 58, hex('#e8e0d0'));
  for (let x = 0; x < 320; x++) { const top = 70 + Math.round(Math.sin(x * 0.09) * 6 + Math.sin(x * 0.31) * 3 + h(x >> 2, 1, 30) * 4); for (let y = top; y < 96; y++) R.pset(x, y, h(x >> 1, y >> 1, 31) < 0.3 ? hex('#3a6a2a') : (x + y) % 7 === 0 ? hex('#5a8a3a') : hex('#4a7a32')); }
  // la valla vista por detrás: tablas grises con vetas, nudos y clavos
  for (let x = 0; x < 320; x++) for (let y = 80; y < 128; y++) { const tb = Math.floor(x / 10), xi = x % 10, top = 80 + (tb % 3 === 0 ? 0 : tb % 3 === 1 ? 1 : 2); if (y < top) continue; const n = h(x, y >> 2, 32 + tb); R.pset(x, y, xi === 0 ? hex('#4a4038') : xi === 9 ? hex('#5e5448') : n < 0.15 ? hex('#6a5e50') : (y + tb * 3) % 11 === 0 ? hex('#7a6e5e') : hex('#8a7e6c')); if (y === top) R.pset(x, y, hex('#a8a090')); }
  for (let tb = 0; tb < 32; tb++) { R.pset(tb * 10 + 4, 88, hex('#3a3a3a')); R.pset(tb * 10 + 5, 118, hex('#3a3a3a')); if (h(tb, 1, 33) < 0.4) R.disco(tb * 10 + 5, 100 + Math.round(h(tb, 2, 33) * 12), 1.5, hex('#5a4a3a')); }
  // la casa de tablas blancas con su ventana y el porche, a la derecha (por debajo de la zona de Atom)
  R.poligono([[252, 50], [320, 50], [320, 46], [256, 46]], hex('#5a3a2a'));
  for (let y = 50; y < 150; y++) for (let x = 258; x < 320; x++) R.pset(x, y, (y - 50) % 5 === 0 ? hex('#b8b4a8') : (y - 50) % 5 === 4 ? hex('#d8d4c8') : hex('#ece8dc'));
  R.rect(272, 64, 300, 92, hex('#3a5a3a')); R.rect(274, 66, 298, 90, hex('#c8dce8')); R.rect(285, 66, 286, 90, hex('#ece8dc')); R.rect(274, 77, 298, 78, hex('#ece8dc')); R.linea(276, 68, 282, 74, hex('#f2f8fc')); R.rect(270, 92, 302, 94, hex('#3a5a3a'));
  R.rect(262, 92, 270, 150, hex('#3a5a3a')); R.rect(304, 64, 318, 92, hex('#3a5a3a'));
  R.rect(252, 140, 320, 150, hex('#8a6a4a')); R.rect(252, 140, 320, 141, hex('#a8845a')); for (let k = 0; k < 3; k++) R.rect(250 - k * 4, 150 + k * 5, 320, 154 + k * 5, k % 2 ? hex('#7a5a3a') : hex('#8a6a4a'));
  // el barril de la lluvia
  R.rect(236, 122, 250, 148, K); R.rect(237, 123, 249, 147, hex('#7a5232')); for (const y of [126, 135, 144]) R.rect(237, y, 249, y, hex('#3a3a3a')); R.rect(237, 123, 249, 124, hex('#3a5a7a'));
  // la hierba del patio con matas, el huerto con tomateras y estacas, el poste del tendedero
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { if (x >= 250 && y < 160) continue; const n = h(x, y, 34); R.pset(x, y, n < 0.12 ? hex('#4a7a2a') : n > 0.9 ? hex('#8aba4a') : trama(x, y, 0.4 + (y - 128) / 140) ? hex('#6a9a3a') : hex('#5e8e34')); }
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 3, 35) * 320), y = 132 + Math.floor(h(k, 4, 35) * 46); R.pset(x, y, hex('#3a6a22')); R.pset(x + 1, y - 1, hex('#3a6a22')); R.pset(x - 1, y - 1, hex('#5a8a2e')); }
  for (let row = 0; row < 3; row++) { const y = 150 + row * 9; R.rect(8, y + 2, 120, y + 4, hex('#6a4a2a')); for (let x = 14; x < 118; x += 14) { R.rect(x, y - 14, x, y + 2, hex('#a8845a')); for (let k = 0; k < 6; k++) R.disco(x + (k % 2 ? 2 : -2), y - 2 - k * 2, 2, k % 2 ? hex('#3a7a2a') : hex('#4a8a32')); R.disco(x + 3, y - 6, 1.5, hex('#d83a2a')); R.disco(x - 3, y - 2, 1.5, hex('#e84a2a')); } }
  R.rect(176, 52, 178, 150, hex('#6a4a2a')); R.rect(170, 52, 184, 54, hex('#6a4a2a')); R.rect(176, 52, 178, 52, hex('#8a6a3a'));
  // el cajón de madera junto al hueco de la valla y la regadera
  R.rect(148, 140, 166, 154, K); R.rect(149, 141, 165, 153, hex('#a8845a')); R.linea(149, 147, 165, 147, hex('#7a5a3a')); R.linea(149, 141, 165, 153, hex('#8a6a44'));
  R.rect(126, 160, 136, 168, hex('#6a7a8a')); R.linea(136, 162, 142, 158, hex('#6a7a8a')); R.rect(128, 158, 134, 159, hex('#8a9aaa'));
  R.usar(prev); return patio;
};
const gallina = (x, y, t, k) => { const pica = Math.sin(t * 3 + k * 2) > 0.5, d = k % 2 ? 1 : -1; R.disco(x, y - 4, 4, hex('#f2eee2')); R.disco(x - d * 2, y - 5, 3, hex('#e8e0d0')); const hx = x + d * (pica ? 5 : 4), hy = y - (pica ? 3 : 8); R.disco(hx, hy, 2, hex('#f2eee2')); R.pset(hx, hy - 2, hex('#d83a2a')); R.pset(hx + d * 2, hy, hex('#e8a030')); R.pset(hx + d, hy - 1, K); R.pset(x - 1, y, hex('#e8a030')); R.pset(x + 1, y, hex('#e8a030')); R.pset(x - d * 5, y - 7, hex('#d8d0c0')); };
const p6 = (t) => {
  R.copiar(patioFijo());
  // el sol de verano y las nubes de tres tonos a tres velocidades (por debajo de la barra y de Atom)
  discoS(212, 26, 9, (x, y, d) => (d > 0.75 ? (trama(x, y, 0.5) ? hex('#f8f0c0') : null) : hex('#fff8d8')));
  for (const [v, y, w, cs] of [[3, 30, 34, ['#ffffff', '#e8eef8', '#c8d4e8']], [5, 52, 26, ['#f8fafc', '#dce6f2', '#b8c8de']], [8, 20, 18, ['#ffffff', '#e2eaf4', '#c4d0e4']]]) {
    const x = ((t * v + y * 9) % 360) - 40; if (x + w > 272 && y < 46) continue;
    R.disco(x + w * 0.3, y, w * 0.22, hex(cs[2])); R.disco(x + w * 0.55, y - 3, w * 0.26, hex(cs[1])); R.disco(x + w * 0.5, y - 4, w * 0.2, hex(cs[0])); R.disco(x + w * 0.8, y, w * 0.18, hex(cs[1])); R.rect(x + w * 0.1, y, x + w * 0.95, y + 2, hex(cs[2])); }
  for (let k = 0; k < 3; k++) { const bx = ((t * 18 + k * 40) % 360) - 20, by = 40 + k * 6 + Math.round(Math.sin(t * 3 + k) * 2); if (bx > 270) continue; const al = Math.floor(t * 6 + k) % 2; R.pset(bx, by, K); R.pset(bx - 1, by - al, K); R.pset(bx + 1, by - al, K); R.pset(bx - 2, by - 1 + al, K); R.pset(bx + 2, by - 1 + al, K); }
  // el hueco de la tabla suelta: se ve un poco de campo y pasa un jugador
  R.rect(150, 82, 158, 127, hex('#5a8a3a')); R.rect(150, 82, 158, 96, hex('#4a7a32')); if (Math.sin(t * 2) > 0) R.rect(152 + Math.round(((t * 20) % 6)), 100, 154 + Math.round(((t * 20) % 6)), 112, hex('#2a4a8a'));
  R.rect(149, 82, 149, 127, hex('#3a3028')); R.rect(159, 82, 159, 127, hex('#3a3028'));
  // la ropa tendida que ondea con el viento (camisa, sábana, calcetines)
  R.linea(178, 58, 258, 66, hex('#e8e0d0'));
  const prendas = [[186, 14, 22, '#f2eee2'], [204, 30, 30, '#f8f4ec'], [238, 10, 14, '#a83a3a'], [250, 6, 9, '#3a5a8a']];
  for (const [x0, w, hh, col] of prendas) { const y0 = Math.round(58 + (x0 - 178) * 0.1); for (let i = 0; i < w; i++) { const on = Math.round(Math.sin(t * 4 + i * 0.4 + x0) * 2 * (i / w)); for (let j = 0; j < hh; j++) R.pset(x0 + i, y0 + j + on, j === hh - 1 || i === 0 ? hex('#b8b0a0') : (i + j) % 7 === 0 ? hex('#d8d0c0') : hex(col)); } R.pset(x0 + 1, y0 - 1, hex('#8a6a3a')); R.pset(x0 + w - 2, y0 - 1, hex('#8a6a3a')); }
  // los girasoles junto a la valla, que crecen con el verano y se mecen
  const crece = tramo(t, R6, R6 + 3.2);
  for (const [x, k] of [[196, 0], [212, 1], [226, 2]]) { const top = Math.round(lerp(112, 82 - k * 4, crece)), m = Math.round(Math.sin(t * 1.5 + k) * 1); R.linea(x, 128, x + m, top, hex('#3a7a2a')); R.disco(x - 3 + m, Math.round((top + 128) / 2), 2, hex('#4a8a32')); R.disco(x + m, top, 4, hex('#e8b830')); R.disco(x + m, top, 2, hex('#5a3a1a')); }
  // las gallinas que picotean
  gallina(Math.round(40 + Math.sin(t * 0.7) * 6), 136, t, 0); gallina(Math.round(214 + Math.sin(t * 0.5 + 1) * 8), 166, t, 1); gallina(96, 176, t, 2);
  // los balones pasan por encima de la valla, uno tras otro
  const tiros = [R6 + 0.2, R6 + 1.25, R6 + 2.3];
  let alto = false;
  for (const t0 of tiros) { const u = (t - t0) / 1.0; if (u < 0 || u > 1) continue; alto = true; const x = lerp(-12, 332, u), y = 34 + 0.0013 * (x - 150) ** 2; T.balon(R, Math.round(x), Math.round(y), t, { epoca: '1906', ang: 0.2 + (u - 0.5), gira: 3 }); }
  // el vecino, subido al cajón, espía por el hueco; con cada balón se agacha y mira arriba
  const agacha = alto && Math.floor(t * 4) % 2 === 0;
  R.actor(EL.granjero, 152, 140 + (agacha ? 1 : 0), t, { dir: alto ? 1 : -1, sorpresa: alto, quieto: false });
  // la vecina tiende la ropa y mira los balones con la boca abierta
  R.actor(EL.vecina, 200, 150, t, { dir: -1, dedo: !alto, sorpresa: alto });
  R.rect(194, 129, 200, 131, hex('#f2eee2'));
};

const año = (t) => (t < Y1906 ? 1905 : 1906);
const efectos = [[ENTRA - 0.4, 'puerta'], [FORWARD, 'brillo'], [R3 + 0.6, 'lapiz'], [MISSED + 0.35, 'golpecito'], [COULDNT + 0.4, 'lapiz'], [R4 + 0.6, 'silbato'], [TIMID + 0.45, 'golpecito'], [R5 + 0.35, 'silbato'], [MADE + 0.15, 'whoosh'], [WEAPON + 0.35, 'palmada'], [R6 + 0.6, 'whoosh'], [R6 + 2.6, 'whoosh']];
T.rodar(E, R, [[0, p1], [R2, p2], [R3, p3], [R4, p4], [R5, p5], [R6, p6]], { efectos, año });
''')
