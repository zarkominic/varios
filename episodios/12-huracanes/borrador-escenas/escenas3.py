E = {}

# Piezas que comparten las tres escenas (cada .html lleva su copia): ayudas de tiempo, el orden de dibujo, el tinte de
# noche para los personajes, figuras con contorno, la sombrilla y el perro del gag (a la escala de los personajes).
COMUN = r'''
const C = T.C;
const lin = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const entre = (t, a, b) => t >= a && t < b;
const parpadeo = (t, v = 6) => Math.sin(t * v) > 0;
const hh = (a, b, k = 0) => { const s = Math.sin(a * 127.1 + b * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const frena = (u) => 1 - (1 - u) ** 3;
// el tramado ordenado 4 × 4 (para degradados sin rayas)
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], umbral = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
// dónde lleva algo un personaje: la mano que cuelga (delante), la de atrás y la levantada (con dedo)
const enMano = (x, suelo, dir) => [dir > 0 ? x + 11 : x - 5, suelo - 9];
const manoAtras = (x, suelo, dir) => [dir > 0 ? x + 1 : x + 13, suelo - 8];
const manoArriba = (x, suelo, dir) => [dir > 0 ? x + 16 : x - 2, suelo - 19];
// lo que va detrás de una pieza del decorado: guarda esos rectángulos, dibuja y los repone encima
const detras = (rects, dibuja) => {
  const g = rects.map(([x0, y0, x1, y1]) => { const v = []; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) v.push(R.pget(x, y)); return v; });
  dibuja();
  rects.forEach(([x0, y0, x1, y1], k) => { let i = 0; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, g[k][i++]); });
};
const mezcla = (p, [cr, cg, cb], a) => { const r = p & 255, g = (p >> 8) & 255, b = (p >> 16) & 255; return (0xff000000 | (Math.round(b + (cb - b) * a) << 16) | (Math.round(g + (cg - g) * a) << 8) | Math.round(r + (cr - r) * a)) >>> 0; };
// tiñe solo lo que pinta dibuja (de noche, los personajes toman la luz del decorado)
const tenido = (col, a, dibuja) => { const B = R.buf, antes = B.slice(); dibuja(); for (let i = 0; i < B.length; i++) if (B[i] !== antes[i]) B[i] = mezcla(B[i], col, a); };
// figura con contorno de 1 px: rectángulos [x0, y0, x1, y1, color]; el contorno envuelve a todos juntos
const figura = (rs) => {
  for (const [x0, y0, x1, y1] of rs) R.rect(Math.min(x0, x1) - 1, Math.min(y0, y1) - 1, Math.max(x0, x1) + 1, Math.max(y0, y1) + 1, C.k);
  for (const [x0, y0, x1, y1, c] of rs) if (c != null) R.rect(Math.min(x0, x1), Math.min(y0, y1), Math.max(x0, x1), Math.max(y0, y1), c);
};
// la sombrilla de 1900 en la mano de atrás (el mango no cruza la cara): media luna de 15 px a rayas con su festón
const sombrilla = (hx, hy, tela = hex('#f4eef0'), raya = hex('#e87a9a')) => {
  const cx = hx + 1, cy = hy - 20;
  R.linea(hx, hy, cx, cy, C.k);
  for (let i = -7; i <= 7; i++) { const a = Math.round(Math.sqrt(49 - i * i) * 0.6); R.rect(cx + i, cy - a, cx + i, cy, C.k); }
  for (let i = -6; i <= 6; i++) { const a = Math.round(Math.sqrt(49 - i * i) * 0.6) - 1; if (a > 0) R.rect(cx + i, cy - a, cx + i, cy - 1, Math.floor((i + 7) / 3) % 2 ? tela : raya); }
  for (let i = -7; i <= 7; i += 2) R.pset(cx + i, cy, Math.floor((i + 7) / 3) % 2 ? tela : raya);
  R.pset(cx, cy - 5, C.k); R.pset(cx - 2, cy - 3, C.blanco);
};
// el perro del gag, de lado y a la escala de los personajes (unos 18 × 17 px): o.dir, o.pose 'pie' | 'sentado' |
// 'tumbado', o.anda (patas alternas), o.digno (la cabeza y el hocico arriba, la cola tiesa), o.cabeza (−1: mira arriba)
const PERRO = { D: hex('#d89a4a'), s: hex('#a86a2a'), l: hex('#f0c070') };
const perrito = (x, suelo, t, o = {}) => {
  const d = o.dir ?? 1, X = (i) => Math.round(x + i * d), q = (a, b, j0, j1, c) => [Math.min(X(a), X(b)), Math.round(suelo + j0), Math.max(X(a), X(b)), Math.round(suelo + j1), c];
  const fill = (a, b, j0, j1, c) => { const r = q(a, b, j0, j1); R.rect(r[0], r[1], r[2], r[3], c); }, px = (i, j, c) => R.pset(X(i), Math.round(suelo + j), c);
  const { D, s, l } = PERRO, pose = o.pose ?? 'pie', cab = o.digno ? -2 : (o.cabeza ?? 0);
  if (pose === 'tumbado') {
    const resp = Math.sin(t * 2.2) > 0 ? 0 : 1;
    figura([q(-3, -1, -2, -1, D), q(0, 10, -5 + resp, -1, D), q(9, 14, -7, -2, D), q(14, 16, -4, -2, l)]);
    fill(1, 9, -1, -1, s); fill(9, 11, -7, -4, s); px(12, -5, C.k); px(13, -5, C.k); px(16, -4, C.k); fill(8, 8, -6, -3, C.rojo);
    return;
  }
  if (pose === 'sentado') {
    figura([q(-3, -1, -2, -1, D), q(0, 6, -9, -1, D), q(5, 7, -7, -1, D), q(3, 8, -12, -6, D), q(5, 10, -17 + cab, -11 + cab, D), q(10, 13, -14 + cab - (o.digno ? 1 : 0), -12 + cab - (o.digno ? 1 : 0), l)]);
    fill(0, 3, -6, -2, s); fill(1, 5, -9, -9, l); fill(5, 6, -17 + cab, -13 + cab, s); px(9, -15 + cab, C.k); px(13, -14 + cab - (o.digno ? 1 : 0), C.k);
    fill(4, 7, -11, -10, C.rojo); px(6, -9, C.oroL); px(7, -1, s);
    return;
  }
  const paso = o.anda ? Math.floor(t * (o.digno ? 4 : 8)) % 2 : -1, alzo = o.digno ? 1 : 0;
  const pata = (a, alza) => q(a, a + 1, -4, alza ? -2 : -1, D);
  const cola = o.digno ? q(-2, -1, -14, -9, D) : (Math.sin(t * 14) > 0 ? q(-3, -2, -11, -8, D) : q(-4, -3, -10, -8, D));
  figura([cola, q(0, 9, -9, -4, D), pata(0, paso === 0), pata(3, paso === 1), pata(6, paso === 1), pata(8, paso === 0), q(8, 13, -14 + cab, -8 + cab, D), q(13, 16, -11 + cab - alzo, -9 + cab - alzo, l)]);
  fill(1, 8, -4, -4, s); fill(1, 7, -9, -9, l); fill(8, 10, -14 + cab, -10 + cab, s); px(12, -12 + cab, C.k); px(16, -11 + cab - alzo, C.k);
  fill(8, 9, -8 + Math.min(0, cab + 1), -7, C.rojo); px(9, -6, C.oroL);
};
// la pareja de la foto de la playa (vuelve en hu-muro, paseando con el perro): él de azul, ella de rosa
const SENOR = { C: hex('#3e4a6a'), c: hex('#2c3650'), F: hex('#4a4a56'), W: hex('#f2eee2'), o: hex('#a83a3a') };
const SENORA = { C: hex('#b85a7a'), c: hex('#8e4060'), W: hex('#ecd0da'), L: hex('#2a2430') };
'''

E['hu-galveston'] = ('Galveston, 1900', '''// HU-GALVESTON (frases 12–13), 1900, cartela «1900». Seis planos, todos con acción y vida de fondo:
// 1. la playa de Galveston una mañana de septiembre: una pareja llega por la arena y posa muy tiesa ante un fotógrafo
//    de trípode, que se mete bajo la tela y levanta la bandeja del magnesio; el destello cae en «storms»: la pareja se
//    queda deslumbrada, se ríe y va a ver la foto mientras el humo sube; detrás, bañistas, la cometa y la casa de baños;
// 2. «September 1900, to Galveston, Texas»: la calle de las casas victorianas; el tranvía entra frenando y para en
//    «Galveston»; el niño de los periódicos vocea («!»); un caballero de chistera llega, le lanza una moneda que brilla
//    en «richest» (y un «$» que sube), coge el periódico y se va leyéndolo; una dama de sombrilla pasa por delante;
// 3. «built on a sand island»: la isla vista desde el golfo; un destello recorre la franja de arena, la marca roja cae en
//    «highest point», se trazan el nivel del mar y lo más alto de la isla y la cota «8.7» sale en «nine feet»; una ola
//    salpica en «the sea»; delante, un pescador rema en su bote hacia casa;
// 4. la oficina del Weather Bureau: Cline apunta en su libreta y se toca el sombrero en «Isaac Cline»; dos bocadillos,
//    un satélite y un radar, se tachan con una X roja en «satellites» y «radar»; se encoge de hombros, se gira y da un
//    golpecito al barómetro en «barometer»: el mercurio baja (flecha roja) y se asusta; el telégrafo empieza a sonar;
// 5. «telegrams from Washington»: la azotea; Cline sale por la puerta de la escalera leyendo el telegrama y hace una
//    seña a su ayudante, que iza la bandera roja del aviso de tormenta; Cline va hacia el pretil, mira el golfo con su
//    catalejo («the swell rolling in») y en «water rising» se sobresalta («!»);
// 6. «by his own account»: la playa gris con el mar subiendo; sus huellas por la arena, de arriba abajo, con un «?»
//    discreto; Cline llega a toda prisa, avisa a una pareja que miraba las olas («!», «warning people») y les señala la
//    ciudad en «higher ground»; ellos se van corriendo y él sigue playa arriba.''', COMUN + r'''
const g = (f) => en('galveston', f), c = (f) => en('cline', f);
// los cortes, en la palabra que toca: «September», «built», «The city's», «Telegrams», «by his own account»
const P2 = g(0.312), P3 = g(0.673), P4 = c(0), P5 = c(0.356), P6 = c(0.698);
const tormentas = g(0.189), galv = g(0.441), texas = g(0.509), ricas = g(0.564), estado = g(0.626);
const arena = g(0.713), alto = g(0.777), menos = g(0.862), nueve = g(0.903), mar = g(0.958);
const cline = c(0.080), noSat = c(0.157), sat = c(0.170), noRad = c(0.216), rad = c(0.227), solo = c(0.281), baro = c(0.300);
const wash = c(0.401), oleaje = c(0.478), sube = c(0.642);
const cuenta = c(0.700), va = c(0.782), avisa = c(0.862), mueve = c(0.922);

// ── 1 · la foto en la playa ─────────────────────────────────────────────────────────────────────────────────────
const FOTOGRAFO = { C: hex('#5a4a3a'), c: hex('#443828'), F: hex('#3a3a46'), W: hex('#f2eee2'), o: hex('#2a2430') };
const camaraFoto = (x, s) => {   // el trípode y la cámara de fuelle; la lente mira a la izquierda
  for (const [dx, col] of [[-7, C.maderaS], [5, C.maderaS], [-1, C.madera]]) R.linea(x, s - 19, x + dx, s - 1, col);
  figura([[x - 5, s - 28, x + 5, s - 20, C.madera], [x - 10, s - 27, x - 6, s - 21, hex('#2e2a30')], [x - 13, s - 26, x - 11, s - 22, C.oro]]);
  R.rect(x - 4, s - 28, x + 4, s - 28, C.maderaL); R.rect(x - 4, s - 21, x + 4, s - 20, C.maderaS);
  for (let i = x - 9; i <= x - 7; i += 2) R.rect(i, s - 27, i, s - 21, hex('#4a4450'));
  R.pset(x - 13, s - 24, hex('#8ac0e0')); R.pset(x + 4, s - 27, C.oroL); R.pset(x - 4, s - 27, C.oroL);
};
const telaFoto = (x, s, bajo) => {   // la tela negra: sobre la cabeza del fotógrafo o colgando detrás de la cámara
  if (bajo) {
    R.poligono([[x + 3, s - 30], [x + 18, s - 31], [x + 21, s - 13], [x + 15, s - 11], [x + 4, s - 16]], C.k);
    R.poligono([[x + 4, s - 29], [x + 17, s - 30], [x + 20, s - 14], [x + 15, s - 12], [x + 5, s - 17]], hex('#2a2430'));
    for (const fx of [x + 9, x + 14]) R.linea(fx, s - 29, fx + 1, s - 14, hex('#4a4050'));
  } else { R.rect(x + 5, s - 28, x + 8, s - 17, C.k); R.rect(x + 6, s - 27, x + 7, s - 18, hex('#2a2430')); }
};
const llegan = [1.3, 3.1], posan = 3.2, tapa = [2.95, 5.25], alzaPan = 3.55, flashT = tormentas + 0.05, aVer = [5.55, P2 + 0.4];
const p1 = (t) => {
  T.galveston(R, t, { encuadre: 'playa' });
  const s = 160, cx = 200, fx = cx + 4;
  const u = lin(t, llegan[0], llegan[1]), v = lin(t, aVer[0], aVer[1]), xs = Math.round(lerp(30, 106, u) + lerp(0, 30, v));
  // las huellas de la pareja en la arena
  for (let x = 24; x < xs; x += 5) { R.pset(x + 4, s + 1 + ((x / 5) % 2), hex('#c8a878')); R.pset(x + 20, s + 2 - ((x / 5) % 2), hex('#c8a878')); }
  // la pareja llega, posa muy tiesa, el destello la deslumbra, se ríe y va a ver la foto
  const anda = (u > 0 && u < 1) || (v > 0 && v < 1), tieso = t > posan && t < flashT, ciega = entre(t, flashT, flashT + 0.55);
  R.actor(EL.vecino, xs, s, t, { dir: 1, anda, quieto: tieso, pal: SENOR, sorpresa: ciega, sonrisa: !ciega && t > flashT, habla: entre(t, flashT + 0.6, flashT + 1.3) && parpadeo(t, 8), dedo: entre(t, flashT + 0.6, flashT + 1.2) });
  R.actor(EL.vecina, xs + 16, s + 1, t, { dir: 1, anda, quieto: tieso, pal: SENORA, sorpresa: ciega, sonrisa: !ciega });
  { const [hx, hy] = manoAtras(xs + 16, s + 1, 1); sombrilla(hx, hy); }
  // el fotógrafo: ajusta la cámara, los llama, se mete bajo la tela, levanta el magnesio y sale contento
  const bajo = entre(t, tapa[0], tapa[1]), conPan = entre(t, alzaPan, tapa[1]);
  R.actor(EL.vecino, fx, s, t, { dir: -1, pal: FOTOGRAFO, dedo: conPan || entre(t, 1.6, 2.2) || entre(t, tapa[1] + 0.15, tapa[1] + 0.9), habla: entre(t, 2.25, 2.85) && parpadeo(t, 8), sonrisa: t > tapa[1] });
  camaraFoto(cx, s); telaFoto(cx, s, bajo);
  if (conPan) { const [hx, hy] = manoArriba(fx, s, -1); R.rect(hx, hy - 5, hx, hy - 1, C.maderaS); R.rect(hx - 3, hy - 7, hx + 3, hy - 6, C.k); R.rect(hx - 2, hy - 7, hx + 2, hy - 7, C.metalL); if (t < flashT) { R.pset(hx - 1, hy - 8, C.blanco); R.pset(hx + 1, hy - 8, C.blanco); } }
  if (entre(t, 2.25, 2.85)) R.bocadillo(fx - 2, s - 30);
  // el destello del magnesio y su humo, que sube y se lo lleva la brisa
  const ft = t - flashT, [px, py] = manoArriba(fx, s, -1);
  if (ft > 0 && ft < 1.9) for (let k = 0; k < 5; k++) { const qq = ft - k * 0.08; if (qq < 0) continue; const r = Math.round(1 + qq * 2.2), x = Math.round(px + qq * 10 + Math.sin(qq * 3 + k) * 2), y = Math.round(py - 9 - qq * 14 - k * 3); if (r < 8) { R.disco(x, y, r + 1, hex('#a8a8b0')); R.disco(x - 1, y - 1, r, qq > 1.2 ? hex('#ececf0') : hex('#d4d4dc')); } }
  if (ft >= 0 && ft < 0.14) { R.disco(px, py - 8, 6, C.blanco); for (let r = 7; r < 15; r++) { R.pset(px + r, py - 8, C.blanco); R.pset(px - r, py - 8, C.blanco); R.pset(px, py - 8 - r, C.blanco); R.pset(px, py - 8 + r, C.blanco); } T.tinte(R, 0, 179, [255, 255, 250], 0.35 * (1 - ft / 0.14)); }
};

// ── 2 · la calle: el tranvía, el periódico y la moneda ──────────────────────────────────────────────────────────
const NOBLE = { C: hex('#2a2a36'), c: hex('#1c1c26'), F: hex('#3a3a46'), W: hex('#f2eee2'), o: hex('#8a2a3a') };
const CHICO = { C: hex('#5a6a8a'), c: hex('#46526e'), F: hex('#7a6a52'), W: hex('#e8e0d0'), o: hex('#c83a3a'), H: hex('#8a5428'), h: hex('#a8703a') };
const DAMA = { C: hex('#5a7a4a'), c: hex('#46603a'), W: hex('#e8e4c8'), L: hex('#2a2430') };
const tranviaX = (t) => t < estado - 0.1 ? Math.round(lerp(330, 134, frena(lin(t, P2 - 0.5, galv + 0.2)))) : Math.round(lerp(134, -150, lin(t, estado - 0.1, P3 + 0.6) ** 2));
const moneda = ricas - 0.12, periodico = moneda + 0.55;
const hojaPeriodico = (x, y, w = 5, h = 6) => { R.rect(x - 1, y - 1, x + w + 1, y + h + 1, C.k); R.rect(x, y, x + w, y + h, hex('#ece6d6')); for (let j = y + 1; j < y + h; j += 2) R.rect(x + 1, j, x + w - 1, j, hex('#8a8478')); R.rect(x + 1, y + 1, x + 2, y + 2, hex('#5a5650')); };
const p2 = (t) => {
  T.galveston(R, t, { encuadre: 'calle', tranvia: tranviaX(t) });
  const s = 166, bx = 204, cobra = t > moneda + 0.4, voces = t < galv + 0.9 && Math.floor(t * 2.5) % 2 === 0;
  // el niño de los periódicos vocea con un ejemplar en alto y el fajo bajo el brazo; cobra, da un saltito y entrega
  R.actor(EL.chico, bx, s, t, { dir: -1, pal: CHICO, tocado: 'gorra', dedo: voces || entre(t, periodico - 0.3, periodico + 0.1), habla: t < galv + 0.9 && parpadeo(t, 9), sonrisa: cobra, salto: entre(t, moneda + 0.45, moneda + 0.75) ? 2 : 0 });
  { const [hx, hy] = enMano(bx, s, -1); for (let k = 0; k < 3; k++) hojaPeriodico(hx - 3, hy - 3 + k, 6, 2); }
  if (voces || entre(t, periodico - 0.3, periodico + 0.1)) { const [hx, hy] = manoArriba(bx, s, -1); hojaPeriodico(hx - 3, hy - 7); }
  if (entre(t, P2 + 0.2, galv + 0.7)) R.bocadillo(bx + 4, s - 31 - (parpadeo(t, 5) ? 1 : 0));
  // el caballero de chistera llega, lanza la moneda (brilla en «richest»), coge el periódico y se va leyéndolo
  const u1 = lin(t, P2 + 0.05, texas + 0.1), u2 = lin(t, periodico + 0.25, periodico + 4.2), gx = Math.round(lerp(36, 168, u1) + lerp(0, 140, u2));
  R.actor(EL.vecino, gx, s, t, { dir: 1, pal: NOBLE, tocado: 'chistera', anda: (u1 > 0 && u1 < 1) || (u2 > 0 && u2 < 1), dedo: entre(t, moneda - 0.35, moneda + 0.1), sonrisa: t > periodico });
  if (t > periodico) hojaPeriodico(gx + 11, s - 20, 9, 7);
  if (entre(t, moneda, moneda + 0.45)) { const qq = lin(t, moneda, moneda + 0.45), x = Math.round(lerp(gx + 16, bx - 3, qq)), y = Math.round(lerp(s - 21, s - 12, qq) - Math.sin(qq * Math.PI) * 11);
    R.rect(x - 1, y - 1, x + 2, y + 2, C.k); R.rect(x, y, x + 1, y + 1, C.oro); R.pset(x, y, C.oroL);
    if (qq > 0.3 && qq < 0.75) for (let r = 2; r < 5; r++) { R.pset(x + r, y, C.oroL); R.pset(x - r + 1, y, C.oroL); R.pset(x, y - r, C.oroL); R.pset(x, y + r + 1, C.oroL); } }
  if (entre(t, moneda + 0.3, moneda + 1.3)) { const qq = lin(t, moneda + 0.3, moneda + 1.3); R.numero('$', bx + 2, Math.round(s - 30 - qq * 10), { color: C.oroL }); }
  // la dama de la sombrilla pasea por delante
  const dx = Math.round(lerp(336, 222, lin(t, P2, P3 + 0.3)));
  R.actor(EL.vecina, dx, 174, t, { dir: -1, pal: DAMA, anda: true });
  { const [hx, hy] = manoAtras(dx, 174, -1); sombrilla(hx, hy, hex('#f4f0e8'), hex('#5a7a4a')); }
};

// ── 3 · la isla baja, desde el golfo ─────────────────────────────────────────────────────────────────────────────
const REMERO = { C: hex('#4a6a8a'), c: hex('#36506a'), F: hex('#5a4a3a'), W: hex('#e8e0d0'), o: hex('#4a6a8a') };
const bote = (x, y, t) => {   // el bote de remos (x: el centro; y: la línea de flotación), con la estela detrás
  for (let k = 0; k < 12; k++) { const xx = x + 18 + k * 2 + Math.round(Math.sin(t * 3 + k) * 1), yy = y + 1 + (k % 2); if (k % 3 !== 2) R.pset(xx, yy, C.blanco); }
  R.poligono([[x - 18, y - 7], [x + 18, y - 7], [x + 14, y + 1], [x - 13, y + 1]], C.k);
  R.poligono([[x - 17, y - 6], [x + 17, y - 6], [x + 13, y], [x - 12, y]], hex('#7a4a2a'));
  R.rect(x - 16, y - 6, x + 16, y - 6, hex('#a87040')); R.rect(x - 14, y - 3, x + 14, y - 3, hex('#e8e0d0')); for (let i = -12; i <= 12; i += 6) R.pset(x + i, y - 1, hex('#5a341c'));
  for (let i = -15; i <= 15; i++) if ((i + Math.floor(t * 6)) % 4) R.pset(x + i, y + 2, hex('#e8f0f0'));
};
const p3 = (t) => {
  T.galveston(R, t, { encuadre: 'isla' });
  // en «sand island», un destello recorre la franja de arena de punta a punta
  const b = lin(t, arena - 0.1, arena + 0.65);
  if (b > 0 && b < 1) { const sx = Math.round(lerp(-30, 350, b)); for (let y = 105; y <= 111; y++) for (let x = Math.max(0, sx - 16); x <= Math.min(319, sx + 16); x++) R.pset(x, y, mezcla(R.pget(x, y), [255, 250, 220], 0.55 * (1 - Math.abs(x - sx) / 17))); }
  // «highest point»: la marca roja cae sobre lo más alto de la isla
  const mk = tramo(t, alto + 0.05, alto + 0.4);
  if (mk > 0) { const mx = 156, my = Math.round(lerp(64, 90, mk)) + (mk >= 1 ? Math.round(Math.sin((t - alto) * 6)) : 0);
    R.poligono([[mx - 5, my - 1], [mx + 6, my - 1], [mx + 0.5, my + 6]], C.k); R.poligono([[mx - 4, my], [mx + 5, my], [mx + 0.5, my + 5]], C.rojo); R.pset(mx - 1, my + 1, hex('#f07a6a'));
    for (let y = my + 7; y < 105; y += 2) R.pset(mx, y, C.rojo); }
  // «less than nine feet»: el nivel del mar y lo más alto de la isla, trazados de lado a lado, y la cota «8.7»
  const L = lin(t, menos - 0.05, menos + 0.5), xL = Math.round(L * 320);
  for (let x = 0; x < xL; x++) if (x % 6 < 4) { R.pset(x, 103, C.k); R.pset(x, 104, C.oroL); R.pset(x, 105, C.oro); R.pset(x, 106, C.k); R.pset(x, 112, C.k); R.pset(x, 113, C.blanco); R.pset(x, 114, hex('#bfeaf4')); R.pset(x, 115, C.k); }
  if (t > nueve - 0.15) { const e = tramo(t, nueve - 0.15, nueve + 0.15), X = 240;
    R.rect(X, 106, X, 112, C.blanco); R.pset(X - 1, 107, C.blanco); R.pset(X + 1, 107, C.blanco); R.pset(X - 1, 111, C.blanco); R.pset(X + 1, 111, C.blanco);
    const ty = Math.round(lerp(96, 88, e)); R.linea(X + 1, 105, X + 7, ty + 11, C.k); R.rect(X + 5, ty, X + 33, ty + 11, C.k); R.rect(X + 6, ty + 1, X + 32, ty + 10, C.blanco); R.rect(X + 6, ty + 10, X + 32, ty + 10, hex('#c8c4bc'));
    R.numero('8.7', X + 9, ty + 9, { color: C.k, sombra: false }); }
  // «above the sea»: una ola salpica en la orilla, al lado de la cota
  const sp = t - mar; if (sp > 0 && sp < 0.8) for (let k = 0; k < 16; k++) { const a = -Math.PI * (0.15 + 0.7 * hh(k, 1, 31)), v = 12 + 14 * hh(k, 2, 31), x = Math.round(214 + Math.cos(a) * v * sp + (k - 8)), y = Math.round(112 + Math.sin(a) * v * sp + 30 * sp * sp); if (y < 113) R.pset(x, y, k % 3 ? C.blanco : hex('#bfe0ec')); }
  // delante, un pescador rema en su bote hacia el puerto (mira hacia popa, como se rema)
  const bxp = Math.round(lerp(304, 176, lin(t, P3, P4 + 0.3))), fase = t * 3.4, yb = 153 + Math.round(Math.sin(t * 1.7));
  R.actor(EL.vecino, bxp - 7, yb - 1, t, { dir: entre(t, alto - 0.2, alto + 0.9) || entre(t, nueve, nueve + 0.8) ? -1 : 1, pal: REMERO, tocado: 'gorra', quieto: true, sonrisa: t > mar });
  bote(bxp, yb, t);
  for (const dz of [0, 2]) { const ox = bxp - 9 + Math.round(Math.sin(fase) * 7), oy = yb + (Math.cos(fase) > 0 ? 1 : -3); R.linea(bxp + 1 + dz, yb - 11, ox + dz, oy, hex('#c8a060')); R.rect(ox - 1 + dz, oy, ox + 1 + dz, oy + 1, hex('#a87040')); }
  if (Math.cos(fase) > 0.8) for (let k = 0; k < 4; k++) R.pset(bxp - 9 + Math.round(Math.sin(fase) * 7) - 2 + k, yb + (k % 2), C.blanco);
};

// ── 4 · la oficina: el barómetro ─────────────────────────────────────────────────────────────────────────────────
// el bocadillo con lo que no tiene: un satélite o un radar, que se tacha con una X roja
const satelite = (x, y) => {   // el satélite del bocadillo: cuerpo plateado, dos paneles azules y la antena
  R.rect(x - 2, y - 3, x + 2, y + 3, C.k); R.rect(x - 1, y - 2, x + 1, y + 2, hex('#c8ccd8')); R.pset(x - 1, y - 2, C.blanco);
  for (const s of [-1, 1]) { const x0 = s < 0 ? x - 8 : x + 4; R.rect(x0 - 1, y - 3, x0 + 4, y + 3, C.k); R.rect(x0, y - 2, x0 + 3, y + 2, hex('#3a5ab8')); R.rect(x0 + 1, y - 2, x0 + 1, y + 2, hex('#6a8ae8')); R.rect(x0, y, x0 + 3, y, hex('#24366e')); }
  R.linea(x, y - 3, x + 2, y - 6, C.k); R.pset(x + 2, y - 6, C.rojo);
};
const globo = (x, y, tipo, tachado, t) => {
  const bl = hex('#f4f6fa');
  R.rect(x - 9, y - 13, x + 9, y + 1, C.k); R.rect(x - 10, y - 12, x + 10, y, C.k);
  R.poligono([[x - 7, y], [x - 2, y], [x - 9, y + 5]], C.k);
  R.rect(x - 9, y - 12, x + 9, y, bl); R.poligono([[x - 6, y], [x - 3, y], [x - 8, y + 3]], bl);
  if (tipo === 'sat') satelite(x, y - 5);
  else { R.disco(x, y - 6, 5, C.k); R.disco(x, y - 6, 4, hex('#1e4a2a')); R.anillo(x + 0.5, y - 5.5, 2.4, hex('#3a8a4a')); const a = t * 6; R.linea(x, y - 6, Math.round(x + Math.cos(a) * 4), Math.round(y - 6 + Math.sin(a) * 4), hex('#8af08a')); if (parpadeo(t, 5)) R.pset(x + 2, y - 8, hex('#d8ffd8')); }
  if (tachado) for (const dx of [0, 1]) { R.linea(x - 7 + dx, y - 11, x + 7 + dx, y - 1, C.rojo); R.linea(x + 7 + dx, y - 11, x - 7 + dx, y - 1, C.rojo); }
};
const libreta = (x, y, escribe) => { R.rect(x - 1, y - 2, x + 5, y + 2, C.k); R.rect(x, y - 1, x + 4, y + 1, C.papel); R.rect(x, y - 1, x, y + 1, hex('#3a5a3a')); if (escribe) R.pset(x + 2 + (escribe % 2), y, C.k); };
const p4 = (t) => {
  const pres = 29.62 - 0.42 * tramo(t, baro + 0.12, baro + 0.85), tel = lin(t, P5 - 0.75, P5 - 0.2);
  T.galveston(R, t, { encuadre: 'oficina', cielo: 'gris', presion: pres, telegrafo: tel });
  const s = 162, x = 96, gira = t > solo + 0.05, toca = entre(t, baro - 0.15, baro + 0.25), susto = t > baro + 0.45;
  const sombrero = entre(t, cline, cline + 0.65), hombros = entre(t, rad + 0.3, solo - 0.15);
  R.actor(EL.cline, x, s, t, { dir: gira ? -1 : 1, quieto: !gira && t < cline - 0.1, dedo: sombrero || toca || entre(t, baro + 0.95, P5), brazos: hombros, sonrisa: entre(t, cline, cline + 0.9), sorpresa: susto, habla: entre(t, noSat - 0.1, rad + 0.25) && parpadeo(t, 7) });
  // la libreta en la que apunta, mientras no se gira
  if (!gira && !sombrero && !hombros) { const [hx, hy] = enMano(x, s, 1); libreta(hx - 1, hy, t < cline - 0.15 ? Math.floor(t * 9) + 1 : 0); }
  // ni satélites ni radar
  if (entre(t, noSat - 0.12, solo - 0.1)) globo(128, 114, 'sat', t > sat + 0.08, t);
  if (entre(t, noRad - 0.12, solo - 0.1)) globo(154, 104, 'radar', t > rad + 0.06, t);
  // el ayudante archiva papeles en la estantería y, cuando el telégrafo empieza a sonar, acude a copiar el telegrama
  { const va = lin(t, P5 - 0.8, P5 - 0.45), ax = Math.round(lerp(256, 238, va)), archiva = t < P5 - 0.85 && Math.sin(t * 1.4) > 0.55;
    R.actor(EL.vecino, ax, 166, t, { dir: t > P5 - 0.85 ? -1 : 1, pal: AYUDANTE, tocado: 'gorra', anda: va > 0 && va < 1, dedo: archiva || t > P5 - 0.4, habla: t > P5 - 0.4 && parpadeo(t, 9), sorpresa: entre(t, P5 - 0.85, P5 - 0.6) });
    if (archiva) { const [hx, hy] = manoArriba(ax, 166, 1); R.rect(hx - 1, hy - 5, hx + 4, hy, C.k); R.rect(hx, hy - 4, hx + 3, hy - 1, C.papel); } }
  // la flecha roja que dice que el mercurio baja
  if (t > baro + 0.3) { const dy = Math.round(lin(t, baro + 0.3, baro + 0.9) * 5) + (Math.floor(t * 4) % 2); R.poligono([[97, 49 + dy], [106, 49 + dy], [101.5, 56 + dy]], C.k); R.poligono([[98, 50 + dy], [105, 50 + dy], [101.5, 55 + dy]], C.rojo); R.rect(100, 43 + dy, 103, 49 + dy, C.k); R.rect(101, 44 + dy, 102, 49 + dy, C.rojo); }
};

// ── 5 · la azotea: el telegrama y la bandera ─────────────────────────────────────────────────────────────────────
const AYUDANTE = { C: hex('#e8e4dc'), c: hex('#c0bcb4'), F: hex('#4a4a5a'), W: hex('#e8e4dc'), o: hex('#3a3a4a'), H: hex('#8a5428'), h: hex('#a8703a') };
const telegrama = (x, y) => { R.rect(x - 1, y - 1, x + 6, y + 7, C.k); R.rect(x, y, x + 5, y + 6, hex('#f0ead8')); R.rect(x, y, x + 5, y, hex('#c8a050')); for (let j = y + 2; j < y + 6; j += 2) for (let i = x + 1; i < x + 5; i++) if ((i + j) % 3) R.pset(i, j, C.k); };
const catalejo = (x, y) => { R.rect(x, y - 1, x + 9, y + 1, C.k); R.rect(x + 1, y, x + 8, y, C.oro); R.rect(x + 3, y - 1, x + 3, y + 1, hex('#6a4a1a')); R.rect(x + 6, y - 1, x + 6, y + 1, hex('#6a4a1a')); R.pset(x + 8, y, C.oroL); };
const iza = [wash + 0.25, oleaje + 0.9];
const p5 = (t) => {
  const ban = tramo(t, iza[0], iza[1]);
  T.galveston(R, t, { encuadre: 'tejado', cielo: 'gris', bandera: ban });
  // el mar de fondo que entra desde el golfo: crestas en la franja del horizonte, más desde «swell»
  const fuerza = 0.35 + 0.65 * lin(t, oleaje - 0.3, oleaje + 0.6);
  for (let k = 0; k < 34; k++) { if (hh(k, 7, 30) > 0.3 + fuerza * 0.7) continue; const y = 87 + (k % 5) * 2, x = Math.round(((k * 53 + t * (5 + (k % 3) * 2)) % 340) - 10), largo = 2 + (k % 3) + Math.round(fuerza * 3);
    for (let i = 0; i < largo; i++) { const p = R.pget(x + i, y), r = p & 255, bb = (p >> 16) & 255; if (bb > r + 14) R.pset(x + i, y, i < 2 ? C.blanco : hex('#c8d8e0')); } }
  // delante: la caja de las banderas de repuesto (rojas con su cuadro negro) y un rollo de driza
  figura([[248, 160, 274, 172, hex('#8a6a42')]]); R.rect(249, 161, 273, 162, hex('#a8885a')); R.rect(249, 167, 273, 167, hex('#6a4e30')); R.rect(260, 161, 261, 172, hex('#6a4e30'));
  for (const [fx, fy] of [[251, 157], [262, 158]]) { R.rect(fx - 1, fy - 1, fx + 9, fy + 3, C.k); R.rect(fx, fy, fx + 8, fy + 2, C.rojo); R.rect(fx + 3, fy, fx + 5, fy + 2, C.k); }
  for (const [rx, ry] of [[7, 3], [5, 2], [3, 1]]) for (let a = 0; a < 6.28; a += 0.25) R.pset(Math.round(204 + Math.cos(a) * rx), Math.round(170 + Math.sin(a) * ry), rx === 7 ? hex('#8a7450') : hex('#c8b088'));
  // la puerta de la escalera se abre y sale Cline con el telegrama
  if (entre(t, P5 - 0.1, P5 + 1.0)) { R.rect(19, 111, 33, 139, hex('#2a2024')); R.rect(19, 111, 33, 113, hex('#161014')); R.rect(13, 110, 18, 140, C.k); R.rect(14, 111, 17, 139, hex('#7a5a3a')); R.rect(14, 111, 14, 139, hex('#9a7a52')); }
  const sx = lin(t, P5 + 0.05, P5 + 0.75), ux = lin(t, wash + 0.6, oleaje + 1.3);
  const x = Math.round(lerp(18, 44, sx) + lerp(0, 84, ux)), s = Math.round(lerp(140, 156, sx));
  const lee = entre(t, P5 + 0.75, wash - 0.1), senal = entre(t, wash - 0.1, wash + 0.5), mira = t > oleaje + 1.35, susto = t > sube + 0.02;
  R.actor(EL.cline, x, s, t, { dir: 1, anda: (sx > 0 && sx < 1) || (ux > 0 && ux < 1), dedo: lee || senal || mira, sorpresa: susto, habla: senal && parpadeo(t, 8) });
  if (lee || senal) { const [hx, hy] = manoArriba(x, s, 1); telegrama(hx - 2, hy - 8); }
  else if (!mira) { const [hx, hy] = enMano(x, s, 1); telegrama(hx - 1, hy - 3); }
  if (mira) catalejo(x + 13, s - 19);
  if (entre(t, sube, sube + 0.9)) R.bocadillo(x + 8, s - 31);
  // el ayudante prepara la bandera, mira la seña de Cline e iza el aviso de tormenta tirando de la driza
  const tira = ban > 0 && ban < 1, mano = Math.floor(t * 5) % 2;
  R.actor(EL.vecino, 214, 160, t, { dir: entre(t, wash - 0.25, iza[0]) || t > sube + 0.3 ? -1 : 1, pal: AYUDANTE, tocado: 'gorra', dedo: (tira && mano === 0) || entre(t, P5 + 0.3, P5 + 1.2) || t > sube + 0.4, brazos: tira && mano === 1, sonrisa: entre(t, wash, iza[1] + 0.5), sorpresa: entre(t, sube + 0.15, sube + 0.4) });
};

// ── 6 · la playa: avisa a la gente ───────────────────────────────────────────────────────────────────────────────
const RUTA = [[6, 172], [80, 164], [150, 172], [226, 164], [300, 171]];
const p6 = (t) => {
  T.galveston(R, t, { encuadre: 'playa', cielo: 'gris', oleaje: 1, agua: lerp(0.3, 0.75, lin(t, P6, E.duracion)) });
  // «by his own account»: su recorrido playa arriba y abajo, en huellas, y un «?» discreto encima
  const hu = lin(t, cuenta - 0.05, cuenta + 0.8), apaga = lin(t, va + 0.1, va + 0.7);
  if (hu > 0 && apaga < 1) {
    let total = 0; const segs = RUTA.slice(1).map((p, i) => { const l = Math.hypot(p[0] - RUTA[i][0], p[1] - RUTA[i][1]); total += l; return l; });
    let hecho = 0; for (let i = 0; i < segs.length; i++) for (let d = 0; d < segs[i]; d += 6) { if ((hecho + d) / total > hu) break; const f = d / segs[i], x = Math.round(lerp(RUTA[i][0], RUTA[i + 1][0], f)), y = Math.round(lerp(RUTA[i][1], RUTA[i + 1][1], f)), lado = Math.floor((hecho + d) / 6) % 2 ? 1 : -1; if (hh(x, y, 5) < apaga) continue; R.rect(x, y + lado, x + 1, y + lado, hex('#7a6444')); R.rect(x, y + lado + 1, x + 1, y + lado + 1, hex('#e8d8b0')); }
    if (hu > 0.7 && apaga < 0.6) { const a = parpadeo(t, 3) ? 0 : 1; R.bocadillo(296, 150 - a, { icono: '?' }); }
  }
  // Cline llega a toda prisa, avisa a la pareja, les señala la ciudad y sigue playa arriba
  const s = 162, ux = lin(t, P6 + 0.05, avisa - 0.35), vuelve = t > mueve + 1.1, ux2 = lin(t, mueve + 1.1, mueve + 2.6);
  const x = vuelve ? Math.round(lerp(150, 196, ux2)) : Math.round(lerp(6, 150, ux));
  const avisando = entre(t, avisa - 0.25, mueve - 0.1), senala = entre(t, mueve - 0.05, mueve + 1.05);
  R.actor(EL.cline, x, s, t, { dir: senala ? -1 : 1, anda: (ux > 0 && ux < 1) || (vuelve && ux2 < 1), dedo: avisando || senala, habla: (avisando || senala) && parpadeo(t, 8) });
  if (entre(t, avisa - 0.1, avisa + 0.75)) R.bocadillo(x + 10, s - 31);
  // la pareja que miraba las olas se asusta y se va corriendo hacia la ciudad (por delante de Cline)
  const hx = lin(t, mueve + 0.35, mueve + 2.3), px = Math.round(lerp(194, 30, hx)), oye = t > avisa - 0.5;
  detras([[38, 164, 70, 172]], () => {   // al irse pasan por detrás del tronco varado
    R.actor(EL.vecino, px, s + 4, t, { dir: oye ? -1 : 1, anda: hx > 0 && hx < 1, dedo: entre(t, P6 + 0.2, P6 + 1.2), sonrisa: !oye, sorpresa: entre(t, avisa + 0.1, mueve + 0.5) });
    R.actor(EL.vecina, px + 16, s + 5, t, { dir: oye ? -1 : 1, anda: hx > 0 && hx < 1, sonrisa: !oye, sorpresa: entre(t, avisa + 0.15, mueve + 0.6), pal: { W: hex('#e8e0c8') } });
  });
};
const efectos = [[1.5, 'ola'], [1.75, 'golpecito'], [tapa[0] + 0.05, 'whoosh'], [flashT, 'flash'], [5.3, 'ola'],
  [galv - 0.25, 'timbre'], [ricas + 0.02, 'brillo'], [periodico, 'papel'], [estado + 0.05, 'timbre'],
  [P3 + 0.3, 'ola'], [arena, 'whoosh'], [alto + 0.25, 'pop'], [menos, 'lapiz'], [nueve, 'pop'], [mar + 0.05, 'ola'],
  [P4 + 0.4, 'tic'], [sat + 0.08, 'pop'], [rad + 0.06, 'pop'], [baro, 'golpecito'], [P5 - 0.55, 'tic'], [P5 - 0.3, 'tic'],
  [P5 + 0.02, 'puerta'], [P5 + 0.8, 'papel'], [wash + 0.3, 'rafaga'], [oleaje + 0.1, 'ola'], [sube, 'pop'],
  [P6 + 0.2, 'ola'], [va + 0.3, 'rafaga'], [avisa, 'pop'], [mueve + 0.5, 'ola']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '1900', efectos, año: 1900 });
''')

E['hu-marea'] = ('La marea', '''// HU-MAREA (frase 14), la noche del 8 de septiembre de 1900. Empieza con un golpe de música. Tres planos:
// 1. el golpe: la calle de noche bajo la tormenta; cae un rayo detrás de las casas y el fogonazo lo ilumina todo; el mar
//    entra por la calle y sube hasta los porches («there is no higher ground»); un vecino corre con el sombrero en la
//    mano, cruza chapoteando, sube los escalones y entra en su casa; arriba se enciende su ventana con su silueta; las
//    farolas se apagan; otro rayo en «that night»;
// 2. «the sea rises about fifteen feet»: inserto de la escala de mareas de cerca, en el poste del telégrafo, con la
//    calle inundada en penumbra detrás (en las ventanas de arriba, las siluetas de la gente a salvo); el agua sube por
//    la escala y, en «feet», el 15 parpadea y sale el «15» grande; en «sweeps across the city» la corriente arrastra
//    deprisa una valla, una puerta y un barril y una ola revienta contra el poste; los hilos se mecen y llueve;
// 3. «the deadliest natural disaster»: inserto de la ventana de arriba de una casa, encendida, sobre el agua: la
//    familia a salvo junto a la lámpara; la farola de la calle se apaga en «deadliest» y en la casa de enfrente se apaga
//    una ventana; flotan una mecedora, un barril y unas tablas; el padre deja la lámpara en el alféizar para que alumbre
//    fuera; la contraventana golpea, llueve y relampaguea a lo lejos. Sin víctimas.''', COMUN + r'''
const m = (f) => en('marea', f);
// los cortes: «rises» y «In what is still»
const P2 = m(0.275), P3 = m(0.681);
const esaNoche = m(0.203), pies = m(0.39), barre = m(0.447), otro = m(0.632);
const mortal = m(0.757), desastre = m(0.839), historia = m(0.944);

// ── 1 · el golpe: el mar entra en la calle ───────────────────────────────────────────────────────────────────────
const rayo = (x0, y0, x1, y1, sem, cielo = () => true) => {   // un rayo quebrado con su halo y una rama; solo sobre el cielo
  const pts = [[x0, y0]]; for (let i = 1; i <= 8; i++) { const f = i / 8; pts.push([Math.round(lerp(x0, x1, f) + (i < 8 ? (hh(i, sem, 40) - 0.5) * 16 : 0)), Math.round(lerp(y0, y1, f))]); }
  const traza = (a, b, col) => R.linea(a[0], a[1], b[0], b[1], (x, y) => (cielo(x, y) ? col : null));
  for (let i = 0; i + 1 < pts.length; i++) for (const dx of [-1, 1]) traza([pts[i][0] + dx, pts[i][1]], [pts[i + 1][0] + dx, pts[i + 1][1]], hex('#8a9cff'));
  for (let i = 0; i + 1 < pts.length; i++) traza(pts[i], pts[i + 1], C.blanco);
  const [bx, by] = pts[3]; traza([bx, by], [bx + 12, by + 11], hex('#c8d0ff')); traza([bx + 12, by + 11], [bx + 9, by + 19], hex('#c8d0ff'));
};
const esCielo = (x, y) => { const p = R.pget(x, y), r = p & 255, b = (p >> 16) & 255; return b > r + 6 && r < 90; };
const a1 = (t) => lerp(0, 0.52, tramo(t, 0.55, P2 + 0.3));
const VECINO_C = { C: hex('#6a5a4a'), c: hex('#4e4234'), F: hex('#4a4a52'), W: hex('#e8e0d0') };
// el camino del vecino: la acera, la calle (chapoteando), los escalones del porche y la puerta de la casa crema
const camino = (t) => { const u1 = lin(t, 0.2, 1.15), u2 = lin(t, 1.15, 2.2), u3 = lin(t, 2.2, 2.75);
  if (u2 === 0) return [Math.round(lerp(28, 96, u1)), 166, u1 > 0 && u1 < 1];
  if (u3 === 0) return [Math.round(lerp(96, 105, u2)), Math.round(lerp(166, 122, u2)), true];
  return [Math.round(lerp(105, 104, u3)), Math.round(lerp(122, 104, u3)), u3 < 1]; };
const p1 = (t) => {
  const a = a1(t);
  T.galveston(R, t, { encuadre: 'calle', noche: 1, cielo: 'tormenta', agua: a });
  const luz = (x, y) => { const p = R.pget(x, y), r = p & 255, g = (p >> 8) & 255, b = (p >> 16) & 255; return r > 170 && g > 120 && b < 150; };
  // el vecino corre a su casa con el sombrero en la mano: cruza la calle chapoteando, sube los escalones y entra
  if (t < 2.8) { const [x, s, anda] = camino(t);
    tenido([20, 26, 60], 0.4, () => R.actor(EL.vecino, x, s, t, { dir: 1, pal: VECINO_C, anda, sorpresa: true, dedo: true }));
    if (s > 124 && s < 150 && anda) for (let k = 0; k < 8; k++) { const ph = (t * 4 + k / 8) % 1; R.pset(x + 4 + Math.round((hh(k, 1, 88) - 0.5) * 14 * ph), s - Math.round(Math.sin(ph * Math.PI) * 5), C.blanco); } }
  // ya dentro: la lámpara sube del porche a la ventana de arriba, con su silueta
  if (t > 2.85) { const sx = 111 + Math.round(Math.sin(t * 0.8) * 1.5); for (let y = 60; y <= 76; y++) for (let x = sx - 4; x <= sx + 4; x++) { const cab = Math.hypot(x - sx, y - 64) < 2.4, cuerpo = y >= 67 && Math.abs(x - sx) <= 3 + (y - 67) * 0.3; if ((cab || cuerpo) && luz(x, y)) R.pset(x, y, hex('#3a2a30')); }
    const lx = sx + 5, ly = 66; for (let y = ly - 2; y <= ly + 2; y++) for (let x = lx - 2; x <= lx + 2; x++) if (Math.hypot(x - lx, y - ly) < 2.2 && luz(x, y)) R.pset(x, y, hex('#fff4c8')); }
  // el golpe: un rayo cae detrás de las casas y el fogonazo lo ilumina todo; otro en «that night»
  for (const [r0, x] of [[0.03, 236], [esaNoche - 0.06, 60]]) { const u = t - r0; if (u < 0 || u > 0.4) continue; if (u < 0.2 || (u > 0.26 && u < 0.32)) rayo(x, 0, x + 14, 58, 3 + x, esCielo); T.tinte(R, 0, 179, [200, 210, 255], u < 0.07 ? 0.5 : 0.5 * Math.max(0, 1 - (u - 0.07) / 0.33)); }
};

// ── 2 · el inserto: la escala de mareas sube hasta quince pies ─────────────────────────────────────────────────
// Delante, el poste del telégrafo con su escala, de cerca; detrás, la calle inundada en penumbra
const ESC = { x0: 178, x1: 202, cero: 172, px: 6 };
const piesAgua = (t) => lerp(7.8, 15.3, tramo(t, P2 - 0.05, pies + 0.25));
const nivelY = (ft) => ESC.cero - ft * ESC.px;
const valla = (x, y, s = 1) => { for (let i = 0; i < 6; i++) { const px = x + i * 4 * s; R.rect(px, y - 9 * s, px + 2 * s - 1, y, C.k); R.rect(px, y - 9 * s + 1, px + 2 * s - 2, y - 1, hex('#d8d0c0')); R.pset(px, y - 10 * s, C.k); } R.rect(x - 1, y - 6 * s, x + 23 * s, y - 5 * s, hex('#a8a090')); };
const puertaFlota = (x, y) => { R.rect(x - 14, y - 4, x + 14, y, C.k); R.rect(x - 13, y - 3, x + 13, y - 1, hex('#7a5a3a')); for (let i = -10; i <= 10; i += 5) R.rect(x + i, y - 3, x + i, y - 1, hex('#5a3e24')); R.pset(x + 9, y - 2, C.oro); };
const p2 = (t) => {
  const ft = piesAgua(t), wy = nivelY(ft);
  T.galveston(R, t, { encuadre: 'calle', agua: Math.min(1, ft / 15) });
  // detrás, en las ventanas encendidas de arriba, la gente a salvo mira el agua (siluetas solo sobre los píxeles de luz)
  { const luz = (x, y) => { const p = R.pget(x, y), r = p & 255, g = (p >> 8) & 255, b = (p >> 16) & 255; return r > 170 && g > 120 && b < 150; };
    [[24, 66], [37, 66], [89, 70], [112, 70], [240, 66], [265, 66]].forEach(([cx, cy], k) => { const x0 = cx + Math.round(Math.sin(t * 0.9 + k * 2) * 1.5); for (let y = cy - 6; y <= cy + 6; y++) for (let x = x0 - 4; x <= x0 + 4; x++) { const cab = Math.hypot(x - x0, y - (cy - 3)) < 2.4, cuerpo = y >= cy && Math.abs(x - x0) <= 3 + (y - cy) * 0.3; if ((cab || cuerpo) && luz(x, y)) R.pset(x, y, hex('#3a2a30')); } }); }
  T.tinte(R, 0, 179, [6, 8, 20], 0.5);
  // el poste: madera con vetas y nudos, los peldaños de hierro y la cruceta con sus aisladores y los hilos que se mecen
  for (let y = 0; y < 180; y++) for (let x = 151; x <= 177; x++) { let c = x === 151 || x === 177 ? C.k : x === 152 ? hex('#7a5a3a') : x >= 175 ? hex('#3a2a1e') : hex('#5a4030'); if (x > 152 && x < 175 && (x === 157 || x === 163 || x === 170) && (y + x * 3) % 13 > 2) c = hex('#4a3426'); R.pset(x, y, c); }
  for (const [ny, nx] of [[30, 160], [96, 168], [142, 158]]) { R.rect(nx - 1, ny - 2, nx + 2, ny + 2, hex('#3a2a1e')); R.pset(nx, ny, hex('#7a5a3a')); }
  for (let y = 20; y < 180; y += 18) { R.rect(144, y - 1, 152, y + 2, C.k); R.rect(145, y, 151, y + 1, hex('#5a5e6a')); R.pset(145, y, hex('#8a8e9a')); }
  R.rect(116, 3, 212, 10, C.k); R.rect(117, 4, 211, 9, hex('#5a4030')); R.rect(117, 4, 211, 4, hex('#7a5a3a'));
  for (const ix of [124, 138, 192, 206]) { R.rect(ix - 1, 0, ix + 1, 3, hex('#3a3a42')); R.rect(ix - 2, -1, ix + 2, 0, hex('#5a9a7a')); }
  for (const [ix, d] of [[124, -1], [138, -1], [192, 1], [206, 1]]) { const sw = Math.round(Math.sin(t * 3 + ix) * 2); R.linea(ix, 0, d < 0 ? 0 : 319, 4 + sw, hex('#2a2a32')); }
  // la escala de mareas: esmalte con una marca por pie y los números cada cinco
  R.rect(ESC.x0 - 1, 8, ESC.x1 + 1, 179, C.k); R.rect(ESC.x0, 9, ESC.x1, 179, hex('#d8d2c4')); R.rect(ESC.x0, 9, ESC.x0, 179, hex('#ece6da')); R.rect(ESC.x1, 9, ESC.x1, 179, hex('#a8a296'));
  for (let f = 0; f <= 26; f++) { const y = Math.round(nivelY(f)); if (y < 10) continue; R.rect(ESC.x0 + 1, y, ESC.x0 + (f % 5 === 0 ? 13 : 6), y, f % 5 === 0 ? C.rojo : C.k); if (f % 5 === 0 && f > 0) R.numero(String(f), f >= 10 ? ESC.x0 + 7 : ESC.x0 + 14, y + 9, { color: C.rojo, sombra: false }); }
  for (const by of [12, 176]) { R.disco(ESC.x1 - 3, by, 1.5, hex('#8a8e9a')); }
  // el agua delante del poste: sube por la escala, con su línea de espuma, crestas, el collar de espuma del poste y la lluvia que salpica
  const AGUA = [[48, 64, 104], [34, 46, 82], [26, 36, 66], [18, 26, 50]];
  for (let x = 0; x < 320; x++) { const yw = Math.round(wy + Math.sin(x * 0.12 + t * 4) * 1.5 + Math.sin(x * 0.05 - t * 2.5)); for (let y = Math.max(0, yw); y < 180; y++) { const d = y - yw; if (d === 0) { R.pset(x, y, (x + Math.floor(t * 12)) % 5 ? C.blanco : hex('#a8b8d4')); continue; } if (d < 3) { R.pset(x, y, mezcla(R.pget(x, y), [80, 100, 140], 0.85)); continue; } const f = Math.min(1, d / 70) + (umbral(x, y) - 0.5) * 0.22; R.pset(x, y, mezcla(R.pget(x, y), AGUA[f < 0.18 ? 0 : f < 0.42 ? 1 : f < 0.7 ? 2 : 3], 0.84)); } }
  // el reflejo roto de las ventanas encendidas de la calle, justo bajo la superficie
  for (let j = 2; j < 16; j += 2) for (let k = 0; k < 9; k++) { const x0 = 8 + k * 34 + Math.round(Math.sin(t * 3 + j + k) * 2), w = 4 + (k % 3); if (x0 > 140 && x0 < 210) continue; if (hh(k, j + Math.floor(t * 5), 65) < 0.45) R.rect(x0, Math.round(wy) + j, x0 + w - Math.round(j / 5), Math.round(wy) + j, j < 7 ? hex('#c8a060') : hex('#7a6a50')); }
  for (let r = 0; r < 16; r++) { const y = Math.round(wy + 4 + r * 6); if (y > 178) break; const paso = 12 + r * 3, v = 34 + r * 9; for (let k = -1; k < 340 / paso + 1; k++) { if (hh(k, r, 66) < 0.35) continue; const x = Math.round(k * paso - ((t * v + r * 13) % paso) + hh(k, r, 70) * 5), w = 3 + Math.round(r * 0.7); for (let i = 0; i < w; i++) R.pset(x + i, y - Math.round(Math.sin(i / w * Math.PI) * (1 + r * 0.15)), i < w * 0.45 ? hex('#d8e2f4') : hex('#6a7aa0')); } }
  for (let k = 0; k < 26; k++) { const ph = (t * 3 + hh(k, 1, 67)) % 1, x = Math.round(150 + hh(k, 2, 67) * 56), y = Math.round(wy - Math.sin(ph * Math.PI) * (2 + hh(k, 3, 67) * 4)); R.pset(x, y, ph < 0.5 ? C.blanco : hex('#a8b8d4')); }
  // «fifteen feet»: el 15 de la escala parpadea y sale el número grande con su flecha
  const e = tramo(t, pies - 0.15, pies + 0.15), y15 = Math.round(nivelY(15));
  if (e > 0) { if (parpadeo(t, 10)) R.rect(ESC.x0 + 1, y15 - 1, ESC.x0 + 13, y15 + 1, C.oroL); R.numero('15', 216, Math.round(lerp(y15 - 2, y15 - 8, e)), { tam: 16 }); R.poligono([[205, y15 - 14], [212, y15 - 19], [212, y15 - 9]], C.k); R.poligono([[206, y15 - 14], [211, y15 - 17], [211, y15 - 11]], C.oroL); }
  // «sweeps across»: la corriente arrastra deprisa una valla, un barril y una puerta, y una ola revienta contra el poste
  const b = lin(t, barre - 0.1, otro + 0.2);
  if (b > 0 && b < 1) {
    valla(Math.round(lerp(340, -60, lin(b, 0, 0.55))), Math.round(wy + 3), 1);
    puertaFlota(Math.round(lerp(380, -50, lin(b, 0.25, 0.85))), Math.round(wy + 9));
    { const x = Math.round(lerp(360, -40, lin(b, 0.45, 1))), y = Math.round(wy + 16), g = Math.round(Math.sin(t * 9) * 1); R.rect(x - 6, y - 8 + g, x + 6, y + g, C.k); R.rect(x - 5, y - 7 + g, x + 5, y - 1 + g, hex('#7a5a32')); R.rect(x - 5, y - 5 + g, x + 5, y - 5 + g, hex('#4a4e5a')); R.rect(x - 5, y - 2 + g, x + 5, y - 2 + g, hex('#4a4e5a')); }
    for (let k = 0; k < 12; k++) { const yy = Math.round(wy + 4 + hh(k, 1, 68) * 40), L = 12 + Math.round(hh(k, 2, 68) * 24), x0 = Math.round(340 - ((t * 160 + hh(k, 3, 68) * 400) % 420)); for (let i = 0; i < L; i += 2) R.pset(x0 + i, yy, hex('#c8d4ec')); }
    const g2 = lin(b, 0.1, 0.45); if (g2 > 0 && g2 < 1) for (let k = 0; k < 60; k++) { const a = -Math.PI * (0.1 + 0.8 * hh(k, 1, 69)), v = 20 + 40 * hh(k, 2, 69), x = Math.round(176 + Math.cos(a) * v * g2), y = Math.round(wy + Math.sin(a) * v * g2 * 1.4 + 50 * g2 * g2); if (y < wy) R.pset(x, y, k % 3 ? C.blanco : hex('#c8d4ec')); }
  }
  // la lluvia por delante de todo
  for (let k = 0; k < 120; k++) { const v = 160 + hh(k, 1, 63) * 60, x0 = hh(k, 2, 63) * 360, y = ((hh(k, 3, 63) * 220 + t * v) % 220) - 20, x = Math.round(x0 - y * 0.35 - 20); for (let i = 0; i < 4; i++) R.pset(x - Math.round(i * 0.35), Math.round(y) - i, i === 0 ? hex('#b8c8e8') : hex('#7a8cb8')); }
};

// ── 3 · el inserto: la ventana encendida sobre el agua ───────────────────────────────────────────────────────────
const FACH = [hex('#3a4662'), hex('#4c5a7c'), hex('#2a334c'), hex('#34405a')];   // tabla, canto con luz, sombra, veta
const MOLD = [hex('#8a90a8'), hex('#a8aec4'), hex('#5e647c')];                     // las molduras blancas, de noche
const VERDE = [hex('#26402e'), hex('#33553e'), hex('#1a2c20')];                    // las contraventanas
const LUZ = [hex('#fff0b8'), hex('#f8d890'), hex('#e8b468'), hex('#b8804a')];      // la luz de la lámpara, del centro afuera
const PADRE = { C: hex('#5a4a3a'), c: hex('#443828'), F: hex('#4a4a52'), W: hex('#f2eee2'), o: hex('#3a3a46') };
const MADRE = { C: hex('#4a6a8a'), c: hex('#36506a'), W: hex('#e8e0d0'), L: hex('#2a2430') };
const NINO = { C: hex('#e8e4dc'), c: hex('#c0bcb4'), F: hex('#3a4a6a'), W: hex('#e8e4dc'), o: hex('#3a4a6a'), H: hex('#c8904c'), h: hex('#e0ac64') };
const lampara = (x, y, t, enc = 1) => {   // el quinqué: base de latón, depósito, tubo de cristal y la llama (x, y: la base)
  R.rect(x - 3, y - 1, x + 3, y, C.k); R.rect(x - 2, y - 1, x + 2, y - 1, C.oro); R.rect(x - 2, y - 5, x + 2, y - 2, C.k); R.rect(x - 1, y - 4, x + 1, y - 2, hex('#c87a3a'));
  R.rect(x - 2, y - 11, x + 2, y - 6, C.k); R.rect(x - 1, y - 10, x + 1, y - 6, hex('#f4f0e0')); if (enc) { R.pset(x, y - 8, Math.sin(t * 13) > 0 ? C.blanco : hex('#fff0a0')); R.pset(x, y - 7, hex('#f8b040')); }
};
const mecedora = (x, y, t) => {   // la mecedora volcada que flota de lado
  const b = Math.round(Math.sin(t * 2.2) * 1);
  R.linea(x - 9, y - 1 + b, x + 9, y + 1 + b, C.k); R.linea(x - 9, y - 2 + b, x + 9, y + b, hex('#8a6a3a'));
  R.rect(x - 5, y - 9 + b, x + 6, y - 6 + b, C.k); R.rect(x - 4, y - 8 + b, x + 5, y - 7 + b, hex('#6a4a2a'));
  for (const dx of [-4, 0, 4]) { R.rect(x + dx, y - 14 + b, x + dx + 1, y - 9 + b, C.k); R.pset(x + dx, y - 13 + b, hex('#8a6a3a')); }
  R.rect(x - 5, y - 15 + b, x + 6, y - 14 + b, hex('#6a4a2a'));
  for (let i = -10; i <= 10; i++) if ((i + Math.floor(t * 8)) % 3) R.pset(x + i, y + 2, hex('#a8b8d0'));
};
const barril = (x, y, t) => { const b = Math.round(Math.sin(t * 2.7 + 1)); R.rect(x - 5, y - 6 + b, x + 5, y + b, C.k); R.rect(x - 4, y - 5 + b, x + 4, y - 1 + b, hex('#7a5a32')); R.rect(x - 4, y - 4 + b, x + 4, y - 4 + b, hex('#4a4e5a')); R.rect(x - 4, y - 2 + b, x + 4, y - 2 + b, hex('#4a4e5a')); R.pset(x - 3, y - 5 + b, hex('#9a7a4a')); for (let i = -7; i <= 7; i++) if ((i + Math.floor(t * 9)) % 3) R.pset(x + i, y + 1, hex('#a8b8d0')); };
const subeLampara = [P3 + 0.15, P3 + 0.7], dejaLampara = [historia - 1.1, historia - 0.4];
const p3 = (t) => {
  const { rect, pset, linea, disco, poligono } = R;
  const farola = t < mortal - 0.05 ? 1 : t < mortal + 0.4 ? (Math.sin(t * 47) > 0 ? 1 : 0) : 0;
  // el cielo de tormenta a la derecha, con nubes que corren y el resplandor de un relámpago lejano en «disaster»
  const res = Math.max(0, 1 - Math.abs(t - desastre - 0.1) / 0.25);
  for (let y = 0; y < 142; y++) for (let x = 252; x < 320; x++) { const f = y / 142 + (hh(x >> 1, y >> 1, 3) - 0.5) * 0.12; pset(x, y, mezcla(f > 0.55 ? hex('#1e2640') : f > 0.3 ? hex('#182036') : hex('#141a2e'), [190, 200, 255], res * 0.45)); }
  for (let k = 0; k < 6; k++) { const cx = Math.round(((k * 47 - t * 7) % 120 + 120) % 120) + 236, cy = 14 + k * 11, r = 7 + (k % 3) * 3; disco(cx, cy + 1, r, mezcla(hex('#1a2034'), [190, 200, 255], res * 0.4)); disco(cx, cy, r, mezcla(hex('#28304c'), [190, 200, 255], res * 0.5)); disco(cx - 2, cy - 2, r - 3, mezcla(hex('#323c5c'), [190, 200, 255], res * 0.55)); }
  // las casas de enfrente, en silueta: una ventana se apaga con la farola
  poligono([[256, 142], [256, 98], [279, 80], [302, 98], [302, 142]], hex('#10141f')); rect(300, 106, 319, 142, hex('#121726')); rect(302, 102, 319, 106, hex('#0c1018'));
  rect(271, 104, 278, 112, farola ? hex('#e8b860') : hex('#24283a')); rect(274, 104, 275, 112, hex('#10141f')); rect(306, 114, 311, 120, hex('#d8a850')); rect(308, 114, 308, 120, hex('#121726'));
  // la fachada: tablas de chilla con su canto de luz, su sombra y vetas; la esquinera
  for (let y = 12; y < 142; y++) { const j = (y - 12) % 5; rect(0, y, 251, y, j === 0 ? FACH[1] : j === 4 ? FACH[2] : FACH[0]); }
  for (let k = 0; k < 150; k++) { const x = Math.round(hh(k, 1, 50) * 248), y = 12 + Math.floor(hh(k, 2, 50) * 26) * 5 + 2; rect(x, y, x + 3 + (k % 4), y, FACH[3]); }
  rect(243, 12, 251, 141, MOLD[2]); rect(243, 12, 245, 141, MOLD[0]); rect(251, 12, 251, 141, C.k);
  // el alero: sofito de tablas, imposta, friso de husillos, ménsulas y el canalón que gotea
  rect(0, 0, 251, 6, hex('#1c2030')); for (let x = 0; x < 252; x += 8) rect(x, 0, x, 6, hex('#141824'));
  rect(0, 7, 251, 8, MOLD[1]); rect(0, 9, 251, 9, C.k); for (let x = 2; x < 250; x += 4) { rect(x, 10, x + 1, 13, MOLD[0]); pset(x, 13, MOLD[2]); } rect(0, 14, 251, 14, MOLD[2]);
  for (const bx of [30, 134, 226]) { poligono([[bx - 4, 7], [bx + 4, 7], [bx + 2, 20], [bx - 2, 20]], C.k); poligono([[bx - 3, 8], [bx + 3, 8], [bx + 1, 19], [bx - 1, 19]], MOLD[0]); pset(bx, 12, MOLD[2]); }
  for (let k = 0; k < 10; k++) { const x = 12 + k * 24 + (k % 3) * 3, ph = (t * 1.4 + hh(k, 9, 51)) % 1, y = Math.round(15 + ph * 26); pset(x, y, hex('#8aa0c8')); pset(x, y - 1, hex('#5a6a90')); }
  // la ventana de la izquierda, en penumbra, con el gato en el alféizar de dentro
  rect(10, 40, 64, 116, C.k); rect(11, 41, 63, 115, MOLD[0]); rect(11, 41, 63, 42, MOLD[1]);
  for (let y = 46; y <= 110; y++) for (let x = 16; x <= 58; x++) pset(x, y, ((x + y) & 1) && y > 80 ? hex('#7a5430') : y > 90 ? hex('#6a4a2a') : hex('#5a3e24'));
  R.recorte([16, 46, 58, 110]); T.gato(R, 26, 110, t, { dir: 1 }); R.recorte(null);
  for (let y = 46; y <= 110; y++) { const w = 7 + Math.round(Math.sin(y * 0.4) * 1); rect(58 - w, y, 58, y, (y % 3 === 0) ? hex('#c8b898') : hex('#b8a888')); }
  rect(36, 46, 37, 110, MOLD[0]); rect(16, 77, 58, 78, MOLD[0]); rect(6, 114, 68, 118, C.k); rect(7, 115, 67, 117, MOLD[1]);
  // la ventana grande: el marco con su cornisa de dentículos
  const W0 = 98, W1 = 170, Y0 = 40, Y1 = 112;
  rect(84, 24, 184, 30, C.k); rect(85, 25, 183, 29, MOLD[1]); for (let x = 86; x < 183; x += 3) pset(x, 28, MOLD[2]); rect(85, 29, 183, 29, MOLD[2]);
  rect(88, 30, 180, 120, C.k); rect(89, 31, 179, 119, MOLD[0]); rect(89, 31, 179, 32, MOLD[1]); rect(178, 33, 179, 119, MOLD[2]);
  // dentro: la luz de la lámpara sobre el papel pintado, y un cuadro en la pared
  const enMano = t > subeLampara[1] && t < dejaLampara[0], viaje = t < subeLampara[1] ? lin(t, subeLampara[0], subeLampara[1]) : t < dejaLampara[0] ? 1 : 1 - lin(t, dejaLampara[0], dejaLampara[1]);
  const lx = Math.round(lerp(160, 141, viaje)), ly = Math.round(lerp(108, 96, viaje)), fl = Math.sin(t * 11) * 1.2;
  for (let y = Y0; y <= Y1; y++) for (let x = W0; x <= W1; x++) { const d = Math.hypot(x - lx, (y - ly + 6) * 1.15) + fl, v = d / 17, i = Math.min(3, Math.floor(v) + (v - Math.floor(v) > umbral(x, y) ? 1 : 0)); let col = LUZ[i]; if ((x - W0) % 6 === 0) col = mezcla(col, [120, 70, 40], 0.12); else if ((x - W0) % 6 === 3 && (y >> 2) % 2) col = mezcla(col, [200, 120, 80], 0.08); pset(x, y, col); }
  rect(106, 48, 121, 60, C.k); rect(107, 49, 120, 59, hex('#8a6a3a')); rect(109, 51, 118, 57, hex('#7aa0b8')); rect(109, 55, 118, 57, hex('#4a7a8a')); pset(114, 52, C.blanco);
  // la familia a salvo junto a la lámpara (recortada al hueco)
  R.recorte([W0, Y0, W1, Y1]);
  tenido([255, 210, 140], 0.12, () => {
    R.actor(EL.vecina, 101, 120, t, { dir: 1, pal: MADRE, quieto: true, sorpresa: entre(t, mortal + 0.05, mortal + 0.7), sonrisa: t > historia - 0.2 });
    R.actor(EL.chico, 113, 125, t, { dir: 1, pal: NINO, sorpresa: entre(t, mortal, mortal + 0.8), dedo: entre(t, historia - 0.3, historia + 0.6), sonrisa: t > historia });
    R.actor(EL.vecino, 140, 119, t, { dir: viaje > 0.5 ? -1 : 1, pal: PADRE, dedo: enMano || (viaje > 0 && viaje < 1), sorpresa: entre(t, mortal + 0.1, mortal + 0.8), habla: entre(t, desastre - 0.3, desastre + 0.6) && parpadeo(t, 6) });
  });
  R.recorte(null);
  lampara(lx, ly, t);
  // los visillos de encaje, recogidos, y las hojas de guillotina con sus junquillos
  for (const [x0, s] of [[W0, 1], [W1 - 10, -1]]) for (let y = Y0; y <= Y1; y++) { const rec = y > 76 && y < 84 ? 3 : 0, sw = Math.round(Math.sin(t * 1.3 + y * 0.08) * 0.8); for (let i = 0; i <= 10 - rec; i++) { const x = (s > 0 ? x0 + i : x0 + 10 - i) + sw; const hueco = (x % 3 === 0 && y % 3 === 0) || ((x + y) % 7 === 0); pset(x, y, hueco ? hex('#d8c8a8') : hex('#f4ecd8')); } if (s > 0) pset(x0 + 10 - rec + sw, y, hex('#c8b898')); else pset(x0 + rec + sw, y, hex('#c8b898')); }
  for (const x0 of [W0 + 4, W1 - 6]) { rect(x0, 79, x0 + 2, 81, hex('#a83a3a')); }
  rect(W0 - 1, Y0 - 1, W1 + 1, Y0, MOLD[0]); rect(W0 - 1, Y1, W1 + 1, Y1 + 1, MOLD[0]); rect(W0 - 1, Y0, W0, Y1, MOLD[0]); rect(W1, Y0, W1 + 1, Y1, MOLD[0]);
  rect(133, Y0, 135, Y1, MOLD[0]); rect(135, Y0, 135, Y1, MOLD[2]); rect(W0, 75, W1, 77, MOLD[0]); rect(W0, 77, W1, 77, MOLD[2]);
  // el cristal: reflejos fríos y gotas que resbalan
  for (const [ax, ay] of [[104, 72], [140, 72], [104, 108], [140, 108]]) for (let i = 0; i < 18; i++) { const x = ax + i, y = ay - i; if (i % 5 < 3) pset(x, y, mezcla(R.pget(x, y), [220, 230, 255], 0.35)); }
  for (let k = 0; k < 14; k++) { const x = W0 + 3 + Math.round(hh(k, 1, 60) * (W1 - W0 - 6)), ph = (t * (0.15 + hh(k, 2, 60) * 0.2) + hh(k, 3, 60)) % 1, y = Math.round(Y0 + 2 + ph * (Y1 - Y0 - 4)); pset(x, y, hex('#e8f0ff')); pset(x, y - 1, mezcla(R.pget(x, y - 1), [200, 210, 240], 0.4)); pset(x, y - 2, mezcla(R.pget(x, y - 2), [200, 210, 240], 0.25)); }
  // las contraventanas: la de la derecha golpea con el viento
  const golpe = (t * 0.62 + 0.3) % 1, abre = golpe < 0.15 ? golpe / 0.15 : golpe < 0.3 ? 1 - (golpe - 0.15) / 0.15 : 0, wR = Math.round(14 - abre * 7);
  for (const [x0, w, sh] of [[74, 14, 0], [180, wR, abre]]) { rect(x0, 32, x0 + w, 118, C.k); rect(x0 + 1, 33, x0 + w - 1, 117, mezcla(VERDE[0], [0, 0, 0], sh * 0.3)); for (let y = 35; y < 116; y += 3) { rect(x0 + 2, y, x0 + w - 2, y, VERDE[1]); rect(x0 + 2, y + 1, x0 + w - 2, y + 1, VERDE[2]); } rect(x0 + 1, 74, x0 + w - 1, 76, VERDE[0]); }
  // el alféizar, la imposta entre pisos y lo poco que asoma del piso de abajo, ya bajo el agua
  rect(82, 118, 186, 123, C.k); rect(83, 119, 185, 122, MOLD[1]); rect(83, 122, 185, 122, MOLD[2]); rect(88, 124, 180, 125, FACH[2]);
  rect(0, 127, 251, 132, C.k); rect(0, 128, 251, 131, MOLD[0]); rect(0, 128, 251, 128, MOLD[1]);
  rect(92, 136, 176, 141, C.k); rect(93, 137, 175, 141, MOLD[0]); rect(97, 140, 171, 141, hex('#10141e'));
  // la farola de gas de la calle, metida en el agua: se apaga en «deadliest» y suelta un hilo de humo
  rect(266, 64, 270, 179, C.k); rect(267, 64, 269, 179, hex('#3a3e4c')); rect(267, 64, 267, 179, hex('#5a6070')); rect(261, 66, 275, 67, C.k);
  poligono([[262, 47], [274, 47], [271, 43], [265, 43]], C.k); rect(267, 41, 269, 43, C.k);
  rect(262, 48, 274, 61, C.k); rect(263, 49, 273, 60, farola ? hex('#f8d880') : hex('#3a3e4c')); rect(268, 49, 268, 60, C.k); rect(263, 54, 273, 54, C.k); rect(264, 61, 272, 63, C.k);
  if (farola) { pset(268, 55, C.blanco); R.halo(268, 54, 26, [hex('#3a3428'), hex('#5a4a30'), hex('#8a6a38')], 0.9); rect(263, 49, 273, 60, hex('#f8d880')); rect(268, 49, 268, 60, C.k); rect(263, 54, 273, 54, C.k); pset(266, 57, C.blanco); pset(270, 57, C.blanco); }
  else if (t < mortal + 1.6) for (let k = 0; k < 5; k++) { const u = (t - mortal - 0.4 - k * 0.12); if (u < 0 || u > 1) continue; pset(Math.round(268 + Math.sin(u * 6 + k) * 2 + u * 4), Math.round(40 - u * 18), hex('#8a8e9a')); }
  // el agua: bandas tramadas, crestas que corren con la corriente, el reflejo roto de la ventana y lo que flota
  for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) { const f = (y - 142) / 38, um = ((x * 5 + y * 3) % 8) / 8; pset(x, y, f < 0.2 + um * 0.1 ? hex('#2a3656') : f < 0.55 + um * 0.15 ? hex('#222c48') : hex('#1a2238')); }
  for (let r = 0; r < 9; r++) { const f = (r + 0.5) / 9, y = Math.round(144 + 34 * f ** 1.2), paso = 12 + 24 * f, v = 10 + 30 * f; for (let k = -1; k < 340 / paso + 1; k++) { if (hh(k, r, 61) < 0.25) continue; const x = Math.round(k * paso - ((t * v + r * 19) % paso) + hh(k, r, 62) * 6), w = Math.round(3 + 8 * f); for (let i = 0; i < w; i++) { const yc = y - Math.round(Math.sin(i / w * Math.PI) * (1 + f * 2)); pset(x + i, yc, i < w * 0.4 ? hex('#c8d4ec') : hex('#4a5a80')); } } }
  for (let j = 0; j < 30; j += 2) { const y = 144 + j, sh = Math.round(Math.sin(y * 0.9 + t * 5) * (1 + j * 0.25)), w = Math.max(4, Math.round(74 * (1 - j / 34))); for (let x = Math.round(134 - w / 2) + sh; x < 134 + w / 2 + sh; x++) if (hh(x >> 1, y + Math.floor(t * 6), 64) < 0.62 - j / 40) pset(x, y, j < 8 ? hex('#f0c878') : j < 18 ? hex('#c89a58') : hex('#8a6a48')); }
  if (farola) for (let j = 0; j < 20; j += 2) { const y = 146 + j, sh = Math.round(Math.sin(y + t * 6) * 1.5); for (let x = 262 + sh; x < 275 + sh; x++) if ((x + y) % 3 === 0) pset(x, y, hex('#c8a860')); }
  for (let x = 0; x < 320; x++) { const y = 142 + Math.round(Math.sin(x * 0.2 + t * 4) * 0.7); pset(x, y, (x + Math.floor(t * 12)) % 5 ? hex('#c8d4e8') : hex('#7a8aa8')); }
  for (let i = -4; i <= 4; i++) pset(268 + i, 143 + (Math.abs(i) > 2 ? 1 : 0), C.blanco);
  mecedora(Math.round(lerp(330, 150, lin(t, P3, E.duracion + 0.6))), 156, t);
  barril(Math.round(lerp(380, -30, lin(t, P3 + 0.5, P3 + 4.4))), 171, t);
  { const x = Math.round(lerp(-40, 360, lin(t, P3, E.duracion + 1))), y = 150 + Math.round(Math.sin(t * 2) * 1); linea(x - 10, y, x + 10, y - 1, C.k); linea(x - 10, y - 1, x + 10, y - 2, hex('#8a6a4a')); }
  // la lluvia por delante de todo
  for (let k = 0; k < 150; k++) { const v = 150 + hh(k, 1, 63) * 60, x0 = hh(k, 2, 63) * 360, y = ((hh(k, 3, 63) * 220 + t * v) % 220) - 20, x = Math.round(x0 - y * 0.35 - 20); for (let i = 0; i < 4; i++) pset(x - Math.round(i * 0.35), Math.round(y) - i, i === 0 ? hex('#b8c8e8') : hex('#7a8cb8')); }
  if (res > 0) T.tinte(R, 0, 179, [200, 210, 255], res * 0.12);
};
// el golpe de música entra solo: el primer efecto, el chapoteo del vecino, llega después
const efectos = [[1.4, 'chof'], [2.78, 'puerta'], [esaNoche - 0.02, 'trueno'],
  [P2 + 0.1, 'ola'], [pies, 'pop'], [barre - 0.05, 'rafaga'], [barre + 0.15, 'chof'],
  [P3 + 0.3, 'toc'], [mortal + 0.05, 'vapor'], [desastre + 0.15, 'trueno'], [historia - 0.5, 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1900 });
''')

E['hu-muro'] = ('El muro', '''// HU-MURO (frase 15), 1902–1911. Cuatro planos:
// 1. «What Galveston does next»: el muro frente al mar se termina: la grúa de vapor avanza con su cubo, un ingeniero
//    repasa el plano y señala el muro en «unbelievable», un obrero empuja su carretilla y la vuelca; en «seventeen feet»
//    la cota sube por la cara del muro y sale el «17»; los dos miran arriba;
// 2. «house by house, it jacks up»: la casa sube sobre sus gatos de tornillo; el gag del perro: dormía en el porche, se
//    despierta («!») y sube sentado y muy tieso con la casa; sale la escalera nueva y baja por ella muy digno, con el
//    hocico arriba; el dueño se sujeta el sombrero y luego se ríe; «2,000» sale en «two thousand»;
// 3. «pumps sand from the harbor underneath»: la draga, delante de la isla ya con su muro: la escala del cortador
//    remueve el fondo, la tubería flotante lleva la arena hasta la orilla y el chorro de arena y agua cae en la isla; el
//    silbato, el humo y el marinero que mueve la palanca de la bomba;
// 4. «the city stands more than ten feet higher»: el muro terminado con gente paseando por arriba; la línea del suelo
//    de antes y la flecha «+10»; la pareja de la foto pasea por la playa con el perro digno delante, que se sienta.''', COMUN + r'''
const w = (f) => en('muro', f);
// los cortes: «And then», «and pumps», y la pausa antes de «the city»
const P2 = w(0.329), P3 = w(0.584), P4 = w(0.811);
const increible = w(0.108), muroW = w(0.220), diecisiete = w(0.243), alto = w(0.285);
const casa = w(0.386), gatos = w(0.466), dosmil = w(0.524);
const bombea = w(0.615), arenaW = w(0.631), puerto = w(0.675), debajo = w(0.688);
const ciudad = w(0.840), diez = w(0.899), antes = w(0.962);

// ── 1 · el muro de diecisiete pies ──────────────────────────────────────────────────────────────────────────────
const INGENIERO = { C: hex('#5a5a6a'), c: hex('#44444f'), F: hex('#4a4a52'), W: hex('#f2eee2'), o: hex('#3a5a8a') };
const OBRERO = { C: hex('#3e5a8a'), c: hex('#2c4468'), F: hex('#3e5a8a'), W: hex('#c84a3a'), o: hex('#3e5a8a'), H: hex('#2c2232'), h: hex('#54466a') };
const obra = (t) => lerp(0.5, 0.97, tramo(t, 0.3, muroW + 0.55));
const gira = (px, py, cx, cy, a) => [cx + (px - cx) * Math.cos(a) - (py - cy) * Math.sin(a), cy + (px - cx) * Math.sin(a) + (py - cy) * Math.cos(a)];
const carretilla = (x, s, vuelca, carga) => {   // delante del obrero (mirando a la derecha); vuelca 0–1 la inclina sobre la rueda
  const cx = x + 27, cy = s - 3, a = vuelca * 0.7, P = (pts) => pts.map(([px, py]) => gira(px, py, cx, cy, a));
  R.linea(x + 11, s - 9, x + 15, s - 9, C.k); R.rect(x + 15, s - 6, x + 16, s - 1, C.k);
  R.poligono(P([[x + 12, s - 13], [x + 30, s - 13], [x + 26, s - 5], [x + 16, s - 5]]), C.k); R.poligono(P([[x + 13, s - 12], [x + 29, s - 12], [x + 25, s - 6], [x + 17, s - 6]]), hex('#6a7080'));
  if (carga > 0) R.poligono(P([[x + 14, s - 12], [x + 28, s - 12], [x + 25, s - 15], [x + 17, s - 15]]), hex('#c8b48a'));
  R.disco(cx, cy, 3, C.k); R.disco(cx, cy, 2, hex('#5a4a3a')); R.pset(cx, cy, C.metalL);
};
const plano = (x, y) => { R.rect(x - 1, y - 1, x + 10, y + 7, C.k); R.rect(x, y, x + 9, y + 6, hex('#3a6ab8')); R.linea(x + 1, y + 5, x + 8, y + 5, hex('#d8e8ff')); for (let i = 0; i < 5; i++) R.pset(x + 6 + Math.round(Math.sin(i / 4 * 1.4) * 2), y + 1 + i, hex('#d8e8ff')); R.rect(x + 1, y + 1, x + 3, y + 1, hex('#a8c8f0')); };
const vuelcaT = [3.55, 4.15];
const p1 = (t) => {
  T.galveston(R, t, { despues: true, encuadre: 'muro', muro: obra(t) });
  // «seventeen feet»: la cota sube por la cara del muro y sale el número
  const e = tramo(t, diecisiete - 0.2, diecisiete + 0.25), X = 30, pie = 141, top = 63;
  if (e > 0) { const yt = Math.round(lerp(pie, top, e));
    R.rect(X - 1, yt, X + 1, pie, C.k); R.rect(X, yt + 1, X, pie - 1, C.oroL); R.rect(X - 4, pie, X + 4, pie, C.k);
    R.poligono([[X - 4, yt + 5], [X + 5, yt + 5], [X + 0.5, yt - 1]], C.k); R.poligono([[X - 3, yt + 4], [X + 4, yt + 4], [X + 0.5, yt]], C.oroL);
    if (e >= 1) R.rect(X - 4, top - 1, X + 4, top - 1, C.k);
    if (t > diecisiete) R.numero('17', 38, Math.round(lerp(112, 106, tramo(t, diecisiete, diecisiete + 0.2))), { tam: 16 }); }
  // el ingeniero repasa el plano y señala el muro; luego mira la cota con orgullo
  const s1 = 158, x1 = 92, senala = entre(t, increible - 0.1, increible + 0.9) || entre(t, alto, alto + 0.6);
  R.actor(EL.vecino, x1, s1, t, { dir: senala || t > diecisiete - 0.1 ? -1 : 1, pal: INGENIERO, dedo: senala, sonrisa: t > alto, sorpresa: entre(t, diecisiete, diecisiete + 0.5), habla: entre(t, increible - 0.1, increible + 0.8) && parpadeo(t, 7) });
  if (!senala && t < diecisiete - 0.1) { const [hx, hy] = enMano(x1, s1, 1); plano(hx - 4, hy - 6); }
  // el obrero trae la carretilla de arena, la vuelca junto al encofrado y mira arriba en «seventeen»
  const u = lin(t, 0.2, vuelcaT[0]), xo = Math.round(lerp(-30, 128, u)), so = 170, mira = t > diecisiete - 0.1;
  if (t > vuelcaT[0] + 0.25) { const mon = Math.min(1, (t - vuelcaT[0] - 0.25) / 0.4); for (let i = -6; i <= 6; i++) { const hgt = Math.round((5 - Math.abs(i) * 0.7) * mon); if (hgt > 0) R.rect(xo + 36 + i, so - hgt, xo + 36 + i, so - 1, Math.abs(i) < 2 ? hex('#d8c49a') : hex('#c8b48a')); } }
  R.actor(EL.vecino, xo, so, t, { dir: mira ? -1 : 1, pal: OBRERO, tocado: 'gorra', anda: u > 0 && u < 1, sorpresa: entre(t, diecisiete, diecisiete + 0.6), sonrisa: t > alto, dedo: entre(t, alto + 0.1, alto + 0.7) });
  if (!mira) carretilla(xo, so, tramo(t, vuelcaT[0], vuelcaT[1]) - tramo(t, vuelcaT[1] + 0.2, vuelcaT[1] + 0.5), t < vuelcaT[0] + 0.2 ? 1 : 0);
  else carretilla(xo + 4, so, 0, 0);
};

// ── 2 · la casa sube: el perro digno ────────────────────────────────────────────────────────────────────────────
const DUENO = { C: hex('#e8e4dc'), c: hex('#c0bcb4'), F: hex('#5a4a3a'), W: hex('#e8e4dc'), o: hex('#6a4a2a') };
const VECINA2 = { C: hex('#8a5a9a'), c: hex('#6a4278'), W: hex('#ece4f0'), L: hex('#2a2430') };
const subeT = [casa - 0.05, gatos + 0.55], escaleraT = subeT[1] + 0.08, bajaT = [escaleraT + 0.12, P3 - 0.2];
const p2 = (t) => {
  const sb = tramo(t, subeT[0], subeT[1]);
  T.galveston(R, t, { despues: true, encuadre: 'casas', sube: sb, arena: 0, escalera: t > escaleraT });
  const P = T.d_galvestonPorche({ sube: sb, arena: 0 }), [ax, ay] = P.escalera.arriba, [bx, by] = P.escalera.abajo;
  // el perro: dormía en el porche, se despierta al subir la casa, sube muy tieso y baja digno por la escalera nueva
  const b = lin(t, bajaT[0], bajaT[1]);
  if (t < bajaT[0]) {
    const pose = t < subeT[0] + 0.2 ? 'tumbado' : 'sentado';
    perrito(P.x0 + 1, P.y, t, { dir: 1, pose, cabeza: pose === 'sentado' && t < subeT[1] && Math.sin(t * 6) > 0 ? -1 : 0, digno: t > subeT[1] - 0.3 });
    if (entre(t, subeT[0] + 0.25, subeT[0] + 0.95)) R.bocadillo(P.x0 + 9, P.y - 21);
  } else {
    const paso = Math.min(1, Math.floor(b * 9) / 9 + (b >= 1 ? 1 : 0)), x = Math.round(lerp(ax - 6, bx - 4, b)), y = Math.round(lerp(ay, by, paso));
    perrito(x, y, t, { dir: 1, pose: b < 1 ? 'pie' : 'sentado', anda: b > 0 && b < 1, digno: true });
  }
  // el dueño se sujeta el sombrero mientras sube su casa y se ríe con el perro; la vecina se asombra y aplaude
  R.actor(EL.vecino, 198, 174, t, { dir: -1, pal: DUENO, sorpresa: entre(t, subeT[0] + 0.1, subeT[0] + 0.8), dedo: entre(t, subeT[0] + 0.8, subeT[1]), sonrisa: t > bajaT[0] + 0.3, habla: t > bajaT[0] + 0.5 && parpadeo(t, 9) });
  R.actor(EL.vecina, 222, 176, t, { dir: -1, pal: VECINA2, brazos: entre(t, subeT[1] - 0.6, subeT[1] + 0.1) || entre(t, b > 0.6 ? bajaT[0] + 0.7 : 99, bajaT[0] + 1.1), sonrisa: t > subeT[1] - 0.6 });
  // «two thousand»
  if (t > dosmil - 0.05) { const e = tramo(t, dosmil - 0.05, dosmil + 0.2); R.numero('2,000', 254, Math.round(lerp(76, 70, e)), { tam: 8, centro: true, contorno: true }); }
};

// ── 3 · la draga ────────────────────────────────────────────────────────────────────────────────────────────────
const MARINERO = { C: hex('#2a3a5a'), c: hex('#1e2a44'), F: hex('#2a3a5a'), W: hex('#e8e4dc'), o: hex('#2a3a5a') };
const WL = 158, X0 = 184, X1 = 300;
const draga = (t) => {
  const { rect, poligono, pset, disco, linea } = R, cab = Math.round(Math.sin(t * 1.6) * 0.7);
  // la escala del cortador entra en el agua por la proa y remueve el fondo
  linea(X0 + 6, WL - 30 + cab, X0 - 20, WL + 12, C.k); linea(X0 + 7, WL - 30 + cab, X0 - 19, WL + 12, C.k); linea(X0 + 6, WL - 31 + cab, X0 - 19, WL + 11, hex('#7a7a84'));
  for (let k = 0; k < 18; k++) { const ph = (t * 2.2 + hh(k, 1, 70)) % 1, x = Math.round(X0 - 12 + hh(k, 2, 70) * 12 + ph * 4), y = Math.round(WL + 2 - Math.sin(ph * Math.PI) * (2 + hh(k, 3, 70) * 4)); pset(x, y, ph < 0.5 ? C.blanco : hex('#c8b890')); }
  // el pórtico de la proa con sus cables
  linea(X0 + 2, WL - 9, X0 + 12, WL - 46, C.k); linea(X0 + 22, WL - 9, X0 + 12, WL - 46, C.k); linea(X0 + 3, WL - 9, X0 + 13, WL - 46, hex('#6a6a74')); linea(X0 + 12, WL - 46, X0 + 6, WL - 30, hex('#3a3a42'));
  // el casco, la casa de máquinas con sus ventanas y la barandilla de popa
  poligono([[X0 - 2, WL - 10], [X1 + 2, WL - 10], [X1 - 2, WL + 2], [X0 + 3, WL + 2]], C.k); poligono([[X0 - 1, WL - 9], [X1 + 1, WL - 9], [X1 - 3, WL + 1], [X0 + 4, WL + 1]], hex('#5a2e26'));
  rect(X0, WL - 9, X1, WL - 8, hex('#a83a2a')); rect(X0 + 2, WL - 4, X1 - 2, WL - 4, hex('#e8e0d0')); for (let x = X0 + 4; x < X1 - 2; x += 6) pset(x, WL - 2, hex('#3a1e1a'));
  rect(X0 + 24, WL - 31, X0 + 84, WL - 10, C.k); rect(X0 + 25, WL - 30, X0 + 83, WL - 10, hex('#e8dcc0')); rect(X0 + 25, WL - 30, X0 + 83, WL - 29, hex('#f4ecd8')); rect(X0 + 80, WL - 28, X0 + 83, WL - 10, hex('#c4b494'));
  for (let wx = X0 + 29; wx < X0 + 68; wx += 9) { rect(wx, WL - 25, wx + 5, WL - 19, C.k); rect(wx + 1, WL - 24, wx + 4, WL - 20, hex('#3a4a5a')); pset(wx + 1, WL - 24, hex('#8ab0c8')); }
  rect(X0 + 70, WL - 23, X0 + 76, WL - 10, C.k); rect(X0 + 71, WL - 22, X0 + 75, WL - 10, hex('#7a5a3a')); pset(X0 + 74, WL - 16, C.oro);
  rect(X0 + 21, WL - 34, X0 + 87, WL - 31, C.k); rect(X0 + 22, WL - 33, X0 + 86, WL - 32, hex('#4a3a34'));
  rect(X0 + 90, WL - 15, X1 - 4, WL - 15, C.k); for (let x = X0 + 90; x <= X1 - 4; x += 5) rect(x, WL - 15, x, WL - 10, C.k);
  // la chimenea con su franja roja y el humo que se lleva el viento
  const cx = X0 + 52; rect(cx - 4, WL - 64, cx + 4, WL - 34, C.k); rect(cx - 3, WL - 63, cx + 3, WL - 34, hex('#2a2a30')); rect(cx - 3, WL - 59, cx + 3, WL - 56, C.rojo); rect(cx - 2, WL - 63, cx - 2, WL - 35, hex('#4a4a52'));
  for (let k = 0; k < 8; k++) { const u = (t * 0.32 + k / 8) % 1, x = Math.round(cx - u * 56 + Math.sin(u * 6 + k) * 3), y = Math.round(WL - 67 - u * 30), r = Math.round(2 + u * 5); disco(x, y, r, hex('#5a5a62')); disco(x - 1, y - 1, Math.max(1, r - 1), hex('#7a7a84')); }
  // la espuma de la flotación
  for (let x = X0 - 2; x < X1 + 6; x++) if ((x + Math.floor(t * 8)) % 4) pset(x, WL + 3 + ((x >> 2) % 2), hex('#e8f0f0'));
  return cx;
};
const p3 = (t) => {
  T.galveston(R, t, { encuadre: 'isla' });
  // el muro nuevo a lo largo de la orilla (las casas de baños quedan delante, sobre sus pilotes)
  for (let x = 0; x < 320; x++) { if ((x > 90 && x < 119) || (x > 168 && x < 197)) continue; R.pset(x, 106, hex('#ece8e0')); for (let y = 107; y <= 110; y++) R.pset(x, y, x % 12 === 0 ? hex('#a8a094') : hex('#c8c2b6')); R.pset(x, 111, hex('#8a8478')); }
  // la tubería flotante: de la draga a la orilla, sobre bidones que cabecean; el chorro de arena y agua en la isla
  const fuerte = lin(t, bombea - 0.1, bombea + 0.3), pts = [];
  for (let k = 0; k <= 12; k++) { const f = k / 12; pts.push([Math.round(lerp(X0 - 2, 132, f)), Math.round(lerp(WL - 4, 111, f) + Math.sin(t * 2 + k) * (1 - f) * 1.2)]); }
  for (let k = 0; k < 12; k++) { const [x0, y0] = pts[k], [x1, y1] = pts[k + 1], gr = k < 6 ? 3 : 2;
    R.linea(x0, y0 - gr - 1, x1, y1 - gr - 1, C.k); R.linea(x0, y0, x1, y1, C.k); for (let j = 1; j <= gr; j++) R.linea(x0, y0 - j, x1, y1 - j, j === gr ? hex('#8a8a94') : hex('#4a4a54')); }
  for (let k = 0; k < 12; k += 2) { const [x, y] = pts[k], wd = k < 6 ? 3 : 2; R.rect(x - wd - 1, y - 1, x + wd + 1, y + 2, C.k); R.rect(x - wd, y, x + wd, y + 1, hex('#a84a2a')); R.rect(x - wd, y, x - wd + 1, y, hex('#d86a4a')); for (let i = -wd - 2; i <= wd + 2; i++) if ((i + Math.floor(t * 6)) % 3) R.pset(x + i, y + 3, hex('#e8f0f0')); }
  // la boca, al otro lado del muro: el chorro de arena y agua y el abanico de arena nueva que va creciendo
  { const bx = 128, by = 104, n = Math.round(14 + fuerte * 40), abanico = Math.round(4 + lin(t, bombea, P4) * 10);
    for (let i = -abanico; i <= 2; i++) for (let j = 0; j < 3; j++) R.pset(bx + i, by - j + Math.round(Math.abs(i) / 6), j === 0 ? hex('#d8c49a') : hex('#e8d8b0'));
    R.rect(bx, by - 3, bx + 4, by, C.k); R.rect(bx + 1, by - 2, bx + 3, by - 1, hex('#5a5a62'));
    for (let k = 0; k < n; k++) { const ph = (t * (1.4 + fuerte * 1.2) + k / n) % 1, x = Math.round(bx - ph * (6 + fuerte * 12) + (hh(k, 1, 71) - 0.5) * 2), y = Math.round(by - 2 - Math.sin(ph * Math.PI) * (3 + fuerte * 9) + ph * 3); R.pset(x, y, k % 4 === 0 ? hex('#e8eef0') : k % 2 ? hex('#c8a870') : hex('#a88a5a')); } }
  // las gaviotas que siguen a la draga
  for (let k = 0; k < 3; k++) R.gaviota(Math.round(236 + Math.sin(t * 0.7 + k * 2) * 26 + k * 10), Math.round(78 + Math.cos(t * 0.9 + k) * 6 + k * 4), t, k);
  const cx = draga(t);
  // el silbato al empezar, la bomba que arranca en «pumps» y el marinero en la palanca
  { const u = t - (P3 + 0.15); if (u > 0 && u < 0.9) for (let k = 0; k < 6; k++) { const r = 1 + u * 4 + k * 0.4; R.disco(Math.round(cx + 5 + u * 8 + k), Math.round(WL - 66 - u * 6 - k), Math.round(r), k % 2 ? C.blanco : hex('#e8ecf0')); } }
  const tira = t > bombea - 0.2 && t < puerto, lv = tira ? (Math.floor(t * 4) % 2 ? 3 : -2) : 0, mx = 274;
  R.linea(mx - 4, WL - 10, mx - 6 + lv, WL - 20, C.k); R.pset(mx - 6 + lv, WL - 21, C.rojo);
  R.actor(EL.vecino, mx, WL - 10, t, { dir: -1, pal: MARINERO, tocado: 'gorra', dedo: tira || entre(t, puerto, puerto + 0.9), sonrisa: t > debajo });
};

// ── 4 · la ciudad, más alta ─────────────────────────────────────────────────────────────────────────────────────
const p4 = (t) => {
  T.galveston(R, t, { despues: true, encuadre: 'muro' });
  // el suelo de antes, marcado en la cara del muro, y la flecha «+10» hasta el de ahora
  const top = (x) => 58 + 38 * x / 238, pie = (x) => 146 - 42 * x / 238, viejo = (x) => Math.round(top(x) + 0.49 * (pie(x) - top(x)));
  const l = lin(t, ciudad + 0.2, diez - 0.1);
  if (l > 0) for (let x = 0; x < Math.round(l * 200); x++) if (x % 6 < 4) { R.pset(x, viejo(x), C.oroL); R.pset(x, viejo(x) + 1, hex('#8a6a20')); }
  const e = tramo(t, diez - 0.1, diez + 0.3);
  if (e > 0) { const X = 44, y0 = viejo(X), y1 = Math.round(lerp(y0, top(X) - 2, e));
    R.rect(X - 1, y1, X + 1, y0, C.k); R.rect(X, y1 + 1, X, y0, C.oroL);
    R.poligono([[X - 4, y1 + 4], [X + 5, y1 + 4], [X + 0.5, y1 - 2]], C.k); R.poligono([[X - 3, y1 + 3], [X + 4, y1 + 3], [X + 0.5, y1 - 1]], C.oroL);
    if (t > diez) R.numero('+10', 52, Math.round(lerp(98, 92, tramo(t, diez, diez + 0.2))), { tam: 16 }); }
  // la pareja de la foto pasea por la playa; el perro va delante, muy digno, y se sienta cuando paran
  const u = lin(t, P4 - 0.2, diez + 0.3), x = Math.round(lerp(72, 118, u)), para = u >= 1;
  R.actor(EL.vecino, x, 166, t, { dir: 1, pal: SENOR, anda: !para, dedo: entre(t, ciudad, ciudad + 0.8) || entre(t, diez + 0.4, diez + 1.2), sonrisa: true, habla: entre(t, diez + 0.4, diez + 1.2) && parpadeo(t, 8) });
  R.actor(EL.vecina, x + 16, 167, t, { dir: 1, pal: SENORA, anda: !para, sonrisa: true });
  { const [hx, hy] = manoAtras(x + 16, 167, 1); sombrilla(hx, hy); }
  perrito(x + 36, 170, t, { dir: 1, pose: para ? 'sentado' : 'pie', anda: !para, digno: true });
};
const efectos = [[0.5, 'vapor'], [1.3, 'toc'], [1.9, 'toc'], [increible, 'whoosh'], [2.9, 'toc'], [vuelcaT[0] + 0.25, 'golpecito'], [diecisiete, 'pop'], [alto + 0.1, 'brillo'],
  [subeT[0] + 0.1, 'tic'], [subeT[0] + 0.55, 'tic'], [subeT[0] + 1.0, 'tic'], [subeT[0] + 1.45, 'tic'], [subeT[0] + 0.3, 'guau'], [dosmil, 'pop'], [bajaT[1] + 0.05, 'golpecito'],
  [P3 + 0.15, 'silbato'], [bombea, 'vapor'], [arenaW + 0.05, 'gluglu'], [debajo, 'chof'], [debajo + 0.5, 'ola'],
  [P4 + 0.2, 'ola'], [ciudad + 0.3, 'lapiz'], [diez, 'pop'], [diez + 0.6, 'ola'], [antes + 0.1, 'brillo']];
const año = (t) => t < P2 ? Math.round(lerp(1902, 1904, lin(t, 0.4, P2 - 0.6))) : t < P3 ? 1905 : t < P4 ? Math.round(lerp(1906, 1909, lin(t, P3, P4 - 0.4))) : 1911;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')
