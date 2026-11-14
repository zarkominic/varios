# Borrador de escenas del ep30, grupo S5: gz-rendija, gz-pasillo, gz-osiris (con el movimiento hecho).
E = {}

# ayudas comunes de las tres escenas (ruido, trama ordenada, búferes de fondo fijo, cielo con nubes de tres tonos)
COMUN = r'''
const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const tono = (P, v, x, y) => P[Math.max(0, Math.min(P.length - 1, Math.floor(v + (BY[(y & 3) * 4 + (x & 3)] + 0.5) / 16)))];
const rampa = (...c) => c.map((s) => hex(s));
const K = hex('#16121e');
const capas = new Map();
// un fondo fijo se pinta una vez en su búfer y luego se copia (R.usar(prev), nunca R.usar() a secas)
const capa = (k, f) => { if (!capas.has(k)) { const b = R.nuevo(), prev = R.usar(b); f(); R.usar(prev); capas.set(k, b); } R.copiar(capas.get(k)); };
const CIELO = rampa('#3a74c4', '#4a84d0', '#5c96dc', '#70a8e6', '#88baee', '#a2ccf2', '#c0dcf6');
const NUBE = rampa('#9eb0cc', '#d6e2f0', '#ffffff');
// el cielo tramado dentro de dentro(x, y), de y0 (arriba) a hor (horizonte); nubes de tres tonos a tres velocidades y
// pájaros; ninguna nube sube por encima de yMin (la barra del año)
const cielo = (t, x0, y0, x1, y1, hor, dentro, o = {}) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (dentro(x, y)) R.pset(x, y, tono(CIELO, 6.4 * (y - y0) / Math.max(1, hor - y0), x, y));
  const nubes = o.nubes ?? [[0.1, 0.25, 22, 3], [0.55, 0.45, 30, 5], [0.85, 0.15, 16, 8]];
  for (const [fx, fy, w, v] of nubes) {
    const W = x1 - x0 + 2 * w + 20, cx = x0 - w - 10 + ((fx * W + t * v) % W), cy = Math.max(o.yMin ?? 0, y0 + fy * (hor - y0));
    for (const [dx, dy, r] of [[-w * 0.45, 2, w * 0.32], [0, -2, w * 0.42], [w * 0.42, 1, w * 0.3], [w * 0.15, 3, w * 0.36]]) {
      const ax = cx + dx, ay = cy + dy;
      for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { if (i * i + j * j > r * r) continue; const x = Math.round(ax + i), y = Math.round(ay + j * 0.55);
        if (x < x0 || x > x1 || y < y0 || y > y1 || !dentro(x, y)) continue;
        R.pset(x, y, y > cy + 3 ? NUBE[0] : (j < -r * 0.35 && i < r * 0.3) ? NUBE[2] : tono(NUBE, 1.6 - (y - cy + 4) * 0.08, x, y)); } }
  }
  for (let k = 0; k < (o.aves ?? 3); k++) { const x = Math.round(x0 + ((t * (9 + k * 3) + k * 61) % (x1 - x0 + 30)) - 15), y = Math.round(y0 + 6 + k * 7 + Math.sin(t * 1.3 + k) * 3), a = Math.sin(t * 10 + k * 2) > 0 ? 1 : 0;
    for (const [i, j] of [[-2, -a], [-1, 0], [0, 1], [1, 0], [2, -a]]) if (dentro(x + i, y + j) && x + i >= x0 && x + i <= x1) R.pset(x + i, y + j, hex('#2a3048')); }
};
// el año que dice la verdad en cada momento
const desde = (pares) => (t) => { let a = pares[0][1]; for (const [t0, v] of pares) if (t >= t0) a = v; return a; };
'''

E['gz-rendija'] = ('La rendija', '''// GZ-RENDIJA (frase 14), 2017 → 2023. Cuatro planos:
// 1. LOCAL la tienda de ScanPyramids al pie de Keops (2017): por la puerta se ve la pirámide; la científica francesa
//    entra con una carpeta, la deja junto a la mesa y se encoge de hombros ante el vacío del monitor («?»: nadie sabe qué es); a «muons» el
//    japonés señala la segunda mancha, pequeña, que se enciende cerca de la cara norte. Corta en «something».
// 2. D keops/norte: lluvia de muones sobre la cara norte; detrás del chevrón late algo pequeño; a «roof-shaped blocks»
//    una línea recorre el chevrón; a «2023» la barra cambia y el técnico cruza el andamio y señala la rendija. Corta en «they».
// 3. LOCAL el maletín del endoscopio sobre los tablones del andamio, contra los sillares: la tapa enseña un satélite con
//    su «X» (lo que el radar nunca ha hecho); la mano del técnico coge la cabecita a «slid» y el cable, al lado de un lápiz,
//    se ve más fino que él. Corta en «through».
// 4. LOCAL la rendija en corte: el cable entra por la junta a «gap», llega al hueco, lo rodea una nube de polvo antiguo
//    y la cámara «estornuda» (gag 5) y vuelve a entrar con la luz encendida; el técnico, fuera, da un respingo.''', COMUN + r'''
const w = (s) => en('rendija', (s - 0.5) / 16.982);   // un instante de la voz inglesa (s desde el inicio de la escena)
const P2 = w(4.26), P3 = w(10.33), P4 = w(15.27);
const nadie = w(0.6), paraQue = w(2.2), muones = w(3.56), pequeño = w(4.92), tejado = w(6.54), bloques = w(7.62), año23 = w(9.33);
const satelite = w(10.89), nunca = w(12.43), desliza = w(13.53), fino = w(14.25), lapiz = w(14.93), rendija = w(15.73);

// ── 1 · LOCAL la tienda de campaña de ScanPyramids, con la pirámide por la puerta ──
const LONA = rampa('#4a3c28', '#62503a', '#7a6648', '#94805c', '#ae9a72', '#c6b28a', '#dccaa2');
const CAL = rampa('#6e5434', '#8a6c44', '#a8875a', '#c4a270', '#d8b986', '#e8cc98', '#f4dcae');
const ARE = rampa('#9a7a4a', '#b8945e', '#cca872', '#dcbc86', '#ead09c');
const puertaT = (x, y) => y >= 30 && y <= 128 && x >= 54 - (y - 30) * 0.16 && x <= 168 + (y - 30) * 0.12;
const tiendaFija = () => {
  // la lona: paños verticales con costuras, pliegues que bajan del techo y luz que entra por la puerta
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const paño = Math.floor((x + 6) / 52), fx = ((x + 6) % 52) / 52;
    let v = 3.1 + Math.sin(fx * Math.PI) * 0.7 - y * 0.006 + (h(x >> 2, y >> 3, 11) - 0.5) * 0.5;
    v += Math.sin(x * 0.21 + y * 0.03) * 0.25;                        // pliegues
    v += Math.max(0, 1 - Math.hypot(x - 110, y - 90) / 150) * 1.1;     // la luz de fuera
    if (y < 26) v -= 0.6 + (26 - y) * 0.03;                            // el techo, más oscuro
    R.pset(x, y, tono(LONA, v, x, y));
    if (x > 272 && y < 48) continue;                                   // la esquina de Atom: lona lisa y tranquila
    if (fx < 0.02 || ((x + 6) % 52) === 51) R.pset(x, y, LONA[1]);      // costura
    if (((x + 6) % 52) === 2 && (y % 5) < 2) R.pset(x, y, LONA[5]);     // pespunte
  }
  // la cumbrera del techo y los vientos
  R.rect(0, 22, 272, 24, LONA[1]); R.linea(0, 25, 272, 25, LONA[4]);
  for (let x = 4; x < 268; x += 52) { R.rect(x, 18, x + 3, 26, LONA[0]); R.pset(x + 1, 19, LONA[3]); }
  // el suelo: la lona del suelo con arena por encima, huellas y una alfombra
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 2.2 + (y - 132) * 0.02 + (h(x >> 1, y, 12) - 0.5) * 0.9 + Math.max(0, 1 - Math.hypot(x - 110, y - 132) / 90) * 1.2; R.pset(x, y, tono(ARE, v, x, y)); }
  for (let k = 0; k < 14; k++) { const x = 60 + k * 9 + Math.round(h(k, 1, 13) * 4), y = 140 + (k % 2) * 4 + k; R.rect(x, y, x + 2, y + 1, ARE[0]); R.pset(x + 1, y + 2, ARE[0]); }
  for (let y = 150; y < 176; y++) for (let x = 6; x < 108; x++) { const borde = y === 150 || y === 175 || x === 6 || x === 107; R.pset(x, y, borde ? hex('#5a2a24') : ((x + y) % 8 < 4) ? hex('#8a3a2e') : hex('#a84a36')); if (!borde && (x % 12 === 0) && y % 3 === 0) R.pset(x, y, hex('#e0b070')); }
  // el marco de la puerta: los palos y las solapas recogidas con su cuerda
  for (let y = 26; y < 134; y++) { const xl = Math.round(54 - (y - 30) * 0.16), xr = Math.round(168 + (y - 30) * 0.12);
    R.rect(xl - 3, y, xl - 1, y, LONA[0]); R.rect(xr + 1, y, xr + 3, y, LONA[0]); R.pset(xl - 2, y, LONA[2]); R.pset(xr + 2, y, LONA[2]); }
  // la mesa plegable con su mantel de faena, a la derecha
  R.rect(184, 120, 316, 125, K); R.rect(185, 121, 315, 123, hex('#b8bcc4')); R.linea(185, 121, 315, 121, hex('#e0e4ea')); R.rect(185, 124, 315, 124, hex('#6c7280'));
  for (const x of [190, 310]) { R.linea(x, 126, x + 10, 170, K); R.linea(x + 1, 126, x + 11, 170, hex('#8a909c')); R.linea(x + 10, 126, x, 170, K); }
  R.linea(184, 172, 320, 172, hex('#7a6a4a'));
  // la nevera azul debajo de la mesa y las cajas de placas con su raya
  R.rect(222, 146, 254, 168, K); R.rect(223, 147, 253, 167, hex('#3a6aa8')); R.rect(223, 147, 253, 151, hex('#e8ecf2')); R.rect(236, 143, 242, 146, K);
  R.rect(262, 150, 300, 168, K); R.rect(263, 151, 299, 167, hex('#5a6a54')); R.rect(263, 151, 299, 152, hex('#7a8a72')); R.rect(276, 157, 286, 161, hex('#e8d070'));
  // la pizarra de corcho con fotos de la pirámide clavadas y el plano, en la lona de la derecha
  R.rect(196, 40, 262, 84, K); R.rect(197, 41, 261, 83, hex('#b07a46')); for (let y = 42; y < 83; y++) for (let x = 198; x < 261; x++) if (h(x, y, 14) < 0.18) R.pset(x, y, hex('#8a5a30'));
  for (const [x, y, c] of [[202, 46, '#f2eee2'], [222, 50, '#e8f0f8'], [242, 44, '#f2eee2'], [204, 64, '#f6e8c8'], [236, 64, '#f2eee2']]) {
    R.rect(x, y, x + 15, y + 12, K); R.rect(x + 1, y + 1, x + 14, y + 11, hex(c));
    R.poligono([[x + 3, y + 10], [x + 8, y + 3], [x + 13, y + 10]], hex('#c8a060')); R.linea(x + 8, y + 3, x + 13, y + 10, hex('#8a6a3a'));
    R.disco(x + 7, y, 1, hex('#d83a3a')); }
  R.linea(210, 58, 230, 56, hex('#d83a3a')); R.linea(230, 56, 244, 70, hex('#d83a3a'));
  // la bombilla del techo: el cable (la bombilla, que se mece, va en cada fotograma)
  R.linea(130, 25, 130, 30, K);
  // el detector de gas grande (caja con su panel) en la esquina de abajo a la izquierda y la placa de pie
  T.PIEZAS_GZ.placaEmulsion?.(R, 148, 160, { luz: 0.3 });
};
const p1 = (t) => {
  capa('tienda', tiendaFija);
  // fuera, por la puerta: el cielo, Keops al sol con sus hiladas, la arena, turistas y un camello que pasan
  cielo(t, 40, 30, 190, 128, 96, puertaT, { aves: 2 });
  const ax = 118, ay = 46, base = 120;
  for (let y = ay; y <= base; y++) { const hw = (y - ay) * 0.86; for (let x = Math.round(ax - hw); x <= ax + hw; x++) { if (!puertaT(x, y)) continue;
    const hil = Math.floor((y - ay) / 3), junta = (y - ay) % 3 === 2 || ((x + hil * 7 + Math.floor(h(hil, 0, 15) * 9)) % 11 === 0);
    const lado = x > ax + hw * 0.55 ? -1.2 : 0;
    R.pset(x, y, junta ? CAL[1 + (lado < 0 ? 0 : 1)] : tono(CAL, 4.2 + lado + (h(x >> 1, hil, 16) - 0.5) * 1.2 - (y - ay) * 0.006, x, y)); } }
  for (let y = 108; y <= 128; y++) for (let x = 40; x <= 190; x++) if (puertaT(x, y) && y > 118 - (x - 40) * 0.02) R.pset(x, y, tono(ARE, 3 + (y - 108) * 0.06 + (h(x >> 1, y, 17) - 0.5), x, y));
  for (let k = 0; k < 3; k++) { const x = Math.round(30 + ((t * (6 + k * 2) + k * 50) % 170)), y = 124 - k; if (!puertaT(x, y)) continue;
    R.rect(x, y - 6, x + 1, y - 1, [hex('#d84a3a'), hex('#3a6ac8'), hex('#f2eee2')][k]); R.pset(x, y - 7, hex('#e8b088')); R.pset(x + (Math.sin(t * 8 + k) > 0 ? 1 : 0), y, K); }
  { const x = Math.round(200 - ((t * 5) % 180)), y = 122; if (puertaT(x, y)) { R.rect(x, y - 7, x + 8, y - 4, hex('#a07440')); R.rect(x + 8, y - 10, x + 9, y - 6, hex('#a07440')); R.pset(x + 10, y - 10, hex('#a07440')); R.rect(x + 3, y - 9, x + 5, y - 8, hex('#a07440'));
    for (const i of [1, 6]) R.linea(x + i, y - 3, x + i + (Math.sin(t * 6 + i) > 0 ? 1 : 0), y, hex('#7a5430')); } }
  // las solapas de la puerta, que se mueven con el viento
  for (const [xs, d] of [[50, -1], [172, 1]]) for (let j = 0; j < 40; j++) { const y = 32 + j, a = Math.sin(t * 2.4 + j * 0.15 + d) * (j / 40) * 3;
    R.linea(Math.round(xs + d * (2 + j * 0.25 + a)), y, Math.round(xs + d * (10 + j * 0.45 + a)), y, j % 7 === 0 ? LONA[2] : LONA[4]); R.pset(Math.round(xs + d * (10 + j * 0.45 + a)), y, LONA[1]); }
  for (const [xs, d] of [[50, -1], [172, 1]]) { R.linea(xs + d * 4, 70, xs + d * 16, 74, hex('#c8b070')); R.pset(xs + d * 16, 74, K); }
  // la bombilla que se mece
  { const a = Math.sin(t * 1.7) * 3, bx = Math.round(130 + a), by = 36; R.linea(130, 30, bx, by - 2, K); R.disco(bx, by, 2, hex('#fff2b0')); R.pset(bx - 1, by - 1, hex('#ffffff')); R.rect(bx - 1, by - 4, bx + 1, by - 3, hex('#5a5a66')); }
  // los detectores de muones en el suelo con sus lucecitas y los cables naranja que van a la mesa
  for (let x = 92; x < 200; x++) { const y = Math.round(171 + Math.sin(x * 0.06) * 2); R.pset(x, y, hex('#e07a2a')); R.pset(x, y + 1, hex('#9a4a1a')); }
  // el monitor grande en la mesa: la placa de muones (grano ámbar), la pirámide oscura y el gran vacío claro; a
  // «muons» se enciende una segunda mancha pequeña cerca de la cara norte, con su anillo de puntos
  const mx0 = 200, my0 = 82, mx1 = 262, my1 = 116;
  R.rect(mx0 - 3, my0 - 3, mx1 + 3, my1 + 3, K); R.rect(mx0 - 2, my0 - 2, mx1 + 2, my1 + 2, hex('#2a2a34')); R.rect(226, my1 + 4, 236, 119, hex('#3a3a46'));
  const fr = Math.floor(t * 10), seg = tramo(t, muones, muones + 0.5);
  for (let y = my0; y <= my1; y++) for (let x = mx0; x <= mx1; x++) {
    const dentroP = y > my0 + 4 && Math.abs(x - 231) < (y - my0 - 4) * 1.0;
    let v = 2.6 + (h(x, y, 20 + (fr & 3)) - 0.5) * 1.6 - (dentroP ? 1.5 : 0);
    if (Math.hypot((x - 226) / 9, (y - 98) / 2.6) < 1) v += 2.2 + Math.sin(t * 4) * 0.3;   // el gran vacío
    if (seg > 0 && Math.hypot((x - 244) / 3, (y - 106) / 1.6) < 1) v += 2.6 * seg * (0.75 + 0.25 * Math.sin(t * 8));   // lo nuevo, pequeño
    R.pset(x, y, tono(rampa('#2a1806', '#5a3610', '#8a5a1a', '#c08a2a', '#f0c050', '#fff0b0'), v, x, y)); }
  if (seg > 0) for (let a = 0; a < 20; a++) { if ((a + Math.floor(t * 6)) % 3 === 0) continue; const an = a / 20 * Math.PI * 2; R.pset(Math.round(244 + Math.cos(an) * 7), Math.round(106 + Math.sin(an) * 4), hex('#ffffff')); }
  { const y = my0 + Math.floor((t * 22) % (my1 - my0)); R.linea(mx0, y, mx1, y, hex('#ffe08a')); }
  // el portátil, la taza que humea y los papeles
  T.PIEZAS_GZ.portatil(R, 290, 120, { pantalla: 'azul' });
  R.rect(270, 113, 275, 119, K); R.rect(271, 114, 274, 118, hex('#e8e8ee')); for (let k = 0; k < 3; k++) { const y = 110 - ((t * 6 + k * 3) % 9); R.pset(272 + Math.round(Math.sin(t * 3 + k)), Math.round(y), hex('#f2f2f6')); }
  R.rect(188, 116, 198, 119, hex('#f2eee2')); R.linea(189, 117, 196, 117, hex('#9aa0aa'));
  // la científica francesa entra por la puerta con una placa de película y la deja junto a la mesa; ante el vacío
  // se encoge de hombros («?»): nadie sabe qué es. El japonés, en el monitor, señala la mancha nueva a «muons».
  const u = tramo(t, 0.1, nadie + 1.2), fx = Math.round(lerp(58, 150, u));
  if (u >= 1) T.PIEZAS_GZ.carpeta(R, 176, 162, {});   // la deja apoyada junto a la pata de la mesa
  const fra = R.actor(EL.cientificaFrancesa, fx, 160, t, { dir: 1, anda: u > 0 && u < 1, sostiene: u < 1 ? [fx + 19, 146] : undefined, brazos: t > paraQue - 0.2 && t < paraQue + 1.0, sorpresa: t > muones + 0.2 });
  if (u < 1 && fra.mano) T.PIEZAS_GZ.carpeta(R, fra.mano[0] + 1, fra.mano[1] + 5, {});
  if (t > paraQue - 0.1 && t < muones + 0.3) R.bocadillo(fx + 8, 128, { icono: '?' });
  // en el monitor, sobre el gran vacío, un «?» grande que late mientras la voz dice que nadie sabe qué es
  if (t > nadie && t < muones + 0.2 && Math.sin(t * 6) > -0.6) R.icono('?', 210, 85, hex('#ffffff'), K, 2);
  const habla = t < nadie + 1.4 && Math.sin(t * 9) > 0;
  R.actor(EL.cientificoJapones, 178, 156, t, { dir: 1, habla, dedo: t > muones - 0.05, sorpresa: t > muones + 0.15 && t < muones + 0.9 });
  // los detectores de muones en el suelo, más cerca de la cámara que ella: van después de los personajes
  T.PIEZAS_GZ.detectorMuones(R, 40, 168, { t }); T.PIEZAS_GZ.detectorMuones(R, 78, 174, { t: t + 1.3 });
};

// ── 2 · D keops/norte: los muones y el chevrón; en 2023, el técnico va a la rendija ──
const NOR = { encuadre: 'norte' };
const p2 = (t) => {
  const g = T.keops(R, t, NOR);
  // la lluvia de muones: rayitas ámbar que caen atravesando la cara, más densas sobre el chevrón
  const lu = tramo(t, P2, P2 + 0.4) * (1 - tramo(t, año23 - 0.6, año23 + 0.2));
  if (lu > 0) for (let k = 0; k < 26; k++) { const f = (t * 0.9 + h(k, 1, 30)) % 1, x0 = 90 + h(k, 2, 30) * 130, y = Math.round(18 + f * 150), x = Math.round(x0 + f * 18);
    if (y < 18 || (x > 274 && y < 46)) continue; if (h(k, 3, 30) > lu) continue; R.linea(x, y, x + 2, y + 5, hex('#ffd060')); R.pset(x + 2, y + 6, hex('#fff2b0')); }
  // detrás del chevrón late algo pequeño (lo que vieron los muones): una mancha ámbar tramada con su anillo
  const al = tramo(t, pequeño - 0.1, pequeño + 0.5) * (1 - 0.6 * tramo(t, año23, año23 + 0.6));
  if (al > 0) for (let y = 60; y <= 92; y++) for (let x = 126; x <= 174; x++) { const d = Math.hypot((x - 150) / 18, (y - 78) / 9); if (d > 1) continue;
    if (h(x, y, 31) < al * (1 - d * 0.7) * (0.75 + 0.25 * Math.sin(t * 5))) R.pset(x, y, d < 0.5 ? hex('#fff0b0') : hex('#ffc040')); }
  // a «roof-shaped blocks», una línea de luz recorre el chevrón: del pie de la izquierda a la cumbre y al otro pie
  const tr = tramo(t, tejado, bloques + 0.2);
  if (tr > 0 && t < año23 + 0.3) { const pts = [[86, 96], [150, 24], [214, 96]], n = 120;
    for (let i = 0; i <= n * tr; i++) { const s = i / n * 2, a = pts[Math.floor(Math.min(1.999, s))], b = pts[Math.floor(Math.min(1.999, s)) + 1], f = s - Math.floor(Math.min(1.999, s));
      const x = Math.round(a[0] + (b[0] - a[0]) * f), y = Math.round(a[1] + (b[1] - a[1]) * f); R.pset(x, y, hex('#fff6d0')); R.pset(x, y + 1, hex('#ffc040')); }
    if (tr >= 1 && Math.floor(t * 6) % 2 === 0) R.disco(150, 25, 2, hex('#ffffff')); }
  // la científica, en la plataforma, mira la pantallita del maletín y señala el chevrón a «blocks»
  R.actor(EL.cientificaFrancesa, 40, 104, t, { dir: 1, dedo: t > tejado && t < año23 - 0.4, habla: t > tejado && t < bloques && Math.sin(t * 9) > 0 });
  // a «2023» el técnico egipcio cruza el andamio con el carrete y señala la rendija
  const u = tramo(t, bloques + 0.2, año23 + 0.5), tx = Math.round(lerp(-14, 82, u));
  R.actor(EL.tecnicoEgipcio, tx, 104, t, { dir: 1, anda: u > 0 && u < 1, dedo: u >= 1 });
  // un vigilante abajo, que pasea delante del grupo electrógeno y mira hacia arriba
  const v = tramo(t, P2 + 0.3, P3 - 0.4), gx = Math.round(lerp(150, 232, v));
  R.actor(EL.turista1, gx, 172, t, { dir: v < 1 ? 1 : -1, anda: v > 0 && v < 1, dedo: v >= 1 });
  T.keopsDelante(R, t, NOR);
  // la barandilla les pasa por el cuerpo, no por la cara: la cabeza se vuelve a pintar por encima de la barra de arriba
  R.recorte([30, 70, 60, 93]); R.actor(EL.cientificaFrancesa, 40, 104, t, { dir: 1, dedo: t > tejado && t < año23 - 0.4, habla: t > tejado && t < bloques && Math.sin(t * 9) > 0 });
  R.recorte([tx - 4, 70, tx + 22, 93]); R.actor(EL.tecnicoEgipcio, tx, 104, t, { dir: 1, anda: u > 0 && u < 1, dedo: u >= 1 }); R.recorte(null);
};

// ── 3 · LOCAL el maletín del endoscopio sobre los tablones del andamio, delante de los sillares ──
const SIL = rampa('#6a5236', '#86683f', '#a2814f', '#b99662', '#cdab76', '#dfc08a', '#eed3a0');
const MAD = rampa('#5a3a1e', '#74502a', '#8e6636', '#a87c44', '#c09456');
const maletinFijo = () => {
  // los sillares de cerca: tres hiladas de bloques enormes, erosionados, con sal, desconchones y la sombra de cada canto
  const hil = [[0, 44], [44, 92], [92, 132]];
  for (let k = 0; k < 3; k++) { const [y0, y1] = hil[k], off = [0, 70, 30][k];
    for (let y = y0; y < y1; y++) for (let x = 0; x < 320; x++) {
      const bx = Math.floor((x + off) / 104), lx = (x + off) % 104, ly = y - y0;
      let v = 3.6 + (h(x >> 2, y >> 2, 40 + bx) - 0.5) * 1.1 + (h(x, y, 41) - 0.5) * 0.6 - ly * 0.012;
      if (lx < 3) v -= 2.2 - lx * 0.5; if (ly < 2) v += 1.4; if (y1 - y < 4) v -= 1.6 - (y1 - y) * 0.3;
      if (h(x >> 3, y >> 3, 42 + k) < 0.07) v -= 1.0;   // desconchón
      if (k === 0 && x > 270) v = 3.4 + (h(x >> 3, y >> 3, 49) - 0.5) * 0.3;   // la esquina de Atom: piedra tranquila
      R.pset(x, y, tono(SIL, v, x, y));
      if (h(x, y, 43) < 0.012 && !(k === 0 && x > 270)) R.pset(x, y, hex('#f6f2ea'));   // la sal
    } }
  // la rendija: la junta oscura entre dos bloques de la hilada de en medio, arriba a la derecha
  for (let x = 214; x < 270; x++) { const y = 92 + Math.round(Math.sin(x * 0.3) * 0.6); R.pset(x, y - 1, SIL[1]); R.pset(x, y, K); R.pset(x, y + 1, K); R.pset(x, y + 2, SIL[6]); }
  // los tubos del andamio con sus abrazaderas
  for (const x of [8, 271]) { R.rect(x, 0, x + 5, 140, K); R.rect(x + 1, 0, x + 4, 140, hex('#8a929e')); R.linea(x + 1, 0, x + 1, 140, hex('#c8d0dc')); }
  R.rect(0, 112, 319, 117, K); R.rect(0, 113, 319, 116, hex('#8a929e')); R.linea(0, 113, 319, 113, hex('#c8d0dc'));
  for (const x of [4, 265]) { R.rect(x, 110, x + 12, 119, K); R.rect(x + 1, 111, x + 12, 118, hex('#5a626e')); R.disco(x + 6, 114, 2, hex('#c8d0dc')); }
  // los tablones de la plataforma, en perspectiva, con vetas, nudos, clavos y polvo
  for (let y = 120; y < 180; y++) { const p = (y - 120) / 60, ancho = 10 + p * 10;
    for (let x = 0; x < 320; x++) { const tab = Math.floor((y - 120) / (6 + p * 6)), lt = (y - 120) % Math.round(6 + p * 6);
      let v = 2.4 + Math.sin(x * 0.09 + tab * 3 + Math.sin(x * 0.02) * 2) * 0.5 + (h(x >> 1, tab, 44) - 0.5) * 0.7 + p * 0.6;
      if (lt === 0) v = 0.2; R.pset(x, y, tono(MAD, v, x, y));
      if (h(x >> 2, y >> 2, 45) < 0.03) R.pset(x, y, hex('#d8c4a0')); } }
  for (let k = 0; k < 9; k++) R.pset(20 + k * 36, 124 + (k % 3) * 9, hex('#c8d0dc'));
  // el maletín abierto: la tapa de pie con la pantalla, la espuma gris con los huecos y el cable enrollado
  R.rect(96, 66, 196, 124, K); R.rect(98, 68, 194, 122, hex('#2a2e36')); R.rect(98, 68, 194, 69, hex('#4a505c'));
  R.rect(92, 124, 200, 160, K); R.rect(94, 126, 198, 158, hex('#3a3e48')); R.rect(94, 126, 198, 127, hex('#5a606c'));
  for (let y = 129; y < 156; y++) for (let x = 97; x < 196; x++) R.pset(x, y, (x + y) % 3 === 0 ? hex('#26282e') : hex('#32353c'));
  for (const [x, y] of [[92, 130], [92, 152], [196, 130], [196, 152]]) R.rect(x, y, x + 4, y + 3, hex('#8a929e'));
  // los guantes, la botella de agua y el walkie
  R.rect(212, 146, 230, 154, K); R.rect(213, 147, 229, 153, hex('#e8c040')); for (const x of [215, 219, 223]) R.linea(x, 147, x, 150, hex('#b89020'));
  R.rect(40, 118, 49, 150, K); R.rect(41, 120, 48, 149, hex('#9ad0f0')); R.rect(42, 116, 47, 119, hex('#3a7ac8')); R.linea(42, 124, 42, 146, hex('#e0f4ff'));
  R.rect(64, 132, 76, 154, K); R.rect(65, 133, 75, 153, hex('#2a2a32')); R.rect(67, 136, 73, 142, hex('#4a8a6a')); R.rect(72, 124, 73, 132, K);
};
const p3 = (t) => {
  capa('maletin', maletinFijo);
  // la pantalla de la tapa: un satélite que manda su radar al suelo y rebota (y una «X»); luego, la imagen de la cámara
  const sx0 = 102, sy0 = 72, sx1 = 190, sy1 = 118, ve = t < desliza;
  for (let y = sy0; y <= sy1; y++) for (let x = sx0; x <= sx1; x++) R.pset(x, y, ve ? ((y - sy0) > 34 ? (h(x >> 1, y, 50) < 0.5 ? hex('#7a5a30') : hex('#8a6a3a')) : tono(rampa('#0c1a3a', '#1a3462', '#24467a'), 1 + (y - sy0) * 0.03, x, y)) : tono(rampa('#1a1208', '#3a2810', '#6a4a20', '#9a7034'), 1.2 + Math.max(0, 1 - Math.hypot(x - 146, y - 95) / 30) * 2.4 + (h(x, y, 51 + Math.floor(t * 12) % 4) - 0.5), x, y));
  if (ve) {
    const sx = Math.round(lerp(110, 170, tramo(t, P3, nunca))); R.icono('satelite', sx - 4, 74, hex('#c8fbff'), hex('#0c1a3a'), 2);
    for (let k = 0; k < 3; k++) { const f = ((t * 1.4 + k / 3) % 1), y = Math.round(90 + f * 16); R.recorte([sx0, sy0, sx1, sy1]); R.linea(sx - 2 - f * 8, y, sx + 8 + f * 8, y, hex('#5ae0f0')); R.recorte(null); }
    if (t > nunca) { const c = hex('#ff4a4a'); for (let i = -9; i <= 9; i++) { R.rect(146 + i, 95 + i, 147 + i, 96 + i, c); R.rect(146 + i, 95 - i, 147 + i, 96 - i, c); } }
  } else { for (let x = 140; x <= 152; x++) R.pset(x, 95, K); for (let k = 0; k < 6; k++) R.pset(sx0 + 6 + k * 3, sy1 - 4, Math.floor(t * 2) % 6 === k ? hex('#ff4a4a') : hex('#5a1a1a')); }
  R.rect(184, 74, 188, 78, Math.floor(t * 1.6) % 2 ? hex('#ff3a3a') : hex('#5a1a1a'));
  // el cable enrollado en la espuma: espiras que se van soltando cuando la mano tira
  const tira = tramo(t, desliza, desliza + 1.4);
  for (let r = 6; r <= 24 - tira * 10; r += 3) for (let a = 0; a < 90; a++) { const an = a / 90 * Math.PI * 2, x = Math.round(146 + Math.cos(an) * r * 1.6), y = Math.round(142 + Math.sin(an) * r * 0.5); R.pset(x, y, K); if (a % 9 === 0) R.pset(x, y - 1, hex('#5a606c')); }
  // la cabecita de la cámara: en su hueco; a «slid» la mano del técnico la coge y la sube hacia la rendija
  const tira2 = tramo(t, desliza + 0.1, fino + 0.2), hx = Math.round(lerp(184, 284, tira2)), hy = Math.round(lerp(140, 156, tira2));
  // el cable de la cabecita al rollo
  // el lápiz, en los tablones a la derecha del maletín: a esta escala, enorme
  T.PIEZAS_GZ.lapiz(R, 262, 178, { s: 4 });
  // el cable que sale del rollo hasta la cabecita: cuando la mano tira, queda recto y paralelo al lápiz
  for (let i = 0; i <= 40; i++) { const u2 = i / 40, x = Math.round(lerp(176, hx, u2)), y = Math.round(lerp(142, hy, u2) + Math.sin(u2 * Math.PI) * 6 * (1 - tira2)); R.pset(x, y, K); R.pset(x, y + 1, hex('#5a606c')); }
  R.rect(hx - 1, hy - 3, hx + 9, hy + 2, K); R.rect(hx, hy - 2, hx + 8, hy + 1, hex('#a8b0bc')); R.linea(hx, hy - 2, hx + 8, hy - 2, hex('#e0e6ee')); R.rect(hx + 9, hy - 2, hx + 10, hy + 1, hex('#fff2b0'));
  if (Math.sin(t * 9) > 0) R.pset(hx + 11, hy - 1, hex('#ffffff'));
  // a «thinner than a pencil», las cotas: el grosor del lápiz (12 px) contra el del cable (2 px)
  const cmp = tramo(t, fino, fino + 0.4);
  if (cmp > 0) { const c = hex('#ffffff'), x = 222, xa = 234;
    R.linea(x, 162, x, 177, c); R.linea(x - 3, 162, x + 3, 162, c); R.linea(x - 3, 177, x + 3, 177, c);
    R.linea(xa, hy - 6, xa, hy - 3, c); R.linea(xa - 2, hy - 3, xa + 2, hy - 3, c); R.linea(xa, hy + 3, xa, hy + 6, c); R.linea(xa - 2, hy + 3, xa + 2, hy + 3, c);
    if (t > lapiz && Math.floor(t * 4) % 2) R.icono('!', 210, 150, hex('#ffe08a'), K, 2); }
  // la mano del técnico (la manga del chaleco naranja), que entra por la derecha, coge la cabecita y la sube
  const llega = tramo(t, desliza - 0.7, desliza);
  if (llega > 0) { const mx = Math.round(lerp(hx + 40, hx + 9, llega)), my = Math.round(lerp(196, hy + 1, llega));
    T.brazo(R, mx + 40, 200, mx, my, '#f07a2a', -1, { codo: [mx + 22, Math.round((my + 200) / 2 + 4)] }); }
  // la paloma que se posa en la hilada de abajo y cabecea
  { const u = tramo(t, P3 + 0.4, P3 + 1.6), x = Math.round(lerp(-10, 58, u)), y = Math.round(lerp(60, 89, u) - Math.sin(u * Math.PI) * 10), b = u >= 1 && Math.sin(t * 5) > 0.3 ? 1 : 0;
    R.rect(x, y - 3, x + 5, y, hex('#8a8ea0')); R.rect(x + 5, y - 5 + b, x + 7, y - 3 + b, hex('#8a8ea0')); R.pset(x + 8, y - 4 + b, hex('#e0a040')); R.pset(x + 6, y - 4 + b, K);
    if (u < 1) { const a = Math.sin(t * 20) > 0 ? -3 : 1; R.linea(x + 1, y - 2, x + 3, y - 2 + a, hex('#c8ccd8')); } else { R.pset(x + 1, y + 1, hex('#e0a040')); R.pset(x + 4, y + 1, hex('#e0a040')); R.linea(x, y - 1, x + 4, y - 1, hex('#6a6e80')); } }
  // las motas de polvo al sol
  for (let k = 0; k < 14; k++) { const x = Math.round((h(k, 1, 52) * 320 + t * 4) % 320), y = Math.round(20 + h(k, 2, 52) * 90 + Math.sin(t + k) * 4); if (x > 270 && y < 46) continue; R.pset(x, y, hex('#fff6d8')); }
};

// ── 4 · LOCAL la rendija en corte: el cable entra, el polvo antiguo y el estornudo (gag 5) ──
const PIE = rampa('#4e3a26', '#6a5034', '#866844', '#a08054', '#b89666', '#ccaa78');
const cara = (y) => 70 + (180 - y) * 0.62;   // el canto de la cara norte (la piedra, a la derecha)
const JY = 100, HX = 204;                     // la junta (y) y donde empieza el hueco (x)
const corteFijo = () => {
  // fuera: el aire con el cielo tramado y, abajo, la arena lejana
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    if (x < cara(y)) { R.pset(x, y, y < 150 ? tono(CIELO, 6.4 * (y - 16) / 134, x, y) : tono(ARE, 2 + (y - 150) * 0.05 + (h(x >> 1, y, 60) - 0.5), x, y)); continue; }
    // la piedra cortada como una maqueta: grandes bloques con su trama de corte y juntas
    const hil = Math.floor((y + 2) / 26), off = (hil * 37) % 60, bl = Math.floor((x + off) / 70), lx = (x + off) % 70, ly = (y + 2) % 26;
    let v = 3.1 + (h(x >> 2, y >> 2, 61 + bl + hil * 5) - 0.5) * 0.9 + ((x - y) % 6 === 0 ? -0.5 : 0);
    if (ly === 0 || lx === 0) v = 0.6; if (ly === 1 || lx === 1) v += 0.8;
    if (x > 268 && y < 50) v = 2.9 + ((x - y) % 6 === 0 ? -0.2 : 0);   // la esquina de Atom, tranquila
    R.pset(x, y, tono(PIE, v, x, y));
  }
  // el canto de la cara, iluminado, con sus escalones
  for (let y = 0; y < 180; y++) { const x = Math.round(cara(y)); R.pset(x, y, hex('#f4dcae')); R.pset(x + 1, y, hex('#d8b986')); if (y % 9 === 0) R.rect(x - 3, y, x, y, hex('#d8b986')); }
  // el hueco: el pasillo escondido en corte (techo de losas a dos aguas, suelo con polvo de siglos)
  for (let y = 66; y <= 134; y++) for (let x = HX; x < 320; x++) {
    const techo = 66 + Math.abs(x - 300) * 0.0;   // techo plano en corte largo
    if (y < 72) { R.pset(x, y, tono(PIE, 4 + ((x + y) % 4 === 0 ? 0.6 : 0), x, y)); continue; }   // la losa del techo, más clara
    let v = 0.35 + (h(x >> 1, y >> 1, 62) - 0.5) * 0.25 + Math.max(0, (y - 120) * 0.02);
    R.pset(x, y, tono(rampa('#0e0a10', '#1a1418', '#2a2026', '#3a2e30'), v, x, y));
  }
  // el polvo del suelo (capas grises claras)
  for (let x = HX; x < 320; x++) { const a = 3 + Math.round(Math.sin(x * 0.08) * 1.5 + h(x >> 2, 0, 63) * 2); R.rect(x, 135 - a, x, 134, hex('#6a6060')); R.pset(x, 135 - a, hex('#8a8080')); }
  R.rect(HX, 135, 319, 137, K);
  // las dos losas del techo en chevrón encima del hueco, en corte: dos bloques inclinados con su borde
  R.linea(HX, 66, 262, 40, K); R.linea(262, 40, 320, 66, K); R.linea(HX, 65, 262, 39, hex('#e0c890')); R.linea(262, 39, 320, 65, hex('#e0c890'));
  R.linea(HX, 66, 319, 66, K);
  // el rodapié de la pared del hueco
  R.linea(HX, 66, HX, 137, K); R.linea(HX + 1, 66, HX + 1, 137, PIE[2]);
  // el andamio de fuera: la plataforma donde está el técnico
  R.rect(0, 140, 54, 144, K); R.rect(0, 141, 54, 143, hex('#a87c44')); for (const x of [6, 44]) { R.rect(x, 144, x + 3, 180, K); R.rect(x + 1, 144, x + 2, 180, hex('#8a929e')); }
  R.linea(0, 118, 50, 118, K); R.linea(0, 119, 50, 119, hex('#8a929e')); R.rect(48, 116, 50, 140, K);
};
const p4 = (t) => {
  capa('corte', corteFijo);
  cielo(t, 0, 16, 180, 148, 150, (x, y) => x < cara(y) - 1, { nubes: [[0.2, 0.15, 14, 4], [0.7, 0.4, 18, 6], [0.4, 0.7, 10, 9]], aves: 2 });
  // la junta: la rendija oscura que atraviesa la piedra hasta el hueco
  const jx0 = Math.round(cara(JY));
  for (let x = jx0; x < HX; x++) { R.pset(x, JY - 2, PIE[5]); R.pset(x, JY - 1, K); R.pset(x, JY, K); R.pset(x, JY + 1, K); R.pset(x, JY + 2, PIE[1]); }
  // dónde va la cabecita: entra a «gap», llega al hueco, olfatea el polvo, estornuda (sale 10 px para atrás) y vuelve
  const entra = tramo(t, rendija - 0.3, rendija + 1.3), sn = w(17.6), st = sn + 0.9, vuelve = st + 0.6;
  let hx = lerp(jx0 - 22, HX + 10, entra);
  const olfa = t > sn && t < st ? Math.round(Math.sin((t - sn) * 18) * 1.2) : 0;
  const atras = tramo(t, st, st + 0.12) * (1 - tramo(t, vuelve, vuelve + 0.6));
  hx = Math.round(hx + olfa - atras * 14 + tramo(t, vuelve, vuelve + 0.6) * 6);
  const hy = JY;
  // el cable, desde la mano del técnico a la cabecita
  const tx = 22, ty = 128;
  for (let i = 0; i <= 60; i++) { const u = i / 60, x = Math.round(lerp(tx + 14, hx, u)), y = Math.round(lerp(ty - 6, hy, Math.min(1, u * 1.6)) + Math.sin(u * Math.PI) * (2 + atras * 4)); R.pset(x, y, K); R.pset(x, y + 1, hex('#5a606c')); }
  // el técnico, en la plataforma, que mete el cable; con el estornudo da un respingo
  R.actor(EL.tecnicoEgipcio, tx - 8, 140, t, { dir: 1, sostiene: [tx + 14, ty - 6], sorpresa: t > st && t < st + 1.2, salto: t > st && t < st + 0.3 ? 2 : 0 });
  // la cabecita de la cámara, con su luz (en el hueco, la luz abre un cono hacia delante)
  R.rect(hx - 8, hy - 2, hx, hy + 2, K); R.rect(hx - 7, hy - 1, hx - 1, hy + 1, hex('#c8d0dc')); R.linea(hx - 7, hy - 1, hx - 1, hy - 1, hex('#ffffff')); R.rect(hx + 1, hy - 1, hx + 2, hy + 1, hex('#fff2b0'));
  if (hx > HX && Math.sin(t * 9) > 0) R.disco(hx + 2, hy, 2, hex('#fff6d0'));
  if (hx > HX) { const luz = t > vuelve + 0.4 ? 1 : 0.5; for (let k = 0; k < 60 * luz; k++) { const d = 4 + h(k, 1, 64) * 60 * luz, a = (h(k, 2, 64) - 0.5) * 0.6, x = Math.round(hx + Math.cos(a) * d), y = Math.round(hy + Math.sin(a) * d * 1.2);
    if (x < 320 && y > 72 && y < 133) R.pset(x, y, d < 20 ? hex('#8a7a5a') : hex('#4a3e34')); } }
  // la nube de polvo antiguo que rodea la cabecita y, con el estornudo, sale disparada hacia el hueco
  const nube = tramo(t, rendija + 1.0, sn + 0.3) * (1 - tramo(t, st + 0.2, st + 1.6)), sopla = tramo(t, st, st + 1.4);
  for (let k = 0; k < 110; k++) { const a = h(k, 3, 65) * Math.PI * 2, r0 = 3 + h(k, 4, 65) * 16, gir = t * (0.8 + h(k, 5, 65));
    let x = HX + 16 + Math.cos(a + gir) * r0 * 1.5, y = hy + Math.sin(a + gir) * r0 * 0.8;
    if (sopla > 0) { x += sopla * (20 + h(k, 6, 65) * 60); y += (h(k, 7, 65) - 0.5) * sopla * 40; }
    const vis = sopla > 0 ? (1 - sopla) : nube; if (h(k, 8, 65) > vis) continue;
    const px = Math.round(x), py = Math.round(y); if (px < HX + 2 || px > 319 || py < 73 || py > 133) continue;
    const cc = h(k, 9, 65) < 0.4 ? hex('#e8dcc4') : hex('#b4a890'); if (k % 2 === 0) R.disco(px, py, 1, cc); else R.pset(px, py, cc); if (k % 3 === 0) R.pset(px + 1, py, hex('#d0c4ac')); }
  // un poco de polvo que sale también por la junta hacia fuera con el estornudo
  if (sopla > 0 && sopla < 1) for (let k = 0; k < 12; k++) { const x = Math.round(jx0 - sopla * (6 + k * 2)), y = JY + Math.round((h(k, 1, 66) - 0.5) * sopla * 14); R.pset(x, y, hex('#d8ccb4')); }
  // las motas que flotan en el hueco desde hace milenios
  for (let k = 0; k < 18; k++) { const x = Math.round(HX + 6 + ((h(k, 1, 67) * 110 + t * 2) % 112)), y = Math.round(78 + h(k, 2, 67) * 50 + Math.sin(t * 0.7 + k) * 3); if (x < 320) R.pset(x, y, Math.hypot(x - hx, y - hy) < 26 ? hex('#e8dcc0') : hex('#5a4e44')); }
  // el estornudo: el «!» y el temblor de la cabecita
  if (t > st && t < st + 0.9) { R.bocadillo(Math.max(HX + 14, hx + 4), hy - 10, { icono: '!' }); }
  if (t > sn && t < st) for (let k = 0; k < 3; k++) if (Math.floor(t * 6 + k) % 3 === 0) R.pset(hx + 3 + k * 2, hy - 3 - k, hex('#f6f2ea'));
};

const efectos = [[0.3, 'tecleo'], [muones, 'bip'], [pequeño + 0.1, 'brillo'], [tejado + 0.1, 'whoosh'], [año23 + 0.5, 'golpecito'],
  [satelite, 'bip'], [nunca + 0.05, 'aviso'], [desliza, 'golpecito'], [rendija - 0.2, 'zumbido'], [w(17.6) + 0.9, 'pop'], [w(17.6) + 0.95, 'whoosh']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: desde([[0, 2017], [año23, 2023]]) });
''')

E['gz-pasillo'] = ('El pasillo', '''// GZ-PASILLO (frase 15), cartela «2023». Cuatro planos:
// 1. D keops/norte/pasillo: lo que ve el endoscopio; a «there it was» (golpe «pasillo») la imagen se aclara de golpe y
//    las aristas del techo se encienden; la cámara avanza (cifras que suben). Corta en «image».
// 2. D keops/anuncio: la rueda de prensa del 2 de marzo; el ministro habla en el atril y se vuelve a señalar la
//    pantalla; a «9» y a «2» salen las cotas sobre la pantalla; la periodista llega con su micrófono y pregunta; flashes. Corta en «with».
// 3. LOCAL la prensa de cerca: una cámara de televisión en primer término con su monitor (el pasillo en directo);
//    periodistas con móviles en alto y flashes; a «gabled roof» se encienden las dos losas del techo y a «4,500» sale
//    la cifra. Corta en «That's».
// 4. D keops/anuncio/radiografia: medirlo (el japonés señala mientras el barrido revela los huecos), publicarlo (la
//    francesa deja la revista en la mesa) y mirarlo (en el monitor de la mesa, el pasillo; los dos se acercan).''', COMUN + r'''
const v = (s) => en('pasillo', (s - 1.5) / 17.996);
const P2 = v(5.62), P3 = v(10.0), P4 = v(14.24);
const ahi = v(1.6), egipto = v(4.72), muestra = v(5.04), nueve = v(7.26), dos = v(8.70), tejado = v(10.18), vacio = v(10.96), cifra = v(12.12);
const mide = v(15.62), publica = v(17.34), mira = v(18.88);
// el pasillo de 2023 visto por la cámara: el decorado lo pinta en un búfer aparte y aquí se copia en pequeño
let bufPas = null;
const pasilloEn = (t, x0, y0, w, h, esc) => {
  if (!bufPas) bufPas = R.nuevo();
  const prev = R.usar(bufPas); T.keops(R, t, { encuadre: 'norte', camara: 'pasillo', entra: 1 }); R.usar(prev);
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const sx = Math.round(160 + (i - w / 2) * esc), sy = Math.round(96 + (j - h / 2) * esc); R.pset(x0 + i, y0 + j, bufPas[sy * 320 + sx]); }
};

// ── 1 · D keops/norte/pasillo: «and there it was» ──
const PAS = { encuadre: 'norte', camara: 'pasillo' };
const p1 = (t) => {
  T.keops(R, t, { ...PAS, entra: 0.3 + 0.7 * tramo(t, 1.3, egipto) });
  // el golpe: la imagen se aclara de un fogonazo (tramado que se va) y un anillo de luz recorre el borde del círculo
  const g = 1 - tramo(t, ahi, ahi + 0.9);
  if (t > ahi - 0.05 && g > 0) { for (let y = 22; y <= 170; y++) for (let x = 86; x <= 234; x++) { if (Math.hypot(x - 160, y - 96) > 74) continue; if (h(x, y, 80) < g * 0.55) R.pset(x, y, hex('#fff2c8')); }
    for (let a = 0; a < 240; a++) { const an = a / 240 * Math.PI * 2 + t; if ((a >> 2) % 2) continue; R.pset(Math.round(160 + Math.cos(an) * 76), Math.round(96 + Math.sin(an) * 76), hex('#ffe08a')); } }
  // tras el golpe, el marco de la mira se cierra en el fondo del pasillo y parpadea: ahí está
  const m = tramo(t, ahi + 0.4, ahi + 1.4);
  if (m > 0 && t < P2 - 0.3 && Math.floor(t * 3) % 2 === 0) { const r = Math.round(lerp(40, 12, m)); for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { R.linea(160 + sx * r, 96 + sy * r, 160 + sx * (r - 5), 96 + sy * r, hex('#7cff9a')); R.linea(160 + sx * r, 96 + sy * r, 160 + sx * r, 96 + sy * (r - 5), hex('#7cff9a')); } }
};

// ── 2 · D keops/anuncio: la rueda de prensa ──
const ANU = { encuadre: 'anuncio' };
const flash = (x, y, t, k) => { const f = (t * 1.3 + h(k, 1, 81)) % 1; if (f < 0.08) { R.disco(x, y, 3, hex('#ffffff')); for (const [dx, dy] of [[-6, 0], [6, 0], [0, -6], [0, 6], [-4, -4], [4, 4], [4, -4], [-4, 4]]) R.pset(x + dx, y + dy, hex('#fff6c0')); } };
const p2 = (t) => {
  T.keops(R, t, ANU);
  // el equipo en el estrado, a los lados del ministro
  R.actor(EL.cientificoJapones, 62, 147, t, { dir: 1, sonrisa: t > dos, dedo: t > nueve && t < nueve + 0.8 });
  R.actor(EL.cientificaFrancesa, 140, 147, t, { dir: -1, sonrisa: true, habla: t > dos + 0.2 && Math.sin(t * 8) > 0.3 });
  // el ministro habla y, a «showed the image», se vuelve hacia la pantalla y la señala
  const vuelve = t > P2 + 0.3;
  R.actor(EL.ministro2023, 104, 141, t, { dir: vuelve ? 1 : -1, habla: Math.sin(t * 8) > 0 && !(t > nueve - 0.2 && t < nueve + 0.4), dedo: vuelve && t < dos + 0.9 });
  // los periodistas: la del micrófono llega desde la derecha y lo levanta; el fotógrafo dispara
  const u = tramo(t, P2, P2 + 1.6), px = Math.round(lerp(330, 236, u));
  R.actor(EL.periodista2025, px, 172, t, { dir: -1, anda: u > 0 && u < 1, habla: u >= 1 && t > nueve && Math.sin(t * 8) > 0 });   // con su micrófono de mano
  R.actor(EL.periodista1, 202, 172, t, { dir: -1, habla: t > dos + 0.3 && Math.sin(t * 7) > 0 });
  R.actor(EL.turista2, 272, 172, t, { dir: -1, sostiene: [262, 152] });
  R.rect(256, 148, 264, 154, K); R.rect(257, 149, 263, 153, hex('#3a3a46')); R.disco(258, 151, 1, hex('#8ac0e0'));
  flash(260, 149, t, 1); flash(222, 160, t + 0.4, 2); flash(300, 156, t + 0.7, 3);
  T.keopsDelante(R, t, ANU);
  // las cotas sobre la pantalla: a «9» el largo del pasillo; a «2» el ancho
  const a9 = tramo(t, nueve - 0.1, nueve + 0.3), a2 = tramo(t, dos - 0.1, dos + 0.3), C1 = hex('#ffffff');
  if (a9 > 0) { const L = Math.round(26 * a9); R.linea(226 - L, 68, 226 + L, 68, C1); R.linea(226 - L, 69, 226 + L, 69, K);
    if (a9 >= 1) { R.linea(200, 66, 198, 68, C1); R.linea(200, 70, 198, 68, C1); R.linea(252, 66, 254, 68, C1); R.linea(252, 70, 254, 68, C1); }
    R.numero('9', 226, 64, { tam: 8, centro: true }); }
  if (a2 > 0) { const L = Math.round(16 * a2); R.linea(188, 96 - L, 188, 96 + L, C1); R.linea(189, 96 - L, 189, 96 + L, K);
    if (a2 >= 1) { R.linea(186, 82, 188, 80, C1); R.linea(190, 82, 188, 80, C1); R.linea(186, 110, 188, 112, C1); R.linea(190, 110, 188, 112, C1); }
    R.numero('2', 181, 100, { tam: 8, centro: true }); }
};

// ── 3 · LOCAL la prensa de cerca: la cámara de televisión, el monitor con el pasillo y los flashes ──
const CALP = rampa('#8a6a3e', '#a8875a', '#c4a270', '#d8b986', '#e8cc98', '#f4dcae');
const prensaFija = () => {
  const dentro = () => true;
  for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(CIELO, 6.4 * y / 96, x, y));
  // el desierto lejano tras el horizonte (y 96), con Kefrén en la bruma y las dunas
  for (let y = 96; y < 112; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(ARE, 3.2 - (112 - y) * 0.05 + (h(x >> 2, y, 86) - 0.5) * 0.6, x, y));
  for (let y = 58; y < 97; y++) { const hw = (y - 58) * 0.95; for (let x = Math.round(250 - hw); x <= 250 + hw; x++) R.pset(x, y, tono(rampa('#c0a684', '#d2b894', '#e0c8a4'), x > 250 ? 0.6 : 1.8, x, y)); }
  // la base de Keops, enorme, de fondo: hiladas de sillares al sol con sus juntas
  for (let y = 18; y < 112; y++) for (let x = 0; x < 320; x++) { const borde = 18 + Math.abs(x - 40) * 0.9; if (y < borde) continue;
    const hil = Math.floor((y - 18) / 6), junta = (y - 18) % 6 === 5 || ((x + hil * 13 + Math.floor(h(hil, 0, 82) * 20)) % 23 === 0);
    if (x > 272 && y < 48) { R.pset(x, y, tono(CALP, 3.2, x, y)); continue; }
    R.pset(x, y, junta ? CALP[1] : tono(CALP, 3.4 + (h(x >> 2, hil, 83) - 0.5) * 1.2 - (x - 40) * 0.003, x, y)); }
  // la explanada de arena con huellas, cables y conos
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(ARE, 2.4 + (y - 112) * 0.02 + (h(x >> 1, y, 84) - 0.5) * 0.9, x, y));
  for (let x = 0; x < 320; x++) { const y = Math.round(160 + Math.sin(x * 0.05) * 3); R.pset(x, y, K); R.pset(x, y + 1, hex('#3a3a46')); }
  // el estrado lejano a la derecha: el telón azul con la pirámide dorada, los banderines y la pantalla en su torre
  R.rect(182, 82, 300, 120, K); R.rect(183, 83, 299, 119, hex('#2a4a8a')); for (let x = 186; x < 299; x += 5) R.linea(x, 84, x, 118, hex('#1e3a72'));
  R.poligono([[228, 112], [241, 92], [254, 112]], hex('#e8c040')); R.linea(241, 92, 254, 112, hex('#b89020'));
  R.rect(178, 118, 304, 124, K); R.rect(179, 119, 303, 123, hex('#a83a3a'));
  for (let k = 0; k < 14; k++) { const x = 184 + k * 8; R.poligono([[x, 80], [x + 6, 80], [x + 3, 85]], [hex('#d83a3a'), hex('#f2eee2'), hex('#2a2a34')][k % 3]); }
  R.linea(182, 80, 300, 80, K);
  // rodadas, huellas y piedrecitas en la arena
  for (let k = 0; k < 2; k++) for (let x = 110; x < 320; x++) { const y = Math.round(146 + k * 7 + Math.sin(x * 0.03 + k) * 2); if ((x >> 1) % 3) R.pset(x, y, ARE[1]); }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 87) * 318), y = Math.round(114 + h(k, 2, 87) * 64); R.rect(x, y, x + 1, y, ARE[0]); R.pset(x, y - 1, ARE[4]); }
  // las vallas de la prensa delante del estrado: tubos con su rejilla y sus pies
  for (let x0 = 150; x0 < 320; x0 += 34) {
    R.rect(x0, 126, x0 + 32, 127, K); R.rect(x0, 141, x0 + 32, 142, K); R.linea(x0, 127, x0 + 32, 127, hex('#c8d0dc'));
    for (let x = x0 + 2; x < x0 + 32; x += 3) R.linea(x, 128, x, 140, hex('#8a929e'));
    for (const x of [x0, x0 + 32]) { R.rect(x, 124, x + 1, 146, K); R.linea(x - 4, 146, x + 5, 146, K); } }
  // las maletas de las cámaras, un cono y el carrete de cable
  for (const [x, y, c] of [[262, 150, '#2a2c34'], [288, 154, '#5a5c68']]) { R.rect(x, y, x + 24, y + 14, K); R.rect(x + 1, y + 1, x + 23, y + 13, hex(c)); R.rect(x + 1, y + 1, x + 23, y + 2, hex('#7a7c88')); for (const xx of [x + 2, x + 20]) R.rect(xx, y + 5, xx + 1, y + 9, hex('#c8d0dc')); R.rect(x + 9, y - 2, x + 15, y, K); }
  R.poligono([[110, 168], [114, 154], [118, 168]], hex('#f07a2a')); R.linea(112, 161, 116, 161, hex('#ffffff')); R.rect(108, 168, 120, 169, K);
  R.disco(96, 150, 7, K); R.disco(96, 150, 6, hex('#e07a2a')); R.disco(96, 150, 2, hex('#3a3a46'));
};
const ARE2 = rampa('#9a7a4a', '#b8945e', '#cca872', '#dcbc86', '#ead09c');
const ARE = ARE2;
const p3 = (t) => {
  capa('prensa', prensaFija);
  const enCielo = (x, y) => y < 18 + Math.abs(x - 40) * 0.9 && !(x > 272 && y < 48) && !(y >= 58 && Math.abs(x - 250) <= (y - 58) * 0.95) && !(x >= 178 && x <= 304 && y >= 78);
  cielo(t, 0, 0, 320, 95, 96, enCielo, { yMin: 18, aves: 3 });
  // gente pequeña al fondo, junto al estrado, que va y viene
  for (let k = 0; k < 4; k++) { const x = Math.round(180 + ((t * (5 + k) + k * 33) % 130)), y = 126; R.rect(x, y - 7, x + 2, y - 1, [hex('#3a6ac8'), hex('#d84a3a'), hex('#f2eee2'), hex('#5a7a4a')][k]); R.rect(x, y - 9, x + 2, y - 8, hex('#c8946a')); R.pset(x + (Math.sin(t * 8 + k) > 0 ? 1 : 0), y, K); }
  // la fila de periodistas, de perfil hacia el estrado, con los móviles en alto; uno llega corriendo
  const u = tramo(t, P3 - 0.2, P3 + 1.4), lx = Math.round(lerp(330, 286, u));
  for (const [x, d, k] of [[134, EL.periodista1, 0], [166, EL.periodista2025, 1], [200, EL.turista1, 2], [232, EL.turista2, 3]]) {
    const a = R.actor(d, x, 174, t + k * 0.4, { dir: 1, sostiene: [x + 18, 144 - (k % 2) * 3], sorpresa: t > tejado && t < tejado + 0.7 && k === 1 });
    const [mx, my] = a.mano; R.rect(mx - 1, my - 7, mx + 2, my - 1, K); R.rect(mx, my - 6, mx + 1, my - 2, hex('#8ac0e0'));
    flash(mx + 1, my - 6, t + k * 0.37, 10 + k); }
  R.actor(EL.periodista1, lx, 174, t + 2, { dir: -1, anda: u > 0 && u < 1, pal: { C: hex('#4a6a3a'), c: hex('#36502a') } });
  // la cámara de televisión en primer término, en su trípode, con el piloto rojo
  for (const [x1, y1] of [[8, 178], [56, 178], [34, 180]]) { R.linea(32, 128, x1, y1, K); R.linea(33, 128, x1 + 1, y1, hex('#5a5a66')); }
  R.rect(4, 104, 74, 132, K); R.rect(5, 105, 73, 131, hex('#3a3c46')); R.rect(5, 105, 73, 107, hex('#5a5c68')); R.rect(10, 112, 30, 126, hex('#2a2c34'));
  for (let y = 114; y < 125; y += 3) R.linea(12, y, 28, y, hex('#4a4c56'));
  R.rect(74, 108, 104, 128, K); R.rect(75, 109, 103, 127, hex('#2a2c34')); R.disco(104, 118, 10, K); R.disco(104, 118, 9, hex('#1a1c24')); R.disco(104, 118, 6, hex('#3a5a8a')); R.disco(101, 115, 2, hex('#a8d0f0'));
  R.rect(20, 98, 60, 104, K); R.rect(21, 99, 59, 103, hex('#4a4c56'));
  if (Math.floor(t * 1.6) % 2 === 0) { R.disco(68, 110, 2, hex('#ff3a3a')); R.pset(67, 109, hex('#ffd0d0')); }
  // el monitor del cámara, grande, encima: el pasillo en directo
  R.rect(14, 46, 106, 100, K); R.rect(15, 47, 105, 99, hex('#2a2c34')); R.rect(15, 47, 105, 48, hex('#5a5c68'));
  pasilloEn(t, 19, 51, 82, 44, 1.45);
  // a «gabled roof», las dos losas del techo se encienden en el monitor (un tejado a dos aguas)
  const tj = tramo(t, tejado - 0.1, tejado + 0.4);
  if (tj > 0 && t < cifra + 0.4) { R.recorte([19, 51, 100, 94]); const L = Math.round(22 * tj); R.linea(60, 56, 60 - L, 56 + Math.round(L * 0.55), hex('#ffe08a')); R.linea(60, 56, 60 + L, 56 + Math.round(L * 0.55), hex('#ffe08a')); R.linea(60, 57, 60 - L, 57 + Math.round(L * 0.55), hex('#c8902a')); R.linea(60, 57, 60 + L, 57 + Math.round(L * 0.55), hex('#c8902a')); R.recorte(null); }
  // a «4,500», la cifra sale sobre el monitor, con su icono de pirámide
  const c = tramo(t, cifra - 0.1, cifra + 0.3);
  if (c > 0) { const y = Math.round(lerp(46, 38, c)); R.rect(22, y - 12, 98, y + 2, K); R.rect(23, y - 11, 97, y + 1, hex('#2a2030')); R.numero('4500', 66, y - 1, { tam: 8, centro: true }); R.icono('piramide', 26, y - 9, hex('#e8c040'), K, 1); }
};

// ── 4 · D keops/anuncio/radiografia: medir, publicar, mirar ──
const RAD = { encuadre: 'anuncio', camara: 'radiografia' };
const p4 = (t) => {
  T.keops(R, t, { ...RAD, revela: tramo(t, mide - 0.2, publica - 0.2) });
  // el japonés, debajo del negatoscopio, sigue el barrido con el dedo: medirlo
  const jx = Math.round(lerp(70, 176, tramo(t, mide - 0.2, publica - 0.2)));
  R.actor(EL.cientificoJapones, jx, 166, t, { dir: 1, anda: t > mide - 0.2 && t < publica - 0.2, dedo: t > mide - 0.2 && t < mira - 0.4, sonrisa: t > mira });
  // la francesa trae la revista y la deja en la mesa: publicarlo
  const u = tramo(t, P4 + 0.2, publica), fx = Math.round(lerp(330, 252, u));
  const deja = t > publica + 0.5;
  const fr = R.actor(EL.cientificaFrancesa, fx, 166, t, { dir: t > mira - 0.3 ? 1 : -1, anda: u > 0 && u < 1, sostiene: deja ? undefined : [fx - 4, 142], sonrisa: t > mira, dedo: t > mira && t < mira + 1.2 });
  if (!deja && fr.mano) T.PIEZAS_GZ.revista(R, fr.mano[0], fr.mano[1] + 10, {});
  if (deja) T.PIEZAS_GZ.revista(R, 248, 128, {});
  // mirarlo: en la mesa, un monitor con el pasillo de verdad que se enciende a «look at it»
  R.rect(270, 100, 304, 127, K); R.rect(271, 101, 303, 125, hex('#2a2c34')); R.rect(284, 126, 290, 128, hex('#5a5c68'));
  if (t > mira - 0.2) pasilloEn(t, 273, 103, 29, 20, 3.4);
  else for (let y = 103; y < 123; y++) for (let x = 273; x < 302; x++) R.pset(x, y, h(x, y, 85 + Math.floor(t * 8) % 3) < 0.3 ? hex('#3a3c46') : hex('#1a1c24'));
  // el ojo que se abre sobre el monitor a «look»
  if (t > mira && t < mira + 1.4 && Math.floor(t * 4) % 2 === 0) { R.disco(287, 92, 3, K); R.rect(282, 91, 292, 93, hex('#ffffff')); R.disco(287, 92, 1, hex('#2a4a8a')); }
};

const efectos = [[ahi, 'brillo'], [P2 + 0.1, 'publico'], [P2 + 0.6, 'flash'], [nueve, 'pop'], [dos, 'pop'],
  [P3 + 0.4, 'flash'], [tejado, 'brillo'], [cifra, 'pop'], [mide - 0.1, 'interruptor'], [publica + 0.5, 'papel'], [mira, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '2023', efectos, año: 2023 });
''')

E['gz-osiris'] = ('El pozo de Osiris', '''// GZ-OSIRIS (frase 16), hoy → 1999 → 2025. Cuatro planos:
// 1. A giza/meseta/calzada: dos turistas bajan junto a la cuerda; a «causeway» una luz recorre la calzada de Kefrén y
//    la turista la señala; a «Sphinx» él se sorprende; la verja del túnel del pozo parpadea. Corta en «lies».
// 2. A giza/osiris: el corte se abre a «Osiris» (o.corte); el técnico baja una linterna por el primer pozo; salen
//    los niveles 1, 2 y 3 a «three levels» y la regla baja hasta «30». Los turistas, asomados, se sorprenden. Corta en «granite».
// 3. A giza/osiris/fondo (1999): Hawass alumbra el sarcófago de granito con la linterna; caen gotas al agua del
//    fondo; a «cleared» un trabajador sube la escalera con la cesta de arena. Corta en «1990s».
// 4. C plano/mataha/regla: la escala, en el código del plano azul de lo que dicen: se abre la lupa; a «30» late el
//    pozo de Osiris (real, en blanco) y a «not 600» se encienden los pozos de 650 que dicen los italianos; el técnico,
//    en la tarima, señala uno y abre los brazos ante el otro.''', COMUN + r'''
const o = (s) => en('osiris', (s - 0.5) / 20.11);
const P2 = o(6.82), P3 = o(12.28), P4 = o(18.0);
const bajo = o(1.5), calzada = o(5.18), esfinge = o(6.30), osiris = o(7.98), tres = o(9.54), treinta = o(11.04);
const granito = o(12.28), agua = o(13.9), limpia = o(15.58), estudia = o(16.28), t30 = o(18.47), no600 = o(19.63);

// ── 1 · A giza/meseta/calzada ──
const CAL = { encuadre: 'meseta', camara: 'calzada' };
const p1 = (t) => {
  T.giza(R, t, CAL);
  // a «causeway» una luz blanca baja por la calzada, de Kefrén al templo del valle
  const lz = tramo(t, calzada - 0.3, esfinge);
  if (lz > 0 && t < P2 - 0.2) { const n = 60; for (let i = 0; i <= n * lz; i++) { const u = i / n, x = Math.round(lerp(132, 300, u)), y = Math.round(lerp(106, 150, u)); R.rect(x, y - 4, x + 1, y - 3, hex('#ffe060')); R.pset(x, y - 2, hex('#a07020')); if (i % 4 === 0) R.pset(x, y - 5, hex('#fff6c8')); }
    if (lz >= 1 && Math.floor(t * 4) % 2 === 0) { R.disco(300, 146, 3, K); R.disco(300, 146, 2, hex('#ffe060')); } }
  // la verja del túnel del pozo: un anillo que late (ahí abajo está)
  if (t > bajo && Math.floor(t * 3) % 2 === 0) for (let a = 0; a < 28; a++) { const an = a / 28 * Math.PI * 2; if (a % 2) continue; R.pset(Math.round(206 + Math.cos(an) * 12), Math.round(129 + Math.sin(an) * 10), hex('#ffffff')); }
  // los turistas que bajan por la explanada: ella señala la calzada, él se asombra con la Esfinge
  const u = tramo(t, 0.2, calzada - 0.2), x1 = Math.round(lerp(-14, 70, u)), x2 = Math.round(lerp(-34, 46, u));
  R.actor(EL.turista2, x1, 166, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > calzada && t < P2, habla: t > calzada + 0.2 && Math.sin(t * 9) > 0 });
  R.actor(EL.turista1, x2, 168, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: t > esfinge, brazos: t > esfinge && t < esfinge + 0.6 });
  // el camellero que pasa por la derecha con su camello, por delante del templo
  const c = tramo(t, 0, P2), cx = Math.round(lerp(330, 150, c));
  R.actor(EL.camellero, cx - 6, 166, t, { dir: -1, anda: c > 0 && c < 1 });
  T.gizaDelante(R, t, CAL);
};

// ── 2 · A giza/osiris: el corte con los tres niveles y la regla ──
const OSI = { encuadre: 'osiris' };
const p2 = (t) => {
  const corte = tramo(t, osiris - 0.2, tres - 0.1), regla = tramo(t, tres + 0.5, treinta + 0.1);
  T.giza(R, t, { ...OSI, corte, regla });
  // el técnico baja la linterna con una cuerda por el primer pozo
  const baja = tramo(t, osiris + 0.2, tres + 0.6), ly = Math.round(lerp(88, 112, baja));
  const tec = R.actor(EL.tecnicoEgipcio, 230, 92, t, { dir: -1, sostiene: [226, 78] });
  const [mx, my] = tec.mano; R.linea(mx, my, 206, 80, hex('#c8b070')); R.linea(206, 80, 206, ly - 14, hex('#c8b070'));
  T.PIEZAS_GZ.linterna(R, 206, ly, { encendida: corte > 0.2, abajo: true });
  // los turistas asomados a la barandilla: se sorprenden cuando el suelo se abre
  R.actor(EL.turista2, 254, 92, t, { dir: -1, sorpresa: t > osiris + 0.3, dedo: t > tres && t < treinta });
  R.actor(EL.turista1, 274, 92, t, { dir: -1, sorpresa: t > osiris + 0.6, habla: t > treinta && Math.sin(t * 8) > 0 });
  T.gizaDelante(R, t, OSI);
  // los niveles, uno a uno, a «three levels»
  for (const [k, x, y] of [[0, 240, 114], [1, 132, 142], [2, 110, 158]]) { const a = tramo(t, tres + k * 0.22, tres + k * 0.22 + 0.2); if (a <= 0) continue;
    R.rect(x - 6, y - 10, x + 6, y + 1, K); R.rect(x - 5, y - 9, x + 5, y, hex('#2a2030')); R.numero(String(k + 1), x, y - 1, { tam: 8, centro: true }); }
};

// ── 3 · A giza/osiris/fondo (1999): el sarcófago, el agua y la limpieza ──
const FON = { encuadre: 'osiris', camara: 'fondo' };
const p3 = (t) => {
  T.giza(R, t, FON);
  // Hawass alumbra el sarcófago con la linterna: el haz se abre del puño a la piedra
  const haw = R.actor(EL.hawass, 84, 160, t, { dir: 1, sostiene: [104, 136], dedo: false, habla: t > estudia && Math.sin(t * 8) > 0 });
  const [hx, hy] = haw.mano; T.PIEZAS_GZ.linterna(R, hx + 6, hy + 3, { encendida: true, haz: false });
  const hz = tramo(t, P3 - 0.1, P3 + 0.5);
  if (hz > 0) { const fx = hx + 14, fy = hy; const ty = Math.round(lerp(150, 120, tramo(t, granito, agua))) ;
    for (let k = 0; k < 260 * hz; k++) { const u = h(k, 1, 90), w = (h(k, 2, 90) - 0.5) * 2, x = Math.round(lerp(fx, 166, u)), y = Math.round(lerp(fy, ty, u) + w * u * 18); if (x > 126 && x < 204 && y > 104 && y < 142) R.pset(x, y, h(k, 3, 90) < 0.5 ? hex('#ffe4a0') : hex('#c89070')); else R.pset(x, y, hex('#fff2c8')); } }
  // el trabajador limpia: a «cleared» llega con la cesta de arena y sube por la escalera
  const anda = tramo(t, P3 + 0.4, limpia), sube = tramo(t, limpia, P4 + 0.6);
  const wx = Math.round(lerp(6, 38, anda)), wy = Math.round(lerp(160, 110, sube));
  R.actor(EL.trabajadorEgipcio1888b, wx, wy, t, { dir: 1, anda: (anda > 0 && anda < 1) || (sube > 0 && sube < 1) });
  // las gotas del techo que caen al agua y abren sus anillos
  for (let k = 0; k < 3; k++) { const per = 1.6 + k * 0.4, f = ((t - agua + k * 0.5) % per + per) % per, gx = [214, 238, 282][k];
    if (t < agua - 1) continue;
    if (f < 0.5) { const y = Math.round(lerp(44, 160, f / 0.5)); R.rect(gx, y, gx, y + 2, hex('#a8d8f8')); }
    else { const r = Math.round((f - 0.5) * 12); if (r < 14) for (let a = 0; a < 24; a++) { const an = a / 24 * Math.PI * 2; R.pset(Math.round(gx + Math.cos(an) * r), Math.round(164 + Math.sin(an) * r * 0.3), hex('#d8f0ff')); } } }
  T.gizaDelante(R, t, FON);
};

// ── 4 · C plano/mataha/regla: 30 contra 650 ──
const REG = { encuadre: 'mataha', camara: 'regla' };
const p4 = (t) => {
  T.plano(R, t, { ...REG, lupa: tramo(t, P4 - 0.1, t30 - 0.1) });
  // a «30», el pozo de Osiris late (en blanco: lo real) en la superficie y en la lupa
  const a = tramo(t, t30 - 0.1, t30 + 0.3);
  if (a > 0) for (const [cx, cy, r] of [[150, 48, 7], [219, 104, 46]]) { const rr = Math.round(r * (0.9 + 0.1 * Math.sin(t * 6))); for (let k = 0; k < 60; k++) { if ((k + Math.floor(t * 8)) % 4 === 0) continue; const an = k / 60 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(an) * rr), Math.round(cy + Math.sin(an) * rr * (r > 20 ? 1 : 0.7)), hex('#ffffff')); } }
  // a «not 600», se encienden los pozos que dicen (magenta) con su llave de cota de arriba abajo
  const b = tramo(t, no600 - 0.1, no600 + 0.5);
  if (b > 0) { const y1 = Math.round(lerp(52, 150, b)); for (let y = 52; y <= y1; y++) { if (Math.floor(t * 6) % 2 && y % 2) continue; R.pset(40, y, hex('#ff5ad8')); R.pset(101, y, hex('#ff5ad8')); }
    R.linea(38, 52, 42, 52, hex('#ff5ad8')); if (b >= 1) R.linea(38, 150, 42, 150, hex('#ff5ad8')); }
  // las dos cifras, grandes: 30 sobre la lupa (lo real) y, a «not 600», 650 junto a los pozos (lo que dicen)
  if (a > 0) R.numero('30', 219, Math.round(lerp(58, 50, a)), { tam: 16, centro: true });
  if (b > 0) R.numero('650', 146, Math.round(lerp(118, 110, b)), { tam: 16, centro: true });
  // el técnico en la tarima: mira la lupa y la señala; a «not 600» se vuelve hacia los pozos y abre los brazos
  const gira = t > no600 - 0.2;
  R.actor(EL.tecnicoEgipcio, 266, 172, t, { dir: gira ? -1 : -1, dedo: t > t30 - 0.1 && t < no600 - 0.2, brazos: gira && t < no600 + 0.9, habla: Math.sin(t * 8) > 0.2 && t > no600 + 0.9 });
  T.planoDelante(R, t, REG);
};

const efectos = [[0.4, 'viento'], [calzada, 'brillo'], [esfinge, 'pop'], [osiris, 'whoosh'], [tres, 'golpecito'], [treinta, 'tic'],
  [granito, 'interruptor'], [agua, 'burbujas'], [limpia, 'golpecito'], [t30, 'brillo'], [no600, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: desde([[0, 2026], [P3, 1999], [P4, 2025]]) });
''')
