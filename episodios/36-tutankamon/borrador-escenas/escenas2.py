E = {}

E['tu-carter'] = ('Carter', '''// TU-CARTER (frases 4–5), 1922, cartela «1922». Siete planos:
// 1. el Valle de los Reyes al sol: Carter entra y cava cuatro paladas junto a los montones al decir «digging» (la arena
//    vuela al montón), luego señala el valle; un obrero con su cesta en la cabeza llega por la derecha;
// 2. la casa de trabajo: Carter sale por la puerta con el plano enrollado y señala la mesa («looking for the tomb»);
//    detrás de la mesa, lord Carnarvon cuenta billetes al decir «money» y suspira, la mano en la frente, al oír su nombre;
// 3. la mesa desde arriba: los billetes se acaban («paying for sand»), la suma acaba en un 0 rojo y la mano con el lápiz
//    rojo rodea el 1922 del calendario («one last season»);
// 4. las chozas de los obreros antiguos: dos obreros se llevan las piedras de los muretes («clearing … huts») y Carter
//    lo dirige y señala el suelo del medio; corta en «found»;
// 5. a ras de suelo: la mano barre la arena y aparece el escalón tallado en la roca («a step cut into the rock»), y
//    detrás otros dos («then another and another»); al otro lado de la zanja Carter se sorprende y señala, un obrero
//    levanta los brazos;
// 6. la puerta tapiada: el farol de mano barre los sellos y se para en el más claro, que brilla («seals intact»); el farol se
//    retira y una pala vuelca arena que sube por delante del enlucido («covered it up again»);
// 7. el telégrafo (gag 2): la mano del telegrafista tira de la cinta de puntos y rayas, que no se acaba y corre cada vez
//    más deprisa; una salamanquesa cruza la pared, las pilas de vidrio burbujean, y un burro asoma por la puerta y se
//    come la cinta («he would wait for him»).''', r'''
const a = (f) => en('carter', f), b = (f) => en('escalon', f);
const P2 = a(0.35), P3 = a(0.76), P4 = b(0) - 0.15, P5 = b(0.255), P6 = b(0.468), P7 = b(0.68);
const N = (x) => Math.round(x);
const h3 = (x, y, k) => { const v = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return v - Math.floor(v); };
// una piedra de murete en la mano (o en el suelo)
const piedra = (x, y, k = 0) => {
  R.rect(x - 5, y - 4, x + 5, y + 3, hex('#2a2018')); R.rect(x - 4, y - 3, x + 4, y + 2, hex(k % 2 ? '#b89a72' : '#a88a64'));
  R.rect(x - 4, y - 3, x + 1, y - 3, hex('#e0caa4')); R.rect(x + 2, y + 1, x + 4, y + 2, hex('#7a6248')); R.pset(x - 1, y, hex('#8a7254'));
};
// polvo de arena que salta (u 0–1 desde el golpe)
const polvo = (x, y, u, k = 0) => {
  if (u <= 0 || u >= 1) return;
  for (let i = 0; i < 7; i++) { const ang = -Math.PI * (0.15 + 0.7 * ((i * 37 + k * 11) % 10) / 10), r = 2 + u * (5 + (i % 3) * 2);
    R.pset(N(x + Math.cos(ang) * r), N(y + Math.sin(ang) * r * 0.7 + u * u * 4), hex(i % 2 ? '#e8d4a8' : '#c8ac7c')); }
};

// 1 · el valle: Carter entra, pica la arena al decir «digging» y se queda mirando los montones
const golpes = [a(0.19), a(0.215), a(0.24), a(0.265)];
const p1 = (t) => {
  const geo = T.valle(R, t, { encuadre: 'valle', luz: 'dia', epoca: 1922 });
  const s = geo.suelo;
  // el obrero de la cesta cruza por la arena, de derecha a izquierda, por detrás de Carter
  const vo = tramo(t, 1.6, a(0.2)), xo = N(lerp(326, 268, vo));
  const ob = R.actor(T.ELENCO_TU.obrero2TU, xo, s - 4, t, { dir: -1, anda: vo > 0 && vo < 1, sostiene: [xo + 2, s - 32], sonrisa: t > a(0.3) });
  { const [mx, my] = ob.mano; R.rect(mx - 6, my - 6, mx + 6, my, hex('#2a1c10')); R.rect(mx - 5, my - 5, mx + 5, my - 1, hex('#b8925a'));
    for (let i = -4; i <= 4; i += 2) R.pset(mx + i, my - 3, hex('#8a6a3a')); R.rect(mx - 4, my - 7, mx + 4, my - 6, hex('#e8d4a8')); }
  // Carter: entra andando, cava cuatro paladas (la hoja entra, sube cargada y echa la arena al montón) y mira los montones
  const va = tramo(t, 1.4, a(0.16)), xc = N(lerp(150, 198, va));
  let fase = -1, k0 = 0; for (const [k, g] of golpes.entries()) { const u = (t - g + 0.15) / 0.62; if (u >= 0 && u < 1) { fase = u; k0 = k; } }
  const cava = t > a(0.165) && t < a(0.3);
  const hy = fase < 0 ? 0 : fase < 0.35 ? fase / 0.35 * 3 : fase < 0.7 ? 3 - (fase - 0.35) / 0.35 * 11 : -8 + (fase - 0.7) / 0.3 * 8;   // la hoja: hunde, sube, vuelve
  const hx = fase < 0.35 ? 0 : fase < 0.7 ? (fase - 0.35) / 0.35 * 5 : 5 - (fase - 0.7) / 0.3 * 5;
  const bx = xc + 26 + N(hx), by = s - 1 + N(hy);
  const cv = R.actor(T.ELENCO_TU.carterTU, xc, s, t, { dir: 1, anda: va > 0 && va < 1, sostiene: cava ? [xc + 18, s - 15 + N(hy * 0.5)] : null, sonrisa: t > a(0.31), dedo: t > a(0.31) && t < P2 - 0.1 });
  if (cava) {
    const [mx, my] = cv.mano;
    R.linea(mx - 2, my - 3, bx, by - 5, hex('#2a1a10')); R.linea(mx - 1, my - 3, bx + 1, by - 5, hex('#a87444')); R.linea(mx - 1, my - 4, bx, by - 6, hex('#d09a5c'));   // el mango
    R.rect(mx - 4, my - 5, mx, my - 3, hex('#2a1a10'));   // el puño del mango
    R.poligono([[bx - 3, by - 6], [bx + 4, by - 6], [bx + 3, by + 1], [bx, by + 3], [bx - 3, by + 1]], hex('#22222a'));
    R.poligono([[bx - 2, by - 5], [bx + 3, by - 5], [bx + 2, by], [bx, by + 2], [bx - 2, by]], hex('#8a8a96')); R.pset(bx - 1, by - 4, hex('#d8d8e4'));
    if (fase >= 0.35 && fase < 0.7) { R.rect(bx - 2, by - 8, bx + 3, by - 6, hex('#e0c48e')); R.pset(bx, by - 9, hex('#f0dcb0')); }   // la palada cargada
  }
  // la arena que vuela al montón y el polvo de cada palada
  for (const [i, g] of golpes.entries()) {
    const f = (t - g - 0.3) / 0.45; if (f > 0 && f < 1) for (let q = 0; q < 5; q++) { const x = N(xc + 30 + f * (18 + q * 3)), y = N(s - 14 - Math.sin(f * Math.PI) * (12 + q) + q); R.rect(x, y, x + 1, y + 1, hex(q % 2 ? '#e8d0a0' : '#c8a676')); }
    polvo(xc + 27, s - 1, (t - g) / 0.5, i); polvo(xc + 52, s - 6, (t - g - 0.75) / 0.5, i + 3);
  }
  T.valleDelante(R, t, { encuadre: 'valle', luz: 'dia', epoca: 1922 });
};

// 2 · la casa de trabajo: Carter sale con el plano; Carnarvon, detrás de la mesa, cuenta los billetes y suspira
const cuenta = [a(0.565), a(0.6), a(0.635), a(0.67)], suspira = a(0.7);
const p2 = (t) => {
  const bil = lerp(0.3, 0.7, tramo(t, a(0.56), a(0.74)));
  const geo = T.valle(R, t, { encuadre: 'tienda', luz: 'dia', billetes: bil });
  // Carnarvon detrás de la mesa: cuenta, luego suspira (triste) y se echa atrás
  const cuentaAhora = cuenta.some((c) => t > c && t < c + 0.22), triste = t > suspira;
  const cn = R.actor(T.ELENCO_TU.carnarvonTU, 150, geo.detras, t, { dir: 1, sostiene: t > a(0.55) && !triste ? [166, cuentaAhora ? 120 : 124] : triste && t < suspira + 1.4 ? [161, 108] : null, triste, habla: t > a(0.38) && t < a(0.5) && Math.sin(t * 8) > 0 });
  if (t > a(0.55) && !triste) { const [mx, my] = cn.mano; R.rect(mx - 1, my - 5, mx + 5, my - 1, hex('#1c2a18')); R.rect(mx, my - 4, mx + 4, my - 2, hex('#7aa86a')); R.pset(mx + 2, my - 3, hex('#3a5a2a')); }
  if (triste) { const u = tramo(t, suspira, suspira + 1.2); for (let i = 0; i < 3; i++) { const yy = N(108 - u * 10 - i * 3); if (u > i * 0.2 && u < 1) R.pset(150 + 14 + i * 2, yy, hex('#f4f0e8')); } }
  // Carter sale por la puerta con el plano enrollado, se para en la pared clara y lo explica señalando la mesa
  const vc = tramo(t, P2 + 0.1, P2 + 1.5), xc = N(lerp(220, 246, vc));
  const dedo = t > a(0.4) && t < a(0.5);
  const cv = R.actor(T.ELENCO_TU.carterTU, xc, geo.suelo, t, { dir: -1, anda: vc > 0 && vc < 1, dedo, habla: dedo && Math.sin(t * 7) > -0.2, sostiene: !dedo ? [xc - 3, geo.suelo - 14] : null, sonrisa: t > suspira });
  if (!dedo) { const [mx, my] = cv.mano; R.rect(mx - 2, my - 9, mx + 2, my + 3, hex('#3a2a18')); R.rect(mx - 1, my - 8, mx + 1, my + 2, hex('#e8dcc0')); R.pset(mx, my - 8, hex('#c8b08a')); }
  T.valleDelante(R, t, { encuadre: 'tienda', luz: 'dia', billetes: bil });
};

// 3 · la mesa desde arriba: los billetes se acaban, la suma da 0 y el lápiz rojo rodea el 1922
const p3 = (t) => {
  const rodea = tramo(t, a(0.93), a(0.985));
  T.valle(R, t, { encuadre: 'tienda', camara: 'mesa', billetes: lerp(0.6, 1, tramo(t, a(0.78), a(0.85))), suma: lerp(0.4, 1, tramo(t, a(0.775), a(0.89))), rodea });
  // la mano de Carnarvon con el lápiz rojo: llega al calendario, rodea el 1922 y se retira
  const llega = tramo(t, a(0.9), a(0.93)), va = tramo(t, a(0.99), a(0.99) + 0.6);
  if (llega > 0 && va < 1) {
    const ang = -Math.PI * 0.6 + rodea * Math.PI * 2.15, tx = 238 + Math.cos(ang) * 24, ty = 76 + Math.sin(ang) * 11;
    const dx = N(lerp(lerp(300, tx, llega), 330, va)), dy = N(lerp(lerp(150, ty, llega), 190, va));
    R.linea(dx, dy, dx + 7, dy - 8, hex('#7a1a14')); R.linea(dx + 1, dy, dx + 8, dy - 8, hex('#d83a2a')); R.pset(dx, dy, hex('#2a1a1a'));
    T.brazo(R, dx + 34, dy + 34, dx + 8, dy - 2, '#e8e0d0', -1, { codo: [dx + 26, dy + 16] });
  }
};

// 4 · las chozas: los obreros se llevan las piedras; Carter lo dirige
const p4 = (t) => {
  const limpio = tramo(t, b(0.07), b(0.24));
  const geo = T.valle(R, t, { encuadre: 'chozas', luz: 'dia', limpio, escalones: 0 });
  const s = geo.suelo;
  // dos obreros que van y vienen de los muretes a la cesta con una piedra
  for (const [k, def, x0, x1, fase] of [[0, T.ELENCO_TU.obrero1TU, 96, 262, 0], [1, T.ELENCO_TU.obrero2TU, 196, 270, 0.5]]) {
    const ciclo = ((t - P4) / 2.6 + fase) % 1, ida = ciclo < 0.5, u = ida ? ciclo * 2 : 2 - ciclo * 2;
    const anda = u > 0.08 && u < 0.92, xx = N(lerp(x0, x1, Math.min(1, Math.max(0, (u - 0.08) / 0.84))));
    const ac = R.actor(def, xx, s + k * 6, t, { dir: ida ? 1 : -1, anda, sostiene: ida ? [xx + (ida ? 12 : 2), s + k * 6 - 14] : null });
    if (ida && limpio < 1) piedra(ac.mano[0], ac.mano[1] - 2, k);
  }
  // Carter a la izquierda: señala los muretes y luego el suelo del medio («his team found»)
  R.actor(T.ELENCO_TU.carterTU, 46, s + 10, t, { dir: 1, dedo: (t > b(0.07) && t < b(0.15)) || t > b(0.23), habla: t > b(0.07) && t < b(0.15) && Math.sin(t * 7) > 0, sorpresa: t > b(0.24) });
  T.valleDelante(R, t, { encuadre: 'chozas', luz: 'dia', limpio, escalones: 0 });
};

// 5 · a ras de suelo: barre y sale el escalón; detrás, otro y otro. Al otro lado de la zanja, Carter y un obrero miran
const p5 = (t) => {
  const barre = lerp(0.1, 0.92, tramo(t, b(0.262), b(0.45))), esc = lerp(0, 2, tramo(t, b(0.38), b(0.43)));
  const geo = T.valle(R, t, { encuadre: 'chozas', camara: 'escalon', luz: 'dia', barre, escalones: esc, mano: false });
  // lo barrido es PIEDRA TALLADA, no arena: caliza rosada con las marcas del cincel y el filo claro (para que se lea)
  const xb = N(10 + barre * 290);
  for (let x = 0; x < xb - 8; x++) {
    for (let y = 122; y < 180; y++) { const q = h3(x, y, 9), m = ((x * 2 + y) % 11 < 2) && h3(x >> 3, y >> 2, 10) < 0.6;
      R.pset(x, y, hex(m ? '#a88c78' : q < 0.04 ? '#8a7060' : q < 0.3 ? '#c8ae98' : q < 0.8 ? '#d6bea6' : '#e2ccb4')); }
    R.pset(x, 119, hex('#6a5044')); R.pset(x, 120, hex('#fff4e0')); R.pset(x, 121, hex('#ecd8c0'));
    if (x % 23 === 5) for (let y = 124; y < 128 + (x % 5); y++) R.pset(x + (y % 2), y, hex('#9a7e6c'));   // grietas finas
  }
  for (const [k, xo] of [[0, 30], [1, 96], [2, 150], [3, 214]]) if (xo + 10 < xb - 8) { const y = 150 + (k % 2) * 14; R.rect(xo, y, xo + 3, y + 1, hex('#f0e2cc')); R.rect(xo + 1, y + 2, xo + 4, y + 2, hex('#8a7060')); }
  // en lo barrido: la brocha de cerdas, el cazo de arena y lascas de piedra con su sombra
  if (xb > 60) { R.rect(18, 164, 34, 167, hex('#3a2414')); R.rect(19, 165, 33, 166, hex('#a87444')); R.rect(19, 165, 33, 165, hex('#d09a5c')); for (let i = 0; i < 9; i++) R.linea(35, 164 + (i % 3), 44, 161 + i, hex(i % 2 ? '#6a4a2a' : '#c8a070')); }
  if (xb > 90) { R.disco(66, 146, 7, hex('#2a2a32')); R.disco(66, 145, 6, hex('#8a8a96')); R.disco(66, 145, 4, hex('#dcc092')); R.rect(72, 143, 84, 145, hex('#3a2414')); R.rect(72, 143, 84, 143, hex('#9a6a3a')); }
  for (let k = 0; k < 9; k++) { const x = 12 + N(h3(k, 1, 11) * 280), y = 132 + N(h3(k, 2, 11) * 42); if (x > xb - 14) continue; R.rect(x, y + 1, x + 3 + (k % 2), y + 2, hex('#7a6252')); R.rect(x, y, x + 2 + (k % 2), y + 1, hex('#ecdcc4')); }
  // el brazo que barre (manga cruda, la mano canónica junto al caballón)
  T.brazo(R, xb - 30, 182, xb - 2, 140, '#d8c8a8', 1, { codo: [xb - 22, 162] });
  // los escalones de detrás: cada uno, un filo claro y su contrahuella en sombra, que salen al decir «another»
  for (const [k, y] of [[1, 108], [2, 99]]) { const v = Math.min(1, Math.max(0, esc - k + 1)); if (v <= 0) continue; const x1 = N(320 * v);
    for (let x = 0; x < x1; x++) { R.pset(x, y, hex(k === 1 ? '#c8a888' : '#a88a70')); R.pset(x, y + 1, hex(k === 1 ? '#b09078' : '#94785e')); for (let yy = y + 2; yy < y + 6; yy++) R.pset(x, yy, hex(k === 1 ? '#4a3430' : '#3a2828')); } }
  const ch = t > b(0.285) && t < b(0.285) + 0.5; if (ch) for (const x of [60, 120, 180]) if (x < xb) { R.pset(x, 118, hex('#ffffff')); R.pset(x - 1, 119, hex('#fff6d8')); R.pset(x + 1, 119, hex('#fff6d8')); }
  // al otro lado de la zanja (el suelo del valle, y 92): Carter se asoma, se sorprende y señala los de detrás
  const vc = tramo(t, P5 + 0.1, b(0.28));
  R.actor(T.ELENCO_TU.carterTU, N(lerp(196, 222, vc)), 94, t, { dir: -1, anda: vc > 0 && vc < 1, sorpresa: t > b(0.29) && t < b(0.38), dedo: t > b(0.385), habla: t > b(0.385) && Math.sin(t * 8) > 0 });
  const ob = R.actor(T.ELENCO_TU.obrero1TU, 78, 94, t, { dir: 1, brazos: t > b(0.4) && t < b(0.44), sonrisa: t > b(0.3) });
};

// 6 · la puerta tapiada: el farol se para en el sello más claro; luego la pala de Carter la vuelve a tapar de arena
const tapa = [b(0.618), b(0.655)];
const p6 = (t) => {
  const farol = lerp(0.12, (164 - 30) / 260, tramo(t, P6 + 0.62, b(0.53)) ** 0.8);   // el farol barre de izquierda a derecha y se para en el sello más claro
  const gs = T.valle(R, t, { encuadre: 'escalera', camara: 'sellos', farol });
  // el sello intacto, señalado: un brillo que late cuando la voz dice «seals intact»
  const br = tramo(t, b(0.53), b(0.53) + 0.25) - tramo(t, b(0.56), b(0.56) + 0.3);
  if (br > 0) for (let r = 2; r < 2 + br * 7; r++) { R.pset(164 + r, 92, hex('#fff8dc')); R.pset(164 - r, 92, hex('#fff8dc')); R.pset(164, 92 + N(r * 0.7), hex('#fff8dc')); R.pset(164, 92 - N(r * 0.7), hex('#fff8dc')); }
  // el farol de mano de Carter, abajo, que sigue a su luz; se retira cuando empieza a caer la arena
  { const fx = gs.farol[0], sal = tramo(t, tapa[0] - 0.7, tapa[0] - 0.2), fy = N(147 + sal * 50), bal = N(Math.sin(t * 3) * 1);
    if (sal < 1) {
      for (let r = 14; r > 0; r -= 3) R.disco(fx + bal, fy + 9, r, hex(r > 10 ? '#5a4a30' : r > 6 ? '#8a7040' : '#c8a050'));
      R.linea(fx, fy, fx + bal, fy + 3, hex('#2a2a2a')); R.rect(fx - 4 + bal, fy + 3, fx + 4 + bal, fy + 4, hex('#2a2a32'));
      R.rect(fx - 4 + bal, fy + 5, fx + 4 + bal, fy + 14, hex('#1e1e24')); R.rect(fx - 3 + bal, fy + 6, fx + 3 + bal, fy + 13, hex('#ffd878')); R.rect(fx - 1 + bal, fy + 8, fx + 1 + bal, fy + 11, hex('#fff4d0'));
      R.rect(fx - 3 + bal, fy + 9, fx + 3 + bal, fy + 9, hex('#2a2a32')); R.rect(fx - 5 + bal, fy + 15, fx + 5 + bal, fy + 16, hex('#2a2a32'));
      T.brazo(R, fx - 12, fy + 42, fx - 2, fy + 1, '#3e3836', 1, { codo: [fx - 16, fy + 20] });
    } }
  const u = tramo(t, tapa[0], P7 + 0.2);   // «covered it up again»
  if (u <= 0 && t < tapa[0] - 0.6) return;
  // la pala que entra por arriba a la derecha y se vuelca dos veces
  let vuelca = 0; for (const g of tapa) { const v = (t - g + 0.15) / 0.5; if (v > 0 && v < 1) vuelca = Math.sin(v * Math.PI); }
  const entra = tramo(t, tapa[0] - 0.6, tapa[0] - 0.15), px = 226, py = N(lerp(-30, 46, entra)), ang = 0.15 + vuelca * 0.75;
  const nivel = N(lerp(181, 64, u ** 0.8));
  // el chorro de arena de la pala (granos que caen y se abren) hasta el nivel
  if (vuelca > 0.2) for (let y = py + 8; y < nivel; y++) { const w = 4 + N((y - py) * 0.06); for (let x = -w; x <= w; x++) if (h3(x + 400, y, N(t * 30)) < 0.7) R.pset(px - 10 + x + N(Math.sin(y * 0.2 + t * 9)), y, hex(h3(x, y, 1) < 0.5 ? '#e4cc9c' : '#c8a676')); }
  for (let k = 0; k < 24; k++) { const f = (t * 1.7 + k / 24) % 1, x = px - 22 + N(h3(k, 0, 2) * 30), y = N(lerp(py + 8, nivel, f)); if (u > 0 && y < nivel) R.pset(x, y, hex(k % 3 ? '#dcc092' : '#a8885c')); }
  // la arena que sube por delante del enlucido: granos de tres tonos, guijarros, el caballón de arriba y su sombra
  if (u > 0) for (let x = 0; x < 320; x++) {
    const top = nivel + N(Math.sin(x * 0.09 + 1.3) * 3 + Math.sin(x * 0.31) * 1.5 - Math.max(0, 14 - Math.abs(x - (px - 10)) * 0.6));
    for (let y = Math.max(0, top); y < 180; y++) { const q = h3(x, y, 3), d = y - top;
      R.pset(x, y, hex(d === 0 ? '#f6e4bc' : d < 3 ? '#ecd6a8' : q < 0.05 ? '#8a6a44' : q < 0.12 ? '#b8966a' : q < 0.4 ? '#d4b886' : q < 0.75 ? '#dcc294' : '#e6cea0')); }
    if (h3(x, 7, 4) < 0.08) { const y = top + 6 + N(h3(x, 8, 4) * 30); if (y < 178) { R.rect(x, y, x + 2, y + 1, hex('#8a7458')); R.pset(x, y, hex('#c8b08a')); } }
  }
  // el hierro de la pala (el mango sale por arriba) y su carga
  const ca = Math.cos(ang), sa = Math.sin(ang);
  const P = (dx, dy) => [N(px + dx * ca - dy * sa), N(py + dx * sa + dy * ca)];
  R.linea(px + 8, py - 40, px + 2, py, hex('#3a2414')); R.linea(px + 9, py - 40, px + 3, py, hex('#9a6a3a')); R.linea(px + 10, py - 40, px + 4, py, hex('#c08a50'));
  R.poligono([P(-24, -3), P(5, -3), P(8, 12), P(-26, 14)], hex('#1e1e26')); R.poligono([P(-23, -2), P(4, -2), P(7, 11), P(-25, 13)], hex('#7a7a86'));
  R.poligono([P(-23, -2), P(4, -2), P(3, 2), P(-23, 2)], hex('#b8b8c4')); R.poligono([P(-25, 10), P(7, 9), P(7, 11), P(-25, 13)], hex('#55555f'));
  if (vuelca < 0.5) R.poligono([P(-21, -2), P(2, -2), P(-3, -9), P(-15, -9)], hex('#dcc092'));
};

// 7 · el telégrafo (gag 2): el telegrafista tira de la cinta, que no se acaba; el burro asoma y se la come
const tirones = [P7 + 0.4, b(0.73), b(0.765), b(0.8)];
const p7 = (t) => {
  const burro = tramo(t, b(0.8), b(0.91));
  T.valle(R, t, { encuadre: 'telegrafo', camara: 'cinta', corre: lerp(1, 2.6, tramo(t, P7, b(0.83))), burro });
  // los telegramas de la mañana, clavados en la pared, que se mecen con el aire de la puerta
  for (const [x, y, k] of [[164, 30, 0], [184, 34, 1], [204, 30, 2]]) {
    const dx = N(Math.sin(t * 2.2 + k) * 1.2); R.pset(x + 7, y - 2, hex('#3a3a44')); T.PIEZAS_TU.telegrama(R, x + dx, y, {});
  }
  // la balda con las pilas de vidrio (líquido verde azulado, placas de cobre) y sus cables al aparato
  R.rect(80, 58, 150, 61, hex('#3a2414')); R.rect(80, 58, 150, 58, hex('#9a6a3a')); R.rect(84, 62, 86, 68, hex('#3a2414')); R.rect(144, 62, 146, 68, hex('#3a2414'));
  for (const [k, x] of [[0, 104], [1, 118], [2, 132]]) { R.rect(x - 5, 42, x + 5, 57, hex('#2a3a3a')); R.rect(x - 4, 43, x + 4, 57, hex('#b8dcd8')); R.rect(x - 4, 48 + (k % 2), x + 4, 57, hex('#6ab0a8')); R.rect(x - 2, 40, x - 1, 54, hex('#c87a3a')); R.rect(x + 1, 40, x + 2, 54, hex('#8a8a96')); R.pset(x + 3, 44, hex('#ffffff'));
    if (h3(k, N(t * 3), 5) < 0.4) R.pset(x - 3 + (N(t * 7) % 6), 50 + (N(t * 11) % 6), hex('#e8fff8')); }
  R.linea(103, 40, 96, 34, hex('#1e1e22')); R.linea(96, 34, 88, 40, hex('#1e1e22')); R.linea(88, 40, 88, 76, hex('#1e1e22'));
  // una salamanquesa que cruza la pared
  { const g = tramo(t, P7 + 0.5, P7 + 6.2), gx = N(lerp(228, 156, g)), gy = 76 + N(Math.sin(g * 9) * 2), pie = Math.floor(t * 8) % 2;
    R.rect(gx, gy, gx + 7, gy + 1, hex('#8a9a6a')); R.rect(gx - 2, gy, gx - 1, gy + 1, hex('#6a7a4a')); R.rect(gx + 8, gy + 1, gx + 12, gy + 1, hex('#7a8a5a'));
    R.pset(gx + 1 + pie, gy - 1, hex('#6a7a4a')); R.pset(gx + 5 - pie, gy + 2, hex('#6a7a4a')); R.pset(gx + 5 - pie, gy - 1, hex('#6a7a4a')); R.pset(gx + 1 + pie, gy + 2, hex('#6a7a4a')); R.pset(gx - 2, gy, hex('#1a1a1a')); }
  // la mano del telegrafista (manguito crema) tira de la cinta a tirones; cuando entra el burro, la suelta y se aparta
  let tira = 0; for (const g of tirones) { const v = (t - g) / 0.35; if (v > 0 && v < 1) tira = Math.sin(v * Math.PI); }
  const fuera = tramo(t, b(0.8), b(0.83)), mx = N(222 - tira * 6), my = N(lerp(138 + tira * 7, 200, fuera));
  if (fuera < 1) T.brazo(R, mx - 14, my + 48, mx, my, '#e8e0d0', 1, { codo: [mx - 20, my + 24] });
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], {
  cartela: '1922', año: 1922,
  efectos: [[golpes[0], 'golpecito'], [golpes[2], 'golpecito'], [cuenta[0], 'papel'], [cuenta[2], 'papel'], [a(0.79), 'lapiz'], [a(0.94), 'lapiz'],
    [b(0.12), 'toc'], [b(0.19), 'toc'], [b(0.27), 'whoosh'], [b(0.29), 'brillo'], [b(0.386), 'pop'], [b(0.53), 'brillo'], [tapa[0], 'avalancha'], [tapa[1], 'chof'],
    [P7 + 0.15, 'maquina'], [b(0.73), 'papel'], [b(0.8), 'papel'], [b(0.92), 'masca']],
});
''')
