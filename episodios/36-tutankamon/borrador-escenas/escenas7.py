E = {}

E['tu-gravedad'] = ('La gravedad', '''// TU-GRAVEDAD (frases 20–21), cartela «2026»; la barra dice 2026, salvo en las medidas (2023 y, en «2024», 2024).
// Nueve planos, cortados en la palabra inglesa (el 4 es la vista LIBRE hoy/mesa/general, para la frase de >7 s):
// 1. la manzana en el escritorio de Atom (hasta «it,»): en «gravity» empieza a rodar, en «Everything with mass» llega
//    al filo y cae con la flecha roja que crece y bota en la tarima en «around»; el gato la mira;
// 2. la pizarra de la gravedad (corta en «and gravity»): el geofísico entra y en «empty room» señala: aparece el hueco
//    cuadrado en la roca y menguan las tres flechas de encima; en «less rock» se vuelve y habla;
// 3. el corte de cerca (corta en «which»): en «a tiny bit weaker» crece el hueco, se acortan las flechas de encima y
//    la pesa sube un pelo (el hueco empieza a crecer en «gravity»); en «Differences» late un pelo y en «100 million»
//    la cifra 0,00000001 del decorado se subraya en rojo y destella;
// 4. la mesa de Atom desde arriba (corta en «At heart»): en «extremely sensitive» entra la mano de Atom con la campana
//    del estetoscopio (con su tubo) y la apoya junto a la manzana en «instruments»; salen las ondas y en «pick up» la
//    manzana rueda un pelo;
// 5. el muelle del gravímetro (corta en el silencio tras «difference»): en «weight hanging» un dedo da un toque al
//    marco y la pesa bota en su muelle; en «feel the difference» sube un pelo y la aguja se va a 0,3;
// 6. el gravímetro en la ladera (2023–24, corta en «And in»; gag 6): la geofísica llega con la libreta hasta el trípode;
//    el geofísico, junto al portátil; en «1200» canta la cuenta (globo con la cifra); el escarabajo pasa con su bola,
//    la aguja tiembla, los dos contienen el aire («!») y, al verlo, sonríen y ella lo señala;
// 7. el mapa (2026, corta en «Low»): en «September 2026» se pinta la rejilla de 1.242 puntos en zigzag; en
//    «published the results» salen las manchas y en «Reeves himself» cae una chincheta roja en la grande;
// 8. las esquinas (corta en «lined up»): en «Low density zones» la mancha late; en «right-angled corners» la escuadra
//    se posa en cada esquina recta y sale la cota 35;
// 9. el trazo de Reeves (hasta el final): en «north wall» la pared norte se enciende; en «beyond the very wall» las
//    manchas salen al otro lado, dentro del trazo azul; en «doorways» la mancha late con su «?».''', r'''
const N = Math.round;
const ease = (u) => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
const K = hex('#1a1410'), BL = hex('#f8f4e8');
const globo = (x, y, ic, c) => { R.disco(x, y, 7, K); R.disco(x, y, 6, BL); R.pset(x - 5, y + 7, K); R.pset(x - 4, y + 6, BL); R.pset(x - 6, y + 8, K); R.icono(ic, x - (ic === '?' ? 2 : 1), y - 4, c, null, 1); };
const destello = (x, y, r, c = '#fff8d0') => { const C = hex(c); R.linea(x - r, y, x + r, y, C); R.linea(x, y - r, x, y + r, C); const d = N(r * 0.5); R.linea(x - d, y - d, x + d, y + d, C); R.linea(x - d, y + d, x + d, y - d, C); R.pset(x, y, hex('#ffffff')); };
const anillo = (cx, cy, r, c) => { const C = hex(c), n = Math.max(10, N(r * 6)); for (let i = 0; i < n; i++) { if (i % 3 === 2) continue; const a = i / n * Math.PI * 2; R.pset(N(cx + Math.cos(a) * r), N(cy + Math.sin(a) * r), C); } };
const G1 = T.ELENCO_TU.geofisico1TU, G2 = T.ELENCO_TU.geofisica2TU;
const P2 = en('gravedad', 0.1969), P3 = en('gravedad', 0.3855), P4 = en('gravedad', 0.6275), P5 = en('gravedad', 0.7853),
  P6 = en('medidas', 0) - 0.57, P7 = en('medidas', 0.3136), P8 = en('medidas', 0.5632), P9 = en('medidas', 0.7432);

// 1 · la manzana: rueda al filo, cae con la flecha roja y bota en la tarima
const p1 = (t) => {
  const rueda = 0.12 * ease(tramo(t, en('gravedad', 0.03), en('gravedad', 0.1009)));
  const cae = tramo(t, en('gravedad', 0.1009), en('gravedad', 0.18));
  T.hoy(R, t, { encuadre: 'mesa', camara: 'manzana', cae: cae > 0 ? 0.12 + 0.88 * Math.pow(cae, 1.5) : rueda });
};

// 2 · la pizarra de la gravedad: el geofísico señala; sale el hueco y menguan las flechas
const p2 = (t) => {
  const hueco = ease(tramo(t, en('gravedad', 0.2863), en('gravedad', 0.315)));
  const o = { encuadre: 'gravedad', flechas: 1, hueco };
  T.ladera(R, t, o);
  const u = ease(tramo(t, P2 + 0.1, en('gravedad', 0.27)));
  const x = N(lerp(-10, 40, u));
  R.actor(G1, x, 162, t, { dir: 1, anda: u > 0 && u < 1, dedo: t > en('gravedad', 0.28) && t < en('gravedad', 0.34), habla: t > en('gravedad', 0.34) && Math.floor(t * 6) % 2 === 0 });
  T.laderaDelante(R, t, o);
};

// 3 · el corte de cerca: el hueco crece, las flechas de encima se acortan; la cifra
const p3 = (t) => {
  // el hueco crece de «gravity» a «weaker»; en «Differences» late un pelo (lo poquito que cambia)
  const late = tramo(t, en('gravedad', 0.5257), en('gravedad', 0.59));
  const hueco = ease(tramo(t, en('gravedad', 0.3958), en('gravedad', 0.5069))) - (late > 0 && late < 1 ? 0.12 * Math.abs(Math.sin(late * Math.PI * 3)) : 0);
  const o = { encuadre: 'gravedad', camara: 'flechas', hueco };
  T.ladera(R, t, o);
  T.laderaDelante(R, t, o);
  // en «100 million» la cifra del decorado (0,00000001, abajo a la izquierda) se subraya y destella
  const q = tramo(t, en('gravedad', 0.593), en('gravedad', 0.593) + 0.6);
  if (q > 0 && q < 1) destello(N(lerp(22, 76, q)), 104, N(2 + 3 * Math.sin(q * Math.PI)));
  if (q > 0) { const w = N(lerp(0, 58, Math.min(1, q * 1.5))); R.linea(18, 108, 18 + w, 108, hex('#d83a2a')); R.linea(18, 109, 18 + w, 109, hex('#d83a2a')); }
};

// 4 · la mesa de Atom desde arriba: la mano apoya la campana del estetoscopio junto a la manzana
const p4 = (t) => {
  const rueda = 0.15 * ease(tramo(t, en('gravedad', 0.73), en('gravedad', 0.76)));
  const o = { encuadre: 'mesa', rueda, estetoscopio: false };
  const g = T.hoy(R, t, o) || {};
  const [mx, my] = g.manzana || [244, 122];
  const entra = ease(tramo(t, en('gravedad', 0.6578), en('gravedad', 0.7046))), sale = ease(tramo(t, en('gravedad', 0.76), en('gravedad', 0.78)));
  const k = entra * (1 - sale);
  const bx = N(lerp(150, mx - 16, k)), by = N(lerp(200, my + 4, k));
  if (k > 0.01) {
    // el tubo del estetoscopio: de la campana sale hacia abajo, junto al brazo, hasta el borde
    for (let i = 0; i <= 24; i++) { const u = i / 24, x = N(lerp(bx - 4, bx - 22, u) - Math.sin(u * Math.PI) * 8), y = N(lerp(by + 3, 186, u)); R.disco(x, y, 1, K); R.pset(x, y - 1, hex('#5a606c')); }
    T.brazo(R, bx + 10, 200, bx + 8, by + 8, '#5a8ad0', 1, { codo: [bx + 24, by + 34] });
    const X = bx, Y = by; R.disco(X, Y, 6, K); R.disco(X, Y, 5, hex('#8a909c')); R.disco(X - 1, Y - 1, 4, hex('#c8ced8')); R.disco(X, Y, 2, hex('#eef2f6'));
  }
  if (t > en('gravedad', 0.7046) && k > 0.9) for (const d of [0, 0.5]) { const q = (t * 1.4 + d) % 1; anillo(mx, my, 7 + N(q * 16), q < 0.5 ? '#fff4a0' : '#e8c050'); anillo(mx, my, 8 + N(q * 16), '#5a3a1a'); }
};

// 5 · el muelle: la pesa cuelga y oscila; en «difference» sube un pelo y la aguja se mueve
const p5 = (t) => {
  const u = ease(tramo(t, en('gravedad', 0.956), en('gravedad', 0.9863)));
  // en «weight hanging» un dedo da un toque al marco y la pesa bota en su muelle (oscilación que se apaga)
  const TOQ = en('gravedad', 0.8542), d = t - TOQ, bota = d > 0 ? 0.35 * Math.exp(-d * 1.3) * Math.abs(Math.sin(d * 7)) : 0;
  T.ladera(R, t, { encuadre: 'gravimetro', camara: 'muelle', hueco: Math.min(1, u + bota), aguja: 0.3 * u + (d > 0 ? 0.25 * Math.exp(-d * 1.3) * Math.sin(d * 7) : 0) });
  const entra = ease(tramo(t, P5 + 0.3, TOQ - 0.1)), sale = ease(tramo(t, TOQ + 0.5, TOQ + 1.3)), k = entra * (1 - sale);
  if (k > 0.01) { const tap = d > -0.1 && d < 0.15 ? 3 : 0, hx = N(lerp(330, 196 + tap, k)), hy = N(lerp(210, 156, k));
    T.brazo(R, hx + 60, 214, hx + 10, hy + 2, '#4a6a8a', -1, { codo: [hx + 44, hy + 30] }); }
};

// 6 · el gravímetro en la ladera (gag 6): miden; el escarabajo pasa y la aguja tiembla
const p6 = (t) => {
  const esc = tramo(t, en('medidas', 0.12), en('medidas', 0.29));
  const xe = 96 + 140 * esc, tiembla = xe > 140 && xe < 182 ? Math.sin((xe - 140) / 42 * Math.PI) : 0;
  const o = { encuadre: 'gravimetro', escarabajo: esc, tiembla };
  T.ladera(R, t, o);
  const susto = tiembla > 0.3, ve = esc > 0.62 && esc < 1;
  // la geofísica llega desde la izquierda con la libreta hasta el trípode; el geofísico apunta en el portátil
  const u = ease(tramo(t, P6 + 0.2, en('medidas', 0.08)));
  const x2 = N(lerp(-16, 112, u));
  const m2 = R.actor(G2, x2, 151, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: susto, sonrisa: ve, sostiene: !ve, dedo: ve });
  if (!ve && m2 && m2.mano) { const [lx, ly] = m2.mano; R.rect(lx - 2, ly - 4, lx + 3, ly + 2, K); R.rect(lx - 1, ly - 3, lx + 2, ly + 1, BL); R.pset(lx, ly - 2, hex('#3a6ad8')); }
  const m1 = R.actor(G1, 198, 151, t, { dir: 1, sorpresa: susto, sonrisa: ve, sostiene: !susto && !ve ? [212, 140] : false, habla: t > en('medidas', 0.1787) && t < en('medidas', 0.25) && Math.floor(t * 6) % 2 === 0 });
  T.laderaDelante(R, t, o);
  // en «1200» el geofísico canta la cuenta: globo con la cifra
  if (t > en('medidas', 0.1787) && t < en('medidas', 0.31)) { const bx = 222, by = 96; R.rect(bx - 19, by - 9, bx + 19, by + 7, K); R.rect(bx - 18, by - 8, bx + 18, by + 6, BL); R.pset(bx - 14, by + 8, K); R.pset(bx - 15, by + 9, K); R.pset(bx - 14, by + 7, BL);
    R.numero('1200', bx, by + 4, { centro: true }); }
  if (susto) globo(150, 92, '!', hex('#d83a2a'));
};

// 7 · el mapa: la rejilla en zigzag y, al publicar, las manchas
const p7 = (t) => {
  const rejilla = tramo(t, P7 + 0.1, en('medidas', 0.4));
  const manchas = ease(tramo(t, en('medidas', 0.436), en('medidas', 0.4849)));
  T.ladera(R, t, { encuadre: 'mapa', rejilla: Math.max(0.001, rejilla), manchas });
  // en «Reeves himself» cae una chincheta roja en la mancha grande y su borde late
  const k = tramo(t, en('medidas', 0.5032), en('medidas', 0.5032) + 0.35);
  if (k > 0) { T.chincheta(R, 172, 70, t, hex('#d83a2a'), { baja: ease(k) });
    if (k >= 1 && Math.floor(t * 4) % 2 === 0) for (let i = 0; i < 90; i++) { const a = i / 90 * Math.PI * 2; if (i % 3) R.pset(N(162 + Math.cos(a) * 30), N(78 + Math.sin(a) * 16), hex('#fff4a0')); } }
};

// 8 · las esquinas: la escuadra se posa en cada esquina recta; cota 35
const p8 = (t) => {
  const escuadra = tramo(t, en('medidas', 0.6693), en('medidas', 0.7288) + 0.05);
  T.ladera(R, t, { encuadre: 'mapa', camara: 'esquinas', escuadra: Math.max(0.001, escuadra) });
  const q = tramo(t, en('medidas', 0.5781), en('medidas', 0.66));
  if (q > 0 && q < 1) { const r = N(lerp(30, 70, (q * 2) % 1)); for (let i = 0; i < 80; i++) { const a = i / 80 * Math.PI * 2; R.pset(N(186 + Math.cos(a) * r * 1.2), N(78 + Math.sin(a) * r * 0.6), hex('#fff4a0')); } }
};

// 9 · el trazo de Reeves: la pared norte se enciende; las manchas salen al otro lado
const p9 = (t) => {
  const anomalias = ease(tramo(t, en('medidas', 0.8546), en('medidas', 0.9074)));
  const o = { encuadre: 'trazo', reeves: 1, traza: 1, anomalias };
  T.ladera(R, t, o);
  T.laderaDelante(R, t, o);
  // en «north wall» la pared norte se enciende (dos rayas que laten)
  if (t > en('medidas', 0.7806) && t < en('medidas', 0.88)) { const c = Math.floor(t * 5) % 2 ? '#fff4a0' : '#f8c040'; R.linea(213, 92, 213, 132, hex(c)); R.linea(214, 92, 214, 132, hex(c)); }
  // las manchas, más oscuras para que se lean, al otro lado de la pared
  if (anomalias > 0) { const V = hex('#3a2a7a'), V2 = hex('#5a4aa8');
    for (let y = -14; y <= 14; y++) for (let x = -16; x <= 16; x++) { const d = (x * x) / 256 + (y * y) / 196; if (d > anomalias) continue; if (((x + y) & 1) === 0) R.pset(256 + x, 108 + y, d < 0.45 * anomalias ? V : V2); } }
  if (t > en('medidas', 0.9448)) { const q = (t * 2) % 1; anillo(256, 108, 16 + N(q * 6), '#fff4a0'); if (Math.floor(t * 3) % 2 === 0) globo(256, 78, '?', hex('#3a6ad8')); }
};

const efectos = [[en('gravedad', 0.1009), 'whoosh'], [en('gravedad', 0.164), 'toc'], [en('gravedad', 0.2863), 'pop'],
  [en('gravedad', 0.4667), 'brillo'], [en('gravedad', 0.7046), 'golpecito'], [en('gravedad', 0.956), 'tic'],
  [en('gravedad', 0.8542), 'golpecito'], [en('medidas', 0.1787), 'bip'], [en('medidas', 0.21), 'zumbido'], [en('medidas', 0.436), 'papel'], [en('medidas', 0.5032) + 0.3, 'toc'], [en('medidas', 0.6693), 'lapiz'], [en('medidas', 0.8546), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9]],
  { efectos, cartela: '2026', año: (t) => t >= P6 && t < P7 ? (t < en('medidas', 0.0836) ? 2023 : 2024) : 2026 });
''')

E['tu-dudas'] = ('Las dudas', '''// TU-DUDAS (frase 22), sin cartela; la barra dice 2026. Tres planos, cortados en la palabra inglesa:
// 1. los tres cortes (corta antes de «and a low»): las agujas apenas se mueven en la banda gris; en «isn't proof» sale
//    una «?» sobre cada corte, una tras otra, y en «very limit» la mano da dos golpecitos con el lápiz al aparato de en medio;
// 2. la aguja de cerca (corta antes de «Other»): la aguja apenas asoma de la banda de ruido; en «room», «rubble-filled
//    passage» y «cracked rock» salen las tres posibilidades en tarjetas;
// 3. la ladera (hasta el final): los dos geofísicos bajan por la derecha, él con la maleta y ella con banderitas; en
//    «more data» ella pregunta («?») y clava una banderita nueva y él deja la maleta; en «before concluding» él niega con
//    la cabeza y, al acabar, los dos dan media vuelta y suben otra vez a medir.''', r'''
const N = Math.round;
const ease = (u) => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
const K = hex('#1a1410'), BL = hex('#f8f4e8');
const globo = (x, y, ic, c) => { R.disco(x, y, 7, K); R.disco(x, y, 6, BL); R.pset(x - 5, y + 7, K); R.pset(x - 4, y + 6, BL); R.pset(x - 6, y + 8, K); R.icono(ic, x - (ic === '?' ? 2 : 1), y - 4, c, null, 1); };
const G1 = T.ELENCO_TU.geofisico1TU, G2 = T.ELENCO_TU.geofisica2TU;
const pie = (x) => N(140 - 0.12 * (x - 160));
const P2 = en('escombro', 0.3463), P3 = en('escombro', 0.7271);

// 1 · los tres cortes
const p1 = (t) => {
  T.ladera(R, t, { encuadre: 'cortes' });
  // en «isn't proof» sale una «?» sobre cada corte, una tras otra
  [[57, 0.0291], [160, 0.06], [263, 0.0963]].forEach(([x, f]) => { if (t > en('escombro', f)) { const s = N(3 * (1 - ease(tramo(t, en('escombro', f), en('escombro', f) + 0.25)))); globo(x, 30 + s, '?', hex('#3a6ad8')); } });
  // en «very limit» la mano da dos golpecitos con el lápiz al cristal del aparato de en medio
  const entra = ease(tramo(t, en('escombro', 0.13), en('escombro', 0.1898))), sale = ease(tramo(t, en('escombro', 0.31), en('escombro', 0.3463)));
  const k = entra * (1 - sale);
  if (k > 0.01) { const d = t - en('escombro', 0.1898), tap = (d > 0 && d < 0.15) || (d > 0.35 && d < 0.5) ? 3 : 0;
    const hx = N(lerp(260, 178, k)), hy = N(lerp(210, 160 + tap, k));
    R.linea(hx - 10, hy - 8, hx - 2, hy, hex('#2a2a34')); R.linea(hx - 9, hy - 8, hx - 1, hy, hex('#d8a040')); R.pset(hx - 11, hy - 9, hex('#3a3a3a'));
    T.brazo(R, hx + 50, 214, hx + 4, hy + 2, '#4a6a8a', -1, { codo: [hx + 34, hy + 34] }); }
};

// 2 · la aguja de cerca: apenas asoma; salen las tres posibilidades
const p2 = (t) => {
  const aguja = 0.4 * ease(tramo(t, P2 + 0.2, en('escombro', 0.62))) + 0.04 * Math.sin(t * 9);
  T.ladera(R, t, { encuadre: 'cortes', camara: 'aguja', aguja });
  // las tres posibilidades, en tarjetas a la derecha del aparato: cuarto vacío, pasillo con cascotes y roca agrietada
  const RO = hex('#b8905a'), RS = hex('#8a6a3a'), RL = hex('#d8b880');
  [[0.4938, 0], [0.5457, 1], [0.6517, 2]].forEach(([f, k]) => {
    const t0 = en('escombro', f); if (t < t0) return;
    const s = ease(tramo(t, t0, t0 + 0.25)), x0 = 280, y0 = 50 + k * 42 - N(6 * (1 - s));
    R.rect(x0 - 1, y0 - 1, x0 + 36, y0 + 34, K); R.rect(x0, y0, x0 + 35, y0 + 33, RO);
    for (let j = 0; j < 34; j += 4) for (let i = (j / 4 % 2) * 4; i < 36; i += 8) { R.pset(x0 + i, y0 + j, RS); R.pset(x0 + i + 1, y0 + j, RL); }
    if (k === 0) { R.rect(x0 + 8, y0 + 10, x0 + 27, y0 + 23, K); R.rect(x0 + 9, y0 + 11, x0 + 26, y0 + 22, hex('#f4ecd8')); }
    if (k === 1) { R.rect(x0 + 3, y0 + 13, x0 + 32, y0 + 21, K); R.rect(x0 + 4, y0 + 14, x0 + 31, y0 + 20, hex('#f4ecd8'));
      for (let i = 0; i < 9; i++) R.disco(x0 + 6 + i * 3, y0 + 19 - (i % 3), 2 - (i % 2), i % 2 ? RS : hex('#a07a48')); }
    if (k === 2) { const C = hex('#2a1a10'); R.linea(x0 + 4, y0 + 6, x0 + 16, y0 + 16, C); R.linea(x0 + 16, y0 + 16, x0 + 30, y0 + 5, C); R.linea(x0 + 16, y0 + 16, x0 + 13, y0 + 30, C); R.linea(x0 + 22, y0 + 10, x0 + 31, y0 + 24, C); }
  });
};

// 3 · la ladera: los geofísicos bajan con más aparatos y piden más datos
const p3 = (t) => {
  const o = { encuadre: 'ladera', epoca: 2026 };
  T.ladera(R, t, o);
  // bajan por la derecha con más aparatos: él con la maleta, ella con un manojo de banderitas; en «more data» ella clava
  // una banderita nueva (otro punto que medir) y él deja la maleta; en «before concluding» él niega con la cabeza
  // al acabar, los dos dan media vuelta y suben otra vez a medir (él recoge la maleta)
  const u = ease(tramo(t, P3 + 0.05, en('escombro', 0.83))), w = ease(tramo(t, en('escombro', 0.99), en('escombro', 1.09)));
  const x1 = N(lerp(334, 214, u) + 40 * w), x2 = N(lerp(356, 246, u) + 46 * w);
  const clava = tramo(t, en('escombro', 0.83), en('escombro', 0.865));
  // las banderitas ya clavadas por ella (aparecen una a una por detrás de su paso)
  const banderas = [[300, -1], [276, -1], [238, 0.865]];
  for (const [bx, f] of banderas) if (f < 0 || t > en('escombro', f)) { const by = pie(bx), fl = Math.floor(t * 4 + bx) % 2; R.linea(bx, by - 10, bx, by, hex('#5a4a3a')); R.rect(bx + 1, by - 10, bx + 5, by - 7 + fl, hex('#d83a2a')); R.pset(bx + 1, by - 7, hex('#8a1a10')); }
  const m2 = R.actor(G2, x2, pie(x2 + 7), t, { dir: w > 0 ? 1 : -1, anda: (u > 0 && u < 1) || (w > 0 && w < 1), sostiene: clava > 0 && clava < 1 ? [x2 - 4, pie(x2 + 7) - 4] : true, sonrisa: t > en('escombro', 0.87) });
  if (m2 && m2.mano && !(clava >= 1)) { const [mx, my] = m2.mano; R.linea(mx, my - 9, mx, my + 2, hex('#5a4a3a')); R.rect(mx + 1, my - 9, mx + 5, my - 6, hex('#d83a2a')); R.linea(mx - 2, my - 8, mx - 2, my + 1, hex('#5a4a3a')); R.rect(mx - 6, my - 8, mx - 3, my - 5, hex('#3a8ad8')); }
  const niega = t > en('escombro', 0.9162) && t < en('escombro', 0.99);
  const deja = t > en('escombro', 0.85) && w < 0.05;
  const m1 = R.actor(G1, x1, pie(x1 + 7), t, { dir: niega ? (Math.floor(t * 6) % 2 ? 1 : -1) : w > 0 ? 1 : -1, anda: (u > 0 && u < 1) || (w > 0 && w < 1), sostiene: !deja, habla: t > en('escombro', 0.83) && t < en('escombro', 0.9) && Math.floor(t * 6) % 2 === 0 });
  const maleta = (mx, my) => { R.rect(mx - 6, my - 1, mx + 6, my + 8, K); R.rect(mx - 5, my, mx + 5, my + 7, hex('#7a7a84')); R.rect(mx - 5, my + 3, mx + 5, my + 3, hex('#4a4a54')); R.rect(mx - 2, my - 3, mx + 2, my - 2, K); R.pset(mx - 3, my + 1, hex('#c8c8d0')); };
  if (!deja && m1 && m1.mano) maleta(m1.mano[0], m1.mano[1]); else if (deja) maleta(x1 - 6, pie(x1 - 6) - 8);
  T.laderaDelante(R, t, o);
  if (t > en('escombro', 0.8262) && t < en('escombro', 0.9)) globo(x2 + 8, pie(x2 + 7) - 36, '?', hex('#3a6ad8'));
};

const efectos = [[en('escombro', 0.0291), 'pop'], [en('escombro', 0.1898), 'golpecito'], [en('escombro', 0.4938), 'papel'], [en('escombro', 0.5457), 'papel'],
  [en('escombro', 0.6517), 'papel'], [en('escombro', 0.85), 'toc']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')
