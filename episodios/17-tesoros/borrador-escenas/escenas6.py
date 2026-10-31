E = {}

E['te-castillo'] = ('El castillo del Grial', '''// TE-CASTILLO (frases 33–34), 1210. Cuatro planos:
// 1. (castillo, general) de noche, en la gran sala del Grial; la procesión de velas cruza el fondo y dos caballeros de
//    manto blanco guardan las gradas; en «German poet» entra el poeta Wolfram con su libro, en «Wolfram» se queda
//    boquiabierto ante la piedra que destella y señala el altar;
// 2. (castillo, altar; corte en «makes») la piedra luminosa late; en «guarded» los dos caballeros llegan por los lados con
//    sus lanzas y pendones, en «Templeisen» dan un golpe de lanza; en «a name» les sale un «?» y en «Templars» la cruz;
// 3. (mostrador, general; corte en «Since then») la barra del año corre de 1210 a hoy; el buscador entra en la feria de
//    copas, en «claimed» coge una de barro y en «Grail» aparece otra al final de la fila: se queda pasmado (gag 5);
// 4. (mostrador, cerca; corte en «and the most famous») la mano coge una copa de oro y aparece otra al final, la de
//    ágata roja; en «Cathedral of Valencia» brilla, la mano deja la de oro y la señala; en «Spain», «!».''', r'''
const w = (f) => en('wolfram', f), g = (f) => en('iglesias', f);
const P2 = w(0.448), P3 = g(0), P4 = g(0.504);
const K = T.C.k;
// la lanza con su pendón blanco de cruz roja que ondea (x, y: la mano; d: hacia dónde ondea)
const lanza = (x, y, t, k = 0, d = 1) => {
  x = Math.round(x); y = Math.round(y);
  R.linea(x, y + 10, x, y - 24, hex('#4a2e18')); R.linea(x + 1, y + 10, x + 1, y - 24, hex('#8a6a40'));
  R.poligono([[x - 1, y - 24], [x + 2, y - 24], [x + 1, y - 30]], hex('#c8ccd8')); R.pset(x, y - 26, C.blanco);
  for (let i = 0; i < 12; i++) { const o = Math.round(Math.sin(t * 5 + k - i * 0.5) * 1.2), hgt = i > 8 ? 7 - (i - 8) * 2 : 7;
    for (let j = 0; j < hgt; j++) { const px = x + d * (2 + i), py = y - 23 + j + o; R.pset(px, py, j === 0 || i === 11 ? hex('#c8c4bc') : j === hgt - 1 ? hex('#d8d4cc') : hex('#f2eee2')); }
    if (i >= 3 && i <= 6) { R.pset(x + d * (2 + i), y - 20 + o, hex('#c8303a')); } if (i === 4 || i === 5) for (let j = 1; j < 6; j++) R.pset(x + d * (2 + i), y - 23 + j + o, hex('#c8303a')); }
};
const C = { blanco: hex('#ffffff') };
// un libro de tapas rojas en la mano
const libro = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 4, y - 4, x + 3, y + 2, K); R.rect(x - 3, y - 3, x + 2, y + 1, hex('#8a2a2a')); R.rect(x + 2, y - 3, x + 2, y + 1, hex('#f2eee2')); R.pset(x - 2, y - 2, hex('#c8a040')); };
// el destello: un anillo de chispas que se abre
const destello = (x, y, u, r0 = 6, r1 = 26) => { if (u <= 0 || u >= 1) return; const r = r0 + (r1 - r0) * u; for (let k = 0; k < 20; k++) { const a = k / 20 * Math.PI * 2; if ((k + Math.floor(u * 6)) % 3 === 0) continue; R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r * 0.8), u < 0.6 ? hex('#fffbe0') : hex('#f0d880')); } };
const BL = hex('#ffffff');
const globo = (x, y, icono, col = K) => { x = Math.round(x); y = Math.round(y); R.rect(x - 11, y - 20, x + 11, y, K); R.rect(x - 10, y - 19, x + 10, y - 1, BL); R.rect(x - 10, y - 1, x + 10, y - 1, hex('#d8d8e0')); R.pset(x - 2, y + 1, K); R.pset(x - 1, y + 2, K); R.pset(x - 1, y + 1, BL); R.icono(icono, x - 7, y - 17, col, BL, 2); };
const WOLF = { C: hex('#3a6a4a'), c: hex('#2a5038') };

// 1 · la gran sala: entra el poeta, ve la piedra y la señala
const VE = w(0.28);
const p1 = (t) => {
  const d = T.grial(R, t, { encuadre: 'castillo' });
  // los dos guardianes de manto blanco en las gradas, con sus lanzas; el de la izquierda se vuelve hacia el poeta
  { const gira = t > w(0.2); const m = R.actor(EL.templario, 106, 134, t, { dir: gira ? -1 : 1, habla: t > VE + 0.3 && t < VE + 1.1 && Math.sin(t * 9) > 0, sostiene: [gira ? 106 : 120, 120] }).mano; lanza(m[0], m[1], t, 0, gira ? -1 : 1); }
  { const m = R.actor(EL.templario2 || EL.templario, 200, 134, t, { dir: -1, sostiene: [200, 120] }).mano; lanza(m[0], m[1], t, 1, -1); }
  // el poeta Wolfram entra con su libro, se queda pasmado y señala el altar
  const u = tramo(t, 0.4, w(0.2)), x = Math.round(lerp(-18, 62, u));
  const o = { dir: 1, anda: u > 0 && u < 1, pal: WOLF };
  if (t > VE && t < VE + 0.9) o.sorpresa = true;
  if (t > VE + 0.9) { o.dedo = true; o.sonrisa = true; } else o.sostiene = [x + 13, d.suelo - 14];
  const m = R.actor(EL.poeta, x, d.suelo, t, o).mano;
  if (o.sostiene) libro(m[0], m[1]);
  // la piedra destella cuando la ve
  destello(d.objeto[0], d.objeto[1], tramo(t, VE, VE + 0.8));
  destello(d.objeto[0], d.objeto[1], tramo(t, VE + 0.4, VE + 1.3), 4, 20);
};

// 2 · el altar: la piedra late; llegan los guardianes; «?» y la cruz templaria
const GUARDA = w(0.518), LLAMA = w(0.668), NOMBRE = w(0.803), TEMPLE = w(0.928);
const p2 = (t) => {
  const d = T.grial(R, t, { encuadre: 'castillo', camara: 'altar' });
  destello(d.objeto[0], d.objeto[1], tramo(t, w(0.489), w(0.489) + 0.9), 10, 40);
  [[-20, 78, 1, 0], [330, 226, -1, 1]].forEach(([x0, x1, dd, k]) => {
    const u = tramo(t, GUARDA + k * 0.15, w(0.6) + k * 0.1), x = Math.round(lerp(x0, x1, u)), llegado = u >= 1;
    // al llegar se vuelven hacia fuera (guardan el altar); en «Templeisen» dan un golpe con la lanza en el suelo
    const dir = llegado ? -dd : dd, golpe = t > LLAMA && t < LLAMA + 0.35 ? -3 : 0;
    const m = R.actor(EL.templario, x, d.suelo, t, { dir, anda: u > 0 && !llegado, sostiene: [x + (dir > 0 ? 13 : 1), d.suelo - 14 + golpe], sonrisa: t > TEMPLE + 0.2 }).mano;
    lanza(m[0], m[1], t, k, dir);
    if (golpe) { R.pset(m[0] - 2, d.suelo, hex('#e8e0d0')); R.pset(m[0] + 3, d.suelo, hex('#e8e0d0')); R.pset(m[0] - 3, d.suelo - 1, hex('#c8c0b0')); }
    // el bocadillo: primero «?» y luego la cruz de los templarios
    if (t > NOMBRE && t < TEMPLE) globo(x + 7, d.suelo - 36, '?');
    else if (t > TEMPLE) globo(x + 7, d.suelo - 36 - Math.round(2 * (1 - tramo(t, TEMPLE, TEMPLE + 0.2))), 'cruz', hex('#c8303a'));
  });
};

// 3 · la feria de copas: el buscador coge una y aparece otra al final (gag 5)
const COGE = g(0.291), NUEVA = g(0.388);
const p3 = (t) => {
  const tiene = t > COGE + 0.25;
  const d = T.grial(R, t, { encuadre: 'mostrador', falta: tiene ? 2 : -1, nueva: tramo(t, NUEVA, NUEVA + 0.7) });
  const u = tramo(t, P3 + 0.15, g(0.2)), x = Math.round(lerp(-18, 96, u));
  const o = { dir: 1, anda: u > 0 && u < 1 };
  if (t > NUEVA + 0.2) { o.sorpresa = true; }
  if (t > g(0.22) && !tiene) o.sostiene = [Math.round(lerp(x + 13, 106, tramo(t, g(0.22), COGE))), Math.round(lerp(d.suelo - 14, 141, tramo(t, g(0.22), COGE)))];
  else if (tiene) o.sostiene = [x + 15, d.suelo - 15 - Math.round(4 * tramo(t, COGE + 0.25, COGE + 0.6))];
  else o.dedo = t > g(0.2) && t < g(0.22);
  if (!o.sostiene && !o.dedo) o.sonrisa = t > g(0.12);
  const m = R.actor(EL.buscador, x, d.suelo, t, o).mano;
  if (tiene) T.copa(R, m[0], m[1] + 4, t, { tipo: 'barro', s: 1 });
  if (t > NUEVA + 0.35) R.bocadillo(x + 8, d.suelo - 34, {});
  destello(d.copas[7] ? d.copas[7][0] : 286, 134, tramo(t, NUEVA, NUEVA + 0.8), 4, 24);
  // un perrillo de feria que olisquea el mostrador y se va (vida)
  { const v = tramo(t, P3 + 0.4, P4 - 0.2), px = Math.round(lerp(330, 200, v)); const p = v > 0 && v < 1 ? Math.floor(t * 8) % 2 : 0; perro(px, d.suelo, t, -1, p); }
};
// un perro pequeño blanco con una mancha (x: el borde izquierdo, base: las patas)
const PERRO = ['.........kk...', '........kBWk..', '.k......kWWkWk', 'kWk.....kWWWWk', '.kWkkkkkkWWWk.', '..kWWWWWWWWk..', '..kWBBWWWWWk..', '..kWWWWWWWWk..', '..kWkkkkkWkk..'];
const PATAS = [['..kk.....kk...'], ['...kk...kk....']];
const perro = (x, base, t, dir, p) => { const pal = { k: K, W: hex('#f2eee2'), B: hex('#a8743c') }, rows = PERRO.concat(PATAS[p]); rows.forEach((r, j) => { for (let i = 0; i < 14; i++) { const c = r[i]; if (c === '.') continue; R.pset(dir > 0 ? x + i : x + 13 - i, base - rows.length + j, pal[c]); } }); };

// 4 · de cerca: la mano coge la de oro, aparece la de ágata; brilla en «Cathedral of Valencia»
const MANO = g(0.533), APARECE = g(0.6), VLC = g(0.672), DEJA = g(0.74), SPAIN = g(0.918);
const p4 = (t) => {
  const sube = tramo(t, MANO, MANO + 0.4) - tramo(t, DEJA, DEJA + 0.45), tiene = t > MANO && t < DEJA + 0.45;
  const d = T.grial(R, t, { encuadre: 'mostrador', camara: 'cerca', falta: tiene ? 1 : -1, nueva: tramo(t, APARECE, APARECE + 0.7) });
  const [cx, cy] = d.copas[1], [ax, ay] = d.copas[5] || [286, 149];
  // la de ágata brilla con fuerza cuando la voz dice Valencia
  const br = tramo(t, VLC, VLC + 0.5);
  if (br > 0) { T.copa(R, ax, ay, t, { tipo: 'agata', s: 3, brillo: br }); destello(ax, ay - 18, tramo(t, VLC, VLC + 1), 12, 34); }
  // la mano: entra por abajo, coge la copa por el tallo, la levanta, la vuelve a dejar y señala la de ágata
  const llega = tramo(t, P4 + 0.1, MANO), apunta = tramo(t, DEJA + 0.5, VLC + 1.2);
  let wx = lerp(130, cx - 10, llega), wy = lerp(196, cy - 9, llega) - sube * 22;
  if (apunta > 0) { wx = lerp(cx - 10, ax - 30, apunta); wy = lerp(cy - 9, ay - 16, apunta); }
  if (tiene) T.copa(R, cx, Math.round(cy - sube * 22), t, { tipo: 'oro', s: 3, brillo: 0.15 });
  if (llega > 0) T.brazo(R, Math.round(wx + 18), 192, Math.round(wx), Math.round(wy), '#e8dcc0', 1);
  if (t > SPAIN) R.bocadillo(ax, ay - 42, {});
};

const efectos = [[VE, 'brillo'], [w(0.489), 'brillo'], [LLAMA, 'toc'], [NOMBRE, 'pop'], [TEMPLE, 'pop'], [COGE, 'golpecito'], [NUEVA, 'brillo'], [NUEVA + 0.35, 'boing'], [APARECE, 'brillo'], [DEJA + 0.4, 'golpecito'], [SPAIN, 'pop']];
const año = (t) => t < P3 ? 1210 : Math.round(lerp(1210, 2026, tramo(t, P3 + 0.1, P3 + 1.3)));
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año });
''')

E['te-valencia'] = ('El cáliz de Valencia', '''// TE-VALENCIA (frases 35–36). Tres planos:
// 1. (fondo local) la plaza de la Virgen de Valencia, hoy: el Miguelete con su campana, la puerta de los Apóstoles con
//    su rosetón, la cúpula de azulejos azules, la fuente del Turia que mana; vencejos, nubes y palomas; la guía levanta
//    su banderita y en «red agate» le sale el bocadillo con la copa de ágata; en «experts» el grupo entra en la catedral
//    detrás de ella, y un niño cruza corriendo y espanta las palomas;
// 2. (valencia, general; corte en «two centuries») en la capilla del Santo Cáliz, 1982: el papa en el altar con la
//    copa; en «two centuries before» se desenrolla una cartela con 200 · cruz · 100 y la franja roja entre medias; en
//    «Two popes» la cartela se enrolla y el papa alza la copa, tranquilo; el monaguillo mece el incensario;
// 3. (valencia, caliz; corte en «Being») la copa de ágata de cerca, con la luz que la atraviesa; en «doesn't prove» un
//    «?»; en «But it's the closest» sube una mano que se acerca al cristal y en «touching» se queda apoyada en el
//    cristal, sin tocar la copa: el vaho se empaña.''', r'''
const a = (f) => en('agata', f), b = (f) => en('cerca', f);
const P2 = a(0.401), P3 = b(0.022);
const K = T.C.k, BL = hex('#ffffff');
const hh = (x, y, s) => { let n = (x * 374761393 + y * 668265263 + s * 982451653) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const mez = (p, q, u) => { let r = 0; for (const s of [0, 8, 16]) { const ca = (p >>> s) & 255, cb = (q >>> s) & 255; r += Math.round(ca + (cb - ca) * u) * (1 << s); } return (0xff000000 + r) >>> 0; };
const PI = [hex('#f0e2c4'), hex('#dcc8a2'), hex('#bea47e'), hex('#94785a')];   // la piedra: luz, medio, sombra, junta

// ── la plaza de la Virgen (fondo local), pintada una vez en un búfer ──
const PB = R.nuevo(); let pbHecho = false;
const sillar = (x0, y0, x1, y1, tono = 1, s = 0) => {   // sillería con juntas y piedras de tres tonos
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const fila = Math.floor((y - y0) / 6), col = Math.floor((x - x0 + (fila & 1) * 6) / 12);
    const junta = (y - y0) % 6 === 5 || (x - x0 + (fila & 1) * 6) % 12 === 0, v = hh(col, fila, 31 + s);
    R.pset(x, y, junta ? mez(PI[3], PI[tono], 0.35) : v < 0.18 ? PI[Math.min(3, tono + 1)] : v > 0.86 ? PI[Math.max(0, tono - 1)] : PI[tono]); }
};
const ojiva = (cx, yb, a, k) => (x) => { const dx = Math.abs(x - cx); if (dx > a) return null; return yb - Math.sqrt(Math.max(0, (a * 1.6) ** 2 - (dx + a * 0.6) ** 2)) + a * 0; };
const pintaPlaza = () => {
  const prev = R.usar(PB);
  // el cielo tramado, de añil arriba a casi blanco abajo
  const cs = [hex('#3a78d4'), hex('#5290e0'), hex('#70a8ea'), hex('#94c2f0'), hex('#bcd8f4')];
  for (let y = 0; y < 146; y++) { const u = Math.min(3.99, y / 34); const i = Math.floor(u), f = u - i; for (let x = 0; x < 320; x++) R.pset(x, y, cs[f > R.b4(x, y) ? Math.min(4, i + 1) : i]); }
  // casas de la izquierda (balcones de hierro, persianas verdes)
  for (let y = 70; y < 146; y++) for (let x = 0; x < 30; x++) R.pset(x, y, hh(x >> 1, y >> 1, 5) < 0.12 ? hex('#d89a7a') : hex('#e8b090'));
  R.rect(0, 68, 30, 70, hex('#a86a4a')); for (const y of [80, 104]) { R.rect(4, y, 14, y + 14, K); R.rect(5, y + 1, 13, y + 13, hex('#3a7a5a')); for (let j = y + 2; j < y + 13; j += 2) R.rect(5, j, 13, j, hex('#2a5a42')); R.rect(2, y + 14, 16, y + 15, hex('#2a2a30')); for (let i = 3; i < 16; i += 2) R.rect(i, y + 10, i, y + 14, hex('#2a2a30')); R.pset(7, y + 9, hex('#e84a6a')); R.pset(10, y + 9, hex('#f0d040')); R.pset(8, y + 8, hex('#4aa04a')); }
  // el Miguelete: torre octogonal con tres caras de luz, cornisas, saeteras y el campanario
  const TX0 = 32, TX1 = 72;
  for (let y = 34; y < 146; y++) for (let x = TX0; x <= TX1; x++) { const cara = x < 42 ? 0 : x < 62 ? 1 : 2, fila = Math.floor(y / 5), junta = y % 5 === 4 || (x + (fila & 1) * 5) % 10 === 0;
    const v = hh(Math.floor((x + (fila & 1) * 5) / 10), fila, 77); let c = PI[cara]; if (v < 0.15) c = PI[Math.min(3, cara + 1)]; if (junta) c = mez(c, PI[3], 0.4); R.pset(x, y, c); }
  for (const y of [34, 58, 84, 110]) { R.rect(TX0 - 2, y - 2, TX1 + 2, y, PI[0]); R.rect(TX0 - 2, y + 1, TX1 + 2, y + 1, PI[3]); }
  for (const y of [66, 92, 118]) { R.rect(50, y, 54, y + 9, hex('#3a2a24')); R.pset(52, y - 1, hex('#3a2a24')); R.pset(50, y, PI[1]); R.pset(54, y, PI[1]); }
  // el cuerpo de campanas: arcos apuntados con las campanas doradas dentro
  for (const cx of [46, 58]) { for (let y = 38; y < 56; y++) for (let x = cx - 4; x <= cx + 4; x++) if (y > 42 || Math.abs(x - cx) < (y - 36) * 0.8) R.pset(x, y, hex('#2a2024')); R.disco(cx, 50, 3, hex('#c8a040')); R.rect(cx - 3, 52, cx + 3, 53, hex('#a88028')); R.pset(cx - 1, 48, hex('#f0d070')); }
  for (const x of [TX0 - 2, TX1 + 1]) for (let y = 22; y < 34; y++) R.rect(x, y, x + 1, y, y % 3 ? PI[1] : PI[2]);
  R.rect(TX0 - 2, 31, TX1 + 2, 33, PI[2]); for (let x = TX0 - 2; x <= TX1 + 2; x += 3) R.rect(x, 28, x + 1, 30, PI[1]);
  // la espadaña de arriba (su campana se mueve en cada fotograma)
  R.rect(46, 18, 58, 30, PI[1]); R.rect(46, 18, 46, 30, PI[0]); R.rect(58, 18, 58, 30, PI[2]); R.poligono([[45, 18], [52, 14], [59, 18]], PI[2]); for (let y = 21; y < 30; y++) R.rect(49, y, 55, y, hex('#2a2024'));
  // la fachada de la catedral: sillería, contrafuertes con pináculos, ventanales góticos y la crestería
  sillar(72, 62, 240, 145, 1, 1);
  sillar(118, 30, 222, 62, 1, 2);
  R.poligono([[118, 30], [170, 18], [222, 30]], PI[1]); for (let x = 120; x < 220; x += 4) { const y = 30 - Math.round((52 - Math.abs(x - 170)) * 12 / 52); R.pset(x, y - 1, PI[0]); R.pset(x + 1, y - 2, PI[0]); }
  for (let x = 72; x <= 240; x++) { R.pset(x, 62, PI[0]); R.pset(x, 63, PI[3]); if (x % 8 < 4 && x < 118 || x > 222 && x % 8 < 4) { R.rect(x, 58, x, 61, PI[1]); } }
  for (const px of [100, 118, 222, 236]) { R.rect(px - 3, 40, px + 3, 145, PI[2]); R.rect(px - 3, 40, px - 2, 145, PI[0]); R.rect(px + 3, 40, px + 3, 145, PI[3]); R.poligono([[px - 3, 40], [px, 26], [px + 3, 40]], PI[1]); R.pset(px, 25, PI[0]); for (let y = 30; y < 40; y += 3) { R.pset(px - 2, y + 1, PI[0]); R.pset(px + 2, y, PI[0]); } for (const y of [70, 100, 128]) R.rect(px - 4, y, px + 4, y + 1, PI[0]); }
  for (const cx of [86, 109]) { for (let y = 70; y < 128; y++) for (let x = cx - 5; x <= cx + 5; x++) if (y > 80 || Math.abs(x - cx) < (y - 68) * 0.6) { const v = (Math.floor(x / 3) + Math.floor(y / 4)) % 4; R.pset(x, y, [hex('#2a4a8a'), hex('#8a2a3a'), hex('#c8a040'), hex('#2a6a5a')][v]); }
    R.rect(cx, 72, cx, 127, PI[3]); for (let y = 86; y < 128; y += 12) R.rect(cx - 5, y, cx + 5, y, PI[3]); R.disco(cx, 78, 2, PI[1]); }
  // el rosetón
  { const rx = 170, ry = 46, r = 14; for (let j = -r - 2; j <= r + 2; j++) for (let i = -r - 2; i <= r + 2; i++) { const d = Math.hypot(i, j); if (d > r + 2) continue;
      if (d > r) { R.pset(rx + i, ry + j, d > r + 1 ? PI[3] : PI[0]); continue; }
      const an = Math.atan2(j, i), sec = Math.floor((an + Math.PI) / (Math.PI / 6)), bord = Math.abs(((an + Math.PI) / (Math.PI / 6)) % 1 - 0.5) > 0.42;
      R.pset(rx + i, ry + j, d < 3 ? hex('#e8c040') : Math.abs(d - 7) < 0.7 || bord ? PI[2] : [hex('#c83a3a'), hex('#3a6ac8'), hex('#e8c040'), hex('#3a8a5a')][(sec + (d > 7 ? 1 : 0)) % 4]); } }
  // la portada: arquivoltas apuntadas con figuritas, tímpano, jambas con apóstoles y la puerta (una hoja abierta)
  for (let k = 0; k < 7; k++) { const aa = 40 - k * 3; for (let x = 170 - aa; x <= 170 + aa; x++) { const dx = Math.abs(x - 170), top = Math.round(104 - Math.sqrt(Math.max(0, (aa * 1.5) ** 2 - (dx + aa * 0.5) ** 2)));
      for (let y = top; y < top + 3; y++) R.pset(x, y, k % 2 ? PI[2] : PI[1]); if (k % 2 === 1 && x % 4 === 0) { R.pset(x, top + 1, PI[0]); R.pset(x, top + 2, hex('#8a6a4a')); } } }
  for (let x = 152; x <= 188; x++) { const dx = Math.abs(x - 170), top = Math.round(104 - Math.sqrt(Math.max(0, (19 * 1.5) ** 2 - (dx + 19 * 0.5) ** 2))); for (let y = top + 2; y < 108; y++) R.pset(x, y, hh(x >> 1, y >> 1, 9) < 0.2 ? PI[2] : PI[1]); }
  R.disco(170, 96, 3, PI[0]); R.rect(167, 99, 173, 106, PI[0]); R.rect(168, 100, 172, 106, hex('#7a9ac8')); R.pset(170, 95, PI[3]);
  for (const x0 of [130, 188]) { R.rect(x0, 104, x0 + 21, 145, PI[2]); for (let k = 0; k < 3; k++) { const fx = x0 + 3 + k * 7; R.rect(fx - 1, 128, fx + 4, 130, PI[0]); R.rect(fx, 114, fx + 3, 127, PI[1]); R.rect(fx + 3, 114, fx + 3, 127, PI[3]); R.disco(fx + 1.5, 111, 2, PI[0]); R.pset(fx + 1, 120, PI[3]); R.pset(fx + 2, 123, PI[3]); R.rect(fx - 1, 107, fx + 4, 108, PI[3]); } }
  R.rect(152, 108, 188, 145, hex('#2a1810')); R.rect(153, 109, 169, 145, hex('#6a4224')); for (let x = 155; x < 169; x += 4) R.rect(x, 109, x, 145, hex('#4a2c16')); for (let y = 114; y < 145; y += 8) for (let x = 156; x < 169; x += 4) R.pset(x, y, hex('#c8a040'));
  R.rect(170, 109, 187, 145, hex('#1a1210')); for (let y = 110; y < 145; y++) for (let x = 171; x < 187; x++) if (hh(x, y, 4) < 0.05) R.pset(x, y, hex('#3a2a1a')); R.rect(184, 109, 187, 145, hex('#5a3a20'));
  // la basílica de los Desamparados: muro rosado, pilastras, balcones y la cúpula de tejas azules vidriadas
  for (let y = 84; y < 146; y++) for (let x = 241; x < 320; x++) R.pset(x, y, (x - 241) % 26 < 3 ? hex('#e8c8a0') : hh(x >> 1, y >> 1, 12) < 0.12 ? hex('#c89068') : hex('#d8a07a'));
  R.rect(241, 82, 319, 85, hex('#f0dcc0')); R.rect(241, 86, 319, 86, hex('#a86a4a'));
  for (const wx of [254, 280, 306]) { R.rect(wx - 5, 96, wx + 5, 118, K); R.rect(wx - 4, 97, wx + 4, 118, hex('#2a3a5a')); R.rect(wx, 97, wx, 118, hex('#5a6a8a')); R.rect(wx - 7, 119, wx + 7, 120, hex('#2a2a30')); for (let i = wx - 6; i <= wx + 6; i += 2) R.rect(i, 114, i, 119, hex('#2a2a30')); R.rect(wx - 6, 93, wx + 6, 95, hex('#f0dcc0')); }
  { const cx = 272, cy = 82, r = 24; for (let j = -r; j <= 0; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j * 1.15); if (d > r) continue; const fila = Math.floor((j + r) / 3), col = Math.floor((i + 40 + (fila & 1) * 2) / 4), costilla = Math.abs(Math.round(i / (r - d * 0.0 + 1) * 6) - i / (r + 1) * 6) < 0.12;
      let c = (col + fila) % 2 ? hex('#2a62c0') : hex('#3a7ad8'); if (i < -r * 0.4) c = mez(c, BL, 0.18); if (i > r * 0.45) c = mez(c, K, 0.25); if (hh(col, fila, 3) < 0.15) c = hex('#e8c040'); if (costilla || Math.abs(i) % 10 === 0) c = hex('#f0e8d8'); if (d > r - 1) c = K; R.pset(cx + i, cy + j, c); }
    R.rect(cx - 4, 50, cx + 4, 60, PI[1]); R.rect(cx - 2, 52, cx - 1, 58, hex('#2a2024')); R.rect(cx + 1, 52, cx + 2, 58, hex('#2a2024')); R.disco(cx, 49, 4, hex('#3a7ad8')); R.rect(cx, 40, cx, 45, hex('#c8a040')); R.rect(cx - 2, 42, cx + 2, 42, hex('#c8a040')); }
  // el suelo de la plaza: losas en perspectiva, con juntas, manchas y la sombra de los edificios
  for (let y = 146; y < 180; y++) { const z = y - 120; for (let x = 0; x < 320; x++) { const u = (x - 170) / z * 6, v = 260 / z, ia = Math.floor(u), ib = Math.floor(v);
      const junta = Math.abs(u - Math.round(u)) < 0.06 * (z / 26) || Math.abs(v - Math.round(v)) < 0.05, c0 = hh(ia, ib, 21) < 0.25 ? hex('#cfc0a2') : hh(ia, ib, 22) < 0.1 ? hex('#e8dcc4') : hex('#ddd0b4');
      R.pset(x, y, junta ? hex('#b0a084') : y < 150 ? mez(c0, hex('#8a7a64'), 0.3) : c0); } }
  // los naranjos en sus maceteros, el banco y la farola
  for (const tx of [10, 304]) { R.rect(tx - 9, 152, tx + 9, 166, K); R.rect(tx - 8, 153, tx + 8, 166, hex('#c8a078')); R.rect(tx - 8, 153, tx + 8, 154, hex('#e8c8a0')); R.rect(tx - 1, 128, tx + 1, 152, hex('#5a3a22'));
    for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) { const d = Math.hypot(i, j * 1.2); if (d > 15) continue; const v = hh(tx + i, 120 + j, 40); R.pset(tx + i, 118 + j, d > 13.5 ? hex('#1a4a2a') : v < 0.07 ? hex('#f08a20') : i - j < -10 ? hex('#5aa04a') : v < 0.5 ? hex('#2a6a3a') : hex('#3a8a4a')); } }
  R.rect(226, 156, 254, 158, hex('#8a5a32')); R.rect(226, 152, 254, 153, hex('#a87444')); for (const x of [228, 252]) R.rect(x, 156, x + 1, 164, hex('#2a2a30'));
  R.rect(214, 100, 215, 160, hex('#2a2a30')); R.rect(211, 92, 218, 100, K); R.rect(212, 93, 217, 99, hex('#f0e0a0')); R.rect(210, 91, 219, 91, hex('#2a2a30')); R.rect(212, 158, 217, 160, hex('#2a2a30'));
  R.usar(prev); pbHecho = true;
};
// una nube de tres tonos (sombra, cuerpo y luz) hecha con discos
const nube = (cx, cy, wd, cS, cM, cL) => { const bolas = [[0, 0, 0.32], [-0.32, 0.06, 0.24], [0.3, 0.05, 0.26], [-0.1, -0.12, 0.26], [0.14, -0.08, 0.22]];
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx * wd), Math.round(cy + dy * wd + 1), Math.round(r * wd), cS);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx * wd), Math.round(cy + dy * wd), Math.round(r * wd * 0.92), cM);
  for (const [dx, dy, r] of bolas) R.disco(Math.round(cx + dx * wd - 1), Math.round(cy + dy * wd - 2), Math.round(r * wd * 0.62), cL); };
const golondrina = (x, y, t, k) => { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 12 + k) > 0 ? 1 : 0; R.pset(x, y, hex('#1a1a2a')); R.pset(x - 1, y - a, hex('#1a1a2a')); R.pset(x - 2, y - 1 + a, hex('#1a1a2a')); R.pset(x + 1, y - a, hex('#1a1a2a')); R.pset(x + 2, y - 1 + a, hex('#1a1a2a')); };
const paloma = (x, y, t, k, vuela) => { x = Math.round(x); y = Math.round(y); const gr = hex('#8a8a9a'), os = hex('#5a5a6a');
  if (vuela) { const a = Math.sin(t * 16 + k) > 0; R.rect(x - 2, y, x + 2, y + 1, gr); R.pset(x + 3, y, os); R.linea(x - 1, y, x - 4, y + (a ? -3 : 2), os); R.linea(x + 1, y, x + 3, y + (a ? -3 : 2), gr); return; }
  const pica = Math.sin(t * 5 + k * 1.7) > 0.4 ? 1 : 0; R.rect(x - 2, y - 3, x + 2, y - 1, gr); R.rect(x - 2, y - 1, x + 1, y - 1, os); R.pset(x + 2 + pica, y - 4 + pica * 2, os); R.pset(x + 3 + pica, y - 4 + pica * 2, hex('#e8a040')); R.pset(x - 3, y - 2, os); R.pset(x, y, hex('#c86a4a')); R.pset(x + 1, y, hex('#c86a4a')); };
// la fuente del Turia: el pilón oval, el agua que riela, la figura de bronce y los chorros
const fuente = (t) => { const cx = 92, cy = 162;
  for (let j = -9; j <= 9; j++) for (let i = -38; i <= 38; i++) { const d = (i / 38) ** 2 + (j / 9) ** 2; if (d > 1) continue; const di = (i / 33) ** 2 + ((j + 1) / 6.5) ** 2;
    let c = di < 1 ? (Math.sin(i * 0.5 + t * 3 + j) > 0.75 ? hex('#a8d8f0') : j < -2 ? hex('#3a7ab0') : hex('#4a8ac8')) : j > 0 ? hex('#a89878') : d > 0.86 ? hex('#8a7a60') : hex('#d8c8a8'); R.pset(cx + i, cy + j, c); }
  R.rect(cx - 12, 150, cx + 12, 156, K); R.rect(cx - 11, 151, cx + 11, 155, hex('#6a4a32')); R.disco(cx + 9, 149, 3, hex('#6a4a32')); R.pset(cx + 8, 148, hex('#a8784a')); R.rect(cx - 11, 151, cx + 4, 151, hex('#a8784a')); R.linea(cx - 10, 150, cx - 14, 146, hex('#6a4a32'));
  for (const [sx, k] of [[-30, 0], [-18, 1], [18, 2], [30, 3]]) { const x0 = cx + sx; R.rect(x0 - 1, 150, x0 + 1, 156, hex('#5a3a28')); R.pset(x0, 149, hex('#8a6a4a'));
    for (let n = 0; n < 9; n++) { const u = ((t * 1.4 + n / 9 + k * 0.3) % 1), px = Math.round(x0 - Math.sign(sx) * u * 10), py = Math.round(149 - Math.sin(u * Math.PI) * 6 + u * 9); R.pset(px, py, n % 2 ? hex('#d8f0ff') : hex('#a8d8f0')); } }
};
const bocadilloCopa = (x, y, t) => { R.rect(x - 11, y - 22, x + 11, y, K); R.rect(x - 10, y - 21, x + 10, y - 1, BL); R.rect(x - 10, y - 1, x + 10, y - 1, hex('#d8d8e0')); R.pset(x - 3, y + 1, K); R.pset(x - 2, y + 2, K); R.pset(x - 2, y + 1, BL); R.pset(x - 3, y, BL); T.copa(R, x, y - 4, t, { tipo: 'agata', s: 1, brillo: 0.8 }); };
const bandera = (x, y, t) => { R.linea(x, y, x, y - 14, hex('#3a3a42')); const f = Math.round(Math.sin(t * 6)); R.poligono([[x + 1, y - 14], [x + 9, y - 11 + f], [x + 1, y - 8]], hex('#e8783a')); R.pset(x + 2, y - 12, hex('#f8b878')); };

// 1 · la plaza de la Virgen
const AGATA = a(0.085), EXPERTOS = a(0.209);
const p1 = (t) => {
  if (!pbHecho) pintaPlaza(); R.copiar(PB);
  // nubes de tres tonos a tres velocidades y los vencejos que rondan el Miguelete
  nube(((t * 3 + 150) % 420) - 50, 30, 34, hex('#a8c0dc'), hex('#e0ecf8'), BL);
  nube(((t * 5 + 300) % 420) - 50, 60, 22, hex('#b8cce4'), hex('#e8f0fa'), BL);
  nube(((t * 1.8 + 10) % 420) - 50, 26, 16, hex('#a0b8d8'), hex('#d8e6f6'), BL);
  for (let k = 0; k < 6; k++) golondrina(52 + Math.cos(t * 1.3 + k) * (26 + k * 3), 34 + Math.sin(t * 2.1 + k * 1.3) * 10, t, k);
  // la campana de la espadaña se mece
  { const sw = Math.round(Math.sin(t * 2.2) * 2); R.disco(52 + sw, 26, 3, hex('#c8a040')); R.rect(49 + sw, 27, 55 + sw, 28, hex('#a88028')); R.pset(51 + sw, 24, hex('#f0d070')); }
  // la guía y el grupo: entran por la puerta abierta (x 171–186) en «experts»
  const guiaU = tramo(t, EXPERTOS, EXPERTOS + 0.8), gx = Math.round(lerp(128, 172, guiaU));
  if (guiaU < 0.98) { const o = { dir: 1, anda: guiaU > 0, habla: t > AGATA && t < EXPERTOS && Math.sin(t * 8) > 0, sostiene: [gx + 13, 128] }; const m = R.actor(EL.senora30, gx, 148, t, o).mano; bandera(m[0], m[1], t); }
  if (t > AGATA && t < EXPERTOS + 0.6) bocadilloCopa(gx + 8, 118, t);
  [[EL.turista, 202], [EL.senor30, 220], [EL.chica, 238], [EL.peregrino && EL.vecino ? EL.vecino : EL.turista, 256]].forEach(([def, x0], k) => {
    const u = tramo(t, EXPERTOS + 0.3 + k * 0.25, EXPERTOS + 1.4 + k * 0.3), x = Math.round(lerp(x0, 172, u)); if (u > 0.97) return;
    R.actor(def, x, 150 + (k & 1), t, { dir: -1, anda: u > 0, sonrisa: t > AGATA + 0.3 && k === 1, habla: k === 2 && t < EXPERTOS && Math.sin(t * 7) > 0.3 });
  });
  fuente(t);
  // el niño cruza corriendo por delante y las palomas echan a volar
  const nu = tramo(t, 2.5, 4.3), nx = Math.round(lerp(330, -20, nu));
  for (let k = 0; k < 6; k++) { const px0 = 186 + k * 13 + (k & 1) * 4, py0 = 172 + (k % 3) * 2, sale = 2.75 + k * 0.08, v = Math.max(0, t - sale);
    if (v <= 0) paloma(px0 + Math.round(Math.sin(t * 0.7 + k) * 2), py0, t, k, false); else paloma(px0 - v * 30 - k * 4 * v, py0 - v * 46 - v * v * 8, t, k, true); }
  if (nu > 0 && nu < 1) R.actor(EL.chico, nx, 178, t, { dir: -1, anda: true, sonrisa: true });
};

// 2 · la capilla del Santo Cáliz (1982): la cartela de la datación y el papa que alza la copa
const DOS = a(0.424), UNO = a(0.591), CRISTO = a(0.672), ENROLLA = a(0.8), PAPAS = a(0.828);
const vitrinaVacia = () => { R.rect(141, 83, 179, 109, hex('#5a2a3a')); for (let y = 84; y < 109; y += 3) R.rect(141, y, 179, y, hex('#4e2232')); R.rect(141, 110, 179, 121, T.C.oroS || hex('#a88028')); R.rect(141, 110, 179, 110, T.C.oroL || hex('#f0d070')); for (let x = 142; x < 179; x += 3) R.pset(x, 115, T.C.oro || hex('#c8a040')); R.rect(140, 82, 180, 82, hex('#c8d8e8')); R.rect(140, 82, 140, 122, hex('#a8b8c8')); R.rect(180, 82, 180, 122, hex('#a8b8c8')); };
const cartela = (t) => {
  const abre = tramo(t, DOS - 0.15, DOS + 0.35) - tramo(t, ENROLLA, ENROLLA + 0.35); if (abre <= 0) return;
  const hw = Math.round(66 * abre), x0 = 160 - hw, x1 = 160 + hw, y0 = 34, y1 = 60;
  R.rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, hex('#2a1418')); R.rect(x0, y0, x1, y1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#efe2c0')); R.rect(x0 + 1, y1 - 2, x1 - 1, y1 - 1, hex('#d8c8a0'));
  for (const xx of [x0, x1]) { R.rect(xx - 2, y0 - 2, xx + 2, y1 + 2, K); R.rect(xx - 1, y0 - 1, xx + 1, y1 + 1, hex('#c8a878')); R.rect(xx - 1, y0 - 1, xx - 1, y1 + 1, hex('#e8d0a0')); }
  if (abre < 0.98) return;
  R.recorte([x0 + 2, y0 + 2, x1 - 2, y1 - 2]);
  R.linea(102, 50, 218, 50, hex('#6a4a2a')); for (let x = 102; x <= 218; x += 10) R.pset(x, 49, hex('#6a4a2a'));
  R.rect(159, 40, 161, 54, hex('#c8303a')); R.rect(155, 44, 165, 46, hex('#c8303a'));
  const ban = tramo(t, DOS + 0.1, CRISTO + 0.4); if (ban > 0) { const xa = Math.round(lerp(160, 112, Math.min(1, ban * 1.6))), xb = Math.round(lerp(160, 208, Math.max(0, ban * 1.6 - 0.6))); R.rect(xa, 52, xb, 54, hex('#c83a3a')); R.rect(xa, 52, xb, 52, hex('#e86a6a')); }
  if (t > DOS + 0.1) { R.numero('200', 124, 47, { centro: true }); R.poligono([[104, 46], [110, 42], [110, 50]], hex('#6a4a2a')); }
  if (t > UNO) { R.numero('100', 196, 47, { centro: true }); R.poligono([[216, 46], [210, 42], [210, 50]], hex('#6a4a2a')); }
  R.recorte(null);
};
const incensario = (x, y, t) => { const an = Math.sin(t * 2.6) * 0.5, L = 11, ex = Math.round(x + Math.sin(an) * L), ey = Math.round(y + Math.cos(an) * L);
  R.linea(x, y, ex, ey, hex('#c8a040')); R.disco(ex, ey + 2, 3, K); R.disco(ex, ey + 2, 2, hex('#c8a040')); R.pset(ex - 1, ey + 1, hex('#f0d070')); R.rect(ex - 1, ey - 1, ex + 1, ey - 1, hex('#a88028'));
  for (let k = 0; k < 7; k++) { const u = (t * 0.6 + k / 7) % 1, px = Math.round(ex + Math.sin(u * 6 + k) * 3 + u * 6), py = Math.round(ey - u * 34); if (R.b4(px, py) < 0.7 - u * 0.5) { R.pset(px, py, hex('#e8e4ec')); R.pset(px + 1, py, hex('#c8c4d0')); } } };
const p2 = (t) => {
  T.grial(R, t, { encuadre: 'valencia' }); vitrinaVacia();
  // el monaguillo de alba blanca mece el incensario
  { const m = R.actor(EL.escribano, 72, 166, t, { dir: 1, sostiene: [87, 148], pal: { C: hex('#f2eee2'), c: hex('#c8c0b0') } }).mano; incensario(m[0], m[1], t); }
  // el obispo reza a la derecha y asiente cuando el papa alza la copa
  R.actor(EL.obispo, 232, 166, t, { dir: -1, sonrisa: t > PAPAS + 0.4, habla: t > DOS && t < UNO && Math.sin(t * 5) > 0.6 });
  // el papa, tras el altar, con la copa de ágata; en «Two popes» la alza despacio
  const al = tramo(t, PAPAS, PAPAS + 0.9) - tramo(t, P3 - 0.6, P3 - 0.1);
  const m = R.actor(EL.papa, 152, 146, t, { dir: 1, sonrisa: true, sostiene: [Math.round(lerp(167, 163, al)), Math.round(lerp(134, 108, al))] }).mano;
  T.copa(R, m[0], m[1] + 4, t, { tipo: 'agata', s: 1, brillo: 0.2 + al * 0.8 });
  T.grialDelante(R, t, { encuadre: 'valencia' });
  cartela(t);
};

// 3 · la copa de cerca; la mano llega al cristal y no la toca
const DUDA = b(0.175), PERO = b(0.513), TOCA = b(0.84);
const p3 = (t) => {
  const d = T.grial(R, t, { encuadre: 'valencia', camara: 'caliz' });
  if (t > DUDA && t < b(0.45)) R.bocadillo(214, 82, { icono: '?' });
  const u = tramo(t, PERO, PERO + 1.2), pega = tramo(t, TOCA, TOCA + 0.35);
  if (u > 0) { const wx = Math.round(lerp(300, 254 - pega * 3, u)), wy = Math.round(lerp(200, 144, u));
    if (pega > 0) { for (let j = -9; j <= 9; j++) for (let i = -12; i <= 12; i++) { const dd = Math.hypot(i, j * 1.3); if (dd < 11 && R.b4(wx - 12 + i, wy + j) < (1 - dd / 11) * 0.5 * pega) R.pset(wx - 12 + i, wy + j, hex('#e8eef4')); } }
    T.brazo(R, wx + 22, 204, wx, wy, '#3a6ac8', -1, { sombra: false });
    if (pega > 0.9) for (const [i, j] of [[-18, -6], [-20, 2], [-17, 8]]) R.pset(wx + i, wy + j, BL); }
};

const efectos = [[AGATA, 'pop'], [2.8, 'whoosh'], [DOS - 0.1, 'papel'], [PAPAS + 0.2, 'brillo'], [DUDA, 'pop'], [TOCA, 'golpecito']];
const año = (t) => t < P2 ? 2026 : t < P3 ? 1982 : 2026;
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año });
''')

E['te-sauniere'] = ('El cura de Rennes', '''// TE-SAUNIERE (frases 37–39), 1885–1910, cartela «1885». Cinco planos:
// 1. (colina 1885, general) el pueblo pobre en su colina; un carro de mulas sube por el camino con el cura joven y su
//    maleta remendada; en «In 1885» un bache: la maleta salta y el cura se sobresalta; en «poor priest» mira el pueblo;
// 2. (colina, iglesia; corte en «Saunière») en «arrives» el cura llega a pie con la maleta, la deja ante la iglesia y
//    mira la portada; un niño pasa con su aro; en «tiny village» una vecina con su cesta le saluda y él responde;
// 3. (villa, torre; corte en «A few years later») 1905: el cura sale de la torre Magdala y pasea satisfecho con su perro
//    Pomponnet; en «villa» señala la torre (el perro ladra); en «garden» el jardinero riega y una flor se abre;
// 4. (despacho, general; corte en «a stone tower») en «library» guarda un libro en la estantería; en «Where did the
//    money come from?» el cartero vacía la saca y la mesa se llena de sobres («?»); en «His bishop» entra el obispo,
//    serio, y le señala;
// 5. (fondo local; corte en «He took») el despacho del obispo en Carcasona: el obispo cuenta sobres y el contador sube
//    a miles en «thousands»; el secretario apunta; en «1910» el obispo sella la sentencia y en «punished» señala al
//    cura, que agacha la cabeza.''', r'''
const l = (f) => en('llega', f), v = (f) => en('villa', f), m = (f) => en('misas', f);
const S2 = l(0.501), S3 = v(0), S4 = v(0.77), S5 = m(0.359);
const K = T.C.k, BL = hex('#ffffff');
const hh = (x, y, s) => { let n = (x * 374761393 + y * 668265263 + s * 982451653) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const mez = (p, q, u) => { let r = 0; for (const s of [0, 8, 16]) { const ca = (p >>> s) & 255, cb = (q >>> s) & 255; r += Math.round(ca + (cb - ca) * u) * (1 << s); } return (0xff000000 + r) >>> 0; };
// la maleta remendada (x, y: el asa, arriba en el centro)
const maleta = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 2, y - 1, x + 2, y, K); R.rect(x - 6, y + 1, x + 6, y + 9, K); R.rect(x - 5, y + 2, x + 5, y + 8, hex('#7a4a2a')); R.rect(x - 5, y + 2, x + 5, y + 2, hex('#a8703a')); R.rect(x - 5, y + 8, x + 5, y + 8, hex('#5a3418')); R.rect(x - 2, y + 2, x - 2, y + 8, hex('#3a2414')); R.rect(x + 2, y + 2, x + 2, y + 8, hex('#3a2414')); R.rect(x + 3, y + 4, x + 5, y + 6, hex('#b8a070')); R.pset(x + 4, y + 5, hex('#8a7a50')); };
// un sobre cerrado (x, y: arriba a la izquierda; 8 × 6)
const sobre = (x, y, c = hex('#f2eee2')) => { x = Math.round(x); y = Math.round(y); R.rect(x, y, x + 7, y + 5, K); R.rect(x + 1, y + 1, x + 6, y + 4, c); R.pset(x + 2, y + 2, hex('#b8b0a0')); R.pset(x + 3, y + 3, hex('#b8b0a0')); R.pset(x + 4, y + 3, hex('#b8b0a0')); R.pset(x + 5, y + 2, hex('#b8b0a0')); R.pset(x + 6, y + 1, hex('#c83a3a')); };
// un perro pequeño blanco con una mancha (Pomponnet)
const globo = (x, y, icono, col = K) => { x = Math.round(x); y = Math.round(y); R.rect(x - 11, y - 20, x + 11, y, K); R.rect(x - 10, y - 19, x + 10, y - 1, BL); R.rect(x - 10, y - 1, x + 10, y - 1, hex('#d8d8e0')); R.pset(x - 2, y + 1, K); R.pset(x - 1, y + 2, K); R.pset(x - 1, y + 1, BL); R.icono(icono, x - 7, y - 17, col, BL, 2); };
const PERRO = ['.........kk...', '........kBWk..', '.k......kWWkWk', 'kWk.....kWWWWk', '.kWkkkkkkWWWk.', '..kWWWWWWWWk..', '..kWBBWWWWWk..', '..kWWWWWWWWk..', '..kWkkkkkWkk..'];
const PATAS = [['..kk.....kk...'], ['...kk...kk....']];
const perro = (x, base, t, dir, p, ladra = false) => { const pal = { k: K, W: hex('#f2eee2'), B: hex('#a8743c') }, rows = PERRO.concat(PATAS[p]), y0 = base - rows.length - (ladra ? 1 : 0);
  rows.forEach((r, j) => { for (let i = 0; i < 14; i++) { const c = r[i]; if (c === '.') continue; R.pset(dir > 0 ? x + i : x + 13 - i, y0 + j, pal[c]); } });
  if (ladra) { const bx = dir > 0 ? x + 15 : x - 2; R.pset(bx, y0 + 3, K); R.pset(bx + dir, y0 + 2, K); R.pset(bx + dir, y0 + 5, K); R.pset(bx + 2 * dir, y0 + 1, K); R.pset(bx + 2 * dir, y0 + 6, K); } };

// 1 · la colina en 1885: el carro sube con el cura y su maleta
const BACHE = l(0.25), POBRE = l(0.339);
const carreta = (x, suelo, t, bache) => {
  x = Math.round(x); const y = suelo - Math.round(bache * 3);
  T.b_caballo(R, x + 40, suelo, t, { dir: 1, anda: true, color: '#7a6a5a', crin: '#3a2a20' });
  // el arriero y el cura van sentados en la caja (se les ve de cintura arriba)
  R.actor(EL.vecino, x + 26, y - 10, t, { dir: 1, sostiene: [x + 42, y - 22] });
  R.linea(x + 42, y - 22, x + 60, y - 20, hex('#3a2414'));
  const sorp = t > BACHE && t < BACHE + 0.8, mira = t > POBRE;
  R.actor(EL.sauniere, x + 6, y - 10, t, { dir: 1, sorpresa: sorp, sonrisa: mira && !sorp, habla: false });
  const salta = Math.max(0, Math.sin(tramo(t, BACHE, BACHE + 0.6) * Math.PI)) * 9; maleta(x + 4, y - 26 - salta);
  // la caja de tablas, las varas y la rueda que gira
  R.rect(x - 2, y - 18, x + 38, y - 8, K); R.rect(x - 1, y - 17, x + 37, y - 9, hex('#8a5a32')); for (let i = x + 4; i < x + 38; i += 7) R.rect(i, y - 17, i, y - 9, hex('#5a3418')); R.rect(x - 1, y - 17, x + 37, y - 17, hex('#b07a44')); R.rect(x - 1, y - 13, x + 37, y - 13, hex('#6a4022'));
  R.linea(x + 37, y - 12, x + 50, y - 12, hex('#5a3418')); R.linea(x + 37, y - 11, x + 50, y - 11, hex('#3a2414'));
  const cx = x + 18, cy = y - 7; R.disco(cx, cy, 8, K); R.disco(cx, cy, 7, hex('#6a4022')); R.disco(cx, cy, 5, K); R.disco(cx, cy, 4, hex('#8a6a40'));
  for (let k = 0; k < 6; k++) { const an = t * 5 + k * Math.PI / 3; R.linea(cx, cy, Math.round(cx + Math.cos(an) * 6), Math.round(cy + Math.sin(an) * 6), hex('#5a3418')); } R.disco(cx, cy, 1, hex('#3a2a20'));
  // polvo detrás de la rueda
  for (let k = 0; k < 5; k++) { const u = (t * 1.5 + k / 5) % 1, px = Math.round(cx - 10 - u * 18), py = Math.round(suelo - 2 - u * 6); if (R.b4(px, py) < 0.8 - u * 0.7) R.pset(px, py, hex('#d8c8a0')); }
};
const p1 = (t) => {
  const d = T.rennes(R, t, { anyo: 1885 });
  const u = tramo(t, 1.3, S2 - 0.1), x = lerp(-80, 150, u), bache = t > BACHE && t < BACHE + 0.3 ? Math.sin((t - BACHE) / 0.3 * Math.PI) : 0;
  carreta(x, d.suelo, t, bache);
  if (t > POBRE && t < POBRE + 1.4) globo(Math.round(x) + 14, d.suelo - 40, '!', hex('#c8303a'));
};

// 2 · la iglesia: llega con la maleta, la deja, mira; la vecina le saluda; el niño del aro
const LLEGA = l(0.552), DEJA = l(0.66), VECINA = l(0.782), COLINA = l(0.872);
const p2 = (t) => {
  const d = T.rennes(R, t, { camara: 'iglesia' });
  const u = tramo(t, S2 + 0.1, DEJA - 0.15), x = Math.round(lerp(-18, 112, u)), dejada = t > DEJA;
  const o = { dir: 1, anda: u > 0 && u < 1 };
  if (!dejada) o.sostiene = [x + 13, d.suelo - 12 + (o.anda && Math.floor(t * 5) % 2 ? 1 : 0)];
  else if (t > VECINA + 0.9 && t < COLINA + 0.9) { o.habla = Math.sin(t * 8) > 0; o.dir = 1; o.dedo = t > COLINA; }
  else if (t > DEJA + 0.3 && t < VECINA) o.sorpresa = t < DEJA + 1.0; else o.sonrisa = t > VECINA;
  const mm = R.actor(EL.sauniere, x, d.suelo, t, o).mano;
  if (!dejada) maleta(mm[0], mm[1] - 2); else maleta(x - 6, d.suelo - 10);
  // la vecina con su cesta de pan llega por la derecha y le saluda
  { const w = tramo(t, VECINA - 0.6, VECINA + 0.5), vx = Math.round(lerp(330, 168, w)); const mv = R.actor(EL.vecina, vx, d.suelo, t, { dir: -1, anda: w > 0 && w < 1, habla: w >= 1 && t < VECINA + 0.9 && Math.sin(t * 8) > 0, sonrisa: t > VECINA + 0.9, sostiene: [vx - 1, d.suelo - 12] }).mano;
    R.rect(mv[0] - 5, mv[1] - 1, mv[0] + 4, mv[1] + 4, K); R.rect(mv[0] - 4, mv[1], mv[0] + 3, mv[1] + 3, hex('#b8884a')); for (let i = -4; i < 4; i += 2) R.pset(mv[0] + i, mv[1] + 1, hex('#8a6030')); R.rect(mv[0] - 3, mv[1] - 3, mv[0] + 2, mv[1] - 1, hex('#d8a050')); R.pset(mv[0] - 1, mv[1] - 3, hex('#f0c070')); }
  // el niño que hace rodar su aro por delante, de derecha a izquierda
  { const w = tramo(t, S2 + 1.6, S3 - 0.2); if (w > 0 && w < 1) { const cx = Math.round(lerp(340, -30, w)); const mc = R.actor(EL.chico, cx + 8, d.suelo + 10, t, { dir: -1, anda: true, sonrisa: true, sostiene: [cx + 6, d.suelo - 2] }).mano;
      const ax = cx - 2, ay = d.suelo + 4; R.anillo(ax, ay, 6, hex('#8a6a40')); R.anillo(ax, ay, 5, hex('#5a3a20')); const an = -t * 8; R.pset(Math.round(ax + Math.cos(an) * 5), Math.round(ay + Math.sin(an) * 5), hex('#c8a060')); R.linea(mc[0], mc[1], ax + 3, ay - 2, hex('#5a3418')); } }
};

// 3 · la torre Magdala (1905): pasea satisfecho con Pomponnet; señala la torre; el jardinero riega
const VILLA = v(0.532), JARDIN = v(0.649);
const maceta = (x, y, t, k, abre) => { R.rect(x - 4, y - 5, x + 4, y, K); R.rect(x - 3, y - 4, x + 3, y, hex('#c86a3a')); R.rect(x - 3, y - 4, x + 3, y - 4, hex('#e8904a'));
  const sw = Math.round(Math.sin(t * 2 + k)); for (let i = -2; i <= 2; i += 2) { R.linea(x + i, y - 5, x + i + sw, y - 9, hex('#3a7a3a')); R.pset(x + i + sw, y - 10, [hex('#e84a6a'), hex('#f0d040'), hex('#c84ae8')][(k + i + 2) % 3]); }
  if (abre > 0) { const r = Math.round(1 + abre * 3), cx = x + sw, cy = y - 13; for (let q = 0; q < 6; q++) { const an = q * Math.PI / 3 + t; R.disco(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r), 1.6, hex('#e84a6a')); } R.disco(cx, cy, 1.4, hex('#f0d040')); } };
const p3 = (t) => {
  const d = T.rennes(R, t, { encuadre: 'villa', camara: 'torre' });
  // las macetas del jardín sobre la balaustrada; el jardinero las riega
  for (const [x, k] of [[24, 0], [52, 1], [80, 2]]) maceta(x, 133, t, k, k === 1 ? tramo(t, JARDIN, JARDIN + 0.6) : 0);
  { const riega = Math.sin(t * 1.3) > -0.4 || t > JARDIN, jx = 60; const mj = R.actor(EL.vecino, jx, d.suelo, t, { dir: -1, sostiene: [jx - 2, d.suelo - 18], sonrisa: t > JARDIN + 0.4 }).mano;
    R.rect(mj[0] - 6, mj[1] - 2, mj[0] + 1, mj[1] + 4, K); R.rect(mj[0] - 5, mj[1] - 1, mj[0], mj[1] + 3, hex('#5a8a9a')); R.linea(mj[0] - 6, mj[1], mj[0] - 11, mj[1] - 4, hex('#5a8a9a'));
    if (riega) for (let n = 0; n < 6; n++) { const u = (t * 2 + n / 6) % 1; R.pset(Math.round(mj[0] - 12 - u * 2), Math.round(mj[1] - 4 + u * 10), hex('#a8d8f0')); } }
  // el cura sale de la torre y pasea; en «villa» se vuelve y la señala; el perro le sigue y ladra
  const sal = tramo(t, S3 + 0.2, S3 + 0.6), u = tramo(t, S3 + 0.6, v(0.42)), x = Math.round(lerp(218, 112, u));
  const vuelve = t > VILLA - 0.2;
  if (sal < 1) { R.rect(217, 128, 231, 159, hex('#1a1210')); }
  R.actor(EL.sauniere, x, d.suelo, t, { dir: vuelve ? 1 : -1, anda: u > 0 && u < 1, sonrisa: !vuelve || t > VILLA + 0.9, dedo: vuelve && t < VILLA + 1.2, habla: t > JARDIN && t < JARDIN + 0.8 && Math.sin(t * 8) > 0 });
  const pu = tramo(t, S3 + 0.9, v(0.46)), px = Math.round(lerp(236, 134, pu)), ladra = t > VILLA + 0.2 && t < VILLA + 0.9 && Math.sin(t * 14) > 0;
  perro(px, d.suelo, t, vuelve ? 1 : -1, pu > 0 && pu < 1 ? Math.floor(t * 8) % 2 : 0, ladra);
};

// 4 · el despacho: guarda un libro; el cartero vacía la saca; entra el obispo
const LIBRO = v(0.912), DONDE = m(0), VACIA = m(0.1), OBISPO = m(0.192), DESCUBRE = m(0.244);
const p4 = (t) => {
  const d = T.rennes(R, t, { encuadre: 'despacho', sobres: 0.3 + 0.7 * tramo(t, VACIA, VACIA + 0.8) });
  // los sobres que vuelan de la saca a la mesa
  for (let k = 0; k < 9; k++) { const u = tramo(t, VACIA + k * 0.06, VACIA + 0.45 + k * 0.06); if (u <= 0 || u >= 1) continue; sobre(lerp(78, 104 + k * 10, u), 134 - Math.sin(u * Math.PI) * 24 - u * 4); }
  if (t > DONDE + 0.3 && t < OBISPO) globo(150, 108, '?');
  // el cura guarda un libro y va a la mesa
  const va = tramo(t, LIBRO + 0.5, DONDE + 0.1), x = Math.round(lerp(236, 140, va)), o = { dir: va > 0 ? -1 : 1, anda: va > 0 && va < 1 };
  if (t < LIBRO + 0.4) { o.sostiene = [Math.round(lerp(250, 258, tramo(t, LIBRO - 0.4, LIBRO))), 138]; }
  else if (t > VACIA + 0.6 && t < OBISPO + 0.4) { o.sostiene = [x - 2, 150]; o.sonrisa = true; }
  if (t > OBISPO + 0.4) { o.dir = 1; o.sorpresa = t < DESCUBRE + 0.7; o.triste = t > DESCUBRE + 0.7; delete o.sostiene; }
  const mc = R.actor(EL.sauniere, x, d.suelo, t, o).mano;
  if (t < LIBRO + 0.4) { R.rect(mc[0] - 2, mc[1] - 8, mc[0] + 3, mc[1] + 1, K); R.rect(mc[0] - 1, mc[1] - 7, mc[0] + 2, mc[1], hex('#c83a3a')); R.rect(mc[0] - 1, mc[1] - 5, mc[0] + 2, mc[1] - 5, hex('#e8c040')); }
  else { R.rect(257, 130, 261, 139, K); R.rect(258, 131, 260, 138, hex('#c83a3a')); R.rect(258, 133, 260, 133, hex('#e8c040')); }
  if (o.sostiene && t > VACIA + 0.6) sobre(mc[0] - 4, mc[1] - 3);
  // el cartero con la saca
  { const e = tramo(t, DONDE - 0.6, DONDE + 0.5), s = tramo(t, VACIA + 0.9, VACIA + 1.8), cx = Math.round(lerp(-20, 62, e) - lerp(0, 90, s));
    if (cx > -20) { const mp = R.actor(EL.soldadoAzul, cx, d.suelo, t, { dir: s > 0 ? -1 : 1, anda: (e > 0 && e < 1) || (s > 0 && s < 1), sonrisa: e >= 1, sostiene: [cx + 14, d.suelo - (t > VACIA && t < VACIA + 0.5 ? 22 : 14)] }).mano;
      const llena = t < VACIA + 0.3; R.rect(mp[0] - 1, mp[1] - 2, mp[0] + 11, mp[1] + (llena ? 12 : 6), K); R.rect(mp[0], mp[1] - 1, mp[0] + 10, mp[1] + (llena ? 11 : 5), hex('#c8b088')); R.rect(mp[0], mp[1] - 1, mp[0] + 10, mp[1] - 1, hex('#e8d0a8')); if (llena) { sobre(mp[0] + 1, mp[1] - 5); sobre(mp[0] + 4, mp[1] - 6, hex('#e8dcc0')); } } }
  // el obispo entra por la derecha, serio, y le señala
  { const e = tramo(t, OBISPO - 0.1, OBISPO + 0.7), bx = Math.round(lerp(330, 262, e)); if (e > 0) R.actor(EL.obispo, bx, d.suelo, t, { dir: -1, anda: e < 1, enfado: true, dedo: t > DESCUBRE }); }
};

// 5 · el despacho del obispo en Carcasona (fondo local): cuenta los sobres; 1910: la sentencia
const TOMO = m(0.387), MILES = m(0.505), NUNCA = m(0.676), AÑO = m(0.805), CASTIGO = m(0.903);
const OB = R.nuevo(), MESA = R.nuevo(); let obHecho = false;
const pintaObispado = () => {
  let prev = R.usar(OB);
  // la pared de damasco verde con su trama de rombos y flores de lis doradas
  for (let y = 0; y < 116; y++) for (let x = 0; x < 320; x++) { const a1 = (x + y) % 16, a2 = (x - y + 320) % 16, rombo = a1 === 0 || a2 === 0, nudo = a1 === 8 && a2 === 8;
    R.pset(x, y, nudo ? hex('#a88a3a') : rombo ? hex('#335a46') : R.b4(x, y) < 0.1 ? hex('#22402f') : hex('#2a4a3a')); }
  for (let y = 4; y < 116; y += 16) for (let x = 8; x < 320; x += 16) { R.pset(x, y, hex('#8a7a3a')); R.pset(x, y - 1, hex('#8a7a3a')); R.pset(x - 1, y + 1, hex('#6a5a2a')); R.pset(x + 1, y + 1, hex('#6a5a2a')); }
  R.rect(0, 0, 319, 3, hex('#c8b890')); R.rect(0, 4, 319, 4, hex('#8a7a5a'));
  // el zócalo de madera con sus cuarterones y el suelo de espiga con la alfombra roja
  R.rect(0, 112, 319, 152, hex('#5a3a22')); R.rect(0, 112, 319, 113, hex('#8a5a32')); R.rect(0, 114, 319, 114, hex('#3a2414'));
  for (let x = 4; x < 320; x += 30) { R.rect(x, 120, x + 24, 146, hex('#4a2e18')); R.rect(x + 1, 121, x + 23, 145, hex('#6a4428')); R.rect(x + 1, 121, x + 23, 121, hex('#8a5a32')); for (let y = 124; y < 144; y += 3) if (hh(x, y, 2) < 0.6) R.rect(x + 3, y, x + 21, y, hex('#5e3c22')); }
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const k = Math.floor((x + (y % 12 < 6 ? 0 : 6)) / 6) + Math.floor(y / 6); R.pset(x, y, (x + y) % 12 === 0 || (x - y + 600) % 12 === 0 ? hex('#4a2c16') : k % 2 ? hex('#6a4428') : hex('#7a5232')); }
  for (let y = 156; y < 180; y++) for (let x = 70; x < 262; x++) { const b = x < 74 || x > 257 || y < 160; R.pset(x, y, b ? ((x + y) % 4 ? hex('#c8a040') : hex('#8a6a2a')) : (Math.floor(x / 6) + Math.floor(y / 4)) % 5 === 0 ? hex('#a83040') : hex('#7a1a2a')); }
  // dos sacas de correo desbordadas y sobres por el suelo, junto a la mesa
  for (const [sx, sy] of [[74, 178], [302, 178]]) { R.rect(sx - 9, sy - 18, sx + 9, sy, K); R.rect(sx - 8, sy - 17, sx + 8, sy - 1, hex('#c8b088')); R.rect(sx - 8, sy - 17, sx - 6, sy - 1, hex('#e0c8a0')); R.rect(sx + 6, sy - 17, sx + 8, sy - 1, hex('#a89068')); R.rect(sx - 3, sy - 12, sx + 3, sy - 8, hex('#3a4a8a')); R.rect(sx - 9, sy - 20, sx + 9, sy - 18, hex('#8a7050')); }
  for (const [ex, ey] of [[62, 172], [80, 174], [288, 173], [310, 171], [70, 168]]) sobre(ex, ey);
  // la ventana alta con la Cité de Carcasona (las nubes pasan en cada fotograma), cortinas moradas
  R.rect(14, 22, 72, 104, K); R.rect(16, 24, 70, 102, hex('#8ab8e0'));
  for (let y = 24; y < 70; y++) for (let x = 16; x <= 70; x++) R.pset(x, y, y < 46 ? (R.b4(x, y) < (y - 24) / 22 ? hex('#a8cce8') : hex('#8ab8e0')) : hex('#a8cce8'));
  for (let y = 66; y < 103; y++) for (let x = 16; x <= 70; x++) R.pset(x, y, y > 90 ? hex('#5a8a4a') : hh(x >> 1, y >> 1, 6) < 0.3 ? hex('#7aa05a') : hex('#8ab06a'));
  for (let x = 16; x <= 70; x++) { const yy = 78 - (x % 9 < 3 ? 2 : 0); R.rect(x, yy, x, 88, hex('#c8b890')); if (x % 9 === 0) R.rect(x, yy, x, 88, hex('#a89870')); }
  for (const [tx, ty] of [[22, 70], [38, 66], [56, 68], [68, 72]]) { R.rect(tx - 3, ty, tx + 3, 88, hex('#d8c8a0')); R.rect(tx + 2, ty, tx + 3, 88, hex('#b8a880')); R.poligono([[tx - 4, ty], [tx, ty - 9], [tx + 4, ty]], hex('#4a5a72')); R.linea(tx - 2, ty - 1, tx, ty - 7, hex('#7a8aa2')); R.pset(tx, ty + 4, K); }
  for (let x = 16; x <= 70; x += 3) R.rect(x, 89, x + 1, 90, hex('#c85a3a'));
  R.rect(42, 24, 43, 102, hex('#e8e0d0')); R.rect(16, 62, 70, 63, hex('#e8e0d0'));
  for (const [x0, x1] of [[6, 20], [66, 80]]) for (let y = 18; y < 112; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (x - x0) % 5 === 0 ? hex('#3a1030') : (x - x0) % 5 === 1 ? hex('#7a2a62') : hex('#5a1e4a'));
  R.rect(4, 14, 82, 20, hex('#c8a040')); R.rect(4, 20, 82, 21, hex('#8a6a20')); for (const x of [13, 73]) { R.rect(x - 1, 70, x + 1, 76, hex('#c8a040')); R.pset(x, 77, hex('#8a6a20')); }
  // el retrato de un papa con marco dorado
  R.rect(126, 18, 170, 60, hex('#8a6a20')); R.rect(128, 20, 168, 58, hex('#c8a040')); R.rect(130, 22, 166, 56, hex('#2a2018')); for (let y = 23; y < 56; y++) for (let x = 131; x < 166; x++) if (R.b4(x, y) < 0.12) R.pset(x, y, hex('#3a2c20'));
  R.disco(148, 36, 6, hex('#e8c8a0')); R.rect(144, 28, 152, 31, BL); R.rect(140, 43, 156, 56, BL); R.rect(140, 43, 156, 46, hex('#c83a3a')); R.pset(146, 36, K); R.pset(150, 36, K); R.rect(147, 39, 149, 39, hex('#a86a5a')); R.pset(129, 21, hex('#f0d070'));
  // el reloj de pared
  R.disco(206, 40, 10, K); R.disco(206, 40, 9, hex('#c8a040')); R.disco(206, 40, 7, hex('#f2eee2')); for (let k = 0; k < 12; k++) R.pset(Math.round(206 + Math.cos(k * Math.PI / 6) * 6), Math.round(40 + Math.sin(k * Math.PI / 6) * 6), K);
  // la estantería con lomos de colores (sin letras), por debajo de la zona de Atom
  R.rect(246, 50, 316, 152, K); R.rect(248, 52, 314, 150, hex('#4a2c18')); R.rect(244, 48, 318, 51, hex('#6a4428'));
  for (const y0 of [54, 78, 102, 126]) { R.rect(248, y0 + 22, 314, y0 + 23, hex('#7a5232')); let x = 250; let k = 0; while (x < 310) { const wd = 3 + Math.floor(hh(x, y0, 8) * 3), al = 15 + Math.floor(hh(x, y0, 9) * 6), c = [hex('#8a2a2a'), hex('#2a4a7a'), hex('#3a6a3a'), hex('#a87a3a'), hex('#5a2a5a'), hex('#c8b890')][Math.floor(hh(x, y0, 10) * 6)];
      R.rect(x, y0 + 22 - al, x + wd - 1, y0 + 21, c); R.rect(x, y0 + 22 - al, x, y0 + 21, mez(c, BL, 0.25)); R.rect(x, y0 + 15, x + wd - 1, y0 + 15, hex('#c8a040')); x += wd + (hh(x, y0, 11) < 0.15 ? 2 : 0); k++; } }
  R.usar(prev);
  // la mesa grande de caoba (va por delante del obispo): tablero, frente con cuarterones y tiradores
  prev = R.usar(MESA);
  R.rect(84, 134, 246, 141, K); R.rect(85, 135, 245, 140, hex('#6a3a1e')); R.rect(85, 135, 245, 135, hex('#9a5a2e')); for (let x = 86; x < 245; x += 2) if (hh(x, 1, 13) < 0.3) R.pset(x, 138, hex('#5a2e16'));
  R.rect(88, 141, 242, 172, K); R.rect(89, 142, 241, 172, hex('#5a3018'));
  for (const x0 of [92, 144, 196]) { R.rect(x0, 146, x0 + 44, 168, hex('#4a2410')); R.rect(x0 + 1, 147, x0 + 43, 167, hex('#6a3a1e')); R.rect(x0 + 1, 147, x0 + 43, 147, hex('#8a4e26')); R.disco(x0 + 22, 152, 2, hex('#c8a040')); R.pset(x0 + 21, 151, hex('#f0d070')); }
  R.rect(88, 172, 242, 175, hex('#3a1e0e'));
  R.usar(prev); obHecho = true;
};
const p5 = (t) => {
  if (!obHecho) pintaObispado(); R.copiar(OB);
  // las nubes que pasan por la ventana (recortadas a su hueco) y la segundera del reloj
  R.recorte([16, 24, 70, 61]); for (const [s, y, wd] of [[4, 34, 14], [7, 48, 10]]) { const cx = ((t * s + y * 3) % 80) + 2; R.disco(Math.round(cx), y, wd * 0.4, hex('#d8e8f4')); R.disco(Math.round(cx + wd * 0.35), y + 1, wd * 0.3, hex('#c0d4e8')); R.disco(Math.round(cx - 1), y - 2, wd * 0.25, BL); } R.recorte(null);
  { const an = t * Math.PI / 3 - Math.PI / 2; R.linea(206, 40, Math.round(206 + Math.cos(an) * 6), Math.round(40 + Math.sin(an) * 6), hex('#c83a3a')); R.linea(206, 40, 206, 35, K); R.linea(206, 40, 210, 40, K); }
  // el cura, de pie a la izquierda, cabizbajo
  R.actor(EL.sauniere, 44, 176, t, { dir: 1, triste: t < MILES || t > CASTIGO, sorpresa: t > MILES && t < MILES + 0.8, habla: t > NUNCA && t < NUNCA + 0.7 && Math.sin(t * 8) > 0 });
  // el obispo cuenta: coge un sobre del montón de la izquierda y lo pasa al de la derecha; en «1910» sella
  const cuenta = tramo(t, TOMO, AÑO - 0.3), ciclo = ((t - TOMO) / 0.42) % 1, sella = tramo(t, AÑO - 0.25, AÑO), suelta = tramo(t, AÑO, AÑO + 0.3);
  const hecho = Math.floor(Math.max(0, t - TOMO) / 0.42);
  const ob = { dir: 1, enfado: true };
  if (t > CASTIGO) { ob.dir = -1; ob.dedo = true; }
  else if (t > AÑO - 0.3) ob.sostiene = [180, Math.round(122 - sella * 10 + suelta * 10)];
  else if (cuenta > 0 && cuenta < 1) ob.sostiene = [Math.round(lerp(152, 200, ciclo)), Math.round(128 - Math.sin(ciclo * Math.PI) * 8)];
  const mo = R.actor(EL.obispo, 122, 143, t, ob).mano;
  // la mesa por delante del obispo
  { const B = R.buf; for (let i = 134 * 320; i < 176 * 320; i++) if (MESA[i]) B[i] = MESA[i]; }
  // los montones de sobres: el de la izquierda baja y el de la derecha sube
  const izq = Math.max(3, 12 - Math.floor(hecho / 3)), der = Math.min(12, 1 + Math.floor(hecho / 2));
  const monton = (x0, n, k0) => { for (let k = 0; k < n; k++) { const fila = Math.floor(k / 3), col = k % 3; sobre(x0 + col * 6 - fila * 2 + (fila & 1) * 3, 128 - fila * 3, (k + k0) % 3 ? hex('#f2eee2') : hex('#e8dcc0')); } };
  monton(146, izq + 3, 0); monton(198, der + 2, 1);
  if (ob.sostiene && cuenta > 0 && cuenta < 1 && t < AÑO - 0.3) sobre(mo[0] - 4, mo[1] - 3);
  // el libro de cuentas, el tintero y la lámpara que tiembla
  R.rect(88, 128, 118, 134, K); R.rect(89, 129, 102, 133, hex('#f2eee2')); R.rect(104, 129, 117, 133, hex('#f2eee2')); R.rect(103, 129, 103, 133, hex('#b8b0a0')); for (let y = 130; y < 133; y++) { R.rect(91, y, 100, y, hex('#9a9aa8')); if (y < 133 - (hecho % 2)) R.rect(106, y, 115, y, hex('#9a9aa8')); }
  R.rect(226, 128, 231, 134, K); R.rect(227, 129, 230, 133, hex('#2a2a3a')); R.linea(229, 128, 235, 120, hex('#e8e0d0'));
  { const fl = Math.sin(t * 13) > 0 ? 1 : 0; R.rect(238, 126, 244, 134, K); R.rect(239, 127, 243, 133, hex('#c8a040')); R.rect(239, 116, 243, 125, hex('#e8d8a0')); R.pset(241, 119 - fl, hex('#ffe08a')); R.pset(241, 120, hex('#ffb040'));
    for (let j = -12; j <= 12; j++) for (let i = -14; i <= 14; i++) { const dd = Math.hypot(i, j); if (dd < 14 && R.b4(241 + i, 120 + j) < (1 - dd / 14) * 0.25) R.pset(241 + i, 120 + j, hex('#f8e0a0')); } }
  // la sentencia sellada en «1910»
  if (t > AÑO - 0.6) { R.rect(172, 126, 190, 134, K); R.rect(173, 127, 189, 133, hex('#efe2c0')); for (let y = 128; y < 133; y += 2) R.rect(174, y, 185, y, hex('#9a8a70'));
    if (t > AÑO) { R.disco(181, 131, 3, hex('#8a1a1e')); R.disco(181, 131, 2, hex('#c8303a')); R.pset(180, 130, hex('#e86a6a')); const e = tramo(t, AÑO, AÑO + 0.4); if (e < 1) for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; R.pset(Math.round(181 + Math.cos(an) * (4 + e * 6)), Math.round(131 + Math.sin(an) * (3 + e * 4)), hex('#f0e0c0')); } } }
  if (t > AÑO - 0.3 && t < CASTIGO) { R.rect(mo[0] - 2, mo[1], mo[0] + 2, mo[1] + 5, K); R.rect(mo[0] - 1, mo[1] + 1, mo[0] + 1, mo[1] + 4, hex('#6a3a1e')); R.rect(mo[0] - 3, mo[1] + 5, mo[0] + 3, mo[1] + 6, hex('#8a1a1e')); }
  // el contador de misas pagadas: sube a miles
  if (t > TOMO) { const n = Math.round(9480 * Math.pow(tramo(t, TOMO, NUNCA), 1.6)); R.numero(String(n), 202, 100, { tam: 16, centro: true }); R.icono('sobre', 194, 104, hex('#f2eee2'), K); }
  // el secretario apunta en su libro, y en «thousands» levanta la vista
  { const mm = R.actor(EL.escribano, 262, 178, t, { dir: -1, sorpresa: t > MILES && t < MILES + 0.9, sostiene: [256, 160] }).mano;
    R.rect(mm[0] - 7, mm[1] - 2, mm[0] + 1, mm[1] + 3, K); R.rect(mm[0] - 6, mm[1] - 1, mm[0], mm[1] + 2, hex('#f2eee2')); R.rect(mm[0] - 3, mm[1] - 1, mm[0] - 3, mm[1] + 2, hex('#b8b0a0'));
    const pl = Math.round(Math.sin(t * 9) * 2); R.linea(mm[0] - 5 + pl, mm[1], mm[0] - 9 + pl, mm[1] - 7, hex('#e8e0d0')); }
};

const efectos = [[BACHE, 'boing'], [DEJA, 'golpecito'], [VECINA + 0.9, 'aldea'], [S3 + 0.2, 'puerta'], [VILLA + 0.25, 'guau'], [JARDIN, 'pop'], [LIBRO, 'golpecito'], [VACIA, 'papel'], [DESCUBRE, 'toc'], [TOMO, 'papel'], [MILES, 'tic'], [AÑO, 'sello'], [CASTIGO, 'golpecito']];
const año = (t) => t < S3 ? 1885 : t < S4 ? 1905 : t < S5 ? 1908 : t < AÑO ? 1909 : 1910;
T.rodar(E, R, [[0, p1], [S2, p2], [S3, p3], [S4, p4], [S5, p5]], { cartela: '1885', efectos, año });
''')
