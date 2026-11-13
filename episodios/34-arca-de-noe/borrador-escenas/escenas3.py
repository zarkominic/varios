E = {}

E['nx-relato'] = ('El relato', '''// NX-RELATO (frases 7–8), sin fecha (la barra sigue en 2026: lo cuenta Atom hoy). A Noé NO se le dibuja: no hay
// ninguna figura humana en toda la escena; el barco, los animales y el cielo llevan la acción. Seis planos:
// 1. el libro antiguo en su atril: cerrado, tiembla el registro y se abre solo en «what does the story say?»; sube la
//    luz y sale un «?» en un globo; dos polillas rondan las velas;
// 2. el astillero vacío: el barco se levanta solo, tabla a tabla (cada golpe, un «toc» y su polvo); en «a flood is
//    coming» el frente de tormenta entra y cae un relámpago lejano; los pájaros huyen;
// 3. la medida: la regla se tiende bajo el arca en «three hundred cubits» y la cifra late; luego bajan las cosas de hoy
//    para comparar y un cursor recorre el campo de punta a punta;
// 4. gag 3: las parejas suben por la rampa… y la fila entera se para y se vuelve a mirar al caracol, el último, que
//    avanza milímetro a milímetro con sus puntos suspensivos; empieza a llover;
// 5. el diluvio: el barco solo en el agua; un marcador cuenta 1…40 con su sol y su luna; el agua se calma, asoman las
//    cumbres y la paloma sale del ventanuco y se aleja;
// 6. el cielo que escampa: la paloma vuelve de cerca con su HOJA de olivo (un destello), el arcoíris se traza de lado
//    a lado y la paloma baja a posarse en el barco.''', r'''
const a = (s) => en('relato', (s - 0.9) / 14.524), b = (s) => en('lluvia', (s - 15.924) / 14.053);   // s: el segundo de la voz inglesa
const K = T.C.k, PZ = T.PIEZAS_NX, BL = hex('#f6f2e6'), ROJO = hex('#d23a2e'), ORO = hex('#ffd86a');
const P2 = a(4.19), P3 = a(9.75), P4 = b(15.924), P5 = b(20.01), P6 = b(24.58);
const sua = (u) => u * u * (3 - 2 * u);
const mez = (x, y, c, f) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; const p = R.pget(x, y); const m = (s) => Math.round(((p >>> s) & 255) * (1 - f) + ((c >>> s) & 255) * f); R.pset(x, y, (0xff000000 | (m(16) << 16) | (m(8) << 8) | m(0)) >>> 0); };
// un globo redondo con su pico y un símbolo dentro (rebota al salir)
const globo = (x, y, t0, t, pinta) => { if (t < t0) return; const d = t - t0, dy = -Math.round(Math.max(0, 5 * Math.sin(d * 11) * Math.exp(-d * 5))); y += dy;
  R.disco(x, y, 12, K); R.poligono([[x - 8, y + 8], [x - 13, y + 19], [x - 1, y + 11]], K); R.disco(x, y, 11, BL); R.poligono([[x - 7, y + 8], [x - 11, y + 16], [x - 2, y + 10]], BL);
  for (let i = -8; i <= 8; i++) R.pset(x + i, y + 10 - Math.round(Math.abs(i) * 0.4), hex('#d8d2c0')); pinta(x, y); };
const destello = (x, y, r, c = hex('#ffffff')) => { for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } if (r > 2) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); R.pset(x + 1, y + 1, c); } };
const polilla = (x, y, t) => { x = Math.round(x); y = Math.round(y); const al = Math.floor(t * 14) % 2; R.pset(x, y, hex('#5a4a3a')); R.pset(x - 1, y - al, hex('#e8dcc0')); R.pset(x + 1, y - al, hex('#e8dcc0')); R.pset(x - 2, y - al * 2, hex('#c8b890')); R.pset(x + 2, y - al * 2, hex('#c8b890')); };

// ── 1 · el libro se abre ──
const p1 = (t) => {
  const ABRE = a(2.55), ab = t < ABRE ? 0 : lerp(0.03, 1, tramo(t, ABRE, ABRE + 0.45) * 0.28 + sua(tramo(t, ABRE + 0.45, P2)) * 0.72);
  const o = { encuadre: 'libro', abierto: ab };
  const g = T.insertos(R, t, o);
  // antes de abrirse, la tapa late: un filo de luz que la recorre dos veces
  if (t < ABRE) { const u = (t / 1.2) % 1, x = Math.round(lerp(106, 214, u)); for (let y = 64; y <= 132; y++) for (let i = 0; i < 5; i++) mez(x + i - (y - 64) * 0.25, y, ORO, 0.34 - i * 0.06); }
  // dos polillas rondan las llamas
  polilla(38 + Math.sin(t * 2.3) * 13, 48 + Math.cos(t * 3.1) * 8, t); polilla(282 + Math.cos(t * 1.9) * 12, 56 + Math.sin(t * 2.7) * 9, t + 0.3);
  // motas de luz que suben del libro al abrirse
  if (t >= ABRE) for (let k = 0; k < 14; k++) { const d = (t - ABRE) * 0.7 - k * 0.09; if (d < 0 || d > 1) continue; const x = 160 + Math.sin(k * 2.4) * (20 + d * 52), y = 96 - d * 58 - (k % 3) * 4; destello(Math.round(x), Math.round(y), d < 0.5 ? 2 : 1, k % 2 ? ORO : hex('#ffffff')); }
  T.insertosDelante(R, t, o);
  globo(232, 34, a(3.3), t, (x, y) => { R.icono('?', x - 4, y - 8, hex('#7a2e2e'), hex('#d8d2c0'), 2); });
};

// ── 2 · el astillero: el barco se levanta solo ──
const GOLPES = [4.55, 5.25, 5.9, 6.6, 7.25, 7.9];
const p2 = (t) => {
  const ob = lerp(0.2, 1, tramo(t, P2, a(9.2))), nb = sua(tramo(t, a(7.6), a(9.5)));
  const o = { encuadre: 'astillero', obra: ob, nubes: nb };
  T.relato(R, t, o);
  // cada tabla que encaja: polvo de serrín en el costado
  GOLPES.forEach((s, k) => { const d = t - a(s); if (d < 0 || d > 0.5) return; const x = 70 + ((k * 67) % 190), y = 84 + ((k * 23) % 44);
    for (let j = 0; j < 7; j++) { const an = j * 0.9 + k, r = 3 + d * 22; R.pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r * 0.6 + d * d * 20), j % 2 ? hex('#f0d8a0') : hex('#c8a060')); }
    if (d < 0.12) destello(x, y, 3, hex('#fff2c0')); });
  // el aviso: un relámpago lejano en el frente de tormenta
  const dr = t - a(9.02);
  if (dr >= 0 && dr < 0.42 && (dr < 0.1 || (dr > 0.2 && dr < 0.3))) { const pts = [[26, 22], [30, 38], [24, 42], [31, 60], [26, 64], [33, 86]];
    for (let i = 1; i < pts.length; i++) { R.linea(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], hex('#ffffff')); R.linea(pts[i - 1][0] + 1, pts[i - 1][1], pts[i][0] + 1, pts[i][1], hex('#fff0a0')); }
    for (let y = 16; y < 100; y += 1) for (let x = (y % 2); x < 120; x += 2) mez(x, y, hex('#ffffff'), 0.16 * (1 - x / 120)); }
  // los pájaros huyen del frente (de izquierda a derecha, bajos)
  const hu = tramo(t, a(8.3), P3 + 0.5);
  if (hu > 0) for (let k = 0; k < 6; k++) { const x = Math.round(-10 + hu * 250 - k * 17 + (k % 2) * 6), y = Math.round(40 + (k * 7) % 22 - hu * 14 + Math.sin(t * 3 + k) * 2), al = Math.floor(t * 9 + k) % 2;
    if (x < 2 || x > 270) continue; R.pset(x, y, K); R.pset(x - 1, y - (al ? 1 : -1), K); R.pset(x + 1, y - (al ? 1 : -1), K); R.pset(x - 2, y - (al ? 2 : -1), K); R.pset(x + 2, y - (al ? 2 : -1), K); }
  T.relatoDelante(R, t, o);
};

// ── 3 · la medida ──
const p3 = (t) => {
  const rg = lerp(0, 0.95, sua(tramo(t, a(10.0), a(12.0)))) + 0.05 * tramo(t, a(12.0), a(12.1)), cp = sua(tramo(t, a(13.3), a(14.3)));
  const o = { encuadre: 'medida', regla: rg, compara: cp };
  const g = T.insertos(R, t, o);
  // mientras se tiende: la punta brilla y una etiqueta cuenta los codos (0…300)
  if (rg > 0.01 && rg < 0.96 && g.reglaPunta) { const x = Math.round(g.reglaPunta[0]), y = Math.round(g.reglaPunta[1]), n = Math.round(rg / 0.95 * 30) * 10, tx = Math.min(236, Math.max(70, x));
    destello(x, y, 2 + Math.floor(t * 12) % 2, ORO);
    R.rect(tx - 15, 113, tx + 15, 127, K); R.rect(tx - 14, 114, tx + 14, 126, BL); R.poligono([[tx - 3, 113], [tx + 3, 113], [tx, 109]], K); R.numero(String(n), tx, 124, { centro: true, sombra: false, color: ROJO }); }
  // «300»: un subrayado que se abre bajo la cifra y dos marcas que bajan de proa y popa a la regla
  const d3 = t - a(12.1);
  if (d3 >= 0) { const w = Math.round(sua(Math.min(1, d3 / 0.35)) * 22); if (t < a(13.7)) R.rect(105, 127, 105 + w, 128, ROJO);
    for (const x of [53, 233]) for (let y = 98 + Math.floor(t * 6) % 2; y < 104; y += 2) R.pset(x, y, ROJO); }
  // «140»: el otro lado de la cuenta
  const d4 = t - a(13.87);
  if (d4 >= 0 && d4 < 1.2) { const w = Math.round(sua(Math.min(1, d4 / 0.3)) * 22); R.rect(158, 127, 158 + w, 128, hex('#2e5a8a')); }
  // un cursor recorre el campo de punta a punta: la misma longitud
  const cu = tramo(t, a(14.3), P4 - 0.2);
  if (cp >= 1) { const x = Math.round(lerp(30, 171, sua(cu))); for (let i = 30; i < x; i += 2) R.rect(i, 145, i, 146, ROJO); R.poligono([[x - 4, 151], [x + 4, 151], [x, 144]], K); R.poligono([[x - 2, 150], [x + 2, 150], [x, 146]], ORO); }
  T.insertosDelante(R, t, o);
};

// ── 4 · gag 3: la fila espera al caracol ──
const p4 = (t) => {
  const PARA = b(18.35), fl = lerp(0.22, 0.43, tramo(t, P4, PARA)), esp = t >= PARA;
  const o = { encuadre: 'astillero', camara: 'fila', fila: fl, espera: esp, caracol: esp ? tramo(t, PARA, P5) * 0.25 : 0, lluvia: lerp(0, 0.5, tramo(t, b(19.1), P5)) };
  const g = T.relato(R, t, o);
  T.relatoDelante(R, t, o);
  // sobre el caracol: sus puntos suspensivos, uno a uno; y, cuando todos le miran, la gota de apuro
  if (g.caracol) { const [cx, cy] = g.caracol, x = Math.max(20, Math.round(cx) + 6), y = Math.round(cy) - 28;
    if (esp) { const d = t - PARA, n = Math.min(3, 1 + Math.floor(d / 0.32));
      R.rect(x - 15, y - 9, x + 15, y + 5, K); R.rect(x - 16, y - 8, x + 16, y + 4, K); R.rect(x - 15, y - 8, x + 15, y + 4, BL); R.rect(x - 15, y + 3, x + 15, y + 4, hex('#d8d2c0')); R.poligono([[x - 5, y + 5], [x - 2, y + 12], [x + 3, y + 5]], K); R.poligono([[x - 4, y + 4], [x - 2, y + 10], [x + 2, y + 4]], BL);
      for (let i = 0; i < Math.min(3, n); i++) R.rect(x - 10 + i * 8, y - 4, x - 7 + i * 8, y - 1, K);
      const gx = Math.round(cx) + 12, gy = Math.round(cy) - 12 + Math.round(((d * 1.6) % 1) * 6); R.pset(gx, gy - 1, hex('#bfe6ff')); R.rect(gx - 1, gy, gx + 1, gy + 1, hex('#8ecbf0')); R.pset(gx, gy + 2, hex('#8ecbf0')); }
  }
  // los que esperan: un «!» sobre la pareja de cabeza cuando se vuelven
  if (esp && t < PARA + 0.9 && g.parejas) { const c = g.parejas.filter((q) => !q.dentro && q.x > 60 && q.x < 240).slice(0, 2); c.forEach((q, i) => { const d = t - PARA - i * 0.12; if (d < 0) return; R.icono('!', Math.round(q.x) - 2, Math.round(q.y) - 34 - Math.round(Math.max(0, 4 * Math.sin(d * 12) * Math.exp(-d * 4))), ROJO, K, 1); }); }
};

// ── 5 · cuarenta días y cuarenta noches ──
const p5 = (t) => {
  const BAJA = b(22.0), sec = sua(tramo(t, BAJA, b(23.5)));
  const o = { encuadre: 'diluvio', lluvia: lerp(1, 0.08, sec), calma: lerp(0, 0.62, sec), cumbres: lerp(0, 0.5, sua(tramo(t, b(22.4), P6))), paloma: lerp(0, 0.42, tramo(t, b(23.3), P6 + 0.25)) };
  const g = T.relato(R, t, o);
  T.relatoDelante(R, t, o);
  // relámpago del principio
  const dr = t - (P5 + 0.35); if (dr >= 0 && dr < 0.3 && (dr < 0.08 || dr > 0.18)) { const pts = [[262, 16], [256, 34], [264, 38], [254, 60], [261, 63], [252, 92]]; for (let i = 1; i < pts.length; i++) { R.linea(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], hex('#ffffff')); R.linea(pts[i - 1][0] + 1, pts[i - 1][1], pts[i][0] + 1, pts[i][1], hex('#e8f0ff')); } }
  // el marcador: 1…40, con el sol y la luna que se turnan
  const cu = tramo(t, P5 + 0.2, b(21.55)), n = Math.max(1, Math.round(sua(cu) * 40)), fin = cu >= 1, sale = 1 - sua(tramo(t, b(22.6), b(23.2)));
  if (sale > 0) { const oy = Math.round((1 - sale) * -44), x0 = 34, y0 = 28 + oy, x1 = 108, y1 = 58 + oy, pul = fin && t - b(21.55) < 0.25 ? 1 : 0;
    R.rect(x0 - pul, y0 + 1 - pul, x1 + pul, y1 - 1 + pul, K); R.rect(x0 + 1 - pul, y0 - pul, x1 - 1 + pul, y1 + pul, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#f2e6c4')); R.rect(x0 + 1, y1 - 3, x1 - 1, y1 - 1, hex('#d8c698')); R.rect(x0 + 2, y0 + 2, x1 - 2, y0 + 2, hex('#fffaf0'));
    for (const x of [x0 + 8, x1 - 8]) { R.rect(x - 1, y0 - 5, x + 1, y0 + 3, K); R.pset(x, y0 - 4, hex('#c8ccd8')); R.pset(x, y0 - 2, hex('#c8ccd8')); R.pset(x, y0, hex('#c8ccd8')); }   // las anillas
    const dia = fin ? Math.floor(t * 1.6) % 2 === 0 : n % 2 === 1, sx = x0 + 17, sy = y0 + 16;
    if (dia) { R.disco(sx, sy, 7, K); R.disco(sx, sy, 6, hex('#ffc83a')); R.disco(sx - 1, sy - 1, 3, hex('#ffe890')); for (let k = 0; k < 8; k++) { const an = k * 0.785 + t; R.pset(Math.round(sx + Math.cos(an) * 9), Math.round(sy + Math.sin(an) * 9), hex('#e89a20')); } }
    else { R.disco(sx, sy, 7, K); R.disco(sx, sy, 6, hex('#dfe6f6')); R.disco(sx + 3, sy - 2, 5, hex('#2a3460')); R.pset(sx + 5, sy - 5, hex('#ffffff')); R.pset(sx + 7, sy + 2, hex('#ffffff')); }
    R.numero(String(n), x0 + 50, y1 - 8, { centro: true, tam: 16, sombra: false, color: fin ? hex('#7a2e2e') : hex('#3a3a4a') }); }
  // la paloma que sale: una estela corta de puntos tras ella
  if (g.paloma) { const [px, py] = g.paloma; for (let i = 1; i <= 4; i++) if ((i + Math.floor(t * 8)) % 2) R.pset(Math.round(px - 10 - i * 5), Math.round(py - 6 + i), hex('#ffffff')); }
};

// ── 6 · la paloma, la hoja y el arcoíris ──
const p6 = (t) => {
  const ar = sua(tramo(t, b(27.3), b(29.3)));
  const o = { encuadre: 'cielo', arco: ar };
  const g = T.vistas(R, t, o);
  T.vistasDelante(R, t, o);
  const [bx, by] = g.barco ?? [236, 151];
  // la paloma vuelve desde la derecha, de cerca (3×), se queda aleteando y, al final, baja al barco
  const llega = sua(tramo(t, P6, b(26.2))), baja = sua(tramo(t, b(29.1), b(30.45)));
  let x = lerp(352, 168, llega) - sua(tramo(t, b(26.2), b(29.1))) * 22, y = lerp(84, 124, llega) + Math.sin(t * 2.6) * 3 - Math.sin(llega * Math.PI) * 12, s = 3, dir = -1;
  if (baja > 0) { dir = 1; s = baja < 0.4 ? 3 : baja < 0.75 ? 2 : 1; x = lerp(146, bx - 2, baja); y = lerp(124, by - 12, baja) - Math.sin(baja * Math.PI) * 26; }
  PZ.paloma(R, Math.round(x), Math.round(y), { t: baja >= 1 ? undefined : t, dir, hoja: true, s });
  // la hoja: un destello cuando la voz la nombra
  const dh = t - b(25.8); if (dh >= 0 && dh < 0.9 && baja === 0) { const r = dh < 0.15 ? 5 : dh < 0.3 ? 3 : 1 + Math.floor(t * 10) % 2; destello(Math.round(x) - 28, Math.round(y) - 22, r, hex('#eaffc0')); }
  // la punta del arco brilla mientras se traza
  if (ar > 0.01 && ar < 0.99 && g.arco?.punta) destello(Math.round(g.arco.punta[0]), Math.round(g.arco.punta[1]), 3 + Math.floor(t * 12) % 2);
};
const efectos = [[a(2.6), 'papel'], [a(3.3), 'pop'],
  [a(4.55), 'toc'], [a(5.9), 'toc'], [a(7.25), 'toc'], [a(9.02), 'trueno'],
  [a(10.5), 'whoosh'], [a(12.05), 'golpecito'], [a(13.87), 'pop'],
  [b(18.4), 'boing'], [b(19.2), 'lluvia'],
  [P5 + 0.35, 'trueno'], [b(21.55), 'toc'], [b(22.2), 'ola'], [b(23.4), 'whoosh'],
  [b(25.8), 'brillo'], [b(27.35), 'campana']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 2026 });
''')

E['nx-montes'] = ('Los montes', '''// NX-MONTES (frases 9–10), sin fecha (barra en 2026). A Noé / Nuh NO se le dibuja: ningún personaje (solo el pastor
// diminuto que trae el decorado de la ladera, de fondo, en el plano 6); nadie toca los libros. Los tres libros, cerrados y con el mismo trato (mismo halo, mismo barquito). Seis planos:
// 1. los libros sobre el paño: dos comparten el relato (el mismo halo para cada uno y un globo con el barco entre los
//    dos); en «the Quran» llega el tercero, igual de grande, y recibe el mismo halo;
// 2. el tercero, de cerca, con la misma luz: de él sale su propio globo con el barco («tells its own») y en «great
//    prophets» se encienden una a una seis lamparillas iguales sobre el paño;
// 3. el Ararat al atardecer, desde dentro de la forma: el barquito-icono llega volando hacia la cumbre (un aro la marca),
//    en «does not» el aro se vuelve «X» y el barquito se da la vuelta y se va por abajo, al sur, dejando sus puntos;
// 4. el mapa: el barquito entra por arriba, pasa de largo junto al Ararat y sigue al sur mientras el mapa se abre (su
//    estela de puntos va pegada al mapa); al llegar al Judi cae el alfiler («south») y un aro a trazos late en el nudo
//    de fronteras, que se recorren una a una cuando la voz las nombra («Syria», «Iraq»);
// 5. la mesa de Atom: dos montes de papel doblado a los lados de la pecera (uno alto y nevado a lápiz, otro bajo, de
//    estraza); el barquito va hacia uno (flecha), luego hacia el otro, y se queda en medio con su «?»; el pez y el gato
//    lo siguen con los ojos; en «And Genesis» el libro abierto de la mesa destella y el gato se vuelve a mirarlo;
// 6. la ladera al atardecer: un aro (y un «1») en UN solo pico («Mount Ararat») que se apaga en «but»; de la cumbre sale
//    una línea de puntos que rodea toda la cordillera, cae un banderín igual en cada cumbre (cuatro) y, en «a whole region», el
//    interior del lazo se raya con un rayado que camina.''', r'''
const a = (s) => en('coran', (s - 0.5) / 15.477), b = (s) => en('judi', (s - 16.853) / 13.334);   // s: el segundo de la voz inglesa
const K = T.C.k, PZ = T.PIEZAS_NX, BL = hex('#f6f2e6'), ROJO = hex('#d23a2e'), ORO = hex('#ffd86a'), GRANATE = hex('#7a2e2e');
const P2 = a(4.8), P3 = a(9.71), P4 = a(15.19), P5 = b(22.01), P6 = b(26.42);
const sua = (u) => u * u * (3 - 2 * u);
const mez = (x, y, c, f) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; const p = R.pget(x, y); const m = (s) => Math.round(((p >>> s) & 255) * (1 - f) + ((c >>> s) & 255) * f); R.pset(x, y, (0xff000000 | (m(16) << 16) | (m(8) << 8) | m(0)) >>> 0); };
const destello = (x, y, r, c = hex('#ffffff')) => { for (let i = -r; i <= r; i++) { R.pset(x + i, y, c); R.pset(x, y + i, c); } if (r > 2) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 1, y + 1, c); R.pset(x + 1, y + 1, c); } };
const bote = (d) => -Math.round(Math.max(0, 5 * Math.sin(d * 11) * Math.exp(-d * 5)));
// un globo ovalado con el barco dentro, meciéndose sobre dos olas; picos = [[x, y], …] hacia donde apunta
const globoBarco = (x, y, t0, t, picos, s = 1) => { if (t < t0) return; const d = t - t0; y += bote(d); const rx = 15 * s, ry = 11 * s;
  const elip = (ex, ey, c) => { for (let j = -ey; j <= ey; j++) { const w = Math.round(ex * Math.sqrt(1 - (j * j) / (ey * ey))); R.rect(x - w, y + j, x + w, y + j, c); } };
  const pb = (px) => x + Math.round(Math.max(-rx * 0.55, Math.min(rx * 0.55, (px - x) * 0.7)));
  for (const [px, py] of picos) { const q = pb(px); R.poligono([[q - 4 * s - 1, y + ry - 4], [px, py], [q + 4 * s + 1, y + ry - 4]], K); }
  elip(rx + 1, ry + 1, K); elip(rx, ry, BL);
  for (const [px, py] of picos) { const q = pb(px), ux = px - q, uy = py - (y + ry), n = Math.hypot(ux, uy); R.poligono([[q - 4 * s + 1, y + ry - 5], [Math.round(px - ux / n * 3), Math.round(py - uy / n * 3)], [q + 4 * s - 1, y + ry - 5]], BL); }
  const by = y + 5 * s + Math.round(Math.sin(t * 3) * 0.8);
  PZ.barquito(R, x, by, { s });
  for (let i = -rx + 4; i <= rx - 4; i++) { const w = Math.round(Math.sin(i * 0.9 / s + t * 4)); R.pset(x + i, by + 1 + w, hex('#4a8ac8')); if (Math.abs(i) < rx - 7) R.pset(x + i, by + 3 * s - w, hex('#8ecbf0')); } };
// el halo de un libro: el MISMO para los tres (un marco de puntos de luz que se abre y se apaga)
const halo = (cx, y0, y1, hw, d) => { if (d < 0 || d > 1.3) return; const g = Math.round(sua(Math.min(1, d / 0.3)) * 5), f = d < 0.9 ? 1 : 1 - (d - 0.9) / 0.4;
  for (let k = 0; k < 2; k++) { const e = g + k * 2, x0 = cx - hw - e, x1 = cx + hw + e, ya = y0 - e, yb = y1 + e;
    for (let x = x0; x <= x1; x++) if ((x + k) % 2 === 0) { mez(x, ya, ORO, f * (k ? 0.5 : 0.9)); mez(x, yb, ORO, f * (k ? 0.5 : 0.9)); }
    for (let y = ya; y <= yb; y++) if ((y + k) % 2 === 0) { mez(x0, y, ORO, f * (k ? 0.5 : 0.9)); mez(x1, y, ORO, f * (k ? 0.5 : 0.9)); } }
  if (d < 0.5) { destello(cx - hw - g, y0 - g, 3); destello(cx + hw + g, y0 - g, 3); } };

// ── 1 · dos libros… y el tercero ──
const p1 = (t) => {
  const LLEGA = a(2.6), o = { encuadre: 'diluvio', camara: 'libros', cuantos: 2 + sua(tramo(t, LLEGA, a(3.5))) };
  const g = T.relato(R, t, o);
  halo(92, 81, 138, 22, t - a(0.5)); halo(160, 81, 138, 22, t - a(0.86)); halo(228, 81, 138, 22, t - a(3.62));
  // «share that story»: un solo barco para los dos
  if (t < LLEGA + 0.2) globoBarco(126, 44, a(1.2), t, [[102, 79], [150, 79]], 2);
  else if (t < LLEGA + 0.32) globoBarco(126, 44, -9, t, [], 1);   // se encoge y se va: llega el tercero
  T.relatoDelante(R, t, o);
};

// ── 2 · el tercero, de cerca ──
const VELAS = [66, 84, 102, 222, 240, 258];
const p2 = (t) => {
  const o = { encuadre: 'librocerca', cual: 'luna' };
  const g = T.vistas(R, t, o);
  // las lamparillas, todas iguales: se encienden una a una en «one of the great prophets»
  VELAS.forEach((x, k) => { const y = 166, on = t - a(7.5 + k * 0.24);
    R.rect(x - 5, y, x + 5, y + 2, K); R.rect(x - 4, y, x + 4, y + 1, hex('#c89a3a')); R.rect(x - 3, y, x + 2, y, ORO); R.rect(x - 3, y - 7, x + 3, y - 1, K); R.rect(x - 2, y - 6, x + 2, y - 1, hex('#f2ead2')); R.rect(x + 1, y - 6, x + 2, y - 1, hex('#d0c4a4')); R.rect(x, y - 9, x, y - 7, K);
    if (on >= 0) { const f = Math.floor(t * 9 + k * 1.7) % 3, h = on < 0.15 ? 2 : 4 + (f === 0 ? 1 : 0), dx = f === 2 ? 1 : 0;
      for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) if (i * i + j * j <= 81 && (i + j) % 2 === 0) mez(x + i, y - 11 + j, ORO, 0.22 * (1 - Math.hypot(i, j) / 9.5));
      R.rect(x - 1, y - 9 - h, x + 1, y - 9, hex('#ff9a2a')); R.pset(x + dx, y - 10 - h, hex('#ff9a2a')); R.rect(x, y - 8 - h + 1, x, y - 9, hex('#fff2a0')); if (on < 0.2) destello(x, y - 12, 3); } });
  T.vistasDelante(R, t, o);
  // «tells its own»: su propio barco, en un globo que sale del libro
  globoBarco(242, 72, P2 + 0.25, t, [[212, 100]], 2);
};

// ── 3 · no en el Ararat ──
const barcoIcono = (x, y, t, s = 2) => { x = Math.round(x); y = Math.round(y) + Math.round(Math.sin(t * 3.2) * 1.5); const w = Math.round(9.5 * s);
  for (let i = -w + 2; i <= w - 2; i++) if ((i + 100) % 2 === 0) mez(x + i, y + 3, K, 0.25);
  PZ.barquito(R, x, y, { s }); };
const p3 = (t) => {
  const o = { encuadre: 'ladera', camara: 'cerca', epoca: 1959, hora: 'tarde' };
  const g = T.ladera(R, t, o);
  const NO = a(12.19), VA = a(13.5), CX = 204, CY = 16;
  // la ruta: llega desde la izquierda hacia la cumbre, se queda a su lado, y luego baja y sale por abajo (el sur)
  const ida = sua(tramo(t, P3 + 0.1, a(11.7))), vu = sua(tramo(t, VA, P4 + 0.3));
  const ruta1 = (u) => [lerp(-24, 146, u), lerp(74, 42, u) - Math.sin(u * Math.PI) * 16], ruta2 = (u) => [lerp(146, 114, u) + Math.sin(u * Math.PI) * 26, lerp(42, 200, u * u)];
  const [bx, by] = vu > 0 ? ruta2(vu) : ruta1(ida);
  // la estela de puntos
  for (let i = 0; i < 40; i++) { const u = i / 40; if (u < ida - 0.06 && vu === 0 && i % 2 === 0) { const [x, y] = ruta1(u); R.rect(Math.round(x), Math.round(y) - 8, Math.round(x) + 1, Math.round(y) - 7, BL); } }
  if (vu > 0) for (let i = 0; i < 40; i++) { const u = i / 40; if (u < vu - 0.05 && i % 2 === 0) { const [x, y] = ruta2(u); R.rect(Math.round(x) - 1, Math.round(y) - 9, Math.round(x) + 1, Math.round(y) - 7, K); R.rect(Math.round(x), Math.round(y) - 8, Math.round(x) + 1, Math.round(y) - 8, ROJO); } }
  // la cumbre: el aro del «aquí»… que en «not» se vuelve una X
  if (t > a(11.0) && t < NO) { const r = 9 + Math.round(Math.sin(t * 8)); for (let k = 0; k < 28; k++) if ((k + Math.floor(t * 10)) % 4 < 3) { const an = k / 28 * 6.283; R.disco(Math.round(CX + Math.cos(an) * r), Math.round(CY + 6 + Math.sin(an) * r * 0.8), 1, ROJO); } }
  if (t >= NO) { const d = t - NO, e = d < 0.12 ? 1 : 0; R.icono('X', CX - 8 - e, CY - 4 - e + 1, K, K, 3); R.icono('X', CX - 7, CY - 4 + 1, K, K, 3); R.icono('X', CX - 8, CY - 4, ROJO, K, 3); }
  barcoIcono(bx, by, t);
  // la flecha que señala el sur cuando se va
  if (vu > 0.15 && vu < 0.95) { const y = 150 + Math.floor(t * 6) % 3; R.poligono([[104, y], [124, y], [114, y + 12]], K); R.poligono([[107, y + 1], [121, y + 1], [114, y + 10]], ROJO); R.rect(110, y - 12, 118, y, K); R.rect(111, y - 11, 117, y, ROJO); }
  T.laderaDelante(R, t, o);
};

// ── 4 · el Judi, mucho más al sur ──
const KM = ([lo, la]) => [(lo - 44.3) * 86, (39.7 - la) * 111];   // la misma cuenta del mapa: km desde el Ararat
const TRI = KM([42.36, 37.11]), SIRIA = [[42.36, 37.11], [42.2, 37.3], [41.5, 37.1], [40.8, 37.1], [40.0, 36.8]].map(KM), IRAK = [[42.36, 37.11], [42.6, 37.25], [43.0, 37.35], [43.6, 37.25], [44.2, 37.15], [44.8, 37.17]].map(KM), SUR = [[42.36, 37.11], [42.2, 36.6], [41.4, 36.5], [41.2, 35.6]].map(KM);
const VIAJE = [[-72, -4], [-36, 26], [-36, 92], [-74, 172], [-159, 247]];
const cr = (pts, u) => { const n = pts.length - 1, x = Math.max(0, Math.min(0.9999, u)) * n, k = Math.floor(x), f = x - k, p = (i) => pts[Math.max(0, Math.min(n, i))];
  const c = (d) => { const q0 = p(k - 1)[d], q1 = p(k)[d], q2 = p(k + 1)[d], q3 = p(k + 2)[d]; return 0.5 * (2 * q1 + (q2 - q0) * f + (2 * q0 - 5 * q1 + 4 * q2 - q3) * f * f + (3 * q1 - q0 - 3 * q2 + q3) * f * f * f); };
  return [c(0), c(1)]; };
let TLL = b(18.4); for (let tt = b(16.9); tt < b(19.0); tt += 0.02) { const j = sua(sua(tramo(tt, b(16.9), b(19.0)))); if (lerp(60, 34, j) + 247 * 1.3 * Math.pow(0.4 / 1.3, j) <= 152) { TLL = tt; break; } }   // cuándo entra el Judi en cuadro
const p4 = (t) => {
  const jd = sua(tramo(t, b(16.9), b(19.0))), ENTRA = P4 + 0.15, PIN = b(18.79);
  const o = { encuadre: 'mapa', regla: 0, judi: jd };
  const g = T.papeles(R, t, o), P = (q) => { const [x, y] = g.P(q[0], q[1]); return [Math.round(x), Math.round(y)]; };
  R.recorte(g.marco);
  // el barquito llega por arriba (venía del plano anterior), pasa de largo junto al Ararat y sigue al sur con el mapa
  // (va por delante de la cámara, pegado al borde de abajo, hasta que el Judi entra en cuadro: ahí se posa y deja su sitio al barquito del mapa)
  let u = t < b(16.9) ? 0.3 * sua(tramo(t, ENTRA + 0.1, b(16.8))) : 0.3 + 0.7 * tramo(jd, 0, 0.5);
  while (u > 0.3 && P(cr(VIAJE, u))[1] > 152) u -= 0.004;
  const llega = t >= TLL + 0.25;
  for (let i = 0; i <= 66; i += 3) { const v = i / 66; if (v > u - 0.03) break; const [x, y] = P(cr(VIAJE, v)); R.disco(x, y, 1, K); R.pset(x, y, ROJO); R.pset(x - 1, y, ROJO); }
  if (t >= ENTRA && !llega) { const [x, y] = P(cr(VIAJE, u)); barcoIcono(x, y + bote(t - ENTRA), t); }
  const [jx, jy] = P([-159, 259]);
  // llega al Judi: un destello sobre su barquito y cae el alfiler
  { const d = t - TLL - 0.1; if (d >= 0 && d < 0.5) destello(jx, jy - 12, d < 0.15 ? 7 : d < 0.3 ? 5 : 2 + Math.floor(t * 12) % 2); }
  if (t > PIN - 0.3) T.chincheta(R, jx + 11, jy + 2, t, ROJO, { baja: tramo(t, PIN - 0.3, PIN) });
  // las fronteras: un aro a trazos que late en el nudo, y cada frontera que se recorre cuando la voz la nombra
  const [tx, ty] = P(TRI), dn = t - b(20.07);
  const marcha = (pts, t0, largo) => { const d = t - t0; if (d < 0) return; const f = Math.min(1, d / 0.45) * largo, S = pts.map(P); let L = 0;
    for (let i = 1; i < S.length; i++) { const [x0, y0] = S[i - 1], [x1, y1] = S[i], l = Math.max(1, Math.hypot(x1 - x0, y1 - y0));
      for (let k = 0; k < l; k++) { const q = L + k; if (q > f) return; const x = Math.round(x0 + (x1 - x0) * k / l), y = Math.round(y0 + (y1 - y0) * k / l), on = Math.floor(q - t * 14 + 4000) % 6 < 3;
        if (d < 0.5) { R.pset(x, y - 1, BL); R.pset(x, y + 1, BL); }
        R.pset(x, y, on ? hex('#1e2a5a') : ORO); if (on) R.pset(x, y + 1, hex('#1e2a5a')); }
      L += l; } };
  marcha(SIRIA, b(20.57), 64); marcha(IRAK, b(21.17), 64); marcha(SUR, b(21.17) + 0.15, 40);
  if (dn >= 0) { const r = Math.round(sua(Math.min(1, dn / 0.3)) * 9) + (dn < 1 ? Math.round(Math.sin(dn * 12) * 1.2 * (1 - dn)) : 0);
    for (let k = 0; k < 32; k++) if ((k + Math.floor(t * 9)) % 4 < 2) { const an = k / 32 * 6.283, x = Math.round(tx + Math.cos(an) * r), y = Math.round(ty + Math.sin(an) * r); R.pset(x, y, K); R.pset(x + 1, y, K); R.pset(x, y + 1, K); R.pset(x + 1, y + 1, ROJO); }
    if (dn < 0.3) destello(tx, ty, 4, BL); }
  R.recorte(null);
  T.papelesDelante(R, t, o);
};

// ── 5 · ni los libros señalan el mismo monte ──
const PA = hex('#fbf8ee'), PS = hex('#d9d4c2'), PD = hex('#a9a390'), LAP = hex('#5a7ab8');
// un monte de papel doblado sobre la mesa: 'alto' (un pico grande nevado a lápiz y su hermano) o 'ancho' (bajo y de dos lomas)
const montePapel = (cx, base, forma) => {
  for (let j = 0; j < 4; j++) for (let i = -30 + j * 3; i <= 34 - j * 2; i++) if ((i + j) % 2 === 0) mez(cx + i, base + 1 + j, K, 0.4);
  const cara = (pts, c) => R.poligono(pts.map(([x, y]) => [cx + x, base + y]), c);
  const filo = (pts) => { for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.poligono(pts.map(([x, y]) => [cx + x + dx, base + y + dy]), K); };
  if (forma === 'alto') {
    filo([[4, 0], [17, -19], [28, 0]]); cara([[4, 0], [17, -19], [19, 0]], PA); cara([[19, 0], [17, -19], [28, 0]], PS);
    filo([[-25, 0], [-4, -39], [17, 0]]); cara([[-25, 0], [-4, -39], [-1, 0]], PA); cara([[-1, 0], [-4, -39], [17, 0]], PS); R.linea(cx - 4, base - 38, cx - 1, base - 1, PD);
    const z = [[-11, -25], [-8, -28], [-6, -24], [-3, -28], [-1, -24], [2, -27]]; for (let i = 1; i < z.length; i++) R.linea(cx + z[i - 1][0], base + z[i - 1][1], cx + z[i][0], base + z[i][1], LAP);
    R.linea(cx - 16, base - 8, cx - 12, base - 8, PS); R.linea(cx - 12, base - 14, cx - 9, base - 14, PS); R.pset(cx - 4, base - 38, hex('#ffffff'));
  } else {
    const s = [[-29, 0], [-13, -21], [-3, -16], [9, -25], [29, 0]];
    const A2 = hex('#f4dc98'), S2 = hex('#d2b266'), D2 = hex('#9a7c3a');   // papel de estraza: se separa de las hojas blancas de detrás
    filo(s); cara(s, A2); cara([[9, -25], [29, 0], [12, 0]], S2); cara([[-13, -21], [-3, -16], [-8, 0]], S2); R.linea(cx + 9, base - 24, cx + 12, base - 1, D2); R.linea(cx - 13, base - 20, cx - 8, base - 1, D2); R.linea(cx - 28, base, cx + 28, base, D2);
    for (const [x, y] of [[-20, -5], [-16, -10], [0, -7], [4, -13], [-2, -3]]) { R.pset(cx + x, base + y, D2); R.pset(cx + x + 1, base + y - 1, D2); R.pset(cx + x + 2, base + y, D2); }
  } };
const flecha = (x, y) => { R.poligono([[x - 6, y], [x + 6, y], [x, y + 8]], K); R.rect(x - 3, y - 7, x + 3, y, K); R.poligono([[x - 4, y + 1], [x + 4, y + 1], [x, y + 6]], ROJO); R.rect(x - 2, y - 6, x + 2, y + 1, ROJO); R.rect(x - 2, y - 6, x - 2, y, hex('#ff7a6a')); };
const p5 = (t) => {
  const A1 = b(22.65), A2 = b(23.5), A3 = b(24.4), Q = b(24.45), GEN = b(25.1);
  const off = t < A2 ? -15 * sua(tramo(t, A1, A1 + 0.6)) : t < A3 ? lerp(-15, 15, sua(tramo(t, A2 + 0.1, A2 + 0.75))) : lerp(15, 0, sua(tramo(t, A3 + 0.2, A3 + 1.0))) + Math.sin((t - A3) * 2.4) * 4 * tramo(t, A3 + 1.0, A3 + 1.4);
  const yendo = t < A1 ? 0 : t < A2 + 0.1 ? -1 : t < A3 + 0.2 ? 1 : 0;
  const o = { encuadre: 'estudio', camara: 'mesa', pez: true, pezDir: yendo || (off >= 0 ? -1 : 1), mira: t >= Q && t < GEN + 0.6, gatoMira: t >= GEN ? lerp(off / 16, -1, sua(tramo(t, GEN, GEN + 0.35))) : Math.max(-1, Math.min(1, off / 14)) };
  const g = T.hoy(R, t, o), ag = g.agua ?? [160, 109];
  const bq = T.g_barquito(R, ag[0] + Math.round(off), ag[1], 22, t, {});
  montePapel(100, 171, 'alto'); montePapel(226, 170, 'ancho');
  if (yendo) { const dy = Math.round(Math.abs(Math.sin(t * 7)) * 3); if (yendo < 0) flecha(96, 110 + dy); else flecha(230, 124 + dy); }
  T.hoyDelante(R, t, o);
  // «…the same mountain»: no sabe en cuál posarse
  if (t >= Q) { const d = t - Q, x = 196, y = 56 + bote(d), cx = ag[0] + Math.round(off) + 6;
    R.disco(x, y, 13, K); R.poligono([[x - 10, y + 7], [cx, 82], [x - 1, y + 12]], K); R.disco(x, y, 12, BL); R.poligono([[x - 8, y + 7], [cx + 1, 80], [x - 2, y + 10]], BL);
    for (let i = -8; i <= 8; i++) R.pset(x + i, y + 11 - Math.round(Math.abs(i) * 0.4), hex('#d8d2c0'));
    R.icono('?', x - 4, y - 8, GRANATE, hex('#d8d2c0'), 2); }
  // «And Genesis…»: el libro abierto de la mesa pide la palabra (dos destellos) y el gato se vuelve hacia él
  if (t >= GEN) { const d = t - GEN; if (d < 1.2) { destello(40, 120, d < 0.15 ? 5 : 2 + Math.floor(t * 10) % 2, ORO); destello(74, 127, 1 + Math.floor(t * 8) % 3, hex('#ffffff')); } }
};

// ── 6 · los montes de Ararat ──
const LAZO = [[208, 7], [224, 11], [240, 24], [256, 35], [268, 40], [280, 47], [298, 50], [313, 57], [314, 64], [300, 67], [240, 68], [160, 71], [80, 73], [22, 71], [5, 64], [7, 47], [40, 41], [100, 38], [150, 41], [180, 30], [194, 14]];
const LZ = []; for (let i = 0; i < LAZO.length; i++) { const [x0, y0] = LAZO[i], [x1, y1] = LAZO[(i + 1) % LAZO.length], l = Math.round(Math.hypot(x1 - x0, y1 - y0)); for (let k = 0; k < l; k++) LZ.push([Math.round(x0 + (x1 - x0) * k / l), Math.round(y0 + (y1 - y0) * k / l)]); }
const PICOS = [[208, 17, 1], [271, 49, -1], [114, 58, 1], [22, 61, 1]];   // cumbres de verdad del decorado: Ararat, su hermano y las dos sierras del horizonte
const p6 = (t) => {
  const o = { encuadre: 'ladera', epoca: 1959, hora: 'tarde' };
  const g = T.ladera(R, t, o);
  const ABRE = b(27.62), REG = b(29.24);
  // «a whole region»: el rayado que camina dentro del lazo
  if (t >= REG) { const f = Math.min(1, (t - REG) / 0.4) * (0.3 + 0.08 * Math.sin((t - REG) * 5)), ph = Math.floor(t * 9);
    for (let y = 8; y <= 72; y++) { const xs = []; for (let i = 0; i < LAZO.length; i++) { const [x0, y0] = LAZO[i], [x1, y1] = LAZO[(i + 1) % LAZO.length]; if ((y0 <= y && y1 > y) || (y1 <= y && y0 > y)) xs.push(x0 + (x1 - x0) * (y - y0) / (y1 - y0)); }
      xs.sort((p, q) => p - q); for (let k = 0; k + 1 < xs.length; k += 2) for (let x = Math.ceil(xs[k]) + 2; x <= xs[k + 1] - 2; x++) if (((x + y - ph) % 7 + 7) % 7 < 3) mez(x, y, hex('#fff2b0'), f); } }
  // «Mount Ararat»: un aro en UN solo pico… que se apaga cuando la voz dice «but»
  const tr = tramo(t, P6 + 0.1, P6 + 0.55);
  if (tr > 0 && (t < ABRE || (t < ABRE + 0.4 && Math.floor(t * 14) % 2))) { for (let k = 0; k <= Math.round(tr * 48); k++) { const an = -1.571 + k / 48 * 6.283, x = Math.round(208 + Math.cos(an) * 13), y = Math.round(20 + Math.sin(an) * 11); R.disco(x, y, 1, K); }
    for (let k = 0; k <= Math.round(tr * 48); k++) { const an = -1.571 + k / 48 * 6.283, x = Math.round(208 + Math.cos(an) * 13), y = Math.round(20 + Math.sin(an) * 11); R.pset(x, y, ROJO); R.pset(x + 1, y, ROJO); }
    if (tr >= 1 && t < ABRE) R.numero('1', 232, 22, { centro: true, sombra: true, color: BL }); }
  // «the mountains of Ararat»: la línea de puntos sale de la cumbre y rodea toda la cordillera
  const lz = sua(tramo(t, b(27.72), b(29.1))), n = Math.round(lz * LZ.length), ph = Math.floor(t * 10);
  for (let i = 0; i < n; i++) if (((i - ph) % 6 + 6) % 6 === 0) { const [x, y] = LZ[i]; R.rect(x - 1, y - 1, x + 2, y + 2, K); R.rect(x, y, x + 1, y + 1, BL); }
  if (lz > 0 && lz < 1) { const [x, y] = LZ[Math.min(LZ.length - 1, n)]; destello(x, y, 2 + Math.floor(t * 12) % 2, ORO); }
  // un banderín igual en cada pico, uno tras otro
  PICOS.forEach(([x, y, dir], k) => { const d = t - b(28.0 + k * 0.42); if (d < 0) return; const c = Math.min(1, d / 0.16), yy = Math.round(y - (1 - c) * 20) + (c >= 1 ? Math.round(bote(d - 0.16) / 2) : 0), w = Math.floor(t * 6 + k) % 2;
    R.rect(x - 1, yy - 11, x + 1, yy, K); R.rect(x, yy - 10, x, yy, BL);
    R.poligono([[x + dir, yy - 12], [x + dir * 9, yy - 8 + w], [x + dir, yy - 4]], K); R.poligono([[x + dir, yy - 10], [x + dir * 6, yy - 8 + w], [x + dir, yy - 6]], ROJO);
    if (d < 0.3 && c >= 1) destello(x, yy - 12, 2, BL); });
  T.laderaDelante(R, t, o);
};
const efectos = [[a(0.5), 'brillo'], [a(1.2), 'pop'], [a(3.45), 'golpecito'],
  [P2 + 0.25, 'pop'], [a(7.5), 'brillo'],
  [P3 + 0.2, 'viento'], [a(12.19), 'golpecito'], [a(13.5), 'whoosh'],
  [P4 + 0.15, 'papel'], [b(18.79), 'toc'], [b(20.57), 'lapiz'], [b(21.17), 'lapiz'],
  [b(22.7), 'burbujas'], [b(24.45), 'pop'], [b(25.1), 'miau'],
  [P6 + 0.1, 'lapiz'], [b(27.72), 'lapiz'], [b(28.0), 'toc'], [b(28.84), 'toc'], [b(29.24), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año: 2026 });
''')
