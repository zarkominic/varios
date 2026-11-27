E = {}
E['hp-tren'] = ('El tren', '''// HP-TREN (frases 10–11), 2026. «Imagina que eres Harry»: la cámara le sigue. Cuatro planos:
// 1. el andén de Hogsmeade de noche: entra el expreso echando vapor; se abre la puerta del vagón y en «stepping off» Harry
//    baja con la jaula de la lechuza en la mano y tira de su baúl; detrás bajan dos alumnos; el revisor agita el farol;
// 2. (corta en «You're») el compartimento: Harry entra con la jaula, la sube a la rejilla y se sienta junto a la
//    ventanilla; en «introduce» llega el carrito de las golosinas y en «Dominic» Harry levanta una rana de chocolate;
// 3. (corta en «The two friends») la ventanilla de cerca: Ron ya sentado enfrente con Scabbers dormida en la mesita; en
//    «Ron» saluda y la rata abre un ojo; en «Arabella» entra Hermione con su libro y en «Hermione» lo levanta;
// 4. (corta en «three kids») la orilla del lago: los tres llegan corriendo por los guijarros, se paran y miran el castillo;
//    la lechuza sale de la jaula y vuela hacia las torres.''', r'''
const a = (f) => en('bajando', f), b = (f) => en('trio', f);
const P2 = a(0.515), P3 = b(0.133), P4 = b(0.736);
const pisa = a(0.325), tren_ = a(0.406), lot = a(0.637), intro = a(0.807), dom = b(0.011);
const amig = b(0.161), ron = b(0.457), arab = b(0.517), herm = b(0.666), kids = b(0.774), nadie = b(0.84), antes = b(0.944);
const C = T.C, P = T.PIEZAS_HP;
const halo = (cx, cy, r, c, k = 0, dens = 3) => { for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1 && (((x * 374761 + y * 668265 + k * 1013) >>> 0) % 97) / 97 < (1 - d) * (1 - d) * dens * 0.25) R.pset(x, y, c); } };
const sube = (t, t0, d = 0.5) => { const u = tramo(t, t0, t0 + d); return u > 0 && u < 1 ? Math.round(Math.sin(u * Math.PI) * 6) : 0; };
// la jaula en la mano de quien la lleva (mano = [x, y] devuelto por R.actor)
const jaula = (r, t) => P.lechuza(R, r.mano[0], r.mano[1] + 17, { jaula: true, t });
const p1 = (t) => {
  const ll = tramo(t, 0, 2.2);
  const g = T.hogwarts(R, t, { encuadre: 'anden', llega: ll });
  // el revisor en la caseta agita su farol para que paren
  const rv = R.actor(EL.alumno, 246, 158, t, { dir: -1, sostiene: [234, 136 + Math.round(Math.sin(t * 5) * 3)], pal: { r: hex('#2a2a4a'), R: hex('#1a1a34') } });
  P.farol(R, rv.mano[0], rv.mano[1] + 8, { t });
  // se abre la puerta del vagón de la izquierda (x 14–21): luz cálida dentro
  const ab = tramo(t, pisa - 0.8, pisa - 0.4);
  if (ll >= 1 && ab > 0) { const w = Math.round(lerp(0, 7, ab)); R.rect(14, 114, 14 + w, 139, hex('#ffd890')); R.rect(14, 114, 14 + w, 116, hex('#fff2c8')); for (let y = 119; y < 139; y += 5) R.pset(15, y, hex('#e8b060')); R.rect(14 + w, 114, 15 + w, 139, hex('#6a1418')); }
  // Harry baja en «stepping off»: un saltito del estribo al andén y tira del baúl hacia la derecha
  if (t > pisa - 0.3) {
    const bj = tramo(t, pisa - 0.3, pisa + 0.25), an = tramo(t, pisa + 0.35, P2 + 0.2);
    const hx = Math.round(lerp(lerp(10, 18, bj), 112, an)), hy = Math.round(lerp(140, 164, bj) - Math.sin(bj * Math.PI) * 6);
    // el baúl va detrás de él, por el suelo, con las ruedas que giran y una cuerda hasta la mano
    if (bj >= 1) { const bx = hx - 16; P.baul(R, bx, 166, {}); R.linea(hx + 2, 152, bx + 9, 159, hex('#3a2418')); if (an > 0 && an < 1) { const k = Math.floor(t * 10) % 2; R.pset(bx - 7 + k, 166, hex('#c8c8d4')); R.pset(bx + 6 + k, 166, hex('#c8c8d4')); if (k) R.pset(bx - 12, 165, hex('#8a8a96')); } }
    const r = R.actor(EL.harry, hx, hy, t, { dir: 1, anda: an > 0 && an < 1, sonrisa: an >= 1, sorpresa: bj >= 1 && an <= 0.15, sostiene: true });
    jaula(r, t);
  }
  // detrás bajan dos alumnos más, que se quedan mirando el castillo
  [[EL.ronJersey, 0.6, 62, 1], [EL.alumna, 1.1, 40, 1]].forEach(([d, re, xf, dd], k) => {
    const t0 = pisa + re; if (t < t0) return; const bj = tramo(t, t0, t0 + 0.3), an = tramo(t, t0 + 0.35, t0 + 1.4);
    R.actor(d, Math.round(lerp(lerp(10, 18, bj), xf, an)), Math.round(lerp(140, 166 + k * 4, bj) - Math.sin(bj * Math.PI) * 5), t, { dir: dd, anda: an > 0 && an < 1, dedo: an >= 1 && k === 0, sorpresa: an >= 1 && k === 1 });
  });
  T.hogwartsDelante(R, t, { encuadre: 'anden', llega: ll });
};
const p2 = (t) => {
  const car = tramo(t, intro - 0.2, intro + 1.0);
  const g = T.hogwarts(R, t, { encuadre: 'tren', luz: 'tarde', carrito: car });
  // Harry entra por el pasillo con la jaula, la sube a la rejilla y se sienta junto a la ventanilla
  const an = tramo(t, P2 + 0.1, P2 + 1.6), sub = tramo(t, P2 + 1.6, P2 + 2.0), sie = tramo(t, P2 + 2.1, P2 + 2.5);
  const hx = Math.round(sie > 0 ? lerp(70, 46, sie) : lerp(230, 70, an)), hy = Math.round(sie > 0 ? lerp(168, 140, sie) - Math.sin(sie * Math.PI) * 6 : 168);
  const tiene = sub < 1, rana = t > dom - 0.5;
  const r = R.actor(EL.harry, hx, hy, t, { dir: sie > 0 && sie < 1 ? -1 : sub > 0 && sub < 1 ? 1 : an < 1 ? -1 : 1, anda: an > 0 && an < 1, sostiene: tiene ? (sub > 0 ? [hx + 14, Math.round(lerp(148, 120, sub))] : true) : rana ? [hx + 16, 116 - sube(t, dom - 0.2, 0.6)] : false, dedo: !tiene && !rana && t > intro + 0.4, sonrisa: rana || t > lot, habla: t > dom && t < dom + 1 && Math.sin(t * 9) > 0 });
  if (tiene) P.lechuza(R, r.mano[0], r.mano[1] + 17, { jaula: true, t });
  if (rana && !tiene) { const [mx, my] = r.mano; R.rect(mx - 4, my - 3, mx + 4, my + 3, C.k); R.rect(mx - 3, my - 2, mx + 3, my + 2, hex('#5a2a8a')); R.rect(mx - 3, my - 2, mx + 3, my - 1, hex('#f0c040')); R.pset(mx, my + 1, hex('#f0c040'));
    if (t > dom + 0.3) { const u = tramo(t, dom + 0.3, dom + 0.9); const fx = Math.round(mx + 2 + u * 10), fy = Math.round(my - 4 - Math.sin(u * Math.PI) * 10); R.rect(fx - 2, fy - 1, fx + 2, fy + 1, hex('#5a3418')); R.pset(fx - 1, fy - 2, hex('#7a4a28')); R.pset(fx + 1, fy - 2, hex('#7a4a28')); } }
  // en «a lot of people» pasan alumnos por el pasillo, por delante
  [[EL.alumno, lot - 0.3], [EL.alumna, lot + 0.3], [EL.neville, lot + 0.9]].forEach(([d, t0], k) => {
    const u = tramo(t, t0, t0 + 2.4); if (u <= 0 || u >= 1) return;
    R.actor(d, Math.round(lerp(330, -24, u)), 172 + (k % 2) * 2, t, { dir: -1, anda: true, sonrisa: k === 1 });
  });
  T.hogwartsDelante(R, t, { encuadre: 'tren', luz: 'tarde', carrito: car });
};
const p3 = (t) => {
  const g = T.hogwarts(R, t, { encuadre: 'tren', camara: 'ventana', luz: 'tarde' });
  // Harry a la izquierda de la mesita, ofrece las grageas a Ron
  R.actor(EL.harry, 70, 147, t, { dir: 1, sonrisa: t > ron, habla: t > amig && t < amig + 0.9 && Math.sin(t * 9) > 0, dedo: t > ron - 0.3 && t < ron + 0.6, sorpresa: t > herm && t < herm + 0.8 });
  // Ron entra por la derecha y se sienta enfrente; en «Ron» saluda
  const rn = tramo(t, P3 + 0.1, amig + 1.0), rx = Math.round(lerp(330, 196, rn));
  R.actor(EL.ron, rx, 147, t, { dir: -1, anda: rn > 0 && rn < 1, brazos: t > ron && t < ron + 0.8, sonrisa: t > ron, habla: t > ron + 0.8 && t < arab && Math.sin(t * 8) > 0, sorpresa: t > herm && t < herm + 0.8 });
  // Hermione entra por la izquierda en «Arabella», se planta en el medio y levanta su libro en «Hermione»
  const hm = tramo(t, arab - 0.3, herm - 0.2), hx = Math.round(lerp(-20, 100, hm));
  if (hm > 0) { const r = R.actor(EL.hermione, hx, 147, t, { dir: hm < 1 ? 1 : -1, anda: hm > 0 && hm < 1, habla: t > herm - 0.2 && t < herm + 1.2 && Math.sin(t * 9) > 0, sostiene: t > herm ? [hx + (hm < 1 ? 16 : -2), 112 - sube(t, herm, 0.5)] : true, sonrisa: t > herm + 0.4 });
    P.libro(R, r.mano[0], r.mano[1] + 5, { abierto: t > herm + 0.3 }); }
  T.hogwartsDelante(R, t, { encuadre: 'tren', camara: 'ventana', luz: 'tarde' });
  // en la mesita (por delante): la rata de Ron dormida, grande, que abre un ojo en «Ron»; las zetas cuando duerme
  const despierta = t > ron + 0.2 && t < ron + 1.8;
  P.rata(R, 240, 143, { s: 2, ojo: despierta });
  if (!despierta) for (let k = 0; k < 2; k++) { const z = (t * 0.7 + k * 0.5) % 1, zx = Math.round(254 + z * 8 + k * 2), zy = Math.round(124 - z * 12); if (z < 0.85) { R.linea(zx, zy, zx + 3, zy, hex('#ffffff')); R.linea(zx + 3, zy, zx, zy + 3, hex('#ffffff')); R.linea(zx, zy + 3, zx + 3, zy + 3, hex('#ffffff')); } }
  if (despierta) R.bocadillo(250, 116, { icono: '?' });
  // la bolsa de grageas de todos los sabores, abierta, con las grageas que ruedan por la mesita
  R.rect(122, 128, 134, 142, C.k); R.rect(123, 129, 133, 141, hex('#e8d8a0')); R.rect(123, 129, 133, 131, hex('#c8283a')); R.pset(126, 135, hex('#3a8ae8')); R.pset(130, 137, hex('#3ac85a'));
  [[137, '#e83a3a'], [141, '#3ac85a'], [145, '#f0c040'], [149, '#9a4ae8'], [153, '#3a8ae8'], [157, '#ff8ad8'], [161, '#f07a2a']].forEach(([x, c], k) => { const v = tramo(t, P3 + 0.3 + k * 0.12, P3 + 0.8 + k * 0.12), xx = Math.round(lerp(132, x, v)); R.rect(xx, 139, xx + 2, 141, C.k); R.rect(xx, 139, xx + 1, 140, hex(c)); });
  // la caja de la rana de chocolate (la rana salta en «three» del decorado)
  R.rect(166, 132, 180, 142, C.k); R.rect(167, 133, 179, 141, hex('#5a2a8a')); R.rect(167, 133, 179, 135, hex('#f0c040')); R.pset(173, 138, hex('#f0c040'));
};
const p4 = (t) => {
  const g = T.exterior(R, t, { encuadre: 'castillo' });
  // los tres llegan corriendo por la orilla y se paran a mirar el castillo
  [[EL.harry, 0, 132], [EL.ron, 0.25, 158], [EL.hermione, 0.5, 184]].forEach(([d, re, xf], k) => {
    const u = tramo(t, P4 + re, kids + 0.2 + re), x = Math.round(lerp(-20 - k * 20, xf, u));
    R.actor(d, x, 168, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: u >= 1 && t < nadie, sonrisa: t > nadie, dedo: k === 2 && t > kids + 0.6 && t < antes, salto: k === 1 ? sube(t, antes - 0.2, 0.5) : 0 });
  });
  // nadie los conocía: un «?» sale sobre cada uno, uno tras otro
  [132, 158, 184].forEach((x, k) => { if (t > nadie - 0.4 + k * 0.25 && t < antes + 0.6) R.bocadillo(x + 7, 136 - (k === 1 ? sube(t, antes - 0.2, 0.5) : 0), { icono: '?' }); });
  // la lechuza sale volando hacia las torres
  const l = tramo(t, nadie - 0.3, P4 + 3.6);
  if (l > 0 && l < 1) P.lechuza(R, Math.round(lerp(140, 226, l)), Math.round(lerp(150, 40, l) - Math.sin(l * Math.PI) * 10), { vuela: true, t, s: l < 0.5 ? 1 : 1 });
  T.exteriorDelante(R, t, { encuadre: 'castillo' });
};
const efectos = [[0.4, 'vapor'], [pisa - 0.7, 'puerta'], [pisa + 0.3, 'carro'], [P2 + 0.2, 'whoosh'], [P2 + 1.7, 'golpecito'], [lot - 0.2, 'publico'], [intro - 0.1, 'carro'], [dom + 0.3, 'boing'], [ron, 'palmada'], [herm, 'papel'], [P4 + 0.1, 'ola'], [nadie - 0.2, 'whoosh']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 2026 });
''')

E['hp-hagrid'] = ('Hagrid', '''// HP-HAGRID (frase 12), 2026. Tres planos:
// 1. el embarcadero del lago: Hagrid, enorme, espera con el farol; Harry, Ron y Hermione llegan por las tablas; en
//    «lantern» Hagrid levanta el farol y en «Hagrid» sonríe; las barcas con farol cruzan hacia la cueva del risco;
// 2. (corta en «now») la cabaña de Hagrid: sale por la puerta, el perro mueve el rabo y ladra en «Frost»; en «walk into
//    the castle» los tres pasan por la nieve camino del castillo y Hagrid les señala el camino;
// 3. (corta en «a very strict») la escalinata: se abren las puertas, sale McGonagall y se planta seria en el rellano; en
//    «greets» levanta el dedo; en «McGonagall» les hace pasar y los de primero suben los escalones.''', r'''
const a = (f) => en('hagrid', f);
const P2 = a(0.284), P3 = a(0.572);
const farolT = a(0.114), hag = a(0.234), frost = a(0.37), walk = a(0.481), strict = a(0.596), teacher = a(0.627), hat = a(0.715), greets = a(0.739), mcg = a(0.832), janet = a(0.915);
const C = T.C, P = T.PIEZAS_HP;
const halo = (cx, cy, r, c, k = 0, dens = 3) => { for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1 && (((x * 374761 + y * 668265 + k * 1013) >>> 0) % 97) / 97 < (1 - d) * (1 - d) * dens * 0.25) R.pset(x, y, c); } };
const sube = (t, t0, d = 0.5) => { const u = tramo(t, t0, t0 + d); return u > 0 && u < 1 ? Math.round(Math.sin(u * Math.PI) * 6) : 0; };
const p1 = (t) => {
  const g = T.hogwarts(R, t, { encuadre: 'anden', camara: 'lago', barcas: tramo(t, 0, P2 + 1) });
  // Hagrid en la punta del embarcadero; en «lantern» levanta el farol
  const lev = tramo(t, farolT - 0.2, farolT + 0.3), fy = Math.round(lerp(126, 96, lev) + Math.sin(t * 3) * 2);
  const rh = R.actor(EL.hagrid, 84, 149, t, { dir: -1, sostiene: [74, fy], sonrisa: t > hag, habla: t > hag - 0.1 && t < hag + 0.6 && Math.sin(t * 9) > 0 });
  P.farol(R, rh.mano[0], rh.mano[1] + 10, { t });
  // el halo del farol, tramado
  const [lx, ly] = [rh.mano[0], rh.mano[1] + 4];
  halo(lx, ly, 14 + Math.sin(t * 9) * 1, hex('#ffd870'), Math.floor(t * 8), 2.2);
  // los tres llegan por el embarcadero hasta Hagrid y miran arriba
  [[EL.harry, 0.2, 56], [EL.ron, 0.6, 36], [EL.hermione, 1.0, 16]].forEach(([d, re, xf], k) => {
    const u = tramo(t, re, re + 1.8), x = Math.round(lerp(-22 - k * 6, xf, u));
    R.actor(d, x, 149, t, { dir: 1, anda: u > 0 && u < 1, sorpresa: u >= 1 && t > farolT && t < hag, sonrisa: t > hag + 0.3, salto: k === 0 && t > hag && t < hag + 0.4 ? 3 : 0 });
  });
  // una barca con alumnos cabecea junto al embarcadero
  T.b_barca(R, 150, 152, t, { chicos: 3, dir: 1 });
  T.hogwartsDelante(R, t, { encuadre: 'anden', camara: 'lago', barcas: tramo(t, 0, P2 + 1) });
};
const p2 = (t) => {
  const g = T.exterior(R, t, { encuadre: 'cabana' });
  // Hagrid sale por la puerta (abre en «now») y se planta; en «Frost» se ríe; en «walk» señala el castillo
  const sal = tramo(t, P2 + 0.1, P2 + 0.9), hx = Math.round(lerp(158, 132, sal));
  // la puerta abierta: hueco con luz
  const ab = tramo(t, P2, P2 + 0.3); if (ab > 0) { R.rect(156, 107, 156 + Math.round(24 * ab), 149, hex('#ffc860')); R.rect(156, 107, 156 + Math.round(24 * ab), 109, hex('#fff0b0')); for (let y = 112; y < 149; y += 5) R.pset(158, y, hex('#e89a40')); }
  R.actor(EL.hagrid, hx, Math.round(lerp(150, 164, sal)), t, { dir: -1, anda: sal > 0 && sal < 1, sonrisa: t > frost - 0.2, habla: t > frost - 0.2 && t < frost + 0.8 && Math.sin(t * 10) > 0, dedo: t > walk - 0.1 });
  // el perro (dibujado por el decorado en x 118) ladra en «Frost»: el bocadillo
  if (t > frost + 0.1 && t < frost + 0.9) R.bocadillo(122, 140, { icono: '!' });
  // los tres pasan por la nieve, de derecha a izquierda, camino del castillo (arriba a la izquierda)
  [[EL.harry, 0], [EL.ron, 0.35], [EL.hermione, 0.7]].forEach(([d, re], k) => {
    const u = tramo(t, walk - 1.2 + re, P3 + 0.8 + re), x = Math.round(lerp(330, 10, u));
    if (u > 0 && u < 1) { R.actor(d, x + k * 2, 168 + k * 2, t, { dir: -1, anda: true, sonrisa: true }); if (Math.floor(t * 5 + k) % 2) R.pset(x + k * 2 + 10, 170 + k * 2, hex('#b8c8dc')); }
  });
  T.exteriorDelante(R, t, { encuadre: 'cabana' });
};
const p3 = (t) => {
  const ab = tramo(t, P3 + 0.3, teacher - 0.1);
  const g = T.exterior(R, t, { encuadre: 'castillo', camara: 'cerca', puertas: ab });
  // McGonagall sale por la puerta en «teacher» y se planta en el rellano; seria, el dedo en «greets»; en «McGonagall»
  // se da la vuelta y les hace pasar
  const mg = tramo(t, teacher - 0.2, teacher + 0.5), ap = tramo(t, mcg, mcg + 0.6), mx = Math.round(lerp(153, 170, ap)), my = Math.round(lerp(132, 140, mg));
  if (ab > 0.6) R.actor(EL.mcgonagall, mx, my, t, { dir: t > mcg ? -1 : 1, anda: ap > 0 && ap < 1, enfado: t > strict && t < mcg, dedo: t > greets && t < mcg, brazos: t > mcg && t < mcg + 0.7, habla: t > greets && t < mcg + 1 && Math.sin(t * 8) > 0 });
  // los de primero esperan abajo y luego suben
  [[EL.harry, 120, 0], [EL.ron, 98, 0.25], [EL.hermione, 188, 0.15], [EL.nevilleSapo, 212, 0.4], [EL.alumna, 76, 0.5]].forEach(([d, x0, re], k) => {
    const s = tramo(t, mcg + 0.3 + re, mcg + 2.2 + re), x = Math.round(lerp(x0, 140 + (k % 3) * 5, s)), y = Math.round(lerp(176, 141, s) - (s > 0 && s < 1 ? (Math.floor(t * 6) % 2) : 0));
    if (s >= 1) return;
    R.actor(d, x, y, t, { dir: x0 < 150 ? 1 : -1, anda: s > 0 && s < 1, sorpresa: t > ab && t < strict + 0.4, triste: t > strict + 0.4 && t < mcg && k === 1, sonrisa: k === 0 && t > mcg });
  });
  T.exteriorDelante(R, t, { encuadre: 'castillo', camara: 'cerca', puertas: ab });
};
const efectos = [[0.3, 'ola'], [farolT, 'brillo'], [P2 + 0.05, 'puerta'], [frost + 0.1, 'guau'], [P3 + 0.1, 'cerrojo'], [P3 + 0.5, 'puerta'], [greets, 'golpecito'], [mcg + 0.4, 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')

E['hp-mesa'] = ('La mesa de los profesores', '''// HP-MESA (frase 13), 2026. Tres planos, cada profesor en el momento en que la voz lo nombra:
// 1. el Gran Comedor: Harry sube por el pasillo central entre las mesas de las casas; en el estrado, Dumbledore se levanta
//    en «smiling», abre los brazos y sonríe en «Dumbledore»; las velas se avivan;
// 2. (corta en «The one glaring») la mazmorra de pociones: Snape detrás de la mesa remueve el caldero; en «glaring» mira
//    mal a Harry, que entra por la izquierda; en «Snape» le señala con el dedo y Harry da un paso atrás;
// 3. (corta en «And») el aula: Quirrell detrás de su mesa, con el turbante morado, tiembla y suda; en «nervous» se cae
//    un libro de un pupitre, Quirrell da un salto y suelta la tiza; los alumnos se giran.''', r'''
const a = (f) => en('profesores', f);
const P2 = a(0.436), P3 = a(0.731);
const barba = a(0.146), smile = a(0.205), dumb = a(0.263), lith = a(0.369), glare = a(0.454), robes = a(0.511), snape = a(0.573), paapa = a(0.619);
const turb = a(0.772), nerv = a(0.853), quir = a(0.899);
const C = T.C, P = T.PIEZAS_HP;
const halo = (cx, cy, r, c, k = 0, dens = 3) => { for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d < 1 && (((x * 374761 + y * 668265 + k * 1013) >>> 0) % 97) / 97 < (1 - d) * (1 - d) * dens * 0.25) R.pset(x, y, c); } };
const sube = (t, t0, d = 0.5) => { const u = tramo(t, t0, t0 + d); return u > 0 && u < 1 ? Math.round(Math.sin(u * Math.PI) * 6) : 0; };
const p1 = (t) => {
  const g = T.hogwarts(R, t, { encuadre: 'comedor', lleno: 0.9 });
  // Dumbledore delante de la mesa de los profesores: se levanta en «smiling» y abre los brazos en «Dumbledore»
  const lev = tramo(t, smile - 0.4, smile);
  const dy = Math.round(lerp(112, 108, lev));
  if (t > smile - 0.2) halo(161, 96, 16, hex('#ffe8a0'), Math.floor(t * 6), 1.6 * tramo(t, smile - 0.2, dumb));
  R.actor(EL.dumbledore, 153, dy, t, { dir: 1, sonrisa: t > barba, brazos: t > dumb - 0.1 && t < dumb + 1.1, habla: t > lith - 0.4 && t < P2 - 0.3 && Math.sin(t * 7) > 0 });
  // Harry sube por el pasillo central (de espaldas no se puede: va hacia arriba, de lado) y se para a mirar
  const u = tramo(t, 0.1, smile), hx = Math.round(lerp(150, 160, u)), hy = Math.round(lerp(190, 166, u));
  R.actor(EL.harry, hx, hy, t, { dir: -1, anda: u > 0 && u < 1, sorpresa: t > smile && t < dumb + 0.4, sonrisa: t > dumb + 0.4 });
  if (t > dumb && t < dumb + 0.8) R.bocadillo(hx + 7, hy - 30, { icono: '!' });
  // las velas de encima de Dumbledore se avivan: destellos de cuatro puntas
  if (t > dumb - 0.1 && t < lith + 0.6) for (let k = 0; k < 6; k++) { const v = (t * 1.3 + k / 6) % 1, an = k * 1.05 + t * 0.6, sx = Math.round(161 + Math.cos(an) * (12 + v * 8)), sy = Math.round(94 + Math.sin(an) * (8 + v * 5)); if (v < 0.7) { const c = hex(v < 0.35 ? '#ffffff' : '#ffe08a'); R.pset(sx, sy, c); R.pset(sx - 1, sy, c); R.pset(sx + 1, sy, c); R.pset(sx, sy - 1, c); R.pset(sx, sy + 1, c); } }
  T.hogwartsDelante(R, t, { encuadre: 'comedor', lleno: 0.9 });
};
const p2 = (t) => {
  const g = T.exterior(R, t, { encuadre: 'pociones' });
  // Snape detrás de la mesa (asoman cabeza y hombros); remueve, en «glaring» se gira hacia Harry, en «Snape» le señala
  const mira = t > glare - 0.1;
  // remueve el caldero (de espaldas a Harry) hasta «glaring»: el cucharón sube y baja
  const rs = R.actor(EL.snape, 250, 168, t, { dir: mira ? -1 : 1, sostiene: !mira ? [242 + Math.round(Math.sin(t * 6) * 2), 150] : false, enfado: mira, dedo: t > snape - 0.1 && t < paapa + 0.8, habla: t > snape && t < snape + 0.6 && Math.sin(t * 9) > 0 });
  // Harry entra por la izquierda y se para; en «Snape» da un paso atrás
  const u = tramo(t, P2 + 0.05, glare + 0.4), atr = tramo(t, snape, snape + 0.3);
  const hx = Math.round(lerp(-20, 64, u) - atr * 8);
  const rh = R.actor(EL.harry, hx, 168, t, { dir: 1, anda: (u > 0 && u < 1) || (atr > 0 && atr < 1), sorpresa: t > snape, sostiene: true });
  P.libro(R, rh.mano[0], rh.mano[1] + 6, {});
  if (t > snape && t < snape + 0.9) R.bocadillo(hx + 7, 138, { icono: '!' });
  // el caldero al fuego en el suelo de la derecha, burbujeando, con su vapor morado (delante de Snape)
  const cx = 230, cy = 168;
  for (let k = 0; k < 5; k++) { const fl = Math.round(Math.abs(Math.sin(t * 11 + k * 1.7)) * 3); R.rect(cx - 8 + k * 4, cy - 1 - fl, cx - 7 + k * 4, cy + 1, hex(k % 2 ? '#ff9a3a' : '#ffd060')); }
  R.disco(cx, cy - 10, 10, C.k); R.disco(cx, cy - 10, 9, hex('#2a2a34')); R.disco(cx - 3, cy - 13, 3, hex('#4a4a5a')); R.rect(cx - 11, cy - 20, cx + 11, cy - 17, C.k); R.rect(cx - 10, cy - 19, cx + 10, cy - 18, hex('#7a5ac8'));
  for (let k = 0; k < 6; k++) { const v = (t * 0.9 + k * 0.17) % 1, bx = cx - 8 + k * 3 + Math.round(Math.sin(t * 3 + k) * 2), by = Math.round(cy - 21 - v * 22); if (v < 0.85) R.pset(bx, by, hex(v < 0.4 ? '#c8a0ff' : '#8a6ad8')); }
  if (Math.floor(t * 4) % 2) R.disco(cx - 4 + Math.floor(t * 4) % 3 * 4, cy - 20, 1, hex('#e0c8ff'));
  if (!mira) { R.linea(rs.mano[0], rs.mano[1], cx + 2, cy - 18, hex('#3a2418')); R.pset(rs.mano[0], rs.mano[1] - 1, hex('#5a3a22')); }
  T.exteriorDelante(R, t, { encuadre: 'pociones' });
};
const p3 = (t) => {
  const g = T.hogwarts(R, t, { encuadre: 'aula' });
  // Quirrell detrás de su mesa: tiembla, mira a un lado y a otro; en «nervous» da un salto
  const tiem = Math.round(Math.sin(t * 40) * 0.6), sal = t > nerv && t < nerv + 0.5 ? Math.round(Math.sin((t - nerv) / 0.5 * Math.PI) * 6) : 0;
  const qx = 153 + tiem, mira = Math.sin(t * 2.7) > 0 ? 1 : -1;
  R.actor(EL.quirrell, qx, 130, t, { dir: mira, salto: sal, sorpresa: t > nerv - 0.1 && t < nerv + 1.4, habla: t > turb && t < nerv && Math.sin(t * 13) > 0, triste: t < turb });
  // gotas de sudor
  if (t > turb - 0.5) for (let k = 0; k < 2; k++) { const v = (t * 1.5 + k * 0.5) % 1, gx = qx + 1 + k * 13, gy = 102 + Math.round(v * 9); R.pset(gx, gy, hex('#ffffff')); R.pset(gx, gy + 1, hex('#8ad0ff')); R.pset(gx - 1, gy + 1, hex('#8ad0ff')); R.pset(gx + 1, gy + 1, hex('#5aa0e0')); R.pset(gx, gy + 2, hex('#5aa0e0')); }
  if (t > nerv && t < nerv + 0.9) R.bocadillo(qx + 8, 96 - sal, { icono: '!' });
  // los alumnos en los pupitres: Harry en la primera fila; se giran en «nervous»
  const gira = t > nerv + 0.1;
  for (const [d, x, y, dd] of [[EL.harry, 72, 136, 1], [EL.ron, 30, 136, 1], [EL.hermione, 228, 136, -1], [EL.neville, 270, 136, -1], [EL.alumna, 30, 172, 1], [EL.alumno, 270, 172, -1]]) R.actor(d, x, y, t, { dir: dd, sorpresa: gira && t < nerv + 1.3, sonrisa: gira && t > nerv + 1.3 && x === 30, habla: !gira && x === 270 && y === 136 && Math.sin(t * 6) > 0 });
  T.hogwartsDelante(R, t, { encuadre: 'aula' });
  // el libro que se cae del pupitre de Neville en «nervous»
  const c = tramo(t, nerv - 0.3, nerv); P.libro(R, Math.round(lerp(282, 292, c)), Math.round(lerp(128, 160, c * c)), {});
};
const efectos = [[0.3, 'publico'], [dumb, 'brillo'], [P2 + 0.2, 'burbujas'], [snape, 'golpecito'], [nerv - 0.05, 'chof'], [nerv + 0.05, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2026 });
''')
