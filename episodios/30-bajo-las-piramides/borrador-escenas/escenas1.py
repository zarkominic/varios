E = {}
E['gz-gancho'] = ('Gancho', '''// GZ-GANCHO (frases 1–2), sin cartela. Siete planos:
// 1. (2025) la meseta de Giza al atardecer: un camellero cruza con su vara, dos turistas llegan; uno señala Kefrén en
//    «second pyramid» y la otra le hace una foto (flash en «pyramid»); en «Giza» una línea de barrido sube y lo
//    convierte todo en plano azul;  2. (según ellos) los pozos de cerca en el plano azul: en «eight» salta el 8 (golpe),
//    en «sink» la cámara baja seiscientos metros por las roscas hasta los cubos; en «Nobody… prove it» salen tres «?»;
//    3. (2023) la cara norte de Keops: en el andamio el técnico mete el endoscopio por la rendija en «real secrets» y la
//    científica, ante la pantallita, se sorprende en «found» y lo celebra en «recently»;  4. (según ellos) el plano azul
//    impreso sobre una mesa: una mano lleva la lupa por él; en «full detail» la lupa enseña las salas en grande y en
//    «what they say lies down there» baja por un pozo, con su rosca girando, hasta los cubos y un «?»;  5. (2023) lo que
//    ve el endoscopio: el pasillo oculto; en «thinner than a pencil» entra al lado la comparación: el lápiz y el cable;
//    6. (hacia el 450 a. C.) el laberinto: Heródoto entra solo entre las columnas, mira a un lado y a otro, se queda
//    boquiabierto en «greater than the pyramids» y señala el fondo, que no se acaba;  7. (hoy) la mesa de Atom: Atom baja de su
//    esquina, levanta la punta de la pirámide de pisapapeles en «the reason», se asoma en «gone down to look»… dentro,
//    nada: una nubecilla de polvo; la deja caer en «yet» y vuelve a su sitio (gag 1).''', r'''
const a = (f) => en('pozos', f), c = (f) => en('camino', f);
const P2 = a(0.354), P3 = a(0.7415), P4 = c(-0.004), P5 = c(0.3066), P6 = c(0.5689), P7 = c(0.8246);
const segunda = a(0.243), piramide = a(0.261), giza = a(0.305), ocho = a(0.3561), hunde = a(0.436), tierra = a(0.567), nadie = a(0.614), prueba = a(0.676);
const reales = a(0.808), hallados = a(0.920), reciente = a(0.957);
const veras = c(0.032), detalle = c(0.058), dicen = c(0.128), abajo = c(0.173), alli = c(0.194);
const oculto = c(0.3345), camara = c(0.451), fino = c(0.473), lapizW = c(0.5236);
const laberinto = c(0.579), griego = c(0.6414), mayor = c(0.724), piramides = c(0.771);
const razon = c(0.8408), bajado = c(0.9158), mira = c(0.9664), aun = c(0.980);
const K = hex('#0c0a12');
const PZ = Object.fromEntries(Object.entries({ f0: '#050c22', f1: '#08142e', f2: '#0c1a3a', f3: '#102248', rj: '#132c56', rjM: '#1c3c70', rjC: '#2a568e',
  hal: '#113a62', hal2: '#1a5a88', co: '#2a8ab6', ci: '#5ae0f0', br: '#c8fbff' }).map(([k, v]) => [k, hex(v)]));
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], b4 = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const tono = (r, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return r[Math.max(0, Math.min(r.length - 1, l))]; };
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
// la pluma del plano azul: halo y luego núcleo; 'c' cian, 'd' cian apagado, 'b' brillo
const pluma = (L) => {
  for (const [x0, y0, x1, y1, k] of L) if (k !== 'd') for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.linea(Math.round(x0 + dx), Math.round(y0 + dy), Math.round(x1 + dx), Math.round(y1 + dy), PZ.hal);
  for (const [x0, y0, x1, y1, k] of L) R.linea(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), k === 'd' ? PZ.co : k === 'b' ? PZ.br : PZ.ci);
};
const caja = (L, x0, y0, x1, y1, k = 'c') => L.push([x0, y0, x1, y0, k], [x1, y0, x1, y1, k], [x1, y1, x0, y1, k], [x0, y1, x0, y0, k]);
// Atom en el plano (plano 7), con su halo; la esquina se queda tranquila mientras está en la mesa
const comp0 = R.companero; R.companero = (t, e) => { if (t < P7) comp0(t, e); };
const atomEn = (x, y, t, e = 0.4, r = 13) => {
  for (let j = -20; j <= 20; j++) for (let i = -20; i <= 20; i++) { const g = 1 - Math.hypot(i, j) / (r + 6); if (g > 0.3 && ((i + j) & 1 || g > 0.6)) R.pset(x + i, y + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(x, y, t, { r, orbita: R.PAL.ATOM[7], energia: e });
};

// 1 · la meseta al atardecer; en «Giza» el barrido la vuelve plano azul
const O1 = { hora: 'atardecer' };
let azul = null;
const p1 = (t) => {
  T.giza(R, t, O1);
  // el camellero cruza por la izquierda con su vara
  const u = tramo(t, 0.2, P2 - 0.3);
  R.actor(EL.camellero, Math.round(lerp(8, 80, u)), 166, t, { dir: 1, anda: u > 0 && u < 1 });
  // los dos turistas llegan por la derecha; él señala Kefrén, ella le hace la foto
  const v = tramo(t, 0.4, 3.4), xa = Math.round(lerp(300, 250, v)), xb = Math.round(lerp(282, 214, tramo(t, 0.6, 3.9)));
  R.actor(EL.turista2, xa, 166, t, { dir: -1, anda: v > 0 && v < 1, dedo: t > segunda - 0.15 && t < giza + 0.3, sorpresa: t > giza, habla: t > 3.5 && t < segunda - 0.2 && Math.sin(t * 9) > 0 });
  const ub = tramo(t, 0.6, 3.9), foto = t > piramide - 0.9;
  const r1 = R.actor(EL.turista1, xb, 162, t, { dir: 1, anda: ub > 0 && ub < 1, sostiene: foto ? [xb + 20, 140] : undefined, sonrisa: t > piramide + 0.3 });
  if (foto) { const [mx, my] = r1.mano; R.rect(mx - 1, my - 7, mx + 3, my, K); R.rect(mx, my - 6, mx + 2, my - 1, hex('#5a6a8a')); R.pset(mx + 1, my - 5, hex('#bfe0ff'));
    const f = tramo(t, piramide, piramide + 0.25); if (f > 0 && f < 1) { R.disco(mx + 1, my - 4, Math.round(2 + f * 5), hex('#fff8d8')); R.disco(mx + 1, my - 4, 2, hex('#ffffff')); } }
  T.gizaDelante(R, t, O1);
  // el barrido: una línea de holograma que sube y deja debajo el plano azul de los pozos
  const w = tramo(t, giza + 0.1, P2);
  if (w > 0) {
    if (!azul) azul = R.nuevo();
    const prev = R.usar(azul); T.plano(R, t, { encuadre: 'corte', camara: 'pozos', baja: 0 }); R.usar(prev);
    const yl = Math.round(lerp(181, -2, w * w * (3 - 2 * w)));
    for (let y = Math.max(0, yl); y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, azul[y * 320 + x]);
    if (yl > 0 && yl < 180) {
      for (let x = 0; x < 320; x++) { R.pset(x, yl, PZ.br); if (yl - 1 >= 0) R.pset(x, yl - 1, (x + Math.floor(t * 40)) % 5 ? PZ.ci : PZ.br); if (yl - 2 >= 0 && hh(x, yl) > 0.6) R.pset(x, yl - 2, PZ.ci); if (yl - 4 >= 0 && hh(x, yl, 3) > 0.85) R.pset(x, yl - 4, PZ.co); }
    }
  }
};

// 2 · los pozos de cerca: en «eight» el 8 (golpe); en «sink» la cámara baja; en «prove it» los «?»
const p2 = (t) => {
  const bj = tramo(t, hunde - 0.15, tierra + 0.6), o = { encuadre: 'corte', camara: 'pozos', baja: bj * bj * (3 - 2 * bj) };
  T.plano(R, t, o); T.planoDelante(R, t, o);
  // el 8, con su marco cian, que salta en «eight» y se va al bajar
  const e8 = tramo(t, ocho - 0.05, ocho + 0.25), fuera = tramo(t, hunde + 0.4, hunde + 1.0);
  if (e8 > 0 && fuera < 1) {
    const y = Math.round(28 - Math.sin(e8 * Math.PI) * 5 - fuera * 40), x = 44;
    const L = []; caja(L, x - 4, y - 3, x + 30, y + 23, 'c'); L.push([x + 13, y + 24, x + 13, y + 34, 'c'], [x + 10, y + 31, x + 13, y + 34, 'c'], [x + 16, y + 31, x + 13, y + 34, 'c']); pluma(L);
    for (let j = y - 2; j <= y + 22; j++) for (let i = x - 3; i <= x + 29; i++) if ((i + j) & 1) R.pset(i, j, PZ.f2);
    R.numero('8', x + 13, y + 20, { tam: 16, centro: true });
    if (t < ocho + 0.5) { const g = tramo(t, ocho, ocho + 0.5); for (let q = 0; q < 12; q++) { const an = q * Math.PI / 6, rr = 22 + g * 16; R.pset(Math.round(x + 13 + Math.cos(an) * rr), Math.round(y + 10 + Math.sin(an) * rr * 0.8), PZ.br); } }
  }
  // «Nobody has been able to prove it yet»: tres «?» amarillos que salen de uno en uno junto a los cubos
  for (let i = 0; i < 3; i++) { const t0 = nadie + 0.1 + i * 0.32; if (t < t0) continue; const s = tramo(t, t0, t0 + 0.18);
    const x = [112, 160, 210][i], y = Math.round([64, 46, 64][i] - s * 5 + Math.sin(t * 4 + i * 2) * 2);
    R.icono('?', x - 7, y, hex('#ffe890'), K, 3); }
};

// 3 · la cara norte de Keops: el endoscopio entra por la rendija
const p3 = (t) => {
  const en3 = tramo(t, reales - 0.1, reciente + 0.4), o = { encuadre: 'norte', entra: en3 };
  T.keops(R, t, o);
  // la científica ante la pantallita del maletín; el técnico empuja el cable por la rendija
  const sorp = t > hallados && t < reciente, fiesta = t > reciente;
  R.actor(EL.cientificaFrancesa, 46, 104, t, { dir: 1, sorpresa: sorp, brazos: fiesta && t < reciente + 1.1, salto: fiesta && t < reciente + 1.1 ? Math.round(Math.abs(Math.sin((t - reciente) * 6)) * 3) : 0, sonrisa: t > reciente, habla: t > P3 + 0.4 && t < reales - 0.2 && Math.sin(t * 8) > 0 });
  const empuja = t > reales - 0.1 && t < reciente + 0.4 ? Math.round(Math.sin(t * 7) * 2) : 0;
  if (sorp || (fiesta && t < reciente + 1.2)) R.icono('!', 51, Math.round(66 - tramo(t, hallados, hallados + 0.2) * 4), hex('#ffe890'), K, 2);
  R.actor(EL.tecnicoEgipcio, 82, 104, t, { dir: 1, sostiene: [100 + empuja, 84], sonrisa: t > reciente });
  T.keopsDelante(R, t, o);
};

// 4 · el plano azul impreso sobre la mesa: la mano lleva la lupa por él
let hoja = null, lenteB = null;
const H0 = [16, 20, 266, 164];   // la hoja
const dibujoHoja = (Lx) => {   // las líneas del plano en coordenadas de la hoja (Lx: transformación)
  const L = [], P = (x, y) => Lx(x, y), l = (x0, y0, x1, y1, k = 'c') => { const [a0, b0] = P(x0, y0), [a1, b1] = P(x1, y1); L.push([a0, b0, a1, b1, k]); };
  l(30, 58, 252, 58); for (let x = 34; x < 252; x += 6) l(x, 59, x - 3, 62, 'd');
  l(116, 58, 144, 28); l(144, 28, 172, 58); for (let k = 1; k < 7; k++) { const y = 28 + k * 4.3, w = (y - 28) * 0.95; l(144 - w, y, 144 + w, y, 'd'); }
  l(206, 58, 220, 42, 'd'); l(220, 42, 234, 58, 'd'); l(62, 58, 72, 47, 'd'); l(72, 47, 82, 58, 'd');
  for (let i = 0; i < 5; i++) { const x = 122 + i * 11; l(x - 3, 61, x + 3, 61); l(x + 3, 61, x + 3, 66); l(x + 3, 66, x - 3, 66); l(x - 3, 66, x - 3, 61); if (i < 4) l(x + 3, 63, x + 8, 63, 'd'); }
  for (let i = 0; i < 8; i++) { const x = 102 + i * 12; l(x - 1, 68, x - 1, 140); l(x + 1, 68, x + 1, 140); for (let y = 72; y < 138; y += 6) l(x - 4, y, x + 4, y + 3, 'd'); }
  l(98, 140, 190, 140, 'd');
  for (const x0 of [100, 172]) { l(x0, 144, x0 + 16, 144); l(x0 + 16, 144, x0 + 16, 158); l(x0 + 16, 158, x0, 158); l(x0, 158, x0, 144); l(x0, 144, x0 + 5, 140); l(x0 + 16, 144, x0 + 21, 140); l(x0 + 5, 140, x0 + 21, 140); l(x0 + 21, 140, x0 + 21, 154); l(x0 + 21, 154, x0 + 16, 158); }
  for (let k = 0; k < 4; k++) { const y = 150 - k * 22; l(212, y, 228, y - 20, 'd'); l(228, y - 20, 244, y, 'd'); l(212, y, 244, y, 'd'); }
  l(226, 26, 234, 26); l(226, 26, 226, 32); l(234, 26, 234, 32); l(226, 32, 234, 32); l(216, 28, 225, 29); l(235, 29, 244, 28); l(216, 26, 216, 31); l(244, 26, 244, 31);
  for (let k = 0; k < 4; k++) { const y = 38 + k * 5, w = 4 + k * 3; l(230 - w, y, 230 + w, y + 1, 'd'); }
  for (let k = 0; k < 3; k++) { const y = 74 + k * 18; l(24, y, 34, y); l(34, y, 34, y + 8); l(34, y + 8, 24, y + 8); l(24, y + 8, 24, y); }
  l(26, 96, 26, 102); l(29, 94, 29, 104); l(32, 96, 32, 102); l(25, 112, 33, 112, 'd'); l(25, 118, 33, 118, 'd');
  l(46, 58, 46, 150, 'd'); l(42, 58, 50, 58); l(42, 150, 50, 150); l(46, 60, 44, 63); l(46, 60, 48, 63); l(46, 148, 44, 145); l(46, 148, 48, 145);
  return L;
};
const pintaHoja = (t) => {
  if (!hoja) {
    hoja = R.nuevo(); const prev = R.usar(hoja);
    // la mesa de dibujo: tablas de nogal con vetas y nudos
    const MAD = [hex('#3a2416'), hex('#52321c'), hex('#6a4426'), hex('#845a34'), hex('#9a6c40')];
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y + 3) / 22), veta = Math.sin(x * 0.07 + tabla * 2.1 + Math.sin(x * 0.013 + tabla) * 3) * 0.6 + Math.sin(y * 0.9 + x * 0.02) * 0.35;
      R.pset(x, y, (y + 3) % 22 === 0 ? MAD[0] : tono(MAD, 2.2 + veta + (hh(x >> 3, tabla) - 0.5) * 0.6, x, y)); }
    for (const [nx, ny] of [[290, 150], [8, 96], [300, 70]]) { R.disco(nx, ny, 3, MAD[1]); R.disco(nx, ny, 1, MAD[0]); }
    // la sombra de la hoja y la hoja en el código del plano azul
    const [x0, y0, x1, y1] = H0;
    for (let y = y0 + 3; y <= y1 + 3; y++) for (let x = x0 + 4; x <= x1 + 4; x++) if ((x + y) & 1 || y > y1 || x > x1) R.pset(x, y, MAD[0]);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = 1.6 + (y - y0) / (y1 - y0) * 0.9 + (hh(x >> 2, y >> 2) - 0.5) * 0.5; R.pset(x, y, tono([PZ.f1, PZ.f2, PZ.f3], v - 0.6, x, y)); }
    for (let y = y0 + 4; y < y1; y += 8) for (let x = x0 + 1; x < x1; x++) R.pset(x, y, (y - y0 - 4) % 32 === 0 ? PZ.rjM : PZ.rj);
    for (let x = x0 + 4; x < x1; x += 8) for (let y = y0 + 1; y < y1; y++) R.pset(x, y, (x - x0 - 4) % 32 === 0 ? PZ.rjM : PZ.rj);
    for (let x = x0; x <= x1; x++) { R.pset(x, y0, PZ.rjC); R.pset(x, y1, PZ.rjC); R.pset(x, y0 + 3, PZ.co); R.pset(x, y1 - 3, PZ.co); }
    for (let y = y0; y <= y1; y++) { R.pset(x0, y, PZ.rjC); R.pset(x1, y, PZ.rjC); R.pset(x0 + 3, y, PZ.co); R.pset(x1 - 3, y, PZ.co); }
    for (let x = x0 + 8; x < x1 - 4; x += 8) R.pset(x, y0 + 2, PZ.ci);
    // el cajetín sin letras, abajo a la derecha (barras, pirámide y brújula)
    R.rect(214, 138, 260, 160, PZ.f0); R.linea(214, 138, 260, 138, PZ.co); R.linea(214, 138, 214, 160, PZ.co); R.linea(236, 138, 236, 160, PZ.rjC); R.linea(214, 149, 236, 149, PZ.rjC);
    for (let k = 0; k < 4; k++) R.linea(217, 141 + k * 2, 217 + 8 + k * 3, 141 + k * 2, PZ.rjC); R.poligono([[248, 142], [242, 156], [254, 156]], PZ.rjC); R.pset(248, 147, PZ.ci);
    // la esquina doblada de abajo a la izquierda y las tiras de cinta de carrocero en las esquinas
    R.poligono([[x0, y1 - 10], [x0 + 10, y1], [x0, y1]], MAD[1]); R.poligono([[x0, y1 - 10], [x0 + 10, y1], [x0 + 10, y1 - 10]], PZ.rjC);
    for (const [cx, cy, s] of [[x0 + 2, y0 + 2, 1], [x1 - 2, y0 + 2, -1], [x1 - 2, y1 - 2, 1]]) R.poligono([[cx - 7, cy - 3 * s], [cx + 5, cy + 7 * s], [cx + 9, cy + 3 * s], [cx - 3, cy - 7 * s]], hex('#e8d8a8'));
    pluma(dibujoHoja((x, y) => [x, y]));
    R.numero('650', 52, 132, { tam: 8, rampa: [PZ.co, PZ.ci, PZ.ci, PZ.br] });
    for (const [n, y] of [['5', 82], ['8', 100], ['2', 118]]) R.numero(n, 40, y, { tam: 8, rampa: [PZ.co, PZ.ci, PZ.ci, PZ.br] });
    // a la derecha de la hoja, lo que hay en la mesa: el compás, la regla, dos lápices, la goma y la taza (abajo)
    R.rect(276, 60, 281, 158, K); R.rect(277, 61, 280, 157, hex('#d8d0b8')); for (let y = 64; y < 156; y += 4) R.linea(277, y, 278 + (y % 12 === 0 ? 2 : 0), y, hex('#5a5040'));
    for (const [lx, c1] of [[288, '#f0c040'], [296, '#3a8ae8']]) { R.rect(lx, 64, lx + 3, 112, K); R.rect(lx + 1, 65, lx + 2, 106, hex(c1)); R.rect(lx + 1, 107, lx + 2, 110, hex('#e8cc8a')); R.pset(lx + 1, 111, K); R.rect(lx + 1, 62, lx + 2, 64, hex('#e88a9a')); }
    R.rect(290, 124, 304, 131, K); R.rect(291, 125, 303, 130, hex('#e88a9a')); R.rect(291, 125, 303, 126, hex('#f6b0c0'));
    R.linea(300, 140, 288, 162, K); R.linea(301, 140, 289, 162, hex('#c8ccd8')); R.linea(300, 140, 312, 162, K); R.linea(301, 140, 313, 162, hex('#c8ccd8')); R.disco(300, 139, 2, hex('#f0c040'));
    R.usar(prev);
  }
  R.copiar(hoja);
  // la taza de café que humea (encima de la mesa, arriba a la derecha, fuera de la hoja) y el barrido de holograma
  const [x0, y0, x1, y1] = H0, yb = Math.round(y0 + ((t * 18) % (y1 - y0)));
  for (let x = x0 + 4; x < x1 - 4; x++) if (hh(x, yb) > 0.35) R.pset(x, yb, PZ.rjC);
  const fase = Math.floor(t * 24) % 40; for (const [px, py] of [[30 + fase * 5, 58], [116 + fase * 0.7, 58 - fase * 0.75]]) if (px < 252) R.pset(Math.round(px), Math.round(py), PZ.br);
};
const p4 = (t) => {
  pintaHoja(t);
  // el recorrido de la lupa: entra por abajo, se para en las salas en «full detail» y baja por un pozo en «down there»
  const u1 = tramo(t, P4 + 0.1, detalle + 0.2), u2 = tramo(t, dicen, alli + 0.7);
  const lx = Math.round(u2 > 0 ? 138 : lerp(250, 138, u1 * u1 * (3 - 2 * u1))), ly = Math.round(u2 > 0 ? lerp(70, 132, u2 * u2 * (3 - 2 * u2)) : lerp(190, 70, u1 * (2 - u1)));
  const r = 29, Z = 2.5;
  // lo que se ve en la lupa: el plano en grande (más detalle: la rosca que gira y las puertas de las salas)
  if (!lenteB) lenteB = R.nuevo();
  const prev = R.usar(lenteB);
  for (let y = ly - r; y <= ly + r; y++) for (let x = lx - r; x <= lx + r; x++) { const sx = lx + (x - lx) / Z, sy = ly + (y - ly) / Z; const gx = ((sx - 20) % 8 + 8) % 8, gy = ((sy - 24) % 8 + 8) % 8;
    R.pset(x, y, gx < 0.45 || gy < 0.45 ? PZ.rjM : tono([PZ.f1, PZ.f2, PZ.f3], 1.5 + (hh(Math.floor(sx), Math.floor(sy)) - 0.5) * 0.8, x, y)); }
  const T2 = (x, y) => [lx + (x - lx) * Z, ly + (y - ly) * Z];
  const LL = dibujoHoja(T2); pluma(LL); pluma(LL.map(([x0, y0, x1, y1, k]) => [x0 + 1, y0, x1 + 1, y1, k === 'd' ? 'c' : 'b']));
  // la rosca de cada pozo, de cerca: la espiral que gira (el detalle que solo se ve con la lupa)
  const L = [];
  for (let i = 0; i < 8; i++) { const x = 102 + i * 12; for (let y = 70; y < 138; y += 0.5) { const ph = y * 0.9 + t * 5, xx = x + Math.sin(ph) * 4.2, front = Math.cos(ph) > 0; const [a0, b0] = T2(xx, y); if (front) L.push([a0 - 1, b0, a0 + 1, b0 + 1, 'b']); else L.push([a0, b0, a0, b0, 'd']); } }
  for (let i = 0; i < 5; i++) { const x = 122 + i * 11; const [a0, b0] = T2(x - 1, 64); L.push([a0, b0, a0 + 4, b0, 'b']); }
  pluma(L);
  R.usar(prev);
  // la sombra de la lupa en la hoja, el aro de latón (con su brillo arriba a la izquierda) y el cristal
  for (let y = ly - r; y <= ly + r + 8; y++) for (let x = lx - r; x <= lx + r + 6; x++) { const d = Math.hypot(x - lx - 4, y - ly - 6); if (d < r + 2 && Math.hypot(x - lx, y - ly) > r + 2 && (x + y) & 1) R.pset(x, y, PZ.f0); }
  R.disco(lx, ly, r + 3, K);
  for (let y = ly - r - 2; y <= ly + r + 2; y++) for (let x = lx - r - 2; x <= lx + r + 2; x++) { const d = Math.hypot(x - lx, y - ly); if (d <= r + 2 && d >= r - 1) { const an = Math.atan2(y - ly, x - lx); R.pset(x, y, d >= r + 1 ? (an < -1.2 && an > -2.8 ? hex('#ffe890') : hex('#f0c040')) : hex('#a87a18')); } }
  for (let y = ly - r; y <= ly + r; y++) for (let x = lx - r; x <= lx + r; x++) if (Math.hypot(x - lx, y - ly) < r - 1 && x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, lenteB[y * 320 + x]);
  for (let k = 0; k < 7; k++) { R.pset(lx - 16 + k, ly - 18 + Math.round(k * 0.5), hex('#e8fbff')); R.pset(lx - 17 + k, ly - 15 + Math.round(k * 0.5), hex('#9ad6ff')); }
  // el mango de madera y la mano canónica que lo lleva
  const hx = lx + Math.round(r * 0.72), hy = ly + Math.round(r * 0.72);
  for (let k = 0; k < 18; k++) { const x = hx + k, y = hy + k; R.rect(x - 2, y - 2, x + 2, y + 2, K); }
  for (let k = 0; k < 18; k++) { const x = hx + k, y = hy + k; R.rect(x - 1, y - 1, x + 1, y + 1, hex('#8a5428')); R.pset(x - 1, y, hex('#b8844a')); }
  R.rect(hx - 2, hy - 2, hx + 2, hy + 2, hex('#a87a18'));
  T.brazo(R, hx + 66, hy + 70, hx + 22, hy + 18, '#3a4a6a', -1, { codo: [hx + 50, hy + 36] });
  // al llegar abajo, el «?» de lo que nadie ha visto
  const q = tramo(t, alli + 0.75, alli + 0.95); if (q > 0) R.icono('?', lx - 44, Math.round(ly - 8 - q * 4 + Math.sin(t * 4) * 2), hex('#ffe890'), K, 3);
};

// 5 · lo que ve el endoscopio: el pasillo oculto; al lado, el lápiz y el cable
const p5 = (t) => {
  const o = { encuadre: 'norte', camara: 'pasillo', entra: 0.25 + 0.75 * tramo(t, P5, P6) };
  T.keops(R, t, o);
  // la comparación: una ficha clara a la derecha con el lápiz y el cable del endoscopio, mucho más fino
  const s = tramo(t, camara - 0.1, camara + 0.25), l = tramo(t, fino, lapizW);
  if (s > 0) {
    const x0 = Math.round(lerp(330, 250, s * s * (3 - 2 * s))), y0 = 62;
    R.rect(x0 - 1, y0 - 1, x0 + 57, y0 + 53, K); R.rect(x0, y0, x0 + 56, y0 + 52, hex('#d8d4c4')); R.rect(x0, y0, x0 + 56, y0 + 2, hex('#f2eee2')); R.rect(x0 + 1, y0 + 50, x0 + 56, y0 + 52, hex('#a8a494'));
    for (let y = y0 + 8; y < y0 + 50; y += 8) R.linea(x0 + 2, y, x0 + 54, y, hex('#c4c0b0'));
    // el cable (fino) con la cabecita y la lucecita
    const cy = y0 + 36; for (let x = x0 + 4; x < x0 + 46; x++) R.pset(x, cy + Math.round(Math.sin(x * 0.4) * 0.6), hex('#5a5e6a'));
    R.rect(x0 + 46, cy - 1, x0 + 50, cy + 1, hex('#7c8090')); R.pset(x0 + 51, cy, hex('#a8c8d0')); R.pset(x0 + 51, cy - 1, Math.sin(t * 8) > 0 ? hex('#fff4b0') : hex('#f0d040'));
    // el lápiz, que entra y se pone al lado
    if (l > 0) T.PIEZAS_GZ.lapiz(R, Math.round(x0 + 28 + (1 - l) * 40), y0 + 22, { s: 3 });
    if (l >= 1) { const on = Math.sin(t * 6) > 0; R.linea(x0 + 52, y0 + 14, x0 + 52, y0 + 24, on ? hex('#e8783a') : hex('#b85a1a')); R.linea(x0 + 52, cy - 2, x0 + 52, cy + 2, on ? hex('#e8783a') : hex('#b85a1a')); }
  }
};

// 6 · el laberinto: el guía con su candil y Heródoto, que se queda boquiabierto
const candil = (x, y, t) => { R.rect(x - 4, y, x + 4, y + 3, K); R.rect(x - 3, y + 1, x + 3, y + 2, hex('#a8603a')); R.pset(x + 4, y, hex('#a8603a')); const f = Math.sin(t * 13) > 0 ? 1 : 0; R.halo(x + 4, y - 3, 9, [hex('#5a4020'), hex('#a8783a'), hex('#e8b060')], 0.7); R.rect(x + 3, y - 3 - f, x + 5, y - 1, hex('#f0a030')); R.pset(x + 4, y - 4 - f, hex('#fff0a0')); R.pset(x + 4, y - 2, hex('#fff0a0')); };
const p6 = (t) => {
  T.hawara(R, t, { encuadre: 'escalera', camara: 'pasillos' });
  // Heródoto entra solo, se para a mirar a un lado y a otro; en «greater than the pyramids» abre los brazos boquiabierto
  // y luego señala el fondo del pasillo, que no se acaba
  const hm = tramo(t, P6 + 0.1, griego + 0.1), xh = Math.round(lerp(-20, 150, hm * (2 - hm)));
  const mira = hm >= 1 && t < mayor ? (Math.floor((t - griego) * 1.8) % 2 ? -1 : 1) : 1;
  R.actor(EL.herodoto, xh, 172, t, { dir: mira, anda: hm > 0 && hm < 1, sorpresa: t > mayor && t < piramides + 0.5, brazos: t > mayor && t < piramides + 0.2,
    dedo: t > piramides + 0.2, sonrisa: t > piramides + 0.5, salto: t > mayor && t < mayor + 0.45 ? 2 : 0 });
  // las motas de polvo que levanta al andar, a la luz de los pasillos
  if (hm > 0 && hm < 1) for (let q = 0; q < 4; q++) { const u = (t * 2 + q / 4) % 1; R.pset(Math.round(xh + 4 - u * 8 + q), Math.round(171 - u * 6), u < 0.5 ? hex('#e8dcc0') : hex('#c8b898')); }
  if (t > mayor && t < mayor + 1.0) R.icono('!', xh + 4, Math.round(132 - tramo(t, mayor, mayor + 0.2) * 4), hex('#ffe890'), K, 2);
};

// 7 · la mesa de Atom: levanta la punta de la pirámide, se asoma… dentro, nada (gag 1)
const p7 = (t) => {
  const sube = tramo(t, razon + 0.45, razon + 1.0), cierra = tramo(t, aun + 0.15, aun + 0.4);
  const ab = Math.max(0, sube - cierra), o = { encuadre: 'estudio', camara: 'mesa', abre: ab, lapiz: false };
  T.hoy(R, t, o);
  // dentro del hueco, a la luz de Atom: nada; una nubecilla de polvo
  const asoma = tramo(t, bajado - 0.1, bajado + 0.3) * (1 - cierra);
  if (asoma > 0) { R.halo(168, 128, 14, [hex('#3a2a1a'), hex('#6a5a3a'), hex('#a8c8d0')], 0.9 * asoma);
    const pf = tramo(t, mira - 0.1, aun + 0.5); if (pf > 0 && pf < 1) for (let k = 0; k < 3; k++) { const px = Math.round(166 + (k - 1) * 7 + pf * 6), py = Math.round(126 - pf * 26 - k * 2), rr = Math.round(3 + pf * 4 - k); R.disco(px, py, rr + 1, hex('#8a7a60')); R.disco(px, py, rr, hex('#d8c8a0')); R.pset(px - 1, py - 1, hex('#f2eee2')); } }
  T.hoyDelante(R, t, o);
  const llega = tramo(t, P7, razon + 0.4), vuelve = tramo(t, aun + 0.6, E.duracion - 0.2);
  const ix = vuelve > 0 ? lerp(190, 297, vuelve) : lerp(297, 190, llega * llega * (3 - 2 * llega));
  const iy = vuelve > 0 ? lerp(112, 24, vuelve) : llega < 1 ? lerp(24, 112, llega * (2 - llega)) : 112 - 18 * ab;
  const tiembla = t > mira && t < aun ? Math.round(Math.sin(t * 30)) : 0;
  atomEn(Math.round(ix) + tiembla, Math.round(iy + Math.sin(t * 2.6) * 1.5), t, t > mira && t < aun + 0.6 ? 0.1 : 0.45);
};

const año = (t) => t < P3 ? 2025 : t < P4 ? 2023 : t < P5 ? 2025 : t < P6 ? 2023 : t < P7 ? -450 : 2026;
const efectos = [[piramide, 'flash'], [giza + 0.15, 'whoosh'], [ocho, 'boom'], [nadie + 0.1, 'pop'], [reales, 'zumbido'], [reciente, 'palmada'],
  [alli + 0.75, 'pop'], [lapizW - 0.3, 'lapiz'], [P7 + 0.1, 'whoosh'], [razon + 0.5, 'pop'], [aun + 0.4, 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], { efectos, año });
''')

E['gz-hola'] = ('Hola', '''// GZ-HOLA (frase 3), hoy, sin cartela. Un plano: el estudio de Atom. Atom baja de su esquina hasta el centro del cuarto y
// rebota en «I'm Atom»; en «explain» da una vuelta con un destello; en «wondered about» le salen tres «?»; en «Let's find
// out» va a la mesa, coge la lupa (pegada a su órbita) y la acerca a la pirámide de pisapapeles.''', r'''
R.companero = () => {};   // Atom está en el plano: la esquina queda tranquila
const h1 = (f) => en('hola', f);
const soy = h1(0.035), explica = h1(0.218), pregunta = h1(0.540), vamos = h1(0.800), fuera = h1(0.903);
const K = hex('#0c0a12');
const atomEn = (x, y, t, e = 0.4, r = 12) => {
  for (let j = -20; j <= 20; j++) for (let i = -20; i <= 20; i++) { const g = 1 - Math.hypot(i, j) / (r + 6); if (g > 0.3 && ((i + j) & 1 || g > 0.6)) R.pset(x + i, y + j, g > 0.7 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
  R.atomo(x, y, t, { r, orbita: R.PAL.ATOM[7], energia: e });
};
const p1 = (t) => {
  const coge = t > vamos + 0.45, o = { encuadre: 'estudio', lupa: !coge };
  const g = T.hoy(R, t, o);
  T.hoyDelante(R, t, o);
  // el recorrido: baja de la esquina al centro, rebota en «I'm Atom», da la vuelta en «explain», va a la mesa en «Let's find out»
  const u0 = tramo(t, 0, soy), u1 = tramo(t, vamos, vamos + 0.45), u2 = tramo(t, vamos + 0.5, fuera + 0.4);
  let x = lerp(297, 136, u0 * (2 - u0)), y = lerp(24, 74, u0 * (2 - u0));
  const sal = t > soy && t < explica ? Math.round(Math.abs(Math.sin((t - soy) * Math.PI * 2.4)) * 8) : 0;
  if (t > explica && t < explica + 0.9) { const an = tramo(t, explica, explica + 0.9) * Math.PI * 2; x += Math.sin(an) * 14; y += (1 - Math.cos(an)) * -6; }
  if (u1 > 0) { x = lerp(136, 232, u1 * u1 * (3 - 2 * u1)); y = lerp(74, 86, u1); }
  if (u2 > 0) { x = lerp(232, 214, u2); y = lerp(86, 74, u2); }
  const ax = Math.round(x), ay = Math.round(y - sal + Math.sin(t * 2.6) * 1.5);
  // el destello de «explain»
  if (t > explica && t < explica + 0.9) for (let k = 0; k < 10; k++) { const an = k * Math.PI / 5 + t * 5; R.pset(Math.round(ax + Math.cos(an) * 21), Math.round(ay + Math.sin(an) * 21), hex('#c8f0ff')); }
  atomEn(ax, ay, t, sal > 0 ? 0.7 : 0.4);
  // la lupa, pegada a la órbita: se inclina hacia la pirámide de pisapapeles
  if (coge) { const lx = ax - 10 - Math.round(u2 * 4), ly = ay + 6 + Math.round(u2 * 4); T.PIEZAS_GZ.lupa(R, lx, ly + 17, { dir: -1 });
    if (u2 >= 1) { const b = Math.sin(t * 6) > 0; R.pset(lx - 4, ly + 2, b ? hex('#ffffff') : hex('#c8f0ff')); } }
  // los «?» de «wondered about», que suben junto a Atom
  if (t > pregunta - 0.1 && t < vamos + 0.1) for (let i = 0; i < 3; i++) { const t0 = pregunta - 0.1 + i * 0.22; if (t < t0) continue; R.icono('?', 156 + i * 14, Math.round(52 - (i & 1) * 8 - tramo(t, t0, t0 + 0.2) * 4 - Math.sin(t * 4 + i) * 2), hex('#ffe890'), K, 2); }
};
const efectos = [[soy + 0.05, 'pop'], [explica + 0.1, 'brillo'], [pregunta, 'pop'], [vamos + 0.45, 'golpecito']];
T.rodar(E, R, [[0, p1]], { efectos, año: 2026 });
''')

E['gz-conferencia'] = ('La rueda de prensa', '''// GZ-CONFERENCIA (frase 4), Italia, 15 de marzo de 2025, cartela «2025». Cuatro planos:
// 1. una plaza italiana ante el palacio de la rueda de prensa: pasa una Vespa (las palomas echan a volar); los tres
//    llegan andando; en «press conference» los periodistas los reciben con flashes y Malanga saluda; echan a andar hacia
//    la puerta;  2. la sala, de frente: en «Three men spoke» los tres se incorporan uno a uno; Malanga habla (su micro
//    con el piloto rojo) y explica con el dedo en «chemist»; un cámara entra por el pasillo;  3. la mesa de cerca:
//    Biondi habla y en «radar» teclea en su portátil, del que sale una onda; en «Armando Mei» le toca a Mei;
//    4. la pantalla grande de cerca, con los tres de espaldas a ella en la mesa: la foto de satélite de Giza; en «They
//    said» Biondi teclea y sale el plano azul… del revés (Malanga se sorprende); Biondi teclea otra vez y el plano gira
//    hasta ponerse derecho en «pyramid of Khafre»; en «from space» baja el satélite con sus ondas (gag 2).''', r'''
const k = (f) => en('conferencia', f);
const P2 = k(0.2354), P3 = k(0.4824), P4 = k(0.773);
const prensa = k(0.157), italia = k(0.201), tres = k(0.2405), malanga = k(0.309), quimico = k(0.367), pisa = k(0.448);
const biondi = k(0.508), radar = k(0.640), armando = k(0.6836), mei = k(0.7067), antiguo = k(0.776);
const dijeron = k(0.8424), mirado = k(0.8757), piram = k(0.9117), kefren = k(0.9347), espacio = k(0.9597);
const K = hex('#0c0a12');
const H = (s) => hex(s);
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], b4 = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const tono = (r, v, x, y) => { let l = Math.floor(v); if (v - l > b4(x, y)) l++; return r[Math.max(0, Math.min(r.length - 1, l))]; };
const hh = (x, y, q = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + q * 74.7) * 43758.5453; return s - Math.floor(s); };
const capa = (b, dib) => { if (!b.v) { b.v = R.nuevo(); const prev = R.usar(b.v); dib(); R.usar(prev); } R.copiar(b.v); };
const OC = ['#7a4e24', '#a06a34', '#c08848', '#d6a25e', '#e8c07e'].map(H), ST = ['#5e5244', '#7e705e', '#9e8e78', '#bcae94', '#d8ccb2'].map(H);
const TE = ['#6e3424', '#94483a', '#b4624a', '#cc8064', '#e2a284'].map(H), CB = ['#34303a', '#4e4854', '#66606c', '#827c88', '#a09aa6'].map(H);
const VE = ['#1e4a2e', '#2e6a3e', '#4a8a52'].map(H), CIELO = ['#5a8ad0', '#78a6e0', '#9cc2ec', '#c4dcf4'].map(H);

// ── 1 · la plaza ──
const CALLE = {};
const ventana = (x, y, w, h, abierta) => {
  R.rect(x - 2, y - 2, x + w + 1, y + h + 1, ST[3]); R.rect(x - 2, y + h + 1, x + w + 1, y + h + 2, ST[1]);
  R.rect(x, y, x + w - 1, y + h - 1, H('#1e2a44')); R.rect(x + 1, y + 1, x + w - 2, y + 3, H('#3a5a84')); R.linea(x + (w >> 1), y, x + (w >> 1), y + h - 1, ST[2]); R.linea(x, y + (h >> 1), x + w - 1, y + (h >> 1), ST[2]);
  R.pset(x + 2, y + 2, H('#9ac4ec')); R.pset(x + 3, y + 1, H('#9ac4ec'));
  const sw = abierta ? 6 : (w >> 1);
  for (const [sx, d] of [[x - 2 - sw, 0], [x + w + 1, 1]]) { if (!abierta && d) continue; const x0 = abierta ? sx : x + (d ? w >> 1 : 0);
    R.rect(x0, y - 1, x0 + sw - 1, y + h, VE[0]); for (let j = y; j < y + h; j += 2) R.linea(x0 + 1, j, x0 + sw - 2, j, VE[2]); R.linea(x0, y - 1, x0, y + h, K); R.linea(x0 + sw - 1, y - 1, x0 + sw - 1, y + h, VE[0]); }
  R.poligono([[x - 4, y - 3], [x + (w >> 1), y - 8], [x + w + 3, y - 3]], ST[3]); R.linea(x - 4, y - 3, x + w + 3, y - 3, ST[1]);
};
const pintaCalle = () => {
  // el cielo tramado
  for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(CIELO, 0.4 + y / 70 * 2.6, x, y));
  // el campanile al fondo, a la derecha
  for (let y = 22; y < 64; y++) for (let x = 232; x <= 252; x++) R.pset(x, y, tono(TE, 2.2 + (x - 232) / 20 * 1.2 + (hh(x >> 1, y >> 2) - 0.5) * 0.4, x, y));
  for (const yy of [30, 46]) { for (let i = 0; i < 3; i++) { R.rect(234 + i * 6, yy, 237 + i * 6, yy + 9, H('#2a1c1a')); R.disco(235 + i * 6, yy, 1, H('#2a1c1a')); } R.linea(232, yy + 11, 252, yy + 11, ST[3]); }
  R.disco(242, 36, 2, H('#c89a3a')); R.poligono([[230, 22], [242, 10], [254, 22]], TE[1]); R.linea(230, 22, 254, 22, ST[3]); R.linea(242, 6, 242, 10, K); R.linea(240, 7, 244, 7, K);
  // el edificio de la derecha (terracota) con el café
  for (let y = 62; y < 154; y++) for (let x = 190; x < 320; x++) R.pset(x, y, tono(TE, 2.4 + (hh(x >> 2, y >> 2) - 0.5) * 0.7 + (y > 100 ? 0.3 : 0), x, y));
  for (let x = 186; x < 320; x++) { R.pset(x, 58, TE[0]); R.pset(x, 59, (x & 3) ? TE[2] : TE[0]); R.pset(x, 60, (x & 3) ? TE[3] : TE[1]); R.pset(x, 61, TE[1]); R.pset(x, 62, ST[3]); R.pset(x, 63, ST[1]); }
  for (const x of [202, 230, 258, 286]) ventana(x, 72, 12, 18, x !== 258);
  // el toldo del café a rayas, con el borde festoneado, y el escaparate
  for (let y = 104; y < 116; y++) for (let x = 192; x < 318; x++) { const r = Math.floor((x - 192) / 6) & 1; R.pset(x, y, r ? H('#f0e8d0') : VE[1]); if (y === 104) R.pset(x, y, VE[0]); }
  for (let x = 192; x < 318; x += 6) { R.disco(x + 3, 116, 3, Math.floor((x - 192) / 6) & 1 ? H('#d8ccb0') : VE[0]); }
  for (let y = 121; y < 150; y++) for (let x = 196; x < 314; x++) R.pset(x, y, tono([H('#141a26'), H('#22304a'), H('#3a4e6a')], 0.6 + ((x + y * 0.6) % 40 < 6 ? 1.4 : 0), x, y));
  R.rect(194, 119, 315, 120, H('#2a1c1a')); for (const x of [236, 276]) R.rect(x, 120, x + 1, 150, H('#2a1c1a'));
  for (let i = 0; i < 9; i++) { const x = 202 + i * 4; R.rect(x, 128 - (i % 3), x + 1, 133, [H('#3a8a4a'), H('#c8a040'), H('#8a2a3a')][i % 3]); } R.rect(198, 134, 234, 135, H('#6a4a2a'));
  R.rect(194, 150, 316, 153, ST[2]); R.linea(194, 150, 316, 150, ST[4]);
  // el palacio: el revoque ocre con su textura, las impostas y la cornisa
  for (let y = 18; y < 106; y++) for (let x = 0; x < 190; x++) R.pset(x, y, tono(OC, 2.5 + (hh(x >> 2, y >> 1) - 0.5) * 0.8 + (hh(x >> 4, y >> 4, 3) - 0.5) * 0.5 - (y - 18) / 88 * 0.4, x, y));
  for (let x = 0; x < 190; x++) { R.pset(x, 18, TE[0]); R.pset(x, 19, (x % 3) ? TE[3] : TE[1]); R.pset(x, 20, TE[1]); R.pset(x, 21, ST[4]); R.pset(x, 22, ST[3]); R.pset(x, 23, (x & 1) ? ST[2] : ST[3]); R.pset(x, 24, ST[1]);
    for (const yy of [62, 102]) { R.pset(x, yy, ST[4]); R.pset(x, yy + 1, ST[2]); R.pset(x, yy + 2, OC[1]); } }
  for (let y = 25; y < 106; y++) { R.pset(186, y, H('#5a5a62')); R.pset(187, y, H('#8a8a94')); R.pset(188, y, H('#5a5a62')); }
  for (const x of [16, 52, 128, 164]) ventana(x, 32, 12, 22, true);
  for (const x of [18, 54, 130, 166]) ventana(x, 72, 10, 16, x % 3 === 0);
  // el balcón central con su puerta, la barandilla de hierro y las macetas
  R.rect(84, 28, 114, 58, ST[3]); R.rect(87, 31, 111, 58, H('#1e2a44')); R.linea(99, 31, 99, 58, ST[2]); R.rect(88, 32, 97, 36, H('#3a5a84')); R.rect(101, 32, 110, 36, H('#3a5a84'));
  R.poligono([[80, 28], [99, 18], [118, 28]], ST[3]); R.linea(80, 28, 118, 28, ST[1]);
  R.rect(76, 58, 122, 61, ST[3]); R.rect(76, 61, 122, 62, ST[1]);
  R.linea(78, 48, 120, 48, K); for (let x = 78; x <= 120; x += 3) R.linea(x, 48, x, 58, K); for (let x = 79; x < 120; x += 6) R.pset(x + 1, 52, K);
  for (const x of [80, 92, 106, 116]) { R.rect(x, 44, x + 4, 47, H('#a85a3a')); R.disco(x + 2, 42, 2, H('#3a7a3a')); R.pset(x + 1, 41, H('#e83a4a')); R.pset(x + 3, 42, H('#e83a4a')); R.pset(x + 2, 40, H('#ff7a8a')); }
  // la planta baja: almohadillado de piedra y el portón en arco abierto
  for (let y = 104; y < 154; y++) for (let x = 0; x < 190; x++) { const fila = Math.floor((y - 104) / 7), jx = (x + (fila & 1) * 12) % 24, jy = (y - 104) % 7;
    R.pset(x, y, jy === 0 || jx === 0 ? ST[0] : jy === 1 || jx === 1 ? ST[4] : tono(ST, 2.2 + (hh(x >> 3, fila) - 0.5) * 0.8 - jy * 0.05, x, y)); }
  R.disco(100, 124, 27, ST[1]); R.rect(73, 124, 127, 153, ST[1]); R.disco(100, 124, 24, K); R.rect(76, 124, 124, 153, K);
  for (let y = 100; y < 153; y++) for (let x = 77; x < 124; x++) if (Math.hypot(x - 100, y - 124) < 23 || y >= 124) R.pset(x, y, tono([H('#6a3a1a'), H('#a86a30'), H('#d89848'), H('#f0c070')], 3.2 - Math.abs(x - 100) / 14 - (153 - y) / 40, x, y));
  for (let y = 112; y < 140; y += 4) R.linea(92, y, 108, y, H('#8a5428'));
  R.poligono([[92, 153], [108, 153], [104, 132], [96, 132]], H('#a8283a')); R.linea(96, 132, 104, 132, H('#d8485a'));
  for (const [x0, x1] of [[70, 78], [122, 130]]) { R.rect(x0, 112, x1, 153, H('#4a2a16')); R.rect(x0 + 1, 114, x1 - 1, 131, H('#6a4024')); R.rect(x0 + 1, 134, x1 - 1, 151, H('#6a4024')); R.pset(x0 + 4, 133, H('#c89a3a')); }
  R.disco(100, 100, 3, ST[4]); R.pset(100, 99, ST[2]);
  // los faroles de pared y las rejas de las ventanas bajas
  for (const x of [62, 138]) { R.linea(x, 110, x + 4, 110, K); R.rect(x - 2, 104, x + 2, 112, K); R.rect(x - 1, 105, x + 1, 110, H('#f0d890')); R.pset(x, 103, K); }
  for (const x of [16, 152]) { R.rect(x, 116, x + 20, 134, K); R.rect(x + 1, 117, x + 19, 133, H('#1e2a44')); for (let i = x + 2; i < x + 20; i += 3) R.linea(i, 117, i, 133, H('#3a3a44')); R.linea(x + 1, 125, x + 19, 125, H('#3a3a44')); }
  // la acera y los adoquines (sampietrini) en abanico, con su junta
  for (let x = 0; x < 320; x++) { R.pset(x, 153, ST[4]); R.pset(x, 154, ST[3]); R.pset(x, 155, ST[3]); R.pset(x, 156, ST[1]); }
  for (let y = 157; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 157) / 4), off = (fila & 1) * 3, jx = (x + off) % 6, jy = (y - 157) % 4;
    R.pset(x, y, jx === 0 || jy === 0 ? CB[0] : tono(CB, 2.3 + (hh((x + off) / 6 | 0, fila) - 0.5) * 1.2 + (jy === 1 ? 0.5 : 0) + (y - 157) / 23 * 0.4, x, y)); }
  R.rect(140, 170, 156, 173, CB[0]); for (let x = 141; x < 156; x += 2) R.linea(x, 171, x, 172, CB[3]);
  // la bicicleta apoyada en el palacio
  for (const cx of [158, 176]) { R.disco(cx, 146, 6, K); R.disco(cx, 146, 5, ST[1]); R.disco(cx, 146, 4, K); R.pset(cx, 146, ST[3]); }
  R.linea(158, 146, 166, 138, H('#c83a3a')); R.linea(166, 138, 176, 146, H('#c83a3a')); R.linea(164, 146, 166, 138, H('#c83a3a')); R.linea(158, 146, 164, 146, H('#c83a3a')); R.linea(166, 138, 174, 138, H('#c83a3a')); R.linea(173, 136, 176, 136, K); R.rect(163, 136, 167, 137, K);
  // las mesas del café
  for (const x of [216, 296]) { R.disco(x, 146, 6, K); R.rect(x - 6, 145, x + 6, 147, H('#e8e4dc')); R.rect(x - 6, 147, x + 6, 147, H('#a8a49c')); R.linea(x, 148, x, 156, K); R.linea(x - 3, 156, x + 3, 156, K);
    for (const d of [-10, 10]) { R.linea(x + d, 142, x + d, 156, K); R.linea(x + d, 149, x + d + (d > 0 ? 4 : -4), 149, K); R.linea(x + d + (d > 0 ? 4 : -4), 149, x + d + (d > 0 ? 4 : -4), 156, K); } R.rect(x - 2, 142, x + 1, 144, H('#f6f6f6')); R.pset(x - 1, 141, H('#8a5428')); }
};
const p1 = (t) => {
  capa(CALLE, pintaCalle);
  // las nubes de tres tonos a tres velocidades (sin pasar por la esquina de Atom) y las palomas que vuelan
  for (let n = 0; n < 4; n++) { const v = [3, 5, 8, 4][n], cx = 190 + ((n * 37 + t * v) % 110), cy = [30, 40, 50, 22][n], w = [16, 12, 18, 10][n];
    for (let y = cy - 5; y <= cy + 4; y++) for (let x = Math.round(cx - w); x <= cx + w; x++) { if (x > 268 || x < 193 || y > 56 || (x >= 229 && x <= 255 && y >= 5)) continue; const d = ((x - cx) / w) ** 2 + ((y - cy) / 5) ** 2; if (d < 1 && (d < 0.6 || (x + y) & 1)) R.pset(x, y, y > cy + 1 ? H('#c4d0e4') : d < 0.3 ? H('#ffffff') : H('#e6eef8')); } }
  for (let i = 0; i < 3; i++) { const x = Math.round(270 - ((t * 14 + i * 30) % 90)), y = Math.round(40 + i * 4 + Math.sin(t * 3 + i) * 2), al = Math.sin(t * 14 + i) > 0; R.pset(x, y, H('#3a3a4a')); R.pset(x - 1, y - (al ? 1 : 0), H('#3a3a4a')); R.pset(x + 1, y - (al ? 1 : 0), H('#3a3a4a')); }
  // la ropa tendida que se mece y la bandera del balcón
  R.linea(204, 96, 300, 98, H('#5a5a62'));
  for (let i = 0; i < 6; i++) { const x = 210 + i * 15, sw = Math.round(Math.sin(t * 2.4 + i) * 1.5); R.rect(x + sw, 98, x + 6 + sw, 103 + (i % 2) * 2, [H('#f6f6f6'), H('#e8b0b8'), H('#9ac4ec'), H('#f0d890'), H('#f6f6f6'), H('#b8e0b0')][i]); R.pset(x + 1, 97, K); R.pset(x + 5, 97, K); }
  R.linea(100, 66, 116, 54, K);
  for (let i = 0; i < 18; i++) for (let j = 0; j < 12; j++) { const ox = Math.round(Math.sin(t * 4 - i * 0.5) * 1.5); R.pset(116 + i, 54 + j + ox, i < 6 ? H('#2a9a4a') : i < 12 ? H('#f6f6f6') : H('#d83a3a')); }
  // las palomas del suelo: picotean y echan a volar cuando pasa la Vespa
  const vespaX = Math.round(lerp(350, -60, tramo(t, 1.4, 3.6))), vuela = tramo(t, 2.3, 4.0);
  for (let i = 0; i < 3; i++) { const x = Math.round(150 + i * 12 - vuela * (40 + i * 20)), y = Math.round(170 - vuela * (90 + i * 10)), pico = vuela === 0 && Math.sin(t * 5 + i * 2) > 0.3;
    R.rect(x - 2, y - 2, x + 2, y, H('#7a7a8a')); R.pset(x + 2, y - 3 + (pico ? 2 : 0), H('#5a5a6a')); R.pset(x + 3, y - 3 + (pico ? 2 : 0), H('#d8a040')); R.pset(x - 1, y - 1, H('#a8a8b8')); R.pset(x, y - 2, H('#6a8a7a'));
    if (vuela > 0) { const al = Math.sin(t * 20 + i) > 0; R.pset(x - 3, y - 3 - (al ? 1 : 0), H('#9a9aaa')); R.pset(x + 1, y - 4 - (al ? 1 : 0), H('#9a9aaa')); } else { R.pset(x - 1, y + 1, H('#d8a040')); R.pset(x + 1, y + 1, H('#d8a040')); } }
  // los periodistas en la puerta
  const fl = t > prensa - 0.1 && t < italia;
  R.actor(EL.camarografo, 30, 168, t, { dir: 1 });
  R.actor(EL.periodista2025, 54, 170, t, { dir: 1, habla: t > prensa && Math.sin(t * 9) > 0 });
  const rp = R.actor(EL.periodista1, 134, 164, t, { dir: 1, sostiene: [150, 146] });
  if (fl) { R.rect(rp.mano[0] - 1, rp.mano[1] - 7, rp.mano[0] + 3, rp.mano[1], K); R.rect(rp.mano[0], rp.mano[1] - 6, rp.mano[0] + 2, rp.mano[1] - 1, H('#3a3a44')); const f = tramo(t, prensa, prensa + 0.25); if (f < 1) { R.disco(rp.mano[0] + 1, rp.mano[1] - 5, Math.round(2 + f * 6), H('#fff8d8')); R.disco(rp.mano[0] + 1, rp.mano[1] - 5, 2, H('#ffffff')); } }
  else { R.rect(rp.mano[0] - 1, rp.mano[1] - 4, rp.mano[0] + 4, rp.mano[1] + 2, K); R.rect(rp.mano[0], rp.mano[1] - 3, rp.mano[0] + 3, rp.mano[1] + 1, H('#f6f2e6')); }
  // la luz roja del cámara y su flash de antorcha
  if (t > prensa && t < prensa + 0.2) R.disco(50, 146, 6, H('#fff8d8'));
  // los tres llegan andando, se paran, saludan en «press conference» y echan a andar hacia la puerta
  const v = tramo(t, 0.9, 4.0), va = tramo(t, italia - 0.2, P2 + 0.2);
  for (const [i, d] of [[0, EL.malanga], [1, EL.biondi], [2, EL.mei]]) {
    const x = Math.round(lerp(330 + i * 24, 214 + i * 24, v) - va * 30), anda = (v > 0 && v < 1) || va > 0;
    const r = R.actor(d, x, 166, t, { dir: -1, anda, dedo: i === 0 && t > prensa && t < italia, sonrisa: t > prensa, habla: i === 2 && t > 4.1 && t < prensa && Math.sin(t * 8) > 0, sostiene: i === 1 ? true : undefined });
    if (i === 1) { const [mx, my] = r.mano; R.rect(mx - 2, my - 7, mx + 1, my + 3, K); R.rect(mx - 1, my - 6, mx, my + 2, H('#a8acb8')); R.pset(mx - 1, my - 6, H('#d8dce4')); }
  }
  // la Vespa que pasa por delante, con su conductor
  if (vespaX > -50 && vespaX < 340) {
    R.actor(EL.turista2, vespaX + 6, 172, t, { dir: -1, quieto: true });
    const x = vespaX, y = 178;
    R.poligono([[x - 1, y - 15], [x + 7, y - 15], [x + 12, y - 9], [x + 17, y - 9], [x + 21, y - 13], [x + 27, y - 12], [x + 29, y - 4], [x - 1, y - 4]], K);
    R.poligono([[x, y - 14], [x + 6, y - 14], [x + 11, y - 8], [x + 18, y - 8], [x + 21, y - 12], [x + 26, y - 11], [x + 28, y - 5], [x, y - 5]], H('#8ad8c4')); R.linea(x + 19, y - 10, x + 26, y - 10, H('#c8f4e8')); R.linea(x + 1, y - 6, x + 27, y - 6, H('#5aa898'));
    R.rect(x + 2, y - 26, x + 5, y - 13, K); R.rect(x + 3, y - 25, x + 4, y - 14, H('#8ad8c4')); R.linea(x, y - 26, x + 6, y - 26, K); R.pset(x + 1, y - 22, H('#fff4b0'));
    R.rect(x + 14, y - 13, x + 24, y - 11, H('#3a2a1a')); R.linea(x + 2, y - 9, x + 22, y - 10, H('#c8f0e8'));
    for (const cx of [x + 4, x + 22]) { R.disco(cx, y - 2, 3, K); R.disco(cx, y - 2, 1, H('#a8a8b8')); }
    for (let i = 0; i < 4; i++) { const u = ((t * 3 + i * 0.25) % 1); R.pset(Math.round(x + 28 + u * 12), Math.round(y - 4 - u * 3), u < 0.5 ? H('#c8c8d0') : H('#9a9aa8')); }
  }
};

// ── 2 · la sala de frente: Malanga habla ──
const p2 = (t) => {
  const o = { encuadre: 'prensa', habla: t < biondi ? 0 : 1 };
  T.italia(R, t, o);
  const d = [EL.malanga, EL.biondi, EL.mei];
  for (let i = 0; i < 3; i++) { const t0 = tres + i * 0.22, sube = t > t0 && t < t0 + 0.35 ? 2 : 0;
    const pie = i === 0 ? Math.round(7 * tramo(t, malanga - 0.4, malanga) * (1 - tramo(t, pisa + 0.2, pisa + 0.6))) : 0;
    R.actor(d[i], 113 + i * 40, 126, t, { dir: i === 0 ? 1 : -1, salto: sube + pie, habla: i === 0 && t > malanga - 0.3 && Math.sin(t * 9) > 0, dedo: i === 0 && t > quimico - 0.1 && t < pisa + 0.3, sonrisa: i === 0 ? t > pisa : true }); }
  // el cámara entra por el pasillo y se planta a grabar
  const u = tramo(t, P2 + 0.3, P2 + 2.6), xc = Math.round(lerp(196, 166, u));
  R.actor(EL.camarografo, xc, 168, t, { dir: -1, anda: u > 0 && u < 1 });
  R.actor(EL.periodista2025, 10, 160, t, { dir: 1, habla: t > pisa && Math.sin(t * 7) > 0 });
  const rp = R.actor(EL.periodista1, 132, 166, t, { dir: 1, sostiene: [146, 146] });
  R.rect(rp.mano[0] - 1, rp.mano[1] - 4, rp.mano[0] + 4, rp.mano[1] + 2, K); R.rect(rp.mano[0], rp.mano[1] - 3, rp.mano[0] + 3, rp.mano[1] + 1, H('#f6f2e6'));
  if (Math.sin(t * 12) > 0 && t > malanga) R.pset(rp.mano[0] + 1 + (Math.floor(t * 6) % 3), rp.mano[1] - 1, H('#3a3a44'));
  T.italiaDelante(R, t, o);
};

// ── 3 · la mesa de cerca: Biondi y su radar; luego Mei ──
const p3 = (t) => {
  const o = { encuadre: 'prensa', camara: 'mesa', habla: t < armando ? 1 : 2, portatil: 'azul' };
  T.italia(R, t, o);
  const teclea = t > radar - 0.4 && t < armando;
  R.actor(EL.malanga, 83, 145, t, { dir: 1, sonrisa: true });
  R.actor(EL.biondi, 143, 145, t, { dir: 1, habla: t < radar - 0.4 && Math.sin(t * 9) > 0, sostiene: teclea ? [168 + Math.round(Math.sin(t * 14)), 128] : undefined, sonrisa: t > radar });
  R.actor(EL.mei, 203, 145, t, { dir: -1, habla: t > mei - 0.1 && Math.sin(t * 8.5) > 0, dedo: t > antiguo - 0.6, sonrisa: t < armando });
  T.italiaDelante(R, t, o);
  // en «radar»: la onda que sale del portátil
  const w = tramo(t, radar, radar + 1.2); if (w > 0 && w < 1) for (let q = 0; q < 3; q++) { const rr = Math.round((w * 40 + q * 10) % 40) + 4; for (let a = -1.2; a <= 1.2; a += 0.05) { const px = Math.round(180 + Math.cos(a - Math.PI / 2) * rr), py = Math.round(120 + Math.sin(a - Math.PI / 2) * rr * 0.6); R.pset(px, py, rr > 30 ? H('#2a8ab6') : H('#c8fbff')); R.pset(px, py + 1, rr > 30 ? H('#113a62') : H('#5ae0f0')); } }
};

// ── 4 · la pantalla de cerca: el plano azul sale del revés y lo giran (gag 2) ──
const PANT = {}, SAT = {};
const GX0 = 26, GY0 = 20, GX1 = 266, GY1 = 110, CX = 146, CY = 65;
const PZ = Object.fromEntries(Object.entries({ f1: '#08142e', f2: '#0c1a3a', f3: '#102248', rj: '#132c56', rjM: '#1c3c70', hal: '#113a62', co: '#2a8ab6', ci: '#5ae0f0', br: '#c8fbff' }).map(([q, v]) => [q, H(v)]));
const pintaPared = () => {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(OC, 2.6 + (hh(x >> 2, y >> 1) - 0.5) * 0.5 - (y < 16 ? 0.2 : 0), x, y));
  // el marco de la pantalla de 2 × 2 paneles, con su sombra en la pared
  R.rect(GX0 - 4 + 4, GY0 - 4 + 5, GX1 + 4 + 4, GY1 + 4 + 5, OC[1]); R.rect(GX0 - 4, GY0 - 4, GX1 + 4, GY1 + 4, K); R.rect(GX0 - 3, GY0 - 3, GX1 + 3, GY1 + 3, H('#2a2a34')); R.linea(GX0 - 3, GY0 - 3, GX1 + 3, GY0 - 3, H('#4a4a56'));
  R.rect(CX - 8, GY1 + 4, CX + 8, GY1 + 8, H('#2a2a34'));
  // el zócalo de cuarterones verde salvia, como en la sala
  const SA = ['#5a6e5a', '#768a74', '#8ea48a', '#a8bca2'].map(H);
  for (let y = 120; y < 146; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 120 ? SA[3] : y === 121 ? SA[0] : tono(SA, 1.7 + (hh(x >> 2, y >> 2) - 0.5) * 0.4, x, y));
  for (let x0 = 4; x0 < 316; x0 += 39) { R.rect(x0, 125, x0 + 33, 125, SA[0]); R.rect(x0, 125, x0, 142, SA[0]); R.rect(x0, 142, x0 + 33, 142, SA[3]); R.rect(x0 + 33, 125, x0 + 33, 142, SA[3]); }
  // el altavoz de la derecha, la lámpara de pared de la izquierda y la bandera
  R.rect(282, 60, 306, 98, K); R.rect(283, 61, 305, 97, H('#2a2a34')); for (const cy of [72, 88]) { R.disco(294, cy, 7, K); R.disco(294, cy, 6, H('#3a3a44')); R.disco(294, cy, 2, H('#1a1a20')); R.pset(292, cy - 3, H('#5a5a66')); }
  R.rect(8, 52, 16, 54, H('#c89a3a')); R.poligono([[6, 46], [18, 46], [15, 52], [9, 52]], H('#f0d890')); R.linea(6, 46, 18, 46, H('#a87a18')); R.halo(12, 48, 10, [OC[3], OC[4]], 0.6);
  R.linea(276, 104, 276, 140, H('#c89a3a')); R.disco(276, 103, 1, H('#f0c040'));
};
const pintaSat = () => {   // Giza desde el satélite, en el tamaño del cristal
  const AR = ['#a8824e', '#c49a62', '#d8b278', '#e8c890'].map(H);
  for (let y = GY0; y <= GY1; y++) for (let x = GX0; x <= GX1; x++) R.pset(x, y, tono(AR, 1.8 + (hh(x >> 2, y >> 2) - 0.5) * 1.1 + Math.sin(x * 0.05 + y * 0.03) * 0.3, x, y));
  for (let y = GY0; y <= GY1; y++) for (let x = 236; x <= GX1; x++) R.pset(x, y, tono([H('#3a6a2a'), H('#4e8a3a'), H('#6aa24a')], 1 + (((x >> 3) + (y >> 3)) & 1) * 0.8, x, y));
  for (let y = GY0; y <= GY1; y++) { R.pset(244 + Math.round(Math.sin(y * 0.08) * 3), y, H('#3a6a9a')); R.pset(245 + Math.round(Math.sin(y * 0.08) * 3), y, H('#5a8aba')); }
  for (let i = 0; i < 9; i++) for (let j = 0; j < 4; j++) { const x = 206 + j * 7, y = 92 + i * 4; if (x < 234 && y < GY1 - 2) R.rect(x, y, x + 5, y + 2, i & 1 ? H('#9a9aa2') : H('#b8b4ac')); }
  R.linea(GX0, 104, 230, 54, H('#6a6a72')); R.linea(GX0, 105, 230, 55, H('#8a8a92'));
  const pir = (cx, cy, s, cap) => { R.poligono([[cx - s, cy - s], [cx + s, cy - s], [cx, cy]], H('#f0d8a0')); R.poligono([[cx + s, cy - s], [cx + s, cy + s], [cx, cy]], H('#c8a46a')); R.poligono([[cx - s, cy + s], [cx + s, cy + s], [cx, cy]], H('#8a6a3e'));
    R.poligono([[cx - s, cy - s], [cx - s, cy + s], [cx, cy]], H('#d8b880')); R.poligono([[cx + 3, cy + s + 1], [cx + s + 4, cy + s + 1], [cx + s + 4, cy - s + 4], [cx + s + 1, cy - s + 4], [cx + s + 1, cy + s - 2]], H('#6a4e2e'));
    if (cap) R.poligono([[cx - 4, cy - 4], [cx + 4, cy - 4], [cx + 4, cy + 4], [cx - 4, cy + 4]], H('#f6eccc')); R.pset(cx, cy, H('#fff4dc')); };
  pir(196, 44, 20, false); pir(146, 65, 19, true); pir(104, 86, 10, false);
  for (const [x, y] of [[224, 62], [230, 68], [220, 72]]) R.rect(x, y, x + 4, y + 4, H('#c8a46a'));
  R.linea(165, 65, 210, 92, H('#b8a07a')); R.rect(210, 90, 218, 96, H('#a88a5a')); R.rect(212, 86, 216, 90, H('#c8a46a'));
};
// el plano azul (lo que dicen) en coordenadas locales, girado ang radianes alrededor del centro de la pantalla
const lineasPlano = (ang, s) => {
  const L = [], ca = Math.cos(ang), sa = Math.sin(ang), P = (x, y) => [CX + (x * ca - y * sa) * s, CY + (x * sa + y * ca) * s];
  const l = (x0, y0, x1, y1, q = 'c') => { const [a0, b0] = P(x0, y0), [a1, b1] = P(x1, y1); L.push([a0, b0, a1, b1, q]); };
  l(-104, -20, 104, -20); for (let x = -100; x < 104; x += 6) l(x, -19, x - 3, -16, 'd');
  l(-26, -20, 0, -48); l(0, -48, 26, -20); for (let q = 1; q < 6; q++) { const y = -48 + q * 4.6, w = (y + 48) * 0.93; l(-w, y, w, y, 'd'); }
  for (let i = 0; i < 5; i++) { const x = -22 + i * 11; l(x - 3, -17, x + 3, -17); l(x + 3, -17, x + 3, -12); l(x + 3, -12, x - 3, -12); l(x - 3, -12, x - 3, -17); }
  for (let i = 0; i < 8; i++) { const x = -42 + i * 12; l(x - 1, -10, x - 1, 36); l(x + 1, -10, x + 1, 36); for (let y = -6; y < 34; y += 6) l(x - 4, y, x + 4, y + 3, 'd'); }
  for (const x0 of [-44, 26]) { l(x0, 40, x0 + 16, 40); l(x0 + 16, 40, x0 + 16, 52); l(x0 + 16, 52, x0, 52); l(x0, 52, x0, 40); l(x0, 40, x0 + 5, 36); l(x0 + 16, 40, x0 + 21, 36); l(x0 + 5, 36, x0 + 21, 36); l(x0 + 21, 36, x0 + 21, 48); }
  l(-80, -20, -80, 52, 'd'); l(-84, -20, -76, -20); l(-84, 52, -76, 52);
  return L;
};
const pluma = (L) => {
  for (const [x0, y0, x1, y1, q] of L) if (q !== 'd') for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.linea(Math.round(x0 + dx), Math.round(y0 + dy), Math.round(x1 + dx), Math.round(y1 + dy), PZ.hal);
  for (const [x0, y0, x1, y1, q] of L) R.linea(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), q === 'd' ? PZ.co : q === 'b' ? PZ.br : PZ.ci);
};
const p4 = (t) => {
  capa(PANT, pintaPared);
  const sale = t > dijeron + 0.15, giro = tramo(t, mirado + 0.25, piram + 0.05), gl = t > dijeron && t < dijeron + 0.3;
  // el cristal: la foto de satélite y, en «They said», el plano azul (del revés hasta que lo giran)
  if (!sale) { capa(SAT, () => { R.copiar(PANT.v); pintaSat(); }); for (let i = 0; i < 4; i++) { const x = Math.round(GX0 + ((t * 20 + i * 61) % 210)), y = Math.round(104 - (x - GX0) * 50 / 204); R.pset(x, y, i & 1 ? H('#f6f6f6') : H('#d83a3a')); }
    const bl = Math.sin(t * 6) > 0 ? H('#56f07a') : H('#2a9a4a'); for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { const x = 146 + sx * 24, y = 65 + sy * 24; R.linea(x, y, x - sx * 6, y, bl); R.linea(x, y, x, y - sy * 6, bl); } }
  else {
    for (let y = GY0; y <= GY1; y++) for (let x = GX0; x <= GX1; x++) { const g8 = (x - GX0) % 8 === 0 || (y - GY0) % 8 === 0, g32 = (x - GX0) % 32 === 0 || (y - GY0) % 32 === 0; R.pset(x, y, g32 ? PZ.rjM : g8 ? PZ.rj : tono([PZ.f1, PZ.f2, PZ.f3], 0.9 + (y - GY0) / 104 + (hh(x >> 2, y >> 2) - 0.5) * 0.4, x, y)); }
    R.recorte([GX0, GY0, GX1, GY1]);
    const ang = Math.PI * (1 - giro * giro * (3 - 2 * giro));
    pluma(lineasPlano(ang, 0.84));
    // el barrido de holograma que sube
    const yb = Math.round(GY1 - ((t * 26) % (GY1 - GY0))); for (let x = GX0; x <= GX1; x++) if (hh(x, yb) > 0.4) R.pset(x, yb, PZ.co);
    if (giro >= 1) { R.numero('650', 50, 88, { tam: 8, rampa: [PZ.co, PZ.ci, PZ.ci, PZ.br] });
      if (t > piram && t < kefren + 0.8 && Math.sin(t * 12) > 0) pluma([[CX - 22, CY - 17, CX, CY - 40, 'b'], [CX, CY - 40, CX + 22, CY - 17, 'b']]); }
    // en «from space»: el satélite que baja con sus ondas hacia la pirámide
    const s = tramo(t, espacio - 0.2, espacio + 0.4);
    if (s > 0) { const sy = Math.round(lerp(GY0 - 10, 24, s)); R.icono('satelite', 200, sy, PZ.br, PZ.hal, 2);
      for (let q = 0; q < 3; q++) { const u = ((t - espacio) * 0.9 + q / 3) % 1; if (u < 0) continue; const x = Math.round(lerp(204, 150, u)), y = Math.round(lerp(sy + 14, CY - 38, u)); R.linea(x - 5, y, x + 5, y + 2, PZ.br); } }
    R.recorte(null);
  }
  if (gl) for (let y = GY0; y <= GY1; y += 3) { const dx = Math.round(Math.sin(y * 1.7 + t * 50) * 6); for (let x = GX0; x <= GX1; x += 2) R.pset(Math.min(GX1, Math.max(GX0, x + dx)), y, hh(x, y + Math.floor(t * 30)) > 0.5 ? PZ.ci : PZ.f2); }
  // las juntas de los 2 × 2 paneles y un reflejo que pasa
  R.linea(CX, GY0, CX, GY1, H('#1a1a22')); R.linea(GX0, CY, GX1, CY, H('#1a1a22'));
  // los tres en la mesa, de cara a nosotros; se vuelven a mirar la pantalla
  const mira = t > dijeron + 0.2;
  R.actor(EL.malanga, 64, 150, t, { dir: mira ? 1 : -1, sorpresa: sale && giro < 1, sonrisa: giro >= 1, dedo: giro >= 1 && t < espacio + 0.6 });
  const tec = (t > dijeron - 0.2 && t < dijeron + 0.25) || (t > mirado + 0.05 && t < mirado + 0.35);
  R.actor(EL.biondi, 140, 150, t, { dir: 1, sostiene: tec ? [166, 143 + (Math.sin(t * 20) > 0 ? 1 : 0)] : undefined, sonrisa: giro >= 1 });
  R.actor(EL.mei, 214, 150, t, { dir: mira ? -1 : 1, habla: t < antiguo + 0.6 && Math.sin(t * 8) > 0, dedo: !sale && t > P4 + 0.3, sorpresa: sale && giro < 1 });
  if (sale && giro < 1) R.icono('?', 170, Math.round(116 + Math.sin(t * 5) * 2), H('#ffe890'), K, 2);
  // la mesa por delante: el mantel azul con sus pliegues, los micrófonos, las botellas, el portátil de Biondi y las cartelas sin letras
  for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 149 ? (y === 146 ? H('#4a5aa8') : H('#3a4a8a')) : tono([H('#1a2450'), H('#22306a'), H('#2a3a7a')], 1.6 + Math.sin(x * 0.2) * 0.5 - (y - 149) / 34, x, y));
  R.linea(0, 149, 319, 149, H('#141a3a'));
  R.disco(160, 165, 9, H('#c89a3a')); R.disco(160, 165, 8, H('#22306a')); R.poligono([[154, 168], [160, 159], [166, 168]], H('#f0c040')); for (let i = 0; i < 3; i++) R.linea(154, 170 + i, 166, 170 + i, i & 1 ? H('#5ae0f0') : H('#2a8ab6'));
  T.PIEZAS_GZ.portatil(R, 170, 147, { pantalla: 'azul' });
  for (const x of [52, 128, 204]) { R.linea(x, 146, x + 2, 134, K); R.linea(x + 2, 134, x + 6, 130, K); R.rect(x + 5, 128, x + 8, 131, H('#3a3a44')); R.pset(x + 7, 129, (x === 52 && giro >= 1) || (x === 204 && !sale) ? H('#ff3a3a') : H('#5a2a2a')); R.rect(x - 3, 145, x + 3, 146, H('#2a2a34')); }
  for (const x of [96, 116, 250]) { R.rect(x, 136, x + 3, 146, K); R.rect(x + 1, 137, x + 2, 145, H('#9ac4ec')); R.pset(x + 1, 137, H('#e8f4ff')); R.rect(x + 1, 135, x + 2, 136, H('#3a6ad8')); }
  for (const x of [82, 192, 236]) { R.poligono([[x, 146], [x + 6, 138], [x + 12, 146]], H('#f6f2e6')); R.linea(x + 6, 138, x + 12, 146, H('#c8c0b0')); }
};

const efectos = [[1.8, 'motor'], [prensa, 'flash'], [radar - 0.3, 'tecleo'], [dijeron, 'bip'], [mirado + 0.25, 'whoosh'], [piram + 0.1, 'brillo'], [espacio, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '2025', efectos, año: 2025 });
''')
