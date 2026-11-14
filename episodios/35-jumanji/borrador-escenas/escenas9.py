# Borrador de las escenas del ep35 (Jumanji), grupo 9: jm-porque y jm-cierre. Formato del 11: E[id] = (título, cabecera, cuerpo).
COMUN = r'''
const K = hex('#17151d'), BL = hex('#f6f2ea'), ROJO = hex('#d8402c'), ROJOS = hex('#8e2418'), AMA = hex('#ffd030'), PZ = T.PIEZAS_JM;
const ease = (u) => u * u * (3 - 2 * u), cl = (v) => Math.max(0, Math.min(1, v));
// un destello de cuatro puntas
const destello = (x, y, r, c = BL) => { x = Math.round(x); y = Math.round(y); for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } if (r > 1) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); R.pset(x + 1, y + 1, c); } };
// una chispa gorda (con filo negro), para lo que tiene que leerse sobre un fondo claro
const chispa = (x, y, q = 0) => { const c = q % 2 ? hex('#fff6c0') : AMA; x = Math.round(x); y = Math.round(y); R.rect(x - 3, y - 1, x + 3, y + 1, K); R.rect(x - 1, y - 3, x + 1, y + 3, K); R.rect(x - 2, y, x + 2, y, c); R.rect(x, y - 2, x, y + 2, c); R.pset(x, y, hex('#ffffff')); };
// un bocadillo blanco con su cola hacia (px, py)
const bocadillo = (x0, y0, x1, y1, px, py) => { R.rect(x0 + 2, y0, x1 - 2, y1, K); R.rect(x0, y0 + 2, x1, y1 - 2, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, K); R.rect(x0 + 2, y0 + 1, x1 - 2, y1 - 1, BL); R.rect(x0 + 1, y0 + 2, x1 - 1, y1 - 2, BL);
  if (px != null) { const d = px < (x0 + x1) / 2 ? -1 : 1, bx = Math.max(x0 + 5, Math.min(x1 - 5, px - d * 4)); R.poligono([[bx - 3, y1 - 1], [bx + 3, y1 - 1], [px, py]], K); R.poligono([[bx - 2, y1 - 1], [bx + 2, y1 - 1], [px, py - 2]], BL); R.rect(bx - 2, y1 - 1, bx + 2, y1 - 1, BL); } };
// la mano que dibuja: la mano canónica sola (el papel queda lejos del borde y un brazo pasaría de 45 px), con su sombra
// tramada, y el lápiz de dibujo con la punta en (px, py)
const sombraMano = (px, py) => { for (let j = 0; j < 9; j++) for (let i = 0; i < 16; i++) if (((i + j) & 1) && Math.hypot((i - 8) / 8, (j - 4) / 4.5) < 1) R.pset(px + 4 + i, py + 2 + j, hex('#8a8474')); };
const manoLapiz = (px, py, manga, o = {}) => { px = Math.round(px); py = Math.round(py); sombraMano(px, py); T.g_lapizGrande(R, px + 23, py - 24, px, py, { negro: !!o.negro }); T.mano(R, px + 12, py - 4, -1, manga, { sinManga: true }); };
// Atom: baja de su esquina cuando la escena lo pide (atomEn(t) devuelve [x, y, energía] o null: en su sitio)
const comp0 = R.companero, SIT = [297, 24];
let atomEn = () => null;
const atomPinta = (x, y, t, e) => { const r = 13 + 2.4 * e; for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) { const g = 1 - Math.hypot(i, j) / r; if (g > 0.35) R.pset(x + i, y + j, g > 0.75 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); } R.atomo(x, y, t, { r: 10, orbita: R.PAL.ATOM[7], energia: e }); };
R.companero = (t, e = 0) => { const p = atomEn(t); if (!p) return comp0(t, e); atomPinta(Math.round(p[0]), Math.round(p[1]), t, Math.max(e, p[2] || 0)); };
const vuelo = (a, b, u, arco = 14) => { const e = ease(cl(u)); return [lerp(a[0], b[0], e), lerp(a[1], b[1], e) - Math.sin(cl(u) * Math.PI) * arco]; };
'''

E = {}

E['jm-porque'] = ('Por qué funciona', '''// JM-PORQUE (frases «choque» y «reglas»), hoy (2026), sin cartela. Ocho planos (cortes en his drawings · We've all ·
// And when · and so · And there's · The only · seeing):
//  1 · el cuarto del ilustrador, hoy: Van Allsburg dibuja; un chaval entra con su «?» («why»); él levanta el lápiz y lo
//      explica: en su bocadillo, un sillón y un rinoceronte.
//  2 · (extra) NUESTRA lámina de la alacena, a lápiz: un mono entre las latas; la mano con el lápiz negro remata otro en la
//      puerta, que aparece en «never»; las latas caen.
//  3 · la lámina de «cómo miramos»: los ojos van al salón («living room»), al rinoceronte («rhinoceros») y de uno a otro;
//      «never together»: un aspa entre los dos recuadros. El ilustrador señala y se encoge de hombros.
//  4 · el pasillo a ras de suelo, a lápiz: el ratón avisa («!») y pasan las patas de los rinocerontes.
//  5 · el dibujo único, de cerca: la mirada (unos ojos y su marco rojo) salta del sillón al rinoceronte; en «look away»
//      intenta irse por la derecha y por la izquierda, y una goma la devuelve; al final abarca a los dos.
//  6 · la cartulina de reglas: la ficha da tres pasos; una mano con una cera roja tacha la puerta («quit»), el dado
//      («cheat») y el teléfono («call»).
//  7 · las últimas casillas y la META: la ficha llega en «finish… started»; las lianas del borde se retiran y salta el confeti.
//  8 · la mesa desde arriba: Atom baja y acompaña a su ficha por la espiral; en «dressed up» entran los dados rodando, en
//      «stampede» tiembla la mesa y asoma la liana; la ficha llega a la meta y Atom vuelve a su esquina.''', COMUN + r'''
const tc = (s) => en('choque', (s - 0.9) / 17.6), tr = (s) => en('reglas', (s - 20.663) / 13.336);   // el segundo de la voz inglesa → instante
const P2 = tc(4.61), P3 = tc(8.73), P4 = tc(13.0), P5 = tc(17.0), P6 = tr(20.66), P7 = tr(27.4), P8 = tr(31.41), FIN = E.duracion;
const MANGA = '#7a6a52';
// los dos pictogramas pequeños del bocadillo: el sillón y el rinoceronte
const miniSillon = (x, y) => { const V = hex('#3f9a54'), VS = hex('#2a6e3a'), VL = hex('#7ac86a'); R.rect(x - 7, y - 12, x + 6, y, K); R.rect(x - 6, y - 11, x + 5, y - 1, V); R.rect(x - 6, y - 11, x + 5, y - 10, VL); R.rect(x - 6, y - 5, x - 4, y - 1, VS); R.rect(x + 3, y - 5, x + 5, y - 1, VS); R.rect(x - 3, y - 6, x + 2, y - 4, hex('#f0c030')); R.rect(x - 3, y - 3, x + 2, y - 2, VL); };
const miniRino = (x, y) => { const G = hex('#8a8a96'), GS = hex('#5e5e6c'), GL = hex('#b6b6c2'); R.rect(x - 6, y - 10, x + 8, y - 2, K); R.rect(x - 11, y - 9, x - 5, y - 3, K); R.rect(x - 5, y - 2, x - 2, y, K); R.rect(x + 4, y - 2, x + 7, y, K); R.rect(x - 13, y - 12, x - 11, y - 7, K);
  R.rect(x - 5, y - 9, x + 7, y - 3, G); R.rect(x - 5, y - 9, x + 7, y - 8, GL); R.rect(x - 10, y - 8, x - 6, y - 4, G); R.rect(x - 4, y - 2, x - 3, y - 1, GS); R.rect(x + 5, y - 2, x + 6, y - 1, GS); R.rect(x - 12, y - 11, x - 12, y - 8, BL); R.pset(x - 8, y - 7, K); R.rect(x + 1, y - 9, x + 1, y - 4, GS); };

// 1 · el cuarto del ilustrador: el chaval pregunta y él lo explica
const WHY = tc(1.0), VAN = tc(2.47), EXPL = tc(3.25);
const p1 = (t) => {
  const o = { encuadre: 'hoyTaller' }; T.hoy(R, t, o);
  const e = tramo(t, 0.1, WHY + 0.15), xn = Math.round(lerp(336, 208, ease(e))), dibuja = t < VAN, habla = t > EXPL;
  const hx = dibuja ? 127 + Math.round(Math.sin(t * 7) * 3 + Math.sin(t * 1.3) * 3) : habla ? 121 + Math.round(Math.sin(t * 6) * 2) : 123, hy = dibuja ? 146 + Math.round(Math.sin(t * 11)) : habla ? 136 + Math.round(Math.sin(t * 6 + 1) * 2) : Math.round(lerp(146, 137, tramo(t, VAN, VAN + 0.3)));
  const a = R.actor(EL.vanallsburgMayor, 101, 162, t, { dir: 1, sostiene: [hx, hy], habla: habla && Math.sin(t * 9) > -0.2, sonrisa: habla });
  const asiente = t > EXPL + 0.9 ? Math.round(Math.abs(Math.sin((t - EXPL - 0.9) * 6)) * 2) : 0;
  R.actor(EL.nino2017JM, xn, 164, t, { dir: -1, anda: e > 0 && e < 1, sorpresa: e >= 1 && t < EXPL, sonrisa: t > EXPL + 0.6, salto: asiente });
  T.hoyDelante(R, t, o);
  // el lápiz, en su mano (por delante de la mesa: la punta toca la lámina mientras dibuja)
  { const [mx, my] = a.mano || [hx, hy]; T.g_lapizMesa(R, mx + 1, my - 2, { vertical: true }); if (dibuja && Math.floor(t * 9) % 3 === 0) R.pset(mx + 3, my + 6, hex('#5a564e')); }
  // el «?» del chaval y la respuesta: un sillón y un rinoceronte
  if (e >= 1 && t < EXPL + 0.2) { const b = Math.round(Math.sin(t * 5)); bocadillo(xn - 9, 117 + b, xn + 9, 135 + b, xn + 2, 139 + b); R.icono('?', xn - 3, 120 + b, ROJO, null, 2); }
  if (habla) { const s = cl((t - EXPL) / 0.2), y0 = 111 - Math.round(s * 3); bocadillo(62, y0, 110, y0 + 21, 104, y0 + 27); if (t > EXPL + 0.15) miniSillon(75, y0 + 17); if (t > EXPL + 0.55) { R.rect(84, y0 + 10, 88, y0 + 10, K); R.rect(86, y0 + 8, 86, y0 + 12, K); miniRino(101, y0 + 17); } }
};

// 2 · NUESTRA lámina de la alacena: la mano remata el segundo mono
const NEVER = tc(6.63), SAME = tc(7.53);
const p2 = (t) => {
  const o = { encuadre: 'cocina', camara: 'alacena', monos: t < NEVER ? 0.4 : 1 }; T.casaJuego(R, t, o); T.casaJuegoDelante(R, t, o);
  const u = ease(tramo(t, P2 + 0.05, P2 + 0.75)), v = ease(tramo(t, NEVER - 0.05, NEVER + 0.7));
  // los trazos que va dejando la mano donde va a salir el mono (se quedan debajo de él)
  if (t < NEVER) { const n = Math.floor(cl((t - P2 - 0.7) / (NEVER - P2 - 0.7)) * 22); for (let k = 0; k < n; k++) { const x = 252 + (k * 7) % 22, y = 58 + (k * 5) % 34; R.linea(x, y, x + 5, y - 4, hex(k % 3 ? '#6e6c74' : '#9a98a0')); } }
  if (v < 1) { const bx = 262 + Math.sin(t * 13) * 7 + Math.sin(t * 2.1) * 3, by = 84 + Math.sin(t * 9) * 11, px = lerp(lerp(350, bx, u), 352, v), py = lerp(lerp(120, by, u), 134, v); manoLapiz(px, py, MANGA, { negro: true }); }
  if (t > NEVER && t < NEVER + 0.7) { const s = (t - NEVER) / 0.7; for (let q = 0; q < 8; q++) chispa(262 + Math.cos(q * 0.785 + s) * (16 + s * 12), 74 + Math.sin(q * 0.785 + s) * (20 + s * 10), q); }
};

// 3 · la lámina de «cómo miramos»: el salón, el rinoceronte, nunca juntos
const LIVING = tc(9.27), RHINO = tc(10.8), BUT = tc(11.97), TOG = tc(12.25);
const p3 = (t) => {
  const mira = t < RHINO - 0.3 ? lerp(0, -1, ease(tramo(t, P3 + 0.1, LIVING))) : t < BUT ? lerp(-1, 1, ease(tramo(t, RHINO - 0.3, RHINO + 0.1))) : Math.cos((t - BUT) * 8.5);
  const o = { encuadre: 'ojos', mira, juntos: 0 }, g = T.hoy(R, t, o), [ix, iy] = g.izqAhora || g.izq, [dx, dy] = g.derAhora || g.der;
  // el recuadro que se mira se enciende con un filo amarillo
  const filo = (x, y, c) => { R.rect(x - 3, y - 3, x + 78, y - 2, c); R.rect(x - 3, y + 59, x + 78, y + 60, c); R.rect(x - 3, y - 3, x - 2, y + 60, c); R.rect(x + 77, y - 3, x + 78, y + 60, c); };
  if (t > LIVING - 0.1 && mira < -0.6) filo(ix, iy, Math.floor(t * 6) % 2 ? AMA : hex('#fff6c0'));
  if (t > RHINO - 0.1 && mira > 0.6) filo(dx, dy, Math.floor(t * 6) % 2 ? AMA : hex('#fff6c0'));
  // «never together»: el aspa entre los dos
  if (t > TOG) { const s = cl((t - TOG) / 0.18), b = t > TOG + 0.18 ? Math.round(Math.sin((t - TOG) * 10) * 1) : 0, r = Math.round(4 + s * 8); for (let w = -2; w <= 2; w++) { R.linea(142 - r + w, 104 - r + b, 142 + r + w, 104 + r + b, Math.abs(w) === 2 ? K : ROJO); R.linea(142 + r + w, 104 - r + b, 142 - r + w, 104 + r + b, Math.abs(w) === 2 ? K : ROJO); } }
  R.actor(EL.vanallsburgMayor, 290, 172, t, { dir: -1, dedo: t < BUT, brazos: t > TOG, habla: Math.sin(t * 9) > 0 });
  T.hoyDelante(R, t, o);
};

// 4 · el pasillo, a ras de suelo: pasan las patas
const SHOW = tc(13.68);
const p4 = (t) => {
  const o = { encuadre: 'pasillo', camara: 'baja', estampida: t < P4 + 0.7 ? lerp(0.14, 0.22, tramo(t, P4, P4 + 0.7)) : lerp(0.22, 0.78, tramo(t, P4 + 0.7, P5)) }; T.casaJuego(R, t, o);
  if (t < P4 + 0.78 && t > P4 + 0.15) { const b = Math.round(Math.sin(t * 22)); bocadillo(120 + b, 22, 136 + b, 39, 128, 43); R.icono('!', 126 + b, 24, ROJO, null, 2); }
  T.casaJuegoDelante(R, t, o);
};

// 5 · el dibujo único: la mirada no puede irse
const AWAY = tc(17.98);
const ojo = (x, y, dx, dy) => { R.disco(x, y, 7, K); R.disco(x, y, 6, BL); R.disco(x + dx, y + dy, 3, hex('#2f62b8')); R.disco(x + dx, y + dy, 1.5, K); R.pset(Math.round(x + dx) - 1, Math.round(y + dy) - 1, BL); };
const marcoMira = (cx, cy, w, h) => { for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const x = Math.round(cx + sx * w), y = Math.round(cy + sy * h);
  for (const [g, c] of [[1, K], [0, ROJO]]) { R.rect(Math.min(x, x - sx * 9) - g, y - 1 - g, Math.max(x, x - sx * 9) + g, y + g, c); R.rect(x - 1 - g, Math.min(y, y - sy * 9) - g, x + g, Math.max(y, y - sy * 9) + g, c); } } };
const tiron = (a, amp) => a <= 0 || a > 1 ? 0 : a < 0.55 ? amp * ease(a / 0.55) : a < 0.72 ? amp * (1 - ease((a - 0.55) / 0.17)) : -amp * 0.14 * Math.sin((a - 0.72) / 0.28 * Math.PI * 2) * (1 - (a - 0.72) / 0.28);
const p5 = (t) => {
  const o = { encuadre: 'ojos', camara: 'juntos' }; T.hoy(R, t, o); T.hoyDelante(R, t, o);
  const A = [86, 120], B = [200, 118], n = Math.floor((t - P5) / 0.32), u = ((t - P5) / 0.32) % 1, de = n % 2 ? A : B, a = n % 2 ? B : A, s = ease(cl(u * 2.4));
  const fijo = ease(tramo(t, AWAY + 2.15, AWAY + 2.5)), salta = t < AWAY ? 1 : 0;
  let cx = salta ? lerp(de[0], a[0], s) : lerp(lerp(de[0], a[0], s), 143, cl((t - AWAY) / 0.25)), cy = salta ? lerp(de[1], a[1], s) : 119, w = lerp(salta ? 30 : lerp(30, 86, cl((t - AWAY) / 0.25)), 92, fijo), hh = lerp(26, 32, fijo) + (fijo >= 1 ? Math.round(Math.sin(t * 7)) : 0);
  const off = tiron((t - AWAY - 0.1) / 1.0, 70) + tiron((t - AWAY - 1.15) / 1.0, -62), ex = 148 + Math.round(off), ey = 30;
  marcoMira(cx, cy, w, hh);
  // la goma que la devuelve: una línea de puntos de los ojos al marco, tensa cuando tiran
  if (Math.abs(off) > 3) { const N = Math.round(Math.hypot(ex - cx, ey - (cy - hh)) / 5); for (let k = 1; k < N; k++) { const x = Math.round(lerp(ex, cx, k / N)), y = Math.round(lerp(ey + 8, cy - hh - 2, k / N)); R.rect(x, y, x + 1, y + 1, k % 2 ? ROJO : K); } }
  const tm = t > AWAY + 2.5 ? Math.round(Math.sin(t * 31)) : 0, an = Math.atan2(cy - ey, cx - ex + (salta ? 0 : 0)), px = Math.cos(an) * 3 + tm, py = Math.max(0, Math.sin(an) * 3);
  ojo(ex - 9, ey, px, py); ojo(ex + 9, ey, px, py);
  if (Math.abs(off) > 40) { const d = Math.sign(off); for (let k = 0; k < 3; k++) R.rect(ex - d * (22 + k * 5), ey - 3 + k * 3, ex - d * (19 + k * 5), ey - 3 + k * 3, K); }
};

// 6 · la cartulina de reglas: tres aspas
const SECOND = tr(21.02), RULES = tr(22.8), QUIT = tr(24.82), CHEAT = tr(25.8), CALL = tr(26.48), TT = [QUIT, CHEAT, CALL], CIR = [[108, 60], [160, 60], [212, 60]];
const cera = (gx, gy, px, py) => { const N = 26; for (const [r, pasada] of [[3.4, 0], [2.4, 1]]) for (let k = 0; k <= N; k++) { const s = k / N, x = lerp(gx, px, s), y = lerp(gy, py, s), rr = s > 0.84 ? r * (1 - (s - 0.84) / 0.2) : r; R.disco(x, y, Math.max(pasada ? 0.6 : 1.2, rr), pasada ? (s > 0.3 && s < 0.62 ? hex('#f2e8d2') : s > 0.84 ? ROJOS : ROJO) : K); } R.linea(Math.round(gx + 1), Math.round(gy), Math.round(lerp(gx, px, 0.28)) + 1, Math.round(lerp(gy, py, 0.28)), hex('#f58a6c')); };
const manoCera = (px, py) => { px = Math.round(px); py = Math.round(py); sombraMano(px, py); cera(px + 21, py - 23, px, py); T.mano(R, px + 12, py - 4, -1, MANGA, { sinManga: true }); };
const p6 = (t) => {
  const tacha = TT.reduce((s, q) => s + tramo(t, q, q + 0.32), 0), o = { encuadre: 'reglas', tacha, avance: 0.3 * tramo(t, P6 + 0.5, RULES - 0.1) };
  const g = T.hoy(R, t, o); T.hoyDelante(R, t, o);
  // la mano con la cera roja: entra, espera junto a la cartulina y tacha cada regla en su palabra
  const REP = [276, 96 + Math.sin(t * 2.2) * 3];
  let p = vuelo([350, 150], REP, (t - SECOND) / 0.7, 0);
  for (let k = 0; k < 3; k++) { const q = TT[k], [cx, cy] = CIR[k], ini = [cx + 13, cy - 13];
    if (t > q - 0.4) { const d = k ? [CIR[k - 1][0] + 13, CIR[k - 1][1] + 13] : REP; p = vuelo(d, ini, (t - q + 0.4) / 0.4, 6); }
    if (t > q) { const f = (t - q) / 0.32; p = f < 0.5 ? [lerp(cx + 13, cx - 13, f * 2), lerp(cy - 13, cy + 13, f * 2)] : f < 0.62 ? vuelo([cx - 13, cy + 13], [cx - 13, cy - 13], (f - 0.5) / 0.12, 0) : [lerp(cx - 13, cx + 13, cl((f - 0.62) / 0.38)), lerp(cy - 13, cy + 13, cl((f - 0.62) / 0.38))]; } }
  if (t > CALL + 0.45) p = vuelo([CIR[2][0] + 13, CIR[2][1] + 13], [282, 112 + Math.sin(t * 2.2) * 2], (t - CALL - 0.45) / 0.4, 5);
  manoCera(p[0], p[1]);
  // el teléfono suena justo antes de su aspa
  if (t > CALL - 0.7 && t < CALL && Math.floor(t * 12) % 2) for (const d of [-1, 1]) for (let k = 0; k < 2; k++) R.linea(212 + d * (22 + k * 4), 50 + k * 2, 212 + d * (25 + k * 4), 46 + k * 2, ROJO);
};

// 7 · la meta: solo se sale llegando al final
const FINISH = tr(29.13), LLEGA = tr(29.69) + 0.2;
const p7 = (t) => {
  const av = tramo(t, P7 + 0.35, LLEGA), o = { encuadre: 'reglas', camara: 'meta', avance: av }, g = T.hoy(R, t, o), [mx, my] = g.gema;
  // las lianas que cuelgan sobre la cartulina: se retiran cuando la ficha llega
  { const r = ease(tramo(t, LLEGA, LLEGA + 0.55)); for (const [x, L, f] of [[196, 62, 0], [228, 44, 1.3], [262, 54, 2.1]]) PZ.liana(R, x, -2, { largo: lerp(L + Math.sin(t * 1.7 + f) * 3, 4, r), t: t + f }); }
  T.hoyDelante(R, t, o);
  // la llegada: rayos y confeti de hojas
  if (t > LLEGA) { const s = t - LLEGA, e = cl(s / 0.6);
    if (s < 0.9) for (let q = 0; q < 12; q++) { const an = q * Math.PI / 6 + 0.26, r0 = 30 + e * 10, r1 = r0 + 6 + (q % 2) * 5; R.linea(Math.round(mx + Math.cos(an) * r0), Math.round(my + Math.sin(an) * r0), Math.round(mx + Math.cos(an) * r1), Math.round(my + Math.sin(an) * r1), q % 2 ? AMA : ROJO); }
    for (let q = 0; q < 14; q++) { const an = -Math.PI * (0.08 + 0.84 * q / 13), v0 = 62 + (q * 37) % 30, x = mx + Math.cos(an) * v0 * s * 0.9 + Math.sin(t * 5 + q) * 2, y = my - 10 + Math.sin(an) * v0 * s + 46 * s * s; if (y < 158 && x < 276) { const c = [hex('#3f9a54'), AMA, ROJO, hex('#7ac86a')][q % 4]; R.rect(Math.round(x) - 2, Math.round(y) - 1, Math.round(x) + 2, Math.round(y) + 1, K); R.rect(Math.round(x) - 1, Math.round(y), Math.round(x) + 1, Math.round(y), c); R.pset(Math.round(x), Math.round(y) + (Math.floor(t * 8 + q) % 2 ? -1 : 1), c); } }
    for (let q = 0; q < 5; q++) if (Math.floor(t * 7 + q) % 3 === 0) chispa(mx + Math.cos(q * 1.9 + t) * (34 + q * 3), my + Math.sin(q * 1.9 + t) * (30 + q * 2), q); }
};

// 8 · la mesa desde arriba: Atom acompaña a su ficha hasta la meta
const DRESSED = tr(32.33), STAMP = tr(33.27), META = tr(33.87) + 0.45;
let fichaXY = [120, 120];
atomEn = (t) => { if (t < P8 + 0.1) return null; const j = t > META && t < META + 0.9 ? Math.abs(Math.sin((t - META) * 9)) * 7 * (1 - (t - META) / 0.9) : 0, cerca = [fichaXY[0] + 15, fichaXY[1] - 17 - j];
  if (t > FIN - 0.75) { const p = vuelo(cerca, SIT, (t - FIN + 0.75) / 0.55, 10); return [p[0], p[1], 0.6]; }
  const p = vuelo(SIT, cerca, (t - P8 - 0.1) / 0.6, -8); return [p[0], p[1], t < P8 + 0.7 || j > 1 ? 0.8 : 0.3]; };
const p8 = (t) => {
  const tiembla = t > STAMP && t < STAMP + 1.1, o = { encuadre: 'estudio', camara: 'mesa', avance: lerp(0.52, 1, tramo(t, P8 + 0.45, META)), dados: [6, 4], tira: tramo(t, DRESSED - 0.1, DRESSED + 0.85), liana: ease(tramo(t, STAMP, STAMP + 1.0)) };
  const g = T.hoy(R, t, o); fichaXY = g.ficha || fichaXY;
  // la «estampida»: la mesa tiembla (rayitas junto a la taza, el folleto y la hoja) y saltan motas de polvo del tablero
  if (tiembla) { const s = (t - STAMP) / 1.1; if (Math.floor(t * 14) % 2) for (const [x, y] of [[30, 44], [72, 70], [20, 150], [70, 134], [240, 150], [306, 138]]) { R.linea(x, y, x + 4, y - 3, K); R.linea(x + 1, y + 3, x + 6, y + 1, K); }
    for (let q = 0; q < 16; q++) { const x = 98 + (q * 53) % 124, y = 141 + (q % 3) * 2 - Math.abs(Math.sin(s * 9 + q)) * 7; R.rect(Math.round(x), Math.round(y), Math.round(x) + 1, Math.round(y) + 1, hex(q % 2 ? '#e8d8b0' : '#c8a878')); } }
  T.hoyDelante(R, t, o);
  // la estela de Atom sobre el camino y la llegada
  if (t > META && t < META + 1.0) { const s = (t - META) / 1.0, [mx, my] = g.meta || g.gema; for (let q = 0; q < 10; q++) chispa(mx + Math.cos(q * 0.628 + s * 2) * (14 + s * 20), my + Math.sin(q * 0.628 + s * 2) * (12 + s * 16), q); }
};
const efectos = [[0.35, 'lapiz'], [WHY, 'pop'], [EXPL + 0.15, 'pop'], [P2 + 0.8, 'lapiz'], [NEVER, 'brillo'], [SAME + 0.25, 'golpecito'], [LIVING, 'pop'], [RHINO, 'pop'], [TOG, 'toc'], [P4 + 0.2, 'aviso'], [P4 + 0.75, 'avalancha'], [SHOW + 1.5, 'boom'],
  [P5 + 0.1, 'tic'], [AWAY + 0.55, 'boing'], [AWAY + 1.6, 'boing'], [P6 + 0.6, 'golpecito'], [SECOND, 'whoosh'], [QUIT, 'lapiz'], [CHEAT, 'lapiz'], [CALL - 0.65, 'ring'], [CALL, 'lapiz'], [P7 + 0.5, 'golpecito'], [LLEGA, 'campana'], [LLEGA + 0.4, 'brillo'],
  [P8 + 0.2, 'whoosh'], [DRESSED + 0.3, 'golpecito'], [STAMP, 'carro'], [META, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { efectos, año: 2026 });
''')

E['jm-cierre'] = ('Lee las instrucciones', '''// JM-CIERRE (frase «instrucciones»), hoy (2026), sin cartela. Tres planos (cortes en So now · you can take):
//  1 · la esquina de la lámina de hoy: el lápiz negro termina al perro blanco que asoma tras la hoja («the white dog is
//      still hiding»); la mano se retira; una mariquita cruza el papel.
//  2 · (extra) el parque, hoy y en color: un chaval llega por la hierba, ve la caja al pie del árbol («box»: «!») y la levanta.
//  3 · el estudio de Atom tomado por las lianas (gag 8): la caja ya está en casa; Atom baja con el folleto, lo deja en el
//      canto de la mesa en «read» y el rollo se desenrolla por el frente y por el suelo sin acabarse; Atom lo sigue y da un respingo («!»).''', COMUN + r'''
const ti = (s) => en('instrucciones', (s - 0.5) / 11.644);   // el segundo de la voz inglesa → instante
const P2 = ti(5.5), P3 = ti(9.27), FIN = E.duracion;
// 1 · el perro blanco, todavía escondido
const WHITE = ti(3.1), HIDING = ti(4.2);
const p1 = (t) => {
  const perro = t < WHITE ? 0.38 * tramo(t, 0.3, WHITE - 0.2) : lerp(0.38, 1, tramo(t, WHITE, HIDING + 0.25)), o = { encuadre: 'hoyTaller', camara: 'esquina', perro, lapiz: false }, g = T.hoy(R, t, o);
  // la mariquita que cruza el papel
  { const x = Math.round(18 + t * 9), y = 146 - (Math.floor(t * 6) % 2); R.rect(x - 2, y - 2, x + 2, y + 1, K); R.rect(x - 1, y - 1, x + 1, y, ROJO); R.pset(x, y - 1, K); R.pset(x + 2, y, K); R.pset(x - 2 + (Math.floor(t * 12) % 2), y + 2, K); R.pset(x + 1 + (Math.floor(t * 12) % 2), y + 2, K); }
  // el lápiz y la mano: dibujan y, cuando el perro está entero, se retiran
  const s = ease(tramo(t, HIDING + 0.4, HIDING + 1.1)), [px, py] = g.punta, ox = Math.round(s * 96), oy = Math.round(-s * 30), [lx, ly] = g.lapizLargo || [78, -64];
  T.g_lapizGrande(R, px + lx + ox, py + ly + oy, px + ox, py + oy, { negro: true });
  { const hx = Math.round(px + lx * 0.45) + ox, hy = Math.round(py + ly * 0.45) + oy; if (hx < 316) T.mano(R, hx + 3, hy + 6, -1, '#7a6a52', { sinManga: true }); }
  if (perro > 0.05 && perro < 1 && Math.floor(t * 10) % 2) { R.pset(px - 2, py + 3, hex('#5a564e')); R.pset(px + 1, py + 5, hex('#8a8474')); }
  if (t > HIDING + 0.3 && t < HIDING + 1.0) { const q = (t - HIDING - 0.3) / 0.7; for (let k = 0; k < 6; k++) chispa(204 + Math.cos(k * 1.05 + q * 2) * (40 + q * 10), 104 + Math.sin(k * 1.05 + q * 2) * (30 + q * 8), k); }
  T.hoyDelante(R, t, o);
};
// 2 · el parque: una caja abandonada
const FIND = ti(7.37), BOX = ti(7.75), COGE = ti(8.55);
const p2 = (t) => {
  const o = { encuadre: 'parque', caja: t < COGE - 0.3, color: 1 }; T.casaJuego(R, t, o);
  const e = tramo(t, P2 + 0.05, FIND), v = tramo(t, COGE + 0.3, P3 + 0.4), x = Math.round(lerp(-14, 160, e) - 44 * v), vuelve = t > COGE + 0.3;
  const sub = ease(tramo(t, COGE - 0.3, COGE));
  const a = R.actor(EL.nino2017JM, x, 153, t, { dir: vuelve ? -1 : 1, anda: (e > 0 && e < 1) || vuelve, sorpresa: t > BOX - 0.1 && t < COGE - 0.3, sonrisa: t >= COGE - 0.3, dedo: t > BOX + 0.15 && t < COGE - 0.35, sostiene: t > COGE - 0.3, salto: t > BOX - 0.05 && t < BOX + 0.3 ? Math.round(Math.sin((t - BOX + 0.05) / 0.35 * Math.PI) * 4) : 0 });
  if (t >= COGE - 0.3) { const [mx, my] = a.mano || [x + 10, 140], d = vuelve ? -1 : 1; const bx = Math.round(lerp(190, mx + d * 9, sub)), by = Math.round(lerp(153, my - 3, sub)); for (let j = -2; j <= 2; j++) for (let i = -15; i <= 15; i++) if (((i + j) & 1) && (i / 15) ** 2 + (j / 2.4) ** 2 < 1) R.pset(bx + i, 155 + j, hex('#3a6a34')); PZ.cajaJuego(R, bx, by); }
  if (t > BOX - 0.05 && t < COGE - 0.35) { const b = Math.round(Math.sin(t * 6)); bocadillo(x - 8, 107 + b, x + 8, 124 + b, x + 2, 128 + b); R.icono('!', x - 2, 109 + b, ROJO, null, 2); }
  if (t > BOX && t < BOX + 0.8 && Math.floor(t * 8) % 2) { destello(176, 136, 3, hex('#fff4b8')); destello(204, 131, 2, BL); }
  T.casaJuegoDelante(R, t, o);
};
// 3 · el estudio, tomado por las lianas: las instrucciones, un rollo que no se acaba
const HOME = ti(9.89), BUT = ti(10.63), READ = ti(11.09), INSTR = ti(11.37), PASMO = INSTR + 1.0;
const AT0 = [146, 96], DEJA = BUT + (READ - BUT) * 0.5;
const atomXY = (t) => { const baja = (t - P3 - 0.1) / 0.6; if (baja < 1) return vuelo(SIT, AT0, baja, -6);
  const deja = tramo(t, BUT, READ), sigue = ease(tramo(t, READ + 0.5, FIN - 0.4)), resp = t > PASMO && t < PASMO + 0.5 ? Math.sin((t - PASMO) / 0.5 * Math.PI) * 8 : 0;
  return [lerp(AT0[0], 112, sigue), AT0[1] + Math.sin(deja * Math.PI) * 13 + Math.sin(t * 2.6) * 2 - resp + sigue * 10]; };
atomEn = (t) => { if (t < P3 + 0.1) return null; const p = atomXY(t); return [p[0], p[1], t < P3 + 0.7 || (t > PASMO && t < PASMO + 0.5) ? 0.9 : 0.35]; };
const p3 = (t) => {
  const o = { encuadre: 'estudio', lianas: 1, rollo: tramo(t, READ, FIN - 0.25), dados: [5, 3], lapiz: false }; T.hoy(R, t, o);
  // la caja, ya en casa, junto a la mesa
  PZ.cajaJuego(R, 228, 165); if (t > HOME - 0.2 && t < HOME + 0.7 && Math.floor(t * 8) % 2) { destello(220, 146, 3, hex('#fff4b8')); destello(238, 150, 2, BL); }
  T.hoyDelante(R, t, o);
  // la liana que se llevó el lápiz (acto 0) sigue ahí, con él colgando
  { const li = PZ.liana(R, 187, 5, { largo: 40 + Math.sin(t * 1.4) * 2, t }) || {}, [qx, qy] = li.punta || [187, 45]; R.rect(qx - 1, qy - 2, qx + 4, qy + 15, BL); T.g_lapizMesa(R, qx + 1, qy + 6, { vertical: true }); }
  // el folleto: Atom lo trae colgando, lo deja en el canto de la mesa y se abre
  const [ax, ay] = atomXY(t);
  if (t > P3 + 0.1 && t < DEJA) { const fx = Math.round(ax), fy = Math.round(ay + 26); for (let k = 0; k < 3; k++) R.pset(fx - 3 + k * 3, fy - 15 + ((k + Math.floor(t * 8)) & 1), hex('#c8f0ff')); PZ.instrucciones(R, fx, fy, { rollo: 0 }); }
  else if (t >= DEJA) { PZ.instrucciones(R, 146, 135, { rollo: 0 }); if (t > READ && t < READ + 0.4) for (let q = 0; q < 6; q++) chispa(146 + Math.cos(q * 1.05) * (10 + (t - READ) * 26), 128 + Math.sin(q * 1.05) * (8 + (t - READ) * 18), q); }
  if (t > PASMO && t < FIN - 0.2) { const gx = Math.round(ax + 20), gy = Math.round(ay - 16); bocadillo(gx - 8, gy - 9, gx + 8, gy + 8, gx - 9, gy + 13); R.icono('!', gx - 2, gy - 7, ROJO, null, 2); }
};
const efectos = [[0.5, 'lapiz'], [WHITE, 'lapiz'], [HIDING + 0.35, 'brillo'], [P2 + 0.3, 'viento'], [BOX, 'pop'], [COGE, 'golpecito'], [P3 + 0.2, 'whoosh'], [HOME, 'brillo'], [READ, 'papel'], [INSTR + 0.5, 'papel'], [PASMO, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')
